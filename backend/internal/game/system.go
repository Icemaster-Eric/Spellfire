package game

import (
	"math"
	"math/rand"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/archetype"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/entity"
	"github.com/kelindar/column"
)

func (w *World) MoveEntities(dt float64) {
	for _, arch := range w.QueryArchetypesWith(archetype.GetSignature([]int{
		component.X,
		component.Y,
		component.Vx,
		component.Vy,
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

func (w *World) DecreasePlayerVelocity(dt float64) { // REMOVE??
	// decayRate := math.Exp(-dt / 0.3) // CHANGE THIS TO A SET PLAYER COMPONENT LATER (?)

	archs := []*archetype.Archetype{
		w.Archetype(entity.GunnerSignature()),
		w.Archetype(entity.MageSignature()),
	}

	for _, arch := range archs {
		arch.Columns.Query(func(txn *column.Txn) error {
			vxCol := txn.Float64("VX")
			vyCol := txn.Float64("VY")
			return txn.Range(func(idx uint32) {
				// vx, _ := vxCol.Get()
				// vxCol.Set(vx * decayRate)
				// vy, _ := vyCol.Get()
				// vyCol.Set(vy * decayRate)
				vxCol.Set(0)
				vyCol.Set(0)
			})
		})
	}
}

func (w *World) SpawnEntities(dt float64) {
	// loop through players
	// check entity density
	// spawn stuff based on biome
	// profit
	playerArchs := []*archetype.Archetype{
		w.Archetype(entity.GunnerSignature()),
		w.Archetype(entity.MageSignature()),
	}

	for _, playerArch := range playerArchs {
		playerArch.Columns.Query(func(txn *column.Txn) error {
			playerXCol := txn.Float64("X")
			playerYCol := txn.Float64("Y")

			return txn.Range(func(idx uint32) {
				playerX, _ := playerXCol.Get()
				playerY, _ := playerYCol.Get()

				entityCount := 0

				// check how many entities are around this player's position
				// loop through all entities (very slow and inefficient, fix this with spatial hash!!!!!!!!!!!!)
				for _, arch := range w.QueryArchetypes(
					archetype.GetSignature([]int{
						component.EntityID,
						component.X,
						component.Y,
						component.Rotation,
						component.Radius,
						component.Health,
					}),
					archetype.GetSignature([]int{
						component.IsPlayer,
					}),
				) {
					// use this for player update, don't waste multiple full queries
					arch.Columns.Query(func(txn *column.Txn) error {
						entityCount += txn.WithFloat("X", func(v float64) bool {
							return math.Abs(playerX-v) < 32
						}).WithFloat("Y", func(v float64) bool {
							return math.Abs(playerY-v) < 18
						}).Count()

						return nil
					})
				}

				for range 50-entityCount {
					// spawn entities
					spawnInt := rand.Intn(100)
					if spawnInt < 40 {
						// spawn bush
						w.SpawnEntity(entity.Bush{
							X: playerX + (rand.Float64() - 0.5) * 2 * 32,
							Y: playerY + (rand.Float64() - 0.5) * 2 * 18,
							ROTATION: rand.Float64() * 2 * math.Pi,
							RADIUS: 0.2,
							HEALTH: 50,
						})
					} else if spawnInt < 60 {
						// spawn tree
						w.SpawnEntity(entity.Tree{
							X: playerX + (rand.Float64() - 0.5) * 2 * 32,
							Y: playerY + (rand.Float64() - 0.5) * 2 * 18,
							ROTATION: rand.Float64() * 2 * math.Pi,
							RADIUS: 0.5,
							HEALTH: 100,
						})
					} else if spawnInt < 90 {
						// spawn rock
						w.SpawnEntity(entity.Rock{
							X: playerX + (rand.Float64() - 0.5) * 2 * 32,
							Y: playerY + (rand.Float64() - 0.5) * 2 * 18,
							ROTATION: rand.Float64() * 2 * math.Pi,
							RADIUS: 0.55,
							HEALTH: 125,
						})
					}
				}
			})
		})
	}
}

func (w *World) KillPlayers(dt float64) {
	// make this later cuz I'm lazy :)
}
