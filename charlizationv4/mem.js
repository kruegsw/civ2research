// ═══════════════════════════════════════════════════════════════════
// mem.js — Memory access utilities for Civ2 MGE binary transpilation
//
// Pure helper functions for byte interpretation and tile access.
// All state lives in globals.js (G object).
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';

// ── Signed/unsigned byte interpretation helpers ──
export function s8(val) { return (val & 0x80) ? (val | 0xFFFFFF00) : (val & 0xFF); }
export function u8(val) { return val & 0xFF; }
export function s16(arr, off) {
  const v = (arr[off + 1] << 8) | arr[off];
  return (v & 0x8000) ? (v | 0xFFFF0000) : v;
}
export function u16(arr, off) { return (arr[off + 1] << 8) | arr[off]; }
export function s32(arr, off) {
  if (typeof arr === 'number') return arr; // scalar fallback
  return arr[off] | (arr[off+1] << 8) | (arr[off+2] << 16) | (arr[off+3] << 24);
}
export function u32(arr, off) {
  if (typeof arr === 'number') return arr >>> 0;
  return (arr[off] | (arr[off+1] << 8) | (arr[off+2] << 16) | (arr[off+3] << 24)) >>> 0;
}

// ── Write helpers (with drop tracking) ──
let _w16drops = 0, _w16ok = 0, _w32drops = 0, _w32ok = 0;
const _dropSamples = [];
export function memStats() { return { w16drops: _w16drops, w16ok: _w16ok, w32drops: _w32drops, w32ok: _w32ok, dropSamples: _dropSamples }; }
export function w16(arr, off, val) {
  if (typeof arr !== 'object' || !arr) {
    _w16drops++;
    if (_dropSamples.length < 5) _dropSamples.push({ fn: 'w16', arrType: typeof arr, off, val, stack: new Error().stack.split('\n')[2]?.trim() });
    return;
  }
  _w16ok++;
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
}
export function w32(arr, off, val) {
  if (typeof arr !== 'object' || !arr) {
    _w32drops++;
    if (_dropSamples.length < 5) _dropSamples.push({ fn: 'w32', arrType: typeof arr, off, val, stack: new Error().stack.split('\n')[2]?.trim() });
    return;
  }
  _w32ok++;
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
  arr[off + 2] = (val >> 16) & 0xFF;
  arr[off + 3] = (val >> 24) & 0xFF;
}

// ── Write-and-return helpers (for comma-operator expressions) ──
export function w16r(arr, off, val) { w16(arr, off, val); return val; }
export function w32r(arr, off, val) { w32(arr, off, val); return val; }
// ── Pointer arithmetic: &DAT_xxx + offset → subarray view ──
export function ptrAdd(arr, off) { return arr.subarray(off); }

// ── Tile data initialization ──
export function initMapTiles(tileArray) {
  G._tileData = tileArray;
}

// ── Tile offset computation ──
export function getTileOffset(param_1, param_2) {
  if (param_2 < 0 || G.DAT_006d1162 <= param_2 || param_1 < 0 || G.DAT_006d1160 <= param_1) {
    return -1;
  }
  const mw2 = G.DAT_006d1160 & 0xFFFFFFFE;
  return mw2 * param_2 * 3 + (param_1 & 0xFFFFFFFE) * 3;
}

// ── Tile byte read/write ──
export function tileRead(offset, byteIdx) {
  if (offset < 0 || !G._tileData) return G.DAT_006d1188[byteIdx];
  return G._tileData[offset + byteIdx];
}

export function tileWrite(offset, byteIdx, value) {
  if (offset >= 0 && G._tileData) G._tileData[offset + byteIdx] = value;
}
