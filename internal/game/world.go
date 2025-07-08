package game

import (
	"github.com/Icemaster-Eric/Spellfire-Backend/internal/game/component"
	//"github.com/Icemaster-Eric/Spellfire-Backend/internal/game/entity"
	//"github.com/Icemaster-Eric/Spellfire-Backend/internal/game/system"
)

type World struct {
	Entities []uint32
	Archetypes map[uint16]*components.Archetype
}

func (w *World) Spawn() {
	
}

func (w *World) Tick() {
	
}
