/**
 * Civ2 MGE Viewport & Camera Constants — Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra), cross-referenced with Civ2-clone (C#)
 *
 * Every constant includes its binary address for traceability.
 * Values extracted from block_00470000 viewport/camera functions.
 */

// ═══════════════════════════════════════════════════════════════════
// ZOOM SYSTEM
// Binary ref: FUN_00472cf0 (scale_sprite) @ block_00470000.c
// ═══════════════════════════════════════════════════════════════════

/**
 * Zoom level ranges from -6 to +6. Default is 0.
 * Formula: scaled_size = (zoom_level + 8) * base_size / 8
 *
 * @ 0x00472cf0 — scale_sprite: return ((zoom_level + 8) * base_size) / 8
 *
 * At zoom 0:  (0+8)*base/8 = base (100%)
 * At zoom -6: (2)*base/8   = 25%
 * At zoom +6: (14)*base/8  = 175%
 */
export const ZOOM_LEVELS = {
  min: -6,                       // @ 0x00472cf0 — practical minimum (25% scale)
  max: 6,                        // @ 0x00472cf0 — practical maximum (175% scale)
  default: 0,                    // @ 0x00479ede — init_map_viewport sets zoom = 0
  scaleBase: 8,                  // @ 0x00472cf0 — denominator in zoom formula

  /**
   * Compute zoom scale factor for a given zoom level.
   * Direct port of FUN_00472cf0 @ 0x00472CF0.
   *
   * @param {number} baseSize - base pixel dimension (e.g. 64 for tile width)
   * @param {number} zoomLevel - zoom level (-6 to +6)
   * @returns {number} scaled pixel dimension
   */
  scale(baseSize, zoomLevel) {
    return Math.floor(((zoomLevel + 8) * baseSize) / 8);
  },

  // Precomputed scale percentages for each zoom level
  // zoom: (zoom+8)/8 ratio
  table: [
    { zoom: -6, ratio: 0.25,  pct: '25%'  },
    { zoom: -5, ratio: 0.375, pct: '37.5%' },
    { zoom: -4, ratio: 0.5,   pct: '50%'  },
    { zoom: -3, ratio: 0.625, pct: '62.5%' },
    { zoom: -2, ratio: 0.75,  pct: '75%'  },
    { zoom: -1, ratio: 0.875, pct: '87.5%' },
    { zoom:  0, ratio: 1.0,   pct: '100%' },
    { zoom:  1, ratio: 1.125, pct: '112.5%' },
    { zoom:  2, ratio: 1.25,  pct: '125%' },
    { zoom:  3, ratio: 1.375, pct: '137.5%' },
    { zoom:  4, ratio: 1.5,   pct: '150%' },
    { zoom:  5, ratio: 1.625, pct: '162.5%' },
    { zoom:  6, ratio: 1.75,  pct: '175%' },
  ],
};

// ═══════════════════════════════════════════════════════════════════
// TILE PROJECTION
// Binary ref: FUN_0047a6b0 (tile_to_screen) and FUN_0047a540 (screen_to_tile)
// ═══════════════════════════════════════════════════════════════════

export const TILE_PROJECTION = {
  // Base tile dimensions at zoom level 0
  baseTileWidth: 64,             // @ 0x00479fbe — scale_sprite(0x40, zoom): base = 0x40 = 64
  baseTileHeight: 32,            // @ 0x00479fbe — scale_sprite(0x20, zoom): base = 0x20 = 32

  /**
   * Tile-to-screen conversion (isometric diamond grid).
   * Direct port of FUN_0047a6b0 @ 0x0047A6B0.
   *
   * px = halfTileWidth  * (wrap(tileX - viewportLeftX) - 1) + marginX + clientOffsetX
   * py = halfTileHeight * (tileY - viewportTopY - 1)        + marginY + clientOffsetY
   *
   * @ 0x0047a6b0:
   *   dx = wrap(tile_x - viewport_left_x)
   *   dy = tile_y - viewport_top_y
   *   *out_px = half_tw * (dx - 1) + margin_x + this->+0x124
   *   *out_py = half_th * (dy - 1) + margin_y + this->+0x128
   */

  /**
   * Screen-to-tile conversion (reverse isometric projection).
   * Direct port of FUN_0047a540 @ 0x0047A540.
   *
   * Step 1: Coarse grid
   *   col = (screenX / tileWidth) * 2 + viewportLeftX + 1
   *   row = (screenY / tileHeight) * 2 + viewportTopY + 1
   *
   * Step 2: Diamond quadrant correction
   *   Uses FUN_005c0bf2 (atan2-like sub-tile position detection)
   *   with lookup tables at DAT_0062833B (dx) and DAT_00628343 (dy)
   *
   * @ 0x0047a540 — screen_to_tile
   */

  // Diamond quadrant correction tables (used by screen_to_tile)
  quadrantDxTable: 'DAT_0062833B',  // @ 0x0047a540 — col += DAT_0062833B[correction]
  quadrantDyTable: 'DAT_00628343',  // @ 0x0047a540 — row += DAT_00628343[correction]
  quadrantDetector: 'FUN_005c0bf2', // @ 0x0047a540 — atan2-like sub-tile quadrant
};

// ═══════════════════════════════════════════════════════════════════
// VIEWPORT STRUCTURE LAYOUT
// Binary ref: FUN_00479fbe (recalc_viewport_geometry) @ block_00470000.c
// ═══════════════════════════════════════════════════════════════════

export const VIEWPORT_OFFSETS = {
  // ─── Client Area ───
  clientOffsetX: 0x124,          // @ 0x0047a6b0 — this->+0x124 (client area left)
  clientOffsetY: 0x128,          // @ 0x0047a6b0 — this->+0x128 (client area top)
  clientWidth:   0x12C,          // @ 0x00479fbe — this->+0x12C → saved to +0x328
  clientHeight:  0x130,          // @ 0x00479fbe — this->+0x130 → saved to +0x32C

  // ─── Viewport Mode & Cursor ───
  viewportMode:  0x2D8,          // @ 0x00479ede — display mode (0=main, etc.)
  viewportFlags: 0x2DE,          // @ 0x00479ede — set to (mode==0)?1:0
  cursorX:       0x2E0,          // @ 0x00479ede — cursor tile X (center of view)
  cursorY:       0x2E2,          // @ 0x00479ede — cursor tile Y (center of view)
  zoomLevel:     0x2E4,          // @ 0x00479ede — current zoom level (-6 to +6)

  // ─── Computed Viewport Bounds ───
  viewportLeftX: 0x2E8,          // @ 0x00479fbe — leftmost visible tile X
  viewportTopY:  0x2EC,          // @ 0x00479fbe — topmost visible tile Y
  viewportRightX: 0x2F0,         // @ 0x00479fbe — rightmost visible tile X (wrapped)
  viewportBottomY: 0x2F4,        // @ 0x00479fbe — bottommost visible tile Y

  // ─── Tile Counts ───
  colsNarrow:    0x2F8,          // @ 0x00479fbe — visible tile columns (narrow, even rows)
  rows:          0x2FC,          // @ 0x00479fbe — visible tile rows
  colsWide:      0x300,          // @ 0x00479fbe — visible tile columns (wide, includes half-offset)
  rowsWide:      0x304,          // @ 0x00479fbe — visible tile rows (extended)

  // ─── Computed Tile Dimensions ───
  tileWidth:     0x308,          // @ 0x00479fbe — scaled tile width at current zoom
  tileHeight:    0x30C,          // @ 0x00479fbe — scaled tile height (inferred: +0x308 + 4)
  halfTileWidth: 0x310,          // @ 0x00479fbe — tileWidth / 2
  halfTileHeight: 0x314,         // @ 0x00479fbe — tileHeight / 2

  // ─── Layout ───
  strideX:       0x320,          // @ 0x00479fbe — = tileWidth (column step in pixels)
  strideY:       0x324,          // @ 0x00479fbe — = tileHeight + halfTileHeight (row step)
  savedClientW:  0x328,          // @ 0x00479fbe — saved client width
  savedClientH:  0x32C,          // @ 0x00479fbe — saved client height
  marginX:       0x330,          // @ 0x00479fbe — centering margin X (when map < viewport)
  marginY:       0x334,          // @ 0x00479fbe — centering margin Y

  // ─── Sentinel ───
  sentinel358:   0x358,          // @ 0x00479ede — set to -1 during init
  lastZoom:      0x35C,          // @ 0x00479fbe — zoom change detection sentinel (init: 0xFFFFFC19)
};

// ═══════════════════════════════════════════════════════════════════
// VIEWPORT GEOMETRY FORMULAS
// Binary ref: FUN_00479fbe @ 0x00479FBE (recalc_viewport_geometry)
// ═══════════════════════════════════════════════════════════════════

export const VIEWPORT_GEOMETRY = {
  /**
   * Tile dimension computation:
   *   tileWidth   = scale_sprite(64, zoom)   // (zoom+8)*64/8
   *   tileHeight  = scale_sprite(32, zoom)   // (zoom+8)*32/8
   *   halfTileW   = tileWidth / 2
   *   halfTileH   = tileHeight / 2
   *   quarterTileW = tileWidth / 4
   *   quarterTileH = tileHeight / 4
   *
   * @ 0x00479fbe — lines 3690-3700 in decompiled C
   */

  /**
   * Viewport tile count computation:
   *   colsNarrow = ceil(clientWidth / tileWidth)     // @ 0x00479fbe +0x2F8
   *   rows       = ceil(clientHeight / tileHeight)   // @ 0x00479fbe +0x2FC
   *   colsWide   = ceil((clientWidth + halfTileW*3 - 1) / tileWidth)  // +0x300
   *   rowsWide   = ceil((clientHeight + halfTileH*3 - 1) / tileHeight) // +0x304
   *
   * Clamped to map dimensions:
   *   if colsNarrow > mapWidth/2: clamp, compute centering margin
   *   if rows > mapHeight: clamp, compute centering margin
   */

  /**
   * Font size scaling (proportional to tile height):
   *   fontLarge = (tileHeight * 3) / 5    // city name font
   *   fontSmall = tileHeight / 4          // unit count font
   *
   * @ 0x00479fbe — end of function
   */

  // Zoom-dependent detail thresholds from render_tile (FUN_0047a747):
  zoomThresholds: {
    plainOcean:     -3,          // @ 0x0047a747 — zoom < -3: draw simple ocean (no detail)
    overlayAll:     -4,          // @ 0x0047a747 — zoom < -4: overlay_mask = 0xF (all directions)
    hideRoads:      -4,          // @ 0x0047a747 — zoom < -4: skip road/railroad overlays
    hideRivers:     -6,          // @ 0x0047a747 — zoom < -6: skip river overlay
    hideDetails:    -3,          // @ 0x0047a747 — zoom < -3: skip improvements, forest details,
                                 //                           irrigation, city labels, unit labels
    hideResources:  -4,          // @ 0x0047a747 — zoom < -4: skip resource icons
    hideCitySprites: -3,         // @ 0x0047a747 — zoom < -3: skip city/unit sprite rendering
  },
};

// ═══════════════════════════════════════════════════════════════════
// MAP WRAPPING (Cylindrical)
// Binary ref: FUN_005ae052 (wrap function), DAT_00655AE8 (flat earth flag)
// ═══════════════════════════════════════════════════════════════════

export const MAP_WRAPPING = {
  wrapFunction: 'FUN_005ae052',  // @ 0x00479fbe — wraps X coordinate to [0, mapWidth)
  flatEarthFlag: 'DAT_00655AE8', // @ 0x00479fbe — bit 0x8000: flat earth (no X wrapping)
  flatEarthBit: 0x8000,          // @ 0x00479fbe — (DAT_00655AE8 & 0x8000) != 0 means flat

  /**
   * Wrapping rules:
   * - If flat earth: clamp viewportLeftX to [0, mapWidth - 2*colsNarrow]
   * - If round earth: viewportLeftX wraps via FUN_005ae052
   * - Y axis never wraps (always clamped to [0, mapHeight - 2*rows])
   *
   * Parity constraints (isometric grid):
   * - viewportLeftX must be even: if odd, subtract 1
   * - if viewportTopY is odd: add 1 to viewportLeftX
   *
   * @ 0x00479fbe — lines 3724-3734 in decompiled C
   */

  mapWidthGlobal:  'DAT_006d1160', // @ 0x00479ede — map width (in tiles)
  mapHeightGlobal: 'DAT_006d1162', // @ 0x00479ede — map height (in tiles)
};

// ═══════════════════════════════════════════════════════════════════
// VIEWPORT STATE PACKING (Save File)
// Binary ref: FUN_00472f7b (pack) / FUN_00473064 (unpack) @ block_00470000.c
// ═══════════════════════════════════════════════════════════════════

export const VIEWPORT_SAVE = {
  packedSize: 0x6A,              // @ 0x00473660 — fwrite(packed_viewport, 0x6A) = 106 bytes

  /**
   * Save file viewport state layout (packed 16-bit):
   *
   * Offset | Size | Description
   * -------|------|-------------------------------------------
   * 0x00   | 2    | viewport mode (int16)
   * 0x02   | 8    | current player viewport rect (4 × int16)
   * 0x0A   | 8    | minimap rect (4 × int16)
   * 0x12   | 64   | per-civ rects: 8 × (4 × int16) = 8 × 8
   * 0x52   | 8    | extra rect 1
   * 0x5A   | 8    | extra rect 2
   * 0x62   | 8    | extra rect 3
   * -------|------|-------------------------------------------
   * Total: 0x6A (106 bytes)
   *
   * @ 0x00472f7b — pack: int32 → int16 conversion
   * @ 0x00473064 — unpack: int16 → int32 sign-extending
   *
   * Runtime (32-bit) addresses:
   *   DAT_00655280 — viewport mode
   *   DAT_00655284 — current player rect (4 × int32)
   *   DAT_00655294 — minimap rect
   *   DAT_006552A4 — per-civ rects (8 × 4 × int32, stride 16)
   *   DAT_00655324, 00655334, 00655344 — extra rects
   *
   * Packed (16-bit) addresses:
   *   DAT_0066C600 — viewport mode
   *   DAT_0066C602..0066C662 — all rects
   */
};

// ═══════════════════════════════════════════════════════════════════
// SPRITE SCALING SYSTEM
// Binary ref: FUN_0047df20 (set_sprite_scale) / FUN_0047df50 (reset_sprite_scale)
// ═══════════════════════════════════════════════════════════════════

export const SPRITE_SCALING = {
  /**
   * set_sprite_scale(zoom): calls FUN_005cd775(zoom + 8, 8)
   * reset_sprite_scale():   calls FUN_005cd775(1, 1)
   *
   * The sprite blitter uses a numerator/denominator pair to scale sprites:
   *   numerator = zoom + 8, denominator = 8
   *
   * This must be set before any sprite blit operation and reset afterward.
   *
   * @ 0x0047DF20 — set_sprite_scale
   * @ 0x0047DF50 — reset_sprite_scale
   */
  setScale: 'FUN_005cd775',     // @ 0x0047df20 — underlying scale setter
  // scale_at_current_zoom(base): scale_sprite(base, viewport->zoomLevel)
  // @ 0x0047DFB0
};

// ═══════════════════════════════════════════════════════════════════
// VIEWPORT REDRAW SYSTEM
// Binary ref: Functions at 0x0047c7aa..0x0047cf9e
// ═══════════════════════════════════════════════════════════════════

export const VIEWPORT_REDRAW = {
  playerCount: 8,                // @ 0x0047ce1e — hardcoded to 8 players
  playerWindowStride: 0x3F0,     // @ 0x0047ce1e — per-player viewport array stride
  playerActiveCheck: 'DAT_0066ca84', // @ 0x0047ce1e — DAT_0066ca84 + i*0x3f0 checks activity

  /**
   * Redraw pipeline (FUN_0047c9d4 — redraw_full_viewport):
   *   for row in 0..(rows + rowsWide + 1):
   *     cols = colsWide if (row & 1) else colsNarrow
   *     for col in 0..cols:
   *       tileX = wrap(col*2 + viewportLeftX + (row & 1))
   *       tileY = viewportTopY + row
   *       render_tile(tileX, tileY, civId)
   *
   * @ 0x0047c9d4 — full viewport redraw
   *
   * Area redraw (FUN_0047c869):
   *   Iterates a diamond pattern around center tile with given radius.
   *   Calls render_tile for each + draw_city_labels.
   *   Uses FUN_005ae052 for map wrapping.
   *
   * @ 0x0047c869 — redraw_tile_area
   */

  // Tile area rect calculation (FUN_0047c7aa):
  // Uses viewport offsets +0x310 (halfTileW), +0x314 (halfTileH), +0x308 (tileW)
  // to compute pixel rect for a tile group.
};

// ═══════════════════════════════════════════════════════════════════
// UNIT DATA STRUCTURE (used by viewport unit rendering)
// Binary ref: FUN_0047bd04, FUN_0047be63 @ block_00470000.c
// ═══════════════════════════════════════════════════════════════════

export const UNIT_RENDER_DATA = {
  unitArrayBase: 'DAT_006560f0', // @ 0x0047bd04 — unit record array start
  unitStride: 0x20,              // @ 0x0047bd04 — 32 bytes per unit record
  fields: {
    xCoord:       0x00,          // @ 0x0047bd04 — short: unit tile X
    yCoord:       0x02,          // @ 0x0047bd04 — short: unit tile Y
    statusFlags:  0x04,          // @ 0x0047bd04 — unit status/type flags
    unitType:     0x06,          // @ 0x0047be63 — byte: unit type index
    owner:        0x07,          // @ 0x0047bd04 — byte & 0x1f: owning civ (0-7)
    visibilityMask: 0x09,        // @ 0x0047bd04 — byte: 1<<player visibility bitmask
    alive:        0x0A,          // @ 0x0047be63 — int: nonzero if alive (offset+0x1a within stride)
    orders:       0x0F,          // @ 0x0047be63 — byte: current order code
  },
  selectedUnit:    'DAT_00633e48', // @ 0x0047bd04 — currently selected unit index
  activeUnitId:    'DAT_00655afe', // @ 0x0047bd04 — active unit for animation
  cheatRevealFlag: 'DAT_00655b07', // @ 0x0047be63 — if nonzero: reveal all units
  stackIterator:   'FUN_005b2c82', // @ 0x0047be63 — next_in_stack(unit_idx)
};

// ═══════════════════════════════════════════════════════════════════
// UNIT MOVE ANIMATION DATA
// Binary ref: FUN_00472d20 (init_unit_move_data) @ block_00470000.c
// ═══════════════════════════════════════════════════════════════════

export const UNIT_MOVE_DATA = {
  // Special slot ID for animated unit
  animSlotId: 0x800,             // @ 0x00472d20 — returns 0x800 as special unit slot

  // Animation state globals
  unitX:           'DAT_006660F6', // @ 0x00472d20 — animating unit's current X
  unitY:           'DAT_006660F7', // @ 0x00472d20 — animating unit's current Y
  offscreenCoord:  -50,            // @ 0x00472d20 — 0xFFCE = -50 (off-screen sentinel)
  clearValue:      0xFF,           // @ 0x00472d20 — DAT_00666100 = 0xFF (clear marker)
};

// ═══════════════════════════════════════════════════════════════════
// SCROLL / CAMERA MOVEMENT
// Binary ref: FUN_00479e7e, FUN_00479eae @ block_00470000.c
// ═══════════════════════════════════════════════════════════════════

export const SCROLL = {
  /**
   * Camera scrolling operates by updating the cursor position
   * (cursorX at +0x2E0, cursorY at +0x2E2) and then calling
   * recalc_viewport_geometry to recompute all derived values.
   *
   * scroll_map_to_y @ 0x00479E7E: scroll_to(y, this->+0x2E2)
   * scroll_map_to_x @ 0x00479EAE: scroll_to(this->+0x2E0, x)
   *
   * The game uses FUN_00410402 for animated scrolling.
   *
   * Scroll animation coordinates are set via network opcode 0x9A
   * (@ 0x0047e94e — set scroll animation coords)
   */

  // The game does not have a configurable scroll speed in the binary;
  // scrolling is handled by centering the viewport on a target tile
  // and redrawing. The visual speed depends on the rendering framerate.

  scrollAnimOpcode: 0x9A,        // @ 0x0047e94e — network opcode for scroll animation coords
};

// ═══════════════════════════════════════════════════════════════════
// RENDERING DETAIL CONTROLS
// Binary ref: FUN_0047a747 (render_tile) @ block_00470000.c
// ═══════════════════════════════════════════════════════════════════

export const RENDER_DETAIL = {
  // Text outline rendering (used for city names, numbers on map)
  // @ FUN_00472b0a — draw_number_on_map
  textOutline: {
    shadowColor: 10,             // @ 0x00472b0a — dark outline color
    shadowOffset: {
      topLeft:  { dx: -1, dy: -1 },  // first shadow pass
      botRight: { dx:  3, dy:  3 },  // second shadow pass
      main:     { dx: -2, dy: -2 },  // main text draw offset
    },
  },

  // City label rendering (@ FUN_0047c443)
  cityLabel: {
    fontLargeRatio: 3 / 5,       // @ 0x00479fbe — fontLarge = (tileHeight * 3) / 5
    fontSmallRatio: 1 / 4,       // @ 0x00479fbe — fontSmall = tileHeight / 4
    shadowColor: 10,             // @ 0x0047c443 — dark shadow at palette 10
    shadowOffset: 'scaled_2',    // @ 0x0047c443 — shadow offset scales with zoom
  },

  // Minimap refresh threshold
  minimapRefreshThreshold: 2,    // @ 0x0047cb50 — updates minimap if DAT_00655b02 > 2
};

// ═══════════════════════════════════════════════════════════════════
// SAVE FORMAT CONSTANTS (Unit/City record sizes by version)
// Binary ref: FUN_004732a6 (load_units_and_cities) @ block_00470000.c
// ═══════════════════════════════════════════════════════════════════

export const SAVE_FORMAT = {
  // Unit record sizes by save format version
  unitRecordSize: {
    current:     0x20,           // @ 0x004732a6 — v >= 0x2A: 32 bytes/unit
    transitional: 0x1E,          // @ 0x004732a6 — v == 0x29: 30 bytes/unit
    old:          0x1A,          // @ 0x004732a6 — v <  0x29: 26 bytes/unit
  },
  // City record sizes
  cityRecordSize: {
    current: 0x58,               // @ 0x004732a6 — v >= 0x29: 88 bytes/city
    old:     0x54,               // @ 0x004732a6 — v <  0x29: 84 bytes/city
  },
  // Game state sizes
  gameStateSize:   0x14A,        // @ 0x00473660 — v >= 0x28: 330 bytes
  cosmicRulesSize: 0x790,        // @ 0x00473660 — always 1936 bytes
  civDataSize:     0x594,        // @ 0x00473660 — per-civ: 1428 bytes
  civDataTotal:    0x2CA0,       // @ 0x00473660 — 8 civs × 0x594 = 11424 bytes
};
