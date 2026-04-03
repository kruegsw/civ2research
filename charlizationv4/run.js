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
import './globals-init.js';
import { G } from './globals.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, getTileOffset, tileRead } from './mem.js';
// v(addr)=read value, wv(addr,val)=write value
import { FUN_004087c0 } from './blocks/block_00400000.js';
import { FUN_005ae052 } from './blocks/block_005A0000.js';
import { FUN_005b89bb } from './blocks/block_005B0000.js';
import { loadSav } from './sav-loader.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';
import { printLog, resetLog } from './devlog.js';

// Bind DAT_ globals from globalThis for this module
const { DAT_006d1160, DAT_006d1162, DAT_006d1168, DAT_00655b16, DAT_00655b18,
        DAT_00655b0b, DAT_00655b05, DAT_00655af8, DAT_006d1da0,
        DAT_006560f0, DAT_0064f340, DAT_0064f394, DAT_0064f348, DAT_0064f349,
        DAT_0064c600 } = globalThis;

// ── Parse CLI args ──
const args = process.argv.slice(2);
let savPath = null;
let rulesPath = null;
let turns = 0;
let outPath = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--sav' && i + 1 < args.length) savPath = args[++i];
  else if (args[i] === '--rules' && i + 1 < args.length) rulesPath = args[++i];
  else if (args[i] === '--turns' && i + 1 < args.length) turns = parseInt(args[++i]);
  else if (args[i] === '--save' && i + 1 < args.length) outPath = args[++i];
  else if (!savPath && !args[i].startsWith('--')) savPath = args[i];
}

if (!savPath) {
  console.error('Usage: node run.js --sav path/to/file.sav [--rules path/to/RULES.TXT] [--turns N] [--save output.sav]');
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
  const ux = s16(DAT_006560f0, base);
  const uy = s16(DAT_006560f0, base + 2);
  const utype = G._MEM[DAT_006560f0 + base + 6];
  const uowner = G._MEM[DAT_006560f0 + base + 7];
  const umoves = G._MEM[DAT_006560f0 + base + 10];
  const uorder = G._MEM[DAT_006560f0 + base + 15];
  const uhome = u16(DAT_006560f0, base + 16);
  const uid = u32(DAT_006560f0, base + 26);
  const dead = G._MEM[DAT_006560f0 + base + 14] !== 0;
  console.log(`  [${i}] type=${utype} owner=${uowner} pos=(${ux},${uy}) moves=${umoves} order=${uorder} home=${uhome} id=${uid}${dead ? ' DEAD' : ''}`);
}
if (info.totalUnits > maxShow) console.log(`  ... (${info.totalUnits - maxShow} more)`);

// ── Verify cities from flat memory ──
console.log(`\n═══ Cities (from flat memory) ═══`);
const maxCities = Math.min(info.totalCities, 10);
for (let i = 0; i < maxCities; i++) {
  const base = i * 0x58;
  const cx = u16(DAT_0064f340, base);
  const cy = u16(DAT_0064f340, base + 2);
  const cowner = G._MEM[DAT_0064f340 + base + 8];
  const csize = G._MEM[DAT_0064f340 + base + 9];
  // Read city name (16 bytes at +32)
  let cname = '';
  for (let j = 0; j < 16; j++) {
    const ch = G._MEM[DAT_0064f340 + base + 32 + j];
    if (ch === 0) break;
    cname += String.fromCharCode(ch);
  }
  const food = s16(DAT_0064f340, base + 26);
  const shields = s16(DAT_0064f340, base + 28);
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
console.log(`  DAT_006d1160 (mw2): ${s16(DAT_006d1160, 0)} (expected ${info.mw2})`);
console.log(`  DAT_006d1162 (mh):  ${s16(DAT_006d1162, 0)} (expected ${info.mh})`);
console.log(`  DAT_006d1168 (seed): ${s32(DAT_006d1168, 0)} (expected ${info.mapSeed})`);
console.log(`  DAT_00655b16 (units): ${s16(DAT_00655b16, 0)} (expected ${info.totalUnits})`);
console.log(`  DAT_00655b18 (cities): ${s16(DAT_00655b18, 0)} (expected ${info.totalCities})`);
console.log(`  DAT_00655b0b (human): ${v(DAT_00655b0b)} (set to 0 for all-AI)`);

if (turns > 0) {
  // ── Phase 4: Run AI turns ──
  // Import turn pipeline functions
  const { FUN_00489553 } = await import('./blocks/block_00480000.js');
  const { FUN_00543cd6 } = await import('./blocks/block_00540000.js');
  const { FUN_004d01ae } = await import('./blocks/block_004D0000.js');
  const { FUN_004e4ceb } = await import('./blocks/block_004E0000.js');
  const { loopReset } = await import('./mem.js');

  // Memory diff helper: snapshot _MEM, compare with previous, report changes
  function memDiff(label, before, after) {
    let changed = 0;
    const regions = []; // { addr, oldVal, newVal }
    for (let i = 0; i < before.length; i++) {
      if (before[i] !== after[i]) {
        changed++;
        if (regions.length < 10) {
          // Find the absolute address
          const absAddr = 0x61c068 + i; // BASE from build-globals
          regions.push({ offset: i, addr: '0x' + absAddr.toString(16), old: before[i], new: after[i] });
        }
      }
    }
    console.log(`    ${label}: ${changed} bytes changed`);
    for (const r of regions) {
      console.log(`      ${r.addr} (offset ${r.offset}): ${r.old} → ${r.new}`);
    }
    return changed;
  }

  console.log(`\n═══ Running ${turns} turns (all AI) ═══`);

  // Snapshot initial state for comparison
  const snap = () => {
    const cities = [];
    for (let i = 0; i < s16(DAT_00655b18, 0); i++) {
      const b = i * 0x58;
      const owner = G._MEM[DAT_0064f340 + b + 8];
      const size = G._MEM[DAT_0064f340 + b + 9];
      const food = s16(DAT_0064f340, b + 26);
      const shields = s16(DAT_0064f340, b + 28);
      let name = '';
      for (let j = 0; j < 16; j++) {
        const ch = G._MEM[DAT_0064f340 + b + 32 + j];
        if (ch === 0) break;
        name += String.fromCharCode(ch);
      }
      cities.push({ name, owner, size, food, shields });
    }
    const units = [];
    for (let i = 0; i < s16(DAT_00655b16, 0); i++) {
      const b = i * 0x20;
      const alive = u32(DAT_006560f0, b + 26) !== 0;
      if (alive) units.push({ idx: i, owner: G._MEM[DAT_006560f0 + b + 7] });
    }
    return { cities, units, turn: s16(DAT_00655af8, 0) };
  };

  const before = snap();

  for (let t = 0; t < turns; t++) {
    console.log(`\n═══ Turn ${t + 1} ═══`);
    for (let civ = 1; civ < 8; civ++) {
      if (!(info.civsAlive & (1 << civ))) continue;
      console.log(`  ── Civ ${civ} ──`);
      const memBefore = G._MEM.slice(); // snapshot
      loopReset(); // reset loop guard counter
      try {
        wv(DAT_00655b05, civ);
        wv(DAT_006d1da0, civ);
        FUN_00489553(civ);
        if (((1 << (civ & 0x1f)) & v(DAT_00655b0b)) === 0) {
          FUN_00543cd6();
        }
      } catch (e) {
        const msg = e.message.substring(0, 120);
        if (msg.startsWith('LOOP_GUARD:')) {
          console.error(`    ${msg}`);
        } else {
          console.error(`    ERROR: ${msg}`);
          if (e.stack) {
            const frames = e.stack.split('\n').slice(1, 15);
            for (const f of frames) console.error('    ' + f.trim());
          }
        }
      }
      memDiff(`Civ ${civ}`, memBefore, G._MEM);
    }
    wv(DAT_00655af8, s16(DAT_00655af8, 0) + 1);
  }

  const after = snap();
  console.log(`\nAfter ${turns} turns:`);
  console.log(`  Turn: ${before.turn} → ${after.turn}`);
  console.log(`  Alive units: ${before.units.length} → ${after.units.length}`);
  console.log(`  Total cities: ${before.cities.length} → ${after.cities.length}`);

  // Per-civ stats
  const civUnitsB = {}, civUnitsA = {}, civCitiesB = {}, civCitiesA = {};
  for (const u of before.units) civUnitsB[u.owner] = (civUnitsB[u.owner] || 0) + 1;
  for (const u of after.units) civUnitsA[u.owner] = (civUnitsA[u.owner] || 0) + 1;
  for (const c of before.cities) civCitiesB[c.owner] = (civCitiesB[c.owner] || 0) + 1;
  for (const c of after.cities) civCitiesA[c.owner] = (civCitiesA[c.owner] || 0) + 1;
  console.log(`\n  Per-civ breakdown:`);
  for (let civ = 0; civ < 8; civ++) {
    const ub = civUnitsB[civ] || 0, ua = civUnitsA[civ] || 0;
    const cb = civCitiesB[civ] || 0, ca = civCitiesA[civ] || 0;
    if (ub || ua || cb || ca) {
      console.log(`    Civ ${civ}: units ${ub}→${ua}, cities ${cb}→${ca}`);
    }
  }

  // Treasury changes
  console.log(`\n  Treasury:`);
  for (let civ = 1; civ < 8; civ++) {
    const treasB = s32(DAT_0064c600, civ * 0x594 + 0xA2);
    console.log(`    Civ ${civ}: ${treasB}g`);
  }

  // Show city changes (first 10)
  console.log(`\n  City changes (first 10):`);
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

// ── Save snapshot ──
// Dumps key memory regions in the same format as sniff-game.py CIV2SNAP
if (true) {
  const { writeFileSync, mkdirSync } = await import('fs');
  const snapDir = new URL('./snapshots/', import.meta.url).pathname;
  try { mkdirSync(snapDir, { recursive: true }); } catch {}

  const mw2 = s16(DAT_006d1160, 0);
  const mh = s16(DAT_006d1162, 0);
  const tilePtr = v(globalThis.DAT_00636598);
  const tileSize = (mw2 / 2) * mh * 6;
  const turn = s16(DAT_00655af8, 0);

  // Region definitions matching sniff-game.py SNAPSHOT_REGIONS
  const regions = [
    { name: 'globals',  addr: DAT_00655af8, size: 0x40 },
    { name: 'units',    addr: DAT_006560f0, size: 512 * 0x20 },
    { name: 'cities',   addr: globalThis.DAT_0064f340, size: 256 * 0x58 },
    { name: 'civs',     addr: DAT_0064c600, size: 8 * 0x594 },
    { name: 'cosmic',   addr: globalThis.DAT_0064bcc8, size: 22 },
    { name: 'map_dims', addr: DAT_006d1160, size: 32 },
    { name: 'tiles',    addr: tilePtr, size: tileSize },
  ];

  // Build CIV2SNAP binary
  const headerSize = 8 + 4 + regions.length * 24;
  const dataSize = regions.reduce((s, r) => s + r.size, 0);
  const snapBuf = new Uint8Array(headerSize + dataSize);
  const dv = new DataView(snapBuf.buffer);

  // Header
  for (let i = 0; i < 8; i++) snapBuf[i] = 'CIV2SNAP'.charCodeAt(i);
  dv.setUint32(8, regions.length, true);

  // Region table + data
  let tableOff = 12;
  let dataOff = headerSize;
  for (const r of regions) {
    // Name (16 bytes, null-padded)
    for (let i = 0; i < 16; i++) snapBuf[tableOff + i] = i < r.name.length ? r.name.charCodeAt(i) : 0;
    dv.setUint32(tableOff + 16, r.addr + 0x61c068, true); // convert to absolute address
    dv.setUint32(tableOff + 20, r.size, true);
    tableOff += 24;
    // Copy data from _MEM
    for (let i = 0; i < r.size; i++) snapBuf[dataOff + i] = G._MEM[r.addr + i] || 0;
    dataOff += r.size;
  }

  const snapFile = `${snapDir}turn_${String(turn).padStart(4, '0')}_${mw2/2}x${mh}_v4.bin`;
  writeFileSync(snapFile, snapBuf);
  console.log(`\nSnapshot: ${snapFile} (${snapBuf.length} bytes)`);
}

// ── Save output ──
if (outPath && turns > 0) {
  const { saveSav } = await import('./sav-writer.js');
  const { writeFileSync } = await import('fs');
  const outBuf = saveSav(savBuf);
  writeFileSync(outPath, outBuf);
  console.log(`\nSaved to: ${outPath} (${outBuf.length} bytes, turn ${s16(DAT_00655af8, 0)})`);
}

// ═══ DevLog Summary ═══
if (turns > 0) {
  console.log('\n═══ DevLog Summary ═══');
  printLog();
}

console.log('\nDone.');

// ── Helpers ──
function countBits(n) {
  let c = 0;
  while (n) { c += n & 1; n >>= 1; }
  return c;
}
