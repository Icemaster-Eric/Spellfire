package entity

import (
	"math/big"
	"time"

	"github.com/Icemaster-Eric/Spellfire/backend/internal/game/component"
	"github.com/kelindar/column"
)

type Player struct {
	X, Y, VX, VY, ROTATION, RADIUS, HEALTH float64
	NAME                                   string
}

var playerSignature *big.Int

func init() {
	comps := []int{
		component.EntityID,
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
	r.SetFloat64("HEALTH", e.HEALTH)
	r.SetString("NAME", e.NAME)
	r.SetBool("IS_FIRING", false)
	r.SetUint64("LAST_FIRED", uint64(time.Now().UnixMilli()))
	r.SetBool("IS_PLAYER", true)
	return nil
}
