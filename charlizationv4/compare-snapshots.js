#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// compare-snapshots.js — Diff two CIV2SNAP files byte-by-byte
//
// Usage:
//   node compare-snapshots.js snap_real.bin snap_v4.bin
//   node compare-snapshots.js snap_real.bin snap_v4.bin --region civs
//   node compare-snapshots.js snap_real.bin snap_v4.bin --summary
//
// Compares memory regions captured from real Civ2 (via sniff-game.py)
// against the same regions from v4 (via run.js --snapshot).
// ═══════════════════════════════════════════════════════════════════

import { readFileSync } from 'fs';

// ── Field maps for structured diffing ────────────────────────────

const UNIT_FIELDS = [
  { off: 0x00, size: 2, name: 'x' },
  { off: 0x02, size: 2, name: 'y' },
  { off: 0x04, size: 2, name: 'prevUnit' },
  { off: 0x06, size: 1, name: 'type' },
  { off: 0x07, size: 1, name: 'owner' },
  { off: 0x08, size: 1, name: 'movesLeft' },
  { off: 0x09, size: 1, name: 'status' },
  { off: 0x0A, size: 1, name: 'damageTaken' },
  { off: 0x0B, size: 1, name: 'veteran' },
  { off: 0x0C, size: 2, name: 'gotoX' },
  { off: 0x0E, size: 1, name: 'counter2' },
  { off: 0x0F, size: 1, name: 'order' },
  { off: 0x10, size: 2, name: 'homeCity' },
  { off: 0x12, size: 2, name: 'gotoY' },
  { off: 0x14, size: 2, name: 'linkIdx' },
  { off: 0x16, size: 4, name: 'unknown_16' },
  { off: 0x1A, size: 4, name: 'unitId' },
  { off: 0x1E, size: 2, name: 'unknown_1E' },
];

const CITY_FIELDS = [
  { off: 0x00, size: 2, name: 'x' },
  { off: 0x02, size: 2, name: 'y' },
  { off: 0x04, size: 1, name: 'status' },
  { off: 0x08, size: 1, name: 'owner' },
  { off: 0x09, size: 1, name: 'size' },
  { off: 0x0A, size: 1, name: 'producing' },
  { off: 0x0B, size: 1, name: 'prodType' },
  { off: 0x1A, size: 2, name: 'foodStored' },
  { off: 0x1C, size: 2, name: 'shieldStored' },
  { off: 0x1E, size: 2, name: 'tradeTotal' },
  { off: 0x20, size: 16, name: 'name' },
];

const CIV_FIELDS = [
  { off: 0xA0, size: 2, name: 'flags' },
  { off: 0xA2, size: 4, name: 'treasury' },
  { off: 0xA8, size: 2, name: 'researchProgress' },
  { off: 0xAA, size: 1, name: 'researchingTech' },
  { off: 0xB3, size: 1, name: 'taxRate' },
  { off: 0xB4, size: 1, name: 'scienceRate' },
  { off: 0xB5, size: 1, name: 'government' },
  { off: 0xB6, size: 1, name: 'reputation' },
];

// ── Parse CIV2SNAP ──────────────────────────────────────────────

function parseSnapshot(buf) {
  const magic = String.fromCharCode(...buf.slice(0, 8));
  if (magic !== 'CIV2SNAP') throw new Error(`Not a CIV2SNAP file (magic: "${magic}")`);

  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const regionCount = dv.getUint32(8, true);

  const regions = [];
  let tableOff = 12;
  let dataOff = 12 + regionCount * 24;

  for (let i = 0; i < regionCount; i++) {
    let name = '';
    for (let j = 0; j < 16; j++) {
      const ch = buf[tableOff + j];
      if (ch === 0) break;
      name += String.fromCharCode(ch);
    }
    const addr = dv.getUint32(tableOff + 16, true);
    const size = dv.getUint32(tableOff + 20, true);
    const data = new Uint8Array(buf.buffer, buf.byteOffset + dataOff, size);
    regions.push({ name, addr, size, data });
    tableOff += 24;
    dataOff += size;
  }

  return { regions };
}

// ── Compare regions ─────────────────────────────────────────────

function compareRegion(r1, r2, fields, stride, label) {
  const minSize = Math.min(r1.size, r2.size);
  const diffs = [];

  for (let i = 0; i < minSize; i++) {
    if (r1.data[i] !== r2.data[i]) {
      diffs.push({ offset: i, a: r1.data[i], b: r2.data[i] });
    }
  }

  if (diffs.length === 0) {
    console.log(`  ${label}: IDENTICAL (${minSize} bytes)`);
    return 0;
  }

  console.log(`  ${label}: ${diffs.length} byte differences (${minSize} bytes compared)`);

  if (fields && stride) {
    // Group by record
    const records = new Map();
    for (const d of diffs) {
      const recIdx = Math.floor(d.offset / stride);
      const fieldOff = d.offset % stride;
      if (!records.has(recIdx)) records.set(recIdx, []);
      records.get(recIdx).push({ ...d, fieldOff });
    }

    let shown = 0;
    for (const [idx, recDiffs] of records) {
      if (shown >= 20) { console.log(`    ... and ${records.size - shown} more records`); break; }
      // Find field names
      const fieldDiffs = new Map();
      for (const d of recDiffs) {
        const field = fields.find(f => d.fieldOff >= f.off && d.fieldOff < f.off + f.size);
        const fname = field ? field.name : `byte_0x${d.fieldOff.toString(16)}`;
        if (!fieldDiffs.has(fname)) fieldDiffs.set(fname, []);
        fieldDiffs.get(fname).push(d);
      }
      const summary = [...fieldDiffs.entries()].map(([name, ds]) => {
        if (ds.length === 1) return `${name}:${ds[0].a}→${ds[0].b}`;
        return `${name}:(${ds.length} bytes)`;
      }).join(', ');
      console.log(`    [${idx}] ${summary}`);
      shown++;
    }
  } else {
    // Raw byte diff
    const shown = Math.min(diffs.length, 30);
    for (const d of diffs.slice(0, shown)) {
      const absAddr = r1.addr + d.offset;
      console.log(`    0x${absAddr.toString(16)}: ${d.a} → ${d.b} (offset ${d.offset})`);
    }
    if (diffs.length > shown) console.log(`    ... and ${diffs.length - shown} more`);
  }

  return diffs.length;
}

// ── Main ────────────────────────────────────────────────────────

const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const flags = process.argv.slice(2).filter(a => a.startsWith('--'));
const summaryOnly = flags.includes('--summary');
const regionFilter = flags.find(f => f.startsWith('--region='))?.split('=')[1]
  || (flags.indexOf('--region') >= 0 ? process.argv[process.argv.indexOf('--region') + 1] : null);

if (args.length < 2) {
  console.error('Usage: node compare-snapshots.js <snap1.bin> <snap2.bin> [--summary] [--region <name>]');
  process.exit(1);
}

const snap1 = parseSnapshot(new Uint8Array(readFileSync(args[0])));
const snap2 = parseSnapshot(new Uint8Array(readFileSync(args[1])));

console.log(`Comparing: ${args[0]} vs ${args[1]}`);
console.log(`  Snap 1: ${snap1.regions.length} regions`);
console.log(`  Snap 2: ${snap2.regions.length} regions`);

let totalDiffs = 0;

for (const r1 of snap1.regions) {
  if (regionFilter && r1.name !== regionFilter) continue;

  const r2 = snap2.regions.find(r => r.name === r1.name);
  if (!r2) {
    console.log(`  ${r1.name}: MISSING in snap 2`);
    continue;
  }

  let fields = null, stride = null;
  if (r1.name === 'units') { fields = UNIT_FIELDS; stride = 0x20; }
  else if (r1.name === 'cities') { fields = CITY_FIELDS; stride = 0x58; }
  else if (r1.name === 'civs') { fields = CIV_FIELDS; stride = 0x594; }

  totalDiffs += compareRegion(r1, r2, summaryOnly ? null : fields, stride, r1.name);
}

console.log(`\nTotal: ${totalDiffs} byte differences`);
