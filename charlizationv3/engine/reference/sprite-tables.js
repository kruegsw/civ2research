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

  // Civ2-clone additional ICONS.GIF sources:
  // viewPiece:     (199, 256, 64, 32) -- viewing rectangle overlay
  // gridlines:     (183, 430, 64, 32)
  // gridVisible:   (248, 430, 64, 32)
  // battleAnim:    (1+33*col, 356, 32, 32) for 8 frames
  // researchProg:  (49+15*col, 290, 14, 14) for 4 stages
  // globalWarming: (49+15*col, 305, 14, 14) for 4 stages
  // advCategories: (343+37*(i%5), 211+21*(i/5), 36, 20) for 20 sprites
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
  // NOT FOUND IN BINARY -- inferred from standard MGE palette + JS CIV_COLORS
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
    paletteIndex: 253,        // NOT FOUND IN BINARY -- inferred from GIF palette analysis
    r: 255, g: 0, b: 255,
    tolerance: 15,            // @ renderer.js line 104, 126
  },

  // Palette index 248 = Cyan (0, 255, 255) -- secondary transparency
  // Used in TERRAIN1 and TERRAIN2 for overlay sprites
  cyan: {
    paletteIndex: 248,        // NOT FOUND IN BINARY -- inferred from GIF palette analysis
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
