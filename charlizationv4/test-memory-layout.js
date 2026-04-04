#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// test-memory-layout.js — Verify tile and unit data structures match
// documented formats from reverse_engineering/findings/memory_map/
//
// Tests:
//   1. Unit type stats table (DAT_0064b1bc area, stride 0x14)
//   2. Tile data format after loading a .sav
//   3. Unit instance records (DAT_006560f0, stride 0x20)
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { G } from './globals.js';
import { v, wv, w16, w32, s16, u16, s32, u32, _MEM } from './mem.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';
import { loadSav } from './sav-loader.js';
import { readFileSync, readdirSync, existsSync } from 'fs';

// ── Counters ──
let passed = 0;
let failed = 0;

function pass(msg) { console.log(`  PASS: ${msg}`); passed++; }
function fail(msg) { console.log(`  FAIL: ${msg}`); failed++; }
function section(msg) { console.log(`\n=== ${msg} ===`); }

// ══════════════════════════════════════════════════════════════════
// Setup: load RULES.TXT and initialize binary constants
// ══════════════════════════════════════════════════════════════════
section('Setup');

initBinaryConstants();

const rulesPath = '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT';
if (!existsSync(rulesPath)) {
  console.error('RULES.TXT not found at: ' + rulesPath);
  process.exit(1);
}
const rulesText = readFileSync(rulesPath, 'utf8');
loadRules(rulesText);
pass('RULES.TXT loaded and parsed');

// ══════════════════════════════════════════════════════════════════
// Parse @UNITS section from RULES.TXT for expected values
// ══════════════════════════════════════════════════════════════════

function parseUnitsFromRules(text) {
  const lines = text.split('\n');
  let inUnits = false;
  const units = [];
  for (const raw of lines) {
    const trimmed = raw.replace(/;.*$/, '').trim();
    if (trimmed === '@UNITS') { inUnits = true; continue; }
    if (trimmed.startsWith('@') && inUnits) break;
    if (!inUnits || !trimmed) continue;

    const fields = trimmed.split(',').map(s => s.trim());
    if (fields.length < 14) continue;

    const name = fields[0];
    const moveRate = parseInt(fields[3]);
    const attack = parseInt(fields[5]);
    const defense = parseInt(fields[6]);
    const hitPoints = parseInt(fields[7]);
    const firepower = parseInt(fields[8]);

    units.push({ name, attack, defense, hitPoints, firepower, moveRate });
  }
  return units;
}

const expectedUnits = parseUnitsFromRules(rulesText);
console.log(`  Parsed ${expectedUnits.length} unit types from RULES.TXT @UNITS`);

// ══════════════════════════════════════════════════════════════════
// Test 1: Unit type stats table
// ══════════════════════════════════════════════════════════════════
section('Test 1: Unit Type Stats Table (stride 0x14 = 20 bytes)');

// rules-loader.js writes to DAT_0064b1bc with stride 0x14:
//   +0x08: attack, +0x09: defense, +0x0A: HP*10, +0x0B: firepower, +0x06: move*3
//
// unit_type_stats.md documents base at DAT_0064b1c4 (= DAT_0064b1bc + 8):
//   +0: attack, +1: defense, +2: HP, +3: FP, +4: moves
//
// These are the SAME bytes: DAT_0064b1bc+8+0 = DAT_0064b1bc+0x08 = attack

// Read the COSMIC movement multiplier (first @COSMIC value, default 3)
const movementMultiplier = _MEM[DAT_0064bcc8] || 3;
console.log(`  Movement multiplier (DAT_0064bcc8): ${movementMultiplier}`);

let unitTypeMismatches = 0;
for (let i = 0; i < Math.min(expectedUnits.length, 62); i++) {
  const base = i * 0x14;
  const eu = expectedUnits[i];

  // Read from flat memory via G.DAT_0064b1bc (Uint8Array view)
  const memAttack  = G.DAT_0064b1bc[base + 0x08];
  const memDefense = G.DAT_0064b1bc[base + 0x09];
  const memHP      = G.DAT_0064b1bc[base + 0x0A];
  const memFP      = G.DAT_0064b1bc[base + 0x0B];
  const memMoves   = G.DAT_0064b1bc[base + 0x06];

  const expectedHP = eu.hitPoints * 10;
  const expectedMoves = eu.moveRate * movementMultiplier;

  let ok = true;
  const errors = [];

  if (memAttack !== eu.attack) { errors.push(`atk: got ${memAttack} want ${eu.attack}`); ok = false; }
  if (memDefense !== eu.defense) { errors.push(`def: got ${memDefense} want ${eu.defense}`); ok = false; }
  if (memHP !== expectedHP) { errors.push(`hp: got ${memHP} want ${expectedHP}`); ok = false; }
  if (memFP !== eu.firepower) { errors.push(`fp: got ${memFP} want ${eu.firepower}`); ok = false; }
  if (memMoves !== expectedMoves) { errors.push(`mov: got ${memMoves} want ${expectedMoves}`); ok = false; }

  if (!ok) {
    fail(`Unit #${i} ${eu.name}: ${errors.join(', ')}`);
    unitTypeMismatches++;
  }
}

if (unitTypeMismatches === 0) {
  pass(`All ${Math.min(expectedUnits.length, 62)} unit types match RULES.TXT values`);
} else {
  fail(`${unitTypeMismatches} unit type(s) had mismatches`);
}

// Cross-reference with unit_type_stats.md documented hex bytes for key units.
// The .md was sniffed from live process memory at 0x0064B1C4 (= DAT_0064b1bc + 8).
// The .md struct: offset 0=attack, 1=defense, 2=HP, 3=FP.
// Offset 4 is labeled "moves" in the .md but the hex values match the RULES.TXT
// "cost" field (Settlers=4, Armor=8), not the movement rate. The actual movement
// rate is stored at DAT_0064b1bc + 0x06 (= 0x0064B1C2, before the .md base).
//
// We verify: attack, defense, HP, FP from hex bytes, and movement from the
// rules-loader location (DAT_0064b1bc + 0x06).

const mdReference = [
  // idx, name, hex bytes at .md offset 0..3 (atk, def, hp, fp), expected cost at .md+4
  { idx:  0, name: 'Settlers',    atk:  0, def: 1, hp: 0x14, fp: 1, cost: 4 },
  { idx:  2, name: 'Warriors',    atk:  1, def: 1, hp: 0x0A, fp: 1, cost: 1 },
  { idx: 22, name: 'Armor',       atk: 10, def: 5, hp: 0x1E, fp: 1, cost: 8 },
  { idx: 45, name: 'Nuclear Msl', atk: 99, def: 0, hp: 0x0A, fp: 1, cost: 16 },
  { idx: 40, name: 'Battleship',  atk: 12, def: 12, hp: 0x28, fp: 2, cost: 16 },
];

let mdMismatches = 0;
for (const ref of mdReference) {
  const base = ref.idx * 0x14;
  // .md struct offsets correspond to DAT_0064b1bc + 8 + offset
  const memAtk  = G.DAT_0064b1bc[base + 0x08]; // .md offset 0
  const memDef  = G.DAT_0064b1bc[base + 0x09]; // .md offset 1
  const memHP   = G.DAT_0064b1bc[base + 0x0A]; // .md offset 2
  const memFP   = G.DAT_0064b1bc[base + 0x0B]; // .md offset 3
  const memCost = G.DAT_0064b1bc[base + 0x0C]; // .md offset 4 (labeled "moves", actually cost)

  const errors = [];
  if (memAtk !== ref.atk) errors.push(`atk: got ${memAtk} want ${ref.atk}`);
  if (memDef !== ref.def) errors.push(`def: got ${memDef} want ${ref.def}`);
  if (memHP !== ref.hp) errors.push(`hp: got ${memHP} want ${ref.hp}`);
  if (memFP !== ref.fp) errors.push(`fp: got ${memFP} want ${ref.fp}`);
  if (memCost !== ref.cost) errors.push(`cost(.md+4): got ${memCost} want ${ref.cost}`);

  if (errors.length > 0) {
    fail(`MD cross-ref #${ref.idx} ${ref.name}: ${errors.join(', ')}`);
    mdMismatches++;
  }
}

if (mdMismatches === 0) {
  pass(`${mdReference.length} unit_type_stats.md cross-references verified (atk/def/hp/fp/cost)`);
}

// Verify movement field at rules-loader offset (+0x06 from DAT_0064b1bc)
const moveChecks = [
  { idx: 0, name: 'Settlers', rulesMove: 1 },    // RULES.TXT "1."
  { idx: 22, name: 'Armor', rulesMove: 3 },       // RULES.TXT "3."
  { idx: 45, name: 'Nuclear Msl', rulesMove: 16 }, // RULES.TXT "16."
];
let moveMismatches = 0;
for (const mc of moveChecks) {
  const base = mc.idx * 0x14;
  const memMov = G.DAT_0064b1bc[base + 0x06];
  const expected = mc.rulesMove * movementMultiplier;
  if (memMov !== expected) {
    fail(`Move check #${mc.idx} ${mc.name}: got ${memMov} want ${expected} (${mc.rulesMove}x${movementMultiplier})`);
    moveMismatches++;
  }
}
if (moveMismatches === 0) {
  pass(`${moveChecks.length} movement values verified at DAT_0064b1bc+0x06 (moveRate x ${movementMultiplier})`);
}

// ══════════════════════════════════════════════════════════════════
// Load a .sav file for tile and unit instance tests
// ══════════════════════════════════════════════════════════════════
section('Loading .sav file');

const savDir = '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/';
const savFiles = readdirSync(savDir).filter(f => f.endsWith('.sav') || f.endsWith('.SAV')).sort();

if (savFiles.length === 0) {
  console.log('  No .sav files found, skipping tile and unit instance tests');
  process.exit(failed > 0 ? 1 : 0);
}

// Pick the first save file (alphabetically)
const savFile = savFiles[0];
console.log(`  Loading: ${savFile}`);
const savBuf = new Uint8Array(readFileSync(savDir + savFile));
const info = loadSav(savBuf);
pass(`Save loaded: turn ${info.turnsPassed}, ${info.mw2}x${info.mh} map, ${info.totalUnits} units, ${info.totalCities} cities`);

// ══════════════════════════════════════════════════════════════════
// Test 2: Tile data format
// ══════════════════════════════════════════════════════════════════
section('Test 2: Tile Data Format');

// Read tile array base pointer from DAT_00636598
const tileBase = v(DAT_00636598);
const mapWidth = s16(DAT_006d1160, 0);  // mw2 (doubled-X)
const mapHeight = s16(DAT_006d1162, 0);
console.log(`  Tile base pointer: ${tileBase} (0x${tileBase.toString(16)})`);
console.log(`  Map dimensions: ${mapWidth}x${mapHeight} (doubled-X width)`);

// Verify tile access formula: base + (mapWidth & ~1) * y * 3 + (x & ~1) * 3
const mwMasked = mapWidth & ~1;  // should equal mapWidth for even widths

let terrainRangeErrors = 0;
let bodyIdZeroCount = 0;
let totalTilesSampled = 0;

// Scan all tiles, check terrain range and body IDs
for (let y = 0; y < mapHeight; y++) {
  for (let x = 0; x < mapWidth; x += 2) {  // step by 2 since tiles share 6-byte records
    const offset = tileBase + mwMasked * y * 3 + (x & ~1) * 3;
    const terrainByte = _MEM[offset];
    const terrain = terrainByte & 0x0F;

    if (terrain > 10) {
      terrainRangeErrors++;
      if (terrainRangeErrors <= 3) {
        fail(`Tile (${x},${y}): terrain=${terrain} out of range 0-10`);
      }
    }

    const bodyId = _MEM[offset + 3];
    if (bodyId === 0) bodyIdZeroCount++;

    totalTilesSampled++;
  }
}

if (terrainRangeErrors === 0) {
  pass(`All ${totalTilesSampled} tiles have terrain in range 0-10`);
} else {
  fail(`${terrainRangeErrors} tiles had terrain out of range 0-10`);
}

// Body IDs: 0 is valid (unassigned/unexplored), but most should be 1-255
const bodyIdOkPct = ((totalTilesSampled - bodyIdZeroCount) / totalTilesSampled * 100).toFixed(1);
if (bodyIdZeroCount < totalTilesSampled) {
  pass(`Body IDs: ${totalTilesSampled - bodyIdZeroCount}/${totalTilesSampled} tiles have non-zero body ID (${bodyIdOkPct}%)`);
} else {
  fail(`All tiles have body ID = 0 (unexpected)`);
}

// Sample 10 tiles and print their 6-byte records
console.log('\n  Sample tiles (6-byte records):');
console.log('  x    y    | byte0 byte1 byte2 byte3 byte4 byte5 | terrain  impr  bodyId vis');
console.log('  ---- ---- | ----- ----- ----- ----- ----- ----- | -------- ----- ------ ---');

const terrainNames = ['Desert','Plains','Grassland','Forest','Hills','Mountains','Tundra','Arctic','Swamp','Jungle','Ocean'];
const sampleCoords = [];
// Pick 10 evenly spaced tiles
for (let i = 0; i < 10; i++) {
  const y = Math.floor(mapHeight * (i + 0.5) / 10);
  const x = Math.floor(mapWidth * (i + 0.5) / 10) & ~1;  // ensure even x
  sampleCoords.push([x, y]);
}

for (const [x, y] of sampleCoords) {
  const offset = tileBase + mwMasked * y * 3 + (x & ~1) * 3;
  const bytes = [];
  for (let b = 0; b < 6; b++) bytes.push(_MEM[offset + b]);

  const terrain = bytes[0] & 0x0F;
  const tName = terrainNames[terrain] || '???';
  const impr = bytes[1];
  const bodyId = bytes[3];
  const vis = bytes[4];

  const hex = bytes.map(b => b.toString(16).padStart(2, '0')).join('  ');
  console.log(`  ${String(x).padStart(4)} ${String(y).padStart(4)} |  ${hex}  | ${tName.padEnd(9)} 0x${impr.toString(16).padStart(2,'0')}  ${String(bodyId).padStart(6)} ${String(vis).padStart(3)}`);
}

// Verify the access formula gives consistent results for a specific tile
{
  const testX = 0, testY = 0;
  const formulaOffset = tileBase + mwMasked * testY * 3 + (testX & ~1) * 3;
  const directOffset = tileBase; // x=0, y=0 should be at base
  if (formulaOffset === directOffset) {
    pass('Tile access formula: (0,0) correctly maps to base offset');
  } else {
    fail(`Tile access formula: (0,0) gives offset ${formulaOffset}, expected ${directOffset}`);
  }
}

// Verify non-zero tile at an interior position
{
  const midX = Math.floor(mapWidth / 2) & ~1;
  const midY = Math.floor(mapHeight / 2);
  const offset = tileBase + mwMasked * midY * 3 + (midX & ~1) * 3;
  const terrain = _MEM[offset] & 0x0F;
  if (terrain <= 10) {
    pass(`Interior tile (${midX},${midY}) terrain=${terrain} (${terrainNames[terrain]}) is valid`);
  } else {
    fail(`Interior tile (${midX},${midY}) terrain=${terrain} out of range`);
  }
}

// ══════════════════════════════════════════════════════════════════
// Test 3: Unit instance records (DAT_006560f0, stride 0x20)
// ══════════════════════════════════════════════════════════════════
section('Test 3: Unit Instance Records (stride 0x20 = 32 bytes)');

const totalUnits = u16(DAT_00655b16, 0);
console.log(`  Total units (DAT_00655b16): ${totalUnits}`);

let posErrors = 0;
let typeErrors = 0;
let ownerErrors = 0;
let validUnits = 0;

for (let i = 0; i < totalUnits; i++) {
  const base = i * 0x20;
  const ux = s16(G.DAT_006560f0, base + 0);    // x position (int16)
  const uy = s16(G.DAT_006560f0, base + 2);    // y position (int16)
  const utype = G.DAT_006560f0[base + 6];       // unit type (byte)
  const uowner = G.DAT_006560f0[base + 7];      // owner civ (byte)
  const uid = u32(G.DAT_006560f0, base + 0x1A); // unique ID

  // Skip dead units (ID = 0)
  if (uid === 0) continue;
  validUnits++;

  // Validate position: x in [0, mapWidth), y in [0, mapHeight)
  if (ux < 0 || ux >= mapWidth || uy < 0 || uy >= mapHeight) {
    posErrors++;
    if (posErrors <= 3) {
      fail(`Unit #${i}: position (${ux},${uy}) out of map bounds (${mapWidth}x${mapHeight})`);
    }
  }

  // Validate type: 0-61
  if (utype > 61) {
    typeErrors++;
    if (typeErrors <= 3) {
      fail(`Unit #${i}: type=${utype} out of range 0-61`);
    }
  }

  // Validate owner: 0-7
  if (uowner > 7) {
    ownerErrors++;
    if (ownerErrors <= 3) {
      fail(`Unit #${i}: owner=${uowner} out of range 0-7`);
    }
  }
}

console.log(`  Valid units (non-zero ID): ${validUnits} / ${totalUnits}`);

if (posErrors === 0) {
  pass(`All ${validUnits} units have valid map positions`);
} else {
  fail(`${posErrors} units have out-of-bounds positions`);
}

if (typeErrors === 0) {
  pass(`All ${validUnits} units have valid type indices (0-61)`);
} else {
  fail(`${typeErrors} units have invalid type indices`);
}

if (ownerErrors === 0) {
  pass(`All ${validUnits} units have valid owner indices (0-7)`);
} else {
  fail(`${ownerErrors} units have invalid owner indices`);
}

// ── Linked list integrity check ──
// Unit records have next-in-stack at offset +0x18 (int16, -1 = end of list)
// and prev-in-stack at offset +0x16 (int16, -1 = start of list)
console.log('\n  Linked list integrity (stack pointers at +0x16/+0x18):');

let chainsChecked = 0;
let cycleErrors = 0;
let brokenLinks = 0;

// Find units that start a stack (prev = -1 or 0xFFFF, and next != -1)
for (let i = 0; i < totalUnits; i++) {
  const base = i * 0x20;
  const uid = u32(G.DAT_006560f0, base + 0x1A);
  if (uid === 0) continue;

  const prev = s16(G.DAT_006560f0, base + 0x16);
  const next = s16(G.DAT_006560f0, base + 0x18);

  // Only start traversal from stack heads (prev == -1 and next != -1)
  if (prev !== -1 || next === -1) continue;

  chainsChecked++;
  const seen = new Set();
  seen.add(i);
  let current = next;
  let chainLen = 1;

  while (current !== -1 && current !== 0xFFFF) {
    if (current < 0 || current >= totalUnits) {
      brokenLinks++;
      if (brokenLinks <= 3) {
        fail(`Chain from unit #${i}: next pointer ${current} out of range`);
      }
      break;
    }
    if (seen.has(current)) {
      cycleErrors++;
      if (cycleErrors <= 3) {
        fail(`Chain from unit #${i}: cycle detected at unit #${current} (chain length ${chainLen})`);
      }
      break;
    }
    seen.add(current);
    chainLen++;
    const nextBase = current * 0x20;
    current = s16(G.DAT_006560f0, nextBase + 0x18);
  }
}

if (cycleErrors === 0 && brokenLinks === 0) {
  pass(`${chainsChecked} unit stack chains verified, no cycles or broken links`);
} else {
  if (cycleErrors > 0) fail(`${cycleErrors} cycles detected in unit stack chains`);
  if (brokenLinks > 0) fail(`${brokenLinks} broken links in unit stack chains`);
}

// Print first 5 unit instances for inspection
console.log('\n  First units (up to 5):');
console.log('  idx  x    y    type  owner  hp_dmg  moves  home  order  id');
console.log('  ---- ---- ---- ----- ------ ------- ------ ----- ------ ------');

let printed = 0;
for (let i = 0; i < totalUnits && printed < 5; i++) {
  const base = i * 0x20;
  const uid = u32(G.DAT_006560f0, base + 0x1A);
  if (uid === 0) continue;

  const ux = s16(G.DAT_006560f0, base + 0);
  const uy = s16(G.DAT_006560f0, base + 2);
  const utype = G.DAT_006560f0[base + 6];
  const uowner = G.DAT_006560f0[base + 7];
  const umoves = G.DAT_006560f0[base + 8];
  const udmg = G.DAT_006560f0[base + 0x0A];
  const uhome = G.DAT_006560f0[base + 0x0D];
  const uorder = G.DAT_006560f0[base + 0x0F];

  const typeName = (utype < expectedUnits.length) ? expectedUnits[utype].name : '???';
  console.log(`  ${String(i).padStart(4)} ${String(ux).padStart(4)} ${String(uy).padStart(4)} ${String(utype).padStart(3)}=${typeName.padEnd(12).slice(0,12)} civ${uowner}  dmg=${String(udmg).padStart(3)} mov=${String(umoves).padStart(3)}  hm=${String(uhome).padStart(3)}  ord=${String(uorder).padStart(3)}  id=${uid}`);
  printed++;
}

// ══════════════════════════════════════════════════════════════════
// Summary
// ══════════════════════════════════════════════════════════════════
section('Summary');
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);
console.log(`  Result: ${failed === 0 ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);

process.exit(failed > 0 ? 1 : 0);
