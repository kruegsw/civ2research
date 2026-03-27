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

// The base address and _MEM buffer
const _BASE = parseInt(Object.keys(G).find(k => k.startsWith('DAT_'))?.replace('DAT_', '') || '0', 16);

// Set every DAT_ address on globalThis as a number (offset into _MEM)
for (const key of Object.keys(G)) {
  if (!key.startsWith('DAT_')) continue;
  const addr = parseInt(key.replace('DAT_', ''), 16);
  const offset = addr - _BASE;
  globalThis[key] = offset;
}

// Also expose G and _MEM for infrastructure
globalThis.G = G;

// CPU register globals
globalThis.in_ECX = new Uint8Array(8192);
globalThis.in_ECX[0x450] = 0xFF; globalThis.in_ECX[0x451] = 0xFF;
globalThis.in_ECX[0x452] = 0xFF; globalThis.in_ECX[0x453] = 0xFF;
globalThis.in_EAX = 0;
globalThis.in_EDX = 0;
