#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// stress-test.js — Comprehensive error finder for v4 headless engine
//
// Loads multiple save files, runs many turns, captures every error,
// loop guard trigger, and state anomaly. Produces a prioritized
// bug report sorted by frequency and impact.
//
// Usage: node charlizationv4/stress-test.js [--turns N] [--saves DIR]
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { G } from './globals.js';
import { v, wv, w16, w32, s16, s32, u8, u16, ptrAdd, _MEM } from './mem.js';
import { loopReset, loopGuard } from './mem.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';
import { loadSav } from './sav-loader.js';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';

const turnsPerSave = parseInt(process.argv.find((a,i,arr) => arr[i-1] === '--turns') || '20');

// ── Load rules ──
initBinaryConstants();
const rulesPath = '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT';
loadRules(readFileSync(rulesPath, 'utf8'));

// ── Import headless turn functions ──
const { FUN_00488cef, FUN_00489292 } = await import('./blocks/block_00480000.js');
const { FUN_004f0a9c } = await import('./blocks/block_004F0000.js');
const { FUN_00560084 } = await import('./blocks/block_00560000.js');
const { FUN_0053184d } = await import('./blocks/block_00530000.js');
const { FUN_00543cd6 } = await import('./blocks/block_00540000.js');

// ���─ Error tracking ──
const errorCounts = {};  // key → { count, firstStack, firstSave, firstTurn }
const loopGuardHits = {}; // funcName:line → count
const anomalies = [];

// Patch loopGuard to track hits
const origLoopGuard = loopGuard;
const _loopCounts = new Map();
const _PER_LOOP_LIMIT = 100000;

// Override the module-level loopGuard by intercepting errors
function trackError(err, save, turn, civ, context) {
  const msg = err.message || String(err);
  // Extract function name from stack
  const stack = err.stack || '';
  const callerMatch = stack.split('\n')[1]?.match(/at (\w+)/);
  const caller = callerMatch ? callerMatch[1] : 'unknown';
  const key = `${msg.substring(0, 80)}|${caller}`;

  if (!errorCounts[key]) {
    errorCounts[key] = { count: 0, msg: msg.substring(0, 120), caller, firstStack: stack.split('\n').slice(0, 5).join('\n'), firstSave: save, firstTurn: turn, firstCiv: civ, context };
  }
  errorCounts[key].count++;
}

function trackLoopGuard(msg) {
  const match = msg.match(/LOOP_GUARD: (\w+) line (\d+)/);
  if (match) {
    const key = `${match[1]}:${match[2]}`;
    loopGuardHits[key] = (loopGuardHits[key] || 0) + 1;
  }
}

// ── Headless turn runner with error capture ──
function runTurnHeadless(civ, saveName, turnNum) {
  wv(DAT_00655b05, civ);
  wv(DAT_006d1da0, civ);
  loopReset();

  if (s32(DAT_0064c6a2, civ * 0x594) > 30000) w32(ptrAdd(DAT_0064c6a2, civ * 0x594), 0, 30000);
  if (s32(DAT_0064c6a2, civ * 0x594) < 0) w32(ptrAdd(DAT_0064c6a2, civ * 0x594), 0, 0);

  const fns = [
    ['FUN_00488cef', () => FUN_00488cef(civ)],
    ['per-city', () => {
      let idx = s16(DAT_00655b18, 0);
      while (--idx >= 0) {
        if (s32(DAT_0064f394, idx * 0x58) !== 0 && _MEM[DAT_0064f348 + idx * 0x58] === (civ & 0xFF))
          FUN_004f0a9c(idx);
      }
    }],
    ['FUN_00560084', () => FUN_00560084(civ)],
    ['FUN_0053184d', () => FUN_0053184d(civ)],
    ['FUN_00489292', () => FUN_00489292(civ, 0)],
    // FUN_00543cd6 skipped in stress test — rendering trampoline is slow headless
    // Use deep-diag.js for AI behavior testing (includes movement)
    // ['FUN_00543cd6', () => FUN_00543cd6()],
  ];

  for (const [name, fn] of fns) {
    try {
      fn();
    } catch (e) {
      if (e.message?.includes('LOOP_GUARD')) {
        trackLoopGuard(e.message);
      } else {
        trackError(e, saveName, turnNum, civ, name);
      }
    }
  }
}

// ── State snapshot for anomaly detection ──
function snapshot() {
  const units = s16(DAT_00655b16, 0);
  const cities = s16(DAT_00655b18, 0);
  const turn = s16(DAT_00655af8, 0);
  // Count alive units
  let aliveUnits = 0;
  for (let i = 0; i < Math.min(units, 2048); i++) {
    if (s32(DAT_0065610a, i * 0x20) !== 0) aliveUnits++;
  }
  // Count alive cities
  let aliveCities = 0;
  for (let i = 0; i < Math.min(cities, 256); i++) {
    if (s32(DAT_0064f394, i * 0x58) !== 0) aliveCities++;
  }
  // Treasury per civ
  const treasuries = [];
  for (let civ = 1; civ < 8; civ++) {
    treasuries.push(s32(DAT_0064c6a2, civ * 0x594));
  }
  return { units, cities, aliveUnits, aliveCities, turn, treasuries };
}

function checkAnomalies(before, after, saveName, turnNum) {
  // Unit count should never decrease dramatically (>50% loss in one turn)
  if (after.aliveUnits < before.aliveUnits * 0.5 && before.aliveUnits > 5) {
    anomalies.push({ save: saveName, turn: turnNum, type: 'UNIT_CRASH', detail: `Units ${before.aliveUnits}→${after.aliveUnits}` });
  }
  // City count should never decrease by more than 1 per turn per civ
  if (after.aliveCities < before.aliveCities - 7) {
    anomalies.push({ save: saveName, turn: turnNum, type: 'CITY_CRASH', detail: `Cities ${before.aliveCities}→${after.aliveCities}` });
  }
  // Treasury should not go astronomically negative
  for (let i = 0; i < 7; i++) {
    if (after.treasuries[i] < -10000) {
      anomalies.push({ save: saveName, turn: turnNum, type: 'TREASURY_BUG', detail: `Civ ${i+1}: treasury=${after.treasuries[i]}` });
    }
  }
  // Unit counter shouldn't exceed 2048
  if (after.units > 2048) {
    anomalies.push({ save: saveName, turn: turnNum, type: 'UNIT_OVERFLOW', detail: `Unit counter=${after.units}` });
  }
}

// ── Find save files ──
const saveDirs = [
  '/home/kruegsw/Code/civ2research/20260301_early-game-data',
  '/home/kruegsw/Code/civ2research/charlizationv3/public/saves',
];
const savFiles = [];
for (const dir of saveDirs) {
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir)) {
    if (/\.(sav|SAV)$/.test(f)) savFiles.push(join(dir, f));
  }
}
// Also add a few from the game folder
// Skip large game saves for faster iteration — use --all to include them
if (process.argv.includes('--all')) {
  const gameDir = '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition';
  if (existsSync(gameDir)) {
    const gameFiles = readdirSync(gameDir).filter(f => /\.(sav|SAV)$/.test(f)).slice(0, 5);
    for (const f of gameFiles) savFiles.push(join(gameDir, f));
  }
}

console.log(`\n═══ Stress Test: ${savFiles.length} saves × ${turnsPerSave} turns ═══\n`);

// ── Run tests ──
let totalTurns = 0;
let totalTime = 0;

for (const savPath of savFiles) {
  const name = basename(savPath);

  // Reload fresh state
  initBinaryConstants();
  loadRules(readFileSync(rulesPath, 'utf8'));

  try {
    loadSav(readFileSync(savPath));
  } catch (e) {
    trackError(e, name, 0, 0, 'loadSav');
    continue;
  }

  const initTurn = s16(DAT_00655af8, 0);
  const initUnits = s16(DAT_00655b16, 0);
  const initCities = s16(DAT_00655b18, 0);

  process.stderr.write(`${name}: turn ${initTurn}, ${initUnits}U/${initCities}C ... `);

  const saveStart = Date.now();
  let turnsCompleted = 0;

  for (let t = 0; t < turnsPerSave; t++) {
    const before = snapshot();
    const turnStart = Date.now();

    for (let civ = 1; civ < 8; civ++) {
      if (!(_MEM[DAT_00655b0a] & (1 << civ))) continue; // skip dead civs
      runTurnHeadless(civ, name, initTurn + t + 1);
    }
    wv(DAT_00655af8, v(DAT_00655af8) + 1);

    const turnMs = Date.now() - turnStart;
    const after = snapshot();
    checkAnomalies(before, after, name, initTurn + t + 1);

    turnsCompleted++;
    totalTurns++;

    // Bail if a single turn takes > 10s (probably infinite loop not caught by guard)
    if (turnMs > 10000) {
      anomalies.push({ save: name, turn: initTurn + t + 1, type: 'SLOW_TURN', detail: `${turnMs}ms` });
      break;
    }
  }

  const saveMs = Date.now() - saveStart;
  totalTime += saveMs;
  const finalUnits = s16(DAT_00655b16, 0);
  const finalCities = s16(DAT_00655b18, 0);

  process.stderr.write(`${turnsCompleted} turns in ${saveMs}ms → ${finalUnits}U/${finalCities}C\n`);
}

// ── Report ──
console.log(`\n${'═'.repeat(60)}`);
console.log(`STRESS TEST COMPLETE: ${totalTurns} turns across ${savFiles.length} saves in ${(totalTime/1000).toFixed(1)}s`);
console.log(`${'═'.repeat(60)}\n`);

// Errors by frequency
const sortedErrors = Object.values(errorCounts).sort((a, b) => b.count - a.count);
if (sortedErrors.length > 0) {
  console.log(`\n── ERRORS (${sortedErrors.length} unique, ${sortedErrors.reduce((s,e)=>s+e.count,0)} total) ──\n`);
  for (const e of sortedErrors.slice(0, 20)) {
    console.log(`  [${e.count}x] ${e.msg}`);
    console.log(`    First: ${e.firstSave} turn ${e.firstTurn} civ ${e.firstCiv} in ${e.context}`);
    console.log(`    ${e.firstStack.split('\n').slice(1, 3).join('\n    ')}`);
    console.log();
  }
}

// Loop guard hits
const sortedGuards = Object.entries(loopGuardHits).sort((a, b) => b[1] - a[1]);
if (sortedGuards.length > 0) {
  console.log(`\n── LOOP GUARD TRIGGERS (${sortedGuards.length} unique locations) ──\n`);
  for (const [key, count] of sortedGuards.slice(0, 15)) {
    console.log(`  [${count}x] ${key}`);
  }
}

// Anomalies
if (anomalies.length > 0) {
  console.log(`\n── STATE ANOMALIES (${anomalies.length}) ──\n`);
  for (const a of anomalies.slice(0, 20)) {
    console.log(`  [${a.type}] ${a.save} turn ${a.turn}: ${a.detail}`);
  }
}

if (sortedErrors.length === 0 && sortedGuards.length === 0 && anomalies.length === 0) {
  console.log('  ✓ No errors, no loop guards, no anomalies detected!');
}

console.log();
process.exit(0);
