// ═══════════════════════════════════════════════════════════════════
// globals-init.js — Set DAT_ addresses as numbers on globalThis
//
// Each DAT_xxx = the OFFSET into the flat memory buffer (_MEM).
// v(DAT_xxx) reads the value. wv(DAT_xxx, val) writes it.
// s32(DAT_xxx, off) reads at address + offset.
//
// This mirrors C: DAT_xxx is a memory address. Using it loads bytes.
// &DAT_xxx gives the address. In our model, DAT_xxx IS the address.
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';
import { setWidths } from './mem.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// The base address and _MEM buffer
// Compute BASE from the actual minimum address across all keys
let _BASE = Infinity;
for (const key of Object.keys(G)) {
  const m = key.match(/([0-9a-fA-F]{8})$/);
  if (m) {
    const addr = parseInt(m[1], 16);
    if (addr < _BASE) _BASE = addr;
  }
}
if (_BASE === Infinity) _BASE = 0;

// Set every DAT_ address on globalThis as a number (offset into _MEM)
// Set ALL addresses on globalThis: DAT_, PTR_, s_ — everything in G
for (const key of Object.keys(G)) {
  if (!(G[key] instanceof Uint8Array)) continue; // skip non-address properties
  // Extract hex address from end of key
  const addrMatch = key.match(/([0-9a-fA-F]{8})$/);
  if (!addrMatch) continue;
  const addr = parseInt(addrMatch[1], 16);
  const offset = addr - _BASE;
  globalThis[key] = offset;
}

// Load address widths from dat-classify.json and register with v()/wv()
try {
  const __dir = dirname(fileURLToPath(import.meta.url));
  const classify = JSON.parse(readFileSync(join(__dir, 'dat-classify.json'), 'utf8'));
  if (classify.widths) {
    // Convert DAT_ names to offsets for the _widths lookup
    const offsetWidths = {};
    for (const [name, width] of Object.entries(classify.widths)) {
      const addr = parseInt(name.replace('DAT_', ''), 16);
      offsetWidths[addr - _BASE] = width;
    }
    setWidths(offsetWidths);
  }
} catch (e) {
  // No width data — v() defaults to 32-bit reads
}

// Also expose G and _MEM for infrastructure
globalThis.G = G;

// CPU register globals
globalThis.in_ECX = new Uint8Array(8192);
globalThis.in_ECX[0x450] = 0xFF; globalThis.in_ECX[0x451] = 0xFF;
globalThis.in_ECX[0x452] = 0xFF; globalThis.in_ECX[0x453] = 0xFF;
globalThis.in_EAX = 0;
globalThis.in_EDX = 0;
