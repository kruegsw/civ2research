// ═══════════════════════════════════════════════════════════════════
// sav-from-mem.js — Build a complete .sav file from _MEM
//
// Unlike sav-writer.js (which needs an original .sav as template),
// this creates the entire .sav from scratch using _MEM data.
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';
import { v, s16, u16, s32, _MEM } from './mem.js';

const SAV_UNIT_REC = 32;
const SAV_CITY_REC = 88;
const SAV_CIV_REC  = 1428;
const SAV_NAME_REC = 242;
const NUM_CIVS = 8;

export function buildSav() {
  const mw2 = s16(DAT_006d1160, 0);
  const mh = s16(DAT_006d1162, 0);
  const mw = mw2 / 2;
  const ms = mw * mh;
  const qw = (mw2 + 3) >> 2;
  const qh = mh;
  const tilePtr = v(globalThis.DAT_00636598);
  const totalUnits = s16(DAT_00655b16, 0);
  const totalCities = s16(DAT_00655b18, 0);
  const turn = s16(DAT_00655af8, 0);

  // ── Compute section sizes ──
  const HEADER_SIZE = 13702; // MAP_HEADER offset
  const mapHeaderSize = 14;
  const block1Size = 7 * ms;
  const tileDataSize = ms * 6;
  const quarterSize = qw * qh * 2;
  const paddingSize = 1024;
  const unitDataSize = totalUnits * SAV_UNIT_REC;
  const cityDataSize = totalCities * SAV_CITY_REC;
  const civNameSize = NUM_CIVS * SAV_NAME_REC;
  const civDataSize = NUM_CIVS * SAV_CIV_REC;

  // Civ names at 0x0156, civ data at 0x08E6
  // These are within the header (before MAP_HEADER at 13702)

  const MAP_HEADER = HEADER_SIZE;
  const block1Off = MAP_HEADER + mapHeaderSize;
  const tileDataOff = block1Off + block1Size;
  const quarterOff = tileDataOff + tileDataSize;
  const paddingOff = quarterOff + quarterSize;
  const unitOff = paddingOff + paddingSize;
  const cityOff = unitOff + unitDataSize;

  // Gap record (32 bytes) + tail data (1807 bytes for standard sav)
  const GAP_SIZE = 32;
  const TAIL_SIZE = 1807;
  const gapOff = cityOff + cityDataSize;
  const tailOff = gapOff + GAP_SIZE;
  const fileSize = tailOff + TAIL_SIZE;

  const buf = new Uint8Array(fileSize);

  // ── Header ──
  // Magic
  const magic = 'CIVILIZE';
  for (let i = 0; i < 8; i++) buf[i] = magic.charCodeAt(i);

  // Wonders: 28 × uint16 at 0x010A. Source = _MEM[0x00655BE6 + i*2]
  // (sniffer's WONDER_BASE). Format matches sav: 0xFFFF = not built,
  // 0xFFEF = destroyed, else city array index. Previous code
  // hardcoded all to 0xFFFF, blinding v3 to all wonder ownership —
  // breaking canUseGovernment Statue of Liberty fallback, the
  // calcTechValue wonder-rivalry bonus, and every wonder-aware
  // game-end check.
  // _MEM is rebased at MEM_BASE=0x61c068, so absolute address
  // 0x00655BE6 maps to _MEM[0x00655BE6 - 0x61C068] = _MEM[0x39B7E].
  const MEM_BASE = 0x61C068;
  const WONDER_OFF = 0x00655BE6 - MEM_BASE;
  for (let i = 0; i < 28; i++) {
    buf[0x010A + i * 2] = _MEM[WONDER_OFF + i * 2];
    buf[0x010A + i * 2 + 1] = _MEM[WONDER_OFF + i * 2 + 1];
  }

  // Tech first discoverer: 100 bytes at 0x0042 — 0xFF = nobody
  for (let i = 0; i < 100; i++) buf[0x42 + i] = 0xFF;

  // Tech discovery bitmask: 100 bytes at 0x00A6. Each byte[i] is a
  // bitmask of which civs have discovered tech i (bit N = civ N).
  // Derive from each civ's tech_status[93] array (civ_struct +0x074,
  // 0xFF = not discovered, otherwise discovered). Without this the
  // parser sees zeroed bits → every civ starts with 0 known techs →
  // calcResearchCost = baseCost * 0 = 0 → next tech completes on
  // first science drop. Breaks everything downstream.
  for (let i = 0; i < 100; i++) buf[0xA6 + i] = 0;
  for (let slot = 0; slot < NUM_CIVS; slot++) {
    const techBase = DAT_0064c600 + slot * 0x594 + 0xA0 + 0x074;
    for (let tech = 0; tech < 89; tech++) {
      const status = _MEM[techBase + tech];
      if (status !== 0xFF) buf[0xA6 + tech] |= (1 << slot);
    }
  }

  // Header fields
  buf[0x0D] = 0; // flags (no scenario)
  buf[0x1C] = turn & 0xFF; buf[0x1D] = (turn >> 8) & 0xFF; // turns passed
  // 0x1E: turnsForYear (u16) — memory 0x00655afa
  const tfy = u16(DAT_00655afa, 0);
  buf[0x1E] = tfy & 0xFF; buf[0x1F] = (tfy >> 8) & 0xFF;
  // 0x22: selectedUnit (u16) — memory 0x00655afe
  const selUnit = u16(DAT_00655afe, 0);
  buf[0x22] = selUnit & 0xFF; buf[0x23] = (selUnit >> 8) & 0xFF;
  // save +0x27 is activeHumanPlayer (the human's civ slot) — memory 0x00655b03
  // via save→mem delta. Earlier version read 0x00655b05 which is a different
  // byte (currently-rotating civ during AI processing, unrelated to player).
  buf[0x27] = _MEM[DAT_00655b03];
  buf[0x29] = 1; // player civ
  // difficulty is at mem 0x00655b08 (save +0x2C via delta 0x00655ADC). Earlier
  // version read DAT_00655b02 + 2 = 0x00655b04, which holds a different byte
  // (always 0 in observed games) and caused v4 harness to always report
  // difficulty=Chieftain regardless of actual game setting.
  buf[0x2C] = _MEM[DAT_00655b08];
  buf[0x2D] = 1; // barbarian level
  buf[0x2E] = _MEM[DAT_00655b0a]; // civs alive
  buf[0x2F] = _MEM[DAT_00655b0b]; // human players
  // 0x33: globalWarmingCount — memory 0x00655b0f (save +0x33 via delta).
  // Earlier read from 0x00655b03 (sniff-game.py dict) — that byte is
  // actually activeHumanPlayer, not globalWarming.
  buf[0x33] = _MEM[DAT_00655b0f];
  buf[0x3A] = totalUnits & 0xFF; buf[0x3B] = (totalUnits >> 8) & 0xFF;
  buf[0x3C] = totalCities & 0xFF; buf[0x3D] = (totalCities >> 8) & 0xFF;

  // ── Civ names (0x0156) ──
  const civNameStart = 0x0156;
  for (let slot = 0; slot < NUM_CIVS; slot++) {
    const memOff = slot * 0x594;
    const nameOff = civNameStart + slot * SAV_NAME_REC;
    const nameBytes = Math.min(0xA0, SAV_NAME_REC);
    for (let j = 0; j < nameBytes; j++) {
      buf[nameOff + j] = _MEM[DAT_0064c600 + memOff + j];
    }
  }

  // ── Civ data (0x08E6) ──
  const civDataStart = 0x08E6;
  const CIV_SHIFT = 0xA0;
  for (let slot = 0; slot < NUM_CIVS; slot++) {
    const memOff = slot * 0x594;
    const savOff = civDataStart + slot * SAV_CIV_REC;
    const dataBytes = Math.min(SAV_CIV_REC, 0x594 - CIV_SHIFT);
    for (let j = 0; j < dataBytes; j++) {
      buf[savOff + j] = _MEM[DAT_0064c600 + memOff + CIV_SHIFT + j];
    }
  }

  // ── Map header ──
  buf[MAP_HEADER] = mw2 & 0xFF; buf[MAP_HEADER + 1] = (mw2 >> 8) & 0xFF;
  buf[MAP_HEADER + 2] = mh & 0xFF; buf[MAP_HEADER + 3] = (mh >> 8) & 0xFF;
  buf[MAP_HEADER + 4] = ms & 0xFF; buf[MAP_HEADER + 5] = (ms >> 8) & 0xFF;
  buf[MAP_HEADER + 6] = 0; buf[MAP_HEADER + 7] = 0; // map shape
  const seed = v(DAT_006d1168);
  buf[MAP_HEADER + 8] = seed & 0xFF; buf[MAP_HEADER + 9] = (seed >> 8) & 0xFF;
  buf[MAP_HEADER + 10] = qw & 0xFF; buf[MAP_HEADER + 11] = (qw >> 8) & 0xFF;
  buf[MAP_HEADER + 12] = qh & 0xFF; buf[MAP_HEADER + 13] = (qh >> 8) & 0xFF;

  // ── Block 1: known improvements (7 layers × ms bytes) ──
  // Leave zeroed for fresh game

  // ── Tile data (ms × 6 bytes) ──
  for (let i = 0; i < ms * 6; i++) {
    buf[tileDataOff + i] = _MEM[tilePtr + i];
  }

  // ── Quarter resolution data ──
  // Leave zeroed

  // ── Padding (1024 bytes) ──
  // Leave zeroed

  // ── Unit records ──
  for (let i = 0; i < totalUnits * SAV_UNIT_REC; i++) {
    buf[unitOff + i] = _MEM[DAT_006560f0 + i];
  }

  // ── City records ──
  for (let i = 0; i < totalCities * SAV_CITY_REC; i++) {
    buf[cityOff + i] = _MEM[globalThis.DAT_0064f340 + i];
  }

  // ── Tail fixed constants at +1385 from tail start ──
  const FIXED = [0xAB, 0x05, 0x46, 0x03, 0x01, 0x00, 0x03];
  for (let i = 0; i < FIXED.length; i++) buf[tailOff + 1385 + i] = FIXED[i];

  return buf;
}
