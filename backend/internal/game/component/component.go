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
)

var ComponentMap = map[int]func() (string, column.Column){
	X: func() (string, column.Column) {
		return "X", column.ForFloat64()
	},
	Y: func() (string, column.Column) {
		return "Y", column.ForFloat64()
	},
	VX: func() (string, column.Column) {
		return "VX", column.ForFloat64()
	},
	VY: func() (string, column.Column) {
		return "VY", column.ForFloat64()
	},
	ROTATION: func() (string, column.Column) {
		return "ROTATION", column.ForFloat64()
	},
}