#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// init-game.js — Start a new game from binary init (no save file)
//
// Uses the actual binary initialization chain:
//   1. Pre-zero arrays (WinMain equivalent)
//   2. Load RULES.TXT
//   3. Map generation (FUN_00408d33)
//   4. Civ initialization (FUN_004aa9c0)
//   5. Run turns
//
// Usage: node charlizationv4/init-game.js [--turns N] [--width W] [--height H]
//                                         [--difficulty D] [--civs N]
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { G } from './globals.js';
import { v, wv, w16, w32, s16, s32, u8, u16, _MEM } from './mem.js';
import { loopReset } from './mem.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';
import { readFileSync, existsSync } from 'fs';
import { printLog, resetLog } from './devlog.js';

// ── Parse CLI args ──
const args = process.argv.slice(2);
const getArg = (name, def) => {
  const i = args.indexOf('--' + name);
  return i >= 0 && i + 1 < args.length ? parseInt(args[i + 1]) : def;
};
const turns = getArg('turns', 10);
const mapW = getArg('width', 50);   // real width (doubled-X = mapW * 2)
const mapH = getArg('height', 50);
const difficulty = getArg('difficulty', 3);  // 0=Chieftain..5=Deity
const numCivs = getArg('civs', 7);           // total including barbs

console.log(`Init: ${mapW}x${mapH} map, difficulty=${difficulty}, ${numCivs} civs, ${turns} turns`);

// ── Step 0: Pre-zero (WinMain equivalent) ──
console.log('Step 0: Pre-zeroing arrays...');
wv(DAT_00628044, 1);  // game active flag

// Zero per-civ casualty counters
for (const addr of [DAT_006af220, DAT_006af240, DAT_006af260, DAT_006af280]) {
  for (let i = 0; i < 32; i++) _MEM[addr + i] = 0;
}

// Zero unit array: 2048 entries x 32 bytes
for (let i = 0; i < 2048; i++) {
  const off = i * 0x20;
  // Zero entire record
  for (let j = 0; j < 0x20; j++) _MEM[DAT_006560f0 + off + j] = 0;
  // Set sentinel values
  w32(DAT_0065610a, off, 0);           // unique_id = 0 (dead)
  w16(DAT_00656106, off, 0xFFFF);      // prev_in_stack = -1
  w16(DAT_00656108, off, 0xFFFF);      // next_in_stack = -1
}
w16(DAT_00655b16, 0, 0);  // total units = 0
wv(globalThis.DAT_00627fd8, 1);  // unit ID counter — must start at 1 (0 = dead unit)

// Zero city array: 256 entries x 88 bytes
for (let i = 0; i < 256; i++) {
  const off = i * 0x58;
  for (let j = 0; j < 0x58; j++) _MEM[globalThis.DAT_0064f340 + off + j] = 0;
  w32(DAT_0064f394, off, 0);  // city exists = 0
}
w16(DAT_00655b18, 0, 0);  // total cities = 0

// Zero unit assignment table
for (let i = 0; i < 0xC0; i++) _MEM[globalThis.DAT_0064ba48 + i] = 0xFF;

// ── Step 1: Set game parameters ──
console.log('Step 1: Setting game parameters...');
const mw2 = mapW * 2;
wv(DAT_00655b02, 0);         // singleplayer mode
_MEM[DAT_00655b02 + 6] = difficulty;  // DAT_00655b08
_MEM[DAT_00655b02 + 7] = 1;           // DAT_00655b09: barbarian level
w16(DAT_006d1160, 0, mw2);   // map width (doubled-X)
w16(DAT_006d1162, 0, mapH);  // map height
_MEM[DAT_00655b0b] = 0;      // all AI (no human) for headless — single byte

// Active civs bitmask: civs 0 through numCivs-1
let civMask = 0;
for (let i = 0; i < numCivs; i++) civMask |= (1 << i);
_MEM[DAT_00655b0a] = civMask & 0xFF;  // active civs — single byte in binary
_MEM[DAT_00655b02 + 11] = numCivs - 1;  // DAT_00655b0d: number of AI civs

// Map dimensions derived values
const ms = mapW * mapH;
w16(DAT_006d1164, 0, ms);             // total tiles
w16(DAT_006d1166, 0, 0);              // map shape (0 = round earth)
w16(DAT_006d116a, 0, (mw2 + 3) >> 2); // quarter width
w16(DAT_006d116c, 0, mapH);           // quarter height

// Game mode and difficulty — DIFFERENT globals!
// DAT_00655b02 = game MODE (0=SP, 1=hotseat, ≥3=network)
// DAT_00655b04 = sniffing-confirmed difficulty selector
// DAT_00655b08 = AI food box formula difficulty
wv(DAT_00655b02, 0);                    // singleplayer mode
_MEM[DAT_00655b02 + 2] = difficulty;    // DAT_00655b04
_MEM[DAT_00655b02 + 6] = difficulty;    // DAT_00655b08

// Default sci/tax rates
if (globalThis.DAT_0064bc1a !== undefined) {
  _MEM[globalThis.DAT_0064bc1a] = 6;  // default sci rate
  _MEM[globalThis.DAT_0064bc1c] = 4;  // default tax rate
}

// Seed RNG
wv(DAT_006d1168, Date.now() & 0x7FFF);

// ── Step 2: Load rules ──
console.log('Step 2: Loading RULES.TXT...');
initBinaryConstants();
const rPath = '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT';
if (existsSync(rPath)) {
  const rulesInfo = loadRules(readFileSync(rPath, 'utf8'));
  console.log(`  ${rulesInfo.unitCount} units, ${rulesInfo.terrainCount} terrains`);
} else {
  console.error('RULES.TXT not found!');
  process.exit(1);
}

// ── Step 3: Map generation ──
console.log('Step 3: Generating map...');
const { FUN_00408d33 } = await import('./blocks/block_00400000.js');
loopReset();
try {
  FUN_00408d33(0);  // 0 = new game
  console.log(`  Map generated: ${s16(DAT_006d1160, 0)/2}x${s16(DAT_006d1162, 0)}`);
  console.log(`  Tile pointer: ${v(globalThis.DAT_00636598)}`);
  console.log(`  Total tiles: ${s16(DAT_006d1164, 0)}`);
} catch (e) {
  console.error('  Map gen error:', e.message.substring(0, 200));
  if (e.stack) console.error('  ' + e.stack.split('\n').slice(1, 5).join('\n  '));
}

// Verify map was created
const tilePtr = v(globalThis.DAT_00636598);
if (tilePtr === 0) {
  console.error('Map generation failed — tile pointer is null');
  process.exit(1);
}

// Sample some tiles
const { FUN_005b89bb } = await import('./blocks/block_005B0000.js');
const terrainNames = ['Desert', 'Plains', 'Grass', 'Forest', 'Hills', 'Mtn', 'Tundra', 'Glacier', 'Swamp', 'Jungle', 'Ocean'];
console.log('  Sample tiles:');
for (const [x, y] of [[0,0], [10,10], [mapW,mapH/2|0], [mw2-2, mapH-1]]) {
  loopReset();
  const t = FUN_005b89bb(x, y);
  console.log(`    (${x},${y}): ${terrainNames[t] || '?'} (${t})`);
}

// ── Step 4: Civ initialization ──
console.log('Step 4: Initializing civilizations...');
const { FUN_004aa9c0 } = await import('./blocks/block_004A0000.js');
loopReset();
try {
  FUN_004aa9c0();
} catch (e) {
  console.error('  Civ init error (non-fatal):', e.message.substring(0, 100));
}

// Set starting position tables for each civ that has a settler
// This enables Path 1 city founding (first city at starting location on turn 1)
for (let i = 0; i < s16(DAT_00655b16, 0); i++) {
  const b = i * 0x20;
  const id = s32(DAT_0065610a, b);
  if (id === 0) continue;
  const owner = _MEM[DAT_006560f0 + b + 7];
  const ux = s16(DAT_006560f0, b);
  const uy = s16(DAT_006560f0, b + 2);
  const leaderIdx = s16(DAT_0064c6a6, owner * 0x594);
  w16(DAT_00627fe0, leaderIdx * 2, ux);
  w16(DAT_00628010, leaderIdx * 2, uy);
}

// If FUN_004aa9c0 failed to place settlers, manually place them on good land
if (s16(DAT_00655b16, 0) === 0) {
  console.log('  Auto-placing settlers (binary placement failed)...');
  const { FUN_005b89bb, FUN_005b8c42 } = await import('./blocks/block_005B0000.js');
  const { FUN_005b3d06 } = await import('./blocks/block_005B0000.js');

  // Find good land tiles
  const goodTiles = [];
  const mw2val = s16(DAT_006d1160, 0);
  const mhval = s16(DAT_006d1162, 0);
  for (let y = 4; y < mhval - 4; y++) {
    for (let x = (y & 1); x < mw2val; x += 2) {
      loopReset();
      const d = FUN_005b8c42(x, y);
      if (d >= 8) goodTiles.push({ x, y, d });
    }
  }
  console.log(`  Found ${goodTiles.length} good tiles`);

  // Sort by desirability, pick spread-out positions
  goodTiles.sort((a, b) => b.d - a.d);
  const placed = [];
  for (let civ = 1; civ < numCivs && goodTiles.length > 0; civ++) {
    // Find tile far from already-placed
    let best = null, bestDist = -1;
    for (const t of goodTiles) {
      let minDist = 999;
      for (const p of placed) {
        const dx = Math.abs(t.x - p.x);
        const dy = Math.abs(t.y - p.y);
        minDist = Math.min(minDist, dx + dy);
      }
      if (placed.length === 0) minDist = 999;
      if (minDist > bestDist) { best = t; bestDist = minDist; }
    }
    if (best) {
      // Create settler: FUN_005b3d06(unitType=0, owner=civ, x, y)
      loopReset();
      FUN_005b3d06(0, civ, best.x, best.y);
      // Set civ as active
      _MEM[DAT_00655b0a] = _MEM[DAT_00655b0a] | (1 << civ);
      _MEM[DAT_0064c600 + civ * 0x594 + 0xB0] = 1; // mark alive
      placed.push(best);
      console.log(`  Civ ${civ}: settler at (${best.x},${best.y}) desir=${best.d}`);
    }
  }
}
console.log(`  Units: ${s16(DAT_00655b16, 0)}  Cities: ${s16(DAT_00655b18, 0)}`);

// Show what was created
console.log('\n═══ Initial State ═══');
const totalUnits = s16(DAT_00655b16, 0);
const totalCities = s16(DAT_00655b18, 0);
console.log(`Units: ${totalUnits}  Cities: ${totalCities}`);

for (let i = 0; i < Math.min(totalUnits, 20); i++) {
  const b = i * 0x20;
  const id = s32(DAT_0065610a, b);
  if (id === 0) continue;
  const x = s16(DAT_006560f0, b), y = s16(DAT_006560f0, b + 2);
  const type = _MEM[DAT_006560f0 + b + 6], owner = _MEM[DAT_006560f0 + b + 7];
  console.log(`  Unit[${i}]: type=${type} owner=${owner} pos=(${x},${y}) id=${id}`);
}

// ── Step 5: Set game-ready flags ──
wv(globalThis.DAT_00654fd8, 1);  // game ready

// ── Step 6: Run turns ──
if (turns > 0) {
  const { FUN_00489553 } = await import('./blocks/block_00480000.js');
  const { FUN_00543cd6 } = await import('./blocks/block_00540000.js');

  // Set turn to 1 so AI Path 1 (first city at starting position) activates
  w16(DAT_00655af8, 0, 1);

  console.log(`\n═══ Running ${turns} turns ═══`);
  for (let t = 0; t < turns; t++) {
    for (let civ = 1; civ < numCivs; civ++) {
      if (!(civMask & (1 << civ))) continue;
      loopReset();
      try {
        _MEM[DAT_00655b05] = civ;
        wv(DAT_006d1da0, civ);
        FUN_00489553(civ);
        if (((1 << (civ & 0x1f)) & v(DAT_00655b0b)) === 0) {
          FUN_00543cd6();
        }
      } catch (e) {
        const msg = e.message.substring(0, 120);
        if (!msg.startsWith('LOOP_GUARD:')) {
          console.error(`  Turn ${t+1} Civ ${civ}: ${msg}`);
        }
      }
    }
    wv(DAT_00655af8, s16(DAT_00655af8, 0) + 1);
    if ((t + 1) % 10 === 0) {
      console.log(`  Turn ${t+1}: units=${s16(DAT_00655b16, 0)} cities=${s16(DAT_00655b18, 0)}`);
    }
  }

  // Final state
  console.log(`\n═══ After ${turns} turns ═══`);
  console.log(`Units: ${s16(DAT_00655b16, 0)}  Cities: ${s16(DAT_00655b18, 0)}`);
  for (let c = 1; c < numCivs; c++) {
    const off = c * 0x594;
    const treasury = s32(DAT_0064c600, off + 0xA2);
    const gov = _MEM[DAT_0064c600 + off + 0xB5];
    console.log(`  Civ ${c}: treasury=${treasury}g gov=${gov}`);
  }
}

console.log('\n═══ DevLog ═══');
printLog();
console.log('\nDone.');
