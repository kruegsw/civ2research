// Block 0x005F0000 — Ghidra P-code transpiler (wired)
// Source: civ2.exe (Civilization II MGE)
// Functions: 346

import '../globals-init.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32, w16r, w32r, _MEM } from '../mem.js';
import { FUN_0055add0 } from './block_00550000.js';
import { FUN_005e0cc0, FUN_005e6297, FUN_005e635f, FUN_005e8e06, FUN_005e8f4b, FUN_005ef4e3 } from './block_005E0000.js';
import { FUN_005ef65a } from './block_005E0000.js';
import { FID_conflict:__atodbl, _ValidateExecute, _ValidateRead, _ValidateWrite, __NMSG_WRITE, ___crtGetStringTypeA } from './block_00600000.js';
import { ___crtMessageBoxA, ___loctotime_t, __aulldiv, __aullrem, __commit, __controlfp } from './block_00600000.js';
import { __fcloseall, __fltout, __fptostr, __free_osfhnd, __get_osfhandle, __isatty } from './block_00600000.js';
import { __itoa, __snprintf, __sopen, __vsnprintf, _abort, _fprintf } from './block_00600000.js';
import { _raise, _setvbuf, _wcslen, _wctomb } from './block_00600000.js';
// Unresolved: RtlUnwind

const DAT_00000000 = globalThis.DAT_00000000, DAT_00000004 = globalThis.DAT_00000004, DAT_00000006 = globalThis.DAT_00000006, DAT_00000008 = globalThis.DAT_00000008, DAT_0000000c = globalThis.DAT_0000000c, DAT_00000010 = globalThis.DAT_00000010;
const DAT_00000014 = globalThis.DAT_00000014, DAT_00000018 = globalThis.DAT_00000018, DAT_0000001c = globalThis.DAT_0000001c, DAT_0061d790 = globalThis.DAT_0061d790, DAT_0061d7a0 = globalThis.DAT_0061d7a0, DAT_0061d7b0 = globalThis.DAT_0061d7b0;
const DAT_0061dc40 = globalThis.DAT_0061dc40, DAT_0061e2f0 = globalThis.DAT_0061e2f0, DAT_0061e438 = globalThis.DAT_0061e438, DAT_0061e448 = globalThis.DAT_0061e448, DAT_0061e460 = globalThis.DAT_0061e460, DAT_0061e470 = globalThis.DAT_0061e470;
const DAT_0061e480 = globalThis.DAT_0061e480, DAT_0061e498 = globalThis.DAT_0061e498, DAT_0061e724 = globalThis.DAT_0061e724, DAT_0061e748 = globalThis.DAT_0061e748, DAT_00624000 = globalThis.DAT_00624000, DAT_006245a8 = globalThis.DAT_006245a8;
const DAT_006246ac = globalThis.DAT_006246ac, DAT_006248bc = globalThis.DAT_006248bc, DAT_006249c0 = globalThis.DAT_006249c0, DAT_00624bc8 = globalThis.DAT_00624bc8, DAT_00624ccc = globalThis.DAT_00624ccc, DAT_00624dd0 = globalThis.DAT_00624dd0;
const DAT_0063a030 = globalThis.DAT_0063a030, DAT_0063a038 = globalThis.DAT_0063a038, DAT_0063a048 = globalThis.DAT_0063a048, DAT_0063a09a = globalThis.DAT_0063a09a, DAT_0063a2b0 = globalThis.DAT_0063a2b0, DAT_0063a2b8 = globalThis.DAT_0063a2b8;
const DAT_0063a2bc = globalThis.DAT_0063a2bc, DAT_0063a420 = globalThis.DAT_0063a420, DAT_0063ac68 = globalThis.DAT_0063ac68, DAT_0063ac78 = globalThis.DAT_0063ac78, DAT_0063ac98 = globalThis.DAT_0063ac98, DAT_0063af08 = globalThis.DAT_0063af08;
const DAT_0063afa0 = globalThis.DAT_0063afa0, DAT_0063afa1 = globalThis.DAT_0063afa1, DAT_0063b0b0 = globalThis.DAT_0063b0b0, DAT_0063b0c0 = globalThis.DAT_0063b0c0, DAT_0063b0c8 = globalThis.DAT_0063b0c8, DAT_0063b0cc = globalThis.DAT_0063b0cc;
const DAT_0063b0d8 = globalThis.DAT_0063b0d8, DAT_006e54a8 = globalThis.DAT_006e54a8, DAT_006e69f0 = globalThis.DAT_006e69f0, DAT_ffffcfd8 = globalThis.DAT_ffffcfd8, DAT_ffffcfec = globalThis.DAT_ffffcfec, DAT_ffffcff5 = globalThis.DAT_ffffcff5;
const DAT_ffffdff4 = globalThis.DAT_ffffdff4, DAT_ffffdff5 = globalThis.DAT_ffffdff5, DAT_ffffeef0 = globalThis.DAT_ffffeef0, DAT_ffffeffc = globalThis.DAT_ffffeffc, DAT_ffffeffd = globalThis.DAT_ffffeffd, DAT_fffffbe4 = globalThis.DAT_fffffbe4;
const DAT_fffffbe8 = globalThis.DAT_fffffbe8, DAT_fffffcd8 = globalThis.DAT_fffffcd8, DAT_fffffd74 = globalThis.DAT_fffffd74, DAT_fffffd98 = globalThis.DAT_fffffd98, DAT_fffffdbc = globalThis.DAT_fffffdbc, DAT_fffffdd0 = globalThis.DAT_fffffdd0;
const DAT_fffffdd4 = globalThis.DAT_fffffdd4, DAT_fffffde0 = globalThis.DAT_fffffde0, DAT_fffffee8 = globalThis.DAT_fffffee8, DAT_fffffef0 = globalThis.DAT_fffffef0, DAT_fffffef4 = globalThis.DAT_fffffef4, DAT_ffffff2c = globalThis.DAT_ffffff2c;
const DAT_ffffff84 = globalThis.DAT_ffffff84, DAT_ffffffa0 = globalThis.DAT_ffffffa0, DAT_ffffffb4 = globalThis.DAT_ffffffb4, DAT_ffffffbc = globalThis.DAT_ffffffbc, DAT_ffffffc8 = globalThis.DAT_ffffffc8, DAT_ffffffcc = globalThis.DAT_ffffffcc;
const DAT_ffffffd3 = globalThis.DAT_ffffffd3, DAT_ffffffd4 = globalThis.DAT_ffffffd4, DAT_ffffffd8 = globalThis.DAT_ffffffd8, DAT_ffffffdc = globalThis.DAT_ffffffdc, DAT_ffffffe0 = globalThis.DAT_ffffffe0, DAT_ffffffe4 = globalThis.DAT_ffffffe4;
const DAT_ffffffe8 = globalThis.DAT_ffffffe8, DAT_ffffffec = globalThis.DAT_ffffffec, DAT_fffffff0 = globalThis.DAT_fffffff0, DAT_fffffff4 = globalThis.DAT_fffffff4, DAT_fffffff8 = globalThis.DAT_fffffff8, DAT_fffffffc = globalThis.DAT_fffffffc;
const PTR_DAT_00639f88 = globalThis.PTR_DAT_00639f88, PTR_DAT_0063ac58 = globalThis.PTR_DAT_0063ac58, PTR_FUN_0061d720 = globalThis.PTR_FUN_0061d720, PTR_LOOP_0063a438 = globalThis.PTR_LOOP_0063a438, s_Assertion_failed:_%s,_file_%s,_l_00639fe0 = globalThis.s_Assertion_failed:_%s,_file_%s,_l_00639fe0, s_D:\Ss\Smeds32\ddcntrl.cpp_00639dcc = globalThis.s_D:\Ss\Smeds32\ddcntrl.cpp_00639dcc;
const s_D:\Ss\Smeds32\ddcntrl.cpp_00639e08 = globalThis.s_D:\Ss\Smeds32\ddcntrl.cpp_00639e08, s_GetParentGameWin()_00639e24 = globalThis.s_GetParentGameWin()_00639e24, s_pParentWin_||_pParentControl_00639de8 = globalThis.s_pParentWin_||_pParentControl_00639de8;


 export function FUN_005f0056 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005ef65a(s32(in_ECX, 0x2c));
  if ((s32(in_ECX, 0x2e) === 0)) {
    uVar1 = FUN_005e0cc0();
    FUN_005e8e06(s32(in_ECX, 0), uVar1);
    w32(in_ECX, 0x2e, 1);
  }
  return;
}


 export function FUN_005f00b8 (in_ECX)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_14;

  FUN_006e7d90(DAT_ffffffec, 0, 0, s32((s32(in_ECX, 0x2c) + 0xc), 0), s32((s32(in_ECX, 0x2c) + 8), 0));
  FUN_005ef65a(s32(in_ECX, 0x2c));
  iVar1 = FUN_005e6297(DAT_ffffffec, s32(in_ECX, 0x2d));
  if ((iVar1 === 1)) {
    if ((s32(in_ECX, 0x2e) === 0)) {
      uVar2 = FUN_005e0cc0();
      FUN_005e8e06(s32(in_ECX, 0), uVar2);
      w32(in_ECX, 0x2e, 1);
    }
    FUN_005f02f3();
  }
  return;
}


 export function FUN_005f0169 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005ef4e3(s32((in_ECX + 0xb0), 0), param_1, param_2, param_3);
  FUN_005f00b8();
  return uVar1;
}


 export function FUN_005f01ad (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32(in_ECX, 0x2b, param_1);
  if ((s32(in_ECX, 0) === 0)) {
    w32(in_ECX, 0x2e, 0);
  }
  else {
    uVar1 = FUN_005e0cc0();
    FUN_005e8e06(s32(in_ECX, 0), uVar1);
    w32(in_ECX, 0x2e, 1);
  }
  return;
}


 export function FUN_005f0213 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let ptVar2;
  let local_14;

  FUN_006e7d90(DAT_ffffffec, 0, 0, s32(in_ECX, 2), s32(in_ECX, 1));
  ptVar2 = DAT_ffffffec;
  uVar1 = FUN_005e8f4b(s32(in_ECX, 0), ptVar2, in_ECX);
  FUN_005e635f(uVar1, ptVar2, in_ECX);
  return;
}


 export function FUN_005f0266 (param_1)

 {
  FUN_005f05b0();
  FUN_005f05f0(param_1);
  return;
}


 export function FUN_005f029e ()

 {
  let local_8;

  local_8 = FUN_005f0590();
  while ((local_8 !== 0)) {
    FUN_005f0c69();
    local_8 = FUN_005f0590();
  }
  return;
}


 export function FUN_005f02f3 ()

 {
  let local_8;

  local_8 = FUN_005f0590();
  while ((local_8 !== 0)) {
    FUN_005f15f2();
    local_8 = FUN_005f05d0();
  }
  return;
}


 export function FUN_005f0342 ()

 {
  let local_8;

  local_8 = FUN_005f0590();
  while ((local_8 !== 0)) {
    FUN_005f1683();
    local_8 = FUN_005f05d0();
  }
  return;
}


 export function FUN_005f0391 (in_ECX, param_1, param_2, param_3)

 {
  let p_Var1;
  let iVar2;
  let iVar3;
  // in_ECX promoted to parameter;

  if ((param_1 === 0x200)) {
    p_Var1 = lockptr(s32((in_ECX + 0xcc), 0));
    if ((s32((p_Var1 + 0xc), 0) < param_3)) {
      FUN_005f130f(0xfff0, param_2, param_3);
      w32((in_ECX + 0xcc), 0, 0);
    }
  }
  iVar2 = FUN_005f0590();
  while ((iVar3 !== 0)) {
    if ((iVar2 === 0)) {
      return 0;
    }
    iVar3 = FUN_005f130f(param_1, param_2, param_3);
    if ((iVar3 !== 0));
  }
  if ((param_1 === 0x200)) {
    w32((in_ECX + 0xcc), 0, iVar2);
  }
  return 1;
}


 export function FUN_005f04c0 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_005f0507;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = -1;
  FUN_005f04fe();
  FUN_005f0511();
  return;
}


 export function FUN_005f04fe ()

 {
  FUN_005f0724();
  return;
}


 export function FUN_005f0511 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005f0520 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005f056d;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f06ee();
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_005f0590 ()

 {
  FUN_005f0770();
  return;
}


 export function FUN_005f05b0 ()

 {
  FUN_005f07b3();
  return;
}


 export function FUN_005f05d0 ()

 {
  FUN_005f0833();
  return;
}


 export function FUN_005f05f0 (param_1)

 {
  FUN_005f08fb(param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* protected: */  /* struct */  /* _CRT_CRITICAL_SECTION */  /* * */  /* __thiscall */
 /* ios::lockptr(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function lockptr (this)

 {
  return (this + 0x38);
}


 export function FUN_005f0640 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, 0);
  w32(in_ECX, 1, 0);
  w32(in_ECX, 2, 0);
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* __thiscall */
 /* CDataBoundProperty::~CDataBoundProperty(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~CDataBoundProperty (this)

 {
  return;
}


 export function FUN_005f068c (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 4), 0, param_1);
  return;
}


 export function FUN_005f06ad (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 8), 0, param_1);
  return;
}


 export function FUN_005f06ce (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, param_1);
  return;
}


 export function FUN_005f06ee (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, 0);
  w32(in_ECX, 1, 0);
  w32(in_ECX, 2, 0);
  return in_ECX;
}


 export function FUN_005f0724 ()

 {
  FUN_005f0e13();
  return;
}


 export function FUN_005f0742 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return (s32(in_ECX, 0) === 0);
}


 export function FUN_005f0770 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) === 0)) {
    uVar1 = 0;
  }
  else {
    w32(in_ECX, 2, s32(in_ECX, 0));
    uVar1 = FUN_005f0e50();
  }
  return uVar1;
}


 export function FUN_005f07b3 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 4), 0) === 0)) {
    uVar1 = 0;
  }
  else {
    w32((in_ECX + 8), 0, s32((in_ECX + 4), 0));
    uVar1 = FUN_005f0e50();
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* virtual */  /* int */  /* __thiscall */  /* pDNameNode::length(void)const */

    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function length (this)

 {
  let iVar1;

  if ((s32((this + 8), 0) === 0)) {
    iVar1 = 0;
  }
  else {
    iVar1 = FUN_005f0e50();
  }
  return iVar1;
}


 export function FUN_005f0833 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 8), 0) === 0)) {
    uVar1 = 0;
  }
  else {
    uVar1 = FUN_005f0e70();
    w32((in_ECX + 8), 0, uVar1);
    if ((s32((in_ECX + 8), 0) === 0)) {
      uVar1 = 0;
    }
    else {
      uVar1 = FUN_005f0e50();
    }
  }
  return uVar1;
}


 export function FUN_005f0897 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 8), 0) === 0)) {
    uVar1 = 0;
  }
  else {
    uVar1 = FUN_005f0e90();
    w32((in_ECX + 8), 0, uVar1);
    if ((s32((in_ECX + 8), 0) === 0)) {
      uVar1 = 0;
    }
    else {
      uVar1 = FUN_005f0e50();
    }
  }
  return uVar1;
}


 export function FUN_005f08fb (in_ECX, param_1)

 {
  let pvVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_1c;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005f09ea;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  pvVar1 = operator_new(0xc);
  local_8 = 0;
  if ((pvVar1 === 0)) {
    local_1c = 0;
  }
  else {
    local_1c = FUN_005f0640();
  }
  local_8 = -1;
  iVar2 = FUN_005f0742();
  if ((iVar2 === 0)) {
    FUN_005f06ce(param_1);
    FUN_005f06ad(s32(in_ECX, 1));
    FUN_005f068c(local_1c);
    w32(in_ECX, 1, local_1c);
    w32(in_ECX, 2, s32(in_ECX, 1));
  }
  else {
    w32(in_ECX, 0, local_1c);
    w32(in_ECX, 1, local_1c);
    w32(in_ECX, 2, local_1c);
    FUN_005f06ce(param_1);
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_005f0a04 (in_ECX, param_1)

 {
  let iVar1;
  let pvVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_2c;
  let local_24;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005f0bb4;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  iVar1 = FUN_005f0742();
  if ((iVar1 === 0)) {
    if ((s32(in_ECX, 2) === 0)) {
      FUN_005f08fb(param_1);
    }
    else if ((s32(in_ECX, 2) === s32(in_ECX, 0))) {
      pvVar2 = operator_new(0xc);
      local_8 = 0;
      if ((pvVar2 === 0)) {
        local_24 = 0;
      }
      else {
        local_24 = FUN_005f0640();
      }
      local_8 = -1;
      FUN_005f06ad(local_24);
      FUN_005f06ce(param_1);
      FUN_005f068c(s32(in_ECX, 2));
      w32(in_ECX, 2, local_24);
      w32(in_ECX, 0, s32(in_ECX, 2));
    }
    else {
      pvVar2 = operator_new(0xc);
      local_8 = 1;
      if ((pvVar2 === 0)) {
        local_2c = 0;
      }
      else {
        local_2c = FUN_005f0640();
      }
      local_8 = -1;
      uVar3 = FUN_005f0e90();
      FUN_005f068c(local_2c);
      FUN_005f06ad(local_2c);
      FUN_005f06ce(param_1);
      FUN_005f06ad(uVar3);
      FUN_005f068c(s32(in_ECX, 2));
      w32(in_ECX, 2, local_2c);
    }
  }
  else {
    FUN_005f08fb(param_1);
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_005f0bce (param_1)

 {
  let local_8;

  local_8 = FUN_005f0770();
  while ((local_8 === param_1)) {
    if ((local_8 === 0)) {
      return 0;
    }
    if ((local_8 === param_1));
  }
  return local_8;
}


 export function FUN_005f0c21 ()

 {
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = FUN_005f0770();
  while ((local_8 !== 0)) {
    local_c = (local_c + 1);
    local_8 = FUN_005f0833();
  }
  return local_c;
}


 export function FUN_005f0c69 (in_ECX)

 {
  let iVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  if ((iVar1 === 0)) {
    iVar1 = FUN_005f0e90();
    iVar2 = FUN_005f0e70();
    if ((iVar2 === 0)) {
      if ((s32(in_ECX, 2) !== 0)) {
        in_ECX = (in_ECX + 2);
      }
      w32(in_ECX, 0, 0);
      w32(in_ECX, 1, 0);
      w32(in_ECX, 2, 0);
    }
    else if ((iVar1 === 0)) {
      w32(in_ECX, 0, iVar2);
      FUN_005f06ad(0);
      if ((s32(in_ECX, 2) !== 0)) {
        in_ECX = (in_ECX + 2);
      }
      w32(in_ECX, 2, s32(in_ECX, 0));
    }
    else if ((iVar2 === 0)) {
      w32(in_ECX, 1, iVar1);
      FUN_005f068c(0);
      if ((s32(in_ECX, 2) !== 0)) {
        in_ECX = (in_ECX + 2);
      }
      w32(in_ECX, 2, s32(in_ECX, 1));
    }
    else {
      FUN_005f068c(iVar2);
      FUN_005f06ad(iVar1);
      if ((s32(in_ECX, 2) !== 0)) {
        in_ECX = (in_ECX + 2);
      }
      w32(in_ECX, 2, iVar2);
    }
  }
  return;
}


 export function FUN_005f0e13 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005f0770();
  while ((s32((in_ECX + 8), 0) !== 0)) {
    FUN_005f0c69();
  }
  return;
}


 export function FUN_005f0e50 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32(in_ECX, 0);
}


 export function FUN_005f0e70 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 4), 0);
}


 export function FUN_005f0e90 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 8), 0);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* * */  /* __thiscall */  /* CDataBoundProperty::`scalar */  /* deleting */  /* destructor'(unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function `scalar_deleting_destructor' (this, param_1)

 {
  ~CDataBoundProperty(this);
  if (((param_1 & 1) !== 0)) {
    operator_delete(this);
  }
  return this;
}


 export function FUN_005f0ef0 ()

 {
  return DAT_00639dc8;
}


 export function FUN_005f0f05 (param_1)

 {
  wv(DAT_00639dc8, param_1);
  return;
}


 export function FUN_005f0f1d (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005f0fd0;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f0520();
  w32(in_ECX, 0, PTR_FUN_0061d720);
  w32(in_ECX, 2, 0);
  w32(in_ECX, 3, 0);
  w32(in_ECX, 9, 0);
  w32(in_ECX, 8, 0);
  w32(in_ECX, 9, 0);
  w32(in_ECX, 0xa, 0);
  w32(in_ECX, 0xb, 0);
  _MEM[(in_ECX + 0xd)] = 0;
  w32(in_ECX, 7, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_005f0fe9 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005f109b;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f0520();
  w32(in_ECX, 0, PTR_FUN_0061d720);
  w32(in_ECX, 2, param_1);
  w32(in_ECX, 3, 0);
  w32(in_ECX, 9, 0);
  w32(in_ECX, 8, 0);
  w32(in_ECX, 9, 0);
  w32(in_ECX, 0xa, 0);
  w32(in_ECX, 0xb, 0);
  _MEM[(in_ECX + 0xd)] = 0;
  w32(in_ECX, 7, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_005f10b6 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005f1168;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f0520();
  w32(in_ECX, 0, PTR_FUN_0061d720);
  w32(in_ECX, 2, 0);
  w32(in_ECX, 3, param_1);
  w32(in_ECX, 9, 0);
  w32(in_ECX, 8, 0);
  w32(in_ECX, 9, 0);
  w32(in_ECX, 0xa, 0);
  w32(in_ECX, 0xb, 0);
  _MEM[(in_ECX + 0xd)] = 0;
  w32(in_ECX, 7, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_005f1183 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_005f11de;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(in_ECX, 0, PTR_FUN_0061d720);
  local_8 = 0;
  FUN_005f195a();
  local_8 = -1;
  FUN_005f11d2();
  FUN_005f11e8();
  return;
}


 export function FUN_005f11d2 ()

 {
  FUN_005f04c0();
  return;
}


 export function FUN_005f11e8 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005f11f6 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0xc), 0, 0);
  w32((in_ECX + 8), 0, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* virtual */  /* void */  /* __thiscall */
 /* CTestCmdUI::Enable(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function Enable (this, param_1)

 {
  w32((this + 0xc), 0, param_1);
  w32((this + 8), 0, 0);
  return;
}


 export function FUN_005f124c (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32((in_ECX + 4), 0, param_1);
  w32((in_ECX + 0x38), 0, s32(param_2, 0));
  w32((in_ECX + 0x3c), 0, s32(param_2, 1));
  w32((in_ECX + 0x40), 0, s32(param_2, 2));
  w32((in_ECX + 0x44), 0, s32(param_2, 3));
  uVar1 = FUN_005f1514();
  w32((in_ECX + 8), 0, uVar1);
  if ((s32((in_ECX + 0xc), 0) === 0)) {
    __assert(s_pParentWin_||_pParentControl_00639de8, s_D:\Ss\Smeds32\ddcntrl.cpp_00639dcc, 0x72);
  }
  if ((s32((in_ECX + 0xc), 0) === 0)) {
    if ((s32((in_ECX + 8), 0) !== 0)) {
      FUN_005f0266(in_ECX);
    }
  }
  else {
    FUN_005f1928(in_ECX);
  }
  return;
}


 export function FUN_005f130f (in_ECX, param_1, param_2, param_3)

 {
  let cVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  cVar1 = FUN_005f1a40(param_1, param_2, param_3);
  if ((cVar1 === 0)) {
    FUN_005f0f05(in_ECX);
    if ((((s32(in_ECX, 0xd)) & 0xFF) !== 0)) {
      in_ECX = s32(in_ECX, 0);
      uVar2 = 1;
    }
    else if ((((s32(in_ECX, 0xd)) & 0xFF) !== 0)) {
      in_ECX = s32(in_ECX, 0);
      uVar2 = 1;
    }
    else if ((param_1 === 0xfff0)) {
      in_ECX = s32(in_ECX, 0);
      uVar2 = 1;
    }
    else if ((s32(in_ECX, 0x11) < param_3)) {
      uVar2 = 0;
    }
    else {
      /* switch */ () {
      case 0x200 :
        in_ECX = s32(in_ECX, 0);
        break;
      case 0x201 :
        in_ECX = s32(in_ECX, 0);
        break;
      case 0x202 :
        in_ECX = s32(in_ECX, 0);
        break;
      case 0x203 :
        in_ECX = s32(in_ECX, 0);
        break;
      case 0x204 :
        in_ECX = s32(in_ECX, 0);
        break;
      case 0x205 :
        in_ECX = s32(in_ECX, 0);
      }
      uVar2 = 1;
    }
  }
  else {
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_005f1514 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 8), 0) === 0)) {
    if ((s32((in_ECX + 0xc), 0) === 0)) {
      uVar1 = 0;
    }
    else {
      uVar1 = FUN_005f1514();
      w32((in_ECX + 8), 0, uVar1);
      uVar1 = s32((in_ECX + 8), 0);
    }
  }
  else {
    uVar1 = s32((in_ECX + 8), 0);
  }
  return uVar1;
}


 export function FUN_005f156d (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 8), 0) === 0)) {
    uVar1 = FUN_005f1514();
    w32((in_ECX + 8), 0, uVar1);
  }
  in_ECX = (in_ECX + 8);
  return;
}


 export function FUN_005f15a9 ()

 {
  let iVar1;

  iVar1 = FUN_005f1514();
  if ((iVar1 === 0)) {
    __assert(s_GetParentGameWin()_00639e24, s_D:\Ss\Smeds32\ddcntrl.cpp_00639e08, 0xd8);
  }
  return;
}


 export function FUN_005f15f2 (in_ECX)

 {
  // in_ECX promoted to parameter;

  in_ECX = s32(in_ECX, 0);
  FUN_005f19ef();
  return;
}


 export function FUN_005f1622 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((((s32(in_ECX, 0xd)) & 0xFF) === 0)) {
    if ((s32(in_ECX, 3) === 0)) {
      FUN_005f0342();
    }
    else {
      FUN_005f19a6();
    }
    _MEM[(in_ECX + 0xd)] = 1;
    in_ECX = s32(in_ECX, 0);
  }
  return;
}


 export function FUN_005f1683 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((((s32(in_ECX, 0xd)) & 0xFF) !== 0)) {
    FUN_005f19a6();
    _MEM[(in_ECX + 0xd)] = 0;
    in_ECX = s32(in_ECX, 0);
  }
  return;
}


 export function FUN_005f16c4 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x20), 0, param_1);
  return;
}


 export function FUN_005f16e5 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x24), 0, param_1);
  return;
}


 export function FUN_005f1706 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x28), 0, param_1);
  return;
}


 export function FUN_005f1727 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x2c), 0, param_1);
  return;
}


 export function FUN_005f1748 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x30), 0, param_1);
  return;
}


 export function FUN_005f1769 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x20), 0) !== 0)) {
    in_ECX = (in_ECX + 0x20);
  }
  return;
}


 export function FUN_005f179c ()

 {
  FUN_005f1622();
  return;
}


 export function FUN_005f17bc ()

 {
  return;
}


 export function FUN_005f17d4 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x28), 0) !== 0)) {
    in_ECX = (in_ECX + 0x28);
  }
  return;
}


 export function FUN_005f1811 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x2c);
  }
  return;
}


 export function FUN_005f184e (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x24), 0) !== 0)) {
    in_ECX = (in_ECX + 0x24);
  }
  return;
}


 export function FUN_005f188b (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) !== 0)) {
    in_ECX = (in_ECX + 0x30);
  }
  return;
}


 export function FUN_005f18c8 ()

 {
  return;
}


 export function FUN_005f18e0 ()

 {
  return;
}


 export function FUN_005f18f8 ()

 {
  return;
}


 export function FUN_005f1910 ()

 {
  return;
}


 export function FUN_005f1928 (param_1)

 {
  FUN_005f05b0();
  FUN_005f05f0(param_1);
  return;
}


 export function FUN_005f195a ()

 {
  let local_8;

  local_8 = FUN_005f0590();
  while ((local_8 !== 0)) {
    FUN_005f0c69();
    local_8 = FUN_005f0590();
  }
  return;
}


 export function FUN_005f19a6 ()

 {
  let local_8;

  local_8 = FUN_005f0590();
  while ((local_8 !== 0)) {
    FUN_005f1683();
    local_8 = FUN_005f05d0();
  }
  return;
}


 export function FUN_005f19ef ()

 {
  let local_8;

  local_8 = FUN_005f0590();
  while ((local_8 !== 0)) {
    FUN_005f15f2();
    local_8 = FUN_005f05d0();
  }
  return;
}


 export function FUN_005f1a40 (in_ECX, param_1, param_2, param_3)

 {
  let p_Var1;
  let iVar2;
  let iVar3;
  // in_ECX promoted to parameter;

  if ((param_1 === 0x200)) {
    p_Var1 = lockptr(s32((in_ECX + 0x1c), 0));
    if ((s32((p_Var1 + 0xc), 0) < param_3)) {
      FUN_005f130f(0xfff0, param_2, param_3);
      w32((in_ECX + 0x1c), 0, 0);
    }
  }
  iVar2 = FUN_005f0590();
  while ((iVar3 !== 0)) {
    if ((iVar2 === 0)) {
      return 0;
    }
    iVar3 = FUN_005f130f(param_1, param_2, param_3);
    if ((iVar3 !== 0));
  }
  if ((param_1 === 0x200)) {
    w32((in_ECX + 0x1c), 0, iVar2);
  }
  return 1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* int */  /* __thiscall */
 /* CSplitterWnd::IsTracking(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function IsTracking (this)

 {
  return s32((this + 0xac), 0);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __onexit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __onexit (_Func)

 {
  let uVar1;
  let iVar2;

  uVar1 = __msize_dbg(DAT_006e6b68, 2);
  if ((uVar1 < (DAT_006e6b54 + (4 - DAT_006e6b68)))) {
    iVar2 = __msize_dbg(DAT_006e6b68, 2, 2, 0x61d74c, 0x68);
    iVar2 = __realloc_dbg(DAT_006e6b68, (iVar2 + 0x10));
    if ((iVar2 === 0)) {
      return 0;
    }
    wv(DAT_006e6b54, (((DAT_006e6b54 - DAT_006e6b68) & -4) + iVar2));
    wv(DAT_006e6b68, iVar2);
  }
  w32(DAT_006e6b54, 0, _Func);
  wv(DAT_006e6b54, (DAT_006e6b54 + 1));
  return _Func;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _atexit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _atexit (param_1)

 {
  let p_Var1;
  let iVar2;

  p_Var1 = __onexit(param_1);
  if ((p_Var1 === 0)) {
    iVar2 = -1;
  }
  else {
    iVar2 = 0;
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___onexitinit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___onexitinit ()

 {
  wv(DAT_006e6b68, __malloc_dbg(0x80, 2, 0x61d74c, 0xb6));
  if ((__malloc_dbg(0x80, 2, 0x61d74c, 0xb6) === 0)) {
    __amsg_exit(0x18);
  }
  w32(DAT_006e6b68, 0, 0);
  wv(DAT_006e6b54, DAT_006e6b68);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __global_unwind2 */
    /* Library: */  /* Visual */

 /* Studio  */ */ export function __global_unwind2 (param_1)

 {
  RtlUnwind(param_1, 0x5f1ce0, 0, 0);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __local_unwind2 */
    /* Libraries: */  /* Visual */  /* Studio */  /* 1998 */  /* Debug, */  /* Visual */  /* Studio */  /* 1998 */  /* Release, */  /* Visual */  /* Studio */  /* 2003 */  /* Debug, */
 /* Visual */    /* Studio */  /* 2003 */

 /* Release  */ */ export function __local_unwind2 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let uStack_1c;
  let puStack_18;
  let local_14;
  let iStack_10;

  iStack_10 = param_1;
  puStack_18 = LAB_005f1ce8;
  uStack_1c = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffe4);
  while ((iVar2 === param_2)) {
    iVar1 = s32((param_1 + 8), 0);
    iVar2 = s32((param_1 + 0xc), 0);
    if ((iVar2 === param_2));
    w32((param_1 + 0xc), 0, local_14);
    if ((s32(((iVar1 + 4) + iVar2 * 0xc), 0) === 0)) {
      FUN_005f1d9e(0x101);
      iVar1 = (iVar1 + 8);
    }
  }
  w32(unaff_FS_OFFSET, 0, uStack_1c);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __abnormal_termination */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __abnormal_termination ()

 {
  let iVar1;
  let iVar2;
  let unaff_FS_OFFSET;

  iVar2 = 0;
  iVar1 = s32(unaff_FS_OFFSET, 0);
  if ((s32((iVar1 + 8), 0) === s32((s32((iVar1 + 0xc), 0) + 0xc), 0))) {
    iVar2 = 1;
  }
  return iVar2;
}


 export function FUN_005f1d95 (in_EAX, in_ECX, unaff_EBP)

 {
  // in_EAX promoted to parameter;
  // in_ECX promoted to parameter;
  // unaff_EBP promoted to parameter;

  wv(DAT_00639e40, in_ECX);
  wv(DAT_00639e3c, in_EAX);
  wv(DAT_00639e44, unaff_EBP);
  return;
}


 export function FUN_005f1d9e (in_EAX, unaff_EBP)

 {
  // in_EAX promoted to parameter;
  // unaff_EBP promoted to parameter;

  wv(DAT_00639e40, s32((unaff_EBP + 8), 0));
  wv(DAT_00639e3c, in_EAX);
  wv(DAT_00639e44, unaff_EBP);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __stdcall */  /* _JumpToContinuation(void */  /* *,struct */  /* EHRegistrationNode */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _JumpToContinuation (param_1, param_2)

 {
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32(s32(unaff_FS_OFFSET, 0), 0));
                     /* /*  WARNING: */  /* Could */  /* not */  /* recover */  /* jumptable */  /* at */  /* 0x005f1ded. */  /* Too */  /* many */
                     /* branches  */ /*  WARNING: */  /* Treating */  /* indirect */  /* jump */  /* as */
   /* call  */ */ param_1 = param_1();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __stdcall */  /* _CallMemberFunction0(void */  /* *,void */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _CallMemberFunction0 (param_1, param_2)

 {
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
                     /* /*  WARNING: */  /* Could */  /* not */  /* recover */  /* jumptable */  /* at */  /* 0x005f1e05. */  /* Too */  /* many */
                     /* branches  */ /*  WARNING: */  /* Treating */  /* indirect */  /* jump */  /* as */
   /* call  */ */ param_2 = param_2();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* void */  /* __stdcall */  /* _CallMemberFunction1(void */  /* *,void */  /* *,void */
 /* *) */     /* void */  /* __stdcall */  /* _CallMemberFunction2(void */  /* *,void */  /* *,void */
 /* *,int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_CallMemberFunction1 (param_1, UNRECOVERED_JUMPTABLE)

 {
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
                     /* /*  WARNING: */  /* Could */  /* not */  /* recover */  /* jumptable */  /* at */  /* 0x005f1e15. */  /* Too */  /* many */
                     /* branches  */ /*  WARNING: */  /* Treating */  /* indirect */  /* jump */  /* as */
   /* call  */ */ UNRECOVERED_JUMPTABLE = UNRECOVERED_JUMPTABLE();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* void */  /* __stdcall */  /* _CallMemberFunction1(void */  /* *,void */  /* *,void */
 /* *) */     /* void */  /* __stdcall */  /* _CallMemberFunction2(void */  /* *,void */  /* *,void */
 /* *,int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_CallMemberFunction1 (param_1, UNRECOVERED_JUMPTABLE)

 {
  /* DEVIATION: intrinsic */;
  /* DEVIATION: intrinsic */;
                     /* /*  WARNING: */  /* Could */  /* not */  /* recover */  /* jumptable */  /* at */  /* 0x005f1e25. */  /* Too */  /* many */
                     /* branches  */ /*  WARNING: */  /* Treating */  /* indirect */  /* jump */  /* as */
   /* call  */ */ UNRECOVERED_JUMPTABLE = UNRECOVERED_JUMPTABLE();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __stdcall */  /* _UnwindNestedFrames(struct */  /* EHRegistrationNode */  /* *,struct */  /* EHExceptionRecord */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _UnwindNestedFrames (param_1, param_2)

 {
  let puVar1;
  let unaff_FS_OFFSET;

  puVar1 = s32(unaff_FS_OFFSET, 0);
  RtlUnwind(param_1, 0x5f1e5c, param_2, 0);
  w32((param_2 + 4), 0, (s32((param_2 + 4), 0) & -3));
  w32(puVar1, 0, s32(unaff_FS_OFFSET, 0));
  w32(unaff_FS_OFFSET, 0, puVar1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___CxxFrameHandler */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___CxxFrameHandler (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  uVar1 = ___InternalCxxFrameHandler(param_1, param_2, param_3, param_4);
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___CxxLongjmpUnwind@4 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___CxxLongjmpUnwind@4 (param_1)

 {
  ___FrameUnwindToState(s32((param_1 + 0x18), 0), 0, s32((param_1 + 0x28), 0), s32((param_1 + 0x1c), 0));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* * */  /* __cdecl */  /* _CallCatchBlock2(struct */  /* EHRegistrationNode */  /* *,struct */  /* _s_FuncInfo */  /* const */
 /* *,void */    /* *,int,unsigned */
 /* long) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _CallCatchBlock2 (param_1, param_2, param_3, param_4, param_5)

 {
  let pvVar1;
  let unaff_FS_OFFSET;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = CatchGuardHandler;
  local_10 = param_2;
  local_c = param_1;
  local_8 = (param_4 + 1);
  local_18 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffe8);
  pvVar1 = __CallSettingFrame@12(param_3, param_1, param_5);
  w32(unaff_FS_OFFSET, 0, local_18);
  return pvVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* enum */  /* _EXCEPTION_DISPOSITION */  /* __cdecl */  /* CatchGuardHandler(struct */  /* EHExceptionRecord */
 /* *,struct */    /* CatchGuardRN */  /* *,void */  /* *,void */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function CatchGuardHandler (param_1, param_2, param_3, param_4)

 {
  let _Var1;

  _Var1 = ___InternalCxxFrameHandler(param_1, s32((param_2 + 0xc), 0), param_3, 0, s32((param_2 + 8), 0), s32((param_2 + 0x10), 0), param_2, 0);
  return _Var1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* int */  /* __cdecl */  /* _CallSETranslator(struct */  /* EHExceptionRecord */  /* *,struct */  /* EHRegistrationNode */  /* *,void */
 /* *,void */    /* *,struct */  /* _s_FuncInfo */  /* const */  /* *,int,struct */  /* EHRegistrationNode */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _CallSETranslator (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let unaff_FS_OFFSET;
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

  local_c = DAT_fffffffc;
  local_10 = DAT_ffffffbc;
  local_28 = TranslatorGuardHandler;
  local_24 = param_5;
  local_20 = param_2;
  local_1c = param_6;
  local_18 = param_7;
  local_8 = 0;
  local_14 = 0x5f2057;
  local_2c = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffd4);
  local_34 = param_1;
  local_30 = param_3;
  wv(DAT_0063a020, DAT_0063a020(s32(param_1, 0), DAT_ffffffcc));
  if ((local_8 === 0)) {
    w32(unaff_FS_OFFSET, 0, local_2c);
  }
  else {
    w32(local_2c, 0, s32(s32(unaff_FS_OFFSET, 0), 0));
    w32(unaff_FS_OFFSET, 0, local_2c);
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* enum */  /* _EXCEPTION_DISPOSITION */  /* __cdecl */  /* TranslatorGuardHandler(struct */  /* EHExceptionRecord */
 /* *,struct */    /* TranslatorGuardRN */  /* *,void */  /* *,void */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function TranslatorGuardHandler (param_1, param_2, param_3, param_4)

 {
  let _Var1;

  if (((_MEM[param_1 + 4] & 0x66) !== 0)) {
    w32((param_2 + 0x24), 0, 1);
    return 1;
  }
  ___InternalCxxFrameHandler(param_1, s32((param_2 + 0xc), 0), param_3, 0, s32((param_2 + 8), 0), s32((param_2 + 0x10), 0), s32((param_2 + 0x14), 0), 1);
  if ((s32((param_2 + 0x24), 0) === 0)) {
    _UnwindNestedFrames(param_2, param_1);
  }
                     /* /*  WARNING: */  /* Could */  /* not */  /* recover */  /* jumptable */  /* at */  /* 0x005f20ff. */  /* Too */  /* many */
                     /* branches  */ /*  WARNING: */  /* Treating */  /* indirect */  /* jump */  /* as */
   /* call  */ */ _Var1 = s32((param_2 + 0x18), 0)();
  return _Var1;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _memcpy */
 /* _memmove */
    /* Libraries: */  /* Visual */  /* Studio */  /* 1998 */  /* Debug, */  /* Visual */  /* Studio */  /* 1998 */

 /* Release  */ */ export function FID_conflict:_memcpy (in_EDX, _Dst, _Src, _Size)

 {
  let uVar1;
  // in_EDX promoted to parameter;
  let uVar2;
  let puVar3;
  let puVar4;
  let puVar5;
  let puVar6;

  if ((_Dst < (_Src + _Size))) {
    puVar3 = (_Src + _Size);
    puVar5 = (_Dst + _Size);
    if (((puVar5 & 3) === 0)) {
      uVar1 = (_Size >>> 2);
      while ((uVar1 === 0)) {
        puVar5 = (puVar5 + -1);
        puVar3 = (puVar3 + -1);
        if ((uVar1 === 0));
        w32(puVar5, -1, s32(puVar3, -1));
      }
      /* switch */ ((_Size & 3)  ) {
      case 1 :
 switchD_005f21d9_caseD_1: :
        _MEM[(puVar5 + 3)] = _MEM[(puVar3 + 3)];
        return _Dst;
      case 2 :
 switchD_005f21d9_caseD_2: :
        w16((puVar5 + 2), 0, s16((puVar3 + 2), 0));
        return _Dst;
      case 3 :
 switchD_005f21d9_caseD_3: :
        w16((puVar5 + 2), 0, s16((puVar3 + 2), 0));
        _MEM[(puVar5 + 1)] = _MEM[(puVar3 + 1)];
        return _Dst;
      }
    }
    else {
      puVar4 = (puVar3 + -1);
      puVar6 = (puVar5 + -1);
      if ((_Size < 0xd)) {
        for (/* cond: (_Size !== 0) */); _Size = (_Size !== 0); _Size = (_Size - 1)) {
          _MEM[puVar6] = _MEM[puVar4];
          puVar4 = (puVar4 + -1);
          puVar6 = (puVar6 + -1);
        }
        return _Dst;
      }
      uVar2 = ((-in_EDX) & 3);
      uVar1 = (_Size - uVar2);
      for (/* cond: (uVar2 !== 0) */); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
        _MEM[puVar6] = _MEM[puVar4];
        puVar4 = (puVar4 + -1);
        puVar6 = (puVar6 + -1);
      }
      puVar3 = (puVar4 + -3);
      puVar5 = (puVar6 + -3);
      for (/* cond: (uVar2 !== 0) */); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
        w32(puVar5, 0, s32(puVar3, 0));
        puVar3 = (puVar3 + -1);
        puVar5 = (puVar5 + -1);
      }
      /* switch */ ((uVar1 & 3)  ) {
      case 1 :
        goto switchD_005f21d9_caseD_1;
      case 2 :
        goto switchD_005f21d9_caseD_2;
      case 3 :
        goto switchD_005f21d9_caseD_3;
      }
    }
    return _Dst;
  }
  puVar3 = _Dst;
  if (((_Dst & 3) === 0)) {
    for (/* cond: (uVar1 !== 0) */); uVar1 = (uVar1 !== 0); uVar1 = (uVar1 - 1)) {
      w32(puVar3, 0, s32(_Src, 0));
      _Src = (_Src + 4);
      puVar3 = (puVar3 + 1);
    }
    /* switch */ ((_Size & 3)  ) {
    case 1 :
 switchD_005f2140_caseD_1: :
      _MEM[puVar3] = _MEM[_Src];
      return _Dst;
    case 2 :
 switchD_005f2140_caseD_2: :
      w16(puVar3, 0, s16(_Src, 0));
      return _Dst;
    case 3 :
 switchD_005f2140_caseD_3: :
      w16(puVar3, 0, s16(_Src, 0));
      _MEM[(puVar3 + 2)] = _MEM[(_Src + 2)];
      return _Dst;
    }
  }
  else {
    puVar4 = _Dst;
    if ((_Size < 0xd)) {
      for (/* cond: (_Size !== 0) */); _Size = (_Size !== 0); _Size = (_Size - 1)) {
        _MEM[puVar4] = _MEM[_Src];
        _Src = (_Src + 1);
        puVar4 = (puVar4 + 1);
      }
      return _Dst;
    }
    uVar2 = ((-_Dst) & 3);
    uVar1 = (_Size - uVar2);
    for (/* cond: (uVar2 !== 0) */); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
      _MEM[puVar3] = _MEM[_Src];
      _Src = (_Src + 1);
      puVar3 = (puVar3 + 1);
    }
    for (/* cond: (uVar2 !== 0) */); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
      w32(puVar3, 0, s32(_Src, 0));
      _Src = (_Src + 4);
      puVar3 = (puVar3 + 1);
    }
    /* switch */ ((uVar1 & 3)  ) {
    case 1 :
      goto switchD_005f2140_caseD_1;
    case 2 :
      goto switchD_005f2140_caseD_2;
    case 3 :
      goto switchD_005f2140_caseD_3;
    }
  }
  return _Dst;
}


 export function FUN_005f2260 (param_1)

 {
  wv(DAT_00639e50, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _rand */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _rand ()

 {
  wv(DAT_00639e50, (DAT_00639e50 * 0x343fd + 0x269ec3));
  return (((DAT_00639e50 * 0x343fd + 0x269ec3) >>> 0x10) & 0x7fff);
}


 export function FUN_005f22d0 (param_1, param_2)

 {
  let bVar1;
  let uVar2;
  let uVar3;
  let puVar4;

  puVar4 = param_1;
  while (((param_2 & 3) !== 0)) {
    bVar1 = ((s32(param_2, 0)) & 0xFF);
    uVar3 = u8(bVar1);
    param_2 = (param_2 + 1);
    if ((bVar1 === 0));
    puVar4 = (puVar4 + 1);
  }
  do {
    uVar2 = s32(param_2, 0);
    uVar3 = s32(param_2, 0);
    param_2 = (param_2 + 1);
    if (((((uVar2 ^ -1) ^ (uVar2 + 0x7efefeff)) & -0x7efeff00) !== 0)) {
      if ((((uVar3) & 0xFF) === 0)) {
 LAB_005f23b8: :
        _MEM[puVar4] = ((uVar3) & 0xFF);
        return param_1;
      }
      if (((((uVar3 >>> 8)) & 0xFF) === 0)) {
        w16(puVar4, 0, ((uVar3) & 0xFFFF));
        return param_1;
      }
      if (((uVar3 & 0xff0000) === 0)) {
        w16(puVar4, 0, ((uVar3) & 0xFFFF));
        _MEM[(puVar4 + 2)] = 0;
        return param_1;
      }
      if (((uVar3 & -0x1000000) === 0)) {
        w32(puVar4, 0, uVar3);
        return param_1;
      }
    }
    w32(puVar4, 0, uVar3);
    puVar4 = (puVar4 + 1);
  } (puVar4 + 1) ( true );
}


 export function FUN_005f22e0 (param_1, param_2)

 {
  let bVar1;
  let uVar2;
  let puVar3;
  let uVar4;
  let puVar5;

  puVar3 = param_1;
  do {
    if (((puVar3 & 3) === 0));
    puVar3 = (puVar3 + 1);
  } while ((((uVar4) & 0xFF) !== 0));
  goto LAB_005f232f;
  while (((uVar4 & -0x1000000) === 0)) {
    if (((uVar4 & 0xff0000) === 0)) {
      puVar5 = (puVar5 + 2);
      goto joined_r0x005f234b;
    }
    if (((uVar4 & -0x1000000) === 0)) {
      puVar5 = puVar3;
      puVar3 = (puVar5 + 1);
    } while (((((s32(puVar5, 0) ^ -1) ^ (s32(puVar5, 0) + 0x7efefeff)) & -0x7efeff00) === 0));
    uVar4 = s32(puVar5, 0);
    if ((((uVar4) & 0xFF) === 0)) {
      puVar5 = (puVar5 + 1);
      goto joined_r0x005f234b;
    }
  }
 LAB_005f232f: :
  puVar5 = (puVar3 + -1);
 joined_r0x005f234b: :
  do {
    if (((param_2 & 3) === 0)) {
      do {
        uVar2 = s32(param_2, 0);
        uVar4 = s32(param_2, 0);
        param_2 = (param_2 + 1);
        if (((((uVar2 ^ -1) ^ (uVar2 + 0x7efefeff)) & -0x7efeff00) !== 0)) {
          if ((((uVar4) & 0xFF) === 0)) {
 LAB_005f23b8: :
            _MEM[puVar5] = ((uVar4) & 0xFF);
            return param_1;
          }
          if (((((uVar4 >>> 8)) & 0xFF) === 0)) {
            w16(puVar5, 0, ((uVar4) & 0xFFFF));
            return param_1;
          }
          if (((uVar4 & 0xff0000) === 0)) {
            w16(puVar5, 0, ((uVar4) & 0xFFFF));
            _MEM[(puVar5 + 2)] = 0;
            return param_1;
          }
          if (((uVar4 & -0x1000000) === 0)) {
            w32(puVar5, 0, uVar4);
            return param_1;
          }
        }
        w32(puVar5, 0, uVar4);
        puVar5 = (puVar5 + 1);
      } (puVar5 + 1) ( true );
    }
    bVar1 = ((s32(param_2, 0)) & 0xFF);
    uVar4 = u8(bVar1);
    param_2 = (param_2 + 1);
    if ((bVar1 === 0));
    puVar5 = (puVar5 + 1);
  } (puVar5 + 1) ( true );
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __cdecl */  /* operator */  /* delete(void */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function operator_delete (param_1)

 {
  let pcVar1;
  let iVar2;

  if ((param_1 !== 0)) {
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
    __free_dbg(param_1, s32((param_1 + -12), 0));
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* * */  /* __cdecl */  /* operator */  /* new(unsigned */
 /* int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function operator_new (param_1)

 {
  let pvVar1;

  pvVar1 = __nh_malloc(param_1, 1);
  return pvVar1;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x005f250e)  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __stdcall */  /* `eh */  /* vector */  /* destructor */  /* iterator'(void */  /* *,unsigned */  /* int,int,void */
 /* (__thiscall*)(void */
 /* *)) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function `eh_vector_destructor_iterator' (unaff_EDI, param_1, param_2, param_3, param_4)

 {
  // unaff_EDI promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  puStack_c = DAT_0061d790;
  puStack_10 = LAB_005f9298;
  uStack_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  local_8 = 0;
  while ((-1 < param_3)) {
    param_4 = param_4(unaff_EDI);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __stdcall */  /* __ArrayUnwind(void */  /* *,unsigned */  /* int,int,void */  /* (__thiscall*)(void */
 /* *)) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ArrayUnwind (unaff_EDI, param_1, param_2, param_3, param_4)

 {
  // unaff_EDI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  puStack_c = DAT_0061d7a0;
  puStack_10 = LAB_005f9298;
  local_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  local_8 = 0;
  while ((param_3 < 0)) {
    param_3 = (param_3 + -1);
    if ((param_3 < 0));
  }
  w32(unaff_FS_OFFSET, 0, local_14);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* int */  /* __cdecl */  /* ArrayUnwindFilter(struct */  /* _EXCEPTION_POINTERS */
 /* *) */     /* int */  /* __cdecl */  /* FrameUnwindFilter(struct */  /* _EXCEPTION_POINTERS */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:ArrayUnwindFilter (param_1)

 {
  if ((s32(s32(param_1, 0), 0) === -0x1f928c9d)) {
    terminate();
  }
  return 0;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x005f26a2)  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __stdcall */  /* `eh */  /* vector */  /* constructor */  /* iterator'(void */  /* *,unsigned */  /* int,int,void */
 /* (__thiscall*)(void */    /* *),void */  /* (__thiscall*)(void */
 /* *)) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function `eh_vector_constructor_iterator' (unaff_EDI, param_1, param_2, param_3, param_4, param_5)

 {
  // unaff_EDI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_20;
  let uStack_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  puStack_c = DAT_0061d7b0;
  puStack_10 = LAB_005f9298;
  uStack_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  local_8 = 0;
  for (/* cond: (local_20 < param_3) */); local_20 = (local_20 < param_3); local_20 = (local_20 + 1)) {
    param_4 = param_4(unaff_EDI);
  }
  return;
}


 export function FUN_005f26e0 (param_1)

 {
  return (param_1 + -32);
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __toupper_lk */
 /* _toupper */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__toupper_lk (unaff_ESI, unaff_EDI, _C)

 {
  let iVar1;
  // unaff_ESI promoted to parameter;
  // unaff_EDI promoted to parameter;
  let local_14;
  let local_10;
  let local_c;
  let local_b;
  let local_a;
  let local_8;

  if ((DAT_0063a078 === 0)) {
    if ((_C < 0x7b)) {
      _C = (_C - 0x20);
    }
  }
  else {
    if ((_C < 0x100)) {
      if ((DAT_0063a29c < 2)) {
        local_14 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 2);
      }
      else {
        local_14 = __isctype(_C, 2);
      }
      if ((local_14 === 0)) {
        return _C;
      }
    }
    if (((s16((PTR_DAT_0063a090 + ((_C >>> 8) & 0xff) * 2), 0) & 0x8000) === 0)) {
      local_c = ((_C) & 0xFF);
      local_b = 0;
      local_8 = 1;
    }
    else {
      local_c = (((_C >>> 8)) & 0xFF);
      local_b = ((_C) & 0xFF);
      local_a = 0;
      local_8 = 2;
    }
    iVar1 = ___crtLCMapStringA(DAT_0063a078, 0x200, DAT_fffffff4, local_8, DAT_fffffff0, 3, 0, unaff_EDI, unaff_ESI);
    if ((iVar1 !== 0)) {
      if ((iVar1 === 1)) {
        _C = u8(((UNNAMED) & 0xFF));
      }
      else {
        _C = ((UNNAMED) & 0xFFFF);
      }
    }
  }
  return _C;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _isalpha */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _isalpha (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 0x103);
  }
  else {
    uVar1 = __isctype(_C, 0x103);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _isupper */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _isupper (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 1);
  }
  else {
    uVar1 = __isctype(_C, 1);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _islower */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _islower (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 2);
  }
  else {
    uVar1 = __isctype(_C, 2);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _isdigit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _isdigit (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 4);
  }
  else {
    uVar1 = __isctype(_C, 4);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _isxdigit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _isxdigit (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 0x80);
  }
  else {
    uVar1 = __isctype(_C, 0x80);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _isspace */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _isspace (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 8);
  }
  else {
    uVar1 = __isctype(_C, 8);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _ispunct */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _ispunct (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 0x10);
  }
  else {
    uVar1 = __isctype(_C, 0x10);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _isalnum */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _isalnum (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 0x107);
  }
  else {
    uVar1 = __isctype(_C, 0x107);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _isprint */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _isprint (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 0x157);
  }
  else {
    uVar1 = __isctype(_C, 0x157);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _isgraph */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _isgraph (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 0x117);
  }
  else {
    uVar1 = __isctype(_C, 0x117);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _iscntrl */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _iscntrl (_C)

 {
  let uVar1;

  if ((DAT_0063a29c < 2)) {
    uVar1 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 0x20);
  }
  else {
    uVar1 = __isctype(_C, 0x20);
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___isascii */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___isascii (_C)

 {
  return u8((_C < 0x80));
}


 export function FUN_005f2be0 (param_1)

 {
  return (param_1 & 0x7f);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___iscsymf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___iscsymf (_C)

 {
  let iVar1;
  let local_8;

  if ((DAT_0063a29c < 2)) {
    local_8 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 0x103);
  }
  else {
    local_8 = __isctype(_C, 0x103);
  }
  if ((_C !== 0x5f)) {
    iVar1 = 0;
  }
  else {
    iVar1 = 1;
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___iscsym */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___iscsym (_C)

 {
  let iVar1;
  let local_8;

  if ((DAT_0063a29c < 2)) {
    local_8 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 0x107);
  }
  else {
    local_8 = __isctype(_C, 0x107);
  }
  if ((_C !== 0x5f)) {
    iVar1 = 0;
  }
  else {
    iVar1 = 1;
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __fsopen */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __fsopen (_Filename, _Mode, _ShFlag)

 {
  let pcVar1;
  let iVar2;
  let pFVar3;

  if ((_Filename === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d7f4, 0x35, 0, 0x61d7fc);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pFVar3 = pcVar1();
      return pFVar3;
    }
  }
  if ((_MEM[_Filename] === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d7f4, 0x36, 0, 0x61d7e0);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pFVar3 = pcVar1();
      return pFVar3;
    }
  }
  if ((_Mode === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d7f4, 0x37, 0, 0x61d7d0);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pFVar3 = pcVar1();
      return pFVar3;
    }
  }
  if ((_MEM[_Mode] === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d7f4, 0x38, 0, 0x61d7bc);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pFVar3 = pcVar1();
      return pFVar3;
    }
  }
  pFVar3 = __getstream();
  if ((pFVar3 === 0)) {
    pFVar3 = 0;
  }
  else {
    pFVar3 = __openfile(_Filename, _Mode, _ShFlag, pFVar3);
  }
  return pFVar3;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fopen */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fopen (_Filename, _Mode)

 {
  let pFVar1;

  pFVar1 = __fsopen(_Filename, _Mode, 0x40);
  return pFVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fclose */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fclose (_File)

 {
  let pcVar1;
  let iVar2;
  let local_8;

  local_8 = -1;
  if (((s32(DAT_0000000c, 0) & 0x40) === 0)) {
    if ((_File === 0)) {
      iVar2 = __CrtDbgReport(2, 0x61d80c, 0x77, 0, 0x61d818);
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        iVar2 = pcVar1();
        return iVar2;
      }
    }
    if (((s32(DAT_0000000c, 0) & 0x83) !== 0)) {
      local_8 = __flush(_File);
      __freebuf(_File);
      iVar2 = __close(s32(DAT_00000010, 0));
      if ((iVar2 < 0)) {
        local_8 = -1;
      }
      else if ((s32(DAT_0000001c, 0) !== 0)) {
        __free_dbg(s32(DAT_0000001c, 0), 2);
        w32(DAT_0000001c, 0, 0);
      }
    }
    w32(DAT_0000000c, 0, 0);
  }
  else {
    w32(DAT_0000000c, 0, 0);
    local_8 = -1;
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _strncpy */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _strncpy (_Dest, _Source, _Count)

 {
  let uVar1;
  let uVar2;
  let cVar3;
  let uVar4;
  let puVar5;

  if ((_Count === 0)) {
    return _Dest;
  }
  puVar5 = _Dest;
  if (((_Source & 3) !== 0)) {
    while ((((uVar4) & 0xFF) === 0)) {
      uVar4 = s32(_Source, 0);
      _Source = (_Source + 1);
      _MEM[puVar5] = ((uVar4) & 0xFF);
      puVar5 = (puVar5 + 1);
      _Count = (_Count - 1);
      if ((_Count === 0)) {
        return _Dest;
      }
      if ((((uVar4) & 0xFF) === 0)) {
        uVar4 = (_Count >>> 2);
        goto joined_r0x005f2f6e;
      }
    }
    do {
      if (((puVar5 & 3) === 0)) {
        uVar4 = (_Count >>> 2);
        cVar3 = 0;
        if ((uVar4 === 0));
      puVar5 = (puVar5 + 1);
      _Count = (_Count - 1);
    } while ((_Count !== 0));
    return _Dest;
  }
  uVar4 = (_Count >>> 2);
  if ((uVar4 !== 0)) {
    do {
      uVar1 = s32(_Source, 0);
      uVar2 = s32(_Source, 0);
      _Source = (_Source + 4);
      if (((((uVar1 ^ -1) ^ (uVar1 + 0x7efefeff)) & -0x7efeff00) !== 0)) {
        if ((((uVar2) & 0xFF) === 0)) {
          w32(puVar5, 0, 0);
 joined_r0x005f3015: :
          while ((uVar4 === 0)) {
            uVar4 = (uVar4 - 1);
            puVar5 = (puVar5 + 1);
            if ((uVar4 === 0));
          }
          cVar3 = 0;
          _Count = (_Count & 3);
          if ((_Count !== 0));
        }
        if (((((uVar2 >>> 8)) & 0xFF) === 0)) {
          w32(puVar5, 0, (uVar2 & 0xff));
          goto joined_r0x005f3015;
        }
        if (((uVar2 & 0xff0000) === 0)) {
          w32(puVar5, 0, (uVar2 & 0xffff));
          goto joined_r0x005f3015;
        }
        if (((uVar2 & -0x1000000) === 0)) {
          w32(puVar5, 0, uVar2);
          goto joined_r0x005f3015;
        }
      }
      w32(puVar5, 0, uVar2);
      puVar5 = (puVar5 + 1);
      uVar4 = (uVar4 - 1);
 joined_r0x005f2f6e: :
    } while ((uVar4 !== 0));
    _Count = (_Count & 3);
    if ((_Count === 0)) {
      return _Dest;
    }
  }
  do {
    cVar3 = ((s32(_Source, 0)) & 0xFF);
    _Source = (_Source + 1);
    _MEM[puVar5] = cVar3;
    puVar5 = (puVar5 + 1);
    if ((cVar3 === 0)) {
      while ((_Count !== 0)) {
 LAB_005f2fab: :
        _MEM[puVar5] = cVar3;
        puVar5 = (puVar5 + 1);
      }
      return _Dest;
    }
    _Count = (_Count - 1);
  } while ((_Count !== 0));
  return _Dest;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _sprintf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _sprintf (_Dest, _Format)

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
  local_24 = 0x7fffffff;
  iVar2 = __output(DAT_ffffffdc, _Format, DAT_0000000c);
  local_24 = (0x7fffffff + -1);
  if (((0x7fffffff + -1) < 0)) {
    __flsbuf(0, DAT_ffffffdc);
  }
  else {
    _MEM[_Dest] = 0;
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _atol */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _atol (_Str)

 {
  let pbVar1;
  let uVar2;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  while ((local_14 === 0)) {
    if ((DAT_0063a29c < 2)) {
      local_14 = (((s16((PTR_DAT_0063a090 + u8(_MEM[_Str]) * 2), 0)) & 0xFFFF) & 8);
    }
    else {
      local_14 = __isctype(u8(_MEM[_Str]), 8);
    }
    if ((local_14 === 0));
  }
  uVar2 = u8(_MEM[_Str]);
  if ((uVar2 === 0x2b)) {
    local_8 = u8(_MEM[_Str + 1]);
    pbVar1 = (_Str + 2);
  }
  _Str = pbVar1;
  local_c = 0;
  while ((local_18 === 0)) {
    if ((DAT_0063a29c < 2)) {
      local_18 = (((s16((PTR_DAT_0063a090 + local_8 * 2), 0)) & 0xFFFF) & 4);
    }
    else {
      local_18 = __isctype(local_8, 4);
    }
    if ((local_18 === 0));
    local_8 = u8(_MEM[_Str]);
    _Str = (_Str + 1);
  }
  if ((uVar2 === 0x2d)) {
    local_c = (-local_c);
  }
  return local_c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _atoi */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _atoi (_Str)

 {
  let lVar1;

  lVar1 = _atol(_Str);
  return lVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __atoi64 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __atoi64 (_String)

 {
  let pbVar1;
  let uVar2;
  let lVar3;
  let local_1c;
  let local_18;
  let local_10;
  let local_c;
  let local_8;

  while ((local_18 === 0)) {
    if ((DAT_0063a29c < 2)) {
      local_18 = (((s16((PTR_DAT_0063a090 + u8(_MEM[_String]) * 2), 0)) & 0xFFFF) & 8);
    }
    else {
      local_18 = __isctype(u8(_MEM[_String]), 8);
    }
    if ((local_18 === 0));
  }
  uVar2 = u8(_MEM[_String]);
  if ((uVar2 === 0x2b)) {
    local_8 = u8(_MEM[_String + 1]);
    pbVar1 = (_String + 2);
  }
  _String = pbVar1;
  lVar3 = 0;
  while ((local_1c === 0)) {
    local_c = (lVar3 >>> 0x20);
    local_10 = lVar3;
    if ((DAT_0063a29c < 2)) {
      local_1c = (((s16((PTR_DAT_0063a090 + local_8 * 2), 0)) & 0xFFFF) & 4);
    }
    else {
      local_1c = __isctype(local_8, 4);
    }
    if ((local_1c === 0));
    lVar3 = (lVar3 + (local_8 - 0x30));
    local_8 = u8(_MEM[_String]);
    _String = (_String + 1);
  }
  if ((uVar2 === 0x2d)) {
    lVar3 = (((-(local_c + u8((local_10 !== 0)))) << 32) | (-local_10));
  }
  return lVar3;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fputs */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fputs (_Str, _File)

 {
  let pcVar1;
  let iVar2;
  let _Count;
  let sVar3;

  if ((_Str === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d860, 0x2f, 0, 0x61d840);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  if ((_File === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d860, 0x30, 0, 0x61d850);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  _Count = _strlen(_Str);
  iVar2 = __stbuf(_File);
  sVar3 = _fwrite(_Str, 1, _Count, _File);
  __ftbuf(iVar2, _File);
  if ((sVar3 === _Count)) {
    iVar2 = 0;
  }
  else {
    iVar2 = -1;
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _strlen */
    /* Libraries: */  /* Visual */  /* Studio */  /* 1998 */  /* Debug, */  /* Visual */  /* Studio */  /* 1998 */

 /* Release  */ */ export function _strlen (_Str)

 {
  let uVar1;
  let puVar2;
  let puVar3;

  puVar2 = _Str;
  do {
    if (((puVar2 & 3) === 0));
    puVar2 = (puVar2 + 1);
  } while ((((uVar1) & 0xFF) !== 0));
 LAB_005f34d3: :
  return (puVar2 + (-1 - _Str));
 LAB_005f34a0: :
  do {
    do {
      puVar3 = puVar2;
      puVar2 = (puVar3 + 1);
    } while (((((s32(puVar3, 0) ^ -1) ^ (s32(puVar3, 0) + 0x7efefeff)) & -0x7efeff00) === 0));
    uVar1 = s32(puVar3, 0);
    if ((((uVar1) & 0xFF) === 0)) {
      return (puVar3 - _Str);
    }
    if (((((uVar1 >>> 8)) & 0xFF) === 0)) {
      return (puVar3 + (1 - _Str));
    }
    if (((uVar1 & 0xff0000) === 0)) {
      return (puVar3 + (2 - _Str));
    }
  } while (((uVar1 & -0x1000000) !== 0));
  goto LAB_005f34d3;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _memset */
    /* Libraries: */  /* Visual */  /* Studio */  /* 1998 */  /* Debug, */  /* Visual */  /* Studio */  /* 1998 */

 /* Release  */ */ export function _memset (_Dst, _Val, _Size)

 {
  let uVar1;
  let uVar2;
  let sVar3;
  let puVar4;

  if ((_Size === 0)) {
    return _Dst;
  }
  uVar1 = (_Val & 0xff);
  puVar4 = _Dst;
  if ((3 < _Size)) {
    uVar2 = ((-_Dst) & 3);
    sVar3 = _Size;
    if ((uVar2 !== 0)) {
      sVar3 = (_Size - uVar2);
      do {
        _MEM[puVar4] = ((_Val) & 0xFF);
        puVar4 = (puVar4 + 1);
        uVar2 = (uVar2 - 1);
      } while ((uVar2 !== 0));
    }
    uVar1 = uVar1 * 0x1010101;
    _Size = (sVar3 & 3);
    uVar2 = (sVar3 >>> 2);
    if ((uVar2 !== 0)) {
      for (/* cond: (uVar2 !== 0) */); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
        w32(puVar4, 0, uVar1);
        puVar4 = (puVar4 + 1);
      }
      if ((_Size === 0)) {
        return _Dst;
      }
    }
  }
  do {
    _MEM[puVar4] = ((uVar1) & 0xFF);
    puVar4 = (puVar4 + 1);
    _Size = (_Size - 1);
  } while ((_Size !== 0));
  return _Dst;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _strcmp */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _strcmp (_Str1, _Str2)

 {
  let uVar1;
  let uVar2;
  let bVar3;
  let bVar4;
  let bVar5;

  if (((_Str1 & 3) !== 0)) {
    if (((_Str1 & 1) !== 0)) {
      bVar4 = _MEM[_Str1];
      _Str1 = (_Str1 + 1);
      bVar5 = (bVar4 < _MEM[_Str2]);
      if ((bVar4 !== _MEM[_Str2]));
      if ((bVar4 === 0)) {
        return 0;
      }
      if (((_Str1 & 2) === 0));
    _Str1 = (_Str1 + 2);
    bVar4 = ((uVar1) & 0xFF);
    bVar5 = (bVar4 < _MEM[_Str2]);
    if ((bVar4 !== _MEM[_Str2])) {
      return 0;
    }
    bVar4 = (((uVar1 >>> 8)) & 0xFF);
    bVar5 = (bVar4 < _MEM[_Str2 + 1]);
    if ((bVar4 !== _MEM[_Str2 + 1])) {
      return 0;
    }
    _Str2 = (_Str2 + 2);
  }
 LAB_005f3570: :
  while ((bVar4 !== _MEM[_Str2])) {
    uVar2 = s32(_Str1, 0);
    bVar4 = ((uVar2) & 0xFF);
    bVar5 = (bVar4 < _MEM[_Str2]);
    if ((bVar4 !== _MEM[_Str2])) {
      return 0;
    }
    bVar4 = (((uVar2 >>> 8)) & 0xFF);
    bVar5 = (bVar4 < _MEM[_Str2 + 1]);
    if ((bVar4 !== _MEM[_Str2 + 1])) {
      return 0;
    }
    bVar4 = (((uVar2 >>> 0x10)) & 0xFF);
    bVar5 = (bVar4 < _MEM[_Str2 + 2]);
    if ((bVar4 !== _MEM[_Str2 + 2]));
    if ((bVar4 === 0)) {
      return 0;
    }
    bVar5 = (bVar3 < _MEM[_Str2 + 3]);
    if ((bVar3 !== _MEM[_Str2 + 3]));
    _Str1 = (_Str1 + 4);
    if ((bVar3 === 0)) {
      return 0;
    }
  }
 LAB_005f35a4: :
  return (u8(bVar5) * -2 + 1);
}


 /* /*  WARNING: */  /* Unable */  /* to */  /* track */  /* spacebase */  /* fully */  /* for */

 /* stack  */ */ export function FUN_005f35f0 (in_EAX)

 {
  // in_EAX promoted to parameter;
  let puVar1;
  let unaff_retaddr;

  puVar1 = DAT_00000004;
  for (/* cond: (0xfff < in_EAX) */); 0xfff = (0xfff < in_EAX); in_EAX = (in_EAX - 0x1000)) {
    puVar1 = (puVar1 + -0x1000);
  }
  w32((puVar1 + (-4 - in_EAX)), 0, unaff_retaddr);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _strchr */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _strchr (_Str, _Val)

 {
  let uVar1;
  let cVar2;
  let uVar3;
  let uVar4;
  let puVar5;

  while (((_Str & 3) !== 0)) {
    uVar1 = s32(_Str, 0);
    if ((((uVar1) & 0xFF) === ((_Val) & 0xFF))) {
      return _Str;
    }
    _Str = (_Str + 1);
    if ((((uVar1) & 0xFF) === 0)) {
      return 0;
    }
  }
  while ((cVar2 === 0)) {
    while (((((uVar4 ^ -1) ^ (uVar4 + 0x7efefeff)) & -0x7efeff00) !== 0)) {
      uVar1 = s32(_Str, 0);
      uVar4 = (uVar1 ^ ((((((_Val) & 0xFF) << 8) | ((_Val) & 0xFF)) << 16) | ((((_Val) & 0xFF) << 8) | ((_Val) & 0xFF))));
      uVar3 = ((uVar1 ^ -1) ^ (uVar1 + 0x7efefeff));
      puVar5 = (_Str + 4);
      if (((((uVar4 ^ -1) ^ (uVar4 + 0x7efefeff)) & -0x7efeff00) !== 0));
      if (((uVar3 & -0x7efeff00) !== 0)) {
        if (((uVar3 & 0x1010100) !== 0)) {
          return 0;
        }
        if ((((uVar1 + 0x7efefeff) & -0x80000000) === 0)) {
          return 0;
        }
      }
    }
    uVar1 = s32(_Str, 0);
    if ((((uVar1) & 0xFF) === ((_Val) & 0xFF))) {
      return _Str;
    }
    if ((((uVar1) & 0xFF) === 0)) {
      return 0;
    }
    cVar2 = (((uVar1 >>> 8)) & 0xFF);
    if ((cVar2 === ((_Val) & 0xFF))) {
      return (_Str + 1);
    }
    if ((cVar2 === 0)) {
      return 0;
    }
    cVar2 = (((uVar1 >>> 0x10)) & 0xFF);
    if ((cVar2 === ((_Val) & 0xFF))) {
      return (_Str + 2);
    }
    if ((cVar2 === 0));
    if ((cVar2 === ((_Val) & 0xFF))) {
      return (_Str + 3);
    }
    _Str = puVar5;
    if ((cVar2 === 0)) {
      return 0;
    }
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _strncmp */
    /* Libraries: */  /* Visual */  /* Studio */  /* 1998 */  /* Debug, */  /* Visual */  /* Studio */  /* 1998 */

 /* Release  */ */ export function _strncmp (_Str1, _Str2, _MaxCount)

 {
  let cVar1;
  let cVar2;
  let sVar3;
  let iVar4;
  let uVar5;
  let pcVar6;
  let pcVar7;

  uVar5 = 0;
  sVar3 = _MaxCount;
  pcVar6 = _Str1;
  if ((_MaxCount !== 0)) {
    do {
      if ((sVar3 === 0));
      cVar1 = _MEM[pcVar6];
      pcVar6 = (pcVar6 + 1);
    } while ((cVar1 !== 0));
    iVar4 = (_MaxCount - sVar3);
    do {
      pcVar6 = _Str2;
      pcVar7 = _Str1;
      if ((iVar4 === 0));
      pcVar7 = (_Str1 + 1);
      pcVar6 = (_Str2 + 1);
      cVar2 = _MEM[_Str1];
      cVar1 = _MEM[_Str2];
      _Str2 = pcVar6;
      _Str1 = pcVar7;
    } while ((cVar1 === cVar2));
    uVar5 = 0;
    if ((_MEM[pcVar6 + -1] <= _MEM[pcVar7 + -1])) {
      if ((_MEM[pcVar6 + -1] === _MEM[pcVar7 + -1])) {
        return 0;
      }
      uVar5 = -2;
    }
    uVar5 = (~uVar5);
  }
  return uVar5;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fread */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fread (_DstBuf, _ElementSize, _Count, _File)

 {
  let uVar1;
  let _Size;
  let iVar2;
  let local_20;
  let local_1c;
  let local_10;
  let local_c;
  let local_8;

  local_c = _DstBuf;
  uVar1 = _Count * _ElementSize;
  if ((uVar1 === 0)) {
    _Count = 0;
  }
  else {
    local_10 = uVar1;
    if (((s32(DAT_0000000c, 0) & 0x10c) === 0)) {
      local_20 = 0x1000;
    }
    else {
      local_20 = s32(DAT_00000018, 0);
    }
    while ((local_10 !== 0)) {
      if ((s32(DAT_00000004, 0) === 0)) {
        if ((local_10 < local_20)) {
          iVar2 = __filbuf(_File);
          if ((iVar2 === -1)) {
            return ((uVar1 - local_10) / _ElementSize | 0);
          }
          local_8 = ((iVar2) & 0xFF);
          _MEM[local_c] = local_8;
          local_c = (local_c + 1);
          local_10 = (local_10 - 1);
          local_20 = s32(DAT_00000018, 0);
        }
        else {
          if ((local_20 === 0)) {
            local_1c = local_10;
          }
          else {
            local_1c = (local_10 - (local_10 % local_20));
          }
          iVar2 = __read(s32(DAT_00000010, 0), local_c, local_1c);
          if ((iVar2 === 0)) {
            w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x10));
            return ((uVar1 - local_10) / _ElementSize | 0);
          }
          if ((iVar2 === -1)) {
            w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x20));
            return ((uVar1 - local_10) / _ElementSize | 0);
          }
          local_10 = (local_10 - iVar2);
          local_c = (local_c + iVar2);
        }
      }
      else {
        _Size = s32(DAT_00000004, 0);
        if ((local_10 <= s32(DAT_00000004, 0))) {
          _Size = local_10;
        }
        FID_conflict:_memcpy(local_c, s32(DAT_00000000, 0), _Size);
        local_10 = (local_10 - _Size);
        w32(DAT_00000004, 0, (s32(DAT_00000004, 0) - _Size));
        w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + _Size));
        local_c = (local_c + _Size);
      }
    }
  }
  return _Count;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fwrite */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fwrite (_Str, _Size, _Count, _File)

 {
  let uVar1;
  let sVar2;
  let iVar3;
  let uVar4;
  let local_20;
  let local_1c;
  let local_10;
  let local_c;

  local_c = _Str;
  uVar1 = _Count * _Size;
  if ((uVar1 === 0)) {
    sVar2 = 0;
  }
  else {
    local_10 = uVar1;
    if (((s32(DAT_0000000c, 0) & 0x10c) === 0)) {
      local_20 = 0x1000;
    }
    else {
      local_20 = s32(DAT_00000018, 0);
    }
    do {
      while ((local_20 <= local_10)) {
        while ((s32(DAT_00000004, 0) === 0)) {
          if ((local_10 === 0)) {
            return _Count;
          }
          if ((s32(DAT_00000004, 0) === 0));
          if ((local_10 <= s32(DAT_00000004, 0))) {
            uVar4 = local_10;
          }
          FID_conflict:_memcpy(s32(DAT_00000000, 0), local_c, uVar4);
          local_10 = (local_10 - uVar4);
          w32(DAT_00000004, 0, (s32(DAT_00000004, 0) - uVar4));
          w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + uVar4));
          local_c = (local_c + uVar4);
        }
        if ((local_20 <= local_10));
        if ((iVar3 === -1)) {
          return ((uVar1 - local_10) / _Size | 0);
        }
        local_c = (local_c + 1);
        local_10 = (local_10 - 1);
        if ((s32(DAT_00000018, 0) < 1)) {
          local_20 = 1;
        }
        else {
          local_20 = s32(DAT_00000018, 0);
        }
      }
      if ((iVar3 !== 0)) {
        return ((uVar1 - local_10) / _Size | 0);
      }
      if ((local_20 === 0)) {
        local_1c = local_10;
      }
      else {
        local_1c = (local_10 - (local_10 % local_20));
      }
      uVar4 = __write(s32(DAT_00000010, 0), local_c, local_1c);
      if ((uVar4 === -1)) {
        w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x20));
        return ((uVar1 - local_10) / _Size | 0);
      }
      local_10 = (local_10 - uVar4);
      local_c = (local_c + uVar4);
    } while ((local_1c <= uVar4));
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x20));
    sVar2 = ((uVar1 - local_10) / _Size | 0);
  }
  return sVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __chdir */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __chdir (_Path)

 {
  let BVar1;
  let DVar2;
  let uVar3;
  let local_110;
  let local_10f;
  let local_10e;
  let local_10d;
  let local_10c;
  let local_10b;

  BVar1 = FUN_006e7c88(_Path);
  if ((DVar2 !== 0)) {
    if ((local_10c === local_10b)) {
      return 0;
    }
    local_110 = 0x3d;
    uVar3 = __mbctoupper(u8(local_10c));
    local_10f = ((uVar3) & 0xFF);
    local_10e = 0x3a;
    local_10d = 0;
    BVar1 = FUN_006e7c80(DAT_fffffef0, DAT_fffffef4);
    if ((BVar1 !== 0)) {
      return 0;
    }
  }
  DVar2 = FUN_006e7b00();
  __dosmaperr(DVar2);
  return -1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _strrchr */
    /* Libraries: */  /* Visual */  /* Studio */  /* 1998 */  /* Debug, */  /* Visual */  /* Studio */  /* 1998 */

 /* Release  */ */ export function _strrchr (_Str, _Ch)

 {
  let cVar1;
  let iVar2;
  let pcVar3;
  let pcVar4;

  iVar2 = -1;
  do {
    pcVar4 = _Str;
    if ((iVar2 === 0));
    pcVar4 = (_Str + 1);
    cVar1 = _MEM[_Str];
    _Str = pcVar4;
  } while ((cVar1 !== 0));
  iVar2 = (-(iVar2 + 1));
  pcVar4 = (pcVar4 + -1);
  do {
    pcVar3 = pcVar4;
    if ((iVar2 === 0));
    pcVar3 = (pcVar4 + -1);
    cVar1 = _MEM[pcVar4];
    pcVar4 = pcVar3;
  } while ((((_Ch) & 0xFF) !== cVar1));
  pcVar3 = (pcVar3 + 1);
  if ((_MEM[pcVar3 + 1] !== ((_Ch) & 0xFF))) {
    pcVar3 = 0;
  }
  return pcVar3;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fgets */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fgets (_Buf, _MaxCount, _File)

 {
  let cVar1;
  let pcVar2;
  let iVar3;
  let pcVar4;
  let local_10;
  let local_c;

  local_c = _Buf;
  if ((iVar3 === 1)) {
    /* DEVIATION: intrinsic */;
    pcVar4 = pcVar2();
    return pcVar4;
  }
  if ((iVar3 === 1)) {
    /* DEVIATION: intrinsic */;
    pcVar4 = pcVar2();
    return pcVar4;
  }
  if ((_MaxCount < 1)) {
    _Buf = 0;
  }
  else {
    do {
      _MaxCount = (_MaxCount + -1);
      if ((_MaxCount === 0));
      if ((s32(DAT_00000004, 0) < 0)) {
        local_10 = __filbuf(_File);
      }
      else {
        local_10 = u8(_MEM[s32(DAT_00000000, 0)]);
        w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
      }
      if ((local_10 === -1)) {
        if ((_Buf === local_c)) {
          return 0;
        }
        break;
      }
      pcVar4 = (local_c + 1);
      _MEM[local_c] = ((local_10) & 0xFF);
      cVar1 = _MEM[local_c];
      local_c = pcVar4;
    } while ((cVar1 !== 0xa));
    _MEM[local_c] = 0;
  }
  return _Buf;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __filbuf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __filbuf (_File)

 {
  let pbVar1;
  let pcVar2;
  let iVar3;
  let uVar4;
  let local_c;

  if ((_File === 0)) {
    iVar3 = __CrtDbgReport(2, 0x61d870, 0x69, 0, 0x61d818);
    if ((iVar3 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar3 = pcVar2();
      return iVar3;
    }
  }
  if (((s32(DAT_0000000c, 0) & 0x40) !== 0)) {
    uVar4 = -1;
  }
  else if (((s32(DAT_0000000c, 0) & 2) === 0)) {
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 1));
    if (((s32(DAT_0000000c, 0) & 0x10c) === 0)) {
      __getbuf(_File);
    }
    else {
      w32(DAT_00000000, 0, s32(DAT_00000008, 0));
    }
    iVar3 = __read(s32(DAT_00000010, 0), s32(DAT_00000008, 0), s32(DAT_00000018, 0));
    w32(DAT_00000004, 0, iVar3);
    if ((s32(DAT_00000004, 0) === -1)) {
      if ((s32(DAT_00000004, 0) === 0)) {
        w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x10));
      }
      else {
        w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x20));
      }
      w32(DAT_00000004, 0, 0);
      uVar4 = -1;
    }
    else {
      if (((s32(DAT_0000000c, 0) & 0x82) === 0)) {
        if ((s32(DAT_00000010, 0) === -1)) {
          local_c = DAT_0063a420;
        }
        else {
          local_c = (s32((DAT_006e69f0 + ((s32(DAT_00000010, 0) & -32) >> 3)), 0) + (s32(DAT_00000010, 0) & 0x1f) * 8);
        }
        if (((_MEM[local_c + 4] & 0x82) === 0x82)) {
          w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x2000));
        }
      }
      if (((s32(DAT_0000000c, 0) & 0x400) === 0)) {
        w32(DAT_00000018, 0, 0x1000);
      }
      w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
      pbVar1 = s32(DAT_00000000, 0);
      w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
      uVar4 = u8(_MEM[pbVar1]);
    }
  }
  else {
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x20));
    uVar4 = -1;
  }
  return uVar4;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fputc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fputc (_Ch, _File)

 {
  let pcVar1;
  let iVar2;
  let local_c;

  if ((_File === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d87c, 0x2d, 0, 0x61d818);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
  if ((s32(DAT_00000004, 0) < 0)) {
    local_c = __flsbuf(_Ch, _File);
  }
  else {
    _MEM[s32(DAT_00000000, 0)] = ((_Ch) & 0xFF);
    local_c = u8(_MEM[s32(DAT_00000000, 0)]);
    w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
  }
  return local_c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _putc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _putc (_Ch, _File)

 {
  let iVar1;

  iVar1 = _fputc(_Ch, _File);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fgetc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fgetc (_File)

 {
  let pcVar1;
  let iVar2;
  let local_8;

  if ((_File === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61d884, 0x29, 0, 0x61d850);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
  if ((s32(DAT_00000004, 0) < 0)) {
    local_8 = __filbuf(_File);
  }
  else {
    local_8 = u8(_MEM[s32(DAT_00000000, 0)]);
    w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _getc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _getc (_File)

 {
  let iVar1;

  iVar1 = _fgetc(_File);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __strnicmp */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __strnicmp (_Str1, _Str2, _MaxCount)

 {
  let cVar1;
  let bVar2;
  let uVar3;
  let _C;
  let iVar4;
  let uVar5;
  let bVar6;

  iVar4 = 0;
  if ((_MaxCount !== 0)) {
    if ((DAT_0063a078 === 0)) {
      do {
        bVar2 = _MEM[_Str1];
        cVar1 = _MEM[_Str2];
        uVar3 = ((bVar2 << 8) | cVar1);
        if ((bVar2 === 0));
        uVar5 = ((uVar3) & 0xFFFF);
        if ((cVar1 === 0));
        _Str2 = (_Str2 + 1);
        if ((bVar2 < 0x5b)) {
          uVar5 = (((((bVar2 + 0x20) << 8) | cVar1)) & 0xFFFF);
        }
        uVar3 = ((uVar5) & 0xFFFF);
        bVar2 = ((uVar5) & 0xFF);
        if ((bVar2 < 0x5b)) {
          uVar3 = (((((uVar5 >>> 8) << 8) | (bVar2 + 0x20))) & 0xFFFF);
        }
        bVar2 = (((uVar3 >>> 8)) & 0xFF);
        bVar6 = (bVar2 < ((uVar3) & 0xFF));
        if ((bVar2 !== ((uVar3) & 0xFF)));
      } while ((_MaxCount !== 0));
      iVar4 = 0;
      bVar2 = (((uVar3 >>> 8)) & 0xFF);
      bVar6 = (bVar2 < ((uVar3) & 0xFF));
      if ((bVar2 !== ((uVar3) & 0xFF))) {
 LAB_005f410b: :
        iVar4 = -1;
        if ((!bVar6)) {
          iVar4 = 1;
        }
      }
    }
    else {
      uVar5 = 0;
      _C = 0;
      do {
        _C = (((_C >>> 8) << 8) | _MEM[_Str1]);
        uVar5 = (((uVar5 >>> 8) << 8) | _MEM[_Str2]);
        if ((uVar5 === 0));
        _Str2 = (_Str2 + 1);
        uVar5 = _tolower(uVar5);
        _C = _tolower(_C);
        bVar6 = (_C < uVar5);
        if ((_C !== uVar5));
      } while ((_MaxCount !== 0));
      iVar4 = 0;
      bVar6 = (_C < uVar5);
      if ((_C !== uVar5)) {
 LAB_005f414d: :
        iVar4 = -1;
        if ((!bVar6)) {
          iVar4 = 1;
        }
      }
    }
  }
  return iVar4;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cinit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cinit (param_1)

 {
  let iVar1;

  if ((PTR___fpmath_00639fb0 !== 0)) {
    wv(PTR___fpmath_00639fb0, PTR___fpmath_00639fb0);
  }
  __initterm(DAT_006246ac, DAT_006248bc);
  iVar1 = __initterm(DAT_00624000, DAT_006245a8);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _exit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _exit (_Code)

 {
  doexit(_Code, 0, 0);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __exit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __exit (param_1)

 {
  doexit(param_1, 1, 0);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cexit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cexit ()

 {
  doexit(0, 0, 1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __c_exit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __c_exit ()

 {
  doexit(0, 1, 1);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */
 /* address  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _doexit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function doexit (param_1, param_2, param_3)

 {
  let hProcess;
  let uVar1;
  let uExitCode;
  let local_8;

  if ((DAT_00639f5c === 1)) {
    uExitCode = param_1;
    hProcess = FUN_006e7c48();
    FUN_006e7c78(hProcess, uExitCode);
  }
  _DAT_00639f58 = 1;
  wv(DAT_00639f54, ((param_3) & 0xFF));
  if ((param_2 === 0)) {
    if ((DAT_006e6b68 !== 0)) {
      local_8 = DAT_006e6b54;
      while ((DAT_006e6b68 <= local_8)) {
        if ((s32(local_8, -1) !== 0)) {
          local_8 = s32(local_8, -1);
        }
      }
    }
    __initterm(DAT_006249c0, DAT_00624bc8);
  }
  __initterm(DAT_00624ccc, DAT_00624dd0);
  if (((uVar1 & 0x20) !== 0)) {
    wv(DAT_00639f60, 1);
    __CrtDumpMemoryLeaks();
  }
  if ((param_3 === 0)) {
    wv(DAT_00639f5c, 1);
                     /* /*  WARNING: */  /* Subroutine */  /* does */  /* not */
     /* return  */ */ FUN_006e7bd0(param_1);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __initterm */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __initterm (param_1, param_2)

 {
  for (/* cond: (param_1 < param_2) */); param_1 = (param_1 < param_2); param_1 = (param_1 + 1)) {
    if ((s32(param_1, 0) !== 0)) {
      param_1 = s32(param_1, 0);
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _strstr */
    /* Libraries: */  /* Visual */  /* Studio */  /* 1998 */  /* Debug, */  /* Visual */  /* Studio */  /* 1998 */

 /* Release  */ */ export function _strstr (_Str, _SubStr)

 {
  let pcVar1;
  let pcVar2;
  let cVar3;
  let uVar4;
  let cVar5;
  let uVar6;
  let uVar7;
  let pcVar8;
  let puVar9;
  let pcVar10;

  cVar3 = _MEM[_SubStr];
  if ((cVar3 === 0)) {
    return _Str;
  }
  if ((_MEM[_SubStr + 1] === 0)) {
    while (((_Str & 3) !== 0)) {
      uVar4 = s32(_Str, 0);
      if ((((uVar4) & 0xFF) === cVar3)) {
        return _Str;
      }
      _Str = (_Str + 1);
      if ((((uVar4) & 0xFF) === 0)) {
        return 0;
      }
    }
    while ((cVar5 === 0)) {
      while (((((uVar7 ^ -1) ^ (uVar7 + 0x7efefeff)) & -0x7efeff00) !== 0)) {
        uVar4 = s32(_Str, 0);
        uVar7 = (uVar4 ^ ((((cVar3 << 8) | cVar3) << 16) | ((cVar3 << 8) | cVar3)));
        uVar6 = ((uVar4 ^ -1) ^ (uVar4 + 0x7efefeff));
        puVar9 = (_Str + 4);
        if (((((uVar7 ^ -1) ^ (uVar7 + 0x7efefeff)) & -0x7efeff00) !== 0));
        if (((uVar6 & -0x7efeff00) !== 0)) {
          if (((uVar6 & 0x1010100) !== 0)) {
            return 0;
          }
          if ((((uVar4 + 0x7efefeff) & -0x80000000) === 0)) {
            return 0;
          }
        }
      }
      uVar4 = s32(_Str, 0);
      if ((((uVar4) & 0xFF) === cVar3)) {
        return _Str;
      }
      if ((((uVar4) & 0xFF) === 0)) {
        return 0;
      }
      cVar5 = (((uVar4 >>> 8)) & 0xFF);
      if ((cVar5 === cVar3)) {
        return (_Str + 1);
      }
      if ((cVar5 === 0)) {
        return 0;
      }
      cVar5 = (((uVar4 >>> 0x10)) & 0xFF);
      if ((cVar5 === cVar3)) {
        return (_Str + 2);
      }
      if ((cVar5 === 0));
      if ((cVar5 === cVar3)) {
        return (_Str + 3);
      }
      _Str = puVar9;
      if ((cVar5 === 0)) {
        return 0;
      }
    }
    return 0;
  }
  do {
    cVar5 = _MEM[_Str];
    do {
      while ((cVar5 !== cVar3)) {
        if ((cVar5 === 0)) {
          return 0;
        }
        cVar5 = _MEM[_Str + 1];
      }
      cVar5 = _MEM[_Str + 1];
      pcVar10 = (_Str + 1);
      pcVar8 = _SubStr;
    } while ((cVar5 !== _MEM[_SubStr + 1]));
    do {
      if ((_MEM[pcVar8 + 2] === 0)) {
 LAB_005f43e3: :
        return (_Str + -1);
      }
      if ((_MEM[pcVar10] !== _MEM[pcVar8 + 2]));
      if ((_MEM[pcVar8 + 3] === 0));
      pcVar8 = (pcVar8 + 2);
      pcVar10 = (pcVar10 + 2);
    } while ((_MEM[pcVar8 + 3] === _MEM[pcVar10 + 1]));
  } while ( true );
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _malloc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _malloc (_Size)

 {
  let pvVar1;

  pvVar1 = __nh_malloc_dbg(_Size, DAT_0063a428, 1, 0, 0);
  return pvVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __malloc_dbg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __malloc_dbg (param_1, param_2, param_3, param_4)

 {
  __nh_malloc_dbg(param_1, DAT_0063a428, param_2, param_3, param_4);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __nh_malloc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __nh_malloc (_Size, _NhFlag)

 {
  let pvVar1;

  pvVar1 = __nh_malloc_dbg(_Size, _NhFlag, 1, 0, 0);
  return pvVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __nh_malloc_dbg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __nh_malloc_dbg (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;

  while ((param_2 === 0)) {
    iVar1 = __heap_alloc_dbg(param_1, param_3, param_4, param_5);
    if ((iVar1 !== 0)) {
      return iVar1;
    }
    if ((param_2 === 0));
    if ((iVar1 === 0)) {
      return 0;
    }
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __heap_alloc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __heap_alloc (_Size)

 {
  let pvVar1;

  pvVar1 = __heap_alloc_dbg(_Size, 1, 0, 0);
  return pvVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __heap_alloc_dbg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __heap_alloc_dbg (param_1, param_2, param_3, param_4)

 {
  let pcVar1;
  let bVar2;
  let puVar3;
  let iVar4;
  let puVar5;
  let iVar6;

  bVar2 = 0;
  if ((iVar4 === 1)) {
    /* DEVIATION: intrinsic */;
    puVar5 = pcVar1();
    return puVar5;
  }
  iVar4 = DAT_00639f74;
  if ((DAT_00639f74 === DAT_00639f78)) {
    /* DEVIATION: intrinsic */;
    puVar5 = pcVar1();
    return puVar5;
  }
  iVar6 = PTR_FUN_0063a42c(1, 0, param_1, param_2, DAT_00639f74, param_3, param_4);
  if ((iVar6 === 0)) {
    if ((param_3 === 0)) {
      iVar4 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61dc44);
      if ((iVar4 === 1)) {
        /* DEVIATION: intrinsic */;
        puVar5 = pcVar1();
        return puVar5;
      }
    }
    else {
      iVar4 = __CrtDbgReport(0, 0, 0, 0, 0x61dc68, param_3, param_4);
      if ((iVar4 === 1)) {
        /* DEVIATION: intrinsic */;
        puVar5 = pcVar1();
        return puVar5;
      }
    }
    puVar5 = 0;
  }
  else {
    if (((None & 1) === 0)) {
      bVar2 = 1;
    }
    if (((param_1 + 0x24) < -31)) {
      if ((iVar6 === 1)) {
        /* DEVIATION: intrinsic */;
        puVar5 = pcVar1();
        return puVar5;
      }
      puVar5 = __heap_alloc_base((param_1 + 0x24));
      if ((puVar5 === 0)) {
        puVar5 = 0;
      }
      else {
        wv(DAT_00639f74, (DAT_00639f74 + 1));
        if (bVar2) {
          w32(puVar5, 0, 0);
          w32(puVar5, 1, 0);
          w32(puVar5, 2, 0);
          w32(puVar5, 3, -0x1234544);
          w32(puVar5, 4, param_1);
          w32(puVar5, 5, 3);
          w32(puVar5, 6, 0);
        }
        else {
          wv(DAT_006e5474, (DAT_006e5474 + param_1));
          wv(DAT_006e547c, (DAT_006e547c + param_1));
          if ((DAT_006e5480 < (DAT_006e547c + param_1))) {
            wv(DAT_006e5480, (DAT_006e547c + param_1));
          }
          puVar3 = puVar5;
          if ((DAT_006e5478 !== 0)) {
            w32(DAT_006e5478, 1, puVar5);
            puVar3 = DAT_006e5470;
          }
          wv(DAT_006e5470, puVar3);
          w32(puVar5, 0, DAT_006e5478);
          w32(puVar5, 1, 0);
          w32(puVar5, 2, param_3);
          w32(puVar5, 3, param_4);
          w32(puVar5, 4, param_1);
          w32(puVar5, 5, param_2);
          w32(puVar5, 6, iVar4);
          wv(DAT_006e5478, puVar5);
        }
        _memset((puVar5 + 7), u8(DAT_00639f7c), 4);
        _memset((puVar5 + (param_1 + 0x20)), u8(DAT_00639f7c), 4);
        _memset((puVar5 + 8), u8(DAT_00639f84), param_1);
        puVar5 = (puVar5 + 8);
      }
    }
    else {
      iVar4 = __CrtDbgReport(1, 0, 0, 0, 0x61dc1c, param_1);
      if ((iVar4 === 1)) {
        /* DEVIATION: intrinsic */;
        puVar5 = pcVar1();
        return puVar5;
      }
      puVar5 = 0;
    }
  }
  return puVar5;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _calloc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _calloc (_Count, _Size)

 {
  let pvVar1;

  pvVar1 = __calloc_dbg(_Count, _Size, 1, 0, 0);
  return pvVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __calloc_dbg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __calloc_dbg (param_1, param_2, param_3, param_4, param_5)

 {
  let puVar1;
  let local_10;

  puVar1 = __malloc_dbg(param_2 * param_1, param_3, param_4, param_5);
  if ((puVar1 !== 0)) {
    for (/* cond: (local_10 < (puVar1 + param_2 * param_1)) */); local_10 = (local_10 < (puVar1 + param_2 * param_1)); local_10 = (local_10 + 1)) {
      _MEM[local_10] = 0;
    }
  }
  return puVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __expand */
 /* _realloc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__expand (_Memory, _NewSize)

 {
  let pvVar1;

  pvVar1 = __realloc_dbg(_Memory, _NewSize, 1, 0, 0);
  return pvVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __realloc_dbg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __realloc_dbg (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;

  uVar1 = realloc_help(param_1, param_2, param_3, param_4, param_5, 1);
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _realloc_help */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function realloc_help (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let pcVar1;
  let piVar2;
  let iVar3;
  let piVar4;
  let iVar5;
  let bVar6;
  let local_10;

  if ((param_1 === 0)) {
    piVar2 = __malloc_dbg(param_2, param_3, param_4, param_5);
  }
  else if ((param_2 !== 0)) {
    if ((iVar3 === 1)) {
      /* DEVIATION: intrinsic */;
      piVar4 = pcVar1();
      return piVar4;
    }
    iVar3 = DAT_00639f74;
    if ((DAT_00639f74 === DAT_00639f78)) {
      /* DEVIATION: intrinsic */;
      piVar4 = pcVar1();
      return piVar4;
    }
    iVar5 = PTR_FUN_0063a42c(2, param_1, param_2, param_3, DAT_00639f74, param_4, param_5);
    if ((iVar5 === 0)) {
      if ((param_4 === 0)) {
        iVar3 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61de04);
        if ((iVar3 === 1)) {
          /* DEVIATION: intrinsic */;
          piVar4 = pcVar1();
          return piVar4;
        }
      }
      else {
        iVar3 = __CrtDbgReport(0, 0, 0, 0, 0x61de28, param_4, param_5);
        if ((iVar3 === 1)) {
          /* DEVIATION: intrinsic */;
          piVar4 = pcVar1();
          return piVar4;
        }
      }
      piVar2 = 0;
    }
    else if ((param_2 < -36)) {
      if ((iVar5 === 1)) {
        /* DEVIATION: intrinsic */;
        piVar4 = pcVar1();
        return piVar4;
      }
      iVar5 = __CrtIsValidHeapPointer(param_1);
      if ((iVar5 === 1)) {
        /* DEVIATION: intrinsic */;
        piVar4 = pcVar1();
        return piVar4;
      }
      piVar4 = (param_1 + -32);
      bVar6 = (s32((param_1 + -12), 0) === 3);
      if (bVar6) {
        if ((iVar5 === 1)) {
          /* DEVIATION: intrinsic */;
          piVar4 = pcVar1();
          return piVar4;
        }
      }
      else {
        if (((param_3 & 0xffff) === 1)) {
          param_3 = 2;
        }
        if ((iVar5 === 1)) {
          /* DEVIATION: intrinsic */;
          piVar4 = pcVar1();
          return piVar4;
        }
      }
      if ((param_6 === 0)) {
        local_10 = __expand_base(piVar4, (param_2 + 0x24));
        if ((local_10 === 0)) {
          return 0;
        }
      }
      else {
        local_10 = __realloc_base(piVar4, (param_2 + 0x24));
        if ((local_10 === 0)) {
          return 0;
        }
      }
      wv(DAT_00639f74, (DAT_00639f74 + 1));
      if ((!bVar6)) {
        wv(DAT_006e5474, (DAT_006e5474 - s32(local_10, 4)));
        wv(DAT_006e5474, ((DAT_006e5474 - s32(local_10, 4)) + param_2));
        wv(DAT_006e547c, (DAT_006e547c - s32(local_10, 4)));
        wv(DAT_006e547c, ((DAT_006e547c - s32(local_10, 4)) + param_2));
        if ((DAT_006e5480 < ((DAT_006e547c - s32(local_10, 4)) + param_2))) {
          wv(DAT_006e5480, ((DAT_006e547c - s32(local_10, 4)) + param_2));
        }
      }
      piVar2 = (local_10 + 8);
      if ((s32(local_10, 4) < param_2)) {
        _memset((s32(local_10, 4) + piVar2), u8(DAT_00639f84), (param_2 - s32(local_10, 4)));
      }
      _memset((param_2 + piVar2), u8(DAT_00639f7c), 4);
      if ((!bVar6)) {
        w32(local_10, 2, param_4);
        w32(local_10, 3, param_5);
        w32(local_10, 6, iVar3);
      }
      w32(local_10, 4, param_2);
      if ((iVar3 === 1)) {
        /* DEVIATION: intrinsic */;
        piVar4 = pcVar1();
        return piVar4;
      }
      if ((!bVar6)) {
        if ((s32(local_10, 0) === 0)) {
          if ((iVar3 === 1)) {
            /* DEVIATION: intrinsic */;
            piVar4 = pcVar1();
            return piVar4;
          }
          wv(DAT_006e5470, s32(local_10, 1));
        }
        else {
          w32((s32(local_10, 0) + 4), 0, s32(local_10, 1));
        }
        if ((s32(local_10, 1) === 0)) {
          if ((iVar3 === 1)) {
            /* DEVIATION: intrinsic */;
            piVar4 = pcVar1();
            return piVar4;
          }
          wv(DAT_006e5478, s32(local_10, 0));
        }
        else {
          w32(s32(local_10, 1), 0, s32(local_10, 0));
        }
        if ((DAT_006e5478 === 0)) {
          wv(DAT_006e5470, local_10);
        }
        else {
          w32(DAT_006e5478, 1, local_10);
        }
        w32(local_10, 0, DAT_006e5478);
        w32(local_10, 1, 0);
        wv(DAT_006e5478, local_10);
      }
    }
    else {
      iVar3 = __CrtDbgReport(1, 0, 0, 0, 0x61ddd4, param_2);
      if ((iVar3 === 1)) {
        /* DEVIATION: intrinsic */;
        piVar4 = pcVar1();
        return piVar4;
      }
      piVar2 = 0;
    }
  }
  else {
    __free_dbg(param_1, param_3);
    piVar2 = 0;
  }
  return piVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __expand */
 /* _realloc */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__expand (_Memory, _NewSize)

 {
  let pvVar1;

  pvVar1 = __expand_dbg(_Memory, _NewSize, 1, 0, 0);
  return pvVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __expand_dbg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __expand_dbg (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;

  uVar1 = realloc_help(param_1, param_2, param_3, param_4, param_5, 0);
  return uVar1;
}


 export function FUN_005f4f70 (param_1)

 {
  __free_dbg(param_1, 1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __free_dbg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __free_dbg (param_1, param_2)

 {
  let pcVar1;
  let iVar2;
  let _Dst;

  if ((iVar2 === 1)) {
    /* DEVIATION: intrinsic */;
    pcVar1 = pcVar1();
    return;
  }
  if ((param_1 !== 0)) {
    iVar2 = PTR_FUN_0063a42c(3, param_1, 0, param_2, 0, 0, 0);
    if ((iVar2 === 0)) {
      iVar2 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61df48);
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        pcVar1 = pcVar1();
        return;
      }
    }
    else {
      iVar2 = __CrtIsValidHeapPointer(param_1);
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        pcVar1 = pcVar1();
        return;
      }
      _Dst = (param_1 + -32);
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        pcVar1 = pcVar1();
        return;
      }
      if (((None & 4) === 0)) {
        iVar2 = _CheckBytes((param_1 + -4), DAT_00639f7c, 4);
        if ((iVar2 === 1)) {
          /* DEVIATION: intrinsic */;
          pcVar1 = pcVar1();
          return;
        }
        iVar2 = _CheckBytes((s32((param_1 + -16), 0) + param_1), DAT_00639f7c, 4);
        if ((iVar2 === 1)) {
          /* DEVIATION: intrinsic */;
          pcVar1 = pcVar1();
          return;
        }
      }
      if ((s32((param_1 + -12), 0) === 3)) {
        if ((iVar2 === 1)) {
          /* DEVIATION: intrinsic */;
          pcVar1 = pcVar1();
          return;
        }
        _memset(_Dst, u8(DAT_00639f80), (s32((param_1 + -16), 0) + 0x24));
        __free_base(_Dst);
      }
      else {
        if ((param_2 === 1)) {
          param_2 = 2;
        }
        if ((iVar2 === 1)) {
          /* DEVIATION: intrinsic */;
          pcVar1 = pcVar1();
          return;
        }
        wv(DAT_006e547c, (DAT_006e547c - s32((param_1 + -16), 0)));
        if (((None & 2) === 0)) {
          if ((s32(_Dst, 0) === 0)) {
            if ((iVar2 === 1)) {
              /* DEVIATION: intrinsic */;
              pcVar1 = pcVar1();
              return;
            }
            wv(DAT_006e5470, s32((param_1 + -28), 0));
          }
          else {
            w32((s32(_Dst, 0) + 4), 0, s32((param_1 + -28), 0));
          }
          if ((s32((param_1 + -28), 0) === 0)) {
            if ((iVar2 === 1)) {
              /* DEVIATION: intrinsic */;
              pcVar1 = pcVar1();
              return;
            }
            wv(DAT_006e5478, s32(_Dst, 0));
          }
          else {
            w32(s32((param_1 + -28), 0), 0, s32(_Dst, 0));
          }
          _memset(_Dst, u8(DAT_00639f80), (s32((param_1 + -16), 0) + 0x24));
          __free_base(_Dst);
        }
        else {
          w32((param_1 + -12), 0, 0);
          _memset(param_1, u8(DAT_00639f80), s32((param_1 + -16), 0));
        }
      }
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __msize */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __msize (_Memory)

 {
  let sVar1;

  sVar1 = __msize_dbg(_Memory, 1);
  return sVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __msize_dbg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __msize_dbg (param_1, param_2)

 {
  let pcVar1;
  let iVar2;
  let uVar3;

  if (((DAT_00639f70 & 4) !== 0)) {
    iVar2 = __CrtCheckMemory();
    if ((iVar2 === 0)) {
      iVar2 = __CrtDbgReport(2, 0x61dca0, 0x47c, 0, 0x61dcac);
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        uVar3 = pcVar1();
        return uVar3;
      }
    }
  }
  iVar2 = __CrtIsValidHeapPointer(param_1);
  if ((iVar2 === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61dca0, 0x485, 0, 0x61ddb0);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      uVar3 = pcVar1();
      return uVar3;
    }
  }
  if ((s32((param_1 + -12), 0) !== 3)) {
    iVar2 = __CrtDbgReport(2, 0x61dca0, 0x48b, 0, 0x61d764);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      uVar3 = pcVar1();
      return uVar3;
    }
  }
  if ((param_2 === 1)) {
    param_2 = 2;
  }
  if ((s32((param_1 + -12), 0) !== param_2)) {
    iVar2 = __CrtDbgReport(2, 0x61dca0, 0x492, 0, 0x61de90);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      uVar3 = pcVar1();
      return uVar3;
    }
  }
  return s32((param_1 + -16), 0);
}


 export function FUN_005f5550 (param_1)

 {
  let uVar1;

  uVar1 = DAT_00639f78;
  wv(DAT_00639f78, param_1);
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtSetDbgBlockType */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtSetDbgBlockType (param_1, param_2)

 {
  let pcVar1;
  let iVar2;

  iVar2 = __CrtIsValidHeapPointer(param_1);
  if ((iVar2 !== 0)) {
    if ((s32((param_1 + -12), 0) !== 3)) {
      iVar2 = __CrtDbgReport(2, 0x61dca0, 0x4d3, 0, 0x61d764);
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        pcVar1 = pcVar1();
        return;
      }
    }
    w32((param_1 + -12), 0, param_2);
  }
  return;
}


 export function FUN_005f5620 (param_1)

 {
  let puVar1;

  puVar1 = PTR_FUN_0063a42c;
  wv(PTR_FUN_0063a42c, param_1);
  return puVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _CheckBytes */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _CheckBytes (param_1, param_2, param_3)

 {
  let pcVar1;
  let pcVar2;
  let iVar3;
  let uVar4;
  let local_8;

  local_8 = 1;
  pcVar2 = param_1;
  while ((iVar3 === 1)) {
    do {
      param_1 = pcVar2;
      iVar3 = (param_3 + -1);
      if ((param_3 === 0)) {
        return local_8;
      }
      pcVar2 = (param_1 + 1);
      param_3 = iVar3;
    } while ((_MEM[param_1] === param_2));
    iVar3 = __CrtDbgReport(0, 0, 0, 0, 0x61df64, param_1, _MEM[param_1], param_2);
    if ((iVar3 === 1));
  }
  /* DEVIATION: intrinsic */;
  uVar4 = pcVar1();
  return uVar4;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtCheckMemory */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtCheckMemory ()

 {
  let pcVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  let local_18;
  let local_c;
  let local_8;

  local_8 = 1;
  if (((DAT_00639f70 & 1) === 0)) {
    local_8 = 1;
  }
  else {
    iVar3 = __heapchk();
    if ((iVar3 === -2)) {
      for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32(local_c, 0)) {
        bVar2 = 1;
        if ((s32(local_c, 5) === 3)) {
          local_18 = s32(PTR_DAT_00639f88, (s32(local_c, 5) & 0xffff));
        }
        else {
          local_18 = 0x61e018;
        }
        iVar3 = _CheckBytes((local_c + 7), DAT_00639f7c, 4);
        if ((iVar3 === 0)) {
          iVar3 = __CrtDbgReport(0, 0, 0, 0, 0x61df1c, local_18, s32(local_c, 6), (local_c + 8));
          if ((iVar3 === 1)) {
            /* DEVIATION: intrinsic */;
            uVar4 = pcVar1();
            return uVar4;
          }
          bVar2 = 0;
        }
        iVar3 = _CheckBytes((local_c + (s32(local_c, 4) + 0x20)), DAT_00639f7c, 4);
        if ((iVar3 === 0)) {
          iVar3 = __CrtDbgReport(0, 0, 0, 0, 0x61def0, local_18, s32(local_c, 6), (local_c + 8));
          if ((iVar3 === 1)) {
            /* DEVIATION: intrinsic */;
            uVar4 = pcVar1();
            return uVar4;
          }
          bVar2 = 0;
        }
        if ((iVar3 === 0)) {
          iVar3 = __CrtDbgReport(0, 0, 0, 0, 0x61dfec, (local_c + 8));
          if ((iVar3 === 1)) {
            /* DEVIATION: intrinsic */;
            uVar4 = pcVar1();
            return uVar4;
          }
          bVar2 = 0;
        }
        if ((!bVar2)) {
          if ((iVar3 === 1)) {
            /* DEVIATION: intrinsic */;
            uVar4 = pcVar1();
            return uVar4;
          }
          iVar3 = __CrtDbgReport(0, 0, 0, 0, 0x61dfa0, local_18, (local_c + 8), s32(local_c, 4));
          if ((iVar3 === 1)) {
            /* DEVIATION: intrinsic */;
            uVar4 = pcVar1();
            return uVar4;
          }
          local_8 = 0;
        }
      }
    }
    else {
      /* switch */ () {
      case -6 :
        iVar3 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e04c);
        if ((iVar3 === 1)) {
          /* DEVIATION: intrinsic */;
          uVar4 = pcVar1();
          return uVar4;
        }
        break;
      case -5 :
        iVar3 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e070);
        if ((iVar3 === 1)) {
          /* DEVIATION: intrinsic */;
          uVar4 = pcVar1();
          return uVar4;
        }
        break;
      case -4 :
        iVar3 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e094);
        if ((iVar3 === 1)) {
          /* DEVIATION: intrinsic */;
          uVar4 = pcVar1();
          return uVar4;
        }
        break;
      case -3 :
        iVar3 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e0b8);
        if ((iVar3 === 1)) {
          /* DEVIATION: intrinsic */;
          uVar4 = pcVar1();
          return uVar4;
        }
        break;
      default :
        iVar3 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e020);
        if ((iVar3 === 1)) {
          /* DEVIATION: intrinsic */;
          uVar4 = pcVar1();
          return uVar4;
        }
      }
      local_8 = 0;
    }
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtSetDbgFlag */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtSetDbgFlag (param_1)

 {
  let iVar1;

  iVar1 = DAT_00639f70;
  if ((param_1 !== -1)) {
    wv(DAT_00639f70, param_1);
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtDoForAllClientObjects */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtDoForAllClientObjects (param_1, param_2)

 {
  let local_8;

  if (((DAT_00639f70 & 1) !== 0)) {
    for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32(local_8, 0)) {
      if (((s32(local_8, 5) & 0xffff) === 4)) {
        param_1 = param_1((local_8 + 8), param_2);
      }
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtIsValidPointer */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtIsValidPointer (param_1, param_2, param_3)

 {
  let BVar1;

  if ((BVar1 === 0)) {
    return 1;
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtIsValidHeapPointer */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtIsValidHeapPointer (param_1)

 {
  let BVar1;
  let iVar2;
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    BVar1 = 0;
  }
  else {
    iVar2 = __CrtIsValidPointer((param_1 + -32), 0x20, 1);
    if ((iVar2 === 0)) {
      BVar1 = 0;
    }
    else {
      local_c = ___sbh_find_block((param_1 + -32), DAT_fffffff0, DAT_fffffff8);
      if ((local_c === 0)) {
        if (((DAT_00639f20+1 & 0x80) === 0)) {
          BVar1 = FUN_006e7c14(DAT_006e69e4, 0, (param_1 + -32));
        }
        else {
          BVar1 = 1;
        }
      }
      else if ((_MEM[local_c] === 0)) {
        BVar1 = 0;
      }
      else {
        BVar1 = 1;
      }
    }
  }
  return BVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtIsMemoryBlock */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtIsMemoryBlock (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;

  iVar1 = __CrtIsValidHeapPointer(param_1);
  if ((s32((param_1 + -8), 0) <= DAT_00639f74)) {
    if ((param_3 !== 0)) {
      w32(param_3, 0, s32((param_1 + -8), 0));
    }
    if ((param_4 !== 0)) {
      w32(param_4, 0, s32((param_1 + -24), 0));
    }
    if ((param_5 !== 0)) {
      w32(param_5, 0, s32((param_1 + -20), 0));
    }
    return 1;
  }
  return 0;
}


 export function FUN_005f5d30 (param_1)

 {
  let uVar1;

  uVar1 = DAT_006e6b48;
  wv(DAT_006e6b48, param_1);
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtMemCheckpoint */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtMemCheckpoint (param_1)

 {
  let pcVar1;
  let iVar2;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    iVar2 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e100);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
  }
  else {
    w32(param_1, 0, DAT_006e5478);
    for (/* cond: (local_8 < 5) */); local_8 = (local_8 < 5); local_8 = (local_8 + 1)) {
      w32(param_1, (local_8 + 6), 0);
      w32(param_1, (local_8 + 1), s32(param_1, (local_8 + 6)));
    }
    for (/* cond: (local_c !== 0) */); local_c = (local_c !== 0); local_c = s32(local_c, 0)) {
      if (((s32(local_c, 5) & 0xffff) < 5)) {
        w32(param_1, ((s32(local_c, 5) & 0xffff) + 1), (s32(param_1, ((s32(local_c, 5) & 0xffff) + 1)) + 1));
        w32(param_1, ((s32(local_c, 5) & 0xffff) + 6), (s32(param_1, ((s32(local_c, 5) & 0xffff) + 6)) + s32(local_c, 4)));
      }
      else {
        iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e0dc, local_c);
        if ((iVar2 === 1)) {
          /* DEVIATION: intrinsic */;
          pcVar1 = pcVar1();
          return;
        }
      }
    }
    w32(param_1, 0xb, DAT_006e5480);
    w32(param_1, 0xc, DAT_006e5474);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtMemDifference */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtMemDifference (param_1, param_2, param_3)

 {
  let pcVar1;
  let iVar2;
  let uVar3;
  let local_c;
  let local_8;

  local_c = 0;
  if ((param_3 === 0)) {
    iVar2 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e128);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      uVar3 = pcVar1();
      return uVar3;
    }
    local_c = 0;
  }
  else {
    for (/* cond: (local_8 < 5) */); local_8 = (local_8 < 5); local_8 = (local_8 + 1)) {
      w32(param_1, (local_8 + 6), (s32(((param_3 + 0x18) + local_8 * 4), 0) - s32(((param_2 + 0x18) + local_8 * 4), 0)));
      w32(param_1, (local_8 + 1), (s32(((param_3 + 4) + local_8 * 4), 0) - s32(((param_2 + 4) + local_8 * 4), 0)));
      if (((None & 0x10) !== 0)) {
        local_c = 1;
      }
    }
    w32(param_1, 0xb, (s32((param_3 + 0x2c), 0) - s32((param_2 + 0x2c), 0)));
    w32(param_1, 0xc, (s32((param_3 + 0x30), 0) - s32((param_2 + 0x30), 0)));
    w32(param_1, 0, 0);
  }
  return local_c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtMemDumpAllObjectsSince */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtMemDumpAllObjectsSince (param_1)

 {
  let pcVar1;
  let iVar2;
  let local_c;
  let local_8;

  local_c = 0;
  iVar2 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e220);
  if ((iVar2 === 1)) {
    /* DEVIATION: intrinsic */;
    pcVar1 = pcVar1();
    return;
  }
  if ((param_1 !== 0)) {
    local_c = s32(param_1, 0);
  }
  local_8 = DAT_006e5478;
  do {
    if ((local_8 === local_c)) {
      iVar2 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e150);
      if ((iVar2 !== 1)) {
        return;
      }
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
    if (((None & 0x10) !== 0)) {
      if ((s32(local_8, 2) !== 0)) {
        iVar2 = __CrtIsValidPointer(s32(local_8, 2), 1, 0);
        if ((iVar2 === 0)) {
          iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e20c, s32(local_8, 3));
          if ((iVar2 === 1)) {
            /* DEVIATION: intrinsic */;
            pcVar1 = pcVar1();
            return;
          }
        }
        else {
          iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e200, s32(local_8, 2), s32(local_8, 3));
          if ((iVar2 === 1)) {
            /* DEVIATION: intrinsic */;
            pcVar1 = pcVar1();
            return;
          }
        }
      }
      iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e1f8, s32(local_8, 6));
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        pcVar1 = pcVar1();
        return;
      }
      if (((s32(local_8, 5) & 0xffff) === 4)) {
        iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e1c4, (local_8 + 8), (s32(local_8, 5) >>> 0x10), s32(local_8, 4));
        if ((iVar2 === 1)) {
          /* DEVIATION: intrinsic */;
          pcVar1 = pcVar1();
          return;
        }
        if ((DAT_006e6b48 === 0)) {
          __printMemBlockData(local_8);
        }
        else {
          wv(DAT_006e6b48, DAT_006e6b48((local_8 + 8), s32(local_8, 4)));
        }
      }
      else if ((s32(local_8, 5) === 1)) {
        iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e19c, (local_8 + 8), s32(local_8, 4));
        if ((iVar2 === 1)) {
          /* DEVIATION: intrinsic */;
          pcVar1 = pcVar1();
          return;
        }
        __printMemBlockData(local_8);
      }
      else if (((s32(local_8, 5) & 0xffff) === 2)) {
        iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e168, (local_8 + 8), (s32(local_8, 5) >>> 0x10), s32(local_8, 4));
        if ((iVar2 === 1)) {
          /* DEVIATION: intrinsic */;
          pcVar1 = pcVar1();
          return;
        }
        __printMemBlockData(local_8);
      }
    }
    local_8 = s32(local_8, 0);
  } ( true );
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __printMemBlockData */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __printMemBlockData (param_1)

 {
  let bVar1;
  let pcVar2;
  let iVar3;
  let local_58;
  let local_50;
  let local_4c;
  let local_38;

  local_50 = 0;
  while ((iVar3 <= local_50)) {
    iVar3 = s32((param_1 + 0x10), 0);
    if ((0xf < iVar3)) {
      iVar3 = 0x10;
    }
    if ((iVar3 <= local_50));
    if ((DAT_0063a29c < 2)) {
      local_58 = (((s16((PTR_DAT_0063a090 + u8(bVar1) * 2), 0)) & 0xFFFF) & 0x157);
    }
    else {
      local_58 = __isctype(u8(bVar1), 0x157);
    }
    if ((local_58 === 0)) {
      _MEM[DAT_ffffffb4 + local_50] = 0x20;
    }
    else {
      _MEM[DAT_ffffffb4 + local_50] = bVar1;
    }
    _sprintf((DAT_ffffffc8 + local_50 * 3), 0x61e244, u8(bVar1));
    local_50 = (local_50 + 1);
  }
  _MEM[DAT_ffffffb4 + local_50] = 0;
  iVar3 = __CrtDbgReport(0, 0, 0, 0, 0x61e234, DAT_ffffffb4, DAT_ffffffc8);
  if ((iVar3 === 1)) {
    /* DEVIATION: intrinsic */;
    pcVar2 = pcVar2();
    return;
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtDumpMemoryLeaks */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtDumpMemoryLeaks ()

 {
  let pcVar1;
  let iVar2;
  let uVar3;
  let local_38;
  let local_30;
  let local_2c;
  let local_24;

  __CrtMemCheckpoint(DAT_ffffffc8);
  if ((local_2c === 0)) {
    uVar3 = 0;
  }
  else {
    iVar2 = __CrtDbgReport(0, 0, 0, 0, DAT_0061dc40, 0x61e24c);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      uVar3 = pcVar1();
      return uVar3;
    }
    __CrtMemDumpAllObjectsSince(0);
    uVar3 = 1;
  }
  return uVar3;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtMemDumpStatistics */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtMemDumpStatistics (param_1)

 {
  let pcVar1;
  let iVar2;
  let local_8;

  if ((param_1 !== 0)) {
    for (/* cond: (local_8 < 5) */); local_8 = (local_8 < 5); local_8 = (local_8 + 1)) {
      iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e2a8, s32(((param_1 + 0x18) + local_8 * 4), 0), s32(((param_1 + 4) + local_8 * 4), 0), s32(PTR_DAT_00639f88, local_8));
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        pcVar1 = pcVar1();
        return;
      }
    }
    iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e284, s32((param_1 + 0x2c), 0));
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
    iVar2 = __CrtDbgReport(0, 0, 0, 0, 0x61e264, s32((param_1 + 0x30), 0));
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _memcpy */
 /* _memmove */
    /* Libraries: */  /* Visual */  /* Studio */  /* 1998 */  /* Debug, */  /* Visual */  /* Studio */  /* 1998 */

 /* Release  */ */ export function FID_conflict:_memcpy (in_EDX, _Dst, _Src, _Size)

 {
  let uVar1;
  // in_EDX promoted to parameter;
  let uVar2;
  let puVar3;
  let puVar4;
  let puVar5;
  let puVar6;

  if ((_Dst < (_Src + _Size))) {
    puVar3 = (_Src + _Size);
    puVar5 = (_Dst + _Size);
    if (((puVar5 & 3) === 0)) {
      uVar1 = (_Size >>> 2);
      while ((uVar1 === 0)) {
        puVar5 = (puVar5 + -1);
        puVar3 = (puVar3 + -1);
        if ((uVar1 === 0));
        w32(puVar5, -1, s32(puVar3, -1));
      }
      /* switch */ ((_Size & 3)  ) {
      case 1 :
 switchD_005f65c9_caseD_1: :
        _MEM[(puVar5 + 3)] = _MEM[(puVar3 + 3)];
        return _Dst;
      case 2 :
 switchD_005f65c9_caseD_2: :
        w16((puVar5 + 2), 0, s16((puVar3 + 2), 0));
        return _Dst;
      case 3 :
 switchD_005f65c9_caseD_3: :
        w16((puVar5 + 2), 0, s16((puVar3 + 2), 0));
        _MEM[(puVar5 + 1)] = _MEM[(puVar3 + 1)];
        return _Dst;
      }
    }
    else {
      puVar4 = (puVar3 + -1);
      puVar6 = (puVar5 + -1);
      if ((_Size < 0xd)) {
        for (/* cond: (_Size !== 0) */); _Size = (_Size !== 0); _Size = (_Size - 1)) {
          _MEM[puVar6] = _MEM[puVar4];
          puVar4 = (puVar4 + -1);
          puVar6 = (puVar6 + -1);
        }
        return _Dst;
      }
      uVar2 = ((-in_EDX) & 3);
      uVar1 = (_Size - uVar2);
      for (/* cond: (uVar2 !== 0) */); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
        _MEM[puVar6] = _MEM[puVar4];
        puVar4 = (puVar4 + -1);
        puVar6 = (puVar6 + -1);
      }
      puVar3 = (puVar4 + -3);
      puVar5 = (puVar6 + -3);
      for (/* cond: (uVar2 !== 0) */); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
        w32(puVar5, 0, s32(puVar3, 0));
        puVar3 = (puVar3 + -1);
        puVar5 = (puVar5 + -1);
      }
      /* switch */ ((uVar1 & 3)  ) {
      case 1 :
        goto switchD_005f65c9_caseD_1;
      case 2 :
        goto switchD_005f65c9_caseD_2;
      case 3 :
        goto switchD_005f65c9_caseD_3;
      }
    }
    return _Dst;
  }
  puVar3 = _Dst;
  if (((_Dst & 3) === 0)) {
    for (/* cond: (uVar1 !== 0) */); uVar1 = (uVar1 !== 0); uVar1 = (uVar1 - 1)) {
      w32(puVar3, 0, s32(_Src, 0));
      _Src = (_Src + 4);
      puVar3 = (puVar3 + 1);
    }
    /* switch */ ((_Size & 3)  ) {
    case 1 :
 switchD_005f6530_caseD_1: :
      _MEM[puVar3] = _MEM[_Src];
      return _Dst;
    case 2 :
 switchD_005f6530_caseD_2: :
      w16(puVar3, 0, s16(_Src, 0));
      return _Dst;
    case 3 :
 switchD_005f6530_caseD_3: :
      w16(puVar3, 0, s16(_Src, 0));
      _MEM[(puVar3 + 2)] = _MEM[(_Src + 2)];
      return _Dst;
    }
  }
  else {
    puVar4 = _Dst;
    if ((_Size < 0xd)) {
      for (/* cond: (_Size !== 0) */); _Size = (_Size !== 0); _Size = (_Size - 1)) {
        _MEM[puVar4] = _MEM[_Src];
        _Src = (_Src + 1);
        puVar4 = (puVar4 + 1);
      }
      return _Dst;
    }
    uVar2 = ((-_Dst) & 3);
    uVar1 = (_Size - uVar2);
    for (/* cond: (uVar2 !== 0) */); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
      _MEM[puVar3] = _MEM[_Src];
      _Src = (_Src + 1);
      puVar3 = (puVar3 + 1);
    }
    for (/* cond: (uVar2 !== 0) */); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
      w32(puVar3, 0, s32(_Src, 0));
      _Src = (_Src + 4);
      puVar3 = (puVar3 + 1);
    }
    /* switch */ ((uVar1 & 3)  ) {
    case 1 :
      goto switchD_005f6530_caseD_1;
    case 2 :
      goto switchD_005f6530_caseD_2;
    case 3 :
      goto switchD_005f6530_caseD_3;
    }
  }
  return _Dst;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __wrename */
 /* _rename */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__wrename (_OldFilename, _NewFilename)

 {
  let BVar1;
  let iVar2;
  let local_8;

  BVar1 = FUN_006e7c10(_OldFilename, _NewFilename);
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


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __wremove */
 /* _remove */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_remove (_Filename)

 {
  let BVar1;
  let iVar2;
  let local_8;

  BVar1 = FUN_006e7c08(_Filename);
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


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* __unlink */
 /* __wunlink */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:__unlink (_Filename)

 {
  let iVar1;

  iVar1 = FID_conflict:_remove(_Filename);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _rewind */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _rewind (_File)

 {
  let _FileHandle;
  let pcVar1;
  let iVar2;
  let local_10;

  if ((_File === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61e2c8, 0x2e, 0, 0x61d818);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
  }
  _FileHandle = s32(DAT_00000010, 0);
  __flush(_File);
  w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -49));
  if ((_FileHandle === -1)) {
    local_10 = DAT_0063a420;
  }
  else {
    local_10 = (s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + (_FileHandle & 0x1f) * 8);
  }
  _MEM[local_10 + 4] = (_MEM[local_10 + 4] & 0xfd);
  if (((s32(DAT_0000000c, 0) & 0x80) !== 0)) {
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -4));
  }
  __lseek(_FileHandle, 0, 0);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fseek */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fseek (_File, _Offset, _Origin)

 {
  let pcVar1;
  let iVar2;
  let lVar3;

  if ((iVar2 === 1)) {
    /* DEVIATION: intrinsic */;
    iVar2 = pcVar1();
    return iVar2;
  }
  if ((_Origin !== 2)) {
    wv(DAT_00639f14, 0x16);
    iVar2 = -1;
  }
  else {
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -17));
    if ((_Origin === 1)) {
      lVar3 = _ftell(_File);
      _Offset = (_Offset + lVar3);
      _Origin = 0;
    }
    __flush(_File);
    if (((s32(DAT_0000000c, 0) & 0x80) === 0)) {
      if (((s32(DAT_0000000c, 0) & 0x400) === 0)) {
        w32(DAT_00000018, 0, 0x200);
      }
    }
    else {
      w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -4));
    }
    lVar3 = __lseek(s32(DAT_00000010, 0), _Offset, _Origin);
    if ((lVar3 === -1)) {
      iVar2 = -1;
    }
    else {
      iVar2 = 0;
    }
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _ftell */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _ftell (_File)

 {
  let _FileHandle;
  let pcVar1;
  let iVar2;
  let lVar3;
  let pcVar4;
  let local_20;
  let local_1c;
  let local_14;
  let local_8;

  if ((iVar2 === 1)) {
    /* DEVIATION: intrinsic */;
    lVar3 = pcVar1();
    return lVar3;
  }
  _FileHandle = s32(DAT_00000010, 0);
  if ((s32(DAT_00000004, 0) < 0)) {
    w32(DAT_00000004, 0, 0);
  }
  local_20 = __lseek(_FileHandle, 0, 1);
  if ((local_20 < 0)) {
    local_1c = -1;
  }
  else if (((s32(DAT_0000000c, 0) & 0x108) === 0)) {
    local_1c = (local_20 - s32(DAT_00000004, 0));
  }
  else {
    local_1c = (s32(DAT_00000000, 0) - s32(DAT_00000008, 0));
    if (((s32(DAT_0000000c, 0) & 3) === 0)) {
      if (((s32(DAT_0000000c, 0) & 0x80) === 0)) {
        wv(DAT_00639f14, 0x16);
        return -1;
      }
    }
    else if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 0x80) !== 0)) {
      for (/* cond: (local_8 < s32(DAT_00000000, 0)) */); local_8 = (local_8 < s32(DAT_00000000, 0)); local_8 = (local_8 + 1)) {
        if ((_MEM[local_8] === 0xa)) {
          local_1c = (local_1c + 1);
        }
      }
    }
    if ((local_20 !== 0)) {
      if (((s32(DAT_0000000c, 0) & 1) !== 0)) {
        if ((s32(DAT_00000004, 0) === 0)) {
          local_1c = 0;
        }
        else {
          local_14 = (s32(DAT_00000000, 0) + (s32(DAT_00000004, 0) - s32(DAT_00000008, 0)));
          if (((s8(_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)]) & 0x80) !== 0)) {
            lVar3 = __lseek(_FileHandle, 0, 2);
            if ((lVar3 === local_20)) {
              pcVar4 = (s32(DAT_00000008, 0) + local_14);
              for (/* cond: (local_8 < pcVar4) */); local_8 = (local_8 < pcVar4); local_8 = (local_8 + 1)) {
                if ((_MEM[local_8] === 0xa)) {
                  local_14 = (local_14 + 1);
                }
              }
              if (((s32(DAT_0000000c, 0) & 0x2000) !== 0)) {
                local_14 = (local_14 + 1);
              }
            }
            else {
              __lseek(_FileHandle, local_20, 0);
              if (((s32(DAT_0000000c, 0) & 0x400) === 0)) {
                local_14 = 0x200;
              }
              else {
                local_14 = s32(DAT_00000018, 0);
              }
              if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 4) !== 0)) {
                local_14 = (local_14 + 1);
              }
            }
          }
          local_20 = (local_20 - local_14);
        }
      }
      local_1c = (local_20 + local_1c);
    }
  }
  return local_1c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _printf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _printf (_Format)

 {
  let pcVar1;
  let iVar2;
  let iVar3;

  if ((_Format === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61e2e4, 0x36, 0, 0x61d824);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      iVar2 = pcVar1();
      return iVar2;
    }
  }
  iVar2 = __stbuf(DAT_0063ac78);
  iVar3 = __output(DAT_0063ac78, _Format, DAT_00000008);
  __ftbuf(iVar2, DAT_0063ac78);
  return iVar3;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ftol */
    /* Library: */  /* Visual */

 /* Studio  */ */ export function __ftol ()

 {
  let in_ST0;

  return Math.trunc(Math.round(in_ST0));
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */
 /* address  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __fpmath */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __fpmath (param_1)

 {
  __cfltcvt_init();
  _DAT_00639fac = __ms_p5_mp_test_fdiv();
  __setdefaultprecision();
  return;
}


 export function FUN_005f6cc0 ()

 {
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cfltcvt_init */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cfltcvt_init ()

 {
  wv(PTR___fptrap_0063aee0, __cfltcvt);
  wv(PTR___fptrap_0063aee4, __cropzeros);
  wv(PTR___fptrap_0063aee8, __fassign);
  wv(PTR___fptrap_0063aeec, __forcdecpt);
  wv(PTR___fptrap_0063aef0, __positive);
  wv(PTR___fptrap_0063aef4, __cfltcvt);
  return;
}


 export function FUN_005f6d20 (param_1)

 {
  let uVar1;

  uVar1 = DAT_00639fa8;
  wv(DAT_00639fa8, param_1);
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _memcmp */
    /* Libraries: */  /* Visual */  /* Studio */  /* 1998 */  /* Debug, */  /* Visual */  /* Studio */  /* 1998 */

 /* Release  */ */ export function _memcmp (_Buf1, _Buf2, _Size)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let bVar4;
  let uVar5;
  let bVar6;
  let puVar7;
  let puVar8;
  let bVar9;

  if ((_Size !== 0)) {
    if ((((_Buf1 | _Buf2) & 3) === 0)) {
      uVar2 = (_Size & 3);
      uVar5 = (_Size >>> 2);
      bVar9 = 0;
      puVar7 = _Buf1;
      puVar8 = _Buf2;
      if ((uVar5 !== 0)) {
        do {
          _Buf1 = puVar7;
          _Buf2 = puVar8;
          if ((uVar5 === 0));
          _Buf2 = (puVar8 + 1);
          _Buf1 = (puVar7 + 1);
          bVar9 = (s32(puVar7, 0) === s32(puVar8, 0));
          puVar7 = _Buf1;
          puVar8 = _Buf2;
        } while (bVar9);
        if ((!bVar9)) {
          uVar2 = s32((_Buf1 + -4), 0);
          uVar5 = s32((_Buf2 + -4), 0);
          bVar9 = (((uVar2) & 0xFF) < ((uVar5) & 0xFF));
          if ((bVar4 === bVar6)) {
            bVar9 = ((((uVar2 >>> 0x18)) & 0xFF) < (((uVar5 >>> 0x18)) & 0xFF));
          }
          goto LAB_005f6dca;
        }
      }
      if ((uVar2 !== 0)) {
        uVar5 = s32(_Buf1, 0);
        uVar1 = s32(_Buf2, 0);
        bVar9 = (((uVar5) & 0xFF) < ((uVar1) & 0xFF));
        if ((((uVar5) & 0xFF) !== ((uVar1) & 0xFF))) {
 LAB_005f6dca: :
          return ((1 - u8(bVar9)) - u8((u8(bVar9) !== 0)));
        }
        iVar3 = 0;
        if ((uVar2 !== 1)) {
          bVar6 = (((uVar5 >>> 8)) & 0xFF);
          bVar4 = (((uVar1 >>> 8)) & 0xFF);
          bVar9 = (bVar6 < bVar4);
          if ((bVar6 !== bVar4));
          if ((uVar2 !== 2)) {
            bVar9 = ((uVar5 & 0xff0000) < (uVar1 & 0xff0000));
            if (((uVar5 & 0xff0000) !== (uVar1 & 0xff0000)));
          }
        }
        return iVar3;
      }
    }
    else {
      if (((_Size & 1) === 0));
      if ((_MEM[_Buf1] !== _MEM[_Buf2]));
      _Buf2 = (_Buf2 + 1);
      for (/* cond: (_Size !== 0) */); _Size = (_Size !== 0); _Size = (_Size - 2)) {
 LAB_005f6d7d: :
        bVar9 = (_MEM[_Buf1] < _MEM[_Buf2]);
        if ((_MEM[(_Buf1 + 1)] !== _MEM[(_Buf2 + 1)]));
        _Buf1 = (_Buf1 + 2);
      }
    }
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __strcmpi */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __strcmpi (_Str1, _Str2)

 {
  let cVar1;
  let uVar2;
  let bVar3;
  let bVar4;
  let bVar5;
  let cVar6;
  let _C;
  let iVar7;

  if ((DAT_0063a078 === 0)) {
    bVar5 = 0xff;
    do {
      do {
        cVar6 = 0;
        if ((bVar5 === 0));
        _Str2 = (_Str2 + 1);
        bVar4 = _MEM[_Str1];
        _Str1 = (_Str1 + 1);
      } while ((bVar4 === bVar5));
      bVar3 = (((bVar5 + 0xbf) + ((-((bVar5 + 0xbf) < 0x1a)) & 0x20)) + 0x41);
      bVar4 = (bVar4 + 0xbf);
      bVar5 = ((bVar4 + ((-(bVar4 < 0x1a)) & 0x20)) + 0x41);
    } while ((bVar5 === bVar3));
    cVar6 = ((bVar5 < bVar3) * 0xfe + 1);
 LAB_005f6e4e: :
    iVar7 = s8(cVar6);
  }
  else {
    _C = 0;
    iVar7 = 0xff;
    do {
      do {
        if ((((iVar7) & 0xFF) === 0)) {
          return iVar7;
        }
        cVar6 = _MEM[_Str2];
        iVar7 = (((iVar7 >>> 8) << 8) | cVar6);
        _Str2 = (_Str2 + 1);
        cVar1 = _MEM[_Str1];
        _C = (((_C >>> 8) << 8) | cVar1);
        _Str1 = (_Str1 + 1);
      } while ((cVar6 === cVar1));
      _C = _tolower(_C);
      iVar7 = _tolower(iVar7);
    } while ((((_C) & 0xFF) === ((iVar7) & 0xFF)));
    uVar2 = u8((((_C) & 0xFF) < ((iVar7) & 0xFF)));
    iVar7 = ((1 - uVar2) - u8((uVar2 !== 0)));
  }
  return iVar7;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function entry (unaff_EDI)

 {
  let pbVar1;
  let DVar2;
  let iVar3;
  let pHVar4;
  // unaff_EDI promoted to parameter;
  let unaff_FS_OFFSET;
  let uVar5;
  let local_6c;
  let local_68;
  let local_60;
  let local_1c;
  let uStack_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = DAT_0061e2f0;
  puStack_10 = LAB_005f9298;
  uStack_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  local_1c = DAT_ffffff84;
  DVar2 = FUN_006e7be8();
  _DAT_00639f2c = ((DVar2 >>> 8) & 0xff);
  wv(DAT_00639f28, (DVar2 & 0xff));
  _DAT_00639f24 = ((DVar2 & 0xff) * 0x100 + ((DVar2 >>> 8) & 0xff));
  wv(DAT_00639f20, (DVar2 >>> 0x10));
  iVar3 = __heap_init();
  if ((iVar3 === 0)) {
    __amsg_exit(0x1c);
  }
  local_8 = 0;
  __ioinit();
  ___initmbctable();
  wv(DAT_006e6b3c, FUN_006e7bec());
  wv(DAT_00639fc0, ___crtGetEnvironmentStringsA());
  if ((FUN_006e7bec() !== 0)) {
    __setargv();
    __setenvp();
    __cinit(unaff_EDI);
    local_68 = FUN_006e7bec();
    pbVar1 = local_68;
    if ((_MEM[FUN_006e7bec()] === 0x22)) {
      while ((_MEM[local_68 + 1] !== 0)) {
        iVar3 = __ismbblead(u8(_MEM[local_68 + 1]));
        if ((iVar3 !== 0)) {
          pbVar1 = (local_68 + 2);
        }
      }
      if ((_MEM[local_68 + 1] === 0x22)) {
        pbVar1 = (local_68 + 2);
      }
    }
    else {
      for (/* cond: (0x20 < _MEM[local_68]) */); pbVar1 = local_68, 0x20 = (0x20 < _MEM[local_68]); local_68 = (local_68 + 1)) {
      }
    }
    while ((_MEM[local_68] < 0x21)) {
      pbVar1 = (local_68 + 1);
    }
    local_60 = 0;
    FUN_006e7bf4(DAT_ffffffa0);
    if (((0 & 1) === 0)) {
      local_6c = 0xa;
    }
    else {
      local_6c = (UNNAMED & 0xffff);
    }
    uVar5 = 0;
    pHVar4 = FUN_006e7bf8(0);
    iVar3 = FUN_0055add0(pHVar4, uVar5, local_68, local_6c);
                     /* /*  WARNING: */  /* Subroutine */  /* does */  /* not */
     /* return  */ */ _exit(iVar3);
  }
                     /* /*  WARNING: */  /* Subroutine */  /* does */  /* not */
   /* return  */ */ _exit(-1);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __amsg_exit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __amsg_exit (param_1)

 {
  if ((DAT_00639fcc === 1)) {
    __FF_MSGBANNER();
  }
  __NMSG_WRITE(param_1);
  wv(PTR___exit_00639fc8, PTR___exit_00639fc8);
  return;
}


 export function FUN_005f7120 (param_1)

 {
  return ((param_1 ^ (param_1 >> 0x1f)) - (param_1 >> 0x1f));
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __getcwd */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __getcwd (_DstBuf, _SizeInBytes)

 {
  let pcVar1;

  pcVar1 = __getdcwd(0, _DstBuf, _SizeInBytes);
  return pcVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __getdcwd */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __getdcwd (_Drive, _DstBuf, _SizeInBytes)

 {
  let iVar1;
  let pcVar2;
  let _Size;
  let local_118;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((_Drive === 0)) {
    local_14 = FUN_006e7c7c(0x104, DAT_fffffee8);
  }
  else {
    iVar1 = __validdrive(_Drive);
    if ((iVar1 === 0)) {
      wv(DAT_00639f14, 0xd);
      wv(DAT_00639f18, 0xf);
      return 0;
    }
    local_10 = (((_Drive) & 0xFF) + 0x40);
    local_10 = 0x3a;
    local_10 = 0x2e;
    local_10 = 0;
    local_14 = FUN_006e7be4(DAT_fffffff0, 0x104, DAT_fffffee8, DAT_fffffff4);
  }
  if ((0x104 < local_14)) {
    pcVar2 = 0;
  }
  else {
    local_8 = _DstBuf;
    if ((_DstBuf === 0)) {
      _Size = local_14;
      if ((local_14 <= _SizeInBytes)) {
        _Size = _SizeInBytes;
      }
      local_8 = _malloc(_Size);
      if ((local_8 === 0)) {
        wv(DAT_00639f14, 0xc);
        return 0;
      }
    }
    else if ((_SizeInBytes < local_14)) {
      wv(DAT_00639f14, 0x22);
      return 0;
    }
    pcVar2 = FUN_005f22d0(local_8, DAT_fffffee8);
  }
  return pcVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __validdrive */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __validdrive (param_1)

 {
  let iVar1;
  let UVar2;
  let local_c;

  if ((param_1 === 0)) {
    iVar1 = 1;
  }
  else {
    local_c = (((param_1) & 0xFF) + 0x40);
    local_c = 0x3a;
    local_c = 0x5c;
    local_c = 0;
    UVar2 = FUN_006e7b24(DAT_fffffff4);
    if ((UVar2 === 1)) {
      iVar1 = 0;
    }
    else {
      iVar1 = 1;
    }
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _time */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _time (_Time)

 {
  let DVar1;
  let tVar2;
  let local_dc;
  let local_d4;
  let local_28;
  let local_14;

  FUN_006e7b2c(DAT_ffffffd8);
  FUN_006e7bdc(DAT_ffffffec);
  if (((UNNAMED & 0xffff) === (DAT_006e5490 & 0xffff))) {
    local_dc = DAT_006e5488;
  }
  else {
    DVar1 = FUN_006e7be0(DAT_ffffff2c);
    if ((DVar1 === 2)) {
      local_dc = 1;
    }
    else if ((DVar1 === 1)) {
      local_dc = 0;
    }
    else {
      local_dc = -1;
    }
    wv(DAT_006e5490, ((UNNAMED) & 0xFFFF));
    wv(DAT_006e5490, (((UNNAMED) >> 16) & 0xFFFF));
    wv(DAT_006e5494, ((UNNAMED) & 0xFFFF));
    wv(DAT_006e5494, (((UNNAMED) >> 16) & 0xFFFF));
    wv(DAT_006e5498, ((UNNAMED) & 0xFFFF));
    wv(DAT_006e5498, (((UNNAMED) >> 16) & 0xFFFF));
    wv(DAT_006e549c, ((UNNAMED) & 0xFFFF));
    wv(DAT_006e549c, (((UNNAMED) >> 16) & 0xFFFF));
  }
  wv(DAT_006e5488, local_dc);
  tVar2 = ___loctotime_t((UNNAMED & 0xffff), (UNNAMED >>> 0x10), UNNAMED, (UNNAMED & 0xffff), (UNNAMED >>> 0x10), (UNNAMED & 0xffff), local_dc);
  if ((_Time !== 0)) {
    w32(_Time, 0, tVar2);
  }
  return tVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _strncat */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _strncat (_Dest, _Source, _Count)

 {
  let bVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  let puVar5;
  let puVar6;

  puVar5 = _Dest;
  if ((_Count === 0)) {
    return _Dest;
  }
  do {
    if (((puVar5 & 3) === 0));
    puVar5 = (puVar5 + 1);
  } while ((((uVar4) & 0xFF) !== 0));
  goto LAB_005f750b;
  while (((uVar4 & -0x1000000) === 0)) {
    if (((uVar4 & 0xff0000) === 0)) {
      puVar6 = (puVar6 + 2);
      goto LAB_005f751b;
    }
    if (((uVar4 & -0x1000000) === 0)) {
      puVar6 = puVar5;
      puVar5 = (puVar6 + 1);
    } while (((((s32(puVar6, 0) ^ -1) ^ (s32(puVar6, 0) + 0x7efefeff)) & -0x7efeff00) === 0));
    uVar4 = s32(puVar6, 0);
    if ((((uVar4) & 0xFF) === 0)) {
      puVar6 = (puVar6 + 1);
      goto LAB_005f751b;
    }
  }
 LAB_005f750b: :
  puVar6 = (puVar5 + -1);
 LAB_005f751b: :
  if (((_Source & 3) === 0)) {
    uVar3 = (_Count >>> 2);
  }
  else {
    do {
      bVar1 = ((s32(_Source, 0)) & 0xFF);
      uVar4 = u8(bVar1);
      _Source = (_Source + 1);
      if ((bVar1 === 0));
      puVar6 = (puVar6 + 1);
      _Count = (_Count - 1);
      if ((_Count === 0));
    uVar3 = (_Count >>> 2);
  }
  do {
    if ((uVar3 === 0)) {
      for (/* cond: (uVar4 !== 0) */); uVar4 = (uVar4 !== 0); uVar4 = (uVar4 - 1)) {
        uVar3 = s32(_Source, 0);
        _Source = (_Source + 1);
        _MEM[puVar6] = ((uVar3) & 0xFF);
        puVar6 = (puVar6 + 1);
        if ((((uVar3) & 0xFF) === 0)) {
          return _Dest;
        }
      }
 LAB_005f7560: :
      _MEM[puVar6] = 0;
      return _Dest;
    }
    uVar2 = s32(_Source, 0);
    uVar4 = s32(_Source, 0);
    _Source = (_Source + 4);
    if (((((uVar2 ^ -1) ^ (uVar2 + 0x7efefeff)) & -0x7efeff00) !== 0)) {
      if ((((uVar4) & 0xFF) === 0)) {
 LAB_005f756a: :
        _MEM[puVar6] = ((uVar4) & 0xFF);
        return _Dest;
      }
      if (((((uVar4 >>> 8)) & 0xFF) === 0)) {
        w16(puVar6, 0, ((uVar4) & 0xFFFF));
        return _Dest;
      }
      if (((uVar4 & 0xff0000) === 0)) {
        w16(puVar6, 0, ((uVar4) & 0xFFFF));
        _MEM[(puVar6 + 2)] = 0;
        return _Dest;
      }
      if (((uVar4 & -0x1000000) === 0)) {
        w32(puVar6, 0, uVar4);
        return _Dest;
      }
    }
    w32(puVar6, 0, uVar4);
    puVar6 = (puVar6 + 1);
    uVar3 = (uVar3 - 1);
  } ( true );
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */
 /* address  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __assert */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __assert (param_1, param_2, param_3)

 {
  let pcVar1;
  let DVar2;
  let sVar3;
  let sVar4;
  let iVar5;
  let local_328;
  let local_224;
  let local_220;

  if ((DAT_00639fd0 === 1)) {
    if (((DAT_0063aca4 & 0x10c) === 0)) {
      _setvbuf(DAT_0063ac98, 0, 4, 0);
    }
    _fprintf(DAT_0063ac98, s_Assertion_failed:_%s,_file_%s,_l_00639fe0, param_1, param_2, param_3);
    _fflush(DAT_0063ac98);
  }
  else {
    FUN_005f22d0(DAT_fffffde0, 0x61e424);
    FUN_005f22e0(DAT_fffffde0, PTR_DAT_0063a010);
    FUN_005f22e0(DAT_fffffde0, 0x61e418);
    DVar2 = FUN_006e7b1c(0, DAT_fffffcd8, 0x104);
    if ((DVar2 === 0)) {
      FUN_005f22d0(DAT_fffffcd8, 0x61e400);
    }
    local_224 = DAT_fffffcd8;
    sVar3 = _strlen(DAT_fffffcd8);
    if ((0x3c < (sVar3 + 0xb))) {
      sVar3 = _strlen(DAT_fffffcd8);
      local_224 = (local_224 + (sVar3 - 0x31));
      _strncpy(local_224, PTR_DAT_0063a008, 3);
    }
    FUN_005f22e0(DAT_fffffde0, local_224);
    FUN_005f22e0(DAT_fffffde0, PTR_DAT_0063a00c);
    FUN_005f22e0(DAT_fffffde0, 0x61e3f8);
    local_224 = param_2;
    sVar3 = _strlen(param_2);
    if ((0x3c < (sVar3 + 8))) {
      sVar3 = _strlen(param_2);
      local_224 = (local_224 + (sVar3 - 0x34));
      _strncpy(local_224, PTR_DAT_0063a008, 3);
    }
    FUN_005f22e0(DAT_fffffde0, local_224);
    FUN_005f22e0(DAT_fffffde0, PTR_DAT_0063a00c);
    FUN_005f22e0(DAT_fffffde0, 0x61e3f0);
    iVar5 = 0xa;
    sVar3 = _strlen(DAT_fffffde0);
    __itoa(param_3, (DAT_fffffde0 + sVar3), iVar5);
    FUN_005f22e0(DAT_fffffde0, PTR_DAT_0063a010);
    FUN_005f22e0(DAT_fffffde0, 0x61e3e0);
    sVar3 = _strlen(param_1);
    sVar4 = _strlen(DAT_fffffde0);
    if ((((sVar3 + sVar4) + 0xb0) < 0x21d)) {
      FUN_005f22e0(DAT_fffffde0, param_1);
    }
    else {
      sVar3 = _strlen(DAT_fffffde0);
      _strncat(DAT_fffffde0, param_1, (0x21c - (sVar3 + 0xb1)));
      FUN_005f22e0(DAT_fffffde0, PTR_DAT_0063a008);
    }
    FUN_005f22e0(DAT_fffffde0, PTR_DAT_0063a010);
    FUN_005f22e0(DAT_fffffde0, 0x61e370);
    FUN_005f22e0(DAT_fffffde0, PTR_DAT_0063a010);
    FUN_005f22e0(DAT_fffffde0, 0x61e330);
    iVar5 = ___crtMessageBoxA(DAT_fffffde0, 0x61e308, 0x12012);
    if ((iVar5 === 3)) {
      _raise(0x16);
      __exit(3);
    }
    if ((iVar5 === 4)) {
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
    if ((iVar5 === 5)) {
      return;
    }
  }
                     /* /*  WARNING: */  /* Subroutine */  /* does */  /* not */
   /* return  */ */ _abort();
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___InternalCxxFrameHandler */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___InternalCxxFrameHandler (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;

  if ((s32(param_5, 0) !== 0x19930520)) {
    _inconsistency();
  }
  if (((_MEM[param_1 + 4] & 0x66) === 0)) {
    if ((s32((param_5 + 0xc), 0) !== 0)) {
      if ((s32((s32((param_1 + 0x1c), 0) + 8), 0) !== 0)) {
        uVar1 = s32((s32((param_1 + 0x1c), 0) + 8), 0)(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
        return uVar1;
      }
      FindHandler(param_1, param_2, param_3, param_4, param_5, ((param_8) & 0xFF), param_6, param_7);
    }
  }
  else if ((param_6 === 0)) {
    ___FrameUnwindToState(param_2, param_4, param_5, -1);
  }
  return 1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __cdecl */  /* FindHandler(struct */  /* EHExceptionRecord */  /* *,struct */  /* EHRegistrationNode */  /* *,struct */
 /* _CONTEXT */    /* *,void */  /* *,struct */  /* _s_FuncInfo */  /* const */  /* *,unsigned */  /* char,int,struct */  /* EHRegistrationNode */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FindHandler (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let pEVar1;
  let iVar2;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = s32((param_2 + 8), 0);
  if ((s32((param_5 + 4), 0) <= local_8)) {
    _inconsistency();
  }
  pEVar1 = DAT_0063a018;
  if ((s32((param_1 + 0x1c), 0) === 0)) {
    if ((DAT_0063a018 === 0)) {
      return;
    }
    param_1 = DAT_0063a018;
    param_3 = DAT_0063a01c;
    iVar2 = _ValidateRead(DAT_0063a018, 1);
    if ((iVar2 === 0)) {
      _inconsistency();
    }
    if ((s32((pEVar1 + 0x1c), 0) === 0)) {
      _inconsistency();
    }
  }
  if ((s32((param_1 + 0x14), 0) === 0x19930520)) {
    local_10 = GetRangeOfTrysToCheck(param_5, param_7, local_8, DAT_ffffffec, DAT_fffffff4);
    for (/* cond: (local_14 < local_c) */); local_14 = (local_14 < local_c); local_14 = (local_14 + 1)) {
      if ((local_8 <= s32((local_10 + 4), 0))) {
        local_18 = s32((local_10 + 0x10), 0);
        for (/* cond: (local_1c !== 0) */); local_1c = (local_1c !== 0); local_1c = (local_1c + -1)) {
          local_20 = s32((s32((param_1 + 0x1c), 0) + 0xc), 0);
          for (/* cond: (local_24 !== 0) */); local_20 = (local_20 + 1),
              local_24 = (local_24 !== 0); local_24 = (local_24 + -1)) {
            iVar2 = TypeMatch(local_18, s32(local_20, 1), s32((param_1 + 0x1c), 0));
            if ((iVar2 !== 0)) {
              CatchIt(param_1, param_2, param_3, param_4, param_5, local_18, s32(local_20, 1), local_10, param_7, param_8);
              goto LAB_005f7c03;
            }
          }
          local_18 = (local_18 + 0x10);
        }
      }
 LAB_005f7c03: :
      local_10 = (local_10 + 0x14);
    }
    if ((param_6 !== 0)) {
      DestructExceptionObject(param_1, 1);
    }
  }
  else if ((param_6 === 0)) {
    FindHandlerForForeignException(param_1, param_2, param_3, param_4, param_5, local_8, param_7, param_8);
  }
  else {
    terminate();
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __cdecl */  /* FindHandlerForForeignException(struct */  /* EHExceptionRecord */  /* *,struct */
 /* EHRegistrationNode */    /* *,struct */  /* _CONTEXT */  /* *,void */  /* *,struct */  /* _s_FuncInfo */  /* const */  /* *,int,int,struct */  /* EHRegistrationNode */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FindHandlerForForeignException (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  if ((iVar1 === 0)) {
    local_c = GetRangeOfTrysToCheck(param_5, param_7, param_6, DAT_fffffff0, DAT_fffffff8);
    for (/* cond: (local_10 < local_8) */); local_10 = (local_10 < local_8); local_10 = (local_10 + 1)) {
      if ((_MEM[(s32((((s32((local_c + 0xc), 0) + -1) * 0x10 + 4) + s32((local_c + 0x10), 0)), 0) + 8)] === 0)) {
        CatchIt(param_1, param_2, param_3, param_4, param_5, ((s32((local_c + 0xc), 0) + -1) * 0x10 + s32((local_c + 0x10), 0)), 0, local_c, param_7, param_8);
      }
      local_c = (local_c + 0x14);
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* struct */  /* _s_TryBlockMapEntry */  /* const */  /* * */  /* __cdecl */  /* GetRangeOfTrysToCheck(struct */  /* _s_FuncInfo */
 /* const */    /* *,int,int,unsigned */  /* int */  /* *,unsigned */  /* int */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function GetRangeOfTrysToCheck (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_8;

  iVar1 = s32((param_1 + 0x10), 0);
  local_14 = s32((param_1 + 0xc), 0);
  local_10 = local_14;
  local_8 = local_14;
  while ((-1 < param_2)) {
    if ((local_14 === -1)) {
      _inconsistency();
    }
    local_14 = (local_14 - 1);
    if ((local_14 === -1)) {
      param_2 = (param_2 + -1);
      local_8 = local_10;
      local_10 = local_14;
    }
  }
  local_14 = (local_14 + 1);
  w32(param_4, 0, local_14);
  w32(param_5, 0, local_8);
  if ((local_8 < local_14)) {
    _inconsistency();
  }
  return (local_14 * 0x14 + iVar1);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* int */  /* __cdecl */  /* TypeMatch(struct */  /* _s_HandlerType */  /* const */  /* *,struct */  /* _s_CatchableType */  /* const */
 /* *,struct */    /* _s_ThrowInfo */  /* const */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function TypeMatch (param_1, param_2, param_3)

 {
  let iVar1;

  if ((_MEM[(s32((param_1 + 4), 0) + 8)] === 0)) {
    return 1;
  }
  if (((_MEM[param_1] & 2) !== 0)) {
    return 1;
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___FrameUnwindToState */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___FrameUnwindToState (param_1, param_2, param_3, param_4)

 {
  let unaff_FS_OFFSET;
  let local_20;
  let local_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  puStack_c = DAT_0061e438;
  puStack_10 = LAB_005f9298;
  local_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  for (/* cond: (local_20 !== param_4) */); local_8 = -1, local_20 = (local_20 !== param_4);
      local_20 = s32((s32((param_3 + 8), 0) + local_20 * 8), 0)) {
    if ((s32((param_3 + 4), 0) <= local_20)) {
      _inconsistency();
    }
    local_8 = 0;
    if ((s32(((s32((param_3 + 8), 0) + 4) + local_20 * 8), 0) !== 0)) {
      __CallSettingFrame@12(s32(((s32((param_3 + 8), 0) + 4) + local_20 * 8), 0), param_1, 0x103)
      ;
    }
  }
  if ((local_20 !== param_4)) {
    _inconsistency();
  }
  w32((param_1 + 8), 0, local_20);
  w32(unaff_FS_OFFSET, 0, local_14);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */     /* int */  /* __cdecl */  /* ArrayUnwindFilter(struct */  /* _EXCEPTION_POINTERS */
 /* *) */     /* int */  /* __cdecl */  /* FrameUnwindFilter(struct */  /* _EXCEPTION_POINTERS */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:ArrayUnwindFilter (param_1)

 {
  if ((s32(s32(param_1, 0), 0) === -0x1f928c9d)) {
    terminate();
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __cdecl */  /* CatchIt(struct */  /* EHExceptionRecord */  /* *,struct */  /* EHRegistrationNode */  /* *,struct */
 /* _CONTEXT */    /* *,void */  /* *,struct */  /* _s_FuncInfo */  /* const */  /* *,struct */  /* _s_HandlerType */  /* const */  /* *,struct */  /* _s_CatchableType */
 /* const */    /* *,struct */  /* _s_TryBlockMapEntry */  /* const */  /* *,int,struct */  /* EHRegistrationNode */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function CatchIt (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10)

 {
  let pvVar1;

  if ((param_7 !== 0)) {
    BuildCatchObject(param_1, param_2, param_6, param_7);
  }
  if ((param_10 === 0)) {
    _UnwindNestedFrames(param_2, param_1);
  }
  else {
    _UnwindNestedFrames(param_10, param_1);
  }
  ___FrameUnwindToState(param_2, param_4, param_5, s32(param_8, 0));
  w32((param_2 + 8), 0, (s32((param_8 + 4), 0) + 1));
  pvVar1 = CallCatchBlock(param_1, param_2, param_3, param_5, s32((param_6 + 0xc), 0), param_9, 0x100);
  if ((pvVar1 !== 0)) {
    _JumpToContinuation(pvVar1, param_2);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* * */  /* __cdecl */  /* CallCatchBlock(struct */  /* EHExceptionRecord */  /* *,struct */  /* EHRegistrationNode */
 /* *,struct */    /* _CONTEXT */  /* *,struct */  /* _s_FuncInfo */  /* const */  /* *,void */  /* *,int,unsigned */
 /* long) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function CallCatchBlock (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let pvVar4;
  let iVar5;
  let extraout_EAX;
  let unaff_FS_OFFSET;
  let uStack_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  puStack_c = DAT_0061e448;
  puStack_10 = LAB_005f9298;
  uStack_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  uVar3 = DAT_0063a01c;
  uVar2 = DAT_0063a018;
  uVar1 = s32((param_2 + -4), 0);
  wv(DAT_0063a018, param_1);
  wv(DAT_0063a01c, param_3);
  local_8 = 1;
  pvVar4 = _CallCatchBlock2(param_2, param_4, param_5, param_6, param_7);
  local_8 = -1;
  w32((param_2 + -4), 0, uVar1);
  wv(DAT_0063a018, uVar2);
  wv(DAT_0063a01c, uVar3);
  if ((pvVar4 !== 0)) {
    iVar5 = __abnormal_termination();
    DestructExceptionObject(param_1, ((iVar5) & 0xFF));
    param_1 = extraout_EAX;
  }
  return param_1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* int */  /* __cdecl */  /* ExFilterRethrow(struct */  /* _EXCEPTION_POINTERS */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ExFilterRethrow (param_1)

 {
  let pEVar1;
  let iVar2;

  pEVar1 = s32(DAT_00000000, 0);
  if ((s32(DAT_00000014, 2) === 0)) {
    iVar2 = 1;
  }
  else {
    iVar2 = 0;
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __cdecl */  /* BuildCatchObject(struct */  /* EHExceptionRecord */  /* *,struct */  /* EHRegistrationNode */
 /* *,struct */    /* _s_HandlerType */  /* const */  /* *,struct */  /* _s_CatchableType */  /* const */
 /* *) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function BuildCatchObject (param_1, param_2, param_3, param_4)

 {
  let _Dst;
  let iVar1;
  let pvVar2;
  let unaff_FS_OFFSET;
  let _Size;
  let uVar3;
  let local_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  puStack_c = DAT_0061e460;
  puStack_10 = LAB_005f9298;
  local_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  if ((s32((param_3 + 8), 0) !== 0)) {
    _Dst = (param_2 + (s32((param_3 + 8), 0) + 0xc));
    local_8 = 0;
    if (((_MEM[param_3] & 8) === 0)) {
      if (((_MEM[param_4] & 1) === 0)) {
        if ((s32((param_4 + 0x18), 0) === 0)) {
          iVar1 = _ValidateRead(s32((param_1 + 0x18), 0), 1);
          if ((iVar1 === 0)) {
            _inconsistency();
          }
          else {
            _Size = s32((param_4 + 0x14), 0);
            pvVar2 = AdjustPointer(s32((param_1 + 0x18), 0), (param_4 + 8));
            FID_conflict:_memcpy(_Dst, pvVar2, _Size);
          }
        }
        else {
          iVar1 = _ValidateRead(s32((param_1 + 0x18), 0), 1);
          if ((iVar1 === 0)) {
            _inconsistency();
          }
          else if (((_MEM[param_4] & 4) === 0)) {
            pvVar2 = AdjustPointer(s32((param_1 + 0x18), 0), (param_4 + 8));
            FID_conflict:_CallMemberFunction1(_Dst, s32((param_4 + 0x18), 0), pvVar2);
          }
          else {
            uVar3 = 1;
            pvVar2 = AdjustPointer(s32((param_1 + 0x18), 0), (param_4 + 8));
            FID_conflict:_CallMemberFunction1(_Dst, s32((param_4 + 0x18), 0), pvVar2, uVar3);
          }
        }
      }
      else {
        iVar1 = _ValidateRead(s32((param_1 + 0x18), 0), 1);
        if ((iVar1 === 0)) {
          _inconsistency();
        }
        else {
          FID_conflict:_memcpy(_Dst, s32((param_1 + 0x18), 0), s32((param_4 + 0x14), 0));
          if ((s32(_Dst, 0) !== 0)) {
            pvVar2 = AdjustPointer(s32(_Dst, 0), (param_4 + 8));
            w32(_Dst, 0, pvVar2);
          }
        }
      }
    }
    else {
      iVar1 = _ValidateRead(s32((param_1 + 0x18), 0), 1);
      if ((iVar1 === 0)) {
        _inconsistency();
      }
      else {
        w32(_Dst, 0, s32((param_1 + 0x18), 0));
        pvVar2 = AdjustPointer(s32(_Dst, 0), (param_4 + 8));
        w32(_Dst, 0, pvVar2);
      }
    }
  }
  w32(unaff_FS_OFFSET, 0, local_14);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __cdecl */  /* DestructExceptionObject(struct */  /* EHExceptionRecord */  /* *,unsigned */
 /* char) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function DestructExceptionObject (param_1, param_2)

 {
  let unaff_FS_OFFSET;
  let local_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  puStack_c = DAT_0061e470;
  puStack_10 = LAB_005f9298;
  local_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  if ((s32((s32((param_1 + 0x1c), 0) + 4), 0) !== 0)) {
    local_8 = 0;
    _CallMemberFunction0(s32((param_1 + 0x18), 0), s32((s32((param_1 + 0x1c), 0) + 4), 0));
  }
  w32(unaff_FS_OFFSET, 0, local_14);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* * */  /* __cdecl */  /* AdjustPointer(void */  /* *,struct */  /* PMD */  /* const */
 /* &) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function AdjustPointer (param_1, param_2)

 {
  let local_8;

  local_8 = (s32(param_2, 0) + param_1);
  if ((-1 < s32((param_2 + 4), 0))) {
    local_8 = (local_8 + (s32((param_2 + 4), 0) + s32((s32((s32((param_2 + 4), 0) + param_1), 0) + s32((param_2 + 8), 0)), 0)));
  }
  return local_8;
}


 /* /*  WARNING: */  /* Restarted */  /* to */  /* delay */  /* deadcode */  /* elimination */  /* for */  /* space: */
 /* stack  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CallSettingFrame@12 */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CallSettingFrame@12 (param_1, param_2, param_3)

 {
  let pcVar1;

  pcVar1 = FUN_005f1d95(param_3);
  pcVar1 = pcVar1();
  if ((param_3 === 0x100)) {
    param_3 = 2;
  }
  FUN_005f1d95(param_3);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __cdecl */
 /* terminate(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function terminate ()

 {
  let unaff_FS_OFFSET;
  let uStack_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  puStack_c = DAT_0061e480;
  puStack_10 = LAB_005f9298;
  uStack_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  if ((DAT_0063a024 !== 0)) {
    local_8 = 1;
    wv(DAT_0063a024, DAT_0063a024());
  }
  local_8 = -1;
                     /* /*  WARNING: */  /* Subroutine */  /* does */  /* not */
   /* return  */ */ _abort();
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __cdecl */
 /* unexpected(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function unexpected ()

 {
  if ((PTR_terminate_0063a028 !== 0)) {
    wv(PTR_terminate_0063a028, PTR_terminate_0063a028);
  }
  terminate();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* void */  /* __cdecl */
 /* _inconsistency(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _inconsistency ()

 {
  let unaff_FS_OFFSET;
  let uStack_14;
  let puStack_10;
  let puStack_c;
  let local_8;

  puStack_c = DAT_0061e498;
  puStack_10 = LAB_005f9298;
  uStack_14 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_ffffffec);
  if ((PTR_terminate_0063a02c !== 0)) {
    local_8 = 1;
    wv(PTR_terminate_0063a02c, PTR_terminate_0063a02c);
  }
  local_8 = -1;
  terminate();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtDbgBreak */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtDbgBreak ()

 {
  FUN_006e7b18();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtSetReportMode */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtSetReportMode (param_1, param_2)

 {
  let uVar1;

  if ((2 < param_1)) {
    uVar1 = -1;
  }
  else if ((param_2 === -1)) {
    uVar1 = s32((DAT_0063a038 + param_1 * 4), 0);
  }
  else if (((param_2 & -8) === 0)) {
    uVar1 = s32((DAT_0063a038 + param_1 * 4), 0);
    w32((DAT_0063a038 + param_1 * 4), 0, param_2);
  }
  else {
    uVar1 = -1;
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtSetReportFile */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtSetReportFile (param_1, param_2)

 {
  let uVar1;
  let pvVar2;

  if ((2 < param_1)) {
    uVar1 = -2;
  }
  else if ((param_2 === -6)) {
    uVar1 = s32((DAT_0063a048 + param_1 * 4), 0);
  }
  else {
    uVar1 = s32((DAT_0063a048 + param_1 * 4), 0);
    if ((param_2 === -4)) {
      pvVar2 = FUN_006e7bd8(-11);
      w32((DAT_0063a048 + param_1 * 4), 0, pvVar2);
    }
    else if ((param_2 === -5)) {
      pvVar2 = FUN_006e7bd8(-12);
      w32((DAT_0063a048 + param_1 * 4), 0, pvVar2);
    }
    else {
      w32((DAT_0063a048 + param_1 * 4), 0, param_2);
    }
  }
  return uVar1;
}


 export function FUN_005f8b40 (param_1)

 {
  let uVar1;

  uVar1 = DAT_006e6b30;
  wv(DAT_006e6b30, param_1);
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __CrtDbgReport */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __CrtDbgReport (param_1, param_2, param_3, param_4, param_5)

 {
  let LVar1;
  let nNumberOfBytesToWrite;
  let iVar2;
  let puVar3;
  let local_3028;
  let local_3014;
  let local_3010;
  let local_300c;
  let local_300b;
  let local_200c;
  let local_200b;
  let local_100c;
  let local_1008;
  let local_1004;
  let local_1003;
  let uStackY_2c;
  let lpNumberOfBytesWritten;
  let lpOverlapped;

  FUN_005f35f0();
  local_300c = 0;
  puVar3 = DAT_ffffcff5;
  for (/* cond: (iVar2 !== 0) */); iVar2 = (iVar2 !== 0); iVar2 = (iVar2 + -1)) {
    w32(puVar3, 0, 0);
    puVar3 = (puVar3 + 1);
  }
  w16(puVar3, 0, 0);
  _MEM[(puVar3 + 2)] = 0;
  local_200c = 0;
  puVar3 = DAT_ffffdff5;
  for (/* cond: (iVar2 !== 0) */); iVar2 = (iVar2 !== 0); iVar2 = (iVar2 + -1)) {
    w32(puVar3, 0, 0);
    puVar3 = (puVar3 + 1);
  }
  w16(puVar3, 0, 0);
  _MEM[(puVar3 + 2)] = 0;
  local_1004 = 0;
  puVar3 = DAT_ffffeffd;
  for (/* cond: (iVar2 !== 0) */); iVar2 = (iVar2 !== 0); iVar2 = (iVar2 + -1)) {
    w32(puVar3, 0, 0);
    puVar3 = (puVar3 + 1);
  }
  w16(puVar3, 0, 0);
  _MEM[(puVar3 + 2)] = 0;
  local_1008 = DAT_00000018;
  if ((2 < param_1)) {
    local_100c = -1;
  }
  else if ((0 < LVar1)) {
    if ((FUN_006e7c2c(local_3010, 0x61e558) === 0)) {
      local_100c = -1;
    }
    else {
      wv(DAT_0063a064, DAT_0063a064());
      FUN_006e7af4(DAT_ffffdff4);
      FUN_006e7bd4(DAT_0063a030);
      __CrtDbgBreak();
      local_100c = -1;
    }
  }
  else {
    if ((iVar2 < 0)) {
      FUN_005f22d0();
    }
    if ((param_1 === 2)) {
      FUN_005f22d0();
    }
    FUN_005f22e0();
    if ((param_1 === 2)) {
      if (((UNK_0063a040 & 1) !== 0)) {
        FUN_005f22e0();
      }
      FUN_005f22e0();
    }
    if ((param_2 === 0)) {
      FUN_005f22d0();
    }
    else {
      uStackY_2c = 0x5f8dad;
      iVar2 = __snprintf(DAT_ffffdff4, 0x1000, 0x61e4d4);
      if ((iVar2 < 0)) {
        FUN_005f22d0();
      }
    }
    if ((iVar2 === 0)) {
      if ((s32((DAT_0063a048 + param_1 * 4), 0) !== -1)) {
        lpOverlapped = 0;
        lpNumberOfBytesWritten = DAT_ffffcfec;
        nNumberOfBytesToWrite = _strlen(DAT_ffffdff4);
        FUN_006e7c4c(s32((DAT_0063a048 + param_1 * 4), 0), DAT_ffffdff4, nNumberOfBytesToWrite, lpNumberOfBytesWritten, lpOverlapped);
      }
      if (((_MEM[DAT_0063a038 + param_1 * 4] & 2) !== 0)) {
        FUN_006e7af4(DAT_ffffdff4);
      }
      if (((_MEM[DAT_0063a038 + param_1 * 4] & 4) === 0)) {
        if ((param_1 === 2)) {
          FUN_006e7bd4(DAT_0063a030);
        }
        local_100c = 0;
      }
      else {
        if ((param_3 !== 0)) {
          __itoa(param_3, DAT_ffffcfd8, 0xa);
        }
        local_100c = _CrtMessageWindow();
        if ((param_1 === 2)) {
          FUN_006e7bd4(DAT_0063a030);
        }
      }
    }
    else if ((param_1 === 2)) {
      FUN_006e7bd4(DAT_0063a030);
    }
  }
  return local_100c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _CrtMessageWindow */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _CrtMessageWindow ()

 {
  let iVar1;
  let DVar2;
  let sVar3;
  let in_stack_00000010;
  let in_stack_00000014;
  let local_1110;
  let acStackY_14c;
  let local_110;
  let local_10c;
  let uStackY_50;

  FUN_005f35f0();
  if ((iVar1 === 1)) {
    __CrtDbgBreak();
  }
  DVar2 = FUN_006e7b1c(0, DAT_fffffef4, 0x104);
  if ((DVar2 === 0)) {
    FUN_005f22d0();
  }
  sVar3 = _strlen(DAT_fffffef4);
  if ((0x40 < sVar3)) {
    sVar3 = _strlen(DAT_fffffef4);
    _strncpy((DAT_fffffef4 + (sVar3 - 0x40)), 0x61e304, 3);
  }
  if ((0x40 < sVar3)) {
    sVar3 = _strlen(in_stack_00000010);
    _strncpy((in_stack_00000010 + (sVar3 - 0x40)), 0x61e304, 3);
  }
  uStackY_50 = 0x5f920b;
  iVar1 = __snprintf(DAT_ffffeef0, 0x1000, 0x61e594);
  if ((iVar1 < 0)) {
    FUN_005f22d0();
  }
  local_110 = ___crtMessageBoxA(DAT_ffffeef0, 0x61e570, 0x12012);
  if ((local_110 === 3)) {
    _raise(0x16);
    __exit();
  }
  return (local_110 === 4);
}


 export function FUN_005f9355 (param_1)

 {
  __local_unwind2(s32((param_1 + 0x18), 0), s32((param_1 + 0x1c), 0));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtLCMapStringW */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtLCMapStringW (in_EAX, _LocaleName, _DWMapFlag, _LpSrcStr, _CchSrc, _LpDestStr, _CchDest)

 {
  // in_EAX promoted to parameter;
  let iVar1;
  let lpMultiByteStr;
  let iVar2;
  let in_stack_0000001c;
  let local_14;
  let local_10;

  if ((DAT_0063a068 === 0)) {
    in_EAX = FUN_006e7c24(0, 0x100, 0x61e6ac, 1, 0, 0);
    if ((in_EAX === 0)) {
      in_EAX = FUN_006e7c40(0, 0x100, 0x61e6a8, 1, 0, 0);
      if ((in_EAX === 0)) {
        return 0;
      }
      wv(DAT_0063a068, 2);
    }
    else {
      wv(DAT_0063a068, 1);
    }
  }
  if ((0 < _CchSrc)) {
    in_EAX = wcsncnt(_LpSrcStr, _CchSrc);
    _CchSrc = in_EAX;
  }
  if ((DAT_0063a068 === 1)) {
    iVar1 = FUN_006e7c24(_LocaleName, _DWMapFlag, _LpSrcStr, _CchSrc, _LpDestStr, _CchDest);
    return iVar1;
  }
  if ((DAT_0063a068 !== 2)) {
    return in_EAX;
  }
  local_10 = 0;
  if ((in_stack_0000001c === 0)) {
    in_stack_0000001c = DAT_0063a088;
  }
  iVar1 = FUN_006e7ba0(in_stack_0000001c, 0x220, _LpSrcStr, _CchSrc, 0, 0, 0, 0);
  if ((iVar1 === 0)) {
    return 0;
  }
  lpMultiByteStr = __malloc_dbg(iVar1, 2, 0x61e69c, 0xcc);
  if ((lpMultiByteStr === 0)) {
    return 0;
  }
  iVar2 = FUN_006e7ba0(in_stack_0000001c, 0x220, _LpSrcStr, _CchSrc, lpMultiByteStr, iVar1, 0, 0);
  if ((iVar1 === 0)) {
 LAB_005f9640: :
    __free_dbg(lpMultiByteStr, 2);
    __free_dbg(local_10, 2);
    local_14 = 0;
  }
  else {
    if (((_DWMapFlag & 0x400) === 0)) {
      if ((_CchDest === 0)) {
        local_14 = FUN_006e7c58(in_stack_0000001c, 1, local_10, local_14, 0, 0);
      }
      else {
        local_14 = FUN_006e7c58(in_stack_0000001c, 1, local_10, local_14, _LpDestStr, _CchDest);
      }
      if ((local_14 === 0)) {
      if ((local_14 <= _CchDest)) {
        _CchDest = local_14;
      }
      _strncpy(_LpDestStr, local_10, _CchDest);
    }
    __free_dbg(lpMultiByteStr, 2);
    __free_dbg(local_10, 2);
  }
  return local_14;
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
  for (/* cond: (s16(local_8, 0) !== 0) */); (local_c = (local_c !== 0) && (local_8 = s16(local_8, 0))); local_8 = (local_8 + 1)) {
    local_c = (local_c + -1);
  }
  if ((s16(local_8, 0) === 0)) {
    param_2 = ((local_8 - param_1) >> 1);
  }
  return param_2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtLCMapStringA */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtLCMapStringA (in_EAX, _Plocinfo, _LocaleName, _DwMapFlag, _LpSrcStr, _CchSrc, _LpDestStr, _CchDest, _Code_page, _BError)

 {
  // in_EAX promoted to parameter;
  let iVar1;
  let lpWideCharStr;
  let iVar2;
  let local_14;
  let local_c;

  if ((DAT_0063a06c === 0)) {
    in_EAX = FUN_006e7c40(0, 0x100, 0x61e6a8, 1, 0, 0);
    if ((in_EAX === 0)) {
      in_EAX = FUN_006e7c24(0, 0x100, 0x61e6ac, 1, 0, 0);
      if ((in_EAX === 0)) {
        return 0;
      }
      wv(DAT_0063a06c, 1);
    }
    else {
      wv(DAT_0063a06c, 2);
    }
  }
  if ((0 < _LpSrcStr)) {
    in_EAX = _strncnt(_DwMapFlag, _LpSrcStr);
    _LpSrcStr = in_EAX;
  }
  if ((DAT_0063a06c === 2)) {
    iVar1 = FUN_006e7c40(_Plocinfo, _LocaleName, _DwMapFlag, _LpSrcStr, _CchSrc, _LpDestStr);
    return iVar1;
  }
  if ((DAT_0063a06c !== 1)) {
    return in_EAX;
  }
  local_c = 0;
  if ((_CchDest === 0)) {
    _CchDest = DAT_0063a088;
  }
  iVar1 = FUN_006e7c58(_CchDest, 9, _DwMapFlag, _LpSrcStr, 0, 0);
  if ((iVar1 === 0)) {
    return 0;
  }
  lpWideCharStr = __malloc_dbg(iVar1 * 2, 2, 0x61e69c, 0x16d);
  if ((lpWideCharStr === 0)) {
    return 0;
  }
  iVar2 = FUN_006e7c58(_CchDest, 1, _DwMapFlag, _LpSrcStr, lpWideCharStr, iVar1);
  if ((local_14 !== 0)) {
    if (((_LocaleName & 0x400) === 0)) {
      local_c = __malloc_dbg(local_14 * 2, 2, 0x61e69c, 0x191);
      if ((iVar1 === 0)) {
        local_14 = FUN_006e7ba0(_CchDest, 0x220, local_c, local_14, 0, 0, 0, 0);
        iVar1 = local_14;
      }
      else {
        local_14 = FUN_006e7ba0(_CchDest, 0x220, local_c, local_14, _CchSrc, _LpDestStr, 0, 0);
        iVar1 = local_14;
      }
    }
    else {
      if ((_LpDestStr === 0));
    }
    if ((iVar1 !== 0)) {
 LAB_005f99ab: :
      __free_dbg(lpWideCharStr, 2);
      __free_dbg(local_c, 2);
      return local_14;
    }
  }
 LAB_005f99cf: :
  __free_dbg(lpWideCharStr, 2);
  __free_dbg(local_c, 2);
  return 0;
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
  for (/* cond: (_MEM[local_8] !== 0) */); (local_c = (local_c !== 0) && (local_8 = _MEM[local_8])); local_8 = (local_8 + 1)) {
    local_c = (local_c - 1);
  }
  if ((_MEM[local_8] === 0)) {
    _Cnt = (local_8 - _String);
  }
  return _Cnt;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __isctype */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __isctype (unaff_EDI, _C, _Type)

 {
  let BVar1;
  let uVar2;
  // unaff_EDI promoted to parameter;
  let local_10;
  let local_f;
  let local_e;
  let local_c;
  let local_8;

  if (((_C + 1) < 0x101)) {
    uVar2 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & _Type);
  }
  else {
    if (((s16((PTR_DAT_0063a090 + ((_C >>> 8) & 0xff) * 2), 0) & 0x8000) === 0)) {
      local_10 = ((_C) & 0xFF);
      local_f = 0;
      local_c = 1;
    }
    else {
      local_10 = (((_C >>> 8)) & 0xFF);
      local_f = ((_C) & 0xFF);
      local_e = 0;
      local_c = 2;
    }
    BVar1 = ___crtGetStringTypeA(1, DAT_fffffff0, local_c, DAT_fffffff8, 0, 0, unaff_EDI);
    if ((BVar1 === 0)) {
      uVar2 = 0;
    }
    else {
      uVar2 = ((local_8 & 0xffff) & _Type);
    }
  }
  return uVar2;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */
 /* address  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __openfile */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __openfile (_Filename, _Mode, _ShFlag, _File)

 {
  let cVar1;
  let pcVar2;
  let bVar3;
  let bVar4;
  let bVar5;
  let iVar6;
  let pFVar7;
  let local_20;
  let local_18;

  local_20 = DAT_0063b274;
  bVar4 = 0;
  bVar5 = 0;
  if ((iVar6 === 1)) {
    /* DEVIATION: intrinsic */;
    pFVar7 = pcVar2();
    return pFVar7;
  }
  if ((iVar6 === 1)) {
    /* DEVIATION: intrinsic */;
    pFVar7 = pcVar2();
    return pFVar7;
  }
  if ((iVar6 === 1)) {
    /* DEVIATION: intrinsic */;
    pFVar7 = pcVar2();
    return pFVar7;
  }
  cVar1 = _MEM[_Mode];
  if ((cVar1 === 0x61)) {
    local_18 = 0x109;
    local_20 = (local_20 | 2);
  }
  else if ((cVar1 === 0x72)) {
    local_18 = 0;
    local_20 = (local_20 | 1);
  }
  else {
    if ((cVar1 !== 0x77)) {
      return 0;
    }
    local_18 = 0x301;
    local_20 = (local_20 | 2);
  }
  bVar3 = 1;
  while (bVar3) {
    /* switch */ (_MEM[_Mode + 1]) {
    case '+' :
      if (((local_18 & 2) === 0)) {
        local_18 = ((local_18 & -2) | 2);
        local_20 = ((local_20 & -4) | 0x80);
      }
      else {
        bVar3 = 0;
      }
      break;
    default :
      bVar3 = 0;
      break;
    case 'D' :
      if (((local_18 & 0x40) === 0)) {
        local_18 = (local_18 | 0x40);
      }
      else {
        bVar3 = 0;
      }
      break;
    case 'R' :
      if (bVar5) {
        bVar3 = 0;
      }
      else {
        bVar5 = 1;
        local_18 = (local_18 | 0x10);
      }
      break;
    case 'S' :
      if (bVar5) {
        bVar3 = 0;
      }
      else {
        bVar5 = 1;
        local_18 = (local_18 | 0x20);
      }
      break;
    case 'T' :
      if (((local_18 & 0x1000) === 0)) {
        local_18 = (local_18 | 0x1000);
      }
      else {
        bVar3 = 0;
      }
      break;
    case 'b' :
      if (((local_18 & 0xc000) === 0)) {
        local_18 = (local_18 | 0x8000);
      }
      else {
        bVar3 = 0;
      }
      break;
    case 'c' :
      if (bVar4) {
        bVar3 = 0;
      }
      else {
        bVar4 = 1;
        local_20 = (local_20 | 0x4000);
      }
      break;
    case 'n' :
      if (bVar4) {
        bVar3 = 0;
      }
      else {
        bVar4 = 1;
        local_20 = (local_20 & -0x4001);
      }
      break;
    case 't' :
      if (((local_18 & 0xc000) === 0)) {
        local_18 = (local_18 | 0x4000);
      }
      else {
        bVar3 = 0;
      }
    }
  }
  iVar6 = __sopen(_Filename, local_18, _ShFlag, 0x1a4);
  if ((iVar6 < 0)) {
    _File = 0;
  }
  else {
    _DAT_0063aed8 = (None + 1);
    w32(DAT_0000000c, 0, local_20);
    w32(DAT_00000004, 0, 0);
    w32(DAT_00000000, 0, 0);
    w32(DAT_00000008, 0, s32(DAT_00000000, 0));
    w32(DAT_0000001c, 0, s32(DAT_00000008, 0));
    w32(DAT_00000010, 0, iVar6);
  }
  return _File;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __getstream */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __getstream ()

 {
  let uVar1;
  let local_c;
  let local_8;

  local_c = 0;
  local_8 = 0;
  do {
    if ((DAT_006e69e0 <= local_8)) {
 LAB_005f9fab: :
      if ((local_c !== 0)) {
        w32(DAT_00000004, 0, 0);
        w32(DAT_0000000c, 0, s32(DAT_00000004, 0));
        w32(DAT_00000008, 0, 0);
        w32(DAT_00000000, 0, s32(DAT_00000008, 0));
        w32(DAT_0000001c, 0, s32(DAT_00000000, 0));
        w32(DAT_00000010, 0, -1);
      }
      return local_c;
    }
    if ((s32((DAT_006e5694 + local_8 * 4), 0) === 0)) {
      uVar1 = __malloc_dbg(0x20, 2, 0x61e6cc, 0x55);
      w32((DAT_006e5694 + local_8 * 4), 0, uVar1);
      if ((s32((DAT_006e5694 + local_8 * 4), 0) !== 0)) {
        local_c = s32((DAT_006e5694 + local_8 * 4), 0);
      }
      goto LAB_005f9fab;
    }
    if (((_MEM[(s32((DAT_006e5694 + local_8 * 4), 0) + 0xc)] & 0x83) === 0)) {
      local_c = s32((DAT_006e5694 + local_8 * 4), 0);
      goto LAB_005f9fab;
    }
    local_8 = (local_8 + 1);
  } ( true );
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __close */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __close (_FileHandle)

 {
  let iVar1;
  let iVar2;
  let hObject;
  let BVar3;
  let iVar4;
  let local_8;

  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 1) === 0)) {
    wv(DAT_00639f14, 9);
    wv(DAT_00639f18, 0);
    return -1;
  }
  if ((_FileHandle === 2)) {
    iVar1 = __get_osfhandle(2);
    iVar2 = __get_osfhandle(1);
    if ((iVar1 !== iVar2)) {
 LAB_005fa099: :
    hObject = __get_osfhandle(_FileHandle);
    BVar3 = FUN_006e7c38(hObject);
    if ((BVar3 === 0)) {
      local_8 = FUN_006e7b00();
      goto LAB_005fa0c9;
    }
  }
  local_8 = 0;
 LAB_005fa0c9: :
  __free_osfhnd(_FileHandle);
  if ((local_8 === 0)) {
    _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] = 0;
    iVar4 = 0;
  }
  else {
    __dosmaperr(local_8);
    iVar4 = -1;
  }
  return iVar4;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __freebuf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __freebuf (_File)

 {
  let pcVar1;
  let iVar2;

  if ((_File === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61e6d8, 0x30, 0, 0x61d850);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
  }
  if (((s32(DAT_0000000c, 0) & 8) !== 0)) {
    __free_dbg(s32(DAT_00000008, 0), 2);
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -0x409));
    w32(DAT_00000000, 0, 0);
    w32(DAT_00000008, 0, s32(DAT_00000000, 0));
    w32(DAT_00000004, 0, 0);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _fflush */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _fflush (_File)

 {
  let iVar1;

  if ((_File === 0)) {
    iVar1 = flsall(0);
  }
  else {
    iVar1 = __flush(_File);
    if ((iVar1 === 0)) {
      if (((s32(DAT_0000000c, 0) & 0x4000) === 0)) {
        iVar1 = 0;
      }
      else {
        iVar1 = __commit(s32(DAT_00000010, 0));
        if ((iVar1 === 0)) {
          iVar1 = 0;
        }
        else {
          iVar1 = -1;
        }
      }
    }
    else {
      iVar1 = -1;
    }
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __flush */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __flush (_File)

 {
  let _MaxCharCount;
  let uVar1;
  let local_8;

  local_8 = 0;
  if ((0 < _MaxCharCount)) {
    uVar1 = __write(s32(DAT_00000010, 0), s32(DAT_00000008, 0), _MaxCharCount);
    if ((uVar1 === _MaxCharCount)) {
      if (((s32(DAT_0000000c, 0) & 0x80) !== 0)) {
        w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -3));
      }
    }
    else {
      w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x20));
      local_8 = -1;
    }
  }
  w32(DAT_00000000, 0, s32(DAT_00000008, 0));
  w32(DAT_00000004, 0, 0);
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __flushall */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __flushall ()

 {
  let iVar1;

  iVar1 = flsall(1);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _flsall */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function flsall (param_1)

 {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = 0;
  for (/* cond: (local_10 < DAT_006e69e0) */); local_10 = (local_10 < DAT_006e69e0); local_10 = (local_10 + 1)) {
    if (((_MEM[(s32((DAT_006e5694 + local_10 * 4), 0) + 0xc)] & 0x83) !== 0)) {
      if ((param_1 === 1)) {
        iVar1 = _fflush(s32((DAT_006e5694 + local_10 * 4), 0));
        if ((iVar1 !== -1)) {
          local_8 = (local_8 + 1);
        }
      }
      else if ((iVar1 === -1)) {
        local_c = -1;
      }
    }
  }
  if ((param_1 === 1)) {
    local_c = local_8;
  }
  return local_c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __flsbuf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __flsbuf (_Ch, _File)

 {
  let pcVar1;
  let _File_00;
  let iVar2;
  let uVar3;
  let local_1c;
  let local_10;
  let local_8;

  if ((iVar2 === 1)) {
    /* DEVIATION: intrinsic */;
    iVar2 = pcVar1();
    return iVar2;
  }
  _File_00 = _File;
  uVar3 = s32(DAT_00000010, 0);
  if (((s32(DAT_0000000c, 0) & 0x40) !== 0)) {
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x20));
    uVar3 = -1;
  }
  else {
    if (((s32(DAT_0000000c, 0) & 1) !== 0)) {
      w32(DAT_00000004, 0, 0);
      if (((s32(DAT_0000000c, 0) & 0x10) === 0)) {
        w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x20));
        return -1;
      }
      w32(DAT_00000000, 0, s32(DAT_00000008, 0));
      w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -2));
    }
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 2));
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -17));
    w32(DAT_00000004, 0, 0);
    local_10 = s32(DAT_00000004, 0);
    if ((iVar2 === 0)) {
      __getbuf(_File_00);
    }
    if (((s32(DAT_0000000c, 0) & 0x108) === 0)) {
      local_8 = 1;
      local_10 = __write(uVar3, DAT_00000004, 1);
    }
    else {
      if ((iVar2 === 1)) {
        /* DEVIATION: intrinsic */;
        iVar2 = pcVar1();
        return iVar2;
      }
      local_8 = (s32(DAT_00000000, 0) - s32(DAT_00000008, 0));
      w32(DAT_00000000, 0, (s32(DAT_00000008, 0) + 1));
      w32(DAT_00000004, 0, (s32(DAT_00000018, 0) + -1));
      if ((local_8 < 1)) {
        if ((uVar3 === -1)) {
          local_1c = DAT_0063a420;
        }
        else {
          local_1c = (s32((DAT_006e69f0 + ((uVar3 & -32) >> 3)), 0) + (uVar3 & 0x1f) * 8);
        }
        if (((_MEM[local_1c + 4] & 0x20) !== 0)) {
          __lseek(uVar3, 0, 2);
        }
      }
      else {
        local_10 = __write(uVar3, s32(DAT_00000008, 0), local_8);
      }
      _MEM[s32(DAT_00000008, 0)] = ((_Ch) & 0xFF);
    }
    if ((local_10 === local_8)) {
      uVar3 = (_Ch & 0xff);
    }
    else {
      w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x20));
      uVar3 = -1;
    }
  }
  return uVar3;
}


 /* /*  WARNING: */  /* Type */  /* propagation */  /* algorithm */  /* not */
 /* settling  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __output */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __output (param_1, param_2, param_3)

 {
  let pbVar1;
  let pwVar2;
  let sVar3;
  let pcVar4;
  let uVar5;
  let wVar6;
  let sVar7;
  let uVar8;
  let iVar9;
  let bVar10;
  let uVar11;
  let lVar12;
  let local_28c;
  let local_288;
  let local_284;
  let local_280;
  let local_27c;
  let local_274;
  let local_270;
  let local_268;
  let local_264;
  let local_260;
  let local_25c;
  let local_258;
  let local_254;
  let local_250;
  let local_24c;
  let local_248;
  let local_244;
  let local_243;
  let local_240;
  let local_23c;
  let local_238;
  let local_234;
  let local_230;
  let local_22c;
  let uStack_2d;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let uStack_16;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_230 = 0;
  local_1c = 0;
  pbVar1 = param_2;
  do {
    param_2 = pbVar1;
    uStack_2d = _MEM[param_2];
    pbVar1 = (param_2 + 1);
    if ((local_230 < 0)) {
      return local_230;
    }
    if ((0x78 < _MEM[param_2])) {
      local_10 = 0;
    }
    else {
      local_10 = (s8(_MEM[0x61e728 + s8(_MEM[param_2])]) & 0xf);
    }
    local_1c = (s8(_MEM[DAT_0061e748 + (local_10 * 8 + local_1c)]) >> 4);
    /* switch */ () {
    case 0 :
 switchD_005fb3f7_caseD_0: :
      local_20 = 0;
      if (((s16((PTR_DAT_0063a090 + u8(_MEM[param_2]) * 2), 0) & 0x8000) !== 0)) {
        write_char(s8(_MEM[param_2]), param_1, DAT_fffffdd0);
        uStack_2d = _MEM[param_2 + 1];
        pbVar1 = (param_2 + 2);
        if ((_MEM[param_2 + 1] === 0)) {
          iVar9 = __CrtDbgReport(2, 0x61e7a4, 0x185, 0, 0x61e7b0);
          if ((iVar9 === 1)) {
            /* DEVIATION: intrinsic */;
            iVar9 = pcVar4();
            return iVar9;
          }
        }
      }
      param_2 = pbVar1;
      write_char(s8(UNNAMED), param_1, DAT_fffffdd0);
      pbVar1 = param_2;
      break;
    case 1 :
      local_c = 0;
      local_240 = 0;
      local_248 = 0;
      local_14 = 0;
      local_8 = 0;
      local_238 = -1;
      local_20 = 0;
      break;
    case 2 :
      /* switch */ (_1_1_) {
      case 0x20 :
        local_8 = (local_8 | 2);
        break;
      case 0x23 :
        local_8 = (local_8 | 0x80);
        break;
      case 0x2b :
        local_8 = (local_8 | 1);
        break;
      case 0x2d :
        local_8 = (local_8 | 4);
        break;
      case 0x30 :
        local_8 = (local_8 | 8);
      }
      break;
    case 3 :
      if ((_MEM[param_2] === 0x2a)) {
        local_248 = get_int_arg(DAT_0000000c);
        if ((local_248 < 0)) {
          local_8 = (local_8 | 4);
          local_248 = (-local_248);
        }
      }
      else {
        local_248 = ((s8(_MEM[param_2]) + -48) + local_248 * 0xa);
      }
      break;
    case 4 :
      local_238 = 0;
      break;
    case 5 :
      if ((_MEM[param_2] === 0x2a)) {
        local_238 = get_int_arg(DAT_0000000c);
        if ((local_238 < 0)) {
          local_238 = -1;
        }
      }
      else {
        local_238 = ((s8(_MEM[param_2]) + -48) + local_238 * 0xa);
      }
      break;
    case 6 :
      /* switch */ (_1_1_) {
      case 0x49 :
        if ((_MEM[param_2 + 2] !== 0x34)) {
          local_1c = 0;
          goto switchD_005fb3f7_caseD_0;
        }
        local_8 = (local_8 | 0x8000);
        pbVar1 = (param_2 + 3);
        break;
      case 0x68 :
        local_8 = (local_8 | 0x20);
        break;
      case 0x6c :
        local_8 = (local_8 | 0x10);
        break;
      case 0x77 :
        local_8 = (local_8 | 0x800);
      }
      param_2 = pbVar1;
      pbVar1 = param_2;
      break;
    case 7 :
      pwVar2 = local_24;
      /* switch */ (_1_1_) {
      case 0x43 :
        if (((local_8 & 0x830) === 0)) {
          local_8 = (local_8 | 0x800);
        }
      case 99 :
        if (((local_8 & 0x810) === 0)) {
          local_24c = get_int_arg(DAT_0000000c);
          local_22c = ((local_24c) & 0xFF);
          local_28 = 1;
        }
        else {
          wVar6 = get_short_arg(DAT_0000000c);
          _local_18 = ((uStack_16 << 16) | wVar6);
          local_28 = _wctomb(DAT_fffffdd4, wVar6);
          if ((local_28 < 0)) {
            local_240 = 1;
          }
        }
        pwVar2 = DAT_fffffdd4;
        break;
      case 0x45 :
      case 0x47 :
        local_c = 1;
        uStack_2d = (_MEM[param_2] + 0x20);
      case 0x65 :
      case 0x66 :
      case 0x67 :
        local_8 = (local_8 | 0x40);
        local_24 = DAT_fffffdd4;
        if ((local_238 < 0)) {
          local_238 = 6;
        }
        else if ((UNNAMED === 0x67)) {
          local_238 = 1;
        }
        local_268 = s32(param_3, 0);
        local_264 = s32(param_3, 1);
        param_3 = (param_3 + 2);
        wv(PTR___fptrap_0063aee0, PTR___fptrap_0063aee0);
        if ((local_238 === 0)) {
          wv(PTR___fptrap_0063aeec, PTR___fptrap_0063aeec);
        }
        if (((local_8 & 0x80) === 0)) {
          wv(PTR___fptrap_0063aee4, PTR___fptrap_0063aee4);
        }
        if ((((s16(local_24, 0)) & 0xFF) === 0x2d)) {
          local_8 = (local_8 | 0x100);
          local_24 = (local_24 + 1);
        }
        local_28 = _strlen(local_24);
        pwVar2 = local_24;
        break;
      case 0x53 :
        if (((local_8 & 0x830) === 0)) {
          local_8 = (local_8 | 0x800);
        }
      case 0x73 :
        if ((local_238 === -1)) {
          local_25c = 0x7fffffff;
        }
        else {
          local_25c = local_238;
        }
        local_24 = get_int_arg(DAT_0000000c);
        if (((local_8 & 0x810) === 0)) {
          if ((local_24 === 0)) {
            local_24 = PTR_DAT_0063a2a8;
          }
          for (/* cond: (((s16(local_254, 0)) & 0xFF) !== 0) */); (local_25c = (local_25c !== 0) && (local_254 = s16(local_254, 0)));
              local_254 = (local_254 + 1)) {
            local_25c = (local_25c + -1);
          }
          local_28 = (local_254 - local_24);
          local_25c = (local_25c + -1);
          pwVar2 = local_24;
        }
        else {
          if ((local_24 === 0)) {
            local_24 = PTR_DAT_0063a2ac;
          }
          local_20 = 1;
          for (/* cond: (s16(local_258, 0) !== 0) */); (local_25c = (local_25c !== 0) && (local_258 = s16(local_258, 0)));
              local_258 = (local_258 + 1)) {
            local_25c = (local_25c + -1);
          }
          local_28 = ((local_258 - local_24) >> 1);
          local_25c = (local_25c + -1);
          pwVar2 = local_24;
        }
        break;
      case 0x5a :
        local_250 = get_int_arg(DAT_0000000c);
        if ((s32((local_250 + 2), 0) === 0)) {
          local_24 = PTR_DAT_0063a2a8;
          local_28 = _strlen(PTR_DAT_0063a2a8);
          pwVar2 = local_24;
        }
        else if (((local_8 & 0x800) === 0)) {
          local_20 = 0;
          local_28 = ((s16(local_250, 0)) << 16 >> 16);
          pwVar2 = s32((local_250 + 2), 0);
        }
        else {
          local_28 = (((s16(local_250, 0)) << 16 >> 16) >>> 1);
          local_20 = 1;
          pwVar2 = s32((local_250 + 2), 0);
        }
        break;
      case 100 :
      case 0x69 :
        local_8 = (local_8 | 0x40);
        local_23c = 0xa;
        goto LAB_005faecc;
      case 0x6e :
        local_260 = get_int_arg(DAT_0000000c);
        if (((local_8 & 0x20) === 0)) {
          w32(local_260, 0, local_230);
        }
        else {
          w16(local_260, 0, ((local_230) & 0xFFFF));
        }
        local_240 = 1;
        pwVar2 = local_24;
        break;
      case 0x6f :
        local_23c = 8;
        if (((local_8 & 0x80) !== 0)) {
          local_8 = (local_8 | 0x200);
        }
        goto LAB_005faecc;
      case 0x70 :
        local_238 = 8;
      case 0x58 :
        local_234 = 7;
        goto LAB_005fae7b;
      case 0x75 :
        local_23c = 0xa;
        goto LAB_005faecc;
      case 0x78 :
        local_234 = 0x27;
 LAB_005fae7b: :
        local_23c = 0x10;
        if (((local_8 & 0x80) !== 0)) {
          local_244 = 0x30;
          local_243 = (((local_234) & 0xFF) + 0x51);
          local_14 = 2;
        }
 LAB_005faecc: :
        if (((local_8 & 0x8000) === 0)) {
          if (((local_8 & 0x20) === 0)) {
            if (((local_8 & 0x40) === 0)) {
              uVar8 = get_int_arg(DAT_0000000c);
              uVar11 = uVar8;
            }
            else {
              iVar9 = get_int_arg(DAT_0000000c);
              uVar11 = iVar9;
            }
          }
          else if (((local_8 & 0x40) === 0)) {
            uVar8 = get_int_arg(DAT_0000000c);
            uVar11 = (uVar8 & 0xffff);
          }
          else {
            sVar7 = get_int_arg(DAT_0000000c);
            uVar11 = ((sVar7) << 16 >> 16);
          }
        }
        else {
          uVar11 = get_int64_arg(DAT_0000000c);
        }
        local_27c = (uVar11 >>> 0x20);
        local_27c = uVar11;
        uVar5 = uVar11;
        if ((uVar11 < 0)) {
          local_8 = (local_8 | 0x100);
          uVar5 = (((-((uVar11 >>> 0x20) + u8((uVar11 !== 0)))) << 32) | (-uVar11));
        }
        local_270 = (uVar5 >>> 0x20);
        local_270 = uVar5;
        if (((local_8 & 0x8000) === 0)) {
          local_270 = 0;
        }
        lVar12 = ((UNNAMED << 32) | uVar5);
        if ((local_238 < 0)) {
          local_238 = 1;
        }
        else {
          local_8 = (local_8 & -9);
        }
        if ((uVar5 === 0)) {
          local_14 = 0;
        }
        local_24 = DAT_ffffffd3;
        local_27c = uVar11;
        while ((lVar12 !== 0)) {
          local_238 = iVar9;
          local_270 = lVar12;
          local_274 = __aullrem(lVar12, local_23c, (local_23c >> 0x1f));
          local_274 = (local_274 + 0x30);
          lVar12 = __aulldiv(local_270, local_23c, (local_23c >> 0x1f));
          if ((0x39 < local_274)) {
            local_274 = (local_274 + local_234);
          }
          _MEM[local_24] = ((local_274) & 0xFF);
          local_24 = (local_24 + -1);
        }
        local_28 = (DAT_ffffffd3 - local_24);
        pwVar2 = (local_24 + 1);
        local_270 = 0;
        local_238 = iVar9;
        if ((local_28 === 0)) {
          _MEM[local_24] = 0x30;
          local_28 = (local_28 + 1);
          pwVar2 = local_24;
        }
      }
      local_24 = pwVar2;
      if ((local_240 === 0)) {
        if (((local_8 & 0x40) !== 0)) {
          if (((local_8 & 0x100) === 0)) {
            if (((local_8 & 1) === 0)) {
              if (((local_8 & 2) !== 0)) {
                local_244 = 0x20;
                local_14 = 1;
              }
            }
            else {
              local_244 = 0x2b;
              local_14 = 1;
            }
          }
          else {
            local_244 = 0x2d;
            local_14 = 1;
          }
        }
        local_280 = ((local_248 - local_28) - local_14);
        if (((local_8 & 0xc) === 0)) {
          write_multi_char(0x20, local_280, param_1, DAT_fffffdd0);
        }
        write_string(DAT_fffffdbc, local_14, param_1, DAT_fffffdd0);
        if (((local_8 & 4) === 0)) {
          write_multi_char(0x30, local_280, param_1, DAT_fffffdd0);
        }
        if ((local_28 < 1)) {
          write_string(local_24, local_28, param_1, DAT_fffffdd0);
        }
        else {
          local_284 = local_24;
          local_288 = local_28;
          while (bVar10) {
            wVar6 = s16(local_284, 0);
            local_284 = (local_284 + 1);
            iVar9 = _wctomb(DAT_fffffd74, wVar6);
            if ((iVar9 < 1));
          }
        }
        if (((local_8 & 4) !== 0)) {
          write_multi_char(0x20, local_280, param_1, DAT_fffffdd0);
        }
      }
    }
  } while ( true );
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _write_char */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function write_char (param_1, param_2, param_3)

 {
  let local_8;

  w32(DAT_00000004, 0, (s32(DAT_00000004, 0) + -1));
  if ((s32(DAT_00000004, 0) < 0)) {
    local_8 = __flsbuf(param_1, param_2);
  }
  else {
    _MEM[s32(DAT_00000000, 0)] = ((param_1) & 0xFF);
    local_8 = u8(_MEM[s32(DAT_00000000, 0)]);
    w32(DAT_00000000, 0, (s32(DAT_00000000, 0) + 1));
  }
  if ((local_8 === -1)) {
    w32(param_3, 0, -1);
  }
  else {
    w32(param_3, 0, (s32(param_3, 0) + 1));
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _write_multi_char */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function write_multi_char (param_1, param_2, param_3, param_4)

 {
  do {
    if ((param_2 < 1)) {
      return;
    }
    write_char(param_1, param_3, param_4);
    param_2 = (param_2 + -1);
  } while ((s32(param_4, 0) !== -1));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _write_string */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function write_string (param_1, param_2, param_3, param_4)

 {
  do {
    if ((param_2 < 1)) {
      return;
    }
    write_char(s8(_MEM[param_1]), param_3, param_4);
    param_1 = (param_1 + 1);
    param_2 = (param_2 + -1);
  } while ((s32(param_4, 0) !== -1));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _get_int_arg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function get_int_arg (param_1)

 {
  w32(param_1, 0, (s32(param_1, 0) + 4));
  return s32((s32(param_1, 0) + -4), 0);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _get_int64_arg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function get_int64_arg (param_1)

 {
  w32(param_1, 0, (s32(param_1, 0) + 8));
  return /* LOAD_8((s32(param_1, 0) + -8)) */;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _get_short_arg */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function get_short_arg (param_1)

 {
  w32(param_1, 0, (s32(param_1, 0) + 4));
  return (((((s32(param_1, 0) >>> 0x10)) & 0xFFFF) << 16) | s16((s32(param_1, 0) + -4), 0));
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __allmul */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __allmul (param_1, param_2, param_3, param_4)

 {
  if (((param_4 === 0) && (param_2 === 0))) {
    return param_1 * param_3;
  }
  return ((((param_1 * param_3 >>> 0x20) + (param_2 * param_3 + param_1 * param_4)) << 32) | param_1 * param_3);
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */
 /* address  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __stbuf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __stbuf (_File)

 {
  let pcVar1;
  let iVar2;
  let uVar3;
  let local_c;

  if ((iVar2 === 1)) {
    /* DEVIATION: intrinsic */;
    iVar2 = pcVar1();
    return iVar2;
  }
  iVar2 = __isatty(s32(DAT_00000010, 0));
  if ((iVar2 === 0)) {
    iVar2 = 0;
  }
  else {
    if ((_File === DAT_0063ac78)) {
      local_c = 0;
    }
    else {
      if ((_File !== DAT_0063ac98)) {
        return 0;
      }
      local_c = 1;
    }
    _DAT_0063aed8 = (None + 1);
    if (((s32(DAT_0000000c, 0) & 0x10c) === 0)) {
      if ((s32((DAT_0063a2b0 + local_c * 4), 0) === 0)) {
        uVar3 = __malloc_dbg(0x1000, 2, 0x61e7c0, 0x5e);
        w32((DAT_0063a2b0 + local_c * 4), 0, uVar3);
        if ((s32((DAT_0063a2b0 + local_c * 4), 0) === 0)) {
          return 0;
        }
      }
      w32(DAT_00000008, 0, s32((DAT_0063a2b0 + local_c * 4), 0));
      w32(DAT_00000000, 0, s32(DAT_00000008, 0));
      w32(DAT_00000018, 0, 0x1000);
      w32(DAT_00000004, 0, s32(DAT_00000018, 0));
      w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 0x1102));
      iVar2 = 1;
    }
    else {
      iVar2 = 0;
    }
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ftbuf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ftbuf (_Flag, _File)

 {
  let pcVar1;
  let iVar2;

  if ((iVar2 === 1)) {
    /* DEVIATION: intrinsic */;
    pcVar1 = pcVar1();
    return;
  }
  if ((_Flag === 0)) {
    if (((s32(DAT_0000000c, 0) & 0x1000) !== 0)) {
      __flush(_File);
    }
  }
  else if (((s32(DAT_0000000c, 0) & 0x1000) !== 0)) {
    __flush(_File);
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) & -0x1101));
    w32(DAT_00000018, 0, 0);
    w32(DAT_00000000, 0, 0);
    w32(DAT_00000008, 0, s32(DAT_00000000, 0));
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __read */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __read (_FileHandle, _DstBuf, _MaxCharCount)

 {
  let BVar1;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 1) !== 0)) {
    local_1c = 0;
    local_18 = _DstBuf;
    if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 2) !== 0)) {
      local_1c = 0;
    }
    else {
      if ((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 5) + (_FileHandle & 0x1f) * 8)] !== 0xa)) {
        _MEM[_DstBuf] = _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 5) + (_FileHandle & 0x1f) * 8)];
        local_18 = (_DstBuf + 1);
        local_1c = 1;
        _MaxCharCount = (_MaxCharCount - 1);
        _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 5) + (_FileHandle & 0x1f) * 8)] = 0xa;
      }
      BVar1 = FUN_006e7c3c(s32((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + (_FileHandle & 0x1f) * 8), 0), local_18, _MaxCharCount, DAT_ffffffec, 0);
      if ((BVar1 === 0)) {
        local_c = FUN_006e7b00();
        if ((local_c === 5)) {
          wv(DAT_00639f14, 9);
          local_1c = -1;
          wv(DAT_00639f18, 5);
        }
        else if ((local_c === 0x6d)) {
          local_1c = 0;
        }
        else {
          __dosmaperr(local_c);
          local_1c = -1;
        }
      }
      else {
        local_1c = (local_1c + local_14);
        if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 0x80) !== 0)) {
          if ((_MEM[_DstBuf] !== 0xa)) {
            _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] = (_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 0xfb);
          }
          else {
            _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] = (_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] | 4);
          }
          local_10 = _DstBuf;
          local_8 = _DstBuf;
          while ((local_8 < (local_1c + _DstBuf))) {
            if ((_MEM[local_8] === 0x1a)) {
              if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 0x40) === 0)) {
                _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] = (_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] | 2);
              }
              break;
            }
            if ((_MEM[local_8] === 0xd)) {
              if ((local_8 < (_DstBuf + (local_1c + -1)))) {
                if ((_MEM[local_8 + 1] === 0xa)) {
                  local_8 = (local_8 + 2);
                  _MEM[local_10] = 0xa;
                }
                else {
                  _MEM[local_10] = _MEM[local_8];
                  local_8 = (local_8 + 1);
                }
                local_10 = (local_10 + 1);
              }
              else {
                local_8 = (local_8 + 1);
                local_c = 0;
                BVar1 = FUN_006e7c3c(s32((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + (_FileHandle & 0x1f) * 8), 0), DAT_ffffffe0, 1, DAT_ffffffec, 0)
                ;
                if ((BVar1 === 0)) {
                  local_c = FUN_006e7b00();
                }
                if ((local_14 !== 0)) {
                  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 0x48) === 0)) {
                    if ((UNNAMED === 0xa)) {
                      _MEM[local_10] = 0xa;
                      local_10 = (local_10 + 1);
                    }
                    else {
                      __lseek(_FileHandle, -1, 1);
                      if ((UNNAMED !== 0xa)) {
                        _MEM[local_10] = 0xd;
                        local_10 = (local_10 + 1);
                      }
                    }
                  }
                  else {
                    if ((UNNAMED === 0xa)) {
                      _MEM[local_10] = 0xa;
                    }
                    else {
                      _MEM[local_10] = 0xd;
                      _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 5) + (_FileHandle & 0x1f) * 8)] = UNNAMED;
                    }
                    local_10 = (local_10 + 1);
                  }
                }
                else {
                  _MEM[local_10] = 0xd;
                  local_10 = (local_10 + 1);
                }
              }
            }
            else {
              _MEM[local_10] = _MEM[local_8];
              local_8 = (local_8 + 1);
              local_10 = (local_10 + 1);
            }
          }
          local_1c = (local_10 - _DstBuf);
        }
      }
    }
  }
  else {
    wv(DAT_00639f14, 9);
    wv(DAT_00639f18, 0);
    local_1c = -1;
  }
  return local_1c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __write */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __write (_FileHandle, _Buf, _MaxCharCount)

 {
  let cVar1;
  let BVar2;
  let local_424;
  let local_41c;
  let local_418;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 1) !== 0)) {
    local_14 = 0;
    local_424 = 0;
    if ((_MaxCharCount === 0)) {
      local_424 = 0;
    }
    else {
      if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 0x20) !== 0)) {
        __lseek(_FileHandle, 0, 2);
      }
      if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 0x80) === 0)) {
        BVar2 = FUN_006e7c4c(s32((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + (_FileHandle & 0x1f) * 8), 0), _Buf, _MaxCharCount, DAT_fffffbe4, 0);
        if ((BVar2 === 0)) {
          local_10 = FUN_006e7b00();
        }
        else {
          local_10 = 0;
          local_14 = local_41c;
        }
      }
      else {
        local_8 = _Buf;
        local_10 = 0;
        do {
          if ((_MaxCharCount <= (local_8 - _Buf)));
          while (((local_8 - _Buf) < _MaxCharCount)) {
            cVar1 = _MEM[local_8];
            local_8 = (local_8 + 1);
            if ((cVar1 === 0xa)) {
              local_424 = (local_424 + 1);
              _MEM[local_c] = 0xd;
              local_c = (local_c + 1);
            }
            _MEM[local_c] = cVar1;
            local_c = (local_c + 1);
          }
          BVar2 = FUN_006e7c4c(s32((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + (_FileHandle & 0x1f) * 8), 0), DAT_fffffbe8, (local_c - DAT_fffffbe8), DAT_fffffbe4, 0);
          if ((BVar2 === 0)) {
            local_10 = FUN_006e7b00();
            break;
          }
          local_14 = (local_14 + local_41c);
        } while (((local_c - DAT_fffffbe8) <= local_41c));
      }
      if ((local_14 === 0)) {
        if ((local_10 === 0)) {
          if ((_MEM[_Buf] !== 0x1a)) {
            wv(DAT_00639f14, 0x1c);
            wv(DAT_00639f18, 0);
            local_424 = -1;
          }
          else {
            local_424 = 0;
          }
        }
        else {
          if ((local_10 === 5)) {
            wv(DAT_00639f14, 9);
            wv(DAT_00639f18, local_10);
          }
          else {
            __dosmaperr(local_10);
          }
          local_424 = -1;
        }
      }
      else {
        local_424 = (local_14 - local_424);
      }
    }
  }
  else {
    wv(DAT_00639f14, 9);
    wv(DAT_00639f18, 0);
    local_424 = -1;
  }
  return local_424;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __dosmaperr */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __dosmaperr (param_1)

 {
  let local_8;

  wv(DAT_00639f18, param_1);
  local_8 = 0;
  while ((s32((DAT_0063a2b8 + local_8 * 8), 0) === param_1)) {
    if ((0x2c < local_8)) {
      if ((0x24 < param_1)) {
        if ((0xca < param_1)) {
          wv(DAT_00639f14, 0x16);
        }
        else {
          wv(DAT_00639f14, 8);
        }
      }
      else {
        wv(DAT_00639f14, 0xd);
      }
      return;
    }
    if ((s32((DAT_0063a2b8 + local_8 * 8), 0) === param_1));
  }
  wv(DAT_00639f14, s32((DAT_0063a2bc + local_8 * 8), 0));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __mbctoupper */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __mbctoupper (unaff_ESI, unaff_EDI, _Ch)

 {
  let iVar1;
  // unaff_ESI promoted to parameter;
  // unaff_EDI promoted to parameter;
  let local_c;
  let local_b;
  let local_8;
  let local_7;

  if ((_Ch < 0x100)) {
    if ((_Ch < 0x7b)) {
      _Ch = (_Ch - 0x20);
    }
  }
  else {
    local_8 = (((_Ch >>> 8)) & 0xFF);
    local_7 = ((_Ch) & 0xFF);
    if ((iVar1 !== 0)) {
      _Ch = (u8(local_b) + u8(local_c) * 0x100);
    }
  }
  return _Ch;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ioinit */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ioinit ()

 {
  let puVar1;
  let DVar2;
  let piVar3;
  let hFile;
  let UVar4;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_4c;
  let local_8;

  local_54 = __malloc_dbg(0x100, 2, 0x61e7e4, 0x83);
  if ((local_54 === 0)) {
    __amsg_exit(0x1b);
  }
  wv(DAT_006e6b2c, 0x20);
  wv(DAT_006e69f0, local_54);
  for (/* cond: (local_54 < (DAT_006e69f0 + 0x40)) */); local_54 = (local_54 < (DAT_006e69f0 + 0x40)); local_54 = (local_54 + 2)) {
    _MEM[(local_54 + 1)] = 0;
    w32(local_54, 0, -1);
    _MEM[(local_54 + 5)] = 0xa;
  }
  FUN_006e7bf4(DAT_ffffffb4);
  if ((UNNAMED !== 0)) {
    local_68 = s32(UNNAMED, 0);
    local_8 = (UNNAMED + 4);
    local_64 = (local_68 + local_8);
    if ((0x7ff < local_68)) {
      local_68 = 0x800;
    }
    local_60 = 1;
    while ((DAT_006e6b2c < local_68)) {
      local_54 = __malloc_dbg(0x100, 2, 0x61e7e4, 0xb8);
      if ((local_54 === 0)) {
        local_68 = DAT_006e6b2c;
        break;
      }
      w32(DAT_006e69f0, local_60, local_54);
      wv(DAT_006e6b2c, (DAT_006e6b2c + 0x20));
      for (/* cond: (local_54 < (s32(DAT_006e69f0, local_60) + 0x100)) */); local_54 = (local_54 < (s32(DAT_006e69f0, local_60) + 0x100));
          local_54 = (local_54 + 2)) {
        _MEM[(local_54 + 1)] = 0;
        w32(local_54, 0, -1);
        _MEM[(local_54 + 5)] = 0xa;
      }
      local_60 = (local_60 + 1);
    }
    for (/* cond: (local_5c < local_68) */); local_5c = local_5c; local_5c = (local_5c + 1)) {
      if ((DVar2 !== 0)) {
        puVar1 = (s32((DAT_006e69f0 + ((local_5c & -32) >> 3)), 0) + (local_5c & 0x1f) * 8);
        w32(puVar1, 0, s32(local_64, 0));
        _MEM[(puVar1 + 1)] = ((s32(local_8, 0)) & 0xFF);
      }
      local_8 = (local_8 + 1);
      local_64 = (local_64 + 4);
    }
  }
  for (/* cond: (local_5c < 3) */); local_5c = local_5c; local_5c = (local_5c + 1)) {
    piVar3 = (DAT_006e69f0 + local_5c * 2);
    if ((s32(DAT_006e69f0, local_5c * 2) === -1)) {
      _MEM[(piVar3 + 1)] = 0x81;
      if ((local_5c === 0)) {
        local_6c = -10;
      }
      else if ((local_5c === 1)) {
        local_6c = -11;
      }
      else {
        local_6c = -12;
      }
      hFile = FUN_006e7bd8(local_6c);
      if ((DVar2 === 0)) {
        _MEM[(piVar3 + 1)] = (_MEM[(piVar3 + 1)] | 0x40);
      }
      else {
        w32(DAT_006e69f0, local_5c * 2, hFile);
        local_58 = ((DVar2) & 0xFF);
        if ((local_58 === 2)) {
          _MEM[(piVar3 + 1)] = (_MEM[(piVar3 + 1)] | 0x40);
        }
        else if ((local_58 === 3)) {
          _MEM[(piVar3 + 1)] = (_MEM[(piVar3 + 1)] | 8);
        }
      }
    }
    else {
      _MEM[(piVar3 + 1)] = (_MEM[(piVar3 + 1)] | 0x80);
    }
  }
  UVar4 = FUN_006e7c00(DAT_006e6b2c);
  return UVar4;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ioterm */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ioterm ()

 {
  let local_8;

  for (/* cond: (local_8 < 0x40) */); local_8 = (local_8 < 0x40); local_8 = (local_8 + 1)) {
    if ((s32(DAT_006e69f0, local_8) !== 0)) {
      __free_dbg(s32(DAT_006e69f0, local_8), 2);
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */
 /* address  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __getbuf */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __getbuf (_File)

 {
  let pcVar1;
  let iVar2;
  let pcVar3;

  if ((_File === 0)) {
    iVar2 = __CrtDbgReport(2, 0x61e7f0, 0x2e, 0, 0x61d818);
    if ((iVar2 === 1)) {
      /* DEVIATION: intrinsic */;
      pcVar1 = pcVar1();
      return;
    }
  }
  _DAT_0063aed8 = (None + 1);
  pcVar3 = __malloc_dbg(0x1000, 2, 0x61e7f0, 0x3b);
  w32(DAT_00000008, 0, pcVar3);
  if ((s32(DAT_00000008, 0) === 0)) {
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 4));
    w32(DAT_00000008, 0, DAT_00000014);
    w32(DAT_00000018, 0, 2);
  }
  else {
    w32(DAT_0000000c, 0, (s32(DAT_0000000c, 0) | 8));
    w32(DAT_00000018, 0, 0x1000);
  }
  w32(DAT_00000000, 0, s32(DAT_00000008, 0));
  w32(DAT_00000004, 0, 0);
  return;
}


 export function FUN_005fc5c0 (param_1)

 {
  return (param_1 + 0x20);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _tolower */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _tolower (unaff_ESI, unaff_EDI, _C)

 {
  let iVar1;
  // unaff_ESI promoted to parameter;
  // unaff_EDI promoted to parameter;
  let local_14;
  let local_10;
  let local_c;
  let local_b;
  let local_a;
  let local_8;

  if ((DAT_0063a078 === 0)) {
    if ((_C < 0x5b)) {
      _C = (_C + 0x20);
    }
  }
  else {
    if ((_C < 0x100)) {
      if ((DAT_0063a29c < 2)) {
        local_14 = (((s16((PTR_DAT_0063a090 + _C * 2), 0)) & 0xFFFF) & 1);
      }
      else {
        local_14 = __isctype(_C, 1);
      }
      if ((local_14 === 0)) {
        return _C;
      }
    }
    if (((s16((PTR_DAT_0063a090 + ((_C >>> 8) & 0xff) * 2), 0) & 0x8000) === 0)) {
      local_c = ((_C) & 0xFF);
      local_b = 0;
      local_8 = 1;
    }
    else {
      local_c = (((_C >>> 8)) & 0xFF);
      local_b = ((_C) & 0xFF);
      local_a = 0;
      local_8 = 2;
    }
    iVar1 = ___crtLCMapStringA(DAT_0063a078, 0x100, DAT_fffffff4, local_8, DAT_fffffff0, 3, 0, unaff_EDI, unaff_ESI);
    if ((iVar1 !== 0)) {
      if ((iVar1 === 1)) {
        _C = u8(((UNNAMED) & 0xFF));
      }
      else {
        _C = ((UNNAMED) & 0xFFFF);
      }
    }
  }
  return _C;
}


 export function FUN_005fc720 (param_1)

 {
  let uVar1;

  uVar1 = DAT_006e54a0;
  wv(DAT_006e54a0, param_1);
  return uVar1;
}


 export function FUN_005fc750 ()

 {
  return DAT_006e54a0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __callnewh */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __callnewh (_Size)

 {
  let iVar1;

  if ((iVar1 !== 0)) {
    return 1;
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __malloc_base */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __malloc_base (param_1)

 {
  __nh_malloc_base(param_1, DAT_0063a428);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __nh_malloc_base */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __nh_malloc_base (param_1, param_2)

 {
  let iVar1;
  let local_8;

  if ((param_1 < -31)) {
    if ((param_1 === 0)) {
      param_1 = 1;
    }
    do {
      if ((param_1 < -31)) {
        local_8 = __heap_alloc_base(param_1);
      }
      else {
        local_8 = 0;
      }
      if ((local_8 !== 0)) {
        return local_8;
      }
      if ((param_2 === 0)) {
        return 0;
      }
      iVar1 = __callnewh(param_1);
    } while ((iVar1 !== 0));
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __heap_alloc_base */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __heap_alloc_base (param_1)

 {
  let dwBytes;
  let pvVar1;

  dwBytes = ((param_1 + 0xf) & -16);
  if ((pvVar1 === 0)) {
    pvVar1 = FUN_006e7bfc(DAT_006e69e4, 0, dwBytes);
  }
  return pvVar1;
}


 export function FUN_005fc8f0 ()

 {
  return 1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __expand_base */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __expand_base (param_1, param_2)

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((param_2 < -31)) {
    if ((param_2 === 0)) {
      param_2 = 0x10;
    }
    else {
      param_2 = ((param_2 + 0xf) & -16);
    }
    local_10 = ___sbh_find_block(param_1, DAT_ffffffec, DAT_fffffff8);
    if ((local_10 === 0)) {
      local_c = FUN_006e7bc0(DAT_006e69e4, 0x10, param_1, param_2);
    }
    else {
      local_c = 0;
      if ((iVar1 !== 0)) {
        local_c = param_1;
      }
    }
  }
  else {
    local_c = 0;
  }
  return local_c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __realloc_base */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __realloc_base (param_1, param_2)

 {
  let pvVar1;
  let iVar2;
  let uVar3;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    pvVar1 = __malloc_base(param_2);
  }
  else if ((param_2 === 0)) {
    __free_base(param_1);
    pvVar1 = 0;
  }
  else {
    if ((param_2 < -31)) {
      if ((param_2 === 0)) {
        param_2 = 0x10;
      }
      else {
        param_2 = ((param_2 + 0xf) & -16);
      }
    }
    do {
      local_c = 0;
      if ((param_2 < -31)) {
        local_10 = ___sbh_find_block(param_1, DAT_ffffffe8, DAT_fffffff8);
        if ((local_10 === 0)) {
          local_c = FUN_006e7bc0(DAT_006e69e4, 0, param_1, param_2);
        }
        else {
          if ((param_2 < DAT_0063ac54)) {
            iVar2 = ___sbh_resize_block(local_18, local_8, local_10, (param_2 >>> 4));
            if ((iVar2 === 0)) {
              local_c = ___sbh_alloc_block((param_2 >>> 4));
              if ((local_c !== 0)) {
                local_14 = (u8(_MEM[local_10]) << 4);
                uVar3 = param_2;
                if ((local_14 <= param_2)) {
                  uVar3 = local_14;
                }
                FID_conflict:_memcpy(local_c, param_1, uVar3);
                ___sbh_free_block(local_18, local_8, local_10);
              }
            }
            else {
              local_c = param_1;
            }
          }
          if ((local_c !== 0)) {
            local_14 = (u8(_MEM[local_10]) << 4);
            uVar3 = param_2;
            if ((local_14 <= param_2)) {
              uVar3 = local_14;
            }
            FID_conflict:_memcpy(local_c, param_1, uVar3);
            ___sbh_free_block(local_18, local_8, local_10);
          }
        }
      }
      if ((local_c !== 0)) {
        return local_c;
      }
      if ((DAT_0063a428 === 0)) {
        return 0;
      }
      iVar2 = __callnewh(param_2);
    } while ((iVar2 !== 0));
    pvVar1 = 0;
  }
  return pvVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __free_base */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __free_base (param_1)

 {
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 !== 0)) {
    local_c = ___sbh_find_block(param_1, DAT_fffffff0, DAT_fffffff8);
    if ((local_c === 0)) {
      FUN_006e7bbc(DAT_006e69e4, 0, param_1);
    }
    else {
      ___sbh_free_block(local_10, local_8, local_c);
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __heapchk */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __heapchk ()

 {
  let iVar1;
  let BVar2;
  let DVar3;
  let local_8;

  local_8 = -2;
  iVar1 = ___sbh_heap_check();
  if ((iVar1 < 0)) {
    local_8 = -4;
  }
  BVar2 = FUN_006e7c14(DAT_006e69e4, 0, 0);
  if ((BVar2 === 0)) {
    DVar3 = FUN_006e7b00();
    if ((DVar3 === 0x78)) {
      wv(DAT_00639f18, 0x78);
      wv(DAT_00639f14, 0x28);
    }
    else {
      local_8 = -4;
    }
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __heapset */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __heapset (_Fill)

 {
  let iVar1;

  iVar1 = __heapchk();
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __heap_init */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __heap_init ()

 {
  let iVar1;

  wv(DAT_006e69e4, FUN_006e7bb4(1, 0x1000, 0));
  if ((FUN_006e7bb4(1, 0x1000, 0) === 0)) {
    iVar1 = 0;
  }
  else {
    iVar1 = ___sbh_new_region();
    if ((iVar1 === 0)) {
      FUN_006e7bb8(FUN_006e7bb4(1, 0x1000, 0));
      iVar1 = 0;
    }
    else {
      iVar1 = 1;
    }
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __heap_term */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __heap_term ()

 {
  let local_8;

  local_8 = PTR_LOOP_0063a438;
  do {
    if ((s32(local_8, 0x204) !== 0)) {
      FUN_006e7bb0(s32(local_8, 0x204), 0, 0x8000);
    }
    local_8 = s32(local_8, 0);
  } while ((local_8 !== PTR_LOOP_0063a438));
  FUN_006e7bb8(DAT_006e69e4);
  return;
}


 export function FUN_005fcdc0 ()

 {
  return DAT_0063ac54;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __set_sbh_threshold */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __set_sbh_threshold (param_1)

 {
  let uVar1;

  uVar1 = ((param_1 + 0xf) & -16);
  if ((uVar1 < 0x781)) {
    wv(DAT_0063ac54, uVar1);
  }
  return (uVar1 < 0x781);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___sbh_new_region */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___sbh_new_region ()

 {
  let pvVar1;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_0063ac48 === 0)) {
    local_10 = PTR_LOOP_0063a438;
  }
  else {
    local_10 = FUN_006e7bfc(DAT_006e69e4, 0, 0x814);
    if ((local_10 === 0)) {
      return 0;
    }
  }
  local_8 = FUN_006e7bac(0, 0x400000, 0x2000, 4);
  if ((local_8 !== 0)) {
    pvVar1 = FUN_006e7bac(local_8, 0x10000, 0x1000, 4);
    if ((pvVar1 !== 0)) {
      if ((local_10 === PTR_LOOP_0063a438)) {
        if ((PTR_LOOP_0063a438 === 0)) {
          wv(PTR_LOOP_0063a438, PTR_LOOP_0063a438);
        }
        if ((PTR_LOOP_0063a43c === 0)) {
          wv(PTR_LOOP_0063a43c, PTR_LOOP_0063a438);
        }
      }
      else {
        w32(local_10, 0, PTR_LOOP_0063a438);
        w32(local_10, 1, PTR_LOOP_0063a43c);
        wv(PTR_LOOP_0063a43c, local_10);
        w32(s32(local_10, 1), 0, local_10);
      }
      w32(local_10, 0x204, local_8);
      w32(local_10, 2, 0);
      w32(local_10, 3, 0x10);
      for (/* cond: (local_c < 0x400) */); local_c = (local_c < 0x400); local_c = (local_c + 1)) {
        if ((local_c < 0x10)) {
          _MEM[((local_c + 0x10) + local_10)] = 0xf0;
        }
        else {
          _MEM[((local_c + 0x10) + local_10)] = 0xff;
        }
        _MEM[((local_c + 0x410) + local_10)] = 0xf1;
      }
      _memset(local_8, 0, 0x10000);
      for (/* cond: (local_8 < (s32(local_10, 0x204) + 0x10000)) */); local_8 = (local_8 < (s32(local_10, 0x204) + 0x10000)); local_8 = (local_8 + 0x400)) {
        w32(local_8, 0, (local_8 + 2));
        w32(local_8, 1, 0xf0);
        _MEM[(local_8 + 0x3e)] = 0xff;
      }
      return local_10;
    }
    FUN_006e7bb0(local_8, 0, 0x8000);
  }
  if ((local_10 !== PTR_LOOP_0063a438)) {
    FUN_006e7bbc(DAT_006e69e4, 0, local_10);
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___sbh_release_region */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___sbh_release_region (param_1)

 {
  FUN_006e7bb0(s32(param_1, 0x204), 0, 0x8000);
  if ((param_1 === PTR_LOOP_0063ac4c)) {
    wv(PTR_LOOP_0063ac4c, s32(param_1, 1));
  }
  if ((param_1 === PTR_LOOP_0063a438)) {
    wv(DAT_0063ac48, 0);
  }
  else {
    w32(s32(param_1, 1), 0, s32(param_1, 0));
    w32((s32(param_1, 0) + 4), 0, s32(param_1, 1));
    FUN_006e7bbc(DAT_006e69e4, 0, param_1);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___sbh_decommit_pages */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___sbh_decommit_pages (param_1)

 {
  let puVar1;
  let BVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  local_18 = PTR_LOOP_0063a43c;
  do {
    puVar1 = local_18;
    if ((s32((local_18 + 0x810), 0) !== 0)) {
      local_14 = 0;
      local_c = (local_18 + 0x40f);
      for (/* cond: (-1 < local_10) */); -1 = (-1 < local_10); local_10 = (local_10 + -1)) {
        if ((BVar2 !== 0)) {
          _MEM[local_c] = 0xff;
          wv(DAT_0063ac50, (DAT_0063ac50 + -1));
          if ((local_10 < s32((local_18 + 0xc), 0))) {
            w32((local_18 + 0xc), 0, local_10);
          }
          local_14 = (local_14 + 1);
          param_1 = (param_1 + -1);
          if ((param_1 === 0));
      }
      puVar1 = s32((local_18 + 4), 0);
      if ((_MEM[local_18 + 0x10] === 0xff)) {
        local_10 = 1;
        for (/* cond: (_MEM[local_c] === 0xff) */); (local_10 = (local_10 < 0x400) && (local_c = _MEM[local_c]));
            local_c = (local_c + 1)) {
          local_10 = (local_10 + 1);
        }
        if ((local_10 === 0x400)) {
          ___sbh_release_region(local_18);
        }
      }
    }
    local_18 = puVar1;
    if ((param_1 < 1)) {
      return;
    }
  } while ( true );
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___sbh_find_block */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___sbh_find_block (param_1, param_2, param_3)

 {
  let uVar1;
  let local_c;

  local_c = PTR_LOOP_0063a438;
  while (((s32(local_c, 0x204) + 0x400000) <= param_1)) {
    local_c = s32(local_c, 0);
    if ((local_c === PTR_LOOP_0063a438)) {
      return 0;
    }
  }
  w32(param_2, 0, local_c);
  uVar1 = (param_1 & -0x1000);
  w32(param_3, 0, uVar1);
  return ((((param_1 - (uVar1 + 0x100)) >> 4) + 8) + uVar1);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___sbh_free_block */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___sbh_free_block (param_1, param_2, param_3)

 {
  let iVar1;

  iVar1 = ((param_2 - s32((param_1 + 0x810), 0)) >> 0xc);
  _MEM[((iVar1 + 0x10) + param_1)] = (_MEM[((iVar1 + 0x10) + param_1)] + _MEM[param_3]);
  _MEM[param_3] = 0;
  _MEM[((iVar1 + 0x410) + param_1)] = 0xf1;
  if (((DAT_0063ac50 + 1) === 0x20)) {
    ___sbh_decommit_pages(0x10);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___sbh_alloc_block */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___sbh_alloc_block (param_1)

 {
  let piVar1;
  let puVar2;
  let puVar3;
  let puVar4;
  let puVar5;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  local_18 = PTR_LOOP_0063ac4c;
  do {
    if ((s32(local_18, 0x204) !== 0)) {
      for (/* cond: (local_10 < 0x400) */); local_10 = local_10;
          local_10 = (local_10 + 1)) {
        if ((param_1 < u8(_MEM[((local_10 + 0x410) + local_18)]))) {
          puVar2 = ___sbh_alloc_block_from_page((s32(local_18, 0x204) + local_10 * 0x1000), _MEM[((local_10 + 0x10) + local_18)], param_1);
          if ((puVar2 !== 0)) {
            wv(PTR_LOOP_0063ac4c, local_18);
            _MEM[((local_10 + 0x10) + local_18)] = (_MEM[((local_10 + 0x10) + local_18)] - ((param_1) & 0xFF));
            w32(local_18, 2, local_10);
            return puVar2;
          }
          _MEM[((local_10 + 0x410) + local_18)] = ((param_1) & 0xFF);
        }
      }
      for (/* cond: (local_10 < s32(local_18, 2)) */); local_10 = local_10;
          local_10 = (local_10 + 1)) {
        if ((param_1 < u8(_MEM[((local_10 + 0x410) + local_18)]))) {
          puVar2 = ___sbh_alloc_block_from_page((s32(local_18, 0x204) + local_10 * 0x1000), _MEM[((local_10 + 0x10) + local_18)], param_1);
          if ((puVar2 !== 0)) {
            wv(PTR_LOOP_0063ac4c, local_18);
            _MEM[((local_10 + 0x10) + local_18)] = (_MEM[((local_10 + 0x10) + local_18)] - ((param_1) & 0xFF));
            w32(local_18, 2, local_10);
            return puVar2;
          }
          _MEM[((local_10 + 0x410) + local_18)] = ((param_1) & 0xFF);
        }
      }
    }
    local_18 = s32(local_18, 0);
  } while ((local_18 !== PTR_LOOP_0063ac4c));
  local_18 = PTR_LOOP_0063a438;
  while ((s32(local_18, 3) === -1)) {
    local_18 = s32(local_18, 0);
    if ((local_18 === PTR_LOOP_0063a438)) {
      puVar2 = ___sbh_new_region();
      if ((puVar2 !== 0)) {
        piVar1 = s32((puVar2 + 0x810), 0);
        _MEM[(piVar1 + 2)] = ((param_1) & 0xFF);
        wv(PTR_LOOP_0063ac4c, puVar2);
        w32(piVar1, 0, (piVar1 + (param_1 + 8)));
        w32(piVar1, 1, (0xf0 - param_1));
        _MEM[puVar2 + 0x10] = (_MEM[puVar2 + 0x10] - ((param_1) & 0xFF));
        return (s32((puVar2 + 0x810), 0) + 0x100);
      }
      return 0;
    }
  }
  puVar2 = s32(local_18, 3);
  puVar3 = (puVar2 + 0x10);
  if ((0x3ff < puVar3)) {
    puVar3 = 0x400;
  }
  do {
    local_10 = (puVar2 + 1);
    if ((puVar3 <= local_10));
    puVar2 = local_10;
  } while ((_MEM[puVar4 + local_18] === 0xff));
  puVar2 = s32(local_18, 3);
  puVar3 = s32(local_18, 0x204);
  puVar4 = FUN_006e7bac((s32(local_18, 0x204) + s32(local_18, 3) * 0x1000), (local_10 - s32(local_18, 3)) * 0x1000, 0x1000, 4);
  if (((puVar3 + puVar2 * 0x1000) === puVar4)) {
    local_14 = s32(local_18, 3);
    local_8 = (s32(local_18, 0x204) + local_14 * 0x1000);
    for (/* cond: (local_14 < local_10) */); local_14 = local_14; local_14 = (local_14 + 1)) {
      _memset(local_8, 0x1000, 0);
      w32(local_8, 0, (local_8 + 2));
      w32(local_8, 1, 0xf0);
      _MEM[(local_8 + 0x3e)] = 0xff;
      _MEM[(local_14 + 0x10) + local_18] = 0xf0;
      _MEM[(local_14 + 0x410) + local_18] = 0xf1;
      local_8 = (local_8 + 0x400);
    }
    wv(PTR_LOOP_0063ac4c, local_18);
    for (/* cond: (_MEM[(local_10 + 0x10) + local_18] !== 0xff) */); (local_10 = local_10 && (local_10 = (local_10 + 0x10)));
        local_10 = (local_10 + 1)) {
    }
    puVar2 = s32(local_18, 3);
    if ((local_10 < 0x400)) {
      w32(local_18, 3, local_10);
    }
    else {
      w32(local_18, 3, -1);
    }
    puVar5 = (s32(local_18, 0x204) + puVar2 * 0x1000);
    _MEM[(puVar5 + 2)] = ((param_1) & 0xFF);
    w32(local_18, 2, puVar2);
    _MEM[(puVar2 + 0x10) + local_18] = (_MEM[(puVar2 + 0x10) + local_18] - ((param_1) & 0xFF));
    w32(puVar5, 0, (puVar5 + (param_1 + 8)));
    w32(puVar5, 1, (s32(puVar5, 1) - param_1));
    puVar2 = (s32(local_18, 0x204) + (puVar2 * 0x1000 + 0x100));
  }
  else {
    puVar2 = 0;
  }
  return puVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___sbh_alloc_block_from_page */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___sbh_alloc_block_from_page (param_1, param_2, param_3)

 {
  let pbVar1;
  let iVar2;
  let local_14;
  let local_10;
  let local_c;

  pbVar1 = s32(param_1, 0);
  if ((s32(param_1, 1) < param_3)) {
    local_c = pbVar1;
    if ((_MEM[pbVar1 + s32(param_1, 1)] !== 0)) {
      local_c = (pbVar1 + s32(param_1, 1));
    }
    while (((local_c + param_3) < (param_1 + 0x3e))) {
      if ((_MEM[local_c] === 0)) {
        local_14 = 1;
        local_10 = local_c;
        while ((_MEM[local_10 + 1] === 0)) {
          local_14 = (local_14 + 1);
        }
        if ((param_3 <= local_14)) {
          if (((local_c + param_3) < (param_1 + 0x3e))) {
            w32(param_1, 0, (local_c + param_3));
            w32(param_1, 1, (local_14 - param_3));
          }
          else {
            w32(param_1, 0, (param_1 + 2));
            w32(param_1, 1, 0);
          }
          _MEM[local_c] = ((param_3) & 0xFF);
          return ((local_c * 0x10 + param_1 * -15) + 0x80);
        }
        if ((pbVar1 === local_c)) {
          w32(param_1, 1, local_14);
        }
        else {
          param_2 = (param_2 - local_14);
          if ((param_2 < param_3)) {
            return 0;
          }
        }
        local_c = local_10;
      }
      else {
        local_c = (local_c + u8(_MEM[local_c]));
      }
    }
    local_c = (param_1 + 2);
    while (((local_c + param_3) <= (param_1 + 0xf7))) {
      if ((_MEM[local_c] === 0)) {
        local_14 = 1;
        local_10 = local_c;
        while ((_MEM[local_10 + 1] === 0)) {
          local_14 = (local_14 + 1);
        }
        if ((param_3 <= local_14)) {
          if (((local_c + param_3) < (param_1 + 0x3e))) {
            w32(param_1, 0, (local_c + param_3));
            w32(param_1, 1, (local_14 - param_3));
          }
          else {
            w32(param_1, 0, (param_1 + 2));
            w32(param_1, 1, 0);
          }
          _MEM[local_c] = ((param_3) & 0xFF);
          return ((local_c * 0x10 + param_1 * -15) + 0x80);
        }
        param_2 = (param_2 - local_14);
        if ((param_2 < param_3)) {
          return 0;
        }
        local_c = local_10;
      }
      else {
        local_c = (local_c + u8(_MEM[local_c]));
      }
    }
    iVar2 = 0;
  }
  else {
    _MEM[pbVar1] = ((param_3) & 0xFF);
    if (((pbVar1 + param_3) < (param_1 + 0x3e))) {
      w32(param_1, 0, (s32(param_1, 0) + param_3));
      w32(param_1, 1, (s32(param_1, 1) - param_3));
    }
    else {
      w32(param_1, 0, (param_1 + 2));
      w32(param_1, 1, 0);
    }
    iVar2 = ((pbVar1 * 0x10 + param_1 * -15) + 0x80);
  }
  return iVar2;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___sbh_resize_block */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___sbh_resize_block (param_1, param_2, param_3, param_4)

 {
  let bVar1;
  let uVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  local_14 = 0;
  bVar1 = _MEM[param_3];
  uVar2 = u8(bVar1);
  if ((param_4 < uVar2)) {
    _MEM[param_3] = ((param_4) & 0xFF);
    _MEM[((((param_2 - s32((param_1 + 0x810), 0)) >> 0xc) + 0x10) + param_1)] = ((_MEM[((((param_2 - s32((param_1 + 0x810), 0)) >> 0xc) + 0x10) + param_1)] - ((param_4) & 0xFF)) + bVar1);
    _MEM[((((param_2 - s32((param_1 + 0x810), 0)) >> 0xc) + 0x410) + param_1)] = 0xf1;
    local_14 = 1;
  }
  else if (((param_3 + param_4) <= (param_2 + 0x3e))) {
    local_18 = (param_3 + param_4);
    for (/* cond: (_MEM[local_10] === 0) */); (local_10 = (local_10 < local_18) && (local_10 = _MEM[local_10]));
        local_10 = (local_10 + 1)) {
    }
    if ((local_18 === local_10)) {
      _MEM[param_3] = ((param_4) & 0xFF);
      if ((s32(param_2, 0) < local_18)) {
        if ((local_18 < (param_2 + 0x3e))) {
          w32(param_2, 0, local_18);
          local_8 = 0;
          for (/* cond: (_MEM[local_18] === 0) */); local_18 = _MEM[local_18]; local_18 = (local_18 + 1)) {
            local_8 = (local_8 + 1);
          }
          w32(param_2, 1, local_8);
        }
        else {
          w32(param_2, 0, (param_2 + 2));
          w32(param_2, 1, 0);
        }
      }
      _MEM[((((param_2 - s32((param_1 + 0x810), 0)) >> 0xc) + 0x10) + param_1)] = ((_MEM[((((param_2 - s32((param_1 + 0x810), 0)) >> 0xc) + 0x10) + param_1)] - ((param_4) & 0xFF)) + bVar1);
      local_14 = 1;
    }
  }
  return local_14;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___sbh_heap_check */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___sbh_heap_check ()

 {
  let iVar1;
  let iVar2;
  let uVar3;
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

  local_c = 0;
  local_20 = PTR_LOOP_0063a438;
  do {
    if ((local_20 === PTR_LOOP_0063ac4c)) {
      local_c = (local_c + 1);
    }
    if ((s32(local_20, 0x204) !== 0)) {
      local_14 = 0;
      local_2c = 0;
      local_8 = s32(local_20, 0x204);
      for (/* cond: (local_14 < 0x400) */); local_14 = local_14; local_14 = (local_14 + 1)) {
        if ((_MEM[(local_14 + 0x10) + local_20] === 0xff)) {
          if ((s32(local_20, 3) !== local_14)) {
            return -1;
          }
          local_2c = (local_2c + 1);
        }
        else {
          if (((local_8 + 0x3e) <= s32(local_8, 0))) {
            return -2;
          }
          if ((((s32(local_8, 0x3e)) & 0xFF) !== 0xff)) {
            return -3;
          }
          local_18 = 0;
          local_10 = 0;
          local_28 = 0;
          local_24 = 0;
          while ((local_18 < 0xf0)) {
            if (((local_8 + (local_18 + 8)) === s32(local_8, 0))) {
              local_10 = (local_10 + 1);
            }
            if ((_MEM[((local_18 + 8) + local_8)] === 0)) {
              local_28 = (local_28 + 1);
              local_24 = (local_24 + 1);
              local_18 = (local_18 + 1);
            }
            else {
              if ((u8(_MEM[(local_14 + 0x410) + local_20]) <= local_24)) {
                return -4;
              }
              if ((local_10 === 1)) {
                if ((local_24 < s32(local_8, 1))) {
                  return -5;
                }
                local_10 = 2;
              }
              local_24 = 0;
              iVar2 = local_18;
              while ((local_1c < (u8(_MEM[((local_18 + 8) + local_8)]) + local_18))) {
                iVar1 = (iVar2 + 9);
                iVar2 = local_1c;
                if ((_MEM[(iVar1 + local_8)] !== 0)) {
                  return -6;
                }
              }
              local_18 = local_1c;
            }
          }
          if ((u8(_MEM[(local_14 + 0x10) + local_20]) !== local_28)) {
            return -7;
          }
          if ((local_10 === 0)) {
            return -8;
          }
        }
        local_8 = (local_8 + 0x400);
      }
    }
    local_20 = s32(local_20, 0);
    if ((local_20 === PTR_LOOP_0063a438)) {
      if ((local_c === 0)) {
        uVar3 = -9;
      }
      else {
        uVar3 = 0;
      }
      return uVar3;
    }
  } while ( true );
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __lseek */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __lseek (_FileHandle, _Offset, _Origin)

 {
  let DVar1;
  let hFile;
  let local_8;

  if (((_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 1) !== 0)) {
    hFile = __get_osfhandle(_FileHandle);
    if ((hFile === -1)) {
      wv(DAT_00639f14, 9);
      DVar1 = -1;
    }
    else {
      DVar1 = FUN_006e7ba8(hFile, _Offset, 0, _Origin);
      if ((DVar1 === -1)) {
        local_8 = FUN_006e7b00();
      }
      else {
        local_8 = 0;
      }
      if ((local_8 === 0)) {
        _MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] = (_MEM[((s32((DAT_006e69f0 + ((_FileHandle & -32) >> 3)), 0) + 4) + (_FileHandle & 0x1f) * 8)] & 0xfd);
      }
      else {
        __dosmaperr(local_8);
        DVar1 = -1;
      }
    }
  }
  else {
    wv(DAT_00639f14, 9);
    wv(DAT_00639f18, 0);
    DVar1 = -1;
  }
  return DVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___initstdio */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___initstdio ()

 {
  let local_8;

  if ((DAT_006e69e0 === 0)) {
    wv(DAT_006e69e0, 0x200);
  }
  else if ((DAT_006e69e0 < 0x14)) {
    wv(DAT_006e69e0, 0x14);
  }
  wv(DAT_006e5694, __calloc_dbg(DAT_006e69e0, 4, 2, 0x61e7fc, 0x84));
  if ((__calloc_dbg(DAT_006e69e0, 4, 2, 0x61e7fc, 0x84) === 0)) {
    wv(DAT_006e69e0, 0x14);
    wv(DAT_006e5694, __calloc_dbg(0x14, 4, 2, 0x61e7fc, 0x87));
    if ((__calloc_dbg(0x14, 4, 2, 0x61e7fc, 0x87) === 0)) {
      __amsg_exit(0x1a);
    }
  }
  for (/* cond: (local_8 < 0x14) */); local_8 = local_8; local_8 = (local_8 + 1)) {
    w32((DAT_006e5694 + local_8 * 4), 0, (PTR_DAT_0063ac58 + local_8 * 8));
  }
  for (/* cond: (local_8 < 3) */); local_8 = local_8; local_8 = (local_8 + 1)) {
    if ((s32((s32((DAT_006e69f0 + ((local_8 & -32) >> 3)), 0) + (local_8 & 0x1f) * 8), 0) === 0)) {
      w32((DAT_0063ac68 + local_8 * 0x20), 0, -1);
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___endstdio */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___endstdio ()

 {
  __flushall();
  if ((DAT_00639f54 !== 0)) {
    __fcloseall();
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __setdefaultprecision */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __setdefaultprecision ()

 {
  __controlfp(0x10000, 0x30000);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x005fe2a8)  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ms_p5_test_fdiv */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ms_p5_test_fdiv ()

 {
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ms_p5_mp_test_fdiv */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ms_p5_mp_test_fdiv ()

 {
  let hModule;
  let pFVar1;

  hModule = FUN_006e7bf8(0x61e83c);
  if ((pFVar1 !== 0)) {
    pFVar1 = pFVar1(0);
    return;
  }
  __ms_p5_test_fdiv();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __forcdecpt */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __forcdecpt (_Buf)

 {
  let cVar1;
  let iVar2;
  let local_10;
  let local_c;

  iVar2 = _tolower(s8(_MEM[_Buf]));
  if ((iVar2 !== 0x65)) {
    do {
      _Buf = (_Buf + 1);
      if ((DAT_0063a29c < 2)) {
        local_10 = (((s16((PTR_DAT_0063a090 + s8(_MEM[_Buf + 1]) * 2), 0)) & 0xFFFF) & 4);
      }
      else {
        local_10 = __isctype(s8(_MEM[_Buf + 1]), 4);
      }
    } while ((local_10 !== 0));
  }
  local_c = _MEM[_Buf];
  _MEM[_Buf] = DAT_0063a2a0;
  do {
    _Buf = (_Buf + 1);
    cVar1 = _MEM[_Buf + 1];
    _MEM[_Buf + 1] = local_c;
    local_c = cVar1;
  } while ((_MEM[_Buf + 1] !== 0));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cropzeros */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cropzeros (_Buf)

 {
  let pcVar1;
  let local_8;

  for (/* cond: (DAT_0063a2a0 !== _MEM[_Buf]) */); (_Buf = _MEM[_Buf] && (wv(DAT_0063a2a0, (DAT_0063a2a0 !== _MEM[_Buf])))); _Buf = (_Buf + 1)) {
  }
  if ((_MEM[_Buf] !== 0)) {
    do {
      pcVar1 = _Buf;
      _Buf = (pcVar1 + 1);
      if ((_MEM[pcVar1 + 1] === 0x65));
    local_8 = _Buf;
    for (/* cond: (_MEM[_Buf] === 0x30) */); _Buf = _MEM[_Buf]; _Buf = (_Buf + -1)) {
    }
    if ((DAT_0063a2a0 === _MEM[_Buf])) {
      _Buf = (_Buf + -1);
    }
    do {
      _Buf = (_Buf + 1);
      _MEM[_Buf + 1] = _MEM[local_8];
      local_8 = (local_8 + 1);
    } while ((_MEM[_Buf + 1] !== 0));
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __positive */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __positive (arg)

 {
  return u8((0 <= /* LOAD_8(arg) */));
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __fassign */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __fassign (flag, argument, number)

 {
  let local_10;
  let local_c;
  let local_8;

  if ((flag === 0)) {
    FID_conflict:__atodbl(DAT_fffffff0, number);
    w32(argument, 0, local_10);
  }
  else {
    FID_conflict:__atodbl(DAT_fffffff4, number);
    w32(argument, 0, local_c);
    w32((argument + 4), 0, local_8);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cftoe */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cftoe (unaff_EDI, _Value, _Buf, _SizeInBytes, _Dec, _Caps)

 {
  let puVar1;
  // unaff_EDI promoted to parameter;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_0063aef8 === 0)) {
    local_c = __fltout(s32(_Value, 0), s32((_Value + 4), 0));
    __fptostr((_Buf + (u8((s32(local_c, 0) === 0x2d)) + u8((0 < _SizeInBytes)))), (_SizeInBytes + 1), local_c, unaff_EDI);
  }
  else {
    local_c = DAT_006e54a4;
    __shift((_Buf + u8((s32(DAT_006e54a4, 0) === 0x2d))), (0 < _SizeInBytes));
  }
  local_8 = _Buf;
  if ((s32(local_c, 0) === 0x2d)) {
    _MEM[_Buf] = 0x2d;
    local_8 = (_Buf + 1);
  }
  if ((0 < _SizeInBytes)) {
    _MEM[local_8] = _MEM[local_8 + 1];
    local_8 = (local_8 + 1);
    _MEM[local_8 + 1] = DAT_0063a2a0;
  }
  puVar1 = FUN_005f22d0((local_8 + (u8((DAT_0063aef8 === 0)) + _SizeInBytes)), 0x61e850);
  if ((_Dec !== 0)) {
    _MEM[puVar1] = 0x45;
  }
  if ((_MEM[s32(local_c, 3)] !== 0x30)) {
    local_10 = (s32(local_c, 1) + -1);
    if ((local_10 < 0)) {
      local_10 = (-local_10);
      _MEM[puVar1 + 1] = 0x2d;
    }
    if ((0x63 < local_10)) {
      _MEM[puVar1 + 2] = ((((local_10 / 0x64 | 0)) & 0xFF) + _MEM[puVar1 + 2]);
      local_10 = (local_10 % 0x64);
    }
    if ((9 < local_10)) {
      _MEM[puVar1 + 3] = ((((local_10 / 0xa | 0)) & 0xFF) + _MEM[puVar1 + 3]);
      local_10 = (local_10 % 0xa);
    }
    _MEM[puVar1 + 4] = (_MEM[puVar1 + 4] + ((local_10) & 0xFF));
  }
  return _Buf;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cftof */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cftof (unaff_EDI, _Value, _Buf, _SizeInBytes, _Dec)

 {
  let iVar1;
  let sVar2;
  // unaff_EDI promoted to parameter;
  let local_c;
  let local_8;

  if ((DAT_0063aef8 === 0)) {
    local_c = __fltout(s32(_Value, 0), s32((_Value + 4), 0));
    __fptostr((_Buf + u8((s32(local_c, 0) === 0x2d))), (s32(local_c, 1) + _SizeInBytes), local_c, unaff_EDI);
  }
  else {
    local_c = DAT_006e54a4;
    if ((_SizeInBytes === DAT_0063aefc)) {
      iVar1 = (DAT_0063aefc + u8((s32(DAT_006e54a4, 0) === 0x2d)));
      _MEM[_Buf + iVar1] = 0x30;
      _MEM[(_Buf + iVar1) + 1] = 0;
    }
  }
  local_8 = _Buf;
  if ((s32(local_c, 0) === 0x2d)) {
    _MEM[_Buf] = 0x2d;
    local_8 = (_Buf + 1);
  }
  if ((s32(local_c, 1) < 1)) {
    __shift(local_8, 1);
    _MEM[local_8] = 0x30;
    local_8 = (local_8 + 1);
  }
  else {
    local_8 = (local_8 + s32(local_c, 1));
  }
  if ((0 < _SizeInBytes)) {
    __shift(local_8, 1);
    _MEM[local_8] = DAT_0063a2a0;
    if ((s32(local_c, 1) < 0)) {
      if ((DAT_0063aef8 === 0)) {
        sVar2 = (-s32(local_c, 1));
        if ((_SizeInBytes <= (-s32(local_c, 1)))) {
          sVar2 = _SizeInBytes;
        }
      }
      else {
        sVar2 = (-s32(local_c, 1));
      }
      _SizeInBytes = sVar2;
      __shift((local_8 + 1), _SizeInBytes);
      _memset((local_8 + 1), 0x30, _SizeInBytes);
    }
  }
  return _Buf;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cftog */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cftog (unaff_EDI, param_1, param_2, param_3, param_4)

 {
  let _Buf;
  // unaff_EDI promoted to parameter;
  let local_8;

  wv(DAT_006e54a4, __fltout(s32(param_1, 0), s32(param_1, 1)));
  wv(DAT_0063aefc, (s32(__fltout(s32(param_1, 0), s32(param_1, 1)), 1) + -1));
  _Buf = (u8((s32(__fltout(s32(param_1, 0), s32(param_1, 1)), 0) === 0x2d)) + param_2);
  __fptostr(_Buf, param_3, __fltout(s32(param_1, 0), s32(param_1, 1)), unaff_EDI);
  wv(DAT_0063af00, ((s32(__fltout(s32(param_1, 0), s32(param_1, 1)), 1) + -1) < (s32(__fltout(s32(param_1, 0), s32(param_1, 1)), 1) + -1)));
  wv(DAT_0063aefc, (s32(__fltout(s32(param_1, 0), s32(param_1, 1)), 1) + -1));
  if ((param_3 <= (s32(__fltout(s32(param_1, 0), s32(param_1, 1)), 1) + -1))) {
    __cftoe_g(param_1, param_2, param_3, param_4);
  }
  else {
    if (((s32(__fltout(s32(param_1, 0), s32(param_1, 1)), 1) + -1) < (s32(__fltout(s32(param_1, 0), s32(param_1, 1)), 1) + -1))) {
      do {
        local_8 = _Buf;
        _Buf = (local_8 + 1);
      } while ((_MEM[local_8] !== 0));
      _MEM[local_8 + -1] = 0;
    }
    __cftof_g(param_1, param_2, param_3);
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cftoe_g */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cftoe_g (unaff_EDI, param_1, param_2, param_3, param_4)

 {
  let eVar1;
  // unaff_EDI promoted to parameter;

  wv(DAT_0063aef8, 1);
  eVar1 = __cftoe(param_1, param_2, param_3, param_4, unaff_EDI);
  wv(DAT_0063aef8, 0);
  return eVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cftof_g */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cftof_g (unaff_EDI, param_1, param_2, param_3)

 {
  let eVar1;
  // unaff_EDI promoted to parameter;

  wv(DAT_0063aef8, 1);
  eVar1 = __cftof(param_1, param_2, param_3, unaff_EDI);
  wv(DAT_0063aef8, 0);
  return eVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __cfltcvt */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __cfltcvt (unaff_EDI, arg, buffer, sizeInBytes, format, precision, caps)

 {
  let eVar1;
  // unaff_EDI promoted to parameter;

  if ((sizeInBytes === 0x45)) {
    eVar1 = __cftoe(arg, buffer, format, precision, unaff_EDI);
  }
  else if ((sizeInBytes === 0x66)) {
    eVar1 = __cftof(arg, buffer, format, unaff_EDI);
  }
  else {
    eVar1 = __cftog(arg, buffer, format, precision);
  }
  return eVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __shift */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __shift (param_1, param_2)

 {
  let sVar1;

  if ((param_2 !== 0)) {
    sVar1 = _strlen(param_1);
    FID_conflict:_memcpy((param_1 + param_2), param_1, (sVar1 + 1));
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __XcptFilter */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __XcptFilter (_ExceptionNum, _ExceptionPtr)

 {
  let pcVar1;
  let uVar2;
  let uVar3;
  let piVar4;
  let iVar5;
  let local_14;

  piVar4 = xcptlookup(_ExceptionNum);
  uVar3 = DAT_0063af90;
  if ((s32(piVar4, 2) === 0)) {
    iVar5 = FUN_006e7ba4(_ExceptionPtr);
  }
  else if ((s32(piVar4, 2) === 5)) {
    w32(piVar4, 2, 0);
    iVar5 = 1;
  }
  else if ((s32(piVar4, 2) === 1)) {
    iVar5 = -1;
    wv(DAT_0063af90, uVar3);
  }
  else {
    pcVar1 = s32(piVar4, 2);
    wv(DAT_0063af90, _ExceptionPtr);
    if ((s32(piVar4, 1) === 8)) {
      for (/* cond: (local_14 < (DAT_0063af84 + DAT_0063af80)) */); uVar2 = DAT_0063af8c, local_14 = (local_14 < (DAT_0063af84 + DAT_0063af80));
          local_14 = (local_14 + 1)) {
        w32((local_14 * 0xc + 0x63af10), 0, 0);
      }
      if ((s32(piVar4, 0) === -0x3fffff72)) {
        wv(DAT_0063af8c, 0x83);
      }
      else if ((s32(piVar4, 0) === -0x3fffff70)) {
        wv(DAT_0063af8c, 0x81);
      }
      else if ((s32(piVar4, 0) === -0x3fffff6f)) {
        wv(DAT_0063af8c, 0x84);
      }
      else if ((s32(piVar4, 0) === -0x3fffff6d)) {
        wv(DAT_0063af8c, 0x85);
      }
      else if ((s32(piVar4, 0) === -0x3fffff73)) {
        wv(DAT_0063af8c, 0x82);
      }
      else if ((s32(piVar4, 0) === -0x3fffff71)) {
        wv(DAT_0063af8c, 0x86);
      }
      else if ((s32(piVar4, 0) === -0x3fffff6e)) {
        wv(DAT_0063af8c, 0x8a);
      }
      pcVar1 = pcVar1(8, DAT_0063af8c);
      wv(DAT_0063af8c, uVar2);
    }
    else {
      w32(piVar4, 2, 0);
      pcVar1 = pcVar1(s32(piVar4, 1));
    }
    iVar5 = -1;
    wv(DAT_0063af90, uVar3);
  }
  return iVar5;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _xcptlookup */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function xcptlookup (param_1)

 {
  let local_8;

  local_8 = DAT_0063af08;
  do {
    if ((s32(local_8, 0) === param_1));
  } while ((local_8 < (DAT_0063af08 + DAT_0063af88 * 3)));
  if ((s32(local_8, 0) !== param_1)) {
    local_8 = 0;
  }
  return local_8;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbkalnum */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbkalnum (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0, 1);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbkprint */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbkprint (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0, 3);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbkpunct */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbkpunct (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0, 2);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbalnum */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbalnum (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0x107, 1);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbalpha */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbalpha (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0x103, 1);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbgraph */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbgraph (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0x117, 3);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbprint */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbprint (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0x157, 3);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbpunct */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbpunct (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0x10, 2);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbblead */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbblead (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0, 4);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbtrail */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbtrail (_C)

 {
  let iVar1;

  iVar1 = x_ismbbtype(_C, 0, 8);
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __ismbbkana */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __ismbbkana (_C)

 {
  let iVar1;

  if ((iVar1 !== 0)) {
    return 1;
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _x_ismbbtype */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function x_ismbbtype (param_1, param_2, param_3)

 {
  let local_8;

  if (((param_3 & _MEM[DAT_0063afa1 + u8(param_1)]) === 0)) {
    if ((param_2 === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = (((s16((DAT_0063a09a + u8(param_1) * 2), 0)) & 0xFFFF) & param_2);
    }
    if ((local_8 === 0)) {
      return 0;
    }
  }
  return 1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __setenvp */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __setenvp ()

 {
  let sVar1;
  let iVar2;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  for (/* cond: (_MEM[local_8] !== 0) */); local_8 = _MEM[local_8]; local_8 = (local_8 + (sVar1 + 1))) {
    if ((_MEM[local_8] !== 0x3d)) {
      local_c = (local_c + 1);
    }
    sVar1 = _strlen(local_8);
  }
  local_10 = __malloc_dbg((local_c * 4 + 4), 2, 0x61e858, 0x55);
  wv(DAT_00639f3c, local_10);
  if ((local_10 === 0)) {
    __amsg_exit(9);
  }
  for (/* cond: (_MEM[local_8] !== 0) */); local_8 = _MEM[local_8]; local_8 = (local_8 + (sVar1 + 1))) {
    sVar1 = _strlen(local_8);
    if ((_MEM[local_8] !== 0x3d)) {
      iVar2 = __malloc_dbg((sVar1 + 1), 2, 0x61e858, 0x61);
      w32(local_10, 0, iVar2);
      if ((s32(local_10, 0) === 0)) {
        __amsg_exit(9);
      }
      FUN_005f22d0(s32(local_10, 0), local_8);
      local_10 = (local_10 + 1);
    }
  }
  __free_dbg(DAT_00639fc0, 2);
  wv(DAT_00639fc0, 0);
  w32(local_10, 0, 0);
  return local_10;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */
 /* address  */ /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __setargv */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __setargv ()

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_006e7b1c(0, DAT_006e54a8, 0x104);
  wv(DAT_00639f4c, DAT_006e54a8);
  if ((_MEM[DAT_006e6b3c] === 0)) {
    local_14 = DAT_006e54a8;
  }
  else {
    local_14 = DAT_006e6b3c;
  }
  parse_cmdline(local_14, 0, 0, DAT_fffffff0, DAT_fffffff8);
  local_c = __malloc_dbg((local_10 * 4 + local_8), 2, 0x61e864, 0x75);
  if ((local_c === 0)) {
    __amsg_exit(8);
  }
  parse_cmdline(local_14, local_c, (local_10 * 4 + local_c), DAT_fffffff0, DAT_fffffff8);
  _DAT_00639f30 = (local_10 + -1);
  _DAT_00639f34 = local_c;
  return local_c;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _parse_cmdline */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function parse_cmdline (param_1, param_2, param_3, param_4, param_5)

 {
  let pbVar1;
  let bVar2;
  let bVar3;
  let bVar4;
  let local_14;
  let local_8;

  w32(param_5, 0, 0);
  w32(param_4, 0, 1);
  local_8 = param_1;
  if ((param_2 !== 0)) {
    w32(param_2, 0, param_3);
    param_2 = (param_2 + 1);
  }
  if ((_MEM[param_1] === 0x22)) {
    while ((_MEM[local_8 + 1] !== 0)) {
      if ((param_3 !== 0)) {
        _MEM[param_3] = _MEM[local_8 + 1];
        param_3 = (param_3 + 1);
        pbVar1 = (local_8 + 2);
      }
      local_8 = pbVar1;
      w32(param_5, 0, (s32(param_5, 0) + 1));
      if ((param_3 !== 0)) {
        _MEM[param_3] = _MEM[local_8];
        param_3 = (param_3 + 1);
      }
    }
    w32(param_5, 0, (s32(param_5, 0) + 1));
    if ((param_3 !== 0)) {
      _MEM[param_3] = 0;
      param_3 = (param_3 + 1);
    }
    if ((_MEM[local_8 + 1] === 0x22)) {
      pbVar1 = (local_8 + 2);
    }
  }
  else {
    do {
      w32(param_5, 0, (s32(param_5, 0) + 1));
      if ((param_3 !== 0)) {
        _MEM[param_3] = _MEM[local_8];
        param_3 = (param_3 + 1);
      }
      bVar2 = _MEM[local_8];
      pbVar1 = (local_8 + 1);
      if (((_MEM[DAT_0063afa1 + u8(bVar2)] & 4) !== 0)) {
        w32(param_5, 0, (s32(param_5, 0) + 1));
        if ((param_3 !== 0)) {
          _MEM[param_3] = _MEM[local_8 + 1];
          param_3 = (param_3 + 1);
        }
        pbVar1 = (local_8 + 2);
      }
      local_8 = pbVar1;
    } while ((bVar2 !== 9));
    if ((bVar2 === 0)) {
      pbVar1 = (local_8 + -1);
    }
    else {
      pbVar1 = local_8;
      if ((param_3 !== 0)) {
        _MEM[param_3 + -1] = 0;
      }
    }
  }
  local_8 = pbVar1;
  bVar3 = 0;
  while ((_MEM[local_8] === 0)) {
    if ((_MEM[local_8] !== 0)) {
      for (/* cond: (_MEM[local_8] === 9) */); (local_8 = _MEM[local_8] || (local_8 = _MEM[local_8])); local_8 = (local_8 + 1)) {
      }
    }
    if ((_MEM[local_8] === 0)) {
      w32(param_2, 0, param_3);
      param_2 = (param_2 + 1);
    }
    w32(param_4, 0, (s32(param_4, 0) + 1));
    while ((_MEM[local_8] === 9)) {
      bVar4 = 1;
      local_14 = 0;
      for (/* cond: (_MEM[local_8] === 0x5c) */); local_8 = _MEM[local_8]; local_8 = (local_8 + 1)) {
        local_14 = (local_14 + 1);
      }
      if ((_MEM[local_8] === 0x22)) {
        if (((local_14 & 1) === 0)) {
          if (bVar3) {
            bVar4 = (_MEM[local_8 + 1] === 0x22);
            if (bVar4) {
              local_8 = (local_8 + 1);
            }
          }
          else {
            bVar4 = 0;
          }
          if (bVar3) {
            bVar3 = 0;
          }
          else {
            bVar3 = 1;
          }
        }
        local_14 = (local_14 >>> 1);
      }
      while ((local_14 !== 0)) {
        if ((param_3 !== 0)) {
          _MEM[param_3] = 0x5c;
          param_3 = (param_3 + 1);
        }
        w32(param_5, 0, (s32(param_5, 0) + 1));
        local_14 = (local_14 - 1);
      }
      if ((_MEM[local_8] === 9)) {
        if ((param_3 === 0)) {
          if (((_MEM[DAT_0063afa1 + u8(_MEM[local_8])] & 4) !== 0)) {
            local_8 = (local_8 + 1);
            w32(param_5, 0, (s32(param_5, 0) + 1));
          }
        }
        else {
          if (((_MEM[DAT_0063afa1 + u8(_MEM[local_8])] & 4) !== 0)) {
            _MEM[param_3] = _MEM[local_8];
            local_8 = (local_8 + 1);
            param_3 = (param_3 + 1);
            w32(param_5, 0, (s32(param_5, 0) + 1));
          }
          _MEM[param_3] = _MEM[local_8];
          param_3 = (param_3 + 1);
        }
        w32(param_5, 0, (s32(param_5, 0) + 1));
      }
      local_8 = (local_8 + 1);
    }
    if ((param_3 !== 0)) {
      _MEM[param_3] = 0;
      param_3 = (param_3 + 1);
    }
    w32(param_5, 0, (s32(param_5, 0) + 1));
  }
  if ((param_2 !== 0)) {
    w32(param_2, 0, 0);
  }
  w32(param_4, 0, (s32(param_4, 0) + 1));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtGetEnvironmentStringsW */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtGetEnvironmentStringsW (in_EAX)

 {
  let pWVar1;
  // in_EAX promoted to parameter;
  let sVar2;
  let iVar3;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  local_18 = 0;
  local_10 = 0;
  if ((DAT_0063af94 === 0)) {
    in_EAX = FUN_006e7b88();
    if ((in_EAX === 0)) {
      in_EAX = FUN_006e7b90();
      if ((in_EAX === 0)) {
        return 0;
      }
      wv(DAT_0063af94, 2);
      local_18 = in_EAX;
    }
    else {
      wv(DAT_0063af94, 1);
      local_18 = in_EAX;
    }
  }
  if ((DAT_0063af94 === 1)) {
    if ((local_18 === 0)) {
      in_EAX = 0;
    }
    else {
      local_14 = local_18;
      pWVar1 = local_14;
      while ((s16(local_14, 0) !== 0)) {
        pWVar1 = (local_14 + 1);
        if ((s16(local_14, 1) === 0)) {
          pWVar1 = (local_14 + 2);
        }
      }
      sVar2 = (local_14 + (2 - local_18));
      in_EAX = __malloc_dbg(sVar2, 2, 0x61e870, 0x57);
      if ((in_EAX === 0)) {
        FUN_006e7b8c(local_18);
        in_EAX = 0;
      }
      else {
        FID_conflict:_memcpy(in_EAX, local_18, sVar2);
        FUN_006e7b8c(local_18);
      }
    }
  }
  else if ((DAT_0063af94 === 2)) {
    if ((local_18 === 0)) {
      in_EAX = 0;
    }
    else {
      for (/* cond: (((s16(local_c, 0)) & 0xFF) !== 0) */); local_c = s16(local_c, 0); local_c = (local_c + (sVar2 + 1)))
      {
        iVar3 = FUN_006e7c58(DAT_0063a088, 1, local_c, -1, 0, 0);
        if ((iVar3 === 0)) {
          return 0;
        }
        local_10 = (local_10 + iVar3);
        sVar2 = _strlen(local_c);
      }
      in_EAX = __malloc_dbg((local_10 + 1) * 2, 2, 0x61e870, 0x87);
      if ((in_EAX === 0)) {
        FUN_006e7b94(local_18);
        in_EAX = 0;
      }
      else {
        local_c = local_18;
        local_14 = in_EAX;
        while ((((s16(local_c, 0)) & 0xFF) !== 0)) {
          iVar3 = FUN_006e7c58(DAT_0063a088, 1, local_c, -1, local_14, ((local_10 + 1) - ((local_14 - in_EAX) >> 1)));
          if ((iVar3 === 0)) {
            __free_dbg(in_EAX, 2);
            FUN_006e7b94(local_18);
            return 0;
          }
          sVar2 = _strlen(local_c);
          local_c = (local_c + (sVar2 + 1));
          sVar2 = _wcslen(local_14);
          local_14 = (local_14 + (sVar2 + 1));
        }
        w16(local_14, 0, 0);
        FUN_006e7b94(local_18);
      }
    }
  }
  return in_EAX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___crtGetEnvironmentStringsA */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___crtGetEnvironmentStringsA ()

 {
  let pcVar1;
  let pWVar2;
  let iVar3;
  let cbMultiByte;
  let _Dst;
  let local_1c;
  let local_18;
  let local_10;
  let local_c;

  local_18 = 0;
  local_1c = 0;
  if ((DAT_0063af98 === 0)) {
    local_18 = FUN_006e7b88();
    if ((local_18 === 0)) {
      local_1c = FUN_006e7b90();
      if ((local_1c === 0)) {
        return 0;
      }
      wv(DAT_0063af98, 2);
    }
    else {
      wv(DAT_0063af98, 1);
    }
  }
  if ((DAT_0063af98 === 1)) {
    if ((local_18 === 0)) {
      _Dst = 0;
    }
    else {
      local_c = local_18;
      pWVar2 = local_c;
      while ((s16(local_c, 0) !== 0)) {
        pWVar2 = (local_c + 1);
        if ((s16(local_c, 1) === 0)) {
          pWVar2 = (local_c + 2);
        }
      }
      iVar3 = (((local_c - local_18) >> 1) + 1);
      cbMultiByte = FUN_006e7ba0(0, 0, local_18, iVar3, 0, 0, 0, 0);
      if ((local_1c === 0)) {
        FUN_006e7b8c(local_18);
        _Dst = 0;
      }
      else {
        iVar3 = FUN_006e7ba0(0, 0, local_18, iVar3, local_1c, cbMultiByte, 0, 0)
        ;
        if ((iVar3 === 0)) {
          __free_dbg(local_1c, 2);
          local_1c = 0;
        }
        FUN_006e7b8c(local_18);
        _Dst = local_1c;
      }
    }
  }
  else if ((DAT_0063af98 === 2)) {
    if ((local_1c === 0)) {
      _Dst = 0;
    }
    else {
      local_10 = local_1c;
      pcVar1 = local_10;
      while ((_MEM[local_10] !== 0)) {
        pcVar1 = (local_10 + 1);
        if ((_MEM[local_10 + 1] === 0)) {
          pcVar1 = (local_10 + 2);
        }
      }
      _Dst = __malloc_dbg((local_10 + (1 - local_1c)), 2, 0x61e870, 0x126);
      if ((_Dst === 0)) {
        FUN_006e7b94(local_1c);
        _Dst = 0;
      }
      else {
        FID_conflict:_memcpy(_Dst, local_1c, (local_10 + (1 - local_1c)));
        FUN_006e7b94(local_1c);
      }
    }
  }
  else {
    _Dst = 0;
  }
  return _Dst;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __setmbcp */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __setmbcp (_CodePage)

 {
  let CodePage;
  let iVar1;
  let BVar2;
  let local_2c;
  let local_28;
  let local_24;
  let local_10;
  let local_c;
  let local_8;

  CodePage = getSystemCP(_CodePage);
  if ((CodePage === DAT_0063b0a4)) {
    iVar1 = 0;
  }
  else if ((CodePage === 0)) {
    setSBCS();
    iVar1 = 0;
  }
  else {
    for (/* cond: (local_8 < 5) */); local_8 = (local_8 < 5); local_8 = (local_8 + 1)) {
      if ((s32((DAT_0063b0c8 + local_8 * 0x30), 0) === CodePage)) {
        for (/* cond: (local_28 < 0x101) */); local_28 = (local_28 < 0x101); local_28 = (local_28 + 1)) {
          _MEM[DAT_0063afa0 + local_28] = 0;
        }
        for (/* cond: (local_10 < 4) */); local_10 = (local_10 < 4); local_10 = (local_10 + 1)) {
          for (/* cond: (_MEM[local_c + 1] !== 0) */);
              (local_c = _MEM[local_c] && (local_c = (local_c + 1))); local_c = (local_c + 2)) {
            for (/* cond: (local_28 <= u8(_MEM[local_c + 1])) */); local_28 = (local_28 <= u8(_MEM[local_c + 1])); local_28 = (local_28 + 1)) {
              _MEM[DAT_0063afa1 + local_28] = (_MEM[DAT_0063afa1 + local_28] | _MEM[DAT_0063b0c0 + local_10]);
            }
          }
        }
        wv(DAT_0063b0a4, CodePage);
        wv(DAT_0063b0a8, _CPtoLCID(CodePage));
        for (/* cond: (local_10 < 6) */); local_10 = (local_10 < 6); local_10 = (local_10 + 1)) {
          w16((DAT_0063b0b0 + local_10 * 2), 0, s16((DAT_0063b0cc + (local_10 * 2 + local_8 * 0x30)), 0));
        }
        return 0;
      }
    }
    BVar2 = FUN_006e7b84(CodePage, DAT_ffffffdc);
    if ((BVar2 === 1)) {
      for (/* cond: (local_28 < 0x101) */); local_28 = (local_28 < 0x101); local_28 = (local_28 + 1)) {
        _MEM[DAT_0063afa0 + local_28] = 0;
      }
      if ((UNNAMED < 2)) {
        wv(DAT_0063b0a4, 0);
        wv(DAT_0063b0a8, 0);
      }
      else {
        for (/* cond: (_MEM[local_2c + 1] !== 0) */); (local_2c = _MEM[local_2c] && (local_2c = (local_2c + 1)));
            local_2c = (local_2c + 2)) {
          for (/* cond: (local_28 <= u8(_MEM[local_2c + 1])) */); local_28 = (local_28 <= u8(_MEM[local_2c + 1])); local_28 = (local_28 + 1)) {
            _MEM[DAT_0063afa1 + local_28] = (_MEM[DAT_0063afa1 + local_28] | 4);
          }
        }
        for (/* cond: (local_28 < 0xff) */); local_28 = (local_28 < 0xff); local_28 = (local_28 + 1)) {
          _MEM[DAT_0063afa1 + local_28] = (_MEM[DAT_0063afa1 + local_28] | 8);
        }
        wv(DAT_0063b0a4, CodePage);
        wv(DAT_0063b0a8, _CPtoLCID(CodePage));
      }
      for (/* cond: (local_10 < 6) */); local_10 = (local_10 < 6); local_10 = (local_10 + 1)) {
        w16((DAT_0063b0b0 + local_10 * 2), 0, 0);
      }
      iVar1 = 0;
    }
    else if ((DAT_0063b0bc === 0)) {
      iVar1 = -1;
    }
    else {
      setSBCS();
      iVar1 = 0;
    }
  }
  return iVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _getSystemCP */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function getSystemCP (param_1)

 {
  wv(DAT_0063b0bc, 0);
  if ((param_1 === -2)) {
    wv(DAT_0063b0bc, 1);
    param_1 = FUN_006e7b48();
  }
  else if ((param_1 === -3)) {
    wv(DAT_0063b0bc, 1);
    param_1 = FUN_006e7b4c();
  }
  else if ((param_1 === -4)) {
    wv(DAT_0063b0bc, 1);
    param_1 = DAT_0063a088;
  }
  return param_1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _CPtoLCID */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function _CPtoLCID (param_1)

 {
  let uVar1;

  /* switch */ () {
  case 0x3a4 :
    uVar1 = 0x411;
    break;
  default :
    uVar1 = 0;
    break;
  case 0x3a8 :
    uVar1 = 0x804;
    break;
  case 0x3b5 :
    uVar1 = 0x412;
    break;
  case 0x3b6 :
    uVar1 = 0x404;
  }
  return uVar1;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* _setSBCS */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function setSBCS ()

 {
  let local_8;

  for (/* cond: (local_8 < 0x101) */); local_8 = (local_8 < 0x101); local_8 = (local_8 + 1)) {
    _MEM[DAT_0063afa0 + local_8] = 0;
  }
  wv(DAT_0063b0a4, 0);
  wv(DAT_0063b0a8, 0);
  for (/* cond: (local_8 < 6) */); local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
    w16((DAT_0063b0b0 + local_8 * 2), 0, 0);
  }
  return;
}


 export function FUN_005fffa0 ()

 {
  return DAT_0063b0a4;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* ___initmbctable */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ___initmbctable ()

 {
  __setmbcp(-3);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */
 /* __FF_MSGBANNER */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function __FF_MSGBANNER ()

 {
  if ((DAT_00639fd0 === 1)) {
    __NMSG_WRITE(0xfc);
    if ((DAT_0063b248 !== 0)) {
      wv(DAT_0063b248, DAT_0063b248());
    }
    __NMSG_WRITE(0xff);
  }
  return;
}
