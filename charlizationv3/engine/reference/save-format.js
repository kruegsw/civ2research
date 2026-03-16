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
  SCENARIO_EDIT_MODE:      0x80, // bit 7 — scenario editor active          // 0x00553FF6

  // Byte 0x000C — DAT_00655AEA (extended game flags)
  EXTENDED_CHEAT:          0x8000, // bit 15 — extended cheat mode enabled  // 0x00553FF6
  SOUND_ENABLED:           0x10,   // bit 4  — sound effects on             // 0x0046E020
  CD_AUDIO_ENABLED:        0x08,   // bit 3  — CD music on                  // sound-triggers.js

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
  // So bits cleared: 0x01 (skipOedo), 0x08 (recovered), 0x20 (freeAdvance), 0x40 (transient, never independently set/checked in binary)
  // sourceAddr: '0x004741BE' (write_save_file scenario clear)
};

// =============================================================================
// === City Flags ===
// =============================================================================
// City status flags from decompiled binary. Parser.js has partial coverage.
// These are the bitflags at city record offset +0x00 or related positions.
export const CITY_FLAGS = {
  // 32-bit bitfield at city record offset +0x04 (DAT_0064f344 with stride 0x58).
  // Parser reads this as 4 separate bytes: attribs1 (byte+4), attribs2 (byte+5),
  // attribs3 (byte+6), attribs4 (byte+7).

  // --- Byte +4 (attribs1) — bits 0x01..0x80 ---
  CIVIL_DISORDER:       0x01,     // city is in civil disorder (unhappy > happy)
  WE_LOVE_KING_DAY:     0x02,     // "We Love the King Day" celebration active
  IMPROVEMENT_SOLD:     0x04,     // an improvement was sold this turn
  TECH_STOLEN:          0x08,     // technology has been stolen from this city by spy/diplomat
                                  // When set: future steal attempts show "STEALHARD" dialog,
                                  // AI reduces attack desirability against this city by 50%,
                                  // and further halves if tech lead > 6.
                                  // Set by: FUN_004c6a9c (diplomat steal tech action)
                                  // Checked by: block_004C0000.c:2217,2268,2365 (diplomat actions),
                                  //   block_00530000.c:2849,2876 (AI attack evaluation),
                                  //   block_004E0000.c:5312 (AI unit targeting — clamps threat to 3)
  AUTOBUILD_MILITARY:   0x10,     // auto-build military units (governor rule)
  // bit 0x20:                    // (unknown / unused in attribs1)
  AI_SETTLER_NEARBY:    0x40,     // AI flag: friendly settler is within 5 tiles of this city
                                  //   Set by: FUN_00530253 (AI start-of-turn) block_00530000.c:589,703
                                  //     when a settler (unit with AI_SETTLER_ROLE flag 0x200) is found
                                  //     within distance < 5 of the city AND few settlers exist.
                                  //   Cleared by: CLEAR_TURN_START mask 0xffbfffbb (block_004F0000.c:291)
                                  //   Purpose: tells AI city processing that a settler is en route,
                                  //     suppressing duplicate settler production.
                                  //   sourceAddr: block_00530000.c:589,703
  CAN_BUILD_COASTAL:    0x80,     // city is coastal — can build coastal improvements/ships

  // --- Byte +5 (attribs2) — bits 0x100..0x8000 ---
  BUILDING_WONDER:      0x100,    // city is currently building a world wonder (byte+5 bit 0)
                                  // Set by: FUN_004e7270 (acquire wonder slot) — writes city ID
                                  //   to DAT_00655be6[wonderSlot] and sets this flag.
                                  // Cleared by: production completion (shields >= cost) in
                                  //   FUN_004ec312 (city turn processing) at lines 4892, 5197.
                                  // Also set at line 4924 when wonder is reassigned after
                                  //   another city completes the same wonder type.
  // bit 0x200:                   // (unobserved in binary — possibly unused)
  CAN_BUILD_HYDRO:      0x800,    // city can build hydroelectric plant (byte+5 bit 3)
  CONTENT_SURPLUS:      0x4000,   // city content with surplus — enables rapture growth (byte+5 bit 6)
                                  // Set when: happy == unhappy AND (netShields > 0) AND
                                  //   (netFood >= 0). Also set on civil disorder entry (0x4001).
                                  // Cleared when: conditions not met (no surplus or starving).
                                  // Effect: when checked during food processing, prevents food
                                  //   storage decrement and instead flags for rapture growth.
                                  // Set/cleared by: FUN_004ee3c0 (happiness evaluation) lines 5838,5868-5875.
                                  // Checked by: FUN_004e91ea (food processing) line 3360.
  RAPTURE_GROWTH:       0x8000,   // city is growing via rapture (byte+5 bit 7)
                                  // Set when: CONTENT_SURPLUS (0x4000) is active AND food
                                  //   storage counter is non-zero — skips normal food consumption
                                  //   and flags population growth instead.
                                  // Cleared when: food storage counter reaches 0.
                                  // Set by: FUN_004e91ea lines 3364-3365, 3461.
                                  // Cleared by: FUN_004e91ea lines 3374-3375.

  // --- Byte +6 (attribs3) — bits 0x10000..0x800000 ---
  NEEDS_RECALC:         0x20000,  // city needs full recalculation (byte+6 bit 1, set on creation)
  NEEDS_NEW_SETTLER_SITE: 0x80000, // city needs new settler site (byte+6 bit 3)
                                   // Set by: FUN_004f080d (settler automation pathfinding) when
                                   //   either an adjacent ocean tile with 0x80 terrain byte is found
                                   //   (line 208) or when distant settlement target is located (line 247).
                                   // Cleared by: FUN_004f03b7 when pathfinding fails and no valid
                                   //   destination found (line 230: & 0xfff7ffff).
                                   // sourceAddr: block_004F0000.c lines 208, 230, 247
  WAS_CELEBRATING:      0x100000, // WLtKD was active before disorder began (byte+6 bit 4)
                                  // Set by: FUN_004ee3c0 disorder handler when city enters disorder
                                  //   AND previously had WLtKD (attribs2 & 0x20 != 0) — line 5851.
                                  // Also set in auto-build context when celebrating specialist can
                                  //   be assigned (line 3420: local_7c | 0x100000, assigns slot 0x14).
                                  // Cleared by: disorder resolution via mask 0xffefdffe (line 5787, 5879).
                                  // sourceAddr: block_004E0000.c lines 3420, 5851
  CAN_BUILD_SHIPS:      0x200000, // city has ocean access — can build naval units (byte+6 bit 5)
  INVESTIGATED:         0x400000, // city has been investigated by a diplomat (byte+6 bit 6)
                                  //   Set by: FUN_004c6a9c (diplomat investigate city) block_004C0000.c:2327
                                  //     case 1 of the diplomat action switch: city flags |= 0x400000.
                                  //   Effect: marks the city as previously investigated; may affect
                                  //     future diplomatic actions or AI espionage priority.
                                  //   sourceAddr: block_004C0000.c:2327

  // --- Byte +7 (attribs4) — bits 0x1000000..0x80000000 ---
  AUTOBUILD_MILITARY_ADV: 0x1000000,  // auto-build military (advisor recommendation)
  AUTOBUILD_DOMESTIC_ADV: 0x2000000,  // auto-build domestic (advisor recommendation)
  OBJECTIVE_X1:         0x4000000,    // scenario objective value x1
                                      //   Toggled by: FUN_0055d3db (scenario editor) block_00550000.c:2724
                                      //     city_flags ^= 0x4000000 (toggle on click)
                                      //   Read by: block_00550000.c:2651: (flags & 0x4000000) >> 26
                                      //     extracts 0 or 1 for scenario objective scoring
  // bit 0x8000000:                   // (unobserved in binary — gap between objective bits)
  OBJECTIVE_X3:         0x10000000,   // scenario objective value x3
  // sourceAddr: various city processing functions, FUN_004e7270, FUN_004ec312, FUN_004ee3c0, FUN_004e91ea

  // City info from write_save_file @ 0x004741BE:
  // When saving scenario: building_counts[civ][city.building]++ for alive cities
};

// --- Compound clear masks used on city flags ---
// These bitmasks are applied to the 32-bit city flags word during specific events.
export const CITY_FLAG_MASKS = {
  CLEAR_DISORDER:       0xffefdffe,
    // Clears: CIVIL_DISORDER(0x01), WE_LOVE_KING_DAY(0x02), RAPTURE_GROWTH(0x8000),
    //         WAS_CELEBRATING(0x100000), and bit 0x2000 (disorder-continuation).
    // Applied when: disorder resolves (happiness >= unhappiness after re-evaluation).
    // sourceAddr: block_004E0000.c lines 5787, 5879

  CLEAR_AUTOBUILD:      0xfcffffef,
    // Clears: AUTOBUILD_MILITARY(0x10), AUTOBUILD_MILITARY_ADV(0x1000000),
    //         AUTOBUILD_DOMESTIC_ADV(0x2000000).
    // Applied when: AI city has auto-build enabled AND production queue is empty AND
    //   the city's production item resolves to 'c' (capitalization) — clears all
    //   auto-build modes so the AI can re-evaluate.
    // sourceAddr: block_004E0000.c line 5486

  CLEAR_TURN_START:     0xffbfffbb,
    // Clears: bits 0x04 (IMPROVEMENT_SOLD) + 0x40 (AI_SETTLER_NEARBY) + 0x4000 (CONTENT_SURPLUS).
    //   Equivalent to clearing bits at positions 2, 6, and 14.
    // Applied at: start of city turn processing for each city.
    // sourceAddr: block_004F0000.c line 291 (FUN_004f0eab)
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
// === Cosmic Editor (Cheat Mode) ===
// =============================================================================
// Binary ref: FUN_005866d3 (populate editor buffers from cosmic bytes)
//             FUN_005869d4 (render editor list from buffers)
//             FUN_00586bb6 (edit single cosmic parameter)
//             FUN_00586d0a (write cosmic parameters to RULES.TXT)
// The cosmic editor reads/writes 22 byte-sized parameters from the cosmic rules
// block at DAT_0064bcc8..DAT_0064bcdd. Each is cast to uint and stored in two
// parallel int32 editor buffer arrays (display + working copy).
export const COSMIC_EDITOR = {
  parameterCount: 22,        // 0x16 — loop at FUN_00586d0a: local_88 < 0x16
                             // and FUN_005869d4: 0x15 < local_a8 (break at 22)

  // --- 22 cosmic parameters (byte addresses within cosmic rules block) ---
  // FUN_005866d3 copies DAT_0064bcc8..DAT_0064bcdd (22 bytes) to two int32 arrays
  // RULES.TXT @COSMIC section, 22 parameters, read sequentially by FUN_00419cbb
  // at block_00410000.c:5064-5088. Each param has min/max from the validation tables.
  parameters: {
    0:  { addr: 'DAT_0064bcc8', min: 1, max: 100, note: 'Road movement multiplier (default 3). Unit MP *= this on road/railroad. sourceAddr: 0x00419D30' },
    1:  { addr: 'DAT_0064bcc9', min: 1, max: 100, note: 'Trade bonus base (default 1). Affects baseline trade arrow calculation. sourceAddr: 0x00419D30' },
    2:  { addr: 'DAT_0064bcca', min: 0, max: 10, note: 'Food consumed per citizen per turn (default 2). sourceAddr: 0x00419D30' },
    3:  { addr: 'DAT_0064bccb', min: 4, max: 20, note: 'Settler food cost — food rows per settler (default 2, forced even). If odd, rounded up +1. sourceAddr: 0x00419D30' },
    4:  { addr: 'DAT_0064bccc', min: 4, max: 20, note: 'Shield rows multiplier (default 10). Unit/improvement cost = rules_cost * this. sourceAddr: 0x00419D30' },
    5:  { addr: 'DAT_0064bccd', min: 0, max: 10, note: 'Pollution multiplier (default 1). Scales shield-based pollution. sourceAddr: 0x00419D30' },
    6:  { addr: 'DAT_0064bcce', min: 0, max: 10, note: 'Base unhappy citizens before content (default 4). Used in happiness evaluation (block_004E0000.c:2896). Per-difficulty adjusted. sourceAddr: 0x00419D30' },
    7:  { addr: 'DAT_0064bccf', min: 4, max: 12, note: 'Riot factor / content citizens base (default 7). Controls city size threshold for unhappiness: base_content = param7 - difficulty. If city.size > base_content, extra citizens are unhappy. Used at block_004E0000.c:4077,4088. sourceAddr: 0x00419D30' },
    8:  { addr: 'DAT_0064bcd0', min: 10, max: 100, note: 'Tech paradigm / cost multiplier (default 32). Controls research cost formula: base cost scaled by this value. Used at block_004E0000.c:4080: local_1c = param8 + difficulty * -2. sourceAddr: 0x00419D30' },
    9:  { addr: 'DAT_0064bcd1', min: 4, max: 50, note: 'City size for aqueduct requirement (default 8). Cities need aqueduct to grow past this. Checked at block_00580000.c:3786 and block_00490000.c:4779. sourceAddr: 0x00419D30' },
    10: { addr: 'DAT_0064bcd2', min: 4, max: 50, note: 'City size for sewer system requirement (default 12). Cities need sewer to grow past this. Checked at block_00490000.c:4861. sourceAddr: 0x00419D30' },
    11: { addr: 'DAT_0064bcd3', min: 3, max: 10, note: 'Tech cost multiplier / paradigm scale (default 3). Used as tech_cost = baseCost * param11 / 10. Checked at block_004C0000.c:997-998: if param11 != 10, scale cost. sourceAddr: 0x00419D30' },
    12: { addr: 'DAT_0064bcd4', min: 5, max: 100, note: 'Trade route bonus multiplier (default 30). Scales caravan/freight trade route income. Used at block_004C0000.c:1166: income = distance_factor * param12. sourceAddr: 0x00419D30' },
    13: { addr: 'DAT_0064bcd5', min: 0, max: 8, note: 'Food trade route threshold (default 3). Min city food surplus to establish food supply route. Used at block_004F0000.c:328,338 and block_004E0000.c:2854. sourceAddr: 0x00419D30' },
    14: { addr: 'DAT_0064bcd6', min: 0, max: 8, note: 'Shield trade route threshold (default 3). Min city shield surplus for trade route. Used at block_004F0000.c:341 and block_004E0000.c:2860. sourceAddr: 0x00419D30' },
    15: { addr: 'DAT_0064bcd7', min: 0, max: 8, note: 'Trade trade route threshold (default 3). Min city trade surplus for trade route. Used at block_004F0000.c:344 and block_004E0000.c:2867. sourceAddr: 0x00419D30' },
    16: { addr: 'DAT_0064bcd8', min: 1, max: 20, note: 'Citizens per tax/lux/sci specialist (default 1). How many citizens each specialist represents in resource conversion. Used at block_004E0000.c:3636. sourceAddr: 0x00419D30' },
    17: { addr: 'DAT_0064bcd9', min: 0, max: 100, note: 'Government corruption percentage (default 0). Percentage of trade lost to corruption. Used at block_004E0000.c:3900: trade -= (param17 * trade) / 100. sourceAddr: 0x00419D30' },
    18: { addr: 'DAT_0064bcda', min: 0, max: 100, note: 'Lost shields penalty threshold (default 50). When changing production, shields lost if remaining < this %. Already referenced by production change logic. sourceAddr: 0x00419D30' },
    19: { addr: 'DAT_0064bcdb', min: 4, max: 100, note: 'Max effective city distance for trade routes (default 16). Caps the distance component of trade income calculation. Checked at block_004C0000.c:881,3249,3256; block_00530000.c:474,494; block_00570000.c:6016; block_00410000.c:422. sourceAddr: 0x00419D30' },
    20: { addr: 'DAT_0064bcdc', min: 25, max: 200, note: 'Science cost base (default 32). Base science cost per tech, scaled by number of known techs. Used at block_00590000.c:1676: local_c = param20. sourceAddr: 0x00419D30' },
    21: { addr: 'DAT_0064bcdd', min: 0, max: 10, note: 'Fundamentalism max science rate (default 2). Caps science rate under Fundamentalism government. Used at block_004E0000.c:3870-3871: if govt == 4 && param21 < rate, rate = param21. sourceAddr: 0x00419D30' },
  },

  // --- Editor buffer arrays (22 int32 entries each) ---
  // FUN_005866d3 copies byte values to both arrays at startup;
  // display buffer at DAT_006a2d80, working buffer at DAT_006a2d28
  displayBuffer: {
    baseAddr: 'DAT_006a2d80',    // int32[22] — current display values
    stride: 4,                    // 4 bytes per entry
  },
  workingBuffer: {
    baseAddr: 'DAT_006a2d28',    // int32[22] — working copy (editable)
    stride: 4,
  },

  // --- Min/Max validation tables (22 int32 entries each) ---
  // FUN_00586bb6: thunk_FUN_00421da0(0, DAT_00634590[i]) sets min,
  //              thunk_FUN_00421da0(1, DAT_006345e8[i]) sets max
  // thunk_FUN_005adfa0(value, min, max) clamps the edited value
  minTable: { baseAddr: 'DAT_00634590', stride: 4 },
  maxTable: { baseAddr: 'DAT_006345e8', stride: 4 },

  // --- Editor UI ---
  editorDialog: 'CPEDIT',       // @ FUN_00586bb6: s_CPEDIT_00634688
  editorListDialog: 'EDITCOSMIC', // @ FUN_005869d4: s_EDITCOSMIC_00634640
  debugSection: 'DEBUG',         // @ FUN_005869d4: s_DEBUG_006359dc

  // --- Formatting in editor list (FUN_005869d4) ---
  // Values < 10: single digit format, < 100: two-digit, >= 100: three-digit
  formatThresholds: [10, 100],

  // --- File write format (FUN_00586d0a) ---
  // Writes 22 lines to RULES.TXT: "%8d %s" where %s = comment after semicolon
  fileWriteFormatAddr: 's___8d_s_00634690',  // "%8d %s"
  lineBufferSize: 0x80,                       // 128-byte line read buffer
  commentSeparator: 0x3B,                     // ';' — _strchr(local_84, 0x3b)

  // --- Save to file (show_messagebox_6DA1) ---
  saveDialog: 'COSMIC',           // @ s_COSMIC_00634698
  saveErrorMsg: 'Error updating RULES',  // @ s_Error_updating_RULES__s_006346a0
  saveErrorCaption: 'File I/O Error',    // @ s_File_I_O_Error_006346b8

  // sourceAddr: '0x005866D3' (populate), '0x005869D4' (render),
  //             '0x00586BB6' (edit), '0x00586D0A' (write)
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

// =============================================================================
// === Unit Record Field Map (0x20 = 32 bytes per unit) ===
// =============================================================================
// Runtime base: DAT_006560F0 (unit array)
// Stride: 0x20 (32 bytes). Index range: 0..0x800 (unit slots 0..2048).
// Extracted from block_005B0000.c — FUN_005b3d06 (create_unit), FUN_005b4391 (delete_unit),
// FUN_005b2590 (validate_stack), FUN_005b319e (pick_up_unit), FUN_005b345f (put_down_unit),
// FUN_005b29aa/005b29d7/005b2a39 (movement point functions).
export const UNIT_RECORD_FIELDS = {
  STRIDE: 0x20,           // 32 bytes per unit record
  BASE_ADDR: 'DAT_006560F0',
  fields: {
    x:             { offset: 0x00, size: 2, type: 'int16',  addr: 'DAT_006560F0', note: 'map x coordinate' },
    y:             { offset: 0x02, size: 2, type: 'int16',  addr: 'DAT_006560F2', note: 'map y coordinate' },
    flags:         { offset: 0x04, size: 2, type: 'uint16', addr: 'DAT_006560F4',
                     note: 'unit status flags bitfield — bit 0x2000 = veteran status.' +
                           ' In espionage context (FUN_004c5fae, spy unit type 0x2F):' +
                           ' 0x2000 means "successful spy mission" and doubles survival odds.' +
                           ' Base survival = (failedMission ? 2 : 3), doubled to (4 or 6) if 0x2000 set,' +
                           ' halved to (1 or 1.5) if mission was positive outcome.' +
                           ' After surviving, 0x2000 is set on the spy (line 1907: flags |= 0x2000).' +
                           ' sourceAddr: block_004C0000.c FUN_004c5fae lines 1842-1907' },
    type:          { offset: 0x06, size: 1, type: 'uint8',  addr: 'DAT_006560F6', note: 'unit type index (0..61)' },
    owner:         { offset: 0x07, size: 1, type: 'int8',   addr: 'DAT_006560F7', note: 'owning civ (0..7, -1 = none)' },
    moveSpent:     { offset: 0x08, size: 1, type: 'uint8',  addr: 'DAT_006560F8', note: 'movement points spent this turn' },
    hpLost:        { offset: 0x09, size: 1, type: 'uint8',  addr: 'DAT_006560F9', note: 'visibility/seen bitmask (1 bit per civ)' },
    movesRemain:   { offset: 0x0A, size: 1, type: 'uint8',  addr: 'DAT_006560FA', note: 'damage taken (reduces from max HP)' },
    goto_dest_x:   { offset: 0x0B, size: 1, type: 'uint8',  addr: 'DAT_006560FB', note: 'goto destination or caravan commodity (0xFF=none)' },
    shield_charge: { offset: 0x0C, size: 1, type: 'uint8',  addr: 'DAT_006560FC', note: 'shield cost charged on creation (default 0x58=88)' },
    caravan_dest:  { offset: 0x0D, size: 1, type: 'uint8',  addr: 'DAT_006560FD', note: 'caravan commodity / special data' },
    counter2:      { offset: 0x0E, size: 1, type: 'uint8',  addr: 'DAT_006560FE', note: 'counter / patrol data' },
    order:         { offset: 0x0F, size: 1, type: 'int8',   addr: 'DAT_006560FF', note: 'current order (0xFF=none, 0x03=sentry, 0x01=fortify, 0x02=sleep)' },
    homeCity:      { offset: 0x10, size: 1, type: 'int8',   addr: 'DAT_00656100', note: 'home city index (0xFF / -1 = none)' },
    // padding1:   { offset: 0x11, size: 1 },
    goToX:         { offset: 0x12, size: 2, type: 'int16',  addr: 'DAT_00656102', note: 'goto/patrol target x (-1 = none)' },
    goToY:         { offset: 0x14, size: 2, type: 'int16',  addr: 'DAT_00656104', note: 'goto/patrol target y (-1 = none)' },
    prevInStack:   { offset: 0x16, size: 2, type: 'int16',  addr: 'DAT_00656106', note: 'prev unit in stack doubly-linked list (-1 = end)' },
    nextInStack:   { offset: 0x18, size: 2, type: 'int16',  addr: 'DAT_00656108', note: 'next unit in stack doubly-linked list (-1 = end)' },
    id:            { offset: 0x1A, size: 4, type: 'uint32', addr: 'DAT_0065610A', note: 'unique sequential ID (0 = dead/empty slot)' },
    // remaining:  { offset: 0x1E, size: 2, note: 'padding to 0x20 boundary' },
  },
  // sourceAddr: '0x005B3D06' (create), '0x005B4391' (delete), '0x005B2590' (validate),
  //             '0x005B319E' (pick_up), '0x005B345F' (put_down)
};

// =============================================================================
// === Unit Status Flags (uint16 at unit record offset +0x04) ===
// =============================================================================
// Binary-extracted from all blocks referencing DAT_006560F4.
// The flag word is split in save files as two bytes: byte +4 (low) and byte +5 (high).
// Master Reference calls these "movement flags" (byte +4) and "status flags" (byte +5).
export const UNIT_STATUS_FLAGS = {
  // --- Byte +4 (low byte, bits 0-7) ---
  IMMOBILE:            0x0002,  // bit 1: unit is immobile / spy mission in progress
                                //   Set by: FUN_004c8a78 (diplomat/spy action start) line 2674: flags |= 2
                                //   Cleared by: FUN_00486c27 (turn start) when counter2 expires (& 0xfffd)
                                //   Also cleared on espionage resolution (block_004A0000.c:3440)
                                //   While set, unit.counter2 counts down; at 0 the mission resolves
                                //   and treaty flag 0x1000000 is cleared
                                //   sourceAddr: block_004C0000.c:2674, block_00480000.c:1777, block_004A0000.c:3440
  BORDER_CHECKED:      0x0004,  // bit 2: unit has been counted in border intrusion check this pass
                                //   Set by: FUN_0055bbc0 (calc_war_readiness) line 4812: flags |= 4
                                //   Cleared by: FUN_00560084 (diplomacy turn start) line 347: flags &= 0xfffb
                                //   Also cleared at turn start: block_00480000.c:1771
                                //   Prevents double-counting units in the border threat scoring loop
                                //   sourceAddr: block_00550000.c:4812, block_00560000.c:347
  PARADROP_USED:       0x0010,  // bit 4: paratrooper has launched this turn (cannot paradrop again)
                                //   Set by: FUN_004c7fb3 (paradrop execution) line 3398: flags |= 0x10
                                //   Checked by: FUN_0058d60a (paradrop UI) line 4439: prevents re-paradrop
                                //   Also checked in combat (block_00570000.c:5310): affects combat calcs
                                //   Cleared at turn start with the 0xffaf mask (block_00480000.c:2299)
                                //   sourceAddr: block_004C0000.c:3398, block_00580000.c:4439
  BORDER_SEEN:         0x0020,  // bit 5: unit has been seen by foreign civ (border intrusion tracking)
                                //   Set by: FUN_0055bbc0 (calc_war_readiness) line 4806: first sighting
                                //   If already set on next scan: increments intruderCount (DAT_006ab5ec)
                                //   Cleared at turn start conditionally (block_00480000.c:1768: & 0xffdf)
                                //   only if bit 2 (BORDER_CHECKED) is not set and turn alignment matches
                                //   sourceAddr: block_00550000.c:4806, block_00480000.c:1764-1768
  FIRST_MOVE:          0x0040,  // bit 6: unit has moved at least once (remains set permanently)
                                //   Set by: FUN_00593b28 (movement execution) line 192: flags |= 0x40
                                //   Cleared after healing (block_00590000.c:270: & 0xffbf) on allied repair
                                //   Cleared at turn start with 0xffaf mask (block_00480000.c:2299)
                                //   sourceAddr: block_00590000.c:192, block_00480000.c:2299
  GOTO_ARRIVED:        0x0080,  // bit 7: unit reached its goto destination
                                //   Set by: FUN_004c5036 (goto resolution) line 1446: flags |= 0x80
                                //   Set by: AI unit assignment (block_00530000.c:1205,5466)
                                //   Cleared by: FUN_004c5036 (goto start) line 1440: flags &= 0xff7f
                                //   sourceAddr: block_004C0000.c:1440,1446, block_00530000.c:1205

  // --- Byte +5 (high byte, bits 8-15) ---
  AI_FORTIFIED:        0x0100,  // bit 8: AI unit is fortified/sleeping and should stay put
                                //   Set by: FUN_00530253 (AI start-of-turn) line 609: flags |= 0x100
                                //     when unit has order fortify(0x01) or sleep(0x02) and attack < 99
                                //   Checked by: FUN_00593b28 (movement) line 1261: if set, re-apply sleep
                                //   Cleared by: FUN_004c7fb3 (paradrop) line 3411: flags &= 0xfeff
                                //   Cleared by: FUN_00593b28 (movement) line 570: flags &= 0xfeff
                                //   sourceAddr: block_00530000.c:609, block_00590000.c:1261,570
  AI_SETTLER_ROLE:     0x0200,  // bit 9: AI settler — assigned to settler automation role
                                //   Set by: FUN_00530253 (AI start-of-turn) line 573: flags |= 0x200
                                //     when unit role == 5 (settler) and is human-controlled
                                //   Also set at line 581,685 for homeless settlers on ocean
                                //   Checked by: FUN_00560d95 (attitude scoring) lines 3113,3147
                                //   Checked by: FUN_00490530 (unit info display) line 4366
                                //   sourceAddr: block_00530000.c:573,581,685, block_00560000.c:3113
  AI_ATTACK_PATH:      0x0400,  // bit 10: AI unit has a valid attack path to an enemy target
                                //   Set by: FUN_004e7d7f (AI city unit evaluation) line 3054: flags |= 0x400
                                //     when the unit's attack evaluation changes (DAT_006a65e4 modified)
                                //   Checked by: FUN_00500000 city view (line 2524) for attack display
                                //     with additional check for wonder 0x15 (Leonardo's Workshop)
                                //   sourceAddr: block_004E0000.c:3054, block_00500000.c:2524
  AI_MOBILIZED:        0x0800,  // bit 11: AI unit is mobilized for city defense / production allocation
                                //   Set by: FUN_004e7d7f (AI city unit evaluation) line 3007: flags |= 0x800
                                //     when unit passes production eligibility check
                                //   Checked by: FUN_00500000 city view (line 2521) for support display
                                //   Both 0x800 and 0x400 cleared together at start of evaluation:
                                //     flags &= 0xf3ff (line 3002)
                                //   sourceAddr: block_004E0000.c:3002,3007, block_00500000.c:2521
  GOTO_NUCLEAR_TARGET: 0x1000,  // bit 12: unit is on a goto path for nuclear strike
                                //   Set by: FUN_005b4f8d (nuclear goto assignment) line 2283: flags |= 0x1000
                                //     when param_2 == 0 (direct nuclear targeting, not standard goto)
                                //   sourceAddr: block_005B0000.c:2283
  VETERAN:             0x2000,  // bit 13: veteran status — +50% combat bonus
                                //   Set by: combat victory, barracks, spy survival, wonder effects
                                //   Checked in: combat (block_00570000.c:5307,5394,5552),
                                //     espionage (block_004C0000.c:1842,1883,2487,2561,2664,2747,2818),
                                //     AI unit evaluation (block_00560000.c:2952,3119,3170),
                                //     production (block_004E0000.c:5217-5241,5363),
                                //     city view display (block_00580000.c:4860),
                                //     settler work (block_004F0000.c:3886)
                                //   sourceAddr: many — central to combat, espionage, production
  SHIP_WAKE_SENTRIES:  0x4000,  // bit 14: ship movement — wake sentried land units when ship moves
                                //   Set by: FUN_0058bdfd (ship key handler) line 3708: flags |= 0x4000
                                //   Set by: FUN_0058de67 (ship move) line 4664: flags |= 0x4000
                                //     when unit domain == sea (domain check at line 4663)
                                //   Cleared at turn start: flags &= 0xbfff (block_00480000.c:1763)
                                //   sourceAddr: block_00580000.c:3708,4664, block_00480000.c:1763
  SETTLER_AUTOMATE:    0x8000,  // bit 15: settler/engineer automation active
                                //   Set by: FUN_0058df14 (automate settler) line 4701: flags |= 0x8000
                                //     only for unit role == 5 (settler type)
                                //   Checked by: FUN_005b6787 (unit display/refresh) — triggers automation
                                //   Cleared by: FUN_00580000 (various) line 4414: flags &= 0x7fff
                                //   Cleared by: block_00590000.c:1225, block_004A0000.c:4676,4686
                                //   Used extensively in unit movement (block_00590000.c:158,167,207,283,337,350,1254)
                                //     and AI settler logic (block_00560000.c:2936,3124,3881,3916)
                                //   sourceAddr: block_00580000.c:4701 (set), block_00580000.c:4414 (clear)

  // --- Turn-start clear masks ---
  TURN_START_CLEAR_MASK: 0xFFAF,
    // Applied at FUN_00486c27 start-of-turn (block_00480000.c:2299): clears FIRST_MOVE(0x40) + PARADROP_USED(0x10)
    // Does NOT clear other flags; those are cleared conditionally

  AI_EVAL_CLEAR_MASK: 0xF3FF,
    // Applied at FUN_004e7d7f AI city eval start (block_004E0000.c:3002):
    // clears AI_ATTACK_PATH(0x400) + AI_MOBILIZED(0x800) before re-evaluation

  // sourceAddr: multiple blocks — see individual flag entries above
};

// =============================================================================
// === Unit Limits ===
// =============================================================================
// Extracted from FUN_005b2590 (validate_stack) and FUN_005b3d06 (create_unit)
export const UNIT_LIMITS = {
  MAX_UNITS_ASSERT: 0x801,    // @ FUN_005b2590: assert param_1 < MAX_UNITS (0x801 = 2049)
  MAX_UNIT_SLOTS:   0x800,    // @ FUN_005b3d06: hard cap on DAT_00655b16 (num_unit_slots)
  HUMAN_SOFT_CAP:   0x7F7,    // @ FUN_005b3d06: human player soft cap (2039 units)
  AI_PER_CIV_CAP:   0x79C,    // @ FUN_005b3d06: per-civ unit support cap (1948) checked as int16
  INFINITE_STACK_LIMIT: 0x7FF, // @ FUN_005b2590: stack count >= 0x7FF triggers infinite stack recovery
  BARBARIAN_SLOT: 0x800,       // unit slot 0x800 (2048) reserved for barbarian temp unit
  DEAD_UNIT_ID: 0,             // @ FUN_005b4391: set DAT_0065610A = 0 to mark unit dead
  DEAD_COORD: -1,              // @ pick_up_unit: dead units get x,y set to formula: (owner*4+4)*-0x19
  NUM_UNIT_SLOTS_GLOBAL: 'DAT_00655B16', // runtime count of allocated unit slots
  // sourceAddr: '0x005B2590' (validate), '0x005B3D06' (create), '0x005B4391' (delete)
};

// =============================================================================
// === Unit Type Record (0x14 = 20 bytes per type) ===
// =============================================================================
// Runtime base: DAT_0064B1B8 (unit type array)
// Stride: 0x14 (20 bytes). 62 unit types (0..0x3D).
// Field offsets extracted from movement functions and unit stat queries.
export const UNIT_TYPE_FIELDS = {
  STRIDE: 0x14,           // 20 bytes per unit type
  BASE_ADDR: 'DAT_0064B1B8',
  COUNT: 0x3E,            // 62 unit types (loop at FUN_005b0473 case 0: local_20 < 0x3e)
  fields: {
    name:         { offset: 0x00, size: 4, type: 'ptr',   addr: 'DAT_0064B1B8', note: 'pointer to name string' },
    flagsA:       { offset: 0x04, size: 1, type: 'uint8', addr: 'DAT_0064B1BC', note: 'flags A (bit 0x80=settler, 0x20=no sea bonus, 0x08=invis, 0x10=paradrop)' },
    flagsB:       { offset: 0x05, size: 1, type: 'uint8', addr: 'DAT_0064B1BD', note: 'flags B (bit 0x10=can carry aircraft)' },
    // offset 0x06..0x08: various bitfields
    domain:       { offset: 0x09, size: 1, type: 'int8',  addr: 'DAT_0064B1C1', note: 'domain (0=ground, 1=air, 2=sea)' },
    cargoCapacity:{ offset: 0x0A, size: 1, type: 'int8',  addr: 'DAT_0064B1C2', note: 'base cargo capacity (ships only, 0 for non-carriers)' },
    range:        { offset: 0x0B, size: 1, type: 'int8',  addr: 'DAT_0064B1C3', note: 'range (air units: > 1 means multi-range)' },
    attack:       { offset: 0x0C, size: 1, type: 'int8',  addr: 'DAT_0064B1C4', note: 'attack strength' },
    defense:      { offset: 0x0D, size: 1, type: 'int8',  addr: 'DAT_0064B1C5', note: 'defense strength' },
    movePoints:   { offset: 0x0E, size: 1, type: 'int8',  addr: 'DAT_0064B1C6', note: 'base movement points (MP, in thirds)' },
    firepower:    { offset: 0x0F, size: 1, type: 'int8',  addr: 'DAT_0064B1C7', note: 'firepower (read from RULES.TXT; used in combat, cost calcs, and unit info display)' },
    hitPoints:    { offset: 0x10, size: 1, type: 'int8',  addr: 'DAT_0064B1C8', note: 'hit points' },
    holdCapacity: { offset: 0x11, size: 1, type: 'int8',  addr: 'DAT_0064B1C9', note: 'hold capacity (ships: cargo capacity for loading calc)' },
    role:         { offset: 0x12, size: 1, type: 'int8',  addr: 'DAT_0064B1CA', note: 'AI role (0..4=military, 5=settler, 7=trade)' },
    // offset 0x13: padding
  },
  // sourceAddr: '0x005B29AA' (get_max_mp), '0x005B2A39' (get_total_mp), '0x005B0473' (editor list)
};

// =============================================================================
// === Map Header & Tile Structure ===
// =============================================================================
// Extracted from FUN_005b7fe0 (map_alloc), FUN_005b8635 (map_write),
// FUN_005b8783 (map_read), FUN_005b8931 (tile_access).
export const MAP_STRUCTURE = {
  // --- Map header (0x0E = 14 bytes, written/read by map I/O) ---
  HEADER_SIZE: 0x0E,           // @ FUN_005b8635: _fwrite(&DAT_006d1160, 0xe, 1, file)
  HEADER_ADDR: 'DAT_006D1160',
  headerFields: {
    mapWidth:       { offset: 0x00, addr: 'DAT_006D1160', note: 'map width in tiles (even number)' },
    mapHeight:      { offset: 0x02, addr: 'DAT_006D1162', note: 'map height in tiles' },
    tileCount:      { offset: 0x04, addr: 'DAT_006D1164', note: '(width/2) * height — total flat tile count' },
    flatEarthFlag:  { offset: 0x06, addr: 'DAT_006D1166', note: 'flat earth bitmask (0x8000 = flat earth)' },
    resourceSeed:   { offset: 0x08, addr: 'DAT_006D1168', note: 'resource generation seed (uint16, 0x0001..0x7FFF)' },
    quadWidth:      { offset: 0x0A, addr: 'DAT_006D116A', note: '(mapWidth+3) >> 2 — quadrant width' },
    quadHeight:     { offset: 0x0C, addr: 'DAT_006D116C', note: '(mapHeight+3) >> 2 — quadrant height' },
  },

  // --- Per-tile data (6 bytes per tile) ---
  BYTES_PER_TILE: 6,           // @ FUN_005b7fe0: DAT_006d1164 * 6
  TILE_BASE_ADDR: 'DAT_00636598',
  tileFields: {
    terrain:     { offset: 0, size: 1, note: 'byte 0: terrain type. Low nibble = base terrain (0..15), bit 0x40 = grassland bonus, bit 0x80 = impassable/mountain flag used in pathfinding (FUN_004f03b7 line 144: if (*tile & 0x80) == 0 and unit cannot cross mountains, path is blocked)' },
    improvements:{ offset: 1, size: 1, note: 'byte 1: improvements bitfield. bit 0x01 = unit present, 0x02 = city, 0x04 = irrigation, 0x08 = mine, 0x10 = road, 0x20 = railroad, 0x40 = fortress, 0x80 = pollution. Farmland = irrigation+mine (0x0C). Airbase = fortress+city (0x42).' },
    landmass:    { offset: 2, size: 1, note: 'byte 2: bits 5-7 = continent/ocean ID (top 3 bits), low 5 bits = other flags' },
    cityId:      { offset: 3, size: 1, note: 'byte 3: city index on tile (-1 / 0xFF = no city)' },
    visibility:  { offset: 4, size: 1, note: 'byte 4: per-civ visibility bitmask (1 bit per civ, up to 8)' },
    ownerUnit:   { offset: 5, size: 1, note: 'byte 5: low nibble = continent ID extension, high nibble = unit owner civ (0xF = no owner)' },
  },

  // --- Tile access formula ---
  // @ FUN_005b8931: tile_ptr = base + (mapWidth & 0xFFFFFFFE) * y * 3 + (x & 0xFFFFFFFE) * 3
  tileAccessFormula: '(mapWidth & ~1) * y * 3 + (x & ~1) * 3 + DAT_00636598',

  // --- Visibility layers (per-civ, 1 byte per tile, 7 layers for civs 1..7) ---
  VISIBILITY_LAYERS: 7,        // @ FUN_005b7fe0: for local_18 = 1; local_18 < 8
  visibilityHandles: 'DAT_006365A0',  // primary per-civ visibility map handles (memory alloc handles)
                                      //   DAT_006365A0[civ*4] = memory handle for civ's visibility layer
                                      //   Allocated by FUN_004bb870, locked by FUN_0046aad0.
  visibilityBaseAddr: 'DAT_006365C0', // secondary per-civ visibility map pointers (locked addresses)
                                      //   DAT_006365C0[civ*4] = pointer to civ's visibility byte array
                                      //   Accessed by FUN_005b898b: addr = DAT_006365C0[civ*4]
                                      //     + (mapWidth/2) * y + (x/2)
                                      //   Each byte represents visibility state for one tile for that civ.
                                      //   Written during map save (FUN_005b8635 line 3123: fwrite per civ),
                                      //   read during map load (FUN_005b8783 line 3186: fread per civ).
                                      //   sourceAddr: block_005B0000.c lines 2979, 3123, 3186, 3232

  // --- Quadrant layers (4 layers, quadWidth * quadHeight each) ---
  QUADRANT_LAYERS: 4,          // @ FUN_005b7fe0: DAT_006365E0..DAT_006365EC
  quadrantAddrs: ['DAT_006365E0', 'DAT_006365E4', 'DAT_006365E8', 'DAT_006365EC'],

  // --- Scenario map extras ---
  // @ FUN_005b8635/005b8783: if param_2 != 0 (scenario), write/read 0x2A bytes × 2
  SCENARIO_EXTRA_SIZE: 0x2A,   // 42 bytes per block, 2 blocks
  SCENARIO_EXTRA_ADDR1: 'DAT_00627FE0',
  SCENARIO_EXTRA_ADDR2: 'DAT_00628010',

  // --- Default terrain initialization ---
  DEFAULT_TERRAIN: 10,         // @ FUN_005b7fe0: tiles initialized with terrain byte = 10 (ocean)
  DEFAULT_OTHER_BYTES: 0,      // @ FUN_005b7fe0: bytes 1..5 initialized to 0

  // --- Resource seed generation ---
  // @ FUN_005b85fe: seed = GetTickCount() & 0x7FFF; if seed == 0: seed = 1
  RESOURCE_SEED_MASK: 0x7FFF,
  RESOURCE_SEED_MIN: 1,

  // sourceAddr: '0x005B7FE0' (alloc), '0x005B8635' (write), '0x005B8783' (read),
  //             '0x005B8931' (tile_access), '0x005B85FE' (seed_init)
};

// =============================================================================
// === Direction Tables (8-neighbor offsets) ===
// =============================================================================
// Used throughout unit movement, adjacency checks, nuclear fallout, visibility.
// DAT_00628350 = dx table (8 entries + center for 9th)
// DAT_00628360 = dy table (8 entries + center for 9th)
// Extracted from FUN_005b9179 (nuclear_fallout), FUN_005b49cf, FUN_005b4b66, etc.
export const DIRECTION_TABLES = {
  DX_ADDR: 'DAT_00628350',
  DY_ADDR: 'DAT_00628360',
  // 8 directions indexed 0..7, plus index 8 = center (0,0) for nuclear fallout
  // Standard Civ2 order: N, NE, E, SE, S, SW, W, NW
  // The 9th entry (index 8) is the center tile (dx=0, dy=0) used in nuclear fallout loop
  NEIGHBOR_COUNT: 8,           // standard adjacency
  WITH_CENTER_COUNT: 9,        // @ FUN_005b9179: for local_8 = 0; local_8 < 9
  // sourceAddr: '0x005B9179' (nuclear_fallout), '0x005B49CF' (check_adjacent_enemy)
};

// =============================================================================
// === Game Options Flags (DAT_00655AEA) ===
// =============================================================================
// Binary ref: FUN_004e0ab0 (GAMEOPTIONS dialog, 705 bytes),
//             FUN_004e0d71 (GRAPHICOPTIONS dialog, 423 bytes) @ block_004E0000.c
// Runtime addr: DAT_00655AEA — persisted to save as DAT_0064BC1E
export const GAME_OPTIONS_FLAGS = {
  RUNTIME_ADDR: 'DAT_00655AEA',
  PERSIST_ADDR: 'DAT_0064BC1E',

  // --- Game Options (GAMEOPTIONS dialog) ---
  // Clear mask on dialog open: 0xFFFF8027 (preserves bits 0..2, 5, 15+)
  gameOptionsClearMask: 0xFFFF8027,
  gameOptions: {
    0x0010: { index: 0, name: 'Simplified Combat' },      // checkbox 0
    0x0008: { index: 1, name: 'Auto Sound' },              // checkbox 1
    0x4000: { index: 2, name: 'Tutorial Help' },           // checkbox 2
    0x2000: { index: 3, name: 'Move Units With Mouse' },   // checkbox 3
    0x1000: { index: 4, name: 'Enter Closes City Screen' },// checkbox 4
    0x0800: { index: 5, name: 'Fast Piece Slide' },        // checkbox 5
    0x0400: { index: 6, name: 'No Pause After Enemy Moves' }, // checkbox 6
    0x0200: { index: 7, name: 'Show Enemy Moves' },        // checkbox 7
    0x0100: { index: 8, name: 'Auto-Save' },               // checkbox 8
    0x0080: { index: 9, name: 'Always Wait At End Of Turn' }, // checkbox 9
    0x0040: { index: 10, name: 'Cheat Mode' },             // checkbox 10
  },

  // --- Graphic Options (GRAPHICOPTIONS dialog) ---
  // Clear mask on dialog open: 0xFFC0FFFF (preserves bits 0..15, 22+)
  graphicOptionsClearMask: 0xFFC0FFFF,
  graphicOptions: {
    0x020000: { index: 0, name: 'Animated Heralds' },
    0x040000: { index: 1, name: 'High Council' },
    0x200000: { index: 2, name: 'Civilopedia for Advances' },  // also checks 0x800000 memory
    0x080000: { index: 3, name: 'Throne Room' },
    0x100000: { index: 4, name: 'Diplomacy Screen' },
    0x010000: { index: 5, name: 'Wonder Movies' },
  },

  sourceAddr: '0x004E0AB0',
};

// =============================================================================
// === Message/Notification Suppression Flags (DAT_00655AF2) ===
// =============================================================================
// Binary ref: FUN_004e1452 (MESSAGEOPTIONS dialog, 785 bytes) @ block_004E0000.c
// Runtime addr: DAT_00655AF2 — persisted as DAT_0064BC22
// NOTE: flags are INVERTED — bit SET means message is SUPPRESSED
export const MESSAGE_OPTIONS_FLAGS = {
  RUNTIME_ADDR: 'DAT_00655AF2',
  PERSIST_ADDR: 'DAT_0064BC22',

  // Bit 0 is special: inverted via ~DAT_00655af2 & 1 on init
  flags: {
    0x001: { index: 0, name: 'Show City Production Complete',  inverted: true },
    0x002: { index: 1, name: 'Suppress Wonder Built' },
    0x004: { index: 2, name: 'Suppress City Grows' },
    0x008: { index: 3, name: 'Suppress City Shrinks' },
    0x010: { index: 4, name: 'Suppress Disorder' },
    0x020: { index: 5, name: 'Suppress Order Restored' },
    0x040: { index: 6, name: 'Suppress WLtKD' },
    0x080: { index: 7, name: 'Suppress Food Shortage' },
    0x100: { index: 8, name: 'Suppress Pollution' },
    0x200: { index: 9, name: 'Suppress Enemy Sighting' },
    0x400: { index: 10, name: 'Suppress City Capture' },
  },

  sourceAddr: '0x004E1452',
};

// =============================================================================
// === Tutorial / First-Time Event Flags (DAT_00655AF4) ===
// =============================================================================
// Binary ref: initialized to 0 at game start (block_004A0000.c:3551),
//             set bits prevent tutorial popups from showing again.
// Each bit tracks whether a specific "first time" tutorial event has been shown.
// Only triggers when Tutorial Help is enabled (DAT_00655AEA byte+1 bit 0 set).
export const TUTORIAL_FLAGS = {
  RUNTIME_ADDR: 'DAT_00655AF4',

  flags: {
    CITY_STUFF:       0x01,   // bit 0: city management tutorial shown
                              //   Triggers when: tutorial enabled AND city.size > 3 AND city not owned by human
                              //   Shows: TUTORIAL / CITYSTUFF dialog
                              //   sourceAddr: block_00500000.c:4313-4316
    AIR_UNIT:         0x02,   // bit 1: air unit tutorial shown
                              //   Triggers when: first air-domain unit built (domain == 1)
                              //   Shows: TUTORIAL / AIRUNIT dialog
                              //   sourceAddr: block_005B0000.c:1503-1508
    SHIPS:            0x04,   // bit 2: sea unit tutorial shown
                              //   Triggers when: first sea-domain unit built (domain == 2)
                              //   Shows: TUTORIAL / SHIPS dialog
                              //   sourceAddr: block_005B0000.c:1495-1500
    CARAVAN:          0x10,   // bit 4: caravan/trade unit tutorial shown
                              //   Triggers when: first trade unit built (role == 7)
                              //   Shows: TUTORIAL / CARAVAN dialog
                              //   sourceAddr: block_005B0000.c:1511-1516
    DEMOCRACY:        0x20,   // bit 5: democracy government tutorial shown
                              //   Triggers when: government > 4 (Republic or Democracy adopted)
                              //   Shows: TUTORIAL / DEMOCRATS dialog
                              //   sourceAddr: block_00550000.c:5053-5056
  },

  // NOTE: bits 0x08 (3) and other gaps are not observed in the binary
  sourceAddr: 'block_004A0000.c:3551 (init), block_005B0000.c:1494-1517 (unit creation), ' +
              'block_00500000.c:4312-4316 (city view), block_00550000.c:5053-5056 (government)',
};
