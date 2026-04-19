// ═══════════════════════════════════════════════════════════════════
// load-snapshot.js — Load a CIV2SNAP sniffer dump into v4's _MEM.
//
// Snapshots are raw memory dumps captured from civ2.exe by sniff-game.py.
// Each region has a known absolute address — we just copy bytes back.
// After calling this, _MEM reflects real Civ2's in-memory state at
// snapshot time, and v4's binary engine can run against it.
//
// This is the snapshot-input counterpart to sav-loader.js. Both produce
// equivalent _MEM state; sav-loader sources from .sav file bytes,
// this loader sources from CIV2SNAP region dumps.
// ═══════════════════════════════════════════════════════════════════

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import './globals-init.js';
import { G } from './globals.js';
import { wv, initMapTiles } from './mem.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Parse CIV2SNAP binary format ────────────────────────────────────

export function parseSnapshot(path) {
  const data = readFileSync(path);
  if (data.slice(0, 8).toString('ascii') !== 'CIV2SNAP') {
    throw new Error(`Not a CIV2SNAP file: ${path}`);
  }
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const regionCount = dv.getUint32(8, true);

  const regions = new Map();
  let tableOff = 12;
  let dataOff = 12 + regionCount * 24;

  for (let i = 0; i < regionCount; i++) {
    let name = '';
    for (let j = 0; j < 16; j++) {
      const ch = data[tableOff + j];
      if (ch === 0) break;
      name += String.fromCharCode(ch);
    }
    const addr = dv.getUint32(tableOff + 16, true);
    const size = dv.getUint32(tableOff + 20, true);
    const bytes = new Uint8Array(data.buffer, data.byteOffset + dataOff, size);
    regions.set(name, { addr, size, bytes });
    tableOff += 24;
    dataOff += size;
  }
  return regions;
}

// ── Load snapshot into _MEM ─────────────────────────────────────────
// Snapshot region addresses are absolute addresses from civ2.exe's
// process space. v4's _MEM is a 2MB buffer rebased at 0x61C068 (see
// globals.js). We translate: memOffset = absAddr - MEM_BASE.
//
// Tile data lives on the heap in real Civ2 at an address that varies
// per run; v4 always places it at TILE_DATA_BASE, same as sav-loader.

const MEM_BASE = 0x61C068;

export function loadSnapshotIntoMem(path) {
  const regions = parseSnapshot(path);

  const required = ['globals', 'units', 'cities', 'civs', 'wonders', 'cosmic', 'map_dims'];
  const missing = required.filter(n => !regions.has(n));
  if (missing.length > 0) {
    throw new Error(`Snapshot missing required regions: ${missing.join(', ')}`);
  }

  for (const name of required) {
    const { addr, bytes } = regions.get(name);
    const memOff = addr - MEM_BASE;
    if (memOff < 0 || memOff + bytes.length > G._MEM.length) {
      throw new Error(
        `Region '${name}' at 0x${addr.toString(16)} (_MEM offset ${memOff}) ` +
        `+ ${bytes.length} bytes is outside _MEM (size ${G._MEM.length}).`);
    }
    G._MEM.set(bytes, memOff);
  }

  // Optional regions — load if present so downstream functions that read
  // from them (e.g., FUN_00484fec reading the year-schedule table at
  // DAT_0062c490) get the right data instead of zeros.
  for (const name of ['year_table', 'unit_counter', 'rand_seed']) {
    if (!regions.has(name)) continue;
    const { addr, bytes } = regions.get(name);
    const memOff = addr - MEM_BASE;
    if (memOff >= 0 && memOff + bytes.length <= G._MEM.length) {
      G._MEM.set(bytes, memOff);
    }
  }

  // Fallback for snapshots captured before `year_table` was added to
  // SNAPSHOT_REGIONS: load the static extract (`static_data/year_table.bin`)
  // into _MEM if available. The table is game-data-segment constant across
  // all snapshots of the same Civ2 build, so this is safe.
  if (!regions.has('year_table')) {
    const staticPath = join(__dirname, 'static_data', 'year_table.bin');
    if (existsSync(staticPath)) {
      const yt = readFileSync(staticPath);
      const memOff = 0x62c490 - MEM_BASE;
      if (memOff >= 0 && memOff + yt.length <= G._MEM.length) {
        G._MEM.set(yt, memOff);
      }
    }
  }

  if (regions.has('tiles')) {
    const { bytes: tileBytes } = regions.get('tiles');
    const TILE_DATA_BASE = G._MEM.length - 100000;
    wv(globalThis.DAT_00636598, TILE_DATA_BASE);
    wv(globalThis.DAT_006d1188, TILE_DATA_BASE);
    G._MEM.set(tileBytes, TILE_DATA_BASE);
    initMapTiles(new Uint8Array(tileBytes));
  }

  return {
    regionCount: regions.size,
    tileBytes: regions.get('tiles')?.size ?? 0,
  };
}
