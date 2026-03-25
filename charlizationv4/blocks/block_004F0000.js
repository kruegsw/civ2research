// ═══════════════════════════════════════════════════════════════════
// block_004F0000.js — Mechanical transpilation of block_004F0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_004F0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_004F0000.c
// ═══════════════════════════════════════════════════════════════════



// ============================================================
// FUN_004f00f0 — get_building_maintenance_cost
// ============================================================

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_004083b0, FUN_00408460, FUN_004085f0, FUN_0040bbb0 } from './block_00400000.js';
import { FUN_0040bbe0, FUN_0040bc10, FUN_0040bc80, FUN_0040f350, FUN_0040f3e0, FUN_0040f570 } from './block_00400000.js';
import { FUN_0040fb00, FUN_0040fbb0, FUN_0040fcf0 } from './block_00400000.js';
import { FUN_00415133, FUN_004187a0, FUN_00418870, FUN_00419b80 } from './block_00410000.js';
import { FUN_00421da0, FUN_00421dd0, FUN_00421ea0, FUN_004271e8, FUN_00428b0c, FUN_00428cb0 } from './block_00420000.js';
import { FUN_0043c260, FUN_0043cf76, FUN_0043d20a, FUN_0043d289, FUN_0043f7a7 } from './block_00430000.js';
import { FUN_0044c5a0, FUN_0044cba0, delete_city } from './block_00440000.js';
import { FUN_004503d0, FUN_00451890, FUN_004518d0, FUN_00451900, FUN_00451af0, FUN_00451bf0 } from './block_00450000.js';
import { FUN_00452315, FUN_00452a67, FUN_00453aa0, FUN_00453e18, FUN_00453e51 } from './block_00450000.js';
import { FUN_0046b14d, FUN_0046e571 } from './block_00460000.js';
import { FUN_0047cea6, FUN_0047cf9e, FUN_0047e94e } from './block_00470000.js';
import { FUN_00484d52 } from './block_00480000.js';
import { FUN_004906fd, FUN_0049301b, FUN_00493c7d, FUN_00497ea0, FUN_004980ec, FUN_00498159 } from './block_00490000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a2534, FUN_004abfe5, new_civ } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004bf05b } from './block_004B0000.js';
import { FUN_004e1763, FUN_004e7492, FUN_004eb4ed, FUN_004eb571, FUN_004ebbde, FUN_004ec3fe } from './block_004E0000.js';
import { FUN_004eef23, FUN_004efbc6, FUN_004efd44, handle_city_disorder_004ef578 } from './block_004E0000.js';
import { citywin_9429, handle_city_disorder_00509590 } from './block_00500000.js';
import { FUN_00511880 } from './block_00510000.js';
import { FUN_0052630d } from './block_00520000.js';
import { FUN_00564bf0, FUN_00564e6d } from './block_00560000.js';
import { FUN_00579c40 } from './block_00570000.js';
import { FUN_00599b8d, FUN_0059db08, FUN_0059df8a, FUN_0059e18b } from './block_00590000.js';
import { FUN_005a9780, FUN_005ac9ad, FUN_005adfa0, FUN_005ae1b0 } from './block_005A0000.js';
import { FUN_005b2c82, FUN_005b2e69, FUN_005b3d06, FUN_005b4391, FUN_005b8aa8, FUN_005b8b1a } from './block_005B0000.js';
import { FUN_005b8d62, FUN_005b8da4, FUN_005b8dec, FUN_005b976d, FUN_005b9d81, FUN_005b9ec6 } from './block_005B0000.js';
import { FUN_005b9f1c, FUN_005bb574 } from './block_005B0000.js';
import { FUN_005c64da, FUN_005c656b } from './block_005C0000.js';
import { FUN_005d6038, FUN_005dde57, FUN_005ddeff } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

export function FUN_004f00f0(param_1, param_2) {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = u8(G.DAT_0064c48d[param_2 * 8]);
  if (param_2 === 2) {
    if ((G.DAT_00655b08 < 2) && (local_8 !== 0)) {
      local_8 = local_8 - 1;
    }
    iVar1 = FUN_004bd9f0(param_1, 0x23);
    if (iVar1 !== 0) {
      local_8 = local_8 + 1;
    }
    for (local_c = 0x35; (-1 < local_c && (G.DAT_00627689[local_c * 0x10] === 0));
        local_c = s8(G.DAT_0062768e[local_c * 0x10])) {
    }
    iVar1 = FUN_004bd9f0(param_1, local_c);
    if (iVar1 !== 0) {
      local_8 = local_8 + 1;
    }
  }
  if (local_8 === 1) {
    iVar1 = FUN_00453e51(param_1, 0x11);
    if (iVar1 !== 0) {
      local_8 = 0;
    }
  }
  if (((local_8 !== 0) && (G.DAT_0064c6b5[param_1 * 0x594] === 0x04)) &&
     ((param_2 === 4 || ((param_2 === 0xe || (param_2 === 0xb)))))) {
    local_8 = 0;
  }
  return local_8;
}


// ============================================================
// FUN_004f0221 — process_city_building_maintenance
// ============================================================

export function FUN_004f0221(param_1) {
  let iVar1;
  let iVar2;
  let local_8;

  iVar1 = s8(G.DAT_0064f348[param_1 * 0x58]);
  if (G.DAT_0064c6b5[iVar1 * 0x594] !== 0) {
    for (local_8 = 1; local_8 < 0x27; local_8 = local_8 + 1) {
      iVar2 = FUN_0043d20a(param_1, local_8);
      if (iVar2 !== 0) {
        iVar2 = FUN_004f00f0(iVar1, local_8);
        G.DAT_0064c6a2[iVar1 * 0x594] = G.DAT_0064c6a2[iVar1 * 0x594] - iVar2;
        if (G.DAT_0064c6a2[iVar1 * 0x594] < 0) {
          G.DAT_0064c6a2[iVar1 * 0x594] = 0;
          FUN_0043d289(param_1, local_8, 0);
          if (G.DAT_00654fa8 === 0) {
            FUN_004271e8(1, u32(G.DAT_0064c488, local_8 * 8));
            FUN_00421da0(0, u8(G.DAT_0064c48c[local_8 * 8]) * G.DAT_006a657c);
            FUN_004f3f30(s_INHOCK_0062ef7c, param_1, G.DAT_00645160 + local_8 * 0x3c);
          }
          G.DAT_0064c6a2[iVar1 * 0x594] =
               G.DAT_0064c6a2[iVar1 * 0x594] +
               u8(G.DAT_0064c48c[local_8 * 8]) * G.DAT_006a657c;
        }
      }
    }
  }
  return;
}


// ============================================================
// FUN_004f03b7 — find_nearest_enemy_city_path
// ============================================================

export function FUN_004f03b7(param_1) {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let pbVar8;
  let local_38;
  let local_34;
  let local_24;
  let local_18;
  let local_14;

  iVar2 = FUN_005b8aa8(s16(G.DAT_0064f340, param_1 * 0x58),
                        s16(G.DAT_0064f342, param_1 * 0x58));
  iVar3 = s8(G.DAT_0064f348[param_1 * 0x58]);
  if (1 < u8(G.DAT_0064c932[iVar3 * 0x594 + iVar2])) {
    for (local_14 = 0; local_14 < 2; local_14 = local_14 + 1) {
      for (local_38 = 0; local_38 < G.DAT_00655b18; local_38 = local_38 + 1) {
        if (((s32(G.DAT_0064f394, local_38 * 0x58) !== 0) && (param_1 !== local_38)) &&
           ((s8(G.DAT_0064f348[local_38 * 0x58]) === iVar3 ||
            ((local_14 !== 0 &&
             (((G.DAT_0064c6c0[s8(G.DAT_0064f348[local_38 * 0x58]) * 4 + iVar3 * 0x594]) & 0xc) !==
              0)))))) {
          iVar4 = s16(G.DAT_0064f340, local_38 * 0x58);
          iVar5 = s16(G.DAT_0064f342, local_38 * 0x58);
          local_18 = s16(G.DAT_0064f340, param_1 * 0x58);
          local_24 = s16(G.DAT_0064f342, param_1 * 0x58);
          local_34 = 0;
          iVar6 = FUN_005b8aa8(iVar4, iVar5);
          if ((iVar2 === iVar6) &&
             (iVar6 = FUN_005ae1b0(iVar4, iVar5, local_18, local_24), iVar6 < 0x17)) {
            G.DAT_0062d040 = 1;
            G.DAT_0062d044 = 0xffffffff;
            G.DAT_0062d03c = 2;
            bVar1 = true;
            G.DAT_00673fa0 = iVar4;
            G.DAT_00673fa4 = iVar5;
            while ((iVar6 = FUN_004abfe5(local_18, local_24, 99), -1 < iVar6 && (iVar6 !== 8))) {
              local_18 = FUN_005ae052(s8(G.DAT_00628350[iVar6]) + local_18);
              local_24 = local_24 + s8(G.DAT_00628360[iVar6]);
              if ((local_18 === iVar4) && (local_24 === iVar5)) break;
              iVar6 = FUN_005b8ca6(local_18, local_24);
              if (iVar6 < 0) {
                uVar7 = FUN_005b94d5(local_18, local_24);
                if ((uVar7 & 0x10) === 0) {
                  pbVar8 = FUN_005b8931(local_18, local_24);
                  if (((pbVar8 & 0x80) === 0) || (iVar6 = FUN_004bd9f0(iVar3, 7), iVar6 !== 0))
                  {
                    bVar1 = false;
                  }
                }
                else {
                  uVar7 = FUN_005b94d5(local_18, local_24);
                  if (((uVar7 & 0x20) === 0) && (iVar6 = FUN_004bd9f0(iVar3, 0x43), iVar6 !== 0))
                  {
                    bVar1 = false;
                  }
                }
              }
              local_34 = local_34 + 1;
              if ((0x32 < local_34) || (!bVar1)) break;
            }
            G.DAT_0062d040 = 0;
            if ((!bVar1) &&
                ((iVar4 = FUN_005b8da4(local_18, local_24), iVar4 < 0 || (iVar3 === iVar4))) &&
               ((iVar4 = FUN_005b8dec(local_18, local_24, iVar3), iVar4 < 0 || (iVar3 === iVar4))
               )) {
              G.DAT_0062ee0c = 1;
              G.DAT_006a65e0 = local_18;
              G.DAT_006a65e8 = local_24;
              return 1;
            }
          }
        }
      }
    }
  }
  return 0;
}


// ============================================================
// FUN_004f080d — ai_city_attack_evaluation
// ============================================================

export function FUN_004f080d(param_1) {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let local_8;

  bVar2 = false;
  bVar1 = G.DAT_0064f348[param_1 * 0x58];
  iVar3 = s8(bVar1);
  for (local_8 = 0; local_8 < 0x14; local_8 = local_8 + 1) {
    uVar4 = FUN_005ae052(s8(G.DAT_00628370[local_8]) +
                           s16(G.DAT_0064f340, param_1 * 0x58));
    iVar5 = s16(G.DAT_0064f342, param_1 * 0x58) + s8(G.DAT_006283a0[local_8]);
    iVar6 = FUN_004087c0(uVar4, iVar5);
    if ((iVar6 !== 0) && (uVar7 = FUN_005b94d5(uVar4, iVar5), (uVar7 & 0x80) !== 0)) {
      FUN_0049301b(iVar3, uVar4, iVar5, 0x15, 6);
      G.DAT_0064f344[param_1 * 0x58] =
           G.DAT_0064f344[param_1 * 0x58] | 0x80000;
      bVar2 = true;
    }
  }
  if (!bVar2) {
    iVar5 = FUN_004bd9f0(iVar3, 0x43);
    if ((iVar5 !== 0) && (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0 || (G.DAT_0062ee0c === 0))))
    {
      if (G.DAT_006a65d4 < 4) {
        G.DAT_006a65d4 = 3;
      }
      FUN_004f03b7(param_1);
      if (G.DAT_0062ee0c === 0) {
        return;
      }
    }
    G.DAT_006a65d4 = G.DAT_006a65d4 + 2;
    if (G.DAT_0062ee0c === 0) {
      G.DAT_006a65d4 = 2;
      FUN_004f03b7(param_1);
    }
    if (G.DAT_0062ee0c === 0) {
      G.DAT_0064f344[param_1 * 0x58] =
           G.DAT_0064f344[param_1 * 0x58] & 0xfff7ffff;
    }
    else {
      if (2 < G.DAT_006a65d4) {
        if (0x04 < s8(G.DAT_0064f349[param_1 * 0x58])) {
          G.DAT_006a65d4 = G.DAT_006a65d4 + 1;
        }
        iVar5 = FUN_0043d20a(param_1, 1);
        if (iVar5 !== 0) {
          G.DAT_006a65d4 = G.DAT_006a65d4 + 1;
        }
      }
      if (s8(G.DAT_0064f349[param_1 * 0x58]) < 0x04) {
        G.DAT_006a65d4 = G.DAT_006a65d4 + -1;
      }
      FUN_0049301b(iVar3, G.DAT_006a65e0, G.DAT_006a65e8, 0x15, G.DAT_006a65d4);
      G.DAT_0064f344[param_1 * 0x58] =
           G.DAT_0064f344[param_1 * 0x58] | 0x80000;
    }
  }
  return;
}


// ============================================================
// FUN_004f0a9c — process_city_turn
// ============================================================

export function FUN_004f0a9c(param_1) {
  let bVar1;
  let cVar2;
  let sVar3;
  let sVar4;
  let iVar5;
  let iVar6;
  let local_24;
  let local_1c;
  let local_c;
  let local_8;

  G.DAT_006aa760 = 1;
  bVar1 = G.DAT_0064f348[param_1 * 0x58];
  iVar5 = s8(bVar1);
  if (((u8(G.DAT_0064f34b[param_1 * 0x58]) - 1 ^ G.DAT_00655af8 & 0x3f) & 0x3f) === 0) {
    G.DAT_0064f34a[param_1 * 0x58] = bVar1;
  }
  if ((G.DAT_006d1da0 === iVar5) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) {
    G.DAT_006a65ac = 1;
  }
  else {
    G.DAT_006a65ac = 0;
  }
  if (G.DAT_00654fa8 !== 0) {
    G.DAT_006a65ac = 0;
  }
  G.DAT_006a65a0 = 0;
  G.DAT_0064f344[param_1 * 0x58] = G.DAT_0064f344[param_1 * 0x58] & 0xffbfffbb;
  iVar6 = FUN_CSplitterWnd_IsTracking(G.DAT_006a91b8);
  G.DAT_0062ee00 = (iVar6 === param_1) ? 1 : 0;
  G.DAT_0062ee04 = 0;
  sVar3 = s16(G.DAT_0064f35a, param_1 * 0x58);
  iVar6 = FUN_004ebbde(param_1);
  if (iVar6 === 0) {
    FUN_004eb4ed(param_1, 1);
    if ((G.DAT_0062ee00 !== 0) && (G.DAT_0062ee04 !== 0)) {
      citywin_9429();
    }
    if ((G.DAT_006a65dc !== 0) && (G.DAT_00654fa8 === 0)) {
      FUN_004eb571(s_DECREASE_0062ef84, param_1, 0, 0);
    }
    G.DAT_006a661c = (G.DAT_006a65c8 - s8(G.DAT_0064f349[param_1 * 0x58]) * G.DAT_0064bcca)
                   - G.DAT_006a65d8 * G.DAT_006a6608;
    w16(G.DAT_0064f35a, param_1 * 0x58,
         s16(G.DAT_0064f35a, param_1 * 0x58) + G.DAT_006a661c);
    if ((((0 < sVar3) && (s16(G.DAT_0064f35a, param_1 * 0x58) < sVar3)) &&
        (s16(G.DAT_0064f35a, param_1 * 0x58) + G.DAT_006a661c * 3 < 0)) &&
       (((G.DAT_00655af2 & 0x80) === 0 && (G.DAT_00654fa8 === 0)))) {
      FUN_004eb571(s_FOODSHORTAGE_0062ef90, param_1, 0, 0);
    }
    FUN_004ec3fe(param_1);
    FUN_004eef23(param_1);
    G.DAT_0062edfc = 1;
    G.DAT_0062edf8 = 1;
    G.DAT_0062ee0c = 0;
    G.DAT_006a65d4 = 0;
    FUN_004eb4ed(param_1, 1);
    G.DAT_0062edfc = 0;
    if (G.DAT_006a65cc < G.DAT_006a6568) {
      w16(G.DAT_0064ca74, iVar5 * 0x594,
           s16(G.DAT_0064ca74, iVar5 * 0x594) +
           (G.DAT_006a6568 - G.DAT_006a65cc) * 5);
    }
    sVar3 = FUN_005adfa0(G.DAT_006a660c - G.DAT_0064bcd5, 0,
                         s8(G.DAT_0064f349[param_1 * 0x58]));
    w16(G.DAT_0064ca74, iVar5 * 0x594, sVar3 + s16(G.DAT_0064ca74, iVar5 * 0x594));
    for (local_24 = 1; local_24 < 7; local_24 = local_24 + 1) {
      local_1c = 0;
      switch(local_24) {
      case 1:
        local_1c = u8(s8(G.DAT_0064f349[param_1 * 0x58]));
        break;
      case 2:
        local_1c = u8(G.DAT_0064bcd5);
        break;
      case 3:
        local_1c = u8(G.DAT_0064bcd6);
        break;
      case 4:
        local_1c = u8(G.DAT_0064bcd7);
        break;
      }
      if (local_1c < G.DAT_006a660c) {
        w16(G.DAT_0064ca74, iVar5 * 0x594 + local_24 * 2,
             s16(G.DAT_0064ca74, iVar5 * 0x594 + local_24 * 2) -
             (G.DAT_006a660c - local_1c));
      }
    }
    iVar6 = FUN_00453e51(iVar5, 0x15);
    if ((iVar6 === 0) && (iVar6 = FUN_0043d20a(param_1, 0x21), iVar6 === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = 1;
    }
    cVar2 = G.DAT_006554fa[s16(G.DAT_0064c6a6, iVar5 * 0x594) * 0x30];
    local_c = -s8(cVar2) + 7;
    iVar6 = FUN_0043d20a(param_1, 5);
    if (iVar6 !== 0) {
      local_c = -s8(cVar2) + 5;
    }
    iVar6 = FUN_0043d20a(param_1, 10);
    if (iVar6 !== 0) {
      local_c = local_c + -1;
    }
    iVar6 = FUN_0043d20a(param_1, 4);
    if ((iVar6 !== 0) &&
       ((iVar6 = FUN_0043d20a(param_1, 0xb), iVar6 !== 0 ||
        (iVar6 = FUN_00453e51(iVar5, 10), iVar6 !== 0)))) {
      local_c = local_c + -1;
    }
    iVar6 = FUN_00453e18(0xd);
    if (iVar6 !== param_1) {
      iVar6 = s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, iVar5 * 0x594) * 0x30]) + G.DAT_006a65e4;
      sVar3 = s16(G.DAT_0064ca80, iVar5 * 0x594);
      sVar4 = FUN_005adfa0((2 - local_8) * (iVar6 + 1), 0, 99);
      w16(G.DAT_0064ca80, iVar5 * 0x594, sVar3 - sVar4 * local_c);
      sVar3 = s16(G.DAT_0064ca7e, iVar5 * 0x594);
      sVar4 = FUN_005adfa0(iVar6 * (1 - local_8), 0, 99);
      w16(G.DAT_0064ca7e, iVar5 * 0x594, sVar3 - sVar4 * local_c);
    }
    handle_city_disorder_004ef578(param_1);
    FUN_004efbc6(param_1);
    if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
      FUN_004efd44(param_1);
      FUN_004f0221(param_1);
    }
    FUN_004f080d(param_1);
    iVar6 = G.DAT_006a65cc * 2 - G.DAT_006a6568;
    if (s16(G.DAT_0064ca72, iVar5 * 0x594) <= iVar6) {
      w16(G.DAT_0064ca72, iVar5 * 0x594, iVar6);
    }
    G.DAT_006aa760 = 0;
    G.DAT_0062ee08 = 0xffffffff;
    if (G.DAT_0062ee00 !== 0) {
      FUN_004e7492(param_1);
      citywin_9429();
    }
    if (G.DAT_006a65a0 !== 0) {
      handle_city_disorder_00509590(param_1);
    }
    G.DAT_0062edf8 = 0;
    iVar5 = G.DAT_006a6550 - G.DAT_006a65a8;
  }
  else {
    iVar5 = -999;
  }
  return iVar5;
}


// ============================================================
// FUN_004f1220 — handle_spaceship_launch
// ============================================================

export function FUN_004f1220() {
  let iVar1;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((G.DAT_00655b02 < 3) || (G.DAT_006ad2f7 !== 0)) {
    local_18 = 0;
    local_c = 0;
    FUN_005b9ec6();
    for (local_8 = 0; local_8 < G.DAT_006d1164; local_8 = local_8 + 1) {
      FUN_005b976d(local_c, local_18, 0xff, 1, 1);
      for (local_14 = 1; local_14 < 8; local_14 = local_14 + 1) {
        iVar1 = FUN_005b8931(local_c, local_18, local_14, 0, 1);
        FUN_005b9d81(local_c, local_18, tileRead(iVar1, 1));
      }
      local_c = local_c + 2;
      if (G.DAT_006d1160 <= local_c) {
        local_18 = local_18 + 1;
        local_c = local_18 & 1;
      }
    }
    for (local_10 = 0; local_10 < G.DAT_00655b18; local_10 = local_10 + 1) {
      if (s32(G.DAT_0064f394, local_10 * 0x58) !== 0) {
        G.DAT_0064f34c[local_10 * 0x58] = 0xff;
        for (local_14 = 0; local_14 < 8; local_14 = local_14 + 1) {
          G.DAT_0064f34d[local_10 * 0x58 + local_14] = G.DAT_0064f349[local_10 * 0x58];
        }
        FUN_005b976d(s16(G.DAT_0064f340, local_10 * 0x58),
                     s16(G.DAT_0064f342, local_10 * 0x58), 0xff, 1, 1);
      }
    }
    FUN_005b9f1c();
    if (2 < G.DAT_00655b02) {
      G.DAT_006ad699 = 1;
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x74, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      if (G.DAT_00654fa8 === 0) {
        FUN_00511880(0x49, 0xff, 0, 0, 0, 0);
      }
    }
    FUN_0047cf9e(G.DAT_006d1da0, 1);
    if (G.DAT_00654fa8 === 0) {
      FUN_00421ea0(s_ASTRONAUTS_0062efa0);
    }
  }
  else {
    FUN_0046b14d(0x58, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  return;
}


// ============================================================
// FUN_004f3d30 — get_byte_from_array
// ============================================================

export function FUN_004f3d30(param_1, param_2) {
  return G.DAT_006a6530[param_2];
}


// ============================================================
// FUN_004f3d60 — constructor_init (MFC framework)
// ============================================================

export function FUN_004f3d60() {
  // MFC framework constructor — SEH setup, thunk calls
  // DEVIATION: MFC framework — no game logic
  FUN_0043c260();
  FUN_0059db08(0x4000);
  return;
}


// ============================================================
// FUN_004f3e20 — scalar_deleting_destructor (MFC framework)
// ============================================================

export function FUN_004f3e20(param_1) {
  // MFC destructor stub
  FUN_004f3e70();
  return;
}


// ============================================================
// FUN_004f3e70 — destructor_inner (MFC framework)
// ============================================================

export function FUN_004f3e70() {
  // MFC destructor — SEH cleanup
  FUN_004f3ebb();
  FUN_004f3ee5();
  FUN_004f3ef8();
  return;
}


// ============================================================
// FUN_004f3ebb — destructor_helper_ebb (MFC framework)
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f3ebb (42 bytes)
export function FUN_004f3ebb() {
  // DEVIATION: Win32 — unaff_EBP-relative stack frame access
  // C: if (*(int *)(unaff_EBP + -0x14) == 0) {
  // C:   *(unaff_EBP + -0x10) = 0;
  // C: } else {
  // C:   *(unaff_EBP + -0x10) = *(unaff_EBP + -0x14) + 0x4a4;
  // C: }
  // DEVIATION: MFC — thunk_FUN_0059df8a()
  FUN_0059df8a();
  return;
}


// ============================================================
// FUN_004f3ee5 — destructor_helper_ee5 (MFC framework)
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f3ee5 (9 bytes)
export function FUN_004f3ee5() {
  // DEVIATION: MFC — CDaoFieldInfo::~CDaoFieldInfo(*(unaff_EBP + -0x14))
  return;
}


// ============================================================
// FUN_004f3ef8 — seh_cleanup_ef8 (MFC framework)
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f3ef8 (14 bytes)
export function FUN_004f3ef8() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}


// ============================================================
// FUN_004f3f30 — city_message_wrapper
// ============================================================

export function FUN_004f3f30(param_1, param_2, param_3) {
  FUN_004eb571(param_1, param_2, 0, param_3);
  return;
}


// ============================================================
// FUN_004f3f60 — set_dat_0062f004
// ============================================================

export function FUN_004f3f60(param_1) {
  G.DAT_0062f004 = param_1;
  return;
}


// ============================================================
// FID_conflict___E31 (at 0x004F3F80) — static_init_E31_a
// ============================================================

export function FID_conflict___E31_004f3f80() {
  FUN_004f3f9a();
  FUN_004f3fb4();
  return;
}


// ============================================================
// FUN_004f3f9a — static_init_call_3feb
// ============================================================

export function FUN_004f3f9a() {
  FUN_004f3feb();
  return;
}


// ============================================================
// FUN_004f3fb4 — register_atexit_3fd1
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f3fb4 (29 bytes)
export function FUN_004f3fb4() {
  // DEVIATION: Win32 — _atexit(FUN_004f3fd1)
  return;
}


// ============================================================
// FUN_004f3fd1 — atexit_handler_3fd1
// ============================================================

export function FUN_004f3fd1() {
  FUN_004f44a7();
  return;
}


// ============================================================
// FUN_004f3feb — civilopedia_constructor
// ============================================================

export function FUN_004f3feb() {
  // MFC constructor with SEH + many child object inits
  // DEVIATION: MFC UI constructor — no game logic
  FUN_0044c5a0();
  for (let i = 0; i < 16; i++) {
    FUN_0040f3e0();
  }
  FUN_004187a0();
  FUN_0040fb00();
  return;
}


// ============================================================
// FUN_004f44a7 — civilopedia_destructor
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f44a7 (460 bytes)
export function FUN_004f44a7() {
  // C: MFC destructor — frees lists, bitmap resources, child windows
  // C: Frees bitmap resources at in_ECX[0x5c4] and in_ECX[0x6c8] via FUN_00453aa0
  // DEVIATION: MFC (in_ECX) — resource handles not available
  FUN_004f4809(); // free string lists
  FUN_004f4793(); // free page items
  FUN_004083b0();
  FUN_004f4673();
  FUN_004f4682();
  FUN_004f4691();
  FUN_004f46a0();
  FUN_004f46af();
  FUN_004f46be();
  FUN_004f46cd();
  FUN_004f46dc();
  FUN_004f46eb();
  FUN_004f46fa();
  FUN_004f4709();
  FUN_004f4718();
  FUN_004f4727();
  FUN_004f4736();
  FUN_004f4745();
  FUN_004f4754();
  FUN_004f4763();
  FUN_004f4772();
  FUN_004f4785();
  return;
}


// ============================================================
// FUN_004f4673 — destroy_child_0 (UI teardown)
// ============================================================

export function FUN_004f4673() {
  FUN_0040fbb0();
  return;
}


// ============================================================
// FUN_004f4682 — destroy_child_1 (UI teardown)
// ============================================================

export function FUN_004f4682() {
  FUN_00418870();
  return;
}


// ============================================================
// FUN_004f4691 — destroy_child_2 (UI teardown)
// ============================================================

export function FUN_004f4691() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f46a0 — destroy_child_3 (UI teardown)
// ============================================================

export function FUN_004f46a0() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f46af — destroy_child_4 (UI teardown)
// ============================================================

export function FUN_004f46af() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f46be — destroy_child_5 (UI teardown)
// ============================================================

export function FUN_004f46be() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f46cd — destroy_child_6 (UI teardown)
// ============================================================

export function FUN_004f46cd() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f46dc — destroy_child_7 (UI teardown)
// ============================================================

export function FUN_004f46dc() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f46eb — destroy_child_8 (UI teardown)
// ============================================================

export function FUN_004f46eb() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f46fa — destroy_child_9 (UI teardown)
// ============================================================

export function FUN_004f46fa() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f4709 — destroy_child_10 (UI teardown)
// ============================================================

export function FUN_004f4709() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f4718 — destroy_child_11 (UI teardown)
// ============================================================

export function FUN_004f4718() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f4727 — destroy_child_12 (UI teardown)
// ============================================================

export function FUN_004f4727() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f4736 — destroy_child_13 (UI teardown)
// ============================================================

export function FUN_004f4736() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f4745 — destroy_child_14 (UI teardown)
// ============================================================

export function FUN_004f4745() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f4754 — destroy_child_15 (UI teardown)
// ============================================================

export function FUN_004f4754() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f4763 — destroy_child_16 (UI teardown)
// ============================================================

export function FUN_004f4763() {
  FUN_0040f570();
  return;
}


// ============================================================
// FUN_004f4772 — destroy_base_object (UI teardown)
// ============================================================

export function FUN_004f4772() {
  FUN_0044cba0();
  return;
}


// ============================================================
// FUN_004f4785 — seh_cleanup_4785 (MFC framework)
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f4785 (14 bytes)
export function FUN_004f4785() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}


// ============================================================
// FUN_004f4793 — free_linked_list_entries
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f4793 (118 bytes)
export function FUN_004f4793() {
  // C: Frees linked list at in_ECX+8000 (page items)
  // C: While node exists: save next (node+0x44), delete node, advance
  // C: Then calls FUN_00419b80 to finalize
  // DEVIATION: MFC (in_ECX) — cannot access dialog object
  FUN_00419b80();
}


// ============================================================
// FUN_004f4809 — free_civilopedia_string_lists
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f4809 (918 bytes)
// Source: decompiled/block_004F0000.c FUN_004f4809 (918 bytes)
export function FUN_004f4809() {
  let uVar1;
  // DEVIATION: MFC (in_ECX) — free 10 linked lists at dialog offsets
  let offsets = [0x16dc, 0x16e0, 0x16e4, 0x16e8, 0x16ec,
                 0x16f0, 0x16f4, 0x16f8, 0x16fc, 0x1700];
  for (let listIdx = 0; listIdx < offsets.length; listIdx++) {
    // DEVIATION: in_ECX not available — walk would be:
    // while (ri(in_ECX, offsets[listIdx]) !== 0) {
    //   uVar1 = ri(ri(in_ECX, offsets[listIdx]), 8);
    //   if (ri(ri(in_ECX, offsets[listIdx]), 0) !== 0) {
    //     operator_delete(ri(ri(in_ECX, offsets[listIdx]), 0));
    //   }
    //   operator_delete(ri(in_ECX, offsets[listIdx]));
    //   wi(in_ECX, offsets[listIdx], uVar1);
    // }
  }
}


// ============================================================
// FUN_004f4b9f — civilopedia_setup_ui (UI layout)
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f4b9f (3950 bytes)
export function FUN_004f4b9f() {
  // C: Main civilopedia/production dialog setup — 310 lines of MFC layout
  // C: Creates scrollbar (operator_new, FUN_0040fb00), tab buttons (FUN_0040f680),
  //    list control (FUN_004bb620), search field, help button
  // C: Uses SetRect, OffsetRect, GetSystemMetrics for layout
  // C: Calls FUN_004f4809 (free old lists), FUN_004f4793 (free old pages),
  //    FUN_004f7c99 (populate entries)
  // DEVIATION: MFC dialog setup — cannot create Win32 controls
  FUN_004f4809(); // free old string lists
  FUN_004f4793(); // free old page items
  FUN_004f7c99(); // populate entry arrays
}


// ============================================================
// FUN_004f5b24 — civilopedia_reset_view
// ============================================================

export function FUN_004f5b24() {
  if (G.DAT_006a678c === 1) {
    FUN_InvalidateObjectCache(G.DAT_006a66b0);
    G.DAT_006a678c = 0;
  }
  FUN_004f4793();
  G.DAT_006a6790 = 0;
  FUN_004f5dd1();
  return;
}


// ============================================================
// FUN_004f5b6f — civilopedia_navigate_back
// ============================================================

export function FUN_004f5b6f() {
  if (G.DAT_006a6790 !== 0) {
    do {
      G.DAT_006a6790 = G.DAT_006a6790 + -1;
      if (((G.DAT_006a6790 === 0) || (G.DAT_006a6ab4[G.DAT_006a6790 * 4] !== G.DAT_006a6780)) ||
         (G.DAT_006a6924[G.DAT_006a6790 * 4] !== G.DAT_006a6784)) break;
    } while (G.DAT_006a6794[G.DAT_006a6790 * 4] === G.DAT_006a6788);
    if (G.DAT_006a6790 !== 0) {
      G.DAT_0062f00c = 1;
      G.DAT_0062f010 = G.DAT_006a6794[G.DAT_006a6790 * 4];
      G.DAT_006a85b0 = G.DAT_006a6924[G.DAT_006a6790 * 4];
      G.DAT_006a85ac = G.DAT_006a6ab4[G.DAT_006a6790 * 4];
    }
    if (G.DAT_006a6924[G.DAT_006a6790 * 4] !== 0) {
      G.DAT_006a6780 = G.DAT_006a6ab4[G.DAT_006a6790 * 4];
      G.DAT_006a6784 = G.DAT_006a6924[G.DAT_006a6790 * 4] + -1;
      G.DAT_006a6788 = G.DAT_006a6794[G.DAT_006a6790 * 4];
      G.DAT_006a85a0 = G.DAT_006a6788;
      FUN_004f5f23(1);
      return;
    }
    G.DAT_006a6780 = G.DAT_006a6ab4[G.DAT_006a6790 * 4];
    G.DAT_006a6784 = 1;
    G.DAT_006a6788 = G.DAT_006a6794[G.DAT_006a6790 * 4];
    G.DAT_006a85a0 = G.DAT_006a6788;
  }
  if (G.DAT_006a6784 === 0) {
    if (G.DAT_006a678c === 1) {
      FUN_InvalidateObjectCache(G.DAT_006a66b0);
      G.DAT_006a678c = 0;
    }
    FUN_004f5dd1();
  }
  else {
    if (G.DAT_006a6784 === 1) {
      G.DAT_006a6784 = 0;
      FUN_00451bf0();
      FUN_004f5e52();
      G.DAT_006a85a0 = G.DAT_006a6788;
      FUN_004f6646();
    }
    else if ((G.DAT_006a6780 === 6) || (G.DAT_006a6780 === 7)) {
      G.DAT_006a6784 = 0;
      FUN_00451bf0();
      FUN_004f5e52();
      G.DAT_006a85a0 = G.DAT_006a6788;
      FUN_004f6646();
    }
    else {
      G.DAT_006a6784 = 0;
      FUN_004f5f23(1);
    }
    FUN_004f8af9();
  }
  return;
}


// ============================================================
// FUN_004f5dd1 — civilopedia_close_view
// ============================================================

export function FUN_004f5dd1() {
  G.DAT_006a677c = 1;
  G.DAT_006a6790 = 0;
  if (G.DAT_006a8188 !== 0) {
    FUN_00453aa0(1);
    G.DAT_006a8188 = 0;
  }
  FUN_004503d0();
  FUN_00451900();
  FUN_00484d52();
  return 0;
}


// ============================================================
// FUN_004f5e52 — civilopedia_update_display
// ============================================================

export function FUN_004f5e52() {
  if (G.DAT_006a677c === 0) {
    if (G.DAT_006a6784 === 0) {
      FUN_004f7ac7(G.DAT_006a6780);
    }
    FUN_004f4793();
    FUN_005a9780(G.DAT_006a6668);
    FUN_004f6244();
    FUN_00451af0(G.DAT_006a6780, G.DAT_006a6784);
    FUN_00408460();
  }
  return;
}


// ============================================================
// FUN_004f5ed2 — civilopedia_show_category_8
// ============================================================

export function FUN_004f5ed2() {
  G.DAT_006a6784 = 0;
  G.DAT_006a6780 = 8;
  FUN_00451bf0();
  FUN_004f5e52();
  G.DAT_006a85a0 = G.DAT_006a6788;
  FUN_004f6646();
  FUN_004f8af9();
  return;
}


// ============================================================
// FUN_004f5f23 — civilopedia_show_entry
// ============================================================

export function FUN_004f5f23() {
  let uVar1;
  let uVar2;

  uVar1 = G.DAT_006a85a0;
  if (G.DAT_006a6784 === 0) {
    G.DAT_006a6788 = G.DAT_006a85a0;
    G.DAT_006a6784 = 1;
    FUN_004f4793();
    FUN_00451bf0();
    switch(G.DAT_006a6780) {
    case 1:
    case 8:
      uVar1 = FUN_004f8a9b(G.DAT_006a7d44, uVar1);
      FUN_005f22d0(G.DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_00564e6d();
      break;
    case 2:
      uVar1 = FUN_004f8a9b(G.DAT_006a7d48, uVar1);
      FUN_005f22d0(G.DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_00599b8d();
      break;
    case 3:
      uVar1 = FUN_004f8a9b(G.DAT_006a7d4c, uVar1);
      FUN_005f22d0(G.DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_0052630d();
      break;
    case 4:
      uVar1 = FUN_004f8a9b(G.DAT_006a7d50, uVar1);
      FUN_005f22d0(G.DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_005ac9ad();
      break;
    case 5:
      uVar1 = FUN_004f8a9b(G.DAT_006a7d58, uVar1);
      FUN_005f22d0(G.DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_004906fd();
      break;
    case 6:
      G.DAT_006a6784 = 2;
      uVar2 = FUN_004f8a9b(G.DAT_006a7d54, uVar1);
      FUN_005f22d0(G.DAT_006a6c80, uVar2);
      FUN_004f6244();
      FUN_004f6564(G.DAT_006a6c60, 1);
      FUN_00452315(uVar1);
      break;
    case 7:
      G.DAT_006a6784 = 2;
      uVar2 = FUN_004f8a9b(G.DAT_006a7d5c, uVar1);
      FUN_005f22d0(G.DAT_006a6c80, uVar2);
      FUN_004f6244();
      FUN_004f6564(G.DAT_006a6c60, 1);
      FUN_00452315(uVar1);
      break;
    default:
      FUN_0040bbe0(s_This_Should_not_Happen_0062f020);
    }
    FUN_00408460();
  }
  else if (G.DAT_006a6784 === 1) {
    G.DAT_006a6784 = 2;
    FUN_004f4793();
    FUN_00451bf0();
    FUN_004f6244();
    FUN_004f6564(G.DAT_006a6c60, 0);
    FUN_00452315(uVar1);
  }
  FUN_004f8af9();
  return;
}


// ============================================================
// FUN_004f6244 — civilopedia_draw_page (UI rendering)
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f6244 (800 bytes)
export function FUN_004f6244() {
  let iVar1, iVar2;
  let local_34 = new Uint8Array(16);
  let local_24, local_20, local_1c, local_18;

  FUN_005c0034(); // DEVIATION: begin paint
  // DEVIATION: FID_conflict__memcpy(&local_14, in_ECX + 0x5e8, 0x10)
  for (local_18 = 0; local_18 < G.DAT_0062d864; local_18 = local_18 + 1) {
    FUN_005a99fc(0 /*in_ECX*/, 0 /*&local_14*/, G.DAT_00635a08, G.DAT_00635a0c); // DEVIATION: draw border
    FUN_004bb800(0 /*&local_14*/, 1, 1); // DEVIATION: adjust rect
  }
  FUN_004f6564(0 /*&local_14*/, 1); // draw top separator
  FUN_004bb800(0 /*&local_14*/, G.DAT_0062d860 + G.DAT_0062d864 * -2, 0); // DEVIATION: adjust
  // DEVIATION: local_14.top adjustment, _Timevec destructor
  iVar1 = FUN_00407fc0(0 /*in_ECX + 0x5e8*/); // DEVIATION: get height
  for (local_18 = 0; local_18 < G.DAT_0062d864; local_18 = local_18 + 1) {
    FUN_005a99fc(0 /*in_ECX*/, 0 /*&local_14*/, G.DAT_00635a0c, G.DAT_00635a08); // DEVIATION: draw border
    FUN_004bb800(0 /*&local_14*/, 1, 1);
  }
  FUN_004f6564(0 /*&local_14*/, 2); // draw bottom separator
  // C: compute layout dimensions
  // DEVIATION: writes to in_ECX+0x5dc, +0x5e0 — MFC dialog state
  // DEVIATION: SetRect, FUN_005cd775 (scale), FUN_005cef31 (draw icon)
  // DEVIATION: FUN_005c19ad (text color), FUN_005c0f57 (draw text) with shadow
  FUN_0047df50(); // DEVIATION: MFC
  FUN_005c19ad(10); // DEVIATION: set text color
  FUN_005c0f57(0, 0, 0, 0, 5); // DEVIATION: draw text shadow
  FUN_005c19ad(0x1a); // DEVIATION: set text color
  FUN_005c0f57(0, 0, 0, 0, 5); // DEVIATION: draw text
  FUN_005c0f57(0, 0, 0, 0, 5); // DEVIATION: draw text
  FUN_005c0073(0 /*in_ECX + 0x5f8*/); // DEVIATION: end paint
}


// ============================================================
// FUN_004f6564 — civilopedia_draw_border (UI rendering)
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f6564 (226 bytes)
export function FUN_004f6564(param_1, param_2) {
  // C: Draws separator border in city window production panel
  // C: If G.DAT_00635aa0 != 0 && param_2 == 1: draws top bitmap border via FUN_005a9b5d
  // C: If G.DAT_00635aa4 != 0 && param_2 == 2: draws bottom bitmap border via FUN_005a9b5d
  // C: Otherwise: draws simple border via FUN_0040fdb0
  // DEVIATION: MFC rendering — cannot draw without GDI context
  if (G.DAT_00635aa0 === 0 || param_2 !== 1) {
    if (G.DAT_00635aa4 === 0 || param_2 !== 2) {
      FUN_0040fdb0(); // DEVIATION: simple border
    } else {
      let uVar1 = FUN_00407fc0(param_1, 0, 0); // DEVIATION: get rect width
      uVar1 = FUN_00407f90(param_1, uVar1); // DEVIATION: get rect height
      // FUN_005a9b5d(in_ECX, G.DAT_00635aa4, param_1[0], param_1[1], uVar1); // DEVIATION: MFC bitmap border
    }
  } else {
    let uVar1 = FUN_00407fc0(param_1, 0, 0); // DEVIATION: get rect width
    uVar1 = FUN_00407f90(param_1, uVar1); // DEVIATION: get rect height
    // FUN_005a9b5d(in_ECX, G.DAT_00635aa0, param_1[0], param_1[1], uVar1); // DEVIATION: MFC bitmap border
  }
}


// ============================================================
// FUN_004f6646 — civilopedia_handle_category_select
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f6646 (113 bytes)
export function FUN_004f6646() {
  // C: Dispatches city window paint based on in_ECX+0x11c (view mode)
  // C: Mode 0, not category 8: FUN_004f66c6 (production list)
  // C: Mode != 0,1,2: FUN_004f5dd1 (other view)
  // DEVIATION: MFC (in_ECX) — cannot read dialog state
  // Default to production list view
  FUN_004f66c6();
}


// ============================================================
// FUN_004f66c6 — civilopedia_draw_entry_list (UI rendering)
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f66c6 (3016 bytes)
export function FUN_004f66c6() {
  let iVar1, iVar2, iVar3;
  let local_3c = 0;
  let local_50, local_4c, local_74, local_1c, local_7c;
  let local_64, local_60, local_5c, local_58;
  let local_78, local_30, local_34, local_48, local_38;
  let local_18 = new Uint8Array(16);

  FUN_004f8af9(); // push navigation state
  FUN_005c00ce(local_18); // DEVIATION: save DC
  FUN_005c0073(0 /*in_ECX + 0x1b24*/); // DEVIATION: select DC
  FUN_005c0333(0 /*in_ECX + 0x1b24*/, G.DAT_00635a18); // DEVIATION: fill background
  // DEVIATION: reads in_ECX+0x1b24 (DC), in_ECX+0x1b28 (top), in_ECX+0x1b34 (count)
  local_50 = 0; // DEVIATION: in_ECX+0x1b24
  local_4c = FUN_00407f90(0 /*in_ECX + 0x1b24*/); // DEVIATION: get width
  local_74 = (local_4c / 2) | 0;
  local_1c = FUN_00407fc0(0 /*in_ECX + 0x1b24*/); // DEVIATION: get height
  local_1c = (local_1c / 9) | 0;
  iVar1 = (local_1c / 2) | 0;
  iVar2 = FUN_0040ef70(); // DEVIATION: get font height
  local_7c = iVar1 - ((iVar2 / 2) | 0);
  local_64 = 0;
  do {
    if (1 < local_64) {
      FUN_005c0073(local_18); // DEVIATION: restore DC
      FUN_0040f380(); // DEVIATION: release DC
      return;
    }
    local_60 = local_64 * 9;
    for (local_5c = 0; local_5c < 9; local_5c = local_5c + 1) {
      local_58 = 0 + local_1c * local_5c; // DEVIATION: in_ECX+0x1b28
      SetRect(0 /*&local_2c*/, local_50, local_58, local_74 + local_50 - 2, local_1c + local_58);
      // DEVIATION: check if entry visible via in_ECX+0x1f3c, in_ECX+0x1b34
      local_78 = 0; // DEVIATION: entry index from in_ECX+0x1b38 array
      local_30 = 0; // DEVIATION: selection state vs G.DAT_006a85a0
      if (local_30 === 0) {
        local_34 = G.DAT_00635a1c; // normal text color
        local_48 = G.DAT_00635a20; // normal bg color
      } else {
        local_34 = G.DAT_00635a28; // selected text color
        local_48 = G.DAT_00635a2c; // selected bg color
      }
      FUN_005cda06(0, 0); // DEVIATION: get icon dimensions
      // Switch on view mode: in_ECX+0x118
      // case 1: tech — G.DAT_00646cb8 table
      // case 2: wonder — G.DAT_00645160 table
      // case 3: improvement — G.DAT_00645160 table
      // case 4: unit — G.DAT_0064b1bc table
      // case 5: terrain
      // case 6: government
      // case 7: concept
      // DEVIATION: each case draws icon via FUN_005cd775 + FUN_005cdb33, text via FUN_005c0f57
      FUN_005c0333(0 /*&local_2c*/, local_48); // DEVIATION: fill entry background
      FUN_0040bbb0(); // DEVIATION: text setup
      FUN_0040bbe0(0); // DEVIATION: set text
      FUN_005c19ad(local_34); // DEVIATION: set text color
      FUN_005c0f57(0, 0, 0, local_58 + local_7c, 5); // DEVIATION: draw text
    }
    local_64 = local_64 + 1;
  } while (true);
}


// ============================================================
// FUN_004f7313 — civilopedia_scroll_page
// ============================================================

export function FUN_004f7313(param_1) {
  if (G.DAT_006a85a4 !== param_1 * 9) {
    G.DAT_006a85a4 = param_1 * 9;
    FUN_004f66c6();
  }
  return;
}


// ============================================================
// FUN_004f734a — civilopedia_hit_test
// ============================================================

export function FUN_004f734a(param_1, param_2) {
  let iVar1;
  let local_14;
  let local_c;

  if (param_2 < G.DAT_006a8190) {
    local_14 = -1;
  }
  else if (param_2 < G.DAT_006a8198) {
    if (param_1 < G.DAT_006a818c) {
      local_14 = -3;
    }
    else if (param_1 < G.DAT_006a8194) {
      iVar1 = FUN_00407f90(G.DAT_006a818c);
      local_c = (G.DAT_006a818c + iVar1 / 2 <= param_1) ? 1 : 0;
      iVar1 = FUN_00407fc0(G.DAT_006a818c);
      local_14 = ((param_2 - G.DAT_006a8190) / (iVar1 / 9)) + local_c * 9 + G.DAT_006a85a4;
      if (G.DAT_006a819c <= local_14) {
        local_14 = -5;
      }
    }
    else {
      local_14 = -4;
    }
  }
  else {
    local_14 = -2;
  }
  return local_14;
}


// ============================================================
// FUN_004f7454 — civilopedia_ensure_visible
// ============================================================

export function FUN_004f7454(param_1) {
  if (param_1 < G.DAT_006a85a4) {
    for (G.DAT_006a85a4 = param_1; G.DAT_006a85a4 % 9 !== 0; G.DAT_006a85a4 = G.DAT_006a85a4 + -1) {
    }
  }
  else if (G.DAT_006a85a4 + 0x12 <= param_1) {
    for (G.DAT_006a85a4 = param_1; G.DAT_006a85a4 % 9 !== 0; G.DAT_006a85a4 = G.DAT_006a85a4 + -1) {
    }
  }
  FUN_004f6646();
  return;
}


// ============================================================
// FUN_004f74eb — civilopedia_find_by_first_letter
// ============================================================

export function FUN_004f74eb(param_1) {
  let iVar1;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  switch(G.DAT_006a6780) {
  case 1:
    local_10 = G.DAT_006a7d44;
    local_14 = G.DAT_006a6cc0;
    break;
  case 2:
    local_10 = G.DAT_006a7d48;
    local_14 = G.DAT_006a6fe4;
    break;
  case 3:
    local_10 = G.DAT_006a7d4c;
    local_14 = G.DAT_006a7120;
    break;
  case 4:
    local_10 = G.DAT_006a7d50;
    local_14 = G.DAT_006a7204;
    break;
  case 5:
    local_10 = G.DAT_006a7d58;
    local_14 = G.DAT_006a7434;
    break;
  case 6:
    local_10 = G.DAT_006a7d54;
    local_14 = G.DAT_006a73f8;
    break;
  case 7:
    local_10 = G.DAT_006a7d5c;
    local_14 = G.DAT_006a7540;
    break;
  default:
    return -1;
  }
  local_8 = local_10;
  local_c = G.DAT_006a85a0 + 1;
  if (G.DAT_006a819c <= local_c) {
    local_c = 0;
  }
  for (; local_c !== 0; local_c = local_c - 1) {
    if (local_8[2] === 0) {
      local_8 = local_10;
    }
    else {
      local_8 = local_8[2];
    }
  }
  local_c = G.DAT_006a85a0 + 1;
  if (G.DAT_006a819c <= local_c) {
    local_c = 0;
  }
  while ((local_14 !== 0 &&
         (iVar1 = FUN_toupper(s8(local_8[0])), iVar1 !== param_1))) {
    if (local_8[2] === 0) {
      local_8 = local_10;
      local_c = 0;
    }
    else {
      local_8 = local_8[2];
      local_c = local_c + 1;
    }
    local_14 = local_14 + -1;
  }
  if (local_14 === 0) {
    local_c = -1;
  }
  return local_c;
}


// ============================================================
// FUN_004f76ce — civilopedia_handle_keypress
// ============================================================

export function FUN_004f76ce(param_1) {
  let iVar1;
  let iVar2;

  iVar2 = G.DAT_006a85a0;
  if (G.DAT_006a6784 === 0) {
    iVar1 = FUN_toupper(param_1);
    if ((iVar1 < 0x41) || (0x5a < iVar1)) {
      switch(iVar1) {
      case 0xa1:
      case 199:
        G.DAT_006a6788 = G.DAT_006a819c + -1;
        for (G.DAT_006a85a4 = G.DAT_006a6788; G.DAT_006a85a4 % 9 !== 0; G.DAT_006a85a4 = G.DAT_006a85a4 + -1) {
        }
        G.DAT_006a85a0 = G.DAT_006a6788;
        FUN_004f6646();
        FUN_0040fcf0(G.DAT_006a85a4 / 9);
        break;
      case 0xa2:
      case 0xc1:
        iVar2 = iVar2 + 1;
        if (iVar2 < G.DAT_006a819c) {
          G.DAT_006a6788 = iVar2;
          G.DAT_006a85a0 = iVar2;
          FUN_004f7454(iVar2);
          FUN_0040fcf0(G.DAT_006a85a4 / 9);
        }
        break;
      case 0xa3:
      case 0xa6:
      case 0xc3:
      case 0xc6:
        iVar2 = iVar2 + 9;
        if (iVar2 < G.DAT_006a819c) {
          G.DAT_006a6788 = iVar2;
          G.DAT_006a85a0 = iVar2;
          FUN_004f7454(iVar2);
          FUN_0040fcf0(G.DAT_006a85a4 / 9);
        }
        break;
      case 0xa4:
      case 0xa9:
      case 0xc2:
      case 0xc5:
        iVar2 = iVar2 + -9;
        if (-1 < iVar2) {
          G.DAT_006a6788 = iVar2;
          G.DAT_006a85a0 = iVar2;
          FUN_004f7454(iVar2);
          FUN_0040fcf0(G.DAT_006a85a4 / 9);
        }
        break;
      case 0xa7:
      case 0xc4:
        G.DAT_006a6788 = 0;
        G.DAT_006a85a0 = 0;
        G.DAT_006a85a4 = 0;
        FUN_0040fcf0(0);
        FUN_004f6646();
        break;
      case 0xa8:
      case 0xc0:
        iVar2 = iVar2 + -1;
        if (-1 < iVar2) {
          G.DAT_006a6788 = iVar2;
          G.DAT_006a85a0 = iVar2;
          FUN_004f7454(iVar2);
          FUN_0040fcf0(G.DAT_006a85a4 / 9);
        }
        break;
      case 0xd0:
        break;
      }
    }
    else {
      iVar2 = FUN_004f74eb(iVar1);
      if (-1 < iVar2) {
        G.DAT_006a6788 = iVar2;
        G.DAT_006a85a0 = iVar2;
        FUN_004f7454(iVar2);
        FUN_0040fcf0(G.DAT_006a85a4 / 9);
      }
    }
  }
  return;
}


// ============================================================
// FUN_004f7a30 — civilopedia_handle_mouse_click
// ============================================================

export function FUN_004f7a30() {
  let iVar1;
  let local_c = 0;
  let local_8 = 0;

  if ((((G.DAT_006a6784 === 0) && (FUN_00451890(local_8, local_c), G.DAT_006a819c !== 0)) &&
      (iVar1 = FUN_004f734a(local_8, local_c), -1 < iVar1)) && (iVar1 < G.DAT_006a819c)) {
    G.DAT_006a6788 = iVar1;
    G.DAT_006a85a0 = iVar1;
    FUN_004f6646();
  }
  return;
}


// ============================================================
// FUN_004f7ac7 — civilopedia_set_category_title
// ============================================================

export function FUN_004f7ac7(param_1) {
  FUN_0040bbb0();
  switch(param_1) {
  case 1:
  case 8:
    FUN_0040bc10(0x29f);
    break;
  case 2:
    FUN_0040bc10(0x2a0);
    break;
  case 3:
    FUN_0040bc10(0x2a1);
    break;
  case 4:
    FUN_0040bc10(0x2a2);
    break;
  case 5:
    FUN_0040bc10(0x2a3);
    break;
  case 6:
    FUN_0040bc10(0x2a4);
    break;
  case 7:
    FUN_0040bc10(0x2a5);
    break;
  default:
    FUN_0040bbe0(s_This_Should_not_Happen_0062f078);
  }
  FUN_005f22d0(/* in_ECX + 0x618 */ 0, G.DAT_00679640);
  return;
}


// ============================================================
// FUN_004f7bd1 — civilopedia_open_category
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f7bd1 (200 bytes)
export function FUN_004f7bd1(param_1, param_2) {
  // C: Initializes civilopedia dialog for category param_1
  // DEVIATION: MFC (in_ECX) — sets in_ECX+0x114=0, +0x11c=0, +0x120=0,
  //   +0x118=param_1, +0x128=0
  G.DAT_0062f010 = -1;
  G.DAT_0062f00c = 0;
  FUN_004f7ac7(param_1);
  FUN_00451bf0(); // DEVIATION: MFC
  // DEVIATION: MFC — sets in_ECX+0x118 = param_1 again
  FUN_005bb574(); // DEVIATION: MFC
  if (param_2 !== 0) {
    FUN_004085f0(); // DEVIATION: MFC
  }
  FUN_0040f350(0); // DEVIATION: MFC
  FUN_004518d0(); // DEVIATION: MFC
  FUN_004f8af9(); // DEVIATION: MFC
}


// ============================================================
// FUN_004f7c99 — civilopedia_parse_help_text
// ============================================================

export function FUN_004f7c99() {
  // Parses DESCRIBE sections from help text files
  // Builds linked lists of sorted entries for 7 categories:
  //   advances, improvements, wonders, units, governments, terrain, concepts
  // DEVIATION: complex file parsing + UI data structure setup — uses in_ECX
  let iVar2;
  let local_18;

  // Initialize arrays to -1
  // ... (7 arrays of varying sizes initialized to 0xffffffff)

  FUN_004f4809();

  iVar2 = FUN_004a2379(s_Describe_0062f094, s__ADVANCE_INDEX_0062f0a0);
  if (iVar2 === 0) {
    FUN_004a23fc(1);
    FUN_004a2534();
    // ... parse advance entries
    FUN_004a2020();
  }

  iVar2 = FUN_004a2379(s_Describe_0062f094, s__IMPROVEMENT_INDEX_0062f0b0);
  if (iVar2 === 0) {
    // ... parse improvement entries
    FUN_004a2020();
  }

  iVar2 = FUN_004a2379(s_Describe_0062f094, s__WONDER_INDEX_0062f0c4);
  if (iVar2 === 0) {
    // ... parse wonder entries
    FUN_004a2020();
  }

  iVar2 = FUN_004a2379(s_Describe_0062f094, s__UNIT_INDEX_0062f0d4);
  if (iVar2 === 0) {
    // ... parse unit entries
    FUN_004a2020();
  }

  iVar2 = FUN_004a2379(s_Describe_0062f094, s__GOVERNMENT_INDEX_0062f0e0);
  if (iVar2 === 0) {
    // ... parse government entries
    FUN_004a2020();
  }

  iVar2 = FUN_004a2379(s_Describe_0062f094, s__TERRAIN_INDEX_0062f0f4);
  if (iVar2 === 0) {
    // ... parse terrain entries
    FUN_004a2020();
  }

  iVar2 = FUN_004a2379(s_Describe_0062f094, s_CONCEPT_DESCRIPTIONS_0062f108);
  if (iVar2 === 0) {
    // ... parse concept entries
  }
  return;
}


// ============================================================
// FUN_004f896a — sort_civilopedia_entries
// ============================================================

export function FUN_004f896a(param_1, param_2, param_3, param_4) {
  let uVar1;
  let iVar2;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  local_c = param_1;
  local_8 = param_1;
  for (local_14 = 0; local_14 < param_4 + -1; local_14 = local_14 + 1) {
    local_18 = local_14;
    if (local_8[2] !== 0) {
      local_c = local_8[2];
    }
    while (local_18 = local_18 + 1, local_18 < param_4) {
      iVar2 = FUN_strcmp(local_8[0], local_c[0]);
      if (0 < iVar2) {
        uVar1 = param_2[local_14 * 4];
        param_2[local_14 * 4] = param_2[local_18 * 4];
        param_2[local_18 * 4] = uVar1;
        uVar1 = param_3[local_14 * 4];
        param_3[local_14 * 4] = param_3[local_18 * 4];
        param_3[local_18 * 4] = uVar1;
        uVar1 = local_8[0];
        local_8[0] = local_c[0];
        local_c[0] = uVar1;
      }
      if (local_c[2] !== 0) {
        local_c = local_c[2];
      }
    }
    if (local_8[2] !== 0) {
      local_8 = local_8[2];
    }
  }
  return;
}


// ============================================================
// FUN_004f8a9b — civilopedia_get_entry_name
// ============================================================

export function FUN_004f8a9b(param_1, param_2) {
  let puVar1;
  let local_8;

  for (local_8 = param_1; (local_8 !== null && (local_8[1] !== param_2));
      local_8 = local_8[2]) {
  }
  puVar1 = PTR_DAT_0062f008;
  if (local_8 !== null) {
    puVar1 = local_8[0];
  }
  return puVar1;
}


// ============================================================
// FUN_004f8af9 — civilopedia_push_history
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004f8af9 (523 bytes)
export function FUN_004f8af9() {
  // DEVIATION: MFC (in_ECX) — reads/writes dialog navigation history
  // C: if (in_ECX+0x128 < 99 && G.DAT_0062f00c === 0) {
  //      Complex condition checking current state vs history:
  //      if (stack empty || different state || mode 8) {
  //        if (different category/subcategory/entry) {
  //          if (G.DAT_0062f010 >= 0) {
  //            push G.DAT_0062f010 to in_ECX+0x12c[depth]
  //            push G.DAT_006a85b0 to in_ECX+0x2bc[depth]
  //            push G.DAT_006a85ac to in_ECX+0x44c[depth]
  //            in_ECX+0x128++
  //          }
  //          push in_ECX+0x120 to in_ECX+0x12c[depth]
  //          push in_ECX+0x11c to in_ECX+0x2bc[depth]
  //          push in_ECX+0x118 to in_ECX+0x44c[depth]
  //          in_ECX+0x128++
  //        }
  //      } else {
  //        overwrite current entry at depth
  //      }
  //    }
  G.DAT_0062f010 = -1;
  G.DAT_0062f00c = 0;
}


// ============================================================
// FUN_004f8d04 — civilopedia_refresh
// ============================================================

export function FUN_004f8d04() {
  FUN_0047e94e(1, 0);
  if ((G.DAT_006a678c === 0) || (G.DAT_006a677c === 1)) {
    FUN_InvalidateObjectCache(G.DAT_006a66b0);
    G.DAT_006a678c = 0;
  }
  return;
}


// ============================================================
// FUN_004f8d51 — civilopedia_invalidate_cache
// ============================================================

export function FUN_004f8d51() {
  FUN_InvalidateObjectCache(G.DAT_006a66b0);
  return;
}


// ============================================================
// FID_conflict__scalar_deleting_destructor_ (at 0x004FA0F0) — CControlBarInfo_delete
// ============================================================

export function FID_conflict__scalar_deleting_destructor__004fa0f0(param_1) {
  FUN_CControlBarInfo_destructor();
  return;
}


// ============================================================
// CControlBarInfo::~CControlBarInfo (at 0x004FA140) — CControlBarInfo destructor
// ============================================================

export function FUN_CControlBarInfo_destructor() {
  FUN_004fa17e();
  FUN_004fa194();
  return;
}


// ============================================================
// FUN_004fa17e — CControlBarInfo_helper_17e
// ============================================================

export function FUN_004fa17e() {
  FUN_00452a67();
  return;
}


// ============================================================
// FUN_004fa194 — seh_cleanup_a194 (MFC framework)
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004fa194 (14 bytes)
export function FUN_004fa194() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}


// ============================================================
// FID_conflict___E31 (at 0x004FA1C0) — static_init_E31_b
// ============================================================

export function FID_conflict___E31_004fa1c0() {
  FUN_004fa1da();
  FUN_004fa1f4();
  return;
}


// ============================================================
// FUN_004fa1da — static_init_call_5c64da
// ============================================================

export function FUN_004fa1da() {
  FUN_005c64da();
  return;
}


// ============================================================
// FUN_004fa1f4 — register_atexit_fa211
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004fa1f4 (29 bytes)
export function FUN_004fa1f4() {
  // DEVIATION: Win32 — _atexit(FUN_004fa211)
  return;
}


// ============================================================
// FUN_004fa211 — atexit_handler_fa211
// ============================================================

export function FUN_004fa211() {
  FUN_005c656b();
  return;
}


// ============================================================
// FUN_004fa250 — scenario_find_civ_by_name
// ============================================================

export function FUN_004fa250(param_1) {
  let iVar1;
  let _Str2;
  let local_8;

  iVar1 = FUN_strcmpi(param_1, s_ANYBODY_0062f1f4);
  if (iVar1 === 0) {
    iVar1 = -2;
  }
  else {
    iVar1 = FUN_strcmpi(param_1, s_TRIGGERATTACKER_0062f1fc);
    if (iVar1 === 0) {
      iVar1 = -3;
    }
    else {
      iVar1 = FUN_strcmpi(param_1, s_TRIGGERDEFENDER_0062f20c);
      if (iVar1 === 0) {
        iVar1 = -4;
      }
      else {
        iVar1 = FUN_strcmpi(param_1, s_TRIGGERRECEIVER_0062f21c);
        if (iVar1 === 0) {
          iVar1 = -4;
        }
        else {
          for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
            _Str2 = FUN_00493c7d(local_8);
            iVar1 = FUN_strcmpi(param_1, _Str2);
            if (iVar1 === 0) {
              return local_8;
            }
          }
          if (G.DAT_0062f160 !== 0) {
            FUN_printf(s_Could_not_find_0062f22c, param_1);
          }
          iVar1 = -1;
        }
      }
    }
  }
  return iVar1;
}


// ============================================================
// FUN_004fa359 — scenario_find_unit_by_name
// ============================================================

export function FUN_004fa359(param_1) {
  let iVar1;
  let _Str2;
  let local_8;

  iVar1 = FUN_strcmpi(param_1, s_ANYUNIT_0062f250);
  if (iVar1 === 0) {
    iVar1 = -2;
  }
  else {
    for (local_8 = 0; local_8 < 0x3e; local_8 = local_8 + 1) {
      _Str2 = FUN_00428b0c(G.DAT_0064b1b8[local_8 * 0x14]);
      iVar1 = FUN_strcmpi(param_1, _Str2);
      if (iVar1 === 0) {
        return local_8;
      }
    }
    if (G.DAT_0062f160 !== 0) {
      FUN_printf(s_Could_not_find_unit_0062f258, param_1);
    }
    iVar1 = -1;
  }
  return iVar1;
}


// ============================================================
// FUN_004fa403 — scenario_find_terrain_by_name
// ============================================================

export function FUN_004fa403(param_1) {
  let iVar1;
  let local_8;

  local_8 = 0;
  while (true) {
    if (10 < local_8) {
      if (G.DAT_0062f160 !== 0) {
        FUN_printf(s_Could_not_find_terraintype_0062f280, param_1);
      }
      return -1;
    }
    iVar1 = FUN_strcmpi(param_1, PTR_s_DESERT_0062f168[local_8]);
    if (iVar1 === 0) break;
    local_8 = local_8 + 1;
  }
  return local_8;
}


// ============================================================
// FUN_004fa47e — scenario_pool_reset_and_set
// ============================================================

export function FUN_004fa47e(param_1) {
  // DEVIATION: in_ECX-based pool operations
  FUN_004980ec(/* in_ECX + 0x2f4 */ 0);
  FUN_00497ea0(/* in_ECX + 0x2f4 */ 0, 0xc, param_1);
  return;
}


// ============================================================
// FUN_004fa4be — scenario_events_constructor
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004fa4be (152 bytes)
export function FUN_004fa4be(param_1) {
  // C: Event pool constructor — SEH setup, initializes pool at in_ECX
  // C: Sets in_ECX+0x2f5=0, in_ECX+0x30c=0, in_ECX+0x308=0
  // DEVIATION: SEH (FS_OFFSET), MFC (in_ECX)
  FUN_0059db08(0x4000);
  FUN_00428cb0();
  FUN_004fa5d9(param_1);
}


// ============================================================
// FUN_004fa569 — scenario_events_destructor
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004fa569 (79 bytes)
export function FUN_004fa569() {
  // C: Event pool destructor — calls FUN_004980ec(in_ECX+0x2f4) to free pool
  // DEVIATION: SEH, MFC (in_ECX)
  FUN_004980ec(0);
  FUN_004fa5b8();
  FUN_004fa5cb();
}


// ============================================================
// FUN_004fa5b8 — destructor_helper_5b8
// ============================================================

export function FUN_004fa5b8() {
  FUN_0059df8a();
  return;
}


// ============================================================
// FUN_004fa5cb — seh_cleanup_5cb
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004fa5cb (14 bytes)
export function FUN_004fa5cb() {
  // DEVIATION: Win32 — SEH epilog: *unaff_FS_OFFSET = *(unaff_EBP + -0xc)
  return;
}


// ============================================================
// FUN_004fa5d9 — scenario_events_init
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004fa5d9 (62 bytes)
export function FUN_004fa5d9(param_1) {
  // C: Clears event pool — sets in_ECX+0x30c=0, in_ECX+0x308=0
  // C: Calls FUN_004fa47e(param_1) to resize pool buffer
  // DEVIATION: MFC (in_ECX)
  FUN_004fa47e(param_1);
}


// ============================================================
// FUN_004fa617 — scenario_alloc_event_struct
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004fa617 (240 bytes)
export function FUN_004fa617() {
  let _Dst;
  let local_8;
  // DEVIATION: MFC (in_ECX) — reads/writes dialog event pool

  // C: Find tail of linked list at in_ECX+0x30c
  local_8 = 0; // DEVIATION: ri(in_ECX, 0x30c)
  if (local_8 !== 0) {
    for (; ri(local_8, 0x1bc) !== 0; local_8 = ri(local_8, 0x1bc)) {}
  }
  // C: Allocate 0x1c4 bytes from pool
  _Dst = FUN_00498159(0 /*in_ECX + 0x2f4*/, 0x1c4); // DEVIATION: MFC heap alloc
  if (_Dst === 0 || _Dst === null) {
    return null;
  }
  _memset(_Dst, 0, 0x1c4); // DEVIATION: memset
  // C: Link into list
  if (local_8 === 0) {
    // First node
    // DEVIATION: wi(in_ECX, 0x30c, _Dst)
    wi(_Dst, 0x1bc, 0); // next = null
    wi(_Dst, 0x1c0, 0); // prev = null
  } else {
    // Append to tail
    wi(local_8, 0x1bc, _Dst); // tail->next = new
    wi(_Dst, 0x1c0, local_8); // new->prev = tail
    wi(_Dst, 0x1bc, 0); // new->next = null
  }
  // DEVIATION: wi(in_ECX, 0x308, ri(in_ECX, 0x308) + 1) — increment count
  return _Dst;
}


// ============================================================
// FUN_004fa707 — scenario_event_play_sound
// ============================================================

export function FUN_004fa707(param_1) {
  let uVar1;
  let iVar2;
  let local_f4 = '';

  if ((G.DAT_00655aea & 0x10) === 0) {
    uVar1 = 0;
  }
  else {
    if (param_1[0x184 / 4] !== 0) {
      FUN_005f22d0(local_f4, G.DAT_0064bb08);
      FUN_005f22e0(local_f4, s__SOUND__0062f2b0);
      FUN_005f22e0(local_f4, param_1[0x184 / 4]);
      iVar2 = FUN_00415133(local_f4);
      if (iVar2 === 0) {
        FUN_005f22d0(local_f4, G.DAT_00655020);
        FUN_005f22e0(local_f4, s__SOUND__0062f2b8);
        FUN_005f22e0(local_f4, param_1[0x184 / 4]);
        iVar2 = FUN_00415133(local_f4);
        if (iVar2 !== 0) {
          FUN_005d6038(local_f4, 0, 0, 0);
        }
      }
      else {
        FUN_005d6038(local_f4, 0, 0, 0);
      }
    }
    uVar1 = 1;
  }
  return uVar1;
}


// ============================================================
// FUN_004fa82d — scenario_event_flag_ai_update
// ============================================================

export function FUN_004fa82d() {
  G.DAT_006a9110 = 1;
  return 1;
}


// ============================================================
// FUN_004fa854 — scenario_event_play_cd_track
// ============================================================

export function FUN_004fa854(param_1) {
  let uVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  while (local_8 < 10) {
    local_8 = local_8 + 1;
    local_c = FUN_005ddeff();  // DEVIATION: CD detection
    if (((local_c === 0x18) || (local_c === 0x12)) || (local_c === 0xc) || (local_c === 10)) break;
    FUN_005dde57();  // DEVIATION: CD seek
  }
  if (((local_c === 10) || (local_c === 0x12)) || ((local_c === 0x18 || (local_c === 0xc)))) {
    if ((param_1[0x188 / 4] < 2) || (local_c < param_1[0x188 / 4])) {
      uVar1 = 0;
    }
    else {
      FUN_0046e571(param_1[0x188 / 4], 1);
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


// ============================================================
// FUN_004fa944 — scenario_event_change_money
// ============================================================

export function FUN_004fa944(param_1) {
  let uVar1;
  let iVar2;
  let local_c;

  if (param_1[0x178 / 4] === -3) {
    local_c = param_1[0x18 / 4];
  }
  else if (param_1[0x178 / 4] === -4) {
    local_c = param_1[0x24 / 4];
  }
  else if (param_1[0x178 / 4] === -4) {
    local_c = param_1[0x24 / 4];
  }
  else {
    local_c = param_1[0x178 / 4];
  }
  if ((local_c < 1) || (7 < local_c)) {
    uVar1 = 0;
  }
  else if ((1 << (u8(local_c) & 0x1f) & G.DAT_00655b0a) === 0) {
    uVar1 = 0;
  }
  else {
    iVar2 = param_1[0x17c / 4] + G.DAT_0064c6a2[local_c * 0x594];
    if ((iVar2 < 0) || (30000 < iVar2)) {
      if (param_1[0x17c / 4] < 0) {
        G.DAT_0064c6a2[local_c * 0x594] = 0;
      }
      else {
        G.DAT_0064c6a2[local_c * 0x594] = 30000;
      }
    }
    else {
      G.DAT_0064c6a2[local_c * 0x594] = iVar2;
    }
    uVar1 = 1;
  }
  return uVar1;
}


// ============================================================
// FUN_004faab0 — scenario_event_display_text
// ============================================================

export function FUN_004faab0(param_1) {
  let local_c;
  let local_8;

  local_8 = 0;
  FUN_00421dd0();
  for (local_c = 0; local_c < 0x14; local_c = local_c + 1) {
    if (param_1[0x38 / 4 + local_c] !== 0) {
      FUN_0059e18b(param_1[0x38 / 4 + local_c], 0xffffffff, 0xffffffff, 0xffffffff, 0);
      if (2 < G.DAT_00655b02) {
        FUN_005f22d0(G.DAT_0063cc48[local_8 * 0x104], param_1[0x38 / 4 + local_c]);
        local_8 = local_8 + 1;
      }
    }
  }
  if (G.DAT_00654fa8 === 0) {
    if (2 < G.DAT_00655b02) {
      FUN_00511880(0x4f, 0xff, local_8, 0, 0, 0);
    }
    FUN_0040bc80(0);
  }
  return 1;
}


// ============================================================
// FUN_004faba6 — scenario_event_make_aggression
// ============================================================

export function FUN_004faba6(param_1) {
  let uVar1;
  let local_c;
  let local_8;

  if (param_1[0xd0 / 4] === -3) {
    local_c = param_1[0x18 / 4];
  }
  else if (param_1[0xd0 / 4] === -4) {
    local_c = param_1[0x24 / 4];
  }
  else if (param_1[0xd0 / 4] === -4) {
    local_c = param_1[0x24 / 4];
  }
  else {
    local_c = param_1[0xd0 / 4];
  }
  if (param_1[200 / 4] === -3) {
    local_8 = param_1[0x18 / 4];
  }
  else if (param_1[200 / 4] === -4) {
    local_8 = param_1[0x24 / 4];
  }
  else if (param_1[200 / 4] === -4) {
    local_8 = param_1[0x24 / 4];
  }
  else {
    local_8 = param_1[200 / 4];
  }
  if (((local_8 < 1) || (7 < local_8)) || ((1 << (u8(local_8) & 0x1f) & G.DAT_00655b0a) === 0))
  {
    uVar1 = 0;
  }
  else if (((local_c < 1) || (7 < local_c)) ||
          ((1 << (u8(local_c) & 0x1f) & G.DAT_00655b0a) === 0)) {
    uVar1 = 0;
  }
  else {
    uVar1 = FUN_00579c40(local_c, local_8);
  }
  return uVar1;
}


// ============================================================
// FUN_004fad02 — scenario_event_destroy_civilization
// ============================================================

export function FUN_004fad02(param_1) {
  let uVar1;
  let local_8;

  if (param_1[0x1b0 / 4] === -3) {
    local_8 = param_1[0x18 / 4];
  }
  else if (param_1[0x1b0 / 4] === -4) {
    local_8 = param_1[0x24 / 4];
  }
  else if (param_1[0x1b0 / 4] === -4) {
    local_8 = param_1[0x24 / 4];
  }
  else {
    local_8 = param_1[0x1b0 / 4];
  }
  if (((local_8 < 1) || (7 < local_8)) || ((1 << (u8(local_8) & 0x1f) & G.DAT_00655b0a) === 0))
  {
    uVar1 = 0;
  }
  else {
    if (((1 << (u8(local_8) & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_006d1da0 === local_8)) {
      G.DAT_0064b1ac = 4;
    }
    FUN_004e1763(local_8, 1, 1);
    uVar1 = 1;
  }
  return uVar1;
}


// ============================================================
// FUN_004fadfb — scenario_event_give_technology
// ============================================================

export function FUN_004fadfb(param_1) {
  let uVar1;
  let local_8;

  if (param_1[0x1b8 / 4] === -3) {
    local_8 = param_1[0x18 / 4];
  }
  else if (param_1[0x1b8 / 4] === -4) {
    local_8 = param_1[0x24 / 4];
  }
  else if (param_1[0x1b8 / 4] === -4) {
    local_8 = param_1[0x24 / 4];
  }
  else {
    local_8 = param_1[0x1b8 / 4];
  }
  if (((local_8 < 1) || (7 < local_8)) || ((1 << (u8(local_8) & 0x1f) & G.DAT_00655b0a) === 0))
  {
    uVar1 = 0;
  }
  else {
    FUN_004bf05b(local_8, param_1[0x1b4 / 4], 0, 0, 0);
    uVar1 = 1;
  }
  return uVar1;
}


// ============================================================
// FUN_004faed4 — scenario_event_create_unit
// ============================================================

export function FUN_004faed4(param_1) {
  let uVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  local_14 = 10000;
  local_18 = 10000;
  if (param_1[0xd8 / 4] === -3) {
    local_c = param_1[0x18 / 4];
  }
  else if (param_1[0xd8 / 4] === -4) {
    local_c = param_1[0x24 / 4];
  }
  else if (param_1[0xd8 / 4] === -4) {
    local_c = param_1[0x24 / 4];
  }
  else {
    local_c = param_1[0xd8 / 4];
  }
  if ((1 << (u8(local_c) & 0x1f) & G.DAT_00655b0a) === 0) {
    uVar1 = 0;
  }
  else {
    for (local_1c = 0; iVar4 = local_18, iVar3 = local_14, local_1c < param_1[0x134 / 4];
        local_1c = local_1c + 1) {
      iVar3 = param_1[0xe4 / 4 + local_1c * 2];
      iVar4 = param_1[0xe8 / 4 + local_1c * 2];
      iVar2 = FUN_004087c0(iVar3, iVar4);
      if (iVar2 !== 0) {
        if (G.DAT_0064b1c1[param_1[0xe0 / 4] * 0x14] === 0x02) {
          iVar2 = FUN_005b89e4(iVar3, iVar4);
          if (iVar2 !== 0) break;
          iVar2 = FUN_0043cf76(iVar3, iVar4);
          if ((iVar2 !== -1) &&
             (iVar2 = FUN_0043cf76(iVar3, iVar4), (G.DAT_0064f344[iVar2 * 0x58] & 0x80) !== 0))
          {
            iVar2 = FUN_005b8ca6(iVar3, iVar4);
            if (iVar2 === local_c) break;
          }
        }
        else {
          iVar2 = FUN_005b89e4(iVar3, iVar4);
          if (((iVar2 === 0) || (G.DAT_0064b1c1[param_1[0xe0 / 4] * 0x14] === 0x01)) &&
             ((iVar2 = FUN_0043cf76(iVar3, iVar4), iVar2 === -1 ||
              (iVar2 = FUN_005b8ca6(iVar3, iVar4), iVar2 === local_c)))) {
            iVar2 = FUN_005b8d62(iVar3, iVar4);
            if (iVar2 !== -1) {
              iVar2 = FUN_005b8d62(iVar3, iVar4);
              if (iVar2 === local_c) break;
            }
            else {
              break;
            }
          }
        }
      }
    }
    local_14 = iVar3;
    local_18 = iVar4;
    if ((local_14 === 10000) && (local_18 === 10000)) {
      uVar1 = 0;
    }
    else {
      iVar3 = FUN_005b3d06(param_1[0xe0 / 4], local_c, local_14, local_18);
      if (iVar3 === -1) {
        uVar1 = 0;
      }
      else {
        if (param_1[0x138 / 4] !== 0) {
          G.DAT_006560f4[iVar3 * 0x20] =
               G.DAT_006560f4[iVar3 * 0x20] | 0x2000;
        }
        G.DAT_00656100[iVar3 * 0x20] = 0xff;
        if (param_1[0x13c / 4] !== 0) {
          for (local_8 = 0; local_8 < G.DAT_00655b18; local_8 = local_8 + 1) {
            if ((s32(G.DAT_0064f394, local_8 * 0x58) !== 0) &&
               (iVar4 = FUN_strcmpi(G.DAT_0064f360[local_8 * 0x58], param_1[0x13c / 4]),
               iVar4 === 0)) {
              if (s8(G.DAT_0064f348[local_8 * 0x58]) === local_c) {
                G.DAT_00656100[iVar3 * 0x20] = u8(local_8);
              }
              break;
            }
          }
        }
        uVar1 = 1;
      }
    }
  }
  return uVar1;
}


// ============================================================
// FUN_004fb29f — scenario_event_move_unit
// ============================================================

export function FUN_004fb29f(param_1) {
  let iVar1;
  let iVar2;
  let iVar3;
  let local_3c;
  let local_38;
  let local_34;
  let local_28;
  let local_24 = [0, 0, 0, 0];
  let local_14 = [0, 0, 0, 0];

  if (param_1[0x8c / 4] === -3) {
    local_28 = param_1[0x18 / 4];
  }
  else if (param_1[0x8c / 4] === -4) {
    local_28 = param_1[0x24 / 4];
  }
  else if (param_1[0x8c / 4] === -4) {
    local_28 = param_1[0x24 / 4];
  }
  else {
    local_28 = param_1[0x8c / 4];
  }
  if ((1 << (u8(local_28) & 0x1f) & G.DAT_00655b0a) === 0) {
    local_38 = 0;
  }
  else if ((1 << (u8(local_28) & 0x1f) & G.DAT_00655b0b) === 0) {
    for (local_34 = 0; local_34 < 4; local_34 = local_34 + 1) {
      local_14[local_34] = param_1[0x9c / 4 + local_34 * 2];
      local_24[local_34] = param_1[0xa0 / 4 + local_34 * 2];
    }
    local_38 = 0;
    local_3c = G.DAT_00655b16;
    do {
      do {
        do {
          local_3c = local_3c + -1;
          if (local_3c < 0) {
            return local_38;
          }
        } while (
          (G.DAT_0065610a[local_3c * 0x20] === 0) ||
          (((param_1[0x94 / 4] !== local_3c && (param_1[0x94 / 4] !== -2)) ||
            (s8(G.DAT_006560f7[local_3c * 0x20]) !== local_28)) ||
           ((0x62 < s8(G.DAT_0064b1c4[u8(G.DAT_006560f6[local_3c * 0x20]) * 0x14])) ||
            (G.DAT_006560ff[local_3c * 0x20] === 0x10))) ||
          (0x03 < s8(G.DAT_006560ff[local_3c * 0x20])) ||
          (G.DAT_006560ff[local_3c * 0x20] === 0x03)
        );
        iVar1 = s16(G.DAT_006560f0, local_3c * 0x20);
        iVar2 = s16(G.DAT_006560f2, local_3c * 0x20);
        iVar3 = FUN_004087c0(iVar1, iVar2);
      } while ((((iVar3 === 0) || (iVar1 < local_14[0])) ||
               ((local_14[1] < iVar1 ||
                (((local_14[2] < iVar1 || (iVar1 < local_14[3])) || (iVar2 < local_24[0])))))) ||
              (((iVar2 < local_24[1] || (local_24[2] < iVar2)) || (local_24[3] < iVar2))));
      G.DAT_006560ff[local_3c * 0x20] = 0xb;
      G.DAT_006560fc[local_3c * 0x20] = 0x37;
      w16(G.DAT_00656102, local_3c * 0x20, param_1[0xbc / 4]);
      w16(G.DAT_00656104, local_3c * 0x20, param_1[0xc0 / 4]);
      local_38 = local_38 + 1;
    } while ((local_38 < param_1[0x98 / 4]) || (param_1[0x98 / 4] === -2));
  }
  else {
    local_38 = 0;
  }
  return local_38;
}


// ============================================================
// FUN_004fb5b2 — scenario_event_change_terrain
// ============================================================

export function FUN_004fb5b2(param_1) {
  let bVar1;
  let iVar2;
  let puVar3;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_24 = [0, 0, 0, 0];
  let local_14 = [0, 0, 0, 0];

  local_34 = 0;
  for (local_3c = 0; local_3c < 4; local_3c = local_3c + 1) {
    local_14[local_3c] = param_1[400 / 4 + local_3c * 2];
    local_24[local_3c] = param_1[0x194 / 4 + local_3c * 2];
  }
  for (local_30 = local_14[0]; local_30 <= local_14[1]; local_30 = local_30 + 1) {
    for (local_38 = local_24[0]; local_38 <= local_24[3]; local_38 = local_38 + 1) {
      iVar2 = FUN_004087c0(local_30, local_38);
      if (iVar2 !== 0) {
        iVar2 = FUN_0043cf76(local_30, local_38);
        if (-1 < iVar2) {
          delete_city(iVar2, 0);
        }
        for (local_44 = FUN_005b2e69(local_30, local_38); -1 < local_44;
            local_44 = FUN_005b2c82(local_44)) {
          FUN_005b4391(local_44, 1);
        }
      }
    }
  }
  for (local_30 = local_14[0]; local_30 <= local_14[1]; local_30 = local_30 + 1) {
    for (local_38 = local_24[0]; local_38 <= local_24[3]; local_38 = local_38 + 1) {
      iVar2 = FUN_004087c0(local_30, local_38);
      if (iVar2 !== 0) {
        puVar3 = FUN_005b8931(local_30, local_38);
        tileWrite(puVar3, 0, u8(param_1[0x18c / 4])); // terrain type byte
        iVar2 = FUN_005b8931(local_30, local_38);
        tileWrite(iVar2, 1, 0); // improvement byte
        iVar2 = FUN_005b8931(local_30, local_38);
        tileWrite(iVar2, 2, 0); // resource byte
        iVar2 = FUN_005b8931(local_30, local_38);
        tileWrite(iVar2, 3, 0); // visibility byte
        for (local_48 = 0; local_48 < 8; local_48 = local_48 + 1) {
          FUN_005b8b1a(local_30, local_38, local_48);
        }
        FUN_0047cea6(local_30, local_38);
        local_34 = local_34 + 1;
      }
    }
  }
  for (local_40 = 0; local_40 < G.DAT_00655b18; local_40 = local_40 + 1) {
    if (s32(G.DAT_0064f394, local_40 * 0x58) !== 0) {
      FUN_0043f7a7(local_40);
    }
  }
  for (local_48 = 0; local_48 < 8; local_48 = local_48 + 1) {
    bVar1 = false;
    for (local_40 = 0; local_40 < G.DAT_00655b18; local_40 = local_40 + 1) {
      if ((s32(G.DAT_0064f394, local_40 * 0x58) !== 0) &&
         (s8(G.DAT_0064f348[local_40 * 0x58]) === local_48)) {
        bVar1 = true;
      }
    }
    if (!bVar1) {
      local_44 = G.DAT_00655b16;
      while (local_44 = local_44 + -1, -1 < local_44) {
        if ((G.DAT_0065610a[local_44 * 0x20] !== 0) &&
           (s8(G.DAT_006560f7[local_44 * 0x20]) === local_48)) {
          FUN_005b4391(local_44, 1);
        }
      }
      if (((1 << (u8(local_48) & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_006d1da0 === local_48))
      {
        G.DAT_0064b1ac = 4;
      }
      for (local_30 = 0; local_30 < G.DAT_006d1160; local_30 = local_30 + 1) {
        for (local_38 = 0; local_38 < G.DAT_006d1162; local_38 = local_38 + 1) {
          iVar2 = FUN_005b8931(local_30, local_38);
          tileWrite(iVar2, 4, tileRead(iVar2, 4) & ~(1 << (u8(local_48) & 0x1f)));
        }
      }
      new_civ(local_48);
      FUN_0047cf9e(G.DAT_006d1da0, 1);
    }
  }
  return local_34;
}


// ============================================================
// FUN_004fba0c — scenario_check_turn_events
// ============================================================

export function FUN_004fba0c(param_1) {
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = /* in_ECX[0x30c] */ null;
  if (local_8 === null) {
    local_c = 0;
  }
  else {
    do {
      if ((local_8[0] === 4) && ((local_8[0xb] === -1 || (local_8[0xb] === param_1)))) {
        local_c = 1;
        FUN_004fc3ae(local_8);
      }
      local_8 = local_8[0x6f];
    } while (local_8 !== null);
  }
  return local_c;
}


// ============================================================
// FUN_004fba9c — scenario_check_turn_interval_events
// ============================================================

export function FUN_004fba9c(param_1) {
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = /* in_ECX[0x30c] */ null;
  if (local_8 === null) {
    local_c = 0;
  }
  else {
    do {
      if ((local_8[0] === 8) && ((local_8[0xb] === 0 || (param_1 % local_8[0xb] === 0)))) {
        local_c = 1;
        FUN_004fc3ae(local_8);
      }
      local_8 = local_8[0x6f];
    } while (local_8 !== null);
  }
  return local_c;
}


// ============================================================
// FUN_004fbb2f — scenario_check_random_turn_events
// ============================================================

export function FUN_004fbb2f() {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = /* in_ECX[0x30c] */ null;
  if (local_8 === null) {
    local_c = 0;
  }
  else {
    do {
      if (local_8[0] === 0x40) {
        if (local_8[0xc] < 2) {
          local_10 = 1;
        }
        else {
          iVar1 = Math.floor(Math.random() * 0x7fff);
          local_10 = iVar1 % local_8[0xc] + 1;
        }
        if (local_8[0xc] === local_10) {
          local_c = 1;
          FUN_004fc3ae(local_8);
        }
      }
      local_8 = local_8[0x6f];
    } while (local_8 !== null);
  }
  return local_c;
}


// ============================================================
// FUN_004fbbdd — scenario_check_received_technology_events
// ============================================================

export function FUN_004fbbdd() {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = /* in_ECX[0x30c] */ null;
  if (local_8 === null) {
    local_c = 0;
  }
  else {
    do {
      if (local_8[0] === 0x100) {
        if (local_8[9] === -2) {
          for (local_10 = 0; local_10 < 8; local_10 = local_10 + 1) {
            if (((1 << (u8(local_10) & 0x1f) & G.DAT_00655b0a) !== 0) &&
               (iVar1 = FUN_004bd9f0(local_10, local_8[0xd]), iVar1 !== 0)) {
              local_8[9] = local_10;
              local_c = 1;
              FUN_004fc3ae(local_8);
            }
          }
        }
        else if ((((0 < local_8[9]) || (local_8[9] < 8)) &&
                 ((1 << (u8(local_8[9]) & 0x1f) & G.DAT_00655b0a) !== 0)) &&
                (iVar1 = FUN_004bd9f0(local_8[9], local_8[0xd]), iVar1 !== 0)) {
          local_c = 1;
          FUN_004fc3ae(local_8);
        }
      }
      local_8 = local_8[0x6f];
    } while (local_8 !== null);
  }
  return local_c;
}


// ============================================================
// FUN_004fbd2b — scenario_check_scenario_loaded_events
// ============================================================

export function FUN_004fbd2b() {
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = /* in_ECX[0x30c] */ null;
  if (local_8 === null) {
    local_c = 0;
  }
  else {
    do {
      if (local_8[0] === 0x20) {
        local_c = 1;
        FUN_004fc3ae(local_8);
      }
      local_8 = local_8[0x6f];
    } while (local_8 !== null);
  }
  return local_c;
}


// ============================================================
// FUN_004fbd9d — scenario_check_unit_killed_events
// ============================================================

export function FUN_004fbd9d(param_1, param_2, param_3) {
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = /* in_ECX[0x30c] */ null;
  if (local_8 === null) {
    local_c = 0;
  }
  else {
    do {
      if (((local_8[0] === 1) && (local_8[3] === param_1)) &&
          ((local_8[9] === param_3 || (local_8[9] === -2))) &&
         ((local_8[6] === param_2 || (local_8[6] === -2)))) {
        local_c = 1;
        if (local_8[6] === -2) {
          local_8[6] = param_2;
        }
        if (local_8[9] === -2) {
          local_8[9] = param_3;
        }
        FUN_004fc3ae(local_8);
      }
      local_8 = local_8[0x6f];
    } while (local_8 !== null);
  }
  return local_c;
}


// ============================================================
// FUN_004fbe84 — scenario_check_negotiation_events
// ============================================================

export function FUN_004fbe84(param_1, param_2) {
  let piVar1;
  let bVar2;
  let bVar3;

  piVar1 = /* in_ECX[0x30c] */ null;
  do {
    if (piVar1 === null) {
      return 1;
    }
    if (piVar1[0] === 0x10) {
      if (((piVar1[6] === param_1) || (piVar1[6] === -2)) &&
         ((((1 << (u8(piVar1[6]) & 0x1f) & G.DAT_00655b0b) !== 0 &&
           ((piVar1[7] === 1 || (piVar1[7] === 4)))) ||
          (((1 << (u8(piVar1[6]) & 0x1f) & G.DAT_00655b0b) === 0 &&
           ((piVar1[7] === 2 || (piVar1[7] === 4)))))))) {
        bVar2 = true;
      }
      else {
        bVar2 = false;
      }
      if (((piVar1[9] === param_2) || (piVar1[9] === -2)) &&
         ((((G.DAT_00655b0b & 1 << (u8(piVar1[9]) & 0x1f)) !== 0 &&
           ((piVar1[10] === 1 || (piVar1[10] === 4)))) ||
          (((G.DAT_00655b0b & 1 << (u8(piVar1[9]) & 0x1f)) === 0 &&
           ((piVar1[10] === 2 || (piVar1[10] === 4)))))))) {
        bVar3 = true;
      }
      else {
        bVar3 = false;
      }
      if ((bVar2) && (bVar3)) {
        if (piVar1[0x60] === 0x1000) {
          FUN_004fc3ae(piVar1);
          return 0;
        }
        FUN_004fc3ae(piVar1);
        return 1;
      }
      if ((2 < G.DAT_00655b02) &&
         (((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) !== 0 &&
          ((1 << (u8(param_2) & 0x1f) & G.DAT_00655b0b) !== 0)))) {
        if (((piVar1[6] === param_2) || (piVar1[6] === -2)) &&
           ((((1 << (u8(piVar1[6]) & 0x1f) & G.DAT_00655b0b) !== 0 &&
             ((piVar1[7] === 1 || (piVar1[7] === 4)))) ||
            (((1 << (u8(piVar1[6]) & 0x1f) & G.DAT_00655b0b) === 0 &&
             ((piVar1[7] === 2 || (piVar1[7] === 4)))))))) {
          bVar2 = true;
        }
        else {
          bVar2 = false;
        }
        if (((piVar1[9] === param_1) || (piVar1[9] === -2)) &&
           ((((G.DAT_00655b0b & 1 << (u8(piVar1[9]) & 0x1f)) !== 0 &&
             ((piVar1[10] === 1 || (piVar1[10] === 4)))) ||
            (((G.DAT_00655b0b & 1 << (u8(piVar1[9]) & 0x1f)) === 0 &&
             ((piVar1[10] === 2 || (piVar1[10] === 4)))))))) {
          bVar3 = true;
        }
        else {
          bVar3 = false;
        }
        if ((bVar2) && (bVar3)) {
          if (piVar1[0x60] === 0x1000) {
            FUN_004fc3ae(piVar1);
            return 0;
          }
          FUN_004fc3ae(piVar1);
          return 1;
        }
      }
    }
    piVar1 = piVar1[0x6f];
  } while (true);
}


// ============================================================
// FUN_004fc20d — scenario_check_noschism_events
// ============================================================

export function FUN_004fc20d(param_1) {
  let bVar1;
  let uVar2;
  let local_c;

  bVar1 = false;
  local_c = /* in_ECX[0x30c] */ null;
  if (local_c === null) {
    uVar2 = 1;
  }
  else {
    do {
      if ((local_c[0] === 0x80) && ((local_c[9] === param_1 || (local_c[9] === -2)))) {
        FUN_004fc3ae(local_c);
        bVar1 = true;
      }
      local_c = local_c[0x6f];
    } while (local_c !== null);
    if (bVar1) {
      uVar2 = 0;
    }
    else {
      uVar2 = 1;
    }
  }
  return uVar2;
}


// ============================================================
// FUN_004fc2bb — scenario_check_city_taken_events
// ============================================================

export function FUN_004fc2bb(param_1, param_2, param_3) {
  let iVar1;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = /* in_ECX[0x30c] */ null;
  if (local_8 === null) {
    local_c = 0;
  }
  else {
    do {
      if ((((local_8[0] === 2) && (iVar1 = FUN_strcmpi(local_8[4], param_1), iVar1 === 0)) &&
          ((local_8[6] === param_2 || (local_8[6] === -2)))) &&
         ((local_8[9] === param_3 || (local_8[9] === -2)))) {
        if (local_8[6] === -2) {
          local_8[6] = param_2;
        }
        if (local_8[9] === -2) {
          local_8[9] = param_3;
        }
        local_c = 1;
        FUN_004fc3ae(local_8);
      }
      local_8 = local_8[0x6f];
    } while (local_8 !== null);
  }
  return local_c;
}


// ============================================================
// FUN_004fc3ae — scenario_execute_event_actions
// ============================================================

export function FUN_004fc3ae(param_1) {
  let uVar1;
  // C uses *(byte*)(param_1+4) and *(byte*)(param_1+5) for action flag bytes.
  // In JS with int-array model: byte4 = param_1[1] & 0xFF, byte5 = (param_1[1] >> 8) & 0xFF
  // Since bit tests on byte4 with mask<256 work directly on param_1[1],
  // byte5 tests need mask shifted left by 8.

  if (((param_1[1] & 0x40) === 0) || ((param_1[1] & 0x2000) === 0)) {
    if ((param_1[1] & 0x10) !== 0) {
      FUN_004fa707(param_1);
    }
    if ((param_1[1] & 0x80) !== 0) {
      FUN_004fa854(param_1);
    }
    if ((param_1[1] & 4) !== 0) {
      FUN_004faed4(param_1);
    }
    if ((param_1[1] & 2) !== 0) {
      FUN_004fb29f(param_1);
    }
    if ((param_1[1] & 0x200) !== 0) {  // byte5 & 2 → 0x200
      FUN_004fb5b2(param_1);
    }
    if ((param_1[1] & 0x20) !== 0) {
      FUN_004faba6(param_1);
    }
    if ((param_1[1] & 8) !== 0) {
      FUN_004fa944(param_1);
    }
    if ((param_1[1] & 0x400) !== 0) {  // byte5 & 4 → 0x400
      FUN_004fad02(param_1);
    }
    if ((param_1[1] & 0x800) !== 0) {  // byte5 & 8 → 0x800
      FUN_004fadfb(param_1);
    }
    if ((param_1[1] & 1) !== 0) {
      FUN_004faab0(param_1);
    }
    if ((param_1[1] & 0x100) !== 0) {  // byte5 & 1 → 0x100
      FUN_004fa82d(param_1);
    }
    if ((param_1[1] & 0x40) !== 0) {
      param_1[1] = param_1[1] | 0x2000;
    }
    uVar1 = 1;
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


// ============================================================
// FUN_004fc516 — scenario_parse_events_file
// ============================================================

// Source: decompiled/block_004F0000.c FUN_004fc516 (12813 bytes)
// Scenario event file parser — parses @IF/@THEN/@ENDIF event blocks from events.txt
// Trigger keywords: @UNITKILLED, @CITYTAKEN, @TURN, @TURNINTERVAL, @RANDOMTURN,
//   @NEGOTIATION, @NOSCHISM, @RECEIVEDTECHNOLOGY, @SCENARIOLOADED
// Action keywords: @TEXT, @CREATEUNIT, @MOVEUNIT, @CHANGETERRAIN, @CHANGEMONEY,
//   @GIVETECHNOLOGY, @MAKEAGGRESSION, @DESTROYACIVILIZATION, @DONTPLAYWONDERS,
//   @JUSTONCE, @PLAYCDTRACK, @PLAYWAVEFILE
// Control: @IF, @THEN, @ENDIF, @ENDEVENTS, @DEBUG
export function FUN_004fc516(param_1, param_2) {
  let iVar1;
  let sVar2;
  let pcVar3;
  let iVar4;
  // in_ECX — MFC this pointer (event manager object)
  let local_84;
  let local_80;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68; // event struct (int array)
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_3c; // current line
  let local_38;
  let local_34;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  local_44 = 1;
  local_4c = 1;
  G.DAT_0062f160 = 0;
  let _parseError = false;
  iVar1 = FUN_004a2379(param_1, param_2);
  if (iVar1 === 0) {
    do {
      local_3c = FUN_004a23fc(1);
      if (local_3c === null || local_3c === 0) {
        local_4c = 10;
      }
      else if (local_3c.charAt(0) === '@') {
        local_3c = local_3c.substring(1);
        iVar1 = _strcmpi(local_3c, 'IF');
        if (iVar1 === 0) {
          if (G.DAT_0062f160 !== 0) {
            _printf('IF found - creating new event structure');
          }
          local_68 = FUN_004fa617();
          if (local_68 === null || local_68 === 0) {
            if (G.DAT_0062f160 !== 0) {
              _printf('Failed to create new event structure');
            }
            _parseError = true; break; // goto LAB_004ff6f7
          }
          if (G.DAT_0062f160 !== 0) {
            _printf('New event structure created');
          }
          local_78 = 0;
          local_34 = 0;
          local_c = 0;
          local_60 = 0;
          local_1c = 0;
          local_5c = 0;
          local_74 = 0;
          local_84 = 0;
          local_70 = 0;
          local_18 = 0;
          local_58 = 0;
          local_28 = 0;
          local_8 = 0;
          local_14 = 0;
          local_6c = 0;
          local_64 = 0;
          local_2c = 0;
          local_54 = 0;
          local_80 = 0;
          local_50 = 0;
          local_48 = 0;
          local_4c = 2;
        }
        else if (local_4c !== 6) {
          iVar1 = _strcmpi(local_3c, 'THEN');
          if (iVar1 === 0) {
            if (G.DAT_0062f160 !== 0) {
              _printf('THEN found');
            }
            local_4c = 3;
          }
          else {
            iVar1 = _strcmpi(local_3c, 'ENDIF');
            if (iVar1 === 0) {
              if (G.DAT_0062f160 !== 0) {
                _printf('ENDIF found');
              }
              local_4c = 5;
            }
            else {
              iVar1 = _strcmpi(local_3c, 'DEBUG');
              if (iVar1 === 0) {
                G.DAT_0062f160 = 1;
                _printf('Debugging filename: %s', param_1);
              }
              else {
                iVar1 = _strcmpi(local_3c, 'ENDEVENTS');
                if (iVar1 === 0) {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('ENDEVENTS found');
                  }
                  local_4c = 10;
                }
              }
            }
          }
        }
      }
      else if (local_4c === 2) {
        // ======== TRIGGER PARSING ========

        // --- UNITKILLED ---
        iVar1 = _strcmpi(local_3c, 'UNITKILLED');
        if (iVar1 === 0) {
          if (G.DAT_0062f160 !== 0) {
            _printf('IF UNITKILLED found, looking for params');
          }
          while ((local_60 === 0 || local_34 === 0) || local_c === 0) {
            local_3c = FUN_004a23fc(1);
            if (local_3c === null || local_3c === 0) {
              if (G.DAT_0062f160 !== 0) {
                _printf('Got early end of file.');
              }
              _parseError = true; break; // goto LAB_004ff6f7
            }
            if (local_3c.charAt(0) === '@') {
              if (G.DAT_0062f160 !== 0) {
                _printf('Illegal UNITKILLED statement');
              }
              _parseError = true; break; // goto LAB_004ff6f7
            }
            iVar1 = _strnicmp(local_3c, 'unit=', 5);
            if (iVar1 === 0) {
              pcVar3 = local_3c.substring(5);
              iVar1 = FUN_004fa359(pcVar3);
              if (iVar1 === -1 || iVar1 === -2) {
                if (G.DAT_0062f160 !== 0) {
                  _printf('found unit=%s, but %s is not valid', pcVar3, pcVar3);
                }
              }
              else {
                sVar2 = pcVar3.length;
                iVar4 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                local_68[2] = iVar4;
                if (local_68[2] === 0) { _parseError = true; break; }
                FUN_005f22d0(local_68[2], pcVar3);
                local_68[3] = iVar1;
                if (G.DAT_0062f160 !== 0) {
                  _printf('found unit=%s, id=%d', pcVar3, iVar1);
                }
                local_60 = 1;
              }
            }
            else {
              iVar1 = _strnicmp(local_3c, 'attacker=', 9);
              if (iVar1 === 0) {
                pcVar3 = local_3c.substring(9);
                local_20 = FUN_004fa250(pcVar3);
                if (local_20 === -1) {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('found attacker=%s, but %s is not valid', pcVar3, pcVar3);
                  }
                }
                else {
                  sVar2 = pcVar3.length;
                  iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                  local_68[5] = iVar1;
                  if (local_68[5] === 0) { _parseError = true; break; }
                  FUN_005f22d0(local_68[5], pcVar3);
                  local_68[6] = local_20;
                  if (G.DAT_0062f160 !== 0) {
                    _printf('found attacker=%s, king id=%d', pcVar3, local_20);
                  }
                  local_c = 1;
                }
              }
              else {
                iVar1 = _strnicmp(local_3c, 'defender=', 9);
                if (iVar1 === 0) {
                  pcVar3 = local_3c.substring(9);
                  local_20 = FUN_004fa250(pcVar3);
                  if (local_20 === -1) {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found defender=%s, but %s is not valid', pcVar3, pcVar3);
                    }
                  }
                  else {
                    sVar2 = pcVar3.length;
                    iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                    local_68[8] = iVar1;
                    if (local_68[8] === 0) { _parseError = true; break; }
                    FUN_005f22d0(local_68[8], pcVar3);
                    local_68[9] = local_20;
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found defender=%s, king id=%d', pcVar3, local_20);
                    }
                    local_34 = 1;
                  }
                }
              }
            }
          }
          if (_parseError) break;
          local_68[0] = 1;
        }

        // --- NEGOTIATION ---
        iVar1 = _strcmpi(local_3c, 'NEGOTIATION');
        if (iVar1 === 0) {
          if (G.DAT_0062f160 !== 0) {
            _printf('IF NEGOTIATION found, looking for params');
          }
          while ((local_34 === 0 || local_c === 0) || (local_2c === 0 || local_64 === 0)) {
            local_3c = FUN_004a23fc(1);
            if (local_3c === null || local_3c === 0) {
              if (G.DAT_0062f160 !== 0) {
                _printf('Got early end of file.');
              }
              _parseError = true; break;
            }
            if (local_3c.charAt(0) === '@') {
              if (G.DAT_0062f160 !== 0) {
                _printf('Illegal NEGOTIATION statement');
              }
              _parseError = true; break;
            }
            iVar1 = _strnicmp(local_3c, 'talker=', 7);
            if (iVar1 === 0) {
              pcVar3 = local_3c.substring(7);
              local_20 = FUN_004fa250(pcVar3);
              if (local_20 === -1) {
                if (G.DAT_0062f160 !== 0) {
                  _printf('found talker=%s, but %s is not valid', pcVar3, pcVar3);
                }
              }
              else {
                sVar2 = pcVar3.length;
                iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                local_68[5] = iVar1;
                if (local_68[5] === 0) { _parseError = true; break; }
                FUN_005f22d0(local_68[5], pcVar3);
                local_68[6] = local_20;
                if (G.DAT_0062f160 !== 0) {
                  _printf('found talker=%s, king id=%d', pcVar3, local_20);
                }
                local_c = 1;
              }
            }
            else {
              iVar1 = _strnicmp(local_3c, 'talkertype=', 0xb);
              if (iVar1 === 0) {
                pcVar3 = local_3c.substring(0xb);
                iVar1 = _strcmpi(pcVar3, 'HUMAN');
                if (iVar1 === 0) {
                  local_68[7] = 1;
                  local_2c = 1;
                }
                else {
                  iVar1 = _strcmpi(pcVar3, 'COMPUTER');
                  if (iVar1 === 0) {
                    local_68[7] = 2;
                    local_2c = 1;
                  }
                  else {
                    iVar1 = _strcmpi(pcVar3, 'HUMANORCOMPUTER');
                    if (iVar1 === 0) {
                      local_68[7] = 4;
                      local_2c = 1;
                    }
                  }
                }
                if (G.DAT_0062f160 !== 0) {
                  if (local_2c === 0) {
                    _printf('found talkertype=%s, but %s is not valid', pcVar3, pcVar3);
                  }
                  else {
                    _printf('found talkertype=%s', pcVar3);
                  }
                }
              }
              else {
                iVar1 = _strnicmp(local_3c, 'listener=', 9);
                if (iVar1 === 0) {
                  pcVar3 = local_3c.substring(9);
                  local_20 = FUN_004fa250(pcVar3);
                  if (local_20 === -1) {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found listener=%s, but %s is not valid', pcVar3, pcVar3);
                    }
                  }
                  else {
                    sVar2 = pcVar3.length;
                    iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                    local_68[8] = iVar1;
                    if (local_68[8] === 0) { _parseError = true; break; }
                    FUN_005f22d0(local_68[8], pcVar3);
                    local_68[9] = local_20;
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found listener=%s, king id=%d', pcVar3, local_20);
                    }
                    local_34 = 1;
                  }
                }
                else {
                  iVar1 = _strnicmp(local_3c, 'listenertype=', 0xd);
                  if (iVar1 === 0) {
                    pcVar3 = local_3c.substring(0xd);
                    iVar1 = _strcmpi(pcVar3, 'HUMAN');
                    if (iVar1 === 0) {
                      local_68[10] = 1;
                      local_64 = 1;
                    }
                    else {
                      iVar1 = _strcmpi(pcVar3, 'COMPUTER');
                      if (iVar1 === 0) {
                        local_68[10] = 2;
                        local_64 = 1;
                      }
                      else {
                        iVar1 = _strcmpi(pcVar3, 'HUMANORCOMPUTER');
                        if (iVar1 === 0) {
                          local_68[10] = 4;
                          local_64 = 1;
                        }
                      }
                    }
                    if (G.DAT_0062f160 !== 0) {
                      if (local_2c === 0) {
                        _printf('found listenertype=%s, but %s is not valid', pcVar3, pcVar3);
                      }
                      else {
                        _printf('found listenertype=%s', pcVar3);
                      }
                    }
                  }
                }
              }
            }
          }
          if (_parseError) break;
          local_68[0] = 0x10;
          local_68[0x60] = 0x1000;
        }

        // --- NOSCHISM ---
        iVar1 = _strcmpi(local_3c, 'NOSCHISM');
        if (iVar1 === 0) {
          if (G.DAT_0062f160 !== 0) {
            _printf('IF NOSCHISM found, looking for who');
          }
          while (local_34 === 0) {
            pcVar3 = FUN_004a23fc(1);
            if (pcVar3 === null || pcVar3 === 0) {
              if (G.DAT_0062f160 !== 0) {
                _printf('Got early end of file.');
              }
              _parseError = true; break;
            }
            if (pcVar3.charAt(0) === '@') {
              if (G.DAT_0062f160 !== 0) {
                _printf('Illegal NOSCHISM statement');
              }
              _parseError = true; break;
            }
            iVar1 = _strnicmp(pcVar3, 'defender=', 9);
            if (iVar1 === 0) {
              pcVar3 = pcVar3.substring(9);
              local_20 = FUN_004fa250(pcVar3);
              if (local_20 === -1) {
                if (G.DAT_0062f160 !== 0) {
                  _printf('found defender=%s, but %s is not valid', pcVar3, pcVar3);
                }
              }
              else {
                sVar2 = pcVar3.length;
                iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                local_68[8] = iVar1;
                if (local_68[8] === 0) { _parseError = true; break; }
                FUN_005f22d0(local_68[8], pcVar3);
                local_68[9] = local_20;
                if (G.DAT_0062f160 !== 0) {
                  _printf('found defender=%s, king id=%d', pcVar3, local_20);
                }
                local_34 = 1;
              }
            }
          }
          if (_parseError) break;
          local_68[0] = 0x80;
        }
        else {
          // --- RECEIVEDTECHNOLOGY ---
          iVar1 = _strcmpi(local_3c, 'RECEIVEDTECHNOLOGY');
          if (iVar1 === 0) {
            if (G.DAT_0062f160 !== 0) {
              _printf('IF RECEIVEDTECHNOLOGY found, looking for params');
            }
            while (local_6c === 0 || local_34 === 0) {
              pcVar3 = FUN_004a23fc(1);
              if (pcVar3 === null || pcVar3 === 0) {
                if (G.DAT_0062f160 !== 0) {
                  _printf('Got early end of file.');
                }
                _parseError = true; break;
              }
              if (pcVar3.charAt(0) === '@') {
                if (G.DAT_0062f160 !== 0) {
                  _printf('Illegal RECEIVEDTECHNOLOGY statement');
                }
                _parseError = true; break;
              }
              iVar1 = _strnicmp(pcVar3, 'receiver=', 9);
              if (iVar1 === 0) {
                pcVar3 = pcVar3.substring(9);
                iVar1 = FUN_004fa250(pcVar3);
                if (iVar1 === -1) {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('found receiver=%s, but %s is not valid', pcVar3, pcVar3);
                  }
                }
                else {
                  sVar2 = pcVar3.length;
                  iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                  local_68[8] = iVar1;
                  if (local_68[8] === 0) { _parseError = true; break; }
                  FUN_005f22d0(local_68[8], pcVar3);
                  iVar1 = FUN_004fa250(pcVar3);
                  local_68[9] = iVar1;
                  if (G.DAT_0062f160 !== 0) {
                    _printf('found receiver=%s, king id=%d', pcVar3, local_20);
                  }
                  local_34 = 1;
                }
              }
              else {
                iVar1 = _strnicmp(pcVar3, 'technology=', 0xb);
                if (iVar1 === 0) {
                  pcVar3 = pcVar3.substring(0xb);
                  if (pcVar3.charAt(0) < '0' || pcVar3.charAt(0) > '9') {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found technology=%s, but %s is not valid', pcVar3, pcVar3);
                    }
                  }
                  else {
                    iVar1 = FUN_00564bf0(pcVar3);
                    local_68[0xd] = iVar1;
                    local_6c = 1;
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found technology=%s, technology id=%d', pcVar3, local_68[0xd]);
                    }
                  }
                }
              }
            }
            if (_parseError) break;
            local_68[0] = 0x100;
          }
          else {
            // --- CITYTAKEN ---
            iVar1 = _strcmpi(local_3c, 'CITYTAKEN');
            if (iVar1 === 0) {
              if (G.DAT_0062f160 !== 0) {
                _printf('IF CITYTAKEN found, looking for city/civ params');
              }
              while ((local_78 === 0 || local_c === 0) || local_34 === 0) {
                pcVar3 = FUN_004a23fc(1);
                if (pcVar3 === null || pcVar3 === 0) {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('Got early end of file.');
                  }
                  _parseError = true; break;
                }
                if (pcVar3.charAt(0) === '@') {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('Illegal CITYTAKEN statement');
                  }
                  _parseError = true; break;
                }
                iVar1 = _strnicmp(pcVar3, 'attacker=', 9);
                if (iVar1 === 0) {
                  pcVar3 = pcVar3.substring(9);
                  iVar1 = FUN_004fa250(pcVar3);
                  if (iVar1 === -1) {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found attacker=%s, but %s is not valid', pcVar3, pcVar3);
                    }
                  }
                  else {
                    sVar2 = pcVar3.length;
                    iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                    local_68[5] = iVar1;
                    if (local_68[5] === 0) { _parseError = true; break; }
                    FUN_005f22d0(local_68[5], pcVar3);
                    iVar1 = FUN_004fa250(pcVar3);
                    local_68[6] = iVar1;
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found attacker=%s, king id=%d', pcVar3, local_20);
                    }
                    local_c = 1;
                  }
                }
                else {
                  iVar1 = _strnicmp(pcVar3, 'defender=', 9);
                  if (iVar1 === 0) {
                    pcVar3 = pcVar3.substring(9);
                    local_20 = FUN_004fa250(pcVar3);
                    if (local_20 === -1) {
                      if (G.DAT_0062f160 !== 0) {
                        _printf('found defender=%s, but %s is not valid', pcVar3, pcVar3);
                      }
                    }
                    else {
                      sVar2 = pcVar3.length;
                      iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                      local_68[8] = iVar1;
                      if (local_68[8] === 0) { _parseError = true; break; }
                      FUN_005f22d0(local_68[8], pcVar3);
                      local_68[9] = local_20;
                      if (G.DAT_0062f160 !== 0) {
                        _printf('found defender=%s, king id=%d', pcVar3, local_20);
                      }
                      local_34 = 1;
                    }
                  }
                  else {
                    iVar1 = _strnicmp(pcVar3, 'city=', 5);
                    if (iVar1 === 0) {
                      pcVar3 = pcVar3.substring(5);
                      sVar2 = pcVar3.length;
                      iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                      local_68[4] = iVar1;
                      if (local_68[4] === 0) { _parseError = true; break; }
                      FUN_005f22d0(local_68[4], pcVar3);
                      if (G.DAT_0062f160 !== 0) {
                        _printf('found city=%s', pcVar3, local_20);
                      }
                      local_78 = 1;
                    }
                  }
                }
              }
              if (_parseError) break;
              local_68[0] = 2;
            }
            else {
              // --- TURN ---
              iVar1 = _strcmpi(local_3c, 'TURN');
              if (iVar1 === 0) {
                if (G.DAT_0062f160 !== 0) {
                  _printf('IF TURN found, looking for turn number');
                }
                do {
                  do {
                    pcVar3 = FUN_004a23fc(1);
                    if (pcVar3 === null || pcVar3 === 0) {
                      if (G.DAT_0062f160 !== 0) {
                        _printf('Got early end of file.');
                      }
                      _parseError = true; break;
                    }
                    if (pcVar3.charAt(0) === '@') {
                      if (G.DAT_0062f160 !== 0) {
                        _printf('Illegal TURN statement');
                      }
                      _parseError = true; break;
                    }
                    iVar1 = _strnicmp(pcVar3, 'turn=', 5);
                  } while (iVar1 !== 0);
                  if (_parseError) break;
                  pcVar3 = pcVar3.substring(5);
                  iVar1 = _strcmpi(pcVar3, 'EVERY');
                  if (iVar1 === 0) {
                    local_68[0xb] = -1;
                    local_68[0] = 4;
                  }
                  else if ((_isDigitOrSign(pcVar3.charAt(0)))) {
                    iVar1 = FUN_00564bf0(pcVar3);
                    local_68[0xb] = iVar1;
                    local_68[0] = 4;
                  }
                  if (G.DAT_0062f160 !== 0) {
                    if (local_68[0] === 4) {
                      _printf('found turn=%s', pcVar3);
                    }
                    else {
                      _printf('found turn=%s, but %s is not valid', pcVar3, pcVar3);
                    }
                  }
                } while (local_68[0] !== 4);
                if (_parseError) break;
              }
              else {
                // --- TURNINTERVAL ---
                iVar1 = _strcmpi(local_3c, 'TURNINTERVAL');
                if (iVar1 === 0) {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('IF TURNINTERVAL found, looking for interval');
                  }
                  do {
                    pcVar3 = FUN_004a23fc(1);
                    if (pcVar3 === null || pcVar3 === 0) {
                      if (G.DAT_0062f160 !== 0) {
                        _printf('Got early end of file.');
                      }
                      _parseError = true; break;
                    }
                    if (pcVar3.charAt(0) === '@') {
                      if (G.DAT_0062f160 !== 0) {
                        _printf('Illegal TURNINTERVAL statement');
                      }
                      _parseError = true; break;
                    }
                    iVar1 = _strnicmp(pcVar3, 'interval=', 9);
                    if (iVar1 === 0) {
                      pcVar3 = pcVar3.substring(9);
                      if (!_isDigitOrSign(pcVar3.charAt(0))) {
                        if (G.DAT_0062f160 !== 0) {
                          _printf('found interval=%s, but %s is not valid', pcVar3, pcVar3);
                        }
                      }
                      else {
                        iVar1 = FUN_00564bf0(pcVar3);
                        local_68[0xb] = iVar1;
                        if (G.DAT_0062f160 !== 0) {
                          _printf('found interval=%s', pcVar3);
                        }
                        local_68[0] = 8;
                      }
                    }
                  } while (local_68[0] !== 8);
                  if (_parseError) break;
                }
                else {
                  // --- RANDOMTURN ---
                  iVar1 = _strcmpi(local_3c, 'RANDOMTURN');
                  if (iVar1 === 0) {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('IF RANDOMTURN found, looking for probability');
                    }
                    do {
                      pcVar3 = FUN_004a23fc(1);
                      if (pcVar3 === null || pcVar3 === 0) {
                        if (G.DAT_0062f160 !== 0) {
                          _printf('Got early end of file.');
                        }
                        _parseError = true; break;
                      }
                      if (pcVar3.charAt(0) === '@') {
                        if (G.DAT_0062f160 !== 0) {
                          _printf('Illegal RANDOMTURN statement');
                        }
                        _parseError = true; break;
                      }
                      iVar1 = _strnicmp(pcVar3, 'denominator=', 0xc);
                      if (iVar1 === 0) {
                        pcVar3 = pcVar3.substring(0xc);
                        if (pcVar3.charAt(0) < '0' || pcVar3.charAt(0) > '9') {
                          if (G.DAT_0062f160 !== 0) {
                            _printf('found denominator=%s, but %s is not valid', pcVar3, pcVar3);
                          }
                        }
                        else {
                          iVar1 = FUN_00564bf0(pcVar3);
                          local_68[0xc] = iVar1;
                          if (local_68[0xc] < 1 || 1000 < local_68[0xc]) {
                            _printf('found denominator=%s, but %s is not valid (range)', pcVar3, pcVar3);
                            _parseError = true; break;
                          }
                          if (G.DAT_0062f160 !== 0) {
                            _printf('found denominator=%s', pcVar3);
                          }
                          local_68[0] = 0x40;
                        }
                      }
                    } while (local_68[0] !== 0x40);
                    if (_parseError) break;
                  }
                  else {
                    // --- SCENARIOLOADED ---
                    iVar1 = _strcmpi(local_3c, 'SCENARIOLOADED');
                    if (iVar1 === 0) {
                      if (G.DAT_0062f160 !== 0) {
                        _printf('IF SCENARIOLOADED');
                      }
                      local_68[0] = 0x20;
                    }
                  }
                }
              }
            }
          }
        }
      }
      else if (local_4c === 3) {
        // ======== ACTION PARSING ========

        // --- TEXT ---
        iVar1 = _strcmpi(local_3c, 'TEXT');
        if (iVar1 === 0) {
          if (G.DAT_0062f160 !== 0) {
            _printf('THEN TEXT found, looking for ENDTEXT');
          }
          local_38 = 0;
          local_3c = FUN_004a23fc(1);
          if (local_3c === null || local_3c === 0) { _parseError = true; break; }
          while (iVar1 = _strcmpi(local_3c, 'ENDTEXT'), iVar1 !== 0) {
            if (local_38 !== 0x14) {
              sVar2 = local_3c.length;
              iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
              local_68[local_38 + 0xe] = iVar1;
              if (local_68[local_38 + 0xe] === 0) { _parseError = true; break; }
              FUN_005f22d0(local_68[local_38 + 0xe], local_3c);
              local_38 = local_38 + 1;
            }
            local_3c = FUN_004a23fc(1);
            if (local_3c === null || local_3c === 0) {
              if (G.DAT_0062f160 !== 0) {
                _printf('Got early end of file.');
              }
              _parseError = true; break;
            }
            if (local_3c.charAt(0) === '@') {
              if (G.DAT_0062f160 !== 0) {
                _printf('Illegal TEXT statement');
              }
              _parseError = true; break;
            }
          }
          if (_parseError) break;
          if (G.DAT_0062f160 !== 0) {
            _printf('found ENDTEXT');
          }
          local_68[1] = local_68[1] | 1;
        }
        else {
          // --- CHANGETERRAIN ---
          iVar1 = _strcmpi(local_3c, 'CHANGETERRAIN');
          if (iVar1 === 0) {
            if (G.DAT_0062f160 !== 0) {
              _printf('THEN CHANGETERRAIN found, looking for params');
            }
            local_24 = 0;
            while (local_1c === 0 || local_24 !== 4) {
              pcVar3 = FUN_004a23fc(1);
              if (pcVar3 === null || pcVar3 === 0) {
                if (G.DAT_0062f160 !== 0) {
                  _printf('Got early end of file.');
                }
                _parseError = true; break;
              }
              if (pcVar3.charAt(0) === '@') {
                if (G.DAT_0062f160 !== 0) {
                  _printf('Illegal CHANGETERRAIN statement');
                }
                _parseError = true; break;
              }
              iVar1 = _strnicmp(pcVar3, 'terraintype=', 0xc);
              if (iVar1 === 0) {
                pcVar3 = pcVar3.substring(0xc);
                if (pcVar3.charAt(0) < '0' || pcVar3.charAt(0) > '9') {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('found terraintype=%s, but %s is not valid', pcVar3, pcVar3);
                  }
                }
                else {
                  iVar1 = FUN_00564bf0(pcVar3);
                  if (-1 < iVar1 || iVar1 < 0xb) { // C: (-1 < iVar1) || (iVar1 < 0xb)
                    local_68[99] = iVar1;
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found terraintype=%s, terrainid=%d', pcVar3, iVar1);
                    }
                    local_1c = 1;
                  }
                }
              }
              else {
                iVar1 = _strcmpi(pcVar3, 'maprect');
                if (iVar1 === 0) {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('found maprect');
                  }
                  iVar1 = FUN_004a23fc(1);
                  if (iVar1 === 0 || iVar1 === null) {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('Got early end of file.');
                    }
                    _parseError = true; break;
                  }
                  for (local_38 = 0; local_38 < 4; local_38 = local_38 + 1) {
                    iVar1 = FUN_004a2534();
                    local_68[local_38 * 2 + 100] = iVar1;
                    iVar1 = FUN_004a2534();
                    local_68[local_38 * 2 + 0x65] = iVar1;
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found location #%d: %d, %d', local_24,
                              local_68[local_38 * 2 + 100], local_68[local_38 * 2 + 0x65]);
                    }
                    local_24 = local_24 + 1;
                  }
                }
              }
            }
            if (_parseError) break;
            local_68[1] = local_68[1] | 0x200;
          }
          else {
            // --- CREATEUNIT ---
            iVar1 = _strcmpi(local_3c, 'CREATEUNIT');
            if (iVar1 === 0) {
              if (G.DAT_0062f160 !== 0) {
                _printf('THEN CREATEUNIT found, looking for params');
              }
              local_24 = 0;
              // LAB_004fe0af: loop until all params found
              while (local_74 === 0 || local_84 === 0 ||
                     local_80 === 0 || local_54 === 0 || local_24 === 0) {
                pcVar3 = FUN_004a23fc(1);
                if (pcVar3 === null || pcVar3 === 0) {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('Got early end of file.');
                  }
                  _parseError = true; break;
                }
                if (pcVar3.charAt(0) === '@') {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('Illegal CREATEUNIT statement');
                  }
                  _parseError = true; break;
                }
                iVar1 = _strnicmp(pcVar3, 'unit=', 5);
                if (iVar1 === 0) {
                  pcVar3 = pcVar3.substring(5);
                  iVar1 = FUN_004fa359(pcVar3);
                  if (iVar1 === -1) {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found unit=%s, but %s is not valid', pcVar3, pcVar3);
                    }
                  }
                  else {
                    sVar2 = pcVar3.length;
                    iVar4 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                    local_68[0x37] = iVar4;
                    if (local_68[0x37] === 0) { _parseError = true; break; }
                    FUN_005f22d0(local_68[0x37], pcVar3);
                    local_68[0x38] = iVar1;
                    if (G.DAT_0062f160 !== 0) {
                      _printf('found unit=%s, unit id=%d', pcVar3, iVar1);
                    }
                    local_74 = 1;
                  }
                }
                else {
                  iVar1 = _strnicmp(pcVar3, 'owner=', 6);
                  if (iVar1 === 0) {
                    pcVar3 = pcVar3.substring(6);
                    local_20 = FUN_004fa250(pcVar3);
                    if (local_20 === -1) {
                      if (G.DAT_0062f160 !== 0) {
                        _printf('found owner=%s, but %s is not valid', pcVar3, pcVar3);
                      }
                    }
                    else {
                      sVar2 = pcVar3.length;
                      iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                      local_68[0x35] = iVar1;
                      if (local_68[0x35] === 0) { _parseError = true; break; }
                      FUN_005f22d0(local_68[0x35], pcVar3);
                      local_68[0x36] = local_20;
                      if (G.DAT_0062f160 !== 0) {
                        _printf('found owner=%s, king id=%d', pcVar3, local_20);
                      }
                      local_84 = 1;
                    }
                  }
                  else {
                    iVar1 = _strnicmp(pcVar3, 'veteran=', 8);
                    if (iVar1 === 0) {
                      pcVar3 = pcVar3.substring(8);
                      iVar1 = _strcmpi(pcVar3, 'yes');
                      if (iVar1 === 0 || (iVar1 = _strcmpi(pcVar3, 'true'), iVar1 === 0)) {
                        local_68[0x4e] = 1;
                        local_54 = 1;
                      }
                      else {
                        iVar1 = _strcmpi(pcVar3, 'no');
                        if (iVar1 === 0 || (iVar1 = _strcmpi(pcVar3, 'false'), iVar1 === 0)) {
                          local_68[0x4e] = 0;
                          local_54 = 1;
                        }
                        else if (G.DAT_0062f160 !== 0) {
                          _printf('found veteran=%s, but %s is not valid', pcVar3, pcVar3);
                        }
                      }
                    }
                    else {
                      iVar1 = _strnicmp(pcVar3, 'homecity=', 9);
                      if (iVar1 === 0) {
                        pcVar3 = pcVar3.substring(9);
                        sVar2 = pcVar3.length;
                        iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                        local_68[0x4f] = iVar1;
                        if (local_68[0x4f] === 0) { _parseError = true; break; }
                        FUN_005f22d0(local_68[0x4f], pcVar3);
                        if (G.DAT_0062f160 !== 0) {
                          _printf('found homecity=%s', pcVar3);
                        }
                        local_80 = 1;
                      }
                      else {
                        iVar1 = _strcmpi(pcVar3, 'locations');
                        if (iVar1 === 0) {
                          if (G.DAT_0062f160 !== 0) {
                            _printf('found locations');
                          }
                          for (local_38 = 0; local_38 < 10; local_38 = local_38 + 1) {
                            pcVar3 = FUN_004a23fc(1);
                            if (pcVar3 === null || pcVar3 === 0) {
                              if (G.DAT_0062f160 !== 0) {
                                _printf('Got early end of file.');
                              }
                              _parseError = true; break;
                            }
                            if (!_isDigitOrSign(pcVar3.charAt(0))) {
                              iVar1 = _strcmpi(pcVar3, 'endlocations');
                              if (iVar1 === 0) {
                                if (G.DAT_0062f160 !== 0) {
                                  _printf('found endlocations');
                                }
                                break;
                              }
                            }
                            else {
                              iVar1 = FUN_004a2534();
                              local_68[local_38 * 2 + 0x39] = iVar1;
                              iVar1 = FUN_004a2534();
                              local_68[local_38 * 2 + 0x3a] = iVar1;
                              if (G.DAT_0062f160 !== 0) {
                                _printf('found location #%d: %d, %d', local_24,
                                        local_68[local_38 * 2 + 0x39], local_68[local_38 * 2 + 0x3a]);
                              }
                              local_24 = local_24 + 1;
                            }
                          }
                          if (_parseError) break;
                        }
                      }
                    }
                  }
                }
              }
              if (_parseError) break;
              local_68[0x4d] = local_24;
              local_68[1] = local_68[1] | 4;
            }
            else {
              // --- CHANGEMONEY ---
              iVar1 = _strcmpi(local_3c, 'CHANGEMONEY');
              if (iVar1 === 0) {
                if (G.DAT_0062f160 !== 0) {
                  _printf('THEN CHANGEMONEY found, looking for params');
                }
                while (local_58 === 0 || local_18 === 0) {
                  pcVar3 = FUN_004a23fc(1);
                  if (pcVar3 === null || pcVar3 === 0) {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('Got early end of file.');
                    }
                    _parseError = true; break;
                  }
                  if (pcVar3.charAt(0) === '@') {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('Illegal CHANGEMONEY statement');
                    }
                    _parseError = true; break;
                  }
                  iVar1 = _strnicmp(pcVar3, 'receiver=', 9);
                  if (iVar1 === 0) {
                    pcVar3 = pcVar3.substring(9);
                    local_20 = FUN_004fa250(pcVar3);
                    if (local_20 === -1) {
                      if (G.DAT_0062f160 !== 0) {
                        _printf('found receiver=%s, but %s is not valid', pcVar3, pcVar3);
                      }
                    }
                    else {
                      sVar2 = pcVar3.length;
                      iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                      local_68[0x5d] = iVar1;
                      if (local_68[0x5d] === 0) { _parseError = true; break; }
                      FUN_005f22d0(local_68[0x5d], pcVar3);
                      local_68[0x5e] = local_20;
                      if (G.DAT_0062f160 !== 0) {
                        _printf('found receiver=%s, king id=%d', pcVar3, local_20);
                      }
                      local_58 = 1;
                    }
                  }
                  else {
                    iVar1 = _strnicmp(pcVar3, 'amount=', 7);
                    if (iVar1 === 0) {
                      pcVar3 = pcVar3.substring(7);
                      if (_isDigitOrSign(pcVar3.charAt(0))) {
                        iVar1 = FUN_00564bf0(pcVar3);
                        local_68[0x5f] = iVar1;
                        if (G.DAT_0062f160 !== 0) {
                          _printf('found amount=%s, integer=%d', pcVar3, local_68[0x5f]);
                        }
                        local_18 = 1;
                      }
                    }
                  }
                }
                if (_parseError) break;
                local_68[1] = local_68[1] | 8;
              }
              else {
                // --- JUSTONCE ---
                iVar1 = _strcmpi(local_3c, 'JUSTONCE');
                if (iVar1 === 0) {
                  if (G.DAT_0062f160 !== 0) {
                    _printf('THEN JUSTONCE found, not looking for more');
                  }
                  local_68[1] = local_68[1] | 0x40;
                }
                else {
                  // --- DONTPLAYWONDERS ---
                  iVar1 = _strcmpi(local_3c, 'DONTPLAYWONDERS');
                  if (iVar1 === 0) {
                    if (G.DAT_0062f160 !== 0) {
                      _printf('THEN DONTPLAYWONDERS found, not looking for more');
                    }
                    local_68[1] = local_68[1] | 0x100;
                  }
                  else {
                    // --- MAKEAGGRESSION ---
                    iVar1 = _strcmpi(local_3c, 'MAKEAGGRESSION');
                    if (iVar1 === 0) {
                      if (G.DAT_0062f160 !== 0) {
                        _printf('THEN MAKEAGGRESSION found, looking for params');
                      }
                      while (local_14 === 0 || local_8 === 0) {
                        pcVar3 = FUN_004a23fc(1);
                        if (pcVar3 === null || pcVar3 === 0) {
                          if (G.DAT_0062f160 !== 0) {
                            _printf('Got early end of file.');
                          }
                          _parseError = true; break;
                        }
                        if (pcVar3.charAt(0) === '@') {
                          if (G.DAT_0062f160 !== 0) {
                            _printf('Illegal MAKEAGGRESSION statement');
                          }
                          _parseError = true; break;
                        }
                        iVar1 = _strnicmp(pcVar3, 'who=', 4);
                        if (iVar1 === 0) {
                          pcVar3 = pcVar3.substring(4);
                          local_20 = FUN_004fa250(pcVar3);
                          if (local_20 === -1) {
                            if (G.DAT_0062f160 !== 0) {
                              _printf('found who=%s, but %s is not valid', pcVar3, pcVar3);
                            }
                          }
                          else {
                            sVar2 = pcVar3.length;
                            iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                            local_68[0x33] = iVar1;
                            if (local_68[0x33] === 0) { _parseError = true; break; }
                            FUN_005f22d0(local_68[0x33], pcVar3);
                            local_68[0x34] = local_20;
                            if (G.DAT_0062f160 !== 0) {
                              _printf('found who=%s, king id=%d', pcVar3, local_20);
                            }
                            local_14 = 1;
                          }
                        }
                        else {
                          iVar1 = _strnicmp(pcVar3, 'whom=', 5);
                          if (iVar1 === 0) {
                            pcVar3 = pcVar3.substring(5);
                            local_20 = FUN_004fa250(pcVar3);
                            if (local_20 === -1) {
                              if (G.DAT_0062f160 !== 0) {
                                _printf('found whom=%s, but %s is not valid', pcVar3, pcVar3);
                              }
                            }
                            else {
                              sVar2 = pcVar3.length;
                              iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                              local_68[0x31] = iVar1;
                              if (local_68[0x31] === 0) { _parseError = true; break; }
                              FUN_005f22d0(local_68[0x31], pcVar3);
                              local_68[0x32] = local_20;
                              if (G.DAT_0062f160 !== 0) {
                                _printf('found whom=%s, king id=%d', pcVar3, local_20);
                              }
                              local_8 = 1;
                            }
                          }
                        }
                      }
                      if (_parseError) break;
                      local_68[1] = local_68[1] | 0x20;
                    }
                    else {
                      // --- DESTROYACIVILIZATION ---
                      iVar1 = _strcmpi(local_3c, 'DESTROYACIVILIZATION');
                      if (iVar1 === 0) {
                        if (G.DAT_0062f160 !== 0) {
                          _printf('THEN DESTROYACIVILIZATION found, looking for whom');
                        }
                        while (local_28 === 0) {
                          pcVar3 = FUN_004a23fc(1);
                          if (pcVar3 === null || pcVar3 === 0) {
                            if (G.DAT_0062f160 !== 0) {
                              _printf('Got early end of file.');
                            }
                            _parseError = true; break;
                          }
                          if (pcVar3.charAt(0) === '@') {
                            if (G.DAT_0062f160 !== 0) {
                              _printf('Illegal DESTROYACIVILIZATION statement');
                            }
                            _parseError = true; break;
                          }
                          iVar1 = _strnicmp(pcVar3, 'whom=', 5);
                          if (iVar1 === 0) {
                            pcVar3 = pcVar3.substring(5);
                            local_20 = FUN_004fa250(pcVar3);
                            if (local_20 === -1) {
                              if (G.DAT_0062f160 !== 0) {
                                _printf('found whom=%s, but %s is not valid', pcVar3, pcVar3);
                              }
                            }
                            else {
                              local_68[0x6c] = local_20;
                              if (G.DAT_0062f160 !== 0) {
                                _printf('found whom=%s, king id=%d', pcVar3, local_20);
                              }
                              local_28 = 1;
                            }
                          }
                        }
                        if (_parseError) break;
                        local_68[1] = local_68[1] | 0x400;
                      }
                      else {
                        // --- GIVETECHNOLOGY ---
                        iVar1 = _strcmpi(local_3c, 'GIVETECHNOLOGY');
                        if (iVar1 === 0) {
                          if (G.DAT_0062f160 !== 0) {
                            _printf('THEN GIVETECHNOLOGY found, looking for params');
                          }
                          while (local_48 === 0 || local_50 === 0) {
                            pcVar3 = FUN_004a23fc(1);
                            if (pcVar3 === null || pcVar3 === 0) {
                              if (G.DAT_0062f160 !== 0) {
                                _printf('Got early end of file.');
                              }
                              _parseError = true; break;
                            }
                            if (pcVar3.charAt(0) === '@') {
                              if (G.DAT_0062f160 !== 0) {
                                _printf('Illegal GIVETECHNOLOGY statement');
                              }
                              _parseError = true; break;
                            }
                            iVar1 = _strnicmp(pcVar3, 'receiver=', 9);
                            if (iVar1 === 0) {
                              pcVar3 = pcVar3.substring(9);
                              local_20 = FUN_004fa250(pcVar3);
                              if (local_20 === -1) {
                                if (G.DAT_0062f160 !== 0) {
                                  _printf('found receiver=%s, but %s is not valid', pcVar3, pcVar3);
                                }
                              }
                              else {
                                local_68[0x6e] = local_20;
                                if (G.DAT_0062f160 !== 0) {
                                  _printf('found receiver=%s, king id=%d', pcVar3, local_20);
                                }
                                local_50 = 1;
                              }
                            }
                            else {
                              iVar1 = _strnicmp(pcVar3, 'technology=', 0xb);
                              if (iVar1 === 0) {
                                pcVar3 = pcVar3.substring(0xb);
                                if (pcVar3.charAt(0) > '/' && pcVar3.charAt(0) < ':') {
                                  iVar1 = FUN_00564bf0(pcVar3);
                                  local_68[0x6d] = iVar1;
                                  if (G.DAT_0062f160 !== 0) {
                                    _printf('found technology=%s, integer=%d', pcVar3, local_68[0x6d]);
                                  }
                                  local_48 = 1;
                                }
                              }
                            }
                          }
                          if (_parseError) break;
                          local_68[1] = local_68[1] | 0x800;
                        }
                        else {
                          // --- MOVEUNIT ---
                          iVar1 = _strcmpi(local_3c, 'MOVEUNIT');
                          if (iVar1 === 0) {
                            if (G.DAT_0062f160 !== 0) {
                              _printf('THEN MOVEUNIT found, looking for params');
                            }
                            local_24 = 0;
                            while ((local_74 === 0 || local_84 === 0) || local_24 !== 4 ||
                                   (local_5c === 0 || local_70 === 0)) {
                              pcVar3 = FUN_004a23fc(1);
                              if (pcVar3 === null || pcVar3 === 0) {
                                if (G.DAT_0062f160 !== 0) {
                                  _printf('Got early end of file.');
                                }
                                _parseError = true; break;
                              }
                              if (pcVar3.charAt(0) === '@') {
                                if (G.DAT_0062f160 !== 0) {
                                  _printf('Illegal MOVEUNIT statement');
                                }
                                _parseError = true; break;
                              }
                              iVar1 = _strnicmp(pcVar3, 'unit=', 5);
                              if (iVar1 === 0) {
                                pcVar3 = pcVar3.substring(5);
                                iVar1 = FUN_004fa359(pcVar3);
                                if (iVar1 === -1) {
                                  if (G.DAT_0062f160 !== 0) {
                                    _printf('found unit=%s, but %s is not valid', pcVar3, pcVar3);
                                  }
                                }
                                else {
                                  sVar2 = pcVar3.length;
                                  iVar4 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                                  local_68[0x24] = iVar4;
                                  if (local_68[0x24] === 0) { _parseError = true; break; }
                                  FUN_005f22d0(local_68[0x24], pcVar3);
                                  local_68[0x25] = iVar1;
                                  if (G.DAT_0062f160 !== 0) {
                                    _printf('found unit=%s, unit id=%d', pcVar3, iVar1);
                                  }
                                  local_74 = 1;
                                }
                              }
                              else {
                                iVar1 = _strnicmp(pcVar3, 'owner=', 6);
                                if (iVar1 === 0) {
                                  pcVar3 = pcVar3.substring(6);
                                  local_20 = FUN_004fa250(pcVar3);
                                  if (local_20 === -1) {
                                    if (G.DAT_0062f160 !== 0) {
                                      _printf('found owner=%s, but %s is not valid', pcVar3, pcVar3);
                                    }
                                  }
                                  else {
                                    sVar2 = pcVar3.length;
                                    iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                                    local_68[0x22] = iVar1;
                                    if (local_68[0x22] === 0) { _parseError = true; break; }
                                    FUN_005f22d0(local_68[0x22], pcVar3);
                                    local_68[0x23] = local_20;
                                    if (G.DAT_0062f160 !== 0) {
                                      _printf('found owner=%s, king id=%d', pcVar3, local_20);
                                    }
                                    local_84 = 1;
                                  }
                                }
                                else {
                                  iVar1 = _strcmpi(pcVar3, 'maprect');
                                  if (iVar1 === 0) {
                                    if (G.DAT_0062f160 !== 0) {
                                      _printf('found maprect');
                                    }
                                    iVar1 = FUN_004a23fc(1);
                                    if (iVar1 === 0 || iVar1 === null) {
                                      if (G.DAT_0062f160 !== 0) {
                                        _printf('Got early end of file.');
                                      }
                                      _parseError = true; break;
                                    }
                                    for (local_38 = 0; local_38 < 4; local_38 = local_38 + 1) {
                                      iVar1 = FUN_004a2534();
                                      local_68[local_38 * 2 + 0x27] = iVar1;
                                      iVar1 = FUN_004a2534();
                                      local_68[local_38 * 2 + 0x28] = iVar1;
                                      if (G.DAT_0062f160 !== 0) {
                                        _printf('found location #%d: %d, %d', local_24,
                                                local_68[local_38 * 2 + 0x27],
                                                local_68[local_38 * 2 + 0x28]);
                                      }
                                      local_24 = local_24 + 1;
                                    }
                                  }
                                  else {
                                    iVar1 = _strcmpi(pcVar3, 'moveto');
                                    if (iVar1 === 0) {
                                      if (G.DAT_0062f160 !== 0) {
                                        _printf('found moveto');
                                      }
                                      pcVar3 = FUN_004a23fc(1);
                                      if (pcVar3 === null || pcVar3 === 0) {
                                        if (G.DAT_0062f160 !== 0) {
                                          _printf('Got early end of file.');
                                        }
                                        _parseError = true; break;
                                      }
                                      if (_isDigitOrSign(pcVar3.charAt(0))) {
                                        iVar1 = FUN_004a2534();
                                        local_68[0x2f] = iVar1;
                                        iVar1 = FUN_004a2534();
                                        local_68[0x30] = iVar1;
                                        if (G.DAT_0062f160 !== 0) {
                                          _printf('found moveto: %d, %d', local_68[0x2f], local_68[0x30]);
                                        }
                                        local_5c = 1;
                                      }
                                    }
                                    else {
                                      iVar1 = _strnicmp(pcVar3, 'numbertomove=', 0xd);
                                      if (iVar1 === 0) {
                                        pcVar3 = pcVar3.substring(0xd);
                                        if (pcVar3.charAt(0) < '0' || pcVar3.charAt(0) > '9') {
                                          iVar1 = _strcmpi(pcVar3, 'ALL');
                                          if (iVar1 === 0) {
                                            local_68[0x26] = -2;
                                            if (G.DAT_0062f160 !== 0) {
                                              _printf('found numbertomove=%s', pcVar3);
                                            }
                                            local_70 = 1;
                                          }
                                          else if (G.DAT_0062f160 !== 0) {
                                            _printf('found numbertomove=%s, but %s is not valid', pcVar3, pcVar3);
                                          }
                                        }
                                        else {
                                          iVar1 = FUN_00564bf0(pcVar3);
                                          local_68[0x26] = iVar1;
                                          if (G.DAT_0062f160 !== 0) {
                                            _printf('found numbertomove=%s, integer=%d', pcVar3, local_68[0x26]);
                                          }
                                          local_70 = 1;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                            if (_parseError) break;
                            local_68[1] = local_68[1] | 2;
                          }
                          else {
                            // --- PLAYCDTRACK ---
                            iVar1 = _strcmpi(local_3c, 'PLAYCDTRACK');
                            if (iVar1 === 0) {
                              if (G.DAT_0062f160 !== 0) {
                                _printf('THEN PLAYCDTRACK found, looking for track');
                              }
                              iVar1 = FUN_004a23fc(1);
                              if (iVar1 === 0 || iVar1 === null) {
                                if (G.DAT_0062f160 !== 0) {
                                  _printf('Got early end of file.');
                                }
                                _parseError = true; break;
                              }
                              iVar1 = FUN_004a2534();
                              local_68[0x62] = iVar1;
                              if (0 < local_68[0x62]) {
                                if (G.DAT_0062f160 !== 0) {
                                  _printf('found cd track %d', local_68[0x62]);
                                }
                                local_68[1] = local_68[1] | 0x80;
                              }
                            }
                            else {
                              // --- PLAYWAVEFILE ---
                              iVar1 = _strcmpi(local_3c, 'PLAYWAVEFILE');
                              if (iVar1 === 0) {
                                if (G.DAT_0062f160 !== 0) {
                                  _printf('THEN PLAYWAVEFILE found, looking for filename');
                                }
                                pcVar3 = FUN_004a23fc(1);
                                if (pcVar3 === null || pcVar3 === 0) {
                                  if (G.DAT_0062f160 !== 0) {
                                    _printf('Got early end of file.');
                                  }
                                  _parseError = true; break;
                                }
                                sVar2 = pcVar3.length;
                                iVar1 = FUN_00498159(0 /*in_ECX + 0x2f4*/, sVar2 + 1);
                                local_68[0x61] = iVar1;
                                if (local_68[0x61] === 0) { _parseError = true; break; }
                                FUN_005f22d0(local_68[0x61], pcVar3);
                                if (G.DAT_0062f160 !== 0) {
                                  _printf('found wave file name %s', local_68[0x61]);
                                }
                                local_68[1] = local_68[1] | 0x10;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } while (local_4c < 10);
    if (!_parseError) {
      local_44 = 0;
    }
  }
  // LAB_004ff6f7:
  if (local_44 !== 0) {
    // C: __chdir(&G.DAT_00655020)
    FUN_00421ea0(s_BADEVENTSFILE_00630868);
    // C: __chdir(&G.DAT_0064bb08)
  }
  return local_44;
}

// Helper: case-insensitive string compare (C __strcmpi)
function _strcmpi(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return 1;
  return a.toLowerCase() === b.toLowerCase() ? 0 : 1;
}

// Helper: case-insensitive prefix compare (C __strnicmp)
function _strnicmp(str, prefix, len) {
  if (typeof str !== 'string' || typeof prefix !== 'string') return 1;
  return str.substring(0, len).toLowerCase() === prefix.substring(0, len).toLowerCase() ? 0 : 1;
}

// Helper: check if char is digit, '-', or '+'
function _isDigitOrSign(ch) {
  return (ch >= '0' && ch <= '9') || ch === '-' || ch === '+';
}

// Helper: printf stub for debug output
function _printf(fmt, ...args) {
  // Debug output — no-op in headless mode
}


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION DECLARATIONS — Referenced by this block
// ═══════════════════════════════════════════════════════════════════

// Memory / globals — these would be imported from mem.js in a full implementation
let PTR_DAT_0062f008 = null;
let PTR_s_DESERT_0062f168 = [];

// String constants
const s_INHOCK_0062ef7c = 'INHOCK';
const s_DECREASE_0062ef84 = 'DECREASE';
const s_FOODSHORTAGE_0062ef90 = 'FOODSHORTAGE';
const s_ASTRONAUTS_0062efa0 = 'ASTRONAUTS';
const s_This_Should_not_Happen_0062f020 = 'This Should not Happen';
const s_This_Should_not_Happen_0062f078 = 'This Should not Happen';
const s_Describe_0062f094 = 'Describe';
const s__ADVANCE_INDEX_0062f0a0 = '@ADVANCE_INDEX';
const s__IMPROVEMENT_INDEX_0062f0b0 = '@IMPROVEMENT_INDEX';
const s__WONDER_INDEX_0062f0c4 = '@WONDER_INDEX';
const s__UNIT_INDEX_0062f0d4 = '@UNIT_INDEX';
const s__GOVERNMENT_INDEX_0062f0e0 = '@GOVERNMENT_INDEX';
const s__TERRAIN_INDEX_0062f0f4 = '@TERRAIN_INDEX';
const s_CONCEPT_DESCRIPTIONS_0062f108 = 'CONCEPT_DESCRIPTIONS';
const s_ANYBODY_0062f1f4 = 'ANYBODY';
const s_TRIGGERATTACKER_0062f1fc = 'TRIGGERATTACKER';
const s_TRIGGERDEFENDER_0062f20c = 'TRIGGERDEFENDER';
const s_TRIGGERRECEIVER_0062f21c = 'TRIGGERRECEIVER';
const s_Could_not_find_0062f22c = 'Could not find %s';
const s_ANYUNIT_0062f250 = 'ANYUNIT';
const s_Could_not_find_unit_0062f258 = 'Could not find unit %s';
const s_Could_not_find_terraintype_0062f280 = 'Could not find terraintype %s';
const s_BADEVENTSFILE_00630868 = 'BADEVENTSFILE';
const s__SOUND__0062f2b0 = '\\SOUND\\';
const s__SOUND__0062f2b8 = '\\SOUND\\';


// External function stubs
function FUN_CSplitterWnd_IsTracking(p1) { return -1; } // C: reads this+0x15a4 (city index being displayed, -1 = none)
function FUN_InvalidateObjectCache(p1) {}
function FUN_004f6244_inner() {}
function FUN_toupper(p1) { return p1; }
function FUN_strcmpi(p1, p2) { return p1 === p2 ? 0 : 1; }
function FUN_strcmp(p1, p2) { return p1 === p2 ? 0 : (p1 < p2 ? -1 : 1); }
function FUN_printf(p1, ...args) {}
