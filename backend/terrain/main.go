package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"math/rand"
	"os"

	"github.com/hajimehoshi/ebiten/v2"
	"github.com/hajimehoshi/ebiten/v2/ebitenutil"
)

const (
	WorldWidth  = 1024
	WorldHeight = 1024
)

type BiomeType uint8

const (
	Void BiomeType = iota
	Water
	Plains
	Forest
	Desert
	Tundra
	DeepWater
)

type RGB struct {
	R, G, B uint8
}

var biomeColors = map[BiomeType]RGB{
	Void:      {0, 0, 0},
	Water:     {116, 204, 244},
	Plains:    {100, 200, 100},
	Forest:    {34, 139, 34},
	Desert:    {180, 155, 123},
	Tundra:    {208, 225, 252},
	DeepWater: {0, 85, 106},
}

func SelectBiome(weights []int) int {
	total := 0
	for _, w := range weights {
		total += w
	}

	r := rand.Intn(total)
	for i, w := range weights {
		if r < w {
			return i
		}
		r -= w
	}
	return -1 // should never reach here if weights are valid
}

type Cell struct {
	biome BiomeType
	age   int
}

type World struct {
	grid     [WorldWidth * WorldHeight]Cell
	nextGrid [WorldWidth * WorldHeight]Cell
	ticks    int
}

// create new world
func NewWorld() *World {
	w := &World{
		grid:     [WorldWidth * WorldHeight]Cell{},
		nextGrid: [WorldWidth * WorldHeight]Cell{},
	}
	w.init()
	return w
}

// init world with seeds
func (w *World) init() {
	const (
        numSeeds    = 500
        centerRadius = 400.0
        edgeCount   = 500
        // thickness of the ring, in pixels:
        borderThickness = 1
    )
    cx := float64(WorldWidth) / 2
    cy := float64(WorldHeight) / 2

	for i := 0; i < numSeeds; i++ {
		// random angle 0 ≤ θ < 2π
		theta := rand.Float64() * 2 * math.Pi
		// random radius 0 ≤ r ≤ radius, with PDF ∝ r for uniform area
		r := math.Sqrt(rand.Float64()) * centerRadius

		// convert polar → cartesian offsets
		dx := int(r * math.Cos(theta))
		dy := int(r * math.Sin(theta))

		x := int(cx) + dx
		y := int(cy) + dy

		// ensure we landed inside the grid bounds
		if x < 0 || x >= WorldWidth || y < 0 || y >= WorldHeight {
			i-- // reject and retry
			continue
		}

		w.grid[y*WorldWidth+x] = Cell{
			biome: BiomeType(SelectBiome([]int{
				0,  // void
				20, // water
				20, // plains
				15, // forest
				4,  // desert
				1,  // tundra
				0,  // deep water
			})),
		}
	}

	outer := float64(WorldWidth) / 2
    inner := outer - borderThickness

    for i := 0; i < edgeCount; i++ {
        // random angle
        theta := rand.Float64() * 2 * math.Pi
        // random radius between inner and outer, with PDF ∝ r
        // generate u in [inner², outer²], then r = sqrt(u)
        u := rand.Float64()*(outer*outer-inner*inner) + inner*inner
        r := math.Sqrt(u)

        dx := int(r * math.Cos(theta))
        dy := int(r * math.Sin(theta))

        x := int(cx) + dx
        y := int(cy) + dy

        // if out of bounds (very rare), retry
        if x < 0 || x >= WorldWidth || y < 0 || y >= WorldHeight {
            i--
            continue
        }

        w.grid[y*WorldWidth+x] = Cell{biome: DeepWater}
    }

	w.grid[0] = Cell{biome: DeepWater}
	w.grid[WorldWidth-1] = Cell{biome: DeepWater}
	w.grid[WorldHeight*(WorldWidth-1)] = Cell{biome: DeepWater}
	w.grid[WorldHeight*WorldWidth-1] = Cell{biome: DeepWater}
}

// one pass of majority‐rule smoothing:
func (w *World) SmoothEdges() {
	for i := range w.nextGrid {
		counts := map[BiomeType]int{
			w.grid[i].biome: 1,
		}

		x := i % WorldWidth
		y := i / WorldWidth

		for dy := -1; dy <= 1; dy++ {
			for dx := -1; dx <= 1; dx++ {
				if dx == 0 && dy == 0 {
					continue
				}
				nx, ny := x+dx, y+dy
				if nx < 0 || nx >= WorldWidth || ny < 0 || ny >= WorldHeight {
					continue
				}
				nb := w.grid[ny*WorldWidth+nx].biome
				counts[nb]++
			}
		}

		var bestBiome BiomeType
		var bestCount int
		for b, c := range counts {
			if c > bestCount {
				bestCount, bestBiome = c, b
			}
		}
		w.nextGrid[i].biome = bestBiome
	}

	w.grid, w.nextGrid = w.nextGrid, w.grid
}

// update world state by one tick
func (w *World) Update() {
	if w.ticks == 500 {
		for range 5 {
			w.SmoothEdges()
		}
		// save generated grid
		data := make([]int, len(w.grid))
		for i, cell := range w.grid {
			data[i] = int(cell.biome)
		}

		file, err := os.Create("biomes.json")
		if err != nil {
			log.Println("Error creating file:", err)
			return
		}
		defer file.Close()

		encoder := json.NewEncoder(file)

		if err := encoder.Encode(data); err != nil {
			log.Println("Error encoding JSON:", err)
			return
		}

		log.Println("Biomes saved to biomes.json")
		w.ticks++

		return
	}
	if w.ticks > 500 {
		return
	}
	for i, cell := range w.grid {
		w.nextGrid[i].age++

		switch cell.biome {
		case Void:
			if i-1 >= 0 && rand.Intn(2) == 0 {
				switch w.grid[i-1].biome {
				case Water:
					w.nextGrid[i].biome = Water
				case DeepWater:
					if rand.Intn(3) == 0 {
						w.nextGrid[i].biome = DeepWater
					}
				}
			}
			if i+1 < WorldWidth*WorldHeight && rand.Intn(2) == 0 {
				switch w.grid[i+1].biome {
				case Water:
					w.nextGrid[i].biome = Water
				case DeepWater:
					if rand.Intn(3) == 0 {
						w.nextGrid[i].biome = DeepWater
					}
				}
			}
			if i-WorldWidth >= 0 && rand.Intn(2) == 0 {
				switch w.grid[i-WorldWidth].biome {
				case Water:
					w.nextGrid[i].biome = Water
				case DeepWater:
					if rand.Intn(3) == 0 {
						w.nextGrid[i].biome = DeepWater
					}
				}
			}
			if i+WorldWidth < WorldWidth*WorldHeight && rand.Intn(2) == 0 {
				switch w.grid[i+WorldWidth].biome {
				case Water:
					w.nextGrid[i].biome = Water
				case DeepWater:
					if rand.Intn(3) == 0 {
						w.nextGrid[i].biome = DeepWater
					}
				}
			}
		case Water:
			if cell.age > 160 {
				continue
			}
			switch rand.Intn(8) {
			case 0:
				if i-1 >= 0 && w.grid[i-1].biome != Void && w.grid[i-1].biome != DeepWater {
					w.nextGrid[i].biome = w.nextGrid[i-1].biome
				}
			case 1:
				if i+1 < WorldWidth*WorldHeight && w.grid[i+1].biome != Void && w.grid[i+1].biome != DeepWater {
					w.nextGrid[i].biome = w.nextGrid[i+1].biome
				}
			case 2:
				if i-WorldWidth >= 0 && w.grid[i-WorldWidth].biome != Void && w.grid[i-WorldWidth].biome != DeepWater {
					w.nextGrid[i].biome = w.nextGrid[i-WorldWidth].biome
				}
			case 3:
				if i+WorldWidth < WorldWidth*WorldHeight && w.grid[i+WorldWidth].biome != Void && w.grid[i+WorldWidth].biome != DeepWater {
					w.nextGrid[i].biome = w.nextGrid[i+WorldWidth].biome
				}
			}
		case Plains:
			w.nextGrid[i].biome = Plains
		case Forest:
			w.nextGrid[i].biome = Forest
		case Desert:
			w.nextGrid[i].biome = Desert
		case Tundra:
			w.nextGrid[i].biome = Tundra
		case DeepWater:
			w.nextGrid[i].biome = DeepWater
		}
	}
	w.grid = w.nextGrid
	w.ticks++
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

	ebiten.SetWindowSize(WorldWidth, WorldHeight)
	ebiten.SetWindowTitle("Spellfire Terrain Generation")

	ebiten.SetTPS(120)

	if err := ebiten.RunGame(g); err != nil {
		log.Fatal(err)
	}
}
