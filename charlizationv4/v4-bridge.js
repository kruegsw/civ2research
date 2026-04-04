// ═══════════════════════════════════════════════════════════════════
// v4-bridge.js — Bridge v3 game state through v4 binary engine
//
// v3's reducer handles state management (activeCiv rotation, events,
// visibility). v4's binary handles game logic (yields, production,
// growth, combat). This bridge runs v4 AFTER v3 to overwrite the
// yield/production results with binary-faithful values.
//
// Flow: v3 END_TURN → v4 sync → v4 FUN_00489553 → read back → merge
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { G } from './globals.js';
import { v, wv, w16, w32, s16, s32, u8, u16, _MEM } from './mem.js';
import { loopReset } from './mem.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';

let v4Ready = false;

export function initV4(rulesText) {
  initBinaryConstants();
  if (rulesText) loadRules(rulesText);
  v4Ready = true;
}

// Sync v3 state → v4 _MEM (units, cities, civs, map)
function syncToMem(state) {
  // Map dimensions
  const mw = state.header?.mapWidth || 40;
  const mh = state.header?.mapHeight || 50;
  w16(DAT_006d1160, 0, mw * 2);
  w16(DAT_006d1162, 0, mh);
  w16(DAT_006d1164, 0, mw * mh);

  // Turn
  w16(DAT_00655af8, 0, state.turn?.number || 0);

  // Civs alive + human mask
  let aliveMask = 0, humanMask = state.humanPlayers || 0;
  for (let i = 0; i < 8; i++) {
    if (state.civs?.[i]?.alive !== false) aliveMask |= (1 << i);
  }
  _MEM[DAT_00655b0a] = aliveMask;
  _MEM[DAT_00655b0b] = humanMask;
  _MEM[DAT_00655b02] = 0; // singleplayer mode

  // Difficulty
  const diff = state.difficulty || 0;
  _MEM[DAT_00655b02 + 2] = diff;
  _MEM[DAT_00655b02 + 6] = diff;

  // Unit ID counter
  let maxId = 0;
  for (const u of state.units || []) {
    if (u.id > maxId) maxId = u.id;
  }
  wv(globalThis.DAT_00627fd8, maxId + 1);

  // Units
  w16(DAT_00655b16, 0, state.units?.length || 0);
  for (let i = 0; i < (state.units?.length || 0); i++) {
    const u = state.units[i];
    const b = i * 0x20;
    if (!u || u.dead) { w32(DAT_0065610a, b, 0); continue; }
    const cx = u.cx != null ? u.cx : u.gx * 2 + (u.gy % 2);
    w16(DAT_006560f0, b, cx);
    w16(DAT_006560f0, b + 2, u.cy != null ? u.cy : u.gy);
    _MEM[DAT_006560f0 + b + 6] = u.type;
    _MEM[DAT_006560f0 + b + 7] = u.owner;
    _MEM[DAT_006560f0 + b + 8] = 0; // moves used = 0
    _MEM[DAT_006560f0 + b + 0xA] = u.hpLost || 0;
    _MEM[DAT_006560f0 + b + 0xF] = u.orderByte || 0xFF;
    w16(DAT_006560f0, b + 0x10, u.homeCityId != null ? u.homeCityId : 0xFF);
    w32(DAT_0065610a, b, u.id || (i + 1));
  }

  // Cities
  w16(DAT_00655b18, 0, state.cities?.length || 0);
  for (let i = 0; i < (state.cities?.length || 0); i++) {
    const c = state.cities[i];
    const b = i * 0x58;
    const cx = c.cx != null ? c.cx : c.gx * 2 + (c.gy % 2);
    w16(globalThis.DAT_0064f340, b, cx);
    w16(globalThis.DAT_0064f340, b + 2, c.cy != null ? c.cy : c.gy);
    _MEM[globalThis.DAT_0064f340 + b + 8] = c.owner;
    _MEM[globalThis.DAT_0064f340 + b + 9] = c.size;
    w16(globalThis.DAT_0064f340, b + 0x1A, c.foodInBox || 0);
    w16(globalThis.DAT_0064f340, b + 0x1C, c.shieldsInBox || 0);
    w32(DAT_0064f394, b, i + 1); // city ID
    const name = c.name || '';
    for (let j = 0; j < 16; j++) {
      _MEM[globalThis.DAT_0064f340 + b + 0x20 + j] = j < name.length ? name.charCodeAt(j) : 0;
    }
  }

  // Civs
  for (let i = 0; i < Math.min(state.civs?.length || 0, 8); i++) {
    const c = state.civs[i];
    if (!c) continue;
    const off = i * 0x594;
    w32(DAT_0064c600, off + 0xA2, c.treasury || 0);
    _MEM[DAT_0064c600 + off + 0xB3] = Math.round((c.scienceRate || 0) / 10);
    _MEM[DAT_0064c600 + off + 0xB4] = Math.round((c.taxRate || 0) / 10);
    _MEM[DAT_0064c600 + off + 0xB5] = c.government || 1;
  }

  // Tile data — sync from v3 mapBase if available
  // (tiles stay in _MEM from the initial load; we don't resync per-turn)
}

// Read v4 _MEM back into v3 state (only the fields v4 computes)
function readFromMem(state) {
  const newState = { ...state, units: [...state.units], cities: [...state.cities], civs: [...state.civs] };

  // Cities — read food, shields, size (v4 computes these)
  for (let i = 0; i < Math.min(newState.cities.length, s16(DAT_00655b18, 0)); i++) {
    const b = i * 0x58;
    const c = { ...newState.cities[i] };
    c.size = _MEM[globalThis.DAT_0064f340 + b + 9];
    c.foodInBox = s16(globalThis.DAT_0064f340, b + 0x1A);
    c.shieldsInBox = s16(globalThis.DAT_0064f340, b + 0x1C);
    newState.cities[i] = c;
  }

  // Civs — read treasury (v4 computes this)
  for (let i = 0; i < Math.min(newState.civs.length, 8); i++) {
    const off = i * 0x594;
    const c = { ...newState.civs[i] };
    c.treasury = s32(DAT_0064c600, off + 0xA2);
    newState.civs[i] = c;
  }

  return newState;
}

// Process END_TURN: sync state to _MEM, run binary, read back
export async function v4EndTurn(v3State, civSlot) {
  if (!v4Ready) return v3State;

  // Lazy-load turn pipeline
  if (!v4EndTurn._pipeline) {
    const m1 = await import('./blocks/block_00480000.js');
    const m2 = await import('./blocks/block_00540000.js');
    v4EndTurn._pipeline = { FUN_00489553: m1.FUN_00489553, FUN_00543cd6: m2.FUN_00543cd6 };
    console.log('[v4] Turn pipeline loaded');
  }
  const { FUN_00489553 } = v4EndTurn._pipeline;

  // Sync v3 state → v4 _MEM
  syncToMem(v3State);

  // Check if tile data exists in _MEM
  const tilePtr = v(globalThis.DAT_00636598);
  if (tilePtr === 0) {
    console.warn('[v4] No tile data in _MEM — skipping v4 processing');
    return v3State;
  }

  // Log before state
  const city0 = v3State.cities?.[0];
  if (city0) {
    console.log(`[v4] Before: civ=${civSlot} city0="${city0.name}" size=${city0.size} food=${city0.foodInBox} shields=${city0.shieldsInBox}`);
  }

  // Run v4 binary per-civ processing
  wv(DAT_00655b05, civSlot);
  wv(DAT_006d1da0, civSlot);
  loopReset();
  try {
    FUN_00489553(civSlot);
  } catch (e) {
    // Non-fatal — depth guards, loop guards
  }

  // Read v4 results back, merging with v3 state
  const result = readFromMem(v3State);

  // Log after state
  const city0After = result.cities?.[0];
  if (city0After) {
    console.log(`[v4] After:  civ=${civSlot} city0="${city0After.name}" size=${city0After.size} food=${city0After.foodInBox} shields=${city0After.shieldsInBox}`);
  }

  return result;
}
