package game

import (
	"github.com/Icemaster-Eric/Spellfire-Backend/internal/game/component"
	//"github.com/Icemaster-Eric/Spellfire-Backend/internal/game/entity"
	//"github.com/Icemaster-Eric/Spellfire-Backend/internal/game/system"
)

const (
	TickRate = 20 // ticks per second
)

type World struct {
	Entities   []uint32
	Archetypes map[uint16]*components.Archetype
	InputEvents chan string // 1024
	OutputEvents chan string // 2048
}

func (w *World) Spawn() {

}

func (w *World) Tick(dt float64) {

}
