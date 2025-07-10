package game

import (
	"math"
	"math/big"
	"strconv"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/archetype"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/pb"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/entity"
	"github.com/kelindar/column"
)

const (
	TickRate = 20 // ticks per second
)

type World struct {
	NextEntityID uint32
	Archetypes   map[string]*archetype.Archetype
	Players      map[string]Player
}

func NewWorld() *World {
	archetypes := make(map[string]*archetype.Archetype)

	//archetypes[3] = GetArchetype()

	return &World{
		Archetypes: archetypes,
	}
}

func (w *World) GetArchetype(signature *big.Int) *archetype.Archetype {
	key := signature.Text(16)
	if a, ok := w.Archetypes[key]; ok {
		return a
	}
	collection := column.NewCollection()
	columns := map[string]any{}
	for i := 0; i < signature.BitLen(); i++ {
		if signature.Bit(i) == 1 {
			cn, col := component.ComponentMap[i]()
			columns[cn] = col
		}
	}
	collection.CreateColumnsOf(columns)
	newSignature := new(big.Int).Set(signature)
	a := &archetype.Archetype{
		Signature: newSignature,
		Entities: make([]uint32, 0),
		Columns: collection,
	}
	w.Archetypes[newSignature.Text(16)] = a
	return a
}

type Player struct {
	ID            uint32
	Inputs  chan *pb.ClientPacket
	Updates chan *pb.ServerPacket
}

func (w *World) SpawnEntity(e entity.Entity) uint32 {
	entityID := w.NextEntityID
	w.NextEntityID += 1

	a := w.GetArchetype(e.GetSignature())
	a.AddEntity(entityID, e.Insert)

	return entityID
}

func (w *World) DespawnEntity(entityID uint32, signature *big.Int) {
	a, ok := w.Archetypes[signature.Text(16)]
	if ok {
		a.RemoveEntity(entityID)
	}
}

func (w *World) MovePlayer(name string, movement *pb.Vec2) {
	l := math.Hypot(movement.X, movement.Y)
	nx, ny := movement.X / l, movement.Y / l
	p, ok := w.Players[name]
	if ok {
		a := w.GetArchetype(entity.PlayerSignature())
		a.Columns.QueryKey(strconv.FormatUint(uint64(p.ID), 16), func(r column.Row) error {
			r.SetFloat64("VX", nx)
			r.SetFloat64("VY", ny)
			return nil
		})
	}
}

func (w *World) Tick(dt float64) {
	// Consume player inputs
	for name, player := range w.Players {
		for range len(player.Inputs) {
			packet := <-player.Inputs
			// check if we should spawn the player
			for _, event := range packet.Events {
				switch event.Type {
				case pb.ClientEventType_ENTER_GAME:
					e := entity.Player{}
					w.SpawnEntity(e)
				case pb.ClientEventType_MOVE:
					w.MovePlayer(name, event.Movement)
				}
			}
		}
	}
}
