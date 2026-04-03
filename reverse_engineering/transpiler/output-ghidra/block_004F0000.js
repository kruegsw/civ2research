// Block 0x004F0000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 107

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_004f00f0 (param_1, param_2)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = u8(_MEM[DAT_0064c48d + param_2 * 8]);
  if ((param_2 === 2)) {
    if ((local_8 !== 0)) {
      local_8 = (local_8 - 1);
    }
    iVar1 = FUN_004bd9f0(param_1, 0x23);
    if ((iVar1 !== 0)) {
      local_8 = (local_8 + 1);
    }
    for (/* cond: (_MEM[DAT_00627689 + local_c * 0x10] === 0) */); (-1 = (-1 < local_c) && (wv(DAT_00627689, DAT_00627689)));
        local_c = s8(_MEM[DAT_0062768e + local_c * 0x10])) {
    }
    iVar1 = FUN_004bd9f0(param_1, local_c);
    if ((iVar1 !== 0)) {
      local_8 = (local_8 + 1);
    }
  }
  if ((local_8 === 1)) {
    iVar1 = FUN_00453e51(param_1, 0x11);
    if ((iVar1 !== 0)) {
      local_8 = 0;
    }
  }
  if ((param_2 === 0xb)) {
    local_8 = 0;
  }
  return local_8;
}


 export function FUN_004f0221 (param_1)

 {
  let iVar1;
  let iVar2;
  let local_8;

  iVar1 = s8(_MEM[DAT_0064f348 + param_1 * 0x58]);
  if ((_MEM[DAT_0064c6b5 + iVar1 * 0x594] !== 0)) {
    for (/* cond: (local_8 < 0x27) */); local_8 = (local_8 < 0x27); local_8 = (local_8 + 1)) {
      iVar2 = FUN_0043d20a(param_1, local_8);
      if ((iVar2 !== 0)) {
        iVar2 = FUN_004f00f0(iVar1, local_8);
        w32((DAT_0064c6a2 + iVar1 * 0x594), 0, (s32((DAT_0064c6a2 + iVar1 * 0x594), 0) - iVar2));
        if ((s32((DAT_0064c6a2 + iVar1 * 0x594), 0) < 0)) {
          w32((DAT_0064c6a2 + iVar1 * 0x594), 0, 0);
          FUN_0043d289(param_1, local_8, 0);
          if ((DAT_00654fa8 === 0)) {
            FUN_004271e8(1, s32((DAT_0064c488 + local_8 * 8), 0));
            FUN_00421da0(0, u8(_MEM[DAT_0064c48c + local_8 * 8]) * DAT_006a657c);
            FUN_004f3f30(s_INHOCK_0062ef7c, param_1, (DAT_00645160 + local_8 * 0x3c));
          }
          w32((DAT_0064c6a2 + iVar1 * 0x594), 0, (s32((DAT_0064c6a2 + iVar1 * 0x594), 0) + u8(_MEM[DAT_0064c48c + local_8 * 8]) * DAT_006a657c));
        }
      }
    }
  }
  return;
}


 export function FUN_004f03b7 (param_1)

 {
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

  iVar2 = FUN_005b8aa8(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16));
  iVar3 = s8(_MEM[DAT_0064f348 + param_1 * 0x58]);
  if ((1 < _MEM[DAT_0064c932 + (iVar3 * 0x594 + iVar2)])) {
    for (/* cond: (local_14 < 2) */); local_14 = (local_14 < 2); local_14 = (local_14 + 1)) {
      for (/* cond: (local_38 < ((DAT_00655b18) << 16 >> 16)) */); local_38 = (local_38 < ((DAT_00655b18) << 16 >> 16)); local_38 = (local_38 + 1)) {
        if (((_MEM[DAT_0064c6c0 + (s8(_MEM[DAT_0064f348 + local_38 * 0x58]) * 4 + iVar3 * 0x594)] & 0xc) !== 0)) {
          iVar4 = ((s16((DAT_0064f340 + local_38 * 0x58), 0)) << 16 >> 16);
          iVar5 = ((s16((DAT_0064f342 + local_38 * 0x58), 0)) << 16 >> 16);
          local_18 = ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16);
          local_24 = ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16);
          local_34 = 0;
          iVar6 = FUN_005b8aa8(iVar4, iVar5);
          if ((iVar6 < 0x17)) {
            wv(DAT_0062d040, 1);
            wv(DAT_0062d044, -1);
            wv(DAT_0062d03c, 2);
            bVar1 = 1;
            wv(DAT_00673fa0, iVar4);
            wv(DAT_00673fa4, iVar5);
            while ((iVar6 !== 8)) {
              local_18 = FUN_005ae052((s8(_MEM[DAT_00628350 + iVar6]) + local_18));
              local_24 = (local_24 + s8(_MEM[DAT_00628360 + iVar6]));
              if ((local_24 === iVar5));
              if ((iVar6 < 0)) {
                uVar7 = FUN_005b94d5(local_18, local_24);
                if (((uVar7 & 0x10) === 0)) {
                  pbVar8 = FUN_005b8931(local_18, local_24);
                  if ((iVar6 !== 0)) {
                    bVar1 = 0;
                  }
                }
                else {
                  uVar7 = FUN_005b94d5(local_18, local_24);
                  if ((iVar6 !== 0)) {
                    bVar1 = 0;
                  }
                }
              }
              local_34 = (local_34 + 1);
              if ((!bVar1));
            if ((iVar3 === iVar4)) {
              wv(DAT_0062ee0c, 1);
              wv(DAT_006a65e0, local_18);
              wv(DAT_006a65e8, local_24);
              return 1;
            }
          }
        }
      }
    }
  }
  return 0;
}


 export function FUN_004f080d (param_1)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  let iVar5;
  let iVar6;
  let uVar7;
  let local_8;

  bVar2 = 0;
  bVar1 = _MEM[DAT_0064f348 + param_1 * 0x58];
  iVar3 = s8(bVar1);
  for (/* cond: (local_8 < 0x14) */); local_8 = (local_8 < 0x14); local_8 = (local_8 + 1)) {
    uVar4 = FUN_005ae052((s8(_MEM[DAT_00628370 + local_8]) + ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16)));
    iVar5 = (((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) + s8(_MEM[DAT_006283a0 + local_8]));
    iVar6 = FUN_004087c0(uVar4, iVar5);
    if (((uVar7 & 0x80) !== 0)) {
      FUN_0049301b(iVar3, uVar4, iVar5, 0x15, 6);
      w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) | 0x80000));
      bVar2 = 1;
    }
  }
  if ((!bVar2)) {
    iVar5 = FUN_004bd9f0(iVar3, 0x43);
    if ((DAT_0062ee0c === 0)) {
      if ((DAT_006a65d4 < 4)) {
        wv(DAT_006a65d4, 3);
      }
      FUN_004f03b7(param_1);
      if ((DAT_0062ee0c === 0)) {
        return;
      }
    }
    wv(DAT_006a65d4, (DAT_006a65d4 + 2));
    if ((DAT_0062ee0c === 0)) {
      wv(DAT_006a65d4, 2);
      FUN_004f03b7(param_1);
    }
    if ((DAT_0062ee0c === 0)) {
      w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) & -0x80001));
    }
    else {
      if ((2 < DAT_006a65d4)) {
        if ((4 < _MEM[DAT_0064f349 + param_1 * 0x58])) {
          wv(DAT_006a65d4, (DAT_006a65d4 + 1));
        }
        iVar5 = FUN_0043d20a(param_1, 1);
        if ((iVar5 !== 0)) {
          wv(DAT_006a65d4, (DAT_006a65d4 + 1));
        }
      }
      if ((_MEM[DAT_0064f349 + param_1 * 0x58] < 4)) {
        wv(DAT_006a65d4, (DAT_006a65d4 + -1));
      }
      FUN_0049301b(iVar3, DAT_006a65e0, DAT_006a65e8, 0x15, DAT_006a65d4);
      w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) | 0x80000));
    }
  }
  return;
}


 export function FUN_004f0a9c (param_1)

 {
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

  wv(DAT_006aa760, 1);
  bVar1 = _MEM[DAT_0064f348 + param_1 * 0x58];
  iVar5 = s8(bVar1);
  if (((((u8(_MEM[DAT_0064f34b + param_1 * 0x58]) - 1) ^ (((DAT_00655af8) << 16 >> 16) & 0x3f)) & 0x3f) === 0)) {
    _MEM[DAT_0064f34a + param_1 * 0x58] = bVar1;
  }
  if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    wv(DAT_006a65ac, 1);
  }
  else {
    wv(DAT_006a65ac, 0);
  }
  if ((DAT_00654fa8 !== 0)) {
    wv(DAT_006a65ac, 0);
  }
  wv(DAT_006a65a0, 0);
  w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) & -0x400045))
  ;
  iVar6 = IsTracking(DAT_006a91b8);
  wv(DAT_0062ee00, u8((iVar6 === param_1)));
  wv(DAT_0062ee04, 0);
  sVar3 = s16((DAT_0064f35a + param_1 * 0x58), 0);
  iVar6 = FUN_004ebbde(param_1);
  if ((iVar6 === 0)) {
    FUN_004eb4ed(param_1, 1);
    if ((0 !== 0)) {
      FUN_00509429();
    }
    if ((DAT_00654fa8 === 0)) {
      FUN_004eb571(s_DECREASE_0062ef84, param_1, 0, 0);
    }
    wv(DAT_006a661c, ((DAT_006a65c8 - s8(_MEM[DAT_0064f349 + param_1 * 0x58]) * u8(DAT_0064bcca)) - DAT_006a65d8 * DAT_006a6608));
    w16((DAT_0064f35a + param_1 * 0x58), 0, (s16((DAT_0064f35a + param_1 * 0x58), 0) + ((((DAT_006a65c8 - s8(_MEM[DAT_0064f349 + param_1 * 0x58]) * u8(DAT_0064bcca)) - DAT_006a65d8 * DAT_006a6608)) & 0xFFFF)));
    if ((DAT_00654fa8 === 0)) {
      FUN_004eb571(s_FOODSHORTAGE_0062ef90, param_1, 0, 0);
    }
    FUN_004ec3fe(param_1);
    FUN_004eef23(param_1);
    wv(DAT_0062edfc, 1);
    wv(DAT_0062edf8, 1);
    wv(DAT_0062ee0c, 0);
    wv(DAT_006a65d4, 0);
    FUN_004eb4ed(param_1, 1);
    wv(DAT_0062edfc, 0);
    if ((DAT_006a65cc < DAT_006a6568)) {
      w16((DAT_0064ca74 + iVar5 * 0x594), 0, (s16((DAT_0064ca74 + iVar5 * 0x594), 0) + (((DAT_006a6568) & 0xFFFF) - ((DAT_006a65cc) & 0xFFFF)) * 5));
    }
    sVar3 = FUN_005adfa0((DAT_006a660c - u8(DAT_0064bcd5)), 0, s8(_MEM[DAT_0064f349 + param_1 * 0x58]));
    w16((DAT_0064ca74 + iVar5 * 0x594), 0, (sVar3 + s16((DAT_0064ca74 + iVar5 * 0x594), 0)));
    for (/* cond: (local_24 < 7) */); local_24 = (local_24 < 7); local_24 = (local_24 + 1)) {
      local_1c = 0;
      /* switch */ () {
      case 1 :
        local_1c = s8(_MEM[DAT_0064f349 + param_1 * 0x58]);
        break;
      case 2 :
        local_1c = u8(DAT_0064bcd5);
        break;
      case 3 :
        local_1c = u8(DAT_0064bcd6);
        break;
      case 4 :
        local_1c = u8(DAT_0064bcd7);
      }
      if ((local_1c < DAT_006a660c)) {
        w16((DAT_0064ca74 + (iVar5 * 0x594 + local_24 * 2)), 0, (s16((DAT_0064ca74 + (iVar5 * 0x594 + local_24 * 2)), 0) - (((DAT_006a660c) & 0xFFFF) - ((local_1c) & 0xFFFF))));
      }
    }
    iVar6 = FUN_00453e51(iVar5, 0x15);
    if ((iVar6 === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = 1;
    }
    cVar2 = _MEM[DAT_006554fa + ((s16((DAT_0064c6a6 + iVar5 * 0x594), 0)) << 16 >> 16) * 0x30];
    local_c = ((-s8(cVar2)) + 7);
    iVar6 = FUN_0043d20a(param_1, 5);
    if ((iVar6 !== 0)) {
      local_c = ((-s8(cVar2)) + 5);
    }
    iVar6 = FUN_0043d20a(param_1, 0xa);
    if ((iVar6 !== 0)) {
      local_c = (local_c + 0xffff);
    }
    iVar6 = FUN_0043d20a(param_1, 4);
    if ((iVar6 !== 0)) {
      local_c = (local_c + 0xffff);
    }
    iVar6 = FUN_00453e18(0xd);
    if ((iVar6 !== param_1)) {
      iVar6 = (s8(_MEM[DAT_006554f8 + ((s16((DAT_0064c6a6 + iVar5 * 0x594), 0)) << 16 >> 16) * 0x30]) + DAT_006a65e4)
      ;
      sVar3 = s16((DAT_0064ca80 + iVar5 * 0x594), 0);
      sVar4 = FUN_005adfa0((2 - local_8) * (iVar6 + 1), 0, 0x63);
      w16((DAT_0064ca80 + iVar5 * 0x594), 0, (sVar3 - sVar4 * local_c));
      sVar3 = s16((DAT_0064ca7e + iVar5 * 0x594), 0);
      sVar4 = FUN_005adfa0(iVar6 * (1 - local_8), 0, 0x63);
      w16((DAT_0064ca7e + iVar5 * 0x594), 0, (sVar3 - sVar4 * local_c));
    }
    FUN_004ef578(param_1);
    FUN_004efbc6(param_1);
    if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      FUN_004efd44(param_1);
      FUN_004f0221(param_1);
    }
    FUN_004f080d(param_1);
    iVar6 = (DAT_006a65cc * 2 - DAT_006a6568);
    if ((((s16((DAT_0064ca72 + iVar5 * 0x594), 0)) << 16 >> 16) <= iVar6)) {
      w16((DAT_0064ca72 + iVar5 * 0x594), 0, ((iVar6) & 0xFFFF));
    }
    wv(DAT_006aa760, 0);
    wv(DAT_0062ee08, -1);
    if ((DAT_0062ee00 !== 0)) {
      FUN_004e7492(param_1);
      FUN_00509429();
    }
    if ((DAT_006a65a0 !== 0)) {
      FUN_00509590(param_1);
    }
    wv(DAT_0062edf8, 0);
    iVar5 = (DAT_006a6550 - DAT_006a65a8);
  }
  else {
    iVar5 = -0x3e7;
  }
  return iVar5;
}


 export function FUN_004f1220 ()

 {
  let iVar1;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_006ad2f7 !== 0)) {
    local_18 = 0;
    local_c = 0;
    FUN_005b9ec6();
    for (/* cond: (local_8 < ((DAT_006d1164) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
      FUN_005b976d(local_c, local_18, 0xff, 1, 1);
      for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
        iVar1 = FUN_005b8931(local_c, local_18, local_14, 0, 1);
        FUN_005b9d81(local_c, local_18, _MEM[(iVar1 + 1)]);
      }
      local_c = (local_c + 2);
      if ((((DAT_006d1160) << 16 >> 16) <= local_c)) {
        local_18 = (local_18 + 1);
        local_c = (local_18 & 1);
      }
    }
    for (/* cond: (local_10 < ((DAT_00655b18) << 16 >> 16)) */); local_10 = (local_10 < ((DAT_00655b18) << 16 >> 16)); local_10 = (local_10 + 1)) {
      if ((s32((DAT_0064f394 + local_10 * 0x58), 0) !== 0)) {
        _MEM[DAT_0064f34c + local_10 * 0x58] = 0xff;
        for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
          _MEM[DAT_0064f34d + (local_10 * 0x58 + local_14)] = _MEM[DAT_0064f349 + local_10 * 0x58];
        }
        FUN_005b976d(((s16((DAT_0064f340 + local_10 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_10 * 0x58), 0)) << 16 >> 16), 0xff, 1, 1);
      }
    }
    FUN_005b9f1c();
    if ((2 < DAT_00655b02)) {
      wv(DAT_006ad699, 1);
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x74, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      if ((DAT_00654fa8 === 0)) {
        FUN_00511880(0x49, 0xff, 0, 0, 0, 0);
      }
    }
    FUN_0047cf9e(DAT_006d1da0, 1);
    if ((DAT_00654fa8 === 0)) {
      FUN_00421ea0(s_ASTRONAUTS_0062efa0);
    }
  }
  else {
    FUN_0046b14d(0x58, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  return;
}


 export function FUN_004f3d30 (param_1, param_2)

 {
  return _MEM[DAT_006a6530 + param_2];
}


 export function FUN_004f3d60 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004f3ddc;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0043c260();
  local_8 = 0;
  FUN_0059db08(0x4000);
  w32(in_ECX, 0, PTR_FUN_0061d6cc);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004f3e20 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_004f3e70();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_004f3e70 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004f3eee;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  FUN_004f3ebb();
  local_8 = -1;
  FUN_004f3ee5();
  FUN_004f3ef8();
  return;
}


 export function FUN_004f3ebb (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  if ((s32((unaff_EBP + -20), 0) === 0)) {
    w32((unaff_EBP + -16), 0, 0);
  }
  else {
    w32((unaff_EBP + -16), 0, (s32((unaff_EBP + -20), 0) + 0x4a4));
  }
  FUN_0059df8a();
  return;
}


 export function FUN_004f3ee5 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -20);
  return;
}


 export function FUN_004f3ef8 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004f3f30 (param_1, param_2, param_3)

 {
  FUN_004eb571(param_1, param_2, 0, param_3);
  return;
}


 export function FUN_004f3f60 (param_1)

 {
  wv(DAT_0062f004, param_1);
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
  FUN_004f3f9a();
  FUN_004f3fb4();
  return;
}


 export function FUN_004f3f9a ()

 {
  FUN_004f3feb();
  return;
}


 export function FUN_004f3fb4 ()

 {
  _atexit(FUN_004f3fd1);
  return;
}


 export function FUN_004f3fd1 ()

 {
  FUN_004f44a7();
  return;
}


 export function FUN_004f3feb (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004f448e;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c5a0();
  local_8 = 0;
  FUN_0040f3e0();
  local_8 = 1;
  FUN_0040f3e0();
  local_8 = 2;
  FUN_0040f3e0();
  local_8 = 3;
  FUN_0040f3e0();
  local_8 = 4;
  FUN_0040f3e0();
  local_8 = 5;
  FUN_0040f3e0();
  local_8 = 6;
  FUN_0040f3e0();
  local_8 = 7;
  FUN_0040f3e0();
  local_8 = 8;
  FUN_0040f3e0();
  local_8 = 9;
  FUN_0040f3e0();
  local_8 = 0xa;
  FUN_0040f3e0();
  local_8 = 0xb;
  FUN_0040f3e0();
  local_8 = 0xc;
  FUN_0040f3e0();
  local_8 = 0xd;
  FUN_0040f3e0();
  local_8 = 0xe;
  FUN_0040f3e0();
  local_8 = 0xf;
  FUN_004187a0();
  local_8 = ((((local_8) >> 8) << 8) | 0x10);
  FUN_0040fb00();
  w32(in_ECX, 0, PTR_FUN_0061d6d0);
  w32(in_ECX, 0x45, 1);
  w32(in_ECX, 0x47, 0);
  w32(in_ECX, 0x48, 0);
  w32(in_ECX, 0x49, 0);
  w32(in_ECX, 0x5c4, 0);
  w32(in_ECX, 0x7d0, 0);
  w32(in_ECX, 0x46, 0);
  for (/* cond: (local_14 < 0x64) */); local_14 = (local_14 < 0x64); local_14 = (local_14 + 1)) {
    w32(in_ECX, (local_14 + 0x197), -1);
  }
  for (/* cond: (local_14 < 0x27) */); local_14 = (local_14 < 0x27); local_14 = (local_14 + 1)) {
    w32(in_ECX, (local_14 + 0x260), -1);
  }
  for (/* cond: (local_14 < 0x1c) */); local_14 = (local_14 < 0x1c); local_14 = (local_14 + 1)) {
    w32(in_ECX, (local_14 + 0x2af), -1);
  }
  for (/* cond: (local_14 < 0x3e) */); local_14 = (local_14 < 0x3e); local_14 = (local_14 + 1)) {
    w32(in_ECX, (local_14 + 0x2e8), -1);
  }
  for (/* cond: (local_14 < 7) */); local_14 = (local_14 < 7); local_14 = (local_14 + 1)) {
    w32(in_ECX, (local_14 + 0x365), -1);
  }
  for (/* cond: (local_14 < 0x21) */); local_14 = (local_14 < 0x21); local_14 = (local_14 + 1)) {
    w32(in_ECX, (local_14 + 0x374), -1);
  }
  for (/* cond: (local_14 < 0x100) */); local_14 = (local_14 < 0x100); local_14 = (local_14 + 1)) {
    w32(in_ECX, (local_14 + 0x3b7), -1);
  }
  w32(in_ECX, 0x5b7, 0);
  w32(in_ECX, 0x5b8, 0);
  w32(in_ECX, 0x5b9, 0);
  w32(in_ECX, 0x5ba, 0);
  w32(in_ECX, 0x5bb, 0);
  w32(in_ECX, 0x5bc, 0);
  w32(in_ECX, 0x5bd, 0);
  w32(in_ECX, 0x6c8, 0);
  w32(in_ECX, 0x4a, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004f44a7 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004f477b;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(in_ECX, 0, PTR_FUN_0061d6d0);
  local_8 = 0x11;
  FUN_004f4809();
  FUN_004f4793();
  if ((s32(in_ECX, 0x5c4) !== 0)) {
    if ((s32(in_ECX, 0x5c4) !== 0)) {
      FUN_00453aa0(1);
    }
    w32(in_ECX, 0x5c4, 0);
  }
  if ((s32(in_ECX, 0x6c8) !== 0)) {
    if ((s32(in_ECX, 0x6c8) !== 0)) {
      FUN_00453aa0(1);
    }
    w32(in_ECX, 0x6c8, 0);
  }
  FUN_004083b0();
  local_8 = 0x10;
  FUN_004f4673();
  local_8 = 0xf;
  FUN_004f4682();
  local_8 = 0xe;
  FUN_004f4691();
  local_8 = 0xd;
  FUN_004f46a0();
  local_8 = 0xc;
  FUN_004f46af();
  local_8 = 0xb;
  FUN_004f46be();
  local_8 = 0xa;
  FUN_004f46cd();
  local_8 = 9;
  FUN_004f46dc();
  local_8 = 8;
  FUN_004f46eb();
  local_8 = 7;
  FUN_004f46fa();
  local_8 = 6;
  FUN_004f4709();
  local_8 = 5;
  FUN_004f4718();
  local_8 = 4;
  FUN_004f4727();
  local_8 = 3;
  FUN_004f4736();
  local_8 = 2;
  FUN_004f4745();
  local_8 = 1;
  FUN_004f4754();
  local_8 = (((local_8) >> 8) << 8);
  FUN_004f4763();
  local_8 = -1;
  FUN_004f4772();
  FUN_004f4785();
  return;
}


 export function FUN_004f4673 ()

 {
  FUN_0040fbb0();
  return;
}


 export function FUN_004f4682 ()

 {
  FUN_00418870();
  return;
}


 export function FUN_004f4691 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f46a0 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f46af ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f46be ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f46cd ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f46dc ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f46eb ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f46fa ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f4709 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f4718 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f4727 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f4736 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f4745 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f4754 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f4763 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004f4772 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_004f4785 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004f4793 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  while ((s32((in_ECX + 0x1f40), 0) !== 0)) {
    uVar1 = s32((s32((in_ECX + 0x1f40), 0) + 0x44), 0);
    if ((s32((in_ECX + 0x1f40), 0) !== 0)) {
      FID_conflict:`scalar_deleting_destructor'(1);
    }
    w32((in_ECX + 0x1f40), 0, uVar1);
  }
  FUN_00419b80();
  return;
}


 export function FUN_004f4809 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  while ((s32((in_ECX + 0x16dc), 0) !== 0)) {
    uVar1 = s32((s32((in_ECX + 0x16dc), 0) + 8), 0);
    if ((s32(s32((in_ECX + 0x16dc), 0), 0) !== 0)) {
      operator_delete(s32(s32((in_ECX + 0x16dc), 0), 0));
    }
    operator_delete(s32((in_ECX + 0x16dc), 0));
    w32((in_ECX + 0x16dc), 0, uVar1);
  }
  while ((s32((in_ECX + 0x16e0), 0) !== 0)) {
    uVar1 = s32((s32((in_ECX + 0x16e0), 0) + 8), 0);
    if ((s32(s32((in_ECX + 0x16e0), 0), 0) !== 0)) {
      operator_delete(s32(s32((in_ECX + 0x16e0), 0), 0));
    }
    operator_delete(s32((in_ECX + 0x16e0), 0));
    w32((in_ECX + 0x16e0), 0, uVar1);
  }
  while ((s32((in_ECX + 0x16e4), 0) !== 0)) {
    uVar1 = s32((s32((in_ECX + 0x16e4), 0) + 8), 0);
    if ((s32(s32((in_ECX + 0x16e4), 0), 0) !== 0)) {
      operator_delete(s32(s32((in_ECX + 0x16e4), 0), 0));
    }
    operator_delete(s32((in_ECX + 0x16e4), 0));
    w32((in_ECX + 0x16e4), 0, uVar1);
  }
  while ((s32((in_ECX + 0x16e8), 0) !== 0)) {
    uVar1 = s32((s32((in_ECX + 0x16e8), 0) + 8), 0);
    if ((s32(s32((in_ECX + 0x16e8), 0), 0) !== 0)) {
      operator_delete(s32(s32((in_ECX + 0x16e8), 0), 0));
    }
    operator_delete(s32((in_ECX + 0x16e8), 0));
    w32((in_ECX + 0x16e8), 0, uVar1);
  }
  while ((s32((in_ECX + 0x16ec), 0) !== 0)) {
    uVar1 = s32((s32((in_ECX + 0x16ec), 0) + 8), 0);
    if ((s32(s32((in_ECX + 0x16ec), 0), 0) !== 0)) {
      operator_delete(s32(s32((in_ECX + 0x16ec), 0), 0));
    }
    operator_delete(s32((in_ECX + 0x16ec), 0));
    w32((in_ECX + 0x16ec), 0, uVar1);
  }
  while ((s32((in_ECX + 0x16f0), 0) !== 0)) {
    uVar1 = s32((s32((in_ECX + 0x16f0), 0) + 8), 0);
    if ((s32(s32((in_ECX + 0x16f0), 0), 0) !== 0)) {
      operator_delete(s32(s32((in_ECX + 0x16f0), 0), 0));
    }
    operator_delete(s32((in_ECX + 0x16f0), 0));
    w32((in_ECX + 0x16f0), 0, uVar1);
  }
  while ((s32((in_ECX + 0x16f4), 0) !== 0)) {
    uVar1 = s32((s32((in_ECX + 0x16f4), 0) + 8), 0);
    if ((s32(s32((in_ECX + 0x16f4), 0), 0) !== 0)) {
      operator_delete(s32(s32((in_ECX + 0x16f4), 0), 0));
    }
    operator_delete(s32((in_ECX + 0x16f4), 0));
    w32((in_ECX + 0x16f4), 0, uVar1);
  }
  return;
}


 export function FUN_004f4b9f (in_ECX)

 {
  let iVar1;
  let iVar2;
  let extraout_EAX;
  let uVar3;
  let pvVar4;
  let extraout_EAX_00;
  let iVar5;
  let extraout_EAX_01;
  let iVar6;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_8c;
  let local_88;
  let local_84;
  let local_80;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_24;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004f5b0c;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_004f4809();
  FUN_004f4793();
  w32((in_ECX + 0x128), 0, 0);
  if ((s32((in_ECX + 0x1710), 0) !== 0)) {
    if ((s32((in_ECX + 0x1710), 0) !== 0)) {
      FUN_00453aa0(1);
    }
    w32((in_ECX + 0x1710), 0, 0);
  }
  w32((in_ECX + 0x5dc), 0, 0x280);
  w32((in_ECX + 0x5e0), 0, 0x190);
  iVar1 = FUN_0040ef70();
  w32((in_ECX + 0x5e4), 0, ((iVar1 + DAT_0062d864 * 2) + DAT_0062d85c * 2));
  FUN_006e7d90((in_ECX + 0x5e8), 0, 0, s32((in_ECX + 0x5dc), 0), s32((in_ECX + 0x5e0), 0));
  iVar1 = s32((in_ECX + 0x5e0), 0);
  iVar2 = (s32((in_ECX + 0x5e4), 0) + DAT_0062d85c);
  wv(DAT_0068abe0, DAT_0068abe0);
  FUN_006e7d90((in_ECX + 0x5f8), 0, 0, (s32((in_ECX + 0x5dc), 0) + (DAT_0062d860 + DAT_0062d858) * -2), ((iVar1 - iVar2) + (((DAT_0062d85c * -3 + DAT_0062d868 * -2) - extraout_EAX) + DAT_0062d864 * -2)));
  FUN_006e7da4((in_ECX + 0x5f8), (DAT_0062d860 + DAT_0062d858), (s32((in_ECX + 0x5e4), 0) + DAT_0062d85c));
  iVar1 = FUN_004080c0();
  iVar2 = FUN_00414bb0();
  FUN_005f22d0((in_ECX + 0x618), DAT_0062f018);
  FUN_005bb4ae(0, 0xe02, ((iVar1 / 2 | 0) - (s32((in_ECX + 0x5dc), 0) / 2 | 0)), ((iVar2 / 2 | 0) - (s32((in_ECX + 0x5e0), 0) / 2 | 0)), s32((in_ECX + 0x5dc), 0), s32((in_ECX + 0x5e0), 0), DAT_006a8c00, DAT_006553d8);
  FUN_00408230(thunk_FUN_004f5dd1);
  in_ECX = EnableStackedTabs(in_ECX, 0x40272a);
  FUN_00497d00(s32((in_ECX + 0x5e4), 0));
  in_ECX = (in_ECX + 0x58);
  FUN_0040f350(0);
  iVar1 = DAT_0062d860;
  w32((in_ECX + 0x170c), 0, DAT_00645120);
  w32((in_ECX + 0x16f8), 0, 1);
  uVar3 = FUN_004a6980();
  w32((in_ECX + 0x1704), 0, uVar3);
  uVar3 = FUN_004bb540();
  w32((in_ECX + 0x1708), 0, uVar3);
  local_14 = (s32((in_ECX + 0x1708), 0) * s32((in_ECX + 0x5e4), 0) / 0x18 | 0);
  iVar2 = ((s32((in_ECX + 0x5e4), 0) >> 1) - (local_14 >> 1));
  FUN_006e7d90(DAT_ffffffdc, iVar1, iVar2, ((s32((in_ECX + 0x1704), 0) * s32((in_ECX + 0x5e4), 0) / 0x18 | 0) + iVar1), (local_14 + iVar2));
  pvVar4 = operator_new(0x40);
  local_8 = 0;
  if ((pvVar4 === 0)) {
    local_44 = 0;
  }
  else {
    local_44 = FUN_00451930();
  }
  local_8 = -1;
  w32((in_ECX + 0x1710), 0, local_44);
  if ((in_ECX === 0)) {
    local_48 = 0;
  }
  else {
    local_48 = (in_ECX + 0x48);
  }
  FUN_004519b0(local_48, 0xfa0, DAT_ffffffdc);
  FUN_00451a60(LAB_004037fb);
  iVar2 = ((DAT_0062d864 + DAT_0062d858) + 2);
  iVar1 = s32((in_ECX + 0x5e0), 0);
  wv(DAT_0068abe0, DAT_0068abe0);
  iVar1 = (iVar1 - (extraout_EAX_00 + (DAT_0062d85c + DAT_0062d868) * 2));
  iVar5 = (s32((in_ECX + 0x5dc), 0) - ((DAT_0062d858 * 2 + DAT_0062d864 * 2) + 5));
  wv(DAT_0068abe0, DAT_0068abe0);
  local_14 = (extraout_EAX_01 + DAT_0062d868 * 2);
  iVar6 = (iVar5 / 2 | 0);
  FUN_006e7d90(DAT_ffffffdc, iVar2, iVar1, (iVar6 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_4c = 0;
  }
  else {
    local_4c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x9c), 0));
  FUN_0040f680(local_4c, 0xfa1, DAT_ffffffdc, uVar3);
  FUN_0040f880(thunk_FUN_004f5f23);
  FUN_006e7d90(DAT_ffffffdc, (iVar6 + iVar2), iVar1, (iVar6 * 2 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_50 = 0;
  }
  else {
    local_50 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x51c), 0));
  FUN_0040f680(local_50, 0xfa2, DAT_ffffffdc, uVar3);
  FUN_0040f7d0();
  FUN_0040f840();
  FUN_0040f880(LAB_004037fb);
  FUN_006e7d90(DAT_ffffffdc, iVar2, iVar1, ((iVar5 / 2 | 0) + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_54 = 0;
  }
  else {
    local_54 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd58), 0));
  FUN_0040f680(local_54, 0xfb2, DAT_ffffffdc, uVar3);
  FUN_0040f880(LAB_004018ed);
  iVar6 = (iVar5 / 3 | 0);
  FUN_006e7d90(DAT_ffffffdc, iVar2, iVar1, (iVar6 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_58 = 0;
  }
  else {
    local_58 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x9c), 0));
  FUN_0040f680(local_58, 0xfab, DAT_ffffffdc, uVar3);
  FUN_0040f880(thunk_FUN_004f5f23);
  FUN_006e7d90(DAT_ffffffdc, (iVar6 + iVar2), iVar1, (iVar6 * 2 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_5c = 0;
  }
  else {
    local_5c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd80), 0));
  FUN_0040f680(local_5c, 0xfac, DAT_ffffffdc, uVar3);
  FUN_0040f880(LAB_00401ec4);
  FUN_006e7d90(DAT_ffffffdc, (iVar6 * 2 + iVar2), iVar1, (iVar6 * 3 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_60 = 0;
  }
  else {
    local_60 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x51c), 0));
  FUN_0040f680(local_60, 0xfad, DAT_ffffffdc, uVar3);
  FUN_0040f7d0();
  FUN_0040f840();
  FUN_0040f880(LAB_004037fb);
  iVar6 = ((iVar5 + ((iVar5 >> 0x1f) & 3)) >> 2);
  FUN_006e7d90(DAT_ffffffdc, iVar2, iVar1, (iVar6 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_64 = 0;
  }
  else {
    local_64 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd58), 0));
  FUN_0040f680(local_64, 0xfae, DAT_ffffffdc, uVar3);
  FUN_0040f880(LAB_004018ed);
  FUN_006e7d90(DAT_ffffffdc, (iVar6 + iVar2), iVar1, (iVar6 * 2 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_68 = 0;
  }
  else {
    local_68 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd80), 0));
  FUN_0040f680(local_68, 0xfaf, DAT_ffffffdc, uVar3);
  FUN_0040f880(LAB_00401ec4);
  FUN_006e7d90(DAT_ffffffdc, (iVar6 * 2 + iVar2), iVar1, (iVar6 * 3 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_6c = 0;
  }
  else {
    local_6c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb04), 0));
  FUN_0040f680(local_6c, 0xfb0, DAT_ffffffdc, uVar3);
  FUN_0040f880(thunk_FUN_004f5f23);
  FUN_006e7d90(DAT_ffffffdc, (iVar6 * 3 + iVar2), iVar1, (iVar6 * 4 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_70 = 0;
  }
  else {
    local_70 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x51c), 0));
  FUN_0040f680(local_70, 0xfb1, DAT_ffffffdc, uVar3);
  FUN_0040f7d0();
  FUN_0040f840();
  FUN_0040f880(LAB_004037fb);
  iVar6 = (iVar5 / 3 | 0);
  FUN_006e7d90(DAT_ffffffdc, iVar2, iVar1, (iVar6 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_74 = 0;
  }
  else {
    local_74 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd58), 0));
  FUN_0040f680(local_74, 0xfa3, DAT_ffffffdc, uVar3);
  FUN_0040f880(LAB_004018ed);
  FUN_006e7d90(DAT_ffffffdc, (iVar6 + iVar2), iVar1, (iVar6 * 2 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_78 = 0;
  }
  else {
    local_78 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb04), 0));
  FUN_0040f680(local_78, 0xfa4, DAT_ffffffdc, uVar3);
  FUN_0040f880(thunk_FUN_004f5f23);
  FUN_006e7d90(DAT_ffffffdc, (iVar6 * 2 + iVar2), iVar1, (iVar6 * 3 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_7c = 0;
  }
  else {
    local_7c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x51c), 0));
  FUN_0040f680(local_7c, 0xfa5, DAT_ffffffdc, uVar3);
  FUN_0040f880(LAB_004037fb);
  iVar5 = (iVar5 / 2 | 0);
  FUN_006e7d90(DAT_ffffffdc, iVar2, iVar1, (iVar5 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_80 = 0;
  }
  else {
    local_80 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd58), 0));
  FUN_0040f680(local_80, 0xfa6, DAT_ffffffdc, uVar3);
  FUN_0040f880(LAB_004018ed);
  FUN_006e7d90(DAT_ffffffdc, (iVar5 + iVar2), iVar1, (iVar5 * 2 + iVar2), (local_14 + iVar1));
  if ((in_ECX === 0)) {
    local_84 = 0;
  }
  else {
    local_84 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x51c), 0));
  FUN_0040f680(local_84, 0xfa7, DAT_ffffffdc, uVar3);
  FUN_0040f880(LAB_004037fb);
  FUN_005d8236(DAT_0068abe0);
  FUN_004f4793();
  FUN_005d268e(DAT_0067a798);
  if ((in_ECX === 0)) {
    local_88 = 0;
  }
  else {
    local_88 = (in_ECX + 0x48);
  }
  FUN_004bb620(local_88, 0xfaa, (in_ECX + 0x5f8), DAT_0062f01c, 0x122, 0);
  local_24 = s32((in_ECX + 0x5f8), 0);
  local_24 = s32((in_ECX + 0x5fc), 0);
  local_24 = s32((in_ECX + 0x600), 0);
  iVar1 = s32((in_ECX + 0x604), 0);
  local_24 = iVar1;
  iVar2 = FUN_006e7d8c(3);
  local_24 = (iVar1 - iVar2);
  if ((in_ECX === 0)) {
    local_8c = 0;
  }
  else {
    local_8c = (in_ECX + 0x48);
  }
  FUN_0040fc50(local_8c, 0xfa8, DAT_ffffffdc, 0);
  FUN_0040fd80(LAB_00403c51);
  FUN_00451ac0(LAB_00403c51);
  FUN_005db0d0(2);
  FUN_004f7c99();
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_004f5b24 ()

 {
  if ((DAT_006a678c === 1)) {
    wv(DAT_006a66b0, DAT_006a66b0);
    wv(DAT_006a678c, 0);
  }
  FUN_004f4793();
  wv(DAT_006a6790, 0);
  FUN_004f5dd1();
  return;
}


 export function FUN_004f5b6f ()

 {
  if ((DAT_006a6790 !== 0)) {
    do {
      wv(DAT_006a6790, (DAT_006a6790 + -1));
      if ((s32((DAT_006a6924 + (DAT_006a6790 + -1) * 4), 0) !== DAT_006a6784));
    if (((DAT_006a6790 + -1) !== 0)) {
      wv(DAT_0062f00c, 1);
      wv(DAT_0062f010, s32((DAT_006a6794 + (DAT_006a6790 + -1) * 4), 0));
      wv(DAT_006a85b0, s32((DAT_006a6924 + (DAT_006a6790 + -1) * 4), 0));
      wv(DAT_006a85ac, s32((DAT_006a6ab4 + (DAT_006a6790 + -1) * 4), 0));
    }
    if ((s32((DAT_006a6924 + (DAT_006a6790 + -1) * 4), 0) !== 0)) {
      wv(DAT_006a6780, s32((DAT_006a6ab4 + (DAT_006a6790 + -1) * 4), 0));
      wv(DAT_006a6784, (s32((DAT_006a6924 + (DAT_006a6790 + -1) * 4), 0) + -1));
      wv(DAT_006a6788, s32((DAT_006a6794 + (DAT_006a6790 + -1) * 4), 0));
      wv(DAT_006a85a0, s32((DAT_006a6794 + (DAT_006a6790 + -1) * 4), 0));
      FUN_004f5f23(1);
      return;
    }
    wv(DAT_006a6780, s32((DAT_006a6ab4 + (DAT_006a6790 + -1) * 4), 0));
    wv(DAT_006a6784, 1);
    wv(DAT_006a6788, s32((DAT_006a6794 + (DAT_006a6790 + -1) * 4), 0));
    wv(DAT_006a85a0, s32((DAT_006a6794 + (DAT_006a6790 + -1) * 4), 0));
  }
  if ((DAT_006a6784 === 0)) {
    if ((DAT_006a678c === 1)) {
      wv(DAT_006a66b0, DAT_006a66b0);
      wv(DAT_006a678c, 0);
    }
    FUN_004f5dd1();
  }
  else {
    if ((DAT_006a6784 === 1)) {
      wv(DAT_006a6784, 0);
      FUN_00451bf0();
      FUN_004f5e52();
      wv(DAT_006a85a0, DAT_006a6788);
      FUN_004f6646();
    }
    else if ((DAT_006a6780 === 7)) {
      wv(DAT_006a6784, 0);
      FUN_00451bf0();
      FUN_004f5e52();
      wv(DAT_006a85a0, DAT_006a6788);
      FUN_004f6646();
    }
    else {
      wv(DAT_006a6784, 0);
      FUN_004f5f23(1);
    }
    FUN_004f8af9();
  }
  return;
}


 export function FUN_004f5dd1 ()

 {
  wv(DAT_006a677c, 1);
  wv(DAT_006a6790, 0);
  if ((DAT_006a8188 !== 0)) {
    if ((DAT_006a8188 !== 0)) {
      FUN_00453aa0(1);
    }
    wv(DAT_006a8188, 0);
  }
  FUN_004503d0();
  FUN_00451900();
  FUN_00484d52();
  return 0;
}


 export function FUN_004f5e52 ()

 {
  if ((DAT_006a677c === 0)) {
    if ((DAT_006a6784 === 0)) {
      FUN_004f7ac7(DAT_006a6780);
    }
    FUN_004f4793();
    FUN_005a9780(DAT_006a6668);
    FUN_004f6244();
    FUN_00451af0(DAT_006a6780, DAT_006a6784);
    FUN_00408460();
  }
  return;
}


 export function FUN_004f5ed2 ()

 {
  wv(DAT_006a6784, 0);
  wv(DAT_006a6780, 8);
  FUN_00451bf0();
  FUN_004f5e52();
  wv(DAT_006a85a0, DAT_006a6788);
  FUN_004f6646();
  FUN_004f8af9();
  return;
}


 export function FUN_004f5f23 ()

 {
  let uVar1;
  let uVar2;

  uVar1 = DAT_006a85a0;
  if ((DAT_006a6784 === 0)) {
    wv(DAT_006a6788, DAT_006a85a0);
    wv(DAT_006a6784, 1);
    FUN_004f4793();
    FUN_00451bf0();
    /* switch */ () {
    case 1 :
    case 8 :
      uVar1 = FUN_004f8a9b(DAT_006a7d44, uVar1);
      FUN_005f22d0(DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_00564e6d();
      break;
    case 2 :
      uVar1 = FUN_004f8a9b(DAT_006a7d48, uVar1);
      FUN_005f22d0(DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_00599b8d();
      break;
    case 3 :
      uVar1 = FUN_004f8a9b(DAT_006a7d4c, uVar1);
      FUN_005f22d0(DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_0052630d();
      break;
    case 4 :
      uVar1 = FUN_004f8a9b(DAT_006a7d50, uVar1);
      FUN_005f22d0(DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_005ac9ad();
      break;
    case 5 :
      uVar1 = FUN_004f8a9b(DAT_006a7d58, uVar1);
      FUN_005f22d0(DAT_006a6c80, uVar1);
      FUN_004f6244();
      FUN_004906fd();
      break;
    case 6 :
      wv(DAT_006a6784, 2);
      uVar2 = FUN_004f8a9b(DAT_006a7d54, uVar1);
      FUN_005f22d0(DAT_006a6c80, uVar2);
      FUN_004f6244();
      FUN_004f6564(DAT_006a6c60, 1);
      FUN_00452315(uVar1);
      break;
    case 7 :
      wv(DAT_006a6784, 2);
      uVar2 = FUN_004f8a9b(DAT_006a7d5c, uVar1);
      FUN_005f22d0(DAT_006a6c80, uVar2);
      FUN_004f6244();
      FUN_004f6564(DAT_006a6c60, 1);
      FUN_00452315(uVar1);
      break;
    default :
      FUN_0040bbe0(s_This_Should_not_Happen....._0062f020);
    }
    FUN_00408460();
  }
  else if ((DAT_006a6784 === 1)) {
    wv(DAT_006a6784, 2);
    FUN_004f4793();
    FUN_00451bf0();
    FUN_004f6244();
    FUN_004f6564(DAT_006a6c60, 0);
    FUN_00452315(uVar1);
  }
  FUN_004f8af9();
  return;
}


 export function FUN_004f6244 (in_ECX)

 {
  let iVar1;
  let extraout_EAX;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_34;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  FUN_005c0034();
  FID_conflict:_memcpy(DAT_ffffffec, (in_ECX + 0x5e8), 0x10);
  for (/* cond: (local_18 < DAT_0062d864) */); local_18 = (local_18 < DAT_0062d864); local_18 = (local_18 + 1)) {
    FUN_005a99fc(in_ECX, DAT_ffffffec, DAT_00635a08, DAT_00635a0c);
    FUN_004bb800(DAT_ffffffec, 1, 1);
  }
  FUN_004f6564(DAT_ffffffec, 1);
  FUN_004bb800(DAT_ffffffec, (DAT_0062d860 + DAT_0062d864 * -2), 0);
  local_14 = (UNNAMED + (s32((in_ECX + 0x5e4), 0) + DAT_0062d864 * -2));
  iVar1 = FUN_00407fc0((in_ECX + 0x5e8));
  wv(DAT_0068abe0, DAT_0068abe0);
  local_14 = (iVar1 + ((DAT_0062d85c * -3 + DAT_0062d868 * -2) - extraout_EAX));
  for (/* cond: (local_18 < DAT_0062d864) */); local_18 = (local_18 < DAT_0062d864); local_18 = (local_18 + 1)) {
    FUN_005a99fc(in_ECX, DAT_ffffffec, DAT_00635a0c, DAT_00635a08);
    FUN_004bb800(DAT_ffffffec, 1, 1);
  }
  FUN_004f6564(DAT_ffffffec, 2);
  iVar1 = DAT_0062d860;
  local_20 = DAT_0062d860;
  w32((in_ECX + 0x5dc), 0, (s32((in_ECX + 0x1704), 0) * s32((in_ECX + 0x5e4), 0) / 0x18 | 0));
  w32((in_ECX + 0x5e0), 0, (s32((in_ECX + 0x1708), 0) * s32((in_ECX + 0x5e4), 0) / 0x18 | 0));
  local_24 = ((s32((in_ECX + 0x5e4), 0) >> 1) - (s32((in_ECX + 0x5e0), 0) >> 1));
  FUN_006e7d90(DAT_ffffffec, iVar1, local_24, (s32((in_ECX + 0x5dc), 0) + iVar1), (s32((in_ECX + 0x5e0), 0) + local_24));
  FUN_005cd775(s32((in_ECX + 0x5e4), 0), 0x18);
  FUN_005cef31(DAT_ffffffcc, in_ECX, local_20, local_24);
  FUN_0047df50();
  local_20 = (local_20 + s32((in_ECX + 0x5dc), 0));
  local_1c = DAT_0069b018;
  iVar1 = ((s32((in_ECX + 0x5f0), 0) - local_20) - DAT_0062d860);
  iVar2 = FUN_0040efd0((in_ECX + 0x618));
  local_20 = (local_20 + ((iVar1 / 2 | 0) - (iVar2 >> 1)));
  local_24 = (DAT_0062d864 + DAT_0062d85c);
  FUN_005c19ad(0xa);
  FUN_005c0f57(local_1c, (in_ECX + 0x618), (local_20 + 2), (local_24 + 1), 5);
  FUN_005c19ad(0x1a);
  FUN_005c0f57(local_1c, (in_ECX + 0x618), (local_20 + 1), local_24, 5);
  FUN_005c0f57(local_1c, (in_ECX + 0x618), local_20, local_24, 5);
  FUN_005c0073((in_ECX + 0x5f8));
  return;
}


 export function FUN_004f6564 (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((param_2 !== 1)) {
    if ((param_2 !== 2)) {
      FUN_0040fdb0();
    }
    else {
      uVar1 = FUN_00407fc0(param_1, 0, 0);
      uVar1 = FUN_00407f90(param_1, uVar1);
      FUN_005a9b5d(in_ECX, DAT_00635aa4, s32(param_1, 0), s32(param_1, 1), uVar1);
    }
  }
  else {
    uVar1 = FUN_00407fc0(param_1, 0, 0);
    uVar1 = FUN_00407f90(param_1, uVar1);
    FUN_005a9b5d(in_ECX, DAT_00635aa0, s32(param_1, 0), s32(param_1, 1), uVar1);
  }
  return;
}


 export function FUN_004f6646 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = s32((in_ECX + 0x11c), 0);
  if ((iVar1 === 0)) {
    if ((s32((in_ECX + 0x118), 0) !== 8)) {
      FUN_004f66c6();
    }
  }
  else if ((iVar1 !== 2)) {
    FUN_004f5dd1();
  }
  return;
}


 export function FUN_004f66c6 (in_ECX)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  // in_ECX promoted to parameter;
  let local_14c;
  let local_148;
  let local_144;
  let local_140;
  let local_13c;
  let local_138;
  let local_134;
  let local_130;
  let local_12c;
  let local_11c;
  let local_10c;
  let local_fc;
  let local_ec;
  let local_dc;
  let local_cc;
  let local_bc;
  let local_ac;
  let local_9c;
  let local_8c;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_1c;
  let local_18;
  let local_8;

  local_3c = 0;
  FUN_004f8af9();
  FUN_005c00ce(DAT_ffffffe8);
  FUN_005c0073((in_ECX + 0x1b24));
  FUN_005c0333((in_ECX + 0x1b24), DAT_00635a18);
  local_8 = DAT_0067a798;
  local_50 = s32((in_ECX + 0x1b24), 0);
  local_4c = FUN_00407f90((in_ECX + 0x1b24));
  local_74 = (local_4c / 2 | 0);
  local_1c = FUN_00407fc0((in_ECX + 0x1b24));
  local_1c = (local_1c / 9 | 0);
  iVar1 = (local_1c / 2 | 0);
  iVar2 = FUN_0040ef70();
  local_7c = (iVar1 - (iVar2 / 2 | 0));
  local_64 = 0;
  do {
    if ((1 < local_64)) {
      FUN_005c0073(DAT_ffffffe8);
      FUN_0040f380();
      return;
    }
    local_60 = local_64 * 9;
    for (/* cond: (local_5c < 9) */); local_5c = (local_5c < 9); local_5c = (local_5c + 1)) {
      local_58 = (s32((in_ECX + 0x1b28), 0) + local_1c * local_5c);
      FUN_006e7d90(DAT_ffffffd4, local_50, local_58, ((local_74 + local_50) + -2), (local_1c + local_58));
      if ((((s32((in_ECX + 0x1f3c), 0) + local_60) + local_5c) < s32((in_ECX + 0x1b34), 0))) {
        local_78 = s32(((in_ECX + 0x1b38) + ((s32((in_ECX + 0x1f3c), 0) + local_60) + local_5c) * 4), 0)
        ;
        local_30 = u8((((s32((in_ECX + 0x1f3c), 0) + local_60) + local_5c) === DAT_006a85a0));
        if ((local_30 === 0)) {
          local_34 = DAT_00635a1c;
          local_48 = DAT_00635a20;
        }
        else {
          local_34 = DAT_00635a28;
          local_48 = DAT_00635a2c;
        }
        FUN_005cda06(DAT_ffffff98, DAT_ffffffac);
        /* switch */ (s32((in_ECX + 0x118), 0) ( *) ((in_ECX + 0x118)  )) {
        case 1 :
          local_38 = (DAT_00646cb8 + (s8(_MEM[DAT_0062768d + local_78 * 0x10]) * 0x3c + s8(_MEM[DAT_0062768c + local_78 * 0x10]) * 0xf0));
          FUN_005cd775(3, 2);
          local_3c = 3;
          break;
        case 2 :
          local_38 = (DAT_00645160 + local_78 * 0x3c);
          FUN_005cd775(3, 2);
          local_3c = 3;
          break;
        case 3 :
          local_38 = (DAT_00645160 + local_78 * 0x3c);
          FUN_005cd775(3, 2);
          local_3c = 3;
          break;
        case 4 :
          local_38 = (DAT_00641848 + local_78 * 0x3c);
          break;
        case 5 :
          local_3c = -5;
          local_70 = (local_78 % 0xb);
          if (((((s32((in_ECX + 0x1f3c), 0) + local_60) + local_5c) & 1) === 0)) {
            local_6c = DAT_0062d858;
          }
          else {
            iVar1 = FUN_004a6980();
            local_6c = (DAT_0062d858 + (iVar1 / 2 | 0));
          }
          iVar1 = FUN_004a6980();
          local_40 = ((DAT_0062d858 + (iVar1 * 3 / 2 | 0)) + 2);
          local_2c = (UNNAMED + local_40);
          if ((local_30 === 0)) {
            local_130 = DAT_00635a18;
          }
          else {
            local_130 = DAT_00635a24;
          }
          FUN_005c0333(DAT_ffffffd4, local_130);
          FUN_005cef31(DAT_ffffff74, DAT_006a6668, (local_6c + local_50), local_58);
          if ((local_78 < 0xb)) {
            if ((local_78 === 3)) {
              FUN_005cef31(DAT_ffffff64, DAT_006a6668, (local_6c + local_50), local_58);
            }
            else if ((local_78 === 4)) {
              FUN_005cef31(DAT_ffffff54, DAT_006a6668, (local_6c + local_50), local_58);
            }
            else if ((local_78 === 5)) {
              FUN_005cef31(DAT_ffffff44, DAT_006a6668, (local_6c + local_50), local_58);
            }
          }
          else {
            local_44 = u8((0x15 < local_78));
            /* switch */ () {
            case 0xd :
            case 0x18 :
              FUN_005cef31(DAT_ffffff34, DAT_006a6668, (local_6c + local_50), local_58);
              goto LAB_004f6d04;
            case 0xe :
            case 0x19 :
              FUN_005cef31(DAT_ffffff24, DAT_006a6668, (local_6c + local_50), local_58);
              break;
            case 0xf :
            case 0x1a :
              FUN_005cef31(DAT_ffffff14, DAT_006a6668, (local_6c + local_50), local_58);
              break;
            case 0x10 :
            case 0x11 :
            case 0x12 :
            case 0x13 :
            case 0x14 :
            case 0x15 :
            case 0x16 :
            case 0x17 :
            }
            FUN_005cef31(DAT_ffffff04, DAT_006a6668, (local_6c + local_50), local_58);
          }
          break;
        case 6 :
        case 7 :
          local_3c = -2;
          break;
        default :
          FUN_0040bbe0(s_This_Should_not_Happen....._0062f03c);
        }
 LAB_004f6d04: :
        if ((local_3c === 3)) {
          iVar1 = FUN_004a6980();
          local_40 = ((iVar1 * 3 / 2 | 0) + DAT_0062d858 * 2);
          local_2c = (UNNAMED + local_40);
          if ((local_30 === 0)) {
            local_134 = DAT_00635a18;
          }
          else {
            local_134 = DAT_00635a24;
          }
          FUN_005c0333(DAT_ffffffd4, local_134);
          FUN_005cef31(DAT_fffffef4, DAT_006a6668, (DAT_0062d858 + local_50), (UNNAMED + 1));
        }
        else if ((local_3c === 0)) {
          iVar1 = FUN_004a6980();
          local_40 = (DAT_0062d858 * 3 + iVar1 * 2);
          local_2c = (UNNAMED + local_40);
          if ((local_30 === 0)) {
            local_138 = DAT_00635a18;
          }
          else {
            local_138 = DAT_00635a24;
          }
          FUN_005c0333(DAT_ffffffd4, local_138);
          local_6c = FUN_004a6980();
          local_6c = (local_6c + DAT_0062d858 * 2);
          local_13c = local_6c;
          if (((((s32((in_ECX + 0x1f3c), 0) + local_60) + local_5c) & 1) === 0)) {
            local_13c = DAT_0062d858;
          }
          iVar2 = (local_58 + (local_1c / 2 | 0));
          iVar1 = FUN_00451860();
          FUN_005cef31(DAT_fffffee4, DAT_006a6668, (local_50 + local_13c), (iVar2 - (iVar1 / 2 | 0)));
        }
        else if ((local_3c === 2)) {
          iVar1 = FUN_004a6980();
          local_40 = (DAT_0062d858 * 3 + iVar1 * 2);
          local_2c = (UNNAMED + local_40);
          if ((local_30 === 0)) {
            local_140 = DAT_00635a18;
          }
          else {
            local_140 = DAT_00635a24;
          }
          FUN_005c0333(DAT_ffffffd4, local_140);
          iVar1 = FUN_004a6980();
          iVar2 = FUN_004a6980();
          iVar3 = FUN_004a6980();
          local_6c = (((((iVar1 + ((iVar1 >> 0x1f) & 3)) >> 2) + (iVar2 / 6 | 0)) + iVar3) + DAT_0062d858 * 2);
          local_38 = DAT_00644fb4;
          local_144 = local_6c;
          if (((((s32((in_ECX + 0x1f3c), 0) + local_60) + local_5c) & 1) === 0)) {
            local_144 = DAT_0062d858;
          }
          iVar2 = (local_58 + (local_1c / 2 | 0));
          iVar1 = FUN_00451860();
          FUN_005cef31(DAT_fffffed4, DAT_006a6668, (local_50 + local_144), (iVar2 - (iVar1 / 2 | 0)));
        }
        else if ((local_3c === -1)) {
          iVar1 = FUN_004a6980();
          local_40 = (DAT_0062d858 * 3 + iVar1 * 2);
          local_2c = (UNNAMED + local_40);
          if ((local_30 === 0)) {
            local_148 = DAT_00635a18;
          }
          else {
            local_148 = DAT_00635a24;
          }
          FUN_005c0333(DAT_ffffffd4, local_148);
        }
        else if ((local_3c !== -5)) {
          local_40 = (DAT_0062d858 * 5 + 2);
          local_2c = (UNNAMED + local_40);
          if ((local_30 === 0)) {
            local_14c = DAT_00635a18;
          }
          else {
            local_14c = DAT_00635a24;
          }
          FUN_005c0333(DAT_ffffffd4, local_14c);
        }
        local_3c = 0;
        FUN_005cd775(local_68, local_54);
        FUN_0040bbb0();
        local_78 = ((s32((in_ECX + 0x1f3c), 0) + local_60) + local_5c);
        /* switch */ (s32((in_ECX + 0x118), 0) ( *) ((in_ECX + 0x118)  )) {
        case 1 :
          uVar4 = FUN_004f8a9b(DAT_006a7d44, local_78);
          FUN_005f22d0(DAT_00679640, uVar4);
          break;
        case 2 :
          uVar4 = FUN_004f8a9b(DAT_006a7d48, local_78);
          FUN_005f22d0(DAT_00679640, uVar4);
          break;
        case 3 :
          uVar4 = FUN_004f8a9b(DAT_006a7d4c, local_78);
          FUN_005f22d0(DAT_00679640, uVar4);
          break;
        case 4 :
          uVar4 = FUN_004f8a9b(DAT_006a7d50, local_78);
          FUN_005f22d0(DAT_00679640, uVar4);
          break;
        case 5 :
          uVar4 = FUN_004f8a9b(DAT_006a7d58, local_78);
          FUN_005f22d0(DAT_00679640, uVar4);
          break;
        case 6 :
          uVar4 = FUN_004f8a9b(DAT_006a7d54, local_78);
          FUN_005f22d0(DAT_00679640, uVar4);
          break;
        case 7 :
          uVar4 = FUN_004f8a9b(DAT_006a7d5c, local_78);
          FUN_005f22d0(DAT_00679640, uVar4);
          break;
        default :
          FUN_0040bbe0(s_This_Should_Never_Be_Seen!!!_0062f058);
        }
        FUN_005c0073(DAT_ffffffd4);
        if ((local_48 !== local_34)) {
          FUN_005c19ad(local_48);
          FUN_005c0f57(local_8, DAT_00679640, ((local_40 + local_50) + 2), ((local_7c + local_58) + 1), 5);
          FUN_005c19ad(local_34);
          FUN_005c0f57(local_8, DAT_00679640, ((local_40 + local_50) + 1), (local_7c + local_58), 5);
        }
        FUN_005c19ad(local_34);
        FUN_005c0f57(local_8, DAT_00679640, (local_40 + local_50), (local_7c + local_58), 5);
        FUN_005c0073((in_ECX + 0x1b24));
      }
    }
    local_50 = (s32((in_ECX + 0x1b24), 0) + (local_64 + 1) * local_74);
    local_64 = (local_64 + 1);
  } ( true );
}


 export function FUN_004f7313 (param_1)

 {
  if ((DAT_006a85a4 !== param_1 * 9)) {
    wv(DAT_006a85a4, param_1 * 9);
    FUN_004f66c6();
  }
  return;
}


 export function FUN_004f734a (param_1, param_2)

 {
  let iVar1;
  let local_14;
  let local_c;

  if ((param_2 < DAT_006a8190)) {
    local_14 = -1;
  }
  else if ((param_2 < DAT_006a8198)) {
    if ((param_1 < DAT_006a818c)) {
      local_14 = -3;
    }
    else if ((param_1 < DAT_006a8194)) {
      iVar1 = FUN_00407f90(DAT_006a818c);
      local_c = u8(((DAT_006a818c + (iVar1 / 2 | 0)) <= param_1));
      iVar1 = FUN_00407fc0(DAT_006a818c);
      local_14 = ((((param_2 - DAT_006a8190) / (iVar1 / 9 | 0) | 0) + local_c * 9) + DAT_006a85a4);
      if ((DAT_006a819c <= local_14)) {
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


 export function FUN_004f7454 (param_1)

 {
  if ((param_1 < DAT_006a85a4)) {
    for (/* cond: ((DAT_006a85a4 % 9) !== 0) */); wv(DAT_006a85a4, (DAT_006a85a4 % 9)); wv(DAT_006a85a4, (DAT_006a85a4 + -1))) {
    }
  }
  else if (((DAT_006a85a4 + 0x12) <= param_1)) {
    for (/* cond: ((DAT_006a85a4 % 9) !== 0) */); wv(DAT_006a85a4, (DAT_006a85a4 % 9)); wv(DAT_006a85a4, (DAT_006a85a4 + -1))) {
    }
  }
  FUN_004f6646();
  return;
}


 export function FUN_004f74eb (param_1)

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  /* switch */ () {
  case 1 :
    local_10 = DAT_006a7d44;
    local_14 = DAT_006a6cc0;
    break;
  case 2 :
    local_10 = DAT_006a7d48;
    local_14 = DAT_006a6fe4;
    break;
  case 3 :
    local_10 = DAT_006a7d4c;
    local_14 = DAT_006a7120;
    break;
  case 4 :
    local_10 = DAT_006a7d50;
    local_14 = DAT_006a7204;
    break;
  case 5 :
    local_10 = DAT_006a7d58;
    local_14 = DAT_006a7434;
    break;
  case 6 :
    local_10 = DAT_006a7d54;
    local_14 = DAT_006a73f8;
    break;
  case 7 :
    local_10 = DAT_006a7d5c;
    local_14 = DAT_006a7540;
    break;
  default :
    return -1;
  }
  local_8 = local_10;
  local_c = (DAT_006a85a0 + 1);
  if ((DAT_006a819c <= local_c)) {
    local_c = 0;
  }
  for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = (local_c + -1)) {
    if ((s32(local_8, 2) === 0)) {
      local_8 = local_10;
    }
    else {
      local_8 = s32(local_8, 2);
    }
  }
  local_c = (DAT_006a85a0 + 1);
  if ((DAT_006a819c <= local_c)) {
    local_c = 0;
  }
  while ((iVar1 !== param_1)) {
    if ((s32(local_8, 2) === 0)) {
      local_8 = local_10;
      local_c = 0;
    }
    else {
      local_8 = s32(local_8, 2);
      local_c = (local_c + 1);
    }
    local_14 = (local_14 + -1);
  }
  if ((local_14 === 0)) {
    local_c = -1;
  }
  return local_c;
}


 export function FUN_004f76ce (param_1)

 {
  let iVar1;
  let iVar2;

  iVar2 = DAT_006a85a0;
  if ((DAT_006a6784 === 0)) {
    iVar1 = FID_conflict:__toupper_lk(param_1);
    if ((0x5a < iVar1)) {
      /* switch */ () {
      case 0xa1 :
      case 199 :
        wv(DAT_006a6788, (DAT_006a819c + -1));
        for (/* cond: ((DAT_006a85a4 % 9) !== 0) */); wv(DAT_006a85a4, (DAT_006a85a4 % 9)); wv(DAT_006a85a4, (DAT_006a85a4 + -1))) {
        }
        wv(DAT_006a85a0, (DAT_006a819c + -1));
        FUN_004f6646();
        FUN_0040fcf0((DAT_006a85a4 / 9 | 0));
        break;
      case 0xa2 :
      case 0xc1 :
        iVar2 = (iVar2 + 1);
        if ((iVar2 < DAT_006a819c)) {
          wv(DAT_006a6788, iVar2);
          wv(DAT_006a85a0, iVar2);
          FUN_004f7454(iVar2);
          FUN_0040fcf0((DAT_006a85a4 / 9 | 0));
        }
        break;
      case 0xa3 :
      case 0xa6 :
      case 0xc3 :
      case 0xc6 :
        iVar2 = (iVar2 + 9);
        if ((iVar2 < DAT_006a819c)) {
          wv(DAT_006a6788, iVar2);
          wv(DAT_006a85a0, iVar2);
          FUN_004f7454(iVar2);
          FUN_0040fcf0((DAT_006a85a4 / 9 | 0));
        }
        break;
      case 0xa4 :
      case 0xa9 :
      case 0xc2 :
      case 0xc5 :
        iVar2 = (iVar2 + -9);
        if ((-1 < iVar2)) {
          wv(DAT_006a6788, iVar2);
          wv(DAT_006a85a0, iVar2);
          FUN_004f7454(iVar2);
          FUN_0040fcf0((DAT_006a85a4 / 9 | 0));
        }
        break;
      case 0xa7 :
      case 0xc4 :
        wv(DAT_006a6788, 0);
        wv(DAT_006a85a0, 0);
        wv(DAT_006a85a4, 0);
        FUN_0040fcf0(0);
        FUN_004f6646();
        break;
      case 0xa8 :
      case 0xc0 :
        iVar2 = (iVar2 + -1);
        if ((-1 < iVar2)) {
          wv(DAT_006a6788, iVar2);
          wv(DAT_006a85a0, iVar2);
          FUN_004f7454(iVar2);
          FUN_0040fcf0((DAT_006a85a4 / 9 | 0));
        }
        break;
      case 0xd0 :
      }
    }
    else {
      iVar2 = FUN_004f74eb(iVar1);
      if ((-1 < iVar2)) {
        wv(DAT_006a6788, iVar2);
        wv(DAT_006a85a0, iVar2);
        FUN_004f7454(iVar2);
        FUN_0040fcf0((DAT_006a85a4 / 9 | 0));
      }
    }
  }
  return;
}


 export function FUN_004f7a30 ()

 {
  let iVar1;
  let local_c;
  let local_8;

  if ((iVar1 < DAT_006a819c)) {
    wv(DAT_006a6788, iVar1);
    wv(DAT_006a85a0, iVar1);
    FUN_004f6646();
  }
  return;
}


 export function FUN_004f7ac7 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0040bbb0();
  /* switch */ () {
  case 1 :
  case 8 :
    FUN_0040bc10(0x29f);
    break;
  case 2 :
    FUN_0040bc10(0x2a0);
    break;
  case 3 :
    FUN_0040bc10(0x2a1);
    break;
  case 4 :
    FUN_0040bc10(0x2a2);
    break;
  case 5 :
    FUN_0040bc10(0x2a3);
    break;
  case 6 :
    FUN_0040bc10(0x2a4);
    break;
  case 7 :
    FUN_0040bc10(0x2a5);
    break;
  default :
    FUN_0040bbe0(s_This_Should_not_Happen....._0062f078);
  }
  FUN_005f22d0((in_ECX + 0x618), DAT_00679640);
  return;
}


 export function FUN_004f7bd1 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x114), 0, 0);
  w32((in_ECX + 0x11c), 0, 0);
  w32((in_ECX + 0x120), 0, 0);
  w32((in_ECX + 0x118), 0, param_1);
  w32((in_ECX + 0x128), 0, 0);
  wv(DAT_0062f010, -1);
  wv(DAT_0062f00c, 0);
  FUN_004f7ac7(param_1);
  FUN_00451bf0();
  w32((in_ECX + 0x118), 0, param_1);
  FUN_005bb574();
  if ((param_2 !== 0)) {
    FUN_004085f0();
  }
  FUN_0040f350(0);
  FUN_004518d0();
  FUN_004f8af9();
  return;
}


 export function FUN_004f7c99 (in_ECX)

 {
  let bVar1;
  let iVar2;
  let pcVar3;
  let sVar4;
  let pvVar5;
  let uVar6;
  // in_ECX promoted to parameter;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_e;
  let local_c;
  let local_8;

  for (/* cond: (local_18 < 0x64) */); local_18 = (local_18 < 0x64); local_18 = (local_18 + 1)) {
    w32(((in_ECX + 0x65c) + local_18 * 4), 0, -1);
  }
  for (/* cond: (local_18 < 0x27) */); local_18 = (local_18 < 0x27); local_18 = (local_18 + 1)) {
    w32(((in_ECX + 0x980) + local_18 * 4), 0, -1);
  }
  for (/* cond: (local_18 < 0x1c) */); local_18 = (local_18 < 0x1c); local_18 = (local_18 + 1)) {
    w32(((in_ECX + 0xabc) + local_18 * 4), 0, -1);
  }
  for (/* cond: (local_18 < 0x3e) */); local_18 = (local_18 < 0x3e); local_18 = (local_18 + 1)) {
    w32(((in_ECX + 0xba0) + local_18 * 4), 0, -1);
  }
  for (/* cond: (local_18 < 7) */); local_18 = (local_18 < 7); local_18 = (local_18 + 1)) {
    w32(((in_ECX + 0xd94) + local_18 * 4), 0, -1);
  }
  for (/* cond: (local_18 < 0x21) */); local_18 = (local_18 < 0x21); local_18 = (local_18 + 1)) {
    w32(((in_ECX + 0xdd0) + local_18 * 4), 0, -1);
  }
  for (/* cond: (local_18 < 0x100) */); local_18 = (local_18 < 0x100); local_18 = (local_18 + 1)) {
    w32(((in_ECX + 0xedc) + local_18 * 4), 0, -1);
  }
  FUN_004f4809();
  iVar2 = FUN_004a2379(s_Describe_0062f094, s_@ADVANCE_INDEX_0062f0a0);
  if ((iVar2 === 0)) {
    FUN_004a23fc(1);
    local_14 = FUN_004a2534();
    w32((in_ECX + 0x658), 0, 0);
    local_1c = 0;
    while ((local_14 !== -2)) {
      if ((_MEM[DAT_00627689 + local_1c * 0x10] !== 0)) {
        w32(((in_ECX + 0x65c) + s32((in_ECX + 0x658), 0) * 4), 0, local_14);
        w32(((in_ECX + 0x7ec) + s32((in_ECX + 0x658), 0) * 4), 0, local_1c);
        local_c = operator_new(0xc);
        w32(local_c, 1, s32((in_ECX + 0x658), 0));
        if ((s32((in_ECX + 0x16dc), 0) === 0)) {
          w32((in_ECX + 0x16dc), 0, local_c);
        }
        else {
          w32(local_8, 2, local_c);
        }
        w32(local_c, 2, 0);
        pcVar3 = FUN_00428b0c(s32((DAT_00627684 + local_1c * 0x10), 0));
        sVar4 = _strlen(pcVar3);
        pvVar5 = operator_new((sVar4 + 1));
        w32(local_c, 0, pvVar5);
        uVar6 = FUN_00428b0c(s32((DAT_00627684 + local_1c * 0x10), 0));
        FUN_005f22d0(s32(local_c, 0), uVar6);
        local_8 = local_c;
        w32((in_ECX + 0x658), 0, (s32((in_ECX + 0x658), 0) + 1));
      }
      local_1c = (local_1c + 1);
      FUN_004a23fc(1);
      local_14 = FUN_004a2534();
    }
    FUN_004a2020();
    if ((s32((in_ECX + 0x16dc), 0) !== 0)) {
      FUN_004f896a(s32((in_ECX + 0x16dc), 0), (in_ECX + 0x65c), (in_ECX + 0x7ec), s32((in_ECX + 0x658), 0));
    }
  }
  iVar2 = FUN_004a2379(s_Describe_0062f094, s_@IMPROVEMENT_INDEX_0062f0b0);
  if ((iVar2 === 0)) {
    FUN_004a23fc(1);
    FUN_004a23fc(1);
    local_14 = FUN_004a2534();
    w32((in_ECX + 0x97c), 0, 0);
    local_1c = 1;
    while ((local_14 !== -2)) {
      if ((0xfe < _MEM[DAT_0064c48e + local_1c * 8])) {
        w32(((in_ECX + 0x980) + s32((in_ECX + 0x97c), 0) * 4), 0, local_14);
        w32(((in_ECX + 0xa1c) + s32((in_ECX + 0x97c), 0) * 4), 0, local_1c);
        local_c = operator_new(0xc);
        w32(local_c, 1, s32((in_ECX + 0x97c), 0));
        if ((s32((in_ECX + 0x16e0), 0) === 0)) {
          w32((in_ECX + 0x16e0), 0, local_c);
        }
        else {
          w32(local_8, 2, local_c);
        }
        w32(local_c, 2, 0);
        pcVar3 = FUN_00428b0c(s32((DAT_0064c488 + local_1c * 8), 0));
        sVar4 = _strlen(pcVar3);
        pvVar5 = operator_new((sVar4 + 1));
        w32(local_c, 0, pvVar5);
        uVar6 = FUN_00428b0c(s32((DAT_0064c488 + local_1c * 8), 0));
        FUN_005f22d0(s32(local_c, 0), uVar6);
        local_8 = local_c;
        w32((in_ECX + 0x97c), 0, (s32((in_ECX + 0x97c), 0) + 1));
      }
      local_1c = (local_1c + 1);
      FUN_004a23fc(1);
      local_14 = FUN_004a2534();
    }
    FUN_004a2020();
    if ((s32((in_ECX + 0x16e0), 0) !== 0)) {
      FUN_004f896a(s32((in_ECX + 0x16e0), 0), (in_ECX + 0x980), (in_ECX + 0xa1c), s32((in_ECX + 0x97c), 0));
    }
  }
  iVar2 = FUN_004a2379(s_Describe_0062f094, s_@WONDER_INDEX_0062f0c4);
  if ((iVar2 === 0)) {
    FUN_004a23fc(1);
    local_14 = FUN_004a2534();
    w32((in_ECX + 0xab8), 0, 0);
    local_1c = 0x27;
    while ((local_14 !== -2)) {
      if ((0xfe < _MEM[DAT_0064c48e + local_1c * 8])) {
        w32(((in_ECX + 0xabc) + s32((in_ECX + 0xab8), 0) * 4), 0, local_14);
        w32(((in_ECX + 0xb2c) + s32((in_ECX + 0xab8), 0) * 4), 0, local_1c);
        local_c = operator_new(0xc);
        w32(local_c, 1, s32((in_ECX + 0xab8), 0));
        if ((s32((in_ECX + 0x16e4), 0) === 0)) {
          w32((in_ECX + 0x16e4), 0, local_c);
        }
        else {
          w32(local_8, 2, local_c);
        }
        w32(local_c, 2, 0);
        pcVar3 = FUN_00428b0c(s32((DAT_0064c488 + local_1c * 8), 0));
        sVar4 = _strlen(pcVar3);
        pvVar5 = operator_new((sVar4 + 1));
        w32(local_c, 0, pvVar5);
        uVar6 = FUN_00428b0c(s32((DAT_0064c488 + local_1c * 8), 0));
        FUN_005f22d0(s32(local_c, 0), uVar6);
        local_8 = local_c;
        w32((in_ECX + 0xab8), 0, (s32((in_ECX + 0xab8), 0) + 1));
      }
      local_1c = (local_1c + 1);
      FUN_004a23fc(1);
      local_14 = FUN_004a2534();
    }
    FUN_004a2020();
    if ((s32((in_ECX + 0x16e4), 0) !== 0)) {
      FUN_004f896a(s32((in_ECX + 0x16e4), 0), (in_ECX + 0xabc), (in_ECX + 0xb2c), s32((in_ECX + 0xab8), 0));
    }
  }
  iVar2 = FUN_004a2379(s_Describe_0062f094, s_@UNIT_INDEX_0062f0d4);
  if ((iVar2 === 0)) {
    FUN_004a23fc(1);
    local_14 = FUN_004a2534();
    w32((in_ECX + 0xb9c), 0, 0);
    local_1c = 0;
    while ((local_14 !== -2)) {
      if ((0xfe < _MEM[DAT_0064b1cb + local_1c * 0x14])) {
        w32(((in_ECX + 0xba0) + s32((in_ECX + 0xb9c), 0) * 4), 0, local_14);
        w32(((in_ECX + 0xc98) + s32((in_ECX + 0xb9c), 0) * 4), 0, local_1c);
        local_c = operator_new(0xc);
        w32(local_c, 1, s32((in_ECX + 0xb9c), 0));
        if ((s32((in_ECX + 0x16e8), 0) === 0)) {
          w32((in_ECX + 0x16e8), 0, local_c);
        }
        else {
          w32(local_8, 2, local_c);
        }
        w32(local_c, 2, 0);
        pcVar3 = FUN_00428b0c(s32((DAT_0064b1b8 + local_1c * 0x14), 0));
        sVar4 = _strlen(pcVar3);
        pvVar5 = operator_new((sVar4 + 1));
        w32(local_c, 0, pvVar5);
        uVar6 = FUN_00428b0c(s32((DAT_0064b1b8 + local_1c * 0x14), 0));
        FUN_005f22d0(s32(local_c, 0), uVar6);
        local_8 = local_c;
        w32((in_ECX + 0xb9c), 0, (s32((in_ECX + 0xb9c), 0) + 1));
      }
      local_1c = (local_1c + 1);
      FUN_004a23fc(1);
      local_14 = FUN_004a2534();
    }
    FUN_004a2020();
    if ((s32((in_ECX + 0x16e8), 0) !== 0)) {
      FUN_004f896a(s32((in_ECX + 0x16e8), 0), (in_ECX + 0xba0), (in_ECX + 0xc98), s32((in_ECX + 0xb9c), 0));
    }
  }
  iVar2 = FUN_004a2379(s_Describe_0062f094, s_@GOVERNMENT_INDEX_0062f0e0);
  if ((iVar2 === 0)) {
    FUN_004a23fc(1);
    local_14 = FUN_004a2534();
    w32((in_ECX + 0xd90), 0, 0);
    local_1c = 0;
    while ((local_14 !== -2)) {
      w32(((in_ECX + 0xd94) + s32((in_ECX + 0xd90), 0) * 4), 0, local_14);
      w32(((in_ECX + 0xdb0) + s32((in_ECX + 0xd90), 0) * 4), 0, local_1c);
      local_c = operator_new(0xc);
      w32(local_c, 1, s32((in_ECX + 0xd90), 0));
      if ((s32((in_ECX + 0x16ec), 0) === 0)) {
        w32((in_ECX + 0x16ec), 0, local_c);
      }
      else {
        w32(local_8, 2, local_c);
      }
      w32(local_c, 2, 0);
      pcVar3 = FUN_00428b0c(s32((DAT_0064b9a0 + local_1c * 4), 0));
      sVar4 = _strlen(pcVar3);
      pvVar5 = operator_new((sVar4 + 1));
      w32(local_c, 0, pvVar5);
      uVar6 = FUN_00428b0c(s32((DAT_0064b9a0 + local_1c * 4), 0));
      FUN_005f22d0(s32(local_c, 0), uVar6);
      local_8 = local_c;
      w32((in_ECX + 0xd90), 0, (s32((in_ECX + 0xd90), 0) + 1));
      local_1c = (local_1c + 1);
      FUN_004a23fc(1);
      local_14 = FUN_004a2534();
    }
    FUN_004a2020();
    if ((s32((in_ECX + 0x16ec), 0) !== 0)) {
      FUN_004f896a(s32((in_ECX + 0x16ec), 0), (in_ECX + 0xd94), (in_ECX + 0xdb0), s32((in_ECX + 0xd90), 0));
    }
  }
  iVar2 = FUN_004a2379(s_Describe_0062f094, s_@TERRAIN_INDEX_0062f0f4);
  if ((iVar2 === 0)) {
    FUN_004a23fc(1);
    local_14 = FUN_004a2534();
    w32((in_ECX + 0xdcc), 0, 0);
    local_1c = 0;
    while ((local_14 !== -2)) {
      if ((local_1c !== 0x18)) {
        w32(((in_ECX + 0xdd0) + s32((in_ECX + 0xdcc), 0) * 4), 0, local_14);
        w32(((in_ECX + 0xe54) + s32((in_ECX + 0xdcc), 0) * 4), 0, local_1c);
        local_c = operator_new(0xc);
        w32(local_c, 1, s32((in_ECX + 0xdcc), 0));
        if ((s32((in_ECX + 0x16f0), 0) === 0)) {
          w32((in_ECX + 0x16f0), 0, local_c);
        }
        else {
          w32(local_8, 2, local_c);
        }
        w32(local_c, 2, 0);
        FUN_0040bbb0();
        uVar6 = FUN_00428b0c(s32((DAT_00627cc4 + local_1c * 0x18), 0));
        FUN_0040bbe0(uVar6);
        if ((iVar2 === 0)) {
          FUN_0040fe10();
          uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0xb00), 0));
          FUN_005f22e0(DAT_00679640, uVar6);
        }
        sVar4 = _strlen(DAT_00679640);
        pvVar5 = operator_new((sVar4 + 1));
        w32(local_c, 0, pvVar5);
        FUN_005f22d0(s32(local_c, 0), DAT_00679640);
        local_8 = local_c;
        w32((in_ECX + 0xdcc), 0, (s32((in_ECX + 0xdcc), 0) + 1));
      }
      local_1c = (local_1c + 1);
      FUN_004a23fc(1);
      local_14 = FUN_004a2534();
    }
    FUN_004a2020();
    if ((s32((in_ECX + 0x16f0), 0) !== 0)) {
      FUN_004f896a(s32((in_ECX + 0x16f0), 0), (in_ECX + 0xdd0), (in_ECX + 0xe54), s32((in_ECX + 0xdcc), 0));
    }
  }
  iVar2 = FUN_004a2379(s_Describe_0062f094, s_CONCEPT_DESCRIPTIONS_0062f108);
  if ((iVar2 === 0)) {
    bVar1 = 1;
    w32((in_ECX + 0xed8), 0, 0);
    local_e = 0;
    local_1c = 0;
    while (bVar1) {
      FUN_004a23fc(1);
      _strncpy(DAT_fffffff0, DAT_00679640, 2);
      iVar2 = _strcmp(DAT_fffffff0, DAT_0062f120);
      if ((iVar2 === 0)) {
        w32(((in_ECX + 0xedc) + s32((in_ECX + 0xed8), 0) * 4), 0, s32((in_ECX + 0xed8), 0));
        w32(((in_ECX + 0x12dc) + s32((in_ECX + 0xed8), 0) * 4), 0, local_1c);
        local_c = operator_new(0xc);
        w32(local_c, 1, s32((in_ECX + 0xed8), 0));
        if ((s32((in_ECX + 0x16f4), 0) === 0)) {
          w32((in_ECX + 0x16f4), 0, local_c);
        }
        else {
          w32(local_8, 2, local_c);
        }
        w32(local_c, 2, 0);
        sVar4 = _strlen(DAT_00679642);
        pvVar5 = operator_new((sVar4 + 1));
        w32(local_c, 0, pvVar5);
        FUN_005f22d0(s32(local_c, 0), DAT_00679642);
        local_8 = local_c;
        local_1c = (local_1c + 1);
        w32((in_ECX + 0xed8), 0, (s32((in_ECX + 0xed8), 0) + 1));
      }
      else if ((UNNAMED === 0x40)) {
        bVar1 = 0;
      }
    }
    if ((s32((in_ECX + 0x16f4), 0) !== 0)) {
      FUN_004f896a(s32((in_ECX + 0x16f4), 0), (in_ECX + 0xedc), (in_ECX + 0x12dc), s32((in_ECX + 0xed8), 0));
    }
  }
  return;
}


 export function FUN_004f896a (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  local_c = param_1;
  local_8 = param_1;
  for (/* cond: (local_14 < (param_4 + -1)) */); local_14 = (local_14 < (param_4 + -1)); local_14 = (local_14 + 1)) {
    local_18 = local_14;
    if ((s32(local_8, 2) !== 0)) {
      local_c = s32(local_8, 2);
    }
    while ((local_18 < param_4)) {
      iVar2 = _strcmp(s32(local_8, 0), s32(local_c, 0));
      if ((0 < iVar2)) {
        uVar1 = s32((param_2 + local_14 * 4), 0);
        w32((param_2 + local_14 * 4), 0, s32((param_2 + local_18 * 4), 0));
        w32((param_2 + local_18 * 4), 0, uVar1);
        uVar1 = s32((param_3 + local_14 * 4), 0);
        w32((param_3 + local_14 * 4), 0, s32((param_3 + local_18 * 4), 0));
        w32((param_3 + local_18 * 4), 0, uVar1);
        uVar1 = s32(local_8, 0);
        w32(local_8, 0, s32(local_c, 0));
        w32(local_c, 0, uVar1);
      }
      if ((s32(local_c, 2) !== 0)) {
        local_c = s32(local_c, 2);
      }
    }
    if ((s32(local_8, 2) !== 0)) {
      local_8 = s32(local_8, 2);
    }
  }
  return;
}


 export function FUN_004f8a9b (param_1, param_2)

 {
  let puVar1;
  let local_8;

  for (/* cond: (s32(local_8, 1) !== param_2) */); (local_8 = (local_8 !== 0) && (local_8 = (local_8 + 1)));
      local_8 = s32(local_8, 2)) {
  }
  puVar1 = PTR_DAT_0062f008;
  if ((local_8 !== 0)) {
    puVar1 = s32(local_8, 0);
  }
  return puVar1;
}


 export function FUN_004f8af9 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((DAT_0062f00c === 0)) {
    if ((s32((in_ECX + 0x118), 0) === 8)) {
      if ((s32(((in_ECX + 0x128) + DAT_006a6790 * 4), 0) !== s32((in_ECX + 0x120), 0))) {
        if ((-1 < DAT_0062f010)) {
          w32(((in_ECX + 0x12c) + s32((in_ECX + 0x128), 0) * 4), 0, DAT_0062f010);
          w32(((in_ECX + 0x2bc) + s32((in_ECX + 0x128), 0) * 4), 0, DAT_006a85b0);
          w32(((in_ECX + 0x44c) + s32((in_ECX + 0x128), 0) * 4), 0, DAT_006a85ac);
          w32((in_ECX + 0x128), 0, (s32((in_ECX + 0x128), 0) + 1));
        }
        w32(((in_ECX + 0x12c) + s32((in_ECX + 0x128), 0) * 4), 0, s32((in_ECX + 0x120), 0));
        w32(((in_ECX + 0x2bc) + s32((in_ECX + 0x128), 0) * 4), 0, s32((in_ECX + 0x11c), 0));
        w32(((in_ECX + 0x44c) + s32((in_ECX + 0x128), 0) * 4), 0, s32((in_ECX + 0x118), 0));
        w32((in_ECX + 0x128), 0, (s32((in_ECX + 0x128), 0) + 1));
      }
    }
    else {
      w32(((in_ECX + 0x128) + s32((in_ECX + 0x128), 0) * 4), 0, s32((in_ECX + 0x120), 0));
    }
  }
  wv(DAT_0062f010, -1);
  wv(DAT_0062f00c, 0);
  return;
}


 export function FUN_004f8d04 ()

 {
  FUN_0047e94e(1, 0);
  if ((DAT_006a677c === 1)) {
    wv(DAT_006a66b0, DAT_006a66b0);
    wv(DAT_006a678c, 0);
  }
  return;
}


 export function FUN_004f8d51 ()

 {
  wv(DAT_006a66b0, DAT_006a66b0);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CControlBarInfo::`scalar */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* virtual */  /* void */  /* * */  /* __thiscall */  /* __non_rtti_object::`scalar */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* virtual */  /* void */  /* * */  /* __thiscall */  /* bad_cast::`scalar */  /* deleting */  /* destructor'(unsigned */
 /* int) */     /* public: */  /* virtual */  /* void */  /* * */  /* __thiscall */  /* bad_typeid::`scalar */  /* deleting */  /* destructor'(unsigned */
 /* int) */      /* 9 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:`scalar_deleting_destructor' (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  in_ECX = ~CControlBarInfo(in_ECX);
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* __thiscall */
 /* CControlBarInfo::~CControlBarInfo(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~CControlBarInfo (this)

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004fa18a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = -1;
  FUN_004fa17e();
  FUN_004fa194();
  return;
}


 export function FUN_004fa17e ()

 {
  FUN_00452a67();
  return;
}


 export function FUN_004fa194 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
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
  FUN_004fa1da();
  FUN_004fa1f4();
  return;
}


 export function FUN_004fa1da ()

 {
  FUN_005c64da();
  return;
}


 export function FUN_004fa1f4 ()

 {
  _atexit(FUN_004fa211);
  return;
}


 export function FUN_004fa211 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_004fa250 (param_1)

 {
  let iVar1;
  let _Str2;
  let local_8;

  iVar1 = __strcmpi(param_1, s_ANYBODY_0062f1f4);
  if ((iVar1 === 0)) {
    iVar1 = -2;
  }
  else {
    iVar1 = __strcmpi(param_1, s_TRIGGERATTACKER_0062f1fc);
    if ((iVar1 === 0)) {
      iVar1 = -3;
    }
    else {
      iVar1 = __strcmpi(param_1, s_TRIGGERDEFENDER_0062f20c);
      if ((iVar1 === 0)) {
        iVar1 = -4;
      }
      else {
        iVar1 = __strcmpi(param_1, s_TRIGGERRECEIVER_0062f21c);
        if ((iVar1 === 0)) {
          iVar1 = -4;
        }
        else {
          for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
            _Str2 = FUN_00493c7d(local_8);
            iVar1 = __strcmpi(param_1, _Str2);
            if ((iVar1 === 0)) {
              return local_8;
            }
          }
          if ((DAT_0062f160 !== 0)) {
            _printf(s_Could_not_find_%s,_check_spellin_0062f22c, param_1);
          }
          iVar1 = -1;
        }
      }
    }
  }
  return iVar1;
}


 export function FUN_004fa359 (param_1)

 {
  let iVar1;
  let _Str2;
  let local_8;

  iVar1 = __strcmpi(param_1, s_ANYUNIT_0062f250);
  if ((iVar1 === 0)) {
    iVar1 = -2;
  }
  else {
    for (/* cond: (local_8 < 0x3e) */); local_8 = (local_8 < 0x3e); local_8 = (local_8 + 1)) {
      _Str2 = FUN_00428b0c(s32((DAT_0064b1b8 + local_8 * 0x14), 0));
      iVar1 = __strcmpi(param_1, _Str2);
      if ((iVar1 === 0)) {
        return local_8;
      }
    }
    if ((DAT_0062f160 !== 0)) {
      _printf(s_Could_not_find_unit_%s,_check_sp_0062f258, param_1);
    }
    iVar1 = -1;
  }
  return iVar1;
}


 export function FUN_004fa403 (param_1)

 {
  let iVar1;
  let local_8;

  local_8 = 0;
  while ((iVar1 === 0)) {
    if ((0xa < local_8)) {
      if ((DAT_0062f160 !== 0)) {
        _printf(s_Could_not_find_terraintype_%s,_c_0062f280, param_1);
      }
      return -1;
    }
    iVar1 = __strcmpi(param_1, s32(PTR_s_DESERT_0062f168, local_8));
    if ((iVar1 === 0));
  }
  return local_8;
}


 export function FUN_004fa47e (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_004980ec((in_ECX + 0x2f4));
  FUN_00497ea0((in_ECX + 0x2f4), 0xc, param_1);
  return;
}


 export function FUN_004fa4be (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004fa54e;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_00428cb0();
  _MEM[(in_ECX + 0x2f5)] = 0;
  w32((in_ECX + 0x30c), 0, 0);
  w32((in_ECX + 0x308), 0, 0);
  FUN_004fa5d9(param_1);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004fa569 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004fa5c1;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  FUN_004980ec((in_ECX + 0x2f4));
  local_8 = -1;
  FUN_004fa5b8();
  FUN_004fa5cb();
  return;
}


 export function FUN_004fa5b8 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004fa5cb (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004fa5d9 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x30c), 0, 0);
  w32((in_ECX + 0x308), 0, 0);
  FUN_004fa47e(param_1);
  return;
}


 export function FUN_004fa617 (in_ECX)

 {
  let _Dst;
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = s32((in_ECX + 0x30c), 0);
  if ((local_8 !== 0)) {
    for (/* cond: (s32((local_8 + 0x1bc), 0) !== 0) */); local_8 = (local_8 + 0x1bc); local_8 = s32((local_8 + 0x1bc), 0)) {
    }
  }
  _Dst = FUN_00498159((in_ECX + 0x2f4), 0x1c4);
  if ((_Dst === 0)) {
    _Dst = 0;
  }
  else {
    _memset(_Dst, 0, 0x1c4);
    if ((local_8 === 0)) {
      w32((in_ECX + 0x30c), 0, _Dst);
      w32((_Dst + 0x1bc), 0, 0);
      w32((_Dst + 0x1c0), 0, 0);
    }
    else {
      w32((local_8 + 0x1bc), 0, _Dst);
      w32((_Dst + 0x1c0), 0, local_8);
      w32((_Dst + 0x1bc), 0, 0);
    }
    w32((in_ECX + 0x308), 0, (s32((in_ECX + 0x308), 0) + 1));
  }
  return _Dst;
}


 export function FUN_004fa707 (param_1)

 {
  let uVar1;
  let iVar2;
  let local_f4;

  if (((DAT_00655aea & 0x10) === 0)) {
    uVar1 = 0;
  }
  else {
    if ((s32((param_1 + 0x184), 0) !== 0)) {
      FUN_005f22d0(DAT_ffffff0c, DAT_0064bb08);
      FUN_005f22e0(DAT_ffffff0c, s_\SOUND\_0062f2b0);
      FUN_005f22e0(DAT_ffffff0c, s32((param_1 + 0x184), 0));
      iVar2 = FUN_00415133(DAT_ffffff0c);
      if ((iVar2 === 0)) {
        FUN_005f22d0(DAT_ffffff0c, DAT_00655020);
        FUN_005f22e0(DAT_ffffff0c, s_\SOUND\_0062f2b8);
        FUN_005f22e0(DAT_ffffff0c, s32((param_1 + 0x184), 0));
        iVar2 = FUN_00415133(DAT_ffffff0c);
        if ((iVar2 !== 0)) {
          FUN_005d6038(DAT_ffffff0c, 0, 0, 0);
        }
      }
      else {
        FUN_005d6038(DAT_ffffff0c, 0, 0, 0);
      }
    }
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_004fa82d ()

 {
  wv(DAT_006a9110, 1);
  return 1;
}


 export function FUN_004fa854 (param_1)

 {
  let uVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  while ((local_8 < 0xa)) {
    local_8 = (local_8 + 1);
    local_c = FUN_005ddeff();
    if ((local_c === 0xa));
  }
  if ((local_c === 0xc)) {
    if ((local_c < s32((param_1 + 0x188), 0))) {
      uVar1 = 0;
    }
    else {
      FUN_0046e571(s32((param_1 + 0x188), 0), 1);
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_004fa944 (param_1)

 {
  let uVar1;
  let iVar2;
  let local_c;

  if ((s32((param_1 + 0x178), 0) === -3)) {
    local_c = s32((param_1 + 0x18), 0);
  }
  else if ((s32((param_1 + 0x178), 0) === -4)) {
    local_c = s32((param_1 + 0x24), 0);
  }
  else if ((s32((param_1 + 0x178), 0) === -4)) {
    local_c = s32((param_1 + 0x24), 0);
  }
  else {
    local_c = s32((param_1 + 0x178), 0);
  }
  if ((7 < local_c)) {
    uVar1 = 0;
  }
  else if ((((1 << (((local_c) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
    uVar1 = 0;
  }
  else {
    iVar2 = (s32((param_1 + 0x17c), 0) + s32((DAT_0064c6a2 + local_c * 0x594), 0));
    if ((0x7530 < iVar2)) {
      if ((s32((param_1 + 0x17c), 0) < 0)) {
        w32((DAT_0064c6a2 + local_c * 0x594), 0, 0);
      }
      else {
        w32((DAT_0064c6a2 + local_c * 0x594), 0, 0x7530);
      }
    }
    else {
      w32((DAT_0064c6a2 + local_c * 0x594), 0, iVar2);
    }
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_004faab0 (param_1)

 {
  let local_c;
  let local_8;

  local_8 = 0;
  FUN_00421dd0();
  for (/* cond: (local_c < 0x14) */); local_c = (local_c < 0x14); local_c = (local_c + 1)) {
    if ((s32(((param_1 + 0x38) + local_c * 4), 0) !== 0)) {
      FUN_0059e18b(s32(((param_1 + 0x38) + local_c * 4), 0), -1, -1, -1, 0);
      if ((2 < DAT_00655b02)) {
        FUN_005f22d0((DAT_0063cc48 + local_8 * 0x104), s32(((param_1 + 0x38) + local_c * 4), 0));
        local_8 = (local_8 + 1);
      }
    }
  }
  if ((DAT_00654fa8 === 0)) {
    if ((2 < DAT_00655b02)) {
      FUN_00511880(0x4f, 0xff, local_8, 0, 0, 0);
    }
    FUN_0040bc80(0);
  }
  return 1;
}


 export function FUN_004faba6 (param_1)

 {
  let uVar1;
  let local_c;
  let local_8;

  if ((s32((param_1 + 0xd0), 0) === -3)) {
    local_c = s32((param_1 + 0x18), 0);
  }
  else if ((s32((param_1 + 0xd0), 0) === -4)) {
    local_c = s32((param_1 + 0x24), 0);
  }
  else if ((s32((param_1 + 0xd0), 0) === -4)) {
    local_c = s32((param_1 + 0x24), 0);
  }
  else {
    local_c = s32((param_1 + 0xd0), 0);
  }
  if ((s32((param_1 + 0xc8), 0) === -3)) {
    local_8 = s32((param_1 + 0x18), 0);
  }
  else if ((s32((param_1 + 0xc8), 0) === -4)) {
    local_8 = s32((param_1 + 0x24), 0);
  }
  else if ((s32((param_1 + 0xc8), 0) === -4)) {
    local_8 = s32((param_1 + 0x24), 0);
  }
  else {
    local_8 = s32((param_1 + 0xc8), 0);
  }
  if ((((1 << (((local_8) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
    uVar1 = 0;
  }
  else if ((((1 << (((local_c) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
    uVar1 = 0;
  }
  else {
    uVar1 = FUN_00579c40(local_c, local_8);
  }
  return uVar1;
}


 export function FUN_004fad02 (param_1)

 {
  let uVar1;
  let local_8;

  if ((s32((param_1 + 0x1b0), 0) === -3)) {
    local_8 = s32((param_1 + 0x18), 0);
  }
  else if ((s32((param_1 + 0x1b0), 0) === -4)) {
    local_8 = s32((param_1 + 0x24), 0);
  }
  else if ((s32((param_1 + 0x1b0), 0) === -4)) {
    local_8 = s32((param_1 + 0x24), 0);
  }
  else {
    local_8 = s32((param_1 + 0x1b0), 0);
  }
  if ((((1 << (((local_8) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
    uVar1 = 0;
  }
  else {
    if ((DAT_006d1da0 === local_8)) {
      wv(DAT_0064b1ac, 4);
    }
    FUN_004e1763(local_8, 1, 1);
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_004fadfb (param_1)

 {
  let uVar1;
  let local_8;

  if ((s32((param_1 + 0x1b8), 0) === -3)) {
    local_8 = s32((param_1 + 0x18), 0);
  }
  else if ((s32((param_1 + 0x1b8), 0) === -4)) {
    local_8 = s32((param_1 + 0x24), 0);
  }
  else if ((s32((param_1 + 0x1b8), 0) === -4)) {
    local_8 = s32((param_1 + 0x24), 0);
  }
  else {
    local_8 = s32((param_1 + 0x1b8), 0);
  }
  if ((((1 << (((local_8) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
    uVar1 = 0;
  }
  else {
    FUN_004bf05b(local_8, s32((param_1 + 0x1b4), 0), 0, 0, 0);
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_004faed4 (param_1)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  local_14 = 0x2710;
  local_18 = 0x2710;
  if ((s32((param_1 + 0xd8), 0) === -3)) {
    local_c = s32((param_1 + 0x18), 0);
  }
  else if ((s32((param_1 + 0xd8), 0) === -4)) {
    local_c = s32((param_1 + 0x24), 0);
  }
  else if ((s32((param_1 + 0xd8), 0) === -4)) {
    local_c = s32((param_1 + 0x24), 0);
  }
  else {
    local_c = s32((param_1 + 0xd8), 0);
  }
  if ((((1 << (((local_c) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
    uVar1 = 0;
  }
  else {
    for (/* cond: (local_1c < s32((param_1 + 0x134), 0)) */); iVar4 = local_18, iVar3 = local_14, local_1c = (local_1c < s32((param_1 + 0x134), 0));
        local_1c = (local_1c + 1)) {
      iVar3 = s32(((param_1 + 0xe4) + local_1c * 8), 0);
      iVar4 = s32(((param_1 + 0xe8) + local_1c * 8), 0);
      iVar2 = FUN_004087c0(iVar3, iVar4);
      if ((iVar2 !== 0)) {
        if ((_MEM[DAT_0064b1c1 + s32((param_1 + 0xe0), 0) * 0x14] === 2)) {
          iVar2 = FUN_005b89e4(iVar3, iVar4);
          if ((iVar2 !== 0));
          if (((_MEM[DAT_0064f344 + iVar2 * 0x58] & 0x80) !== 0)) {
            iVar2 = FUN_005b8ca6(iVar3, iVar4);
 joined_r0x004fb11d: :
            if ((iVar2 === local_c)) {
          iVar2 = FUN_005b89e4(iVar3, iVar4);
          if ((iVar2 === local_c)) {
            iVar2 = FUN_005b8d62(iVar3, iVar4);
            if ((iVar2 !== -1)) {
              iVar2 = FUN_005b8d62(iVar3, iVar4);
              goto joined_r0x004fb11d;
            }
            break;
          }
        }
      }
    }
    local_14 = iVar3;
    local_18 = iVar4;
    if ((local_18 === 0x2710)) {
      uVar1 = 0;
    }
    else {
      iVar3 = FUN_005b3d06(s32((param_1 + 0xe0), 0), local_c, local_14, local_18);
      if ((iVar3 === -1)) {
        uVar1 = 0;
      }
      else {
        if ((s32((param_1 + 0x138), 0) !== 0)) {
          w16((DAT_006560f4 + iVar3 * 0x20), 0, (s16((DAT_006560f4 + iVar3 * 0x20), 0) | 0x2000));
        }
        _MEM[DAT_00656100 + iVar3 * 0x20] = 0xff;
        if ((s32((param_1 + 0x13c), 0) !== 0)) {
          for (/* cond: (local_8 < ((DAT_00655b18) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_00655b18) << 16 >> 16)); local_8 = (local_8 + 1)) {
            if ((iVar4 === 0)) {
              if ((s8(_MEM[DAT_0064f348 + local_8 * 0x58]) === local_c)) {
                _MEM[DAT_00656100 + iVar3 * 0x20] = ((local_8) & 0xFF);
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


 export function FUN_004fb29f (param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let local_3c;
  let local_38;
  let local_34;
  let local_28;
  let local_24;
  let local_14;

  if ((s32((param_1 + 0x8c), 0) === -3)) {
    local_28 = s32((param_1 + 0x18), 0);
  }
  else if ((s32((param_1 + 0x8c), 0) === -4)) {
    local_28 = s32((param_1 + 0x24), 0);
  }
  else if ((s32((param_1 + 0x8c), 0) === -4)) {
    local_28 = s32((param_1 + 0x24), 0);
  }
  else {
    local_28 = s32((param_1 + 0x8c), 0);
  }
  if ((((1 << (((local_28) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
    local_38 = 0;
  }
  else if ((((1 << (((local_28) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    for (/* cond: (local_34 < 4) */); local_34 = (local_34 < 4); local_34 = (local_34 + 1)) {
      w32(DAT_ffffffec, local_34, s32(((param_1 + 0x9c) + local_34 * 8), 0));
      w32(DAT_ffffffdc, local_34, s32(((param_1 + 0xa0) + local_34 * 8), 0));
    }
    local_38 = 0;
    local_3c = ((DAT_00655b16) << 16 >> 16);
    do {
      do {
        do {
          local_3c = (local_3c + -1);
          if ((local_3c < 0)) {
            return local_38;
          }
        } while ((_MEM[DAT_006560ff + local_3c * 0x20] === 3));
        iVar1 = ((s16((DAT_006560f0 + local_3c * 0x20), 0)) << 16 >> 16);
        iVar2 = ((s16((DAT_006560f2 + local_3c * 0x20), 0)) << 16 >> 16);
        iVar3 = FUN_004087c0(iVar1, iVar2);
      } while ((UNNAMED < iVar2));
      _MEM[DAT_006560ff + local_3c * 0x20] = 0xb;
      _MEM[DAT_006560fc + local_3c * 0x20] = 0x37;
      w16((DAT_00656102 + local_3c * 0x20), 0, ((s32((param_1 + 0xbc), 0)) & 0xFFFF));
      w16((DAT_00656104 + local_3c * 0x20), 0, ((s32((param_1 + 0xc0), 0)) & 0xFFFF));
      local_38 = (local_38 + 1);
    } while ((s32((param_1 + 0x98), 0) === -2));
  }
  else {
    local_38 = 0;
  }
  return local_38;
}


 export function FUN_004fb5b2 (param_1)

 {
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
  let local_24;
  let local_14;

  local_34 = 0;
  for (/* cond: (local_3c < 4) */); local_3c = (local_3c < 4); local_3c = (local_3c + 1)) {
    w32(DAT_ffffffec, local_3c, s32(((param_1 + 0x190) + local_3c * 8), 0));
    w32(DAT_ffffffdc, local_3c, s32(((param_1 + 0x194) + local_3c * 8), 0));
  }
  for (/* cond: (local_30 <= UNNAMED) */); local_30 = (local_30 <= UNNAMED); local_30 = (local_30 + 1)) {
    for (/* cond: (local_38 <= UNNAMED) */); local_38 = (local_38 <= UNNAMED); local_38 = (local_38 + 1)) {
      iVar2 = FUN_004087c0(local_30, local_38);
      if ((iVar2 !== 0)) {
        iVar2 = FUN_0043cf76(local_30, local_38);
        if ((-1 < iVar2)) {
          FUN_004413d1(iVar2, 0);
        }
        for (/* cond: (-1 < local_44) */); -1 = (-1 < local_44);
            local_44 = FUN_005b2c82(local_44)) {
          FUN_005b4391(local_44, 1);
        }
      }
    }
  }
  for (/* cond: (local_30 <= UNNAMED) */); local_30 = (local_30 <= UNNAMED); local_30 = (local_30 + 1)) {
    for (/* cond: (local_38 <= UNNAMED) */); local_38 = (local_38 <= UNNAMED); local_38 = (local_38 + 1)) {
      iVar2 = FUN_004087c0(local_30, local_38);
      if ((iVar2 !== 0)) {
        puVar3 = FUN_005b8931(local_30, local_38);
        _MEM[puVar3] = _MEM[(param_1 + 0x18c)];
        iVar2 = FUN_005b8931(local_30, local_38);
        _MEM[(iVar2 + 1)] = 0;
        iVar2 = FUN_005b8931(local_30, local_38);
        _MEM[(iVar2 + 2)] = 0;
        iVar2 = FUN_005b8931(local_30, local_38);
        _MEM[(iVar2 + 3)] = 0;
        for (/* cond: (local_48 < 8) */); local_48 = (local_48 < 8); local_48 = (local_48 + 1)) {
          FUN_005b8b1a(local_30, local_38, local_48);
        }
        FUN_0047cea6(local_30, local_38);
        local_34 = (local_34 + 1);
      }
    }
  }
  for (/* cond: (local_40 < ((DAT_00655b18) << 16 >> 16)) */); local_40 = (local_40 < ((DAT_00655b18) << 16 >> 16)); local_40 = (local_40 + 1)) {
    if ((s32((DAT_0064f394 + local_40 * 0x58), 0) !== 0)) {
      FUN_0043f7a7(local_40);
    }
  }
  for (/* cond: (local_48 < 8) */); local_48 = (local_48 < 8); local_48 = (local_48 + 1)) {
    bVar1 = 0;
    for (/* cond: (local_40 < ((DAT_00655b18) << 16 >> 16)) */); local_40 = (local_40 < ((DAT_00655b18) << 16 >> 16)); local_40 = (local_40 + 1)) {
      if ((s8(_MEM[DAT_0064f348 + local_40 * 0x58]) === local_48)) {
        bVar1 = 1;
      }
    }
    if ((!bVar1)) {
      local_44 = ((DAT_00655b16) << 16 >> 16);
      while ((-1 < local_44)) {
        if ((s8(_MEM[DAT_006560f7 + local_44 * 0x20]) === local_48)) {
          FUN_005b4391(local_44, 1);
        }
      }
      if ((DAT_006d1da0 === local_48)) {
        wv(DAT_0064b1ac, 4);
      }
      for (/* cond: (local_30 < ((DAT_006d1160) << 16 >> 16)) */); local_30 = (local_30 < ((DAT_006d1160) << 16 >> 16)); local_30 = (local_30 + 1)) {
        for (/* cond: (local_38 < ((DAT_006d1162) << 16 >> 16)) */); local_38 = (local_38 < ((DAT_006d1162) << 16 >> 16)); local_38 = (local_38 + 1)) {
          iVar2 = FUN_005b8931(local_30, local_38);
          _MEM[(iVar2 + 4)] = (_MEM[(iVar2 + 4)] & (~(((1 << (((local_48) & 0xFF) & 0x1f))) & 0xFF)));
        }
      }
      FUN_004a7ce9(local_48);
      FUN_0047cf9e(DAT_006d1da0, 1);
    }
  }
  return local_34;
}


 export function FUN_004fba0c (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = s32((in_ECX + 0x30c), 0);
  if ((local_8 === 0)) {
    local_c = 0;
  }
  else {
    do {
      if ((s32(local_8, 0xb) === param_1)) {
        local_c = 1;
        FUN_004fc3ae(local_8);
      }
      local_8 = s32(local_8, 0x6f);
    } while ((local_8 !== 0));
  }
  return local_c;
}


 export function FUN_004fba9c (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = s32((in_ECX + 0x30c), 0);
  if ((local_8 === 0)) {
    local_c = 0;
  }
  else {
    do {
      if (((param_1 % s32(local_8, 0xb)) === 0)) {
        local_c = 1;
        FUN_004fc3ae(local_8);
      }
      local_8 = s32(local_8, 0x6f);
    } while ((local_8 !== 0));
  }
  return local_c;
}


 export function FUN_004fbb2f (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = s32((in_ECX + 0x30c), 0);
  if ((local_8 === 0)) {
    local_c = 0;
  }
  else {
    do {
      if ((s32(local_8, 0) === 0x40)) {
        if ((s32(local_8, 0xc) < 2)) {
          local_10 = 1;
        }
        else {
          iVar1 = _rand();
          local_10 = ((iVar1 % s32(local_8, 0xc)) + 1);
        }
        if ((s32(local_8, 0xc) === local_10)) {
          local_c = 1;
          FUN_004fc3ae(local_8);
        }
      }
      local_8 = s32(local_8, 0x6f);
    } while ((local_8 !== 0));
  }
  return local_c;
}


 export function FUN_004fbbdd (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = s32((in_ECX + 0x30c), 0);
  if ((local_8 === 0)) {
    local_c = 0;
  }
  else {
    do {
      if ((s32(local_8, 0) === 0x100)) {
        if ((s32(local_8, 9) === -2)) {
          for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
            if ((iVar1 !== 0)) {
              w32(local_8, 9, local_10);
              local_c = 1;
              FUN_004fc3ae(local_8);
            }
          }
        }
        else if ((iVar1 !== 0)) {
          local_c = 1;
          FUN_004fc3ae(local_8);
        }
      }
      local_8 = s32(local_8, 0x6f);
    } while ((local_8 !== 0));
  }
  return local_c;
}


 export function FUN_004fbd2b (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = s32((in_ECX + 0x30c), 0);
  if ((local_8 === 0)) {
    local_c = 0;
  }
  else {
    do {
      if ((s32(local_8, 0) === 0x20)) {
        local_c = 1;
        FUN_004fc3ae(local_8);
      }
      local_8 = s32(local_8, 0x6f);
    } while ((local_8 !== 0));
  }
  return local_c;
}


 export function FUN_004fbd9d (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = s32((in_ECX + 0x30c), 0);
  if ((local_8 === 0)) {
    local_c = 0;
  }
  else {
    do {
      if ((s32(local_8, 6) === -2)) {
        local_c = 1;
        if ((s32(local_8, 6) === -2)) {
          w32(local_8, 6, param_2);
        }
        if ((s32(local_8, 9) === -2)) {
          w32(local_8, 9, param_3);
        }
        FUN_004fc3ae(local_8);
      }
      local_8 = s32(local_8, 0x6f);
    } while ((local_8 !== 0));
  }
  return local_c;
}


 export function FUN_004fbe84 (in_ECX, param_1, param_2)

 {
  let piVar1;
  let bVar2;
  let bVar3;
  // in_ECX promoted to parameter;

  piVar1 = s32((in_ECX + 0x30c), 0);
  do {
    if ((piVar1 === 0)) {
      return 1;
    }
    if ((s32(piVar1, 0) === 0x10)) {
      if ((s32(piVar1, 7) === 4)) {
        bVar2 = 1;
      }
      else {
        bVar2 = 0;
      }
      if ((s32(piVar1, 0xa) === 4)) {
        bVar3 = 1;
      }
      else {
        bVar3 = 0;
      }
      if (bVar3) {
 LAB_004fc1a5: :
        if ((s32(piVar1, 0x60) === 0x1000)) {
          FUN_004fc3ae(piVar1);
          return 0;
        }
        FUN_004fc3ae(piVar1);
        return 1;
      }
      if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        if ((s32(piVar1, 7) === 4)) {
          bVar2 = 1;
        }
        else {
          bVar2 = 0;
        }
        if ((s32(piVar1, 0xa) === 4)) {
          bVar3 = 1;
        }
        else {
          bVar3 = 0;
        }
        if (bVar3);
  } ( true );
}


 export function FUN_004fc20d (in_ECX, param_1)

 {
  let bVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_c;

  bVar1 = 0;
  local_c = s32((in_ECX + 0x30c), 0);
  if ((local_c === 0)) {
    uVar2 = 1;
  }
  else {
    do {
      if ((s32(local_c, 9) === -2)) {
        FUN_004fc3ae(local_c);
        bVar1 = 1;
      }
      local_c = s32(local_c, 0x6f);
    } while ((local_c !== 0));
    if (bVar1) {
      uVar2 = 0;
    }
    else {
      uVar2 = 1;
    }
  }
  return uVar2;
}


 export function FUN_004fc2bb (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = s32((in_ECX + 0x30c), 0);
  if ((local_8 === 0)) {
    local_c = 0;
  }
  else {
    do {
      if ((s32(local_8, 9) === -2)) {
        if ((s32(local_8, 6) === -2)) {
          w32(local_8, 6, param_2);
        }
        if ((s32(local_8, 9) === -2)) {
          w32(local_8, 9, param_3);
        }
        local_c = 1;
        FUN_004fc3ae(local_8);
      }
      local_8 = s32(local_8, 0x6f);
    } while ((local_8 !== 0));
  }
  return local_c;
}


 export function FUN_004fc3ae (param_1)

 {
  let uVar1;

  if (((_MEM[(param_1 + 5)] & 0x20) === 0)) {
    if (((_MEM[(param_1 + 4)] & 0x10) !== 0)) {
      FUN_004fa707(param_1);
    }
    if (((_MEM[(param_1 + 4)] & 0x80) !== 0)) {
      FUN_004fa854(param_1);
    }
    if (((_MEM[(param_1 + 4)] & 4) !== 0)) {
      FUN_004faed4(param_1);
    }
    if (((_MEM[(param_1 + 4)] & 2) !== 0)) {
      FUN_004fb29f(param_1);
    }
    if (((_MEM[(param_1 + 5)] & 2) !== 0)) {
      FUN_004fb5b2(param_1);
    }
    if (((_MEM[(param_1 + 4)] & 0x20) !== 0)) {
      FUN_004faba6(param_1);
    }
    if (((_MEM[(param_1 + 4)] & 8) !== 0)) {
      FUN_004fa944(param_1);
    }
    if (((_MEM[(param_1 + 5)] & 4) !== 0)) {
      FUN_004fad02(param_1);
    }
    if (((_MEM[(param_1 + 5)] & 8) !== 0)) {
      FUN_004fadfb(param_1);
    }
    if (((_MEM[(param_1 + 4)] & 1) !== 0)) {
      FUN_004faab0(param_1);
    }
    if (((_MEM[(param_1 + 5)] & 1) !== 0)) {
      FUN_004fa82d(param_1);
    }
    if (((_MEM[(param_1 + 4)] & 0x40) !== 0)) {
      w32((param_1 + 4), 0, (s32((param_1 + 4), 0) | 0x2000));
    }
    uVar1 = 1;
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_004fc516 (in_ECX, param_1, param_2)

 {
  let iVar1;
  let sVar2;
  let pcVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_84;
  let local_80;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_3c;
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
  wv(DAT_0062f160, 0);
  iVar1 = FUN_004a2379(param_1, param_2);
  if ((iVar1 === 0)) {
    do {
      local_3c = FUN_004a23fc(1);
      if ((local_3c === 0)) {
        local_4c = 0xa;
      }
      else if ((_MEM[local_3c] === 0x40)) {
        local_3c = (local_3c + 1);
        iVar1 = __strcmpi(local_3c, DAT_0062f2c0);
        if ((iVar1 === 0)) {
          if ((DAT_0062f160 !== 0)) {
            _printf(s_@IF_found_-_creating_new_event_s_0062f2c4);
          }
          local_68 = FUN_004fa617();
          if ((local_68 === 0)) {
            if ((DAT_0062f160 !== 0)) {
              _printf(s_Failed_to_create_new_event_struc_0062f2f0);
            }
            goto LAB_004ff6f7;
          }
          if ((DAT_0062f160 !== 0)) {
            _printf(s_New_event_structure_created_0062f318);
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
        else if ((local_4c !== 6)) {
          iVar1 = __strcmpi(local_3c, DAT_0062f338);
          if ((iVar1 === 0)) {
            if ((DAT_0062f160 !== 0)) {
              _printf(s_@THEN_found_0062f340);
            }
            local_4c = 3;
          }
          else {
            iVar1 = __strcmpi(local_3c, s_ENDIF_0062f350);
            if ((iVar1 === 0)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_@ENDIF_found_0062f358);
              }
              local_4c = 5;
            }
            else {
              iVar1 = __strcmpi(local_3c, s_DEBUG_0062f368);
              if ((iVar1 === 0)) {
                wv(DAT_0062f160, 1);
                _printf(s_Debugging_filename:_%s_0062f370, param_1);
              }
              else {
                iVar1 = __strcmpi(local_3c, s_ENDEVENTS_0062f38c);
                if ((iVar1 === 0)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_@ENDEVENTS_found_0062f398);
                  }
                  local_4c = 0xa;
                }
              }
            }
          }
        }
      }
      else if ((local_4c === 2)) {
        iVar1 = __strcmpi(local_3c, s_UNITKILLED_0062f3ac);
        if ((iVar1 === 0)) {
          if ((DAT_0062f160 !== 0)) {
            _printf(s_@IF_UNITKILLED_found_looking_for_0062f3b8);
          }
          while ((local_c === 0)) {
            local_3c = FUN_004a23fc(1);
            if ((local_3c === 0)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_Got_early_end_of_file!_0062f3f8);
              }
              goto LAB_004ff6f7;
            }
            if ((_MEM[local_3c] === 0x40)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_Illegal_UNITKILLED_statement_0062f410);
              }
              goto LAB_004ff6f7;
            }
            iVar1 = __strnicmp(local_3c, s_unit=_0062f430, 5);
            if ((iVar1 === 0)) {
              pcVar3 = (local_3c + 5);
              iVar1 = FUN_004fa359(pcVar3);
              if ((iVar1 === -2)) {
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_found_unit=%s,_but_%s_is_not_val_0062f450, pcVar3, pcVar3);
                }
              }
              else {
                sVar2 = _strlen(pcVar3);
                iVar4 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                w32(local_68, 2, iVar4);
                if ((s32(local_68, 2) === 0));
                w32(local_68, 3, iVar1);
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_found_unit=%s_(id=%d)_0062f438, pcVar3, iVar1);
                }
                local_60 = 1;
              }
            }
            else {
              iVar1 = __strnicmp(local_3c, s_attacker=_0062f474, 9);
              if ((iVar1 === 0)) {
                pcVar3 = (local_3c + 9);
                local_20 = FUN_004fa250(pcVar3);
                if ((local_20 === -1)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_found_attacker=%s,_but_%s_is_not_0062f4a0, pcVar3, pcVar3);
                  }
                }
                else {
                  sVar2 = _strlen(pcVar3);
                  iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                  w32(local_68, 5, iVar1);
                  if ((s32(local_68, 5) === 0));
                  w32(local_68, 6, local_20);
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_found_attacker=%s_(king_id=%d)_0062f480, pcVar3, local_20);
                  }
                  local_c = 1;
                }
              }
              else {
                iVar1 = __strnicmp(local_3c, s_defender=_0062f4c8, 9);
                if ((iVar1 === 0)) {
                  pcVar3 = (local_3c + 9);
                  local_20 = FUN_004fa250(pcVar3);
                  if ((local_20 === -1)) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_defender=%s,_but_%s_is_not_0062f4f4, pcVar3, pcVar3);
                    }
                  }
                  else {
                    sVar2 = _strlen(pcVar3);
                    iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                    w32(local_68, 8, iVar1);
                    if ((s32(local_68, 8) === 0));
                    w32(local_68, 9, local_20);
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_defender=%s_(king_id=%d)_0062f4d4, pcVar3, local_20);
                    }
                    local_34 = 1;
                  }
                }
              }
            }
          }
          w32(local_68, 0, 1);
        }
        iVar1 = __strcmpi(local_3c, s_NEGOTIATION_0062f51c);
        if ((iVar1 === 0)) {
          if ((DAT_0062f160 !== 0)) {
            _printf(s_@IF_NEGOTIATION_found_looking_fo_0062f528);
          }
          while ((local_64 === 0)) {
            local_3c = FUN_004a23fc(1);
            if ((local_3c === 0)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_Got_early_end_of_file!_0062f578);
              }
              goto LAB_004ff6f7;
            }
            if ((_MEM[local_3c] === 0x40)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_Illegal_NEGOTIATION_statement_0062f590);
              }
              goto LAB_004ff6f7;
            }
            iVar1 = __strnicmp(local_3c, s_talker=_0062f5b0, 7);
            if ((iVar1 === 0)) {
              pcVar3 = (local_3c + 7);
              local_20 = FUN_004fa250(pcVar3);
              if ((local_20 === -1)) {
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_found_talker=%s,_but_%s_is_not_v_0062f5d8, pcVar3, pcVar3);
                }
              }
              else {
                sVar2 = _strlen(pcVar3);
                iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                w32(local_68, 5, iVar1);
                if ((s32(local_68, 5) === 0));
                w32(local_68, 6, local_20);
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_found_talker=%s_(king_id=%d)_0062f5b8, pcVar3, local_20);
                }
                local_c = 1;
              }
            }
            else {
              iVar1 = __strnicmp(local_3c, s_talkertype=_0062f600, 0xb);
              if ((iVar1 === 0)) {
                pcVar3 = (local_3c + 0xb);
                iVar1 = __strcmpi(pcVar3, s_HUMAN_0062f60c);
                if ((iVar1 === 0)) {
                  w32(local_68, 7, 1);
                  local_2c = 1;
                }
                else {
                  iVar1 = __strcmpi(pcVar3, s_COMPUTER_0062f614);
                  if ((iVar1 === 0)) {
                    w32(local_68, 7, 2);
                    local_2c = 1;
                  }
                  else {
                    iVar1 = __strcmpi(pcVar3, s_HUMANORCOMPUTER_0062f620);
                    if ((iVar1 === 0)) {
                      w32(local_68, 7, 4);
                      local_2c = 1;
                    }
                  }
                }
                if ((DAT_0062f160 !== 0)) {
                  if ((local_2c === 0)) {
                    _printf(s_found_talkertype=%s,_but_%s_is_n_0062f648, pcVar3, pcVar3);
                  }
                  else {
                    _printf(s_found_talkertype=%s_0062f630, pcVar3);
                  }
                }
              }
              else {
                iVar1 = __strnicmp(local_3c, s_listener=_0062f674, 9);
                if ((iVar1 === 0)) {
                  pcVar3 = (local_3c + 9);
                  local_20 = FUN_004fa250(pcVar3);
                  if ((local_20 === -1)) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_listener=%s,_but_%s_is_not_0062f6a0, pcVar3, pcVar3);
                    }
                  }
                  else {
                    sVar2 = _strlen(pcVar3);
                    iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                    w32(local_68, 8, iVar1);
                    if ((s32(local_68, 8) === 0));
                    w32(local_68, 9, local_20);
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_listener=%s_(king_id=%d)_0062f680, pcVar3, local_20);
                    }
                    local_34 = 1;
                  }
                }
                else {
                  iVar1 = __strnicmp(local_3c, s_listenertype=_0062f6c8, 0xd);
                  if ((iVar1 === 0)) {
                    pcVar3 = (local_3c + 0xd);
                    iVar1 = __strcmpi(pcVar3, s_HUMAN_0062f6d8);
                    if ((iVar1 === 0)) {
                      w32(local_68, 0xa, 1);
                      local_64 = 1;
                    }
                    else {
                      iVar1 = __strcmpi(pcVar3, s_COMPUTER_0062f6e0);
                      if ((iVar1 === 0)) {
                        w32(local_68, 0xa, 2);
                        local_64 = 1;
                      }
                      else {
                        iVar1 = __strcmpi(pcVar3, s_HUMANORCOMPUTER_0062f6ec);
                        if ((iVar1 === 0)) {
                          w32(local_68, 0xa, 4);
                          local_64 = 1;
                        }
                      }
                    }
                    if ((DAT_0062f160 !== 0)) {
                      if ((local_2c === 0)) {
                        _printf(s_found_listenertype=%s,_but_%s_is_0062f714, pcVar3, pcVar3);
                      }
                      else {
                        _printf(s_found_listenertype=%s_0062f6fc, pcVar3);
                      }
                    }
                  }
                }
              }
            }
          }
          w32(local_68, 0, 0x10);
          w32(local_68, 0x60, 0x1000);
        }
        iVar1 = __strcmpi(local_3c, s_NOSCHISM_0062f740);
        if ((iVar1 === 0)) {
          if ((DAT_0062f160 !== 0)) {
            _printf(s_@IF_NOSCHISM_found_looking_for_w_0062f74c);
          }
          while ((local_34 === 0)) {
            pcVar3 = FUN_004a23fc(1);
            if ((pcVar3 === 0)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_Got_early_end_of_file!_0062f774);
              }
              goto LAB_004ff6f7;
            }
            if ((_MEM[pcVar3] === 0x40)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_Illegal_NOSCHISM_statement_0062f78c);
              }
              goto LAB_004ff6f7;
            }
            iVar1 = __strnicmp(pcVar3, s_defender=_0062f7a8, 9);
            if ((iVar1 === 0)) {
              pcVar3 = (pcVar3 + 9);
              local_20 = FUN_004fa250(pcVar3);
              if ((local_20 === -1)) {
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_found_defender=%s,_but_%s_is_not_0062f7d4, pcVar3, pcVar3);
                }
              }
              else {
                sVar2 = _strlen(pcVar3);
                iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                w32(local_68, 8, iVar1);
                if ((s32(local_68, 8) === 0));
                w32(local_68, 9, local_20);
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_found_defender=%s_(king_id=%d)_0062f7b4, pcVar3, local_20);
                }
                local_34 = 1;
              }
            }
          }
          w32(local_68, 0, 0x80);
        }
        else {
          iVar1 = __strcmpi(local_3c, s_RECEIVEDTECHNOLOGY_0062f7fc);
          if ((iVar1 === 0)) {
            if ((DAT_0062f160 !== 0)) {
              _printf(s_@IF_RECEIVEDTECHNOLOGY_found_loo_0062f810);
            }
            while ((local_34 === 0)) {
              pcVar3 = FUN_004a23fc(1);
              if ((pcVar3 === 0)) {
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_Got_early_end_of_file!_0062f850);
                }
                goto LAB_004ff6f7;
              }
              if ((_MEM[pcVar3] === 0x40)) {
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_Illegal_RECEIVEDTECHNOLOGY_state_0062f868);
                }
                goto LAB_004ff6f7;
              }
              iVar1 = __strnicmp(pcVar3, s_receiver=_0062f890, 9);
              if ((iVar1 === 0)) {
                pcVar3 = (pcVar3 + 9);
                iVar1 = FUN_004fa250(pcVar3);
                if ((iVar1 === -1)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_found_receiver=%s,_but_%s_is_not_0062f8bc, pcVar3, pcVar3);
                  }
                }
                else {
                  sVar2 = _strlen(pcVar3);
                  iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                  w32(local_68, 8, iVar1);
                  if ((s32(local_68, 8) === 0));
                  iVar1 = FUN_004fa250(pcVar3);
                  w32(local_68, 9, iVar1);
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_found_receiver=%s_(king_id=%d)_0062f89c, pcVar3, local_20);
                  }
                  local_34 = 1;
                }
              }
              else {
                iVar1 = __strnicmp(pcVar3, s_technology=_0062f8e4, 0xb);
                if ((iVar1 === 0)) {
                  pcVar3 = (pcVar3 + 0xb);
                  if ((0x39 < _MEM[pcVar3 + 0xb])) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_technology=%s,_but_%s_is_n_0062f918, pcVar3, pcVar3);
                    }
                  }
                  else {
                    iVar1 = FUN_00564bf0(pcVar3);
                    w32(local_68, 0xd, iVar1);
                    local_6c = 1;
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_technology=%s_(technology_i_0062f8f0, pcVar3, s32(local_68, 0xd));
                    }
                  }
                }
              }
            }
            w32(local_68, 0, 0x100);
          }
          else {
            iVar1 = __strcmpi(local_3c, s_CITYTAKEN_0062f944);
            if ((iVar1 === 0)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_@IF_CITYTAKEN_found_looking_for_c_0062f950);
              }
              while ((local_34 === 0)) {
                pcVar3 = FUN_004a23fc(1);
                if ((pcVar3 === 0)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_Got_early_end_of_file!_0062f98c);
                  }
                  goto LAB_004ff6f7;
                }
                if ((_MEM[pcVar3] === 0x40)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_Illegal_CITYTAKEN_statement_0062f9a4);
                  }
                  goto LAB_004ff6f7;
                }
                iVar1 = __strnicmp(pcVar3, s_attacker=_0062f9c4, 9);
                if ((iVar1 === 0)) {
                  pcVar3 = (pcVar3 + 9);
                  iVar1 = FUN_004fa250(pcVar3);
                  if ((iVar1 === -1)) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_attacker=%s,_but_%s_is_not_0062f9f0, pcVar3, pcVar3);
                    }
                  }
                  else {
                    sVar2 = _strlen(pcVar3);
                    iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                    w32(local_68, 5, iVar1);
                    if ((s32(local_68, 5) === 0));
                    iVar1 = FUN_004fa250(pcVar3);
                    w32(local_68, 6, iVar1);
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_attacker=%s_(king_id=%d)_0062f9d0, pcVar3, local_20);
                    }
                    local_c = 1;
                  }
                }
                else {
                  iVar1 = __strnicmp(pcVar3, s_defender=_0062fa18, 9);
                  if ((iVar1 === 0)) {
                    pcVar3 = (pcVar3 + 9);
                    local_20 = FUN_004fa250(pcVar3);
                    if ((local_20 === -1)) {
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_found_defender=%s,_but_%s_is_not_0062fa44, pcVar3, pcVar3);
                      }
                    }
                    else {
                      sVar2 = _strlen(pcVar3);
                      iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                      w32(local_68, 8, iVar1);
                      if ((s32(local_68, 8) === 0));
                      w32(local_68, 9, local_20);
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_found_defender=%s_(king_id=%d)_0062fa24, pcVar3, local_20);
                      }
                      local_34 = 1;
                    }
                  }
                  else {
                    iVar1 = __strnicmp(pcVar3, s_city=_0062fa6c, 5);
                    if ((iVar1 === 0)) {
                      pcVar3 = (pcVar3 + 5);
                      sVar2 = _strlen(pcVar3);
                      iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                      w32(local_68, 4, iVar1);
                      if ((s32(local_68, 4) === 0));
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_found_city=%s_0062fa74, pcVar3, local_20);
                      }
                      local_78 = 1;
                    }
                  }
                }
              }
              w32(local_68, 0, 2);
            }
            else {
              iVar1 = __strcmpi(local_3c, DAT_0062fa84);
              if ((iVar1 === 0)) {
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_@IF_TURN_found_looking_for_turn=_0062fa8c);
                }
                do {
                  do {
                    pcVar3 = FUN_004a23fc(1);
                    if ((pcVar3 === 0)) {
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_Got_early_end_of_file!_0062fab0);
                      }
                      goto LAB_004ff6f7;
                    }
                    if ((_MEM[pcVar3] === 0x40)) {
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_Illegal_TURN_statement_0062fac8);
                      }
                      goto LAB_004ff6f7;
                    }
                    iVar1 = __strnicmp(pcVar3, s_turn=_0062fae0, 5);
                  } while ((iVar1 !== 0));
                  pcVar3 = (pcVar3 + 5);
                  iVar1 = __strcmpi(pcVar3, s_EVERY_0062fae8);
                  if ((iVar1 === 0)) {
                    w32(local_68, 0xb, -1);
                    w32(local_68, 0, 4);
                  }
                  else if ((_MEM[pcVar3 + 5] === 0x2b)) {
                    iVar1 = FUN_00564bf0(pcVar3);
                    w32(local_68, 0xb, iVar1);
                    w32(local_68, 0, 4);
                  }
                  if ((DAT_0062f160 !== 0)) {
                    if ((s32(local_68, 0) === 4)) {
                      _printf(s_found_turn=%s_0062faf0, pcVar3);
                    }
                    else {
                      _printf(s_found_turn=%s,_but_%s_is_not_val_0062fb00, pcVar3, pcVar3);
                    }
                  }
                } while ((s32(local_68, 0) !== 4));
              }
              else {
                iVar1 = __strcmpi(local_3c, s_TURNINTERVAL_0062fb24);
                if ((iVar1 === 0)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_@IF_TURNINTERVAL_found_looking_f_0062fb34);
                  }
                  do {
                    pcVar3 = FUN_004a23fc(1);
                    if ((pcVar3 === 0)) {
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_Got_early_end_of_file!_0062fb64);
                      }
                      goto LAB_004ff6f7;
                    }
                    if ((_MEM[pcVar3] === 0x40)) {
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_Illegal_TURNINTERVAL_statement_0062fb7c);
                      }
                      goto LAB_004ff6f7;
                    }
                    iVar1 = __strnicmp(pcVar3, s_interval=_0062fb9c, 9);
                    if ((iVar1 === 0)) {
                      pcVar3 = (pcVar3 + 9);
                      if ((_MEM[pcVar3 + 9] !== 0x2b)) {
                        if ((DAT_0062f160 !== 0)) {
                          _printf(s_found_interval=%s,_but_%s_is_not_0062fbbc, pcVar3, pcVar3);
                        }
                      }
                      else {
                        iVar1 = FUN_00564bf0(pcVar3);
                        w32(local_68, 0xb, iVar1);
                        if ((DAT_0062f160 !== 0)) {
                          _printf(s_found_interval=%s_0062fba8, pcVar3);
                        }
                        w32(local_68, 0, 8);
                      }
                    }
                  } while ((s32(local_68, 0) !== 8));
                }
                else {
                  iVar1 = __strcmpi(local_3c, s_RANDOMTURN_0062fbe4);
                  if ((iVar1 === 0)) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_@IF_RANDOMTURN_found_looking_for_0062fbf0);
                    }
                    do {
                      pcVar3 = FUN_004a23fc(1);
                      if ((pcVar3 === 0)) {
                        if ((DAT_0062f160 !== 0)) {
                          _printf(s_Got_early_end_of_file!_0062fc20);
                        }
                        goto LAB_004ff6f7;
                      }
                      if ((_MEM[pcVar3] === 0x40)) {
                        if ((DAT_0062f160 !== 0)) {
                          _printf(s_Illegal_RANDOMTURN_statement_0062fc38);
                        }
                        goto LAB_004ff6f7;
                      }
                      iVar1 = __strnicmp(pcVar3, s_denominator=_0062fc58, 0xc);
                      if ((iVar1 === 0)) {
                        pcVar3 = (pcVar3 + 0xc);
                        if ((0x39 < _MEM[pcVar3 + 0xc])) {
                          if ((DAT_0062f160 !== 0)) {
                            _printf(s_found_denominator=%s,_but_%s_is_n_0062fcac, pcVar3, pcVar3);
                          }
                        }
                        else {
                          iVar1 = FUN_00564bf0(pcVar3);
                          w32(local_68, 0xc, iVar1);
                          if ((0x3e8 < s32(local_68, 0xc))) {
                            _printf(s_found_denominator=%s,_but_%s_is_n_0062fc68, pcVar3, pcVar3);
                            goto LAB_004ff6f7;
                          }
                          if ((DAT_0062f160 !== 0)) {
                            _printf(s_found_denominator=%s_0062fc94, pcVar3);
                          }
                          w32(local_68, 0, 0x40);
                        }
                      }
                    } while ((s32(local_68, 0) !== 0x40));
                  }
                  else {
                    iVar1 = __strcmpi(local_3c, s_SCENARIOLOADED_0062fcd8);
                    if ((iVar1 === 0)) {
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_@IF_SCENARIOLOADED_0062fce8);
                      }
                      w32(local_68, 0, 0x20);
                    }
                  }
                }
              }
            }
          }
        }
      }
      else if ((local_4c === 3)) {
        iVar1 = __strcmpi(local_3c, DAT_0062fd00);
        if ((iVar1 === 0)) {
          if ((DAT_0062f160 !== 0)) {
            _printf(s_@THEN_TEXT_found_looking_for_END_0062fd08);
          }
          local_38 = 0;
          local_3c = FUN_004a23fc(1);
          if ((local_3c === 0)) {
            if ((local_38 !== 0x14)) {
              sVar2 = _strlen(local_3c);
              iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
              w32(local_68, (local_38 + 0xe), iVar1);
              if ((s32(local_68, (local_38 + 0xe)) === 0));
              local_38 = (local_38 + 1);
            }
            local_3c = FUN_004a23fc(1);
            if ((local_3c === 0)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_Got_early_end_of_file!_0062fd38);
              }
              goto LAB_004ff6f7;
            }
            if ((_MEM[local_3c] === 0x40)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_Illegal_TEXT_statement_0062fd50);
              }
              goto LAB_004ff6f7;
            }
          }
          if ((DAT_0062f160 !== 0)) {
            _printf(s_found_ENDTEXT_0062fd68);
          }
          w32(local_68, 1, (s32(local_68, 1) | 1));
        }
        else {
          iVar1 = __strcmpi(local_3c, s_CHANGETERRAIN_0062fd78);
          if ((iVar1 === 0)) {
            if ((DAT_0062f160 !== 0)) {
              _printf(s_@THEN_CHANGETERRAIN_found_lookin_0062fd88);
            }
            local_24 = 0;
            while ((local_24 !== 4)) {
              pcVar3 = FUN_004a23fc(1);
              if ((pcVar3 === 0)) {
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_Got_early_end_of_file!_0062fdc8);
                }
                goto LAB_004ff6f7;
              }
              if ((_MEM[pcVar3] === 0x40)) {
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_Illegal_CHANGETERRAIN_statement_0062fde0);
                }
                goto LAB_004ff6f7;
              }
              iVar1 = __strnicmp(pcVar3, s_terraintype=_0062fe04, 0xc);
              if ((iVar1 === 0)) {
                pcVar3 = (pcVar3 + 0xc);
                if ((0x39 < _MEM[pcVar3 + 0xc])) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_found_terraintype=%s,_but_%s_is_n_0062fe3c, pcVar3, pcVar3);
                  }
                }
                else {
                  iVar1 = FUN_00564bf0(pcVar3);
                  if ((iVar1 < 0xb)) {
                    w32(local_68, 0x63, iVar1);
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_terraintype=%s_(terrainid=_0062fe14, pcVar3, iVar1);
                    }
                    local_1c = 1;
                  }
                }
              }
              else {
                iVar1 = __strcmpi(pcVar3, s_maprect_0062fe68);
                if ((iVar1 === 0)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_found_maprect_0062fe70);
                  }
                  iVar1 = FUN_004a23fc(1);
                  if ((iVar1 === 0)) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_Got_early_end_of_file!_0062fe80);
                    }
                    goto LAB_004ff6f7;
                  }
                  for (/* cond: (local_38 < 4) */); local_38 = (local_38 < 4); local_38 = (local_38 + 1)) {
                    iVar1 = FUN_004a2534();
                    w32(local_68, (local_38 * 2 + 0x64), iVar1);
                    iVar1 = FUN_004a2534();
                    w32(local_68, (local_38 * 2 + 0x65), iVar1);
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_location_%d:_%d,_%d_0062fe98, local_24, s32(local_68, (local_38 * 2 + 0x64)), s32(local_68, (local_38 * 2 + 0x65)));
                    }
                    local_24 = (local_24 + 1);
                  }
                }
              }
            }
            w32(local_68, 1, (s32(local_68, 1) | 0x200));
          }
          else {
            iVar1 = __strcmpi(local_3c, s_CREATEUNIT_0062feb4);
            if ((iVar1 === 0)) {
              if ((DAT_0062f160 !== 0)) {
                _printf(s_@THEN_CREATEUNIT_found_looking_f_0062fec0);
              }
              local_24 = 0;
 LAB_004fe0af: :
              if ((local_24 === 0)) {
                pcVar3 = FUN_004a23fc(1);
                if ((pcVar3 === 0)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_Got_early_end_of_file!_0062ff1c);
                  }
                  goto LAB_004ff6f7;
                }
                if ((_MEM[pcVar3] === 0x40)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_Illegal_CREATEUNIT_statement_0062ff34);
                  }
                  goto LAB_004ff6f7;
                }
                iVar1 = __strnicmp(pcVar3, s_unit=_0062ff54, 5);
                if ((iVar1 === 0)) {
                  pcVar3 = (pcVar3 + 5);
                  iVar1 = FUN_004fa359(pcVar3);
                  if ((iVar1 === -1)) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_unit=%s,_but_%s_is_not_val_0062ff78, pcVar3, pcVar3);
                    }
                  }
                  else {
                    sVar2 = _strlen(pcVar3);
                    iVar4 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                    w32(local_68, 0x37, iVar4);
                    if ((s32(local_68, 0x37) === 0));
                    w32(local_68, 0x38, iVar1);
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_found_unit=%s_(unit_id=%d)_0062ff5c, pcVar3, iVar1);
                    }
                    local_74 = 1;
                  }
                }
                else {
                  iVar1 = __strnicmp(pcVar3, s_owner=_0062ff9c, 6);
                  if ((iVar1 === 0)) {
                    pcVar3 = (pcVar3 + 6);
                    local_20 = FUN_004fa250(pcVar3);
                    if ((local_20 === -1)) {
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_found_owner=%s,_but_%s_is_not_va_0062ffc4, pcVar3, pcVar3);
                      }
                    }
                    else {
                      sVar2 = _strlen(pcVar3);
                      iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                      w32(local_68, 0x35, iVar1);
                      if ((s32(local_68, 0x35) === 0));
                      w32(local_68, 0x36, local_20);
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_found_owner=%s_(king_id=%d)_0062ffa4, pcVar3, local_20);
                      }
                      local_84 = 1;
                    }
                  }
                  else {
                    iVar1 = __strnicmp(pcVar3, s_veteran=_0062ffec, 8);
                    if ((iVar1 === 0)) {
                      pcVar3 = (pcVar3 + 8);
                      iVar1 = __strcmpi(pcVar3, DAT_0062fff8);
                      if ((iVar1 === 0)) {
                        w32(local_68, 0x4e, 1);
                        local_54 = 1;
                      }
                      else {
                        iVar1 = __strcmpi(pcVar3, DAT_00630004);
                        if ((iVar1 === 0)) {
                          w32(local_68, 0x4e, 0);
                          local_54 = 1;
                        }
                        else if ((DAT_0062f160 !== 0)) {
                          _printf(s_found_veteran=%s,_but_%s_is_not_v_00630010, pcVar3, pcVar3);
                        }
                      }
                    }
                    else {
                      iVar1 = __strnicmp(pcVar3, s_homecity=_00630038, 9);
                      if ((iVar1 === 0)) {
                        pcVar3 = (pcVar3 + 9);
                        sVar2 = _strlen(pcVar3);
                        iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                        w32(local_68, 0x4f, iVar1);
                        if ((s32(local_68, 0x4f) === 0));
                        if ((DAT_0062f160 !== 0)) {
                          _printf(s_found_homecity=%s_00630044, pcVar3);
                        }
                        local_80 = 1;
                      }
                      else {
                        iVar1 = __strcmpi(pcVar3, s_locations_00630058);
                        if ((iVar1 === 0)) {
                          if ((DAT_0062f160 !== 0)) {
                            _printf(s_found_locations_00630064);
                          }
                          for (/* cond: (local_38 < 0xa) */); local_38 = (local_38 < 0xa); local_38 = (local_38 + 1)) {
                            pcVar3 = FUN_004a23fc(1);
                            if ((pcVar3 === 0)) {
                              if ((DAT_0062f160 !== 0)) {
                                _printf(s_Got_early_end_of_file!_00630078);
                              }
                              goto LAB_004ff6f7;
                            }
                            if ((_MEM[pcVar3] !== 0x2b)) {
                              iVar1 = __strcmpi(pcVar3, s_endlocations_006300ac);
                              if ((iVar1 === 0)) {
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_found_endlocations_006300bc, pcVar3, pcVar3);
                                }
                                break;
                              }
                            }
                            else {
                              iVar1 = FUN_004a2534();
                              w32(local_68, (local_38 * 2 + 0x39), iVar1);
                              iVar1 = FUN_004a2534();
                              w32(local_68, (local_38 * 2 + 0x3a), iVar1);
                              if ((DAT_0062f160 !== 0)) {
                                _printf(s_found_location_%d:_%d,_%d_00630090, local_24, s32(local_68, (local_38 * 2 + 0x39)), s32(local_68, (local_38 * 2 + 0x3a)))
                                ;
                              }
                              local_24 = (local_24 + 1);
                            }
                          }
                        }
                      }
                    }
                  }
                }
                goto LAB_004fe0af;
              }
              w32(local_68, 0x4d, local_24);
              w32(local_68, 1, (s32(local_68, 1) | 4));
            }
            else {
              iVar1 = __strcmpi(local_3c, s_CHANGEMONEY_006300d0);
              if ((iVar1 === 0)) {
                if ((DAT_0062f160 !== 0)) {
                  _printf(s_@THEN_CHANGEMONEY_found_looking_f_006300dc);
                }
                while ((local_18 === 0)) {
                  pcVar3 = FUN_004a23fc(1);
                  if ((pcVar3 === 0)) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_Got_early_end_of_file!_00630114);
                    }
                    goto LAB_004ff6f7;
                  }
                  if ((_MEM[pcVar3] === 0x40)) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_Illegal_CHANGEMONEY_statement_0063012c);
                    }
                    goto LAB_004ff6f7;
                  }
                  iVar1 = __strnicmp(pcVar3, s_receiver=_0063014c, 9);
                  if ((iVar1 === 0)) {
                    pcVar3 = (pcVar3 + 9);
                    local_20 = FUN_004fa250(pcVar3);
                    if ((local_20 === -1)) {
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_found_receiver=%s,_but_%s_is_not_00630178, pcVar3, pcVar3);
                      }
                    }
                    else {
                      sVar2 = _strlen(pcVar3);
                      iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                      w32(local_68, 0x5d, iVar1);
                      if ((s32(local_68, 0x5d) === 0));
                      w32(local_68, 0x5e, local_20);
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_found_receiver=%s_(king_id=%d)_00630158, pcVar3, local_20);
                      }
                      local_58 = 1;
                    }
                  }
                  else {
                    iVar1 = __strnicmp(pcVar3, s_amount=_006301a0, 7);
                    if ((_MEM[pcVar3 + 7] === 0x2b)) {
                      iVar1 = FUN_00564bf0(pcVar3);
                      w32(local_68, 0x5f, iVar1);
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_found_amount=%s_(integer_%d)_006301a8, pcVar3, s32(local_68, 0x5f));
                      }
                      local_18 = 1;
                    }
                  }
                }
                w32(local_68, 1, (s32(local_68, 1) | 8));
              }
              else {
                iVar1 = __strcmpi(local_3c, s_JUSTONCE_006301c8);
                if ((iVar1 === 0)) {
                  if ((DAT_0062f160 !== 0)) {
                    _printf(s_@THEN_JUSTONCE_found_not_looking_006301d4);
                  }
                  w32(local_68, 1, (s32(local_68, 1) | 0x40));
                }
                else {
                  iVar1 = __strcmpi(local_3c, s_DONTPLAYWONDERS_00630210);
                  if ((iVar1 === 0)) {
                    if ((DAT_0062f160 !== 0)) {
                      _printf(s_@THEN_DONTPLAYWONDERS_found_not_l_00630220);
                    }
                    w32(local_68, 1, (s32(local_68, 1) | 0x100));
                  }
                  else {
                    iVar1 = __strcmpi(local_3c, s_MAKEAGGRESSION_00630264);
                    if ((iVar1 === 0)) {
                      if ((DAT_0062f160 !== 0)) {
                        _printf(s_@THEN_MAKEAGGRESSION_found_looki_00630274);
                      }
                      while ((local_8 === 0)) {
                        pcVar3 = FUN_004a23fc(1);
                        if ((pcVar3 === 0)) {
                          if ((DAT_0062f160 !== 0)) {
                            _printf(s_Got_early_end_of_file!_006302a8);
                          }
                          goto LAB_004ff6f7;
                        }
                        if ((_MEM[pcVar3] === 0x40)) {
                          if ((DAT_0062f160 !== 0)) {
                            _printf(s_Illegal_MAKEAGGRESSION_statement_006302c0);
                          }
                          goto LAB_004ff6f7;
                        }
                        iVar1 = __strnicmp(pcVar3, DAT_006302e4, 4);
                        if ((iVar1 === 0)) {
                          pcVar3 = (pcVar3 + 4);
                          local_20 = FUN_004fa250(pcVar3);
                          if ((local_20 === -1)) {
                            if ((DAT_0062f160 !== 0)) {
                              _printf(s_found_who=%s,_but_%s_is_not_vali_00630308, pcVar3, pcVar3);
                            }
                          }
                          else {
                            sVar2 = _strlen(pcVar3);
                            iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                            w32(local_68, 0x33, iVar1);
                            if ((s32(local_68, 0x33) === 0));
                            w32(local_68, 0x34, local_20);
                            if ((DAT_0062f160 !== 0)) {
                              _printf(s_found_who=%s_(king_id=%d)_006302ec, pcVar3, local_20);
                            }
                            local_14 = 1;
                          }
                        }
                        else {
                          iVar1 = __strnicmp(pcVar3, s_whom=_0063032c, 5);
                          if ((iVar1 === 0)) {
                            pcVar3 = (pcVar3 + 5);
                            local_20 = FUN_004fa250(pcVar3);
                            if ((local_20 === -1)) {
                              if ((DAT_0062f160 !== 0)) {
                                _printf(s_found_whom=%s,_but_%s_is_not_val_00630350, pcVar3, pcVar3);
                              }
                            }
                            else {
                              sVar2 = _strlen(pcVar3);
                              iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                              w32(local_68, 0x31, iVar1);
                              if ((s32(local_68, 0x31) === 0));
                              w32(local_68, 0x32, local_20);
                              if ((DAT_0062f160 !== 0)) {
                                _printf(s_found_whom=%s_(king_id=%d)_00630334, pcVar3, local_20);
                              }
                              local_8 = 1;
                            }
                          }
                        }
                      }
                      w32(local_68, 1, (s32(local_68, 1) | 0x20));
                    }
                    else {
                      iVar1 = __strcmpi(local_3c, s_DESTROYACIVILIZATION_00630374);
                      if ((iVar1 === 0)) {
                        if ((DAT_0062f160 !== 0)) {
                          _printf(s_@THEN_DESTROYACIVILIZATION_found_0063038c);
                        }
                        while ((local_28 === 0)) {
                          pcVar3 = FUN_004a23fc(1);
                          if ((pcVar3 === 0)) {
                            if ((DAT_0062f160 !== 0)) {
                              _printf(s_Got_early_end_of_file!_006303c4);
                            }
                            goto LAB_004ff6f7;
                          }
                          if ((_MEM[pcVar3] === 0x40)) {
                            if ((DAT_0062f160 !== 0)) {
                              _printf(s_Illegal_DESTROYACIVILIZATION_sta_006303dc);
                            }
                            goto LAB_004ff6f7;
                          }
                          iVar1 = __strnicmp(pcVar3, s_whom=_00630404, 5);
                          if ((iVar1 === 0)) {
                            pcVar3 = (pcVar3 + 5);
                            local_20 = FUN_004fa250(pcVar3);
                            if ((local_20 === -1)) {
                              if ((DAT_0062f160 !== 0)) {
                                _printf(s_found_whom=%s,_but_%s_is_not_val_00630428, pcVar3, pcVar3);
                              }
                            }
                            else {
                              w32(local_68, 0x6c, local_20);
                              if ((DAT_0062f160 !== 0)) {
                                _printf(s_found_whom=%s_(king_id=%d)_0063040c, pcVar3, local_20);
                              }
                              local_28 = 1;
                            }
                          }
                        }
                        w32(local_68, 1, (s32(local_68, 1) | 0x400));
                      }
                      else {
                        iVar1 = __strcmpi(local_3c, s_GIVETECHNOLOGY_0063044c);
                        if ((iVar1 === 0)) {
                          if ((DAT_0062f160 !== 0)) {
                            _printf(s_@THEN_GIVETECHNOLOGY_found_looki_0063045c);
                          }
                          while ((local_50 === 0)) {
                            pcVar3 = FUN_004a23fc(1);
                            if ((pcVar3 === 0)) {
                              if ((DAT_0062f160 !== 0)) {
                                _printf(s_Got_early_end_of_file!_0063048c);
                              }
                              goto LAB_004ff6f7;
                            }
                            if ((_MEM[pcVar3] === 0x40)) {
                              if ((DAT_0062f160 !== 0)) {
                                _printf(s_Illegal_GIVETECHNOLOGY_statement_006304a4);
                              }
                              goto LAB_004ff6f7;
                            }
                            iVar1 = __strnicmp(pcVar3, s_receiver=_006304c8, 9);
                            if ((iVar1 === 0)) {
                              pcVar3 = (pcVar3 + 9);
                              local_20 = FUN_004fa250(pcVar3);
                              if ((local_20 === -1)) {
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_found_receiver=%s,_but_%s_is_not_006304f4, pcVar3, pcVar3)
                                  ;
                                }
                              }
                              else {
                                w32(local_68, 0x6e, local_20);
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_found_receiver=%s_(king_id=%d)_006304d4, pcVar3, local_20)
                                  ;
                                }
                                local_50 = 1;
                              }
                            }
                            else {
                              iVar1 = __strnicmp(pcVar3, s_technology=_0063051c, 0xb);
                              if ((_MEM[pcVar3 + 0xb] < 0x3a)) {
                                iVar1 = FUN_00564bf0(pcVar3);
                                w32(local_68, 0x6d, iVar1);
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_found_technology=%s_(integer_%d)_00630528, pcVar3, s32(local_68, 0x6d));
                                }
                                local_48 = 1;
                              }
                            }
                          }
                          w32(local_68, 1, (s32(local_68, 1) | 0x800));
                        }
                        else {
                          iVar1 = __strcmpi(local_3c, s_MOVEUNIT_0063054c);
                          if ((iVar1 === 0)) {
                            if ((DAT_0062f160 !== 0)) {
                              _printf(s_@THEN_MOVEUNIT_found_looking_for_00630558);
                            }
                            local_24 = 0;
                            while ((local_70 === 0)) {
                              pcVar3 = FUN_004a23fc(1);
                              if ((pcVar3 === 0)) {
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_Got_early_end_of_file!_006305a8);
                                }
                                goto LAB_004ff6f7;
                              }
                              if ((_MEM[pcVar3] === 0x40)) {
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_Illegal_MOVEUNIT_statement_006305c0);
                                }
                                goto LAB_004ff6f7;
                              }
                              iVar1 = __strnicmp(pcVar3, s_unit=_006305dc, 5);
                              if ((iVar1 === 0)) {
                                pcVar3 = (pcVar3 + 5);
                                iVar1 = FUN_004fa359(pcVar3);
                                if ((iVar1 === -1)) {
                                  if ((DAT_0062f160 !== 0)) {
                                    _printf(s_found_unit=%s,_but_%s_is_not_val_00630600, pcVar3, pcVar3);
                                  }
                                }
                                else {
                                  sVar2 = _strlen(pcVar3);
                                  iVar4 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                                  w32(local_68, 0x24, iVar4);
                                  if ((s32(local_68, 0x24) === 0));
                                  w32(local_68, 0x25, iVar1);
                                  if ((DAT_0062f160 !== 0)) {
                                    _printf(s_found_unit=%s_(unit_id=%d)_006305e4, pcVar3, iVar1);
                                  }
                                  local_74 = 1;
                                }
                              }
                              else {
                                iVar1 = __strnicmp(pcVar3, s_owner=_00630624, 6);
                                if ((iVar1 === 0)) {
                                  pcVar3 = (pcVar3 + 6);
                                  local_20 = FUN_004fa250(pcVar3);
                                  if ((local_20 === -1)) {
                                    if ((DAT_0062f160 !== 0)) {
                                      _printf(s_found_owner=%s,_but_%s_is_not_va_0063064c, pcVar3, pcVar3);
                                    }
                                  }
                                  else {
                                    sVar2 = _strlen(pcVar3);
                                    iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                                    w32(local_68, 0x22, iVar1);
                                    if ((s32(local_68, 0x22) === 0));
                                    w32(local_68, 0x23, local_20);
                                    if ((DAT_0062f160 !== 0)) {
                                      _printf(s_found_owner=%s_(king_id=%d)_0063062c, pcVar3, local_20);
                                    }
                                    local_84 = 1;
                                  }
                                }
                                else {
                                  iVar1 = __strcmpi(pcVar3, s_maprect_00630674);
                                  if ((iVar1 === 0)) {
                                    if ((DAT_0062f160 !== 0)) {
                                      _printf(s_found_maprect_0063067c);
                                    }
                                    iVar1 = FUN_004a23fc(1);
                                    if ((iVar1 === 0)) {
                                      if ((DAT_0062f160 !== 0)) {
                                        _printf(s_Got_early_end_of_file!_0063068c);
                                      }
                                      goto LAB_004ff6f7;
                                    }
                                    for (/* cond: (local_38 < 4) */); local_38 = (local_38 < 4); local_38 = (local_38 + 1)) {
                                      iVar1 = FUN_004a2534();
                                      w32(local_68, (local_38 * 2 + 0x27), iVar1);
                                      iVar1 = FUN_004a2534();
                                      w32(local_68, (local_38 * 2 + 0x28), iVar1);
                                      if ((DAT_0062f160 !== 0)) {
                                        _printf(s_found_location_%d:_%d,_%d_006306a4, local_24, s32(local_68, (local_38 * 2 + 0x27)), s32(local_68, (local_38 * 2 + 0x28)));
                                      }
                                      local_24 = (local_24 + 1);
                                    }
                                  }
                                  else {
                                    iVar1 = __strcmpi(pcVar3, s_moveto_006306c0);
                                    if ((iVar1 === 0)) {
                                      if ((DAT_0062f160 !== 0)) {
                                        _printf(s_found_moveto_006306c8);
                                      }
                                      pcVar3 = FUN_004a23fc(1);
                                      if ((pcVar3 === 0)) {
                                        if ((DAT_0062f160 !== 0)) {
                                          _printf(s_Got_early_end_of_file!_006306d8);
                                        }
                                        goto LAB_004ff6f7;
                                      }
                                      if ((_MEM[pcVar3] === 0x2b)) {
                                        iVar1 = FUN_004a2534();
                                        w32(local_68, 0x2f, iVar1);
                                        iVar1 = FUN_004a2534();
                                        w32(local_68, 0x30, iVar1);
                                        if ((DAT_0062f160 !== 0)) {
                                          _printf(s_found_moveto:_%d,_%d_006306f0, s32(local_68, 0x2f), s32(local_68, 0x30));
                                        }
                                        local_5c = 1;
                                      }
                                    }
                                    else {
                                      iVar1 = __strnicmp(pcVar3, s_numbertomove=_00630708, 0xd);
                                      if ((iVar1 === 0)) {
                                        pcVar3 = (pcVar3 + 0xd);
                                        if ((0x39 < _MEM[pcVar3 + 0xd])) {
                                          iVar1 = __strcmpi(pcVar3, DAT_0063073c);
                                          if ((iVar1 === 0)) {
                                            w32(local_68, 0x26, -2);
                                            if ((DAT_0062f160 !== 0)) {
                                              _printf(s_found_numbertomove=%s_00630740, pcVar3);
                                            }
                                            local_70 = 1;
                                          }
                                          else if ((DAT_0062f160 !== 0)) {
                                            _printf(s_found_numbertomove=%s,_but_%s_is_00630758, pcVar3, pcVar3);
                                          }
                                        }
                                        else {
                                          iVar1 = FUN_00564bf0(pcVar3);
                                          w32(local_68, 0x26, iVar1);
                                          if ((DAT_0062f160 !== 0)) {
                                            _printf(s_found_numbertomove=%s_(integer_%_00630718, pcVar3, s32(local_68, 0x26));
                                          }
                                          local_70 = 1;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                            w32(local_68, 1, (s32(local_68, 1) | 2));
                          }
                          else {
                            iVar1 = __strcmpi(local_3c, s_PLAYCDTRACK_00630784);
                            if ((iVar1 === 0)) {
                              if ((DAT_0062f160 !== 0)) {
                                _printf(s_@THEN_PLAYCDTRACK_found,_looking_00630790);
                              }
                              iVar1 = FUN_004a23fc(1);
                              if ((iVar1 === 0)) {
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_Got_early_end_of_file!_006307c4);
                                }
                                goto LAB_004ff6f7;
                              }
                              iVar1 = FUN_004a2534();
                              w32(local_68, 0x62, iVar1);
                              if ((0 < s32(local_68, 0x62))) {
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_found_cd_track_%d_006307dc, s32(local_68, 0x62));
                                }
                                w32(local_68, 1, (s32(local_68, 1) | 0x80));
                              }
                            }
                            else {
                              iVar1 = __strcmpi(local_3c, s_PLAYWAVEFILE_006307f0);
                              if ((iVar1 === 0)) {
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_@THEN_PLAYWAVEFILE_found,_lookin_00630800);
                                }
                                pcVar3 = FUN_004a23fc(1);
                                if ((pcVar3 === 0)) {
                                  if ((DAT_0062f160 !== 0)) {
                                    _printf(s_Got_early_end_of_file!_00630834);
                                  }
                                  goto LAB_004ff6f7;
                                }
                                sVar2 = _strlen(pcVar3);
                                iVar1 = FUN_00498159((in_ECX + 0x2f4), (sVar2 + 1));
                                w32(local_68, 0x61, iVar1);
                                if ((s32(local_68, 0x61) === 0));
                                if ((DAT_0062f160 !== 0)) {
                                  _printf(s_found_wave_file_name_%s_0063084c, s32(local_68, 0x61));
                                }
                                w32(local_68, 1, (s32(local_68, 1) | 0x10));
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
    } while ((local_4c < 0xa));
    local_44 = 0;
  }
 LAB_004ff6f7: :
  if ((local_44 !== 0)) {
    __chdir(DAT_00655020);
    FUN_00421ea0(s_BADEVENTSFILE_00630868);
    __chdir(DAT_0064bb08);
  }
  return local_44;
}
