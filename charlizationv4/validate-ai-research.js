#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// validate-ai-research.js — Pick-for-pick validation of v3's
// research-target AI port against binary's FUN_004c09b0.
//
// Reads a session's civ2_trace.log for ai_research_pick call/return
// event pairs (added via captureRand in trace_civ2.js). For each
// pair:
//   1. Load the corresponding turn's snapshot as v3 state.
//   2. Seed v3's SeededRNG with the binary's holdrand at entry.
//   3. Call v3's pickResearchGoal with that state.
//   4. Compare v3's pick to binary's retval.
//   5. Report match/mismatch + RNG exit-state delta.
//
// Match percentage = the actual AI-port fidelity. Anything less than
// 100% is a logic divergence between v3's port and FUN_004c09b0.
//
// Usage: node validate-ai-research.js <session_dir>
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { parseSnapshot } from './load-snapshot.js';
import { initFromSav } from '../charlizationv3/engine/init.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-ai-research.js <snapshots/game_YYYYMMDD_HHMMSS>');
  process.exit(1);
}
if (!existsSync(sessionDir)) {
  console.error(`Session dir not found: ${sessionDir}`);
  process.exit(1);
}

// ── Parse civ2_trace.log for ai_research_pick call/return pairs ─────
const tracePath = join(sessionDir, 'civ2_trace.log');
if (!existsSync(tracePath)) {
  console.error(`No civ2_trace.log in ${sessionDir} — needs a session captured with Frida running.`);
  process.exit(1);
}

const traceLines = readFileSync(tracePath, 'utf8').split(/\r?\n/).filter(Boolean);
const calls = [];
let pendingCall = null;
let currentTurn = 0;

for (const line of traceLines) {
  let ev;
  try { ev = JSON.parse(line); } catch { continue; }

  // Track turn changes via sniffer's TURN_ADVANCED events merged in.
  if (ev.source === 'sniffer' && ev.event === 'TURN_ADVANCED' && ev.turn != null) {
    currentTurn = ev.turn;
    continue;
  }

  if (ev.source !== 'frida') continue;

  if (ev.kind === 'call' && ev.fn === 'ai_research_pick') {
    pendingCall = {
      turn: currentTurn,
      civSlot: ev.named?.civSlot ?? ev.args?.[0],
      rand_enter: ev.rand_enter,
      time_ms: ev.time_ms,
    };
  } else if (ev.kind === 'return' && ev.fn === 'ai_research_pick' && pendingCall) {
    calls.push({
      ...pendingCall,
      rand_exit: ev.rand_exit,
      retval: ev.retval,
    });
    pendingCall = null;
  }
}

console.log(`Loaded ${calls.length} ai_research_pick call/return pairs from ${tracePath}`);
if (calls.length === 0) {
  console.error('No matching events. Is the Frida agent running with captureRand on FUN_004c09b0?');
  process.exit(1);
}

// ── For each call, load turn snapshot and run v3's pickResearchGoal ──
const { SeededRNG } = await import('../charlizationv3/engine/rng.js');
const econai = await import('../charlizationv3/engine/ai/econai.js');

// Group by turn so we load each snapshot once.
const byTurn = new Map();
for (const c of calls) {
  if (!byTurn.has(c.turn)) byTurn.set(c.turn, []);
  byTurn.get(c.turn).push(c);
}

let matched = 0, mismatched = 0, randMatched = 0, randMismatched = 0;
const mismatches = [];

for (const [turn, turnCalls] of [...byTurn.entries()].sort((a, b) => a[0] - b[0])) {
  const snapPath = join(sessionDir, `turn_${String(turn).padStart(4, '0')}_80x50_deity.bin`);
  if (!existsSync(snapPath)) {
    console.error(`  [skip] turn ${turn}: no snapshot ${snapPath}`);
    continue;
  }
  // Load into v3 state via the harness init path.
  loadSnapshotIntoMem(snapPath);
  // TODO: proper state init. For the stub, skip the full sim and
  // call pickResearchGoal against a synthesized state. This requires
  // a proper init adapter — deferred until session data is available.
  for (const c of turnCalls) {
    // Placeholder: require full integration
    console.log(`  turn=${turn} civ=${c.civSlot} rand_enter=${c.rand_enter?.toString(16)} binary_pick=${c.retval} rand_exit=${c.rand_exit?.toString(16)}`);
  }
}

console.log(`\nNOTE: Validator is a scaffold. It reads the trace correctly but doesn't yet invoke v3's pickResearchGoal — needs state init adapter. Build that after the first Frida+captureRand session provides real data.`);
