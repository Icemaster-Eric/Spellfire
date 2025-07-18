package entity

import (
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"math/big"
	"github.com/kelindar/column"
)

type Bush struct {
    X, Y, ROTATION, RADIUS float64
}

var bushSignature *big.Int

func init() {
    comps := []int{
        component.ENTITY_ID,
		component.SPRITE,
        component.X,
        component.Y,
		component.RADIUS,
        component.ROTATION,
        component.IS_STATIC,
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
    r.SetFloat64("RADIUS", e.RADIUS)
    r.SetBool("IS_STATIC", true)
    r.SetBool("IS_TRANSPARENT", true)
    r.SetBool("IS_BUSH", true)
    return nil
}
