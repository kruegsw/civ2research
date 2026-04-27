// Validate v3's combat resolver against the binary's RNG consumption.
//
// FUN_00580341(param_1=attackerSlot, param_2=direction, param_3=barbHalveFlag)
//   - param_1: slot of the unit moving into combat (the attacker).
//   - param_2: direction index (0..7) — used as offset into the binary's
//     DAT_00628350 (dx) and DAT_00628360 (dy) tables to compute the
//     target tile (target = attacker.pos + delta[direction]).
//   - param_3: barbarian half-attack flag.
//
// Frida only captures args[0..1] under the names unitIdx/killerIdx,
// but the names are misleading — they are (attackerSlot, direction).
//
// Strategy:
//   1. Read attacker from snapshot units[args[0]].
//   2. Scan all 8 neighbors of attacker.(x,y); pick best enemy defender
//      (highest current HP), skipping the direction parsing entirely.
//      This works for unambiguous combats (one enemy adjacent); it
//      misidentifies the defender when the attacker has multiple enemy
//      neighbors. For those, full direction-table extraction is needed.
//   3. Read terrain (and city/walls if present) at defender's tile.
//   4. Seed SeededRNG with rand_enter and run resolveCombat() with
//      opts.useStateRng so every rand draw advances the seed.
//   5. Compare draw count to LCG step count from rand_enter→rand_exit;
//      compare v3's final rng.state to rand_exit.
//
// Usage: node validate-combat-rng.mjs <session-dir>

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { SeededRNG } from '../charlizationv3/engine/rng.js';
import { resolveCombat } from '../charlizationv3/engine/combat.js';
import { UNIT_HP } from '../charlizationv3/engine/defs.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-combat-rng.mjs <session-dir>');
  process.exit(1);
}

// ── LCG step counter ────────────────────────────────────────────────

const A = 0x343FD;
const C = 0x269EC3;
function stepCount(start, target, max = 500) {
  let s = start >>> 0;
  for (let i = 0; i <= max; i++) {
    if (s === (target >>> 0)) return i;
    s = (Math.imul(s, A) + C) >>> 0;
  }
  return -1;
}

// ── Trace parsing + turn anchoring ──────────────────────────────────

const trace = readFileSync(join(sessionDir, 'civ2_trace.log'), 'utf-8')
  .split('\n').filter(Boolean).map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);

const combatPairs = [];
const turnMarks = [];
let pendingCall = null;
for (const e of trace) {
  if (e.fn === 'civ_turn_driver' && e.kind === 'call' && e.named?.civSlot === 0) {
    turnMarks.push(e.time_ms);
  }
  if (e.fn !== 'fun_combat_resolve') continue;
  if (e.kind === 'call') pendingCall = e;
  else if (e.kind === 'return' && pendingCall) {
    combatPairs.push({
      time_ms: pendingCall.time_ms,
      attackerSlot: pendingCall.args[0],
      direction: pendingCall.args[1],
      rand_enter: pendingCall.rand_enter,
      rand_exit: e.rand_exit,
      retval: e.retval,
    });
    pendingCall = null;
  }
}
function turnAtTime(t) {
  let n = -1;
  for (let i = 0; i < turnMarks.length; i++) {
    if (turnMarks[i] <= t) n = i; else break;
  }
  return n;
}

// ── CIV2SNAP parser ─────────────────────────────────────────────────

function parseSnapshot(path) {
  const buf = new Uint8Array(readFileSync(path));
  if (String.fromCharCode(...buf.slice(0, 8)) !== 'CIV2SNAP') {
    throw new Error(`Not a CIV2SNAP file: ${path}`);
  }
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const regionCount = dv.getUint32(8, true);
  const regions = new Map();
  let tableOff = 12, dataOff = 12 + regionCount * 24;
  for (let i = 0; i < regionCount; i++) {
    let name = '';
    for (let j = 0; j < 16; j++) {
      const ch = buf[tableOff + j]; if (ch === 0) break;
      name += String.fromCharCode(ch);
    }
    const addr = dv.getUint32(tableOff + 16, true);
    const size = dv.getUint32(tableOff + 20, true);
    regions.set(name, {
      addr, size,
      bytes: new Uint8Array(buf.buffer, buf.byteOffset + dataOff, size),
    });
    tableOff += 24; dataOff += size;
  }
  return regions;
}

// ── Field readers ───────────────────────────────────────────────────

const UNIT_STRIDE = 0x20;
const CITY_STRIDE = 0x58;
const TILE_STRIDE = 6; // covers two tiles (x and x+1)

function readUnit(unitsRegion, slotIdx) {
  const off = slotIdx * UNIT_STRIDE;
  if (off + UNIT_STRIDE > unitsRegion.bytes.length) return null;
  const dv = new DataView(unitsRegion.bytes.buffer,
    unitsRegion.bytes.byteOffset + off, UNIT_STRIDE);
  const type = dv.getUint8(0x06);
  if (type === 0xFF) return null;
  return {
    slot: slotIdx,
    x: dv.getInt16(0x00, true),
    y: dv.getInt16(0x02, true),
    statusFlags: dv.getUint16(0x04, true),
    type, owner: dv.getUint8(0x07),
    movesLeft: dv.getUint8(0x08),
    damageTaken: dv.getUint8(0x0A),
    order: dv.getUint8(0x0F),
  };
}

function readAllUnits(unitsRegion) {
  const out = [];
  const count = Math.floor(unitsRegion.bytes.length / UNIT_STRIDE);
  for (let i = 0; i < count; i++) {
    const u = readUnit(unitsRegion, i);
    if (u) out.push(u);
  }
  return out;
}

function readCityAt(citiesRegion, x, y) {
  const count = Math.floor(citiesRegion.bytes.length / CITY_STRIDE);
  for (let i = 0; i < count; i++) {
    const off = i * CITY_STRIDE;
    const dv = new DataView(citiesRegion.bytes.buffer,
      citiesRegion.bytes.byteOffset + off, CITY_STRIDE);
    const cx = dv.getInt16(0x00, true);
    const cy = dv.getInt16(0x02, true);
    if (cx === x && cy === y) {
      return {
        idx: i, x: cx, y: cy,
        owner: dv.getUint8(0x08),
        size: dv.getUint8(0x09),
        // buildings bitmap occupies bytes 0x06-0x07 + 0x10-0x13 — full
        // mapping is outside this validator's scope; default empty Set
        // will skip walls/coastal/SAM/SDI bonuses for now.
      };
    }
  }
  return null;
}

function readTileTerrain(tilesRegion, mapDimsRegion, x, y) {
  const dvMap = new DataView(mapDimsRegion.bytes.buffer,
    mapDimsRegion.bytes.byteOffset, mapDimsRegion.bytes.length);
  const mw = dvMap.getInt16(0, true);
  const mh = dvMap.getInt16(2, true);
  if (x < 0 || x >= 2 * mw || y < 0 || y >= mh) return null;
  // Same parity check: valid iso tiles have (x+y)%2 == 0
  if ((x + y) % 2 !== 0) return null;
  const off = ((mw & ~1) * y + (x & ~1)) * 3;
  if (off < 0 || off + 6 > tilesRegion.bytes.length) return null;
  const b0 = tilesRegion.bytes[off];
  return {
    terrain: b0 & 0x0F,
    river: !!(b0 & 0x80),
    improvements: tilesRegion.bytes[off + 1],
  };
}

// ── Iso-grid 8-neighbor helper (full-width x coords) ────────────────
// In Civ2's full-iso coord space, a tile (x,y) has 8 neighbors at:
//   (0, ±2), (±2, 0)  — orthogonal
//   (±1, ±1)          — diagonal
const NEIGHBOR_DELTAS = [
  [ 0, -2], [ 1, -1], [ 2,  0], [ 1,  1],
  [ 0,  2], [-1,  1], [-2,  0], [-1, -1],
];

// ── Main ────────────────────────────────────────────────────────────

const resolved = combatPairs.filter(p => p.rand_enter !== p.rand_exit);
console.log(`# ${combatPairs.length} pairs (${resolved.length} with rand draws)`);
console.log('');
console.log('idx | turn | atkSl | dir | bin | v3  | match | notes');
console.log('----+------+-------+-----+-----+-----+-------+------');

const snapCache = new Map();
function loadSnap(turnN) {
  if (snapCache.has(turnN)) return snapCache.get(turnN);
  const files = readdirSync(sessionDir).filter(f =>
    f.startsWith(`turn_${String(turnN).padStart(4, '0')}_`) && f.endsWith('.bin'));
  if (files.length === 0) { snapCache.set(turnN, null); return null; }
  const regions = parseSnapshot(join(sessionDir, files[0]));
  snapCache.set(turnN, regions);
  return regions;
}

let okDraws = 0, okExit = 0, okBoth = 0;
let total = 0, noSnap = 0, noAtk = 0, noDef = 0, errors = 0;

for (let i = 0; i < resolved.length; i++) {
  const p = resolved[i];
  total++;
  const turn = turnAtTime(p.time_ms);
  const binDraws = stepCount(p.rand_enter, p.rand_exit);
  const regions = turn >= 0 ? loadSnap(turn) : null;
  const fmtRow = (notes) => ` ${String(i).padStart(2)} | ${String(turn).padStart(4)} | ` +
    `${String(p.attackerSlot).padStart(5)} | ${String(p.direction).padStart(3)} | ` +
    `${String(binDraws).padStart(3)} | ${notes}`;
  if (!regions) { noSnap++; console.log(fmtRow('-   |       | (no snap)')); continue; }
  const unitsRegion = regions.get('units');
  const citiesRegion = regions.get('cities');
  const tilesRegion = regions.get('tiles');
  const mapDimsRegion = regions.get('map_dims');
  if (!unitsRegion || !tilesRegion || !mapDimsRegion) {
    noSnap++; console.log(fmtRow('-   |       | (snap regions missing)')); continue;
  }
  const att = readUnit(unitsRegion, p.attackerSlot);
  if (!att) { noAtk++; console.log(fmtRow('-   |       | (attacker slot empty)')); continue; }
  const allUnits = readAllUnits(unitsRegion);
  // Find best enemy defender among the 8 neighbors.
  let def = null;
  for (const [dx, dy] of NEIGHBOR_DELTAS) {
    const nx = att.x + dx, ny = att.y + dy;
    const candidates = allUnits.filter(u =>
      u.x === nx && u.y === ny && u.owner !== att.owner);
    if (!candidates.length) continue;
    // Pick highest current-HP defender.
    candidates.sort((a, b) => {
      const aMax = (UNIT_HP[a.type] || 1) * 10;
      const bMax = (UNIT_HP[b.type] || 1) * 10;
      return (bMax - b.damageTaken) - (aMax - a.damageTaken);
    });
    const best = candidates[0];
    if (!def || ((UNIT_HP[best.type] || 1) * 10 - best.damageTaken) >
                ((UNIT_HP[def.type] || 1) * 10 - def.damageTaken)) {
      def = best;
    }
  }
  if (!def) { noDef++; console.log(fmtRow('-   |       | (no enemy adjacent)')); continue; }

  const tile = readTileTerrain(tilesRegion, mapDimsRegion, def.x, def.y);
  const defTerrain = tile ? tile.terrain : 1;
  const defOnRiver = tile ? tile.river : false;
  const city = citiesRegion ? readCityAt(citiesRegion, def.x, def.y) : null;
  const defInCity = !!city;

  let v3Draws, v3State;
  try {
    const rng = new SeededRNG(p.rand_enter);
    rng.callCount = 0;
    const attacker = {
      type: att.type, owner: att.owner,
      veteran: !!(att.statusFlags & 0x2000),
      movesRemain: att.damageTaken, gx: att.x, gy: att.y,
    };
    const defender = {
      type: def.type, owner: def.owner,
      veteran: !!(def.statusFlags & 0x2000),
      movesRemain: def.damageTaken,
      orders: def.order === 2 ? 'fortified' : undefined,
    };
    resolveCombat(
      attacker, defender,
      defTerrain, defInCity,
      /*defCityHasWalls*/ false, /*defHasFortress*/ false, defOnRiver,
      /*defCityBuildings*/ null, /*extraSeed*/ 0,
      'deity', /*atkMovesLeft*/ null,
      { useStateRng: rng },
    );
    v3Draws = rng.callCount;
    v3State = rng.state;
  } catch (e) {
    errors++;
    console.log(fmtRow(`ERR | ${e.message}`));
    continue;
  }
  const drawsMatch = v3Draws === binDraws;
  const exitMatch = (v3State >>> 0) === (p.rand_exit >>> 0);
  if (drawsMatch) okDraws++;
  if (exitMatch) okExit++;
  if (drawsMatch && exitMatch) okBoth++;
  const matchTag = drawsMatch && exitMatch ? 'OK    ' : drawsMatch ? 'draws ' : 'no    ';
  const notes = `att=t${att.type}/o${att.owner}${att.veteran ? '/V' : ''}/d${att.damageTaken} (${att.x},${att.y}) ` +
    `→ def=t${def.type}/o${def.owner}${def.veteran ? '/V' : ''}/d${def.damageTaken} (${def.x},${def.y}) ` +
    `terrain=${defTerrain}${defOnRiver ? ',river' : ''}${defInCity ? ',city' : ''}`;
  console.log(` ${String(i).padStart(2)} | ${String(turn).padStart(4)} | ` +
    `${String(p.attackerSlot).padStart(5)} | ${String(p.direction).padStart(3)} | ` +
    `${String(binDraws).padStart(3)} | ${String(v3Draws).padStart(3)} | ${matchTag}| ${notes}`);
}

console.log('');
console.log(`Resolved combats: ${total}`);
console.log(`  draws match:               ${okDraws} / ${total}`);
console.log(`  rand_exit match:           ${okExit} / ${total}`);
console.log(`  full lock-step (both):     ${okBoth} / ${total}`);
if (noSnap) console.log(`  skipped (no snapshot):     ${noSnap}`);
if (noAtk)  console.log(`  skipped (attacker empty):  ${noAtk}`);
if (noDef)  console.log(`  skipped (no enemy adj):    ${noDef}`);
if (errors) console.log(`  errors:                    ${errors}`);
