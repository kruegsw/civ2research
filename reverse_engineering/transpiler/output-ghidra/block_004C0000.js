// Block 0x004C0000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 92

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_004c02d8 (param_1, param_2)

 {
  let iVar1;
  let local_c;

  local_c = 0;
  if ((iVar1 !== 0)) {
    local_c = 1;
  }
  return local_c;
}


 export function FUN_004c03ae (param_1, param_2, param_3)

 {
  let iVar1;
  let local_8;

  local_8 = 0;
  if ((param_3 < 0x27)) {
    iVar1 = FUN_004bd9f0(param_1, s8(DAT_0064c48e[param_3 * 8]));
    if ((iVar1 !== 0)) {
      if ((param_2 < 0)) {
        local_8 = 1;
      }
      else {
        iVar1 = FUN_0043d20a(param_2, param_3);
        if ((iVar1 === 0)) {
          local_8 = 1;
        }
      }
    }
  }
  else {
    local_8 = FUN_004c02d8(param_1, (param_3 + -39));
  }
  return local_8;
}


 export function FUN_004c09b0 (param_1)

 {
  let iVar1;
  let iVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_c = -1;
  local_18 = -1;
  local_14 = 0;
  (local_10 < 0x64) (local_10 = 0; local_10 = (local_10 < 0x64); local_10 = (local_10 + 1)) {
    iVar1 = FUN_004bfdbe(param_1, local_10);
    if ((((local_10 - u8(DAT_0064c6b0[param_1 * 0x594])) % 3) !== 0)) {
      local_14 = (local_14 + 1);
      if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        iVar1 = FUN_004bdb2c(param_1, local_10);
        if (((iVar1 === 1) || ((iVar1 + -1) < 0))) {
          local_8 = 0;
        }
        else {
          local_8 = _rand();
          iVar1 = FUN_004bdb2c(param_1, local_10);
          local_8 = (local_8 % iVar1);
        }
      }
      else {
        iVar1 = _rand();
        iVar2 = FUN_004bdb2c(param_1, local_10);
        local_8 = (((iVar1 % 3) + iVar2) + -1);
      }
      if ((local_c < local_8)) {
        local_c = local_8;
        local_18 = local_10;
      }
    }
  }
  return local_18;
}


 export function FUN_004c0b51 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  local_c = param_5;
  if (((param_4 & 1) !== 0)) {
    local_c = (param_5 + 0x26);
  }
  local_8 = ((0x14 - param_7) / 2 | 0);
  local_10 = (param_6 - local_8);
  FUN_005cef31(DAT_ffffffe0, param_2, local_c, local_10);
  return 0;
}


 export function FUN_004c0be8 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let local_28;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_18 = -2;
  local_10 = param_5;
  if (((param_4 & 1) !== 0)) {
    local_10 = (param_5 + 0x26);
  }
  local_14 = param_6;
  local_8 = FUN_00472cf0(0x30, -2);
  local_c = ((local_8 - param_7) / 2 | 0);
  local_14 = (local_14 - local_c);
  FUN_0047df20(local_18);
  FUN_005cef31(DAT_ffffffd8, param_2, local_10, local_14);
  FUN_0047df50();
  return 0;
}


 export function FUN_004c0c83 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  local_c = param_5;
  if (((param_4 & 1) !== 0)) {
    local_c = (param_5 + 0x26);
  }
  local_8 = ((0x14 - param_7) / 2 | 0);
  local_10 = (param_6 - local_8);
  FUN_005cef31(DAT_ffffffe0, param_2, local_c, local_10);
  return 0;
}


 export function FUN_004c0cf7 (param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let uVar3;
  let uVar4;
  let aiStack_4c0;
  let aiStack_334;
  let local_324;
  let local_320;
  let local_31c;
  let local_318;
  let local_314;
  let local_310;
  let local_30c;
  let local_308;
  let local_22c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004c1946;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x2000);
  local_8 = 0;
  aiStack_334 = 0;
  while ((3 < local_22c)) {
    while ((local_22c !== 1)) {
      local_318 = 0;
      FUN_0040ffa0(s_RESEARCHGOAL_0062dbc8, 1);
      if ((UNNAMED === 0)) {
        FUN_0059e4e6(2);
        if ((DAT_00626a24 === 0)) {
          FUN_0043c990(0x4b, 0);
          local_308 = DAT_fffffcf8;
        }
        (local_31c < 0x64) (local_31c = 0; local_31c = (local_31c < 0x64); local_31c = (local_31c + 1)) {
          if ((DAT_0062768f[local_31c * 0x10] !== 0xfe)) {
            FUN_0040bbb0();
            FUN_0040ff00(s32((DAT_00627684 + local_31c * 0x10), 0));
            if ((local_31c === 0x59)) {
              FUN_0040fe10();
              FUN_0040ff30((u8(DAT_0064c6b1[param_1 * 0x594]) + 1));
            }
            FUN_0059edf0(DAT_00679640, local_31c, 0);
            local_318 = (local_318 + 1);
          }
        }
      }
      else if ((UNNAMED === 1)) {
        if ((DAT_00626a24 === 0)) {
          FUN_0043c990(0x4b, 0);
          local_308 = DAT_fffffcf8;
        }
        (local_30c < 0x3e) (local_30c = 0; local_30c = (local_30c < 0x3e); local_30c = (local_30c + 1)) {
          local_31c = s8(DAT_0064b1cb[local_30c * 0x14]);
          if ((((s16((DAT_0064c6aa + param_1 * 0x594), 0)) << 16 >> 16) !== local_31c)) {
            FUN_0040bbb0();
            FUN_0040ff00(s32((DAT_0064b1b8 + local_30c * 0x14), 0));
            FUN_0040fe10();
            FUN_0040bbe0(DAT_0062dbd8);
            FUN_0040fea0();
            FUN_0040ff00(s32((DAT_00627684 + local_31c * 0x10), 0));
            FUN_0040fed0();
            FUN_0059edf0(DAT_00679640, local_30c, 0);
            local_318 = (local_318 + 1);
          }
        }
      }
      else if ((UNNAMED === 2)) {
        if ((DAT_00626a24 === 0)) {
          FUN_0043c990(0x4b, 0);
          local_308 = DAT_fffffcf8;
        }
        (local_320 < 0x43) (local_320 = 0; local_320 = (local_320 < 0x43); local_320 = (local_320 + 1)) {
          local_31c = s8(DAT_0064c48e[local_320 * 8]);
          if ((((s16((DAT_0064c6aa + param_1 * 0x594), 0)) << 16 >> 16) !== local_31c)) {
            FUN_0040bbb0();
            FUN_0040ff00(s32((DAT_0064c488 + local_320 * 8), 0));
            FUN_0040fe10();
            FUN_0040bbe0(DAT_0062dbdc);
            FUN_0040fea0();
            FUN_0040ff00(s32((DAT_00627684 + local_31c * 0x10), 0));
            FUN_0040fed0();
            FUN_0059edf0(DAT_00679640, local_320, 0);
            local_318 = (local_318 + 1);
          }
        }
      }
      if ((local_318 === 0)) {
        local_8 = -1;
        FUN_004c193a();
        FUN_004c1950();
        return;
      }
      local_310 = 0;
      if ((UNNAMED !== 0)) {
        uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x30c), 0));
        FUN_0059f2a3(uVar1);
        w32(DAT_fffffccc, (local_310 + 2), 0);
        local_310 = (local_310 + 1);
      }
      if ((UNNAMED !== 1)) {
        uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x310), 0));
        FUN_0059f2a3(uVar1);
        w32(DAT_fffffccc, (local_310 + 2), 1);
        local_310 = (local_310 + 1);
      }
      if ((UNNAMED !== 2)) {
        uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x314), 0));
        FUN_0059f2a3(uVar1);
        w32(DAT_fffffccc, (local_310 + 2), 2);
        local_310 = (local_310 + 1);
      }
      local_324 = FUN_0040bc80(0);
      if ((local_324 < 0)) {
        local_8 = -1;
        FUN_004c193a();
        FUN_004c1950();
        return;
      }
      if ((local_22c !== 1)) {
        if ((UNNAMED === 0)) {
          FUN_00566584(local_324);
        }
        else if ((UNNAMED === 1)) {
          local_31c = s8(DAT_0064b1cb[local_324 * 0x14]);
          local_30c = local_324;
          FUN_0040ffa0(s_HELPON_0062dbe0, 1);
          uVar4 = 0;
          uVar3 = 0;
          uVar1 = FUN_00428b0c(s32((DAT_0064b1b8 + local_30c * 0x14), 0), 0, 0);
          FUN_0059edf0(uVar1, uVar3, uVar4);
          uVar4 = 0;
          uVar3 = 1;
          uVar1 = FUN_00428b0c(s32((DAT_00627684 + local_31c * 0x10), 0), 1, 0);
          FUN_0059edf0(uVar1, uVar3, uVar4);
          local_324 = FUN_0040bc80(0);
          if ((local_324 === 0)) {
            FUN_005ad998(local_30c);
          }
          if ((local_324 === 1)) {
            FUN_00566584(local_31c);
          }
        }
        else if ((UNNAMED === 2)) {
          local_31c = s8(DAT_0064c48e[local_324 * 8]);
          local_320 = local_324;
          FUN_0040ffa0(s_HELPON_0062dbe8, 1);
          uVar4 = 0;
          uVar3 = 0;
          uVar1 = FUN_00428b0c(s32((DAT_0064c488 + local_320 * 8), 0), 0, 0);
          FUN_0059edf0(uVar1, uVar3, uVar4);
          uVar4 = 0;
          uVar3 = 1;
          uVar1 = FUN_00428b0c(s32((DAT_00627684 + local_31c * 0x10), 0), 1, 0);
          FUN_0059edf0(uVar1, uVar3, uVar4);
          local_324 = FUN_0040bc80(0);
          if ((local_324 === 0)) {
            FUN_0059a2e6(local_320);
          }
          if ((local_324 === 1)) {
            FUN_00566584(local_31c);
          }
        }
      }
    }
    if ((3 < local_22c)) {
    local_324 = s8(DAT_0064b1cb[local_324 * 0x14]);
  }
  else if ((UNNAMED === 2)) {
    local_324 = s8(DAT_0064c48e[local_324 * 8]);
  }
  local_318 = 0;
  local_314 = 0;
  local_31c = 0;
  do {
    if ((0x63 < local_31c)) {
      FUN_004271e8(0, s32((DAT_00627684 + local_324 * 0x10), 0));
      if ((local_314 === 0)) {
        if ((param_3 === 0)) {
          FUN_00421ea0(s_RESEARCHNONE_0062dbfc);
        }
        else {
          FUN_00421ea0(s_STEALNONE_0062dbf0);
        }
        local_8 = -1;
        FUN_004c193a();
        FUN_004c1950();
        return;
      }
      if ((param_3 === 0)) {
        FUN_0043c9d0(s_RESEARCHTHESE_0062dc18);
      }
      else {
        FUN_0043c9d0(s_STEALTHESE_0062dc0c);
      }
      (local_14 < local_314) (local_14 = 0; local_14 = (local_14 < local_314); local_14 = (local_14 + 1)) {
        local_31c = s32(DAT_fffffb40, local_14);
        FUN_0040bbb0();
        FUN_0040ff00(s32((DAT_00627684 + local_31c * 0x10), 0));
        if ((2 < local_314)) {
          FUN_00421d30();
        }
        else if (((local_314 + -2) === local_14)) {
          FUN_0040fe10();
        }
        if (((local_314 + -2) === local_14)) {
          FUN_0040bc10(0xb5);
        }
        if (((local_314 + -1) === local_14)) {
          FUN_0043c810();
        }
        FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
      }
      FUN_0040bc80(0);
      local_8 = -1;
      FUN_004c193a();
      FUN_004c1950();
      return;
    }
    if ((iVar2 === 0)) {
      if ((param_3 === 0)) {
        iVar2 = FUN_004bd9f0(param_1, s8(DAT_0062768e[local_31c * 0x10]));
        if ((((s16((DAT_0064c6aa + param_1 * 0x594), 0)) << 16 >> 16) !== local_31c)) {
          if (((DAT_00655af0 & 0x80) === 0)) {
            iVar2 = ((local_31c - (u8(DAT_0064c6b0[param_1 * 0x594]) + param_2)) % 3);
            goto joined_r0x004c1729;
          }
          goto LAB_004c1734;
        }
      }
      else {
        iVar2 = FUN_004bd9f0(param_3, local_31c);
 joined_r0x004c1729: :
        if ((iVar2 !== 0)) {
 LAB_004c1734: :
          if ((DAT_0062768f[local_31c * 0x10] !== 0xfe)) {
            local_318 = (local_318 + 1);
            iVar2 = FUN_004bdaa5(local_324, local_31c);
            if ((iVar2 !== 0)) {
              w32(DAT_fffffb40, local_314, local_31c);
              local_314 = (local_314 + 1);
            }
          }
        }
      }
    }
    local_31c = (local_31c + 1);
  } ( true );
}


 export function FUN_004c193a ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004c1950 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004c195e (param_1, param_2)

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_630;
  let local_628;
  let local_624;
  let local_620;
  let aiStack_61c;
  let local_608;
  let local_604;
  let local_600;
  let local_524;
  let local_30c;
  let local_308;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004c2194;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_0059db08(0x4000);
  local_8 = ((((local_8) >> 8) << 8) | 1);
  local_604 = FUN_004c09b0(param_1);
  if ((DAT_00654fa8 === 0)) {
    while ((local_620 === 0)) {
      iVar1 = local_604;
      if ((param_2 === 0)) {
        FUN_0040bbb0();
        FUN_0040ff00(s32((DAT_00627684 + iVar1 * 0x10), 0));
        if ((iVar1 === 0x59)) {
          FUN_0040fe10();
          FUN_0040ff30((u8(DAT_0064c6b1[param_1 * 0x594]) + 1));
        }
        FUN_0040ff60(0, DAT_00679640);
        local_630 = 0;
        local_620 = 0;
        (local_608 < 0x3e) (local_608 = 0; local_608 = (local_608 < 0x3e); local_608 = (local_608 + 1)) {
          if ((local_620 < 5)) {
            w32(DAT_fffff9e4, local_620, local_608);
            local_620 = (local_620 + 1);
          }
        }
        (local_628 < 0x43) (local_628 = 1; local_628 = (local_628 < 0x43); local_628 = (local_628 + 1)) {
          if ((local_620 < 5)) {
            w32(DAT_fffff9e4, local_620, (-local_628));
            local_620 = (local_620 + 1);
          }
        }
        if ((local_620 === 0)) {
          (local_30c < 0x64) (local_30c = 0; local_30c = (local_30c < 0x64); local_30c = (local_30c + 1)) {
            if ((local_620 < 5)) {
              w32(DAT_fffff9e4, local_620, local_30c);
              local_620 = (local_620 + 1);
            }
          }
          if ((local_620 !== 0)) {
            local_630 = 2;
          }
        }
        else {
          local_630 = 1;
        }
        FUN_0040bbb0();
        FUN_0040bbe0(s_SCIENCE_0062dc28);
        FUN_0040ff30(local_630);
        local_308 = DAT_fffffcf8;
        FUN_0059ec88((DAT_00646cb8 + (s8(DAT_0062768d[iVar1 * 0x10]) * 0x3c + s8(DAT_0062768c[iVar1 * 0x10]) * 0xf0)), (((DAT_00633584 === 0) - 1) & 8), 0);
        if ((local_630 !== 0)) {
          FUN_0040bbb0();
          (local_14 < local_620) (local_14 = 0; local_14 = (local_14 < local_620); local_14 = (local_14 + 1)) {
            if ((local_630 === 1)) {
              local_608 = s32(DAT_fffff9e4, local_14);
              if ((local_608 < 0)) {
                FUN_0040ff00(s32((DAT_0064c488 + local_608 * -8), 0));
              }
              else {
                FUN_0040ff00(s32((DAT_0064b1b8 + local_608 * 0x14), 0));
              }
            }
            else {
              FUN_0040ff00(s32((DAT_00627684 + s32(DAT_fffff9e4, local_14) * 0x10), 0));
            }
            if ((local_14 < (local_620 + -1))) {
              if ((local_620 < 3)) {
                FUN_0040fe10();
              }
              else {
                FUN_00421d30();
              }
              if (((local_620 + -2) === local_14)) {
                FUN_0040bc10(0xdb);
                FUN_0040fe10();
              }
            }
            else {
              FUN_0043c810();
            }
          }
          FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
        }
        iVar1 = FUN_00421bb0();
        FUN_005a5f34(0, (iVar1 + -0x12c));
      }
      iVar1 = FUN_004bd9f0(param_1, 0x26);
      FUN_004271e8(0, s32(((DAT_00628420 + 0xc4) + u8((iVar1 === 0)) * -4), 0));
      FUN_0043c9d0(s_RESEARCH_0062dc38);
      if (((None & 2) !== 0)) {
        FUN_0059e783(5, -0x3e7);
      }
      local_600 = DAT_fffffa00;
      FUN_0043c990(0x4b, 0);
      local_620 = 0;
      (local_624 < 0x64) (local_624 = 0; local_624 = (local_624 < 0x64); local_624 = (local_624 + 1)) {
        if ((((local_624 - u8(DAT_0064c6b0[param_1 * 0x594])) % 3) !== 0)) {
          FUN_0040bbb0();
          FUN_0040ff00(s32((DAT_00627684 + local_624 * 0x10), 0));
          if ((local_624 === 0x59)) {
            FUN_0040fe10();
            FUN_0040ff30((u8(DAT_0064c6b1[param_1 * 0x594]) + 1));
          }
          FUN_0059edf0(DAT_00679640, local_624, 0);
          local_620 = (local_620 + 1);
        }
      }
      iVar1 = local_604;
      if ((local_620 === 0)) {
        FUN_0059db65();
        FUN_00484d52();
      }
      if ((local_524 === 2)) {
        FUN_004c0cf7(param_1, 0, 0);
      }
      else {
        if ((local_524 === 0))


 export function FUN_004c217c ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004c2188 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004c219e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004c21ad (param_1)

 {
  FUN_004c195e(param_1, 0);
  return;
}


 export function FUN_004c21d5 (param_1, param_2)

 {
  let sVar1;
  let iVar2;
  let uVar3;
  let unaff_FS_OFFSET;
  let local_30c;
  let local_304;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004c276f;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  sVar1 = s16((DAT_0064c6aa + param_1 * 0x594), 0);
  if ((s16((DAT_0064c6aa + param_1 * 0x594), 0) < 0)) {
    FUN_004c21ad(param_1);
    sVar1 = s16((DAT_0064c6aa + param_1 * 0x594), 0);
  }
  local_30c = ((sVar1) << 16 >> 16);
  if ((local_30c < 0)) {
    local_8 = -1;
    FUN_004c2763();
    FUN_004c2779();
    return;
  }
  if ((DAT_0062db00 !== 2)) {
    w16((DAT_0064c6a8 + param_1 * 0x594), 0, 0);
  }
  w16((DAT_0064c6aa + param_1 * 0x594), 0, 0xffff);
  FUN_004bf05b(param_1, local_30c, param_2, 0, 0);
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    if ((DAT_00654fa8 === 0)) {
      uVar3 = FUN_00493d13(param_1);
      FUN_00421d60(0, uVar3);
      iVar2 = FUN_004bd9f0(param_1, 0x26);
      FUN_004271e8(1, s32(((DAT_00628420 + 0xc4) + u8((iVar2 === 0)) * -4), 0));
      FUN_0040bbb0();
      FUN_0040ff00(s32((DAT_00627684 + local_30c * 0x10), 0));
      if ((local_30c === 0x59)) {
        FUN_0040fe10();
        FUN_0040ff30(DAT_0064c6b1[param_1 * 0x594]);
      }
      FUN_00421d60(2, DAT_00679640);
      FUN_0043c9d0(s_CIVADVANCE_0062dc44);
      FUN_0059ec88((DAT_00646cb8 + (s8(DAT_0062768c[local_30c * 0x10]) * 0xf0 + s8(DAT_0062768d[local_30c * 0x10]) * 0x3c)), 0, 0);
      local_304 = DAT_fffffcfc;
      FUN_0040bc80(0);
      if (((None & 8) !== 0)) {
        FUN_00566584(local_30c);
      }
      if ((DAT_00654fa8 === 0)) {
        FUN_004bee56(param_1);
      }
      if ((s8(DAT_0064b1df) === local_30c)) {
        FUN_00410030(s_NEWXFORM_0062dc50, DAT_00641884, 8);
      }
      if ((local_30c === 0x12)) {
        FUN_00410030(s_NEWFORTRESS_0062dc5c, DAT_0063fc58, 0);
      }
      if ((s8(DAT_0064c58e) === local_30c)) {
        FUN_00410030(s_NEWAIRLIFT_0062dc68, DAT_006458e0, 8);
      }
      if ((local_30c === 0x43)) {
        FUN_00410030(s_NEWRAILROAD_0062dc74, DAT_0064292c, 8);
      }
      if ((s8(DAT_0064c54e) === local_30c)) {
        FUN_0043c9d0(s_NEWFARMLAND_0062dc80);
        FUN_0059ec88(DAT_00645700, 0, 0);
        FUN_0059ec88(DAT_006446f4, 0, 0);
        FUN_0040bc80(0);
      }
      if ((s8(DAT_0064b2cf) === local_30c)) {
        FUN_004c4210(0, (((DAT_0064b2cf >> 7) << 8) | DAT_0064bcdb));
        FUN_00410030(s_NEWPARADROP_0062dc8c, DAT_00641b54, 8);
      }
      if ((DAT_00655af8 !== 0)) {
        FUN_004c21ad(param_1);
        FUN_004bea84(param_1, local_30c);
      }
      local_8 = -1;
      FUN_004c2763();
      FUN_004c2779();
      return;
    }
    local_8 = -1;
    FUN_004c2763();
    FUN_004c2779();
    return;
  }
  iVar2 = IsTracking(DAT_006a91b8);
  FUN_00442541(param_1, -1);
  if ((s8(DAT_0064f348[iVar2 * 0x58]) === param_1)) {
    FUN_004eb4ed(iVar2, 0);
  }
  local_8 = -1;
  FUN_004c2763();
  FUN_004c2779();
  return;
}


 export function FUN_004c2763 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004c2779 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004c2788 (param_1)

 {
  let uVar1;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;

  uVar1 = (u8(DAT_0064c6b0[param_1 * 0x594]) + u8(DAT_0064c6b2[param_1 * 0x594]));
  if ((uVar1 < 2)) {
    uVar1 = 1;
  }
  local_14 = FUN_005adfa0(DAT_00655b08, 0, 4);
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    local_14 = (0xe - local_14);
  }
  else {
    local_14 = (local_14 * 2 + 6);
  }
  if ((DAT_0064bcb4 === 0)) {
    if ((uVar1 < (u8(DAT_0064c6b0[u8(DAT_00655c20) * 0x594]) + u8(DAT_0064c6b2[u8(DAT_00655c20) * 0x594])))) {
      if ((DAT_00655b08 !== 0)) {
        local_14 = (local_14 + -1);
      }
      if ((0x96 < DAT_00655af8)) {
        local_14 = (local_14 + -1);
      }
    }
    else {
      local_14 = (local_14 + ((uVar1 - (u8(DAT_0064c6b0[u8(DAT_00655c20) * 0x594]) + u8(DAT_0064c6b2[u8(DAT_00655c20) * 0x594]))) / 3 | 0));
    }
    local_10 = 0;
    if ((0x13 < uVar1)) {
      local_10 = FUN_005adfa0((uVar1 - ((((DAT_00655af8) << 16 >> 16) + ((((DAT_00655af8) << 16 >> 16) >> 0x1f) & 7)) >> 3)), 0, 6);
    }
    local_14 = (local_14 + local_10);
  }
  if (((DAT_00655af0 & 0x80) === 0)) {
    if ((DAT_0064bcd3 !== 0xa)) {
      local_14 = (u8(DAT_0064bcd3) * local_14 / 0xa | 0);
    }
  }
  else if ((DAT_0064bcb2 !== 0xa)) {
    local_14 = (((DAT_0064bcb2) << 16 >> 16) * local_14 / 0xa | 0);
  }
  local_1c = (local_14 * 3 >> 2);
  if (((u8(DAT_0064c6b0[param_1 * 0x594]) + u8(DAT_0064c6b2[param_1 * 0x594])) < 0x14)) {
    local_1c = ((u8(DAT_0064c6b0[param_1 * 0x594]) + u8(DAT_0064c6b2[param_1 * 0x594])) * local_1c / 0x14 | 0);
  }
  local_14 = (local_14 + local_1c);
  if ((0x43 < DAT_00655b1a)) {
    local_14 = (local_14 * 0x43 / ((DAT_00655b1a) << 16 >> 16) | 0);
  }
  if (((DAT_00655af0 & 4) !== 0)) {
    local_14 = ((local_14 * 5 + ((local_14 * 5 >> 0x1f) & 3)) >> 2);
  }
  if (((DAT_00655af0 & 8) !== 0)) {
    local_14 = ((local_14 << 2) / 5 | 0);
  }
  if ((local_14 < (0xb - uVar1))) {
    local_14 = (0xb - uVar1);
  }
  local_18 = local_14 * uVar1;
  if ((0x7d00 < local_18)) {
    local_18 = 0x7d00;
  }
  return local_18;
}


 export function FUN_004c2b73 (param_1, param_2)

 {
  let sVar1;
  let iVar2;

  if ((0 < param_2)) {
    w16((DAT_0064c6a8 + param_1 * 0x594), 0, (s16((DAT_0064c6a8 + param_1 * 0x594), 0) + ((param_2) & 0xFFFF)));
    if ((0xffff < s16((DAT_0064c6aa + param_1 * 0x594), 0))) {
      sVar1 = s16((DAT_0064c6a8 + param_1 * 0x594), 0);
      iVar2 = FUN_004c2788(param_1);
      if ((iVar2 <= ((sVar1) << 16 >> 16))) {
        FUN_004c21d5(param_1, 0);
      }
      if (((s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0x20) !== 0)) {
        w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0xffdf));
        FUN_004c21d5(param_1, 0);
      }
    }
    if ((s16((DAT_0064c6aa + param_1 * 0x594), 0) < 0)) {
      if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        FUN_004904c0(PTR_s_TUTORIAL_00627678, s_FIRSTCIV_0062dc98, DAT_00643af8, 0);
      }
      FUN_004c21ad(param_1);
    }
  }
  return;
}


 export function FUN_004c4210 (param_1, param_2)

 {
  w32((DAT_0063cc30 + param_1 * 4), 0, u8(param_2));
  return;
}


 export function FUN_004c4240 (param_1, param_2, param_3)

 {
  FUN_004a6b80(DAT_006359d4, param_1, 0, param_2, param_3);
  return;
}


 export function FUN_004c4280 ()

 {
  FUN_0041f8d9();
  return;
}


 export function FUN_004c42a0 (param_1, param_2)

 {
  let cVar1;
  let cVar2;
  let iVar3;
  let bVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let pbVar8;
  let iVar9;
  let uVar10;
  let local_14;
  let local_8;

  iVar3 = param_1;
  local_8 = 1;
  cVar1 = DAT_006560f7[param_1 * 0x20];
  iVar5 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar6 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  bVar4 = FUN_005b89bb(iVar5, iVar6);
  uVar10 = u8(bVar4);
  cVar2 = DAT_006560ff[param_1 * 0x20];
  DAT_006560ff[param_1 * 0x20] = ((param_2) & 0xFF);
  /* switch */ () {
  case 4 :
    local_8 = ((s8(DAT_00627cc8[uVar10 * 0x18]) / 2 | 0) + 3);
    break;
  case 5 :
    uVar7 = FUN_005b94d5(iVar5, iVar6);
    local_8 = (((-u8(((uVar7 & 0x10) === 0))) & -2) + 4) * s8(DAT_00627cc8[uVar10 * 0x18]);
    pbVar8 = FUN_005b8931(iVar5, iVar6);
    if (((_MEM[pbVar8] & 0x80) !== 0)) {
      local_8 = (local_8 + 2);
    }
    break;
  case 6 :
    local_8 = s8(DAT_00627cd2[uVar10 * 0x18]);
    break;
  case 7 :
    local_8 = s8(DAT_00627cd3[uVar10 * 0x18]);
    break;
  case 8 :
    local_8 = s8(DAT_00627cc8[uVar10 * 0x18]) * u8(DAT_0064bcd4);
    break;
  case 9 :
    local_8 = 4;
    break;
  case 10 :
    local_8 = 4;
  }
  DAT_0062804c = 0;
  FUN_005b6787(param_1);
  local_14 = -1;
  param_1 = FUN_005b2d39(param_1);
  do {
    if ((param_1 < 0)) {
 LAB_004c44ea: :
      if ((-1 < local_14)) {
        DAT_006560fd[iVar3 * 0x20] = (DAT_006560fd[iVar3 * 0x20] + DAT_006560fd[local_14 * 0x20]);
        DAT_006560fd[local_14 * 0x20] = 0;
      }
      DAT_006560fd[iVar3 * 0x20] = (DAT_006560fd[iVar3 * 0x20] + 1);
      if ((DAT_006560f6[iVar3 * 0x20] === 1)) {
        DAT_006560fd[iVar3 * 0x20] = (DAT_006560fd[iVar3 * 0x20] + 1);
      }
      if ((s8(DAT_006560fd[iVar3 * 0x20]) < local_8)) {
        FUN_0047ce1e(iVar5, iVar6, 0, DAT_006d1da0, 1);
        if ((DAT_006560ff[iVar3 * 0x20] !== cVar2)) {
          FUN_0050c494(iVar3, -99, -99);
        }
      }
      else {
        (-1 < param_1) (param_1 = FUN_005b2d39(iVar3); -1 = (-1 < param_1);
            param_1 = FUN_005b2c82(param_1)) {
          if ((s8(DAT_006560ff[param_1 * 0x20]) === param_2)) {
            DAT_006560fd[param_1 * 0x20] = 0;
            DAT_006560ff[param_1 * 0x20] = 0xff;
          }
        }
        /* switch */ () {
        case 4 :
          iVar9 = FUN_005b8ca6(iVar5, iVar6);
          if ((iVar9 < 0)) {
            FUN_005b94fc(iVar5, iVar6, 0x40, 1, 1);
            FUN_005b94fc(iVar5, iVar6, 2, 0, 1);
          }
          break;
        case 5 :
          uVar10 = FUN_005b94d5(iVar5, iVar6);
          if ((iVar9 < 0)) {
            FUN_005b94fc(iVar5, iVar6, 0x10, 1, 1);
          }
          else {
            iVar9 = FUN_004bd9f0(s8(cVar1), 0x43);
            if ((iVar9 !== 0)) {
              FUN_005b94fc(iVar5, iVar6, 0x30, 1, 1);
            }
          }
          break;
        case 6 :
        case 7 :
          if ((DAT_00627cc8[(uVar10 * 0x18 + param_2)] < 0)) {
            if ((param_2 === 6)) {
              uVar10 = FUN_005b94d5(iVar5, iVar6);
              if (((uVar10 & 4) === 0)) {
                FUN_005b94fc(iVar5, iVar6, 8, 0, 1);
                FUN_005b94fc(iVar5, iVar6, 4, 1, 1);
              }
              else {
                iVar9 = FUN_004bd9f0(s8(cVar1), 0x46);
                if ((iVar9 !== 0)) {
                  FUN_005b94fc(iVar5, iVar6, 0xc, 1, 1);
                }
              }
            }
            else {
              FUN_005b94fc(iVar5, iVar6, 4, 0, 1);
              FUN_005b94fc(iVar5, iVar6, 8, 1, 1);
            }
          }
          else {
            FUN_005b9646(iVar5, iVar6, s8(DAT_00627cc8[(uVar10 * 0x18 + param_2)]), 1);
            cVar1 = DAT_00627cc8[(uVar10 * 0x18 + param_2)];
            if (((uVar10 & 4) !== 0)) {
              FUN_005b94fc(iVar5, iVar6, 0xc, 0, 1);
            }
            if (((bVar4 & 0xc) === 8)) {
              FUN_005b94fc(iVar5, iVar6, 8, 0, 1);
            }
          }
          break;
        case 8 :
          FUN_005b9646(iVar5, iVar6, s8(DAT_00627ccd[uVar10 * 0x18]), 1);
          cVar1 = DAT_00627ccd[uVar10 * 0x18];
          if (((uVar10 & 4) !== 0)) {
            FUN_005b94fc(iVar5, iVar6, 0xc, 0, 1);
          }
          if (((bVar4 & 0xc) === 8)) {
            FUN_005b94fc(iVar5, iVar6, 8, 0, 1);
          }
          break;
        case 9 :
          uVar10 = FUN_005b94d5(iVar5, iVar6);
          if (((uVar10 & 0x80) !== 0)) {
            DAT_00655b12 = (DAT_00655b12 + 0xffff);
          }
          FUN_005b94fc(iVar5, iVar6, 0x80, 0, 1);
          break;
        case 10 :
          iVar9 = FUN_005b8ca6(iVar5, iVar6);
          if ((iVar9 < 0)) {
            FUN_005b94fc(iVar5, iVar6, 0x42, 1, 1);
          }
        }
        FUN_005b8b1a(iVar5, iVar6, s8(DAT_006560f7[iVar3 * 0x20]));
        FUN_0047ce1e(iVar5, iVar6, 1, DAT_006d1da0, 1);
        if ((s8(DAT_006560f7[iVar3 * 0x20]) === DAT_006d1da0)) {
          FUN_0056a65e(1);
        }
        if ((DAT_006560ff[iVar3 * 0x20] !== cVar2)) {
          FUN_0050c494(iVar3, -99, -99);
        }
        FUN_0050c6ef(iVar5, iVar6);
      }
      return;
    }
    if ((param_1 !== iVar3)) {
      local_14 = param_1;
      goto LAB_004c44ea;
    }
    param_1 = FUN_005b2c82(param_1);
  } ( true );
}


 export function FUN_004c4ada (param_1)

 {
  let bVar1;
  let iVar2;
  let local_c;
  let local_8;

  DAT_0062804c = 0;
  DAT_006560ff[param_1 * 0x20] = 2;
  if ((0xff < DAT_00656100[param_1 * 0x20])) {
    iVar2 = FUN_0043cf76(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
    if ((iVar2 < 0)) {
      bVar1 = FUN_005b94d5(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
      if ((2 < DAT_0064f349[iVar2 * 0x58])) {
        if ((DAT_00656100[param_1 * 0x20] === 0xff)) {
          local_8 = -1;
        }
        else {
          local_8 = u8(DAT_00656100[param_1 * 0x20]);
        }
        local_c = ((iVar2) & 0xFF);
        DAT_00656100[param_1 * 0x20] = local_c;
        if ((-1 < local_8)) {
          FUN_0050c679(local_8);
        }
        FUN_0050c679(iVar2);
      }
    }
    else if ((2 < DAT_0064f349[iVar2 * 0x58])) {
      if ((DAT_00656100[param_1 * 0x20] === 0xff)) {
        local_8 = -1;
      }
      else {
        local_8 = u8(DAT_00656100[param_1 * 0x20]);
      }
      local_c = ((iVar2) & 0xFF);
      DAT_00656100[param_1 * 0x20] = local_c;
      if ((-1 < local_8)) {
        FUN_0050c679(local_8);
      }
      FUN_0050c679(iVar2);
    }
  }
  FUN_0047cea6(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
  FUN_0050c494(param_1, -99, -99);
  return;
}


 export function FUN_004c4d1e (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let local_10;

  iVar1 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar2 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  if ((s8(DAT_006560f7[param_1 * 0x20]) === DAT_006d1da0)) {
    FUN_004105f8(iVar1, iVar2, s8(DAT_006560f7[param_1 * 0x20]));
  }
  if ((-1 < param_2)) {
    if ((param_3 !== 0)) {
      FUN_005f22d0((DAT_0064f360 + param_2 * 0x58), param_3);
    }
    FUN_005b4391(param_1, 1);
    FUN_005b94fc(iVar1, iVar2, 0x7c, 0, 1);
    (local_10 < 8) (local_10 = 1; local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
      FUN_005b8b1a(iVar1, iVar2, local_10);
    }
    FUN_0047ce1e(iVar1, iVar2, 1, DAT_006d1da0, 1);
  }
  return;
}


 export function FUN_004c4e6d (param_1)

 {
  let bVar1;
  let bVar2;
  let iVar3;

  DAT_0062804c = 0;
  bVar1 = DAT_006560f7[param_1 * 0x20];
  bVar2 = DAT_006560ff[param_1 * 0x20];
  DAT_0062d044 = s8(bVar1);
  if (((bVar2 & 0x10) !== 0)) {
    DAT_0062d044 = -1;
  }
  iVar3 = FUN_004adafc(param_1);
  if ((iVar3 === 8)) {
    if ((DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 4)) {
      DAT_006560fd[param_1 * 0x20] = (((DAT_00655af8) & 0xFF) & 7);
    }
  }
  else {
    iVar3 = FUN_0059062c(param_1, iVar3, 3);
    if ((iVar3 === 0)) {
      return;
    }
    w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) & 0xff7f));
    if (((bVar2 & 0x10) === 0)) {
      DAT_006560ff[param_1 * 0x20] = 0xff;
      w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) | 0x80));
      if ((DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 4)) {
        DAT_006560fd[param_1 * 0x20] = (((DAT_00655af8) & 0xFF) & 7);
      }
    }
  }
  DAT_0062d044 = -1;
  return;
}


 export function FUN_004c50d0 (param_1, param_2)

 {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let pbVar5;

  iVar2 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar3 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  bVar1 = DAT_006560f7[param_1 * 0x20];
  iVar4 = FUN_0043d07a(iVar2, iVar3, -1, -1, -1);
  if ((iVar4 === 0)) {
    iVar4 = FUN_005b8931(iVar2, iVar3);
    pbVar5 = (iVar4 + 1);
    if ((param_2 < 1)) {
      if (((_MEM[pbVar5] & 0x10) !== 0)) {
        if (((_MEM[pbVar5] & 0x20) === 0)) {
          FUN_005b94fc(iVar2, iVar3, 0x10, 0, 1);
        }
        else {
          FUN_005b94fc(iVar2, iVar3, 0x20, 0, 1);
        }
      }
      else if (((_MEM[pbVar5] & 0xc) === 0)) {
        if (((_MEM[pbVar5] & 0x40) === 0)) {
          if (((_MEM[pbVar5] & 0x20) === 0)) {
            FUN_005b94fc(iVar2, iVar3, 0x10, 0, 1);
          }
          else {
            FUN_005b94fc(iVar2, iVar3, 0x20, 0, 1);
          }
        }
        else {
          FUN_005b94fc(iVar2, iVar3, 0x42, 0, 1);
        }
      }
      else if (((_MEM[pbVar5] & 8) === 0)) {
        FUN_005b94fc(iVar2, iVar3, 4, 0, 1);
      }
      else {
        FUN_005b94fc(iVar2, iVar3, 8, 0, 1);
      }
    }
    else {
      FUN_005b94fc(iVar2, iVar3, param_2, 0, 1);
    }
    iVar4 = FUN_0043d07a(iVar2, iVar3, -1, -1, -1);
    if ((-1 < iVar4)) {
      FUN_005b8b1a(iVar2, iVar3, s8(DAT_006560f7[param_1 * 0x20]));
      FUN_005b8b1a(iVar2, iVar3, s8(DAT_0064f348[iVar4 * 0x58]));
      FUN_00467825(s8(DAT_006560f7[param_1 * 0x20]), s8(DAT_0064f348[iVar4 * 0x58]), 0x2000);
      if ((DAT_0064f348[iVar4 * 0x58] !== DAT_006560f7[param_1 * 0x20])) {
        FUN_0049301b(s8(DAT_006560f7[param_1 * 0x20]), iVar2, iVar3, 0, 4);
      }
    }
    FUN_0047ce1e(iVar2, iVar3, 1, DAT_006d1da0, 1);
    FUN_005b6787(param_1);
  }
  return;
}


 export function FUN_004c5408 (param_1)

 {
  let local_8;

  local_8 = 1;
  /* switch */ ((DAT_006560ff) [param_1 * 0x20  ]) {
  case 1 :
    FUN_004c4ada(param_1);
    break;
  default :
    local_8 = 0;
    break;
  case 4 :
  case 5 :
  case 6 :
  case 7 :
  case 8 :
  case 9 :
  case 10 :
    FUN_004c42a0(param_1, s8(DAT_006560ff[param_1 * 0x20]));
    break;
  case 0xb :
  case 0x1b :
    FUN_004c4e6d(param_1);
  }
  return local_8;
}


 export function FUN_004c54da (param_1)

 {
  let bVar1;
  let bVar2;
  let cVar3;
  let cVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let uVar11;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_20;
  let local_14;
  let local_c;
  let local_8;

  iVar5 = param_1;
  local_8 = 0x3e7;
  bVar1 = DAT_006560f6[param_1 * 0x20];
  iVar6 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar7 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  bVar2 = DAT_006560f7[param_1 * 0x20];
  local_20 = -1;
  if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0)) {
    local_20 = FUN_005b8a81(iVar6, iVar7);
  }
  DAT_0063f660 = 0x270f;
  local_14 = -1;
  (local_30 < ((DAT_00655b18) << 16 >> 16)) (local_30 = 0; local_30 = (local_30 < ((DAT_00655b18) << 16 >> 16)); local_30 = (local_30 + 1)) {
    if ((iVar8 < DAT_0063f660)) {
      local_14 = local_30;
      DAT_0063f660 = iVar8;
    }
  }
  if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 1)) {
    (param_1 < ((DAT_00655b16) << 16 >> 16)) (param_1 = 0; param_1 = (param_1 < ((DAT_00655b16) << 16 >> 16)); param_1 = (param_1 + 1)) {
      if ((iVar8 < local_8)) {
        local_38 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
        local_40 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
        local_8 = iVar8;
      }
    }
    iVar8 = FUN_005b8d15(iVar6, iVar7);
    if ((-1 < iVar8)) {
      if ((((1 << (bVar2 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        return;
      }
      FUN_005b6787(iVar5);
      return;
    }
  }
  local_c = 0x3e7;
  local_3c = iVar7;
  local_34 = iVar6;
  if ((DAT_0063f660 < 0x3e7)) {
    local_34 = ((s16((DAT_0064f340 + local_14 * 0x58), 0)) << 16 >> 16);
    local_3c = ((s16((DAT_0064f342 + local_14 * 0x58), 0)) << 16 >> 16);
    local_c = DAT_0063f660;
  }
  if ((local_8 < local_c)) {
    local_34 = local_38;
    local_3c = local_40;
    local_c = local_8;
  }
  if ((local_c < 0x3e7)) {
    if ((DAT_0064b1c3[u8(DAT_006560f6[iVar5 * 0x20]) * 0x14] !== 0)) {
      cVar3 = DAT_0064b1c3[u8(DAT_006560f6[iVar5 * 0x20]) * 0x14];
      cVar4 = DAT_006560fd[iVar5 * 0x20];
      iVar8 = FUN_005b2a39(iVar5);
      iVar9 = FUN_005b2c3d(iVar5);
      uVar11 = u8(DAT_0064bcc8);
      iVar10 = FUN_005ae1b0(iVar6, iVar7, local_34, local_3c);
      if (((((s8(cVar3) - (s8(cVar4) + 1)) * iVar8 + iVar9) / uVar11 | 0) < iVar10)) {
        return;
      }
    }
    if ((iVar7 === local_3c)) {
      FUN_005b6787(iVar5);
    }
    else {
      DAT_006560ff[iVar5 * 0x20] = 0xb;
      w16((DAT_00656102 + iVar5 * 0x20), 0, ((local_34) & 0xFFFF));
      w16((DAT_00656104 + iVar5 * 0x20), 0, ((local_3c) & 0xFFFF));
    }
  }
  return;
}


 export function FUN_004c59f0 (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let uVar4;

  if (((DAT_0064c6c1[(param_1 * 4 + param_2 * 0x594)] & 0x20) === 0)) {
    if (((DAT_0064c6c0[(param_1 * 4 + param_2 * 0x594)] & 0xe) === 0)) {
      FUN_00456f20(param_2, param_1, 0x14);
    }
    else {
      uVar1 = FUN_00493c7d(param_1);
      FUN_0040ff60(0, uVar1);
      uVar1 = FUN_00493c7d(param_2);
      FUN_0040ff60(1, uVar1);
      if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        if ((DAT_00654fa8 !== 0)) {
          return;
        }
        if ((DAT_0064c6b5[param_1 * 0x594] === 4)) {
          return;
        }
        if ((DAT_006d1da0 === param_2)) {
          if (((DAT_0064c6c0[(param_1 * 4 + param_2 * 0x594)] & 8) === 0)) {
            iVar2 = FUN_00410030(s_PRETEXT_0062dd08, DAT_00644e48, 0);
            if ((iVar2 === 1)) {
              FUN_00467825(param_1, param_2, 0x2000);
              w16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0, DAT_00655af8);
            }
          }
          else {
            iVar2 = FUN_00410030(s_PRETEXTALLIED_0062dcf8, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
            if ((iVar2 === 1)) {
              FUN_00467750(param_1, param_2, 8);
              w16((DAT_0064ca82 + (param_1 * 2 + param_2 * 0x594)), 0, DAT_00655af8);
            }
          }
        }
        else {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          FUN_0046b14d(0xa4, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), param_1, param_2, 0, 0, 0, 0, 0, 0);
        }
      }
      if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        if (((DAT_0064c6c0[(param_2 * 4 + param_1 * 0x594)] & 8) === 0)) {
          if ((DAT_0064c6b5[param_1 * 0x594] === 4)) {
            w32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0, (s32((DAT_0064c6c0 + (param_1 * 4 + param_2 * 0x594)), 0) | 0x10));
            FUN_00456f20(param_2, param_1, 0xa);
            if ((DAT_00654fa8 === 0)) {
              uVar1 = FUN_00410070(param_1);
              FUN_0040ff60(0, uVar1);
              FUN_00410030(s_INCIDENTTERROR_0062dd28, DAT_00646968, 0);
            }
          }
          else {
            if ((DAT_00654fa8 === 0)) {
              FUN_00410030(s_INCIDENTWAR_0062dd38, DAT_00644e48, 0);
            }
            FUN_0045ac71(param_1, param_2, -1);
          }
        }
        else {
          if ((DAT_0064c6b0[param_1 * 0x594] < DAT_0064c6b0[param_2 * 0x594])) {
            if ((DAT_00654fa8 !== 0)) {
              return;
            }
            FUN_0045705e(param_1, param_2);
            FUN_00458a3b(param_1, param_2);
            iVar2 = _rand();
            FUN_00456f20(param_2, param_1, ((iVar2 % 0xf) + 5));
            FUN_00410030(s_WIMPOUT_0062dd10, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
            return;
          }
          if ((DAT_00654fa8 === 0)) {
            FUN_00410030(s_INCIDENTALLIED_0062dd18, (DAT_00648018 + ((u8((DAT_00655b91 !== 0)) - 1) & -0x8380)), 0);
          }
          FUN_0045ac71(param_1, param_2, -1);
        }
      }
      if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        if ((DAT_0064c6b5[param_1 * 0x594] !== 6)) {
          uVar3 = _rand();
          uVar4 = (uVar3 >> 0x1f);
          if ((((((uVar3 ^ uVar4) - uVar4) & 1) ^ uVar4) === uVar4)) {
            return;
          }
          if ((DAT_0064c6b5[param_1 * 0x594] !== 5)) {
            return;
          }
        }
        if (((DAT_0064bc60 & 1) === 0)) {
          if ((DAT_00654fa8 === 0)) {
            uVar1 = FUN_00410070(param_1);
            FUN_0040ff60(0, uVar1);
            FUN_00410030(s_SENATESCANDAL_0062dd44, (DAT_00646878 + u8(DAT_0064c6b5[param_1 * 0x594]) * 0x3c), 0);
          }
          FUN_0055c69d(param_1, 0);
        }
      }
    }
  }
  return;
}


 export function FUN_004c5fae (param_1, param_2, param_3)

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let local_1c;
  let local_8;

  bVar1 = DAT_006560f7[param_1 * 0x20];
  iVar2 = s8(bVar1);
  if ((-1 < param_2)) {
    DAT_006560f8[param_1 * 0x20] = (DAT_006560f8[param_1 * 0x20] + DAT_0064bcc8);
  }
  if ((DAT_006560f6[param_1 * 0x20] === 0x2f)) {
    local_8 = (u8((param_2 < 0)) + 2);
    if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) !== 0)) {
      local_8 = local_8 * 2;
    }
    if ((0 < param_2)) {
      local_8 = (local_8 / 2 | 0);
    }
    if ((local_8 < 2)) {
      uVar3 = _rand();
      uVar7 = (uVar3 >> 0x1f);
      if ((((((uVar3 ^ uVar7) - uVar7) & 1) ^ uVar7) === uVar7)) {
        local_8 = (local_8 + 1);
      }
    }
    if (((local_8 === 1) || ((local_8 - 1) < 0))) {
      local_1c = 0;
    }
    else {
      local_1c = _rand();
      local_1c = (local_1c % local_8);
    }
    if ((local_1c !== 0)) {
      iVar4 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
      iVar5 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
      iVar6 = FUN_0043d07a(iVar4, iVar5, iVar2, -1, -1);
      if ((-1 < iVar6)) {
        FUN_005b36df(param_1, ((s16((DAT_0064f340 + iVar6 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar6 * 0x58), 0)) << 16 >> 16), 1);
        FUN_005b6787(param_1);
        FUN_0047cea6(iVar4, iVar5);
        FUN_0047cea6(((s16((DAT_0064f340 + iVar6 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar6 * 0x58), 0)) << 16 >> 16));
        if ((2 < DAT_00655b02)) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          FUN_0046b14d(0x72, 0xff, iVar4, iVar5, 0, 0, 0, 0, 0, 0);
          FUN_0046b14d(0x72, 0xff, ((s16((DAT_0064f340 + iVar6 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar6 * 0x58), 0)) << 16 >> 16), 0, 0, 0, 0, 0, 0);
        }
        FUN_0040ff60(1, (DAT_0064f360 + iVar6 * 0x58));
      }
      if ((-1 < param_2)) {
        if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) === 0)) {
            if ((DAT_006d1da0 === iVar2)) {
              FUN_00410030(s_BOND007_0062dd54, (DAT_00641848 + u8(DAT_006560f6[param_1 * 0x20]) * 0x3c), 8);
            }
            else if ((2 < DAT_00655b02)) {
              FUN_00511880(0x26, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar2 * 4), 0) * 0x54), 0), 2, 0, DAT_006560f6[param_1 * 0x20], 8);
            }
          }
          else if ((DAT_006d1da0 === iVar2)) {
            FUN_00410030(DAT_0062dd5c, (DAT_00641848 + u8(DAT_006560f6[param_1 * 0x20]) * 0x3c), 8)
            ;
          }
          else if ((2 < DAT_00655b02)) {
            FUN_00511880(0x27, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar2 * 4), 0) * 0x54), 0), 2, 0, DAT_006560f6[param_1 * 0x20], 8);
          }
        }
        w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) | 0x2000));
      }
      return 0;
    }
    if ((-1 < param_2)) {
      if ((DAT_006d1da0 === iVar2)) {
        FUN_00410030(s_BONDGLORY_0062dd64, (DAT_00641848 + u8(DAT_006560f6[param_1 * 0x20]) * 0x3c), 8);
      }
      else if ((DAT_00655b02 === 3)) {
        FUN_00511880(0x28, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar2 * 4), 0) * 0x54), 0), 0, 0, DAT_006560f6[param_1 * 0x20], 8);
      }
    }
  }
  FUN_005b6042(param_1, 1);
  if ((-1 < param_2)) {
    FUN_004c59f0(iVar2, param_3);
  }
  return 1;
}


 export function FUN_004c64aa (param_1, param_2)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;

  bVar1 = DAT_006560f7[param_1 * 0x20];
  bVar2 = DAT_006560f6[param_1 * 0x20];
  iVar3 = FUN_004c5fae(param_1, -1, param_2);
  if ((iVar3 === 0)) {
    uVar4 = 0;
  }
  else {
    if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      FUN_00410030(s_NAILED_0062dd70, (DAT_00641848 + u8(bVar2) * 0x3c), 8);
    }
    uVar4 = 1;
  }
  return uVar4;
}


 export function FUN_004c654d (param_1, param_2)

 {
  let iVar1;
  let bVar2;

  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    bVar2 = 0;
  }
  else if (((DAT_0064c6c0[(param_2 * 4 + param_1 * 0x594)] & 0xe) === 0)) {
    bVar2 = 0;
  }
  else {
    iVar1 = FUN_00421ea0(s_INCIDENT_0062dd78);
    bVar2 = (iVar1 !== 1);
  }
  return bVar2;
}


 export function FUN_004c65d2 (param_1, param_2, param_3)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0x10;
  (local_c < ((DAT_00655b18) << 16 >> 16)) (local_c = 0; local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
    if ((iVar1 < local_8)) {
      local_8 = iVar1;
    }
  }
  return local_8;
}


 export function FUN_004c66ba (param_1, param_2, param_3)

 {
  let bVar1;
  let sVar2;
  let sVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let iVar7;
  let local_20;
  let local_8;

  bVar1 = DAT_0064f348[param_1 * 0x58];
  iVar4 = s8(bVar1);
  sVar2 = s16((DAT_0064f340 + param_1 * 0x58), 0);
  sVar3 = s16((DAT_0064f342 + param_1 * 0x58), 0);
  if ((-1 < param_2)) {
    FUN_005b9ec6();
    (local_8 < 0x15) (local_8 = 0; local_8 = (local_8 < 0x15); local_8 = (local_8 + 1)) {
      uVar5 = FUN_005ae052((s8(DAT_00628370[local_8]) + ((sVar2) << 16 >> 16)));
      iVar6 = (s8(DAT_006283a0[local_8]) + ((sVar3) << 16 >> 16));
      iVar7 = FUN_004087c0(uVar5, iVar6);
      if ((iVar7 !== 0)) {
        FUN_005b976d(uVar5, iVar6, (1 << (((param_2) & 0xFF) & 0x1f)), 1, 1);
        FUN_005b8b1a(uVar5, iVar6, param_2);
      }
    }
    FUN_005b9f1c();
    if ((DAT_00655b07 !== 0)) {
      if ((s8(DAT_0064f348[param_1 * 0x58]) === (DAT_006d1da0 & 0xff))) {
        FUN_004105f8(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16), s8(DAT_0064f348[param_1 * 0x58]));
      }
      uVar5 = FUN_00493c7d(iVar4);
      FUN_0040ff60(0, uVar5);
      FUN_0040ff60(1, (DAT_0064f360 + param_1 * 0x58));
      uVar5 = FUN_00410070(param_2);
      FUN_0040ff60(2, uVar5);
      FUN_00421ea0(s_CIVILWAR_0062dd84);
      if ((2 < DAT_00655b02)) {
        FUN_00511880(0x5e, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar4 * 4), 0) * 0x54), 0), 3, 0, 0, 0);
      }
    }
    local_20 = ((DAT_00655b16) << 16 >> 16);
    while ((-1 < local_20)) {
      if ((iVar7 < 0)) {
        DAT_0064c778[(iVar4 * 0x594 + u8(DAT_006560f6[local_20 * 0x20]))] = (DAT_0064c778[(iVar4 * 0x594 + u8(DAT_006560f6[local_20 * 0x20]))] + 0xff);
        DAT_0064c778[(param_2 * 0x594 + u8(DAT_006560f6[local_20 * 0x20]))] = (DAT_0064c778[(param_2 * 0x594 + u8(DAT_006560f6[local_20 * 0x20]))] + 1);
        DAT_006560f7[local_20 * 0x20] = ((param_2) & 0xFF);
        DAT_00656100[local_20 * 0x20] = ((param_1) & 0xFF);
        DAT_006560f8[local_20 * 0x20] = 0;
        if ((DAT_006560ff[local_20 * 0x20] !== 2)) {
          DAT_006560ff[local_20 * 0x20] = 0xff;
        }
        FUN_005b99e8(((s16((DAT_006560f0 + local_20 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_20 * 0x20), 0)) << 16 >> 16), param_2, 1);
        if ((iVar6 !== 0)) {
          FUN_0047cea6(((s16((DAT_006560f0 + local_20 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_20 * 0x20), 0)) << 16 >> 16));
        }
      }
    }
    FUN_0057b5df(param_1, param_2, param_3);
  }
  return;
}


 export function FUN_004c6bf5 (param_1, param_2)

 {
  let cVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  let uVar5;
  let unaff_FS_OFFSET;
  let bVar6;
  let uVar7;
  let uVar8;
  let local_3f8;
  let local_3f4;
  let local_3f0;
  let local_3b0;
  let local_3ac;
  let local_3a8;
  let local_3a4;
  let local_3a0;
  let local_39c;
  let local_398;
  let local_394;
  let local_390;
  let local_38c;
  let local_388;
  let local_384;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;
  let local_80;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004c9510;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  DAT_0062804c = 0;
  local_3b0 = s8(DAT_006560f7[param_1 * 0x20]);
  local_80 = s8(DAT_0064f348[param_2 * 0x58]);
  local_398 = u8(DAT_006560f6[param_1 * 0x20]);
  FUN_00467825(local_3b0, local_80, 1);
  if ((DAT_006560f6[param_1 * 0x20] !== 0x2f)) {
    local_38c = 0;
  }
  else {
    local_38c = 1;
  }
  local_38c = u8((!(DAT_006560f6[param_1 * 0x20] !== 0x2f)));
  if ((DAT_006d1da0 === local_3b0)) {
    uVar2 = FUN_00410070(local_3b0);
    FUN_0040ff60(0, uVar2);
    FUN_004271e8(1, s32((DAT_0064b1b8 + u8(DAT_006560f6[param_1 * 0x20]) * 0x14), 0));
    FUN_0040ff60(2, (DAT_0064f360 + param_2 * 0x58));
    FUN_0040ffa0(s_SPYMENU_0062dd90, 1);
    FUN_0059ec88((DAT_00641848 + u8(DAT_006560f6[param_1 * 0x20]) * 0x3c), 0, 0);
    local_384 = DAT_fffffc7c;
    iVar3 = FUN_004a2379(DAT_006558e8, s_SPYOPTIONS_0062dd98);
    if ((iVar3 !== 0)) {
      if ((local_38c !== 0)) {
        FUN_004aef36(DAT_00679640);
        FUN_004af01a(DAT_00679640);
        FUN_0040bc10(0xed);
        FUN_004af03b(DAT_00679640);
      }
      FUN_0059edf0(DAT_00679640, 0, 0);
    }
    FUN_004a23fc(1);
    if ((local_38c !== 0)) {
      FUN_004aef36(DAT_00679640);
      FUN_004af01a(DAT_00679640);
      FUN_0040bc10(0xed);
      FUN_004af03b(DAT_00679640);
    }
    FUN_0059edf0(DAT_00679640, 1, 0);
    FUN_004a23fc(1);
    if ((local_38c !== 0)) {
      FUN_0059edf0(DAT_00679640, 2, 0);
    }
    FUN_004a23fc(1);
    FUN_0059edf0(DAT_00679640, 3, 0);
    FUN_004a23fc(1);
    if ((1 < DAT_0064f349[param_2 * 0x58])) {
      FUN_0059edf0(DAT_00679640, 4, 0);
    }
    FUN_004a23fc(1);
    if ((iVar3 !== -1)) {
      FUN_0059edf0(DAT_00679640, 5, 0);
    }
    FUN_004a23fc(1);
    iVar3 = FUN_0043d20a(param_2, 1);
    if ((iVar3 === 0)) {
      FUN_0059edf0(DAT_00679640, 6, 0);
    }
    if (((DAT_0064c6c3[(local_80 * 4 + local_3b0 * 0x594)] & 1) === 0)) {
      uVar8 = 0;
      uVar7 = 7;
      uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0xd28), 0), 7, 0);
      FUN_0059edf0(uVar2, uVar7, uVar8);
    }
    FUN_004a2020();
    local_3ac = FUN_0040bc80(0);
    if ((local_3ac < 0)) {
    local_3ac = 2;
    if ((local_38c !== 0)) {
      local_3ac = 4;
    }
    if (((DAT_0064c6c0[(local_80 * 4 + local_3b0 * 0x594)] & 4) !== 0)) {
      local_3ac = 2;
    }
    if ((DAT_0064c6b5[local_80 * 0x594] !== 6)) {
      local_3ac = 6;
    }
    if (((DAT_0064c6c0[(local_80 * 4 + local_3b0 * 0x594)] & 8) !== 0)) {
      local_3ac = 2;
    }
    if (((DAT_0064c6c0[(local_80 * 4 + local_3b0 * 0x594)] & 0xe) !== 0)) {
      local_3ac = 0;
    }
  }
 LAB_004c72a8: :
  DAT_0062dcf4 = local_3ac;
  /* switch */ () {
  case 0 :
    if (((DAT_0064c6c0[(local_80 * 4 + local_3b0 * 0x594)] & 0x80) === 0)) {
      w32((DAT_0064c6c0 + (local_80 * 4 + local_3b0 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_80 * 4 + local_3b0 * 0x594)), 0) | 0x80));
      if ((DAT_006d1da0 === local_80)) {
        FUN_0046e020(0x44, 0, 0, 0);
      }
      if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        FUN_005b6042(param_1, 1);
      }
      else {
        FUN_0043060b(local_3b0, local_80);
        if ((local_38c === 0)) {
          FUN_005b4391(param_1, 1);
        }
        else {
          DAT_006560f8[param_1 * 0x20] = (DAT_006560f8[param_1 * 0x20] + 1);
        }
      }
      if ((((1 << (((local_80) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        uVar2 = FUN_00493c7d(local_3b0);
        FUN_0040ff60(0, uVar2);
        if ((DAT_006d1da0 === local_80)) {
          FUN_00410030(s_ENEMYEMBASSY_0062dda4, (DAT_00641848 + local_398 * 0x3c), 8);
        }
        else {
          FUN_00511880(0x55, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 1, 0, 0, 0);
        }
      }
      break;
    }
    local_3ac = 1;
    goto LAB_004c72a8;
  case 1 :
    if ((DAT_006d1da0 === local_80)) {
      FUN_0046e020(0x44, 1, 0, 0);
    }
    if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      FUN_005b6042(param_1, 1);
    }
    else {
      FUN_00509590(param_2);
      if ((local_38c === 0)) {
        FUN_004c5fae(param_1, 0, -1);
      }
      else if (((DAT_0064f346[param_2 * 0x58] & 0x40) === 0)) {
        DAT_006560f8[param_1 * 0x20] = (DAT_006560f8[param_1 * 0x20] + 1);
      }
      w32((DAT_0064f344 + param_2 * 0x58), 0, (s32((DAT_0064f344 + param_2 * 0x58), 0) | 0x400000));
    }
    if ((((1 << (((local_80) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      uVar2 = FUN_00493c7d(local_3b0);
      FUN_0040ff60(0, uVar2);
      FUN_0040ff60(1, (DAT_0064f360 + param_2 * 0x58));
      if ((DAT_006d1da0 === local_80)) {
        FUN_00410030(s_ENEMYINVESTIGATE_0062ddb4, (DAT_00641848 + local_398 * 0x3c), 8);
      }
      else {
        FUN_00511880(0x56, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 2, 0, 0, 0);
      }
    }
    break;
  case 2 :
    iVar3 = FUN_004c654d(local_3b0, local_80);
    if ((iVar3 !== 0)) {
      local_90 = ((local_8c + local_3a0) % 0x64);
      if ((iVar3 !== 0)) {
        local_20 = local_90;
        iVar3 = FUN_00598ceb();
        if ((local_90 === 0x20)) {
      local_88 = 0;
      if (((DAT_0064f344[param_2 * 0x58] & 8) === 0)) {
        if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          local_3ac = FUN_00426fb0(s_STEALSPECIFIC_0062dddc, 1, (DAT_00641848 + local_398 * 0x3c), 8);
          if ((local_3ac < 0)) {
            iVar3 = FUN_004c64aa(param_1, local_80);
            if ((iVar3 === 0)) {
              if ((DAT_006d1da0 === local_3b0)) {
                FUN_0046e020(0x44, 1, 0, 0);
              }
              FUN_0057a27a(local_3b0, local_80);
              FUN_004c5fae(param_1, 1, local_80);
              w32((DAT_0064f344 + param_2 * 0x58), 0, (s32((DAT_0064f344 + param_2 * 0x58), 0) | 8));
            }
            break;
          }
        }
      }
      else {
        if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          uVar2 = FUN_00493c7d(local_80);
          FUN_0040ff60(0, uVar2);
          FUN_0040ff60(1, (DAT_0064f360 + param_2 * 0x58));
          local_3ac = FUN_00414dd0(s_STEALHARD_0062ddd0, param_2);
          if ((local_3ac !== 1)) {
      DAT_006560f8[param_1 * 0x20] = (DAT_006560f8[param_1 * 0x20] + DAT_0064bcc8);
      if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        FUN_00410030(s_NOSTEAL_0062ddc8, (DAT_00641848 + local_398 * 0x3c), 8);
      }
      break;
    }
    if (((DAT_0064c6c0[(local_80 * 4 + local_3b0 * 0x594)] & 0xe) === 0)) {
      local_3ac = 3;
    }
    else {
      local_3ac = 0;
    }
    goto LAB_004c72a8;
  case 3 :
    local_88 = 0;
    iVar3 = FUN_004c654d(local_3b0, local_80);
    if ((iVar3 !== 0)) {
      FUN_004af122(DAT_ffffff90, s32((DAT_0064c488 + s8(DAT_0064f379[param_2 * 0x58]) * -8), 0));
    }
    else {
      FUN_004af122(DAT_ffffff90, s32((DAT_0064b1b8 + s8(DAT_0064f379[param_2 * 0x58]) * 0x14), 0));
    }
    local_74 = 0;
    local_8c = _rand();
    local_8c = (local_8c % 0x27);
    local_3a8 = 0;
    goto LAB_004c7f43;
  case 4 :
    iVar3 = FUN_004c654d(local_3b0, local_80);
    if ((iVar3 === 0)) {
      if ((DAT_0064f349[param_2 * 0x58] < 2)) {
        w16((DAT_0064f35a + param_2 * 0x58), 0, 0);
      }
      else {
        DAT_0064f349[param_2 * 0x58] = (DAT_0064f349[param_2 * 0x58] + 0xff);
      }
      FUN_0043cc00(param_2, local_3b0);
      FUN_0047cea6(((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16));
      FUN_0040ff60(0, (DAT_0064f360 + param_2 * 0x58));
      uVar2 = FUN_00410070(local_3b0);
      FUN_0040ff60(1, uVar2);
      if ((DAT_006d1da0 !== local_80)) {
        FUN_00511880(0x5b, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 2, 0, 0, 0);
      }
      if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        FUN_0046e020(0x44, 1, 0, 0);
        FUN_00410030(s_WATERSUPPLY_0062de50, (DAT_00641848 + local_398 * 0x3c), 8);
      }
      iVar3 = local_80;
      uVar4 = _rand();
      uVar5 = (uVar4 >> 0x1f);
      FUN_004c5fae(param_1, (((((uVar4 ^ uVar5) - uVar5) & 1) ^ uVar5) - uVar5), iVar3);
    }
    break;
  case 5 :
    if ((iVar3 === 0)) {
      FUN_0057f9e3(local_3b0, ((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16), 0);
      FUN_0040ff60(0, (DAT_0064f360 + param_2 * 0x58));
      uVar2 = FUN_00410070(local_3b0);
      FUN_0040ff60(1, uVar2);
      uVar2 = FUN_00493c7d(local_3b0);
      FUN_0040ff60(2, uVar2);
      FUN_0040bbb0();
      FUN_0040bbe0(s_PLANTEDNUKE_0062de6c);
      local_3f0 = 0;
      if ((DAT_0064c6b5[local_3b0 * 0x594] !== 4)) {
        local_1c = 2;
        if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) !== 0)) {
          local_1c = 4;
        }
        if (((local_1c === 1) || ((local_1c + -1) < 0))) {
          local_3f8 = 0;
        }
        else {
          local_3f8 = _rand();
          local_3f8 = (local_3f8 % local_1c);
        }
        if ((local_3f8 === 0)) {
          FUN_0040bbe0(DAT_0062de78);
          local_3f0 = 1;
          (local_3a4 < 8) (local_3a4 = 1; local_3a4 = (local_3a4 < 8); local_3a4 = (local_3a4 + 1)) {
            if ((local_3b0 !== local_3a4)) {
              FUN_00456f20(local_3a4, local_3b0, 0x64);
              FUN_00467825(local_3b0, local_3a4, 0x2000);
            }
          }
        }
      }
      FUN_004cc870(DAT_00679640, 0x3e, 8);
      if ((2 < DAT_00655b02)) {
        if ((UNNAMED === 0)) {
          FUN_00511880(0x5c, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 3, 0, 0, 0);
        }
        else {
          FUN_00511880(0x5d, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 3, 0, 0, 0);
        }
      }
    }
    break;
  case 6 :
    if ((DAT_0064c6b5[local_80 * 0x594] === 6)) {
      if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        FUN_00410030(s_NOREVOLT_0062de7c, DAT_006469e0, 0);
      }
      break;
    }
    local_7c = FUN_004c65d2(local_80, ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
    if ((local_7c < 2)) {
      if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      if ((9 < local_7c)) {
        local_7c = 0xa;
      }
      iVar3 = FUN_0043d20a(param_2, 7);
      if ((iVar3 !== 0)) {
        local_7c = (local_7c / 2 | 0);
      }
      local_388 = s8(DAT_0064f349[param_2 * 0x58]) * ((s32((DAT_0064c6a2 + local_80 * 0x594), 0) + 0x3e8) / (local_7c + 3) | 0);
      if ((local_388 < 0)) {
        local_388 = 0x7530;
      }
      if (((DAT_0064f344[param_2 * 0x58] & 1) !== 0)) {
        local_388 = (local_388 / 2 | 0);
      }
      iVar3 = FUN_005b8d62(((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16));
      if ((iVar3 < 0)) {
        local_388 = (local_388 / 2 | 0);
      }
      if ((s8(DAT_0064f34a[param_2 * 0x58]) === local_3b0)) {
        local_388 = (local_388 / 2 | 0);
      }
      if ((local_38c !== 0)) {
        if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) === 0)) {
          local_388 = (local_388 - (local_388 / 6 | 0));
        }
        else {
          local_388 = (local_388 - (local_388 / 3 | 0));
        }
      }
      bVar6 = ((DAT_0064c6c0[(local_80 * 4 + local_3b0 * 0x594)] & 0xe) === 0);
      if (bVar6) {
        local_18 = 0;
      }
      else {
        local_18 = 1;
      }
      local_18 = u8((!bVar6));
      if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
 LAB_004c8f6f: :
        if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          FUN_0040ff60(0, (DAT_0064f360 + param_2 * 0x58));
          FUN_00421da0(0, local_388);
          FUN_0043c9d0(s_DISSIDENTS_0062de88);
          if ((local_388 <= s32((DAT_0064c6a2 + local_3b0 * 0x594), 0))) {
            iVar3 = FUN_004a2379(DAT_006558e8, s_DISSIDENTOPTIONS_0062de94);
            if ((iVar3 !== 0)) {
              FUN_0059edf0(DAT_00679640, 1, 0);
            }
            FUN_004a23fc(1);
            if ((local_18 !== 0)) {
              FUN_0059edf0(DAT_00679640, 1, 0);
            }
            FUN_004a23fc(1);
            if ((local_388 < 0x3a99)) {
              FUN_0059edf0(DAT_00679640, 2, 0);
            }
            FUN_004a2020();
          }
          local_3ac = FUN_0040bc80(0);
        }
        else {
          local_3ac = 1;
        }
        if ((0 < local_3ac)) {
          w32((DAT_0064c6a2 + local_3b0 * 0x594), 0, (s32((DAT_0064c6a2 + local_3b0 * 0x594), 0) - local_388 * local_3ac));
          w16((DAT_0064c6bc + local_3b0 * 0x594), 0, (s16((DAT_0064c6bc + local_3b0 * 0x594), 0) + 2));
          if ((DAT_006d1da0 === local_3b0)) {
            FUN_00569363(1);
          }
          FUN_004c5fae(param_1, 0, 0);
          if ((local_3ac === 1)) {
            FUN_004c59f0(local_3b0, local_80);
          }
          if ((local_3ac === 2)) {
            w32((DAT_0064c6c0 + (local_80 * 0x594 + local_3b0 * 4)), 0, (s32((DAT_0064c6c0 + (local_80 * 0x594 + local_3b0 * 4)), 0) | 0x10));
            DAT_0064f34a[param_2 * 0x58] = ((local_3b0) & 0xFF);
          }
          if ((DAT_006d1da0 === local_80)) {
            FUN_0046e020(0x44, 1, 0, 0);
          }
          FUN_004c66ba(param_2, local_3b0, local_3ac);
        }
        break;
      }
      local_394 = local_388 * 2;
      if ((-1 < local_394)) {
      FUN_0046e020(0x44, 0, 0, 0);
    }
    local_3f0 = 5;
    local_3f0 = 4;
    local_3f0 = 3;
    local_3f0 = 2;
    local_3f0 = 1;
    local_3f0 = 0;
    local_3f0 = 0;
    local_3f0 = 0;
    local_3f0 = 0;
    local_3f0 = 0;
    local_3f0 = 1;
    local_3f0 = 2;
    local_3f0 = 2;
    local_3f0 = 3;
    local_3f0 = 4;
    if ((local_38c === 0)) {
      DAT_006560fe[param_1 * 0x20] = 5;
    }
    else {
      DAT_006560fe[param_1 * 0x20] = 0xa;
    }
    DAT_006560fe[param_1 * 0x20] = (((s32(DAT_fffffc10, (u8(DAT_00655b08) + 9))) & 0xFF) + DAT_006560fe[param_1 * 0x20]);
    if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) !== 0)) {
      DAT_006560fe[param_1 * 0x20] = (DAT_006560fe[param_1 * 0x20] + 2);
    }
    DAT_006560fe[param_1 * 0x20] = (DAT_006560fe[param_1 * 0x20] - ((s32(DAT_fffffc10, u8(DAT_0064c6e0[(local_80 * 0x594 + local_3b0)]))) & 0xFF));
    cVar1 = DAT_006560fe[param_1 * 0x20];
    iVar3 = _rand();
    DAT_006560fe[param_1 * 0x20] = (cVar1 + (((iVar3 % 6)) & 0xFF));
    DAT_006560fd[param_1 * 0x20] = ((local_80) & 0xFF);
    w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) | 2));
    w32((DAT_0064c6c0 + (local_80 * 4 + local_3b0 * 0x594)), 0, (s32((DAT_0064c6c0 + (local_80 * 4 + local_3b0 * 0x594)), 0) | 0x1000000));
    FUN_00410030(s_CHATSPYSTART_0062dea8, (DAT_00641848 + local_398 * 0x3c), 8);
  default :
    break;
  }
 switchD_004c94cc_default: :
  local_8 = -1;
  FUN_004c9504();
  FUN_004c951a();
  return;
 LAB_004c7f43: :
  if ((0x26 < local_3a8)) {
    local_74 = local_78;
    goto LAB_004c7fc1;
  }
  local_3a8 = (local_3a8 + 1);
  goto LAB_004c7f43;
 LAB_004c7fc1: :
  if ((0 < local_74)) {
    local_3ac = FUN_00426fb0(s_SABOTAGESPECIFIC_0062ddfc, 1, (DAT_00641848 + local_398 * 0x3c), 8)
    ;
    if ((local_3ac < 0)) {
      FUN_0040ffa0(s_SABOTAGE_0062de10, 1);
      FUN_0059ec88((DAT_00641848 + local_398 * 0x3c), 0, 0);
      local_384 = DAT_fffffc7c;
      (local_3a8 < 0x27) (local_3a8 = 1; local_3a8 = (local_3a8 < 0x27); local_3a8 = (local_3a8 + 1)) {
        if ((iVar3 !== 0)) {
          uVar7 = 0;
          iVar3 = local_3a8;
          uVar2 = FUN_00428b0c(s32((DAT_0064c488 + local_3a8 * 8), 0), local_3a8, 0);
          FUN_0059edf0(uVar2, iVar3, uVar7);
        }
      }
      FUN_0040bbb0();
      FUN_0040bbe0(DAT_ffffff90);
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040bc10(0x78);
      FUN_0040fed0();
      FUN_0059edf0(DAT_00679640, 0, 0);
      local_74 = FUN_0040bc80(0);
      if ((local_74 < 0)) {
        FUN_004cc870(s_SABOTAGENO_0062de1c, 0x11, 8);
        goto switchD_004c94cc_default;
      }
      iVar3 = FUN_0043d20a(param_2, 1);
      if ((iVar3 !== 0)) {
    local_1c = 2;
    if ((local_38c !== 0)) {
      local_1c = 3;
    }
    if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) !== 0)) {
      local_1c = (local_1c + 1);
    }
    if (((local_1c + -1) < 1)) {
      local_3f4 = 0;
    }
    else {
      local_3f4 = _rand();
      local_3f4 = (local_3f4 % local_1c);
    }
    if ((local_3f4 === 0)) {
      local_74 = 0;
    }
  }
  if ((((1 << (((local_80) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    if ((DAT_006d1da0 === local_80)) {
      iVar3 = FUN_004bd9f0(local_3b0, 0x23);
      if ((DAT_006d1da0 !== local_3b0)) {
        FUN_0046e020(0x44, 1, 0, 0);
      }
      else {
        FUN_0046e020(0x27, 1, 0, 0);
      }
    }
    if ((local_74 === 0)) {
      w16((DAT_0064f35c + param_2 * 0x58), 0, 0);
      FUN_0050c679(param_2);
      FUN_0040ff60(0, DAT_ffffff90);
      if ((DAT_006d1da0 !== local_80)) {
        FUN_00511880(0x5a, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 1, 0, local_3b0, 0);
      }
      if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        FUN_00421ea0(s_SABOTAGETWO_0062de38);
      }
    }
    else {
      FUN_0043d289(param_2, local_74, 0);
      FUN_0047cea6(((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16));
      FUN_004271e8(0, s32((DAT_0064c488 + local_74 * 8), 0));
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      if ((DAT_006d1da0 !== local_80)) {
        FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), ((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16), 0, 0, 0, 0, 0, 0);
        FUN_0046b14d(0x8a, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
        FUN_00511880(0x59, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 1, 0, local_74, local_3b0);
      }
      if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        FUN_0050c679(param_2);
        FUN_00410030(s_SABOTAGEONE_0062de44, (DAT_00645160 + local_74 * 0x3c), 8);
      }
    }
  }
  FUN_004c5fae(param_1, local_88, local_80);
  goto switchD_004c94cc_default;
 LAB_004c7ad5: :
  if ((param_1 < 0)) {
    local_39c = 0x14;
    if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) !== 0)) {
      local_39c = 0x3c;
    }
    iVar3 = _rand();
    if (((iVar3 % 0x64) < local_39c)) {
      local_14 = 1;
      local_390 = u8(DAT_006560f6[param_1 * 0x20]);
      goto LAB_004c7b9b;
    }
  }
  param_1 = FUN_005b2c82(param_1);
  goto LAB_004c7ad5;
 LAB_004c7b9b: :
  iVar3 = local_84;
  if ((local_14 === 0)) {
    uVar2 = FUN_00493c7d(local_3b0);
    FUN_0040ff60(0, uVar2);
    FUN_004271e8(1, s32((DAT_00627684 + local_20 * 0x10), 0));
    if ((DAT_006d1da0 !== local_80)) {
      FUN_00511880(0x57, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 2, 0, 0, 0);
    }
    if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_STEAL_0062ddf4, (DAT_00646cb8 + (s8(DAT_0062768d[local_20 * 0x10]) * 0x3c + s8(DAT_0062768c[local_20 * 0x10]) * 0xf0)), 8);
    }
    FUN_004bf05b(local_3b0, local_20, local_80, 0, 0);
    w32((DAT_0064f344 + param_2 * 0x58), 0, (s32((DAT_0064f344 + param_2 * 0x58), 0) | 8));
    FUN_004c5fae(iVar3, local_88, local_80);
  }
  else {
    FUN_005b6787(local_84);
    FUN_0047cea6(((s16((DAT_0064f340 + param_2 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_2 * 0x58), 0)) << 16 >> 16));
    FUN_004271e8(1, s32((DAT_0064b1b8 + local_390 * 0x14), 0));
    uVar2 = FUN_00410070(local_3b0);
    FUN_0040ff60(2, uVar2);
    if ((((1 << (((local_3b0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      FUN_0046e020(0x44, 1, 0, 0);
      FUN_00410030(s_CURSES_0062ddec, (DAT_00641848 + local_390 * 0x3c), 8);
    }
    if ((DAT_006d1da0 !== local_80)) {
      FUN_00511880(0x58, s32((DAT_006ad30c + s32((DAT_006ad558 + local_80 * 4), 0) * 0x54), 0), 3, 0, 0, 0);
    }
  }
  goto switchD_004c94cc_default;
}


 export function FUN_004c9504 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004c951a (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004c9528 (param_1, param_2)

 {
  let bVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let local_18;
  let local_10;
  let local_c;

  bVar1 = DAT_006560f7[param_1 * 0x20];
  iVar2 = s8(bVar1);
  iVar3 = FUN_005b50ad(param_1, 2);
  if ((1 < iVar3)) {
    return;
  }
  if ((DAT_0064c6b5[iVar2 * 0x594] === 6)) {
    if ((DAT_00654fa8 !== 0)) {
      return;
    }
    if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      return;
    }
    if ((DAT_006d1da0 !== param_2)) {
      FUN_00511880(0x21, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 0, 0, 0, 0);
      return;
    }
    FUN_00410030(s_INCORRUPTIBLE_0062deb8, DAT_006469e0, 0);
    return;
  }
  if ((iVar3 === 0)) {
    return;
  }
  local_c = FUN_004c65d2(iVar2, ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
  if ((9 < local_c)) {
    local_c = 0xa;
  }
  local_18 = s8(DAT_0064b1c8[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) * ((s32((DAT_0064c6a2 + iVar2 * 0x594), 0) + 0x2ee) / (local_c + 2) | 0);
  if ((local_18 < 0)) {
    local_18 = 0x7530;
  }
  if ((DAT_0064b1ca[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 5)) {
    local_18 = (local_18 / 2 | 0);
  }
  if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    return;
  }
  uVar4 = FUN_00410070(iVar2);
  FUN_0040ff60(0, uVar4);
  FUN_004271e8(1, s32((DAT_0064b1b8 + u8(DAT_006560f6[param_1 * 0x20]) * 0x14), 0));
  if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    FUN_00421da0(0, local_18);
    FUN_0040bbb0();
    FUN_0040bbe0(s_DESERT_0062dec8);
    if ((DAT_006d1da0 === param_2)) {
      if ((local_18 <= s32((DAT_0064c6a2 + param_2 * 0x594), 0))) {
        FUN_0040bbe0(DAT_0062ded0);
      }
      iVar6 = FUN_004442e0(DAT_00679640, param_1);
    }
    else {
      if ((DAT_00655b02 < 3)) {
        FUN_00511880(0x23, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 2, 1, DAT_006d1da0, param_1);
      }
      else {
        FUN_00511880(0x24, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 2, 1, DAT_006d1da0, param_1);
      }
      DAT_006a1870 = -1;
      iVar3 = FUN_00421bb0();
      while ((DAT_006a1870 === -1)) {
        FUN_0047e94e(1, 0);
      }
    }
    if ((iVar6 !== 1)) {
      return;
    }
  }
  else if (((s32((DAT_0064c6a2 + param_2 * 0x594), 0) / 2 | 0) < local_18)) {
    return;
  }
 LAB_004c99a0: :
  if ((DAT_006ad2f7 !== 0)) {
    w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) - local_18))
    ;
    DAT_0064c778[(iVar2 * 0x594 + u8(DAT_006560f6[param_1 * 0x20]))] = (DAT_0064c778[(iVar2 * 0x594 + u8(DAT_006560f6[param_1 * 0x20]))] + 0xff);
    DAT_0064c778[(param_2 * 0x594 + u8(DAT_006560f6[param_1 * 0x20]))] = (DAT_0064c778[(param_2 * 0x594 + u8(DAT_006560f6[param_1 * 0x20]))] + 1);
    w16((DAT_0064c6bc + param_2 * 0x594), 0, (s16((DAT_0064c6bc + param_2 * 0x594), 0) + 1));
    DAT_006560f7[param_1 * 0x20] = ((param_2) & 0xFF);
    DAT_00656100[param_1 * 0x20] = 0xff;
    DAT_006560f8[param_1 * 0x20] = 0;
    DAT_006560ff[param_1 * 0x20] = 0xff;
    iVar3 = FUN_0043d07a(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16), -1, -1, -1);
    if ((s8(DAT_0064f348[iVar3 * 0x58]) === param_2)) {
      local_10 = ((iVar3) & 0xFF);
      DAT_00656100[param_1 * 0x20] = local_10;
    }
    FUN_005b490e(param_1, iVar2);
    FUN_005b99e8(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16), param_2, 1);
    FUN_004b0b53(0xff, 2, 0, 0, 1);
  }
  else {
    FUN_0046b14d(0x63, 0, param_1, param_2, local_18, 0, 0, 0, 0, 0);
    iVar3 = FUN_00421bb0();
    while (((iVar6 - iVar3) < 0xe10)) {
      FUN_0047e94e(1, 1);
    }
    if ((s8(DAT_006560f7[param_1 * 0x20]) !== param_2)) {
      FUN_005d225b(s_Pick_Up_Unit:_Connection_to_serv_0062ded4);
      FUN_00410030(s_SERVERCONNECTTIME_0062df04, DAT_0063fc58, 0);
      DAT_00628044 = 0;
    }
  }
  if ((DAT_006d1da0 === param_2)) {
    FUN_0046e020(0x44, 1, 0, 0);
  }
  if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    if ((DAT_006d1da0 === param_2)) {
      FUN_00569363(1);
    }
    else if ((2 < DAT_00655b02)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x7a, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 0x44, 1, 0, 0, 0, 0, 0, 0);
      FUN_0046b14d(0x78, s32((DAT_006ad30c + s32((DAT_006ad558 + param_2 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    uVar4 = FUN_00493c7d(param_2);
    FUN_0040ff60(2, uVar4);
    if ((DAT_006d1da0 === iVar2)) {
      FUN_004105f8(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16), iVar2);
      FUN_004442e0(s_DESERTED_0062df18, param_1);
    }
    else if ((DAT_006d1da0 !== iVar2)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x71, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar2 * 4), 0) * 0x54), 0), ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16), iVar2, 0, 0, 0, 0, 0);
      FUN_00511880(0x22, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar2 * 4), 0) * 0x54), 0), 3, 0, param_1, 0);
    }
  }
  FUN_0047cea6(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
  if ((2 < DAT_00655b02)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x72, 0xff, ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16), 0, 0, 0, 0, 0, 0);
  }
  if ((DAT_006d1da0 === iVar2)) {
    FUN_0046e287(0x1e);
  }
  return;
}


 export function FUN_004c9ebd (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;

  iVar1 = FUN_005b50ad(param_2, 2);
  if ((iVar1 < 2)) {
    if (((DAT_00655ae8 & 0x10) === 0)) {
      FUN_004c9528(param_2, param_3);
      uVar2 = 0;
    }
    else {
      iVar1 = FUN_004cc8b0(s_SABOTAGEOPTIONS_0062df24, 1, param_1);
      if ((iVar1 < 0)) {
        uVar2 = 0;
      }
      else if ((iVar1 === 0)) {
        FUN_004c9528(param_2, param_3);
        uVar2 = 0;
      }
      else {
        if ((DAT_006d1da0 === param_3)) {
          FUN_0046e020(0x43, 1, 0, 0);
        }
        uVar2 = FUN_00410070(s8(DAT_006560f7[param_2 * 0x20]));
        FUN_0040ff60(0, uVar2);
        FUN_004271e8(1, s32((DAT_0064b1b8 + u8(DAT_006560f6[param_2 * 0x20]) * 0x14), 0));
        uVar2 = FUN_00410070(param_3);
        FUN_0040ff60(2, uVar2);
        FUN_004271e8(3, s32((DAT_0064b1b8 + u8(DAT_006560f6[param_1 * 0x20]) * 0x14), 0));
        FUN_004442e0(s_BLEWITUP_0062df34, param_1);
        if (((u8(DAT_00655b0b) & (1 << (DAT_006560f7[param_2 * 0x20] & 0x1f))) !== 0)) {
          FUN_00511880(0x25, s32((DAT_006ad30c + s32((DAT_006ad558 + s8(DAT_006560f7[param_2 * 0x20]) * 4), 0) * 0x54), 0), 4, 0, param_1, 0);
        }
        iVar1 = ((s16((DAT_006560f0 + param_2 * 0x20), 0)) << 16 >> 16);
        iVar3 = ((s16((DAT_006560f2 + param_2 * 0x20), 0)) << 16 >> 16);
        FUN_0057ed3f(iVar1, iVar3, 0);
        if ((2 < DAT_00655b02)) {
          FUN_0046b14d(0x7c, 0xff, iVar1, iVar3, 0, 0, 0, 0, 0, 0);
        }
        iVar4 = FUN_005b29d7(param_2);
        DAT_006560fa[param_2 * 0x20] = ((((iVar4 / 2 | 0)) & 0xFF) + DAT_006560fa[param_2 * 0x20]);
        FUN_0047cea6(iVar1, iVar3);
        if ((2 < DAT_00655b02)) {
          FUN_004b0b53(0xff, 2, 0, 0, 1);
          FUN_0046b14d(0x72, 0xff, iVar1, iVar3, 0, 0, 0, 0, 0, 0);
        }
        FUN_004c5fae(param_1, 0, -1);
        uVar2 = 1;
      }
    }
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}


 export function FUN_004ca1cd (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let uVar2;
  let local_8;

  w32((DAT_0064f344 + param_2 * 0x58), 0, (s32((DAT_0064f344 + param_2 * 0x58), 0) | 0x10000));
  w32((DAT_0064f344 + param_3 * 0x58), 0, (s32((DAT_0064f344 + param_3 * 0x58), 0) | 0x10000));
  FUN_005b6787(param_1);
  DAT_006560ff[param_1 * 0x20] = 0xff;
  FUN_005b36df(param_1, ((s16((DAT_0064f340 + param_3 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_3 * 0x58), 0)) << 16 >> 16), 1);
  FUN_0050c494(param_1, -1, -1);
  if ((param_4 !== 0)) {
    (local_8 < param_4) (local_8 = 0; local_8 = (local_8 < param_4); local_8 = (local_8 + 1)) {
      iVar1 = _rand();
      if (((iVar1 % 6) === 0)) {
        if ((DAT_00654fa8 === 0)) {
          uVar2 = FUN_00493c7d(param_5);
          FUN_0040ff60(0, uVar2);
          FUN_004442a0(s_SHOTDOWN_0062df40, 0x1b, (((DAT_00633584 === 0) - 1) & 8));
        }
        FUN_005b4391(param_1, 1);
        return;
      }
    }
  }
  if ((DAT_00654fa8 === 0)) {
    FUN_0040ff60(0, (DAT_0064f360 + param_2 * 0x58));
    FUN_0040ff60(1, (DAT_0064f360 + param_3 * 0x58));
    FUN_004442e0(s_AIRLIFT_0062df4c, param_1);
  }
  return;
}


 export function FUN_004ca39e (param_1, param_2, param_3)

 {
  let bVar1;
  let sVar2;
  let sVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let uVar8;
  let local_6c;
  let local_68;
  let local_64;
  let aiStack_60;
  let aiStack_40;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  bVar1 = DAT_006560f7[param_1 * 0x20];
  uVar4 = s8(bVar1);
  sVar2 = s16((DAT_006560f0 + param_1 * 0x20), 0);
  sVar3 = s16((DAT_006560f2 + param_1 * 0x20), 0);
  FUN_004c4210(0, ((s8((((sVar3 >>> 8)) & 0xFF)) << 8) | DAT_0064bcdb));
  iVar5 = FUN_005b89e4(param_2, param_3);
  if ((iVar5 === 0)) {
    local_20 = FUN_005b8d62(param_2, param_3);
    if ((local_20 === uVar4)) {
      iVar5 = FUN_005ae1b0(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16), param_2, param_3);
      if ((u8(DAT_0064bcdb) < iVar5)) {
        if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          FUN_004442e0(s_PARADROPTARGET1_0062df74, param_1);
        }
      }
      else {
        local_20 = FUN_005b8a1d(param_2, param_3);
        iVar5 = FUN_0043cf76(param_2, param_3);
        if (((DAT_0064c6c0[(local_20 * 4 + uVar4 * 0x594)] & 0xe) !== 0)) {
          if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
            FUN_005b6787(param_1);
            return;
          }
          iVar6 = FUN_00579ed0(uVar4, local_20, 0xe);
          if ((iVar6 !== 0)) {
            return;
          }
        }
        (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
          if ((((1 << (((local_18) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            w32(DAT_ffffffa0, local_18, 0);
            w32(DAT_ffffffc0, local_18, s32(DAT_ffffffa0, local_18));
            if ((DAT_00655b07 !== 0)) {
              w32(DAT_ffffffa0, local_18, 1);
            }
            if (((DAT_0064c6c0[(local_20 * 4 + local_18 * 0x594)] & 0x80) !== 0)) {
              w32(DAT_ffffffa0, local_18, 1);
            }
            (local_14 < 9) (local_14 = 0; local_14 = local_14; local_14 = (local_14 + 1)) {
              uVar7 = FUN_005ae052((s8(DAT_00628350[local_14]) + param_2));
              local_1c = (s8(DAT_00628360[local_14]) + param_3);
              iVar6 = FUN_004087c0(uVar7, local_1c);
              if ((uVar8 === local_18)) {
                w32(DAT_ffffffa0, local_18, 1);
              }
            }
            if ((-1 < iVar5)) {
              w32(DAT_ffffffc0, local_18, 1);
            }
          }
        }
        uVar7 = FUN_00410070(uVar4);
        FUN_0040ff60(0, uVar7);
        FUN_004271e8(1, s32((DAT_0064b1b8 + u8(DAT_006560f6[param_1 * 0x20]) * 0x14), 0));
        local_10 = FUN_0043d07a(param_2, param_3, -1, -1, -1);
        FUN_0040ff60(2, (DAT_0064f360 + local_10 * 0x58));
        if ((DAT_00654fa8 === 0)) {
          FUN_004442e0(s_PARADROP_0062df84, param_1);
        }
        if ((2 < DAT_00655b02)) {
          (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
            if ((DAT_00654fa8 === 0)) {
              FUN_00511880(0x15, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 3, 0, param_1, 0)
              ;
            }
          }
        }
        local_c = 0;
        local_64 = -1;
        (local_14 < 8) (local_14 = 0; local_14 = local_14; local_14 = (local_14 + 1)) {
          uVar7 = FUN_005ae052((s8(DAT_00628350[local_14]) + param_2));
          local_1c = (s8(DAT_00628360[local_14]) + param_3);
          iVar6 = FUN_004087c0(uVar7, local_1c);
          if ((iVar6 !== 0)) {
            local_8 = _rand();
            local_8 = (local_8 % 6);
            if ((DAT_00628360[local_14] !== 0)) {
              local_8 = (local_8 + 3);
            }
            iVar6 = FUN_005b8da4(uVar7, local_1c);
            if ((iVar6 < 0)) {
              local_8 = (local_8 + 0xc8);
            }
            if ((local_c < local_8)) {
              local_c = local_8;
              local_64 = (local_14 ^ 4);
              local_6c = local_1c;
              local_68 = uVar7;
            }
          }
        }
        if ((local_64 < 0)) {
          (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
            w32(DAT_ffffffc0, local_18, 0);
          }
        }
        DAT_006560ff[param_1 * 0x20] = 0xff;
        FUN_005b5bab(param_1, 0);
        if ((s8(DAT_006560f7[param_1 * 0x20]) === (DAT_006d1da0 & 0xff))) {
          FUN_0047cea6(((sVar2) << 16 >> 16), ((sVar3) << 16 >> 16));
        }
        if ((s32(DAT_ffffffc0, DAT_006d1da0) !== 0)) {
          FUN_0056c705(param_1, local_68, local_6c, local_64, -1, -1);
        }
        FUN_005b48b1(param_1);
        if ((DAT_006d1da0 === uVar4)) {
          DAT_0064b1b4 = ((param_2) & 0xFFFF);
          DAT_0064b1b0 = ((param_3) & 0xFFFF);
        }
        FUN_005b3ae0(param_1, param_2, param_3, 0);
        if ((2 < DAT_00655b02)) {
          FUN_004b0b53(0xff, 2, 0, 0, 0);
          (local_18 < 8) (local_18 = 1; local_18 = local_18; local_18 = (local_18 + 1)) {
            if ((((1 << (((local_18) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
              if ((s8(DAT_006560f7[param_1 * 0x20]) === (local_18 & 0xff))) {
                FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), param_2, param_3, 0, 0, 0, 0, 0, 0);
              }
              if ((s32(DAT_ffffffc0, local_18) !== 0)) {
                FUN_0046b14d(0x70, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), param_1, param_2, param_3, local_64, -1, 0, 0, 0);
              }
            }
          }
        }
        w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) | 0x10));
        if ((local_20 !== uVar4)) {
          if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
            FUN_005b6787(param_1);
          }
          DAT_006560fa[param_1 * 0x20] = 0;
          DAT_00655b00 = ((param_1) & 0xFFFF);
          FUN_0057b5df(iVar5, uVar4, 0);
          param_1 = ((((param_1) & 0xFFFF)) << 16 >> 16);
        }
        FUN_004274a6(param_1, 1);
        FUN_0050c494(param_1, ((sVar2) << 16 >> 16), ((sVar3) << 16 >> 16));
        w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) & 0xfeff));
        FUN_0056a65e(1);
      }
    }
    else if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      FUN_004442e0(s_PARADROPTARGET2_0062df64, param_1);
    }
  }
  else if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    FUN_004442e0(s_PARADROPTARGET_0062df54, param_1);
  }
  return;
}


 export function FUN_004cc870 (param_1, param_2, param_3)

 {
  FUN_004a6bdc(DAT_006359d4, param_1, 0, param_2, param_3);
  return;
}


 export function FUN_004cc8b0 (param_1, param_2, param_3)

 {
  FUN_004a6e39(DAT_006359d4, param_1, param_2, param_3);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E26 */
 /* _$E31 */
 /* _$E353 */
 /* _$E354 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E31 ()

 {
  FUN_004cc90a();
  FUN_004cc924();
  return;
}


 export function FUN_004cc90a ()

 {
  FUN_0055339f();
  return;
}


 export function FUN_004cc924 ()

 {
  _atexit(FUN_004cc941);
  return;
}


 export function FUN_004cc941 ()

 {
  DAT_006a18c0 = DAT_006a18c0;
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E26 */
 /* _$E31 */
 /* _$E353 */
 /* _$E354 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E31 ()

 {
  FUN_004cc975();
  FUN_004cc98f();
  return;
}


 export function FUN_004cc975 ()

 {
  FUN_004187a0();
  return;
}


 export function FUN_004cc98f ()

 {
  _atexit(FUN_004cc9ac);
  return;
}


 export function FUN_004cc9ac ()

 {
  FUN_00418870();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_004cc9e0();
  FUN_004cc9fe();
  return;
}


 export function FUN_004cc9e0 ()

 {
  FUN_0043c460(0, 0x10);
  return;
}


 export function FUN_004cc9fe ()

 {
  _atexit(FUN_004cca1b);
  return;
}


 export function FUN_004cca1b ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_004cca35 (param_1, param_2)

 {
  let lpCaption;
  let lpText;
  let iVar1;
  let uVar2;
  let uType;

  if ((((s16((param_1 + 0x10), 0)) & 0xFFFF) < (param_2 & 0xffff))) {
    uType = 0;
    lpCaption = FUN_00428b0c(s32((DAT_00628420 + 0x8d0), 0));
    lpText = FUN_00428b0c(s32((DAT_00628420 + 0x8e8), 0));
    iVar1 = FUN_00414d10();
    FUN_006e7dd4(s32((iVar1 + 4), 0), lpText, lpCaption, uType);
    uVar2 = 0;
  }
  else {
    uVar2 = FUN_00498159(param_1, param_2);
  }
  return uVar2;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004ccab9 (param_1, param_2)

 {
  _DAT_006a1880 = param_1;
  _DAT_006a1884 = param_2;
  _DAT_006a1888 = 0;
  _DAT_006a188c = 0;
  return;
}


 export function FUN_004ccaed (param_1, param_2)

 {
  let local_8;

  (local_8 < 7) (local_8 = 0; (DAT_006a1880 = DAT_006a1880 && (local_8 = (local_8 < 7)));
      local_8 = (local_8 + 1)) {
  }
  if ((local_8 < 7)) {
    w32((DAT_006a1880 + local_8 * 8), 0, param_1);
    w32((DAT_006a1884 + local_8 * 8), 0, param_2);
    w32((DAT_006a1888 + local_8 * 8), 0, 0);
    w32((DAT_006a188c + local_8 * 8), 0, 0);
  }
  return;
}


 export function FUN_004ccb6a (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  let iVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  param_2 = (param_2 - param_6);
  param_3 = (param_3 - param_6);
  FUN_004086c0(DAT_ffffffec, param_2, param_3, (param_4 + param_6 * 2), (param_5 + param_6 * 2));
  uVar1 = FUN_00407f90(DAT_ffffffec);
  FUN_005a9b5d(param_1, DAT_00647f18, param_2, (param_3 + 2), uVar1, (param_6 + -4), 0, 2);
  iVar2 = FUN_00407fc0(DAT_ffffffec);
  iVar2 = (iVar2 - (param_6 + -2));
  FUN_005a9b5d(param_1, DAT_00647f18, param_2, (iVar2 + param_3), uVar1, (param_6 + -4), 0, iVar2);
  uVar1 = FUN_00407fc0(DAT_ffffffec);
  FUN_005a9b5d(param_1, DAT_00647f18, (param_2 + 2), param_3, (param_6 + -4), uVar1, 2, 0);
  iVar2 = FUN_00407f90(DAT_ffffffec);
  iVar2 = (iVar2 - (param_6 + -2));
  FUN_005a9b5d(param_1, DAT_00647f18, (iVar2 + param_2), param_3, (param_6 + -4), uVar1, iVar2, 0);
  (local_18 < 2) (local_18 = 0; local_18 = (local_18 < 2); local_18 = (local_18 + 1)) {
    FUN_005a99fc(param_1, DAT_ffffffec, 0x25, 0x12);
    FUN_004bb800(DAT_ffffffec, 1, 1);
  }
  FUN_004bb800(DAT_ffffffec, (param_6 + -4), 0);
  local_10 = (local_10 + (param_6 + -4));
  local_8 = (local_8 - (param_6 + -4));
  (local_18 < 2) (local_18 = 0; local_18 = (local_18 < 2); local_18 = (local_18 + 1)) {
    FUN_005a99fc(param_1, DAT_ffffffec, 0x12, 0x25);
    FUN_004bb800(DAT_ffffffec, 1, 1);
  }
  return;
}


 export function FUN_004ccdb6 (param_1)

 {
  let local_18;

  _sprintf(DAT_ffffffe8, DAT_0062e020, param_1);
  FUN_005f22e0(DAT_00679640, DAT_ffffffe8);
  return;
}


 export function FUN_004ccdef (param_1, param_2)

 {
  let sVar1;
  let local_8;

  if ((param_1 === -2)) {
    FUN_005f22e0(DAT_00679640, (DAT_0062e024 + ((u8((param_2 !== 0)) - 1) & 8)));
  }
  else if ((param_1 === -1)) {
    FUN_005f22e0(DAT_00679640, (DAT_0062e030 + ((u8((param_2 !== 0)) - 1) & 8)));
  }
  else if ((param_1 < 0x64)) {
    FUN_005f22e0(DAT_00679640, (DAT_00627680 + param_1 * 0x10));
    if ((param_2 !== 0)) {
      FUN_005f22e0(DAT_00679640, DAT_0062e03c);
    }
    sVar1 = _strlen((DAT_00627680 + param_1 * 0x10));
    if ((sVar1 < 3)) {
      local_8 = _strlen((DAT_00627680 + param_1 * 0x10));
    }
    else {
      local_8 = 3;
    }
    FUN_004190a0((3 - local_8));
  }
  else {
    FUN_005f22e0(DAT_00679640, (DAT_0062e040 + ((u8((param_2 !== 0)) - 1) & 8)));
  }
  return;
}


 export function FUN_004ccf2d ()

 {
  let iVar1;
  let pcVar2;
  let sVar3;
  let lpCaption;
  let uType;
  let local_278;
  let local_274;
  let local_224;
  let local_220;
  let local_21c;
  let local_118;
  let local_108;
  let local_104;

  local_108 = 0;
  local_278 = 0;
  local_224 = 0;
  local_220 = 0;
  FUN_005f22d0(DAT_fffffee8, s_RULES._0062e04c);
  FUN_005f22e0(DAT_fffffee8, DAT_0062cd24);
  __getcwd(DAT_fffffde4, 0x104);
  __chdir(DAT_0064bb08);
  iVar1 = _strcmp(DAT_0064bb08, DAT_00655020);
  if ((iVar1 === 0)) {
    __chdir(DAT_00655020);
    local_220 = FUN_0041508c(DAT_fffffee8, DAT_0062e08c);
    iVar1 = _strcmp(DAT_0064bb08, DAT_00655020);
    if ((iVar1 === 0)) {
      iVar1 = FUN_00415133(s_RULES.BAK_0062e090);
      if ((iVar1 !== 0)) {
      __chdir(DAT_0064bb08);
      local_224 = FUN_0041508c(DAT_fffffee8, DAT_0062e0e4);
    }
  }
  else {
    iVar1 = FUN_00415133(s_RULES.BAK_0062e054);
    if ((iVar1 !== 0)) {
    (s32((DAT_006a1880 + local_108 * 8), 0) !== 0) (; DAT_006a1880 = DAT_006a1880; local_108 = (local_108 + 1)) {
      local_274 = 0x40;
      local_274 = 0;
      FUN_005f22e0(DAT_fffffd8c, s32((DAT_006a1880 + local_108 * 8), 0));
      __strupr(DAT_fffffd8c);
      do {
        pcVar2 = _fgets(DAT_fffffefc, 0x100, local_220);
        if ((iVar1 === -1)) {
        DAT_006a1884 = DAT_006a1884;
      }
      do {
        pcVar2 = _fgets(DAT_fffffefc, 0x100, local_220);
        if ((pcVar2 === 0)) {
      pcVar2 = _fgets(DAT_fffffefc, 0x100, local_220);
      if ((pcVar2 === 0)) {
        local_278 = 1;
        break;
      }
      iVar1 = _fputs(DAT_fffffefc, local_224);
    } while ((iVar1 !== -1)) {
    _fclose(local_220);
  }
  if ((local_224 !== 0)) {
    _fclose(local_224);
  }
  __chdir(DAT_fffffde4);
  return local_278;
}


 export function FUN_004cd3d7 (param_1, param_2, param_3)

 {
  let iVar1;
  let pcVar2;
  let _MaxCount;
  let local_274;
  let local_270;
  let local_26f;
  let local_220;
  let local_21c;
  let local_218;
  let local_114;
  let local_14;

  local_220 = 0;
  local_21c = 0;
  local_274 = 0;
  FUN_005f22d0(DAT_ffffffec, s_CITY._0062e0e8);
  FUN_005f22e0(DAT_ffffffec, DAT_0062cd24);
  __getcwd(DAT_fffffde8, 0x104);
  __chdir(DAT_0064bb08);
  iVar1 = _strcmp(DAT_0064bb08, DAT_00655020);
  if ((iVar1 === 0)) {
    iVar1 = FUN_00415133(DAT_ffffffec);
    if ((iVar1 === 0)) {
      iVar1 = FUN_00415133(s_CITY.BAK_0062e128);
      if ((iVar1 === 0)) {
        __chdir(DAT_00655020);
        local_21c = FUN_0041508c(DAT_ffffffec, DAT_0062e148);
        __chdir(DAT_0064bb08);
        local_220 = FUN_0041508c(DAT_ffffffec, DAT_0062e14c);
      }
      else {
        local_21c = FUN_0041508c(s_CITY.BAK_0062e138, DAT_0062e134);
        local_220 = FUN_0041508c(DAT_ffffffec, DAT_0062e144);
      }
    }
    else {
      iVar1 = FID_conflict:__wrename(DAT_ffffffec, s_CITY.TMP_0062e108);
      if ((iVar1 !== 0)) {
      local_270 = 0x40;
      local_26f = 0;
      FUN_005f22e0(DAT_fffffd90, param_1);
      __strupr(DAT_fffffd90);
      do {
        pcVar2 = _fgets(DAT_fffffeec, 0x100, local_21c);
        if ((iVar1 === -1)) {
        pcVar2 = _fgets(DAT_fffffeec, 0x100, local_21c);
        if ((pcVar2 === 0)) {
          iVar1 = _fputs(DAT_fffffeec, local_220);
          goto joined_r0x004cd6d4;
        }
        _MaxCount = _strlen(param_2);
        iVar1 = __strnicmp(DAT_fffffeec, param_2, _MaxCount);
        if ((iVar1 === 0)) {
          iVar1 = _fputs(param_3, local_220);
          if ((iVar1 !== -1)) {
            iVar1 = _fputs(DAT_0062e150, local_220);
            goto joined_r0x004cd6d4;
          }
          break;
        }
        iVar1 = _fputs(DAT_fffffeec, local_220);
      } while ((iVar1 !== -1)) {
    _fclose(local_21c);
  }
  if ((local_220 !== 0)) {
    _fclose(local_220);
  }
  iVar1 = FUN_00415133(s_CITY.TMP_0062e154);
  if ((iVar1 !== 0)) {
    FID_conflict:_remove(s_CITY.TMP_0062e160);
  }
  __chdir(DAT_fffffde8);
  return local_274;
 joined_r0x004cd6d4: :
  if ((iVar1 === -1)) {
    local_274 = 1;
    goto LAB_004cd7f1;
  }
  iVar1 = _fputs(DAT_fffffeec, local_220);
  goto joined_r0x004cd6d4;
}


 export function FUN_004cd8a6 ()

 {
  let iVar1;
  let pcVar2;
  let _MaxCount;
  let local_234;
  let local_230;
  let local_22c;
  let local_228;
  let local_224;
  let local_220;
  let local_11c;
  let local_118;
  let local_117;
  let local_18;
  let local_8;

  local_230 = 0;
  local_228 = 0;
  local_224 = 0;
  FUN_005f22d0(DAT_ffffffe8, s_CITY._0062e16c);
  FUN_005f22e0(DAT_ffffffe8, DAT_0062cd24);
  __getcwd(DAT_fffffde0, 0x104);
  __chdir(DAT_0064bb08);
  iVar1 = _strcmp(DAT_0064bb08, DAT_00655020);
  if ((iVar1 !== 0)) {
    iVar1 = FUN_00415133(DAT_ffffffe8);
    if ((iVar1 === 0)) {
 LAB_004cdc50: :
      local_230 = 1;
    }
    else {
      iVar1 = FUN_00415133(s_CITY.TMP_0062e174);
      if ((iVar1 === 0)) {
        local_224 = FUN_0041508c(s_CITY.TMP_0062e19c, DAT_0062e198);
        local_228 = FUN_0041508c(DAT_ffffffe8, DAT_0062e1a8);
        if ((local_228 !== 0)) {
          do {
            while ((iVar1 === 0)) {
              pcVar2 = _fgets(DAT_fffffee8, 0x100, local_224);
              if ((pcVar2 === 0)) {
                local_22c = 1;
                while ((((s16((DAT_0064c6a6 + local_22c * 0x594), 0)) << 16 >> 16) !== local_11c)) {
                  local_22c = (local_22c + 1);
                }
                if ((local_22c < 8)) {
                  local_8 = (DAT_0064bd12 + local_22c * 0xf2);
                }
                else {
                  if ((s16((DAT_00655504 + local_11c * 0x30), 0) < 1)) {
                    local_234 = ((~((s16((DAT_00655504 + local_11c * 0x30), 0)) << 16 >> 16)) + 1);
                  }
                  else {
                    local_234 = ((s16((DAT_00655504 + local_11c * 0x30), 0)) << 16 >> 16);
                  }
                  local_8 = FUN_00428b0c(local_234);
                }
                _MaxCount = _strlen(local_8);
                iVar1 = __strnicmp(DAT_fffffee9, local_8, _MaxCount);
                if ((iVar1 === 0)) {
                  _sprintf(DAT_fffffee8, s_%c%s_0062e1b4, 0x40, (DAT_006a1d88 + (local_11c * 5 + 0xd2) * 8));
                  __strupr(DAT_fffffee8);
                  iVar1 = _fputs(DAT_fffffee8, local_228);
                  if ((iVar1 === -1)) {
    _fclose(local_224);
  }
  if ((local_228 !== 0)) {
    _fclose(local_228);
  }
  iVar1 = FUN_00415133(s_CITY.TMP_0062e1bc);
  if ((iVar1 !== 0)) {
    FID_conflict:_remove(s_CITY.TMP_0062e1c8);
  }
  __chdir(DAT_fffffde0);
  return local_230;
}


 export function FUN_004cdcf6 (param_1, param_2)

 {
  let uVar1;

  if ((param_2 !== 0xd6)) {
    uVar1 = 0;
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_004cdd3d (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_314;
  let local_2e0;
  let local_2cc;
  let local_22c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004cdf32;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_006a4f88 === 0)) {
    local_314 = 0;
  }
  else {
    local_314 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_314);
  iVar1 = FUN_005a632a(DAT_006359d4, param_1, param_2, 0, 0, 0, 0, param_4);
  if ((iVar1 === 0)) {
    if (((local_2cc & 4) !== 0)) {
      (local_14 < local_2e0) (local_14 = 0; local_14 = (local_14 < local_2e0); local_14 = (local_14 + 1)) {
        FUN_0059ea4d(local_14, ((1 << (((local_14) & 0xFF) & 0x1f)) & DAT_00631ed8));
      }
    }
    (local_14 < local_2e0) (local_14 = 0; local_14 = (local_14 < local_2e0); local_14 = (local_14 + 1)) {
      FUN_0059e8db(local_14, (((1 << (((local_14) & 0xFF) & 0x1f)) & param_3) !== 0));
    }
    FUN_0040bc80(0);
    DAT_00631edc = local_22c;
    if (((local_2cc & 4) !== 0)) {
      DAT_00631ed8 = 0;
      (local_14 < local_2e0) (local_14 = 0; local_14 = (local_14 < local_2e0); local_14 = (local_14 + 1)) {
        iVar1 = FUN_0059e9f3(local_14);
        if ((iVar1 !== 0)) {
          DAT_00631ed8 = (DAT_00631ed8 | (1 << (((local_14) & 0xFF) & 0x1f)));
        }
      }
    }
  }
  FUN_0059d3c9(0);
  local_8 = -1;
  FUN_004cdf26();
  FUN_004cdf3c();
  return;
}


 export function FUN_004cdf26 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004cdf3c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004cdf4b (param_1, param_2, param_3)

 {
  if ((param_1 < param_2)) {
    DAT_0062e014 = 1;
  }
  else {
    param_2 = param_1;
    if ((param_3 < param_1)) {
      DAT_0062e014 = 1;
      param_2 = param_3;
    }
  }
  return param_2;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004cdfa4 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    FUN_005f22d0(DAT_006a19f4, DAT_0062e1d4);
  }
  else {
    FUN_005f22d0(DAT_006a19f4, param_1);
  }
  _DAT_006a1b94 = DAT_006ab1a0;
  _DAT_006a1b8c = DAT_006ab190;
  _DAT_006a1b90 = DAT_006ab178;
  _DAT_006a19d4 = param_2;
  DAT_006a19d8 = param_8;
  DAT_006a19dc = param_9;
  DAT_006a19e0 = param_7;
  _DAT_006a1abc = 0;
  _DAT_006a1b68 = 0;
  if (((param_2 & 4) !== 0)) {
    DAT_006a19d8 = DAT_00633598;
    DAT_006a19dc = DAT_0063359c;
  }
  if (((param_2 & 8) === 0)) {
    local_8 = 0x202;
  }
  else {
    local_8 = 0x802;
  }
  if ((DAT_006a19d8 !== 0)) {
    local_8 = (local_8 | 0x400);
  }
  if ((param_7 !== 0)) {
    local_8 = (local_8 | 0x1000);
  }
  if (((param_2 & 2) === 0)) {
    param_5 = (param_5 + DAT_006a19dc * 2);
    param_6 = (param_6 + (DAT_006a19d8 + DAT_006a19dc));
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
  if ((DAT_006a19d8 !== 0)) {
    FUN_00497d00(DAT_006a19d8);
  }
  if ((DAT_006a19e0 !== 0)) {
    FUN_004cff70(DAT_006a19e0);
  }
  FUN_00552ed2();
  return;
}


 export function FUN_004ce196 ()

 {
  let iVar1;
  let sVar2;
  let uVar3;
  let local_108;
  let local_104;

  (local_108 < 0x14) (local_108 = 0; local_108 = (local_108 < 0x14); local_108 = (local_108 + 1)) {
    w32((DAT_006a1d78 + local_108 * 4), 0, 0);
  }
  FUN_004cef35();
  local_108 = 0;
  do {
    if ((0x13 < local_108)) {
 LAB_004ce2ca: :
      DAT_006a4f98 = 1;
      DAT_006a4f9c = 0;
      DAT_006a1908 = DAT_006a1908;
      return;
    }
    iVar1 = FUN_004cffb0(local_108, DAT_fffffefc, 0x100);
    if ((iVar1 === 0)) {
      w32((DAT_006a1d78 + local_108 * 4), 0, 0);
    }
    else {
      sVar2 = _strlen(DAT_fffffefc);
      uVar3 = FUN_004cca35(DAT_0064b984, (sVar2 + 1));
      w32((DAT_006a1d78 + local_108 * 4), 0, uVar3);
      if ((s32((DAT_006a1d78 + local_108 * 4), 0) === 0)) {
        w32((DAT_006a1d78 + local_108 * 4), 0, 0);
        goto LAB_004ce2ca;
      }
      FUN_005f22d0(s32((DAT_006a1d78 + local_108 * 4), 0), DAT_fffffefc);
    }
    local_108 = (local_108 + 1);
  } ( true );
}


 export function FUN_004ce2f3 ()

 {
  DAT_006a4f98 = 0;
  DAT_006a4f9c = 0;
  DAT_006a1908 = DAT_006a1908;
  return;
}


 export function FUN_004ce322 ()

 {
  FUN_00552112();
  FUN_0040fdb0(DAT_006a18c0, DAT_006a1b7c, 0x1d);
  FUN_005baeb0(DAT_006a18c0);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  FUN_00408460();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x004ce598)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x004ce49e)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x004ce621)  */ */ export function FUN_004ce38a (param_1, param_2)

 {
  let extraout_EAX;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let unaff_FS_OFFSET;
  let local_ac;
  let local_5c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004ce702;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f3e0();
  local_8 = 0;
  FUN_0040f3e0();
  local_8 = ((((local_8) >> 8) << 8) | 1);
  DAT_006a4f9c = 1;
  DAT_006a1d78 = param_1;
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  DAT_006a4f90 = DAT_006a4f90;
  FUN_004cdfa4(param_2, 0xd, 0, 0x14, 0x258, (extraout_EAX_00 * 0x14 + (extraout_EAX + 8)), 0, 0, 0);
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  iVar1 = (extraout_EAX_01 + 8);
  iVar2 = ((DAT_006a19ec + -6) / 2 | 0);
  FUN_004086c0(DAT_ffffffa4, (DAT_006a19e4 + 4), (DAT_006a19e8 + 4), (DAT_006a19ec + -9), ((DAT_006a19f0 - iVar1) + -9));
  FUN_004bb620(DAT_006a1908, 0xc9, DAT_ffffffa4, 0, 2, 1);
  (s32((param_1 + local_ac * 4), 0) !== 0) (local_ac = 0; (local_ac = (local_ac < 0x14) && (param_1 = (param_1 + local_ac * 4)));
      local_ac = (local_ac + 1)) {
    if ((local_ac !== 0)) {
      FUN_00492ae0(DAT_0062e1d8);
    }
    FUN_00492ae0(s32((param_1 + local_ac * 4), 0));
  }
  iVar3 = ((DAT_006a19e8 + DAT_006a19f0) - (extraout_EAX_01 + 0xa));
  iVar4 = (DAT_006a19e4 + 2);
  FUN_004086c0(DAT_ffffffa4, iVar4, iVar3, iVar2, iVar1);
  uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(DAT_006a1908, 0x65, DAT_ffffffa4, uVar5);
  FUN_0040f880(LAB_00401d84);
  FUN_004086c0(DAT_ffffffa4, (iVar4 + (iVar2 + 2)), iVar3, iVar2, iVar1);
  uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(DAT_006a1908, 0x66, DAT_ffffffa4, uVar5);
  FUN_0040f880(LAB_004011d1);
  FUN_0040f840();
  DAT_006a18c0 = DAT_006a18c0;
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006a4f9c !== 0)) {
    FUN_0040ef50();
  }
  FUN_00553379();
  local_8 = (local_8 & -0x100);
  FUN_004ce6ed();
  local_8 = -1;
  FUN_004ce6f9();
  FUN_004ce70c();
  return;
}


 export function FUN_004ce6ed ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004ce6f9 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004ce70c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004ce71b (param_1)

 {
  let iVar1;
  let sVar2;
  let sVar3;
  let bVar4;
  let local_10;
  let local_c;

  iVar1 = FUN_004a2379(DAT_0062e1dc, 0);
  if ((iVar1 === 0)) {
    do {
      iVar1 = FUN_004a23fc(1);
      if ((iVar1 === 0)) {
        local_c = _strlen(param_1);
      }
      else {
        local_c = _strlen(DAT_00679640);
      }
      iVar1 = __strnicmp(param_1, DAT_00679640, local_c);
    } while ((iVar1 !== 0)) {
 LAB_004ce7c5: :
    if ((DAT_006a4f88 === 0)) {
      local_10 = 0;
    }
    else {
      local_10 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_10);
    FUN_0040ff60(0, param_1);
    iVar1 = FUN_00444270(s_NOCITY_0062e1e4);
    FUN_0059d3c9(0);
    bVar4 = (iVar1 === 0);
  }
  return bVar4;
}


 export function FUN_004ce83d ()

 {
  let hWnd;
  let Msg;
  let wParam;
  let lParam;
  let local_8;

  (local_8 < s32((DAT_006a4f88 + 0x2f8), 0)) (local_8 = 0; local_8 = (local_8 < s32((DAT_006a4f88 + 0x2f8), 0)); local_8 = (local_8 + 1)) {
    lParam = 0;
    wParam = 0;
    Msg = 0x14f;
    hWnd = FUN_00418770();
    FUN_006e7d6c(hWnd, Msg, wParam, lParam);
  }
  return;
}


 export function FUN_004ce8a4 (param_1, param_2, param_3, param_4)

 {
  let lVar1;
  let local_120;
  let local_1c;
  let local_8;

  __itoa(param_3, DAT_ffffffe4, 0xa);
  local_8 = FUN_0051d63b(param_1, param_2, 6, DAT_ffffffe4, DAT_fffffee0);
  lVar1 = _atol(DAT_fffffee0);
  w32(param_4, 0, lVar1);
  return local_8;
}


 export function FUN_004ce903 (param_1, param_2, param_3)

 {
  let sVar1;
  let iVar2;
  let local_c;

  sVar1 = _strlen(param_1);
  if ((param_3 < (sVar1 + 1))) {
    sVar1 = _strlen(param_1);
    local_c = (sVar1 + 1);
  }
  else {
    local_c = param_3;
  }
  iVar2 = FUN_00498159((param_2 + 0x2f4), local_c);
  if ((iVar2 === 0)) {
    FUN_00589ef8(-9, 3, 0, 0, 0);
  }
  FUN_005f22d0(iVar2, param_1);
  return iVar2;
}


 export function FUN_004ce98e (param_1, param_2)

 {
  let _Dst;
  let uVar1;
  let local_10;
  let local_c;
  let local_8;

  (local_c !== 0) (local_c = s32((param_2 + 0x30c), 0); local_c = (local_c !== 0);
      local_c = s32((local_c + 0x1bc), 0)) {
    _Dst = FUN_004fa617();
    if ((_Dst === 0)) {
      FUN_00589ef8(-9, 3, 0, 0, 0);
    }
    FID_conflict:_memcpy(_Dst, local_c, 0x1bc);
  }
  local_c = s32((param_2 + 0x30c), 0);
  local_10 = s32((param_1 + 0x30c), 0);
  do {
    if ((local_c === 0)) {
      return;
    }
    if ((s32((local_c + 8), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 8), 0), param_1, 0xf);
      w32((local_10 + 8), 0, uVar1);
      if ((s32((local_10 + 8), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x10), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x10), 0), param_1, 0x18);
      w32((local_10 + 0x10), 0, uVar1);
      if ((s32((local_10 + 0x10), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x14), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x14), 0), param_1, 0x18);
      w32((local_10 + 0x14), 0, uVar1);
      if ((s32((local_10 + 0x14), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x20), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x20), 0), param_1, 0x18);
      w32((local_10 + 0x20), 0, uVar1);
      if ((s32((local_10 + 0x20), 0) === 0)) {
        return;
      }
    }
    (s32(((local_c + 0x38) + local_8 * 4), 0) !== 0) (local_8 = 0; (local_8 = (local_8 < 0x14) && (local_c = local_c));
        local_8 = (local_8 + 1)) {
      uVar1 = FUN_004ce903(s32(((local_c + 0x38) + local_8 * 4), 0), param_1, 1);
      w32(((local_10 + 0x38) + local_8 * 4), 0, uVar1);
      if ((s32(((local_10 + 0x38) + local_8 * 4), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x88), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x88), 0), param_1, 0x18);
      w32((local_10 + 0x88), 0, uVar1);
      if ((s32((local_10 + 0x88), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x90), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x90), 0), param_1, 0xf);
      w32((local_10 + 0x90), 0, uVar1);
      if ((s32((local_10 + 0x90), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0xc4), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0xc4), 0), param_1, 0x18);
      w32((local_10 + 0xc4), 0, uVar1);
      if ((s32((local_10 + 0xc4), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0xcc), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0xcc), 0), param_1, 0x18);
      w32((local_10 + 0xcc), 0, uVar1);
      if ((s32((local_10 + 0xcc), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0xd4), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0xd4), 0), param_1, 0x18);
      w32((local_10 + 0xd4), 0, uVar1);
      if ((s32((local_10 + 0xd4), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0xdc), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0xdc), 0), param_1, 0xf);
      w32((local_10 + 0xdc), 0, uVar1);
      if ((s32((local_10 + 0xdc), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x13c), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x13c), 0), param_1, 0x18);
      w32((local_10 + 0x13c), 0, uVar1);
      if ((s32((local_10 + 0x13c), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x140), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x140), 0), param_1, 0x18);
      w32((local_10 + 0x140), 0, uVar1);
      if ((s32((local_10 + 0x140), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x148), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x148), 0), param_1, 0xf);
      w32((local_10 + 0x148), 0, uVar1);
      if ((s32((local_10 + 0x148), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x174), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x174), 0), param_1, 0x18);
      w32((local_10 + 0x174), 0, uVar1);
      if ((s32((local_10 + 0x174), 0) === 0)) {
        return;
      }
    }
    if ((s32((local_c + 0x184), 0) !== 0)) {
      uVar1 = FUN_004ce903(s32((local_c + 0x184), 0), param_1, 1);
      w32((local_10 + 0x184), 0, uVar1);
      if ((s32((local_10 + 0x184), 0) === 0)) {
        return;
      }
    }
    local_c = s32((local_c + 0x1bc), 0);
    local_10 = s32((local_10 + 0x1bc), 0);
  } /* goto */ ( true );
}


 export function FUN_004cef35 ()

 {
  let unaff_FS_OFFSET;
  let local_320;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004cefd1;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_004fa4be(0xc350);
  local_8 = 0;
  FUN_004fa5d9(0xc350);
  FUN_004ce98e(DAT_fffffce0, DAT_0064b690);
  FUN_004fa5d9(0xc350);
  FUN_004ce98e(DAT_0064b690, DAT_fffffce0);
  local_8 = -1;
  FUN_004cefc5();
  FUN_004cefdb();
  return;
}


 export function FUN_004cefc5 ()

 {
  FUN_004fa569();
  return;
}


 export function FUN_004cefdb (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004cefe9 (param_1, param_2)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  (local_c !== 0) (local_c = DAT_0064b99c; local_c = (local_c !== 0); local_c = s32((local_c + 0x1bc), 0)) {
    if ((s32((local_c + 8), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 8), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 8), 0), param_2, 0xf);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0x90), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0x90), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0x90), 0), param_2, 0xf);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0xdc), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0xdc), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0xdc), 0), param_2, 0xf);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0x148), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0x148), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0x148), 0), param_2, 0xf);
        local_8 = (local_8 + 1);
      }
    }
  }
  return local_8;
}


 export function FUN_004cf144 (param_1, param_2)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  (local_c !== 0) (local_c = DAT_0064b99c; local_c = (local_c !== 0); local_c = s32((local_c + 0x1bc), 0)) {
    if ((s32((local_c + 0x14), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0x14), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0x14), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0x20), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0x20), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0x20), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0x88), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0x88), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0x88), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0xc4), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0xc4), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0xc4), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0xcc), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0xcc), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0xcc), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0xd4), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0xd4), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0xd4), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0x140), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0x140), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0x140), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0x174), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0x174), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0x174), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
  }
  return local_8;
}


 export function FUN_004cf3ba (param_1, param_2)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  (local_c !== 0) (local_c = DAT_0064b99c; local_c = (local_c !== 0); local_c = s32((local_c + 0x1bc), 0)) {
    if ((s32((local_c + 0x10), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0x10), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0x10), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
    if ((s32((local_c + 0x13c), 0) !== 0)) {
      iVar1 = _strcmp(s32((local_c + 0x13c), 0), param_1);
      if ((iVar1 === 0)) {
        _strncpy(s32((local_c + 0x13c), 0), param_2, 0x18);
        local_8 = (local_8 + 1);
      }
    }
  }
  return local_8;
}


 export function FUN_004cff70 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bd270(s32((in_ECX + 8), 0), param_1);
  return;
}


 export function FUN_004cffb0 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005d2ded(s32((in_ECX + 0x1c), 0), param_1, param_2, param_3);
  return;
}


 export function FUN_004cfff0 (param_1)

 {
  let sVar1;
  let local_8;

  sVar1 = _strlen(param_1);
  if ((sVar1 !== 0)) {
    (local_8 !== param_1) (local_8 = (param_1 + (sVar1 - 1));
        (param_1 = (param_1 <= local_8) &&
        (((local_8 = _MEM[local_8] || (local_8 = _MEM[local_8])) && (_MEM[local_8] = 0, local_8 = (local_8 !== param_1)))));
        local_8 = (local_8 + -1)) {
    }
  }
  return;
}
