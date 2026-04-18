#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// dump-server-state.js — Load a .sav via Civ2Parser, dump scalar state
// as JSON in the same schema as snapshot-to-state-json.py output.
//
// Usage: node dump-server-state.js <save.sav>
//
// Side B of the fidelity diff. Starting small: top-level scalars only.
// Schema intentionally matches the sniffer side (raw ints, matching
// field names) so a simple field-level diff can compare them.
//
// N=0 intentionally — no turns are run. Validates the parser in
// isolation before any game logic can diverge.
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { initFromSav } from '../charlizationv3/engine/init.js';
import { applyAction } from '../charlizationv3/engine/reducer.js';
import { runAiTurn } from '../charlizationv3/engine/ai/index.js';
import { v4EndTurn, initV4 } from './v4-bridge.js';
import { loadSav as loadSavIntoMem } from './sav-loader.js';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { buildSav } from './sav-from-mem.js';
import { FUN_00484fec } from './blocks/block_00480000.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Try to load RULES.TXT for v4-bridge. Same path search as server.js so
// this harness mirrors what the running server does.
function initV4IfPossible() {
  const candidates = [
    process.env.CIV2_RULES,
    '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT',
    join(__dirname, '..', 'civ2gamefolder', 'RULES.TXT'),
    'C:/Users/stuar/OneDrive/Documents/Games/Civilization II Multiplayer Gold Edition/RULES.TXT',
  ].filter(Boolean);
  const p = candidates.find(x => existsSync(x));
  if (p) {
    initV4(readFileSync(p, 'utf8'));
    process.stderr.write(`[v4] Initialized from ${p}\n`);
    return true;
  }
  process.stderr.write(`[v4] RULES.TXT not found — v4EndTurn will no-op.\n`);
  return false;
}

const args = process.argv.slice(2);
const inputPath = args.find(a => !a.startsWith('--'));
if (!inputPath) {
  console.error('Usage: node dump-server-state.js <save.sav|snapshot.bin> [--turns N]');
  console.error('       Input can be a Civ2 .sav file OR a CIV2SNAP sniffer dump.');
  console.error('       --turns N runs END_TURN for each alive civ, N times.');
  process.exit(1);
}
// Keep legacy name for readability in the rest of the file
const savPath = inputPath;
const turnsArg = args.find(a => a.startsWith('--turns'));
const turns = turnsArg
  ? parseInt(turnsArg.includes('=') ? turnsArg.split('=')[1] : args[args.indexOf(turnsArg) + 1])
  : 0;
// --no-v4-bridge: skip v4 binary engine's per-civ yield recalc after each
// END_TURN. Harness runs v3 reducer only. Useful for diagnosing whether
// divergence is from v3's calc or from double-processing when v4-bridge
// also runs.
const skipV4Bridge = args.includes('--no-v4-bridge');

// The parser post-processes a few raw bytes into friendly names.
// Map them back to ints so the schema matches what the sniffer reads
// directly from memory.
const DIFFICULTY_TO_INT = {
  chieftain: 0, warlord: 1, prince: 2, king: 3, emperor: 4, deity: 5,
};
const GOV_TO_INT = {
  anarchy: 0, despotism: 1, monarchy: 2, communism: 3,
  fundamentalism: 4, republic: 5, democracy: 6,
};

const toInt = (val, map) => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const v = map[val.toLowerCase()];
    return v !== undefined ? v : val;
  }
  return val;
};

// Auto-detect input type via magic bytes.
//   CIVILIZE → real .sav file, parse directly
//   CIV2SNAP → sniffer dump, load into _MEM first then synthesize a .sav
const rawBuf = new Uint8Array(readFileSync(savPath));
const magic = String.fromCharCode(...rawBuf.slice(0, 8));
let savBuf;
let sourceKind;
if (magic === 'CIVILIZE') {
  savBuf = rawBuf;
  sourceKind = 'sav';
} else if (magic === 'CIV2SNAP') {
  // Need v4 initialized to use sav-from-mem (reads _MEM globals set by initV4)
  if (!initV4IfPossible()) {
    throw new Error('Snapshot input requires RULES.TXT for initV4 — not found.');
  }
  const info = loadSnapshotIntoMem(savPath);
  process.stderr.write(`[snap] Loaded ${info.regionCount} regions, ${info.tileBytes} tile bytes into _MEM\n`);
  savBuf = buildSav();
  sourceKind = 'snapshot';
  process.stderr.write(`[snap] Synthesized .sav (${savBuf.length} bytes) from snapshot _MEM state\n`);
} else {
  throw new Error(`Unknown input type at ${savPath} — magic bytes were ${JSON.stringify(magic)}`);
}

const parsed = Civ2Parser.parse(savBuf, savPath);

// When --turns > 0, run the save through the engine reducer. This is
// what matters for real fidelity: does v3's END_TURN processing produce
// the same resulting state real Civ2 produces? N=0 only tests the parser.
//
// NOTE: This is a minimal turn runner — applies END_TURN for each alive
// civ sequentially. It does NOT generate AI actions or call v4-bridge
// (which would otherwise compute binary-faithful yields). For full
// server-equivalent behavior, load via v4 server.js. This is enough
// to surface which fields move during a basic END_TURN pass.
let post = null;
let turnsRan = 0;
let endTurnStats = { ok: 0, rejected: 0, threw: 0, v4Bridge: 0 };
if (turns > 0) {
  // Silence the engine's console.log noise during simulation so stdout
  // only contains the final JSON. Route engine chatter to stderr.
  const origLog = console.log;
  console.log = (...args) => { console.error('[engine]', ...args); };

  const v4Active = initV4IfPossible();
  if (skipV4Bridge) {
    process.stderr.write('[v4] --no-v4-bridge: skipping binary post-processing; v3 reducer only.\n');
  }

  // Populate v4's _MEM with the save's contents (tiles, units, cities,
  // civs, map). v4EndTurn needs this; without it, it silently no-ops.
  // sav-loader throws on scenarios; we catch and warn.
  let memLoaded = false;
  if (v4Active) {
    try {
      loadSavIntoMem(savBuf);
      memLoaded = true;
      process.stderr.write(`[v4] Save loaded into _MEM — v4 bridge active\n`);
    } catch (e) {
      process.stderr.write(`[v4] sav-loader failed: ${e.message} — v4 bridge will no-op\n`);
    }
  }

  // Build seatList that preserves the save's humanPlayers bitmask.
  // The save records which civ slots were human (bit N = civ N human).
  // Getting this wrong flips engine logic like growth thresholds — AI
  // cities have larger food boxes than human cities.
  //
  // init.js buildSeatCivMap maps seats → aliveCivs by POSITION in the
  // civsAlive bitmask, not by civSlot directly. So if civsAlive has
  // bits {4,5,6}, seat 0 → civ 4, seat 1 → civ 5, seat 2 → civ 6.
  // We must mark the seat whose position corresponds to a human civ,
  // not the seat numbered equal to the human civ's slot.
  const savHumanPlayers = parsed.gameState?.humanPlayers ?? 0;
  const savCivsAlive = parsed.gameState?.civsAlive ?? 0;
  const aliveCivs = [];
  for (let i = 1; i < 8; i++) if (savCivsAlive & (1 << i)) aliveCivs.push(i);
  const seatList = [];
  for (let i = 0; i < 7; i++) {
    const civSlot = i < aliveCivs.length ? aliveCivs[i] : (i + 1);
    const isHuman = !!((1 << civSlot) & savHumanPlayers);
    seatList.push({ seatIndex: i, name: `Civ${civSlot}`, ai: !isHuman });
  }
  const initResult = initFromSav(parsed, seatList);
  let gameState = initResult.gameState;
  const mapBase = initResult.mapBase;


  for (let t = 0; t < turns; t++) {
    // Walk civs in activeCiv order. Before each END_TURN, exhaust moves
    // for that civ's units so the "units still need orders" validation
    // passes. This simulates a diagnostic "all units used their moves"
    // state — not what a real player would do, but reveals what END_TURN
    // processing actually does (production, tech, yields, etc.).
    for (let step = 0; step < 8; step++) {
      const civ = (gameState.turn?.activeCiv ?? gameState.activeCiv ?? 1);
      if (!(gameState.civsAlive & (1 << civ))) { break; }

      // NOTE: v3 runAiTurn disabled here intentionally. Enabling it makes
      // prediction worse (72 vs 65 mismatches on 2026-04-18 turn 4→5
      // test) because v3's AI heuristics pick different research targets,
      // tax/science rates, and settler destinations than real Civ2.
      // Reimplementing Civ2's AI is a separate project — for now, we
      // only run the deterministic end-turn reducer (yields, tech
      // progression, fortify transitions, etc.).

      // Zero out movesLeft for this civ's units so END_TURN validation passes
      gameState = {
        ...gameState,
        units: gameState.units.map(u =>
          u.owner === civ && u.gx >= 0 ? { ...u, movesLeft: 0 } : u),
      };
      try {
        const next = applyAction(gameState, mapBase, { type: 'END_TURN' }, civ);
        if (next && next !== gameState) {
          gameState = next;
          endTurnStats.ok++;
          // Mirror server.js: after v3's END_TURN, bridge to v4 binary
          // engine to get binary-faithful yields. Silently skipped if
          // RULES.TXT wasn't found or tile data isn't in _MEM.
          if (v4Active && memLoaded && !skipV4Bridge) {
            try {
              const merged = await v4EndTurn(gameState, civ);
              if (merged && merged !== gameState) {
                gameState = merged;
                endTurnStats.v4Bridge++;
              }
            } catch (e) {
              process.stderr.write(`[turn ${t} civ ${civ}] v4EndTurn threw: ${e.message}\n`);
            }
          }
        } else {
          endTurnStats.rejected++;
          break;  // prevent infinite loop if stuck
        }
      } catch (e) {
        endTurnStats.threw++;
        process.stderr.write(`[turn ${t} civ ${civ}] END_TURN threw: ${e.message}\n`);
        break;
      }
      // Stop this round when turn counter has advanced (full round done)
      const newTurn = gameState.turn?.number ?? gameState.turnsPassed ?? 0;
      const origTurn = initResult.gameState.turn?.number ?? initResult.gameState.turnsPassed ?? 0;
      if (newTurn > origTurn + t) break;
    }
    turnsRan++;
  }
  post = gameState;
  console.log = origLog;
  process.stderr.write(`[N=${turns}] END_TURN stats: ${JSON.stringify(endTurnStats)}\n`);
  process.stderr.write(`[N=${turns}] Final turn: ${post.turn?.number ?? post.turnsPassed}\n`);
}

// For output, prefer the post-turn gameState if available; otherwise
// fall back to the raw parsed view (N=0). The schema below maps either
// source into our shared diff schema.
const gs = post ? post : parsed.gameState;
// When we have a post-turn state, some fields live in different places
// than the raw parser output. Handle both via defensive accessors.
const get = (name, fallback) =>
  gs[name] !== undefined ? gs[name] : (parsed.gameState[name] !== undefined ? parsed.gameState[name] : fallback);

// ── Scalars: field names chosen to match sniffer's GLOBAL_FIELDS ──
// Post-turn state (v3 engine) uses different names for some fields than
// the raw parser output. Check both.
const gameState = {
  turn:          post ? (post.turn?.number ?? post.turn) : gs.turnsPassed,
  // currentYear is signed i16 — negative for BC. For post-turn state,
  // the v3 engine advances state.turn.number but doesn't recompute the
  // year. Call the transpiled Civ2 FUN_00484fec (calc_year_from_turn)
  // directly against _MEM (which still has the input snapshot's
  // difficulty/flags loaded) to derive the right value. For N=0 (no
  // turns advanced), fall through to the parser's raw value.
  currentYear:   (() => {
    const rawYear = get('currentYear', 0);
    if (!post) return rawYear;
    const turnNum = post.turn?.number ?? post.turn ?? gs.turnsPassed;
    // FUN_00484fec requires the year-schedule table at DAT_0062c490.
    // Older snapshots captured before the `year_table` region was added
    // to SNAPSHOT_REGIONS won't have it, so the calc returns junk.
    // Probe with turn=1 (always -4000 in MGE); if that comes out wrong,
    // the table isn't loaded — fall back to the input snapshot's year.
    try {
      const probe = FUN_00484fec(1) | 0;
      const probeSigned = probe > 32767 ? probe - 65536 : probe;
      if (probeSigned !== -4000) return rawYear;
      const y = FUN_00484fec(turnNum) | 0;
      return y > 32767 ? y - 65536 : y;
    } catch (_) {
      return rawYear;
    }
  })(),
  // activeUnit is signed i16 per snapshot-to-state-json; -1 = no selection.
  // After end-turn runs, Civ2 auto-selects the first actionable unit for
  // the human player. Find the lowest slot in memory layout that's a
  // human unit with available moves. For N=0 (no turns run), fall back
  // to the parser's raw selectedUnit byte.
  activeUnit:    (() => {
    const raw = parsed.gameState?.selectedUnit ?? 0;
    const rawSigned = (raw | 0) > 32767 ? (raw - 65536) : raw;
    if (!post) return rawSigned;
    const humanMask = parsed.gameState?.humanPlayers ?? 0;
    const humanCiv = (() => {
      for (let i = 1; i < 8; i++) if (humanMask & (1 << i)) return i;
      return -1;
    })();
    if (humanCiv < 0) return rawSigned;
    const units = post.units || [];
    let best = -1;
    for (let i = 0; i < units.length; i++) {
      const u = units[i];
      if (!u || u.owner !== humanCiv || u.gx < 0) continue;
      const maxMoves = (u.movesLeft ?? 0) + (u.moveSpent ?? 0);
      const hasMoves = (u.moveSpent ?? 0) < (maxMoves || Infinity);
      if (hasMoves) {
        const slot = u.saveIndex ?? i;
        if (best < 0 || slot < best) best = slot;
      }
    }
    return best >= 0 ? best : -1;
  })(),
  // activeCiv on the sniffer side reads DAT_00655b03 = activeHumanPlayer
  // (the human's civ slot, static for the game). Don't substitute v3's
  // rotating state.turn.activeCiv — that's a different concept and
  // produces spurious diffs every turn advance.
  activeCiv:     parsed.gameState?.activeHumanPlayer ?? 0,
  difficulty:    toInt(get('difficulty'), DIFFICULTY_TO_INT),
  civsAlive:     get('civsAlive', 0),
  humanPlayers:  get('humanPlayers', 0),
  totalUnits:    post ? (post.units?.length ?? 0) : gs.totalUnits,
  totalCities:   post ? (post.cities?.length ?? 0) : gs.totalCities,
  globalWarming: get('globalWarmingCount', 0),
  // activeUnit, pollution not exposed by parser — leave off for now
};

// ── Per-civ: field names matching sniffer's CIV_FIELDS ──
const civsSource = post ? post.civs : parsed.civs;
gameState.civs = (civsSource || []).slice(0, 8).map((c, i) => ({
  slot: i,
  flags:            c.stateFlags ?? 0,
  treasury:         c.treasury ?? 0,
  researchProgress: c.researchProgress ?? 0,
  researchingTech:  c.techBeingResearched ?? 0xFF,
  taxRate:          c.taxRate ?? 0,
  scienceRate:      c.scienceRate ?? 0,
  government:       toInt(c.government, GOV_TO_INT),
  reputation:       c.reputation ?? 0,
}));

// ── Per-unit: field names matching sniffer's UNIT_FIELDS (0x20 stride) ──
// parser.units[] holds alive units; saveIndex is the slot position in memory.
const unitsSource = post ? post.units : parsed.units;
gameState.units = (unitsSource || []).map((u, i) => ({
  slot:        u.saveIndex ?? i,
  x:           u.x ?? 0,
  y:           u.y ?? 0,
  type:        u.type ?? 0,
  owner:       u.owner ?? 0,
  // Memory byte semantics (verified against live Civ2 2026-04-18 by
  // observing a unit move go 0 -> 3 on +0x08):
  //   parser.moveSpent    = memory +0x08 = moves_spent_this_turn
  //                         (0 = fresh, 3 = Settler used full move)
  //   parser.hpLost       = memory +0x09 = visibility_mask
  //   parser.movesRemain  = memory +0x0A = damage_taken
  //                         (0 = full health, maxHp = dead)
  moveSpent:     u.moveSpent ?? 0,
  damageTaken:   u.movesRemain ?? 0,
  visibility:    u.hpLost ?? 0,
  veteran:     u.veteran ? 1 : 0,
  order:       u.order ?? 0xFF,
  homeCity:    u.homeCityId ?? u.homeCity ?? 0xFFFF,
  gotoX:       u.gotoX ?? -1,
  gotoY:       u.gotoY ?? -1,
  unitId:      u.sequenceId ?? u.id ?? 0,
}));

// ── Per-city: minimal set matching sniffer's CITY_FIELDS (0x58 stride) ──
// Use post-turn state (v3 engine format: foodInBox/shieldsInBox) if we
// ran turns; otherwise parser output (also uses foodInBox — the field
// alias `foodStored` on both sides was a bug).
const citiesSource = post ? post.cities : parsed.cities;
gameState.cities = (citiesSource || []).map((c, i) => ({
  slot:         i,
  x:            c.cx ?? c.x ?? 0,
  y:            c.cy ?? c.y ?? 0,
  owner:        c.owner ?? 0,
  size:         c.size ?? 0,
  foodStored:   c.foodInBox ?? c.foodStored ?? 0,
  shieldStored: c.shieldsInBox ?? c.shieldStored ?? 0,
  tradeTotal:   c.netBaseTrade ?? c.tradeTotal ?? 0,
  name:         c.name ?? '',
}));

// ── Wonders: 28 × i16 city IDs. parser exposes as `wonders` array. ──
const wondersRaw = gs.wonders ?? gs.wonderCityIds ?? [];
gameState.wonders = wondersRaw.slice(0, 28).map(w => {
  // parser may return objects {cityId, status}; normalize to raw city-id int.
  if (typeof w === 'number') return w;
  if (w && typeof w === 'object') return w.cityId ?? w.raw ?? -1;
  return -1;
});

const out = {
  source: 'v4-server',
  savPath,
  savBytes: savBuf.length,
  engine: post
    ? 'Civ2Parser + initFromSav + N END_TURN rounds via reducer'
    : 'Civ2Parser (raw save schema, matches sniffer memory layout)',
  N: turns,
  endTurnStats: post ? endTurnStats : undefined,
  gameState,
};

process.stdout.write(JSON.stringify(out, null, 2) + '\n');
