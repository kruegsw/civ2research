// ═══════════════════════════════════════════════════════════════════
// parser.js — Civilization II MGE Save File Binary Parser
// Algorithms from Civ2_MGE_Binary_Analysis.md
// ═══════════════════════════════════════════════════════════════════

const Civ2Parser = {

  // ── Binary helpers ──
  u16(buf, off) { return buf[off] | (buf[off + 1] << 8); },
  s16(buf, off) { const v = this.u16(buf, off); return v > 32767 ? v - 65536 : v; },
  u32(buf, off) { return (buf[off] | (buf[off+1]<<8) | (buf[off+2]<<16) | (buf[off+3]<<24)) >>> 0; },
  nullStr(buf, off, maxLen) {
    let s = '';
    for (let i = 0; i < maxLen; i++) {
      if (buf[off + i] === 0) break;
      s += String.fromCharCode(buf[off + i]);
    }
    return s;
  },

  // ── Main parse function ──
  parse(savBuf, fileName) {
    const isScn = fileName.toLowerCase().endsWith('.scn');

    // Map header: fixed offset depends on file type
    const MAP_HEADER = isScn ? 13432 : 13702;
    const mw2 = this.u16(savBuf, MAP_HEADER);       // doubled width
    const mh  = this.u16(savBuf, MAP_HEADER + 2);    // height in rows
    const ms  = this.u16(savBuf, MAP_HEADER + 4);    // total tiles
    const mw  = mw2 >> 1;                            // actual columns per row
    const mapShape = this.u16(savBuf, MAP_HEADER + 6);
    const mapSeed = this.u16(savBuf, MAP_HEADER + 8);
    const qw  = this.u16(savBuf, MAP_HEADER + 10);   // quarter width
    const qh  = this.u16(savBuf, MAP_HEADER + 12);   // quarter height

    // Validate
    if (mw * mh !== ms) {
      throw new Error(`Map validation failed: ${mw}×${mh} != ${ms}. Wrong file format?`);
    }

    // Block 2 offset (terrain data) = skip map header + Block 1 (per-civ improvements)
    const block1Off = MAP_HEADER + 14;
    const block2Off = block1Off + ms * 7;

    // Read all tile records (6 bytes each, interleaved)
    const tileData = new Array(ms);
    for (let i = 0; i < ms; i++) {
      const off = block2Off + i * 6;
      tileData[i] = [savBuf[off], savBuf[off+1], savBuf[off+2],
                     savBuf[off+3], savBuf[off+4], savBuf[off+5]];
    }

    // Resource seed computation
    const s = mapSeed % 64;
    const s1x = s & 3, s1y = (s >> 2) & 3;
    const s2x = (s1x + 2) % 4, s2y = (s1y + 2) % 4;

    // Player civ slot and alive bitmask
    const playerCiv = savBuf[0x0029];
    const civsAlive = savBuf[0x002E];

    // Tech discovery: 100 bytes at 0x00A6, one byte per advance
    // Each byte is a bitmask of which civs discovered that tech (bit 0=barbs, bit 1=civ1, etc.)
    const civTechCounts = new Array(8).fill(0);
    for (let adv = 0; adv < 89; adv++) {
      const byte = savBuf[0x00A6 + adv];
      for (let civ = 0; civ < 8; civ++) {
        if (byte & (1 << civ)) civTechCounts[civ]++;
      }
    }

    // Record sizes depend on file type
    const unitRecSize = isScn ? 26 : 32;
    const cityRecSize = isScn ? 84 : 88;

    // Unit and city counts from file header
    const totalUnits  = this.u16(savBuf, 0x003A);
    const totalCities = this.u16(savBuf, 0x003C);

    // Forward chain to locate unit and city sections
    const block3Off = block2Off + ms * 6;
    const unitOff   = block3Off + qw * qh * 2 + 1024;
    const cityOff   = unitOff + totalUnits * unitRecSize;

    // Parse per-civ city styles from name blocks
    // Name blocks: 242 bytes each, 7 blocks for civs 1-7 (no barbarians)
    // City style byte is at offset +0 within each block, value 0-3
    const civNameBlockStart = isScn ? 0x014A : 0x0158;
    const civStyles = new Array(8).fill(0); // slot 0 = barbarians, default 0
    for (let slot = 1; slot <= 7; slot++) {
      const blockOff = civNameBlockStart + (slot - 1) * 242;
      if (blockOff < savBuf.length) {
        civStyles[slot] = savBuf[blockOff] & 0x03;
      }
    }

    // Parse cities
    const cities = [];
    for (let i = 0; i < totalCities; i++) {
      const off = cityOff + i * cityRecSize;
      if (off + cityRecSize > savBuf.length) break;
      const cx = this.u16(savBuf, off);
      const cy = this.u16(savBuf, off + 2);
      const owner = savBuf[off + 8];
      const size  = savBuf[off + 9];
      const name  = this.nullStr(savBuf, off + 32, 16);
      // City Walls: building bitmask at +52 (uint32 LE), bit 8 = City Walls
      const buildings = this.u32(savBuf, off + 52);
      const hasWalls = (buildings & 0x100) !== 0;
      const style = civStyles[owner] || 0;
      if (name && size > 0) {
        cities.push({ name, cx, cy, gx: cx >> 1, gy: cy, owner, size, hasWalls, style });
      }
    }

    // Parse units
    const units = [];
    for (let i = 0; i < totalUnits; i++) {
      const off = unitOff + i * unitRecSize;
      if (off + unitRecSize > savBuf.length) break;
      const ux = this.s16(savBuf, off);
      const uy = this.s16(savBuf, off + 2);
      const utype  = savBuf[off + 6];
      const uowner = savBuf[off + 7];
      const alive  = savBuf[off + 14];
      const orders = savBuf[off + 15];
      if (alive === 0 && ux >= 0 && ux < mw2 && uy >= 0 && uy < mh) {
        units.push({ gx: ux >> 1, gy: uy, type: utype, owner: uowner, orders });
      }
    }

    // ── Build accessor functions ──
    function wrap(x) { return ((x % mw) + mw) % mw; }

    function getTerrain(gx, gy) {
      if (gy < 0 || gy >= mh) return 10;
      return tileData[gy * mw + wrap(gx)][0] & 0x0F;
    }

    function isLand(gx, gy) { return getTerrain(gx, gy) !== 10; }

    function hasRiver(gx, gy) {
      if (gy < 0 || gy >= mh) return false;
      return !!(tileData[gy * mw + wrap(gx)][0] & 0x80);
    }

    function getImprovements(gx, gy) {
      if (gy < 0 || gy >= mh) return 0;
      return tileData[gy * mw + wrap(gx)][1];
    }

    function getVisibility(gx, gy) {
      if (gy < 0 || gy >= mh) return 0;
      return tileData[gy * mw + wrap(gx)][4];
    }

    function getResource(gx, gy) {
      if (gy < 0 || gy >= mh) return 0;
      if (tileData[gy * mw + wrap(gx)][0] & 0x40) return 0; // "no resource" flag
      if (wrap(gx) % 4 === s1x && gy % 4 === s1y) return 1;
      if (wrap(gx) % 4 === s2x && gy % 4 === s2y) return 2;
      return 0;
    }

    // Neighbor lookup — the critical isometric stagger logic
    // Even rows: NE/SE use same column, NW/SW use column-1
    // Odd rows:  NE/SE use column+1, NW/SW use same column
    function getNeighbors(gx, gy) {
      if (gy % 2 === 0) {
        return {
          N:[gx,gy-2], NE:[wrap(gx),gy-1], E:[wrap(gx+1),gy], SE:[wrap(gx),gy+1],
          S:[gx,gy+2], SW:[wrap(gx-1),gy+1], W:[wrap(gx-1),gy], NW:[wrap(gx-1),gy-1]
        };
      } else {
        return {
          N:[gx,gy-2], NE:[wrap(gx+1),gy-1], E:[wrap(gx+1),gy], SE:[wrap(gx+1),gy+1],
          S:[gx,gy+2], SW:[wrap(gx),gy+1], W:[wrap(gx-1),gy], NW:[wrap(gx),gy-1]
        };
      }
    }

    // Terrain distribution check
    const terrainCounts = new Array(11).fill(0);
    for (let i = 0; i < ms; i++) terrainCounts[tileData[i][0] & 0x0F]++;
    const oceanPct = (terrainCounts[10] / ms * 100).toFixed(1);

    // City-on-land validation
    let citiesOnOcean = 0;
    for (const c of cities) {
      if (getTerrain(c.gx, c.gy) === 10) citiesOnOcean++;
    }

    console.log(`Map: ${mw}×${mh} = ${ms} tiles, Ocean: ${oceanPct}%`);
    console.log(`Cities: ${cities.length}, Units: ${units.length}, Cities on ocean: ${citiesOnOcean}`);
    if (citiesOnOcean > 0) console.warn('WARNING: Some cities are on ocean tiles!');

    return {
      mw, mh, mw2, ms, mapSeed, qw, qh, mapShape, isScn,
      tileData, cities, units, civStyles,
      playerCiv, civsAlive, civTechCounts,
      s1x, s1y, s2x, s2y,
      terrainCounts, oceanPct, citiesOnOcean,
      // Accessor functions
      getTerrain, isLand, hasRiver, getImprovements, getVisibility, getResource, getNeighbors, wrap
    };
  }
};
