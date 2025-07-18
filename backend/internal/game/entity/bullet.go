package entity

import (
	"math/big"
	"time"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/kelindar/column"
)

type Bullet struct {
	X, Y, VX, VY, ROTATION, DAMAGE, LIFESPAN float64
}

var bulletSignature *big.Int

func init() {
	comps := []int{
		component.EntityID,
		component.X,
		component.Y,
		component.Vx,
		component.Vy,
		component.Rotation,
		component.Damage,
		component.IsBullet,
	}

	sig := big.NewInt(0)
	for _, c := range comps {
		sig.SetBit(sig, c, 1)
	}
	bulletSignature = sig
}

func BulletSignature() *big.Int {
	return new(big.Int).Set(bulletSignature)
}

func (Bullet) GetSignature() *big.Int {
	return BulletSignature()
}

func (e Bullet) Insert(r column.Row) error {
	r.SetFloat64("X", e.X)
	r.SetFloat64("Y", e.Y)
	r.SetFloat64("VX", e.VX)
	r.SetFloat64("VY", e.VY)
	r.SetFloat64("ROTATION", e.ROTATION)
	r.SetFloat64("DAMAGE", e.DAMAGE)
	r.SetTTL(time.Duration(e.LIFESPAN * float64(time.Second)))
	r.SetBool("IS_BULLET", true)
	return nil
}
