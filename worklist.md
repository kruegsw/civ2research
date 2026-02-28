# Worklist

## Status: READY

---

## Batch 2

### worker-a: Fix Terrain Dither Bleed (Item 16)

#### What to do

Rewrite `_applyDither()` to use quadrant-based diamond-clipped dithering, matching the pattern already implemented in `_applyShroudDither()`.

#### Files to modify
- `canvas-test-1/renderer.js`

#### Files NOT to touch
- `canvas-test-1/parser.js`
- `canvas-test-1/app.js`
- `canvas-test-1/index.html`

#### Task 16: Terrain Dither Bleed — Full-Width Instead of Quadrant-Based

**Problem**: `_applyDither()` writes neighbor terrain pixels across the full 64px width of a half-tile for each direction. Because isometric tiles overlap vertically by 16px, dither pixels from one direction bleed into adjacent tiles and into the wrong quadrant of the current tile.

For example, SE dither writes across `dx=0..63` in the bottom half (`py+16..py+31`), but the left half of that area (`dx=0..31`) visually belongs to the SW quadrant, and the entire bottom half overlaps with the top of the tile below.

**Root cause**: `_applyDither()` uses full 64×16 regions per direction with no quadrant restriction and no diamond clipping. Civ2-clone uses 32×16 quadrants per direction (NE=top-right, SE=bottom-right, SW=bottom-left, NW=top-left) with diamond clipping — the same approach already implemented in `_applyShroudDither()`.

**Fix**: Rewrite `_applyDither()` to match the quadrant-based diamond-clipped pattern from `_applyShroudDither()`:

- **NE**: `dx=32..63, dy=0..15`, mask index `(15-dy)*64 + dx`, diamond-clipped
- **SE**: `dx=32..63, dy=0..15` → canvas `(px+dx, py+16+dy)`, mask index `dy*64 + dx`, diamond-clipped
- **SW**: `dx=0..31, dy=0..15` → canvas `(px+dx, py+16+dy)`, mask index `dy*64 + dx`, diamond-clipped
- **NW**: `dx=0..31, dy=0..15`, mask index `(15-dy)*64 + dx`, diamond-clipped

Neighbor sprite pixel source indices need to be adjusted to read from the correct quadrant of the 64×32 neighbor sprite (e.g., SE reads from `si = ((16+dy)*64 + dx)*4`).

**Reference**: Use `_applyShroudDither()` as a template — it already has the correct `diamondX()` helper and per-quadrant clipping logic. The difference is that `_applyDither()` copies neighbor terrain pixels instead of writing black.

**Why it's less visible than the shroud bug**: Both sides are terrain colors, so the bleed creates a subtle color smear rather than stark terrain-vs-black artifacts. Most noticeable at desert/grassland or plains/forest boundaries where the color contrast is high.

---

## Batch 1 (COMPLETED)

Batch 1 summary: worker-a fixed renderer bugs (draw order, teal "4", city text, color vibrancy), worker-b added parser data (Block 1, goody huts, occupied cities), coordinator fixed grassland shield and teal "4" root cause.

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

