// ═══════════════════════════════════════════════════════════════════
// fn_utils.js — Utility functions transpiled from civ2.exe
//
// MECHANICAL TRANSPILATION OF CIV2.EXE DECOMPILED C CODE
//
// Each function is a direct, line-by-line translation of the Ghidra
// decompiled output. Variable names (param_1, local_8, iVar1, etc.)
// are preserved from the decompiler. DAT_ addresses reference the
// flat memory arrays defined in mem.js.
//
// IMPORTANT: Inferred function names (in comments) are BEST GUESSES
// based on observed behavior. They should NOT be trusted blindly.
// If something seems wrong, question and investigate. Go back to the
// decompiled C source in reverse_engineering/decompiled/block_*.c
// and re-examine the raw code.
//
// Source files:
//   block_00400000.c — FUN_004087c0
//   block_004B0000.c — FUN_004bd9f0
//   block_005A0000.c — FUN_005ae052
//   block_005B0000.c — FUN_005b8931, FUN_005b89bb, FUN_005b89e4,
//                       FUN_005b8a1d, FUN_005b8ca6, FUN_005b94d5,
//                       FUN_005b68f6, FUN_005b8ee1
//   block_00580000.c — FUN_0058c56c
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// FUN_004087c0 — is_tile_valid (bounds check)
// Source: block_00400000.c line 1250, 80 bytes
//
// Returns 1 if (x,y) is within map bounds, 0 otherwise.
// Uses doubled-X coordinate system.
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';
import { s8, u8, getTileOffset, tileRead } from './mem.js';

export function FUN_004087c0(param_1, param_2) {
  let uVar1;

  if (param_2 < 0 || G.DAT_006d1162 <= param_2 || param_1 < 0 || G.DAT_006d1160 <= param_1) {
    uVar1 = 0;
  } else {
    uVar1 = 1;
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005ae052 — wrap_x
// Source: block_005A0000.c line 4455, 94 bytes
//
// Wraps an X coordinate for round-earth maps.
// On flat maps (G.DAT_00655ae8 bit 15 set), no wrapping occurs.
// ═══════════════════════════════════════════════════════════════════

export function FUN_005ae052(param_1) {
  if ((G.DAT_00655ae8 & 0x8000) === 0) {
    if (param_1 < 0) {
      param_1 = G.DAT_006d1160 + param_1;
    } else if (G.DAT_006d1160 <= param_1) {
      param_1 = param_1 - G.DAT_006d1160;
    }
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8931 — get_tile_data_ptr
// Source: block_005B0000.c line 3207, 90 bytes
//
// Returns offset into tile data array for tile at (param_1, param_2).
// If out of bounds, returns offset to dummy tile (G.DAT_006d1188).
//
// Original C returns a byte pointer. JS returns an offset integer
// for use with tileRead(offset, byteIndex).
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8931(param_1, param_2) {
  let iVar1;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 === 0) {
    return -1; // dummy tile (out of bounds)
  } else {
    return getTileOffset(param_1, param_2);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b94d5 — get_tile_improvements
// Source: block_005B0000.c line 3819, 39 bytes
//
// Returns the improvement bitfield (byte[1]) for tile at (x, y).
// Bits: 2=irrigation, 3=mining, 4=road, 5=railroad, 6=fortress, 7=pollution
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b94d5(param_1, param_2) {
  const iVar1 = FUN_005b8931(param_1, param_2);
  return tileRead(iVar1, 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b89bb — get_terrain
// Source: block_005B0000.c line 3246, 41 bytes
//
// Returns terrain type (low nibble of byte[0]) for tile at (x, y).
// The Ghidra CONCAT31 + mask extracts bits 0-3.
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b89bb(param_1, param_2) {
  const offset = FUN_005b8931(param_1, param_2);
  const byte0 = tileRead(offset, 0);
  return byte0 & 0x0F;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b89e4 — is_ocean
// Source: block_005B0000.c line 3262, 57 bytes
//
// Returns true if terrain at (x, y) is ocean (terrain type 10 = 0x0A).
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b89e4(param_1, param_2) {
  const cVar1 = FUN_005b89bb(param_1, param_2);
  return cVar1 === 10;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8a1d — get_city_owner_at_tile
// Source: block_005B0000.c line 3274, 100 bytes
//
// Returns city index at tile (x, y), or -1 if no city.
// Reads byte[5] of tile data, high nibble = city index.
// 0xF = no city.
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8a1d(param_1, param_2) {
  let iVar1;
  let local_8;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 === 0) {
    local_8 = -1;
  } else {
    const offset = FUN_005b8931(param_1, param_2);
    local_8 = u8(tileRead(offset, 5)) >> 4;
    if (local_8 === 0xF) {
      local_8 = -1;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8ca6 — find_city_at
// Source: block_005B0000.c line 3457, 111 bytes
//
// Returns city index at tile (x, y), or -1 (0xFFFFFFFF) if no city.
// Checks both bounds and that the tile has a city improvement flag.
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8ca6(param_1, param_2) {
  let iVar2;
  let uVar3;

  iVar2 = FUN_004087c0(param_1, param_2);
  if (iVar2 === 0) {
    uVar3 = -1;
  } else {
    const bVar1 = FUN_005b94d5(param_1, param_2);
    if ((bVar1 & 0x42) === 2) {
      uVar3 = FUN_005b8a1d(param_1, param_2);
    } else {
      uVar3 = -1;
    }
  }
  return uVar3;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b8ee1 — check_special_resource
// Source: block_005B0000.c line 3577, 281 bytes
//
// Returns 0, 1, or 2 indicating no/primary/secondary special
// resource at tile (x, y). Uses map seed and tile position to
// deterministically place resources.
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b8ee1(param_1, param_2) {
  let iVar1;
  let local_8;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (iVar1 === 0) {
    local_8 = 0;
  } else {
    const offset = FUN_005b8931(param_1, param_2);
    const byte0 = tileRead(offset, 0);
    if ((byte0 & 0x40) === 0) {
      if ((byte0 & 0xF) === 2) {
        local_8 = 0;
      } else {
        const uVar3 = (param_2 + param_1) >> 1;
        const uVar4 = param_1 - ((param_2 + param_1) >> 1);
        if (((uVar3 & 3) + (uVar4 & 3) * 4) ===
            (((((param_2 + param_1) >> 3) * 0xB + (uVar4 >> 2) * 0xD + G.DAT_006d1168) & 0xF) >>> 0)) {
          local_8 = 1;
          const uVar5 = 1 << ((G.DAT_006d1168 >> 4) & 3);
          if ((uVar5 & uVar3) === (uVar5 & uVar4)) {
            local_8 = 2;
          }
        } else {
          local_8 = 0;
        }
      }
    } else {
      local_8 = 0;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bd9f0 — has_tech
// Source: block_004B0000.c line 5970, 181 bytes
//
// Returns 1 if civ param_1 has discovered tech param_2, else 0.
// Special cases: -2 → 0, negative → 1, 89 (0x59) → 0, ≥100 → 0.
//
// Tech bitmask stored in per-civ data at offset 0xF8 (G.DAT_0064c6f8).
// FUN_005ae3bf converts tech ID to (byte_index, bit_mask).
// ═══════════════════════════════════════════════════════════════════

export function FUN_004bd9f0(param_1, param_2) {
  let uVar1;

  if (param_2 === -2) {
    uVar1 = 0;
  } else if (param_2 < 0) {
    uVar1 = 1;
  } else if (param_2 === 0x59) {
    uVar1 = 0;
  } else if (param_2 < 100) {
    if (param_1 < 1) {
      uVar1 = 0;
    } else {
      // FUN_005ae3bf: convert tech ID to byte index and bit mask
      const local_c = param_2 >> 3;          // byte index
      const local_8 = 1 << (param_2 & 7);    // bit mask
      // Check tech bitmask in per-civ data
      // G.DAT_0064c6f8[param_1 * 0x594 + local_c]
      const techByte = G.DAT_0064c600[param_1 * 0x594 + 0xF8 + local_c];
      if ((local_8 & techByte) === 0) {
        uVar1 = 0;
      } else {
        uVar1 = 1;
      }
    }
  } else {
    uVar1 = 0;
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058c56c — check_adjacent_water
// Source: block_00580000.c line 3882, 242 bytes
//
// Returns 1 if any of the 4 cardinal neighbors (+ self?) is:
//   - Ocean tile, OR
//   - Has river (tile byte[0] bit 7), OR
//   - Has irrigation (improvement bit 2)
// Returns 0 if no water source is adjacent.
//
// Uses G.DAT_0062833c/G.DAT_00628344 as 5-entry direction tables.
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058c56c(param_1, param_2) {
  let local_8 = 0;

  while (true) {
    if (4 < local_8) {
      return 0;
    }
    const uVar1 = FUN_005ae052(s8(G.DAT_0062833c[local_8]) + param_1);
    const iVar2 = s8(G.DAT_00628344[local_8]) + param_2;
    const iVar3 = FUN_004087c0(uVar1, iVar2);
    if (iVar3 !== 0) {
      // Check if ocean
      const isOcean = FUN_005b89e4(uVar1, iVar2);
      if (isOcean) return 1;
      // Check if river (tile byte[0] bit 7)
      const offset = FUN_005b8931(uVar1, iVar2);
      const byte0 = tileRead(offset, 0);
      if ((byte0 & 0x80) !== 0) return 1;
      // Check if irrigation exists (improvement bit 2)
      const uVar5 = FUN_005b94d5(uVar1, iVar2);
      if ((uVar5 & 4) !== 0) return 1;
    }
    local_8 = local_8 + 1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005b68f6 — check_unit_can_improve
// Source: block_005B0000.c line 2719, 354 bytes
//
// Returns: 0 = no improvement possible
//          1 = irrigate
//          2 = mine
//
// Checks irrigation first (local_c=0), mining second (local_c=1).
// Returns the FIRST valid option.
//
// param_1 = civ slot
// param_2 = gx (doubled-X coordinate)
// param_3 = gy
// ═══════════════════════════════════════════════════════════════════

export function FUN_005b68f6(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;
  let uVar3;

  iVar1 = FUN_005b8ca6(param_2, param_3);
  if (iVar1 < 0) {
    uVar2 = FUN_005b94d5(param_2, param_3);
    if ((uVar2 & 8) === 0) {
      if ((uVar2 & 4) === 0 || (iVar1 = FUN_004bd9f0(param_1, 0x46), iVar1 !== 0)) {
        uVar3 = FUN_005b89bb(param_2, param_3) & 0xFF;
        for (let local_c = 0; local_c < 2; local_c++) {
          if (local_c === 0) {
            iVar1 = FUN_0058c56c(param_2, param_3);
            if (iVar1 === 0) {
              return 0;
            }
          } else if ((uVar2 & 4) !== 0) {
            return 0;
          }
          // G.DAT_00627cce = terrain table offset 0x0E (transform terrain)
          // G.DAT_00627cd4 = terrain table offset 0x14 (requirement/bonus)
          // G.DAT_0064c6b5 = per-civ field at offset 0xB5
          if (G.DAT_00627cce[uVar3 * 0x18 + local_c] !== 0xFF &&  // -1 as unsigned byte
              G.DAT_00627cd4[uVar3 * 0x18 + local_c] !== 0 &&
              s8(G.DAT_00627cd4[uVar3 * 0x18 + local_c]) <=
                u8(G.DAT_0064c600[param_1 * 0x594 + 0xB5])) {
            return local_c + 1;
          }
        }
      }
    }
  }
  return 0;
}
