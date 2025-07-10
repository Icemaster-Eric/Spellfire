package entity

import (
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"math/big"
	"github.com/kelindar/column"
)

type Player struct {
    X, Y, VX, VY, ROTATION float64
}

var playerSignature *big.Int

func init() {
    comps := []int{
        component.X,
        component.Y,
        component.VX,
        component.VY,
        component.ROTATION,
    }

    sig := big.NewInt(0)
    for _, c := range comps {
        sig.SetBit(sig, c, 1)
    }
    playerSignature = sig
}

func PlayerSignature() *big.Int {
    return new(big.Int).Set(playerSignature)
}

func (Player) GetSignature() *big.Int {
    return PlayerSignature()
}

func (e Player) Insert(r column.Row) error {
    r.SetFloat64("X", e.X)
    r.SetFloat64("Y", e.Y)
    r.SetFloat64("VX", e.VX)
    r.SetFloat64("VY", e.VY)
    r.SetFloat64("ROTATION", e.ROTATION)
    return nil
}
