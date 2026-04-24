#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// validate-calc-tech-value.js — Pick-for-pick validation of v3's
// calcTechValue against binary's FUN_004bdb2c.
//
// Reads a session's civ2_trace.log for ai_calc_tech_value call/return
// pairs (added via readRet + args on FUN_004BDB2C). For each pair:
//   1. Load the turn snapshot as v3 state.
//   2. Call v3's calcTechValue(civSlot, techId, state).
//   3. Compare to binary's retval.
//
// Match percentage = calcTechValue port fidelity. Mismatches are the
// exact (civ, tech) cases where v3's logic diverges from FUN_004bdb2c.
//
// Usage: node validate-calc-tech-value.js <session_dir>
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { initFromSav } from '../charlizationv3/engine/init.js';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { buildSav } from './sav-from-mem.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-calc-tech-value.js <snapshots/game_YYYYMMDD_HHMMSS>');
  process.exit(1);
}

const tracePath = join(sessionDir, 'civ2_trace.log');
if (!existsSync(tracePath)) {
  console.error(`No civ2_trace.log in ${sessionDir}`);
  process.exit(1);
}

// ── Parse ai_calc_tech_value call/return pairs ───────────────────
const calls = [];
let pending = null;
let currentTurn = 0;
for (const line of readFileSync(tracePath, 'utf8').split(/\r?\n/).filter(Boolean)) {
  let ev;
  try { ev = JSON.parse(line); } catch { continue; }
  if (ev.source === 'sniffer' && ev.event === 'TURN_ADVANCED' && ev.turn != null) {
    currentTurn = ev.turn;
    continue;
  }
  if (ev.source !== 'frida') continue;
  if (ev.fn !== 'ai_calc_tech_value') continue;
  if (ev.kind === 'call') {
    pending = {
      turn: currentTurn,
      civSlot: ev.named?.civSlot ?? ev.args?.[0],
      techId: ev.named?.techId ?? ev.args?.[1],
      freeTechGoal: ev.tvGlobals?.freeTechGoal,
      strategicGoal: ev.tvGlobals?.strategicGoal,
      scenarioFlags: ev.tvGlobals?.scenarioFlags,
      aliveMask: ev.tvGlobals?.aliveMask,
    };
  } else if (ev.kind === 'return' && pending) {
    calls.push({ ...pending, retval: ev.retval });
    pending = null;
  }
}

// De-duplicate identical consecutive calls (binary calls calcTechValue
// twice per candidate — once before rand, once after. Both should
// return the same value; keep one per (turn, civ, tech).
const unique = new Map();
for (const c of calls) {
  const key = `${c.turn}:${c.civSlot}:${c.techId}`;
  if (!unique.has(key)) unique.set(key, c);
}
const deduped = [...unique.values()];

console.log(`Loaded ${calls.length} raw captures → ${deduped.length} unique (turn, civ, tech) combinations`);

// ── Per-turn state loader ───────────────────────────────────────────
const econai = await import('../charlizationv3/engine/ai/econai.js');
// calcTechValue isn't exported; load via a small wrapper file if
// needed — but we can re-import it if exported. Check.
const calcTechValue = econai.calcTechValue;
if (!calcTechValue) {
  // calcTechValue is private in econai.js. We'll need to export it.
  console.error(`calcTechValue is not exported from econai.js. Add 'export' to it and rerun.`);
  process.exit(2);
}

const stateCache = new Map();
function loadStateForTurn(turn) {
  if (stateCache.has(turn)) return stateCache.get(turn);
  let t = turn;
  let snapPath;
  while (t >= 0) {
    const p = join(sessionDir, `turn_${String(t).padStart(4, '0')}_80x50_deity.bin`);
    if (existsSync(p)) { snapPath = p; break; }
    t--;
  }
  if (!snapPath) return null;
  loadSnapshotIntoMem(snapPath);
  const savBuf = buildSav();
  const parsed = Civ2Parser.parse(savBuf, snapPath);
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
  const bundle = { baseState: initResult.gameState, mapBase: initResult.mapBase, loadedFromTurn: t };
  stateCache.set(turn, bundle);
  return bundle;
}

// ── Validate each call ──────────────────────────────────────────────
let matched = 0, mismatched = 0;
const mismatches = [];
const byDelta = new Map();

for (const c of deduped) {
  const bundle = loadStateForTurn(c.turn);
  if (!bundle) continue;
  // Init-time calls use post-init state which has starting techs.
  // Clear techs so calcTechValue sees the pre-grant state (matches
  // binary's timing).
  const state = { ...bundle.baseState };
  // Pass captured binary globals through so calcTechValue can use the
  // exact values the binary had at the call site.
  if (c.freeTechGoal != null) state.freeTechGoal = c.freeTechGoal;
  // v3 reads `aiStrategicGoal`; binary's DAT_0064b3fb name-maps to
  // strategicGoal in the Frida agent.
  if (c.strategicGoal != null) state.aiStrategicGoal = c.strategicGoal;
  if (c.scenarioFlags != null) state.scenarioFlags = c.scenarioFlags;
  // `aliveMask` in the trace is misnamed — the Frida agent reads
  // DAT_00655BCE (the tech-adoption mask), not an alive mask.
  if (c.aliveMask != null) state.techAdoptionMask = c.aliveMask;
  if (c.turn === 0 && process.env.TREAT_INIT_PICK) {
    state.civTechs = state.civTechs ? state.civTechs.slice() : [];
    state.civTechs[c.civSlot] = new Set();
    if (state.civs?.[c.civSlot]) {
      state.civs = state.civs.slice();
      state.civs[c.civSlot] = { ...state.civs[c.civSlot], acquiredTechCount: 0 };
    }
  }
  let v3Val;
  try {
    v3Val = calcTechValue(c.civSlot, c.techId, state, bundle.mapBase);
  } catch (e) {
    mismatches.push({ ...c, v3Val: 'threw', err: e.message });
    continue;
  }
  if (v3Val === c.retval) matched++;
  else {
    mismatched++;
    mismatches.push({ ...c, v3Val });
    const delta = v3Val - c.retval;
    byDelta.set(delta, (byDelta.get(delta) ?? 0) + 1);
  }
}

console.log(`\n=== calcTechValue fidelity: ${matched}/${deduped.length} matches (${(100*matched/deduped.length).toFixed(1)}%) ===`);
console.log(`\nMismatches by delta (v3 - binary):`);
for (const [d, n] of [...byDelta.entries()].sort((a,b)=>a[0]-b[0])) {
  console.log(`  ${d>=0?'+':''}${d}: ${n} cases`);
}

console.log(`\nFirst 20 mismatches:`);
for (const m of mismatches.slice(0, 20)) {
  console.log(`  turn=${m.turn} civ=${m.civSlot} tech=${m.techId}: binary=${m.retval}, v3=${m.v3Val}`);
}
