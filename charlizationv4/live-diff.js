#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// live-diff.js — watch a session dir for new snapshots and run a
// per-turn-pair fidelity diff in real-time. Prints concise divergence
// output as you play.
//
// Usage:
//   node live-diff.js <session_dir>           # tail given session
//   node live-diff.js                          # auto-follow newest
//   node live-diff.js <session> --once         # one-shot, all turns
//   node live-diff.js <session> -v             # verbose (show novel)
//
// Flow per new snapshot N:
//   1. Run dump-server-state on turn_(N-1) with --turns 1 + --replay
//   2. Parse turn_N via snapshot-to-state-json
//   3. Diff via state-diff.py
//   4. Print Matched/Mismatches summary + top divergences
//
// Since each diff covers only ONE turn (the most recent), v3
// divergence shows up immediately. Pair this with playing a single
// turn at a time to pinpoint which event caused which mismatch.
// ═══════════════════════════════════════════════════════════════════

import { spawnSync } from 'child_process';
import { readdirSync, existsSync, statSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_ROOT = join(__dirname, 'snapshots');
const TMP = tmpdir();

const args = process.argv.slice(2);
const onceMode = args.includes('--once');
const verbose = args.includes('-v') || args.includes('--verbose');
const positional = args.filter(a => !a.startsWith('-'));

function newestSession() {
  const games = readdirSync(SNAPSHOT_ROOT)
    .filter(d => d.startsWith('game_'))
    .map(d => ({ d, mtime: statSync(join(SNAPSHOT_ROOT, d)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  return games.length ? join(SNAPSHOT_ROOT, games[0].d) : null;
}

let sessionDir = positional[0] || newestSession();
if (!sessionDir) {
  console.error('No session dir found under', SNAPSHOT_ROOT);
  process.exit(1);
}
if (!existsSync(sessionDir)) {
  console.error('Session dir does not exist:', sessionDir);
  process.exit(1);
}

const eventsPath = join(sessionDir, 'events.jsonl');
const tracePath = join(sessionDir, 'civ2_trace.log');
const hasEvents = existsSync(eventsPath);
const hasTrace = existsSync(tracePath);

console.log('━'.repeat(72));
console.log(`live-diff watching ${sessionDir}`);
console.log(`  Events: ${hasEvents ? 'yes' : 'no'}`);
console.log(`  Frida:  ${hasTrace ? 'yes' : 'no'}`);
console.log(`  Mode:   ${onceMode ? 'one-shot' : 'tailing for new snapshots'}`);
console.log('━'.repeat(72));

function getSnapshots() {
  if (!existsSync(sessionDir)) return [];
  return readdirSync(sessionDir)
    .filter(f => /^turn_(\d{4})_.*\.bin$/.test(f))
    .map(f => {
      const m = f.match(/^turn_(\d{4})_/);
      return { file: f, turn: parseInt(m[1]) };
    })
    .sort((a, b) => a.turn - b.turn);
}

function pad(n, w) { return String(n).padStart(w); }
function pct(matched, total) {
  if (!total) return '0.0%';
  return ((matched / total) * 100).toFixed(1) + '%';
}

function runDiff(prevSnap, currSnap) {
  const prevPath = join(sessionDir, prevSnap.file);
  const currPath = join(sessionDir, currSnap.file);
  const turnsArg = currSnap.turn - prevSnap.turn;

  const dssArgs = [
    join(__dirname, 'dump-server-state.js'),
    prevPath,
    '--turns', String(turnsArg),
  ];
  if (hasEvents) dssArgs.push('--replay', eventsPath);
  if (hasTrace) dssArgs.push('--replay-frida', tracePath);

  const dss = spawnSync('node', dssArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
  if (dss.status !== 0) {
    return { error: 'dump-server-state failed: ' + dss.stderr.toString().slice(0, 300) };
  }

  const sts = spawnSync('python', [
    join(__dirname, 'snapshot-to-state-json.py'), currPath,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  if (sts.status !== 0) {
    return { error: 'snapshot-to-state-json failed: ' + sts.stderr.toString().slice(0, 300) };
  }

  const v4Json = join(TMP, `livediff_v4_${currSnap.turn}.json`);
  const realJson = join(TMP, `livediff_real_${currSnap.turn}.json`);
  writeFileSync(v4Json, dss.stdout);
  writeFileSync(realJson, sts.stdout);

  const diff = spawnSync('python', [
    join(__dirname, 'state-diff.py'), v4Json, realJson,
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  return { diffOut: diff.stdout.toString() };
}

function summarize(diffOut, prevTurn, currTurn) {
  const lines = diffOut.split('\n');
  let matched = '?', total = '?', mismatches = '?';
  const m = diffOut.match(/Matched: (\d+)\/(\d+) fields\s+\((\d+) mismatches\)/);
  if (m) { matched = m[1]; total = m[2]; mismatches = m[3]; }

  // Tag bucket counts
  const buckets = [];
  for (const line of lines) {
    const bm = line.match(/^\s+\[(\S[^\]]*?)\]\s+(\d+) mismatches?/);
    if (bm) buckets.push([bm[1].trim(), parseInt(bm[2])]);
  }

  // Top novel mismatches under "Novel mismatches"
  const novelLines = [];
  let inNovel = false;
  for (const line of lines) {
    if (/^Novel mismatches/.test(line)) { inNovel = true; continue; }
    if (!inNovel) continue;
    if (line.match(/^\s{20,}/)) novelLines.push(line.trim());
  }

  const range = `${pad(prevTurn, 3)}→${pad(currTurn, 3)}`;
  const fidStr = total !== '?' ? pct(parseInt(matched), parseInt(total)) : '?';
  console.log();
  console.log(`▶ ${range}  ${matched}/${total}  (${mismatches} mm)  ${fidStr}`);

  if (buckets.length > 0) {
    const topBuckets = buckets
      .filter(b => !['per-civ', 'per-unit', 'per-city', 'structural', 'top-level'].includes(b[0]))
      .filter(b => b[1] >= 1)
      .slice(0, 5);
    if (topBuckets.length > 0) {
      console.log('  tags: ' + topBuckets.map(b => `${b[0]}=${b[1]}`).join('  '));
    }
    const novelBuckets = buckets
      .filter(b => ['per-civ', 'per-unit', 'per-city', 'structural', 'top-level'].includes(b[0]))
      .filter(b => b[1] >= 1);
    if (novelBuckets.length > 0) {
      console.log('  novel: ' + novelBuckets.map(b => `${b[0]}=${b[1]}`).join('  '));
    }
  }
  if (verbose && novelLines.length > 0) {
    console.log('  detail:');
    for (const ln of novelLines.slice(0, 8)) {
      console.log('    ' + ln.slice(0, 110));
    }
  }
}

const processedTurns = new Set();

function tick() {
  const snaps = getSnapshots();
  if (snaps.length < 2) return;

  for (let i = 1; i < snaps.length; i++) {
    const curr = snaps[i];
    if (processedTurns.has(curr.turn)) continue;
    const prev = snaps[i - 1];
    const result = runDiff(prev, curr);
    if (result?.error) {
      console.log(`▶ ${pad(prev.turn, 3)}→${pad(curr.turn, 3)}  [error] ${result.error.slice(0, 140)}`);
    } else if (result?.diffOut) {
      summarize(result.diffOut, prev.turn, curr.turn);
    }
    processedTurns.add(curr.turn);
  }
}

if (onceMode) {
  tick();
  console.log('\n' + '━'.repeat(72));
  console.log(`Done. ${processedTurns.size} turn-pairs processed.`);
} else {
  console.log('Tailing... press Ctrl-C to stop.\n');
  tick();
  setInterval(tick, 2000);
}
