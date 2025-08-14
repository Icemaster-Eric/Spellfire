package entity

import (
	"math/big"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/pb"
	"github.com/kelindar/column"
)

type Rock struct {
	X, Y, ROTATION, RADIUS, HEALTH float64
}

var rockSignature *big.Int

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
	rockSignature = sig
}

func RockSignature() *big.Int {
	return new(big.Int).Set(rockSignature)
}

func (Rock) GetSignature() *big.Int {
	return RockSignature()
}

func (e Rock) Insert(r column.Row) error {
	r.SetInt("ENTITY_TYPE", int(pb.Entity_ROCK))
	r.SetFloat64("X", e.X)
	r.SetFloat64("Y", e.Y)
	r.SetFloat64("ROTATION", e.ROTATION)
	r.SetFloat64("RADIUS", e.RADIUS)
	r.SetFloat64("HEALTH", e.HEALTH)
	return nil
}
