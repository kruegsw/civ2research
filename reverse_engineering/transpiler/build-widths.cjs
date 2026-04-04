#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// build-widths.cjs — Extract DAT_ access widths from P-code output
//
// Scans all P-code transpiler output files for s8/u8/s16/u16/s32/u32/v
// calls on DAT_ addresses and builds a width map.
//
// The P-code transpiler has authoritative type info from Ghidra's IR:
//   LOAD(1) → s8/u8 (1 byte)
//   LOAD(2) → s16/u16 (2 bytes)
//   LOAD(4) → s32/u32/v (4 bytes)
//
// Output: dat-widths.json mapping each DAT_ address to its width
//
// Usage: node build-widths.cjs
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

const PCODE_DIR = path.join(__dirname, 'output-ghidra');
const REGEX_DIR = path.join(__dirname, 'output');

// Width of each helper function
const HELPER_WIDTH = {
  's8': 1, 'u8': 1,
  's16': 2, 'u16': 2,
  's32': 4, 'u32': 4,
  'v': 4, 'wv': 4,
  'w16': 2, 'w32': 4,
  'w16r': 2, 'w32r': 4,
};

// Extract all DAT_ accesses with their widths from a file
function extractAccesses(source, helpers) {
  const accesses = new Map(); // DAT_addr → Set of widths

  for (const [helper, width] of Object.entries(helpers)) {
    // Match: helper(DAT_xxx  or  helper(DAT_xxx,
    const re = new RegExp('\\b' + helper + '\\(\\s*(DAT_[0-9a-fA-F]+)', 'g');
    let m;
    while ((m = re.exec(source)) !== null) {
      const addr = m[1];
      if (!accesses.has(addr)) accesses.set(addr, new Set());
      accesses.get(addr).add(width);
    }
  }

  // Also match _MEM[DAT_xxx] which is byte access
  const memRe = /_MEM\[\s*(DAT_[0-9a-fA-F]+)\s*[\]\+]/g;
  let m2;
  while ((m2 = memRe.exec(source)) !== null) {
    const addr = m2[1];
    if (!accesses.has(addr)) accesses.set(addr, new Set());
    accesses.get(addr).add(1);
  }

  return accesses;
}

// ── Scan P-code output ──
console.log('Scanning P-code output...');
const pcodeWidths = new Map(); // DAT_addr → Set of widths from P-code

const pcodeFiles = fs.readdirSync(PCODE_DIR).filter(f => f.startsWith('block_') && f.endsWith('.js'));
for (const file of pcodeFiles) {
  const source = fs.readFileSync(path.join(PCODE_DIR, file), 'utf-8');
  const accesses = extractAccesses(source, HELPER_WIDTH);
  for (const [addr, widths] of accesses) {
    if (!pcodeWidths.has(addr)) pcodeWidths.set(addr, new Set());
    for (const w of widths) pcodeWidths.get(addr).add(w);
  }
}

// ── Scan regex output for comparison ──
console.log('Scanning regex output...');
const regexWidths = new Map();
const regexFiles = fs.readdirSync(REGEX_DIR).filter(f => f.startsWith('block_') && f.endsWith('.js'));
for (const file of regexFiles) {
  const source = fs.readFileSync(path.join(REGEX_DIR, file), 'utf-8');
  const accesses = extractAccesses(source, HELPER_WIDTH);
  for (const [addr, widths] of accesses) {
    if (!regexWidths.has(addr)) regexWidths.set(addr, new Set());
    for (const w of widths) regexWidths.get(addr).add(w);
  }
}

// ── Build the width map ──
// For each DAT_ address, determine the authoritative width from P-code.
// If P-code uses only one width, that's the answer.
// If P-code uses multiple widths (e.g., both s16 and s32), use the most common.
// If P-code has no data, fall back to regex width.

const widthMap = {};
const allAddrs = new Set([...pcodeWidths.keys(), ...regexWidths.keys()]);

let stats = { total: 0, pcode_only: 0, mixed: 0, mismatches: 0 };

for (const addr of [...allAddrs].sort()) {
  const pw = pcodeWidths.get(addr);
  const rw = regexWidths.get(addr);

  if (!pw) continue; // No P-code data — skip

  const pcodeSet = [...pw];
  const regexSet = rw ? [...rw] : [];

  // Determine authoritative width
  let width;
  if (pcodeSet.length === 1) {
    width = pcodeSet[0];
  } else {
    // Multiple widths in P-code — use the smallest non-byte width,
    // or the most common. byte(1) + larger usually means byte access
    // within a larger field.
    const nonByte = pcodeSet.filter(w => w > 1);
    width = nonByte.length > 0 ? Math.min(...nonByte) : 1;
    stats.mixed++;
  }

  widthMap[addr] = width;
  stats.total++;

  // Check for mismatches with regex
  if (rw && !rw.has(width)) {
    // Regex accesses this at a different width
    const regexWidth = regexSet.length === 1 ? regexSet[0] : Math.max(...regexSet);
    if (regexWidth !== width && width < 4) {
      stats.mismatches++;
    }
  }
}

// ── Report ──
console.log(`\nTotal DAT_ addresses with P-code data: ${stats.total}`);
console.log(`Mixed widths (P-code uses multiple): ${stats.mixed}`);
console.log(`Width mismatches (regex differs from P-code): ${stats.mismatches}`);

// Show the non-4-byte globals (the interesting ones)
const narrow = Object.entries(widthMap).filter(([_, w]) => w < 4);
console.log(`\nNarrow globals (width < 4): ${narrow.length}`);
console.log(`  1-byte: ${narrow.filter(([_, w]) => w === 1).length}`);
console.log(`  2-byte: ${narrow.filter(([_, w]) => w === 2).length}`);

// Show specific mismatches where regex uses v() (4-byte) but P-code says smaller
console.log(`\nKey mismatches (regex reads as 4-byte, P-code says narrower):`);
let mismatchCount = 0;
for (const [addr, width] of Object.entries(widthMap)) {
  if (width >= 4) continue;
  const rw = regexWidths.get(addr);
  if (rw && rw.has(4)) {
    mismatchCount++;
    if (mismatchCount <= 30) {
      console.log(`  ${addr}: P-code=${width} byte(s), regex has 4-byte access`);
    }
  }
}
if (mismatchCount > 30) console.log(`  ... and ${mismatchCount - 30} more`);
console.log(`Total: ${mismatchCount} globals read as 4-byte but should be narrower`);

// ── Write output ──
const outPath = path.join(__dirname, 'dat-widths.json');
fs.writeFileSync(outPath, JSON.stringify(widthMap, null, 2));
console.log(`\nWritten: ${outPath} (${Object.keys(widthMap).length} entries)`);

// Also write a list of just the narrow globals for the transpiler
const narrowMap = {};
for (const [addr, width] of Object.entries(widthMap)) {
  if (width < 4) narrowMap[addr] = width;
}
const narrowPath = path.join(__dirname, 'dat-narrow.json');
fs.writeFileSync(narrowPath, JSON.stringify(narrowMap, null, 2));
console.log(`Written: ${narrowPath} (${Object.keys(narrowMap).length} narrow globals)`);
