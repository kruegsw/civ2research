#!/usr/bin/env node
// city-yield-diff.js — investigate per-city calc divergences between
// v3's computed yields and Civ2's cached per-turn values.
//
// Usage: node city-yield-diff.js <snapshot.bin> [--turn-start] [--civ N]
//
// Loads the snapshot into v3 state, runs v3's yield calculators for each
// city, and compares to Civ2's memory-cached values at +0x4A (science),
// +0x4C (tax), +0x4E (gross trade), +0x50 (food), +0x51 (shield).
//
// Output for each owned city:
//   v3 trade={} food={} shield={}  vs  Civ2 trade={} food={} shield={}
//   DIVERGE@{field}: ...
//
// The "--turn-start" flag re-runs v3's per-civ START_TURN for civs after
// the human (which the main harness skips in `--turns 1` mode) so worker
// tiles are assigned and yield comparisons are apples-to-apples.

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Wire v4/v3 bridge same as dump-server-state.js
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { initV4 } from './v4-bridge.js';
import { buildSav } from './sav-from-mem.js';
import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { initFromSav } from '../charlizationv3/engine/init.js';
import { calcCityTrade, calcShieldProduction, calcFoodSurplus } from '../charlizationv3/engine/production.js';

function initV4IfPossible() {
  const candidates = [
    process.env.CIV2_RULES,
    'C:/Users/stuar/OneDrive/Documents/Games/Civilization II Multiplayer Gold Edition/RULES.TXT',
    join(__dirname, '..', 'civ2gamefolder', 'RULES.TXT'),
  ].filter(Boolean);
  const p = candidates.find(x => existsSync(x));
  if (p) { initV4(readFileSync(p, 'utf8')); return true; }
  return false;
}

const args = process.argv.slice(2);
const snapPath = args.find(a => !a.startsWith('--'));
if (!snapPath) {
  console.error('Usage: node city-yield-diff.js <snapshot.bin> [--civ N]');
  process.exit(2);
}
const civFilter = (() => {
  const flag = args.find(a => a.startsWith('--civ'));
  if (!flag) return null;
  if (flag.includes('=')) return Number(flag.split('=')[1]);
  const i = args.indexOf(flag);
  return Number(args[i + 1]);
})();

// Load snapshot into _MEM, synthesize a .sav, parse into v3 state
const rawBuf = new Uint8Array(readFileSync(snapPath));
const magic = String.fromCharCode(...rawBuf.slice(0, 8));
let savBuf;
if (magic === 'CIVILIZE') {
  savBuf = rawBuf;
} else if (magic === 'CIV2SNAP') {
  if (!initV4IfPossible()) {
    console.error('Snapshot input requires RULES.TXT for initV4 — not found.');
    process.exit(1);
  }
  loadSnapshotIntoMem(snapPath);
  savBuf = buildSav();
} else {
  console.error('Unknown input format (magic: ' + magic + ')');
  process.exit(1);
}

const parsed = Civ2Parser.parse(savBuf, snapPath);
const initResult = initFromSav(parsed, []);
const state = initResult.gameState;
const mapBase = initResult.mapBase;

// Per-city per-civ yield comparison
console.log('\n========= v3 vs Civ2 per-city yields =========\n');
console.log('Columns: trade(net)/food-gross/shield-gross/sci/tax');
console.log('  Trade "gross(net)" = from tiles before/after corruption.');
console.log('  Food gross = raw food produced (before 2*size citizen consumption).');
console.log('  Shield gross = raw shields (before unit upkeep).');
console.log('DIV tags: T=trade F=food S=shield sci/tax=rate outputs.');
console.log('');

const rows = [];
for (const city of state.cities) {
  if (!city || city.size <= 0) continue;
  if (civFilter !== null && city.owner !== civFilter) continue;

  const ci = city.saveIndex != null ? city.saveIndex : state.cities.indexOf(city);

  // v3 computed yields
  let v3Trade, v3TradeNet, v3Sci, v3Tax, v3Lux, v3Food, v3Shield, v3ShieldSupport;
  try {
    const t = calcCityTrade(city, ci, state, mapBase);
    v3Trade = t.grossTrade;
    v3TradeNet = t.netTrade;
    v3Sci = t.sci;
    v3Tax = t.tax;
    v3Lux = t.lux;
  } catch (e) { v3Trade = `ERR: ${e.message}`; }
  try {
    const f = calcFoodSurplus(city, ci, state, mapBase, state.units || []);
    v3Food = f.surplus;
  } catch (e) { v3Food = `ERR: ${e.message}`; }
  try {
    const s = calcShieldProduction(city, ci, state, mapBase, state.units || []);
    v3Shield = s.grossShields;
    v3ShieldSupport = s.support;
  } catch (e) { v3Shield = `ERR: ${e.message}`; }

  // Civ2 cached yields (from snapshot, parser reads these as signed fields
  // matching the memory bytes)
  const civ2Trade = parsed.cities?.[ci]?.netBaseTrade ?? 'N/A';  // +0x1E
  const civ2GrossTrade = parsed.cities?.[ci]?.totalTrade ?? 'N/A';  // +0x4E
  const civ2Food = parsed.cities?.[ci]?.foodSurplus ?? parsed.cities?.[ci]?.foodProduction ?? 'N/A';  // +0x50
  const civ2Shield = parsed.cities?.[ci]?.shieldProduction ?? 'N/A';  // +0x51
  const civ2Sci = parsed.cities?.[ci]?.scienceOutput ?? 'N/A';  // +0x4A
  const civ2Tax = parsed.cities?.[ci]?.taxOutput ?? 'N/A';      // +0x4C

  // v3 net food = gross food - 2 * size (citizen consumption).
  // Civ2 stores GROSS food at +0x50 but it can go negative if famine.
  // To compare apples-to-apples, convert v3 net to gross.
  const v3FoodGross = v3Food + 2 * city.size;

  rows.push({ ci, owner: city.owner, name: city.name, size: city.size,
    v3Trade, v3TradeNet, v3Sci, v3Tax, v3Lux,
    v3Food, v3FoodGross, v3Shield, v3ShieldSupport,
    civ2NetTrade: civ2Trade, civ2GrossTrade, civ2Food, civ2Shield, civ2Sci, civ2Tax });
}

// Print header
console.log('ci owner sz name'.padEnd(30) +
  'v3: trade(net)/food/shld/sci/tax  vs  civ2: trade(net)/food/shld/sci/tax');
for (const r of rows) {
  const head = `${String(r.ci).padStart(2)} civ${r.owner} sz${r.size} ${r.name}`.padEnd(30);
  const v3Part = `${r.v3Trade}(${r.v3TradeNet})/${r.v3FoodGross}/${r.v3Shield}/${r.v3Sci}/${r.v3Tax}`.padEnd(20);
  const civ2Part = `${r.civ2GrossTrade}(${r.civ2NetTrade})/${r.civ2Food}/${r.civ2Shield}/${r.civ2Sci}/${r.civ2Tax}`.padEnd(20);
  const tradeDiverge = r.v3Trade !== r.civ2GrossTrade;
  const foodDiverge = r.v3FoodGross !== r.civ2Food;
  const shieldDiverge = r.v3Shield !== r.civ2Shield;
  const sciDiverge = r.v3Sci !== r.civ2Sci;
  const taxDiverge = r.v3Tax !== r.civ2Tax;
  const diverge = tradeDiverge || foodDiverge || shieldDiverge || sciDiverge || taxDiverge;
  const mark = diverge ? ` DIV(${[tradeDiverge && 'T', foodDiverge && 'F', shieldDiverge && 'S', sciDiverge && 'sci', taxDiverge && 'tax'].filter(Boolean).join(',')})` : '';
  console.log(head + v3Part + '  vs  ' + civ2Part + mark);
}

// Tally divergences by field
const fieldCounts = { trade: 0, food: 0, shield: 0, sci: 0, tax: 0 };
for (const r of rows) {
  if (r.v3Trade !== r.civ2GrossTrade) fieldCounts.trade++;
  if (r.v3FoodGross !== r.civ2Food) fieldCounts.food++;
  if (r.v3Shield !== r.civ2Shield) fieldCounts.shield++;
  if (r.v3Sci !== r.civ2Sci) fieldCounts.sci++;
  if (r.v3Tax !== r.civ2Tax) fieldCounts.tax++;
}
console.log(`\nField divergences across ${rows.length} cities:`);
console.log(`  trade:  ${fieldCounts.trade}  food: ${fieldCounts.food}  shield: ${fieldCounts.shield}  sci: ${fieldCounts.sci}  tax: ${fieldCounts.tax}`);

