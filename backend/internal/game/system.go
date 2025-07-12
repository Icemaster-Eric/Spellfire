package game

import (
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/archetype"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
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
				xCol.Merge(vx)
				vy, _ := vyCol.Get()
				yCol.Merge(vy)
			})
		})
	}
}
