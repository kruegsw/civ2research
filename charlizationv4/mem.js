// ═══════════════════════════════════════════════════════════════════
// mem.js — Memory access utilities for Civ2 MGE binary transpilation
//
// All DAT_ addresses are NUMBERS (offsets into _MEM). This mirrors
// how C works: DAT_xxx is a memory location. Using it loads the value.
// &DAT_xxx gives the address. In our model, DAT_xxx IS the address
// (offset), and v()/wv() perform the load/store.
//
// v(addr)      — read int32 value at address (what C does implicitly)
// wv(addr,val) — write int32 value at address (what C's = does)
// s32(addr,off)— read int32 at addr+off (explicit dereference)
// w32(addr,off,val)— write int32 at addr+off
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';
export const _MEM = G._MEM;

// ── Value read/write: what C does when you use DAT_xxx as a value ──
// In C, writing DAT_xxx reads/writes the bytes at that address.
// v() makes this explicit in JS.
// Width-aware: reads 1, 2, or 4 bytes based on the address's declared width.
const _widths = {};
export function setWidths(w) { Object.assign(_widths, w); }
export function v(addr) {
  const w = _widths[addr];
  if (w === 1) return _MEM[addr];
  if (w === 2) { const val = (_MEM[addr+1] << 8) | _MEM[addr]; return (val & 0x8000) ? (val | 0xFFFF0000) : val; }
  return _MEM[addr] | (_MEM[addr+1] << 8) | (_MEM[addr+2] << 16) | (_MEM[addr+3] << 24);
}
export function wv(addr, val) {
  const w = _widths[addr];
  _MEM[addr] = val & 0xFF;
  if (w === 1) return val;
  _MEM[addr+1] = (val >> 8) & 0xFF;
  if (w === 2) return val;
  _MEM[addr+2] = (val >> 16) & 0xFF;
  _MEM[addr+3] = (val >> 24) & 0xFF;
  return val;
}

// ── Signed/unsigned byte interpretation helpers ──
export function s8(val) { return (val & 0x80) ? (val | 0xFFFFFF00) : (val & 0xFF); }
export function u8(val) { return val & 0xFF; }

// ── Memory read helpers ──
// Dual-mode: if first arg is a number, read from _MEM at addr+off.
// If first arg is a Uint8Array/Buffer, read from it at off (legacy mode).
export function s16(arrOrAddr, off) {
  if (arrOrAddr == null) return 0;
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  const val = (buf[i + 1] << 8) | buf[i];
  return (val & 0x8000) ? (val | 0xFFFF0000) : val;
}
export function u16(arrOrAddr, off) {
  if (arrOrAddr == null) return 0;
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  return (buf[i + 1] << 8) | buf[i];
}
export function s32(arrOrAddr, off) {
  if (arrOrAddr == null) return 0;
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  return buf[i] | (buf[i+1] << 8) | (buf[i+2] << 16) | (buf[i+3] << 24);
}
export function u32(arrOrAddr, off) {
  if (arrOrAddr == null) return 0;
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  return (buf[i] | (buf[i+1] << 8) | (buf[i+2] << 16) | (buf[i+3] << 24)) >>> 0;
}

// ── Memory write helpers ──
export function w16(arrOrAddr, off, val) {
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  if (!buf || typeof buf === 'string') return; // guard against bad args
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  buf[i] = val & 0xFF;
  buf[i + 1] = (val >> 8) & 0xFF;
}
export function w32(arrOrAddr, off, val) {
  const buf = typeof arrOrAddr === 'number' ? _MEM : arrOrAddr;
  if (!buf || typeof buf === 'string') return;
  const i = (typeof arrOrAddr === 'number' ? arrOrAddr : 0) + off;
  buf[i] = val & 0xFF;
  buf[i + 1] = (val >> 8) & 0xFF;
  buf[i + 2] = (val >> 16) & 0xFF;
  buf[i + 3] = (val >> 24) & 0xFF;
}

// ── Write-and-return helpers (for comma-operator expressions) ──
export function w16r(addr, off, val) { w16(addr, off, val); return val; }
export function w32r(addr, off, val) { w32(addr, off, val); return val; }

// ── Pointer arithmetic: &DAT_xxx + offset → addr + offset ──
export function ptrAdd(addr, off) { return addr + off; }

// ── Loop guard: prevents infinite loops, logs diagnostic info ──
// Per-loop guard using a flat object for fast lookup
let _loopCounts = Object.create(null);
let _PER_LOOP_LIMIT = 500000;
export function loopGuard(fnName, line) {
  const key = fnName + ':' + line;
  const count = (_loopCounts[key] = (_loopCounts[key] || 0) + 1);
  if (count > _PER_LOOP_LIMIT) {
    _loopCounts[key] = 0;
    throw new Error('LOOP_GUARD: ' + fnName + ' line ' + line + ' exceeded ' + _PER_LOOP_LIMIT + ' iterations');
  }
}
export function loopReset() { _loopCounts = Object.create(null); }
export function setLoopLimit(n) { _PER_LOOP_LIMIT = n; }

// ── Tile data initialization ──
export function initMapTiles(tileArray) {
  G._tileData = tileArray;
}

// ── Tile offset computation ──
export function getTileOffset(param_1, param_2) {
  if (param_2 < 0 || v(DAT_006d1162) <= param_2 || param_1 < 0 || v(DAT_006d1160) <= param_1) {
    return -1;
  }
  const mw2 = v(DAT_006d1160) & 0xFFFFFFFE;
  return mw2 * param_2 * 3 + (param_1 & 0xFFFFFFFE) * 3;
}

// ── Tile byte read/write ──
export function tileRead(offset, byteIdx) {
  if (offset < 0 || !G._tileData) return _MEM[DAT_006d1188 + byteIdx];
  return G._tileData[offset + byteIdx];
}

export function tileWrite(offset, byteIdx, value) {
  if (offset >= 0 && G._tileData) G._tileData[offset + byteIdx] = value;
}
