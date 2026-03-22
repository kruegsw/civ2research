#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// run.js — CLI: load .sav, verify state, (eventually) run AI turns
//
// Usage:
//   node run.js --sav path/to/file.sav [--turns N]
//
// Phase 3: Load and verify
// Phase 4+: Run N turns of all-AI game
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { G } from './globals.js';
import { s8, u8, s16, u16, s32, u32, getTileOffset, tileRead } from './mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b89bb } from './fn_utils.js';
import { loadSav } from './sav-loader.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';

// ── Parse CLI args ──
const args = process.argv.slice(2);
let savPath = null;
let rulesPath = null;
let turns = 0;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--sav' && i + 1 < args.length) savPath = args[++i];
  else if (args[i] === '--rules' && i + 1 < args.length) rulesPath = args[++i];
  else if (args[i] === '--turns' && i + 1 < args.length) turns = parseInt(args[++i]);
  else if (!savPath && !args[i].startsWith('--')) savPath = args[i];
}

if (!savPath) {
  console.error('Usage: node run.js --sav path/to/file.sav [--rules path/to/RULES.TXT] [--turns N]');
  process.exit(1);
}

// ── Load RULES.TXT ──
const defaultRulesPath = '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT';
const rPath = rulesPath || defaultRulesPath;
if (existsSync(rPath)) {
  initBinaryConstants();
  const rulesInfo = loadRules(readFileSync(rPath, 'utf8'));
  console.log(`Rules: ${rulesInfo.unitCount} units, ${rulesInfo.terrainCount} terrains`);
} else {
  console.warn(`Warning: RULES.TXT not found at ${rPath}`);
}

// ── Load .sav ──
console.log(`Loading: ${savPath}`);
const savBuf = new Uint8Array(readFileSync(savPath));
const info = loadSav(savBuf);

// ── Print game state ──
console.log(`\n═══ Game State ═══`);
console.log(`Turn: ${info.turnsPassed}`);
console.log(`Map: ${info.mw}×${info.mh} (${info.flatEarth ? 'flat' : 'round'} earth, seed ${info.mapSeed})`);
console.log(`Difficulty: ${info.difficulty}`);
console.log(`Units: ${info.totalUnits}  Cities: ${info.totalCities}`);
console.log(`Civs alive: ${info.civsAlive.toString(2).padStart(8, '0')} (${countBits(info.civsAlive)} civs)`);

// ── Print civ info ──
console.log(`\n═══ Civilizations ═══`);
for (const civ of info.civInfo) {
  if (!civ.alive && civ.slot > 0) continue;
  const tag = civ.slot === 0 ? '(barb)' : '';
  console.log(`  [${civ.slot}] ${civ.name} ${tag}`);
  console.log(`      Leader: ${civ.leader || 'N/A'}`);
  console.log(`      Gov: ${civ.government}  Treasury: ${civ.treasury}g`);
  console.log(`      Techs: ${civ.techCount}  Sci/Tax: ${civ.scienceRate}%/${civ.taxRate}%`);
}

// ── Verify units from flat memory ──
console.log(`\n═══ Units (from flat memory) ═══`);
const maxShow = Math.min(info.totalUnits, 10);
for (let i = 0; i < maxShow; i++) {
  const base = i * 0x20;
  const ux = s16(G.DAT_006560f0, base);
  const uy = s16(G.DAT_006560f0, base + 2);
  const utype = G.DAT_006560f0[base + 6];
  const uowner = G.DAT_006560f0[base + 7];
  const umoves = G.DAT_006560f0[base + 10];
  const uorder = G.DAT_006560f0[base + 15];
  const uhome = u16(G.DAT_006560f0, base + 16);
  const uid = u32(G.DAT_006560f0, base + 26);
  const dead = G.DAT_006560f0[base + 14] !== 0;
  console.log(`  [${i}] type=${utype} owner=${uowner} pos=(${ux},${uy}) moves=${umoves} order=${uorder} home=${uhome} id=${uid}${dead ? ' DEAD' : ''}`);
}
if (info.totalUnits > maxShow) console.log(`  ... (${info.totalUnits - maxShow} more)`);

// ── Verify cities from flat memory ──
console.log(`\n═══ Cities (from flat memory) ═══`);
const maxCities = Math.min(info.totalCities, 10);
for (let i = 0; i < maxCities; i++) {
  const base = i * 0x58;
  const cx = u16(G.DAT_0064f340, base);
  const cy = u16(G.DAT_0064f340, base + 2);
  const cowner = G.DAT_0064f340[base + 8];
  const csize = G.DAT_0064f340[base + 9];
  // Read city name (16 bytes at +32)
  let cname = '';
  for (let j = 0; j < 16; j++) {
    const ch = G.DAT_0064f340[base + 32 + j];
    if (ch === 0) break;
    cname += String.fromCharCode(ch);
  }
  const food = s16(G.DAT_0064f340, base + 26);
  const shields = s16(G.DAT_0064f340, base + 28);
  console.log(`  [${i}] "${cname}" owner=${cowner} size=${csize} pos=(${cx},${cy}) food=${food} shields=${shields}`);
}

// ── Verify map tiles ──
console.log(`\n═══ Map Tiles (sample) ═══`);
const terrainNames = ['Desert', 'Plains', 'Grass', 'Forest', 'Hills', 'Mtn', 'Tundra', 'Glacier', 'Swamp', 'Jungle', 'Ocean'];
// Sample a few tiles
const sampleTiles = [
  [0, 0], [10, 10], [20, 20], [info.mw2 - 2, info.mh - 1],
];
for (const [tx, ty] of sampleTiles) {
  const valid = FUN_004087c0(tx, ty);
  if (!valid) {
    console.log(`  (${tx},${ty}): out of bounds`);
    continue;
  }
  const terrain = FUN_005b89bb(tx, ty);
  const off = getTileOffset(tx, ty);
  const improv = tileRead(off, 1);
  const river = !!(tileRead(off, 0) & 0x80);
  const improvStr = [];
  if (improv & 0x04) improvStr.push('irr');
  if (improv & 0x08) improvStr.push('mine');
  if (improv & 0x10) improvStr.push('road');
  if (improv & 0x20) improvStr.push('rr');
  if (improv & 0x40) improvStr.push('fort');
  console.log(`  (${tx},${ty}): ${terrainNames[terrain] || '?'}${river ? ' +river' : ''} ${improvStr.length ? '[' + improvStr.join(',') + ']' : ''}`);
}

// ── Verify globals ──
console.log(`\n═══ Globals Verification ═══`);
console.log(`  G.DAT_006d1160 (mw2): ${G.DAT_006d1160} (expected ${info.mw2})`);
console.log(`  G.DAT_006d1162 (mh):  ${G.DAT_006d1162} (expected ${info.mh})`);
console.log(`  G.DAT_006d1168 (seed): ${G.DAT_006d1168} (expected ${info.mapSeed})`);
console.log(`  G.DAT_00655b16 (units): ${G.DAT_00655b16} (expected ${info.totalUnits})`);
console.log(`  G.DAT_00655b18 (cities): ${G.DAT_00655b18} (expected ${info.totalCities})`);
console.log(`  G.DAT_00655b0b (human): ${G.DAT_00655b0b} (set to 0 for all-AI)`);

if (turns > 0) {
  // ── Phase 4: Run AI turns ──
  // Import turn pipeline functions
  const { FUN_00489553 } = await import('./blocks/block_00480000.js');
  // C: block_00480000.c:3460 — FUN_00543cd6 dispatches per-unit AI after each civ's turn
  const { FUN_00543cd6 } = await import('./blocks/block_00540000.js');

  console.log(`\n═══ Running ${turns} turns (all AI) ═══`);

  // Snapshot initial state for comparison
  const snap = () => {
    const cities = [];
    for (let i = 0; i < G.DAT_00655b18; i++) {
      const b = i * 0x58;
      const owner = G.DAT_0064f340[b + 8];
      const size = G.DAT_0064f340[b + 9];
      const food = s16(G.DAT_0064f340, b + 26);
      const shields = s16(G.DAT_0064f340, b + 28);
      let name = '';
      for (let j = 0; j < 16; j++) {
        const ch = G.DAT_0064f340[b + 32 + j];
        if (ch === 0) break;
        name += String.fromCharCode(ch);
      }
      cities.push({ name, owner, size, food, shields });
    }
    const units = [];
    for (let i = 0; i < G.DAT_00655b16; i++) {
      const b = i * 0x20;
      const alive = G.DAT_006560f0[b + 14] === 0 && u32(G.DAT_006560f0, b + 26) !== 0;
      if (alive) units.push({ idx: i, owner: G.DAT_006560f0[b + 7] });
    }
    return { cities, units, turn: G.DAT_00655af8 };
  };

  const before = snap();

  for (let t = 0; t < turns; t++) {
    // Process each alive civ's turn
    for (let civ = 1; civ < 8; civ++) {
      if (!(info.civsAlive & (1 << civ))) continue;
      try {
        // C: block_00480000.c:3319 — set active civ for AI dispatch
        G.DAT_00655b05 = civ;
        FUN_00489553(civ);
        // C: block_00480000.c:3458-3460 — for AI civs, dispatch per-unit AI
        if (((1 << (civ & 0x1f)) & G.DAT_00655b0b) === 0) {
          FUN_00543cd6();
        }
      } catch (e) {
        console.error(`  Turn ${t+1}, civ ${civ}: ERROR — ${e.message}`);
        if (e.stack) console.error(e.stack.split('\n').slice(0,3).join('\n'));
      }
    }
    G.DAT_00655af8++;
  }

  const after = snap();
  console.log(`\nAfter ${turns} turns:`);
  console.log(`  Turn: ${before.turn} → ${after.turn}`);
  console.log(`  Alive units: ${before.units.length} → ${after.units.length}`);

  // Show city changes
  console.log(`\n  City changes:`);
  for (let i = 0; i < Math.min(after.cities.length, 10); i++) {
    const b = before.cities[i];
    const a = after.cities[i];
    if (!b || !a) continue;
    const changed = b.food !== a.food || b.shields !== a.shields || b.size !== a.size;
    if (changed) {
      console.log(`    "${a.name}" size:${b.size}→${a.size} food:${b.food}→${a.food} shields:${b.shields}→${a.shields}`);
    } else {
      console.log(`    "${a.name}" (no change)`);
    }
  }
}

console.log('\nDone.');

// ── Helpers ──
function countBits(n) {
  let c = 0;
  while (n) { c += n & 1; n >>= 1; }
  return c;
}
