// Validate v3's combat resolver against the binary's RNG consumption.
//
// FUN_00580341(param_1=attackerSlot, param_2=direction, param_3=barbHalveFlag)
//   - param_1 (Frida arg 0): slot of the attacker unit.
//   - param_2 (Frida arg 1): direction index 0..7 — offsets into the
//     binary's DAT_00628350 (dx) / DAT_00628360 (dy) tables.
//   - param_3 (not captured): barbarian half-attack flag.
//
// The defender lives at attacker.pos + delta[direction]. We don't have
// the direction tables extracted, so we instead scan all 8 neighbors
// of the attacker and pick the highest-HP enemy. This is correct when
// only one enemy is adjacent (the common case for clean combats).
//
// Strategy:
//   1. For each combat, infer turn N via civ_turn_driver(civSlot=0)
//      call counts up to the combat time.
//   2. Try snapshots [N, N-1, N+1, N-2, N+2] and pick the first one
//      where (a) units[attackerSlot] is non-empty and (b) at least one
//      enemy unit sits adjacent to the attacker.
//   3. Read defender's tile terrain + river + fortress from the tiles
//      region.
//   4. Read defender's city (if any) — extract walls, palace, coastal
//      fortress, SAM Battery, SDI Defense from the building bitmap.
//   5. Read difficulty from the globals region.
//   6. Read the wonders region; thread Great Wall ownership into opts
//      (defenderHasGreatWall / attackerHasGreatWall).
//   7. Seed SeededRNG with rand_enter, run resolveCombat() with
//      opts.useStateRng so every rand draw advances the seed and
//      bumps callCount. Compare draw count + final state to binary's.
//
// Usage: node validate-combat-rng.mjs <session-dir>

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { SeededRNG } from '../charlizationv3/engine/rng.js';
import { resolveCombat, calcUnitDefenseStrength } from '../charlizationv3/engine/combat.js';
import { UNIT_HP, DIFFICULTY_KEYS } from '../charlizationv3/engine/defs.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-combat-rng.mjs <session-dir>');
  process.exit(1);
}
const verbose = process.argv.includes('--verbose');

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
      // Frida's pre-combat struct dump (added with captureCombatContext).
      // Present iff the session was captured with the post-2026-04-27 PM
      // hook update; older sessions fall back to snapshot lookup.
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
      // Buildings bitmap at offset 0x30 (uint32). Per binary
      // FUN_004e78ce: hasBuilding(cityIdx, id) = (improvements_lo &
      // (1 << (id & 0x1f))) != 0. Bits 0-31 cover building IDs 1-31.
      // Buildings 32-38 live elsewhere (not needed for combat-relevant
      // bonuses: walls/palace/coastal/SAM/SDI all fall in 1-28).
      const improvementsLo = dv.getUint32(0x30, true);
      const buildings = new Set();
      for (let b = 1; b <= 31; b++) {
        if (improvementsLo & (1 << b)) buildings.add(b);
      }
      return {
        idx: i, x: cx, y: cy,
        owner: dv.getUint8(0x08),
        size: dv.getUint8(0x09),
        buildings,
      };
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
  return {
    terrain: b0 & 0x0F,
    river: !!(b0 & 0x80),
    fortress: !!(b1 & 0x40),
  };
}

function readDifficulty(globalsRegion) {
  // Difficulty byte at 0x655B08 (per memory map). Globals region starts
  // at 0x655AF0, so offset = 0x18.
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
  // raw = city index; resolve to owner
  const cityOff = raw * CITY_STRIDE;
  if (cityOff + CITY_STRIDE > citiesRegion.bytes.length) return null;
  const cdv = new DataView(citiesRegion.bytes.buffer,
    citiesRegion.bytes.byteOffset + cityOff, CITY_STRIDE);
  return cdv.getUint8(0x08); // owner
}

// ── Direction-delta table ───────────────────────────────────────────
// Derived empirically from confirmed-match combats (game_20260427_191137):
//   dir 1 = (2,0)   E    [idx 3, 8]
//   dir 2 = (1,1)   SE   [idx 6]
//   dir 4 = (-1,1)  SW   [idx 0]
//   dir 5 = (-2,0)  W    [idx 1, 5]
//   dir 6 = (-1,-1) NW   [idx 2, 7, 11]
// Filling in the rotational pattern (45° CCW per step):
//   0 NE, 1 E, 2 SE, 3 S, 4 SW, 5 W, 6 NW, 7 N.
// Matches binary's DAT_00628350/DAT_00628360 dx/dy layout.
const DIR_DELTAS = [
  [ 1, -1], [ 2,  0], [ 1,  1], [ 0,  2],
  [-1,  1], [-2,  0], [-1, -1], [ 0, -2],
];

function findDefenderByDirection(allUnits, attacker, direction, ctx) {
  const delta = DIR_DELTAS[direction];
  if (!delta) return null;
  const tx = attacker.x + delta[0], ty = attacker.y + delta[1];
  // Mimic calc_stack_best_defender: score = defense × hp_ratio, pick
  // max. Includes fortified, fortress, walls, veteran, anti-air, etc.
  let best = null;
  let bestScore = -1;
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
    if (score > bestScore) { best = u; bestScore = score; }
  }
  return best;
}

// ── Multi-snapshot picker ───────────────────────────────────────────

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

// Frida's combatContext gives us pre-combat attacker struct + every
// unit in the 9-tile target window, captured at function entry. Use
// it directly if present — bypasses snapshot timing entirely. Tile
// terrain / city / fortress still come from the closest snapshot
// (those don't change between turn boundaries).
function pickFromCombatContext(combat) {
  const cc = combat.combatContext;
  if (!cc?.attacker) return null;
  const baseTurn = turnAtTime(combat.time_ms);
  // Find any nearby snapshot for tile/city info (terrain rarely
  // changes mid-turn; cities are static unless captured/destroyed).
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
    type: cc.attacker.type,
    owner: cc.attacker.owner,
    movesLeft: cc.attacker.movesRem,
    damageTaken: cc.attacker.hp,
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
  // Map Frida neighbor structs into the validator's unit shape.
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
  // Prefer Frida's pre-combat capture when available — it can't be
  // wrong on slot identity/HP/position because it reads at the binary's
  // function entry, not at a turn boundary.
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

// ── Main ────────────────────────────────────────────────────────────

const resolved = combatPairs.filter(p => p.rand_enter !== p.rand_exit);
console.log(`# ${combatPairs.length} pairs (${resolved.length} with rand draws)`);
console.log('');
console.log('idx | turn | atkSl | dir | bin | v3  | match | notes');
console.log('----+------+-------+-----+-----+-----+-------+------');

let okDraws = 0, okExit = 0, okBoth = 0;
let total = 0, noMatch = 0, errors = 0;

// Default human-civ bitmask. The current sniffer/Frida session
// represents a single-player game with the user as the American (civ 1);
// at deity this matters for the barbarian attack scaling formula.
// TODO: extract from globals/civ flags rather than hardcode.
const HUMAN_PLAYERS_MASK = 0x02;

for (let i = 0; i < resolved.length; i++) {
  const p = resolved[i];
  total++;
  const binDraws = stepCount(p.rand_enter, p.rand_exit);
  const picked = pickSnapshot(p);
  if (!picked) {
    noMatch++;
    console.log(` ${String(i).padStart(2)} | -    | ${String(p.attackerSlot).padStart(5)} | ` +
      `${String(p.direction).padStart(3)} | ${String(binDraws).padStart(3)} | -   |       | ` +
      `(no snapshot has attacker + adj enemy)`);
    continue;
  }
  const { turn, regions, attacker: att, defender: def, ctx } = picked;
  const wondersRegion = regions.get('wonders');
  const globalsRegion = regions.get('globals');
  const citiesRegion = regions.get('cities');
  const { defTerrain, defOnRiver, defHasFortress, defInCity,
          defCityHasWalls, defCityHasPalace, defCityBuildings, defCitySize } = ctx;
  const difficulty = readDifficulty(globalsRegion);

  // Great Wall = wonder 6
  const greatWallOwner = readWonderOwner(wondersRegion, citiesRegion, 6);
  const defenderHasGreatWall = greatWallOwner === def.owner;
  const attackerHasGreatWall = greatWallOwner === att.owner;

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
      defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver,
      defCityBuildings, /*extraSeed*/ 0,
      difficulty, /*atkMovesLeft*/ null,
      {
        useStateRng: rng,
        defenderHasGreatWall,
        attackerHasGreatWall,
        defCityHasPalace,
        defCitySize,
        humanPlayers: HUMAN_PLAYERS_MASK,
      },
    );
    v3Draws = rng.callCount;
    v3State = rng.state;
  } catch (e) {
    errors++;
    console.log(` ${String(i).padStart(2)} | ${String(turn).padStart(4)} | ${String(p.attackerSlot).padStart(5)} | ` +
      `${String(p.direction).padStart(3)} | ${String(binDraws).padStart(3)} | ERR | ${e.message}`);
    continue;
  }
  const drawsMatch = v3Draws === binDraws;
  const exitMatch = (v3State >>> 0) === (p.rand_exit >>> 0);
  if (drawsMatch) okDraws++;
  if (exitMatch) okExit++;
  if (drawsMatch && exitMatch) okBoth++;
  const matchTag = drawsMatch && exitMatch ? 'OK    ' : drawsMatch ? 'draws ' : 'no    ';
  const cityTag = defInCity
    ? `,city/sz${defCitySize}${defCityHasWalls ? ',W' : ''}${defCityHasPalace ? ',P' : ''}`
    : '';
  const fortTag = defHasFortress ? ',fort' : '';
  const riverTag = defOnRiver ? ',river' : '';
  const gwTag = defenderHasGreatWall ? ',d-GW' : (attackerHasGreatWall ? ',a-GW' : '');
  const attVet = !!(att.statusFlags & 0x2000);
  const defVet = !!(def.statusFlags & 0x2000);
  const notes = `att=t${att.type}/o${att.owner}${attVet ? '/V' : ''}/d${att.damageTaken} ` +
    `(${att.x},${att.y}) → def=t${def.type}/o${def.owner}${defVet ? '/V' : ''}/d${def.damageTaken} ` +
    `(${def.x},${def.y}) terrain=${defTerrain}${riverTag}${cityTag}${fortTag}${gwTag} [${difficulty}]`;
  console.log(` ${String(i).padStart(2)} | ${String(turn).padStart(4)} | ${String(p.attackerSlot).padStart(5)} | ` +
    `${String(p.direction).padStart(3)} | ${String(binDraws).padStart(3)} | ${String(v3Draws).padStart(3)} | ` +
    `${matchTag}| ${notes}`);
  if (verbose && !drawsMatch) {
    console.log(`         bin rand_exit=0x${(p.rand_exit >>> 0).toString(16).padStart(8, '0')}, ` +
      `v3 rand_state=0x${(v3State >>> 0).toString(16).padStart(8, '0')}`);
  }
}

console.log('');
console.log(`Resolved combats: ${total}`);
console.log(`  draws match:               ${okDraws} / ${total}`);
console.log(`  rand_exit match:           ${okExit} / ${total}`);
console.log(`  full lock-step (both):     ${okBoth} / ${total}`);
if (noMatch) console.log(`  skipped (no usable snap):  ${noMatch}`);
if (errors)  console.log(`  errors:                    ${errors}`);
