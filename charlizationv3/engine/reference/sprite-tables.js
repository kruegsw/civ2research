/**
 * Civ2 MGE Sprite Tables -- Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra) + Civ2-clone (axx0) cross-reference
 *
 * These are reference-only constants extracted from the binary.
 * Each value includes its binary source address or cross-reference.
 *
 * Architecture: Civ2 MGE uses the MicroProse SMEDS32 graphics engine
 * (source: D:\Ss\Smeds32\Port.cpp) for all sprite operations. The engine
 * operates in 8-bit paletted mode with 256-color GIF spritesheets.
 * Game-specific sprite loading is in block_00440000 (FUN_0044b49e).
 * Sprite recoloring tools are in block_00560000 (FUN_0056fce4, FUN_0056ffda).
 * The SMEDS32 engine itself (block_005C0000, 339 functions) is fully generic
 * with zero game-specific constants (verified Phase A).
 */

// ═══════════════════════════════════════════════════════════════════
// UNITS.GIF Layout
// Binary ref: FUN_0044b30e @ block_00440000.c (load_unit_sprites)
// Confirmed by: Civ2-clone Civ2GoldInterface.cs lines 85-88, 509-510
// ═══════════════════════════════════════════════════════════════════

export const UNITS_GIF = {
  columns: 9,           // @ 0x0044B30E: loop counter resets at >8 (0-8 = 9 cols)
  rows: 7,              // @ Civ2-clone: UnitsRows => 7 (line 509)
  totalSlots: 63,       // @ 0x0044B30E: loop 0..0x3F exclusive = 63 (0x3f)
  cellStride: 65,       // @ 0x0044B30E: local_8 += 0x41 (65px per column)
  rowStride: 49,        // @ 0x0044B30E: local_c += 0x31 (49px per row)
  spriteWidth: 64,      // @ FUN_0044ac07 (extract_48px_sprite): creates 0x40 x 0x30 context
  spriteHeight: 48,     // @ FUN_0044ac07: 0x30 = 48
  borderWidth: 1,       // implicit: 65 - 64 = 1px border between cells
  startX: 1,            // @ 0x0044B30E: local_8 = 1 (first column pixel)
  startY: 1,            // @ 0x0044B30E: local_c = 1 (first row pixel)

  // Shield template in right margin of spritesheet
  shield: {
    // backShield1: primary shield template
    // @ 0x0044B30E: FUN_004499d3(&DAT_00647f60, 0x24a, 1, 0xc, 0x14)
    backShield1: { x: 586, y: 1, w: 12, h: 20 },  // 0x24a=586, 0xc=12, 0x14=20
    // Civ2-clone confirms: backShield1 at (586, 1, 12, 20)
    // Civ2-clone: backShield2 at (599, 1, 12, 20)
    backShield2: { x: 599, y: 1, w: 12, h: 20 },  // Civ2-clone line 91
    // Civ2-clone: HPshield at (597, 30, 12, 20)
    hpShield: { x: 597, y: 30, w: 12, h: 20 },    // Civ2-clone line 89
  },

  // Blue marker scanning for shield anchor position
  // @ FUN_0044b239 (find_unit_blue_marker): scans for palette index 4
  blueMarkerPaletteIndex: 4,   // @ 0x0044B239: if (iVar1 == 4)
  // Shield anchor X stored at DAT_00642c48 + unitType * 4
  // Shield anchor Y stored at DAT_00642b48 + unitType * 4
  shieldAnchorXBase: 0x00642C48,  // @ 0x0044B239
  shieldAnchorYBase: 0x00642B48,  // @ 0x0044B239

  // Unit sprite array base
  // @ 0x0044B30E: FUN_0044ac07(&DAT_00641848 + local_14 * 0x3c, ...)
  spriteArrayBase: 0x00641848,  // DAT_00641848, stride 0x3c per unit type
  spriteStructStride: 0x3C,     // 60 bytes per sprite record
};


// ═══════════════════════════════════════════════════════════════════
// CITIES.GIF Layout
// Binary ref: FUN_0044ae4c @ block_00440000.c (load_city_sprites)
// Confirmed by: Civ2-clone Civ2GoldInterface.cs lines 188-200
// ═══════════════════════════════════════════════════════════════════

export const CITIES_GIF = {
  // City sprites: 6 epochs x 4 styles x 2 wall states = 48 total
  epochs: 6,                // @ 0x0044AE4C: for (local_28 = 0; local_28 < 6; ...)
  stylesPerEpoch: 4,        // @ 0x0044AE4C: for (local_8 = 0; local_8 < 4; ...)
  wallStates: 2,            // unwalled (left) + walled (right)

  cellStride: 65,           // @ 0x0044AE4C: local_8 * 0x41
  rowStride: 49,            // @ 0x0044AE4C: local_14 += 0x31
  spriteWidth: 64,          // @ FUN_0044ac07: 0x40
  spriteHeight: 48,         // @ FUN_0044ac07: 0x30

  // Starting positions
  unwalledStartX: 1,        // @ 0x0044AE4C: iVar1 + 1 (style*0x41 + 1)
  walledStartX: 334,        // @ 0x0044AE4C: iVar1 + 0x14e (style*0x41 + 334)
  startY: 39,               // @ 0x0044AE4C: local_14 = 0x27 (39)
  // Civ2-clone confirms: unwalled at (1+65*col, 39+49*row), walled at (334+65*col, 39+49*row)

  // City sprite array bases
  // @ 0x0044AE4C: FUN_0044ac07(&DAT_0063fe50 + epoch*0x1e0 + style*0x78, ...)
  normalSpriteBase: 0x0063FE50,   // unwalled city sprites
  walledSpriteBase: 0x0063FE8C,   // walled city sprites (offset +0x3C from normal)
  spriteStructStride: 0x78,       // per style within epoch
  epochStride: 0x1E0,             // per epoch

  // Blue marker (flag position) scanning
  // @ FUN_0044ac3e: scans for palette index 4, stores at DAT_00640a18 / DAT_00640ad8
  // Indexed as: [wallState*4 + epoch*0x20 + style*8]
  flagAnchorXBase: 0x00640A18,    // @ 0x0044AC3E
  flagAnchorYBase: 0x00640AD8,    // @ 0x0044AC3E
  flagMarkerPaletteIndex: 4,      // @ 0x0044AC3E: if (iVar1 == 4)
  flagYAdjust: -15,               // @ 0x0044AC3E: local_14 + -0xf (y offset adjustment)

  // Name anchor (size label position) scanning
  // @ FUN_0044ad47: scans for palette index 3, stores at DAT_00643978 / DAT_00643a38
  nameAnchorXBase: 0x00643978,    // @ FUN_0044ad47
  nameAnchorYBase: 0x00643A38,    // @ FUN_0044ad47
  nameMarkerPaletteIndex: 3,      // @ FUN_0044ad47: scans for pixel == 3

  // City flags section (bottom of CITIES.GIF)
  flags: {
    // @ 0x0044AE4C: FUN_004499d3(&DAT_006442f8 + i*0x78, col, 0x1a9, 0xe, 0x16)
    frontRowY: 425,           // 0x1a9 = 425
    backRowY: 448,            // 0x1c0 = 448
    width: 14,                // 0xe = 14
    height: 22,               // 0x16 = 22
    spacing: 15,              // @ 0x0044AE4C: local_c += 0xf (15px per flag)
    count: 8,                 // @ 0x0044AE4C: for (local_24 = 0; local_24 < 8; ...)
    startX: 1,                // @ 0x0044AE4C: local_c = 1
    // Note: Civ2-clone shows 9 flags (0-8), with index 8 being an unused brown flag
  },

  // Color sampling from flag sprites
  // @ 0x0044AE4C: FUN_005c0bf2(local_c + 3, 0x1ad) -> light color at y=0x1ad (429)
  colorSampling: {
    lightColorOffsetX: 3,     // @ 0x0044AE4C: local_c + 3
    lightColorY: 429,         // @ 0x0044AE4C: 0x1ad
    darkColorOffsetX: 6,      // @ 0x0044AE4C: local_c + 6
    darkColorY: 429,          // @ 0x0044AE4C: 0x1ad (same row)
    flagColorOffsetX: 0,      // @ 0x0044AE4C: local_c (no offset)
    flagColorY: 423,          // @ 0x0044AE4C: 0x1a7
    // Color table stored at DAT_00655358 (light), DAT_0065535c (dark), DAT_00655360 (flag)
    // Stride: 0x10 (16 bytes) per civ
    colorTableLight: 0x00655358,   // @ 0x0044AE4C
    colorTableDark: 0x0065535C,    // @ 0x0044AE4C
    colorTableFlag: 0x00655360,    // @ 0x0044AE4C
    colorTableStride: 0x10,        // 16 bytes per civ entry
  },

  // Text color sampling (from top border of flag area)
  // Civ2-clone: PicSources["textColours"] at (1+15*col, 423, 14, 1)
  textColorY: 423,            // Civ2-clone line 92-93

  // Fortress & Airbase sprites at bottom of CITIES.GIF
  // @ 0x0044AE4C: FUN_0044ac07 extracts 64x48 sprites
  fortify:      { x: 143, y: 423, w: 64, h: 48 },  // @ DAT_006465d8, (0x8f, 0x1a7)
  fortressAlt:  { x: 208, y: 423, w: 64, h: 48 },  // @ DAT_00646650, (0xd0, 0x1a7)
  airbase:      { x: 273, y: 423, w: 64, h: 48 },  // @ DAT_00647fa0, (0x111, 0x1a7)
  airbaseFull:  { x: 338, y: 423, w: 64, h: 48 },  // @ DAT_00647fdc, (0x152, 0x1a7)
};


// ═══════════════════════════════════════════════════════════════════
// TERRAIN1.GIF Layout
// Binary ref: FUN_00449030 @ block_00440000.c (load_terrain_sprites)
// ═══════════════════════════════════════════════════════════════════

export const TERRAIN1_GIF = {
  cellStride: 65,             // @ 0x00449030: col increments by 0x41
  rowStride: 33,              // @ 0x00449030: local_64 += 0x21
  tileWidth: 64,              // @ FUN_0044999c: creates 0x40 x 0x20 context
  tileHeight: 32,             // @ FUN_0044999c: 0x20

  // Base terrain tiles: 11 terrain types (rows 0-10)
  // @ 0x00449030: for (local_54 = 0; local_54 < 0xb; ...)
  terrainTypes: 11,           // 0xb terrain types
  baseTerrainCol: 1,          // @ 0x00449030: local_5c = 1
  baseTerrainStartY: 1,       // @ 0x00449030: local_64 = 1

  // Terrain variant columns extracted from each row:
  // Col 0 (x=1): base terrain sprite
  // Col 1 (x=66): variant 2 (Civ2-clone "base2")
  // Col 2 (x=131): special resource 1
  // Col 3 (x=196): special resource 2
  // ...additional cols for text labels/variants
  // @ 0x00449030: col1=1, col2=0x83 (131), col3=0xc4 (196)
  columns: {
    baseTerrain: 1,           // @ 0x00449030: local_5c = 1
    variant2: 131,            // @ 0x00449030: local_60 = 0x83
    special1: 131,            // @ Civ2-clone: special1 at (131, 1+33*row)
    special2: 196,            // @ 0x00449030: local_68 = 0xc4
  },

  // Sprite array bases for terrain tiles
  terrainSpriteBase: 0x00647C40,    // @ 0x00449030: DAT_00647c40 + t * 0x3c
  // DAT_006482f8 + t*0x78 for city_flag_alt1 variants
  // DAT_00648334 + t*0x78 for city_flag_alt2 variants

  // Improvement sprites at col 7 (x=456)
  // @ 0x00449030: local_5c = 0x1c8 (456), local_64 = 100
  improvements: {
    x: 456,                   // 0x1c8
    startY: 100,              // @ 0x00449030: local_64 = 100
    // Civ2-clone confirms exact positions:
    irrigation: { x: 456, y: 100 },    // row immediately after base terrains
    farmland:   { x: 456, y: 133 },    // +33
    mining:     { x: 456, y: 166 },    // +33
    pollution:  { x: 456, y: 199 },    // +33
    shield:     { x: 456, y: 232 },    // grassland production shield
    hut:        { x: 456, y: 265 },    // goody hut
  },

  // Road sprites: row 11 (y=363), 9 columns (lone + 8 directions)
  // Civ2-clone: "road" at (1+65*col, 363, 64, 32) for 9 sprites
  roads: {
    y: 363,                   // 11 * 33 + 1 = 364? Civ2-clone says 363 (0-indexed row 11)
    columns: 9,               // lone road + 8 directional
    // Direction mapping: 0=lone, 1-8=NE,E,SE,S,SW,W,NW,N
  },

  // Railroad sprites: row 12 (y=397), 9 columns
  // Civ2-clone: "railroad" at (1+65*col, 397, 64, 32)
  railroads: {
    y: 397,                   // row 12
    columns: 9,
  },

  // Overlay sprites (forest/mountain/hill variants)
  // @ 0x00449030: 9 overlay pairs starting at row y=0x16c (364), col stepping by 0x41
  overlays: {
    startY: 364,              // @ 0x00449030: local_64 = 0x16c
    startX: 1,                // @ 0x00449030: local_5c = 1
    colStep: 65,              // 0x41
    pairs: 9,                 // 9 overlays, each with main + alt variant
    pairRowSpacing: 33,       // alt at y + 0x21
    // Sprite array: DAT_00642710 + i*0x3c (main), DAT_0064292c + i*0x3c (alt)
    mainSpriteBase: 0x00642710,
    altSpriteBase: 0x0064292C,
  },

  // Dither mask tiles at bottom of spritesheet
  // @ 0x00449030: extracted at y=0x1bf (447)
  dither: {
    topX: 1, topY: 447,      // @ 0x00449030: FUN_0044999c(local_4c, 1, 0x1bf)
    bottomX: 66, bottomY: 447, // @ 0x00449030: FUN_0044999c(DAT_0063fcd8, 0x42, 0x1bf)
    blank1X: 131, blank1Y: 447, // @ 0x00449030: FUN_0044999c(DAT_00646118, 0x83, 0x1bf)
    blank2X: 261, blank2Y: 447, // @ 0x00449030: FUN_0044999c(DAT_00647ed8, 0x105, 0x1bf)
    blank3X: 196, blank3Y: 447, // @ 0x00449030: FUN_0044999c(local_ac, 0xc4, 0x1bf)
  },

  // Dither blend half-tiles (13 sets x 4 quadrants)
  // @ 0x00449030: for (local_54 = 0; local_54 < 0xd; ...) with 4 quadrant sub-loop
  ditherBlend: {
    count: 13,                // 0xd dither blend sets
    quadrants: 4,             // 4 quadrants per set
    quadrantWidth: 32,        // 0x20
    quadrantHeight: 16,       // 0x10
    // Quadrant layout within 64x32 buffer:
    // q0: x=32,y=0 (top-right)   q1: x=32,y=16 (bottom-right)
    // q2: x=0,y=16 (bottom-left) q3: x=0,y=0 (top-left)
    // @ 0x00449030: x = (q<2)?0x20:0, y = (q==0||q==3)?0:0x10
    // Sprite array: DAT_00640bd8 + blend*0xf0 + quadrant*0x3c
    spriteBase: 0x00640BD8,
    blendStride: 0xF0,       // 240 bytes per blend set
    quadrantStride: 0x3C,     // 60 bytes per quadrant
  },
};


// ═══════════════════════════════════════════════════════════════════
// TERRAIN2.GIF Layout
// Binary ref: FUN_00449030 @ block_00440000.c (second half)
// Confirmed by: Civ2-clone Civ2GoldInterface.cs lines 121-137
// ═══════════════════════════════════════════════════════════════════

export const TERRAIN2_GIF = {
  cellStride: 65,             // 0x41
  rowStride: 33,              // 0x21
  tileWidth: 64,
  tileHeight: 32,

  // Coast quadrants: 4 sets of 16 variants each
  // @ 0x00449030: for (local_50 = 0; local_50 < 0x10; ...)
  coast: {
    count: 16,                // 16 variants per set
    sets: 4,                  // 4 coast quadrant sets
    startY: 67,               // @ 0x00449030: local_70 = 0x43 (67)
    // Set offsets from startY:
    // Set 1: y = 67 + ((i>>3)*33)              -- rows 0-1
    // Set 2: y = 67 + ((i>>3)*33) + 66         -- +0x42
    // Set 3: y = 67 + ((i>>3)*33) + 132        -- +0x84
    // Set 4: y = 67 + ((i>>3)*33) + 198        -- +0xc6
    setOffsets: [0, 0x42, 0x84, 0xC6],  // @ 0x00449030
    // x = (i & 7) * 0x41 + 1
    // Sprite arrays: DAT_0063f858, DAT_006461d8, DAT_00647388, DAT_006447b0
    spriteBase: [0x0063F858, 0x006461D8, 0x00647388, 0x006447B0],
  },

  // Coastline pieces (Civ2-clone uses different coordinate system)
  // Civ2-clone: 8 groups, 4 pieces each, at y=429/446/463 with 66px spacing
  coastPieces: {
    // Civ2-clone: coastline src at (1+66*i, 429/446/463, 32, 16)
    pieceWidth: 32,           // half-tile
    pieceHeight: 16,          // half-tile
    startY: 429,              // Civ2-clone line 205
    groupSpacing: 66,         // Civ2-clone line 205
    groups: 8,
    piecesPerGroup: 4,
    // Piece 0: top    (y=429)
    // Piece 1: bottom (y=446)
    // Piece 2: left   (y=463, x=1+66*i)
    // Piece 3: right  (y=463, x=34+66*i)
  },

  // Connection/forest/mountain/hill overlays
  // Civ2-clone: 2*8=16 sprites per type
  // @ Civ2-clone: "connection" at (1+65*(i%8), 1+33*(i/8))
  // @ Civ2-clone: "forest" at (1+65*(i%8), 133+33*(i/8))
  // @ Civ2-clone: "mountain" at (1+65*(i%8), 199+33*(i/8))
  // @ Civ2-clone: "hill" at (1+65*(i%8), 265+33*(i/8))
  overlays: {
    columnsPerRow: 8,         // 8 sprites per row
    rowsPerType: 2,           // 2 rows per overlay type
    spritesPerType: 16,       // 8 * 2 = 16 variants
    connection: { startY: 1 },    // rows 0-1
    river:      { startY: 67 },   // rows 2-3
    forest:     { startY: 133 },  // rows 4-5
    mountain:   { startY: 199 },  // rows 6-7
    hill:       { startY: 265 },  // rows 8-9
    riverMouth: { startY: 331, count: 4 },  // row 10, 4 sprites
  },

  // River sub-tiles (half-tile pieces for directional rivers)
  // @ 0x00449030: 8 river directions, 4 sub-tiles each (32x16)
  rivers: {
    count: 8,                 // 8 directions
    subTilesPerDirection: 4,  // 4 sub-tiles
    subTileWidth: 32,         // 0x20
    subTileHeight: 16,        // 0x10
    startX: 1,                // @ 0x00449030: local_58 = 1
    startY: 429,              // @ 0x00449030: local_70 = 0x1ad (429)
    directionSpacing: 66,     // @ 0x00449030: local_58 += 0x42
    // Sub-tile offsets within each direction block:
    // [0]: (col, 0x1ad)                -- 32x16 at base position
    // [1]: (col+0x21, 0x1ad+0x22)      -- offset (33, 34)
    // [2]: (col, 0x1ad+0x11)           -- offset (0, 17)
    // [3]: (col, 0x1ad+0x22)           -- offset (0, 34)
    // Sprite array: DAT_00643b38 + dir*0xf0
    spriteBase: 0x00643B38,
    dirStride: 0xF0,
  },

  // Misc terrain sprites
  // @ 0x00449030: 4 misc sprites at y=0x14b (331)
  misc: {
    startY: 331,              // 0x14b
    count: 4,
    spacing: 65,              // 0x41
    spriteBase: 0x0063FD18,   // DAT_0063fd18 + i*0x3c
  },
};


// ═══════════════════════════════════════════════════════════════════
// PEOPLE.GIF Layout (citizen sprites)
// Binary ref: FUN_00449a0e @ block_00440000.c (load_icon_sprites)
// ═══════════════════════════════════════════════════════════════════

export const PEOPLE_GIF = {
  // Citizen sprites: 4 moods x 11 types
  // @ 0x00449A0E: for (local_14 = 0; local_14 < 4; ...) for (local_18 = 0; local_18 < 0xb; ...)
  // @ 0x00449A0E: FUN_004499d3(DAT_00642d48 + type*0x3c + mood*0x294, x, y, 0x1b, 0x1e)
  moods: 4,                   // happy, content, unhappy, specialist
  typesPerMood: 11,           // 0xb citizen types per mood
  spriteWidth: 27,            // 0x1b
  spriteHeight: 30,           // 0x1e
  startX: 2,                  // @ 0x00449A0E: local_20 = 2
  startY: 6,                  // @ 0x00449A0E: local_24 = 6
  colStep: 28,                // 0x1c (27+1)
  rowStep: 31,                // 0x1f (30+1)
  spriteBase: 0x00642D48,     // DAT_00642d48
  moodStride: 0x294,          // 660 bytes per mood row

  // Civ2-clone confirms: "people" at (2+28*(i%11), 6+31*(i/11), 27, 30) for 11*4 sprites

  // Building sprites (small): 11 types at y=0x89 (137)
  // @ 0x00449A0E: for (local_18 = 0; local_18 < 0xb; ...)
  // @ 0x00449A0E: FUN_004499d3(DAT_00646a20 + i*0x3c, x, 0x89, 0xf, 0x1a)
  buildings: {
    count: 11,
    width: 15,                // 0xf
    height: 26,               // 0x1a
    startX: 2,
    startY: 137,              // 0x89
    colStep: 16,              // 0x10
    spriteBase: 0x00646A20,
  },
};


// ═══════════════════════════════════════════════════════════════════
// ICONS.GIF Layout
// Binary ref: FUN_00449a0e @ block_00440000.c (load_icon_sprites)
// Confirmed by: Civ2-clone Civ2GoldInterface.cs
// ═══════════════════════════════════════════════════════════════════

export const ICONS_GIF = {
  // Resource overlay tiles
  // @ 0x00449A0E: FUN_0044999c(DAT_00640b98, 199, 0x100) -- 64x32 at (199, 256)
  resourceOverlay1: { x: 199, y: 256, w: 64, h: 32 },   // 0x100 = 256
  resourceOverlay2: { x: 199, y: 289, w: 64, h: 32 },   // 0x121 = 289
  // @ 0x00449A0E: FUN_0044999c(DAT_00647bc8, 0xf8, 0x1ae)
  resourceOverlay3: { x: 248, y: 430, w: 64, h: 32 },    // 0xf8=248, 0x1ae=430

  // City style sample sprite
  // @ 0x00449A0E: FUN_0044abd5(1, 0x20, 0xbb)
  cityStyleSample: { x: 32, y: 187 },  // 0x20=32, 0xbb=187, 64x48

  // Various 32x32 icon sprites
  // @ 0x00449A0E: multiple FUN_0044ab72 calls extracting 32x32 at various positions
  icons32x32: [
    { name: 'icon_a', x: 34, y: 223 },       // 0x22, 0xdf
    { name: 'icon_b', x: 100, y: 223 },      // 100, 0xdf
    { name: 'icon_c', x: 133, y: 223 },      // 0x85, 0xdf
  ],
  // 33x33 icon (special):
  // FUN_004499d3(DAT_006466c8, 0x43, 0xdf, 0x20, 0x20) -- 32x32 at (67, 223)
  // FUN_004499d3(DAT_0064677c, 0xa6, 0xdf, 0x1e, 0x1e) -- 30x30 at (166, 223)

  // Shield icons (32x32) at y=256 row
  shieldIcons: [
    { x: 199, y: 256 },      // 0xc7=199, 0x100=256
    { x: 232, y: 256 },      // 0xe8=232
    { x: 265, y: 256 },      // 0x109=265
    { x: 298, y: 256 },      // 0x12a=298
  ],

  // Score bars (31x96) at x=311, rows 1 and 98
  // @ 0x00449A0E: FUN_004499d3(DAT_0063f768, 0x137, 1, 0x1f, 0x60)
  scoreBar1: { x: 311, y: 1, w: 31, h: 96 },       // 0x137=311, 0x1f=31, 0x60=96
  scoreBar2: { x: 311, y: 98, w: 31, h: 96 },       // y=0x62=98

  // Advisory portrait (56x131) at (265, 289)
  // @ 0x00449A0E: FUN_004499d3(DAT_00648098, 0x109, 0x121, 0x38, 0x83)
  advisorPortrait: { x: 265, y: 289, w: 56, h: 131 }, // 0x38=56, 0x83=131

  // Building improvement icons: 38 buildings, 8 per row, 36x20 each
  // @ 0x00449A0E: for (local_18 = 1; local_18 < 0x27; ...) at (0x157, y, 0x24, 0x14)
  buildingIcons: {
    startX: 343,              // 0x157
    startY: 1,                // @ 0x00449A0E: local_24 = 1
    width: 36,                // 0x24
    height: 20,               // 0x14
    colStep: 37,              // 0x25
    perRow: 8,                // resets at >7 (local_464 > 7)
    rowStep: 21,              // 0x15
    count: 38,                // 0x27 - 1 = 38 (starting from index 1)
    spriteBase: 0x00645160,   // DAT_00645160 + idx*0x3c
  },

  // Wonder icons: 28 wonders, 7 per row, 36x20 each
  // @ 0x00449A0E: for (local_18 = 0; local_18 < 0x1c; ...) at (0x157, 0x6a, 0x24, 0x14)
  wonderIcons: {
    startX: 343,              // 0x157
    startY: 106,              // 0x6a
    width: 36,                // 0x24
    height: 20,               // 0x14
    colStep: 37,              // 0x25
    perRow: 7,                // resets at >6 (local_464 > 6)
    rowStep: 21,              // 0x15
    count: 28,                // 0x1c
    spriteBase: 0x00645A84,   // DAT_00645a84 + idx*0x3c
  },

  // Government icons: 8 icons at (1, 0x164, 0x20, 0x20) = (1, 356, 32, 32)
  // @ 0x00449A0E: for (local_18 = 0; local_18 < 8; ...)
  governmentIcons: {
    startX: 1,
    startY: 356,              // 0x164
    width: 32,                // 0x20
    height: 32,               // 0x20
    colStep: 33,              // 0x21
    count: 8,
    spriteBase: 0x00647168,   // DAT_00647168 + idx*0x3c
  },

  // === Additional ICONS.GIF sprites (binary-confirmed in FUN_00449a0e) ===
  // Full details in ICONS_GIF_EXTRA export below.

  // Wonder/research progress: 3 sets x 2 rows, 14x14 each @ y=290
  // @ 0x00449A0E: FUN_0044aba9(DAT_00644f00 + set*0x78, x, 0x122, 14)
  // See ICONS_GIF_EXTRA.researchProgress

  // HP bar sprites: 4 pairs at y=290 (0x122) and y=305 (0x131), 14x14 each
  // @ 0x00449A0E: FUN_0044aba9(DAT_00648118 + i*0x3c, x, 0x122, 14)
  //               FUN_0044aba9(DAT_00648208 + i*0x3c, x, 0x131, 14)
  // See ICONS_GIF_EXTRA.hpBarSprites

  // Grid/resource overlay: (199, 322, 64, 32)
  // @ 0x00449A0E: thunk_FUN_005a9afe(DAT_0063fe08, DAT_00647f18, 199, 0x142, 0, 0, 0x40, 0x20)
  // See ICONS_GIF_EXTRA.resourceOverlayExtra

  // Score/map viewport icon: (298, 190, 32, 32)
  // @ 0x00449A0E: thunk_FUN_005a9afe(DAT_0063fe08, DAT_00640990, 0x12a, 0xbe, 0, 0, 0x20, 0x20)
  // See ICONS_GIF_EXTRA.mapViewportIcon

  // Advance category icons: 4 rows x 5 cols, 36x20 each @ (343, 211)
  // @ 0x00449A0E: FUN_004499d3(DAT_00646cb8, 0x157, y, 0x24, 0x14) in 4-row x 5-col loop
  // See ICONS_GIF_EXTRA.advanceCategories

  // Civ2-clone additional cross-references:
  // viewPiece:     (199, 256, 64, 32) -- viewing rectangle overlay
  // gridlines:     (183, 430, 64, 32)
  // gridVisible:   (248, 430, 64, 32)
  // battleAnim:    (1+33*col, 356, 32, 32) for 8 frames
  // close button:  (1, 389, 16, 16)
  // zoomIn:        (18, 389, 16, 16)
  // zoomOut:       (35, 389, 16, 16)

  // Small direction icons: 4 at (1, 389, 16, 16) stepping by 17
  // @ 0x00449A0E: FUN_004499d3 at (1, 0x185), (0x12, 0x185), (0x23, 0x185), (0x34, 0x185)
  directionIcons: {
    positions: [
      { x: 1, y: 389 },        // 0x185 = 389
      { x: 18, y: 389 },       // 0x12 = 18
      { x: 35, y: 389 },       // 0x23 = 35
      { x: 52, y: 389 },       // 0x34 = 52
    ],
    width: 16,                  // 0x10
    height: 16,                 // 0x10
  },

  // Improvement markers (18x24)
  // @ 0x00449A0E: FUN_004499d3(DAT_00644770, 0xe3, 0x185, 0x12, 0x18)
  improvementMarkers: [
    { x: 227, y: 389, w: 18, h: 24 },  // 0xe3=227, 0x12=18, 0x18=24
    { x: 246, y: 389, w: 18, h: 24 },  // 0xf6=246
  ],

  // Pollution/nuclear markers (64x32) at y=255 and y=288
  // @ 0x00449A0E: FUN_004499d3(DAT_00647b50, 0x15e, 0xff, 0x40, 0x20)
  pollutionMarker: { x: 350, y: 255, w: 64, h: 32 },  // 0x15e=350, 0xff=255
  nuclearMarker:   { x: 350, y: 288, w: 64, h: 32 },   // 0x120=288
};


// ═══════════════════════════════════════════════════════════════════
// DLL Resource Sprites
// Binary ref: FUN_00449a0e @ block_00440000.c
// ═══════════════════════════════════════════════════════════════════

export const DLL_SPRITES = {
  // PEOPLE.GIF loaded from DLL resource 0x55 (85)
  // @ 0x00449A0E: FUN_005bf5e1(0x55, 10, 0xc0, local_45c)
  people: {
    resourceId: 0x55,         // 85
    bpp: 10,                  // 10-bit? (palette param)
    paletteSize: 192,         // 0xc0
  },

  // Advisor sprites from DLL resource 0x56 (86)
  // @ 0x00449A0E: FUN_005bf5e1(0x56, 10, 0xc0, local_45c)
  // Full advisor portrait positions documented in ADVISOR_SPRITES export below.
  advisor: {
    resourceId: 0x56,         // 86

    // 11 terrain thumbnails from DLL resource 0x55 (PEOPLE.GIF in DLL)
    // @ 0x00449A0E: 11 sprites, 91x72 each (0x5b x 0x48), 6 per row
    terrainThumbnails: {
      count: 11,              // 0xb
      width: 91,              // 0x5b
      height: 72,             // 0x48
      startX: 1,
      startY: 1,
      colStep: 92,            // 0x5c
      perRow: 6,
      rowStep: 73,            // 0x49
      spriteBase: 0x00644B70, // DAT_00644b70 + idx*0x3c
    },

    // Advisor portrait positions from resource 0x56 (see ADVISOR_SPRITES for full details):
    // Small portraits (34x34): 7 positions starting at (2, 68) spaced 0x42 apart
    //   @ 0x00449A0E: FUN_004499d3(DAT_00646878, 2, 0x44, 0x22, 0x22) etc.
    // Large portraits (64x64): 5 positions starting at (2, 200) spaced 0x42 apart
    //   @ 0x00449A0E: FUN_004499d3(DAT_00647748, 2, 200, 0x40, 0x40) etc.
  },

  // civ2art.dll — loaded via FUN_005681c9 (load_civ2_art)
  // @ 0x005681C9: loads GIF resource 999 from "civ2\\civ2art.dll"
  civ2art: {
    dllPath: 'civ2\\civ2art.dll',
    resourceId: 999,
    surfaceWidth: 64,         // @ 0x005681C9: create_surface(64, 32)
    surfaceHeight: 32,
  },
};


// ═══════════════════════════════════════════════════════════════════
// EDITORPT.GIF Layout (scenario editor sprites)
// Binary ref: FUN_00449a0e @ block_00440000.c
// ═══════════════════════════════════════════════════════════════════

export const EDITORPT_GIF = {
  // @ 0x00449A0E: 15 editor sprites at y=0x1bf (447), 32x32
  count: 15,                  // 0xf
  width: 32,                  // 0x20
  height: 32,                 // 0x20
  startX: 1,
  startY: 447,                // 0x1bf
  colStep: 33,                // 0x21
  spriteBase: 0x006477C8,     // DAT_006477c8 + idx*0x3c
};


// ═══════════════════════════════════════════════════════════════════
// Recolor System
// Binary ref: FUN_0056fce4 (recolor_units_spritesheet) @ block_00560000.c
//             FUN_0056ffda (recolor_cities_spritesheet) @ block_00560000.c
//             FUN_0043cab0 (get_civ_light_color) @ block_00430000.c
//             FUN_0056e1f0 (get_civ_dark_color) @ block_00560000.c
// ═══════════════════════════════════════════════════════════════════

export const RECOLOR_SYSTEM = {
  // Palette indices used for civ-color placeholders
  // These are the indices in the 8-bit palette that get swapped
  // when rendering unit/city sprites for different civilizations
  lightColorIndex: 252,       // (255, 0, 0) pure red -- Civ2-clone + JS renderer confirm
  darkColorIndex: 251,        // (127, 0, 0) dark red -- Civ2-clone + JS renderer confirm

  // Recolor tolerance (how close a pixel must be to the placeholder to be recolored)
  // @ renderer.js line 1604-1610: tolerance of 3 for both light and dark
  // Rationale: GIF decodes to exact palette RGB values; nearest false positive for
  // light red (255,0,0) is idx 96 at (243,0,0) = distance 12; for dark red (127,0,0)
  // nearest is idx 103 at (135,0,0) = distance 8. Tolerance 3 safely avoids both.
  tolerance: 3,               // @ renderer.js line 1605, 1610

  // Shadow color for shield shadow sprites
  // @ Civ2-clone GetShieldImages(): shadowColour = new(51, 51, 51, 255)
  shadowColor: { r: 51, g: 51, b: 51 },  // Civ2-clone line 536

  // Shield front: top 7 rows blacked out (HP bar + order letter area)
  // @ Civ2-clone line 542: shieldFront.DrawRectangle(0, 0, width, 7, Black)
  shieldFrontBlackoutRows: 7, // Civ2-clone line 542

  // Dark color derivation: light color divided by 2 (50% brightness)
  // @ renderer.js line 1598: dr = cr >> 1, dg = cg >> 1, db = cb >> 1
  darkColorShift: 1,          // right-shift by 1 = divide by 2

  // Color lookup path in binary:
  // 1. civId -> civ record at DAT_0064c6a0 + civId * 0x594
  // 2. rulesCivNumber at offset 0x6 in civ record: *(short*)(DAT_0064c6a6 + civId*0x594)
  // 3. leaderStyle at DAT_006554fe + rulesCivNumber * 0x30: *(short*)(DAT_006554fe + rcn*0x30)
  // 4. Color table at DAT_00655358/5c/60 + styleIdx * 0x10
  // @ FUN_0043cab0 (get_civ_light_color): returns DAT_00655358[styleIdx * 0x10]
  // @ FUN_0056e1f0 (get_civ_dark_color): returns DAT_0065535c[styleIdx * 0x10]
  // @ FUN_0043cb30 (get_civ_flag_color): returns DAT_00655360[styleIdx * 0x10]
  colorLookup: {
    civRecordBase: 0x0064C6A0,
    civRecordStride: 0x594,
    rulesCivNumberOffset: 0x06,     // offset within civ record
    leaderStyleBase: 0x006554FE,
    leaderStyleStride: 0x30,
    colorTableLight: 0x00655358,
    colorTableDark: 0x0065535C,
    colorTableFlag: 0x00655360,
    colorTableStride: 0x10,
  },

  // The 8 default civ colors (read from CITIES.GIF flag sprites at runtime)
  // These are NOT hardcoded in the binary -- they are sampled from the GIF palette
  // at load time via FUN_005c0bf2 (get_pixel). The values below are from the
  // standard MGE palette and match the JS CIV_COLORS array.
  // Sampled at runtime via FUN_005c0bf2 (get_pixel), not hardcoded as constants.
  // Values below from standard MGE palette; match JS CIV_COLORS array.
  defaultCivColors: [
    { index: 0, hex: '#c80000', name: 'Red (Romans/Barbarians)', r: 200, g: 0, b: 0 },
    { index: 1, hex: '#ffffff', name: 'White', r: 255, g: 255, b: 255 },
    { index: 2, hex: '#00b400', name: 'Green', r: 0, g: 180, b: 0 },
    { index: 3, hex: '#3250dc', name: 'Blue', r: 50, g: 80, b: 220 },
    { index: 4, hex: '#f0dc00', name: 'Yellow', r: 240, g: 220, b: 0 },
    { index: 5, hex: '#00c8c8', name: 'Cyan', r: 0, g: 200, b: 200 },
    { index: 6, hex: '#f08c00', name: 'Orange', r: 240, g: 140, b: 0 },
    { index: 7, hex: '#b400c8', name: 'Purple', r: 180, g: 0, b: 200 },
  ],
};


// ═══════════════════════════════════════════════════════════════════
// Chroma Key / Transparency System
// Binary ref: SMEDS32 block_005C0000 (sprite extraction functions)
//             renderer.js (JS implementation)
// ═══════════════════════════════════════════════════════════════════

export const CHROMA_KEY = {
  // Palette index 253 = Magenta (255, 0, 255) -- primary transparency color
  // Used across ALL spritesheets (TERRAIN1, TERRAIN2, CITIES, UNITS)
  magenta: {
    paletteIndex: 253,        // 0xFD: used in block_004D0000 palette fill (e.g. line 1696); set via FUN_005c19ad
    r: 255, g: 0, b: 255,
    tolerance: 15,            // @ renderer.js line 104, 126
  },

  // Palette index 248 = Cyan (0, 255, 255) -- secondary transparency
  // Used in TERRAIN1 and TERRAIN2 for overlay sprites
  cyan: {
    paletteIndex: 248,        // 0xF8: passed to FUN_005c19ad at block_005C0000:7512-7513 (transparency setter)
    r: 0, g: 255, b: 255,
    tolerance: 15,            // @ renderer.js line 126
  },

  // Palette index 255 = Gray -- varies by spritesheet
  gray: {
    terrain: {
      paletteIndex: 255,
      r: 135, g: 135, b: 135,
      tolerance: 3,           // @ renderer.js line 126: tightened to +-3 to avoid stripping terrain pixels
      // Rationale: Plains/tundra/grassland have muted gray pixels close to (135,135,135).
      // A wider tolerance would incorrectly make terrain pixels transparent.
    },
    units: {
      paletteIndex: 255,
      r: 135, g: 83, b: 135,   // UNITS.GIF uses purplish-gray, NOT neutral gray
      tolerance: 15,            // @ renderer.js line 323
      // NOTE: This is different from TERRAIN GIFs. UNITS.GIF palette index 255
      // is (135,83,135) -- a purplish-gray that avoids confusion with armor/gray units.
    },
    cities: {
      paletteIndex: 255,
      r: 135, g: 135, b: 135,  // Same as terrain
      tolerance: 15,            // @ renderer.js line 225
    },
  },

  // Transparency handling in SMEDS32 engine:
  // @ block_005C0000 blit functions: transp=0xFF means "use default transparency"
  // @ FUN_005cf1d5 (blit_normal_no_transp): transp=0xFE disables transparency
  // The engine uses palette indices for transparency, not RGB values.
  smedsDefaultTranspIndex: 0xFF,    // @ FUN_005cef31: default transp param
  smedsNoTranspIndex: 0xFE,         // @ FUN_005cf1d5: disables transparency

  // Terrain sprite opacity validation threshold
  // @ renderer.js line 410-428: sprites with <50% opaque pixels are discarded
  // as chroma-key placeholders (empty variant slots in the spritesheet)
  terrainOpacityThreshold: 0.50,  // @ renderer.js extractAllSprites validation

  // Sentry/sleep dimming: all non-transparent pixels -> gray
  // @ FUN_005cf126 (blit_dimmed): palette_index 0x1a (26) in game palette = (135,135,135)
  // @ renderer.js _dimUnit(): replaces all visible pixels with rgb(135,135,135)
  dimColor: { r: 135, g: 135, b: 135, paletteIndex: 0x1A },  // @ FUN_005cf126
};


// ═══════════════════════════════════════════════════════════════════
// Unit Rendering Constants
// Binary ref: FUN_0056baff @ block_00560000.c (draw_unit_sprite_full)
// ═══════════════════════════════════════════════════════════════════

export const UNIT_RENDERING = {
  // Shield dimensions (before scaling)
  shieldWidth: 12,            // @ 0x0056BAFF: thunk_FUN_00472cf0(0xc, param_6)
  shieldHeight: 20,           // @ 0x0056BAFF: thunk_FUN_00472cf0(0x14, param_6)

  // Shield shadow/outline color
  shieldOutlineIndex: 0x10,   // @ 0x0056BAFF: FUN_005c0479(&local_b4, 0x106, 0x10)
  shieldBlackIndex: 10,       // @ 0x0056BAFF: thunk_FUN_0040fdb0(param_1, &local_a4, 10)

  // HP bar dimensions (before scaling)
  hpBarHeight: 2,             // @ 0x0056BAFF: thunk_FUN_00472cf0(2, param_6)
  hpBarMiddleHeight: 3,       // @ 0x0056BAFF: thunk_FUN_00472cf0(3, param_6)
  // Civ2-clone confirms: HPbarOffset=(0,2), HPbarSize=(12,3)

  // HP bar colors (palette indices)
  // @ 0x0056BAFF: damage thresholds and color selection
  hpColors: {
    green:  0x2A,             // @ 0x0056BAFF: if (damage < hp/3) local_7c = 0x2a
    yellow: 0x7A,             // @ 0x0056BAFF: elif (damage < hp*2/3) local_7c = 0x7a
    red:    0x6A,             // @ 0x0056BAFF: else local_7c = 0x6a
    // Civ2-clone RGB equivalents: red=(243,0,0), yellow=(255,223,79), green=(87,171,39)
    thresholds: {
      greenMax: '1/3',        // damage < maxHP / 3 -> green
      yellowMax: '2/3',       // damage < maxHP * 2 / 3 -> yellow
      // else -> red
    },
  },

  // Stacking indicator offset
  // @ 0x0056BAFF: thunk_FUN_00472cf0(4, param_6) * direction
  stackingOffset: 4,          // 4px offset for cargo/stacking shield

  // Direction determination for shield placement
  // @ 0x0056BAFF: if (shieldAnchorX < 0x20) direction = -1, else direction = 1
  shieldDirectionThreshold: 32,  // 0x20 -- shield on left if anchor < 32, right otherwise
  // Civ2-clone confirms: FlagLoc.X < UnitRectangle.Width/2 ? -4 : 4

  // Shield shadow offset
  // @ 0x0056BAFF: FUN_005cef31(local_108, param_1, local_1c + local_d0, local_74 + 1)
  shadowOffsetX: 1,           // direction * 1
  shadowOffsetY: 1,           // +1 pixel down
  // Civ2-clone confirms: ShadowOffset = new(FlagLoc.X < W/2 ? -1 : 1, 1)

  // Barbarian settler type substitution
  // @ 0x0056BAFF: if (type == 0x2e AND owner == 0) type = 0x3e
  barbarianSettlerType: 0x2E,     // 46 = Settlers
  barbarianReplacementType: 0x3E, // 62 = barbarian display type

  // Order character lookup table address
  // @ 0x0056BAFF: local_18 = *(char*)(local_d8 * 8 + 0x655494)
  orderCharTableBase: 0x00655494,   // @ 0x0056BAFF
  orderCharTableStride: 8,          // 8 bytes per entry

  // Veteran marker
  // @ 0x0056BAFF: if (unit.isVeteran) orderChar = '*'
  veteranChar: '*',
  noOrderChar: '-',

  // Font sizing for shield text
  // @ FUN_0056b90b: fontSize = scale_coord(0x20, scale) / 3
  // @ FUN_0056b90b: if (fontSize == 10) fontSize = 11 (avoid system font conflict)
  fontBaseSize: 32,           // 0x20
  fontDivisor: 3,
  fontAvoidSize: 10,          // system font conflict at size 10 -> use 11

  // Unit record layout (for accessing type, owner, orders, etc.)
  unitRecordBase: 0x006560F0,     // DAT_006560f0 (approximate -- unit array base)
  unitRecordStride: 0x20,         // 32 bytes per unit record
  // Key offsets within unit record:
  // +0x04 = type (short)          -- DAT_006560f4
  // +0x06 = type (byte alias)     -- DAT_006560f6
  // +0x07 = owner (byte)          -- DAT_006560f7
  // +0x0A = damage (byte)         -- DAT_006560fa
  // +0x0F = orders (byte)         -- DAT_006560ff
  // +0x16 = gotoX (short)         -- DAT_00656106
  // +0x18 = gotoY (short)         -- DAT_00656108
};


// ═══════════════════════════════════════════════════════════════════
// City Rendering Constants
// Binary ref: FUN_0056d289 @ block_00560000.c (draw_city_sprite)
// ═══════════════════════════════════════════════════════════════════

export const CITY_RENDERING = {
  // City sprite dimensions (before scaling)
  spriteWidth: 64,            // @ 0x0056D289: scale_coord(0x40, scale)
  spriteHeight: 48,           // @ 0x0056D289: scale_coord(0x30, scale)

  // Epoch determination tech checks
  // @ 0x0056D289: specific tech IDs used for epoch advancement
  epochTechs: {
    metallurgy: { epoch: 4 },     // if has_tech(METALLURGY) -> epoch 4
    railroadAndNavigation: { epoch: 5 },  // if has_tech(RAILROAD) AND has_tech(NAVIGATION) -> epoch 5
  },

  // City size thresholds for sub-style selection
  // @ 0x0056D289: if (size < 4) sizeClass=0, elif (<6) 1, elif (<8) 2, else 3
  sizeThresholds: [4, 6, 8],  // boundaries between size classes 0-3

  // Capital city bonus: +1 size class (capped at 3)
  // @ 0x0056D289: if (has_palace AND (owner==currentCiv OR difficulty<3))
  capitalBonus: 1,

  // Scale coordinate formula
  // @ FUN_0056e1c0: return ((baseSize + 8) * multiplier + 4) >> 3
  scaleFormula: '((baseSize + 8) * multiplier + 4) >> 3',
};


// ═══════════════════════════════════════════════════════════════════
// Sprite Label Array Globals
// Binary ref: Phase B1 Classifications -- CString static init groups
// These are the DAT_ addresses for named sprite label arrays
// ═══════════════════════════════════════════════════════════════════

export const SPRITE_LABEL_ARRAYS = {
  // All from block_00440000 CString static initializer analysis
  terrain_labels:     { addr: 0x00647C40, count: 11 },   // 0xb elements
  dither_blend:       { addr: 0x00640BD8, count: 52 },   // 0x34 elements
  coast_q1:           { addr: 0x0063F858, count: 16 },   // 0x10 elements
  coast_q2:           { addr: 0x006461D8, count: 16 },   // 0x10 elements
  coast_q3:           { addr: 0x00647388, count: 16 },   // 0x10 elements
  coast_q4:           { addr: 0x006447B0, count: 16 },   // 0x10 elements
  resource_sprites:   { addr: 0x00644E88, count: 2 },
  river_sprites:      { addr: 0x00643B38, count: 32 },   // 0x20 elements
  misc_sprites:       { addr: 0x0063FD18, count: 4 },
  overlay_sprites:    { addr: 0x00642710, count: 18 },    // 0x12 elements
  improvement_sprites:{ addr: 0x006446B8, count: 3 },
  city_flag_sprites:  { addr: 0x006482F8, count: 22 },    // 0x16 elements
  airbase_sprites:    { addr: 0x00647FA0, count: 2 },
  people_sprites:     { addr: 0x00644B70, count: 11 },    // 0xb elements
  editor_sprites:     { addr: 0x006477C8, count: 15 },    // 0xf elements
  unit_sprites_a:     { addr: 0x0063FE50, count: 48 },    // 0x30 (city sprites)
  unit_sprites_b:     { addr: 0x00641848, count: 63 },    // 0x3f (unit sprites)
  terrain_overlay:    { addr: 0x006442F8, count: 16 },    // 0x10
  misc_sprites_b:     { addr: 0x006465D8, count: 8 },
  road_sprites:       { addr: 0x00642D48, count: 44 },    // 0x2c (people citizen sprites)
  building_sprites:   { addr: 0x00646A20, count: 11 },    // 0xb
  wonder_sprites:     { addr: 0x00644F00, count: 6 },
  special_sprites_a:  { addr: 0x00648860, count: 3 },
  special_sprites_b:  { addr: 0x00645068, count: 3 },
  special_sprites_c:  { addr: 0x00648918, count: 3 },
  hp_bar_sprites:     { addr: 0x00648118, count: 4 },
  hp_bar_sprites_b:   { addr: 0x00648208, count: 4 },
  shield_sprites:     { addr: 0x0063F6F0, count: 6 },
  unit_labels:        { addr: 0x00645160, count: 67 },    // 0x43 (unit type labels)
};


// ═══════════════════════════════════════════════════════════════════
// SMEDS32 Sprite Engine Summary
// Binary ref: block_005C0000 (339 functions, VERIFIED GENERIC)
// ═══════════════════════════════════════════════════════════════════

export const SMEDS32_ENGINE = {
  // Source path embedded in binary
  sourcePath: 'D:\\Ss\\Smeds32\\Port.cpp',

  // Sprite struct layout (from block_005C0000 pseudocode)
  spriteStruct: {
    width:  0x20,             // @ FUN_005cf39b: this+0x20
    height: 0x24,             // @ FUN_005cf39b: this+0x24
    scaleX: 0x28,             // @ FUN_005cf3f3: this+0x28
    scaleY: 0x2C,             // @ FUN_005cf3f3: this+0x2C
    dataHandle: 0x34,         // @ FUN_005cf2ff: this+0x34
    lockedPtr: 0x38,          // @ FUN_005cf337: this+0x38
  },

  // Port/surface struct layout
  portStruct: {
    clipRect: 0x14,           // @ FUN_005c0034: this+0x14
    bounds:   0x24,           // @ FUN_005c0034: this+0x24..0x30
    surfaceHandle: 0x40,      // @ FUN_005c01c1
    bppShift: 0x44,           // @ FUN_005c01c1
  },

  // Blit modes (from Section 28 of pseudocode)
  blitModes: {
    normal: 'blit_normal',              // @ FUN_005cef31
    normalCustomTransp: 'blit_normal_custom_transp',  // @ FUN_005cef66
    dimmed: 'blit_dimmed',              // @ FUN_005cf126
    dimmedExplicit: 'blit_dimmed_explicit_transp',    // @ FUN_005cf0e9
    noTransp: 'blit_normal_no_transp',  // @ FUN_005cf1d5
  },

  // Palette management (from Section 14 of pseudocode)
  palette: {
    kdTreeTolerance: 0x20,    // @ FUN_005c7e06: tolerance=0x20 for nearest-color search
    fadeBufferOffset: 0x430,  // @ FUN_005c6e36: saved palette at +0x430
    crossfadeA: 0x428,        // @ FUN_005c72f8: first crossfade palette at +0x428
    crossfadeB: 0x42C,        // @ FUN_005c72f8: second at +0x42C
  },

  // Sprite color manipulation (from Section 31 of pseudocode)
  spriteOps: {
    // @ FUN_005cf467: replaces one palette index with another across all scanlines
    replaceColor: 'sprite_replace_color',
    // @ FUN_005cf541: remaps all pixels through a 256-entry lookup table
    remapPalette: 'sprite_remap_palette',
  },

  // Font families (from Section 15 of pseudocode)
  fontFamilies: {
    0: 'Times New Roman',
    1: 'Arial',
    2: 'System',
    3: 'Courier',
  },
};


// ═══════════════════════════════════════════════════════════════════
// Animation Constants
// Binary ref: FUN_0056c705 @ block_00560000.c (animate_unit_movement)
// ═══════════════════════════════════════════════════════════════════

export const ANIMATION = {
  // Base frame time
  // @ FUN_0056c705: baseFrameTime = 0x10 (16)
  baseFrameTime: 16,          // 16ms base

  // Animation speed settings
  // @ FUN_0056c705: animSpeed adjustments
  minAnimSpeed: 1,            // clamped: if animSpeed < 2 -> 1
  speed3Remap: 4,             // if animSpeed == 3 -> 4

  // Frame delay calculation
  // @ FUN_0056c705: frameDelay = (0x10 << 4) / frameCount
  frameDelayNumerator: 256,   // 0x10 << 4 = 256

  // Max viewports for animation
  maxViewports: 8,            // @ FUN_0056c705: for vp in 0..7

  // Animation-in-progress flag
  // @ FUN_0056c705: DAT_006ad908 = 1 during animation, 0 when done
  animFlagAddr: 0x006AD908,

  // Human unit animation: non-combat units animate at double speed
  // @ FUN_0056c705: if (is_non_combat(unitType) AND isHumanUnit) animSpeed *= 2
  humanNonCombatSpeedMultiplier: 2,
};


// ═══════════════════════════════════════════════════════════════════
// Trade Route Constants
// Binary ref: FUN_00440325, FUN_004403ec, FUN_00440453, FUN_00440750
//             @ block_00440000.c (trade route management)
// ═══════════════════════════════════════════════════════════════════

export const TRADE_ROUTES = {
  // === City Record Trade Route Layout ===
  // City record base: DAT_0064f340, stride 0x58 (88 bytes)
  cityRecordBase: 0x0064F340,
  cityRecordStride: 0x58,

  // Trade route fields within city record:
  // @ 0x0064f37a + city*0x58 = number of trade routes (byte, max 3)
  // @ 0x0064f381 + city*0x58 + slot = commodity type (byte per slot)
  // @ 0x0064f384 + city*0x58 + slot*2 = partner city ID (short per slot)
  maxRoutesPerCity: 3,          // @ FUN_00440453: if (numRoutes < '\x03')
  tradeRouteCountOffset: 0x3A,  // 0x0064f37a - 0x0064f340 = 0x3A
  commodityTypeOffset: 0x41,    // 0x0064f381 - 0x0064f340 = 0x41
  partnerCityOffset: 0x44,      // 0x0064f384 - 0x0064f340 = 0x44

  // City changed flag bit for trade routes
  // @ FUN_00440325: city_flags |= 0x20000
  cityChangedTradeFlag: 0x20000,  // @ 0x00440325 + 0x004403ec

  // === Worst-Route Replacement (FUN_00440453) ===
  // When a city already has 3 trade routes, the worst one is replaced.
  // @ FUN_00440453 line ~78: local_1c = 9999 (sentinel for worst-route search)
  worstRouteSentinel: 9999,       // @ 0x00440453: initial comparison value

  // @ FUN_00440453 line ~84: city field offset 0x1E = trade value
  //   local_8 = *(short*)(DAT_0064f35e + partner * 0x58) — partner city trade output
  tradeValueCityOffset: 0x1E,     // 0x0064f35e - 0x0064f340 = 0x1E within city record

  // @ FUN_00440453 lines ~91-94: Airport (0x20) distance floor
  //   if both cities have Airport AND distance < 2, set distance = 1
  airportDistanceFloor: {
    buildingId: 0x20,             // 32 = Airport
    minDistance: 2,               // if distance < 2...
    floorValue: 1,                // ...set distance = 1
    check: 'thunk_FUN_0043d20a(city1, 0x20) != 0 AND thunk_FUN_0043d20a(city2, 0x20) != 0 AND distance < 2',
  },

  // @ FUN_00440453 line ~96: distance-weighted revenue estimate
  //   local_8 = local_8 + (local_14 * local_8 >> 1)
  //   i.e. revenue += (distance * revenue) / 2
  distanceWeightedFormula: 'revenue + (distance * revenue >> 1)',

  // === Trade Revenue Formula (FUN_00440750) ===
  // revenue = ((city1_trade + city2_trade) * (distance + 10)) / 24
  distanceBonus: 10,            // @ FUN_00440750: (local_1c + 10)
  revenueDivisor: 24,           // @ FUN_00440750: / 0x18
  // Inter-continent bonus: revenue doubled if cities on different continents
  // @ FUN_00440750: if (continent1 != continent2) local_1c <<= 1
  // Intra-civ penalty: revenue halved if same civ owns both cities
  // @ FUN_00440750: if (unit_owner == city_owner) local_1c >>= 1
  // Demanded commodity bonus: double + supply bonus
  // @ FUN_00440750: loop over 3 demand slots

  // === Revenue Post-Processing (FUN_00440750 lines ~256-259) ===
  // After all multipliers/bonuses, revenue is capped and scaled:
  // @ line ~258: revenue = thunk_FUN_004c2788(civ, rand()%10 + 200, 30000)
  //   Meaning: revenue = min(rand()%10 + 200, 30000) [capped at 30000]
  revenuePostProcessing: {
    randomBase: 200,              // @ FUN_00440750: iVar6 % 10 + 200
    randomRange: 10,              // @ FUN_00440750: rand() % 10
    revenueCap: 30000,            // @ FUN_00440750: uVar13 = 30000 (max revenue)
  },
  // @ line ~259: final revenue = (revenue * 2) / 3
  revenueFinalScaling: {
    numerator: 2,                 // @ FUN_00440750: (iVar6 * 2)
    denominator: 3,               // @ FUN_00440750: / 3
    formula: '(revenue * 2) / 3',
  },

  // === Commodity Supply/Demand Revenue Multipliers ===
  // @ FUN_00440750 switch on commodity type (uVar8):
  commodityRevenueMultipliers: {
    // Half revenue: commodities 3, 5, 8, 10
    half: [3, 5, 8, 10],       // local_30 = local_1c / 2
    // Full revenue: commodities 9, 11, 12, 13
    full: [9, 11, 12, 13],     // local_30 = local_1c
    // 1.5x revenue: commodity 14
    oneAndHalf: [14],           // local_30 = (local_1c * 3) / 2
    // 2x revenue: commodity 15
    double: [15],               // local_30 = local_1c * 2
  },

  // === Trade Modifier Flags ===
  // Global game flags at DAT_00655af0
  // @ FUN_00440750: if (flags & 4) distance = distance * 4 / 5
  tradeDistanceReduction4: 4,   // flag bit: 80% distance (trade bonus)
  // @ FUN_00440750: if (flags & 8) distance = distance * 5 / 4
  tradeDistanceIncrease8: 8,    // flag bit: 125% distance (trade penalty)

  // === Tech Checks for Trade ===
  // @ FUN_00440750: if (turn < 200 AND !has_tech(0x26) AND !has_tech(0x39))
  //                 revenue doubled (early game bonus)
  earlyGameTurnThreshold: 200,  // @ FUN_00440750: DAT_00655af8 < 200
  earlyGameTech1: 0x26,         // 38 = Corporation
  earlyGameTech2: 0x39,         // 57 = Economics

  // @ FUN_00440750: if (has_tech(0x43)) revenue -= revenue/3
  tradeReductionTech1: 0x43,    // 67 = Superhighways? (reduces trade revenue 33%)
  // @ FUN_00440750: if (has_tech(0x1e)) revenue -= revenue/3
  tradeReductionTech2: 0x1e,    // 30 = Trade (reduces trade revenue 33%)

  // === Building Checks for Trade ===
  // @ FUN_00440453: thunk_FUN_0043d20a(city, 0x20) -- checks building 32 (Airport)
  airportBuildingId: 0x20,      // 32 = Airport -- halves distance for trade routes
  // @ FUN_00440750: thunk_FUN_0043d20a(city, 0x19) -- checks building 25 (Superhighways)
  superhighwaysBuildingId: 0x19, // 25 = Superhighways -- adds to trade route distance bonus

  // === Sound IDs for Trade ===
  // @ FUN_00440750: thunk_FUN_0046e020((-!bVar12 & 0x14U) + 0x16, 1, 0, 0)
  // bVar12 = is demanded commodity (supply vs demand delivery)
  tradeSoundDemand: 0x16,       // 22 -- sound for demanded commodity delivery
  tradeSoundSupply: 0x2A,       // 42 -- sound for supply commodity delivery (0x14 + 0x16)

  // === String References for Trade Popups ===
  // @ FUN_00440750: different strings for food vs regular caravans
  strings: {
    caravan:     's_CARAVAN_006262d4',      // @ FUN_00440750: regular caravan delivery
    caravanSelf: 's_CARAVAN_006262dc',      // @ FUN_00440750: caravan to own city
    caravanOther:'s_CARAVAN_006262e4',      // @ FUN_00440750: caravan to other civ city
    foodCaravan:     's_FOODCARAVAN_006262ec', // @ FUN_00440750: food caravan
    foodCaravanSelf: 's_FOODCARAVAN_006262f8', // @ FUN_00440750: food caravan to own city
    foodCaravanOther:'s_FOODCARAVAN_00626304', // @ FUN_00440750: food caravan from other civ
    caravanReturn:   's_CARAVANOTHER_00626310', // @ FUN_00440750: return route notification
    caravanReturnAlt:'s_CARAVANOTHER_00626320', // @ FUN_00440750: alt return notification
  },

  // === Commodity Replacement Scoring (FUN_00440750 lines ~346-369) ===
  // After delivering a commodity, the receiving city picks a replacement commodity.
  // Each of the 3 supply slots is scored and the highest-scoring one replaces.
  // @ lines ~344-346: base score = rand() & 7 (0-7 random)
  // @ line ~354: +10 if supply value >= 0 (non-negative supply)
  // @ line ~360: +10 if commodity matches a demand slot of the source city
  // @ line ~364: highest-scoring slot wins (ties: last one wins)
  commodityReplacement: {
    baseScoreRandom: 7,           // @ FUN_00440750: (rand() ^ ...) & 7  (mask = 0x7)
    nonNegativeSupplyBonus: 10,   // @ FUN_00440750: if supply >= 0: local_8 += 10
    demandMatchBonus: 10,         // @ FUN_00440750: if commodity matches demand: local_8 += 10
    slotsScanned: 3,              // @ FUN_00440750: for local_18 = 0..2
    demandSlotsChecked: 3,        // @ FUN_00440750: for local_24 = 0..2 (demand slots of source)
  },

  // === Diplomacy Effect of Trade ===
  // @ FUN_00440750: thunk_FUN_00456f20(civ1, civ2, -10)
  tradeAttiudeBonus: -10,       // 0xFFFFFFF6 = -10 -- improves attitude by 10
  // (negative = friendlier in Civ2's attitude system)

  // === Food Caravan Bonus ===
  // @ FUN_00440750: if commodity < 0 (food delivery):
  //   city food += ((city_size + 1) * DAT_006a6560) / 2
  // DAT_006a6560 = food_per_citizen from rules
  foodCaravanFormula: '((city_size + 1) * food_per_citizen) / 2',

  // === Civ Record Trade Income ===
  // @ FUN_00440750: DAT_0064c6a2 + civ*0x594 += revenue (treasury)
  //                 DAT_0064c6a8 + civ*0x594 += revenue (trade income this turn)
  civTreasuryOffset: 0x02,      // offset 0x0064c6a2 - 0x0064c6a0 within civ record
  civTradeIncomeOffset: 0x08,   // offset 0x0064c6a8 - 0x0064c6a0 within civ record

  // === AI Message IDs for Trade ===
  // @ FUN_00440750: thunk_FUN_00511880(0xf, ...) -- non-food caravan
  //                 thunk_FUN_00511880(0x10, ...) -- food caravan
  //                 thunk_FUN_00511880(0x11, ...) -- return route notification
  aiMsgCaravan: 0x0F,           // 15
  aiMsgFoodCaravan: 0x10,       // 16
  aiMsgCaravanReturn: 0x11,     // 17

  // Sprite resource table offsets (DAT_00628420 + offset)
  // @ FUN_00440750 (execute_trade_route) and FUN_0058fedb (handle_caravan_arrival)
  spriteOffsets: {
    unknownCommodity: 0x100,        // fallback commodity icon when commodity type < 0 (food delivery)  // 0x00440750, 0x0058FEDB
    establishRoute:   0x284,        // "Establish Trade Route" popup menu option sprite                 // 0x0058FEDB
    keepMoving:       0x288,        // "Keep Moving" popup menu option sprite (shown when not home city)// 0x0058FEDB
    helpBuildWonder:  0x28c,        // "Help Build Wonder" popup menu option sprite (city builds wonder)// 0x0058FEDB
  },
};


// ═══════════════════════════════════════════════════════════════════
// City Epoch Tech Classifier (used by city sprite / advisor view)
// Binary ref: FUN_00448f92 @ block_00440000.c lines 5955-5977
// Cross-ref: FUN_0056d289 @ block_00560000.c (draw_city_sprite)
// ═══════════════════════════════════════════════════════════════════

export const CITY_EPOCH_TECH_CHECKS = {
  // FUN_00448f92 is a tech epoch classifier returning 0-3.
  // It determines which visual epoch a civ has reached based on techs.
  //
  // @ FUN_00448f92: thunk_FUN_004bd9f0 = hasTech(civ, techId)
  //   if hasTech(0x18) AND hasTech(0x05) → return 3  (Modern)
  //   if hasTech(0x25)                   → return 2  (Industrial)
  //   if hasTech(0x26) AND hasTech(0x3c) → return 1  (Renaissance)
  //   else                               → return 0  (Ancient)
  sourceAddr: '0x00448F92',
  sizeBytes: 158,

  epoch3: {
    value: 3,
    name: 'Modern',
    requiredTechs: [0x18, 0x05],     // Electronics (24) AND Automobile (5)
    logic: 'hasTech(0x18) AND hasTech(0x05)',
  },
  epoch2: {
    value: 2,
    name: 'Industrial',
    requiredTechs: [0x25],           // Industrialization (37)
    logic: 'hasTech(0x25)',
  },
  epoch1: {
    value: 1,
    name: 'Renaissance',
    requiredTechs: [0x26, 0x3C],     // Invention (38) AND Philosophy (60)
    logic: 'hasTech(0x26) AND hasTech(0x3c)',
  },
  epoch0: {
    value: 0,
    name: 'Ancient',
    requiredTechs: [],               // default / fallback
    logic: 'else',
  },
};

// ═══════════════════════════════════════════════════════════════════
// Aqueduct / Sewer Auto-Queue Check
// Binary ref: FUN_00441a79 @ block_00440000.c lines 560-574
// (Previously misattributed to FUN_00448f92)
// ═══════════════════════════════════════════════════════════════════

export const CITY_GROWTH_BUILDING_CHECK = {
  // FUN_00441a79 determines which growth-cap building to auto-queue.
  // Returns building ID if city is large enough and doesn't have it.
  sourceAddr: '0x00441A79',
  sizeBytes: 152,

  // @ FUN_00441a79: if (city_size >= DAT_0064bcd1 AND !has_building(9))
  //   return 9 -- Aqueduct
  aqueduct: {
    buildingId: 9,
    sizeThresholdAddr: 0x0064BCD1,  // rules-defined size threshold
    check: '(char)(DAT_0064f349[city*0x58]) >= DAT_0064bcd1 AND thunk_FUN_0043d20a(city, 9) == 0',
  },

  // @ FUN_00441a79: if (city_size >= DAT_0064bcd2 AND !has_building(0x17))
  //   return 0x17 -- Sewer System (23)
  sewerSystem: {
    buildingId: 0x17,               // 23
    sizeThresholdAddr: 0x0064BCD2,  // rules-defined size threshold
    check: '(char)(DAT_0064f349[city*0x58]) >= DAT_0064bcd2 AND thunk_FUN_0043d20a(city, 0x17) == 0',
  },

  // Returns 0 if neither applies
  defaultReturn: 0,
};


// ═══════════════════════════════════════════════════════════════════
// Delete City Constants
// Binary ref: delete_city @ 0x004413D1, block_00440000.c
// ═══════════════════════════════════════════════════════════════════

export const DELETE_CITY = {
  // @ delete_city: city radius scan uses 0x2d (45) tiles
  cityRadiusTiles: 0x2D,        // 45 tiles in city radius (inner 21 + outer 24)
  innerRadiusTiles: 0x15,       // 21 inner tiles (standard BFC)

  // @ delete_city: city tile offsets at DAT_00628370 (x) and DAT_006283a0 (y)
  tileOffsetsX: 0x00628370,
  tileOffsetsY: 0x006283A0,

  // @ delete_city: adjacent tile offsets at DAT_00628350 (x) and DAT_00628360 (y), 8 directions
  adjacentOffsetsX: 0x00628350,
  adjacentOffsetsY: 0x00628360,
  adjacentCount: 8,

  // @ delete_city: number of wonders = 0x1c (28)
  wonderCount: 0x1C,            // 28 wonders checked at DAT_00655be6

  // @ delete_city line ~460-463: destroyed wonder city IDs set to 0xFFFE (-2)
  //   for (i = 0; i < 0x1c; i++) {
  //     if (*(short*)(DAT_00655be6 + i*2) == cityId) { *(DAT_00655be6 + i*2) = 0xFFFE; }
  //   }
  destroyedWonderSentinel: 0xFFFE,  // -2 as unsigned short: marks wonder's city as destroyed

  // @ delete_city line ~517: unit order 0x09 (Sentry) check for trade units
  //   if (unit.type == '\t') { unit.owner = 0xff; } — sentry trade units get orphaned
  sentryOrderId: 0x09,            // 9 = Sentry order; trade units with this are orphaned on city delete

  // @ delete_city line ~524: unit type domain 0x01 (sea) stride 0x14
  //   if (DAT_0064b1ca[unit_type * 0x14] != '\x01') — checks if unit is NOT sea domain
  //   Sea domain units are handled differently (attempted reassignment via thunk_FUN_005b53b6)
  seaDomainId: 0x01,              // domain 1 = sea
  unitTypeStride: 0x14,           // 20 bytes per unit type in rules table

  // @ delete_city line ~529: city.flags |= 0x20 on receiving city during unit reassignment
  //   *(uint*)(DAT_0064f344 + receivingCity * 0x58) |= 0x20
  cityReassignmentFlag: 0x20,     // bit set on city receiving reassigned units from deleted city

  // @ delete_city: network message IDs
  netMsgDeleteCity: 0x89,       // @ 0x004413D1: thunk_FUN_0046b14d(0x89, ...)
  netMsgCityDeleted: 0x8A,      // @ 0x004413D1: thunk_FUN_0046b14d(0x8a, ...)
  netMsgDeleteCityRequest: 0x39, // @ 0x004413D1: thunk_FUN_0046b14d(0x39, ...)

  // @ delete_city: server connection timeout = 3600 ticks (0xe10)
  serverTimeout: 0x0E10,        // 3600 ticks

  sourceAddr: '0x004413D1',
};


// ═══════════════════════════════════════════════════════════════════
// Wonder Production Change Constants
// Binary ref: FUN_00441b11 @ block_00440000.c (change_city_production)
// ═══════════════════════════════════════════════════════════════════

export const WONDER_PRODUCTION = {
  // Production item encoding: wonder IDs start at 0x27 (39) offset
  wonderIdOffset: 0x27,         // 39 -- production item = wonderIndex + 0x27
  maxProductionItem: 0x62,      // 98 -- max valid production item (> 0x62 triggers auto-select)
  maxWonderIndex: 0x3E,         // 62 -- wonder production items < 0x3E

  // @ FUN_00441b11 line ~653: shields halved when switching from non-wonder to wonder
  //   if (oldProduction > -0x27) { city.shields /= 2; }
  //   i.e. switching from a regular item to a wonder cuts accumulated shields in half
  shieldPenaltyOnWonderSwitch: {
    divisor: 2,                   // @ FUN_00441b11: shields / 2
    condition: 'oldProductionItem > -0x27 (was not already building a wonder)',
  },

  // @ FUN_00441b11 line ~627: DAT_0062c5b8 guard flag
  //   if ((humanCivBitmask & civ) != 0 AND DAT_0062c5b8 == 0) { show production dialog }
  //   DAT_0062c5b8 suppresses the production-change UI dialog when non-zero
  productionDialogGuardAddr: 'DAT_0062C5B8',  // @ FUN_00441b11: checked before showing UI

  // @ FUN_00441b11 line ~714: wonder era completion counter
  //   era = (wonderIndex - 0x27) / 7
  //   DAT_0064c6b7 + civ*0x594 + era = per-civ per-era wonder completion byte
  wonderEra: {
    formula: '(wonderIndex - 0x27) / 7',       // @ FUN_00441b11: local_18 = (local_328 - 0x27) / 7
    wonderIdOffset: 0x27,                       // 39 — subtracted before dividing by 7
    erasPerSet: 7,                              // 7 wonders per era
    completionCounterBase: 'DAT_0064C6B7',     // @ FUN_00441b11: per-civ per-era byte
    completionCounterCivStride: 0x594,          // civ record stride
    note: 'When all active civs have completed an era, a special era-completion check triggers',
  },

  // Wonder completed tracking per civ
  // @ FUN_00441b11: DAT_0063f580 + civ*0x1c + wonderSlot
  wonderCompletedBase: 0x0063F580,
  wonderCompletedStride: 0x1C,  // 28 bytes per civ
  wonderStartedBit: 1,          // bit 0 = wonder started
  wonderAbandonedBit: 2,        // bit 1 = wonder abandoned

  // Wonder city tracking: DAT_00655b98 + wonderIndex*2 = city building it
  wonderCityBase: 0x00655B98,

  // Wonder cost multiplier when all civs have started
  // @ FUN_00441b11: cost = (DAT_00655b08 + wonder_slots_used * -2)
  //                 if (cost < 1) cost = 0
  //                 result = cost * wonder_base_cost + shields_remaining
  // DAT_00655b08 = difficulty level

  // Civ2 wonder sprite base for production display
  // @ FUN_00441b11: DAT_00645160 + wonderIndex * 0x3c
  wonderSpriteBase: 0x00645160,
  wonderSpriteStride: 0x3C,

  // Wonder name lookup: DAT_0064c488 + wonderIndex * 8
  wonderNameBase: 0x0064C488,
  wonderNameStride: 8,

  // String references
  strings: {
    startWonder:   's_STARTWONDER_00626374',
    switchWonder:  's_SWITCHWONDER_00626380',
    abandonWonder: 's_ABANDONWONDER_00626390',
  },

  // AI message IDs for wonder events
  aiMsgStartWonder: 0x12,       // 18
  aiMsgSwitchWonder: 0x13,      // 19
  aiMsgAbandonWonder: 0x14,     // 20

  sourceAddr: '0x00441B11',
};


// ═══════════════════════════════════════════════════════════════════
// Game Startup / Network Constants
// Binary ref: FUN_00444310 @ block_00440000.c (network_startup)
// ═══════════════════════════════════════════════════════════════════

export const GAME_STARTUP = {
  // Game mode encoding at DAT_00655b02
  // @ FUN_00444310: sets DAT_00655b02 based on network type
  gameModes: {
    hotseat: 4,                 // @ FUN_00444310: param_1==0 -> DAT_00655b02 = 4
    lan: 3,                     // @ FUN_00444310: param_1==1 -> DAT_00655b02 = 3
    internet: 5,                // @ FUN_00444310: param_1==2 -> DAT_00655b02 = 5
    directConnect: 6,           // @ FUN_00444310: param_1==3 -> DAT_00655b02 = 6
    scenario: 4,                // @ FUN_00444310: param_1==4 -> DAT_00655b02 = 4
  },

  // Menu/dialog string IDs
  // @ FUN_00444310: thunk_FUN_0040bc10(id) for menu setup
  menuIds: {
    singlePlayer: 0x28F,       // 655
    lanGame: 0x290,             // 656
    scenario: 0x362,            // 866
    lanTcp: 0x291,              // 657
    lanIpx: 0x292,              // 658
    internetGame: 0x349,        // 841
  },

  // Sound IDs
  // @ FUN_00444310: thunk_FUN_0046e020(0x6a, 0, 0, 0)
  soundMenuMusic: 0x6A,         // 106 -- menu background music
  // @ FUN_00445712: thunk_FUN_0046e020(0x6b, 0, 1, 0)
  soundLoadGame: 0x6B,          // 107 -- loading game sound

  // DLL resource for scenario select
  // @ FUN_00444310: FUN_005bf5e1(0x5a, 10, 0xc0, ...) -- scenario select screen
  scenarioSelectDll: 0x5A,      // 90

  // Network defaults
  // @ FUN_00444310: DAT_00655af8 = 0 (turn counter)
  //                 DAT_00655afc = 0xffff (max cities)
  //                 DAT_00655af0 = 0 (game flags)
  initialTurn: 0,
  initialMaxCities: 0xFFFF,     // 65535
  initialGameFlags: 0,

  sourceAddr: '0x00444310',
};


// ═══════════════════════════════════════════════════════════════════
// Advisor DLL Sprite Positions
// Binary ref: FUN_00449a0e @ block_00440000.c (load_icon_sprites)
// ═══════════════════════════════════════════════════════════════════

export const ADVISOR_SPRITES = {
  // DLL resource 0x56 (86) -- advisor portraits
  resourceId: 0x56,

  // 7 small advisor heads (34x34 each)
  // @ 0x00449A0E: FUN_004499d3(DAT_00646878, 2, 0x44, 0x22, 0x22)
  advisorHeads: {
    startX: 2,
    startY: 68,                 // 0x44
    width: 34,                  // 0x22
    height: 34,                 // 0x22
    spacing: 66,                // 0x42 between each
    count: 7,
    spriteBase: 0x00646878,
    spriteStride: 0x3C,
    // Addresses: DAT_00646878, DAT_006468b4 (copy), DAT_0064692c, DAT_00646968,
    //            DAT_006468f0, DAT_006469e0, DAT_006469a4
  },

  // 5 large advisor portraits (64x64 each) at y=200 (0xc8)
  // @ 0x00449A0E: FUN_004499d3(DAT_00647748, 2, 200, 0x40, 0x40)
  advisorPortraits: {
    startX: 2,
    startY: 200,                // 0xc8
    width: 64,                  // 0x40
    height: 64,                 // 0x40
    spacing: 66,                // 0x42 between each
    count: 5,
    // Addresses: DAT_00647748, DAT_006409d8, DAT_00644e48, DAT_0063fc98, DAT_00648018
  },

  // Two special 64x64 sprites
  // @ 0x00449A0E: FUN_004499d3(DAT_0063fc58, 0x18e, 0x86, 0x40, 0x40)
  specialPortrait1: { x: 398, y: 134, w: 64, h: 64, addr: 0x0063FC58 }, // 0x18e=398, 0x86=134
  // @ 0x00449A0E: FUN_004499d3(DAT_00643af8, 0x86, 0x18e, 0x40, 0x40)
  specialPortrait2: { x: 134, y: 398, w: 64, h: 64, addr: 0x00643AF8 }, // reversed coords

  // 8 civ-colored 64x64 sprites at (2, 0x18e)
  // @ 0x00449A0E: for (local_46c = 0; local_46c < 8; ...)
  //   FUN_004499d3(DAT_00643798 + i*0x3c, 2, 0x18e, 0x40, 0x40)
  //   FUN_005cf467(8, DAT_00655358 + i*0x10)  -- recolor with civ light color
  civColoredSprites: {
    x: 2,
    y: 398,                     // 0x18e
    width: 64,
    height: 64,
    count: 8,
    spriteBase: 0x00643798,
    spriteStride: 0x3C,
    // Recolored using civ light color from DAT_00655358 + civIdx * 0x10
  },

  sourceAddr: '0x00449A0E',
};


// ═══════════════════════════════════════════════════════════════════
// ICONS.GIF — Additional Sprites (Research/GW Progress, Adv Categories)
// Binary ref: FUN_00449a0e @ block_00440000.c
// ═══════════════════════════════════════════════════════════════════

export const ICONS_GIF_EXTRA = {
  // Research progress sprites: 3 sets x 2 rows = 6 indicators
  // @ 0x00449A0E: FUN_0044aba9(DAT_00644f00 + set*0x78, x, y, 14)
  // 14x14 square sprites (FUN_0044aba9 calls FUN_004499d3 with w=h=param_4)
  researchProgress: {
    startX: 1,
    startY: 290,                // 0x122
    width: 14,                  // 0xe
    height: 14,
    colStep: 15,                // 0xf
    sets: 3,
    rowsPerSet: 2,
    rowStep: 15,                // 0xf
    spriteBase: 0x00644F00,
    spriteStride: 0x78,         // per set
  },

  // Global warming progress: 3 sprites at y=320 (0x140)
  // @ 0x00449A0E: FUN_0044aba9(DAT_00648860 + i*0x3c, x, 0x140, 14)
  globalWarmingProgress: {
    startX: 1,
    startY: 320,                // 0x140
    width: 14,
    height: 14,
    colStep: 15,
    count: 3,
    spriteBase: 0x00648860,
  },

  // Science advisor minibar sprites: 3 at (49, 334), 10x10
  // @ 0x00449A0E: FUN_0044aba9(DAT_00645068 + i*0x3c, 0x31, 0x14e, 10)
  scienceBar: {
    startX: 49,                 // 0x31
    startY: 334,                // 0x14e
    width: 10,
    height: 10,
    colStep: 11,                // 0xb
    count: 3,
    spriteBase: 0x00645068,
  },

  // Second science bar row: 3 at (49, 345), 10x10
  // @ 0x00449A0E: FUN_0044aba9(DAT_00648918 + i*0x3c, 0x31, 0x159, 10)
  scienceBar2: {
    startX: 49,
    startY: 345,                // 0x159
    width: 10,
    height: 10,
    colStep: 11,
    count: 3,
    spriteBase: 0x00648918,
  },

  // Special single sprites: (82, 334) and (82, 345) -- 10x10 each
  // @ 0x00449A0E: FUN_0044aba9(DAT_00646598, 0x52, 0x14e, 10)
  //               FUN_0044aba9(DAT_00648058, 0x52, 0x159, 10)
  specialIndicator1: { x: 82, y: 334, w: 10, h: 10, addr: 0x00646598 },
  specialIndicator2: { x: 82, y: 345, w: 10, h: 10, addr: 0x00648058 },

  // HP bar progress sprites: 4 sets at (49, 290), 14x14 each
  // @ 0x00449A0E: FUN_0044aba9(DAT_00648118 + i*0x3c, x, 0x122, 14)
  //               FUN_0044aba9(DAT_00648208 + i*0x3c, x, 0x131, 14)
  hpBarSprites: {
    row1Y: 290,                 // 0x122
    row2Y: 305,                 // 0x131
    startX: 49,                 // 0x31
    width: 14,
    height: 14,
    colStep: 15,
    count: 4,
    row1Base: 0x00648118,
    row2Base: 0x00648208,
  },

  // Advance categories (4 rows x 5 cols = 20 sprites)
  // @ 0x00449A0E: for 4 rows, 5 cols: FUN_004499d3(DAT_00646cb8, 0x157, y, 0x24, 0x14)
  advanceCategories: {
    startX: 343,                // 0x157
    startY: 211,                // 0xd3
    width: 36,                  // 0x24
    height: 20,                 // 0x14
    colStep: 37,                // 0x25
    rowStep: 21,                // 0x15
    cols: 5,
    rows: 4,
    count: 20,
    spriteBase: 0x00646CB8,
    spriteStride: 0x3C,         // per category
    rowStride: 0xF0,            // per row (5 * 0x3C = 0xF0)
  },

  // Extra 64x48 and 64x32 from ICONS.GIF right edge
  // @ 0x00449A0E: FUN_005cedad(DAT_0063fe08, 7, 0x23f, 1, 0x40, 0x30)
  extraSprite64x48: { x: 575, y: 1, w: 64, h: 48 },   // 0x23f=575
  // @ 0x00449A0E: FUN_005cedad(DAT_0063fe08, 7, 0x23f, 0x32, 0x40, 0x20)
  extraSprite64x32: { x: 575, y: 50, w: 64, h: 32 },   // 0x32=50

  // Map viewport resource sprite (32x32) at (0x12a, 0xbe) = (298, 190)
  // @ 0x00449A0E: thunk_FUN_005a9afe(DAT_0063fe08, DAT_00640990, 0x12a, 0xbe, 0, 0, 0x20, 0x20)
  mapViewportIcon: { x: 298, y: 190, w: 32, h: 32, addr: 0x00640990 },

  // Resource overlay at (199, 0x142) = (199, 322) 64x32
  // @ 0x00449A0E: thunk_FUN_005a9afe(DAT_0063fe08, DAT_00647f18, 199, 0x142, 0, 0, 0x40, 0x20)
  resourceOverlayExtra: { x: 199, y: 322, w: 64, h: 32, addr: 0x00647F18 },

  sourceAddr: '0x00449A0E',
};


// ═══════════════════════════════════════════════════════════════════
// City Advisor Sprite Selection (3D city view base sprite)
// Binary ref: FUN_00454f83 @ block_00450000.c lines 2706-2747
// ═══════════════════════════════════════════════════════════════════

export const CITY_ADVISOR_SPRITE = {
  // FUN_00454f83 selects the base city sprite for the city advisor view.
  // Checks whether city tile is coastal (map flag & 0x80), then picks sprite.
  sourceAddr: '0x00454F83',
  sizeBytes: 414,

  // City tile flags field: DAT_0064f344[city * 0x58] & 0x80 — coastal detection
  coastalFlag: 0x80,              // @ FUN_00454f83: if ((flags & 0x80) == 0) → not coastal

  // Ocean/coastal city (map flag & 0x80 set on any adjacent tile)
  // @ lines 2728-2732: sprite=0x39, type=1, w=0x18, h=0x1b
  oceanCity: {
    spriteId: 0x39,               // 57
    typeId: 1,
    width: 0x18,                  // 24
    height: 0x1B,                 // 27
    note: 'Used when any of 8 adjacent tiles has ocean (pbVar6 & 0x80)',
  },

  // Land city (no adjacent ocean, normal terrain)
  // @ lines 2735-2738: sprite=0x3c, type=2, w=0x18, h=0x1f
  landCity: {
    spriteId: 0x3C,               // 60
    typeId: 2,
    width: 0x18,                  // 24
    height: 0x1F,                 // 31
    note: 'Default land city when not coastal and city tile flag & 0x80 == 0',
  },

  // Flat city (city tile itself has flag & 0x80 set — on coast/river)
  // @ lines 2741-2744: sprite=0x3c, type=0, w=0x18, h=0x1b
  flatCity: {
    spriteId: 0x3C,               // 60
    typeId: 0,
    width: 0x18,                  // 24
    height: 0x1B,                 // 27
    note: 'Used when city tile flag & 0x80 is set (coastal tile)',
  },

  // The 9 adjacent tiles are checked via DAT_00628350 (dx) and DAT_00628360 (dy)
  adjacentOffsetsX: 0x00628350,
  adjacentOffsetsY: 0x00628360,
  adjacentCount: 9,               // @ FUN_00454f83: for (local_8 = 0; local_8 < 9; ...)
};


// ═══════════════════════════════════════════════════════════════════
// Advisor Building Sprite Remapping
// Binary ref: FUN_00455314 @ block_00450000.c lines 2810-2910
// ═══════════════════════════════════════════════════════════════════

export const ADVISOR_BUILDING_REMAP = {
  // FUN_00455314 remaps certain building IDs to special sprite IDs for
  // the city advisor 3D building view. The mapping depends on the city
  // type (0=flat, 1=ocean, 2=land from FUN_00454f83).
  sourceAddr: '0x00455314',
  sizeBytes: 1694,

  // City population → building slot count: city_size + 2
  // @ line 2818: in_ECX + 0x19f4 = city_size + 2
  buildingSlotFormula: 'city_size + 2',

  // Type 0 (flat) and type 1 (ocean) share the same remapping:
  // @ lines 2826-2850 (iVar1 == 0, type 0/flat):
  //   building 8  → sprite 0x35 (53), flagged as special (0x1c8c = 1)
  //   building 0x1c (28) → sprite 0x23 (35)
  //   building 0x1e (30) → sprite 0x36 (54), flagged as special
  //   building 0x1f (31) → sprite 0x39 (57), flagged as special
  //   building 0x22 (34) → sprite 0x37 (55), flagged as special
  type0Remap: {
    0x08: { sprite: 0x35, special: true },   // 8 → 53
    0x1C: { sprite: 0x23, special: false },  // 28 → 35
    0x1E: { sprite: 0x36, special: true },   // 30 → 54
    0x1F: { sprite: 0x39, special: true },   // 31 → 57
    0x22: { sprite: 0x37, special: true },   // 34 → 55
  },

  // Type 1 (ocean) uses same mapping as type 0
  // @ lines 2886-2899 (iVar1 == 1):
  //   building 8  → sprite 0x35 (same as type 0)
  //   buildings 0x1c, 0x1e, 0x1f, 0x22 → skipped (goto LAB_0045539c)
  type1Remap: {
    0x08: { sprite: 0x35, special: true },   // 8 → 53
    0x1C: 'skip',                             // not rendered in ocean view
    0x1E: 'skip',
    0x1F: 'skip',
    0x22: 'skip',
  },

  // Type 2 (land) has a different mapping for building 8:
  // @ lines 2868-2882 (iVar1 == 2):
  //   building 8  → sprite 0x34 (52), flagged as special
  //   buildings 0x1c, 0x1e, 0x1f, 0x22 → skipped (goto LAB_0045539c)
  type2Remap: {
    0x08: { sprite: 0x34, special: true },   // 8 → 52 (different from type 0/1!)
    0x1C: 'skip',
    0x1E: 'skip',
    0x1F: 'skip',
    0x22: 'skip',
  },

  // All other buildings use thunk_FUN_00455c5d() for sprite lookup (default mapping)
  defaultSpriteFn: 'thunk_FUN_00455c5d',

  // Advisor art DLL resource calculation:
  // @ FUN_00455183 line ~2792: resource = type * 5 + epochStyle + 0x154 (340)
  //   epochStyle from thunk_FUN_00568861 (0-2), or 3 if city has Superhighways (0x19)
  advisorArtResource: {
    base: 0x154,                  // 340 = resource ID offset
    formula: 'type * 5 + epochStyle + 0x154',
    paletteHeight: 0xEC,          // 236 = height param to FUN_005bf5e1
  },
};


// ═══════════════════════════════════════════════════════════════════
// Sprite Loading Order
// Binary ref: FUN_0044b49e @ block_00440000.c (load_all_sprites)
// ═══════════════════════════════════════════════════════════════════

export const SPRITE_LOAD_ORDER = {
  // FUN_0044b49e calls these in order:
  // 1. thunk_FUN_0044c5a0() -- init sprite engine
  // 2. thunk_FUN_0044ae4c() -- load CITIES.GIF
  // 3. thunk_FUN_00449a0e() -- load ICONS.GIF + PEOPLE.GIF + EDITORPT.GIF + DLL resources
  // 4. thunk_FUN_00449030() -- load TERRAIN1.GIF + TERRAIN2.GIF
  // 5. thunk_FUN_0044b30e() -- load UNITS.GIF
  order: ['CITIES', 'ICONS+PEOPLE+EDITOR+DLL', 'TERRAIN1+TERRAIN2', 'UNITS'],
  sourceAddr: '0x0044B49E',
};


// ═══════════════════════════════════════════════════════════════════
// Sprite Editor Coordinate Table
// Binary ref: FUN_005746a1 @ block_00570000.c (1362 bytes)
// Computes (x, y, w, h) for editor sprite slots by category
// DAT_006ac924 selects the category (0..11)
// ═══════════════════════════════════════════════════════════════════

export const SPRITE_EDITOR_COORDS = {
  // Each case returns: count, x, y, w, h based on param_1 (sprite index)
  categories: {
    0: { // Terrain editor small tiles
      count: 0x14,           // 20 sprites
      w: 0x24, h: 0x14,     // 36 x 20
      // x = (index / 4) * 0x25 + 0x157
      // y = (index % 4) * 0x15 + 0xD3
      gridCols: 4,
      origin: { x: 0x157, y: 0xD3 },
      spacing: { x: 0x25, y: 0x15 },
    },
    1: { // City improvements (two-row layout)
      count: 0x30,           // 48 sprites (24 + 24)
      w: 0x40, h: 0x30,     // 64 x 48
      // First 24: x=1 + (index%4)*0x41, y=(index/4)*0x31 + 0x27
      // Last 24:  x=0x14E + ((index-24)%4)*0x41, y=((index-24)/4)*0x31 + 0x27
      splitAt: 0x18,         // 24
      firstOrigin: { x: 1, y: 0x27 },
      secondOrigin: { x: 0x14E, y: 0x27 },
      spacing: { x: 0x41, y: 0x31 },
    },
    2: { // Wonders bar
      count: 4,
      w: 0x40, h: 0x30,     // 64 x 48
      // x = index * 0x41 + 0x8F
      // y = 0x1A7
      origin: { x: 0x8F, y: 0x1A7 },
      spacing: { x: 0x41 },
    },
    3: { // Small unit icons (2 rows x 9 cols)
      count: 0x12,           // 18 sprites
      w: 0x0E, h: 0x16,     // 14 x 22
      // x = ((index/2) % 9) * (w+1) + 1
      // y = (h+1) * (index & 1) + 0x1A9
      gridCols: 9,
      origin: { x: 1, y: 0x1A9 },
    },
    4: { // Terrain editor large tiles (split layout)
      count: 0x42,           // 66 sprites
      w: 0x24, h: 0x14,     // 36 x 20
      // First 38: x=(index%8)*0x25+0x157, y=(index/8)*0x15+1
      // Remaining: x=((index-38)%7)*0x25+0x157, y=((index-38)/7)*0x15+0x6A
      splitAt: 0x26,         // 38
      firstOrigin: { x: 0x157, y: 1 },
      secondOrigin: { x: 0x157, y: 0x6A },
    },
    5: { // Single large sprite
      count: 1,
      w: 0x40, h: 0x20,     // 64 x 32
      origin: { x: 199, y: 0x100 },
    },
    6: { // Row of 8 medium sprites
      count: 8,
      w: 0x20, h: 0x20,     // 32 x 32
      // x = (w+1) * index + 1
      // y = 0x164
      origin: { x: 1, y: 0x164 },
      spacing: { x: 0x21 },
    },
    7: { // Grid 11 rows x 4 cols
      count: 0x2C,           // 44 sprites
      w: 0x40, h: 0x20,     // 64 x 32
      // x = (index / 11) * 0x41 + 1
      // y = (index % 11) * 0x21 + 1
      gridRows: 11,
      origin: { x: 1, y: 1 },
      spacing: { x: 0x41, y: 0x21 },
    },
    8: { // Complex 2-tier + extra row
      count: 0x44,           // 68 sprites
      w: 0x40, h: 0x20,     // 64 x 32
      // First 64: complex staggered grid with half-row offsets
      // Last 4+: x=(index-64)*0x41+1, y=0x14B
      splitAt: 0x40,         // 64
      extraRowY: 0x14B,
    },
    9: { // 4-variant interleaved
      count: 0x20,           // 32 sprites
      w: 0x20, h: 0x10,     // 32 x 16
      // 4 variants with different y offsets from 0x1AD
      origin: { x: 1, y: 0x1AD },
      variantOffsets: [0, 0x22, 0x11, 0x22],
    },
    10: { // 6 top + grid below
      count: 0x18,           // 24 sprites
      w: 0x40, h: 0x20,     // 64 x 32
      // First 6: x=0x1C8, y=index*0x21+100
      // Remaining: x=((index-6)%9)*0x41+1, y=((index-6)/9)*0x21+0x16C
      splitAt: 6,
      firstOrigin: { x: 0x1C8, y: 100 },
      secondOrigin: { x: 1, y: 0x16C },
    },
    11: { // 9-col grid
      count: 0x3F,           // 63 sprites
      w: 0x40, h: 0x30,     // 64 x 48
      // x = (index % 9) * 0x41 + 1
      // y = (index / 9) * 0x31 + 1
      gridCols: 9,
      origin: { x: 1, y: 1 },
      spacing: { x: 0x41, y: 0x31 },
    },
  },

  // Category selector address
  categoryAddr: 'DAT_006ac924',
  sourceAddr: '0x005746A1',

  // --- Sprite resource table offsets (DAT_00628420 + offset) ---
  // @ FUN_00575dec (sprited_setup_preview_window)
  spriteOffsets: {
    previewDialogFrame: 0x950,       // DAT_00628420 + 0x950 — preview window dialog frame (0xf0x0xf0)   // 0x00575DEC
    previewNavButton:   0x954,       // DAT_00628420 + 0x954 — preview window navigation button sprite    // 0x00575DEC
  },

  // @ FUN_00575dec inner loop (sprited_open_preview_dialog)
  // These sprites are used for file-open dialog and error messages
  fileDialogSprites: {
    fileFilter:         0x958,       // DAT_00628420 + 0x958 — sprite file open dialog filter label        // 0x00575DEC
    fileDialogTitle:    0x95c,       // DAT_00628420 + 0x95c — sprite file open dialog title/icon          // 0x00575DEC
    wrongFilenameError: 0x960,       // DAT_00628420 + 0x960 — error: filename does not match expected     // 0x00575DEC
    loadFailedError:    0x964,       // DAT_00628420 + 0x964 — error: BMP/GIF could not be loaded          // 0x00575DEC
    unknownFormatError: 0x968,       // DAT_00628420 + 0x968 — error: file is neither BMP nor GIF          // 0x00575DEC
  },
};
