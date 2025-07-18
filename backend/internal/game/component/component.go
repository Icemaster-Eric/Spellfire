package component

import (
	"github.com/kelindar/column"
)

const (
	EntityID = iota
	Sprite
	X
	Y
	Vx
	Vy
	Rotation
	Radius
	Name
	Health
	Damage
	LastFired
	IsStatic
	IsTransparent
	IsPlayer
	IsBush
	IsBullet
	IsFiring
)

var ComponentMap = map[int]func(col *column.Collection){
	EntityID: func(col *column.Collection) {
		col.CreateColumn("ENTITY_ID", column.ForKey())
	},
	Sprite: func(col *column.Collection) {
		col.CreateColumn("SPRITE", column.ForEnum())
	},
	X: func(col *column.Collection) {
		col.CreateColumn("X", column.ForFloat64())
	},
	Y: func(col *column.Collection) {
		col.CreateColumn("Y", column.ForFloat64())
	},
	Vx: func(col *column.Collection) {
		col.CreateColumn("VX", column.ForFloat64())
	},
	Vy: func(col *column.Collection) {
		col.CreateColumn("VY", column.ForFloat64())
	},
	Rotation: func(col *column.Collection) {
		col.CreateColumn("ROTATION", column.ForFloat64())
	},
	Radius: func(col *column.Collection) {
		col.CreateColumn("RADIUS", column.ForFloat64())
	},
	Name: func(col *column.Collection) {
		col.CreateColumn("NAME", column.ForString())
	},
	Health: func(col *column.Collection) {
		col.CreateColumn("HEALTH", column.ForFloat64())
	},
	Damage: func(col *column.Collection) {
		col.CreateColumn("DAMAGE", column.ForFloat64())
	},
	LastFired: func(col *column.Collection) {
		col.CreateColumn("LAST_FIRED", column.ForUint64())
	},
	IsStatic: func(col *column.Collection) {
		col.CreateColumn("IS_STATIC", column.ForBool())
	},
	IsTransparent: func(col *column.Collection) {
		col.CreateColumn("IS_TRANSPARENT", column.ForBool())
	},
	IsPlayer: func(col *column.Collection) {
		col.CreateColumn("IS_PLAYER", column.ForBool())
	},
	IsBush: func(col *column.Collection) {
		col.CreateColumn("IS_BUSH", column.ForBool())
	},
	IsBullet: func(col *column.Collection) {
		col.CreateColumn("IS_BULLET", column.ForBool())
	},
	IsFiring: func(col *column.Collection) {
		col.CreateColumn("IS_FIRING", column.ForBool())
	},
}
