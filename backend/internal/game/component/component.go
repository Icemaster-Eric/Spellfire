package component

import (
	"github.com/kelindar/column"
)

const (
	EntityID      = iota // string
	EntityType           // int
	X                    // float64
	Y                    // float64
	Vx                   // float64
	Vy                   // float64
	Rotation             // float64
	Radius               // float64
	Name                 // string
	Health               // float64
	Damage               // float64
	LastFired            // uint64
	IsTransparent        // bool
	IsFiring             // bool
	IsPlayer // bool
)

var ComponentMap = map[int]func(col *column.Collection){
	EntityID: func(col *column.Collection) {
		col.CreateColumn("ENTITY_ID", column.ForKey())
	},
	EntityType: func(col *column.Collection) {
		col.CreateColumn("ENTITY_TYPE", column.ForInt())
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
	IsTransparent: func(col *column.Collection) {
		col.CreateColumn("IS_TRANSPARENT", column.ForBool())
	},
	IsFiring: func(col *column.Collection) {
		col.CreateColumn("IS_FIRING", column.ForBool())
	},
	IsPlayer: func(col *column.Collection) {
		col.CreateColumn("IS_PLAYER", column.ForBool())
	},
}
