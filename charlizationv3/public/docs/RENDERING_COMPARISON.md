# Rendering Pipeline: Code vs Binary Analysis Doc — Comparison Report

## Summary

This report compares renderer.js against Civ2_MGE_Binary_Analysis.md layer by layer, identifying discrepancies that could cause incorrect rendering.

---

## 1. CLEAN_VARIANTS Table (Base Terrain Variant Columns)

### Doc Says
Each terrain type has specific "clean" (text-free) and "contaminated" (has baked-in magenta text) columns:

| Terrain        | Clean Variants       | Contaminated          |
|----------------|---------------------|-----------------------|
| Desert (0)     | 0, 1, 4             | 2, 3                  |
| Plains (1)     | 0, 1, 4             | 2, 3                  |
| Grassland (2)  | 0, 1, 4             | 2, 3                  |
| Forest (3)     | 0, 1, 4, 5, 6, 8    | 2, 3, 7               |
| Hills (4)      | 0, 1, 4, 5, 6, 8    | 2, 3, 7               |
| Mountains (5)  | 0, 1, 4, 5, 6        | 2, 3, 7, 8            |
| Tundra (6)     | 0, 4                 | 1, 2, 3, 8            |
| Glacier (7)    | 0, 4                 | 1, 2, 3, 8            |
| Swamp (8)      | 0, 4                 | 1, 2, 3               |
| Jungle (9)     | 0, 1, 4, 8           | 2, 3                  |
| Ocean (10)     | 0, 1, 4              | 2, 3                  |

**Note**: Cols 2-3 are resource sprites, col 7 has improvement sprites — these are correctly excluded from CLEAN_VARIANTS. The doc's clean list refers to columns among {0, 1, 4, 5, 6, 7, 8} that lack text labels.

### Code Has (renderer.js:44-56)
Every single terrain type uses the same list: `[0, 1, 4, 5, 6, 8]`

### DISCREPANCY: MEDIUM
The code uses a uniform `[0, 1, 4, 5, 6, 8]` for all 11 terrain types. The doc says different terrains have different clean columns:

| Terrain     | Code Uses          | Doc Says Clean       | Extra in Code (contaminated) | Missing from Code |
|-------------|--------------------|--------------------- |------------------------------|-------------------|
| Desert      | 0,1,4,5,6,8       | 0,1,4                | **5, 6, 8**                  | —                 |
| Plains      | 0,1,4,5,6,8       | 0,1,4                | **5, 6, 8**                  | —                 |
| Grassland   | 0,1,4,5,6,8       | 0,1,4                | **5, 6, 8**                  | —                 |
| Forest      | 0,1,4,5,6,8       | 0,1,4,5,6,8          | ✅ Match                     | —                 |
| Hills       | 0,1,4,5,6,8       | 0,1,4,5,6,8          | ✅ Match                     | —                 |
| Mountains   | 0,1,4,5,6,8       | 0,1,4,5,6            | **8**                        | —                 |
| Tundra      | 0,1,4,5,6,8       | 0,4                  | **1, 5, 6, 8**               | —                 |
| Glacier     | 0,1,4,5,6,8       | 0,4                  | **1, 5, 6, 8**               | —                 |
| Swamp       | 0,1,4,5,6,8       | 0,4                  | **1, 5, 6, 8**               | —                 |
| Jungle      | 0,1,4,5,6,8       | 0,1,4,8              | **5, 6**                     | —                 |
| Ocean       | 0,1,4,5,6,8       | 0,1,4                | **5, 6, 8**                  | —                 |

**Mitigating factor**: The `<50% opaque` post-extraction filter (renderer.js:384-406) discards most contaminated sprites at runtime, so the visual impact may be minimal for vanilla TERRAIN1.GIF. But the filter is a heuristic — a contaminated sprite with >50% opaque pixels would slip through and show text artifacts. Using the doc's per-terrain clean lists would be more robust.

---

## 2. Rendering Pipeline Order

### Doc Says (10 layers)
1. Base terrain (TERRAIN1 rows 0-10)
2. Dither blend (TERRAIN1 dither tile at y=447)
3. Coastline transitions (TERRAIN2 bottom section, ocean only)
4. River overlay (TERRAIN2 rows 2-3)
5. Terrain overlay — forest/hills/mountains (TERRAIN2 rows 4-9)
6. Road overlay (TERRAIN1 row 11)
7. Railroad overlay (TERRAIN1 row 12)
8. Improvement overlay — irrigation/farmland/mining/pollution (TERRAIN1 col 7/9)
9. Resource icon (TERRAIN1 cols 2-3)
10. City sprite / Unit sprite

### Code Has (renderer.js passes)
- **Pass 1**: Base terrain ✅
- **Pass 2**: Dither blending ✅
- **Pass 3** (single loop): Coastline → Rivers → Terrain overlays → Roads/Railroads → Improvements (irrigation/farmland → resources/shield → mining/pollution) → Goody huts
- **Pass 4**: Cities
- **Pass 5**: Units
- **Pass 6**: Fortress/Airbase
- **Pass 7+8**: FOW shroud
- **Pass 9**: City name labels

### DISCREPANCY: NONE (functionally)
The code combines doc layers 3-9 into a single pass (Pass 3) but the internal ordering within that loop matches the doc's specified back-to-front compositing order. Within each tile:
1. Coastline (ocean) ✅
2. Rivers ✅
3. Forest/mountains/hills overlays ✅
4. Roads then railroads ✅
5. Improvements then resources ✅

The only difference is that the code interleaves improvement sub-steps (irrigation/farmland → resources → mining/pollution) rather than drawing all improvements then all resources. This is actually **correct behavior** — resources should appear on top of irrigation but below mining/pollution overlays.

---

## 3. Dither Blending (`_applyDither`)

### Doc Says
The dither mask is the bottom 16 rows of the tile at y=447 (i.e., y=463-478). Black pixels (palette index 0) are dither holes. The mask is transformed per direction:

| Direction | Tile Half           | H-Flip | V-Flip |
|-----------|---------------------|--------|--------|
| SE        | Bottom (rows 16-31) | No     | No     |
| SW        | Bottom (rows 16-31) | Yes    | No     |
| NE        | Top (rows 0-15)     | No     | Yes    |
| NW        | Top (rows 0-15)     | Yes    | Yes    |

The doc writes the pixel source as `neighbor_sprite[16+dy, dx]` (SE) / `neighbor_sprite[dy, dx]` (NE), meaning **we sample from the neighbor's sprite at the tile position being written to**.

### Code Has (renderer.js:1098-1171)
The code uses **quadrant-based diamond clipping** (NE writes to top-right 32×16, SE to bottom-right 32×16, etc.) and samples from `neighborData` at the corresponding tile-local position.

**Mask transformations**:
- NE: `mask[(15 - dy) * 64 + dx]` → V-flipped, no H-flip ✅
- SE: `mask[dy * 64 + dx]` → no flips ✅
- SW: `mask[dy * 64 + dx]` → no flips...
- NW: `mask[(15 - dy) * 64 + dx]` → V-flipped, no H-flip...

### DISCREPANCY: POSSIBLE — SW and NW horizontal flip missing

The doc says SW should be H-flipped (`mask[dy, 63-dx]`) and NW should be both H-flipped and V-flipped (`mask[15-dy, 63-dx]`).

The code for SW (line 1146) uses: `mask[dy * 64 + dx]` — **no H-flip**.
The code for NW (line 1161) uses: `mask[(15 - dy) * 64 + dx]` — V-flip only, **no H-flip**.

However, the code also restricts each direction to a different **quadrant of the tile** (NE/SE = right half dx 32-63, NW/SW = left half dx 0-31). The doc's algorithm instead writes to the full tile half (top or bottom, full width). These are fundamentally different approaches:

- **Doc**: Each direction fills the full top or bottom half (64px wide), using H/V flips on the mask.
- **Code**: Each direction fills only one quadrant (32px wide), with the mask applied without H-flip since the quadrant already restricts the spatial region.

**Assessment**: The quadrant-based approach may be functionally equivalent or may produce subtly different dither patterns. The doc explicitly states the mask is NOT left-right symmetric in its hole placement, so the code's lack of H-flip for SW/NW could produce different dither holes than the original game. This needs visual comparison to determine if it matters in practice.

---

## 4. Coastline Rendering

### Doc Says
4-quadrant system with 32x16 sub-tile sprites. Quadrant placement:
- TOP: (16, 0)
- BOTTOM: (16, 16)
- LEFT: (0, 8)
- RIGHT: (32, 8)

Bit ordering (clockwise):
- TOP: NW=bit0, N=bit1, NE=bit2
- RIGHT: NE=bit0, E=bit1, SE=bit2
- BOTTOM: SE=bit0, S=bit1, SW=bit2
- LEFT: SW=bit0, W=bit1, NW=bit2

### Code Has (renderer.js:437-551)
Placement offsets: `COX=[16,16,0,32]`, `COY=[0,16,8,8]` ✅

Bit computation:
```js
topG   = (L.NW?1:0) | (L.N?2:0)  | (L.NE?4:0)  // NW=1, N=2, NE=4 ✅
rightG = (L.NE?1:0) | (L.E?2:0)  | (L.SE?4:0)  // NE=1, E=2, SE=4 ✅
botG   = (L.SE?1:0) | (L.S?2:0)  | (L.SW?4:0)  // SE=1, S=2, SW=4 ✅
leftG  = (L.SW?1:0) | (L.W?2:0)  | (L.NW?4:0)  // SW=1, W=2, NW=4 ✅
```

### DISCREPANCY: NONE ✅

---

## 5. River Rendering

### Doc Says
- Land tiles: 4-bit mask from diagonal neighbors, NE=1, SE=2, SW=4, NW=8
- Ocean neighbors count as river connections
- River mouths: TERRAIN2 row 10 cols 0-3 (NE, SE, SW, NW), drawn on ocean tiles

### Code Has (renderer.js:563-571)
```js
rm |= 1  // NE ✅
rm |= 2  // SE ✅
rm |= 4  // SW ✅
rm |= 8  // NW ✅
```
Ocean neighbors count as connections: `getTerrain(...) === 10` ✅

River mouths (renderer.js:553-560): drawn on ocean tiles for each diagonal where neighbor is land+river ✅

### DISCREPANCY: NONE ✅

---

## 6. Terrain Overlays (Forest/Mountains/Hills)

### Doc Says
- Forest: TERRAIN2 rows 4-5, Mountains: rows 6-7, Hills: rows 8-9
- 16 variants indexed by 4-bit neighbor connectivity bitmask: NE=1, SE=2, SW=4, NW=8
- Only Forest (3), Hills (4), Mountains (5) get overlays — not Jungle (9) or Swamp (8)

### Code Has (renderer.js:573-585)
- Applies to `ter === 3 || ter === 4 || ter === 5` ✅
- Bitmask: NE=1, SE=2, SW=4, NW=8 ✅
- Sprite arrays: `forest[ovi]`, `mountains[ovi]`, `hills[ovi]` ✅

### DISCREPANCY: NONE ✅

---

## 7. Roads & Railroads

### Doc Says
TERRAIN1 row 11 (roads), row 12 (railroads). Cols 1-8 = directional segments:
- Col 1=NE, 2=E, 3=SE, 4=S, 5=SW, 6=W, 7=NW, 8=N

For each tile with roads, check all 8 directions — if neighbor also has road, draw that direction segment.

### Code Has (renderer.js:587-608)
Direction order: `['NE','E','SE','S','SW','W','NW','N']` → indices 0-7
Sprites extracted from cols 1-8 (`(i+1)*65+1`) → road[0]=NE, road[1]=E, etc. ✅

Cities act as road/railroad endpoints (`hasCity = imp & 0x02`) ✅

### DISCREPANCY: NONE ✅

---

## 8. Improvement Overlays

### Doc Says
| Improvement | Flag                    | Sprite Location     |
|-------------|-------------------------|---------------------|
| Irrigation  | byte[1] & 0x04          | TERRAIN1 row 3 col 7 |
| Farmland    | byte[1] & 0x04 + 0x08   | TERRAIN1 row 4 col 7 |
| Mining      | byte[1] & 0x08 (no irr) | TERRAIN1 row 5 col 7 |
| Pollution   | byte[1] & 0x80          | TERRAIN1 row 6 col 7 |
| Fortress    | byte[1] & 0x40          | CITIES.GIF           |
| Airbase     | byte[1] & 0x40 + 0x02   | CITIES.GIF           |

### Code Has (renderer.js:210-215, 610-633, 942-961)
Sprite extraction:
- irrigation: row 3 col 7 ✅
- farmland: row 4 col 7 ✅
- mining: row 5 col 7 ✅
- pollution: row 6 col 7 ✅

Detection logic:
- `imp & 0x04` → irrigation (or farmland if mining too) ✅
- `imp & 0x08 && !(imp & 0x04)` → mining only ✅
- `imp & 0x80` → pollution ✅
- Airbase: `imp & 0x02` (city bit) + `imp & 0x40` (fortress bit) ✅

### DISCREPANCY: NONE ✅

---

## 9. Resource Icons

### Doc Says
- TERRAIN1 cols 2 (special 1) and 3 (special 2) per terrain row
- Placement via map seed formula: `seed % 64` → s1x, s1y, s2x, s2y → 4x4 grid check
- Grassland is special: uses coordinate-only HasShield() formula instead of seed-based resources

### Code Has (renderer.js:189-194, 617-629)
- Resource sprites extracted from cols 2 and 3 ✅
- Grassland uses `hasShield()` separate formula ✅
- Other terrains use `getResource()` ✅

### DISCREPANCY: NONE ✅
(Resource formula is in parser.js and was verified separately)

---

## 10. Neighbor Lookup

### Doc Says
```
Even row: NE=(gx, gy-1), SE=(gx, gy+1), NW=(gx-1, gy-1), SW=(gx-1, gy+1)
Odd row:  NE=(gx+1, gy-1), SE=(gx+1, gy+1), NW=(gx, gy-1), SW=(gx, gy+1)
```
Key rule: Even rows — NE/SE same column, NW/SW column-1. Odd rows — NE/SE column+1, NW/SW same column.

### Code Has (parser.js:260-272)
```js
Even: NE:[wrap(gx),gy-1], SE:[wrap(gx),gy+1], NW:[wrap(gx-1),gy-1], SW:[wrap(gx-1),gy+1]
Odd:  NE:[wrap(gx+1),gy-1], SE:[wrap(gx+1),gy+1], NW:[wrap(gx),gy-1], SW:[wrap(gx),gy+1]
```

### DISCREPANCY: NONE ✅

---

## 11. Sprite Extraction Coordinates

### Doc Says
- TERRAIN1/TERRAIN2: 65x33 grid (64x32 sprite + 1px border)
- Extraction: `x = V*65 + 1, y = T*33 + 1`
- City/unit sprites: 65x49 grid (64x48 sprite + 1px border)
- UNITS.GIF: 9 columns × 7 rows

### Code Has
- Terrain: `col * 65 + 1, tid * 33 + 1` ✅
- Units: `col = id % 9, row = id / 9`, `cellX = col * 65` ✅
- Coast extraction at y=429, 446, 463 on 33px column grid ✅

### DISCREPANCY: NONE ✅

---

## 12. Chroma Key Colors

### Doc Says
| Sheet    | Colors                                                    |
|----------|-----------------------------------------------------------|
| TERRAIN1 | magenta(255,0,255)±15, cyan(0,255,255)±15, gray(135,135,135)±5 (tightened) |
| TERRAIN2 | magenta(255,0,255)±15, cyan(0,255,255), gray(132,132,132)±15 |
| CITIES   | magenta±15, cyan±15, gray(135,135,135)±15                  |
| UNITS    | magenta±15, purplish-gray(135,83,135)±15                   |

### Code Has (renderer.js:128-136)
```js
T1  = [[255,0,255,15], [0,255,255,15], [135,135,135,3]]     // gray tol=3 (tighter than doc's ±5)
T1R = [[0,255,255,40], [255,0,255,15], [135,135,135,3]]     // cyan tol=40 (much wider for resources)
T2  = [[255,0,255], [0,255,255], [132,132,132]]              // default tol=15 ✅
CC  = [[255,0,255], [0,255,255], [135,135,135]]              // ✅
UC  = [[255,0,255], [135,83,135]]                            // ✅
```

### DISCREPANCY: MINOR
- T1 gray tolerance is ±3 vs doc's ±5. The code tightened this beyond the doc to avoid stripping terrain pixels. This is intentional and documented in MEMORY.md. ✅ (deliberate)
- T1R cyan tolerance is ±40 (much wider). This is specific to resource sprite extraction and may be intentionally aggressive. ✅ (deliberate)

---

## 13. Dither Mask Quadrant-vs-Half Approach

### Doc's Algorithm
Each direction covers a full **half** of the tile (64px wide):
- NE/NW → top half (rows 0-15, full 64px width)
- SE/SW → bottom half (rows 16-31, full 64px width)
- Horizontal flip distinguishes left from right within each half

### Code's Algorithm
Each direction covers only one **quadrant** (32px wide):
- NE → top-right (dx=32-63, dy=0-15)
- NW → top-left (dx=0-31, dy=0-15)
- SE → bottom-right (dx=32-63, dy=16-31)
- SW → bottom-left (dx=0-31, dy=16-31)
- No horizontal flip needed because spatial restriction replaces it

### DISCREPANCY: STRUCTURAL DIFFERENCE
The doc's approach produces dither holes across the full top or bottom half, using H-flip to differentiate left/right. The code's approach restricts each direction to its own quadrant — never crossing the midline.

**Impact**: For a tile with a neighbor in only ONE diagonal direction (e.g., only NE has a different terrain), the doc would dither across the entire top half (rows 0-15, columns 0-63), while the code only dithers the top-right quadrant (rows 0-15, columns 32-63). The diamond clipping mitigates this somewhat since the top half diamond narrows toward the top, but at row 15 (widest point) the diamond spans full width, so the difference could be visible.

Additionally, the doc specifies the mask is NOT left-right symmetric. The code never H-flips, so SW uses the right-side mask pattern in the left half, and NW does the same. In the original game, SW would use the H-flipped mask.

**Verdict**: This is likely causing subtly wrong dither patterns, especially for SW and NW blends. The asymmetric mask holes would appear in the wrong positions.

---

## Summary of Discrepancies

| # | Area | Severity | Status | Description |
|---|------|----------|--------|-------------|
| 1 | CLEAN_VARIANTS | **MEDIUM** | **FIXED** | Uniform `[0,1,4,5,6,8]` for all terrains → updated to per-terrain clean lists matching the doc. |
| 2 | Dither H-flip | **MEDIUM** | **FIXED** | SW and NW directions now H-flip the mask (`63-dx`). Both `_applyDither` and `_applyShroudDither` updated. |
| 3 | Dither scope | **LOW-MEDIUM** | **Intentionally kept** | Code restricts each direction to a 32px-wide quadrant; doc says full 64px-wide half. The full-half approach was implemented and tested — it causes catastrophic over-dithering when multiple directions are active, because their masks overlap at the tile equator (2-4x hole density). The quadrant approach prevents this and produces visually correct results. The doc's full-half description is likely inaccurate; the original game probably also uses quadrant-based partitioning. |

All other rendering layers (coastline, rivers, terrain overlays, roads, railroads, improvements, resources, neighbor lookup, sprite extraction, chroma key) match the binary analysis document correctly.
