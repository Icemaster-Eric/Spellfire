package game

import (
	"github.com/Icemaster-Eric/Spellfire-Backend/internal/game/archetype"
	//"github.com/Icemaster-Eric/Spellfire-Backend/internal/game/entity"
	//"github.com/Icemaster-Eric/Spellfire-Backend/internal/game/system"
)

const (
	TickRate = 20 // ticks per second
)

type World struct {
	Entities      []uint32
	NextEntityID  uint32
	Archetypes    map[uint16]*archetype.Archetype
	PlayerInputs  chan string // 1024
	PlayerUpdates chan string // 4096
}

func (w *World) SpawnPlayer(name string) uint32 {
	// special method for spawning a player specifically
	entityID := w.NextEntityID
	w.NextEntityID += 1

	return entityID
}

func (w *World) Tick(dt float64) {

}
