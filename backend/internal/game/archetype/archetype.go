package archetype

import (
	"github.com/kelindar/column"
)

type Archetype struct {
	Signature uint32
	Columns column.Collection
	Capacity uint16
	Count uint16
}
