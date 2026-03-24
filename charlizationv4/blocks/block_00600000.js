// ═══════════════════════════════════════════════════════════════════
// block_00600000.js — Mechanical transpilation of block_00600000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00600000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00600000.c
//
// NOTE: This entire block consists of MSVC 6.0 C Runtime Library
// (CRT) functions — abort, signal, raise, file I/O, floating point
// math, string conversion, timezone, environment variables, etc.
// None of these are game logic. They are all "FW" (framework)
// category functions.
//
// Most of these interact with Win32 APIs (CreateFileA, WriteFile,
// GetTimeZoneInformation, etc.) and C runtime internals (file
// handle tables, signal handlers, floating point state). In the
// JS transpilation, Win32 calls are marked with DEVIATION: C runtime
// and CRT internals are implemented as minimal no-ops to maintain
// structural fidelity without actual OS interaction.
// ═══════════════════════════════════════════════════════════════════


// ── DAT_ globals referenced in this block ──
// CRT internal state — DEVIATION: C runtime — module-level variables
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

let PTR_s_R6002___floating_point_not_loade_0063b1bc = [];
let PTR_DAT_0063a090 = [];
let PTR_DAT_0063b340 = new Array(64).fill(0);
let PTR_DAT_0063b344 = new Array(64).fill(0);


// ════════════════════════════════════════════════════════════════
// CRT HELPER: CARRY4 — unsigned 32-bit addition carry detection
// Used by __aulldiv and __aullrem for 64-bit math
// ════════════════════════════════════════════════════════════════
function CARRY4(a, b) {
  return ((a >>> 0) + (b >>> 0)) > 0xFFFFFFFF;
}

// ════════════════════════════════════════════════════════════════
// CRT HELPER: CONCAT44 — combine two 32-bit values to 64-bit
// Returns a BigInt; used for 64-bit division
// ════════════════════════════════════════════════════════════════
function CONCAT44(hi, lo) {
  return (BigInt(hi >>> 0) << 32n) | BigInt(lo >>> 0);
}

// ════════════════════════════════════════════════════════════════
// CRT HELPER: CONCAT22 — combine two 16-bit values
// ════════════════════════════════════════════════════════════════
function CONCAT22(hi, lo) {
  return ((hi & 0xFFFF) << 16) | (lo & 0xFFFF);
}

// ════════════════════════════════════════════════════════════════
// CRT HELPER: CONCAT11 — combine two 8-bit values
// ════════════════════════════════════════════════════════════════
function CONCAT11(hi, lo) {
  return ((hi & 0xFF) << 8) | (lo & 0xFF);
}


// ============================================================
// __NMSG_WRITE — CRT runtime error message writer
// Function: __NMSG_WRITE @ 0x00600040
// ============================================================
export function __NMSG_WRITE(param_1) {
  // DEVIATION: C runtime
  // Win32 CRT error message display — DEVIATION: C runtime
  // Original writes runtime error messages to console or shows MessageBox
  return;
}


// ============================================================
// __GET_RTERRMSG — get runtime error message string
// Function: __GET_RTERRMSG @ 0x00600260
// ============================================================
export function __GET_RTERRMSG(param_1) {
  let pwVar1;
  let local_8;

  for (local_8 = 0; local_8 < 0x12; local_8 = local_8 + 1) {
    // DEVIATION: C runtime — G.DAT_0063b1b8 table lookup
    break;
  }
  pwVar1 = null;
  return pwVar1;
}


// ============================================================
// ___loctotime_t — convert local time components to time_t
// Function: ___loctotime_t @ 0x006002E0
// ============================================================
export function ___loctotime_t(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let uVar1;
  let iVar2;
  let local_8;

  uVar1 = (param_1 - 0x76c) >>> 0;
  if ((uVar1 | 0) < 0x46 || 0x8a < (uVar1 | 0)) {
    local_8 = -1;
  } else {
    let local_30 = G.DAT_0063b3a4[param_2] + param_3;
    if ((uVar1 & 3) === 0 && 2 < param_2) {
      local_30 = local_30 + 1;
    }
    local_8 = ((((param_1 + -0x7b2) * 0x16d + (param_1 + -0x76d >> 2) + -0x11 + local_30) * 0x18 +
               param_4) * 0x3c + param_5) * 0x3c + param_6;
    ___tzset();
    local_8 = local_8 + G.DAT_0063b2b0;
    let local_2c_tm_yday = local_30;
    let local_2c_tm_mon = param_2 + -1;
    let local_2c_tm_hour = param_4;
    let local_2c_tm_year = uVar1;
    if ((param_7 === 1) ||
       (((param_7 === -1 && (G.DAT_0063b2b4 !== 0)) &&
        (iVar2 = __isindst({ tm_yday: local_2c_tm_yday, tm_mon: local_2c_tm_mon, tm_hour: local_2c_tm_hour, tm_year: local_2c_tm_year }), iVar2 !== 0)))) {
      local_8 = local_8 + G.DAT_0063b2b8;
    }
  }
  return local_8;
}


// ============================================================
// _abort — CRT abort
// Function: _abort @ 0x00600400
// ============================================================
export function _abort() {
  __NMSG_WRITE(10);
  _raise(0x16);
  // __exit(3) — DEVIATION: C runtime
  throw new Error('CRT _abort called');
}


// ============================================================
// _signal — CRT signal handler registration
// Function: _signal @ 0x00600430
// ============================================================
export function _signal(param_1, in_stack_00000008) {
  // Win32 signal handling — DEVIATION: C runtime
  if (in_stack_00000008 !== 4 && in_stack_00000008 !== 3) {
    if (param_1 === 2 || param_1 === 0x15 || param_1 === 0x16 || param_1 === 0xf) {
      switch (param_1) {
        case 2:
          G.DAT_0063b24c = in_stack_00000008;
          break;
        case 0xf:
          G.DAT_0063b258 = in_stack_00000008;
          break;
        case 0x15:
          G.DAT_0063b250 = in_stack_00000008;
          break;
        case 0x16:
          G.DAT_0063b254 = in_stack_00000008;
          break;
      }
      return;
    }
  }
  G.DAT_00639f14 = 0x16;
  return;
}


// ============================================================
// ctrlevent_capture — Win32 console ctrl handler callback
// Function: ctrlevent_capture @ 0x00600610
// ============================================================
export function ctrlevent_capture(param_1) {
  let uVar1;
  let local_10;
  let local_c;
  let local_8;

  if (param_1 === 0) {
    local_c = 'DAT_0063b24c';
    local_10 = G.DAT_0063b24c;
    local_8 = 2;
  } else {
    local_c = 'DAT_0063b250';
    local_10 = G.DAT_0063b250;
    local_8 = 0x15;
  }
  if (local_10 === 0) {
    uVar1 = 0;
  } else {
    if (local_10 !== 1) {
      // Would call handler function — DEVIATION: C runtime
    }
    uVar1 = 1;
  }
  return uVar1;
}


// ============================================================
// _raise — CRT raise signal
// Function: _raise @ 0x006006A0
// ============================================================
export function _raise(_SigNum) {
  // CRT signal dispatch — DEVIATION: C runtime
  // Original dispatches to registered signal handlers
  switch (_SigNum) {
    case 2:
    case 4:
    case 8:
    case 0xb:
    case 0xf:
    case 0x15:
    case 0x16:
      break;
    default:
      return -1;
  }
  return 0;
}


// ============================================================
// siglookup — CRT signal table lookup
// Function: siglookup @ 0x006008C0
// ============================================================
export function siglookup(param_1) {
  // DEVIATION: C runtime — internal signal table search
  return null;
}


// ============================================================
// ___crtMessageBoxA — CRT message box wrapper
// Function: ___crtMessageBoxA @ 0x00600930
// ============================================================
export function ___crtMessageBoxA(_LpText, _LpCaption, _UType) {
  // DEVIATION: C runtime
  // Win32 MessageBoxA — DEVIATION: C runtime
  return 0;
}


// ============================================================
// __itoa — integer to ASCII string
// Function: __itoa @ 0x00600A10
// ============================================================
export function __itoa(_Value, _Dest, _Radix) {
  if (_Radix === 10 && _Value < 0) {
    xtoa(_Value, _Dest, 10, 1);
  } else {
    xtoa(_Value, _Dest, _Radix, 0);
  }
  return _Dest;
}


// ============================================================
// xtoa — unsigned integer to string with arbitrary radix
// Function: xtoa @ 0x00600A70
// ============================================================
export function xtoa(param_1, param_2, param_3, param_4) {
  // CRT integer-to-string conversion
  // In JS, we can use toString(radix) but preserve the structure
  let val = param_1 >>> 0;
  let buf = param_2;
  let result = '';

  if (param_4 !== 0) {
    result = '-';
    val = (-param_1) >>> 0;
  }

  let digits = '';
  do {
    let uVar3 = val % param_3;
    val = Math.floor(val / param_3);
    if (uVar3 < 10) {
      digits += String.fromCharCode(uVar3 + 0x30);
    } else {
      digits += String.fromCharCode(uVar3 + 0x57); // 'a' - 10
    }
  } while (val !== 0);

  // Reverse the digits
  result += digits.split('').reverse().join('');
  return result;
}


// ============================================================
// __ltoa — long to ASCII string
// Function: __ltoa @ 0x00600B30
// ============================================================
export function __ltoa(_Value, _Dest, _Radix) {
  let local_8;
  if (_Radix === 10 && _Value < 0) {
    local_8 = 1;
  } else {
    local_8 = 0;
  }
  xtoa(_Value, _Dest, _Radix, local_8);
  return _Dest;
}


// ============================================================
// __ultoa — unsigned long to ASCII string
// Function: __ultoa @ 0x00600B90
// ============================================================
export function __ultoa(_Value, _Dest, _Radix) {
  xtoa(_Value, _Dest, _Radix, 0);
  return _Dest;
}


// ============================================================
// __i64toa — 64-bit integer to ASCII string
// Function: __i64toa @ 0x00600BC0
// ============================================================
export function __i64toa(_Val, _DstBuf, _Radix) {
  let local_8;
  if (_Radix === 10 && _Val < 0) {
    local_8 = 1;
  } else {
    local_8 = 0;
  }
  x64toa(_Val, _DstBuf, _Radix, local_8);
  return _DstBuf;
}


// ============================================================
// x64toa — 64-bit unsigned to string with arbitrary radix
// Function: x64toa @ 0x00600C30
// ============================================================
export function x64toa(param_1, param_3, param_4, param_5) {
  // 64-bit integer to string — DEVIATION: C runtime
  let val = BigInt(param_1);
  let result = '';
  let radix = BigInt(param_4);

  if (param_5 !== 0) {
    result = '-';
    val = -val;
  }

  let digits = '';
  do {
    let uVar3 = Number(val % radix);
    val = val / radix;
    if (uVar3 < 10) {
      digits += String.fromCharCode(uVar3 + 0x30);
    } else {
      digits += String.fromCharCode(uVar3 + 0x57);
    }
  } while (val !== 0n);

  result += digits.split('').reverse().join('');
  return result;
}


// ============================================================
// __ui64toa — unsigned 64-bit to ASCII string
// Function: __ui64toa @ 0x00600D10
// ============================================================
export function __ui64toa(_Val, _DstBuf, _Radix) {
  x64toa(_Val, _DstBuf, _Radix, 0);
  return _DstBuf;
}


// ============================================================
// _fprintf — CRT formatted file print
// Function: _fprintf @ 0x00600D40
// ============================================================
export function _fprintf(_File, _Format, ...args) {
  // DEVIATION: C runtime
  // Win32 CRT fprintf — DEVIATION: C runtime
  return 0;
}


// ============================================================
// _setvbuf — CRT set file buffer
// Function: _setvbuf @ 0x00600DF0
// ============================================================
export function _setvbuf(_File, _Buf, _Mode, _Size) {
  // DEVIATION: C runtime
  // Win32 CRT setvbuf — DEVIATION: C runtime
  return 0;
}


// ============================================================
// _E2 — CRT internal exception filter init (part 2)
// Function: $E2 @ 0x00600F50
// ============================================================
export function _E2() {
  _E1();
  return;
}


// ============================================================
// _E1 — CRT internal exception filter init (part 1)
// Function: $E1 @ 0x00600F70
// ============================================================
export function _E1() {
  // DEVIATION: C runtime — _atexit and SetUnhandledExceptionFilter
  return;
}


// ============================================================
// __CxxUnhandledExceptionFilter — C++ unhandled exception filter
// Function: __CxxUnhandledExceptionFilter @ 0x00600FA0
// ============================================================
export function __CxxUnhandledExceptionFilter(param_1) {
  // DEVIATION: C runtime
  // Win32 exception filter — DEVIATION: C runtime
  return 0;
}


// ============================================================
// FUN_00601040 — restore previous exception filter
// Function: FUN_00601040 @ 0x00601040
// ============================================================
export function FUN_00601040() {
  // DEVIATION: C runtime
  // Win32 SetUnhandledExceptionFilter — DEVIATION: C runtime
  return;
}


// ============================================================
// _ValidateRead — CRT validate read pointer
// Function: _ValidateRead @ 0x00601060
// ============================================================
export function _ValidateRead(param_1, param_2) {
  // Win32 IsBadReadPtr — DEVIATION: C runtime
  return 1;
}


// ============================================================
// _ValidateWrite — CRT validate write pointer
// Function: _ValidateWrite @ 0x006010A0
// ============================================================
export function _ValidateWrite(param_1, param_2) {
  // Win32 IsBadWritePtr — DEVIATION: C runtime
  return 1;
}


// ============================================================
// _ValidateExecute — CRT validate execute pointer
// Function: _ValidateExecute @ 0x006010E0
// ============================================================
export function _ValidateExecute(param_1) {
  // Win32 IsBadCodePtr — DEVIATION: C runtime
  return 1;
}


// ============================================================
// __snprintf — CRT string print with limit
// Function: __snprintf @ 0x00601120
// ============================================================
export function __snprintf(_Dest, _Count, _Format, ...args) {
  // DEVIATION: C runtime
  // CRT snprintf — DEVIATION: C runtime
  return 0;
}


// ============================================================
// __vsnprintf — CRT string print with va_list and limit
// Function: __vsnprintf @ 0x00601210
// ============================================================
export function __vsnprintf(_Dest, _Count, _Format, _Args) {
  // DEVIATION: C runtime
  // CRT vsnprintf — DEVIATION: C runtime
  return 0;
}


// ============================================================
// ___crtGetStringTypeW — CRT wide char string type query
// Function: ___crtGetStringTypeW @ 0x00601300
// ============================================================
export function ___crtGetStringTypeW(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: C runtime
  // Win32 GetStringTypeW wrapper — DEVIATION: C runtime
  return;
}


// ============================================================
// ___crtGetStringTypeA — CRT ANSI char string type query
// Function: ___crtGetStringTypeA @ 0x00601560
// ============================================================
export function ___crtGetStringTypeA(_Plocinfo, _DWInfoType, _LpSrcStr, _CchSrc, _LpCharType, _Code_page, _BError) {
  // DEVIATION: C runtime
  // Win32 GetStringTypeA wrapper — DEVIATION: C runtime
  return 0;
}


// ============================================================
// __open — CRT file open
// Function: __open @ 0x00601700
// ============================================================
export function __open(_Filename, _OpenFlag, ...args) {
  // CRT file open — DEVIATION: C runtime
  let in_stack_0000000c = args[0] || 0;
  let iVar1 = __sopen(_Filename, _OpenFlag, 0x40, in_stack_0000000c);
  return iVar1;
}


// ============================================================
// __sopen — CRT shared file open
// Function: __sopen @ 0x00601750
// ============================================================
export function __sopen(_Filename, _OpenFlag, _ShareFlag, ...args) {
  // Win32 CreateFileA-based file open — DEVIATION: C runtime
  // Original handles file sharing, text/binary mode, inheritance
  G.DAT_00639f14 = 0x16;
  G.DAT_00639f18 = 0;
  return -1;
}


// ============================================================
// __alloc_osfhnd — CRT allocate OS file handle
// Function: __alloc_osfhnd @ 0x00601CF0
// ============================================================
export function __alloc_osfhnd() {
  // CRT file handle allocation — DEVIATION: C runtime
  return -1;
}


// ============================================================
// __set_osfhnd — CRT set OS file handle
// Function: __set_osfhnd @ 0x00601E40
// ============================================================
export function __set_osfhnd(param_1, param_2) {
  // CRT file handle set — DEVIATION: C runtime
  return -1;
}


// ============================================================
// __free_osfhnd — CRT free OS file handle
// Function: __free_osfhnd @ 0x00601F40
// ============================================================
export function __free_osfhnd(param_1) {
  // CRT file handle free — DEVIATION: C runtime
  return -1;
}


// ============================================================
// __get_osfhandle — CRT get OS file handle
// Function: __get_osfhandle @ 0x00602060
// ============================================================
export function __get_osfhandle(_FileHandle) {
  // CRT get OS handle — DEVIATION: C runtime
  G.DAT_00639f14 = 9;
  G.DAT_00639f18 = 0;
  return -1;
}


// ============================================================
// __open_osfhandle — CRT open OS file handle as CRT handle
// Function: __open_osfhandle @ 0x006020E0
// ============================================================
export function __open_osfhandle(_OSFileHandle, _Flags) {
  // CRT OS handle import — DEVIATION: C runtime
  return -1;
}


// ============================================================
// __commit — CRT flush file buffers to disk
// Function: __commit @ 0x006021E0
// ============================================================
export function __commit(_FileHandle) {
  // Win32 FlushFileBuffers — DEVIATION: C runtime
  G.DAT_00639f14 = 9;
  return -1;
}


// ============================================================
// __isatty — CRT test if file handle is a terminal
// Function: __isatty @ 0x006022C0
// ============================================================
export function __isatty(_FileHandle) {
  // DEVIATION: C runtime
  // CRT isatty — DEVIATION: C runtime
  return 0;
}


// ============================================================
// _wctomb — convert wide character to multibyte
// Function: _wctomb @ 0x00602310
// ============================================================
export function _wctomb(_MbCh, _WCh) {
  // CRT wctomb — DEVIATION: C runtime
  if (_MbCh === null) {
    return 0;
  }
  return 1;
}


// ============================================================
// __aulldiv — unsigned 64-bit division
// Function: __aulldiv @ 0x006023E0
// ============================================================
export function __aulldiv(param_1, param_2, param_3, param_4) {
  // 64-bit unsigned division using BigInt
  let dividend = (BigInt(param_2 >>> 0) << 32n) | BigInt(param_1 >>> 0);
  let divisor = (BigInt(param_4 >>> 0) << 32n) | BigInt(param_3 >>> 0);
  if (divisor === 0n) return { lo: 0, hi: 0 };
  let result = dividend / divisor;
  return {
    lo: Number(result & 0xFFFFFFFFn) | 0,
    hi: Number((result >> 32n) & 0xFFFFFFFFn) | 0
  };
}


// ============================================================
// __aullrem — unsigned 64-bit remainder
// Function: __aullrem @ 0x00602450
// ============================================================
export function __aullrem(param_1, param_2, param_3, param_4) {
  // 64-bit unsigned remainder using BigInt
  let dividend = (BigInt(param_2 >>> 0) << 32n) | BigInt(param_1 >>> 0);
  let divisor = (BigInt(param_4 >>> 0) << 32n) | BigInt(param_3 >>> 0);
  if (divisor === 0n) return { lo: 0, hi: 0 };
  let result = dividend % divisor;
  return {
    lo: Number(result & 0xFFFFFFFFn) | 0,
    hi: Number((result >> 32n) & 0xFFFFFFFFn) | 0
  };
}


// ============================================================
// __fcloseall — CRT close all open files
// Function: __fcloseall @ 0x006024D0
// ============================================================
export function __fcloseall() {
  // DEVIATION: C runtime
  // CRT fcloseall — DEVIATION: C runtime
  return 0;
}


// ============================================================
// __statusfp — CRT get floating point status
// Function: __statusfp @ 0x00602590
// ============================================================
export function __statusfp() {
  // DEVIATION: C runtime
  // CRT floating point status — DEVIATION: C runtime
  return 0;
}


// ============================================================
// __clearfp — CRT clear floating point status
// Function: __clearfp @ 0x006025C0
// ============================================================
export function __clearfp() {
  // DEVIATION: C runtime
  // CRT clear FP status — DEVIATION: C runtime
  return 0;
}


// ============================================================
// __control87 — CRT floating point control word
// Function: __control87 @ 0x006025F0
// ============================================================
export function __control87(_NewValue, _Mask) {
  // CRT FP control word — DEVIATION: C runtime
  return _NewValue & _Mask;
}


// ============================================================
// __controlfp — CRT floating point control (safe version)
// Function: __controlfp @ 0x00602640
// ============================================================
export function __controlfp(_NewValue, _Mask) {
  let uVar1 = __control87(_NewValue, _Mask & 0xfff7ffff);
  return uVar1;
}


// ============================================================
// __fpreset — CRT floating point reset
// Function: __fpreset @ 0x00602670
// ============================================================
export function __fpreset() {
  // DEVIATION: C runtime
  // CRT FP reset — DEVIATION: C runtime
  return;
}


// ============================================================
// __abstract_cw — CRT abstract control word from hardware
// Function: __abstract_cw @ 0x006026D0
// ============================================================
export function __abstract_cw(param_1) {
  let local_8 = 0;
  if ((param_1 & 1) !== 0) local_8 = 0x10;
  if ((param_1 & 4) !== 0) local_8 = local_8 | 8;
  if ((param_1 & 8) !== 0) local_8 = local_8 | 4;
  if ((param_1 & 0x10) !== 0) local_8 = local_8 | 2;
  if ((param_1 & 0x20) !== 0) local_8 = local_8 | 1;
  if ((param_1 & 2) !== 0) local_8 = local_8 | 0x80000;
  let uVar1 = param_1 & 0xc00;
  if (uVar1 === 0x400) {
    local_8 = local_8 | 0x100;
  } else if (uVar1 === 0x800) {
    local_8 = local_8 | 0x200;
  } else if (uVar1 === 0xc00) {
    local_8 = local_8 | 0x300;
  }
  if ((param_1 & 0x300) === 0) {
    local_8 = local_8 | 0x20000;
  } else if ((param_1 & 0x300) === 0x200) {
    local_8 = local_8 | 0x10000;
  }
  if ((param_1 & 0x1000) !== 0) {
    local_8 = local_8 | 0x40000;
  }
  return local_8;
}


// ============================================================
// __hw_cw — CRT hardware control word from abstract
// Function: __hw_cw @ 0x00602820
// ============================================================
export function __hw_cw(param_1) {
  let uVar1 = (param_1 & 0x10) !== 0 ? 1 : 0;
  if ((param_1 & 8) !== 0) uVar1 = uVar1 | 4;
  if ((param_1 & 4) !== 0) uVar1 = uVar1 | 8;
  if ((param_1 & 2) !== 0) uVar1 = uVar1 | 0x10;
  if ((param_1 & 1) !== 0) uVar1 = uVar1 | 0x20;
  if ((param_1 & 0x80000) !== 0) uVar1 = uVar1 | 2;
  let uVar2 = param_1 & 0x300;
  if (uVar2 === 0x100) {
    uVar1 = uVar1 | 0x400;
  } else if (uVar2 === 0x200) {
    uVar1 = uVar1 | 0x800;
  } else if (uVar2 === 0x300) {
    uVar1 = uVar1 | 0xc00;
  }
  uVar2 = param_1 & 0x30000;
  if (uVar2 === 0) {
    uVar1 = uVar1 | 0x300;
  } else if (uVar2 === 0x10000) {
    uVar1 = uVar1 | 0x200;
  }
  if ((param_1 & 0x40000) !== 0) {
    uVar1 = uVar1 | 0x1000;
  }
  return uVar1;
}


// ============================================================
// __abstract_sw — CRT abstract status word from hardware
// Function: __abstract_sw @ 0x006029F0
// ============================================================
export function __abstract_sw(param_1) {
  let local_8 = 0;
  if ((param_1 & 1) !== 0) local_8 = 0x10;
  if ((param_1 & 4) !== 0) local_8 = local_8 | 8;
  if ((param_1 & 8) !== 0) local_8 = local_8 | 4;
  if ((param_1 & 0x10) !== 0) local_8 = local_8 | 2;
  if ((param_1 & 0x20) !== 0) local_8 = local_8 | 1;
  if ((param_1 & 2) !== 0) local_8 = local_8 | 0x80000;
  return local_8;
}


// ============================================================
// __fptrap — CRT floating point trap handler
// Function: __fptrap @ 0x00602A70
// ============================================================
export function __fptrap() {
  __amsg_exit(2);
  return;
}


// ============================================================
// __ZeroTail — CRT FP mantissa zero tail check
// Function: __ZeroTail @ 0x00602A90
// ============================================================
export function __ZeroTail(param_1, param_2) {
  // FP mantissa internal — checks if all bits after position param_2 are zero
  // param_1 is a 3-element int array (96-bit mantissa)
  let local_10 = (param_2 + (param_2 >> 31 & 0x1f)) >> 5;
  let bVar2 = (param_2 >> 31) & 0xFF;
  let local_8 = 0x1f - ((((param_2 ^ bVar2) - bVar2) & 0x1f ^ bVar2) - bVar2);
  let uVar1 = (~(-1 << (local_8 & 0x1f))) & param_1[local_10];
  while (true) {
    if (uVar1 !== 0) return 0;
    local_10 = local_10 + 1;
    if (2 < local_10) break;
    uVar1 = param_1[local_10];
  }
  return 1;
}


// ============================================================
// __IncMan — CRT FP increment mantissa
// Function: __IncMan @ 0x00602B30
// ============================================================
export function __IncMan(param_1, param_2) {
  // FP mantissa increment at bit position param_2
  let local_10 = (param_2 + (param_2 >> 31 & 0x1f)) >> 5;
  let bVar1 = (param_2 >> 31) & 0xFF;
  let local_8 = 0x1f - ((((param_2 ^ bVar1) - bVar1) & 0x1f ^ bVar1) - bVar1);
  let local_14 = ___addl(param_1[local_10], 1 << (local_8 & 0x1f), param_1, local_10);
  while (local_10 = local_10 + -1, -1 < local_10 && local_14 !== 0) {
    local_14 = ___addl(param_1[local_10], 1, param_1, local_10);
  }
  return local_14;
}


// ============================================================
// __RoundMan — CRT FP round mantissa
// Function: __RoundMan @ 0x00602BF0
// ============================================================
export function __RoundMan(param_1, param_2) {
  let local_1c = 0;
  let local_14 = (param_2 + (param_2 >> 31 & 0x1f)) >> 5;
  let bVar2 = (param_2 >> 31) & 0xFF;
  let local_c = 0x1f - ((((param_2 ^ bVar2) - bVar2) & 0x1f ^ bVar2) - bVar2);
  if ((1 << (local_c & 0x1f) & param_1[local_14]) !== 0) {
    let iVar3 = __ZeroTail(param_1, param_2 + 1);
    if (iVar3 === 0) {
      local_1c = __IncMan(param_1, param_2 + -1);
    }
  }
  param_1[local_14] = param_1[local_14] & (-1 << (local_c & 0x1f));
  let idx = local_14;
  while (idx = idx + 1, idx < 3) {
    param_1[idx] = 0;
  }
  return local_1c;
}


// ============================================================
// __CopyMan — CRT FP copy mantissa (3 ints)
// Function: __CopyMan @ 0x00602CD0
// ============================================================
export function __CopyMan(param_1, param_2) {
  for (let local_10 = 0; local_10 < 3; local_10 = local_10 + 1) {
    param_1[local_10] = param_2[local_10];
  }
  return;
}


// ============================================================
// __FillZeroMan — CRT FP zero-fill mantissa (3 ints)
// Function: __FillZeroMan @ 0x00602D20
// ============================================================
export function __FillZeroMan(param_1) {
  for (let local_8 = 0; local_8 < 3; local_8 = local_8 + 1) {
    param_1[local_8] = 0;
  }
  return;
}


// ============================================================
// __IsZeroMan — CRT FP test if mantissa is zero
// Function: __IsZeroMan @ 0x00602D60
// ============================================================
export function __IsZeroMan(param_1) {
  let local_8 = 0;
  while (true) {
    if (2 < local_8) return 1;
    if (param_1[local_8] !== 0) break;
    local_8 = local_8 + 1;
  }
  return 0;
}


// ============================================================
// __ShrMan — CRT FP shift mantissa right
// Function: __ShrMan @ 0x00602DB0
// ============================================================
export function __ShrMan(param_1, param_2) {
  let iVar3 = (param_2 + (param_2 >> 31 & 0x1f)) >> 5;
  let bVar = (param_2 >> 31) & 0xFF;
  let shift = (((param_2 ^ bVar) - bVar) & 0x1f ^ bVar) - bVar;
  let local_c = 0;
  for (let local_10 = 0; local_10 < 3; local_10 = local_10 + 1) {
    let uVar2 = param_1[local_10];
    param_1[local_10] = (param_1[local_10] >>> (shift & 0x1f)) | local_c;
    local_c = (uVar2 & ~(-1 << (shift & 0x1f))) << (0x20 - shift & 0x1f);
  }
  for (let local_10 = 2; -1 < local_10; local_10 = local_10 + -1) {
    if (local_10 < iVar3) {
      param_1[local_10] = 0;
    } else {
      param_1[local_10] = param_1[local_10 - iVar3];
    }
  }
  return;
}


// ============================================================
// __ld12cvt — CRT long double 12-byte to double/float conversion
// Function: __ld12cvt @ 0x00602EA0
// ============================================================
export function __ld12cvt(param_1, param_2, param_3) {
  // DEVIATION: C runtime
  // FP format conversion — DEVIATION: C runtime
  // Original converts 12-byte long double to IEEE double or float
  return 0;
}


// ============================================================
// FID_conflict___ld12tod — CRT long double 12 to double (variant 1)
// Function: FID_conflict:__ld12tod @ 0x00603110
// ============================================================
export function FID_conflict___ld12tod_1(param_1, param_2) {
  let IVar1 = __ld12cvt(param_1, param_2, G.DAT_0063b280);
  return IVar1;
}


// ============================================================
// FID_conflict___ld12tod — CRT long double 12 to float (variant 2)
// Function: FID_conflict:__ld12tod @ 0x00603140
// ============================================================
export function FID_conflict___ld12tod_2(param_1, param_2) {
  let IVar1 = __ld12cvt(param_1, param_2, G.DAT_0063b298);
  return IVar1;
}


// ============================================================
// __ld12told — CRT long double 12 to long double 10
// Function: __ld12told @ 0x00603170
// ============================================================
export function __ld12told(param_1, param_2) {
  // DEVIATION: C runtime
  // FP format conversion — DEVIATION: C runtime
  return 0;
}


// ============================================================
// FID_conflict___atodbl_1 — CRT string to double (variant 1)
// Function: FID_conflict:__atodbl @ 0x00603240
// ============================================================
export function FID_conflict___atodbl_1(_Result, _Str) {
  // DEVIATION: C runtime
  // CRT atodbl — DEVIATION: C runtime
  return 0;
}


// ============================================================
// __atoldbl — CRT string to long double
// Function: __atoldbl @ 0x00603280
// ============================================================
export function __atoldbl(_Result, _Str) {
  // DEVIATION: C runtime
  // CRT atoldbl — DEVIATION: C runtime
  return 0;
}


// ============================================================
// FID_conflict___atodbl_2 — CRT string to float (variant 2)
// Function: FID_conflict:__atodbl @ 0x006032C0
// ============================================================
export function FID_conflict___atodbl_2(_Result, _Str) {
  // DEVIATION: C runtime
  // CRT atoflt — DEVIATION: C runtime
  return 0;
}


// ============================================================
// __fptostr — CRT floating point to string
// Function: __fptostr @ 0x00603300
// ============================================================
export function __fptostr(_Buf, _SizeInBytes, _Digits, _PtFlt) {
  // DEVIATION: C runtime
  // CRT FP to string conversion — DEVIATION: C runtime
  return 0;
}


// ============================================================
// __fltout — CRT float output formatting
// Function: __fltout @ 0x006033E0
// ============================================================
export function __fltout() {
  // DEVIATION: C runtime
  // CRT FP output — DEVIATION: C runtime
  return null;
}


// ============================================================
// ___dtold — CRT double to long double conversion
// Function: ___dtold @ 0x00603450
// ============================================================
export function ___dtold(param_1, param_2) {
  // DEVIATION: C runtime
  // CRT double to extended FP — DEVIATION: C runtime
  return;
}


// ============================================================
// _wcslen — CRT wide string length
// Function: _wcslen @ 0x006035D0
// ============================================================
export function _wcslen(_Str) {
  // Wide string length — in JS, strings have .length
  if (typeof _Str === 'string') return _Str.length;
  // Array form
  let len = 0;
  while (_Str[len] !== 0) len++;
  return len;
}


// ============================================================
// ___tzset — CRT timezone set (lazy init wrapper)
// Function: ___tzset @ 0x00603620
// ============================================================
export function ___tzset() {
  if (G.DAT_0063b36c === 0) {
    __tzset();
    G.DAT_0063b36c = G.DAT_0063b36c + 1;
  }
  return;
}


// ============================================================
// __tzset — CRT timezone set (full implementation)
// Function: __tzset @ 0x00603650
// ============================================================
export function __tzset() {
  // Win32 GetTimeZoneInformation + TZ env var parsing — DEVIATION: C runtime
  // Original reads TZ environment variable or queries Windows timezone
  G.DAT_006e55e0 = 0;
  G.DAT_0063b360 = -1;
  G.DAT_0063b350 = -1;
  // In a JS environment, we don't have the TZ env var or Win32 APIs
  return;
}


// ============================================================
// __isindst — CRT check if time is in DST
// Function: __isindst @ 0x006039B0
// ============================================================
export function __isindst(_Time) {
  let iVar1;

  if (G.DAT_0063b2b4 === 0) {
    return 0;
  }
  if (_Time.tm_year !== G.DAT_0063b350 || _Time.tm_year !== G.DAT_0063b360) {
    if (G.DAT_006e55e0 === 0) {
      cvtdate(1, 1, _Time.tm_year, 4, 1, 0, 0, 2, 0, 0, 0);
      cvtdate(0, 1, _Time.tm_year, 10, 5, 0, 0, 2, 0, 0, 0);
    } else {
      if (G.DAT_006e5680 === 0) {
        cvtdate(1, 1, _Time.tm_year, G.DAT_006e5682, G.DAT_006e5686, G.DAT_006e5684, 0,
                G.DAT_006e5688, G.DAT_006e568a, G.DAT_006e568c, G.DAT_006e568e);
      } else {
        cvtdate(1, 0, _Time.tm_year, G.DAT_006e5682, 0, 0, G.DAT_006e5686,
                G.DAT_006e5688, G.DAT_006e568a, G.DAT_006e568c, G.DAT_006e568e);
      }
      if (G.DAT_006e562c === 0) {
        cvtdate(0, 1, _Time.tm_year, G.DAT_006e562e, G.DAT_006e5632, G.DAT_006e5630, 0,
                G.DAT_006e5634, G.DAT_006e5636, G.DAT_006e5638, G.DAT_006e563a);
      } else {
        cvtdate(0, 0, _Time.tm_year, G.DAT_006e562e, 0, 0, G.DAT_006e5632,
                G.DAT_006e5634, G.DAT_006e5636, G.DAT_006e5638, G.DAT_006e563a);
      }
    }
  }
  if (G.DAT_0063b354 < G.DAT_0063b364) {
    if (_Time.tm_yday < G.DAT_0063b354 || G.DAT_0063b364 < _Time.tm_yday) {
      return 0;
    }
    if (G.DAT_0063b354 < _Time.tm_yday && _Time.tm_yday < G.DAT_0063b364) {
      return 1;
    }
  } else {
    if (_Time.tm_yday < G.DAT_0063b364 || G.DAT_0063b354 < _Time.tm_yday) {
      return 1;
    }
    if (G.DAT_0063b364 < _Time.tm_yday && _Time.tm_yday < G.DAT_0063b354) {
      return 0;
    }
  }
  iVar1 = (_Time.tm_hour * 0xe10 + _Time.tm_min * 0x3c + _Time.tm_sec) * 1000;
  if (_Time.tm_yday === G.DAT_0063b354) {
    if (iVar1 < G.DAT_0063b358) {
      iVar1 = 0;
    } else {
      iVar1 = 1;
    }
  } else if (iVar1 < G.DAT_0063b368) {
    iVar1 = 1;
  } else {
    iVar1 = 0;
  }
  return iVar1;
}


// ============================================================
// cvtdate — CRT convert DST transition date to day-of-year
// Function: cvtdate @ 0x00603D20
// ============================================================
export function cvtdate(param_1, param_2, param_3, param_4, param_5, param_6, param_7,
                        param_8, param_9, param_10, param_11) {
  let iVar1;
  let local_14;
  let local_10;
  let local_c;

  if (param_2 === 1) {
    if ((param_3 & 3) === 0) {
      local_10 = G.DAT_0063b370[param_4]; // leap year day-of-year table
    } else {
      local_10 = G.DAT_0063b3a4[param_4]; // normal year day-of-year table
    }
    iVar1 = ((param_3 - 0x46) * 0x16d + ((param_3 - 1) >> 2) + -0xd + local_10 + 1) % 7;
    if (iVar1 < param_6) {
      local_c = (param_6 - iVar1) + (param_5 + -1) * 7;
    } else {
      local_c = (param_6 - iVar1) + param_5 * 7;
    }
    local_c = local_10 + 1 + local_c;
    if (param_5 === 5) {
      if ((param_3 & 3) === 0) {
        local_14 = G.DAT_0063b370[param_4];
      } else {
        local_14 = G.DAT_0063b3a4[param_4 + 1]; // next month start
      }
      if (local_14 < local_c) {
        local_c = local_c + -7;
      }
    }
  } else {
    if ((param_3 & 3) === 0) {
      local_c = G.DAT_0063b370[param_4];
    } else {
      local_c = G.DAT_0063b3a4[param_4];
    }
    local_c = local_c + param_7;
  }
  if (param_1 === 1) {
    G.DAT_0063b354 = local_c;
    G.DAT_0063b358 = ((param_8 * 0x3c + param_9) * 0x3c + param_10) * 1000 + param_11;
    G.DAT_0063b350 = param_3;
  } else {
    G.DAT_0063b364 = local_c;
    G.DAT_0063b368 = ((param_8 * 0x3c + param_9) * 0x3c + param_10) * 1000 + param_11 +
                   G.DAT_0063b2b8 * 1000;
    if (G.DAT_0063b368 < 0) {
      G.DAT_0063b368 = G.DAT_0063b368 + 86399999;
    } else if (86399999 < G.DAT_0063b368) {
      G.DAT_0063b368 = G.DAT_0063b368 + -86399999;
    }
    G.DAT_0063b360 = param_3;
  }
  return;
}


// ============================================================
// __chsize — CRT change file size
// Function: __chsize @ 0x00603F30
// ============================================================
export function __chsize(_FileHandle, _Size) {
  // Win32 SetEndOfFile — DEVIATION: C runtime
  G.DAT_00639f14 = 9;
  return -1;
}


// ============================================================
// ___addl — CRT FP add with carry (32-bit)
// Function: ___addl @ 0x006041E0
// ============================================================
export function ___addl(param_1, param_2, param_3, idx) {
  let local_c = 0;
  let uVar1 = ((param_1 >>> 0) + (param_2 >>> 0)) >>> 0;
  if (uVar1 < (param_1 >>> 0) || uVar1 < (param_2 >>> 0)) {
    local_c = 1;
  }
  if (Array.isArray(param_3)) {
    param_3[idx] = uVar1;
  }
  return local_c;
}


// ============================================================
// ___add_12 — CRT FP add two 12-byte (96-bit) values
// Function: ___add_12 @ 0x00604230
// ============================================================
export function ___add_12(param_1, param_2) {
  let iVar1 = ___addl(param_1[0], param_2[0], param_1, 0);
  if (iVar1 !== 0) {
    iVar1 = ___addl(param_1[1], 1, param_1, 1);
    if (iVar1 !== 0) {
      param_1[2] = param_1[2] + 1;
    }
  }
  iVar1 = ___addl(param_1[1], param_2[1], param_1, 1);
  if (iVar1 !== 0) {
    param_1[2] = param_1[2] + 1;
  }
  ___addl(param_1[2], param_2[2], param_1, 2);
  return;
}


// ============================================================
// ___shl_12 — CRT FP shift left 12-byte value by 1
// Function: ___shl_12 @ 0x006042E0
// ============================================================
export function ___shl_12(param_1) {
  let local_8 = ((param_1[0] & 0x80000000) !== 0) ? 1 : 0;
  let local_c = ((param_1[1] & 0x80000000) !== 0) ? 1 : 0;
  param_1[0] = (param_1[0] << 1) >>> 0;
  param_1[1] = ((param_1[1] * 2) | local_8) >>> 0;
  param_1[2] = ((param_1[2] * 2) | local_c) >>> 0;
  return;
}


// ============================================================
// ___shr_12 — CRT FP shift right 12-byte value by 1
// Function: ___shr_12 @ 0x00604360
// ============================================================
export function ___shr_12(param_1) {
  let local_c = (param_1[2] & 1) === 0 ? 0 : 0x80000000;
  let local_8 = (param_1[1] & 1) === 0 ? 0 : 0x80000000;
  param_1[2] = (param_1[2] >>> 1);
  param_1[1] = (param_1[1] >>> 1) | local_c;
  param_1[0] = (param_1[0] >>> 1) | local_8;
  return;
}


// ============================================================
// ___mtold12 — CRT FP convert mantissa string to 12-byte float
// Function: ___mtold12 @ 0x006043E0
// ============================================================
export function ___mtold12(param_1, param_2, param_3) {
  // Convert digit string to 12-byte internal float representation
  let local_14 = 0x404e;
  param_3[0] = 0;
  param_3[1] = 0;
  param_3[2] = 0;
  let arr = param_1;
  let len = param_2;
  for (let i = 0; i < len; i++) {
    let local_10 = [param_3[0], param_3[1], param_3[2]];
    ___shl_12(param_3);
    ___shl_12(param_3);
    ___add_12(param_3, local_10);
    ___shl_12(param_3);
    let digit = [typeof arr === 'string' ? arr.charCodeAt(i) : arr[i], 0, 0];
    ___add_12(param_3, digit);
  }
  while (param_3[2] === 0) {
    param_3[2] = param_3[1] >>> 0x10;
    param_3[1] = ((param_3[1] << 0x10) | (param_3[0] >>> 0x10)) >>> 0;
    param_3[0] = (param_3[0] << 0x10) >>> 0;
    local_14 = local_14 - 0x10;
  }
  while (((param_3[2] >>> 24) & 0x80) === 0) {
    ___shl_12(param_3);
    local_14 = local_14 - 1;
  }
  // Store exponent at bytes 10-11 of the 12-byte structure
  param_3.exponent = local_14;
  return;
}


// ============================================================
// ___strgtold12 — CRT FP string to 12-byte long double
// Function: ___strgtold12 @ 0x00604520
// ============================================================
export function ___strgtold12(pld12, p_end_ptr, str, mult12, scale, decpt, implicit_E) {
  // CRT string-to-long-double parser — DEVIATION: C runtime
  // The original is a 2795-byte state machine that parses floating point
  // number strings including sign, digits, decimal point, and exponent.
  // In JS, we can use parseFloat as a DEVIATION: C runtime.
  let val = parseFloat(str);
  if (p_end_ptr) {
    p_end_ptr[0] = str;
  }
  // Store into pld12 as a DEVIATION: C runtime
  if (Array.isArray(pld12)) {
    pld12[0] = 0;
    pld12[1] = 0;
    pld12[2] = 0;
  }
  let local_48 = 0;
  if (isNaN(val) || val === 0) {
    local_48 = local_48 | 4;
  }
  return local_48;
}


// ============================================================
// ___STRINGTOLD — CRT string to long double
// Function: ___STRINGTOLD @ 0x00605140
// ============================================================
export function ___STRINGTOLD(pld, p_end_ptr, str, mult12) {
  let local_10 = [0, 0, 0];
  let local_18 = ___strgtold12(local_10, p_end_ptr, str, mult12, 0, 0, 0);
  let IVar1 = __ld12told(local_10, pld);
  if (IVar1 === 1) { // INTRNCVT_OVERFLOW
    local_18 = local_18 | 2;
  }
  return local_18;
}


// ============================================================
// _I10_OUTPUT — CRT internal decimal output for FP numbers
// Function: $I10_OUTPUT @ 0x006051A0
// ============================================================
export function _I10_OUTPUT(param_1, param_2, param_3, param_4, param_5, param_6) {
  // CRT internal FP to decimal conversion — 1335-byte function
  // This is the core routine that converts an 80-bit extended float
  // to a decimal string for printf-style output. DEVIATION: C runtime.
  return 1;
}


// ============================================================
// _wcstombs — CRT wide string to multibyte string
// Function: _wcstombs @ 0x006056E0
// ============================================================
export function _wcstombs(_Dest, _Source, _MaxCount) {
  // CRT wcstombs — DEVIATION: C runtime
  // In JS, we don't have the MBCS concept
  if (_Dest === null) {
    if (typeof _Source === 'string') return _Source.length;
    return 0;
  }
  return 0;
}


// ============================================================
// wcsncnt — CRT count wide chars up to limit (first occurrence)
// Function: wcsncnt @ 0x00605A40
// ============================================================
export function wcsncnt_1(param_1, param_2) {
  // Count chars up to limit, accounting for null terminator
  let local_c = param_2 + 1;
  let idx = 0;
  while (local_c = local_c - 1, local_c !== 0 && param_1[idx] !== 0) {
    idx++;
  }
  if (local_c !== 0 && param_1[idx] === 0) {
    param_2 = idx + 1;
  }
  return param_2;
}


// ============================================================
// _getenv — CRT get environment variable
// Function: _getenv @ 0x00605AB0
// ============================================================
export function _getenv(_VarName) {
  // DEVIATION: C runtime
  // CRT getenv — DEVIATION: C runtime
  // In a browser/Node.js context, we could use process.env
  // but for CRT fidelity, return null
  return null;
}


// ============================================================
// __setmode — CRT set file translation mode
// Function: __setmode @ 0x00605BA0
// ============================================================
export function __setmode(_FileHandle, _Mode) {
  // CRT setmode (text/binary) — DEVIATION: C runtime
  G.DAT_00639f14 = 9;
  return -1;
}


// ============================================================
// ___ld12mul — CRT FP 12-byte multiply
// Function: ___ld12mul @ 0x00605CE0
// ============================================================
export function ___ld12mul(param_1, param_2) {
  // CRT 12-byte long double multiply — 1063-byte function
  // Internal FP multiply for decimal-to-binary conversion.
  // DEVIATION: C runtime — complex bit manipulation of 96-bit mantissas
  return;
}


// ============================================================
// ___multtenpow12 — CRT FP multiply by power of 10
// Function: ___multtenpow12 @ 0x00606110
// ============================================================
export function ___multtenpow12(param_1, param_2, param_3) {
  // DEVIATION: C runtime
  // CRT multiply 12-byte float by 10^param_2 — DEVIATION: C runtime
  // Uses precomputed table of powers of 10 in 12-byte format
  return;
}


// ============================================================
// __mbsnbicoll — CRT multibyte case-insensitive collation compare
// Function: __mbsnbicoll @ 0x006061F0
// ============================================================
export function __mbsnbicoll(_Str1, _Str2, _MaxCount) {
  // CRT mbsnbicoll — DEVIATION: C runtime — case-insensitive compare
  if (_MaxCount === 0) return 0;
  let s1 = typeof _Str1 === 'string' ? _Str1.substring(0, _MaxCount).toLowerCase() : '';
  let s2 = typeof _Str2 === 'string' ? _Str2.substring(0, _MaxCount).toLowerCase() : '';
  if (s1 < s2) return -1;
  if (s1 > s2) return 1;
  return 0;
}


// ============================================================
// ___wtomb_environ — CRT convert wide environment to multibyte
// Function: ___wtomb_environ @ 0x00606260
// ============================================================
export function ___wtomb_environ() {
  // DEVIATION: C runtime
  // CRT wide-to-multibyte environment conversion — DEVIATION: C runtime
  return 0;
}


// ============================================================
// ___crtCompareStringW — CRT wide string comparison wrapper
// Function: ___crtCompareStringW @ 0x00606330
// ============================================================
export function ___crtCompareStringW(_LocaleName, _DwCmpFlags, _LpString1, _CchCount1, _LpString2, _CchCount2) {
  // Win32 CompareStringW wrapper — DEVIATION: C runtime
  return 2; // CSTR_EQUAL
}


// ============================================================
// wcsncnt — CRT count wide chars (second copy)
// Function: wcsncnt @ 0x00606620
// ============================================================
export function wcsncnt_2(param_1, param_2) {
  let local_c = param_2;
  let idx = 0;
  while (local_c !== 0 && param_1[idx] !== 0) {
    local_c = local_c - 1;
    idx++;
  }
  if (param_1[idx] === 0) {
    param_2 = idx;
  }
  return param_2;
}


// ============================================================
// ___crtCompareStringA — CRT ANSI string comparison wrapper
// Function: ___crtCompareStringA @ 0x00606690
// ============================================================
export function ___crtCompareStringA(_Plocinfo, _LocaleName, _DwCmpFlags, _LpString1, _CchCount1, _LpString2, _CchCount2, _Code_page) {
  // Win32 CompareStringA wrapper — DEVIATION: C runtime
  return 2; // CSTR_EQUAL
}


// ============================================================
// _strncnt — CRT count ANSI chars up to limit
// Function: _strncnt @ 0x00606AF0
// ============================================================
export function _strncnt(_String, _Cnt) {
  let local_c = _Cnt;
  let idx = 0;
  if (typeof _String === 'string') {
    while (local_c !== 0 && idx < _String.length && _String[idx] !== '\0') {
      local_c = local_c - 1;
      idx++;
    }
    if (idx < _String.length && _String[idx] === '\0') {
      _Cnt = idx;
    }
  }
  return _Cnt;
}


// ============================================================
// ___crtsetenv — CRT internal set environment variable
// Function: ___crtsetenv @ 0x00606B60
// ============================================================
export function ___crtsetenv(_POption, _Primary) {
  // DEVIATION: C runtime
  // CRT internal setenv — DEVIATION: C runtime
  return 0;
}


// ============================================================
// findenv — CRT internal find environment variable
// Function: findenv @ 0x00606ED0
// ============================================================
export function findenv(param_1, param_2) {
  // CRT internal env lookup — DEVIATION: C runtime
  return -1;
}


// ============================================================
// copy_environ — CRT copy environment block
// Function: copy_environ @ 0x00606F70
// ============================================================
export function copy_environ(param_1) {
  // DEVIATION: C runtime
  // CRT copy environment array — DEVIATION: C runtime
  return null;
}


// ============================================================
// __mbschr — CRT multibyte string find character
// Function: __mbschr @ 0x00607070
// ============================================================
export function __mbschr(_Str, _Ch) {
  // CRT mbschr — DEVIATION: C runtime — indexOf
  if (typeof _Str === 'string') {
    let ch = String.fromCharCode(_Ch);
    let idx = _Str.indexOf(ch);
    if (idx === -1) return null;
    return _Str.substring(idx);
  }
  return null;
}


// ============================================================
// __filelength — CRT get file length
// Function: __filelength @ 0x006075E0
// ============================================================
export function __filelength(_FileHandle) {
  // CRT filelength — DEVIATION: C runtime
  G.DAT_00639f14 = 9;
  G.DAT_00639f18 = 0;
  return -1;
}


// ============================================================
// FUN_006076a0 — get field at offset 0x10 from struct pointer
// Function: FUN_006076a0 @ 0x006076A0
// ============================================================
// Source: decompiled/block_00600000.c FUN_006076a0 (22 bytes)
export function FUN_006076a0(param_1) {
  // DEVIATION: C runtime
  return 0;
}


// ============================================================
// __strupr — CRT string to uppercase
// Function: __strupr @ 0x006076C0
// ============================================================
export function __strupr(_String) {
  if (typeof _String === 'string') {
    return _String.toUpperCase();
  }
  // Array/buffer form
  if (Array.isArray(_String)) {
    for (let i = 0; i < _String.length; i++) {
      if (_String[i] === 0) break;
      if (_String[i] >= 0x61 && _String[i] <= 0x7a) { // 'a'-'z'
        _String[i] = _String[i] - 0x20;
      }
    }
  }
  return _String;
}


// ============================================================
// __strlwr — CRT string to lowercase
// Function: __strlwr @ 0x006077F0
// ============================================================
export function __strlwr(_String) {
  if (typeof _String === 'string') {
    return _String.toLowerCase();
  }
  // Array/buffer form
  if (Array.isArray(_String)) {
    for (let i = 0; i < _String.length; i++) {
      if (_String[i] === 0) break;
      if (_String[i] >= 0x41 && _String[i] <= 0x5a) { // 'A'-'Z'
        _String[i] = _String[i] + 0x20;
      }
    }
  }
  return _String;
}


// ============================================================
// FID_conflict___mkdir — CRT create directory
// Function: FID_conflict:__mkdir @ 0x00607920
// ============================================================
export function FID_conflict___mkdir(_Path) {
  // Win32 CreateDirectoryA — DEVIATION: C runtime
  return -1;
}


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION DECLARATIONS (from other blocks)
// ═══════════════════════════════════════════════════════════════════

// FUN_005f22d0 — strcpy (from block_005F0000)
export function FUN_005f22d0(dest, src) {
  // CRT strcpy equivalent
  if (typeof src === 'string' && typeof dest === 'string') {
    return src;
  }
  return dest;
}

// FUN_005f22e0 — strcat (from block_005F0000)
export function FUN_005f22e0(dest, src) {
  // CRT strcat equivalent
  return dest;
}

// FUN_005f35f0 — __chkstk / stack probe (from block_005F0000)
// Source: decompiled/block_005F0000.c FUN_005f35f0 (47 bytes)
export function FUN_005f35f0() {
  // DEVIATION: C runtime
}

// FID_conflict__memcpy — memcpy (from another block)
export function FID_conflict__memcpy(dest, src, len) {
  // CRT memcpy — DEVIATION: C runtime
  return dest;
}

// __amsg_exit — CRT fatal message and exit (from CRT)
export function __amsg_exit(param_1) {
  // DEVIATION: C runtime
  // CRT amsg_exit — DEVIATION: C runtime
  return;
}

// __exit — CRT process exit (from CRT)
export function __exit(param_1) {
  // CRT _exit — DEVIATION: C runtime
  throw new Error('CRT __exit called with code ' + param_1);
}

// __CrtDbgReport — CRT debug report (from CRT)
export function __CrtDbgReport(...args) {
  // DEVIATION: C runtime — always return 0 (continue)
  return 0;
}

// __stbuf / __ftbuf — CRT stream buffering (from CRT)
// Source: decompiled/block_005F0000.c __stbuf (190 bytes)
export function __stbuf(_File) {
  // DEVIATION: C runtime
  return 0;
}
// Source: decompiled/block_005F0000.c __ftbuf (70 bytes)
export function __ftbuf(param_1, _File) {
  // DEVIATION: C runtime
}

// __output — CRT formatted output core (from CRT)
// Source: decompiled/block_005F0000.c __output (3279 bytes)
export function __output(_File, _Format, ...args) {
  // DEVIATION: C runtime  return 0;
}

// __flush / __freebuf — CRT stream flush/free (from CRT)
// Source: decompiled/block_005F0000.c __flush (108 bytes)
export function __flush(_File) {
  // DEVIATION: C runtime
}
// Source: decompiled/block_005F0000.c __freebuf (58 bytes)
export function __freebuf(_File) {
  // DEVIATION: C runtime
}

// __malloc_dbg / __calloc_dbg / __free_dbg / __realloc_dbg — CRT debug heap (from CRT)
export function __malloc_dbg(size, ...args) { return new Array(size).fill(0); }
export function __calloc_dbg(num, size, ...args) { return new Array(num * size).fill(0); }
// Source: decompiled/block_005F0000.c __free_dbg (1057 bytes)
export function __free_dbg(ptr, ...args) {
  // DEVIATION: C runtime
}
// Source: decompiled/block_005F0000.c __realloc_dbg (55 bytes)
export function __realloc_dbg(ptr, size, ...args) {
  // DEVIATION: C runtime  return ptr;
}

// __flsbuf — CRT flush buffer (from CRT)
// Source: decompiled/block_005F0000.c __flsbuf (328 bytes)
export function __flsbuf(ch, _File) {
  // DEVIATION: C runtime  return 0;
}

// __lseek — CRT file seek (from CRT)
export function __lseek(fh, offset, origin) { return -1; }

// __read — CRT file read (from CRT)
// Source: decompiled/block_005F0000.c __read (1114 bytes)
export function __read(fh, buf, count) {
  // DEVIATION: C runtime  return 0;
}

// __write — CRT file write (from CRT)
export function __write(fh, buf, count) { return -1; }

// __close — CRT file close (from CRT)
export function __close(fh) { return -1; }

// _fclose — CRT fclose (from CRT)
// Source: decompiled/block_005F0000.c _fclose (120 bytes)
export function _fclose(_File) {
  // DEVIATION: C runtime  return 0;
}

// __dosmaperr — CRT map DOS error to errno (from CRT)
// Source: decompiled/block_005F0000.c __dosmaperr (89 bytes)
export function __dosmaperr(err) {
  // DEVIATION: C runtime
}

// _strlen — CRT string length (from CRT)
export function _strlen(str) {
  if (typeof str === 'string') return str.length;
  return 0;
}

// _strncpy — CRT string copy with length (from CRT)
export function _strncpy(dest, src, len) { return dest; }

// _strcmp — CRT string compare (from CRT)
export function _strcmp(s1, s2) {
  if (s1 < s2) return -1;
  if (s1 > s2) return 1;
  return 0;
}

// _strchr — CRT find char in string (from CRT)
export function _strchr(str, ch) {
  if (typeof str === 'string') {
    let c = String.fromCharCode(ch);
    let idx = str.indexOf(c);
    if (idx === -1) return null;
    return str.substring(idx);
  }
  return null;
}

// _atol — CRT string to long (from CRT)
export function _atol(str) {
  if (typeof str === 'string') return parseInt(str, 10) || 0;
  return 0;
}

// _memset — CRT memory set (from CRT)
export function _memset(buf, val, len) {
  if (Array.isArray(buf)) {
    for (let i = 0; i < len; i++) buf[i] = val;
  }
  return buf;
}

// __isctype — CRT character type check (from CRT)
export function __isctype(ch, mask) {
  // DEVIATION: C runtime — mask 4 = digit check
  if (mask === 4) {
    return (ch >= 0x30 && ch <= 0x39) ? 4 : 0;
  }
  return 0;
}

// _atexit — CRT register exit handler (from CRT)
// Source: decompiled/block_005F0000.c _atexit (48 bytes)
export function _atexit(func) {
  // DEVIATION: C runtime  return 0;
}

// __setdefaultprecision — CRT FP default precision (from CRT)
// Source: decompiled/block_005F0000.c __setdefaultprecision (80 bytes)
export function __setdefaultprecision() {
  // DEVIATION: C runtime
}

// ___crtLCMapStringA — CRT locale map string wrapper (from CRT)
// Source: decompiled/block_005F0000.c ___crtLCMapStringA (576 bytes)
export function ___crtLCMapStringA(...args) {
  // DEVIATION: C runtime  return 0;
}

// terminate — C++ terminate handler (from CRT)
// Source: decompiled/block_005F0000.c terminate (38 bytes)
export function terminate() {
  // DEVIATION: C runtime
}
