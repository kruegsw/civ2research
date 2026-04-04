// ═══════════════════════════════════════════════════════════════════
// sav-loader.js — Load .sav file directly into flat memory arrays
//
// The .sav file IS the binary's serialized memory. Unit records (32
// bytes) and city records (88 bytes) match the binary's flat arrays
// byte-for-byte. Tile data is also identical in layout.
//
// Civ per-player records use a DIFFERENT layout in the .sav vs the
// binary's in-memory format. Field-by-field mapping is needed (TODO).
// ═══════════════════════════════════════════════════════════════════

import './globals-init.js';
import { G } from './globals.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, initMapTiles } from './mem.js';

// ── Constants ──
const SAV_UNIT_REC = 32;   // 0x20 bytes per unit
const SAV_CITY_REC = 88;   // 0x58 bytes per city
const SAV_CIV_REC  = 1428; // 0x594 bytes per civ
const SAV_NAME_REC = 242;  // bytes per civ name block
const NUM_CIVS = 8;

/**
 * Load a .sav file buffer into the global flat memory arrays.
 * Returns an info object with key game state values for verification.
 */
export function loadSav(buf) {
  // ── Validate header ──
  const magic = String.fromCharCode(...buf.slice(0, 8));
  if (magic !== 'CIVILIZE') {
    throw new Error(`Not a Civ2 save file (magic: "${magic}")`);
  }

  const headerFlags = buf[0x0D];
  const isScn = !!(headerFlags & 0x01);
  if (isScn) {
    throw new Error('Scenario files (.scn) not supported yet');
  }

  // ── Parse header scalars ──
  const turnsPassed     = u16(buf, 0x1C);
  const activePlayer    = buf[0x27];
  const playerCiv       = buf[0x29];
  const difficulty      = buf[0x2C];
  const barbarianLevel  = buf[0x2D];
  const civsAlive       = buf[0x2E];
  const humanPlayers    = buf[0x2F];
  const totalUnits      = u16(buf, 0x3A);
  const totalCities     = u16(buf, 0x3C);

  // Map shape flags
  const flatEarth = !!(buf[0x0D] & 0x80);

  // ── Map header (fixed offset for SAV) ──
  const MAP_HEADER = 13702; // 0x3586 for SAV
  const mw2       = u16(buf, MAP_HEADER);
  const mh        = u16(buf, MAP_HEADER + 2);
  const ms        = u16(buf, MAP_HEADER + 4);
  const mapShape  = u16(buf, MAP_HEADER + 6);
  const mapSeed   = u16(buf, MAP_HEADER + 8);
  const qw        = u16(buf, MAP_HEADER + 10);
  const qh        = u16(buf, MAP_HEADER + 12);
  const mw        = mw2 >>> 1;

  // ── Set map dimensions in globals ──
  // Write scalar globals — use w16 for 16-bit values, w32 for 32-bit
  // Address spacing tells us width: 2 bytes apart = 16-bit, 4 bytes apart = 32-bit
  w16(DAT_006d1160, 0, mw2);                     // map width doubled-X (16-bit)
  w16(DAT_006d1162, 0, mh);                       // map height (16-bit)
  w16(DAT_00655ae8, 0, flatEarth ? 0x8000 : mapShape); // map shape (16-bit)
  w32(DAT_006d1168, 0, mapSeed);                  // resource seed (32-bit)

  // ── Set game state globals ──
  w16(DAT_00655af8, 0, turnsPassed);   // turn counter (16-bit)
  G._MEM[DAT_00655b0b] = 0;            // human player bitmask (1-byte)
  w16(DAT_00655b16, 0, totalUnits);    // total unit count (16-bit)
  w16(DAT_00655b18, 0, totalCities);   // total city count (16-bit)
  G._MEM[DAT_0064bcc8] = 3;            // movement multiplier (1-byte cosmic param)

  // ── Compute section offsets ──
  const block1Off   = MAP_HEADER + 14;               // known improvements
  const tileDataOff = block1Off + 7 * ms;             // tile data (ms × 6 bytes)
  const quarterOff  = tileDataOff + ms * 6;            // quarter-resolution data
  const paddingOff  = quarterOff + qw * qh * 2;       // padding (1024 bytes)
  const unitOff     = paddingOff + 1024;               // unit records
  const cityOff     = unitOff + totalUnits * SAV_UNIT_REC;  // city records

  // ── Load tile data into flat memory ──
  // The binary accesses tiles via _MEM[v(DAT_00636598) + offset].
  // Allocate tile region at end of _MEM buffer.
  const tileDataSize = ms * 6;
  const TILE_DATA_BASE = G._MEM.length - 100000; // 100KB region at end of buffer
  wv(DAT_00636598, TILE_DATA_BASE);              // tile array pointer
  wv(DAT_006d1188, TILE_DATA_BASE);              // "bad tile" fallback pointer
  G._MEM.set(buf.slice(tileDataOff, tileDataOff + tileDataSize), TILE_DATA_BASE);
  // Also set the legacy tileData for any code using tileRead()
  const tileData = new Uint8Array(tileDataSize);
  tileData.set(buf.slice(tileDataOff, tileDataOff + tileDataSize));
  initMapTiles(tileData);

  // ── Load unit records (direct byte copy) ──
  // NOTE: Do NOT use .fill(0) on flat buffer views — they extend to end of buffer
  // and would wipe data at higher addresses. Only clear the bytes we'll use.
  const unitDataSize = totalUnits * SAV_UNIT_REC;
  G.DAT_006560f0.fill(0, 0, 2048 * SAV_UNIT_REC); // clear only unit slots
  G.DAT_006560f0.set(buf.slice(unitOff, unitOff + unitDataSize));

  // ── Load city records (direct byte copy) ──
  const cityDataSize = totalCities * SAV_CITY_REC;
  G.DAT_0064f340.fill(0, 0, 256 * SAV_CITY_REC); // clear only city slots
  G.DAT_0064f340.set(buf.slice(cityOff, cityOff + cityDataSize));

  // ── Load civ data with +0xA0 shift ──
  // The binary's in-memory civ record layout has a 160-byte (0xA0) offset
  // from the .sav data block layout:
  //   Binary [0x00..0x9F] ← .sav name block [0..159] (leader/tribe names)
  //   Binary [0xA0..end]  ← .sav data block [0..1267] (game state fields)
  // This makes binary offsets match: +0xF8 (tech) = .sav +88 + 0xA0 = +0xF8 ✓
  const CIV_SHIFT = 0xA0; // 160 bytes
  const civDataStart = 0x08E6; // SAV civ data block start
  const civNameStart = 0x0156; // SAV civ name block start
  G.DAT_0064c600.fill(0, 0, NUM_CIVS * 0x594); // clear only civ data slots
  for (let slot = 0; slot < NUM_CIVS; slot++) {
    const memOff = slot * 0x594;
    // Copy name block into first 0xA0 bytes
    const nameOff = civNameStart + slot * SAV_NAME_REC;
    const nameBytes = Math.min(CIV_SHIFT, SAV_NAME_REC);
    G.DAT_0064c600.set(buf.slice(nameOff, nameOff + nameBytes), memOff);
    // Copy data block into bytes [0xA0..end] with shift
    const savOff = civDataStart + slot * SAV_CIV_REC;
    const dataBytes = Math.min(SAV_CIV_REC, 0x594 - CIV_SHIFT);
    G.DAT_0064c600.set(buf.slice(savOff, savOff + dataBytes), memOff + CIV_SHIFT);
  }
  const civNames = [];
  for (let slot = 0; slot < NUM_CIVS; slot++) {
    const nOff = civNameStart + slot * SAV_NAME_REC;
    const readStr = (off, len) => {
      let s = '';
      for (let i = 0; i < len; i++) {
        if (buf[off + i] === 0) break;
        s += String.fromCharCode(buf[off + i]);
      }
      return s;
    };
    civNames.push({
      style: buf[nOff] & 0x03,
      leader: readStr(nOff + 2, 23),
      tribe: readStr(nOff + 26, 23),
      adjective: readStr(nOff + 50, 23),
    });
  }

  // ── Load wonders ──
  // 28 × uint16 at 0x010A
  const wonders = new Array(28);
  for (let i = 0; i < 28; i++) {
    wonders[i] = u16(buf, 0x010A + i * 2);
  }

  // ── Load tech discovery info ──
  // First discoverer: 100 bytes at 0x0042
  // Tech discovery bitmask: 100 bytes at 0x00A6
  const techFirstDiscoverer = new Uint8Array(buf.slice(0x42, 0x42 + 100));
  const techDiscoveryMask = new Uint8Array(buf.slice(0xA6, 0xA6 + 100));

  // ── Parse per-civ game data from .sav for reporting ──
  const civInfo = [];
  for (let slot = 0; slot < NUM_CIVS; slot++) {
    const off = civDataStart + slot * SAV_CIV_REC;
    const techBitmask = new Uint8Array(buf.slice(off + 88, off + 100));
    let techCount = 0;
    for (let i = 0; i < 12; i++) {
      for (let b = 0; b < 8; b++) {
        if (techBitmask[i] & (1 << b)) techCount++;
      }
    }
    civInfo.push({
      slot,
      alive: !!(civsAlive & (1 << slot)),
      name: civNames[slot]?.tribe || `Civ${slot}`,
      leader: civNames[slot]?.leader || '',
      government: ['Anarchy','Despotism','Monarchy','Communism','Fundamentalism','Republic','Democracy'][buf[off + 21]] || 'Unknown',
      treasury: s32(buf, off + 2),
      scienceRate: buf[off + 19] * 10,
      taxRate: buf[off + 20] * 10,
      techCount,
      researchProgress: u16(buf, off + 8),
      techBeingResearched: buf[off + 10],
    });
  }

  return {
    turnsPassed,
    activePlayer,
    playerCiv,
    difficulty,
    barbarianLevel,
    civsAlive,
    humanPlayers,
    totalUnits,
    totalCities,
    mw, mh, mw2,
    mapShape,
    mapSeed,
    flatEarth,
    civNames,
    civInfo,
    wonders,
  };
}
