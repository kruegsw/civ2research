#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// validate-research-cost.js — byte-exact validation of
// calcResearchCostExact against binary's FUN_004c2788.
//
// Reads civ2_trace.log for fun_research_cost call/return pairs. Each
// call carries researchCostGlobals (per-civ + leader tech counts plus
// difficulty/scenario/cosmic bytes). Validator passes state straight
// to v3's calcResearchCostExact and compares against binary retval.
//
// Usage: node validate-research-cost.js <session_dir>
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { calcResearchCostExact } from '../charlizationv3/engine/research.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-research-cost.js <session_dir>');
  process.exit(1);
}

const tracePath = join(sessionDir, 'civ2_trace.log');
if (!existsSync(tracePath)) {
  console.error(`No civ2_trace.log in ${sessionDir}`);
  process.exit(1);
}

const calls = [];
let pending = null;
let turn = 0;
for (const line of readFileSync(tracePath, 'utf8').split(/\r?\n/).filter(Boolean)) {
  let ev;
  try { ev = JSON.parse(line); } catch { continue; }
  if (ev.source === 'sniffer' && ev.event === 'TURN_ADVANCED' && ev.turn != null) {
    turn = ev.turn; continue;
  }
  if (ev.source !== 'frida' || ev.fn !== 'fun_research_cost') continue;
  if (ev.kind === 'call') {
    pending = {
      turn,
      civSlot: ev.named?.civSlot ?? ev.args?.[0],
      researchCostGlobals: ev.researchCostGlobals,
    };
  } else if (ev.kind === 'return' && pending) {
    calls.push({ ...pending, retval: ev.retval });
    pending = null;
  }
}

console.log(`Loaded ${calls.length} fun_research_cost call/return pairs`);
if (calls.length === 0) {
  console.error('No matching events. Needs Frida agent with captureResearchCostGlobals.');
  process.exit(1);
}

// Pure function — no snapshot needed.
let matched = 0, mismatched = 0;
const mismatches = [];
const byDelta = new Map();
for (const c of calls) {
  if (!c.researchCostGlobals) {
    mismatched++;
    mismatches.push({ ...c, v3: 'no-globals' });
    continue;
  }
  const state = { researchCostGlobals: c.researchCostGlobals };
  let v3;
  try { v3 = calcResearchCostExact(state, c.civSlot); }
  catch (e) { mismatches.push({ ...c, v3: 'threw', err: e.message }); continue; }
  if (v3 === c.retval) matched++;
  else {
    mismatched++;
    mismatches.push({ ...c, v3 });
    const d = v3 - c.retval;
    byDelta.set(d, (byDelta.get(d) ?? 0) + 1);
  }
}

console.log(`\n=== calcResearchCost fidelity: ${matched}/${calls.length} matches (${(100*matched/calls.length).toFixed(1)}%) ===`);
if (byDelta.size) {
  console.log(`\nMismatches by delta (v3 - binary):`);
  for (const [d, n] of [...byDelta.entries()].sort((a,b)=>a[0]-b[0])) {
    console.log(`  ${d>=0?'+':''}${d}: ${n} cases`);
  }
}
if (mismatches.length) {
  console.log(`\nFirst 20 mismatches:`);
  for (const m of mismatches.slice(0, 20)) {
    const g = m.researchCostGlobals;
    const summary = g ? `uVar1=${(g.civAcqTechCount+g.civFutureTechCount)} leader=${(g.leaderAcqTechCount+g.leaderFutureTechCount)} diff=${g.difficulty} techCtr=${g.techCounter}` : '?';
    console.log(`  turn=${m.turn} civ=${m.civSlot} binary=${m.retval} v3=${m.v3} [${summary}]`);
  }
}
