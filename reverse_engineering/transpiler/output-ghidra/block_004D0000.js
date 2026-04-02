// Block 0x004D0000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 123

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_004d007e (param_1)

 {
  let local_108;
  let local_104;

  FUN_004cfff0(param_1);
  for (/* cond: (_MEM[local_108] === 9) */); (local_108 = _MEM[local_108] && ((local_108 = _MEM[local_108] || (local_108 = _MEM[local_108]))));
      local_108 = (local_108 + 1)) {
  }
  FUN_005f22d0(DAT_fffffefc, local_108);
  FUN_005f22d0(param_1, DAT_fffffefc);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004d0160 ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  if (((iVar1 - DAT_006a5b08) < 0x4b1)) {
    return;
  }
  DAT_0062e2d0 = InvalidateObjectCache(DAT_0062e2d0);
  return;
}


 export function FUN_004d01ae (param_1)

 {
  let local_8;

  for (/* cond: (local_8 < 6) */); local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
    w32((DAT_006a5b10 + local_8 * 4), 0, ((s16((DAT_0064caa8 + (local_8 * 2 + param_1 * 0x594)), 0)) << 16 >> 16));
  }
  return;
}


 export function FUN_004d0208 (param_1)

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_2194;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004d0320;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f35f0();
  if ((DAT_0062e2d0 !== 0)) {
    FUN_004d032a();
    return;
  }
  if ((DAT_00631ad0 !== 0)) {
    FUN_004d032a();
    return;
  }
  if ((param_1 < 1)) {
    local_2194 = ((~param_1) + 1);
  }
  else {
    local_2194 = param_1;
  }
  FUN_004d0517(local_2194);
  local_8 = 0;
  iVar1 = FUN_004d0b58();
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_004d0314();
    FUN_004d032a();
    return;
  }
  if ((param_1 < 0)) {
    FUN_004d1725();
  }
  else {
    FUN_004d0ea6();
  }
  local_8 = -1;
  FUN_004d0314();
  FUN_004d032a();
  return;
}


 export function FUN_004d0314 ()

 {
  FUN_004d08b0();
  return;
}


 export function FUN_004d032a (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004d0339 (param_1)

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004d0426;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f35f0();
  if ((DAT_006d1da0 !== param_1)) {
    FUN_004d0430();
    return;
  }
  if ((DAT_0062e2d0 !== 0)) {
    FUN_004d0430();
    return;
  }
  if ((DAT_00631ad0 !== 0)) {
    FUN_004d0430();
    return;
  }
  FUN_004d0517(param_1);
  local_8 = 0;
  iVar1 = FUN_004d0b58();
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_004d041a();
    FUN_004d0430();
    return;
  }
  FUN_004d13b8();
  local_8 = -1;
  FUN_004d041a();
  FUN_004d0430();
  return;
}


 export function FUN_004d041a ()

 {
  FUN_004d08b0();
  return;
}


 export function FUN_004d0430 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004d043f (param_1)

 {
  let uVar1;
  let local_14;

  FUN_0040bbb0();
  uVar1 = FUN_00493c7d(param_1);
  FUN_0040bbe0(uVar1);
  DAT_00679641 = 0;
  FUN_0040bbe0(s_.S.S._0062e2d4);
  uVar1 = FUN_00493b10(param_1);
  FUN_0040bbe0(uVar1);
  FUN_0040fe10();
  FUN_0040bbe0(DAT_0062e2dc);
  uVar1 = FUN_00410070(param_1);
  FUN_0040bbe0(uVar1);
  FUN_0040bbe0(DAT_0062e2e0);
  FUN_005c19ad(0xfa);
  FUN_006e7d90(DAT_ffffffec, 0, 0, 0x27f, 0x28);
  FUN_005c1020((DAT_0062e2d0 + 0x8c4), DAT_00679640, DAT_ffffffec, 0);
  FUN_00407ff0();
  return;
}


 export function FUN_004d0517 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004d0895;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c730();
  local_8 = 0;
  FUN_0044c5a0();
  local_8 = 1;
  FUN_004502b0();
  local_8 = 2;
  FUN_005c64da();
  local_8 = 3;
  FUN_0043c690();
  local_8 = 4;
  FUN_0043c690();
  local_8 = 5;
  FUN_0043c690();
  local_8 = 6;
  FUN_005bd630();
  local_8 = 7;
  in_ECX = (in_ECX + 0x93c);
  local_8 = 8;
  in_ECX = (in_ECX + 0x978);
  local_8 = 9;
  in_ECX = (in_ECX + 0x9b4);
  local_8 = 0xa;
  in_ECX = (in_ECX + 0x9f0);
  local_8 = 0xb;
  in_ECX = (in_ECX + 0xa2c);
  local_8 = 0xc;
  in_ECX = (in_ECX + 0xa68);
  local_8 = 0xd;
  in_ECX = (in_ECX + 0xaa4);
  local_8 = 0xe;
  FUN_0046ab30();
  local_8 = ((((local_8) >> 8) << 8) | 0xf);
  w32((in_ECX + 0x1cc), 0, param_1);
  w32((in_ECX + 0x62c), 0, 0);
  FUN_005bcaa7((in_ECX + 0x1d4));
  w32((in_ECX + 0x8c0), 0, 0);
  DAT_0062e2d0 = in_ECX;
  FUN_0043c6c0(0, 0x18, 1);
  FUN_0043c6c0(0, 0x14, 1);
  FUN_0043c6c0(0, 0x10, 1);
  w32((in_ECX + 0x8ec), 0, 0);
  w32((in_ECX + 0x8f0), 0, 0);
  FUN_005bd65c(0x1c9, 0x130);
  FUN_005c041f(9);
  w32((in_ECX + 0x634), 0, 0);
  w32((in_ECX + 0x62c), 0, 0);
  w32((in_ECX + 0x630), 0, 0);
  FUN_006e7d90((in_ECX + 0x1e4), 0xa, 0x14, 0x12c, 0x1df);
  w32((in_ECX + 0x1da8), 0, 0);
  w32((in_ECX + 0xae0), 0, 0);
  w32((in_ECX + 0x1dac), 0, 0);
  w32((in_ECX + 0x1db0), 0, 0);
  w32((in_ECX + 0x1db4), 0, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004d08b0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004d0b40;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0xf;
  FUN_00450340();
  DAT_0062e2d0 = 0;
  if ((s32((in_ECX + 0x634), 0) !== 0)) {
    FUN_005d2004(s32((in_ECX + 0x634), 0));
    w32((in_ECX + 0x634), 0, 0);
  }
  if ((s32((in_ECX + 0x62c), 0) !== 0)) {
    FUN_005d2004(s32((in_ECX + 0x62c), 0));
    w32((in_ECX + 0x62c), 0, 0);
  }
  if ((s32((in_ECX + 0x630), 0) !== 0)) {
    FUN_005d2004(s32((in_ECX + 0x630), 0));
    w32((in_ECX + 0x630), 0, 0);
  }
  local_8 = 0xe;
  FUN_004d0a56();
  local_8 = 0xd;
  FUN_004d0a65();
  local_8 = 0xc;
  FUN_004d0a74();
  local_8 = 0xb;
  FUN_004d0a83();
  local_8 = 0xa;
  FUN_004d0a92();
  local_8 = 9;
  FUN_004d0aa1();
  local_8 = 8;
  FUN_004d0ab0();
  local_8 = 7;
  FUN_004d0abf();
  local_8 = 6;
  FUN_004d0ace();
  local_8 = 5;
  FUN_004d0add();
  local_8 = 4;
  FUN_004d0aec();
  local_8 = 3;
  FUN_004d0afb();
  local_8 = 2;
  FUN_004d0b0a();
  local_8 = 1;
  FUN_004d0b19();
  local_8 = (((local_8) >> 8) << 8);
  FUN_004d0b28();
  local_8 = -1;
  FUN_004d0b37();
  FUN_004d0b4a();
  return;
}


 export function FUN_004d0a56 ()

 {
  FUN_0046ab49();
  return;
}


 export function FUN_004d0a65 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004d0a74 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004d0a83 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004d0a92 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004d0aa1 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004d0ab0 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004d0abf ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004d0ace ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d0add ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_004d0aec ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_004d0afb ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_004d0b0a ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_004d0b19 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_004d0b28 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_004d0b37 ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_004d0b4a (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004d0b58 (in_ECX)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_84;

  FUN_004aef20(DAT_ffffff7c);
  FUN_0043c840(DAT_ffffff7c, s_ss.dll_0062e2e4);
  iVar1 = FUN_00564713(DAT_ffffff7c);
  if ((iVar1 === 0)) {
    uVar2 = 0;
  }
  else {
    FUN_004502e0(DAT_ffffff7c);
    FUN_00408010(0x1fc);
    FUN_00596eec(s32((in_ECX + 0x1cc), 0), 1);
    FUN_004d4a7b();
    if ((DAT_006ad0ec !== 0)) {
      w32((in_ECX + 0xae0), 0, 1);
    }
    iVar1 = FUN_004a7577(s32((in_ECX + 0x1cc), 0));
    if ((iVar1 !== 0)) {
      w32((in_ECX + 0xae0), 0, 3);
    }
    iVar1 = FUN_004d0d64();
    if ((iVar1 === 0)) {
      uVar2 = 0;
    }
    else {
      FUN_004d53ab();
      if ((s32((in_ECX + 0x634), 0) !== 0)) {
        FUN_005d2004(s32((in_ECX + 0x634), 0));
        w32((in_ECX + 0x634), 0, 0);
      }
      if ((s32((in_ECX + 0x62c), 0) !== 0)) {
        FUN_005d2004(s32((in_ECX + 0x62c), 0));
        w32((in_ECX + 0x62c), 0, 0);
      }
      if ((s32((in_ECX + 0x630), 0) !== 0)) {
        FUN_005d2004(s32((in_ECX + 0x630), 0));
        w32((in_ECX + 0x630), 0, 0);
      }
      w32((in_ECX + 0x8b8), 0, 0xa);
      w32((in_ECX + 0x8bc), 0, 0x28);
      FUN_004d5e41();
      uVar2 = 1;
    }
  }
  return uVar2;
}


 export function FUN_004d0d64 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  FUN_00407ff0();
  FUN_005c5fc4(DAT_0062e2ec, 0x800, s32((in_ECX + 0x1d4), 0), s32((in_ECX + 0x1d8), 0), (s32((in_ECX + 0x1dc), 0) - s32((in_ECX + 0x1d4), 0)), ((s32((in_ECX + 0x1e0), 0) - s32((in_ECX + 0x1d8), 0)) + 5), DAT_006a8c00, DAT_006553d8);
  FUN_00419ba0(0);
  FUN_005bb4ae(DAT_0062e2f0, 0x800, 0, 0, 0x280, 0x1e0, (in_ECX + 0x1f8), in_ECX);
  iVar1 = FUN_005bf5e1(0x1f3, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar1 !== 0)) {
    FUN_00450400();
    in_ECX = (in_ECX + 0x110);
    FUN_00414be0(LAB_00402513);
    FUN_00414c20(LAB_00402d83);
    FUN_00414c60(LAB_004038b9);
  }
  return (iVar1 !== 0);
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004d0ea6 (in_ECX)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_a4;
  let local_94;
  let local_58;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004d13a0;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  local_94 = DAT_ffffff6c;
  local_8 = 1;
  FUN_004d01ae(s32((in_ECX + 0x1cc), 0));
  iVar1 = FUN_004d17bf();
  if ((iVar1 !== 0)) {
    if ((s32((in_ECX + 0xae0), 0) === 3)) {
      FUN_005bf5e1((DAT_006a5b14 + 0x4e1f), 0xa, 0xec, (in_ECX + 0x1f8));
      FUN_005cedad(DAT_ffffffa8, 0xff, s32((DAT_0062e250 + (DAT_006a5b14 + -1) * 0x10), 0), s32((DAT_0062e254 + (DAT_006a5b14 + -1) * 0x10), 0), s32((DAT_0062e258 + (DAT_006a5b14 + -1) * 0x10), 0), s32((DAT_0062e25c + (DAT_006a5b14 + -1) * 0x10), 0));
      FUN_005cef31(DAT_ffffff5c, (in_ECX + 0xb8), s32((DAT_0062e250 + (DAT_006a5b14 + -1) * 0x10), 0), s32((DAT_0062e254 + (DAT_006a5b14 + -1) * 0x10), 0));
    }
    /* switch */ (s32((in_ECX + 0xae0), 0) ( *) ((in_ECX + 0xae0)  )) {
    case 0 :
    case 1 :
      FUN_004d60a5(0, 1);
      break;
    case 2 :
      break;
    case 3 :
      FUN_004d570b();
      FUN_004d043f(s32((in_ECX + 0x1cc), 0));
    }
    FUN_004d5f79(1, 1);
    if ((s32((in_ECX + 0x62c), 0) !== 0)) {
      FUN_005d2004(s32((in_ECX + 0x62c), 0));
    }
    if ((s32((in_ECX + 0xae0), 0) === 3)) {
      uVar2 = FUN_005d1f50(LAB_00401af5, 5, -1);
      w32((in_ECX + 0x634), 0, uVar2);
    }
    else {
      uVar2 = FUN_005d1f50(LAB_00403a7b, 0x3c, -1);
      w32((in_ECX + 0x62c), 0, uVar2);
    }
    FUN_00408650();
    FUN_00419b80();
    FUN_00450390((in_ECX + 0x1f8));
    FUN_004085f0();
    FUN_00419b80();
    FUN_00450390((in_ECX + 0x1f8));
    FUN_004d5e41();
    FUN_004d5ef9();
    if ((s32((in_ECX + 0xae0), 0) === 3)) {
      w32((in_ECX + 0x8f0), 0, 1);
    }
    else {
      w32((in_ECX + 0x8f0), 0, 0);
    }
    w32((in_ECX + 0x1db4), 0, 1);
    FUN_00414ce0();
    FUN_00421bd0();
    if ((2 < DAT_00655b02)) {
      in_ECX = (in_ECX + 0x100);
    }
    _DAT_006a5b08 = FUN_00421bb0();
    FUN_005c61b0();
    in_ECX = (in_ECX + 0x100);
    FUN_00414d40();
    if ((s32((in_ECX + 0x634), 0) !== 0)) {
      FUN_005d2004(s32((in_ECX + 0x634), 0));
      w32((in_ECX + 0x634), 0, 0);
    }
    if ((s32((in_ECX + 0x62c), 0) !== 0)) {
      FUN_005d2004(s32((in_ECX + 0x62c), 0));
      w32((in_ECX + 0x62c), 0, 0);
    }
    if ((s32((in_ECX + 0x630), 0) !== 0)) {
      FUN_005d2004(s32((in_ECX + 0x630), 0));
      w32((in_ECX + 0x630), 0, 0);
    }
    if ((s32((in_ECX + 0xae0), 0) === 2)) {
      FUN_004d5b21();
      w32((in_ECX + 0xae0), 0, 3);
      FUN_005973fd(s32((in_ECX + 0x1cc), 0));
      FUN_004d0ea6();
    }
    else {
      FUN_004503d0();
      FUN_00419b80();
    }
    FUN_00450390(DAT_006a8c00);
    FUN_00450390(DAT_006a8c00);
    FUN_004503d0();
    FUN_00419b80();
    local_8 = (UNNAMED << 8);
    FUN_004d138b();
    local_8 = -1;
    FUN_004d1397();
    FUN_004d13aa();
    return;
  }
  local_8 = (((local_8) >> 8) << 8);
  FUN_004d138b();
  local_8 = -1;
  FUN_004d1397();
  FUN_004d13aa();
  return;
}


 export function FUN_004d138b ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004d1397 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d13aa (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004d13b8 (in_ECX)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_14;

  if ((s32((in_ECX + 0x1cc), 0) === DAT_006d1da0)) {
    if ((s32((in_ECX + 0x62c), 0) !== 0)) {
      FUN_005d2004(s32((in_ECX + 0x62c), 0));
    }
    if ((iVar1 !== 0)) {
      FUN_004d5f79(1, 1);
      FUN_004d60a5(0, 1);
      w32((in_ECX + 0x1db4), 0, 1);
      FUN_00408650();
      FUN_00419b80();
      FUN_00450390((in_ECX + 0x1f8));
      FUN_004085f0();
      FUN_00419b80();
      FUN_00450390((in_ECX + 0x1f8));
      FUN_004d5e41();
      FUN_004d5ef9();
      w32((in_ECX + 0x8f0), 0, 1);
      w32((in_ECX + 0x1db4), 0, 1);
      uVar2 = s32((in_ECX + 0xae0), 0);
      w32((in_ECX + 0xae0), 0, 0);
      w32((in_ECX + 0xae0), 0, uVar2);
      FUN_004d01ae(s32((in_ECX + 0x1cc), 0));
      iVar1 = FUN_004d17bf();
      if ((iVar1 !== 0)) {
        FUN_004d5f79(1, 0);
        FUN_004d60a5(0, 1);
        FUN_006e7d90(DAT_ffffffec, 0, 0, 0x280, 0x1e0);
        FUN_005683c5((in_ECX + 0xb8), DAT_ffffffec, 5, 1);
        FUN_004d5f79(1, 1);
        uVar2 = FUN_005d1f50(LAB_00403a7b, 0xa, -1);
        w32((in_ECX + 0x62c), 0, uVar2);
        FUN_004d5e41();
        FUN_004d5ef9();
        w32((in_ECX + 0x8f0), 0, 0);
        w32((in_ECX + 0x1db4), 0, 1);
        FUN_00414ce0();
        FUN_00421bd0();
        if ((2 < DAT_00655b02)) {
          in_ECX = (in_ECX + 0x100);
        }
        _DAT_006a5b08 = FUN_00421bb0();
        FUN_005c61b0();
        in_ECX = (in_ECX + 0x100);
        FUN_00414d40();
        if ((s32((in_ECX + 0x634), 0) !== 0)) {
          FUN_005d2004(s32((in_ECX + 0x634), 0));
          w32((in_ECX + 0x634), 0, 0);
        }
        if ((s32((in_ECX + 0x62c), 0) !== 0)) {
          FUN_005d2004(s32((in_ECX + 0x62c), 0));
          w32((in_ECX + 0x62c), 0, 0);
        }
        if ((s32((in_ECX + 0x630), 0) !== 0)) {
          FUN_005d2004(s32((in_ECX + 0x630), 0));
          w32((in_ECX + 0x630), 0, 0);
        }
        FUN_00450390(DAT_006a8c00);
        if ((s32((in_ECX + 0xae0), 0) === 2)) {
          FUN_004d5b21();
          w32((in_ECX + 0xae0), 0, 3);
          FUN_005973fd(s32((in_ECX + 0x1cc), 0));
          FUN_004d0ea6();
        }
        else {
          FUN_004503d0();
          FUN_00419b80();
        }
        FUN_00450390(DAT_006a8c00);
        FUN_004503d0();
        FUN_00419b80();
      }
    }
  }
  return;
}


 export function FUN_004d1725 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_00408650();
  FUN_00419b80();
  FUN_00450390((in_ECX + 0x1f8));
  FUN_00450390((in_ECX + 0x1f8));
  w32((in_ECX + 0xae0), 0, 2);
  FUN_004d5b21();
  w32((in_ECX + 0xae0), 0, 3);
  FUN_004d0ea6();
  FUN_00450390(DAT_006a8c00);
  FUN_00450390(DAT_006a8c00);
  FUN_004503d0();
  FUN_00419b80();
  return;
}


 export function FUN_004d17bf (in_ECX)

 {
  let bVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_d88;
  let local_d78;
  let local_d68;
  let local_d58;
  let local_d54;
  let local_d44;
  let local_d40;
  let local_d3c;
  let local_d38;
  let local_d34;
  let local_d30;
  let local_d2c;
  let local_d28;
  let local_d24;
  let local_d20;
  let local_d1c;
  let local_d18;
  let local_cd0;
  let local_c88;
  let local_c84;
  let local_c6c;
  let local_c6b;
  let local_c68;
  let local_c64;
  let local_c60;
  let local_c5c;
  let local_c58;
  let local_c54;
  let local_c50;
  let local_c4f;
  let local_c4c;
  let local_c48;
  let local_c44;
  let local_c40;
  let local_c3c;
  let local_c38;
  let local_c34;
  let local_c33;
  let local_c30;
  let local_c2c;
  let local_c28;
  let local_c24;
  let local_c20;
  let local_c1c;
  let local_c18;
  let local_c17;
  let local_c14;
  let local_c10;
  let local_c0c;
  let local_c08;
  let local_c04;
  let local_c00;
  let local_bfc;
  let local_bfb;
  let local_bf8;
  let local_bf4;
  let local_bf0;
  let local_bec;
  let local_be8;
  let local_be4;
  let local_be0;
  let local_bdf;
  let local_bdc;
  let local_bd8;
  let local_bd4;
  let local_bd0;
  let local_bcc;
  let local_bc8;
  let local_bc4;
  let local_920;
  let local_91c;
  let local_918;
  let local_914;
  let local_910;
  let local_90c;
  let local_908;
  let local_907;
  let local_904;
  let local_900;
  let local_8fc;
  let local_8f8;
  let local_8f4;
  let local_8f0;
  let local_8ec;
  let local_8eb;
  let local_8e8;
  let local_8e4;
  let local_8e0;
  let local_8dc;
  let local_8d8;
  let local_8d4;
  let local_8d0;
  let local_8cf;
  let local_8cc;
  let local_8c8;
  let local_8c4;
  let local_8c0;
  let local_8bc;
  let local_8b8;
  let local_8b4;
  let local_8b3;
  let local_8b0;
  let local_8ac;
  let local_8a8;
  let local_8a4;
  let local_8a0;
  let local_89c;
  let local_898;
  let local_897;
  let local_894;
  let local_890;
  let local_88c;
  let local_888;
  let local_884;
  let local_880;
  let local_87c;
  let local_87b;
  let local_878;
  let local_874;
  let local_870;
  let local_86c;
  let local_868;
  let local_864;
  let local_860;
  let local_85f;
  let local_85c;
  let local_858;
  let local_854;
  let local_850;
  let local_84c;
  let local_848;
  let local_844;
  let local_843;
  let local_840;
  let local_83c;
  let local_838;
  let local_834;
  let local_830;
  let local_82c;
  let local_828;
  let local_827;
  let local_824;
  let local_820;
  let local_81c;
  let local_818;
  let local_814;
  let local_810;
  let local_80c;
  let local_80b;
  let local_808;
  let local_804;
  let local_800;
  let local_7fc;
  let local_7f8;
  let local_7f4;
  let local_7f0;
  let local_7ef;
  let local_7ec;
  let local_7e8;
  let local_7e4;
  let local_7e0;
  let local_7dc;
  let local_7d8;
  let local_7d4;
  let local_7d3;
  let local_7d0;
  let local_7cc;
  let local_7c8;
  let local_7c4;
  let local_7c0;
  let local_7bc;
  let local_7b8;
  let local_7b7;
  let local_7b4;
  let local_7b0;
  let local_7ac;
  let local_7a8;
  let local_7a4;
  let local_7a0;
  let local_79c;
  let local_79b;
  let local_798;
  let local_794;
  let local_790;
  let local_78c;
  let local_788;
  let local_784;
  let local_780;
  let local_77f;
  let local_77c;
  let local_778;
  let local_774;
  let local_770;
  let local_76c;
  let local_768;
  let local_764;
  let local_763;
  let local_760;
  let local_75c;
  let local_758;
  let local_754;
  let local_750;
  let local_74c;
  let local_748;
  let local_747;
  let local_744;
  let local_740;
  let local_73c;
  let local_738;
  let local_734;
  let local_730;
  let local_72c;
  let local_72b;
  let local_728;
  let local_724;
  let local_720;
  let local_71c;
  let local_718;
  let local_714;
  let local_710;
  let local_70f;
  let local_70c;
  let local_708;
  let local_704;
  let local_700;
  let local_6fc;
  let local_6f8;
  let local_6f4;
  let local_6f3;
  let local_6f0;
  let local_6ec;
  let local_6e8;
  let local_6e4;
  let local_6e0;
  let local_6dc;
  let local_6d8;
  let local_6d7;
  let local_6d4;
  let local_6d0;
  let local_6cc;
  let local_6c8;
  let local_6c4;
  let local_6c0;
  let local_6bc;
  let local_6bb;
  let local_6b8;
  let local_6b4;
  let local_6b0;
  let local_6ac;
  let local_6a8;
  let local_6a4;
  let local_6a0;
  let local_69f;
  let local_69c;
  let local_698;
  let local_694;
  let local_690;
  let local_68c;
  let local_688;
  let local_684;
  let local_683;
  let local_680;
  let local_67c;
  let local_678;
  let local_674;
  let local_670;
  let local_66c;
  let local_668;
  let local_667;
  let local_664;
  let local_660;
  let local_65c;
  let local_658;
  let local_654;
  let local_650;
  let local_64c;
  let local_64b;
  let local_648;
  let local_644;
  let local_640;
  let local_63c;
  let local_638;
  let local_634;
  let local_630;
  let local_62f;
  let local_62c;
  let local_628;
  let local_624;
  let local_620;
  let local_61c;
  let local_618;
  let local_614;
  let local_613;
  let local_610;
  let local_60c;
  let local_608;
  let local_604;
  let local_600;
  let local_5fc;
  let local_5f8;
  let local_5f7;
  let local_5f4;
  let local_5f0;
  let local_5ec;
  let local_5e8;
  let local_5e4;
  let local_5e0;
  let local_5dc;
  let local_5db;
  let local_5d8;
  let local_5d4;
  let local_5d0;
  let local_5cc;
  let local_5c8;
  let local_5c4;
  let local_5c0;
  let local_5bf;
  let local_5bc;
  let local_5b8;
  let local_5b4;
  let local_5b0;
  let local_5ac;
  let local_5a8;
  let local_5a4;
  let local_5a3;
  let local_5a0;
  let local_59c;
  let local_598;
  let local_594;
  let local_590;
  let local_58c;
  let local_588;
  let local_587;
  let local_584;
  let local_580;
  let local_57c;
  let local_578;
  let local_574;
  let local_570;
  let local_56c;
  let local_56b;
  let local_568;
  let local_564;
  let local_560;
  let local_55c;
  let local_558;
  let local_554;
  let local_550;
  let local_54f;
  let local_54c;
  let local_548;
  let local_544;
  let local_540;
  let local_53c;
  let local_538;
  let local_534;
  let local_533;
  let local_530;
  let local_52c;
  let local_528;
  let local_524;
  let local_520;
  let local_51c;
  let local_518;
  let local_517;
  let local_514;
  let local_510;
  let local_50c;
  let local_508;
  let local_504;
  let local_500;
  let local_4fc;
  let local_4fb;
  let local_4f8;
  let local_4f4;
  let local_4f0;
  let local_4ec;
  let local_4e8;
  let local_4e4;
  let local_4e0;
  let local_4df;
  let local_4dc;
  let local_4d8;
  let local_4d4;
  let local_4d0;
  let local_4cc;
  let local_4c8;
  let local_4c4;
  let local_4c3;
  let local_4c0;
  let local_4bc;
  let local_4b8;
  let local_4b4;
  let local_4b0;
  let local_4ac;
  let local_4a8;
  let local_4a7;
  let local_4a4;
  let local_4a0;
  let local_49c;
  let local_498;
  let local_494;
  let local_490;
  let local_48c;
  let local_48b;
  let local_488;
  let local_484;
  let local_480;
  let local_47c;
  let local_478;
  let local_474;
  let local_470;
  let local_46f;
  let local_46c;
  let local_468;
  let local_464;
  let local_460;
  let local_45c;
  let local_458;
  let local_454;
  let local_453;
  let local_450;
  let local_44c;
  let local_448;
  let local_444;
  let local_440;
  let local_43c;
  let local_438;
  let local_437;
  let local_434;
  let local_430;
  let local_42c;
  let local_428;
  let local_424;
  let local_420;
  let local_41c;
  let local_41b;
  let local_418;
  let local_414;
  let local_410;
  let local_40c;
  let local_408;
  let local_404;
  let local_400;
  let local_3ff;
  let local_3fc;
  let local_3f8;
  let local_3f4;
  let local_3f0;
  let local_3ec;
  let local_3e8;
  let local_3e4;
  let local_3e3;
  let local_3e0;
  let local_3dc;
  let local_3d8;
  let local_3d4;
  let local_3d0;
  let local_3cc;
  let local_3c8;
  let local_3c7;
  let local_3c4;
  let local_3c0;
  let local_3bc;
  let local_3b8;
  let local_3b4;
  let local_3b0;
  let local_3ac;
  let local_3ab;
  let local_3a8;
  let local_3a4;
  let local_3a0;
  let local_39c;
  let local_398;
  let local_394;
  let local_390;
  let local_38f;
  let local_38c;
  let local_388;
  let local_384;
  let local_380;
  let local_37c;
  let local_378;
  let local_374;
  let local_373;
  let local_370;
  let local_36c;
  let local_368;
  let local_364;
  let local_360;
  let local_35c;
  let local_358;
  let local_357;
  let local_354;
  let local_350;
  let local_34c;
  let local_348;
  let local_344;
  let local_340;
  let local_33c;
  let local_33b;
  let local_338;
  let local_334;
  let local_330;
  let local_32c;
  let local_328;
  let local_324;
  let local_320;
  let local_31f;
  let local_31c;
  let local_318;
  let local_314;
  let local_310;
  let local_30c;
  let local_308;
  let local_304;
  let local_303;
  let local_300;
  let local_2fc;
  let local_2f8;
  let local_2f4;
  let local_2f0;
  let local_2ec;
  let local_2e8;
  let local_2a0;
  let local_29c;
  let local_254;
  let local_20c;
  let local_1c4;
  let local_17c;
  let local_178;
  let local_130;
  let local_e8;
  let local_a0;
  let local_58;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004d4a62;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  FUN_005bd630();
  local_8 = 1;
  FUN_005bd630();
  local_8 = 2;
  FUN_005bd630();
  local_8 = 3;
  FUN_005bd630();
  local_8 = 4;
  FUN_005bd630();
  local_8 = 5;
  FUN_005bd630();
  local_8 = 6;
  FUN_005bd630();
  local_8 = 7;
  FUN_005bd630();
  local_8 = 8;
  FUN_005bd630();
  local_8 = 9;
  FUN_005bd630();
  local_8 = 0xa;
  FUN_005bd630();
  local_8 = 0xb;
  local_c88 = 2;
  local_c88 = 6;
  local_c84 = 0x1cf;
  local_c84 = 0xb2;
  local_c84 = 0xaa;
  local_c84 = 0x2b;
  local_c84 = 0x33;
  local_c84 = 0x204;
  local_c6c = 2;
  local_c6b = 6;
  local_c68 = 0x1d0;
  local_c64 = 0x189;
  local_c60 = 0x68;
  local_c5c = 0x3d;
  local_c58 = 0x28;
  local_c54 = 0x230;
  local_c50 = 0;
  local_c4f = 7;
  local_c4c = 0x197;
  local_c48 = 0x1df;
  local_c44 = 0x13c;
  local_c40 = 0x3a;
  local_c3c = 0x22;
  local_c38 = 0x44;
  local_c34 = 2;
  local_c33 = 2;
  local_c30 = 0x1c9;
  local_c2c = 0x1de;
  local_c28 = 0x144;
  local_c24 = 0x19;
  local_c20 = 0x36;
  local_c1c = 0x92;
  local_c18 = 2;
  local_c17 = 2;
  local_c14 = 0x1ca;
  local_c10 = 0x1fa;
  local_c0c = 0x139;
  local_c08 = 0x26;
  local_c04 = 0x27;
  local_c00 = 0xac;
  local_bfc = 0;
  local_bfb = 9;
  local_bf8 = 0x199;
  local_bf4 = 0x1e2;
  local_bf0 = 0x145;
  local_bec = 0x42;
  local_be8 = 0x37;
  local_be4 = 0x7f;
  local_be0 = 1;
  local_bdf = 2;
  local_bdc = 0x1bb;
  local_bd8 = 0x1df;
  local_bd4 = 0x13f;
  local_bd0 = 0x4d;
  local_bcc = 0x4e;
  local_bc8 = 0x69;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x90;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x38;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfd;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 1;
  local_bc4 = 0x91;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x38;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfd;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 2;
  local_bc4 = 0x92;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x38;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfd;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 3;
  local_bc4 = 0x93;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x38;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfd;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 4;
  local_bc4 = 0x94;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x38;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfd;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 6;
  local_bc4 = 0x96;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x38;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfd;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 8;
  local_bc4 = 0x98;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x38;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfd;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xa;
  local_bc4 = 0x9a;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x38;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfd;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xc;
  local_bc4 = 0x9c;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x38;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfd;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xe;
  local_bc4 = 0x9e;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x37;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfe;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x10;
  local_bc4 = 0xa0;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x37;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfe;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x12;
  local_bc4 = 0xa2;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x37;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfe;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x14;
  local_bc4 = 0xa5;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x37;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xfe;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x16;
  local_bc4 = 0xa8;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x37;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x9d;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x15;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xf0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x17;
  local_bc4 = 0xa9;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xbb;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x91;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x18;
  local_bc4 = 0xaa;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xbb;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x91;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x19;
  local_bc4 = 0xab;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xba;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x92;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1a;
  local_bc4 = 0xac;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xba;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x92;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 0xad;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xbb;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x91;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1c;
  local_bc4 = 0xae;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xbb;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x91;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1e;
  local_bc4 = 0xb1;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xbb;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x91;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x20;
  local_bc4 = 0xb4;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xbb;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x91;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x24;
  local_bc4 = 0xb7;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xbb;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x91;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x26;
  local_bc4 = 0xb8;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0xba;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x72;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x92;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0x1b;
  local_bc4 = 1;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 0;
  local_bc4 = 1;
  local_bc4 = 6;
  local_920 = 0x1c1;
  local_91c = 0x1ba;
  local_918 = 0x75;
  local_914 = 0x21;
  local_910 = 0x2b;
  local_90c = 0x1ce;
  local_908 = 5;
  local_907 = 4;
  local_904 = 0x1f0;
  local_900 = 0x18e;
  local_8fc = 0xa5;
  local_8f8 = 0x30;
  local_8f4 = 0x16;
  local_8f0 = 0x190;
  local_8ec = 3;
  local_8eb = 3;
  local_8e8 = 0x1d9;
  local_8e4 = 0x17d;
  local_8e0 = 0xa4;
  local_8dc = 0x3e;
  local_8d8 = 0x35;
  local_8d4 = 0xd2;
  local_8d0 = 4;
  local_8cf = 4;
  local_8cc = 0x1e7;
  local_8c8 = 0x1c5;
  local_8c4 = 0xa9;
  local_8c0 = 0x30;
  local_8bc = 0x24;
  local_8b8 = 0x168;
  local_8b4 = 4;
  local_8b3 = 3;
  local_8b0 = 0x1e5;
  local_8ac = 0x1e0;
  local_8a8 = 0xbd;
  local_8a4 = 0x32;
  local_8a0 = 0x24;
  local_89c = 0x103;
  local_898 = 5;
  local_897 = 4;
  local_894 = 0x1f1;
  local_890 = 0x1ad;
  local_88c = 0xb4;
  local_888 = 0x47;
  local_884 = 0x26;
  local_880 = 0x1c1;
  local_87c = 4;
  local_87b = 1;
  local_878 = 0x1e1;
  local_874 = 0x1fc;
  local_870 = 0xd2;
  local_86c = 0x2b;
  local_868 = 0x20;
  local_864 = 0x30;
  local_860 = 4;
  local_85f = 2;
  local_85c = 0x1e3;
  local_858 = 0x211;
  local_854 = 0xe1;
  local_850 = 0x37;
  local_84c = 0x2a;
  local_848 = 0x96;
  local_844 = 5;
  local_843 = 2;
  local_840 = 0x1ec;
  local_83c = 0x1af;
  local_838 = 0xc7;
  local_834 = 0x4a;
  local_830 = 0x24;
  local_82c = 0x97;
  local_828 = 3;
  local_827 = 2;
  local_824 = 0x1d7;
  local_820 = 0x1af;
  local_81c = 0xce;
  local_818 = 0x45;
  local_814 = 0x3a;
  local_810 = 0x4a;
  local_80c = 5;
  local_80b = 2;
  local_808 = 0x1ed;
  local_804 = 0x1ca;
  local_800 = 0xe9;
  local_7fc = 0x50;
  local_7f8 = 0x2f;
  local_7f4 = 0xe2;
  local_7f0 = 1;
  local_7ef = 6;
  local_7ec = 0x1c0;
  local_7e8 = 0xb2;
  local_7e4 = 0xc8;
  local_7e0 = 0x3e;
  local_7dc = 0x28;
  local_7d8 = 0x18f;
  local_7d4 = 5;
  local_7d3 = 3;
  local_7d0 = 0x1ee;
  local_7cc = 0x12c;
  local_7c8 = 0xc5;
  local_7c4 = 0x12;
  local_7c0 = 0x18;
  local_7bc = 0x133;
  local_7b8 = 3;
  local_7b7 = 4;
  local_7b4 = 0x1d8;
  local_7b0 = 0x136;
  local_7ac = 0xbc;
  local_7a8 = 0x41;
  local_7a4 = 0x38;
  local_7a0 = 0x90;
  local_79c = 5;
  local_79b = 1;
  local_798 = 0x1ea;
  local_794 = 0x153;
  local_790 = 0xe8;
  local_78c = 0x25;
  local_788 = 0x29;
  local_784 = 1;
  local_780 = 5;
  local_77f = 3;
  local_77c = 0x1ef;
  local_778 = 0x12c;
  local_774 = 0xd9;
  local_770 = 0x49;
  local_76c = 0x3c;
  local_768 = 0x146;
  local_764 = 3;
  local_763 = 1;
  local_760 = 0x1d6;
  local_75c = 0x164;
  local_758 = 0xe9;
  local_754 = 0x48;
  local_750 = 0x40;
  local_74c = 1;
  local_748 = 5;
  local_747 = 1;
  local_744 = 0x1eb;
  local_740 = 0x15e;
  local_73c = 0xfb;
  local_738 = 0x6f;
  local_734 = 0x45;
  local_730 = 0x27;
  local_72c = 4;
  local_72b = 4;
  local_728 = 0x1e6;
  local_724 = 0x109;
  local_720 = 0xed;
  local_71c = 0x31;
  local_718 = 0x2c;
  local_714 = 0x136;
  local_710 = 4;
  local_70f = 3;
  local_70c = 0x1e4;
  local_708 = 0x11f;
  local_704 = 0x107;
  local_700 = 0x34;
  local_6fc = 0x2e;
  local_6f8 = 0xce;
  local_6f4 = 4;
  local_6f3 = 1;
  local_6f0 = 0x1e0;
  local_6ec = 0x137;
  local_6e8 = 0x122;
  local_6e4 = 0x2e;
  local_6e0 = 0x28;
  local_6dc = 1;
  local_6d8 = 4;
  local_6d7 = 2;
  local_6d4 = 0x1e2;
  local_6d0 = 0x148;
  local_6cc = 0x136;
  local_6c8 = 0x39;
  local_6c4 = 0x35;
  local_6c0 = 0x5c;
  local_6bc = 2;
  local_6bb = 8;
  local_6b8 = 0x1d4;
  local_6b4 = 0x20e;
  local_6b0 = 0xf6;
  local_6ac = 0x51;
  local_6a8 = 0x36;
  local_6a4 = 0x334;
  local_6a0 = 0;
  local_69f = 0x21;
  local_69c = 0x1b6;
  local_698 = 0x24b;
  local_694 = 0x114;
  local_690 = 0x15;
  local_68c = 0x19;
  local_688 = 0x2d1;
  local_684 = 1;
  local_683 = 8;
  local_680 = 0x1c5;
  local_67c = 0x246;
  local_678 = 0x111;
  local_674 = 0x2f;
  local_670 = 0x2b;
  local_66c = 0x285;
  local_668 = 0;
  local_667 = 0x1f;
  local_664 = 0x1b3;
  local_660 = 0x210;
  local_65c = 0xfd;
  local_658 = 0x30;
  local_654 = 0x26;
  local_650 = 0x282;
  local_64c = 2;
  local_64b = 7;
  local_648 = 0x1d2;
  local_644 = 0x1f7;
  local_640 = 0x102;
  local_63c = 0x4d;
  local_638 = 0x3a;
  local_634 = 0x2ab;
  local_630 = 0;
  local_62f = 0x1d;
  local_62c = 0x1b0;
  local_628 = 0x22d;
  local_624 = 0x123;
  local_620 = 0x19;
  local_61c = 0x19;
  local_618 = 0x243;
  local_614 = 1;
  local_613 = 7;
  local_610 = 0x1c3;
  local_60c = 0x228;
  local_608 = 0x11d;
  local_604 = 0x2f;
  local_600 = 0x2e;
  local_5fc = 0x222;
  local_5f8 = 2;
  local_5f7 = 5;
  local_5f4 = 0x1ce;
  local_5f0 = 0x1f1;
  local_5ec = 0xfd;
  local_5e8 = 0x4e;
  local_5e4 = 0x39;
  local_5e0 = 0x1b5;
  local_5dc = 0;
  local_5db = 0x15;
  local_5d8 = 0x1a7;
  local_5d4 = 0x228;
  local_5d0 = 0x11d;
  local_5cc = 0x18;
  local_5c8 = 0x1a;
  local_5c4 = 0x20c;
  local_5c0 = 1;
  local_5bf = 5;
  local_5bc = 0x1bf;
  local_5b8 = 0x224;
  local_5b4 = 0x118;
  local_5b0 = 0x31;
  local_5ac = 0x2e;
  local_5a8 = 0x15d;
  local_5a4 = 0;
  local_5a3 = 0x13;
  local_5a0 = 0x1a4;
  local_59c = 0x1f0;
  local_598 = 0x107;
  local_594 = 0x34;
  local_590 = 0x35;
  local_58c = 0x1b9;
  local_588 = 2;
  local_587 = 1;
  local_584 = 0x1c8;
  local_580 = 0x1da;
  local_57c = 0x10b;
  local_578 = 0x4b;
  local_574 = 0x41;
  local_570 = 0x46;
  local_56c = 0;
  local_56b = 0xb;
  local_568 = 0x19b;
  local_564 = 0x1cf;
  local_560 = 0x108;
  local_55c = 0x42;
  local_558 = 0x3d;
  local_554 = 0xc2;
  local_550 = 2;
  local_54f = 3;
  local_54c = 0x1cb;
  local_548 = 0x1ce;
  local_544 = 0x109;
  local_540 = 0x4d;
  local_53c = 0x40;
  local_538 = 0xd3;
  local_534 = 2;
  local_533 = 1;
  local_530 = 0x1c7;
  local_52c = 0x1bc;
  local_528 = 0x11b;
  local_524 = 0x44;
  local_520 = 0x44;
  local_51c = 1;
  local_518 = 0;
  local_517 = 5;
  local_514 = 0x195;
  local_510 = 0x1e4;
  local_50c = 0x12f;
  local_508 = 0x42;
  local_504 = 0x31;
  local_500 = 1;
  local_4fc = 0;
  local_4fb = 0xd;
  local_4f8 = 0x19d;
  local_4f4 = 0x1fb;
  local_4f0 = 0x12b;
  local_4ec = 0x20;
  local_4e8 = 0x1f;
  local_4e4 = 0x105;
  local_4e0 = 1;
  local_4df = 1;
  local_4dc = 0x1ba;
  local_4d8 = 0x204;
  local_4d4 = 0x129;
  local_4d0 = 0x2f;
  local_4cc = 0x33;
  local_4c8 = 0x39;
  local_4c4 = 1;
  local_4c3 = 3;
  local_4c0 = 0x1bc;
  local_4bc = 0x1f9;
  local_4b8 = 0x125;
  local_4b4 = 0x37;
  local_4b0 = 0x35;
  local_4ac = 0xb7;
  local_4a8 = 1;
  local_4a7 = 1;
  local_4a4 = 0x1b9;
  local_4a0 = 0x1df;
  local_49c = 0x13e;
  local_498 = 0x33;
  local_494 = 0x34;
  local_490 = 1;
  local_48c = 0;
  local_48b = 0x13;
  local_488 = 0x1a3;
  local_484 = 0x1be;
  local_480 = 0x11f;
  local_47c = 0x2c;
  local_478 = 0x40;
  local_474 = 0x18c;
  local_470 = 2;
  local_46f = 5;
  local_46c = 0x1cd;
  local_468 = 0x1ac;
  local_464 = 0x117;
  local_460 = 0x42;
  local_45c = 0x46;
  local_458 = 0x172;
  local_454 = 0;
  local_453 = 0x15;
  local_450 = 0x1a6;
  local_44c = 0x1d1;
  local_448 = 0x142;
  local_444 = 0x1d;
  local_440 = 0x1d;
  local_43c = 0x1ee;
  local_438 = 1;
  local_437 = 5;
  local_434 = 0x1be;
  local_430 = 0x1cd;
  local_42c = 0x13c;
  local_428 = 0x34;
  local_424 = 0x33;
  local_420 = 0x128;
  local_41c = 2;
  local_41b = 7;
  local_418 = 0x1d1;
  local_414 = 0x19d;
  local_410 = 0x12c;
  local_40c = 0x3c;
  local_408 = 0x4b;
  local_404 = 0x26e;
  local_400 = 0;
  local_3ff = 0x1f;
  local_3fc = 0x1b2;
  local_3f8 = 0x19e;
  local_3f4 = 0x12b;
  local_3f0 = 0x24;
  local_3ec = 0x41;
  local_3e8 = 0x25d;
  local_3e4 = 0;
  local_3e3 = 0x1d;
  local_3e0 = 0x1af;
  local_3dc = 0x1bd;
  local_3d8 = 0x15c;
  local_3d4 = 0x1d;
  local_3d0 = 0x1d;
  local_3cc = 0x225;
  local_3c8 = 1;
  local_3c7 = 7;
  local_3c4 = 0x1c2;
  local_3c0 = 0x1b9;
  local_3bc = 0x157;
  local_3b8 = 0x31;
  local_3b4 = 0x34;
  local_3b0 = 0x1f0;
  local_3ac = 2;
  local_3ab = 8;
  local_3a8 = 0x1d3;
  local_3a4 = 0x188;
  local_3a0 = 0x129;
  local_39c = 0x3a;
  local_398 = 0x4e;
  local_394 = 0x2f9;
  local_390 = 0;
  local_38f = 0x21;
  local_38c = 0x1b5;
  local_388 = 0x1a5;
  local_384 = 0x15c;
  local_380 = 0x1c;
  local_37c = 0x1e;
  local_378 = 0x2b3;
  local_374 = 1;
  local_373 = 8;
  local_370 = 0x1c4;
  local_36c = 0x1a0;
  local_368 = 0x156;
  local_364 = 0x32;
  local_360 = 0x35;
  local_35c = 0x252;
  local_358 = 0;
  local_357 = 0xf;
  local_354 = 0x19f;
  local_350 = 0x1d1;
  local_34c = 0x107;
  local_348 = 0x43;
  local_344 = 0x2a;
  local_340 = 0x126;
  local_33c = 2;
  local_33b = 4;
  local_338 = 0x1cc;
  local_334 = 0x1cf;
  local_330 = 0x101;
  local_32c = 0x50;
  local_328 = 0x32;
  local_324 = 0x121;
  local_320 = 0;
  local_31f = 0x11;
  local_31c = 0x1a1;
  local_318 = 0x201;
  local_314 = 0x11a;
  local_310 = 0x21;
  local_30c = 0x1a;
  local_308 = 0x16a;
  local_304 = 1;
  local_303 = 4;
  local_300 = 0x1bd;
  local_2fc = 0x1fb;
  local_2f8 = 0x116;
  local_2f4 = 0x38;
  local_2f0 = 0x2d;
  local_2ec = 0xef;
  iVar2 = FUN_005bf5e1(0x1b9, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar2 === 0)) {
    local_d1c = 0;
    local_8 = 0xa;
    FUN_004d49d5();
    local_8 = 9;
    FUN_004d49e1();
    local_8 = 8;
    FUN_004d49ed();
    local_8 = 7;
    FUN_004d49f9();
    local_8 = 6;
    FUN_004d4a05();
    local_8 = 5;
    FUN_004d4a11();
    local_8 = 4;
    FUN_004d4a1d();
    local_8 = 3;
    FUN_004d4a29();
    local_8 = 2;
    FUN_004d4a35();
    local_8 = 1;
    FUN_004d4a3e();
    local_8 = (((local_8) >> 8) << 8);
    FUN_004d4a4a();
    local_8 = -1;
    FUN_004d4a56();
    FUN_004d4a6c();
    return;
  }
  FUN_00407ff0();
  iVar2 = FUN_005bf5e1(0x1e0, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar2 === 0)) {
    local_d20 = 0;
    local_8 = 0xa;
    FUN_004d49d5();
    local_8 = 9;
    FUN_004d49e1();
    local_8 = 8;
    FUN_004d49ed();
    local_8 = 7;
    FUN_004d49f9();
    local_8 = 6;
    FUN_004d4a05();
    local_8 = 5;
    FUN_004d4a11();
    local_8 = 4;
    FUN_004d4a1d();
    local_8 = 3;
    FUN_004d4a29();
    local_8 = 2;
    FUN_004d4a35();
    local_8 = 1;
    FUN_004d4a3e();
    local_8 = (((local_8) >> 8) << 8);
    FUN_004d4a4a();
    local_8 = -1;
    FUN_004d4a56();
    FUN_004d4a6c();
    return;
  }
  FUN_00407ff0();
  iVar2 = FUN_005bf5e1(0x1c7, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar2 === 0)) {
    local_d24 = 0;
    local_8 = 0xa;
    FUN_004d49d5();
    local_8 = 9;
    FUN_004d49e1();
    local_8 = 8;
    FUN_004d49ed();
    local_8 = 7;
    FUN_004d49f9();
    local_8 = 6;
    FUN_004d4a05();
    local_8 = 5;
    FUN_004d4a11();
    local_8 = 4;
    FUN_004d4a1d();
    local_8 = 3;
    FUN_004d4a29();
    local_8 = 2;
    FUN_004d4a35();
    local_8 = 1;
    FUN_004d4a3e();
    local_8 = (((local_8) >> 8) << 8);
    FUN_004d4a4a();
    local_8 = -1;
    FUN_004d4a56();
    FUN_004d4a6c();
    return;
  }
  FUN_00407ff0();
  iVar2 = FUN_005bf5e1(0x1ea, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar2 === 0)) {
    local_d28 = 0;
    local_8 = 0xa;
    FUN_004d49d5();
    local_8 = 9;
    FUN_004d49e1();
    local_8 = 8;
    FUN_004d49ed();
    local_8 = 7;
    FUN_004d49f9();
    local_8 = 6;
    FUN_004d4a05();
    local_8 = 5;
    FUN_004d4a11();
    local_8 = 4;
    FUN_004d4a1d();
    local_8 = 3;
    FUN_004d4a29();
    local_8 = 2;
    FUN_004d4a35();
    local_8 = 1;
    FUN_004d4a3e();
    local_8 = (((local_8) >> 8) << 8);
    FUN_004d4a4a();
    local_8 = -1;
    FUN_004d4a56();
    FUN_004d4a6c();
    return;
  }
  FUN_00407ff0();
  iVar2 = FUN_005bf5e1(0x1d6, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar2 === 0)) {
    local_d2c = 0;
    local_8 = 0xa;
    FUN_004d49d5();
    local_8 = 9;
    FUN_004d49e1();
    local_8 = 8;
    FUN_004d49ed();
    local_8 = 7;
    FUN_004d49f9();
    local_8 = 6;
    FUN_004d4a05();
    local_8 = 5;
    FUN_004d4a11();
    local_8 = 4;
    FUN_004d4a1d();
    local_8 = 3;
    FUN_004d4a29();
    local_8 = 2;
    FUN_004d4a35();
    local_8 = 1;
    FUN_004d4a3e();
    local_8 = (((local_8) >> 8) << 8);
    FUN_004d4a4a();
    local_8 = -1;
    FUN_004d4a56();
    FUN_004d4a6c();
    return;
  }
  FUN_00407ff0();
  iVar2 = FUN_005bf5e1(0x1ba, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar2 === 0)) {
    local_d30 = 0;
    local_8 = 0xa;
    FUN_004d49d5();
    local_8 = 9;
    FUN_004d49e1();
    local_8 = 8;
    FUN_004d49ed();
    local_8 = 7;
    FUN_004d49f9();
    local_8 = 6;
    FUN_004d4a05();
    local_8 = 5;
    FUN_004d4a11();
    local_8 = 4;
    FUN_004d4a1d();
    local_8 = 3;
    FUN_004d4a29();
    local_8 = 2;
    FUN_004d4a35();
    local_8 = 1;
    FUN_004d4a3e();
    local_8 = (((local_8) >> 8) << 8);
    FUN_004d4a4a();
    local_8 = -1;
    FUN_004d4a56();
    FUN_004d4a6c();
    return;
  }
  FUN_00407ff0();
  iVar2 = FUN_005bf5e1(0x1e1, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar2 === 0)) {
    local_d34 = 0;
    local_8 = 0xa;
    FUN_004d49d5();
    local_8 = 9;
    FUN_004d49e1();
    local_8 = 8;
    FUN_004d49ed();
    local_8 = 7;
    FUN_004d49f9();
    local_8 = 6;
    FUN_004d4a05();
    local_8 = 5;
    FUN_004d4a11();
    local_8 = 4;
    FUN_004d4a1d();
    local_8 = 3;
    FUN_004d4a29();
    local_8 = 2;
    FUN_004d4a35();
    local_8 = 1;
    FUN_004d4a3e();
    local_8 = (((local_8) >> 8) << 8);
    FUN_004d4a4a();
    local_8 = -1;
    FUN_004d4a56();
    FUN_004d4a6c();
    return;
  }
  FUN_00407ff0();
  iVar2 = FUN_005bf5e1(0x1c8, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar2 !== 0)) {
    FUN_00407ff0();
    iVar2 = FUN_005bf5e1(0x1e9, 0xa, 0xec, (in_ECX + 0x1f8));
    if ((iVar2 === 0)) {
      local_d3c = 0;
      local_8 = 0xa;
      FUN_004d49d5();
      local_8 = 9;
      FUN_004d49e1();
      local_8 = 8;
      FUN_004d49ed();
      local_8 = 7;
      FUN_004d49f9();
      local_8 = 6;
      FUN_004d4a05();
      local_8 = 5;
      FUN_004d4a11();
      local_8 = 4;
      FUN_004d4a1d();
      local_8 = 3;
      FUN_004d4a29();
      local_8 = 2;
      FUN_004d4a35();
      local_8 = 1;
      FUN_004d4a3e();
      local_8 = (((local_8) >> 8) << 8);
      FUN_004d4a4a();
      local_8 = -1;
      FUN_004d4a56();
      FUN_004d4a6c();
      return;
    }
    FUN_00407ff0();
    iVar2 = FUN_005bf5e1(0x1d7, 0xa, 0xec, (in_ECX + 0x1f8));
    if ((iVar2 === 0)) {
      local_d40 = 0;
      local_8 = 0xa;
      FUN_004d49d5();
      local_8 = 9;
      FUN_004d49e1();
      local_8 = 8;
      FUN_004d49ed();
      local_8 = 7;
      FUN_004d49f9();
      local_8 = 6;
      FUN_004d4a05();
      local_8 = 5;
      FUN_004d4a11();
      local_8 = 4;
      FUN_004d4a1d();
      local_8 = 3;
      FUN_004d4a29();
      local_8 = 2;
      FUN_004d4a35();
      local_8 = 1;
      FUN_004d4a3e();
      local_8 = (((local_8) >> 8) << 8);
      FUN_004d4a4a();
      local_8 = -1;
      FUN_004d4a56();
      FUN_004d4a6c();
      return;
    }
    FUN_00407ff0();
    iVar2 = FUN_005bf5e1(0x1eb, 0xa, 0xec, (in_ECX + 0x1f8));
    if ((iVar2 === 0)) {
      local_d44 = 0;
      local_8 = 0xa;
      FUN_004d49d5();
      local_8 = 9;
      FUN_004d49e1();
      local_8 = 8;
      FUN_004d49ed();
      local_8 = 7;
      FUN_004d49f9();
      local_8 = 6;
      FUN_004d4a05();
      local_8 = 5;
      FUN_004d4a11();
      local_8 = 4;
      FUN_004d4a1d();
      local_8 = 3;
      FUN_004d4a29();
      local_8 = 2;
      FUN_004d4a35();
      local_8 = 1;
      FUN_004d4a3e();
      local_8 = (((local_8) >> 8) << 8);
      FUN_004d4a4a();
      local_8 = -1;
      FUN_004d4a56();
      FUN_004d4a6c();
      return;
    }
    FUN_00407ff0();
    for (/* cond: (local_2a0 < 7) */); local_2a0 = (local_2a0 < 7); local_2a0 = (local_2a0 + 1)) {
      FUN_00407ff0();
      if ((u8(DAT_fffff378[(local_2a0 * 0x1c + 1)]) <= s32((DAT_006a5b10 + u8(DAT_fffff378[local_2a0 * 0x1c]) * 4), 0))) {
        if ((DAT_fffff378[local_2a0 * 0x1c] === 1)) {
          bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
          iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 1);
          if ((iVar2 < u8(bVar1))) {
            FUN_005cedad(DAT_fffffe88, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
          else {
            FUN_005cedad(DAT_fffffd64, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
        }
        else if ((DAT_fffff378[local_2a0 * 0x1c] === 4)) {
          bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
          iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 4);
          if ((iVar2 < u8(bVar1))) {
            FUN_005cedad(DAT_fffffdf4, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
          else {
            FUN_005cedad(DAT_fffffe3c, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
        }
        else if ((DAT_fffff378[local_2a0 * 0x1c] === 2)) {
          bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
          iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 2);
          if ((iVar2 < u8(bVar1))) {
            FUN_005cedad(DAT_fffffdac, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
          else {
            FUN_005cedad(DAT_ffffffa8, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
        }
        else if ((DAT_fffff378[local_2a0 * 0x1c] === 5)) {
          bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
          iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 5);
          if ((iVar2 < u8(bVar1))) {
            FUN_005cedad(DAT_ffffff18, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
          else {
            FUN_005cedad(DAT_fffff2e8, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
        }
        else if ((DAT_fffff378[local_2a0 * 0x1c] === 3)) {
          bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
          iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 3);
          if ((iVar2 < u8(bVar1))) {
            FUN_005cedad(DAT_ffffff60, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
          else {
            FUN_005cedad(DAT_fffff330, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
        }
        else {
          FUN_005cedad(DAT_fffffed0, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
        }
        FUN_005cef31(DAT_fffff2ac, (in_ECX + 0x8f4), (s32(DAT_fffff37c, (local_2a0 * 7 + 1)) + -0xaf), (s32(DAT_fffff37c, (local_2a0 * 7 + 2)) + -99));
      }
    }
    local_17c = 0;
    for (/* cond: (local_2a0 < 0x1f) */); local_2a0 = (local_2a0 < 0x1f); local_2a0 = (local_2a0 + 1)) {
      if ((u8(DAT_fffff378[(local_2a0 * 0x1c + 1)]) <= s32((DAT_006a5b10 + u8(DAT_fffff378[local_2a0 * 0x1c]) * 4), 0))) {
        local_17c = local_2a0;
      }
    }
    FUN_00407ff0();
    iVar2 = FUN_005bf5e1(s32(DAT_fffff37c, local_17c * 7), 0xa, 0xec, (in_ECX + 0x1f8));
    if ((iVar2 !== 0)) {
      FUN_00407ff0();
      FUN_005cedad(DAT_fffffd18, 9, s32(DAT_fffff37c, (local_17c * 7 + 1)), s32(DAT_fffff37c, (local_17c * 7 + 2)), s32(DAT_fffff37c, (local_17c * 7 + 3)), s32(DAT_fffff37c, (local_17c * 7 + 4)));
      FUN_005cef31(DAT_fffff298, (in_ECX + 0x8f4), (s32(DAT_fffff37c, (local_17c * 7 + 1)) + -0xaf), (s32(DAT_fffff37c, (local_17c * 7 + 2)) + -99));
      for (/* cond: (local_2a0 < 0x58) */); local_2a0 = (local_2a0 < 0x58); local_2a0 = (local_2a0 + 1)) {
        FUN_00407ff0();
        FUN_00407ff0();
        if ((u8(DAT_fffff378[(local_2a0 * 0x1c + 1)]) <= s32((DAT_006a5b10 + u8(DAT_fffff378[local_2a0 * 0x1c]) * 4), 0))) {
          if ((DAT_fffff378[local_2a0 * 0x1c] === 1)) {
            bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
            iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 1);
            if ((iVar2 < u8(bVar1))) {
              FUN_005cedad(DAT_fffffe88, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
            else {
              FUN_005cedad(DAT_fffffd64, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
          }
          else if ((DAT_fffff378[local_2a0 * 0x1c] === 4)) {
            bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
            iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 4);
            if ((iVar2 < u8(bVar1))) {
              FUN_005cedad(DAT_fffffdf4, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
            else {
              FUN_005cedad(DAT_fffffe3c, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
          }
          else if ((DAT_fffff378[local_2a0 * 0x1c] === 2)) {
            bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
            iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 2);
            if ((iVar2 < u8(bVar1))) {
              FUN_005cedad(DAT_fffffdac, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
            else {
              FUN_005cedad(DAT_ffffffa8, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
          }
          else if ((DAT_fffff378[local_2a0 * 0x1c] === 5)) {
            bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
            iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 5);
            if ((iVar2 < u8(bVar1))) {
              FUN_005cedad(DAT_ffffff18, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
            else {
              FUN_005cedad(DAT_fffff2e8, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
          }
          else if ((DAT_fffff378[local_2a0 * 0x1c] === 3)) {
            bVar1 = DAT_fffff378[(local_2a0 * 0x1c + 1)];
            iVar2 = FUN_00596c08(s32((in_ECX + 0x1cc), 0), 3);
            if ((iVar2 < u8(bVar1))) {
              FUN_005cedad(DAT_ffffff60, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
            else {
              FUN_005cedad(DAT_fffff330, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
            }
          }
          else {
            FUN_005cedad(DAT_fffffed0, 9, s32(DAT_fffff37c, (local_2a0 * 7 + 5)), 1, s32(DAT_fffff37c, (local_2a0 * 7 + 3)), s32(DAT_fffff37c, (local_2a0 * 7 + 4)));
          }
          FUN_005cef31(DAT_fffff288, (in_ECX + 0x8f4), (s32(DAT_fffff37c, (local_2a0 * 7 + 1)) + -0xaf), (s32(DAT_fffff37c, (local_2a0 * 7 + 2)) + -99));
        }
      }
      FUN_005cedad((in_ECX + 0x8f4), 9, 0, 0, 0x1c9, 0x130);
      FUN_00407ff0();
      if ((s32((in_ECX + 0xae0), 0) === 3)) {
        FUN_005c041f(0);
      }
      FUN_005cef31(DAT_fffff278, (in_ECX + 0xb8), 0xaf, 0x63);
      FUN_004d043f(s32((in_ECX + 0x1cc), 0));
      local_8 = 0xa;
      FUN_004d49d5();
      local_8 = 9;
      FUN_004d49e1();
      local_8 = 8;
      FUN_004d49ed();
      local_8 = 7;
      FUN_004d49f9();
      local_8 = 6;
      FUN_004d4a05();
      local_8 = 5;
      FUN_004d4a11();
      local_8 = 4;
      FUN_004d4a1d();
      local_8 = 3;
      FUN_004d4a29();
      local_8 = 2;
      FUN_004d4a35();
      local_8 = 1;
      FUN_004d4a3e();
      local_8 = (UNNAMED << 8);
      FUN_004d4a4a();
      local_8 = -1;
      FUN_004d4a56();
      FUN_004d4a6c();
      return;
    }
    local_d58 = 0;
    local_8 = 0xa;
    FUN_004d49d5();
    local_8 = 9;
    FUN_004d49e1();
    local_8 = 8;
    FUN_004d49ed();
    local_8 = 7;
    FUN_004d49f9();
    local_8 = 6;
    FUN_004d4a05();
    local_8 = 5;
    FUN_004d4a11();
    local_8 = 4;
    FUN_004d4a1d();
    local_8 = 3;
    FUN_004d4a29();
    local_8 = 2;
    FUN_004d4a35();
    local_8 = 1;
    FUN_004d4a3e();
    local_8 = (UNNAMED << 8);
    FUN_004d4a4a();
    local_8 = -1;
    FUN_004d4a56();
    FUN_004d4a6c();
    return;
  }
  local_d38 = 0;
  local_8 = 0xa;
  FUN_004d49d5();
  local_8 = 9;
  FUN_004d49e1();
  local_8 = 8;
  FUN_004d49ed();
  local_8 = 7;
  FUN_004d49f9();
  local_8 = 6;
  FUN_004d4a05();
  local_8 = 5;
  FUN_004d4a11();
  local_8 = 4;
  FUN_004d4a1d();
  local_8 = 3;
  FUN_004d4a29();
  local_8 = 2;
  FUN_004d4a35();
  local_8 = 1;
  FUN_004d4a3e();
  local_8 = (((local_8) >> 8) << 8);
  FUN_004d4a4a();
  local_8 = -1;
  FUN_004d4a56();
  FUN_004d4a6c();
  return;
}


 export function FUN_004d49d5 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d49e1 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d49ed ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d49f9 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d4a05 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d4a11 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d4a1d ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d4a29 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d4a35 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d4a3e ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d4a4a ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d4a56 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d4a6c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004d4a7b (in_ECX)

 {
  let sVar1;
  let bVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_c;

  bVar2 = 0;
  FUN_004aef20((in_ECX + 0x638));
  for (/* cond: (local_c < 6) */); local_c = (local_c < 6); local_c = (local_c + 1)) {
    sVar1 = s16((DAT_0064caa8 + (s32((in_ECX + 0x1cc), 0) * 0x594 + local_c * 2)), 0);
    iVar3 = FUN_00596b00(s32((in_ECX + 0x1cc), 0), local_c);
    if ((iVar3 < ((sVar1) << 16 >> 16))) {
      bVar2 = 1;
    }
  }
  for (/* cond: (local_c < 6) */); local_c = (local_c < 6); local_c = (local_c + 1)) {
    FUN_004af122((in_ECX + 0x638), s32((DAT_00628420 + s32((DAT_00634f60 + local_c * 0xc), 0) * 4), 0));
    FUN_004aefb7((in_ECX + 0x638));
    FUN_004af1d5((in_ECX + 0x638), ((s16((DAT_0064caa8 + (s32((in_ECX + 0x1cc), 0) * 0x594 + local_c * 2)), 0)) << 16 >> 16));
    if ((local_c === 0)) {
      FUN_0043c840((in_ECX + 0x638), DAT_0062e2f4);
    }
    FUN_0043c840((in_ECX + 0x638), DAT_0062e2f8);
  }
  FUN_004af14b((in_ECX + 0x638), 0x22);
  FUN_004aefb7((in_ECX + 0x638));
  FUN_004af1d5((in_ECX + 0x638), ((s16((DAT_0064caae + s32((in_ECX + 0x1cc), 0) * 0x594), 0)) << 16 >> 16));
  FUN_0043c840((in_ECX + 0x638), s_0,000_0062e2fc);
  FUN_0043c840((in_ECX + 0x638), DAT_0062e304);
  FUN_004af14b((in_ECX + 0x638), 0x42);
  FUN_004aefb7((in_ECX + 0x638));
  FUN_004af1d5((in_ECX + 0x638), DAT_006ad0f0);
  FUN_004aeff9((in_ECX + 0x638));
  FUN_0043c840((in_ECX + 0x638), DAT_0062e308);
  FUN_004af14b((in_ECX + 0x638), 0xcd);
  FUN_004aefb7((in_ECX + 0x638));
  FUN_004af1d5((in_ECX + 0x638), DAT_006ad0e8);
  FUN_004aeff9((in_ECX + 0x638));
  FUN_0043c840((in_ECX + 0x638), DAT_0062e30c);
  FUN_004af14b((in_ECX + 0x638), 0xce);
  FUN_004aefb7((in_ECX + 0x638));
  FUN_004af1d5((in_ECX + 0x638), (DAT_006ad0e4 / 0xa | 0));
  FUN_0043c840((in_ECX + 0x638), DAT_0062e310);
  FUN_004af1d5((in_ECX + 0x638), (DAT_006ad0e4 % 0xa));
  FUN_0043c840((in_ECX + 0x638), DAT_0062e314);
  FUN_004af14b((in_ECX + 0x638), 0xd1);
  FUN_0043c840((in_ECX + 0x638), DAT_0062e318);
  FUN_004af14b((in_ECX + 0x638), 0xc8);
  FUN_004aefb7((in_ECX + 0x638));
  FUN_004af1d5((in_ECX + 0x638), DAT_006ad0dc);
  FUN_004aeff9((in_ECX + 0x638));
  if (((DAT_0064caa0[s32((in_ECX + 0x1cc), 0) * 0x594] & 8) !== 0)) {
    FUN_004aef36((in_ECX + 0x638));
    FUN_004af01a((in_ECX + 0x638));
    FUN_004af14b((in_ECX + 0x638), 0xeb);
    FUN_004af03b((in_ECX + 0x638));
  }
  FUN_0043c840((in_ECX + 0x638), DAT_0062e31c);
  FUN_004af14b((in_ECX + 0x638), 0xcf);
  FUN_004aefb7((in_ECX + 0x638));
  FUN_004af1d5((in_ECX + 0x638), (DAT_006ad0f4 / 0xa | 0));
  FUN_0043c840((in_ECX + 0x638), DAT_0062e320);
  FUN_004af1d5((in_ECX + 0x638), (DAT_006ad0f4 % 0xa));
  FUN_004aef36((in_ECX + 0x638));
  FUN_004af14b((in_ECX + 0x638), 0xd2);
  FUN_004aef20((in_ECX + 0x838));
  FUN_004af14b((in_ECX + 0x838), 0xd0);
  FUN_004aefb7((in_ECX + 0x838));
  FUN_004aef36((in_ECX + 0x838));
  FUN_004af1d5((in_ECX + 0x838), DAT_006ad0ec);
  FUN_004aeff9((in_ECX + 0x838));
  FUN_00407ff0();
  return;
}


 export function FUN_004d4fd1 (in_ECX, param_1)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let bVar4;
  let yBottom;
  let local_18;
  let local_17;
  let local_14;

  if ((iVar1 === 0)) {
    uVar2 = FUN_004d8af0();
    iVar1 = FUN_005c847f(uVar2);
    FUN_00407ff0();
    local_18 = _MEM[((s32((in_ECX + 0x8c0), 0) + 0x638) + in_ECX)];
    local_17 = 0;
    FUN_005c19ad(0xf9);
    if ((s32((in_ECX + 0x1db4), 0) === 0)) {
      FUN_005c19ad(0xfe);
    }
    else {
      FUN_005c19ad(0xf9);
    }
    FUN_005c0f57((in_ECX + 0x8d4), DAT_ffffffe8, s32((in_ECX + 0x8b8), 0), s32((in_ECX + 0x8bc), 0), 1);
    yBottom = (s32((in_ECX + 0x8bc), 0) + iVar1 * 2);
    uVar2 = FUN_004d8af0(DAT_ffffffe8);
    iVar3 = FUN_005c858e(uVar2);
    FUN_006e7d90(DAT_ffffffec, s32((in_ECX + 0x8b8), 0), (s32((in_ECX + 0x8bc), 0) - iVar1), (s32((in_ECX + 0x8b8), 0) + iVar3), yBottom);
    uVar2 = FUN_004d8af0(DAT_ffffffe8);
    iVar1 = FUN_005c858e(uVar2);
    w32((in_ECX + 0x8b8), 0, (s32((in_ECX + 0x8b8), 0) + iVar1));
    if ((_MEM[((s32((in_ECX + 0x8c0), 0) + 0x638) + in_ECX)] === 0x3a)) {
      w32((in_ECX + 0x1db4), 0, 0);
    }
    w32((in_ECX + 0x8c0), 0, (s32((in_ECX + 0x8c0), 0) + 1));
    while ((_MEM[((s32((in_ECX + 0x8c0), 0) + 0x638) + in_ECX)] === 0xa)) {
      w32((in_ECX + 0x1db4), 0, 1);
      w32((in_ECX + 0x8b8), 0, 0xa);
      uVar2 = FUN_004d8af0();
      iVar1 = FUN_005c847f(uVar2);
      w32((in_ECX + 0x8bc), 0, (s32((in_ECX + 0x8bc), 0) + iVar1));
      w32((in_ECX + 0x8c0), 0, (s32((in_ECX + 0x8c0), 0) + 1));
    }
    if ((_MEM[((s32((in_ECX + 0x8c0), 0) + 0x638) + in_ECX)] === 0)) {
      if ((s32((in_ECX + 0x62c), 0) !== 0)) {
        FUN_005d2004(s32((in_ECX + 0x62c), 0));
        w32((in_ECX + 0x62c), 0, 0);
      }
      if ((s32((in_ECX + 0xae0), 0) !== 3)) {
        FUN_006e7d90((in_ECX + 0x8dc), 0, 0x1c1, 0x27f, 0x1df);
        FUN_0043c790((in_ECX + 0x8dc), 1, 1);
        FUN_005c19ad(0xa);
        FUN_005c1020((in_ECX + 0x8cc), (in_ECX + 0x838), (in_ECX + 0x8dc), 0);
        FUN_0043c790((in_ECX + 0x8dc), -1, -1);
        if ((DAT_006ad0ec < 0x28)) {
          FUN_005c19ad(0xf9);
        }
        else if ((DAT_006ad0ec < 0x4b)) {
          FUN_005c19ad(0xfb);
        }
        else {
          FUN_005c19ad(0xfa);
        }
        FUN_005c1020((in_ECX + 0x8cc), (in_ECX + 0x838), (in_ECX + 0x8dc), 0);
        FUN_00408490((in_ECX + 0x8dc));
        FUN_00419b80();
      }
      if ((s32((in_ECX + 0xae0), 0) === 1)) {
        uVar2 = FUN_005d1f50(LAB_00403a53, 0x1f4, -1);
        w32((in_ECX + 0x630), 0, uVar2);
      }
      w32((in_ECX + 0x8f0), 0, 1);
    }
    FUN_00408490(DAT_ffffffec);
    bVar4 = (_MEM[((s32((in_ECX + 0x8c0), 0) + 0x638) + in_ECX)] !== 0);
  }
  else {
    bVar4 = 1;
  }
  return bVar4;
}


 export function FUN_004d53ab (in_ECX)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_68;
  let local_20;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004d56f3;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  FUN_005c19ad(0x8b);
  iVar1 = FUN_005bf5e1(0x1f1, 0xa, 0xec, (in_ECX + 0x1f8));
  if ((iVar1 !== 0)) {
    FUN_0040bbb0();
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
    FUN_0040bbe0(uVar2);
    FUN_006e7d90(DAT_ffffffe0, 0, 0, 0x34, 0x24);
    FUN_006e7da4(DAT_ffffffe0, 1, 1);
    FUN_005c1020((in_ECX + 0x8d4), DAT_00679640, DAT_ffffffe0, 0);
    FUN_005cedad(DAT_ffffff98, 9, 1, 1, 0x34, 0x24);
    FUN_006e7da4(DAT_ffffffe0, 0x35, 0);
    FUN_005c1020((in_ECX + 0x8d4), DAT_00679640, DAT_ffffffe0, 0);
    FUN_005cedad(DAT_ffffff98, 9, 0x36, 1, 0x34, 0x24);
    FUN_006e7da4(DAT_ffffffe0, 0x35, 0);
    FUN_005c1020((in_ECX + 0x8d4), DAT_00679640, DAT_ffffffe0, 0);
    FUN_005cedad(DAT_ffffff98, 9, 0x6b, 1, 0x34, 0x24);
    FUN_005c19ad(0xc6);
    FUN_0040bbb0();
    if ((DAT_00628064 === 0)) {
      uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x354), 0));
      FUN_0040bbe0(uVar2);
    }
    else if ((DAT_00628064 === 1)) {
      FUN_0040bbe0(s_Lancer_0062e324);
    }
    else if ((DAT_00628064 === 2)) {
      FUN_0040bbe0(s_Starten_0062e32c);
    }
    FUN_006e7d90(DAT_ffffffe0, 0, 0, 0x43, 0x24);
    FUN_006e7da4(DAT_ffffffe0, 1, 0x26);
    FUN_005c1020((in_ECX + 0x8d4), DAT_00679640, DAT_ffffffe0, 0);
    FUN_005cedad(DAT_ffffff98, 9, 1, 0x26, 0x43, 0x24);
    FUN_006e7da4(DAT_ffffffe0, 0x44, 0);
    FUN_005c1020((in_ECX + 0x8d4), DAT_00679640, DAT_ffffffe0, 0);
    FUN_005cedad(DAT_ffffff98, 9, 0x45, 0x26, 0x43, 0x24);
    FUN_006e7da4(DAT_ffffffe0, 0x44, 0);
    FUN_005c1020((in_ECX + 0x8d4), DAT_00679640, DAT_ffffffe0, 0);
    FUN_005cedad(DAT_ffffff98, 9, 0x89, 0x26, 0x43, 0x24);
    local_8 = -1;
    FUN_004d56ea();
    FUN_004d56fd();
    return;
  }
  local_8 = -1;
  FUN_004d56ea();
  FUN_004d56fd();
  return;
}


 export function FUN_004d56ea ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004d56fd (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004d570b (in_ECX)

 {
  let uVar1;
  let yBottom;
  let xRight;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_30;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  for (/* cond: (local_20 < 0x50) */); local_20 = (local_20 < 0x50); local_20 = (local_20 + 1)) {
    uVar1 = FUN_0059a791(-0x7d00, 0x7d00);
    w32(((in_ECX + 0x1db8) + local_20 * 0xc), 0, uVar1);
    uVar1 = FUN_0059a791(-0x5dc0, 0x5dc0);
    w32(((in_ECX + 0x1dbc) + local_20 * 0xc), 0, uVar1);
    uVar1 = FUN_0059a791(1, 0x64);
    w32(((in_ECX + 0x1dc0) + local_20 * 0xc), 0, uVar1);
  }
  yBottom = GetActiveView((in_ECX + 0xb8));
  xRight = GetActiveView((in_ECX + 0xb8));
  FUN_006e7d90(DAT_ffffffec, 0, 0x14, xRight, yBottom);
  FUN_005c0333(DAT_ffffffec, 0xa);
  for (/* cond: (local_20 < 0x50) */); local_20 = (local_20 < 0x50); local_20 = (local_20 + 1)) {
    local_18 = ((s32(((in_ECX + 0x1db8) + local_20 * 0xc), 0) / s32(((in_ECX + 0x1dc0) + local_20 * 0xc), 0) | 0) + 0x140);
    local_1c = ((s32(((in_ECX + 0x1dbc) + local_20 * 0xc), 0) / s32(((in_ECX + 0x1dc0) + local_20 * 0xc), 0) | 0) + 0xf0);
    if ((local_1c < 0)) {
      uVar1 = FUN_0059a791(-0x7d00, 0x7d00);
      w32(((in_ECX + 0x1db8) + local_20 * 0xc), 0, uVar1);
      uVar1 = FUN_0059a791(-0x5dc0, 0x5dc0);
      w32(((in_ECX + 0x1dbc) + local_20 * 0xc), 0, uVar1);
      w32(((in_ECX + 0x1dc0) + local_20 * 0xc), 0, 0x64);
      local_18 = ((s32(((in_ECX + 0x1db8) + local_20 * 0xc), 0) / s32(((in_ECX + 0x1dc0) + local_20 * 0xc), 0) | 0) + 0x140);
      local_1c = ((s32(((in_ECX + 0x1dbc) + local_20 * 0xc), 0) / s32(((in_ECX + 0x1dc0) + local_20 * 0xc), 0) | 0) + 0xf0);
    }
    FUN_005c0c5d(local_18, local_1c, 0x29);
  }
  w32((in_ECX + 0x8c0), 0, 0);
  w32((in_ECX + 0x8b8), 0, 0xa);
  w32((in_ECX + 0x8bc), 0, 0x73);
  w32((in_ECX + 0x1db4), 0, 1);
  do {
    iVar2 = FUN_004d4fd1(0);
  } while ((iVar2 !== 0));
  FUN_004aef20((in_ECX + 0x838));
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x718), 0));
  FUN_0043c840((in_ECX + 0x838), uVar1);
  FUN_004aefb7((in_ECX + 0x838));
  FUN_004aef36((in_ECX + 0x838));
  FUN_00485208((in_ECX + 0x838), ((s16((DAT_0064caa2 + s32((in_ECX + 0x1cc), 0) * 0x594), 0)) << 16 >> 16));
  FUN_006e7d90((in_ECX + 0x8dc), 0, 0x1c1, 0x27f, 0x1df);
  FUN_0043c790((in_ECX + 0x8dc), 1, 1);
  FUN_005c19ad(0xa);
  FUN_005c1020((in_ECX + 0x8cc), (in_ECX + 0x838), (in_ECX + 0x8dc), 0);
  FUN_0043c790((in_ECX + 0x8dc), -1, -1);
  FUN_005c19ad(0xfa);
  FUN_005c1020((in_ECX + 0x8cc), (in_ECX + 0x838), (in_ECX + 0x8dc), 0);
  FUN_00408490((in_ECX + 0x8dc));
  FUN_005cef31(DAT_ffffffd0, (in_ECX + 0xb8), 0xaf, 0x63);
  if ((s32((in_ECX + 0xae0), 0) === 3)) {
    w32((in_ECX + 0x8bc), 0, 0x8c);
  }
  return;
}


 export function FUN_004d5b21 (in_ECX)

 {
  let pvVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_9c;
  let local_94;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004d5e29;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0046e6a9();
  pvVar1 = operator_new(0xa28);
  local_8 = 0;
  if ((pvVar1 === 0)) {
    local_9c = 0;
  }
  else {
    local_9c = FUN_005dd010();
  }
  local_8 = -1;
  w32((in_ECX + 0x1da8), 0, local_9c);
  FUN_004aef20(DAT_ffffff6c);
  FUN_0043c840(DAT_ffffff6c, s_civ2\video\launch.avi_0062e334);
  iVar2 = FUN_00564713(DAT_ffffff6c);
  if ((iVar2 !== 0)) {
    FUN_005dd27e(DAT_0062e34c, 0x800, 0, 0);
    FUN_005dd71e(1);
    local_14 = FUN_005dd377(DAT_ffffff6c);
    if ((local_14 !== 0)) {
      if ((local_14 === -0x7ffbfeac)) {
        FUN_00421ea0(s_VFWNOTREGISTERED_0062e350);
      }
      goto LAB_004d5e33;
    }
    FUN_004503d0();
    FUN_00419b80();
    FUN_005c041f(0);
    FUN_00408130(LAB_0040308f);
    in_ECX = (in_ECX + 0x1da8);
    in_ECX = (in_ECX + 0x1da8);
    FUN_00450400();
    FUN_00408460();
    FUN_004085f0();
    FUN_00419b80();
    FUN_005dd3c2();
    FUN_00421bd0();
    FUN_00414ce0();
    if ((2 < DAT_00655b02)) {
      in_ECX = (in_ECX + 0x1da8);
    }
    FUN_005c61b0();
    in_ECX = (in_ECX + 0x1da8);
    FUN_00414d40();
    FUN_004503d0();
    FUN_00419b80();
  }
  if ((s32((in_ECX + 0x1da8), 0) !== 0)) {
    FUN_004d8b20(1);
  }
  w32((in_ECX + 0x1da8), 0, 0);
  FUN_0046e6c8();
 LAB_004d5e33: :
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_004d5e41 (in_ECX)

 {
  // in_ECX promoted to parameter;

  in_ECX = (in_ECX + 0xae4);
  if ((s32((in_ECX + 0xae0), 0) !== 0)) {
    FUN_004d8b70(0, 0x1f5, 0x1a1, 0x34, 0x24);
    FUN_004d8b70(1, 0x22f, 0x1a1, 0x43, 0x24);
  }
  else {
    FUN_004d8b70(0, 0x22f, 0x1a1, 0x43, 0x24);
  }
  return;
}


 export function FUN_004d5ef9 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_14;

  if ((s32((in_ECX + 0xae0), 0) !== 0)) {
    FUN_006e7d90(DAT_ffffffec, 0x1f5, 0x1a1, 0x229, 0x1c5);
    FUN_005c0333(DAT_ffffffec, 0);
  }
  FUN_004d5f79(1, 1);
  FUN_004d60a5(0, 1);
  return;
}


 export function FUN_004d5f79 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;
  let local_44;
  let local_34;
  let local_24;
  let local_14;

  if ((s32((in_ECX + 0xae0), 0) !== 0)) {
    FUN_006e7d90(DAT_ffffffec, 0x1f5, 0x1a1, 0x229, 0x1c5);
  }
  else {
    FUN_006e7d90(DAT_ffffffec, 0x22f, 0x1a1, 0x272, 0x1c5);
  }
  if ((param_2 === 0)) {
    FUN_005cef31(DAT_ffffffdc, (in_ECX + 0xb8), UNNAMED, UNNAMED);
  }
  else if ((param_1 === 0)) {
    FUN_005cef31(DAT_ffffffbc, (in_ECX + 0xb8), UNNAMED, UNNAMED);
  }
  else {
    FUN_005cef31(DAT_ffffffcc, (in_ECX + 0xb8), UNNAMED, UNNAMED);
  }
  FUN_00408490(DAT_ffffffec);
  FUN_00419b80();
  return;
}


 export function FUN_004d60a5 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;
  let local_44;
  let local_34;
  let local_24;
  let local_14;

  if ((s32((in_ECX + 0xae0), 0) !== 2)) {
    FUN_006e7d90(DAT_ffffffec, 0x22f, 0x1a1, 0x272, 0x1c5);
    if ((param_2 === 0)) {
      FUN_005cef31(DAT_ffffffdc, (in_ECX + 0xb8), UNNAMED, UNNAMED);
    }
    else if ((param_1 === 0)) {
      FUN_005cef31(DAT_ffffffbc, (in_ECX + 0xb8), UNNAMED, UNNAMED);
    }
    else {
      FUN_005cef31(DAT_ffffffcc, (in_ECX + 0xb8), UNNAMED, UNNAMED);
    }
    FUN_00408490(DAT_ffffffec);
    FUN_00419b80();
  }
  return;
}


 export function FUN_004d61c3 (param_1, param_2)

 {
  let iVar1;
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
  local_c = DAT_0062e2d0;
  if ((s32((DAT_0062e2d0 + 0xae0), 0) === 2)) {
    DAT_0062e2d0 = (DAT_0062e2d0 + 0x1da8);
  }
  else {
    iVar1 = FUN_0046ad85(param_1, param_2, DAT_fffffff0, 0);
    if ((iVar1 !== -1)) {
      if ((local_10 === 0)) {
        FUN_004d5f79(1, 0);
        if ((s32((local_c + 0x8f0), 0) === 0)) {
          if ((s32((local_c + 0x62c), 0) !== 0)) {
            FUN_005d2004(s32((local_c + 0x62c), 0));
            w32((local_c + 0x62c), 0, 0);
          }
          if ((s32((local_c + 0xae0), 0) !== 3)) {
            do {
              iVar1 = FUN_004d4fd1(0);
            } while ((iVar1 !== 0));
            w32((local_c + 0x8f0), 0, 1);
            FUN_004d5f79(1, 1);
          }
        }
        else {
          local_8 = (local_8 + 0x48);
        }
      }
      else if ((s32((local_c + 0x8f0), 0) !== 0)) {
        FUN_004d60a5(1, 0);
        w32((local_c + 0xae0), 0, 2);
        local_8 = (local_8 + 0x48);
      }
    }
  }
  return;
}


 export function FUN_004d6367 ()

 {
  FUN_004d4fd1(1);
  return;
}


 export function FUN_004d6384 ()

 {
  let iVar1;

  iVar1 = DAT_0062e2d0;
  if ((s32((DAT_0062e2d0 + 0x8ec), 0) === 0)) {
    w32((DAT_0062e2d0 + 0x8ec), 0, 1);
  }
  else {
    w32((DAT_0062e2d0 + 0x8ec), 0, 0);
  }
  if ((s32((iVar1 + 0x8ec), 0) === 0)) {
    FUN_004d60a5(1, 1);
  }
  else {
    FUN_004d60a5(0, 1);
  }
  return;
}


 export function FUN_004d63fb ()

 {
  let piVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let local_1c;
  let local_18;
  let local_14;

  iVar2 = DAT_0062e2d0;
  FUN_00407ff0();
  for (/* cond: (local_1c < 0x50) */); local_1c = (local_1c < 0x50); local_1c = (local_1c + 1)) {
    iVar3 = ((s32(((iVar2 + 0x1db8) + local_1c * 0xc), 0) / s32(((iVar2 + 0x1dc0) + local_1c * 0xc), 0) | 0) + 0x140);
    iVar4 = ((s32(((iVar2 + 0x1dbc) + local_1c * 0xc), 0) / s32(((iVar2 + 0x1dc0) + local_1c * 0xc), 0) | 0) + 0xf0);
    piVar1 = ((iVar2 + 0x1db8) + local_1c * 0xc);
    w32(piVar1, 0, (s32(piVar1, 0) + 0xfa));
    piVar1 = ((iVar2 + 0x1dbc) + local_1c * 0xc);
    w32(piVar1, 0, (s32(piVar1, 0) + 0x12c));
    piVar1 = ((iVar2 + 0x1dc0) + local_1c * 0xc);
    w32(piVar1, 0, (s32(piVar1, 0) + -1));
    if ((s32(((iVar2 + 0x1dc0) + local_1c * 0xc), 0) === 0)) {
      uVar5 = FUN_0059a791(-0x7d00, 0x7d00);
      w32(((iVar2 + 0x1db8) + local_1c * 0xc), 0, uVar5);
      uVar5 = FUN_0059a791(-0x5dc0, 0x5dc0);
      w32(((iVar2 + 0x1dbc) + local_1c * 0xc), 0, uVar5);
      uVar5 = FUN_0059a791(0x32, 0x64);
      w32(((iVar2 + 0x1dc0) + local_1c * 0xc), 0, uVar5);
    }
    local_14 = ((s32(((iVar2 + 0x1db8) + local_1c * 0xc), 0) / s32(((iVar2 + 0x1dc0) + local_1c * 0xc), 0) | 0) + 0x140);
    local_18 = ((s32(((iVar2 + 0x1dbc) + local_1c * 0xc), 0) / s32(((iVar2 + 0x1dc0) + local_1c * 0xc), 0) | 0) + 0xf0);
    if ((local_18 < 0)) {
      uVar5 = FUN_0059a791(-0x7d00, 0x7d00);
      w32(((iVar2 + 0x1db8) + local_1c * 0xc), 0, uVar5);
      uVar5 = FUN_0059a791(-0x5dc0, 0x5dc0);
      w32(((iVar2 + 0x1dbc) + local_1c * 0xc), 0, uVar5);
      uVar5 = FUN_0059a791(0x32, 0x64);
      w32(((iVar2 + 0x1dc0) + local_1c * 0xc), 0, uVar5);
      local_14 = ((s32(((iVar2 + 0x1db8) + local_1c * 0xc), 0) / s32(((iVar2 + 0x1dc0) + local_1c * 0xc), 0) | 0) + 0x140);
      local_18 = ((s32(((iVar2 + 0x1dbc) + local_1c * 0xc), 0) / s32(((iVar2 + 0x1dc0) + local_1c * 0xc), 0) | 0) + 0xf0);
    }
    if ((0 < iVar4)) {
      iVar6 = FUN_005c0bf2(iVar3, iVar4);
      if ((iVar6 === 0x29)) {
        FUN_005c0c5d(iVar3, iVar4, 0xa);
      }
    }
    if ((0 < local_18)) {
      iVar3 = FUN_005c0bf2(local_14, local_18);
      if ((iVar3 === 0xa)) {
        FUN_005c0c5d(local_14, local_18, 0x29);
      }
    }
  }
  FUN_00408460();
  return;
}


 export function FUN_004d6744 (param_1)

 {
  let iVar1;
  let iVar2;
  let local_8;

  local_8 = FUN_005c62ee();
  iVar1 = DAT_0062e2d0;
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((param_1 < 0xd3)) {
    if ((s32((DAT_0062e2d0 + 0xae0), 0) === 2)) {
      DAT_0062e2d0 = (DAT_0062e2d0 + 0x1da8);
    }
    else {
      FUN_004d5f79(1, 0);
      if ((s32((iVar1 + 0x8f0), 0) === 0)) {
        if ((s32((iVar1 + 0x62c), 0) !== 0)) {
          FUN_005d2004(s32((iVar1 + 0x62c), 0));
          w32((iVar1 + 0x62c), 0, 0);
        }
        do {
          iVar2 = FUN_004d4fd1(0);
        } while ((iVar2 !== 0));
        w32((iVar1 + 0x8f0), 0, 1);
        FUN_004d5f79(1, 1);
      }
      else {
        local_8 = (local_8 + 0x48);
      }
    }
  }
  return;
}


 export function FUN_004d686b ()

 {
  if ((s32((DAT_0062e2d0 + 0x1da8), 0) !== 0)) {
    DAT_0062e2d0 = (DAT_0062e2d0 + 0x1da8);
  }
  return;
}


 export function FUN_004d68a7 (param_1, param_2)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = DAT_0062e2d0;
  if ((iVar1 !== -1)) {
    if ((local_c === 0)) {
      w32((local_8 + 0x1dac), 0, 1);
      FUN_004d5f79(1, 0);
      if ((s32((local_8 + 0x630), 0) !== 0)) {
        FUN_005d2004(s32((local_8 + 0x630), 0));
        w32((local_8 + 0x630), 0, 0);
      }
      FUN_00408460();
    }
    else if ((s32((local_8 + 0x8f0), 0) !== 0)) {
      w32((local_8 + 0x1db0), 0, 1);
      FUN_004d60a5(1, 0);
      if ((s32((local_8 + 0x630), 0) !== 0)) {
        FUN_005d2004(s32((local_8 + 0x630), 0));
        w32((local_8 + 0x630), 0, 0);
      }
      FUN_00408460();
    }
  }
  return;
}


 export function FUN_004d6a30 (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let local_10;
  let local_c;
  let local_8;

  local_c = DAT_0062e2d0;
  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((s32((local_c + 0xae0), 0) === 2)) {
    local_c = (local_c + 0x1da8);
  }
  else if ((s32((local_c + 0x1dac), 0) !== 0)) {
    if ((s32((local_c + 0x1dac), 0) !== 0)) {
      FUN_004d5f79(1, 1);
    }
    if ((s32((local_c + 0x1db0), 0) !== 0)) {
      FUN_004d60a5(1, 1);
    }
    iVar1 = FUN_0046ad85(param_1, param_2, DAT_fffffff0, 0);
    if ((iVar1 !== -1)) {
      if ((local_10 === 0)) {
        if ((s32((local_c + 0x1dac), 0) !== 0)) {
          if ((s32((local_c + 0x8f0), 0) === 0)) {
            if ((s32((local_c + 0x62c), 0) !== 0)) {
              FUN_005d2004(s32((local_c + 0x62c), 0));
              w32((local_c + 0x62c), 0, 0);
            }
            if ((s32((local_c + 0xae0), 0) !== 3)) {
              do {
                iVar1 = FUN_004d4fd1(0);
              } while ((iVar1 !== 0));
              w32((local_c + 0x8f0), 0, 1);
            }
          }
          else {
            local_8 = (local_8 + 0x48);
          }
        }
      }
      else if ((s32((local_c + 0x1db0), 0) !== 0)) {
        w32((local_c + 0xae0), 0, 2);
        local_8 = (local_8 + 0x48);
      }
    }
    if ((s32((local_c + 0x630), 0) === 0)) {
      uVar2 = FUN_005d1f50(LAB_00403a53, 0x1f4, -1);
      w32((local_c + 0x630), 0, uVar2);
    }
    if ((s32((local_c + 0x630), 0) === 0)) {
      uVar2 = FUN_005d1f50(LAB_00403a53, 0x1f4, -1);
      w32((local_c + 0x630), 0, uVar2);
    }
  }
  return;
}


 export function FUN_004d6cbc (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let local_c;
  let local_8;

  local_8 = DAT_0062e2d0;
  iVar1 = FUN_0046ad85(param_1, param_2, DAT_fffffff4, 0);
  if ((iVar1 === -1)) {
    if ((s32((local_8 + 0x630), 0) === 0)) {
      uVar2 = FUN_005d1f50(LAB_00403a53, 0x1f4, -1);
      w32((local_8 + 0x630), 0, uVar2);
    }
    if ((s32((local_8 + 0x630), 0) === 0)) {
      uVar2 = FUN_005d1f50(LAB_00403a53, 0x1f4, -1);
      w32((local_8 + 0x630), 0, uVar2);
    }
  }
  else if ((local_c === 0)) {
    if ((s32((local_8 + 0x1db0), 0) === 0)) {
      if ((s32((local_8 + 0x630), 0) !== 0)) {
        FUN_005d2004(s32((local_8 + 0x630), 0));
        w32((local_8 + 0x630), 0, 0);
      }
    }
    else {
      FUN_004d60a5(1, 1);
      if ((s32((local_8 + 0x630), 0) === 0)) {
        uVar2 = FUN_005d1f50(LAB_00403a53, 0x1f4, -1);
        w32((local_8 + 0x630), 0, uVar2);
      }
    }
  }
  else if ((local_c === 1)) {
    if ((s32((local_8 + 0x1dac), 0) === 0)) {
      if ((s32((local_8 + 0x630), 0) !== 0)) {
        FUN_005d2004(s32((local_8 + 0x630), 0));
        w32((local_8 + 0x630), 0, 0);
      }
    }
    else {
      FUN_004d5f79(1, 1);
      if ((s32((local_8 + 0x630), 0) === 0)) {
        uVar2 = FUN_005d1f50(LAB_00403a53, 0x1f4, -1);
        w32((local_8 + 0x630), 0, uVar2);
      }
    }
  }
  return;
}


 export function FUN_004d6f58 ()

 {
  return;
}


 export function FUN_004d8af0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32(in_ECX, 0);
}


 export function FUN_004d8b20 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005dd1a0();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_004d8b70 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_0046ace7(param_1, 0, param_2, param_3, param_4, param_5);
  return;
}


 export function FUN_004d8bc0 ()

 {
  let _Source;
  let _Count;
  let local_8;

  for (/* cond: (local_8 < 0x43) */); local_8 = (local_8 < 0x43); local_8 = (local_8 + 1)) {
    _Count = 0x28;
    _Source = FUN_00428b0c(s32((DAT_0064c488 + local_8 * 8), 0));
    _strncpy((DAT_006a1d88 + local_8 * 0x28), _Source, _Count);
    DAT_006a1daf[local_8 * 0x28] = 0;
    w32((DAT_006a2d28 + local_8 * 0x58), 0, u8(DAT_0064c48c[local_8 * 8]));
    w32((DAT_006a2d2c + local_8 * 0x58), 0, u8(DAT_0064c48d[local_8 * 8]));
    w32((DAT_006a2d30 + local_8 * 0x58), 0, s8(DAT_0064c48e[local_8 * 8]));
    if ((0x27 < local_8)) {
      w32((DAT_006a2d34 + local_8 * 0x58), 0, s8(DAT_0064ba01[local_8]));
    }
  }
  return;
}


 export function FUN_004d8caa ()

 {
  let _Dest;
  let _Source;
  let _Count;
  let local_8;

  for (/* cond: (local_8 < 0x43) */); local_8 = (local_8 < 0x43); local_8 = (local_8 + 1)) {
    _Count = 0x19;
    _Source = (DAT_006a1d88 + local_8 * 0x28);
    _Dest = FUN_00428b0c(s32((DAT_0064c488 + local_8 * 8), 0));
    _strncpy(_Dest, _Source, _Count);
    DAT_0064c48c[local_8 * 8] = DAT_006a2d28[local_8 * 0x58];
    DAT_0064c48d[local_8 * 8] = DAT_006a2d2c[local_8 * 0x58];
    DAT_0064c48e[local_8 * 8] = DAT_006a2d30[local_8 * 0x58];
    if ((0x27 < local_8)) {
      DAT_0064ba01[local_8] = DAT_006a2d34[local_8 * 0x58];
    }
  }
  return;
}


 export function FUN_004d8d80 ()

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_8;

  for (/* cond: (local_14 < 5) */); local_14 = (local_14 < 5); local_14 = (local_14 + 1)) {
    if ((s32((DAT_0062e3c0 + local_14 * 8), 0) === 9)) {
      iVar1 = FUN_00418740();
      _sprintf(DAT_fffffff0, DAT_0062e3f8, s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0));
      FUN_00418a30(DAT_fffffff0);
    }
    else if ((s32((DAT_0062e3c0 + local_14 * 8), 0) === 0xc)) {
      iVar1 = FUN_00418740();
      local_8 = (s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0) + 2);
      FUN_00418d90(local_8);
    }
  }
  return;
}


 export function FUN_004d8ed6 ()

 {
  let iVar1;
  let uVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  local_14 = 0;
  for (/* cond: (local_18 < 5) */); local_18 = (local_18 < 5); local_18 = (local_18 + 1)) {
    if ((s32((DAT_0062e3c0 + local_18 * 8), 0) === 9)) {
      FUN_00418a70(DAT_fffffff0);
      iVar1 = FUN_00418740();
      iVar1 = (iVar1 + -0xca);
      local_8 = _atoi(DAT_fffffff0);
      uVar2 = FUN_005adfa0(local_8, s32((DAT_0062e3e8 + iVar1 * 4), 0), s32((DAT_0062e3f0 + iVar1 * 4), 0));
      w32((DAT_006a2d28 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0, uVar2);
      if ((s32((DAT_006a2d28 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0) !== local_8)) {
        local_14 = (local_14 + 1);
      }
    }
    else if ((s32((DAT_0062e3c0 + local_18 * 8), 0) === 0xc)) {
      local_8 = FUN_00418d60();
      local_8 = (local_8 + -2);
      iVar1 = FUN_00418740();
      w32((DAT_006a2a00 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0, local_8);
    }
  }
  return local_14;
}


 export function FUN_004d9095 ()

 {
  FUN_004d9b93();
  return;
}


 export function FUN_004d90b0 (param_1)

 {
  let pcVar1;
  let sVar2;
  let local_c;
  let local_8;

  for (/* cond: (local_8 < 0x43) */); local_8 = (local_8 < 0x43); local_8 = (local_8 + 1)) {
    FUN_0040bbb0();
    FUN_0040ff00(s32((DAT_0064c488 + local_8 * 8), 0));
    FUN_005f22e0(DAT_00679640, DAT_0062e3fc);
    pcVar1 = FUN_00428b0c(s32((DAT_0064c488 + local_8 * 8), 0));
    sVar2 = _strlen(pcVar1);
    if ((sVar2 < 0x19)) {
      pcVar1 = FUN_00428b0c(s32((DAT_0064c488 + local_8 * 8), 0));
      local_c = _strlen(pcVar1);
    }
    else {
      local_c = 0x19;
    }
    FUN_004190a0((0x19 - local_c));
    FUN_004ccdb6(DAT_0064c48c[local_8 * 8]);
    FUN_005f22e0(DAT_00679640, DAT_0062e400);
    FUN_004ccdb6(DAT_0064c48d[local_8 * 8]);
    FUN_005f22e0(DAT_00679640, s_,_0062e404);
    FUN_004ccdef(s8(DAT_0064c48e[local_8 * 8]), 1);
    FUN_005f22e0(DAT_00679640, DAT_0062e40c);
    _fputs(DAT_00679640, param_1);
  }
  return 1;
}


 export function FUN_004d91f8 (param_1)

 {
  let local_8;

  for (/* cond: (local_8 < 0x43) */); local_8 = (local_8 < 0x43); local_8 = (local_8 + 1)) {
    FUN_0040bbb0();
    FUN_004ccdef(s8(DAT_0064ba01[local_8]), 1);
    FUN_004190a0(8);
    FUN_005f22e0(DAT_00679640, DAT_0062e410);
    FUN_0040ff00(s32((DAT_0064c488 + local_8 * 8), 0));
    FUN_005f22e0(DAT_00679640, DAT_0062e414);
    _fputs(DAT_00679640, param_1);
  }
  return 1;
}


 export function FUN_004d929a ()

 {
  let iVar1;
  let hWnd;
  let lpText;
  let lpCaption;
  let uType;
  let local_28;
  let local_24;

  iVar1 = FUN_004d8ed6();
  if ((iVar1 === 0)) {
    FUN_004d8caa();
    FUN_004ccab9(s_IMPROVE_0062e420, LAB_004016f9);
    FUN_004ccaed(s_ENDWONDER_0062e428, LAB_00402ef5);
    iVar1 = FUN_004ccf2d();
    if ((iVar1 === 0)) {
      _sprintf(DAT_ffffffdc, s_Error_updating_RULES.%s_0062e434, DAT_0062cd24);
      uType = 0x10;
      lpCaption = s_File_I/O_Error_0062e44c;
      lpText = DAT_ffffffdc;
      iVar1 = FUN_00414d10();
      FUN_006e7dd4(s32((iVar1 + 4), 0), lpText, lpCaption, uType);
    }
    DAT_006a1d7c = 0;
    DAT_006a4f88 = (DAT_006a4f88 + 0x48);
    FUN_004e4ceb();
  }
  else {
    FUN_004d8d80();
    FUN_004d9095();
    if ((DAT_006a4f88 === 0)) {
      local_28 = 0;
    }
    else {
      local_28 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_28);
    FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_0062e418);
    FUN_0059d3c9(0);
    hWnd = FUN_00418770();
    FUN_006e7d94(hWnd);
  }
  return;
}


 export function FUN_004d93b9 ()

 {
  let iVar1;
  let sVar2;
  let local_12c;
  let local_128;
  let local_124;
  let local_110;
  let local_10c;
  let local_c;
  let local_8;

  iVar1 = s32((DAT_006a4f88 + 0x2ec), 0);
  _strncpy(DAT_fffffedc, (DAT_006a1d88 + iVar1 * 0x28), 0x19);
  local_10c = 0;
  do {
    if ((DAT_006a4f88 === 0)) {
      local_12c = 0;
    }
    else {
      local_12c = (DAT_006a4f88 + 0x48);
    }
    FUN_005a6c23(local_12c);
    local_8 = FUN_0051d63b(s_DEBUG_006359dc, s_IMPRNAME_0062e45c, 0x18, DAT_fffffedc, DAT_fffffef0);
    FUN_005a6c45();
    if ((local_8 === -1));
  } while ((sVar2 === 0));
  if ((-1 < local_8)) {
    FUN_005f22d0((DAT_006a1d88 + iVar1 * 0x28), DAT_fffffef0);
    local_c = FUN_00418d60();
    FUN_00418d20();
    for (/* cond: (local_128 < 0x43) */); local_128 = (local_128 < 0x43); local_128 = (local_128 + 1)) {
      FUN_00418ce0((DAT_006a1d88 + local_128 * 0x28));
    }
    FUN_00418d90(local_c);
    FUN_004d9095();
  }
  return;
}


 export function FUN_004d953f ()

 {
  let local_8;

  if ((DAT_006a4f88 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(DAT_0062e478, s_IMPROVEMENTS_0062e468);
  FUN_0059d3c9(0);
  return;
}


 export function FUN_004d959e ()

 {
  DAT_006a1d7c = 0;
  DAT_006a4f88 = (DAT_006a4f88 + 0x48);
  return;
}


 export function FUN_004d95c6 ()

 {
  let uVar1;

  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), 4, LAB_00402e19);
  FUN_00573e59((DAT_00645160 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x3c), uVar1);
  FUN_004d9095();
  return;
}


 export function FUN_004d9619 ()

 {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10;
  let local_8;

  if ((DAT_006a4f88 === 0)) {
    local_14 = 0;
  }
  else {
    local_14 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_14);
  iVar1 = FUN_00419100(s_DEBUG_006359dc, s_IMPRMISC_0062e480, 1);
  if ((iVar1 !== -1)) {
    if ((iVar1 === 0)) {
      local_10 = DAT_00640b98;
      local_8 = 5;
    }
    else {
      local_10 = (DAT_00647168 + (iVar1 * 4 + -4) * 0xf);
      local_8 = 6;
    }
    if ((local_10 !== 0)) {
      uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), local_8, LAB_00402e19);
      FUN_00573e59(local_10, uVar2);
    }
  }
  FUN_0059d3c9(0);
  return;
}


 export function FUN_004d9718 (param_1)

 {
  let iVar1;
  let hWnd;
  let uVar2;
  let local_8;

  if ((param_1 === 0xc9)) {
    iVar1 = FUN_004d8ed6();
    if ((iVar1 === 0)) {
      uVar2 = FUN_00418d60();
      w32((DAT_006a4f88 + 0x2ec), 0, uVar2);
      if ((s32((DAT_006a4f88 + 0x2ec), 0) === 0)) {
        FUN_00453c40();
      }
      else {
        FUN_00453c80();
      }
      if ((s32((DAT_006a4f88 + 0x2ec), 0) < 0x27)) {
        FUN_0043c5f0();
      }
      else {
        FUN_0040f380();
      }
      FUN_004d8d80();
      FUN_004d9095();
    }
    else {
      FUN_00418d90(s32((DAT_006a4f88 + 0x2ec), 0));
      FUN_004d8d80();
      FUN_004d9095();
      if ((DAT_006a4f88 === 0)) {
        local_8 = 0;
      }
      else {
        local_8 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_8);
      FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_0062e48c);
      FUN_0059d3c9(0);
      hWnd = FUN_00418770();
      FUN_006e7d94(hWnd);
    }
  }
  return;
}


 export function FUN_004d986e (in_ECX, param_1)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_2c;
  let local_24;
  let local_20;
  let local_14;

  FUN_004086c0(DAT_ffffffec, ((s32((DAT_0062e398 + param_1 * 8), 0) + s32((in_ECX + 0x124), 0)) + -50), (s32((DAT_0062e39c + param_1 * 8), 0) + s32((in_ECX + 0x128), 0)), 0xc8, (s32((in_ECX + 0x2e8), 0) << 3));
  iVar1 = DAT_006a1d80;
  DAT_006a1d80 = (DAT_006a1d80 + 1);
  if ((in_ECX === 0)) {
    local_2c = 0;
  }
  else {
    local_2c = (in_ECX + 0x48);
  }
  FUN_00418bf0(local_2c, iVar1, DAT_ffffffec);
  FUN_00418c70(DAT_006a4f90);
  FUN_00418dd0(thunk_FUN_004d9718);
  if ((param_1 === 0)) {
    for (/* cond: (local_24 < 0x43) */); local_24 = (local_24 < 0x43); local_24 = (local_24 + 1)) {
      uVar2 = FUN_00428b0c(s32((DAT_0064c488 + local_24 * 8), 0));
      FUN_00418ce0(uVar2);
    }
  }
  else if ((param_1 < 3)) {
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7c4), 0));
    FUN_00418ce0(uVar2);
    for (/* cond: (local_20 < 0x64) */); local_20 = (local_20 < 0x64); local_20 = (local_20 + 1)) {
      uVar2 = FUN_00428b0c(s32((DAT_00627684 + local_20 * 0x10), 0));
      FUN_00418ce0(uVar2);
    }
  }
  return;
}


 export function FUN_004d9a9f (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_24;
  let local_14;

  FUN_004086c0(DAT_ffffffec, (s32(DAT_0062e3b0, param_1 * 2) + s32((in_ECX + 0x124), 0)), (s32(DAT_0062e3b4, param_1 * 2) + s32((in_ECX + 0x128), 0)), 0x30, (s32((in_ECX + 0x2e8), 0) + 6));
  iVar1 = DAT_006a1d80;
  DAT_006a1d80 = (DAT_006a1d80 + 1);
  if ((in_ECX === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = (in_ECX + 0x48);
  }
  FUN_00418910(local_24, iVar1, DAT_ffffffec, DAT_0062e494);
  FUN_004189c0(3);
  FUN_00418a00(LAB_00401019);
  return;
}


 export function FUN_004d9b93 (in_ECX)

 {
  let uVar1;
  let iVar2;
  let pcVar3;
  let sVar4;
  // in_ECX promoted to parameter;
  let local_2c;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_00552112();
  if ((DAT_006a1d7c === 0)) {
    FUN_0040fdb0(in_ECX, (in_ECX + 0x2bc), 0x1d);
  }
  else {
    FUN_005a9afe(DAT_0062e018, in_ECX, 0, 0, s32((in_ECX + 0x124), 0), s32((in_ECX + 0x128), 0), s32((in_ECX + 0x2d8), 0), s32((in_ECX + 0x2dc), 0));
  }
  local_8 = (s32((in_ECX + 0x124), 0) + 0x20);
  local_c = (s32((in_ECX + 0x128), 0) + 0x20);
  if ((s32((in_ECX + 0x2ec), 0) < 0x27)) {
    local_1c = (DAT_00645160 + s32((in_ECX + 0x2ec), 0) * 0x3c);
  }
  else {
    local_1c = (DAT_00645a84 + (s32((in_ECX + 0x2ec), 0) * 4 + -0x9c) * 0xf);
  }
  if ((s32((in_ECX + 0x2ec), 0) === 0)) {
    FUN_005a9abf(in_ECX, local_8, local_c, 0x48, 0x28, 0xa);
  }
  else {
    uVar1 = FUN_00417f70();
    FUN_005a9abf(in_ECX, local_8, local_c, 0x48, 0x28, uVar1);
    FUN_005cd775(2, 1);
    FUN_005cef31(DAT_ffffffd4, in_ECX, local_8, local_c);
    FUN_005cd775(1, 1);
  }
  FUN_004ccb6a(in_ECX, local_8, local_c, 0x48, 0x28, 6);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0xa, 0xa, 0, 0);
  FUN_005a9abf(in_ECX, (s32((in_ECX + 0x124), 0) + 0x32), (s32((in_ECX + 0x128), 0) + 0xe8), 0x1cc, 0x6e, 0x29);
  FUN_005a9964(in_ECX, (s32((in_ECX + 0x124), 0) + 0x32), (s32((in_ECX + 0x128), 0) + 0xe8), 0x1cc, 0x6e, 0xa);
  local_10 = (s32((in_ECX + 0x124), 0) + 0x40);
  local_18 = (s32((in_ECX + 0x128), 0) + 0xee);
  FUN_0040bbb0();
  FUN_0040bbe0(s_PEDIAIMPROVE_0062e498);
  FUN_0040ff30(s32((in_ECX + 0x2ec), 0));
  iVar2 = FUN_004a2379(s_PEDIA_0062e4a8, DAT_00679640);
  if ((iVar2 === 0)) {
    do {
      local_14 = FUN_004a23fc(1);
      if ((_MEM[local_14] === 0x5e)) {
        local_14 = (local_14 + 1);
      }
      pcVar3 = _strstr(local_14, DAT_0062e4b0);
      if ((pcVar3 !== 0)) {
        pcVar3 = _strstr(local_14, DAT_0062e4b4);
        pcVar3[1] = 0x20;
      }
      FUN_005baf57(in_ECX, local_14, local_10, local_18);
      local_18 = (local_18 + s32((in_ECX + 0x2e8), 0));
      sVar4 = _strlen(local_14);
    } while ((1 < sVar4));
  }
  FUN_005baee0(0x29, 0x12, 1, 1);
  local_10 = (s32((in_ECX + 0x124), 0) + (s32((in_ECX + 0x2d8), 0) / 2 | 0));
  local_18 = ((s32((in_ECX + 0x128), 0) - s32((in_ECX + 0x2e8), 0)) + 0xe6);
  FUN_0040bbb0();
  FUN_0040bc10(0x1ea);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_18, 0);
  local_10 = (s32((in_ECX + 0x124), 0) + (s32((in_ECX + 0x2d8), 0) / 2 | 0));
  local_18 = (((DAT_0062e3a4 + s32((in_ECX + 0x128), 0)) + s32((in_ECX + 0x2e8), 0) * -2) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e9);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_18, 0);
  local_10 = ((DAT_0062e3a0 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_18 = (((DAT_0062e3a4 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x7e);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_18, 0);
  local_10 = ((DAT_0062e3a8 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_18 = (((DAT_0062e3ac + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1de);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_18, 0);
  local_10 = ((DAT_0062e3b0 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_18 = (((DAT_0062e3b4 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e1);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_18, 0);
  local_10 = ((DAT_0062e3b8 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_18 = (((DAT_0062e3bc + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x9e);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_18, 0);
  FUN_00408460();
  return;
}


 export function FUN_004da107 (in_ECX)

 {
  let iVar1;
  let pvVar2;
  let uVar3;
  let uVar4;
  let extraout_EAX;
  let iVar5;
  let extraout_EAX_00;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let uVar11;
  let uVar12;
  let local_488;
  let local_484;
  let local_480;
  let local_47c;
  let local_478;
  let local_474;
  let local_468;
  let local_460;
  let local_454;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004da9ca;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  DAT_006a1d7c = 1;
  DAT_006a4f88 = in_ECX;
  pvVar2 = operator_new(0x48);
  local_8 = 1;
  if ((pvVar2 === 0)) {
    local_468 = 0;
  }
  else {
    local_468 = FUN_005bd630();
  }
  local_8 = (UNNAMED << 8);
  DAT_0062e018 = local_468;
  FUN_00417ef0(0, DAT_0062e01c);
  FUN_005d268e(DAT_006a4f90);
  FUN_005d25a8(DAT_006a4f90);
  FUN_005d2550(0x29);
  FUN_005d2568(0x12, 1, 1);
  FUN_005d2590(0x25);
  w32((in_ECX + 0x2d8), 0, 0x230);
  w32((in_ECX + 0x2dc), 0, 0x17c);
  w32((in_ECX + 0x2ec), 0, 1);
  DAT_006a1d80 = 0xc9;
  FUN_005bf071(s_EDITORAS.GIF_0062e4b8, 0xa, 0xc0, DAT_fffffbbc);
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
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x730), 0), 0xd, 0, 0, uVar9, uVar3, 0, 0, 0);
  FUN_005534bc(uVar4, uVar6, uVar7, uVar8, uVar9, uVar3, uVar10, uVar11, uVar12);
  for (/* cond: (local_460 < 5) */); local_460 = (local_460 < 5); local_460 = (local_460 + 1)) {
    if ((s32((DAT_0062e3c0 + local_460 * 8), 0) === 9)) {
      FUN_004d9a9f(s32((DAT_0062e3c4 + local_460 * 8), 0));
    }
    else if ((s32((DAT_0062e3c0 + local_460 * 8), 0) === 0xc)) {
      FUN_004d986e(s32((DAT_0062e3c4 + local_460 * 8), 0));
    }
  }
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  w32((in_ECX + 0x2e4), 0, (extraout_EAX + 8));
  w32((in_ECX + 0x2e0), 0, (((s32((in_ECX + 0x12c), 0) + -10) + (((s32((in_ECX + 0x12c), 0) + -10) >> 0x1f) & 3)) >> 2));
  iVar5 = ((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2e4), 0) + 2));
  iVar1 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 2), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_474 = 0;
  }
  else {
    local_474 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_474, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_0040187f);
  iVar1 = ((iVar1 + 2) + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_478 = 0;
  }
  else {
    local_478 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xa8), 0));
  FUN_0040f680(local_478, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_0040178a);
  iVar1 = (iVar1 + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_47c = 0;
  }
  else {
    local_47c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8ec), 0));
  FUN_0040f680(local_47c, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00402c75);
  FUN_004086c0(DAT_fffffbac, (iVar1 + (s32((in_ECX + 0x2e0), 0) + 2)), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_480 = 0;
  }
  else {
    local_480 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(local_480, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00402072);
  FUN_0040f840();
  w32((in_ECX + 0x2e0), 0, 0x55);
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  w32((in_ECX + 0x2e4), 0, (extraout_EAX_00 + 8));
  iVar1 = s32((in_ECX + 0x124), 0);
  iVar5 = s32((in_ECX + 0x128), 0);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 0x19), (iVar5 + 0x50), s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_484 = 0;
  }
  else {
    local_484 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7cc), 0));
  FUN_0040f680(local_484, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00402388);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 0x19), ((iVar5 + 0x50) + (s32((in_ECX + 0x2e4), 0) + 2)), s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_488 = 0;
  }
  else {
    local_488 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8f0), 0));
  FUN_0040f680(local_488, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00401cad);
  FUN_0040f350(0);
  FUN_004d8bc0();
  FUN_00418d90(s32((in_ECX + 0x2ec), 0));
  FUN_004d8d80();
  w32((in_ECX + 0x2f8), 0, 3);
  FUN_00408330(LAB_004019d8);
  in_ECX = EnableStackedTabs(in_ECX, 0x401302);
  FUN_004d9718(0xc9);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006a1d7c !== 0)) {
    FUN_0040ef50();
  }
  if ((DAT_0062e018 !== 0)) {
    FUN_0040f010(1);
  }
  DAT_0062e018 = 0;
  w32((in_ECX + 0x2f8), 0, 0);
  local_8 = -1;
  FUN_004da9be();
  FUN_004da9d4();
  return;
}


 export function FUN_004da9be ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_004da9d4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004da9e2 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004daa47;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00417fa0();
  local_8 = 0;
  FUN_004da107();
  FUN_005bb574();
  local_8 = -1;
  FUN_004daa3b();
  FUN_004daa51();
  return;
}


 export function FUN_004daa3b ()

 {
  FUN_004183d0();
  return;
}


 export function FUN_004daa51 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004db210 ()

 {
  FUN_004db225();
  return;
}


 export function FUN_004db225 ()

 {
  FUN_00428cb0();
  return;
}


 export function FUN_004db23f (param_1, param_2)

 {
  let _File;
  let lVar1;
  let pcVar2;
  let sVar3;
  let plVar4;
  let local_108;
  let local_107;
  let local_8;

  FUN_004980ec(DAT_006a5b38);
  FUN_00497ea0(DAT_006a5b38, 1, param_2);
  DAT_0062e60c = 0;
  DAT_0062e610 = 0;
  __getcwd(DAT_0062e508, 0x104);
  FUN_005f22e0(DAT_0062e508, DAT_0062e614);
  FUN_005f22e0(DAT_0062e508, param_1);
  FUN_00472950(DAT_0062e508, DAT_0062cd24);
  _File = FUN_0041508c(DAT_0062e508, DAT_0062e618);
  if ((_File === 0)) {
    DAT_0062e508 = 0;
  }
  else {
    while (((s32(DAT_0000000c, 0) & 0x10) === 0)) {
      lVar1 = _ftell(_File);
      pcVar2 = _fgets(DAT_fffffef8, 0xff, _File);
      if ((pcVar2 === 0));
      FUN_004d007e(DAT_fffffef8);
      if ((local_107 < 0x5b)) {
        sVar3 = _strlen(DAT_fffffef8);
        local_8 = (sVar3 + 5);
        if ((((DAT_006a5b48) & 0xFFFF) < local_8));
        w32(plVar4, 0, lVar1);
        FUN_005f22d0((plVar4 + 1), DAT_fffffef8);
        DAT_0062e610 = (DAT_0062e610 + 1);
      }
    }
    DAT_0062e60c = 1;
    _fclose(_File);
  }
  return;
}


 export function FUN_004db450 ()

 {
  DAT_0062e60c = 0;
  DAT_0062e610 = 0;
  FUN_004980ec(DAT_006a5b38);
  return;
}


 export function FUN_004db481 (param_1, param_2)

 {
  let pcVar1;
  let iVar2;
  let local_114;
  let local_10c;
  let local_108;

  if ((DAT_0062e60c !== 0)) {
    __getcwd(DAT_fffffef8, 0x104);
    FUN_005f22e0(DAT_fffffef8, DAT_0062e61c);
    FUN_005f22e0(DAT_fffffef8, param_1);
    iVar2 = __strcmpi(DAT_fffffef8, DAT_0062e508);
    if ((iVar2 === 0)) {
      local_10c = DAT_006a5b40;
      for (/* cond: (local_114 < DAT_0062e610) */); local_114 = (local_114 < DAT_0062e610); local_114 = (local_114 + 1)) {
        iVar2 = __strcmpi((local_10c + 4), param_2);
        pcVar1 = (local_10c + 4);
        if ((iVar2 === 0)) {
          return s32(local_10c, 0);
        }
        while ((_MEM[local_10c] !== 0)) {
          pcVar1 = (local_10c + 1);
        }
        local_10c = (local_10c + 1);
      }
    }
  }
  return -1;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004db690 (in_ECX, param_1)

 {
  let uVar1;
  let puVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_1c;
  let local_10;
  let local_c;
  let local_8;

  uVar1 = s32((DAT_0062e658 + param_1 * 4), 0);
  _DAT_0068abd0 = 0;
  _DAT_0068abd4 = 0;
  local_c = s32((DAT_0062e698 + s32((in_ECX + 0x204), 0) * 4), 0);
  /* switch */ (s32((in_ECX + 0x204), 0) ( *) ((in_ECX + 0x204)  )) {
  case 8 :
  case 0xc :
    for (/* cond: (local_1c < DAT_0067ab94) */); local_1c = (local_1c < DAT_0067ab94); local_1c = (local_1c + 1)) {
      if ((s32((DAT_00684bac + local_1c * 4), 0) === 1)) {
        _DAT_0068abd4 = (None + 1);
      }
    }
    local_c = (s32((in_ECX + 0x1042c), 0) * 4 + local_c);
    break;
  case 10 :
  case 0x11 :
    for (/* cond: (local_1c < DAT_0067ab94) */); local_1c = (local_1c < DAT_0067ab94); local_1c = (local_1c + 1)) {
      if ((s32((DAT_00684bac + local_1c * 4), 0) === 1)) {
        _DAT_0068abd4 = (None + 1);
      }
    }
    local_c = (s32((in_ECX + 0x1042c), 0) * 4 + local_c);
    if ((s32((in_ECX + 0x204), 0) === 0x11)) {
      local_c = (s32((in_ECX + 0x1042c), 0) * 4 + local_c);
    }
  }
  local_10 = (local_c + 0x20);
  if ((param_1 === 0xe)) {
    local_8 = s32((DAT_0062e698 + s32((in_ECX + 0x200), 0) * 4), 0);
    /* switch */ (s32((in_ECX + 0x200), 0) ( *) ((in_ECX + 0x200)  )) {
    case 8 :
    case 0xc :
      for (/* cond: (local_1c < DAT_0067ab90) */); local_1c = (local_1c < DAT_0067ab90); local_1c = (local_1c + 1)) {
        if ((s32((DAT_00682ba8 + local_1c * 4), 0) === 1)) {
          _DAT_0068abd0 = (None + 1);
        }
      }
      local_8 = (s32((in_ECX + 0x10428), 0) * 4 + local_8);
      break;
    case 10 :
    case 0x11 :
      for (/* cond: (local_1c < DAT_0067ab90) */); local_1c = (local_1c < DAT_0067ab90); local_1c = (local_1c + 1)) {
        if ((s32((DAT_00682ba8 + local_1c * 4), 0) === 1)) {
          _DAT_0068abd0 = (None + 1);
        }
      }
      local_8 = (s32((in_ECX + 0x10428), 0) * 4 + local_8);
      if ((s32((in_ECX + 0x200), 0) === 0x11)) {
        local_8 = (s32((in_ECX + 0x10428), 0) * 4 + local_8);
      }
    }
    local_10 = (local_10 + local_8);
  }
  puVar2 = operator_new(local_10);
  if ((puVar2 === 0)) {
    FUN_005d225b(s_Failed_to_allocate_buffer_for_pa_0062e6ec);
    puVar2 = 0;
  }
  else {
    w32(puVar2, 0, 0x66606660);
    w32(puVar2, 1, 0x82);
    w32(puVar2, 2, local_10);
    w32(puVar2, 4, s32((in_ECX + 0x1ec), 0));
    w32(puVar2, 5, DAT_006d1da0);
    w32(puVar2, 6, s32((in_ECX + 0x118), 0));
    w32(puVar2, 7, uVar1);
    if (((local_10 + puVar2) < (local_c + (puVar2 + 8)))) {
      FUN_005dae6b(7, s_(CharPtr)pChunk_+_sizeChunk0_<=_(_0062e764, s_D:\Ss\Franklinton\parleywin_tran_0062e738, 0x9f);
    }
    FUN_004dbab4((puVar2 + 8), s32((in_ECX + 0x204), 0), local_c, 1);
    if ((param_1 === 0xe)) {
      iVar3 = (puVar2 + (local_c + 0x20));
      if (((local_8 + iVar3) !== (local_10 + puVar2))) {
        FUN_005dae6b(7, s_(CharPtr)pChunk_+_sizeChunk1_==_(_0062e7cc, s_D:\Ss\Franklinton\parleywin_tran_0062e7a0, 0xa4);
      }
      FUN_004dbab4(iVar3, s32((in_ECX + 0x200), 0), local_8, 0);
    }
    FUN_0046b14d(0x82, s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_0067a8c0 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, puVar2);
  }
  return puVar2;
}


 export function FUN_004dbab4 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;

  /* switch */ () {
  case 5 :
  case 6 :
    w32(param_1, 0, param_2);
    w32(param_1, 1, param_3);
    w32(param_1, 2, s32((in_ECX + 0x218), 0));
    break;
  case 8 :
    w32(param_1, 0, param_2);
    w32(param_1, 1, param_3);
    w32(param_1, 2, s32(((in_ECX + 0x10428) + param_4 * 4), 0));
    local_34 = (param_1 + 3);
    local_30 = 0;
    for (/* cond: (local_2c < s32(DAT_0067ab90, param_4)) */); local_2c = (local_2c < s32(DAT_0067ab90, param_4)); local_2c = (local_2c + 1)) {
      if ((s32((DAT_00682ba8 + (local_2c * 4 + param_4 * 0x2004)), 0) === 1)) {
        w32(local_34, 0, s32((((param_4 * 0x2004 + local_2c * 4) + 0x3f0) + in_ECX), 0));
        local_34 = (local_34 + 1);
        local_30 = (local_30 + 1);
        if ((s32(((in_ECX + 0x10428) + param_4 * 4), 0) === local_30)) {
          return;
        }
      }
    }
    break;
  case 9 :
    w32(param_1, 0, param_2);
    w32(param_1, 1, param_3);
    FUN_00418a70(DAT_ffffffdc);
    iVar1 = _atoi(DAT_ffffffdc);
    w32(param_1, 2, iVar1);
    break;
  case 10 :
    w32(param_1, 0, param_2);
    w32(param_1, 1, param_3);
    w32(param_1, 2, s32(((in_ECX + 0x10428) + param_4 * 4), 0));
    local_28 = (param_1 + 3);
    local_30 = 0;
    for (/* cond: (local_2c < s32(DAT_0067ab90, param_4)) */); local_2c = (local_2c < s32(DAT_0067ab90, param_4)); local_2c = (local_2c + 1)) {
      if ((s32((DAT_00682ba8 + (local_2c * 4 + param_4 * 0x2004)), 0) === 1)) {
        w32(local_28, 0, s32((((param_4 * 0x2004 + local_2c * 4) + 0x43f8) + in_ECX), 0));
        local_28 = (local_28 + 1);
        local_30 = (local_30 + 1);
        if ((s32(((in_ECX + 0x10428) + param_4 * 4), 0) === local_30)) {
          return;
        }
      }
    }
    break;
  case 0xc :
    w32(param_1, 0, param_2);
    w32(param_1, 1, param_3);
    w32(param_1, 2, s32(((in_ECX + 0x10428) + param_4 * 4), 0));
    local_34 = (param_1 + 3);
    local_30 = 0;
    for (/* cond: (local_2c < s32(DAT_0067ab90, param_4)) */); local_2c = (local_2c < s32(DAT_0067ab90, param_4)); local_2c = (local_2c + 1)) {
      if ((s32((DAT_00682ba8 + (local_2c * 4 + param_4 * 0x2004)), 0) === 1)) {
        w32(local_34, 0, s32((((param_4 * 0x2004 + local_2c * 4) + 0x3f0) + in_ECX), 0));
        local_34 = (local_34 + 1);
        local_30 = (local_30 + 1);
        if ((s32(((in_ECX + 0x10428) + param_4 * 4), 0) === local_30)) {
          return;
        }
      }
    }
    break;
  case 0xd :
    w32(param_1, 0, param_2);
    w32(param_1, 1, param_3);
    w32(param_1, 2, s32(((in_ECX + 0x224) + param_4 * 4), 0));
    break;
  case 0x11 :
    w32(param_1, 0, param_2);
    w32(param_1, 1, param_3);
    w32(param_1, 2, s32(((in_ECX + 0x10428) + param_4 * 4), 0));
    local_28 = (param_1 + 3);
    local_30 = 0;
    for (/* cond: (local_2c < s32(DAT_0067ab90, param_4)) */); local_2c = (local_2c < s32(DAT_0067ab90, param_4)); local_2c = (local_2c + 1)) {
      if ((s32((DAT_00682ba8 + (local_2c * 4 + param_4 * 0x2004)), 0) === 1)) {
        w32(local_28, 0, s32((((param_4 * 0x2004 + local_2c * 4) + 0x43f8) + in_ECX), 0));
        w32(local_28, 1, s32((((param_4 * 0x2004 + local_2c * 4) + 0xc408) + in_ECX), 0));
        local_28 = (local_28 + 2);
        local_30 = (local_30 + 1);
        if ((s32(((in_ECX + 0x10428) + param_4 * 4), 0) === local_30)) {
          return;
        }
      }
    }
  }
  return;
}


 export function FUN_004dbee6 (param_1, param_2)

 {
  let piVar1;
  let iVar2;
  let puVar3;
  let sVar4;
  let uVar5;

  if ((param_1 !== 0)) {
    piVar1 = (param_1 + 0x20);
    iVar2 = (s32((param_1 + 0x24), 0) + param_1);
    puVar3 = (iVar2 + 0x20);
    FUN_004aef20(DAT_006a5b58);
    sVar4 = _strlen(DAT_006a5b58);
    if ((sVar4 !== 0)) {
      FUN_005dae6b(7, s_strlen(parleyDescription)_==_0_0062e834, s_D:\Ss\Franklinton\parleywin_tran_0062e808, 0x120);
    }
    if ((param_2 === 0)) {
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc70), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e854);
    }
    sVar4 = _strlen(DAT_006a5b58);
    if ((0x7ff < sVar4)) {
      FUN_005dae6b(7, s_strlen(parleyDescription)_<_2048_0062e888, s_D:\Ss\Franklinton\parleywin_tran_0062e85c, 0x126);
    }
    /* switch */ (s32((param_1 + 0x10), 0) ( *) ((param_1 + 0x10)  )) {
    case 6 :
      FUN_004def54(s32((param_1 + 0x28), 0), 0);
      break;
    case 7 :
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc98), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8c4);
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc9c), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8cc);
      FUN_004dcafa(piVar1);
      break;
    case 8 :
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc98), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8dc);
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xca4), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8e4);
      FUN_004af174(DAT_006a5b58, s__0062e8e8);
      FUN_004dcc0c(s32((param_1 + 0x28), 0));
      break;
    case 9 :
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc98), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8d0);
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xca0), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8d8);
      FUN_004dcc83(piVar1);
      break;
    case 10 :
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc98), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8f4);
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xca8), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8fc);
      FUN_004dcea5(piVar1);
      break;
    case 0xb :
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc98), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e900);
      FUN_004dd016(s32((param_1 + 0x28), 0), 0);
      break;
    case 0xc :
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc84), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8b8);
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc94), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8c0);
      FUN_004dd176(piVar1);
      break;
    case 0xd :
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc84), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8ac);
      iVar2 = s32((param_1 + 0x28), 0);
      if ((iVar2 === 0)) {
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc88), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
      }
      else if ((iVar2 === 1)) {
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc8c), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
      }
      else if ((iVar2 === 2)) {
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xc90), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
      }
      FUN_005f22e0(DAT_006a5b58, DAT_0062e8b4);
      break;
    case 0xe :
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcb4), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e910);
      /* switch */ (s32(puVar3, 0)) {
      case 5 :
      case 6 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xd1c), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e93c);
        FUN_004def54(s32((iVar2 + 0x28), 0), 1);
        break;
      case 8 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcb8), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e918);
        FUN_004dcafa(puVar3);
        break;
      case 9 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcbc), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e91c);
        FUN_004af174(DAT_006a5b58, s__0062e920);
        FUN_004dcc0c(s32((iVar2 + 0x28), 0));
        break;
      case 10 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcc0), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e92c);
        FUN_004dcc83(puVar3);
        break;
      case 0xc :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xccc), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e938);
        FUN_004dd176(puVar3);
        break;
      case 0xd :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcc8), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e934);
        FUN_004dd016(s32((iVar2 + 0x28), 0), 0);
        break;
      case 0x11 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcc4), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e930);
        FUN_004dcea5(puVar3);
      }
      FUN_005f22e0(DAT_006a5b58, DAT_0062e940);
      /* switch */ (s32(piVar1, 0)) {
      case 5 :
      case 6 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xd20), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e968);
        FUN_004def54(s32((param_1 + 0x28), 0), 1);
        break;
      case 8 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcd0), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e944);
        FUN_004dcafa(piVar1);
        break;
      case 9 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcd4), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e948);
        FUN_004af174(DAT_006a5b58, s__0062e94c);
        FUN_004dcc0c(s32((param_1 + 0x28), 0));
        break;
      case 10 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcd8), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e958);
        FUN_004dcc83(piVar1);
        break;
      case 0xc :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xce4), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e964);
        FUN_004dd176(piVar1);
        break;
      case 0xd :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xce0), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e960);
        FUN_004dd016(s32((param_1 + 0x28), 0), 1);
        break;
      case 0x11 :
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcdc), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
        FUN_005f22e0(DAT_006a5b58, DAT_0062e95c);
        FUN_004dcea5(piVar1);
      }
      break;
    case 0xf :
      uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcac), 0));
      FUN_004af174(DAT_006a5b58, uVar5);
      FUN_004aef36(DAT_006a5b58);
      if ((s32(piVar1, 0) === 0xc)) {
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xd18), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
      }
      else if ((s32(piVar1, 0) === 6)) {
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xd14), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
      }
      else {
        uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0xcb0), 0));
        FUN_004af174(DAT_006a5b58, uVar5);
      }
      FUN_005f22e0(DAT_006a5b58, DAT_0062e908);
      /* switch */ (s32(piVar1, 0)) {
      case 5 :
      case 6 :
        FUN_004def54(s32((param_1 + 0x28), 0), 1);
        break;
      case 8 :
        FUN_004dcafa(piVar1);
        break;
      case 9 :
        FUN_004dcc0c(s32((param_1 + 0x28), 0));
        break;
      case 10 :
        FUN_004dcc83(piVar1);
        break;
      case 0xc :
        FUN_004dd176(piVar1);
        break;
      case 0xd :
        FUN_004dd016(s32((param_1 + 0x28), 0), 1);
        break;
      case 0x11 :
        FUN_004dcea5(piVar1);
      }
    }
    sVar4 = _strlen(DAT_006a5b58);
    if ((0x7ff < sVar4)) {
      FUN_005dae6b(7, s_strlen(parleyDescription)_<_2048_0062e998, s_D:\Ss\Franklinton\parleywin_tran_0062e96c, 0x1f1);
    }
  }
  return;
}


 export function FUN_004dcafa (param_1)

 {
  let iVar1;
  let uVar2;
  let local_10;
  let local_8;

  iVar1 = s32((param_1 + 8), 0);
  local_8 = (param_1 + 0xc);
  for (/* cond: (local_10 < iVar1) */); local_10 = (local_10 < iVar1); local_10 = (local_10 + 1)) {
    uVar2 = FUN_00428b0c(s32((DAT_00627684 + s32(local_8, 0) * 0x10), 0));
    FUN_004af174(DAT_006a5b58, uVar2);
    if ((1 < iVar1)) {
      if ((local_10 < (iVar1 + -2))) {
        FUN_005f22e0(DAT_006a5b58, DAT_0062e9bc);
      }
      else if (((iVar1 + -2) === local_10)) {
        FUN_004aef36(DAT_006a5b58);
        uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0xce8), 0));
        FUN_004af174(DAT_006a5b58, uVar2);
        FUN_004aef36(DAT_006a5b58);
      }
      else {
        FUN_005f22e0(DAT_006a5b58, DAT_0062e9c0);
      }
    }
    local_8 = (local_8 + 1);
  }
  FUN_005f22e0(DAT_006a5b58, DAT_0062e9c4);
  return;
}


 export function FUN_004dcc0c (param_1)

 {
  let uVar1;
  let local_14;

  __itoa(param_1, DAT_ffffffec, 0xa);
  FUN_005f22e0(DAT_006a5b58, DAT_ffffffec);
  FUN_004aef36(DAT_006a5b58);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xcec), 0));
  FUN_005f22e0(DAT_006a5b58, uVar1);
  FUN_005f22e0(DAT_006a5b58, DAT_0062e9c8);
  return;
}


 export function FUN_004dcc83 (param_1)

 {
  let iVar1;
  let uVar2;
  let aiStack_120;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  for (/* cond: (local_20 < 0x3e) */); local_20 = (local_20 < 0x3e); local_20 = (local_20 + 1)) {
    w32(DAT_fffffee0, local_20, 0);
  }
  local_18 = s32((param_1 + 8), 0);
  local_24 = (param_1 + 0xc);
  local_1c = 0;
  for (/* cond: (local_20 < local_18) */); local_20 = (local_20 < local_18); local_20 = (local_20 + 1)) {
    iVar1 = FUN_0052ec47(s32((local_24 + local_20 * 4), 0));
    if ((-1 < iVar1)) {
      if ((s32(DAT_fffffee0, u8(DAT_006560f6[iVar1 * 0x20])) === 0)) {
        local_1c = (local_1c + 1);
      }
      w32(DAT_fffffee0, u8(DAT_006560f6[iVar1 * 0x20]), (s32(DAT_fffffee0, u8(DAT_006560f6[iVar1 * 0x20])) + 1));
    }
  }
  local_28 = 0;
  for (/* cond: (local_20 < 0x3e) */); local_20 = (local_20 < 0x3e); local_20 = (local_20 + 1)) {
    if ((s32(DAT_fffffee0, local_20) !== 0)) {
      FUN_004af122(DAT_006a5b58, s32((DAT_0064b1b8 + local_20 * 0x14), 0));
      FUN_005f22e0(DAT_006a5b58, DAT_0062e9cc);
      __itoa(s32(DAT_fffffee0, local_20), DAT_ffffffec, 0xa);
      FUN_005f22e0(DAT_006a5b58, DAT_ffffffec);
      FUN_005f22e0(DAT_006a5b58, DAT_0062e9d0);
      if ((1 < local_18)) {
        if ((local_28 < (local_1c + -2))) {
          FUN_005f22e0(DAT_006a5b58, DAT_0062e9d4);
        }
        else if (((local_1c + -2) === local_28)) {
          FUN_004aef36(DAT_006a5b58);
          uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0xce8), 0));
          FUN_004af174(DAT_006a5b58, uVar2);
          FUN_004aef36(DAT_006a5b58);
        }
        else {
          FUN_005f22e0(DAT_006a5b58, DAT_0062e9d8);
        }
      }
      local_28 = (local_28 + 1);
    }
  }
  FUN_005f22e0(DAT_006a5b58, DAT_0062e9dc);
  return;
}


 export function FUN_004dcea5 (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_1c;
  let local_14;

  iVar1 = s32((param_1 + 8), 0);
  for (/* cond: (local_1c < iVar1) */); local_1c = (local_1c < iVar1); local_1c = (local_1c + 1)) {
    iVar2 = FUN_0052ed95(s32(((param_1 + 0xc) + local_1c * 8), 0));
    FUN_0043c840(DAT_006a5b58, (DAT_0064f360 + iVar2 * 0x58));
    FUN_005f22e0(DAT_006a5b58, DAT_0062e9e0);
    __itoa(s32(((param_1 + 0x10) + local_1c * 8), 0), DAT_ffffffec, 0xa);
    FUN_005f22e0(DAT_006a5b58, DAT_ffffffec);
    FUN_005f22e0(DAT_006a5b58, DAT_0062e9e4);
    if ((1 < iVar1)) {
      if ((local_1c < (iVar1 + -2))) {
        FUN_005f22e0(DAT_006a5b58, DAT_0062e9e8);
      }
      else if (((iVar1 + -2) === local_1c)) {
        FUN_004aef36(DAT_006a5b58);
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xce8), 0));
        FUN_004af174(DAT_006a5b58, uVar3);
        FUN_004aef36(DAT_006a5b58);
      }
      else {
        FUN_005f22e0(DAT_006a5b58, DAT_0062e9ec);
      }
    }
  }
  FUN_005f22e0(DAT_006a5b58, DAT_0062e9f0);
  return;
}


 export function FUN_004dd016 (param_1, param_2)

 {
  let uVar1;

  if ((param_1 === 0)) {
    if ((param_2 === 0)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xcf0), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
    else {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xcf4), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
  }
  else if ((param_1 === 1)) {
    if ((param_2 === 0)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xcf8), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
    else {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xcfc), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
  }
  else if ((param_1 === 2)) {
    if ((param_2 === 0)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xd00), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
    else {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xd04), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
  }
  FUN_005f22e0(DAT_006a5b58, DAT_0062e9f4);
  return;
}


 export function FUN_004dd176 (param_1)

 {
  let iVar1;
  let uVar2;
  let local_10;
  let local_c;

  iVar1 = s32((param_1 + 8), 0);
  local_10 = (param_1 + 0xc);
  for (/* cond: (local_c < iVar1) */); local_c = (local_c < iVar1); local_c = (local_c + 1)) {
    uVar2 = FUN_00493c7d(s32(local_10, 0));
    FUN_004af174(DAT_006a5b58, uVar2);
    if ((1 < iVar1)) {
      if ((local_c < (iVar1 + -2))) {
        FUN_005f22e0(DAT_006a5b58, DAT_0062e9f8);
      }
      else if (((iVar1 + -2) === local_c)) {
        FUN_004aef36(DAT_006a5b58);
        uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0xce8), 0));
        FUN_004af174(DAT_006a5b58, uVar2);
        FUN_004aef36(DAT_006a5b58);
      }
      else {
        FUN_005f22e0(DAT_006a5b58, DAT_0062e9fc);
      }
    }
    local_10 = (local_10 + 1);
  }
  FUN_005f22e0(DAT_006a5b58, DAT_0062ea00);
  return;
}


 export function FUN_004dd285 (param_1)

 {
  let iVar1;
  let iVar2;
  let puVar3;
  let iVar4;
  let puVar5;

  if ((param_1 !== 0)) {
    FUN_005d2279(s_Start_ExecuteParleyTransaction_M_0062ea04, DAT_00628468);
    iVar1 = s32((param_1 + 0x14), 0);
    iVar2 = s32((param_1 + 0x18), 0);
    puVar3 = (param_1 + 0x20);
    iVar4 = (s32((param_1 + 0x24), 0) + param_1);
    puVar5 = (iVar4 + 0x20);
    /* switch */ (s32((param_1 + 0x10), 0) ( *) ((param_1 + 0x10)  )) {
    case 6 :
      FUN_004df10f(s32((param_1 + 0x28), 0), iVar1, iVar2);
      break;
    case 7 :
      FUN_004ddfb2(iVar2, iVar1, puVar3);
      break;
    case 8 :
      FUN_004ddf04(iVar2, iVar1, s32((param_1 + 0x28), 0));
      break;
    case 9 :
      FUN_004de990(iVar2, puVar3);
      break;
    case 10 :
      FUN_004de049(iVar2, puVar3);
      break;
    case 0xb :
      FUN_004dd8ad(iVar2, iVar1, s32((param_1 + 0x28), 0));
      break;
    case 0xc :
      FUN_004dde9e(iVar1, puVar3);
      FUN_004dde9e(iVar2, puVar3);
      break;
    case 0xd :
      FUN_004dd8ad(iVar1, iVar2, s32((param_1 + 0x28), 0));
      FUN_004dd8ad(iVar2, iVar1, s32((param_1 + 0x28), 0));
      break;
    case 0xe :
      /* switch */ (s32(puVar5, 0)) {
      case 5 :
      case 6 :
        FUN_004df10f(s32((iVar4 + 0x28), 0), iVar1, iVar2);
        break;
      case 8 :
        FUN_004ddfb2(iVar2, iVar1, puVar5);
        break;
      case 9 :
        FUN_004ddf04(iVar2, iVar1, s32((iVar4 + 0x28), 0));
        break;
      case 10 :
        FUN_004de990(iVar2, puVar5);
        break;
      case 0xc :
        FUN_004dde9e(iVar1, puVar5);
        break;
      case 0xd :
        FUN_004dd8ad(iVar2, iVar1, s32((iVar4 + 0x28), 0));
        break;
      case 0x11 :
        FUN_004de049(iVar2, puVar5);
      }
      /* switch */ (s32(puVar3, 0)) {
      case 5 :
      case 6 :
        FUN_004df10f(s32((param_1 + 0x28), 0), iVar1, iVar2);
        break;
      case 8 :
        FUN_004ddfb2(iVar1, iVar2, puVar3);
        break;
      case 9 :
        FUN_004ddf04(iVar1, iVar2, s32((param_1 + 0x28), 0));
        break;
      case 10 :
        FUN_004de990(iVar1, puVar3);
        break;
      case 0xc :
        FUN_004dde9e(iVar2, puVar3);
        break;
      case 0xd :
        FUN_004dd8ad(iVar1, iVar2, s32((param_1 + 0x28), 0));
        break;
      case 0x11 :
        FUN_004de049(iVar1, puVar3);
      }
      break;
    case 0xf :
      /* switch */ (s32(puVar3, 0)) {
      case 5 :
      case 6 :
        FUN_004df10f(s32((param_1 + 0x28), 0), iVar1, iVar2);
        break;
      case 8 :
        FUN_004ddfb2(iVar1, iVar2, puVar3);
        break;
      case 9 :
        FUN_004ddf04(iVar1, iVar2, s32((param_1 + 0x28), 0));
        break;
      case 10 :
        FUN_004de990(iVar1, puVar3);
        break;
      case 0xc :
        FUN_004dde9e(iVar2, puVar3);
        break;
      case 0xd :
        FUN_004dd8ad(iVar1, iVar2, s32((param_1 + 0x28), 0));
        break;
      case 0x11 :
        FUN_004de049(iVar1, puVar3);
      }
    }
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    if ((DAT_006d1da0 === iVar2)) {
      FUN_0056a65e(1);
    }
    else {
      FUN_0046b14d(0x79, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar2 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if ((DAT_006d1da0 === iVar1)) {
      FUN_0056a65e(1);
    }
    else {
      FUN_0046b14d(0x79, s32((DAT_006ad30c + s32((DAT_006ad558 + iVar1 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
    }
    if ((s16((DAT_0064c708 + iVar2 * 0x594), 0) === 0)) {
      FUN_004aa378(iVar2, iVar1);
    }
    if ((s16((DAT_0064c708 + iVar1 * 0x594), 0) === 0)) {
      FUN_004aa378(iVar1, iVar2);
    }
    FUN_005d2279(s_End_ExecuteParleyTransaction_Mes_0062ea30, DAT_00628468);
  }
  return;
}


 export function FUN_004dd8ad (param_1, param_2, param_3)

 {
  let bVar1;
  let bVar2;
  let uVar3;
  let uVar4;
  let iVar5;
  let pbVar6;
  let pbVar7;
  let uVar8;
  let iVar9;
  let local_34;
  let local_2c;
  let local_24;
  let local_20;
  let local_1c;
  let local_14;
  let local_c;

  uVar3 = (1 << (((param_1) & 0xFF) & 0x1f));
  uVar4 = (1 << (((param_2) & 0xFF) & 0x1f));
  local_1c = 0;
  local_14 = 0;
  FUN_005b9ec6();
  for (/* cond: (local_c < ((DAT_006d1164) << 16 >> 16)) */); local_c = (local_c < ((DAT_006d1164) << 16 >> 16)); local_c = (local_c + 1)) {
    iVar5 = FUN_005b8931(local_14, local_1c);
    pbVar6 = FUN_005b898b(local_14, local_1c, param_1);
    pbVar7 = FUN_005b898b(local_14, local_1c, param_2);
    if (((uVar4 & u8(_MEM[(iVar5 + 4)])) !== 0)) {
      if (((uVar3 & u8(_MEM[(iVar5 + 4)])) === 0)) {
        FUN_005b9d81(local_14, local_1c, 0, param_1, 0, 1);
        FUN_005b976d(local_14, local_1c, uVar3, 1, 1);
      }
      if ((param_3 === 0)) {
        if (((_MEM[pbVar7] & 0x80) === 0)) {
          bVar2 = _MEM[pbVar7];
          bVar1 = _MEM[pbVar6];
          iVar5 = FUN_005b8931(local_14, local_1c);
          local_2c = (((bVar2 | bVar1) & _MEM[(iVar5 + 1)]) & 0x80);
        }
        else {
          local_2c = 0x80;
        }
        pbVar6 = FUN_005b898b(local_14, local_1c, param_1, param_1, 0, 1);
        FUN_005b9d81(local_14, local_1c, ((_MEM[pbVar6] & 0x7f) | local_2c));
        iVar5 = FUN_005b8931(local_14, local_1c, param_1, 1, 1);
        bVar2 = _MEM[(iVar5 + 1)];
        pbVar6 = FUN_005b898b(local_14, local_1c, param_2);
        FUN_005b9d81(local_14, local_1c, (bVar2 & _MEM[pbVar6]));
      }
    }
    local_14 = (local_14 + 2);
    if ((((DAT_006d1160) << 16 >> 16) <= local_14)) {
      local_1c = (local_1c + 1);
      local_14 = (local_1c & 1);
    }
  }
  local_24 = ((uVar3) & 0xFF);
  if ((param_3 === 0)) {
    for (/* cond: (local_34 < ((DAT_00655b16) << 16 >> 16)) */); local_34 = (local_34 < ((DAT_00655b16) << 16 >> 16)); local_34 = (local_34 + 1)) {
      if ((s8(DAT_006560f7[local_34 * 0x20]) === param_2)) {
        DAT_006560f9[local_34 * 0x20] = (DAT_006560f9[local_34 * 0x20] | local_24);
        iVar5 = FUN_005b8931(((s16((DAT_006560f0 + local_34 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_34 * 0x20), 0)) << 16 >> 16));
        if (((uVar4 & u8(_MEM[(iVar5 + 4)])) === 0)) {
          for (/* cond: (local_c < 0x15) */); local_c = (local_c < 0x15); local_c = (local_c + 1)) {
            uVar8 = FUN_005ae052((s8(DAT_00628370[local_c]) + local_14));
            iVar5 = (s8(DAT_006283a0[local_c]) + local_1c);
            iVar9 = FUN_004087c0(uVar8, iVar5);
            if ((iVar9 !== 0)) {
              FUN_005b976d(uVar8, iVar5, uVar3, 1, 1);
              FUN_005b976d(uVar8, iVar5, uVar4, 1, 1);
            }
          }
        }
      }
    }
  }
  if ((param_3 === 1)) {
    for (/* cond: (local_20 < ((DAT_00655b18) << 16 >> 16)) */); local_20 = (local_20 < ((DAT_00655b18) << 16 >> 16)); local_20 = (local_20 + 1)) {
      if ((s8(DAT_0064f348[local_20 * 0x58]) === param_2)) {
        if ((s8(DAT_0064f348[local_20 * 0x58]) === param_2)) {
          DAT_0064f34d[(local_20 * 0x58 + param_1)] = DAT_0064f349[local_20 * 0x58];
        }
        else {
          DAT_0064f34d[(local_20 * 0x58 + param_1)] = DAT_0064f34d[(local_20 * 0x58 + param_2)];
        }
        DAT_0064f34c[local_20 * 0x58] = (DAT_0064f34c[local_20 * 0x58] | local_24);
        iVar5 = FUN_005b8931(((s16((DAT_0064f340 + local_20 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_20 * 0x58), 0)) << 16 >> 16));
        if (((uVar4 & u8(_MEM[(iVar5 + 4)])) === 0)) {
          for (/* cond: (local_c < 0x15) */); local_c = (local_c < 0x15); local_c = (local_c + 1)) {
            uVar8 = FUN_005ae052((s8(DAT_00628370[local_c]) + local_14));
            iVar5 = (s8(DAT_006283a0[local_c]) + local_1c);
            iVar9 = FUN_004087c0(uVar8, iVar5);
            if ((iVar9 !== 0)) {
              FUN_005b976d(uVar8, iVar5, uVar3, 1, 1);
              FUN_005b976d(uVar8, iVar5, uVar4, 1, 1);
            }
          }
        }
      }
    }
  }
  FUN_005b9f1c();
  FUN_004b0b53(0xff, 2, 0, 0, 0);
  if ((DAT_006d1da0 === param_1)) {
    FUN_0047cf9e(DAT_006d1da0, 1);
  }
  else {
    FUN_0046b14d(0x74, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
  }
  return;
}


 export function FUN_004dde9e (param_1, param_2)

 {
  let iVar1;
  let local_10;
  let local_c;

  iVar1 = s32((param_2 + 8), 0);
  local_10 = (param_2 + 0xc);
  for (/* cond: (local_c < iVar1) */); local_c = (local_c < iVar1); local_c = (local_c + 1)) {
    FUN_00467825(param_1, s32(local_10, 0), 0x2000);
    local_10 = (local_10 + 1);
  }
  return;
}


 export function FUN_004ddf04 (param_1, param_2, param_3)

 {
  let iVar1;

  if ((s32((DAT_0064c6a2 + param_2 * 0x594), 0) < param_3)) {
    param_3 = s32((DAT_0064c6a2 + param_2 * 0x594), 0);
  }
  w32((DAT_0064c6a2 + param_2 * 0x594), 0, (s32((DAT_0064c6a2 + param_2 * 0x594), 0) - param_3));
  w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) + param_3));
  iVar1 = FUN_0045b472(param_3);
  FUN_00456f20(param_1, param_2, (-(iVar1 * 3 / 2 | 0)));
  return;
}


 export function FUN_004ddfb2 (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let local_10;
  let local_c;

  iVar1 = s32((param_3 + 8), 0);
  local_10 = (param_3 + 0xc);
  for (/* cond: (local_c < iVar1) */); local_c = (local_c < iVar1); local_c = (local_c + 1)) {
    iVar2 = FUN_004bd9f0(param_2, s32(local_10, 0));
    if ((iVar2 !== 0)) {
      iVar2 = FUN_004bd9f0(param_1, s32(local_10, 0));
      if ((iVar2 === 0)) {
        FUN_004bf05b(param_1, s32(local_10, 0), param_2, 1, 0);
      }
    }
    local_10 = (local_10 + 1);
  }
  return;
}


 export function FUN_004de049 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let local_14;
  let local_c;

  iVar1 = s32((param_2 + 8), 0);
  local_14 = (param_2 + 0xc);
  for (/* cond: (local_c < iVar1) */); local_c = (local_c < iVar1); local_c = (local_c + 1)) {
    iVar2 = FUN_0052ed95(s32(local_14, 0));
    if ((s32((DAT_0064f394 + iVar2 * 0x58), 0) !== 0)) {
      FUN_004de0e2(iVar2, param_1);
    }
    local_14 = (local_14 + 2);
  }
  return;
}


 export function FUN_004de0e2 (param_1, param_2)

 {
  let cVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let local_34;
  let local_2c;
  let local_28;
  let local_10;
  let local_8;

  cVar1 = DAT_0064f348[param_1 * 0x58];
  iVar2 = s8(cVar1);
  iVar3 = ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16);
  iVar4 = ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16);
  FUN_0043d289(param_1, 1, 0);
  FUN_0043d289(param_1, 4, 0);
  FUN_0043d289(param_1, 0xb, 0);
  FUN_0043d289(param_1, 7, 0);
  w16((DAT_0064c6ae + param_2 * 0x594), 0, DAT_00655af8);
  w16((DAT_0064c708 + param_2 * 0x594), 0, (s16((DAT_0064c708 + param_2 * 0x594), 0) + 1));
  if ((s16((DAT_0064c708 + iVar2 * 0x594), 0) !== 0)) {
    w16((DAT_0064c708 + iVar2 * 0x594), 0, (s16((DAT_0064c708 + iVar2 * 0x594), 0) + 0xffff));
  }
  FUN_005b9ec6();
  for (/* cond: (local_10 < 0x15) */); local_10 = (local_10 < 0x15); local_10 = (local_10 + 1)) {
    uVar5 = FUN_005ae052((s8(DAT_00628370[local_10]) + iVar3));
    iVar6 = (s8(DAT_006283a0[local_10]) + iVar4);
    iVar7 = FUN_004087c0(uVar5, iVar6);
    if ((iVar7 !== 0)) {
      FUN_005b9c49(uVar5, iVar6, param_2, 1);
      FUN_005b976d(uVar5, iVar6, (1 << (((param_2) & 0xFF) & 0x1f)), 1, 1);
    }
  }
  DAT_0064f348[param_1 * 0x58] = ((param_2) & 0xFF);
  FUN_0043cc00(param_1, iVar2);
  if ((DAT_00627670 !== 0)) {
    FUN_004fc2bb((DAT_0064f360 + param_1 * 0x58), param_2, iVar2);
  }
  FUN_005b99e8(iVar3, iVar4, param_2, 1);
  local_2c = ((DAT_00655b16) << 16 >> 16);
  while ((-1 < local_2c)) {
    if ((s8(DAT_006560f7[local_2c * 0x20]) === iVar2)) {
      if ((s16((DAT_0064f342 + param_1 * 0x58), 0) !== s16((DAT_006560f2 + local_2c * 0x20), 0))) {
        FUN_005b5d93(local_2c, 1);
      }
      else if ((s16((DAT_0064f342 + param_1 * 0x58), 0) === s16((DAT_006560f2 + local_2c * 0x20), 0))) {
        DAT_0064c778[(param_2 * 0x594 + u8(DAT_006560f6[local_2c * 0x20]))] = (DAT_0064c778[(param_2 * 0x594 + u8(DAT_006560f6[local_2c * 0x20]))] + 1);
        DAT_0064c778[(iVar2 * 0x594 + u8(DAT_006560f6[local_2c * 0x20]))] = (DAT_0064c778[(iVar2 * 0x594 + u8(DAT_006560f6[local_2c * 0x20]))] + 0xff);
        DAT_006560f7[local_2c * 0x20] = ((param_2) & 0xFF);
        DAT_00656100[local_2c * 0x20] = 0xff;
        DAT_006560f8[local_2c * 0x20] = 0;
        DAT_006560ff[local_2c * 0x20] = 0xff;
        param_1 = FUN_0043d07a(((s16((DAT_006560f0 + local_2c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_2c * 0x20), 0)) << 16 >> 16), param_2, -1, -1);
        if ((s8(DAT_0064f348[param_1 * 0x58]) === param_2)) {
          DAT_00656100[local_2c * 0x20] = ((param_1) & 0xFF);
        }
        FUN_005b490e(local_2c, param_2);
        if ((DAT_0064b1ca[u8(DAT_006560f6[local_2c * 0x20]) * 0x14] < 5)) {
          w16((DAT_0064c706 + param_2 * 0x594), 0, (s16((DAT_0064c706 + param_2 * 0x594), 0) + 1));
        }
        w32((DAT_0064b9e8 + param_2 * 4), 0, (s32((DAT_0064b9e8 + param_2 * 4), 0) + 1));
        if ((DAT_0064b1ca[u8(DAT_006560f6[local_2c * 0x20]) * 0x14] < 5)) {
          w16((DAT_0064c706 + iVar2 * 0x594), 0, (s16((DAT_0064c706 + iVar2 * 0x594), 0) + 0xffff))
          ;
        }
        if ((s32((DAT_0064b9e8 + iVar2 * 4), 0) !== 0)) {
          w32((DAT_0064b9e8 + iVar2 * 4), 0, (s32((DAT_0064b9e8 + iVar2 * 4), 0) + -1));
        }
      }
    }
  }
  if ((iVar2 !== 0)) {
    if ((0xff < DAT_0064f379[param_1 * 0x58])) {
      local_34 = ((~s8(DAT_0064f379[param_1 * 0x58])) + 1);
    }
    else {
      local_34 = s8(DAT_0064f379[param_1 * 0x58]);
    }
    iVar2 = FUN_004c03ae(param_2, param_1, local_34);
    if ((iVar2 !== 0));
  for (/* cond: (-1 < local_28) */); -1 = (-1 < local_28); local_28 = (local_28 + -1)) {
    if ((iVar2 !== 0)) {
      local_8 = ((s8(DAT_0064b1c5[local_28 * 0x14]) << 3) / s8(DAT_0064b1c8[local_28 * 0x14]) | 0);
      if (((DAT_0064b1bd[local_28 * 0x14] & 4) !== 0)) {
        local_8 = (local_8 + 1);
      }
      if ((0 < local_8)) {
        DAT_0064f379[param_1 * 0x58] = ((local_28) & 0xFF);
      }
      break;
    }
  }
 LAB_004de76b: :
  FUN_0047cf22(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16));
  FUN_004b0b53(0xff, 2, 0, 0, 0);
  FUN_0046b14d(0x75, 0xff, ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16), 0, 0, 0, 0, 0, 0);
  iVar2 = FUN_005b8931(iVar3, iVar4);
  if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(_MEM[(iVar2 + 4)])) === 0)) {
    FUN_005b976d(iVar3, iVar4, (1 << (((param_2) & 0xFF) & 0x1f)), 1, 1);
    FUN_0047cea6(iVar3, iVar4);
  }
  for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
    uVar5 = FUN_005ae052((s8(DAT_00628350[local_10]) + iVar3));
    iVar2 = (s8(DAT_00628360[local_10]) + iVar4);
    iVar6 = FUN_004087c0(uVar5, iVar2);
    if ((((1 << (((param_2) & 0xFF) & 0x1f)) & u8(_MEM[(iVar6 + 4)])) === 0)) {
      FUN_005b976d(uVar5, iVar2, (1 << (((param_2) & 0xFF) & 0x1f)), 1, 1);
      FUN_0047cea6(uVar5, iVar2);
    }
  }
  FUN_005b9f1c();
  FUN_0046b14d(0x75, 0xff, iVar3, iVar4, 0, 0, 0, 0, 0, 0);
  DAT_0064f34a[param_1 * 0x58] = cVar1;
  DAT_0064f34b[param_1 * 0x58] = ((DAT_00655af8) & 0xFF);
  uVar8 = FUN_00453e18(0xe);
  if ((uVar8 === param_1)) {
    FUN_004be6ba(param_2);
  }
  return;
}


 export function FUN_004de990 (param_1, param_2)

 {
  let uVar1;
  let iVar2;
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

  local_14 = s32((param_2 + 8), 0);
  local_8 = (param_2 + 0xc);
  for (/* cond: (local_20 < local_14) */); local_20 = (local_20 < local_14); local_20 = (local_20 + 1)) {
    uVar1 = s32(local_8, 0);
    local_8 = (local_8 + 1);
    local_2c = FUN_0052ec47(uVar1);
    if ((param_1 !== local_10)) {
      if ((1 < iVar2)) {
        while ((1 < iVar2)) {
          local_24 = FUN_005b2d39(local_2c);
          if ((local_24 === local_2c)) {
            local_24 = FUN_005b2c82(local_24);
          }
          iVar2 = FUN_004ded07(local_24, DAT_ffffffd0, DAT_fffffff4, s8(DAT_006560f7[local_24 * 0x20]), 1);
          if ((iVar2 === 0)) {
            FUN_005b5d93(local_24, 1);
          }
          else {
            FUN_005b36df(local_24, local_30, local_c, 1);
          }
        }
      }
      iVar2 = FUN_004ded07(local_2c, DAT_ffffffe8, DAT_ffffffe4, param_1, 0);
      if ((iVar2 !== 0)) {
        DAT_0064c778[(param_1 * 0x594 + u8(DAT_006560f6[local_2c * 0x20]))] = (DAT_0064c778[(param_1 * 0x594 + u8(DAT_006560f6[local_2c * 0x20]))] + 1);
        DAT_0064c778[(local_10 * 0x594 + u8(DAT_006560f6[local_2c * 0x20]))] = (DAT_0064c778[(local_10 * 0x594 + u8(DAT_006560f6[local_2c * 0x20]))] + 0xff);
        DAT_006560f7[local_2c * 0x20] = ((param_1) & 0xFF);
        DAT_00656100[local_2c * 0x20] = 0xff;
        DAT_006560f8[local_2c * 0x20] = 0;
        DAT_006560ff[local_2c * 0x20] = 0xff;
        local_28 = FUN_0043d07a(((s16((DAT_006560f0 + local_2c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_2c * 0x20), 0)) << 16 >> 16), param_1, -1, -1);
        if ((s8(DAT_0064f348[local_28 * 0x58]) === param_1)) {
          DAT_00656100[local_2c * 0x20] = ((local_28) & 0xFF);
        }
        FUN_005b490e(local_2c, param_1);
        if ((DAT_0064b1ca[u8(DAT_006560f6[local_2c * 0x20]) * 0x14] < 5)) {
          w16((DAT_0064c706 + param_1 * 0x594), 0, (s16((DAT_0064c706 + param_1 * 0x594), 0) + 1));
        }
        w32((DAT_0064b9e8 + param_1 * 4), 0, (s32((DAT_0064b9e8 + param_1 * 4), 0) + 1));
        if ((DAT_0064b1ca[u8(DAT_006560f6[local_2c * 0x20]) * 0x14] < 5)) {
          w16((DAT_0064c706 + local_10 * 0x594), 0, (s16((DAT_0064c706 + local_10 * 0x594), 0) + 0xffff));
        }
        if ((s32((DAT_0064b9e8 + local_10 * 4), 0) !== 0)) {
          w32((DAT_0064b9e8 + local_10 * 4), 0, (s32((DAT_0064b9e8 + local_10 * 4), 0) + -1));
        }
        FUN_005b36df(local_2c, local_18, local_1c, 1);
        FUN_004274a6(local_2c, 0);
      }
    }
  }
  XD_FlushSendBuffer(0x1388);
  return;
}


 export function FUN_004ded07 (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let local_c;
  let local_8;

  w32(param_2, 0, ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16));
  iVar1 = s32(param_2, 0);
  w32(param_3, 0, ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
  iVar2 = s32(param_3, 0);
  local_8 = 1;
  if ((1 < iVar3)) {
    local_8 = 0;
    for (/* cond: (local_c < 0x2d) */); local_c = (local_c < 0x2d); local_c = (local_c + 1)) {
      iVar3 = FUN_005ae052((s8(DAT_00628370[local_c]) + iVar1));
      w32(param_2, 0, iVar3);
      w32(param_3, 0, (s8(DAT_006283a0[local_c]) + iVar2));
      if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 1)) {
        return 1;
      }
    }
  }
  return local_8;
}


 export function FUN_004def54 (param_1, param_2)

 {
  let uVar1;

  if ((param_2 === 0)) {
    /* switch */ () {
    case 0 :
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xc74), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
      break;
    case 1 :
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xc78), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
      break;
    case 2 :
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xc7c), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
      break;
    case 3 :
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xc80), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
  }
  else if ((param_2 === 1)) {
    if ((param_1 === 0)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xbcc), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
    else if ((param_1 === 1)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xbd0), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
    else if ((param_1 === 2)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xbd4), 0));
      FUN_004af174(DAT_006a5b58, uVar1);
    }
  }
  FUN_005f22e0(DAT_006a5b58, DAT_0062ea5c);
  return;
}


 export function FUN_004df10f (param_1, param_2, param_3)

 {
  /* switch */ () {
  case 0 :
    FUN_00467825(param_2, param_3, 2);
    break;
  case 1 :
    FUN_00467825(param_2, param_3, 4);
    break;
  case 2 :
    FUN_00467825(param_2, param_3, 8);
    break;
  case 3 :
    if (((DAT_0064c6c0[(param_3 * 4 + param_2 * 0x594)] & 2) !== 0)) {
      FUN_00467750(param_2, param_3, 2);
    }
    if (((DAT_0064c6c0[(param_3 * 4 + param_2 * 0x594)] & 4) !== 0)) {
      FUN_00467750(param_2, param_3, 4);
    }
    if (((DAT_0064c6c0[(param_3 * 4 + param_2 * 0x594)] & 8) !== 0)) {
      FUN_00467750(param_2, param_3, 8);
    }
  }
  return;
}
