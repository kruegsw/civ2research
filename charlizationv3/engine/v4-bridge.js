// ═══════════════════════════════════════════════════════════════════
// v4-bridge.js — Bridge between v3 game state and v4 binary engine
//
// Syncs v3 JS objects ↔ v4 flat memory (_MEM) and delegates game
// logic to the transpiled binary functions.
//
// Usage:
//   import { v4EndTurn } from './v4-bridge.js';
//   const newState = v4EndTurn(state, civSlot);
//
// This module is loaded by the server, not the client.
// ═══════════════════════════════════════════════════════════════════

// ── v4 engine imports ──
import '../../charlizationv4/globals-init.js';
import { G } from '../../charlizationv4/globals.js';
import { v, wv, w16, w32, s16, s32, u8, u16, _MEM } from '../../charlizationv4/mem.js';
import { loopReset } from '../../charlizationv4/mem.js';
import { loadRules, initBinaryConstants } from '../../charlizationv4/rules-loader.js';
import { loadSav } from '../../charlizationv4/sav-loader.js';

let v4Initialized = false;
let v4RulesLoaded = false;

// ── Initialize v4 engine ──
export function initV4(rulesText) {
  if (!v4Initialized) {
    initBinaryConstants();
    v4Initialized = true;
  }
  if (rulesText && !v4RulesLoaded) {
    loadRules(rulesText);
    v4RulesLoaded = true;
  }
}

// ── Sync v3 state INTO v4 _MEM ──
// Writes unit/city/civ/map data from JS objects into flat memory
export function syncStateToMem(state) {
  // Map dimensions
  w16(DAT_006d1160, 0, state.mapWidth * 2);
  w16(DAT_006d1162, 0, state.mapHeight);
  w16(DAT_006d1164, 0, state.mapWidth * state.mapHeight);

  // Turn counter
  w16(DAT_00655af8, 0, state.turn?.number || 0);

  // Human players bitmask
  _MEM[DAT_00655b0b] = state.humanPlayers || 0;

  // Active civs
  let civMask = 0;
  for (let i = 0; i < state.civs.length; i++) {
    if (state.civs[i] && state.civs[i].alive !== false) civMask |= (1 << i);
  }
  _MEM[DAT_00655b0a] = civMask;

  // Units
  const totalUnits = state.units.length;
  w16(DAT_00655b16, 0, totalUnits);
  for (let i = 0; i < totalUnits; i++) {
    const u = state.units[i];
    const b = i * 0x20;
    if (!u || u.dead) {
      w32(DAT_0065610a, b, 0); // dead
      continue;
    }
    w16(DAT_006560f0, b, u.cx || u.gx * 2 + (u.gy % 2));
    w16(DAT_006560f0, b + 2, u.cy || u.gy);
    _MEM[DAT_006560f0 + b + 6] = u.type;
    _MEM[DAT_006560f0 + b + 7] = u.owner;
    _MEM[DAT_006560f0 + b + 8] = u.movesUsed || 0;
    _MEM[DAT_006560f0 + b + 0xA] = u.damageTaken || 0;
    _MEM[DAT_006560f0 + b + 0xB] = u.veteran ? 1 : 0;
    _MEM[DAT_006560f0 + b + 0xF] = u.orderByte || 0xFF;
    w16(DAT_006560f0, b + 0x10, u.homeCity != null ? u.homeCity : 0xFF);
    w32(DAT_0065610a, b, u.id || (i + 1));
  }

  // Cities
  const totalCities = state.cities.length;
  w16(DAT_00655b18, 0, totalCities);
  for (let i = 0; i < totalCities; i++) {
    const c = state.cities[i];
    const b = i * 0x58;
    w16(globalThis.DAT_0064f340, b, c.cx || c.gx * 2 + (c.gy % 2));
    w16(globalThis.DAT_0064f340, b + 2, c.cy || c.gy);
    _MEM[globalThis.DAT_0064f340 + b + 8] = c.owner;
    _MEM[globalThis.DAT_0064f340 + b + 9] = c.size;
    w16(globalThis.DAT_0064f340, b + 0x1A, c.foodInBox || 0);
    w16(globalThis.DAT_0064f340, b + 0x1C, c.shieldsInBox || 0);
    // City name
    const name = c.name || '';
    for (let j = 0; j < 16; j++) {
      _MEM[globalThis.DAT_0064f340 + b + 0x20 + j] = j < name.length ? name.charCodeAt(j) : 0;
    }
    // City ID (must be non-zero)
    w32(DAT_0064f394, b, c.id || (i + 1));
  }

  // Civs
  for (let i = 0; i < Math.min(state.civs.length, 8); i++) {
    const c = state.civs[i];
    if (!c) continue;
    const off = i * 0x594;
    w32(DAT_0064c600, off + 0xA2, c.treasury || 0);
    _MEM[DAT_0064c600 + off + 0xB3] = Math.round((c.scienceRate || 0) / 10);
    _MEM[DAT_0064c600 + off + 0xB4] = Math.round((c.taxRate || 0) / 10);
    _MEM[DAT_0064c600 + off + 0xB5] = c.government || 1;
  }
}

// ── Read v4 _MEM back into v3 state ──
export function readMemToState(state) {
  const newState = JSON.parse(JSON.stringify(state)); // deep clone

  // Turn
  newState.turn = { ...state.turn, number: s16(DAT_00655af8, 0) };

  // Units
  const totalUnits = s16(DAT_00655b16, 0);
  for (let i = 0; i < Math.min(totalUnits, newState.units.length); i++) {
    const b = i * 0x20;
    const id = s32(DAT_0065610a, b);
    if (id === 0) {
      if (newState.units[i]) newState.units[i].dead = true;
      continue;
    }
    const u = newState.units[i] || {};
    u.cx = s16(DAT_006560f0, b);
    u.cy = s16(DAT_006560f0, b + 2);
    u.gx = Math.floor(u.cx / 2);
    u.gy = u.cy;
    u.type = _MEM[DAT_006560f0 + b + 6];
    u.owner = _MEM[DAT_006560f0 + b + 7];
    u.movesUsed = _MEM[DAT_006560f0 + b + 8];
    u.damageTaken = _MEM[DAT_006560f0 + b + 0xA];
    u.veteran = _MEM[DAT_006560f0 + b + 0xB] > 0;
    u.orderByte = _MEM[DAT_006560f0 + b + 0xF];
    u.homeCity = u16(DAT_006560f0, b + 0x10);
    u.id = id;
    newState.units[i] = u;
  }
  // Handle new units created by v4
  for (let i = newState.units.length; i < totalUnits; i++) {
    const b = i * 0x20;
    const id = s32(DAT_0065610a, b);
    if (id === 0) continue;
    newState.units.push({
      cx: s16(DAT_006560f0, b),
      cy: s16(DAT_006560f0, b + 2),
      gx: Math.floor(s16(DAT_006560f0, b) / 2),
      gy: s16(DAT_006560f0, b + 2),
      type: _MEM[DAT_006560f0 + b + 6],
      owner: _MEM[DAT_006560f0 + b + 7],
      movesUsed: _MEM[DAT_006560f0 + b + 8],
      damageTaken: _MEM[DAT_006560f0 + b + 0xA],
      veteran: _MEM[DAT_006560f0 + b + 0xB] > 0,
      orderByte: _MEM[DAT_006560f0 + b + 0xF],
      homeCity: u16(DAT_006560f0, b + 0x10),
      id,
    });
  }

  // Cities
  const totalCities = s16(DAT_00655b18, 0);
  for (let i = 0; i < Math.min(totalCities, newState.cities.length); i++) {
    const b = i * 0x58;
    const c = newState.cities[i];
    c.size = _MEM[globalThis.DAT_0064f340 + b + 9];
    c.foodInBox = s16(globalThis.DAT_0064f340, b + 0x1A);
    c.shieldsInBox = s16(globalThis.DAT_0064f340, b + 0x1C);
  }
  // Handle new cities
  for (let i = newState.cities.length; i < totalCities; i++) {
    const b = i * 0x58;
    const id = s32(DAT_0064f394, b);
    if (id === 0) continue;
    let name = '';
    for (let j = 0; j < 16; j++) {
      const ch = _MEM[globalThis.DAT_0064f340 + b + 0x20 + j];
      if (ch === 0) break;
      name += String.fromCharCode(ch);
    }
    newState.cities.push({
      name,
      owner: _MEM[globalThis.DAT_0064f340 + b + 8],
      size: _MEM[globalThis.DAT_0064f340 + b + 9],
      cx: u16(globalThis.DAT_0064f340, b),
      cy: u16(globalThis.DAT_0064f340, b + 2),
      gx: Math.floor(u16(globalThis.DAT_0064f340, b) / 2),
      gy: u16(globalThis.DAT_0064f340, b + 2),
      foodInBox: s16(globalThis.DAT_0064f340, b + 0x1A),
      shieldsInBox: s16(globalThis.DAT_0064f340, b + 0x1C),
      buildings: new Set(),
      workedTiles: [],
      specialists: [],
      id,
    });
  }

  // Civs
  for (let i = 0; i < Math.min(state.civs.length, 8); i++) {
    const off = i * 0x594;
    const c = newState.civs[i];
    if (!c) continue;
    c.treasury = s32(DAT_0064c600, off + 0xA2);
    c.scienceRate = _MEM[DAT_0064c600 + off + 0xB3] * 10;
    c.taxRate = _MEM[DAT_0064c600 + off + 0xB4] * 10;
    c.government = _MEM[DAT_0064c600 + off + 0xB5];
  }

  return newState;
}

// ── v4 END_TURN: process one civ's turn using binary logic ──
export async function v4EndTurn(state, civSlot) {
  // Lazy-load v4 turn pipeline
  const { FUN_00489553 } = await import('../../charlizationv4/blocks/block_00480000.js');
  const { FUN_00543cd6 } = await import('../../charlizationv4/blocks/block_00540000.js');

  // Sync v3 state into v4 memory
  syncStateToMem(state);

  // Set active civ
  _MEM[DAT_00655b05] = civSlot;
  wv(DAT_006d1da0, civSlot);

  // Run per-civ turn processing
  loopReset();
  try {
    FUN_00489553(civSlot);
  } catch (e) {
    console.warn('[v4-bridge] FUN_00489553 error:', e.message?.substring(0, 80));
  }

  // Run AI processing (for AI civs)
  if ((_MEM[DAT_00655b0b] & (1 << civSlot)) === 0) {
    loopReset();
    try {
      FUN_00543cd6();
    } catch (e) {
      console.warn('[v4-bridge] FUN_00543cd6 error:', e.message?.substring(0, 80));
    }
  }

  // Read v4 memory back into v3 state
  return readMemToState(state);
}
