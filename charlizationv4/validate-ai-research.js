#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// validate-ai-research.js — Pick-for-pick validation of v3's
// research-target AI port against binary's FUN_004c09b0.
//
// Reads a session's civ2_trace.log for ai_research_pick call/return
// event pairs (added via captureRand in trace_civ2.js). For each
// pair:
//   1. Load the session's turn_0000.bin as v3 state.
//   2. Seed v3's SeededRNG with the binary's holdrand at entry.
//   3. Call v3's pickResearchGoal with that state.
//   4. Compare v3's pick to binary's retval.
//
// Match percentage = actual AI-port fidelity. Anything less than 100%
// is a logic divergence between v3's port and FUN_004c09b0.
//
// Usage: node validate-ai-research.js <session_dir>
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { initFromSav } from '../charlizationv3/engine/init.js';
import { SeededRNG } from '../charlizationv3/engine/rng.js';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { buildSav } from './sav-from-mem.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-ai-research.js <snapshots/game_YYYYMMDD_HHMMSS>');
  process.exit(1);
}
if (!existsSync(sessionDir)) {
  console.error(`Session dir not found: ${sessionDir}`);
  process.exit(1);
}

// ── Parse civ2_trace.log ─────────────────────────────────────────
const tracePath = join(sessionDir, 'civ2_trace.log');
if (!existsSync(tracePath)) {
  console.error(`No civ2_trace.log in ${sessionDir}`);
  process.exit(1);
}

const calls = [];
let pendingCall = null;
let currentTurn = 0;

for (const line of readFileSync(tracePath, 'utf8').split(/\r?\n/).filter(Boolean)) {
  let ev;
  try { ev = JSON.parse(line); } catch { continue; }
  if (ev.source === 'sniffer' && ev.event === 'TURN_ADVANCED' && ev.turn != null) {
    currentTurn = ev.turn;
    continue;
  }
  if (ev.source !== 'frida') continue;
  if (ev.kind === 'call' && ev.fn === 'ai_research_pick') {
    pendingCall = {
      turn: currentTurn,
      civSlot: ev.named?.civSlot ?? ev.args?.[0],
      rand_enter: ev.rand_enter >>> 0,
      time_ms: ev.time_ms,
    };
  } else if (ev.kind === 'return' && ev.fn === 'ai_research_pick' && pendingCall) {
    calls.push({
      ...pendingCall,
      rand_exit: ev.rand_exit >>> 0,
      retval: ev.retval,
    });
    pendingCall = null;
  }
}

console.log(`Loaded ${calls.length} ai_research_pick call/return pairs`);
if (calls.length === 0) {
  console.error('No matching events. Is the Frida agent running with captureRand on FUN_004c09b0?');
  process.exit(1);
}

// ── Load the initial snapshot as v3 state (one-time setup) ──────────
// For init-time picks at turn 0-1, turn_0000.bin is the right input.
// For later picks (tech completions), we'd need to load the
// closest snapshot — future refinement.
const initSnap = join(sessionDir, 'turn_0000_80x50_deity.bin');
if (!existsSync(initSnap)) {
  console.error(`No turn_0000.bin in ${sessionDir}`);
  process.exit(1);
}

loadSnapshotIntoMem(initSnap);
const savBuf = buildSav();
const parsed = Civ2Parser.parse(savBuf, initSnap);
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
const baseState = initResult.gameState;
const mapBase = initResult.mapBase;

// Import after state is ready
const econai = await import('../charlizationv3/engine/ai/econai.js');

// ── Validate each captured call ─────────────────────────────────────
let matched = 0, mismatched = 0;
const mismatches = [];

for (const c of calls) {
  // Clone state (shallow) so each validation is independent
  const state = { ...baseState, rng: new SeededRNG(c.rand_enter) };
  let v3Pick;
  try {
    v3Pick = econai.pickResearchGoal
      ? econai.pickResearchGoal(c.civSlot, state, mapBase)
      : econai.chooseResearch(state, mapBase, c.civSlot)?.advanceId;
  } catch (e) {
    console.error(`  turn=${c.turn} civ=${c.civSlot}: threw ${e.message}`);
    mismatches.push({ ...c, v3Pick: 'threw', err: e.message });
    continue;
  }

  if (v3Pick === c.retval) {
    matched++;
  } else {
    mismatched++;
    mismatches.push({ ...c, v3Pick });
  }
}

console.log(`\n=== Port fidelity: ${matched}/${calls.length} matches ===`);
if (mismatched > 0) {
  console.log(`\nMismatches:`);
  for (const m of mismatches) {
    console.log(`  turn=${m.turn} civ=${m.civSlot} rand_enter=0x${(m.rand_enter>>>0).toString(16)} binary=${m.retval} v3=${m.v3Pick}`);
  }
}
