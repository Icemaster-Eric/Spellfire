package archetype

import (
	"math/big"
	"strconv"
	"github.com/kelindar/column"
)

type Archetype struct {
	Signature *big.Int
	Entities []uint32
	Columns *column.Collection
}

func (a *Archetype) AddEntity(entityID uint32, insertValues func(r column.Row) error) {
	a.Entities = append(a.Entities, entityID)
	a.Columns.InsertKey(strconv.FormatUint(uint64(entityID), 16), insertValues)
}

func (a *Archetype) RemoveEntity(entityID uint32) {
	a.Columns.DeleteKey(strconv.FormatUint(uint64(entityID), 16))
}

func GetSignature(components []int) *big.Int {
	signature := big.NewInt(0)
	for _, comp := range components {
		signature.SetBit(signature, comp, 1)
	}
	return signature
}
