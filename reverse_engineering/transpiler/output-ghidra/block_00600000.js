// Block 0x00600000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 103

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __NMSG_WRITE */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __NMSG_WRITE (param_1)

 {
  let pcVar1;
  let iVar2;
  let sVar3;
  let DVar4;
  let lpNumberOfBytesWritten;
  let lpOverlapped;
  let local_1b8;
  let local_1b4;
  let local_114;
  let local_10;
  let local_c;
  let local_8;

  (s32((DAT_0063b1b8 + local_c * 8), 0) !== param_1) (local_c = 0; (local_c = (local_c < 0x12) && (DAT_0063b1b8 = DAT_0063b1b8));
      local_c = (local_c + 1)) {
  }
  if ((s32((DAT_0063b1b8 + local_c * 8), 0) === param_1)) {
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
    if ((DAT_00639fd0 === 1)) {
      if ((s32((DAT_006e69f0 + 0x10), 0) === -1)) {
        local_1b8 = FUN_006e7bd8(-12);
      }
      else {
        local_1b8 = s32((DAT_006e69f0 + 0x10), 0);
      }
      lpOverlapped = 0;
      lpNumberOfBytesWritten = DAT_fffffff8;
      sVar3 = _strlen(s32(PTR_s_R6002_-_floating_point_not_loade_0063b1bc, local_c * 2));
      FUN_006e7c4c(local_1b8, s32(PTR_s_R6002_-_floating_point_not_loade_0063b1bc, local_c * 2), sVar3, lpNumberOfBytesWritten, lpOverlapped);
    }
    else if ((param_1 !== 0xfc)) {
      DVar4 = FUN_006e7b1c(0, DAT_fffffeec, 0x104);
      if ((DVar4 === 0)) {
        FUN_005f22d0(DAT_fffffeec, 0x61e400);
      }
      local_10 = DAT_fffffeec;
      sVar3 = _strlen(local_10);
      if ((0x3c < (sVar3 + 1))) {
        sVar3 = _strlen(DAT_fffffeec);
        local_10 = (local_10 + (sVar3 - 0x3b));
        _strncpy(local_10, 0x61e304, 3);
      }
      FUN_005f22d0(DAT_fffffe4c, 0x61eb08);
      FUN_005f22e0(DAT_fffffe4c, local_10);
      FUN_005f22e0(DAT_fffffe4c, DAT_0061e2fc);
      FUN_005f22e0(DAT_fffffe4c, s32(PTR_s_R6002_-_floating_point_not_loade_0063b1bc, local_c * 2));
      ___crtMessageBoxA(DAT_fffffe4c, 0x61e308, 0x12010);
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __GET_RTERRMSG */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __GET_RTERRMSG (param_1)

 {
  let pwVar1;
  let local_8;

  (s32((DAT_0063b1b8 + local_8 * 8), 0) !== param_1) (local_8 = 0; (local_8 = (local_8 < 0x12) && (DAT_0063b1b8 = DAT_0063b1b8));
      local_8 = (local_8 + 1)) {
  }
  if ((s32((DAT_0063b1b8 + local_8 * 8), 0) === param_1)) {
    pwVar1 = s32(PTR_s_R6002_-_floating_point_not_loade_0063b1bc, local_8 * 2);
  }
  else {
    pwVar1 = 0;
  }
  return pwVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___loctotime_t */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___loctotime_t (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  let iVar2;
  let local_30;
  let local_2c;
  let local_8;

  uVar1 = (param_1 - 0x76c);
  if ((0x8a < uVar1)) {
    local_8 = -1;
  }
  else {
    local_30 = (s32((DAT_0063b3a4 + param_2 * 4), 0) + param_3);
    if ((2 < param_2)) {
      local_30 = (local_30 + 1);
    }
    local_8 = (((((((param_1 + -0x7b2) * 0x16d + ((param_1 + -0x76d) >> 2)) + -17) + local_30) * 0x18 + param_4) * 0x3c + param_5) * 0x3c + param_6);
    ___tzset();
    local_8 = (local_8 + DAT_0063b2b0);
    local_2c = local_30;
    local_2c = (param_2 + -1);
    local_2c = param_4;
    if ((iVar2 !== 0)) {
      local_8 = (local_8 + DAT_0063b2b8);
    }
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _abort */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _abort ()

 {
  __NMSG_WRITE(0xa);
  _raise(0x16);
  __exit(3);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _signal */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _signal (param_1)

 {
  let BVar1;
  let in_stack_00000008;
  let local_8;

  if ((in_stack_00000008 !== 3)) {
    if ((param_1 === 0xf)) {
      if ((DAT_0063b25c === 0)) {
        BVar1 = FUN_006e7b80(ctrlevent_capture, 1);
        if ((BVar1 !== 1)) {
          DAT_00639f18 = FUN_006e7b00();
          DAT_00639f14 = 0x16;
          return;
        }
        DAT_0063b25c = 1;
      }
      /* switch */ () {
      case 2 :
        DAT_0063b24c = in_stack_00000008;
        break;
      case 0xf :
        DAT_0063b258 = in_stack_00000008;
        break;
      case 0x15 :
        DAT_0063b250 = in_stack_00000008;
        break;
      case 0x16 :
        DAT_0063b254 = in_stack_00000008;
      }
      return;
    }
    if ((local_8 !== 0)) {
      (s32((local_8 + 4), 0) === param_1) (; local_8 = (local_8 + 4); local_8 = (local_8 + 0xc)) {
        w32((local_8 + 8), 0, in_stack_00000008);
      }
      return;
    }
  }
  DAT_00639f14 = 0x16;
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _ctrlevent_capture@4 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */
 /* Debug */    /* __stdcall */

 /* ctrlevent_capture,4  */ */ export function ctrlevent_capture (param_1)

 {
  let uVar1;
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    local_c = DAT_0063b24c;
    local_10 = DAT_0063b24c;
    local_8 = 2;
  }
  else {
    local_c = DAT_0063b250;
    local_10 = DAT_0063b250;
    local_8 = 0x15;
  }
  if ((local_10 === 0)) {
    uVar1 = 0;
  }
  else {
    if ((local_10 !== 1)) {
      w32(local_c, 0, 0);
      local_10 = local_10(local_8);
    }
    uVar1 = 1;
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _raise */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _raise (_SigNum)

 {
  let iVar1;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  /* switch */ () {
  case 2 :
    local_14 = DAT_0063b24c;
    local_18 = DAT_0063b24c;
    break;
  default :
    return -1;
  case 4 :
  case 8 :
  case 0xb :
    iVar1 = siglookup(_SigNum);
    local_14 = (iVar1 + 8);
    local_18 = s32(local_14, 0);
    break;
  case 0xf :
    local_14 = DAT_0063b258;
    local_18 = DAT_0063b258;
    break;
  case 0x15 :
    local_14 = DAT_0063b250;
    local_18 = DAT_0063b250;
    break;
  case 0x16 :
    local_14 = DAT_0063b254;
    local_18 = DAT_0063b254;
  }
  if ((local_18 !== 1)) {
    if ((local_18 === 0)) {
      __exit(3);
    }
    if ((_SigNum === 4)) {
      local_10 = DAT_0063af90;
      DAT_0063af90 = 0;
      if ((_SigNum === 8)) {
        local_8 = DAT_0063af8c;
        DAT_0063af8c = 0x8c;
      }
    }
    if ((_SigNum === 8)) {
      (local_c < (DAT_0063af84 + DAT_0063af80)) (local_c = DAT_0063af80; local_c = (local_c < (DAT_0063af84 + DAT_0063af80)); local_c = (local_c + 1)) {
        w32((local_c * 0xc + 0x63af10), 0, 0);
      }
    }
    else {
      w32(local_14, 0, 0);
    }
    if ((_SigNum === 8)) {
      local_18 = local_18(8, DAT_0063af8c);
    }
    else {
      local_18 = local_18(_SigNum);
      if ((_SigNum !== 4)) {
        return 0;
      }
    }
    if ((_SigNum === 8)) {
      DAT_0063af8c = local_8;
    }
    DAT_0063af90 = local_10;
    return 0;
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _siglookup */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function siglookup (param_1)

 {
  let local_8;

  local_8 = DAT_0063af08;
  do {
    if ((s32(local_8, 1) === param_1)) {
    local_8 = 0;
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtMessageBoxA */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtMessageBoxA (_LpText, _LpCaption, _UType)

 {
  let hModule;
  let iVar1;
  let local_8;

  local_8 = 0;
  if ((DAT_0063b260 === 0)) {
    hModule = FUN_006e7c30(0x61e564);
    if ((hModule !== 0)) {
      DAT_0063b260 = FUN_006e7c2c(hModule, 0x61eb48);
      if ((FUN_006e7c2c(hModule, 0x61eb48) !== 0)) {
        DAT_0063b264 = FUN_006e7c2c(hModule, 0x61eb38);
        DAT_0063b268 = FUN_006e7c2c(hModule, 0x61eb24);
        goto LAB_006009b5;
      }
    }
    iVar1 = 0;
  }
  else {
 LAB_006009b5: :
    if ((DAT_0063b264 !== 0)) {
      local_8 = DAT_0063b264();
    }
    if ((DAT_0063b268 !== 0)) {
      local_8 = DAT_0063b268(local_8);
    }
    iVar1 = DAT_0063b260(local_8, _LpText, _LpCaption, _UType);
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __itoa */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __itoa (_Value, _Dest, _Radix)

 {
  if ((_Value < 0)) {
    xtoa(_Value, _Dest, 0xa, 1);
  }
  else {
    xtoa(_Value, _Dest, _Radix, 0);
  }
  return _Dest;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _xtoa */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function xtoa (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let pcVar2;
  let uVar3;
  let local_c;
  let local_8;

  local_8 = param_2;
  if ((param_4 !== 0)) {
    _MEM[param_2] = 0x2d;
    local_8 = (param_2 + 1);
    param_1 = (-param_1);
  }
  local_c = local_8;
  do {
    pcVar2 = local_8;
    uVar3 = (param_1 % param_3);
    param_1 = (param_1 / param_3 | 0);
    cVar1 = ((uVar3) & 0xFF);
    if ((uVar3 < 0xa)) {
      _MEM[local_8] = (cVar1 + 0x30);
    }
    else {
      _MEM[local_8] = (cVar1 + 0x57);
    }
    local_8 = (local_8 + 1);
  } while ((param_1 !== 0)) {
    cVar1 = _MEM[local_8];
    _MEM[local_8] = _MEM[local_c];
    _MEM[local_c] = cVar1;
    local_8 = (local_8 + -1);
    local_c = (local_c + 1);
  } while ((local_c < local_8))


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ltoa */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ltoa (_Value, _Dest, _Radix)

 {
  let local_8;

  if ((_Value < 0)) {
    local_8 = 1;
  }
  else {
    local_8 = 0;
  }
  xtoa(_Value, _Dest, _Radix, local_8);
  return _Dest;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ultoa */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ultoa (_Value, _Dest, _Radix)

 {
  xtoa(_Value, _Dest, _Radix, 0);
  return _Dest;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __i64toa */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __i64toa (_Val, _DstBuf, _Radix)

 {
  let local_8;

  if ((_Val < 0)) {
    local_8 = 1;
  }
  else {
    local_8 = 0;
  }
  x64toa(_Val, _DstBuf, _Radix, local_8);
  return _DstBuf;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _x64toa@20 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */
 /* Debug */    /* __stdcall */

 /* x64toa,20  */ */ export function x64toa (param_1, param_2, param_3, param_4, param_5)

 {
  let cVar1;
  let pcVar2;
  let uVar3;
  let lVar4;
  let local_c;
  let local_8;

  lVar4 = ((param_2 << 32) | param_1);
  local_8 = param_3;
  if ((param_5 !== 0)) {
    _MEM[param_3] = 0x2d;
    local_8 = (param_3 + 1);
  }
  local_c = local_8;
  do {
    pcVar2 = local_8;
    uVar3 = __aullrem(lVar4, param_4, 0);
    lVar4 = __aulldiv(lVar4, param_4, 0);
    if ((uVar3 < 0xa)) {
      _MEM[local_8] = (((uVar3) & 0xFF) + 0x30);
    }
    else {
      _MEM[local_8] = (((uVar3) & 0xFF) + 0x57);
    }
    local_8 = (local_8 + 1);
  } while ((lVar4 !== 0)) {
    cVar1 = _MEM[local_8];
    _MEM[local_8] = _MEM[local_c];
    _MEM[local_c] = cVar1;
    local_8 = (local_8 + -1);
    local_c = (local_c + 1);
  } while ((local_c < local_8))


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ui64toa */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ui64toa (_Val, _DstBuf, _Radix)

 {
  x64toa(_Val, _DstBuf, _Radix, 0);
  return _DstBuf;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fprintf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fprintf (_File, _Format)

 {
  let pcVar1;
  let iVar2;
  let iVar3;

  if ((_File === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61eb54, 0x38, 0, 0x61d818);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  if ((_Format === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61eb54, 0x39, 0, 0x61d824);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  iVar2 = __stbuf(_File);
  iVar3 = __output(_File, _Format, DAT_0000000c);
  __ftbuf(iVar2, _File);
  return iVar3;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */
 /* address  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _setvbuf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _setvbuf (_File, _Buf, _Mode, _Size)

 {
  let pcVar1;
  let iVar2;
  let local_c;

  local_c = 0;
  if ((iVar2 === 1)) {
    /* DEVIATION: intrinsic */;
    iVar2 = pcVar1();
    return iVar2;
  }
  if ((_Mode === 0x40)) {
    _Size = (_Size & -2);
    __flush(_File);
    __freebuf(_File);
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -0x3d0d));
    if (((_Mode & 4) === 0)) {
      if ((_Buf === 0)) {
        _Buf = __malloc_dbg(_Size, 2, 0x61eb60, 0x85);
        if ((_Buf === 0)) {
          _DAT_0063aed8 = (None + 1);
          return -1;
        }
        w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x408));
      }
      else {
        w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x500));
      }
    }
    else {
      w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 4));
      _Buf = DAT_00000014;
      _Size = 2;
    }
    w32(DAT_00000018, 0, _Size);
    w32(DAT_00000008, 0, _Buf);
    w32(DAT_00000000, 0, s32(DAT_00000008, 0));
    w32(DAT_00000004, 0, 0);
  }
  else {
    local_c = -1;
  }
  return local_c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _$E2 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function $E2 ()

 {
  $E1();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _$E1 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function $E1 ()

 {
  _atexit(FUN_00601040);
  DAT_006e55ac = FUN_006e7b7c(__CxxUnhandledExceptionFilter);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* long */  /* __stdcall */  /* __CxxUnhandledExceptionFilter(struct */  /* _EXCEPTION_POINTERS */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CxxUnhandledExceptionFilter (param_1)

 {
  let lVar1;
  let iVar2;

  if ((s32(DAT_00000014, 0) === 0x19930520)) {
    terminate();
    lVar1 = 1;
  }
  else {
    if ((iVar2 !== 0)) {
      iVar2 = DAT_006e55ac(param_1);
      return iVar2;
    }
    lVar1 = 0;
  }
  return lVar1;
}


 export function FUN_00601040 ()

 {
  FUN_006e7b7c(DAT_006e55ac);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* int */  /* __cdecl */  /* _ValidateRead(void */  /* const */  /* *,unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _ValidateRead (param_1, param_2)

 {
  let BVar1;
  let local_8;

  BVar1 = FUN_006e7c18(param_1, param_2);
  local_8 = u8((BVar1 === 0));
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* int */  /* __cdecl */  /* _ValidateRead(void */  /* const */  /* *,unsigned */
 /* int) */     /* int */  /* __cdecl */  /* _ValidateWrite(void */  /* *,unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _ValidateWrite (param_1, param_2)

 {
  let BVar1;
  let local_8;

  BVar1 = FUN_006e7bf0(param_1, param_2);
  local_8 = u8((BVar1 === 0));
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* int */  /* __cdecl */  /* _ValidateExecute(int */
 /* (__stdcall*)(void)) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _ValidateExecute (param_1)

 {
  let BVar1;
  let local_8;

  BVar1 = FUN_006e7b78(param_1);
  local_8 = u8((BVar1 === 0));
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __snprintf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __snprintf (_Dest, _Count, _Format)

 {
  let pcVar1;
  let iVar2;
  let local_24;

  if ((_Dest === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d834, 0x5d, 0, 0x61d840);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  if ((_Format === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d834, 0x5e, 0, 0x61d824);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  local_24 = 0x42;
  local_24 = _Dest;
  local_24 = _Dest;
  local_24 = _Count;
  iVar2 = __output(DAT_ffffffdc, _Format, DAT_00000010);
  local_24 = (_Count - 1);
  if (((_Count - 1) < 0)) {
    __flsbuf(0, DAT_ffffffdc);
  }
  else {
    _MEM[_Dest] = 0;
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __vsnprintf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __vsnprintf (_Dest, _Count, _Format, _Args)

 {
  let pcVar1;
  let iVar2;
  let local_24;

  if ((_Dest === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61eb6c, 0x5a, 0, 0x61d840);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  if ((_Format === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61eb6c, 0x5b, 0, 0x61d824);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  local_24 = 0x42;
  local_24 = _Dest;
  local_24 = _Dest;
  local_24 = _Count;
  iVar2 = __output(DAT_ffffffdc, _Format, _Args);
  local_24 = (_Count - 1);
  if (((_Count - 1) < 0)) {
    __flsbuf(0, DAT_ffffffdc);
  }
  else {
    _MEM[_Dest] = 0;
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtGetStringTypeW */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtGetStringTypeW (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let BVar1;
  let cbMultiByte;
  let lpMultiByteStr;
  let iVar2;
  let local_10;
  let local_8;

  if ((DAT_0063b26c === 0)) {
    BVar1 = FUN_006e7b70(1, 0x61e6ac, 1, DAT_fffffff8);
    if ((BVar1 === 0)) {
      BVar1 = FUN_006e7b74(0, 1, 0x61e6a8, 1, DAT_fffffff8);
      if ((BVar1 === 0)) {
        return;
      }
      DAT_0063b26c = 2;
    }
    else {
      DAT_0063b26c = 1;
    }
  }
  if ((DAT_0063b26c === 1)) {
    FUN_006e7b70(param_1, param_2, param_3, param_4);
  }
  else if ((DAT_0063b26c === 2)) {
    local_10 = 0;
    if ((param_5 === 0)) {
      param_5 = DAT_0063a088;
    }
    cbMultiByte = FUN_006e7ba0(param_5, 0x220, param_2, param_3, 0, 0, 0, 0);
    if ((lpMultiByteStr !== 0)) {
      iVar2 = FUN_006e7ba0(param_5, 0x220, param_2, param_3, lpMultiByteStr, cbMultiByte, 0, 0);
      if ((local_10 !== 0)) {
        if ((param_6 === 0)) {
          param_6 = DAT_0063a078;
        }
        w16(local_10, param_3, 0xffff);
        w16(local_10, (param_3 + -1), s16(local_10, param_3));
        FUN_006e7b74(param_6, param_1, lpMultiByteStr, cbMultiByte, local_10);
        if ((s16(local_10, param_3) === 0xffff)) {
          FID_conflict:_memcpy(param_4, local_10, param_3 * 2);
        }
      }
      __free_dbg(lpMultiByteStr, 2);
      __free_dbg(local_10, 2);
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtGetStringTypeA */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtGetStringTypeA (in_EAX, _Plocinfo, _DWInfoType, _LpSrcStr, _CchSrc, _LpCharType, _Code_page, _BError)

 {
  // in_EAX promoted to parameter;
  let iVar1;
  let local_14;
  let local_c;
  let local_8;

  local_c = in_EAX;
  if ((DAT_0063b270 === 0)) {
    local_c = FUN_006e7b74(0, 1, 0x61e6a8, 1, DAT_fffffff8);
    if ((local_c === 0)) {
      local_c = FUN_006e7b70(1, 0x61e6ac, 1, DAT_fffffff8);
      if ((local_c === 0)) {
        return 0;
      }
      DAT_0063b270 = 1;
    }
    else {
      DAT_0063b270 = 2;
    }
  }
  if ((DAT_0063b270 === 2)) {
    if ((_Code_page === 0)) {
      _Code_page = DAT_0063a078;
    }
    local_c = FUN_006e7b74(_Code_page, _Plocinfo, _DWInfoType, _LpSrcStr, _CchSrc);
  }
  else if ((DAT_0063b270 === 1)) {
    local_c = 0;
    local_14 = 0;
    if ((_LpCharType === 0)) {
      _LpCharType = DAT_0063a088;
    }
    iVar1 = FUN_006e7c58(_LpCharType, 9, _DWInfoType, _LpSrcStr, 0, 0);
    if ((iVar1 !== 0)) {
      local_c = FUN_006e7b70(_Plocinfo, local_14, iVar1, _CchSrc);
    }
    __free_dbg(local_14, 2);
  }
  return local_c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __open */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __open (_Filename, _OpenFlag)

 {
  let iVar1;
  let in_stack_0000000c;

  iVar1 = __sopen(_Filename, _OpenFlag, 0x40, in_stack_0000000c);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __sopen */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __sopen (_Filename, _OpenFlag, _ShareFlag)

 {
  let uVar1;
  let DVar2;
  let lVar3;
  let iVar4;
  let bVar5;
  let in_stack_00000010;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_28 = 0xc;
  local_28 = 0;
  bVar5 = ((_OpenFlag & 0x80) === 0);
  if (bVar5) {
    local_3c = 0;
  }
  else {
    local_3c = 0x10;
  }
  local_28 = u8(bVar5);
  if (((_OpenFlag & 0x8000) === 0)) {
    if (((_OpenFlag & 0x4000) === 0)) {
      if ((DAT_0063b3dc !== 0x8000)) {
        local_3c = (local_3c | 0x80);
      }
    }
    else {
      local_3c = (local_3c | 0x80);
    }
  }
  uVar1 = (_OpenFlag & 3);
  if ((uVar1 === 0)) {
    local_38 = -0x80000000;
  }
  else if ((uVar1 === 1)) {
    local_38 = 0x40000000;
  }
  else {
    if ((uVar1 !== 2)) {
      DAT_00639f14 = 0x16;
      DAT_00639f18 = 0;
      return -1;
    }
    local_38 = -0x40000000;
  }
  /* switch */ () {
  case 0x10 :
    local_c = 0;
    break;
  default :
    DAT_00639f14 = 0x16;
    DAT_00639f18 = 0;
    return -1;
  case 0x20 :
    local_c = 1;
    break;
  case 0x30 :
    local_c = 2;
    break;
  case 0x40 :
    local_c = 3;
  }
  uVar1 = (_OpenFlag & 0x700);
  if ((uVar1 < 0x101)) {
    if ((uVar1 === 0x100)) {
      local_1c = 4;
      goto LAB_006019fc;
    }
    if ((uVar1 !== 0)) {
      DAT_00639f14 = 0x16;
      DAT_00639f18 = 0;
      return -1;
    }
 LAB_00601912: :
    local_1c = 3;
    goto LAB_006019fc;
  }
  if ((uVar1 < 0x301)) {
    if ((uVar1 === 0x300)) {
      local_1c = 2;
      goto LAB_006019fc;
    }
    if ((uVar1 !== 0x200)) {
      DAT_00639f14 = 0x16;
      DAT_00639f18 = 0;
      return -1;
    }
 LAB_00601936: :
    local_1c = 5;
  }
  else {
    if ((uVar1 < 0x501)) {
      if ((uVar1 !== 0x500)) {
        if ((uVar1 !== 0x400)) {
          DAT_00639f14 = 0x16;
          DAT_00639f18 = 0;
          return -1;
        }
        goto LAB_00601912;
      }
    }
    else {
      if ((uVar1 === 0x600)) {
        DAT_00639f14 = 0x16;
        DAT_00639f18 = 0;
        return -1;
      }
    }
    local_1c = 1;
  }
 LAB_006019fc: :
  local_2c = 0x80;
  if (((_OpenFlag & 0x100) !== 0)) {
    local_14 = in_stack_00000010;
    local_30 = 0;
    if (((((~DAT_00639f1c) & in_stack_00000010) & 0x80) === 0)) {
      local_2c = 1;
    }
  }
  if (((_OpenFlag & 0x40) !== 0)) {
    local_2c = (local_2c | 0x4000000);
    local_38 = (local_38 | 0x10000);
  }
  if (((_OpenFlag & 0x1000) !== 0)) {
    local_2c = (local_2c | 0x100);
  }
  if (((_OpenFlag & 0x20) === 0)) {
    if (((_OpenFlag & 0x10) !== 0)) {
      local_2c = (local_2c | 0x10000000);
    }
  }
  else {
    local_2c = (local_2c | 0x8000000);
  }
  local_18 = __alloc_osfhnd();
  if ((local_18 === -1)) {
    DAT_00639f14 = 0x18;
    DAT_00639f18 = 0;
    local_18 = -1;
  }
  else {
    local_8 = FUN_006e7bcc(_Filename, local_38, local_c, DAT_ffffffd8, local_1c, local_2c, 0);
    if ((local_8 === -1)) {
      DVar2 = FUN_006e7b00();
      __dosmaperr(DVar2);
      local_18 = -1;
    }
    else {
      local_10 = FUN_006e7b54(local_8);
      if ((local_10 === 0)) {
        FUN_006e7c38(local_8);
        DVar2 = FUN_006e7b00();
        __dosmaperr(DVar2);
        local_18 = -1;
      }
      else {
        if ((local_10 === 2)) {
          local_3c = (local_3c | 0x40);
        }
        else if ((local_10 === 3)) {
          local_3c = (local_3c | 8);
        }
        __set_osfhnd(local_18, local_8);
        _MEM[((s32((DAT_006e69f0 + ((local_18 & -32) >> 3)), 0) + 4) + (local_18 & 0x1f) * 8)] = (local_3c | 1);
        if (((_OpenFlag & 2) !== 0)) {
          lVar3 = __lseek(local_18, -1, 2);
          if ((lVar3 === -1)) {
            if ((DAT_00639f18 !== 0x83)) {
              __close(local_18);
              return -1;
            }
          }
          else {
            local_34 = 0;
            iVar4 = __read(local_18, DAT_ffffffcc, 1);
            if ((iVar4 === -1)) {
              __close(local_18);
              return -1;
            }
            lVar3 = __lseek(local_18, 0, 0);
            if ((lVar3 === -1)) {
              __close(local_18);
              return -1;
            }
          }
        }
        if (((_OpenFlag & 8) !== 0)) {
          _MEM[((s32((DAT_006e69f0 + ((local_18 & -32) >> 3)), 0) + 4) + (local_18 & 0x1f) * 8)] = (_MEM[((s32((DAT_006e69f0 + ((local_18 & -32) >> 3)), 0) + 4) + (local_18 & 0x1f) * 8)] | 0x20);
        }
      }
    }
  }
  return local_18;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __alloc_osfhnd */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __alloc_osfhnd ()

 {
  let local_10;
  let local_c;
  let local_8;

  local_c = -1;
  local_10 = 0;
  do {
    if ((0x3f < local_10)) {
      return local_c;
    }
    if ((s32(DAT_006e69f0, local_10) === 0)) {
      local_8 = __malloc_dbg(0x100, 2, 0x61eb84, 0x79);
      if ((local_8 === 0)) {
        return local_c;
      }
      w32(DAT_006e69f0, local_10, local_8);
      DAT_006e6b2c = (DAT_006e6b2c + 0x20);
      (local_8 < (s32(DAT_006e69f0, local_10) + 0x100)) (; local_8 = (local_8 < (s32(DAT_006e69f0, local_10) + 0x100)); local_8 = (local_8 + 2)) {
        _MEM[(local_8 + 1)] = 0;
        w32(local_8, 0, -1);
        _MEM[(local_8 + 5)] = 0xa;
      }
      return (local_10 << 5);
    }
    (local_8 < (s32(DAT_006e69f0, local_10) + 0x100)) (local_8 = s32(DAT_006e69f0, local_10);
        local_8 = (local_8 < (s32(DAT_006e69f0, local_10) + 0x100)); local_8 = (local_8 + 2)) {
      if (((_MEM[(local_8 + 1)] & 1) === 0)) {
        w32(local_8, 0, -1);
        local_c = (((local_8 - s32(DAT_006e69f0, local_10)) >> 3) + local_10 * 0x20);
        break;
      }
    }
    if ((local_c !== -1)) {
      return local_c;
    }
    local_10 = (local_10 + 1);
  } ( true );
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __set_osfhnd */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __set_osfhnd (param_1, param_2)

 {
  let iVar1;

  if ((s32((s32((DAT_006e69f0 + ((param_1 & -32) >> 3)), 0) + (param_1 & 0x1f) * 8), 0) === -1)) {
    if ((DAT_00639fd0 === 1)) {
      if ((param_1 === 0)) {
        FUN_006e7b6c(-10, param_2);
      }
      else if ((param_1 === 1)) {
        FUN_006e7b6c(-11, param_2);
      }
      else if ((param_1 === 2)) {
        FUN_006e7b6c(-12, param_2);
      }
    }
    w32((s32((DAT_006e69f0 + ((param_1 & -32) >> 3)), 0) + (param_1 & 0x1f) * 8), 0, param_2);
    iVar1 = 0;
  }
  else {
    DAT_00639f14 = 9;
    DAT_00639f18 = 0;
    iVar1 = -1;
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __free_osfhnd */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __free_osfhnd (param_1)

 {
  let iVar1;

  if ((s32((s32((DAT_006e69f0 + ((param_1 & -32) >> 3)), 0) + (param_1 & 0x1f) * 8), 0) !== -1)) {
    if ((DAT_00639fd0 === 1)) {
      if ((param_1 === 0)) {
        FUN_006e7b6c(-10, 0);
      }
      else if ((param_1 === 1)) {
        FUN_006e7b6c(-11, 0);
      }
      else if ((param_1 === 2)) {
        FUN_006e7b6c(-12, 0);
      }
    }
    w32((s32((DAT_006e69f0 + ((param_1 & -32) >> 3)), 0) + (param_1 & 0x1f) * 8), 0, -1);
    iVar1 = 0;
  }
  else {
    DAT_00639f14 = 9;
    DAT_00639f18 = 0;
    iVar1 = -1;
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __get_osfhandle */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __get_osfhandle (_FileHandle)

 {
  let iVar1;

  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 1) !== 0)) {
    iVar1 = s32((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + (_FileHandle & 0x1f) * 8), 0);
  }
  else {
    DAT_00639f14 = 9;
    DAT_00639f18 = 0;
    iVar1 = -1;
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __open_osfhandle */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __open_osfhandle (_OSFileHandle, _Flags)

 {
  let DVar1;
  let uVar2;
  let local_10;

  local_10 = 0;
  if (((_Flags & 8) !== 0)) {
    local_10 = 0x20;
  }
  if (((_Flags & 0x4000) !== 0)) {
    local_10 = (local_10 | 0x80);
  }
  DVar1 = FUN_006e7b54(_OSFileHandle);
  if ((DVar1 === 0)) {
    DVar1 = FUN_006e7b00();
    __dosmaperr(DVar1);
    uVar2 = -1;
  }
  else {
    if ((DVar1 === 2)) {
      local_10 = (local_10 | 0x40);
    }
    else if ((DVar1 === 3)) {
      local_10 = (local_10 | 8);
    }
    uVar2 = __alloc_osfhnd();
    if ((uVar2 === -1)) {
      DAT_00639f14 = 0x18;
      DAT_00639f18 = 0;
      uVar2 = -1;
    }
    else {
      __set_osfhnd(uVar2, _OSFileHandle);
      _MEM[((s32((DAT_006e69f0 + ((uVar2 & -32) >> 3)), 0) + 4) + (uVar2 & 0x1f) * 8)] = (local_10 | 1);
    }
  }
  return uVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __commit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __commit (_FileHandle)

 {
  let hFile;
  let BVar1;
  let local_8;

  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 1) !== 0)) {
    hFile = __get_osfhandle(_FileHandle);
    BVar1 = FUN_006e7b68(hFile);
    if ((BVar1 === 0)) {
      local_8 = FUN_006e7b00();
    }
    else {
      local_8 = 0;
    }
    if ((local_8 === 0)) {
      return 0;
    }
    DAT_00639f18 = local_8;
  }
  DAT_00639f14 = 9;
  return -1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __isatty */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __isatty (_FileHandle)

 {
  let uVar1;

  if ((_FileHandle < DAT_006e6b2c)) {
    uVar1 = (s8(_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)]) & 0x40);
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _wctomb */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _wctomb (_MbCh, _WCh)

 {
  let iVar1;
  let in_stack_0000000a;
  let local_c;

  if ((_MbCh === 0)) {
    iVar1 = 0;
  }
  else if ((DAT_0063a078 === 0)) {
    if ((_WCh < 0x100)) {
      _MEM[_MbCh] = ((_WCh) & 0xFF);
      iVar1 = 1;
    }
    else {
      DAT_00639f14 = 0x2a;
      iVar1 = -1;
    }
  }
  else {
    local_c = 0;
    iVar1 = FUN_006e7ba0(DAT_0063a088, 0x220, DAT_00000008, 1, _MbCh, DAT_0063a29c, 0, DAT_fffffff4);
    if ((0 !== 0)) {
      DAT_00639f14 = 0x2a;
      iVar1 = -1;
    }
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __aulldiv */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __aulldiv (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let lVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;

  uVar3 = param_1;
  uVar8 = param_4;
  uVar6 = param_2;
  uVar9 = param_3;
  if ((param_4 === 0)) {
    uVar3 = (param_2 / param_3 | 0);
    iVar4 = ((((param_2 % param_3) << 0x20) | param_1) / param_3 | 0);
  }
  else {
    do {
      uVar5 = (uVar8 >>> 1);
      uVar9 = ((uVar9 >>> 1) | (u8(((uVar8 & 1) !== 0)) << 0x1f));
      uVar7 = (uVar6 >>> 1);
      uVar3 = ((uVar3 >>> 1) | (u8(((uVar6 & 1) !== 0)) << 0x1f));
      uVar8 = uVar5;
      uVar6 = uVar7;
    } while ((uVar5 !== 0)) {
      iVar4 = (iVar4 + -1);
    }
    uVar3 = 0;
  }
  return ((uVar3 << 32) | iVar4);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __aullrem */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __aullrem (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let lVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let bVar11;

  uVar3 = param_1;
  uVar4 = param_4;
  uVar9 = param_2;
  uVar10 = param_3;
  if ((param_4 === 0)) {
    iVar6 = ((((param_2 % param_3) << 0x20) | param_1) % param_3);
    iVar7 = 0;
  }
  else {
    do {
      uVar5 = (uVar4 >>> 1);
      uVar10 = ((uVar10 >>> 1) | (u8(((uVar4 & 1) !== 0)) << 0x1f));
      uVar8 = (uVar9 >>> 1);
      uVar3 = ((uVar3 >>> 1) | (u8(((uVar9 & 1) !== 0)) << 0x1f));
      uVar4 = uVar5;
      uVar9 = uVar8;
    } while ((uVar5 !== 0)) {
      bVar11 = (uVar4 < param_3);
      uVar4 = (uVar4 - param_3);
      uVar10 = ((uVar10 - param_4) - u8(bVar11));
    }
    iVar6 = (-(uVar4 - param_1));
    iVar7 = ((-u8(((uVar4 - param_1) !== 0))) - ((uVar10 - param_2) - u8((uVar4 < param_1))));
  }
  return ((iVar7 << 32) | iVar6);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __fcloseall */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __fcloseall ()

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  (local_c < DAT_006e69e0) (local_c = 3; local_c = (local_c < DAT_006e69e0); local_c = (local_c + 1)) {
    if ((s32((DAT_006e5694 + local_c * 4), 0) !== 0)) {
      if (((_MEM[(s32((DAT_006e5694 + local_c * 4), 0) + 0xc)] & 0x83) !== 0)) {
        iVar1 = _fclose(s32((DAT_006e5694 + local_c * 4), 0));
        if ((iVar1 !== -1)) {
          local_8 = (local_8 + 1);
        }
      }
      if ((0x13 < local_c)) {
        __free_dbg(s32((DAT_006e5694 + local_c * 4), 0), 2);
        w32((DAT_006e5694 + local_c * 4), 0, 0);
      }
    }
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __statusfp */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __statusfp ()

 {
  let uVar1;

  uVar1 = __abstract_sw();
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __clearfp */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __clearfp ()

 {
  let uVar1;

  uVar1 = __abstract_sw();
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __control87 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __control87 (_NewValue, _Mask)

 {
  let uVar1;

  uVar1 = __abstract_cw();
  uVar1 = (((~_Mask) & uVar1) | (_NewValue & _Mask));
  __hw_cw(uVar1);
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __controlfp */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __controlfp (_NewValue, _Mask)

 {
  let uVar1;

  uVar1 = __control87(_NewValue, (_Mask & -0x80001));
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __fpreset */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __fpreset ()

 {
  let iVar1;

  iVar1 = DAT_0063af90;
  __setdefaultprecision();
  if (((s32(s32((iVar1 + 4), 0), 0) & 0x10008) !== 0)) {
    iVar1 = s32((iVar1 + 4), 0);
    w32((iVar1 + 0x20), 0, 0);
    w32((iVar1 + 0x24), 0, 0xffff);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __abstract_cw */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __abstract_cw (param_1)

 {
  let uVar1;
  let local_8;

  local_8 = 0;
  if (((param_1 & 1) !== 0)) {
    local_8 = 0x10;
  }
  if (((param_1 & 4) !== 0)) {
    local_8 = (local_8 | 8);
  }
  if (((param_1 & 8) !== 0)) {
    local_8 = (local_8 | 4);
  }
  if (((param_1 & 0x10) !== 0)) {
    local_8 = (local_8 | 2);
  }
  if (((param_1 & 0x20) !== 0)) {
    local_8 = (local_8 | 1);
  }
  if (((param_1 & 2) !== 0)) {
    local_8 = (local_8 | 0x80000);
  }
  uVar1 = (param_1 & 0xc00);
  if ((uVar1 < 0x401)) {
    if ((uVar1 === 0x400)) {
      local_8 = (local_8 | 0x100);
    }
  }
  else if ((uVar1 === 0x800)) {
    local_8 = (local_8 | 0x200);
  }
  else if ((uVar1 === 0xc00)) {
    local_8 = (local_8 | 0x300);
  }
  if (((param_1 & 0x300) === 0)) {
    local_8 = (local_8 | 0x20000);
  }
  else if (((param_1 & 0x300) === 0x200)) {
    local_8 = (local_8 | 0x10000);
  }
  if (((param_1 & 0x1000) !== 0)) {
    local_8 = (local_8 | 0x40000);
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __hw_cw */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __hw_cw (param_1)

 {
  let uVar1;
  let uVar2;

  uVar1 = u8(((param_1 & 0x10) !== 0));
  if (((param_1 & 8) !== 0)) {
    uVar1 = (uVar1 | 4);
  }
  if (((param_1 & 4) !== 0)) {
    uVar1 = (uVar1 | 8);
  }
  if (((param_1 & 2) !== 0)) {
    uVar1 = (uVar1 | 0x10);
  }
  if (((param_1 & 1) !== 0)) {
    uVar1 = (uVar1 | 0x20);
  }
  if (((param_1 & 0x80000) !== 0)) {
    uVar1 = (uVar1 | 2);
  }
  uVar2 = (param_1 & 0x300);
  if ((uVar2 < 0x101)) {
    if ((uVar2 === 0x100)) {
      uVar1 = (uVar1 | 0x400);
    }
  }
  else if ((uVar2 === 0x200)) {
    uVar1 = (uVar1 | 0x800);
  }
  else if ((uVar2 === 0x300)) {
    uVar1 = (uVar1 | 0xc00);
  }
  uVar2 = (param_1 & 0x30000);
  if ((uVar2 === 0)) {
    uVar2 = (((uVar1) & 0xFFFF) | 0x300);
    uVar1 = ((uVar2) & 0xFFFF);
  }
  else if ((uVar2 === 0x10000)) {
    uVar2 = (((uVar1) & 0xFFFF) | 0x200);
    uVar1 = ((uVar2) & 0xFFFF);
  }
  if (((param_1 & 0x40000) !== 0)) {
    uVar2 = (((uVar1) & 0xFFFF) | 0x1000);
    uVar1 = ((uVar2) & 0xFFFF);
  }
  return (((((uVar2 >>> 0x10)) & 0xFFFF) << 16) | uVar1);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __abstract_sw */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __abstract_sw (param_1)

 {
  let local_8;

  local_8 = 0;
  if (((param_1 & 1) !== 0)) {
    local_8 = 0x10;
  }
  if (((param_1 & 4) !== 0)) {
    local_8 = (local_8 | 8);
  }
  if (((param_1 & 8) !== 0)) {
    local_8 = (local_8 | 4);
  }
  if (((param_1 & 0x10) !== 0)) {
    local_8 = (local_8 | 2);
  }
  if (((param_1 & 0x20) !== 0)) {
    local_8 = (local_8 | 1);
  }
  if (((param_1 & 2) !== 0)) {
    local_8 = (local_8 | 0x80000);
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __fptrap */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __fptrap ()

 {
  __amsg_exit(2);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ZeroTail */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ZeroTail (param_1, param_2)

 {
  let uVar1;
  let bVar2;
  let local_10;
  let local_8;

  local_10 = ((param_2 + ((param_2 >> 0x1f) & 0x1f)) >> 5);
  bVar2 = (((param_2 >> 0x1f)) & 0xFF);
  local_8 = (0x1f - (((((((param_2) & 0xFF) ^ bVar2) - bVar2) & 0x1f) ^ bVar2) - bVar2));
  uVar1 = ((~(-1 << (local_8 & 0x1f))) & s32((param_1 + local_10 * 4), 0));
  while ((2 < local_10)) {
    if ((uVar1 !== 0)) {
      return 0;
    }
    local_10 = (local_10 + 1);
    if ((2 < local_10))


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __IncMan */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __IncMan (param_1, param_2)

 {
  let bVar1;
  let local_14;
  let local_10;
  let local_8;

  local_10 = ((param_2 + ((param_2 >> 0x1f) & 0x1f)) >> 5);
  bVar1 = (((param_2 >> 0x1f)) & 0xFF);
  local_8 = (0x1f - (((((((param_2) & 0xFF) ^ bVar1) - bVar1) & 0x1f) ^ bVar1) - bVar1));
  local_14 = ___addl(s32((param_1 + local_10 * 4), 0), (1 << (local_8 & 0x1f)), (local_10 * 4 + param_1));
  while ((local_14 !== 0)) {
    local_14 = ___addl(s32((param_1 + local_10 * 4), 0), 1, (local_10 * 4 + param_1));
  }
  return local_14;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __RoundMan */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __RoundMan (param_1, param_2)

 {
  let puVar1;
  let bVar2;
  let iVar3;
  let local_1c;
  let local_14;
  let local_c;

  local_1c = 0;
  local_14 = ((param_2 + ((param_2 >> 0x1f) & 0x1f)) >> 5);
  bVar2 = (((param_2 >> 0x1f)) & 0xFF);
  local_c = (0x1f - (((((((param_2) & 0xFF) ^ bVar2) - bVar2) & 0x1f) ^ bVar2) - bVar2));
  if ((((1 << (local_c & 0x1f)) & s32((param_1 + local_14 * 4), 0)) !== 0)) {
    iVar3 = __ZeroTail(param_1, (param_2 + 1));
    if ((iVar3 === 0)) {
      local_1c = __IncMan(param_1, (param_2 + -1));
    }
  }
  puVar1 = (param_1 + local_14 * 4);
  w32(puVar1, 0, (s32(puVar1, 0) & (-1 << (local_c & 0x1f))));
  while ((local_14 < 3)) {
    w32((param_1 + local_14 * 4), 0, 0);
  }
  return local_1c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CopyMan */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CopyMan (param_1, param_2)

 {
  let local_10;
  let local_c;
  let local_8;

  local_8 = param_2;
  local_c = param_1;
  (local_10 < 3) (local_10 = 0; local_10 = (local_10 < 3); local_10 = (local_10 + 1)) {
    w32(local_c, 0, s32(local_8, 0));
    local_8 = (local_8 + 1);
    local_c = (local_c + 1);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __FillZeroMan */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __FillZeroMan (param_1)

 {
  let local_8;

  (local_8 < 3) (local_8 = 0; local_8 = (local_8 < 3); local_8 = (local_8 + 1)) {
    w32((param_1 + local_8 * 4), 0, 0);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __IsZeroMan */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __IsZeroMan (param_1)

 {
  let local_8;

  local_8 = 0;
  while ((s32((param_1 + local_8 * 4), 0) !== 0)) {
    if ((2 < local_8)) {
      return 1;
    }
    if ((s32((param_1 + local_8 * 4), 0) !== 0))


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ShrMan */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ShrMan (param_1, param_2)

 {
  let puVar1;
  let uVar2;
  let iVar3;
  let local_10;
  let local_c;
  let local_8;

  iVar3 = ((param_2 + ((param_2 >> 0x1f) & 0x1f)) >> 5);
  local_8 = (((param_2 >> 0x1f)) & 0xFF);
  local_8 = (((((((param_2) & 0xFF) ^ local_8) - local_8) & 0x1f) ^ local_8) - local_8);
  local_c = 0;
  (local_10 < 3) (local_10 = 0; local_10 = (local_10 < 3); local_10 = (local_10 + 1)) {
    uVar2 = s32((param_1 + local_10 * 4), 0);
    puVar1 = (param_1 + local_10 * 4);
    w32(puVar1, 0, (s32(puVar1, 0) >>> (local_8 & 0x1f)));
    puVar1 = (param_1 + local_10 * 4);
    w32(puVar1, 0, (s32(puVar1, 0) | local_c));
    local_c = ((uVar2 & (~(-1 << (local_8 & 0x1f)))) << ((0x20 - local_8) & 0x1f));
  }
  (-1 < local_10) (local_10 = 2; -1 = (-1 < local_10); local_10 = (local_10 + -1)) {
    if ((local_10 < iVar3)) {
      w32((param_1 + local_10 * 4), 0, 0);
    }
    else {
      w32((param_1 + local_10 * 4), 0, s32((param_1 + (local_10 - iVar3) * 4), 0));
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ld12cvt */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ld12cvt (param_1, param_2, param_3)

 {
  let iVar1;
  let local_34;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = ((((s16(param_1, 5)) & 0xFFFF) & 0x7fff) - 0x3fff);
  local_24 = (((s16(param_1, 5)) & 0xFFFF) & 0x8000);
  local_1c = s32((param_1 + 3), 0);
  local_18 = s32((param_1 + 1), 0);
  local_14 = (((s16(param_1, 0)) & 0xFFFF) << 0x10);
  if ((local_8 === -0x3fff)) {
    local_c = 0;
    iVar1 = __IsZeroMan(DAT_ffffffe4);
    if ((iVar1 === 0)) {
      __FillZeroMan(DAT_ffffffe4);
      local_20 = 2;
    }
    else {
      local_20 = 0;
    }
  }
  else {
    __CopyMan(DAT_ffffffcc, DAT_ffffffe4);
    iVar1 = __RoundMan(DAT_ffffffe4, s32(param_3, 2));
    if ((iVar1 !== 0)) {
      local_8 = (local_8 + 1);
    }
    if ((local_8 < (s32(param_3, 1) - s32(param_3, 2)))) {
      __FillZeroMan(DAT_ffffffe4);
      local_c = 0;
      local_20 = 2;
    }
    else if ((s32(param_3, 1) < local_8)) {
      if ((local_8 < s32(param_3, 0))) {
        local_c = (s32(param_3, 5) + local_8);
        local_1c = (local_1c & 0x7fffffff);
        __ShrMan(DAT_ffffffe4, s32(param_3, 3));
        local_20 = 0;
      }
      else {
        __FillZeroMan(DAT_ffffffe4);
        local_1c = (local_1c | -0x80000000);
        __ShrMan(DAT_ffffffe4, s32(param_3, 3));
        local_c = (s32(param_3, 5) + s32(param_3, 0));
        local_20 = 1;
      }
    }
    else {
      iVar1 = (s32(param_3, 1) - local_8);
      __CopyMan(DAT_ffffffe4, DAT_ffffffcc);
      __ShrMan(DAT_ffffffe4, iVar1);
      __RoundMan(DAT_ffffffe4, s32(param_3, 2));
      __ShrMan(DAT_ffffffe4, (s32(param_3, 3) + 1));
      local_c = 0;
      local_20 = 2;
    }
  }
  local_10 = (0x20 - (((s32(param_3, 3)) & 0xFF) + 1));
  local_1c = ((((u8((local_24 === 0)) - 1) & -0x80000000) | (local_c << (local_10 & 0x1f))) | local_1c);
  if ((s32(param_3, 4) === 0x40)) {
    w32(param_2, 1, local_1c);
    w32(param_2, 0, local_18);
  }
  else if ((s32(param_3, 4) === 0x20)) {
    w32(param_2, 0, local_1c);
  }
  return local_20;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __ld12tod */
 /* __ld12tof */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__ld12tod (_Ifp, _D)

 {
  let IVar1;

  IVar1 = __ld12cvt(_Ifp, _D, DAT_0063b280);
  return IVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __ld12tod */
 /* __ld12tof */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__ld12tod (_Ifp, _D)

 {
  let IVar1;

  IVar1 = __ld12cvt(_Ifp, _D, DAT_0063b298);
  return IVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ld12told */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ld12told (_Ifp, _Ld)

 {
  let uVar1;
  let iVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = ((((((local_8) >> 16) & 0xFFFF) << 16) | s16((DAT_00000000 + 0xa), 0)) & -0x8001);
  uVar1 = s16((DAT_00000000 + 0xa), 0);
  local_14 = s32((DAT_00000000 + 6), 0);
  local_10 = s32((DAT_00000000 + 2), 0);
  local_c = (((s16(DAT_00000000, 0)) & 0xFFFF) << 0x10);
  iVar2 = __RoundMan(DAT_ffffffec, 0x40);
  if ((iVar2 !== 0)) {
    local_14 = -0x80000000;
    local_8 = (((((local_8) & 0xFFFF) + 1)) & 0xFFFF);
  }
  local_18 = u8(((local_8 & 0xffff) === 0x7fff));
  w32((DAT_00000000 + 4), 0, local_14);
  w32(DAT_00000000, 0, local_10);
  w16((DAT_00000000 + 8), 0, ((uVar1 & 0x8000) | ((local_8) & 0xFFFF)));
  return local_18;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __atodbl */
 /* __atoflt */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__atodbl (_Result, _Str)

 {
  let IVar1;
  let local_14;
  let local_10;

  ___strgtold12(DAT_fffffff0, DAT_ffffffec, _Str, 0, 0, 0, 0);
  IVar1 = FID_conflict:__ld12tod(DAT_fffffff0, _Result);
  return IVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __atoldbl */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __atoldbl (_Result, _Str)

 {
  let IVar1;
  let local_14;
  let local_10;

  ___strgtold12(DAT_fffffff0, DAT_ffffffec, _Str, 1, 0, 0, 0);
  IVar1 = __ld12told(DAT_fffffff0, _Result);
  return IVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __atodbl */
 /* __atoflt */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__atodbl (_Result, _Str)

 {
  let IVar1;
  let local_14;
  let local_10;

  ___strgtold12(DAT_fffffff0, DAT_ffffffec, _Str, 0, 0, 0, 0);
  IVar1 = FID_conflict:__ld12tod(DAT_fffffff0, _Result);
  return IVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __fptostr */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __fptostr (_Buf, _SizeInBytes, _Digits, _PtFlt)

 {
  let pcVar1;
  let local_c;
  let local_8;

  local_c = s32((_Digits + 0xc), 0);
  _MEM[_Buf] = 0x30;
  pcVar1 = _Buf;
  (0 < _SizeInBytes) (; local_8 = (pcVar1 + 1), 0 = (0 < _SizeInBytes); _SizeInBytes = (_SizeInBytes - 1)) {
    if ((_MEM[local_c] === 0)) {
      pcVar1[1] = 0x30;
    }
    else {
      pcVar1[1] = _MEM[local_c];
      local_c = (local_c + 1);
    }
    pcVar1 = local_8;
  }
  pcVar1[1] = 0;
  if ((0x34 < _MEM[local_c])) {
    (_MEM[local_8] === 0x39) (; local_8 = _MEM[local_8]; local_8 = (local_8 + -1)) {
      _MEM[local_8] = 0x30;
    }
    _MEM[local_8] = (_MEM[local_8] + 1);
  }
  if ((_MEM[_Buf] === 0x31)) {
    w32((_Digits + 4), 0, (s32((_Digits + 4), 0) + 1));
  }
  else {
    _Digits = FUN_005f22d0(_Buf, (_Buf + 1));
  }
  return _Digits;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */
 /* address  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __fltout */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __fltout ()

 {
  let local_10;
  let local_c;
  let local_8;

  ___dtold(DAT_fffffff0, DAT_00000004);
  _DAT_006e55d8 = $I10_OUTPUT(local_10, local_c, local_8, 0x11, 0, DAT_006e55b0);
  _DAT_006e55d0 = s8(DAT_006e55b2);
  _DAT_006e55d4 = ((DAT_006e55b0) << 16 >> 16);
  _DAT_006e55dc = 0x6e55b4;
  return DAT_006e55d0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___dtold */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___dtold (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  let local_18;
  let local_10;

  local_10 = -0x80000000;
  uVar4 = ((((s16((param_2 + 6), 0)) & 0xFFFF) & 0x7ff0) >>> 4);
  uVar1 = s16((param_2 + 6), 0);
  uVar2 = s32(param_2, 0);
  local_18 = ((uVar4) & 0xFFFF);
  if ((uVar4 === 0)) {
    if ((uVar2 === 0)) {
      w32(param_1, 1, 0);
      w32(param_1, 0, 0);
      w16((param_1 + 2), 0, 0);
      return;
    }
    uVar3 = 0x3c01;
    local_10 = 0;
  }
  else if ((uVar4 === 0x7ff)) {
    uVar3 = 0x7fff;
  }
  else {
    uVar3 = (local_18 + 0x3c00);
  }
  w32(param_1, 1, (((uVar2 >>> 0x15) | ((s32(param_2, 1) & 0xfffff) << 0xb)) | local_10));
  w32(param_1, 0, (uVar2 << 0xb));
  while (((_MEM[(param_1 + 7)] & 0x80) === 0)) {
    w32(param_1, 1, ((s32(param_1, 0) >>> 0x1f) | s32(param_1, 1) * 2));
    w32(param_1, 0, (s32(param_1, 0) << 1));
    uVar3 = (uVar3 - 1);
  }
  w16((param_1 + 2), 0, (uVar3 | (uVar1 & 0x8000)));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _wcslen */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _wcslen (_Str)

 {
  let pwVar1;
  let wVar2;
  let local_8;

  local_8 = _Str;
  do {
    pwVar1 = (local_8 + 1);
    wVar2 = s16(local_8, 0);
    local_8 = pwVar1;
  } while ((wVar2 !== 0))


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___tzset */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___tzset ()

 {
  if ((DAT_0063b36c === 0)) {
    __tzset();
    DAT_0063b36c = (DAT_0063b36c + 1);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __tzset */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __tzset ()

 {
  let cVar1;
  let _Str1;
  let DVar2;
  let iVar3;
  let sVar4;
  let lVar5;
  let uVar6;
  let pcVar7;
  let uVar8;
  let local_c;

  DAT_006e55e0 = 0;
  DAT_0063b360 = -1;
  DAT_0063b350 = -1;
  _Str1 = _getenv(0x61ebd8);
  if ((_Str1 === 0)) {
    DVar2 = FUN_006e7be0(DAT_006e55e8);
    if ((DVar2 !== 0)) {
      DAT_006e55e0 = 1;
      DAT_0063b2b0 = DAT_006e55e8 * 0x3c;
      if ((DAT_006e562e !== 0)) {
        DAT_0063b2b0 = (DAT_006e55e8 * 0x3c + DAT_006e563c * 0x3c);
      }
      if ((DAT_006e5690 === 0)) {
        DAT_0063b2b4 = 0;
        DAT_0063b2b8 = 0;
      }
      else {
        DAT_0063b2b4 = 1;
        DAT_0063b2b8 = (DAT_006e5690 - DAT_006e563c) * 0x3c;
      }
      _wcstombs(PTR_DAT_0063b340, DAT_006e55ec, 0x40);
      _wcstombs(PTR_DAT_0063b344, DAT_006e5640, 0x40);
      PTR_DAT_0063b344[0x3f] = 0;
      PTR_DAT_0063b340[0x3f] = PTR_DAT_0063b344[0x3f];
    }
  }
  else if ((iVar3 !== 0)) {
    __free_dbg(DAT_0063b348, 2);
    uVar8 = 0xec;
    pcVar7 = 0x61ebd0;
    uVar6 = 2;
    sVar4 = _strlen(_Str1);
    DAT_0063b348 = __malloc_dbg((sVar4 + 1), uVar6, pcVar7, uVar8);
    if ((__malloc_dbg((sVar4 + 1), uVar6, pcVar7, uVar8) !== 0)) {
      FUN_005f22d0(__malloc_dbg((sVar4 + 1), uVar6, pcVar7, uVar8), _Str1);
      _strncpy(PTR_DAT_0063b340, _Str1, 3);
      PTR_DAT_0063b340[3] = 0;
      local_c = (_Str1 + 3);
      cVar1 = _Str1[3];
      if ((cVar1 === 0x2d)) {
        local_c = (_Str1 + 4);
      }
      lVar5 = _atol(local_c);
      DAT_0063b2b0 = lVar5 * 0xe10;
      (_MEM[local_c] < 0x3a) (; (local_c = _MEM[local_c] || (('/' = (0x2f < _MEM[local_c]) && (local_c = _MEM[local_c])))); local_c = (local_c + 1)) {
      }
      if ((_MEM[local_c] === 0x3a)) {
        local_c = (local_c + 1);
        lVar5 = _atol(local_c);
        DAT_0063b2b0 = (lVar5 * 0xe10 + lVar5 * 0x3c);
        (_MEM[local_c] < 0x3a) (; ('/' = (0x2f < _MEM[local_c]) && (local_c = _MEM[local_c])); local_c = (local_c + 1)) {
        }
        if ((_MEM[local_c] === 0x3a)) {
          local_c = (local_c + 1);
          lVar5 = _atol(local_c);
          DAT_0063b2b0 = ((lVar5 * 0xe10 + lVar5 * 0x3c) + lVar5);
          (_MEM[local_c] < 0x3a) (; ('/' = (0x2f < _MEM[local_c]) && (local_c = _MEM[local_c])); local_c = (local_c + 1)) {
          }
        }
      }
      if ((cVar1 === 0x2d)) {
        DAT_0063b2b0 = (-DAT_0063b2b0);
      }
      DAT_0063b2b4 = s8(_MEM[local_c]);
      if ((s8(_MEM[local_c]) === 0)) {
        _MEM[PTR_DAT_0063b344] = 0;
      }
      else {
        _strncpy(PTR_DAT_0063b344, local_c, 3);
        PTR_DAT_0063b344[3] = 0;
      }
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __isindst */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __isindst (_Time)

 {
  let iVar1;

  if ((DAT_0063b2b4 === 0)) {
    return 0;
  }
  if ((s32(DAT_00000014, 0) !== DAT_0063b360)) {
    if ((DAT_006e55e0 === 0)) {
      cvtdate(1, 1, s32(DAT_00000014, 0), 4, 1, 0, 0, 2, 0, 0, 0);
      cvtdate(0, 1, s32(DAT_00000014, 0), 0xa, 5, 0, 0, 2, 0, 0, 0);
    }
    else {
      if ((DAT_006e5680 === 0)) {
        cvtdate(1, 1, s32(DAT_00000014, 0), DAT_006e5682, DAT_006e5686, DAT_006e5684, 0, DAT_006e5688, DAT_006e568a, DAT_006e568c, DAT_006e568e);
      }
      else {
        cvtdate(1, 0, s32(DAT_00000014, 0), DAT_006e5682, 0, 0, DAT_006e5686, DAT_006e5688, DAT_006e568a, DAT_006e568c, DAT_006e568e);
      }
      if ((DAT_006e562c === 0)) {
        cvtdate(0, 1, s32(DAT_00000014, 0), DAT_006e562e, DAT_006e5632, DAT_006e5630, 0, DAT_006e5634, DAT_006e5636, DAT_006e5638, DAT_006e563a);
      }
      else {
        cvtdate(0, 0, s32(DAT_00000014, 0), DAT_006e562e, 0, 0, DAT_006e5632, DAT_006e5634, DAT_006e5636, DAT_006e5638, DAT_006e563a);
      }
    }
  }
  if ((DAT_0063b354 < DAT_0063b364)) {
    if ((DAT_0063b364 < s32(DAT_0000001c, 0))) {
      return 0;
    }
    if ((s32(DAT_0000001c, 0) < DAT_0063b364)) {
      return 1;
    }
  }
  else {
    if ((DAT_0063b354 < s32(DAT_0000001c, 0))) {
      return 1;
    }
    if ((s32(DAT_0000001c, 0) < DAT_0063b354)) {
      return 0;
    }
  }
  iVar1 = ((s32(DAT_00000008, 0) * 0xe10 + s32(DAT_00000004, 0) * 0x3c) + s32(DAT_00000000, 0)) * 0x3e8;
  if ((s32(DAT_0000001c, 0) === DAT_0063b354)) {
    if ((iVar1 < DAT_0063b358)) {
      iVar1 = 0;
    }
    else {
      iVar1 = 1;
    }
  }
  else if ((iVar1 < DAT_0063b368)) {
    iVar1 = 1;
  }
  else {
    iVar1 = 0;
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _cvtdate */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function cvtdate (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11)

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_c;

  if ((param_2 === 1)) {
    if (((param_3 & 3) === 0)) {
      local_10 = s32(DAT_0063b36c, param_4);
    }
    else {
      local_10 = s32((DAT_0063b3a4 + param_4 * 4), 0);
    }
    iVar1 = (((((param_3 - 0x46) * 0x16d + ((param_3 - 1) >> 2)) + -13) + (local_10 + 1)) % 7);
    if ((iVar1 < param_6)) {
      local_c = ((param_6 - iVar1) + (param_5 + -1) * 7);
    }
    else {
      local_c = ((param_6 - iVar1) + param_5 * 7);
    }
    local_c = ((local_10 + 1) + local_c);
    if ((param_5 === 5)) {
      if (((param_3 & 3) === 0)) {
        local_14 = s32((DAT_0063b370 + param_4 * 4), 0);
      }
      else {
        local_14 = s32((DAT_0063b3a8 + param_4 * 4), 0);
      }
      if ((local_14 < local_c)) {
        local_c = (local_c + -7);
      }
    }
  }
  else {
    if (((param_3 & 3) === 0)) {
      local_c = s32(DAT_0063b36c, param_4);
    }
    else {
      local_c = s32((DAT_0063b3a4 + param_4 * 4), 0);
    }
    local_c = (local_c + param_7);
  }
  if ((param_1 === 1)) {
    DAT_0063b354 = local_c;
    DAT_0063b358 = (((param_8 * 0x3c + param_9) * 0x3c + param_10) * 0x3e8 + param_11);
    DAT_0063b350 = param_3;
  }
  else {
    DAT_0063b364 = local_c;
    DAT_0063b368 = ((((param_8 * 0x3c + param_9) * 0x3c + param_10) * 0x3e8 + param_11) + DAT_0063b2b8 * 0x3e8);
    if ((((((param_8 * 0x3c + param_9) * 0x3c + param_10) * 0x3e8 + param_11) + DAT_0063b2b8 * 0x3e8) < 0)) {
      DAT_0063b368 = (((((param_8 * 0x3c + param_9) * 0x3c + param_10) * 0x3e8 + param_11) + DAT_0063b2b8 * 0x3e8) + 0x5265bff);
    }
    else if ((0x5265bff < ((((param_8 * 0x3c + param_9) * 0x3c + param_10) * 0x3e8 + param_11) + DAT_0063b2b8 * 0x3e8))) {
      DAT_0063b368 = (((((param_8 * 0x3c + param_9) * 0x3c + param_10) * 0x3e8 + param_11) + DAT_0063b2b8 * 0x3e8) + -0x5265bff);
    }
    DAT_0063b360 = param_3;
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __chsize */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __chsize (_FileHandle, _Size)

 {
  let pcVar1;
  let iVar2;
  let _Offset;
  let lVar3;
  let iVar4;
  let hFile;
  let BVar5;
  let local_1024;
  let local_1020;
  let local_101c;
  let local_1008;
  let uStackY_28;
  let uStackY_24;
  let pcStackY_20;

  FUN_005f35f0();
  local_1020 = 0;
  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 1) !== 0)) {
    if ((_Size < 0)) {
      pcStackY_20 = 0x61ebdc;
      uStackY_24 = 2;
      uStackY_28 = 0x603fb9;
      iVar2 = __CrtDbgReport();
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        iVar2 = pcVar1();
        return iVar2;
      }
    }
    pcStackY_20 = 0x603fd3;
    _Offset = __lseek(_FileHandle, 0, 1);
    if ((_Offset !== -1)) {
      pcStackY_20 = 0x603ff6;
      lVar3 = __lseek(_FileHandle, 0, 2);
      if ((lVar3 !== -1)) {
        local_101c = (_Size - lVar3);
        if ((local_101c < 1)) {
          if ((local_101c < 0)) {
            pcStackY_20 = 0x604155;
            __lseek(_FileHandle, _Size, 0);
            hFile = __get_osfhandle(_FileHandle);
            BVar5 = FUN_006e7b64(hFile);
            if ((BVar5 === 0)) {
              local_1020 = -1;
            }
            else {
              local_1020 = 0;
            }
            if ((local_1020 === -1)) {
              DAT_00639f14 = 0xd;
              DAT_00639f18 = FUN_006e7b00();
            }
          }
        }
        else {
          pcStackY_20 = 0x604045;
          _memset(DAT_ffffeff8, 0, 0x1000);
          iVar2 = __setmode(_FileHandle, 0x8000);
          do {
            if ((local_101c < 0x1000)) {
              local_1024 = local_101c;
            }
            else {
              local_1024 = 0x1000;
            }
            pcStackY_20 = 0x6040c9;
            iVar4 = __write(_FileHandle, DAT_ffffeff8, local_1024);
            if ((iVar4 === -1)) {
              if ((DAT_00639f18 === 5)) {
                DAT_00639f14 = 0xd;
              }
              local_1020 = -1;
              break;
            }
            local_101c = (local_101c - iVar4);
          } while ((0 < local_101c)) {
    DAT_00639f14 = 9;
  }
  return -1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___addl */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___addl (param_1, param_2, param_3)

 {
  let uVar1;
  let local_c;

  local_c = 0;
  uVar1 = (param_2 + param_1);
  if ((uVar1 < param_2)) {
    local_c = 1;
  }
  w32(param_3, 0, uVar1);
  return local_c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___add_12 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___add_12 (param_1, param_2)

 {
  let iVar1;

  iVar1 = ___addl(s32(param_1, 0), s32(param_2, 0), param_1);
  if ((iVar1 !== 0)) {
    iVar1 = ___addl(s32(param_1, 1), 1, (param_1 + 1));
    if ((iVar1 !== 0)) {
      w32(param_1, 2, (s32(param_1, 2) + 1));
    }
  }
  iVar1 = ___addl(s32(param_1, 1), s32(param_2, 1), (param_1 + 1));
  if ((iVar1 !== 0)) {
    w32(param_1, 2, (s32(param_1, 2) + 1));
  }
  ___addl(s32(param_1, 2), s32(param_2, 2), (param_1 + 2));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___shl_12 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___shl_12 (param_1)

 {
  let local_c;
  let local_8;

  local_8 = u8(((s32(param_1, 0) & -0x80000000) !== 0));
  local_c = u8(((_MEM[(param_1 + 7)] & 0x80) !== 0));
  w32(param_1, 0, (s32(param_1, 0) << 1));
  w32(param_1, 1, (s32(param_1, 1) * 2 | local_8));
  w32(param_1, 2, (s32(param_1, 2) * 2 | local_c));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___shr_12 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___shr_12 (param_1)

 {
  let local_c;
  let local_8;

  if (((s32(param_1, 2) & 1) === 0)) {
    local_c = 0;
  }
  else {
    local_c = -0x80000000;
  }
  if (((s32(param_1, 1) & 1) === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = -0x80000000;
  }
  w32(param_1, 2, (s32(param_1, 2) >>> 1));
  w32(param_1, 1, ((s32(param_1, 1) >>> 1) | local_c));
  w32(param_1, 0, ((s32(param_1, 0) >>> 1) | local_8));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___mtold12 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___mtold12 (param_1, param_2, param_3)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = 0x404e;
  w32(param_3, 0, 0);
  w32(param_3, 1, 0);
  w32(param_3, 2, 0);
  (param_2 !== 0) (; param_2 = (param_2 !== 0); param_2 = (param_2 + -1)) {
    local_10 = s32(param_3, 0);
    local_c = s32(param_3, 1);
    local_8 = s32(param_3, 2);
    ___shl_12(param_3);
    ___shl_12(param_3);
    ___add_12(param_3, DAT_fffffff0);
    ___shl_12(param_3);
    local_10 = s8(_MEM[param_1]);
    local_c = 0;
    local_8 = 0;
    ___add_12(param_3, DAT_fffffff0);
    param_1 = (param_1 + 1);
  }
  while ((s32(param_3, 2) === 0)) {
    w32(param_3, 2, (s32(param_3, 1) >>> 0x10));
    w32(param_3, 1, ((s32(param_3, 1) << 0x10) | (s32(param_3, 0) >>> 0x10)));
    w32(param_3, 0, (s32(param_3, 0) << 0x10));
    local_14 = (local_14 + 0xfff0);
  }
  while (((_MEM[(param_3 + 9)] & 0x80) === 0)) {
    ___shl_12(param_3);
    local_14 = (local_14 + 0xffff);
  }
  w16((param_3 + 0xa), 0, local_14);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___strgtold12 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___strgtold12 (pld12, p_end_ptr, str, mult12, scale, decpt, implicit_E)

 {
  let pbVar1;
  let bVar2;
  let local_94;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;
  let local_80;
  let local_78;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_62;
  let local_5e;
  let local_5a;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_25;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_6c = DAT_ffffffc4;
  local_20 = (local_20 & -0x10000);
  local_78 = 1;
  local_74 = 0;
  local_58 = 0;
  local_10 = 0;
  local_1c = 0;
  local_44 = 0;
  bVar2 = 0;
  local_18 = 0;
  local_70 = 0;
  local_48 = 0;
  local_50 = 0;
  local_68 = str;
  (_MEM[local_8] === 0xd) (local_8 = str;
      (((local_8 = _MEM[local_8] || (local_8 = _MEM[local_8])) || (local_8 = _MEM[local_8])) || (local_8 = _MEM[local_8]));
      local_8 = (local_8 + 1)) {
  }
  do {
    if ((local_50 === 0xa)) {
      w32(p_end_ptr, 0, local_8);
      if ((local_44 === 0)) {
        if ((0x18 < local_74)) {
          if ((4 < local_25)) {
            local_25 = (local_25 + 1);
          }
          local_74 = 0x18;
          local_6c = (local_6c + -1);
          local_70 = (local_70 + 1);
        }
        if ((local_74 === 0)) {
          local_4c = 0;
          local_54 = 0;
          local_14 = 0;
          local_c = 0;
        }
        else {
          while ((local_6c[-1] === 0)) {
            local_74 = (local_74 - 1);
            local_70 = (local_70 + 1);
          }
          ___mtold12(DAT_ffffffc4, local_74, DAT_ffffff9c);
          if ((local_78 < 0)) {
            local_18 = (-local_18);
          }
          local_18 = (local_18 + local_70);
          if ((local_1c === 0)) {
            local_18 = (local_18 + scale);
          }
          if ((local_10 === 0)) {
            local_18 = (local_18 - decpt);
          }
          if ((local_18 < 0x1451)) {
            if ((local_18 < -0x1450)) {
              bVar2 = 1;
            }
            else {
              ___multtenpow12(DAT_ffffff9c, local_18, mult12);
              local_4c = local_64;
              local_c = local_62;
              local_14 = local_5e;
              local_54 = local_5a;
            }
          }
          else {
            local_44 = 1;
          }
        }
      }
      if ((local_58 === 0)) {
        local_4c = 0;
        local_54 = 0;
        local_14 = 0;
        local_c = 0;
        local_48 = (local_48 | 4);
      }
      else if ((local_44 === 0)) {
        if (bVar2) {
          local_4c = 0;
          local_54 = 0;
          local_14 = 0;
          local_c = 0;
          local_48 = (local_48 | 1);
        }
      }
      else {
        local_54 = 0x7fff;
        local_14 = -0x80000000;
        local_c = 0;
        local_4c = 0;
        local_48 = (local_48 | 2);
      }
      w16(DAT_00000000, 0, local_4c);
      w32((DAT_00000000 + 2), 0, local_c);
      w32((DAT_00000000 + 6), 0, local_14);
      w16((DAT_00000000 + 0xa), 0, (((local_20) & 0xFFFF) | local_54));
      return local_48;
    }
    local_40 = _MEM[local_8];
    pbVar1 = (local_8 + 1);
    /* switch */ () {
    case 0 :
      if ((0x39 < local_40)) {
        if ((DAT_0063a2a0 === local_40)) {
          local_50 = 5;
        }
        else if ((local_40 === 0x2b)) {
          local_50 = 2;
          local_20 = ((((((local_20) >> 16) & 0xFFFF)) & 0xFFFF) << 0x10);
        }
        else if ((local_40 === 0x2d)) {
          local_50 = 2;
          local_20 = (((((local_20) >> 16) & 0xFFFF) << 16) | 0x8000);
        }
        else if ((local_40 === 0x30)) {
          local_50 = 1;
        }
        else {
          local_50 = 0xa;
          pbVar1 = local_8;
        }
      }
      else {
        local_50 = 3;
        pbVar1 = local_8;
      }
      break;
    case 1 :
      local_58 = 1;
      if ((0x39 < local_40)) {
        if ((DAT_0063a2a0 === local_40)) {
          local_50 = 4;
        }
        else {
          /* switch */ () {
          case 0x2b :
          case 0x2d :
            local_50 = 0xb;
            pbVar1 = local_8;
            break;
          default :
            local_50 = 0xa;
            pbVar1 = local_8;
            break;
          case 0x30 :
            local_50 = 1;
            break;
          case 0x44 :
          case 0x45 :
          case 100 :
          case 0x65 :
            local_50 = 6;
          }
        }
      }
      else {
        local_50 = 3;
        pbVar1 = local_8;
      }
      break;
    case 2 :
      if ((0x39 < local_40)) {
        if ((DAT_0063a2a0 === local_40)) {
          local_50 = 5;
        }
        else if ((local_40 === 0x30)) {
          local_50 = 1;
        }
        else {
          local_50 = 0xa;
          local_8 = local_68;
          pbVar1 = local_8;
        }
      }
      else {
        local_50 = 3;
        pbVar1 = local_8;
      }
      break;
    case 3 :
      local_58 = 1;
      local_8 = pbVar1;
      while ((local_84 === 0)) {
        if ((DAT_0063a29c < 2)) {
          local_84 = (((s16((PTR_DAT_0063a090 + u8(local_40) * 2), 0)) & 0xFFFF) & 4);
        }
        else {
          local_84 = __isctype(u8(local_40), 4);
        }
        if ((local_84 === 0)) {
          local_74 = (local_74 + 1);
          _MEM[local_6c] = (local_40 - 0x30);
          local_6c = (local_6c + 1);
        }
        else {
          local_70 = (local_70 + 1);
        }
        local_40 = _MEM[local_8];
        local_8 = (local_8 + 1);
      }
      pbVar1 = local_8;
      if ((DAT_0063a2a0 === local_40)) {
        local_50 = 4;
      }
      else {
        /* switch */ () {
        case 0x2b :
        case 0x2d :
          local_50 = 0xb;
          pbVar1 = (local_8 + -1);
          break;
        default :
          local_50 = 0xa;
          pbVar1 = (local_8 + -1);
          break;
        case 0x44 :
        case 0x45 :
        case 100 :
        case 0x65 :
          local_50 = 6;
        }
      }
      break;
    case 4 :
      local_58 = 1;
      local_10 = 1;
      local_8 = pbVar1;
      if ((local_74 === 0)) {
        while ((local_40 === 0x30)) {
          local_70 = (local_70 + -1);
          local_40 = _MEM[local_8];
          local_8 = (local_8 + 1);
        }
      }
      while ((local_88 === 0)) {
        if ((DAT_0063a29c < 2)) {
          local_88 = (((s16((PTR_DAT_0063a090 + u8(local_40) * 2), 0)) & 0xFFFF) & 4);
        }
        else {
          local_88 = __isctype(u8(local_40), 4);
        }
        if ((local_88 === 0)) {
          local_74 = (local_74 + 1);
          _MEM[local_6c] = (local_40 - 0x30);
          local_6c = (local_6c + 1);
          local_70 = (local_70 + -1);
        }
        local_40 = _MEM[local_8];
        local_8 = (local_8 + 1);
      }
      /* switch */ () {
      case 0x2b :
      case 0x2d :
        local_50 = 0xb;
        pbVar1 = (local_8 + -1);
        break;
      default :
        local_50 = 0xa;
        pbVar1 = (local_8 + -1);
        break;
      case 0x44 :
      case 0x45 :
      case 100 :
      case 0x65 :
        local_50 = 6;
        pbVar1 = local_8;
      }
      break;
    case 5 :
      local_10 = 1;
      if ((DAT_0063a29c < 2)) {
        local_8c = (((s16((PTR_DAT_0063a090 + u8(local_40) * 2), 0)) & 0xFFFF) & 4);
        local_8 = pbVar1;
      }
      else {
        local_8 = pbVar1;
        local_8c = __isctype(u8(local_40), 4);
      }
      if ((local_8c === 0)) {
        local_50 = 0xa;
        local_8 = local_68;
        pbVar1 = local_8;
      }
      else {
        local_50 = 4;
        pbVar1 = (local_8 + -1);
      }
      break;
    case 6 :
      local_68 = (local_8 + -1);
      if ((0x39 < local_40)) {
        if ((local_40 === 0x2b)) {
          local_50 = 7;
        }
        else if ((local_40 === 0x2d)) {
          local_50 = 7;
          local_78 = -1;
        }
        else if ((local_40 === 0x30)) {
          local_50 = 8;
        }
        else {
          local_50 = 0xa;
          pbVar1 = local_68;
        }
      }
      else {
        local_50 = 9;
        pbVar1 = local_8;
      }
      break;
    case 7 :
      if ((0x39 < local_40)) {
        if ((local_40 === 0x30)) {
          local_50 = 8;
        }
        else {
          local_50 = 0xa;
          local_8 = local_68;
          pbVar1 = local_8;
        }
      }
      else {
        local_50 = 9;
        pbVar1 = local_8;
      }
      break;
    case 8 :
      local_1c = 1;
      local_8 = pbVar1;
      while ((local_40 === 0x30)) {
        local_40 = _MEM[local_8];
        local_8 = (local_8 + 1);
      }
      if ((0x39 < local_40)) {
        local_50 = 0xa;
      }
      else {
        local_50 = 9;
      }
      local_8 = (local_8 + -1);
      pbVar1 = local_8;
      break;
    case 9 :
      local_1c = 1;
      local_80 = 0;
      local_8 = pbVar1;
      while ((0x1450 < local_80)) {
        if ((DAT_0063a29c < 2)) {
          local_90 = (((s16((PTR_DAT_0063a090 + u8(local_40) * 2), 0)) & 0xFFFF) & 4);
        }
        else {
          local_90 = __isctype(u8(local_40), 4);
        }
        if ((local_90 === 0)) {
        if ((DAT_0063a29c < 2)) {
          local_94 = (((s16((PTR_DAT_0063a090 + u8(local_40) * 2), 0)) & 0xFFFF) & 4);
        }
        else {
          local_94 = __isctype(u8(local_40), 4);
        }
        if ((local_94 === 0)) {
        local_50 = 0xa;
        pbVar1 = local_8;
      }
      else {
        local_68 = local_8;
        if ((local_40 === 0x2b)) {
          local_50 = 7;
        }
        else if ((local_40 === 0x2d)) {
          local_50 = 7;
          local_78 = -1;
        }
        else {
          local_50 = 0xa;
          pbVar1 = local_8;
        }
      }
    }
    local_8 = pbVar1;
  } /* goto */ ( true );
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___STRINGTOLD */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___STRINGTOLD (pld, p_end_ptr, str, mult12)

 {
  let IVar1;
  let local_18;
  let local_10;

  local_18 = ___strgtold12(DAT_fffffff0, p_end_ptr, str, mult12, 0, 0, 0);
  IVar1 = __ld12told(DAT_fffffff0, pld);
  if ((IVar1 === 1)) {
    local_18 = (local_18 | 2);
  }
  return local_18;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _$I10_OUTPUT */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function $I10_OUTPUT (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let pcVar1;
  let uVar2;
  let local_78;
  let local_60;
  let local_5c;
  let local_58;
  let local_57;
  let local_56;
  let local_55;
  let local_54;
  let local_53;
  let local_52;
  let local_51;
  let local_50;
  let local_4f;
  let local_4e;
  let local_4d;
  let local_4c;
  let local_48;
  let local_44;
  let uStack_42;
  let local_40;
  let uStack_3e;
  let local_3c;
  let uStack_3a;
  let uStack_38;
  let uStack_36;
  let uStack_34;
  let local_32;
  let cStack_31;
  let local_30;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  _local_40 = ((uStack_3e << 16) | 0x4d);
  local_24 = 0x134312f4;
  local_58 = 0xcc;
  local_57 = 0xcc;
  local_56 = 0xcc;
  local_55 = 0xcc;
  local_54 = 0xcc;
  local_53 = 0xcc;
  local_52 = 0xcc;
  local_51 = 0xcc;
  local_50 = 0xcc;
  local_4f = 0xcc;
  local_4e = 0xfb;
  local_4d = 0x3f;
  local_5c = 1;
  local_28 = param_2;
  local_4c = param_1;
  if (((param_3 & 0x8000) === 0)) {
    _MEM[(param_6 + 1)] = 0x20;
  }
  else {
    _MEM[(param_6 + 1)] = 0x2d;
  }
  if ((param_1 === 0)) {
    w16(param_6, 0, 0);
    _MEM[(param_6 + 1)] = 0x20;
    _MEM[(param_6 + 3)] = 1;
    _MEM[(param_6 + 2)] = 0x30;
    _MEM[(param_6 + 5)] = 0;
    local_5c = 1;
  }
  else if (((param_3 & 0x7fff) === 0x7fff)) {
    w16(param_6, 0, 1);
    if (((param_2 & 0x40000000) !== 0)) {
      if ((param_1 !== 0)) {
        if ((param_1 === 0)) {
          FUN_005f22d0((param_6 + 2), 0x61ebfc);
          _MEM[(param_6 + 3)] = 5;
        }
        else {
          FUN_005f22d0((param_6 + 2), 0x61ebf4);
          _MEM[(param_6 + 3)] = 6;
        }
      }
      else {
        FUN_005f22d0((param_6 + 2), 0x61ec04);
        _MEM[(param_6 + 3)] = 5;
      }
    }
    else {
      FUN_005f22d0((param_6 + 2), 0x61ec0c);
      _MEM[(param_6 + 3)] = 6;
    }
    local_5c = 0;
  }
  else {
    local_10 = (param_3 & 0xff);
    uVar2 = u8((((param_2 >>> 0x18)) & 0xFF));
    _local_44 = ((uStack_42 << 16) | uVar2);
    local_c = ((((((param_3) & 0xFFFF) & 0x7fff) * 0x4d10 + ((uVar2) & 0xFFFF) * 0x9a) + ((((param_3 >>> 8) & 0x7f)) & 0xFFFF) * 0x4d) + -0x134312f4);
    local_60 = (((local_c >>> 0x10)) & 0xFFFF);
    local_32 = (((param_3 & 0x7fff)) & 0xFF);
    cStack_31 = ((((param_3 & 0x7fff) >>> 8)) & 0xFF);
    uStack_36 = ((param_2) & 0xFFFF);
    uStack_34 = (((param_2 >>> 0x10)) & 0xFFFF);
    uStack_3a = ((param_1) & 0xFFFF);
    uStack_38 = (((param_1 >>> 0x10)) & 0xFFFF);
    local_3c = 0;
    ___multtenpow12(DAT_ffffffc4, (-((local_60) << 16 >> 16)), 1);
    if ((0x3ffe < ((cStack_31 << 8) | local_32))) {
      local_60 = (local_60 + 1);
      ___ld12mul(DAT_ffffffc4, DAT_ffffffa8);
    }
    w16(param_6, 0, local_60);
    if ((0 < param_4)) {
      if ((0x15 < param_4)) {
        param_4 = 0x15;
      }
      local_30 = (((((cStack_31 << 8) | local_32)) & 0xFFFF) - 0x3ffe);
      local_32 = 0;
      cStack_31 = 0;
      (local_48 < 8) (local_48 = 0; local_48 = (local_48 < 8); local_48 = (local_48 + 1)) {
        ___shl_12(DAT_ffffffc4);
      }
      if ((local_30 < 0)) {
        (0 < local_78) (local_78 = ((-local_30) & 0xff); 0 = (0 < local_78); local_78 = (local_78 - 1)) {
          ___shr_12(DAT_ffffffc4);
        }
      }
      local_8 = (param_6 + 2);
      (0 < local_14) (local_14 = (param_4 + 1); 0 = (0 < local_14); local_14 = (local_14 + -1)) {
        local_20 = ((uStack_3a << 16) | local_3c);
        local_1c = ((uStack_36 << 16) | uStack_38);
        local_18 = ((cStack_31 << 24) | ((local_32 << 16) | uStack_34));
        ___shl_12(DAT_ffffffc4);
        ___shl_12(DAT_ffffffc4);
        ___add_12(DAT_ffffffc4, DAT_ffffffe0);
        ___shl_12(DAT_ffffffc4);
        _MEM[local_8] = (cStack_31 + 0x30);
        local_8 = (local_8 + 1);
        cStack_31 = 0;
      }
      pcVar1 = (local_8 + -1);
      local_8 = (local_8 + -1);
      if ((_MEM[pcVar1] < 0x35)) {
        (((s16(local_8, 0)) & 0xFF) === 0x30) (; (param_6 = (param_6 + 2) && (local_8 = s16(local_8, 0)));
            local_8 = (local_8 + -1)) {
        }
        if ((local_8 < (param_6 + 2))) {
          w16(param_6, 0, 0);
          _MEM[(param_6 + 1)] = 0x20;
          _MEM[(param_6 + 3)] = 1;
          _MEM[(param_6 + 2)] = 0x30;
          _MEM[(param_6 + 5)] = 0;
          return 1;
        }
      }
      else {
        (((s16(local_8, 0)) & 0xFF) === 0x39) (; (param_6 = (param_6 + 2) && (local_8 = s16(local_8, 0)));
            local_8 = (local_8 + -1)) {
          _MEM[local_8] = 0x30;
        }
        if ((local_8 < (param_6 + 2))) {
          local_8 = (local_8 + 1);
          w16(param_6, 0, (s16(param_6, 0) + 1));
        }
        _MEM[local_8] = (((s16(local_8, 0)) & 0xFF) + 1);
      }
      _MEM[(param_6 + 3)] = ((((local_8) & 0xFF) - (((param_6) & 0xFF) + 4)) + 1);
      _MEM[((s8(_MEM[(param_6 + 3)]) + 4) + param_6)] = 0;
    }
    else {
      w16(param_6, 0, 0);
      _MEM[(param_6 + 1)] = 0x20;
      _MEM[(param_6 + 3)] = 1;
      _MEM[(param_6 + 2)] = 0x30;
      _MEM[(param_6 + 5)] = 0;
      local_5c = 1;
    }
  }
  return local_5c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _wcstombs */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _wcstombs (_Dest, _Source, _MaxCount)

 {
  let pcVar1;
  let iVar2;
  let sVar3;
  let DVar4;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  local_18 = 0;
  if ((_MaxCount !== 0)) {
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      sVar3 = pcVar1();
      return sVar3;
    }
    if ((_Dest === 0)) {
      if ((DAT_0063a078 === 0)) {
        local_8 = _wcslen(_Source);
      }
      else {
        iVar2 = FUN_006e7ba0(DAT_0063a088, 0x220, _Source, -1, 0, 0, 0, DAT_ffffffe8);
        if ((local_18 !== 0)) {
          DAT_00639f14 = 0x2a;
          local_8 = -1;
        }
        else {
          local_8 = (iVar2 - 1);
        }
      }
    }
    else if ((DAT_0063a078 === 0)) {
      (local_8 < _MaxCount) (; local_8 = (local_8 < _MaxCount); local_8 = (local_8 + 1)) {
        if ((0xff < s16(_Source, 0))) {
          DAT_00639f14 = 0x2a;
          return -1;
        }
        _Dest[local_8] = ((s16(_Source, 0)) & 0xFF);
        if ((s16(_Source, 0) === 0)) {
          return local_8;
        }
        _Source = (_Source + 1);
      }
    }
    else if ((DAT_0063a29c === 1)) {
      if ((_MaxCount !== 0)) {
        _MaxCount = wcsncnt(_Source, _MaxCount);
      }
      local_8 = FUN_006e7ba0(DAT_0063a088, 0x220, _Source, _MaxCount, _Dest, _MaxCount, 0, DAT_ffffffe8);
      if ((local_18 !== 0)) {
        DAT_00639f14 = 0x2a;
        local_8 = -1;
      }
      else if ((_Dest[(local_8 - 1)] === 0)) {
        local_8 = (local_8 - 1);
      }
    }
    else {
      local_8 = FUN_006e7ba0(DAT_0063a088, 0x220, _Source, -1, _Dest, _MaxCount, 0, DAT_ffffffe8);
      if ((local_18 !== 0)) {
        if ((DVar4 === 0x7a)) {
          while ((local_8 < _MaxCount)) {
            local_14 = FUN_006e7ba0(DAT_0063a088, 0, _Source, 1, DAT_fffffff0, DAT_0063a29c, 0, DAT_ffffffe8);
            if ((local_18 !== 0)) {
              DAT_00639f14 = 0x2a;
              return -1;
            }
            if ((_MaxCount < (local_14 + local_8))) {
              return local_8;
            }
            (local_c < local_14) (local_c = 0; local_c = (local_c < local_14); local_c = (local_c + 1)) {
              _Dest[local_8] = DAT_fffffff0[local_c];
              if ((_Dest[local_8] === 0)) {
                return local_8;
              }
              local_8 = (local_8 + 1);
            }
            _Source = (_Source + 1);
          }
        }
        else {
          DAT_00639f14 = 0x2a;
          local_8 = -1;
        }
      }
      else {
        local_8 = (local_8 - 1);
      }
    }
  }
  else {
    local_8 = 0;
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _wcsncnt */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function wcsncnt (param_1, param_2)

 {
  let local_c;
  let local_8;

  local_c = (param_2 + 1);
  (s16(local_8, 0) !== 0) (local_8 = param_1; (local_c = (local_c + -1), local_c = (local_c !== 0) && (local_8 = s16(local_8, 0)));
      local_8 = (local_8 + 1)) {
  }
  if ((s16(local_8, 0) === 0)) {
    param_2 = (((local_8 - param_1) >> 1) + 1);
  }
  return param_2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _getenv */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _getenv (_VarName)

 {
  let iVar1;
  let _MaxCount;
  let sVar2;
  let local_c;

  local_c = DAT_00639f3c;
  if ((DAT_00639f44 !== 0)) {
    iVar1 = ___wtomb_environ();
    if ((iVar1 !== 0)) {
      return 0;
    }
    local_c = DAT_00639f3c;
  }
  DAT_00639f3c = local_c;
  if ((_VarName !== 0)) {
    _MaxCount = _strlen(_VarName);
    (s32(local_c, 0) !== 0) (; local_c = s32(local_c, 0); local_c = (local_c + 1)) {
      sVar2 = _strlen(s32(local_c, 0));
      if ((iVar1 === 0)) {
        return ((_MaxCount + 1) + s32(local_c, 0));
      }
    }
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __setmode */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __setmode (_FileHandle, _Mode)

 {
  let cVar1;
  let iVar2;

  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 1) !== 0)) {
    cVar1 = _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)];
    if ((_Mode === 0x8000)) {
      _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] = (_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 0x7f);
    }
    else {
      if ((_Mode !== 0x4000)) {
        DAT_00639f14 = 0x16;
        return -1;
      }
      _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] = (_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] | 0x80);
    }
    if (((s8(cVar1) & 0x80) === 0)) {
      iVar2 = 0x8000;
    }
    else {
      iVar2 = 0x4000;
    }
  }
  else {
    DAT_00639f14 = 9;
    iVar2 = -1;
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___ld12mul */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___ld12mul (param_1, param_2)

 {
  let sVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let iVar6;
  let local_3c;
  let local_38;
  let local_30;
  let local_2c;
  let local_24;
  let local_1c;
  let uStack_1a;
  let local_18;
  let uStack_12;
  let bStack_11;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0;
  local_1c = 0;
  local_1c = 0;
  uStack_1a = 0;
  local_18 = 0;
  local_18 = 0;
  local_18 = 0;
  uStack_12 = 0;
  bStack_11 = 0;
  uVar3 = s16((param_1 + 0xa), 0);
  uVar4 = s16((param_2 + 0xa), 0);
  uVar5 = (uVar4 ^ uVar3);
  local_38 = ((uVar4 & 0x7fff) + (uVar3 & 0x7fff));
  if ((local_38 < 0xbffe)) {
    if ((local_38 < 0x3fc0)) {
      w32(param_1, 2, 0);
      w32(param_1, 1, 0);
      w32(param_1, 0, 0);
    }
    else if ((s32(param_1, 0) === 0)) {
      w16((param_1 + 0xa), 0, 0);
    }
    else if ((s32(param_2, 0) === 0)) {
      w32(param_1, 2, 0);
      w32(param_1, 1, 0);
      w32(param_1, 0, 0);
    }
    else {
      local_30 = 0;
      (local_24 < 5) (local_24 = 0; local_24 = (local_24 < 5); local_24 = (local_24 + 1)) {
        local_2c = local_24 * 2;
        local_c = 8;
        (0 < local_3c) (local_3c = (5 - local_24); 0 = (0 < local_3c); local_3c = (local_3c + -1)) {
          iVar6 = ___addl(s32((DAT_ffffffe4 + local_30), 0), ((s16((param_2 + local_c), 0)) & 0xFFFF) * ((s16((local_2c + param_1), 0)) & 0xFFFF), (DAT_ffffffe4 + local_30));
          if ((iVar6 !== 0)) {
            w16((DAT_ffffffe8 + local_30), 0, (s16((DAT_ffffffe8 + local_30), 0) + 1));
          }
          local_2c = (local_2c + 2);
          local_c = (local_c + -2);
        }
        local_30 = (local_30 + 2);
      }
      local_38 = (local_38 + 0xc002);
      while (((bStack_11 & 0x80) === 0)) {
        ___shl_12(DAT_ffffffe4);
        local_38 = (local_38 - 1);
      }
      if ((local_38 < 1)) {
        (local_38 < 0) (local_38 = (local_38 - 1); local_38 = local_38; local_38 = (local_38 + 1)) {
          if (((UNNAMED & 1) !== 0)) {
            local_8 = (local_8 + 1);
          }
          ___shr_12(DAT_ffffffe4);
        }
        if ((local_8 !== 0)) {
          local_1c = (UNNAMED | 1);
        }
      }
      iVar2 = ((UNNAMED << 16) | uStack_1a);
      iVar6 = ((UNNAMED << 16) | UNNAMED);
      sVar1 = ((bStack_11 << 8) | uStack_12);
      if ((0x8000 < ((UNNAMED << 8) | UNNAMED))) {
        if ((((UNNAMED << 16) | uStack_1a) === -1)) {
          iVar2 = 0;
          if ((((UNNAMED << 16) | UNNAMED) === -1)) {
            iVar6 = 0;
            if ((((bStack_11 << 8) | uStack_12) === 0xffff)) {
              sVar1 = 0x8000;
              local_38 = (local_38 + 1);
            }
            else {
              sVar1 = (((bStack_11 << 8) | uStack_12) + 1);
            }
          }
          else {
            iVar6 = (((UNNAMED << 16) | UNNAMED) + 1);
          }
        }
        else {
          iVar2 = (((UNNAMED << 16) | uStack_1a) + 1);
          iVar6 = ((UNNAMED << 16) | UNNAMED);
        }
      }
      local_18 = (((iVar2 >>> 0x10)) & 0xFFFF);
      uStack_1a = ((iVar2) & 0xFFFF);
      bStack_11 = (((sVar1 >>> 8)) & 0xFF);
      uStack_12 = ((sVar1) & 0xFF);
      local_18 = (((iVar6 >>> 0x10)) & 0xFFFF);
      local_18 = ((iVar6) & 0xFFFF);
      if ((local_38 < 0x7fff)) {
        w16(param_1, 0, uStack_1a);
        w32((param_1 + 2), 0, ((((iVar6) & 0xFFFF) << 16) | (((iVar2 >>> 0x10)) & 0xFFFF)));
        w32((param_1 + 6), 0, ((bStack_11 << 24) | ((uStack_12 << 16) | (((iVar6 >>> 0x10)) & 0xFFFF))));
        w16((param_1 + 0xa), 0, ((uVar5 & 0x8000) | local_38));
      }
      else {
        if (((uVar5 & 0x8000) === 0)) {
          w32(param_1, 2, 0x7fff8000);
        }
        else {
          w32(param_1, 2, -0x8000);
        }
        w32(param_1, 1, 0);
        w32(param_1, 0, 0);
      }
    }
  }
  else {
    if (((uVar5 & 0x8000) === 0)) {
      w32(param_1, 2, 0x7fff8000);
    }
    else {
      w32(param_1, 2, -0x8000);
    }
    w32(param_1, 1, 0);
    w32(param_1, 0, 0);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___multtenpow12 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___multtenpow12 (param_1, param_2, param_3)

 {
  let uVar1;
  let local_18;
  let uStack_16;
  let uStack_12;
  let local_10;
  let local_c;
  let local_8;

  local_8 = DAT_0063b380;
  if ((param_2 !== 0)) {
    if ((param_2 < 0)) {
      param_2 = (-param_2);
      local_8 = DAT_0063b4e0;
    }
    uStack_16 = ((UNNAMED << 16) | UNNAMED);
    if ((param_3 === 0)) {
      w16(param_1, 0, 0);
      uStack_16 = ((UNNAMED << 16) | UNNAMED);
    }
    while ((param_2 !== 0)) {
      local_8 = (local_8 + 0x54);
      uVar1 = (param_2 & 7);
      param_2 = (param_2 >> 3);
      if ((uVar1 !== 0)) {
        local_c = (local_8 + uVar1 * 0xc);
        if ((0x7fff < s16(local_c, 0))) {
          local_18 = ((s32(local_c, 0)) & 0xFFFF);
          uStack_16 = (((s32(local_c, 0) >>> 0x10)) & 0xFFFF);
          uStack_16 = ((s32((local_c + 2), 0)) & 0xFFFF);
          uStack_12 = (((s32((local_c + 2), 0) >>> 0x10)) & 0xFFFF);
          local_10 = s32((local_c + 4), 0);
          uStack_16 = (((((s32((local_c + 2), 0)) & 0xFFFF) << 16) | (((s32(local_c, 0) >>> 0x10)) & 0xFFFF)) + -1);
          local_c = DAT_ffffffe8;
        }
        ___ld12mul(param_1, local_c);
      }
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __mbsnbicoll */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __mbsnbicoll (unaff_EDI, _Str1, _Str2, _MaxCount)

 {
  let iVar1;
  // unaff_EDI promoted to parameter;

  if ((_MaxCount === 0)) {
    iVar1 = 0;
  }
  else {
    iVar1 = ___crtCompareStringA(DAT_0063b0a8, 1, _Str1, _MaxCount, _Str2, _MaxCount, DAT_0063b0a4, unaff_EDI);
    if ((iVar1 === 0)) {
      iVar1 = 0x7fffffff;
    }
    else {
      iVar1 = (iVar1 + -2);
    }
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___wtomb_environ */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___wtomb_environ ()

 {
  let iVar1;
  let _POption;
  let local_8;

  local_8 = DAT_00639f44;
  while ((iVar1 === 0)) {
    if ((s32(local_8, 0) === 0)) {
      return 0;
    }
    iVar1 = FUN_006e7ba0(1, 0, s32(local_8, 0), -1, 0, 0, 0, 0);
    if ((iVar1 === 0)) {
      return -1;
    }
    _POption = __malloc_dbg(iVar1, 2, 0x61ec30, 0x3d);
    if ((_POption === 0)) {
      return -1;
    }
    iVar1 = FUN_006e7ba0(1, 0, s32(local_8, 0), -1, _POption, iVar1, 0, 0);
    if ((iVar1 === 0))


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtCompareStringW */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtCompareStringW (in_EAX, _LocaleName, _DwCmpFlags, _LpString1, _CchCount1, _LpString2, _CchCount2)

 {
  // in_EAX promoted to parameter;
  let cbMultiByte;
  let lpMultiByteStr;
  let iVar1;
  let iVar2;
  let in_stack_0000001c;
  let local_8;

  if ((DAT_0063b69c === 0)) {
    in_EAX = FUN_006e7b5c(0, 0, 0x61e6ac, 1, 0x61e6ac, 1);
    if ((in_EAX === 0)) {
      in_EAX = FUN_006e7b60(0, 0, 0x61e6a8, 1, 0x61e6a8, 1);
      if ((in_EAX === 0)) {
        return 0;
      }
      DAT_0063b69c = 2;
    }
    else {
      DAT_0063b69c = 1;
    }
  }
  if ((0 < _CchCount1)) {
    in_EAX = wcsncnt(_LpString1, _CchCount1);
    _CchCount1 = in_EAX;
  }
  if ((0 < _CchCount2)) {
    in_EAX = wcsncnt(_LpString2, _CchCount2);
    _CchCount2 = in_EAX;
  }
  if ((_CchCount2 === 0)) {
    if ((_CchCount1 === _CchCount2)) {
      in_EAX = 2;
    }
    else if (((_CchCount1 - _CchCount2) < 0)) {
      in_EAX = 1;
    }
    else {
      in_EAX = 3;
    }
  }
  else if ((DAT_0063b69c === 1)) {
    in_EAX = FUN_006e7b5c(_LocaleName, _DwCmpFlags, _LpString1, _CchCount1, _LpString2, _CchCount2);
  }
  else if ((DAT_0063b69c === 2)) {
    local_8 = 0;
    if ((in_stack_0000001c === 0)) {
      in_stack_0000001c = DAT_0063a088;
    }
    cbMultiByte = FUN_006e7ba0(in_stack_0000001c, 0x220, _LpString1, _CchCount1, 0, 0, 0, 0);
    if ((cbMultiByte === 0)) {
      in_EAX = 0;
    }
    else {
      lpMultiByteStr = __malloc_dbg(cbMultiByte, 2, 0x61ec3c, 0xc4);
      if ((lpMultiByteStr === 0)) {
        in_EAX = 0;
      }
      else {
        iVar1 = FUN_006e7ba0(in_stack_0000001c, 0x220, _LpString1, _CchCount1, lpMultiByteStr, cbMultiByte, 0, 0);
        if ((iVar2 === 0)) {
          __free_dbg(lpMultiByteStr, 2);
          __free_dbg(local_8, 2);
          in_EAX = 0;
        }
        else {
          in_EAX = FUN_006e7b60(_LocaleName, _DwCmpFlags, lpMultiByteStr, cbMultiByte, local_8, iVar1);
          __free_dbg(lpMultiByteStr, 2);
          __free_dbg(local_8, 2);
        }
      }
    }
  }
  return in_EAX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _wcsncnt */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function wcsncnt (param_1, param_2)

 {
  let local_c;
  let local_8;

  local_c = param_2;
  (s16(local_8, 0) !== 0) (local_8 = param_1; (local_c = (local_c !== 0) && (local_8 = s16(local_8, 0))); local_8 = (local_8 + 1)) {
    local_c = (local_c + -1);
  }
  if ((s16(local_8, 0) === 0)) {
    param_2 = ((local_8 - param_1) >> 1);
  }
  return param_2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtCompareStringA */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtCompareStringA (in_EAX, _Plocinfo, _LocaleName, _DwCmpFlags, _LpString1, _CchCount1, _LpString2, _CchCount2, _Code_page)

 {
  let pcVar1;
  // in_EAX promoted to parameter;
  let BVar2;
  let iVar3;
  let local_30;
  let local_2c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_0063b6a0 === 0)) {
    in_EAX = FUN_006e7b60(0, 0, 0x61e6a8, 1, 0x61e6a8, 1);
    if ((in_EAX === 0)) {
      in_EAX = FUN_006e7b5c(0, 0, 0x61e6ac, 1, 0x61e6ac, 1);
      if ((in_EAX === 0)) {
        return 0;
      }
      DAT_0063b6a0 = 1;
    }
    else {
      DAT_0063b6a0 = 2;
    }
  }
  local_18 = in_EAX;
  if ((0 < _LpString1)) {
    local_18 = _strncnt(_DwCmpFlags, _LpString1);
    _LpString1 = local_18;
  }
  if ((0 < _LpString2)) {
    local_18 = _strncnt(_CchCount1, _LpString2);
    _LpString2 = local_18;
  }
  if ((DAT_0063b6a0 === 2)) {
    local_18 = FUN_006e7b60(_Plocinfo, _LocaleName, _DwCmpFlags, _LpString1, _CchCount1, _LpString2);
  }
  else if ((DAT_0063b6a0 === 1)) {
    local_18 = 0;
    local_8 = 0;
    local_c = 0;
    local_10 = 0;
    local_14 = 0;
    if ((_CchCount2 === 0)) {
      _CchCount2 = DAT_0063a088;
    }
    if ((_LpString2 === 0)) {
      if ((_LpString2 === _LpString1)) {
        return 2;
      }
      if ((1 < _LpString2)) {
        return 1;
      }
      if ((1 < _LpString1)) {
        return 3;
      }
      BVar2 = FUN_006e7b84(_CchCount2, DAT_ffffffd4);
      if ((BVar2 === 0)) {
        return 0;
      }
      if ((iVar3 === 1)) {
        /* DEVIATION: intrinsic */;
        iVar3 = pcVar1();
        return iVar3;
      }
      if ((0 < _LpString1)) {
        if ((UNNAMED < 2)) {
          return 3;
        }
        local_30 = DAT_00000006;
        while ((_MEM[_DwCmpFlags] <= local_30[1])) {
          if ((local_30[1] === 0)) {
            return 3;
          }
          if ((_MEM[_DwCmpFlags] <= local_30[1])) {
        if ((UNNAMED < 2)) {
          return 1;
        }
        local_30 = DAT_00000006;
        while ((_MEM[_CchCount1] <= local_30[1])) {
          if ((local_30[1] === 0)) {
            return 1;
          }
          if ((_MEM[_CchCount1] <= local_30[1])) {
      local_18 = 0;
    }
    else {
      local_10 = __malloc_dbg(local_8 * 2, 2, 0x61ec3c, 0x18a);
      if ((local_10 === 0)) {
        local_18 = 0;
      }
      else {
        iVar3 = FUN_006e7c58(_CchCount2, 1, _DwCmpFlags, _LpString1, local_10, local_8);
        if ((iVar3 !== 0)) {
          local_18 = FUN_006e7b5c(_Plocinfo, _LocaleName, local_10, local_8, local_14, local_c);
        }
        __free_dbg(local_10, 2);
        __free_dbg(local_14, 2);
      }
    }
  }
  return local_18;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _strncnt */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _strncnt (_String, _Cnt)

 {
  let local_c;
  let local_8;

  local_c = _Cnt;
  (_MEM[local_8] !== 0) (local_8 = _String; (local_c = (local_c !== 0) && (local_8 = _MEM[local_8])); local_8 = (local_8 + 1)) {
    local_c = (local_c - 1);
  }
  if ((_MEM[local_8] === 0)) {
    _Cnt = (local_8 - _String);
  }
  return _Cnt;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtsetenv */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtsetenv (_POption, _Primary)

 {
  let ppcVar1;
  let iVar2;
  let piVar3;
  let sVar4;
  let lpName;
  let bVar5;
  let uVar6;
  let pcVar7;
  let uVar8;
  let local_20;
  let local_c;

  if ((_POption === ppcVar1)) {
    return -1;
  }
  bVar5 = (_MEM[(ppcVar1 + 1)] === 0);
  if ((DAT_00639f40 === DAT_00639f3c)) {
    DAT_00639f3c = copy_environ(DAT_00639f3c);
  }
  if ((DAT_00639f3c === 0)) {
    if ((DAT_00639f44 === 0)) {
      if (bVar5) {
        return 0;
      }
      DAT_00639f3c = __malloc_dbg(4, 2, 0x61ec88, 0x87);
      if ((__malloc_dbg(4, 2, 0x61ec88, 0x87) === 0)) {
        return -1;
      }
      w32(__malloc_dbg(4, 2, 0x61ec88, 0x87), 0, 0);
      if ((DAT_00639f44 === 0)) {
        DAT_00639f44 = __malloc_dbg(4, 2, 0x61ec88, 0x8e);
        if ((__malloc_dbg(4, 2, 0x61ec88, 0x8e) === 0)) {
          return -1;
        }
        w32(__malloc_dbg(4, 2, 0x61ec88, 0x8e), 0, 0);
      }
    }
    else {
      iVar2 = ___wtomb_environ();
      if ((iVar2 !== 0)) {
        return -1;
      }
    }
  }
  piVar3 = DAT_00639f3c;
  local_c = findenv(_POption, (ppcVar1 - _POption));
  if ((s32(piVar3, 0) === 0)) {
    if (bVar5) {
      return 0;
    }
    if ((local_c < 0)) {
      local_c = (-local_c);
    }
    piVar3 = __realloc_dbg(piVar3, (local_c * 4 + 8), 2, 0x61ec88, 0xce);
    if ((piVar3 === 0)) {
      return -1;
    }
    w32(piVar3, local_c, _POption);
    w32(piVar3, (local_c + 1), 0);
    DAT_00639f3c = piVar3;
  }
  else if (bVar5) {
    __free_dbg(s32(piVar3, local_c), 2);
    (s32(piVar3, local_c) !== 0) (; piVar3 = (piVar3 + local_c); local_c = (local_c + 1)) {
      w32(piVar3, local_c, s32(piVar3, (local_c + 1)));
    }
    piVar3 = __realloc_dbg(piVar3, (local_c << 2), 2, 0x61ec88, 0xb9);
    if ((piVar3 !== 0)) {
      DAT_00639f3c = piVar3;
    }
  }
  else {
    w32(piVar3, local_c, _POption);
  }
  if ((_Primary !== 0)) {
    uVar8 = 0xe5;
    pcVar7 = 0x61ec88;
    uVar6 = 2;
    sVar4 = _strlen(_POption);
    lpName = __malloc_dbg((sVar4 + 2), uVar6, pcVar7, uVar8);
    if ((lpName !== 0)) {
      FUN_005f22d0(lpName, _POption);
      lpName[(ppcVar1 - _POption)] = 0;
      local_20 = ((lpName + (ppcVar1 - _POption)) + 1);
      if (bVar5) {
        local_20 = 0;
      }
      FUN_006e7c80(lpName, local_20);
      __free_dbg(lpName, 2);
    }
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _findenv */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function findenv (param_1, param_2)

 {
  let iVar1;
  let local_8;

  local_8 = DAT_00639f3c;
  while ((_MEM[(param_2 + s32(local_8, 0))] === 0)) {
    if ((s32(local_8, 0) === 0)) {
      return (-((local_8 - DAT_00639f3c) >> 2));
    }
    iVar1 = __mbsnbicoll(param_1, s32(local_8, 0), param_2);
    if ((_MEM[(param_2 + s32(local_8, 0))] === 0))


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _copy_environ */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function copy_environ (param_1)

 {
  let piVar1;
  let sVar2;
  let iVar3;
  let uVar4;
  let pcVar5;
  let uVar6;
  let local_14;
  let local_10;
  let local_c;

  local_14 = 0;
  local_10 = param_1;
  if ((param_1 === 0)) {
    piVar1 = 0;
  }
  else {
    while ((s32(local_10, 0) === 0)) {
      if ((s32(local_10, 0) === 0)) {
      __amsg_exit(9);
    }
    local_c = piVar1;
    (s32(local_10, 0) !== 0) (local_10 = param_1; local_10 = s32(local_10, 0); local_10 = (local_10 + 1)) {
      uVar6 = 0x14f;
      pcVar5 = 0x61ec88;
      uVar4 = 2;
      sVar2 = _strlen(s32(local_10, 0));
      iVar3 = __malloc_dbg((sVar2 + 1), uVar4, pcVar5, uVar6);
      w32(local_c, 0, iVar3);
      if ((s32(local_c, 0) !== 0)) {
        FUN_005f22d0(s32(local_c, 0), s32(local_10, 0));
      }
      local_c = (local_c + 1);
    }
    w32(local_c, 0, 0);
  }
  return piVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __mbschr */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __mbschr (_Str, _Ch)

 {
  let puVar1;
  let bVar2;
  let uVar3;

  if ((DAT_0063b0a4 === 0)) {
    _Str = _strchr(_Str, _Ch);
  }
  else {
    while ((uVar3 === 0)) {
      bVar2 = _MEM[_Str];
      uVar3 = u8(bVar2);
      if ((uVar3 === 0)) {
        puVar1 = _Str;
        if ((((uVar3) & 0xFFFF) === _Ch)) {
        puVar1 = (_Str + 1);
        if ((_Str[1] === 0)) {
          return 0;
        }
        if ((((((bVar2 << 8) | _Str[1])) & 0xFFFF) === _Ch)) {
          return _Str;
        }
      }
      _Str = puVar1;
      _Str = (_Str + 1);
    }
    if ((((uVar3) & 0xFFFF) !== _Ch)) {
      _Str = 0;
    }
  }
  return _Str;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __filelength */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __filelength (_FileHandle)

 {
  let _Offset;
  let local_8;

  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 1) !== 0)) {
    _Offset = __lseek(_FileHandle, 0, 1);
    if ((_Offset === -1)) {
      local_8 = -1;
    }
    else {
      local_8 = __lseek(_FileHandle, 0, 2);
      if ((_Offset !== local_8)) {
        __lseek(_FileHandle, _Offset, 0);
      }
    }
  }
  else {
    DAT_00639f14 = 9;
    DAT_00639f18 = 0;
    local_8 = -1;
  }
  return local_8;
}


 export function FUN_006076a0 (param_1)

 {
  return s32((param_1 + 0x10), 0);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __strupr */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __strupr (unaff_ESI, unaff_EDI, _String)

 {
  let _LpDestStr;
  let iVar1;
  // unaff_ESI promoted to parameter;
  // unaff_EDI promoted to parameter;
  let local_10;
  let local_c;

  local_c = 0;
  if ((DAT_0063a078 === 0)) {
    (_MEM[local_10] !== 0) (local_10 = _String; local_10 = _MEM[local_10]; local_10 = (local_10 + 1)) {
      if ((_MEM[local_10] < 0x7b)) {
        _MEM[local_10] = (_MEM[local_10] + 0xe0);
      }
    }
  }
  else {
    _LpDestStr = ___crtLCMapStringA(DAT_0063a078, 0x200, _String, -1, 0, 0, 0, unaff_EDI, unaff_ESI);
    if ((iVar1 !== 0)) {
      FUN_005f22d0(_String, local_c);
    }
    __free_dbg(local_c, 2);
  }
  return _String;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __strlwr */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __strlwr (unaff_ESI, unaff_EDI, _String)

 {
  let _LpDestStr;
  let iVar1;
  // unaff_ESI promoted to parameter;
  // unaff_EDI promoted to parameter;
  let local_10;
  let local_c;

  local_c = 0;
  if ((DAT_0063a078 === 0)) {
    (_MEM[local_10] !== 0) (local_10 = _String; local_10 = _MEM[local_10]; local_10 = (local_10 + 1)) {
      if ((_MEM[local_10] < 0x5b)) {
        _MEM[local_10] = (_MEM[local_10] + 0x20);
      }
    }
  }
  else {
    _LpDestStr = ___crtLCMapStringA(DAT_0063a078, 0x100, _String, -1, 0, 0, 0, unaff_EDI, unaff_ESI);
    if ((iVar1 !== 0)) {
      FUN_005f22d0(_String, local_c);
    }
    __free_dbg(local_c, 2);
  }
  return _String;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __mkdir */
 /* __wmkdir */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__mkdir (_Path)

 {
  let BVar1;
  let iVar2;
  let local_8;

  BVar1 = FUN_006e7b50(_Path, 0);
  if ((BVar1 === 0)) {
    local_8 = FUN_006e7b00();
  }
  else {
    local_8 = 0;
  }
  if ((local_8 === 0)) {
    iVar2 = 0;
  }
  else {
    __dosmaperr(local_8);
    iVar2 = -1;
  }
  return iVar2;
}
