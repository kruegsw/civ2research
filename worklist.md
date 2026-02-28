# Worklist

## Status: READY

---

## Batch 3 (COMPLETED)

Items 7 (goody huts), 9 (city name 4-direction shadow), 6 (three-state FOW), 8 (ghost cities) implemented in renderer.js.

---

## Batch 4 (COMPLETED)

Items 19 (irrigation beneath resources), 17 (no pole dither), 18 (city names above shroud), 20 (FOW civ selector fix + reentrancy guard).

---

## Batch 5 (COMPLETED)

Items 21A (hide invisible units), 21B (last-known improvements on dimmed tiles), 21C (ghost city limitation documented), 21D (unit visibility byte parsed), 14 (east-west map wrapping for round earth). Fixed mapShape polarity (0=round, 1=flat).

---

## Batch 5b (COMPLETED — partial)

Batch 5b applied structural changes (wide canvas xExtra=4, crop, entity duplication, pole guard). Item 24 ocean dither regression NOT fixed. See Batch 5c.

---

## Batch 5c (COMPLETED — partial)

- Item 24 (blue ocean dither) — FIXED. Restored `nter === 10` ocean skip in dither pass.
- Item 23 (wrap seam) — NOT FIXED. Variant hash was changed to use `mapData.wrap(gx)`, which is correct but insufficient. The seam persists — root cause needs further investigation.

**Item 23 investigation notes**: The variant hash fix ensures overlap tiles at `gx >= mw` use the same base terrain sprite as their canonical counterparts. All Pass 3 functions (`getTerrain`, `getNeighbors`, `getImprovements`, `getResource`, `hasShield`, `isLand`, `hasRiver`, `getVisibility`, `getKnownImprovements`) wrap internally via `wrap()`, so overlays/coastlines/roads should be identical on overlap columns. The shroud pass also wraps correctly. Yet the seam remains visible. Possible remaining causes:
- The dither pass writes dither pixels at the CURRENT tile's physical position based on its neighbor's terrain type (not the neighbor's physical pixels). So at `gx = mw - 1` (last original column), dithering toward its east-side neighbors should work since those neighbors now exist physically at `gx = mw, mw+1, ...`. Need to verify that all 4 dither directions (NE/SE/SW/NW) are being applied correctly at the seam boundary.
- The issue may be that the ORIGINAL tiles at `gx = 0, 1, 2, 3` are NOT getting dither from THEIR western neighbors (`gx = mw-1, mw-2`). The dither pass only iterates up to `xMax`, and the original `gx = 0` tile's NW/SW neighbors via `getNeighbors(0, gy)` return `wrap(-1) = mw-1`. Tile `gx = mw-1` is drawn at pixel position `(mw-1)*64` — far from `gx = 0`'s pixel position 0. The dither at tile `gx = 0` in direction NW/SW reads the neighbor's TERRAIN TYPE and applies the dither pattern within `gx = 0`'s own quadrant. This should work since it only depends on terrain type, not canvas position. **But** the overlap column `gx = mw` is a duplicate of `gx = 0` — it also gets dithered. The ORIGINAL `gx = 0` however does NOT benefit from the overlap and still uses the same neighbor lookups. So the seam between the ORIGINAL rightmost column and the ORIGINAL leftmost column (which is at position 0 on the canvas) should be seamless... unless something else is wrong.
- Could be a sub-pixel alignment issue with the crop: `displayW = (mw + 1) * TW + (TW >> 1)` — this includes one full overlap column plus a half-tile for odd-row stagger. The crop might be cutting through a tile at an unexpected position.

---

### worker-a: Fix Map Wrap Seam + Pole Dither (Items 23, 24) — SUPERSEDED by Batch 5c

#### What to do

Fix two rendering issues in `renderer.js`: the visible seam at the east-west wrap boundary on round earth maps, and blue ocean dither bleeding at north/south pole edges.

#### Files to modify
- `canvas-test-1/renderer.js`

#### Files NOT to touch
- `canvas-test-1/parser.js`
- `canvas-test-1/app.js`
- `canvas-test-1/index.html`

#### Item 24: Blue Ocean Dither on Last Row (Pole Edge)

**Problem**: Land tiles on the south pole row (`gy = mh - 1`) and north pole row (`gy = 0`) show blue ocean-colored dither bleeding into them. This was introduced when the `nter === 10` ocean skip was removed from the terrain dither pass (Pass 2, line 507).

**Root cause**: At line 507, the check is `if (nter === ter) continue;` — it no longer skips ocean neighbors. Out-of-bounds tiles (`gy < 0` or `gy >= mh`) return terrain 10 (ocean) from `getTerrain()`. So south pole tiles dither toward their SE/SW neighbors (which are out-of-bounds → ocean), painting blue pixels into land tiles at the bottom edge. Same issue at the north pole with NE/NW neighbors.

**Fix**: Add an out-of-bounds neighbor guard at line 505, before the `getTerrain` call. Same pattern as the shroud pole fix (Item 17):

```javascript
for (const dir of ['NE', 'SE', 'SW', 'NW']) {
  const [nx, ny] = nb[dir];
  if (ny < 0 || ny >= mh) continue;  // no dither at map pole edges
  const nter = getTerrain(nx, ny);
  if (nter === ter) continue;
  // ... rest of dither logic
}
```

This prevents dithering toward out-of-bounds tiles at the poles while still allowing ocean dither for in-bounds ocean neighbors.

#### Item 23: Seamless Map Wrapping

**Problem**: On round earth maps, there is a visible vertical seam where the map wraps. Dither blending, terrain overlays, roads, and coastlines are visually discontinuous at the boundary. The root cause is that pixel-based operations (Pass 2 dither, Pass 7+8 shroud dither) use `getImageData` to read neighboring tile pixels. At the wrap seam, the logical neighbor tile is physically drawn far away on the canvas, so the pixel reads get wrong data.

**Fix**: Render to a wider canvas so all pixel-based operations have correct neighbor data, then crop the canvas back to the display width after all passes complete.

**Step 1 — Separate render width from display width** (lines 421-425):

Change the canvas setup from:
```javascript
const wraps = mapData.mapShape === 0;
const xMax = wraps ? mw + 2 : mw;
const canvasW = xMax * TW + (TW >> 1);
```
to:
```javascript
const wraps = mapData.mapShape === 0;
const xExtra = wraps ? 4 : 0;           // extra columns for blending context
const xMax = mw + xExtra;               // render this many columns
const canvasW = xMax * TW + (TW >> 1);  // wide canvas for rendering
const displayW = (mw + (wraps ? 1 : 0)) * TW + (TW >> 1);  // final visible width
```

All rendering passes already use `xMax` for their loops, so they'll automatically render the extra columns. The `wrap()` function in the parser handles `gx >= mw` correctly.

**Step 2 — Update city/unit wrap duplication**: Currently cities and units only duplicate at `gx = mw` when `c.gx === 0`. With the wider canvas, also duplicate entities at `gx = mw + 1` when `c.gx === 1`, etc. The general rule: if `wraps && c.gx < xExtra`, add `c.gx + mw` to the draw positions. Apply this to:
- Pass 4 cities (line ~635): `if (wraps && c.gx < xExtra) drawPositions.push(c.gx + mw);`
- Pass 4 ghost cities (line ~698): same pattern
- Pass 5 units (line ~830): `if (wraps && u.gx < xExtra) unitPositions.push(u.gx + mw);`
- Pass 9 city name labels (line ~1032): same pattern

**Step 3 — Crop after all passes** (line 1054, just before `return { canvasW, canvasH }`):

After all rendering is complete (including shroud, dimming, and city name labels), crop the canvas to the display width:

```javascript
// Crop to display width — remove extra blending columns
if (wraps && canvasW > displayW) {
  const cropData = ctx.getImageData(0, 0, displayW, canvasH);
  canvas.width = displayW;
  ctx.putImageData(cropData, 0, 0);
}

return { canvasW: wraps ? displayW : canvasW, canvasH };
```

This resizes the canvas and copies only the visible portion. The extra columns (which had correct blending but are now outside the display area) are discarded.

**Why this works**: With 4 extra columns, tile `gx = mw + 1` (wraps to logical `gx = 1`) is physically adjacent to tile `gx = mw` (wraps to `gx = 0`) on the canvas. The dither pass reads pixel data from these physically adjacent tiles and blends correctly. The seam — where physical adjacency breaks down — is pushed to `gx = mw + 3` or beyond, outside the display area.

---

## Batch 6

### worker-a: Visual Fidelity Polish

#### What to do

Implement 4 visual improvements in `renderer.js`: Modern Alt city sprites, more terrain variants, ocean dither blending, and unit stack ordering.

#### Files to modify
- `canvas-test-1/renderer.js`

#### Files NOT to touch
- `canvas-test-1/parser.js`
- `canvas-test-1/app.js` (worker-b owns this)
- `canvas-test-1/index.html` (worker-b owns this)

#### Item 10: CITIES.GIF Row 6 (Modern Alt)

**Problem**: The city sprite extraction loop (line 252) iterates `row < 6`, extracting only rows 0-5. CITIES.GIF has a 7th row (row 6, y=333) for "Modern Alt" — an alternate modern appearance for very advanced civs.

**Fix**:

1. Change `row < 6` to `row < 7` at line 252 to extract row 6 sprites.

2. Update `_getCityRow()` (lines 1386-1390) to return row 6 for the most advanced civs. In Civ2-clone, row 6 is used when the civ has both Automobile AND Electronics AND has style >= 2 (Far East or Medieval). Check the Civ2-clone source for the exact condition. A reasonable approach:

```javascript
_getCityRow(epoch, style) {
  if (epoch >= 3 && style >= 2) return 6;  // Modern Alt for Far East/Medieval styles
  if (epoch >= 3) return 5;                 // Modern for Bronze/Classical styles
  if (epoch >= 2) return 4;                 // Industrial
  return style;                             // Ancient/Renaissance: 0-3
}
```

Test by checking if any civ in your save has enough techs to trigger epoch 3 with style 2 or 3.

#### Item 11: Terrain Variant Diversity

**Problem**: `CLEAN_VARIANTS` (lines 42-54) only lists cols `[0, 1]` for all terrain types. Col 1 is discarded for Plains, Ocean, Tundra, Glacier, and Swamp (< 50% opaque), so those terrains only have 1 variant. This creates visible repetitive tiling.

**Fix**: Add more text-free columns to `CLEAN_VARIANTS`. TERRAIN1.GIF has 9 columns (0-8) per terrain row. Cols 2-3 contain resource sprites (not base terrain). Cols 4-8 may contain additional clean base terrain variants or may have baked-in text labels.

The safest approach: add cols 4, 5, 6, and 8 to all terrain types and rely on the existing < 50% opaque filter (line 396) to discard any that are chroma-key placeholders:

```javascript
CLEAN_VARIANTS: [
  [0, 1, 4, 5, 6, 8],  // 0 Desert
  [0, 1, 4, 5, 6, 8],  // 1 Plains
  [0, 1, 4, 5, 6, 8],  // 2 Grassland
  [0, 1, 4, 5, 6, 8],  // 3 Forest
  [0, 1, 4, 5, 6, 8],  // 4 Hills
  [0, 1, 4, 5, 6, 8],  // 5 Mountains
  [0, 1, 4, 5, 6, 8],  // 6 Tundra
  [0, 1, 4, 5, 6, 8],  // 7 Glacier
  [0, 1, 4, 5, 6, 8],  // 8 Swamp
  [0, 1, 4, 5, 6, 8],  // 9 Jungle
  [0, 1, 4, 5, 6, 8],  // 10 Ocean
],
```

Col 7 is intentionally skipped — in default TERRAIN1.GIF, col 7 contains special sprites (irrigation, mining, goody hut, grassland shield) for several rows, not base terrain.

After rendering, check the console for "Discarding terrain[...]" messages to see which variants survived the opacity filter. If any surviving variant has baked-in text (visible as colored letters on the terrain), remove that column from that terrain's entry.

#### Item 13: Dither Blending with Ocean

**Problem**: The dither pass (Pass 2) skips dithering when the neighbor terrain is ocean (`nter === 10`). Original Civ2 DOES dither-blend land→ocean transitions — the land side gets a subtle dither of the ocean color for a smoother coastline.

**Note**: The `nter === 10` skip was previously removed by a worker but has been **restored** in Batch 5c (Item 24 fix) because it caused blue dither artifacts everywhere without proper visual handling.

**Fix**: Remove the `nter === 10` check again. Change:

```javascript
if (nter === ter || nter === 10) continue;
```
to:
```javascript
if (nter === ter) continue;
```

**Potential issue**: Ocean dither might overlap with coastline sprites drawn in Pass 3. Since dither (Pass 2) happens before coastlines (Pass 3), the coastline sprites will draw on top and should cover any dither artifacts. Test and verify — if ocean dither looks wrong at certain coast configurations, you may need to skip dithering only when the current tile already has coastline pieces (check if `ter !== 10` and neighbor `nter === 10`, then let it dither).

#### Item 15: Unit Rendering Order (Top of Stack)

**Problem**: Pass 5 (lines 800-807) draws the first unit found per tile (`drawnTiles` set skips subsequent units). The unit drawn depends on array order from the save file, which may not match Civ2's display priority. Original Civ2 shows the top unit on the stack.

**Fix**: Before drawing, select the best unit per tile. In Civ2, the display priority for stacked units is typically: (1) units with no orders (active/waiting), (2) units that moved most recently, (3) military before civilian. Since move order isn't directly available from the save, use a heuristic:

1. Group units by tile (after FOW/city filtering).
2. For each tile, pick the unit to display using this priority:
   - Prefer units with `orders === 0` (no orders / idle) over units with orders (fortified, sleeping, etc.)
   - Among units with equal order status, prefer military units (combat strength > 0) over civilians (Settlers, Caravans, Diplomats, etc.)
   - Among equals, prefer the unit that appears last in the array (likely most recently created/moved)

```javascript
// Build best unit per tile
const bestUnit = {};
for (const u of mapData.units) {
  const tileKey = u.gx + ',' + u.gy;
  if (cityTiles.has(tileKey)) continue;
  if (fowEnabled && !(mapData.getVisibility(u.gx, u.gy) & fowBit)) continue;
  if (fowEnabled && u.visFlag != null && !(u.visFlag & fowBit)) continue;
  const prev = bestUnit[tileKey];
  if (!prev || unitPriority(u) > unitPriority(prev)) {
    bestUnit[tileKey] = u;
  }
}
function unitPriority(u) {
  let p = 0;
  if (u.orders === 0) p += 2;  // idle/active units shown first
  // Non-civilian units (not settlers/engineers/caravans/freight/diplomats/spies/explorers)
  const civilians = [0, 1, 44, 45, 46, 47, 48, 49, 50];
  if (!civilians.includes(u.type)) p += 1;
  return p;
}
```

Then iterate `Object.values(bestUnit)` instead of `mapData.units` when drawing.

---

### worker-b: Interactive Scrolling Viewport

#### What to do

Add mouse drag and keyboard panning to the map. The renderer keeps rendering the full map to an offscreen canvas. App.js blits a viewport-sized region from that offscreen canvas to a visible display canvas, and handles pan/scroll input. On round earth maps, horizontal scrolling wraps endlessly.

#### Files to modify
- `canvas-test-1/app.js`
- `canvas-test-1/index.html`

#### Files NOT to touch
- `canvas-test-1/renderer.js` (worker-a owns this)
- `canvas-test-1/parser.js`

#### Item 22: Interactive Scrolling Viewport

**Approach**: Offscreen canvas + viewport blitting. The renderer already renders the full map to `#map-canvas`. Change the flow so:

1. The renderer draws to an **offscreen canvas** (not in the DOM).
2. A new **visible display canvas** (`#viewport-canvas`) fills the `#map-container` area.
3. App.js maintains a viewport position `(vpX, vpY)` and blits a window from the offscreen canvas to the display canvas using `ctx.drawImage(offscreen, vpX, vpY, vpW, vpH, 0, 0, vpW, vpH)`.
4. For round earth maps (`mapData.mapShape === 0`), when `vpX + vpW` exceeds the offscreen canvas width, wrap around and blit the remainder from the left side of the offscreen canvas.

**HTML changes** (`index.html`):
- The existing `#map-canvas` can become the offscreen canvas (created in JS, not in the DOM), or keep it hidden.
- Add a visible `#viewport-canvas` inside `#map-container` that fills the container.
- The viewport canvas should have `width`/`height` matching the container's pixel dimensions.

**Panning controls** (`app.js`):

1. **Mouse drag**: On `mousedown` in the viewport canvas, start tracking. On `mousemove`, update `vpX -= dx` and `vpY -= dy` (inverted — dragging right scrolls left). On `mouseup`, stop tracking.

2. **Keyboard arrows**: Listen for arrow keys (or WASD). Scroll by a fixed amount (e.g., 32px per keypress or continuous while held).

3. **Bounds**:
   - Vertical: clamp `vpY` between 0 and `offscreenHeight - vpH` (stop at poles).
   - Horizontal (flat map): clamp `vpX` between 0 and `offscreenWidth - vpW`.
   - Horizontal (round map): wrap `vpX` using modulo — `vpX = ((vpX % offW) + offW) % offW`. This gives endless east-west scrolling.

4. **Initial position**: Center the viewport on the map, or start at (0, 0).

**Viewport rendering loop**:
```javascript
function drawViewport() {
  const vCtx = viewportCanvas.getContext('2d');
  vCtx.clearRect(0, 0, vpW, vpH);
  if (wraps) {
    // May need two draws if viewport wraps around the seam
    const x1 = ((vpX % offW) + offW) % offW;
    const rightChunk = Math.min(vpW, offW - x1);
    vCtx.drawImage(offscreen, x1, vpY, rightChunk, vpH, 0, 0, rightChunk, vpH);
    if (rightChunk < vpW) {
      vCtx.drawImage(offscreen, 0, vpY, vpW - rightChunk, vpH, rightChunk, 0, vpW - rightChunk, vpH);
    }
  } else {
    vCtx.drawImage(offscreen, vpX, vpY, vpW, vpH, 0, 0, vpW, vpH);
  }
}
```

Call `drawViewport()` after every pan update (use `requestAnimationFrame` for smooth dragging).

**Tooltip update**: The existing `mousemove` handler (lines 197-281) calculates tile coordinates from mouse position on the canvas. Update it to add `vpX`/`vpY` to the mouse coordinates before calculating tile position:
```javascript
const mx = (e.clientX - rect.left) * scaleX + vpX;
const my = (e.clientY - rect.top) * scaleY + vpY;
```

**Resize handling**: On window resize, update `vpW`/`vpH` to match the new container size, resize the viewport canvas, and redraw.

**Important**: The `#map-container` currently has `overflow: auto` which provides native scrollbars. With the viewport approach, change this to `overflow: hidden` since panning is handled programmatically. Remove the old scroll behavior.

---

## Batch 2 (COMPLETED)

Item 16: Terrain dither bleed fixed — `_applyDither()` rewritten with quadrant-based diamond clipping.

---

## Batch 1 (COMPLETED)

Batch 1 summary: worker-a fixed renderer bugs (draw order, teal "4", city text, color vibrancy), worker-b added parser data (Block 1, goody huts, occupied cities), coordinator fixed grassland shield and teal "4" root cause.

---

## Visual Fidelity Suggestions (Future)

Remaining improvements, ordered by impact.

### Medium Impact

#### Item 12: Occupied City Visual Indicator

**Problem**: Parser tracks `isOccupied` (owner != originalOwner) but nothing renders differently. Original Civ2 shows a visual indicator on occupied/conquered cities.

**Investigation needed**: Determine what sprite or overlay original Civ2 uses. Likely a small flag from the FLAGS section in CITIES.GIF (y≈395-422) or a tinted overlay.

#### Item 23: Map Wrap Seam Visible at East-West Boundary

**Problem**: On round earth maps, there is a visible vertical seam where the map wraps (right edge meets left edge). The terrain on either side of the seam does not blend smoothly — dither transitions, terrain overlays, and roads/railroads are visually discontinuous at the boundary.

**Root cause**: The dither blending pass (Pass 2) works by reading pixel data from already-rendered neighboring tiles using `getImageData`. At the wrap seam, the tile at `gx = mw` was drawn at the right edge of the canvas, but its logical eastern neighbor (`gx = 1`) was drawn at the left edge (pixel x ≈ 64). The dither pass reads pixels at the physical neighbor position, which is off to the left — not adjacent on the canvas. So no blending occurs across the seam. Adding extra overlap columns (currently `mw + 2`) helps slightly but doesn't fully solve it because the pixel-based dither still can't bridge the gap.

The same issue affects:
- Terrain overlay connectivity (forest/mountain/hill neighbor bitmask) — the overlay variant at the seam may not match its wrapped neighbor
- Road/railroad segments — roads connecting across the seam won't draw the connecting segment
- Coastline quadrants — coast pieces at the seam may not match

**Possible fixes**:
1. **Duplicate more columns**: Render the leftmost N columns again at the right edge AND the rightmost N columns at the left edge (e.g., 3-4 columns overlap on each side). This gives every tile enough physical neighbors for pixel-based blending. The viewport (Item 22) would clip the visible area to hide the duplicated edges.
2. **Post-render stitch**: After rendering the full map, copy a strip of pixels from the left edge to the right edge's overlap zone (and vice versa), then re-run only the dither pass on the seam tiles.
3. **Render wider + crop**: Render the map at `mw + 4` or more columns wide, then have the viewport only show `mw` columns worth of content, wrapping the viewport position modulo the logical map width.

**Interaction with Item 22**: The interactive viewport (Item 22) will blit from the offscreen canvas with wrapping. If the offscreen canvas has enough overlap columns on both sides, the viewport can always show a seamless view by choosing the right source coordinates. This makes fix #3 the most natural approach.

**Files**: `canvas-test-1/renderer.js` — canvas width, all pass loops, dither pass.

---

## Resolved

### ~~Task 8: Resource/Mine Draw Order~~
Fixed by swapping draw order in Pass 3 — resources drawn first, improvements on top.

### ~~Task 9: Teal "4" Rendering Bug~~
**Root cause**: TERRAIN2.GIF overlay sprites (forest/mountain/hill) had cyan (0,255,255) transparency pixels that were not being removed because the T2 chroma key only included magenta and gray — not cyan. The "4" was a baked-in variant annotation in the sprite sheet, written in the cyan transparency color (palette idx 248).
**Fix**: Added `[0, 255, 255]` to the T2 chroma key definition.

### ~~Task 10: Grassland Resource / Shield Bug~~
**Root cause**: Grassland uses a completely separate coordinate-only `hasShield()` formula, NOT the seed-based `getResource()` system. The renderer was incorrectly using `getResource()` for grassland tiles. The shield sprite is at TERRAIN1 col 7 row 7 (separate from resource sprites at cols 2-3).
**Fix**: Added `hasShield()` to parser.js, extracted grassland shield sprite, branched renderer Pass 3 on `ter === 2`.

### ~~Task 6: City Name Text Fidelity~~
Fixed: 20px font, 1px letter spacing, per-civ text colors from CITIES.GIF.

### ~~Task 7: Color Brilliance~~
Partially addressed: gray tolerance tightened to ±3, sRGB color space enforced.

### ~~Veteran Star on Unit Shields~~
**CONFIRMED: Not shown on main map.** Civ2-clone source proves the `IUnit` rendering interface doesn't expose veteran status. The shield only shows: civ-colored body, HP bar, and order letter. Veteran status is used in combat calculations only (+50% attack/defense). No implementation needed.

---

#### Item 22: Full Game Screen Chrome — Panels, Menus, Borders, Minimap

**Problem**: The current renderer only produces the map canvas. The actual Civ2 game screen (see `realCiv2GameScreenshots/20260228_actual civ2 screenshot.png`) has significant UI chrome surrounding the map viewport that gives the game its distinctive look and provides key information at a glance.

**Reference screenshot elements** (all missing from current implementation):

**A. Menu bar** — 9 dropdown menus across the top: Game, Kingdom, View, Orders, Advisors, World, Cheat, Editor, Civilopedia. In the original game these are functional menus; for our renderer they could be decorative or wired to relevant actions (e.g., View → toggle FOW, toggle grid).

**B. Map title / header** — "American Map" (or "[Civ Name] Map") centered above the map viewport. Uses the player civ name. Already have `civNames` data from parser.

**C. Decorative border / frame** — Stone-textured beveled border surrounds the map viewport area, separating it from the side panels and menu bar. Gives the characteristic Civ2 "carved stone" look.

**D. Minimap ("World" panel)** — Small overview map in the top-right showing the full world. Territory colored by civ ownership. Shows explored vs unexplored areas. Already have all the data needed: terrain types, tile visibility (byte[4] highest bit = territory color), city positions. This would be a scaled-down rendering of the full map.

**E. Status panel** — Below the minimap on the right side. Shows:
- Civilization name and population count
- Treasury (gold) — would need to parse this from save file if not already
- Per-turn income/expenses summary
- Current game year / turn number (offsets `0x001C` and `0x001E` in save file, not currently parsed)

**F. Selected unit info** — Bottom portion of the status panel. Shows the selected unit's sprite, name, civ, terrain type, and movement points. In our static renderer there's no "selected" unit, but this could show summary stats or the first unit on a hovered tile (extending the existing tooltip).

**Implementation considerations — this needs careful architectural thought:**

- **Canvas vs HTML**: Some elements are natural fits for HTML/CSS (menu bar, status panel text, dropdowns) while others may work better drawn on a canvas (minimap, decorative border, map title). A hybrid approach is likely best — HTML layout for the overall page structure with the map canvas embedded inside a bordered container.

- **Responsive layout**: The original Civ2 has a fixed 640×480 (or 800×600 / 1024×768) layout with the side panel always visible. Our renderer currently lets the map canvas fill the page. Adding side panels means establishing a proper layout grid.

- **Data requirements**: Some status panel fields (treasury, population, turn number) are not currently parsed. These would need parser additions.

- **Scope**: This is a large feature that should probably be split into sub-items once the implementation approach is decided. Suggested breakdown:
  1. Page layout restructure (HTML/CSS grid with map area + side panel)
  2. Decorative border/frame around map viewport
  3. Map title header ("[Civ Name] Map")
  4. Minimap with territory colors
  5. Status panel (civ info, treasury, turn/year)
  6. Menu bar (decorative or functional)
  7. Unit/tile info panel (extending tooltip into side panel)

- **File impact**: This will likely touch `index.html` (layout), add CSS, modify `app.js` (panel population), and possibly `parser.js` (new fields). The map canvas rendering in `renderer.js` should ideally stay unchanged — the chrome wraps around it rather than being drawn into it.

**Priority**: High visual impact — this is what makes it look like "the actual game" rather than "a map export tool." But it's also the most complex single item and needs design discussion before implementation begins.
