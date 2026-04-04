// ═══════════════════════════════════════════════════════════════════
// sav-loader.js — Load .sav file into v4 flat memory (_MEM)
//
// Every byte written here comes from a KNOWN offset in the .sav file
// and goes to a KNOWN DAT_ address in _MEM. No computed values,
// no custom logic — just byte copies from documented positions.
//
// Source of truth for .sav layout: charlizationv3/engine/parser.js
// Source of truth for _MEM layout: reverse_engineering/decompiled/
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { G } from './globals.js';
import { u16, s32, wv, w16, w32, initMapTiles } from './mem.js';

const SAV_UNIT_REC = 32;   // bytes per unit record in .sav (matches binary's 0x20)
const SAV_CITY_REC = 88;   // bytes per city record in .sav (matches binary's 0x58)
const SAV_CIV_REC  = 1428; // bytes per civ data block in .sav
const SAV_NAME_REC = 242;  // bytes per civ name block in .sav
const NUM_CIVS = 8;

export function loadSav(buf) {
  // ── Validate ──
  if (String.fromCharCode(...buf.slice(0, 8)) !== 'CIVILIZE')
    throw new Error('Not a Civ2 save file');
  if (buf[0x0D] & 0x01)
    throw new Error('Scenario files (.scn) not supported yet');

  // ── Read .sav header (offsets from v3 parser.js) ──
  const turnsPassed  = u16(buf, 0x1C);  // turns elapsed
  const difficulty    = buf[0x2C];       // 0=Chieftain..5=Deity
  const civsAlive     = buf[0x2E];       // bitmask: bit N = civ N alive
  const humanPlayers  = buf[0x2F];       // bitmask: bit N = civ N is human
  const totalUnits    = u16(buf, 0x3A);  // total unit slots used
  const totalCities   = u16(buf, 0x3C);  // total city slots used
  const flatEarth     = !!(buf[0x0D] & 0x80);

  // ── Read map header (fixed offset 0x3586 for .sav) ──
  const MAP_HEADER = 13702;
  const mw2      = u16(buf, MAP_HEADER);      // doubled map width
  const mh       = u16(buf, MAP_HEADER + 2);   // map height
  const ms       = u16(buf, MAP_HEADER + 4);   // total map squares
  const mapShape = u16(buf, MAP_HEADER + 6);   // 0=round, 1=flat
  const mapSeed  = u16(buf, MAP_HEADER + 8);   // resource seed
  const qw       = u16(buf, MAP_HEADER + 10);  // quarter-res width
  const qh       = u16(buf, MAP_HEADER + 12);  // quarter-res height

  // ── Write map globals to _MEM (DAT_ addresses from decompiled C) ──
  w16(DAT_006d1160, 0, mw2);        // map width (doubled-X) — 16-bit
  w16(DAT_006d1162, 0, mh);         // map height — 16-bit
  w16(DAT_006d1164, 0, ms);         // total squares — 16-bit
  w16(DAT_006d1166, 0, mapShape);   // map shape — 16-bit
  w32(DAT_006d1168, 0, mapSeed);    // seed — 32-bit
  w16(DAT_006d116a, 0, qw);         // quarter width — 16-bit
  w16(DAT_006d116c, 0, qh);         // quarter height — 16-bit

  // ── Write game state globals to _MEM ──
  w16(DAT_00655af8, 0, turnsPassed);     // turn counter — 16-bit
  G._MEM[DAT_00655b0a] = civsAlive;      // civs alive bitmask — 1-byte
  G._MEM[DAT_00655b0b] = humanPlayers;   // human players bitmask — 1-byte
  w16(DAT_00655b16, 0, totalUnits);      // unit count — 16-bit
  w16(DAT_00655b18, 0, totalCities);     // city count — 16-bit

  // ── Compute .sav section offsets (arithmetic, no custom logic) ──
  const block1Off   = MAP_HEADER + 14;
  const tileDataOff = block1Off + 7 * ms;
  const quarterOff  = tileDataOff + ms * 6;
  const paddingOff  = quarterOff + qw * qh * 2;
  const unitOff     = paddingOff + 1024;
  const cityOff     = unitOff + totalUnits * SAV_UNIT_REC;

  // ── Copy tile data into _MEM ──
  // Binary reads tiles via _MEM[v(DAT_00636598) + offset]
  // We place tile data at end of _MEM buffer (away from other data)
  const TILE_DATA_BASE = G._MEM.length - 100000;
  wv(DAT_00636598, TILE_DATA_BASE);      // tile array pointer — 32-bit
  wv(DAT_006d1188, TILE_DATA_BASE);      // "bad tile" fallback — 32-bit
  G._MEM.set(buf.slice(tileDataOff, tileDataOff + ms * 6), TILE_DATA_BASE);
  initMapTiles(new Uint8Array(buf.slice(tileDataOff, tileDataOff + ms * 6)));

  // ── Copy unit records (byte-for-byte, layout matches binary) ──
  G.DAT_006560f0.fill(0, 0, 2048 * SAV_UNIT_REC);
  G.DAT_006560f0.set(buf.slice(unitOff, unitOff + totalUnits * SAV_UNIT_REC));

  // ── Copy city records (byte-for-byte, layout matches binary) ──
  G.DAT_0064f340.fill(0, 0, 256 * SAV_CITY_REC);
  G.DAT_0064f340.set(buf.slice(cityOff, cityOff + totalCities * SAV_CITY_REC));

  // ── Copy civ data with +0xA0 shift ──
  // Binary layout: [0x00..0x9F] = name block, [0xA0..end] = data block
  // .sav stores these in separate sections, so we recombine them
  const CIV_SHIFT   = 0xA0;
  const civDataStart = 0x08E6;   // .sav civ data section
  const civNameStart = 0x0156;   // .sav civ name section
  G.DAT_0064c600.fill(0, 0, NUM_CIVS * 0x594);
  for (let slot = 0; slot < NUM_CIVS; slot++) {
    const memOff = slot * 0x594;
    // Name block → binary [0x00..0x9F]
    const nameOff = civNameStart + slot * SAV_NAME_REC;
    G.DAT_0064c600.set(buf.slice(nameOff, nameOff + Math.min(CIV_SHIFT, SAV_NAME_REC)), memOff);
    // Data block → binary [0xA0..end]
    const savOff = civDataStart + slot * SAV_CIV_REC;
    G.DAT_0064c600.set(buf.slice(savOff, savOff + Math.min(SAV_CIV_REC, 0x594 - CIV_SHIFT)), memOff + CIV_SHIFT);
  }

  // ── Return info for verification (all values read directly from .sav bytes) ──
  return {
    turnsPassed, difficulty, civsAlive, humanPlayers,
    totalUnits, totalCities,
    mw: mw2 >>> 1, mh, mw2, mapShape, mapSeed, flatEarth,
  };
}
