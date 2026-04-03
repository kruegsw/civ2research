#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// test-fresh-game.js — Run a fresh game from scratch and narrate
//
// Usage: node charlizationv4/test-fresh-game.js [--turns N]
//
// Sets up a minimal world (2 AI civs, grassland map, 1 city each)
// and runs the turn pipeline, logging what happens each turn.
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { v, wv, w16, w32, s16, s32, u8, _MEM } from './mem.js';
import { G } from './globals.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';
import { readFileSync, existsSync } from 'fs';

const turns = parseInt(process.argv.find((a,i,arr) => arr[i-1] === '--turns') || '10');

// ── Load rules ──
initBinaryConstants();
const rPath = '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT';
if (existsSync(rPath)) {
  loadRules(readFileSync(rPath, 'utf8'));
  console.log('Rules loaded.');
} else {
  console.error('RULES.TXT not found — terrain yields will be wrong');
}

// ── Initialize game state ──
const { FUN_004aa9c0 } = await import('./blocks/block_004A0000.js');
const { loopReset } = await import('./mem.js');
loopReset();
try { FUN_004aa9c0(); } catch(e) { /* init errors are OK — UI-related */ }

// ── Map setup: 50x40 grassland ──
const MW = 50, MH = 40, mw2 = MW * 2;
w16(DAT_006d1160, 0, mw2);
w16(DAT_006d1162, 0, MH);
wv(DAT_006d1168, 42);      // seed
// Difficulty — multiple addresses used:
// DAT_00655b02: Ghidra C code checks (if DAT_00655b02 < 3, etc.)
// DAT_00655b04: sniffing confirmed live difficulty selector (0=Chieftain..5=Deity)
// DAT_00655b08: AI food box formula uses this (food_rows = 13 - difficulty)
const DIFFICULTY = 3; // prince
wv(DAT_00655b02, DIFFICULTY);
_MEM[DAT_00655b02 + 2] = DIFFICULTY; // 0x00655B04
_MEM[DAT_00655b02 + 6] = DIFFICULTY; // DAT_00655b08 — AI food box adjustment

// [FIX 4] Set ALL map dimension derived values (confirmed by sniffing: tile_array.md)
w16(DAT_006d1164, 0, (mw2 / 2) * MH);        // ms = total tiles (e.g. 2000 for 100×40)
w16(DAT_006d1166, 0, 0);                       // mapShape (0 = cylindrical/round earth)
w16(DAT_006d116a, 0, (mw2 + 3) >> 2);         // qw = quarter-width (exploration stride)
w16(DAT_006d116c, 0, MH);                      // qh = quarter-height

// Allocate tile data at end of _MEM (DAT_00636598 is a pointer to tile array)
const TILE_DATA_BASE = _MEM.length - 100000;  // 100KB region at end of buffer
wv(DAT_00636598, TILE_DATA_BASE);             // store pointer to tile data
wv(DAT_006d1188, TILE_DATA_BASE);             // also set "bad tile" pointer (fallback)

// Allocate per-civ exploration maps (DAT_006365c0 array of pointers)
// Each civ gets DAT_006d1164 bytes (total_tiles = 2000 for 100x40 map)
const totalTiles = s32(DAT_006d1164, 0);
const EXPLORE_BASE = TILE_DATA_BASE - 8 * totalTiles - 1000; // before tile data
for (let civ = 0; civ < 8; civ++) {
  const explorePtr = EXPLORE_BASE + civ * totalTiles;
  w32(DAT_006365c0, civ * 4, explorePtr);
  // Initialize: 0 = unexplored (AI will want to explore these)
  for (let j = 0; j < totalTiles; j++) _MEM[explorePtr + j] = 0;
}
// Set the main exploration map pointer (used by some functions)
wv(DAT_006365ec, s32(DAT_006365c0, 0));

// Fill tiles with grassland (terrain type 2)
// Visibility: only tiles near cities are visible (like a real new game)
for (let y = 0; y < MH; y++) {
  for (let x = 0; x < mw2; x += 2) {
    const off = TILE_DATA_BASE + (mw2 & 0xFFFFFFFE) * y * 3 + (x & 0xFFFFFFFE) * 3;
    _MEM[off] = 2;      // terrain = grassland (food=2, shields=1, trade=0)
    _MEM[off + 1] = 0;  // improvements
    _MEM[off + 2] = 0;  // cityRadiusOwner (set per city below)
    _MEM[off + 3] = 1;  // bodyId (continent 1 — all land)
    _MEM[off + 4] = 0;  // visibility: 0 = undiscovered (set near cities below)
    _MEM[off + 5] = 4;  // [FIX 3] fertility=4 in lower nibble (grassland baseline)
  }
}

// ── Place units and cities ──
function placeUnit(idx, type, owner, x, y) {
  const u = DAT_006560f0 + idx * 0x20;
  w16(u, 0, x);         // doubled-X position
  w16(u, 2, y);
  // [FIX 6] Status word: bit 6 = veteran. Sniffing confirmed AI units are veteran at Deity.
  const difficulty = v(DAT_00655b02);
  const isAI = !(v(DAT_00655b0b) & (1 << owner));
  const veteranBit = (isAI && difficulty >= 4) ? 0x40 : 0;
  w16(u, 4, veteranBit); // status (with veteran flag if applicable)
  _MEM[u + 6] = type;   // unit type
  _MEM[u + 7] = owner;
  _MEM[u + 8] = 3;      // moves_remaining (was 0x0A — WRONG, fixed per byte_verification_plan)
  _MEM[u + 0x0A] = 0;   // damage_taken (0 = full health)
  _MEM[u + 0x0D] = 0xFF; // home_city (was 0x10 — WRONG, fixed per byte_verification_plan)
  _MEM[u + 0x0F] = 0xFF; // orders (255 = none)
  w16(u, 0x16, -1);     // prev in stack
  w16(u, 0x18, -1);     // next in stack
  w32(u, 0x1A, idx + 1); // unit ID (non-zero)
}

function placeCity(idx, owner, name, x, y, size) {
  const c = DAT_0064f340 + idx * 0x58;
  w16(c, 0, x);
  w16(c, 2, y);
  w32(c, 4, 0);          // flags
  _MEM[c + 8] = owner;
  _MEM[c + 9] = size;
  for (let i = 0; i < name.length && i < 15; i++) _MEM[c + 32 + i] = name.charCodeAt(i);
  _MEM[c + 32 + Math.min(name.length, 15)] = 0;
  // Tile assignment bitmap at offset 0x30: bit 20 = center tile, bits 0..size-1 = citizen tiles
  let tileBits = (1 << 20);  // center tile always assigned
  for (let i = 0; i < size; i++) tileBits |= (1 << i);
  w32(c, 0x30, tileBits);
  w32(c, 0x54, 1);       // exists flag

  // Stamp city on tile data (confirmed by sniffing session 1)
  const tileOff = TILE_DATA_BASE + (s16(DAT_006d1160, 0) & 0xFFFFFFFE) * y * 3 + (x & 0xFFFFFFFE) * 3;
  _MEM[tileOff + 1] |= 0x02;           // byte 1: city improvement flag
  _MEM[tileOff + 5] = (_MEM[tileOff + 5] & 0x0F) | (idx << 4); // byte 5 upper nibble: city index

  // [FIX 2] Stamp cityRadiusOwner on fat-cross tiles (byte 2 bits [7:5])
  // Confirmed by sniffing: tile byte 2 upper 3 bits = owning civ for city radius
  const fatCrossDx = [1,2,1,0,-1,-2,-1,0, 2,2,-2,-2, 1,3,3,1,-1,-3,-3,-1, 0];
  const fatCrossDy = [-1,0,1,2,1,0,-1,-2, -2,2,2,-2, -3,-1,1,3,3,1,-1,-3, 0];
  for (let t = 0; t < 21; t++) {
    const tx = x + fatCrossDx[t], ty = y + fatCrossDy[t];
    if (tx >= 0 && tx < mw2 && ty >= 0 && ty < MH) {
      const tOff = TILE_DATA_BASE + (mw2 & 0xFFFFFFFE) * ty * 3 + (tx & 0xFFFFFFFE) * 3;
      _MEM[tOff + 2] = (_MEM[tOff + 2] & 0x1F) | (owner << 5);
    }
  }
}

// Civ 1: city at (20,10), settler at (30,10)
placeCity(0, 1, 'Alpha', 20, 10, 2);
placeUnit(0, 0, 1, 20, 10);  // settler in city
placeUnit(1, 2, 1, 30, 10);  // warrior nearby

// Civ 2: city at (60,30), settler at (70,30)
placeCity(1, 2, 'Beta', 60, 30, 2);
placeUnit(2, 0, 2, 60, 30);
placeUnit(3, 2, 2, 70, 30);

w16(DAT_00655b16, 0, 4);   // 4 units total
w16(DAT_00655b18, 0, 2);   // 2 cities total
wv(DAT_00655b0b, 0);        // all AI
wv(DAT_00655af8, 1);        // turn counter = 1 (gates tech assignment + AI decisions)

// ── Civ struct initialization (from game_logic_insights.md, session 4) ──
for (let civ = 1; civ <= 2; civ++) {
  const cb = DAT_0064c600 + civ * 0x594;
  // Tech list: 93 bytes at civ+0x74, init all to 0xFF = "not discovered"
  for (let t = 0; t < 93; t++) _MEM[cb + 0x74 + t] = 0xFF;
}

// Set visibility near cities (sight range ~3 tiles, like real Civ2 start)
function revealAround(cx, cy, owner, radius) {
  const exploreMap = s32(DAT_006365c0, owner * 4); // per-civ exploration map
  const stride = s16(DAT_006d116a, 0);
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius * 2; dx <= radius * 2; dx += 2) {
      const tx = cx + dx, ty = cy + dy;
      if (tx >= 0 && tx < mw2 && ty >= 0 && ty < MH) {
        // Set tile visibility byte
        const off = TILE_DATA_BASE + (mw2 & 0xFFFFFFFE) * ty * 3 + (tx & 0xFFFFFFFE) * 3;
        _MEM[off + 4] |= (1 << owner);
        // Set per-civ exploration map
        if (exploreMap) {
          const ei = stride * ty + (tx >> 2);  // exploration map index
          if (ei >= 0 && ei < totalTiles) _MEM[exploreMap + ei] = 1;
        }
      }
    }
  }
}
revealAround(20, 10, 1, 3); // civ 1 sees around Alpha
revealAround(30, 10, 1, 2); // civ 1 sees around warrior
revealAround(60, 30, 2, 3); // civ 2 sees around Beta
revealAround(70, 30, 2, 2); // civ 2 sees around warrior

// ── Civ initialization (confirmed by sniffing session 1) ──
for (let civ = 1; civ <= 2; civ++) {
  const cb = DAT_0064c600 + civ * 0x594;
  _MEM[cb + 0xB5] = 1;     // government = despotism
  // [FIX 1] beakers = 0xFFFF sentinel ("no research target") — sniffing confirmed all civs init this
  w16(cb, 0xAA, 0xFFFF);
  // [FIX 5] AI sci/tax rates — sniffing showed 40%/40% typical (stored as 4/4, ×10=%)
  _MEM[cb + 0xB3] = 4;     // science rate = 40%
  _MEM[cb + 0xB4] = 4;     // tax rate = 40%
}

console.log(`\n═══ Fresh Game: ${MW}x${MH} grassland, 2 civs, ${turns} turns ═══\n`);

// ── Run turns ──
const { FUN_00489553 } = await import('./blocks/block_00480000.js');
const { FUN_00543cd6 } = await import('./blocks/block_00540000.js');

function readCity(idx) {
  const c = DAT_0064f340 + idx * 0x58;
  const owner = _MEM[c + 8];
  const size = _MEM[c + 9];
  const food = s16(c, 0x1a);
  const shields = s16(c, 0x1c);
  let name = '';
  for (let j = 0; j < 15; j++) {
    const ch = _MEM[c + 32 + j];
    if (ch === 0) break;
    name += String.fromCharCode(ch);
  }
  return { name, owner, size, food, shields };
}

function readUnit(idx) {
  const u = DAT_006560f0 + idx * 0x20;
  return {
    type: _MEM[u + 6],
    owner: _MEM[u + 7],
    x: s16(u, 0),
    y: s16(u, 2),
    alive: s32(u, 0x1A) !== 0,        // unique_id != 0
    moves: _MEM[u + 8],               // was 0x0A — fixed
    order: _MEM[u + 0x0F],
    homeCity: _MEM[u + 0x0D],         // was 0x10 — fixed
    damage: _MEM[u + 0x0A],
  };
}

for (let t = 0; t < turns; t++) {
  const turnNum = t + 1;
  console.log(`── Turn ${turnNum} ──`);

  // Snapshot before
  const citiesBefore = [readCity(0), readCity(1)];
  const unitsBefore = [0,1,2,3].map(readUnit);
  const memBefore = G._MEM.slice();

  for (let civ = 1; civ <= 2; civ++) {
    wv(DAT_00655b05, civ);
    wv(DAT_006d1da0, civ);
    loopReset();
    try {
      FUN_00489553(civ);
    } catch(e) {
      console.log(`  Civ ${civ} turn error: ${e.message.substring(0, 60)}`);
    }
    try {
      FUN_00543cd6();
    } catch(e) {
      // AI dispatch errors are OK
    }
  }
  wv(DAT_00655af8, v(DAT_00655af8) + 1);

  // Report changes
  const citiesAfter = [readCity(0), readCity(1)];
  const unitsAfter = [0,1,2,3].map(readUnit);

  for (let i = 0; i < 2; i++) {
    const b = citiesBefore[i], a = citiesAfter[i];
    const changes = [];
    if (b.size !== a.size) changes.push(`size ${b.size}→${a.size}`);
    if (b.food !== a.food) changes.push(`food ${b.food}→${a.food}`);
    if (b.shields !== a.shields) changes.push(`shields ${b.shields}→${a.shields}`);
    if (changes.length > 0) {
      console.log(`  ${a.name}: ${changes.join(', ')}`);
    }
  }

  for (let i = 0; i < 4; i++) {
    const b = unitsBefore[i], a = unitsAfter[i];
    if (b.x !== a.x || b.y !== a.y) {
      console.log(`  Unit ${i} (type ${a.type}, civ ${a.owner}): moved (${b.x},${b.y})→(${a.x},${a.y})`);
    }
    if (b.alive && !a.alive) console.log(`  Unit ${i} died`);
  }

  // Count total memory changes
  let memChanges = 0;
  for (let i = 0; i < memBefore.length; i++) {
    if (memBefore[i] !== G._MEM[i]) memChanges++;
  }

  const newUnits = s16(DAT_00655b16, 0);
  const newCities = s16(DAT_00655b18, 0);
  console.log(`  Memory: ${memChanges} bytes changed | Units: ${newUnits} | Cities: ${newCities}`);
}

console.log('\n═══ Final State ═══');
for (let i = 0; i < s16(DAT_00655b18, 0); i++) {
  const c = readCity(i);
  console.log(`  ${c.name} (civ ${c.owner}): size=${c.size} food=${c.food} shields=${c.shields}`);
}
for (let i = 0; i < s16(DAT_00655b16, 0); i++) {
  const u = readUnit(i);
  if (u.alive) console.log(`  Unit ${i} type=${u.type} civ=${u.owner} pos=(${u.x},${u.y})`);
}
console.log('\nDone.');
