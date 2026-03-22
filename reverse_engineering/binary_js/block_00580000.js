// ═══════════════════════════════════════════════════════════════════
// block_00580000.js — Mechanical transpilation of block_00580000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00580000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00580000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8 } from './mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b89e4, FUN_005b89bb, FUN_005b94d5, FUN_005b8931, FUN_005b8ca6, FUN_0058c56c } from './fn_utils.js';

// ── DAT_ globals (imported conceptually from mem.js) ──
// In a full integration these would come from mem.js.
// For now we declare them as module-level variables that can be
// set externally, matching the pattern of the decompiled binary.

// NOTE: Many DAT_ addresses below are referenced by FUN_00580341
// and other functions. They are declared here as stubs. In a full
// integration, they would be wired to the actual game state arrays.

let DAT_006d1da0 = 0;     // current human player index
let DAT_006acb08 = -1;    // city under attack index
let DAT_006acb0c = 0;     // multiple unit losses counter
let DAT_00655b0b = 0;     // human player bitmask
let DAT_00655b02 = 0;     // multiplayer mode (0=SP, 3+=MP)
let DAT_00655b07 = 0;     // observer/cheat mode flag
let DAT_00655b08 = 0;     // difficulty level
let DAT_00655b09 = 0;     // barbarian activity level
let DAT_00655b0a = 0;     // active civ bitmask
let DAT_00655b14 = 0;     // unknown flag
let DAT_00655b16 = 0;     // total unit count
let DAT_00655b18 = 0;     // total city count
let DAT_00655ae8 = 0;     // game flags (bit 4 = simultaneous movement)
let DAT_00655af0 = 0;     // scenario flags
let DAT_00655af8 = 0;     // game turn number
let DAT_00655afe = 0;     // currently selected unit (short)
let DAT_00655afa = 0;     // year
let DAT_006ad0cc = 0;     // ceasefire/war flag
let DAT_00654fa8 = 0;     // replay/no-UI flag
let DAT_00654fae = 0;     // unknown game flag
let DAT_0064bcc8 = 3;     // movement multiplier
let DAT_0062c5bc = 0;     // defender won flag
let DAT_006d1da8 = 0;     // unit selection mode
let DAT_0063f660 = 0;     // epoch / era
let DAT_0064bc60 = 0;     // scenario options
let DAT_00633e48 = -1;    // combat defender unit
let DAT_00633e40 = 0;     // combat target x
let DAT_00633e44 = 0;     // combat target y
let DAT_0066bfc4 = -1;    // combat sound 1
let DAT_0066bfc0 = -1;    // combat sound 2
let DAT_00655b00 = 0;     // attacker unit index (byte)
let DAT_00633598 = 0;     // center x
let DAT_0063359c = 0;     // center y
let DAT_006a4f88 = 0;     // cheat menu ptr
let DAT_00634768 = 0;     // callback count
let DAT_00634718 = 0;     // startup flag
let DAT_00634814 = 0;     // alloc error flag
let DAT_00634818 = 0;     // alloc error size
let DAT_00634810 = 0;     // file error flag
let DAT_006a1d7c = 0;     // cosmic editor active
let DAT_006a1d80 = 0;     // cosmic editor row count
let DAT_006acd50 = 0;     // sound editor active
let DAT_0062e018 = 0;     // cosmic edit helper ptr
let DAT_0067a994 = 0;     // unknown UI flag
let DAT_006acbb0 = 0;     // startup helper
let DAT_006d1188 = 0;     // dummy tile
let DAT_0062804c = 0;     // action cancelled flag
let DAT_00628054 = 0;     // action cancelled flag 2
let DAT_00628420 = 0;     // string table base
let DAT_0062edf8 = 0;     // city window flag
let DAT_00633584 = 0;     // scenario flag
let DAT_006ad0d0 = 0;     // surprise event visible flag
let DAT_006d1160 = 0;     // map width doubled
let DAT_00639f14 = 0;     // last DOS error

// ── Unit data array base (stride 0x20 per unit) ──
let DAT_006560f0 = new Uint8Array(2048 * 0x20);
// ── Unit type table (stride 0x14 per type) ──
let DAT_0064b1bc = new Uint8Array(62 * 0x14);
// ── Per-civ data (stride 0x594 per civ) ──
let DAT_0064c600 = new Uint8Array(8 * 0x594);
// ── City data (stride 0x58 per city) ──
let DAT_0064f340 = new Uint8Array(256 * 0x58);
// ── Direction offsets (8 directions) ──
let DAT_00628350 = new Int8Array([-1, 1, 2, 1, -1, -1, -2, -1]);
let DAT_00628360 = new Int8Array([-1, -1, 0, 1, 1, 1, 0, -1]);
// ── 20-tile city radius offsets ──
let DAT_00628370 = new Int8Array(20);
let DAT_006283a0 = new Int8Array(20);

// ── Cosmic parameters array ──
let DAT_006a2d80 = new Int32Array(22);
let DAT_006a2d28 = new Int32Array(22);

// ── Misc data aliases used via offsets from base ──
// These are conceptual; in C they are just memory addresses.
// We use accessor helpers below.

// ── War/peace/alliance/diplomacy tables in per-civ data ──
// DAT_0064c6c0 at offset 0xC0 in per-civ (stride 0x594)
// DAT_0064ca82 at offset 0x482 in per-civ

// ── Barbarian tech flags ──
let DAT_00655b82 = new Uint8Array(100);
let DAT_00655b8d = 0;
let DAT_00655b93 = 0;
let DAT_00655b9e = 0;
let DAT_00655ba4 = 0;
let DAT_00655ba5 = 0;
let DAT_00655ba9 = 0;
let DAT_00655bac = 0;
let DAT_00655bb5 = 0;
let DAT_00655bb9 = 0;
let DAT_00655bc2 = 0;
let DAT_0064b383 = 0;
let DAT_00655c21 = 0;
let DAT_00655c22 = new Uint8Array(8);
let DAT_0064b1b4 = 0;
let DAT_0064b1b0 = 0;
let DAT_00655b05 = 0;


// ── Random number generator (C runtime _rand) ──
function _rand() {
  return Math.floor(Math.random() * 0x7FFF);
}


// ═══════════════════════════════════════════════════════════════════
// ACCESSOR HELPERS
//
// These simulate C pointer arithmetic like (&DAT_006560f7)[idx * 0x20]
// by accessing the appropriate byte from the backing arrays.
// ═══════════════════════════════════════════════════════════════════

function unit_byte(offset, unitIdx) {
  return DAT_006560f0[unitIdx * 0x20 + offset];
}
function set_unit_byte(offset, unitIdx, val) {
  DAT_006560f0[unitIdx * 0x20 + offset] = val & 0xFF;
}
function unit_short(offset, unitIdx) {
  const base = unitIdx * 0x20 + offset;
  const v = DAT_006560f0[base] | (DAT_006560f0[base + 1] << 8);
  return (v & 0x8000) ? (v - 0x10000) : v;
}
function unit_ushort(offset, unitIdx) {
  const base = unitIdx * 0x20 + offset;
  return DAT_006560f0[base] | (DAT_006560f0[base + 1] << 8);
}
function set_unit_ushort(offset, unitIdx, val) {
  const base = unitIdx * 0x20 + offset;
  DAT_006560f0[base] = val & 0xFF;
  DAT_006560f0[base + 1] = (val >> 8) & 0xFF;
}
function unit_int(offset, unitIdx) {
  const base = unitIdx * 0x20 + offset;
  return DAT_006560f0[base] | (DAT_006560f0[base + 1] << 8) |
         (DAT_006560f0[base + 2] << 16) | (DAT_006560f0[base + 3] << 24);
}

function utype_byte(offset, typeIdx) {
  return DAT_0064b1bc[typeIdx * 0x14 + offset];
}

function civ_byte(offset, civIdx) {
  return DAT_0064c600[civIdx * 0x594 + offset];
}
function set_civ_byte(offset, civIdx, val) {
  DAT_0064c600[civIdx * 0x594 + offset] = val & 0xFF;
}
function civ_short(offset, civIdx) {
  const base = civIdx * 0x594 + offset;
  const v = DAT_0064c600[base] | (DAT_0064c600[base + 1] << 8);
  return (v & 0x8000) ? (v - 0x10000) : v;
}
function civ_int(offset, civIdx) {
  const base = civIdx * 0x594 + offset;
  return DAT_0064c600[base] | (DAT_0064c600[base + 1] << 8) |
         (DAT_0064c600[base + 2] << 16) | (DAT_0064c600[base + 3] << 24);
}
function set_civ_int(offset, civIdx, val) {
  const base = civIdx * 0x594 + offset;
  DAT_0064c600[base] = val & 0xFF;
  DAT_0064c600[base + 1] = (val >> 8) & 0xFF;
  DAT_0064c600[base + 2] = (val >> 16) & 0xFF;
  DAT_0064c600[base + 3] = (val >> 24) & 0xFF;
}

function city_byte(offset, cityIdx) {
  return DAT_0064f340[cityIdx * 0x58 + offset];
}
function set_city_byte(offset, cityIdx, val) {
  DAT_0064f340[cityIdx * 0x58 + offset] = val & 0xFF;
}
function city_short(offset, cityIdx) {
  const base = cityIdx * 0x58 + offset;
  const v = DAT_0064f340[base] | (DAT_0064f340[base + 1] << 8);
  return (v & 0x8000) ? (v - 0x10000) : v;
}
function city_int(offset, cityIdx) {
  const base = cityIdx * 0x58 + offset;
  return DAT_0064f340[base] | (DAT_0064f340[base + 1] << 8) |
         (DAT_0064f340[base + 2] << 16) | (DAT_0064f340[base + 3] << 24);
}
function set_city_int(offset, cityIdx, val) {
  const base = cityIdx * 0x58 + offset;
  DAT_0064f340[base] = val & 0xFF;
  DAT_0064f340[base + 1] = (val >> 8) & 0xFF;
  DAT_0064f340[base + 2] = (val >> 16) & 0xFF;
  DAT_0064f340[base + 3] = (val >> 24) & 0xFF;
}

// Diplomacy table access: (&DAT_0064c6c0)[civA * 4 + civB * 0x594]
// This is at per-civ offset 0xC0 + civA*4
function diplo_byte(offset, civA, civB) {
  return DAT_0064c600[civB * 0x594 + 0xC0 + offset + civA * 4];
}

// ── Combat-related per-civ arrays (at fixed addresses) ──
let DAT_006acae8 = new Int32Array(8); // ally-under-attack flags
let DAT_006acb10 = new Int32Array(8); // cancel-peace flags
let DAT_006acb58 = new Int32Array(4); // city list filter


// ═══════════════════════════════════════════════════════════════════
// FUN_005802fd — refresh_combat_tiles
// Source: block_00580000.c @ 0x005802FD, 68 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_005802fd(param_1, param_2, param_3, param_4) {
  FUN_0047ce1e(param_1, param_2, 0, DAT_006d1da0, 1);
  FUN_0047ce1e(param_3, param_4, 0, DAT_006d1da0, 1);
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
    DAT_006acae8[local_18] = 0;
    DAT_006acb10[local_18] = 0;
  }

  // (&DAT_006560f7)[param_1 * 0x20] = attacker owner
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
  if (iVar10 < DAT_0064bcc8) {
    local_98 = FUN_005b2c3d(param_1);
  } else {
    local_98 = DAT_0064bcc8;
  }
  if (param_3 !== 0) {
    local_a0 = ((local_a0 * local_98) / DAT_0064bcc8) | 0;
  }

  // Target tile coordinates
  uVar11 = FUN_005ae052(s8(DAT_00628350[param_2]) + iVar8);
  iVar10 = s8(DAT_00628360[param_2]) + iVar9;
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
    if (DAT_00654fae !== 0) {
      local_c4 = local_c4 - ((s8(utype_byte(0x06, u8(unit_byte(0x06, param_1)))) / 2) | 0);
    }
    if ((DAT_0064bcc8 * 2 === local_c4) &&
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
  if ((0 < DAT_006acb08) &&
      (utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x02) &&
      (utype_byte(0x05, u8(unit_byte(0x06, local_c))) !== 0x02) &&
      (iVar13 = FUN_0043d20a(DAT_006acb08, 0x1c), iVar13 !== 0)) {
    local_64 = local_64 << 1;
    if (param_3 !== 0) {
      local_b8 = 0x1c;
      let flags = city_int(0x04, DAT_006acb08);
      set_city_int(0x04, DAT_006acb08, flags | 0x8000000);
    }
  }

  // ── Air unit: SAM/SDI bonus and great wall ──
  if ((0 < DAT_006acb08) &&
      (utype_byte(0x05, u8(unit_byte(0x06, param_1))) === 0x01)) {
    if (((utype_byte(0x00, u8(unit_byte(0x06, local_c))) & 0x10) === 0) ||
        ((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) !== 0)) {
      iVar13 = FUN_0043d20a(DAT_006acb08, 0x11);
      if ((iVar13 !== 0) &&
          ((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) !== 0) &&
          (s8(utype_byte(0x08, u8(unit_byte(0x06, param_1)))) < 99)) {
        local_64 = local_64 << 1;
        local_24 = 1;
        if (param_3 !== 0) {
          local_b8 = 0x11;
        }
      }
      iVar13 = FUN_0043d20a(DAT_006acb08, 0x1b);
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
      ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0)) {
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
    if ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0) {
      local_a0 = (local_a0 / 2) | 0;
    } else {
      local_a0 = (DAT_00655b08 + 1) * local_a0;
      local_a0 = (local_a0 + (local_a0 >>> 31 & 3)) >> 2;
    }
    if (-1 < DAT_006acb08) {
      if (civ_short(0x108, uVar12) < 2) {
        local_a0 = 0;
      }
      iVar13 = FUN_0043d20a(DAT_006acb08, 1);
      bVar18 = iVar13 !== 0;
      if (bVar18) {
        local_a0 = local_a0 >> 1;
      }
      if (civ_short(0x108, uVar12) < 8) {
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
        ((unit_byte(0x06, local_c) === 0x05) && ((DAT_00655b0b & DAT_00655ba9) === 0)))) {
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
    if ((DAT_00655ae8 & 0x10) !== 0) {
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
  if ((DAT_006ad0cc & 2) !== 0) {
    set_unit_byte(0x08, param_1, unit_byte(0x08, param_1) + DAT_0064bcc8);
  }

  // ── Check if attacker has treaty preventing attack ──
  if (((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0) &&
      (iVar13 = FUN_00579ed0(uVar7, uVar12, 0xd), iVar13 !== 0)) {
    return 1;
  }

  // ── Check if defender has "at war" flag ──
  if ((diplo_byte(0, uVar12, uVar7) & 8) !== 0) {
    return 1;
  }

  // ── Both nonzero civs: clear war counter ──
  if ((uVar7 !== 0) && (uVar12 !== 0)) {
    DAT_00655b14 = 0;
  }

  // ── Set diplomatic war status ──
  FUN_00467825(uVar7, uVar12, 0x200);

  // ── Handle sneak attack / ceasefire breaking ──
  if (((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0) ||
      (((diplo_byte(0, uVar7, uVar12) & 6) === 0 &&
       ((((diplo_byte(0, uVar7, uVar12) & 1) === 0 &&
         ((diplo_byte(0, uVar12, uVar7) & 0x40) === 0)) ||
        ((diplo_byte(1, uVar7, uVar12) & 0x20) !== 0)))))) {
    // No ceasefire violation — check alliance wars
    if (((diplo_byte(0, uVar12, uVar7) & 4) !== 0) ||
        ((diplo_byte(0, uVar7, uVar12) & 4) !== 0)) {
      if (DAT_00655b02 < 3) {
        if (((1 << (bVar1 & 0x1f) & DAT_00655b0b) === 0) &&
            ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0)) {
          if ((diplo_byte(0, DAT_006d1da0, uVar12) & 8) === 0) {
            if ((diplo_byte(0, DAT_006d1da0, uVar7) & 8) === 0) {
              if (DAT_00655b07 !== 0) {
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
          if ((1 << (local_18 & 0x1f) & DAT_00655b0b) !== 0) {
            if (uVar7 === local_18) {
              DAT_006acb10[local_18] = 1;
            } else if (uVar12 === local_18) {
              DAT_006acb10[local_18] = 1;
            } else if (DAT_00655b07 !== 0) {
              DAT_006acb10[local_18] = 1;
            }
            if (DAT_006acb10[local_18] !== 0) {
              local_30 = 1;
            }
          }
        }
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if ((1 << (local_18 & 0x1f) & DAT_00655b0b) !== 0) {
            if ((uVar12 === local_18) || ((diplo_byte(0, uVar12, local_18) & 8) === 0)) {
              if ((uVar7 !== local_18) && ((diplo_byte(0, uVar7, local_18) & 8) !== 0)) {
                DAT_006acae8[local_18] = 2;
                local_b0 = 2;
              }
            } else {
              DAT_006acae8[local_18] = 1;
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
          ((1 << (bVar1 & 0x1f) & DAT_00655b0b) === 0)) {
        FUN_0055f5a3(uVar7, 1);
      }
    }
    if (((diplo_byte(0, uVar7, uVar12) & 2) === 0) ||
        ((diplo_byte(0, uVar7, uVar12) & 4) !== 0)) {
      // Simple sneak attack notification
      if ((DAT_00654fa8 === 0) && ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0)) {
        uVar14 = FUN_00410070(uVar7);
        FUN_0040ff60(0, uVar14);
        if (DAT_006d1da0 === uVar12) {
          FUN_004442e0("SNEAK", param_1);
        } else if (2 < DAT_00655b02) {
          FUN_00511880(0x2e, 0, 1, 0, param_1, 0);
        }
      }
    } else if ((DAT_00654fa8 === 0) && ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0)) {
      // Ceasefire break notification
      uVar14 = FUN_00493c7d(uVar7);
      FUN_0040ff60(0, uVar14);
      if (DAT_006d1da0 === uVar12) {
        FUN_004442e0("BREAKCEASE", param_1);
      } else if (2 < DAT_00655b02) {
        FUN_00511880(0x2d, 0, 1, 0, param_1, 0);
      }
    }
    local_a0 = local_a0 << 1;
    // Set reputation
    // Set reputation tracking: (&DAT_0064ca82)[uVar12 * 0x594 + uVar7 * 2] = DAT_00655af8
    // This is at per-civ offset 0x482 + uVar7 * 2
    // DEVIATION: would need w16 into per-civ data — deferred until full memory model
  }

  // ── Check if war can proceed ──
  iVar13 = FUN_00579c40(uVar7, uVar12);

  // ── Difficulty-based attack modifiers ──
  if (uVar7 !== 0) {
    if ((DAT_00655b08 < 2) && ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0)) {
      local_a0 = local_a0 >> 1;
    }
    if ((DAT_00655b08 === 0) && ((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0)) {
      local_a0 = local_a0 << 1;
    }
  }

  // ── Build list of human players who can see this combat ──
  bVar3 = false;
  for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
    aiStack_58[local_18] = 0;
    if (((2 < DAT_00655b02) || (DAT_006d1da0 === local_18)) &&
        ((1 << (local_18 & 0x1f) & DAT_00655b0a) !== 0) &&
        ((1 << (local_18 & 0x1f) & DAT_00655b0b) !== 0)) {
      if (DAT_00655b02 < 3) {
        let _canSee = (uVar7 === local_18) || (uVar12 === local_18);
        if (!_canSee) {
          _canSee = (DAT_00655b07 !== 0) ||
            ((1 << (local_18 & 0x1f) & u8(unit_byte(0x09, param_1))) !== 0) ||
            (s8(unit_byte(0x07, param_1)) === (local_18 & 0xff)) ||
            ((1 << (local_18 & 0x1f) & u8(unit_byte(0x09, local_c))) !== 0);
        }
        if (!_canSee) {
          _canSee = (s8(unit_byte(0x07, local_c)) === (local_18 & 0xff));
        }
        if (!_canSee) {
          _canSee = ((DAT_00655af0 & 0x80) !== 0) && ((DAT_0064bc60 & 8) !== 0);
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
        if (DAT_006d1da0 === local_18) {
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
      // C: *(short *)(&DAT_0066ca84 + local_1c * 0x3f0) != 0
      // DEVIATION: DAT_0066ca84 is per-player data, not city data — simplified check
      if ((local_1c === 0) || (true)) {
        FUN_0047bc59(local_c);
        FUN_0047cb26(uVar11, iVar10);
      }
    }

    // C: (*(uint *)(&DAT_0064b1bc + type * 0x14) & 0x1008) != 0
    // 0x1008 spans bytes 0-1: byte0 & 0x08, byte1 & 0x10
    if (((utype_byte(0x00, u8(unit_byte(0x06, param_1))) & 0x08) !== 0) ||
        ((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) !== 0)) {
      FUN_0046e287(10);
    }

    // ── Missile attack notification ──
    if (((utype_byte(0x01, u8(unit_byte(0x06, param_1))) & 0x10) !== 0) &&
        (s8(utype_byte(0x08, u8(unit_byte(0x06, param_1)))) < 99) &&
        ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0) &&
        (iVar15 = FUN_0043d07a(uVar11, iVar10, -1, -1, -1), -1 < iVar15)) {
      FUN_0040ff60(0, 0);
      if (DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (DAT_006d1da0 === local_18) {
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
      if (DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (DAT_006d1da0 === local_18) {
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
        if (DAT_00654fa8 === 0) {
          for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (aiStack_58[local_18] !== 0) {
              if (DAT_006d1da0 === local_18) {
                FUN_004cc870("BATTERY", local_b8, 8);
              } else {
                FUN_00511880(0x32, 0, 3, 0, local_b8, 0);
              }
            }
          }
        }
      } else {
        FUN_004271e8(3, 0);
        if (DAT_00654fa8 === 0) {
          for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
            if (aiStack_58[local_18] !== 0) {
              if (DAT_006d1da0 === local_18) {
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
      if (DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (DAT_006d1da0 === local_18) {
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
      if (DAT_00654fa8 === 0) {
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if (aiStack_58[local_18] !== 0) {
            if (DAT_006d1da0 === local_18) {
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
    DAT_0066bfc4 = -1;
    DAT_0066bfc0 = 0xffffffff;

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
    DAT_00633e48 = local_c;
    DAT_00633e40 = uVar11;
    DAT_00633e44 = iVar10;

    if (2 < DAT_00655b02) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          FUN_0046b14d(0x9a, 0, DAT_0066bfc4, DAT_0066bfc0, 0, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x70, 0, param_1, iVar8, iVar9, param_2, DAT_00633e48, 0, 0, 0);
        }
      }
    }

    // ── Combat animation ──
    FUN_0056c705(param_1, iVar8, iVar9, param_2, -1, -1);
    FUN_005b3ae0(param_1, iVar8, iVar9, 0);
    FUN_005802fd(uVar11, iVar10, iVar8, iVar9);

    if (2 < DAT_00655b02) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          FUN_0046b14d(0x73, 0, uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // Suicide / nuclear unit handling
  // ═══════════════════════════════════════════════════════════════

  if (s8(utype_byte(0x08, u8(unit_byte(0x06, param_1)))) > 98) {
    DAT_00633e48 = -1;
    iVar13 = FUN_0057f9e3(uVar7, uVar11, iVar10, 1);
    if (iVar13 === 0) {
      FUN_005b4391(param_1, 1);
      FUN_0047cea6(iVar8, iVar9);
      if (2 < DAT_00655b02) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
          if ((DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
            FUN_0046b14d(0x72, 0, iVar8, iVar9, 0, 0, 0, 0, 0, 0);
          }
        }
      }
    } else {
      // Failed to nuke — reset war counter
      set_civ_byte(0xF0 - 0xC0, uVar7, 0); // (&DAT_0064c6f0)[uVar7 * 0x594 + uVar12]
    }
    if (((iVar13 !== 0) && ((1 << (bVar1 & 0x1f) & DAT_00655b0b) === 0)) && (-1 < DAT_006acb08)) {
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
          if (DAT_006d1da0 === local_18) {
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
              if (DAT_006d1da0 === local_18) {
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
        if ((DAT_00655ae8 & 0x10) === 0) {
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
            if (DAT_006d1da0 === local_18) {
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
    } while ((DAT_00655ae8 & 0x10) !== 0);
  }

  // ═══════════════════════════════════════════════════════════════
  // POST-COMBAT: determine winner
  // ═══════════════════════════════════════════════════════════════

  // local_c0: 0 = defender wins, nonzero = attacker wins

  if (local_c0 === 0) {
    DAT_0062c5bc = 1;
  }

  // ── Post-combat sound selection ──
  if (bVar3) {
    DAT_0066bfc4 = -1;
    if ((((local_c0 === 0) ||
         (utype_byte(0x05, u8(unit_byte(0x06, local_c))) !== 0x01)) ||
        (-1 < DAT_006acb08)) &&
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
    if ((2 < DAT_00655b02) && (DAT_0066bfc4 !== -1)) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          FUN_0046b14d(0x7a, 0, DAT_0066bfc4, DAT_0066bfc0, 0, 0, 0, 0, 0, 0);
        }
      }
    }
  }

  FUN_004b0b53(0xff, 2, 0, 0, 0);

  // ── Post-combat visual update ──
  if (bVar3) {
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if (aiStack_58[local_18] !== 0) {
        if (DAT_006d1da0 === local_18) {
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

  DAT_00633e48 = -1;
  DAT_006acb0c = 0;

  if (local_c0 === 0) {
    // ── Defender wins: attacker dies ──
    // (&DAT_0064c6f0)[uVar7 * 0x594 + uVar12] += 1  — war counter increment
    // DEVIATION: per-civ byte write deferred until full memory model

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
    // (&DAT_0064c6f0)[uVar7 * 0x594 + uVar12] = 0  — war counter reset
    // DEVIATION: per-civ byte write deferred until full memory model

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
    if (((DAT_006acb08 < 0) &&
        (bVar6 = FUN_005b94d5(uVar11, iVar10), (bVar6 & 0x42) !== 0x40)) &&
        (iVar15 = FUN_005b8d15(uVar11, iVar10), iVar15 < 0)) {
      FUN_0057eb94(local_c, param_1, local_8, local_14);
    } else {
      FUN_0057e9f9(local_c, param_1, local_8, local_14);
    }

    iVar15 = DAT_006acb08;
    local_60 = uVar12;

    // ── City capture logic ──
    if (-1 < DAT_006acb08) {
      let cityFlags = city_int(0x04, DAT_006acb08);
      set_city_int(0x04, DAT_006acb08, cityFlags | 0x20);

      iVar16 = FUN_005b89e4(iVar8, iVar9);
      if (((iVar16 === 0) && (iVar16 = FUN_0043d20a(iVar15, 8), iVar16 === 0)) &&
          ((iVar16 = FUN_00453e51(uVar12, 6), iVar16 === 0 &&
           ((DAT_00655b08 !== 0 || ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0)))))) {
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
              DAT_006acb10[local_18] = 0;
            }
          }
        } else {
          // City shrinks
          FUN_0043cc00(iVar15, uVar7);
          iVar16 = FUN_005b8d62(uVar11, iVar10);
          if ((iVar16 < 0) && ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0)) {
            uVar14 = FUN_005b8a81(uVar11, iVar10);
            FUN_00442541(uVar12, uVar14);
          }
        }
      }
      iVar16 = FUN_005b8d62(uVar11, iVar10);
      if ((iVar16 < 0) && ((1 << (bVar2 & 0x1f) & DAT_00655b0b) !== 0)) {
        FUN_005369f3(iVar15);
      }
    }
  }

  // ── Refresh display ──
  FUN_004b0b53(0xff, 2, 0, 0, 0);
  if (bVar3) {
    if (2 < DAT_00655b02) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
          FUN_0046b14d(0x73, 0, uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
        }
      }
    }
    FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
  }

  // ── Multiple unit loss dialog ──
  if ((DAT_00654fa8 === 0) && (1 < DAT_006acb0c)) {
    FUN_00421da0(0, DAT_006acb0c);
    if (DAT_006d1da0 === local_60) {
      FUN_00421ea0("MULTIPLELOSE");
    } else if (DAT_006d1da0 === local_20) {
      FUN_00421ea0("MULTIPLEWIN");
    }
    if (((DAT_00655b02 < 3) || ((1 << (local_60 & 0x1f) & DAT_00655b0b) === 0)) ||
        (DAT_006d1da0 === local_60)) {
      if (((2 < DAT_00655b02) && ((1 << (local_20 & 0x1f) & DAT_00655b0b) !== 0)) &&
          (DAT_006d1da0 !== local_20)) {
        FUN_00511880(0x36, 0, 0, 1, 0, 0);
      }
    } else {
      FUN_00511880(0x35, 0, 0, 1, 0, 0);
    }
  }

  // ── Barbarian ransom ──
  if (bVar5) {
    uVar17 = ((DAT_00655b09 * 100) / 2) >>> 0;
    // Add gold
    // *(int *)(&DAT_0064c6a2 + uVar7 * 0x594) += uVar17;
    FUN_00421da0(0, uVar17);
    if ((DAT_006d1da0 === uVar7) && (DAT_00654fa8 === 0)) {
      FUN_004442a0("RANSOM", 0x3e, 0);
      FUN_00569363(1);
    } else if ((2 < DAT_00655b02) && (DAT_00654fa8 === 0)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if ((aiStack_58[local_18] !== 0) && (DAT_006d1da0 !== local_18)) {
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
  if ((DAT_00654fa8 === 0) && ((local_30 !== 0 || (local_b0 !== 0)))) {
    uVar14 = FUN_00493c7d(uVar12);
    FUN_0040ff60(0, uVar14);
    uVar14 = FUN_00493c7d(uVar7);
    FUN_0040ff60(1, uVar14);
    if (DAT_00655b02 < 3) {
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
    } else if (DAT_00654fa8 === 0) {
      for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
        if (DAT_006acb10[local_18] !== 0) {
          if (DAT_006d1da0 === local_18) {
            FUN_00421ea0("CANCELPEACE");
          } else {
            FUN_00511880(0x3a, 0, 2, 0, 0, 0);
          }
        }
        if ((DAT_006acae8[local_18] !== 0) && (DAT_00654fa8 === 0)) {
          if (DAT_006d1da0 === local_18) {
            if (DAT_006acae8[local_18] === 1) {
              FUN_00421ea0("ALLYUNDERATTACK");
              FUN_0045b0d6(uVar12, uVar7);
            } else {
              FUN_00421ea0("ALLYATTACKING");
            }
          } else if (DAT_006acae8[local_18] === 1) {
            FUN_00511880(0x3b, 0, 2, 0, 0, 0);
            if ((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0) {
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
  if (2 < DAT_00655b02) {
    FUN_0046b14d(0x7f, 0xff, 2, 0, 0, 0, 0, 0, 0, 0);
  }

  // ═══════════════════════════════════════════════════════════════
  // POST-COMBAT UNIT MOVEMENT / CLEANUP
  // ═══════════════════════════════════════════════════════════════

  if (local_c0 === 0) {
    local_38 = 0;
  } else {
    iVar13 = DAT_00655b00;
    if ((utype_byte(0x05, u8(unit_byte(0x06, iVar13))) === 0x01) &&
        (utype_byte(0x07, u8(unit_byte(0x06, iVar13))) !== 0x01)) {
      FUN_005b6787(iVar13);
    }

    if ((((local_c0 === 0) || ((1 << (bVar1 & 0x1f) & DAT_00655b0b) !== 0)) ||
        (DAT_006acb08 < 0)) || (iVar15 = FUN_005b2e69(uVar11, iVar10), -1 < iVar15)) {
      if ((local_c0 !== 0) &&
          ((utype_byte(0x01, u8(unit_byte(0x06, iVar13))) & 0x10) !== 0)) {
        FUN_005b4391(iVar13, 1);
        local_38 = 0;
      }
    } else {
      if ((utype_byte(0x01, u8(unit_byte(0x06, iVar13))) & 0x10) === 0) {
        if (((utype_byte(0x05, u8(unit_byte(0x06, iVar13))) === 0x01) &&
            (utype_byte(0x07, u8(unit_byte(0x06, iVar13))) !== 0x00)) &&
            (set_unit_byte(0x0D, iVar13, unit_byte(0x0D, iVar13) + 1),
             s8(utype_byte(0x07, u8(unit_byte(0x06, iVar13)))) <=
             s8(unit_byte(0x0D, iVar13)))) {
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
  if (2 < DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    for (local_18 = 1; local_18 < 8; local_18 = local_18 + 1) {
      if ((DAT_006d1da0 !== local_18) && (aiStack_58[local_18] !== 0)) {
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
// Copies cosmic parameters between DAT_006a2d80 and DAT_006a2d28 arrays
// ═══════════════════════════════════════════════════════════════════

export function FUN_005866d3() {
  // Copy cosmic params from byte globals into DAT_006a2d80 array (expanded to int)
  // In C: _DAT_006a2d80 = (uint)DAT_0064bcc8; ... _DAT_006a2dd4 = (uint)DAT_0064bcdd;
  // The original copies 22 consecutive byte globals starting at DAT_0064bcc8
  // into DAT_006a2d80[0..21] as uint values
  for (let i = 0; i < 22; i++) {
    DAT_006a2d80[i] = DAT_0064bcc8; // DEVIATION: simplified — original reads individual byte globals DAT_0064bcc8+i
  }
  FUN_00419d23();
  // Copy cosmic params into DAT_006a2d28 array
  for (let i = 0; i < 22; i++) {
    DAT_006a2d28[i] = DAT_0064bcc8; // DEVIATION: simplified — original reads individual byte globals DAT_0064bcc8+i
  }
  // Copy back from DAT_006a2d80 to byte globals
  // In C: DAT_0064bcc8 = DAT_006a2d80; ... DAT_0064bcdd = DAT_006a2dd4;
  // DEVIATION: simplified — would need individual byte global writes
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
  DAT_006a1d7c = 0;
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
  DAT_00634718 = 0;
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
  if (DAT_00634768 < 10) {
    local_8 = DAT_00634768;
    DAT_00634768 = DAT_00634768 + 1;
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
  DAT_006acd50 = 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058ac13 — invalidate_sound_editor_2
// Source: block_00580000.c @ 0x0058AC13, 37 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058ac13() {
  DAT_006acd50 = 0;
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
  FUN_0059062c(DAT_00655afe, -1, 3);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058bd84 — wake_all_own_units
// Source: block_00580000.c @ 0x0058BD84, 121 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058bd84() {
  for (let local_8 = 0; local_8 < DAT_00655b16; local_8 = local_8 + 1) {
    if ((unit_int(0x1A, local_8) !== 0) &&
        (s8(unit_byte(0x07, local_8)) === DAT_006d1da0)) {
      FUN_005b6787(local_8);
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058bdfd — set_unit_no_orders
// Source: block_00580000.c @ 0x0058BDFD, 89 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058bdfd() {
  let v = unit_ushort(0x04, DAT_00655afe);
  set_unit_ushort(0x04, DAT_00655afe, v | 0x4000);
  DAT_0062804c = 0;
  DAT_00628054 = 0;
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
  let iVar1 = DAT_00655afe;
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
  if (DAT_006ad0d0 !== 0) {
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
  let bVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let uVar7;
  let uVar8;
  let iVar9;
  let uVar10;
  let local_60;
  let local_50;
  let local_4c;
  let local_48;
  let local_40;
  let local_3c;
  let local_38;
  let local_28;
  let local_20;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  bVar2 = unit_byte(0x07, param_1);
  uVar3 = s8(bVar2);
  iVar4 = unit_short(0x00, param_1);
  uVar5 = unit_short(0x02, param_1);
  local_50 = uVar5;

  if ((uVar3 !== 0) &&
     (local_50 = s8(utype_byte(0x05, u8(unit_byte(0x06, param_1)))),
      s8(utype_byte(0x05, u8(unit_byte(0x06, param_1)))) === 0)) {
    FUN_0043d07a(iVar4, uVar5, -1, -1, -1);
    iVar6 = _rand();
    local_50 = iVar6 % 5;
    if ((((((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0) || (iVar6 = _rand(), iVar6 % 3 === 0)) &&
         ((city_short(0x108, uVar3) !== 0 &&
          (iVar6 = FUN_005b8a81(iVar4, uVar5),
           civ_byte(0x332, uVar3 * 0x594 + iVar6) === 0)))) &&  // (&DAT_0064c932)[uVar3 * 0x594 + iVar6]
        (((civ_byte(0x3F2, uVar3 * 0x594 + iVar6) & 0x7f) === 0 || (0x0c < DAT_0063f660)))) &&  // (&DAT_0064c9f2)
       (civ_byte(0x332, uVar3 * 0x594 + iVar6) === 0)) {
      local_50 = 0;
    }

    let done = false;
    while (!done) {
      done = true;
      switch (local_50) {
      case 0:
        if (DAT_0063f660 < 4) {
          local_50 = 1;
          done = false;
          break;
        }
        if ((city_short(0x108, uVar3) === 0) && (DAT_00655af8 < 0x32)) {
          local_8 = 0;
          for (param_1 = 0; param_1 < DAT_00655b16; param_1 = param_1 + 1) {
            if (((unit_int(0x1A, param_1) !== 0) &&
                (utype_byte(0x0E, u8(unit_byte(0x06, param_1))) === 0x05)) &&
               (unit_byte(0x10, param_1) === 0xff)) {  // (&DAT_00656100)[param_1 * 0x20]
              local_8 = local_8 + 1;
            }
          }
          if (1 < local_8) {
            local_50 = 1;
            done = false;
            break;
          }
        }
        iVar6 = FUN_005b8c42(iVar4, uVar5);
        if (0x0b < iVar6) {
          if (DAT_006ad0d0 !== 0) {
            FUN_00410030("SURPRISETRIBE", 0, 0);
          }
          iVar6 = FUN_thunk_create_city(iVar4, uVar5, uVar3);
          if (999 < DAT_00655afa) {
            iVar9 = _rand();
            let popSize = (((iVar9 & 0xff) % 4) + 1) & 0xff;  // approximation of the C bit manipulation
            // (&DAT_0064f349)[iVar6 * 0x58] = popSize
            set_city_byte(0x09, iVar6, popSize);
            FUN_0043d289(iVar6, 4, 1);
            uVar7 = _rand();
            if ((uVar7 & 1) === 0) {
              FUN_0043d289(iVar6, 5, 1);
            }
            iVar9 = _rand();
            if (iVar9 % 3 === 0) {
              FUN_0043d289(iVar6, 3, 1);
            }
            uVar7 = _rand();
            if ((uVar7 & 3) === 0) {
              FUN_0043d289(iVar6, 6, 1);
            }
          }
          if (DAT_006ad0d0 === 0) {
            return 0;
          }
          FUN_0047cf22(iVar4, uVar5);
          uVar3 = FUN_0046b14d(0x75, 0xff, iVar4, uVar5, 0, 0, 0, 0, 0, 0);
          if (iVar6 < 0) {
            return uVar3;
          }
          uVar3 = FUN_00509590(iVar6);
          return uVar3;
        }
        local_50 = 5;
        done = false;
        break;

      case 1:
        if (DAT_006ad0d0 !== 0) {
          FUN_00410030("SURPRISEMERCS", 0, 0);
        }
        local_14 = 0x13;
        if (DAT_00655b8d === 0) {
          iVar6 = _rand();
          if (iVar6 % 3 === 0) {
            local_14 = 0x10;
          } else {
            local_14 = 0x0f;
          }
          if (DAT_00655bc2 !== 0) {
            uVar7 = _rand();
            if ((uVar7 & 1) !== 0) {
              local_14 = 0x11;
            }
          }
        }
        if (DAT_00655bb9 !== 0) {
          local_14 = 0x12;
        }
        if (DAT_00655bac !== 0) {
          local_14 = 0x14;
        }
        if (DAT_00655b93 !== 0) {
          local_14 = 0x0b;
        }
        local_c = 8;
        if (DAT_00655ba4 === 0) {
          local_c = 7;
        }
        if (DAT_00655ba5 === 0) {
          local_c = 5;
        }
        if (DAT_00655ba9 === 0) {
          local_c = 4;
        }
        uVar7 = _rand();
        if ((uVar7 & 1) === 0) {
          local_60 = local_14;
        } else {
          local_60 = local_c;
        }
        iVar6 = FUN_005b3d06(local_60, uVar3, iVar4, uVar5);
        if ((DAT_006ad0d0 === 0) && (DAT_006d1da0 !== uVar3)) {
          local_50 = uVar3;
          if (-1 < iVar6) {
            local_50 = iVar6 * 0x20;
            // (&DAT_00656100)[local_50] = 0xff — set unit home city to -1
            set_unit_byte(0x10, iVar6, 0xff);
          }
        } else {
          FUN_0047cf22(iVar4, uVar5);
          local_50 = FUN_0046b14d(0x75, 0xff, iVar4, uVar5, 0, 0, 0, 0, 0, 0);
        }
        break;

      case 2:
        local_20 = 0x32;
        iVar4 = _rand();
        if (iVar4 % 3 === 0) {
          iVar4 = _rand();
          if ((iVar4 % 10 - DAT_00655b08 + 2) < 5) {
            local_20 = 0x19;
          } else {
            local_20 = 100;
          }
        }
        if (1000 < DAT_00655afa) {
          local_20 = local_20 << 1;
        }
        // *(int *)(&DAT_0064c6a2 + uVar3 * 0x594) += local_20  — add gold to treasury
        // DEVIATION: would need civ treasury write
        FUN_00421da0(0, local_20);
        if (DAT_006ad0d0 !== 0) {
          FUN_00410030("SURPRISEMETALS", 0, 0);
        }
        if (DAT_006d1da0 !== uVar3) {
          return uVar3;
        }
        uVar3 = FUN_00569363(1);
        return uVar3;

      case 3:
        if ((DAT_0063f660 < 4) ||
           ((city_short(0x108, uVar3) === 0) && (DAT_00655af8 < 0x32))) {
          local_50 = 1;
          done = false;
          break;
        }
        if (((1 << (bVar2 & 0x1f) & DAT_00655b0b) === 0) &&
           (u8(DAT_00655c22[uVar3]) < u8(DAT_00655c22[DAT_00655c21]))) {
          uVar7 = _rand();
          if ((uVar7 & 7) < DAT_00655b08) {
            local_50 = 0;
            done = false;
            break;
          }
        }
        bVar1 = false;
        if (DAT_00655b09 < 3) {
          if (DAT_00655af8 < 0x1e) {
            // goto LAB_0058f87c
            FUN_0043d07a(iVar4, uVar5, uVar3, -1, -1);
            iVar6 = FUN_005b8a81(iVar4, uVar5);
            if ((civ_byte(0x332, uVar3 * 0x594 + iVar6) !== 0) && (DAT_0063f660 < 0x18)) {
              if (DAT_006ad0d0 === 0) {
                return 0;
              }
              uVar3 = FUN_00410030("SURPRISENOTHING", 0, 0);
              return uVar3;
            }
          } else if (DAT_00655af8 < 0x32) {
            uVar7 = _rand();
            if ((uVar7 & 1) === 0) {
              // goto LAB_0058f87c
              FUN_0043d07a(iVar4, uVar5, uVar3, -1, -1);
              iVar6 = FUN_005b8a81(iVar4, uVar5);
              if ((civ_byte(0x332, uVar3 * 0x594 + iVar6) !== 0) && (DAT_0063f660 < 0x18)) {
                if (DAT_006ad0d0 === 0) {
                  return 0;
                }
                uVar3 = FUN_00410030("SURPRISENOTHING", 0, 0);
                return uVar3;
              }
            }
          }
        }
        if (0x31 < DAT_00655af8) {
          if (!(0x4a < DAT_00655af8)) {
            uVar7 = _rand();
            if ((uVar7 & 1) === 0) {
              bVar1 = true;
            }
          }
        } else {
          bVar1 = true;
        }
        // LAB_0058f939:
        uVar7 = 0;
        if (DAT_006ad0d0 !== 0) {
          uVar7 = FUN_00410030("SURPRISEBARB", 0, 0);
        }
        local_10 = 0;
        while (local_10 <= 7) {
          uVar7 = DAT_00655af8 + local_10;
          let dirIdx = ((uVar7 % 8) + 8) % 8;  // handle sign
          iVar6 = dirIdx;
          uVar8 = FUN_005ae052(s8(DAT_00628350[iVar6]) + iVar4);
          iVar6 = s8(DAT_00628360[iVar6]) + uVar5;
          iVar9 = FUN_004087c0(uVar8, iVar6);
          if ((((iVar9 !== 0) && (iVar9 = FUN_005b8d62(uVar8, iVar6), iVar9 < 0)) &&
              (iVar9 = FUN_005b8ca6(uVar8, iVar6), iVar9 < 0)) &&
             (iVar9 = FUN_005b89e4(uVar8, iVar6), iVar9 === 0)) {
            let bVar2_local = FUN_005b89bb(uVar8, iVar6);
            local_28 = 5;
            local_3c = 0x0f;
            if (DAT_00655bb5 !== 0) {
              local_28 = 7;
              local_3c = 0x13;
            }
            if (DAT_00655b82[DAT_0064b383] !== 0) {
              local_28 = 0x0b;
              local_3c = 0x15;
            }
            if (DAT_00655ba4 !== 0) {
              local_28 = 8;
              local_3c = 9;
            }
            if (s8(DAT_00627cc8_terrain_food[u8(bVar2_local) * 0x18]) < 3) {  // DEVIATION: terrain type check
              local_38 = local_3c;
            } else {
              local_38 = local_28;
            }
            uVar7 = FUN_005b3d06(local_38, 0, uVar8, iVar6);
            if (-1 < uVar7) {
              iVar9 = FUN_005b8931(iVar4, uVar5);
              // (&DAT_006560f9)[uVar7 * 0x20] |= visibility from tile
              // DEVIATION: would need tile visibility byte access
              FUN_0047cea6(uVar8, iVar6);
              uVar7 = DAT_00655b02;
              if (2 < DAT_00655b02) {
                uVar7 = FUN_0046b14d(0x72, 0xff, uVar8, iVar6, 0, 0, 0, 0, 0, 0);
              }
            }
            if (bVar1) {
              return uVar7;
            }
          }
          uVar7 = FUN_005adfa0(4 - city_short(0x108, uVar3), 1, 4);
          local_10 = local_10 + uVar7;
        }
        return uVar7;

      case 4:
        if ((DAT_00655af8 === 0) || (iVar6 = FUN_004bd9f0_stub(uVar3, 0x26), iVar6 !== 0)) {
          local_50 = 2;
          done = false;
        } else {
          local_40 = 0;
          local_4c = _rand();
          local_4c = local_4c % 100;
          do {
            iVar6 = FUN_004bfdbe(uVar3, local_4c);
            if (iVar6 === 0) {
              uVar7 = ((local_4c + 1) / 100) | 0;
              local_4c = (local_4c + 1) % 100;
            } else {
              if (DAT_006ad0d0 !== 0) {
                FUN_00410030("SURPRISESCROLLS", 0, 0);
              }
              uVar7 = FUN_004bf05b(uVar3, local_4c, uVar3, 0, 0);
              local_4c = -1;
            }
            local_40 = local_40 + 1;
          } while ((local_40 < 999) && (-1 < local_4c));
          if (local_4c < 0) {
            return uVar7;
          }
          local_50 = 0;
          done = false;
        }
        break;

      case 5:
        if (DAT_00655b9e === 0) {
          local_48 = 0;
          for (param_1 = 0; param_1 < DAT_00655b16; param_1 = param_1 + 1) {
            if ((((unit_int(0x1A, param_1) !== 0) &&
                 (s8(unit_byte(0x07, param_1)) === uVar3)) &&
                (utype_byte(0x0E, u8(unit_byte(0x06, param_1))) === 0x05)) &&
               (unit_byte(0x10, param_1) === 0xff)) {
              local_48 = local_48 + 1;
            }
          }
          if (local_48 <= (city_short(0x108, uVar3) >> 3)) {
            if (DAT_006ad0d0 !== 0) {
              FUN_00410030("SURPRISENOMADS", 0, 0);
            }
            iVar6 = FUN_005b3d06(0, uVar3, iVar4, uVar5);
            if (-1 < iVar6) {
              set_unit_byte(0x10, iVar6, 0xff);  // (&DAT_00656100)[iVar6 * 0x20] = 0xff
            }
            if (DAT_006ad0d0 === 0) {
              return 0;
            }
            FUN_0047cf22(iVar4, uVar5);
            uVar3 = FUN_0046b14d(0x75, 0xff, iVar4, uVar5, 0, 0, 0, 0, 0, 0);
            return uVar3;
          }
          local_50 = 4;
        } else {
          local_50 = 2;
        }
        done = false;
        break;

      default:
        break;
      }
    }
  }
  return local_50;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0058fda9 — reveal_map_around_city
// Source: block_00580000.c @ 0x0058FDA9, 306 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_0058fda9(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let local_8;

  iVar1 = FUN_005b89e4(param_1, param_2);
  FUN_005b9ec6();
  for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    uVar2 = FUN_005ae052(s8(DAT_00628350[local_8]) + param_1);
    iVar3 = s8(DAT_00628360[local_8]) + param_2;
    iVar4 = FUN_004087c0(uVar2, iVar3);
    if ((((iVar4 !== 0) && (iVar4 = FUN_005b89e4(uVar2, iVar3), iVar4 === iVar1)) &&
        (iVar4 = FUN_005b8d62(uVar2, iVar3), -1 < iVar4)) &&
       (FUN_004272d0(uVar2, iVar3, param_3), DAT_006d1da0 === param_3)) {
      FUN_0047ce1e(uVar2, iVar3, 0, param_3, 1);
      FUN_0046b14d(0x75, 0xff, uVar2, iVar3, 0, 0, 0, 0, 0, 0);
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

function FUN_0047ce1e(a, b, c, d, e) { /* redraw_tile — stub */ }
function FUN_0057e2c3(a) { return 1; /* get_attack_strength — stub */ }
function FUN_005b2c3d(a) { return 3; /* get_moves_remaining — stub */ }
function FUN_005b2e69(a, b) { return -1; /* find_top_unit_at — stub */ }
function FUN_0057e6e2(a, b) { return a; /* get_best_defender — stub */ }
function FUN_0057e33a(a, b, c) { return 1; /* get_defense_strength — stub */ }
function FUN_005b2a39(a) { return 3; /* get_total_moves — stub */ }
function FUN_005b29aa(a) { return 0; /* get_hit_points_remaining — stub */ }
function FUN_0043d20a(a, b) { return 0; /* city_has_building — stub */ }
function FUN_00453e51(a, b) { return 0; /* civ_has_wonder — stub */ }
function FUN_005b29d7(a) { return 1; /* is_unit_alive — stub */ }
function FUN_005b490e(a, b) { /* setup_combat_display — stub */ }
function FUN_004b0b53(a, b, c, d, e) { /* flush_messages — stub */ }
function FUN_004105f8(a, b, c) { return 0; /* check_can_see_tile — stub */ }
function FUN_0047cea6(a, b) { /* center_on_tile — stub */ }
function FUN_0046b14d(a, b, c, d, e, f, g, h, i, j) { /* send_mp_message — stub */ }
function FUN_005b5bab(a, b) { /* kill_unit — stub */ }
function FUN_0047bc59(a) { /* unknown — stub */ }
function FUN_0047cb26(a, b) { /* unknown — stub */ }
function FUN_0046e287(a) { /* play_sound_delay — stub */ }
function FUN_0043d07a(a, b, c, d, e) { return -1; /* find_city_near — stub */ }
function FUN_0040ff60(a, b) { /* set_dialog_text — stub */ }
function FUN_004442e0(a, b) { return 0; /* show_popup — stub */ }
function FUN_00511880(a, b, c, d, e, f) { /* send_mp_popup — stub */ }
function FUN_00410070(a) { return 0; /* get_civ_name — stub */ }
function FUN_004271e8(a, b) { /* set_dialog_icon — stub */ }
function FUN_004cc870(a, b, c) { /* show_advisor_message — stub */ }
function FUN_00493c7d(a) { return 0; /* get_civ_adjective — stub */ }
function FUN_0057ed3f(a, b, c) { /* show_combat_result — stub */ }
function FUN_0056c705(a, b, c, d, e, f) { /* animate_attack — stub */ }
function FUN_005b3ae0(a, b, c, d) { /* move_unit_to — stub */ }
function FUN_0057f9e3(a, b, c, d) { return 1; /* try_nuke — stub */ }
function FUN_005b4391(a, b) { /* destroy_unit — stub */ }
function FUN_0057febc(a, b, c) { /* handle_unit_after_combat — stub */ }
function FUN_0057ebfd(a) { /* try_veteran_promotion — stub */ }
function FUN_0057eb94(a, b, c, d) { /* combat_loser_cleanup — stub */ }
function FUN_0057e9f9(a, b, c, d) { /* combat_winner_advance — stub */ }
function FUN_005b8d15(a, b) { return -1; /* find_airbase_at — stub */ }
function FUN_005b8d62(a, b) { return -1; /* find_unit_at — stub */ }
function FUN_005b8a81(a, b) { return 0; /* get_continent_id — stub */ }
function FUN_0043cc00(a, b) { /* transfer_city — stub */ }
function FUN_00442541(a, b) { /* auto_manage_city — stub */ }
function FUN_005369f3(a) { /* city_celebration_check — stub */ }
function FUN_thunk_delete_city(a, b) { /* delete_city — stub */ }
function FUN_005b8b1a(a, b, c) { /* update_tile_ownership — stub */ }
function FUN_0047cf22(a, b) { /* refresh_map_area — stub */ }
function FUN_thunk_kill_civ(a, b) { return 0; /* kill_civ — stub */ }
function FUN_00421da0(a, b) { /* set_dialog_number — stub */ }
function FUN_00421ea0(a) { /* show_message — stub */ }
function FUN_004442a0(a, b, c) { return 0; /* show_confirm — stub */ }
function FUN_00569363(a) { return 0; /* update_treasury_display — stub */ }
function FUN_0045a8e3(a, b) { /* update_war_weariness — stub */ }
function FUN_0045b0d6(a, b) { /* propose_alliance_vs — stub */ }
function FUN_00436287(a) { /* flush_input — stub */ }
function FUN_00467825(a, b, c) { /* set_diplomatic_state — stub */ }
function FUN_00579ed0(a, b, c) { return 0; /* check_treaty — stub */ }
function FUN_00579c40(a, b) { return 0; /* check_war_allowed — stub */ }
function FUN_00492c15(a, b, c, d, e) { /* spy_action — stub */ }
function FUN_004933f2(a, b, c, d, e) { /* spy_action_2 — stub */ }
function FUN_0055f5a3(a, b) { /* revolution — stub */ }
function FUN_0046e020(a, b, c, d) { /* play_combat_sound — stub */ }
function FUN_005b6787(a) { /* wake_unit — stub */ }
function FUN_00421f10(a) { /* format_year_string — stub */ }
function FUN_00489859(a) { /* next_unit — stub */ }
function FUN_0041033a() { /* update_status_bar — stub */ }
function FUN_005b2f50(a) { /* start_exploration — stub */ }
function FUN_00421ed0(a, b, c, d) { return 0; /* show_name_dialog — stub */ }
function FUN_005ae1b0(a, b, c, d) { return 0; /* get_distance — stub */ }
function FUN_005b3d06(a, b, c, d) { return -1; /* create_unit — stub */ }
function FUN_004bf05b(a, b, c, d, e) { return 0; /* discover_tech — stub */ }
function FUN_004bfdbe(a, b) { return 0; /* can_discover_tech — stub */ }
function FUN_005adfa0(a, b, c) { return a; /* clamp — stub */ }
function FUN_005b50ad(a, b) { return 0; /* check_unit_order — stub */ }
function FUN_005b6aea(a, b) { return -1; /* select_next_unit — stub */ }
function FUN_004274a6(a, b) { /* activate_unit — stub */ }
function FUN_005b633f(a) { return 0; /* can_unit_act — stub */ }
function FUN_00489a0d(a) { /* set_selection_mode — stub */ }
function FUN_004c42a0(a, b) { /* issue_worker_order — stub */ }
function FUN_004c4d1e(a, b, c) { /* found_city — stub */ }
function FUN_004eb80a(a, b, c, d, e) { /* show_city_founded — stub */ }
function FUN_004904c0(a, b, c, d) { /* show_tutorial — stub */ }
function FUN_00509590(a) { /* handle_city_disorder — stub */ }
function FUN_004c50d0(a, b) { /* execute_pillage — stub */ }
function FUN_0045ac71(a, b, c) { /* declare_war — stub */ }
function FUN_004ca1cd(a, b, c, d, e) { /* execute_airlift — stub */ }
function FUN_00440750(a, b) { /* establish_trade_route — stub */ }
function FUN_004e7492(a) { /* refresh_city_window — stub */ }
function FUN_004c54da(a) { /* unit_homecoming — stub */ }
function FUN_004c4210(a, b) { /* show_city_full_msg — stub */ }
function FUN_004bd9f0_stub(a, b) { return 0; /* has_tech — stub */ }
function FUN_005b9ec6() { /* begin_map_update — stub */ }
function FUN_005b9f1c() { /* end_map_update — stub */ }
function FUN_004272d0(a, b, c) { /* set_tile_visibility — stub */ }
function FUN_00410030(a, b, c) { return 0; /* show_info_message — stub */ }
function FUN_005b8c42(a, b) { return 0; /* count_adjacent_land — stub */ }
function FUN_thunk_create_city(a, b, c) { return -1; /* create_city — stub */ }
function FUN_0043d289(a, b, c) { /* add_city_building — stub */ }
let DAT_00627cc8_terrain_food = new Int8Array(24 * 16); // terrain food yield table placeholder
function FUN_0040ffa0(a, b) { /* set_dialog_title — stub */ }
function FUN_00419d23() { /* unknown cosmic helper — stub */ }
function FUN_005bb574() { /* refresh_editor — stub */ }
function FUN_005c656b() { /* cleanup_editor — stub */ }
function FUN_005bd630() { return 0; /* create_editor_obj — stub */ }
function FUN_005bd915() { /* destroy_editor_obj — stub */ }
function FUN_0055339f() { /* static init helper — stub */ }
function FUN_0059062c(a, b, c) { /* set_unit_order — stub */ }
function FUN_00410e46() { /* paradrop_ui — stub */ }
function FUN_0043c9d0(a) { /* init_popup_menu — stub */ }
function FUN_0059ec88(a, b, c) { /* add_menu_items — stub */ }
function FUN_0043c810() { /* finalize_popup — stub */ }
function FUN_0059e18b(a, b, c, d, e) { /* add_menu_entry — stub */ }
function FUN_0059edf0(a, b, c) { /* add_list_entry — stub */ }
function FUN_0040bc80(a) { return -1; /* show_list_dialog — stub */ }
