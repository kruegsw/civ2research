#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// validate-food-strategy.js — byte-exact validation of foodStrategy
// against binary's FUN_004bd2a3.
//
// Pure function port — no snapshot loading needed; everything comes
// from the captured foodStrategyGlobals payload.
//
// Usage: node validate-food-strategy.js <session_dir>
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { foodStrategy } from '../charlizationv3/engine/ai/econai.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-food-strategy.js <session_dir>');
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
  if (ev.source !== 'frida' || ev.fn !== 'fun_food_strategy') continue;
  if (ev.kind === 'call') {
    pending = {
      turn,
      civSlot: ev.named?.civSlot ?? ev.args?.[0],
      foodStrategyGlobals: ev.foodStrategyGlobals,
    };
  } else if (ev.kind === 'return' && pending) {
    calls.push({ ...pending, retval: ev.retval });
    pending = null;
  }
}

console.log(`Loaded ${calls.length} fun_food_strategy call/return pairs`);
if (calls.length === 0) {
  console.error('No matching events.');
  process.exit(1);
}

let matched = 0, mismatched = 0;
const mismatches = [];
const byRetval = new Map();
for (const c of calls) {
  const v3 = foodStrategy({ foodStrategyGlobals: c.foodStrategyGlobals }, c.civSlot);
  const key = c.retval;
  if (!byRetval.has(key)) byRetval.set(key, { m: 0, n: 0 });
  const bucket = byRetval.get(key);
  bucket.n++;
  if (v3 === c.retval) { matched++; bucket.m++; }
  else { mismatched++; mismatches.push({ ...c, v3 }); }
}

console.log(`\n=== foodStrategy fidelity: ${matched}/${calls.length} matches (${(100*matched/calls.length).toFixed(1)}%) ===`);
console.log(`\nBy binary retval:`);
for (const [k, v] of [...byRetval.entries()].sort((a,b)=>a[0]-b[0])) {
  console.log(`  ${k}: ${v.m}/${v.n}`);
}
if (mismatches.length) {
  console.log(`\nFirst 20 mismatches:`);
  for (const m of mismatches.slice(0, 20)) {
    const g = m.foodStrategyGlobals;
    const s = g ? `govt=${g.civGovt} sci=${g.civSci} tax=${g.civTax} cities=${g.cities.length}` : '?';
    console.log(`  turn=${m.turn} civ=${m.civSlot} binary=${m.retval} v3=${m.v3} [${s}]`);
  }
}
