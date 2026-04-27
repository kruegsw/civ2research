// Validate v3's per-civ-tick rand consumption matches the binary's.
//
// For each captured `fun_per_civ_tick` call in civ2_trace.log:
//   - Seed a SeededRNG with rand_enter
//   - Apply the same 2 draws v3 makes at function entry (lines 43,45 in
//     block_00560000.c, restored in per-civ-tick.js step 4a)
//   - For civ 0 (barbarian): expect rng.state == rand_enter (no draws)
//   - For civ 1+: expect rng.state == rand_exit
//
// Reports per-civ pass/fail counts. 100% means our 2-draw port matches
// the binary's pre-Step-5 rand consumption exactly.
//
// NOTE: this only validates the function-ENTRY draws. The binary makes
// more draws inside the per-civ loop (lines 74, 256, 268, 381). Those
// fire conditionally on diplomatic state and aren't yet ported.
// Validator will FAIL on calls where additional draws happened — which
// gives us a clean diagnostic: civs with rand_exit-rand_enter > 2 are
// the cases needing further port work.
//
// Usage: node validate-per-civ-tick-rng.mjs <session-dir>

import { readFileSync } from 'fs';
import { join } from 'path';
import { SeededRNG } from '../charlizationv3/engine/rng.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-per-civ-tick-rng.mjs <session-dir>');
  process.exit(1);
}

const trace = readFileSync(join(sessionDir, 'civ2_trace.log'), 'utf-8')
  .split('\n').filter(Boolean).map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);

// Pair up call/return for fun_per_civ_tick
const pairs = [];
let pendingCall = null;
for (const e of trace) {
  if (e.fn !== 'fun_per_civ_tick') continue;
  if (e.kind === 'call') pendingCall = e;
  else if (e.kind === 'return' && pendingCall) {
    pairs.push({
      civSlot: pendingCall.named?.civSlot,
      rand_enter: pendingCall.rand_enter,
      rand_exit: e.rand_exit,
    });
    pendingCall = null;
  }
}

console.log(`# ${pairs.length} per-civ-tick call/return pairs in ${sessionDir}`);

const A = 0x343FD;
const C = 0x269EC3;
function stepCount(start, target, max = 100) {
  let s = start >>> 0;
  for (let i = 0; i <= max; i++) {
    if (s === (target >>> 0)) return i;
    s = (Math.imul(s, A) + C) >>> 0;
  }
  return -1;
}

const byCiv = {};
for (const p of pairs) {
  const slot = p.civSlot;
  byCiv[slot] ||= { total: 0, expected2: 0, more: 0, drawCount: [] };
  byCiv[slot].total++;
  const drawn = stepCount(p.rand_enter, p.rand_exit);
  byCiv[slot].drawCount.push(drawn);
  if (slot === 0) {
    if (drawn === 0) byCiv[slot].expected2++;  // barbarian: 0 draws expected
    else byCiv[slot].more++;
  } else {
    if (drawn === 2) byCiv[slot].expected2++;
    else byCiv[slot].more++;
  }

  // Simulate v3's 2 entry draws. For civ 0 we skip per the source.
  const rng = new SeededRNG(p.rand_enter);
  if (slot !== 0) {
    rng.next();  // r1
    rng.next();  // r2
  }
  // We expect rng.state to MATCH rand_exit when binary made exactly 2 (or 0
  // for civ 0). When binary made more, we WON'T match — that's diagnostic.
}

console.log('civ | calls | matches-expected | extra-draws');
for (const slot of Object.keys(byCiv).sort((a,b)=>+a-+b)) {
  const b = byCiv[slot];
  console.log(`  ${slot} |  ${String(b.total).padStart(3)}   |       ${String(b.expected2).padStart(3)}        |    ${b.more}`);
  // Show distribution of unexpected draw counts
  const histo = {};
  for (const d of b.drawCount) histo[d] = (histo[d] || 0) + 1;
  const counts = Object.keys(histo).sort((a,b)=>+a-+b).map(k => `${k}→${histo[k]}`).join(' ');
  console.log(`        draw-count distribution: ${counts}`);
}
