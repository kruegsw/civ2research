// Summarize captured fun_combat_resolve rand consumption.
//
// FUN_00580341 fires twice per UI-driven combat: a preview call (no
// rand draws, returns a status code) followed by the actual resolution
// call (multiple rand draws, returns final state). This tool pairs
// call/return events, step-counts the LCG forward from rand_enter to
// rand_exit, and reports per-pair details so we can see exactly how
// many `_rand()` calls each resolved combat consumes.
//
// Use this to:
//   1. Sanity-check that captureRand is firing on combat hooks.
//   2. Spot the actual-resolution pairs (draws > 0) for later v3 combat
//      lock-step validation.
//
// Usage: node summarize-combat-rng.mjs <session-dir>

import { readFileSync } from 'fs';
import { join } from 'path';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node summarize-combat-rng.mjs <session-dir>');
  process.exit(1);
}

const trace = readFileSync(join(sessionDir, 'civ2_trace.log'), 'utf-8')
  .split('\n').filter(Boolean).map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);

const A = 0x343FD;
const C = 0x269EC3;
function stepCount(start, target, max = 500) {
  let s = start >>> 0;
  for (let i = 0; i <= max; i++) {
    if (s === (target >>> 0)) return i;
    s = (Math.imul(s, A) + C) >>> 0;
  }
  return -1;
}

const pairs = [];
let pendingCall = null;
for (const e of trace) {
  if (e.fn !== 'fun_combat_resolve') continue;
  if (e.kind === 'call') pendingCall = e;
  else if (e.kind === 'return' && pendingCall) {
    pairs.push({
      time_ms: pendingCall.time_ms,
      args: pendingCall.args,
      unitIdx: pendingCall.named?.unitIdx,
      killerIdx: pendingCall.named?.killerIdx,
      rand_enter: pendingCall.rand_enter,
      rand_exit: e.rand_exit,
      retval: e.retval,
      dur_ms: e.dur_ms,
    });
    pendingCall = null;
  }
}

console.log(`# ${pairs.length} combat call/return pairs`);
console.log('idx | t_ms          | unitIdx | killerIdx | rv  | draws | rand_enter   | rand_exit');
console.log('----+---------------+---------+-----------+-----+-------+--------------+--------------');
let zero = 0, nonzero = 0, unknown = 0;
const drawsList = [];
for (let i = 0; i < pairs.length; i++) {
  const p = pairs[i];
  const draws = stepCount(p.rand_enter, p.rand_exit);
  if (draws === 0) zero++;
  else if (draws > 0) { nonzero++; drawsList.push(draws); }
  else unknown++;
  const drawCol = draws < 0 ? '>500?' : String(draws);
  console.log(
    ` ${String(i).padStart(2)} | ${p.time_ms} | ${String(p.unitIdx).padStart(7)} | ` +
    `${String(p.killerIdx).padStart(9)} | ${String(p.retval).padStart(3)} | ` +
    `${drawCol.padStart(5)} | 0x${(p.rand_enter >>> 0).toString(16).padStart(8, '0')} | ` +
    `0x${(p.rand_exit >>> 0).toString(16).padStart(8, '0')}`
  );
}
console.log('');
console.log(`Pairs total: ${pairs.length}`);
console.log(`  zero-draw (preview/cancelled): ${zero}`);
console.log(`  non-zero-draw (resolved):      ${nonzero}`);
console.log(`  unknown (>500 LCG steps):      ${unknown}`);
if (drawsList.length) {
  drawsList.sort((a, b) => a - b);
  const sum = drawsList.reduce((a, b) => a + b, 0);
  console.log(`  draws distribution: min=${drawsList[0]} max=${drawsList[drawsList.length - 1]} ` +
    `avg=${(sum / drawsList.length).toFixed(1)}`);
  console.log(`  draws values: ${drawsList.join(',')}`);
}
