// ═══════════════════════════════════════════════════════════════════
// globals-init.js — Populate globalThis with flat memory DAT_ globals
//
// Import this once before any block code runs. Creates a single shared
// ArrayBuffer and defines every DAT_ address on globalThis so the
// transpiler output's bare DAT_xxx identifiers resolve automatically.
//
// Each DAT_ is a Uint8Array view into flat memory with:
//   - valueOf() returning int32 at offset 0 (for arithmetic: DAT_xxx + 3)
//   - toString() returning the numeric string (not "0,0,0,...")
//   - Array access (DAT_xxx[idx]) working normally
//   - s32/w32 working normally (receives the Uint8Array)
//
// Scalar writes (DAT_xxx = 5) are handled by making each property
// non-writable — the transpiler's w32() wrapping in transform.cjs
// handles writes. But... we're removing that wrapping.
//
// NEW APPROACH: DAT_xxx = 5 writes 4 bytes via Object.defineProperty setter.
// DAT_xxx reads return the Uint8Array (for s32/bracket access).
// DAT_xxx + 3 works via valueOf() on the Uint8Array.
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';

// Helper to create a Uint8Array view with valueOf/toString overrides
function makeView(buf, offset) {
  const view = new Uint8Array(buf, offset);
  Object.defineProperty(view, 'valueOf', {
    value() { return this[0] | (this[1] << 8) | (this[2] << 16) | (this[3] << 24); },
    writable: true, configurable: true
  });
  Object.defineProperty(view, 'toString', {
    value() { return String(this.valueOf()); },
    writable: true, configurable: true
  });
  return view;
}

// Get the backing buffer from G
const _BUF = G._MEM.buffer;
const _BASE = G._BASE || 0; // set by build-globals

// Populate globalThis with all DAT_ properties from G
for (const key of Object.keys(G)) {
  if (!key.startsWith('DAT_')) continue;
  const view = G[key];
  if (!(view instanceof Uint8Array)) continue;

  // Store the view in a closure for the getter/setter
  const backing = view;

  Object.defineProperty(globalThis, key, {
    get() { return backing; },
    set(val) {
      // Scalar write: DAT_xxx = 5 → write 4 bytes to flat memory
      if (typeof val === 'number') {
        backing[0] = val & 0xFF;
        backing[1] = (val >> 8) & 0xFF;
        backing[2] = (val >> 16) & 0xFF;
        backing[3] = (val >> 24) & 0xFF;
      }
      // If val is a Uint8Array (e.g., DAT_xxx = ptrAdd(...)), copy reference
      // This case shouldn't normally happen with flat memory model
    },
    configurable: true,
    enumerable: true
  });
}

// Also expose G itself for infrastructure code
globalThis.G = G;

// CPU register globals — simple get/set on globalThis
// in_ECX is typically the MFC "this" pointer. Default to a dummy buffer
// with specific fields set so UI functions are no-ops:
//   offset 0x450: -1 (timer ID = inactive, makes FUN_0042a768 skip)
let _in_ECX = G.in_ECX || new Uint8Array(8192);
_in_ECX[0x450] = 0xFF; _in_ECX[0x451] = 0xFF; _in_ECX[0x452] = 0xFF; _in_ECX[0x453] = 0xFF;
let _in_EAX = 0;
let _in_EDX = 0;

Object.defineProperty(globalThis, 'in_ECX', {
  get() { return _in_ECX; },
  set(v) { _in_ECX = v; },
  configurable: true
});
Object.defineProperty(globalThis, 'in_EAX', {
  get() { return _in_EAX; },
  set(v) { _in_EAX = v; },
  configurable: true
});
Object.defineProperty(globalThis, 'in_EDX', {
  get() { return _in_EDX; },
  set(v) { _in_EDX = v; },
  configurable: true
});
