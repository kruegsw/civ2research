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

// --replay <events.jsonl>: apply captured AI actions through the reducer
// between END_TURN calls. Lets us validate deterministic mechanics (yields,
// research progress, tech completion) without replicating Civ2's AI.
// Events are emitted by sniff-game.py's emit_action_events().
function getFlagValue(name) {
  const flagArg = args.find(a => a.startsWith(name));
  if (!flagArg) return null;
  if (flagArg.includes('=')) return flagArg.split('=')[1];
  const idx = args.indexOf(flagArg);
  return args[idx + 1] || null;
}
const replayPath = getFlagValue('--replay');

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

  // ── Load and bucket replay events by turn, per civ ──────────────
  // events.jsonl is produced by sniff-game.py emit_action_events().
  // We apply a civ's events inside their END_TURN slot (before the
  // END_TURN action itself), so downstream reducer logic sees them.
  const replayEventsByTurnCiv = new Map(); // key = `${turn}:${civ}`, value = [events]
  if (replayPath && existsSync(replayPath)) {
    try {
      const raw = readFileSync(replayPath, 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        if (!line.trim()) continue;
        try {
          const ev = JSON.parse(line);
          const t = ev.turn;
          // Prefer event's `civ` field if present; otherwise use `owner`
          // (for unit events). Events without a civ target (TURN_ADVANCED)
          // are skipped for replay purposes.
          const c = ev.civ ?? ev.owner;
          if (t == null || c == null) continue;
          const key = `${t}:${c}`;
          if (!replayEventsByTurnCiv.has(key)) replayEventsByTurnCiv.set(key, []);
          replayEventsByTurnCiv.get(key).push(ev);
        } catch (_) { /* skip malformed line */ }
      }
      process.stderr.write(`[replay] Loaded ${Array.from(replayEventsByTurnCiv.values()).reduce((a, v) => a + v.length, 0)} events from ${replayPath}\n`);
    } catch (e) {
      process.stderr.write(`[replay] Failed to read ${replayPath}: ${e.message}\n`);
    }
  }

  // Translate one sniffer event into v3 reducer actions. Returns an
  // array of actions (some events map to multiple actions). Returns
  // [] for events that don't need replay (e.g., already-happened-
  // during-reducer events like TECH_DISCOVERED which is a by-product
  // of research progress, not a decision).
  function eventToActions(ev, state) {
    switch (ev.event) {
      case 'CITY_FOUNDED': {
        // Need to find the unit at (ev.x, ev.y) owned by ev.owner that's
        // a Settler/Engineer. That's the one that founded.
        const units = state.units || [];
        const owner = ev.owner ?? ev.civ;
        const uIdx = units.findIndex(u =>
          u && u.owner === owner && u.gx >= 0
          && (u.type === 0 || u.type === 1)
          && Math.floor(u.x / 2) === Math.floor(ev.x / 2)
          && u.y === ev.y);
        if (uIdx < 0) return [];
        return [{ type: 'BUILD_CITY', unitIndex: uIdx, name: ev.name }];
      }
      case 'RESEARCH_PICKED': {
        if (ev.techId == null || ev.techId === 0xFF) return [];
        return [{ type: 'SET_RESEARCH', advanceId: ev.techId }];
      }
      case 'RATE_CHANGED': {
        // Sniffer emits rates as percentages (e.g. tax=50, sci=40, lux=10).
        // Reducer CHANGE_RATES takes { scienceRate, taxRate } in 0..10.
        return [{ type: 'CHANGE_RATES',
                  scienceRate: Math.round((ev.sci ?? 0) / 10),
                  taxRate: Math.round((ev.tax ?? 0) / 10) }];
      }
      case 'FLAGS_CHANGED': {
        // No reducer action exists for raw state-flag writes (these
        // are set by deep Civ2 internals — senateOverride RNG, etc.).
        // Apply directly to state.civs[civ].stateFlags. The event is
        // at the civ level so ev.civ is the target.
        return [{ type: '__RAW_FLAGS__', civ: ev.civ, flags: ev.to }];
      }
      case 'UNIT_MOVED': {
        // UID-based lookup — slot may have been reused.
        const units = state.units || [];
        const uIdx = units.findIndex(u => u && (u.id === ev.uid || u.sequenceId === ev.uid));
        if (uIdx < 0) return [];
        // Convert from [x,y] to direction delta. v3's MOVE_UNIT expects
        // a direction (0..7) or goto coordinates.
        return [{ type: 'GOTO', unitIndex: uIdx, gx: Math.floor(ev.to[0] / 2), gy: ev.to[1] }];
      }
      case 'UNIT_ORDER': {
        const units = state.units || [];
        const uIdx = units.findIndex(u => u && (u.id === ev.uid || u.sequenceId === ev.uid));
        if (uIdx < 0) return [];
        // Sniffer emits the raw order BYTE; reducer expects action-type
        // strings. Map per parser ORDERS_MAP:
        //   0/255 = none (wake); 1/2 = fortify; 3 = sleep;
        //   4 = fortress; 5 = road; 6 = irrigation; 7 = mine;
        //   8 = transform (Engineer only); 9 = pollution; 10 = airbase;
        //   11 = goto (ignored — needs GOTO action with coords).
        const WORKER_MAP = { 4: 'fortress', 5: 'road', 6: 'irrigation',
                             7: 'mine', 9: 'pollution', 10: 'airbase',
                             11: 'railroad' };
        const UNIT_MAP = { 1: 'fortify', 2: 'fortify', 3: 'sleep' };
        const orderByte = ev.order;
        if (orderByte === 0 || orderByte === 0xFF) {
          return [{ type: 'UNIT_ORDER', unitIndex: uIdx, order: 'wake' }];
        }
        if (WORKER_MAP[orderByte]) {
          return [{ type: 'WORKER_ORDER', unitIndex: uIdx,
                    order: WORKER_MAP[orderByte] }];
        }
        if (UNIT_MAP[orderByte]) {
          return [{ type: 'UNIT_ORDER', unitIndex: uIdx,
                    order: UNIT_MAP[orderByte] }];
        }
        return [];
      }
      default:
        return [];  // GOLD_CHANGED, TECH_DISCOVERED, TURN_ADVANCED, etc.
    }
  }

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
      // prediction worse because v3's AI heuristics pick different research
      // targets, tax/science rates, and settler destinations than real Civ2.
      // With --replay we inject the REAL Civ2 AI's decisions from the
      // sniffer-captured events.jsonl instead — preserves deterministic
      // mechanics validation without replicating Civ2's AI.
      const currentTurn = gameState.turn?.number ?? gameState.turnsPassed ?? 1;
      const replayKey = `${currentTurn}:${civ}`;
      const replayEvents = replayEventsByTurnCiv.get(replayKey) || [];
      if (replayEvents.length > 0) {
        process.stderr.write(`[replay] turn ${currentTurn} civ ${civ}: ${replayEvents.length} events\n`);
        for (const ev of replayEvents) {
          const actions = eventToActions(ev, gameState);
          for (const action of actions) {
            // Synthetic __RAW_FLAGS__ action — apply directly without
            // going through the reducer (no existing action matches).
            if (action.type === '__RAW_FLAGS__') {
              gameState = {
                ...gameState,
                civs: gameState.civs.map((c, i) =>
                  i === action.civ ? { ...c, stateFlags: action.flags } : c),
              };
              continue;
            }
            try {
              const next = applyAction(gameState, mapBase, action, civ);
              if (next && next !== gameState) gameState = next;
            } catch (e) {
              process.stderr.write(`[replay] ${ev.event} action failed: ${e.message}\n`);
            }
          }
        }
      }

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
      // Break when: (a) turn advanced AND (b) we've processed every
      // civ's end-turn for the new turn too, stopping with the active
      // civ being the human (ready for user input). This matches Civ2's
      // actual flow: end-of-previous-round for each civ + start-of-new-
      // round for each AI civ up to the human. Without this, worker
      // orders that continue into the new turn (road completion) don't
      // advance.
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
  // totalUnits in Civ2's memory is the HIGH WATER MARK of unit slots
  // allocated, not the number currently alive. It only GROWS (dead
  // slots remain allocated). initFromSav filters out dead units so
  // state.units.length is lower than the memory counter. Use the max
  // of the input's counter and the current engine unit count so new
  // units produced during replay bump the value correctly.
  totalUnits:    post
                   ? Math.max(post.units?.length ?? 0,
                              parsed.gameState?.totalUnits ?? 0)
                   : gs.totalUnits,
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
// For post-turn state, the reducer marks dead units with gx=-1 but keeps
// the slot. Filter those out so the list matches the sniffer's alive-unit
// list (which uses unique_id==0 for dead).
const unitsSource = (post ? post.units : parsed.units) || [];
gameState.units = unitsSource.filter(u => u && u.gx >= 0 && u.x >= 0).map((u, i) => ({
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
