#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// tools/simulate.js — Headless AI simulation for gap analysis
//
// Runs a full game with all-AI players, logging every decision and
// action for comparison with Civ2.exe behavior.
//
// Usage:
//   node tools/simulate.js [options]
//
// Options:
//   --turns N        Number of turns to simulate (default: 50)
//   --players N      Number of AI civs (default: 4, max 7)
//   --width N        Map width (default: 50)
//   --height N       Map height (default: 80)
//   --seed N         Map seed (default: random)
//   --difficulty S   AI difficulty (default: prince)
//   --verbose        Log every action (not just summaries)
//   --no-file        Print to stdout only, don't write log file
// ═══════════════════════════════════════════════════════════════════

import { generateMap } from '../engine/mapgen.js';
import { initNewGame } from '../engine/init.js';
import { applyAction } from '../engine/reducer.js';
import { validateAction } from '../engine/rules.js';
import { runAiTurn } from '../engine/ai/index.js';
import { getGameYear } from '../engine/year.js';
import {
  UNIT_NAMES, ADVANCE_NAMES, GOVERNMENT_NAMES, WONDER_NAMES,
  IMPROVE_NAMES, UNIT_ATK, UNIT_DEF, UNIT_DOMAIN, UNIT_ROLE,
  UNIT_MOVE_POINTS, MOVEMENT_MULTIPLIER, BUSY_ORDERS,
} from '../engine/defs.js';
import { getAvailableResearch, calcResearchCost } from '../engine/research.js';
import { getGovernment } from '../engine/utils.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Parse CLI args ──────────────────────────────────────────────
const args = process.argv.slice(2);
function getArg(name, defaultVal) {
  const idx = args.indexOf(`--${name}`);
  if (idx < 0) return defaultVal;
  if (typeof defaultVal === 'boolean') return true;
  return args[idx + 1] ?? defaultVal;
}

const NUM_TURNS = Number(getArg('turns', 50));
const NUM_PLAYERS = Math.min(7, Math.max(2, Number(getArg('players', 4))));
const MAP_WIDTH = Number(getArg('width', 50));
const MAP_HEIGHT = Number(getArg('height', 80));
const MAP_SEED = getArg('seed', null);
const DIFFICULTY = getArg('difficulty', 'prince');
const VERBOSE = getArg('verbose', false);
const NO_FILE = getArg('no-file', false);

// ── Output buffer ───────────────────────────────────────────────
const lines = [];
function log(msg = '') { lines.push(msg); }
function logSection(title) { log(); log(`${'═'.repeat(70)}`); log(`  ${title}`); log(`${'═'.repeat(70)}`); }

// ── Helpers ─────────────────────────────────────────────────────
function civName(gs, slot) {
  return gs.civs?.[slot]?.name || `Civ ${slot}`;
}

function govtName(gs, slot) {
  return getGovernment(null, gs, slot) || 'unknown';
}

function unitSummary(unit, idx) {
  const name = UNIT_NAMES[unit.type] || `Type${unit.type}`;
  const role = ['Atk', 'Def', 'NavSup', 'AirAtk', 'AirDef', 'NavTrans', 'Settle', 'Diplo', 'Trade'][UNIT_ROLE[unit.type]] || '?';
  return `#${idx} ${name}(${role}) @(${unit.gx},${unit.gy}) mv=${unit.movesLeft} ord=${unit.orders} hp=${unit.hpLost ? '-' + unit.hpLost : 'full'}`;
}

function itemName(type, id) {
  if (type === 'unit') return UNIT_NAMES[id] || `Unit${id}`;
  if (type === 'improvement') return IMPROVE_NAMES[id] || `Bldg${id}`;
  if (type === 'wonder') return WONDER_NAMES[id] || `Wonder${id}`;
  return `${type}:${id}`;
}

function actionSummary(action) {
  const parts = [action.type];
  if (action.unitIndex != null) parts.push(`unit=${action.unitIndex}`);
  if (action.dir) parts.push(`dir=${action.dir}`);
  if (action.order) parts.push(`order=${action.order}`);
  if (action.name) parts.push(`name="${action.name}"`);
  if (action.advanceId != null) parts.push(`tech=${ADVANCE_NAMES[action.advanceId] || action.advanceId}`);
  if (action.itemType != null) parts.push(`item=${action.itemType}:${action.itemId}`);
  if (action.cityIndex != null) parts.push(`city=${action.cityIndex}`);
  if (action.scienceRate != null) parts.push(`sci=${action.scienceRate} tax=${action.taxRate} lux=${action.luxuryRate}`);
  if (action.treaty) parts.push(`treaty=${action.treaty}`);
  if (action.targetCiv != null) parts.push(`target=civ${action.targetCiv}`);
  return parts.join(' ');
}

// ── Statistics tracker ──────────────────────────────────────────
class CivStats {
  constructor(slot) {
    this.slot = slot;
    this.citiesFounded = 0;
    this.citiesLost = 0;
    this.unitsProduced = 0;
    this.unitsLost = 0;
    this.unitsKilled = 0;
    this.techsDiscovered = [];
    this.govtChanges = [];
    this.actionCounts = {};
    this.turnsIdle = 0; // turns where no actions besides cleanup
    this.totalActions = 0;
    this.peakCities = 0;
    this.peakUnits = 0;
  }

  countAction(type) {
    this.actionCounts[type] = (this.actionCounts[type] || 0) + 1;
    this.totalActions++;
  }
}

// ═══════════════════════════════════════════════════════════════════
// MAIN SIMULATION
// ═══════════════════════════════════════════════════════════════════

log(`Charlization AI Headless Simulation`);
log(`Date: ${new Date().toISOString()}`);
log(`Settings: ${NUM_TURNS} turns, ${NUM_PLAYERS} AI players, ${MAP_WIDTH}x${MAP_HEIGHT} map, difficulty=${DIFFICULTY}`);

// ── 1. Generate map ─────────────────────────────────────────────
const mapSeed = MAP_SEED != null ? Number(MAP_SEED) : Math.floor(Math.random() * 65536);
log(`Map seed: ${mapSeed}`);

const t0 = Date.now();
const mapResult = generateMap({
  width: MAP_WIDTH,
  height: MAP_HEIGHT,
  seed: mapSeed,
  mapShape: 0, // cylindrical (wrapping)
  landmass: 1,
  continents: 1,
  temperature: 0,
  climate: 0,
  age: 1,
});
log(`Map generated in ${Date.now() - t0}ms`);

// ── 2. Initialize game ─────────────────────────────────────────
// All players are AI
const seatList = [];
for (let i = 0; i < NUM_PLAYERS; i++) {
  seatList.push({
    seatIndex: i,
    name: `AI-${i + 1}`,
    ai: true,
    difficulty: DIFFICULTY,
  });
}

let { mapBase, gameState } = initNewGame(mapResult, seatList);

// humanPlayers = 0 → all AI
gameState.humanPlayers = 0;

log(`Game initialized: ${NUM_PLAYERS} civs, ${gameState.units.length} starting units`);

// Log starting positions
for (let c = 1; c <= NUM_PLAYERS; c++) {
  const units = gameState.units.filter(u => u.owner === c);
  const pos = units.length > 0 ? `(${units[0].gx},${units[0].gy})` : '?';
  const terrain = units.length > 0 ? mapBase.getTerrain(units[0].gx, units[0].gy) : -1;
  const terrNames = ['Desert', 'Plains', 'Grassland', 'Forest', 'Hills', 'Mountains', 'Tundra', 'Glacier', 'Swamp', 'Jungle', 'Ocean'];
  log(`  Civ ${c} (${civName(gameState, c)}): starts at ${pos} on ${terrNames[terrain] || '?'}`);
}

// ── 3. Run simulation ───────────────────────────────────────────
const stats = {};
for (let c = 1; c <= NUM_PLAYERS; c++) stats[c] = new CivStats(c);

let prevState = gameState;
let turnStart = Date.now();

for (let turn = 0; turn < NUM_TURNS * NUM_PLAYERS; turn++) {
  const activeCiv = gameState.turn.activeCiv;
  if (!(gameState.civsAlive & (1 << activeCiv))) {
    // Dead civ — end turn to skip
    const result = applyAction(gameState, mapBase, { type: 'END_TURN' }, activeCiv);
    if (result !== gameState) gameState = result;
    continue;
  }

  const turnNum = gameState.turn.number;
  const isNewFullTurn = prevState.turn.number !== turnNum;

  // ── Full turn boundary summary ──
  if (isNewFullTurn && turnNum > 0) {
    const elapsed = Date.now() - turnStart;
    turnStart = Date.now();

    logSection(`TURN ${turnNum} — ${getGameYear(turnNum)} (${elapsed}ms)`);

    // Per-civ summary
    for (let c = 1; c <= NUM_PLAYERS; c++) {
      if (!(gameState.civsAlive & (1 << c))) {
        log(`  [Civ ${c}] ${civName(gameState, c)}: ELIMINATED`);
        continue;
      }
      const civ = gameState.civs[c];
      const cities = gameState.cities.filter(ci => ci.owner === c && ci.size > 0);
      const units = gameState.units.filter(u => u.owner === c && u.gx >= 0);
      const gov = govtName(gameState, c);
      const tech = civ?.techBeingResearched;
      const techName = (tech != null && tech !== 0xFF) ? ADVANCE_NAMES[tech] : 'none';
      const techCount = gameState.civTechCounts?.[c] || 0;
      const progress = civ?.researchProgress || 0;
      const cost = calcResearchCost(gameState, c);

      stats[c].peakCities = Math.max(stats[c].peakCities, cities.length);
      stats[c].peakUnits = Math.max(stats[c].peakUnits, units.length);

      log(`  [Civ ${c}] ${civName(gameState, c)} (${gov}): ${cities.length} cities, ${units.length} units, ${civ?.treasury || 0}g, ${techCount} techs, researching ${techName} (${progress}/${cost})`);

      // City details
      for (const city of cities) {
        const bldgs = city.buildings ? [...city.buildings].map(b => IMPROVE_NAMES[b] || `B${b}`).join(', ') : '';
        const prod = city.itemInProduction ? `${itemName(city.itemInProduction.type, city.itemInProduction.id)} (${city.shieldsInBox || 0}sh)` : 'none';
        log(`    ${city.name}: size=${city.size}, prod=${prod}${bldgs ? ', bldgs=' + bldgs : ''}`);
      }

      // Unit breakdown
      const unitTypes = {};
      for (const u of units) {
        const name = UNIT_NAMES[u.type] || `T${u.type}`;
        unitTypes[name] = (unitTypes[name] || 0) + 1;
      }
      const unitStr = Object.entries(unitTypes).map(([k, v]) => `${v}x ${k}`).join(', ');
      log(`    Units: ${unitStr || 'none'}`);
    }
  }

  // ── Run AI turn ───────────────────────────────────────────────
  const debugLog = [];
  const aiResult = runAiTurn(gameState, mapBase, activeCiv, debugLog);
  const actions = aiResult.actions;

  const st = stats[activeCiv];

  // Count meaningful actions (not cleanup)
  const meaningfulActions = actions.filter(a =>
    a.type !== 'UNIT_ORDER' || (a.order !== 'skip' && a.order !== 'fortify' && a.order !== 'sentry'));
  if (meaningfulActions.length === 0) st.turnsIdle++;

  // Categorize and log actions
  const actionsByType = {};
  for (const a of actions) {
    const t = a.type;
    if (!actionsByType[t]) actionsByType[t] = [];
    actionsByType[t].push(a);
    st.countAction(t);
  }

  if (VERBOSE || isNewFullTurn) {
    const civLabel = `[Civ ${activeCiv}] ${civName(gameState, activeCiv)}`;
    const summary = Object.entries(actionsByType)
      .map(([t, arr]) => `${t}(${arr.length})`)
      .join(', ');
    log(`  ${civLabel} turn: ${actions.length} actions — ${summary || 'idle'}`);
  }

  // Log individual actions (verbose mode or important ones)
  for (const a of actions) {
    const isImportant = ['BUILD_CITY', 'SET_RESEARCH', 'CHANGE_RATES', 'REVOLUTION',
      'CHANGE_PRODUCTION', 'RUSH_BUY', 'PROPOSE_TREATY', 'DECLARE_WAR',
      'DEMAND_TRIBUTE', 'ADJUST_ATTITUDE'].includes(a.type);

    if (VERBOSE || isImportant) {
      log(`    ${actionSummary(a)}`);
    }

    // Track specific events
    if (a.type === 'BUILD_CITY') st.citiesFounded++;
  }

  // Log debug output from AI modules
  if (debugLog.length > 0 && VERBOSE) {
    for (const line of debugLog) {
      log(`    [debug] ${line}`);
    }
  }

  // ── Apply actions ─────────────────────────────────────────────
  let rejectedCount = 0;
  for (const action of actions) {
    const err = validateAction(gameState, mapBase, action, activeCiv);
    if (err) {
      rejectedCount++;
      if (VERBOSE) log(`    REJECTED: ${actionSummary(action)} — ${err}`);
      continue;
    }
    const result = applyAction(gameState, mapBase, action, activeCiv);
    if (result !== gameState) {
      // Track combat results
      if (result.combatResult) {
        const cr = result.combatResult;
        const atkName = UNIT_NAMES[cr.attacker] || '?';
        const defName = UNIT_NAMES[cr.defender] || '?';
        log(`    COMBAT: ${atkName} vs ${defName} → ${cr.type} (atkHp=${cr.attackerHpLost}, defHp=${cr.defenderHpLost})`);
        delete result.combatResult;
      }
      // Track city captures
      if (result.combatResult?.type === 'capture') {
        log(`    CAPTURED: ${result.combatResult.cityName}`);
      }
      // Clear action one-shots
      delete result.discoveredAdvance;
      delete result.cityFounded;
      delete result.goodyHutResult;
      delete result.turnEvents;
      gameState = result;
    }
  }

  if (rejectedCount > 0) {
    log(`    ${rejectedCount} actions REJECTED (of ${actions.length})`);
  }

  // ── End turn ──────────────────────────────────────────────────
  prevState = gameState;
  const endResult = applyAction(gameState, mapBase, { type: 'END_TURN' }, activeCiv);
  if (endResult !== gameState) {
    // Check for tech discoveries in end-of-turn processing (for the NEW active civ)
    if (endResult.discoveredAdvance) {
      const da = endResult.discoveredAdvance;
      const ds = stats[da.civSlot];
      if (ds) {
        ds.techsDiscovered.push(ADVANCE_NAMES[da.advanceId] || `#${da.advanceId}`);
        log(`    >>> ${civName(endResult, da.civSlot)} discovered: ${ADVANCE_NAMES[da.advanceId]}`);
      }
      // Clear one-shot so it's not double-counted
      delete endResult.discoveredAdvance;
    }

    // Check for city growth, production, etc. in turn events
    if (endResult.turnEvents) {
      for (const ev of endResult.turnEvents) {
        if (ev.type === 'cityGrowth') log(`    >>> ${ev.cityName} grew to size ${ev.newSize}`);
        if (ev.type === 'famine') log(`    >>> ${ev.cityName} shrank to size ${ev.newSize} (famine)`);
        if (ev.type === 'cityDestroyed') log(`    >>> ${ev.cityName} destroyed (${ev.reason})`);
        if (ev.type === 'productionComplete') {
          log(`    >>> ${ev.cityName} built ${ev.item ? itemName(ev.item.type, ev.item.id) : '?'}`);
        }
        if (ev.type === 'buildingSold') log(`    >>> ${ev.cityName} sold ${IMPROVE_NAMES[ev.buildingId] || ev.buildingId}`);
        if (ev.type === 'civilDisorder') log(`    >>> ${ev.cityName}: CIVIL DISORDER`);
        if (ev.type === 'weLoveKingDay') log(`    >>> ${ev.cityName}: We Love the King Day!`);
        if (ev.type === 'cityDestroyed') log(`    >>> ${ev.cityName} DESTROYED`);
        if (ev.type === 'civEliminated') log(`    >>> ${civName(endResult, ev.eliminatedCiv)} ELIMINATED by ${civName(endResult, ev.civSlot)}`);
      }
    }

    // Clear one-shot fields to prevent double-counting
    delete endResult.turnEvents;
    delete endResult.combatResult;
    delete endResult.cityFounded;
    delete endResult.goodyHutResult;

    gameState = endResult;
  } else {
    // END_TURN rejected — units still need orders
    const needOrders = gameState.units.filter(u =>
      u.owner === activeCiv && u.gx >= 0 && u.movesLeft > 0 && !BUSY_ORDERS.has(u.orders));
    log(`    END_TURN REJECTED: ${needOrders.length} units still need orders`);
    for (const u of needOrders.slice(0, 5)) {
      const idx = gameState.units.indexOf(u);
      log(`      ${unitSummary(u, idx)}`);
    }
    // Force skip remaining units to avoid infinite loop
    for (const u of needOrders) {
      const idx = gameState.units.indexOf(u);
      const skipResult = applyAction(gameState, mapBase, { type: 'UNIT_ORDER', unitIndex: idx, order: 'skip' }, activeCiv);
      if (skipResult !== gameState) gameState = skipResult;
    }
    const retryEnd = applyAction(gameState, mapBase, { type: 'END_TURN' }, activeCiv);
    if (retryEnd !== gameState) gameState = retryEnd;
  }

  // Check if game is over (only 1 civ alive)
  let aliveCount = 0;
  for (let c = 1; c <= 7; c++) {
    if (gameState.civsAlive & (1 << c)) aliveCount++;
  }
  if (aliveCount <= 1) {
    log(`\nGAME OVER: Only ${aliveCount} civ(s) remaining.`);
    break;
  }
}

// ═══════════════════════════════════════════════════════════════════
// FINAL REPORT
// ═══════════════════════════════════════════════════════════════════

logSection('FINAL SUMMARY');

const finalTurn = gameState.turn.number;
log(`Game ended at turn ${finalTurn} (${getGameYear(finalTurn)})`);
log();

for (let c = 1; c <= NUM_PLAYERS; c++) {
  const alive = !!(gameState.civsAlive & (1 << c));
  const st = stats[c];
  const civ = gameState.civs[c];
  const cities = gameState.cities.filter(ci => ci.owner === c && ci.size > 0);
  const units = gameState.units.filter(u => u.owner === c && u.gx >= 0);
  const gov = alive ? govtName(gameState, c) : 'dead';

  log(`── Civ ${c}: ${civName(gameState, c)} (${gov}) ${alive ? 'ALIVE' : 'ELIMINATED'} ──`);
  log(`  Cities: ${cities.length} (peak ${st.peakCities}, founded ${st.citiesFounded})`);
  log(`  Units:  ${units.length} (peak ${st.peakUnits})`);
  log(`  Treasury: ${civ?.treasury || 0}g`);
  log(`  Techs discovered: ${st.techsDiscovered.length} — ${st.techsDiscovered.join(', ') || 'none'}`);
  log(`  Actions: ${st.totalActions} total, ${st.turnsIdle} idle turns`);

  // Action breakdown
  const sorted = Object.entries(st.actionCounts).sort((a, b) => b[1] - a[1]);
  log(`  Breakdown: ${sorted.map(([k, v]) => `${k}(${v})`).join(', ')}`);

  // Current unit types
  const unitTypes = {};
  for (const u of units) {
    const name = UNIT_NAMES[u.type] || `T${u.type}`;
    unitTypes[name] = (unitTypes[name] || 0) + 1;
  }
  log(`  Army: ${Object.entries(unitTypes).map(([k, v]) => `${v}x ${k}`).join(', ') || 'none'}`);

  // Current city details
  for (const city of cities) {
    log(`  ${city.name}: size=${city.size}, shields=${city.shieldsInBox || 0}`);
  }
  log();
}

// ── AI Behavior Analysis ────────────────────────────────────────
logSection('AI BEHAVIOR ANALYSIS');

for (let c = 1; c <= NUM_PLAYERS; c++) {
  const st = stats[c];
  const issues = [];

  // Check for problems
  if (st.citiesFounded === 0) issues.push('CRITICAL: Never founded a city');
  if (st.techsDiscovered.length === 0) issues.push('WARNING: Never discovered a tech');
  if (st.actionCounts['MOVE_UNIT'] === 0) issues.push('WARNING: Never moved a unit');
  if (st.turnsIdle > NUM_TURNS * 0.5) issues.push(`WARNING: Idle ${st.turnsIdle}/${NUM_TURNS} turns (>50%)`);
  if (!st.actionCounts['SET_RESEARCH']) issues.push('WARNING: Never selected research');
  if (!st.actionCounts['CHANGE_PRODUCTION']) issues.push('WARNING: Never changed production');
  if (st.actionCounts['BUILD_CITY'] && st.citiesFounded < 2 && NUM_TURNS >= 30) {
    issues.push('WARNING: Only 1 city after 30+ turns');
  }

  // Check unit diversity
  const units = gameState.units.filter(u => u.owner === c && u.gx >= 0);
  const types = new Set(units.map(u => u.type));
  if (units.length > 5 && types.size <= 2) issues.push('WARNING: Low unit diversity');

  // Check for stuck units (sentry/fortified with no city)
  const stuckUnits = units.filter(u =>
    BUSY_ORDERS.has(u.orders) && !gameState.cities.some(ci => ci.gx === u.gx && ci.gy === u.gy && ci.size > 0));
  if (stuckUnits.length > 0) issues.push(`WARNING: ${stuckUnits.length} units stuck (busy orders outside city)`);

  log(`[Civ ${c}] ${civName(gameState, c)}:`);
  if (issues.length === 0) {
    log('  OK — no obvious issues detected');
  } else {
    for (const issue of issues) log(`  ${issue}`);
  }
  log();
}

// ═══════════════════════════════════════════════════════════════════
// OUTPUT
// ═══════════════════════════════════════════════════════════════════

const output = lines.join('\n');

// Always print to stdout
console.log(output);

// Write to file
if (!NO_FILE) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `sim-${timestamp}-t${NUM_TURNS}-p${NUM_PLAYERS}-s${mapSeed}.log`;
  const logPath = path.join(__dirname, 'sim-logs', filename);
  fs.writeFileSync(logPath, output + '\n');
  console.log(`\nLog written to: ${logPath}`);
}
