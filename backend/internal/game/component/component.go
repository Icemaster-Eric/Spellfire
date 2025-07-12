package component

import (
	"github.com/kelindar/column"
)

const (
	X = iota
	Y
	VX
	VY
	ROTATION
	NAME
	IS_PLAYER
)

var ComponentMap = map[int]func(col *column.Collection){
	X: func(col *column.Collection) {
		col.CreateColumn("X", column.ForFloat64())
	},
	Y: func(col *column.Collection) {
		col.CreateColumn("Y", column.ForFloat64())
	},
	VX: func(col *column.Collection) {
		col.CreateColumn("VX", column.ForFloat64())
	},
	VY: func(col *column.Collection) {
		col.CreateColumn("VY", column.ForFloat64())
	},
	ROTATION: func(col *column.Collection) {
		col.CreateColumn("ROTATION", column.ForFloat64())
	},
	NAME: func(col *column.Collection) {
		col.CreateColumn("NAME", column.ForString())
	},
	IS_PLAYER: func(col *column.Collection) {
		col.CreateColumn("IS_PLAYER", column.ForBool())
	},
}
