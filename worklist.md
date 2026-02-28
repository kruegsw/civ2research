# Worklist

## Status: READY

---

## Batch 1

### worker-a: Renderer Bug Fixes & Visual Polish

#### What to do

Fix 5 rendering issues in `renderer.js`. Do NOT touch `parser.js` or `app.js`.

#### Files to modify
- `canvas-test-1/renderer.js`

#### Files NOT to touch
- `canvas-test-1/parser.js` (worker-b owns this)
- `canvas-test-1/app.js`
- `canvas-test-1/index.html`

#### Task 8: Resource/Mine Draw Order Bug

**Problem**: At tile (52, 22), resource (coal) is drawn on top of the mine sprite. In real Civ2, the mine is visible over the resource.

**Root cause**: In Pass 3 (lines 557-570), improvements (mining) are drawn FIRST, then resources SECOND. Resources end up on top.

**Fix**: Swap the draw order — move the resource drawing block (lines 565-570) ABOVE the improvements block (lines 557-563). Resources should be drawn first, then improvements (mining/irrigation/farmland/pollution) on top.

#### Task 9: Teal "4" Rendering Bug

**Problem**: At tiles (1, 27) and (32, 18), a teal-colored "4" appears on the tile.

**Root cause**: TERRAIN1.GIF has baked-in annotation text in resource sprite cells (cols 2-3). The text uses a teal/cyan shade that falls outside the `T1R` chroma key tolerance of ±15 for cyan `(0,255,255)`. For example, a darker cyan like `(0,230,230)` has a delta of 25, which exceeds the tolerance.

**Fix**: Increase the cyan tolerance in the `T1R` chroma key definition (line 130) from 15 to ~30-40. Currently:
```javascript
const T1R = [[0, 255, 255, 15], [255, 0, 255, 15], [135, 135, 135, 5]];
```
Increase first element tolerance: `[0, 255, 255, 40]`. Test that this doesn't make legitimate teal resource pixels transparent. If it does, instead add the specific teal color as a separate chroma entry.

#### Task 10: Grassland Resource / Shield Bug

**Problem A**: Tile (22, 26) shows a grassland resource when there shouldn't be one.
**Problem B**: Tile (29, 11) shows a resource sprite when it should show the grassland "shield" icon.

**Context**: The grassland "shield" IS the grassland resource sprite — in Civ2, the grassland shield uses the same resource placement algorithm, and the "Grassland Special" sprite in TERRAIN1.GIF cols 2-3, row 2 IS the shield icon. There is no separate mechanism.

**Investigation needed**: Check whether the resource sprites extracted from TERRAIN1 row 2 cols 2-3 actually look correct (the shield icon should be a small production bonus indicator). The grassland resource algorithm should be working — if tile (22,26) falsely shows a resource, the bug may be in `parser.js getResource()` (which worker-b should also investigate), but the renderer-side fix is to verify the sprite extraction is correct for terrain ID 2 (grassland) cols 2-3. Log what sprite keys are being used for these tiles.

#### Task 6: City Name Text Fidelity

**Problem**: City name labels don't match Civ2's appearance and are harder to read.

**3 specific fixes** (all confirmed against Civ2_MGE_Binary_Analysis.md rendering spec):

1. **Font size**: City name font at line 765 is `'18px "Times New Roman", serif'` — should be `'20px "Times New Roman", serif'`.

2. **Letter spacing**: No letter spacing is set for city names. Add `ctx.letterSpacing = '1px'` before the city name `fillText` calls (around line 765).

3. **Text color**: Line 764 uses `this._brighten(this.CIV_COLORS[c.owner], 0.4)` which is an approximation. The renderer already extracts the correct per-civ text colors from CITIES.GIF y=423 into `sprites.civTextColors[civ]` (line 237-239) but doesn't use them for city names. Replace:
   ```javascript
   const textColor = this._brighten(this.CIV_COLORS[c.owner] || '#fff', 0.4);
   ```
   with:
   ```javascript
   const textColor = (sprites.civTextColors && sprites.civTextColors[c.owner]) || this._brighten(this.CIV_COLORS[c.owner] || '#fff', 0.4);
   ```

#### Task 7: Color Brilliance / Vibrancy

**Problem**: The rendered map looks less vibrant than the real Civ2 game.

**Most likely causes** (investigate in this order):

1. **Chroma key stripping legitimate pixels**: The gray tolerance in `T1` (line 128) is `±5` for `(135,135,135)`. This makes any pixel with RGB in `(130-140, 130-140, 130-140)` transparent, which could strip muted terrain pixels (rocky textures, shadows). These tiny holes let the dark `#142850` background bleed through. Investigate by temporarily setting gray tolerance to `±2` or `±3` and comparing output.

2. **Dark ocean background**: The background fill is `#142850` (line 416). If any transparency holes exist, this dark blue shows through. Consider whether using a color closer to ocean blue from the actual sprite palette would reduce the contrast.

3. **Canvas color space**: When creating the canvas context (line 413), try passing `{ colorSpace: 'srgb' }` to `getContext('2d')` to ensure consistent color handling. Also check if the `image-rendering: pixelated` CSS (index.html line 32) affects perceived vibrancy at different zoom levels.

**Approach**: This is an investigative task. Try adjustments, compare visually, and keep what improves fidelity. Don't make changes that break the chroma key fix for dark blue tiles (the whole reason gray tolerance was tightened).

---

### worker-b: Parser Data Extraction

#### What to do

Add parsing for Block 1 (per-civ known improvements), goody hut detection, and occupied city fields in `parser.js`. Expose all new data on the `mapData` return object. Do NOT touch `renderer.js` or `app.js`.

#### Files to modify
- `canvas-test-1/parser.js`

#### Files NOT to touch
- `canvas-test-1/renderer.js` (worker-a owns this)
- `canvas-test-1/app.js`
- `canvas-test-1/index.html`

#### Task 1 (partial): Parse Block 1 — Per-Civ Known Improvements

**What it is**: Block 1 sits between the map header and Block 2 (tile data). It contains 7 sections of `map_size` bytes — one per non-barbarian civ (civs 1-7). Each byte has the same format as the improvements byte (Block 2 byte[1]):

| Bit | Mask | Meaning |
|-----|------|---------|
| 0 | 0x01 | Unit present |
| 1 | 0x02 | City present |
| 2 | 0x04 | Irrigation |
| 3 | 0x08 | Mining |
| 4 | 0x10 | Road |
| 5 | 0x20 | Railroad |
| 6 | 0x40 | Fortress |
| 7 | 0x80 | Pollution |

**Current code** (lines 53-55):
```javascript
const block1Off = MAP_HEADER + 14;
const block2Off = block1Off + ms * 7;
```
Block 1 is already located but not read.

**Layout**: `block1Off + (civ - 1) * ms` gives the start of civ `civ`'s section (civ 1-7). Barbarians (civ 0) have no Block 1 section.

**Implementation**:
```javascript
const knownImprovements = new Array(8).fill(null);
for (let civ = 1; civ <= 7; civ++) {
  const sectionOff = block1Off + (civ - 1) * ms;
  const section = new Uint8Array(ms);
  for (let i = 0; i < ms; i++) {
    section[i] = savBuf[sectionOff + i];
  }
  knownImprovements[civ] = section;
}

function getKnownImprovements(gx, gy, civSlot) {
  if (civSlot < 1 || civSlot > 7 || gy < 0 || gy >= mh) return 0;
  return knownImprovements[civSlot][gy * mw + wrap(gx)];
}
```

Add `knownImprovements` and `getKnownImprovements` to the return object.

#### Task 2 (partial): Parse Goody Hut Flag

**What it is**: Tile byte[0] bit 4 (0x10) indicates a goody hut is present on that tile. This bit is undocumented in the binary analysis but confirmed by community knowledge and the Civ2-clone source.

**Implementation**:
```javascript
function hasGoodyHut(gx, gy) {
  if (gy < 0 || gy >= mh) return false;
  return !!(tileData[gy * mw + wrap(gx)][0] & 0x10);
}
```

Add `hasGoodyHut` to the return object.

#### Task 4 (partial): Parse Occupied City Fields

**What it is**: City record offset +10 stores the original/previous owner tribe (0-7). If this differs from the current owner at +8, the city is occupied/conquered. Offset +11 stores a turns-since-capture counter.

**Current city parsing** (lines 126-142): Reads offsets +0, +2, +8, +9, +32, +52 only.

**Add these fields** inside the city parsing loop (after line 137):
```javascript
const originalOwner = savBuf[off + 10];
const turnsSinceCapture = savBuf[off + 11];
const isOccupied = (owner !== originalOwner);
```

Also add **believed city sizes** for three-state FOW (offset +14, 8 bytes):
```javascript
const believedSize = [];
for (let civ = 0; civ < 8; civ++) {
  believedSize[civ] = savBuf[off + 14 + civ];
}
```

Push all new fields to the city object: `{ ...existing, originalOwner, turnsSinceCapture, isOccupied, believedSize }`.

#### Context: Return Object

Current return object (line 236-243):
```javascript
return {
  mw, mh, mw2, ms, mapSeed, qw, qh, mapShape, isScn,
  tileData, cities, units, civStyles,
  playerCiv, civsAlive, civTechCounts, civTechs,
  terrainCounts, oceanPct, citiesOnOcean,
  getTerrain, isLand, hasRiver, getImprovements, getVisibility, getResource, getNeighbors, wrap
};
```

Add to this: `knownImprovements, getKnownImprovements, hasGoodyHut`.

---

## Future Batches

Items deferred to batch 2+ (need both parser + renderer changes):
- **Item 1**: Three-state FOW renderer changes (dimming overlay, ghost cities/units) — depends on worker-b's Block 1 parsing
- **Item 2**: Goody hut rendering — sprite is in **TERRAIN1.GIF col 7 row 8** (x=456, y=265, 64×32). Extract with T1 chroma key. Draw in Pass 3 after improvements, before cities. Use `hasGoodyHut()` from parser. Depends on worker-b's flag parsing.
- **Item 3**: Capital/wonder city variant sprites
- **Item 4**: Occupied city flag rendering — depends on worker-b's occupied city parsing
- **Item 5**: Circumnavigation scrolling (large feature, touches app.js + renderer.js)

---

## Visual Fidelity Suggestions

Improvements to make the renderer look more like the original Civ2 game, ordered by impact.

### High Impact

#### Item 6: Three-State Fog of War (Shroud vs Dimming)

**Problem**: FOW is currently binary — visible tiles render fully, non-visible tiles are solid black. Original Civ2 has three states:
- **Unexplored** — solid black (already implemented)
- **Explored but out of sight** — terrain shown but *dimmed/darkened* (not implemented)
- **Currently visible** — full brightness (already implemented)

**Why it matters**: This is probably the single biggest visual difference from original Civ2. The all-or-nothing FOW makes the map look wrong when FOW is enabled.

**Implementation approach**: Distinguish "has this civ ever seen this tile" (Block 1 data / `knownImprovements`) from "does this civ currently see it" (visibility byte `getVisibility()`). Draw a semi-transparent black overlay (e.g. `rgba(0,0,0,0.45)`) on explored-but-not-visible tiles. Parser already has `knownImprovements` and `getKnownImprovements()`.

**Depends on**: Block 1 parsing (already done in parser.js).

#### Item 7: Goody Huts

**Problem**: Goody huts (village huts) are parsed (`hasGoodyHut()` via byte[0] & 0x10) but never rendered. These small thatched huts are very visible on the original Civ2 map.

**Sprite location**: TERRAIN1.GIF col 7 row 8 (x=456, y=265, 64x32). Extract with T1 chroma key.

**Rendering**: Draw in Pass 3 after improvements, before cities. Use `hasGoodyHut()` from parser.

**Effort**: Low — data is parsed, sprite location is known, just needs extraction + draw call.

#### Item 8: Ghost Cities in Fog

**Problem**: In original Civ2, cities you've previously seen but can no longer see still appear on the map in their *last known* state (dimmed). Currently they just disappear when fogged.

**Data available**: Parser stores `believedSize[civ]` per city (offset +14 per civ slot). Block 1 `knownImprovements` bit 0x02 indicates whether a civ knows a city exists on a tile.

**Implementation**: When FOW is enabled, cities known via Block 1 but currently fogged should render as dimmed city sprites with the believed size.

**Depends on**: Item 6 (three-state FOW).

### Medium Impact

#### Item 9: City Name Shadow Outline (4-Direction Stroke)

**Problem**: City name labels have only a single (+1,+1) drop shadow. Original Civ2 uses a stronger black outline — shadow drawn in all 4 diagonal directions around the text, creating a readable outline/stroke effect.

**Fix**: Replace the single shadow `fillText` at (+1,+1) with draws at (-1,-1), (1,-1), (-1,1), (1,1) before drawing the colored text on top. Small change, big readability improvement.

#### Item 10: CITIES.GIF Row 6 (Modern Alt)

**Problem**: The renderer extracts rows 0-5 but CITIES.GIF has a 7th row (row 6 at y=333, "MODERN ALT"). Very advanced civs may need this alternate modern appearance.

**Fix**: Extend the city sprite extraction loop from `row < 6` to `row < 7`. May also need to update `_getEpoch()` or `_getCityRow()` if there's a tech threshold that triggers this row.

#### Item 11: Terrain Variant Diversity

**Problem**: Only cols 0-1 are used for base terrain variants, giving at most 2 variants per type. Original Civ2 uses more column variants (cols 0-8), with text baked only into specific columns. The limited variants create a repetitive "tiling" look, especially for desert and grassland.

**Fix**: Visually audit TERRAIN1.GIF cols 4-6 and 8 per terrain row to identify which are text-free. Add validated clean columns to `CLEAN_VARIANTS`. The existing <50% opaque filter provides a safety net.

#### Item 12: Occupied City Visual Indicator

**Problem**: Parser tracks `isOccupied` (owner != originalOwner) but nothing renders differently. Original Civ2 shows a visual indicator on occupied/conquered cities.

**Investigation needed**: Determine what sprite or overlay original Civ2 uses. Likely a small flag from the FLAGS section in CITIES.GIF (y≈395-422) or a tinted overlay.

### Lower Impact / Polish

#### Item 13: Dither Blending with Ocean

**Problem**: Currently `nter === 10` skips dithering for ocean neighbors. Original Civ2 *does* dither-blend land→ocean transitions. The coastline sprites handle ocean→land, but the land side also gets slight dithering for a smoother land-to-water transition.

**Fix**: Remove the `nter === 10` skip in the dither pass and test for artifacts. May need special handling to avoid overwriting coastline sprites.

#### Item 14: Map Edge Wrapping Visual Continuity

**Problem**: For east-west wrapping maps (most standard games), the right edge of the canvas stops abruptly. Original Civ2 scrolls seamlessly.

**Possible fix**: Duplicate a strip of tiles on the right edge so the map appears to wrap, or add a note that this is a static render limitation.

#### Item 15: Unit Rendering Order

**Problem**: Units are drawn in array order (first unit found per tile wins). Original Civ2 shows the top unit on the stack (most recently moved or highest-priority). Drawing the "wrong" unit on a stack makes multi-unit tiles look off.

**Fix**: Sort or select units per tile so the top-of-stack unit is drawn. May require parsing additional unit record fields to determine priority.

---

## Resolved

### ~~Veteran Star on Unit Shields~~
**CONFIRMED: Not shown on main map.** Civ2-clone source proves the `IUnit` rendering interface doesn't expose veteran status. The shield only shows: civ-colored body, HP bar, and order letter. Veteran status is used in combat calculations only (+50% attack/defense). No implementation needed.
