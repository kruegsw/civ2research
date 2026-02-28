// ═══════════════════════════════════════════════════════════════════
// parser.js — Civilization II MGE Save File Binary Parser
// Algorithms from Civ2_MGE_Binary_Analysis.md
//
// Sources & Acknowledgments:
//   Allard Höfelt — Hex-Editing Guide (hexedit.rtf v1.8, 2005)
//     Binary format offsets, tile data structure, map header fields
//   TE Kimball — civ2mod.c: https://github.com/tek10/civ2mod
//     Unit/city record structures
//   TheNamelessOne (CivFanatics) — resource placement algorithm
//     https://forums.civfanatics.com/threads/518649/#post-13002282
//   Civ2-clone (axx0) — https://github.com/axx0/Civ2-clone
//     Resource algorithm port, city style/epoch verification
//   FoxAhead — Civ2Types.pas, ToT format guide
//     https://foxahead.github.io/Catfish-s-Cave/jp_hex.htm
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

    // Block 1: per-civ known improvements (7 sections, one per non-barbarian civ 1-7)
    // Each byte has same format as improvements byte (Block 2 byte[1]):
    // bit 0=unit, 1=city, 2=irrigation, 3=mining, 4=road, 5=railroad, 6=fortress, 7=pollution
    const knownImprovements = new Array(8).fill(null);
    for (let civ = 1; civ <= 7; civ++) {
      const sectionOff = block1Off + (civ - 1) * ms;
      const section = new Uint8Array(ms);
      for (let i = 0; i < ms; i++) {
        section[i] = savBuf[sectionOff + i];
      }
      knownImprovements[civ] = section;
    }

    function getKnownImprovements(gx, gy, civSlot) {
      if (civSlot < 1 || civSlot > 7 || gy < 0 || gy >= mh) return 0;
      return knownImprovements[civSlot][gy * mw + wrap(gx)];
    }

    // Read all tile records (6 bytes each, interleaved)
    const tileData = new Array(ms);
    for (let i = 0; i < ms; i++) {
      const off = block2Off + i * 6;
      tileData[i] = [savBuf[off], savBuf[off+1], savBuf[off+2],
                     savBuf[off+3], savBuf[off+4], savBuf[off+5]];
    }

    // Resource seed — used by getResource() with TheNamelessOne's algorithm

    // Player civ slot and alive bitmask
    const playerCiv = savBuf[0x0029];
    const civsAlive = savBuf[0x002E];

    // Tech discovery: 100 bytes at 0x00A6, one byte per advance
    // Each byte is a bitmask of which civs discovered that tech (bit 0=barbs, bit 1=civ1, etc.)
    const civTechCounts = new Array(8).fill(0);
    const civTechs = Array.from({length: 8}, () => new Set());
    for (let adv = 0; adv < 89; adv++) {
      const byte = savBuf[0x00A6 + adv];
      for (let civ = 0; civ < 8; civ++) {
        if (byte & (1 << civ)) {
          civTechCounts[civ]++;
          civTechs[civ].add(adv);
        }
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

    // Parse per-civ city styles
    // Name blocks: 8 × 242 bytes, style byte at +0 of each block (value 0-3)
    // AI civs often have empty name blocks, so fall back to RULES.TXT defaults
    const civNameBlockStart = isScn ? 0x0148 : 0x0156;
    const civDataBlockStart = isScn ? 0x08D8 : 0x08E6;
    const civDataBlockSize = isScn ? 1396 : 1428;
    // Default city styles per RULES.TXT @LEADERS index (0-20)
    const RULES_STYLES = [1,0,3,0,1,1,2,3,0,3,0,2,3,0,0,2,3,3,0,1,0];
    const civStyles = new Array(8).fill(0);
    for (let slot = 0; slot < 8; slot++) {
      const nameOff = civNameBlockStart + slot * 242;
      // Check if name block has content (leader name at +2)
      const hasNameBlock = nameOff + 2 < savBuf.length && savBuf[nameOff + 2] !== 0;
      if (hasNameBlock) {
        // Player civ or customized: read style from name block
        civStyles[slot] = savBuf[nameOff] & 0x03;
      } else {
        // AI civ with empty name block: look up RULES.TXT civ number from per-civ data block
        const dataOff = civDataBlockStart + slot * civDataBlockSize;
        if (dataOff + 7 < savBuf.length) {
          const rulesIdx = savBuf[dataOff + 6];  // byte 7 (1-indexed) = RULES.TXT civ#
          civStyles[slot] = (rulesIdx < RULES_STYLES.length) ? RULES_STYLES[rulesIdx] : 0;
        }
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
      // Building bitmask at +52 (uint32 LE), 1-indexed: bit 1=Palace, bit 8=City Walls
      const buildings = this.u32(savBuf, off + 52);
      const hasWalls = (buildings & 0x100) !== 0;
      const hasPalace = (buildings & 0x02) !== 0;
      const originalOwner = savBuf[off + 10];
      const turnsSinceCapture = savBuf[off + 11];
      const isOccupied = (owner !== originalOwner);
      const believedSize = [];
      for (let civ = 0; civ < 8; civ++) {
        believedSize[civ] = savBuf[off + 14 + civ];
      }
      const style = civStyles[owner] || 0;
      if (name && size > 0) {
        cities.push({ name, cx, cy, gx: cx >> 1, gy: cy, owner, size, hasWalls, hasPalace, originalOwner, turnsSinceCapture, isOccupied, believedSize, style });
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
      const hpLost = savBuf[off + 10];
      if (alive === 0 && ux >= 0 && ux < mw2 && uy >= 0 && uy < mh) {
        units.push({ gx: ux >> 1, gy: uy, type: utype, owner: uowner, orders, hpLost });
      }
    }

    // ── Build accessor functions ──
    function wrap(x) { return ((x % mw) + mw) % mw; }

    function getTerrain(gx, gy) {
      if (gy < 0 || gy >= mh) return 10;
      const ter = tileData[gy * mw + wrap(gx)][0] & 0x0F;
      return ter > 10 ? 10 : ter;
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

    function hasGoodyHut(gx, gy) {
      if (gy < 0 || gy >= mh) return false;
      return !!(tileData[gy * mw + wrap(gx)][0] & 0x10);
    }

    function getVisibility(gx, gy) {
      if (gy < 0 || gy >= mh) return 0;
      return tileData[gy * mw + wrap(gx)][4];
    }

    // Resource placement algorithm by TheNamelessOne (CivFanatics):
    // https://forums.civfanatics.com/threads/518649/#post-13002282
    // Ported from Civ2-clone (axx0): https://github.com/axx0/Civ2-clone
    // Uses doubled isometric coordinates and full mapSeed value.
    function getResource(gx, gy) {
      if (gy < 0 || gy >= mh) return 0;
      if (tileData[gy * mw + wrap(gx)][0] & 0x40) return 0; // "no resource" flag
      const X = 2 * wrap(gx) + (gy % 2); // doubled isometric X
      const Y = gy;
      const a = (X + Y) >> 1;
      const b = X - a;
      const c = 13 * (b >> 2) + 11 * ((X + Y) >> 3) + mapSeed;
      if ((a & 3) + 4 * (b & 3) !== (c & 15)) return 0;
      const d = 1 << ((mapSeed >> 4) & 3);
      return (d & a) === (d & b) ? 2 : 1;
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
      playerCiv, civsAlive, civTechCounts, civTechs,
      terrainCounts, oceanPct, citiesOnOcean,
      // Accessor functions
      getTerrain, isLand, hasRiver, getImprovements, getVisibility, getResource, getNeighbors, wrap,
      // Block 1 / FOW / occupancy data
      knownImprovements, getKnownImprovements, hasGoodyHut
    };
  }
};
