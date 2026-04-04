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
import { v, wv, w16, w32, s16, s32, u8, ptrAdd, _MEM } from './mem.js';
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
// DAT_00655b02: game MODE (0=SP, 3=MP) — NOT difficulty!
// DAT_00655b04: sniffing confirmed live difficulty selector (0=Chieftain..5=Deity)
// DAT_00655b08: AI food box formula uses this (food_rows = 13 - difficulty)
const DIFFICULTY = 3; // prince
_MEM[DAT_00655b02] = 0;             // game mode = single player (CRITICAL: not difficulty!)
_MEM[DAT_00655b02 + 2] = DIFFICULTY; // 0x00655B04 = difficulty
_MEM[DAT_00655b02 + 6] = DIFFICULTY; // DAT_00655b08 = AI food box adjustment

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
const totalTiles = s32(DAT_006d1164, 0);
const EXPLORE_BASE = TILE_DATA_BASE - 8 * totalTiles - 1000;
for (let civ = 0; civ < 8; civ++) {
  const explorePtr = EXPLORE_BASE + civ * totalTiles;
  w32(DAT_006365c0, civ * 4, explorePtr);
  for (let j = 0; j < totalTiles; j++) _MEM[explorePtr + j] = 1; // fully explored
}
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
  _MEM[c + 0x39] = 2;   // production item = Warriors (unit type 2, cost 10 shields)

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
wv(DAT_00627fd8, 5);        // unit ID counter (next ID = 5, since we placed 4 units with IDs 1-4)

// ── Civ struct initialization (corrected offsets from binary analysis) ──
for (let civ = 1; civ <= 2; civ++) {
  const cb = DAT_0064c600 + civ * 0x594;
  // Tech list: 93 bytes at offset 0xF8 from civ base (DAT_0064c6f8 - DAT_0064c600)
  // Set NO techs discovered (0x00) — all-discovered causes upgrade chain madness
  // Tech -1 means "no prereq" so basic units (Settlers, Warriors) are still buildable
  for (let t = 0; t < 93; t++) _MEM[cb + 0xF8 + t] = 0x00;
  // Civ active flag at offset 0x185 (DAT_0064c785 - DAT_0064c600)
  _MEM[cb + 0x185] = 1;
  // Clear diplomacy relation bytes (offset 0xC1 from civ base = DAT_0064c6c1 - DAT_0064c600)
  // Prevents FUN_0053184d from entering foreign city unit scan which can infinite loop
  // Bit 0x20 = "at war" — clearing it skips the captured city transfer logic
  for (let other = 0; other < 8; other++) {
    _MEM[cb + 0xC1 + other * 4] = 0;
  }
}

// Set all tiles visible (headless mode — no fog of war)
for (let y = 0; y < MH; y++) {
  for (let x = 0; x < mw2; x += 2) {
    const off = TILE_DATA_BASE + (mw2 & 0xFFFFFFFE) * y * 3 + (x & 0xFFFFFFFE) * 3;
    _MEM[off + 4] = 0xFF;
  }
}

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
// For headless mode: use sub-functions directly, skipping UI-only citywin calls
// FUN_00487a41 calls citywin_DB36 which has infinite paint loops in headless mode
const { FUN_00488cef, FUN_00487a41, FUN_00489292, FUN_00489553 } = await import('./blocks/block_00480000.js');
const { FUN_00560084 } = await import('./blocks/block_00560000.js');
const { FUN_0053184d } = await import('./blocks/block_00530000.js');
const { FUN_00543cd6 } = await import('./blocks/block_00540000.js');

// Import per-city processing function (called by FUN_00487a41 for each city)
const { FUN_004f0a9c } = await import('./blocks/block_004F0000.js');

// Headless turn processing: same as FUN_00489553 but replaces FUN_00487a41
// with a stripped version that skips citywin_DB36 (UI-only infinite loop)
function runTurn(civ) {
  // Same preamble as FUN_00489553 — treasury cap and bounds
  if (s32(DAT_0064c6a2, civ * 0x594) > 30000) w32(ptrAdd(DAT_0064c6a2, civ * 0x594), 0, 30000);
  if (s32(DAT_0064c6a2, civ * 0x594) < 0) w32(ptrAdd(DAT_0064c6a2, civ * 0x594), 0, 0);
  const uVar1 = s32(DAT_0064c6a2, civ * 0x594);
  try { FUN_00488cef(civ); } catch(e) {}

  // Inline FUN_00487a41 game logic (skip citywin_DB36/DADA UI calls)
  w16(ptrAdd(DAT_0064ca72, civ * 0x594), 0, 0);
  for (let i = 0; i < 7; i++) w16(ptrAdd(DAT_0064ca74, civ * 0x594 + i * 2), 0, 0);
  // Per-city processing loop
  let local_24 = s16(DAT_00655b18, 0);
  while (true) {
    local_24 = local_24 - 1;
    if (local_24 < 0) break;
    const cityExists = s32(DAT_0064f394, local_24 * 0x58);
    const cityOwner = _MEM[DAT_0064f348 + local_24 * 0x58];
    if (cityExists !== 0 && cityOwner === (civ & 0xFF)) {
      try { FUN_004f0a9c(local_24); } catch(e) {}
    }
  }
  // Skip citywin_DB36() — UI-only display update

  try { FUN_00560084(civ); } catch(e) {}
  try { FUN_0053184d(civ); } catch(e) {}
  try { FUN_00489292(civ, uVar1); } catch(e) {}
}

function readCity(idx) {
  const c = DAT_0064f340 + idx * 0x58;
  const owner = _MEM[c + 8];
  const size = _MEM[c + 9];
  const food = s16(c, 0x1a);
  const shields = s16(c, 0x1c);
  const prod = (_MEM[c + 0x39] << 24) >> 24; // signed byte production item
  let name = '';
  for (let j = 0; j < 15; j++) {
    const ch = _MEM[c + 32 + j];
    if (ch === 0) break;
    name += String.fromCharCode(ch);
  }
  return { name, owner, size, food, shields, prod };
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
  const citiesBefore = [readCity(0), readCity(1)];

  const turnStart = Date.now();
  for (let civ = 1; civ <= 2; civ++) {
    wv(DAT_00655b05, civ);
    wv(DAT_006d1da0, civ);
    loopReset();
    try { runTurn(civ); } catch(e) {}
    try { FUN_00543cd6(); } catch(e) {}
  }
  wv(DAT_00655af8, v(DAT_00655af8) + 1);
  const turnMs = Date.now() - turnStart;

  // Report changes
  const citiesAfter = [readCity(0), readCity(1)];
  const changes = [];
  for (let i = 0; i < 2; i++) {
    const b = citiesBefore[i], a = citiesAfter[i];
    const ch = [];
    if (b.size !== a.size) ch.push(`size ${b.size}→${a.size}`);
    if (b.food !== a.food) ch.push(`food ${b.food}→${a.food}`);
    if (b.shields !== a.shields) ch.push(`shields ${b.shields}→${a.shields}`);
    if (b.prod !== a.prod) ch.push(`prod ${b.prod}→${a.prod}`);
    else if (turnNum <= 3 || a.shields === 0) ch.push(`prod=${a.prod}`);
    if (ch.length > 0) changes.push(`${a.name}: ${ch.join(', ')}`);
  }

  const newUnits = s16(DAT_00655b16, 0);
  const newCities = s16(DAT_00655b18, 0);
  console.log(`Turn ${turnNum} (${turnMs}ms): ${changes.join(' | ')} | Units: ${newUnits} Cities: ${newCities}`);
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
process.exit(0);
