package entity

import (
	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"math/big"
	"github.com/kelindar/column"
)

type Player struct {
    X, Y, VX, VY, ROTATION, RADIUS float64
    NAME string
}

var playerSignature *big.Int

func init() {
    comps := []int{
        component.ENTITY_ID,
        component.X,
        component.Y,
        component.VX,
        component.VY,
        component.ROTATION,
        component.RADIUS,
        component.NAME,
        component.IS_PLAYER,
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
    r.SetFloat64("RADIUS", e.RADIUS)
    r.SetString("NAME", e.NAME)
    r.SetBool("IS_PLAYER", true)
    return nil
}
