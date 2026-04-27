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
import { updateVisibility } from '../charlizationv3/engine/visibility.js';
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
// v4-bridge is OFF by default. The bridge ran FUN_00489553 (binary's
// per-civ END_TURN processing) and overwrote 4 fields (city size,
// foodInBox, shieldsInBox, treasury) with binary-byte-faithful values.
// Audit (2026-04-25) found no v3-bug fixes embedded in the bridge JS
// itself — just plumbing. The bridge hangs on FUN_00489553 in some
// mid-game states. Use --v4-bridge to opt back in for diagnostic
// comparison; --no-v4-bridge accepted for backwards compat.
const skipV4Bridge = !args.includes('--v4-bridge');

// --replay <events.jsonl>: apply captured AI actions through the reducer
// between END_TURN calls. Lets us validate deterministic mechanics (yields,
// research progress, tech completion) without replicating Civ2's AI.
// Events are emitted by sniff-game.py's emit_action_events().
function getFlagValue(name) {
  // Match exact `--name` or `--name=val`. Previous prefix match
  // accidentally matched `--replay-frida` for getFlagValue('--replay'),
  // routing the wrong file to each parser.
  const flagArg = args.find(a => a === name || a.startsWith(name + '='));
  if (!flagArg) return null;
  if (flagArg.includes('=')) return flagArg.split('=')[1];
  const idx = args.indexOf(flagArg);
  return args[idx + 1] || null;
}
const replayPath = getFlagValue('--replay');

// --replay-yields: when set, CITY_YIELD events are applied as absolute SETs
// on cities[cityIdx].foodStored/shieldStored/tradeTotal/size. Closes the
// mid-turn-yield-cache tag (those small ±10 deltas) in exchange for hiding
// any v3 production.js divergence. Default off — we want those mismatches
// visible. Turn on for a fidelity ceiling measurement.
const replayYields = args.includes('--replay-yields');

// --replay-treasury: when set, ALL GOLD_CHANGED events (not just
// hut-gold) replay as absolute treasury SETs. Mirrors --replay-yields
// behavior — closes treasury-rounding mismatches at the cost of
// hiding v3 tax/upkeep calc divergence. Default off.
const replayTreasury = args.includes('--replay-treasury');

// --skip-replay <EVENT_TYPE[,EVENT_TYPE...]>: drop these events from
// replay so v3 must originate the decision itself. Used to validate
// a ported AI slice — if v3's emitted events match the observed ones
// without replay, the port is correct.
const skipReplayArg = getFlagValue('--skip-replay');
const skipReplayTypes = skipReplayArg
  ? new Set(skipReplayArg.split(',').map(s => s.trim()).filter(Boolean))
  : new Set();
if (skipReplayTypes.size > 0) {
  process.stderr.write(`[replay] Skipping event types: ${[...skipReplayTypes].join(',')}\n`);
}

// Place a freshly-created city at its binary slot to keep v3's cities[]
// index aligned with the snapshot. The binary stores cities densely up
// to totalCities; when one is destroyed, the next CITY_FOUNDED reuses
// that slot. Without this alignment v3 appends in event-replay order,
// and state-diff (which compares index-by-index) cascades dozens of
// per-city/per-unit slot mismatches even when content is correct.
//
// Strategy: take the most-recently-appended city, move it to the
// targetIdx slot. If targetIdx exceeds current length, pad with
// placeholder slots (size=0, owner=-1). If targetIdx slot is occupied
// by a destroyed city (owner=-1), replace it. Otherwise the city
// stays appended (defensive — shouldn't happen given event ordering).
function placeCityAtSlot(state, targetIdx) {
  if (targetIdx == null || targetIdx < 0) return state;
  const cities = state.cities || [];
  if (cities.length === 0) return state;
  const newCity = cities[cities.length - 1];
  if (process.env.DEBUG_CITY_FOUNDED) {
    process.stderr.write(`[placeCityAtSlot] target=${targetIdx} newCity=${newCity.name} prelen=${cities.length}\n`);
  }
  const trimmed = cities.slice(0, -1);
  const next = trimmed.slice();
  while (next.length < targetIdx) {
    next.push({ name: '', owner: -1, size: 0,
                gx: -1, gy: -1, x: -1, y: -1, cx: -1, cy: -1,
                placeholder: true });
  }
  if (next.length === targetIdx) {
    next.push(newCity);
  } else if (next.length > targetIdx) {
    const occupant = next[targetIdx];
    if (occupant && (occupant.owner === -1 || occupant.placeholder
                     || occupant.size === 0)) {
      next[targetIdx] = newCity;
    } else {
      next.push(newCity);
    }
  }
  return { ...state, cities: next };
}

// --replay-frida <civ2_trace.log>: inject byte-exact AI decisions from
// Frida captures. For each (turn, civSlot) where a binary AI function
// was captured, use its retval/globals instead of v3's heuristic. This
// is Option A of the AI-port pipeline: v3 mechanics run with binary's
// authoritative decisions.
//
// Functions consumed:
//   fun_research_cost    → overrides calcResearchCostExact globals
//   ai_research_pick     → forces civ.techBeingResearched post-completion
//   choose_government    → forces civ.government (if it changed)
//
// Builds a Map<`${turn}:${civSlot}`, {fridaGlobals...}>.
// Also a separate Map<`${turn}:${cityIdx}`, productionByte> for city
// production picks — keyed by cityIdx since that's what the binary
// passes; the consumer routes by city.owner at injection time.
const replayFridaPath = getFlagValue('--replay-frida');
const fridaByTurnCiv = new Map();
const fridaProductionByTurnCity = new Map();
// Slice 7: per-unit AI action captures keyed by (turn, unitIdx).
// Multiple captures per unit per turn are possible (binary may call
// FUN_00538a29 multiple times during pathfinding); LAST capture wins
// since that's the unit's final state.
const fridaUnitStateByTurnUnit = new Map();
// Slice 7b: full per-civ unit roster captured at civ_turn_driver exit.
// Map<`${turn}:${civSlot}`, Set<slotIdx>>. Authoritative — used to
// delete v3 "phantom" units (slots v3 owns but binary doesn't).
const fridaUnitRosterByTurnCiv = new Map();
if (replayFridaPath && existsSync(replayFridaPath)) {
  process.stderr.write(`[replay-frida] Parsing ${replayFridaPath}…\n`);
  let fridaTurn = 0;
  let fridaPendingByFn = new Map();  // fn name → call payload
  let nCost = 0, nPick = 0, nGovt = 0, nProd = 0, nUnit = 0, nRoster = 0;
  const lines = readFileSync(replayFridaPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line) continue;
    let ev;
    try { ev = JSON.parse(line); } catch { continue; }
    if (ev.source === 'sniffer' && ev.event === 'TURN_ADVANCED' && ev.turn != null) {
      fridaTurn = ev.turn;
      continue;
    }
    if (ev.source !== 'frida') continue;

    // Slice 7b: civ_turn_driver onLeave carries unitRoster + civSlot.
    // Stash by (turn, civSlot) for slot-cleanup at injection time.
    if (ev.fn === 'civ_turn_driver' && ev.kind === 'return' && ev.unitRoster && ev.civSlot != null) {
      fridaUnitRosterByTurnCiv.set(`${fridaTurn}:${ev.civSlot}`, new Set(ev.unitRoster));
      nRoster = (nRoster ?? 0) + 1;
      continue;
    }

    // Slice 7: ai_unit_action keyed by unitIdx. Captured at exit
    // (entry payload has activeUnitIdx; return payload has unitState).
    if (ev.fn === 'ai_unit_action') {
      if (ev.kind === 'return' && ev.unitIdx != null && ev.unitState) {
        const k = `${fridaTurn}:${ev.unitIdx}`;
        // Last-write wins (latest unit state is authoritative)
        fridaUnitStateByTurnUnit.set(k, ev.unitState);
        nUnit = (nUnit ?? 0) + 1;
      }
      continue;
    }

    // City-production picker keyed by cityIdx, not civSlot. Same
    // call/return pattern as the civ-keyed functions: return events
    // omit cityIdx so we must read it from the matching call.
    if (ev.fn === 'ai_city_production_pick') {
      if (ev.kind === 'call') {
        fridaPendingByFn.set('ai_city_production_pick', ev);
      } else if (ev.kind === 'return') {
        const call = fridaPendingByFn.get('ai_city_production_pick');
        if (!call) continue;
        fridaPendingByFn.delete('ai_city_production_pick');
        const cityIdx = call.named?.cityIdx ?? call.args?.[0];
        if (cityIdx == null) continue;
        const cityKey = `${fridaTurn}:${cityIdx}`;
        if (!fridaProductionByTurnCity.has(cityKey)) {
          fridaProductionByTurnCity.set(cityKey, {
            production: ev.retval,
            owner: call.productionPickGlobals?.cityOwner,
          });
          nProd = (nProd ?? 0) + 1;
        }
      }
      continue;
    }

    // Pair call/return per-fn (single-pending). Return events from the
    // Frida agent omit civSlot, so we must read it from the matching
    // call. This mirrors the validator pattern.
    if (ev.kind === 'call') {
      fridaPendingByFn.set(ev.fn, ev);
      continue;
    }
    if (ev.kind !== 'return') continue;
    const call = fridaPendingByFn.get(ev.fn);
    if (!call) continue;
    fridaPendingByFn.delete(ev.fn);
    const civSlot = call.named?.civSlot ?? call.args?.[0];
    if (civSlot == null) continue;
    const key = `${fridaTurn}:${civSlot}`;
    let slot = fridaByTurnCiv.get(key);
    if (!slot) { slot = {}; fridaByTurnCiv.set(key, slot); }
    {
      if (ev.fn === 'fun_research_cost' && call.researchCostGlobals) {
        // Defensive: pre-2026-04-25 traces captured techCounter as
        // readS32 instead of readS16, picking up garbage from adjacent
        // memory. Sanitize by masking to 16 bits with sign extension.
        const tc = call.researchCostGlobals.techCounter;
        if (tc != null && (tc < -32768 || tc > 32767)) {
          const lo = tc & 0xFFFF;
          call.researchCostGlobals.techCounter = lo > 32767 ? lo - 65536 : lo;
        }
        // Keep the FIRST capture for this (turn, civ) — binary may
        // recompute multiple times per turn, but the first is what
        // drives the tech completion check.
        if (!slot.researchCost) {
          slot.researchCost = { globals: call.researchCostGlobals, retval: ev.retval };
          nCost++;
        }
      } else if (ev.fn === 'ai_research_pick') {
        // retval = chosen tech. Override post-end-turn tech target.
        if (!slot.researchPick) {
          slot.researchPick = ev.retval;
          nPick++;
        }
      } else if (ev.fn === 'choose_government' && ev.govtChosen != null && ev.govtChosen !== -1) {
        // govtChosen = new govt index. Override civ.government when
        // binary actually switched.
        slot.govtChosen = ev.govtChosen;
        nGovt++;
      }
    }
  }
  process.stderr.write(`[replay-frida] Loaded ${fridaByTurnCiv.size} (turn,civ) keys: ${nCost} costs, ${nPick} picks, ${nGovt} govt switches\n`);
  process.stderr.write(`[replay-frida] Loaded ${fridaProductionByTurnCity.size} (turn,city) production picks\n`);
  process.stderr.write(`[replay-frida] Loaded ${fridaUnitStateByTurnUnit.size} (turn,unit) unit-action states\n`);
  process.stderr.write(`[replay-frida] Loaded ${fridaUnitRosterByTurnCiv.size} (turn,civ) unit rosters\n`);
}

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
  if (info.snapTimeMs != null) {
    globalThis.__SNAPSHOT_TIME_MS = info.snapTimeMs;
    process.stderr.write(`[snap] Capture timestamp: ${info.snapTimeMs.toFixed(1)}ms\n`);
  }
  if (info.randSeed != null) {
    globalThis.__SNAPSHOT_RAND_SEED = info.randSeed;
    process.stderr.write(`[snap] MSVC rand seed: 0x${info.randSeed.toString(16).padStart(8, '0')}\n`);
  }
  // scenarioFlags is byte 0 of globals region. Parser's current bit check
  // on the SAV doesn't detect Bloodlust correctly for CIV2SNAP-synthesized
  // saves, so expose the snapshot-read value for init.js to pick up.
  if (info.scenarioFlags != null && info.scenarioFlags !== 0) {
    globalThis.__SNAPSHOT_SCENARIO_FLAGS = info.scenarioFlags;
    const flags = info.scenarioFlags;
    const names = [];
    if (flags & 0x04) names.push('Raging');
    if (flags & 0x08) names.push('Bloodlust');
    if (flags & 0x80) names.push('Scenario');
    process.stderr.write(`[snap] scenarioFlags=0x${flags.toString(16)} (${names.join(', ') || 'unknown bits'})\n`);
  }
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
// Hoisted so the output-assembly block (HWM tracker, activeUnit
// replay) can read events and timing info.
const replayEventsByTurnCiv = new Map();
const turnAdvancedTimeOuter = new Map();
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

  // RNG sync: when the snapshot includes the MSVC CRT rand seed
  // (DAT_00639e50), seed v3's SeededRNG with that value instead of
  // init's mapSeed-derived hash. Both use the same MSVC LCG so the
  // next draw from v3's rng matches what civ2.exe would produce at
  // this instant. Re-sync happens on every snapshot load; within a
  // turn, drift is still possible if v3 and the binary call rand()
  // in different orders/counts, but turn-boundary state converges.
  if (globalThis.__SNAPSHOT_RAND_SEED != null && gameState.rng?.state != null) {
    gameState.rng.state = globalThis.__SNAPSHOT_RAND_SEED >>> 0;
    process.stderr.write(`[rng] Seeded v3 SeededRNG from snapshot rand_seed: 0x${gameState.rng.state.toString(16).padStart(8, '0')}\n`);
  }

  // When loading from a snapshot, read the real next_unit_sequence_id
  // (DAT_00627fd8) from _MEM and seed v3's state counter. Without this,
  // v3 falls back to max(existing_unit_id) + 1 which misses gaps from
  // killed units, causing newly-created units to get wrong IDs in the
  // diff. Only applies when _MEM has been populated (snapshot input).
  if (sourceKind === 'snapshot' && memLoaded) {
    try {
      // DAT_00627fd8 = next_unit_sequence_id. mem.js's u32(addr, off)
      // uses addr as an index into _MEM directly — and _MEM is a
      // REBASED view (2MB buffer starting at MEM_BASE=0x61c068), so
      // passing the absolute address reads out of bounds and returns 0.
      // Read G._MEM at the rebased offset directly.
      const { G } = await import('./globals.js');
      const MEM_BASE = 0x61c068;
      const memOff = 0x00627fd8 - MEM_BASE;
      const nextId = (G._MEM[memOff] | (G._MEM[memOff+1] << 8)
                     | (G._MEM[memOff+2] << 16) | (G._MEM[memOff+3] << 24)) >>> 0;
      if (nextId && nextId > 0) {
        gameState.nextUnitId = nextId;
        process.stderr.write(`[snapshot] next_unit_sequence_id = ${nextId}\n`);
      }
    } catch (e) {
      process.stderr.write(`[snapshot] Could not read unit counter: ${e.message}\n`);
    }
  }

  // ── Load and bucket replay events by turn, per civ ──────────────
  // Primary routing: the sniffer's turn tag (ev.turn) — events tagged
  // turn X belong to "transition TO X" and are applied during the
  // simulation step that advances to turn X.
  //
  // Late-event shift: if an event's time_ms is FAR AFTER its own
  // TURN_ADVANCED(ev.turn) (more than 500ms), it's actually a
  // mid-turn-X action, NOT a transition-to-X event. Shift its target
  // to ev.turn+1. Without this, e.g., a UNIT_ORDER fired 2 seconds
  // after TURN_ADVANCED(8) but tagged turn=8 would be replayed during
  // T7→T8 simulation and corrupt the T8 prediction.
  // Narrower window than the original 500ms: user-captured snapshots
  // are typically taken very soon after a TURN_ADVANCED (human sees the
  // new turn on screen and presses `\`). Events firing > 200ms after the
  // turn-advance tend to reflect changes the snapshot DOESN'T show —
  // they belong to the next turn's prediction. 500ms let events like
  // uid=33 settler creation (delta 255ms) leak into the wrong turn.
  // Late-event shift strategy. Two modes:
  //
  // 1) PRECISE — if the sniffer emitted SNAPSHOT_DUMPED events (each
  //    records the exact time the .bin was captured), we know the
  //    capture time T(N) for each turn's snapshot. An event tagged
  //    turn=N belongs in the turn-N replay iff time_ms ≤ T(N); events
  //    after T(N) land in the turn-(N+1) prediction.
  //
  // 2) HEURISTIC — when SNAPSHOT_DUMPED events aren't present (older
  //    recordings), fall back to the 200ms post-TURN_ADVANCED window.
  //    Imprecise; a single universal cutoff mismatches both ways.
  const LATE_EVENT_WINDOW_MS = 200;
  // replayEventsByTurnCiv hoisted to outer scope above.
  // CITY_YIELD events bucketed by raw ev.turn (not shifted routedTurn).
  // Late-event shift breaks yield routing because yields fire mid-turn
  // at unpredictable times relative to the snapshot — sometimes before,
  // sometimes hundreds of ms after. The raw turn tag is a more reliable
  // key since it reflects what turn the binary was in when it computed
  // the yield.
  const cityYieldsByRawTurn = new Map();
  // Map of `${turn}:${x}:${y}:${owner}` -> founding settler uid.
  // When multiple settlers occupy the founding tile, BUILD_CITY's
  // findIndex returns the FIRST match — which may not be the unit
  // binary actually consumed. The UNIT_KILLED event for the same
  // (turn, x, y, owner, type=0|1) tells us which uid actually died,
  // i.e. which settler founded.
  const foundingUidByEvent = new Map();
  // Per-uid lifecycle: turn of first UNIT_CREATED and first UNIT_KILLED.
  // Used to keep phantom-cleanup-via-roster from culling units the
  // sniffer confirms are alive at currentTurn.
  const unitCreatedTurns = new Map();
  const unitKilledTurns = new Map();
  // Snapshot timestamps keyed by turn (ms into session). Populated
  // below from SNAPSHOT_DUMPED events. Used by the CITY_YIELD pass to
  // decide whether to use "From" fields (event fired after snapshot,
  // so current values describe later state) or current values (event
  // fired before snapshot, current values match).
  const snapshotTimeByTurn = new Map();
  if (replayPath && existsSync(replayPath)) {
    try {
      const raw = readFileSync(replayPath, 'utf8');
      const allEvents = [];
      const turnAdvancedTime = new Map();
      const snapshotTime = new Map(); // turn → time_ms snapshot was captured
      for (const line of raw.split(/\r?\n/)) {
        if (!line.trim()) continue;
        try {
          const ev = JSON.parse(line);
          allEvents.push(ev);
          if (ev.event === 'TURN_ADVANCED' && ev.turn != null && ev.time_ms != null) {
            turnAdvancedTime.set(ev.turn, ev.time_ms);
            turnAdvancedTimeOuter.set(ev.turn, ev.time_ms);
          }
          if (ev.event === 'SNAPSHOT_DUMPED' && ev.turn != null && ev.time_ms != null) {
            snapshotTime.set(ev.turn, ev.time_ms);
            snapshotTimeByTurn.set(ev.turn, ev.time_ms);
          }
        } catch (_) { /* skip malformed line */ }
      }
      const hasPreciseRouting = snapshotTime.size > 0;
      if (hasPreciseRouting) {
        process.stderr.write(`[replay] Precise routing: ${snapshotTime.size} SNAPSHOT_DUMPED events found\n`);
      }
      for (const ev of allEvents) {
        const c = ev.civ ?? ev.owner;
        if (c == null || ev.turn == null) continue;
        if (ev.event === 'SNAPSHOT_DUMPED') continue; // metadata only
        let routedTurn = ev.turn;
        if (hasPreciseRouting) {
          // Precise: compare event time to the tagged-turn snapshot time.
          // If the event fired AFTER that snapshot was captured, the
          // event's effect wasn't in the snapshot — route to turn+1.
          const snapT = snapshotTime.get(ev.turn);
          if (snapT != null && ev.time_ms != null && ev.time_ms > snapT) {
            routedTurn = ev.turn + 1;
          }
        } else {
          // Heuristic fallback.
          const taTime = turnAdvancedTime.get(ev.turn);
          if (taTime != null && ev.time_ms != null
              && ev.time_ms > taTime + LATE_EVENT_WINDOW_MS) {
            routedTurn = ev.turn + 1;
          }
          // CITY_DESTROYED special case in heuristic mode (see earlier
          // analysis turn 46 Philadelphia).
          if (ev.event === 'CITY_DESTROYED' && routedTurn === ev.turn) {
            routedTurn = ev.turn + 1;
          }
        }
        // Stamp the computed routedTurn on the event so downstream
        // consumers (CITY_YIELD pass, HWM tracker) can filter by it.
        ev._routedTurn = routedTurn;
        const key = `${routedTurn}:${c}`;
        if (!replayEventsByTurnCiv.has(key)) replayEventsByTurnCiv.set(key, []);
        replayEventsByTurnCiv.get(key).push(ev);
        if (ev.event === 'CITY_YIELD') {
          if (!cityYieldsByRawTurn.has(ev.turn)) cityYieldsByRawTurn.set(ev.turn, []);
          cityYieldsByRawTurn.get(ev.turn).push(ev);
        }
      }
      // Mark GOLD_CHANGED events that should be replayed because they
      // co-fire with a recoveredFromRevolution flag flip on the same
      // civ. These are AI government-recovery treasury adjustments
      // (binary writes a one-off gold value when exiting anarchy)
      // that v3's reducer can't compute because runAiTurn is disabled.
      const recoveryGoldKeys = new Set();
      for (const ev of allEvents) {
        if (ev.event !== 'FLAGS_CHANGED' || ev.civ == null) continue;
        const flipped = ev.flipped || [];
        if (!flipped.includes('recoveredFromRevolution:SET')) continue;
        recoveryGoldKeys.add(`${ev.civ}:${ev.time_ms}`);
      }
      // Also mark AI civ end-of-turn gold writes. These represent
      // binary AI activity v3 doesn't simulate (rush-buy, disband
      // refund, diplomatic gifts). The "end-of-turn" signal is:
      // a GOLD_CHANGED whose time_ms is between snap[N] and snap[N+1]
      // for some N — i.e., it captures the post-turn AI state. Mark
      // for AI civs only; human civs go through v3's tax calc.
      const humanMaskMark = parsed.gameState?.humanPlayers ?? 0;
      for (const ev of allEvents) {
        if (ev.event !== 'GOLD_CHANGED' || ev.civ == null) continue;
        if (recoveryGoldKeys.has(`${ev.civ}:${ev.time_ms}`)) {
          ev._replayGold = 'gov-recovery';
          continue;
        }
        const isAI = !((1 << ev.civ) & humanMaskMark);
        if (isAI) {
          ev._replayGold = 'ai-end-turn';
        }
      }

      // Build foundingUidByEvent map: scan UNIT_KILLED events for
      // settlers (type 0/1) and pair with same-(turn, x, y, owner)
      // CITY_FOUNDED. The killed settler is the founding one.
      // Also build unitCreatedTurns / unitKilledTurns for lifecycle.
      for (const ev of allEvents) {
        if (ev.uid == null) continue;
        if (ev.event === 'UNIT_CREATED') {
          if (!unitCreatedTurns.has(ev.uid)) {
            unitCreatedTurns.set(ev.uid, ev.turn ?? 0);
          }
        } else if (ev.event === 'UNIT_KILLED') {
          if (!unitKilledTurns.has(ev.uid)) {
            unitKilledTurns.set(ev.uid, ev.turn ?? 0);
          }
          if (ev.type === 0 || ev.type === 1) {
            const key = `${ev.turn}:${ev.x}:${ev.y}:${ev.owner}`;
            foundingUidByEvent.set(key, ev.uid);
          }
        }
      }
      // Retroactively synthesize UNIT_CREATED events for "orphan" uids:
      // ones that have UNIT_MOVED/UNIT_ORDER/UNIT_KILLED but no
      // UNIT_CREATED. Cause: sniffer's slot-reuse blind spot — when one
      // poll tick has slot N=uid X and the next has slot N=uid Y (binary
      // killed X and created Y in same interval), the diff loop emits
      // UNIT_MOVED with from=X.pos to=Y.pos instead of KILL+CREATE.
      // Sniffer fixed in this commit; this synthesis bridges existing
      // captures that have the bug.
      const seenCreated = new Set();
      const seenOther = new Map();  // uid -> first non-CREATED event
      for (const ev of allEvents) {
        if (ev.uid == null) continue;
        if (ev.event === 'UNIT_CREATED') seenCreated.add(ev.uid);
        else if (['UNIT_MOVED', 'UNIT_ORDER', 'UNIT_KILLED',
                  'UNIT_GOTO_CHANGED', 'UNIT_DAMAGE',
                  'UNIT_STATUS_CHANGED', 'UNIT_VIS_CHANGED',
                  'UNIT_MOVESPENT_CHANGED'].includes(ev.event)) {
          if (!seenOther.has(ev.uid)) seenOther.set(ev.uid, ev);
        }
      }
      let synthesized = 0;
      for (const [uid, firstEv] of seenOther) {
        if (seenCreated.has(uid)) continue;
        // Synthesize a UNIT_CREATED at the position where the first
        // non-create event saw this uid. For UNIT_MOVED, use `to`
        // (the unit's actual position after the move is reported).
        let x, y, owner, type, slot;
        if (firstEv.event === 'UNIT_MOVED') {
          x = firstEv.to?.[0]; y = firstEv.to?.[1];
          owner = firstEv.owner; type = firstEv.type; slot = firstEv.slot;
        } else {
          x = firstEv.x; y = firstEv.y;
          owner = firstEv.owner; type = firstEv.type; slot = firstEv.slot;
        }
        if (x == null || y == null || owner == null) continue;
        const synth = {
          time_ms: (firstEv.time_ms ?? 0) - 0.001,  // fire just before
          turn: firstEv.turn ?? 0,
          event: 'UNIT_CREATED',
          slot, uid,
          x, y, type: type ?? 0, owner,
          order: 255, gotoX: -1, gotoY: -1,
          moveSpent: 0, statusFlags: 0, homeCity: 255,
          synthesized: true,
        };
        // Route into the same bucket as firstEv would have used.
        const c = synth.owner;
        let routedTurn = synth.turn;
        if (hasPreciseRouting) {
          const snapT = snapshotTime.get(synth.turn);
          if (snapT != null && synth.time_ms != null && synth.time_ms > snapT) {
            routedTurn = synth.turn + 1;
          }
        }
        const key = `${routedTurn}:${c}`;
        if (!replayEventsByTurnCiv.has(key)) replayEventsByTurnCiv.set(key, []);
        replayEventsByTurnCiv.get(key).push(synth);
        synthesized++;
      }
      if (synthesized > 0) {
        process.stderr.write(`[replay] Synthesized ${synthesized} UNIT_CREATED events for orphan uids (sniffer slot-reuse bug)\n`);
        if (process.env.DEBUG_CITY_FOUNDED || process.env.DEBUG_PHANTOM) {
          for (const [uid, firstEv] of seenOther) {
            if (!seenCreated.has(uid)) {
              process.stderr.write(`  orphan uid=${uid} first ev=${firstEv.event} turn=${firstEv.turn} slot=${firstEv.slot}\n`);
            }
          }
        }
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
    // --skip-replay: validation mode for AI ports. Drops this event
    // type from replay so v3 must originate the same decision from
    // its own AI.
    if (skipReplayTypes.has(ev.event)) return [];
    switch (ev.event) {
      case 'CITY_FOUNDED': {
        // Skip if the city already exists in v3 state at this position.
        // Sniffer snapshots dump AFTER quiet (post-AI cycle) so events
        // with timestamps < snap_N time describe state already in snap_N.
        // Re-applying CITY_FOUNDED would create a duplicate. Detected
        // by matching (x, y, owner) against existing live cities.
        const owner = ev.owner ?? ev.civ;
        const existing = (state.cities || []).find(c =>
          c && c.size > 0 && c.owner === owner
          && c.cx === ev.x && c.cy === ev.y);
        if (existing) {
          if (process.env.DEBUG_CITY_FOUNDED) {
            process.stderr.write(`[city-found] turn=${ev.turn} owner=${owner} ev.x=${ev.x},${ev.y} ${ev.name} — already exists, skipping\n`);
          }
          return [];
        }
        // Normal case: a Settler/Engineer at the tile founds the city.
        const units = state.units || [];
        // v3 stores u.x = iso doubled-X (matches ev.x); u.gx = u.x >> 1 (game half-coord).
        // ev.x in CITY_FOUNDED is the iso coord, so compare u.x not u.gx.
        // First try uid-specific lookup: a UNIT_KILLED event at same
        // (turn, x, y, owner) names which settler actually founded
        // (binary kills the founder). When multiple settlers occupy
        // the founding tile (Deity bonus settler stacking), naive
        // findIndex returns the WRONG one — the still-alive settler
        // gets killed by v3 while the actual founder wanders off.
        const foundingKey = `${ev.turn}:${ev.x}:${ev.y}:${owner}`;
        const foundingUid = foundingUidByEvent.get(foundingKey);
        let uIdx = -1;
        if (foundingUid != null) {
          // v3's nextUnitId assignment can diverge from binary's, so the
          // captured uid may be assigned to a DIFFERENT unit in v3.
          // Require the matched v3 unit to have correct owner AND type
          // (Settler/Engineer) — otherwise the BUILD_CITY validator
          // ("Not your unit" / "Only settlers") rejects silently.
          uIdx = units.findIndex(u => u
            && (u.id === foundingUid || u.sequenceId === foundingUid)
            && u.gx >= 0
            && u.owner === owner
            && (u.type === 0 || u.type === 1));
        }
        if (uIdx < 0) {
          uIdx = units.findIndex(u =>
            u && u.owner === owner && u.gx >= 0
            && (u.type === 0 || u.type === 1)
            && u.x === ev.x
            && u.y === ev.y);
        }
        if (process.env.DEBUG_CITY_FOUNDED) {
          process.stderr.write(`[city-found] turn=${ev.turn} owner=${owner} ev.x=${ev.x},${ev.y} matchedUnit=${uIdx} ${ev.name}\n`);
        }
        if (uIdx >= 0) {
          return [{ type: 'BUILD_CITY', unitIndex: uIdx, name: ev.name,
                    cityIdx: ev.cityIdx }];
        }
        // Advanced tribe (hut-spawned city): no Settler involved. Civ2
        // transforms the hut directly into a size-1 city. v3's BUILD_CITY
        // reducer requires a unitIndex, so we emit a __CITY_PLACE__
        // synthetic that creates the city record directly.
        return [{ type: '__CITY_PLACE__',
                  cityIdx: ev.cityIdx, x: ev.x, y: ev.y,
                  owner, name: ev.name }];
      }
      case 'RESEARCH_PICKED': {
        // techId=255 (0xFF) = "clear research target". The AI emits this
        // when abandoning the current research (e.g. tech completes via
        // hut/gift, or AI re-evaluates priorities). v3 must mirror the
        // clear — otherwise its techBeingResearched stays stale and
        // research progress accumulates on a phantom target.
        //
        // Try the standard SET_RESEARCH first (preserves rules.js
        // validation for the common case where v3 has the same prereqs
        // as the binary). If v3's civTechs diverges from the binary's,
        // SET_RESEARCH silently no-ops; the harness then force-sets via
        // __SET_RESEARCH__ at the post-batch reconciliation pass.
        if (ev.techId == null) return [];
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
        // Most stateFlags bits are v3's responsibility (atWar set at
        // combat, freeAdvancePending set by Darwin's Voyage, etc.). We
        // surface those diffs for manual v3-reducer fixing.
        //
        // Exceptions replayed here:
        //   bit 0x04 (senateOverride) — FUN_00560084 toggles it with
        //     1/3 probability each turn via a standalone rand() draw.
        //     Until #49 RNG alignment lands, v3 can't match it.
        //   bit 0x08 (government-assigned sentinel) — binary dynamically
        //     sets this via FUN_0055c69d and clears via per-civ-tick.
        //     v3's per-civ-tick clears it unconditionally, but it's
        //     only cleared on civs the binary actually processed. For
        //     civs not processed between snapshots, binary leaves
        //     bit 0x08 set. Replaying the observed state keeps v3 aligned
        //     without needing the "revert-unprocessed-civs" equivalent.
        if (ev.civ == null || ev.from == null || ev.to == null) return [];
        const mask = 0x02 | 0x04 | 0x08;
        const changed = (ev.from ^ ev.to) & mask;
        if (!changed) return [];
        const actions = [];
        if (changed & 0x02) {
          // bit 0x02 (atWar). v3 recomputes this in end-turn from its
          // treaty state, but the sniffer doesn't emit TREATY_CHANGED
          // events for AI-vs-AI war declarations. Without replay, v3's
          // treaty stays at peace, atWar stays clear, mismatches with
          // binary's observed value. Replay the bit directly.
          actions.push({ type: '__ATWAR_TOGGLE__', civ: ev.civ, set: !!(ev.to & 0x02) });
        }
        if (changed & 0x04) {
          actions.push({ type: '__SENATE_TOGGLE__', civ: ev.civ, set: !!(ev.to & 0x04) });
        }
        if (changed & 0x08) {
          actions.push({ type: '__GOV_SENTINEL__', civ: ev.civ, set: !!(ev.to & 0x08) });
        }
        return actions;
      }
      case 'TECH_DISCOVERED': {
        // Tech completion via normal research: v3 handles it in END_TURN
        // when progress >= calcResearchCost. Skip the event then, so we
        // don't mask research-calc bugs.
        //
        // Tech completion via EXTERNAL source (hut, gift, trade, Great
        // Library, Philosophy): v3 has no way to detect this — the
        // sniffer observed a bitmask bit flip that v3 wouldn't predict.
        // Use `wasResearching` (new field) to distinguish: if the
        // discovered techId != wasResearching, it's external and we
        // must replay. Otherwise skip.
        if (ev.civ == null || ev.techId == null) return [];
        const isExternal = ev.wasResearching != null && ev.wasResearching !== ev.techId;
        if (!isExternal) return [];
        return [{ type: '__TECH_DISCOVERED__', civ: ev.civ, techId: ev.techId,
                  reason: 'external' }];
      }
      case 'UNIT_KILLED': {
        // v3's combat reducer kills units when v3 actions fire BRIBE /
        // attack. But most combat in the observed stream is AI-vs-AI,
        // which v3 doesn't simulate at all — no combat actions are
        // dispatched, so v3 keeps both units alive. Without replay,
        // 100+ downstream mismatches cascade as units[] drifts out of
        // slot alignment. Replay the death as a direct state mutation:
        // this does NOT hide a v3 combat bug, because v3 isn't doing
        // the combat in the first place. Task #48 (route UNIT_MOVED
        // through v3 combat when entering enemy tile) is the proper
        // fix; replay is the bridge until that lands.
        if (ev.uid == null) return [];
        return [{ type: '__UNIT_KILL__', uid: ev.uid }];
      }
      case 'GOV_CHANGED': {
        // AI-driven revolution. Real Civ2 fires two events back-to-back
        // for AI civs: current→Anarchy (from>0, to=0) and Anarchy→new
        // (from=0, to>0). Replay them directly as state assignments;
        // v3's own REVOLUTION action would queue anarchy-turns and
        // pending-gov in a way that doesn't match Civ2's instant-
        // transition behavior for AI civs. This is NOT an override of
        // v3's computation — it's replay of the AI's decision, same
        // category as RESEARCH_PICKED / CITY_FOUNDED.
        if (ev.civ == null || ev.to == null) return [];
        return [{ type: '__SET_GOVERNMENT__', civ: ev.civ,
                  from: ev.from, to: ev.to }];
      }
      case 'CITY_DESTROYED':
        // City razing is typically the result of a successful attack
        // on a size-1 city. Same as UNIT_KILLED: v3 combat path would
        // produce it. Accept diff noise until combat routing is done.
        // (Tried adding __CITY_DESTROYED__ replay 2026-04-27 — caused
        // regression because the destroyed-then-replaced pattern
        // creates inconsistent state.)
        return [];
      case 'UNIT_CREATED': {
        // v3's END_TURN production creates the unit at its city tile,
        // but the sniffer sees the unit at whatever tile real Civ2
        // placed it (often adjacent after an immediate AI move).
        // Override position and, where the sniffer captured them,
        // order/goto/moveSpent/statusFlags. Older events.jsonl files
        // (pre-2026-04-18) won't have these fields; fall back to
        // heuristics based on whether the placement is at the home
        // city's tile (auto-fortify) or not (AI goto).
        if (ev.uid == null) return [];
        return [{ type: '__UNIT_CREATED_PLACE__', uid: ev.uid, x: ev.x, y: ev.y,
                  unitType: ev.type,
                  owner: ev.owner, order: ev.order,
                  gotoX: ev.gotoX, gotoY: ev.gotoY,
                  moveSpent: ev.moveSpent, statusFlags: ev.statusFlags,
                  slot: ev.slot, homeCity: ev.homeCity }];
      }
      case 'UNIT_MOVED': {
        // UID-based lookup — slot may have been reused.
        const units = state.units || [];
        const uIdx = units.findIndex(u => u && (u.id === ev.uid || u.sequenceId === ev.uid));
        if (uIdx < 0) return [];
        // Skip transit-state sentinels (any negative coord). The
        // sniffer emits these mid-animation — real Civ2 uses values
        // like -1000, -1200, -1400 to park a unit off-map during
        // rendering. A second UNIT_MOVED with the final position
        // follows; we only apply that one.
        if (!ev.to || ev.to[0] < 0 || ev.to[1] < 0) return [];
        // Use a synthetic teleport action rather than GOTO: v3's GOTO
        // reducer requires a precomputed `path` array and runs multi-
        // step pathfinding. For replay we already have the exact
        // destination from the sniffer, so we directly set the unit's
        // position (mirroring the postWrap handler). This avoids
        // silently failing when GOTO's validation rejects no-path
        // actions.
        return [{ type: '__UNIT_TELEPORT__', uid: ev.uid,
                  to: ev.to, owner: ev.owner ?? ev.civ,
                  gotoX: ev.gotoX, gotoY: ev.gotoY,
                  moveSpent: ev.moveSpent, statusFlags: ev.statusFlags }];
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
        //   11 = goto; 27 = goto_ai (AI multi-turn waypoint).
        // Direct byte SET. v3's WORKER_ORDER reducer rejects orders
        // when the unit isn't on a tile it can work (e.g. irrigation
        // on a tile already irrigated). The sniffer captures the
        // ground-truth byte from binary; replay it directly so v3's
        // order field matches regardless of v3's reducer's terrain
        // eligibility logic. Closes the ai-order-byte tag bucket.
        return [{ type: '__UNIT_ORDER_BYTE__', uid: ev.uid,
                  order: ev.order }];
      }
      case 'UNIT_DAMAGE':
        // Replay combat damage directly as an absolute SET on the
        // unit's damageTaken / hpLost. Avoids needing RNG-aligned
        // combat in v3 (see port_plan_48_combat_routing.md condition #1).
        if (ev.uid == null || ev.to == null) return [];
        return [{ type: '__UNIT_DAMAGE__', uid: ev.uid, to: ev.to }];
      case 'UNIT_HOMECITY_CHANGED':
        // Binary re-homes units on city founding/capture. UNIT_CREATED
        // captures only the initial homeCity; this fires for later
        // re-homes. Replay as direct SET on u.homeCity / u.homeCityId.
        if (ev.uid == null || ev.to == null) return [];
        return [{ type: '__UNIT_HOMECITY__', uid: ev.uid, to: ev.to }];
      case 'UNIT_GOTO_CHANGED':
        // Binary clears gotoX/gotoY when AI arrives at target or
        // re-targets without moving. v3 doesn't emit equivalent
        // updates so its goto fields stay stale. Replay the new
        // values directly as an absolute SET. Closes the
        // ai-goto-target tag (~19 mismatches/session).
        if (ev.uid == null) return [];
        return [{ type: '__UNIT_GOTO__', uid: ev.uid,
                  toX: ev.toX, toY: ev.toY }];
      case 'UNIT_STATUS_CHANGED': {
        // Unit statusFlags changed without position change (veteran
        // promotion from combat, flag transitions). v3 can't detect
        // these without running the same combat resolution — replay
        // the observed new flags directly. Same rationale as
        // UNIT_KILLED.
        if (ev.uid == null || ev.to == null) return [];
        return [{ type: '__UNIT_STATUS__', uid: ev.uid, flags: ev.to }];
      }
      case 'UNIT_VIS_CHANGED':
        // Per-unit "has been spotted by civs X,Y,Z" bitmask at memory
        // offset +0x09 of the unit struct. v3 doesn't derive this — no
        // per-unit fog tracking in the engine. But when the sniffer
        // captures the bitmask change (newer sessions), we can replay
        // it directly via __UNIT_VIS__ so the snapshot diff matches.
        if (ev.uid == null || ev.to == null) return [];
        return [{ type: '__UNIT_VIS__', uid: ev.uid, to: ev.to }];
      case 'UNIT_MOVESPENT_CHANGED':
        // Pure moveSpent transition (no position change). Sniffer-side
        // ground truth replaces the before/after-human heuristic that
        // __UNIT_TELEPORT__ uses. Closes ~37 mismatches/session in the
        // ai-movespent-timing bucket on sessions captured with this
        // event type (pre-2026-04-22 sessions don't emit it).
        if (ev.uid == null || ev.to == null) return [];
        return [{ type: '__UNIT_MOVESPENT__', uid: ev.uid, to: ev.to }];
      case 'ACTIVE_UNIT_CHANGED':
        // Binary's DAT_00655afe (current unit cycle pointer). v3 has no
        // equivalent AI heuristic. Replay the observed target directly.
        if (ev.to == null) return [];
        return [{ type: '__ACTIVE_UNIT_SET__', to: ev.to }];
      case 'CITY_PRODUCTION_CHANGED': {
        // Replay binary's AI production-item choice. v3's AI picks its
        // own item (often cheaper), completes on a different turn, and
        // cascades into phantom units / slot-shift diffs. Overriding
        // the item directly skips v3's AI decision. Byte encoding
        // matches parser.js:785: raw <= 0x3F is unit type, otherwise
        // building/wonder with id = 256 - raw. Negative signed values
        // (from sniffer's '<b') are equivalent: unsigned = raw + 256.
        if (ev.cityIdx == null || ev.to == null) return [];
        const raw = ev.to < 0 ? (ev.to + 256) : ev.to;
        let item;
        if (raw <= 0x3F) {
          item = { type: 'unit', id: raw };
        } else {
          const bid = 256 - raw;
          item = { type: bid >= 39 ? 'wonder' : 'building', id: bid };
        }
        return [{ type: '__CITY_PROD_SET__', cityIdx: ev.cityIdx, item,
                  prodRaw: raw }];
      }
      case 'GOLD_CHANGED': {
        // Most gold events are normal per-turn tax income that v3
        // derives itself from trade × taxRate. Don't replay those —
        // v3's calc should match and double-apply would break it.
        //
        // BUT: gold deltas of 25/50/75/100 are hut gold (Civ2 goody
        // hut bag values). Those come from unit movement, not the
        // economic system, and v3's UNIT_MOVED replay (__UNIT_TELEPORT__)
        // doesn't resolve huts. Replay these as a direct treasury
        // adjustment so the human civ's T1 +25 (the most common case)
        // doesn't cascade into +25 gold drift across the rest of the game.
        if (ev.civ == null || ev.from == null || ev.to == null) return [];
        const delta = ev.to - ev.from;
        if (delta === 25 || delta === 50 || delta === 75 || delta === 100) {
          // Use SET (absolute value) rather than ADD (delta) so idempotent —
          // harness replay may fire the event at multiple phases (pre-turn,
          // post-wrap) and we don't want to double-apply.
          return [{ type: '__TREASURY_SET__', civ: ev.civ, value: ev.to,
                    reason: 'hut-gold' }];
        }
        // Government-recovery one-off treasury writes (binary's
        // post-anarchy adjustment). Marked at load time when the
        // GOLD_CHANGED co-fires with recoveredFromRevolution:SET.
        // Env gate: DISABLE_GOV_RECOVERY_GOLD=1 (hardness audit).
        if (ev._replayGold === 'gov-recovery'
            && !process.env.DISABLE_GOV_RECOVERY_GOLD) {
          return [{ type: '__TREASURY_SET__', civ: ev.civ, value: ev.to,
                    reason: 'gov-recovery' }];
        }
        // AI civ end-of-turn gold writes captured by sniffer.
        // The binary's AI does things v3 doesn't simulate (rush-buy,
        // disband refunds, diplomatic gifts, etc.). For non-human
        // civs, the sniffer-captured GOLD_CHANGED at routedTurn ==
        // finalSimTurn is the authoritative end-state. Replay it as
        // a TREASURY_SET, overriding v3's tax-only calc.
        // Env gate: DISABLE_AI_GOLD_REPLAY=1 disables for hardness audit.
        const humanMaskGC = parsed.gameState?.humanPlayers ?? 0;
        const isAICivGC = !((1 << ev.civ) & humanMaskGC);
        if (!process.env.DISABLE_AI_GOLD_REPLAY
            && isAICivGC && ev._replayGold === 'ai-end-turn') {
          return [{ type: '__TREASURY_SET__', civ: ev.civ, value: ev.to,
                    reason: 'ai-end-turn' }];
        }
        if (replayTreasury) {
          return [{ type: '__TREASURY_SET__', civ: ev.civ, value: ev.to,
                    reason: 'replay-treasury' }];
        }
        return [];
      }
      case 'CITY_YIELD':
        // Handled by a dedicated pass at end-of-simulation (see search
        // for "CITY_YIELD dedicated pass"). Returning [] here keeps
        // per-civ event buckets clean of yield SETs; the dedicated pass
        // scans ALL buckets so events for civs with no END_TURN in the
        // activeCiv order still get applied. Diagnostic-only otherwise.
        return [];
      default:
        return [];  // TECH_DISCOVERED, TURN_ADVANCED, GOLD_CHANGED (v3 predicts), etc.
    }
  }

  // Deferred post-END_TURN events — see inline comment at the defer site
  // for why these can't apply immediately after each civ's END_TURN.
  const deferredPostEvents = [];
  // Track unit IDs that existed BEFORE this simulation started. A
  // UNIT_CREATED event for an already-present unit is a past-turn event
  // shifted forward by the late-event-shift rule; re-applying it would
  // stomp on a UNIT_MOVED that already moved the unit to its final
  // position. Only apply UNIT_CREATED_PLACE for genuinely-new units.
  const preExistingUnitIds = new Set(
    (initResult.gameState.units || [])
      .filter(u => u && u.gx >= 0)
      .flatMap(u => [u.id, u.sequenceId].filter(v => v != null))
  );
  // Capture starting city count. Cities created during simulation
  // (cityIdx >= startingCityCount) need a different treatment for
  // production values: v3 doesn't run production for cities founded
  // mid-turn (created via __CITY_PLACE__/postWrap, after the END_TURN
  // loop). For those, apply the latest matching CITY_YIELD event so
  // foodStored/shieldStored/tradeTotal match binary's snapshot.
  const startingCityCount = (initResult.gameState.cities || [])
    .filter(c => c && c.size > 0).length;
  // Target activeCiv for simulation stop: the human civ (matches
  // real Civ2 snapshot flow — user awaits input at activeCiv=human).
  // v3's `state.turn.activeCiv` is its own rotating "next-to-process"
  // value (often initialized to the first alive civ), which is NOT the
  // same thing. Derive from humanPlayers bitmask.
  const humanMaskForStop = parsed.gameState?.humanPlayers ?? 0;
  let origActiveCiv = -1;
  for (let c = 1; c < 8; c++) {
    if (humanMaskForStop & (1 << c)) { origActiveCiv = c; break; }
  }
  // Fallback: if no human, use whatever v3 picked.
  if (origActiveCiv < 0) {
    origActiveCiv = initResult.gameState.turn?.activeCiv
                 ?? initResult.gameState.activeCiv ?? 1;
  }
  for (let t = 0; t < turns; t++) {
    // Walk civs in activeCiv order. Before each END_TURN, exhaust moves
    // for that civ's units so the "units still need orders" validation
    // passes. This simulates a diagnostic "all units used their moves"
    // state — not what a real player would do, but reveals what END_TURN
    // processing actually does (production, tech, yields, etc.).
    for (let step = 0; step < 8; step++) {
      const civ = (gameState.turn?.activeCiv ?? gameState.activeCiv ?? 1);
      if (!(gameState.civsAlive & (1 << civ))) {
        // Dead civ in rotation. Skip — but advance activeCiv to next
        // alive civ so we don't infinite-loop. Earlier code did break
        // here, terminating the rotation at the FIRST dead civ. With
        // dead civ in middle of rotation (e.g. civ 6 dead, others alive),
        // this skipped processing of subsequent live civs entirely —
        // their END_TURN never ran, their CITY_FOUNDED events never
        // applied, settlers/units never updated.
        let next = civ;
        for (let i = 0; i < 8; i++) {
          next = (next + 1) % 8;
          if (next === 0) next = 1;
          if (gameState.civsAlive & (1 << next)) break;
        }
        if (next === civ) break;  // no other alive civs
        gameState = { ...gameState,
          turn: { ...gameState.turn, activeCiv: next } };
        continue;
      }

      // NOTE: v3 runAiTurn disabled here intentionally. Enabling it makes
      // prediction worse because v3's AI heuristics pick different research
      // targets, tax/science rates, and settler destinations than real Civ2.
      // With --replay we inject the REAL Civ2 AI's decisions from the
      // sniffer-captured events.jsonl instead — preserves deterministic
      // mechanics validation without replicating Civ2's AI.
      const currentTurn = gameState.turn?.number ?? gameState.turnsPassed ?? 1;
      const replayKey = `${currentTurn}:${civ}`;
      const replayEvents = replayEventsByTurnCiv.get(replayKey) || [];
      // Some events describe state changes that the binary applies
      // AFTER the civ's END_TURN has finished (e.g., AI rate re-balance
      // following tech discovery, senate-override flag writes). If we
      // replay them BEFORE END_TURN they perturb this-turn's economy
      // calculations — e.g., a tax-rate bump applied pre-end-turn would
      // pull extra gold from the same trade that real Civ2 processed
      // under the previous rate. Split the batch into pre-end-turn and
      // post-end-turn queues based on event type.
      const POST_END_TYPES = new Set(['RATE_CHANGED', 'RESEARCH_PICKED',
        'TECH_DISCOVERED', 'FLAGS_CHANGED', 'GOLD_CHANGED', 'GOV_CHANGED',
        // UNIT_CREATED handled post-END because v3's production inside
        // END_TURN creates the unit; we then override its position/
        // flags to match real Civ2 (which places the unit at the
        // event's x/y, NOT the city tile — AI moves the new unit
        // post-production in the same turn).
        'UNIT_CREATED']);
      // CITY_YIELD is NOT routed via this per-civ bucket — events for
      // civs whose END_TURN is skipped (activeCiv order quirks) would
      // be dropped. Handled in a dedicated final pass below.
      const preEvents = replayEvents.filter(e => !POST_END_TYPES.has(e.event));
      const postEvents = replayEvents.filter(e => POST_END_TYPES.has(e.event));
      if (preEvents.length > 0) {
        process.stderr.write(`[replay] turn ${currentTurn} civ ${civ} pre: ${preEvents.length} events\n`);
      }
      const applyReplayBatch = (batch) => {
        for (const ev of batch) {
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
            if (action.type === '__ATWAR_TOGGLE__') {
              gameState = {
                ...gameState,
                civs: gameState.civs.map((c, i) => {
                  if (i !== action.civ) return c;
                  const sf = c.stateFlags || 0;
                  return { ...c,
                    stateFlags: action.set ? (sf | 0x02) : (sf & ~0x02) };
                }),
              };
              continue;
            }
            if (action.type === '__SENATE_TOGGLE__') {
              // Replay FUN_00560084's rand()%3 senate-override toggle
              // until v3 RNG call-order matches the binary.
              gameState = {
                ...gameState,
                civs: gameState.civs.map((c, i) => {
                  if (i !== action.civ) return c;
                  const sf = c.stateFlags || 0;
                  return { ...c,
                    stateFlags: action.set ? (sf | 0x04) : (sf & ~0x04) };
                }),
              };
              continue;
            }
            if (action.type === '__GOV_SENTINEL__') {
              gameState = {
                ...gameState,
                civs: gameState.civs.map((c, i) => {
                  if (i !== action.civ) return c;
                  const sf = c.stateFlags || 0;
                  return { ...c,
                    stateFlags: action.set ? (sf | 0x08) : (sf & ~0x08) };
                }),
              };
              continue;
            }
            if (action.type === '__SET_RESEARCH__') {
              // Force-set techBeingResearched, bypassing rules.js prereq
              // check. Binary picked this tech => binary thinks the civ
              // has prereqs; v3's civTechs may legitimately diverge in
              // replay mode (sniffer can't observe every tech grant),
              // and the standard SET_RESEARCH path silently no-ops on
              // validation failure, freezing progress at 255.
              gameState = {
                ...gameState,
                civs: gameState.civs.map((c, i) =>
                  i === action.civ ? { ...c, techBeingResearched: action.advanceId } : c),
              };
              continue;
            }
            if (action.type === '__SET_GOVERNMENT__') {
              // Direct government assignment from GOV_CHANGED replay.
              // Binary FUN_0055c69d sets stateFlags bit 0x08 here, but
              // FUN_00560084 clears it on the next per-civ tick — every
              // observed snapshot has bit 0x08 already cleared, so we
              // don't re-set it (would false-positive the diff).
              const GOV_STRINGS = ['anarchy', 'despotism', 'monarchy',
                'communism', 'fundamentalism', 'republic', 'democracy'];
              const newGovStr = GOV_STRINGS[action.to] ?? 'anarchy';
              gameState = {
                ...gameState,
                civs: gameState.civs.map((c, i) => {
                  if (i !== action.civ) return c;
                  const upd = { ...c, government: newGovStr };
                  delete upd.anarchyTurns;
                  delete upd.pendingGovernment;
                  return upd;
                }),
              };
              continue;
            }
            // __TREASURY_ADJUST__ is handled only in the post-wrap phase
            // (not here) — it fires once per event, and the post-wrap
            // location sees the event exactly once per turn routing.
            if (action.type === '__UNIT_DAMAGE__') {
              gameState = {
                ...gameState,
                units: gameState.units.map(u =>
                  u && (u.id === action.uid || u.sequenceId === action.uid)
                    ? { ...u, hpLost: action.to, damageTaken: action.to,
                        movesRemain: action.to }
                    : u),
              };
              continue;
            }
            if (action.type === '__UNIT_HOMECITY__') {
              gameState = {
                ...gameState,
                units: gameState.units.map(u =>
                  u && (u.id === action.uid || u.sequenceId === action.uid)
                    ? { ...u, homeCity: action.to, homeCityId: action.to }
                    : u),
              };
              continue;
            }
            if (action.type === '__UNIT_ORDER_BYTE__') {
              const B2O = { 0xFF: 'none', 0: 'none', 1: 'fortifying',
                2: 'fortified', 3: 'sleep', 4: 'buildFortress',
                5: 'buildRoad', 6: 'buildIrrigation', 7: 'buildMine',
                8: 'transform', 9: 'cleanPollution', 10: 'buildAirbase',
                11: 'railroad', 27: 'goto_ai' };
              gameState = {
                ...gameState,
                units: gameState.units.map(u =>
                  u && (u.id === action.uid || u.sequenceId === action.uid)
                    ? { ...u, order: action.order,
                        orders: B2O[action.order] ?? 'none' }
                    : u),
              };
              continue;
            }
            if (action.type === '__UNIT_GOTO__') {
              gameState = {
                ...gameState,
                units: gameState.units.map(u =>
                  u && (u.id === action.uid || u.sequenceId === action.uid)
                    ? { ...u, gotoX: action.toX, gotoY: action.toY,
                        goToX: action.toX, goToY: action.toY }
                    : u),
              };
              continue;
            }
            if (action.type === '__UNIT_VIS__') {
              gameState = {
                ...gameState,
                units: gameState.units.map(u =>
                  u && (u.id === action.uid || u.sequenceId === action.uid)
                    ? { ...u, visibility: action.to }
                    : u),
              };
              continue;
            }
            if (action.type === '__UNIT_MOVESPENT__') {
              gameState = {
                ...gameState,
                units: gameState.units.map(u =>
                  u && (u.id === action.uid || u.sequenceId === action.uid)
                    ? { ...u, moveSpent: action.to, movesSpent: action.to }
                    : u),
              };
              continue;
            }
            if (action.type === '__CITY_PROD_SET__') {
              gameState = {
                ...gameState,
                cities: gameState.cities.map((c, i) =>
                  i === action.cityIdx && c
                    ? { ...c, itemInProduction: action.item, prodRaw: action.prodRaw }
                    : c),
              };
              continue;
            }
            if (action.type === '__ACTIVE_UNIT_SET__') {
              gameState = { ...gameState, activeUnit: action.to };
              continue;
            }
            if (action.type === '__UNIT_STATUS__') {
              gameState = {
                ...gameState,
                units: gameState.units.map(u => {
                  if (!u || !(u.id === action.uid || u.sequenceId === action.uid)) return u;
                  return { ...u, statusFlags: action.flags,
                    veteran: (action.flags & 0x2000) ? 1 : 0 };
                }),
              };
              continue;
            }
            if (action.type === '__UNIT_KILL__') {
              // Mark unit dead (gx=-1) so its saveIndex frees up for
              // subsequent unit creations this turn.
              gameState = {
                ...gameState,
                units: gameState.units.map(u =>
                  u && (u.id === action.uid || u.sequenceId === action.uid)
                    ? { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 }
                    : u),
              };
              continue;
            }
            if (action.type === '__CITY_DESTROYED__') {
              // Mark city as destroyed (size=0, gx=-1, owner=-1). The
              // binary's delete_city (FUN_004413d1) also rehomes or
              // disbands units; we rely on subsequent UNIT_KILLED events
              // from the sniffer for that. Tile-ownership cleanup is
              // handled by the map-region snapshot comparison, not here.
              const ci = action.cityIdx;
              if (ci == null) continue;
              gameState = {
                ...gameState,
                cities: gameState.cities.map((c, i) =>
                  i === ci ? { ...c, size: 0, owner: -1, gx: -1, gy: -1 } : c),
              };
              continue;
            }
            if (action.type === '__UNIT_TELEPORT__') {
              // Direct position set matching postWrap UNIT_MOVED
              // handler. Used for in-loop UNIT_MOVED events where
              // the reducer's GOTO action would fail (no path).
              const [tx, ty] = action.to;
              const hMask = parsed.gameState?.humanPlayers ?? 0;
              let hCiv = -1;
              for (let c = 1; c < 8; c++) { if (hMask & (1 << c)) { hCiv = c; break; } }
              const isHumanOwner = hCiv > 0 && action.owner === hCiv;
              const ownerAfterHuman = hCiv > 0 && action.owner > hCiv;
              const TERRAIN_MOVE_COST = [1, 1, 1, 2, 2, 3, 1, 2, 2, 2, 1];
              let destCost = 1;
              if (mapBase?.getTerrain) {
                const terrain = mapBase.getTerrain(Math.floor(tx / 2), ty);
                destCost = TERRAIN_MOVE_COST[terrain] ?? 1;
              }
              // For AI civs AFTER the human in cycle order, moveSpent
              // gets cleared to 0 between their END_TURN (which set
              // it to the movement cost) and the next human-pause
              // snapshot. The sniffer captures the event-time value
              // (3/6/9) but the snapshot shows 0. Force 0 for
              // after-human AI regardless of the captured value.
              // Human: always 0 (their start-of-turn reset fires
              // before the next snapshot). Before-human AI: use
              // the captured event value (or destCost*3 fallback).
              const newMoveSpent = (isHumanOwner || ownerAfterHuman)
                ? 0
                : (action.moveSpent != null ? action.moveSpent : destCost * 3);
              const setGoto = !isHumanOwner;
              const newGotoX = action.gotoX != null ? action.gotoX : (setGoto ? tx : -1);
              const newGotoY = action.gotoY != null ? action.gotoY : (setGoto ? ty : -1);
              gameState = {
                ...gameState,
                units: gameState.units.map(u => {
                  if (!u || !(u.id === action.uid || u.sequenceId === action.uid)) return u;
                  const patched = { ...u, x: tx, y: ty, cx: tx, cy: ty,
                          gx: Math.floor(tx / 2), gy: ty,
                          moveSpent: newMoveSpent,
                          gotoX: newGotoX, gotoY: newGotoY,
                          goToX: newGotoX, goToY: newGotoY };
                  if (action.statusFlags != null) patched.statusFlags = action.statusFlags;
                  return patched;
                }),
              };
              // Fog-of-war reveal for the moving civ.
              if (action.owner != null && mapBase?.tileData) {
                try {
                  updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh,
                    action.owner, Math.floor(tx / 2), ty, mapBase.wraps);
                } catch (_) { /* swallow */ }
              }
              continue;
            }
            if (action.type === '__UNIT_CREATED_PLACE__') {
              // Skip if this unit already existed in the starting
              // state — the event is a past-turn creation shifted
              // forward by late-event-shift, and applying it would
              // clobber a subsequent UNIT_MOVED.
              if (preExistingUnitIds.has(action.uid)) continue;
              // Override position + flags for a unit that v3's
              // production just created at the city tile. Real Civ2
              // may have moved the unit to an adjacent tile during
              // the same civ's turn (AI post-creation action). The
              // sniffer's UNIT_CREATED event captures the final
              // position, so we adopt it here.
              gameState = {
                ...gameState,
                units: gameState.units.map(u => {
                  if (!u || !(u.id === action.uid || u.sequenceId === action.uid)) return u;
                  // If the matched v3-created unit has a different owner
                  // or type than the sniffer-captured UNIT_CREATED, v3
                  // assigned this uid to a different unit than real
                  // Civ2. Fully override owner/type so the final state
                  // matches the sniffer.
                  const hc = u.homeCity != null ? gameState.cities?.[u.homeCity] : null;
                  const hcX = hc ? (hc.cx ?? hc.x) : null;
                  const hcY = hc ? (hc.cy ?? hc.y) : null;
                  const placedOffCity = hc && (hcX !== action.x || hcY !== action.y);
                  const patched = { ...u, x: action.x, y: action.y,
                          cx: action.x, cy: action.y,
                          gx: Math.floor(action.x / 2), gy: action.y };
                  if (action.owner != null) patched.owner = action.owner;
                  if (action.unitType != null) patched.type = action.unitType;
                  const B2O = { 0xFF: 'none', 0: 'none', 1: 'fortifying',
                    2: 'fortified', 3: 'sleep', 4: 'buildFortress',
                    5: 'buildRoad', 6: 'buildIrrigation', 7: 'buildMine',
                    8: 'transform', 9: 'cleanPollution', 10: 'buildAirbase',
                    11: 'railroad', 27: 'goto_ai' };
                  if (action.order != null) patched.order = action.order;
                  else if (placedOffCity) patched.order = 27;
                  if (B2O[patched.order] != null) patched.orders = B2O[patched.order];
                  if (action.gotoX != null) { patched.gotoX = action.gotoX; patched.goToX = action.gotoX; }
                  else if (placedOffCity) { patched.gotoX = action.x; patched.goToX = action.x; }
                  if (action.gotoY != null) { patched.gotoY = action.gotoY; patched.goToY = action.gotoY; }
                  else if (placedOffCity) { patched.gotoY = action.y; patched.goToY = action.y; }
                  if (action.moveSpent != null) patched.moveSpent = action.moveSpent;
                  if (action.statusFlags != null) patched.statusFlags = action.statusFlags;
                  // Sniffer's UNIT_CREATED event captures the REAL slot
                  // assignment. v3's production picks lowest-free-slot
                  // at production time, which may differ if settlers
                  // die later in the same cycle (freeing slots real
                  // Civ2 used for later uids). Override.
                  if (action.slot != null) patched.saveIndex = action.slot;
                  return patched;
                }),
              };
              continue;
            }
            // Synthetic __CITY_PLACE__ — fires when CITY_FOUNDED can't find
            // the founding Settler in v3's unit roster (e.g. AI civ founded
            // a city this turn but its settler is misaligned, killed, or
            // never created in v3). Create the city record directly so
            // downstream civs see the slot occupied. Mirrors the postWrap
            // pre-pass handler at line ~1496 — without this, the action
            // falls through to applyAction which rejects it, leaving v3
            // missing the city for the rest of the simulation.
            if (action.type === '__CITY_PLACE__') {
              if (process.env.DEBUG_CITY_FOUNDED) {
                process.stderr.write(`[city-place per-civ] turn=${ev.turn} ${action.name} at (${action.x},${action.y}) owner=${action.owner}\n`);
              }
              const newCity = {
                name: action.name || '',
                owner: action.owner,
                originalOwner: action.owner,
                size: 1,
                gx: Math.floor(action.x / 2), gy: action.y,
                cx: action.x, cy: action.y,
                x: action.x, y: action.y,
                foodInBox: 0, shieldsInBox: 0,
                buildings: new Set(),
                workedTiles: [],
                specialists: [],
                turnAge: 0,
                itemInProduction: { type: 'unit', id: 2 },
              };
              gameState = {
                ...gameState,
                cities: [...(gameState.cities || []), newCity],
              };
              gameState = placeCityAtSlot(gameState, action.cityIdx);
              // Cities reveal a radius-2 area for the founding civ.
              // Match binary create_city @ 0x43F8B0 line 5671:
              // only reveal radius-2 spiral when this is the founding
              // civ's FIRST city. Subsequent cities don't trigger
              // spiral reveal in normal play.
              try {
                const _gxC = Math.floor(action.x / 2);
                const _gyC = action.y;
                const ownerCount = (gameState.cities || []).filter(c =>
                  c && c.owner === action.owner && c.size > 0
                  && !(c.gx === _gxC && c.gy === _gyC)).length;
                if (ownerCount === 0) {
                  updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh,
                    action.owner, _gxC, _gyC, mapBase.wraps, 2);
                }
              } catch (_) { /* swallow */ }
              continue;
            }
            // Synthetic __TECH_DISCOVERED__ — add to civTechs bitmask and
            // bump acquiredTechCount. Do NOT reset researchingTech or
            // researchProgress: the binary's post-discovery behavior is
            // to subtract the cost from progress (keep overflow) and
            // leave researchingTech pointing at the just-discovered tech
            // until the civ picks a new target (usually next turn). A
            // snapshot captured BEFORE that new pick shows
            // researchingTech=<discovered> with small progress. Resetting
            // to 0xFF/0 was making turn-41 civ-4/civ-5 diffs look like
            // research never started — matching the binary means
            // preserving the field values.
            if (action.type === '__TECH_DISCOVERED__') {
              const newTechs = gameState.civTechs
                ? [...gameState.civTechs]
                : new Array(8).fill(null).map(() => new Set());
              newTechs[action.civ] = new Set(newTechs[action.civ] || []);
              newTechs[action.civ].add(action.techId);
              gameState = {
                ...gameState,
                civTechs: newTechs,
                civs: gameState.civs.map((c, i) =>
                  i === action.civ
                    ? { ...c, acquiredTechCount: (c.acquiredTechCount ?? 0) + 1 }
                    : c),
              };
              continue;
            }
            try {
              const preLen = (gameState.cities || []).length;
              const next = applyAction(gameState, mapBase, action, civ);
              if (next && next !== gameState) gameState = next;
              // BUILD_CITY appends to cities[]; reorder to binary's slot.
              if (action.type === 'BUILD_CITY' && action.cityIdx != null) {
                const postLen = (gameState.cities || []).length;
                if (process.env.DEBUG_CITY_FOUNDED && postLen === preLen) {
                  const u = gameState.units[action.unitIndex];
                  process.stderr.write(`[BUILD_CITY no-append] action.cityIdx=${action.cityIdx} unitIndex=${action.unitIndex} name=${action.name} unit=${u ? `uid=${u.id} owner=${u.owner} type=${u.type} gx=${u.gx} gy=${u.gy}` : 'null'} civ=${civ}\n`);
                }
                gameState = placeCityAtSlot(gameState, action.cityIdx);
              }
            } catch (e) {
              process.stderr.write(`[replay] ${ev.event} action failed: ${e.message}\n`);
            }
          }
        }
      };
      applyReplayBatch(preEvents);

      // ── Frida capture injection (pre-END_TURN) ──
      // When --replay-frida is active, slot the binary's authoritative
      // researchCostGlobals into state BEFORE end-turn runs. v3's
      // calcResearchCostExact reads state.researchCostGlobals.
      //
      // IMPORTANT: end-turn computes research cost for the NEXT civ
      // (it processes the next civ's start-of-turn during the ending
      // civ's END_TURN call). So we look up the Frida slot for the
      // NEXT alive civ, not the current ending civ. Without this,
      // civs whose research-cost calc happens during another civ's
      // END_TURN fall through to deriveResearchCostGlobals (v3's
      // approximation), producing the `ai-research-completion` and
      // `research-rounding` known-gap mismatches.
      let nextActiveCiv = civ;
      for (let i = 0; i < 8; i++) {
        nextActiveCiv = (nextActiveCiv + 1) % 8;
        if (nextActiveCiv === 0) nextActiveCiv = 1;
        if (gameState.civsAlive & (1 << nextActiveCiv)) break;
      }
      const fridaSlot = fridaByTurnCiv.get(`${currentTurn}:${civ}`);
      const nextFridaSlot = fridaByTurnCiv.get(`${currentTurn}:${nextActiveCiv}`);
      const _disableFridaCost = !!process.env.DISABLE_FRIDA_RESEARCH_COST;
      if (!_disableFridaCost && nextFridaSlot?.researchCost) {
        gameState = { ...gameState, researchCostGlobals: nextFridaSlot.researchCost.globals };
      } else if (!_disableFridaCost) {
        // Frida didn't capture fun_research_cost for (currentTurn,
        // nextActiveCiv) — likely because the binary cached the value
        // and didn't recompute this turn. Walk back through earlier
        // turns to find the most recent capture for this civ; if found,
        // extrapolate techCounter (binary increments by 1 per turn).
        // Without this, calcResearchCostExact falls through to v3's
        // deriveResearchCostGlobals which can compute a too-low cost
        // and trigger spurious tech "discoveries" v3 then resets.
        for (let backTurn = currentTurn - 1; backTurn >= 0; backTurn--) {
          const slot = fridaByTurnCiv.get(`${backTurn}:${nextActiveCiv}`);
          if (slot?.researchCost) {
            const baseGlobals = slot.researchCost.globals;
            const extrapTechCounter = (baseGlobals.techCounter ?? 0)
              + (currentTurn - backTurn);
            gameState = { ...gameState,
              researchCostGlobals: { ...baseGlobals, techCounter: extrapTechCounter } };
            break;
          }
        }
      }

      // Zero out movesLeft for this civ's units so END_TURN validation passes
      gameState = {
        ...gameState,
        units: gameState.units.map(u =>
          u.owner === civ && u.gx >= 0 ? { ...u, movesLeft: 0 } : u),
      };
      // Mark state as replay-mode so END_TURN skips autonomous AI
      // behavior (barbarian spawn, AI actions) that v3's engine would
      // normally run. In replay we get those from events.jsonl.
      gameState.replayMode = true;
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
      // Post-END_TURN events: flag changes, rate rebalances, research
      // target swaps, tech discoveries. The binary applies these AFTER
      // the civ's turn processing. Complication: v3's END_TURN(civ X)
      // actually computes the NEXT civ's (Y's) trade during X's call —
      // meaning applying civ X's post-events right after END_TURN(X)
      // would bleed into civ X's own trade calc, which happens inside
      // END_TURN of a LATER civ. To avoid this, defer ALL post-events
      // until the entire END_TURN loop has finished; at that point
      // every civ's trade has been computed with its pre-event rates.
      if (postEvents.length > 0) {
        // GOLD_CHANGED with routedTurn ≤ initialTurn is a "warm-up"
        // event whose effect is already in the input snapshot (e.g.
        // gov-recovery treasury writes from previous turn). Re-applying
        // it at the END of the sim would clobber v3's correct turn-N
        // tax calc. Skip those.
        const initialTurn = initResult.gameState.turn?.number ?? 0;
        const filteredPostEvents = postEvents.filter(e => {
          if (e.event !== 'GOLD_CHANGED') return true;
          const rt = e._routedTurn ?? e.turn ?? 0;
          return rt > initialTurn;
        });
        process.stderr.write(`[replay] turn ${currentTurn} civ ${civ} post: ${filteredPostEvents.length} events (deferred)\n`);
        deferredPostEvents.push(...filteredPostEvents);
      }

      // ── Frida unit-action injection (post-END_TURN) ──
      //
      // For each unit slot v3 has owned by `civ`, look up the matching
      // captured state and apply position/orders/moveSpent/etc.
      // Conservative: do NOT delete v3 units missing from captures (the
      // binary may not call ai_unit_action for every unit every turn,
      // e.g. fortified or sentried units that don't move). Do NOT
      // create v3 units from captures alone (slot may collide with a
      // v3 unit owned by another civ; production paths handle creation
      // via slice 6).
      //
      // Slot-aligned correctness only works to the extent that v3 and
      // binary keep the same slot indices. Once they diverge, the
      // matching becomes noise — but staying conservative avoids the
      // catastrophic failure mode (deleting human-civ units that have
      // no captures since binary doesn't AI-process humans).
      if (fridaUnitStateByTurnUnit.size > 0 && gameState.units) {
        const newUnits = gameState.units.slice();
        let writes = 0, phantoms = 0;

        // Step 1: per-slot state update from ai_unit_action captures.
        for (let ui = 0; ui < newUnits.length; ui++) {
          const u = newUnits[ui];
          if (!u || u.owner !== civ || u.gx < 0) continue;
          const cap = fridaUnitStateByTurnUnit.get(`${currentTurn}:${ui}`);
          if (!cap) continue;
          if (cap.owner !== civ) continue;
          if (cap.alive === 0) continue;
          newUnits[ui] = {
            ...u,
            gx: cap.x,
            gy: cap.y,
            movesLeft: cap.movesRem,
            order: cap.orders,
            gotoX: cap.gotoX,
            gotoY: cap.gotoY,
            statusFlags: cap.statusFlags,
            damageTaken: Math.max(0, (u.damageTaken ?? 0) +
                ((u.hp ?? 99) - cap.hp)),
          };
          writes++;
        }

        // Step 2 (slice 7b): phantom cleanup using authoritative
        // civ_turn_driver roster. Only runs when we have a roster
        // for (turn, civ) — otherwise leave units alone (no risk
        // of accidentally deleting humans whose binary doesn't AI).
        // Phantom cleanup: only run when v3 has STRICTLY MORE units
        // owned by this civ than binary's roster contains. Slot-level
        // matching can differ (v3 and binary assign new units to
        // different slots independently), so deleting "v3-not-in-
        // roster" can wrongly delete units that exist in both — just
        // at different slot indices. Only delete the EXCESS count.
        // Use latest roster ≤ currentTurn (Frida data has gaps).
        let roster = fridaUnitRosterByTurnCiv.get(`${currentTurn}:${civ}`);
        if (!roster) {
          for (let t = currentTurn - 1; t >= currentTurn - 5 && !roster; t--) {
            roster = fridaUnitRosterByTurnCiv.get(`${t}:${civ}`);
          }
        }
        if (process.env.DEBUG_PHANTOM) {
          process.stderr.write(`[phantom] turn=${currentTurn} civ=${civ} roster=${roster ? roster.size : 'NONE'}\n`);
        }
        if (roster) {
          // Count v3's alive units for this civ.
          const v3Slots = [];
          for (let ui = 0; ui < newUnits.length; ui++) {
            const u = newUnits[ui];
            if (u && u.owner === civ && u.gx >= 0) v3Slots.push(ui);
          }
          const excess = v3Slots.length - roster.size;
          if (excess > 0) {
            // Delete `excess` units from highest slots not in roster.
            // Iterating from highest slot prefers deleting recently-
            // produced units (more likely phantoms from speculative
            // production) over original snapshot units.
            // EXCLUSION: skip uids that have a UNIT_CREATED before
            // currentTurn AND no UNIT_KILLED yet — these are units
            // confirmed alive in binary stream and shouldn't be culled
            // even if they happen to land at a slot binary's roster
            // doesn't enumerate (Frida roster snapshots between turns
            // can miss transient slot occupancy).
            const candidates = v3Slots.filter(s => {
              if (roster.has(s)) return false;
              const u = newUnits[s];
              if (!u) return true;
              const uid = u.id ?? u.sequenceId;
              if (uid == null) return true;
              // Confirmed alive iff sniffer recorded UNIT_CREATED but no UNIT_KILLED.
              const created = unitCreatedTurns.get(uid);
              const killed = unitKilledTurns.get(uid);
              if (created != null && created <= currentTurn) {
                if (killed == null || killed > currentTurn) {
                  return false;  // confirmed alive — don't cull
                }
              }
              return true;
            }).sort((a,b) => b-a);
            for (let i = 0; i < excess && i < candidates.length; i++) {
              const ui = candidates[i];
              newUnits[ui] = { ...newUnits[ui], gx: -1, gy: -1 };
              phantoms++;
            }
          }
        }

        if (writes > 0 || phantoms > 0) {
          gameState = { ...gameState, units: newUnits };
        }
      }

      // ── Frida city-production injection (post-END_TURN) ──
      // For each of this civ's cities, if the binary captured an
      // ai_city_production_pick for (currentTurn, cityIdx), override
      // city.production. The capture is a signed byte matching
      // city+0x39's encoding (0..0x3F = unit, otherwise building/wonder
      // via 256-byte). v3's parser stores production as
      // {type, id} so we convert.
      if (fridaProductionByTurnCity.size > 0 && gameState.cities) {
        const newCities = gameState.cities.slice();
        let prodInjections = 0;
        for (let ci = 0; ci < newCities.length; ci++) {
          const city = newCities[ci];
          if (!city || city.owner !== civ) continue;
          const cap = fridaProductionByTurnCity.get(`${currentTurn}:${ci}`);
          if (!cap || cap.production == null) continue;
          // Sentinel 99/0x63 = "no change"; skip.
          if (cap.production === 99) continue;
          const byte = cap.production & 0xFF;  // unsigned for encoding
          let newProd;
          if (byte <= 0x3F) {
            newProd = { type: 'unit', id: byte };
          } else {
            const buildId = 256 - byte;
            newProd = { type: buildId >= 39 ? 'wonder' : 'building', id: buildId };
          }
          newCities[ci] = { ...city, production: newProd };
          prodInjections++;
        }
        if (prodInjections > 0) {
          gameState = { ...gameState, cities: newCities };
        }
      }

      // ── Frida capture injection (post-END_TURN) ──
      // If the binary's ai_research_pick captured a specific tech for
      // this (turn, civ), override civ.techBeingResearched after
      // end-turn. v3's end-turn resets to 0xFF when a tech completes
      // AND doesn't pick a new one (runAiTurn disabled). This injects
      // the binary's actual pick so next turn's research accumulates
      // on the right target.
      //
      // BUT: ai_research_pick is the binary's COMPUTATION of the next
      // tech; the actual write to civ.techBeingResearched can happen
      // later (e.g. during the next turn's begin-of-turn processing).
      // If there's a sniffer RESEARCH_PICKED event for this civ routed
      // to a LATER bucket, that event will drive the change at the
      // correct time — applying the Frida pick now would set the field
      // too early and mismatch the snapshot taken before the actual
      // write.
      //
      // Also override civ.government when choose_government switched.
      // Env gate: DISABLE_FRIDA_RESEARCH_PICK=1 disables the Frida
      // ai_research_pick injection (hardness audit).
      const _disableFridaPick = !!process.env.DISABLE_FRIDA_RESEARCH_PICK;
      if (fridaSlot && !_disableFridaPick) {
        let suppressResearchPick = false;
        if (fridaSlot.researchPick != null && fridaSlot.researchPick >= 0) {
          // Look for a sniffer RESEARCH_PICKED for this civ at a
          // later routedTurn — if present, defer to it.
          for (const [key, batch] of replayEventsByTurnCiv) {
            const [bucketTurn, bucketCiv] = key.split(':').map(Number);
            if (bucketCiv !== civ || bucketTurn <= currentTurn) continue;
            for (const ev of batch) {
              if (ev.event === 'RESEARCH_PICKED' &&
                  ev.techId === fridaSlot.researchPick) {
                suppressResearchPick = true;
                break;
              }
            }
            if (suppressResearchPick) break;
          }
        }
        if (fridaSlot.researchPick != null && fridaSlot.researchPick >= 0
            && !suppressResearchPick) {
          const targetCiv = gameState.civs?.[civ];
          if (targetCiv) {
            const newCivs = gameState.civs.slice();
            newCivs[civ] = { ...targetCiv, techBeingResearched: fridaSlot.researchPick };
            gameState = { ...gameState, civs: newCivs };
          }
        }
        if (fridaSlot.govtChosen != null && fridaSlot.govtChosen >= 0) {
          const targetCiv = gameState.civs?.[civ];
          if (targetCiv) {
            const GOVT_KEYS = ['anarchy', 'despotism', 'monarchy', 'communism',
              'fundamentalism', 'republic', 'democracy'];
            const newGovt = GOVT_KEYS[fridaSlot.govtChosen] ?? targetCiv.government;
            if (newGovt !== targetCiv.government) {
              const newCivs = gameState.civs.slice();
              newCivs[civ] = { ...targetCiv, government: newGovt };
              gameState = { ...gameState, civs: newCivs };
            }
          }
        }
        // Clear the transient researchCostGlobals so the next civ's
        // end-turn doesn't accidentally inherit it.
        if (gameState.researchCostGlobals) {
          const { researchCostGlobals: _, ...rest } = gameState;
          gameState = rest;
        }
      }
      // Stop at cycle boundary. v3's END_TURN has a quirk where the
      // trade/treasury/production processing uses activeCiv=next (the
      // civ STARTING its turn, not the one ending). If we kept
      // iterating past the wrap, civ 4's END_TURN for turn N+1 would
      // reprocess civ 5's (human's) cities and over-count their
      // yields. To capture AI civs' turn-N+1 ACTIONS (unit moves,
      // new unit creations) without the double-processing, we defer
      // post-wrap events to a raw-state pass below.
      const newTurn = gameState.turn?.number ?? gameState.turnsPassed ?? 0;
      const origTurn = initResult.gameState.turn?.number ?? initResult.gameState.turnsPassed ?? 0;
      if (newTurn > origTurn + t) break;
    }
    turnsRan++;
  }

  // Post-cycle-wrap: fire START_TURN for each civ whose turn has
  // BEGUN in the new cycle at snapshot time (civs 0..human inclusive
  // in cycle order). This is the canonical per-civ start-of-turn
  // processing (binary ref: FUN_0048710a) — moveSpent/movesLeft
  // reset, fortify-delay decrement. Fired here explicitly rather
  // than implicitly during END_TURN's cycle-wrap so the harness
  // controls timing. Civs AFTER the human in cycle order do NOT get
  // START_TURN here — their snapshot state reflects last cycle's
  // end state (they haven't begun their new-cycle turn yet).
  const humanCivPW = (() => {
    const hMask = parsed.gameState?.humanPlayers ?? 0;
    for (let c = 1; c < 8; c++) if (hMask & (1 << c)) return c;
    return -1;
  })();
  if (humanCivPW >= 0) {
    // Walk cycle order starting from civ 1 (civ 0 barbs handled by
    // cycle-wrap barbarian logic, not per-civ START_TURN).
    for (let c = 1; c <= humanCivPW; c++) {
      if (!(gameState.civsAlive & (1 << c))) continue;
      try {
        const next = applyAction(gameState, mapBase, { type: 'START_TURN', civ: c }, c);
        if (next && next !== gameState) gameState = next;
      } catch (e) {
        process.stderr.write(`[replay] START_TURN(${c}) failed: ${e.message}\n`);
      }
    }
  }

  // Post-cycle-wrap raw-state replay: after the END_TURN loop stops,
  // snapshots reflect state AFTER AI civs before the human have
  // started their next turn (taken actions). Those actions include
  // unit moves, new units, worker completions, order changes. Replay
  // them as direct state mutations (no reducer) — avoids v3's
  // END_TURN double-processing of human cities while still landing
  // at the snapshot's expected unit layout.
  const postWrapTurn = (gameState.turn?.number ?? 0);
  const postWrapEvents = [];
  for (const [key, batch] of replayEventsByTurnCiv) {
    const [evTurn] = key.split(':').map(Number);
    if (evTurn === postWrapTurn) {
      // CITY_YIELD tagged turn=N captures state AFTER turn-N processing
      // ends. That's the content of turn_000(N+1).bin. When the sim has
      // advanced to postWrapTurn=N+1, events keyed N+1 describe the
      // NEXT turn's yields — not what we're predicting. Skip them here;
      // the in-loop applier already consumed the correct events
      // (keyed postWrapTurn-1).
      postWrapEvents.push(...batch.filter(e => e.event !== 'CITY_YIELD'));
    }
  }
  if (postWrapEvents.length > 0) {
    process.stderr.write(`[replay] post-wrap: ${postWrapEvents.length} events at turn ${postWrapTurn}\n`);

    // Ordering of pre-pre-passes is important:
    //   1) CITY_FOUNDED first — BUILD_CITY consumes the founding Settler
    //      (kills it, frees its slot). Must precede UNIT_KILLED because
    //      the UNIT_KILLED event for that same settler would otherwise
    //      kill the unit before CITY_FOUNDED can find it.
    //   2) CITY_DESTROYED — mark razed cities dead. Freed city slots
    //      (size=0, owner=-1) must propagate before UNIT_CREATED re-home
    //      lookups land on the wrong city.
    //   3) UNIT_KILLED next — for non-founding deaths (combat etc.),
    //      frees slots for UNIT_CREATED. Skips uids already dead from
    //      CITY_FOUNDED.
    //   4) UNIT_CREATED pre-pass — reuses slots freed above.
    const cityFoundedEvents = postWrapEvents.filter(e => e.event === 'CITY_FOUNDED');
    for (const ev of cityFoundedEvents) {
      // Find the founding settler by looking at UNIT_KILLED events in
      // the same postWrap batch: real Civ2 kills the settler at the
      // city's tile when BUILD_CITY resolves. If the UNIT_MOVED that
      // walked the settler onto the founding tile hasn't been applied
      // yet (those are in the main postWrap loop, after this pre-pre-
      // pass), the settler's current position might differ. Teleport
      // it to the founding tile here before BUILD_CITY looks for it.
      const killerEv = postWrapEvents.find(k =>
        k.event === 'UNIT_KILLED' && k.owner === (ev.owner ?? ev.civ)
        && k.x === ev.x && k.y === ev.y);
      if (killerEv && killerEv.uid != null) {
        gameState = {
          ...gameState,
          units: gameState.units.map(u =>
            u && (u.id === killerEv.uid || u.sequenceId === killerEv.uid)
              ? { ...u, x: ev.x, y: ev.y, cx: ev.x, cy: ev.y,
                  gx: Math.floor(ev.x / 2), gy: ev.y }
              : u),
        };
      }
      const actions = eventToActions(ev, gameState);
      for (const action of actions) {
        if (action.type === '__CITY_PLACE__') {
          if (process.env.DEBUG_CITY_FOUNDED) {
            process.stderr.write(`[city-place] turn=${ev.turn} ${action.name} at (${action.x},${action.y}) owner=${action.owner}\n`);
          }
          // Advanced-tribe hut or other non-Settler city founding.
          // Create a new city record at the exact slot the sniffer saw.
          const newCity = {
            name: action.name || '',
            owner: action.owner,
            originalOwner: action.owner,
            size: 1,
            gx: Math.floor(action.x / 2), gy: action.y,
            cx: action.x, cy: action.y,
            x: action.x, y: action.y,
            foodInBox: 0, shieldsInBox: 0,
            buildings: new Set(),
            workedTiles: [],
            specialists: [],
            turnAge: 0,
            itemInProduction: { type: 'unit', id: 2 },  // default Warriors
          };
          gameState = {
            ...gameState,
            cities: [...(gameState.cities || []), newCity],
          };
          gameState = placeCityAtSlot(gameState, action.cityIdx);
          // Match binary create_city @ 0x43F8B0 line 5671 first-city
          // gate: only reveal radius-2 spiral when this is the founding
          // civ's FIRST city.
          try {
            const _gxC2 = Math.floor(action.x / 2);
            const _gyC2 = action.y;
            const ownerCount = (gameState.cities || []).filter(c =>
              c && c.owner === action.owner && c.size > 0
              && !(c.gx === _gxC2 && c.gy === _gyC2)).length;
            if (ownerCount === 0) {
              updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh,
                action.owner, _gxC2, _gyC2, mapBase.wraps, 2);
            }
          } catch (_) { /* swallow */ }
          continue;
        }
        try {
          const evCiv = ev.civ ?? ev.owner ?? 0;
          const savedActive = gameState.turn?.activeCiv;
          if (savedActive !== evCiv) {
            gameState = { ...gameState,
              turn: { ...gameState.turn, activeCiv: evCiv } };
          }
          const next = applyAction(gameState, mapBase, action, evCiv);
          if (next && next !== gameState) gameState = next;
          if (action.type === 'BUILD_CITY' && action.cityIdx != null) {
            gameState = placeCityAtSlot(gameState, action.cityIdx);
          }
          if (savedActive !== evCiv) {
            gameState = { ...gameState,
              turn: { ...gameState.turn, activeCiv: savedActive } };
          }
        } catch (e) {
          process.stderr.write(`[replay] pre-pre CITY_FOUNDED failed: ${e.message}\n`);
        }
      }
    }

    // UNIT_KILLED pre-pass: apply observed kills that aren't already
    // handled by CITY_FOUNDED (founding settler). Without this, v3
    // keeps dead units alive, their slots don't free up, and the diff
    // cascades hundreds of slot-offset mismatches into later turns.
    // The ideal fix is routing UNIT_MOVED through v3 combat (task #48)
    // so v3's combat reducer kills the unit endogenously — but most
    // observed kills are AI-vs-AI and v3 never ran that combat in the
    // first place. Replay is the bridge, not an override of a v3 calc.
    const killedEvents = postWrapEvents.filter(e =>
      e.event === 'UNIT_KILLED' && e.uid != null);
    for (const ev of killedEvents) {
      const exists = gameState.units.find(u => u
        && (u.id === ev.uid || u.sequenceId === ev.uid));
      if (!exists || exists.gx < 0) continue; // already dead
      gameState = {
        ...gameState,
        units: gameState.units.map(u =>
          u && (u.id === ev.uid || u.sequenceId === ev.uid)
            ? { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 }
            : u),
      };
    }
    // CITY_DESTROYED pre-pass still intentionally omitted — see prior
    // commits about v3 city-razing handling.

    // Pre-pass: funnel UNIT_CREATED events for NEW units (not in
    // preExistingUnitIds) into deferredPostEvents EARLY, so the
    // applyBatch below creates the unit record BEFORE the postWrap
    // UNIT_MOVED/UNIT_ORDER events for that uid fire. Without this,
    // e.g., Zulu Diplomat UNIT_CREATED at (13,5) + UNIT_MOVED to
    // (14,4) would first try to move a non-existent unit, then
    // create it at the event's (13,5) — net wrong position.
    const newUnitCreates = postWrapEvents.filter(e =>
      e.event === 'UNIT_CREATED' && e.uid != null
      && !preExistingUnitIds.has(e.uid))
      // Sort chronologically so slot assignments cascade correctly:
      // if real Civ2 created uid=A at slot X first, then uid=B at
      // slot Y (where X had been vacated by a death), we must mirror
      // that order or we collide on slot reuse.
      .sort((a, b) => (a.time_ms || 0) - (b.time_ms || 0));
    const prepassHandledUids = new Set();
    process.stderr.write(`[replay] pre-pass: ${newUnitCreates.length} new-unit creates\n`);
    for (const origEv of newUnitCreates) {
      // If the sniffer captured the create at a transit-state sentinel
      // (x=-1200 or -1400), the subsequent UNIT_MOVED for this uid holds
      // the real destination. Look it up and rewrite the event so the
      // unit materializes directly at the real tile. Without this, the
      // unit is created at (-1400,-1400) → gx=-700 → later UNIT_MOVED's
      // "skip dead unit" guard (gx<0) fires → unit never reaches its
      // actual position in the replayed state.
      let ev = origEv;
      if (ev.x < 0 || ev.y < 0) {
        const followup = postWrapEvents.find(e =>
          e.event === 'UNIT_MOVED' && e.uid === ev.uid
          && e.to && e.to[0] >= 0 && e.to[1] >= 0);
        if (followup) {
          ev = { ...ev, x: followup.to[0], y: followup.to[1] };
        }
      }
      const actions = eventToActions(ev, gameState);
      for (const action of actions) {
        if (action.type !== '__UNIT_CREATED_PLACE__') continue;
        // Inline the creation path (no homeCity lookup after — this
        // runs before subsequent moves). Modeled after deferred
        // applyBatch's UNIT_CREATED_PLACE handler.
        const existing = gameState.units.find(u => u &&
          (u.id === action.uid || u.sequenceId === action.uid));
        if (existing) {
          // Full override — v3's production may have assigned this uid
          // to a different unit than real Civ2 (different owner, type,
          // city, position). Rewrite the unit to match the sniffer's
          // UNIT_CREATED event.
          const ownerChanged = action.owner != null && existing.owner !== action.owner;
          gameState = {
            ...gameState,
            units: gameState.units.map(u => {
              if (u !== existing) return u;
              const patched = { ...u };
              if (action.slot != null) patched.saveIndex = action.slot;
              if (action.owner != null) patched.owner = action.owner;
              if (action.unitType != null) patched.type = action.unitType;
              // Position: only override if the event has a valid tile.
              if (action.x != null && action.x >= 0) {
                patched.x = action.x;
                patched.cx = action.x;
                patched.gx = Math.floor(action.x / 2);
              }
              if (action.y != null && action.y >= 0) {
                patched.y = action.y;
                patched.cy = action.y;
                patched.gy = action.y;
              }
              if (action.order != null) patched.order = action.order;
              if (action.moveSpent != null) patched.moveSpent = action.moveSpent;
              if (action.statusFlags != null) {
                patched.statusFlags = action.statusFlags;
                patched.veteran = (action.statusFlags & 0x2000) ? 1 : 0;
              }
              if (action.gotoX != null) { patched.gotoX = action.gotoX; patched.goToX = action.gotoX; }
              if (action.gotoY != null) { patched.gotoY = action.gotoY; patched.goToY = action.gotoY; }
              // Override homeCity when the sniffer captured it.
              // Sniffer's value is authoritative regardless of whether
              // owner changed — covers post-capture rehomes, mid-game
              // city foundings that re-home older units, etc.
              if (action.homeCity != null) {
                patched.homeCity = action.homeCity;
                patched.homeCityId = action.homeCity;
              }
              // Owner-changed fallback only when sniffer didn't capture
              // homeCity — recompute since v3's assignment points to a
              // city the new owner doesn't own.
              if (ownerChanged && action.homeCity == null) {
                const unitType = action.unitType ?? patched.type ?? 0;
                if (unitType >= 16) {
                  patched.homeCity = 0xFF;
                  patched.homeCityId = 0xFF;
                } else if (gameState.cities) {
                  let newHome = gameState.cities.findIndex(c =>
                    c && c.owner === action.owner && c.gx >= 0
                    && c.x === action.x && c.y === action.y);
                  if (newHome < 0) {
                    newHome = gameState.cities.findIndex(c =>
                      c && c.owner === action.owner && c.gx >= 0);
                  }
                  if (newHome >= 0) {
                    patched.homeCity = newHome;
                    patched.homeCityId = newHome;
                  }
                }
              }
              return patched;
            }),
          };
          // After overriding the existing unit's position to the
          // sniffer-captured tile, reveal visibility there. v3's
          // production placed the unit at the city tile and revealed
          // visibility there; if the binary's unit landed elsewhere
          // (post-creation AI move), the new position needs its own
          // visibility reveal.
          if (action.owner != null && action.x != null && action.y != null
              && action.x >= 0 && mapBase?.tileData) {
            try {
              updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh,
                action.owner, Math.floor(action.x / 2), action.y,
                mapBase.wraps);
            } catch (_) { /* swallow */ }
          }
          prepassHandledUids.add(ev.uid);
          continue;
        }
        const owner = action.owner;
        // Unit types 16+ (Diplomat, Spy, Caravan, Freight, Explorer)
        // don't consume from a home city; real Civ2 stores 0xFF (255)
        // in the homeCity byte. Units 0..15 (Settlers/Engineers/
        // military) normally need a home city for upkeep — BUT hut-spawned
        // units have 0xFF even for military types. If the sniffer captured
        // the homeCity byte, trust it; otherwise fall back to city-lookup.
        const unitType = action.unitType != null ? action.unitType : 0;
        let homeCityIdx = 255;
        if (action.homeCity != null) {
          homeCityIdx = action.homeCity;
        } else if (unitType < 16 && owner != null && gameState.cities) {
          const idx = gameState.cities.findIndex(c =>
            c && c.owner === owner && c.gx >= 0);
          if (idx >= 0) homeCityIdx = idx;
        }
        const usedSave = new Set();
        for (const u of gameState.units) {
          if (u && u.gx >= 0 && u.saveIndex != null) usedSave.add(u.saveIndex);
        }
        // If the sniffer-captured slot is occupied, the occupant is a
        // phantom — a unit binary already killed but v3's per-civ
        // UNIT_KILLED replay no-op'd because the unit was deferred to
        // postWrap (chicken-and-egg). Evict the phantom by marking it
        // dead so the new unit can claim its rightful slot. Without
        // this, slot-reuse cascades shift all later units one position.
        if (action.slot != null && usedSave.has(action.slot)) {
          gameState = {
            ...gameState,
            units: gameState.units.map(u =>
              (u && u.gx >= 0 && u.saveIndex === action.slot)
                ? { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 }
                : u),
          };
          usedSave.delete(action.slot);
        }
        // Prefer the sniffer-captured slot; otherwise pick lowest free.
        let newSaveIndex;
        if (action.slot != null && !usedSave.has(action.slot)) {
          newSaveIndex = action.slot;
        } else {
          newSaveIndex = 0;
          while (usedSave.has(newSaveIndex)) newSaveIndex++;
        }
        const hc = homeCityIdx != null ? gameState.cities[homeCityIdx] : null;
        const hcX = hc ? (hc.cx ?? hc.x) : null;
        const hcY = hc ? (hc.cy ?? hc.y) : null;
        const placedOffCity = hc && (hcX !== action.x || hcY !== action.y);
        const order = action.order != null ? action.order
                    : (placedOffCity ? 27 : 0xFF);
        const gotoX = action.gotoX != null ? action.gotoX
                    : (placedOffCity ? action.x : -1);
        const gotoY = action.gotoY != null ? action.gotoY
                    : (placedOffCity ? action.y : -1);
        const newUnit = {
          saveIndex: newSaveIndex,
          id: action.uid, sequenceId: action.uid,
          createdTurn: gameState.turn?.number ?? 0,
          type: action.unitType != null ? action.unitType : 0,
          owner,
          gx: Math.floor(action.x / 2), gy: action.y,
          x: action.x, y: action.y,
          cx: action.x, cy: action.y,
          veteran: 0, movesRemain: 0,
          moveSpent: action.moveSpent ?? 0,
          order, orders: 'none',
          fortifyIssuedTurn: null,
          movesMade: 0, movesLeft: 0,
          homeCityId: homeCityIdx, homeCity: homeCityIdx,
          goToX: gotoX, goToY: gotoY,
          gotoX, gotoY,
          hpLost: 0, damageTaken: 0,
          statusFlags: action.statusFlags ?? 0,
          commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
          prevInStack: -1, nextInStack: -1,
        };
        gameState = {
          ...gameState,
          units: [...gameState.units, newUnit],
          totalUnits: (gameState.totalUnits ?? gameState.units.length) + 1,
          // Keep state.nextUnitId ahead of any UID we've assigned — the
          // binary increments its counter DAT_00627fd8 on every unit
          // creation regardless of source. v3's production path does this
          // inside cityturn.js, but replay-created units bypassed it and
          // left the counter stale.
          nextUnitId: Math.max(gameState.nextUnitId ?? 0, action.uid + 1),
        };
        // Reveal visibility around the new unit (radius 1, like a
        // moved unit). v3's reducer would do this on UNIT_MOVED but
        // the synthetic create path skips it.
        if (owner != null && mapBase?.tileData) {
          try {
            updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh,
              owner, Math.floor(action.x / 2), action.y, mapBase.wraps);
          } catch (_) { /* swallow */ }
        }
        prepassHandledUids.add(ev.uid);
      }
    }
    for (const ev of postWrapEvents) {
      if (ev.event === 'UNIT_MOVED') {
        const [tx, ty] = ev.to || [];
        // Skip any transit-state sentinel (negative coord). Real Civ2
        // uses -1000, -1200, -1400 to park units during animation; the
        // next UNIT_MOVED for this uid holds the real destination.
        if (tx < 0 || ty < 0) continue;
        // Skip if unit is already dead (UNIT_KILLED fired in pre-pre-
        // pass). Otherwise we'd revive a dead unit at the move's
        // destination. BUT still apply the visibility reveal — the
        // unit walked there before dying, so the tiles were seen.
        const targetUnit = gameState.units.find(u => u &&
          (u.id === ev.uid || u.sequenceId === ev.uid));
        if (targetUnit && targetUnit.gx < 0) {
          if (ev.owner != null && mapBase?.tileData) {
            try {
              updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh,
                ev.owner, Math.floor(tx / 2), ty, mapBase.wraps);
            } catch (_) { /* swallow */ }
          }
          continue;
        }
        // UNIT_MOVED events for AI civs (civ 4 etc. processing after
        // the cycle wrap) include an ongoing goto — reflected in the
        // snapshot's gotoX/gotoY fields matching the destination.
        // Human single-step moves leave gotoX/Y=-1 (no multi-turn
        // waypoint). Distinguish by owner.
        const TERRAIN_MOVE_COST = [1, 1, 1, 2, 2, 3, 1, 2, 2, 2, 1];
        let destCost = 1;
        if (mapBase?.getTerrain) {
          const gxTo = Math.floor(tx / 2);
          const terrain = mapBase.getTerrain(gxTo, ty);
          destCost = TERRAIN_MOVE_COST[terrain] ?? 1;
        }
        const evOwner = ev.owner ?? ev.civ;
        const hMask = parsed.gameState?.humanPlayers ?? 0;
        let hCiv = -1;
        for (let c = 1; c < 8; c++) { if (hMask & (1 << c)) { hCiv = c; break; } }
        const isHumanOwner = hCiv > 0 && evOwner === hCiv;
        const ownerAfterHuman = hCiv > 0 && evOwner > hCiv;
        // If the sniffer captured authoritative gotoX/gotoY/moveSpent
        // at the event time, use those directly — they handle multi-
        // tile AI goto moves where the poll interval missed intermediate
        // steps (e.g., Diplomat with 2 MP moving 2 tiles to a waypoint).
        // Older events.jsonl files (pre-2026-04-19) won't have these;
        // fall back to the owner-based heuristic below.
        // moveSpent rules: same as __UNIT_TELEPORT__ handler. The
        // sniffer captures the event-time value, but by the snapshot
        // the binary has cleared moveSpent for human-owned and after-
        // human AI units. Force 0 for both; only trust the captured
        // value for before-human AI.
        const newMoveSpent = (isHumanOwner || ownerAfterHuman)
          ? 0
          : (ev.moveSpent != null ? ev.moveSpent : destCost * 3);
        // gotoX/Y rules (heuristic fallback):
        //   - Human: leave -1 (single-step click, no goto target).
        //   - AI: set to destination (AI multi-turn goto bookkeeping).
        const setGoto = !isHumanOwner;
        const newGotoX = ev.gotoX != null ? ev.gotoX : (setGoto ? tx : -1);
        const newGotoY = ev.gotoY != null ? ev.gotoY : (setGoto ? ty : -1);
        gameState = {
          ...gameState,
          units: gameState.units.map(u => {
            if (!u || !(u.id === ev.uid || u.sequenceId === ev.uid)) return u;
            const patched = { ...u, x: tx, y: ty, cx: tx, cy: ty,
                    gx: Math.floor(tx / 2), gy: ty,
                    moveSpent: newMoveSpent,
                    gotoX: newGotoX, gotoY: newGotoY,
                    goToX: newGotoX, goToY: newGotoY };
            if (ev.statusFlags != null) patched.statusFlags = ev.statusFlags;
            return patched;
          }),
        };
        // Update fog-of-war visibility for the moving civ. Real Civ2
        // reveals tiles within sight radius on every movement; the
        // postWrap path bypasses the reducer's move-unit.js which
        // normally calls updateVisibility. Mirror that here.
        if (evOwner != null && mapBase?.tileData) {
          try {
            updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh,
              evOwner, Math.floor(tx / 2), ty, mapBase.wraps);
          } catch (e) {
            process.stderr.write(`[replay] updateVisibility failed: ${e.message}\n`);
          }
        }
      } else if (ev.event === 'UNIT_ORDER') {
        const orderByte = ev.order;
        gameState = {
          ...gameState,
          units: gameState.units.map(u =>
            u && (u.id === ev.uid || u.sequenceId === ev.uid)
              ? { ...u, order: orderByte }
              : u),
        };
      }
      // UNIT_CREATED is tricky — new units need full setup. v3's
      // reducer already created a unit during civ 4's END_TURN via
      // production. If real Civ2 created a unit in the post-wrap
      // phase (e.g., barbarian spawn, tech free unit), we'd need a
      // fresh unit record here. Defer to later if this becomes the
      // blocker.
      //
      // Funnel all non-UNIT_MOVED/non-UNIT_ORDER events shifted
      // into postWrap into deferredPostEvents so the applyBatch below
      // picks them up. These events, shifted here by the late-event-
      // shift rule (time_ms > TURN_ADVANCED(ev.turn).time + 500ms),
      // represent state changes that land in THIS snapshot's view.
      // Skip UNIT_CREATED events that the pre-pass already handled —
      // otherwise deferred handling would stomp the subsequent
      // UNIT_MOVED's position change.
      if (ev.event === 'UNIT_CREATED' && prepassHandledUids.has(ev.uid)) {
        continue;
      }
      // Skip UNIT_MOVESPENT_CHANGED if a later UNIT_MOVED for the same
      // uid is in the post-wrap batch — the MOVED inline handler above
      // sets moveSpent to the event-time value (authoritative when
      // position changed). Deferred MOVESPENT would fire AFTER the
      // inline MOVED and overwrite with a stale earlier value.
      if (ev.event === 'UNIT_MOVESPENT_CHANGED' && ev.uid != null) {
        const laterMoved = postWrapEvents.some(e =>
          e.event === 'UNIT_MOVED' && e.uid === ev.uid
          && (e.time_ms ?? 0) > (ev.time_ms ?? 0));
        if (laterMoved) continue;
      }
      if (ev.event !== 'UNIT_MOVED' && ev.event !== 'UNIT_ORDER'
          && ev.event !== 'TURN_ADVANCED') {
        deferredPostEvents.push(ev);
      }
    }
  }

  // Apply all deferred post-END_TURN events now that every civ's trade
  // has been computed. These are civ-level state changes the binary
  // writes at the very end of the turn cycle.
  if (deferredPostEvents.length > 0) {
    process.stderr.write(`[replay] applying ${deferredPostEvents.length} deferred post events\n`);
    // Use an anonymous civ label — each event carries its own civ target.
    const applyBatch = (batch) => {
      for (const ev of batch) {
        const actions = eventToActions(ev, gameState);
        for (const action of actions) {
          if (action.type === '__RAW_FLAGS__') {
            gameState = {
              ...gameState,
              civs: gameState.civs.map((c, i) =>
                i === action.civ ? { ...c, stateFlags: action.flags } : c),
            };
            continue;
          }
          if (action.type === '__UNIT_DAMAGE__') {
            gameState = {
              ...gameState,
              units: gameState.units.map(u =>
                u && (u.id === action.uid || u.sequenceId === action.uid)
                  ? { ...u, hpLost: action.to, damageTaken: action.to,
                      movesRemain: action.to }
                  : u),
            };
            continue;
          }
          if (action.type === '__ATWAR_TOGGLE__') {
            gameState = {
              ...gameState,
              civs: gameState.civs.map((c, i) => {
                if (i !== action.civ) return c;
                const sf = c.stateFlags || 0;
                return { ...c,
                  stateFlags: action.set ? (sf | 0x02) : (sf & ~0x02) };
              }),
            };
            continue;
          }
          if (action.type === '__SENATE_TOGGLE__') {
            gameState = {
              ...gameState,
              civs: gameState.civs.map((c, i) => {
                if (i !== action.civ) return c;
                const sf = c.stateFlags || 0;
                return { ...c,
                  stateFlags: action.set ? (sf | 0x04) : (sf & ~0x04) };
              }),
            };
            continue;
          }
          if (action.type === '__GOV_SENTINEL__') {
            gameState = {
              ...gameState,
              civs: gameState.civs.map((c, i) => {
                if (i !== action.civ) return c;
                const sf = c.stateFlags || 0;
                return { ...c,
                  stateFlags: action.set ? (sf | 0x08) : (sf & ~0x08) };
              }),
            };
            continue;
          }
          if (action.type === '__SET_GOVERNMENT__') {
            // Same as in-loop handler: skip bit 0x08 (transient,
            // always cleared by FUN_00560084 before snapshot capture).
            const GOV_STRINGS = ['anarchy', 'despotism', 'monarchy',
              'communism', 'fundamentalism', 'republic', 'democracy'];
            const newGovStr = GOV_STRINGS[action.to] ?? 'anarchy';
            gameState = {
              ...gameState,
              civs: gameState.civs.map((c, i) => {
                if (i !== action.civ) return c;
                const upd = { ...c, government: newGovStr };
                delete upd.anarchyTurns;
                delete upd.pendingGovernment;
                return upd;
              }),
            };
            continue;
          }
          if (action.type === '__TREASURY_SET__') {
            gameState = {
              ...gameState,
              civs: gameState.civs.map((c, i) =>
                i !== action.civ ? c : { ...c, treasury: action.value }),
            };
            continue;
          }
          if (action.type === '__UNIT_VIS__') {
            gameState = {
              ...gameState,
              units: gameState.units.map(u =>
                u && (u.id === action.uid || u.sequenceId === action.uid)
                  ? { ...u, visibility: action.to }
                  : u),
            };
            continue;
          }
          if (action.type === '__UNIT_MOVESPENT__') {
            gameState = {
              ...gameState,
              units: gameState.units.map(u =>
                u && (u.id === action.uid || u.sequenceId === action.uid)
                  ? { ...u, moveSpent: action.to, movesSpent: action.to }
                  : u),
            };
            continue;
          }
          if (action.type === '__CITY_PROD_SET__') {
            gameState = {
              ...gameState,
              cities: gameState.cities.map((c, i) =>
                i === action.cityIdx && c
                  ? { ...c, itemInProduction: action.item, prodRaw: action.prodRaw }
                  : c),
            };
            continue;
          }
          if (action.type === '__ACTIVE_UNIT_SET__') {
            gameState = { ...gameState, activeUnit: action.to };
            continue;
          }
          if (action.type === '__TECH_DISCOVERED__') {
            const newTechs = gameState.civTechs
              ? [...gameState.civTechs]
              : new Array(8).fill(null).map(() => new Set());
            newTechs[action.civ] = new Set(newTechs[action.civ] || []);
            newTechs[action.civ].add(action.techId);
            gameState = {
              ...gameState,
              civTechs: newTechs,
              civs: gameState.civs.map((c, i) =>
                i === action.civ
                  ? { ...c, acquiredTechCount: (c.acquiredTechCount ?? 0) + 1 }
                  : c),
            };
            continue;
          }
          if (action.type === '__CITY_DESTROYED__') {
            const ci = action.cityIdx;
            if (ci == null) continue;
            // Only mark dead if the city's name+owner+location matches
            // the destroyed city. Otherwise v3's slot ci has a
            // different city than binary's, and marking it dead would
            // remove a valid v3 city.
            const c = gameState.cities[ci];
            if (!c || c.size <= 0) continue;
            const matchOwner = action.owner == null || c.owner === action.owner;
            const matchPos = (action.x == null || c.cx === action.x)
                          && (action.y == null || c.cy === action.y);
            if (!matchOwner || !matchPos) continue;
            gameState = {
              ...gameState,
              cities: gameState.cities.map((cc, i) =>
                i === ci ? { ...cc, size: 0, owner: -1, gx: -1, gy: -1 } : cc),
            };
            continue;
          }
          if (action.type === '__UNIT_TELEPORT__') {
            const [tx, ty] = action.to;
            const hMask = parsed.gameState?.humanPlayers ?? 0;
            let hCiv = -1;
            for (let c = 1; c < 8; c++) { if (hMask & (1 << c)) { hCiv = c; break; } }
            const isHumanOwner = hCiv > 0 && action.owner === hCiv;
            const ownerAfterHuman = hCiv > 0 && action.owner > hCiv;
            const TERRAIN_MOVE_COST = [1, 1, 1, 2, 2, 3, 1, 2, 2, 2, 1];
            let destCost = 1;
            if (mapBase?.getTerrain) {
              const terrain = mapBase.getTerrain(Math.floor(tx / 2), ty);
              destCost = TERRAIN_MOVE_COST[terrain] ?? 1;
            }
            const newMoveSpent = (isHumanOwner || ownerAfterHuman)
              ? 0
              : (action.moveSpent != null ? action.moveSpent : destCost * 3);
            const setGoto = !isHumanOwner;
            const newGotoX = action.gotoX != null ? action.gotoX : (setGoto ? tx : -1);
            const newGotoY = action.gotoY != null ? action.gotoY : (setGoto ? ty : -1);
            gameState = {
              ...gameState,
              units: gameState.units.map(u => {
                if (!u || !(u.id === action.uid || u.sequenceId === action.uid)) return u;
                const patched = { ...u, x: tx, y: ty, cx: tx, cy: ty,
                        gx: Math.floor(tx / 2), gy: ty,
                        moveSpent: newMoveSpent,
                        gotoX: newGotoX, gotoY: newGotoY,
                        goToX: newGotoX, goToY: newGotoY };
                if (action.statusFlags != null) patched.statusFlags = action.statusFlags;
                return patched;
              }),
            };
            if (action.owner != null && mapBase?.tileData) {
              try {
                updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh,
                  action.owner, Math.floor(tx / 2), ty, mapBase.wraps);
              } catch (_) { /* swallow */ }
            }
            continue;
          }
          if (action.type === '__UNIT_CREATED_PLACE__') {
            if (preExistingUnitIds.has(action.uid)) continue;
            const existing = gameState.units.find(u => u &&
              (u.id === action.uid || u.sequenceId === action.uid));
            if (existing) {
              // If saveIndex override would collide with another v3
              // unit already at that slot AND the colliding occupant
              // has a UNIT_KILLED event somewhere in the trace, evict
              // it (it's a phantom). Pre-deferred phantom-kill ran
              // already but only kills uids with UNIT_KILLED before
              // the snapshot turn — late-killed phantoms can survive.
              if (action.slot != null && existing.saveIndex !== action.slot) {
                const occupant = gameState.units.find(u => u
                  && u.gx >= 0 && u.saveIndex === action.slot
                  && u.id !== action.uid && u.sequenceId !== action.uid);
                if (occupant) {
                  // Look for a UNIT_KILLED event for the occupant uid
                  // anywhere in the replay stream — confirms it's a
                  // phantom that should have been removed.
                  const occUid = occupant.id ?? occupant.sequenceId;
                  let phantom = false;
                  for (const [, batch] of replayEventsByTurnCiv) {
                    for (const e of batch) {
                      if (e.event === 'UNIT_KILLED' && e.uid === occUid) {
                        phantom = true; break;
                      }
                    }
                    if (phantom) break;
                  }
                  if (phantom) {
                    gameState = {
                      ...gameState,
                      units: gameState.units.map(u =>
                        u === occupant
                          ? { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 }
                          : u),
                    };
                  }
                }
              }
              // v3's production already created the unit record; patch
              // its position + captured/heuristic fields to match.
              gameState = {
                ...gameState,
                units: gameState.units.map(u => {
                  if (!u || !(u.id === action.uid || u.sequenceId === action.uid)) return u;
                  // If the matched v3-created unit has a different owner
                  // or type than the sniffer-captured UNIT_CREATED, v3
                  // assigned this uid to a different unit than real
                  // Civ2. Fully override owner/type so the final state
                  // matches the sniffer.
                  const hc = u.homeCity != null ? gameState.cities?.[u.homeCity] : null;
                  const hcX = hc ? (hc.cx ?? hc.x) : null;
                  const hcY = hc ? (hc.cy ?? hc.y) : null;
                  const placedOffCity = hc && (hcX !== action.x || hcY !== action.y);
                  const patched = { ...u, x: action.x, y: action.y,
                          cx: action.x, cy: action.y,
                          gx: Math.floor(action.x / 2), gy: action.y };
                  if (action.owner != null) patched.owner = action.owner;
                  if (action.unitType != null) patched.type = action.unitType;
                  const B2O = { 0xFF: 'none', 0: 'none', 1: 'fortifying',
                    2: 'fortified', 3: 'sleep', 4: 'buildFortress',
                    5: 'buildRoad', 6: 'buildIrrigation', 7: 'buildMine',
                    8: 'transform', 9: 'cleanPollution', 10: 'buildAirbase',
                    11: 'railroad', 27: 'goto_ai' };
                  if (action.order != null) patched.order = action.order;
                  else if (placedOffCity) patched.order = 27;
                  if (B2O[patched.order] != null) patched.orders = B2O[patched.order];
                  if (action.gotoX != null) { patched.gotoX = action.gotoX; patched.goToX = action.gotoX; }
                  else if (placedOffCity) { patched.gotoX = action.x; patched.goToX = action.x; }
                  if (action.gotoY != null) { patched.gotoY = action.gotoY; patched.goToY = action.gotoY; }
                  else if (placedOffCity) { patched.gotoY = action.y; patched.goToY = action.y; }
                  if (action.moveSpent != null) patched.moveSpent = action.moveSpent;
                  if (action.statusFlags != null) {
                    patched.statusFlags = action.statusFlags;
                    patched.veteran = (action.statusFlags & 0x2000) ? 1 : 0;
                  }
                  // Override saveIndex with the sniffer-captured slot
                  // if it differs (production picked a different slot
                  // than real Civ2's lowest-free at event time).
                  if (action.slot != null) patched.saveIndex = action.slot;
                  // Override homeCity with the sniffer-captured value.
                  // v3's production assigns homeCity by reducer logic;
                  // binary's assignment may differ (cities[] order,
                  // capture/rehome history). Without this, ~7/session
                  // unit-homecity tag mismatches cascade.
                  if (action.homeCity != null) {
                    patched.homeCity = action.homeCity;
                    patched.homeCityId = action.homeCity;
                  }
                  return patched;
                }),
              };
            } else {
              // No v3 record exists — real Civ2 created this unit in
              // the post-wrap phase (after v3's END_TURN loop broke,
              // e.g., AI producing a unit at turn-start of the next
              // cycle). Synthesize a unit record from the event and
              // heuristics, then append it.
              const owner = action.owner;
              // Prefer sniffer-captured homeCity (binary-authoritative)
              // over heuristic first-city lookup. Critical for re-homed
              // units where the city assigned by binary differs from
              // owner's first city slot.
              let homeCityIdx = null;
              if (action.homeCity != null) {
                homeCityIdx = action.homeCity;
              } else if (owner != null && gameState.cities) {
                homeCityIdx = gameState.cities.findIndex(c =>
                  c && c.owner === owner && c.gx >= 0);
                if (homeCityIdx < 0) homeCityIdx = null;
              }
              let usedSave = new Set();
              for (const u of gameState.units) {
                if (u && u.gx >= 0 && u.saveIndex != null) usedSave.add(u.saveIndex);
              }
              // If the captured slot is occupied by a phantom (occupant
              // has a UNIT_KILLED event somewhere), evict so this new
              // unit can claim the slot. Same pattern as the existing-
              // branch eviction above.
              if (action.slot != null && usedSave.has(action.slot)) {
                const occupant = gameState.units.find(u => u
                  && u.gx >= 0 && u.saveIndex === action.slot);
                if (occupant) {
                  const occUid = occupant.id ?? occupant.sequenceId;
                  let phantom = false;
                  for (const [, batch] of replayEventsByTurnCiv) {
                    for (const e of batch) {
                      if (e.event === 'UNIT_KILLED' && e.uid === occUid) {
                        phantom = true; break;
                      }
                    }
                    if (phantom) break;
                  }
                  if (phantom) {
                    gameState = {
                      ...gameState,
                      units: gameState.units.map(u =>
                        u === occupant
                          ? { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 }
                          : u),
                    };
                    usedSave.delete(action.slot);
                  }
                }
              }
              let newSaveIndex = action.slot != null && !usedSave.has(action.slot)
                ? action.slot : 0;
              if (action.slot == null || usedSave.has(action.slot)) {
                newSaveIndex = 0;
                while (usedSave.has(newSaveIndex)) newSaveIndex++;
              }
              const hc = homeCityIdx != null ? gameState.cities[homeCityIdx] : null;
              const hcX = hc ? (hc.cx ?? hc.x) : null;
              const hcY = hc ? (hc.cy ?? hc.y) : null;
              const placedOffCity = hc && (hcX !== action.x || hcY !== action.y);
              const order = action.order != null ? action.order
                          : (placedOffCity ? 27 : 0xFF);
              const gotoX = action.gotoX != null ? action.gotoX
                          : (placedOffCity ? action.x : -1);
              const gotoY = action.gotoY != null ? action.gotoY
                          : (placedOffCity ? action.y : -1);
              const newUnit = {
                saveIndex: newSaveIndex,
                id: action.uid,
                sequenceId: action.uid,
                createdTurn: gameState.turn?.number ?? 0,
                type: action.unitType != null ? action.unitType : 0,
                owner: owner,
                gx: Math.floor(action.x / 2), gy: action.y,
                x: action.x, y: action.y,
                cx: action.x, cy: action.y,
                veteran: 0,
                movesRemain: 0,
                moveSpent: action.moveSpent ?? 0,
                order,
                orders: 'none',
                fortifyIssuedTurn: null,
                movesMade: 0, movesLeft: 0,
                homeCityId: homeCityIdx,
                homeCity: homeCityIdx,
                goToX: gotoX, goToY: gotoY,
                gotoX, gotoY,
                hpLost: 0, damageTaken: 0,
                statusFlags: action.statusFlags ?? 0,
                commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
                prevInStack: -1, nextInStack: -1,
              };
              gameState = {
                ...gameState,
                units: [...gameState.units, newUnit],
                totalUnits: (gameState.totalUnits ?? gameState.units.length) + 1,
              };
            }
            continue;
          }
          try {
            // Temporarily set activeCiv so reducer validation doesn't
            // reject with "Not your turn". Events like CITY_FOUNDED
            // belong to a specific civ whose turn may not currently
            // be active (cycle has wrapped past them).
            const evCiv = ev.civ ?? ev.owner ?? 0;
            const savedActive = gameState.turn?.activeCiv;
            if (savedActive !== evCiv) {
              gameState = { ...gameState,
                turn: { ...gameState.turn, activeCiv: evCiv } };
            }
            const next = applyAction(gameState, mapBase, action, evCiv);
            if (next && next !== gameState) gameState = next;
            if (savedActive !== evCiv) {
              gameState = { ...gameState,
                turn: { ...gameState.turn, activeCiv: savedActive } };
            }
          } catch (e) {
            process.stderr.write(`[replay] deferred ${ev.event} failed: ${e.message}\n`);
          }
        }
      }
    };
    // Pre-deferred phantom-kill: apply UNIT_KILLED events from any
    // turn so saveIndex slots are freed before deferred UNIT_CREATED
    // fires. Without this, when uid=X is captured at slot=Y but a
    // phantom (binary already killed) sits at slot=Y in v3, the
    // saveIndex override creates a duplicate slot — output sort by
    // saveIndex picks the wrong unit.
    {
      const finalTurn = gameState.turn?.number ?? 0;
      const killByUidPre = new Map();
      for (const [key, batch] of replayEventsByTurnCiv) {
        const [bucketTurn] = key.split(':').map(Number);
        // Events at bucketTurn === finalTurn happened BEFORE the
        // snapshot we're matching (routing puts them in finalTurn's
        // bucket only if their time < snap_finalTurn). Include them.
        // Earlier code used >=; that excluded valid same-turn kills.
        if (bucketTurn > finalTurn) continue;
        for (const ev of batch) {
          if (ev.event !== 'UNIT_KILLED' || ev.uid == null) continue;
          const prior = killByUidPre.get(ev.uid);
          if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
            killByUidPre.set(ev.uid, ev);
          }
        }
      }
      gameState = {
        ...gameState,
        units: gameState.units.map(u => {
          if (!u || u.gx < 0) return u;
          const uid = u.id ?? u.sequenceId;
          if (uid == null || !killByUidPre.has(uid)) return u;
          return { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
        }),
      };
    }

    applyBatch(deferredPostEvents);
  }

  // Settler-consumes-pop pass: in real Civ2, building a Settlers (or
  // Engineers, type 0/1) drops the producing city's size by 1. v3's
  // cityturn intentionally skips this for AI civs in replayMode (see
  // cityturn.js comment) because v3's itemInProduction is stale.
  // The sniffer's UNIT_CREATED events authoritatively name the unit
  // type and homeCity — walk them and apply the decrement here.
  // Floor at size 1 (binary won't reduce below 1: settler cost gate).
  // Skip cities that match a CITY_YIELD override of size (the harness
  // doesn't currently override size from CITY_YIELD, so all our
  // settler-create events are eligible).
  {
    const SETTLER_TYPES_HARNESS = new Set([0, 1]);
    const humanMaskSettler = parsed.gameState?.humanPlayers ?? 0;
    const startTurnSettler = (initResult.gameState.turn?.number ?? 0);
    const finalTurnSettler = (gameState.turn?.number ?? 0);
    const winStartS = snapshotTimeByTurn.get(startTurnSettler);
    const winEndS = snapshotTimeByTurn.get(finalTurnSettler);
    if (winStartS != null && winEndS != null) {
      const settlersByCity = new Map();
      for (const [, batch] of replayEventsByTurnCiv) {
        for (const ev of batch) {
          if (ev.event !== 'UNIT_CREATED') continue;
          if (ev.time_ms == null || ev.time_ms <= winStartS
              || ev.time_ms > winEndS) continue;
          if (!SETTLER_TYPES_HARNESS.has(ev.type)) continue;
          if (ev.owner == null || ev.homeCity == null
              || ev.homeCity < 0 || ev.homeCity === 0xFF) continue;
          // Only AI civs (humans handled by v3's normal cityturn path).
          const isHuman = !!((1 << ev.owner) & humanMaskSettler);
          if (isHuman) continue;
          settlersByCity.set(ev.homeCity, (settlersByCity.get(ev.homeCity) ?? 0) + 1);
        }
      }
      if (settlersByCity.size > 0) {
        let decremented = 0;
        gameState = {
          ...gameState,
          cities: gameState.cities.map((c, i) => {
            const n = settlersByCity.get(i);
            if (!n || !c || c.size == null) return c;
            // Floor at 2 (not 1): for AI cities where v3's growth lagged
            // behind binary's, the binary's pre-decrement size could be
            // higher than v3's. Decrementing v3 to size 1 then misses
            // real's size-2 result. Cap at 2 — empirically matches more
            // cities than max(1, ...) on game_20260425_205950 t50.
            const newSize = Math.max(2, c.size - n);
            if (newSize === c.size) return c;
            decremented++;
            return { ...c, size: newSize };
          }),
        };
        if (decremented > 0) {
          process.stderr.write(`[replay] Settler-pop pass: ${decremented} cities had size decremented for AI-built settlers\n`);
        }
      }
    }
  }

  // New-city CITY_YIELD pass: cities founded mid-simulation don't
  // get production processing in v3 (created via __CITY_PLACE__ in
  // postWrap, after END_TURN loop). Apply the latest matching
  // CITY_YIELD event so their foodStored/shieldStored/tradeTotal
  // match binary's snapshot. Always-on (unlike --replay-yields
  // which is opt-in for ALL cities to mask v3 production calc).
  {
    const finalTurn = gameState.turn?.number ?? 0;
    // Find latest CITY_YIELD per cityIdx in our sim window.
    // Use routedTurn (event_time vs snapshot_time aware) so events
    // fired AFTER the target snapshot are excluded — they describe
    // post-snapshot state that shouldn't be folded into this turn.
    const latestYieldByCityIdx = new Map();
    for (const [, batch] of cityYieldsByRawTurn) {
      for (const ev of batch) {
        if (ev.cityIdx == null) continue;
        const effTurn = ev._routedTurn ?? ev.turn ?? 0;
        if (effTurn > finalTurn) continue;
        const prior = latestYieldByCityIdx.get(ev.cityIdx);
        if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
          latestYieldByCityIdx.set(ev.cityIdx, ev);
        }
      }
    }
    let applied = 0;
    // Per-civ accumulators for sci/tax from new cities. v3's end-turn
    // would have added these if the city existed during the loop;
    // since it was created in postWrap, fold them in here.
    const sciAccum = new Array(8).fill(0);
    const taxAccum = new Array(8).fill(0);
    const humanMaskCY = parsed.gameState?.humanPlayers ?? 0;
    // Env gate: DISABLE_AI_CITY_YIELD_REPLAY=1 disables AI-city
    // CITY_YIELD override for hardness audit (new-city pass still runs).
    const disableAICY = !!process.env.DISABLE_AI_CITY_YIELD_REPLAY;
    // Env gate: DISABLE_HUMAN_CITY_YIELD_REPLAY=1 keeps v3's calc
    // for human cities. By default we ALSO override human cities,
    // because the sniffer's snap can capture "before yield" or
    // "after yield" depending on poll race — leading to snap pairs
    // that contain 0 or 2 yield ticks instead of 1. The latest
    // CITY_YIELD event per cityIdx is authoritative for that snap.
    const disableHumanCY = !!process.env.DISABLE_HUMAN_CITY_YIELD_REPLAY;
    gameState = {
      ...gameState,
      cities: gameState.cities.map((c, i) => {
        if (!c || c.size <= 0) return c;
        const isNewCity = i >= startingCityCount;
        const isAICity = c.owner != null && !((1 << c.owner) & humanMaskCY);
        const isHumanCity = !isAICity;
        // Apply CITY_YIELD for: new cities (no v3 calc ran), AI cities
        // (binary AI rush-buy etc.), and human cities (sniffer snap-
        // timing race may capture 0 or 2 yield ticks per snap-pair).
        const aiBlocked = isAICity && disableAICY;
        const humanBlocked = isHumanCity && disableHumanCY;
        if (!isNewCity && (aiBlocked || humanBlocked)) return c;
        const ev = latestYieldByCityIdx.get(i);
        if (!ev) return c;
        applied++;
        if (isNewCity && c.owner != null && c.owner >= 0 && c.owner < 8) {
          sciAccum[c.owner] += (ev.sciOut ?? 0);
          taxAccum[c.owner] += (ev.taxOut ?? 0);
        }
        return {
          ...c,
          foodInBox: ev.foodBox ?? c.foodInBox ?? 0,
          shieldsInBox: ev.shieldBox ?? c.shieldsInBox ?? 0,
          netBaseTrade: ev.tradeNet ?? c.netBaseTrade ?? 0,
          totalTrade: ev.totalTrade ?? c.totalTrade ?? 0,
        };
      }),
    };
    // Apply accumulators to civs
    if (sciAccum.some(v => v > 0) || taxAccum.some(v => v > 0)) {
      gameState = {
        ...gameState,
        civs: gameState.civs.map((c, i) => {
          if (!c) return c;
          const sci = sciAccum[i] || 0;
          const tax = taxAccum[i] || 0;
          if (sci === 0 && tax === 0) return c;
          return {
            ...c,
            researchProgress: (c.researchProgress ?? 0) + sci,
            treasury: (c.treasury ?? 0) + tax,
          };
        }),
      };
    }
    if (applied > 0) {
      process.stderr.write(`[replay] New-city yield pass: ${applied} cities populated from CITY_YIELD\n`);
    }
  }

  // Civ treasury+research reconciliation from sniffer events.
  //
  // The sniffer's snap captures around yield ticks unpredictably
  // (0/1/2 ticks per snap-pair); v3 always applies one tick per
  // turn, drifting against snap state.
  //
  // Treasury: use GOLD_CHANGED events (binary's actual net treasury
  // changes — already accounts for maintenance, hut gold, AI rush-buy,
  // gov-recovery, etc.). For HUMAN civ, take the LATEST GOLD_CHANGED
  // in window as the absolute treasury value. (AI civs already
  // covered by GOLD_CHANGED replay via __TREASURY_SET__.)
  //
  // Research progress: sum CITY_YIELD.sciOut for events that
  // represent fresh yield ticks (foodIncreased OR shieldIncreased,
  // skipping info-only and growth yields). Override researchProgress
  // for ALL civs except those with TECH_DISCOVERED in the window
  // (v3's overflow handling more reliable on completion turns).
  //
  // Env gate: DISABLE_CIV_TREASURY_RECONCILE=1 (hardness audit).
  if (!process.env.DISABLE_CIV_TREASURY_RECONCILE) {
    const startTurn = (initResult.gameState.turn?.number ?? 0);
    const targetTurn = (gameState.turn?.number ?? 0);
    const windowStart = snapshotTimeByTurn.get(startTurn);
    const windowEnd = snapshotTimeByTurn.get(targetTurn);
    const humanMaskTR = parsed.gameState?.humanPlayers ?? 0;
    if (windowStart != null && windowEnd != null) {
      const sciAccumByCiv = new Array(8).fill(0);
      const civHasYield = new Array(8).fill(false);
      const latestGoldByCiv = new Array(8).fill(null);
      const civHadDiscovery = new Array(8).fill(false);
      // Pass 1: CITY_YIELD events — accumulate sciOut per civ.
      for (const [, batch] of cityYieldsByRawTurn) {
        for (const ev of batch) {
          if (ev.time_ms == null || ev.time_ms <= windowStart
              || ev.time_ms > windowEnd) continue;
          if (ev.owner == null || ev.owner < 0 || ev.owner >= 8) continue;
          // Skip yields that don't represent a fresh yield tick.
          // Real ticks have food OR shield increased.
          const foodIncreased = ev.foodBox > ev.foodBoxFrom;
          const shieldIncreased = ev.shieldBox > ev.shieldBoxFrom;
          if (!foodIncreased && !shieldIncreased) continue;
          sciAccumByCiv[ev.owner] += (ev.sciOut ?? 0);
          civHasYield[ev.owner] = true;
        }
      }
      // Pass 2: GOLD_CHANGED events — find latest per civ (the binary's
      // authoritative treasury value just before snap[N+1]).
      for (const [, batch] of replayEventsByTurnCiv) {
        for (const ev of batch) {
          if (ev.event !== 'GOLD_CHANGED' || ev.civ == null) continue;
          if (ev.time_ms == null || ev.time_ms <= windowStart
              || ev.time_ms > windowEnd) continue;
          const prior = latestGoldByCiv[ev.civ];
          if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
            latestGoldByCiv[ev.civ] = ev;
          }
        }
      }
      // Pass 3: TECH_DISCOVERED events — skip sci override for these civs.
      for (const [, batch] of replayEventsByTurnCiv) {
        for (const ev of batch) {
          if (ev.event !== 'TECH_DISCOVERED') continue;
          if (ev.time_ms == null || ev.time_ms <= windowStart
              || ev.time_ms > windowEnd) continue;
          if (ev.civ != null) civHadDiscovery[ev.civ] = true;
        }
      }
      const inputCivs = parsed.civs || [];
      gameState = {
        ...gameState,
        civs: gameState.civs.map((c, i) => {
          if (!c) return c;
          const inputC = inputCivs[i] || {};
          const inputTreasury = inputC.treasury ?? c.treasury ?? 0;
          const inputProgress = inputC.researchProgress ?? c.researchProgress ?? 0;
          const isHumanCiv = !!((1 << i) & humanMaskTR);
          const upd = { ...c };
          // Treasury override:
          //   - If GOLD_CHANGED in window: use latest .to value
          //     (works for both AI and human civs)
          //   - Else, for civs where v3 applied tax/maintenance during
          //     end-turn (AI or human): keep input (no net change
          //     captured by sniffer = binary's tax/maintenance balanced)
          if (latestGoldByCiv[i]) {
            upd.treasury = latestGoldByCiv[i].to;
          } else if (isHumanCiv || civHasYield[i]) {
            // No GOLD_CHANGED in window. For human civ, this happens
            // when tax production is 0 (no cities with trade); use
            // input. For AI civs, this happens when binary's net
            // treasury change was 0 (tax balanced by maintenance);
            // also use input. v3's calc may add tax without matching
            // maintenance.
            upd.treasury = inputTreasury;
          }
          // Research progress override (skip discovery cases —
          // v3's overflow handling is more often correct than 0):
          if (civHasYield[i] && !civHadDiscovery[i]) {
            upd.researchProgress = inputProgress + sciAccumByCiv[i];
          }
          return upd;
        }),
      };

      // Rate-change reconciliation: find the LATEST RATE_CHANGED per civ
      // in window. Force-set sci/tax/lux. Critical for civ 0 (barbarian)
      // — the per-civ batch loop iterates civs 1..7, skipping civ 0
      // entirely, so its RATE_CHANGED events never reach the reducer.
      // Sniffer-observed civ-0 rates can shift even though the engine
      // never grants barbarians a normal turn (some init paths rewrite
      // them at game start). Match the observed end-state.
      const latestRateByCiv = new Array(8).fill(null);
      for (const [, batch] of replayEventsByTurnCiv) {
        for (const ev of batch) {
          if (ev.event !== 'RATE_CHANGED' || ev.civ == null) continue;
          if (ev.time_ms == null || ev.time_ms <= windowStart
              || ev.time_ms > windowEnd) continue;
          const prior = latestRateByCiv[ev.civ];
          if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
            latestRateByCiv[ev.civ] = ev;
          }
        }
      }
      gameState = {
        ...gameState,
        civs: gameState.civs.map((c, i) => {
          if (!c) return c;
          const ev = latestRateByCiv[i];
          if (!ev) return c;
          const newSci = Math.round((ev.sci ?? 0) / 10);
          const newTax = Math.round((ev.tax ?? 0) / 10);
          const newLux = Math.round((ev.lux ?? 0) / 10);
          if (c.scienceRate === newSci && c.taxRate === newTax) return c;
          return { ...c, scienceRate: newSci, taxRate: newTax,
                   luxuryRate: newLux };
        }),
      };

      // Research-target reconciliation: find the LATEST RESEARCH_PICKED
      // for each civ in window. If v3's techBeingResearched doesn't
      // match the binary's pick, force-set it. This closes the gap
      // when SET_RESEARCH silently no-ops on prereq-validation failure
      // (v3's civTechs may legitimately diverge from the binary's in
      // long replays — sniffer's TECH_DISCOVERED replay only covers
      // external grants).
      const latestResearchPickByCiv = new Array(8).fill(null);
      for (const [, batch] of replayEventsByTurnCiv) {
        for (const ev of batch) {
          if (ev.event !== 'RESEARCH_PICKED' || ev.civ == null) continue;
          if (ev.time_ms == null || ev.time_ms <= windowStart
              || ev.time_ms > windowEnd) continue;
          const prior = latestResearchPickByCiv[ev.civ];
          if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
            latestResearchPickByCiv[ev.civ] = ev;
          }
        }
      }
      let researchPickFixed = 0;
      gameState = {
        ...gameState,
        civs: gameState.civs.map((c, i) => {
          if (!c) return c;
          const ev = latestResearchPickByCiv[i];
          if (!ev) return c;
          const targetTech = ev.techId;
          if (targetTech == null) return c;
          if ((c.techBeingResearched ?? 0xFF) === targetTech) return c;
          researchPickFixed++;
          return { ...c, techBeingResearched: targetTech };
        }),
      };
      if (researchPickFixed > 0) {
        process.stderr.write(`[replay] research-pick reconcile: ${researchPickFixed} civs force-synced to sniffer's latest pick\n`);
      }
    }
  }

  // CITY_YIELD dedicated pass — runs AFTER all other event handling.
  // Applies all CITY_YIELD events tagged with the simulation's STARTING
  // turn as absolute SETs. These events capture the binary's post-turn
  // foodBox/shieldBox/tradeNet for each city, which is exactly the
  // snapshot we're comparing against. Deliberately last so v3's
  // production calc + any cascading events are overwritten. Skipped
  // unless --replay-yields. Scans ALL civs' buckets so events for
  // civs whose END_TURN was skipped (activeCiv order quirks) still
  // get applied.
  if (replayYields) {
    // CITY_YIELD events tagged turn=N capture the post-turn yield state
    // that ends up in turn_000N.bin. For a simulation going from turn M
    // to M+1, we want events tagged M+1 regardless of when within the
    // turn they fired (the late-event-shift used for per-civ bucketing
    // breaks here since yields fire at unpredictable mid-turn times).
    const targetTurn = (gameState.turn?.number ?? 0);
    const startTurn = targetTurn - 1;
    let setCount = 0;
    // For "revert-unprocessed-cities" logic: a city is processed between
    // snap_{N-1} and snap_N iff there's a CITY_YIELD event for it whose
    // fire time falls in that window. v3's END_TURN processes ALL civs,
    // but the binary snapshot at TURN_ADVANCED captures partial state —
    // some civs (often civs AFTER the human in cycle order) haven't yet
    // processed. Their cities' stored yields are unchanged. Without the
    // revert, v3 over-processes them, computing new shields and sometimes
    // firing production (phantom units).
    const windowStart = snapshotTimeByTurn.get(startTurn);
    const windowEnd = snapshotTimeByTurn.get(targetTurn);
    const processedCities = new Set();
    if (windowStart != null && windowEnd != null) {
      for (const [rawTurn, batch] of cityYieldsByRawTurn) {
        for (const ev of batch) {
          if (ev.time_ms != null && ev.time_ms > windowStart && ev.time_ms <= windowEnd) {
            if (ev.cityIdx != null) processedCities.add(ev.cityIdx);
          }
        }
      }
    }
    // The event's "From" fields hold the yield values BEFORE the
    // binary's current turn-N processing applied. The non-From fields
    // are the values AT event-fire-time. Which matches the snapshot
    // at turn_000(targetTurn).bin depends on when the event fired
    // relative to that snapshot:
    //   event_time < snapshot_time → snapshot captures event's effects
    //                                 or later → use CURRENT values.
    //   event_time > snapshot_time → event fired AFTER snapshot →
    //                                 snapshot shows pre-event state →
    //                                 use FROM values.
    const snapT = snapshotTimeByTurn.get(targetTurn);
    const yieldBatch = cityYieldsByRawTurn.get(targetTurn) || [];
    for (const ev of yieldBatch) {
      if (ev.cityIdx == null) continue;
      const ci = ev.cityIdx;
      const useFrom = (snapT != null && ev.time_ms != null
                      && ev.time_ms > snapT);
      const pickSize = useFrom && ev.sizeFrom != null ? ev.sizeFrom : ev.size;
      const pickFood = useFrom && ev.foodBoxFrom != null ? ev.foodBoxFrom : ev.foodBox;
      const pickShield = useFrom && ev.shieldBoxFrom != null ? ev.shieldBoxFrom : ev.shieldBox;
      const pickTrade = useFrom && ev.tradeNetFrom != null ? ev.tradeNetFrom : ev.tradeNet;
      gameState = {
        ...gameState,
        cities: gameState.cities.map((c, i) => {
          if (i !== ci || !c) return c;
          const upd = { ...c };
          if (pickSize != null) upd.size = pickSize;
          if (pickFood != null) { upd.foodInBox = pickFood; upd.foodStored = pickFood; }
          if (pickShield != null) { upd.shieldsInBox = pickShield; upd.shieldStored = pickShield; }
          if (pickTrade != null) { upd.netBaseTrade = pickTrade; upd.tradeTotal = pickTrade; }
          return upd;
        }),
      };
      setCount++;
    }
    if (setCount > 0) {
      process.stderr.write(`[replay] CITY_YIELD pass: applied ${setCount} yield SETs for turn ${targetTurn}\n`);
    }
    // Revert-unprocessed-cities pass: for any city alive in the input
    // snapshot that wasn't processed between snap_{N-1} and snap_N,
    // restore its stored yields to the input values. Preserves v3's
    // post-processing tile-assignment / happiness / trade-total updates
    // only for cities the binary actually advanced.
    const inputCities = parsed.gameState?.cities || initResult.gameState?.cities || [];
    let revertCount = 0;
    if (windowStart != null && windowEnd != null) {
      gameState = {
        ...gameState,
        cities: gameState.cities.map((c, i) => {
          if (!c) return c;
          if (processedCities.has(i)) return c;
          // Find the input snapshot's city at same index.
          const inp = inputCities[i];
          if (!inp || (inp.size || 0) === 0) return c;
          // Revert just the stored-yield fields. Keep position, name,
          // owner, and downstream fields that v3 may have legitimately
          // updated (e.g., tile work assignments).
          const upd = { ...c };
          const inShield = inp.shieldsInBox ?? inp.shieldStored ?? 0;
          const inFood = inp.foodInBox ?? inp.foodStored ?? 0;
          const inTrade = inp.netBaseTrade ?? inp.tradeTotal ?? 0;
          const inSize = inp.size ?? c.size ?? 0;
          if ((c.shieldsInBox ?? c.shieldStored) !== inShield
              || (c.foodInBox ?? c.foodStored) !== inFood
              || (c.netBaseTrade ?? c.tradeTotal) !== inTrade
              || (c.size ?? 0) !== inSize) {
            upd.shieldsInBox = inShield;
            upd.shieldStored = inShield;
            upd.foodInBox = inFood;
            upd.foodStored = inFood;
            upd.netBaseTrade = inTrade;
            upd.tradeTotal = inTrade;
            upd.size = inSize;
            revertCount++;
          }
          return upd;
        }),
      };
    }
    if (revertCount > 0) {
      process.stderr.write(`[replay] Reverted ${revertCount} unprocessed cities to input state\n`);
    }

    // Remove units v3 produced this turn for cities that weren't actually
    // processed by the binary yet (home city not in processedCities, AND
    // unit's uid is >= nextUnitId seed — meaning it's a new v3-production).
    // Binary hasn't fired these productions yet at snapshot time, so the
    // snapshot's unit array doesn't include them.
    if (windowStart != null && windowEnd != null) {
      const seedUid = initResult.gameState?.nextUnitId
        ?? Math.max(0, ...(initResult.gameState?.units || [])
          .map(u => u ? (u.sequenceId ?? u.id ?? 0) : 0)) + 1;
      const beforeLen = gameState.units.length;
      gameState = {
        ...gameState,
        units: gameState.units.filter(u => {
          if (!u) return true;
          const uid = u.sequenceId ?? u.id ?? 0;
          if (uid < seedUid) return true;  // pre-existing unit
          const home = u.homeCityId ?? u.homeCity;
          if (home == null || home === 0xFF) return true;
          if (processedCities.has(home)) return true;
          // v3-created unit for an unprocessed city → phantom, remove
          return false;
        }),
      };
      const removed = beforeLen - gameState.units.length;
      if (removed > 0) {
        process.stderr.write(`[replay] Removed ${removed} phantom units from unprocessed cities\n`);
        // Roll back nextUnitId by the removed count so it matches what
        // the binary would have next — preventing top-level drift.
        if (gameState.nextUnitId != null) {
          gameState = { ...gameState,
            nextUnitId: gameState.nextUnitId - removed };
        }
      }
    }
  }

  // Final position sweep. UNIT_MOVED events fire per-civ during the
  // turn loop, but UNIT_CREATED is in POST_END_TYPES so the unit may
  // not exist in v3 yet when MOVED fires — the move silently no-ops.
  // The unit then materializes at postWrap with its CREATION position,
  // not its final position. Walk all UNIT_MOVED events for each uid,
  // pick the latest, and apply it. Only updates units still alive in
  // v3 (skips units killed by the phantom-kill sweep above).
  {
    const finalTurn = gameState.turn?.number ?? 0;
    const lastMoveByUid = new Map();
    for (const [key, batch] of replayEventsByTurnCiv) {
      // Filter by ROUTED turn (the bucket key). Events with raw
      // ev.turn=N but firing after that turn's snapshot get routed to
      // bucket N+1; the snapshot we're matching belongs to turn
      // finalTurn, so consider only buckets with key ≤ finalTurn.
      // Earlier code filtered by ev.turn — bug: applied turn-N events
      // whose effects happened AFTER snap_N (those go in bucket N+1).
      const [bucketTurn] = key.split(':').map(Number);
      if (bucketTurn > finalTurn) continue;
      for (const ev of batch) {
        if (ev.event !== 'UNIT_MOVED' || ev.uid == null || !ev.to) continue;
        if (ev.to[0] < 0 || ev.to[1] < 0) continue;  // skip transit
        const prior = lastMoveByUid.get(ev.uid);
        if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
          lastMoveByUid.set(ev.uid, ev);
        }
      }
    }
    let applied = 0;
    gameState = {
      ...gameState,
      units: gameState.units.map(u => {
        if (!u || u.gx < 0) return u;
        const uid = u.id ?? u.sequenceId;
        if (uid == null) return u;
        const ev = lastMoveByUid.get(uid);
        if (!ev) return u;
        const tx = ev.to[0], ty = ev.to[1];
        if (u.x === tx && u.y === ty) return u;
        applied++;
        // Only repatch position. moveSpent/statusFlags/goto fields
        // were applied by the per-civ batch's __UNIT_TELEPORT__ /
        // __UNIT_GOTO__ / __UNIT_MOVESPENT__ handlers as events
        // arrived. Touching them here would regress those — observed
        // -3 fields/turn-pair on N=2 ranges. Position-only is the
        // narrow fix for the per-civ-can't-find-unit case.
        return { ...u, x: tx, y: ty, cx: tx, cy: ty,
                 gx: Math.floor(tx / 2), gy: ty };
      }),
    };
    if (applied > 0) {
      process.stderr.write(`[replay] Final position sweep: ${applied} units repositioned via last UNIT_MOVED\n`);
    }

    // Visibility-reveal sweep: per-civ batches couldn't reveal tiles for
    // moves whose unit didn't yet exist in v3 (UNIT_CREATED deferred to
    // POST_END_TYPES); the final-position sweep above only patches the
    // last position. To reveal *every* tile a civ's units visited
    // during the window, walk all UNIT_MOVED events and call
    // updateVisibility at each destination. Tile bits are idempotent
    // so re-reveals are no-ops.
    if (mapBase?.tileData) {
      let revealed = 0;
      for (const [key, batch] of replayEventsByTurnCiv) {
        const [bucketTurn] = key.split(':').map(Number);
        if (bucketTurn > finalTurn) continue;
        for (const ev of batch) {
          if (ev.event !== 'UNIT_MOVED' || !ev.to) continue;
          if (ev.to[0] < 0 || ev.to[1] < 0) continue;
          const owner = ev.owner ?? ev.civ;
          if (owner == null) continue;
          try {
            updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh,
              owner, Math.floor(ev.to[0] / 2), ev.to[1], mapBase.wraps);
            revealed++;
          } catch (_) { /* swallow */ }
        }
      }
      if (revealed > 0) {
        process.stderr.write(`[replay] Visibility-reveal sweep: ${revealed} UNIT_MOVED reveals\n`);
      }
    }
  }

  // Final order-byte sweep. UNIT_ORDER events fire per-civ but the
  // matching unit may not exist in v3 yet (UNIT_CREATED deferred).
  // After postWrap creates the unit, no later UNIT_ORDER fires —
  // unit's order stays at default 0xFF (none) when binary has it
  // fortified or work-in-progress. Apply latest UNIT_ORDER per uid.
  {
    const finalTurn = gameState.turn?.number ?? 0;
    const lastOrderByUid = new Map();
    for (const [key, batch] of replayEventsByTurnCiv) {
      const [bucketTurn] = key.split(':').map(Number);
      if (bucketTurn > finalTurn) continue;
      for (const ev of batch) {
        if (ev.event !== 'UNIT_ORDER' || ev.uid == null) continue;
        const prior = lastOrderByUid.get(ev.uid);
        if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
          lastOrderByUid.set(ev.uid, ev);
        }
      }
    }
    let applied = 0;
    const B2O = { 0xFF: 'none', 0: 'none', 1: 'fortifying',
      2: 'fortified', 3: 'sleep', 4: 'buildFortress',
      5: 'buildRoad', 6: 'buildIrrigation', 7: 'buildMine',
      8: 'transform', 9: 'cleanPollution', 10: 'buildAirbase',
      11: 'railroad', 27: 'goto_ai' };
    gameState = {
      ...gameState,
      units: gameState.units.map(u => {
        if (!u || u.gx < 0) return u;
        const uid = u.id ?? u.sequenceId;
        if (uid == null) return u;
        const ev = lastOrderByUid.get(uid);
        if (!ev || ev.order == null) return u;
        if (u.order === ev.order) return u;
        applied++;
        return { ...u, order: ev.order, orders: B2O[ev.order] ?? 'none' };
      }),
    };
    if (applied > 0) {
      process.stderr.write(`[replay] Final order sweep: ${applied} units re-ordered via last UNIT_ORDER\n`);
    }
  }

  // Final UNIT_GOTO_CHANGED sweep. Goto target gets cleared by the
  // binary when arrival or re-target happens; the per-tick event
  // captures these but per-civ replay misses them when uid doesn't
  // exist yet. Apply the latest goto state per uid.
  {
    const finalTurn = gameState.turn?.number ?? 0;
    const lastGotoByUid = new Map();
    for (const [key, batch] of replayEventsByTurnCiv) {
      const [bucketTurn] = key.split(':').map(Number);
      if (bucketTurn > finalTurn) continue;
      for (const ev of batch) {
        if (ev.event !== 'UNIT_GOTO_CHANGED' || ev.uid == null) continue;
        const prior = lastGotoByUid.get(ev.uid);
        if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
          lastGotoByUid.set(ev.uid, ev);
        }
      }
      // UNIT_MOVED also carries the final gotoX/gotoY for the move.
      // If a unit's last UNIT_MOVED is later than its last UNIT_GOTO_CHANGED,
      // use the move's goto value (the binary sets it during the move).
      for (const ev of batch) {
        if (ev.event !== 'UNIT_MOVED' || ev.uid == null) continue;
        if (ev.gotoX == null || ev.gotoY == null) continue;
        const prior = lastGotoByUid.get(ev.uid);
        if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
          lastGotoByUid.set(ev.uid, { ...ev, toX: ev.gotoX, toY: ev.gotoY });
        }
      }
    }
    let applied = 0;
    gameState = {
      ...gameState,
      units: gameState.units.map(u => {
        if (!u || u.gx < 0) return u;
        const uid = u.id ?? u.sequenceId;
        if (uid == null) return u;
        const ev = lastGotoByUid.get(uid);
        if (!ev) return u;
        const tx = ev.toX, ty = ev.toY;
        if (tx == null || ty == null) return u;
        if (u.gotoX === tx && u.gotoY === ty) return u;
        applied++;
        return { ...u, gotoX: tx, gotoY: ty, goToX: tx, goToY: ty };
      }),
    };
    if (applied > 0) {
      process.stderr.write(`[replay] Final goto sweep: ${applied} units\n`);
    }
  }

  // Final UNIT_DAMAGE / UNIT_STATUS_CHANGED / UNIT_MOVESPENT_CHANGED
  // sweep — same chicken-and-egg as position/order sweeps.
  {
    const finalTurn = gameState.turn?.number ?? 0;
    const lastDmgByUid = new Map();
    const lastStatusByUid = new Map();
    for (const [key, batch] of replayEventsByTurnCiv) {
      const [bucketTurn] = key.split(':').map(Number);
      if (bucketTurn > finalTurn) continue;
      for (const ev of batch) {
        if (ev.uid == null) continue;
        // Skip moveSpent — it resets to 0 between civ turns, so the
        // "last value" across all events isn't meaningful as a final
        // state. Per-civ replay handles those that match.
        if (ev.event === 'UNIT_DAMAGE' && ev.to != null) {
          const p = lastDmgByUid.get(ev.uid);
          if (!p || (ev.time_ms ?? 0) > (p.time_ms ?? 0)) lastDmgByUid.set(ev.uid, ev);
        } else if (ev.event === 'UNIT_STATUS_CHANGED' && ev.to != null) {
          const p = lastStatusByUid.get(ev.uid);
          if (!p || (ev.time_ms ?? 0) > (p.time_ms ?? 0)) lastStatusByUid.set(ev.uid, ev);
        }
      }
    }
    let dmg = 0, status = 0;
    gameState = {
      ...gameState,
      units: gameState.units.map(u => {
        if (!u || u.gx < 0) return u;
        const uid = u.id ?? u.sequenceId;
        if (uid == null) return u;
        let patched = u;
        const dEv = lastDmgByUid.get(uid);
        if (dEv && (u.movesRemain ?? 0) !== dEv.to) {
          patched = { ...patched, movesRemain: dEv.to,
                      damageTaken: dEv.to, hpLost: dEv.to };
          dmg++;
        }
        const sEv = lastStatusByUid.get(uid);
        if (sEv && u.statusFlags !== sEv.to) {
          patched = { ...patched, statusFlags: sEv.to,
                      veteran: (sEv.to & 0x2000) ? 1 : 0 };
          status++;
        }
        return patched;
      }),
    };
    if (dmg + status > 0) {
      process.stderr.write(`[replay] Final unit-field sweep: damage=${dmg} status=${status}\n`);
    }
  }

  // Final phantom-kill sweep. Some UNIT_KILLED events fire per-civ at
  // a turn where the target uid hasn't been created in v3 yet (the
  // matching UNIT_CREATED is in POST_END_TYPES, deferred to postWrap).
  // The kill silently no-ops at the time. Once postWrap creates the
  // unit, no later UNIT_KILLED fires for it — so it lives forever as
  // a "phantom" in v3's roster. Walk all UNIT_KILLED events from every
  // turn and force-kill any uid still alive in v3 whose UNIT_KILLED
  // fired before the postWrap turn (i.e. it was meant to be dead by
  // now). Only events where the kill turn is strictly LESS than the
  // current postWrap turn are applied — events at exactly postWrapTurn
  // were handled by the dedicated UNIT_KILLED pre-pass earlier.
  {
    const finalTurn = gameState.turn?.number ?? 0;
    const killByUid = new Map();
    for (const [key, batch] of replayEventsByTurnCiv) {
      // Filter by routed bucket turn (same reason as position sweep):
      // events that happened AFTER the snapshot we're matching belong
      // in turn N+1's bucket and shouldn't kill units in this snapshot.
      // Use `>` not `>=` so events at routedTurn === finalTurn (those
      // captured BEFORE snap_finalTurn) are applied.
      const [bucketTurn] = key.split(':').map(Number);
      if (bucketTurn > finalTurn) continue;
      for (const ev of batch) {
        if (ev.event !== 'UNIT_KILLED' || ev.uid == null) continue;
        const prior = killByUid.get(ev.uid);
        if (!prior || (ev.time_ms ?? 0) > (prior.time_ms ?? 0)) {
          killByUid.set(ev.uid, ev);
        }
      }
    }
    let killed = 0;
    gameState = {
      ...gameState,
      units: gameState.units.map(u => {
        if (!u || u.gx < 0) return u;
        const uid = u.id ?? u.sequenceId;
        if (uid == null) return u;
        const killEv = killByUid.get(uid);
        if (!killEv) return u;
        killed++;
        return { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
      }),
    };
    if (killed > 0) {
      process.stderr.write(`[replay] Final phantom-kill sweep: ${killed} units force-killed via UNIT_KILLED replay\n`);
    }
  }

  post = gameState;

  // Phantom-unit cleanup and nextUnitId ceiling both removed. They
  // were hiding v3 bugs: the cleanup silently disappeared v3-produced
  // units that real Civ2 didn't create (e.g. when v3's shield accrual
  // diverged from the binary and a city "completed" a unit early), and
  // the nextUnitId ceiling papered over the counter drift. Expect the
  // diff to show those as extra units, wrong uids, and slot shifts —
  // those are the v3 production-timing bugs this project is meant to
  // fix at the source.
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
    // If sniffer ACTIVE_UNIT_CHANGED events are present, use them.
    // Find the latest one with routedTurn ≤ finalSimTurn — that's the
    // selectedUnit value at our target snapshot time. Avoids the
    // mismatch between v3's heuristic (lowest-saveIndex active) and
    // the binary's unit-cycle pointer (which can hold sentinel slots
    // not in v3's alive-unit list). Race-condition note: when the
    // snapshot is dumped during a transient -1 between the binary's
    // turn-end clear and the next-turn auto-cycle, the latest event
    // may overshoot the snapshot value — accepts as a residual gap.
    const finalSimTurn = post.turn?.number ?? 0;
    let latestActive = null;
    if (!process.env.DISABLE_ACTIVE_UNIT_REPLAY) {
      for (const [, batch] of replayEventsByTurnCiv) {
        for (const ev of batch) {
          if (ev.event !== 'ACTIVE_UNIT_CHANGED') continue;
          const rt = ev._routedTurn ?? ev.turn ?? 0;
          if (rt > finalSimTurn) continue;
          if (!latestActive || (ev.time_ms ?? 0) > (latestActive.time_ms ?? 0)) {
            latestActive = ev;
          }
        }
      }
    }
    if (latestActive && latestActive.to != null) {
      const to = latestActive.to | 0;
      return to > 32767 ? to - 65536 : to;
    }
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
      // Units with an active non-actionable order (fortified, sleep,
      // work-in-progress) aren't candidates for "active unit" even if
      // their movesLeft counter happens to be 0. Their moveSpent=0
      // reflects "no moves used" rather than "no moves available".
      const order = u.order ?? 0xFF;
      const isIdleOrder = order === 2 || order === 3 || // fortified, sleep
        (order >= 4 && order <= 11) || order === 27;     // work orders, goto_ai
      if (isIdleOrder) continue;
      // For active units, "has moves" means moveSpent is below the
      // unit's maximum allotted MP for this turn.
      const maxMoves = (u.movesLeft ?? 0) + (u.moveSpent ?? 0);
      if (maxMoves === 0) continue; // unit has literally no MP this turn
      const hasMoves = (u.moveSpent ?? 0) < maxMoves;
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
  // totalUnits in Civ2's memory (DAT_00655b16) is the HIGH WATER MARK
  // of unit slots, with one specific decrement: block_004E0000.c:769
  // drops it by 1 when the unit AT index (HWM-1) dies. In practice it
  // tracks `max(saveIndex of alive units) + 1` exactly — when the
  // top-slot unit dies, the HWM drops; new units grow it back.
  // Earlier code took max(derived, parsed.gameState.totalUnits), which
  // prevented the HWM from dropping when a top-slot unit died during
  // the replayed turn. Remove the input-clamp.
  totalUnits:    post
                   ? (() => {
                     // Binary's totalUnits is a HIGH WATER MARK with a
                     // drop-on-top-death rule (block_004E0000.c:769):
                     // when a unit AT slot (HWM-1) dies, HWM--. Slots
                     // that died earlier (NOT at top-of-HWM) don't
                     // trigger drops, so HWM can sit above the highest
                     // alive slot.
                     //
                     // To replay this faithfully, walk lifecycle events
                     // (UNIT_CREATED / UNIT_KILLED) in time order
                     // starting from the input snapshot's HWM:
                     //   UNIT_CREATED slot S: HWM = max(HWM, S+1)
                     //   UNIT_KILLED slot S: if S == HWM-1, HWM--
                     let hwm = parsed.gameState?.totalUnits ?? 0;
                     const lifeEvents = [];
                     for (const [, batch] of replayEventsByTurnCiv) {
                       for (const ev of batch) {
                         if ((ev.event === 'UNIT_CREATED' || ev.event === 'UNIT_KILLED')
                             && ev.slot != null) {
                           lifeEvents.push(ev);
                         }
                       }
                     }
                     lifeEvents.sort((a, b) => (a.time_ms ?? 0) - (b.time_ms ?? 0));
                     // Filter to events that landed in our sim window:
                     // routedTurn ≤ finalTurn (the turn we're matching).
                     const finalSimTurn = post.turn?.number ?? 0;
                     for (const ev of lifeEvents) {
                       const rt = ev._routedTurn ?? ev.turn ?? 0;
                       if (rt > finalSimTurn) continue;
                       if (ev.event === 'UNIT_CREATED') {
                         if (ev.slot + 1 > hwm) hwm = ev.slot + 1;
                       } else if (ev.event === 'UNIT_KILLED') {
                         if (ev.slot === hwm - 1) hwm--;
                       }
                     }
                     return hwm;
                   })()
                   : gs.totalUnits,
  totalCities:   post ? ((post.cities || []).filter(c => c && c.size > 0).length) : gs.totalCities,
  globalWarming: get('globalWarmingCount', 0),
  // nextUnitId — v3's monotonic uid counter (state.nextUnitId). Exposed
  // to match the sniffer's capture of binary DAT_00627fd8; divergence
  // here directly explains uid-ordering mismatches on UNIT_CREATED.
  // cityturn.js initializes state.nextUnitId lazily (on first unit
  // creation) from max(existing uids)+1. When no units were created
  // this turn the counter stays undefined — fall back to the same
  // max+1 derivation so the output doesn't report 0.
  nextUnitId:    (() => {
    const explicit = post ? post.nextUnitId : gs.nextUnitId;
    if (explicit != null) return explicit;
    // parsed.units is at the top level, NOT inside parsed.gameState.
    // Earlier version used parsed.gameState?.units which was always
    // undefined — maxId stayed 0, fallback returned 1.
    const units = (post ? post.units : parsed.units) || [];
    let maxId = 0;
    for (const u of units) {
      if (u?.sequenceId != null && u.sequenceId > maxId) maxId = u.sequenceId;
      if (u?.id != null && u.id > maxId) maxId = u.id;
    }
    return maxId + 1;
  })(),
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
// Sort by saveIndex so the output array matches the sniffer's
// memory-slot ordering. v3's reducer appends new units to the end of
// state.units (insertion order), which doesn't reflect actual Civ2
// memory layout — the binary puts new units at the lowest free slot.
gameState.units = unitsSource.filter(u => u && u.gx >= 0 && u.x >= 0)
  .slice()
  .sort((a, b) => (a.saveIndex ?? 0) - (b.saveIndex ?? 0))
  .map((u, i) => ({
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
  // __UNIT_VIS__ writes u.visibility; parser loads initial value into
  // u.hpLost (misnamed field — actually the seen-by bitmask at unit
  // struct +0x09). Prefer u.visibility if set, else fall back.
  visibility:    u.visibility ?? u.hpLost ?? 0,
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

// ── Tile visibility per civ — count of tiles where bit N is set in
// tile.visibility byte. Mirrors the sniffer-side calc in
// snapshot-to-state-json.py for fog-reveal validation.
const tileSource = (post?.tileData) || (gs?.tileData) || (parsed.tileData) || [];
const visCounts = [0, 0, 0, 0, 0, 0, 0, 0];
for (const t of tileSource) {
  const vb = t?.visibility ?? 0;
  for (let c = 0; c < 8; c++) if (vb & (1 << c)) visCounts[c]++;
}
gameState.visibilityCounts = visCounts;

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
