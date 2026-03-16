/**
 * Civ2 MGE Save File Format — Binary-Extracted Reference Data
 * Source: civ2.exe decompilation (Ghidra)
 *
 * NOTE: The existing parser.js already handles the core read pipeline.
 * This module focuses on details NOT in the parser:
 *   - Binary write pipeline and field semantics from the exe
 *   - Bitflag definitions confirmed by decompilation
 *   - Version-dependent record sizes and format differences
 *   - Scenario/MP format differences
 *   - Viewport packing
 *   - Cosmic rules block layout
 *   - Network (.net) and PBEM (.eml) format specifics
 *
 * Key source functions:
 *   write_save_file     @ 0x004741BE (4499B — master save writer)
 *   load_full_game      @ 0x00475666 (7734B — master load reader)
 *   load_game_file      @ 0x00473660 (1458B — game state loader)
 *   load_units_and_cities @ 0x004732A6 (954B — unit/city loader)
 *   set_save_extension  @ 0x00473D5E (extension logic)
 *   build_file_filter   @ 0x00473E55 (file dialog filters)
 *   pack_viewport_state @ 0x00472F7B (viewport serialization)
 *   diff_engine_init_sections @ 0x004B21D7 (section registry)
 */

// =============================================================================
// === File Header (14 bytes: 0x0000–0x000D) ===
// =============================================================================
// Already in parser.js. Binary-confirmed details:
export const FILE_HEADER = {
  MAGIC_STRING: 'CIVILIZE',   // 8 bytes at offset 0x0000, sourceAddr: '0x004741BE'
  NULL_SEPARATOR: 0x00,       // byte at 0x0008
  FORMAT_MARKER: 0x1A,        // byte at 0x0009 (ASCII SUB — acts as EOF for TYPE command)
  VERSION_OFFSET: 0x000A,     // uint16 — file format version
  CURRENT_VERSION: 0x2C,      // written by write_save_file @ 0x004741BE
  // Version validation (quick_load_check @ 0x0047543C):
  VERSION_MIN: 0x26,          // versions < 0x26 rejected as "too old"
  VERSION_MAX: 0x2C,          // versions > 0x2C rejected as "too new"
  // Rejected intermediate versions (load_full_game @ 0x00475666):
  REJECTED_VERSIONS: [0x29, 0x2A, 0x2B], // transitional versions, not loadable
  MAP_HEIGHT_OFFSET: 0x000C,  // byte — map height indicator
  FLAGS_OFFSET: 0x000D,       // byte — header flags
  // sourceAddr: '0x004741BE' (write), '0x0047543C' (validate), '0x00475666' (load)
};

// =============================================================================
// === Save File Block Layout (Write Order) ===
// =============================================================================
// Order of blocks as written by write_save_file @ 0x004741BE
// and read by load_full_game @ 0x00475666
export const SAVE_BLOCKS = {
  header:          { offset: 0x0000, size: 14,      note: 'CIVILIZE + version + flags', sourceAddr: '0x004741BE' },
  gameState:       { offset: 0x000E, size: 0x14A,   note: '330 bytes (v>=0x28)', sourceAddr: '0x004741BE fwrite(0x14A)' },
  cosmicRules:     { offset: 'after gameState', size: 0x790, note: '1936 bytes — always this size', sourceAddr: '0x004741BE fwrite(0x790)' },
  civData:         { offset: 'after cosmicRules', size: 0x2CA0, note: '11424 bytes (8 × 0x594)', sourceAddr: '0x004741BE fwrite(0x2CA0)' },
  mapData:         { offset: 'after civData', size: 'variable', note: 'terrain layers + map header', sourceAddr: '0x004741BE write_map_data(file, 0)' },
  visibilityLayer1:{ offset: 'after mapData', size: 'variable', note: 'per-tile visibility layer 1', sourceAddr: '0x004741BE' },
  visibilityLayer2:{ offset: 'after vis1', size: 'variable', note: 'per-tile visibility layer 2', sourceAddr: '0x004741BE' },
  randomSeeds:     { offset: 'after vis2', size: 0x400, note: '1024 bytes — random seed table', sourceAddr: '0x004741BE fwrite(0x400)' },
  units:           { offset: 'after seeds', size: 'numUnits × 0x20', note: 'unit records (32 bytes each)', sourceAddr: '0x004741BE' },
  cities:          { offset: 'after units', size: 'numCities × 0x58', note: 'city records (88 bytes each)', sourceAddr: '0x004741BE' },
  wonders:         { offset: 'after cities', size: 63, note: '21 × 3 bytes (destroyed, cityId, obsolete)', sourceAddr: '0x004741BE' },
  activeUnitPos:   { offset: 'after wonders', size: 2, note: 'uint16 — active unit position', sourceAddr: '0x004741BE' },
  currentUnitPos:  { offset: 'after activeUnit', size: 2, note: 'uint16 — current unit position', sourceAddr: '0x004741BE' },
  viewports:       { offset: 'after unitPos', size: 'variable', note: 'per-player viewports (version-dependent)', sourceAddr: '0x004741BE' },
  tailData:        { offset: 'after viewports', size: 0x4B0, note: '1200 bytes — tail data block', sourceAddr: '0x004741BE fwrite(0x4B0)' },
  packedViewport:  { offset: 'after tailData', size: 0x6A, note: '106 bytes — packed viewport state', sourceAddr: '0x004741BE fwrite(0x6A)' },
  perPlayerMPData: { offset: 'after viewport', size: 80, note: '8 × 10 bytes — per-player MP data', sourceAddr: '0x004741BE for p=0..7 fwrite(10)' },
  scenarioBlock:   { offset: 'after mpData', size: 100, note: 'only if scenario or MP (flag 0x80)', sourceAddr: '0x004741BE if scenario||0x80 fwrite(100)' },
  engineConstants: { offset: 'after scnBlock', size: 0x152, note: '338 bytes — engine constants', sourceAddr: '0x004741BE fwrite(0x152)' },
  mpTimingBlock:   { offset: 'after engine', size: 0x494, note: '1172 bytes — only if save_format!=0', sourceAddr: '0x004741BE if version!=0 fwrite(0x494)' },
  eventsSection:   { offset: 'after mpTiming', size: 'variable', note: 'EVNT marker + event records', sourceAddr: '0x004741BE' },
  // sourceAddr: '0x004741BE' (write_save_file)
};

// =============================================================================
// === Version-Dependent Record Sizes ===
// =============================================================================
// Extracted from load_units_and_cities @ 0x004732A6
export const VERSION_RECORD_SIZES = {
  // Unit record sizes:
  unit_v_lt_0x29: 0x1A,   // 26 bytes (old format)
  unit_v_0x29:    0x1E,   // 30 bytes (transitional)
  unit_v_ge_0x2A: 0x20,   // 32 bytes (current — matches parser SAV_UNIT_RECORD_SIZE)

  // City record sizes:
  city_v_lt_0x29: 0x54,   // 84 bytes (old format)
  city_v_ge_0x29: 0x58,   // 88 bytes (current — matches parser SAV_CITY_RECORD_SIZE)

  // Civ record stride (always the same in runtime):
  civ_stride:     0x594,  // 1428 bytes per civ — confirmed @ 0x004B21D7

  // Sequential ID assignment behavior (load_units_and_cities):
  // v < 0x29: sequential IDs assigned to ALL units/cities (no alive check)
  // v >= 0x29: sequential IDs assigned only to alive units/cities
  // sourceAddr: '0x004732A6'
};

// =============================================================================
// === Game State Block (0x14A = 330 bytes, v >= 0x28) ===
// =============================================================================
// For older versions (v < 0x28), the game state is split:
//   0x36 (54) + 0x5D (93) + 0x5D (93) + 0x4C (76) = 0x130 (304) bytes
// Plus separate per-civ reads in pieces.
//
// Old format also includes enemy count fix-up:
//   alive_count = popcount(DAT_00655B0A)
//   expected = alive_count - 1 - (DAT_00655B0A & 1)  // minus barbarians
//   if mismatch: log("load_gpk: Fixing up game enemies")
export const GAME_STATE_VERSIONS = {
  v_ge_0x28: {
    totalSize: 0x14A,        // 330 bytes, single block
    cosmicRulesSize: 0x790,  // 1936 bytes
    civDataTotal: 0x2CA0,    // 11424 bytes (8 × 0x594)
    // sourceAddr: '0x00473660 v>=0x28 path'
  },
  v_lt_0x28: {
    piece1: 0x36,            // 54 bytes — base game state
    piece2: 0x5D,            // 93 bytes — tech first discoverer
    piece3: 0x5D,            // 93 bytes — tech civ ownership
    piece4: 0x4C,            // 76 bytes — wonder data
    cosmicRulesSize: 0x790,  // 1936 bytes (same)
    perCivPieces: {          // read per-civ in 7 pieces:
      civNameBlock: 0x58,    // 88 bytes
      wonderFlags:  0x0C,    // 12 bytes
      civExtra:     0x0E,    // 14 bytes
      civTechs:     0x5D,    // 93 bytes
      treaties1:    0x36,    // 54 bytes
      treaties2:    0x36,    // 54 bytes
      treaties3:    0x36,    // 54 bytes
      padding:      1,       // 1 byte
      civDataBlock: 0x402,   // 1026 bytes
    },
    // sourceAddr: '0x00473660 v<0x28 path'
  },
};

// =============================================================================
// === Game Toggle Flags (0x000C–0x0017) ===
// =============================================================================
// Already in parser.js. Binary-confirmed additional flags from the exe:
export const GAME_FLAGS = {
  // Byte 0x000C — DAT_00655AE8
  BLOODLUST:           0x80,  // @ 0x000C bit 7 — no peace possible
  SIMPLIFIED_COMBAT:   0x10,  // @ 0x000C bit 4
  // Additional flags found in binary but NOT in parser:
  BARBARIANS_PEACEFUL: 0x04,  // @ 0x000C bit 2 — reduces effective difficulty for calendar
  BARBARIANS_RAGING:   0x08,  // @ 0x000C bit 3 — increases effective difficulty for calendar
  // sourceAddr: '0x00484FEC' (calc_year_from_turn uses these for difficulty adjustment)

  // Byte 0x000D — DAT_00655AE9
  FLAT_EARTH:          0x80,  // @ 0x000D bit 7
  DONT_RESTART_ELIM:   0x01,  // @ 0x000D bit 0

  // Byte 0x0014 — DAT_00655AF0 (loaded as part of game state)
  SCENARIO_NO_TECH_LIMITS: 0x80, // bit 7
  SCENARIO_FILE:           0x40, // bit 6 — set by write_save_file for .scn
  MP_SCENARIO_FLAG:        0x80, // bit 7 of 2nd byte (DAT_00655AF0+1, 0x0015)
  CHEAT_PENALTY:           0x10, // bit 4

  // DAT_006D1166 — flat earth runtime flag
  // Set during load: DAT_006D1166 = DAT_00655AE8 & 0x8000
  FLAT_EARTH_RUNTIME: 0x8000,   // @ 0x0047543C (quick_load_check)
};

// =============================================================================
// === Civ State Flags ===
// =============================================================================
// Per-civ state flags at civ_data + 0x00 (uint16)
// Already partially in parser.js. Binary-confirmed additional flags:
export const CIV_STATE_FLAGS = {
  SKIP_NEXT_OEDO_YEAR:    0x0001,  // already in parser
  AT_WAR:                 0x0002,  // already in parser
  SENATE_OVERRIDE:        0x0004,  // toggled each turn with 1/3 chance
  RECOVERED_REVOLUTION:   0x0008,  // already in parser
  FREE_ADVANCE_PENDING:   0x0020,  // already in parser

  // Additional flags from binary analysis:
  AI_EXPANSION_MODE:      0x0080,  // @ civ+0x00 bit 7 — AI in expansion phase
  TECH_MILESTONE:         0x0100,  // @ civ+0x00 bit 8 — tech milestone reached
  // @ 0x004741BE: scenario save clears civ flags & 0xFF96
  // This means the following bits are CLEARED for scenario saves:
  SCENARIO_CLEAR_MASK:    0xFF96,  // bits 0,3,6 cleared (0x0001|0x0008|0x0040 = 0x0049; ~0x0049 & 0xFFFF = 0xFF96... wait, 0xFF96 = ~0x0069)
  // Actually: 0xFFFF & ~(0x01|0x08|0x20|0x40) = 0xFF96
  // So bits cleared: 0x01 (skipOedo), 0x08 (recovered), 0x20 (freeAdvance), 0x40 (unknown)
  // sourceAddr: '0x004741BE' (write_save_file scenario clear)
};

// =============================================================================
// === City Flags ===
// =============================================================================
// City status flags from decompiled binary. Parser.js has partial coverage.
// These are the bitflags at city record offset +0x00 or related positions.
export const CITY_FLAGS = {
  // City building production flags (from phase 6 binary work)
  NEEDS_RECALC:         0x20000,  // city needs full recalculation
  // sourceAddr: various city processing functions

  // City info from write_save_file @ 0x004741BE:
  // When saving scenario: building_counts[civ][city.building]++ for alive cities
};

// =============================================================================
// === Viewport Packing ===
// =============================================================================
// Runtime viewport uses 32-bit rects; save file uses 16-bit (packed).
// pack_viewport_state @ 0x00472F7B, unpack @ 0x00473064
export const VIEWPORT_PACKING = {
  PACKED_SIZE: 0x6A,           // 106 bytes total in save file
  // Layout of packed viewport:
  //   offset 0x00: int16 — viewport mode (from DAT_00655280)
  //   offset 0x02: rect16 — current player rect (4 × int16 = 8 bytes)
  //   offset 0x0A: rect16 — minimap rect (8 bytes)
  //   offset 0x12: rect16[8] — per-civ rects (8 × 8 = 64 bytes)
  //   offset 0x52: rect16 — additional rect 1 (8 bytes)
  //   offset 0x5A: rect16 — additional rect 2 (8 bytes)
  //   offset 0x62: rect16 — additional rect 3 (8 bytes)
  // Total: 2 + 8 + 8 + 64 + 8 + 8 + 8 = 106 bytes = 0x6A
  fields: [
    { offset: 0x00, name: 'viewportMode',    type: 'int16', runtime: 'DAT_00655280' },
    { offset: 0x02, name: 'currentPlayerRect', type: 'rect16', runtime: 'DAT_655284' },
    { offset: 0x0A, name: 'minimapRect',     type: 'rect16', runtime: 'DAT_655294' },
    { offset: 0x12, name: 'perCivRects',     type: 'rect16[8]', runtime: 'DAT_6552A4', stride: 8 },
    { offset: 0x52, name: 'extraRect1',      type: 'rect16', runtime: 'DAT_655324' },
    { offset: 0x5A, name: 'extraRect2',      type: 'rect16', runtime: 'DAT_655334' },
    { offset: 0x62, name: 'extraRect3',      type: 'rect16', runtime: 'DAT_655344' },
  ],
  // rect16 = 4 × int16 (left, top, right, bottom)
  // rect32 = 4 × int32 (runtime format)
  // Conversion: rect_int32_to_int16 @ 0x0047314E, rect_int16_to_int32 @ 0x00473190
  // sourceAddr: '0x00472F7B' (pack), '0x00473064' (unpack)
};

// =============================================================================
// === Cosmic Rules Block (0x790 = 1936 bytes) ===
// =============================================================================
// Always 0x790 bytes, at DAT_0064BCF8 in runtime
// Contains all COSMIC.TXT / RULES.TXT game parameters
// Already parsed by our engine through defs.js. Key structural notes:
export const COSMIC_RULES = {
  SIZE: 0x790,               // 1936 bytes — always this size
  RUNTIME_ADDR: 'DAT_0064BCF8',
  // Sent over network as message type 0x17 (but only first 0x29 bytes — "scenario options")
  // Full rules sent differently: the diff engine syncs section 2 (index 2, 0x790 bytes)
  // sourceAddr: '0x004B21D7' (section registration), '0x0046B14D case 0x17'
};

// =============================================================================
// === File Extensions & Filters ===
// =============================================================================
// From set_save_extension @ 0x00473D5E and build_file_filter @ 0x00473E55
export const FILE_FORMATS = {
  extensions: {
    0: '.sav',    // single player (save_format 0)
    1: '.hot',    // hotseat (save_format 1) — originally labeled ".sav" in some docs
    2: '.eml',    // PBEM (save_format 2)
    3: '.net',    // network IPX (save_format 3)
    4: '.net',    // network TCP new (save_format 4)
    5: '.net',    // network TCP load (save_format 5)
    6: '.net',    // network serial (save_format 6)
    scenario: '.scn', // scenario files
  },
  // Filter string resource IDs:
  filterLabels: {
    sav: 0xEE,    // "Civilization II Saves (*.sav)"
    hot: 0x357,   // "Hotseat Saves (*.hot)"
    eml: 0x35A,   // "Email Saves (*.eml)"
    net: 0x35D,   // "Network Saves (*.net)"
    scn: 0x19F,   // "Scenarios (*.scn)"
    mp:  0x105,   // "Multiplayer Saves (*.mp)"
  },
  // sourceAddr: '0x00473D5E' (set_save_extension), '0x00473E55' (build_file_filter),
  //             '0x00473FF2' (append_file_type_filter)
};

// =============================================================================
// === Scenario (.scn) Format Differences ===
// =============================================================================
// Differences from .sav as implemented in write_save_file @ 0x004741BE
// and load_full_game @ 0x00475666
export const SCENARIO_FORMAT = {
  // Record size differences (from parser.js, confirmed by binary):
  UNIT_RECORD_SIZE: 26,     // 0x1A (vs 32 for .sav)
  CITY_RECORD_SIZE: 84,     // 0x54 (vs 88 for .sav)
  MAP_HEADER_SIZE: 13432,   // vs 13702 for .sav
  CIV_NAME_BLOCK_START: 0x0148,  // vs 0x0156 for .sav
  CIV_DATA_BLOCK_START: 0x08D8,  // vs 0x08E6 for .sav
  CIV_DATA_BLOCK_SIZE: 1396,     // vs 1428 for .sav

  // Write-time scenario flag: set 0x40 in DAT_00655AF0
  SCENARIO_FLAG: 0x40,

  // Tech ownership bitmask built during scenario save:
  // For each tech (0..99): build bitmask of civs that have it
  // If exactly 1 civ has it: firstDiscoverer = that civ
  // If multiple: firstDiscoverer = 8 (shared)
  TECH_SHARED_MARKER: 8,    // firstDiscoverer value when shared

  // Civ flags cleared for scenario: flags &= 0xFF96
  CIV_FLAGS_CLEAR_MASK: 0xFF96,

  // Leader portrait info copied for scenario/MP saves:
  // For civs 1..7: copy leader names from portrait table to civ name blocks
  COPY_LEADER_PORTRAITS: true,

  // Scenario block: 100 bytes, written ONLY for scenario or MP saves (flag 0x80)
  SCENARIO_BLOCK_SIZE: 100,
  // scenarioName is at offset +2 within the scenario block (64 chars max)

  // ALT scenario handling (load_verify_units @ 0x00477D8C):
  // If filename contains "ALT": search for *.ALT files in directory,
  // pick one at random: rand() * (count+1) >> 15
  ALT_RANDOM_SELECTION: true,

  // sourceAddr: '0x004741BE' (write), '0x00475666' (load), '0x00477D8C' (ALT logic)
};

// =============================================================================
// === Multiplayer Save (.net) Format Differences ===
// =============================================================================
// Network saves use the same core format as .sav but add:
export const NETWORK_FORMAT = {
  // Same record sizes as .sav (0x20 per unit, 0x58 per city)
  // Scenario block included (100 bytes) when flag 0x80 is set

  // MP timing block: 0x494 bytes, written when save_format_version != 0
  MP_TIMING_BLOCK_SIZE: 0x494,   // 1172 bytes
  MP_TIMING_GLOBAL: 'DAT_00654B40',
  // Contains: turn timer, per-player timing data, sync counters

  // Per-player MP data: 10 bytes × 8 players = 80 bytes
  PER_PLAYER_MP_SIZE: 10,
  PER_PLAYER_MP_SLOTS: 8,

  // Tail size for .net files: 2979 bytes (vs 1807 standard, 1907 scenario)
  TAIL_SIZE_NET: 2979,
  TAIL_SIZE_SAV: 1807,
  TAIL_SIZE_SCN: 1907,   // standard + 100-byte scenario block

  // Network data appended after standard 1807-byte tail
  NET_DATA_OFFSET: 1807,  // relative to tail start

  // sourceAddr: '0x004741BE' (write), '0x00475666' (load)
};

// =============================================================================
// === Wonder Records ===
// =============================================================================
// 21 wonders, 3 bytes each (written individually in write_save_file)
export const WONDER_RECORD = {
  COUNT: 21,
  SIZE_PER_WONDER: 3,
  TOTAL_SIZE: 63,            // 21 × 3
  fields: {
    destroyed: { offset: 0, size: 1, note: 'boolean: wonder destroyed' },
    cityId:    { offset: 1, size: 1, note: 'city ID that built the wonder' },
    obsolete:  { offset: 2, size: 1, note: 'boolean: wonder obsolete' },
  },
  // sourceAddr: '0x004741BE' (write loop), '0x00475666' (read loop)
};

// =============================================================================
// === Events Section ===
// =============================================================================
// Written at end of save file, preceded by "EVNT" magic marker
export const EVENTS_SECTION = {
  MAGIC: 'EVNT',
  RECORD_SIZE: 0x1BC,       // 444 bytes per event record (historical; linked-list in memory)
  // In memory, events use a different stride:
  MEMORY_STRIDE: 0x1C4,     // 452 bytes — includes link pointers at +0x1BC..+0x1C3
  // Event string pool follows event records
  // String fields within event record (from mp_relink_event_strings @ 0x0048308F):
  STRING_OFFSETS: {
    0x08:  { minSize: 15, note: 'short string' },
    0x10:  { minSize: 24, note: 'trigger text' },
    0x14:  { minSize: 24, note: 'trigger text' },
    0x20:  { minSize: 24, note: 'trigger text' },
    0x38:  { count: 20, minSize: 1, note: '20 trigger strings, 1 byte each' },
    0x88:  { minSize: 24, note: 'action text' },
    0x90:  { minSize: 15, note: 'short string' },
    0xC4:  { minSize: 24, note: 'parameter A' },
    0xCC:  { minSize: 24, note: 'parameter B' },
    0xD4:  { minSize: 24, note: 'parameter C' },
    0xDC:  { minSize: 15, note: 'short string' },
    0x13C: { minSize: 24, note: 'extra A' },
    0x140: { minSize: 24, note: 'extra B' },
    0x148: { minSize: 15, note: 'short string' },
    0x174: { minSize: 24, note: 'extra C' },
    0x184: { minSize: 1,  note: 'minimal string' },
  },
  // Only written for non-scenario saves:
  // "if has_events && !is_scenario: fputs('EVNT'), write_count, write_records, write_strings"
  // sourceAddr: '0x004741BE' (write), '0x00475666' (read), '0x0048308F' (relink strings)
};

// =============================================================================
// === Leader Portrait Fog-of-War ===
// =============================================================================
// During load, leader portrait indices are negated for unknown civs.
// Sign encodes "not yet seen" — negative = undiscovered.
// Complex per-civ negation logic in load_full_game @ 0x00475666
export const LEADER_PORTRAIT_FOW = {
  NEGATIVE_MEANS_UNSEEN: true,
  // If a civ has not made contact, their leader portrait index is negated
  // to indicate "not yet seen". The absolute value is the actual portrait index.
  // sourceAddr: '0x00475666' (load_full_game, portrait negation section)
};

// =============================================================================
// === Post-Load Reconstruction ===
// =============================================================================
// After loading, several derived tables are rebuilt from raw data
// (load_full_game @ 0x00475666):
export const POST_LOAD_RECONSTRUCTION = {
  // Per-civ unit type counts rebuilt from unit array:
  // for civ 0..7: clear unit_type_counts[civ][0..61]
  //   for each alive unit: if unit.owner == civ: unit_type_counts[civ][unit.type]++
  UNIT_TYPE_COUNT_SLOTS: 62,  // 0..61 unit types

  // Per-civ building counts rebuilt from city array:
  // for each alive city: if city.owner == civ && city.building >= 0:
  //   building_counts[civ][city.building]++
  BUILDING_COUNT_REBUILD: true,

  // Stacked unit validation (load_verify_units @ 0x00477D8C):
  // for each unit: if dead: set coords to (-1,-1)
  //   else: resolve_stack_pointers(unit)
  //   if unit.x < 0 || unit.y < 0: log("Stacked Unit in save"), remove_unit
  STACK_VALIDATION: true,

  // sourceAddr: '0x00475666' (reconstruction), '0x00477D8C' (stack validation)
};

// =============================================================================
// === Hotseat Save Format Specifics ===
// =============================================================================
export const HOTSEAT_FORMAT = {
  SAVE_FORMAT: 1,
  FILE_EXTENSION: '.hot',
  // On save (write_save_file): if format == 1, player_bitmask is temporarily
  // set to current_turn_mask, then restored after save
  PLAYER_BITMASK_SWAP: true,
  // sourceAddr: '0x004741BE' (write_save_file, format 1 bitmask swap)
};

// =============================================================================
// === PBEM Save Format Specifics ===
// =============================================================================
export const PBEM_FORMAT = {
  SAVE_FORMAT: 2,
  FILE_EXTENSION: '.eml',
  // Filename includes timestamp: CivName_YYYY_MM_DD_HH_MM_SS.eml
  FILENAME_HAS_TIMESTAMP: true,
  // Gets local time via GetLocalTime() for filename generation
  // On save completion: shows "EMAILSAVED" dialog with filename
  // Password is forced on first turn via mp_handle_player_turn @ 0x00498A5C
  PASSWORD_FORCED_ON_FIRST_TURN: true,
  // Email address collected during civ selection (EMAILADDRESS dialog)
  // sourceAddr: '0x0047758C' (save_game, PBEM filename logic)
};

// =============================================================================
// === Diff Engine Section Sizes (Total Sizes for Network Calc) ===
// =============================================================================
// diff_engine_calc_total_size @ 0x004B14A4
export const DIFF_ENGINE_SIZES = {
  HEADER_SIZE: 0x1E0,       // 480 bytes base header
  // Total = 0x1E0 + sum of all section sizes
  // Section 5 size = numUnitSlots * 0x20
  // Section 6 size = numCitySlots * 0x58
  UNIT_STRIDE: 0x20,        // 32 bytes per unit slot
  CITY_STRIDE: 0x58,        // 88 bytes per city slot
  CIV_STRIDE:  0x594,       // 1428 bytes per civ slot
  // sourceAddr: '0x004B14A4'
};

// =============================================================================
// === Save Format Detection ===
// =============================================================================
// How the game determines what type of save it's dealing with:
export const FORMAT_DETECTION = {
  // 1. Read "CIVILIZE" magic (8 bytes) — reject if mismatch
  // 2. Read version (uint16) — reject if outside [0x26, 0x2C]
  // 3. save_format_version stored at game_state+0x2DC (offset from DAT_00655AE8)
  //    Maps to DAT_00655B04 in runtime
  SAVE_FORMAT_OFFSET: 0x2DC,  // relative to game state start
  SAVE_FORMAT_GLOBAL: 'DAT_00655B04',

  // The extension is informational only — the save_format_version inside
  // the file is authoritative for determining game mode.

  // Scenario detection:
  // Flag 0x40 in DAT_00655AF0 = scenario file
  // Flag 0x80 in DAT_00655AF0 = MP scenario / has leader portraits

  // On load: if save_format_version != 0, cheat mode flag is cleared
  // On scenario load: god mode and debug flags are cleared

  // sourceAddr: '0x00475666' (load_full_game), '0x004741BE' (write_save_file)
};

// =============================================================================
// === Null-Terminated String I/O ===
// =============================================================================
// Used for event strings and other variable-length text in save files
// write_null_terminated_string @ 0x00473C12
// read_null_terminated_string @ 0x00473C68
export const STRING_IO = {
  MAX_LENGTH: 254,           // buffer size 260, but breaks at 254
  WRITE: 'fputs(str) + fputc(0)',
  READ: 'fgetc() loop until NUL or EOF, max 254 chars',
  // sourceAddr: '0x00473C12' (write), '0x00473C68' (read)
};

// =============================================================================
// === Password Storage in Save File ===
// =============================================================================
// Passwords stored at tail_offset + 720 in the save file
// 8 slots × 32 bytes = 256 bytes, encrypted with position-XOR + rotate cipher
export const PASSWORD_STORAGE = {
  OFFSET_FROM_TAIL: 720,
  SLOTS: 8,
  BYTES_PER_SLOT: 32,
  TOTAL_SIZE: 256,
  // First byte of each slot: 0 = no password set
  // Encryption: XOR with position index, rotate right 3, chain with previous byte
  // sourceAddr: '0x004988B8' (encrypt), '0x00498943' (decrypt), '0x00498784' (init)
};

// =============================================================================
// === Kill History / Post-Tail Data ===
// =============================================================================
// Located after the tail data block, size depends on format:
export const KILL_HISTORY = {
  // Standard tail (1807 bytes): kill history starts at tailOff + 1469
  // Scenario tail (1907 bytes): kill history starts at tailOff + 1569 (after 100-byte scenario block)
  // NET tail (2979 bytes): kill history at tailOff + 1469 (network data appended separately)
  OFFSET_SAV: 1469,
  OFFSET_SCN: 1569,          // 1469 + 100 (scenario block)
  // sourceAddr: parser.js _parseTailData (already implemented)
};

// =============================================================================
// === Fixed Constants Block ===
// =============================================================================
// 7 bytes at tail + 1385, expected to be constant across all saves
// (validation in parser.js)
export const FIXED_CONSTANTS = {
  OFFSET_FROM_TAIL: 1385,
  SIZE: 7,
  // sourceAddr: parser.js (validation), confirmed by binary
};

// =============================================================================
// === Engine Constants Block ===
// =============================================================================
// 338 bytes (0x152) — written after scenario block in save file
// Contains engine tuning parameters
export const ENGINE_CONSTANTS = {
  SIZE: 0x152,               // 338 bytes
  RUNTIME_ADDR: 'DAT_00655128',
  // Written via fwrite in write_save_file @ 0x004741BE
  // Registered as diff section 10 (index 10, 0x154 bytes — slightly larger in diff reg)
  DIFF_SECTION_SIZE: 0x154,  // 340 bytes in diff engine (DWORD-aligned from 338)
  // sourceAddr: '0x004741BE' (write), '0x004B21D7' (diff section 10)
};
