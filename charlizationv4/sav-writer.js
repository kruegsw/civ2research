// ═══════════════════════════════════════════════════════════════════
// sav-writer.js — Write flat memory back to .sav file format
//
// Reverses sav-loader.js: copies unit/city/civ data from the flat
// memory buffer back into a .sav byte array. Uses the original .sav
// as a template — header, map tiles, and structure stay the same;
// only game-state data (units, cities, civs, globals) is overwritten.
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';
import { s16, u16, s32, w16, w32 } from './mem.js';

const SAV_UNIT_REC = 32;
const SAV_CITY_REC = 88;
const SAV_CIV_REC  = 1428;
const SAV_NAME_REC = 242;
const NUM_CIVS = 8;

/**
 * Write game state from flat memory back into a .sav file buffer.
 * @param {Uint8Array} origBuf — the original .sav file (used as template)
 * @returns {Uint8Array} — the modified .sav buffer ready to write to disk
 */
export function saveSav(origBuf) {
  // Make a copy so we don't modify the original
  const buf = new Uint8Array(origBuf.length);
  buf.set(origBuf);

  // ── Read layout info from the template ──
  const totalUnits  = G.DAT_00655b16;
  const totalCities = G.DAT_00655b18;

  const MAP_HEADER = 13702;
  const ms = u16(buf, MAP_HEADER + 4);
  const qw = u16(buf, MAP_HEADER + 10);
  const qh = u16(buf, MAP_HEADER + 12);

  const block1Off   = MAP_HEADER + 14;
  const tileDataOff = block1Off + 7 * ms;
  const quarterOff  = tileDataOff + ms * 6;
  const paddingOff  = quarterOff + qw * qh * 2;
  const unitOff     = paddingOff + 1024;
  const cityOff     = unitOff + totalUnits * SAV_UNIT_REC;

  // ── Write header scalars ──
  w16(buf, 0x1C, G.DAT_00655af8);    // turn counter
  // buf[0x2E] = civsAlive — keep from original (we don't track civ death in header)
  w16(buf, 0x3A, totalUnits);         // total units
  w16(buf, 0x3C, totalCities);        // total cities

  // ── Write unit records ──
  const unitDataSize = totalUnits * SAV_UNIT_REC;
  buf.set(G.DAT_006560f0.slice(0, unitDataSize), unitOff);

  // ── Write city records ──
  const cityDataSize = totalCities * SAV_CITY_REC;
  buf.set(G.DAT_0064f340.slice(0, cityDataSize), cityOff);

  // ── Write civ data with reverse +0xA0 shift ──
  const CIV_SHIFT = 0xA0;
  const civDataStart = 0x08E6;
  const civNameStart = 0x0156;
  for (let slot = 0; slot < NUM_CIVS; slot++) {
    const memOff = slot * 0x594;

    // Copy name block from first 0xA0 bytes → .sav name block
    const nameOff = civNameStart + slot * SAV_NAME_REC;
    const nameBytes = Math.min(CIV_SHIFT, SAV_NAME_REC);
    buf.set(G.DAT_0064c600.slice(memOff, memOff + nameBytes), nameOff);

    // Copy data block from bytes [0xA0..end] → .sav data block
    const savOff = civDataStart + slot * SAV_CIV_REC;
    const dataBytes = Math.min(SAV_CIV_REC, 0x594 - CIV_SHIFT);
    buf.set(G.DAT_0064c600.slice(memOff + CIV_SHIFT, memOff + CIV_SHIFT + dataBytes), savOff);
  }

  // ── Write tile data ──
  // Tile data is stored in mem.js tile arrays. Export them back.
  // initMapTiles loaded tile data into a separate array, not the flat buffer.
  // We need to read from the tile system and write back.
  // For now, tile data comes from the original .sav (map doesn't change during AI turns).
  // TODO: if tile improvements change (roads, irrigation, etc.), export tile data too.

  return buf;
}
