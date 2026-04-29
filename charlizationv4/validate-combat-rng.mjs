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
import { UNIT_HP, UNIT_DOMAIN, UNIT_MOVE_POINTS, MOVEMENT_MULTIPLIER, DIFFICULTY_KEYS } from '../charlizationv3/engine/defs.js';

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
      // captureRandSequence (post-2026-04-28): per-call effective-strength
      // returns from FUN_0057e2c3 / FUN_0057e33a, captured via temp
      // listeners during this combat. Lets us pick the binary's actual
      // defender (= last `def` call's unitIdx) bypassing scoring/tiebreaker
      // ambiguity, and see binary's pre-pikeman defense value to localize
      // strength-calc bugs.
      effSequence: e.effSequence || null,
      randSequence: e.randSequence || null,
    });
    pendingCall = null;
  }
}
// Discover the absolute turn numbers of available snapshot files. The
// validator passes "turn-pair index" (0-based, derived from civ_turn_driver
// event ordering) into loadSnap; without this map, loadSnap(0) looks for
// `turn_0000_*.bin` which doesn't exist when sessions start mid-game (e.g.
// game_20260428_204217 captures turns 205-209). Map the relative index to
// the actual filename turn.
const _snapAbsTurns = (() => {
  try {
    const files = readdirSync(sessionDir).filter(f =>
      /^turn_\d+_.*\.bin$/.test(f));
    return files.map(f => parseInt(f.match(/^turn_(\d+)_/)[1], 10))
      .sort((a, b) => a - b);
  } catch { return []; }
})();
function absTurn(relIdx) {
  if (relIdx < 0 || relIdx >= _snapAbsTurns.length) return relIdx;
  return _snapAbsTurns[relIdx];
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

// Parse the snapshot's `unit_types` region (60 entries × 20 bytes,
// captured at base 0x0064B1B8). Per cross-checking FUN_0057e33a:
// real-record offset 4 = flagsA, offset 5 = flagsB, offset 9 = domain.
// Returns null if region missing (older captures) — combat.js falls
// back to hardcoded UNIT_NEGATES_WALLS / UNIT_AIR_INTERCEPTOR / UNIT_DOMAIN.
function parseUnitTypeStats(region) {
  if (!region) return null;
  const STRIDE = 0x14;
  const count = Math.floor(region.bytes.length / STRIDE);
  const out = new Array(count);
  for (let i = 0; i < count; i++) {
    const o = i * STRIDE;
    out[i] = {
      flagsA: region.bytes[o + 0x04],
      flagsB: region.bytes[o + 0x05],
      domain: region.bytes[o + 0x09],
    };
  }
  return out;
}

// Sidecar fallback for older captures missing the `unit_types` region.
// `dump-unit-types.py` writes JSON into one of these locations (preferred
// first): <session-dir>/unit_types.json, or charlizationv4/unit_types.json.
// The user runs the dumper while civ2.exe has the same scenario loaded;
// we then have scenario-correct flagsA/flagsB/domain.
let _sidecarCache = null;
function loadSidecarUnitTypes() {
  if (_sidecarCache !== null) return _sidecarCache || null;
  const candidates = [
    join(sessionDir, 'unit_types.json'),
    join(import.meta.dirname || '.', 'unit_types.json'),
  ];
  for (const path of candidates) {
    try {
      const data = JSON.parse(readFileSync(path, 'utf-8'));
      if (Array.isArray(data?.types)) {
        const out = new Array(data.types.length);
        for (const t of data.types) {
          out[t.type] = { flagsA: t.flagsA, flagsB: t.flagsB, domain: t.domain };
        }
        console.log(`# Loaded unit_types sidecar: ${path}`);
        _sidecarCache = out;
        return out;
      }
    } catch (_) { /* not present */ }
  }
  _sidecarCache = false;
  return null;
}

// Resolve unit_type_stats for a snapshot: prefer the in-snapshot region,
// else the JSON sidecar (only useful for older captures where civ2.exe
// can be re-launched with the same scenario to dump the runtime table).
function resolveUnitTypes(regions) {
  const fromSnap = regions ? parseUnitTypeStats(regions.get('unit_types')) : null;
  if (fromSnap) return fromSnap;
  return loadSidecarUnitTypes();
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
      // Buildings bitmap at offset 0x34..0x38 (5 bytes packed, 8 IDs
      // per byte). Combat code (FUN_0057e33a's walls check) calls
      // FUN_0043d20a → FUN_005ae3bf which maps id → (byteIdx = id >> 3,
      // bitMask = 1 << (id & 7)) and reads byte at city[0x34 + byteIdx].
      // Earlier we read 0x30 (per stale Civ2_City_Struct.md doc) — that
      // location is actually worker-tile bitmasks, NOT buildings.
      // sniff-game.py's parser already uses 0x34 (line 374-384, 418).
      // This was the source of multiple "walls present per v3 / no walls
      // per binary" mismatches in late-game combats (idx 1-4, 24).
      const buildings = new Set();
      for (let id = 1; id < 40; id++) {
        const byteIdx = id >> 3;
        const mask = 1 << (id & 7);
        if (citiesRegion.bytes[off + 0x34 + byteIdx] & mask) buildings.add(id);
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

// Detect FUN_00580341's war-state branch (lines 280-386) for sneak-attack
// effects. Returns { applies, popularityCheck }.
//   applies         → true when binary doubles effAtk (line 384: local_a0<<1)
//   popularityCheck → true when binary makes the pre-combat rand call (line
//                     346) for the popularity-dip check; gated on
//                     attacker.gov > 4 (Republic / Democracy).
//
// Direct condition decode from FUN_00580341:280 is unreliable because turn
// snapshots are only at turn boundaries — we can't see the exact pre-combat
// civ-relations state for individual mid-turn combats. Instead, we infer
// sneak attack by comparing snapshots: if a civ-pair's relations transition
// from "peace" (rel1 & 0x40 == 0) to "war declared" (rel1 & 0x40 set)
// between turn N and turn N+1, the FIRST combat between them in turn N is
// the sneak attack that declared war.
//
// `firstSneakCombatKeys` (computed once per session) is the set of
// "atkOwner-defOwner-turn" keys that should fire sneak. After the first
// combat for that pair in that turn, the rest treat as already-at-war.
let _sneakCacheCombatTurn = null;
function getSneakCombatKeys() {
  if (_sneakCacheCombatTurn) return _sneakCacheCombatTurn;
  const used = new Set();
  _sneakCacheCombatTurn = used;
  const HDR = 0xA0, STRIDE = 0x594;
  // For each consecutive snapshot pair, find civ pairs whose war-declared
  // bit (byte 1, bit 6 = 0x40 of relation) flipped on.
  for (let t = 0; t < _snapAbsTurns.length - 1; t++) {
    const cur = loadSnap(_snapAbsTurns[t]);
    const nxt = loadSnap(_snapAbsTurns[t + 1]);
    if (!cur || !nxt) continue;
    const c1 = cur.get('civs'), c2 = nxt.get('civs');
    if (!c1 || !c2) continue;
    for (let civA = 1; civA < 8; civA++) {
      for (let civB = 1; civB < 8; civB++) {
        if (civA === civB) continue;
        const off = HDR + civB * STRIDE + 0x20 + civA * 4 + 1; // civB.rel[civA].byte1
        if (off >= c1.bytes.length || off >= c2.bytes.length) continue;
        const before = c1.bytes[off];
        const after = c2.bytes[off];
        // war-declared bit transitioned from clear → set
        if ((before & 0x40) === 0 && (after & 0x40) !== 0) {
          // civA attacked civB → first combat in turn _snapAbsTurns[t]
          // marks (civA, civB) for sneak.
          used.add(`${civA}-${civB}-${_snapAbsTurns[t]}`);
        }
      }
    }
  }
  return used;
}
const _sneakCombatPairUsed = new Set();
function detectSneakAttack(regions, atkOwner, defOwner, snapTurn) {
  const r = { applies: false, popularityCheck: false };
  if (atkOwner == null || defOwner == null) return r;
  if (atkOwner === 0 || defOwner === 0) return r;
  if (atkOwner === defOwner) return r;
  const civs = regions ? regions.get('civs') : null;
  if (!civs) return r;
  const HDR = 0xA0, STRIDE = 0x594;
  // war-declaration must happen during the turn that contains this combat.
  // snapTurn is the turn N+1 the validator loaded; the actual combat turn
  // is snapTurn - 1.
  const combatTurn = snapTurn - 1;
  const sneakKeys = getSneakCombatKeys();
  const key = `${atkOwner}-${defOwner}-${combatTurn}`;
  // Use only the FIRST combat for that pair in that turn. We track which
  // (pair,turn) combinations we've already consumed.
  const consumeKey = `consumed-${key}`;
  if (sneakKeys.has(key) && !_sneakCombatPairUsed.has(consumeKey)) {
    _sneakCombatPairUsed.add(consumeKey);
    r.applies = true;
    const atkBase = HDR + atkOwner * STRIDE;
    if (atkBase + 0x16 <= civs.bytes.length) {
      const atkGov = civs.bytes[atkBase + 0x15];
      if (atkGov > 4) r.popularityCheck = true;
    }
  }
  return r;
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

function findDefenderByDirection(allUnits, attacker, direction, ctx, unitTypeStats) {
  const delta = DIR_DELTAS[direction];
  if (!delta) return null;
  const tx = attacker.x + delta[0], ty = attacker.y + delta[1];
  // Mimic calc_stack_best_defender (FUN_0057e6e2): scoring matches
  // production v3 calcStackBestDefender — HP-RATIO weighting, not
  // raw HP. Cross-type stacks (e.g., Settlers max=20 vs Sub max=10)
  // would otherwise pick wrong unit.
  let best = null;
  let bestScore = -1;
  for (const u of allUnits) {
    if (u.x !== tx || u.y !== ty) continue;
    if (u.owner === attacker.owner) continue;
    // Binary FUN_0057e6e2:5429 — skip land defenders on ocean tiles.
    // Pinpointed via idx 149 (StealthFighter t32 attacking ocean stack
    // of Settlers + Warriors + sea-domain t32): binary picks the only
    // sea-domain defender. v3's validator was picking Settlers (highest
    // raw HP × def) — wrong unit, wrong combat outcome.
    const unitDomain = UNIT_DOMAIN[u.type] ?? 0;
    if (ctx.defTerrain === 10 && unitDomain === 0) continue;
    const candidate = {
      type: u.type, owner: u.owner,
      veteran: !!(u.statusFlags & 0x2000),
      orders: u.order === 2 ? 'fortified' : undefined,
      movesRemain: u.damageTaken,
    };
    const def = calcUnitDefenseStrength(
      candidate, ctx.defTerrain, ctx.defInCity, ctx.defCityHasWalls,
      ctx.defHasFortress, ctx.defOnRiver, ctx.defCityBuildings,
      attacker.type, unitTypeStats ? { unitTypeStats } : undefined,
    );
    const maxHp = (UNIT_HP[u.type] || 1) * 10;
    const hp = maxHp - u.damageTaken;
    if (hp <= 0) continue;
    const score = Math.floor(def * hp / maxHp);
    // Match calcStackBestDefender's tiebreaker: >= so the later-iterated
    // unit wins on a tie (tested case: Settler+Legion at same tile both
    // score 80 — binary picks Legion, the higher-slot unit).
    if (score >= bestScore) { best = u; bestScore = score; }
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
// When the Frida agent captured effSequence (post-2026-04-28), use it
// as the authoritative defender source. The picked defender is the unit
// FUN_0057e33a was called on TWICE (once during best-pick iteration,
// once for the actual combat call after FUN_0057e6e2 returns). The
// LAST def call is always the picked defender.
function defenderSlotFromEffSequence(effSequence) {
  if (!Array.isArray(effSequence) || effSequence.length === 0) return null;
  for (let i = effSequence.length - 1; i >= 0; i--) {
    if (effSequence[i].fn === 'def') return effSequence[i].unitIdx;
  }
  return null;
}

function pickFromCombatContext(combat) {
  const cc = combat.combatContext;
  if (!cc?.attacker) return null;
  // Detect the pre-2026-04-28 Frida slot truncation bug: combatContext was
  // built with attackerIdx & 0xFF, so for slots >= 256 it captured the
  // wrong unit's struct. args[0] (= combat.attackerSlot) is NOT truncated.
  // When they disagree by exactly the 0xFF mask, fall through to snapshot.
  const realSlot = combat.attackerSlot >>> 0;
  const ccSlot = (cc.attackerIdx >>> 0);
  if (realSlot !== ccSlot && (realSlot & 0xFF) === ccSlot) return null;
  const baseTurn = turnAtTime(combat.time_ms);
  // Snapshots are captured at start-of-turn (after settle from turn-change
  // events), so turn N's snap reflects end-of-turn-(N-1) state. A combat
  // at turn N happens DURING turn N's processing — by which point
  // mid-turn tile changes (Settler completes fortress/irrigation, city
  // founded, pollution cleared) may have applied. Prefer turn N+1's snap
  // for tile/city state (it captures end-of-turn-N), falling back to
  // turn N or earlier. Fixed idx 203 (fortress at (62,18) built mid-turn
  // 132 by AI Settler — only visible in turn 133's snapshot).
  // Translate relative turn-pair index → absolute snapshot turn so loadSnap
  // finds turn_NNNN_*.bin even when the session starts mid-game.
  const baseAbs = absTurn(baseTurn);
  const tries = [baseAbs + 1, baseAbs];
  for (let d = 1; d <= 5; d++) tries.push(baseAbs - d, baseAbs + d + 1);
  let regions = null, turn = baseAbs;
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
  // Override city fields with Frida's per-combat city capture when
  // present. Snapshots are start-of-turn so they miss mid-turn captures
  // (which can destroy walls). The cities array in combatContext is
  // captured at FUN_00580341 entry — exact pre-combat state.
  if (Array.isArray(cc.cities) && cc.cities.length) {
    const cityHere = cc.cities.find(c => c.x === tx && c.y === ty);
    if (cityHere) {
      const buildings = new Set(cityHere.buildings);
      ctx.defInCity = true;
      ctx.defCityHasWalls = buildings.has(8);
      ctx.defCityHasPalace = buildings.has(1);
      ctx.defCityBuildings = buildings;
      ctx.defCitySize = cityHere.size;
    } else {
      // Frida saw the 9-tile window and there's no city at the target
      // tile — overrides any stale snapshot reading.
      ctx.defInCity = false;
      ctx.defCityHasWalls = false;
      ctx.defCityHasPalace = false;
      ctx.defCityBuildings = null;
      ctx.defCitySize = 0;
    }
  }
  // Map Frida neighbor structs into the validator's unit shape.
  const allUnits = (cc.neighbors || []).map(n => ({
    slot: n.slot, x: n.x, y: n.y,
    statusFlags: n.statusFlags, type: n.type, owner: n.owner,
    movesLeft: n.movesRem, damageTaken: n.hp, order: n.orders,
  }));
  // Authoritative pick from effSequence when available — bypasses
  // tiebreaker ambiguity between Frida's neighbors order and binary's
  // stack iteration order.
  const pickedSlot = defenderSlotFromEffSequence(combat.effSequence);
  let def = null;
  if (pickedSlot != null) {
    def = allUnits.find(u => u.slot === pickedSlot);
  }
  if (!def) {
    def = findDefenderByDirection(allUnits, att, combat.direction, ctx,
      resolveUnitTypes(regions));
  }
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
  const baseAbs = absTurn(baseTurn);
  const tries = [baseAbs];
  for (let d = 1; d <= 5; d++) tries.push(baseAbs - d, baseAbs + d);
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
    const def = findDefenderByDirection(allUnits, att, combat.direction, ctx,
      resolveUnitTypes(regions));
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
  const wondersRegion = regions ? regions.get('wonders') : null;
  const globalsRegion = regions ? regions.get('globals') : null;
  const citiesRegion = regions ? regions.get('cities') : null;
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
    // Per binary FUN_00580341:108-110, fractional-MP attack penalty is
    // unconditional in resolve mode: effAtk *= min(movesLeft, MM) / MM.
    // Frida's `movesRem` field is actually movesUSED (unit struct byte
    // 0x08 = moves used this turn — see FUN_005b2c3d). Convert to
    // remaining and thread it through.
    const movesUsed = att.movesLeft;
    const maxInternalMoves = (UNIT_MOVE_POINTS[att.type] || 1) * MOVEMENT_MULTIPLIER;
    const atkMovesLeft = Math.max(0, maxInternalMoves - movesUsed);
    // Sneak-attack detection from snapshot civ relations.
    // Binary FUN_00580341:280-386 takes the war-state branch when the
    // attacker is breaking a peace/ceasefire. That branch (a) doubles
    // effAtk and (b) makes one pre-combat rand call for popularity-dip
    // when attacker's gov > 4 (Republic/Democracy).
    // Sneak attack is opt-in via env var. The snapshot-diff heuristic
    // (war-bit transitions across turn boundaries + first-combat-per-pair)
    // closes idx 3 of game_20260428_204217 cleanly but produces both false
    // positives and false negatives on longer sessions where civs declare
    // war multiple times. v3's `sneakAttackPopularityCheck` port is
    // correct; reliable per-combat detection requires Frida to capture
    // the binary's bVar18 flag at FUN_00580341 entry, not a snapshot diff.
    const sneak = process.env.VALIDATE_SNEAK
      ? detectSneakAttack(regions, att.owner, def.owner, turn)
      : { applies: false, popularityCheck: false };
    resolveCombat(
      attacker, defender,
      defTerrain, defInCity, defCityHasWalls, defHasFortress, defOnRiver,
      defCityBuildings, /*extraSeed*/ 0,
      difficulty, atkMovesLeft,
      {
        useStateRng: rng,
        defenderHasGreatWall,
        attackerHasGreatWall,
        defCityHasPalace,
        defCitySize,
        humanPlayers: HUMAN_PLAYERS_MASK,
        unitTypeStats: resolveUnitTypes(regions),
        sneakAttack: sneak.applies,
        sneakAttackPopularityCheck: sneak.popularityCheck,
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
  // Effective-strength diagnostic: when bin captured atk/def calls, compare
  // last atk and last def return values to v3's locally-computed strengths.
  // This pinpoints which side has the calc gap (mismatch in effAtk vs effDef).
  if (!drawsMatch && Array.isArray(p.effSequence) && p.effSequence.length) {
    let lastAtk = null, lastDef = null;
    for (let k = p.effSequence.length - 1; k >= 0; k--) {
      const e = p.effSequence[k];
      if (!lastDef && e.fn === 'def') lastDef = e;
      if (!lastAtk && e.fn === 'atk') lastAtk = e;
      if (lastAtk && lastDef) break;
    }
    const v3DefCandidate = {
      type: def.type, owner: def.owner,
      veteran: !!(def.statusFlags & 0x2000),
      movesRemain: def.damageTaken,
      orders: def.order === 2 ? 'fortified' : undefined,
    };
    const v3Def = calcUnitDefenseStrength(
      v3DefCandidate, defTerrain, defInCity, defCityHasWalls,
      defHasFortress, defOnRiver, defCityBuildings, att.type,
      { unitTypeStats: resolveUnitTypes(regions) },
    );
    const binDef = lastDef ? lastDef.val : null;
    const binAtk = lastAtk ? lastAtk.val : null;
    const tags = [];
    if (defInCity) tags.push('city');
    if (defCityHasWalls) tags.push('walls');
    if (defHasFortress) tags.push('fort');
    if (defOnRiver) tags.push('river');
    if (def.order === 2) tags.push('fortified');
    if (def.statusFlags & 0x2000) tags.push('vet');
    const ctxStr = tags.length ? `[${tags.join(',')}]` : '[-]';
    console.log(`         effDef bin=${binDef} v3=${v3Def}` +
      (binAtk != null ? ` | effAtk bin=${binAtk}` : '') +
      ` | def slot=${lastDef?.unitIdx} flag=${lastDef?.flag} atkIdx=${lastDef?.atkIdx} ` +
      `${ctxStr} terr=${defTerrain} ord=${def.order} t=${def.type}`);
  }
}

console.log('');
console.log(`Resolved combats: ${total}`);
console.log(`  draws match:               ${okDraws} / ${total}`);
console.log(`  rand_exit match:           ${okExit} / ${total}`);
console.log(`  full lock-step (both):     ${okBoth} / ${total}`);
if (noMatch) console.log(`  skipped (no usable snap):  ${noMatch}`);
if (errors)  console.log(`  errors:                    ${errors}`);
