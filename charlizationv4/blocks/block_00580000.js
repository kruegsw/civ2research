// ═══════════════════════════════════════════════════════════════════
// block_00580000.js — Mechanical transpilation of block_00580000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00580000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00580000.c
// ═══════════════════════════════════════════════════════════════════


// ── DAT_ globals (imported conceptually from mem.js) ──
// In a full integration these would come from mem.js.
// For now we declare them as module-level variables that can be
// set externally, matching the pattern of the decompiled binary.

// NOTE: Many DAT_ addresses below are referenced by FUN_00580341
// and other functions. They are declared here as stubs. In a full
// integration, they would be wired to the actual game state arrays.


// ── Unit data array base (stride 0x20 per unit) ──
// ── Unit type table (stride 0x14 per type) ──
// ── Per-civ data (stride 0x594 per civ) ──
// ── City data (stride 0x58 per city) ──
// ── Direction offsets (8 directions) ──
// ── 20-tile city radius offsets ──

// ── Cosmic parameters array ──

// ── Misc data aliases used via offsets from base ──
// These are conceptual; in C they are just memory addresses.
// We use accessor helpers below.

// ── War/peace/alliance/diplomacy tables in per-civ data ──
// G.DAT_0064c6c0 at offset 0xC0 in per-civ (stride 0x594)
// G.DAT_0064ca82 at offset 0x482 in per-civ

// ── Barbarian tech flags ──


// ── Random number generator (C runtime _rand) ──
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_0040bc80, FUN_0040ff60, FUN_0040ffa0 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_0041033a, FUN_004105f8, FUN_00410e46, FUN_00419d23 } from './block_00410000.js';
import { FUN_00421da0, FUN_00421ea0, FUN_00421ed0, FUN_00421f10, FUN_004271e8, FUN_004272d0 } from './block_00420000.js';
import { FUN_004274a6 } from './block_00420000.js';
import { FUN_00436287, FUN_0043cc00 } from './block_00430000.js';
import { FUN_00440750, FUN_00442541, FUN_004442a0, FUN_004442e0 } from './block_00440000.js';
import { FUN_00453e51, FUN_0045a8e3, FUN_0045ac71, FUN_0045b0d6 } from './block_00450000.js';
import { FUN_00467825, FUN_0046b14d, FUN_0046e020, FUN_0046e287 } from './block_00460000.js';
import { FUN_0047bc59, FUN_0047cb26, FUN_0047ce1e, FUN_0047cea6, FUN_0047cf22 } from './block_00470000.js';
import { FUN_00489859, FUN_00489a0d } from './block_00480000.js';
import { FUN_004904c0, FUN_00492c15, FUN_004933f2, FUN_00493c7d } from './block_00490000.js';
import { FUN_004b0b53, FUN_004bf05b, FUN_004bfdbe } from './block_004B0000.js';
import { FUN_004c4210, FUN_004c42a0, FUN_004c4d1e, FUN_004c50d0, FUN_004c54da, FUN_004ca1cd } from './block_004C0000.js';
import { FUN_004cc870 } from './block_004C0000.js';
import { FUN_004e7492, FUN_004eb80a } from './block_004E0000.js';
import { FUN_00511880 } from './block_00510000.js';
import { FUN_005369f3 } from './block_00530000.js';
import { FUN_0055339f, FUN_0055f5a3 } from './block_00550000.js';
import { FUN_00569363, FUN_0056c705 } from './block_00560000.js';
import { FUN_00579c40, FUN_00579ed0, FUN_0057e2c3, FUN_0057e33a, FUN_0057e6e2, FUN_0057e9f9 } from './block_00570000.js';
import { FUN_0057eb94, FUN_0057ebfd, FUN_0057ed3f, FUN_0057f9e3, FUN_0057febc } from './block_00570000.js';
import { FUN_0059062c, FUN_0059e18b, FUN_0059ec88, FUN_0059edf0 } from './block_00590000.js';
import { FUN_005adfa0, FUN_005ae1b0 } from './block_005A0000.js';
import { FUN_005b29aa, FUN_005b29d7, FUN_005b2a39, FUN_005b2c3d, FUN_005b2e69, FUN_005b2f50 } from './block_005B0000.js';
import { FUN_005b3ae0, FUN_005b3d06, FUN_005b4391, FUN_005b490e, FUN_005b50ad, FUN_005b5bab } from './block_005B0000.js';
import { FUN_005b633f, FUN_005b6787, FUN_005b6aea, FUN_005b8a81, FUN_005b8b1a, FUN_005b8d15 } from './block_005B0000.js';
import { FUN_005b8d62, FUN_005b9ec6, FUN_005b9f1c, FUN_005bb574, FUN_005bd630, FUN_005bd915 } from './block_005B0000.js';
import { FUN_005c656b } from './block_005C0000.js';

function _rand() {
  return Math.floor(Math.random() * 0x7FFF);
}


// ═══════════════════════════════════════════════════════════════════
// ACCESSOR HELPERS
//
// These simulate C pointer arithmetic like (&G.DAT_006560f7)[idx * 0x20]
// by accessing the appropriate byte from the backing arrays.
// ═══════════════════════════════════════════════════════════════════

function unit_byte(offset, unitIdx) {
  return G.DAT_006560f0[unitIdx * 0x20 + offset];
}
function set_unit_byte(offset, unitIdx, val) {
  G.DAT_006560f0[unitIdx * 0x20 + offset] = val & 0xFF;
}
function unit_short(offset, unitIdx) {
  const base = unitIdx * 0x20 + offset;
  const v = G.DAT_006560f0[base] | (G.DAT_006560f0[base + 1] << 8);
  return (v & 0x8000) ? (v - 0x10000) : v;
}
function unit_ushort(offset, unitIdx) {
  const base = unitIdx * 0x20 + offset;
  return G.DAT_006560f0[base] | (G.DAT_006560f0[base + 1] << 8);
}
function set_unit_ushort(offset, unitIdx, val) {
  const base = unitIdx * 0x20 + offset;
  G.DAT_006560f0[base] = val & 0xFF;
  G.DAT_006560f0[base + 1] = (val >> 8) & 0xFF;
}
function unit_int(offset, unitIdx) {
  const base = unitIdx * 0x20 + offset;
  return G.DAT_006560f0[base] | (G.DAT_006560f0[base + 1] << 8) |
         (G.DAT_006560f0[base + 2] << 16) | (G.DAT_006560f0[base + 3] << 24);
}

function utype_byte(offset, typeIdx) {
  return G.DAT_0064b1bc[typeIdx * 0x14 + offset];
}

function civ_byte(offset, civIdx) {
  return G.DAT_0064c600[civIdx * 0x594 + offset];
}
function set_civ_byte(offset, civIdx, val) {
  G.DAT_0064c600[civIdx * 0x594 + offset] = val & 0xFF;
}
function civ_short(offset, civIdx) {
  const base = civIdx * 0x594 + offset;
  const v = G.DAT_0064c600[base] | (G.DAT_0064c600[base + 1] << 8);
  return (v & 0x8000) ? (v - 0x10000) : v;
}
function civ_int(offset, civIdx) {
  const base = civIdx * 0x594 + offset;
  return G.DAT_0064c600[base] | (G.DAT_0064c600[base + 1] << 8) |
         (G.DAT_0064c600[base + 2] << 16) | (G.DAT_0064c600[base + 3] << 24);
}
function set_civ_int(offset, civIdx, val) {
  const base = civIdx * 0x594 + offset;
  G.DAT_0064c600[base] = val & 0xFF;
  G.DAT_0064c600[base + 1] = (val >> 8) & 0xFF;
  G.DAT_0064c600[base + 2] = (val >> 16) & 0xFF;
  G.DAT_0064c600[base + 3] = (val >> 24) & 0xFF;
}

function city_byte(offset, cityIdx) {
  return G.DAT_0064f340[cityIdx * 0x58 + offset];
}
function set_city_byte(offset, cityIdx, val) {
  G.DAT_0064f340[cityIdx * 0x58 + offset] = val & 0xFF;
}
function city_short(offset, cityIdx) {
  const base = cityIdx * 0x58 + offset;
  const v = G.DAT_0064f340[base] | (G.DAT_0064f340[base + 1] << 8);
  return (v & 0x8000) ? (v - 0x10000) : v;
}
function city_int(offset, cityIdx) {
  const base = cityIdx * 0x58 + offset;
  return G.DAT_0064f340[base] | (G.DAT_0064f340[base + 1] << 8) |
         (G.DAT_0064f340[base + 2] << 16) | (G.DAT_0064f340[base + 3] << 24);
}
function set_city_int(offset, cityIdx, val) {
  const base = cityIdx * 0x58 + offset;
  G.DAT_0064f340[base] = val & 0xFF;
  G.DAT_0064f340[base + 1] = (val >> 8) & 0xFF;
  G.DAT_0064f340[base + 2] = (val >> 16) & 0xFF;
  G.DAT_0064f340[base + 3] = (val >> 24) & 0xFF;
}

// Diplomacy table access: (&G.DAT_0064c6c0)[civA * 4 + civB * 0x594]
// This is at per-civ offset 0xC0 + civA*4
function diplo_byte(offset, civA, civB) {
  return G.DAT_0064c600[civB * 0x594 + 0xC0 + offset + civA * 4];
}

// ── Combat-related per-civ arrays (at fixed addresses) ──


// ═══════════════════════════════════════════════════════════════════
// FUN_005802fd — refresh_combat_tiles
// Source: block_00580000.c @ 0x005802FD, 68 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_005802fd(param_1, param_2, param_3, param_4) {
  FUN_0047ce1e(param_1, param_2, 0, G.DAT_006d1da0, 1);
  FUN_0047ce1e(param_3, param_4, 0, G.DAT_006d1da0, 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00580341 — resolve_combat
// Source: block_00580000.c @ 0x00580341, 15052 bytes
//
// THE critical combat resolution function. Handles attack strength
// calculation, defense strength calculation, round-by-round combat,
// unit destruction, city capture, diplomacy effects, and more.
//
// param_1 = attacking unit index
// param_2 = direction of attack (0-7)
// param_3 = 0 for odds calculation only, nonzero for actual combat
//
// Returns: if param_3===0, returns attack odds ratio (0-1024)
//          if param_3!==0, returns 1 if attacker wins, 0 if defender wins
// ═══════════════════════════════════════════════════════════════════

export function FUN_00580341(param_1, param_2, param_3) {
  let bVar1;
  let bVar2;
  let bVar3;
  let bVar4;
  let bVar5;
  let bVar6;
  let uVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let uVar11;
  let uVar12;
  let iVar13;
  let uVar14;
  let iVar15;
  let iVar16;
  let uVar17;
  let bVar18;
  let local_e4;
  let local_e0;
  let local_dc;
  let local_d8;
  let local_d4;
  let local_d0;
  let local_cc;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_b0;
  let local_ac;
  let local_a0;
  let local_98;
  let local_78;
  let local_6c;
  let local_64;
  let local_60;
  let aiStack_58 = new Array(8).fill(0);
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_28 = 0;
  local_b8 = 0;
  bVar18 = false;
  bVar5 = false;
  local_30 = 0;
  local_b0 = 0;
  local_10 = 0;
  local_24 = 0;
  local_ac = 0;
  local_38 = 1;

  for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
    G.DAT_006acae8[local_18] = 0;
    G.DAT_006acb10[local_18] = 0;
  }

  // (&G.DAT_006560f7)[param_1 * 0x20] = attacker owner
  bVar1 = unit_byte(0x07, param_1);
  uVar7 = s8(bVar1);
  // attacker x, y
  iVar8 = unit_short(0x00, param_1);
  iVar9 = unit_short(0x02, param_1);
  // attacker attack strength
  local_a0 = FUN_0057e2c3(param_1);
  // attacker firepower
  local_78 = s8(utype_byte(0x0B, u8(unit_byte(0x06, param_1))));
  // attacker movement points remaining
  iVar10 = FUN_005b2c3d(param_1);
  if (iVar10 < G.DAT_0064bcc8) {
    local_98 = FUN_005b2c3d(param_1);
  } else {
    local_98 = G.DAT_0064bcc8;
  }
  if (param_3 !== 0) {
    local_a0 = ((local_a0 * local_98) / G.DAT_0064bcc8) | 0;
  }

  // Target tile coordinates
  uVar11 = FUN_005ae052(s8(G.DAT_00628350[param_2]) + iVar8);
  iVar10 = s8(G.DAT_00628360[param_2]) + iVar9;
  local_14 = iVar10;
  local_8 = uVar11;

  // Find top defender on target tile
  local_c = FUN_005b2e69(uVar11, iVar10);
  if (local_c < 0) {
    return 999;
  }

  // Get best defender against this attacker
  local_c = FUN_0057e6e2(local_c, param_1);

  // Defender owner
  bVar2 = unit_byte(0x07, local_c);
  uVar12 = s8(bVar2);

  // Defender defense strength
  local_64 = FUN_0057e33a(local_c, 0, param_1);
  // Defender firepower
  local_34 = s8(utype_byte(0x0B, u8(unit_byte(0x06, local_c))));

  // ── Air unit attacking non-air ground unit with no attack: halve defense, firepower=1 ──
  if ((utype_byte(0x0E, u8(unit_byte(0x06, param_1))) === 0x03) &&
      (utype_byte(0x05, u8(unit_byte(0x06, local_c))) === 0x01) &&
      (utype_byte(0x07, u8(unit_byte(0x06, local_c))) === 0x00)) {
    local_64 = local_64 - (local_64 >> 1);
    local_34 = 1;
  }

  // ── Submarine bonus (defender has submarine flag) ──
  if ((utype_byte(0x01, u8(unit_byte(0x06, local_c))) & 4) !== 0) {
    local_c4 = FUN_005b2a39(param_1);
    if (G.DAT_00654fae !== 0) {
      local_c4 = local_c4 - ((s8(utype_byte(0x06, u8(unit_byte(0x06, param_1)))) / 2) | 0);
    }
    if ((G.DAT_0064bcc8 * 2 === local_c4) &&
        (utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x00) &&
        (iVar13 = FUN_005b29aa(param_1), iVar13 === 10)) {
      local_64 = local_64 + (local_64 >> 1);
    }
  }

  // ── Bomber/stealth vs land unit bonus ──
  if ((utype_byte(0x01, u8(unit_byte(0x06, local_c))) & 0x20) !== 0 &&
      (utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x01)) {
    if ((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) === 0) {
      local_64 = local_64 * 3;
    } else {
      local_64 = local_64 * 5;
    }
  }

  // ── SAM / SDI city defense doubling ──
  if ((0 < G.DAT_006acb08) &&
      (utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x02) &&
      (utype_byte(0x05, u8(unit_byte(0x06, local_c))) !== 0x02) &&
      (iVar13 = FUN_0043d20a(G.DAT_006acb08, 0x1c), iVar13 !== 0)) {
    local_64 = local_64 << 1;
    if (param_3 !== 0) {
      local_b8 = 0x1c;
      let flags = city_int(0x04, G.DAT_006acb08);
      set_city_int(0x04, G.DAT_006acb08, flags | 0x8000000);
    }
  }

  // ── Air unit: SAM/SDI bonus and great wall ──
  if ((0 < G.DAT_006acb08) &&
      (utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x01)) {
    if (((utype_byte(0x00, u8(unit_byte(0x06, local_c))) & 0x10) === 0) ||
        ((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) !== 0)) {
      iVar13 = FUN_0043d20a(G.DAT_006acb08, 0x11);
      if ((iVar13 !== 0) &&
          ((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) !== 0) &&
          (s8(utype_byte(0x08, u8(unit_byte(0x06, param_1)))) < 99)) {
        local_64 = local_64 << 1;
        local_24 = 1;
        if (param_3 !== 0) {
          local_b8 = 0x11;
        }
      }
      iVar13 = FUN_0043d20a(G.DAT_006acb08, 0x1b);
      if (iVar13 !== 0) {
        local_64 = local_64 << 1;
        if (param_3 !== 0) {
          local_b8 = 0x1b;
        }
      }
    } else if (param_3 !== 0) {
      local_28 = 1;
    }
  }

  // ── Diplomat/spy vs zero-attack unit: 8x attack ──
  if ((unit_byte(0x06, param_1) === 0x09) &&
      (utype_byte(0x08, u8(unit_byte(0x06, local_c))) === 0x00)) {
    local_a0 = local_a0 << 3;
  }

  // ── Sea unit attacking land unit: firepower=1, defense=1 ──
  if ((utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x02) &&
      (utype_byte(0x05, u8(unit_byte(0x06, local_c))) === 0x00)) {
    local_78 = 1;
    local_34 = 1;
  }

  // ── Defender is non-combat unit: firepower=1 ──
  if ((utype_byte(0x00, u8(unit_byte(0x06, local_c))) & 8) !== 0) {
    local_34 = 1;
  }

  // ── Attacker is non-combat: play "sneak attack" effects ──
  if (((utype_byte(0x00, u8(unit_byte(0x06, param_1))) & 8) !== 0) &&
      ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) === 0)) {
    FUN_00492c15(uVar12, 0x12, uVar11, iVar10, 3);
    FUN_004933f2(uVar12, uVar11, iVar10, 0x12, 2);
  }

  // ── Defender is sea unit in city without port: firepower=1, double attack firepower ──
  if ((utype_byte(0x05, u8(unit_byte(0x06, local_c))) === 0x02) &&
      (iVar13 = FUN_005b89e4(uVar11, iVar10), iVar13 === 0) &&
      (utype_byte(0x05, u8(unit_byte(0x06, param_1))) !== 0x02)) {
    local_34 = 1;
    if (utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x01) {
      local_10 = 1;
      local_78 = local_78 << 1;
    } else {
      local_10 = 1;
      local_78 = local_78 << 1;
    }
  }

  // ── Attacker owner === 0 (barbarian) ──
  if (uVar7 === 0) {
    if ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) === 0) {
      local_a0 = (local_a0 / 2) | 0;
    } else {
      local_a0 = (G.DAT_00655b08 + 1) * local_a0;
      local_a0 = (local_a0 + (local_a0 >>> 31 & 3)) >> 2;
    }
    if (-1 < G.DAT_006acb08) {
      if (city_short(0x1C8, uVar12) < 2) {
        local_a0 = 0;
      }
      iVar13 = FUN_0043d20a(G.DAT_006acb08, 1);
      bVar18 = iVar13 !== 0;
      if (bVar18) {
        local_a0 = local_a0 >> 1;
      }
      if (city_short(0x1C8, uVar12) < 8) {
        bVar18 = true;
      }
    }
    iVar13 = FUN_00453e51(uVar12, 6);
    if (iVar13 !== 0) {
      local_a0 = (local_a0 / 2) | 0;
    }
  }

  // ── Defender owner === 0 (barbarian) ──
  if (uVar12 === 0) {
    if (((unit_byte(0x06, local_c) === 0x04) ||
        ((unit_byte(0x06, local_c) === 0x05) && ((G.DAT_00655b0b & G.DAT_00655ba9) === 0)))) {
      local_64 = (local_64 / 2) | 0;
      if (local_64 < 2) {
        local_64 = 1;
      }
    }
    iVar13 = FUN_00453e51(uVar7, 6);
    if (iVar13 !== 0) {
      local_a0 = local_a0 << 1;
    }
  }

  // ── If param_3 === 0: odds calculation only ──
  if (param_3 === 0) {
    if ((G.DAT_00655ae8 & 0x10) !== 0) {
      iVar8 = FUN_005b29d7(param_1);
      local_a0 = (iVar8 + local_78 * 8) * local_a0;
      iVar8 = FUN_005b29d7(local_c);
      local_64 = (iVar8 + local_34 * 8) * local_64;
    }
    while (3999 < local_a0) {
      local_a0 = local_a0 >> 1;
      local_64 = local_64 >> 1;
    }
    iVar8 = ((local_a0 << 3) / (local_64 + 1)) | 0;
    if (iVar8 < 0x401) {
      return iVar8;
    }
    return 0x400;
  }

  // ═══════════════════════════════════════════════════════════════
  // ACTUAL COMBAT (param_3 !== 0)
  // ═══════════════════════════════════════════════════════════════

  // ── Add movement penalty ──
  if ((G.DAT_006ad0cc & 2) !== 0) {
    set_unit_byte(0x08, param_1, unit_byte(0x08, param_1) + G.DAT_0064bcc8);
  }

  // ── Check if attacker has treaty preventing attack ──
  if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) &&
      (iVar13 = FUN_00579ed0(uVar7, uVar12, 0xd), iVar13 !== 0)) {
    return 1;
  }

  // ── Check if defender has "at war" flag ──
  if ((diplo_byte(0, uVar12, uVar7) & 8) !== 0) {
    return 1;
  }

  // ── Both nonzero civs: clear war counter ──
  if ((uVar7 !== 0) && (uVar12 !== 0)) {
    G.DAT_00655b14 = 0;
  }

  // ── Set diplomatic war status ──
  FUN_00467825(uVar7, uVar12, 0x200);

  // ── Handle sneak attack / ceasefire breaking ──
  if (((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) === 0) ||
      (((diplo_byte(0, uVar7, uVar12) & 6) === 0 &&
       ((((diplo_byte(0, uVar7, uVar12) & 1) === 0 &&
         ((diplo_byte(0, uVar12, uVar7) & 0x40) === 0)) ||
        ((diplo_byte(1, uVar7, uVar12) & 0x20) !== 0)))))) {
    // No ceasefire violation — check alliance wars
    if (((diplo_byte(0, uVar12, uVar7) & 4) !== 0) ||
        ((diplo_byte(0, uVar7, uVar12) & 4) !== 0)) {
      if (G.DAT_00655b02 < 3) {
        if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) &&
            ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) === 0)) {
          if ((diplo_byte(0, G.DAT_006d1da0, uVar12) & 8) === 0) {
            if ((diplo_byte(0, G.DAT_006d1da0, uVar7) & 8) === 0) {
              if (G.DAT_00655b07 !== 0) {
                local_30 = 1;
              }
            } else {
              local_b0 = 2;
            }
          } else {
            local_b0 = 1;
          }
        } else {
          local_30 = 1;
        }
      } else {
        // Multiplayer: check each human civ
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if ((1 << (local_18 & 0x1f) & G.DAT_00655b0b) !== 0) {
            if (uVar7 === local_18) {
              G.DAT_006acb10[local_18] = 1;
            } else if (uVar12 === local_18) {
              G.DAT_006acb10[local_18] = 1;
            } else if (G.DAT_00655b07 !== 0) {
              G.DAT_006acb10[local_18] = 1;
            }
            if (G.DAT_006acb10[local_18] !== 0) {
              local_30 = 1;
            }
          }
        }
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if ((1 << (local_18 & 0x1f) & G.DAT_00655b0b) !== 0) {
            if ((uVar12 === local_18) || ((diplo_byte(0, uVar12, local_18) & 8) === 0)) {
              if ((uVar7 !== local_18) && ((diplo_byte(0, uVar7, local_18) & 8) !== 0)) {
                G.DAT_006acae8[local_18] = 2;
                local_b0 = 2;
              }
            } else {
              G.DAT_006acae8[local_18] = 1;
              local_b0 = 1;
            }
          }
        }
      }
    }
  } else {
    // Ceasefire/peace violation
    if (4 < s8(civ_byte(0xB5, uVar7))) {
      local_6c = _rand();
      local_6c = local_6c % 100;
      if ((civ_byte(0xB5, uVar7) === 0x05) ||
          (iVar13 = FUN_00453e51(uVar7, 0x18), iVar13 !== 0)) {
        local_6c = local_6c + -0x32;
      }
      if ((-1 < (local_6c + u8(civ_byte(0xBE, uVar12)) * -10)) &&
          ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0)) {
        FUN_0055f5a3(uVar7, 1);
      }
    }
    if (((diplo_byte(0, uVar7, uVar12) & 2) === 0) ||
        ((diplo_byte(0, uVar7, uVar12) & 4) !== 0)) {
      // Simple sneak attack notification
      if ((G.DAT_00654fa8 === 0) && ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0)) {
        uVar14 = FUN_00410070(uVar7);
        FUN_0040ff60(0, uVar14);
        if (G.DAT_006d1da0 === uVar12) {
          FUN_004442e0("SNEAK", param_1);
        } else if (2 < G.DAT_00655b02) {
          FUN_00511880(0x2e, 0, 1, 0, param_1, 0);
        }
      }
    } else if ((G.DAT_00654fa8 === 0) && ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0)) {
      // Ceasefire break notification
      uVar14 = FUN_00493c7d(uVar7);
      FUN_0040ff60(0, uVar14);
      if (G.DAT_006d1da0 === uVar12) {
        FUN_004442e0("BREAKCEASE", param_1);
      } else if (2 < G.DAT_00655b02) {
        FUN_00511880(0x2d, 0, 1, 0, param_1, 0);
      }
    }
    local_a0 = local_a0 << 1;
    // Set reputation
    // *(undefined2 *)(&G.DAT_0064ca82 + uVar12 * 0x594 + uVar7 * 2) = G.DAT_00655af8;
  }

  // ── Check if war can proceed ──
  iVar13 = FUN_00579c40(uVar7, uVar12);

  // ── Difficulty-based attack modifiers ──
  if (uVar7 !== 0) {
    if ((G.DAT_00655b08 < 2) && ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0)) {
      local_a0 = local_a0 >> 1;
    }
    if ((G.DAT_00655b08 === 0) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) {
      local_a0 = local_a0 << 1;
    }
  }

  // ── Build list of human players who can see this combat ──
  bVar3 = false;
  for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
    aiStack_58[local_18] = 0;
    if (((2 < G.DAT_00655b02) || (G.DAT_006d1da0 === local_18)) &&
        ((1 << (local_18 & 0x1f) & G.DAT_00655ae8) !== 0) &&   // NOTE: original uses G.DAT_00655b0a
        ((1 << (local_18 & 0x1f) & G.DAT_00655b0b) !== 0)) {
      if (G.DAT_00655b02 < 3) {
        let _canSee = (uVar7 === local_18) || (uVar12 === local_18);
        if (!_canSee) {
          _canSee = (G.DAT_00655b07 !== 0) ||
            ((1 << (local_18 & 0x1f) & u8(unit_byte(0x09, param_1))) !== 0) ||
            (s8(unit_byte(0x07, param_1)) === (local_18 & 0xff)) ||
            ((1 << (local_18 & 0x1f) & u8(unit_byte(0x09, local_c))) !== 0);
        }
        if (!_canSee) {
          _canSee = (s8(unit_byte(0x07, local_c)) === (local_18 & 0xff));
        }
        if (!_canSee) {
          _canSee = ((G.DAT_00655af0 & 0x80) !== 0) && ((G.DAT_0064bc60 & 8) !== 0);
        }
        if (_canSee) {
          aiStack_58[local_18] = 1;
          bVar3 = true;
        }
      } else if ((uVar7 === local_18) || (uVar12 === local_18)) {
        aiStack_58[local_18] = 1;
        bVar3 = true;
      }
    }
  }

  // ── Combat animations and notifications ──
  if (bVar3) {
    FUN_005b490e(param_1, uVar12);
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if (aiStack_58[local_18] !== 0) {
        if (G.DAT_006d1da0 === local_18) {
          iVar15 = FUN_004105f8(uVar11, iVar10, uVar7);
          if (iVar15 === 0) {
            FUN_0047cea6(iVar8, iVar9);
          }
        } else {
          local_c8 = uVar12;
          if (uVar7 === local_18) {
            local_c8 = uVar7;
          }
          FUN_0046b14d(0x71, 0, uVar11, iVar10, local_c8, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x72, 0, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
        }
      }
    }
    FUN_005b5bab(param_1, 1);

    for (local_1c = 0; local_1c < 8; local_1c = local_1c + 1) {
      if ((local_1c === 0) || (city_short(0x1C4 + local_1c, 0) !== 0)) {
        FUN_0047bc59(local_c);
        FUN_0047cb26(uVar11, iVar10);
      }
    }

    if ((utype_byte(0x00, u8(unit_byte(0x06, param_1))) & 0x1008) !== 0) {
      FUN_0046e287(10);
    }

    // ── Missile attack notification ──
    if (((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) !== 0) &&
        (s8(utype_byte(0x08, u8(unit_byte(0x06, param_1)))) < 99) &&
        ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0) &&
        (iVar15 = FUN_0043d07a(uVar11, iVar10, -1, -1, -1), -1 < iVar15)) {
      FUN_0040ff60(0, 0);
      if (G.DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (G.DAT_006d1da0 === local_18) {
              FUN_004442e0("MISSILEATTACK", param_1);
            } else {
              FUN_00511880(0x2f, 0, 1, 0, param_1, 0);
            }
          }
        }
      }
    }

    // ── Pearl Harbor (surprise naval attack) notification ──
    if (local_10 !== 0) {
      uVar14 = FUN_00410070(uVar7);
      FUN_0040ff60(0, uVar14);
      FUN_004271e8(1, 0);
      uVar14 = FUN_00410070(uVar12);
      FUN_0040ff60(2, uVar14);
      if (G.DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (G.DAT_006d1da0 === local_18) {
              FUN_004442e0("PEARLHARBOR", param_1);
            } else {
              FUN_00511880(0x30, 0, 3, 0, param_1, 0);
            }
          }
        }
      }
    }

    // ── City improvement defense notifications ──
    if (local_b8 !== 0) {
      FUN_004271e8(1, 0);
      FUN_0040ff60(2, 0);
      if ((local_24 === 0) || (local_b8 === 0x11)) {
        if (G.DAT_00654fa8 === 0) {
          for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (aiStack_58[local_18] !== 0) {
              if (G.DAT_006d1da0 === local_18) {
                FUN_004cc870("BATTERY", local_b8, 8);
              } else {
                FUN_00511880(0x32, 0, 3, 0, local_b8, 0);
              }
            }
          }
        }
      } else {
        FUN_004271e8(3, 0);
        if (G.DAT_00654fa8 === 0) {
          for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (aiStack_58[local_18] !== 0) {
              if (G.DAT_006d1da0 === local_18) {
                FUN_004cc870("BATTERY2", local_b8, 8);
              } else {
                FUN_00511880(0x31, 0, 4, 0, local_b8, 0);
              }
            }
          }
        }
      }
    }

    // ── Scramble (defender air intercept) notification ──
    if (local_28 !== 0) {
      uVar14 = FUN_00493c7d(uVar12);
      FUN_0040ff60(0, uVar14);
      FUN_004271e8(1, 0);
      FUN_0040ff60(2, 0);
      if (G.DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (G.DAT_006d1da0 === local_18) {
              FUN_004442e0("SCRAMBLE", local_c);
            } else {
              FUN_00511880(0x33, 0, 3, 0, local_c, 0);
            }
          }
        }
      }
    }

    // ── Amphibious assault notification ──
    if ((utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x00) &&
        (iVar15 = FUN_005b89e4(iVar8, iVar9), iVar15 !== 0)) {
      uVar14 = FUN_00410070(uVar7);
      FUN_0040ff60(1, uVar14);
      FUN_004271e8(2, 0);
      if (G.DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (G.DAT_006d1da0 === local_18) {
              FUN_004442e0("AMPHIBMOTIZE", param_1);
            } else {
              FUN_00511880(0x34, 0, 3, 0, param_1, 0);
            }
          }
        }
      }
    }

    // ── Play combat sounds ──
    local_ac = 0;
    bVar6 = unit_byte(0x06, param_1);
    G.DAT_0066bfc4 = -1;
    G.DAT_0066bfc0 = 0xffffffff;

    // Unit type-based combat sound selection
    if (bVar6 === 0x36) { FUN_0046e020(0x7d, 1, 0, 0); }
    else if (bVar6 === 0x37) { FUN_0046e020(0x7e, 1, 0, 0); }
    else if (bVar6 === 0x38) { FUN_0046e020(0x7f, 1, 0, 0); }
    else if (bVar6 === 0x39) { FUN_0046e020(0x80, 1, 0, 0); }
    else if (bVar6 === 0x3a) { FUN_0046e020(0x81, 1, 0, 0); }
    else if (bVar6 === 0x3b) { FUN_0046e020(0x82, 1, 0, 0); }
    else if (bVar6 === 0x3c) { FUN_0046e020(0x83, 1, 0, 0); }
    else if (bVar6 === 0x3d) { FUN_0046e020(0x84, 1, 0, 0); }
    else if (bVar6 === 0x33) { FUN_0046e020(0x65, 1, 0, 0); }
    else if (bVar6 === 0x34) { FUN_0046e020(0x66, 1, 0, 0); }
    else if (bVar6 === 0x35) { FUN_0046e020(0x67, 1, 0, 0); }
    else if ((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) === 0) {
      if (utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x01) {
        if (utype_byte(0x05, u8(unit_byte(0x06, local_c))) === 0x01) {
          if (u8(unit_byte(0x06, param_1)) < 0x1e) {
            FUN_0046e020(0, 0, 0, 0);
          } else {
            FUN_0046e020(0x52, 0, 0, 0);
          }
        } else if (utype_byte(0x07, u8(unit_byte(0x06, param_1))) === 0x00) {
          FUN_0046e020(0x21, 1, 0, 0);
        } else if (u8(unit_byte(0x06, param_1)) < 0x1e) {
          FUN_0046e020(0x18, 1, 0, 0);
        } else {
          FUN_0046e020(0x50, 1, 0, 0);
        }
      } else if (utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x02) {
        if ((utype_byte(0x00, u8(unit_byte(0x06, param_1))) & 8) === 0) {
          local_ac = 6;
          if (((bVar6 === 0x28) || (bVar6 === 0x26)) || ((bVar6 === 0x27 || (bVar6 === 0x25)))) {
            local_ac = 0x2e;
          }
        } else {
          FUN_0046e020(0x4d, 1, 0, 0);
        }
      } else if (bVar6 === 0x11) {
        FUN_0046e020(0x19, 1, 0, 0);
      } else if ((((bVar6 === 0x0f) || (bVar6 === 0x10)) || (bVar6 === 0x13)) || (bVar6 === 0x12)) {
        FUN_0046e020(0x4a, 1, 0, 0);
      } else if ((bVar6 === 0x14) || (bVar6 === 0x15)) {
        FUN_0046e020(0x0c, 1, 0, 0);
      } else if (((bVar6 === 7) || (bVar6 === 0x0b)) || ((bVar6 === 10 || (bVar6 === 9)))) {
        FUN_0046e020(0x22, 1, 0, 0);
      } else if ((((bVar6 === 8) || (bVar6 === 0x0d)) || (bVar6 === 0x0c)) || (bVar6 === 0x0e)) {
        FUN_0046e020(0x26, 1, 0, 0);
      } else if ((bVar6 < 0x16) || (0x1a < bVar6)) {
        FUN_0046e020(0x49, 1, 0, 0);
      } else if (bVar6 === 0x17) {
        FUN_0046e020(10, 1, 0, 0);
      } else {
        local_ac = 0x28;
        if (0x17 < bVar6) {
          FUN_0046e020(0x1c, 1, 0, 0);
          FUN_0046e287(0x14);
        }
      }
    } else if (s8(utype_byte(0x08, u8(unit_byte(0x06, param_1)))) < 99) {
      FUN_0046e020(0x29, 1, 0, 0);
    }

    // ── Set combat globals and send MP notifications ──
    G.DAT_00633e48 = local_c;
    G.DAT_00633e40 = uVar11;
    G.DAT_00633e44 = iVar10;

    if (2 < G.DAT_00655b02) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          FUN_0046b14d(0x9a, 0, G.DAT_0066bfc4, G.DAT_0066bfc0, 0, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x70, 0, param_1, iVar8, iVar9, param_2, G.DAT_00633e48, 0, 0, 0);
        }
      }
    }

    // ── Combat animation ──
    FUN_0056c705(param_1, iVar8, iVar9, param_2, -1, -1);
    FUN_005b3ae0(param_1, iVar8, iVar9, 0);
    FUN_005802fd(uVar11, iVar10, iVar8, iVar9);

    if (2 < G.DAT_00655b02) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          FUN_0046b14d(0x73, 0, uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Suicide / nuclear unit handling
  // ═══════════════════════════════════════════════════════════════

  if (s8(utype_byte(0x08, u8(unit_byte(0x06, param_1)))) > 98) {
    G.DAT_00633e48 = -1;
    iVar13 = FUN_0057f9e3(uVar7, uVar11, iVar10, 1);
    if (iVar13 === 0) {
      FUN_005b4391(param_1, 1);
      FUN_0047cea6(iVar8, iVar9);
      if (2 < G.DAT_00655b02) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
            FUN_0046b14d(0x72, 0, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
          }
        }
      }
    } else {
      // Failed to nuke — reset war counter
      set_civ_byte(0xF0 - 0xC0, uVar7, 0); // (&G.DAT_0064c6f0)[uVar7 * 0x594 + uVar12]
    }
    if (((iVar13 !== 0) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0)) && (-1 < G.DAT_006acb08)) {
      FUN_0057febc(uVar7, uVar11, iVar10);
    }
    return 0;
  }

  // ═══════════════════════════════════════════════════════════════
  // ROUND-BY-ROUND COMBAT LOOP
  // ═══════════════════════════════════════════════════════════════

  bVar4 = false;
  if ((local_78 === 0) && (local_34 === 0)) {
    local_c0 = 0;
  } else {
    if ((s8(utype_byte(0x0A, u8(unit_byte(0x06, local_c)))) < 0x1e) &&
        (s8(utype_byte(0x0A, u8(unit_byte(0x06, param_1)))) < 0x1e)) {
      local_cc = 1;
    } else {
      local_cc = 0;
    }
    local_2c = 10 >> local_cc;

    // ── Missile units: no round-by-round, instant resolution ──
    if ((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) !== 0) {
      local_2c = 0;
      bVar4 = false;
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if (aiStack_58[local_18] !== 0) {
          if (G.DAT_006d1da0 === local_18) {
            FUN_0057ed3f(uVar11, iVar10, local_ac);
          } else {
            FUN_0046b14d(0x7c, 0, uVar11, iVar10, local_ac, 0, 0, 0, 0, 0);
          }
        }
      }
    }

    // ── Main combat loop ──
    let combatLoopDone = false;
    do {
      // Inner attacker-wins loop
      let innerBreak = false;
      while (true) {
        iVar15 = FUN_005b29d7(param_1);
        if ((iVar15 === 0) || (iVar15 = FUN_005b29d7(local_c), iVar15 === 0)) {
          local_c0 = FUN_005b29d7(param_1);
          combatLoopDone = true;
          break;
        }
        // Attacker roll
        if (local_a0 === 1 || local_a0 - 1 < 0) {
          local_d0 = 0;
        } else {
          local_d0 = _rand() % local_a0;
        }
        // Defender roll
        if (local_64 === 1 || local_64 - 1 < 0) {
          local_d4 = 0;
        } else {
          local_d4 = _rand() % local_64;
        }
        local_c0 = (local_d4 < local_d0) ? 1 : 0;

        // ── Second chance for veteran defenders ──
        if ((bVar18) && (local_c0 !== 0)) {
          if (local_a0 === 1 || local_a0 - 1 < 0) {
            local_d8 = 0;
          } else {
            local_d8 = _rand() % local_a0;
          }
          if (local_64 === 1 || local_64 - 1 < 0) {
            local_dc = 0;
          } else {
            local_dc = _rand() % local_64;
          }
          if (local_d8 < local_dc) {
            local_c0 = 0;
          }
        }

        if (local_c0 === 0) {
          innerBreak = true;
          break;
        }

        // ── Attacker wins this round: damage defender ──
        bVar6 = unit_byte(0x0A, local_c);
        set_unit_byte(0x0A, local_c, unit_byte(0x0A, local_c) + s8(local_78));

        // ── Combat animation for damage tick ──
        if ((bVar3) && (local_2c !== 0) &&
            (Math.floor(u8(unit_byte(0x0A, local_c)) / local_2c) !==
             Math.floor(u8(bVar6) / local_2c))) {
          bVar4 = true;
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (aiStack_58[local_18] !== 0) {
              if (G.DAT_006d1da0 === local_18) {
                FUN_0057ed3f(uVar11, iVar10, local_ac);
                iVar15 = FUN_005b29d7(local_c);
                if (iVar15 !== 0) {
                  FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
                }
              } else {
                FUN_0046b14d(0x7c, 0, uVar11, iVar10, local_ac, 0, 0, 0, 0, 0);
                iVar15 = FUN_005b29d7(local_c);
                if (iVar15 !== 0) {
                  FUN_0046b14d(0x73, 0, uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
                }
              }
            }
          }
        }
        if ((G.DAT_00655ae8 & 0x10) === 0) {
          combatLoopDone = true;
          break;
        }
      }

      if (combatLoopDone) break;
      if (!innerBreak) continue;

      // ── Defender wins this round: damage attacker ──
      bVar6 = unit_byte(0x0A, param_1);
      set_unit_byte(0x0A, param_1, unit_byte(0x0A, param_1) + s8(local_34));

      // ── Combat animation for attacker damage ──
      if ((bVar3) && (local_2c !== 0) &&
          (Math.floor(u8(unit_byte(0x0A, param_1)) / local_2c) !==
           Math.floor(u8(bVar6) / local_2c))) {
        bVar4 = true;
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (G.DAT_006d1da0 === local_18) {
              FUN_0057ed3f(iVar8, iVar9, local_ac);
              iVar15 = FUN_005b29d7(param_1);
              if (iVar15 !== 0) {
                FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
              }
            } else {
              FUN_0046b14d(0x7c, 0, iVar8, iVar9, local_ac, 0, 0, 0, 0, 0);
              iVar15 = FUN_005b29d7(param_1);
              if (iVar15 !== 0) {
                FUN_0046b14d(0x73, 0, uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
              }
            }
          }
        }
      }
    } while ((G.DAT_00655ae8 & 0x10) !== 0);
  }

  // ═══════════════════════════════════════════════════════════════
  // POST-COMBAT: determine winner
  // ═══════════════════════════════════════════════════════════════

  // local_c0: 0 = defender wins, nonzero = attacker wins

  if (local_c0 === 0) {
    G.DAT_0062c5bc = 1;
  }

  // ── Post-combat sound selection ──
  if (bVar3) {
    G.DAT_0066bfc4 = -1;
    if ((((local_c0 === 0) ||
         (utype_byte(0x05, u8(unit_byte(0x06, local_c))) !== 0x01)) ||
        (-1 < G.DAT_006acb08)) &&
       (((local_c0 !== 0 ||
         (utype_byte(0x05, u8(unit_byte(0x06, param_1))) !== 0x01)) ||
        ((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) !== 0)))) {
      if (local_ac !== 0) {
        FUN_0046e020(0x23, 1, 0, 0);
      }
    } else if (local_c0 === 0) {
      if (u8(unit_byte(0x06, param_1)) < 0x1e) {
        FUN_0046e020(0x17, 1, 0, 0);
      } else {
        FUN_0046e020(0x4f, 1, 0, 0);
      }
    } else {
      if (u8(unit_byte(0x06, local_c)) < 0x1e) {
        FUN_0046e020(0x17, 1, 0, 0);
      } else {
        FUN_0046e020(0x4f, 1, 0, 0);
      }
    }

    // ── MP: send combat result sound ──
    if ((2 < G.DAT_00655b02) && (G.DAT_0066bfc4 !== -1)) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          FUN_0046b14d(0x7a, 0, G.DAT_0066bfc4, G.DAT_0066bfc0, 0, 0, 0, 0, 0, 0);
        }
      }
    }
  }

  FUN_004b0b53(0xff, 2, 0, 0, 0);

  // ── Post-combat visual update ──
  if (bVar3) {
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if (aiStack_58[local_18] !== 0) {
        if (G.DAT_006d1da0 === local_18) {
          FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
          if (local_c0 === 0) {
            if (!bVar4) {
              FUN_0057ed3f(iVar8, iVar9, 0);
            }
          } else if (!bVar4) {
            FUN_0057ed3f(uVar11, iVar10, 0);
          }
        } else {
          FUN_0046b14d(0x73, 0, uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
          if (local_c0 === 0) {
            if (!bVar4) {
              FUN_0046b14d(0x7c, 0, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
            }
          } else if (!bVar4) {
            FUN_0046b14d(0x7c, 0, uVar11, iVar10, 0, 0, 0, 0, 0, 0);
          }
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // HANDLE UNIT DEATH AND VETERAN PROMOTION
  // ═══════════════════════════════════════════════════════════════

  G.DAT_00633e48 = -1;
  G.DAT_006acb0c = 0;

  if (local_c0 === 0) {
    // ── Defender wins: attacker dies ──
    // Increment war counter
    // (&G.DAT_0064c6f0)[uVar7 * 0x594 + uVar12] += 1

    // Veteran promotion chance for defender
    if (local_64 + local_a0 === 1 || local_64 + local_a0 - 1 < 0) {
      local_e4 = 0;
    } else {
      local_e4 = _rand() % (local_64 + local_a0);
    }
    if ((local_e4 <= local_a0) || (iVar15 = FUN_00453e51(uVar12, 7), iVar15 !== 0)) {
      FUN_0057ebfd(local_c);
    }
  } else {
    // ── Attacker wins: defender dies ──
    // Reset war counter
    // (&G.DAT_0064c6f0)[uVar7 * 0x594 + uVar12] = 0

    // Veteran promotion chance for attacker
    if (local_64 + local_a0 === 1 || local_64 + local_a0 - 1 < 0) {
      local_e0 = 0;
    } else {
      local_e0 = _rand() % (local_64 + local_a0);
    }
    if ((local_e0 <= local_64) || (iVar15 = FUN_00453e51(uVar7, 7), iVar15 !== 0)) {
      FUN_0057ebfd(param_1);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // HANDLE UNIT REMOVAL AND MOVEMENT
  // ═══════════════════════════════════════════════════════════════

  if (local_c0 === 0) {
    // ── Defender wins ──
    local_20 = uVar12;
    FUN_005b5bab(param_1, 1);
    FUN_0057eb94(param_1, local_c, local_8, local_14);
    local_60 = uVar7;
  } else {
    // ── Attacker wins ──
    if ((uVar12 === 0) &&
        (s8(utype_byte(0x0E, u8(unit_byte(0x06, local_c)))) > 4)) {
      bVar5 = true;
    }
    local_20 = uVar7;
    if (((G.DAT_006acb08 < 0) &&
        (bVar6 = FUN_005b94d5(uVar11, iVar10), (bVar6 & 0x42) !== 0x40)) &&
        (iVar15 = FUN_005b8d15(uVar11, iVar10), iVar15 < 0)) {
      FUN_0057eb94(local_c, param_1, local_8, local_14);
    } else {
      FUN_0057e9f9(local_c, param_1, local_8, local_14);
    }

    iVar15 = G.DAT_006acb08;
    local_60 = uVar12;

    // ── City capture logic ──
    if (-1 < G.DAT_006acb08) {
      let cityFlags = city_int(0x04, G.DAT_006acb08);
      set_city_int(0x04, G.DAT_006acb08, cityFlags | 0x20);

      iVar16 = FUN_005b89e4(iVar8, iVar9);
      if (((iVar16 === 0) && (iVar16 = FUN_0043d20a(iVar15, 8), iVar16 === 0)) &&
          ((iVar16 = FUN_00453e51(uVar12, 6), iVar16 === 0 &&
           ((G.DAT_00655b08 !== 0 || ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) === 0)))))) {
        // Reduce city size
        set_city_byte(0x09, iVar15, s8(city_byte(0x09, iVar15)) - 1);
        if (city_byte(0x09, iVar15) === 0) {
          // City destroyed
          FUN_thunk_delete_city(iVar15, 0);
          for (local_bc = 1; local_bc < 8; local_bc = local_bc + 1) {
            FUN_005b8b1a(uVar11, iVar10, local_bc);
          }
          FUN_0047cf22(uVar11, iVar10);
          iVar16 = FUN_thunk_kill_civ(uVar12, uVar7);
          if (iVar16 !== 0) {
            local_30 = 0;
            for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
              G.DAT_006acb10[local_18] = 0;
            }
          }
        } else {
          // City shrinks
          FUN_0043cc00(iVar15, uVar7);
          iVar16 = FUN_005b8d62(uVar11, iVar10);
          if ((iVar16 < 0) && ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) === 0)) {
            uVar14 = FUN_005b8a81(uVar11, iVar10);
            FUN_00442541(uVar12, uVar14);
          }
        }
      }
      iVar16 = FUN_005b8d62(uVar11, iVar10);
      if ((iVar16 < 0) && ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0)) {
        FUN_005369f3(iVar15);
      }
    }
  }

  // ── Refresh display ──
  FUN_004b0b53(0xff, 2, 0, 0, 0);
  if (bVar3) {
    if (2 < G.DAT_00655b02) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          FUN_0046b14d(0x73, 0, uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
        }
      }
    }
    FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
  }

  // ── Multiple unit loss dialog ──
  if ((G.DAT_00654fa8 === 0) && (1 < G.DAT_006acb0c)) {
    FUN_00421da0(0, G.DAT_006acb0c);
    if (G.DAT_006d1da0 === local_60) {
      FUN_00421ea0("MULTIPLELOSE");
    } else if (G.DAT_006d1da0 === local_20) {
      FUN_00421ea0("MULTIPLEWIN");
    }
    if (((G.DAT_00655b02 < 3) || ((1 << (local_60 & 0x1f) & G.DAT_00655b0b) === 0)) ||
        (G.DAT_006d1da0 === local_60)) {
      if (((2 < G.DAT_00655b02) && ((1 << (local_20 & 0x1f) & G.DAT_00655b0b) !== 0)) &&
          (G.DAT_006d1da0 !== local_20)) {
        FUN_00511880(0x36, 0, 0, 1, 0, 0);
      }
    } else {
      FUN_00511880(0x35, 0, 0, 1, 0, 0);
    }
  }

  // ── Barbarian ransom ──
  if (bVar5) {
    uVar17 = ((G.DAT_00655b09 * 100) / 2) >>> 0;
    // Add gold
    // *(int *)(&G.DAT_0064c6a2 + uVar7 * 0x594) += uVar17;
    FUN_00421da0(0, uVar17);
    if ((G.DAT_006d1da0 === uVar7) && (G.DAT_00654fa8 === 0)) {
      FUN_004442a0("RANSOM", 0x3e, 0);
      FUN_00569363(1);
    } else if ((2 < G.DAT_00655b02) && (G.DAT_00654fa8 === 0)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((aiStack_58[local_18] !== 0) && (G.DAT_006d1da0 !== local_18)) {
          FUN_00511880(0x37, 0, 1, 0, 0x3e, 0);
          FUN_0046b14d(0x78, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      }
    }
  }

  // ── Update war/peace tracking ──
  if (iVar13 !== 0) {
    FUN_0045a8e3(uVar12, uVar7);
  }

  // ── Alliance notifications ──
  if ((G.DAT_00654fa8 === 0) && ((local_30 !== 0 || (local_b0 !== 0)))) {
    uVar14 = FUN_00493c7d(uVar12);
    FUN_0040ff60(0, uVar14);
    uVar14 = FUN_00493c7d(uVar7);
    FUN_0040ff60(1, uVar14);
    if (G.DAT_00655b02 < 3) {
      if (local_30 === 0) {
        if (local_b0 === 1) {
          FUN_00421ea0("ALLYUNDERATTACK");
          FUN_0045b0d6(uVar12, uVar7);
        } else {
          FUN_00421ea0("ALLYATTACKING");
        }
      } else {
        FUN_00421ea0("CANCELPEACE");
      }
    } else if (G.DAT_00654fa8 === 0) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if (G.DAT_006acb10[local_18] !== 0) {
          if (G.DAT_006d1da0 === local_18) {
            FUN_00421ea0("CANCELPEACE");
          } else {
            FUN_00511880(0x3a, 0, 2, 0, 0, 0);
          }
        }
        if ((G.DAT_006acae8[local_18] !== 0) && (G.DAT_00654fa8 === 0)) {
          if (G.DAT_006d1da0 === local_18) {
            if (G.DAT_006acae8[local_18] === 1) {
              FUN_00421ea0("ALLYUNDERATTACK");
              FUN_0045b0d6(uVar12, uVar7);
            } else {
              FUN_00421ea0("ALLYATTACKING");
            }
          } else if (G.DAT_006acae8[local_18] === 1) {
            FUN_00511880(0x3b, 0, 2, 0, 0, 0);
            if ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) === 0) {
              FUN_0046b14d(0x7e, 0, uVar12, uVar7, 0, 0, 0, 0, 0, 0);
            }
          } else {
            FUN_00511880(0x3c, 0, 2, 0, 0, 0);
          }
        }
      }
    }
  }

  FUN_00436287(2);
  if (2 < G.DAT_00655b02) {
    FUN_0046b14d(0x7f, 0xff, 2, 0, 0, 0, 0, 0, 0, 0);
  }

  // ═══════════════════════════════════════════════════════════════
  // POST-COMBAT UNIT MOVEMENT / CLEANUP
  // ═══════════════════════════════════════════════════════════════

  if (local_c0 === 0) {
    local_38 = 0;
  } else {
    iVar13 = G.DAT_00655b00;
    if ((utype_byte(0x05, u8(unit_byte(0x06, iVar13 * 0x20))) === 0x01) &&
        (utype_byte(0x07, u8(unit_byte(0x06, iVar13 * 0x20))) !== 0x01)) {
      FUN_005b6787(iVar13);
    }

    if ((((local_c0 === 0) || ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) ||
        (G.DAT_006acb08 < 0)) || (iVar15 = FUN_005b2e69(uVar11, iVar10), -1 < iVar15)) {
      if ((local_c0 !== 0) &&
          ((utype_byte(0x01, u8(unit_byte(0x06, iVar13 * 0x20))) & 0x10) !== 0)) {
        FUN_005b4391(iVar13, 1);
        local_38 = 0;
      }
    } else {
      if ((utype_byte(0x01, u8(unit_byte(0x06, iVar13 * 0x20))) & 0x10) === 0) {
        if (((utype_byte(0x05, u8(unit_byte(0x06, iVar13 * 0x20))) === 0x01) &&
            (utype_byte(0x07, u8(unit_byte(0x06, iVar13 * 0x20))) !== 0x00)) &&
            (set_unit_byte(0x0D, iVar13 * 0x20, unit_byte(0x0D, iVar13 * 0x20) + 1),
             s8(utype_byte(0x07, u8(unit_byte(0x06, iVar13 * 0x20)))) <=
             s8(unit_byte(0x0D, iVar13 * 0x20)))) {
          // Air unit ran out of fuel — falls from sky
          // goto LAB_00583d2b (handled below as local_38 stays 1)
        } else {
          // Normal post-combat cleanup
          FUN_0057febc(uVar7, uVar11, iVar10);
          local_38 = 0;
        }
      } else {
        FUN_005b4391(iVar13, 1);
        FUN_0047cf22(iVar8, iVar9);
        FUN_0057febc(uVar7, uVar11, iVar10);
        local_38 = 0;
      }
    }
  }

  // LAB_00583d2b:
  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if ((G.DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
        FUN_0046b14d(0xa3, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        FUN_0046b14d(0x75, 0, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
      }
    }
  }

  return local_38;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005866a0 — focus_and_refresh_cosmic_editor
// Source: block_00580000.c @ 0x005866A0, 51 bytes
// Win32 UI — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_005866a0() {
  // HWND hWnd = thunk_FUN_00418770(); SetFocus(hWnd);
  FUN_00586eb0();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005866d3 — swap_cosmic_parameters
// Source: block_00580000.c @ 0x005866D3, 769 bytes
// Copies cosmic parameters between G.DAT_006a2d80 and G.DAT_006a2d28 arrays
// ═══════════════════════════════════════════════════════════════════

export function FUN_005866d3() {
  for (let i = 0; i < 22; i++) {
    G.DAT_006a2d80[i] = G.DAT_0064bcc8; // simplified — original copies individual bytes
  }
  FUN_00419d23();
  for (let i = 0; i < 22; i++) {
    G.DAT_006a2d28[i] = G.DAT_0064bcc8; // simplified
  }
  // Copy back — simplified from original byte-by-byte copy
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005869d4 — show_edit_cosmic_dialog
// Source: block_00580000.c @ 0x005869D4, 482 bytes
// UI dialog for editing cosmic parameters — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_005869d4() {
  // Debug cosmic editor — UI only, no-op in transpilation
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00586bb6 — edit_cosmic_parameter
// Source: block_00580000.c @ 0x00586BB6, 340 bytes
// UI for editing a single cosmic parameter — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_00586bb6() {
  // Debug cosmic parameter edit — UI only, no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00586d0a — write_cosmic_to_file
// Source: block_00580000.c @ 0x00586D0A, 151 bytes
// File I/O for cosmic parameters — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_00586d0a(param_1, param_2) {
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// show_messagebox_6DA1 — show_cosmic_save_error
// Source: block_00580000.c @ 0x00586DA1, 131 bytes
// Win32 MessageBox — stubbed
// ═══════════════════════════════════════════════════════════════════

export function show_messagebox_6DA1() {
  // Win32 UI stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00586e24 — show_effects_dialog
// Source: block_00580000.c @ 0x00586E24, 100 bytes
// UI stub
// ═══════════════════════════════════════════════════════════════════

export function FUN_00586e24() {
  // UI dialog stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00586e88 — close_cosmic_editor
// Source: block_00580000.c @ 0x00586E88, 40 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00586e88() {
  G.DAT_006a1d7c = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00586eb0 — init_cosmic_editor_view
// Source: block_00580000.c @ 0x00586EB0, 102 bytes
// UI setup — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_00586eb0() {
  // UI stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00586f16 — cosmic_editor_main
// Source: block_00580000.c @ 0x00586F16, 1731 bytes
// Main cosmic parameter editor window — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_00586f16() {
  // Cosmic editor main — UI only, no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005875e9 — cleanup_cosmic_1
// Source: block_00580000.c @ 0x005875E9, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_005875e9() {
  FUN_005c656b();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005875ff — cleanup_cosmic_2 (SEH unwind)
// Source: block_00580000.c @ 0x005875FF, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_005875ff() {
  // SEH unwind — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058760d — open_cosmic_editor_wrapper
// Source: block_00580000.c @ 0x0058760D, 89 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058760d() {
  FUN_00586f16();
  FUN_005bb574();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00587666 — destroy_cosmic_frame
// Source: block_00580000.c @ 0x00587666, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00587666() {
  // thunk_FUN_004183d0() — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058767c — SEH unwind
// Source: block_00580000.c @ 0x0058767C, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058767c() {
  // SEH unwind — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00587a90 — setup_city_list_panel
// Source: block_00580000.c @ 0x00587A90, 849 bytes
// UI setup — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_00587a90(param_1, param_2, param_3) {
  // City list panel setup — UI only
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00587e05 — scroll_city_list_0
// Source: block_00580000.c @ 0x00587E05, 30 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00587e05(param_1) {
  FUN_0058804f(0, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00587e23 — scroll_city_list_1
// Source: block_00580000.c @ 0x00587E23, 30 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00587e23(param_1) {
  FUN_0058804f(1, param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00587e41 — toggle_city_list_filter
// Source: block_00580000.c @ 0x00587E41, 191 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00587e41() {
  // UI toggle — stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00587f00 — toggle_city_list_filter_2
// Source: block_00580000.c @ 0x00587F00, 191 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00587f00() {
  // UI toggle — stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00587fbf — request_city_status
// Source: block_00580000.c @ 0x00587FBF, 144 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00587fbf() {
  // MP city status request — stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058804f — set_city_list_scroll
// Source: block_00580000.c @ 0x0058804F, 97 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058804f(param_1, param_2) {
  // City list scroll — UI stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_005880b0 — handle_city_list_click
// Source: block_00580000.c @ 0x005880B0, 637 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_005880b0(param_1) {
  // City list click handler — UI stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058832d — city_list_hit_test
// Source: block_00580000.c @ 0x0058832D, 274 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058832d(param_1, param_2, param_3) {
  return -1; // stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058843f — sort_city_list
// Source: block_00580000.c @ 0x0058843F, 847 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058843f(param_1, param_2, param_3) {
  // City list sorting — UI stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058878e — render_city_list
// Source: block_00580000.c @ 0x0058878E, 1721 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058878e(param_1) {
  // City list rendering — UI stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00588e47 — render_city_list_entry
// Source: block_00580000.c @ 0x00588E47, 239 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00588e47(param_1, param_2, param_3, param_4, param_5, param_6) {
  // City list entry rendering — UI stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00588f36 — populate_city_list
// Source: block_00580000.c @ 0x00588F36, 1138 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00588f36(param_1, param_2) {
  // City list population — UI stub
}


// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31 (at 0x005899F0) — static initializer
// Source: block_00580000.c @ 0x005899F0, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FID_conflict___E31_5899F0() {
  FUN_00589a0a();
  FUN_00589a24();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589a0a — static_init_A
// Source: block_00580000.c @ 0x00589A0A, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589a0a() {
  FUN_005bd630();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589a24 — register_atexit_A
// Source: block_00580000.c @ 0x00589A24, 29 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589a24() {
  // _atexit(FUN_00589a41) — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589a41 — atexit_handler_A
// Source: block_00580000.c @ 0x00589A41, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589a41() {
  FUN_005bd915();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589a5b — app_startup
// Source: block_00580000.c @ 0x00589A5B, 505 bytes
// Application startup — stubbed (Win32 window creation, art loading)
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589a5b() {
  // App startup — no-op in JS transpilation
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589c54 — cleanup_startup_1
// Source: block_00580000.c @ 0x00589C54, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589c54() {
  FUN_005c656b();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589c6a — cleanup_startup_2 (SEH)
// Source: block_00580000.c @ 0x00589C6A, 15 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589c6a() { /* SEH unwind */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_00589c79 — shutdown_app
// Source: block_00580000.c @ 0x00589C79, 36 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589c79() {
  G.DAT_00634718 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589d50 — init_startup_helper
// Source: block_00580000.c @ 0x00589D50, 37 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589d50() {
  // FUN_005bc9d3 — no-op
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589d80 — register_callback
// Source: block_00580000.c @ 0x00589D80, 69 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589d80(param_1) {
  let local_8 = -1;
  if (G.DAT_00634768 < 10) {
    local_8 = G.DAT_00634768;
    G.DAT_00634768 = G.DAT_00634768 + 1;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589dc5 — read_warning_file
// Source: block_00580000.c @ 0x00589DC5, 297 bytes
// File I/O — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589dc5(param_1) {
  // File I/O stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589ef8 — report_error
// Source: block_00580000.c @ 0x00589EF8, 209 bytes
// Error reporting — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589ef8(param_1, param_2, param_3, param_4, param_5) {
  // Error reporting stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00589fc9 — lookup_error_string
// Source: block_00580000.c @ 0x00589FC9, 278 bytes
// File I/O for error lookup — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_00589fc9(param_1, param_2, param_3) {
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058a0ee — fatal_error_handler
// Source: block_00580000.c @ 0x0058A0EE, 778 bytes
// Error handling with DebugBreak — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058a0ee(param_1, param_2, param_3, param_4) {
  // Fatal error — would call DebugBreak() + _exit(3)
  throw new Error('Fatal error in Civ2 binary');
}


// ═══════════════════════════════════════════════════════════════════
// FID_conflict___E31 (at 0x0058A5B0) — static initializer 2
// Source: block_00580000.c @ 0x0058A5B0, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FID_conflict___E31_58A5B0() {
  FUN_0058a5ca();
  FUN_0058a5e4();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058a5ca — static_init_B
// Source: block_00580000.c @ 0x0058A5CA, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058a5ca() {
  FUN_0055339f();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0058a5e4 — register_atexit_B
// Source: block_00580000.c @ 0x0058A5E4, 29 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058a5e4() { /* _atexit stub */ }

// ═══════════════════════════════════════════════════════════════════
// FUN_0058a601 — atexit_handler_B
// Source: block_00580000.c @ 0x0058A601, 26 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058a601() { /* destructor stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058a61b — setup_dialog_window
// Source: block_00580000.c @ 0x0058A61B, 498 bytes
// Dialog setup — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058a61b(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  // Dialog window creation — UI stub
}


// ═══════════════════════════════════════════════════════════════════
// show_messagebox_A80D — copy_file
// Source: block_00580000.c @ 0x0058A80D, 248 bytes
// File copy utility — stubbed
// ═══════════════════════════════════════════════════════════════════

export function show_messagebox_A80D(param_1, param_2) {
  // File copy — stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058a905 — import_sound_file
// Source: block_00580000.c @ 0x0058A905, 709 bytes
// Sound import dialog — stubbed
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058a905(param_1) {
  // Sound import — UI stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058abca — cleanup_sound_import_1
// Source: block_00580000.c @ 0x0058ABCA, 12 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058abca() { /* cleanup stub */ }

// ═══════════════════════════════════════════════════════════════════
// FUN_0058abe0 — cleanup_sound_import_2 (SEH)
// Source: block_00580000.c @ 0x0058ABE0, 14 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058abe0() { /* SEH unwind */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058abee — invalidate_sound_editor_1
// Source: block_00580000.c @ 0x0058ABEE, 37 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058abee() {
  G.DAT_006acd50 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058ac13 — invalidate_sound_editor_2
// Source: block_00580000.c @ 0x0058AC13, 37 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058ac13() {
  G.DAT_006acd50 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058ac38 — render_sound_editor
// Source: block_00580000.c @ 0x0058AC38, 488 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058ac38() { /* UI rendering stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058ae20 — rect_contains_point
// Source: block_00580000.c @ 0x0058AE20, 76 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058ae20(param_1, param_2, param_3, param_4, param_5, param_6) {
  if (((param_1 < param_3) || (param_5 < param_1)) || (param_2 < param_4) || (param_6 < param_2)) {
    return 0;
  }
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058ae6c — sound_editor_click
// Source: block_00580000.c @ 0x0058AE6C, 330 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058ae6c(param_1, param_2) { /* UI click stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058afb6 — populate_sound_slots
// Source: block_00580000.c @ 0x0058AFB6, 1224 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058afb6(param_1) { /* sound slot population — UI stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058b47e — open_sound_editor_dialog
// Source: block_00580000.c @ 0x0058B47E, 987 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058b47e(param_1, param_2) { /* sound editor dialog — UI stub */ }

export function FUN_0058b859() { /* destructor iterator — no-op */ }
export function FUN_0058b86f() { /* destructor — no-op */ }
export function FUN_0058b87b() { /* destructor — no-op */ }
export function FUN_0058b88e() { /* SEH unwind */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058bd60 — activate_unit_sentry
// Source: block_00580000.c @ 0x0058BD60, 36 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058bd60() {
  FUN_0059062c(G.DAT_00655afe, -1, 3);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058bd84 — wake_all_own_units
// Source: block_00580000.c @ 0x0058BD84, 121 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058bd84() {
  for (let local_8 = 0; local_8 < G.DAT_00655b16; local_8 = local_8 + 1) {
    if ((unit_int(0x1A, local_8) !== 0) &&
        (s8(unit_byte(0x07, local_8)) === G.DAT_006d1da0)) {
      FUN_005b6787(local_8);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058bdfd — set_unit_no_orders
// Source: block_00580000.c @ 0x0058BDFD, 89 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058bdfd() {
  let v = unit_ushort(0x04, G.DAT_00655afe);
  set_unit_ushort(0x04, G.DAT_00655afe, v | 0x4000);
  G.DAT_0062804c = 0;
  // G.DAT_00628054 = 0;
  FUN_0041033a();
  FUN_00489859(0);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058be56 — build_city_command
// Source: block_00580000.c @ 0x0058BE56, 1087 bytes
// Player command to build a city with a settler — stubbed (UI-heavy)
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058be56() { /* build city command — UI stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058c295 — disband_unit_command
// Source: block_00580000.c @ 0x0058C295, 722 bytes
// Player command to disband a unit — stubbed (UI-heavy)
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058c295() { /* disband command — UI stub */ }


// NOTE: FUN_0058c56c (check_adjacent_water) is already in fn_utils.js


// ═══════════════════════════════════════════════════════════════════
// FUN_0058c65e — settler_worker_order
// Source: block_00580000.c @ 0x0058C65E, 1411 bytes
// Handle settler/engineer build orders — stubbed (UI-heavy)
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058c65e(param_1) { /* settler order — UI stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058cbe1 — assign_home_city
// Source: block_00580000.c @ 0x0058CBE1, 261 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058cbe1() { /* assign home city — UI stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058cce6 — fortify_unit_command
// Source: block_00580000.c @ 0x0058CCE6, 255 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058cce6() { /* fortify command — UI stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058cde5 — explore_command
// Source: block_00580000.c @ 0x0058CDE5, 488 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058cde5() { /* explore command — UI stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058cfcd — pillage_command
// Source: block_00580000.c @ 0x0058CFCD, 1105 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058cfcd() { /* pillage command — UI stub */ }

export function FUN_0058d41e() { /* cleanup stub */ }
export function FUN_0058d434() { /* SEH unwind */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058d442 — goto_unit_command
// Source: block_00580000.c @ 0x0058D442, 451 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058d442() { /* goto command — UI stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058d60a — paradrop_unit_command
// Source: block_00580000.c @ 0x0058D60A, 165 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058d60a() { /* paradrop command — UI stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058d6af — caravan_goto_city_command
// Source: block_00580000.c @ 0x0058D6AF, 1787 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058d6af() { /* caravan goto — UI stub */ }

export function FUN_0058ddaa() { /* cleanup stub */ }
export function FUN_0058ddc0() { /* SEH unwind */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058ddce — unload_transport_command
// Source: block_00580000.c @ 0x0058DDCE, 326 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058ddce() { /* unload transport — UI stub */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058df14 — toggle_settler_automate
// Source: block_00580000.c @ 0x0058DF14, 103 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058df14() {
  let iVar1 = G.DAT_00655afe;
  if (utype_byte(0x0E, u8(unit_byte(0x06, iVar1))) === 0x05) {
    let v = unit_ushort(0x04, iVar1);
    set_unit_ushort(0x04, iVar1, v | 0x8000);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058df7b — airlift_unit_command
// Source: block_00580000.c @ 0x0058DF7B, 1609 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058df7b() { /* airlift command — UI stub */ }

export function FUN_0058e5c4() { /* cleanup stub */ }
export function FUN_0058e5da() { /* SEH unwind */ }


// ═══════════════════════════════════════════════════════════════════
// FUN_0058f010 — show_debug_message_if_enabled
// Source: block_00580000.c @ 0x0058F010, 48 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058f010(param_1) {
  if (G.DAT_006ad0d0 !== 0) {
    FUN_00421ea0(param_1);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058f040 — goody_hut_event
// Source: block_00580000.c @ 0x0058F040, 3404 bytes
// Handles what happens when a land unit enters a goody hut tile.
// Returns result flags.
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058f040(param_1) {
  // Goody hut / minor tribe event — complex game logic
  // Simplified stub: full transpilation would require all sub-functions
  let bVar2 = unit_byte(0x07, param_1);
  let uVar3 = s8(bVar2);
  if (uVar3 !== 0) {
    // Non-barbarian unit on goody hut — not fully implemented
    return 0;
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058fda9 — reveal_map_around_city
// Source: block_00580000.c @ 0x0058FDA9, 306 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058fda9(param_1, param_2, param_3) {
  // Reveal map tiles around a position — simplified stub
  FUN_005b9ec6();
  for (let local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    let uVar2 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + param_1);
    let iVar3 = s8(G.DAT_00628360[local_8]) + param_2;
    let iVar4 = FUN_004087c0(uVar2, iVar3);
    if (iVar4 !== 0) {
      let iVar5 = FUN_005b89e4(uVar2, iVar3);
      if (iVar5 === 0) {  // original: iVar4 == iVar1 check
        let iVar6 = FUN_005b8d62(uVar2, iVar3);
        if (-1 < iVar6) {
          FUN_004272d0(uVar2, iVar3, param_3);
        }
      }
    }
  }
  FUN_005b9f1c();
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058fedb — caravan_arrive_at_city
// Source: block_00580000.c @ 0x0058FEDB, 1831 bytes
// Handles caravan/freight arriving at a city — trade route or
// wonder contribution. UI-heavy.
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058fedb(param_1, param_2) {
  // Caravan arrival — UI-heavy, stubbed
}

export function FUN_00590607() { /* cleanup stub */ }
export function FUN_0059061d() { /* SEH unwind */ }


// ═══════════════════════════════════════════════════════════════════
// STUBS FOR FUNCTIONS FROM OTHER BLOCKS
//
// These are called by functions in this block but defined elsewhere.
// They are stubbed here as no-ops until their blocks are transpiled.
// ═══════════════════════════════════════════════════════════════════

function FUN_0043d20a(a, b) { return 0; /* city_has_building — stub */ }
function FUN_0043d07a(a, b, c, d, e) { return -1; /* find_city_near — stub */ }
function FUN_thunk_delete_city(a, b) { /* delete_city — stub */ }
function FUN_thunk_kill_civ(a, b) { return 0; /* kill_civ — stub */ }
function FUN_00509590(a) { /* handle_city_disorder — stub */ }
function FUN_004bd9f0_stub(a, b) { return 0; /* has_tech — stub */ }
function FUN_0043c9d0(a) { /* init_popup_menu — stub */ }
function FUN_0043c810() { /* finalize_popup — stub */ }
