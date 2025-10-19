import numpy as np
import matplotlib.pyplot as plt
import random
from scipy.ndimage import gaussian_filter
 
def generate_zones(width, height, speeds, seeds=None, random_seed=None):
    """
    width×height grid, len(speeds) seeds, each growing at rate speeds[i].
    speeds: array-like of length N giving relative growth rates for regions 0..N-1.
    """
    if random_seed is not None:
        np.random.seed(random_seed)
 
    num_regions = len(speeds)
    biome = -np.ones((height, width), dtype=int)
 
    # 1) Plant seeds
    if seeds is None:
        seeds = []
        for i in range(num_regions):
            while True:
                x, y = np.random.randint(width), np.random.randint(height)
                if biome[y, x] == -1:
                    biome[y, x] = i
                    seeds.append((x, y))
                    break
 
    # Helper: 4‐neighborhood
    def neighbors(x, y):
        return [(x+1,y),(x-1,y),(x,y+1),(x,y-1)]
 
    # 2) Build initial per-region frontier
    frontier = {i: [] for i in range(num_regions)}
    for i, (x, y) in enumerate(seeds):
        for nx, ny in neighbors(x, y):
            if 0 <= nx < width and 0 <= ny < height and biome[ny, nx] == -1:
                frontier[i].append((x, y))
                break
 
    cells_remaining = width*height - num_regions
    speeds = np.array(speeds, dtype=float)
    speeds = speeds / speeds.sum()  # normalize
 
    # 3) Grow until full
    while cells_remaining > 0:
        active = [i for i, front in frontier.items() if front]
        if not active:
            break
        probs = speeds[active]
        probs = probs / probs.sum()
        region = np.random.choice(active, p=probs)
 
        # pick and expand one frontier cell
        fx, fy = frontier[region].pop(np.random.randint(len(frontier[region])))
        free_nb = [(nx, ny) for nx, ny in neighbors(fx, fy)
                   if 0 <= nx < width and 0 <= ny < height and biome[ny, nx] == -1]
        if not free_nb:
            continue
 
        nx, ny = free_nb[np.random.randint(len(free_nb))]
        biome[ny, nx] = region
        cells_remaining -= 1
 
        # update frontier for old and new cells
        for cx, cy in [(fx, fy), (nx, ny)]:
            if any(0 <= mx < width and 0 <= my < height and biome[my, mx] == -1
                   for mx, my in neighbors(cx, cy)):
                frontier[region].append((cx, cy))
 
    return biome
 
def smooth_regions(biome, sigma=1.0):
def smooth_regions(biome, sigma=2.0):
    """
    Take integer-labeled 'biome' map and return a new map whose region
    boundaries have been smoothed by Gaussian neighborhood voting.
    sigma controls the blur strength; higher = wider/rounder edges.
    """
    n_regions = int(biome.max()) + 1
    h, w = biome.shape
    # stack up a blurred score volume (regions × H × W)
    scores = np.zeros((n_regions, h, w), dtype=float)
    for i in range(n_regions):
        mask = (biome == i).astype(float)
        scores[i] = gaussian_filter(mask, sigma=sigma)
    # at each pixel, pick the region with the highest blurred score
    return np.argmax(scores, axis=0)
 
def generate_poisson_points(width, height, num_points, min_dist=30, max_tries=30):
    """
    Poisson disk sampling (Bridson's algorithm) to generate evenly spaced points.
    Returns a list of [x, y, speed] entries.
    """
    from math import sqrt, ceil
    import random
 
    cell_size = min_dist / sqrt(2)
    grid_w = int(ceil(width / cell_size))
    grid_h = int(ceil(height / cell_size))
    grid = [[None for _ in range(grid_w)] for _ in range(grid_h)]
 
    def grid_coords(pt):
        return int(pt[0] / cell_size), int(pt[1] / cell_size)
 
    def in_neighborhood(pt):
        gx, gy = grid_coords(pt)
        for y in range(max(0, gy - 2), min(grid_h, gy + 3)):
            for x in range(max(0, gx - 2), min(grid_w, gx + 3)):
                neighbor = grid[y][x]
                if neighbor:
                    dx, dy = neighbor[0] - pt[0], neighbor[1] - pt[1]
                    if dx * dx + dy * dy < min_dist * min_dist:
                        return True
        return False
 
    def generate_random_point_around(pt):
        r = random.uniform(min_dist, 2 * min_dist)
        angle = random.uniform(0, 2 * np.pi)
        new_pt = (pt[0] + r * np.cos(angle), pt[1] + r * np.sin(angle))
        if 0 <= new_pt[0] < width and 0 <= new_pt[1] < height:
            return new_pt
        return None
 
    points = []
    active = []
 
    # Initial point
    init_pt = (random.uniform(0, width), random.uniform(0, height))
    points.append(init_pt)
    active.append(init_pt)
    gx, gy = grid_coords(init_pt)
    grid[gy][gx] = init_pt
 
    while active and len(points) < num_points:
        idx = random.randint(0, len(active) - 1)
        pt = active[idx]
        found = False
        for _ in range(max_tries):
            new_pt = generate_random_point_around(pt)
            if new_pt and not in_neighborhood(new_pt):
                points.append(new_pt)
                active.append(new_pt)
                gx, gy = grid_coords(new_pt)
                grid[gy][gx] = new_pt
                found = True
                break
        if not found:
            active.pop(idx)
 
    # Add speed to each point
    result = [[int(x), int(y), 1] for x, y in points[:num_points]]
    return result
 
 
if __name__ == "__main__":
    # PARAMETERS
    WIDTH, HEIGHT = 256, 256
    points = generate_poisson_points(WIDTH, HEIGHT, 10, min_dist=50)
    seeds = [p[:2] for p in points]
    speeds = [p[2] for p in points]
 
    # Generate and then smooth
    zone_map   = generate_zones(WIDTH, HEIGHT, speeds, None)
    smooth_map = smooth_regions(zone_map, sigma=2.5)
 
    # PLOT
    fig, ax2 = plt.subplots(1, 1, figsize=(6, 6))
 
    # Draw the biome map
    ax2.pcolormesh(smooth_map, shading='nearest')
 
    # Plot seed points
    seed_x = [x + 0.5 for x, y in seeds]  # +0.5 to center in cell
    seed_y = [y + 0.5 for x, y in seeds]
    ax2.scatter(seed_x, seed_y, c='black', s=20, marker='x', label='Seeds')
 
    ax2.set_title("Biome Generator with Seeds")
    ax2.axis('off')
    ax2.legend(loc='upper right')
 
    plt.tight_layout()
    plt.show()
 