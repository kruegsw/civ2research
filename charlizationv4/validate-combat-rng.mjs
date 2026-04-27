// Validate v3's combat resolver against the binary's RNG consumption.
//
// For each captured fun_combat_resolve call/return pair with non-zero
// rand draws (i.e. the actual resolution call, not the preview):
//   1. Read the closest pre-combat snapshot to get unit stats.
//   2. Seed a SeededRNG with rand_enter.
//   3. Run resolveCombat() with opts.useStateRng so every rand draw
//      advances the seeded RNG and increments callCount.
//   4. Compare v3's draws to the binary's draws (LCG step-count from
//      rand_enter to rand_exit) and v3's final rng.state to rand_exit.
//
// SCOPE / LIMITATIONS:
//   - First-cut validator. Uses minimum context: open terrain
//     (grassland), no city, no walls, no fortress, no river. This is
//     accurate for ~most barbarian-vs-AI field encounters but
//     mismatches city assaults until terrain/city wiring is added.
//   - Snapshot picked by counting civ_turn_driver(civSlot=0) returns
//     before the combat time. May lag combats happening late in a turn.
//   - Veteran flag read from statusFlags & 0x2000.
//   - HP damage read from damageTaken byte (passed as movesRemain since
//     resolveCombat uses that field as HP-damage scale).
//
// Usage:
//   node validate-combat-rng.mjs <session-dir>
//   node validate-combat-rng.mjs <session-dir> --turn N    (override)

import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { SeededRNG } from '../charlizationv3/engine/rng.js';
import { resolveCombat } from '../charlizationv3/engine/combat.js';

const argv = process.argv.slice(2);
const sessionDir = argv[0];
if (!sessionDir) {
  console.error('Usage: node validate-combat-rng.mjs <session-dir> [--turn N]');
  process.exit(1);
}
const turnOverride = (() => {
  const i = argv.indexOf('--turn');
  return i >= 0 ? parseInt(argv[i + 1], 10) : null;
})();

// ── Parse trace ──────────────────────────────────────────────────────

const trace = readFileSync(join(sessionDir, 'civ2_trace.log'), 'utf-8')
  .split('\n').filter(Boolean).map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);

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

// Pair combat call/return events, then assign a turn to each pair by
// counting completed civ_turn_driver(civSlot=0) returns up to the
// combat's call time.
const combatPairs = [];
const turnMarks = []; // sorted call times when civ 0's turn began
let pendingCombatCall = null;
for (const e of trace) {
  if (e.fn === 'civ_turn_driver' && e.kind === 'call' && e.named?.civSlot === 0) {
    turnMarks.push(e.time_ms);
  }
  if (e.fn !== 'fun_combat_resolve') continue;
  if (e.kind === 'call') pendingCombatCall = e;
  else if (e.kind === 'return' && pendingCombatCall) {
    combatPairs.push({
      time_ms: pendingCombatCall.time_ms,
      unitIdx: pendingCombatCall.named?.unitIdx,
      killerIdx: pendingCombatCall.named?.killerIdx,
      rand_enter: pendingCombatCall.rand_enter,
      rand_exit: e.rand_exit,
      retval: e.retval,
    });
    pendingCombatCall = null;
  }
}

function turnAtTime(t) {
  // turnMarks[N] = start of turn N (0-indexed). For combat at time t,
  // pick the largest N such that turnMarks[N] <= t. That snapshot
  // (turn_NNNN.bin) is the latest taken before this combat began.
  let n = -1;
  for (let i = 0; i < turnMarks.length; i++) {
    if (turnMarks[i] <= t) n = i;
    else break;
  }
  return n;
}

// ── Parse CIV2SNAP ───────────────────────────────────────────────────

function parseSnapshot(path) {
  const buf = new Uint8Array(readFileSync(path));
  if (String.fromCharCode(...buf.slice(0, 8)) !== 'CIV2SNAP') {
    throw new Error(`Not a CIV2SNAP file: ${path}`);
  }
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const regionCount = dv.getUint32(8, true);
  const regions = new Map();
  let tableOff = 12;
  let dataOff = 12 + regionCount * 24;
  for (let i = 0; i < regionCount; i++) {
    let name = '';
    for (let j = 0; j < 16; j++) {
      const ch = buf[tableOff + j];
      if (ch === 0) break;
      name += String.fromCharCode(ch);
    }
    const size = dv.getUint32(tableOff + 20, true);
    const bytes = new Uint8Array(buf.buffer, buf.byteOffset + dataOff, size);
    regions.set(name, bytes);
    tableOff += 24;
    dataOff += size;
  }
  return regions;
}

// Read a unit slot from the units region. Returns null if slot is empty
// (type==0xFF or out of range).
function readUnit(unitsRegion, slotIdx) {
  const stride = 0x20;
  const off = slotIdx * stride;
  if (off + stride > unitsRegion.length) return null;
  const dv = new DataView(unitsRegion.buffer, unitsRegion.byteOffset + off, stride);
  const type = dv.getUint8(0x06);
  if (type === 0xFF) return null;
  const x = dv.getInt16(0x00, true);
  const y = dv.getInt16(0x02, true);
  const statusFlags = dv.getUint16(0x04, true);
  const owner = dv.getUint8(0x07);
  const movesLeft = dv.getUint8(0x08);
  const damageTaken = dv.getUint8(0x0A);
  const order = dv.getUint8(0x0F);
  return {
    slot: slotIdx,
    x, y, type, owner, statusFlags,
    veteran: !!(statusFlags & 0x2000),
    movesLeft,
    damageTaken,
    order,
    // resolveCombat reads .movesRemain as HP-damage (UNIT_HP*10 scale).
    movesRemain: damageTaken,
    // Used by some combat checks; defaults are safe placeholders.
    gx: x, gy: y,
    orders: undefined, // 'fortified' for binary order==2; left undefined unless we map it
  };
}

// ── Snapshot caching ─────────────────────────────────────────────────

const snapCache = new Map();
function loadSnapshotForTurn(n) {
  if (snapCache.has(n)) return snapCache.get(n);
  // Find file matching turn_<NNNN>_*.bin
  const files = readdirSync(sessionDir).filter(f =>
    f.startsWith(`turn_${String(n).padStart(4, '0')}_`) && f.endsWith('.bin'));
  if (files.length === 0) {
    snapCache.set(n, null);
    return null;
  }
  const path = join(sessionDir, files[0]);
  const regions = parseSnapshot(path);
  const result = { path, regions };
  snapCache.set(n, result);
  return result;
}

// ── Map binary's order byte → v3 orders string ───────────────────────

function orderByteToOrders(b) {
  // From Session 3 findings: 1=fortify, 2=fortified, 3=sleep, 5=road,
  // 6=irrigate, 7=mine. Only "fortified" affects defense.
  if (b === 2) return 'fortified';
  return undefined;
}

// ── Run v3 combat with rngEnter, count rand draws ───────────────────

function runV3Combat(att, def, rand_enter) {
  const rng = new SeededRNG(rand_enter);
  rng.callCount = 0;
  const attacker = {
    type: att.type, owner: att.owner, veteran: att.veteran,
    movesRemain: att.movesRemain, gx: att.x, gy: att.y,
  };
  const defender = {
    type: def.type, owner: def.owner, veteran: def.veteran,
    movesRemain: def.movesRemain, orders: orderByteToOrders(def.order),
  };
  // v0 minimal context: open ground, no city, no walls, no fortress.
  // Refine by reading the cities region + map terrain in later passes.
  const defTerrain = 1; // grassland (low defense bonus, common case)
  const result = resolveCombat(
    attacker, defender,
    defTerrain, /*defInCity*/ false, /*defCityHasWalls*/ false,
    /*defHasFortress*/ false, /*defOnRiver*/ false,
    /*defCityBuildings*/ null, /*extraSeed*/ 0,
    /*difficulty*/ 'deity', /*atkMovesLeft*/ null,
    { useStateRng: rng }
  );
  return { draws: rng.callCount, finalState: rng.state, result };
}

// ── Main loop ────────────────────────────────────────────────────────

const resolved = combatPairs.filter(p => p.rand_enter !== p.rand_exit);
console.log(`# ${combatPairs.length} pairs (${resolved.length} with rand draws)`);
console.log('');

let okDraws = 0, okExit = 0, okBoth = 0, snapMissing = 0, unitMissing = 0, total = 0;

console.log('idx | turn | u→k       | bin draws | v3 draws | v3 state == bin rand_exit?');
console.log('----+------+-----------+-----------+----------+-------------------------');

for (let i = 0; i < resolved.length; i++) {
  const p = resolved[i];
  total++;
  const turn = turnOverride != null ? turnOverride : turnAtTime(p.time_ms);
  const binDraws = stepCount(p.rand_enter, p.rand_exit);
  const snap = turn >= 0 ? loadSnapshotForTurn(turn) : null;
  if (!snap) {
    snapMissing++;
    console.log(` ${String(i).padStart(2)} | ${String(turn).padStart(4)} | ${String(p.unitIdx).padStart(3)}→${String(p.killerIdx).padStart(3)} | ` +
      `${String(binDraws).padStart(9)} | (no snap)`);
    continue;
  }
  const unitsRegion = snap.regions.get('units');
  if (!unitsRegion) { snapMissing++; continue; }
  const def = readUnit(unitsRegion, p.unitIdx);
  const att = readUnit(unitsRegion, p.killerIdx);
  if (!def || !att) {
    unitMissing++;
    console.log(` ${String(i).padStart(2)} | ${String(turn).padStart(4)} | ${String(p.unitIdx).padStart(3)}→${String(p.killerIdx).padStart(3)} | ` +
      `${String(binDraws).padStart(9)} | (unit empty in snapshot)`);
    continue;
  }
  let v3Draws, v3State, err;
  try {
    const out = runV3Combat(att, def, p.rand_enter);
    v3Draws = out.draws;
    v3State = out.finalState;
  } catch (e) {
    err = e.message;
  }
  if (err) {
    console.log(` ${String(i).padStart(2)} | ${String(turn).padStart(4)} | ${String(p.unitIdx).padStart(3)}→${String(p.killerIdx).padStart(3)} | ` +
      `${String(binDraws).padStart(9)} | ERR: ${err}`);
    continue;
  }
  const exitMatch = (v3State >>> 0) === (p.rand_exit >>> 0);
  const drawsMatch = v3Draws === binDraws;
  if (drawsMatch) okDraws++;
  if (exitMatch) okExit++;
  if (drawsMatch && exitMatch) okBoth++;
  const flag = drawsMatch ? (exitMatch ? 'OK' : 'draws-only') : 'MISMATCH';
  console.log(` ${String(i).padStart(2)} | ${String(turn).padStart(4)} | ${String(p.unitIdx).padStart(3)}→${String(p.killerIdx).padStart(3)} | ` +
    `${String(binDraws).padStart(9)} | ${String(v3Draws).padStart(8)} | ` +
    `bin=0x${(p.rand_exit >>> 0).toString(16).padStart(8, '0')} ` +
    `v3=0x${(v3State >>> 0).toString(16).padStart(8, '0')} [${flag}] ` +
    `att=t${att.type}/o${att.owner}${att.veteran ? '/V' : ''}/d${att.damageTaken} ` +
    `def=t${def.type}/o${def.owner}${def.veteran ? '/V' : ''}/d${def.damageTaken}`);
}

console.log('');
console.log(`Resolved combats: ${total}`);
console.log(`  draws match (count of rand calls):     ${okDraws} / ${total}`);
console.log(`  rand_exit match (final state byte-eq): ${okExit} / ${total}`);
console.log(`  both match (full lock-step):           ${okBoth} / ${total}`);
if (snapMissing) console.log(`  skipped (no snapshot for turn):       ${snapMissing}`);
if (unitMissing) console.log(`  skipped (unit slot empty in snap):    ${unitMissing}`);
