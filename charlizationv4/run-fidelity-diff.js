#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// run-fidelity-diff.js — One-shot fidelity diff pipeline
//
// Usage:
//   node run-fidelity-diff.js <save.sav> <snapshot.bin> [--turns N]
//   node run-fidelity-diff.js --self <save.sav> [--turns N]
//
// --turns N runs END_TURN N times in v4 before dumping. Use this to
// compare "v4 after N turns" against "real Civ2 after N turns" (the
// snapshot must come from a matching point in real Civ2).
//
// Runs all three pipeline stages and drops outputs in fidelity_gaps/:
//   1. dump-server-state.js <save.sav>          → v4_<tag>.json
//   2. snapshot-to-state-json.py <snapshot.bin> → real_<tag>.json
//   3. state-diff.py v4_<tag>.json real_<tag>.json → stdout + .log file
//
// <tag> is derived from the save filename. Existing tagged files are
// overwritten. Exit code 0 if all fields match, 1 if any mismatch.
// ═══════════════════════════════════════════════════════════════════

import { spawnSync } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, 'fidelity_gaps');

function usage() {
  console.error('Usage: node run-fidelity-diff.js <save.sav> <snapshot.bin>');
  console.error('       node run-fidelity-diff.js --self <save.sav>');
  process.exit(2);
}

const args = process.argv.slice(2);
const selfMode = args.includes('--self');
const turnsArg = args.find(a => a.startsWith('--turns'));
const turnsFlag = turnsArg
  ? ['--turns', (turnsArg.includes('=')
      ? turnsArg.split('=')[1]
      : args[args.indexOf(turnsArg) + 1])]
  : [];
// Remove --turns and its value from positional args
const positional = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--self') continue;
  if (args[i].startsWith('--turns=')) continue;
  if (args[i] === '--turns') { i++; continue; }
  if (args[i].startsWith('--')) continue;
  positional.push(args[i]);
}

if (selfMode && positional.length !== 1) usage();
if (!selfMode && positional.length !== 2) usage();

mkdirSync(OUT_DIR, { recursive: true });

const savPath = positional[0];
const turnsN = turnsFlag.length ? parseInt(turnsFlag[1]) : 0;
const tag = basename(savPath).replace(/\.(sav|SAV|scn|SCN|net|NET)$/i, '')
  .replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 40) +
  (turnsN > 0 ? `_N${turnsN}` : '_N0');
const v4Json = join(OUT_DIR, `v4_${tag}.json`);

function run(cmd, argv, opts = {}) {
  const r = spawnSync(cmd, argv, { stdio: ['ignore', 'pipe', 'pipe'], ...opts });
  if (r.status !== 0) {
    console.error(`[run-fidelity-diff] ${cmd} ${argv.join(' ')} failed (${r.status})`);
    if (r.stderr) process.stderr.write(r.stderr);
    process.exit(r.status || 1);
  }
  return r.stdout.toString('utf8');
}

// ── Side B: v4 server state ──
console.error(`[1/3] Dumping v4 state from ${savPath}${turnsN > 0 ? ` (N=${turnsN} turns)` : ''} …`);
const v4Out = run('node', [join(__dirname, 'dump-server-state.js'), savPath, ...turnsFlag]);
writeFileSync(v4Json, v4Out);
console.error(`      → ${v4Json} (${v4Out.length.toLocaleString()} bytes)`);

// ── Side A: sniffer snapshot → JSON ──
let realJson;
if (selfMode) {
  realJson = v4Json;
  console.error(`[2/3] Self-diff mode — comparing v4 against itself`);
} else {
  const snapPath = positional[1];
  realJson = join(OUT_DIR, `real_${tag}.json`);
  console.error(`[2/3] Parsing sniffer snapshot ${snapPath} …`);
  const realOut = run('python', [join(__dirname, 'snapshot-to-state-json.py'), snapPath]);
  writeFileSync(realJson, realOut);
  console.error(`      → ${realJson} (${realOut.length.toLocaleString()} bytes)`);
}

// ── Diff ──
console.error(`[3/3] Running state-diff …`);
const diffResult = spawnSync('python', [
  join(__dirname, 'state-diff.py'), v4Json, realJson,
], { stdio: ['ignore', 'pipe', 'pipe'] });

const diffOut = diffResult.stdout.toString('utf8');
const diffLog = join(OUT_DIR, `diff_${tag}.log`);
writeFileSync(diffLog, diffOut);

process.stdout.write(diffOut);
console.error(`\n[done] Diff log saved: ${diffLog}`);

process.exit(diffResult.status || 0);
