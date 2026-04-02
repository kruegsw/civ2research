// Block 0x00580000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 91

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_005802fd (param_1, param_2, param_3, param_4)

 {
  FUN_0047ce1e(param_1, param_2, 0, DAT_006d1da0, 1);
  FUN_0047ce1e(param_3, param_4, 0, DAT_006d1da0, 1);
  return;
}


 export function FUN_00580341 (param_1, param_2, param_3)

 {
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
  let aiStack_58;
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
  bVar18 = 0;
  bVar5 = 0;
  local_30 = 0;
  local_b0 = 0;
  local_10 = 0;
  local_24 = 0;
  local_ac = 0;
  local_38 = 1;
  (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
    w32((local_18 * 4 + 0x6acae8), 0, 0);
    w32((local_18 * 4 + 0x6acb10), 0, 0);
  }
  bVar1 = DAT_006560f7[param_1 * 0x20];
  uVar7 = s8(bVar1);
  iVar8 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar9 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  local_a0 = FUN_0057e2c3(param_1);
  local_78 = s8(DAT_0064b1c7[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]);
  iVar10 = FUN_005b2c3d(param_1);
  if ((iVar10 < u8(DAT_0064bcc8))) {
    local_98 = FUN_005b2c3d(param_1);
  }
  else {
    local_98 = u8(DAT_0064bcc8);
  }
  if ((param_3 !== 0)) {
    local_a0 = (local_a0 * local_98 / u8(DAT_0064bcc8) | 0);
  }
  uVar11 = FUN_005ae052((s8(DAT_00628350[param_2]) + iVar8));
  iVar10 = (s8(DAT_00628360[param_2]) + iVar9);
  local_14 = iVar10;
  local_8 = uVar11;
  local_c = FUN_005b2e69(uVar11, iVar10);
  if ((local_c < 0)) {
    return 0x3e7;
  }
  local_c = FUN_0057e6e2(local_c, param_1);
  bVar2 = DAT_006560f7[local_c * 0x20];
  uVar12 = s8(bVar2);
  local_64 = FUN_0057e33a(local_c, 0, param_1);
  local_34 = s8(DAT_0064b1c7[u8(DAT_006560f6[local_c * 0x20]) * 0x14]);
  if ((DAT_0064b1c3[u8(DAT_006560f6[local_c * 0x20]) * 0x14] === 0)) DAT_0064b1c1 = DAT_0064b1c1 DAT_0064b1c3 = DAT_0064b1c3 {
    local_64 = (local_64 - (local_64 >> 1));
    local_34 = 1;
  }
  if (((DAT_0064b1bd[u8(DAT_006560f6[local_c * 0x20]) * 0x14] & 4) !== 0)) {
    local_c4 = FUN_005b2a39(param_1);
    if ((DAT_00654fae !== 0)) {
      local_c4 = (local_c4 - (s8(DAT_0064b1c2[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) / 2 | 0));
    }
    if ((iVar13 === 0xa)) DAT_0064b1c1 = DAT_0064b1c1 iVar13 = FUN_005b29aa(param_1) iVar13 = (iVar13 === 0xa) {
      local_64 = (local_64 + (local_64 >> 1));
    }
  }
  if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 1)) DAT_0064b1c1 = DAT_0064b1c1 {
    if (((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) === 0)) {
      local_64 = local_64 * 3;
    }
    else {
      local_64 = local_64 * 5;
    }
  }
  if ((param_3 !== 0)) DAT_0064b1c1 = DAT_0064b1c1 DAT_0064b1c1 = DAT_0064b1c1 iVar13 = FUN_0043d20a(DAT_006acb08, 0x1c) iVar13 = (iVar13 !== 0) local_64 = (local_64 << 1) param_3 = (param_3 !== 0) {
    local_b8 = 0x1c;
    w32((DAT_0064f344 + DAT_006acb08 * 0x58), 0, (s32((DAT_0064f344 + DAT_006acb08 * 0x58), 0) | 0x8000000));
  }
  if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 1)) DAT_0064b1c1 = DAT_0064b1c1 {
    if (((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0)) DAT_0064b1bd = DAT_0064b1bd {
      iVar13 = FUN_0043d20a(DAT_006acb08, 0x11);
      if ((DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] < 0x63)) DAT_0064b1bd = DAT_0064b1bd DAT_0064b1c4 = DAT_0064b1c4 {
        local_64 = (local_64 << 1);
        local_24 = 1;
        if ((param_3 !== 0)) {
          local_b8 = 0x11;
        }
      }
      iVar13 = FUN_0043d20a(DAT_006acb08, 0x1b);
      if ((param_3 !== 0)) local_64 = (local_64 << 1) param_3 = (param_3 !== 0) {
        local_b8 = 0x1b;
      }
    }
    else if ((param_3 !== 0)) {
      local_28 = 1;
    }
  }
  if ((DAT_0064b1c4[u8(DAT_006560f6[local_c * 0x20]) * 0x14] === 0)) DAT_0064b1c4 = DAT_0064b1c4 {
    local_a0 = (local_a0 << 3);
  }
  if ((DAT_0064b1c1[u8(DAT_006560f6[local_c * 0x20]) * 0x14] === 0)) DAT_0064b1c1 = DAT_0064b1c1 {
    local_78 = 1;
    local_34 = 1;
  }
  if (((DAT_0064b1bc[u8(DAT_006560f6[local_c * 0x20]) * 0x14] & 8) !== 0)) {
    local_34 = 1;
  }
  if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) 1 = (1 << (bVar2 & 0x1f)) {
    FUN_00492c15(uVar12, 0x12, uVar11, iVar10, 3);
    FUN_004933f2(uVar12, uVar11, iVar10, 0x12, 2);
  }
  if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 2)) iVar13 = FUN_005b89e4(uVar11, iVar10) iVar13 = (iVar13 === 0) DAT_0064b1c1 = DAT_0064b1c1 {
    local_34 = 1;
    if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 1)) {
      local_10 = 1;
      local_78 = (local_78 << 1);
    }
    else {
      local_10 = 1;
      local_78 = (local_78 << 1);
    }
  }
  if ((uVar7 === 0)) {
    if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      local_a0 = (local_a0 / 2 | 0);
    }
    else {
      local_a0 = (u8(DAT_00655b08) + 1) * local_a0;
      local_a0 = ((local_a0 + ((local_a0 >> 0x1f) & 3)) >> 2);
    }
    if ((-1 < DAT_006acb08)) {
      if ((s16((DAT_0064c708 + uVar12 * 0x594), 0) < 2)) {
        local_a0 = 0;
      }
      iVar13 = FUN_0043d20a(DAT_006acb08, 1);
      bVar18 = (iVar13 !== 0);
      if (bVar18) {
        local_a0 = (local_a0 >> 1);
      }
      if ((s16((DAT_0064c708 + uVar12 * 0x594), 0) < 8)) {
        bVar18 = 1;
      }
    }
    iVar13 = FUN_00453e51(uVar12, 6);
    if ((iVar13 !== 0)) {
      local_a0 = (local_a0 / 2 | 0);
    }
  }
  if ((uVar12 === 0)) {
    if ((local_64 < 2)) DAT_006560f6 = DAT_006560f6 DAT_00655b0b = (DAT_00655b0b & DAT_00655ba9) local_64 = (local_64 / 2 | 0) local_64 = (local_64 < 2) {
      local_64 = 1;
    }
    iVar13 = FUN_00453e51(uVar7, 6);
    if ((iVar13 !== 0)) {
      local_a0 = (local_a0 << 1);
    }
  }
  if ((param_3 === 0)) {
    if (((DAT_00655ae8 & 0x10) !== 0)) {
      iVar8 = FUN_005b29d7(param_1);
      local_a0 = (iVar8 + local_78 * 8) * local_a0;
      iVar8 = FUN_005b29d7(local_c);
      local_64 = (iVar8 + local_34 * 8) * local_64;
    }
    (0xf9f < local_a0) (; 3999 = (0xf9f < local_a0); local_a0 = (local_a0 >> 1)) {
      local_64 = (local_64 >> 1);
    }
    iVar8 = ((local_a0 << 3) / (local_64 + 1) | 0);
    if ((iVar8 < 0x401)) {
      return iVar8;
    }
    return 0x400;
  }
  if (((DAT_006ad0cc & 2) !== 0)) {
    DAT_006560f8[param_1 * 0x20] = (DAT_006560f8[param_1 * 0x20] + DAT_0064bcc8);
  }
  if ((iVar13 !== 0)) iVar13 = FUN_00579ed0(uVar7, uVar12, 0xd) iVar13 = (iVar13 !== 0) {
    return 1;
  }
  if (((DAT_0064c6c0[(uVar12 * 4 + uVar7 * 0x594)] & 8) !== 0)) {
    return 1;
  }
  if ((uVar12 !== 0)) uVar12 = (uVar12 !== 0) {
    DAT_00655b14 = 0;
  }
  FUN_00467825(uVar7, uVar12, 0x200);
  if (((DAT_0064c6c1[(uVar7 * 4 + uVar12 * 0x594)] & 0x20) !== 0)) DAT_0064c6c0 = DAT_0064c6c0 DAT_0064c6c0 = DAT_0064c6c0 DAT_0064c6c0 = DAT_0064c6c0 DAT_0064c6c1 = DAT_0064c6c1 {
    if (((DAT_0064c6c0[(uVar7 * 4 + uVar12 * 0x594)] & 4) !== 0)) DAT_0064c6c0 = DAT_0064c6c0 {
      if ((DAT_00655b02 < 3)) {
        if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) 1 = (1 << (bVar2 & 0x1f)) {
          if (((DAT_0064c6c0[(DAT_006d1da0 * 0x594 + uVar12 * 4)] & 8) === 0)) {
            if (((DAT_0064c6c0[(DAT_006d1da0 * 0x594 + uVar7 * 4)] & 8) === 0)) {
              if ((DAT_00655b07 !== 0)) {
                local_30 = 1;
              }
            }
            else {
              local_b0 = 2;
            }
          }
          else {
            local_b0 = 1;
          }
        }
        else {
          local_30 = 1;
        }
      }
      else {
        (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
          if ((((1 << (((local_18) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            if ((uVar7 === local_18)) {
              w32((local_18 * 4 + 0x6acb10), 0, 1);
            }
            else if ((uVar12 === local_18)) {
              w32((local_18 * 4 + 0x6acb10), 0, 1);
            }
            else if ((DAT_00655b07 !== 0)) {
              w32((local_18 * 4 + 0x6acb10), 0, 1);
            }
            if ((s32((local_18 * 4 + 0x6acb10), 0) !== 0)) {
              local_30 = 1;
            }
          }
        }
        (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
          if ((((1 << (((local_18) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            if (((DAT_0064c6c0[(uVar12 * 4 + local_18 * 0x594)] & 8) === 0)) DAT_0064c6c0 = DAT_0064c6c0 {
              if (((DAT_0064c6c0[(uVar7 * 4 + local_18 * 0x594)] & 8) !== 0)) DAT_0064c6c0 = DAT_0064c6c0 {
                w32((local_18 * 4 + 0x6acae8), 0, 2);
                local_b0 = 2;
              }
            }
            else {
              w32((local_18 * 4 + 0x6acae8), 0, 1);
              local_b0 = 1;
            }
          }
        }
      }
    }
  }
  else {
    if ((4 < DAT_0064c6b5[uVar7 * 0x594])) {
      local_6c = _rand();
      local_6c = (local_6c % 0x64);
      if ((iVar13 !== 0)) iVar13 = FUN_00453e51(uVar7, 0x18) iVar13 = (iVar13 !== 0) {
        local_6c = (local_6c + -50);
      }
      if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) === 0)) 1 = (1 << (bVar1 & 0x1f)) {
        FUN_0055f5a3(uVar7, 1);
      }
    }
    if (((DAT_0064c6c0[(uVar7 * 4 + uVar12 * 0x594)] & 4) !== 0)) DAT_0064c6c0 = DAT_0064c6c0 {
      if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) 1 = (1 << (bVar2 & 0x1f)) {
        uVar14 = FUN_00410070(uVar7);
        FUN_0040ff60(0, uVar14);
        if ((DAT_006d1da0 === uVar12)) {
          FUN_004442e0(s_SNEAK_00634454, param_1);
        }
        else if ((2 < DAT_00655b02)) {
          FUN_00511880(0x2e, s32((DAT_006ad30c + s32((DAT_006ad558 + uVar12 * 4), 0) * 0x54), 0), 1, 0, param_1, 0);
        }
      }
    }
    else if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) 1 = (1 << (bVar2 & 0x1f)) {
      uVar14 = FUN_00493c7d(uVar7);
      FUN_0040ff60(0, uVar14);
      if ((DAT_006d1da0 === uVar12)) {
        FUN_004442e0(s_BREAKCEASE_00634448, param_1);
      }
      else if ((2 < DAT_00655b02)) {
        FUN_00511880(0x2d, s32((DAT_006ad30c + s32((DAT_006ad558 + uVar12 * 4), 0) * 0x54), 0), 1, 0, param_1, 0);
      }
    }
    local_a0 = (local_a0 << 1);
    w16((DAT_0064ca82 + (uVar12 * 0x594 + uVar7 * 2)), 0, DAT_00655af8);
  }
  iVar13 = FUN_00579c40(uVar7, uVar12);
  if ((uVar7 !== 0)) {
    if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) 1 = (1 << (bVar2 & 0x1f)) {
      local_a0 = (local_a0 >> 1);
    }
    if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) 1 = (1 << (bVar1 & 0x1f)) {
      local_a0 = (local_a0 << 1);
    }
  }
  bVar3 = 0;
  (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
    w32(DAT_ffffffa8, local_18, 0);
    if ((((1 << (((local_18) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) DAT_006d1da0 = (DAT_006d1da0 === local_18) 1 = (1 << (((local_18) & 0xFF) & 0x1f)) 1 = (1 << (((local_18) & 0xFF) & 0x1f)) {
      if ((DAT_00655b02 < 3)) {
        if (((DAT_0064bc60 & 8) !== 0)) uVar12 = (uVar12 === local_18) DAT_00655b07 = (DAT_00655b07 !== 0) 1 = (1 << (((local_18) & 0xFF) & 0x1f)) DAT_006560f7 = DAT_006560f7 1 = (1 << (((local_18) & 0xFF) & 0x1f)) DAT_006560f7 = DAT_006560f7 DAT_00655af0 = (DAT_00655af0 & 0x80) DAT_0064bc60 = (DAT_0064bc60 & 8) {
          w32(DAT_ffffffa8, local_18, 1);
          bVar3 = 1;
        }
      }
      else if ((uVar12 === local_18)) uVar12 = (uVar12 === local_18) {
        w32(DAT_ffffffa8, local_18, 1);
        bVar3 = 1;
      }
    }
  }
  if (bVar3) {
    FUN_005b490e(param_1, uVar12);
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
      if ((s32(DAT_ffffffa8, local_18) !== 0)) {
        if ((DAT_006d1da0 === local_18)) {
          iVar15 = FUN_004105f8(uVar11, iVar10, uVar7);
          if ((iVar15 === 0)) {
            FUN_0047cea6(iVar8, iVar9);
          }
        }
        else {
          local_c8 = uVar12;
          if ((uVar7 === local_18)) {
            local_c8 = uVar7;
          }
          FUN_0046b14d(0x71, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar11, iVar10, local_c8, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), iVar8, iVar9, 0, 0, 0, 0, 0, 0);
        }
      }
    }
    FUN_005b5bab(param_1, 1);
    (local_1c < 8) (local_1c = 0; local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
      if ((s16((DAT_0066ca84 + local_1c * 0x3f0), 0) !== 0)) DAT_0066ca84 = DAT_0066ca84 {
        FUN_0047bc59(local_c);
        FUN_0047cb26(uVar11, iVar10);
      }
    }
    if (((s32((DAT_0064b1bc + u8(DAT_006560f6[param_1 * 0x20]) * 0x14), 0) & 0x1008) !== 0)) {
      FUN_0046e287(0xa);
    }
    if ((DAT_00654fa8 === 0)) DAT_0064b1c4 = DAT_0064b1c4 1 = (1 << (bVar2 & 0x1f)) iVar15 = FUN_0043d07a(uVar11, iVar10, -1, -1, -1) -1 = (-1 < iVar15) FUN_0040ff60(0, (DAT_0064f360 + iVar15 * 0x58)) DAT_00654fa8 = (DAT_00654fa8 === 0) {
      (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
        if ((s32(DAT_ffffffa8, local_18) !== 0)) {
          if ((DAT_006d1da0 === local_18)) {
            FUN_004442e0(s_MISSILEATTACK_0063445c, param_1);
          }
          else {
            FUN_00511880(0x2f, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 1, 0, param_1, 0);
          }
        }
      }
    }
    if ((local_10 !== 0)) {
      uVar14 = FUN_00410070(uVar7);
      FUN_0040ff60(0, uVar14);
      FUN_004271e8(1, s32((DAT_0064b1b8 + u8(DAT_006560f6[param_1 * 0x20]) * 0x14), 0));
      uVar14 = FUN_00410070(uVar12);
      FUN_0040ff60(2, uVar14);
      if ((DAT_00654fa8 === 0)) {
        (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
          if ((s32(DAT_ffffffa8, local_18) !== 0)) {
            if ((DAT_006d1da0 === local_18)) {
              FUN_004442e0(s_PEARLHARBOR_0063446c, param_1);
            }
            else {
              FUN_00511880(0x30, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 3, 0, param_1, 0)
              ;
            }
          }
        }
      }
    }
    if ((local_b8 !== 0)) {
      FUN_004271e8(1, s32((DAT_0064c488 + local_b8 * 8), 0));
      FUN_0040ff60(2, (DAT_0064f360 + DAT_006acb08 * 0x58));
      if ((local_b8 === 0x11)) local_b8 = (local_b8 === 0x11) {
        if ((DAT_00654fa8 === 0)) {
          (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
            if ((s32(DAT_ffffffa8, local_18) !== 0)) {
              if ((DAT_006d1da0 === local_18)) {
                FUN_004cc870(s_BATTERY_00634484, local_b8, 8);
              }
              else {
                FUN_00511880(0x32, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 3, 0, local_b8, 0);
              }
            }
          }
        }
      }
      else {
        FUN_004271e8(3, DAT_0064c510);
        if ((DAT_00654fa8 === 0)) {
          (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
            if ((s32(DAT_ffffffa8, local_18) !== 0)) {
              if ((DAT_006d1da0 === local_18)) {
                FUN_004cc870(s_BATTERY2_00634478, local_b8, 8);
              }
              else {
                FUN_00511880(0x31, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 4, 0, local_b8, 0);
              }
            }
          }
        }
      }
    }
    if ((local_28 !== 0)) {
      uVar14 = FUN_00410070(uVar12);
      FUN_0040ff60(0, uVar14);
      FUN_004271e8(1, s32((DAT_0064b1b8 + u8(DAT_006560f6[local_c * 0x20]) * 0x14), 0));
      FUN_0040ff60(2, (DAT_0064f360 + DAT_006acb08 * 0x58));
      if ((DAT_00654fa8 === 0)) {
        (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
          if ((s32(DAT_ffffffa8, local_18) !== 0)) {
            if ((DAT_006d1da0 === local_18)) {
              FUN_004442e0(s_SCRAMBLE_0063448c, local_c);
            }
            else {
              FUN_00511880(0x33, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 3, 0, local_c, 0)
              ;
            }
          }
        }
      }
    }
    if ((iVar15 !== 0)) iVar15 = FUN_005b89e4(iVar8, iVar9) iVar15 = (iVar15 !== 0) {
      uVar14 = FUN_00410070(uVar7);
      FUN_0040ff60(1, uVar14);
      FUN_004271e8(2, s32((DAT_0064b1b8 + u8(DAT_006560f6[param_1 * 0x20]) * 0x14), 0));
      if ((DAT_00654fa8 === 0)) {
        (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
          if ((s32(DAT_ffffffa8, local_18) !== 0)) {
            if ((DAT_006d1da0 === local_18)) {
              FUN_004442e0(s_AMPHIBMOTIZE_00634498, param_1);
            }
            else {
              FUN_00511880(0x34, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 3, 0, param_1, 0)
              ;
            }
          }
        }
      }
    }
    local_ac = 0;
    bVar6 = DAT_006560f6[param_1 * 0x20];
    DAT_0066bfc4 = -1;
    DAT_0066bfc0 = -1;
    if ((bVar6 === 0x36)) {
      FUN_0046e020(0x7d, 1, 0, 0);
    }
    else if ((bVar6 === 0x37)) {
      FUN_0046e020(0x7e, 1, 0, 0);
    }
    else if ((bVar6 === 0x38)) {
      FUN_0046e020(0x7f, 1, 0, 0);
    }
    else if ((bVar6 === 0x39)) {
      FUN_0046e020(0x80, 1, 0, 0);
    }
    else if ((bVar6 === 0x3a)) {
      FUN_0046e020(0x81, 1, 0, 0);
    }
    else if ((bVar6 === 0x3b)) {
      FUN_0046e020(0x82, 1, 0, 0);
    }
    else if ((bVar6 === 0x3c)) {
      FUN_0046e020(0x83, 1, 0, 0);
    }
    else if ((bVar6 === 0x3d)) {
      FUN_0046e020(0x84, 1, 0, 0);
    }
    else if ((bVar6 === 0x33)) {
      FUN_0046e020(0x65, 1, 0, 0);
    }
    else if ((bVar6 === 0x34)) {
      FUN_0046e020(0x66, 1, 0, 0);
    }
    else if ((bVar6 === 0x35)) {
      FUN_0046e020(0x67, 1, 0, 0);
    }
    else if (((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) === 0)) {
      if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 1)) {
        if ((DAT_0064b1c1[u8(DAT_006560f6[local_c * 0x20]) * 0x14] === 1)) {
          if ((DAT_006560f6[param_1 * 0x20] < 0x1e)) {
            FUN_0046e020(0, 0, 0, 0);
          }
          else {
            FUN_0046e020(0x52, 0, 0, 0);
          }
        }
        else if ((DAT_0064b1c3[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0)) {
          FUN_0046e020(0x21, 1, 0, 0);
        }
        else if ((DAT_006560f6[param_1 * 0x20] < 0x1e)) {
          FUN_0046e020(0x18, 1, 0, 0);
        }
        else {
          FUN_0046e020(0x50, 1, 0, 0);
        }
      }
      else if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 2)) {
        if (((DAT_0064b1bc[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 8) === 0)) {
          local_ac = 6;
          if ((bVar6 === 0x25)) bVar6 = (bVar6 === 0x26) bVar6 = (bVar6 === 0x27) bVar6 = (bVar6 === 0x25) {
            local_ac = 0x2e;
          }
        }
        else {
          FUN_0046e020(0x4d, 1, 0, 0);
        }
      }
      else if ((bVar6 === 0x11)) {
        FUN_0046e020(0x19, 1, 0, 0);
      }
      else if ((bVar6 === 0x12)) bVar6 = (bVar6 === 0x10) bVar6 = (bVar6 === 0x13) bVar6 = (bVar6 === 0x12) {
        FUN_0046e020(0x4a, 1, 0, 0);
      }
      else if ((bVar6 === 0x15)) bVar6 = (bVar6 === 0x15) {
        FUN_0046e020(0xc, 1, 0, 0);
      }
      else if ((bVar6 === 9)) bVar6 = (bVar6 === 0xb) bVar6 = (bVar6 === 0xa) bVar6 = (bVar6 === 9) {
        FUN_0046e020(0x22, 1, 0, 0);
      }
      else if ((bVar6 === 0xe)) bVar6 = (bVar6 === 0xd) bVar6 = (bVar6 === 0xc) bVar6 = (bVar6 === 0xe) {
        FUN_0046e020(0x26, 1, 0, 0);
      }
      else if ((0x1a < bVar6)) 0x1a = (0x1a < bVar6) {
        FUN_0046e020(0x49, 1, 0, 0);
      }
      else if ((bVar6 === 0x17)) {
        FUN_0046e020(0xa, 1, 0, 0);
      }
      else {
        local_ac = 0x28;
        if ((0x17 < bVar6)) {
          FUN_0046e020(0x1c, 1, 0, 0);
          FUN_0046e287(0x14);
        }
      }
    }
    else if ((DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] < 0x63)) {
      FUN_0046e020(0x29, 1, 0, 0);
    }
    DAT_00633e48 = local_c;
    DAT_00633e40 = uVar11;
    DAT_00633e44 = iVar10;
    if ((2 < DAT_00655b02)) {
      (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
        if ((s32(DAT_ffffffa8, local_18) !== 0)) aiStack_58 = DAT_ffffffa8 {
          FUN_0046b14d(0x9a, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), DAT_0066bfc4, DAT_0066bfc0, 0, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x70, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), param_1, iVar8, iVar9, param_2, DAT_00633e48, 0, 0, 0);
        }
      }
    }
    FUN_0056c705(param_1, iVar8, iVar9, param_2, -1, -1);
    FUN_005b3ae0(param_1, iVar8, iVar9, 0);
    FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
    if ((2 < DAT_00655b02)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
        if ((s32(DAT_ffffffa8, local_18) !== 0)) aiStack_58 = DAT_ffffffa8 {
          FUN_0046b14d(0x73, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
        }
      }
    }
  }
  if ((0x62 < DAT_0064b1c4[u8(DAT_006560f6[param_1 * 0x20]) * 0x14])) {
    DAT_00633e48 = -1;
    iVar13 = FUN_0057f9e3(uVar7, uVar11, iVar10, 1);
    if ((iVar13 === 0)) {
      FUN_005b4391(param_1, 1);
      FUN_0047cea6(iVar8, iVar9);
      if ((2 < DAT_00655b02)) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
          if ((s32(DAT_ffffffa8, local_18) !== 0)) aiStack_58 = DAT_ffffffa8 {
            FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), iVar8, iVar9, 0, 0, 0, 0, 0, 0);
          }
        }
      }
    }
    else {
      DAT_0064c6f0[(uVar7 * 0x594 + uVar12)] = 0;
    }
    if ((-1 < DAT_006acb08)) 1 = (1 << (bVar1 & 0x1f)) -1 = (-1 < DAT_006acb08) {
      FUN_0057febc(uVar7, uVar11, iVar10);
    }
    return 0;
  }
  bVar4 = 0;
  if ((local_34 === 0)) local_34 = (local_34 === 0) {
    local_c0 = 0;
  }
  else {
    if ((DAT_0064b1c6[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] < 0x1e)) DAT_0064b1c6 = DAT_0064b1c6 {
      local_cc = 1;
    }
    else {
      local_cc = 0;
    }
    local_2c = (0xa >> local_cc);
    if (((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0)) {
      local_2c = 0;
      bVar4 = 0;
      (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
        if ((s32(DAT_ffffffa8, local_18) !== 0)) {
          if ((DAT_006d1da0 === local_18)) {
            FUN_0057ed3f(uVar11, iVar10, local_ac);
          }
          else {
            FUN_0046b14d(0x7c, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar11, iVar10, local_ac, 0, 0, 0, 0, 0);
          }
        }
      }
    }
    do {
      while ((local_c0 === 0)) {
        iVar15 = FUN_005b29d7(param_1);
        if ((iVar15 === 0)) iVar15 = FUN_005b29d7(local_c) iVar15 = (iVar15 === 0) {
          local_c0 = FUN_005b29d7(param_1);
          goto LAB_00582cbe;
        }
        if (((local_a0 === 1) || ((local_a0 + -1) < 0))) {
          local_d0 = 0;
        }
        else {
          local_d0 = _rand();
          local_d0 = (local_d0 % local_a0);
        }
        if (((local_64 === 1) || ((local_64 + -1) < 0))) {
          local_d4 = 0;
        }
        else {
          local_d4 = _rand();
          local_d4 = (local_d4 % local_64);
        }
        local_c0 = u8((local_d4 < local_d0));
        if ((local_c0 !== 0)) local_c0 = (local_c0 !== 0) {
          if (((local_a0 === 1) || ((local_a0 + -1) < 0))) {
            local_d8 = 0;
          }
          else {
            local_d8 = _rand();
            local_d8 = (local_d8 % local_a0);
          }
          if (((local_64 === 1) || ((local_64 + -1) < 0))) {
            local_dc = 0;
          }
          else {
            local_dc = _rand();
            local_dc = (local_dc % local_64);
          }
          if ((local_d8 < local_dc)) {
            local_c0 = 0;
          }
        }
        if ((local_c0 === 0)) break; bVar6 = DAT_006560fa[local_c * 0x20] DAT_006560fa[local_c * 0x20] = (DAT_006560fa[local_c * 0x20] + ((local_78) & 0xFF)) local_2c = (local_2c !== 0) DAT_006560fa = DAT_006560fa {
          bVar4 = 1;
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
            if ((s32(DAT_ffffffa8, local_18) !== 0)) {
              if ((DAT_006d1da0 === local_18)) {
                FUN_0057ed3f(uVar11, iVar10, local_ac);
                iVar15 = FUN_005b29d7(local_c);
                if ((iVar15 !== 0)) {
                  FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
                }
              }
              else {
                FUN_0046b14d(0x7c, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar11, iVar10, local_ac, 0, 0, 0, 0, 0);
                iVar15 = FUN_005b29d7(local_c);
                if ((iVar15 !== 0)) {
                  FUN_0046b14d(0x73, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
                }
              }
            }
          }
        }
        if (((DAT_00655ae8 & 0x10) === 0)) goto LAB_00582cbe; bVar6 = DAT_006560fa[param_1 * 0x20] DAT_006560fa[param_1 * 0x20] = (DAT_006560fa[param_1 * 0x20] + ((local_34) & 0xFF)) local_2c = (local_2c !== 0) DAT_006560fa = DAT_006560fa {
        bVar4 = 1;
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
          if ((s32(DAT_ffffffa8, local_18) !== 0)) {
            if ((DAT_006d1da0 === local_18)) {
              FUN_0057ed3f(iVar8, iVar9, local_ac);
              iVar15 = FUN_005b29d7(param_1);
              if ((iVar15 !== 0)) {
                FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
              }
            }
            else {
              FUN_0046b14d(0x7c, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), iVar8, iVar9, local_ac, 0, 0, 0, 0, 0);
              iVar15 = FUN_005b29d7(param_1);
              if ((iVar15 !== 0)) {
                FUN_0046b14d(0x73, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
              }
            }
          }
        }
      }
    } while (((DAT_00655ae8 & 0x10) !== 0)) LAB_00582cbe: {
    DAT_0062c5bc = 1;
  }
  if (bVar3) {
    DAT_0066bfc4 = -1;
    if (((DAT_0064b1bd[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] & 0x10) !== 0)) DAT_0064b1c1 = DAT_0064b1c1 -1 = (-1 < DAT_006acb08) local_c0 = (local_c0 !== 0) DAT_0064b1c1 = DAT_0064b1c1 DAT_0064b1bd = DAT_0064b1bd {
      if ((local_ac !== 0)) {
        FUN_0046e020(0x23, 1, 0, 0);
      }
    }
    else if ((local_c0 === 0)) {
      if ((DAT_006560f6[param_1 * 0x20] < 0x1e)) {
        FUN_0046e020(0x17, 1, 0, 0);
      }
      else {
        FUN_0046e020(0x4f, 1, 0, 0);
      }
    }
    else if ((DAT_006560f6[local_c * 0x20] < 0x1e)) {
      FUN_0046e020(0x17, 1, 0, 0);
    }
    else {
      FUN_0046e020(0x4f, 1, 0, 0);
    }
    if ((DAT_0066bfc4 !== -1)) DAT_0066bfc4 = (DAT_0066bfc4 !== -1) {
      (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
        if ((s32(DAT_ffffffa8, local_18) !== 0)) aiStack_58 = DAT_ffffffa8 {
          FUN_0046b14d(0x7a, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), DAT_0066bfc4, DAT_0066bfc0, 0, 0, 0, 0, 0, 0);
        }
      }
    }
  }
  FUN_004b0b53(0xff, 2, 0, 0, 0);
  if (bVar3) {
    (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
      if ((s32(DAT_ffffffa8, local_18) !== 0)) {
        if ((DAT_006d1da0 === local_18)) {
          FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
          if ((local_c0 === 0)) {
            if ((!bVar4)) {
              FUN_0057ed3f(iVar8, iVar9, 0);
            }
          }
          else if ((!bVar4)) {
            FUN_0057ed3f(uVar11, iVar10, 0);
          }
        }
        else {
          FUN_0046b14d(0x73, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
          if ((local_c0 === 0)) {
            if ((!bVar4)) {
              FUN_0046b14d(0x7c, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), iVar8, iVar9, 0, 0, 0, 0, 0, 0);
            }
          }
          else if ((!bVar4)) {
            FUN_0046b14d(0x7c, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar11, iVar10, 0, 0, 0, 0, 0, 0);
          }
        }
      }
    }
  }
  DAT_00633e48 = -1;
  DAT_006acb0c = 0;
  if ((local_c0 === 0)) {
    DAT_0064c6f0[(uVar7 * 0x594 + uVar12)] = (DAT_0064c6f0[(uVar7 * 0x594 + uVar12)] + 1);
    if ((((local_64 + local_a0) === 1) || (((local_64 + local_a0) + -1) < 0))) {
      local_e4 = 0;
    }
    else {
      local_e4 = _rand();
      local_e4 = (local_e4 % (local_64 + local_a0));
    }
    if ((iVar15 !== 0)) iVar15 = FUN_00453e51(uVar12, 7) iVar15 = (iVar15 !== 0) {
      FUN_0057ebfd(local_c);
    }
  }
  else {
    DAT_0064c6f0[(uVar7 * 0x594 + uVar12)] = 0;
    if ((((local_64 + local_a0) === 1) || (((local_64 + local_a0) + -1) < 0))) {
      local_e0 = 0;
    }
    else {
      local_e0 = _rand();
      local_e0 = (local_e0 % (local_64 + local_a0));
    }
    if ((iVar15 !== 0)) iVar15 = FUN_00453e51(uVar7, 7) iVar15 = (iVar15 !== 0) {
      FUN_0057ebfd(param_1);
    }
  }
  if ((local_c0 === 0)) {
    local_20 = uVar12;
    FUN_005b5bab(param_1, 1);
    FUN_0057eb94(param_1, local_c, local_8, local_14);
    local_60 = uVar7;
  }
  else {
    if ((4 < DAT_0064b1ca[u8(DAT_006560f6[local_c * 0x20]) * 0x14])) '\x04' = (4 < DAT_0064b1ca[u8(DAT_006560f6[local_c * 0x20]) * 0x14]) {
      bVar5 = 1;
    }
    local_20 = uVar7;
    if ((iVar15 < 0)) bVar6 = FUN_005b94d5(uVar11, iVar10) bVar6 = (bVar6 & 0x42) iVar15 = FUN_005b8d15(uVar11, iVar10) iVar15 = (iVar15 < 0) {
      FUN_0057eb94(local_c, param_1, local_8, local_14);
    }
    else {
      FUN_0057e9f9(local_c, param_1, local_8, local_14);
    }
    iVar15 = DAT_006acb08;
    local_60 = uVar12;
    if ((-1 < DAT_006acb08)) {
      w32((DAT_0064f344 + DAT_006acb08 * 0x58), 0, (s32((DAT_0064f344 + DAT_006acb08 * 0x58), 0) | 0x20));
      iVar16 = FUN_005b89e4(iVar8, iVar9);
      if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) iVar16 = FUN_0043d20a(iVar15, 8) iVar16 = (iVar16 === 0) iVar16 = FUN_00453e51(uVar12, 6) iVar16 = (iVar16 === 0) DAT_00655b08 = (DAT_00655b08 !== 0) 1 = (1 << (bVar2 & 0x1f)) {
        DAT_0064f349[iVar15 * 0x58] = (DAT_0064f349[iVar15 * 0x58] + 0xff);
        if ((DAT_0064f349[iVar15 * 0x58] === 0)) {
          FUN_004413d1(iVar15, 0);
          (local_bc < 8) (local_bc = 1; local_bc = (local_bc < 8); local_bc = (local_bc + 1)) {
            FUN_005b8b1a(uVar11, iVar10, local_bc);
          }
          FUN_0047cf22(uVar11, iVar10);
          iVar16 = FUN_004aa378(uVar12, uVar7);
          if ((iVar16 !== 0)) {
            local_30 = 0;
            (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
              w32((local_18 * 4 + 0x6acb10), 0, 0);
            }
          }
        }
        else {
          FUN_0043cc00(iVar15, uVar7);
          iVar16 = FUN_005b8d62(uVar11, iVar10);
          if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) 1 = (1 << (bVar2 & 0x1f)) {
            uVar14 = FUN_005b8a81(uVar11, iVar10);
            FUN_00442541(uVar12, uVar14);
          }
        }
      }
      iVar16 = FUN_005b8d62(uVar11, iVar10);
      if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) 1 = (1 << (bVar2 & 0x1f)) {
        FUN_005369f3(iVar15);
      }
    }
  }
  FUN_004b0b53(0xff, 2, 0, 0, 0);
  if (bVar3) {
    if ((2 < DAT_00655b02)) {
      (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
        if ((s32(DAT_ffffffa8, local_18) !== 0)) aiStack_58 = DAT_ffffffa8 {
          FUN_0046b14d(0x73, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar11, iVar10, iVar8, iVar9, 0, 0, 0, 0);
        }
      }
    }
    FUN_005802fd(uVar11, iVar10, iVar8, iVar9);
  }
  if ((1 < DAT_006acb0c)) 1 = (1 < DAT_006acb0c) {
    FUN_00421da0(0, DAT_006acb0c);
    if ((DAT_006d1da0 === local_60)) {
      FUN_00421ea0(s_MULTIPLELOSE_006344a8);
    }
    else if ((DAT_006d1da0 === local_20)) {
      FUN_00421ea0(s_MULTIPLEWIN_006344b8);
    }
    if ((DAT_006d1da0 === local_60)) 1 = (1 << (((local_60) & 0xFF) & 0x1f)) DAT_006d1da0 = (DAT_006d1da0 === local_60) {
      if ((DAT_006d1da0 !== local_20)) 1 = (1 << (((local_20) & 0xFF) & 0x1f)) DAT_006d1da0 = (DAT_006d1da0 !== local_20) {
        FUN_00511880(0x36, s32((DAT_006ad30c + s32((DAT_006ad558 + local_20 * 4), 0) * 0x54), 0), 0, 1, 0, 0);
      }
    }
    else {
      FUN_00511880(0x35, s32((DAT_006ad30c + s32((DAT_006ad558 + local_60 * 4), 0) * 0x54), 0), 0, 1, 0, 0);
    }
  }
  if (bVar5) {
    uVar17 = (u8(DAT_00655b09) * 0x64 / 2 | 0);
    w32((DAT_0064c6a2 + uVar7 * 0x594), 0, (s32((DAT_0064c6a2 + uVar7 * 0x594), 0) + uVar17));
    FUN_00421da0(0, uVar17);
    if ((DAT_00654fa8 === 0)) DAT_00654fa8 = (DAT_00654fa8 === 0) {
      FUN_004442a0(s_RANSOM_006344c4, 0x3e, 0);
      FUN_00569363(1);
    }
    else if ((DAT_00654fa8 === 0)) DAT_00654fa8 = (DAT_00654fa8 === 0) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
        if ((DAT_006d1da0 !== local_18)) DAT_006d1da0 = (DAT_006d1da0 !== local_18) {
          FUN_00511880(0x37, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 1, 0, 0x3e, 0);
          FUN_0046b14d(0x78, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
        }
      }
    }
  }
  if ((iVar13 !== 0)) {
    FUN_0045a8e3(uVar12, uVar7);
  }
  if ((local_b0 !== 0)) local_30 = (local_30 !== 0) local_b0 = (local_b0 !== 0) {
    uVar14 = FUN_00493c7d(uVar12);
    FUN_0040ff60(0, uVar14);
    uVar14 = FUN_00493c7d(uVar7);
    FUN_0040ff60(1, uVar14);
    if ((DAT_00655b02 < 3)) {
      if ((local_30 === 0)) {
        if ((local_b0 === 1)) {
          FUN_00421ea0(s_ALLYUNDERATTACK_006344d8);
          FUN_0045b0d6(uVar12, uVar7);
        }
        else {
          FUN_00421ea0(s_ALLYATTACKING_006344e8);
        }
      }
      else {
        FUN_00421ea0(s_CANCELPEACE_006344cc);
      }
    }
    else if ((DAT_00654fa8 === 0)) {
      (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
        if ((s32((local_18 * 4 + 0x6acb10), 0) !== 0)) {
          if ((DAT_006d1da0 === local_18)) {
            FUN_00421ea0(s_CANCELPEACE_006344f8);
          }
          else {
            FUN_00511880(0x3a, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 2, 0, 0, 0);
          }
        }
        if ((DAT_00654fa8 === 0)) DAT_00654fa8 = (DAT_00654fa8 === 0) {
          if ((DAT_006d1da0 === local_18)) {
            if ((s32((local_18 * 4 + 0x6acae8), 0) === 1)) {
              FUN_00421ea0(s_ALLYUNDERATTACK_00634504);
              FUN_0045b0d6(uVar12, uVar7);
            }
            else {
              FUN_00421ea0(s_ALLYATTACKING_00634514);
            }
          }
          else if ((s32((local_18 * 4 + 0x6acae8), 0) === 1)) {
            FUN_00511880(0x3b, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 2, 0, 0, 0);
            if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
              FUN_0046b14d(0x7e, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), uVar12, uVar7, 0, 0, 0, 0, 0, 0);
            }
          }
          else {
            FUN_00511880(0x3c, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 2, 0, 0, 0);
          }
        }
      }
    }
  }
  FUN_00436287(2);
  if ((2 < DAT_00655b02)) {
    FUN_0046b14d(0x7f, 0xff, 2, 0, 0, 0, 0, 0, 0, 0);
  }
  if ((local_c0 === 0)) {
    local_38 = 0;
  }
  else {
    iVar13 = ((DAT_00655b00) << 16 >> 16);
    if ((DAT_0064b1c3[u8(DAT_006560f6[iVar13 * 0x20]) * 0x14] !== 1)) DAT_0064b1c3 = DAT_0064b1c3 {
      FUN_005b6787(iVar13);
    }
    if ((-1 < iVar15)) 1 = (1 << (bVar1 & 0x1f)) DAT_006acb08 = (DAT_006acb08 < 0) iVar15 = FUN_005b2e69(uVar11, iVar10) -1 = (-1 < iVar15) {
      if (((DAT_0064b1bd[u8(DAT_006560f6[iVar13 * 0x20]) * 0x14] & 0x10) !== 0)) DAT_0064b1bd = DAT_0064b1bd {
        FUN_005b4391(iVar13, 1);
        local_38 = 0;
      }
    }
    else {
      if (((DAT_0064b1bd[u8(DAT_006560f6[iVar13 * 0x20]) * 0x14] & 0x10) === 0)) {
        if ((DAT_0064b1c3[u8(DAT_006560f6[iVar13 * 0x20]) * 0x14] <= DAT_006560fd[iVar13 * 0x20])) DAT_0064b1c3 = DAT_0064b1c3 DAT_006560fd[iVar13 * 0x20] = (DAT_006560fd[iVar13 * 0x20] + 1) DAT_0064b1c3 = DAT_0064b1c3 goto LAB_00583d2b; {
        FUN_005b4391(iVar13, 1);
        FUN_0047cf22(iVar8, iVar9);
      }
      FUN_0057febc(uVar7, uVar11, iVar10);
      local_38 = 0;
    }
  }
 LAB_00583d2b: :
  if ((2 < DAT_00655b02)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
      if ((s32(DAT_ffffffa8, local_18) !== 0)) aiStack_58 = DAT_ffffffa8 {
        FUN_0046b14d(0xa3, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
        FUN_0046b14d(0x75, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), iVar8, iVar9, 0, 0, 0, 0, 0, 0);
      }
    }
  }
  return local_38;
}


 export function FUN_005866a0 ()

 {
  let hWnd;

  hWnd = FUN_00418770();
  FUN_006e7d94(hWnd);
  FUN_00586eb0();
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005866d3 ()

 {
  _DAT_006a2d80 = u8(DAT_0064bcc8);
  _DAT_006a2d84 = u8(DAT_0064bcc9);
  _DAT_006a2d88 = u8(DAT_0064bcca);
  _DAT_006a2d8c = u8(DAT_0064bccb);
  _DAT_006a2d90 = u8(DAT_0064bccc);
  _DAT_006a2d94 = u8(DAT_0064bccd);
  _DAT_006a2d98 = u8(DAT_0064bcce);
  _DAT_006a2d9c = u8(DAT_0064bccf);
  _DAT_006a2da0 = u8(DAT_0064bcd0);
  _DAT_006a2da4 = u8(DAT_0064bcd1);
  _DAT_006a2da8 = u8(DAT_0064bcd2);
  _DAT_006a2dac = u8(DAT_0064bcd3);
  _DAT_006a2db0 = u8(DAT_0064bcd4);
  _DAT_006a2db4 = u8(DAT_0064bcd5);
  _DAT_006a2db8 = u8(DAT_0064bcd6);
  _DAT_006a2dbc = u8(DAT_0064bcd7);
  _DAT_006a2dc0 = u8(DAT_0064bcd8);
  _DAT_006a2dc4 = u8(DAT_0064bcd9);
  _DAT_006a2dc8 = u8(DAT_0064bcda);
  _DAT_006a2dcc = u8(DAT_0064bcdb);
  _DAT_006a2dd0 = u8(DAT_0064bcdc);
  _DAT_006a2dd4 = u8(DAT_0064bcdd);
  FUN_00419d23();
  _DAT_006a2d28 = u8(DAT_0064bcc8);
  _DAT_006a2d2c = u8(DAT_0064bcc9);
  _DAT_006a2d30 = u8(DAT_0064bcca);
  _DAT_006a2d34 = u8(DAT_0064bccb);
  _DAT_006a2d38 = u8(DAT_0064bccc);
  _DAT_006a2d3c = u8(DAT_0064bccd);
  _DAT_006a2d40 = u8(DAT_0064bcce);
  _DAT_006a2d44 = u8(DAT_0064bccf);
  _DAT_006a2d48 = u8(DAT_0064bcd0);
  _DAT_006a2d4c = u8(DAT_0064bcd1);
  _DAT_006a2d50 = u8(DAT_0064bcd2);
  _DAT_006a2d54 = u8(DAT_0064bcd3);
  _DAT_006a2d58 = u8(DAT_0064bcd4);
  _DAT_006a2d5c = u8(DAT_0064bcd5);
  _DAT_006a2d60 = u8(DAT_0064bcd6);
  _DAT_006a2d64 = u8(DAT_0064bcd7);
  _DAT_006a2d68 = u8(DAT_0064bcd8);
  _DAT_006a2d6c = u8(DAT_0064bcd9);
  _DAT_006a2d70 = u8(DAT_0064bcda);
  _DAT_006a2d74 = u8(DAT_0064bcdb);
  _DAT_006a2d78 = u8(DAT_0064bcdc);
  _DAT_006a2d7c = u8(DAT_0064bcdd);
  DAT_0064bcc8 = ((u8(DAT_0064bcc8)) & 0xFF);
  DAT_0064bcc9 = ((u8(DAT_0064bcc9)) & 0xFF);
  DAT_0064bcca = ((u8(DAT_0064bcca)) & 0xFF);
  DAT_0064bccb = ((u8(DAT_0064bccb)) & 0xFF);
  DAT_0064bccc = ((u8(DAT_0064bccc)) & 0xFF);
  DAT_0064bccd = ((u8(DAT_0064bccd)) & 0xFF);
  DAT_0064bcce = ((u8(DAT_0064bcce)) & 0xFF);
  DAT_0064bccf = ((u8(DAT_0064bccf)) & 0xFF);
  DAT_0064bcd0 = ((u8(DAT_0064bcd0)) & 0xFF);
  DAT_0064bcd1 = ((u8(DAT_0064bcd1)) & 0xFF);
  DAT_0064bcd2 = ((u8(DAT_0064bcd2)) & 0xFF);
  DAT_0064bcd3 = ((u8(DAT_0064bcd3)) & 0xFF);
  DAT_0064bcd4 = ((u8(DAT_0064bcd4)) & 0xFF);
  DAT_0064bcd5 = ((u8(DAT_0064bcd5)) & 0xFF);
  DAT_0064bcd6 = ((u8(DAT_0064bcd6)) & 0xFF);
  DAT_0064bcd7 = ((u8(DAT_0064bcd7)) & 0xFF);
  DAT_0064bcd8 = ((u8(DAT_0064bcd8)) & 0xFF);
  DAT_0064bcd9 = ((u8(DAT_0064bcd9)) & 0xFF);
  DAT_0064bcda = ((u8(DAT_0064bcda)) & 0xFF);
  DAT_0064bcdb = ((u8(DAT_0064bcdb)) & 0xFF);
  DAT_0064bcdc = ((u8(DAT_0064bcdc)) & 0xFF);
  DAT_0064bcdd = ((u8(DAT_0064bcdd)) & 0xFF);
  return;
}


 export function FUN_005869d4 ()

 {
  let _Str;
  let sVar1;
  let local_a8;
  let local_a4;
  let local_24;

  local_a8 = 0;
  FUN_00419060();
  FUN_004a2379(s_DEBUG_006359dc, s_EDITCOSMIC_00634640);
  while ((0x15 < local_a8)) {
    _Str = FUN_004a23fc(1);
    sVar1 = _strlen(_Str);
    if ((0x15 < local_a8)) 0x15 = (0x15 < local_a8) break; {
      _sprintf(DAT_ffffff5c, s_%d_0063464c, s32((DAT_006a2d80 + local_a8 * 4), 0));
    }
    else if ((s32((DAT_006a2d80 + local_a8 * 4), 0) < 0x64)) {
      _sprintf(DAT_ffffff5c, s_%d_00634654, s32((DAT_006a2d80 + local_a8 * 4), 0));
    }
    else {
      _sprintf(DAT_ffffff5c, DAT_0063465c, s32((DAT_006a2d80 + local_a8 * 4), 0));
    }
    if ((s32((DAT_006a2d28 + local_a8 * 4), 0) < 0xa)) {
      _sprintf(DAT_ffffffdc, s_(%d)_-_00634660, s32((DAT_006a2d28 + local_a8 * 4), 0));
    }
    else if ((s32((DAT_006a2d28 + local_a8 * 4), 0) < 0x64)) {
      _sprintf(DAT_ffffffdc, s_(%d)_-_00634670, s32((DAT_006a2d28 + local_a8 * 4), 0));
    }
    else {
      _sprintf(DAT_ffffffdc, s_(%d)_-_0063467c, s32((DAT_006a2d28 + local_a8 * 4), 0));
    }
    FUN_005f22e0(DAT_ffffff5c, DAT_ffffffdc);
    FUN_005f22e0(DAT_ffffff5c, DAT_00679640);
    FUN_00419020(DAT_ffffff5c);
    local_a8 = (local_a8 + 1);
  }
  FUN_004a2020();
  return;
}


 export function FUN_00586bb6 ()

 {
  let iVar1;
  let pcVar2;
  let iVar3;
  let uVar4;
  let uVar5;
  let pcVar6;
  let local_120;
  let local_118;
  let local_14;

  iVar1 = FUN_00551d50();
  if ((DAT_006a4f88 === 0)) {
    local_120 = 0;
  }
  else {
    local_120 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_120);
  FUN_00421da0(0, s32((DAT_00634590 + iVar1 * 4), 0));
  FUN_00421da0(1, s32((DAT_006345e8 + iVar1 * 4), 0));
  pcVar6 = DAT_fffffee8;
  pcVar2 = __itoa(s32((DAT_006a2d28 + iVar1 * 4), 0), DAT_ffffffec, 0xa);
  iVar3 = FUN_0051d63b(s_DEBUG_006359dc, s_CPEDIT_00634688, 3, pcVar2, pcVar6);
  if ((-1 < iVar3)) {
    uVar4 = s32((DAT_006345e8 + iVar1 * 4), 0);
    uVar5 = s32((DAT_00634590 + iVar1 * 4), 0);
    iVar3 = _atoi(DAT_fffffee8);
    uVar4 = FUN_005adfa0(iVar3, uVar5, uVar4);
    w32((DAT_006a2d28 + iVar1 * 4), 0, uVar4);
    FUN_005869d4();
    FUN_00551d80(iVar1);
  }
  FUN_004bb5e0();
  FUN_0059d3c9(0);
  FUN_005866a0();
  return;
}


 export function FUN_00586d0a (param_1, param_2)

 {
  let pcVar1;
  let local_88;
  let local_84;

  (local_88 < 0x16) (local_88 = 0; local_88 = (local_88 < 0x16); local_88 = (local_88 + 1)) {
    _fgets(DAT_ffffff7c, 0x80, param_2);
    pcVar1 = _strchr(DAT_ffffff7c, 0x3b);
    _sprintf(DAT_00679640, s_%-8d%s_00634690, s32((DAT_006a2d28 + local_88 * 4), 0), pcVar1);
    _fputs(DAT_00679640, param_1);
  }
  return 1;
}


 export function FUN_00586da1 ()

 {
  let iVar1;
  let lpText;
  let lpCaption;
  let uType;
  let local_24;

  FUN_004ccab9(s_COSMIC_00634698, LAB_0040172b);
  iVar1 = FUN_004ccf2d();
  if ((iVar1 === 0)) {
    _sprintf(DAT_ffffffdc, s_Error_updating_RULES.%s_006346a0, DAT_0062cd24);
    uType = 0x10;
    lpCaption = s_File_I/O_Error_006346b8;
    lpText = DAT_ffffffdc;
    iVar1 = FUN_00414d10();
    FUN_006e7dd4(s32((iVar1 + 4), 0), lpText, lpCaption, uType);
  }
  DAT_006a1d7c = 0;
  DAT_006a4f88 = (DAT_006a4f88 + 0x48);
  return;
}


 export function FUN_00586e24 ()

 {
  let local_8;

  if ((DAT_006a4f88 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(DAT_006346d0, s_EFFECTS_006346c8);
  FUN_0059d3c9(0);
  FUN_005866a0();
  return;
}


 export function FUN_00586e88 ()

 {
  DAT_006a1d7c = 0;
  DAT_006a4f88 = (DAT_006a4f88 + 0x48);
  return;
}


 export function FUN_00586eb0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_00552112();
  FUN_0040fdb0(in_ECX, (in_ECX + 0x2bc), 0x1a);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  FUN_00408460();
  return;
}


 export function FUN_00586f16 (in_ECX)

 {
  let iVar1;
  let pvVar2;
  let uVar3;
  let uVar4;
  let extraout_EAX;
  let iVar5;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let uVar11;
  let uVar12;
  let local_484;
  let local_480;
  let local_47c;
  let local_478;
  let local_474;
  let local_464;
  let local_454;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005875f5;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  DAT_006a1d7c = 1;
  DAT_006a4f88 = in_ECX;
  pvVar2 = operator_new(0x48);
  local_8 = 1;
  if ((pvVar2 === 0)) {
    local_464 = 0;
  }
  else {
    local_464 = FUN_005bd630();
  }
  local_8 = (UNNAMED << 8);
  DAT_0062e018 = local_464;
  FUN_00417ef0(0, DAT_0062e01c);
  FUN_005d268e(DAT_006a4f90);
  FUN_005d25a8(DAT_006a4f90);
  FUN_005d2550(0x29);
  FUN_005d2568(0x12, 1, 1);
  FUN_005d2590(0x25);
  w32((in_ECX + 0x2d8), 0, 0x230);
  w32((in_ECX + 0x2dc), 0, 0x1c6);
  w32((in_ECX + 0x2ec), 0, 0);
  DAT_006a1d80 = 0xc9;
  uVar3 = FUN_0040ef70();
  w32((in_ECX + 0x2e8), 0, uVar3);
  uVar12 = 0;
  uVar11 = 0;
  uVar10 = 0;
  uVar3 = s32((in_ECX + 0x2dc), 0);
  uVar9 = s32((in_ECX + 0x2d8), 0);
  uVar8 = 0;
  uVar7 = 0;
  uVar6 = 0xd;
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x94c), 0), 0xd, 0, 0, uVar9, uVar3, 0, 0, 0);
  FUN_005534bc(uVar4, uVar6, uVar7, uVar8, uVar9, uVar3, uVar10, uVar11, uVar12);
  FUN_004086c0(DAT_fffffbac, (s32((in_ECX + 0x124), 0) + 2), (s32((in_ECX + 0x128), 0) + 2), (s32((in_ECX + 0x12c), 0) + -5), (s32((in_ECX + 0x130), 0) + -20));
  iVar1 = 0xc9;
  DAT_006a1d80 = (0xc9 + 1);
  if ((in_ECX === 0)) {
    local_474 = 0;
  }
  else {
    local_474 = (in_ECX + 0x48);
  }
  FUN_00418f40(local_474, iVar1, DAT_fffffbac);
  FUN_00418fe0(DAT_006a4f90);
  FUN_00551dc0(LAB_004038a5);
  FUN_005866d3();
  FUN_005869d4();
  FUN_00551d80(0);
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  w32((in_ECX + 0x2e4), 0, (extraout_EAX + 8));
  w32((in_ECX + 0x2e0), 0, (((s32((in_ECX + 0x12c), 0) + -10) + (((s32((in_ECX + 0x12c), 0) + -10) >> 0x1f) & 3)) >> 2));
  iVar5 = ((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2e4), 0) + 2));
  iVar1 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 2), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_478 = 0;
  }
  else {
    local_478 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_478, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_0040342c);
  iVar1 = ((iVar1 + 2) + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_47c = 0;
  }
  else {
    local_47c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8e0), 0));
  FUN_0040f680(local_47c, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_004038a5);
  FUN_0040f7d0();
  iVar1 = (iVar1 + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_480 = 0;
  }
  else {
    local_480 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8ec), 0));
  FUN_0040f680(local_480, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_004010f5);
  FUN_004086c0(DAT_fffffbac, (iVar1 + (s32((in_ECX + 0x2e0), 0) + 2)), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_484 = 0;
  }
  else {
    local_484 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((/* DEPTH */ + 0x3fc), 0));
  FUN_0040f680(local_484, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00402fae);
  FUN_0040f840();
  FUN_0040f350(0);
  in_ECX = EnableStackedTabs(in_ECX, 0x401c0d);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006a1d7c !== 0)) DAT_006a1d7c = (DAT_006a1d7c !== 0) {
    FUN_0040ef50();
  }
  if ((DAT_0062e018 !== 0)) {
    FUN_0040f010(1);
  }
  DAT_0062e018 = 0;
  local_8 = -1;
  FUN_005875e9();
  FUN_005875ff();
  return;
}


 export function FUN_005875e9 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_005875ff (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0058760d ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00587672;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00417fa0();
  local_8 = 0;
  FUN_00586f16();
  FUN_005bb574();
  local_8 = -1;
  FUN_00587666();
  FUN_0058767c();
  return;
}


 export function FUN_00587666 ()

 {
  FUN_004183d0();
  return;
}


 export function FUN_0058767c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00587a90 (in_ECX, param_1, param_2, param_3)

 {
  let piVar1;
  let iVar2;
  let pvVar3;
  // in_ECX promoted to parameter;
  let iVar4;
  let unaff_FS_OFFSET;
  let local_38;
  let local_34;
  let local_30;
  let local_28;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00587deb;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_20 = s32(param_1, 0);
  local_1c = s32(param_1, 1);
  local_18 = s32(param_1, 2);
  local_14 = s32(param_1, 3);
  w32((DAT_006acb58 + param_2 * 4), 0, param_3);
  FUN_00588f36(param_2, 0);
  if ((s32(((in_ECX + 0x3e8) + param_2 * 4), 0) < 1)) {
    w32(((in_ECX + 0x10410) + param_2 * 4), 0, -1);
  }
  else {
    w32(((in_ECX + 0x10410) + param_2 * 4), 0, 0);
  }
  w32(((in_ECX + 0x3e0) + param_2 * 4), 0, 4);
  iVar4 = (param_2 * 0x10 + in_ECX);
  w32((iVar4 + 0x3c0), 0, s32(param_1, 0));
  w32((iVar4 + 0x3c4), 0, s32(param_1, 1));
  w32((iVar4 + 0x3c8), 0, s32(param_1, 2));
  w32((iVar4 + 0x3cc), 0, s32(param_1, 3));
  if ((s32(((in_ECX + 0x10420) + param_2 * 4), 0) < s32(((in_ECX + 0x3e8) + param_2 * 4), 0))) {
    iVar2 = FUN_006e7d8c(2);
    iVar4 = local_18;
    piVar1 = ((param_2 * 0x10 + 0x3c8) + in_ECX);
    w32(piVar1, 0, (s32(piVar1, 0) - iVar2));
    local_20 = FUN_006e7d8c(2);
    local_20 = (iVar4 - local_20);
    pvVar3 = operator_new(0x40);
    local_8 = 0;
    if ((pvVar3 === 0)) {
      local_28 = 0;
    }
    else {
      local_28 = FUN_0040fb00();
    }
    local_8 = -1;
    w32(((in_ECX + 0x37c) + param_2 * 4), 0, local_28);
    if ((in_ECX === 0)) {
      local_34 = 0;
    }
    else {
      local_34 = (in_ECX + 0x48);
    }
    FUN_0040fc50(local_34, (param_2 + 0x420), DAT_ffffffe0, 1);
    FUN_0040fd40(0, (s32(((in_ECX + 0x3e8) + param_2 * 4), 0) - s32(((in_ECX + 0x10420) + param_2 * 4), 0)));
    FUN_0040fcf0(0);
    FUN_005db0d0(s32(((in_ECX + 0x10420) + param_2 * 4), 0));
    FUN_0040fd80((LAB_0040166d + ((u8((param_2 === 0)) - 1) & 0xfb9)));
    FUN_00451ac0((LAB_0040166d + ((u8((param_2 === 0)) - 1) & 0xfb9)));
  }
  pvVar3 = operator_new(0x40);
  local_8 = 1;
  if ((pvVar3 === 0)) {
    local_30 = 0;
  }
  else {
    local_30 = FUN_00451930();
  }
  local_8 = -1;
  w32(((in_ECX + 0x384) + param_2 * 4), 0, local_30);
  if ((in_ECX === 0)) {
    local_38 = 0;
  }
  else {
    local_38 = (in_ECX + 0x48);
  }
  FUN_004519b0(local_38, (param_2 + 0x422), ((param_2 * 0x10 + in_ECX) + 0x3c0));
  FUN_00451a60(LAB_00402234);
  in_ECX = (in_ECX + 0x384);
  FUN_0058878e(param_2);
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_00587e05 (param_1)

 {
  FUN_0058804f(0, param_1);
  return;
}


 export function FUN_00587e23 (param_1)

 {
  FUN_0058804f(1, param_1);
  return;
}


 export function FUN_00587e41 ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  FUN_0040f380();
  FUN_0043c5f0();
  _MEM[(local_8 + 0x3be)] = 1;
  FUN_0046b14d(0xa5, s32((DAT_006ad30c + s32((DAT_006ad558 + s32((local_8 + 0x118), 0) * 4), 0) * 0x54), 0), DAT_006d1da0, s8(_MEM[(local_8 + 0x3be)]), 0, 0, 0, 0, 0, 0);
  FUN_0058878e(0);
  return;
}


 export function FUN_00587f00 ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  FUN_0040f380();
  FUN_0043c5f0();
  _MEM[(local_8 + 0x3be)] = 0;
  FUN_0046b14d(0xa6, s32((DAT_006ad30c + s32((DAT_006ad558 + s32((local_8 + 0x118), 0) * 4), 0) * 0x54), 0), DAT_006d1da0, s8(_MEM[(local_8 + 0x3be)]), 0, 0, 0, 0, 0, 0);
  FUN_0058878e(0);
  return;
}


 export function FUN_00587fbf ()

 {
  let uVar1;

  FUN_005c62ee();
  FUN_004518d0();
  uVar1 = FUN_00493c7d(DAT_006d1da0);
  FUN_0040ff60(0, uVar1);
  FUN_00511880(0x65, s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_0067a8c0 * 4), 0) * 0x54), 0), 1, 0, DAT_006d1da0, 0);
  return;
}


 export function FUN_0058804f (param_1, param_2)

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  w32(((local_8 + 0x10410) + param_1 * 4), 0, param_2);
  FUN_0058878e(param_1);
  return;
}


 export function FUN_005880b0 (param_1)

 {
  let puVar1;
  let iVar2;
  let iVar3;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  local_c = (param_1 + -0x422);
  FUN_00451890(DAT_fffffff0, DAT_ffffffec);
  if ((iVar2 < s32(((local_8 + 0x3e8) + local_c * 4), 0))) iVar2 = FUN_0058832d(local_10, local_14, local_c) 0 = (0 < iVar2) iVar2 = (iVar2 < s32(((local_8 + 0x3e8) + local_c * 4), 0)) {
    iVar3 = FUN_005dba95();
    if ((iVar3 === 0)) {
      iVar3 = FUN_005dbab8();
      if ((iVar3 === 0)) {
        (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)) (local_18 = 0; local_18 = (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0));
            local_18 = (local_18 + 1)) {
          if ((local_18 !== iVar2)) {
            w32((((local_c * 0x2004 + local_18 * 4) + 0x8400) + local_8), 0, 0);
          }
        }
        w32(((local_8 + 0x10418) + local_c * 4), 0, iVar2);
        puVar1 = (((local_c * 0x2004 + iVar2 * 4) + 0x8400) + local_8);
        w32(puVar1, 0, (s32(puVar1, 0) ^ 1));
      }
      else {
        w32(((local_8 + 0x10418) + local_c * 4), 0, iVar2);
        puVar1 = (((local_c * 0x2004 + iVar2 * 4) + 0x8400) + local_8);
        w32(puVar1, 0, (s32(puVar1, 0) ^ 1));
      }
    }
    else {
      (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)) (local_18 = 0; local_18 = (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)); local_18 = (local_18 + 1))
      {
        w32((((local_c * 0x2004 + local_18 * 4) + 0x8400) + local_8), 0, 0);
      }
      if ((s32(((local_8 + 0x10418) + local_c * 4), 0) < iVar2)) {
        local_18 = s32(((local_8 + 0x10418) + local_c * 4), 0);
        local_1c = iVar2;
      }
      else {
        local_1c = s32(((local_8 + 0x10418) + local_c * 4), 0);
        local_18 = iVar2;
      }
      (local_18 <= local_1c) (; local_18 = (local_18 <= local_1c); local_18 = (local_18 + 1)) {
        if ((0 < local_18)) {
          w32((((local_c * 0x2004 + local_18 * 4) + 0x8400) + local_8), 0, 1);
        }
      }
    }
    FUN_0058878e(local_c);
  }
  return;
}


 export function FUN_0058832d (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((param_2 < s32(((param_3 * 0x10 + 0x3c4) + local_8), 0))) {
    iVar1 = -1;
  }
  else if ((param_2 < s32(((param_3 * 0x10 + 0x3cc) + local_8), 0))) {
    if ((param_1 < s32(((param_3 * 0x10 + 0x3c0) + local_8), 0))) {
      iVar1 = -3;
    }
    else if ((param_1 < s32(((param_3 * 0x10 + 0x3c8) + local_8), 0))) {
      iVar1 = s32(((param_3 * 0x10 + 0x3c4) + local_8), 0);
      iVar2 = FUN_00407fc0(((param_3 * 0x10 + local_8) + 0x3c0));
      iVar1 = (((param_2 - iVar1) / (iVar2 / s32(((local_8 + 0x10420) + param_3 * 4), 0) | 0) | 0) + s32(((local_8 + 0x10410) + param_3 * 4), 0));
    }
    else {
      iVar1 = -4;
    }
  }
  else {
    iVar1 = -2;
  }
  return iVar1;
}


 export function FUN_0058843f (param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  let local_14;
  let local_10;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((1 < s32(((local_8 + 0x3e8) + param_3 * 4), 0))) {
    (local_10 < param_2) (local_10 = param_1; local_14 = local_10, local_10 = (local_10 < param_2); local_10 = (local_10 + 1)) {
      while ((local_14 <= param_2)) local_14 = (local_14 + 1) local_14 = (local_14 <= param_2) {
        iVar2 = FUN_0043d20a(s32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0), 1);
        if ((0 < iVar2)) iVar2 = FUN_0043d20a(s32((((local_10 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0), 1) iVar2 = (iVar2 === 0) iVar2 = _strcmp((DAT_0064f360 + s32((((local_10 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0) * 0x58), (DAT_0064f360 + s32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0) * 0x58)) 0 = (0 < iVar2) {
          uVar1 = s32((((local_10 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0);
          w32((((local_10 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0));
          w32((((local_14 * 4 + param_3 * 0x2004) + 0x3f0) + local_8), 0, uVar1);
          uVar1 = s32((((local_10 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0);
          w32((((local_10 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0));
          w32((((local_14 * 4 + param_3 * 0x2004) + 0x8400) + local_8), 0, uVar1);
          uVar1 = s32((((local_10 * 4 + param_3 * 0x2004) + 0xc408) + local_8), 0);
          w32((((local_10 * 4 + param_3 * 0x2004) + 0xc408) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0xc408) + local_8), 0));
          w32((((local_14 * 4 + param_3 * 0x2004) + 0xc408) + local_8), 0, uVar1);
          uVar1 = s32((((local_10 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0);
          w32((((local_10 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0, s32((((local_14 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0));
          w32((((local_14 * 4 + param_3 * 0x2004) + 0x43f8) + local_8), 0, uVar1);
        }
      }
    }
  }
  return;
}


 export function FUN_0058878e (param_1)

 {
  let xLeft;
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let local_64;
  let local_58;
  let local_54;
  let local_44;
  let local_3c;
  let local_38;
  let local_30;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  local_38 = FUN_005c62ee();
  if ((local_38 === 0)) {
    local_38 = 0;
  }
  else {
    local_38 = (local_38 + -72);
  }
  FUN_005c00ce(DAT_ffffffe8);
  FUN_005c0073(((param_1 * 0x10 + local_38) + 0x3c0));
 LAB_005887e1: :
  FUN_005c0333(((param_1 * 0x10 + local_38) + 0x3c0), DAT_00635a18);
  if ((s32((local_38 + 0x154), 0) === 0)) {
    local_8 = DAT_0067a7a0;
  }
  else {
    local_8 = DAT_0067a798;
  }
  xLeft = s32(((param_1 * 0x10 + 0x3c0) + local_38), 0);
  iVar1 = FUN_00407f90(((param_1 * 0x10 + local_38) + 0x3c0));
  local_20 = FUN_00407fc0(((param_1 * 0x10 + local_38) + 0x3c0));
  local_20 = (local_20 / s32(((local_38 + 0x10420) + param_1 * 4), 0) | 0);
  iVar2 = (local_20 / 2 | 0);
  iVar3 = FUN_0040ef70();
  iVar2 = (iVar2 - (iVar3 / 2 | 0));
  w32(((local_38 + 0x1e4) + param_1 * 4), 0, 0);
  (local_54 < s32(((local_38 + 0x3e8) + param_1 * 4), 0)) (local_54 = 0; local_54 = (local_54 < s32(((local_38 + 0x3e8) + param_1 * 4), 0)); local_54 = (local_54 + 1)) {
    if ((s32((((param_1 * 0x2004 + local_54 * 4) + 0x8400) + local_38), 0) !== 0)) {
      w32(((local_38 + 0x1e4) + param_1 * 4), 0, 1);
      break;
    }
  }
  local_54 = 0;
  do {
    if ((s32(((local_38 + 0x10420) + param_1 * 4), 0) <= local_54)) {
 LAB_00588e17: :
      FUN_005c0073(DAT_ffffffe8);
      FUN_0052e971();
      FUN_0040f380();
      return;
    }
    iVar3 = (s32(((param_1 * 0x10 + 0x3c4) + local_38), 0) + local_54 * local_20);
    FUN_006e7d90(DAT_ffffffd0, xLeft, iVar3, (iVar1 + xLeft), (iVar3 + local_20));
    if ((s32(((local_38 + 0x10410) + param_1 * 4), 0) === -1)) local_38 = (local_38 + 0x10410) goto LAB_00588e17; {
      iVar6 = s32((((param_1 * 0x2004 + (s32(((local_38 + 0x10410) + param_1 * 4), 0) + local_54) * 4) + 0x8400) + local_38), 0);
      if ((iVar6 === 0)) {
        if (((s32(((local_38 + 0x10410) + param_1 * 4), 0) + local_54) === 0)) {
          local_3c = u8(DAT_00635a00);
          local_44 = DAT_00635a2c;
        }
        else {
          local_3c = DAT_00635a1c;
          local_44 = DAT_00635a20;
        }
      }
      else {
        local_3c = DAT_00635a28;
        local_44 = DAT_00635a2c;
      }
      local_58 = 0;
      if ((local_58 === -1)) local_58 = FUN_0052ed95(s32((((param_1 * 0x2004 + (s32(((local_38 + 0x10410) + param_1 * 4), 0) + local_54) * 4) + 0x43f8) + local_38), 0)) local_58 = (local_58 === -1) break; iVar4 = ((((-u8((s32((local_38 + 0x154), 0) === 0))) & -30) + 0x5a) + DAT_0062d858) local_30 = (UNNAMED + (iVar4 + -3)) {
        local_64 = DAT_00635a18;
      }
      else {
        local_64 = DAT_00635a24;
      }
      FUN_005c0333(DAT_ffffffd0, local_64);
      if ((param_1 === 0)) {
        if ((_MEM[(local_38 + 0x3be)] === 0)) {
          local_1c = 3;
        }
        else {
          local_1c = 0;
        }
      }
      else if ((_MEM[(local_38 + 0x3bf)] === 0)) {
        local_1c = 3;
      }
      else {
        local_1c = 0;
      }
      if ((DAT_0067a994 === 0xa)) {
        local_1c = 0;
      }
      if ((s32(((local_38 + 0x10410) + param_1 * 4), 0) === -1)) {
        FUN_0040bbb0();
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xb78), 0));
        FUN_0040bbe0(uVar5);
        w32(((local_38 + 0x1e4) + param_1 * 4), 0, 0);
      }
      else {
        uVar5 = FUN_0040ef70(local_1c);
        FUN_00588e47(local_58, (s32(((local_38 + 0x10410) + param_1 * 4), 0) + local_54), (xLeft + 2), iVar3, uVar5);
        FUN_0040bbb0();
        FUN_0040bbe0((DAT_0064f360 + local_58 * 0x58));
        FUN_0040fe10();
        iVar6 = FUN_0043d20a(local_58, 1);
        if ((local_1c === 0)) local_1c = (local_1c === 0) {
          FUN_0040fea0();
          FUN_0040ff30(s32((((param_1 * 0x2004 + (s32(((local_38 + 0x10410) + param_1 * 4), 0) + local_54) * 4) + 0xc408) + local_38), 0));
          FUN_0040fe10();
          if ((s32((((param_1 * 0x2004 + (s32(((local_38 + 0x10410) + param_1 * 4), 0) + local_54) * 4) + 0xc408) + local_38), 0) < 2)) {
            uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xb70), 0));
            FUN_0040bbe0(uVar5);
          }
          else {
            uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xb6c), 0));
            FUN_0040bbe0(uVar5);
          }
        }
        else {
          iVar6 = FUN_0043d20a(local_58, 1);
          if ((iVar6 !== 0)) {
            uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xb74), 0));
            FUN_0040bbe0(uVar5);
          }
        }
      }
      if ((local_44 !== local_3c)) {
        FUN_005c19ad(local_44);
        FUN_005c0f57(local_8, DAT_00679640, ((xLeft + iVar4) + 2), ((iVar3 + iVar2) + 1), 5);
        FUN_005c19ad(local_3c);
        FUN_005c0f57(local_8, DAT_00679640, ((xLeft + iVar4) + 1), (iVar3 + iVar2), 5);
      }
      FUN_005c19ad(local_3c);
      FUN_005c0f57(local_8, DAT_00679640, (xLeft + iVar4), (iVar3 + iVar2), 5);
    }
    local_54 = (local_54 + 1);
  } ( true );
  FUN_00588f36(param_1, 1);
  if ((s32(((local_38 + 0x3e8) + param_1 * 4), 0) === 0)) {
    w32(((local_38 + 0x10410) + param_1 * 4), 0, -1);
  }
  else if ((s32(((local_38 + 0x3e8) + param_1 * 4), 0) < s32(((local_38 + 0x3e8) + param_1 * 4), 0))) {
    w32(((local_38 + 0x10410) + param_1 * 4), 0, (s32(((local_38 + 0x3e8) + param_1 * 4), 0) + -1));
  }
  goto LAB_005887e1;
}


 export function FUN_00588e47 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let local_20;
  let local_18;
  let local_10;
  let local_c;

  local_c = FUN_005c62ee();
  if ((local_c === 0)) {
    local_c = 0;
  }
  else {
    local_c = (local_c + -72);
  }
  if ((s32((local_c + 0x154), 0) === 0)) {
    local_20 = -4;
  }
  else {
    local_20 = -2;
  }
  local_18 = param_3;
  if ((s32((local_c + 0x154), 0) === 0)) {
    local_10 = 0x18;
  }
  else {
    local_10 = 0x24;
  }
  if (((param_2 & 1) !== 0)) {
    local_18 = (param_3 + (local_10 + 2));
  }
  iVar1 = FUN_00472cf0(0x30, local_20);
  FUN_0056d289(DAT_0067a7a8, param_1, param_6, local_18, (param_4 - ((iVar1 - param_5) / 2 | 0)), local_20);
  return;
}


 export function FUN_00588f36 (in_ECX, param_1, param_2)

 {
  let piVar1;
  // in_ECX promoted to parameter;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((param_2 !== 0)) {
    local_c = operator_new((s32(((local_8 + 0x3e8) + param_1 * 4), 0) << 2));
    if ((local_c === 0)) {
      param_2 = 0;
    }
    else {
      local_14 = s32(((local_8 + 0x3e8) + param_1 * 4), 0);
      (local_18 < local_14) (local_18 = 0; local_18 = (local_18 < local_14); local_18 = (local_18 + 1)) {
        if ((s32((((param_1 * 0x2004 + local_18 * 4) + 0x8400) + local_8), 0) === 0)) {
          w32((local_c + local_18 * 4), 0, -1);
        }
        else {
          w32((local_c + local_18 * 4), 0, s32((((param_1 * 0x2004 + local_18 * 4) + 0x43f8) + local_8), 0));
        }
      }
    }
  }
  w32(((local_8 + 0x3e8) + param_1 * 4), 0, 0);
  local_18 = 0;
  do {
    if ((((DAT_00655b18) << 16 >> 16) <= local_18)) {
      if ((param_2 !== 0)) {
        operator_delete(local_c);
      }
      FUN_0058843f(0, (s32(((local_8 + 0x3e8) + param_1 * 4), 0) + -1), param_1);
      return;
    }
    if ((s8(DAT_0064f348[local_18 * 0x58]) === (DAT_006d1da0 & 0xff))) DAT_006acb58 = DAT_006acb58 DAT_0064f348 = DAT_0064f348 DAT_006acb58 = DAT_006acb58 DAT_0064f348 = DAT_0064f348 1 = (1 << (((DAT_006d1da0) & 0xFF) & 0x1f)) DAT_0064f348 = DAT_0064f348 {
      w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0x3f0) + local_8), 0, local_18);
      w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0x43f8) + local_8), 0, s32((DAT_0064f394 + local_18 * 0x58), 0));
      if ((param_2 === 0)) {
        w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0x8400) + local_8), 0, 0);
      }
      else {
        w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0x8400) + local_8), 0, 0);
        (local_10 < local_14) (local_10 = 0; local_10 = (local_10 < local_14); local_10 = (local_10 + 1)) {
          if ((s32((DAT_0064f394 + local_18 * 0x58), 0) === s32((local_c + local_10 * 4), 0))) {
            w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0x8400) + local_8), 0, 1);
            break;
          }
        }
      }
      w32((((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0xc408) + local_8), 0, 0);
      (local_10 < ((DAT_00655b16) << 16 >> 16)) (local_10 = 0; local_10 = (local_10 < ((DAT_00655b16) << 16 >> 16)); local_10 = (local_10 + 1)) {
        if ((s16((DAT_0064f342 + local_18 * 0x58), 0) === s16((DAT_006560f2 + local_10 * 0x20), 0))) DAT_0064f340 = DAT_0064f340 DAT_0064f342 = DAT_0064f342 {
          piVar1 = (((param_1 * 0x2004 + s32(((local_8 + 0x3e8) + param_1 * 4), 0) * 4) + 0xc408) + local_8);
          w32(piVar1, 0, (s32(piVar1, 0) + 1));
        }
      }
      piVar1 = ((local_8 + 0x3e8) + param_1 * 4);
      w32(piVar1, 0, (s32(piVar1, 0) + 1));
    }
    local_18 = (local_18 + 1);
  } ( true );
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Multiple */ /* Matches */ /* With */ /* Different */ /* Base */ /* Names */
    /* _$E26 */
    /* _$E31 */
    /* _$E353 */
    /* _$E354 */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function FID_conflict:_$E31 ()

 {
  FUN_00589a0a();
  FUN_00589a24();
  return;
}


 export function FUN_00589a0a ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00589a24 ()

 {
  _atexit(FUN_00589a41);
  return;
}


 export function FUN_00589a41 ()

 {
  FUN_005bd915();
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_00589a5b ()

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_708;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00589c60;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  FUN_0040bbb0();
  FUN_0040bc10(2);
  FUN_006e7b38(s_Civilization_Gold_00634734, s_Window_Name_00634728, DAT_00679640, s_CIV.INI_00634720);
  FUN_005c5f20(DAT_00679640, 0x7c, 0, 0, 0x258, 0x190, DAT_006a8c00);
  iVar1 = FUN_00564470(s_civ2\civ2.exe_00634748);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00589c54();
    FUN_00589c6a();
    return;
  }
  iVar1 = FUN_00414d10(0x10000, 8);
  FUN_005d48f0(s32((iVar1 + 4), 0));
  FUN_004e3a86();
  FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffffbbc);
  FUN_00419be0(DAT_006acb68);
  FUN_00419ba0(0x9e);
  FUN_00408050(1);
  DAT_006acbb0 = FUN_00589d50();
  _DAT_006acbb4 = FUN_0043c5c0();
  FUN_00426f80();
  FUN_005c6b63(DAT_fffff8f8, 0xa, 0xec);
  FUN_0046da40();
  FUN_005c6da8(0xa, 0xec, DAT_fffff8f8);
  FUN_005c6480(0xa, 0xec);
  FUN_00408230(LAB_00402446);
  DAT_006553e8 = DAT_006553e8;
  tie(thunk_FUN_00411f91);
  FUN_00419ba0(0x9e);
  FUN_00419b80();
  DAT_00634718 = 1;
  local_8 = -1;
  FUN_00589c54();
  FUN_00589c6a();
  return;
}


 export function FUN_00589c54 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00589c6a (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00589c79 ()

 {
  FUN_00408420();
  DAT_00634718 = 0;
  return;
}


 export function FUN_00589d50 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bc9d3(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_00589d80 (param_1)

 {
  let iVar1;
  let local_8;

  iVar1 = DAT_00634768;
  local_8 = -1;
  if ((DAT_00634768 < 0xa)) {
    local_8 = DAT_00634768;
    DAT_00634768 = (DAT_00634768 + 1);
    w32((DAT_006acbd0 + iVar1 * 4), 0, param_1);
  }
  return local_8;
}


 export function FUN_00589dc5 (param_1)

 {
  let _File;
  let pcVar1;
  let sVar2;
  let iVar3;
  let local_5c;
  let local_58;
  let local_8;

  _File = FUN_0041508c(param_1, DAT_0063481c);
  if ((_File !== 0)) {
    local_8 = 1;
    while ((pcVar1 !== 0)) local_8 = (local_8 !== 0) _File = DAT_0000000c pcVar1 = _fgets(DAT_ffffffa8, 0x4f, _File) pcVar1 = (pcVar1 !== 0) {
      (local_5c < sVar2) (local_5c = 0; sVar2 = _strlen(DAT_ffffffa8), local_5c = (local_5c < sVar2); local_5c = (local_5c + 1))
      {
        if ((DAT_ffffffa8[local_5c] < 0x20)) {
          DAT_ffffffa8[local_5c] = 0;
        }
      }
      iVar3 = _strncmp(DAT_ffffffa8, DAT_00634820, 3);
      if ((iVar3 === 0)) {
        local_8 = 0;
      }
      else {
        _sprintf(DAT_006acbf8, DAT_00634824, DAT_ffffffa8);
        FUN_006e7af4(DAT_006acbf8);
      }
    }
  }
  if ((_File !== 0)) {
    _fclose(_File);
  }
  return;
}


 export function FUN_00589ef8 (param_1, param_2, param_3, param_4, param_5)

 {
  let local_bc;
  let local_b0;
  let local_60;
  let local_10;

  if ((param_3 !== 0)) {
    FUN_005f22d0(DAT_00634770, param_3);
  }
  __itoa(param_1, DAT_ffffff50, 0xa);
  __itoa(param_2, DAT_ffffffa0, 0xa);
  __ltoa(param_4, DAT_fffffff0, 0xa);
  __ltoa(param_5, DAT_ffffff44, 0xa);
  FUN_00589fc9(DAT_ffffff50, s_ERRORS.DB_00634828, ((~param_1) + 1));
  FUN_00589fc9(DAT_ffffffa0, s_MODULES.DB_00634834, param_2);
  FUN_0058a0ee(DAT_ffffff50, DAT_ffffffa0, DAT_fffffff0, DAT_ffffff44, param_1);
  return;
}


 export function FUN_00589fc9 (param_1, param_2, param_3)

 {
  let _File;
  let pcVar1;
  let sVar2;
  let local_5c;
  let local_58;
  let local_54;

  local_5c = 1;
  _File = FUN_0041508c(param_2, DAT_00634840);
  if ((_File !== 0)) {
    (local_58 <= param_3) (local_58 = 1; local_58 = (local_58 <= param_3); local_58 = (local_58 + 1)) {
      if ((pcVar1 === 0)) _flag pcVar1 = _fgets(DAT_ffffffac, 0x4c, _File) pcVar1 = (pcVar1 === 0) goto LAB_0058a0bc; local_58 = 0 sVar2 = _strlen(DAT_ffffffac) local_58 = (local_58 < sVar2) local_58 = (local_58 + 1) {
      if ((DAT_ffffffac[local_58] < 0x20)) {
        DAT_ffffffac[local_58] = 0;
      }
    }
    FUN_005f22d0(param_1, DAT_ffffffac);
    local_5c = 0;
  }
 LAB_0058a0bc: :
  if ((_File !== 0)) {
    _fclose(_File);
  }
  return local_5c;
}


 export function FUN_0058a0ee (param_1, param_2, param_3, param_4)

 {
  let sVar1;
  let local_108;
  let local_104;

  FUN_005f22d0(DAT_fffffefc, s_Error_"_00634844);
  FUN_005f22e0(DAT_fffffefc, param_1);
  FUN_005f22e0(DAT_fffffefc, s_"_in_module_"_0063484c);
  FUN_005f22e0(DAT_fffffefc, param_2);
  FUN_005f22e0(DAT_fffffefc, s_"_data:_0063485c);
  FUN_005f22e0(DAT_fffffefc, param_3);
  FUN_005f22e0(DAT_fffffefc, DAT_00634868);
  FUN_005f22e0(DAT_fffffefc, param_4);
  _sprintf(DAT_006acbf8, DAT_0063486c, DAT_fffffefc);
  FUN_006e7af4(DAT_006acbf8);
  FUN_005d225b(DAT_006acbf8);
  sVar1 = _strlen(DAT_00634770);
  if ((sVar1 !== 0)) {
    _sprintf(DAT_006acbf8, s_'%s'_00634870, DAT_00634770);
    FUN_006e7af4(DAT_006acbf8);
    FUN_005d225b(DAT_006acbf8);
  }
  if ((DAT_00634814 !== 0)) {
    __ltoa(DAT_00634818, param_3, 0xa);
    FUN_005f22d0(DAT_fffffefc, s_Tried_to_allocate_00634878);
    FUN_005f22e0(DAT_fffffefc, param_3);
    FUN_005f22e0(DAT_fffffefc, s_bytes._0063488c);
    _sprintf(DAT_006acbf8, DAT_00634894, DAT_fffffefc);
    FUN_006e7af4(DAT_006acbf8);
    FUN_005d225b(DAT_006acbf8);
  }
  _sprintf(DAT_006acbf8, DAT_00634898);
  FUN_006e7af4(DAT_006acbf8);
  FUN_005d225b(DAT_006acbf8);
  if ((DAT_00634810 !== 0)) {
    _sprintf(DAT_006acbf8, s_File_open_failed:_%s_0063489c, DAT_006347c0);
    FUN_006e7af4(DAT_006acbf8);
    FUN_005d225b(DAT_006acbf8);
  }
  FUN_005f22d0(DAT_fffffefc, s_Most_recent_DOS_error:_006348b4);
  __itoa(DAT_00639f14, param_3, 0xa);
  FUN_005f22e0(DAT_fffffefc, param_3);
  _sprintf(DAT_006acbf8, DAT_006348d0, DAT_fffffefc);
  FUN_006e7af4(DAT_006acbf8);
  FUN_005d225b(DAT_006acbf8);
  _sprintf(DAT_006acbf8, DAT_006348d4);
  FUN_006e7af4(DAT_006acbf8);
  FUN_005d225b(DAT_006acbf8);
  FUN_00589dc5(s_*warn0.dat_006348d8);
  local_108 = DAT_00634768;
  while ((-1 < local_108)) local_108 = (local_108 + -1) -1 = (-1 < local_108) {
    if ((s32((DAT_006acbd0 + local_108 * 4), 0) !== 0)) {
      DAT_006acbd0 = DAT_006acbd0;
    }
  }
  FUN_006e7b18();
                    /* /*  */ /* WARNING: */ /* Subroutine */ /* does */ /* not */ /* return */ /*  */ */
  _exit(3);
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Multiple */ /* Matches */ /* With */ /* Different */ /* Base */ /* Names */
    /* _$E26 */
    /* _$E31 */
    /* _$E353 */
    /* _$E354 */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function FID_conflict:_$E31 ()

 {
  FUN_0058a5ca();
  FUN_0058a5e4();
  return;
}


 export function FUN_0058a5ca ()

 {
  FUN_0055339f();
  return;
}


 export function FUN_0058a5e4 ()

 {
  _atexit(FUN_0058a601);
  return;
}


 export function FUN_0058a601 ()

 {
  DAT_006acd58 = DAT_006acd58;
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_0058a61b (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    FUN_005f22d0(DAT_006ace8c, DAT_00634948);
  }
  else {
    FUN_005f22d0(DAT_006ace8c, param_1);
  }
  _DAT_006ad02c = DAT_006ab1a0;
  _DAT_006ad024 = DAT_006ab190;
  _DAT_006ad028 = DAT_006ab178;
  _DAT_006ace6c = param_2;
  DAT_006ace70 = param_8;
  DAT_006ace74 = param_9;
  DAT_006ace78 = param_7;
  _DAT_006acf54 = 0;
  _DAT_006ad000 = 0;
  if (((param_2 & 4) !== 0)) {
    DAT_006ace70 = DAT_00633598;
    DAT_006ace74 = DAT_0063359c;
  }
  if (((param_2 & 8) === 0)) {
    local_8 = 0x202;
  }
  else {
    local_8 = 0x802;
  }
  if ((DAT_006ace70 !== 0)) {
    local_8 = (local_8 | 0x400);
  }
  if ((param_7 !== 0)) {
    local_8 = (local_8 | 0x1000);
  }
  if (((param_2 & 2) === 0)) {
    param_5 = (param_5 + DAT_006ace74 * 2);
    param_6 = (param_6 + (DAT_006ace70 + DAT_006ace74));
  }
  if (((param_2 & 1) !== 0)) {
    param_3 = ((DAT_006ab198 >> 1) - (param_5 >> 1));
    param_4 = ((DAT_006ab19c >> 1) - (param_6 >> 1));
  }
  if ((DAT_006a4f88 === 0)) {
    local_c = 0;
  }
  else {
    local_c = (DAT_006a4f88 + 0x48);
  }
  FUN_005bb4ae(0, local_8, param_3, param_4, param_5, param_6, DAT_006a8c00, local_c);
  if ((DAT_006ace70 !== 0)) {
    FUN_00497d00(DAT_006ace70);
  }
  if ((DAT_006ace78 !== 0)) {
    FUN_004cff70(DAT_006ace78);
  }
  FUN_00552ed2();
  return;
}


 export function FUN_0058a80d (param_1, param_2)

 {
  let iVar1;
  let local_410;
  let local_10;
  let local_c;
  let local_8;

  iVar1 = _strcmp(param_1, param_2);
  if ((iVar1 !== 0)) {
    local_10 = _fopen(param_1, DAT_0063494c);
    if ((local_8 === 0)) local_8 = _fopen(param_2, DAT_00634950) local_8 = (local_8 === 0) {
      FUN_006e7dd4(0, s_Error_copying_file_00634954, 0, 0x10);
      if ((local_10 !== 0)) {
        _fclose(local_10);
      }
    }
    else {
      while ((local_c !== 0)) local_c = _fread(DAT_fffffbf0, 1, 0x400, local_10) local_c = (local_c !== 0) {
        _fwrite(DAT_fffffbf0, 1, local_c, local_8);
      }
      _fclose(local_10);
      _fclose(local_8);
    }
  }
  return;
}


 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x0058a97f) */ /*  */ */
 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x0058a9fb) */ /*  */ */

 export function FUN_0058a905 (param_1)

 {
  let uVar1;
  let iVar2;
  let DVar3;
  let unaff_FS_OFFSET;
  let local_508;
  let local_408;
  let local_308;
  let local_22c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0058abd6;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((s32((DAT_006aca14 + param_1 * 4), 0) < 0)) {
    local_8 = -1;
    FUN_0058abca();
    FUN_0058abe0();
    return;
  }
  FUN_0059d3c9(DAT_006acda0);
  do {
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x888), 0), 0, 0, 0);
    _sprintf(DAT_fffffbf8, s_%s_(*.WAV)%c*.WAV%c%c_00634968, uVar1);
    FUN_005f22d0(DAT_fffffaf8, s_*.WAV_00634980);
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x88c), 0), DAT_fffffaf8, DAT_fffffbf8, DAT_00634988, 1, 0);
    iVar2 = FUN_004731d2(DAT_006acda0, uVar1);
    if ((iVar2 === 0)) {
      local_8 = -1;
      FUN_0058abca();
      FUN_0058abe0();
      return;
    }
    local_308 = DAT_fffffcf8;
    do {
      local_22c = 0;
      local_14 = FUN_0040bc80(0);
      if ((local_22c !== 0)) {
        FUN_005d6038(DAT_fffffaf8, 0, 0, 0);
      }
    } while ((local_22c !== 0)) FUN_0059db65() FUN_0059d5f5() FUN_005f22d0(DAT_fffffbf8, DAT_0064bb08) FUN_005f22e0(DAT_fffffbf8, s_\SOUND_006349a0) DVar3 = FUN_006e7b04(DAT_fffffbf8) {
    FUN_005f22e0(DAT_fffffbf8, DAT_006349a8);
    FUN_005f22e0(DAT_fffffbf8, (s_AIRCOMBT_0062af70 + s32((DAT_006aca14 + param_1 * 4), 0) * 9));
    FUN_005f22e0(DAT_fffffbf8, DAT_006349ac);
    iVar2 = FUN_00415133(DAT_fffffbf8);
    if ((iVar2 === 0)) iVar2 = FID_conflict:_remove(DAT_fffffbf8) iVar2 = (iVar2 === 0) {
      FUN_0058a80d(DAT_fffffaf8, DAT_fffffbf8);
    }
    local_8 = -1;
    FUN_0058abca();
    FUN_0058abe0();
    return;
  }
  local_8 = -1;
  FUN_0058abca();
  FUN_0058abe0();
  return;
}


 export function FUN_0058abca ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0058abe0 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0058abee ()

 {
  DAT_006acd50 = 0;
  DAT_006acda0 = DAT_006acda0;
  return;
}


 export function FUN_0058ac13 ()

 {
  DAT_006acd50 = 0;
  DAT_006acda0 = DAT_006acda0;
  return;
}


 export function FUN_0058ac38 ()

 {
  let extraout_EAX;
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let local_28;
  let local_14;

  FUN_00552112();
  FUN_0040fdb0(DAT_006acd58, DAT_006ad014, 0x1d);
  FUN_005baeb0(DAT_006acd58);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0xa, 0xa, 0, 0);
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  iVar1 = (extraout_EAX + 8);
  iVar2 = (DAT_006ace84 + ((DAT_006ace84 >> 0x1f) & 3));
  iVar3 = (iVar2 >> 2);
  (local_28 < 6) (local_28 = 0; local_28 = (local_28 < 6); local_28 = (local_28 + 1)) {
    iVar4 = (((iVar1 * 3 / 2 | 0) + (local_28 / 3 | 0) * iVar1 * 4) + DAT_006ace80);
    iVar5 = (local_28 % 3) * iVar3 * 5;
    iVar5 = ((((iVar5 + ((iVar5 >> 0x1f) & 3)) >> 2) + ((iVar3 + ((iVar2 >> 0x1f) & 3)) >> 2)) + DAT_006ace7c);
    FUN_004086c0(DAT_ffffffec, iVar5, iVar4, iVar3, iVar1);
    FUN_005a99fc(DAT_006acd58, DAT_ffffffec, 0xa, 0xa);
    if ((-1 < s32((DAT_006acd38 + local_28 * 4), 0))) {
      FUN_0040bbb0();
      FUN_00414d70((s_AIRCOMBT_0062af70 + s32((DAT_006acd38 + local_28 * 4), 0) * 9));
      FUN_00414d70(DAT_006349b4);
      FUN_005bb024(DAT_006acd58, DAT_00679640, (iVar5 + (iVar3 / 2 | 0)), (iVar4 + 4), 0);
    }
  }
  FUN_0040bbb0();
  FUN_0040bc10(0x25b);
  FUN_005bb024(DAT_006acd58, DAT_00679640, (DAT_006ace7c + (DAT_006ace84 / 2 | 0)), (DAT_006ace80 + 0xa), 0);
  FUN_00408460();
  return;
}


 export function FUN_0058ae20 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;

  if ((param_6 < param_2)) param_5 = (param_5 < param_1) param_2 = (param_2 < param_4) param_6 = (param_6 < param_2) {
    uVar1 = 0;
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_0058ae6c (param_1, param_2)

 {
  let extraout_EAX;
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let local_2c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  param_2 = (param_2 - DAT_006ace80);
  param_1 = (param_1 - DAT_006ace7c);
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  iVar1 = (extraout_EAX + 8);
  iVar2 = (DAT_006ace84 + ((DAT_006ace84 >> 0x1f) & 3));
  iVar3 = (iVar2 >> 2);
  local_2c = 0;
  while ((iVar4 !== 0)) {
    if ((5 < local_2c)) {
      return;
    }
    iVar4 = (local_2c % 3) * iVar3 * 5;
    FUN_004086c0(DAT_ffffffe8, (((iVar4 + ((iVar4 >> 0x1f) & 3)) >> 2) + ((iVar3 + ((iVar2 >> 0x1f) & 3)) >> 2)), ((iVar1 * 3 / 2 | 0) + (local_2c / 3 | 0) * iVar1 * 4), iVar3, iVar1);
    if ((iVar4 !== 0)) iVar4 = FUN_0058ae20(param_1, param_2, local_18, local_14, local_10, local_c) iVar4 = (iVar4 !== 0) break; local_2c = (local_2c + 1) local_8 = DAT_00655aea DAT_00655aea = (DAT_00655aea | 0x10) FUN_0046e020(s32((DAT_006acd38 + local_2c * 4), 0), 0, 0, 0) DAT_00655aea = local_8 return


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_0058afb6 (param_1)

 {
  let local_10;
  let local_8;

  local_10 = -1;
  (local_8 < 6) (local_8 = 0; local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
    w32((DAT_006acd38 + local_8 * 4), 0, -1);
  }
  if ((s32((DAT_006a2d48 + param_1 * 0x58), 0) !== 0)) {
    if ((param_1 === 0x36)) {
      _DAT_006acd38 = 0x7d;
    }
    else if ((param_1 === 0x37)) {
      _DAT_006acd38 = 0x7e;
    }
    else if ((param_1 === 0x38)) {
      _DAT_006acd38 = 0x7f;
    }
    else if ((param_1 === 0x39)) {
      _DAT_006acd38 = 0x80;
    }
    else if ((param_1 === 0x3a)) {
      _DAT_006acd38 = 0x81;
    }
    else if ((param_1 === 0x3b)) {
      _DAT_006acd38 = 0x82;
    }
    else if ((param_1 === 0x3c)) {
      _DAT_006acd38 = 0x83;
    }
    else if ((param_1 === 0x3d)) {
      _DAT_006acd38 = 0x84;
    }
    else if ((param_1 === 0x33)) {
      _DAT_006acd38 = 0x65;
    }
    else if ((param_1 === 0x34)) {
      _DAT_006acd38 = 0x66;
    }
    else if ((param_1 === 0x35)) {
      _DAT_006acd38 = 0x67;
    }
    else if (((DAT_006a2d59[param_1 * 0x58] & 0x10) === 0)) {
      if ((s32((DAT_006a2d34 + param_1 * 0x58), 0) === 1)) {
        if ((s32((DAT_006a2d44 + param_1 * 0x58), 0) === 0)) {
          _DAT_006acd38 = 0x21;
          if ((param_1 < 0x1e)) {
            _DAT_006acd48 = 0x17;
          }
          else {
            _DAT_006acd48 = 0x4f;
          }
        }
        else if ((param_1 < 0x1e)) {
          _DAT_006acd38 = 0;
          _DAT_006acd44 = 0x18;
          _DAT_006acd48 = 0x17;
          _DAT_006acd4c = 0x1a;
        }
        else {
          _DAT_006acd38 = 0x52;
          _DAT_006acd44 = 0x50;
          _DAT_006acd48 = 0x4f;
          _DAT_006acd4c = 0x4e;
        }
      }
      else if ((s32((DAT_006a2d34 + param_1 * 0x58), 0) === 2)) {
        if (((DAT_006a2d58[param_1 * 0x58] & 8) === 0)) {
          local_10 = 6;
          if ((param_1 === 0x25)) param_1 = (param_1 === 0x26) param_1 = (param_1 === 0x27) param_1 = (param_1 === 0x25) {
            local_10 = 0x2e;
          }
        }
        else {
          _DAT_006acd38 = 0x4d;
        }
      }
      else if ((param_1 === 0x11)) {
        _DAT_006acd38 = 0x19;
      }
      else if ((param_1 === 0x12)) param_1 = (param_1 === 0x10) param_1 = (param_1 === 0x13) param_1 = (param_1 === 0x12) {
        _DAT_006acd38 = 0x4a;
      }
      else if ((param_1 === 0x15)) param_1 = (param_1 === 0x15) {
        _DAT_006acd38 = 0xc;
      }
      else if ((param_1 === 9)) param_1 = (param_1 === 0xb) param_1 = (param_1 === 0xa) param_1 = (param_1 === 9) {
        _DAT_006acd38 = 0x22;
      }
      else if ((param_1 === 0xe)) param_1 = (param_1 === 0xd) param_1 = (param_1 === 0xc) param_1 = (param_1 === 0xe) {
        _DAT_006acd38 = 0x26;
      }
      else if ((0x1a < param_1)) 0x1a = (0x1a < param_1) {
        _DAT_006acd38 = 0x49;
      }
      else if ((param_1 === 0x17)) {
        _DAT_006acd38 = 0xa;
      }
      else {
        local_10 = 0x28;
        if ((0x17 < param_1)) {
          _DAT_006acd38 = 0x1c;
        }
      }
    }
    else if ((s32((DAT_006a2d48 + param_1 * 0x58), 0) < 0x63)) {
      _DAT_006acd38 = 0x29;
    }
    else {
      _DAT_006acd38 = 0x32;
    }
  }
  DAT_006acd3c = local_10;
  if ((-1 < local_10)) {
    _DAT_006acd40 = 0x23;
  }
  (local_8 < 6) (local_8 = 0; local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
    if ((s32((DAT_006acd38 + local_8 * 4), 0) < 0)) {
      FUN_00453c40();
    }
    else {
      FUN_00453c80();
    }
  }
  return;
}


 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x0058b6f2) */ /*  */ */
 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x0058b77b) */ /*  */ */
 /* /*  */ /* WARNING: */ /* Removing */ /* unreachable */ /* block */ /* (ram,0x0058b5ea) */ /*  */ */
 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_0058b47e (param_1, param_2)

 {
  let extraout_EAX;
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_214;
  let local_1d0;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0058b884;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f3e0();
  local_8 = 0;
  FUN_0040f3e0();
  local_8 = 1;
  `eh_vector_constructor_iterator'(DAT_fffffe30, 0x3c, 6, thunk_FUN_0040f3e0, thunk_FUN_0040f570);
  local_8 = ((((local_8) >> 8) << 8) | 2);
  DAT_006acd50 = 1;
  FUN_0058a61b(param_1, 0xd, 0, 0, 0x21c, 0x118, 0, 0, 0);
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  local_68 = (extraout_EAX + 8);
  local_60 = ((DAT_006ace84 + ((DAT_006ace84 >> 0x1f) & 3)) >> 2);
  (local_214 < 6) (local_214 = 0; local_214 = (local_214 < 6); local_214 = (local_214 + 1)) {
    iVar2 = (local_214 % 3) * local_60 * 5;
    local_64 = ((((iVar2 + ((iVar2 >> 0x1f) & 3)) >> 2) + ((local_60 + ((local_60 >> 0x1f) & 3)) >> 2)) + DAT_006ace7c);
    FUN_004086c0(DAT_ffffffa4, local_64, ((local_68 * 3 + (local_214 / 3 | 0) * local_68 * 4) + DAT_006ace80), local_60, local_68);
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + s32((DAT_00634930 + local_214 * 4), 0) * 4), 0));
    FUN_0040f680(DAT_006acda0, (local_214 + 0xc9), DAT_ffffffa4, uVar1);
    FUN_0040f880(LAB_00403b4d);
  }
  FUN_0058afb6(param_2, DAT_fffffe30);
  local_60 = ((DAT_006ace84 + -6) / 2 | 0);
  iVar2 = ((DAT_006ace80 + None) - (local_68 + 2));
  local_64 = (DAT_006ace7c + 2);
  FUN_004086c0(DAT_ffffffa4, local_64, iVar2, local_60, local_68);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(DAT_006acda0, 0x65, DAT_ffffffa4, uVar1);
  FUN_0040f880(LAB_004022c0);
  local_64 = (local_64 + (local_60 + 2));
  FUN_004086c0(DAT_ffffffa4, local_64, iVar2, local_60, local_68);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(DAT_006acda0, 0x66, DAT_ffffffa4, uVar1);
  FUN_0040f880(LAB_00402da1);
  FUN_0040f840();
  FUN_00414ca0(LAB_00402559);
  DAT_006acd58 = DAT_006acd58;
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006acd50 !== 0)) DAT_006acd50 = (DAT_006acd50 !== 0) {
    FUN_0040ef50();
  }
  FUN_0059d3c9(0);
  FUN_00553379();
  local_8 = 1;
  FUN_0058b859();
  local_8 = (((local_8) >> 8) << 8);
  FUN_0058b86f();
  local_8 = -1;
  FUN_0058b87b();
  FUN_0058b88e();
  return;
}


 export function FUN_0058b859 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((unaff_EBP + -0x1cc), 0x3c, 6, thunk_FUN_0040f570);
  return;
}


 export function FUN_0058b86f ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0058b87b ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0058b88e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0058bd60 ()

 {
  FUN_0059062c(((DAT_00655afe) << 16 >> 16), -1, 3);
  return;
}


 export function FUN_0058bd84 ()

 {
  let local_8;

  (local_8 < ((DAT_00655b16) << 16 >> 16)) (local_8 = 0; local_8 = (local_8 < ((DAT_00655b16) << 16 >> 16)); local_8 = (local_8 + 1)) {
    if ((s8(DAT_006560f7[local_8 * 0x20]) === DAT_006d1da0)) DAT_006560f7 = DAT_006560f7 {
      FUN_005b6787(local_8);
    }
  }
  return;
}


 export function FUN_0058bdfd ()

 {
  w16((DAT_006560f4 + ((DAT_00655afe) << 16 >> 16) * 0x20), 0, (s16((DAT_006560f4 + ((DAT_00655afe) << 16 >> 16) * 0x20), 0) | 0x4000));
  DAT_0062804c = 0;
  DAT_00628054 = 0;
  FUN_0041033a();
  FUN_00489859(0);
  return;
}


 export function FUN_0058be56 ()

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let iVar5;
  let local_118;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  DAT_0062804c = 0;
  iVar1 = ((DAT_00655afe) << 16 >> 16);
  local_10 = ((s16((DAT_006560f0 + iVar1 * 0x20), 0)) << 16 >> 16);
  local_14 = ((s16((DAT_006560f2 + iVar1 * 0x20), 0)) << 16 >> 16);
  iVar2 = s8(DAT_006560f7[iVar1 * 0x20]);
  if ((DAT_0064b1ca[u8(DAT_006560f6[iVar1 * 0x20]) * 0x14] === 5)) {
    iVar3 = FUN_005b89e4(local_10, local_14);
    if ((iVar3 === 0)) {
      iVar3 = FUN_0043cf76(local_10, local_14);
      if ((iVar3 < 0)) {
        (local_8 < 8) (local_8 = 0; local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
          uVar4 = FUN_005ae052((s8(DAT_00628350[local_8]) + local_10));
          local_c = (s8(DAT_00628360[local_8]) + local_14);
          iVar3 = FUN_004087c0(uVar4, local_c);
          if ((-1 < iVar3)) iVar3 = FUN_005b8ca6(uVar4, local_c) -1 = (-1 < iVar3) {
            uVar4 = FUN_0043cf76(uVar4, local_c);
            FUN_00414dd0(s_ADJACENTCITY_006349f8, uVar4);
            return;
          }
        }
        iVar3 = FUN_0043f8b0(local_10, local_14, iVar2);
        if ((-1 < iVar3)) {
          iVar5 = FUN_00421ed0(s_NAMECITY_00634a08, 0xf, (DAT_0064f360 + iVar3 * 0x58), DAT_fffffee8)
          ;
          if ((iVar5 === 0)) {
            FUN_004c4d1e(iVar1, iVar3, DAT_fffffee8);
            FUN_0040ff60(0, (DAT_0064f360 + iVar3 * 0x58));
            FUN_0040bbb0();
            FUN_00421f10(((DAT_00655afa) << 16 >> 16));
            FUN_0040ff60(1, DAT_00679640);
            FUN_0046e020(7, 1, 0, 0);
            FUN_004eb80a(s_FOUNDED_00634a14, iVar3, 0x4c, 1, iVar2);
            if ((s16((DAT_0064c708 + iVar2 * 0x594), 0) === 1)) DAT_0064c708 = DAT_0064c708 {
              FUN_004904c0(PTR_s_TUTORIAL_00627678, s_FIRSTPRODUCT_00634a1c, DAT_00643af8, 0);
            }
            DAT_0062edf8 = 1;
            FUN_0050dada();
            FUN_00509590(iVar3);
            FUN_0050db36();
            DAT_0062edf8 = 0;
          }
          else {
            FUN_004413d1(iVar3, 0);
            DAT_006554fd[((s16((DAT_0064c6a6 + iVar2 * 0x594), 0)) << 16 >> 16) * 0x30] = (DAT_006554fd[((s16((DAT_0064c6a6 + iVar2 * 0x594), 0)) << 16 >> 16) * 0x30] + 0xff);
          }
        }
      }
      else if ((s8(DAT_0064f349[iVar3 * 0x58]) < u8(DAT_0064bcd1))) {
        DAT_0064f349[iVar3 * 0x58] = (DAT_0064f349[iVar3 * 0x58] + 1);
        FUN_005b4391(iVar1, 1);
        FUN_0050c679(iVar3);
        FUN_0047ce1e(local_10, local_14, 1, DAT_006d1da0, 1);
      }
      else {
        FUN_004c4210(0, (((DAT_0064f349[iVar3 * 0x58] >> 7) << 8) | DAT_0064bcd1));
        FUN_00414dd0(s_ONLY10_006349f0, iVar3);
      }
    }
    else {
      FUN_00421ea0(s_CITYATSEA_006349e4);
    }
  }
  else {
    FUN_004442a0(s_ONLYSETTLERS_006349d4, 0, (((DAT_00633584 === 0) - 1) & 8));
  }
  return;
}


 export function FUN_0058c295 ()

 {
  let cVar1;
  let sVar2;
  let sVar3;
  let iVar4;
  let iVar5;
  let local_14;
  let local_c;
  let local_8;

  if ((DAT_006d1da8 === 1)) {
    local_14 = ((DAT_00655afe) << 16 >> 16);
  }
  else {
    local_8 = ((DAT_0064b1b4) << 16 >> 16);
    local_c = ((DAT_0064b1b0) << 16 >> 16);
    local_14 = FUN_005b2e69(local_8, local_c);
  }
  if ((s8(DAT_006560f7[local_14 * 0x20]) === DAT_006d1da0)) DAT_006560f7 = DAT_006560f7 {
    if ((local_14 < 0)) {
      if ((-1 < iVar4)) DAT_00655b02 = (DAT_00655b02 === 0) iVar4 = FUN_0043cf76(local_8, local_c) -1 = (-1 < iVar4) {
        cVar1 = DAT_0064f348[iVar4 * 0x58];
        FUN_00421d60(0, (DAT_0064f360 + iVar4 * 0x58));
        iVar5 = FUN_00414dd0(s_DISBAND_00634a34, iVar4);
        if ((iVar5 === 1)) {
          FUN_004413d1(iVar4, 0);
          FUN_004aa378(s8(cVar1), 0);
          FUN_0047cf9e(DAT_006d1da0, 1);
        }
      }
    }
    else if ((DAT_00655b07 !== 0)) DAT_00655b07 = (DAT_00655b07 !== 0) {
      DAT_0062804c = 0;
      FUN_004271e8(0, s32((DAT_0064b1b8 + u8(DAT_006560f6[local_14 * 0x20]) * 0x14), 0));
      iVar4 = FUN_004442e0(s_DISBAND_00634a2c, local_14);
      if ((iVar4 === 1)) {
        sVar2 = s16((DAT_006560f0 + local_14 * 0x20), 0);
        sVar3 = s16((DAT_006560f2 + local_14 * 0x20), 0);
        iVar4 = FUN_0043cf76(((sVar2) << 16 >> 16), ((sVar3) << 16 >> 16));
        if ((-1 < iVar4)) {
          w16((DAT_0064f35c + iVar4 * 0x58), 0, ((((s8(DAT_0064b1c8[u8(DAT_006560f6[local_14 * 0x20]) * 0x14]) * u8(DAT_0064bccc) / 2 | 0)) & 0xFFFF) + s16((DAT_0064f35c + iVar4 * 0x58), 0)));
          iVar5 = IsTracking(DAT_006a91b8);
          if ((iVar5 === iVar4)) {
            FUN_004e7492(iVar4);
          }
          iVar5 = IsTracking(DAT_006a91b8);
          if ((iVar5 === iVar4)) {
            FUN_00509429();
          }
        }
        FUN_005b5d93(local_14, 1);
        FUN_0047ce1e(((sVar2) << 16 >> 16), ((sVar3) << 16 >> 16), 0, DAT_006d1da0, 1);
      }
    }
  }
  return;
}


 export function FUN_0058c56c (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let pbVar4;
  let uVar5;
  let local_8;

  local_8 = 0;
  do {
    if ((4 < local_8)) {
      return 0;
    }
    uVar1 = FUN_005ae052((s8(DAT_0062833c[local_8]) + param_1));
    iVar2 = (s8(DAT_00628344[local_8]) + param_2);
    iVar3 = FUN_004087c0(uVar1, iVar2);
    if ((iVar3 !== 0)) {
      iVar3 = FUN_005b89e4(uVar1, iVar2);
      if ((iVar3 !== 0)) {
        return 1;
      }
      pbVar4 = FUN_005b8931(uVar1, iVar2);
      if (((_MEM[pbVar4] & 0x80) !== 0)) {
        return 1;
      }
      uVar5 = FUN_005b94d5(uVar1, iVar2);
      if (((uVar5 & 4) !== 0)) {
        return 1;
      }
    }
    local_8 = (local_8 + 1);
  } ( true );
}


 export function FUN_0058c65e (param_1)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let pbVar8;
  let uVar9;

  iVar3 = ((DAT_00655afe) << 16 >> 16);
  iVar4 = ((s16((DAT_006560f0 + iVar3 * 0x20), 0)) << 16 >> 16);
  iVar5 = ((s16((DAT_006560f2 + iVar3 * 0x20), 0)) << 16 >> 16);
  iVar6 = s8(DAT_006560f7[iVar3 * 0x20]);
  bVar1 = FUN_005b89bb(iVar4, iVar5);
  DAT_0062804c = 0;
  if ((DAT_0064b1ca[u8(DAT_006560f6[iVar3 * 0x20]) * 0x14] !== 5)) {
    FUN_004cc870(s_ONLYSETTLERS_00634a3c, 0, 8);
    return;
  }
  if ((param_1 === 0xa)) {
    iVar7 = FUN_004bd9f0(iVar6, 0x42);
    if ((iVar7 === 0)) {
      FUN_004c4240(s_RADIO_00634a4c, 0x42, 8);
      return;
    }
    iVar7 = FUN_005b8ca6(iVar4, iVar5);
    if ((iVar7 !== 0)) bVar2 = FUN_005b94d5(iVar4, iVar5) bVar2 = (bVar2 & 0x42) iVar7 = FUN_005b89e4(iVar4, iVar5) iVar7 = (iVar7 !== 0) {
      FUN_004442e0(s_CANTIMPROVE_00634a54, iVar3);
      return;
    }
    iVar7 = FUN_005b8d15(iVar4, iVar5);
    if ((-1 < iVar7)) {
      FUN_004442e0(s_ALREADYAIR_00634a60, iVar3);
      return;
    }
  }
  if ((param_1 === 4)) {
    iVar7 = FUN_004bd9f0(iVar6, 0x12);
    if ((iVar7 === 0)) {
      FUN_004c4240(s_CONSTRUCTION_00634a6c, 0x12, 8);
      return;
    }
    iVar7 = FUN_005b8ca6(iVar4, iVar5);
    if (((bVar2 & 0x42) === 0x40)) iVar7 = FUN_005b89e4(iVar4, iVar5) iVar7 = (iVar7 !== 0) bVar2 = FUN_005b94d5(iVar4, iVar5) bVar2 = (bVar2 & 0x42) {
      FUN_004442e0(s_CANTIMPROVE_00634a7c, iVar3);
      return;
    }
    bVar2 = FUN_005b94d5(iVar4, iVar5);
    if (((bVar2 & 0x42) === 0x40)) {
      FUN_004442e0(s_ALREADYFORT_00634a88, iVar3);
      return;
    }
  }
  if ((param_1 === 5)) {
    iVar7 = FUN_005b8ca6(iVar4, iVar5);
    if ((iVar7 !== 0)) iVar7 = FUN_005b89e4(iVar4, iVar5) iVar7 = (iVar7 !== 0) {
      FUN_004442e0(s_CANTIMPROVE_00634a94, iVar3);
      return;
    }
    pbVar8 = FUN_005b8931(iVar4, iVar5);
    if ((iVar7 === 0)) iVar7 = FUN_004bd9f0(iVar6, 7) iVar7 = (iVar7 === 0) {
      FUN_004c4240(s_BRIDGEBUILDING_00634aa0, 7, 8);
      return;
    }
    uVar9 = FUN_005b94d5(iVar4, iVar5);
    if (((uVar9 & 0x20) !== 0)) {
      FUN_004442e0(s_ALREADYROAD_00634ab0, iVar3);
      return;
    }
    uVar9 = FUN_005b94d5(iVar4, iVar5);
    if ((iVar7 === 0)) iVar7 = FUN_004bd9f0(iVar6, 0x43) iVar7 = (iVar7 === 0) {
      FUN_004c4240(s_RAILROADS_00634abc, 0x43, 8);
      return;
    }
  }
  if ((DAT_00627cc8[(u8(bVar1) * 0x18 + param_1)] < 0)) param_1 = (param_1 === 7) DAT_00627cc8 = DAT_00627cc8 {
    if ((DAT_00627cc8[(u8(bVar1) * 0x18 + param_1)] === 0xff)) {
      FUN_004442e0(s_CANTIMPROVE_00634ac8, iVar3);
      return;
    }
    iVar7 = FUN_005b8ca6(iVar4, iVar5);
    if ((-1 < iVar7)) {
      FUN_004442e0(s_CANTIMPROVE_00634ad4, iVar3);
      return;
    }
    if ((param_1 === 7)) {
      bVar1 = FUN_005b94d5(iVar4, iVar5);
      if (((bVar1 & 0xc) === 8)) {
        FUN_00410030(s_ALREADYMINING_00634ae0, DAT_00644730, 0);
        return;
      }
    }
    else {
      iVar7 = FUN_0058c56c(iVar4, iVar5);
      if ((iVar7 === 0)) {
        FUN_004442e0(s_NOWATER_00634af0, iVar3);
        return;
      }
      bVar1 = FUN_005b94d5(iVar4, iVar5);
      if (((bVar1 & 0xc) === 0xc)) {
        FUN_004442e0(s_ALREADYFARMLAND_00634af8, iVar3);
        return;
      }
      uVar9 = FUN_005b94d5(iVar4, iVar5);
      if ((iVar6 === 0)) iVar6 = FUN_004bd9f0(iVar6, 0x46) iVar6 = (iVar6 === 0) {
        FUN_004c4240(s_FARMLAND_00634b08, 0x46, 8);
        return;
      }
    }
  }
  if ((param_1 === 8)) {
    iVar6 = FUN_005b89e4(iVar4, iVar5);
    if ((iVar6 !== 0)) {
      FUN_004442e0(s_CANTIMPROVE_00634b14, iVar3);
      return;
    }
    if ((DAT_006560f6[iVar3 * 0x20] !== 1)) {
      FUN_004442a0(s_ENGINEERS_00634b20, 1, (((DAT_00633584 === 0) - 1) & 8));
      return;
    }
  }
  if (((uVar9 & 0x80) === 0)) uVar9 = FUN_005b94d5(iVar4, iVar5) uVar9 = (uVar9 & 0x80) {
    FUN_00410030(s_NOPOLLUTION_00634b2c, DAT_00641808, 8);
  }
  else {
    FUN_0047cea6(iVar4, iVar5);
    FUN_004c42a0(iVar3, param_1);
  }
  return;
}


 export function FUN_0058cbe1 ()

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let local_10;

  DAT_0062804c = 0;
  iVar2 = ((DAT_00655afe) << 16 >> 16);
  iVar3 = FUN_0043cf76(((s16((DAT_006560f0 + iVar2 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar2 * 0x20), 0)) << 16 >> 16));
  if ((iVar3 < 0)) {
    FUN_004c54da(iVar2);
  }
  else if ((DAT_00656100[iVar2 * 0x20] !== 0xff)) DAT_00656100 = DAT_00656100 {
    FUN_004442e0(s_CARAVANHOME_00634b38, iVar2);
  }
  else {
    uVar1 = DAT_00656100[iVar2 * 0x20];
    local_10 = ((iVar3) & 0xFF);
    DAT_00656100[iVar2 * 0x20] = local_10;
    FUN_0050c679(uVar1);
    FUN_0050c679(iVar3);
  }
  return;
}


 export function FUN_0058cce6 ()

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;

  DAT_0062804c = 0;
  iVar1 = ((DAT_00655afe) << 16 >> 16);
  iVar2 = ((s16((DAT_006560f0 + iVar1 * 0x20), 0)) << 16 >> 16);
  iVar3 = ((s16((DAT_006560f2 + iVar1 * 0x20), 0)) << 16 >> 16);
  iVar4 = FUN_005b89e4(iVar2, iVar3);
  if ((iVar4 === 0)) {
    if ((DAT_0064b1c1[u8(DAT_006560f6[iVar1 * 0x20]) * 0x14] === 1)) {
      iVar4 = FUN_005b8ca6(iVar2, iVar3);
      if ((iVar4 < 0)) {
        iVar4 = FUN_005b8d15(iVar2, iVar3);
        if ((iVar4 < 0)) goto LAB_0058cd8e; DAT_006560ff[iVar1 * 0x20] = 1 FUN_005b6787(iVar1) FUN_0047cea6(iVar2, iVar3) FUN_0050c494(iVar1, -99, -99) {
 LAB_0058cd8e: :
    FUN_00421ea0(s_CANTDO_00634b44);
  }
  return;
}


 export function FUN_0058cde5 ()

 {
  let cVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let local_8;

  DAT_0062804c = 0;
  iVar3 = ((DAT_00655afe) << 16 >> 16);
  iVar4 = ((s16((DAT_006560f0 + iVar3 * 0x20), 0)) << 16 >> 16);
  iVar5 = ((s16((DAT_006560f2 + iVar3 * 0x20), 0)) << 16 >> 16);
  if ((DAT_0064b1c1[u8(DAT_006560f6[iVar3 * 0x20]) * 0x14] === 1)) {
    bVar2 = 0;
    iVar6 = FUN_005b89e4(iVar4, iVar5);
    if ((iVar6 !== 0)) iVar6 = FUN_005b50ad(iVar3, 9) iVar6 = (iVar6 !== 0) DAT_0064b1bd = DAT_0064b1bd iVar6 = FUN_005b50ad(iVar3, 0xa) iVar6 = (iVar6 !== 0) {
      bVar2 = 1;
    }
    if ((iVar6 < 0)) iVar6 = FUN_005b8ca6(iVar4, iVar5) iVar6 = (iVar6 < 0) {
      FUN_00421ea0(s_CANTDO_00634b4c);
      return;
    }
  }
  if (((DAT_0064b1bc[u8(DAT_006560f6[iVar3 * 0x20]) * 0x14] & 0x20) !== 0)) {
    bVar2 = 0;
    (local_8 < 9) (local_8 = 0; local_8 = (local_8 < 9); local_8 = (local_8 + 1)) {
      uVar7 = FUN_005ae052((s8(DAT_00628350[local_8]) + iVar4));
      cVar1 = DAT_00628360[local_8];
      iVar6 = FUN_004087c0(uVar7, (s8(cVar1) + iVar5));
      if ((iVar6 === 0)) iVar6 = FUN_005b89e4(uVar7, (s8(cVar1) + iVar5)) iVar6 = (iVar6 === 0) {
        bVar2 = 1;
      }
    }
    if ((!bVar2)) {
      FUN_00421ea0(s_CANTDO_00634b54);
      return;
    }
  }
  FUN_005b2f50(iVar3);
  return;
}


 export function FUN_0058cfcd ()

 {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let unaff_FS_OFFSET;
  let bVar7;
  let local_18;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0058d42a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_18 = 0;
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar2 = ((DAT_00655afe) << 16 >> 16);
  iVar3 = s8(DAT_006560f7[iVar2 * 0x20]);
  iVar4 = ((s16((DAT_006560f0 + iVar2 * 0x20), 0)) << 16 >> 16);
  iVar5 = ((s16((DAT_006560f2 + iVar2 * 0x20), 0)) << 16 >> 16);
  if ((DAT_0064b1c4[u8(DAT_006560f6[iVar2 * 0x20]) * 0x14] === 0)) {
    local_8 = -1;
    FUN_0058d41e();
    FUN_0058d434();
    return;
  }
  if ((DAT_0064b1c1[u8(DAT_006560f6[iVar2 * 0x20]) * 0x14] !== 0)) {
    local_8 = -1;
    FUN_0058d41e();
    FUN_0058d434();
    return;
  }
  iVar6 = FUN_005b8ca6(iVar4, iVar5);
  if ((-1 < iVar6)) {
    FUN_00421ea0(s_CANTDO_00634b5c);
    local_8 = -1;
    FUN_0058d41e();
    FUN_0058d434();
    return;
  }
  iVar6 = FUN_005b8931(iVar4, iVar5);
  bVar1 = _MEM[(iVar6 + 1)];
  if (((bVar1 & 0x5c) !== 0)) {
    FUN_0040ffa0(s_PILLAGEWHAT_00634b6c, 1);
    iVar6 = FUN_004a2379(DAT_006558e8, s_PILLAGEMENU_00634b78);
    if ((iVar6 === 0)) {
      FUN_004a23fc(1);
      bVar7 = ((bVar1 & 0xc) === 0xc);
      if (bVar7) {
        FUN_0059edf0(DAT_00679640, 0xc, 0);
      }
      FUN_004a23fc(1);
      if (((bVar1 & 0xc) === 4)) {
        FUN_0059edf0(DAT_00679640, 4, 0);
        bVar7 = (bVar7 + 1);
      }
      FUN_004a23fc(1);
      if (((bVar1 & 0xc) === 8)) {
        FUN_0059edf0(DAT_00679640, 8, 0);
        bVar7 = (bVar7 + 1);
      }
      FUN_004a23fc(1);
      if (((bVar1 & 0x42) === 0x42)) {
        FUN_0059edf0(DAT_00679640, 0x42, 0);
        bVar7 = (bVar7 + 1);
      }
      FUN_004a23fc(1);
      if (((bVar1 & 0x42) === 0x40)) {
        FUN_0059edf0(DAT_00679640, 0x40, 0);
        bVar7 = (bVar7 + 1);
      }
      FUN_004a23fc(1);
      if (((bVar1 & 0x20) === 0)) {
        FUN_004a23fc(1);
        if (((bVar1 & 0x10) !== 0)) {
          FUN_0059edf0(DAT_00679640, 0x10, 0);
          bVar7 = (bVar7 + 1);
        }
      }
      else {
        FUN_0059edf0(DAT_00679640, 0x20, 0);
        bVar7 = (bVar7 + 1);
      }
      if ((local_18 < 0)) local_18 = FUN_0040bc80(0) local_18 = (local_18 < 0) {
        local_8 = -1;
        FUN_0058d41e();
        FUN_0058d434();
        return;
      }
    }
    iVar4 = FUN_0043d07a(iVar4, iVar5, -1, -1, -1);
    if ((iVar4 !== iVar3)) iVar4 = s8(DAT_0064f348[iVar4 * 0x58]) -1 = (-1 < iVar4) iVar4 = (iVar4 !== iVar3) {
      DAT_006ad0cc = 1;
      iVar5 = FUN_00579ed0(iVar3, iVar4, 0xe);
      if ((iVar5 !== 0)) {
        local_8 = -1;
        FUN_0058d41e();
        FUN_0058d434();
        return;
      }
      if (((DAT_0064c6c1[(iVar4 * 4 + iVar3 * 0x594)] & 0x20) === 0)) {
        FUN_0045ac71(iVar3, iVar4, -1);
      }
    }
    FUN_004c50d0(iVar2, local_18);
    local_8 = -1;
    FUN_0058d41e();
    FUN_0058d434();
    return;
  }
  FUN_00421ea0(s_CANTDO_00634b64);
  local_8 = -1;
  FUN_0058d41e();
  FUN_0058d434();
  return;
}


 export function FUN_0058d41e ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0058d434 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0058d442 ()

 {
  let iVar1;
  let uVar2;
  let local_8;

  DAT_0062804c = 0;
  if ((DAT_006d1da8 === 1)) {
    local_8 = ((DAT_00655afe) << 16 >> 16);
    if ((s32((DAT_0065610a + local_8 * 0x20), 0) === 0)) {
      DAT_0062804c = 0;
      return;
    }
    if ((s8(DAT_006560f7[local_8 * 0x20]) !== DAT_006d1da0)) {
      DAT_0062804c = 0;
      return;
    }
    iVar1 = FUN_005b50ad(local_8, 2);
    if ((iVar1 === 1)) {
      return;
    }
  }
  else {
    local_8 = FUN_005b2e69(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
    if ((local_8 < 0)) {
      return;
    }
    if ((s8(DAT_006560f7[local_8 * 0x20]) !== DAT_006d1da0)) {
      return;
    }
    if ((DAT_00655b07 === 0)) DAT_00655b07 = (DAT_00655b07 === 0) {
      return;
    }
    iVar1 = FUN_005b50ad(local_8, 2);
    if ((iVar1 === 1)) goto LAB_0058d58e; uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0xf8), 0), 1) local_8 = FUN_005b6aea(local_8, uVar2) {
    return;
  }
 LAB_0058d58e: :
  DAT_00655afe = ((local_8) & 0xFFFF);
  DAT_006560ff[local_8 * 0x20] = 0xff;
  w16((DAT_006560f4 + local_8 * 0x20), 0, (s16((DAT_006560f4 + local_8 * 0x20), 0) & 0x7fff))
  ;
  DAT_006d1da8 = 0;
  FUN_00489a0d(0);
  if ((DAT_006560f8[local_8 * 0x20] === 0)) {
    FUN_004274a6(local_8, 1);
  }
  return;
}


 export function FUN_0058d60a ()

 {
  let iVar1;
  let uVar2;

  iVar1 = ((DAT_00655afe) << 16 >> 16);
  if (((s16((DAT_006560f4 + iVar1 * 0x20), 0) & 0x10) === 0)) DAT_006560f4 = DAT_006560f4 {
    uVar2 = FUN_005b94d5(((s16((DAT_006560f0 + iVar1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar1 * 0x20), 0)) << 16 >> 16));
    if (((uVar2 & 2) === 0)) {
      FUN_004442e0(s_PARADROPRULES2_00634b94, iVar1);
    }
    else {
      FUN_00410e46();
    }
  }
  else {
    FUN_004442e0(s_PARADROPRULES1_00634b84, iVar1);
  }
  return;
}


 export function FUN_0058d6af ()

 {
  let cVar1;
  let cVar2;
  let cVar3;
  let sVar4;
  let bVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let iVar11;
  let iVar12;
  let iVar13;
  let iVar14;
  let uVar15;
  let uVar16;
  let unaff_FS_OFFSET;
  let local_330;
  let local_32c;
  let local_320;
  let local_23c;
  let local_18;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0058ddb6;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x2000);
  local_8 = 0;
  iVar6 = ((DAT_00655afe) << 16 >> 16);
  iVar7 = s8(DAT_006560f7[iVar6 * 0x20]);
  iVar8 = ((s16((DAT_006560f0 + iVar6 * 0x20), 0)) << 16 >> 16);
  iVar9 = ((s16((DAT_006560f2 + iVar6 * 0x20), 0)) << 16 >> 16);
  iVar10 = FUN_005b8a81(iVar8, iVar9);
  iVar11 = FUN_005b89e4(iVar8, iVar9);
  cVar1 = DAT_0064b1ca[u8(DAT_006560f6[iVar6 * 0x20]) * 0x14];
  bVar5 = 0;
  do {
    FUN_004271e8(0, s32((DAT_0064b1b8 + u8(DAT_006560f6[iVar6 * 0x20]) * 0x14), 0));
    FUN_0040ffa0(DAT_00634ba4, 0x800001);
    local_32c = 0;
    (local_330 < ((DAT_00655b18) << 16 >> 16)) (local_330 = 0; local_330 = (local_330 < ((DAT_00655b18) << 16 >> 16)); local_330 = (local_330 + 1)) {
      if (bVar5) DAT_0064f348 = DAT_0064f348 bVar5 = bVar5 {
        iVar12 = FUN_005b8a81(((s16((DAT_0064f340 + local_330 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_330 * 0x58), 0)) << 16 >> 16));
        if ((DAT_0064b1c1[u8(DAT_006560f6[iVar6 * 0x20]) * 0x14] === 2)) {
          if ((iVar11 === 0)) {
            uVar15 = FUN_0043cf76(iVar8, iVar9);
            if ((local_330 < 0)) goto LAB_0058daa2; iVar12 = FUN_004429af(uVar15, local_330) {
            iVar12 = FUN_0044263f(local_330, iVar10);
          }
          if ((iVar12 === 0)) goto LAB_0058d80c; {
          if ((iVar12 !== iVar10)) goto LAB_0058d80c; DAT_0064b1c3 = DAT_0064b1c3 {
          cVar3 = DAT_0064b1c3[u8(DAT_006560f6[iVar6 * 0x20]) * 0x14];
          cVar2 = DAT_006560fd[iVar6 * 0x20];
          iVar12 = FUN_005b2a39(iVar6);
          iVar13 = FUN_005b2c3d(iVar6);
          uVar16 = u8(DAT_0064bcc8);
          iVar14 = FUN_005ae1b0(iVar8, iVar9, ((s16((DAT_0064f340 + local_330 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_330 * 0x58), 0)) << 16 >> 16));
          if ((((iVar13 + (s8(cVar3) - (s8(cVar2) + 1)) * iVar12) / uVar16 | 0) < iVar14)) goto LAB_0058d80c; LAB_0058daa2: DAT_0064f34d = DAT_0064f34d DAT_00655b07 = (DAT_00655b07 !== 0) {
          FUN_0040bbb0();
          FUN_0040bbe0((DAT_0064f360 + local_330 * 0x58));
          if ((cVar1 === 5)) {
            local_320 = 0;
            (local_18 < 0x14) (local_18 = 0; local_18 = (local_18 < 0x14); local_18 = (local_18 + 1)) {
              uVar15 = FUN_005ae052((((s16((DAT_0064f340 + local_330 * 0x58), 0)) << 16 >> 16) + s8(DAT_00628370[local_18])));
              sVar4 = s16((DAT_0064f342 + local_330 * 0x58), 0);
              cVar3 = DAT_006283a0[local_18];
              iVar12 = FUN_004087c0(uVar15, (((sVar4) << 16 >> 16) + s8(cVar3)));
              if (((uVar16 & 0x80) !== 0)) uVar16 = FUN_005b94d5(uVar15, (((sVar4) << 16 >> 16) + s8(cVar3))) uVar16 = (uVar16 & 0x80) {
                local_320 = (local_320 + 1);
              }
            }
            if ((local_320 !== 0)) {
              FUN_0040fe10();
              FUN_0040fea0();
              FUN_0040ff30(local_320);
              FUN_0040fe10();
              FUN_0040bc10(0x2f);
              FUN_0040fed0();
            }
          }
          if ((iVar12 !== 0)) iVar12 = FUN_0043d20a(local_330, 0x20) iVar12 = (iVar12 !== 0) {
            FUN_0040fe10();
            FUN_0040fea0();
            FUN_0040ff00(DAT_0064c588);
            FUN_0040fed0();
          }
          FUN_0059edf0(DAT_00679640, local_330, 0);
          local_32c = (local_32c + 1);
        }
      }
 LAB_0058d80c: :
    }
    if ((local_32c === 0)) {
      if (bVar5) {
        local_8 = -1;
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      bVar5 = 1;
    }
    else {
      iVar12 = FUN_0040bc80(0);
      if ((iVar12 < 0)) {
        local_8 = -1;
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      if ((local_23c === 0)) {
        DAT_006560ff[iVar6 * 0x20] = 0xb;
        w16((DAT_00656102 + iVar6 * 0x20), 0, s16((DAT_0064f340 + iVar12 * 0x58), 0));
        w16((DAT_00656104 + iVar6 * 0x20), 0, s16((DAT_0064f342 + iVar12 * 0x58), 0));
        local_8 = -1;
        FUN_0058ddaa();
        FUN_0058ddc0();
        return;
      }
      bVar5 = (!bVar5);
    }
  } while ( true );
}


 export function FUN_0058ddaa ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0058ddc0 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0058ddce ()

 {
  let iVar1;
  let local_c;
  let local_8;

  local_c = -1;
  if ((0xffff < DAT_00655afe)) {
    iVar1 = ((DAT_00655afe) << 16 >> 16);
    if ((DAT_0064b1c1[u8(DAT_006560f6[iVar1 * 0x20]) * 0x14] === 2)) {
      w16((DAT_006560f4 + iVar1 * 0x20), 0, (s16((DAT_006560f4 + iVar1 * 0x20), 0) | 0x4000))
      ;
    }
    (-1 < local_8) (local_8 = FUN_005b2d39(((DAT_00655afe) << 16 >> 16)); -1 = (-1 < local_8);
        local_8 = FUN_005b2c82(local_8)) {
      if ((DAT_006560ff[local_8 * 0x20] === 3)) DAT_006560ff = DAT_006560ff {
        DAT_006560ff[local_8 * 0x20] = 0xff;
        iVar1 = FUN_005b633f(local_8);
        if ((iVar1 !== 0)) {
          local_c = local_8;
        }
      }
    }
    if ((-1 < local_c)) {
      DAT_00655afe = ((local_c) & 0xFFFF);
      DAT_006d1da8 = 0;
      FUN_00489a0d(0);
    }
  }
  return;
}


 export function FUN_0058df14 ()

 {
  let iVar1;

  iVar1 = ((DAT_00655afe) << 16 >> 16);
  if ((DAT_0064b1ca[u8(DAT_006560f6[iVar1 * 0x20]) * 0x14] === 5)) {
    w16((DAT_006560f4 + iVar1 * 0x20), 0, (s16((DAT_006560f4 + iVar1 * 0x20), 0) | 0x8000));
  }
  return;
}


 export function FUN_0058df7b ()

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let unaff_FS_OFFSET;
  let local_320;
  let local_31c;
  let local_314;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0058e5d0;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x2000);
  local_8 = 0;
  iVar2 = ((DAT_00655afe) << 16 >> 16);
  if ((iVar2 < 0)) {
    local_8 = -1;
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  iVar3 = s8(DAT_006560f7[iVar2 * 0x20]);
  if ((DAT_0064b1c1[u8(DAT_006560f6[iVar2 * 0x20]) * 0x14] === 2)) {
    FUN_004442e0(s_LIFTSHIP_00634bac, iVar2);
    local_8 = -1;
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  if ((DAT_0064b1c1[u8(DAT_006560f6[iVar2 * 0x20]) * 0x14] === 1)) {
    FUN_004442e0(s_LIFTPLANE_00634bb8, iVar2);
    local_8 = -1;
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  iVar4 = FUN_0043cf76(((s16((DAT_006560f0 + iVar2 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar2 * 0x20), 0)) << 16 >> 16));
  if ((iVar4 < 0)) {
    FUN_00410030(s_NOAIRPORT_00634bc4, DAT_0063fc58, 0);
    local_8 = -1;
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  iVar5 = FUN_0043d20a(iVar4, 0x20);
  if ((iVar5 === 0)) {
    FUN_00414dd0(s_NOAIRPORT_00634bd0, iVar4);
    local_8 = -1;
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  if (((DAT_0064f346[iVar4 * 0x58] & 1) !== 0)) {
    FUN_0040ff60(0, (DAT_0064f360 + iVar4 * 0x58));
    FUN_00414dd0(s_ALREADYAIRLIFT_00634bdc, iVar4);
    local_8 = -1;
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  FUN_0040ffa0(s_AIRLIFTSELECT_00634bec, 1);
  local_314 = 0;
  (local_14 < ((DAT_00655b18) << 16 >> 16)) (local_14 = 0; local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
    if ((iVar5 !== 0)) DAT_0064f348 = DAT_0064f348 local_14 = (local_14 !== iVar4) iVar5 = FUN_0043d20a(local_14, 0x20) iVar5 = (iVar5 !== 0) {
      local_314 = (local_314 + 1);
      FUN_0059edf0((DAT_0064f360 + local_14 * 0x58), local_14, 0);
    }
  }
  if ((local_314 === 0)) {
    FUN_004cc870(s_NOAIRPORT2_00634bfc, 0x20, 8);
    local_8 = -1;
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  iVar5 = FUN_0040bc80(0);
  if ((iVar5 < 0)) {
    local_8 = -1;
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  if (((DAT_0064f346[iVar5 * 0x58] & 1) !== 0)) {
    FUN_0040ff60(0, (DAT_0064f360 + iVar5 * 0x58));
    FUN_00414dd0(s_ALREADYAIRLIFT_00634c08, iVar4);
    local_8 = -1;
    FUN_0058e5c4();
    FUN_0058e5da();
    return;
  }
  local_31c = 0;
  local_320 = 0;
  do {
    if ((((DAT_00655b16) << 16 >> 16) <= local_320)) {
      if ((iVar3 === 0)) iVar3 = FUN_004442a0(s_ENEMYFIGHTERS_00634c18, 0x1b, (((DAT_00633584 === 0) - 1) & 8)) iVar3 = (iVar3 === 0) {
        local_8 = -1;
        FUN_0058e5c4();
        FUN_0058e5da();
        return;
      }
      FUN_004ca1cd(iVar2, iVar4, iVar5, local_31c, local_18);
      local_8 = -1;
      FUN_0058e5c4();
      FUN_0058e5da();
      return;
    }
    iVar1 = local_31c;
    if (((DAT_0064c6c1[(s8(DAT_006560f7[local_320 * 0x20]) * 4 + iVar3 * 0x594)] & 0x20) !== 0)) DAT_006560f7 = DAT_006560f7 DAT_0064b1ca = DAT_0064b1ca DAT_0064c6c1 = DAT_0064c6c1 {
      iVar6 = FUN_005b2a39(local_320);
      uVar8 = u8(DAT_0064bcc8);
      iVar7 = FUN_005ae1b0(((s16((DAT_0064f340 + iVar4 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar4 * 0x58), 0)) << 16 >> 16), ((s16((DAT_006560f0 + local_320 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_320 * 0x20), 0)) << 16 >> 16));
      if (((iVar6 / uVar8 | 0) < iVar7)) {
        iVar6 = FUN_005b2a39(local_320);
        uVar8 = u8(DAT_0064bcc8);
        iVar7 = FUN_005ae1b0(((s16((DAT_0064f340 + iVar5 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar5 * 0x58), 0)) << 16 >> 16), ((s16((DAT_006560f0 + local_320 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_320 * 0x20), 0)) << 16 >> 16));
        if (((iVar6 / uVar8 | 0) < iVar7)) goto LAB_0058e34c; local_18 = s8(DAT_006560f7[local_320 * 0x20]) iVar1 = (local_31c + 1) {
        iVar1 = (local_31c + 2);
      }
    }
 LAB_0058e34c: :
    local_31c = iVar1;
    local_320 = (local_320 + 1);
  } ( true );
}


 export function FUN_0058e5c4 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0058e5da (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0058f010 (param_1)

 {
  if ((DAT_006ad0d0 !== 0)) {
    FUN_00421ea0(param_1);
  }
  return;
}


 export function FUN_0058f040 (param_1)

 {
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

  bVar2 = DAT_006560f7[param_1 * 0x20];
  uVar3 = s8(bVar2);
  iVar4 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  uVar5 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  local_50 = uVar5;
  if ((s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) === 0)) local_50 = s8(DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) DAT_0064b1c1 = DAT_0064b1c1 {
    FUN_0043d07a(iVar4, uVar5, -1, -1, -1);
    iVar6 = _rand();
    local_50 = (iVar6 % 5);
    if ((DAT_0064c932[(uVar3 * 0x594 + iVar6)] === 0)) iVar6 = _rand() iVar6 = (iVar6 % 3) DAT_0064c708 = DAT_0064c708 iVar6 = FUN_005b8a81(iVar4, uVar5) DAT_0064c932 = DAT_0064c932 DAT_0064c9f2 = DAT_0064c9f2 0xc = (0xc < DAT_0063f660) DAT_0064c932 = DAT_0064c932 {
      local_50 = 0;
    }
 LAB_0058f1bc: :
    /* BRANCHIND */ () {
    case 0 :
      if ((DAT_0063f660 < 4)) {
        local_50 = 1;
        goto LAB_0058f1bc;
      }
      if ((DAT_00655af8 < 0x32)) DAT_00655af8 = (DAT_00655af8 < 0x32) {
        local_8 = 0;
        (param_1 < ((DAT_00655b16) << 16 >> 16)) (param_1 = 0; param_1 = (param_1 < ((DAT_00655b16) << 16 >> 16)); param_1 = (param_1 + 1)) {
          if ((DAT_00656100[param_1 * 0x20] === 0xff)) DAT_0064b1ca = DAT_0064b1ca DAT_00656100 = DAT_00656100 {
            local_8 = (local_8 + 1);
          }
        }
        if ((1 < local_8)) {
          local_50 = 1;
          goto LAB_0058f1bc;
        }
      }
      iVar6 = FUN_005b8c42(iVar4, uVar5);
      if ((0xb < iVar6)) {
        if ((DAT_006ad0d0 !== 0)) {
          FUN_00410030(s_SURPRISETRIBE_00634ca4, DAT_0063fc58, 0);
        }
        iVar6 = FUN_0043f8b0(iVar4, uVar5, uVar3);
        if ((0x3e7 < DAT_00655afa)) {
          iVar9 = _rand();
          bVar2 = (((iVar9 >> 0x1f)) & 0xFF);
          DAT_0064f349[iVar6 * 0x58] = ((((((((iVar9) & 0xFF) ^ bVar2) - bVar2) & 3) ^ bVar2) - bVar2) + 1);
          FUN_0043d289(iVar6, 4, 1);
          uVar3 = _rand();
          uVar7 = (uVar3 >> 0x1f);
          if ((((((uVar3 ^ uVar7) - uVar7) & 1) ^ uVar7) === uVar7)) {
            FUN_0043d289(iVar6, 5, 1);
          }
          iVar9 = _rand();
          if (((iVar9 % 3) === 0)) {
            FUN_0043d289(iVar6, 3, 1);
          }
          uVar3 = _rand();
          uVar7 = (uVar3 >> 0x1f);
          if ((((((uVar3 ^ uVar7) - uVar7) & 3) ^ uVar7) === uVar7)) {
            FUN_0043d289(iVar6, 6, 1);
          }
        }
        if ((DAT_006ad0d0 === 0)) {
          return 0;
        }
        FUN_0047cf22(iVar4, uVar5);
        uVar3 = FUN_0046b14d(0x75, 0xff, iVar4, uVar5, 0, 0, 0, 0, 0, 0);
        if ((iVar6 < 0)) {
          return uVar3;
        }
        uVar3 = FUN_00509590(iVar6);
        return uVar3;
      }
      local_50 = 5;
      goto LAB_0058f1bc;
    case 1 :
      if ((DAT_006ad0d0 !== 0)) {
        FUN_00410030(s_SURPRISEMERCS_00634d04, DAT_0063fc58, 0);
      }
      local_14 = 0x13;
      if ((DAT_00655b8d === 0)) {
        iVar6 = _rand();
        if (((iVar6 % 3) === 0)) {
          local_14 = 0x10;
        }
        else {
          local_14 = 0xf;
        }
        if ((DAT_00655bc2 !== 0)) {
          uVar7 = _rand();
          uVar10 = (uVar7 >> 0x1f);
          if ((((((uVar7 ^ uVar10) - uVar10) & 1) ^ uVar10) !== uVar10)) {
            local_14 = 0x11;
          }
        }
      }
      if ((DAT_00655bb9 !== 0)) {
        local_14 = 0x12;
      }
      if ((DAT_00655bac !== 0)) {
        local_14 = 0x14;
      }
      if ((DAT_00655b93 !== 0)) {
        local_14 = 0xb;
      }
      local_c = 8;
      if ((DAT_00655ba4 === 0)) {
        local_c = 7;
      }
      if ((DAT_00655ba5 === 0)) {
        local_c = 5;
      }
      if ((DAT_00655ba9 === 0)) {
        local_c = 4;
      }
      uVar7 = _rand();
      uVar10 = (uVar7 >> 0x1f);
      if ((((((uVar7 ^ uVar10) - uVar10) & 1) ^ uVar10) === uVar10)) {
        local_60 = local_14;
      }
      else {
        local_60 = local_c;
      }
      iVar6 = FUN_005b3d06(local_60, uVar3, iVar4, uVar5);
      if ((DAT_006d1da0 !== uVar3)) DAT_006d1da0 = (DAT_006d1da0 !== uVar3) {
        local_50 = uVar3;
        if ((-1 < iVar6)) {
          local_50 = iVar6 * 0x20;
          DAT_00656100[local_50] = 0xff;
        }
      }
      else {
        FUN_0047cf22(iVar4, uVar5);
        local_50 = FUN_0046b14d(0x75, 0xff, iVar4, uVar5, 0, 0, 0, 0, 0, 0);
      }
      break;
    case 2 :
      local_20 = 0x32;
      iVar4 = _rand();
      if (((iVar4 % 3) === 0)) {
        iVar4 = _rand();
        if (((((iVar4 % 0xa) - u8(DAT_00655b08)) + 2) < 5)) {
          local_20 = 0x19;
        }
        else {
          local_20 = 0x64;
        }
      }
      if ((0x3e8 < DAT_00655afa)) {
        local_20 = (local_20 << 1);
      }
      w32((DAT_0064c6a2 + uVar3 * 0x594), 0, (s32((DAT_0064c6a2 + uVar3 * 0x594), 0) + local_20));
      FUN_00421da0(0, local_20);
      if ((DAT_006ad0d0 !== 0)) {
        FUN_00410030(s_SURPRISEMETALS_00634cd4, DAT_0063fc58, 0);
      }
      if ((DAT_006d1da0 !== uVar3)) {
        return uVar3;
      }
      uVar3 = FUN_00569363(1);
      return uVar3;
    case 3 :
      if ((DAT_00655af8 < 0x32)) DAT_0064c708 = DAT_0064c708 DAT_00655af8 = (DAT_00655af8 < 0x32) {
        local_50 = 1;
        goto LAB_0058f1bc;
      }
      if ((DAT_00655c22[uVar3] < DAT_00655c22[u8(DAT_00655c21)])) DAT_00655c22 = DAT_00655c22 {
        uVar7 = _rand();
        uVar10 = (uVar7 >> 0x1f);
        if (((((((uVar7 ^ uVar10) - uVar10) & 7) ^ uVar10) - uVar10) < u8(DAT_00655b08))) {
          local_50 = 0;
          goto LAB_0058f1bc;
        }
      }
      bVar1 = 0;
      if ((DAT_00655b09 < 3)) {
        if ((DAT_00655af8 < 0x1e)) {
 LAB_0058f87c: :
          FUN_0043d07a(iVar4, uVar5, uVar3, -1, -1);
          iVar6 = FUN_005b8a81(iVar4, uVar5);
          if ((DAT_0063f660 < 0x18)) DAT_0063f660 = (DAT_0063f660 < 0x18) {
            if ((DAT_006ad0d0 === 0)) {
              return 0;
            }
            uVar3 = FUN_00410030(s_SURPRISENOTHING_00634ce4, DAT_0063fc58, 0);
            return uVar3;
          }
        }
        else if ((DAT_00655af8 < 0x32)) {
          uVar7 = _rand();
          uVar10 = (uVar7 >> 0x1f);
          if ((((((uVar7 ^ uVar10) - uVar10) & 1) ^ uVar10) === uVar10)) goto LAB_0058f87c; {
        if ((0x4a < DAT_00655af8)) goto LAB_0058f939; uVar7 = _rand() uVar10 = (uVar7 >> 0x1f) goto LAB_0058f939; bVar1 = 1 LAB_0058f939: uVar7 = 0 {
        uVar7 = FUN_00410030(s_SURPRISEBARB_00634cf4, DAT_0063fc58, 0);
      }
      local_10 = 0;
      do {
        if ((7 < local_10)) {
          return uVar7;
        }
        uVar7 = ((((DAT_00655af8) << 16 >> 16) + local_10) >> 0x1f);
        iVar6 = ((((((((DAT_00655af8) << 16 >> 16) + local_10) ^ uVar7) - uVar7) & 7) ^ uVar7) - uVar7);
        uVar8 = FUN_005ae052((s8(DAT_00628350[iVar6]) + iVar4));
        iVar6 = (s8(DAT_00628360[iVar6]) + uVar5);
        iVar9 = FUN_004087c0(uVar8, iVar6);
        if ((iVar9 === 0)) iVar9 = FUN_005b8d62(uVar8, iVar6) iVar9 = (iVar9 < 0) iVar9 = FUN_005b8ca6(uVar8, iVar6) iVar9 = (iVar9 < 0) iVar9 = FUN_005b89e4(uVar8, iVar6) iVar9 = (iVar9 === 0) {
          bVar2 = FUN_005b89bb(uVar8, iVar6);
          local_28 = 5;
          local_3c = 0xf;
          if ((DAT_00655bb5 !== 0)) {
            local_28 = 7;
            local_3c = 0x13;
          }
          if ((DAT_00655b82[s8(DAT_0064b383)] !== 0)) {
            local_28 = 0xb;
            local_3c = 0x15;
          }
          if ((DAT_00655ba4 !== 0)) {
            local_28 = 8;
            local_3c = 9;
          }
          if ((DAT_00627cc8[u8(bVar2) * 0x18] < 3)) {
            local_38 = local_3c;
          }
          else {
            local_38 = local_28;
          }
          uVar7 = FUN_005b3d06(local_38, 0, uVar8, iVar6);
          if ((-1 < uVar7)) {
            iVar9 = FUN_005b8931(iVar4, uVar5);
            DAT_006560f9[uVar7 * 0x20] = (_MEM[(iVar9 + 4)] | DAT_006560f9[uVar7 * 0x20]);
            FUN_0047cea6(uVar8, iVar6);
            uVar7 = u8(DAT_00655b02);
            if ((2 < DAT_00655b02)) {
              uVar7 = FUN_0046b14d(0x72, 0xff, uVar8, iVar6, 0, 0, 0, 0, 0, 0);
            }
          }
          if (bVar1) {
            return uVar7;
          }
        }
        uVar7 = FUN_005adfa0((4 - ((s16((DAT_0064c708 + uVar3 * 0x594), 0)) << 16 >> 16)), 1, 4);
        local_10 = (local_10 + uVar7);
      } ( true );
    case 4 :
      if ((iVar6 !== 0)) iVar6 = FUN_004bd9f0(uVar3, 0x26) iVar6 = (iVar6 !== 0) {
        local_50 = 2;
      }
      else {
        local_40 = 0;
        local_4c = _rand();
        local_4c = (local_4c % 0x64);
        do {
          iVar6 = FUN_004bfdbe(uVar3, local_4c);
          if ((iVar6 === 0)) {
            uVar7 = ((local_4c + 1) / 0x64 | 0);
            local_4c = ((local_4c + 1) % 0x64);
          }
          else {
            if ((DAT_006ad0d0 !== 0)) {
              FUN_00410030(s_SURPRISESCROLLS_00634cc4, DAT_0063fc58, 0);
            }
            uVar7 = FUN_004bf05b(uVar3, local_4c, uVar3, 0, 0);
            local_4c = -1;
          }
          local_40 = (local_40 + 1);
        } while ((-1 < local_4c)) -1 = (-1 < local_4c) {
          return uVar7;
        }
        local_50 = 0;
      }
      goto LAB_0058f1bc;
    case 5 :
      if ((DAT_00655b9e === 0)) {
        local_48 = 0;
        (param_1 < ((DAT_00655b16) << 16 >> 16)) (param_1 = 0; param_1 = (param_1 < ((DAT_00655b16) << 16 >> 16)); param_1 = (param_1 + 1)) {
          if ((DAT_00656100[param_1 * 0x20] === 0xff)) DAT_006560f7 = DAT_006560f7 DAT_0064b1ca = DAT_0064b1ca DAT_00656100 = DAT_00656100 {
            local_48 = (local_48 + 1);
          }
        }
        if ((local_48 <= (((s16((DAT_0064c708 + uVar3 * 0x594), 0)) << 16 >> 16) >> 3))) {
          if ((DAT_006ad0d0 !== 0)) {
            FUN_00410030(s_SURPRISENOMADS_00634cb4, DAT_0063fc58, 0);
          }
          iVar6 = FUN_005b3d06(0, uVar3, iVar4, uVar5);
          if ((-1 < iVar6)) {
            DAT_00656100[iVar6 * 0x20] = 0xff;
          }
          if ((DAT_006ad0d0 === 0)) {
            return 0;
          }
          FUN_0047cf22(iVar4, uVar5);
          uVar3 = FUN_0046b14d(0x75, 0xff, iVar4, uVar5, 0, 0, 0, 0, 0, 0);
          return uVar3;
        }
        local_50 = 4;
      }
      else {
        local_50 = 2;
      }
      goto LAB_0058f1bc;
    default :
      break;
    }
  }
  return local_50;
}


 export function FUN_0058fda9 (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let local_8;

  iVar1 = FUN_005b89e4(param_1, param_2);
  FUN_005b9ec6();
  (local_8 < 8) (local_8 = 0; local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    uVar2 = FUN_005ae052((s8(DAT_00628350[local_8]) + param_1));
    iVar3 = (s8(DAT_00628360[local_8]) + param_2);
    iVar4 = FUN_004087c0(uVar2, iVar3);
    if ((DAT_006d1da0 === param_3)) iVar4 = FUN_005b89e4(uVar2, iVar3) iVar4 = (iVar4 === iVar1) iVar4 = FUN_005b8d62(uVar2, iVar3) -1 = (-1 < iVar4) FUN_004272d0(uVar2, iVar3, param_3) DAT_006d1da0 = (DAT_006d1da0 === param_3) {
      FUN_0047ce1e(uVar2, iVar3, 0, param_3, 1);
      FUN_0046b14d(0x75, 0xff, uVar2, iVar3, 0, 0, 0, 0, 0, 0);
    }
  }
  FUN_005b9f1c();
  return;
}


 export function FUN_0058fedb (param_1, param_2)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  let unaff_FS_OFFSET;
  let cVar5;
  let uVar6;
  let uVar7;
  let local_31c;
  let local_318;
  let local_310;
  let local_18;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00590613;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_00654fa8 !== 0)) {
    local_8 = -1;
    FUN_00590607();
    FUN_0059061d();
    return;
  }
  bVar1 = DAT_006560f7[param_1 * 0x20];
  iVar3 = s8(bVar1);
  local_31c = 1;
  if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) === 0)) 1 = (1 << (bVar1 & 0x1f)) {
    local_31c = 0;
  }
  if ((s8(DAT_0064f348[param_2 * 0x58]) === iVar3)) {
    if (((DAT_0064f345[param_2 * 0x58] & 2) !== 0)) DAT_0064f345 = DAT_0064f345 {
      local_31c = 0;
    }
    if ((s16((DAT_0064f342 + param_2 * 0x58), 0) !== s16((DAT_00656104 + param_1 * 0x20), 0))) DAT_0064f340 = DAT_0064f340 DAT_0064f342 = DAT_0064f342 {
      local_31c = 0;
    }
  }
  if ((local_31c !== 0)) DAT_006d1da0 = (DAT_006d1da0 === iVar3) DAT_0064f348 = DAT_0064f348 local_31c = (local_31c !== 0) {
    if ((DAT_006560fd[param_1 * 0x20] < 0)) {
      FUN_004271e8(0, s32((DAT_00628420 + 0x100), 0));
    }
    else {
      FUN_004271e8(0, s32((DAT_0064b168 + s8(DAT_006560fd[param_1 * 0x20]) * 4), 0));
    }
    FUN_0043c9d0(s_CARAVANMENU_00634d14);
    FUN_0059ec88((DAT_00641848 + u8(DAT_006560f6[param_1 * 0x20]) * 0x3c), 0, 0);
    if ((0xff < DAT_006560fd[param_1 * 0x20])) {
      FUN_0040bbb0();
      FUN_0040bbe0((DAT_0064f360 + param_2 * 0x58));
      FUN_0040fe10();
      bVar2 = 0;
      (local_18 < 3) (local_18 = 0; local_18 = (local_18 < 3); local_18 = (local_18 + 1)) {
        if ((DAT_0064f37e[(param_2 * 0x58 + local_18)] === DAT_006560fd[param_1 * 0x20])) {
          bVar2 = 1;
        }
      }
      if (bVar2) {
        FUN_0040bc10(0x133);
      }
      else {
        FUN_0040bc10(0x134);
      }
      FUN_0040fe10();
      FUN_0040ff00(s32((DAT_0064b168 + s8(DAT_006560fd[param_1 * 0x20]) * 4), 0))
      ;
      FUN_0043c810();
      FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
    }
    uVar7 = 0;
    uVar6 = 0;
    uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x284), 0), 0, 0);
    FUN_0059edf0(uVar4, uVar6, uVar7);
    cVar5 = (s8(DAT_00656100[param_1 * 0x20]) !== param_2);
    if (cVar5) {
      uVar7 = 0;
      uVar6 = 1;
      uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x288), 0), 1, 0);
      FUN_0059edf0(uVar4, uVar6, uVar7);
    }
    if ((DAT_0064f379[param_2 * 0x58] < 0xda)) {
      uVar7 = 0;
      uVar6 = 2;
      uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x28c), 0), 2, 0);
      FUN_0059edf0(uVar4, uVar6, uVar7);
      cVar5 = (cVar5 + 1);
    }
    local_31c = 0;
    if ((cVar5 !== 0)) {
      local_31c = FUN_0040bc80(0);
    }
  }
  if ((local_31c !== 1)) {
    if ((local_31c !== 2)) {
      local_8 = -1;
      FUN_00590607();
      FUN_0059061d();
      return;
    }
    if ((DAT_006560f6[param_1 * 0x20] === 0x31)) {
      FUN_0046e020(0x16, 1, 0, 0);
    }
    else {
      FUN_0046e020(0x2c, 1, 0, 0);
    }
    w16((DAT_0064f35c + param_2 * 0x58), 0, (s8(DAT_0064b1c8[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) * u8(DAT_0064bccc) + s16((DAT_0064f35c + param_2 * 0x58), 0)));
    FUN_0040ff60(0, (DAT_0064f360 + param_2 * 0x58));
    FUN_00421da0(0, s8(DAT_0064b1c8[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) * u8(DAT_0064bccc));
    if ((DAT_0064f379[param_2 * 0x58] < 1)) {
      local_318 = ((~s8(DAT_0064f379[param_2 * 0x58])) + 1);
    }
    else {
      local_318 = s8(DAT_0064f379[param_2 * 0x58]);
    }
    local_310 = (u8(DAT_0064c48c[local_318 * 8]) * u8(DAT_0064bccc) - ((s16((DAT_0064f35c + param_2 * 0x58), 0)) << 16 >> 16));
    if ((local_310 < 0)) {
      local_310 = 0;
    }
    FUN_00421da0(1, local_310);
    FUN_00421ea0(s_ADDTOWONDER_00634d20);
    if ((DAT_00656100[param_1 * 0x20] !== 0xff)) {
      w32((DAT_0064f344 + u8(DAT_00656100[param_1 * 0x20]) * 0x58), 0, (s32((DAT_0064f344 + u8(DAT_00656100[param_1 * 0x20]) * 0x58), 0) | 0x20000));
    }
    FUN_005b6042(param_1, 1);
    if ((2 < DAT_00655b02)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
    }
    local_8 = -1;
    FUN_00590607();
    FUN_0059061d();
    return;
  }
  FUN_00440750(param_1, param_2);
  if ((2 < DAT_00655b02)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
  }
  local_8 = -1;
  FUN_00590607();
  FUN_0059061d();
  return;
}
