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
  if (info.snapTimeMs != null) {
    globalThis.__SNAPSHOT_TIME_MS = info.snapTimeMs;
    process.stderr.write(`[snap] Capture timestamp: ${info.snapTimeMs.toFixed(1)}ms\n`);
  }
  if (info.randSeed != null) {
    globalThis.__SNAPSHOT_RAND_SEED = info.randSeed;
    process.stderr.write(`[snap] MSVC rand seed: 0x${info.randSeed.toString(16).padStart(8, '0')}\n`);
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
      const { u32 } = await import('./mem.js');
      const nextId = u32(0x00627fd8, 0);  // DAT_00627fd8 = next_unit_sequence_id
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
  const replayEventsByTurnCiv = new Map();
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
          }
          if (ev.event === 'SNAPSHOT_DUMPED' && ev.turn != null && ev.time_ms != null) {
            snapshotTime.set(ev.turn, ev.time_ms);
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
        const key = `${routedTurn}:${c}`;
        if (!replayEventsByTurnCiv.has(key)) replayEventsByTurnCiv.set(key, []);
        replayEventsByTurnCiv.get(key).push(ev);
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
        // Most stateFlags bits are v3's responsibility (atWar set at
        // combat, freeAdvancePending set by Darwin's Voyage, etc.). We
        // surface those diffs for manual v3-reducer fixing.
        //
        // Exception: bit 0x04 (senateOverride). FUN_00560084 toggles
        // it with 1/3 probability each turn via a standalone rand()
        // draw. Until task #49 (RNG call-order audit) lets us
        // replicate the exact draw sequence, v3 can't match this bit.
        // Apply the observed new-bit-0x04 state specifically; leave
        // other bits alone.
        if (ev.civ == null || ev.from == null || ev.to == null) return [];
        const bit04_changed = (ev.from ^ ev.to) & 0x04;
        if (!bit04_changed) return [];
        const bit04_target = ev.to & 0x04;
        return [{ type: '__SENATE_TOGGLE__', civ: ev.civ, set: !!bit04_target }];
      }
      case 'TECH_DISCOVERED':
        // Tech completion is a v3 calculation (beaker accumulation +
        // calcResearchCost threshold). Previously applied via
        // __TECH_DISCOVERED__ which forced the discovery regardless
        // of v3's cost calc, hiding the research-cost-off-by-N bugs
        // this whole fidelity project is supposed to surface. Now
        // ignored; when v3 drifts from real Civ2's discoveries, the
        // diff will show it at civs[N].researchingTech / civTechs and
        // we fix v3's research.js to match binary FUN_004c2788.
        //
        // NOTE: this will cascade when real Civ2 gives a FREE tech
        // (hut, Great Library, Philosophy first-to-discover bonus).
        // v3 has to implement those effects correctly too — if it
        // doesn't, the mismatch is genuine and fixable.
        return [];
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
        const WORKER_MAP = { 4: 'fortress', 5: 'road', 6: 'irrigation',
                             7: 'mine', 9: 'pollution', 10: 'airbase',
                             11: 'railroad' };
        const UNIT_MAP = { 1: 'fortify', 2: 'fortify', 3: 'sleep',
                           27: 'goto_ai' };
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
      case 'UNIT_DAMAGE':
        // Combat result. v3 combat.js computes damage per round; we
        // should be routing UNIT_MOVED-onto-enemy through v3's combat
        // reducer so this is produced endogenously. Not done yet —
        // diff will surface damageTaken mismatches until combat is
        // wired up.
        return [];
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
        // Per-unit "has been spotted by civs X,Y,Z" bitmask. v3 doesn't
        // track this yet (no per-unit fog tracking). Diff will surface
        // visibility byte mismatches until v3 implements it.
        return [];
      case 'CITY_YIELD':
        // Diagnostic only — NOT applied to state. The diff tooling
        // surfaces these so we can attribute per-city shield/food/trade
        // mismatches to the specific turn and see the binary's actual
        // yields alongside v3's predicted yields. Returning [] means
        // the harness ignores the event while still keeping it in the
        // event stream for other consumers (e.g. state-diff comparing
        // predicted vs observed).
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
            if (action.type === '__UNIT_DAMAGE__') {
              gameState = {
                ...gameState,
                units: gameState.units.map(u =>
                  u && (u.id === action.uid || u.sequenceId === action.uid)
                    ? { ...u, hpLost: action.to, damageTaken: action.to }
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
              const next = applyAction(gameState, mapBase, action, civ);
              if (next && next !== gameState) gameState = next;
            } catch (e) {
              process.stderr.write(`[replay] ${ev.event} action failed: ${e.message}\n`);
            }
          }
        }
      };
      applyReplayBatch(preEvents);

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
        process.stderr.write(`[replay] turn ${currentTurn} civ ${civ} post: ${postEvents.length} events (deferred)\n`);
        deferredPostEvents.push(...postEvents);
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
    if (evTurn === postWrapTurn) postWrapEvents.push(...batch);
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
        try {
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
              // If owner changed, recompute homeCity since v3's
              // assignment points to a city the new owner doesn't own.
              // Use the city at the creation tile when possible.
              if (ownerChanged) {
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
        // Prefer the sniffer-captured slot if present; otherwise pick
        // the lowest free slot to match binary's slot-reuse behavior.
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
        // destination.
        const targetUnit = gameState.units.find(u => u &&
          (u.id === ev.uid || u.sequenceId === ev.uid));
        if (targetUnit && targetUnit.gx < 0) continue;
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
                  ? { ...u, hpLost: action.to, damageTaken: action.to }
                  : u),
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
            gameState = {
              ...gameState,
              cities: gameState.cities.map((c, i) =>
                i === ci ? { ...c, size: 0, owner: -1, gx: -1, gy: -1 } : c),
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
              let homeCityIdx = null;
              if (owner != null && gameState.cities) {
                homeCityIdx = gameState.cities.findIndex(c =>
                  c && c.owner === owner && c.gx >= 0);
                if (homeCityIdx < 0) homeCityIdx = null;
              }
              let usedSave = new Set();
              for (const u of gameState.units) {
                if (u && u.gx >= 0 && u.saveIndex != null) usedSave.add(u.saveIndex);
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
    applyBatch(deferredPostEvents);
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
                     let maxIdx = -1;
                     for (const u of (post.units || [])) {
                       if (u && u.gx >= 0 && u.saveIndex != null && u.saveIndex > maxIdx) {
                         maxIdx = u.saveIndex;
                       }
                     }
                     return maxIdx + 1;
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
