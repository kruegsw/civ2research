// ═══════════════════════════════════════════════════════════════════
// block_00560000.js — Mechanical transpilation of block_00560000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00560000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00560000.c
// ═══════════════════════════════════════════════════════════════════


// Aliases for compatibility


// ============================================================
// FUN_00560084 — ai_diplomacy_turn_processing
// ============================================================

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00408090, FUN_004080f0, FUN_004083b0, FUN_004083f0, FUN_0040bbb0, FUN_0040bbe0 } from './block_00400000.js';
import { FUN_0040ff60 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070 } from './block_00410000.js';
import { FUN_00421da0, FUN_00421ea0, FUN_004271e8 } from './block_00420000.js';
import { FUN_0043c520, FUN_0043c690, FUN_0043c6c0, FUN_0043c840, FUN_0043cc00, FUN_0043d07a } from './block_00430000.js';
import { FUN_00453e51, FUN_00456f20, FUN_0045705e, FUN_00458a3b, FUN_00458df9, FUN_0045918e } from './block_00450000.js';
import { FUN_0045ac71 } from './block_00450000.js';
import { FUN_00467750, FUN_00467825, FUN_00467af0, FUN_0046b14d, FUN_0046e8f0, FUN_0046ee1e } from './block_00460000.js';
import { FUN_0047cea6, FUN_0047cf9e, FUN_0047e94e } from './block_00470000.js';
import { FUN_004897fa, FUN_00489a0d } from './block_00480000.js';
import { FUN_00493c7d } from './block_00490000.js';
import { FUN_004b0b53, FUN_004bdb2c, FUN_004bf05b } from './block_004B0000.js';
import { FUN_005013bc } from './block_00500000.js';
import { FUN_00511880 } from './block_00510000.js';
import { FUN_0055339f, FUN_0055bbc0, FUN_0055c69d, FUN_0055d1e2, FUN_0055d8d8, FUN_0055f7d1 } from './block_00550000.js';
import { FUN_005784a0 } from './block_00570000.js';
import { FUN_00598ceb, FUN_0059baf0 } from './block_00590000.js';
import { FUN_005adfa0 } from './block_005A0000.js';
import { FUN_005b2c82, FUN_005b2d39, FUN_005b36df, FUN_005b49cf, FUN_005b8d15, FUN_005b976d } from './block_005B0000.js';
import { FUN_005bad40, FUN_005bd630, FUN_005bd915 } from './block_005B0000.js';
import { FUN_005c64da, FUN_005c656b, FUN_005cde4d } from './block_005C0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

export function FUN_00560084(param_1) {
  let iVar1;
  let uVar2;
  let local_20;
  let local_14;
  let local_10;
  let local_c;

  // G.DAT_0064c6a0[param_1 * 0x594] &= 0xffb7
  let civ_flags = (G.DAT_0064c600[param_1 * 0x594 + 0xA0] | (G.DAT_0064c600[param_1 * 0x594 + 0xA1] << 8));
  civ_flags = civ_flags & 0xffb7;
  G.DAT_0064c600[param_1 * 0x594 + 0xA0] = civ_flags & 0xFF;
  G.DAT_0064c600[param_1 * 0x594 + 0xA1] = (civ_flags >> 8) & 0xFF;

  if (G.DAT_0064c600[param_1 * 0x594 + 0xB5] === 0) {
    if (((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) || ((G.DAT_00655af8 & 3) !== 0)) {
      if (((G.DAT_00655af8 & 3) === 0) || (iVar1 = FUN_00453e51(param_1, 0x13), iVar1 !== 0)) {
        if ((FUN_0055c69d(param_1, 1), (1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0)) {
          civ_flags = (G.DAT_0064c600[param_1 * 0x594 + 0xA0] | (G.DAT_0064c600[param_1 * 0x594 + 0xA1] << 8));
          civ_flags = civ_flags & 0xfffe;
          G.DAT_0064c600[param_1 * 0x594 + 0xA0] = civ_flags & 0xFF;
          G.DAT_0064c600[param_1 * 0x594 + 0xA1] = (civ_flags >> 8) & 0xFF;
        }
      }
    } else {
      civ_flags = (G.DAT_0064c600[param_1 * 0x594 + 0xA0] | (G.DAT_0064c600[param_1 * 0x594 + 0xA1] << 8));
      if ((civ_flags & 1) === 0) {
        FUN_0055c69d(param_1, 1);
      } else {
        civ_flags = civ_flags & 0xfffe;
        G.DAT_0064c600[param_1 * 0x594 + 0xA0] = civ_flags & 0xFF;
        G.DAT_0064c600[param_1 * 0x594 + 0xA1] = (civ_flags >> 8) & 0xFF;
      }
    }
  }

  civ_flags = (G.DAT_0064c600[param_1 * 0x594 + 0xA0] | (G.DAT_0064c600[param_1 * 0x594 + 0xA1] << 8));
  if (((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) && ((civ_flags & 1) !== 0)) {
    FUN_0055c69d(param_1, G.DAT_0064c600[param_1 * 0x594 + 0xB5]);
  }

  if (param_1 !== 0) {
    iVar1 = _rand();
    G.DAT_0064c600[param_1 * 0x594 + 0xB6] = s8(iVar1 % 100);
    iVar1 = _rand();
    if (iVar1 % 3 === 0) {
      civ_flags = (G.DAT_0064c600[param_1 * 0x594 + 0xA0] | (G.DAT_0064c600[param_1 * 0x594 + 0xA1] << 8));
      civ_flags = civ_flags ^ 4;
      G.DAT_0064c600[param_1 * 0x594 + 0xA0] = civ_flags & 0xFF;
      G.DAT_0064c600[param_1 * 0x594 + 0xA1] = (civ_flags >> 8) & 0xFF;
    }
    if (((G.DAT_00655af8 & 0xFFFF) % 3 === 0) && (G.DAT_0064c600[param_1 * 0x594 + 0xBF] !== 0)) {
      G.DAT_0064c600[param_1 * 0x594 + 0xBF] = G.DAT_0064c600[param_1 * 0x594 + 0xBF] - 1;
    }

    for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
      if (2 < G.DAT_00655b02) {
        FUN_0047e94e(1, 0);
      }
      if ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC1] & 0x40) === 0) {
        w32(G.DAT_006ab5c0, local_10 * 4, 0);
      } else {
        w32(G.DAT_006ab5c0, local_10 * 4, 1);
      }
      // Clear bits in diplomacy flags
      let dip_flags = read_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0);
      dip_flags = dip_flags & 0xff5fbfff;
      write_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0, dip_flags);

      if ((((1 << (u8(local_10) & 0x1f) & G.DAT_00655b0a) !== 0) && (local_10 !== param_1)) &&
         ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0)) {
        if ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC0] & 0x20) !== 0) {
          iVar1 = FUN_005adfa0(3 - (u8(G.DAT_0064c600[local_10 * 0x594 + 0xBE]) >> 2), 1, 3);
          if (iVar1 + -1 < 1) {
            local_20 = 0;
          } else {
            local_20 = _rand();
            local_20 = local_20 % iVar1;
          }
          if (local_20 === 0) {
            if ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC0] & 8) === 0) {
              dip_flags = read_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0);
              dip_flags = dip_flags & 0xffffffd9;
              dip_flags = dip_flags | 0x80840;
              write_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0, dip_flags);
              iVar1 = read_s16(G.DAT_0064c600, param_1 * 2 + local_10 * 0x594 + 0x482);
              if (iVar1 <= (G.DAT_00655af8 & 0xFFFF) - 8) {
                iVar1 = (G.DAT_00655af8 & 0xFFFF) - 8;
              }
              write_s16(G.DAT_0064c600, param_1 * 2 + local_10 * 0x594 + 0x482, iVar1);
            } else {
              FUN_00456f20(param_1, local_10, 100);
              write_s16(G.DAT_0064c600, param_1 * 2 + local_10 * 0x594 + 0x482, -1);
              dip_flags = read_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0);
              dip_flags = dip_flags & 0xffffffdf;
              write_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0, dip_flags);
            }
          }
        }

        if ((1 << (u8(local_10) & 0x1f) & G.DAT_00655b0b) === 0) {
          dip_flags = read_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0);
          dip_flags = dip_flags & 0xfffbffff;
          write_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0, dip_flags);

          if ((G.DAT_00655af8 & 0x1f) === 0) {
            if ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC2] & 8) === 0) {
              dip_flags = read_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0);
              dip_flags = dip_flags & 0xfffff7ff;
              write_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0, dip_flags);
            }
            dip_flags = read_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0);
            dip_flags = dip_flags & 0xfff7ffff;
            write_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0, dip_flags);
          }

          if ((G.DAT_00655af8 & 0xf) === 0) {
            if ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC1] & 4) === 0) {
              if ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC0] & 8) === 0) {
                if (((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC0] & 4) === 0) ||
                   ((G.DAT_00655af0 & 1) === 0)) {
                  if (((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC0] & 1) !== 0) &&
                     ((((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC1] & 0x20) !== 0 &&
                       ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC1] & 8) === 0)) &&
                      ((G.DAT_0064c600[local_10 * 0x594 + param_1 * 4 + 0xC1] & 8) === 0)))) {
                    if (((((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) &&
                         ((1 << (u8(local_10) & 0x1f) & G.DAT_00655b0b) === 0)) &&
                        (((G.DAT_0064c600[G.DAT_006d1da0 * 0x594 + param_1 * 4 + 0xC0] & 0x80) !== 0 ||
                         (((iVar1 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar1 !== 0 ||
                           (iVar1 = FUN_00453e51(G.DAT_006d1da0, 9), iVar1 !== 0)) ||
                          (((G.DAT_0064c600[G.DAT_006d1da0 * 0x594 + local_10 * 4 + 0xC0] & 0x80) !== 0 ||
                           (((iVar1 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar1 !== 0 ||
                             (iVar1 = FUN_00453e51(G.DAT_006d1da0, 9), iVar1 !== 0)) ||
                            (G.DAT_00655b07 !== 0)))))))))) && (G.DAT_00654fa8 === 0)) {
                      uVar2 = FUN_00493c7d(param_1);
                      FUN_0040ff60(0, uVar2);
                      uVar2 = FUN_00493c7d(local_10);
                      FUN_0040ff60(1, uVar2);
                      FUN_00410030(s_WARENDS_00633c4c, G.DAT_00647748, 0);
                    }
                    if (2 < G.DAT_00655b02) {
                      for (local_c = 1; local_c < 8; local_c = local_c + 1) {
                        if ((((1 << (u8(local_c) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                            (G.DAT_006d1da0 !== local_c)) &&
                           (((G.DAT_00655b07 !== 0 ||
                             (((G.DAT_0064c600[param_1 * 4 + local_c * 0x594 + 0xC0] & 0x80) !== 0 ||
                              ((G.DAT_0064c600[local_10 * 4 + local_c * 0x594 + 0xC0] & 0x80) !== 0)))) ||
                            ((iVar1 = FUN_00453e51(local_c, 0x18), iVar1 !== 0 ||
                             (iVar1 = FUN_00453e51(local_c, 9), iVar1 !== 0)))))) {
                          uVar2 = FUN_00493c7d(param_1);
                          FUN_0040ff60(0, uVar2);
                          uVar2 = FUN_00493c7d(local_10);
                          FUN_0040ff60(1, uVar2);
                          FUN_00511880(0x50, ri(G.DAT_006ad30c, G.DAT_006ad558[local_c] * 0x54), 2, 0, 0, 0);
                        }
                      }
                    }
                  }
                } else {
                  FUN_0055d8d8(param_1, local_10, 0, 0);
                }
              } else {
                FUN_0055d1e2(param_1, local_10);
              }
              if (((((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC0] & 1) !== 0) &&
                   ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC1] & 8) === 0)) &&
                  ((G.DAT_0064c600[local_10 * 0x594 + param_1 * 4 + 0xC1] & 8) === 0)) &&
                 (((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0 ||
                  ((1 << (u8(local_10) & 0x1f) & G.DAT_00655b0b) === 0)))) {
                FUN_00467750(param_1, local_10, 1);
              }
            }
            dip_flags = read_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0);
            dip_flags = dip_flags & 0xfffffbff;
            write_u32(G.DAT_0064c600, local_10 * 4 + param_1 * 0x594 + 0xC0, dip_flags);
          } else if ((((G.DAT_00655af8 & 7) === 0) &&
                   ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC0] & 8) !== 0)) &&
                  ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC1] & 4) === 0)) {
            FUN_0055d1e2(param_1, local_10);
          }
        }
      }
    }

    if ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0) {
      for (local_10 = 1; local_10 < 8; local_10 = local_10 + 1) {
        if (2 < G.DAT_00655b02) {
          FUN_0047e94e(1, 0);
        }
        if ((((1 << (u8(local_10) & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_00654fa8 === 0)) &&
           ((G.DAT_0064c600[local_10 * 4 + param_1 * 0x594 + 0xC0] & 1) !== 0)) {
          if (G.DAT_006d1da0 === local_10) {
            FUN_00560d95(param_1, local_10);
          } else if (2 < G.DAT_00655b02) {
            FUN_0046b14d(0xa0, ri(G.DAT_006ad30c, G.DAT_006ad558[local_10] * 0x54),
                         param_1, local_10, 0, 0, 0, 0, 0, 0);
          }
        }
      }
      FUN_0055f7d1(param_1);
      for (local_14 = 1; local_14 < 8; local_14 = local_14 + 1) {
        if (2 < G.DAT_00655b02) {
          FUN_0047e94e(1, 0);
        }
        if ((1 << (u8(local_14) & 0x1f) & G.DAT_00655b0b) !== 0) {
          if (G.DAT_006d1da0 === local_14) {
            FUN_00562021(param_1, local_14);
          } else if (2 < G.DAT_00655b02) {
            FUN_0046b14d(0xa1, ri(G.DAT_006ad30c, G.DAT_006ad558[local_14] * 0x54),
                         param_1, local_14, 0, 0, 0, 0, 0, 0);
          }
        }
      }
    }
  }
  return;
}


// ============================================================
// FUN_00560d95 — ai_diplomacy_human_interaction
// ============================================================

export function FUN_00560d95(param_1, param_2) {
  let iVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_20;
  let local_1c;
  let local_10;
  let local_c;
  let local_8;

  let skipUnitLoop = false; // flag for goto LAB_00561668 restructuring
  FUN_0055bbc0(param_1, param_2);
  iVar6 = G.DAT_006ab5e4;

  if ((G.DAT_00633ac8 !== 0) &&
     ((read_u32(G.DAT_0064c600, param_2 * 4 + param_1 * 0x594 + 0xC0) & 0x2008) === 0)) {
    iVar1 = read_s16(G.DAT_0064c600, G.DAT_006ab5e4 * 0x58 + 0x2D40);
    iVar2 = read_s16(G.DAT_0064c600, G.DAT_006ab5e4 * 0x58 + 0x2D42);

    if ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC0] & 4) === 0) {
      if (ri(G.DAT_006ab5c0, param_2 * 4) !== 0) {
        skipUnitLoop = true; // goto LAB_00561668
      } else {
        local_34 = G.DAT_006ab5e8;
        uVar4 = _rand();
        uVar7 = uVar4 >> 0x1f;
        local_2c = ((uVar4 ^ uVar7) - uVar7 & 1 ^ uVar7) - uVar7;
        if ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC0] & 0x10) !== 0) {
          G.DAT_006ab5ec = G.DAT_006ab5ec + 1;
        }
        if (2 < (u8(G.DAT_0064c600[param_2 * 0x594 + 0xBE]) + G.DAT_006ab5ec)) {
          if (u8(G.DAT_0064c600[param_2 * 0x594 + 0xBE]) + G.DAT_006ab5ec === 1 ||
              (u8(G.DAT_0064c600[param_2 * 0x594 + 0xBE]) + G.DAT_006ab5ec - 1) < 0) {
            local_38 = 0;
          } else {
            local_38 = _rand();
            local_38 = local_38 % (u8(G.DAT_0064c600[param_2 * 0x594 + 0xBE]) + G.DAT_006ab5ec);
          }
          if (1 < local_38) {
            local_2c = 0;
            FUN_00467825(param_1, param_2, 0x20);
          }
        }
        if ((G.DAT_00655af8 + param_1 & 3) === 0) {
          iVar5 = FUN_00458df9(param_2, param_1, iVar1, iVar2);
          if (iVar5 !== 0) {
            if (((1 << (u8(param_2) & 0x1f) & s8(G.DAT_0064c600[iVar6 * 0x58 + 0x2D4C])) === 0) &&
               (s8(G.DAT_0064c600[iVar6 * 0x58 + 0x2D48]) !== (param_2 & 0xff))) {
              FUN_0043cc00(iVar6, param_2);
              FUN_0047cea6(iVar1, iVar2);
            }
            FUN_0040ff60(1, DAT_0064c600_ref(iVar6 * 0x58 + 0x2D60));
            if (local_2c === 0) {
              FUN_00410030(s_NEARCITY_00633cc0, G.DAT_00647748, 0);
            } else {
              FUN_00410030(s_ADMIRECITY_00633cb4, G.DAT_00647748, 0);
            }
          }
          FUN_0045918e();
        }
      }
    } else {
      if (ri(G.DAT_006ab5c0, param_2 * 4) !== 0) {
        FUN_0040ff60(1, DAT_0064c600_ref(G.DAT_006ab5e4 * 0x58 + 0x2D60));
        uVar3 = FUN_00493c7d(param_1);
        FUN_0040ff60(2, uVar3);
        uVar3 = FUN_00410070(param_1);
        FUN_0040ff60(3, uVar3);
        FUN_00410030(s_TERMS_00633c54, G.DAT_006409d8, 0);
        skipUnitLoop = true; // goto LAB_00561668
      } else {
        if ((read_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482) < G.DAT_00655af8) &&
           (G.DAT_00655af8 - read_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482) < 3)) {
          skipUnitLoop = true; // goto LAB_00561668
        } else {
          if (G.DAT_006ab5ec === 0) {
            FUN_0045705e(param_2, param_1);
            FUN_00458a3b(param_2, param_1);
            if (((1 << (u8(param_2) & 0x1f) & s8(G.DAT_0064c600[iVar6 * 0x58 + 0x2D4C])) === 0) &&
               (s8(G.DAT_0064c600[iVar6 * 0x58 + 0x2D48]) !== (param_2 & 0xff))) {
              FUN_0043cc00(iVar6, param_2);
              FUN_005b976d(iVar1, iVar2, 1 << (u8(param_2) & 0x1f), 1, 1);
              FUN_0047cea6(iVar1, iVar2);
            }
            local_34 = G.DAT_006ab5e8 - 1;
            FUN_0040ff60(1, DAT_0064c600_ref(iVar6 * 0x58 + 0x2D60));
            if (G.DAT_00633ac8 < 2) {
              FUN_00410030(s_INTRUDER_00633c68, G.DAT_006409d8, 0);
            } else {
              FUN_00410030(s_INTRUDERS_00633c5c, G.DAT_006409d8, 0);
            }
            skipUnitLoop = true; // goto LAB_00561668
          } else {
            FUN_0045705e(param_2, param_1);
            FUN_00458a3b(param_2, param_1);
            if (((1 << (u8(param_2) & 0x1f) & s8(G.DAT_0064c600[iVar6 * 0x58 + 0x2D4C])) === 0) &&
               (s8(G.DAT_0064c600[iVar6 * 0x58 + 0x2D48]) !== (param_2 & 0xff))) {
              FUN_0043cc00(iVar6, param_2);
              FUN_005b976d(iVar1, iVar2, 1 << (u8(param_2) & 0x1f), 1, 1);
              FUN_0047cea6(iVar1, iVar2);
            }
            FUN_0040ff60(1, DAT_0064c600_ref(iVar6 * 0x58 + 0x2D60));
            if (G.DAT_00633ac8 < 2) {
              local_2c = FUN_00410030(s_VIOLATOR_00633c80, G.DAT_006409d8, 0);
            } else {
              local_2c = FUN_00410030(s_VIOLATORS_00633c74, G.DAT_006409d8, 0);
            }
            if (local_2c === 0) {
              for (local_30 = 0; local_30 < G.DAT_00655b16; local_30 = local_30 + 1) {
                if (((read_u32(G.DAT_006560f0, local_30 * 0x20 + 0x1A) !== 0) &&
                     ((read_u16(G.DAT_006560f0, local_30 * 0x20 + 0x04) & 4) !== 0))) {
                  let flags = read_u16(G.DAT_006560f0, local_30 * 0x20 + 0x04);
                  flags = flags & 0xfffb;
                  write_u16(G.DAT_006560f0, local_30 * 0x20 + 0x04, flags);
                  if ((s8(G.DAT_006560f0[local_30 * 0x20 + 0x07]) === param_2) &&
                     (iVar6 = FUN_0043d07a(read_s16(G.DAT_006560f0, local_30 * 0x20),
                                           read_s16(G.DAT_006560f0, local_30 * 0x20 + 0x02), param_2,
                                           -1, -1), -1 < iVar6)) {
                    FUN_005b36df(local_30, read_s16(G.DAT_0064c600, iVar6 * 0x58 + 0x2D40),
                                 read_s16(G.DAT_0064c600, iVar6 * 0x58 + 0x2D42), 1);
                    G.DAT_006560f0[local_30 * 0x20 + 0x09] = 0;
                    G.DAT_006560f0[local_30 * 0x20 + 0x0F] = 0xff;
                    if (G.DAT_0064b1bc[u8(G.DAT_006560f0[local_30 * 0x20 + 0x06]) * 0x14 + 0x07] !== 0) {
                      G.DAT_006560f0[local_30 * 0x20 + 0x0D] = 0;
                    }
                  }
                }
              }
              FUN_0047cf9e(G.DAT_006d1da0, 1);
              FUN_00421da0(0, G.DAT_006ab5e0);
              FUN_0040bbb0();
              FUN_0040bbe0(s_WITHDRAWN_00633c8c);
              if (G.DAT_006ab5e0 === 1) {
                FUN_0040bbe0(G.DAT_00633c98);
              }
              FUN_00410030(G.DAT_00679640, G.DAT_006409d8, 0);
            } else {
              if (G.DAT_0064c600[param_2 * 0x594 + 0xB5] === 6) {
                // LAB_00561364
                if (((G.DAT_00655af0 & 0x80) === 0) || ((G.DAT_0064bc60 & 1) === 0)) {
                  uVar3 = FUN_00410070(param_2);
                  FUN_0040ff60(0, uVar3);
                  FUN_00421ea0(s_SENATESCANDAL_00633c9c);
                  FUN_0055c69d(param_2, 0);
                }
              } else {
                uVar4 = _rand();
                uVar7 = uVar4 >> 0x1f;
                if ((((uVar4 ^ uVar7) - uVar7 & 1 ^ uVar7) !== uVar7) &&
                   (G.DAT_0064c600[param_2 * 0x594 + 0xB5] === 5)) {
                  // LAB_00561364
                  if (((G.DAT_00655af0 & 0x80) === 0) || ((G.DAT_0064bc60 & 1) === 0)) {
                    uVar3 = FUN_00410070(param_2);
                    FUN_0040ff60(0, uVar3);
                    FUN_00421ea0(s_SENATESCANDAL_00633c9c);
                    FUN_0055c69d(param_2, 0);
                  }
                }
              }
              FUN_00456f20(param_1, param_2, 0x32);
              FUN_0045ac71(param_2, param_1, -1);
              uVar3 = FUN_00493c7d(param_1);
              FUN_0040ff60(1, uVar3);
              FUN_00410030(s_VIOLATE_00633cac, G.DAT_00644e48, 0);
            }
            FUN_0045918e();
          }
        }
      }
    }
  }

  // Clear unit territory violation flags (skipped if goto LAB_00561668 was taken)
  if (!skipUnitLoop)
  for (local_30 = 0; local_30 < G.DAT_00655b16; local_30 = local_30 + 1) {
    if (read_u32(G.DAT_006560f0, local_30 * 0x20 + 0x1A) !== 0) {
      let flags = read_u16(G.DAT_006560f0, local_30 * 0x20 + 0x04);
      flags = flags & 0xfffb;
      write_u16(G.DAT_006560f0, local_30 * 0x20 + 0x04, flags);
    }
  }

  // LAB_00561668:
  local_c = 0;
  local_1c = 0;
  local_8 = 0;
  for (local_28 = 1; local_28 < 8; local_28 = local_28 + 1) {
    if (u8(G.DAT_0064c600[param_2 * 0x594 + 0xB0]) < u8(G.DAT_0064c600[local_28 * 0x594 + 0xB0])) {
      local_1c = local_1c + 1;
    }
    iVar6 = FUN_00467af0(param_1, local_28);
    if (iVar6 !== 0) {
      local_c = local_c + 1;
    }
    iVar6 = local_8;
    if (((G.DAT_0064c600[local_28 * 0x594 + param_2 * 4 + 0xC1] & 0x20) !== 0) &&
       (iVar6 = local_8 + 1,
       read_u16(G.DAT_0064c600, param_2 * 0x594 + 0x10E) < read_u16(G.DAT_0064c600, local_28 * 0x594 + 0x10E))) {
      iVar6 = local_8 + 2;
    }
    local_8 = iVar6;
  }

  if ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC0] & 8) !== 0) {
    if (local_c === 0) {
      if (read_s32(G.DAT_0064c600, param_1 * 0x594 + 0xA2) < read_s32(G.DAT_0064c600, param_2 * 0x594 + 0xA2)) {
        local_34 = local_34 + 1;
      }
      if ((u8(G.DAT_0064c600[param_1 * 0x594 + 0xB0]) < u8(G.DAT_0064c600[param_2 * 0x594 + 0xB0])) &&
         (G.DAT_00655b08 !== 0)) {
        local_34 = local_34 + 1;
      }
      if (u8(G.DAT_0064c600[param_2 * 0x594 + 0xB0]) < u8(G.DAT_0064c600[param_1 * 0x594 + 0xB0])) {
        local_34 = local_34 - 1;
      }
      if (read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E) <
          read_u16(G.DAT_0064c600, param_2 * 0x594 + 0x10E)) {
        local_34 = local_34 + 1;
      }
      if (read_u16(G.DAT_0064c600, param_2 * 0x594 + 0x10E) <
          read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E)) {
        local_34 = local_34 - 1;
      }
    } else if ((s8(G.DAT_006554f8[read_s16(G.DAT_0064c600, param_1 * 0x594 + 0xA6) * 0x30]) < 1) ||
            (1 < local_c)) {
      iVar6 = (local_c - s8(G.DAT_006554f8[read_s16(G.DAT_0064c600, param_1 * 0x594 + 0xA6) * 0x30])) - 1;
      if (iVar6 < 2) {
        iVar6 = 1;
      }
      local_34 = local_34 - iVar6;
    }
    if (u8(G.DAT_0064c600[param_1 * 0x594 + 0xB0]) + 8 < u8(G.DAT_0064c600[param_2 * 0x594 + 0xB0])) {
      local_34 = local_34 + 1;
    }
  }

  if ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC0] & 4) !== 0) {
    local_34 = local_34 - 2;
  }
  if ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC1] & 0x20) === 0) {
    local_34 = local_34 - 1;
  }
  if ((u8(G.DAT_00655c22[param_2]) < 7) && (200 < G.DAT_00655af8)) {
    local_10 = 7 - u8(G.DAT_00655c22[param_2]);
    iVar6 = FUN_00598ceb();
    if (iVar6 !== 0) {
      local_10 = 1;
    }
    if (G.DAT_00655af8 < 400) {
      local_10 = local_10 + 1 >> 1;
    }
    local_34 = local_34 - local_10;
  }
  if ((((G.DAT_00655c22[param_2] === 7) && (3 < read_s16(G.DAT_0064c600, param_2 * 0x594 + 0x108))) &&
      (200 < G.DAT_00655af8)) && (G.DAT_00655b08 !== 0)) {
    local_10 = (G.DAT_00655b08 / 3 | 0) + 1;
    if (((u8(G.DAT_0064c600[param_2 * 0x594 + 0xBE]) -
          s8(G.DAT_0064c600[param_1 * 0x594 + param_2 + 0xE8])) <= local_8) &&
       ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC0] & 0x10) === 0)) {
      local_10 = local_10 >> 1;
    }
    local_34 = local_34 + local_10;
  }

  iVar6 = local_34;
  if (((G.DAT_0064c600[param_2 * 0x594 + 0x1A5] !== 0) &&
      (iVar6 = local_34 - 1, G.DAT_0064c600[param_1 * 0x594 + 0x1A5] === 0)) && (0 < iVar6)) {
    iVar6 = local_34 - 2;
  }
  local_34 = iVar6;

  iVar6 = s8(G.DAT_006554f8[read_s16(G.DAT_0064c600, param_1 * 0x594 + 0xA6) * 0x30]) * 3 +
          s8(G.DAT_006554f8[read_s16(G.DAT_0064c600, param_1 * 0x594 + 0xA6) * 0x30 + 1]) * 2;
  if (iVar6 < -1) {
    iVar6 = -2;
  }

  local_20 = u8(G.DAT_00655c22[param_2]) - u8(G.DAT_00655c22[param_1]);
  if (local_20 < 0) {
    local_20 = local_20 / 2 | 0;
  } else if ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC0] & 8) === 0) {
    local_20 = local_20 / 2 | 0;
  }

  local_34 = local_34 + iVar6 + local_20;

  if (((G.DAT_00655af0 & 1) === 0) ||
     (((u8(G.DAT_0064c600[param_2 * 0x594 + 0xBE]) -
        s8(G.DAT_0064c600[param_1 * 0x594 + param_2 + 0xE8])) <= local_8 &&
      ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC0] & 0x10) === 0)))) {
    if (read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E) * 4 <
        read_u16(G.DAT_0064c600, param_2 * 0x594 + 0x10E)) {
      local_34 = local_34 - 1;
    }
    if (read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E) * 2 <
        read_u16(G.DAT_0064c600, param_2 * 0x594 + 0x10E)) {
      local_34 = local_34 - 1;
    }
    if ((read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E) * 3 / 2 | 0) <
        read_u16(G.DAT_0064c600, param_2 * 0x594 + 0x10E)) {
      local_34 = local_34 - 1;
    }
  }

  if ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC0] & 8) === 0) {
    if (read_u16(G.DAT_0064c600, param_2 * 0x594 + 0x10E) < read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E)) {
      local_34 = local_34 + 1;
    }
    if (read_u16(G.DAT_0064c600, param_2 * 0x594 + 0x10E) * 2 <
        read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E)) {
      local_34 = local_34 + 1;
    }
  }

  iVar6 = FUN_00453e51(param_2, 6);
  if ((iVar6 !== 0) || (iVar6 = FUN_00453e51(param_2, 0x18), iVar6 !== 0)) {
    if (local_34 < 1) {
      local_34 = local_34 - 1;
    } else {
      local_34 = local_34 >> 1;
    }
  }
  if (local_1c === 0) {
    local_34 = local_34 + 1;
  }
  if (u8(G.DAT_0064c600[param_1 * 0x594 + 0xB0]) < u8(G.DAT_0064c600[param_2 * 0x594 + 0xB0])) {
    local_34 = local_34 +
               (1 - s8(G.DAT_006554f8[read_s16(G.DAT_0064c600, param_1 * 0x594 + 0xA6) * 0x30 + 2]));
  }
  if (((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC1] & 0x20) !== 0) && (local_34 < 1)) {
    local_34 = 0;
  }

  iVar6 = FUN_00453e51(param_1, 0x14);
  if (iVar6 !== 0) {
    local_34 = local_34 + 1;
  }
  iVar1 = FUN_00453e51(param_2, 0x14);
  iVar6 = local_34;
  if (iVar1 !== 0) {
    if (0 < local_34) {
      local_34 = local_34 / 2 | 0;
    }
    iVar6 = local_34 - 1;
    if (-1 < local_34 - 1) {
      iVar6 = local_34 - 2;
    }
  }
  local_34 = iVar6;
  if ((G.DAT_0064c600[param_2 * 4 + param_1 * 0x594 + 0xC0] & 1) === 0) {
    local_34 = 0;
  }
  FUN_00456f20(param_1, param_2, local_34);
  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
  return;
}


// ============================================================
// FUN_00562021 — ai_diplomacy_third_party
// ============================================================

export function FUN_00562021(param_1, param_2) {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_6c;
  let local_64;
  let local_60;
  let local_5c = new Uint8Array(80);
  let local_c;
  let local_8;

  if (((G.DAT_00655af8 & 0x1f) === param_1 << 2) &&
     ((u8(G.DAT_0064c600[param_2 * 0x594 + 0xBE]) -
       s8(G.DAT_0064c600[param_1 * 0x594 + param_2 + 0xE8])) < 6)) {
    for (local_64 = 1; local_64 < 8; local_64 = local_64 + 1) {
      if (((local_64 !== param_1) && (local_64 !== param_2)) &&
         ((1 << (u8(local_64) & 0x1f) & G.DAT_00655b0a) !== 0)) {
        if ((((G.DAT_0064c600[param_1 * 0x594 + local_64 * 4 + 0xC1] & 2) !== 0) &&
            ((read_u32(G.DAT_0064c600, param_1 * 0x594 + param_2 * 4 + 0xC0) & 0x2008) === 0)) &&
           ((iVar1 = FUN_00467af0(param_2, local_64), iVar1 === 0 &&
            (((G.DAT_0064c600[param_1 * 4 + param_2 * 0x594 + 0xC0] & 1) !== 0 &&
             ((G.DAT_0064c600[local_64 * 4 + param_2 * 0x594 + 0xC0] & 1) !== 0)))))) {
          if (read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E) * 2 -
              read_u16(G.DAT_0064c600, local_64 * 0x594 + 0x10E) === 0 ||
              read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E) * 2 <
              read_u16(G.DAT_0064c600, local_64 * 0x594 + 0x10E)) {
            iVar1 = FUN_00458df9(param_2, param_1, -1, -1);
            if (iVar1 === 0) {
              iVar1 = read_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482);
              if (iVar1 <= G.DAT_00655af8 - 0xf) {
                iVar1 = G.DAT_00655af8 - 0xf;
              }
              write_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482, iVar1);
            } else {
              iVar1 = FUN_005adfa0(read_s32(G.DAT_0064c600, param_1 * 0x594 + 0xA2) / 100 | 0, 1, 10);
              local_60 = -1;
              local_c = -99;
              for (local_6c = 0; local_6c < 100; local_6c = local_6c + 1) {
                if (((((G.DAT_0062768e[local_6c * 0x10] !== 0xFE) ||
                      (G.DAT_0062768e[local_6c * 0x10 + 1] !== 0xFE)) &&
                     (iVar2 = FUN_004bd9f0(param_2, local_6c), iVar2 === 0)) &&
                    ((iVar2 = FUN_004bd9f0(param_1, local_6c), iVar2 !== 0 ||
                     (((iVar2 = FUN_004bd9f0(local_64, local_6c), iVar2 !== 0 &&
                       ((G.DAT_0064c600[G.DAT_006d1da0 * 0x594 + param_1 * 4 + 0xC0] & 0x80) === 0)) &&
                      ((iVar2 = FUN_00453e51(G.DAT_006d1da0, 0x18), iVar2 === 0 &&
                       (iVar2 = FUN_00453e51(G.DAT_006d1da0, 9), iVar2 === 0)))))))) &&
                   (local_8 = FUN_004bdb2c(param_2, local_6c), local_c < local_8)) {
                  local_60 = local_6c;
                  local_c = local_8;
                }
              }
              uVar3 = FUN_00493c7d(local_64);
              FUN_0040ff60(1, uVar3);
              FUN_00421da0(0, iVar1 * 0x32);
              FUN_005f22d0(local_5c, s_HELPME_00633ccc);
              if ((G.DAT_0064c600[local_64 * 4 + param_2 * 0x594 + 0xC0] & 8) !== 0) {
                FUN_0043c840(local_5c, s_INSTEAD_00633cd4);
              }
              if (-1 < local_60) {
                FUN_0043c840(local_5c, G.DAT_00633cdc);
                FUN_004271e8(2, ri(G.DAT_00627684, local_60 * 0x10));
              }
              iVar2 = FUN_00410030(local_5c, G.DAT_0063fc98, 0);
              if (iVar2 === 0) {
                iVar1 = read_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482);
                if (iVar1 <= G.DAT_00655af8 - 0xe) {
                  iVar1 = G.DAT_00655af8 - 0xe;
                }
                write_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482, iVar1);
              } else {
                if (-1 < local_60) {
                  iVar2 = FUN_004bd9f0(param_1, local_60);
                  if (iVar2 === 0) {
                    FUN_004bf05b(param_1, local_60, local_64, 0, 0);
                  }
                  FUN_004bf05b(param_2, local_60, param_1, 0, 0);
                }
                FUN_00467825(param_1, param_2, 0xc);
                FUN_0045ac71(param_2, local_64, param_1);
                FUN_00467825(param_2, local_64, 0x2000);
                let flags = read_u32(G.DAT_0064c600, local_64 * 4 + param_2 * 0x594 + 0xC0);
                flags = flags | 0x80800;
                write_u32(G.DAT_0064c600, local_64 * 4 + param_2 * 0x594 + 0xC0, flags);
                write_s16(G.DAT_0064c600, local_64 * 2 + param_2 * 0x594 + 0x482, G.DAT_00655af8);
                write_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482, G.DAT_00655af8 + 0x10);
                let treasury1 = read_s32(G.DAT_0064c600, param_1 * 0x594 + 0xA2);
                treasury1 = treasury1 + iVar1 * -0x32;
                write_s32(G.DAT_0064c600, param_1 * 0x594 + 0xA2, treasury1);
                let treasury2 = read_s32(G.DAT_0064c600, param_2 * 0x594 + 0xA2);
                treasury2 = treasury2 + iVar1 * 0x32;
                write_s32(G.DAT_0064c600, param_2 * 0x594 + 0xA2, treasury2);
                FUN_0056a65e(1);
              }
            }
            FUN_0045918e();
            return;
          }
          if ((read_u16(G.DAT_0064c600, param_1 * 0x594 + 0x10E) <
               read_u16(G.DAT_0064c600, local_64 * 0x594 + 0x10E)) &&
             ((u8(G.DAT_00655c22[param_2]) < 6 || (u8(G.DAT_00655c22[param_1]) < 6)))) {
            iVar1 = FUN_00458df9(param_2, param_1, -1, -1);
            if (iVar1 === 0) {
              iVar1 = read_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482);
              if (iVar1 <= G.DAT_00655af8 - 0xf) {
                iVar1 = G.DAT_00655af8 - 0xf;
              }
              write_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482, iVar1);
            } else {
              uVar3 = FUN_00493c7d(local_64);
              FUN_0040ff60(1, uVar3);
              FUN_004271e8(2, ri(G.DAT_00628420,
                (((read_u32(G.DAT_0064c600, param_1 * 0x594 + param_2 * 4 + 0xC0) & 8) === 0 ? 1 : 0) + 0x73) * 4));
              FUN_005f22d0(local_5c, s_CRUSADE_00633ce0);
              if ((G.DAT_0064c600[local_64 * 4 + param_2 * 0x594 + 0xC0] & 8) !== 0) {
                FUN_005f22d0(local_5c, s_JIHAD_00633ce8);
              }
              iVar1 = FUN_00410030(local_5c, G.DAT_0063fc98, 0);
              if (iVar1 === 0) {
                iVar1 = read_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482);
                if (iVar1 <= G.DAT_00655af8 - 0xe) {
                  iVar1 = G.DAT_00655af8 - 0xe;
                }
                write_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482, iVar1);
              } else {
                FUN_00467825(param_1, param_2, 0xc);
                FUN_0045ac71(param_2, local_64, param_1);
                write_s16(G.DAT_0064c600, param_1 * 2 + param_2 * 0x594 + 0x482, G.DAT_00655af8 + 0x10);
                FUN_00467825(param_2, local_64, 0x2000);
                let flags = read_u32(G.DAT_0064c600, local_64 * 4 + param_2 * 0x594 + 0xC0);
                flags = flags | 0x80800;
                write_u32(G.DAT_0064c600, local_64 * 4 + param_2 * 0x594 + 0xC0, flags);
                write_s16(G.DAT_0064c600, local_64 * 2 + param_2 * 0x594 + 0x482, G.DAT_00655af8);
              }
            }
            FUN_0045918e();
            return;
          }
        }
        let flags = read_u32(G.DAT_0064c600, param_1 * 0x594 + local_64 * 4 + 0xC0);
        flags = flags & 0xfffffdff;
        write_u32(G.DAT_0064c600, param_1 * 0x594 + local_64 * 4 + 0xC0, flags);
        if (2 < G.DAT_00655b02) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          XD_FlushSendBuffer(5000);
        }
      }
    }
  }
  return;
}


// ============================================================
// FUN_00564470 — check_cdrom (Win32 API)
// ============================================================

export function FUN_00564470(param_1) {
  // DEVIATION: Win32 API (GetModuleFileNameA, lstrlenA, CD-ROM loop with FUN_0056459f/FUN_00421e70)
  return 1;
}


// ============================================================
// FUN_00564549 — is_cdrom_path_empty
// ============================================================

export function FUN_00564549() {
  return (G.DAT_006ab680 === 0) ? 1 : 0; // C: bool return = int 0/1
}


// ============================================================
// FUN_00564574 — get_cdrom_path
// ============================================================

export function FUN_00564574() {
  let puVar1;
  if (G.DAT_006ab680 === 0) {
    puVar1 = null;
  } else {
    puVar1 = G.DAT_006ab680;
  }
  return puVar1;
}


// ============================================================
// FUN_0056459f — detect_cdrom_drive (Win32 API)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056459f (354 bytes)
export function FUN_0056459f(param_1) {
  // DEVIATION: Win32 SetErrorMode/GetLogicalDrives/GetDriveTypeA/OpenFile — CD-ROM detection
  return null;
}


// ============================================================
// FUN_00564713 — find_file_on_cdrom (Win32 API)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00564713 (831 bytes)
export function FUN_00564713(param_1) {
  // DEVIATION: Win32 lstrlenA/OpenFile/SetErrorMode — CD-ROM file path resolution
  return 0;
}


// ============================================================
// FUN_00564bf0 — parse_number_with_prefix
// ============================================================

export function FUN_00564bf0(param_1) {
  let local_8;

  if (param_1[0] === '0') {
    let cVar1 = param_1[1].toUpperCase();
    if (cVar1 === 'X') {
      local_8 = FUN_0046e8f0(param_1.substring(2));
    } else if (cVar1 === 'B') {
      local_8 = FUN_005bad40(param_1.substring(2));
    } else if (cVar1 === 'D') {
      local_8 = parseInt(param_1.substring(2), 10);
    } else {
      local_8 = parseInt(param_1, 10);
    }
  } else {
    local_8 = parseInt(param_1, 10);
  }
  return local_8;
}


// ============================================================
// FUN_00564d00 — UI listbox init (MFC, uses ECX/this pointer)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00564d00 (365 bytes)
export function FUN_00564d00() {
  // DEVIATION: MFC in_ECX/this — listbox/scroll bar init via CPropertySheet
  return;
}


// ============================================================
// FUN_00564e6d — pedia_draw_tech_tree (MFC UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00564e6d (5911 bytes)
export function FUN_00564e6d() {
  // DEVIATION: MFC in_ECX/this + Win32 SetRect — civilopedia tech tree page rendering
  return;
}


// ============================================================
// FUN_00566584 — pedia_navigate_to_item (MFC UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00566584 (342 bytes)
export function FUN_00566584(param_1) {
  // DEVIATION: MFC in_ECX/this + CPropertySheet — civilopedia item navigation
  return;
}


// ============================================================
// FUN_005666da — pedia_draw_tech_tree_2 (MFC UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_005666da (3551 bytes)
export function FUN_005666da() {
  // DEVIATION: MFC in_ECX/this + Win32 SetRect — civilopedia tech tree diagram drawing
  return;
}


// ============================================================
// FUN_005674b9 — draw_connector_lines (MFC UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_005674b9 (254 bytes)
export function FUN_005674b9(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 GDI — connector line drawing via FUN_005c19ad/FUN_005c11b2 pen/line calls
  return;
}


// ============================================================
// FUN_005675b7 — draw_horizontal_connector (MFC UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_005675b7 (138 bytes)
export function FUN_005675b7(param_1, param_2) {
  // DEVIATION: MFC in_ECX/this + Win32 GDI — horizontal connector line via FUN_005c19ad/FUN_005c11b2
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x005680A0 — static initializer
// ============================================================

export function FID_conflict___E31_005680a0() {
  FUN_005680ba();
  FUN_005680d4();
  return;
}


// ============================================================
// FUN_005680ba — init graphics subsystem wrapper
// ============================================================

export function FUN_005680ba() {
  FUN_005c64da();
  return;
}


// ============================================================
// FUN_005680d4 — register atexit handler
// ============================================================

// Source: decompiled/block_00560000.c FUN_005680d4 (29 bytes)
export function FUN_005680d4() {
  // DEVIATION: Win32 _atexit(FUN_005680f1) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_005680f1 — atexit cleanup handler
// ============================================================

export function FUN_005680f1() {
  FUN_005c656b();
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x0056810B — static initializer
// ============================================================

export function FID_conflict___E31_0056810b() {
  FUN_00568125();
  FUN_0056813f();
  return;
}


// ============================================================
// FUN_00568125 — init bitmap subsystem wrapper
// ============================================================

export function FUN_00568125() {
  FUN_005bd630();
  return;
}


// ============================================================
// FUN_0056813f — register atexit handler
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056813f (29 bytes)
export function FUN_0056813f() {
  // DEVIATION: Win32 _atexit(FUN_0056815c) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_0056815c — atexit cleanup handler
// ============================================================

export function FUN_0056815c() {
  FUN_005bd915();
  return;
}


// ============================================================
// FUN_00568176 — always_returns_1
// ============================================================

export function FUN_00568176() {
  return 1;
}


// ============================================================
// load_civ2_art_005681c9 — load civ2art.dll graphics
// ============================================================

export function load_civ2_art_005681c9() {
  // DEVIATION: Win32 API (LoadLibrary/DLL resource loading — civ2art.dll, SEH, FUN_005bf5e1 bitmap load)
  return;
}


// ============================================================
// FUN_00568348 — destructor wrapper (MFC)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00568348 (12 bytes)
export function FUN_00568348() {
  // DEVIATION: MFC _Timevec::~_Timevec destructor — C++ cleanup, no-op in JS
  return;
}


// ============================================================
// FUN_00568354 — cleanup wrapper
// ============================================================

export function FUN_00568354() {
  FUN_005cde4d();
  return;
}


// ============================================================
// FUN_0056835d — cleanup wrapper
// ============================================================

export function FUN_0056835d() {
  FUN_005bd915();
  return;
}


// ============================================================
// FUN_00568373 — SEH cleanup (Win32)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00568373 (14 bytes)
export function FUN_00568373() {
  // DEVIATION: Win32 SEH frame restore (*unaff_FS_OFFSET = ...) — no-op in JS
  return;
}


// ============================================================
// FUN_00568381 — refresh art resources
// ============================================================

export function FUN_00568381() {
  FUN_004083f0();
  FUN_0046ee1e();
  FUN_005683b5();
  return;
}


// ============================================================
// FUN_005683a5 — empty function (C body is just return)
// ============================================================

// Source: decompiled/block_00560000.c FUN_005683a5 (16 bytes)
export function FUN_005683a5() {
  // C source body is empty (just return) — intentional no-op
  return;
}


// ============================================================
// FUN_005683b5 — empty function (C body is just return)
// ============================================================

// Source: decompiled/block_00560000.c FUN_005683b5 (16 bytes)
export function FUN_005683b5() {
  // C source body is empty (just return) — intentional no-op
  return;
}


// ============================================================
// FUN_005683c5 — screen_transition_effect (Win32 GDI)
// ============================================================

export function FUN_005683c5(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 API (GDI screen transition — GlobalAlloc, SetRect, tile-based reveal animation, 1155 bytes)
  return 1;
}


// ============================================================
// FUN_00568861 — check_civ_has_advanced_tech_combo
// ============================================================

export function FUN_00568861(param_1) {
  let iVar1;

  iVar1 = FUN_004bd9f0(param_1, 5);
  if ((iVar1 !== 0) && (iVar1 = FUN_004bd9f0(param_1, 0x18), iVar1 !== 0)) {
    return 2;
  }
  iVar1 = FUN_004bd9f0(param_1, 0x3c);
  if ((iVar1 !== 0) && (iVar1 = FUN_004bd9f0(param_1, 0x26), iVar1 !== 0)) {
    return 1;
  }
  return 0;
}


// ============================================================
// FID_conflict___E31 @ 0x00568B00 — static initializer
// ============================================================

export function FID_conflict___E31_00568b00() {
  FUN_00568b1a();
  FUN_00568b34();
  return;
}


// ============================================================
// FUN_00568b1a — init wrapper
// ============================================================

export function FUN_00568b1a() {
  FUN_0055339f();
  return;
}


// ============================================================
// FUN_00568b34 — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_00568b34 (29 bytes)
export function FUN_00568b34() {
  // DEVIATION: Win32 _atexit(FUN_00568b51) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_00568b51 — atexit cleanup (MFC destructor)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00568b51 (26 bytes)
export function FUN_00568b51() {
  // DEVIATION: MFC COleCntrFrameWnd::~COleCntrFrameWnd(G.DAT_006abc68) — C++ destructor, no-op in JS
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x00568B6B — static initializer
// ============================================================

export function FID_conflict___E31_00568b6b() {
  FUN_00568b85();
  FUN_00568b9f();
  return;
}


// ============================================================
// FUN_00568b85 — init wrapper
// ============================================================

export function FUN_00568b85() {
  FUN_0043c690();
  return;
}


// ============================================================
// FUN_00568b9f — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_00568b9f (29 bytes)
export function FUN_00568b9f() {
  // DEVIATION: Win32 _atexit(FUN_00568bbc) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_00568bbc — atexit cleanup
// ============================================================

export function FUN_00568bbc() {
  FUN_0043c520();
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x00568BD6 — static initializer
// ============================================================

export function FID_conflict___E31_00568bd6() {
  FUN_00568bf0();
  FUN_00568c0a();
  return;
}


// ============================================================
// FUN_00568bf0 — init wrapper
// ============================================================

export function FUN_00568bf0() {
  FUN_0043c690();
  return;
}


// ============================================================
// FUN_00568c0a — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_00568c0a (29 bytes)
export function FUN_00568c0a() {
  // DEVIATION: Win32 _atexit(FUN_00568c27) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_00568c27 — atexit cleanup
// ============================================================

export function FUN_00568c27() {
  FUN_0043c520();
  return;
}


// ============================================================
// FUN_00568c41 — set_city_dialog_active
// ============================================================

export function FUN_00568c41() {
  G.DAT_00633e00 = 1;
  return;
}


// ============================================================
// FUN_00568c58 — close_city_dialog
// ============================================================

export function FUN_00568c58() {
  FUN_citywin_9545();
  G.DAT_00633e00 = 0;
  FUN_0056a787();
  return;
}


// ============================================================
// FUN_00568c7e — set_dialog_active_and_repaint
// ============================================================

export function FUN_00568c7e() {
  G.DAT_00633e00 = 1;
  FUN_00408090();
  return 0;
}


// ============================================================
// FUN_00568ca2 — calculate_sidebar_layout
// ============================================================

export function FUN_00568ca2() {
  let local_14;
  let local_10;
  let local_8;

  G.DAT_006abc38 = 0;
  local_8 = 2;
  local_10 = 2;
  G.DAT_006abc60 = 0;
  G.DAT_006abc58 = G.DAT_006abd94;
  local_14 = G.DAT_006abd98 - 0x28;
  G.DAT_006abf44 = 0x28;
  if ((0xf4 < G.DAT_006abd94) && (0x12e < local_14)) {
    local_10 = 4;
    G.DAT_006abf44 = 0x50;
    local_14 = G.DAT_006abd98 - 0x50;
  }
  if (((local_10 === 2) && (0xb9 < G.DAT_006abd94)) && (0xed < local_14)) {
    local_10 = 3;
    G.DAT_006abf44 = G.DAT_006abf44 + (G.DAT_006abf44 >> 1);
    local_14 = local_14 - 0x14;
  }
  G.DAT_006abf40 = 8;
  if (local_14 < 0xb2) {
    if (local_14 < 0x10) {
      G.DAT_006abc5c = 0;
    } else {
      G.DAT_006abc5c = local_14 - 8;
    }
  } else {
    G.DAT_006abc5c = local_14 - 8;
  }
  if ((local_10 === 4) && (0x128 < G.DAT_006abc5c)) {
    local_8 = 4;
  }
  if (((2 < local_10) && (local_8 === 2)) && (0xfe < G.DAT_006abc5c)) {
    local_8 = 3;
  }
  if (local_8 !== G.DAT_00633df8) {
    G.DAT_00633df8 = local_8;
    FUN_0043c6c0(0, local_8 * 0xb >> 1, 1);
  }
  if (local_10 !== G.DAT_00633df4) {
    G.DAT_00633df4 = local_10;
    FUN_0043c6c0(0, (local_10 * 0xb) >> 1, 1);
  }
  return;
}


// ============================================================
// FUN_00568e86 — draw_minimap_indicator (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00568e86 (189 bytes)
export function FUN_00568e86(param_1) {
  // DEVIATION: Win32 GDI — minimap indicator drawing, DC management via FUN_005c0073/FUN_005c0034
  return;
}


// ============================================================
// FUN_00568f43 — draw_status_bar (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00568f43 (474 bytes)
export function FUN_00568f43(param_1) {
  // DEVIATION: Win32 GDI — status bar text/bitmap drawing, FUN_005baeb0/FUN_005baec8 bitmap ops
  return;
}


// ============================================================
// FUN_0056911d — draw_coordinate_text (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056911d (132 bytes)
export function FUN_0056911d(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 GDI — coordinate text drawing, FUN_005b8a81 tile name + FUN_0043c8d0 text render
  return 0;
}


// ============================================================
// FUN_005691a1 — draw_unit_order_text (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_005691a1 (450 bytes)
export function FUN_005691a1(param_1) {
  // DEVIATION: Win32 GDI — unit order text display, reads unit/city data for status text
  return;
}


// ============================================================
// FUN_00569363 — draw_status_panel (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00569363 (1182 bytes)
export function FUN_00569363(param_1) {
  // DEVIATION: Win32 GDI — status panel rendering, civ stats display with bitmap ops
  return;
}


// ============================================================
// FUN_00569801 — draw_unit_info_panel (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00569801 (3672 bytes)
export function FUN_00569801() {
  // DEVIATION: Win32 GDI — unit info panel rendering with unit stack display. Game state: sets G.DAT_006abc38, G.DAT_006abc18-24, G.DAT_00633dfc
  return;
}


// ============================================================
// FUN_0056a65e — refresh_sidebar_display
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056a65e (297 bytes)
export function FUN_0056a65e(param_1) {
  // DEVIATION: Win32 GDI — sidebar refresh via bitmap ops, calls FUN_00568ca2/FUN_00569801
  return;
}


// ============================================================
// FUN_0056a787 — rebuild_sidebar_layout
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056a787 (516 bytes)
export function FUN_0056a787() {
  // DEVIATION: Win32 GDI — sidebar layout rebuild via rect/bitmap ops, calls FUN_0056a65e
  return;
}


// ============================================================
// FUN_0056a98b — handle_end_turn_button
// ============================================================

export function FUN_0056a98b() {
  if (G.DAT_0062edf8 === 0) {
    if ((G.DAT_00655aee & 1) === 0) {
      if (G.DAT_006d1da8 === 1) {
        FUN_004897fa(0);
      } else {
        FUN_00489a0d(1);
      }
    } else {
      G.DAT_0064b9bc = 0;
    }
  } else {
    FUN_005013bc();
  }
  return;
}


// ============================================================
// FUN_0056a9f4 — calculate_advisor_rect (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056a9f4 (139 bytes)
export function FUN_0056a9f4() {
  // DEVIATION: Win32 GDI — advisor window rect calculation via FUN_00407fc0/FUN_00407f90
  return;
}


// ============================================================
// FUN_0056aa7f — invalidate_advisor_area (UI)
// ============================================================

export function FUN_0056aa7f() {
  FUN_004080f0(G.DAT_00655334);
  return;
}


// ============================================================
// FUN_0056aaa5 — invalidate_advisor_area_2 (UI)
// ============================================================

export function FUN_0056aaa5() {
  FUN_004080f0(G.DAT_00655334);
  return;
}


// ============================================================
// FUN_0056aacb — setup_main_game_window (MFC UI)
// ============================================================

export function FUN_0056aacb() {
  // DEVIATION: Win32 API (MFC main game window — CPropertySheet, keyboard handlers, menu setup, 379 bytes)
  // Game state: sets G.DAT_00633e00 = 0, calls FUN_0056a9f4/FUN_005bb574
  G.DAT_00633e00 = 0;
  return;
}


// ============================================================
// FUN_0056ac46 — set_dialog_and_hide
// ============================================================

export function FUN_0056ac46() {
  G.DAT_00633e00 = 1;
  FUN_004083b0();
  return;
}


// ============================================================
// FUN_0056ac67 — draw_minimap_tooltip (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056ac67 (646 bytes)
export function FUN_0056ac67(param_1, param_2) {
  // DEVIATION: Win32 GDI — minimap tooltip rendering with mouse tracking. Game state: sets G.DAT_00633e04/e08/e0c, G.DAT_006abfb8-c4
  return;
}


// ============================================================
// FUN_0056aeed — atexit cleanup
// ============================================================

export function FUN_0056aeed() {
  FUN_005bd915();
  return;
}


// ============================================================
// FUN_0056b810 — strip_trailing_newline
// ============================================================

export function FUN_0056b810(param_1) {
  // C: pcVar1 = _strrchr(param_1, 10); if (pcVar1 != NULL) *pcVar1 = '\0'; return pcVar1;
  // DEVIATION: JS strings are immutable — returns truncated string or null (C returns pointer into string)
  let pcVar1;
  let idx = param_1.lastIndexOf('\n');
  if (idx !== -1) {
    pcVar1 = param_1.substring(0, idx);
  } else {
    pcVar1 = null;
  }
  return pcVar1;
}


// ============================================================
// FUN_0056b847 — append_newline
// ============================================================

export function FUN_0056b847(param_1) {
  // C: sVar1 = _strlen(param_1); param_1[sVar1] = '\n'; (param_1 + sVar1)[1] = '\0'; return;
  // DEVIATION: JS strings are immutable — C modifies in-place (void return), JS returns new string
  return param_1 + '\n';
}


// ============================================================
// FID_conflict___E31 @ 0x0056B8A0 — static initializer
// ============================================================

export function FID_conflict___E31_0056b8a0() {
  FUN_0056b8ba();
  FUN_0056b8d4();
  return;
}


// ============================================================
// FUN_0056b8ba — init wrapper
// ============================================================

export function FUN_0056b8ba() {
  FUN_0043c690();
  return;
}


// ============================================================
// FUN_0056b8d4 — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056b8d4 (29 bytes)
export function FUN_0056b8d4() {
  // DEVIATION: Win32 _atexit(FUN_0056b8f1) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_0056b8f1 — atexit cleanup
// ============================================================

export function FUN_0056b8f1() {
  FUN_0043c520();
  return;
}


// ============================================================
// FUN_0056b90b — set_font_size_for_unit (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056b90b (99 bytes)
export function FUN_0056b90b(param_1) {
  // DEVIATION: Win32 GDI — font size calculation via FUN_00472cf0/FUN_00417ef0, sets G.DAT_00633e3c
  return;
}


// ============================================================
// FUN_0056b96e — find_best_unit_to_display
// ============================================================

export function FUN_0056b96e(param_1) {
  let iVar1;
  let iVar2;
  let iVar3;
  let local_1c;
  let local_18;
  let local_c;

  local_c = -1;
  local_1c = -1;
  if (-1 < param_1) {
    iVar1 = read_s16(G.DAT_006560f0, param_1 * 0x20);
    iVar2 = read_s16(G.DAT_006560f0, param_1 * 0x20 + 0x02);
    iVar3 = FUN_004087c0(iVar1, iVar2);
    if (iVar3 !== 0) {
      FUN_005b89e4(iVar1, iVar2);
    }
    for (param_1 = FUN_005b2d39(param_1); -1 < param_1; param_1 = FUN_005b2c82(param_1)) {
      local_18 = 1;
      if (G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 0x06]) * 0x14 + 0x05] !== 0) {
        local_18 = 2;
      }
      if ((G.DAT_00655afe === param_1) &&
         (s8(G.DAT_006560f0[param_1 * 0x20 + 0x07]) === u8(G.DAT_006d1da0))) {
        local_18 = 4;
      }
      if ((G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 0x06]) * 0x14 + 0x05] === 1) &&
         (iVar3 = FUN_005b8d15(iVar1, iVar2), -1 < iVar3)) {
        local_18 = -1;
      }
      if (local_1c < local_18) {
        local_1c = local_18;
        local_c = param_1;
      }
    }
  }
  return local_c;
}


// ============================================================
// FUN_0056baff — draw_unit_sprite (UI rendering)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056baff (2803 bytes)
export function FUN_0056baff(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 GDI — unit sprite rendering with health bar, order icon, palette ops
  return;
}


// ============================================================
// FUN_0056c5fc — blit_with_clipping (GDI rendering)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056c5fc (265 bytes)
export function FUN_0056c5fc(param_1, param_2, param_3, param_4, param_5,
                             param_6, param_7, param_8, param_9, param_10, param_11, param_12) {
  // DEVIATION: Win32 GDI — bitmap blit with rect clipping, calls FUN_005a9afe
  return;
}


// ============================================================
// FUN_0056c705 — animate_unit_movement (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056c705 (2902 bytes)
export function FUN_0056c705(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 GDI + SEH + timeGetTime — unit movement animation. Game state: sets G.DAT_006ad908 = 1 then 0
  return;
}


// ============================================================
// FUN_0056d25b — vector destructor wrapper
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056d25b (22 bytes)
export function FUN_0056d25b() {
  // DEVIATION: Win32 _eh_vector_destructor_iterator_ — C++ runtime cleanup, no-op in JS
  return;
}


// ============================================================
// FUN_0056d27b — SEH cleanup
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056d27b (14 bytes)
export function FUN_0056d27b() {
  // DEVIATION: Win32 SEH frame restore (*unaff_FS_OFFSET = ...) — no-op in JS
  return;
}


// ============================================================
// FUN_0056d289 — draw_city_sprite (UI rendering)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056d289 (1737 bytes)
export function FUN_0056d289(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 GDI — city sprite rendering with population size, walls indicator, diplomacy flags
  return;
}


// ============================================================
// FUN_0056e180 — calculate_sprite_size
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056e180 (47 bytes)
export function FUN_0056e180(param_1) {
  // DEVIATION: MFC in_ECX/this — sprite size calculation using *(in_ECX + 0x2e4) bitmap dimension
  return 0;
}


// ============================================================
// FUN_0056e1c0 — compute_sprite_dimension
// ============================================================

export function FUN_0056e1c0(param_1, param_2) {
  let iVar1;
  iVar1 = (param_2 + 8) * param_1 + 4;
  return (iVar1 + (iVar1 >> 0x1f & 7)) >> 3;
}


// ============================================================
// FUN_0056e1f0 — get_civ_color
// ============================================================

export function FUN_0056e1f0(param_1) {
  let local_8;

  if (param_1 === 0) {
    local_8 = 0;
  } else {
    local_8 = read_s16(G.DAT_006554f8, read_s16(G.DAT_0064c600, param_1 * 0x594 + 0xA6) * 0x30 + 6);
  }
  return ri(G.DAT_0065535c, local_8 * 0x10); // C: *(undefined4 *) — 4-byte read
}


// ============================================================
// FUN_0056e270 — init_object_instance (uses ECX)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056e270 (89 bytes)
export function FUN_0056e270() {
  // DEVIATION: MFC in_ECX/this — object instance initialization (member fields via this pointer)
  return 0;
}


// ============================================================
// FUN_0056e2c9 — cleanup wrapper
// ============================================================

export function FUN_0056e2c9() {
  FUN_0059baf0();
  return;
}


// ============================================================
// FUN_0056e2e9 — multiplayer_game_setup
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056e2e9 (2450 bytes)
export function FUN_0056e2e9(param_1, param_2) {
  // DEVIATION: MFC in_ECX/this + Win32 DirectPlay — multiplayer game setup. Game state: sets G.DAT_006ad57c/59c/5bc/5dc, G.DAT_006ad640, G.DAT_006ad304, G.DAT_006d1da0, G.DAT_00655b0a, G.DAT_006ad358/359
  return 0;
}


// ============================================================
// FUN_0056ec92 — check_all_players_joined
// ============================================================

export function FUN_0056ec92() {
  // DEVIATION: Win32 API (MP player join check — in_ECX/this, CRichEditDoc MFC, G.DAT_006ad359/35c/640/678)
  FUN_0047e94e(1, 0);
  return;
}


// ============================================================
// FUN_0056ed62 — process_network_messages
// ============================================================

export function FUN_0056ed62() {
  FUN_0047e94e(1, 0);
  return;
}


// ============================================================
// FUN_0056ed80 — check_network_state_changed
// ============================================================

export function FUN_0056ed80() {
  // DEVIATION: Win32 API (network state check — CRichEditDoc MFC, G.DAT_006c9098/6c90a8/6ad678)
  FUN_0047e94e(1, 0);
  return;
}


// ============================================================
// FUN_0056edd3 — find_linked_player_node
// ============================================================

export function FUN_0056edd3(param_1) {
  // DEVIATION: Win32 API (linked list node traversal — raw pointer arithmetic on heap objects)
  return param_1;
}


// ============================================================
// FUN_0056ee2c — cleanup_player_list (uses ECX)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056ee2c (171 bytes)
export function FUN_0056ee2c() {
  // DEVIATION: MFC in_ECX/this — linked list cleanup with operator_delete, heap memory management
  return;
}


// ============================================================
// FUN_0056eed7 — remove_player_node (uses ECX)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056eed7 (188 bytes)
export function FUN_0056eed7(param_1) {
  // DEVIATION: MFC in_ECX/this — linked list node removal with operator_delete, pointer relinking
  return;
}


// ============================================================
// FUN_0056ef93 — add_player_to_list (uses ECX)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056ef93 (384 bytes)
export function FUN_0056ef93(param_1, param_2) {
  // DEVIATION: MFC in_ECX/this — linked list node insertion with operator_new, pointer wiring
  return null;
}


// ============================================================
// FUN_0056f113 — refresh_player_list
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056f113 (494 bytes)
export function FUN_0056f113() {
  // DEVIATION: MFC in_ECX/this — player list refresh using G.DAT_006ad10c, linked list + FUN_0056ef93
  return;
}


// ============================================================
// FUN_0056f301 — init_player_list_default
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056f301 (113 bytes)
export function FUN_0056f301() {
  // DEVIATION: MFC in_ECX/this — player list default entry init via G.DAT_006ad10c + FUN_0056ef93
  return;
}


// ============================================================
// FUN_0056f372 — check_player_name_match
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056f372 (110 bytes)
export function FUN_0056f372() {
  // DEVIATION: MFC in_ECX/this — player name match via linked list + _strcmp
  return 0;
}


// ============================================================
// FUN_0056f3e0 — find_player_by_id
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056f3e0 (75 bytes)
export function FUN_0056f3e0(param_1) {
  // DEVIATION: MFC in_ECX/this — find player by ID via linked list traversal
  return 0;
}


// ============================================================
// FUN_0056f42b — find_player_slot_by_id
// ============================================================

export function FUN_0056f42b(param_1) {
  let local_8;

  for (local_8 = 0; (local_8 < 7 && (ri(G.DAT_006ad354, local_8 * 0x54) !== param_1));
      local_8 = local_8 + 1) {
  }
  return local_8;
}


// ============================================================
// FID_conflict___E31 @ 0x0056F910 — static initializer
// ============================================================

export function FID_conflict___E31_0056f910() {
  FUN_0056f92a();
  FUN_0056f944();
  return;
}


// ============================================================
// FUN_0056f92a — init bitmap wrapper
// ============================================================

export function FUN_0056f92a() {
  FUN_005bd630();
  return;
}


// ============================================================
// FUN_0056f944 — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056f944 (29 bytes)
export function FUN_0056f944() {
  // DEVIATION: Win32 _atexit(FUN_0056f961) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_0056f961 — atexit cleanup
// ============================================================

export function FUN_0056f961() {
  FUN_005bd915();
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x0056F97B — static initializer
// ============================================================

export function FID_conflict___E31_0056f97b() {
  FUN_0056f995();
  FUN_0056f9af();
  return;
}


// ============================================================
// FUN_0056f995 — CString constructor wrapper
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056f995 (26 bytes)
export function FUN_0056f995() {
  // DEVIATION: MFC CString::CString(G.DAT_006ac170) — C++ constructor, no-op in JS
  return;
}


// ============================================================
// FUN_0056f9af — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056f9af (29 bytes)
export function FUN_0056f9af() {
  // DEVIATION: Win32 _atexit(FUN_0056f9cc) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_0056f9cc — atexit cleanup
// ============================================================

export function FUN_0056f9cc() {
  FUN_005cde4d();
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x0056F9E6 — static initializer
// ============================================================

export function FID_conflict___E31_0056f9e6() {
  FUN_0056fa00();
  FUN_0056fa1a();
  return;
}


// ============================================================
// FUN_0056fa00 — CString constructor wrapper
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fa00 (26 bytes)
export function FUN_0056fa00() {
  // DEVIATION: MFC CString::CString(G.DAT_006ac8a8) — C++ constructor, no-op in JS
  return;
}


// ============================================================
// FUN_0056fa1a — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fa1a (29 bytes)
export function FUN_0056fa1a() {
  // DEVIATION: Win32 _atexit(FUN_0056fa37) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_0056fa37 — atexit cleanup
// ============================================================

export function FUN_0056fa37() {
  FUN_005cde4d();
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x0056FA51 — static initializer
// ============================================================

export function FID_conflict___E31_0056fa51() {
  FUN_0056fa6b();
  FUN_0056fa85();
  return;
}


// ============================================================
// FUN_0056fa6b — CString constructor wrapper
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fa6b (26 bytes)
export function FUN_0056fa6b() {
  // DEVIATION: MFC CString::CString(G.DAT_006ac8e8) — C++ constructor, no-op in JS
  return;
}


// ============================================================
// FUN_0056fa85 — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fa85 (29 bytes)
export function FUN_0056fa85() {
  // DEVIATION: Win32 _atexit(FUN_0056faa2) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_0056faa2 — atexit cleanup
// ============================================================

export function FUN_0056faa2() {
  FUN_005cde4d();
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x0056FABC — static initializer
// ============================================================

export function FID_conflict___E31_0056fabc() {
  FUN_0056fad6();
  FUN_0056faf0();
  return;
}


// ============================================================
// FUN_0056fad6 — init bitmap wrapper
// ============================================================

export function FUN_0056fad6() {
  FUN_005bd630();
  return;
}


// ============================================================
// FUN_0056faf0 — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056faf0 (29 bytes)
export function FUN_0056faf0() {
  // DEVIATION: Win32 _atexit(FUN_0056fb0d) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_0056fb0d — atexit cleanup
// ============================================================

export function FUN_0056fb0d() {
  FUN_005bd915();
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x0056FB27 — static initializer
// ============================================================

export function FID_conflict___E31_0056fb27() {
  FUN_0056fb41();
  FUN_0056fb5b();
  return;
}


// ============================================================
// FUN_0056fb41 — init wrapper
// ============================================================

export function FUN_0056fb41() {
  FUN_0055339f();
  return;
}


// ============================================================
// FUN_0056fb5b — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fb5b (29 bytes)
export function FUN_0056fb5b() {
  // DEVIATION: Win32 _atexit(FUN_0056fb78) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_0056fb78 — atexit cleanup (MFC destructor)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fb78 (26 bytes)
export function FUN_0056fb78() {
  // DEVIATION: MFC COleCntrFrameWnd::~COleCntrFrameWnd(G.DAT_006ac1b0) — C++ destructor, no-op in JS
  return;
}


// ============================================================
// FID_conflict___E31 @ 0x0056FB92 — static initializer
// ============================================================

export function FID_conflict___E31_0056fb92() {
  FUN_0056fbac();
  FUN_0056fbc6();
  return;
}


// ============================================================
// FUN_0056fbac — init wrapper
// ============================================================

export function FUN_0056fbac() {
  FUN_005784a0();
  return;
}


// ============================================================
// FUN_0056fbc6 — register atexit
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fbc6 (29 bytes)
export function FUN_0056fbc6() {
  // DEVIATION: Win32 _atexit(FUN_0056fbe3) — C runtime cleanup registration, no-op in JS
  return;
}


// ============================================================
// FUN_0056fbe3 — atexit cleanup (MFC destructor)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fbe3 (26 bytes)
export function FUN_0056fbe3() {
  // DEVIATION: MFC CBitmapButton::~CBitmapButton(G.DAT_006ac488) — C++ destructor, no-op in JS
  return;
}


// ============================================================
// FUN_0056fbfd — draw_unit_type_cursor_marks (UI)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fbfd (231 bytes)
export function FUN_0056fbfd(param_1, param_2, param_3) {
  // DEVIATION: Win32 GDI — unit cursor mark drawing via FUN_005c0c5d pixel ops, G.DAT_00642c48/642b48 lookup
  return;
}


// ============================================================
// FUN_0056fce4 — rebuild_units_bmp (Win32 file I/O)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056fce4 (722 bytes)
export function FUN_0056fce4() {
  // DEVIATION: Win32 file I/O + GDI — UNITS.BMP rebuild via SEH, __getcwd/__chdir, bitmap load/save
  return;
}


// ============================================================
// FUN_0056ffb6 — cleanup wrapper
// ============================================================

export function FUN_0056ffb6() {
  FUN_005c656b();
  return;
}


// ============================================================
// FUN_0056ffcc — SEH cleanup
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056ffcc (14 bytes)
export function FUN_0056ffcc() {
  // DEVIATION: Win32 SEH frame restore (*unaff_FS_OFFSET = ...) — no-op in JS
  return;
}


// ============================================================
// FUN_0056ffda — rebuild_cities_bmp (Win32 file I/O)
// ============================================================

// Source: decompiled/block_00560000.c FUN_0056ffda (1922 bytes)
export function FUN_0056ffda() {
  // DEVIATION: Win32 file I/O + GDI — CITIES.BMP rebuild via SEH, __getcwd/__chdir, bitmap load/save
  return;
}


// ============================================================
// FUN_0057075c — cleanup wrapper (referenced at end of FUN_0056ffda)
// ============================================================

export function FUN_0057075c() {
  FUN_005c656b();
  return;
}


// ============================================================
// FUN_00570772 — SEH cleanup (referenced at end of FUN_0056ffda)
// ============================================================

// Source: decompiled/block_00560000.c FUN_00570772 (referenced by FUN_0056ffda)
export function FUN_00570772() {
  // DEVIATION: Win32 SEH frame restore — no-op in JS
  return;
}


// ═══════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS — memory read/write utilities for multi-byte access
// ═══════════════════════════════════════════════════════════════════

function read_u16(arr, off) {
  return (arr[off + 1] << 8) | arr[off];
}

function write_u16(arr, off, val) {
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
}

function read_s16(arr, off) {
  const v = (arr[off + 1] << 8) | arr[off];
  return (v & 0x8000) ? (v | 0xFFFF0000) : v;
}

function write_s16(arr, off, val) {
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
}

function read_u32(arr, off) {
  return (arr[off]) | (arr[off + 1] << 8) | (arr[off + 2] << 16) | ((arr[off + 3] << 24) >>> 0);
}

function write_u32(arr, off, val) {
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
  arr[off + 2] = (val >> 16) & 0xFF;
  arr[off + 3] = (val >> 24) & 0xFF;
}

function read_s32(arr, off) {
  return (arr[off]) | (arr[off + 1] << 8) | (arr[off + 2] << 16) | (arr[off + 3] << 24);
}

function write_s32(arr, off, val) {
  arr[off] = val & 0xFF;
  arr[off + 1] = (val >> 8) & 0xFF;
  arr[off + 2] = (val >> 16) & 0xFF;
  arr[off + 3] = (val >> 24) & 0xFF;
}


// ═══════════════════════════════════════════════════════════════════
// STUB EXTERNAL FUNCTIONS
// These are called from within this block but defined elsewhere.
// ═══════════════════════════════════════════════════════════════════

function _rand() { return Math.floor(Math.random() * 0x7FFF); }
function XD_FlushSendBuffer(a) { /* stub */ }
function FUN_citywin_9545() { /* stub */ }
function DAT_0064c600_ref(off) { return G.DAT_0064c600.subarray(off); /* stub ref */ }

// ═══════════════════════════════════════════════════════════════════
// GLOBAL DATA STUBS
// These are referenced by address in the C but not fully defined
// in mem.js — declared here as placeholders.
// ═══════════════════════════════════════════════════════════════════


// const DAT_006ab5c0 = new Uint8Array(64); // (in G)
// const DAT_00655c22 = new Uint8Array(16); // (in G)
// const DAT_006554f8 = new Uint8Array(0x300); // (in G)
// const DAT_0065535c = new Uint8Array(0x100); // (in G)
// const DAT_006ad558 = new Int32Array(8); // (in G)
// const DAT_006ad30c = new Uint8Array(0x400); // (in G)
// const DAT_006ad354 = new Int32Array(0x100); // (in G)
// const DAT_00647748 = 0; // (in G)
// const DAT_006409d8 = 0; // (in G)
// const DAT_00644e48 = 0; // (in G)
// const DAT_00633c98 = 0; // (in G)
// const DAT_00679640 = 0; // (in G)
// const DAT_0063fc98 = 0; // (in G)
// const DAT_00633cdc = 0; // (in G)
// const DAT_00628420 = new Uint8Array(0x400); // (in G)
// const DAT_00627684 = new Uint8Array(0x1000); // (in G)
// const DAT_0062768e = new Uint8Array(0x1000); // (in G)
// const DAT_00655334 = 0; // (in G)
// const DAT_006335a4 = 0; // (in G)

const s_WARENDS_00633c4c = "WARENDS";
const s_TERMS_00633c54 = "TERMS";
const s_INTRUDERS_00633c5c = "INTRUDERS";
const s_INTRUDER_00633c68 = "INTRUDER";
const s_VIOLATORS_00633c74 = "VIOLATORS";
const s_VIOLATOR_00633c80 = "VIOLATOR";
const s_WITHDRAWN_00633c8c = "WITHDRAWN";
const s_SENATESCANDAL_00633c9c = "SENATESCANDAL";
const s_VIOLATE_00633cac = "VIOLATE";
const s_ADMIRECITY_00633cb4 = "ADMIRECITY";
const s_NEARCITY_00633cc0 = "NEARCITY";
const s_HELPME_00633ccc = "HELPME";
const s_INSTEAD_00633cd4 = "INSTEAD";
const s_CRUSADE_00633ce0 = "CRUSADE";
const s_JIHAD_00633ce8 = "JIHAD";
