#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// deep-diag.js — Deep diagnostic: tracks ALL game state changes per turn
//
// Loads a save, runs turns, and reports every observable change:
//   - Per-city: food, shields, size, production item, buildings
//   - Per-unit: position, type, alive/dead, home city
//   - Per-civ: treasury, research, government, techs discovered
//   - Global: turn counter, year
//
// Usage: node charlizationv4/deep-diag.js [--sav PATH] [--turns N]
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { G } from './globals.js';
import { v, wv, w16, w32, s16, s32, u8, u16, ptrAdd, _MEM } from './mem.js';
import { loopReset } from './mem.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';
import { loadSav } from './sav-loader.js';
import { readFileSync, existsSync } from 'fs';

const turns = parseInt(process.argv.find((a,i,arr) => arr[i-1] === '--turns') || '10');
const savPath = process.argv.find((a,i,arr) => arr[i-1] === '--sav') ||
  './20260301_early-game-data/20260301_research_02_early game few cities.sav';

initBinaryConstants();
loadRules(readFileSync('/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT', 'utf8'));
loadSav(readFileSync(savPath));

const { FUN_00488cef, FUN_00489292 } = await import('./blocks/block_00480000.js');
const { FUN_004f0a9c } = await import('./blocks/block_004F0000.js');
const { FUN_00560084 } = await import('./blocks/block_00560000.js');
const { FUN_0053184d } = await import('./blocks/block_00530000.js');
const { FUN_00543cd6 } = await import('./blocks/block_00540000.js');

// ── Unit type names from RULES.TXT ──
const unitNames = [];
try {
  const rules = readFileSync('/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT', 'utf8');
  const unitSection = rules.split('@UNITS')[1]?.split('@')[0];
  if (unitSection) {
    for (const line of unitSection.split('\n')) {
      const m = line.match(/^([^,;]+),/);
      if (m && !line.startsWith(';')) unitNames.push(m[1].trim());
    }
  }
} catch(e) {}
function unitName(type) { return unitNames[type] || `type${type}`; }

// ── Snapshot functions ──
function snapCities() {
  const cities = [];
  const count = s16(DAT_00655b18, 0);
  for (let i = 0; i < Math.min(count, 256); i++) {
    const c = DAT_0064f340 + i * 0x58;
    if (s32(DAT_0064f394, i * 0x58) === 0) continue; // dead
    let name = '';
    for (let j = 0; j < 15; j++) { const ch = _MEM[c+32+j]; if (!ch) break; name += String.fromCharCode(ch); }
    cities.push({
      idx: i, name, owner: _MEM[c+8], size: _MEM[c+9],
      food: s16(c, 0x1a), shields: s16(c, 0x1c),
      prod: (_MEM[c + 0x39] << 24) >> 24,
      x: s16(c, 0), y: s16(c, 2),
    });
  }
  return cities;
}

function snapUnits() {
  const units = [];
  const count = s16(DAT_00655b16, 0);
  for (let i = 0; i < Math.min(count, 2048); i++) {
    const u = DAT_006560f0 + i * 0x20;
    const id = s32(DAT_0065610a, i * 0x20);
    if (id === 0) continue;
    units.push({
      idx: i, type: _MEM[u+6], owner: _MEM[u+7],
      x: s16(u, 0), y: s16(u, 2),
      moves: _MEM[u+8], damage: _MEM[u+0x0A],
      homeCity: _MEM[u+0x0D], order: _MEM[u+0x0F], id,
    });
  }
  return units;
}

function snapCivs() {
  const civs = [];
  for (let civ = 1; civ < 8; civ++) {
    if (!(_MEM[DAT_00655b0a] & (1 << civ))) continue;
    const cb = DAT_0064c600 + civ * 0x594;
    const treasury = s32(DAT_0064c6a2, civ * 0x594);
    const beakers = u16(cb + 0xAA, 0);
    const gov = _MEM[cb + 0xB5];
    const sciRate = _MEM[cb + 0xB3];
    const taxRate = _MEM[cb + 0xB4];
    // Count techs
    let techCount = 0;
    for (let t = 0; t < 12; t++) {
      let byte = _MEM[cb + 0xF8 + t];
      while (byte) { techCount += byte & 1; byte >>= 1; }
    }
    civs.push({ civ, treasury, beakers, gov, sciRate, taxRate, techCount });
  }
  return civs;
}

function runTurnHeadless(civ) {
  _MEM[DAT_00655b05] = civ; wv(DAT_006d1da0, civ); loopReset();
  if (s32(DAT_0064c6a2, civ*0x594) > 30000) w32(ptrAdd(DAT_0064c6a2, civ*0x594), 0, 30000);
  if (s32(DAT_0064c6a2, civ*0x594) < 0) w32(ptrAdd(DAT_0064c6a2, civ*0x594), 0, 0);
  try { FUN_00488cef(civ); } catch(e) {}
  let idx = s16(DAT_00655b18, 0);
  while (--idx >= 0) {
    if (s32(DAT_0064f394, idx*0x58) !== 0 && _MEM[DAT_0064f348+idx*0x58] === (civ&0xFF))
      try { FUN_004f0a9c(idx); } catch(e) {}
  }
  try { FUN_00560084(civ); } catch(e) {}
  try { FUN_0053184d(civ); } catch(e) {}
  try { FUN_00489292(civ, 0); } catch(e) {}
  try { FUN_00543cd6(); } catch(e) {}
}

// ── Diff helpers ──
function diffCities(before, after) {
  const changes = [];
  const beforeMap = new Map(before.map(c => [c.idx, c]));
  const afterMap = new Map(after.map(c => [c.idx, c]));

  for (const [idx, a] of afterMap) {
    const b = beforeMap.get(idx);
    if (!b) { changes.push(`  + CITY ${a.name} (${a.owner}) at (${a.x},${a.y}) size=${a.size}`); continue; }
    const d = [];
    if (b.size !== a.size) d.push(`size ${b.size}→${a.size}`);
    if (b.food !== a.food) d.push(`food ${b.food}→${a.food}`);
    if (b.shields !== a.shields) d.push(`shields ${b.shields}→${a.shields}`);
    if (b.prod !== a.prod) {
      const prodName = a.prod >= 0 ? unitName(a.prod) : `bldg${-a.prod-1}`;
      d.push(`prod→${prodName}(${a.prod})`);
    }
    if (d.length) changes.push(`  ${a.name}: ${d.join(', ')}`);
  }
  for (const [idx, b] of beforeMap) {
    if (!afterMap.has(idx)) changes.push(`  - CITY ${b.name} DESTROYED`);
  }
  return changes;
}

function diffUnits(before, after) {
  const changes = [];
  const beforeMap = new Map(before.map(u => [u.id, u]));
  const afterMap = new Map(after.map(u => [u.id, u]));

  for (const [id, a] of afterMap) {
    const b = beforeMap.get(id);
    if (!b) { changes.push(`  + UNIT ${unitName(a.type)} (civ ${a.owner}) at (${a.x},${a.y})`); continue; }
    const d = [];
    if (b.x !== a.x || b.y !== a.y) d.push(`moved (${b.x},${b.y})→(${a.x},${a.y})`);
    if (b.damage !== a.damage) d.push(`damage ${b.damage}→${a.damage}`);
    if (b.order !== a.order) d.push(`order ${b.order}→${a.order}`);
    if (d.length) changes.push(`  ${unitName(a.type)} #${id} (civ ${a.owner}): ${d.join(', ')}`);
  }
  for (const [id, b] of beforeMap) {
    if (!afterMap.has(id)) changes.push(`  - ${unitName(b.type)} #${id} (civ ${b.owner}) KILLED at (${b.x},${b.y})`);
  }
  return changes;
}

function diffCivs(before, after) {
  const changes = [];
  const beforeMap = new Map(before.map(c => [c.civ, c]));
  for (const a of after) {
    const b = beforeMap.get(a.civ);
    if (!b) continue;
    const d = [];
    if (b.treasury !== a.treasury) d.push(`gold ${b.treasury}→${a.treasury}`);
    if (b.beakers !== a.beakers) d.push(`beakers ${b.beakers}→${a.beakers}`);
    if (b.gov !== a.gov) d.push(`gov ${b.gov}→${a.gov}`);
    if (b.techCount !== a.techCount) d.push(`techs ${b.techCount}→${a.techCount}`);
    if (d.length) changes.push(`  Civ ${a.civ}: ${d.join(', ')}`);
  }
  return changes;
}

// ── Main ──
const initTurn = s16(DAT_00655af8, 0);
console.log(`\n═══ Deep Diagnostic: ${savPath.split('/').pop()} ═══`);
console.log(`Turn ${initTurn}, Map ${s16(DAT_006d1160,0)}x${s16(DAT_006d1162,0)}`);
console.log(`Units: ${s16(DAT_00655b16,0)}, Cities: ${s16(DAT_00655b18,0)}`);
console.log(`Alive civs: ${snapCivs().map(c => c.civ).join(', ')}\n`);

for (let t = 0; t < turns; t++) {
  const bCities = snapCities(), bUnits = snapUnits(), bCivs = snapCivs();
  const s = Date.now();

  for (let civ = 1; civ < 8; civ++) {
    if (!(_MEM[DAT_00655b0a] & (1 << civ))) continue;
    runTurnHeadless(civ);
  }
  wv(DAT_00655af8, v(DAT_00655af8) + 1);

  const aCities = snapCities(), aUnits = snapUnits(), aCivs = snapCivs();
  const ms = Date.now() - s;

  const cityChanges = diffCities(bCities, aCities);
  const unitChanges = diffUnits(bUnits, aUnits);
  const civChanges = diffCivs(bCivs, aCivs);

  const turnNum = initTurn + t + 1;
  const totalChanges = cityChanges.length + unitChanges.length + civChanges.length;
  console.log(`── Turn ${turnNum} (${ms}ms) ── ${totalChanges} changes`);
  for (const c of civChanges) console.log(c);
  for (const c of cityChanges) console.log(c);
  for (const c of unitChanges) console.log(c);
  if (totalChanges === 0) console.log('  (no changes)');
}

console.log('\n═══ Final State ═══');
for (const c of snapCities()) {
  const prodName = c.prod >= 0 ? unitName(c.prod) : `bldg${-c.prod-1}`;
  console.log(`  ${c.name} (civ ${c.owner}): size=${c.size} food=${c.food} shields=${c.shields} prod=${prodName}`);
}
console.log();
for (const c of snapCivs()) {
  console.log(`  Civ ${c.civ}: gold=${c.treasury} beakers=${c.beakers} gov=${c.gov} techs=${c.techCount} sci=${c.sciRate*10}% tax=${c.taxRate*10}%`);
}

process.exit(0);
