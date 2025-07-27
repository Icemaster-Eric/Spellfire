package main

import (
	"fmt"
	"log"
	"math/rand"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/ebitenutil"
)

const (
	WorldWidth  = 320
	WorldHeight = 180
)

type BiomeType uint8

const (
	Void BiomeType = iota
	Water
	Plains
	Forest
	Desert
	Tundra
)

type RGB struct {
	R, G, B uint8
}

var biomeColors = map[BiomeType]RGB{
	Void:   {0, 0, 0},
	Water:  {116, 204, 244},
	Plains: {100, 200, 100},
	Forest: {34, 139, 34},
	Desert: {200, 155, 123},
	Tundra: {188, 205, 232},
}

type Cell struct {
	biome BiomeType
}

type World struct {
	grid [WorldWidth*WorldHeight]Cell
	nextGrid [WorldWidth*WorldHeight]Cell
}

// create new world
func NewWorld() *World {
	w := &World{
		grid: [WorldWidth*WorldHeight]Cell{},
		nextGrid: [WorldWidth*WorldHeight]Cell{},
	}
	w.init()
	return w
}

// init world with seeds
func (w *World) init() {
	/*
		seeds := [][2]int{}

		for _, seed := range seeds {
			w.grid[seed[0]][seed[1]] = rand.Float32()
		}
	*/

	for range 50 {
		x := rand.Intn(WorldWidth)
		y := rand.Intn(WorldHeight)
		w.grid[y*WorldWidth+x] = Cell{
			biome: BiomeType(rand.Intn(len(biomeColors) - 1)),
		}
	}
}

// update world state by one tick
func (w *World) Update() {
	for i, cell := range w.grid {
		switch cell.biome {
		case Water:
			if i-1 >= 0 && w.grid[i-1].biome == Void {
				w.nextGrid[i-1].biome = Water
			}
			if i+1 < WorldWidth*WorldHeight && w.grid[i+1].biome == Void {
				w.nextGrid[i+1].biome = Water
			}
			if i-WorldWidth >= 0 && w.grid[i-WorldWidth].biome == Void {
				w.nextGrid[i-WorldWidth].biome = Water
			}
			if i+WorldWidth < WorldWidth*WorldHeight && w.grid[i+WorldWidth].biome == Void {
				w.nextGrid[i+WorldWidth].biome = Water
			}
		case Plains:
			w.nextGrid[i].biome = Plains

			switch rand.Intn(5) {
			case 1:
				if i-1 >= 0 && w.grid[i-1].biome != Void {
					w.nextGrid[i-1].biome = Plains
				}
			case 2:
				if i+1 < WorldWidth*WorldHeight && w.grid[i+1].biome != Void {
					w.nextGrid[i+1].biome = Plains
				}
			case 3:
				if i-WorldWidth >= 0 && w.grid[i-WorldWidth].biome != Void {
					w.nextGrid[i-WorldWidth].biome = Plains
				}
			case 4:
				if i+WorldWidth < WorldWidth*WorldHeight && w.grid[i+WorldWidth].biome != Void {
					w.nextGrid[i+WorldWidth].biome = Plains
				}
			}
		case Forest:
			w.nextGrid[i].biome = Forest

			switch rand.Intn(5) {
			case 1:
				if i-1 >= 0 && w.grid[i-1].biome != Void {
					w.nextGrid[i-1].biome = Forest
				}
			case 2:
				if i+1 < WorldWidth*WorldHeight && w.grid[i+1].biome != Void {
					w.nextGrid[i+1].biome = Forest
				}
			case 3:
				if i-WorldWidth >= 0 && w.grid[i-WorldWidth].biome != Void {
					w.nextGrid[i-WorldWidth].biome = Forest
				}
			case 4:
				if i+WorldWidth < WorldWidth*WorldHeight && w.grid[i+WorldWidth].biome != Void {
					w.nextGrid[i+WorldWidth].biome = Forest
				}
			}
		}
	}
	w.grid = w.nextGrid
}

func (w *World) Draw(pix []byte) {
	for i, cell := range w.grid {
		c := biomeColors[cell.biome]
		pix[i*4] = c.R
		pix[i*4+1] = c.G
		pix[i*4+2] = c.B
		pix[i*4+3] = 255
	}
}

// ebitengine game
type Game struct {
	world  *World
	pixels []byte
}

func (g *Game) Update() error {
	g.world.Update()
	return nil
}

func (g *Game) Draw(screen *ebiten.Image) {
	if g.pixels == nil {
		g.pixels = make([]byte, WorldWidth*WorldHeight*4)
	}
	g.world.Draw(g.pixels)
	screen.WritePixels(g.pixels)
	ebitenutil.DebugPrint(screen, fmt.Sprintf("TPS: %0.2f", ebiten.ActualTPS()))
}

func (g *Game) Layout(outsideWidth, outsideHeight int) (int, int) {
	return WorldWidth, WorldHeight
}

func main() {
	g := &Game{
		world: NewWorld(),
	}

	ebiten.SetWindowSize(WorldWidth*2, WorldHeight*2)
	ebiten.SetWindowTitle("Spellfire Terrain Generation")

	ebiten.SetTPS(5)

	if err := ebiten.RunGame(g); err != nil {
		log.Fatal(err)
	}
}
