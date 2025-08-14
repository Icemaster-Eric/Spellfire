package entity

import (
	"math/big"
	"time"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/Icemaster-Eric/Spellfire/backend/internal/pb"
	"github.com/kelindar/column"
)

type Gunner struct {
	X, Y, VX, VY, ROTATION, RADIUS, HEALTH float64
	NAME                                   string
}

var gunnerSignature *big.Int

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
		component.IsFiring,
		component.LastFired,
		component.IsPlayer,
	}

	sig := big.NewInt(0)
	for _, c := range comps {
		sig.SetBit(sig, c, 1)
	}
	gunnerSignature = sig
}

func GunnerSignature() *big.Int {
	return new(big.Int).Set(gunnerSignature)
}

func (Gunner) GetSignature() *big.Int {
	return GunnerSignature()
}

func (e Gunner) Insert(r column.Row) error {
	r.SetInt("ENTITY_TYPE", int(pb.Entity_GUNNER))
	r.SetFloat64("X", e.X)
	r.SetFloat64("Y", e.Y)
	r.SetFloat64("VX", e.VX)
	r.SetFloat64("VY", e.VY)
	r.SetFloat64("ROTATION", e.ROTATION)
	r.SetFloat64("RADIUS", e.RADIUS)
	r.SetFloat64("HEALTH", e.HEALTH)
	r.SetString("NAME", e.NAME)
	r.SetBool("IS_FIRING", false)
	r.SetUint64("LAST_FIRED", uint64(time.Now().UnixMilli()))
	r.SetBool("IS_PLAYER", true)
	return nil
}
