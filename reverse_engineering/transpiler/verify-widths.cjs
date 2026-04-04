#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// verify-widths.cjs — Cross-reference DAT_ widths from 3 sources
//
// 1. dat-widths.json    — P-code widths (1496 entries, authoritative)
// 2. dat-narrow.json    — subset used by transpiler (302 entries, w<4)
// 3. dat-classify.json  — runtime widths from charlizationv4
//
// Also scans decompiled C source for cast-based width evidence:
//   *(short *)(&DAT_xxx ...)  → width 2
//   *(ushort *)(&DAT_xxx ...) → width 2
//   *(char *)(&DAT_xxx ...)   → width 1
//   (byte)DAT_xxx             → width 1
//   (char)(&DAT_xxx ...)      → width 1  (array element byte access)
//   *(int *)(&DAT_xxx ...)    → width 4
//   bare DAT_xxx in int ctx   → width 4
//
// Reports conflicts, especially dangerous ones where P-code says
// narrow but transpiler treats as 4-byte (clobbers neighbors).
// ═══════════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');

// ── Load data sources ──
const DIR = __dirname;
const datWidths = JSON.parse(fs.readFileSync(path.join(DIR, 'dat-widths.json'), 'utf8'));
const datNarrow = JSON.parse(fs.readFileSync(path.join(DIR, 'dat-narrow.json'), 'utf8'));

let datClassify = null;
const classifyPath = path.join(DIR, '../../charlizationv4/dat-classify.json');
if (fs.existsSync(classifyPath)) {
  datClassify = JSON.parse(fs.readFileSync(classifyPath, 'utf8'));
  console.log(`Loaded dat-classify.json: ${Object.keys(datClassify.widths).length} widths`);
} else {
  console.log('dat-classify.json not found — skipping runtime width comparison');
}

console.log(`dat-widths.json: ${Object.keys(datWidths).length} entries`);
console.log(`dat-narrow.json: ${Object.keys(datNarrow).length} entries`);

// ── Scan C source files for cast-based width evidence ──
const DECOMPILED_DIR = path.join(DIR, '../decompiled');
const cFiles = fs.readdirSync(DECOMPILED_DIR).filter(f => f.startsWith('block_') && f.endsWith('.c'));

// Map: DAT_addr → { widths: Set<number>, evidence: [{file, line, width, pattern}] }
const cEvidence = new Map();

function addEvidence(addr, width, file, lineNum, pattern) {
  if (!cEvidence.has(addr)) cEvidence.set(addr, { widths: new Set(), evidence: [] });
  const entry = cEvidence.get(addr);
  entry.widths.add(width);
  // Keep up to 3 evidence lines per addr
  if (entry.evidence.length < 3) {
    entry.evidence.push({ file, line: lineNum, width, pattern });
  }
}

for (const file of cFiles) {
  const source = fs.readFileSync(path.join(DECOMPILED_DIR, file), 'utf8');
  const lines = source.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // *(short *)(&DAT_xxx ...) or *(short *)&DAT_xxx
    let m;
    const shortPtrRe = /\*\((short|ushort) \*\)\(?&(DAT_[0-9a-fA-F]+)/g;
    while ((m = shortPtrRe.exec(line)) !== null) {
      addEvidence(m[2], 2, file, i + 1, `*(${m[1]} *)(&${m[2]}...)`);
    }

    // *(char *)(&DAT_xxx ...)
    const charPtrRe = /\*\(char \*\)\(?&(DAT_[0-9a-fA-F]+)/g;
    while ((m = charPtrRe.exec(line)) !== null) {
      addEvidence(m[1], 1, file, i + 1, `*(char *)(&${m[1]}...)`);
    }

    // *(int *)(&DAT_xxx ...) or *(uint *)
    const intPtrRe = /\*\((int|uint) \*\)\(?&(DAT_[0-9a-fA-F]+)/g;
    while ((m = intPtrRe.exec(line)) !== null) {
      addEvidence(m[2], 4, file, i + 1, `*(${m[1]} *)(&${m[2]}...)`);
    }

    // (byte)DAT_xxx — cast to byte = 1-byte access
    const byteRe = /\(byte\)(DAT_[0-9a-fA-F]+)/g;
    while ((m = byteRe.exec(line)) !== null) {
      addEvidence(m[1], 1, file, i + 1, `(byte)${m[1]}`);
    }

    // (char)(&DAT_xxx ...) — byte access into array base
    const charCastRe = /\(char\)\(&(DAT_[0-9a-fA-F]+)/g;
    while ((m = charCastRe.exec(line)) !== null) {
      addEvidence(m[1], 1, file, i + 1, `(char)(&${m[1]}...)`);
    }
  }
}

console.log(`C source scan: ${cEvidence.size} unique DAT_ addresses with cast evidence\n`);

// ═══════════════════════════════════════════════════════════════════
// ANALYSIS 1: P-code says narrow, but dat-narrow.json is missing it
// (transpiler will treat as 4-byte → reads/writes clobber neighbors)
// ═══════════════════════════════════════════════════════════════════
console.log('═══════════════════════════════════════════════════════════════');
console.log('ANALYSIS 1: P-code narrow but MISSING from dat-narrow.json');
console.log('  (transpiler treats as 4-byte → potential neighbor clobber)');
console.log('═══════════════════════════════════════════════════════════════\n');

const missingFromNarrow = [];
for (const [addr, pcodeW] of Object.entries(datWidths)) {
  if (pcodeW >= 4) continue; // 4-byte is fine as default
  if (datNarrow[addr] !== undefined) continue; // already in narrow, good
  const cEv = cEvidence.get(addr);
  missingFromNarrow.push({ addr, pcodeW, cEv });
}

if (missingFromNarrow.length === 0) {
  console.log('  None found — dat-narrow.json covers all P-code narrow globals.\n');
} else {
  console.log(`  Found ${missingFromNarrow.length} globals:\n`);
  for (const { addr, pcodeW, cEv } of missingFromNarrow.sort((a, b) => a.addr.localeCompare(b.addr))) {
    const cStr = cEv ? ` | C evidence: ${[...cEv.widths].join(',')}b (${cEv.evidence[0]?.pattern})` : ' | no C evidence';
    console.log(`  ${addr}: P-code=${pcodeW}b, not in narrow (→ 4b)${cStr}`);
  }
  console.log();
}

// ═══════════════════════════════════════════════════════════════════
// ANALYSIS 2: dat-narrow has entries NOT in P-code
// (narrow was manually added? or P-code coverage gap?)
// ═══════════════════════════════════════════════════════════════════
console.log('═══════════════════════════════════════════════════════════════');
console.log('ANALYSIS 2: dat-narrow entries NOT in dat-widths (P-code)');
console.log('═══════════════════════════════════════════════════════════════\n');

const narrowNotInPcode = [];
for (const [addr, narrowW] of Object.entries(datNarrow)) {
  if (datWidths[addr] === undefined) {
    const cEv = cEvidence.get(addr);
    narrowNotInPcode.push({ addr, narrowW, cEv });
  }
}

if (narrowNotInPcode.length === 0) {
  console.log('  None — all dat-narrow entries have P-code backing.\n');
} else {
  console.log(`  Found ${narrowNotInPcode.length} entries:\n`);
  for (const { addr, narrowW, cEv } of narrowNotInPcode.sort((a, b) => a.addr.localeCompare(b.addr))) {
    const cStr = cEv ? ` | C: ${[...cEv.widths].join(',')}b` : ' | no C evidence';
    console.log(`  ${addr}: narrow=${narrowW}b, no P-code entry${cStr}`);
  }
  console.log();
}

// ═══════════════════════════════════════════════════════════════════
// ANALYSIS 3: Width disagreements between P-code and dat-narrow
// ═══════════════════════════════════════════════════════════════════
console.log('═══════════════════════════════════════════════════════════════');
console.log('ANALYSIS 3: P-code vs dat-narrow width disagreements');
console.log('═══════════════════════════════════════════════════════════════\n');

const widthDisagreements = [];
for (const [addr, narrowW] of Object.entries(datNarrow)) {
  const pcodeW = datWidths[addr];
  if (pcodeW !== undefined && pcodeW !== narrowW) {
    widthDisagreements.push({ addr, pcodeW, narrowW });
  }
}

if (widthDisagreements.length === 0) {
  console.log('  None — P-code and dat-narrow agree on all shared entries.\n');
} else {
  console.log(`  Found ${widthDisagreements.length} disagreements:\n`);
  for (const { addr, pcodeW, narrowW } of widthDisagreements.sort((a, b) => a.addr.localeCompare(b.addr))) {
    const cEv = cEvidence.get(addr);
    const cStr = cEv ? ` | C: ${[...cEv.widths].join(',')}b` : '';
    const risk = (pcodeW < narrowW) ? 'LOW (narrow reads less)' :
                 (pcodeW > narrowW) ? 'MEDIUM (narrow reads less than P-code)' : '';
    console.log(`  ${addr}: P-code=${pcodeW}b, narrow=${narrowW}b ${risk}${cStr}`);
  }
  console.log();
}

// ═══════════════════════════════════════════════════════════════════
// ANALYSIS 4: C source vs P-code width disagreements
// ═══════════════════════════════════════════════════════════════════
console.log('═══════════════════════════════════════════════════════════════');
console.log('ANALYSIS 4: C source cast evidence vs P-code disagreements');
console.log('═══════════════════════════════════════════════════════════════\n');

const cVsPcode = [];
for (const [addr, cData] of cEvidence) {
  const pcodeW = datWidths[addr];
  if (pcodeW === undefined) continue;
  // Check if C evidence contradicts P-code
  // Only flag if C has a width that is DIFFERENT from P-code and < 4
  // (bare int access is the default, so only flag explicit narrow casts)
  for (const cw of cData.widths) {
    if (cw < 4 && pcodeW === 4) {
      // C says narrow, P-code says 4 — possible P-code missed it
      cVsPcode.push({ addr, pcodeW, cWidth: cw, evidence: cData.evidence });
    } else if (cw === 4 && pcodeW < 4) {
      // C says 4, P-code says narrow — struct access via offset?
      cVsPcode.push({ addr, pcodeW, cWidth: cw, evidence: cData.evidence });
    }
  }
}

if (cVsPcode.length === 0) {
  console.log('  None — C casts and P-code agree.\n');
} else {
  console.log(`  Found ${cVsPcode.length} disagreements:\n`);
  for (const item of cVsPcode.sort((a, b) => a.addr.localeCompare(b.addr))) {
    const inNarrow = datNarrow[item.addr];
    const narrowStr = inNarrow !== undefined ? `, narrow=${inNarrow}b` : ', NOT in narrow';
    const ev = item.evidence[0];
    console.log(`  ${item.addr}: C=${item.cWidth}b, P-code=${item.pcodeW}b${narrowStr} | ${ev.file}:${ev.line} ${ev.pattern}`);
  }
  console.log();
}

// ═══════════════════════════════════════════════════════════════════
// ANALYSIS 5: dat-classify (runtime) vs P-code width disagreements
// ═══════════════════════════════════════════════════════════════════
if (datClassify) {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('ANALYSIS 5: Runtime (dat-classify) vs P-code disagreements');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const runtimeVsPcode = [];
  for (const [addr, runtimeW] of Object.entries(datClassify.widths)) {
    const pcodeW = datWidths[addr];
    if (pcodeW === undefined) continue;
    if (runtimeW !== pcodeW) {
      runtimeVsPcode.push({ addr, pcodeW, runtimeW });
    }
  }

  if (runtimeVsPcode.length === 0) {
    console.log('  None — runtime and P-code agree on all shared globals.\n');
  } else {
    // Categorize by risk
    const high = runtimeVsPcode.filter(x => x.pcodeW < x.runtimeW && x.pcodeW < 4);
    const medium = runtimeVsPcode.filter(x => x.pcodeW > x.runtimeW);
    const low = runtimeVsPcode.filter(x => x.pcodeW < x.runtimeW && x.pcodeW >= 4);

    console.log(`  Found ${runtimeVsPcode.length} disagreements (${high.length} HIGH, ${medium.length} MEDIUM):\n`);

    if (high.length > 0) {
      console.log('  HIGH RISK (P-code narrow, runtime wider):');
      for (const { addr, pcodeW, runtimeW } of high.slice(0, 30).sort((a, b) => a.addr.localeCompare(b.addr))) {
        const inNarrow = datNarrow[addr];
        const narrowStr = inNarrow !== undefined ? `, narrow=${inNarrow}b` : ', NOT in narrow';
        console.log(`    ${addr}: P-code=${pcodeW}b, runtime=${runtimeW}b${narrowStr}`);
      }
      if (high.length > 30) console.log(`    ... and ${high.length - 30} more`);
      console.log();
    }

    if (medium.length > 0) {
      console.log('  MEDIUM RISK (P-code wider, runtime narrower):');
      for (const { addr, pcodeW, runtimeW } of medium.slice(0, 30).sort((a, b) => a.addr.localeCompare(b.addr))) {
        console.log(`    ${addr}: P-code=${pcodeW}b, runtime=${runtimeW}b`);
      }
      if (medium.length > 30) console.log(`    ... and ${medium.length - 30} more`);
      console.log();
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// FOCUSED ANALYSIS: Key game structures
// ═══════════════════════════════════════════════════════════════════
console.log('═══════════════════════════════════════════════════════════════');
console.log('FOCUSED: Key game structure globals');
console.log('═══════════════════════════════════════════════════════════════\n');

function reportAddr(addr, label) {
  const pcodeW = datWidths[addr];
  const narrowW = datNarrow[addr];
  const runtimeW = datClassify?.widths?.[addr];
  const cEv = cEvidence.get(addr);

  const pcodeStr = pcodeW !== undefined ? `${pcodeW}b` : 'N/A';
  const narrowStr = narrowW !== undefined ? `${narrowW}b` : 'not in narrow (→ 4b)';
  const runtimeStr = runtimeW !== undefined ? `${runtimeW}b` : 'N/A';
  const cStr = cEv ? `${[...cEv.widths].join(',')}b` : 'none';

  let risk = 'OK';
  if (pcodeW !== undefined && pcodeW < 4 && narrowW === undefined) {
    risk = 'HIGH — P-code narrow but transpiler reads 4b';
  } else if (pcodeW !== undefined && narrowW !== undefined && pcodeW !== narrowW) {
    risk = 'WARN — P-code/narrow disagree';
  } else if (runtimeW !== undefined && pcodeW !== undefined && runtimeW !== pcodeW) {
    risk = 'INFO — runtime differs';
  }

  console.log(`  ${addr} (${label})`);
  console.log(`    P-code: ${pcodeStr} | narrow: ${narrowStr} | runtime: ${runtimeStr} | C: ${cStr} | ${risk}`);
  if (cEv) {
    for (const ev of cEv.evidence.slice(0, 2)) {
      console.log(`    C evidence: ${ev.file}:${ev.line} — ${ev.pattern}`);
    }
  }
}

// Unit record fields (base DAT_006560f0, stride 0x20 = 32 bytes)
console.log('── Unit record fields (base 0x006560f0, stride 0x20) ──');
const unitOffsets = {
  '006560f0': 'unit[0].x (short)',
  '006560f2': 'unit[0].y (short)',
  '006560f4': 'unit[0].type_id (short/byte?)',
  '006560f6': 'unit[0].field_06',
  '006560f7': 'unit[0].field_07',
  '006560f8': 'unit[0].field_08',
  '006560f9': 'unit[0].field_09',
  '006560fa': 'unit[0].field_0a',
  '006560fb': 'unit[0].field_0b',
  '006560fc': 'unit[0].field_0c',
  '006560fd': 'unit[0].field_0d',
  '006560fe': 'unit[0].field_0e',
  '006560ff': 'unit[0].field_0f',
  '00656100': 'unit[0].field_10',
};
for (const [hex, label] of Object.entries(unitOffsets)) {
  reportAddr('DAT_' + hex, label);
}

// City record fields (base DAT_0064f340, stride varies)
console.log('\n── City record fields (base 0x0064f340) ──');
const cityOffsets = {
  '0064f340': 'city[0].x (short)',
  '0064f342': 'city[0].y (short)',
  '0064f344': 'city[0].field_04',
  '0064f345': 'city[0].field_05',
  '0064f346': 'city[0].field_06',
  '0064f347': 'city[0].field_07',
  '0064f348': 'city[0].field_08',
  '0064f349': 'city[0].field_09',
  '0064f34a': 'city[0].field_0a',
  '0064f34b': 'city[0].field_0b',
  '0064f34c': 'city[0].field_0c',
  '0064f34d': 'city[0].field_0d',
  '0064f360': 'city[0].field_20',
  '0064f374': 'city[0].field_34',
  '0064f379': 'city[0].field_39',
  '0064f37a': 'city[0].field_3a',
  '0064f37b': 'city[0].field_3b',
  '0064f37c': 'city[0].field_3c',
  '0064f37e': 'city[0].field_3e',
  '0064f37f': 'city[0].field_3f',
  '0064f381': 'city[0].field_41',
  '0064f382': 'city[0].field_42',
  '0064f390': 'city[0].field_50',
  '0064f391': 'city[0].field_51',
  '0064f392': 'city[0].field_52',
  '0064f393': 'city[0].field_53',
  '0064f394': 'city[0].field_54 (int?)',
};
for (const [hex, label] of Object.entries(cityOffsets)) {
  reportAddr('DAT_' + hex, label);
}

// Unit ID counter
console.log('\n── Unit ID counter ──');
reportAddr('DAT_00627fd8', 'unit ID counter');

// Map dimensions
console.log('\n── Map dimension globals (0x006d1160-0x006d116c) ──');
const mapOffsets = {
  '006d1160': 'map dim 0 (map_x_dim?)',
  '006d1162': 'map dim 1',
  '006d1164': 'map dim 2',
  '006d1166': 'map dim 3',
  '006d1168': 'map dim 4',
  '006d116a': 'map dim 5',
  '006d116c': 'map dim 6',
};
for (const [hex, label] of Object.entries(mapOffsets)) {
  reportAddr('DAT_' + hex, label);
}

// ═══════════════════════════════════════════════════════════════════
// SUMMARY: Risk assessment
// ═══════════════════════════════════════════════════════════════════
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('SUMMARY');
console.log('═══════════════════════════════════════════════════════════════\n');

// Count HIGH risk: P-code says narrow but not in dat-narrow
let highRisk = 0;
let medRisk = 0;
let narrowOverride = 0;  // narrow says narrower than P-code (manual overrides)
const highRiskAddrs = [];
for (const [addr, pcodeW] of Object.entries(datWidths)) {
  if (pcodeW < 4 && datNarrow[addr] === undefined) {
    highRisk++;
    highRiskAddrs.push(addr);
  } else if (datNarrow[addr] !== undefined && datNarrow[addr] !== pcodeW) {
    if (pcodeW < 4) {
      medRisk++;  // P-code narrow, narrow has different narrow value
    } else {
      narrowOverride++;  // P-code=4, narrow says smaller (manual override)
    }
  }
}

console.log(`HIGH risk (P-code narrow, transpiler reads 4b): ${highRisk}`);
console.log(`MEDIUM risk (P-code narrow, narrow disagrees on size): ${medRisk}`);
console.log(`Manual overrides (P-code=4, narrow says smaller): ${narrowOverride}`);
console.log(`dat-narrow entries not in P-code: ${narrowNotInPcode.length}`);
console.log(`C vs P-code disagreements: ${cVsPcode.length}`);

if (datClassify) {
  let runtimeDisagree = 0;
  for (const [addr, runtimeW] of Object.entries(datClassify.widths)) {
    const pcodeW = datWidths[addr];
    if (pcodeW !== undefined && runtimeW !== pcodeW) runtimeDisagree++;
  }
  console.log(`Runtime vs P-code disagreements: ${runtimeDisagree}`);
}

// ── Dump all HIGH risk addresses to help fix them ──
if (highRiskAddrs.length > 0) {
  console.log(`\n── ALL HIGH RISK addresses (add to dat-narrow.json to fix): ──\n`);
  for (const addr of highRiskAddrs.sort()) {
    const w = datWidths[addr];
    const cEv = cEvidence.get(addr);
    const cStr = cEv ? ` (C: ${[...cEv.widths].join(',')}b — ${cEv.evidence[0]?.pattern})` : '';
    console.log(`  "${addr}": ${w},${cStr}`);
  }
}

console.log('\nDone.');
