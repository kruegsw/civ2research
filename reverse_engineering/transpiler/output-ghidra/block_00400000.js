// Block 0x00400000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 154

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E26 */
 /* _$E31 */
 /* _$E353 */
 /* _$E354 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E31 ()

 {
  FUN_00406a9a();
  FUN_00406ab4();
  return;
}


 export function FUN_00406a9a ()

 {
  FUN_0055339f();
  return;
}


 export function FUN_00406ab4 ()

 {
  _atexit(FUN_00406ad1);
  return;
}


 export function FUN_00406ad1 ()

 {
  DAT_0063c818 = DAT_0063c818;
  return;
}


 export function FUN_00406aeb ()

 {
  DAT_00624ee0 = 1;
  return;
}


 export function FUN_00406b02 ()

 {
  FUN_00509545();
  DAT_00624ee0 = 0;
  FUN_0040733c();
  return;
}


 export function FUN_00406b28 ()

 {
  DAT_00624ee0 = 1;
  FUN_00408090();
  return 0;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00406b4c ()

 {
  let iVar1;
  let iVar2;
  let iVar3;

  iVar1 = DAT_0063c948;
  iVar2 = (DAT_0063c944 / ((DAT_006d1160) << 16 >> 16) | 0);
  if ((iVar2 < 2)) {
    iVar2 = 1;
  }
  iVar3 = (DAT_0063c948 / ((DAT_006d1162) << 16 >> 16) | 0);
  if ((iVar3 < 2)) {
    iVar3 = 1;
  }
  if ((iVar3 <= iVar2)) {
    iVar2 = iVar3;
  }
  DAT_0063c804 = iVar2;
  if ((iVar3 <= iVar2)) {
    DAT_0063c804 = iVar3;
  }
  DAT_0063c800 = iVar2 * 2;
  iVar2 = ((DAT_0063c944 - (iVar2 * 2 / 2 | 0)) / iVar2 * 2 | 0);
  DAT_0063c80c = (((DAT_006d1160) << 16 >> 16) / 2 | 0);
  if ((iVar2 <= (((DAT_006d1160) << 16 >> 16) / 2 | 0))) {
    DAT_0063c80c = iVar2;
  }
  DAT_0063c808 = ((DAT_006d1162) << 16 >> 16);
  if (((DAT_0063c948 / DAT_0063c804 | 0) <= ((DAT_006d1162) << 16 >> 16))) {
    DAT_0063c808 = (DAT_0063c948 / DAT_0063c804 | 0);
  }
  iVar2 = FUN_005adfa0((DAT_0063c944 - DAT_0063c80c * iVar2 * 2), 0, 0x3e7);
  _DAT_0063caf0 = FUN_005adfa0((iVar1 - DAT_0063c808 * DAT_0063c804), 0, 0x3e7);
  DAT_0063caf4 = (iVar2 >> 1);
  _DAT_0063caf0 = (FUN_005adfa0((iVar1 - DAT_0063c808 * DAT_0063c804), 0, 0x3e7) >> 1);
  if ((DAT_0063c808 < ((DAT_006d1162) << 16 >> 16))) {
    DAT_0063c810 = (((DAT_0066ca8a) << 16 >> 16) - (DAT_0063c808 >> 1));
    DAT_0063c810 = FUN_005adfa0((((DAT_0066ca8a) << 16 >> 16) - (DAT_0063c808 >> 1)), 0, (DAT_0066cad4 - DAT_0063c808));
  }
  else {
    DAT_0063c810 = 0;
  }
  DAT_0063c814 = FUN_005ae052((((DAT_0066ca88) << 16 >> 16) - DAT_0063c80c));
  if (((DAT_00655ae8 & 0x8000) !== 0)) {
    if ((DAT_0063c80c < ((DAT_006d1160) << 16 >> 16))) {
      DAT_0063c814 = FUN_005adfa0(FUN_005ae052((((DAT_0066ca88) << 16 >> 16) - DAT_0063c80c)), 0, (DAT_0066cad0 - DAT_0063c80c));
    }
    else {
      DAT_0063c814 = 0;
    }
  }
  if (((DAT_0063c814 & 1) !== 0)) {
    DAT_0063c814 = (DAT_0063c814 - 1);
  }
  if (((DAT_0063c810 & 1) !== 0)) {
    DAT_0063c814 = (DAT_0063c814 + 1);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00406db8 (param_1, param_2, param_3, param_4)

 {
  let local_8;

  local_8 = (param_1 - DAT_0063c814);
  if ((local_8 < 0)) {
    local_8 = (local_8 + ((DAT_006d1160) << 16 >> 16));
  }
  w32(param_4, 0, ((param_2 - DAT_0063c810) * DAT_0063c804 + DAT_0063caf0));
  w32(param_3, 0, ((local_8 >> 1) * DAT_0063c800 + DAT_0063caf4));
  if (((param_2 & 1) !== 0)) {
    w32(param_3, 0, (s32(param_3, 0) + (DAT_0063c800 >> 1)));
  }
  w32(param_3, 0, (s32(param_3, 0) + DAT_0063c93c));
  w32(param_4, 0, (s32(param_4, 0) + DAT_0063c940));
  return;
}


 export function FUN_00406e61 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 === 0)) {
    local_8 = 0xa;
  }
  else {
    iVar1 = FUN_005b8b65(param_1, param_2, DAT_006d1da0);
    if ((DAT_00655b07 === 0)) {
      local_8 = 0xa;
    }
    else {
      iVar1 = FUN_0043cf76(param_1, param_2);
      if ((s8(DAT_0064f348[iVar1 * 0x58]) !== (DAT_006d1da0 & 0xff))) {
        if ((((DAT_0064b1b0) << 16 >> 16) !== param_2)) {
          iVar1 = FUN_005b89e4(param_1, param_2);
          if ((iVar1 === 0)) {
            local_8 = 0x30;
          }
          else {
            local_8 = 0x5d;
          }
        }
        else {
          local_8 = 0x29;
        }
      }
      else {
        local_8 = s32((DAT_00655360 + s8(DAT_0064f348[iVar1 * 0x58]) * 0x10), 0);
      }
    }
  }
  return local_8;
}


 export function FUN_0040701e ()

 {
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  if ((DAT_0066cadc === 0)) {
    FUN_00406db8(DAT_0066ca90, DAT_0066ca94, DAT_ffffffe8, DAT_ffffffe0);
    FUN_00406db8(DAT_0066ca98, DAT_0066ca9c, DAT_ffffffe4, DAT_ffffffdc);
    if ((local_18 < local_1c)) {
      FUN_00408680(DAT_ffffffec, local_18, local_20, (local_1c + 1), (local_24 + 1));
      FUN_00408700(DAT_ffffffec, 0x29);
    }
    else {
      FUN_00408680(DAT_ffffffec, local_1c, local_20, (local_18 + 1), (local_24 + 1));
      FUN_00408700(DAT_ffffffec, 0x29);
    }
  }
  return;
}


 export function FUN_004070f1 (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let iVar2;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_34;
  let local_30;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  local_20 = 0x3e7;
  local_30 = -1;
  local_3c = 0x3e7;
  local_40 = -1;
  if ((DAT_00624ee0 === 0)) {
    FUN_005a9780(DAT_0063c818);
    (local_44 <= param_3 * 2) (local_44 = param_3 * -2; local_44 = (local_44 <= param_3 * 2); local_44 = (local_44 + 2)) {
      local_28 = FUN_005ae052((param_1 + local_44));
      if ((local_28 < ((DAT_006d1160) << 16 >> 16))) {
        (local_48 <= param_3 * 2) (local_48 = param_3 * -2; local_48 = (local_48 <= param_3 * 2); local_48 = (local_48 + 1)) {
          iVar1 = FUN_005ae24d(local_44, local_48);
          if ((local_34 < ((DAT_006d1162) << 16 >> 16))) {
            if (((local_28 & 1) !== 0)) {
              local_28 = (local_28 - 1);
            }
            if (((local_34 & 1) !== 0)) {
              local_34 = (local_34 + 1);
            }
            iVar1 = FUN_004087c0(local_28, local_34);
            if ((iVar1 !== 0)) {
              FUN_00406db8(local_28, local_34, DAT_ffffffe4, DAT_ffffffdc);
              local_18 = FUN_00406e61(local_28, local_34);
              FUN_00408780(local_1c, local_24, DAT_0063c800, DAT_0063c804, local_18);
              if ((param_4 !== 0)) {
                iVar1 = ((local_1c + DAT_0063c800) + -1);
                iVar2 = ((local_24 + DAT_0063c804) + -1);
                if ((local_1c < local_20)) {
                  local_20 = local_1c;
                }
                if ((local_30 < iVar1)) {
                  local_30 = iVar1;
                }
                if ((local_24 < local_3c)) {
                  local_3c = local_24;
                }
                if ((local_40 < iVar2)) {
                  local_40 = iVar2;
                }
              }
            }
          }
        }
      }
    }
    if ((-1 < local_30)) {
      FUN_0040701e();
      FUN_004086c0(DAT_ffffffec, local_20, local_3c, ((local_30 - local_20) + 1), ((local_40 - local_3c) + 1));
      FUN_00408490(DAT_ffffffec);
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0040733c ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_24;
  let local_20;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_00628044 !== 0)) {
    FUN_00552ed2();
    FUN_005a9780(DAT_0063c818);
    FUN_00406b4c();
    FUN_00408750(0);
    local_10 = (DAT_0063c940 + DAT_0063caf0);
    (local_20 < DAT_0063c808) (local_20 = 0; local_20 = (local_20 < DAT_0063c808); local_20 = (local_20 + 1)) {
      uVar1 = (local_20 + DAT_0063c810);
      if (((uVar1 & 1) === 0)) {
        local_24 = 0;
      }
      else {
        local_24 = (DAT_0063c800 >> 1);
      }
      local_c = ((DAT_0063c93c + DAT_0063caf4) + local_24);
      (local_1c < DAT_0063c80c) (local_1c = 0; local_1c = (local_1c < DAT_0063c80c); local_1c = (local_1c + 1)) {
        local_14 = FUN_005ae052((local_1c * 2 + DAT_0063c814));
        if (((local_14 & 1) !== 0)) {
          local_14 = (local_14 - 1);
        }
        if (((uVar1 & 1) !== 0)) {
          local_14 = (local_14 + 1);
        }
        iVar2 = FUN_004087c0(local_14, uVar1);
        if ((iVar2 !== 0)) {
          uVar3 = FUN_00406e61(local_14, uVar1);
          FUN_00408780(local_c, local_10, DAT_0063c800, DAT_0063c804, uVar3);
          local_c = (local_c + DAT_0063c800);
        }
      }
      local_10 = (local_10 + DAT_0063c804);
    }
    FUN_00407ff0();
    FUN_0040701e();
    FUN_00552112();
    FUN_00408460();
    FUN_00407ff0();
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004074dc (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let local_14;
  let local_10;

  param_1 = (param_1 - DAT_0063c93c);
  param_2 = (param_2 - DAT_0063c940);
  if ((param_2 < DAT_0063c948)) {
    if ((DAT_0062edf8 === 0)) {
      uVar1 = FUN_005adfa0((DAT_0063c810 + ((param_2 - DAT_0063caf0) / DAT_0063c804 | 0)), DAT_0063c810, ((DAT_0063c810 + DAT_0063c808) + -1));
      if (((uVar1 & 1) === 0)) {
        local_14 = 0;
      }
      else {
        local_14 = (DAT_0063c800 >> 1);
      }
      uVar2 = FUN_005adfa0((((param_1 - (DAT_0063caf4 + local_14)) / DAT_0063c800 | 0) * 2 + DAT_0063c814), DAT_0063c814, ((DAT_0063c80c * 2 + -2) + DAT_0063c814));
      local_10 = FUN_005ae052(uVar2);
      if (((local_10 & 1) !== 0)) {
        local_10 = (local_10 - 1);
      }
      if (((uVar1 & 1) !== 0)) {
        local_10 = (local_10 + 1);
      }
      iVar3 = FUN_004087c0(local_10, uVar1);
      if ((iVar3 !== 0)) {
        FUN_00410402(local_10, uVar1);
      }
    }
    else {
      FUN_005013bc();
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00407658 (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let local_1c;
  let local_18;
  let local_10;
  let local_c;

  param_1 = (param_1 - DAT_0063c93c);
  param_2 = (param_2 - DAT_0063c940);
  if ((param_2 < DAT_0063c948)) {
    if ((DAT_0062edf8 === 0)) {
      uVar1 = FUN_005adfa0((DAT_0063c810 + ((param_2 - DAT_0063caf0) / DAT_0063c804 | 0)), DAT_0063c810, ((DAT_0063c810 + DAT_0063c808) + -1));
      if (((uVar1 & 1) === 0)) {
        local_1c = 0;
      }
      else {
        local_1c = (DAT_0063c800 >> 1);
      }
      uVar2 = FUN_005adfa0((((param_1 - (DAT_0063caf4 + local_1c)) / DAT_0063c800 | 0) * 2 + DAT_0063c814), DAT_0063c814, ((DAT_0063c80c * 2 + -2) + DAT_0063c814));
      local_18 = FUN_005ae052(uVar2);
      if (((local_18 & 1) !== 0)) {
        local_18 = (local_18 - 1);
      }
      if (((uVar1 & 1) !== 0)) {
        local_18 = (local_18 + 1);
      }
      iVar3 = FUN_004087c0(local_18, uVar1);
      if ((iVar3 !== 0)) {
        local_10 = -1;
        (local_c < 8) (local_c = 1; local_c = (local_c < 8); local_c = (local_c + 1)) {
          if ((s16((DAT_0066ca84 + local_c * 0x3f0), 0) === 0)) {
            local_10 = local_c;
            break;
          }
        }
        if ((0 < local_10)) {
          FUN_00413717();
          FUN_00410402(local_18, uVar1);
        }
      }
    }
    else {
      FUN_005013bc();
    }
  }
  return;
}


 export function FUN_0040785b ()

 {
  let iVar1;
  let local_18;
  let local_14;
  let local_10;

  iVar1 = FUN_004080c0();
  local_14 = 0xa0;
  local_18 = 0x64;
  if ((DAT_00628060 !== 0)) {
    local_18 = 0x96;
  }
  if ((local_18 < ((DAT_006d1162) << 16 >> 16))) {
    local_18 = ((DAT_006d1162) << 16 >> 16);
  }
  local_14 = (local_14 + DAT_0063359c * 2);
  local_10 = 0;
  if ((DAT_00628060 !== 0)) {
    local_10 = (DAT_0064bcf4 + 1);
  }
  FUN_004086c0(DAT_00655324, (iVar1 - (DAT_006335a0 + local_14)), local_10, (local_14 + DAT_006335a0), ((local_18 + (DAT_0063359c + DAT_00633598)) + DAT_006335a4));
  return;
}


 export function FUN_0040795a ()

 {
  FUN_004080f0(DAT_00655324);
  return;
}


 export function FUN_00407980 ()

 {
  FUN_004080f0(DAT_00655324);
  return;
}


 export function FUN_004079a6 ()

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;

  DAT_00624ee0 = 0;
  if ((DAT_00655280 === 0)) {
    FUN_0040785b();
  }
  uVar9 = 0;
  uVar8 = 0;
  uVar7 = 6;
  iVar1 = FUN_00407fc0(DAT_00655324, 6, 0, 0);
  iVar1 = (iVar1 - DAT_006335a4);
  iVar2 = FUN_00407f90(DAT_00655324, iVar1);
  iVar2 = (iVar2 - DAT_006335a0);
  uVar4 = 6;
  uVar5 = DAT_00655324;
  uVar6 = DAT_00655328;
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x18), 0), 6, DAT_00655324, DAT_00655328, iVar2)
  ;
  FUN_005534bc(uVar3, uVar4, uVar5, uVar6, iVar2, iVar1, uVar7, uVar8, uVar9);
  FUN_00408370(0x28, 0x19);
  DAT_0063c818 = DAT_0063c818;
  FUN_00408130(LAB_004022de);
  FUN_00408170(LAB_00401942);
  DAT_0063c870 = DAT_0063c870;
  tie(thunk_FUN_00411f91);
  FUN_00408010(0x1ff);
  FUN_00408050(1);
  FUN_00408270(LAB_00403d05);
  FUN_004082b0(LAB_00401956);
  FUN_00408230(LAB_0040322e);
  FUN_004082f0(LAB_004012a8);
  FUN_00408330(LAB_00403931);
  FUN_005bb574();
  if ((DAT_00655b02 !== 1)) {
    FUN_004085f0();
  }
  return;
}


 export function FUN_00407b31 ()

 {
  DAT_00624ee0 = 1;
  FUN_004083b0();
  return;
}


 export function FUN_00407f90 (param_1)

 {
  return (s32(param_1, 2) - s32(param_1, 0));
}


 export function FUN_00407fc0 (param_1)

 {
  return (s32((param_1 + 0xc), 0) - s32((param_1 + 4), 0));
}


 export function FUN_00407ff0 ()

 {
  FUN_005bbbce();
  return;
}


 export function FUN_00408010 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bd05f(s32((in_ECX + 8), 0), param_1);
  return;
}


 export function FUN_00408050 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bce5f(s32((in_ECX + 8), 0), param_1);
  return;
}


 export function FUN_00408090 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bc636(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_004080c0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bc933(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_004080f0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bcb85(s32((in_ECX + 8), 0), param_1);
  return;
}


 export function FUN_00408130 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0xc), 0);
  w32((in_ECX + 0xc), 0, param_1);
  return uVar1;
}


 export function FUN_00408170 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x18), 0);
  w32((in_ECX + 0x18), 0, param_1);
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* virtual */  /* int */  /* __thiscall */
 /* COleControlSite::SetDlgCtrlID(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function SetDlgCtrlID (this, param_1)

 {
  let iVar1;

  iVar1 = s32((this + 0x28), 0);
  w32((this + 0x28), 0, param_1);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Same */  /* Base */
 /* Name */     /* public: */  /* class */  /* basic_ostream<char,struct */  /* char_traits<char> */  /* > */  /* * */  /* __thiscall */
 /* basic_ios<char,struct */    /* char_traits<char> */  /* >::tie(class */  /* basic_ostream<char,struct */  /* char_traits<char> */  /* > */
 /* *) */     /* public: */  /* class */  /* basic_ostream<unsigned */  /* short,struct */  /* char_traits<unsigned */  /* short> */  /* > */  /* * */
 /* __thiscall */    /* basic_ios<unsigned */  /* short,struct */  /* char_traits<unsigned */  /* short> */  /* >::tie(class */
 /* basic_ostream<unsigned */    /* short,struct */  /* char_traits<unsigned */  /* short> */  /* > */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function tie (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x2c), 0);
  w32((in_ECX + 0x2c), 0, param_1);
  return uVar1;
}


 export function FUN_00408230 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x30), 0);
  w32((in_ECX + 0x30), 0, param_1);
  return uVar1;
}


 export function FUN_00408270 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x34), 0);
  w32((in_ECX + 0x34), 0, param_1);
  return uVar1;
}


 export function FUN_004082b0 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x38), 0);
  w32((in_ECX + 0x38), 0, param_1);
  return uVar1;
}


 export function FUN_004082f0 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x40), 0);
  w32((in_ECX + 0x40), 0, param_1);
  return uVar1;
}


 export function FUN_00408330 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x44), 0);
  w32((in_ECX + 0x44), 0, param_1);
  return uVar1;
}


 export function FUN_00408370 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x7c), 0, param_1);
  w32((in_ECX + 0x80), 0, param_2);
  return;
}


 export function FUN_004083b0 ()

 {
  FUN_00408420();
  FUN_004083f0();
  return;
}


 export function FUN_004083f0 ()

 {
  FUN_005bd65c(0, 0);
  return;
}


 export function FUN_00408420 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005bc0ab(s32((in_ECX + 8), 0));
  w32((in_ECX + 8), 0, uVar1);
  return;
}


 export function FUN_00408460 ()

 {
  FUN_00408490(0);
  return;
}


 export function FUN_00408490 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    if ((in_ECX === 0)) {
      local_c = 0;
    }
    else {
      local_c = (in_ECX + 0x48);
    }
    FUN_005c0979(local_c, (in_ECX + 0x24), (in_ECX + 0x24));
    FUN_00408580((in_ECX + 0x24));
  }
  else {
    if ((in_ECX === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = (in_ECX + 0x48);
    }
    FUN_005c0979(local_8, param_1, param_1);
    FUN_00408580(param_1);
  }
  return;
}


 export function FUN_00408580 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bc6bb(s32((in_ECX + 8), 0), param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x110), 0, param_1);
  return;
}


 export function FUN_004085f0 ()

 {
  FUN_00408620();
  return;
}


 export function FUN_00408620 ()

 {
  FUN_00408650();
  FUN_005c5b7f();
  return;
}


 export function FUN_00408650 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bc40a(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_00408680 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_006e7d90(param_1, param_2, param_3, param_4, param_5);
  return;
}


 export function FUN_004086c0 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_006e7d90(param_1, param_2, param_3, (param_4 + param_2), (param_5 + param_3));
  return;
}


 export function FUN_00408700 (param_1, param_2)

 {
  FUN_005a98e4(DAT_00635c64, s32(param_1, 0), s32(param_1, 1), (s32(param_1, 2) + -1), (s32(param_1, 3) + -1), param_2);
  return;
}


 export function FUN_00408750 (param_1)

 {
  FUN_005a9aa3(DAT_00635c64, param_1);
  return;
}


 export function FUN_00408780 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005a9abf(DAT_00635c64, param_1, param_2, param_3, param_4, param_5);
  return;
}


 export function FUN_004087c0 (param_1, param_2)

 {
  let uVar1;

  if ((((DAT_006d1160) << 16 >> 16) <= param_1)) {
    uVar1 = 0;
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_00408830 (param_1, param_2)

 {
  let local_8;

  (local_8 < ((DAT_006d1164) << 16 >> 16)) (local_8 = 0; local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
    _MEM[param_1] = param_2;
    param_1 = (param_1 + 6);
  }
  return;
}


 export function FUN_00408873 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = (((((DAT_006d1160) << 16 >> 16) * param_3 + param_2) * 6 & 0xffff) + param_1);
  (local_10 < param_5) (local_10 = 0; local_10 = (local_10 < param_5); local_10 = (local_10 + 1)) {
    local_8 = local_14;
    (local_c < param_4) (local_c = 0; local_c = (local_c < param_4); local_c = (local_c + 1)) {
      _MEM[local_8] = param_6;
      local_8 = (local_8 + 6);
    }
    local_14 = (local_14 + ((DAT_006d1160) << 16 >> 16) * 6);
  }
  return;
}


 export function FUN_00408903 (param_1, param_2)

 {
  let local_8;

  (local_8 < ((DAT_006d1164) << 16 >> 16)) (local_8 = 0; local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
    _MEM[param_1] = _MEM[param_2];
    param_2 = (param_2 + 6);
    param_1 = (param_1 + 6);
  }
  return;
}


 export function FUN_0040894c ()

 {
  FUN_00407ff0();
  if ((2 < DAT_00655b02)) {
    FUN_0047e94e(1, 0);
  }
  return;
}


 export function FUN_0040897f ()

 {
  let bVar1;
  let pbVar2;
  let iVar3;
  let local_84;
  let aiStack_80;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  (local_28 < 0x40) (local_28 = 0; local_28 = (local_28 < 0x40); local_28 = (local_28 + 1)) {
    w16((DAT_00666132 + local_28 * 0x10), 0, 0);
  }
  (local_1c < 0x16) (local_1c = 0; local_1c = local_1c; local_1c = (local_1c + 1)) {
    iVar3 = (local_1c % 0xb);
    w32(DAT_ffffff80, local_1c, (s8(DAT_00627cca[local_1c * 0x18]) * 3 + s8(DAT_00627ccc[local_1c * 0x18])));
    if ((iVar3 !== 2)) {
      w32(DAT_ffffff80, local_1c, (s32(DAT_ffffff80, local_1c) + s8(DAT_00627ccb[local_1c * 0x18]) * 2));
    }
    if ((DAT_00627ccf[iVar3 * 0x18] === 0xfe)) {
      if ((iVar3 === 4)) {
        w32(DAT_ffffff80, local_1c, (s32(DAT_ffffff80, local_1c) + 3));
      }
      else {
        w32(DAT_ffffff80, local_1c, (s32(DAT_ffffff80, local_1c) + 1));
      }
    }
    else if ((DAT_00627cce[iVar3 * 0x18] === 0xfe)) {
      w32(DAT_ffffff80, local_1c, (s32(DAT_ffffff80, local_1c) + 2));
    }
  }
  (local_24 < ((DAT_006d1162) << 16 >> 16)) (local_24 = 0; local_24 = local_24; local_24 = (local_24 + 1)) {
    (local_20 < ((DAT_006d1160) << 16 >> 16)) (local_20 = u8(((local_24 & 1) !== 0)); local_20 = local_20;
        local_20 = (local_20 + 2)) {
      bVar1 = FUN_005b89bb(local_20, local_24);
      local_1c = u8(bVar1);
      if ((local_1c === 1)) {
        local_c = 0;
        (local_10 < 0x15) (local_10 = 0; local_10 = (local_10 < 0x15); local_10 = (local_10 + 1)) {
          local_8 = 0;
          local_14 = FUN_005ae052((s8(DAT_00628370[local_10]) + local_20));
          local_18 = (s8(DAT_006283a0[local_10]) + local_24);
          iVar3 = FUN_004087c0(local_14, local_18);
          if ((iVar3 !== 0)) {
            bVar1 = FUN_005b89bb(local_14, local_18);
            local_84 = u8(bVar1);
            if ((iVar3 !== 0)) {
              local_8 = (local_8 + 2);
            }
            iVar3 = FUN_005b8ee1(local_14, local_18);
            if ((local_10 !== 0x14)) {
              local_84 = (local_84 + 0xb);
            }
            local_8 = (local_8 + s32(DAT_ffffff80, local_84));
            pbVar2 = FUN_005b8931(local_14, local_18);
            if (((_MEM[pbVar2] & 0x80) !== 0)) {
              local_8 = (local_8 + 1);
            }
            if ((local_10 === 0x14)) {
              local_8 = local_8 * 4;
              pbVar2 = FUN_005b8931(local_14, local_18);
              iVar3 = local_8;
              if (((_MEM[pbVar2] & 0x80) !== 0)) {
                iVar3 = (local_8 + (local_8 / 2 | 0));
              }
            }
            local_8 = iVar3;
            local_c = (local_c + local_8);
          }
        }
        if ((iVar3 === 0)) {
          local_c = (local_c + -16);
        }
        iVar3 = FUN_005adfa0(((local_c + -120) >> 3), 1, 0xf);
        local_8 = ((iVar3 >> 1) + 8);
        local_28 = FUN_005b8a81(local_20, local_24);
        if ((-1 < local_28)) {
          w16((DAT_00666132 + local_28 * 0x10), 0, (s16((DAT_00666132 + local_28 * 0x10), 0) + 1));
        }
        iVar3 = FUN_005b8931(local_20, local_24);
        _MEM[(iVar3 + 5)] = (((local_8) & 0xFF) + 0xf0);
      }
      else {
        iVar3 = FUN_005b8931(local_20, local_24);
        _MEM[(iVar3 + 5)] = 0xf0;
      }
    }
  }
  return;
}


 export function FUN_00408d33 (param_1)

 {
  let bVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let puVar5;
  let uVar6;
  let iVar7;
  let unaff_FS_OFFSET;
  let local_3ec;
  let local_3e4;
  let local_3dc;
  let local_3d4;
  let local_3bc;
  let local_3b8;
  let local_3b4;
  let local_3b0;
  let local_3ac;
  let local_398;
  let local_390;
  let local_388;
  let local_35c;
  let local_358;
  let local_354;
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
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0040a55a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_0040bc40(8);
  FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 8), 0));
  FUN_0059e6a9(uVar2);
  FUN_0059e6ff(0x100);
  FUN_0059e18b(DAT_00624efc, -1, -1, -1, 0);
  FUN_0040bbb0();
  FUN_0040bbe0(DAT_00624f00);
  FUN_0040bc10(8);
  FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
  FUN_0059e18b(DAT_00624f04, -1, -1, -1, 0);
  FUN_0040bc80(0);
  FUN_00408010(0x200);
  FUN_00408010(0x200);
  FUN_00484d52();
  if ((param_1 === 0)) {
    (local_398 < 0x15) (local_398 = 0; local_398 = (local_398 < 0x15); local_398 = (local_398 + 1)) {
      w16((DAT_00627fe0 + local_398 * 2), 0, 0xffff);
      w16((DAT_00628010 + local_398 * 2), 0, 0xffff);
    }
    FUN_005b85fe();
    if (((DAT_00655ae8 & 0x8000) !== 0)) {
      DAT_00624ef4 = (DAT_00624ef4 << 1);
      DAT_00624ef0 = (DAT_00624ef0 << 1);
    }
    DAT_006d1166 = (DAT_00655ae8 & 0x8000);
    FUN_005b7fe0();
    DAT_0063cba4 = 0;
    FUN_00408830(DAT_00636598, 0xa);
    FUN_00408830((DAT_00636598 + 1), 0);
    DAT_0063cba0 = 0;
    DAT_0063cb94 = (((DAT_006d1162) << 16 >> 16) + -1);
    DAT_0063cb9c = 3;
    DAT_0063cb98 = (((DAT_006d1160) << 16 >> 16) + -3);
    uVar3 = _rand();
    uVar6 = (uVar3 >> 0x1f);
    local_44 = (((((uVar3 ^ uVar6) - uVar6) & 1) ^ uVar6) - uVar6);
    if ((local_44 === 0)) {
      DAT_0063cb94 = (((DAT_006d1162) << 16 >> 16) + -5);
    }
    else {
      DAT_0063cba0 = 4;
    }
    iVar4 = DAT_00624eec;
    if ((DAT_00624eec < 1)) {
      iVar4 = 0;
    }
    local_20 = ((((DAT_006d1162) << 16 >> 16) * ((DAT_006d1160) << 16 >> 16) >> 1) / 0x190 | 0);
    local_14 = (local_20 * (((DAT_00624ee8 * 8 + 8) + iVar4 * 8) * 5 + 0x50) * 8 / 0xa | 0);
    do {
      FUN_0040a572(0);
    } while ((DAT_0063cba4 < local_14)) {
      if ((s16((DAT_00666130 + local_48 * 0x10), 0) !== 0)) {
        local_358 = (local_358 + 1);
      }
    }
    local_24 = (0x40 - (local_358 + 1));
    if ((0 < local_24)) {
      (local_48 < local_24) (local_48 = 0; local_48 = local_48; local_48 = (local_48 + 1)) {
        FUN_0040a572(1);
      }
    }
    (local_354 < (((DAT_006d1162) << 16 >> 16) + -2)) (local_354 = 1; local_354 = local_354; local_354 = (local_354 + 1)) {
      (local_5c < (((DAT_006d1160) << 16 >> 16) + -2)) (local_5c = (local_354 & 1); local_5c = local_5c; local_5c = (local_5c + 2)) {
        local_38 = 0;
        iVar4 = FUN_005b8931(local_5c, local_354);
        if ((_MEM[(iVar4 + 1)] !== 0)) {
          local_38 = (local_38 | 1);
        }
        iVar4 = FUN_005b8931((local_5c + 1), (local_354 + 1));
        if ((_MEM[(iVar4 + 1)] !== 0)) {
          local_38 = (local_38 | 2);
        }
        iVar4 = FUN_005b8931((local_5c + 1), (local_354 - 1));
        if ((_MEM[(iVar4 + 1)] !== 0)) {
          local_38 = (local_38 | 4);
        }
        iVar4 = FUN_005b8931((local_5c + 2), local_354);
        if ((_MEM[(iVar4 + 1)] !== 0)) {
          local_38 = (local_38 | 8);
        }
        if ((local_38 === 9)) {
          iVar4 = FUN_005b8931((local_5c + 1), (local_354 + 1));
          _MEM[(iVar4 + 1)] = 1;
          iVar4 = FUN_005b8931((local_5c + 1), (local_354 - 1));
          _MEM[(iVar4 + 1)] = 1;
          iVar4 = FUN_005b8931((local_5c + 2), local_354);
          _MEM[(iVar4 + 1)] = 1;
          if ((local_354 < 2)) {
            if ((local_354 < 2)) {
              if ((1 < local_5c)) {
                local_5c = (local_5c - 2);
              }
            }
            else {
              local_354 = (local_354 - 1);
              local_5c = (local_5c + 1);
            }
          }
          else {
            local_5c = (local_5c - 1);
            local_354 = (local_354 - 1);
          }
        }
      }
    }
    FUN_0040894c();
    if (((DAT_00655ae8 & 0x8000) === 0)) {
      local_4c = (((DAT_006d1162) << 16 >> 16) / 0xc | 0);
    }
    else {
      local_4c = ((((DAT_006d1162) << 16 >> 16) + ((((DAT_006d1162) << 16 >> 16) >> 0x1f) & 7)) >> 3);
    }
    if ((local_4c < 3)) {
      local_4c = 2;
    }
    local_50 = DAT_00636598;
    local_354 = 0;
    local_5c = 0;
    (local_30 < ((DAT_006d1164) << 16 >> 16)) (local_30 = 0; local_30 = local_30; local_30 = (local_30 + 1)) {
      local_35c = u8(local_50[1]);
      if ((local_35c === 0)) {
        local_38 = 0xa;
      }
      else if ((local_35c === 1)) {
        local_58 = DAT_00624ef0 * -3;
        if (((DAT_00655ae8 & 0x8000) !== 0)) {
          local_58 = DAT_00624ef0 * -6;
        }
        iVar7 = ((((DAT_006d1162) << 16 >> 16) >> 1) + 8);
        uVar3 = _rand();
        uVar6 = (uVar3 >> 0x1f);
        iVar4 = ((local_354 + (((((uVar3 ^ uVar6) - uVar6) & 0xf) ^ uVar6) - uVar6)) + 1);
        if (((iVar7 === iVar4) || ((iVar7 - iVar4) < 0))) {
          iVar4 = ((DAT_006d1162) << 16 >> 16);
          uVar3 = _rand();
          uVar6 = (uVar3 >> 0x1f);
          local_28 = ((~(((iVar4 >> 1) + 8) - ((local_354 + (((((uVar3 ^ uVar6) - uVar6) & 0xf) ^ uVar6) - uVar6)) + 1))) + 1);
        }
        else {
          iVar4 = ((DAT_006d1162) << 16 >> 16);
          uVar3 = _rand();
          uVar6 = (uVar3 >> 0x1f);
          local_28 = (((iVar4 >> 1) + 8) - ((local_354 + (((((uVar3 ^ uVar6) - uVar6) & 0xf) ^ uVar6) - uVar6)) + 1));
        }
        local_28 = (local_28 + local_58);
        if ((local_28 < 1)) {
          local_28 = 0;
        }
        local_28 = (local_28 / local_4c | 0);
        /* switch */ () {
        case 0 :
          local_38 = 0;
          break;
        case 1 :
        case 2 :
        case 3 :
          local_38 = 1;
          break;
        case 4 :
          uVar3 = _rand();
          uVar6 = (uVar3 >> 0x1f);
          if ((((((uVar3 ^ uVar6) - uVar6) & 1) ^ uVar6) === uVar6)) {
            local_38 = 1;
          }
          else {
            local_38 = 6;
          }
          break;
        case 5 :
        case 6 :
          local_38 = 6;
          break;
        default :
          local_38 = 7;
        }
      }
      else if ((local_35c === 2)) {
        local_38 = 4;
      }
      else {
        local_38 = 5;
      }
      _MEM[local_50] = ((local_38) & 0xFF);
      local_50 = (local_50 + 6);
      local_5c = (local_5c + 2);
      if ((((DAT_006d1160) << 16 >> 16) <= local_5c)) {
        local_354 = (local_354 + 1);
        local_5c = (local_354 & 1);
      }
      FUN_0040894c();
    }
    local_50 = DAT_00636598;
    local_34 = (DAT_00636598 + (((DAT_006d1164) << 16 >> 16) * 3 + -3) * 2);
    (local_354 < ((DAT_006d1162) << 16 >> 16)) (local_354 = 0; local_354 = local_354; local_354 = (local_354 + 1)) {
      if ((((((DAT_006d1162) << 16 >> 16) >> 1) === local_354) || (((((DAT_006d1162) << 16 >> 16) >> 1) - local_354) < 0))) {
        local_28 = ((~((((DAT_006d1162) << 16 >> 16) >> 1) - local_354)) + 1);
      }
      else {
        local_28 = ((((DAT_006d1162) << 16 >> 16) >> 1) - local_354);
      }
      if ((((((DAT_006d1162) << 16 >> 16) >> 2) === local_28) || (((((DAT_006d1162) << 16 >> 16) >> 2) - local_28) < 0))) {
        local_3ac = ((~((((DAT_006d1162) << 16 >> 16) >> 2) - local_28)) + 1);
      }
      else {
        local_3ac = ((((DAT_006d1162) << 16 >> 16) >> 2) - local_28);
      }
      if ((((DAT_00624ef4 * 4 + 4) + local_3ac) < 1)) {
        local_54 = 0;
      }
      else {
        if ((((((DAT_006d1162) << 16 >> 16) >> 2) === local_28) || (((((DAT_006d1162) << 16 >> 16) >> 2) - local_28) < 0))) {
          local_3b0 = ((~((((DAT_006d1162) << 16 >> 16) >> 2) - local_28)) + 1);
        }
        else {
          local_3b0 = ((((DAT_006d1162) << 16 >> 16) >> 2) - local_28);
        }
        local_54 = _rand();
        local_54 = (local_54 % ((DAT_00624ef4 * 4 + local_3b0) + 5));
      }
      (local_5c < ((DAT_006d1160) << 16 >> 16)) (local_5c = u8(((local_354 & 1) !== 0)); local_5c = local_5c;
          local_5c = (local_5c + 2)) {
        bVar1 = _MEM[local_50];
        if ((bVar1 === 0xa)) {
          if ((((((DAT_006d1162) << 16 >> 16) >> 2) === local_28) || (((((DAT_006d1162) << 16 >> 16) >> 2) - local_28) < 0))) {
            local_3b4 = ((~((((DAT_006d1162) << 16 >> 16) >> 2) - local_28)) + 1);
          }
          else {
            local_3b4 = ((((DAT_006d1162) << 16 >> 16) >> 2) - local_28);
          }
          if ((local_54 < ((DAT_00624ef4 * 4 + 4) + local_3b4))) {
            local_54 = (local_54 + 1);
          }
        }
        else if ((0 < local_54)) {
          if (((DAT_00624ef4 * -2 !== -6) && (-1 < (DAT_00624ef4 * -2 + 6)))) {
            iVar4 = _rand();
            local_54 = (local_54 - (iVar4 % (DAT_00624ef4 * -2 + 7)));
          }
          /* switch */ () {
          case 0 :
            _MEM[local_50] = 1;
            break;
          case 1 :
            _MEM[local_50] = 2;
            break;
          case 4 :
            _MEM[local_50] = 3;
            break;
          case 5 :
            local_54 = (local_54 + -3);
            break;
          case 6 :
            _MEM[local_50] = 3;
          }
        }
        local_50 = (local_50 + 6);
      }
      local_54 = 0;
      (-1 < local_5c) (local_5c = (((DAT_006d1160) << 16 >> 16) - ((local_354 & 1) + 1)); -1 = (-1 < local_5c);
          local_5c = (local_5c - 2)) {
        bVar1 = _MEM[local_34];
        if ((bVar1 === 0xa)) {
          if ((local_54 < (((local_28 >> 1) + DAT_00624ef4) + 1))) {
            local_54 = (local_54 + 1);
          }
        }
        else if ((0 < local_54)) {
          iVar4 = (-(DAT_00624ef4 * 2 + 2));
          if (((iVar4 !== -6) && (-1 < (iVar4 + 6)))) {
            iVar4 = _rand();
            local_54 = (local_54 - (iVar4 % (7 - (DAT_00624ef4 * 2 + 2))));
          }
          /* switch */ () {
          case 0 :
            _MEM[local_34] = 1;
            break;
          case 1 :
            _MEM[local_34] = 2;
            break;
          case 2 :
            if ((local_28 < (((DAT_006d1162) << 16 >> 16) * 3 / 0xa | 0))) {
              if ((local_28 < 0xa)) {
                _MEM[local_34] = 9;
              }
              else {
                _MEM[local_34] = 8;
              }
            }
            else {
              _MEM[local_34] = 3;
            }
            local_54 = (local_54 + -2);
            break;
          case 4 :
            _MEM[local_34] = 3;
            break;
          case 5 :
            local_54 = (local_54 + -3);
            break;
          case 6 :
            _MEM[local_34] = 1;
            break;
          case 8 :
            _MEM[local_34] = 3;
          }
        }
        local_34 = (local_34 + -6);
      }
      FUN_0040894c();
    }
    (local_48 < (DAT_00624ef8 * 5 + 0xa) * 0xa0) (local_48 = 0; local_48 = local_48; local_48 = (local_48 + 1)) {
      if (((local_48 & 1) === 0)) {
        if (((((DAT_006d1162) << 16 >> 16) === 1) || ((((DAT_006d1162) << 16 >> 16) + -1) < 0))) {
          local_354 = 0;
        }
        else {
          iVar4 = _rand();
          local_354 = (iVar4 % ((DAT_006d1162) << 16 >> 16));
        }
        if ((((((DAT_006d1160) << 16 >> 16) / 2 | 0) === 1) || (((((DAT_006d1160) << 16 >> 16) / 2 | 0) + -1) < 0))) {
          local_3b8 = 0;
        }
        else {
          local_3b8 = _rand();
          local_3b8 = (local_3b8 % (((DAT_006d1160) << 16 >> 16) / 2 | 0));
        }
        local_5c = ((local_354 & 1) + local_3b8 * 2);
      }
      else {
        uVar3 = _rand();
        uVar6 = (uVar3 >> 0x1f);
        iVar4 = (((((uVar3 ^ uVar6) - uVar6) & 7) ^ uVar6) - uVar6);
        local_5c = FUN_005ae052((s8(DAT_00628350[iVar4]) + local_5c));
        local_354 = (local_354 + s8(DAT_00628360[iVar4]));
      }
      if ((((((DAT_006d1162) << 16 >> 16) >> 1) === local_354) || (((((DAT_006d1162) << 16 >> 16) >> 1) - local_354) < 0))) {
        local_28 = ((~((((DAT_006d1162) << 16 >> 16) >> 1) - local_354)) + 1);
      }
      else {
        local_28 = ((((DAT_006d1162) << 16 >> 16) >> 1) - local_354);
      }
      iVar4 = FUN_004087c0(local_5c, local_354);
      if ((iVar4 !== 0)) {
        local_50 = FUN_005b8931(local_5c, local_354);
        /* switch */ (_MEM[local_50]) {
        case 0 :
          _MEM[local_50] = 1;
          break;
        case 1 :
          _MEM[local_50] = 4;
          break;
        case 2 :
          _MEM[local_50] = 3;
          break;
        case 3 :
          if ((local_28 < (((DAT_006d1162) << 16 >> 16) * 3 / 0xa | 0))) {
            _MEM[local_50] = 9;
          }
          else {
            _MEM[local_50] = 1;
          }
          break;
        case 4 :
          _MEM[local_50] = 5;
          break;
        case 5 :
          FUN_0040ab41(local_5c, local_354);
          break;
        case 6 :
          _MEM[local_50] = 4;
          break;
        case 7 :
          _MEM[local_50] = 5;
          break;
        case 8 :
          _MEM[local_50] = 2;
          break;
        case 9 :
          _MEM[local_50] = 8;
        }
      }
    }
    FUN_0040894c();
    (local_48 < (3 - (DAT_00624ef8 + 2)) * 0x320) (local_48 = 0; local_48 = local_48; local_48 = (local_48 + 1)) {
      if (((local_48 & 1) === 0)) {
        if (((((DAT_006d1162) << 16 >> 16) === 1) || ((((DAT_006d1162) << 16 >> 16) + -1) < 0))) {
          local_354 = 0;
        }
        else {
          iVar4 = _rand();
          local_354 = (iVar4 % ((DAT_006d1162) << 16 >> 16));
        }
        if ((((((DAT_006d1160) << 16 >> 16) / 2 | 0) === 1) || (((((DAT_006d1160) << 16 >> 16) / 2 | 0) + -1) < 0))) {
          local_3bc = 0;
        }
        else {
          local_3bc = _rand();
          local_3bc = (local_3bc % (((DAT_006d1160) << 16 >> 16) / 2 | 0));
        }
        local_5c = ((local_354 & 1) + local_3bc * 2);
        local_390 = -1;
      }
      else {
        uVar3 = _rand();
        uVar6 = (uVar3 >> 0x1f);
        iVar4 = (((((uVar3 ^ uVar6) - uVar6) & 7) ^ uVar6) - uVar6);
        local_5c = FUN_005ae052((s8(DAT_00628350[iVar4]) + local_5c));
        local_354 = (local_354 + s8(DAT_00628360[iVar4]));
      }
      iVar4 = FUN_004087c0(local_5c, local_354);
      if ((iVar4 === 0)) {
        bVar1 = FUN_005b89bb(local_5c, local_354);
        local_40 = u8(bVar1);
        if ((local_390 !== local_40)) {
          local_2c = u8((2 < local_40));
          local_50 = FUN_005b8931(local_5c, local_354);
          (local_40 < 0xb) (local_40 = 0; local_40 = local_40; local_40 = (local_40 + 1)) {
            w32(DAT_fffffc78, local_40, 0);
          }
          if ((DAT_00624ef4 === -1)) {
            local_388 = (UNNAMED + 1);
            local_388 = (UNNAMED + 1);
            local_388 = (UNNAMED + -1);
          }
          else if ((DAT_00624ef4 === 1)) {
            local_388 = (UNNAMED + 1);
            local_388 = (UNNAMED + 1);
            if ((-1 < DAT_00624ef0)) {
              local_388 = (UNNAMED + 1);
            }
          }
          if ((DAT_00624ef0 === -1)) {
            local_388 = (UNNAMED + 1);
            local_388 = (UNNAMED + 1);
            local_388 = (UNNAMED + -1);
          }
          else if ((DAT_00624ef0 === 1)) {
            local_388 = (UNNAMED + 1);
            local_388 = (UNNAMED + -1);
            local_388 = (UNNAMED + -1);
            if ((DAT_00624ef4 === -1)) {
              local_388 = (UNNAMED + -1);
              local_388 = (UNNAMED + -1);
            }
          }
          (local_30 < 8) (local_30 = 0; local_30 = local_30; local_30 = (local_30 + 1)) {
            uVar2 = FUN_005ae052((s8(DAT_00628350[local_30]) + local_5c));
            local_3c = (s8(DAT_00628360[local_30]) + local_354);
            iVar4 = FUN_004087c0(uVar2, local_3c);
            if ((iVar4 !== 0)) {
              bVar1 = FUN_005b89bb(uVar2, local_3c);
              local_40 = u8(bVar1);
              if ((local_40 !== 0xa)) {
                if ((s32(DAT_fffffc78, local_40) !== 0)) {
                  w32(DAT_fffffc78, local_40, (s32(DAT_fffffc78, local_40) + 1));
                }
                if (((local_30 & 1) === 0)) {
                  w32(DAT_fffffc78, local_40, (s32(DAT_fffffc78, local_40) + 1));
                }
                w32(DAT_fffffc78, local_40, (s32(DAT_fffffc78, local_40) + 1));
              }
            }
          }
          local_1c = 0;
          (local_40 < 0xb) (local_40 = 0; local_40 = local_40; local_40 = (local_40 + 1)) {
            if ((local_1c < s32(DAT_fffffc78, local_40))) {
              local_1c = s32(DAT_fffffc78, local_40);
              _MEM[local_50] = ((local_40) & 0xFF);
              local_390 = local_40;
            }
          }
        }
      }
    }
    FUN_0040894c();
    FUN_0040ac5a();
    FUN_0040894c();
  }
  if (((DAT_00655ae8 & 0x8000) === 0)) {
    (local_5c < ((DAT_006d1160) << 16 >> 16)) (local_5c = 0; local_5c = local_5c; local_5c = (local_5c + 2)) {
      iVar4 = FUN_005b89e4((local_5c + 1), 1);
      if ((iVar4 === 0)) {
        puVar5 = FUN_005b8931(local_5c, 0);
        _MEM[puVar5] = 7;
      }
      iVar4 = FUN_005b89e4(local_5c, (((DAT_006d1162) << 16 >> 16) + -2));
      if ((iVar4 === 0)) {
        puVar5 = FUN_005b8931((local_5c + 1), (((DAT_006d1162) << 16 >> 16) + -1));
        _MEM[puVar5] = 7;
      }
    }
  }
  FUN_004b32fe();
  FUN_0055a980();
  FUN_0040897f();
  if (((DAT_00655ae8 & 0x8000) === 0)) {
    (local_5c < ((DAT_006d1160) << 16 >> 16)) (local_5c = 0; local_5c = local_5c; local_5c = (local_5c + 2)) {
      puVar5 = FUN_005b8931(local_5c, 0);
      _MEM[puVar5] = 7;
      puVar5 = FUN_005b8931((local_5c + 1), (((DAT_006d1162) << 16 >> 16) + -1));
      _MEM[puVar5] = 7;
    }
    if ((param_1 === 0)) {
      (local_48 < (((DAT_006d1160) << 16 >> 16) >> 3)) (local_48 = 0; local_48 = local_48; local_48 = (local_48 + 1)) {
        if ((((((DAT_006d1160) << 16 >> 16) / 2 | 0) === 1) || (((((DAT_006d1160) << 16 >> 16) / 2 | 0) + -1) < 0))) {
          local_3d4 = 0;
        }
        else {
          local_3d4 = _rand();
          local_3d4 = (local_3d4 % (((DAT_006d1160) << 16 >> 16) / 2 | 0));
        }
        puVar5 = FUN_005b8931(local_3d4 * 2, 0);
        _MEM[puVar5] = 6;
        if ((((((DAT_006d1160) << 16 >> 16) / 2 | 0) === 1) || (((((DAT_006d1160) << 16 >> 16) / 2 | 0) + -1) < 0))) {
          local_3dc = 0;
        }
        else {
          local_3dc = _rand();
          local_3dc = (local_3dc % (((DAT_006d1160) << 16 >> 16) / 2 | 0));
        }
        puVar5 = FUN_005b8931((local_3dc * 2 + 1), 1);
        _MEM[puVar5] = 6;
        if ((((((DAT_006d1160) << 16 >> 16) / 2 | 0) === 1) || (((((DAT_006d1160) << 16 >> 16) / 2 | 0) + -1) < 0))) {
          local_3e4 = 0;
        }
        else {
          local_3e4 = _rand();
          local_3e4 = (local_3e4 % (((DAT_006d1160) << 16 >> 16) / 2 | 0));
        }
        puVar5 = FUN_005b8931((local_3e4 * 2 + 1), (((DAT_006d1162) << 16 >> 16) + -1));
        _MEM[puVar5] = 6;
        if ((((((DAT_006d1160) << 16 >> 16) / 2 | 0) === 1) || (((((DAT_006d1160) << 16 >> 16) / 2 | 0) + -1) < 0))) {
          local_3ec = 0;
        }
        else {
          local_3ec = _rand();
          local_3ec = (local_3ec % (((DAT_006d1160) << 16 >> 16) / 2 | 0));
        }
        puVar5 = FUN_005b8931(local_3ec * 2, (((DAT_006d1162) << 16 >> 16) + -2));
        _MEM[puVar5] = 6;
      }
    }
  }
  FUN_00408830((DAT_00636598 + 1), 0);
  if ((DAT_00628060 === 0)) {
    local_50 = DAT_00636598;
    local_354 = 0;
    local_5c = 0;
    (local_48 < ((DAT_006d1164) << 16 >> 16)) (local_48 = 0; local_48 = local_48; local_48 = (local_48 + 1)) {
      if ((iVar4 !== 0)) {
        local_18 = 0;
        (local_30 < 0x14) (local_30 = 0; (local_18 = (local_18 === 0) && (local_30 = local_30)); local_30 = (local_30 + 1)) {
          uVar2 = FUN_005ae052((s8(DAT_00628370[local_30]) + local_5c));
          local_3c = (s8(DAT_006283a0[local_30]) + local_354);
          iVar4 = FUN_004087c0(uVar2, local_3c);
          if ((iVar4 === 0)) {
            local_18 = 1;
          }
        }
        if ((local_18 === 0)) {
          _MEM[local_50] = (_MEM[local_50] | 0x40);
        }
      }
      local_50 = (local_50 + 6);
      local_5c = (local_5c + 2);
      if ((((DAT_006d1160) << 16 >> 16) <= local_5c)) {
        local_354 = (local_354 + 1);
        local_5c = (local_354 & 1);
      }
      FUN_0040894c();
    }
  }
  FID_conflict:_memcpy(DAT_006d1188, DAT_00636598, 6);
  FUN_00408010(0x201);
  FUN_00484d52();
  local_8 = -1;
  FUN_0040a54e();
  FUN_0040a564();
  return;
}


 export function FUN_0040a54e ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0040a564 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0040a572 (param_1)

 {
  let iVar1;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  FUN_00408830((DAT_00636598 + 5), 0);
  do {
    if (((((DAT_006d1160) << 16 >> 16) === 0x11) || ((((DAT_006d1160) << 16 >> 16) + -17) < 0))) {
      local_20 = 0;
    }
    else {
      local_20 = _rand();
      local_20 = (local_20 % (((DAT_006d1160) << 16 >> 16) + -16));
    }
    local_20 = (local_20 + 8);
    if (((((DAT_006d1162) << 16 >> 16) === 9) || ((((DAT_006d1162) << 16 >> 16) + -9) < 0))) {
      local_24 = 0;
    }
    else {
      local_24 = _rand();
      local_24 = (local_24 % (((DAT_006d1162) << 16 >> 16) + -8));
    }
    local_24 = (local_24 + 4);
    if ((param_1 === 0)) {
      if (((DAT_00624eec === -1) || ((DAT_00624eec + 1) < 0))) {
        local_28 = 0;
      }
      else {
        local_28 = _rand();
        local_28 = (local_28 % (DAT_00624eec + 2));
      }
      if ((local_28 !== 0)) {
    if ((DAT_00624eec < 1)) {
      FUN_0040a763(local_20, local_24);
    }
    else {
      FUN_0040a92f(local_20, local_24);
    }
  }
  else {
    iVar1 = _rand();
    FUN_0040aaa4(local_20, local_24);
    if ((6 < (iVar1 % 0xa))) {
      FUN_0040aaa4(local_20, local_24);
    }
    if ((8 < (iVar1 % 0xa))) {
      FUN_0040aaa4(local_20, local_24);
    }
  }
  local_1c = (DAT_00636598 + 5);
  local_18 = (DAT_00636598 + 1);
  (local_8 < ((DAT_006d1164) << 16 >> 16)) (local_8 = 0; local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
    if ((_MEM[local_1c] !== 0)) {
      _MEM[local_18] = (_MEM[local_18] + 1);
      DAT_0063cba4 = (DAT_0063cba4 + 1);
    }
    local_1c = (local_1c + 6);
    local_18 = (local_18 + 6);
  }
  FUN_0040894c();
  return;
}


 export function FUN_0040a763 (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_8;

  uVar1 = _rand();
  uVar3 = (uVar1 >> 0x1f);
  local_8 = (((((uVar1 ^ uVar3) - uVar3) & 0x3f) ^ uVar3) - uVar3);
  iVar2 = FUN_005b8931(param_1, param_2);
  if ((_MEM[(iVar2 + 1)] !== 0)) {
    local_8 = (local_8 >> 1);
  }
  local_8 = (local_8 + 1);
  while ((local_8 === 0)) {
    if ((local_8 === 0))


 export function FUN_0040a824 (param_1, param_2)

 {
  let uVar1;

  if ((param_1 <= DAT_0063cb98)) {
    if ((DAT_0063cb94 < param_2)) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_0040a892 (param_1, param_2)

 {
  FUN_0040a8db(param_1, param_2);
  FUN_0040a8db((param_1 + 1), (param_2 + -1));
  FUN_0040a8db((param_1 + 1), (param_2 + 1));
  FUN_0040894c();
  return;
}


 export function FUN_0040a8db (param_1, param_2)

 {
  let uVar1;
  let iVar2;

  uVar1 = FUN_005ae052(param_1);
  iVar2 = FUN_0040a824(uVar1, param_2);
  if ((iVar2 !== 0)) {
    iVar2 = FUN_005b8931(uVar1, param_2);
    _MEM[(iVar2 + 5)] = 1;
  }
  return;
}


 export function FUN_0040a92f (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_8;

  local_8 = _rand();
  local_8 = (local_8 % 0x30);
  iVar1 = FUN_005b8931(param_1, param_2);
  if ((_MEM[(iVar1 + 1)] !== 0)) {
    local_8 = (local_8 >> 1);
  }
  local_8 = (local_8 + 1);
  while ((local_8 === 0)) {
    if ((local_8 === 0)) {
      FUN_0040a892((param_1 + 2), param_2);
    }
    uVar2 = _rand();
    uVar3 = (uVar2 >> 0x1f);
    if ((((((uVar2 ^ uVar3) - uVar3) & 3) ^ uVar3) === uVar3)) {
      FUN_0040a892((param_1 + -2), param_2);
    }
    uVar2 = _rand();
    uVar3 = (uVar2 >> 0x1f);
    if ((((((uVar2 ^ uVar3) - uVar3) & 3) ^ uVar3) === uVar3)) {
      FUN_0040a892(param_1, (param_2 + 2));
    }
    uVar2 = _rand();
    uVar3 = (uVar2 >> 0x1f);
    if ((((((uVar2 ^ uVar3) - uVar3) & 3) ^ uVar3) === uVar3)) {
      FUN_0040a892(param_1, (param_2 + -2));
    }
    uVar2 = _rand();
    uVar3 = (uVar2 >> 0x1f);
    iVar1 = (((((uVar2 ^ uVar3) - uVar3) & 3) ^ uVar3) - uVar3) * 2;
    param_1 = (param_1 + s8(DAT_00628351[iVar1]));
    param_2 = (param_2 + s8(DAT_00628361[iVar1]));
    local_8 = (local_8 + -1);
  }
  FUN_0040894c();
  return;
}


 export function FUN_0040aaa4 (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_8;

  uVar1 = _rand();
  uVar3 = (uVar1 >> 0x1f);
  local_8 = ((((((uVar1 ^ uVar3) - uVar3) & 0xf) ^ uVar3) - uVar3) + 1);
  while ((local_8 === 0)) {
    if ((local_8 === 0))


 export function FUN_0040ab41 (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let puVar3;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 === 0)) {
    uVar2 = 0;
  }
  else if (((((DAT_006d1162) << 16 >> 16) + -2) <= param_2)) {
    uVar2 = 0;
  }
  else {
    iVar1 = FUN_005b89e4((param_1 + -2), param_2);
    if ((iVar1 === 0)) {
      iVar1 = FUN_005b89e4((param_1 + 2), param_2);
      if ((iVar1 === 0)) {
        iVar1 = FUN_005b89e4(param_1, (param_2 + -2));
        if ((iVar1 === 0)) {
          iVar1 = FUN_005b89e4(param_1, (param_2 + 2));
          if ((iVar1 === 0)) {
            puVar3 = FUN_005b8931(param_1, param_2);
            _MEM[puVar3] = 0xa;
            uVar2 = 1;
          }
          else {
            uVar2 = 0;
          }
        }
        else {
          uVar2 = 0;
        }
      }
      else {
        uVar2 = 0;
      }
    }
    else {
      uVar2 = 0;
    }
  }
  return uVar2;
}


 export function FUN_0040ac5a ()

 {
  let bVar1;
  let cVar2;
  let bVar3;
  let uVar4;
  let iVar5;
  let pbVar6;
  let uVar7;
  let uVar8;
  let iVar9;
  let iVar10;
  let uVar11;
  let local_44;
  let local_3c;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_20;
  let local_14;
  let local_c;

  local_34 = 0;
  local_30 = 0;
  do {
    FUN_00408903((DAT_00636598 + 5), DAT_00636598);
    local_30 = (local_30 + 1);
    local_2c = 0;
    do {
      if (((((DAT_006d1162) << 16 >> 16) === 1) || ((((DAT_006d1162) << 16 >> 16) + -1) < 0))) {
        local_28 = 0;
      }
      else {
        iVar5 = _rand();
        local_28 = (iVar5 % ((DAT_006d1162) << 16 >> 16));
      }
      uVar4 = local_28;
      if ((((((DAT_006d1160) << 16 >> 16) / 2 | 0) === 1) || (((((DAT_006d1160) << 16 >> 16) / 2 | 0) + -1) < 0))) {
        local_44 = 0;
      }
      else {
        local_44 = _rand();
        local_44 = (local_44 % (((DAT_006d1160) << 16 >> 16) / 2 | 0));
      }
      local_20 = local_44 * 2;
      if (((local_28 & 1) !== 0)) {
        local_20 = (local_20 + 1);
      }
      iVar5 = local_20;
      pbVar6 = FUN_005b8931(local_20, local_28);
      bVar1 = _MEM[pbVar6];
    } while ((bVar1 === 0xa)) {
      /* switch */ () {
      case 0 :
        bVar1 = 1;
        iVar9 = _rand();
        if ((3 < local_2c)) {
          bVar1 = 2;
        }
        break;
      case 1 :
        iVar9 = _rand();
        if ((3 < (iVar9 % 0xa))) {
          bVar1 = 2;
        }
        break;
      case 3 :
        iVar9 = _rand();
        if ((2 < (iVar9 % 0xa))) {
          bVar1 = 2;
        }
        break;
      case 4 :
      case 5 :
        bVar1 = 2;
        break;
      case 6 :
        bVar1 = 1;
        break;
      case 7 :
        bVar1 = 6;
        break;
      case 8 :
        iVar9 = _rand();
        if ((3 < (iVar9 % 0xa))) {
          bVar1 = 9;
        }
      }
      bVar1 = (bVar1 | 0x80);
      pbVar6 = FUN_005b8931(local_20, local_28);
      _MEM[pbVar6] = bVar1;
      local_2c = (local_2c + 1);
      bVar3 = 0;
      (local_14 < 4) (local_14 = 0; (bVar3 = (!bVar3) && (local_14 = (local_14 < 4))); local_14 = (local_14 + 1)) {
        uVar8 = FUN_005ae052((s8(DAT_0062833c[local_14]) + local_20));
        cVar2 = DAT_00628344[local_14];
        iVar9 = FUN_004087c0(uVar8, (s8(cVar2) + local_28));
        if ((iVar9 !== 0)) {
          bVar3 = 1;
        }
      }
      uVar7 = _rand();
      uVar11 = (uVar7 >> 0x1f);
      local_3c = (((local_3c + (((((uVar7 ^ uVar11) - uVar11) & 1) ^ uVar11) - uVar11)) - (local_2c & 1)) & 3);
      local_20 = FUN_005ae052((s8(DAT_0062833c[local_3c]) + local_20));
      local_28 = (local_28 + s8(DAT_00628344[local_3c]));
      iVar9 = FUN_004087c0(local_20, local_28);
      if ((iVar9 !== 0)) {
        iVar9 = FUN_005b8931(local_20, local_28);
        bVar1 = _MEM[(iVar9 + 5)];
      }
    } while (((bVar1 & 0x80) === 0)) {
      local_34 = (local_34 + 1);
      (local_14 < 0x14) (local_14 = 0; local_14 = (local_14 < 0x14); local_14 = (local_14 + 1)) {
        uVar8 = FUN_005ae052((s8(DAT_00628370[local_14]) + iVar5));
        iVar9 = (s8(DAT_006283a0[local_14]) + uVar4);
        iVar10 = FUN_004087c0(uVar8, iVar9);
        if ((iVar10 !== 0)) {
          if ((((((DAT_006d1162) << 16 >> 16) >> 1) === iVar9) || (((((DAT_006d1162) << 16 >> 16) >> 1) - iVar9) < 0))) {
            local_c = ((~((((DAT_006d1162) << 16 >> 16) >> 1) - iVar9)) + 1);
          }
          else {
            local_c = ((((DAT_006d1162) << 16 >> 16) >> 1) - iVar9);
          }
          pbVar6 = FUN_005b8931(uVar8, iVar9);
          if ((local_c < (((DAT_006d1162) << 16 >> 16) * 3 / 0xa | 0))) {
            _rand();
          }
        }
      }
    }
    else {
      FUN_00408903(DAT_00636598, (DAT_00636598 + 5));
    }
    FUN_0040894c();
  } while ((local_34 < ((DAT_00624ee8 * 2 + DAT_00624ef4 * 2) + 0xc)))


 export function FUN_0040bbb0 ()

 {
  FUN_004aef20(DAT_00679640);
  return;
}


 export function FUN_0040bbe0 (param_1)

 {
  FUN_005f22e0(DAT_00679640, param_1);
  return;
}


 export function FUN_0040bc10 (param_1)

 {
  FUN_004af14b(DAT_00679640, param_1);
  return;
}


 export function FUN_0040bc40 (param_1)

 {
  FUN_0059dfb9(0, 0, 0, param_1);
  return;
}


 export function FUN_0040bc80 (param_1)

 {
  FUN_005a5f34(0, param_1);
  return;
}


 export function FUN_0040bcb0 (param_1, param_2)

 {
  return ((((-((param_2 + param_1) >> 1)) - param_1) & 2) === 0);
}


 export function FUN_0040bd10 (param_1)

 {
  let uVar1;

  if ((DAT_0064c6b5[param_1 * 0x594] < 2)) {
    uVar1 = 6;
  }
  else if ((DAT_0064c6b5[param_1 * 0x594] === 2)) {
    uVar1 = 7;
  }
  else if ((DAT_0064c6b5[param_1 * 0x594] < 6)) {
    uVar1 = 8;
  }
  else {
    uVar1 = 0xa;
  }
  return uVar1;
}


 export function FUN_0040bdac (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;

  iVar1 = s32((DAT_0063cbb4 + 0x2dc), 0);
  while ((((s32(param_3, 0) + s32(param_2, 0)) + s32(param_1, 0)) < 0xa)) {
    if ((s32(param_5, 0) === 0)) {
      w32(param_2, 0, (s32(param_2, 0) + 1));
    }
    else if ((s32(param_6, 0) === 0)) {
      w32(param_3, 0, (s32(param_3, 0) + 1));
    }
    else if ((s32(param_5, 0) === 0)) {
      w32(param_2, 0, (s32(param_2, 0) + 1));
    }
    else {
      w32(param_1, 0, (s32(param_1, 0) + 1));
    }
  }
  while ((0xa < ((s32(param_3, 0) + s32(param_2, 0)) + s32(param_1, 0)))) {
    if ((s32(param_5, 0) !== 0)) {
      if ((s32(param_6, 0) !== 0)) {
        w32(param_1, 0, (s32(param_1, 0) + -1));
      }
      else {
        w32(param_3, 0, (s32(param_3, 0) + -1));
      }
    }
    else {
      w32(param_2, 0, (s32(param_2, 0) + -1));
    }
  }
  return;
}


 export function FUN_0040bed1 ()

 {
  FUN_0040c7d0();
  return;
}


 export function FUN_0040beec (param_1)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((s32((DAT_0063cbb4 + 0x2dc), 0) < param_1)) {
    w32((DAT_0063cbb4 + 0x348), 0, 1);
  }
  local_8 = param_1;
  local_c = param_1;
  local_8 = FUN_005adfa0(param_1, 0, s32((DAT_0063cbb4 + 0x2dc), 0));
  local_10 = s32((DAT_0063cbb4 + 0x2e8), 0);
  local_14 = s32((DAT_0063cbb4 + 0x2e4), 0);
  FUN_0040bdac(DAT_fffffff8, DAT_fffffff0, DAT_ffffffec, (DAT_0063cbb4 + 0x2f4), (DAT_0063cbb4 + 0x350), (DAT_0063cbb4 + 0x354));
  w32((DAT_0063cbb4 + 0x2e0), 0, local_8);
  if ((local_c !== local_8)) {
    FUN_0040fcf0(local_8);
    FUN_0040f380();
  }
  if ((s32((DAT_0063cbb4 + 0x2e8), 0) !== local_10)) {
    w32((DAT_0063cbb4 + 0x2e8), 0, local_10);
    FUN_0040fcf0(local_10);
    FUN_0040f380();
  }
  if ((s32((DAT_0063cbb4 + 0x2e4), 0) !== local_14)) {
    w32((DAT_0063cbb4 + 0x2e4), 0, local_14);
    FUN_0040fcf0(local_14);
    FUN_0040f380();
  }
  FUN_0040c480();
  FUN_0040bed1();
  return;
}


 export function FUN_0040c07f (param_1)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((s32((DAT_0063cbb4 + 0x2dc), 0) < param_1)) {
    w32((DAT_0063cbb4 + 0x348), 0, 1);
  }
  local_8 = param_1;
  local_c = param_1;
  local_8 = FUN_005adfa0(param_1, 0, s32((DAT_0063cbb4 + 0x2dc), 0));
  local_10 = s32((DAT_0063cbb4 + 0x2e4), 0);
  local_14 = s32((DAT_0063cbb4 + 0x2e0), 0);
  FUN_0040bdac(DAT_fffffff8, DAT_fffffff0, DAT_ffffffec, (DAT_0063cbb4 + 0x2f0), (DAT_0063cbb4 + 0x354), (DAT_0063cbb4 + 0x34c));
  w32((DAT_0063cbb4 + 0x2e8), 0, local_8);
  if ((local_c !== local_8)) {
    FUN_0040fcf0(local_8);
    FUN_0040f380();
  }
  if ((s32((DAT_0063cbb4 + 0x2e4), 0) !== local_10)) {
    w32((DAT_0063cbb4 + 0x2e4), 0, local_10);
    FUN_0040fcf0(local_10);
    FUN_0040f380();
  }
  if ((s32((DAT_0063cbb4 + 0x2e0), 0) !== local_14)) {
    w32((DAT_0063cbb4 + 0x2e0), 0, local_14);
    FUN_0040fcf0(local_14);
    FUN_0040f380();
  }
  FUN_0040c480();
  FUN_0040bed1();
  return;
}


 export function FUN_0040c212 (param_1)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((s32((DAT_0063cbb4 + 0x2dc), 0) < param_1)) {
    w32((DAT_0063cbb4 + 0x348), 0, 1);
  }
  local_8 = param_1;
  local_c = param_1;
  local_8 = FUN_005adfa0(param_1, 0, s32((DAT_0063cbb4 + 0x2dc), 0));
  local_10 = s32((DAT_0063cbb4 + 0x2e0), 0);
  local_14 = s32((DAT_0063cbb4 + 0x2e8), 0);
  FUN_0040bdac(DAT_fffffff8, DAT_fffffff0, DAT_ffffffec, (DAT_0063cbb4 + 0x2ec), (DAT_0063cbb4 + 0x34c), (DAT_0063cbb4 + 0x350));
  w32((DAT_0063cbb4 + 0x2e4), 0, local_8);
  if ((local_8 !== local_c)) {
    FUN_0040fcf0(local_8);
    FUN_0040f380();
  }
  if ((s32((DAT_0063cbb4 + 0x2e0), 0) !== local_10)) {
    w32((DAT_0063cbb4 + 0x2e0), 0, local_10);
    FUN_0040fcf0(local_10);
    FUN_0040f380();
  }
  if ((s32((DAT_0063cbb4 + 0x2e8), 0) !== local_14)) {
    w32((DAT_0063cbb4 + 0x2e8), 0, local_14);
    FUN_0040fcf0(local_14);
    FUN_0040f380();
  }
  FUN_0040c480();
  FUN_0040bed1();
  return;
}


 export function FUN_0040c3a5 ()

 {
  DAT_0063cbb0 = 0;
  DAT_0063cbb4 = (DAT_0063cbb4 + 0x48);
  return;
}


 export function FUN_0040c3cd (param_1, param_2)

 {
  let local_8;

  w32(((DAT_0063cbb4 + 0x34c) + (param_1 + -0x12c) * 4), 0, param_2);
  if ((param_2 !== 0)) {
    (local_8 < 3) (local_8 = 0; local_8 = (local_8 < 3); local_8 = (local_8 + 1)) {
      if (((param_1 + -0x12c) !== local_8)) {
        w32(((DAT_0063cbb4 + 0x34c) + local_8 * 4), 0, 0);
        FUN_0040fad0(0);
        FUN_0040f380();
      }
    }
  }
  return;
}


 export function FUN_0040c480 (in_ECX)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_b4;
  let local_b0;
  let aiStack_a0;

  w32((in_ECX + 0x308), 0, 0);
  w32((in_ECX + 0x310), 0, 0);
  w32((in_ECX + 0x30c), 0, 0);
  iVar3 = s32((in_ECX + 0x2d8), 0);
  (local_b4 < 0x27) (local_b4 = 0; local_b4 = (local_b4 < 0x27); local_b4 = (local_b4 + 1)) {
    w32(DAT_ffffff60, local_b4, 0);
  }
  uVar1 = DAT_0064c6b3[iVar3 * 0x594];
  uVar2 = DAT_0064c6b4[iVar3 * 0x594];
  DAT_0064c6b4[iVar3 * 0x594] = _MEM[(in_ECX + 0x2e0)];
  DAT_0064c6b3[iVar3 * 0x594] = _MEM[(in_ECX + 0x2e8)];
  (local_b0 < ((DAT_00655b18) << 16 >> 16)) (local_b0 = 0; local_b0 = (local_b0 < ((DAT_00655b18) << 16 >> 16)); local_b0 = (local_b0 + 1)) {
    if ((s8(DAT_0064f348[local_b0 * 0x58]) === iVar3)) {
      FUN_004ea1f6(local_b0, ((s16((DAT_0064f38e + local_b0 * 0x58), 0)) << 16 >> 16), 1, 0);
      (local_b4 < 0x27) (local_b4 = 0; local_b4 = (local_b4 < 0x27); local_b4 = (local_b4 + 1)) {
        iVar4 = FUN_0043d20a(local_b0, local_b4);
        if ((iVar4 !== 0)) {
          w32(DAT_ffffff60, local_b4, (s32(DAT_ffffff60, local_b4) + 1));
        }
      }
      if (((DAT_0064f344[local_b0 * 0x58] & 1) === 0)) {
        w32((in_ECX + 0x308), 0, (s32((in_ECX + 0x308), 0) + ((s16((DAT_0064f38c + local_b0 * 0x58), 0)) << 16 >> 16)));
        w32((in_ECX + 0x30c), 0, (s32((in_ECX + 0x30c), 0) + ((s16((DAT_0064f38a + local_b0 * 0x58), 0)) << 16 >> 16)));
      }
    }
  }
  (local_b4 < 0x27) (local_b4 = 0; local_b4 = (local_b4 < 0x27); local_b4 = (local_b4 + 1)) {
    if ((iVar4 !== 0)) {
      w32((in_ECX + 0x310), 0, (s32((in_ECX + 0x310), 0) + s32(DAT_ffffff60, local_b4) * iVar4));
    }
  }
  DAT_0064c6b4[iVar3 * 0x594] = uVar2;
  DAT_0064c6b3[iVar3 * 0x594] = uVar1;
  return;
}


 export function FUN_0040c7d0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_c;

  FUN_00552112();
  if ((DAT_0063cbb0 === 0)) {
    FUN_0040fdb0(in_ECX, (in_ECX + 0x2bc), 0x1d);
  }
  else {
    FUN_005a9afe(DAT_00624f1c, in_ECX, 0, 0, s32((in_ECX + 0x124), 0), s32((in_ECX + 0x128), 0), s32((in_ECX + 0x2f8), 0), s32((in_ECX + 0x2fc), 0));
  }
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006ab1a0);
  if ((s32((in_ECX + 0x348), 0) === 0)) {
    FUN_005baee0(0x25, 0x12, 1, 1);
  }
  else {
    FUN_005baee0(0x6a, 0xa, 1, 1);
    w32((in_ECX + 0x348), 0, 0);
  }
  FUN_0040bbb0();
  FUN_0040bc10(0x98);
  FUN_0040fe40();
  FUN_0040ff00(s32((DAT_0064b9a0 + u8(DAT_0064c6b5[s32((in_ECX + 0x2d8), 0) * 0x594]) * 4), 0));
  FUN_0040fe10();
  FUN_0040fe10();
  FUN_0040fe10();
  FUN_0040bc10(0x100);
  FUN_0040fe40();
  FUN_0040ff30(s32((in_ECX + 0x2dc), 0) * 0xa);
  FUN_0040fe70();
  FUN_005bb024(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x33c), 0), s32((in_ECX + 0x31c), 0));
  FUN_005baee0(0x25, 0x12, 1, 1);
  FUN_0040bbb0();
  FUN_0040ff30(0);
  FUN_0040fe70();
  FUN_005baf57(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x330), 0));
  FUN_005baf57(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x338), 0));
  FUN_005baf57(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x334), 0));
  FUN_0040bbb0();
  FUN_0040ff30(0x64);
  FUN_0040fe70();
  FUN_005bb0af(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x330), 0), s32((in_ECX + 0x31c), 0));
  FUN_005bb0af(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x338), 0), s32((in_ECX + 0x31c), 0));
  FUN_005bb0af(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x334), 0), s32((in_ECX + 0x31c), 0));
  FUN_0040bbb0();
  FUN_0040bc10(0x102);
  FUN_005baf57(in_ECX, DAT_00679640, (((s32((in_ECX + 0x31c), 0) + s32((in_ECX + 0x314), 0)) + s32((in_ECX + 0x314), 0)) + s32((in_ECX + 0x124), 0)), s32((in_ECX + 0x330), 0));
  FUN_0040bbb0();
  FUN_0040bc10(0x59);
  FUN_0040fe40();
  FUN_0040ff30(s32((in_ECX + 0x2e0), 0) * 0xa);
  FUN_0040fe70();
  FUN_005bb024(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x330), 0), s32((in_ECX + 0x31c), 0));
  FUN_0040bbb0();
  FUN_0040bc10(0x5b);
  FUN_0040fe40();
  FUN_0040ff30(s32((in_ECX + 0x2e8), 0) * 0xa);
  FUN_0040fe70();
  FUN_005bb024(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x338), 0), s32((in_ECX + 0x31c), 0));
  FUN_0040bbb0();
  FUN_0040bc10(0x5a);
  FUN_0040fe40();
  FUN_0040ff30(s32((in_ECX + 0x2e4), 0) * 0xa);
  FUN_0040fe70();
  FUN_005bb024(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x334), 0), s32((in_ECX + 0x31c), 0));
  FUN_0040bbb0();
  FUN_0040bc10(0x88);
  FUN_0040fe40();
  FUN_0040ff30(s32((in_ECX + 0x308), 0));
  FUN_0040fe10();
  FUN_0040fe10();
  FUN_0040fe10();
  FUN_0040bc10(0x87);
  FUN_0040fe40();
  FUN_0040ff30(s32((in_ECX + 0x310), 0));
  FUN_005bb024(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x340), 0), s32((in_ECX + 0x31c), 0));
  FUN_0040bbb0();
  FUN_0040bc10(0x89);
  FUN_0040fe40();
  local_c = FUN_004c2788(s32((in_ECX + 0x2d8), 0));
  if ((local_c < 1)) {
    local_c = 1;
  }
  if ((s32((in_ECX + 0x30c), 0) < 1)) {
    w32((in_ECX + 0x30c), 0, 1);
  }
  FUN_0040ff30((((s32((in_ECX + 0x30c), 0) + -1) + local_c) / s32((in_ECX + 0x30c), 0) | 0));
  FUN_0040fe10();
  FUN_0040bc10(0x2c);
  FUN_005bb024(in_ECX, DAT_00679640, s32((in_ECX + 0x300), 0), s32((in_ECX + 0x344), 0), s32((in_ECX + 0x31c), 0));
  FUN_00408460();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0040cd64 (in_ECX, unaff_ESI, param_1)

 {
  let iVar1;
  let iVar2;
  let pvVar3;
  let uVar4;
  let iVar5;
  let uVar6;
  let iVar7;
  let iVar8;
  let extraout_EAX;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let uVar9;
  let uVar10;
  let uVar11;
  let uVar12;
  let uVar13;
  let uVar14;
  let uVar15;
  let local_4a0;
  let local_49c;
  let local_498;
  let local_494;
  let local_490;
  let local_484;
  let local_47c;
  let local_470;
  let local_468;
  let local_464;
  let local_460;
  let local_45c;
  let local_458;
  let local_448;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0040ddac;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_464 = 0;
  FUN_005c64da();
  local_8 = 0;
  DAT_0063cbb4 = in_ECX;
  w32((in_ECX + 0x2d8), 0, param_1);
  DAT_0063cbb0 = 1;
  pvVar3 = operator_new(0x48);
  local_8 = 1;
  if ((pvVar3 === 0)) {
    local_484 = 0;
  }
  else {
    local_484 = FUN_005bd630();
  }
  local_8 = (UNNAMED << 8);
  DAT_00624f1c = local_484;
  uVar4 = FUN_0040bd10(param_1);
  w32((in_ECX + 0x2dc), 0, uVar4);
  w32((in_ECX + 0x348), 0, 0);
  while ((s32((in_ECX + 0x2dc), 0) < u8(DAT_0064c6b4[param_1 * 0x594]))) {
    DAT_0064c6b4[param_1 * 0x594] = (DAT_0064c6b4[param_1 * 0x594] + 0xff);
    if ((u8(DAT_0064c6b3[param_1 * 0x594]) < s32((in_ECX + 0x2dc), 0))) {
      DAT_0064c6b3[param_1 * 0x594] = (DAT_0064c6b3[param_1 * 0x594] + 1);
    }
    w32((in_ECX + 0x348), 0, 1);
  }
  while ((s32((in_ECX + 0x2dc), 0) < u8(DAT_0064c6b3[param_1 * 0x594]))) {
    DAT_0064c6b3[param_1 * 0x594] = (DAT_0064c6b3[param_1 * 0x594] + 0xff);
    if ((u8(DAT_0064c6b4[param_1 * 0x594]) < s32((in_ECX + 0x2dc), 0))) {
      DAT_0064c6b4[param_1 * 0x594] = (DAT_0064c6b4[param_1 * 0x594] + 1);
    }
    w32((in_ECX + 0x348), 0, 1);
  }
  while ((s32((in_ECX + 0x2dc), 0) < (0xa - (u8(DAT_0064c6b3[param_1 * 0x594]) + u8(DAT_0064c6b4[param_1 * 0x594]))))) {
    if ((u8(DAT_0064c6b4[param_1 * 0x594]) < s32((in_ECX + 0x2dc), 0))) {
      DAT_0064c6b4[param_1 * 0x594] = (DAT_0064c6b4[param_1 * 0x594] + 1);
    }
    else {
      DAT_0064c6b3[param_1 * 0x594] = (DAT_0064c6b3[param_1 * 0x594] + 1);
    }
    w32((in_ECX + 0x348), 0, 1);
  }
  w32((in_ECX + 0x2ec), 0, u8(DAT_0064c6b4[param_1 * 0x594]));
  w32((in_ECX + 0x2f4), 0, u8(DAT_0064c6b3[param_1 * 0x594]));
  w32((in_ECX + 0x2f0), 0, (0xa - (u8(DAT_0064c6b3[param_1 * 0x594]) + u8(DAT_0064c6b4[param_1 * 0x594]))));
  FUN_0040bdac((in_ECX + 0x2ec), (in_ECX + 0x2f4), (in_ECX + 0x2f0), (in_ECX + 0x2f4), DAT_fffffb9c, DAT_fffffb9c);
  w32((in_ECX + 0x2e0), 0, s32((in_ECX + 0x2ec), 0));
  w32((in_ECX + 0x2e8), 0, s32((in_ECX + 0x2f4), 0));
  w32((in_ECX + 0x2e4), 0, s32((in_ECX + 0x2f0), 0));
  w32((in_ECX + 0x2f8), 0, 0x190);
  w32((in_ECX + 0x2fc), 0, 0x100);
  w32((in_ECX + 0x314), 0, 0xa);
  w32((in_ECX + 0x318), 0, 6);
  iVar5 = FUN_006e7d8c(3);
  w32((in_ECX + 0x320), 0, iVar5);
  local_470 = 0x41;
  if ((0 < DAT_00633584)) {
    w32((in_ECX + 0x2f8), 0, (s32((in_ECX + 0x2f8), 0) * 3 / 2 | 0));
    w32((in_ECX + 0x2fc), 0, (s32((in_ECX + 0x2fc), 0) * 3 / 2 | 0));
    w32((in_ECX + 0x320), 0, (s32((in_ECX + 0x320), 0) * 3 / 2 | 0));
    w32((in_ECX + 0x314), 0, (s32((in_ECX + 0x314), 0) * 3 / 2 | 0));
    w32((in_ECX + 0x318), 0, (s32((in_ECX + 0x318), 0) * 3 / 2 | 0));
    local_470 = 0x42;
  }
  FUN_005bf5e1(local_470, 0xa, 0xc0, DAT_fffffbbc);
  uVar4 = FUN_0040ef70();
  w32((in_ECX + 0x32c), 0, uVar4);
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x408), 0));
  local_460 = FUN_0040efd0(uVar4);
  w32((in_ECX + 0x31c), 0, ((s32((in_ECX + 0x2f8), 0) + s32((in_ECX + 0x314), 0) * -2) - (s32((in_ECX + 0x314), 0) + local_460)));
  uVar15 = 0;
  uVar14 = 0;
  uVar13 = 0;
  uVar4 = s32((in_ECX + 0x2fc), 0);
  uVar12 = s32((in_ECX + 0x2f8), 0);
  uVar11 = 0;
  uVar10 = 0;
  uVar9 = 0xd;
  uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0x404), 0), 0xd, 0, 0, uVar12, uVar4, 0, 0, 0);
  FUN_005534bc(uVar6, uVar9, uVar10, uVar11, uVar12, uVar4, uVar13, uVar14, uVar15);
  local_448 = (((s32((in_ECX + 0x31c), 0) + s32((in_ECX + 0x314), 0)) + s32((in_ECX + 0x314), 0)) + s32((in_ECX + 0x124), 0));
  iVar7 = ((local_460 >> 1) + local_448);
  iVar8 = (s32((in_ECX + 0x314), 0) + s32((in_ECX + 0x124), 0));
  w32((in_ECX + 0x300), 0, iVar8);
  iVar5 = (s32((in_ECX + 0x318), 0) + s32((in_ECX + 0x128), 0));
  w32((in_ECX + 0x304), 0, iVar5);
  w32((in_ECX + 0x33c), 0, iVar5);
  iVar5 = ((iVar5 + s32((in_ECX + 0x32c), 0)) + s32((in_ECX + 0x32c), 0));
  w32((in_ECX + 0x340), 0, iVar5);
  iVar5 = (iVar5 + s32((in_ECX + 0x32c), 0));
  w32((in_ECX + 0x344), 0, iVar5);
  iVar5 = ((iVar5 + s32((in_ECX + 0x32c), 0)) + s32((in_ECX + 0x32c), 0));
  w32((in_ECX + 0x330), 0, iVar5);
  iVar5 = (iVar5 + s32((in_ECX + 0x32c), 0));
  local_45c = (((s32((in_ECX + 0x320), 0) >> 1) + iVar5) + -16);
  FUN_004086c0(DAT_fffffba8, iVar8, iVar5, s32((in_ECX + 0x31c), 0), s32((in_ECX + 0x320), 0));
  if ((in_ECX === 0)) {
    local_490 = 0;
  }
  else {
    local_490 = (in_ECX + 0x48);
  }
  FUN_0040fc50(local_490, 0x65, DAT_fffffba8, 0);
  FUN_0040fd40(0, 0xa);
  FUN_0040fcf0(s32((in_ECX + 0x2e0), 0));
  FUN_0040fd80(LAB_0040385f);
  iVar5 = (iVar5 + (s32((in_ECX + 0x318), 0) + s32((in_ECX + 0x320), 0)));
  w32((in_ECX + 0x338), 0, iVar5);
  iVar5 = (iVar5 + s32((in_ECX + 0x32c), 0));
  FUN_004086c0(DAT_fffffba8, iVar8, iVar5, s32((in_ECX + 0x31c), 0), s32((in_ECX + 0x320), 0));
  if ((in_ECX === 0)) {
    local_494 = 0;
  }
  else {
    local_494 = (in_ECX + 0x48);
  }
  FUN_0040fc50(local_494, 0x66, DAT_fffffba8, 0);
  FUN_0040fd40(0, 0xa);
  FUN_0040fcf0(s32((in_ECX + 0x2e8), 0));
  FUN_0040fd80(LAB_0040289c);
  iVar5 = (iVar5 + (s32((in_ECX + 0x318), 0) + s32((in_ECX + 0x320), 0)));
  w32((in_ECX + 0x334), 0, iVar5);
  FUN_004086c0(DAT_fffffba8, iVar8, (iVar5 + s32((in_ECX + 0x32c), 0)), s32((in_ECX + 0x31c), 0), s32((in_ECX + 0x320), 0));
  if ((in_ECX === 0)) {
    local_498 = 0;
  }
  else {
    local_498 = (in_ECX + 0x48);
  }
  FUN_0040fc50(local_498, 0x67, DAT_fffffba8, 0);
  FUN_0040fd40(0, 0xa);
  FUN_0040fcf0(s32((in_ECX + 0x2e4), 0));
  FUN_0040fd80(LAB_004020f4);
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  w32((in_ECX + 0x328), 0, (extraout_EAX + 8));
  w32((in_ECX + 0x324), 0, (s32((in_ECX + 0x12c), 0) + -4));
  iVar5 = s32((in_ECX + 0x128), 0);
  iVar8 = s32((in_ECX + 0x130), 0);
  iVar1 = s32((in_ECX + 0x328), 0);
  iVar2 = s32((in_ECX + 0x124), 0);
  FUN_0040f350(0);
  FUN_004086c0(DAT_fffffba8, (iVar2 + 2), ((iVar5 + iVar8) - (iVar1 + 2)), s32((in_ECX + 0x324), 0), s32((in_ECX + 0x328), 0));
  if ((in_ECX === 0)) {
    local_49c = 0;
  }
  else {
    local_49c = (in_ECX + 0x48);
  }
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_49c, 0xc9, DAT_fffffba8, uVar4);
  FUN_0040f880(LAB_00402a18);
  FUN_0040f840();
  FUN_0040f7d0();
  if ((DAT_00633584 < 1)) {
    local_45c = (local_45c + 6);
  }
  (local_468 < 3) (local_468 = 0; local_468 = (local_468 < 3); local_468 = (local_468 + 1)) {
    w32((in_ECX + (local_468 * 4 + 0x34c)), 0, s32((DAT_00624f10 + local_468 * 4), 0))
    ;
    if ((in_ECX === 0)) {
      local_4a0 = 0;
    }
    else {
      local_4a0 = (in_ECX + 0x48);
    }
    FUN_0040f9d0(local_4a0, (local_468 + 0x12c), (iVar7 + -16), local_45c, DAT_00624f20);
    FUN_0040fad0(s32((in_ECX + (local_468 * 4 + 0x34c)), 0));
    FUN_0040faa0(LAB_0040375b);
    local_45c = (local_45c + ((s32((in_ECX + 0x318), 0) + s32((in_ECX + 0x320), 0)) + s32((in_ECX + 0x32c), 0)));
  }
  FUN_0040c480();
  in_ECX = EnableStackedTabs(in_ECX, 0x402cf7);
  FUN_005bb574();
  FUN_004085f0();
  if ((2 < DAT_00655b02)) {
    in_ECX = (in_ECX + 0x48);
  }
  FUN_005c61b0();
  in_ECX = (in_ECX + 0x48);
  while ((DAT_0063cbb0 !== 0)) {
    FUN_0040ef50();
  }
  if ((DAT_00624f1c !== 0)) {
    FUN_0040f010(1);
  }
  DAT_00624f1c = 0;
  (local_468 < 3) (local_468 = 0; local_468 = (local_468 < 3); local_468 = (local_468 + 1)) {
    w32((DAT_00624f10 + local_468 * 4), 0, s32((in_ECX + (local_468 * 4 + 0x34c)), 0))
    ;
  }
  if ((u8(DAT_0064c6b3[param_1 * 0x594]) !== s32((in_ECX + 0x2e8), 0))) {
    local_464 = 1;
  }
  _MEM[(DAT_0064c6b4 + param_1 * 0x594)] = in_ECX[0x2e0];
  _MEM[(DAT_0064c6b3 + param_1 * 0x594)] = in_ECX[0x2e8];
  if ((DAT_0064c6b5[param_1 * 0x594] < 2)) {
    _DAT_0064bc1a = u8(DAT_0064c6b3[param_1 * 0x594]);
    _DAT_0064bc1c = u8(DAT_0064c6b4[param_1 * 0x594]);
    FUN_004a73d9();
  }
  if ((local_464 !== 0)) {
    DAT_00655aee = (DAT_00655aee & 0xfffb);
    (local_47c < ((DAT_00655b18) << 16 >> 16)) (local_47c = 0; local_47c = (local_47c < ((DAT_00655b18) << 16 >> 16)); local_47c = (local_47c + 1)) {
      if ((s8(DAT_0064f348[local_47c * 0x58]) === param_1)) {
        FUN_004eb4ed(local_47c, 1);
      }
    }
  }
  FUN_00501780(0);
  FUN_0056a65e(1);
  FUN_00436287(4);
  FUN_00436287(5);
  FUN_00436287(6);
  local_8 = -1;
  FUN_0040dda0();
  FUN_0040ddb6(unaff_ESI);
  return;
}


 export function FUN_0040dda0 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0040ddb6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0040ddc6 (param_1)

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0040deb4;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f060();
  local_8 = 0;
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    local_8 = -1;
    FUN_0040dea8();
    FUN_0040debe();
    return;
  }
  if ((DAT_006d1da0 === param_1)) {
    FUN_0040cd64(param_1);
    FUN_00509429();
  }
  else {
    FUN_0046b14d(0x9d, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
  }
  local_8 = -1;
  FUN_0040dea8();
  FUN_0040debe();
  return;
}


 export function FUN_0040dea8 ()

 {
  FUN_0040f1e0();
  return;
}


 export function FUN_0040debe (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0040decc (param_1)

 {
  let iVar1;

  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    if ((DAT_006d1da0 === param_1)) {
      iVar1 = FUN_0040bd10(param_1);
      if ((iVar1 < u8(DAT_0064c6b4[param_1 * 0x594]))) {
        FUN_0040ddc6(param_1);
      }
      if ((iVar1 < (0xa - (u8(DAT_0064c6b3[param_1 * 0x594]) + u8(DAT_0064c6b4[param_1 * 0x594]))))) {
        FUN_0040ddc6(param_1);
      }
      if ((iVar1 < u8(DAT_0064c6b3[param_1 * 0x594]))) {
        FUN_0040ddc6(param_1);
      }
    }
    else {
      FUN_0046b14d(0x9e, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  return;
}


 export function FUN_0040e017 ()

 {
  let bVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  let iVar5;
  let unaff_FS_OFFSET;
  let local_31c;
  let local_318;
  let local_310;
  let local_22c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0040e399;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  uVar2 = DAT_006d1da0;
  local_8 = 0;
  local_310 = 0;
  FUN_0040ffa0(s_FINDCITY_00624f24, 0x800001);
  (local_318 < ((DAT_00655b18) << 16 >> 16)) (local_318 = 0; local_318 = (local_318 < ((DAT_00655b18) << 16 >> 16)); local_318 = (local_318 + 1)) {
    if ((s32((DAT_0064f394 + local_318 * 0x58), 0) !== 0)) {
      bVar1 = 0;
      uVar3 = s8(DAT_0064f348[local_318 * 0x58]);
      if (((DAT_0064bc60 & 8) !== 0)) {
        bVar1 = 1;
      }
      if ((uVar3 === uVar2)) {
        bVar1 = 1;
      }
      local_31c = ((uVar2) & 0xFF);
      if ((s8(DAT_0064f348[local_318 * 0x58]) === (uVar2 & 0xff))) {
        bVar1 = 1;
      }
      if (bVar1) {
        FUN_0040bbb0();
        FUN_0040bbe0((DAT_0064f360 + local_318 * 0x58));
        if ((uVar3 !== uVar2)) {
          FUN_0040fe10();
          FUN_0040fea0();
          uVar4 = FUN_00493d13(uVar3);
          FUN_0040bbe0(uVar4);
          FUN_0040fed0();
        }
        if ((iVar5 !== 0)) {
          FUN_0040fe10();
          FUN_0040fea0();
          FUN_0040bc10(0x1b0);
          if ((1 < iVar5)) {
            FUN_0040bbe0(DAT_00624f30);
            FUN_0040ff30(iVar5);
          }
          FUN_0040fed0();
        }
        FUN_0059edf0(DAT_00679640, local_318, 0);
        local_310 = (local_310 + 1);
      }
    }
  }
  if ((local_310 !== 0)) {
    iVar5 = FUN_0040bc80(0);
    if ((-1 < iVar5)) {
      FUN_00410402(((s16((DAT_0064f340 + iVar5 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar5 * 0x58), 0)) << 16 >> 16));
      if ((DAT_00655b07 !== 0)) {
        FUN_00509590(iVar5);
      }
      local_8 = -1;
      FUN_0040e38d();
      FUN_0040e3a3();
      return;
    }
    local_8 = -1;
    FUN_0040e38d();
    FUN_0040e3a3();
    return;
  }
  local_8 = -1;
  FUN_0040e38d();
  FUN_0040e3a3();
  return;
}


 export function FUN_0040e38d ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0040e3a3 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0040e3b1 ()

 {
  let iVar1;
  let uVar2;
  let iVar3;

  iVar1 = DAT_006d1da0;
  if (((DAT_0064bc60 & 0x10) === 0)) {
    if (((s16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0) & 8) === 0)) {
      if ((DAT_0064c6b5[DAT_006d1da0 * 0x594] !== 0)) {
        uVar2 = FUN_00410070(DAT_006d1da0);
        FUN_0040ff60(0, uVar2);
        FUN_004271e8(1, s32((DAT_0064b9a0 + u8(DAT_0064c6b5[iVar1 * 0x594]) * 4), 0));
        iVar3 = FUN_00410030(s_REVOLUTION_00624f34, (DAT_00646878 + u8(DAT_0064c6b5[iVar1 * 0x594]) * 0x3c), (((DAT_00633584 === 0) - 1) & 8));
        if ((iVar3 === 0)) {
          FUN_0046e020(0x3e, 1, 0, 0);
          uVar2 = FUN_00493c7d(iVar1);
          FUN_0040ff60(0, uVar2);
          FUN_00410030(s_STARTREV_00624f40, DAT_0063fc58, 0);
          FUN_0055c066(iVar1, 0);
          FUN_004e4ceb();
        }
      }
    }
    else {
      FUN_0055c69d(DAT_006d1da0, 1);
    }
  }
  return;
}


 export function FUN_0040ef50 ()

 {
  FUN_005bba4f();
  return;
}


 export function FUN_0040ef70 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 4), 0);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* __thiscall */
 /* _Timevec::~_Timevec(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~_Timevec (this)

 {
  FUN_005c8514(s32(this, 0));
  return;
}


 export function FUN_0040efd0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005c858e(s32(in_ECX, 0), param_1);
  return;
}


 export function FUN_0040f010 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bd915();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_0040f060 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0040f172;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0055339f();
  local_8 = 0;
  FUN_0040fb00();
  local_8 = 1;
  FUN_0040fb00();
  local_8 = 2;
  FUN_0040fb00();
  local_8 = 3;
  `eh_vector_constructor_iterator'((in_ECX + 0x106), 0x3c, 3, thunk_FUN_0040f8b0, thunk_FUN_0040f930);
  local_8 = ((((local_8) >> 8) << 8) | 4);
  FUN_0040f3e0();
  w32(in_ECX, 0, PTR_FUN_0061c054);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0040f1e0 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0040f2bc;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 4;
  FUN_0040f25f();
  local_8 = 3;
  FUN_0040f26e();
  local_8 = 2;
  FUN_0040f286();
  local_8 = 1;
  FUN_0040f295();
  local_8 = (0 << 8);
  FUN_0040f2a4();
  local_8 = -1;
  FUN_0040f2b3();
  FUN_0040f2c6();
  return;
}


 export function FUN_0040f25f ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0040f26e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((s32((unaff_EBP + -16), 0) + 0x418), 0x3c, 3, thunk_FUN_0040f930);
  return;
}


 export function FUN_0040f286 ()

 {
  FUN_0040fbb0();
  return;
}


 export function FUN_0040f295 ()

 {
  FUN_0040fbb0();
  return;
}


 export function FUN_0040f2a4 ()

 {
  FUN_0040fbb0();
  return;
}


 export function FUN_0040f2b3 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_0040f2c6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0xa4), 0, param_1);
  return;
}


 export function FUN_0040f350 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  _MEM[(in_ECX + 0xc4)] = param_1;
  return;
}


 export function FUN_0040f380 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005c8b2d(s32((in_ECX + 0x1c), 0));
    FUN_005c8b00(s32((in_ECX + 0x1c), 0));
  }
  return;
}


 export function FUN_0040f3e0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0040f43e;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  _MEM[(in_ECX + 0x25)] = 0;
  w32((in_ECX + 0x34), 0, -1);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0040f480 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 4), 0, 0);
  w32((in_ECX + 8), 0, 0);
  FUN_006e7d90((in_ECX + 0xc), 0, 0, 0, 0);
  w32((in_ECX + 0x1c), 0, 0);
  w32((in_ECX + 0x20), 0, 0);
  _MEM[(in_ECX + 0x24)] = 0;
  _MEM[(in_ECX + 0x25)] = 0;
  w32((in_ECX + 0x28), 0, -1);
  return in_ECX;
}


 export function FUN_0040f510 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 8), 0) !== 0)) {
    FUN_005c5a27(s32((in_ECX + 4), 0));
  }
  w32((in_ECX + 0x20), 0, 0);
  FUN_005c944b(in_ECX);
  return;
}


 export function FUN_0040f570 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0040f5cc;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  local_8 = -1;
  FUN_0040f5c3();
  FUN_0040f5d6();
  return;
}


 export function FUN_0040f5c3 ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_0040f5d6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0040f610 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    if ((s32((in_ECX + 8), 0) !== 0)) {
      FUN_005c5a27(s32((in_ECX + 4), 0));
    }
    w32((in_ECX + 0x20), 0, 0);
    FUN_005c944b(in_ECX);
  }
  return;
}


 export function FUN_0040f680 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  w32((in_ECX + 0x38), 0, PTR_DAT_00637e60);
  FUN_0040f730(param_1, 6, param_2, param_3);
  w32((in_ECX + 0x30), 0, 0);
  uVar1 = FUN_005c9740(param_3, in_ECX, param_4, 1, s32((in_ECX + 0x38), 0));
  w32((in_ECX + 0x1c), 0, uVar1);
  w32((in_ECX + 0x2c), 0, 1);
  return;
}


 export function FUN_0040f730 (in_ECX, param_1, param_2, param_3, param_4)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 2, param_1);
  w32(in_ECX, 0, param_2);
  w32(in_ECX, 1, param_3);
  w32(in_ECX, 3, s32(param_4, 0));
  w32(in_ECX, 4, s32(param_4, 1));
  w32(in_ECX, 5, s32(param_4, 2));
  w32(in_ECX, 6, s32(param_4, 3));
  w32(in_ECX, 8, 0);
  w32(in_ECX, 7, 0);
  _MEM[(in_ECX + 9)] = 0;
  FUN_005c59c4(in_ECX);
  return;
}


 export function FUN_0040f7d0 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_0040f810();
  w32((iVar1 + 0xbc), 0, in_ECX);
  return;
}


 export function FUN_0040f810 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 8), 0);
}


 export function FUN_0040f840 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_0040f810();
  w32((iVar1 + 0xc0), 0, in_ECX);
  return;
}


 export function FUN_0040f880 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x30), 0, param_1);
  return;
}


 export function FUN_0040f8b0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0040f8fd;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0040f930 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0040f993;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005cc248(s32((in_ECX + 0x1c), 0));
  }
  local_8 = -1;
  FUN_0040f98a();
  FUN_0040f99d();
  return;
}


 export function FUN_0040f98a ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_0040f99d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0040f9d0 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_14;

  w32((in_ECX + 0x38), 0, PTR_DAT_00637e68);
  FUN_005cbf40(param_5, param_3, param_4, DAT_ffffffec, s32((in_ECX + 0x38), 0));
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  FUN_0040f730(param_1, 2, param_2, DAT_ffffffec);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x34), 0, 1);
  w32((in_ECX + 0x30), 0, 0);
  uVar1 = FUN_005cc0f0(DAT_ffffffec, in_ECX, param_5, 1);
  w32((in_ECX + 0x1c), 0, uVar1);
  return;
}


 export function FUN_0040faa0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2c), 0, param_1);
  return;
}


 export function FUN_0040fad0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x30), 0, param_1);
  return;
}


 export function FUN_0040fb00 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0040fb6b;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  w32((in_ECX + 0x34), 0, 1);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x30), 0, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_0040fbb0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_0040fc13;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005cd139(s32((in_ECX + 0x1c), 0));
  }
  local_8 = -1;
  FUN_0040fc0a();
  FUN_0040fc1d();
  return;
}


 export function FUN_0040fc0a ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_0040fc1d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0040fc50 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  FUN_0040f730(param_1, 8, param_2, param_3);
  uVar1 = FUN_005ccf17(param_3, in_ECX, param_4, 1);
  w32((in_ECX + 0x1c), 0, uVar1);
  FUN_005cd4c7(s32((in_ECX + 0x1c), 0), 1, 0x64);
  w32((in_ECX + 0x38), 0, 1);
  return;
}


 export function FUN_0040fcf0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x3c), 0, param_1);
  FUN_005cd559(s32((in_ECX + 0x1c), 0), param_1);
  return;
}


 export function FUN_0040fd40 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005cd4c7(s32((in_ECX + 0x1c), 0), param_1, param_2);
  return;
}


 export function FUN_0040fd80 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2c), 0, param_1);
  return;
}


 export function FUN_0040fdb0 (param_1, param_2, param_3)

 {
  let uVar1;

  uVar1 = FUN_00407fc0(param_2, param_3);
  uVar1 = FUN_00407f90(param_2, uVar1);
  FUN_005a9abf(param_1, s32(param_2, 0), s32(param_2, 1), uVar1);
  return;
}


 export function FUN_0040fe10 ()

 {
  FUN_004aef36(DAT_00679640);
  return;
}


 export function FUN_0040fe40 ()

 {
  FUN_004aefb7(DAT_00679640);
  return;
}


 export function FUN_0040fe70 ()

 {
  FUN_004aeff9(DAT_00679640);
  return;
}


 export function FUN_0040fea0 ()

 {
  FUN_004af01a(DAT_00679640);
  return;
}


 export function FUN_0040fed0 ()

 {
  FUN_004af03b(DAT_00679640);
  return;
}


 export function FUN_0040ff00 (param_1)

 {
  FUN_004af122(DAT_00679640, param_1);
  return;
}


 export function FUN_0040ff30 (param_1)

 {
  FUN_004af1d5(DAT_00679640, param_1);
  return;
}


 export function FUN_0040ff60 (param_1, param_2)

 {
  FUN_005f22d0((DAT_0063cc48 + param_1 * 0x104), param_2);
  return;
}


 export function FUN_0040ffa0 (param_1, param_2)

 {
  FUN_0040ffe0(DAT_006359d4, param_1, 0, param_2);
  return;
}


 export function FUN_0040ffe0 (param_1, param_2, param_3, param_4)

 {
  FUN_005a632a(param_1, param_2, param_3, 0, 0, 0, 0, param_4);
  return;
}
