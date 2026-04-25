#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// validate-choose-govt.js — byte-exact validation of chooseGovernment
// against binary's FUN_0055f5a3.
//
// Reads civ2_trace.log for choose_government call/return pairs. Each
// call carries the full context (govtPrefs, scenario flags, attitude,
// tech counts, knowsTechBytes). Each return reports govtChosen — what
// the binary's civ+0x15 byte became after the call (or -1 if the gate
// short-circuited and no switch happened).
//
// For each pair: call v3's chooseGovernment with the same captured
// state + an RNG seeded at rand_enter. Compare result to govtChosen.
//
// Usage: node validate-choose-govt.js <session_dir>
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { initFromSav } from '../charlizationv3/engine/init.js';
import { chooseGovernment } from '../charlizationv3/engine/ai/econai.js';
import { SeededRNG } from '../charlizationv3/engine/rng.js';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { buildSav } from './sav-from-mem.js';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-choose-govt.js <session_dir>');
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
  if (ev.source !== 'frida' || ev.fn !== 'choose_government') continue;
  if (ev.kind === 'call') {
    pending = {
      turn,
      civSlot: ev.named?.civSlot ?? ev.args?.[0],
      reactiveFlag: ev.named?.reactiveFlag ?? ev.args?.[1],
      chooseGovtGlobals: ev.chooseGovtGlobals,
      govtGlobals: ev.govtGlobals,
      knowsTechBytes: ev.knowsTechBytes,
      rand_enter: (ev.rand_enter ?? 0) >>> 0,
    };
  } else if (ev.kind === 'return' && pending) {
    calls.push({ ...pending, govtChosen: ev.govtChosen, govtEntryVal: ev.govtEntryVal });
    pending = null;
  }
}

console.log(`Loaded ${calls.length} choose_government call/return pairs`);
if (calls.length === 0) {
  console.error('No matching events.');
  process.exit(1);
}

// ── Per-turn snapshot loader ────────────────────────────────────────
const stateCache = new Map();
function loadStateForTurn(t) {
  if (stateCache.has(t)) return stateCache.get(t);
  const files = readdirSync(sessionDir).filter(f =>
    /^turn_\d{4}_\d+x\d+_[a-z]+\.bin$/.test(f));
  let ti = t; let p;
  while (ti >= 0) {
    const prefix = `turn_${String(ti).padStart(4, '0')}_`;
    const m = files.find(f => f.startsWith(prefix));
    if (m) { p = join(sessionDir, m); break; }
    ti--;
  }
  if (!p || !existsSync(p)) return null;
  loadSnapshotIntoMem(p);
  const parsed = Civ2Parser.parse(buildSav(), p);
  const civsAlive = parsed.gameState?.civsAlive ?? 0;
  const humanPlayers = parsed.gameState?.humanPlayers ?? 0;
  const aliveCivs = [];
  for (let i = 1; i < 8; i++) if (civsAlive & (1 << i)) aliveCivs.push(i);
  const seatList = [];
  for (let i = 0; i < 7; i++) {
    const cs = i < aliveCivs.length ? aliveCivs[i] : (i + 1);
    const isHuman = !!((1 << cs) & humanPlayers);
    seatList.push({ seatIndex: i, name: `Civ${cs}`, ai: !isHuman });
  }
  const init = initFromSav(parsed, seatList);
  const bundle = { baseState: init.gameState, mapBase: init.mapBase };
  stateCache.set(t, bundle);
  return bundle;
}

// ── Validate each call ──────────────────────────────────────────────
let matched = 0, mismatched = 0;
const mismatches = [];
for (const c of calls) {
  const bundle = loadStateForTurn(c.turn);
  if (!bundle) continue;
  const state = { ...bundle.baseState, rng: new SeededRNG(c.rand_enter) };
  if (c.chooseGovtGlobals) state.chooseGovtGlobals = c.chooseGovtGlobals;
  if (c.govtGlobals) state.govtGlobals = c.govtGlobals;
  if (c.knowsTechBytes) state.knowsTechBytes = c.knowsTechBytes;
  let v3;
  try { v3 = chooseGovernment(state, c.civSlot, c.reactiveFlag); }
  catch (e) { mismatches.push({ ...c, v3: 'threw', err: e.message }); continue; }

  // Frida's onLeave reports govtChosen=-1 when civ+0x15 didn't change
  // during the call. That doesn't distinguish "gate skipped body" from
  // "body ran and picked the same govt as current". Treat both as
  // equivalent: binary's effective answer is entryGovt. If the govt
  // changed, govtChosen is the new index.
  const binaryEff = (c.govtChosen === -1) ? c.govtEntryVal : c.govtChosen;
  // v3 returns -1 only when gate skips body; otherwise 0..6.
  // Map v3's -1 to entryGovt for comparison parity.
  const v3Eff = (v3 === -1) ? c.govtEntryVal : v3;
  if (v3Eff === binaryEff) matched++;
  else { mismatched++; mismatches.push({ ...c, v3, v3Eff, binaryEff }); }
}

console.log(`\n=== chooseGovernment fidelity: ${matched}/${calls.length} matches (${(100*matched/calls.length).toFixed(1)}%) ===`);
if (mismatches.length) {
  console.log(`\nFirst 20 mismatches:`);
  for (const m of mismatches.slice(0, 20)) {
    console.log(`  turn=${m.turn} civ=${m.civSlot} reactive=${m.reactiveFlag} entry=${m.govtEntryVal} binaryEff=${m.binaryEff} v3Eff=${m.v3Eff}`);
  }
}
