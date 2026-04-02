// Block 0x00520000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 51

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_00521807 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0052181d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0052182c (param_1, param_2)

 {
  let sVar1;
  let uVar2;
  let local_84;

  local_84 = 0;
  FUN_004af14b(DAT_ffffff7c, param_2);
  if ((s32((param_1 + 0x134), 0) !== 0)) {
    FUN_005f22e0(DAT_ffffff7c, DAT_00632268);
    FUN_005f22e0(DAT_ffffff7c, s32((param_1 + 0x134), 0));
  }
  sVar1 = _strlen(DAT_ffffff7c);
  uVar2 = FUN_00498159((param_1 + 0x254), (sVar1 + 1));
  w32((param_1 + 0x134), 0, uVar2);
  FUN_005f22d0(s32((param_1 + 0x134), 0), DAT_ffffff7c);
  return;
}


 export function FUN_005218cb (param_1)

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let local_844;
  let local_410;
  let local_3e8;
  let local_3d4;
  let local_11c;
  let local_118;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00521fc7;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_005c64da();
  local_8 = ((((local_8) >> 8) << 8) | 1);
 LAB_00521912: :
  do {
    if ((DAT_0062b420 === 0)) {
      FUN_0046e6a9();
      FUN_0046e020(0x6b, 0, 1, 0);
    }
    FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff7bc);
    FUN_00419be0(DAT_0063cbd0);
    FUN_00419ba0(0x9e);
    FUN_00419b80();
    iVar1 = FUN_00477d8c(1, param_1, 1);
    if ((iVar1 !== 0)) {
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff7bc);
      FUN_00419be0(DAT_0063cbd0);
      FUN_00419ba0(0x9e);
      FUN_00419b80();
      local_8 = (local_8 & -0x100);
      FUN_00521faf();
      local_8 = -1;
      FUN_00521fbb();
      FUN_00521fd1();
      return;
    }
    FUN_004729ab(DAT_fffffee8, DAT_00679640, DAT_0062cd24);
    if ((DAT_0062b420 !== 0)) {
      FUN_0046e020(0x6a, 0, 0, 0);
    }
    DAT_00655aea = (DAT_0064bc1e & -0x8001);
    DAT_00655af2 = DAT_0064bc22;
    FUN_0040ff60(0, DAT_0064bc62);
    FUN_00421da0(0, ((DAT_0064bcb2) << 16 >> 16));
    FUN_0040bbb0();
    uVar2 = FUN_00484fec(((DAT_00655af8) << 16 >> 16));
    FUN_00421f10(uVar2);
    FUN_0040ff60(1, DAT_00679640);
    FUN_0040bbb0();
    if ((DAT_0064bcb8 === 0)) {
      FUN_00421f10(0x7d0);
    }
    else {
      uVar2 = FUN_00484fec(((DAT_0064bcb8) << 16 >> 16));
      FUN_00421f10(uVar2);
    }
    FUN_0040ff60(2, DAT_00679640);
    if ((DAT_0062b420 !== 0)) {
      FUN_00419c8b();
    }
    FUN_00421dd0();
    iVar1 = Create(DAT_fffffbf0, DAT_fffffee8, 0x63226c, 0x4008001);
    if ((iVar1 !== 0)) {
      FUN_0059ec88((DAT_00641848 + u8(DAT_006560f6[iVar1 * 0x20]) * 0x3c), 0, 0);
    }
    iVar1 = FUN_0040bc80(0);
  } while ((iVar1 < 0)) {
 LAB_00521c07: :
    while ((local_14 < 0)) {
      FUN_0040ffa0(s_DIFFICULTY_00632288, 1);
      FUN_0059ea99(DAT_00655b08);
      FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      local_14 = FUN_0040bc80(0);
      if ((local_14 < 0)) {
        DAT_00655aea = (DAT_00655aea | 0x100);
      }
      else {
        DAT_00655aea = (DAT_00655aea & -0x101);
      }
      while ((iVar1 < 0)) {
        DAT_00654fa6 = 0;
        DAT_0062c488 = 0;
        FUN_0051d7bc();
        FUN_0051d7d6(0, ((DAT_00666546) << 16 >> 16));
        FUN_0051d7d6(1, ((DAT_00666548) << 16 >> 16));
        FUN_0051d7d6(2, ((DAT_0066654a) << 16 >> 16));
        FUN_0051d7d6(3, ((DAT_0066654c) << 16 >> 16));
        FUN_0051d7d6(4, ((DAT_006665fe) << 16 >> 16));
        FUN_0051d7d6(5, ((DAT_00666600) << 16 >> 16));
        FUN_005a632a(DAT_006359d4, s_ADVANCEDMP_00632294, 0, 0, 0, 0, 0, 0);
        if ((DAT_006c3160 === 0)) {
          DAT_006ad684 = 0;
          DAT_00654c7c = 0;
        }
        else {
          FUN_0040bbb0();
          FUN_0040bc10(0x364);
          FUN_0059edf0(DAT_00679640, 6, 0);
          FUN_0051d7d6(6, ((DAT_0066654e) << 16 >> 16));
        }
        if (((local_3d4 & 4) !== 0)) {
          (local_11c < local_3e8) (local_11c = 0; local_11c = (local_11c < local_3e8); local_11c = (local_11c + 1)) {
            FUN_0059ea4d(local_11c, ((1 << (((local_11c) & 0xFF) & 0x1f)) & DAT_00631ed8));
          }
        }
        FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
        iVar1 = FUN_0040bc80(0);
        FUN_0046e020(0x6a, 0, 0, 0);
        if ((iVar1 < 0)) {
          DAT_00654c7c = FUN_0059e9f3(6);
          DAT_0066654e = FUN_0059e9f3(6);
        }
        if ((iVar1 === 0)) {
          local_8 = (local_8 & -0x100);
          FUN_00521faf();
          local_8 = -1;
          FUN_00521fbb();
          FUN_00521fd1();
          return;
        }
      }
    }
  }
  goto LAB_00521912;
}


 export function FUN_00521faf ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00521fbb ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00521fd1 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00521fe0 (param_1)

 {
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_444;
  let local_440;
  let local_43c;
  let local_438;
  let local_334;
  let local_330;
  let local_32c;
  let local_38;
  let local_34;
  let aiStack_30;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00522623;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  DAT_00655b0b = 0;
  DAT_00628048 = 0;
  local_330 = 0;
  do {
    if ((param_1 <= local_330)) {
      DAT_00654fa4 = DAT_00628048;
      DAT_006d1da0 = u8(DAT_00628048);
      DAT_00655b05 = DAT_00628048;
      DAT_00654fa6 = 1;
      DAT_0062c488 = 1;
      local_8 = -1;
      FUN_00522617();
      FUN_0052262d();
      return;
    }
    while ((-1 < iVar2)) {
      while ((iVar2 === 0)) {
        do {
          FUN_0040bc40(1);
          FUN_0052182c(DAT_fffffcd4, (local_330 + 0x25e));
          local_334 = 0;
          (local_444 < 8) (local_444 = 1; local_444 = (local_444 < 8); local_444 = (local_444 + 1)) {
            if ((((1 << (((local_444) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
              FUN_0040bbb0();
              uVar1 = FUN_00493c7d(local_444);
              FUN_0040bbe0(uVar1);
              FUN_0040fe10();
              FUN_0040fea0();
              uVar1 = FUN_00493b10(local_444);
              FUN_0040bbe0(uVar1);
              FUN_0040fed0();
              FUN_0040fe10();
              FUN_0040fea0();
              FUN_0040ff30(((s16((DAT_0064c708 + local_444 * 0x594), 0)) << 16 >> 16));
              FUN_0040fe10();
              FUN_0040bc10(0xc5);
              FUN_0040bbe0(DAT_006322a0);
              FUN_0040ff30(((s16((DAT_0064c706 + local_444 * 0x594), 0)) << 16 >> 16));
              FUN_0040fe10();
              FUN_0040bc10(0xc4);
              FUN_0040bbe0(DAT_006322a4);
              local_38 = FUN_0059edf0(DAT_00679640, local_444, 0);
              w32(DAT_ffffffd0, s32((local_38 + 4), 0), local_444);
              if ((((1 << (((local_444) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
                if ((local_334 === 0)) {
                  local_334 = 1;
                  FUN_0059ea99(s32((local_38 + 4), 0));
                }
              }
              else {
                FUN_0059e8db(s32((local_38 + 4), 0), 1);
              }
            }
          }
          iVar2 = FUN_0040bc80(0);
          if ((iVar2 < 0)) {
            local_8 = -1;
            FUN_00522617();
            FUN_0052262d();
            return;
          }
          DAT_006d1da0 = s32(DAT_ffffffd0, iVar2);
          local_444 = ((s32(DAT_ffffffd0, iVar2)) & 0xFF);
          if ((local_330 === 0)) {
            DAT_00628048 = ((s32(DAT_ffffffd0, iVar2)) & 0xFF);
          }
          DAT_00655b0b = (DAT_00655b0b | (((1 << (((s32(DAT_ffffffd0, iVar2)) & 0xFF) & 0x1f))) & 0xFF));
          DAT_00655b03 = ((s32(DAT_ffffffd0, iVar2)) & 0xFF);
          DAT_00655b05 = ((s32(DAT_ffffffd0, iVar2)) & 0xFF);
          DAT_00655aea = (DAT_00655aea & -0x101);
          iVar2 = FUN_005a632a(DAT_006359d4, DAT_006322a8, 0x17, (DAT_0064bcfa + s8(((s32(DAT_ffffffd0, iVar2)) & 0xFF)) * 0xf2), 0, 0, 0, 1);
        } while ((iVar2 !== 0)) {
      w16((DAT_0064c6a0 + s32(DAT_ffffffd0, iVar2) * 0x594), 0, (s16((DAT_0064c6a0 + s32(DAT_ffffffd0, iVar2) * 0x594), 0) | 0x200));
    }
    (local_34 < 7) (local_34 = 0; local_34 = (local_34 < 7); local_34 = (local_34 + 1)) {
      (local_43c < 2) (local_43c = 0; local_43c = (local_43c < 2); local_43c = (local_43c + 1)) {
        w16((DAT_0065550c + (local_34 * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_43c * 2))), 0, ((s32((DAT_00654fe0 + (local_34 * 8 + local_43c * 4)), 0)) & 0xFFFF));
      }
    }
    local_330 = (local_330 + 1);
  } ( true );
}


 export function FUN_00522617 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0052262d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0052263c (param_1, param_2)

 {
  if ((param_2 !== 0)) {
    DAT_00631ef0 = 5;
  }
  if ((param_1 === -1)) {
    if ((DAT_00631ef0 === 5)) {
      DAT_00631ef0 = 7;
    }
    else if ((DAT_00631ef0 === 6)) {
      DAT_00631ef0 = 5;
    }
    else if ((DAT_00631ef0 === 7)) {
      DAT_00631ef0 = 6;
    }
    FUN_0055a41d(2, 6, DAT_00631ef0);
  }
  else {
    FUN_0055a41d(2, 6, param_1);
  }
  return;
}


 export function FUN_005226fa (param_1)

 {
  let iVar1;

  if ((param_1 !== 0)) {
    DAT_00631eec = 1;
  }
  /* switch */ () {
  case 1 :
    DAT_00631eec = 3;
    iVar1 = -0x3e7;
    break;
  case 2 :
    DAT_00631eec = 1;
    iVar1 = ((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1);
    break;
  case 3 :
    DAT_00631eec = 4;
    iVar1 = (-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1));
    break;
  case 4 :
    DAT_00631eec = 2;
    iVar1 = -0x3e7;
    break;
  default :
    iVar1 = -0x3e7;
  }
  return iVar1;
}


 export function FUN_005227e3 ()

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_30c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00522b12;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_00655b02 < 3)) {
    FUN_0052263c(-1, 0);
    FUN_0040ffa0(s_HOTSEAT2_006322b8, 1);
    if ((4 < DAT_006c3164)) {
      FUN_0040bbb0();
      FUN_0040bc10(0x365);
      FUN_0059edf0(DAT_00679640, 3, 0);
    }
    if ((5 < DAT_006c3164)) {
      FUN_0040bbb0();
      FUN_0040bc10(0x366);
      FUN_0059edf0(DAT_00679640, 4, 0);
    }
    if ((6 < DAT_006c3164)) {
      FUN_0040bbb0();
      FUN_0040bc10(0x367);
      FUN_0059edf0(DAT_00679640, 5, 0);
    }
    FUN_0059ea99(((DAT_006665d8) << 16 >> 16));
    FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    /* switch */ () {
    case 1 :
      FUN_0059e8db(1, 1);
    case 2 :
      FUN_0059e8db(2, 1);
    case 3 :
      if ((4 < DAT_006c3164)) {
        FUN_0059e8db(3, 1);
      }
    case 4 :
      if ((5 < DAT_006c3164)) {
        FUN_0059e8db(4, 1);
      }
    case 5 :
      if ((6 < DAT_006c3164)) {
        FUN_0059e8db(5, 1);
      }
    }
    if (((((DAT_006665d8) << 16 >> 16) + 1) < u8(DAT_00655b0d))) {
      FUN_0059ea99(((DAT_006665d8) << 16 >> 16));
    }
    iVar1 = FUN_0040bc80(0);
    if ((iVar1 < 0)) {
      local_8 = -1;
      FUN_00522b06();
      FUN_00522b1c();
      return;
    }
    DAT_006665d8 = ((iVar1) & 0xFFFF);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
  }
  else {
    (local_30c < 8) (local_30c = 1; local_30c = (local_30c < 8); local_30c = (local_30c + 1)) {
    }
  }
  local_8 = -1;
  FUN_00522b06();
  FUN_00522b1c();
  return;
}


 export function FUN_00522b06 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00522b1c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00522b2b ()

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let unaff_FS_OFFSET;
  let local_324;
  let local_320;
  let local_1c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00522de2;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  uVar3 = DAT_006d1da0;
  uVar2 = DAT_00655b0b;
  uVar1 = DAT_00655b03;
  local_8 = 0;
  DAT_00655b0b = DAT_006c31a9;
  FUN_0055ae80(1);
  FUN_0050994f();
  FUN_004503d0();
  FUN_004503d0();
  (local_14 < 8) (local_14 = 0; local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
    if ((s16((DAT_0066ca84 + local_14 * 0x3f0), 0) !== 0)) {
      FUN_004503d0();
    }
  }
  FUN_00419b80();
  local_1c = 0;
  local_324 = 0;
  (local_320 < 8) (local_320 = 1; local_320 = (local_320 < 8); local_320 = (local_320 + 1)) {
    if ((((1 << (((local_320) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
      if ((((1 << (((local_320) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        local_1c = (local_1c + 1);
      }
      else {
        local_324 = (local_324 + 1);
      }
    }
  }
  if ((DAT_006c3164 === local_324)) {
    FUN_00421da0(0, DAT_006c3164);
    FUN_00421ea0(s_JOINGAME1_006322c4);
  }
  else if ((local_1c === 0)) {
    FUN_00421ea0(s_JOINGAME0_006322d0);
  }
  else {
    iVar4 = FUN_00523f02((local_324 + -1));
    if ((iVar4 === 0)) {
      uVar5 = FUN_00493c7d(DAT_006d1da0);
      FUN_00421d60(0, uVar5);
      FUN_00421ea0(s_JOINGAME3_006322dc);
    }
  }
  DAT_006c31a9 = DAT_00655b0b;
  DAT_00655b03 = uVar1;
  DAT_00655b0b = uVar2;
  DAT_006d1da0 = uVar3;
  FUN_004085f0();
  FUN_004085f0();
  (local_14 < 8) (local_14 = 0; local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
    if ((s16((DAT_0066ca84 + local_14 * 0x3f0), 0) !== 0)) {
      FUN_004085f0();
    }
  }
  FUN_0055b046(1);
  local_8 = -1;
  FUN_00522dd6();
  FUN_00522dec();
  return;
}


 export function FUN_00522dd6 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00522dec (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00522dfa ()

 {
  let local_c;
  let local_8;

  (local_c < 0x15) (local_c = 0; local_c = (local_c < 0x15); local_c = (local_c + 1)) {
    if ((s16((DAT_00655502 + local_c * 0x30), 0) < 1)) {
      w16((DAT_00655502 + local_c * 0x30), 0, ((~s16((DAT_00655502 + local_c * 0x30), 0)) + 1))
      ;
    }
    if ((s16((DAT_00655504 + local_c * 0x30), 0) < 1)) {
      w16((DAT_00655504 + local_c * 0x30), 0, ((~s16((DAT_00655504 + local_c * 0x30), 0)) + 1))
      ;
    }
    if ((s16((DAT_00655506 + local_c * 0x30), 0) < 1)) {
      w16((DAT_00655506 + local_c * 0x30), 0, ((~s16((DAT_00655506 + local_c * 0x30), 0)) + 1))
      ;
    }
    (local_8 < 7) (local_8 = 0; local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
      if ((s16((DAT_0065550c + (local_8 * 4 + local_c * 0x30)), 0) < 1)) {
        w16((DAT_0065550c + (local_8 * 4 + local_c * 0x30)), 0, ((~s16((DAT_0065550c + (local_8 * 4 + local_c * 0x30)), 0)) + 1));
      }
      if ((s16((DAT_0065550e + (local_8 * 4 + local_c * 0x30)), 0) < 1)) {
        w16((DAT_0065550e + (local_8 * 4 + local_c * 0x30)), 0, ((~s16((DAT_0065550e + (local_8 * 4 + local_c * 0x30)), 0)) + 1));
      }
    }
  }
  return;
}


 export function FUN_00522f8f (param_1)

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let local_314;
  let local_e8;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005233e4;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  DAT_00655b0a = (DAT_00655b0b | 1);
  (local_1c < 8) (local_1c = 1; local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
    if ((((1 << (((local_1c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      if ((s16((DAT_00655502 + local_1c * 0x30), 0) < 1)) {
        w16((DAT_00655502 + local_1c * 0x30), 0, ((~s16((DAT_00655502 + local_1c * 0x30), 0)) + 1));
      }
      if ((s16((DAT_00655504 + local_1c * 0x30), 0) < 1)) {
        w16((DAT_00655504 + local_1c * 0x30), 0, ((~s16((DAT_00655504 + local_1c * 0x30), 0)) + 1));
      }
      if ((s16((DAT_00655506 + local_1c * 0x30), 0) < 1)) {
        w16((DAT_00655506 + local_1c * 0x30), 0, ((~s16((DAT_00655506 + local_1c * 0x30), 0)) + 1));
      }
      (local_18 < 7) (local_18 = 0; local_18 = (local_18 < 7); local_18 = (local_18 + 1)) {
        if ((s16((DAT_0065550c + (local_18 * 4 + local_1c * 0x30)), 0) < 1)) {
          w16((DAT_0065550c + (local_18 * 4 + local_1c * 0x30)), 0, ((~s16((DAT_0065550c + (local_18 * 4 + local_1c * 0x30)), 0)) + 1));
        }
        if ((s16((DAT_0065550e + (local_18 * 4 + local_1c * 0x30)), 0) < 1)) {
          w16((DAT_0065550e + (local_18 * 4 + local_1c * 0x30)), 0, ((~s16((DAT_0065550e + (local_18 * 4 + local_1c * 0x30)), 0)) + 1));
        }
      }
    }
  }
  (local_18 < ((u8(DAT_00655b0d) + 1) - param_1)) (local_18 = 0; local_18 = (local_18 < ((u8(DAT_00655b0d) + 1) - param_1)); local_18 = (local_18 + 1)) {
    iVar1 = _rand();
    local_314 = (((iVar1 >> 0x1f)) & 0xFF);
    local_314 = (((((((iVar1) & 0xFF) ^ (((iVar1 >> 0x1f)) & 0xFF)) - (((iVar1 >> 0x1f)) & 0xFF)) & 7) ^ (((iVar1 >> 0x1f)) & 0xFF)) - (((iVar1 >> 0x1f)) & 0xFF))
    ;
    if ((((1 << ((((((((iVar1) & 0xFF) ^ (((iVar1 >> 0x1f)) & 0xFF)) - (((iVar1 >> 0x1f)) & 0xFF)) & 7) ^ (((iVar1 >> 0x1f)) & 0xFF)) - (((iVar1 >> 0x1f)) & 0xFF)) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
      DAT_00655b0a = (DAT_00655b0a | (((1 << ((((((((iVar1) & 0xFF) ^ (((iVar1 >> 0x1f)) & 0xFF)) - (((iVar1 >> 0x1f)) & 0xFF)) & 7) ^ (((iVar1 >> 0x1f)) & 0xFF)) - (((iVar1 >> 0x1f)) & 0xFF)) & 0x1f))) & 0xFF));
    }
    else {
      local_18 = (local_18 + -1);
    }
  }
  if ((DAT_00631ee4 !== 0)) {
    local_14 = 0;
    (local_314 < 8) (local_314 = 1; local_314 = (local_314 < 8); local_314 = (local_314 + 1)) {
      if ((((1 << (((local_314) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        local_14 = (local_14 + 1);
        FUN_00421da0(0, local_14);
        FUN_0052263c(9, 0);
        FUN_0040ffa0(s_OPPONENT_006322e8, 1);
        w32((local_e8 + 4), 0, 0x15);
        (local_1c < 0x15) (local_1c = 0; local_1c = (local_1c < 0x15); local_1c = (local_1c + 1)) {
          if ((((s16((DAT_006554fe + local_1c * 0x30), 0)) << 16 >> 16) === local_314)) {
            FUN_0040bbb0();
            FUN_0040ff00(((s16((DAT_00655504 + local_1c * 0x30), 0)) << 16 >> 16));
            FUN_0040fe10();
            FUN_0040fea0();
            FUN_0040ff00(((s16((DAT_00655502 + local_1c * 0x30), 0)) << 16 >> 16));
            FUN_0040fed0();
            FUN_0059edf0(DAT_00679640, local_1c, 0);
          }
        }
        iVar1 = (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1));
        uVar2 = FUN_005226fa(0, iVar1);
        FUN_0059e783(uVar2, iVar1);
        iVar1 = FUN_0040bc80(0);
        FUN_0046e020(0x6a, 0, 0, 0);
        FUN_0055a567();
        if ((iVar1 < 0)) {
          local_8 = -1;
          FUN_005233d8();
          FUN_005233ee();
          return;
        }
        if ((iVar1 < 0x15)) {
          local_1c = ((iVar1) & 0xFF);
          DAT_0062ced0[local_314] = ((iVar1) & 0xFF);
        }
      }
    }
  }
  local_8 = -1;
  FUN_005233d8();
  FUN_005233ee();
  return;
}


 export function FUN_005233d8 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005233ee (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005233fc (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let bVar3;
  let uVar4;
  let uVar5;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_c;
  let local_8;

  if ((DAT_006ad2f7 === 0)) {
    FUN_005dae6b(7, s_gNetMgr.bServer_00632320, s_D:\Ss\Franklinton\startup_multip_006322f4, 0x778);
  }
  uVar4 = DAT_006d1da0;
  bVar3 = DAT_00655b05;
  uVar2 = DAT_00655b03;
  if ((DAT_006ad640 < 2)) {
    iVar1 = s32((param_1 + 0x18), 0);
    uVar5 = s32((param_1 + 0x14), 0);
    local_24 = s32((param_1 + 0x10), 0);
    DAT_00655b03 = ((local_24) & 0xFF);
    w16((DAT_0064c6a6 + s8(((local_24) & 0xFF)) * 0x594), 0, ((uVar5) & 0xFFFF));
    local_8 = ((uVar5) & 0xFF);
    DAT_0064ca92[s8(((local_24) & 0xFF)) * 0x594] = local_8;
    if ((iVar1 !== 0)) {
      DAT_0064ca92[s8(((local_24) & 0xFF)) * 0x594] = (DAT_0064ca92[s8(((local_24) & 0xFF)) * 0x594] + 0x15);
    }
    DAT_006d1da0 = s8(DAT_00655b03);
    if ((DAT_006ad640 < 3)) {
      DAT_00655b0b = (DAT_00655b0b | (((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF));
    }
    else {
      DAT_006c31a8 = (DAT_006c31a8 | (((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF));
    }
    local_1c = ((iVar1) & 0xFF);
    DAT_006554fc[((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30] = local_1c;
    w16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, s16((DAT_00655508 + (u8(DAT_006554fc[((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30]) * 2 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30)), 0));
    uVar5 = FUN_00428b0c(((s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
    FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), uVar5);
    if ((0 < s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
      w16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
    }
    FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), (param_1 + 0x20));
    if ((s32((param_1 + 0x1c), 0) !== 0)) {
      w16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
      w16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
      (local_c < 7) (local_c = 0; local_c = (local_c < 7); local_c = (local_c + 1)) {
        if ((s16((DAT_0065550c + (local_c * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + iVar1 * 2))), 0) < 1)) {
          local_28 = ((~((s16((DAT_0065550c + (local_c * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + iVar1 * 2))), 0)) << 16 >> 16)) + 1);
        }
        else {
          local_28 = ((s16((DAT_0065550c + (local_c * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + iVar1 * 2))), 0)) << 16 >> 16);
        }
        uVar5 = FUN_00428b0c(local_28);
        FUN_005f22d0((DAT_0064bd42 + (s8(DAT_00655b03) * 0xf2 + local_c * 0x18)), uVar5);
        w16((DAT_0065550c + (local_c * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + iVar1 * 2))), 0, (-s16((DAT_0065550c + (local_c * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + iVar1 * 2))), 0)));
      }
      FUN_005f22d0((DAT_0064bd12 + s8(DAT_00655b03) * 0xf2), (param_1 + 0x38));
      FUN_005f22d0((DAT_0064bd2a + s8(DAT_00655b03) * 0xf2), (param_1 + 0x50));
      if ((s32((param_1 + 0x68), 0) !== 0)) {
        (local_c < 7) (local_c = 0; local_c = (local_c < 7); local_c = (local_c + 1)) {
          FUN_005f22d0((DAT_0064bd42 + (s8(DAT_00655b03) * 0xf2 + local_c * 0x18)), ((local_c * 0x18 + param_1) + 0x6c));
        }
      }
    }
    w16((DAT_0064bcf8 + s8(DAT_00655b03) * 0xf2), 0, ((s32((param_1 + 0x114), 0)) & 0xFFFF));
  }
  else {
    local_24 = s32((param_1 + 0x10), 0);
    if ((DAT_006ad640 < 3)) {
      DAT_00655b0b = (DAT_00655b0b | (((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF));
    }
    else {
      DAT_006c31a8 = (DAT_006c31a8 | (((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF));
    }
    DAT_00655b03 = ((local_24) & 0xFF);
    DAT_00655b05 = ((local_24) & 0xFF);
    DAT_006d1da0 = local_24;
    FUN_005f22d0((DAT_0064bcfa + s8(((local_24) & 0xFF)) * 0xf2), (param_1 + 0x20));
    if ((0 < s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(((local_24) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
      w16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(((local_24) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(((local_24) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
    }
    iVar1 = s32((param_1 + 0x18), 0);
    w16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0, (s16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0) & 0xfdff));
    if ((iVar1 !== 0)) {
      w16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0, (s16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0) | 0x200));
    }
    local_1c = ((iVar1) & 0xFF);
    DAT_006554fc[((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30] = local_1c;
  }
  (s32((DAT_006ad30c + local_20 * 0x54), 0) !== param_2) (local_20 = 0; (local_20 = (local_20 < 7) && (DAT_006ad30c = DAT_006ad30c));
      local_20 = (local_20 + 1)) {
  }
  if ((local_20 < 7)) {
    w32((DAT_006ad558 + s8(DAT_00655b03) * 4), 0, local_20);
    w32(DAT_006ad35c, local_20 * 0x15, s8(DAT_00655b03));
    DAT_006ad359[local_20 * 0x54] = 1;
    if ((param_2 === 0)) {
      DAT_006ad358[local_20 * 0x54] = 1;
    }
    else {
      DAT_006ad358[local_20 * 0x54] = 0;
    }
    uVar5 = 1;
  }
  else {
    if ((DAT_006ad640 < 3)) {
      DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF)));
    }
    else {
      DAT_006c31a8 = (DAT_006c31a8 & (~(((1 << (((local_24) & 0xFF) & 0x1f))) & 0xFF)));
    }
    FUN_0046b14d(0x31, 0, s32((param_1 + 0x14), 0), s32((param_1 + 0x10), 0), 0, 0, 0, 0, 0, 0);
    uVar5 = 0;
  }
  DAT_006d1da0 = uVar4;
  DAT_00655b05 = bVar3;
  DAT_00655b03 = uVar2;
  return uVar5;
}


 export function FUN_00523d8a (param_1)

 {
  FUN_0046b14d(0x17, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x18, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x19, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x1a, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x1b, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x1c, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x1d, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x1e, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x21, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x22, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x23, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0x24, param_1, 0, 0, 0, 0, 0, 0, 0, 0);
  return;
}


 export function FUN_00523f02 (param_1)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let unaff_FS_OFFSET;
  let uVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let local_44c;
  let local_448;
  let local_444;
  let local_440;
  let local_33c;
  let local_338;
  let local_334;
  let local_330;
  let local_32c;
  let local_c4;
  let local_38;
  let local_34;
  let aiStack_30;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005246cb;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_330 = 0;
  do {
    FUN_0040bc40(1);
    FUN_0052182c(DAT_fffffcd4, (param_1 + 0x25f));
    local_33c = 0;
    (local_44c < 8) (local_44c = 1; local_44c = (local_44c < 8); local_44c = (local_44c + 1)) {
      if ((((1 << (((local_44c) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        FUN_0040bbb0();
        uVar1 = FUN_00493c7d(local_44c);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
        FUN_0040fea0();
        uVar1 = FUN_00493b10(local_44c);
        FUN_0040bbe0(uVar1);
        FUN_0040fed0();
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040ff30(((s16((DAT_0064c708 + local_44c * 0x594), 0)) << 16 >> 16));
        FUN_0040fe10();
        FUN_0040bc10(0xc5);
        FUN_0040bbe0(DAT_00632330);
        FUN_0040ff30(((s16((DAT_0064c706 + local_44c * 0x594), 0)) << 16 >> 16));
        FUN_0040fe10();
        FUN_0040bc10(0xc4);
        FUN_0040bbe0(DAT_00632334);
        iVar2 = local_33c;
        local_33c = (local_33c + 1);
        local_38 = FUN_0059edf0(DAT_00679640, iVar2, 0);
        w32(DAT_ffffffd0, s32((local_38 + 4), 0), local_44c);
      }
    }
    local_334 = local_33c;
    local_338 = 0;
    (local_33c < local_334) (local_33c = 0; local_33c = (local_33c < local_334); local_33c = (local_33c + 1)) {
      local_38 = FUN_0059e7ad(local_33c);
      if ((local_38 !== 0)) {
        local_44c = ((s32(DAT_ffffffd0, s32((local_38 + 4), 0))) & 0xFF);
        if ((((1 << (((s32(DAT_ffffffd0, s32((local_38 + 4), 0))) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          local_338 = (local_338 + 1);
          FUN_0059e8db(s32((local_38 + 4), 0), 0);
          if ((local_c4 !== 0)) {
            FUN_00421ca0(s32((local_38 + 4), 0));
          }
        }
        else {
          FUN_0059e8db(s32((local_38 + 4), 0), 1);
          if ((local_c4 !== 0)) {
            FUN_00447210(s32((local_38 + 4), 0));
          }
        }
      }
    }
    local_330 = 0;
    (local_33c < local_334) (local_33c = 0; local_33c = (local_33c < local_334); local_33c = (local_33c + 1)) {
      local_38 = FUN_0059e7ad(local_330);
      if (((_MEM[local_38] & 1) === 0)) {
        FUN_0059ea99(s32((local_38 + 4), 0));
        if ((local_c4 !== 0)) {
          FUN_004472f0(s32((local_38 + 4), 0));
        }
        break;
      }
      local_330 = (local_330 + 1);
      if ((local_330 === local_334)) {
        local_330 = 0;
      }
    }
    iVar2 = FUN_0040bc80(0);
    if ((iVar2 < 0)) {
      local_8 = -1;
      FUN_005246bf();
      FUN_005246d5();
      return;
    }
    iVar2 = s32(DAT_ffffffd0, iVar2);
    local_44c = ((iVar2) & 0xFF);
    DAT_00655b0b = (DAT_00655b0b | (((1 << (((iVar2) & 0xFF) & 0x1f))) & 0xFF));
    uVar7 = 1;
    uVar6 = 0;
    uVar5 = 0;
    uVar4 = 0;
    DAT_006d1da0 = iVar2;
    uVar1 = FUN_00493b10(iVar2, 0, 0, 0, 1);
    iVar3 = FUN_005a632a(DAT_006359d4, DAT_00632338, 0x17, uVar1, uVar4, uVar5, uVar6, uVar7);
    if ((iVar3 === 0)) {
      FUN_0052182c(DAT_fffffcd4, (param_1 + 0x25f));
      iVar3 = FUN_005a5f34(DAT_fffffbc0, 0);
      if ((iVar3 === 0)) {
        FUN_005f22d0((DAT_0064bcfa + iVar2 * 0xf2), DAT_fffffbc0);
        if ((0 < s16((DAT_00655502 + ((s16((DAT_0064c6a6 + iVar2 * 0x594), 0)) << 16 >> 16) * 0x30), 0))) {
          w16((DAT_00655502 + ((s16((DAT_0064c6a6 + iVar2 * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + iVar2 * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
        }
        iVar2 = FUN_00498a5c(DAT_006d1da0);
        if ((iVar2 === 0)) {
          DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((iVar2) & 0xFF) & 0x1f))) & 0xFF)));
        }
        else {
          FUN_0040ffa0(s_GENDER_00632340, 1);
          FUN_0052182c(DAT_fffffcd4, (param_1 + 0x25f));
          FUN_0059ea99(DAT_006554fc[((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30]);
          FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
          iVar2 = FUN_0040bc80(0);
          FUN_0046e020(0x6a, 0, 0, 0);
          if ((-1 < iVar2)) {
            local_448 = ((iVar2) & 0xFF);
            DAT_006554fc[((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30] = local_448;
            w16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0, (s16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0) & 0xfdff));
            if ((iVar2 !== 0)) {
              w16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0, (s16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0) | 0x200));
            }
            (local_34 < 7) (local_34 = 0; local_34 = (local_34 < 7); local_34 = (local_34 + 1)) {
              (local_444 < 2) (local_444 = 0; local_444 = (local_444 < 2); local_444 = (local_444 + 1)) {
                w16((DAT_0065550c + (local_34 * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_444 * 2))), 0, ((s32((DAT_00654fe0 + (local_444 * 4 + local_34 * 8)), 0)) & 0xFFFF));
              }
            }
            local_8 = -1;
            FUN_005246bf();
            FUN_005246d5();
            return;
          }
          DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((iVar2) & 0xFF) & 0x1f))) & 0xFF)));
        }
      }
      else {
        DAT_00655b0b = ((DAT_00655b0b | (((1 << (((iVar2) & 0xFF) & 0x1f))) & 0xFF)) & (~(((1 << (((iVar2) & 0xFF) & 0x1f))) & 0xFF)));
      }
    }
  } while ( true );
}


 export function FUN_005246bf ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005246d5 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005261a0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0xab8), 0) <= s32((in_ECX + 0x120), 0))) {
    w32((in_ECX + 0x120), 0, 0);
  }
  w32((in_ECX + 0x1b34), 0, s32((in_ECX + 0xab8), 0));
  w32((in_ECX + 0x1f38), 0, s32((in_ECX + 0x120), 0));
  w32((in_ECX + 0x1f3c), 0, s32((in_ECX + 0x120), 0));
  while (((DAT_006a85a4 % 9) !== 0)) {
    w32((in_ECX + 0x1f3c), 0, (s32((in_ECX + 0x1f3c), 0) + -1));
  }
  (local_8 < s32((in_ECX + 0xab8), 0)) (local_8 = 0; local_8 = (local_8 < s32((in_ECX + 0xab8), 0)); local_8 = (local_8 + 1)) {
    w32(((in_ECX + 0x1b38) + local_8 * 4), 0, s32(((in_ECX + 0xb2c) + local_8 * 4), 0));
  }
  FUN_0040fd40(0, (s32((in_ECX + 0x1b34), 0) / 9 | 0));
  FUN_0040fcf0((s32((in_ECX + 0x1f3c), 0) / 9 | 0));
  if ((s32((in_ECX + 0x1b34), 0) < 1)) {
    w32((in_ECX + 0x1f3c), 0, -1);
  }
  FUN_00451bf0();
  FUN_004923c0();
  FUN_004518d0();
  FUN_004f6646();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x0052661a)  */ */ export function FUN_0052630d (in_ECX)

 {
  let iVar1;
  let extraout_EAX;
  let uVar2;
  let extraout_EAX_00;
  let sVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_88;
  let local_78;
  let local_68;
  let local_64;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  local_34 = 0;
  FUN_005c00ce(DAT_ffffffe8);
  FUN_005c0073((in_ECX + 0x5f8));
  FUN_00451bf0();
  FUN_004f6564((in_ECX + 0x5f8), 2);
  local_8 = DAT_0067a798;
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  local_3c = FUN_00407f90((in_ECX + 0x5f8));
  local_1c = FUN_0040ef70();
  local_48 = (s32((in_ECX + 0x5fc), 0) + 8);
  local_38 = ((local_3c / 2 | 0) + -100);
  local_68 = s32(((in_ECX + 0xb2c) + s32((in_ECX + 0x120), 0) * 4), 0);
  FUN_005cda06(DAT_ffffffb4, DAT_ffffffbc);
  FUN_005cd775(2, 1);
  local_50 = FUN_00451830();
  local_50 = (local_50 + DAT_0062d858 * 2);
  FUN_005cef31(DAT_ffffff88, DAT_006a6668, local_40, local_48);
  FUN_005cd775(local_4c, local_44);
  FUN_005c19ad(DAT_00635a1c);
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  iVar1 = FUN_004bb540();
  local_48 = (local_48 + (iVar1 * 2 + 5));
  FUN_0040bbb0();
  FUN_0040bc10(0x79);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_40, local_48, 5);
  iVar1 = FUN_0040efd0(DAT_00679640);
  local_40 = (local_40 + (iVar1 + 5));
  FUN_0040bbb0();
  if ((DAT_0064c48e[local_68 * 8] < 0)) {
    FUN_0040bc10(0xe);
    FUN_005c0f57(local_8, DAT_00679640, local_40, local_48, 5);
  }
  else {
    FUN_0040ff00(s32((DAT_00627684 + s8(DAT_0064c48e[local_68 * 8]) * 0x10), 0));
    local_20 = FUN_0040efd0(DAT_00679640);
    local_8 = ~_Timevec(local_8);
    FUN_006e7d90(DAT_ffffffd0, local_40, local_48, ((local_40 + local_20) + 5), (local_48 + extraout_EAX));
    FUN_00452c14(s8(DAT_0064c48e[local_68 * 8]), local_40, local_48, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
  }
  local_38 = local_40;
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  local_48 = (local_48 + local_1c);
  FUN_0040bbb0();
  FUN_0040bc10(0x84);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_40, local_48, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_00632428, u8(DAT_0064c48c[local_68 * 8]) * 0xa);
  FUN_005c0f57(local_8, DAT_00679640, local_38, local_48, 5);
  iVar1 = FUN_0040efd0(DAT_00679640);
  local_40 = ((local_38 + iVar1) + 3);
  iVar4 = (local_48 + (local_1c / 2 | 0));
  iVar1 = FUN_00451860();
  FUN_005cef31(DAT_ffffff78, DAT_006a6668, local_40, (iVar4 - (iVar1 / 2 | 0)));
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  local_48 = (local_48 + local_1c);
  FUN_0040bbb0();
  FUN_0040bc10(0x9f);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_40, local_48, 5);
  FUN_0040bbb0();
  if ((local_68 < 0x17)) {
    FUN_0040bc10(0xe);
    FUN_005c0f57(local_8, DAT_00679640, local_38, local_48, 5);
  }
  else if ((DAT_0064ba01[local_68] < 1)) {
    FUN_0040bc10(0xe);
    FUN_005c0f57(local_8, DAT_00679640, local_38, local_48, 5);
  }
  else {
    uVar2 = FUN_00428b0c(s32((DAT_00627684 + s8(DAT_0064ba01[local_68]) * 0x10), 0));
    FUN_0040bbe0(uVar2);
    local_20 = FUN_0040efd0(DAT_00679640);
    local_8 = ~_Timevec(local_8);
    FUN_006e7d90(DAT_ffffffd0, local_38, local_48, ((local_38 + local_20) + 5), (local_48 + extraout_EAX_00));
    FUN_00452c14(s8(DAT_0064ba01[local_68]), local_38, local_48, 0, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
  }
  local_40 = (s32((in_ECX + 0x5f8), 0) + 0xa);
  local_48 = (local_48 + local_1c * 2);
  FUN_0059a15d(local_68);
  sVar3 = _strlen(DAT_00679640);
  if ((sVar3 !== 0)) {
    iVar1 = s32((in_ECX + 0x604), 0);
    iVar4 = FUN_00407f90((in_ECX + 0x5f8));
    FUN_006e7d90(DAT_ffffff9c, local_40, local_48, ((iVar4 + -10) + local_40), iVar1);
    FUN_005c1167(local_8, DAT_00679640, DAT_ffffff9c, 5);
  }
  FUN_00452768(s32((in_ECX + 0x120), 0));
  FUN_005c0073(DAT_ffffffe8);
  FUN_00408490((in_ECX + 0x5f8));
  return;
}


 export function FUN_00526913 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_8;

  if ((DAT_006ad908 === 0)) {
    (s32(((in_ECX + 0xb2c) + local_8 * 4), 0) !== param_1) (local_8 = 0;
        (local_8 = (local_8 < s32((in_ECX + 0xab8), 0)) && (in_ECX = (in_ECX + 0xb2c)));
        local_8 = (local_8 + 1)) {
    }
    if ((s32((in_ECX + 0xab8), 0) !== local_8)) {
      FUN_004f7bd1(3, 1);
      w32((in_ECX + 0x120), 0, local_8);
      w32((in_ECX + 0x1f38), 0, local_8);
      w32((in_ECX + 0x124), 0, 1);
      w32((in_ECX + 0x11c), 0, 1);
      FUN_004f4793();
      FUN_00451bf0();
      uVar1 = FUN_004f8a9b(DAT_006a7d4c, local_8);
      FUN_005f22d0((in_ECX + 0x618), uVar1);
      FUN_004f6244();
      FUN_0052630d();
      FUN_00408460();
      FUN_004518d0();
      DAT_006a66b0 = DAT_006a66b0;
      FUN_005c61b0();
      DAT_006a66b0 = DAT_006a66b0;
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00526ca0 (in_ECX, param_1, param_2)

 {
  let iVar1;
  let pvVar2;
  let uVar3;
  let extraout_EAX;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let extraout_EAX_02;
  // in_ECX promoted to parameter;
  let iVar4;
  let unaff_FS_OFFSET;
  let uVar5;
  let local_53c;
  let local_538;
  let local_534;
  let local_530;
  let local_52c;
  let local_528;
  let local_524;
  let local_51c;
  let local_518;
  let local_514;
  let local_50c;
  let local_504;
  let local_4fc;
  let local_4f8;
  let local_4f4;
  let local_4ec;
  let local_4e8;
  let local_4e4;
  let local_4e0;
  let local_4d8;
  let local_4d4;
  let local_4cc;
  let local_4c4;
  let local_4c0;
  let local_4bc;
  let local_4b8;
  let local_4b0;
  let local_4ac;
  let local_4a8;
  let local_4a4;
  let local_498;
  let local_494;
  let local_490;
  let local_48c;
  let local_488;
  let local_484;
  let local_480;
  let local_47c;
  let local_478;
  let local_474;
  let local_470;
  let local_468;
  let local_464;
  let local_45c;
  let local_458;
  let local_44c;
  let local_448;
  let local_444;
  let local_43c;
  let local_434;
  let local_430;
  let local_42c;
  let local_424;
  let local_420;
  let local_418;
  let local_414;
  let local_410;
  let local_40c;
  let local_400;
  let local_3fc;
  let local_3f4;
  let local_3ec;
  let local_3e8;
  let local_3e4;
  let local_3e0;
  let local_3dc;
  let local_3d8;
  let local_3d4;
  let local_3c8;
  let local_3c4;
  let local_3c0;
  let local_3bc;
  let local_3b4;
  let local_3b0;
  let local_3ac;
  let local_3a0;
  let local_39c;
  let local_390;
  let local_38c;
  let local_380;
  let local_37c;
  let local_378;
  let local_370;
  let local_36c;
  let local_368;
  let local_364;
  let local_354;
  let local_34c;
  let local_344;
  let local_33c;
  let local_338;
  let local_330;
  let local_328;
  let local_324;
  let local_31c;
  let local_318;
  let local_314;
  let local_310;
  let local_30c;
  let local_308;
  let local_300;
  let local_2fc;
  let local_2f8;
  let local_2f4;
  let local_2ec;
  let local_2e8;
  let local_2e4;
  let local_2dc;
  let local_2d4;
  let local_2cc;
  let local_2c4;
  let local_2c0;
  let local_2bc;
  let local_2b8;
  let local_2b0;
  let local_2ac;
  let local_2a8;
  let local_2a4;
  let local_2a0;
  let local_29c;
  let local_294;
  let local_290;
  let local_28c;
  let local_288;
  let local_284;
  let local_27c;
  let local_278;
  let local_274;
  let local_270;
  let local_268;
  let local_264;
  let local_260;
  let local_258;
  let local_254;
  let local_250;
  let local_248;
  let local_240;
  let local_23c;
  let local_238;
  let local_230;
  let local_228;
  let local_220;
  let local_21c;
  let local_214;
  let local_210;
  let local_20c;
  let local_208;
  let local_204;
  let local_1fc;
  let local_1f8;
  let local_1f0;
  let local_1e0;
  let local_1dc;
  let local_1d8;
  let local_1d4;
  let local_1d0;
  let local_1cc;
  let local_1c8;
  let local_1c4;
  let local_1c0;
  let local_1bc;
  let local_1b8;
  let local_1b4;
  let local_1b0;
  let local_1ac;
  let local_19c;
  let local_198;
  let local_188;
  let local_184;
  let local_180;
  let local_17c;
  let local_16c;
  let local_168;
  let local_164;
  let local_160;
  let local_15c;
  let local_158;
  let local_138;
  let local_134;
  let local_130;
  let local_12c;
  let local_128;
  let local_124;
  let local_120;
  let local_11c;
  let local_118;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;
  let local_104;
  let local_100;
  let local_fc;
  let local_f8;
  let local_f4;
  let local_f0;
  let local_ec;
  let local_e8;
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
  let local_b4;
  let local_a4;
  let local_a0;
  let local_9c;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0052d4b8;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  if ((param_2 !== 1)) {
    FUN_005dae6b(7, s_leftright_==_LEFT_||_leftright_=_00632458, s_D:\Ss\Franklinton\parleywin_add_d_0063242c, 0xc);
  }
  if ((param_1 < 0)) {
    FUN_005dae6b(7, s_theDialog_>=_PDT_NULL_&&_PDT_NUL_006324ac, s_D:\Ss\Franklinton\parleywin_add_d_00632480, 0xd);
  }
  local_28 = 0;
  local_30 = 0;
  w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 0);
  if ((param_2 === 0)) {
    local_2c = (s32((in_ECX + 0x140), 0) + DAT_0062d858);
  }
  else if ((param_2 === 1)) {
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_2c = ((s32((in_ECX + 0x140), 0) + (iVar1 / 2 | 0)) + DAT_0062d858);
  }
  if ((param_1 === 0xe)) {
    local_28 = 1;
    /* switch */ (s32(((in_ECX + 0x20c) + param_2 * 4), 0) ( *) ((in_ECX + 0x20c)   ((in_ECX + 0x20c) + param_2 * 4) param_2 * 4  )) {
    case 0 :
      param_1 = 9;
      break;
    case 1 :
      param_1 = 8;
      break;
    case 2 :
      param_1 = 0xa;
      break;
    case 3 :
      param_1 = 0x11;
      break;
    case 4 :
      param_1 = 0xd;
      break;
    case 5 :
      param_1 = 0xc;
      break;
    case 6 :
      param_1 = 5;
    }
  }
  else if ((param_1 === 0x10)) {
    local_30 = 1;
    /* switch */ (s32((in_ECX + 0x214), 0) ( *) ((in_ECX + 0x214)  )) {
    case 0 :
      param_1 = 9;
      break;
    case 1 :
      param_1 = 8;
      break;
    case 2 :
      param_1 = 0xa;
      break;
    case 3 :
      param_1 = 0x11;
      break;
    case 4 :
      param_1 = 0xd;
      break;
    case 5 :
      param_1 = 0xc;
      break;
    case 6 :
      param_1 = 5;
    }
  }
  FUN_004b888e(param_2);
  w32(((in_ECX + 0x200) + param_2 * 4), 0, param_1);
  if ((param_1 !== 0)) {
    if ((param_1 === 0x14)) {
      FUN_0043c5f0();
      FUN_00453c40();
      FUN_0043c5f0();
      FUN_00453c40();
      FUN_0043c5f0();
      FUN_0040f380();
      FUN_0043c5f0();
      FUN_0040f380();
      FUN_0040f380();
    }
    else {
      FUN_0040f380();
      FUN_00453c80();
      FUN_0043c5f0();
      FUN_00453c40();
      FUN_0040f380();
      FUN_0043c5f0();
      FUN_0040f380();
      FUN_0043c5f0();
      FUN_0043c5f0();
    }
  }
  /* switch */ () {
  case 0 :
    break;
  case 1 :
    if ((DAT_00655b07 === 0)) {
      local_c8 = 0;
    }
    else {
      local_c8 = 1;
    }
    local_cc = local_2c;
    local_d8 = (s32((in_ECX + 0x140), 0) + DAT_0062d858);
    local_3c = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    local_38 = local_d8;
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = ((iVar1 + DAT_0062d858 * -2) / 3 | 0);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_370 = FUN_0040ef70();
    }
    else {
      local_370 = FUN_0040ef70();
    }
    local_14 = (DAT_0062d85c * 2 + local_370);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_220 = DAT_0069b030;
    }
    else {
      local_220 = DAT_0069b028;
    }
    FUN_005d25a8(local_220);
    pvVar2 = operator_new(0x3c);
    local_8 = 3;
    if ((pvVar2 === 0)) {
      local_228 = 0;
    }
    else {
      local_228 = FUN_0040f8b0();
    }
    local_8 = -1;
    w32((in_ECX + 0x2e8), 0, local_228);
    if ((in_ECX === 0)) {
      local_378 = 0;
    }
    else {
      local_378 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xba4), 0));
    FUN_00530ee0(local_378, 0x415, local_38, local_3c, local_34, uVar3);
    FUN_0040fad0(DAT_0068aedc);
    FUN_00530fb0();
    FUN_0040faa0(LAB_00403d28);
    pvVar2 = operator_new(0x3c);
    local_8 = 4;
    if ((pvVar2 === 0)) {
      local_230 = 0;
    }
    else {
      local_230 = FUN_0040f8b0();
    }
    local_8 = -1;
    w32((in_ECX + 0x2ec), 0, local_230);
    if ((in_ECX === 0)) {
      local_37c = 0;
    }
    else {
      local_37c = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd84), 0));
    FUN_00530ee0(local_37c, 0x430, (local_34 + local_38), local_3c, local_34, uVar3);
    FUN_0040fad0(DAT_0068aee0);
    FUN_00530fb0();
    FUN_0040faa0(LAB_00403d28);
    pvVar2 = operator_new(0x3c);
    local_8 = 5;
    if ((pvVar2 === 0)) {
      local_238 = 0;
    }
    else {
      local_238 = FUN_0040f8b0();
    }
    local_8 = -1;
    w32((in_ECX + 0x2f0), 0, local_238);
    if ((in_ECX === 0)) {
      local_380 = 0;
    }
    else {
      local_380 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xba8), 0));
    FUN_00530ee0(local_380, 0x416, (local_34 * 2 + local_38), local_3c, local_34, uVar3);
    FUN_0040fad0(DAT_0068aee4);
    FUN_00530fb0();
    FUN_0040faa0(LAB_00403d28);
    local_3c = (local_3c + local_14);
    FUN_005c19ad(0xa);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_23c = DAT_0069b030;
    }
    else {
      local_23c = DAT_0069b028;
    }
    uVar5 = 5;
    iVar1 = local_d8;
    iVar4 = local_3c;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd2c), 0), local_d8, local_3c, 5);
    FUN_005c0f57(local_23c, uVar3, iVar1, iVar4, uVar5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_240 = DAT_0069b030;
    }
    else {
      local_240 = DAT_0069b028;
    }
    uVar5 = 5;
    iVar4 = (local_cc - ((u8((s32((in_ECX + 0x154), 0) === 0)) - 1) & 0x17));
    iVar1 = local_3c;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd2c), 0), iVar4, local_3c, 5);
    FUN_005c0f57(local_240, uVar3, iVar4, iVar1, uVar5);
    local_38 = local_d8;
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_c4 = 5;
    }
    else {
      local_c4 = 0x17;
    }
    local_3c = (local_3c + local_14);
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = ((iVar1 + DAT_0062d858 * -2) / 2 | 0);
    local_d4 = 0;
    (local_d0 < 8) (local_d0 = 1; local_d0 = (local_d0 < 8); local_d0 = (local_d0 + 1)) {
      if (((DAT_0064c6c0[(DAT_006d1da0 * 4 + local_d0 * 0x594)] & 1) === 0)) {
        w32((DAT_0068aee8 + local_d0 * 4), 0, 0);
        w32((DAT_0068af08 + local_d0 * 4), 0, 0);
      }
      else {
        pvVar2 = operator_new(0x3c);
        local_8 = 6;
        if ((pvVar2 === 0)) {
          local_248 = 0;
        }
        else {
          local_248 = FUN_0040f8b0();
        }
        local_8 = -1;
        w32(((in_ECX + 0x2c8) + local_d0 * 4), 0, local_248);
        if ((in_ECX === 0)) {
          local_38c = 0;
        }
        else {
          local_38c = (in_ECX + 0x48);
        }
        FUN_00530ee0(local_38c, (local_d0 + 0x428), (local_38 + local_c4), local_3c, 0x23, DAT_006324dc);
        FUN_0040fad0(s32((DAT_0068af08 + local_d0 * 4), 0));
        FUN_00530fb0();
        FUN_0040faa0(LAB_00403657);
        pvVar2 = operator_new(0x3c);
        local_8 = 7;
        if ((pvVar2 === 0)) {
          local_250 = 0;
        }
        else {
          local_250 = FUN_0040f8b0();
        }
        local_8 = -1;
        w32(((in_ECX + 0x2a8) + local_d0 * 4), 0, local_250);
        if ((in_ECX === 0)) {
          local_390 = 0;
        }
        else {
          local_390 = (in_ECX + 0x48);
        }
        uVar3 = FUN_00493d13(local_d0);
        FUN_00530ee0(local_390, (local_d0 + 0x416), ((local_38 + local_c4) + 0x23), local_3c, ((local_34 + -35) - local_c4), uVar3);
        FUN_0040fad0(s32((DAT_0068aee8 + local_d0 * 4), 0));
        FUN_00530fb0();
        FUN_0040faa0(LAB_00403d28);
        local_d4 = (local_d4 + 1);
        if (((local_d4 & 1) === 0)) {
          local_38 = local_d8;
        }
        else {
          local_38 = local_cc;
        }
        if (((local_d4 & 1) === 0)) {
          if ((s32((in_ECX + 0x154), 0) === 0)) {
            local_c4 = 5;
          }
          else {
            local_c4 = 0x17;
          }
        }
        else if ((s32((in_ECX + 0x154), 0) === 0)) {
          local_c4 = 5;
        }
        else {
          local_c4 = 0;
        }
        if (((local_d4 & 1) === 0)) {
          local_3c = (local_3c + local_14);
        }
      }
    }
    break;
  case 2 :
    local_b4 = FUN_00428b0c(s32((DAT_00628420 + 0xb90), 0));
    local_b4 = FUN_00428b0c(s32((DAT_00628420 + 0xb94), 0));
    local_b4 = FUN_00428b0c(s32((DAT_00628420 + 0xb98), 0));
    local_b4 = FUN_00428b0c(s32((DAT_00628420 + 0xb9c), 0));
    local_a4 = FUN_00428b0c(s32((DAT_00628420 + 0xba0), 0));
    FUN_005c19ad(0xa);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb8c), 0));
      local_c0 = FUN_0040efd0(uVar3);
    }
    else {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb8c), 0));
      local_c0 = FUN_0040efd0(uVar3);
    }
    iVar4 = ((s32((in_ECX + 0x140), 0) + ((s32((in_ECX + 0x148), 0) - s32((in_ECX + 0x140), 0)) / 2 | 0)) - (local_c0 / 2 | 0));
    iVar1 = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_210 = DAT_0069b020;
    }
    else {
      local_210 = DAT_0069b018;
    }
    uVar5 = 5;
    local_3c = iVar1;
    local_38 = iVar4;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb8c), 0), iVar4, iVar1, 5);
    FUN_005c0f57(local_210, uVar3, iVar4, iVar1, uVar5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_c0 = FUN_0040efd0(UNNAMED);
    }
    else {
      local_c0 = FUN_0040efd0(UNNAMED);
    }
    (local_b8 < 5) (local_b8 = 1; local_b8 = (local_b8 < 5); local_b8 = (local_b8 + 1)) {
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_bc = FUN_0040efd0(s32(DAT_ffffff4c, local_b8));
      }
      else {
        local_bc = FUN_0040efd0(s32(DAT_ffffff4c, local_b8));
      }
      if ((local_c0 < local_bc)) {
        local_c0 = local_bc;
      }
    }
    local_2c = ((s32((in_ECX + 0x140), 0) + ((s32((in_ECX + 0x148), 0) - s32((in_ECX + 0x140), 0)) / 2 | 0)) - (local_c0 / 2 | 0));
    w32((in_ECX + 0x3ac), 0, local_2c);
    if ((local_38 < local_2c)) {
      local_2c = local_38;
      w32((in_ECX + 0x3ac), 0, local_38);
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_214 = DAT_0069b020;
    }
    else {
      local_214 = DAT_0069b018;
    }
    FUN_005d4167(local_214);
    pvVar2 = operator_new(0x50);
    local_8 = 2;
    if ((pvVar2 === 0)) {
      local_21c = 0;
    }
    else {
      local_21c = FUN_00531010();
    }
    local_8 = -1;
    w32(((in_ECX + 0x36c) + param_2 * 4), 0, local_21c);
    local_38 = local_2c;
    local_34 = (local_c0 + (local_c0 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_364 = FUN_0040ef70();
    }
    else {
      local_364 = FUN_0040ef70();
    }
    local_3c = ((s32((in_ECX + 0x144), 0) + DAT_0062d85c * 2) + local_364);
    local_14 = (s32((in_ECX + 0x1e0), 0) - local_3c);
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    if ((in_ECX === 0)) {
      local_368 = 0;
    }
    else {
      local_368 = (in_ECX + 0x48);
    }
    FUN_005310a0(local_368, 0x3f3, DAT_ffffffdc, 1, 5, DAT_ffffff4c);
    if ((s32((in_ECX + 0x208), 0) === -1)) {
      local_36c = 0;
    }
    else {
      local_36c = s32((in_ECX + 0x208), 0);
    }
    FUN_004472f0(local_36c);
    FUN_005311e0(LAB_00401d75);
    w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 1);
    break;
  case 3 :
    local_f4 = FUN_00428b0c(s32((DAT_00628420 + 0xbac), 0));
    local_f0 = FUN_00428b0c(s32((DAT_00628420 + 0xbb0), 0));
    local_ec = FUN_00428b0c(s32((DAT_00628420 + 0xbb4), 0));
    local_e8 = FUN_00428b0c(s32((DAT_00628420 + 0xbb8), 0));
    local_e4 = FUN_00428b0c(s32((DAT_00628420 + 0xbbc), 0));
    local_e0 = FUN_00428b0c(s32((DAT_00628420 + 0xbc0), 0));
    local_dc = FUN_00428b0c(s32((DAT_00628420 + 0xd08), 0));
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    iVar1 = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_254 = DAT_0069b030;
    }
    else {
      local_254 = DAT_0069b028;
    }
    uVar5 = 5;
    iVar4 = local_2c;
    local_3c = iVar1;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc0c), 0), local_2c, iVar1, 5);
    FUN_005c0f57(local_254, uVar3, iVar4, iVar1, uVar5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_258 = DAT_0069b030;
    }
    else {
      local_258 = DAT_0069b028;
    }
    FUN_005d4167(local_258);
    pvVar2 = operator_new(0x50);
    local_8 = 8;
    if ((pvVar2 === 0)) {
      local_260 = 0;
    }
    else {
      local_260 = FUN_00531010();
    }
    local_8 = -1;
    w32(((in_ECX + 0x36c) + param_2 * 4), 0, local_260);
    local_38 = local_2c;
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = ((iVar1 + DAT_0062d858 * -2) / 2 | 0);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_39c = FUN_0040ef70();
    }
    else {
      local_39c = FUN_0040ef70();
    }
    local_3c = ((s32((in_ECX + 0x144), 0) + DAT_0062d85c) + local_39c);
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), s32((in_ECX + 0x1e0), 0));
    if ((in_ECX === 0)) {
      local_3a0 = 0;
    }
    else {
      local_3a0 = (in_ECX + 0x48);
    }
    FUN_005310a0(local_3a0, 0x3f4, DAT_ffffffdc, 1, 7, DAT_ffffff0c);
    if ((s32((in_ECX + 0x210), 0) === 0)) {
      FUN_00447210(0);
    }
    else if ((s32((in_ECX + 0x210), 0) === 6)) {
      FUN_00447210(6);
    }
    FUN_004472f0(s32((in_ECX + 0x20c), 0));
    FUN_005311e0(LAB_00401d75);
    FUN_005311b0(LAB_004035d0);
    w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 1);
    break;
  case 4 :
    local_110 = FUN_00428b0c(s32((DAT_00628420 + 0xbac), 0));
    local_10c = FUN_00428b0c(s32((DAT_00628420 + 0xbb0), 0));
    local_108 = FUN_00428b0c(s32((DAT_00628420 + 0xbb4), 0));
    local_104 = FUN_00428b0c(s32((DAT_00628420 + 0xbb8), 0));
    local_100 = FUN_00428b0c(s32((DAT_00628420 + 0xbbc), 0));
    local_fc = FUN_00428b0c(s32((DAT_00628420 + 0xbc4), 0));
    local_f8 = FUN_00428b0c(s32((DAT_00628420 + 0xd08), 0));
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    iVar1 = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_264 = DAT_0069b030;
    }
    else {
      local_264 = DAT_0069b028;
    }
    uVar5 = 5;
    iVar4 = local_2c;
    local_3c = iVar1;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc10), 0), local_2c, iVar1, 5);
    FUN_005c0f57(local_264, uVar3, iVar4, iVar1, uVar5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_268 = DAT_0069b030;
    }
    else {
      local_268 = DAT_0069b028;
    }
    FUN_005d4167(local_268);
    pvVar2 = operator_new(0x50);
    local_8 = 9;
    if ((pvVar2 === 0)) {
      local_270 = 0;
    }
    else {
      local_270 = FUN_00531010();
    }
    local_8 = -1;
    w32(((in_ECX + 0x36c) + param_2 * 4), 0, local_270);
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = ((iVar1 + DAT_0062d858 * -2) / 2 | 0);
    local_38 = local_2c;
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_3ac = FUN_0040ef70();
    }
    else {
      local_3ac = FUN_0040ef70();
    }
    local_3c = ((s32((in_ECX + 0x144), 0) + DAT_0062d85c) + local_3ac);
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), s32((in_ECX + 0x1e0), 0));
    if ((in_ECX === 0)) {
      local_3b0 = 0;
    }
    else {
      local_3b0 = (in_ECX + 0x48);
    }
    FUN_005310a0(local_3b0, 0x3f5, DAT_ffffffdc, 1, 7, DAT_fffffef0);
    if ((s32((in_ECX + 0x20c), 0) === 0)) {
      FUN_00447210(0);
    }
    else if ((s32((in_ECX + 0x20c), 0) === 6)) {
      FUN_00447210(6);
    }
    FUN_004472f0(s32((in_ECX + 0x210), 0));
    FUN_005311e0(LAB_00401d75);
    FUN_005311b0(LAB_004035d0);
    w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 1);
    break;
  case 5 :
    local_120 = FUN_00428b0c(s32((DAT_00628420 + 0xbcc), 0));
    local_11c = FUN_00428b0c(s32((DAT_00628420 + 0xbd0), 0));
    local_118 = FUN_00428b0c(s32((DAT_00628420 + 0xbd4), 0));
    local_114 = FUN_00428b0c(s32((DAT_00628420 + 0xbd8), 0));
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    local_3c = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (((iVar1 + DAT_0062d858 * -2) / 2 | 0) + DAT_0062d858 * -5);
    if ((local_30 !== 0)) {
      FUN_004aef20(DAT_00679640);
      if ((param_2 === 0)) {
        local_3b4 = FUN_00428b0c(s32((DAT_00628420 + 0xc0c), 0));
      }
      else {
        local_3b4 = FUN_00428b0c(s32((DAT_00628420 + 0xc10), 0));
      }
      FUN_00414d70(local_3b4);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_274 = DAT_0069b030;
      }
      else {
        local_274 = DAT_0069b028;
      }
      FUN_005c0f57(local_274, DAT_00679640, local_38, local_3c, 5);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_3bc = FUN_0040ef70();
      }
      else {
        local_3bc = FUN_0040ef70();
      }
      local_3c = (local_3c + (DAT_0062d85c + local_3bc));
    }
    if ((local_30 === 0)) {
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_3c4 = FUN_0040ef70();
      }
      else {
        local_3c4 = FUN_0040ef70();
      }
      local_14 = (local_3c4 * 5 + DAT_0062d85c * 4);
    }
    else {
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_3c0 = FUN_0040ef70();
      }
      else {
        local_3c0 = FUN_0040ef70();
      }
      local_14 = (DAT_0062d85c * 3 + local_3c0 * 4);
    }
    local_3c = (s32((in_ECX + 0x144), 0) + (((s32((in_ECX + 0x1e0), 0) - s32((in_ECX + 0x144), 0)) - local_14) / 2 | 0));
    if (((local_30 === 0) && (local_28 === 0))) {
      local_3c8 = FUN_00428b0c(s32((DAT_00628420 + 0xb90), 0));
    }
    else {
      local_3c8 = FUN_00428b0c(s32((DAT_00628420 + 0xd08), 0));
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_278 = DAT_0069b030;
    }
    else {
      local_278 = DAT_0069b028;
    }
    FUN_005c0f57(local_278, local_3c8, local_38, local_3c, 5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_27c = DAT_0069b030;
    }
    else {
      local_27c = DAT_0069b028;
    }
    FUN_005d4167(local_27c);
    pvVar2 = operator_new(0x50);
    local_8 = 0xa;
    if ((pvVar2 === 0)) {
      local_284 = 0;
    }
    else {
      local_284 = FUN_00531010();
    }
    local_8 = -1;
    w32(((in_ECX + 0x36c) + param_2 * 4), 0, local_284);
    local_38 = local_2c;
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_3d4 = FUN_0040ef70();
    }
    else {
      local_3d4 = FUN_0040ef70();
    }
    local_3c = (local_3c + (DAT_0062d85c + local_3d4));
    if ((local_30 === 0)) {
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_3dc = FUN_0040ef70();
      }
      else {
        local_3dc = FUN_0040ef70();
      }
      local_14 = (DAT_0062d85c * 3 + local_3dc * 4);
    }
    else {
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_3d8 = FUN_0040ef70();
      }
      else {
        local_3d8 = FUN_0040ef70();
      }
      local_14 = (local_3d8 * 3 + DAT_0062d85c * 2);
    }
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    if ((in_ECX === 0)) {
      local_3e0 = 0;
    }
    else {
      local_3e0 = (in_ECX + 0x48);
    }
    FUN_005310a0(local_3e0, 0x3f6, DAT_ffffffdc, 1, (((local_30 === 0) && (local_28 === 0)) + 3), DAT_fffffee0);
    if ((s32((in_ECX + 0x218), 0) === 0)) {
      w32((in_ECX + 0x218), 0, (s32((in_ECX + 0x218), 0) + 1));
    }
    if ((s32((in_ECX + 0x218), 0) === 1)) {
      w32((in_ECX + 0x218), 0, (s32((in_ECX + 0x218), 0) + 1));
    }
    if ((s32((in_ECX + 0x218), 0) === 2)) {
      if (((local_30 === 0) && (local_28 === 0))) {
        w32((in_ECX + 0x218), 0, 3);
      }
      else {
        w32((in_ECX + 0x218), 0, 0);
      }
    }
    if ((s32((in_ECX + 0x218), 0) === 3)) {
      w32((in_ECX + 0x218), 0, 0);
    }
    FUN_004472f0(s32((in_ECX + 0x218), 0));
    FUN_005311e0(LAB_00401d75);
    FUN_005311b0(LAB_00403c2e);
    w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 1);
    break;
  case 6 :
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (((iVar1 + DAT_0062d858 * -2) / 2 | 0) - DAT_0062d858);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_3e4 = FUN_0040ef70();
    }
    else {
      local_3e4 = FUN_0040ef70();
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_3e8 = FUN_0040ef70();
    }
    else {
      local_3e8 = FUN_0040ef70();
    }
    local_14 = ((DAT_0062d85c * 2 + local_3e4 * 4) + local_3e8);
    local_3c = (s32((in_ECX + 0x144), 0) + (((s32((in_ECX + 0x1e0), 0) - s32((in_ECX + 0x144), 0)) - local_14) / 2 | 0));
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    FUN_005a9780(DAT_0067a7a8);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_00408700(DAT_ffffffdc, 0xa);
    iVar1 = FUN_00407f90(DAT_ffffffdc);
    local_38 = (UNNAMED + (iVar1 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_3ec = FUN_0040ef70();
    }
    else {
      local_3ec = FUN_0040ef70();
    }
    iVar1 = (local_3c + (DAT_0062d85c + (local_3ec / 2 | 0)));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_288 = DAT_0069b030;
    }
    else {
      local_288 = DAT_0069b028;
    }
    uVar5 = 0;
    iVar4 = local_38;
    local_3c = iVar1;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xbdc), 0), local_38, iVar1, 0);
    FUN_005c0f57(local_288, uVar3, iVar4, iVar1, uVar5);
    local_24 = (UNNAMED + DAT_0062d85c * -2);
    local_24 = (UNNAMED + DAT_0062d858 * 2);
    local_24 = (UNNAMED + DAT_0062d858 * -2);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_3f4 = FUN_0040ef70();
    }
    else {
      local_3f4 = FUN_0040ef70();
    }
    local_24 = (UNNAMED + (DAT_0062d85c + local_3f4));
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_005c0333(DAT_ffffffdc, DAT_00635a18);
    iVar1 = FUN_00407f90(DAT_ffffffdc);
    local_38 = (UNNAMED + (iVar1 / 2 | 0));
    iVar1 = FUN_00407fc0(DAT_ffffffdc);
    local_3c = ((UNNAMED + (DAT_0062d85c + local_3f4)) + (iVar1 / 2 | 0));
    FUN_0040bbb0();
    if (((DAT_0064c6c0[(s32((in_ECX + 0x118), 0) * 4 + DAT_006d1da0 * 0x594)] & 8) === 0)) {
      if (((DAT_0064c6c0[(s32((in_ECX + 0x118), 0) * 4 + DAT_006d1da0 * 0x594)] & 4) === 0)) {
        if (((DAT_0064c6c0[(s32((in_ECX + 0x118), 0) * 4 + DAT_006d1da0 * 0x594)] & 2) === 0)) {
          if (((DAT_0064c6c1[(s32((in_ECX + 0x118), 0) * 4 + DAT_006d1da0 * 0x594)] & 0x20) === 0)) {
            uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xbec), 0));
            FUN_0040bbe0(uVar3);
          }
          else {
            uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xbe8), 0));
            FUN_0040bbe0(uVar3);
          }
        }
        else {
          uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xbcc), 0));
          FUN_0040bbe0(uVar3);
        }
      }
      else {
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xbe4), 0));
        FUN_0040bbe0(uVar3);
      }
    }
    else {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xbe0), 0));
      FUN_0040bbe0(uVar3);
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_28c = DAT_0069b030;
    }
    else {
      local_28c = DAT_0069b028;
    }
    FUN_005c0f57(local_28c, DAT_00679640, local_38, local_3c, 0);
    w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 1);
    break;
  case 7 :
    local_134 = FUN_00428b0c(s32((DAT_00628420 + 0xbf4), 0));
    local_130 = FUN_00428b0c(s32((DAT_00628420 + 0xbf8), 0));
    local_12c = FUN_00428b0c(s32((DAT_00628420 + 0xbfc), 0));
    local_128 = FUN_00428b0c(s32((DAT_00628420 + 0xc00), 0));
    local_124 = FUN_00428b0c(s32((DAT_00628420 + 0xc04), 0));
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_3fc = FUN_0040ef70();
    }
    else {
      local_3fc = FUN_0040ef70();
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_400 = FUN_0040ef70();
    }
    else {
      local_400 = FUN_0040ef70();
    }
    local_14 = ((DAT_0062d85c * 5 + local_3fc * 5) + local_400);
    iVar1 = (s32((in_ECX + 0x144), 0) + (((s32((in_ECX + 0x1e0), 0) - s32((in_ECX + 0x144), 0)) - local_14) / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_290 = DAT_0069b030;
    }
    else {
      local_290 = DAT_0069b028;
    }
    uVar5 = 5;
    iVar4 = local_38;
    local_3c = iVar1;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xbf0), 0), local_38, iVar1, 5);
    FUN_005c0f57(local_290, uVar3, iVar4, iVar1, uVar5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_294 = DAT_0069b030;
    }
    else {
      local_294 = DAT_0069b028;
    }
    FUN_005d4167(local_294);
    pvVar2 = operator_new(0x50);
    local_8 = 0xb;
    if ((pvVar2 === 0)) {
      local_29c = 0;
    }
    else {
      local_29c = FUN_00531010();
    }
    local_8 = -1;
    w32(((in_ECX + 0x36c) + param_2 * 4), 0, local_29c);
    local_38 = local_2c;
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = ((iVar1 + DAT_0062d858 * -2) / 2 | 0);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_40c = FUN_0040ef70();
    }
    else {
      local_40c = FUN_0040ef70();
    }
    local_3c = (local_3c + (DAT_0062d85c + local_40c));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_410 = FUN_0040ef70();
    }
    else {
      local_410 = FUN_0040ef70();
    }
    local_14 = (local_410 * 5 + DAT_0062d85c * 4);
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    if ((in_ECX === 0)) {
      local_414 = 0;
    }
    else {
      local_414 = (in_ECX + 0x48);
    }
    FUN_005310a0(local_414, 0x3f7, DAT_ffffffdc, 1, 5, DAT_fffffecc);
    FUN_004472f0(s32((in_ECX + 0x220), 0));
    FUN_005311e0(LAB_00401d75);
    FUN_005311b0(LAB_004010ff);
    w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 1);
    break;
  case 8 :
    if ((local_28 === 0)) {
      w32(((in_ECX + 0x10420) + param_2 * 4), 0, 7);
    }
    else {
      w32(((in_ECX + 0x10420) + param_2 * 4), 0, 6);
    }
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    local_3c = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (((iVar1 + DAT_0062d858 * -2) / 2 | 0) + DAT_0062d858 * -5);
    if ((local_28 !== 0)) {
      FUN_004aef20(DAT_00679640);
      if ((param_2 === 0)) {
        local_418 = FUN_00428b0c(s32((DAT_00628420 + 0xc0c), 0));
      }
      else {
        local_418 = FUN_00428b0c(s32((DAT_00628420 + 0xc10), 0));
      }
      FUN_00414d70(local_418);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_2a0 = DAT_0069b030;
      }
      else {
        local_2a0 = DAT_0069b028;
      }
      FUN_005c0f57(local_2a0, DAT_00679640, local_38, local_3c, 5);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_420 = FUN_0040ef70();
      }
      else {
        local_420 = FUN_0040ef70();
      }
      local_3c = (local_3c + (DAT_0062d85c + local_420));
    }
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), s32((in_ECX + 0x1e0), 0));
    FUN_005a9780(DAT_0067a7a8);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_00408700(DAT_ffffffdc, 0xa);
    iVar1 = FUN_00407f90(DAT_ffffffdc);
    local_38 = (UNNAMED + (iVar1 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_424 = FUN_0040ef70();
    }
    else {
      local_424 = FUN_0040ef70();
    }
    iVar1 = (local_3c + (local_424 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_2a4 = DAT_0069b030;
    }
    else {
      local_2a4 = DAT_0069b028;
    }
    uVar5 = 0;
    iVar4 = local_38;
    local_3c = iVar1;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc08), 0), local_38, iVar1, 0);
    FUN_005c0f57(local_2a4, uVar3, iVar4, iVar1, uVar5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      iVar1 = FUN_0040ef70();
      local_24 = (UNNAMED + iVar1);
    }
    else {
      iVar1 = FUN_0040ef70();
      local_24 = (UNNAMED + iVar1);
    }
    local_24 = (s32((in_ECX + 0x1e0), 0) + DAT_0062d85c * -2);
    local_24 = (UNNAMED + DAT_0062d858 * 2);
    local_24 = (UNNAMED + DAT_0062d858 * -2);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_005c0333(DAT_ffffffdc, DAT_00635a18);
    local_138 = 0;
    if ((param_2 === 1)) {
      local_138 = 1;
    }
    FUN_00450480(DAT_ffffffdc, param_2, local_138);
    break;
  case 9 :
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (((iVar1 + DAT_0062d858 * -2) / 2 | 0) + DAT_0062d858 * -5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_42c = FUN_0040ef70();
    }
    else {
      local_42c = FUN_0040ef70();
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_430 = FUN_0040ef70();
    }
    else {
      local_430 = FUN_0040ef70();
    }
    local_14 = ((DAT_0062d85c * 2 + local_42c * 4) + local_430);
    local_3c = (s32((in_ECX + 0x144), 0) + (((s32((in_ECX + 0x1e0), 0) - s32((in_ECX + 0x144), 0)) - local_14) / 2 | 0));
    if ((local_28 !== 0)) {
      FUN_004aef20(DAT_00679640);
      if ((param_2 === 0)) {
        local_434 = FUN_00428b0c(s32((DAT_00628420 + 0xc0c), 0));
      }
      else {
        local_434 = FUN_00428b0c(s32((DAT_00628420 + 0xc10), 0));
      }
      FUN_00414d70(local_434);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_2a8 = DAT_0069b030;
      }
      else {
        local_2a8 = DAT_0069b028;
      }
      FUN_005c0f57(local_2a8, DAT_00679640, local_38, (s32((in_ECX + 0x144), 0) + DAT_0062d85c), 5);
    }
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    FUN_005a9780(DAT_0067a7a8);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_00408700(DAT_ffffffdc, 0xa);
    iVar1 = FUN_00407f90(DAT_ffffffdc);
    local_38 = (UNNAMED + (iVar1 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_43c = FUN_0040ef70();
    }
    else {
      local_43c = FUN_0040ef70();
    }
    local_3c = (local_3c + (DAT_0062d85c + (local_43c / 2 | 0)));
    FUN_004aef20(DAT_00679640);
    if ((local_30 === 0)) {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc18), 0));
      FUN_00414d70(uVar3);
      FUN_0040fe10();
      FUN_0040ff30(s32((DAT_0064c6a2 + DAT_006d1da0 * 0x594), 0));
      FUN_0040fe10();
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc1c), 0));
      FUN_00414d70(uVar3);
    }
    else {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc14), 0));
      FUN_00414d70(uVar3);
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_2ac = DAT_0069b030;
    }
    else {
      local_2ac = DAT_0069b028;
    }
    FUN_005c0f57(local_2ac, DAT_00679640, local_38, local_3c, 0);
    local_24 = (UNNAMED + DAT_0062d85c * -2);
    local_24 = (UNNAMED + DAT_0062d858 * 2);
    local_24 = (UNNAMED + DAT_0062d858 * -2);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_444 = FUN_0040ef70();
    }
    else {
      local_444 = FUN_0040ef70();
    }
    local_24 = (UNNAMED + (DAT_0062d85c + local_444));
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_005c0333(DAT_ffffffdc, DAT_00635a18);
    FUN_004aef20(DAT_00679640);
    FUN_00414d70(s_000000_006324e0);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_448 = FUN_0040efd0(DAT_00679640);
    }
    else {
      local_448 = FUN_0040efd0(DAT_00679640);
    }
    local_34 = (local_448 * 3 / 2 | 0);
    FUN_004aef20(DAT_00679640);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc20), 0));
    FUN_00414d70(uVar3);
    FUN_0040fe10();
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_44c = FUN_0040efd0(DAT_00679640);
    }
    else {
      local_44c = FUN_0040efd0(DAT_00679640);
    }
    iVar1 = FUN_00407f90(DAT_ffffffdc);
    local_38 = ((UNNAMED + (iVar1 / 2 | 0)) - ((local_34 + local_44c) / 2 | 0));
    iVar1 = FUN_00407fc0(DAT_ffffffdc);
    local_3c = (UNNAMED + (iVar1 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_2b0 = DAT_0069b030;
    }
    else {
      local_2b0 = DAT_0069b028;
    }
    FUN_005c0f57(local_2b0, DAT_00679640, local_38, local_3c, 1);
    pvVar2 = operator_new(0x48);
    local_8 = 0xc;
    if ((pvVar2 === 0)) {
      local_2b8 = 0;
    }
    else {
      local_2b8 = FUN_004187a0();
    }
    local_8 = -1;
    w32(((in_ECX + 0x374) + param_2 * 4), 0, local_2b8);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_2bc = DAT_0069b030;
    }
    else {
      local_2bc = DAT_0069b028;
    }
    FUN_005d268e(local_2bc);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      iVar1 = FUN_0040efd0(DAT_00679640);
      local_38 = (local_38 + iVar1);
    }
    else {
      iVar1 = FUN_0040efd0(DAT_00679640);
      local_38 = (local_38 + iVar1);
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_14 = FUN_0040ef70();
    }
    else {
      local_14 = FUN_0040ef70();
    }
    local_3c = (local_3c - (local_14 / 2 | 0));
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    __itoa(s32(((in_ECX + 0x22c) + param_2 * 4), 0), DAT_fffffea8, 0xa);
    if ((in_ECX === 0)) {
      local_458 = 0;
    }
    else {
      local_458 = (in_ECX + 0x48);
    }
    FUN_00418910(local_458, (param_2 + 0x3f8), DAT_ffffffdc, DAT_fffffea8);
    FUN_004189c0(6);
    FUN_00530eb0(LAB_004020e5);
    FUN_004bb5e0();
    break;
  case 10 :
    if ((local_28 === 0)) {
      w32(((in_ECX + 0x10420) + param_2 * 4), 0, 6);
    }
    else {
      w32(((in_ECX + 0x10420) + param_2 * 4), 0, 5);
    }
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    local_3c = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (((iVar1 + DAT_0062d858 * -2) / 2 | 0) + DAT_0062d858 * -5);
    if ((local_28 !== 0)) {
      FUN_004aef20(DAT_00679640);
      if ((param_2 === 0)) {
        local_45c = FUN_00428b0c(s32((DAT_00628420 + 0xc0c), 0));
      }
      else {
        local_45c = FUN_00428b0c(s32((DAT_00628420 + 0xc10), 0));
      }
      FUN_00414d70(local_45c);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_2c0 = DAT_0069b030;
      }
      else {
        local_2c0 = DAT_0069b028;
      }
      FUN_005c0f57(local_2c0, DAT_00679640, local_38, local_3c, 5);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_464 = FUN_0040ef70();
      }
      else {
        local_464 = FUN_0040ef70();
      }
      local_3c = (local_3c + (DAT_0062d85c + local_464));
    }
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), s32((in_ECX + 0x1e0), 0));
    FUN_005a9780(DAT_0067a7a8);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_00408700(DAT_ffffffdc, 0xa);
    iVar1 = FUN_00407f90(DAT_ffffffdc);
    local_38 = (UNNAMED + (iVar1 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_468 = FUN_0040ef70();
    }
    else {
      local_468 = FUN_0040ef70();
    }
    iVar1 = (local_3c + (local_468 / 2 | 0));
    local_3c = iVar1;
    if ((local_28 === 0)) {
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_2c4 = DAT_0069b030;
      }
      else {
        local_2c4 = DAT_0069b028;
      }
      uVar5 = 0;
      iVar4 = local_38;
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc24), 0), local_38, iVar1, 0);
      FUN_005c0f57(local_2c4, uVar3, iVar4, iVar1, uVar5);
    }
    if ((local_30 === 0)) {
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_488 = FUN_0040ef70();
      }
      else {
        local_488 = FUN_0040ef70();
      }
      local_164 = (UNNAMED + local_488);
      local_168 = (local_34 / 2 | 0);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        DAT_0068abd8 = DAT_0068abd8;
        local_48c = extraout_EAX_01;
      }
      else {
        DAT_0068abe0 = DAT_0068abe0;
        local_48c = extraout_EAX_02;
      }
      local_160 = (DAT_0062d868 * 2 + local_48c);
      FUN_006e7d90(DAT_fffffe84, (DAT_0062d858 * 2 + UNNAMED), local_164, (UNNAMED + local_168), (local_164 + local_160));
    }
    else {
      local_164 = ((DAT_0062d85c * 2 + UNNAMED) + -1);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_470 = FUN_0040ef70();
      }
      else {
        local_470 = FUN_0040ef70();
      }
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        DAT_0068abd8 = DAT_0068abd8;
        local_474 = extraout_EAX;
      }
      else {
        DAT_0068abe0 = DAT_0068abe0;
        local_474 = extraout_EAX_00;
      }
      local_16c = (((UNNAMED + DAT_0062d868 * 2) + local_470) + local_474);
      local_168 = (local_34 + DAT_0062d858 * -3);
      local_160 = ((local_16c - local_164) / 2 | 0);
      FUN_006e7d90(DAT_fffffe84, (DAT_0062d858 * 2 + UNNAMED), local_164, (UNNAMED + local_168), (local_164 + local_160));
      pvVar2 = operator_new(0x3c);
      local_8 = 0xd;
      if ((pvVar2 === 0)) {
        local_2cc = 0;
      }
      else {
        local_2cc = FUN_0040f3e0();
      }
      local_8 = -1;
      w32(((in_ECX + 0x39c) + param_2 * 4), 0, local_2cc);
      if ((param_2 === 0)) {
        local_478 = FUN_00428b0c(s32((DAT_00628420 + 0xdbc), 0));
      }
      else {
        local_478 = FUN_00428b0c(s32((DAT_00628420 + 0xdc0), 0));
      }
      if ((in_ECX === 0)) {
        local_47c = 0;
      }
      else {
        local_47c = (in_ECX + 0x48);
      }
      FUN_0040f680(local_47c, (param_2 + 0x404), DAT_fffffe84, local_478);
      FUN_0040f880((LAB_00402496 + ((u8((param_2 === 0)) - 1) & -0x106d)));
      pvVar2 = operator_new(0x3c);
      local_8 = 0xe;
      if ((pvVar2 === 0)) {
        local_2d4 = 0;
      }
      else {
        local_2d4 = FUN_0040f3e0();
      }
      local_8 = -1;
      w32(((in_ECX + 0x3a4) + param_2 * 4), 0, local_2d4);
      if ((param_2 === 0)) {
        local_480 = FUN_00428b0c(s32((DAT_00628420 + 0xdc4), 0));
      }
      else {
        local_480 = FUN_00428b0c(s32((DAT_00628420 + 0xdc0), 0));
      }
      if ((in_ECX === 0)) {
        local_484 = 0;
      }
      else {
        local_484 = (in_ECX + 0x48);
      }
      FUN_0040f680(local_484, (param_2 + 0x406), DAT_fffffe84, local_480);
      FUN_0040f880((LAB_004034d1 + ((u8((param_2 === 0)) - 1) & -0x20a8)));
      if ((_MEM[(in_ECX + 0x3bd)] !== 0)) {
        FUN_0043c5f0();
        FUN_0040f380();
      }
      else if ((param_2 === 0)) {
        FUN_0040f380();
        FUN_0043c5f0();
      }
      if ((_MEM[(in_ECX + 0x3bc)] !== 0)) {
        FUN_0043c5f0();
        FUN_0040f380();
        FUN_00453c40();
      }
      else if ((param_2 === 1)) {
        FUN_0040f380();
        FUN_0043c5f0();
      }
      local_164 = (local_164 + local_160);
      local_168 = (local_34 / 2 | 0);
      FUN_006e7d90(DAT_fffffe84, (DAT_0062d858 * 2 + UNNAMED), local_164, (UNNAMED + local_168), (local_164 + local_160));
    }
    pvVar2 = operator_new(0x3c);
    local_8 = 0xf;
    if ((pvVar2 === 0)) {
      local_2dc = 0;
    }
    else {
      local_2dc = FUN_0040f3e0();
    }
    local_8 = -1;
    w32(((in_ECX + 0x38c) + param_2 * 4), 0, local_2dc);
    if ((in_ECX === 0)) {
      local_490 = 0;
    }
    else {
      local_490 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc28), 0));
    FUN_0040f680(local_490, (param_2 + 0x400), DAT_fffffe84, uVar3);
    FUN_0040f880((LAB_00401f55 + ((u8((param_2 === 0)) - 1) & -0x9c9)));
    if ((_MEM[(in_ECX + 0x3bc)] === 0)) {
      FUN_00453c40();
    }
    FUN_006e7d90(DAT_fffffe84, UNNAMED, local_164, ((UNNAMED + local_168) + DAT_0062d858 * -3), (local_164 + local_160));
    pvVar2 = operator_new(0x3c);
    local_8 = 0x10;
    if ((pvVar2 === 0)) {
      local_2e4 = 0;
    }
    else {
      local_2e4 = FUN_0040f3e0();
    }
    local_8 = -1;
    w32(((in_ECX + 0x394) + param_2 * 4), 0, local_2e4);
    if ((in_ECX === 0)) {
      local_494 = 0;
    }
    else {
      local_494 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc2c), 0));
    FUN_0040f680(local_494, (param_2 + 0x402), DAT_fffffe84, uVar3);
    FUN_0040f880((LAB_004033d7 + ((u8((param_2 === 0)) - 1) & -0xa5f)));
    if ((_MEM[(in_ECX + 0x3bc)] === 0)) {
      FUN_00453c40();
    }
    local_24 = UNNAMED;
    local_24 = (s32((in_ECX + 0x1e0), 0) + DAT_0062d85c * -2);
    local_24 = (UNNAMED + DAT_0062d858 * 2);
    local_24 = (UNNAMED + DAT_0062d858 * -2);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_005c0333(DAT_ffffffdc, DAT_00635a18);
    local_15c = 1;
    if ((param_2 === 1)) {
      local_15c = 0;
    }
    FUN_004683f0(DAT_ffffffdc, param_2, local_15c);
    break;
  case 0xb :
    FUN_005c19ad(0xa);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_498 = FUN_0040ef70();
    }
    else {
      local_498 = FUN_0040ef70();
    }
    local_14 = (local_498 * 3 + DAT_0062d85c * 2);
    iVar1 = (s32((in_ECX + 0x144), 0) + (((s32((in_ECX + 0x1e0), 0) - s32((in_ECX + 0x144), 0)) - local_14) / 2 | 0));
    local_38 = local_2c;
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_2e8 = DAT_0069b030;
    }
    else {
      local_2e8 = DAT_0069b028;
    }
    uVar5 = 5;
    iVar4 = local_2c;
    local_3c = iVar1;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc30), 0), local_2c, iVar1, 5);
    FUN_005c0f57(local_2e8, uVar3, iVar4, iVar1, uVar5);
    local_184 = FUN_00428b0c(s32((DAT_00628420 + 0xc34), 0));
    local_180 = FUN_00428b0c(s32((DAT_00628420 + 0xc38), 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_2ec = DAT_0069b030;
    }
    else {
      local_2ec = DAT_0069b028;
    }
    FUN_005d4167(local_2ec);
    pvVar2 = operator_new(0x50);
    local_8 = 0x11;
    if ((pvVar2 === 0)) {
      local_2f4 = 0;
    }
    else {
      local_2f4 = FUN_00531010();
    }
    local_8 = -1;
    w32(((in_ECX + 0x36c) + param_2 * 4), 0, local_2f4);
    local_38 = local_2c;
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = ((iVar1 + DAT_0062d858 * -2) / 2 | 0);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4a4 = FUN_0040ef70();
    }
    else {
      local_4a4 = FUN_0040ef70();
    }
    local_3c = (local_3c + (DAT_0062d85c + local_4a4));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4a8 = FUN_0040ef70();
    }
    else {
      local_4a8 = FUN_0040ef70();
    }
    local_14 = (local_4a8 * 2 + DAT_0062d85c);
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    if ((in_ECX === 0)) {
      local_4ac = 0;
    }
    else {
      local_4ac = (in_ECX + 0x48);
    }
    FUN_005310a0(local_4ac, 0x40c, DAT_ffffffdc, 1, 2, DAT_fffffe7c);
    FUN_004472f0(s32((in_ECX + 0x21c), 0));
    FUN_005311e0(LAB_00401d75);
    FUN_005311b0(LAB_00401c99);
    w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 1);
    break;
  case 0xc :
    local_1ac = FUN_00428b0c(s32((DAT_00628420 + 0xc50), 0));
    local_1ac = FUN_00428b0c(s32((DAT_00628420 + 0xc54), 0));
    local_1ac = FUN_00428b0c(s32((DAT_00628420 + 0xc58), 0));
    local_1ac = FUN_00428b0c(s32((DAT_00628420 + 0xd0c), 0));
    if ((local_28 === 0)) {
      if ((local_30 === 0)) {
        local_1b0 = 0;
      }
      else {
        local_1b0 = 3;
      }
    }
    else if ((param_2 === 0)) {
      local_1b0 = 1;
    }
    else {
      local_1b0 = 2;
    }
    w32(((in_ECX + 0x10420) + param_2 * 4), 0, 5);
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    local_3c = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    if ((local_28 !== 0)) {
      FUN_004aef20(DAT_00679640);
      if ((param_2 === 0)) {
        local_4d8 = FUN_00428b0c(s32((DAT_00628420 + 0xc0c), 0));
      }
      else {
        local_4d8 = FUN_00428b0c(s32((DAT_00628420 + 0xc10), 0));
      }
      FUN_00414d70(local_4d8);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_30c = DAT_0069b030;
      }
      else {
        local_30c = DAT_0069b028;
      }
      FUN_005c0f57(local_30c, DAT_00679640, local_38, local_3c, 5);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_4e0 = FUN_0040ef70();
      }
      else {
        local_4e0 = FUN_0040ef70();
      }
      local_3c = (local_3c + (DAT_0062d85c + local_4e0));
    }
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (((iVar1 + DAT_0062d858 * -2) / 2 | 0) + DAT_0062d858 * -5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4e4 = FUN_0040ef70();
    }
    else {
      local_4e4 = FUN_0040ef70();
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4e8 = FUN_0040ef70();
    }
    else {
      local_4e8 = FUN_0040ef70();
    }
    local_14 = (((s32(((in_ECX + 0x10420) + param_2 * 4), 0) * local_4e4 + s32(((in_ECX + 0x10420) + param_2 * 4), 0) * DAT_0062d85c) + DAT_0062d85c * 4) + local_4e8);
    local_3c = (local_3c + (((s32((in_ECX + 0x1e0), 0) - local_3c) - local_14) / 2 | 0));
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    FUN_005a9780(DAT_0067a7a8);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_00408700(DAT_ffffffdc, 0xa);
    iVar1 = FUN_00407f90(DAT_ffffffdc);
    local_38 = (UNNAMED + (iVar1 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4ec = FUN_0040ef70();
    }
    else {
      local_4ec = FUN_0040ef70();
    }
    local_3c = (local_3c + (DAT_0062d85c + (local_4ec / 2 | 0)));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_310 = DAT_0069b030;
    }
    else {
      local_310 = DAT_0069b028;
    }
    FUN_005c0f57(local_310, s32(DAT_fffffe54, local_1b0), local_38, local_3c, 0);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4f4 = FUN_0040ef70();
    }
    else {
      local_4f4 = FUN_0040ef70();
    }
    local_24 = (UNNAMED + (DAT_0062d85c + local_4f4));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4f8 = FUN_0040ef70();
    }
    else {
      local_4f8 = FUN_0040ef70();
    }
    local_24 = (((s32(((in_ECX + 0x10420) + param_2 * 4), 0) * local_4f8 + s32(((in_ECX + 0x10420) + param_2 * 4), 0) * DAT_0062d85c) + UNNAMED) + 2);
    local_24 = (UNNAMED + DAT_0062d858 * 2);
    local_24 = (UNNAMED + DAT_0062d858 * -2);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_005c0333(DAT_ffffffdc, DAT_00635a18);
    FUN_004af3e0(DAT_ffffffdc, param_2);
    break;
  case 0xd :
    local_198 = FUN_00428b0c(s32((DAT_00628420 + 0xc3c), 0));
    local_198 = FUN_00428b0c(s32((DAT_00628420 + 0xc40), 0));
    local_19c = 0;
    local_198 = FUN_00428b0c(s32((DAT_00628420 + 0xc44), 0));
    local_198 = FUN_00428b0c(s32((DAT_00628420 + 0xc48), 0));
    local_188 = FUN_00428b0c(s32((DAT_00628420 + 0xc4c), 0));
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    local_3c = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    if ((local_28 !== 0)) {
      local_19c = u8((param_2 !== 0));
      FUN_004aef20(DAT_00679640);
      if ((param_2 === 0)) {
        local_4b0 = FUN_00428b0c(s32((DAT_00628420 + 0xc0c), 0));
      }
      else {
        local_4b0 = FUN_00428b0c(s32((DAT_00628420 + 0xc10), 0));
      }
      FUN_00414d70(local_4b0);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_2f8 = DAT_0069b030;
      }
      else {
        local_2f8 = DAT_0069b028;
      }
      FUN_005c0f57(local_2f8, DAT_00679640, local_38, local_3c, 5);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_4b8 = FUN_0040ef70();
      }
      else {
        local_4b8 = FUN_0040ef70();
      }
      local_3c = (local_3c + (DAT_0062d85c + local_4b8));
    }
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (((iVar1 + DAT_0062d858 * -2) / 2 | 0) + DAT_0062d858 * -5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4bc = FUN_0040ef70();
    }
    else {
      local_4bc = FUN_0040ef70();
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4c0 = FUN_0040ef70();
    }
    else {
      local_4c0 = FUN_0040ef70();
    }
    local_14 = ((local_4bc * 3 + DAT_0062d85c * 9) + local_4c0);
    local_3c = (local_3c + (((s32((in_ECX + 0x1e0), 0) - local_3c) - local_14) / 2 | 0));
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    FUN_005a9780(DAT_0067a7a8);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_00408700(DAT_ffffffdc, 0xa);
    iVar1 = FUN_00407f90(DAT_ffffffdc);
    local_38 = (UNNAMED + (iVar1 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4c4 = FUN_0040ef70();
    }
    else {
      local_4c4 = FUN_0040ef70();
    }
    local_3c = (local_3c + (DAT_0062d85c + (local_4c4 / 2 | 0)));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_2fc = DAT_0069b030;
    }
    else {
      local_2fc = DAT_0069b028;
    }
    FUN_005c0f57(local_2fc, s32(DAT_fffffe68, local_19c), local_38, local_3c, 0);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4cc = FUN_0040ef70();
    }
    else {
      local_4cc = FUN_0040ef70();
    }
    local_24 = (UNNAMED + (DAT_0062d85c + local_4cc));
    local_24 = (UNNAMED + DAT_0062d85c * -2);
    local_24 = (UNNAMED + DAT_0062d858 * 2);
    local_24 = (UNNAMED + DAT_0062d858 * -2);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_005c0333(DAT_ffffffdc, DAT_00635a18);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_300 = DAT_0069b030;
    }
    else {
      local_300 = DAT_0069b028;
    }
    FUN_005d4167(local_300);
    pvVar2 = operator_new(0x50);
    local_8 = 0x12;
    if ((pvVar2 === 0)) {
      local_308 = 0;
    }
    else {
      local_308 = FUN_00531010();
    }
    local_8 = -1;
    w32(((in_ECX + 0x36c) + param_2 * 4), 0, local_308);
    if ((in_ECX === 0)) {
      local_4d4 = 0;
    }
    else {
      local_4d4 = (in_ECX + 0x48);
    }
    FUN_005310a0(local_4d4, (param_2 + 0x424), DAT_ffffffdc, 1, 3, (DAT_fffffe68 + 2));
    FUN_004472f0(s32(((in_ECX + 0x224) + param_2 * 4), 0));
    FUN_005311e0(LAB_00401d75);
    FUN_005311b0(LAB_00401bd6);
    w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 1);
    break;
  case 0xf :
    local_1cc = FUN_00428b0c(s32((DAT_00628420 + 0xbac), 0));
    local_1c8 = FUN_00428b0c(s32((DAT_00628420 + 0xbb0), 0));
    local_1c4 = FUN_00428b0c(s32((DAT_00628420 + 0xbb4), 0));
    local_1c0 = FUN_00428b0c(s32((DAT_00628420 + 0xbb8), 0));
    local_1bc = FUN_00428b0c(s32((DAT_00628420 + 0xbbc), 0));
    local_1b8 = FUN_00428b0c(s32((DAT_00628420 + 0xbc4), 0));
    local_1b4 = FUN_00428b0c(s32((DAT_00628420 + 0xd08), 0));
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_4fc = FUN_0040ef70();
    }
    else {
      local_4fc = FUN_0040ef70();
    }
    local_14 = (DAT_0062d85c * 7 + local_4fc * 8);
    iVar1 = (s32((in_ECX + 0x144), 0) + (((s32((in_ECX + 0x1e0), 0) - s32((in_ECX + 0x144), 0)) - local_14) / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_314 = DAT_0069b030;
    }
    else {
      local_314 = DAT_0069b028;
    }
    uVar5 = 5;
    iVar4 = local_38;
    local_3c = iVar1;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc5c), 0), local_38, iVar1, 5);
    FUN_005c0f57(local_314, uVar3, iVar4, iVar1, uVar5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_504 = FUN_0040ef70();
    }
    else {
      local_504 = FUN_0040ef70();
    }
    iVar1 = (local_3c + (DAT_0062d85c * 2 + local_504));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_318 = DAT_0069b030;
    }
    else {
      local_318 = DAT_0069b028;
    }
    uVar5 = 5;
    iVar4 = local_38;
    local_3c = iVar1;
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xc60), 0), local_38, iVar1, 5);
    FUN_005c0f57(local_318, uVar3, iVar4, iVar1, uVar5);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_50c = FUN_0040ef70();
    }
    else {
      local_50c = FUN_0040ef70();
    }
    local_3c = (local_3c + (DAT_0062d85c + local_50c));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_31c = DAT_0069b030;
    }
    else {
      local_31c = DAT_0069b028;
    }
    FUN_005d4167(local_31c);
    pvVar2 = operator_new(0x50);
    local_8 = 0x13;
    if ((pvVar2 === 0)) {
      local_324 = 0;
    }
    else {
      local_324 = FUN_00531010();
    }
    local_8 = -1;
    w32(((in_ECX + 0x36c) + param_2 * 4), 0, local_324);
    local_38 = local_2c;
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = ((iVar1 + DAT_0062d858 * -2) / 2 | 0);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_514 = FUN_0040ef70();
    }
    else {
      local_514 = FUN_0040ef70();
    }
    local_14 = (DAT_0062d85c * 5 + local_514 * 6);
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    if ((in_ECX === 0)) {
      local_518 = 0;
    }
    else {
      local_518 = (in_ECX + 0x48);
    }
    FUN_005310a0(local_518, 0x41f, DAT_ffffffdc, 1, 7, DAT_fffffe34);
    FUN_004472f0(s32((in_ECX + 0x214), 0));
    FUN_005311e0(LAB_00401d75);
    FUN_005311b0(LAB_00403a30);
    w32(((in_ECX + 0x1e4) + param_2 * 4), 0, 1);
    break;
  case 0x11 :
    if ((local_28 === 0)) {
      w32(((in_ECX + 0x10420) + param_2 * 4), 0, 7);
    }
    else {
      w32(((in_ECX + 0x10420) + param_2 * 4), 0, 6);
    }
    FUN_005c19ad(0xa);
    local_38 = local_2c;
    local_3c = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (((iVar1 + DAT_0062d858 * -2) / 2 | 0) + DAT_0062d858 * -5);
    if ((local_28 !== 0)) {
      FUN_004aef20(DAT_00679640);
      if ((param_2 === 0)) {
        local_51c = FUN_00428b0c(s32((DAT_00628420 + 0xc0c), 0));
      }
      else {
        local_51c = FUN_00428b0c(s32((DAT_00628420 + 0xc10), 0));
      }
      FUN_00414d70(local_51c);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_328 = DAT_0069b030;
      }
      else {
        local_328 = DAT_0069b028;
      }
      FUN_005c0f57(local_328, DAT_00679640, local_38, local_3c, 5);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_524 = FUN_0040ef70();
      }
      else {
        local_524 = FUN_0040ef70();
      }
      local_3c = (local_3c + (DAT_0062d85c + local_524));
    }
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), s32((in_ECX + 0x1e0), 0));
    FUN_005a9780(DAT_0067a7a8);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_00408700(DAT_ffffffdc, 0xa);
    iVar1 = FUN_00407f90(DAT_ffffffdc);
    local_38 = (UNNAMED + (iVar1 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_528 = FUN_0040ef70();
    }
    else {
      local_528 = FUN_0040ef70();
    }
    local_3c = (local_3c + (local_528 / 2 | 0));
    if ((local_30 === 0)) {
      local_1d8 = FUN_00428b0c(s32((DAT_00628420 + 0xc68), 0));
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_33c = DAT_0069b030;
      }
      else {
        local_33c = DAT_0069b028;
      }
      FUN_005c0f57(local_33c, local_1d8, local_38, local_3c, 0);
    }
    else {
      local_1dc = ((DAT_0062d85c * 2 + UNNAMED) + -1);
      local_1e0 = (local_34 + DAT_0062d858 * -3);
      if ((s32((in_ECX + 0x154), 0) === 0)) {
        local_52c = FUN_0040ef70();
      }
      else {
        local_52c = FUN_0040ef70();
      }
      local_1d4 = (local_52c - (DAT_0062d85c * 2 + -1));
      FUN_006e7d90(DAT_fffffe10, (DAT_0062d858 * 2 + UNNAMED), local_1dc, (UNNAMED + local_1e0), (local_1d4 + local_1dc));
      pvVar2 = operator_new(0x3c);
      local_8 = 0x14;
      if ((pvVar2 === 0)) {
        local_330 = 0;
      }
      else {
        local_330 = FUN_0040f3e0();
      }
      local_8 = -1;
      w32(((in_ECX + 0x39c) + param_2 * 4), 0, local_330);
      if ((param_2 === 0)) {
        local_530 = FUN_00428b0c(s32((DAT_00628420 + 0xdc8), 0));
      }
      else {
        local_530 = FUN_00428b0c(s32((DAT_00628420 + 0xdcc), 0));
      }
      if ((in_ECX === 0)) {
        local_534 = 0;
      }
      else {
        local_534 = (in_ECX + 0x48);
      }
      FUN_0040f680(local_534, (param_2 + 0x408), DAT_fffffe10, local_530);
      FUN_0040f880((LAB_004038d7 + ((u8((param_2 === 0)) - 1) & -0x2292)));
      pvVar2 = operator_new(0x3c);
      local_8 = 0x15;
      if ((pvVar2 === 0)) {
        local_338 = 0;
      }
      else {
        local_338 = FUN_0040f3e0();
      }
      local_8 = -1;
      w32(((in_ECX + 0x3a4) + param_2 * 4), 0, local_338);
      if ((param_2 === 0)) {
        local_538 = FUN_00428b0c(s32((DAT_00628420 + 0xdd0), 0));
      }
      else {
        local_538 = FUN_00428b0c(s32((DAT_00628420 + 0xdcc), 0));
      }
      if ((in_ECX === 0)) {
        local_53c = 0;
      }
      else {
        local_53c = (in_ECX + 0x48);
      }
      FUN_0040f680(local_53c, (param_2 + 0x40a), DAT_fffffe10, local_538);
      FUN_0040f880((LAB_00401979 + ((u8((param_2 === 0)) - 1) & -0x334)));
      if ((_MEM[(in_ECX + 0x3be)] !== 0)) {
        FUN_0043c5f0();
        FUN_0040f380();
      }
      else if ((param_2 === 0)) {
        FUN_0040f380();
        FUN_0043c5f0();
      }
      if ((_MEM[(in_ECX + 0x3bf)] !== 0)) {
        FUN_0043c5f0();
        FUN_0040f380();
        FUN_00453c40();
      }
      else if ((param_2 === 1)) {
        FUN_0040f380();
        FUN_0043c5f0();
      }
    }
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      iVar1 = FUN_0040ef70();
      local_24 = (UNNAMED + iVar1);
    }
    else {
      iVar1 = FUN_0040ef70();
      local_24 = (UNNAMED + iVar1);
    }
    local_24 = (s32((in_ECX + 0x1e0), 0) + DAT_0062d85c * -2);
    local_24 = (UNNAMED + DAT_0062d858 * 2);
    local_24 = (UNNAMED + DAT_0062d858 * -2);
    FUN_00408700(DAT_ffffffdc, 0xa);
    FUN_004bb800(DAT_ffffffdc, 1, 1);
    FUN_005c0333(DAT_ffffffdc, DAT_00635a18);
    local_1d0 = 1;
    if ((param_2 === 1)) {
      local_1d0 = 0;
    }
    FUN_00587a90(DAT_ffffffdc, param_2, local_1d0);
    break;
  case 0x12 :
    uVar3 = FUN_00410070(s32((in_ECX + 0x118), 0));
    FUN_00421d60(0, uVar3);
    FUN_0040bbb0();
    FUN_0040bc10(0x2e2);
    FUN_00426ff0(DAT_00679640, DAT_ffffff64);
    FUN_005c19ad(0xa);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_a0 = FUN_0040efd0(DAT_ffffff64);
    }
    else {
      local_a0 = FUN_0040efd0(DAT_ffffff64);
    }
    local_38 = ((s32((in_ECX + 0x140), 0) + ((s32((in_ECX + 0x148), 0) - s32((in_ECX + 0x140), 0)) / 2 | 0)) - (local_a0 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_354 = FUN_0040ef70();
    }
    else {
      local_354 = FUN_0040ef70();
    }
    local_3c = (((s32((in_ECX + 0x144), 0) + ((s32((in_ECX + 0x1e0), 0) - s32((in_ECX + 0x144), 0)) / 2 | 0)) + DAT_0062d85c) - (local_354 / 2 | 0));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_20c = DAT_0069b020;
    }
    else {
      local_20c = DAT_0069b018;
    }
    FUN_005c0f57(local_20c, DAT_ffffff64, local_38, local_3c, 5);
    FUN_0043c5f0();
    FUN_00453c40();
    FUN_0040f380();
    FUN_00453c40();
    FUN_00453c40();
    if ((_MEM[(in_ECX + 0x3be)] === 0)) {
      FUN_0043c5f0();
      FUN_00453c40();
      FUN_0040f380();
      FUN_00453c80();
    }
    else {
      FUN_0040f380();
      FUN_00453c80();
      FUN_0043c5f0();
      FUN_00453c40();
    }
    break;
  case 0x13 :
    FUN_004dbee6(s32((in_ECX + 0x234), 0), 0);
    pvVar2 = operator_new(0x48);
    local_8 = 0;
    if ((pvVar2 === 0)) {
      local_1f8 = 0;
    }
    else {
      local_1f8 = FUN_004187a0();
    }
    local_8 = -1;
    w32((in_ECX + 0x294), 0, local_1f8);
    local_38 = (s32((in_ECX + 0x140), 0) + DAT_0062d858);
    local_34 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (local_34 + DAT_0062d858 * -2);
    local_3c = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    local_14 = (s32((in_ECX + 0x1e0), 0) - local_3c);
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_1fc = DAT_0067a7a0;
    }
    else {
      local_1fc = DAT_0067a798;
    }
    FUN_005d268e(local_1fc);
    if ((in_ECX === 0)) {
      local_344 = 0;
    }
    else {
      local_344 = (in_ECX + 0x48);
    }
    FUN_004bb620(local_344, 0x426, DAT_ffffffdc, DAT_006a5b58, 0x122, 0);
    FUN_004189c0(0x2000);
    FUN_00418a00(LAB_00402040);
    FUN_0040f380();
    break;
  case 0x14 :
    FUN_004085f0();
    FUN_004dbee6(s32((in_ECX + 0x234), 0), 1);
    pvVar2 = operator_new(0x48);
    local_8 = 1;
    if ((pvVar2 === 0)) {
      local_204 = 0;
    }
    else {
      local_204 = FUN_004187a0();
    }
    local_8 = -1;
    w32((in_ECX + 0x294), 0, local_204);
    local_38 = (s32((in_ECX + 0x140), 0) + DAT_0062d858);
    local_34 = FUN_00407f90((in_ECX + 0x140));
    local_34 = (local_34 + DAT_0062d858 * -2);
    local_3c = (s32((in_ECX + 0x144), 0) + DAT_0062d85c);
    local_14 = (s32((in_ECX + 0x1e0), 0) - local_3c);
    FUN_006e7d90(DAT_ffffffdc, local_38, local_3c, (local_34 + local_38), (local_14 + local_3c));
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_208 = DAT_0067a7a0;
    }
    else {
      local_208 = DAT_0067a798;
    }
    FUN_005d268e(local_208);
    if ((in_ECX === 0)) {
      local_34c = 0;
    }
    else {
      local_34c = (in_ECX + 0x48);
    }
    FUN_004bb620(local_34c, 0x426, DAT_ffffffdc, DAT_006a5b58, 0x122, 0);
    FUN_004189c0(0x2000);
    FUN_00418a00(LAB_00402040);
    FUN_0040f380();
    _DAT_0067a9e0 = 1;
    if ((s32((in_ECX + 0x234), 0) !== 0)) {
      iVar1 = s32((in_ECX + 0x234), 0);
      local_4c = (iVar1 + 0x20);
      if ((s32(local_4c, 0) === 8)) {
        local_40 = s32((iVar1 + 0x28), 0);
        local_48 = (iVar1 + 0x2c);
        (local_44 < local_40) (local_44 = 0; local_44 = (local_44 < local_40); local_44 = (local_44 + 1)) {
          uVar3 = s32(local_48, 0);
          local_48 = (local_48 + 1);
          iVar1 = FUN_004bd9f0(DAT_006d1da0, uVar3);
          if ((iVar1 === 0)) {
            w32((in_ECX + 0x238), 0, 0);
          }
        }
      }
    }
    if ((s32((in_ECX + 0x238), 0) === 0)) {
      FUN_00453c40();
    }
    else {
      FUN_00453c80();
    }
  }
  FUN_0052e971();
  FUN_00408490((in_ECX + 0x3ac));
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_0052d4d2 (param_1, param_2)

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
  w32((local_8 + 0x218), 0, param_2);
  return;
}


 export function FUN_0052d523 (param_1, param_2)

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
  w32((local_8 + 0x214), 0, param_2);
  FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
  return;
}


 export function FUN_0052d588 (param_1, param_2)

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
  w32(((local_8 + -0xe6c) + param_1 * 4), 0, param_2);
  return;
}


 export function FUN_0052d5dd (param_1, param_2)

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
  w32((local_8 + 0x220), 0, param_2);
  /* switch */ () {
  case 0 :
    w32((local_8 + 0x1ec), 0, 7);
    break;
  case 1 :
    w32((local_8 + 0x1ec), 0, 8);
    break;
  case 2 :
    w32((local_8 + 0x1ec), 0, 9);
    break;
  case 3 :
    w32((local_8 + 0x1ec), 0, 0xa);
    break;
  case 4 :
    w32((local_8 + 0x1ec), 0, 0xb);
  }
  w32((local_8 + 0x1fc), 0, s32(DAT_0062d7d4, s32((local_8 + 0x1ec), 0) * 2));
  w32((local_8 + 0x1f4), 0, s32((local_8 + 0x1fc), 0));
  FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
  return;
}


 export function FUN_0052d6ff (param_1, param_2)

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
  w32((local_8 + 0x21c), 0, param_2);
  if ((param_2 === 0)) {
    w32((local_8 + 0x1ec), 0, 0xc);
  }
  else if ((param_2 === 1)) {
    w32((local_8 + 0x1ec), 0, 0xd);
  }
  w32((local_8 + 0x1fc), 0, s32(DAT_0062d7d4, s32((local_8 + 0x1ec), 0) * 2));
  w32((local_8 + 0x1f4), 0, s32((local_8 + 0x1fc), 0));
  FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
  return;
}


 export function FUN_0052d7dc (param_1, param_2)

 {
  let uVar1;
  let local_10;
  let local_8;

  local_10 = FUN_005c62ee();
  if ((local_10 === 0)) {
    local_10 = 0;
  }
  else {
    local_10 = (local_10 + -72);
  }
  FUN_004518d0();
  local_8 = u8((param_1 === 0x3f4));
  /* switch */ () {
  case 0 :
    uVar1 = GetCheckStyle(s32(((local_10 + 0x36c) + local_8 * 4), 0));
    FUN_00447210(0);
    FUN_00421ca0(6);
    FUN_00421ca0(6);
    if ((uVar1 === 0)) {
      FUN_004472f0(1);
    }
    break;
  case 1 :
  case 2 :
  case 3 :
  case 4 :
  case 5 :
    FUN_00421ca0(0);
    FUN_00421ca0(0);
    FUN_00421ca0(6);
    FUN_00421ca0(6);
    break;
  case 6 :
    uVar1 = GetCheckStyle(s32(((local_10 + 0x36c) + local_8 * 4), 0));
    FUN_00421ca0(0);
    FUN_00421ca0(0);
    FUN_00447210(6);
    if ((uVar1 === 6)) {
      FUN_004472f0(0);
    }
  }
  return;
}


 export function FUN_0052d9a1 (param_1)

 {
  let pcVar1;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  pcVar1 = egptr(s32((local_8 + 0x348), 0));
  if ((pcVar1 !== 0)) {
    FUN_004518d0();
    FUN_0052dd73(param_1);
  }
  return;
}


 export function FUN_0052da23 ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  _MEM[(local_8 + 0x3bd)] = 0;
  _MEM[(local_8 + 0x3be)] = 0;
  FUN_0046b14d(0xa6, s32((DAT_006ad30c + s32((DAT_006ad558 + s32((local_8 + 0x118), 0) * 4), 0) * 0x54), 0), DAT_006d1da0, s8(_MEM[(local_8 + 0x3be)]), 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0xa8, s32((DAT_006ad30c + s32((DAT_006ad558 + s32((local_8 + 0x118), 0) * 4), 0) * 0x54), 0), DAT_006d1da0, s8(_MEM[(local_8 + 0x3bd)]), 0, 0, 0, 0, 0, 0);
  FUN_0043c5f0();
  FUN_00453c40();
  FUN_0040f380();
  FUN_00453c80();
  return;
}


 export function FUN_0052db3d ()

 {
  let local_8;

  FUN_005c62ee();
  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  _MEM[(local_8 + 0x3bd)] = 1;
  _MEM[(local_8 + 0x3be)] = 1;
  FUN_0046b14d(0xa5, s32((DAT_006ad30c + s32((DAT_006ad558 + s32((local_8 + 0x118), 0) * 4), 0) * 0x54), 0), DAT_006d1da0, s8(_MEM[(local_8 + 0x3be)]), 0, 0, 0, 0, 0, 0);
  FUN_0046b14d(0xa7, s32((DAT_006ad30c + s32((DAT_006ad558 + s32((local_8 + 0x118), 0) * 4), 0) * 0x54), 0), DAT_006d1da0, s8(_MEM[(local_8 + 0x3bd)]), 0, 0, 0, 0, 0, 0);
  FUN_0040f380();
  FUN_00453c80();
  FUN_0043c5f0();
  FUN_00453c40();
  return;
}


 export function FUN_0052dc7e ()

 {
  let bVar1;
  let iVar2;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  iVar2 = FUN_00453e51(DAT_006d1da0, 0x18);
  if ((iVar2 === 0)) {
    iVar2 = FUN_00453e51(DAT_006d1da0, 9);
    if ((iVar2 === 0)) {
      bVar1 = 0;
      goto LAB_0052dcf1;
    }
  }
  bVar1 = 1;
 LAB_0052dcf1: :
  if ((DAT_00655b07 !== 0)) {
    FUN_0043060b(DAT_006d1da0, s32((local_8 + 0x118), 0));
  }
  else {
    FUN_00410030(s_NOINTEL_006324e8, DAT_0063fc58, 0);
  }
  return;
}


 export function FUN_0052dd73 ()

 {
  let uVar1;
  let uVar2;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  /* switch */ (s32((local_8 + 0x1ec), 0) ( *) ((local_8 + 0x1ec)  )) {
  case 3 :
    uVar1 = GetCheckStyle(s32((local_8 + 0x370), 0));
    w32((local_8 + 0x208), 0, uVar1);
    if ((s32((local_8 + 0x208), 0) === 0)) {
      w32((local_8 + 0x1ec), 0, 6);
      FUN_00453c80();
    }
    else if ((s32((local_8 + 0x208), 0) === 1)) {
      w32((local_8 + 0x1ec), 0, 0xc);
      if ((s32((local_8 + 0x21c), 0) !== 0)) {
        w32((local_8 + 0x1ec), 0, 0xd);
      }
      FUN_00453c80();
    }
    else if ((s32((local_8 + 0x208), 0) === 2)) {
      if ((s32((local_8 + 0x220), 0) === 0)) {
        w32((local_8 + 0x1ec), 0, 7);
      }
      else if ((s32((local_8 + 0x220), 0) === 1)) {
        w32((local_8 + 0x1ec), 0, 8);
      }
      else if ((s32((local_8 + 0x220), 0) === 2)) {
        w32((local_8 + 0x1ec), 0, 9);
      }
      else if ((s32((local_8 + 0x220), 0) === 3)) {
        w32((local_8 + 0x1ec), 0, 0xa);
      }
      else {
        w32((local_8 + 0x1ec), 0, 0xb);
      }
      FUN_00453c80();
    }
    else if ((s32((local_8 + 0x208), 0) === 3)) {
      w32((local_8 + 0x1ec), 0, 5);
      FUN_00453c80();
    }
    else if ((s32((local_8 + 0x208), 0) === 4)) {
      w32((local_8 + 0x1ec), 0, 0xf);
      FUN_00453c80();
    }
    w32((local_8 + 0x1f8), 0, s32(DAT_0062d7d0, s32((local_8 + 0x1ec), 0) * 2));
    w32((local_8 + 0x1f0), 0, s32((local_8 + 0x1f8), 0));
    w32((local_8 + 0x1fc), 0, s32(DAT_0062d7d4, s32((local_8 + 0x1ec), 0) * 2));
    w32((local_8 + 0x1f4), 0, s32((local_8 + 0x1fc), 0));
    FUN_00526ca0(s32((local_8 + 0x1f0), 0), 0);
    FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
    break;
  case 5 :
    uVar1 = GetCheckStyle(s32((local_8 + 0x36c), 0));
    w32((local_8 + 0x20c), 0, uVar1);
    uVar1 = GetCheckStyle(s32((local_8 + 0x370), 0));
    w32((local_8 + 0x210), 0, uVar1);
    w32((local_8 + 0x1ec), 0, 0xe);
    w32((local_8 + 0x1f8), 0, s32(DAT_0062d7d0, s32((local_8 + 0x1ec), 0) * 2));
    w32((local_8 + 0x1f0), 0, s32((local_8 + 0x1f8), 0));
    w32((local_8 + 0x1fc), 0, s32(DAT_0062d7d4, s32((local_8 + 0x1ec), 0) * 2));
    w32((local_8 + 0x1f4), 0, s32((local_8 + 0x1fc), 0));
    FUN_00526ca0(s32((local_8 + 0x1f0), 0), 0);
    FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
    break;
  case 6 :
  case 7 :
  case 8 :
  case 9 :
  case 10 :
  case 0xb :
  case 0xc :
  case 0xd :
  case 0xe :
  case 0xf :
    if ((s32((local_8 + 0x234), 0) !== 0)) {
      operator_delete(s32((local_8 + 0x234), 0));
      w32((local_8 + 0x234), 0, 0);
    }
    uVar2 = FUN_004db690(s32((local_8 + 0x1ec), 0));
    w32((local_8 + 0x234), 0, uVar2);
    if ((s32((local_8 + 0x218), 0) === 3)) {
      if (((DAT_0064c6c0[(s32((local_8 + 0x118), 0) * 4 + DAT_006d1da0 * 0x594)] & 8) === 0)) {
        if (((DAT_0064c6c0[(s32((local_8 + 0x118), 0) * 4 + DAT_006d1da0 * 0x594)] & 4) === 0)) {
          if (((DAT_0064c6c0[(s32((local_8 + 0x118), 0) * 4 + DAT_006d1da0 * 0x594)] & 2) !== 0)) {
            FUN_00467750(DAT_006d1da0, s32((local_8 + 0x118), 0), 2);
          }
        }
        else {
          FUN_00467750(DAT_006d1da0, s32((local_8 + 0x118), 0), 4);
        }
      }
      else {
        FUN_00467750(DAT_006d1da0, s32((local_8 + 0x118), 0), 8);
      }
      FUN_00526ca0(s32((local_8 + 0x1f0), 0), 0);
      FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
    }
    else if ((s32((local_8 + 0x234), 0) !== 0)) {
      w32((local_8 + 0x1ec), 0, 1);
      w32((local_8 + 0x1f8), 0, s32(DAT_0062d7d0, s32((local_8 + 0x1ec), 0) * 2));
      w32((local_8 + 0x1f0), 0, s32((local_8 + 0x1f8), 0));
      w32((local_8 + 0x1fc), 0, s32(DAT_0062d7d4, s32((local_8 + 0x1ec), 0) * 2));
      w32((local_8 + 0x1f4), 0, s32((local_8 + 0x1fc), 0));
      FUN_00526ca0(s32((local_8 + 0x1f0), 0), 0);
      FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
      FUN_00453c40();
    }
  }
  return;
}


 export function FUN_0052e326 ()

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
  /* switch */ (s32((local_8 + 0x1ec), 0) ( *) ((local_8 + 0x1ec)  )) {
  case 3 :
    break;
  case 5 :
  case 6 :
  case 7 :
  case 8 :
  case 9 :
  case 10 :
  case 0xb :
  case 0xc :
  case 0xd :
  case 0xf :
    w32((local_8 + 0x1ec), 0, 3);
    FUN_00453c40();
    w32((local_8 + 0x1f8), 0, DAT_0062d7e8);
    w32((local_8 + 0x1f0), 0, s32((local_8 + 0x1f8), 0));
    w32((local_8 + 0x1fc), 0, DAT_0062d7ec);
    w32((local_8 + 0x1f4), 0, s32((local_8 + 0x1fc), 0));
    FUN_00526ca0(s32((local_8 + 0x1f0), 0), 0);
    FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
    break;
  case 0xe :
    w32((local_8 + 0x1ec), 0, 5);
    w32((local_8 + 0x1f8), 0, DAT_0062d7f8);
    w32((local_8 + 0x1f0), 0, s32((local_8 + 0x1f8), 0));
    w32((local_8 + 0x1fc), 0, DAT_0062d7fc);
    w32((local_8 + 0x1f4), 0, s32((local_8 + 0x1fc), 0));
    FUN_00526ca0(s32((local_8 + 0x1f0), 0), 0);
    FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
  }
  return;
}


 export function FUN_0052e4c9 ()

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
  FUN_0046b14d(0x83, s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_0067a8c0 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
  DAT_00635a3c = LAB_00403c74;
  FUN_00410030(s_PARLEYACCEPT2_006324f0, DAT_0063fc58, 0);
  w32((local_8 + 0x1ec), 0, 3);
  FUN_004b8676(1);
  return;
}


 export function FUN_0052e57c ()

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
  FUN_0046b14d(0x84, s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_0067a8c0 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
  w32((local_8 + 0x1ec), 0, 2);
  w32((local_8 + 0x1f8), 0, s32(DAT_0062d7d0, s32((local_8 + 0x1ec), 0) * 2));
  w32((local_8 + 0x1f0), 0, s32((local_8 + 0x1f8), 0));
  w32((local_8 + 0x1fc), 0, s32(DAT_0062d7d4, s32((local_8 + 0x1ec), 0) * 2));
  w32((local_8 + 0x1f4), 0, s32((local_8 + 0x1fc), 0));
  FUN_00526ca0(s32((local_8 + 0x1f0), 0), 0);
  FUN_00526ca0(s32((local_8 + 0x1f4), 0), 1);
  return;
}


 export function FUN_0052e685 ()

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
  FUN_0046b14d(0x85, s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_0067a8c0 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
  w32((local_8 + 0x1ec), 0, 3);
  FUN_004b8676(1);
  return;
}


 export function FUN_0052e71a (param_1)

 {
  let iVar1;

  FUN_005c62ee();
  FUN_004518d0();
  if ((param_1 < 0x430)) {
    iVar1 = width(s32((DAT_0068aeb0 + (param_1 + -0x428) * 4), 0));
    w32((DAT_0068af08 + (param_1 + -0x428) * 4), 0, iVar1);
  }
  return;
}


 export function FUN_0052e7b7 (param_1)

 {
  let iVar1;
  let local_c;

  FUN_005c62ee();
  FUN_004518d0();
  /* switch */ () {
  case 0x415 :
    DAT_0068aedc = width(DAT_0068aed0);
    break;
  case 0x416 :
    DAT_0068aee4 = width(DAT_0068aed8);
    if ((width(DAT_0068aed8) !== 0)) {
      (local_c < 8) (local_c = 1; local_c = (local_c < 8); local_c = (local_c + 1)) {
        if ((s32((DAT_0068ae90 + local_c * 4), 0) !== 0)) {
          FUN_0040fad0(1);
          FUN_0040f380();
          w32((DAT_0068aee8 + local_c * 4), 0, 1);
        }
      }
    }
    break;
  case 0x417 :
  case 0x418 :
  case 0x419 :
  case 0x41a :
  case 0x41b :
  case 0x41c :
  case 0x41d :
    param_1 = (param_1 + -0x416);
    iVar1 = width(s32((DAT_0068ae90 + param_1 * 4), 0));
    w32((DAT_0068aee8 + param_1 * 4), 0, iVar1);
    if ((DAT_0068aee4 !== 0)) {
      FUN_0040fad0(0);
      FUN_0040f380();
      DAT_0068aee4 = 0;
    }
    break;
  case 0x430 :
    DAT_0068aee0 = width(DAT_0068aed4);
  }
  return;
}


 export function FUN_0052e971 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34c), 0) !== 0)) {
    if ((s32((in_ECX + 0x1ec), 0) !== 2)) {
      FUN_0043c5f0();
      FUN_00453c40();
      FUN_0043c5f0();
      FUN_00453c40();
    }
    /* switch */ (s32((in_ECX + 0x1ec), 0) ( *) ((in_ECX + 0x1ec)  )) {
    case 1 :
    case 2 :
      FUN_0043c5f0();
      FUN_00453c40();
      FUN_0040f380();
      FUN_00453c40();
      if ((s32((in_ECX + 0x1ec), 0) === 2)) {
        if ((_MEM[(in_ECX + 0x3be)] === 0)) {
          FUN_0043c5f0();
          FUN_00453c40();
          FUN_0040f380();
          FUN_00453c80();
        }
        else {
          FUN_0040f380();
          FUN_00453c80();
          FUN_0043c5f0();
          FUN_00453c40();
        }
      }
      break;
    case 3 :
    case 5 :
      FUN_0043c5f0();
      FUN_00453c40();
      FUN_0040f380();
      FUN_00453c80();
      break;
    case 6 :
    case 7 :
    case 8 :
    case 9 :
    case 10 :
    case 0xb :
    case 0xc :
    case 0xd :
    case 0xf :
      FUN_0040f380();
      FUN_0043c5f0();
      FUN_00453c40();
      if ((s32((in_ECX + 0x1e8), 0) === 0)) {
        FUN_00453c40();
      }
      else {
        FUN_00453c80();
      }
      break;
    case 0xe :
      FUN_0040f380();
      FUN_0043c5f0();
      FUN_00453c40();
      if ((s32((in_ECX + 0x1e8), 0) === 0)) {
        FUN_00453c40();
      }
      else {
        FUN_00453c80();
      }
    }
  }
  return;
}


 export function FUN_0052ec47 (param_1)

 {
  let cVar1;
  let sVar2;
  let sVar3;
  let bVar4;
  let uVar5;
  let iVar6;
  let local_20;
  let local_8;

  local_20 = ((DAT_00655b16) << 16 >> 16);
  do {
    local_20 = (local_20 + -1);
    if ((local_20 < 0)) {
      return -1;
    }
  } while ((s32((DAT_0065610a + local_20 * 0x20), 0) !== param_1)) {
    if ((7 < local_8)) {
 LAB_0052ed47: :
      if ((iVar6 !== 1)) {
        local_20 = -2;
      }
      return local_20;
    }
    uVar5 = FUN_005ae052((s8(DAT_00628350[local_8]) + ((sVar2) << 16 >> 16)));
    cVar1 = DAT_00628360[local_8];
    iVar6 = FUN_004087c0(uVar5, (s8(cVar1) + ((sVar3) << 16 >> 16)));
    if ((iVar6 === 0)) {
      bVar4 = 1;
      goto LAB_0052ed47;
    }
    local_8 = (local_8 + 1);
  } ( true );
}


 export function FUN_0052ed95 (param_1)

 {
  let local_8;

  local_8 = ((DAT_00655b18) << 16 >> 16);
  do {
    local_8 = (local_8 + -1);
    if ((local_8 < 0)) {
      return -1;
    }
  } while ((s32((DAT_0064f394 + local_8 * 0x58), 0) !== param_1))
