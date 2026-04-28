// Brute-force search for the off-by-N effective-strength bug in v3 combat.
//
// The combat-RNG validator currently lock-steps 91/101 combats byte-equal
// against Civ2's binary. The remaining 8 split into:
//   - 2 captured before captureCombatContext landed (slot reuse)
//   - 6 with full Frida context but off-by-N round counts
//
// For idx 28 (Horsemen vs Warriors, river forest, no city) the binary
// produces 37 draws / rand_exit=0xaecf3fd8; v3 produces 39 / 0xe6008d12.
// Brute-forcing showed v3's `effDef=12, effAtk=16` reach the binary's
// rand_exit when changed to `effDef=13` OR `effAtk=15`. Static reading
// of FUN_00580341 didn't reveal which modifier accounts for that ±1.
//
// This tool perturbs (effAtk, effDef) over a grid for each off-by-N
// combat and reports which perturbations reproduce the binary's
// rand_exit. Looking across all six should expose the common pattern.
//
// Usage: node find-eff-modifier.mjs <session-dir>
//        node find-eff-modifier.mjs <session-dir> --idx=28
//        node find-eff-modifier.mjs <session-dir> --range=4   (default 3)

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { SeededRNG } from '../charlizationv3/engine/rng.js';
import { resolveCombat, calcUnitDefenseStrength } from '../charlizationv3/engine/combat.js';
import { UNIT_HP, UNIT_ATK, UNIT_DEF, UNIT_FP, UNIT_MOVE_POINTS, MOVEMENT_MULTIPLIER, DIFFICULTY_KEYS } from '../charlizationv3/engine/defs.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node find-eff-modifier.mjs <session-dir> [--idx=N] [--range=R]');
  process.exit(1);
}
const onlyIdx = (() => {
  const a = process.argv.find(s => s.startsWith('--idx='));
  return a ? parseInt(a.slice(6), 10) : null;
})();
const RANGE = (() => {
  const a = process.argv.find(s => s.startsWith('--range='));
  return a ? parseInt(a.slice(8), 10) : 3;
})();

// ── LCG step counter ────────────────────────────────────────────────

const LCG_A = 0x343FD;
const LCG_C = 0x269EC3;
function stepCount(start, target, max = 500) {
  let s = start >>> 0;
  for (let i = 0; i <= max; i++) {
    if (s === (target >>> 0)) return i;
    s = (Math.imul(s, LCG_A) + LCG_C) >>> 0;
  }
  return -1;
}

// ── Trace parsing ───────────────────────────────────────────────────

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
      combatContext: pendingCall.combatContext || null,
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

// ── CIV2SNAP parser (copied verbatim from validate-combat-rng.mjs) ──

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

const UNIT_STRIDE = 0x20;
const CITY_STRIDE = 0x58;

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
      const improvementsLo = dv.getUint32(0x30, true);
      const buildings = new Set();
      for (let b = 1; b <= 31; b++) {
        if (improvementsLo & (1 << b)) buildings.add(b);
      }
      return { idx: i, x: cx, y: cy,
        owner: dv.getUint8(0x08), size: dv.getUint8(0x09), buildings };
    }
  }
  return null;
}
function readTileBytes(tilesRegion, mapDimsRegion, x, y) {
  const dvMap = new DataView(mapDimsRegion.bytes.buffer,
    mapDimsRegion.bytes.byteOffset, mapDimsRegion.bytes.length);
  const mw = dvMap.getInt16(0, true);
  const mh = dvMap.getInt16(2, true);
  if (x < 0 || x >= 2 * mw || y < 0 || y >= mh) return null;
  if ((x + y) % 2 !== 0) return null;
  const off = ((mw & ~1) * y + (x & ~1)) * 3;
  if (off < 0 || off + 6 > tilesRegion.bytes.length) return null;
  const b0 = tilesRegion.bytes[off];
  const b1 = tilesRegion.bytes[off + 1];
  return { terrain: b0 & 0x0F, river: !!(b0 & 0x80), fortress: !!(b1 & 0x40) };
}
function readDifficulty(globalsRegion) {
  if (!globalsRegion || globalsRegion.bytes.length < 0x19) return 'deity';
  const idx = globalsRegion.bytes[0x18];
  return DIFFICULTY_KEYS[idx] ?? 'deity';
}
function readWonderOwner(wondersRegion, citiesRegion, wonderId) {
  if (!wondersRegion || wonderId < 0 || wonderId >= 28) return null;
  const dv = new DataView(wondersRegion.bytes.buffer,
    wondersRegion.bytes.byteOffset, wondersRegion.bytes.length);
  const raw = dv.getUint16(wonderId * 2, true);
  if (raw === 0xFFFF || raw === 0xFFEF) return null;
  const cityOff = raw * CITY_STRIDE;
  if (cityOff + CITY_STRIDE > citiesRegion.bytes.length) return null;
  const cdv = new DataView(citiesRegion.bytes.buffer,
    citiesRegion.bytes.byteOffset + cityOff, CITY_STRIDE);
  return cdv.getUint8(0x08);
}

const DIR_DELTAS = [
  [ 1, -1], [ 2,  0], [ 1,  1], [ 0,  2],
  [-1,  1], [-2,  0], [-1, -1], [ 0, -2],
];

function findDefenderByDirection(allUnits, attacker, direction, ctx) {
  const delta = DIR_DELTAS[direction];
  if (!delta) return null;
  const tx = attacker.x + delta[0], ty = attacker.y + delta[1];
  let best = null, bestScore = -1;
  for (const u of allUnits) {
    if (u.x !== tx || u.y !== ty) continue;
    if (u.owner === attacker.owner) continue;
    const candidate = {
      type: u.type, owner: u.owner,
      veteran: !!(u.statusFlags & 0x2000),
      orders: u.order === 2 ? 'fortified' : undefined,
      movesRemain: u.damageTaken,
    };
    const def = calcUnitDefenseStrength(
      candidate, ctx.defTerrain, ctx.defInCity, ctx.defCityHasWalls,
      ctx.defHasFortress, ctx.defOnRiver, ctx.defCityBuildings,
      attacker.type,
    );
    const maxHp = (UNIT_HP[u.type] || 1) * 10;
    const hp = maxHp - u.damageTaken;
    if (hp <= 0) continue;
    const score = def * hp;
    if (score >= bestScore) { best = u; bestScore = score; }
  }
  return best;
}

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

function buildDefenderContext(regions, targetX, targetY) {
  const tile = readTileBytes(regions.get('tiles'), regions.get('map_dims'),
    targetX, targetY);
  const citiesRegion = regions.get('cities');
  const city = citiesRegion ? readCityAt(citiesRegion, targetX, targetY) : null;
  return {
    defTerrain: tile?.terrain ?? 1,
    defOnRiver: !!tile?.river,
    defHasFortress: !!tile?.fortress,
    defInCity: !!city,
    defCityHasWalls: !!city?.buildings.has(8),
    defCityHasPalace: !!city?.buildings.has(1),
    defCityBuildings: city?.buildings ?? null,
    defCitySize: city?.size ?? 0,
    city,
  };
}

function pickFromCombatContext(combat) {
  const cc = combat.combatContext;
  if (!cc?.attacker) return null;
  const baseTurn = turnAtTime(combat.time_ms);
  const tries = [baseTurn];
  for (let d = 1; d <= 5; d++) tries.push(baseTurn - d, baseTurn + d);
  let regions = null, turn = baseTurn;
  for (const t of tries) {
    if (t < 0) continue;
    const r = loadSnap(t);
    if (r && r.get('tiles') && r.get('map_dims')) { regions = r; turn = t; break; }
  }
  const att = {
    slot: cc.attackerIdx,
    x: cc.attacker.x, y: cc.attacker.y,
    statusFlags: cc.attacker.statusFlags,
    type: cc.attacker.type, owner: cc.attacker.owner,
    movesLeft: cc.attacker.movesRem, damageTaken: cc.attacker.hp,
    order: cc.attacker.orders,
  };
  const delta = DIR_DELTAS[combat.direction];
  if (!delta) return null;
  const tx = att.x + delta[0], ty = att.y + delta[1];
  const ctx = regions
    ? buildDefenderContext(regions, tx, ty)
    : { defTerrain: 1, defOnRiver: false, defHasFortress: false,
        defInCity: false, defCityHasWalls: false, defCityHasPalace: false,
        defCityBuildings: null, defCitySize: 0, city: null };
  const allUnits = (cc.neighbors || []).map(n => ({
    slot: n.slot, x: n.x, y: n.y,
    statusFlags: n.statusFlags, type: n.type, owner: n.owner,
    movesLeft: n.movesRem, damageTaken: n.hp, order: n.orders,
  }));
  const def = findDefenderByDirection(allUnits, att, combat.direction, ctx);
  if (!def) return null;
  return { turn, regions, attacker: att, defender: def, ctx, source: 'frida' };
}

function pickSnapshot(combat) {
  const fromFrida = pickFromCombatContext(combat);
  if (fromFrida) return fromFrida;
  const baseTurn = turnAtTime(combat.time_ms);
  if (baseTurn < 0) return null;
  const tries = [baseTurn];
  for (let d = 1; d <= 5; d++) tries.push(baseTurn - d, baseTurn + d);
  for (const t of tries) {
    if (t < 0) continue;
    const regions = loadSnap(t);
    if (!regions) continue;
    const unitsRegion = regions.get('units');
    if (!unitsRegion) continue;
    const att = readUnit(unitsRegion, combat.attackerSlot);
    if (!att) continue;
    const delta = DIR_DELTAS[combat.direction];
    if (!delta) continue;
    const tx = att.x + delta[0], ty = att.y + delta[1];
    const ctx = buildDefenderContext(regions, tx, ty);
    const allUnits = readAllUnits(unitsRegion);
    const def = findDefenderByDirection(allUnits, att, combat.direction, ctx);
    if (def) return { turn: t, regions, attacker: att, defender: def, ctx, source: 'snap' };
  }
  return null;
}

// ── Single-combat run helper ────────────────────────────────────────

const HUMAN_PLAYERS_MASK = 0x02;

function runCombat(picked, p, override) {
  const { regions, attacker: att, defender: def, ctx } = picked;
  const wondersRegion = regions.get('wonders');
  const globalsRegion = regions.get('globals');
  const citiesRegion = regions.get('cities');
  const { defTerrain, defOnRiver, defHasFortress, defInCity,
          defCityHasWalls, defCityHasPalace, defCityBuildings, defCitySize } = ctx;
  const difficulty = readDifficulty(globalsRegion);
  const greatWallOwner = readWonderOwner(wondersRegion, citiesRegion, 6);
  const defenderHasGreatWall = greatWallOwner === def.owner;
  const attackerHasGreatWall = greatWallOwner === att.owner;
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
  const outEff = {};
  const opts = {
    useStateRng: rng,
    defenderHasGreatWall, attackerHasGreatWall,
    defCityHasPalace, defCitySize,
    humanPlayers: HUMAN_PLAYERS_MASK,
    outEff,
  };
  if (override) {
    if (override.effAtk != null) opts.effAtkOverride = override.effAtk;
    if (override.effDef != null) opts.effDefOverride = override.effDef;
  }
  const movesUsed = att.movesLeft;
  const maxInternalMoves = (UNIT_MOVE_POINTS[att.type] || 1) * MOVEMENT_MULTIPLIER;
  const atkMovesLeft = Math.max(0, maxInternalMoves - movesUsed);
  resolveCombat(
    attacker, defender,
    defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver,
    defCityBuildings, /*extraSeed*/ 0,
    difficulty, atkMovesLeft, opts,
  );
  return { draws: rng.callCount, state: rng.state >>> 0,
           baselineEffAtk: outEff.effAtk, baselineEffDef: outEff.effDef };
}

// ── Main: scan all combats, run baseline, sweep mismatches ──────────

const resolved = combatPairs.filter(p => p.rand_enter !== p.rand_exit);

console.log(`# session: ${sessionDir}`);
console.log(`# resolved combats: ${resolved.length}, range=±${RANGE}`);
console.log('');

const offByN = [];
for (let i = 0; i < resolved.length; i++) {
  if (onlyIdx != null && i !== onlyIdx) continue;
  const p = resolved[i];
  const binDraws = stepCount(p.rand_enter, p.rand_exit);
  const picked = pickSnapshot(p);
  if (!picked) continue;
  let baseline;
  try { baseline = runCombat(picked, p, null); } catch { continue; }
  const exitMatch = baseline.state === (p.rand_exit >>> 0);
  const drawsMatch = baseline.draws === binDraws;
  if (exitMatch && drawsMatch) continue; // already lock-step
  offByN.push({ idx: i, p, picked, binDraws, baseline });
}

console.log(`# off-by-N combats: ${offByN.length}`);
console.log('');

const targetExit = (p) => p.rand_exit >>> 0;

// Count each (da, dd) pattern's occurrence across all combats
const patternHits = new Map();

for (const item of offByN) {
  const { idx, p, picked, binDraws, baseline } = item;
  const att = picked.attacker, def = picked.defender, ctx = picked.ctx;
  const attVet = !!(att.statusFlags & 0x2000);
  const defVet = !!(def.statusFlags & 0x2000);
  const cityTag = ctx.defInCity
    ? `,city/sz${ctx.defCitySize}${ctx.defCityHasWalls ? ',W' : ''}${ctx.defCityHasPalace ? ',P' : ''}`
    : '';
  const fortTag = ctx.defHasFortress ? ',fort' : '';
  const riverTag = ctx.defOnRiver ? ',river' : '';
  console.log(`──── idx ${idx} ─────────────────────────────────────────`);
  console.log(`  att=t${att.type}/o${att.owner}${attVet ? '/V' : ''}/d${att.damageTaken} ` +
    `(${att.x},${att.y}) → def=t${def.type}/o${def.owner}${defVet ? '/V' : ''}/d${def.damageTaken} ` +
    `(${def.x},${def.y}) terrain=${ctx.defTerrain}${riverTag}${cityTag}${fortTag}`);
  console.log(`  unit-base: atk[t${att.type}]=${UNIT_ATK[att.type]} def[t${def.type}]=${UNIT_DEF[def.type]} ` +
    `fp_a=${UNIT_FP[att.type]} fp_d=${UNIT_FP[def.type]} hp_a=${UNIT_HP[att.type]} hp_d=${UNIT_HP[def.type]}`);
  console.log(`  v3 baseline: effAtk=${baseline.baselineEffAtk} effDef=${baseline.baselineEffDef} ` +
    `draws=${baseline.draws} (bin=${binDraws}) state=0x${baseline.state.toString(16).padStart(8,'0')} ` +
    `(bin=0x${targetExit(p).toString(16).padStart(8,'0')})`);

  // Sweep grid around v3's baseline.
  const baseAtk = baseline.baselineEffAtk;
  const baseDef = baseline.baselineEffDef;
  const matches = [];
  for (let da = -RANGE; da <= RANGE; da++) {
    for (let dd = -RANGE; dd <= RANGE; dd++) {
      if (da === 0 && dd === 0) continue;
      const eA = baseAtk + da, eD = baseDef + dd;
      if (eA < 1 || eD < 1) continue;
      let r;
      try { r = runCombat(picked, p, { effAtk: eA, effDef: eD }); }
      catch { continue; }
      if (r.state === targetExit(p) && r.draws === binDraws) {
        matches.push({ da, dd, eA, eD });
      }
    }
  }
  if (matches.length === 0) {
    console.log(`  NO match within ±${RANGE} grid`);
  } else {
    for (const m of matches) {
      const tag = `da=${m.da >= 0 ? '+' : ''}${m.da},dd=${m.dd >= 0 ? '+' : ''}${m.dd}`;
      console.log(`  match: effAtk=${m.eA} effDef=${m.eD}  (${tag})`);
      patternHits.set(tag, (patternHits.get(tag) || 0) + 1);
    }
  }
  console.log('');
}

if (offByN.length > 1) {
  console.log('──── pattern frequency across all off-by-N combats ────');
  const sorted = [...patternHits.entries()].sort((a, b) => b[1] - a[1]);
  for (const [tag, count] of sorted) {
    console.log(`  ${tag.padEnd(14)} ${count}/${offByN.length}`);
  }
}
