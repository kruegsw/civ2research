# Worklist

## Status: READY

---

## Batch 3 (COMPLETED)

Items 7 (goody huts), 9 (city name 4-direction shadow), 6 (three-state FOW), 8 (ghost cities) implemented in renderer.js.

---

## Batch 4 (COMPLETED)

Items 19 (irrigation beneath resources), 17 (no pole dither), 18 (city names above shroud), 20 (FOW civ selector fix + reentrancy guard).

---

## Batch 5

### worker-a: FOW-Accurate Rendering + Map Edge Wrapping

#### What to do

Fix 3 FOW correctness issues in `renderer.js` and add east-west map wrapping. When FOW is enabled, the renderer should only show what the selected civ actually knows — not the omniscient god-view masked by black paint.

#### Files to modify
- `canvas-test-1/renderer.js`

#### Files NOT to touch
- `canvas-test-1/parser.js` (worker-b owns this)
- `canvas-test-1/app.js`
- `canvas-test-1/index.html`

#### Item 21A: Hide Units the FOW Civ Cannot See

**Problem**: Pass 5 (lines 762-866) draws ALL units regardless of FOW. Enemy units on fogged/unexplored tiles get drawn and then painted over by the shroud — but this is fragile and wrong. In real Civ2, units are only visible on tiles the player currently has line of sight to.

**Fix**: In Pass 5, after the `cityTiles` and `drawnTiles` checks (line 784), add a FOW visibility check. Skip the unit if the FOW civ can't currently see the tile:

```javascript
if (fowEnabled && !(mapData.getVisibility(u.gx, u.gy) & fowBit)) continue;
```

Also apply the same filter when counting units per tile for the stacked unit badge (lines 773-778):

```javascript
for (const u of mapData.units) {
  const tileKey = u.gx + ',' + u.gy;
  if (cityTiles.has(tileKey)) continue;
  if (fowEnabled && !(mapData.getVisibility(u.gx, u.gy) & fowBit)) continue;
  unitCounts[tileKey] = (unitCounts[tileKey] || 0) + 1;
}
```

**Optional extra accuracy**: worker-b is parsing unit visibility byte (`u.visFlag`). If available, also check `!(u.visFlag & fowBit)`. Use both checks: tile must be visible AND unit must be visible. But if `visFlag` is undefined (parser not updated yet), fall back to tile visibility only.

#### Item 21B: Use Last-Known Improvements on Dimmed Tiles

**Problem**: Pass 3 (lines 574-617) reads true improvements from `mapData.getImprovements(gx, gy)` for ALL tiles, including explored-but-not-visible ones. In real Civ2, fogged tiles show what the player LAST SAW, not the current true state. If an enemy built a road after you lost sight, you shouldn't see it.

**Fix**: At line 576, when FOW is enabled and the tile is dimmed, substitute Block 1 data for the true improvements:

```javascript
let imp = getImprovements(gx, gy);
if (fowEnabled && isDimmed(gx, gy)) {
  imp = mapData.getKnownImprovements(gx, gy, options.fowCiv);
}
```

The bit layout is the same: bit 2=irrigation, 3=mining, 4=road, 5=railroad, 6=fortress, 7=pollution. The `const imp` on line 576 needs to become `let imp` to allow reassignment.

**Important**: This substitution only affects the improvement-related drawing (roads, railroads, irrigation, mining, pollution). Base terrain, overlays, rivers, and resources are NOT affected — those come from Block 2 tile data and don't change based on FOW civ. Coastlines and terrain type are always drawn from true data (terrain doesn't change in Civ2).

#### Item 21C: Ghost City Limitations

**Problem**: Ghost cities (Pass 4, lines 682-757) use `believedSize[fowCiv]` for size (correct), but they use the current true `owner`, `hasWalls`, `style`, and `name`. If an enemy conquered a city while fogged, the player would incorrectly see the new owner's colors.

**What the save format stores per-civ per-city**: Only two things: (1) Block 1 bit 0x02 = "civ knows a city exists here", (2) `believedSize[civ]` = what size the civ last saw. It does NOT store last-known owner, name, or walls.

**Fix**: Since we can't know the last-known owner, accept this as a known limitation. Add a code comment at line 682 documenting it:

```javascript
// Ghost cities: previously seen cities in explored-but-not-visible tiles
// Known limitation: owner/name/walls use current true state because the save
// format only stores believedSize per civ, not last-known owner/name/walls.
```

No code change needed beyond the comment.

#### Item 14: Map Edge Wrapping (East-West)

**Problem**: For east-west wrapping maps (the default), the right edge of the canvas stops abruptly. In real Civ2, the map wraps seamlessly.

**Fix**: Widen the canvas and re-render the leftmost tiles at the right edge. The map already wraps logically via `wrap()` in the parser — this is purely a visual fix.

1. **Canvas width** (line 419): Change from `mw * TW + (TW >> 1)` to `(mw + 1) * TW + (TW >> 1)`. This adds one extra tile column width (64px).

2. **All rendering passes** (Pass 1 through Pass 9): Change the inner loop from `for (let gx = 0; gx < mw; gx++)` to `for (let gx = 0; gx < mw + 1; gx++)`. The `wrap()` function in the parser already handles `gx >= mw` by wrapping to 0, so `getTerrain(mw, gy)` returns `getTerrain(0, gy)` automatically. All accessor functions (`getImprovements`, `getVisibility`, `hasRiver`, `getResource`, `hasShield`, `hasGoodyHut`, `getKnownImprovements`) already use `wrap()`.

3. **Cities and units**: These are drawn by iterating `mapData.cities` and `mapData.units` arrays (not by tile grid), so they only appear at their canonical `gx` position. To show them at the wrapped edge, add a second draw for any city/unit where `c.gx === 0` (or `u.gx === 0`), drawing it again at `gx = mw`. Apply this to Pass 4 (cities), Pass 4 ghost cities, Pass 5 (units), Pass 6 (fortress/airbase), and Pass 9 (city name labels).

4. **Shroud passes** (Pass 7+8): Extend the tile loops to `mw + 1` as well, so shroud/dither/dimming covers the extra column.

5. **Legend**: The legend draw position at line 883 (`this._drawLegend(ctx, canvasW, canvasH, mapData)`) will automatically use the new wider canvas.

**Check `mapShape`**: The parser reads `mapShape` at offset MAP_HEADER + 6. Value 0 = flat earth (no wrapping), value 1 = round earth (east-west wrap). Only apply wrapping if `mapData.mapShape === 1`. If flat, keep the original canvas width and loop bounds.

---

### worker-b: Parse Unit Visibility Byte

#### What to do

Parse the unit visibility bitmask from the save file so the renderer can filter which units each civ can see.

#### Files to modify
- `canvas-test-1/parser.js`

#### Files NOT to touch
- `canvas-test-1/renderer.js` (worker-a owns this)
- `canvas-test-1/app.js`
- `canvas-test-1/index.html`

#### Item 21D: Unit Visibility Bitmask

**Problem**: Unit record offset +9 (Höfelt byte 10, 1-indexed) contains a visibility bitmask indicating which civs can currently see the unit. This byte is not currently parsed.

**Fix**: In the unit parsing loop (lines 170-184), add one line after `const hpLost = savBuf[off + 10];` (line 180):

```javascript
const visFlag = savBuf[off + 9];
```

Then include `visFlag` in the pushed unit object at line 182:

```javascript
units.push({ gx: ux >> 1, gy: uy, type: utype, owner: uowner, orders, hpLost, visFlag });
```

That's it. The renderer (worker-a) will use `u.visFlag & fowBit` to filter units.

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

#### Item 15: Unit Rendering Order

**Problem**: Units are drawn in array order (first unit found per tile wins). Original Civ2 shows the top unit on the stack (most recently moved or highest-priority). Drawing the "wrong" unit on a stack makes multi-unit tiles look off.

**Fix**: Sort or select units per tile so the top-of-stack unit is drawn. May require parsing additional unit record fields to determine priority.

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
