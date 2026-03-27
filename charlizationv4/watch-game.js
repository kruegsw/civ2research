#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// watch-game.js — Watch a Civ2 game by monitoring save files
//
// Usage: node charlizationv4/watch-game.js [save-dir] [--log file.txt]
//
// Watches for new/modified .sav files. Parses each save and logs
// human-readable diffs to stdout AND optionally to a log file.
//
// Designed to run on any machine (Windows/Linux/Mac) with Node.js.
// Dependencies: charlizationv3/engine/parser.js, defs.js, state.js
//
// Workflow:
//   1. Start this alongside Civ2
//   2. Play the game, save or let autosave run
//   3. Bring the log file back for analysis
// ═══════════════════════════════════════════════════════════════════

import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { readFileSync, watch, statSync, writeFileSync, appendFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const args = process.argv.slice(2);
const logIdx = args.indexOf('--log');
const LOG_FILE = logIdx >= 0 ? args[logIdx + 1] : null;
const GAME_DIR = args.find(a => a !== '--log' && (logIdx < 0 || a !== args[logIdx + 1])) ||
  (process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Civilization II Multiplayer Gold Edition'
    : '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition');

const UNIT_NAMES = [
  'Settlers','Engineers','Warriors','Phalanx','Archers','Legion','Pikemen',
  'Musketeers','Fanatics','Partisans','Alpine','Riflemen','Marines',
  'Paratroopers','Mech Inf','Horsemen','Chariot','Elephant','Crusaders',
  'Knights','Dragoons','Cavalry','Armor','Catapult','Cannon','Artillery',
  'Howitzer','Fighter','Bomber','Helicopter','Stealth F','Stealth B',
  'Trireme','Caravel','Galleon','Frigate','Ironclad','Destroyer',
  'Cruiser','AEGIS','Battleship','Submarine','Carrier','Transport',
  'Cruise Msl','Nuclear Msl','Diplomat','Spy','Caravan','Freight',
  'Explorer'
];

const ORDER_NAMES = {
  0: 'fortify', 1: 'sentry', 2: 'fortress', 3: 'road', 4: 'irrigate',
  5: 'mine', 6: 'transform', 7: 'clean', 8: 'fortress2', 9: 'airbase',
  10: 'load', 11: 'goto', 12: 'no_orders', 27: 'goto_ai',
  255: 'none'
};

function log(text) {
  console.log(text);
  if (LOG_FILE) {
    appendFileSync(LOG_FILE, text + '\n');
  }
}

function summarize(state) {
  const gs = state.gameState || {};
  const out = {
    turn: gs.turnsPassed ?? '?',
    difficulty: gs.difficulty ?? '?',
    humanPlayers: gs.humanPlayers,
    units: [],
    cities: [],
    civs: [],
  };

  // Civs
  if (state.civs) {
    for (let i = 0; i < state.civs.length; i++) {
      const cv = state.civs[i];
      if (cv && cv.name) {
        out.civs.push({ id: i, name: cv.name, gold: cv.gold, gov: cv.government });
      }
    }
  }

  // Cities
  if (state.cities) {
    for (let i = 0; i < state.cities.length; i++) {
      const c = state.cities[i];
      if (!c.name && c.size === 0) continue;
      out.cities.push({
        idx: i, name: c.name, owner: c.owner, size: c.size,
        x: c.gx, y: c.gy,
        food: c.foodInBox, shields: c.shieldsInBox,
        producing: typeof c.itemInProduction === 'object'
          ? (c.itemInProduction?.type === 'unit' ? UNIT_NAMES[c.itemInProduction.id] || 'Unit'+c.itemInProduction.id
             : c.itemInProduction?.name || 'Bldg'+c.itemInProduction?.id)
          : c.itemInProduction,
        prodRaw: c.prodRaw,
        trade: c.netBaseTrade, foodProd: c.foodProduction, shieldProd: c.shieldProduction,
      });
    }
  }

  // Units
  if (state.units) {
    for (const u of state.units) {
      if (u.dead || (u.id === 0 && u.gx === 0 && u.gy === 0)) continue;
      out.units.push({
        id: u.id || u.saveIndex, type: u.type,
        typeName: UNIT_NAMES[u.type] || 'Type' + u.type,
        owner: u.owner, x: u.gx, y: u.gy,
        moves: u.movesRemain, order: u.order,
        orderName: ORDER_NAMES[u.order] || 'order_' + u.order,
        homeCity: u.homeCity ?? u.homeCityId,
        gotoX: u.gotoX, gotoY: u.gotoY,
        veteran: u.veteran ? 1 : 0,
      });
    }
  }

  return out;
}

function diff(prev, curr) {
  const lines = [];
  const civName = (id) => {
    const c = curr.civs.find(c => c.id === id);
    return c ? c.name : 'Civ' + id;
  };

  if (prev.turn !== curr.turn) {
    lines.push(`\n${'═'.repeat(60)}`);
    lines.push(`Turn ${curr.turn} | ${curr.difficulty}`);
    lines.push('═'.repeat(60));
  }

  // Civ gold changes
  for (const c of curr.civs) {
    const p = prev.civs.find(pc => pc.id === c.id);
    if (p && p.gold !== c.gold) {
      lines.push(`  ${c.name}: gold ${p.gold}→${c.gold}`);
    }
  }

  // City changes
  const pc = new Map(prev.cities.map(c => [c.idx, c]));
  for (const c of curr.cities) {
    const p = pc.get(c.idx);
    if (!p) {
      lines.push(`  NEW CITY: ${c.name} (${civName(c.owner)}) at (${c.x},${c.y})`);
      continue;
    }
    const ch = [];
    if (p.size !== c.size) ch.push(`size ${p.size}→${c.size}`);
    if (p.food !== c.food) ch.push(`food ${p.food}→${c.food}`);
    if (p.shields !== c.shields) ch.push(`shld ${p.shields}→${c.shields}`);
    if (p.producing !== c.producing) ch.push(`build: ${c.producing}`);
    if (ch.length > 0) {
      lines.push(`  ${c.name} (${civName(c.owner)}): ${ch.join(', ')}`);
    }
  }
  // Deleted cities
  for (const [idx, p] of pc) {
    if (!curr.cities.find(c => c.idx === idx)) {
      lines.push(`  CITY LOST: ${p.name} (${civName(p.owner)})`);
    }
  }

  // Unit changes
  const pu = new Map(prev.units.map(u => [u.id, u]));
  const moved = [], created = [], died = [], orderChanged = [];

  for (const u of curr.units) {
    const p = pu.get(u.id);
    if (!p) { created.push(u); continue; }
    pu.delete(u.id);
    if (p.x !== u.x || p.y !== u.y) moved.push({ p, u });
    else if (p.order !== u.order) orderChanged.push({ p, u });
  }
  for (const [, u] of pu) died.push(u);

  if (moved.length > 0) {
    lines.push(`  Moved (${moved.length}):`);
    for (const { p, u } of moved) {
      lines.push(`    ${u.typeName} (${civName(u.owner)}) (${p.x},${p.y})→(${u.x},${u.y}) [${u.orderName}${u.gotoX != null && u.order === 11 ? ' →(' + u.gotoX + ',' + u.gotoY + ')' : ''}]`);
    }
  }
  if (orderChanged.length > 0) {
    lines.push(`  Orders changed (${orderChanged.length}):`);
    for (const { p, u } of orderChanged.slice(0, 8)) {
      lines.push(`    ${u.typeName} (${civName(u.owner)}) at (${u.x},${u.y}): ${ORDER_NAMES[p.order]||p.order}→${u.orderName}${u.gotoX != null && u.order === 11 ? ' →(' + u.gotoX + ',' + u.gotoY + ')' : ''}`);
    }
    if (orderChanged.length > 8) lines.push(`    ... +${orderChanged.length - 8} more`);
  }
  if (created.length > 0) {
    lines.push(`  Created (${created.length}):`);
    for (const u of created.slice(0, 5)) {
      lines.push(`    ${u.typeName} (${civName(u.owner)}) at (${u.x},${u.y}) home=${u.homeCity}`);
    }
  }
  if (died.length > 0) {
    lines.push(`  Died (${died.length}):`);
    for (const u of died.slice(0, 5)) {
      lines.push(`    ${u.typeName} (${civName(u.owner)}) at (${u.x},${u.y})`);
    }
  }

  return lines;
}

function processFile(filepath) {
  try {
    const buf = readFileSync(filepath);
    const state = Civ2Parser.parse(buf, basename(filepath));
    return summarize(state);
  } catch (e) {
    log(`Error parsing ${filepath}: ${e.message}`);
    return null;
  }
}

// ── Main ──

log(`Civ2 Game Watcher`);
log(`Save dir: ${GAME_DIR}`);
if (LOG_FILE) {
  writeFileSync(LOG_FILE, `Civ2 Game Watcher — ${new Date().toISOString()}\nSave dir: ${GAME_DIR}\n\n`);
  log(`Logging to: ${LOG_FILE}`);
}
log(`Waiting for save files... (Ctrl+C to stop)\n`);

let prevState = null;
const fileTimestamps = {};

// Scan for initial saves
try {
  const files = readdirSync(GAME_DIR).filter(f => /\.(sav|SAV)$/i.test(f));
  // Find most recent
  let newest = null, newestTime = 0;
  for (const f of files) {
    try {
      const t = statSync(join(GAME_DIR, f)).mtimeMs;
      if (t > newestTime) { newestTime = t; newest = f; }
    } catch {}
  }
  if (newest) {
    log(`Most recent save: ${newest}`);
    const state = processFile(join(GAME_DIR, newest));
    if (state) {
      log(`\nInitial state: Turn ${state.turn} | ${state.difficulty}`);
      log(`Civs: ${state.civs.map(c => c.name).join(', ')}`);
      log(`Cities: ${state.cities.length} | Units: ${state.units.length}`);
      for (const c of state.cities.slice(0, 5)) {
        log(`  ${c.name} (${state.civs.find(cv=>cv.id===c.owner)?.name||'?'}) size=${c.size} food=${c.food} shld=${c.shields} build=${c.producing}`);
      }
      if (state.cities.length > 5) log(`  ... +${state.cities.length - 5} more cities`);
      prevState = state;
    }
    fileTimestamps[newest] = newestTime;
  }
} catch (e) {
  log(`Could not scan directory: ${e.message}`);
}

// Watch for changes
watch(GAME_DIR, (event, filename) => {
  if (!filename || !/\.(sav|SAV)$/i.test(filename)) return;
  const filepath = join(GAME_DIR, filename);

  let mtime;
  try { mtime = statSync(filepath).mtimeMs; } catch { return; }

  // Skip if we already processed this version
  if (fileTimestamps[filename] === mtime) return;
  fileTimestamps[filename] = mtime;

  // Small delay to let the file finish writing
  setTimeout(() => {
    const state = processFile(filepath);
    if (!state) return;

    if (prevState) {
      const lines = diff(prevState, state);
      if (lines.length > 0) {
        for (const line of lines) log(line);
      }
    } else {
      log(`\n── Loaded: ${filename} (Turn ${state.turn}) ──`);
    }
    prevState = state;
  }, 500);
});
