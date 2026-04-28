// Cross-check v3's calcUnitAttackStrength / calcUnitDefenseStrength
// against the binary's FUN_0057e2c3 / FUN_0057e33a returns captured
// in effSequence (post-2026-04-28 sessions).
//
// Lock-step on rand_exit can mask calc bugs that happen to round
// to the same modulo result. This tool diffs the actual computed
// strength values, surfacing any latent v3 bug.
//
// Usage: node verify-strength-calcs.mjs <session-dir>

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { calcUnitDefenseStrength } from '../charlizationv3/engine/combat.js';
import { UNIT_ATK } from '../charlizationv3/engine/defs.js';

// v3 doesn't export a standalone calcUnitAttackStrength — re-implement
// the binary's FUN_0057e2c3 here (base × 8, +50% veteran, +50% on-ship).
function calcUnitAttackStrength(unit, opts) {
  let s = (UNIT_ATK[unit.type] || 0) * 8;
  if (unit.veteran) s += s >> 1;
  if (opts && opts.onShip) s += s >> 1;
  return s;
}

const sessionDir = process.argv[2];
if (!sessionDir) {
  console.error('Usage: node verify-strength-calcs.mjs <session-dir>');
  process.exit(1);
}

const trace = readFileSync(join(sessionDir, 'civ2_trace.log'), 'utf-8')
  .split('\n').filter(Boolean).map(l => {
    try { return JSON.parse(l); } catch { return null; }
  }).filter(Boolean);

const combats = [];
let pending = null;
for (const e of trace) {
  if (e.fn !== 'fun_combat_resolve') continue;
  if (e.kind === 'call') pending = e;
  else if (e.kind === 'return' && pending) {
    if (pending.rand_enter !== e.rand_exit && pending.combatContext && e.effSequence) {
      combats.push({ c: pending, r: e });
    }
    pending = null;
  }
}

console.log(`# combats with full Frida data: ${combats.length}`);

function parseSnapshot(path) {
  const buf = new Uint8Array(readFileSync(path));
  if (String.fromCharCode(...buf.slice(0, 8)) !== 'CIV2SNAP') return null;
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const regionCount = dv.getUint32(8, true);
  const regions = new Map();
  let tableOff = 12, dataOff = 12 + regionCount * 24;
  for (let i = 0; i < regionCount; i++) {
    let name = '';
    for (let j = 0; j < 16; j++) {
      const ch = buf[tableOff + j]; if (ch === 0) break;
      name += String.fromCharCode(ch);
    }
    const size = dv.getUint32(tableOff + 20, true);
    regions.set(name, {
      bytes: new Uint8Array(buf.buffer, buf.byteOffset + dataOff, size),
    });
    tableOff += 24; dataOff += size;
  }
  return regions;
}

const snapCache = new Map();
function loadSnap(turnN) {
  if (snapCache.has(turnN)) return snapCache.get(turnN);
  const files = readdirSync(sessionDir).filter(f =>
    f.startsWith(`turn_${String(turnN).padStart(4, '0')}_`) && f.endsWith('.bin'));
  if (!files.length) { snapCache.set(turnN, null); return null; }
  const r = parseSnapshot(join(sessionDir, files[0]));
  snapCache.set(turnN, r);
  return r;
}

const turnMarks = [];
for (const e of trace) {
  if (e.fn === 'civ_turn_driver' && e.kind === 'call' && e.named?.civSlot === 0) {
    turnMarks.push(e.time_ms);
  }
}
function turnAt(t) {
  let n = -1;
  for (let i = 0; i < turnMarks.length; i++) {
    if (turnMarks[i] <= t) n = i; else break;
  }
  return n;
}

function readTile(regions, x, y) {
  const tilesR = regions.get('tiles');
  const dimsR = regions.get('map_dims');
  if (!tilesR || !dimsR) return null;
  const dvD = new DataView(dimsR.bytes.buffer, dimsR.bytes.byteOffset, dimsR.bytes.length);
  const mw = dvD.getInt16(0, true);
  if ((x + y) % 2 !== 0) return null;
  const off = ((mw & ~1) * y + (x & ~1)) * 3;
  if (off + 2 > tilesR.bytes.length) return null;
  return {
    terrain: tilesR.bytes[off] & 0x0F,
    river: !!(tilesR.bytes[off] & 0x80),
    fortress: !!(tilesR.bytes[off + 1] & 0x40),
  };
}

function readCity(regions, x, y) {
  const cR = regions.get('cities');
  if (!cR) return null;
  const STRIDE = 0x58;
  const count = Math.floor(cR.bytes.length / STRIDE);
  for (let i = 0; i < count; i++) {
    const dv = new DataView(cR.bytes.buffer, cR.bytes.byteOffset + i * STRIDE, STRIDE);
    if (dv.getInt16(0, true) === x && dv.getInt16(2, true) === y) {
      const lo = dv.getUint32(0x30, true);
      const buildings = new Set();
      for (let b = 1; b <= 31; b++) if (lo & (1 << b)) buildings.add(b);
      return { buildings };
    }
  }
  return null;
}

// ── Per-combat diff ─────────────────────────────────────────────────

let v3atkOK = 0, v3atkBad = 0;
let v3defOK = 0, v3defBad = 0;
const defMismatches = [];
const atkMismatches = [];

const DIR = [[1,-1],[2,0],[1,1],[0,2],[-1,1],[-2,0],[-1,-1],[0,-2]];

for (let idx = 0; idx < combats.length; idx++) {
  const { c, r } = combats[idx];
  const cc = c.combatContext;
  const eff = r.effSequence;
  const turn = turnAt(c.time_ms);
  let regions = null;
  for (let d = 0; d <= 5; d++) {
    regions = loadSnap(turn - d) || loadSnap(turn + d);
    if (regions) break;
  }
  if (!regions) continue;

  const att = cc.attacker;
  const delta = DIR[c.args[1]];
  if (!delta) continue;
  const tx = att.x + delta[0], ty = att.y + delta[1];
  const tile = readTile(regions, tx, ty);
  if (!tile) continue;
  const city = readCity(regions, tx, ty);

  // ─── attack strength check ───
  const atkCall = eff.find(e => e.fn === 'atk');
  if (atkCall) {
    const v3atk = calcUnitAttackStrength
      ? calcUnitAttackStrength({ type: att.type, veteran: !!(att.statusFlags & 0x2000) },
          { onShip: !!(att.statusFlags & 0x10) })
      : null;
    if (v3atk == null) {
      // calcUnitAttackStrength not exported; skip
    } else if (v3atk === atkCall.val) {
      v3atkOK++;
    } else {
      v3atkBad++;
      atkMismatches.push({ idx, type: att.type, vet: !!(att.statusFlags & 0x2000),
                           binary: atkCall.val, v3: v3atk });
    }
  }

  // ─── defense strength check ───
  // The actual combat defender = the unit calc_def_strength was called
  // on twice. Score it. Compare against the LAST def call (which is the
  // post-best-pick combat-side call — same defender, same value).
  const defCalls = eff.filter(e => e.fn === 'def');
  if (!defCalls.length) continue;
  const last = defCalls[defCalls.length - 1];
  const def = (cc.neighbors || []).find(n => n.slot === last.unitIdx);
  if (!def) continue;
  const v3def = calcUnitDefenseStrength(
    { type: def.type, owner: def.owner,
      veteran: !!(def.statusFlags & 0x2000),
      orders: def.orders === 2 ? 'fortified' : undefined,
      movesRemain: def.hp },
    tile.terrain, !!city, city ? city.buildings.has(8) : false,
    tile.fortress, tile.river,
    city ? city.buildings : null,
    att.type,
  );
  if (v3def === last.val) {
    v3defOK++;
  } else {
    v3defBad++;
    defMismatches.push({
      idx, defType: def.type, defVet: !!(def.statusFlags & 0x2000),
      defOrders: def.orders, defStatus: def.statusFlags,
      atkType: att.type, terrain: tile.terrain, river: tile.river, inCity: !!city,
      walls: city ? city.buildings.has(8) : false, fortress: tile.fortress,
      binary: last.val, v3: v3def,
    });
  }
}

console.log('');
console.log(`# Attack-strength agreement: ${v3atkOK} OK / ${v3atkBad} mismatch`);
console.log(`# Defense-strength agreement: ${v3defOK} OK / ${v3defBad} mismatch`);

if (defMismatches.length) {
  console.log('');
  console.log('# Defense-strength mismatches:');
  for (const m of defMismatches) {
    console.log(`  idx ${m.idx}: def=t${m.defType}${m.defVet?'/V':''} orders=${m.defOrders} ` +
      `status=0x${m.defStatus.toString(16)} atk=t${m.atkType} terrain=${m.terrain}` +
      `${m.river?'+river':''}${m.inCity?',city':''}${m.walls?'+walls':''}${m.fortress?',fort':''} ` +
      `→ v3=${m.v3} bin=${m.binary} (Δ=${m.binary - m.v3})`);
  }
}
if (atkMismatches.length) {
  console.log('');
  console.log('# Attack-strength mismatches:');
  for (const m of atkMismatches.slice(0, 20)) {
    console.log(`  idx ${m.idx}: atk=t${m.type}${m.vet?'/V':''} → v3=${m.v3} bin=${m.binary}`);
  }
}
