// ═══════════════════════════════════════════════════════════════════
// mem.js — Binary memory layout for Civ2 MGE (civ2.exe)
//
// MECHANICAL TRANSPILATION OF CIV2.EXE DECOMPILED C CODE
//
// This file defines the flat memory regions that mirror the binary's
// global data layout. Functions in this directory access these arrays
// using the same stride arithmetic as the original x86 code.
//
// IMPORTANT: Inferred names (in comments) are BEST GUESSES based on
// observed behavior. They should NOT be trusted blindly. If something
// seems wrong, go back to the decompiled C source in
// reverse_engineering/decompiled/ and re-examine the raw code.
//
// Source of truth: reverse_engineering/decompiled/block_*.c
// ═══════════════════════════════════════════════════════════════════

// ── Signed/unsigned byte interpretation helpers ──
// The binary uses mixed signed/unsigned byte reads extensively.
// These replicate C's (char) and (byte) casts.
export function s8(val) { return (val & 0x80) ? (val | 0xFFFFFF00) : (val & 0xFF); }
export function u8(val) { return val & 0xFF; }
export function s16(arr, off) {
  const v = (arr[off + 1] << 8) | arr[off];
  return (v & 0x8000) ? (v | 0xFFFF0000) : v;
}
export function u16(arr, off) { return (arr[off + 1] << 8) | arr[off]; }
export function s32(arr, off) {
  const v = arr[off] | (arr[off + 1] << 8) | (arr[off + 2] << 16) | (arr[off + 3] << 24);
  return v | 0;  // sign-extend via bitwise OR
}
export function u32(arr, off) {
  return (arr[off] | (arr[off + 1] << 8) | (arr[off + 2] << 16) | (arr[off + 3] << 24)) >>> 0;
}
export function w16(arr, off, val) {
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
}
export function w32(arr, off, val) {
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
  arr[off + 2] = (val >> 16) & 0xFF;
  arr[off + 3] = (val >> 24) & 0xFF;
}

// ═══════════════════════════════════════════════════════════════════
// MEMORY REGIONS
//
// Each region is a flat Uint8Array that mirrors the binary's memory.
// Access pattern: DAT_XXXXXXXX[index] in C → REGION[index] in JS
// where REGION corresponds to the base address.
// ═══════════════════════════════════════════════════════════════════

// ── Unit type table (from RULES.TXT @UNITS section) ──
// Base: DAT_0064b1bc, stride: 0x14 (20 bytes per unit type), 52 types
// Fields per entry:
//   +0x00 (DAT_0064b1bc): flagsA (byte)
//   +0x01 (DAT_0064b1bd): flagsB (byte)
//   +0x02 (DAT_0064b1be): prereq tech low (byte)
//   +0x03 (DAT_0064b1bf): prereq tech high (byte)
//   +0x04 (DAT_0064b1c0): obsolete tech (byte)
//   +0x05 (DAT_0064b1c1): domain (0=land, 1=air, 2=sea)
//   +0x06 (DAT_0064b1c2): move rate
//   +0x07 (DAT_0064b1c3): range (fuel/vision)
//   +0x08 (DAT_0064b1c4): attack
//   +0x09 (DAT_0064b1c5): defense
//   +0x0A (DAT_0064b1c6): hit points
//   +0x0B (DAT_0064b1c7): firepower
//   +0x0C (DAT_0064b1c8): cost (low byte)
//   +0x0D (DAT_0064b1c9): cost (high byte) or hold/carry
//   +0x0E (DAT_0064b1ca): role
//   +0x0F-0x13: padding/other fields
export const DAT_0064b1bc = new Uint8Array(52 * 0x14);

// ── Terrain table (from RULES.TXT @TERRAIN section) ──
// Base: DAT_00627cc0 (approximate), stride: 0x18 (24 bytes per terrain), 11 terrains
// Fields per entry (offsets from base):
//   +0x00: food yield
//   +0x01: shields yield
//   +0x02: trade yield
//   +0x03: defense bonus
//   +0x04: movement cost
//   +0x05: category (inland/coastal/ocean)
//   +0x06-0x07: unknown
//   +0x08: irrigation food bonus
//   +0x09: irrigation turns to complete
//   +0x0A: mining shields bonus
//   +0x0B: mining turns to complete
//   +0x0C: transform-to terrain
//   +0x0D: unknown
//   +0x0E (DAT_00627cce): irrigation transform terrain (-1 = no transform, just bonus)
//   +0x0F:               mining transform terrain (-1 = no transform, just bonus)
//   +0x10-0x13: unknown
//   +0x14 (DAT_00627cd4): irrigation requirement/turns/bonus (used in check_can_improve)
//   +0x15 (DAT_00627cd5): mining requirement/turns/bonus (used in check_can_improve)
//   +0x16-0x17: unknown
//
// NOTE: The exact meaning of offsets 0x0E and 0x14 needs further
// investigation. The binary uses them in FUN_005b68f6 to decide
// irrigate vs mine. Values populated from RULES.TXT parsing.
export const DAT_00627cc0 = new Uint8Array(11 * 0x18);
// Convenience aliases for field access at known offsets from base
export const DAT_00627cce = new Uint8Array(DAT_00627cc0.buffer, 0x0E);
export const DAT_00627cd4 = new Uint8Array(DAT_00627cc0.buffer, 0x14);
export const DAT_00627cd5 = new Uint8Array(DAT_00627cc0.buffer, 0x15);

// ── Unit instances ──
// Base: DAT_006560f0, stride: 0x20 (32 bytes per unit), up to 2048 units
// Fields per entry:
//   +0x00 (DAT_006560f0): x position (int16, doubled-X)
//   +0x02 (DAT_006560f2): y position (int16)
//   +0x04 (DAT_006560f4): status flags (uint16)
//   +0x06 (DAT_006560f6): unit type (byte)
//   +0x07 (DAT_006560f7): owner civ (byte)
//   +0x08 (DAT_006560f8): moves spent (byte)
//   +0x09 (DAT_006560f9): hp lost / visibility (byte)
//   +0x0A (DAT_006560fa): moves remain / damage (byte)
//   +0x0B (DAT_006560fb): last direction (byte)
//   +0x0C (DAT_006560fc): shield charge / counter (byte)
//   +0x0D (DAT_006560fd): special (commodity/fuel/work turns) (byte)
//   +0x0E (DAT_006560fe): counter2 (byte, nonzero = dead)
//   +0x0F (DAT_006560ff): order byte (0xFF=none, 0x01=fortifying, etc.)
//   +0x10 (DAT_00656100): home city (byte)
//   +0x12 (DAT_00656102): goto X (int16)
//   +0x14 (DAT_00656104): goto Y (int16)
//   +0x16 (DAT_00656106): prev in stack (int16)
//   +0x18 (DAT_00656108): next in stack (int16)
//   +0x1A (DAT_0065610a): unit ID (int32, 0 = dead/empty)
export const DAT_006560f0 = new Uint8Array(2048 * 0x20);

// ── Per-civ data ──
// Base: DAT_0064c600, stride: 0x594 (1428 bytes per civ), 8 civs
// Selected fields:
//   +0xB5 (DAT_0064c6b5): government type or difficulty level
//   +0xF8 (DAT_0064c6f8): tech bitmask array (13 bytes = 104 bits)
//   ... hundreds of other fields
export const DAT_0064c600 = new Uint8Array(8 * 0x594);
// Aliases for frequently accessed offsets
export const DAT_0064c6b5 = new Uint8Array(DAT_0064c600.buffer, 0xB5);
export const DAT_0064c6f8 = new Uint8Array(DAT_0064c600.buffer, 0xF8);

// ── City data ──
// Base: DAT_0064f340, stride: 0x58 (88 bytes per city), up to 256 cities
// Selected fields:
//   +0x00 (DAT_0064f340): city X (int16)
//   +0x02 (DAT_0064f342): city Y (int16)
//   +0x04 (DAT_0064f344): city flags (uint32)
//   +0x08 (DAT_0064f348): owner civ (byte)
//   +0x09 (DAT_0064f349): city size (byte)
//   +0x54 (DAT_0064f394): city exists/production (int32, 0 = dead)
export const DAT_0064f340 = new Uint8Array(256 * 0x58);

// ── Map tile data ──
// Accessed via FUN_005b8931 (get_tile_data_ptr)
// Each tile: 6 bytes (3 * 2, formula: y * mw2 * 3 + (x & ~1) * 3 + base)
// Tile byte layout:
//   byte[0]: terrain (low nibble) + special resource flag (bit 6) + river (bit 7)
//   byte[1]: improvements bitfield (bit 2=irrigation, bit 3=mining, bit 4=road,
//            bit 5=railroad, bit 6=fortress, bit 7=pollution)
//   byte[2]-byte[5]: visibility, city ownership, other flags
export let DAT_00636598 = 0;   // tile data base pointer (set during init)
export let DAT_006d1188 = new Uint8Array(6); // dummy tile for out-of-bounds

// ── Map dimensions ──
export let DAT_006d1160 = 0;   // map width (doubled-X, = mw * 2)
export let DAT_006d1162 = 0;   // map height

// ── Map seed / resource seed ──
export let DAT_006d1168 = 0;   // resource generation seed

// ── Game flags ──
export let DAT_00655ae8 = 0;   // map shape flags (bit 15 = flat earth / no wrap)
export let DAT_00655b0b = 0;   // human player bitmask
export let DAT_00655b16 = 0;   // total unit count
export let DAT_00655b18 = 0;   // total city count
export let DAT_00636058 = 0;   // unit lookup optimization flag

// ── Cosmic parameters ──
export let DAT_0064bcc8 = 3;   // movement multiplier (COSMIC_TECH_MULTIPLIER default)
export let DAT_00654fae = 0;   // unknown game flag (used in check_can_improve)

// ── Direction offset tables ──
// Used by check_adjacent_water, neighbor enumeration, etc.
// 4-direction offsets (N, E, S, W in doubled-X coordinates)
export const DAT_0062833c = new Int8Array([0, 2, 0, -2, 0]);  // dx for 4+1 directions
export const DAT_00628344 = new Int8Array([-2, 0, 2, 0, 0]);  // dy for 4+1 directions
// 8-direction offsets (N, NE, E, SE, S, SW, W, NW in doubled-X)
export const DAT_00628350 = new Int8Array([-1, 1, 2, 1, -1, -1, -2, -1]); // dx
export const DAT_00628360 = new Int8Array([-1, -1, 0, 1, 1, 1, 0, -1]);   // dy

// ═══════════════════════════════════════════════════════════════════
// MAP TILE ACCESS
//
// The binary stores map tiles as a flat array of 6-byte records.
// Tiles are addressed by doubled-X coordinates.
// FUN_005b8931 (get_tile_data_ptr) returns a pointer to a tile's
// 6-byte record. We simulate this with an array + offset.
// ═══════════════════════════════════════════════════════════════════

let _tileData = null;  // set by initMapTiles

export function initMapTiles(tileArray) {
  _tileData = tileArray;
}

// Simulates pointer arithmetic: returns offset into _tileData
// Equivalent to C returning (byte*) pointer
export function getTileOffset(param_1, param_2) {
  // FUN_005b8931 formula: ((mw2 & ~1) * param_2 * 3) + ((param_1 & ~1) * 3) + base
  if (!FUN_004087c0(param_1, param_2)) return -1; // out of bounds → dummy tile
  const mw2 = DAT_006d1160 & 0xFFFFFFFE;
  return mw2 * param_2 * 3 + (param_1 & 0xFFFFFFFE) * 3;
}

export function tileRead(offset, byteIdx) {
  if (offset < 0 || !_tileData) return DAT_006d1188[byteIdx];
  return _tileData[offset + byteIdx];
}

export function tileWrite(offset, byteIdx, value) {
  if (offset >= 0 && _tileData) _tileData[offset + byteIdx] = value;
}

// ═══════════════════════════════════════════════════════════════════
// INITIALIZATION
//
// Call these to populate memory regions from parsed game data.
// This bridges the gap between the engine's JS data model and the
// binary's flat memory layout.
// ═══════════════════════════════════════════════════════════════════

/**
 * Set map dimensions (must be called before any tile access).
 * @param {number} mw - map width (gx coordinates)
 * @param {number} mh - map height
 * @param {number} mapShape - 0=round earth, 1=flat earth
 * @param {number} seed - resource seed
 */
export function setMapDimensions(mw, mh, mapShape, seed) {
  DAT_006d1160 = mw * 2;  // doubled-X width
  DAT_006d1162 = mh;
  DAT_00655ae8 = mapShape === 1 ? 0x8000 : 0;  // bit 15 = flat earth
  DAT_006d1168 = seed || 0;
}

/**
 * Set global game parameters.
 * @param {number} humanMask - bitmask of human-controlled civs
 * @param {number} unitCount - total active units
 * @param {number} cityCount - total active cities
 * @param {number} movementMultiplier - cosmic movement multiplier (default 3)
 */
export function setGameParams(humanMask, unitCount, cityCount, movementMultiplier) {
  DAT_00655b0b = humanMask;
  DAT_00655b16 = unitCount;
  DAT_00655b18 = cityCount;
  DAT_0064bcc8 = movementMultiplier || 3;
}
