# Worklist

## Status: Batch 9 in progress, Batch 10 complete

---

## Batch 10 (COMPLETED — Item 26: Unit Stack Display Order)

Fixed unit stacking display order to use the save file's doubly-linked list instead of a heuristic.

1. **parser.js**: Parse `nextInStack` (+22, int16 LE) and `prevInStack` (+24, int16 LE) per unit record. Store `saveIndex` on each unit to preserve save-file array position. Build `unitBySaveIndex` lookup map after dead-unit filtering. Export in return object.
2. **renderer.js**: Pass 5 `bestUnit` selection now picks the unit with `nextInStack === -1` (top of stack per Civ2's linked list). Falls back to `unitPriority()` heuristic only when no unit on the tile is marked as top-of-stack. Fixes: trireme shown on top of carried crusader at (76,20), legion shown on top of phalanx at (26,40).

---

## Batch 9: Item 25 — Per-Civ Visibility Fixes (G1, G2, G3, G4, G6, G8)

Implements gaps G1–G4, G6, G8 from Item 25 investigation. G5 and G7 are acceptable as-is. G9 is deferred.

### worker-a: Renderer FOW Correctness (G1, G3, G4 + renderer-side G2, G8)

#### What to do
Fix renderer.js so that when FOW is enabled, only data the selected civ knows about is drawn.

#### Files to modify
- `canvas-test-1/renderer.js`

#### Files NOT to touch
- `canvas-test-1/parser.js` (worker-b owns)
- `canvas-test-1/app.js` (worker-b owns)

#### G1: Gate normal city rendering on FOW visibility (lines 641-697)

The `for (const c of mapData.cities)` loop at line 641 draws ALL cities unconditionally. Fix:

1. At the top of the loop (after line 641), add:
```
if (fowEnabled && !(mapData.getVisibility(c.gx, c.gy) & fowBit)) continue;
```
This skips cities on tiles the civ can't currently see. Ghost cities on dimmed tiles are already handled separately in the ghost city block (lines 702-783).

2. The ghost city block (line 702) already checks `knownImprovements & 0x02`. Additionally check `c.knownToTribes` if available (worker-b will parse it as a bitmask at city record +12). Add a guard:
```
if (c.knownToTribes != null && !(c.knownToTribes & fowBit)) continue;
```
This goes after the `if (!(known & 0x02)) continue;` check at line 708. If `knownToTribes` is not yet available (parser hasn't been updated), the `!= null` guard lets it fall through gracefully.

#### G3: Gate fortress/airbase rendering on FOW (lines 918-930)

The Pass 6 loop reads real `getImprovements()`. Fix:

1. Inside the loop, after getting `imp` at line 923, add FOW logic:
```
if (fowEnabled) {
  if (isUnexplored(gx, gy)) continue;
  if (isDimmed(gx, gy)) {
    imp = mapData.getKnownImprovements(gx, gy, options.fowCiv);
    if (!(imp & 0x40)) continue;
  }
}
```
Note: need to change `const imp` to `let imp` since we're reassigning it.

#### G4: Fix road/railroad neighbor leak on dimmed tiles (lines 591-598)

At line 594, `const nimp = getImprovements(nx, ny);` always reads real data. Fix:

After line 594, add:
```
if (fowEnabled && isDimmed(nx, ny)) {
  nimp = mapData.getKnownImprovements(nx, ny, options.fowCiv);
}
```
Change `const nimp` to `let nimp` to allow reassignment.

#### G8 (renderer side): Honor mapRevealed flag

If `mapData.mapRevealed` is truthy, override FOW to treat all tiles as visible. The simplest approach: at the top of the render function (near line 446), add:
```
if (mapData.mapRevealed) {
  options = { ...options, fowEnabled: false };
}
```
This disables FOW entirely when the cheat flag is set, before any FOW predicates are defined.

---

### worker-b: Parser + Tooltip FOW Fixes (G2, G6, G8 parser-side)

#### What to do
Parse two missing fields in parser.js. Fix tooltip in app.js to respect FOW.

#### Files to modify
- `canvas-test-1/parser.js`
- `canvas-test-1/app.js`

#### Files NOT to touch
- `canvas-test-1/renderer.js` (worker-a owns)

#### G2: Parse city "known to tribes" bitmask (parser.js, near line 159)

City record offset +12 is a 1-byte bitmask: each bit = one civ that knows this city exists (bit 0 = barbarians, bit 1 = civ 1, etc.). Currently not parsed.

Add after line 162 (after `believedSize` parsing):
```javascript
const knownToTribes = savBuf[off + 12];
```

Add `knownToTribes` to the city object pushed at line 165:
```javascript
{ name, cx, cy, gx: cx >> 1, gy: cy, owner, size, hasWalls, hasPalace,
  originalOwner, turnsSinceCapture, isOccupied, believedSize, knownToTribes, style }
```

#### G8: Parse map revealed flag (parser.js, near line 86)

Header offset 0x002B is a 1-byte flag: nonzero = map is revealed (cheat mode). Currently not parsed.

Near line 86 (where `playerCiv` and `civsAlive` are read), add:
```javascript
const mapRevealed = savBuf[headerOff + 0x002B];
```

Add `mapRevealed` to the returned object (near line 289 where the return object is built).

#### G6: Filter tooltip by FOW state (app.js, lines 340-425)

The tooltip handler shows all data regardless of FOW. Fix:

1. At the top of the handler (after line 345 `if (!currentMapData) return;`), capture FOW state:
```javascript
const fowEnabled = document.getElementById('fow-toggle').checked;
const fowCivVal = document.getElementById('fow-civ').value;
const fowCiv = fowCivVal !== '' ? parseInt(fowCivVal) : null;
const fowBit = (fowEnabled && fowCiv != null) ? (1 << fowCiv) : 0;
```

2. After tile hit detection, before building the info string (around line 378), check tile visibility:
```javascript
if (fowEnabled && fowBit) {
  const vis = md.getVisibility(gx, gy);
  const known = md.getKnownImprovements(gx, gy, fowCiv);
  if (!vis && !known) {
    // Unexplored — show nothing
    tooltip.textContent = `(${gx * 2 + (gy % 2)}, ${gy})  Unexplored`;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top = (e.clientY + 14) + 'px';
    return;
  }
}
```

3. For the improvements section (lines 392-400): when FOW is enabled and tile is not currently visible (dimmed), use `md.getKnownImprovements(gx, gy, fowCiv)` instead of `md.getImprovements(gx, gy)`.

4. For the city section (lines 402-410): when FOW is enabled, skip cities where the tile is not currently visible AND the civ's known improvements don't include the city bit (0x02). For dimmed tiles where a city IS known, show `believedSize[fowCiv]` instead of `c.size`.

5. For the units section (lines 413-419): when FOW is enabled, skip units where the tile is not currently visible (`!(vis & fowBit)`) or the unit's visFlag doesn't include the civ (`!(u.visFlag & fowBit)`).

---

## Batch 8 (COMPLETED — wrap seam final fix)

Item 23 wrap seam fully resolved. Two changes:
1. **renderer.js**: Removed crop-to-displayW. Extended canvas (with xExtra=4 overlap columns) is kept. After all render passes, composites the 32px strip at x=wrapW back to x=0 to fill the odd-row stagger gap. Returns `wrapW` to the caller.
2. **app.js**: Viewport `drawViewport()` wraps at `wrapW` (from renderer) instead of `offW - 32`. Uses `wrapW` as boundary instead of `offW` so the viewport never reads into the stagger overhang area.

---

## Batch 7 (APPLIED — displayW fix applied directly by coordinator)

Item 23 displayW crop fix applied. Item 13 closed (ocean dither kept as-is).

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
- Item 23 (wrap seam) — Variant hash fixed to use `mapData.wrap(gx)`, but seam persisted. See Batch 5d.

---

## Batch 5d

### worker-a: Fix displayW Crop Width (Item 23)

#### What to do

One-line fix in `renderer.js` to eliminate the wrap seam.

#### Files to modify
- `canvas-test-1/renderer.js`

#### Files NOT to touch
- `canvas-test-1/parser.js`
- `canvas-test-1/app.js`
- `canvas-test-1/index.html`

#### Item 23: displayW Includes a Full Overlap Column

**Problem**: The `displayW` formula includes one full extra column for wrapping maps:
```javascript
const displayW = (mw + (wraps ? 1 : 0)) * TW + (TW >> 1);  // = (40+1)*64+32 = 2656
```

This means the crop keeps column `gx = mw` (a duplicate of column 0) fully visible. The seam between column `mw - 1` (eastern map edge) and column `mw` (= column 0, western map edge) is a real geographic discontinuity — different terrains, different overlays. It's visible as a hard vertical line (confirmed in screenshot showing duplicate "Cardiff" cities side by side).

The 4 overlap columns (`xExtra = 4`) exist to provide blending context for dithering and overlays. They should be cropped away entirely, not shown.

**Fix**: Change line ~425 from:
```javascript
const displayW = (mw + (wraps ? 1 : 0)) * TW + (TW >> 1);  // final visible width
```
to:
```javascript
const displayW = mw * TW + (TW >> 1);  // final visible width
```

This crops to exactly `mw` columns (2592px for a 40-column map instead of 2656px). The `+ (TW >> 1)` accounts for the odd-row half-tile stagger. The overlap columns still provide blending context but are outside the visible area. At the right edge, the left half of column `mw`'s isometric diamond (32px) naturally peeks in, providing the visual connection back to column 0 at the left edge.

---

## Batch 6 (COMPLETED — applied but uncommitted)

Items 10 (Modern Alt city row 7), 11 (terrain variant diversity — CLEAN_VARIANTS expanded to cols [0,1,4,5,6,8]), 15 (unit stack priority ordering). Item 13 (ocean dither) NOT re-applied — `nter === 10` skip remains; ocean dither needs the pole guard (`ny` bounds check) to coexist. Item 22 (viewport) applied by worker-b in previous commit.

### worker-a: Visual Fidelity Polish (APPLIED)

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

#### ~~Item 13: Dither Blending with Ocean~~
Closed. Ocean dither skip (`nter === 10`) kept in place — coastlines look good as-is with hard land/ocean edges.

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

### High Impact

#### Item 25: Per-Civ Visibility — Show Only What the Selected Civ Can See

**Problem**: When a player civ is selected (e.g. "Americans"), the rendered map should only show what that civ can actually see, per the visibility data in the save file. Currently FOW is an optional checkbox toggle. The goal is to make the selected civ's perspective the primary viewing mode — hiding terrain details, cities, units, and improvements that the selected civ has no knowledge of, as defined by the binary format's visibility fields.

**Binary format visibility fields** (from `Civ2_MGE_Binary_Analysis.md`):

| # | Field | Location | Per-Civ? | What it stores |
|---|-------|----------|----------|---------------|
| 1 | Tile visibility bitmask | Block 2, byte[4] | 1 bit each | Currently has line-of-sight |
| 2 | Per-civ known improvements | Block 1 (7 sections, civs 1-7) | 1 section each | Last-known improvements per tile |
| 3 | Unit visibility bitmask | Unit record +9 | 1 bit each | Which civs can see this unit |
| 4 | City "known to tribes" | City record +12 | 1 bit each | Which civs know city exists |
| 5 | Believed city size | City record +14 | 1 byte each | Last-known city size |
| 6 | Map revealed flag | Header 0x002B | Global | Cheat: reveals entire map |

**Investigation complete.** Current implementation uses fields 1, 2, 3, 5. The following gaps were found:

##### G1: Normal cities drawn on ALL tiles (High)
Pass 4 draws every city at full opacity with real current data before any FOW check. Cities on unexplored tiles get drawn then covered by black shroud (wasted work). Cities on dimmed tiles get drawn at full opacity AND again as ghosts at 0.5 opacity (double rendering). **Fix**: Skip cities not on currently visible tiles in the normal city loop; only draw ghost cities on dimmed tiles.

##### G2: City "known to tribes" bitmask not checked (High)
City record +12 is never parsed or checked. A city the selected civ has never discovered should not appear at all — not even as a ghost. Currently ghost cities check `knownImprovements & 0x02` (Block 1 city bit) but not the dedicated "known to tribes" field. **Fix**: Parse city +12 in parser.js, check it in the ghost city rendering code.

##### G3: Fortress/Airbase uses real data, not known data (Medium)
Pass 6 reads real `getImprovements()` with no FOW check. A destroyed fortress still shows; a new fortress the civ hasn't seen also shows. **Fix**: Use `getKnownImprovements` for dimmed tiles, skip for unexplored tiles.

##### G4: Road/railroad neighbor connectivity leaks real state (Low)
On dimmed tiles, `imp` is swapped to known improvements, but neighbor checks (`getImprovements(nx, ny)`) still use real current data. Road segments could connect to roads that didn't exist when the civ last saw the area. **Fix**: Also use `getKnownImprovements` for neighbor lookups on dimmed tiles.

##### G5: Terrain/coastlines/rivers/overlays always use real data (Acceptable)
Base terrain, forests, mountains, coastlines, rivers are drawn using true current state even on dimmed tiles. This matches Civ2 behavior — terrain doesn't change, and the game doesn't store "last known terrain." No fix needed.

##### G6: Tooltip shows omniscient data (Medium)
The hover tooltip in app.js shows real terrain, all improvements, all cities, and ALL units regardless of FOW state. **Fix**: When FOW is enabled, filter tooltip to only show what the selected civ knows — hide units not visible, show known improvements instead of real ones, hide unknown cities.

##### G7: Explored detection heuristic is imperfect (Acceptable)
Uses `knownImprovements != 0` as proxy for "explored." A tile visited but with zero improvements (empty grassland) shows as unexplored. The tile visibility bitmask (field 1) only shows *current* line-of-sight, not historical exploration. Block 1 is the best available proxy in the save format. No fix available without additional data.

##### G8: Map revealed flag not parsed (Low)
Header offset 0x002B not checked. If set, all tiles should show as fully visible. **Fix**: Parse in parser.js, pass to renderer, override FOW when set.

##### G9: Barbarians (civ 0) have no Block 1 data (Low)
Selecting barbarians as FOW civ makes everything unexplored since `getKnownImprovements` returns 0 for civ 0. Block 1 only stores civs 1-7. **Fix**: Either disable barbarian FOW selection or document the limitation.

**Recommended fix order**: G1 → G3 → G6 → G2 (needs parser) → G4 → G8 → G9

---

#### ~~Item 26: Unit Stack Display Order — Use Stacking Linked List~~

**Problem**: The renderer's `unitPriority()` heuristic (idle > ordered, military > civilian) does not match Civ2's actual display order. Two confirmed cases:

1. **(76, 20)**: Trireme carrying a Crusader on a water tile. The Crusader renders on top of the Trireme. On water, the ship should always be the visible top unit — Civ2 shows the transport, not the cargo.

2. **(26, 40)**: Phalanx and Legion stacked. Real Civ2 shows the Legion on top, but the renderer shows the Phalanx. Both are idle military (priority 3), so the `>=` tiebreak picks whichever is last in the unit array, which doesn't match Civ2's order.

**Root cause**: The save file stores a **doubly-linked list** per tile that defines the exact display order:
- **Unit record +22** (int16 LE): link to next unit in stack (drawn on top of this unit). -1 (0xFFFF signed) = this unit is the top of the stack.
- **Unit record +24** (int16 LE): link to previous unit in stack (drawn under this unit). -1 = bottom of stack.

The unit at the **head** of the list (+22 = -1) is what Civ2 displays. This handles both bugs: ships are linked above carried ground units, and the legion is linked above the phalanx. Neither field is currently parsed.

There is **no explicit "carried by" field** in the unit record — transport loading is purely positional (ground unit on ocean tile at same coords as a ship = loaded). The stacking linked list handles display order for both normal stacks and transport cargo. The `STACK_SHIP` vs `STACK_UNIT` network protocol distinction confirms the game differentiates these internally.

**Implementation details from binary analysis**:

- **+22/+24 are save-file array indices** (0-based position in the unit record array), NOT unit sequence IDs (+26). This matches how home city +16 works (confirmed as array index, not city sequence ID).
- **Dead unit slots are preserved** in the save file (never compacted). Header field `totalUnits` at 0x003A includes empty slots from destroyed units. So +22/+24 can point at dead unit slots. A linked list walk must handle dead/missing slots gracefully (treat as end-of-chain).
- **Sentinel value**: -1 (0xFFFF as int16) = end of list. Consistent with all other "no reference" fields in the format (selected unit 0x0022, home city +16, goto +18/+20).
- **`Unit.cpp`** handles "infinite-stack repair" — MicroProse had to handle linked list corruption, so our walker should be defensive too (cycle detection, bounds checking).

**Fix** (two files):

**parser.js** (lines 171-187):
1. Parse +22 and +24 as signed int16 LE. Store as `nextInStack` and `prevInStack` on each unit.
2. **Critical**: The parser currently filters dead units and compacts the array (line 184: `if (alive === 0 ...)`), so save-file index `i` does NOT correspond to `units[i]`. To resolve +22/+24 references:
   - Store the original save-file index on each unit: add `saveIndex: i` to the pushed object.
   - After the loop, build a lookup map: `unitBySaveIndex = {}; units.forEach(u => unitBySaveIndex[u.saveIndex] = u);`
   - Expose `unitBySaveIndex` in the returned mapData object.
3. The `s16()` helper already exists in the parser (used for coordinates). Use it for +22/+24.

**renderer.js** (Pass 5, lines 808-838):
1. Replace the `bestUnit` selection logic. For each tile with stacked units:
   - Find any unit on that tile where `nextInStack === -1` (top of stack). This is the unit Civ2 displays.
   - Use `mapData.unitBySaveIndex` to validate: check that `nextInStack` resolves to an alive unit on the same tile. If it points to a dead slot or off-tile unit, treat this unit as a candidate for top.
   - **Cycle detection**: track visited save indices while walking; abort if a cycle is found.
2. Keep `unitPriority()` as fallback for edge cases (broken linked list, missing data).
3. **Unit count for stacking badge**: The `unitCounts` accumulation (lines 798-803) should still count all units on the tile, not just the top one. No change needed there.

---

### Medium Impact

#### Item 12: Occupied City Visual Indicator

**Problem**: Parser tracks `isOccupied` (owner != originalOwner) but nothing renders differently. Original Civ2 shows a visual indicator on occupied/conquered cities.

**Investigation needed**: Determine what sprite or overlay original Civ2 uses. Likely a small flag from the FLAGS section in CITIES.GIF (y≈395-422) or a tinted overlay.

#### ~~Item 23: Map Wrap Seam Visible at East-West Boundary~~
Resolved via Batches 5b/5c/5d/8: wide canvas (xExtra=4) + variant hash wrapping + displayW crop fix. Final fix (Batch 8): removed crop-to-displayW entirely — extended canvas kept with overlap columns for blending context. Viewport wraps at `wrapW = mw * TW` (returned from renderer). Odd-row stagger gap fixed by compositing the 32px strip at x=wrapW back to x=0 after all render passes.

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
