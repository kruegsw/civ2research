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
// Node.js-only imports — guarded for browser compatibility
const _isNode = typeof process !== 'undefined' && process.versions?.node;
let readFileSync, readdirSync, fileURLToPath, dirname, join;
if (_isNode) {
  ({ readFileSync, readdirSync } = await import('fs'));
  ({ fileURLToPath } = await import('url'));
  ({ dirname, join } = await import('path'));
}

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

// Set DAT_ addresses on globalThis from G (these have Uint8Array views in the buffer)
for (const key of Object.keys(G)) {
  if (!(G[key] instanceof Uint8Array)) continue;
  const addrMatch = key.match(/([0-9a-fA-F]{8})$/);
  if (!addrMatch) continue;
  const addr = parseInt(addrMatch[1], 16);
  globalThis[key] = addr - _BASE;
}

// Also set PTR_ and s_ addresses on globalThis
// These aren't in globals.js but ARE in the transpiler output.
// Compute offsets from the known BASE. Addresses outside the buffer
// range get offset anyway — they'll access _MEM harmlessly (out-of-bounds
// reads return undefined, which the null guards handle).
if (_isNode) {
  const __dir = dirname(fileURLToPath(import.meta.url));
  const srcDir = join(__dir, '..', 'reverse_engineering', 'transpiler', 'output');
  try {
    const files = readdirSync(srcDir).filter(f => f.startsWith('block_') && f.endsWith('.js'));
    const seen = new Set();
    for (const f of files) {
      const src = readFileSync(join(srcDir, f), 'utf8');
      // PTR_ identifiers
      for (const m of src.matchAll(/\b(PTR_\w+_([0-9a-fA-F]{8}))\b/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          globalThis[m[1]] = parseInt(m[2], 16) - _BASE;
        }
      }
      // s_ string label identifiers
      for (const m of src.matchAll(/\b(s_\w+_([0-9a-fA-F]{8}))\b/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          globalThis[m[1]] = parseInt(m[2], 16) - _BASE;
        }
      }
    }
  } catch(e) {
    // If transpiler output not available, PTR_/s_ stay undefined
  }
}

// Load address widths from dat-classify.json and register with v()/wv()
if (_isNode) try {
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
globalThis.in_ECX[0x1ef] = 1;   // "is host" flag — FUN_00421f40 checks this for unit/city creation
globalThis.in_ECX[0x450] = 0xFF; globalThis.in_ECX[0x451] = 0xFF;
globalThis.in_ECX[0x452] = 0xFF; globalThis.in_ECX[0x453] = 0xFF;
globalThis.in_EAX = 0;
globalThis.in_EDX = 0;

// Auto-generated: missing _DAT_ globals (overlapping symbols)
globalThis.DAT_0062514c = 37092;
globalThis.DAT_00625ec0 = 40536;
globalThis.DAT_00626a28 = 43456;
globalThis.DAT_0062803c = 49108;
globalThis.DAT_0062d0c4 = 69724;
globalThis.DAT_00631ac8 = 88672;
globalThis.DAT_00633a7c = 96788;
globalThis.DAT_00633a8c = 96804;
globalThis.DAT_00633dac = 97604;
globalThis.DAT_00635e1c = 105908;
globalThis.DAT_00635e34 = 105932;
globalThis.DAT_00635ef0 = 106120;
globalThis.DAT_00635f00 = 106136;
globalThis.DAT_00638590 = 116008;
globalThis.DAT_00638594 = 116012;
globalThis.DAT_00638598 = 116016;
globalThis.DAT_006385b4 = 116044;
globalThis.DAT_006385b8 = 116048;
globalThis.DAT_006385d4 = 116076;
globalThis.DAT_006389d0 = 117096;
globalThis.DAT_00638dbc = 118100;
globalThis.DAT_00638dec = 118148;
globalThis.DAT_00639f24 = 122556;
globalThis.DAT_00639f2c = 122564;
globalThis.DAT_00639f30 = 122568;
globalThis.DAT_00639f34 = 122572;
globalThis.DAT_00639f58 = 122608;
globalThis.DAT_00639fac = 122692;
globalThis.DAT_0063aca4 = 126012;
globalThis.DAT_0063aed8 = 126576;
globalThis.DAT_0063caf0 = 133768;
globalThis.DAT_0063e4e8 = 140416;
globalThis.DAT_0063e950 = 141544;
globalThis.DAT_0063e964 = 141564;
globalThis.DAT_0063e98c = 141604;
globalThis.DAT_0063e994 = 141612;
globalThis.DAT_0063eacc = 141924;
globalThis.DAT_0063eace = 141926;
globalThis.DAT_0063ead0 = 141928;
globalThis.DAT_0063ead2 = 141930;
globalThis.DAT_0063ead4 = 141932;
globalThis.DAT_0063ead6 = 141934;
globalThis.DAT_0063ead8 = 141936;
globalThis.DAT_0063eadc = 141940;
globalThis.DAT_0063eade = 141942;
globalThis.DAT_0063ef68 = 143104;
globalThis.DAT_0063ef78 = 143120;
globalThis.DAT_0063ef7c = 143124;
globalThis.DAT_0063ef90 = 143144;
globalThis.DAT_0063f230 = 143816;
globalThis.DAT_0063f242 = 143834;
globalThis.DAT_0063f54c = 144612;
globalThis.DAT_0063f550 = 144616;
globalThis.DAT_0063f560 = 144632;
globalThis.DAT_0063f570 = 144648;
globalThis.DAT_0064bc12 = 195498;
globalThis.DAT_00655af6 = 236174;
globalThis.DAT_00655b1c = 236212;
globalThis.DAT_00666540 = 304344;
globalThis.DAT_006666f2 = 304778;
globalThis.DAT_0066c98c = 330020;
globalThis.DAT_0066c990 = 330024;
globalThis.DAT_00670d98 = 347440;
globalThis.DAT_00673b00 = 359064;
globalThis.DAT_00679fec = 384900;
globalThis.DAT_00679ff4 = 384908;
globalThis.DAT_00679ff8 = 384912;
globalThis.DAT_0067a000 = 384920;
globalThis.DAT_0067a434 = 385996;
globalThis.DAT_0067a44c = 386020;
globalThis.DAT_0067a464 = 386044;
globalThis.DAT_0067a4c4 = 386140;
globalThis.DAT_0067a4f4 = 386188;
globalThis.DAT_0067a524 = 386236;
globalThis.DAT_0067a53c = 386260;
globalThis.DAT_0067a644 = 386524;
globalThis.DAT_0067a9e0 = 387448;
globalThis.DAT_0068abd0 = 453480;
globalThis.DAT_0068abd4 = 453484;
globalThis.DAT_006a19d4 = 547180;
globalThis.DAT_006a1abc = 547412;
globalThis.DAT_006a1b68 = 547584;
globalThis.DAT_006a1b8c = 547620;
globalThis.DAT_006a1b90 = 547624;
globalThis.DAT_006a1b94 = 547628;
globalThis.DAT_006a2d60 = 552184;
globalThis.DAT_006a2d64 = 552188;
globalThis.DAT_006a2d68 = 552192;
globalThis.DAT_006a2d6c = 552196;
globalThis.DAT_006a2d70 = 552200;
globalThis.DAT_006a2d74 = 552204;
globalThis.DAT_006a2d78 = 552208;
globalThis.DAT_006a2d7c = 552212;
globalThis.DAT_006a5b08 = 563872;
globalThis.DAT_006a6610 = 566696;
globalThis.DAT_006aa754 = 583404;
globalThis.DAT_006aa758 = 583408;
globalThis.DAT_006aa770 = 583432;
globalThis.DAT_006aa784 = 583452;
globalThis.DAT_006ac2c4 = 590428;
globalThis.DAT_006ac2e0 = 590456;
globalThis.DAT_006ac3ac = 590660;
globalThis.DAT_006ac458 = 590832;
globalThis.DAT_006ac47c = 590868;
globalThis.DAT_006ac480 = 590872;
globalThis.DAT_006ac484 = 590876;
globalThis.DAT_006ac59c = 591156;
globalThis.DAT_006ac684 = 591388;
globalThis.DAT_006ac730 = 591560;
globalThis.DAT_006ac754 = 591596;
globalThis.DAT_006ac758 = 591600;
globalThis.DAT_006ac75c = 591604;
globalThis.DAT_006acbb4 = 592716;
globalThis.DAT_006acd40 = 593112;
globalThis.DAT_006acd44 = 593116;
globalThis.DAT_006acd48 = 593120;
globalThis.DAT_006acd4c = 593124;
globalThis.DAT_006ace6c = 593412;
globalThis.DAT_006ace88 = 593440;
globalThis.DAT_006acf54 = 593644;
globalThis.DAT_006ad000 = 593816;
globalThis.DAT_006ad024 = 593852;
globalThis.DAT_006ad028 = 593856;
globalThis.DAT_006ad02c = 593860;
globalThis.DAT_006ad120 = 594104;
globalThis.DAT_006ad124 = 594108;
globalThis.DAT_006ad128 = 594112;
globalThis.DAT_006ad12c = 594116;
globalThis.DAT_006ad178 = 594192;
globalThis.DAT_006ad674 = 595468;
globalThis.DAT_006ad67c = 595476;
globalThis.DAT_006ad69c = 595508;
globalThis.DAT_006c31b0 = 684360;
globalThis.DAT_006c31b4 = 684364;
globalThis.DAT_006c31b8 = 684368;
globalThis.DAT_006c31bc = 684372;
globalThis.DAT_006c31c0 = 684376;
globalThis.DAT_006c31cc = 684388;
globalThis.DAT_006c901c = 708532;
globalThis.DAT_006c908c = 708644;
globalThis.DAT_006c90a0 = 708664;
globalThis.DAT_006cec80 = 732184;
globalThis.DAT_006e502c = 823236;
globalThis.DAT_006e5030 = 823240;
globalThis.DAT_006e5034 = 823244;
globalThis.DAT_006e5038 = 823248;
globalThis.DAT_006e503c = 823252;
globalThis.DAT_006e5064 = 823292;
globalThis.DAT_006e509c = 823348;
globalThis.DAT_006e50a0 = 823352;
globalThis.DAT_006e50a4 = 823356;
globalThis.DAT_006e50a8 = 823360;
globalThis.DAT_006e50ac = 823364;
globalThis.DAT_006e50bc = 823380;
globalThis.DAT_006e50d0 = 823400;
globalThis.DAT_006e50d4 = 823404;
globalThis.DAT_006e50d8 = 823408;
globalThis.DAT_006e50dc = 823412;
globalThis.DAT_006e55d4 = 824684;
globalThis.DAT_006e55d8 = 824688;
globalThis.DAT_006e55dc = 824692;
globalThis.DAT_006554ec = 234628;
