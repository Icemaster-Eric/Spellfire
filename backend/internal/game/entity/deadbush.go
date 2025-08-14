package entity

import (
	"math/big"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/pb"
	"github.com/kelindar/column"
)

type DeadBush struct {
	X, Y, ROTATION, RADIUS, HEALTH float64
}

var deadBushSignature *big.Int

func init() {
	comps := []int{
		component.EntityID,
		component.EntityType,
		component.X,
		component.Y,
		component.Radius,
		component.Rotation,
		component.Health,
	}

	sig := big.NewInt(0)
	for _, c := range comps {
		sig.SetBit(sig, c, 1)
	}
	deadBushSignature = sig
}

func DeadBushSignature() *big.Int {
	return new(big.Int).Set(deadBushSignature)
}

func (DeadBush) GetSignature() *big.Int {
	return DeadBushSignature()
}

func (e DeadBush) Insert(r column.Row) error {
	r.SetInt("ENTITY_TYPE", int(pb.Entity_DEAD_BUSH))
	r.SetFloat64("X", e.X)
	r.SetFloat64("Y", e.Y)
	r.SetFloat64("ROTATION", e.ROTATION)
	r.SetFloat64("RADIUS", e.RADIUS)
	r.SetFloat64("HEALTH", e.HEALTH)
	return nil
}
