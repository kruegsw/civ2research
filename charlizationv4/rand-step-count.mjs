// Count how many `_rand()` calls the binary made between two snapshots.
// MSVC LCG: holdrand = holdrand * 0x343FD + 0x269EC3 (mod 2^32).
// Given start_seed and end_seed, walk forward step-by-step and count
// how many steps it takes to reach end_seed. Bounded scan; fails if
// the gap is larger than the limit (means many rand calls between).
//
// Usage: node rand-step-count.mjs <session-dir> [maxSteps]
//   Reads each turn_NNNN_*.bin, extracts MSVC rand seed, and reports
//   inter-turn step counts. Useful to characterize "how much rand
//   activity per turn" without Frida instrumentation.

import { loadSnapshotIntoMem } from './load-snapshot.js';
import { readdirSync } from 'fs';
import { join } from 'path';

const A = 0x343FD;
const C = 0x269EC3;

function step(s) { return (Math.imul(s, A) + C) >>> 0; }

function countSteps(start, target, maxSteps = 1000000) {
  let s = start >>> 0;
  for (let i = 0; i <= maxSteps; i++) {
    if (s === (target >>> 0)) return i;
    s = step(s);
  }
  return -1;
}

const sessionDir = process.argv[2];
const maxSteps = parseInt(process.argv[3] || '1000000', 10);
if (!sessionDir) {
  console.error('Usage: node rand-step-count.mjs <session-dir> [maxSteps]');
  process.exit(1);
}

const files = readdirSync(sessionDir)
  .filter(f => /^turn_\d{4}_/.test(f))
  .sort();

const snaps = [];
for (const f of files) {
  try {
    const info = loadSnapshotIntoMem(join(sessionDir, f));
    if (info.randSeed != null) {
      const m = f.match(/turn_(\d{4})_/);
      snaps.push({ turn: parseInt(m[1], 10), seed: info.randSeed >>> 0, file: f });
    }
  } catch (_) { /* skip */ }
}

console.log(`# ${snaps.length} snapshots in ${sessionDir}`);
console.log('# turn -> next  steps  start_seed -> end_seed');
let totalSteps = 0;
let pairs = 0;
let unsolved = 0;
for (let i = 0; i < snaps.length - 1; i++) {
  const a = snaps[i], b = snaps[i+1];
  const n = countSteps(a.seed, b.seed, maxSteps);
  pairs++;
  if (n < 0) {
    unsolved++;
    console.log(`${a.turn}->${b.turn} ?  0x${a.seed.toString(16).padStart(8,'0')} -> 0x${b.seed.toString(16).padStart(8,'0')}`);
  } else {
    totalSteps += n;
    console.log(`${a.turn}->${b.turn} ${n}  0x${a.seed.toString(16).padStart(8,'0')} -> 0x${b.seed.toString(16).padStart(8,'0')}`);
  }
}
console.log(`# total: ${totalSteps} rand calls across ${pairs - unsolved}/${pairs} solvable pairs (unsolved: ${unsolved}, gap > ${maxSteps})`);
console.log(`# avg: ${pairs > 0 ? (totalSteps / (pairs - unsolved)).toFixed(0) : 0} rand calls per turn`);
