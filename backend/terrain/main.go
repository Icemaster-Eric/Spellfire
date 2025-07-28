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
	WorldSize   = WorldWidth * WorldHeight
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
	grid        [WorldSize]Cell
	nextGrid    [WorldSize]Cell
	heatmap     [WorldSize]map[int]float32
	ticks       int
	drawHeatmap bool
}

// create new world
func NewWorld() *World {
	w := &World{
		grid:     [WorldSize]Cell{},
		nextGrid: [WorldSize]Cell{},
	}
	w.init()
	return w
}

// init world with seeds
func (w *World) init() {
	const (
		numSeeds     = 500
		centerRadius = 400.0
		edgeCount    = 500
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
				23, // plains
				12, // forest
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
	w.grid[WorldSize-1] = Cell{biome: DeepWater}
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

	w.grid = w.nextGrid
}

// calculate biome "heatmap"
func (w *World) GenerateHeatmap() {
    const R = 8

    // clamping functions idk
    min := func(a, b int) int {
        if a < b {
            return a
        }
        return b
    }
    max := func(a, b int) int {
        if a > b {
            return a
        }
        return b
    }

    // init maps
    for i := range w.heatmap {
        w.heatmap[i] = make(map[int]float32)
    }
    // store horizontal‐blurred distributions
    horiz := make([]map[int]float32, WorldSize)
    for i := range horiz {
        horiz[i] = make(map[int]float32)
    }

    // horizontal pass
    for y := range WorldHeight {
        for x := range WorldWidth {
            counts := make(map[int]int)
            x0 := max(0, x-R)
            x1 := min(WorldWidth-1, x+R)
            windowW := x1 - x0 + 1

            // tally biomes along the row segment
            base := y * WorldWidth
            for xi := x0; xi <= x1; xi++ {
                b := int(w.grid[base+xi].biome)
                counts[b]++
            }

            idx := base + x
            for b, cnt := range counts {
                horiz[idx][b] = float32(cnt) / float32(windowW)
            }
        }
    }

    // vertical pass
    for y := range WorldHeight {
        for x := range WorldWidth {
            agg := make(map[int]float32)
            y0 := max(0, y-R)
            y1 := min(WorldHeight-1, y+R)
            windowH := y1 - y0 + 1

            // sum up horizontal‐blurred values down the column
            for yi := y0; yi <= y1; yi++ {
                idx2 := yi*WorldWidth + x
                for b, v := range horiz[idx2] {
                    agg[b] += v
                }
            }

            // normalize
            idx := y*WorldWidth + x
            for b, sum := range agg {
                w.heatmap[idx][b] = sum / float32(windowH)
            }
        }
    }
}

func saveData(fname string, data any) {
	file, err := os.Create(fname)
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
}

// update world state by one tick
func (w *World) Update() {
	if w.ticks == 500 {
		for range 5 {
			w.SmoothEdges()
		}

		// generate and draw heatmap
		w.GenerateHeatmap()
		// w.drawHeatmap = true
		// save generated heatmap
		saveData("terrain/generations/generated-heatmap.json", w.heatmap)

		// save generated grid
		biomeData := make([]int, len(w.grid))
		for i, cell := range w.grid {
			biomeData[i] = int(cell.biome)
		}
		saveData("terrain/generations/generated-biomes.json", biomeData)

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
			if i+1 < WorldSize && rand.Intn(2) == 0 {
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
			if i+WorldWidth < WorldSize && rand.Intn(2) == 0 {
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
				if i+1 < WorldSize && w.grid[i+1].biome != Void && w.grid[i+1].biome != DeepWater {
					w.nextGrid[i].biome = w.nextGrid[i+1].biome
				}
			case 2:
				if i-WorldWidth >= 0 && w.grid[i-WorldWidth].biome != Void && w.grid[i-WorldWidth].biome != DeepWater {
					w.nextGrid[i].biome = w.nextGrid[i-WorldWidth].biome
				}
			case 3:
				if i+WorldWidth < WorldSize && w.grid[i+WorldWidth].biome != Void && w.grid[i+WorldWidth].biome != DeepWater {
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
	if w.drawHeatmap {
        // visualize blended heatmap
        for i := range WorldSize {
            // start accumulator
            var rAcc, gAcc, bAcc float32

            // get the fractional distribution for this cell
            dist := w.heatmap[i]
            for biomeID, weight := range dist {
                col := biomeColors[BiomeType(biomeID)]
                rAcc += float32(col.R) * weight
                gAcc += float32(col.G) * weight
                bAcc += float32(col.B) * weight
            }

            // clamp & write back into pix[]
            idx := i * 4
            // ensure values are in [0,255]
            pix[idx]   = uint8(math.Min(float64(rAcc), 255))
            pix[idx+1] = uint8(math.Min(float64(gAcc), 255))
            pix[idx+2] = uint8(math.Min(float64(bAcc), 255))
            pix[idx+3] = 255
        }
        return
    }

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
		g.pixels = make([]byte, WorldSize*4)
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
