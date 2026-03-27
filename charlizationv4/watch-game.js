#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// watch-game.js — Watch a Civ2 game by monitoring save files
//
// Usage: node charlizationv4/watch-game.js [save-dir]
//
// Watches for new/modified .sav files. When one changes:
//   1. Parses it using the v3 parser (structured game objects)
//   2. Diffs against the previous state
//   3. Prints human-readable changes (units, cities, etc.)
//
// Default dir: the Civ2 game folder
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, watch, statSync } from 'fs';
import { join } from 'path';
import { Civ2Parser } from '../charlizationv3/engine/parser.js';
function parse(buf, name) { return Civ2Parser.parse(buf, name || 'save.sav'); }

const GAME_DIR = process.argv[2] ||
  '/home/kruegsw/Games/Civilization II Multiplayer Gold Edition';

const UNIT_NAMES = [
  'Settlers','Engineers','Warriors','Phalanx','Archers','Legion','Pikemen',
  'Musketeers','Fanatics','Partisans','Alpine','Riflemen','Marines',
  'Paratroopers','Mech Inf','Horsemen','Chariot','Elephant','Crusaders',
  'Knights','Dragoons','Cavalry','Armor','Catapult','Cannon','Artillery',
  'Howitzer','Fighter','Bomber','Helicopter','Stealth F','Stealth B',
  'Trireme','Caravel','Galleon','Frigate','Ironclad','Destroyer',
  'Cruiser','AEGIS','Battleship','Submarine','Carrier','Transport',
  'Cruise Msl','Nuclear Msl','Diplomat','Spy','Caravan','Freight',
  'Explorer','Extra L1','Extra L2','Extra L3','Extra L4','Extra L5',
  'Extra L6','Extra L7','Extra L8','Extra L9','Extra S1','Extra S2'
];

const CIV_NAMES = ['Barbarians','Civ1','Civ2','Civ3','Civ4','Civ5','Civ6','Civ7'];

let prevState = null;
let prevFile = null;

function summarizeState(state) {
  const gs = state.gameState || {};
  const summary = {
    turn: gs.turnsPassed ?? '?',
    difficulty: gs.difficulty ?? '?',
    units: [],
    cities: [],
  };

  if (state.units) {
    for (const u of state.units) {
      if (!u.saveIndex && u.gx === 0 && u.gy === 0) continue;
      summary.units.push({
        id: u.saveIndex, type: u.type, typeName: UNIT_NAMES[u.type] || 'Type'+u.type,
        owner: u.owner, x: u.gx, y: u.gy,
        moves: u.movesRemain, order: u.order,
        homeCity: u.homeCity,
      });
    }
  }

  if (state.cities) {
    for (const c of state.cities) {
      if (!c.name && c.size === 0) continue;
      summary.cities.push({
        name: c.name, owner: c.owner, size: c.size,
        x: c.gx, y: c.gy,
        food: c.foodStore, shields: c.shieldStore,
        producing: c.producing,
      });
    }
  }

  return summary;
}

function diffStates(prev, curr) {
  const lines = [];

  // Turn info
  if (prev.turn !== curr.turn) {
    lines.push(`\n═══ Turn ${curr.turn} (${curr.year}) ═══`);
  }

  // City changes
  const prevCities = new Map(prev.cities.map(c => [c.name, c]));
  for (const c of curr.cities) {
    const p = prevCities.get(c.name);
    if (!p) {
      lines.push(`  NEW CITY: ${c.name} (${CIV_NAMES[c.owner]}) at (${c.x},${c.y})`);
      continue;
    }
    const changes = [];
    if (p.size !== c.size) changes.push(`size ${p.size}→${c.size}`);
    if (p.food !== c.food) changes.push(`food ${p.food}→${c.food}`);
    if (p.shields !== c.shields) changes.push(`shields ${p.shields}→${c.shields}`);
    if (p.producing !== c.producing) changes.push(`producing: ${c.producing}`);
    if (changes.length > 0) {
      lines.push(`  ${c.name} (${CIV_NAMES[c.owner]}): ${changes.join(', ')}`);
    }
  }

  // Unit changes
  const prevUnits = new Map(prev.units.map(u => [u.id, u]));
  const movedUnits = [];
  const newUnits = [];
  const deadUnits = [];

  for (const u of curr.units) {
    const p = prevUnits.get(u.id);
    if (!p) {
      newUnits.push(u);
      continue;
    }
    prevUnits.delete(u.id);
    if (p.x !== u.x || p.y !== u.y) {
      movedUnits.push({ prev: p, curr: u });
    }
  }
  for (const [id, u] of prevUnits) {
    deadUnits.push(u);
  }

  if (movedUnits.length > 0) {
    lines.push(`  Units moved: ${movedUnits.length}`);
    for (const { prev: p, curr: u } of movedUnits.slice(0, 10)) {
      lines.push(`    ${u.typeName} (${CIV_NAMES[u.owner]}): (${p.x},${p.y})→(${u.x},${u.y})`);
    }
    if (movedUnits.length > 10) lines.push(`    ... and ${movedUnits.length - 10} more`);
  }
  if (newUnits.length > 0) {
    lines.push(`  Units created: ${newUnits.length}`);
    for (const u of newUnits.slice(0, 5)) {
      lines.push(`    ${u.typeName} (${CIV_NAMES[u.owner]}) at (${u.x},${u.y})`);
    }
  }
  if (deadUnits.length > 0) {
    lines.push(`  Units lost: ${deadUnits.length}`);
    for (const u of deadUnits.slice(0, 5)) {
      lines.push(`    ${u.typeName} (${CIV_NAMES[u.owner]}) at (${u.x},${u.y})`);
    }
  }

  return lines;
}

function processFile(filepath) {
  try {
    const buf = readFileSync(filepath);
    const state = parse(buf);
    const summary = summarizeState(state);

    if (prevState) {
      const diff = diffStates(prevState, summary);
      if (diff.length > 0) {
        console.log(diff.join('\n'));
      } else {
        console.log(`  (no changes detected)`);
      }
    } else {
      // First load — show full state
      console.log(`\n═══ Initial State: Turn ${summary.turn} (${summary.year}) ═══`);
      console.log(`  Cities: ${summary.cities.length}`);
      for (const c of summary.cities) {
        console.log(`    ${c.name} (${CIV_NAMES[c.owner]}) size=${c.size} at (${c.x},${c.y}) food=${c.food} shields=${c.shields}`);
      }
      console.log(`  Units: ${summary.units.length}`);
      const byCiv = {};
      for (const u of summary.units) {
        const key = CIV_NAMES[u.owner] || 'Civ'+u.owner;
        if (!byCiv[key]) byCiv[key] = {};
        if (!byCiv[key][u.typeName]) byCiv[key][u.typeName] = 0;
        byCiv[key][u.typeName]++;
      }
      for (const [civ, units] of Object.entries(byCiv)) {
        const counts = Object.entries(units).map(([t,c]) => `${c}×${t}`).join(', ');
        console.log(`    ${civ}: ${counts}`);
      }
    }

    prevState = summary;
    prevFile = filepath;
  } catch (e) {
    console.error(`Error parsing ${filepath}: ${e.message}`);
  }
}

// ── Main ──

console.log(`Watching: ${GAME_DIR}`);
console.log(`Save a game or wait for autosave. Press Ctrl+C to stop.\n`);

// Process any existing autosave first
const autoSaves = ['La_Auto2.SAV', 'ka_Auto2.SAV', 'TE_Auto2.SAV'];
for (const name of autoSaves) {
  const path = join(GAME_DIR, name);
  try {
    statSync(path);
    console.log(`Found existing autosave: ${name}`);
    processFile(path);
    break;
  } catch {}
}

// Watch for changes
const seen = new Set();
watch(GAME_DIR, (event, filename) => {
  if (!filename || !filename.match(/\.(sav|SAV)$/)) return;
  const filepath = join(GAME_DIR, filename);

  // Debounce: skip if we just saw this file
  const key = filename + '_' + Date.now().toString().slice(0, -3);
  if (seen.has(key)) return;
  seen.add(key);
  setTimeout(() => seen.delete(key), 2000);

  try {
    statSync(filepath); // verify file exists
  } catch { return; }

  console.log(`\n── File changed: ${filename} ──`);
  processFile(filepath);
});
