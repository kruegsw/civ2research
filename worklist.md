# Worklist

## Status: READY

---

## Batch 3 (COMPLETED)

Items 7 (goody huts), 9 (city name 4-direction shadow), 6 (three-state FOW), 8 (ghost cities) implemented in renderer.js.

---

## Batch 4

### worker-a: Renderer Fixes (Irrigation Order, Pole Dither, City Names Above Shroud)

#### What to do

Fix 3 rendering issues in `renderer.js`: reorder irrigation/resource drawing, suppress dither at map pole edges, and move city name labels above the shroud pass.

#### Files to modify
- `canvas-test-1/renderer.js`

#### Files NOT to touch
- `canvas-test-1/parser.js`
- `canvas-test-1/app.js`
- `canvas-test-1/index.html`

#### Item 19: Irrigation Drawn Beneath Resources

**Problem**: Irrigation sprites are drawn ON TOP of resource sprites (buffalo, wheat) and the grassland shield. In original Civ2, irrigation is a ground-level improvement that appears beneath the resource icon.

**Current code** (Pass 3, lines 589-611): Resources/grassland shield are drawn first, then ALL improvements (irrigation/farmland/mining/pollution) on top. This is wrong for irrigation/farmland which should be beneath resources.

**Fix**: In Pass 3, split the improvement/resource drawing into 3 steps. Replace lines 589-611 with:

```javascript
// Step 1: Draw irrigation/farmland FIRST (beneath resources)
if (imp & 0x04) {  // irrigation or farmland
  if ((imp & 0x04) && (imp & 0x08)) ctx.drawImage(sprites.farmland, px, py);
  else ctx.drawImage(sprites.irrigation, px, py);
}

// Step 2: Draw resources/grassland shield ON TOP of irrigation
if (ter === 2) {
  if (mapData.hasShield(gx, gy) && sprites.grasslandShield) {
    ctx.drawImage(sprites.grasslandShield, px, py);
  }
} else {
  const res = getResource(gx, gy);
  if (res > 0 && ter <= 10) {
    const key = ter * 2 + res;
    if (resources[key]) ctx.drawImage(resources[key], px, py);
  }
}

// Step 3: Draw mining/pollution on top of everything
if (imp & 0x08 && !(imp & 0x04)) ctx.drawImage(sprites.mining, px, py);  // mining only (not farmland)
if (imp & 0x80) ctx.drawImage(sprites.pollution, px, py);
```

**Key detail**: Farmland = irrigation + mining bits both set (0x04 | 0x08). When both bits are set, draw farmland in Step 1 and do NOT draw mining in Step 3. Mining alone (only 0x08) still draws in Step 3.

#### Item 17: No Dither at Map Pole Edges

**Problem**: North pole tiles (`gy=0`) and south pole tiles (`gy=mh-1`) show shroud dither at their edges facing out of bounds. In real Civ2, pole edges have a hard black border with no dither transition.

**Root cause**: `isUnexplored()` returns `true` for out-of-bounds tiles (`gy < 0 || gy >= mh`). The dither loop (Step 2, line 978) checks `isUnexplored(nx, ny)` on neighbors, so pole tiles see out-of-bounds neighbors as "unexplored" and get dither applied.

**Fix**: In the shroud Step 2 dither loop (line 976-980), add an out-of-bounds guard before the `isUnexplored` check. Change:

```javascript
const [nx, ny] = nb[dir];
if (!isUnexplored(nx, ny)) continue;  // dither only toward unexplored
```
to:
```javascript
const [nx, ny] = nb[dir];
if (ny < 0 || ny >= mh) continue;  // no dither at map edges — hard black border
if (!isUnexplored(nx, ny)) continue;  // dither only toward unexplored
```

#### Item 18: City Name Labels Above Shroud

**Problem**: City name labels are drawn in Pass 6b (lines 884-906) BEFORE the shroud pass (Pass 7+8, line 912+), so the black shroud diamonds cover them up. In real Civ2, city names are always visible on top of the fog/shroud.

**Fix**: Move Pass 6b (city name label drawing, lines 884-906) to AFTER the shroud pass (after line 1002, after the `ctx.fill()` that closes Step 3's dimming overlay). The legend draw (`this._drawLegend()`) at line 909 should stay where it is (between Pass 6b and the shroud) or also move — use your judgement, but city names MUST be after the shroud.

The block to move is everything from `// PASS 6b: City name labels` through the `ctx.letterSpacing = '0px';` closing. Cut it from its current location and paste it after line 1002 (after the shroud Step 3 closing brace).

**Important**: Ghost city name labels (drawn in Pass 4 at lines 741-754 with `globalAlpha = 0.5`) will still be covered by the shroud dimming overlay. That's acceptable — ghost city names should look dimmed. Only the currently-visible city names need to be on top.

---

### worker-b: FOW Civ Selector Bug Fix

#### What to do

Fix the FOW civ dropdown so user selections persist across re-renders.

#### Files to modify
- `canvas-test-1/app.js`

#### Files NOT to touch
- `canvas-test-1/renderer.js`
- `canvas-test-1/parser.js`
- `canvas-test-1/index.html`

#### Item 20: FOW Civ Selector Always Resets to Player Civ

**Problem**: Changing the FOW civ dropdown to a non-player civ (e.g., from Americans to Romans) has no effect — the map always renders with the player civ's FOW. Only the player civ works.

**Root cause**: In `app.js` `doRender()` (lines 122-134), every render cycle clears the dropdown (`fowSelect.innerHTML = ''`), repopulates it, then unconditionally resets it to `mapData.playerCiv` (line 134). The dropdown value is read AFTER this reset (line 163), so the user's selection is always overwritten.

**Fix**: At line 123, save the current dropdown value BEFORE clearing it. After repopulating the options (after line 132), restore the previous value if it's still a valid option, otherwise default to `mapData.playerCiv`. Replace lines 123-134 with:

```javascript
const fowSelect = document.getElementById('fow-civ');
const previousValue = fowSelect.value;  // save user's selection BEFORE clearing
fowSelect.innerHTML = '';
const civNames = Civ2Renderer._identifyCivs(mapData.cities);
mapData.civNames = civNames;
for (let i = 0; i < 8; i++) {
  if (!(mapData.civsAlive & (1 << i))) continue;
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = civNames[i] || `Civ ${i}`;
  fowSelect.appendChild(opt);
}
// Restore previous selection if valid, otherwise default to playerCiv
if (previousValue !== '' && [...fowSelect.options].some(o => o.value === previousValue)) {
  fowSelect.value = previousValue;
} else {
  fowSelect.value = mapData.playerCiv;
}
fowSelect.disabled = false;
```

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

#### Item 14: Map Edge Wrapping Visual Continuity

**Problem**: For east-west wrapping maps (most standard games), the right edge of the canvas stops abruptly. Original Civ2 scrolls seamlessly.

**Possible fix**: Duplicate a strip of tiles on the right edge so the map appears to wrap, or add a note that this is a static render limitation.

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

