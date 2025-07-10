package entity

import (
	"math/big"
	"github.com/kelindar/column"
)

type Entity interface {
	GetSignature() *big.Int
	Insert(r column.Row) error
}
