// ═══════════════════════════════════════════════════════════════════
// fn_utils.js — Core utility functions used across many blocks
//
// Only functions that need special handling belong here.
// Tile functions (FUN_005b8931, FUN_005b89bb, etc.) are in their
// native blocks (block_005B0000, block_00580000) and imported via wiring.
//
// Source files:
//   block_00400000.c — FUN_004087c0
//   block_004B0000.c — FUN_004bd9f0
//   block_005A0000.c — FUN_005ae052
// ═══════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════
// FUN_004087c0 — is_tile_valid (bounds check)
// Source: block_00400000.c line 1250, 80 bytes
// ═══════════════════════════════════════════════════════════════════

export function FUN_004087c0(param_1, param_2) {
  let uVar1;

  if (param_2 < 0 || v(DAT_006d1162) <= param_2 || param_1 < 0 || v(DAT_006d1160) <= param_1) {
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
// On flat maps (DAT_00655ae8 bit 15 set), no wrapping occurs.
// ═══════════════════════════════════════════════════════════════════

export function FUN_005ae052(param_1) {
  if ((v(DAT_00655ae8) & 0x8000) === 0) {
    while (param_1 < 0) {
      param_1 = param_1 + v(DAT_006d1160);
    }
    while (v(DAT_006d1160) <= param_1) {
      param_1 = param_1 - v(DAT_006d1160);
    }
  }
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004bd9f0 — has_tech
// Source: block_004B0000.c line 5970, 181 bytes
//
// Returns 1 if civ param_1 has discovered tech param_2, else 0.
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
      const local_c = param_2 >> 3;
      const local_8 = 1 << (param_2 & 7);
      const techByte = _MEM[DAT_0064c6f8 + param_1 * 0x594 + local_c];
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
