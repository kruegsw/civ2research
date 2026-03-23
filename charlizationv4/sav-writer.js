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
  // ── Read layout from original to find where data sections start ──
  const origUnits  = u16(origBuf, 0x3A);
  const origCities = u16(origBuf, 0x3C);
  const newUnits   = G.DAT_00655b16;
  const newCities  = G.DAT_00655b18;

  const MAP_HEADER = 13702;
  const ms = u16(origBuf, MAP_HEADER + 4);
  const qw = u16(origBuf, MAP_HEADER + 10);
  const qh = u16(origBuf, MAP_HEADER + 12);

  const block1Off   = MAP_HEADER + 14;
  const tileDataOff = block1Off + 7 * ms;
  const quarterOff  = tileDataOff + ms * 6;
  const paddingOff  = quarterOff + qw * qh * 2;
  const unitOff     = paddingOff + 1024;

  // Original city offset and everything after cities (tail data)
  const origCityOff = unitOff + origUnits * SAV_UNIT_REC;
  const origTailOff = origCityOff + origCities * SAV_CITY_REC;
  const tailSize    = origBuf.length - origTailOff;

  // New offsets (unit count may have changed)
  const newCityOff  = unitOff + newUnits * SAV_UNIT_REC;
  const newTailOff  = newCityOff + newCities * SAV_CITY_REC;
  const newFileSize = newTailOff + tailSize;

  // Build the output buffer
  const buf = new Uint8Array(newFileSize);

  // Copy everything before units (header, map, tiles, padding) unchanged
  buf.set(origBuf.slice(0, unitOff));

  // ── Write header scalars ──
  w16(buf, 0x1C, G.DAT_00655af8);
  w16(buf, 0x3A, newUnits);
  w16(buf, 0x3C, newCities);

  // ── Write unit records ──
  buf.set(G.DAT_006560f0.slice(0, newUnits * SAV_UNIT_REC), unitOff);

  // ── Write city records ──
  buf.set(G.DAT_0064f340.slice(0, newCities * SAV_CITY_REC), newCityOff);

  // ── Copy tail data (everything after cities — mercenaries, transport links, etc.) ──
  if (tailSize > 0) {
    buf.set(origBuf.slice(origTailOff, origTailOff + tailSize), newTailOff);
  }

  // ── Write civ data with reverse +0xA0 shift ──
  const CIV_SHIFT = 0xA0;
  const civDataStart = 0x08E6;
  const civNameStart = 0x0156;
  for (let slot = 0; slot < NUM_CIVS; slot++) {
    const memOff = slot * 0x594;

    const nameOff = civNameStart + slot * SAV_NAME_REC;
    const nameBytes = Math.min(CIV_SHIFT, SAV_NAME_REC);
    buf.set(G.DAT_0064c600.slice(memOff, memOff + nameBytes), nameOff);

    const savOff = civDataStart + slot * SAV_CIV_REC;
    const dataBytes = Math.min(SAV_CIV_REC, 0x594 - CIV_SHIFT);
    buf.set(G.DAT_0064c600.slice(memOff + CIV_SHIFT, memOff + CIV_SHIFT + dataBytes), savOff);
  }

  return buf;
}
