package game

import (
	"math"
	"math/big"
	"strconv"
	"sync"
	"time"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/archetype"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/entity"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/pb"
	"github.com/kelindar/column"
	"google.golang.org/protobuf/proto"
)

const (
	TickRate = 20 // ticks per second
)

type Player struct {
	ID     uint32
	Inputs chan *pb.ClientPacket
	mu     sync.Mutex
	packet *pb.ServerPacket
}

func NewPlayer(id uint32) *Player {
	return &Player{
		ID:     id,
		Inputs: make(chan *pb.ClientPacket, 3),
		packet: &pb.ServerPacket{},
	}
}

func (p *Player) WriteUpdate(fn func(pkt *pb.ServerPacket)) {
	p.mu.Lock()
	defer p.mu.Unlock()
	fn(p.packet)
}

// if needed to read current packet, returns a copy
func (p *Player) ReadUpdate() *pb.ServerPacket {
	p.mu.Lock()
	defer p.mu.Unlock()
	return proto.Clone(p.packet).(*pb.ServerPacket)
}

type World struct {
	NextEntityID uint32
	Archetypes   map[string]*archetype.Archetype
	Players      map[string]*Player
	ticks        uint32
}

func NewWorld() *World {
	archetypes := make(map[string]*archetype.Archetype)
	players := make(map[string]*Player)

	return &World{
		Archetypes: archetypes,
		Players:    players,
	}
}

func (w *World) Archetype(signature *big.Int) *archetype.Archetype {
	// either finds or creates the archetype with the given signature
	if a, ok := w.Archetypes[signature.Text(16)]; ok {
		return a
	}
	collection := column.NewCollection()
	for i := 0; i < signature.BitLen(); i++ {
		if signature.Bit(i) == 1 {
			component.ComponentMap[i](collection)
		}
	}
	newSignature := new(big.Int).Set(signature)
	a := &archetype.Archetype{
		Signature: newSignature,
		// Entities:  make(map[uint32]struct{}, 64),
		Columns: collection,
	}
	w.Archetypes[newSignature.Text(16)] = a
	return a
}

func (w *World) QueryArchetypes(withSig *big.Int, withoutSig *big.Int) (archs []*archetype.Archetype) {
	checker := archetype.NewSignatureChecker(withSig, withoutSig)

	for signature, arch := range w.Archetypes {
		intSig, _ := new(big.Int).SetString(signature, 16)
		if checker.MatchesWithWithout(intSig) {
			archs = append(archs, arch)
		}
	}
	return archs
}

func (w *World) QueryArchetypesWith(withSig *big.Int) (archs []*archetype.Archetype) {
	return w.QueryArchetypes(withSig, big.NewInt(0))
}

func (w *World) QueryArchetypesWithout(withoutSig *big.Int) (archs []*archetype.Archetype) {
	return w.QueryArchetypes(big.NewInt(0), withoutSig)
}

func (w *World) SpawnEntity(e entity.Entity) uint32 {
	entityID := w.NextEntityID
	w.NextEntityID += 1

	a := w.Archetype(e.GetSignature())
	a.AddEntity(entityID, e.Insert)

	return entityID
}

func (w *World) DespawnEntity(entityID uint32, signature *big.Int) {
	a, ok := w.Archetypes[signature.Text(16)]
	if ok {
		a.RemoveEntity(entityID)
	}
}

func (w *World) SpawnPlayer(name string) {
	// just spawn mages for now
	entityID := w.SpawnEntity(entity.Mage{ // SPAWN IN RANDOM LOCATION THAT ISN'T WATER
		NAME:        name,
		RADIUS:      0.5,
		HEALTH:      100,
	})
	p := NewPlayer(entityID)
	p.WriteUpdate(func(pkt *pb.ServerPacket) {
		pkt.Events = append(pkt.Events, &pb.ServerEvent{
			Type:              pb.ServerEvent_ENTER_GAME,
			EnterGamePlayerId: entityID,
		})
	})
	w.Players[name] = p
}

func (w *World) DespawnPlayer(name string) {
	p, ok := w.Players[name]
	if ok {
		w.DespawnEntity(p.ID, entity.MageSignature()) // mages only for now
	}
	delete(w.Players, name)
}

func (w *World) UpdatePlayers() {
	playerArch := w.Archetype(entity.MageSignature()) // mages only for now

	staticObjChecker := archetype.NewSignatureChecker(
		archetype.GetSignature([]int{
			// very general components, refine later on as needed
			component.EntityID,
			component.Rotation,
			component.Radius, // fix for square objects in the future (?)
			component.Health, // fix for objects without health in the future (?)
			// send is_transparent data?
		}),
		archetype.GetSignature([]int{
			component.Vx, // static only
			component.Vy,
		}),
	)

	// get all archetypes with a position
	for _, arch := range w.QueryArchetypesWith(archetype.GetSignature([]int{
		component.X,
		component.Y,
	})) {
		// if player arch (make check stricter)
		if arch.Signature.Cmp(entity.GunnerSignature()) == 0 || arch.Signature.Cmp(entity.MageSignature()) == 0 {
			// select the following columns for every player
			arch.Columns.Query(func(txn *column.Txn) error {
				entityIDCol := txn.Key()
				nameCol := txn.String("NAME")
				xCol := txn.Float64("X")
				yCol := txn.Float64("Y")
				vxCol := txn.Float64("VX")
				vyCol := txn.Float64("VY")
				rotationCol := txn.Float64("ROTATION")
				radiusCol := txn.Float64("RADIUS")
				healthCol := txn.Float64("HEALTH")

				// loop through each player and grab their full information to send to other players
				return txn.Range(func(idx uint32) {
					key, _ := entityIDCol.Get()
					entityID64, _ := strconv.ParseUint(key, 16, 32)
					entityID := uint32(entityID64)
					name, _ := nameCol.Get()
					x, _ := xCol.Get()
					y, _ := yCol.Get()
					vx, _ := vxCol.Get()
					vy, _ := vyCol.Get()
					rotation, _ := rotationCol.Get()
					radius, _ := radiusCol.Get()
					health, _ := healthCol.Get()

					// select every player and grab their viewbox and name
					playerArch.Columns.Query(func(playerTxn *column.Txn) error {
						playerNameCol := playerTxn.String("NAME")

						// loop through every player and check if the object is in their viewbox
						return playerTxn.WithFloat("X", func(v float64) bool {
							return math.Abs(x-v) < 8 + radius
						}).WithFloat("Y", func(v float64) bool {
							return math.Abs(y-v) < 4.5 + radius
						}).Range(func(playerIdx uint32) {
							playerName, _ := playerNameCol.Get()
							p, ok := w.Players[playerName]
							if ok {
								// write update
								p.WriteUpdate(func(pkt *pb.ServerPacket) {
									pkt.Entities = append(pkt.Entities, &pb.Entity{
										Id:   entityID,
										Type: pb.Entity_MAGE,
										Collider: &pb.Collider{
											Type:     pb.Collider_CIRCLE,
											Rotation: rotation,
											Radius:   radius,
											Position: &pb.Vec2{X: x, Y: y},
											Velocity: &pb.Vec2{X: vx, Y: vy},
										},
										Attributes: []*pb.EntityAttribute{
											{
												Type: pb.EntityAttribute_NAME,
												Name: name,
											},
											{
												Type:   pb.EntityAttribute_HEALTH,
												Health: health,
											},
										},
									})
								})
							}
						})
					})
				})
			})
		} else if staticObjChecker.MatchesWithWithout(arch.Signature) {
			arch.Columns.Query(func(txn *column.Txn) error {
				entityIDCol := txn.Key()
				entityTypeCol := txn.Int("ENTITY_TYPE")
				xCol := txn.Float64("X")
				yCol := txn.Float64("Y")
				rotationCol := txn.Float64("ROTATION")
				radiusCol := txn.Float64("RADIUS")
				healthCol := txn.Float64("HEALTH")

				// loop through each player and grab their full information to send to other players
				return txn.Range(func(idx uint32) {
					key, _ := entityIDCol.Get()
					entityID64, _ := strconv.ParseUint(key, 16, 32)
					entityID := uint32(entityID64)
					entityType, _ := entityTypeCol.Get()
					x, _ := xCol.Get()
					y, _ := yCol.Get()
					rotation, _ := rotationCol.Get()
					radius, _ := radiusCol.Get()
					health, _ := healthCol.Get()

					// select every player and grab their viewbox and name
					playerArch.Columns.Query(func(playerTxn *column.Txn) error {
						playerNameCol := playerTxn.String("NAME")

						// loop through every player and check if the object is in their viewbox
						return playerTxn.WithFloat("X", func(v float64) bool {
							return math.Abs(x-v) < 8 + radius
						}).WithFloat("Y", func(v float64) bool {
							return math.Abs(y-v) < 4.5 + radius
						}).Range(func(playerIdx uint32) {
							playerName, _ := playerNameCol.Get()
							p, ok := w.Players[playerName]
							if ok {
								// write update
								p.WriteUpdate(func(pkt *pb.ServerPacket) {
									pkt.Entities = append(pkt.Entities, &pb.Entity{
										Id:   entityID,
										Type: pb.Entity_EntityType(entityType),
										Collider: &pb.Collider{
											Type:     pb.Collider_CIRCLE,
											Rotation: rotation,
											Radius:   radius,
											Position: &pb.Vec2{X: x, Y: y},
										},
										Attributes: []*pb.EntityAttribute{
											{
												Type:   pb.EntityAttribute_HEALTH,
												Health: health,
											},
										},
									})
								})
							}
						})
					})
				})
			})
		} else {
			// ignore for now (?)
		}
	}

	// add timestamps to each packet
	for _, player := range w.Players {
		player.WriteUpdate(func(pkt *pb.ServerPacket) {
			pkt.Timestamp = &pb.Timestamp{Ms: uint64(time.Now().UnixMilli())}
		})
	}
}

func (w *World) Tick(dt float64) {
	// Consume player inputs
	playerArch := w.Archetype(entity.MageSignature()) // mages only for now
	playerArch.Columns.Query(func(txn *column.Txn) error {
		// entityIDCol := txn.Key()
		nameCol := txn.String("NAME")
		xCol := txn.Float64("X")
		yCol := txn.Float64("Y")
		vxCol := txn.Float64("VX")
		vyCol := txn.Float64("VY")
		rotationCol := txn.Float64("ROTATION")
		isFiringCol := txn.Bool("IS_FIRING")
		// radiusCol := txn.Float64("RADIUS")
		// healthCol := txn.Float32("HEALTH")

		return txn.Range(func(idx uint32) {
			// key, _ := entityIDCol.Get()
			// entityID64, _ := strconv.ParseUint(key, 16, 32)
			// entityID := uint32(entityID64)
			name, _ := nameCol.Get()
			x, _ := xCol.Get()
			y, _ := yCol.Get()
			// isFiring := isFiringCol.Get()
			// lastFiredCol, _ := lastFiredCol.Get()
			// vx, _ := vxCol.Get()
			// vy, _ := vyCol.Get()
			// rotation, _ := rotationCol.Get()
			// radius, _ := radiusCol.Get()
			// health, _ := healthCol.Get()

			player, ok := w.Players[name]
			if ok {
				for range len(player.Inputs) {
					packet := <-player.Inputs
					for _, event := range packet.Events {
						switch event.Type {
						case pb.ClientEvent_MOVE:
							l := math.Hypot(event.Movement.X, event.Movement.Y)
							if l == 0 {
								return
							}
							newVx, newVy := event.Movement.X/l, event.Movement.Y/l
							vxCol.Set(newVx * 3) // USE SPEED COMPONENT
							vyCol.Set(newVy * 3)
						case pb.ClientEvent_START_FIRE:
							isFiringCol.Set(true)
						case pb.ClientEvent_STOP_FIRE:
							isFiringCol.Set(false)
						}
					}
					cursorDx := packet.Cursor.X - x
					cursorDy := packet.Cursor.Y - y
					cursorDirection := math.Atan2(cursorDy, cursorDx)
					if !math.IsNaN(cursorDirection) {
						rotationCol.Set(cursorDirection)
					}
				}
			}
		})
	})

	// Systems
	w.MoveEntities(dt)
	w.DecreasePlayerVelocity(dt)
	w.ProcessBullets(dt)
	w.KillPlayers(dt) // dt is unneeded
	if w.ticks % 60 == 0 { // run once per 3s
		w.SpawnEntities(dt)
	}
	// Send updates
	w.UpdatePlayers()
	w.ticks++
}
