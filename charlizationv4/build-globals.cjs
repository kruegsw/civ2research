#!/usr/bin/env node
// build-globals.cjs — Generate globals.js with a single flat memory buffer
//
// Every DAT_ address used as an array gets a Uint8Array view into ONE shared
// ArrayBuffer. Writes at any address are immediately visible at neighboring
// addresses — matching the binary's flat memory model.
//
// Run: node charlizationv4/build-globals.cjs

const fs = require('fs');
const path = require('path');

const blocksDir = path.join(__dirname, 'blocks');
const fnUtilsPath = path.join(__dirname, 'fn_utils.js');

// ═══════════════════════════════════════════════════════════════════
// Step 1: Scan all code to classify each DAT_ as array, scalar, or both
// ═══════════════════════════════════════════════════════════════════

const allRefs = new Map(); // name → { isArray, isScalar }

const files = [
  ...fs.readdirSync(blocksDir).filter(f => f.endsWith('.js')).map(f => path.join(blocksDir, f)),
  fnUtilsPath,
];

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  // Detect array usage: G.DAT_XXX[ (bracket access)
  for (const m of src.matchAll(/G\.(DAT_[0-9a-fA-F]+(?:_val)?)\[/g)) {
    if (!allRefs.has(m[1])) allRefs.set(m[1], { isArray: false, isScalar: false });
    allRefs.get(m[1]).isArray = true;
  }
  // Detect array usage: s16/u16/s32/u32/w16/w32(G.DAT_XXX, ...) — passed to mem helpers
  for (const m of src.matchAll(/(?:s8|u8|s16|u16|s32|u32|w16|w32)\(G\.(DAT_[0-9a-fA-F]+(?:_val)?)\s*,/g)) {
    if (!allRefs.has(m[1])) allRefs.set(m[1], { isArray: false, isScalar: false });
    allRefs.get(m[1]).isArray = true;
  }
  for (const m of src.matchAll(/G\.(DAT_[0-9a-fA-F]+(?:_val)?)(?!\[)(?=\s*[=!<>&|+\-*\/,;)\]]|\s*$)/gm)) {
    if (!allRefs.has(m[1])) allRefs.set(m[1], { isArray: false, isScalar: false });
    allRefs.get(m[1]).isScalar = true;
  }
}

// Also collect DAT_ from the transpiler output sources
// The transpiler output uses DAT_ as arguments to memory helpers (s32, u16, etc.)
// and as byte array access (DAT_XXX[offset]). Classify based on usage.
const srcDir = path.join(__dirname, '..', 'reverse_engineering', 'transpiler', 'output');
const arrayDats = new Set();
const scalarDats = new Set();
for (const file of fs.readdirSync(srcDir).filter(f => f.startsWith('block_') && f.endsWith('.js'))) {
  const src = fs.readFileSync(path.join(srcDir, file), 'utf8');

  // DAT_ used as first arg to memory helpers → array
  for (const m of src.matchAll(/\b(?:s8|u8|s16|u16|s32|u32|w16|w32)\(\s*(DAT_[0-9a-fA-F]+)/g)) {
    arrayDats.add(m[1]);
  }
  // DAT_ used with bracket access → array
  for (const m of src.matchAll(/\b(DAT_[0-9a-fA-F]+)\s*\[/g)) {
    arrayDats.add(m[1]);
  }
  // All DAT_ references (to catch scalars too)
  for (const m of src.matchAll(/\b(DAT_[0-9a-fA-F]+)\b/g)) {
    if (!arrayDats.has(m[1])) scalarDats.add(m[1]);
  }
  // PTR_ and s_ references are handled by globals-init.js (not here)
  // Including them here would shift BASE and break all DAT_ offsets

  // Also handle old-style declarations if present (mem.js)
  for (const line of src.split('\n')) {
    if (!line.startsWith('let DAT_') && !line.startsWith('export let DAT_') &&
        !line.startsWith('export const DAT_')) continue;
    const stripped = line.replace(/^(?:export\s+)?(?:let|const)\s+/, '').replace(/;.*$/, '').trim();
    for (const part of stripped.split(/,\s*(?=DAT_)/)) {
      const m2 = part.match(/^(DAT_[0-9a-fA-F]+(?:_val)?)\s*=\s*(.+)$/);
      if (m2) {
        const val = m2[2].trim();
        if (val.includes('Array') || val === '[]') arrayDats.add(m2[1]);
      }
    }
  }
}
// Also scan v4 infrastructure files for DAT_ array usage
const v4Files = fs.readdirSync(__dirname)
  .filter(f => f.endsWith('.js') && f !== 'globals.js' && !f.startsWith('block_'));
for (const file of v4Files) {
  const src = fs.readFileSync(path.join(__dirname, file), 'utf8');
  for (const m of src.matchAll(/G\.(DAT_[0-9a-fA-F]+)\s*\[/g)) {
    arrayDats.add(m[1]);
  }
  for (const m of src.matchAll(/\b(?:s16|u16|s32|u32|w16|w32)\(\s*G\.(DAT_[0-9a-fA-F]+)/g)) {
    arrayDats.add(m[1]);
  }
}

// Also load authoritative classification from dat-classify.json if it exists
const classifyPath = path.join(__dirname, 'dat-classify.json');
if (fs.existsSync(classifyPath)) {
  const classify = JSON.parse(fs.readFileSync(classifyPath, 'utf8'));
  for (const name of classify.arrays) {
    arrayDats.add(name);
  }
  console.log(`Loaded ${classify.arrays.length} array classifications from dat-classify.json`);
}

// Build allRefs from discovered classifications — always upgrade scalar → array
for (const name of arrayDats) {
  if (!allRefs.has(name)) allRefs.set(name, { isArray: true, isScalar: false });
  else allRefs.get(name).isArray = true; // upgrade to array if already known
}
for (const name of scalarDats) {
  if (!allRefs.has(name) && !arrayDats.has(name)) allRefs.set(name, { isArray: false, isScalar: true });
}

// ═══════════════════════════════════════════════════════════════════
// Step 2: Compute flat memory range for array addresses
// ═══════════════════════════════════════════════════════════════════

let minAddr = Infinity, maxAddr = 0;
const arrayNames = [];

// ALL addresses become Uint8Array views — no scalars.
// In the binary, every address is just a location in flat memory.
// Extract hex address from the END of the identifier name.
for (const [name, info] of allRefs) {
  // Extract the 8-char hex address from the end of the name
  const addrMatch = name.match(/([0-9a-fA-F]{8})$/);
  if (!addrMatch) continue;
  const addr = parseInt(addrMatch[1], 16);
  if (isNaN(addr)) continue;

  arrayNames.push({ name, addr });
  if (addr < minAddr) minAddr = addr;
  if (addr > maxAddr) maxAddr = addr;
}

// Add generous padding to the max address (largest known structure is units at 64KB)
const BASE = minAddr;
const SIZE = (maxAddr - BASE) + 0x20000; // +128KB padding for largest arrays
console.log(`Flat memory: BASE=0x${BASE.toString(16)}, SIZE=${SIZE} (${(SIZE/1024).toFixed(0)} KB)`);
console.log(`Array addresses: ${arrayNames.length} (all addresses — no scalars)`);

// ═══════════════════════════════════════════════════════════════════
// Step 3: Generate globals.js
// ═══════════════════════════════════════════════════════════════════

let out = `// ═══════════════════════════════════════════════════════════════════
// globals.js — Flat memory model for Civ2 MGE binary transpilation
//
// ONE shared ArrayBuffer backs all DAT_ array addresses.
// Writes at any address are visible at neighboring addresses,
// matching the binary's flat memory model.
//
// Generated by build-globals.cjs — do not edit manually.
//
// Memory range: 0x${BASE.toString(16)}..0x${(BASE + SIZE).toString(16)} (${(SIZE/1024).toFixed(0)} KB)
// ═══════════════════════════════════════════════════════════════════

// ── Single flat memory buffer ──
const _BUF = new ArrayBuffer(${SIZE});
const _MEM = new Uint8Array(_BUF);

export const G = {
  // Internal state
  _tileData: null,
  _MEM,  // exposed for debugging

  // CPU register globals (set by caller, read by callee)
  // Default to empty Uint8Arrays so headless in_ECX[offset] doesn't crash
  in_ECX: new Uint8Array(8192),
  in_EAX: 0,
  in_EDX: 0,

`;

// Write array views — sorted by address
const sortedArrays = arrayNames.sort((a, b) => a.addr - b.addr);
out += `  // ═══ Array views into flat memory ═══\n`;
for (const { name, addr } of sortedArrays) {
  const offset = addr - BASE;
  out += `  ${name}: new Uint8Array(_BUF, ${offset}),  // 0x${addr.toString(16)}\n`;
}

out += `};\n\n`;
out += `// Memory base offset for debugging: 0x${BASE.toString(16)}\n`;
out += `// To read raw memory: G._MEM[address - 0x${BASE.toString(16)}]\n`;

fs.writeFileSync(path.join(__dirname, 'globals.js'), out);
console.log(`Generated globals.js: ${sortedArrays.length} array views (all addresses, no scalars)`);
