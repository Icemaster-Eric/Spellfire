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
	HEALTH
	DAMAGE
	LAST_FIRED
	IS_STATIC
	IS_TRANSPARENT
	IS_PLAYER
	IS_BUSH
	IS_BULLET
	IS_FIRING
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
	HEALTH: func(col *column.Collection) {
		col.CreateColumn("HEALTH", column.ForFloat64())
	},
	DAMAGE: func(col *column.Collection) {
		col.CreateColumn("DAMAGE", column.ForFloat64())
	},
	LAST_FIRED: func(col *column.Collection) {
		col.CreateColumn("LAST_FIRED", column.ForUint64())
	},
	IS_STATIC: func(col *column.Collection) {
		col.CreateColumn("IS_STATIC", column.ForBool())
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
	IS_BULLET: func(col *column.Collection) {
		col.CreateColumn("IS_BULLET", column.ForBool())
	},
	IS_FIRING: func(col *column.Collection) {
		col.CreateColumn("IS_FIRING", column.ForBool())
	},
}
