#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// validate-step-city.js — per-function step-diff for city-tick funcs
//
// Reads civ2_trace.log entries for fun_city_food_tick / prod_tick /
// happiness / building_upkeep / city_turn_sync where Frida captured
// state_in (city struct hex at function entry) and state_out (at
// function exit).
//
// For each call/return pair:
//   1. Decode state_in into a v3-shaped city + supporting state
//   2. Run v3's equivalent function on the input
//   3. Decode state_out (binary's actual after-state)
//   4. Diff v3's output against binary's output, byte-by-byte
//
// Output: per-function fidelity (matches/total) plus a sample of
// the divergent fields (which byte offset differs and what value).
//
// Usage:
//   node validate-step-city.js <session_dir>
//
// Companion to: validate-research-cost / ai-research / etc. but
// targeting the per-city-tick functions to pinpoint v3 yield-calc
// divergence at the function level.
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { initFromSav } from '../charlizationv3/engine/init.js';
import {
  processCityFood, processCityProduction, processUnitSupportDeficit,
  processCityTurn,
} from '../charlizationv3/engine/cityturn.js';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { buildSav } from './sav-from-mem.js';
import { readdirSync } from 'fs';

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node validate-step-city.js <session_dir>');
  process.exit(1);
}
const tracePath = join(sessionDir, 'civ2_trace.log');
if (!existsSync(tracePath)) {
  console.error('No civ2_trace.log in', sessionDir);
  process.exit(1);
}

// ── Parse paired call/return events with state_in + state_out ─────
const TARGET_FNS = new Set([
  'fun_city_food_tick',
  'fun_city_prod_tick',
  'fun_city_happiness',
  'fun_building_upkeep',
  'fun_city_turn_sync',
]);

const calls = [];
const pendingByFn = new Map();
let currentTurn = 0;
for (const line of readFileSync(tracePath, 'utf8').split(/\r?\n/).filter(Boolean)) {
  let ev;
  try { ev = JSON.parse(line); } catch { continue; }
  if (ev.source === 'sniffer' && ev.event === 'TURN_ADVANCED' && ev.turn != null) {
    currentTurn = ev.turn;
    continue;
  }
  if (ev.source !== 'frida') continue;
  if (!TARGET_FNS.has(ev.fn)) continue;
  if (ev.kind === 'call' && ev.state_in) {
    pendingByFn.set(ev.fn, {
      turn: currentTurn,
      cityIdx: ev.named?.cityIdx ?? ev.args?.[0],
      state_in: ev.state_in,
      fn: ev.fn,
    });
  } else if (ev.kind === 'return' && ev.state_out) {
    const pending = pendingByFn.get(ev.fn);
    if (!pending) continue;
    if (pending.cityIdx !== ev.cityIdx) continue;  // mismatched pair
    pending.state_out = ev.state_out;
    pending.retval = ev.retval;
    calls.push(pending);
    pendingByFn.delete(ev.fn);
  }
}

console.log(`Loaded ${calls.length} city-tick call/return pairs with state captures`);
if (calls.length === 0) {
  console.error('No call/return pairs found. Run frida_host.py with --step-diff');
  process.exit(1);
}

// ── Decode hex city struct into a structured object ──────────────
// Layout reference: Civ2_City_Struct.md (88 bytes total).
function decodeCityStruct(hex, cityIdx) {
  if (!hex || hex.length !== 0x58 * 2) return null;
  const buf = new Uint8Array(0x58);
  for (let i = 0; i < 0x58; i++) {
    buf[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  const dv = new DataView(buf.buffer);
  return {
    raw: buf,                         // for byte-by-byte diff
    cx: dv.getInt16(0x00, true),
    cy: dv.getInt16(0x02, true),
    flags: dv.getUint8(0x07),
    owner: dv.getUint8(0x08),
    size: dv.getUint8(0x09),
    foodInBox: dv.getInt16(0x1A, true),
    shieldsInBox: dv.getInt16(0x1C, true),
    netBaseTrade: dv.getInt16(0x1E, true),
    productionByte: dv.getInt8(0x39),
    // Per-turn yield breakdown (offsets 0x4A-0x55, written during city-tick)
    workedTilesFood: dv.getInt16(0x4A, true),
    workedTilesShield: dv.getInt16(0x4C, true),
    workedTilesTrade: dv.getInt16(0x4E, true),
    yield50: dv.getInt16(0x50, true),    // unknown semantic — investigate
    yield52: dv.getInt16(0x52, true),    // unknown
    yield54: dv.getInt16(0x54, true),    // unknown
  };
}

// ── Per-function validators ─────────────────────────────────────────
// Each takes the decoded input city + binary output city. Runs the
// v3 equivalent on the input and compares to the output. Returns
// { match: bool, fields_match: int, fields_total: int, diff: [{field, v3, bin}] }

function compareCity(v3City, binCity) {
  const fields = ['size', 'foodInBox', 'shieldsInBox', 'netBaseTrade', 'productionByte', 'flags'];
  let m = 0;
  const diff = [];
  for (const f of fields) {
    const v = v3City[f];
    const b = binCity[f];
    if (v === b) m++;
    else diff.push({ field: f, v3: v, bin: b });
  }
  return { match: diff.length === 0, fields_match: m, fields_total: fields.length, diff };
}

// Per-function validator dispatch.
const validators = {
  // For now we implement just fun_city_turn_sync as a sanity check —
  // it's the orchestrator and runs all sub-funcs. The other per-step
  // validators (food_tick, prod_tick, happiness, upkeep) need a v3
  // function that matches the binary's exact slice; we'll add them
  // incrementally as v3's split is mapped.
  fun_city_turn_sync: (callIn, gameState, mapBase) => {
    // v3 doesn't have a 1:1 equivalent — processCityTurn does the
    // food + production + support + happiness in one shot. So this
    // step-diff captures the ENTIRE city-tick (input → all-of-tick).
    const cityIdx = callIn.cityIdx;
    const cityBefore = gameState.cities[cityIdx];
    if (!cityBefore) return { skip: true, reason: 'city not in v3 state' };
    try {
      const result = processCityTurn(cityIdx, gameState, mapBase, {});
      const v3City = gameState.cities[cityIdx];
      const binCity = decodeCityStruct(callIn.state_out, cityIdx);
      return compareCity(v3City, binCity);
    } catch (e) {
      return { skip: true, reason: 'threw: ' + e.message };
    }
  },
};

// ── Build a v3 game state from the earliest snapshot, then walk ─────
// the calls in chronological order, applying each binary input to v3
// state via the captured state_in (hex) for that specific city.
function newestSnapBefore(turn) {
  const files = readdirSync(sessionDir)
    .filter(f => /^turn_\d{4}_\d+x\d+_[a-z]+\.bin$/.test(f));
  let best = null;
  let bestTurn = -1;
  for (const f of files) {
    const m = f.match(/^turn_(\d{4})_/);
    const t = parseInt(m[1]);
    if (t <= turn && t > bestTurn) { bestTurn = t; best = f; }
  }
  return best ? join(sessionDir, best) : null;
}

const earliestTurn = Math.min(...calls.map(c => c.turn));
const snapPath = newestSnapBefore(earliestTurn);
if (!snapPath) {
  console.error(`No snapshot ≤ turn ${earliestTurn} found in ${sessionDir}`);
  process.exit(1);
}

console.log(`Initializing v3 from ${snapPath}`);
loadSnapshotIntoMem(snapPath);
const parsed = Civ2Parser.parse(buildSav(), snapPath);
// Build a default seat list (mirrors validate-can-use-govt.js pattern).
const savHumanPlayers = parsed.gameState?.humanPlayers ?? 0;
const savCivsAlive = parsed.gameState?.civsAlive ?? 0;
const aliveCivs = [];
for (let i = 1; i < 8; i++) if (savCivsAlive & (1 << i)) aliveCivs.push(i);
const seatList = [];
for (let i = 0; i < 7; i++) {
  const civSlot = i < aliveCivs.length ? aliveCivs[i] : (i + 1);
  const isHuman = !!((1 << civSlot) & savHumanPlayers);
  seatList.push({ seatIndex: i, name: `Civ${civSlot}`, ai: !isHuman });
}
const initResult = initFromSav(parsed, seatList);
const baseState = initResult.gameState;
const mapBase = initResult.mapBase;

// ── Run validators ──────────────────────────────────────────────────
const stats = new Map();  // fn -> { total, matched, fields_total, fields_matched, samples: [] }
function getStats(fn) {
  if (!stats.has(fn)) {
    stats.set(fn, { total: 0, matched: 0, fields_total: 0, fields_matched: 0, samples: [] });
  }
  return stats.get(fn);
}

// Inject the binary's input state into v3's city BEFORE running
// the validator. That way v3's per-function calc runs on byte-exact
// inputs and we measure pure function divergence (not state drift).
function injectCityState(gameState, cityIdx, hex) {
  const decoded = decodeCityStruct(hex, cityIdx);
  if (!decoded) return false;
  const cities = gameState.cities.slice();
  while (cities.length <= cityIdx) cities.push(null);
  const existing = cities[cityIdx] || {};
  cities[cityIdx] = {
    ...existing,
    cx: decoded.cx, cy: decoded.cy,
    gx: decoded.cx >> 1, gy: decoded.cy,
    owner: decoded.owner,
    size: decoded.size,
    foodInBox: decoded.foodInBox,
    shieldsInBox: decoded.shieldsInBox,
    netBaseTrade: decoded.netBaseTrade,
    flags: decoded.flags,
    civilDisorder: !!(decoded.flags & 0x01),
    weLoveKingDay: !!(decoded.flags & 0x02),
  };
  return { ...gameState, cities };
}

// Always log a summary of binary's I/O for every captured call, even
// when no v3 validator is wired yet. Shows which bytes the binary
// changed during the function — useful for identifying which fields
// each function owns.
console.log('\nBinary I/O summary (bytes that changed):');
for (const c of calls) {
  const inDecoded = decodeCityStruct(c.state_in, c.cityIdx);
  const outDecoded = decodeCityStruct(c.state_out, c.cityIdx);
  if (!inDecoded || !outDecoded) continue;
  const fields = ['size', 'foodInBox', 'shieldsInBox', 'netBaseTrade', 'productionByte', 'flags',
                  'workedTilesFood', 'workedTilesShield', 'workedTilesTrade',
                  'yield50', 'yield52', 'yield54'];
  const changes = [];
  for (const f of fields) {
    if (inDecoded[f] !== outDecoded[f]) {
      changes.push(`${f}: ${inDecoded[f]} → ${outDecoded[f]}`);
    }
  }
  // Also raw byte-level diff (just count changed bytes + first few offsets)
  const byteOffsets = [];
  for (let i = 0; i < 0x58; i++) {
    if (inDecoded.raw[i] !== outDecoded.raw[i]) byteOffsets.push(i);
  }
  const fieldStr = changes.length > 0 ? changes.join(', ') : '(no decoded-field changes)';
  console.log(`  turn=${c.turn} ${c.fn}(cityIdx=${c.cityIdx})`);
  console.log(`    fields: ${fieldStr}`);
  if (byteOffsets.length > 0) {
    console.log(`    raw bytes changed: ${byteOffsets.length} (offsets: ${byteOffsets.slice(0, 12).map(o => '0x' + o.toString(16)).join(', ')}${byteOffsets.length > 12 ? ', ...' : ''})`);
  }
}

let processed = 0;
for (const c of calls) {
  const validator = validators[c.fn];
  if (!validator) continue;
  // Snapshot v3 state for THIS call (don't mutate baseState across calls).
  const state = injectCityState(baseState, c.cityIdx, c.state_in);
  if (!state) continue;
  const result = validator(c, state, mapBase);
  const s = getStats(c.fn);
  s.total++;
  processed++;
  if (result.skip) {
    if (s.samples.length < 5) s.samples.push({ turn: c.turn, cityIdx: c.cityIdx, skip: result.reason });
    continue;
  }
  s.fields_total += result.fields_total;
  s.fields_matched += result.fields_match;
  if (result.match) s.matched++;
  else if (s.samples.length < 5) {
    s.samples.push({
      turn: c.turn,
      cityIdx: c.cityIdx,
      diff: result.diff.slice(0, 4),
    });
  }
}

console.log(`\nProcessed ${processed} calls. Per-function fidelity:`);
for (const [fn, s] of stats.entries()) {
  const callPct = s.total ? ((100 * s.matched) / s.total).toFixed(1) : '0.0';
  const fieldPct = s.fields_total ? ((100 * s.fields_matched) / s.fields_total).toFixed(1) : '0.0';
  console.log(`\n  ${fn}:`);
  console.log(`    full match: ${s.matched}/${s.total} calls (${callPct}%)`);
  console.log(`    field match: ${s.fields_matched}/${s.fields_total} fields (${fieldPct}%)`);
  if (s.samples.length > 0) {
    console.log(`    samples:`);
    for (const sample of s.samples) {
      if (sample.skip) {
        console.log(`      turn=${sample.turn} cityIdx=${sample.cityIdx} SKIP: ${sample.skip}`);
      } else {
        const diffStr = sample.diff.map(d => `${d.field}: v3=${d.v3} bin=${d.bin}`).join(', ');
        console.log(`      turn=${sample.turn} cityIdx=${sample.cityIdx}  ${diffStr}`);
      }
    }
  }
}
