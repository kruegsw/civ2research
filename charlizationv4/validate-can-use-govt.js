#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// validate-can-use-govt.js — Pick-for-pick validation of v3's
// canUseGovernment against binary's FUN_0055c277.
//
// Reads a session's civ2_trace.log for can_use_government call/return
// pairs (via captureCanUseGovtGlobals in trace_civ2.js). For each pair:
//   1. Load the session's snapshot as v3 state.
//   2. Thread captured globals (fundamentalismEnabled, knowsTechBytes).
//   3. Call v3's canUseGovernment(civSlot, govtIndex).
//   4. Compare result (boolean coerced to 0/1) to binary retval.
//
// Match percentage = v3 fidelity. <100% = logic divergence.
//
// Usage: node validate-can-use-govt.js <session_dir>
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { initFromSav } from '../charlizationv3/engine/init.js';
import { canUseGovernment } from '../charlizationv3/engine/ai/econai.js';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { buildSav } from './sav-from-mem.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-can-use-govt.js <snapshots/game_YYYYMMDD_HHMMSS>');
  process.exit(1);
}

const tracePath = join(sessionDir, 'civ2_trace.log');
if (!existsSync(tracePath)) {
  console.error(`No civ2_trace.log in ${sessionDir}`);
  process.exit(1);
}

// ── Parse can_use_government call/return pairs ──────────────────
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
  if (ev.fn !== 'can_use_government') continue;
  if (ev.kind === 'call') {
    pending = {
      turn: currentTurn,
      civSlot: ev.named?.civSlot ?? ev.args?.[0],
      govtIndex: ev.named?.govtIndex ?? ev.args?.[1],
      govtGlobals: ev.govtGlobals,
      knowsTechBytes: ev.knowsTechBytes,
    };
  } else if (ev.kind === 'return' && pending) {
    calls.push({ ...pending, retval: ev.retval });
    pending = null;
  }
}

console.log(`Loaded ${calls.length} can_use_government call/return pairs`);
if (calls.length === 0) {
  console.error('No matching events. Is the Frida agent running?');
  process.exit(1);
}

// ── Per-turn state loader ───────────────────────────────────────────
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
  const parsed = Civ2Parser.parse(buildSav(), snapPath);
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
  const init = initFromSav(parsed, seatList);
  const bundle = { baseState: init.gameState, mapBase: init.mapBase };
  stateCache.set(turn, bundle);
  return bundle;
}

// ── Validate each call ──────────────────────────────────────────────
let matched = 0, mismatched = 0;
const mismatches = [];
const byGovt = new Map();

for (const c of calls) {
  const bundle = loadStateForTurn(c.turn);
  if (!bundle) continue;
  const state = { ...bundle.baseState };
  if (c.govtGlobals) state.govtGlobals = c.govtGlobals;
  if (c.knowsTechBytes) state.knowsTechBytes = c.knowsTechBytes;
  let v3Val;
  try {
    v3Val = canUseGovernment(state, c.civSlot, c.govtIndex) ? 1 : 0;
  } catch (e) {
    mismatches.push({ ...c, v3Val: 'threw', err: e.message });
    continue;
  }
  const binaryVal = c.retval ? 1 : 0;
  const key = c.govtIndex;
  if (!byGovt.has(key)) byGovt.set(key, { m: 0, n: 0 });
  const bucket = byGovt.get(key);
  if (v3Val === binaryVal) { matched++; bucket.m++; }
  else { mismatched++; mismatches.push({ ...c, v3Val }); }
  bucket.n++;
}

console.log(`\n=== canUseGovernment fidelity: ${matched}/${calls.length} matches (${(100*matched/calls.length).toFixed(1)}%) ===`);
const GOVT_NAMES = ['anarchy', 'despotism', 'monarchy', 'communism', 'fundamentalism', 'republic', 'democracy'];
console.log(`\nBy govt index:`);
for (const [k, v] of [...byGovt.entries()].sort((a,b)=>a[0]-b[0])) {
  console.log(`  ${k} ${GOVT_NAMES[k] ?? '?'}: ${v.m}/${v.n}`);
}

if (mismatches.length) {
  console.log(`\nFirst 20 mismatches:`);
  for (const m of mismatches.slice(0, 20)) {
    console.log(`  turn=${m.turn} civ=${m.civSlot} govt=${m.govtIndex} (${GOVT_NAMES[m.govtIndex]}): binary=${m.retval}, v3=${m.v3Val}`);
  }
}
