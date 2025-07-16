package component

import (
	"github.com/kelindar/column"
)

const (
	ENTITY_ID = iota
	SPRITE
	X
	Y
	VX
	VY
	ROTATION
	RADIUS
	NAME
	IS_TRANSPARENT
	IS_PLAYER
	IS_BUSH
)

var ComponentMap = map[int]func(col *column.Collection){
	ENTITY_ID: func(col *column.Collection) {
		col.CreateColumn("ENTITY_ID", column.ForKey())
	},
	SPRITE: func(col *column.Collection) {
		col.CreateColumn("SPRITE", column.ForEnum())
	},
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
	RADIUS: func(col *column.Collection) {
		col.CreateColumn("RADIUS", column.ForFloat64())
	},
	NAME: func(col *column.Collection) {
		col.CreateColumn("NAME", column.ForString())
	},
	IS_TRANSPARENT: func(col *column.Collection) {
		col.CreateColumn("IS_TRANSPARENT", column.ForBool())
	},
	IS_PLAYER: func(col *column.Collection) {
		col.CreateColumn("IS_PLAYER", column.ForBool())
	},
	IS_BUSH: func(col *column.Collection) {
		col.CreateColumn("IS_BUSH", column.ForBool())
	},
}
