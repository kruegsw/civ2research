#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// watch-snapshots.js — Live fidelity monitor for a running Civ2 game
//
// While sniff-game.py is running alongside a live Civ2 session, it
// auto-dumps CIV2SNAP binaries into charlizationv4/snapshots/game_*/
// on every turn change. This watcher detects each new snapshot and:
//
//   1. Runs the v4 harness on the PREVIOUS snapshot with --turns 1
//      to produce a "predicted next turn" state.
//   2. Loads the NEW snapshot as "actual next turn" state.
//   3. Diffs them. Writes a per-turn log + cumulative session summary.
//
// No .sav files needed. No manual saving. Just play, watcher reports.
//
// Usage: node charlizationv4/watch-snapshots.js [--session <name>]
//
//   --session <name>  Watch a specific session dir under snapshots/.
//                     Default: newest session containing snapshots.
// ═══════════════════════════════════════════════════════════════════

import { spawnSync } from 'child_process';
import { readdirSync, statSync, existsSync, writeFileSync, appendFileSync, mkdirSync } from 'fs';
import { dirname, join, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SNAPSHOTS_DIR = join(__dirname, 'snapshots');
const GAPS_DIR = join(__dirname, 'fidelity_gaps');
mkdirSync(GAPS_DIR, { recursive: true });

// ── CLI args ────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const sessionArg = args.find(a => a === '--session');
const sessionName = sessionArg ? args[args.indexOf('--session') + 1] : null;
const pollMs = 2000;

// ── Session selection ─────────────────────────────────────────────

function findNewestSession() {
  const sessions = readdirSync(SNAPSHOTS_DIR)
    .filter(n => n.startsWith('game_'))
    .map(n => ({ name: n, path: join(SNAPSHOTS_DIR, n), mtime: statSync(join(SNAPSHOTS_DIR, n)).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime);
  return sessions[0]?.name ?? null;
}

// If --session was passed, pin to that dir. Otherwise follow the newest
// session dir live — so starting a new Civ2 game (which creates a new
// game_<date>_<time>/ directory) doesn't leave the watcher stuck on
// the old one.
const FOLLOW_NEWEST = !sessionName;
let SESSION = sessionName || findNewestSession();
if (!SESSION) {
  console.error('No sessions found under', SNAPSHOTS_DIR);
  process.exit(1);
}
let SESSION_DIR = join(SNAPSHOTS_DIR, SESSION);
if (!existsSync(SESSION_DIR)) {
  console.error(`Session dir does not exist: ${SESSION_DIR}`);
  process.exit(1);
}

let LOG_FILE = join(GAPS_DIR, `live_${SESSION}.log`);
writeFileSync(LOG_FILE, `=== Live fidelity monitor session ${SESSION} started at ${new Date().toISOString()} ===\n\n`);

console.log(`[watch] Session: ${SESSION}${FOLLOW_NEWEST ? ' (auto-follow)' : ' (pinned)'}`);
console.log(`[watch] Dir:     ${SESSION_DIR}`);
console.log(`[watch] Log:     ${LOG_FILE}`);
console.log(`[watch] Polling every ${pollMs}ms for new turn dumps...`);

// ── Snapshot enumeration ──────────────────────────────────────────

// Filenames look like: turn_0006_80x50_deity.bin
const TURN_RE = /^turn_(\d+)_[^_]+_\w+\.bin$/;

function listTurns() {
  if (!existsSync(SESSION_DIR)) return [];
  return readdirSync(SESSION_DIR)
    .map(n => {
      const m = n.match(TURN_RE);
      if (!m) return null;
      const turn = parseInt(m[1], 10);
      const path = join(SESSION_DIR, n);
      // Skip the pre-game placeholder (all zeros; filename like turn_0000_0x0_chieftain.bin)
      if (n.includes('_0x0_')) return null;
      return { turn, name: n, path };
    })
    .filter(Boolean)
    .sort((a, b) => a.turn - b.turn);
}

// ── Diff runner ──────────────────────────────────────────────────

function runDiff(prevSnap, currSnap) {
  // 1. Predict: load prev snapshot, run 1 turn
  const predictedJson = join(GAPS_DIR, `live_${SESSION}_predicted_turn${currSnap.turn}.json`);
  const actualJson    = join(GAPS_DIR, `live_${SESSION}_actual_turn${currSnap.turn}.json`);

  // Use --no-v4-bridge (much faster, v4-bridge has cross-civ contamination
  // bugs) and --replay with the session's events.jsonl if present — feeds
  // real Civ2 AI decisions into the engine so the diff reflects only
  // deterministic-mechanic bugs, not AI-heuristic drift.
  const eventsPath = join(SESSION_DIR, 'events.jsonl');
  const predictArgs = [join(__dirname, 'dump-server-state.js'),
                       prevSnap.path, '--turns', '1', '--no-v4-bridge'];
  if (existsSync(eventsPath)) predictArgs.push('--replay', eventsPath);
  const pred = spawnSync('node', predictArgs,
    { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  if (pred.status !== 0) {
    return { ok: false, error: `predict step failed: ${pred.stderr?.slice(0, 300)}` };
  }
  writeFileSync(predictedJson, pred.stdout);

  const act = spawnSync('node',
    [join(__dirname, 'dump-server-state.js'), currSnap.path],
    { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  if (act.status !== 0) {
    return { ok: false, error: `actual step failed: ${act.stderr?.slice(0, 300)}` };
  }
  writeFileSync(actualJson, act.stdout);

  const diff = spawnSync('python',
    [join(__dirname, 'state-diff.py'), predictedJson, actualJson],
    { encoding: 'utf8' });
  return { ok: true, stdout: diff.stdout, exit: diff.status };
}

// ── Main watch loop ──────────────────────────────────────────────

let lastSeenTurn = -1;
// Initialize from any existing snapshots so we only act on NEW ones
const initial = listTurns();
if (initial.length > 0) {
  lastSeenTurn = initial[initial.length - 1].turn;
  console.log(`[watch] Existing snapshots found up to turn ${lastSeenTurn}; waiting for next…`);
}

function tick() {
  // Auto-follow: if a newer session dir appeared since we started (e.g.,
  // user closed Civ2 and started a new game), switch to it.
  if (FOLLOW_NEWEST) {
    const newest = findNewestSession();
    if (newest && newest !== SESSION) {
      console.log(`[watch] session changed: ${SESSION} -> ${newest}`);
      SESSION = newest;
      SESSION_DIR = join(SNAPSHOTS_DIR, SESSION);
      LOG_FILE = join(GAPS_DIR, `live_${SESSION}.log`);
      writeFileSync(LOG_FILE, `=== Live fidelity monitor session ${SESSION} started at ${new Date().toISOString()} ===\n\n`);
      lastSeenTurn = -1;
      const initialNew = listTurns();
      if (initialNew.length > 0) lastSeenTurn = initialNew[initialNew.length - 1].turn;
    }
  }
  const turns = listTurns();
  if (turns.length === 0) return;
  const newest = turns[turns.length - 1];
  if (newest.turn <= lastSeenTurn) return;

  // A new turn appeared! Find the PREVIOUS turn to diff from
  const prevIdx = turns.findIndex(t => t.turn === newest.turn) - 1;
  const prev = prevIdx >= 0 ? turns[prevIdx] : null;

  if (!prev) {
    console.log(`[watch] turn ${newest.turn} seen but no previous turn in session yet — skipping.`);
    lastSeenTurn = newest.turn;
    return;
  }

  const banner = `\n── turn ${prev.turn} → ${newest.turn}   (${new Date().toISOString()})`;
  console.log(banner);
  appendFileSync(LOG_FILE, banner + '\n');

  const result = runDiff(prev, newest);
  if (!result.ok) {
    const msg = `[watch] diff FAILED: ${result.error}`;
    console.log(msg);
    appendFileSync(LOG_FILE, msg + '\n');
  } else {
    // Extract the summary portion (last ~40 lines usually)
    const lines = result.stdout.split('\n');
    const summaryStart = lines.findIndex(l => l.startsWith('Mismatches by category'));
    const summary = summaryStart >= 0 ? lines.slice(summaryStart).join('\n') : lines.slice(-20).join('\n');
    console.log(summary);
    appendFileSync(LOG_FILE, result.stdout + '\n');
  }

  lastSeenTurn = newest.turn;
}

setInterval(tick, pollMs);
// Print a heartbeat every 30s so user knows we're alive
setInterval(() => console.log(`[watch] still watching (lastSeen=turn ${lastSeenTurn})`), 30_000);
