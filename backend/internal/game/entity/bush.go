package entity

import (
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"math/big"
	"github.com/kelindar/column"
)

type Bush struct {
    X, Y, ROTATION float64
    NAME string
}

var bushSignature *big.Int

func init() {
    comps := []int{
        component.ENTITY_ID,
		component.SPRITE,
        component.X,
        component.Y,
		component.RADIUS,
		component.IS_TRANSPARENT,
        component.IS_BUSH,
    }

    sig := big.NewInt(0)
    for _, c := range comps {
        sig.SetBit(sig, c, 1)
    }
    bushSignature = sig
}

func BushSignature() *big.Int {
    return new(big.Int).Set(bushSignature)
}

func (Bush) GetSignature() *big.Int {
    return BushSignature()
}

func (e Bush) Insert(r column.Row) error {
    r.SetFloat64("X", e.X)
    r.SetFloat64("Y", e.Y)
    r.SetFloat64("ROTATION", e.ROTATION)
    r.SetString("NAME", e.NAME)
    r.SetBool("IS_PLAYER", true)
    return nil
}
