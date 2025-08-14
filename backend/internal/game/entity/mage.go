package entity

import (
	"math/big"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/pb"
	"github.com/kelindar/column"
)

type Mage struct {
	X, Y, VX, VY, ROTATION, RADIUS, HEALTH float64
	NAME                                   string
}

var mageSignature *big.Int

func init() {
	comps := []int{
		component.EntityID,
		component.EntityType,
		component.X,
		component.Y,
		component.Vx,
		component.Vy,
		component.Rotation,
		component.Radius,
		component.Health,
		component.Name,
		component.IsPlayer,
	}

	sig := big.NewInt(0)
	for _, c := range comps {
		sig.SetBit(sig, c, 1)
	}
	mageSignature = sig
}

func MageSignature() *big.Int {
	return new(big.Int).Set(mageSignature)
}

func (Mage) GetSignature() *big.Int {
	return MageSignature()
}

func (e Mage) Insert(r column.Row) error {
	r.SetInt("ENTITY_TYPE", int(pb.Entity_MAGE))
	r.SetFloat64("X", e.X)
	r.SetFloat64("Y", e.Y)
	r.SetFloat64("VX", e.VX)
	r.SetFloat64("VY", e.VY)
	r.SetFloat64("ROTATION", e.ROTATION)
	r.SetFloat64("RADIUS", e.RADIUS)
	r.SetFloat64("HEALTH", e.HEALTH)
	r.SetString("NAME", e.NAME)
	r.SetBool("IS_PLAYER", true)
	return nil
}
