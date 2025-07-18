package game

import (
	"math"
	"math/rand"
	"time"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/archetype"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/entity"
	"github.com/kelindar/column"
)

func (w *World) MoveEntities(dt float64) {
	for _, arch := range w.QueryArchetypesWith(archetype.GetSignature([]int{
		component.X,
		component.Y,
		component.VX,
		component.VY,
	})) {
		arch.Columns.Query(func(txn *column.Txn) error {
			xCol := txn.Float64("X")
			yCol := txn.Float64("Y")
			vxCol := txn.Float64("VX")
			vyCol := txn.Float64("VY")
			return txn.Range(func(idx uint32) {
				vx, _ := vxCol.Get()
				xCol.Merge(vx * dt)
				vy, _ := vyCol.Get()
				yCol.Merge(vy * dt)
			})
		})
	}
}

func (w *World) DecreasePlayerVelocity(dt float64) {
	decayRate := math.Exp(-dt / 0.3) // CHANGE THIS TO A SET PLAYER COMPONENT LATER (?)

	arch := w.GetArchetype(entity.PlayerSignature())
	arch.Columns.Query(func(txn *column.Txn) error {
		vxCol := txn.Float64("VX")
		vyCol := txn.Float64("VY")
		return txn.Range(func(idx uint32) {
			vx, _ := vxCol.Get()
			vxCol.Set(vx * decayRate)
			vy, _ := vyCol.Get()
			vyCol.Set(vy * decayRate)
		})
	})
}

func (w *World) ProcessBullets(dt float64) {
	playerArch := w.GetArchetype(entity.PlayerSignature())
	playerArch.Columns.Query(func(txn *column.Txn) error {
		xCol := txn.Float64("X")
		yCol := txn.Float64("Y")
		rotationCol := txn.Float64("ROTATION")
		lastFiredCol := txn.Uint64("LAST_FIRED")
		return txn.WithValue("IS_FIRING", func(v any) bool {
			return v == true
		}).Range(func(idx uint32) {
			x, _ := xCol.Get()
			y, _ := yCol.Get()
			rotation, _ := rotationCol.Get()
			rotation *= -1 // TERRIBLE CODE IT NEEDS TO GET REMOVED
			lastFired, _ := lastFiredCol.Get()
			vx := math.Cos(rotation)
			vy := math.Sin(rotation)
			if uint64(time.Now().UnixMilli())-lastFired > 333 { // shoot 3 times per second?
				w.SpawnEntity(entity.Bullet{
					X:        x + vx * 0.6, // spawn bullet outside of player for now
					Y:        y + vy * 0.6,
					VX:       vx * 5, // CHANGE THE SPEED LATER
					VY:       vy * 5, // ACCORDING TO EACH GUN'S BULLET SPEED (?)
					DAMAGE:   2,
					LIFESPAN: 2,
				})
			}
		})
	})

	removeBullets := []string{}
	arch := w.GetArchetype(entity.BulletSignature())
	arch.Columns.Query(func(txn *column.Txn) error {
		entityIDCol := txn.Key()
		xCol := txn.Float64("X")
		yCol := txn.Float64("Y")
		damageCol := txn.Float64("DAMAGE")
		// vxCol := txn.Float64("VX")
		// vyCol := txn.Float64("VY")
		return txn.Range(func(idx uint32) {
			entityID, _ := entityIDCol.Get()
			x, _ := xCol.Get()
			y, _ := yCol.Get()
			damage, _ := damageCol.Get()

			playerArch.Columns.Query(func(playerTxn *column.Txn) error {
				playerXCol := playerTxn.Float64("X")
				playerYCol := playerTxn.Float64("Y")
				playerRadiusCol := playerTxn.Float64("RADIUS")
				playerHealthCol := playerTxn.Float64("HEALTH")
				return playerTxn.Range(func(playerIdx uint32) {
					playerX, _ := playerXCol.Get()
					playerY, _ := playerYCol.Get()
					playerRadius, _ := playerRadiusCol.Get()

					dx := x - playerX
					dy := y - playerY

					if dx * dx + dy * dy <= playerRadius * playerRadius {
						playerHealthCol.Merge(-damage)
						removeBullets = append(removeBullets, entityID)
					}
				})
			})
		})
	})
	// remove bullets that have hit players
	for _, entity_id := range removeBullets {
		arch.Columns.DeleteKey(entity_id)
	}
}

func (w *World) SpawnBushes(dt float64) { // temporary function, add proper environment creation later
	if rand.Intn(5) != 0 {
		return
	}
	switch rand.Intn(3) {
	case 0:
		w.SpawnEntity(entity.Bush{
			X: rand.Float64() * 100 - 50,
			Y: rand.Float64() * 100 - 50,
			ROTATION: rand.Float64() * 2 * math.Pi,
			RADIUS: rand.Float64() / 4 + 0.5,
		})
	}
}

func (w *World) KillPlayers(dt float64) {
	toRemove := map[string]string{}

	playerArch := w.GetArchetype(entity.PlayerSignature())
	playerArch.Columns.Query(func(txn *column.Txn) error {
		entityIDCol := txn.Key()
		nameCol := txn.String("NAME")

		return txn.WithFloat("HEALTH", func(v float64) bool {
			return v <= 0
		}).Range(func(idx uint32) {
			entityID, _ := entityIDCol.Get()
			name, _ := nameCol.Get()
			toRemove[name] = entityID
		})
	})

	for name, entity_id := range toRemove {
		playerArch.Columns.DeleteKey(entity_id)
		delete(w.Players, name)
	}
	// add some way for server to close ws connection
}
