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
wv(DAT_00655b02, 3);        // difficulty = prince

// Allocate tile data at end of _MEM (DAT_00636598 is a pointer to tile array)
const TILE_DATA_BASE = _MEM.length - 100000;  // 100KB region at end of buffer
wv(DAT_00636598, TILE_DATA_BASE);             // store pointer to tile data
wv(DAT_006d1188, TILE_DATA_BASE);             // also set "bad tile" pointer (fallback)

// Fill tiles with grassland (terrain type 2)
for (let y = 0; y < MH; y++) {
  for (let x = 0; x < mw2; x += 2) {
    const off = TILE_DATA_BASE + (mw2 & 0xFFFFFFFE) * y * 3 + (x & 0xFFFFFFFE) * 3;
    _MEM[off] = 2;      // terrain = grassland (food=2, shields=1, trade=0)
    _MEM[off + 1] = 0;  // improvements
    _MEM[off + 2] = 0;
    _MEM[off + 3] = 0;
    _MEM[off + 4] = 0x06; // visibility: civ 1 (bit 1) + civ 2 (bit 2)
    _MEM[off + 5] = 0;
  }
}

// ── Place units and cities ──
function placeUnit(idx, type, owner, x, y) {
  const u = DAT_006560f0 + idx * 0x20;
  w16(u, 0, x);         // doubled-X position
  w16(u, 2, y);
  w16(u, 4, 0);         // status
  _MEM[u + 6] = type;   // unit type
  _MEM[u + 7] = owner;
  _MEM[u + 10] = 3;     // moves remain
  _MEM[u + 14] = 0;     // alive
  _MEM[u + 15] = 0xFF;  // no order
  _MEM[u + 16] = 0xFF;  // no home city
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
  // Stamp city on tile data: byte 1 bit 1 = city flag, byte 5 upper nibble = city index
  const tileOff = TILE_DATA_BASE + (s16(DAT_006d1160, 0) & 0xFFFFFFFE) * y * 3 + (x & 0xFFFFFFFE) * 3;
  _MEM[tileOff + 1] |= 0x02;           // city improvement flag
  _MEM[tileOff + 5] = (_MEM[tileOff + 5] & 0x0F) | (idx << 4); // city index in upper nibble
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

// Set civ government to despotism
_MEM[DAT_0064c600 + 1 * 0x594 + 0xB5] = 1;  // civ 1 = despotism
_MEM[DAT_0064c600 + 2 * 0x594 + 0xB5] = 1;  // civ 2 = despotism

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
    alive: _MEM[u + 14] === 0 && s32(u, 0x1A) !== 0,
    moves: _MEM[u + 10],
    order: _MEM[u + 15],
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
