// Block 0x005B0000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 242

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_005b02a5 ()

 {
  let iVar1;

  iVar1 = FUN_00418d60();
  if ((iVar1 === 0)) {
    FUN_0043c5f0();
    FUN_0043c5f0();
  }
  else if ((iVar1 === 1)) {
    FUN_0043c5f0();
    FUN_0040f380();
  }
  else if ((iVar1 === 2)) {
    FUN_0040f380();
    FUN_0043c5f0();
  }
  return;
}


 export function FUN_005b0373 (param_1)

 {
  let iVar1;
  let hWnd;
  let uVar2;
  let local_8;

  if ((param_1 === 0xc9)) {
    iVar1 = FUN_005af4ae();
    if ((iVar1 === 0)) {
      uVar2 = FUN_00418d60();
      w32((DAT_006a4f88 + 0x2ec), 0, uVar2);
      FUN_005af343();
      FUN_005b02a5();
      FUN_005af682();
    }
    else {
      FUN_00418d90(s32((DAT_006a4f88 + 0x2ec), 0));
      FUN_005af343();
      FUN_005af682();
      if ((DAT_006a4f88 === 0)) {
        local_8 = 0;
      }
      else {
        local_8 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_8);
      FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_00635fd8);
      FUN_0059d3c9(0);
      hWnd = FUN_00418770();
      FUN_006e7d94(hWnd);
    }
  }
  else if ((param_1 === 0xcd)) {
    FUN_005b02a5();
  }
  return;
}


 export function FUN_005b0473 (in_ECX, param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_2c;
  let local_24;
  let local_20;
  let local_14;

  iVar1 = (s32((DAT_00635df8 + param_1 * 8), 0) + s32((in_ECX + 0x124), 0));
  iVar2 = (s32((DAT_00635dfc + param_1 * 8), 0) + s32((in_ECX + 0x128), 0));
  if ((param_1 === 0)) {
    FUN_004086c0(DAT_ffffffec, (iVar1 + -15), iVar2, 0x82, (s32((in_ECX + 0x2e8), 0) << 3));
  }
  else {
    FUN_004086c0(DAT_ffffffec, (iVar1 + -30), iVar2, 0xa0, (s32((in_ECX + 0x2e8), 0) << 3));
  }
  iVar1 = DAT_006a1d80;
  wv(DAT_006a1d80, (DAT_006a1d80 + 1));
  if ((in_ECX === 0)) {
    local_2c = 0;
  }
  else {
    local_2c = (in_ECX + 0x48);
  }
  FUN_00418bf0(local_2c, iVar1, DAT_ffffffec);
  FUN_00418c70(DAT_006a4f90);
  FUN_00418dd0(LAB_0040326f);
  /* switch */ () {
  case 0 :
    for (/* cond: (local_20 < 0x3e) */); local_20 = (local_20 < 0x3e); local_20 = (local_20 + 1)) {
      uVar3 = FUN_00428b0c(s32((DAT_0064b1b8 + local_20 * 0x14), 0));
      FUN_00418ce0(uVar3);
    }
    break;
  case 1 :
  case 2 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7c4), 0));
    FUN_00418ce0(uVar3);
    for (/* cond: (local_24 < 0x64) */); local_24 = (local_24 < 0x64); local_24 = (local_24 + 1)) {
      uVar3 = FUN_00428b0c(s32((DAT_00627684 + local_24 * 0x10), 0));
      FUN_00418ce0(uVar3);
    }
    break;
  case 3 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x794), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x798), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7e0), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7e4), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7e8), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7ec), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7f0), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7f4), 0));
    FUN_00418ce0(uVar3);
    break;
  case 4 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7f8), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7fc), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x800), 0));
    FUN_00418ce0(uVar3);
  }
  return;
}


 export function FUN_005b08e8 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_24;
  let local_14;

  FUN_004086c0(DAT_ffffffec, (s32(DAT_00635e20, param_1 * 2) + s32((in_ECX + 0x124), 0)), (s32(DAT_00635e24, param_1 * 2) + s32((in_ECX + 0x128), 0)), 0x30, (s32((in_ECX + 0x2e8), 0) + 6));
  iVar1 = DAT_006a1d80;
  wv(DAT_006a1d80, (DAT_006a1d80 + 1));
  if ((in_ECX === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = (in_ECX + 0x48);
  }
  FUN_00418910(local_24, iVar1, DAT_ffffffec, DAT_00635fe0);
  FUN_004189c0(3);
  FUN_00418a00(LAB_00401019);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005b09dc (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_28;
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
  local_18 = (DAT_00641848 + s32((in_ECX + 0x2ec), 0) * 0x3c);
  uVar1 = FUN_00417f70();
  FUN_005a9abf(in_ECX, local_8, local_c, 0x40, 0x40, uVar1);
  FUN_005cef66(DAT_ffffffd8, in_ECX, 0, local_8, (local_c + 8));
  FUN_004ccb6a(in_ECX, local_8, local_c, 0x40, 0x40, 6);
  FUN_004ccb6a(in_ECX, (s32((in_ECX + 0x124), 0) + 0x79), (s32((in_ECX + 0x128), 0) + 0x4f), 0x14d, 0x47, 6);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  local_10 = ((s32((in_ECX + 0x124), 0) + (s32((in_ECX + 0x2d8), 0) / 2 | 0)) + 5);
  local_14 = (((DAT_00635e04 + s32((in_ECX + 0x128), 0)) + s32((in_ECX + 0x2e8), 0) * -2) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e9);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e00 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00635e04 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x7e);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e08 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00635e0c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1de);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e10 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00635e14 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1df);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e18 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((s32((in_ECX + 0x128), 0) + None) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e0);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e20 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00635e24 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e1);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e28 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00635e2c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e2);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e30 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((s32((in_ECX + 0x128), 0) + None) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e3);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e38 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00635e3c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e4);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e40 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00635e44 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e5);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e48 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00635e4c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e6);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e50 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00635e54 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e7);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00635e58 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00635e5c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e8);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  FUN_00408460();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005b1037 (in_ECX)

 {
  let pvVar1;
  let uVar2;
  let uVar3;
  let extraout_EAX;
  let iVar4;
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
  let local_48c;
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
  puStack_c = LAB_005b1a11;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  wv(DAT_006a1d7c, 1);
  wv(DAT_006a4f88, in_ECX);
  pvVar1 = operator_new(0x48);
  local_8 = 1;
  if ((pvVar1 === 0)) {
    local_468 = 0;
  }
  else {
    local_468 = FUN_005bd630();
  }
  local_8 = (UNNAMED << 8);
  wv(DAT_0062e018, local_468);
  FUN_00417ef0(0, DAT_0062e01c);
  FUN_005d268e(DAT_006a4f90);
  FUN_005d25a8(DAT_006a4f90);
  FUN_005d2550(0x29);
  FUN_005d2568(0x12, 1, 1);
  FUN_005d2590(0x25);
  w32((in_ECX + 0x2d8), 0, 0x230);
  w32((in_ECX + 0x2dc), 0, 0x17c);
  w32((in_ECX + 0x2ec), 0, 0);
  wv(DAT_006a1d80, 0xc9);
  FUN_005bf071(s_EDITORSA.GIF_00635fe4, 0xa, 0xc0, DAT_fffffbbc);
  uVar2 = FUN_0040ef70();
  w32((in_ECX + 0x2e8), 0, uVar2);
  uVar12 = 0;
  uVar11 = 0;
  uVar10 = 0;
  uVar2 = s32((in_ECX + 0x2dc), 0);
  uVar9 = s32((in_ECX + 0x2d8), 0);
  uVar8 = 0;
  uVar7 = 0;
  uVar6 = 0xd;
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x72c), 0), 0xd, 0, 0, uVar9, uVar2, 0, 0, 0);
  FUN_005534bc(uVar3, uVar6, uVar7, uVar8, uVar9, uVar2, uVar10, uVar11, uVar12);
  for (/* cond: (local_460 < 0xd) */); local_460 = (local_460 < 0xd); local_460 = (local_460 + 1)) {
    if ((s32((DAT_00635e60 + local_460 * 8), 0) === 9)) {
      FUN_005b08e8(s32((DAT_00635e64 + local_460 * 8), 0));
    }
    else if ((s32((DAT_00635e60 + local_460 * 8), 0) === 0xc)) {
      FUN_005b0473(s32((DAT_00635e64 + local_460 * 8), 0));
    }
  }
  wv(PTR_DAT_006359f0, PTR_DAT_006359f0);
  w32((in_ECX + 0x2e4), 0, (extraout_EAX + 8));
  w32((in_ECX + 0x2e0), 0, (((s32((in_ECX + 0x12c), 0) + -10) + (((s32((in_ECX + 0x12c), 0) + -10) >> 0x1f) & 3)) >> 2));
  iVar4 = ((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2e4), 0) + 2));
  iVar5 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar5 + 2), iVar4, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_474 = 0;
  }
  else {
    local_474 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_474, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00401767);
  iVar5 = ((iVar5 + 2) + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar5, iVar4, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_478 = 0;
  }
  else {
    local_478 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0xa8), 0));
  FUN_0040f680(local_478, 0x66, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00403210);
  iVar5 = (iVar5 + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar5, iVar4, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_47c = 0;
  }
  else {
    local_47c = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x8ec), 0));
  FUN_0040f680(local_47c, 0x66, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00403788);
  FUN_004086c0(DAT_fffffbac, (iVar5 + (s32((in_ECX + 0x2e0), 0) + 2)), iVar4, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_480 = 0;
  }
  else {
    local_480 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(local_480, 0x66, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00403c88);
  FUN_0040f840();
  iVar5 = FUN_004a6980();
  w32((in_ECX + 0x2e0), 0, (iVar5 + 0xd));
  wv(PTR_DAT_006359f0, PTR_DAT_006359f0);
  w32((in_ECX + 0x2e4), 0, (extraout_EAX_00 + 8));
  iVar4 = (s32((in_ECX + 0x124), 0) + 0x19);
  iVar5 = FUN_004bb540();
  iVar5 = ((iVar5 * 2 + s32((in_ECX + 0x128), 0)) + 0x28);
  FUN_004086c0(DAT_fffffbac, iVar4, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_484 = 0;
  }
  else {
    local_484 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7cc), 0));
  FUN_0040f680(local_484, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00402202);
  iVar5 = (iVar5 + (s32((in_ECX + 0x2e4), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar4, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_488 = 0;
  }
  else {
    local_488 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7d0), 0));
  FUN_0040f680(local_488, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_004029b4);
  FUN_004086c0(DAT_fffffbac, iVar4, (iVar5 + (s32((in_ECX + 0x2e4), 0) + 2)), s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_48c = 0;
  }
  else {
    local_48c = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7d4), 0));
  FUN_0040f680(local_48c, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00403a85);
  FUN_0040f350(0);
  _DAT_00635ef0 = (0x7f / u8(DAT_0064bcc8) | 0);
  _DAT_00635f00 = 0xc;
  FUN_005aef20();
  FUN_00418d90(s32((in_ECX + 0x2ec), 0));
  FUN_005af343();
  FUN_005b02a5();
  w32((in_ECX + 0x2f8), 0, 5);
  FUN_00408330(LAB_004019d8);
  in_ECX = EnableStackedTabs(in_ECX, 0x401e01);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006a1d7c !== 0)) {
    FUN_0040ef50();
  }
  if ((DAT_0062e018 !== 0)) {
    FUN_0040f010(1);
  }
  wv(DAT_0062e018, 0);
  w32((in_ECX + 0x2f8), 0, 0);
  local_8 = -1;
  FUN_005b1a05();
  FUN_005b1a1b();
  return;
}


 export function FUN_005b1a05 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_005b1a1b (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005b1a29 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005b1a8e;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00417fa0();
  local_8 = 0;
  FUN_005b1037();
  FUN_005bb574();
  local_8 = -1;
  FUN_005b1a82();
  FUN_005b1a98();
  return;
}


 export function FUN_005b1a82 ()

 {
  FUN_004183d0();
  return;
}


 export function FUN_005b1a98 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005b2590 (param_1)

 {
  let sVar1;
  let sVar2;
  let iVar3;
  let local_24;
  let local_14;
  let local_8;

  if ((0x801 < param_1)) {
    FUN_005dae6b(7, s_id_>=_0_&&_id_<_MAX_UNITS_+_2_0063607c, s_D:\Ss\Franklinton\Unit.cpp_00636060, 0x11);
  }
  local_8 = 1;
  if ((DAT_006ad918 === 0)) {
    iVar3 = FUN_005b50ad(param_1, 0xb);
    if ((0x7ff < iVar3)) {
      FUN_005d2279(s_Infinite_unit_stack_(id_=_%d)._R_0063609c, param_1);
      local_8 = 0;
      local_14 = param_1;
      sVar1 = s16((DAT_00656108 + param_1 * 0x20), 0);
      do {
        local_24 = ((sVar1) << 16 >> 16);
        if ((local_14 < 0));
        sVar2 = s16((DAT_006560f2 + local_14 * 0x20), 0);
        FUN_005b319e(local_14, 0);
        FUN_005b345f(local_14, ((sVar1) << 16 >> 16), ((sVar2) << 16 >> 16), 0);
        local_14 = local_24;
        sVar1 = s16((DAT_00656108 + local_24 * 0x20), 0);
      } while ((local_24 !== param_1));
    }
    local_24 = param_1;
    iVar3 = local_24;
    while ((0xffff < s16((DAT_00656106 + local_24 * 0x20), 0))) {
      iVar3 = ((s16((DAT_00656106 + local_24 * 0x20), 0)) << 16 >> 16);
      if ((s32((DAT_0065610a + ((s16((DAT_00656106 + local_24 * 0x20), 0)) << 16 >> 16) * 0x20), 0) === 0)) {
        FUN_005d2279(s_Dead_unit_in_unit_stack_(id_=_%d_006360c8, local_24);
        local_8 = 0;
        w16((DAT_00656106 + local_24 * 0x20), 0, 0xffff);
        if ((((s16((DAT_00656108 + iVar3 * 0x20), 0)) << 16 >> 16) === local_24)) {
          w16((DAT_00656108 + iVar3 * 0x20), 0, 0xffff);
        }
      }
    }
    local_24 = param_1;
    iVar3 = local_24;
    while ((0xffff < s16((DAT_00656108 + local_24 * 0x20), 0))) {
      iVar3 = ((s16((DAT_00656108 + local_24 * 0x20), 0)) << 16 >> 16);
      if ((s32((DAT_0065610a + local_24 * 0x20), 0) === 0)) {
        FUN_005d2279(s_Dead_unit_in_unit_stack_(id_=_%d_006360f8, local_24);
        local_8 = 0;
        w16((DAT_00656108 + local_24 * 0x20), 0, 0xffff);
        if ((((s16((DAT_00656106 + iVar3 * 0x20), 0)) << 16 >> 16) === local_24)) {
          w16((DAT_00656106 + iVar3 * 0x20), 0, 0xffff);
        }
      }
    }
    local_24 = param_1;
    iVar3 = local_24;
    while ((0xffff < s16((DAT_00656106 + local_24 * 0x20), 0))) {
      iVar3 = ((s16((DAT_00656106 + local_24 * 0x20), 0)) << 16 >> 16);
      if ((s16((DAT_006560f2 + ((s16((DAT_00656106 + local_24 * 0x20), 0)) << 16 >> 16) * 0x20), 0) !== s16((DAT_006560f2 + local_24 * 0x20), 0))) {
        FUN_005d2279(s_Crossed_locations_in_unit_stack_(_00636128, local_24);
        local_8 = 0;
        w16((DAT_00656106 + local_24 * 0x20), 0, 0xffff);
        if ((((s16((DAT_00656108 + iVar3 * 0x20), 0)) << 16 >> 16) === local_24)) {
          w16((DAT_00656108 + iVar3 * 0x20), 0, 0xffff);
        }
      }
    }
    local_24 = param_1;
    iVar3 = local_24;
    while ((0xffff < s16((DAT_00656108 + local_24 * 0x20), 0))) {
      iVar3 = ((s16((DAT_00656108 + local_24 * 0x20), 0)) << 16 >> 16);
      if ((s16((DAT_006560f2 + ((s16((DAT_00656108 + local_24 * 0x20), 0)) << 16 >> 16) * 0x20), 0) !== s16((DAT_006560f2 + local_24 * 0x20), 0))) {
        FUN_005d2279(s_Crossed_locations_in_unit_stack_(_00636160, local_24);
        local_8 = 0;
        w16((DAT_00656108 + local_24 * 0x20), 0, 0xffff);
        if ((((s16((DAT_00656106 + iVar3 * 0x20), 0)) << 16 >> 16) === local_24)) {
          w16((DAT_00656106 + iVar3 * 0x20), 0, 0xffff);
        }
      }
    }
  }
  else {
    local_8 = 1;
  }
  return local_8;
}


 export function FUN_005b29aa (param_1)

 {
  return s8(_MEM[DAT_0064b1c6 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]);
}


 export function FUN_005b29d7 (param_1)

 {
  let iVar1;

  if (((DAT_00655ae8 & 0x10) === 0)) {
    _MEM[DAT_006560fa + param_1 * 0x20] = 0;
  }
  iVar1 = FUN_005b29aa(param_1);
  iVar1 = (iVar1 - u8(_MEM[DAT_006560fa + param_1 * 0x20]));
  if ((iVar1 < 1)) {
    iVar1 = 0;
  }
  return iVar1;
}


 export function FUN_005b2a39 (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_14;
  let local_10;

  local_10 = s8(_MEM[DAT_0064b1c2 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]);
  if ((local_10 === 0)) {
    uVar3 = 0;
  }
  else {
    if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 2)) {
      iVar1 = s8(_MEM[DAT_006560f7 + param_1 * 0x20]);
      iVar2 = FUN_004bd9f0(iVar1, 0x3b);
      if ((iVar2 !== 0)) {
        local_10 = (local_10 + u8(DAT_0064bcc8));
      }
      iVar2 = FUN_00453e51(iVar1, 0xc);
      if ((iVar2 !== 0)) {
        local_10 = (local_10 + u8(DAT_0064bcc8) * 2);
      }
      iVar1 = FUN_00453e51(iVar1, 3);
      if (((_MEM[DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] & 0x20) === 0)) {
        local_10 = (local_10 + u8(DAT_0064bcc8));
      }
    }
    uVar3 = local_10;
    if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] !== 1)) {
      iVar1 = FUN_005b29aa(param_1);
      if ((iVar1 < 2)) {
        iVar1 = 1;
      }
      iVar2 = FUN_005b29d7(param_1);
      local_10 = (iVar2 * local_10 / iVar1 | 0);
      if (((local_10 % u8(DAT_0064bcc8)) !== 0)) {
        local_10 = (local_10 + (u8(DAT_0064bcc8) - (local_10 % u8(DAT_0064bcc8))));
      }
      if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 2)) {
        local_14 = u8(DAT_0064bcc8) * 2;
      }
      else {
        local_14 = u8(DAT_0064bcc8);
      }
      uVar3 = local_14;
      if ((local_14 <= local_10)) {
        uVar3 = local_10;
      }
    }
  }
  return uVar3;
}


 export function FUN_005b2c3d (param_1)

 {
  let iVar1;

  iVar1 = FUN_005b2a39(param_1);
  iVar1 = (iVar1 - u8(_MEM[DAT_006560f8 + param_1 * 0x20]));
  if ((iVar1 < 1)) {
    iVar1 = 0;
  }
  return iVar1;
}


 export function FUN_005b2c82 (param_1)

 {
  if ((-1 < param_1)) {
    FUN_005b2590(param_1);
    param_1 = ((s16((DAT_00656108 + param_1 * 0x20), 0)) << 16 >> 16);
  }
  return param_1;
}


 export function FUN_005b2cc3 (param_1)

 {
  if ((-1 < param_1)) {
    FUN_005b2590(param_1);
    for (/* cond: (((s16((DAT_00656108 + param_1 * 0x20), 0)) << 16 >> 16) !== param_1) */); (-1 = (0xffff < s16((DAT_00656108 + param_1 * 0x20), 0)) &&
           (wv(DAT_00656108, DAT_00656108)));
        param_1 = ((s16((DAT_00656108 + param_1 * 0x20), 0)) << 16 >> 16)) {
    }
  }
  return param_1;
}


 export function FUN_005b2d39 (param_1)

 {
  if ((-1 < param_1)) {
    FUN_005b2590(param_1);
    for (/* cond: (((s16((DAT_00656106 + param_1 * 0x20), 0)) << 16 >> 16) !== param_1) */); (-1 = (0xffff < s16((DAT_00656106 + param_1 * 0x20), 0)) &&
           (wv(DAT_00656106, DAT_00656106)));
        param_1 = ((s16((DAT_00656106 + param_1 * 0x20), 0)) << 16 >> 16)) {
    }
  }
  return param_1;
}


 export function FUN_005b2daf (param_1, param_2, param_3)

 {
  let uVar1;
  let local_c;
  let local_8;

  local_8 = -1;
  for (/* cond: (local_c < ((DAT_00655b16) << 16 >> 16)) */); (local_8 = (local_8 < 0) && (local_c = (local_c < ((DAT_00655b16) << 16 >> 16)))); local_c = (local_c + 1)) {
    if ((s8(_MEM[DAT_006560f7 + local_c * 0x20]) === param_1)) {
      local_8 = local_c;
    }
  }
  uVar1 = FUN_005b2d39(local_8);
  return uVar1;
}


 export function FUN_005b2e69 (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let local_c;
  let local_8;

  local_8 = -1;
  if ((-1 < iVar1)) {
    for (/* cond: (local_c < ((DAT_00655b16) << 16 >> 16)) */); (local_8 = (local_8 < 0) && (local_c = (local_c < ((DAT_00655b16) << 16 >> 16)))); local_c = (local_c + 1)) {
      if ((((s16((DAT_006560f2 + local_c * 0x20), 0)) << 16 >> 16) === param_2)) {
        local_8 = local_c;
      }
    }
    if ((-1 < local_8)) {
      FUN_005b2590(local_8);
    }
    uVar2 = FUN_005b2d39(local_8);
  }
  else {
    uVar2 = -1;
  }
  return uVar2;
}


 export function FUN_005b2f50 (param_1)

 {
  if ((_MEM[DAT_006560ff + param_1 * 0x20] !== 3)) {
    w16((DAT_00656102 + param_1 * 0x20), 0, 0xffff);
  }
  _MEM[DAT_006560ff + param_1 * 0x20] = 3;
  return;
}


 export function FUN_005b2f92 (param_1, param_2)

 {
  let local_c;
  let local_8;

  local_8 = -1;
  local_c = -1;
  for (/* cond: (-1 < param_1) */); (local_c = (local_c < 0) && (-1 = (-1 < param_1)));
      param_1 = FUN_005b2c82(param_1)) {
    local_8 = (local_8 + 1);
    if ((local_8 === param_2)) {
      local_c = param_1;
    }
  }
  return local_c;
}


 export function FUN_005b3007 (param_1)

 {
  let local_8;

  local_8 = -1;
  for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = ((s16((DAT_00656106 + param_1 * 0x20), 0)) << 16 >> 16)) {
    local_8 = (local_8 + 1);
  }
  return local_8;
}


 export function FUN_005b3046 (param_1, param_2, param_3)

 {
  let local_10;
  let local_c;
  let local_8;

  local_8 = -1;
  local_c = -1;
  for (/* cond: (-1 < local_10) */); (local_c = (local_c < 0) && (-1 = (-1 < local_10)));
      local_10 = FUN_005b2c82(local_10)) {
    if ((local_8 === param_2)) {
      local_c = local_10;
    }
  }
  return local_c;
}


 export function FUN_005b30e9 (param_1)

 {
  let local_8;

  local_8 = 0;
  for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1)) {
    local_8 = (local_8 + 1);
  }
  return local_8;
}


 export function FUN_005b3136 (param_1, param_2)

 {
  let local_8;

  local_8 = 0;
  for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1)) {
    if ((_MEM[DAT_006560f6 + param_1 * 0x20] === param_2)) {
      local_8 = (local_8 + 1);
    }
  }
  return local_8;
}


 export function FUN_005b319e (param_1, param_2)

 {
  let sVar1;
  let sVar2;
  let cVar3;
  let iVar4;
  let iVar5;

  wv(DAT_006ad8d8, 1);
  if ((cVar3 !== 0)) {
    sVar1 = s16((DAT_00656106 + param_1 * 0x20), 0);
    if ((0xffff < sVar1)) {
      w16((DAT_00656108 + ((s16((DAT_00656106 + param_1 * 0x20), 0)) << 16 >> 16) * 0x20), 0, s16((DAT_00656108 + param_1 * 0x20), 0));
    }
    sVar2 = s16((DAT_00656108 + param_1 * 0x20), 0);
    if ((0xffff < sVar2)) {
      w16((DAT_00656106 + ((s16((DAT_00656108 + param_1 * 0x20), 0)) << 16 >> 16) * 0x20), 0, s16((DAT_00656106 + param_1 * 0x20), 0));
    }
    w16((DAT_00656106 + param_1 * 0x20), 0, 0xffff);
    w16((DAT_00656108 + param_1 * 0x20), 0, 0xffff);
    if ((iVar4 !== 0)) {
      iVar4 = FUN_005b8931(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
      _MEM[(iVar4 + 1)] = (_MEM[(iVar4 + 1)] & 0xfe);
    }
    w16((DAT_006560f0 + param_1 * 0x20), 0, (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 4 + 4) * 0xffe7);
    w16((DAT_006560f2 + param_1 * 0x20), 0, (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 4 + 4) * 0xffe7);
    if ((param_2 !== 0)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
    }
    wv(DAT_006ad8d8, 0);
  }
  else {
    wv(DAT_006ad8d8, 0);
    wv(DAT_006c90e0, -2);
    FUN_0046b14d(0x3f, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    iVar4 = FUN_00421bb0();
    while (((iVar5 - iVar4) < 0xe10)) {
      FUN_0047e94e(1, 1);
    }
    if ((DAT_006c90e0 === -2)) {
      FUN_005d225b(s_Pick_Up_Unit:_Connection_to_serv_00636198);
      FUN_00410030(s_SERVERCONNECTTIME_006361c8, DAT_0063fc58, 0);
      wv(DAT_00628044, 0);
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
  }
  return;
}


 export function FUN_005b345f (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let iVar2;
  let iVar3;
  let local_14;

  wv(DAT_006ad8dc, 1);
  if ((cVar1 !== 0)) {
    iVar2 = FUN_005b2daf(s8(_MEM[DAT_006560f7 + param_1 * 0x20]), param_2, param_3);
    w16((DAT_006560f0 + param_1 * 0x20), 0, ((param_2) & 0xFFFF));
    w16((DAT_006560f2 + param_1 * 0x20), 0, ((param_3) & 0xFFFF));
    w16((DAT_00656106 + param_1 * 0x20), 0, 0xffff);
    w16((DAT_00656108 + param_1 * 0x20), 0, ((iVar2) & 0xFFFF));
    if ((iVar2 < 0)) {
      iVar2 = FUN_004087c0(param_2, param_3);
      if ((iVar2 !== 0)) {
        iVar2 = FUN_005b8931(param_2, param_3);
        _MEM[(iVar2 + 1)] = (_MEM[(iVar2 + 1)] | 1);
        local_14 = s8(_MEM[DAT_006560f7 + param_1 * 0x20]);
        if ((8 < local_14)) {
          local_14 = 0xf;
        }
        iVar2 = FUN_005b8931(param_2, param_3);
        _MEM[(iVar2 + 5)] = (_MEM[(iVar2 + 5)] & 0xf);
        _MEM[(iVar2 + 5)] = (_MEM[(iVar2 + 5)] | (((local_14 << 4)) & 0xFF));
      }
    }
    else {
      w16((DAT_00656106 + iVar2 * 0x20), 0, ((param_1) & 0xFFFF));
    }
    if ((param_4 !== 0)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
    }
    wv(DAT_006ad8dc, 0);
  }
  else {
    wv(DAT_006ad8dc, 0);
    wv(DAT_006c90e8, -2);
    FUN_0046b14d(0x41, 0, param_1, param_2, param_3, 0, 0, 0, 0, 0);
    iVar2 = FUN_00421bb0();
    while (((iVar3 - iVar2) < 0xe10)) {
      FUN_0047e94e(1, 1);
    }
    if ((DAT_006c90e8 === -2)) {
      FUN_005d225b(s_Put_Down_Unit:_Connection_to_ser_006361dc);
      FUN_00410030(s_SERVERCONNECTTIME_0063620c, DAT_0063fc58, 0);
      wv(DAT_00628044, 0);
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
  }
  return;
}


 export function FUN_005b36df (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let iVar2;
  let iVar3;

  wv(DAT_006ad8e4, 1);
  if ((cVar1 !== 0)) {
    FUN_005b319e(param_1, 0);
    FUN_005b345f(param_1, param_2, param_3, 0);
    if ((param_4 !== 0)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
    }
    wv(DAT_006ad8e4, 0);
  }
  else {
    wv(DAT_006ad8e4, 0);
    wv(DAT_006c90f8, -2);
    FUN_0046b14d(0x45, 0, param_1, param_2, param_3, 0, 0, 0, 0, 0);
    iVar2 = FUN_00421bb0();
    while (((iVar3 - iVar2) < 0xe10)) {
      FUN_0047e94e(1, 1);
    }
    if ((DAT_006c90f8 === -2)) {
      FUN_005d225b(s_Relocate_Unit:_Connection_to_ser_00636220);
      FUN_00410030(s_SERVERCONNECTTIME_00636250, DAT_0063fc58, 0);
      wv(DAT_00628044, 0);
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
  }
  return;
}


 export function FUN_005b3863 (param_1, param_2)

 {
  FUN_005b36df(param_1, ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16), param_2);
  return;
}


 export function FUN_005b389f (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let cVar3;
  let iVar4;
  let iVar5;
  let local_14;

  if ((0xffff < s16((DAT_00656108 + param_1 * 0x20), 0))) {
    wv(DAT_006ad8e0, 1);
    if ((cVar3 !== 0)) {
      if ((0xffff < s16((DAT_00656108 + param_1 * 0x20), 0))) {
        uVar1 = s16((DAT_006560f0 + param_1 * 0x20), 0);
        uVar2 = s16((DAT_006560f2 + param_1 * 0x20), 0);
        local_14 = FUN_005b2d39(param_1);
        if ((local_14 === param_1)) {
          local_14 = FUN_005b2c82(param_1);
        }
        FUN_005b319e(param_1, 0);
        iVar4 = FUN_005b2cc3(local_14);
        w16((DAT_00656108 + iVar4 * 0x20), 0, ((param_1) & 0xFFFF));
        w16((DAT_00656106 + param_1 * 0x20), 0, ((iVar4) & 0xFFFF));
        w16((DAT_00656108 + param_1 * 0x20), 0, 0xffff);
        w16((DAT_006560f0 + param_1 * 0x20), 0, uVar1);
        w16((DAT_006560f2 + param_1 * 0x20), 0, uVar2);
      }
      if ((param_2 !== 0)) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
      }
      wv(DAT_006ad8e0, 0);
    }
    else {
      wv(DAT_006ad8e0, 0);
      wv(DAT_006c90f0, -2);
      FUN_0046b14d(0x43, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
      iVar4 = FUN_00421bb0();
      while (((iVar5 - iVar4) < 0xe10)) {
        FUN_0047e94e(1, 1);
      }
      if ((DAT_006c90f0 === -2)) {
        FUN_005d225b(s_Move_To_Bottom:_Connection_to_se_00636264);
        FUN_00410030(s_SERVERCONNECTTIME_00636294, DAT_0063fc58, 0);
        wv(DAT_00628044, 0);
      }
      while ((DAT_006c8fa0 !== 0)) {
        FUN_0047e94e(1, 0);
      }
    }
  }
  return;
}


 export function FUN_005b3ae0 (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let local_8;

  local_8 = FUN_005b2d39(param_1);
  while ((-1 < local_8)) {
    iVar1 = FUN_005b2c82(local_8);
    FUN_005b36df(local_8, param_2, param_3, 0);
    local_8 = iVar1;
  }
  if ((param_4 !== 0)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  return;
}


 export function FUN_005b3b78 (param_1, param_2)

 {
  let sVar1;
  let sVar2;
  let iVar3;
  let local_10;

  local_10 = -1;
  if ((-1 < param_1)) {
    sVar1 = s16((DAT_006560f0 + param_1 * 0x20), 0);
    sVar2 = s16((DAT_006560f2 + param_1 * 0x20), 0);
    iVar3 = FUN_005b2d39(param_1);
    while ((-1 < param_1)) {
      iVar3 = FUN_005b2c82(param_1);
      if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 2)) {
        local_10 = param_1;
        FUN_005b36df(param_1, (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 4 + 4) * -75, (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 4 + 4) * -75, param_2);
      }
    }
    if ((-1 < local_10)) {
      param_1 = FUN_005b2d39(local_10);
      while ((-1 < param_1)) {
        iVar3 = FUN_005b2c82(param_1);
        FUN_005b36df(param_1, ((sVar1) << 16 >> 16), ((sVar2) << 16 >> 16), param_2);
        param_1 = iVar3;
      }
    }
  }
  return;
}


 export function FUN_005b3cd4 (param_1, param_2)

 {
  let uVar1;

  FUN_005b3b78(param_1, param_2);
  uVar1 = FUN_005b2d39(param_1);
  return uVar1;
}


 export function FUN_005b3d06 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let local_10;
  let local_c;

  wv(DAT_006ad8bc, 1);
  if ((cVar1 !== 0)) {
    for (/* cond: (s32((DAT_0065610a + local_10 * 0x20), 0) !== 0) */); (local_10 = (local_10 < ((DAT_00655b16) << 16 >> 16)) && (wv(DAT_0065610a, DAT_0065610a)))
        ; local_10 = (local_10 + 1)) {
    }
    if ((((DAT_00655b16) << 16 >> 16) === local_10)) {
      if ((0x7f7 < DAT_00655b16)) {
        if ((DAT_00655b02 < 3)) {
          FUN_00410030(s_TOOMANYUNITS_006362ec, DAT_0063fc58, 0);
        }
        wv(DAT_006ad8bc, 0);
        return -1;
      }
      wv(DAT_00655b16, (DAT_00655b16 + 1));
    }
    if ((_MEM[DAT_0064b1ca + param_1 * 0x14] < 5)) {
      w16((DAT_0064c706 + param_2 * 0x594), 0, (s16((DAT_0064c706 + param_2 * 0x594), 0) + 1));
    }
    _MEM[DAT_0064c778 + (param_2 * 0x594 + param_1)] = (_MEM[DAT_0064c778 + (param_2 * 0x594 + param_1)] + 1)
    ;
    w32((DAT_0064b9e8 + param_2 * 4), 0, (s32((DAT_0064b9e8 + param_2 * 4), 0) + 1));
    _MEM[DAT_006560f6 + local_10 * 0x20] = ((param_1) & 0xFF);
    _MEM[DAT_006560f7 + local_10 * 0x20] = ((param_2) & 0xFF);
    w32((DAT_0065610a + local_10 * 0x20), 0, DAT_00627fd8);
    wv(DAT_00627fd8, (DAT_00627fd8 + 1));
    if ((DAT_00655b02 < 3)) {
      _MEM[DAT_006560f8 + local_10 * 0x20] = 0;
    }
    else if ((DAT_006ad684 === 0)) {
      _MEM[DAT_006560f8 + local_10 * 0x20] = 0;
    }
    else {
      uVar2 = FUN_005b2a39(local_10);
      _MEM[DAT_006560f8 + local_10 * 0x20] = uVar2;
    }
    _MEM[DAT_006560fa + local_10 * 0x20] = 0;
    _MEM[DAT_006560fc + local_10 * 0x20] = 0x58;
    w16((DAT_006560f4 + local_10 * 0x20), 0, 0);
    _MEM[DAT_006560f9 + local_10 * 0x20] = 0;
    _MEM[DAT_006560ff + local_10 * 0x20] = 0xff;
    _MEM[DAT_00656100 + local_10 * 0x20] = 0xff;
    iVar3 = FUN_0043d07a(param_3, param_4, -1, -1, -1);
    if ((s8(_MEM[DAT_0064f348 + iVar3 * 0x58]) === (param_2 & 0xff))) {
      local_c = ((iVar3) & 0xFF);
      _MEM[DAT_00656100 + local_10 * 0x20] = local_c;
    }
    _MEM[DAT_006560fd + local_10 * 0x20] = 0;
    _MEM[DAT_006560fe + local_10 * 0x20] = 0;
    _MEM[DAT_006560fb + local_10 * 0x20] = 0xff;
    w16((DAT_00656106 + local_10 * 0x20), 0, 0xffff);
    w16((DAT_00656108 + local_10 * 0x20), 0, 0xffff);
    w16((DAT_006560f0 + local_10 * 0x20), 0, 0xffff);
    w16((DAT_006560f2 + local_10 * 0x20), 0, 0xffff);
    w16((DAT_00656102 + local_10 * 0x20), 0, 0xffff);
    w16((DAT_00656104 + local_10 * 0x20), 0, 0xffff);
    FUN_005b345f(local_10, param_3, param_4, 0);
    FUN_004274a6(local_10, 1);
    if ((DAT_00655b02 === 0)) {
      if ((_MEM[DAT_0064b1c1 + param_1 * 0x14] === 2)) {
        if (((DAT_00655af4 & 4) === 0)) {
          if (((None & 1) !== 0)) {
            FUN_00490530(PTR_s_TUTORIAL_00627678, s_SHIPS_006362fc, local_10);
          }
          wv(DAT_00655af4, (DAT_00655af4 | 4));
        }
      }
      else if ((_MEM[DAT_0064b1c1 + param_1 * 0x14] === 1)) {
        if (((DAT_00655af4 & 2) === 0)) {
          if (((None & 1) !== 0)) {
            FUN_00490530(PTR_s_TUTORIAL_00627678, s_AIRUNIT_00636304, local_10);
          }
          wv(DAT_00655af4, (DAT_00655af4 | 2));
        }
      }
      else if ((_MEM[DAT_0064b1ca + param_1 * 0x14] === 7)) {
        if (((DAT_00655af4 & 0x10) === 0)) {
          if (((None & 1) !== 0)) {
            FUN_00490530(PTR_s_TUTORIAL_00627678, s_CARAVAN_0063630c, local_10);
          }
          wv(DAT_00655af4, (DAT_00655af4 | 0x10));
        }
      }
      else if ((_MEM[DAT_0064b1ca + param_1 * 0x14] < 5)) {
        if ((s16((DAT_0064c706 + param_2 * 0x594), 0) === 1)) {
          FUN_00490530(PTR_s_TUTORIAL_00627678, s_FIRSTUNIT1_00636314, local_10);
        }
        if ((s16((DAT_0064c706 + param_2 * 0x594), 0) === 2)) {
          FUN_00490530(PTR_s_TUTORIAL_00627678, s_FIRSTUNIT2_00636320, local_10);
        }
      }
    }
    if ((2 < DAT_00655b02)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
    }
    wv(DAT_006ad8bc, 0);
  }
  else {
    wv(DAT_006ad8bc, 0);
    wv(DAT_006c90d8, -2);
    FUN_0046b14d(0x3d, 0, param_1, param_2, param_3, param_4, 0, 0, 0, 0);
    iVar3 = FUN_00421bb0();
    while (((iVar4 - iVar3) < 0xe10)) {
      FUN_0047e94e(1, 1);
    }
    if ((DAT_006c90d8 === -2)) {
      FUN_005d225b(s_Create_Unit:_Connection_to_serve_006362a8);
      FUN_00410030(s_SERVERCONNECTTIME_006362d8, DAT_0063fc58, 0);
      wv(DAT_00628044, 0);
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
  }
  return local_10;
}


 export function FUN_005b4391 (param_1, param_2)

 {
  let bVar1;
  let sVar2;
  let sVar3;
  let cVar4;
  let iVar5;
  let iVar6;
  let local_20;
  let local_10;

  if ((s32((DAT_0065610a + param_1 * 0x20), 0) !== 0)) {
    wv(DAT_006ad8c0, 1);
    if ((cVar4 !== 0)) {
      sVar2 = s16((DAT_006560f0 + param_1 * 0x20), 0);
      sVar3 = s16((DAT_006560f2 + param_1 * 0x20), 0);
      bVar1 = _MEM[DAT_006560f6 + param_1 * 0x20];
      if ((_MEM[DAT_00656100 + param_1 * 0x20] === 0xff)) {
        local_20 = -1;
      }
      else {
        local_20 = u8(_MEM[DAT_00656100 + param_1 * 0x20]);
      }
      iVar5 = s8(_MEM[DAT_006560f7 + param_1 * 0x20]);
      if ((param_1 < 0x800)) {
        if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] < 5)) {
          w16((DAT_0064c706 + iVar5 * 0x594), 0, (s16((DAT_0064c706 + iVar5 * 0x594), 0) + 0xffff))
          ;
        }
        if ((_MEM[DAT_0064c778 + (iVar5 * 0x594 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]))] !== 0)) {
          _MEM[DAT_0064c778 + (iVar5 * 0x594 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]))] = (_MEM[DAT_0064c778 + (iVar5 * 0x594 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]))] + 0xff);
        }
        if ((s32((DAT_0064b9e8 + iVar5 * 4), 0) !== 0)) {
          w32((DAT_0064b9e8 + iVar5 * 4), 0, (s32((DAT_0064b9e8 + iVar5 * 4), 0) + -1));
        }
      }
      FUN_005b319e(param_1, 0);
      w32((DAT_0065610a + param_1 * 0x20), 0, 0);
      if (((((DAT_00655b16) << 16 >> 16) + -1) === param_1)) {
        wv(DAT_00655b16, (DAT_00655b16 + 0xffff));
      }
      for (/* cond: (local_10 < ((DAT_00655b16) << 16 >> 16)) */); local_10 = (local_10 < ((DAT_00655b16) << 16 >> 16)); local_10 = (local_10 + 1)) {
        if ((((s16((DAT_00656102 + local_10 * 0x20), 0)) << 16 >> 16) === param_1)) {
          _MEM[DAT_006560ff + local_10 * 0x20] = 0xff;
        }
      }
      if ((-1 < local_20)) {
        FUN_0050c679(local_20);
      }
      if ((_MEM[DAT_0064c778 + (iVar5 * 0x594 + u8(bVar1))] === 0)) {
        FUN_004aa378(iVar5, -1);
      }
      if ((param_2 !== 0)) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0x87, 0xff, -1, ((sVar2) << 16 >> 16), ((sVar3) << 16 >> 16), 0, 0, 0, 0, 0);
        if ((0 < local_20)) {
          FUN_0046b14d(0x88, 0xff, local_20, 0, 0, 0, 0, 0, 0, 0);
        }
        XD_FlushSendBuffer(0x1388);
      }
      wv(DAT_006ad8c0, 0);
    }
    else {
      wv(DAT_006ad8c0, 0);
      wv(DAT_006c90c0, -2);
      FUN_0046b14d(0x37, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
      iVar5 = FUN_00421bb0();
      while (((iVar6 - iVar5) < 0xe10)) {
        FUN_0047e94e(1, 1);
      }
      if ((DAT_006c90c0 === -2)) {
        FUN_005d225b(s_Delete_Unit:_Connection_to_serve_0063632c);
        FUN_00410030(s_SERVERCONNECTTIME_0063635c, DAT_0063fc58, 0);
        wv(DAT_00628044, 0);
      }
      while ((DAT_006c8fa0 !== 0)) {
        FUN_0047e94e(1, 0);
      }
    }
  }
  return;
}


 export function FUN_005b47fa (param_1, param_2)

 {
  let iVar1;

  param_1 = FUN_005b2d39(param_1);
  while ((-1 < param_1)) {
    iVar1 = FUN_005b2c82(param_1);
    FUN_005b4391(param_1, 0);
    param_1 = iVar1;
  }
  if ((param_2 !== 0)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  return;
}


 export function FUN_005b488a (param_1)

 {
  if ((-1 < param_1)) {
    _MEM[DAT_006560f9 + param_1 * 0x20] = 0;
  }
  return;
}


 export function FUN_005b48b1 (param_1)

 {
  let iVar1;

  for (/* cond: (-1 < iVar1) */); -1 = (-1 < iVar1); iVar1 = FUN_005b2c82(iVar1)) {
    FUN_005b488a(iVar1);
  }
  return;
}


 export function FUN_005b490e (param_1, param_2)

 {
  if ((-1 < param_1)) {
    _MEM[DAT_006560f9 + param_1 * 0x20] = (_MEM[DAT_006560f9 + param_1 * 0x20] | (((1 << (((param_2) & 0xFF) & 0x1f))) & 0xFF));
  }
  return;
}


 export function FUN_005b496e (param_1, param_2)

 {
  let iVar1;

  for (/* cond: (-1 < iVar1) */); -1 = (-1 < iVar1); iVar1 = FUN_005b2c82(iVar1)) {
    FUN_005b490e(iVar1, param_2);
  }
  return;
}


 export function FUN_005b49cf (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let local_20;
  let local_1c;
  let local_c;
  let local_8;

  local_1c = FUN_005b89e4(param_1, param_2);
  iVar1 = FUN_005b8ca6(param_1, param_2);
  wv(DAT_006ced4c, -1);
  for (/* cond: (local_8 < 8) */); (wv(DAT_006ced4c, (DAT_006ced4c < 0)) && (local_8 = (local_8 < 8))); local_8 = (local_8 + 1)) {
    uVar2 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_8]) + param_1));
    iVar3 = (s8(_MEM[DAT_00628360 + local_8]) + param_2);
    iVar4 = FUN_004087c0(uVar2, iVar3);
    if ((iVar4 !== 0)) {
      if ((iVar1 < 0)) {
        local_c = FUN_005b89e4(uVar2, iVar3);
      }
      else {
        local_c = local_1c;
      }
      local_20 = FUN_005b8ca6(uVar2, iVar3);
      if ((local_20 < 0)) {
        local_20 = FUN_005b8d62(uVar2, iVar3);
      }
      else {
        local_1c = local_c;
      }
      if (((_MEM[DAT_0064c6c0 + (param_3 * 0x594 + local_20 * 4)] & 8) === 0)) {
        wv(DAT_006ced4c, local_20);
      }
    }
  }
  return (-1 < DAT_006ced4c);
}


 export function FUN_005b4b66 (param_1, param_2, param_3)

 {
  let cVar1;
  let uVar2;
  let iVar3;
  let local_8;

  wv(DAT_006ced4c, -1);
  for (/* cond: (local_8 < 8) */); (wv(DAT_006ced4c, (DAT_006ced4c < 0)) && (local_8 = (local_8 < 8))); local_8 = (local_8 + 1)) {
    uVar2 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_8]) + param_1));
    cVar1 = _MEM[DAT_00628360 + local_8];
    iVar3 = FUN_004087c0(uVar2, (s8(cVar1) + param_2));
    if (((_MEM[DAT_0064c6c0 + (param_3 * 0x594 + iVar3 * 4)] & 8) === 0)) {
      wv(DAT_006ced4c, iVar3);
    }
  }
  return (-1 < DAT_006ced4c);
}


 export function FUN_005b4c63 (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let local_8;

  wv(DAT_006ced4c, -1);
  iVar1 = FUN_005b89e4(param_1, param_2);
  for (/* cond: (local_8 < 8) */); (wv(DAT_006ced4c, (DAT_006ced4c < 0)) && (local_8 = (local_8 < 8))); local_8 = (local_8 + 1)) {
    uVar2 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_8]) + param_1));
    iVar3 = (s8(_MEM[DAT_00628360 + local_8]) + param_2);
    iVar4 = FUN_004087c0(uVar2, iVar3);
    if (((_MEM[DAT_0064c6c0 + (iVar4 * 4 + param_3 * 0x594)] & 8) === 0)) {
      wv(DAT_006ced4c, iVar4);
    }
  }
  return (-1 < DAT_006ced4c);
}


 export function FUN_005b4d8c (param_1, param_2, param_3)

 {
  let iVar1;
  let local_8;

  local_8 = 0;
  wv(DAT_006ced4c, -1);
  iVar1 = FUN_005b8ca6(param_1, param_2);
  if ((iVar1 < 0)) {
    local_8 = FUN_005b4c63(param_1, param_2, param_3);
  }
  return local_8;
}


 export function FUN_005b4de2 (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let bVar4;
  let local_8;

  bVar4 = 0;
  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 !== 0)) {
    for (/* cond: (local_8 < 8) */); (bVar4 = (bVar4 === 0) && (local_8 = (local_8 < 8))); local_8 = (local_8 + 1)) {
      uVar2 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_8]) + param_1));
      iVar1 = (s8(_MEM[DAT_00628360 + local_8]) + param_2);
      iVar3 = FUN_004087c0(uVar2, iVar1);
      if ((iVar3 !== 0)) {
        iVar3 = FUN_005b8d62(uVar2, iVar1);
        bVar4 = (iVar3 === param_3);
        iVar1 = FUN_005b8ca6(uVar2, iVar1);
        if ((iVar1 === param_3)) {
          bVar4 = 1;
        }
      }
    }
  }
  return bVar4;
}


 export function FUN_005b4ee2 (param_1, param_2)

 {
  for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1)) {
    _MEM[DAT_006560f9 + param_1 * 0x20] = (_MEM[DAT_006560f9 + param_1 * 0x20] | param_2);
  }
  return;
}


 export function FUN_005b4f3c (param_1, param_2)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  iVar1 = FUN_005b8a1d(param_1, param_2);
  if ((-1 < iVar1)) {
    local_c = ((iVar1) & 0xFF);
    local_8 = (1 << (((iVar1) & 0xFF) & 0x1f));
  }
  for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
    iVar1 = FUN_005b4de2(param_1, param_2, local_c);
    if ((iVar1 !== 0)) {
      local_8 = (local_8 | (1 << (((local_c) & 0xFF) & 0x1f)));
    }
  }
  return local_8;
}


 export function FUN_005b4fca (param_1)

 {
  let iVar1;
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    iVar1 = FUN_005b4de2(((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16), local_8);
    if ((iVar1 !== 0)) {
      FUN_005b496e(param_1, local_8);
    }
  }
  return;
}


 export function FUN_005b503b (param_1, param_2)

 {
  param_1 = FUN_005b2d39(param_1);
  while ((u8(_MEM[DAT_006560f6 + param_1 * 0x20]) === param_2)) {
    if ((param_1 < 0)) {
      return 0;
    }
    if ((u8(_MEM[DAT_006560f6 + param_1 * 0x20]) === param_2));
  }
  return 1;
}


 export function FUN_005b50ad (param_1, param_2)

 {
  let local_8;

  local_8 = 0;
  if ((param_2 !== 0xb)) {
    param_1 = FUN_005b2d39(param_1);
  }
  while ((local_8 < 0x800)) {
    /* switch */ () {
    case 0 :
      local_8 = (local_8 + s8(_MEM[DAT_0064b1c8 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]));
      break;
    case 1 :
      local_8 = (local_8 + s8(_MEM[DAT_0064b1c5 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]));
      break;
    case 2 :
    case 0xb :
      local_8 = (local_8 + 1);
      break;
    case 3 :
      local_8 = (local_8 + s8(_MEM[DAT_0064b1c4 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]));
      break;
    case 4 :
      if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 1)) {
        local_8 = (local_8 + 1);
      }
      break;
    case 5 :
      if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 2)) {
        local_8 = (local_8 + 1);
      }
      break;
    case 6 :
      if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 2)) {
        local_8 = (local_8 + s8(_MEM[DAT_0064b1c9 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]));
      }
      else if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 0)) {
        local_8 = (local_8 + -1);
      }
      break;
    case 7 :
      if ((1 < _MEM[DAT_0064b1c3 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14])) {
        local_8 = (local_8 + 1);
      }
      break;
    case 8 :
      if (((_MEM[DAT_0064b1bd + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] & 0x10) !== 0)) {
        local_8 = (local_8 + 1);
      }
      break;
    case 9 :
      if (((_MEM[DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] & 0x80) !== 0)) {
        local_8 = (local_8 + 1);
      }
      break;
    case 10 :
      if (((_MEM[DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] & 8) !== 0)) {
        local_8 = (local_8 + 1);
      }
    }
    if ((param_2 === 0xb)) {
      param_1 = ((s16((DAT_00656108 + param_1 * 0x20), 0)) << 16 >> 16);
    }
    else {
      param_1 = FUN_005b2c82(param_1);
    }
  }
  return local_8;
}


 export function FUN_005b53b6 (param_1, param_2)

 {
  let local_8;

  local_8 = 0;
  for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1)) {
    if ((s8(_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]) === param_2)) {
      local_8 = (local_8 + 1);
    }
  }
  return local_8;
}


 export function FUN_005b542e (param_1, param_2, param_3)

 {
  let bVar1;
  let cVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let iVar7;
  let iVar8;
  let bVar9;
  let local_3c;
  let local_38;
  let local_30;
  let local_28;
  let local_18;
  let local_10;

  local_10 = 0;
  if ((0x801 < param_1)) {
    FUN_005dae6b(7, s_ship_>=_-1_&&_ship_<_MAX_UNITS_+_0063638c, s_D:\Ss\Franklinton\Unit.cpp_00636370, 0x61d);
  }
  wv(DAT_006ad8f8, 1);
  if ((cVar2 !== 0)) {
    if ((param_2 !== 0)) {
      FUN_005b3b78(param_1, 0);
    }
    local_30 = FUN_005b2d39(param_1);
    if ((local_30 === param_1)) {
      local_30 = FUN_005b2c82(param_1);
    }
    iVar3 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
    iVar4 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
    iVar5 = FUN_004087c0(iVar3, iVar4);
    if ((iVar5 !== 0)) {
      local_10 = FUN_005b89e4(iVar3, iVar4);
    }
    if ((param_2 === 0)) {
      for (/* cond: (-1 < local_38) */); -1 = (-1 < local_38); local_38 = FUN_005b2c82(local_38)) {
        w16((DAT_006560f4 + local_38 * 0x20), 0, (s16((DAT_006560f4 + local_38 * 0x20), 0) & 0xefff));
      }
    }
    else {
      FUN_005b36df(param_1, (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 5 + 5) * -40, (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 5 + 5) * -40, 0);
    }
    local_28 = s8(_MEM[DAT_0064b1c9 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14]);
    uVar6 = (s32((DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14), 0) & 0x80);
    if (((_MEM[DAT_0064b1bc + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] & 8) !== 0)) {
      bVar1 = 1;
    }
    else {
      bVar1 = 0;
    }
    if (bVar1) {
      local_28 = 0x14;
    }
    if ((_MEM[DAT_006560f7 + param_1 * 0x20] === 0)) {
      local_28 = 0x14;
    }
    local_18 = 0;
    while ((local_28 === 0)) {
      if (bVar1) {
        local_3c = 1;
      }
      else {
        local_3c = 2;
      }
      if ((local_28 === 0));
      if ((local_28 !== 0)) {
        iVar7 = FUN_005b2c82(local_38);
        bVar9 = 0;
        if (bVar1) {
          cVar2 = 1;
        }
        else {
          cVar2 = 0;
        }
        if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + local_38 * 0x20]) * 0x14] === cVar2));
    }
    if ((param_3 !== 0)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
    }
    wv(DAT_006ad8f8, 0);
  }
  else {
    wv(DAT_006ad8f8, 0);
    wv(DAT_006c9108, -2);
    FUN_0046b14d(0x49, 0, param_1, param_2, 0, 0, 0, 0, 0, 0);
    iVar3 = FUN_00421bb0();
    while (((iVar4 - iVar3) < 0xe10)) {
      FUN_0047e94e(1, 1);
    }
    if ((DAT_006c9108 === -2)) {
      FUN_005d225b(s_Stack_ship:_Connection_to_server_006363b0);
      FUN_00410030(s_SERVERCONNECTTIME_006363dc, DAT_0063fc58, 0);
      wv(DAT_00628044, 0);
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
  }
  return local_28;
 code_r0x005b584c: :
  if (((_MEM[DAT_0064b1bd + u8(_MEM[DAT_006560f6 + local_38 * 0x20]) * 0x14] & 0x10) !== 0)) {
    if ((local_18 === 0)) {
      if (bVar1) {
        bVar9 = 1;
      }
      else if ((((s16((DAT_00656102 + local_38 * 0x20), 0)) << 16 >> 16) === param_1)) {
        bVar9 = 1;
      }
    }
    else if ((local_18 === 1)) {
      if (((u8(DAT_00655b0b) & (1 << (_MEM[DAT_006560f7 + local_38 * 0x20] & 0x1f))) === 0)) {
        if ((local_10 !== 0)) {
          if ((local_10 === 0)) {
            cVar2 = _MEM[DAT_006560f7 + local_38 * 0x20];
            iVar8 = FUN_005b8a81(iVar3, iVar4);
            if ((4 < _MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + local_38 * 0x20]) * 0x14])) {
              bVar9 = 1;
            }
          }
          else {
            bVar9 = 1;
          }
        }
      }
      else if ((_MEM[DAT_006560ff + local_38 * 0x20] === 3)) {
        bVar9 = (s16((DAT_00656102 + local_38 * 0x20), 0) < 0);
      }
      else if ((local_10 !== 0)) {
        bVar9 = 1;
      }
    }
 LAB_005b5a3a: :
    if (((s16((DAT_006560f4 + local_38 * 0x20), 0) & 0x1000) !== 0)) {
      bVar9 = 0;
    }
    if (bVar9) {
      if ((local_30 === local_38)) {
        local_30 = iVar7;
      }
      if (bVar1) {
        if ((_MEM[DAT_006560ff + local_38 * 0x20] !== 3)) {
          _MEM[DAT_006560ff + local_38 * 0x20] = 0xff;
        }
      }
      else {
        FUN_005b2f50(local_38);
        w16((DAT_00656102 + local_38 * 0x20), 0, ((param_1) & 0xFFFF));
      }
      if ((param_2 === 0)) {
        w16((DAT_006560f4 + local_38 * 0x20), 0, (s16((DAT_006560f4 + local_38 * 0x20), 0) | 0x1000));
      }
      else {
        FUN_005b36df(local_38, (s8(_MEM[DAT_006560f7 + local_38 * 0x20]) * 5 + 5) * -40, (s8(_MEM[DAT_006560f7 + local_38 * 0x20]) * 5 + 5) * -40, 0);
      }
      local_28 = (local_28 + -1);
    }
  }
  goto LAB_005b57d5;
}


 export function FUN_005b5bab (param_1, param_2)

 {
  let cVar1;
  let iVar2;
  let iVar3;

  if ((-1 < param_1)) {
    wv(DAT_006ad8fc, 1);
    if ((cVar1 !== 0)) {
      if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 2)) {
        FUN_005b542e(param_1, 1, 0);
      }
      else {
        FUN_005b36df(param_1, (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 5 + 5) * -40, (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 5 + 5) * -40, 0);
      }
      if ((param_2 !== 0)) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
      }
      wv(DAT_006ad8fc, 0);
    }
    else {
      wv(DAT_006ad8fc, 0);
      wv(DAT_006c9110, -2);
      FUN_0046b14d(0x4b, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
      iVar2 = FUN_00421bb0();
      while (((iVar3 - iVar2) < 0xe10)) {
        FUN_0047e94e(1, 1);
      }
      if ((DAT_006c9110 === -2)) {
        FUN_005d225b(s_Stack_unit:_Connection_to_server_006363f0);
        FUN_00410030(s_SERVERCONNECTTIME_0063641c, DAT_0063fc58, 0);
        wv(DAT_00628044, 0);
      }
      while ((DAT_006c8fa0 !== 0)) {
        FUN_0047e94e(1, 0);
      }
    }
  }
  return;
}


 export function FUN_005b5d93 (param_1, param_2)

 {
  let cVar1;
  let iVar2;
  let iVar3;
  let bVar4;
  let local_14;
  let local_10;

  bVar4 = 0;
  wv(DAT_006ad900, 1);
  if ((cVar1 === 0)) {
    wv(DAT_006ad900, 0);
    wv(DAT_006c9118, -2);
    FUN_0046b14d(0x4d, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    iVar2 = FUN_00421bb0();
    while (((iVar3 - iVar2) < 0xe10)) {
      FUN_0047e94e(1, 1);
    }
    if ((DAT_006c9118 === -2)) {
      FUN_005d225b(s_Delete_safely:_Connection_to_ser_00636430);
      FUN_00410030(s_SERVERCONNECTTIME_00636460, DAT_0063fc58, 0);
      wv(DAT_00628044, 0);
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
    return;
  }
  local_10 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  local_14 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 2)) {
    local_10 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
    local_14 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
    iVar2 = FUN_004087c0(local_10, local_14);
    if ((iVar2 === 0)) {
      if (((-local_10) === (s8(_MEM[DAT_006560f7 + param_1 * 0x20]) * 5 + 5) * 0x28)) {
        FUN_005b47fa(param_1, 0);
        goto LAB_005b5fed;
      }
      bVar4 = 1;
    }
    else {
      iVar2 = FUN_005b89e4(local_10, local_14);
      bVar4 = (iVar2 !== 0);
    }
  }
  if (bVar4) {
    FUN_005b542e(param_1, 0, 0);
    FUN_005b47fa(param_1, 0);
    FUN_0050c494(-1, local_10, local_14);
  }
  else {
    FUN_005b4391(param_1, 0);
  }
 LAB_005b5fed: :
  if ((param_2 !== 0)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  wv(DAT_006ad900, 0);
  return;
}


 export function FUN_005b6042 (param_1, param_2)

 {
  let cVar1;
  let iVar2;
  let iVar3;
  let iVar4;

  wv(DAT_006ad904, 1);
  if ((cVar1 !== 0)) {
    iVar2 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
    iVar3 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
    FUN_005b5d93(param_1, 0);
    iVar4 = FUN_004087c0(iVar2, iVar3);
    if ((iVar4 !== 0)) {
      FUN_0047cea6(iVar2, iVar3);
    }
    if ((param_2 !== 0)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0046b14d(0x72, 0xff, iVar2, iVar3, 0, 0, 0, 0, 0, 0);
    }
    wv(DAT_006ad904, 0);
  }
  else {
    wv(DAT_006ad904, 0);
    wv(DAT_006c9120, -2);
    FUN_0046b14d(0x4f, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    iVar2 = FUN_00421bb0();
    while (((iVar3 - iVar2) < 0xe10)) {
      FUN_0047e94e(1, 1);
    }
    if ((DAT_006c9120 === -2)) {
      FUN_005d225b(s_Delete_visible:_Connection_to_se_00636474);
      FUN_00410030(s_SERVERCONNECTTIME_006364a4, DAT_0063fc58, 0);
      wv(DAT_00628044, 0);
    }
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
  }
  return;
}


 export function FUN_005b620a (param_1, param_2)

 {
  let iVar1;
  let local_10;
  let local_8;

  local_8 = 0;
  FUN_005b3b78(param_1, 0);
  for (/* cond: (-1 < local_10) */); -1 = (-1 < local_10);
      local_10 = FUN_005b2c82(local_10)) {
    if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + local_10 * 0x20]) * 0x14] === 2)) {
      iVar1 = FUN_005b542e(local_10, 0, 0);
      if ((local_8 < iVar1)) {
        local_8 = iVar1;
      }
    }
  }
  if ((param_2 !== 0)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
  }
  return local_8;
}


 export function FUN_005b62ee (param_1, param_2)

 {
  for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1)) {
    _MEM[DAT_006560ff + param_1 * 0x20] = param_2;
  }
  return;
}


 export function FUN_005b633f (param_1)

 {
  let iVar1;
  let local_8;

  local_8 = 0;
  if ((iVar1 !== 0)) {
    if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 2) === 0)) {
      local_8 = 1;
    }
    else {
      local_8 = 0;
    }
  }
  return local_8;
}


 export function FUN_005b6458 (param_1)

 {
  let iVar1;
  let local_8;

  local_8 = 0;
  if ((0xffff < s16((DAT_006560f0 + param_1 * 0x20), 0))) {
    if ((iVar1 === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = 1;
    }
  }
  return local_8;
}


 export function FUN_005b6512 (param_1, param_2)

 {
  let iVar1;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0x270f;
  local_20 = -1;
  local_c = -1;
  local_18 = ((DAT_0064b1b4) << 16 >> 16);
  local_1c = ((DAT_0064b1b0) << 16 >> 16);
  if ((DAT_00655b05 !== 0)) {
    local_18 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
    local_1c = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
    local_c = ((DAT_00655afe) << 16 >> 16);
  }
  local_14 = 0;
  while ((-1 < local_20)) {
    if ((2 < local_14)) {
      return local_20;
    }
    for (/* cond: (param_1 < ((DAT_00655b16) << 16 >> 16)) */); param_1 = (param_1 < ((DAT_00655b16) << 16 >> 16)); param_1 = (param_1 + 1)) {
      if ((s8(_MEM[DAT_006560f7 + param_1 * 0x20]) === DAT_006d1da0)) {
        iVar1 = FUN_005ae31d(local_18, local_1c, ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16));
        local_10 = (iVar1 * 2 + 1);
        if ((_MEM[DAT_0064b1c1 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] !== 2)) {
          local_10 = iVar1 * 2;
        }
        if ((local_10 < local_8)) {
          local_8 = local_10;
          local_20 = param_1;
        }
        else if ((((DAT_00655afe) << 16 >> 16) === param_1)) {
          local_20 = param_1;
        }
      }
    }
    if ((-1 < local_20)); param_1 = (param_1 < ((DAT_00655b16) << 16 >> 16)); param_1 = (param_1 + 1)) {
      if ((param_1 !== local_c)) {
        w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) & 0xbfff));
      }
    }
    local_14 = (local_14 + 1);
  }
  return local_20;
}


 export function FUN_005b6787 (param_1)

 {
  let uVar1;

  uVar1 = FUN_005b2a39(param_1);
  _MEM[DAT_006560f8 + param_1 * 0x20] = uVar1;
  return;
}


 export function FUN_005b67af (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let local_10;
  let local_c;

  local_c = -1;
  wv(DAT_006ced50, 0x270f);
  for (/* cond: (local_10 < ((DAT_00655b16) << 16 >> 16)) */); local_10 = (local_10 < ((DAT_00655b16) << 16 >> 16)); local_10 = (local_10 + 1)) {
    if ((iVar1 <= DAT_006ced50)) {
      local_c = local_10;
      wv(DAT_006ced50, iVar1);
    }
  }
  return local_c;
}


 export function FUN_005b6898 (param_1)

 {
  let puVar1;

  if ((_MEM[DAT_00656100 + param_1 * 0x20] === 0xff)) {
    puVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x38), 0));
  }
  else {
    puVar1 = (DAT_0064f360 + u8(_MEM[DAT_00656100 + param_1 * 0x20]) * 0x58);
  }
  return puVar1;
}


 export function FUN_005b68f6 (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_c;

  iVar1 = FUN_005b8ca6(param_2, param_3);
  if ((iVar1 !== 0)) {
    uVar3 = FUN_005b89bb(param_2, param_3);
    uVar3 = (uVar3 & 0xff);
    for (/* cond: (local_c < 2) */); local_c = (local_c < 2); local_c = (local_c + 1)) {
      if ((local_c === 0)) {
        iVar1 = FUN_0058c56c(param_2, param_3);
        if ((iVar1 === 0)) {
          return 0;
        }
      }
      else if (((uVar2 & 4) !== 0)) {
        return 0;
      }
      if ((s8(_MEM[DAT_00627cd4 + (uVar3 * 0x18 + local_c)]) <= u8(_MEM[DAT_0064c6b5 + param_1 * 0x594]))) {
        return (local_c + 1);
      }
    }
  }
  return 0;
}


 export function FUN_005b6a58 (param_1)

 {
  if ((-1 < param_1)) {
    _MEM[DAT_006560ff + param_1 * 0x20] = 0xff;
    w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x7fff));
  }
  return 0;
}


 export function FUN_005b6aa0 ()

 {
  return 1;
}


 export function FUN_005b6ab5 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_0056baff(param_2, param_3, 4, (param_5 + 2), param_6, DAT_0063605c, 0);
  return;
}


 export function FUN_005b6aea (param_1, param_2, param_3)

 {
  let uVar1;
  let unaff_FS_OFFSET;
  let local_34c;
  let local_344;
  let local_340;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005b6db4;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_4c = DAT_ffffffb4;
  local_8 = 0;
  FUN_0059db08(0x4000);
  local_8 = ((((local_8) >> 8) << 8) | 1);
  FUN_005cdea1(0x42, 0x30, 0);
  wv(DAT_0063605c, -1);
  FUN_0040bc40((0x20001 - u8((param_3 === 0))));
  FUN_0059e6a9(param_2);
  FUN_0059e6ff(0x154);
  local_340 = DAT_fffffcc0;
  local_340 = DAT_fffffcc0;
  local_340 = DAT_fffffcc0;
  local_340 = DAT_fffffcc0;
  local_344 = 0;
  for (/* cond: (-1 < param_1) */); -1 = (-1 < param_1); param_1 = FUN_005b2c82(param_1)) {
    local_344 = (local_344 + 1);
    if ((local_344 < 0xa)) {
      FUN_0040bbb0();
      uVar1 = FUN_00493d13(s8(_MEM[DAT_006560f7 + param_1 * 0x20]));
      FUN_00414d70(uVar1);
      FUN_0040fe10();
      if (((s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x2000) !== 0)) {
        FUN_0040bc10(0xd);
        FUN_0040fe10();
      }
      FUN_0040ff00(s32((DAT_0064b1b8 + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14), 0));
      FUN_0040fe10();
      FUN_0040fea0();
      if ((_MEM[DAT_00656100 + param_1 * 0x20] === 0xff)) {
        local_34c = -1;
      }
      else {
        local_34c = u8(_MEM[DAT_00656100 + param_1 * 0x20]);
      }
      FUN_0043ca80(local_34c);
      if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + param_1 * 0x20]) * 0x14] === 7)) {
        FUN_00421d30();
        if ((_MEM[DAT_006560fd + param_1 * 0x20] < 0)) {
          FUN_0040ff00(s32((DAT_00628420 + 0x300), 0));
        }
        else {
          FUN_0040ff00(s32((DAT_0064b168 + s8(_MEM[DAT_006560fd + param_1 * 0x20]) * 4), 0));
        }
      }
      FUN_0040fed0();
      FUN_0059ec88(DAT_ffffffb4, param_1, DAT_00679640);
    }
  }
  FUN_0040bc80(0);
  local_8 = (local_8 & -0x100);
  FUN_005b6d9f();
  local_8 = -1;
  FUN_005b6dab();
  FUN_005b6dbe();
  return;
}


 export function FUN_005b6d9f ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_005b6dab ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_005b6dbe (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005b7fe0 ()

 {
  let uVar1;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  wv(DAT_006d116a, ((((((DAT_006d1160) << 16 >> 16) + 3) >> 2)) & 0xFFFF));
  wv(DAT_006d116c, ((((((DAT_006d1162) << 16 >> 16) + 3) >> 2)) & 0xFFFF));
  wv(DAT_006d1164, (DAT_006d1160 / 2 | 0) * DAT_006d1162);
  local_8 = (((DAT_006d1160 / 2 | 0) * DAT_006d1162) << 16 >> 16) * 6;
  if (((local_8 & 3) !== 0)) {
    local_8 = ((4 - (local_8 & 3)) + local_8);
  }
  wv(DAT_006d1170, FUN_004bb870(local_8));
  if ((FUN_004bb870(local_8) === 0)) {
    FUN_00589ef8(-9, 5, 0, ((DAT_006d1160) << 16 >> 16), ((DAT_006d1162) << 16 >> 16));
  }
  wv(DAT_00636598, FUN_0046aad0(DAT_006d1170));
  if ((FUN_0046aad0(DAT_006d1170) === 0)) {
    FUN_00589ef8(-10, 5, 0, ((DAT_006d1160) << 16 >> 16), ((DAT_006d1162) << 16 >> 16));
  }
  local_14 = DAT_00636598;
  for (/* cond: (local_c < ((DAT_006d1164) << 16 >> 16)) */); local_c = (local_c < ((DAT_006d1164) << 16 >> 16)); local_c = (local_c + 1)) {
    _MEM[local_14] = 0xa;
    _MEM[local_14 + 1] = 0;
    _MEM[local_14 + 2] = 0;
    _MEM[local_14 + 3] = 0;
    _MEM[local_14 + 4] = 0;
    _MEM[local_14 + 5] = 0;
    local_14 = (local_14 + 6);
  }
  local_8 = ((DAT_006d1164) << 16 >> 16);
  if (((local_8 & 3) !== 0)) {
    local_8 = ((4 - (local_8 & 3)) + local_8);
  }
  for (/* cond: (local_18 < 8) */); local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
    uVar1 = FUN_004bb870(local_8);
    w32((local_18 * 4 + 0x6365a0), 0, uVar1);
    if ((s32((local_18 * 4 + 0x6365a0), 0) === 0)) {
      FUN_00589ef8(-9, 5, 0, 0xea, local_18);
    }
    uVar1 = FUN_0046aad0(s32((local_18 * 4 + 0x6365a0), 0));
    w32((DAT_006365c0 + local_18 * 4), 0, uVar1);
    if ((s32((DAT_006365c0 + local_18 * 4), 0) === 0)) {
      FUN_00589ef8(-10, 5, 0, 0xea, local_18);
    }
    _memset(s32((DAT_006365c0 + local_18 * 4), 0), 0, ((DAT_006d1164) << 16 >> 16));
  }
  local_8 = ((DAT_006d116a) << 16 >> 16) * ((DAT_006d116c) << 16 >> 16);
  if (((local_8 & 3) !== 0)) {
    local_8 = ((4 - (local_8 & 3)) + local_8);
  }
  wv(DAT_006d1174, FUN_004bb870(local_8));
  if ((FUN_004bb870(local_8) === 0)) {
    FUN_00589ef8(-9, 5, 0, ((DAT_006d116a) << 16 >> 16), 0);
  }
  wv(DAT_006365e0, FUN_0046aad0(DAT_006d1174));
  if ((FUN_0046aad0(DAT_006d1174) === 0)) {
    FUN_00589ef8(-10, 5, 0, ((DAT_006d116a) << 16 >> 16), 0);
  }
  wv(DAT_006d1178, FUN_004bb870(local_8));
  if ((FUN_004bb870(local_8) === 0)) {
    FUN_00589ef8(-9, 5, 0, ((DAT_006d116a) << 16 >> 16), 1);
  }
  wv(DAT_006365e4, FUN_0046aad0(DAT_006d1178));
  if ((FUN_0046aad0(DAT_006d1178) === 0)) {
    FUN_00589ef8(-10, 5, 0, ((DAT_006d116a) << 16 >> 16), 1);
  }
  wv(DAT_006d117c, FUN_004bb870(local_8));
  if ((FUN_004bb870(local_8) === 0)) {
    FUN_00589ef8(-9, 5, 0, ((DAT_006d116a) << 16 >> 16), 2);
  }
  wv(DAT_006365e8, FUN_0046aad0(DAT_006d117c));
  if ((FUN_0046aad0(DAT_006d117c) === 0)) {
    FUN_00589ef8(-10, 5, 0, ((DAT_006d116a) << 16 >> 16), 2);
  }
  wv(DAT_006d1180, FUN_004bb870(local_8));
  if ((FUN_004bb870(local_8) === 0)) {
    FUN_00589ef8(-9, 5, 0, ((DAT_006d116a) << 16 >> 16), 3);
  }
  wv(DAT_006365ec, FUN_0046aad0(DAT_006d1180));
  if ((FUN_0046aad0(DAT_006d1180) === 0)) {
    FUN_00589ef8(-10, 5, 0, ((DAT_006d116a) << 16 >> 16), 3);
  }
  wv(DAT_006365f0, 1);
  return;
}


 export function FUN_005b8416 ()

 {
  let uVar1;
  let local_8;

  if ((DAT_006365f0 !== 0)) {
    if ((DAT_006365ec !== 0)) {
      wv(DAT_006365ec, FUN_0046ab00(DAT_006d1180));
    }
    if ((DAT_006d1180 !== 0)) {
      wv(DAT_006d1180, FUN_0046aaa0(DAT_006d1180));
    }
    if ((DAT_006365e8 !== 0)) {
      wv(DAT_006365e8, FUN_0046ab00(DAT_006d117c));
    }
    if ((DAT_006d117c !== 0)) {
      wv(DAT_006d117c, FUN_0046aaa0(DAT_006d117c));
    }
    if ((DAT_006365e4 !== 0)) {
      wv(DAT_006365e4, FUN_0046ab00(DAT_006d1178));
    }
    if ((DAT_006d1178 !== 0)) {
      wv(DAT_006d1178, FUN_0046aaa0(DAT_006d1178));
    }
    if ((DAT_006365e0 !== 0)) {
      wv(DAT_006365e0, FUN_0046ab00(DAT_006d1174));
    }
    if ((DAT_006d1174 !== 0)) {
      wv(DAT_006d1174, FUN_0046aaa0(DAT_006d1174));
    }
    if ((DAT_00636598 !== 0)) {
      wv(DAT_00636598, FUN_0046ab00(DAT_006d1170));
    }
    if ((DAT_006d1170 !== 0)) {
      wv(DAT_006d1170, FUN_0046aaa0(DAT_006d1170));
    }
    for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      if ((s32((DAT_006365c0 + local_8 * 4), 0) !== 0)) {
        uVar1 = FUN_0046ab00(s32((local_8 * 4 + 0x6365a0), 0));
        w32((DAT_006365c0 + local_8 * 4), 0, uVar1);
      }
      if ((s32((local_8 * 4 + 0x6365a0), 0) !== 0)) {
        uVar1 = FUN_0046aaa0(s32((local_8 * 4 + 0x6365a0), 0));
        w32((local_8 * 4 + 0x6365a0), 0, uVar1);
      }
    }
    wv(DAT_006365f0, 0);
  }
  return;
}


 export function FUN_005b85fe ()

 {
  let uVar1;

  uVar1 = FUN_00421bb0();
  wv(DAT_006d1168, (uVar1 & 0x7fff));
  if (((uVar1 & 0x7fff) === 0)) {
    wv(DAT_006d1168, 1);
  }
  return;
}


 export function FUN_005b8635 (param_1, param_2)

 {
  let sVar1;
  let local_10;
  let local_c;

  local_c = 1;
  sVar1 = _fwrite(DAT_006d1160, 0xe, 1, param_1);
  if ((sVar1 !== 0)) {
    if ((param_2 === 0)) {
      for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
        sVar1 = _fwrite(s32((DAT_006365c0 + local_10 * 4), 0), ((DAT_006d1164) << 16 >> 16), 1, param_1);
        if ((sVar1 === 0)) {
          return 1;
        }
      }
    }
    else {
      sVar1 = _fwrite(DAT_00627fe0, 0x2a, 1, param_1);
      if ((sVar1 === 0)) {
        return 1;
      }
      sVar1 = _fwrite(DAT_00628010, 0x2a, 1, param_1);
      if ((sVar1 === 0)) {
        return 1;
      }
    }
    sVar1 = _fwrite(DAT_00636598, ((DAT_006d1164) << 16 >> 16) * 6, 1, param_1);
    if ((sVar1 !== 0)) {
      local_c = 0;
    }
  }
  return local_c;
}


 export function FUN_005b8783 (param_1, param_2)

 {
  let sVar1;
  let local_34;
  let local_30;
  let local_28;

  local_30 = 1;
  sVar1 = _fread(DAT_ffffffd8, 0xe, 1, param_1);
  if ((sVar1 !== 0)) {
    if ((param_2 === 0)) {
      for (/* cond: (local_34 < 0x15) */); local_34 = (local_34 < 0x15); local_34 = (local_34 + 1)) {
        w16((DAT_00627fe0 + local_34 * 2), 0, 0xffff);
        w16((DAT_00628010 + local_34 * 2), 0, 0xffff);
      }
    }
    else {
      sVar1 = _fread(DAT_00627fe0, 0x2a, 1, param_1);
      if ((sVar1 === 0)) {
        return 1;
      }
      sVar1 = _fread(DAT_00628010, 0x2a, 1, param_1);
      if ((sVar1 === 0)) {
        return 1;
      }
    }
    FUN_005b8416();
    FID_conflict:_memcpy(DAT_006d1160, DAT_ffffffd8, 0xe);
    FUN_005b7fe0();
    if ((param_2 === 0)) {
      for (/* cond: (local_34 < 8) */); local_34 = (local_34 < 8); local_34 = (local_34 + 1)) {
        sVar1 = _fread(s32((DAT_006365c0 + local_34 * 4), 0), ((DAT_006d1164) << 16 >> 16), 1, param_1);
        if ((sVar1 === 0)) {
          return 1;
        }
      }
    }
    sVar1 = _fread(DAT_00636598, ((DAT_006d1164) << 16 >> 16) * 6, 1, param_1);
    if ((sVar1 !== 0)) {
      local_30 = 0;
    }
  }
  return local_30;
}


 export function FUN_005b8931 (param_1, param_2)

 {
  let iVar1;
  let puVar2;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 === 0)) {
    puVar2 = DAT_006d1188;
  }
  else {
    puVar2 = (((((DAT_006d1160) << 16 >> 16) & -2) * param_2 * 3 + (param_1 & -2) * 3) + DAT_00636598);
  }
  return puVar2;
}


 export function FUN_005b898b (param_1, param_2, param_3)

 {
  return (((((DAT_006d1160) << 16 >> 16) >> 1) * param_2 + s32((DAT_006365c0 + param_3 * 4), 0)) + (param_1 >> 1))
  ;
}


 export function FUN_005b89bb (param_1, param_2)

 {
  let puVar1;

  puVar1 = FUN_005b8931(param_1, param_2);
  return ((((puVar1 >>> 8) << 8) | _MEM[puVar1]) & -0xf1);
}


 export function FUN_005b89e4 (param_1, param_2)

 {
  let cVar1;

  cVar1 = FUN_005b89bb(param_1, param_2);
  return (cVar1 === 0xa);
}


 export function FUN_005b8a1d (param_1, param_2)

 {
  let iVar1;
  let local_8;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 === 0)) {
    local_8 = -1;
  }
  else {
    iVar1 = FUN_005b8931(param_1, param_2);
    local_8 = (u8(_MEM[(iVar1 + 5)]) >> 4);
    if ((local_8 === 0xf)) {
      local_8 = -1;
    }
  }
  return local_8;
}


 export function FUN_005b8a81 (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_005b8931(param_1, param_2);
  return _MEM[(iVar1 + 3)];
}


 export function FUN_005b8aa8 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  local_8 = -1;
  iVar1 = FUN_005b89e4(param_1, param_2);
  if ((iVar1 === 0)) {
    local_8 = FUN_005b8a81(param_1, param_2);
  }
  return local_8;
}


 export function FUN_005b8af0 (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_005b8931(param_1, param_2);
  return (u8(_MEM[(iVar1 + 2)]) >> 5);
}


 export function FUN_005b8b1a (param_1, param_2, param_3)

 {
  let iVar1;

  if ((param_3 !== 0)) {
    iVar1 = FUN_005b8931(param_1, param_2, param_3, 0, 1);
    FUN_005b9d81(param_1, param_2, _MEM[(iVar1 + 1)]);
  }
  return;
}


 export function FUN_005b8b65 (param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;

  if ((param_3 < 0)) {
    uVar1 = 1;
  }
  else {
    iVar2 = FUN_005b8931(param_1, param_2);
    uVar1 = (u8(_MEM[(iVar2 + 4)]) & (1 << (((param_3) & 0xFF) & 0x1f)));
  }
  return uVar1;
}


 export function FUN_005b8bac (param_1, param_2, param_3, param_4)

 {
  if ((-1 < param_3)) {
    if ((param_4 === 0)) {
      FUN_005b976d(param_1, param_2, (1 << (((param_3) & 0xFF) & 0x1f)), 0, 1);
    }
    else {
      FUN_005b976d(param_1, param_2, (1 << (((param_3) & 0xFF) & 0x1f)), 1, 1);
    }
  }
  return;
}


 export function FUN_005b8c18 (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_005b8931(param_1, param_2);
  return (_MEM[(iVar1 + 5)] & 0xf);
}


 export function FUN_005b8c42 (param_1, param_2)

 {
  let local_8;

  local_8 = FUN_005b8af0(param_1, param_2);
  if ((local_8 < 9)) {
    local_8 = 8;
  }
  return local_8;
}


 export function FUN_005b8ca6 (param_1, param_2)

 {
  let bVar1;
  let iVar2;
  let uVar3;

  iVar2 = FUN_004087c0(param_1, param_2);
  if ((iVar2 === 0)) {
    uVar3 = -1;
  }
  else {
    bVar1 = FUN_005b94d5(param_1, param_2);
    if (((bVar1 & 0x42) === 2)) {
      uVar3 = FUN_005b8a1d(param_1, param_2);
    }
    else {
      uVar3 = -1;
    }
  }
  return uVar3;
}


 export function FUN_005b8d15 (param_1, param_2)

 {
  let bVar1;
  let uVar2;

  bVar1 = FUN_005b94d5(param_1, param_2);
  if (((bVar1 & 0x42) === 0x42)) {
    uVar2 = FUN_005b8a1d(param_1, param_2);
  }
  else {
    uVar2 = -1;
  }
  return uVar2;
}


 export function FUN_005b8d62 (param_1, param_2)

 {
  let uVar1;
  let uVar2;

  uVar1 = FUN_005b94d5(param_1, param_2);
  if (((uVar1 & 1) === 0)) {
    uVar2 = -1;
  }
  else {
    uVar2 = FUN_005b8a1d(param_1, param_2);
  }
  return uVar2;
}


 export function FUN_005b8da4 (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_005b8ca6(param_1, param_2);
  if ((iVar1 < 0)) {
    iVar1 = FUN_005b8d62(param_1, param_2);
  }
  return iVar1;
}


 export function FUN_005b8dec (param_1, param_2, param_3)

 {
  let iVar1;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 !== param_3)) {
    if (((_MEM[DAT_0064c6c0 + (param_3 * 0x594 + iVar1 * 4)] & 8) !== 0)) {
      return -1;
    }
    if (((_MEM[DAT_0064c6c0 + (param_3 * 0x594 + iVar1 * 4)] & 4) !== 0)) {
      return iVar1;
    }
  }
  return -1;
}


 export function FUN_005b8ee1 (param_1, param_2)

 {
  let iVar1;
  let pbVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let local_8;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 === 0)) {
    local_8 = 0;
  }
  else {
    pbVar2 = FUN_005b8931(param_1, param_2);
    if (((_MEM[pbVar2] & 0x40) === 0)) {
      if (((_MEM[pbVar2] & 0xf) === 2)) {
        local_8 = 0;
      }
      else {
        uVar3 = ((param_2 + param_1) >> 1);
        uVar4 = (param_1 - ((param_2 + param_1) >> 1));
        if ((((uVar3 & 3) + (uVar4 & 3) * 4) === (((((param_2 + param_1) >> 3) * 0xb + (uVar4 >> 2) * 0xd) + ((DAT_006d1168) & 0xFFFF)) & 0xf))) {
          local_8 = 1;
          uVar5 = (1 << ((((DAT_006d1168 >>> 4)) & 0xFF) & 3));
          if (((uVar5 & uVar3) === (uVar5 & uVar4))) {
            local_8 = 2;
          }
        }
        else {
          local_8 = 0;
        }
      }
    }
    else {
      local_8 = 0;
    }
  }
  return local_8;
}


 export function FUN_005b8ffa (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let uVar3;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 === 0)) {
    uVar2 = 0;
  }
  else {
    iVar1 = FUN_005b89e4(param_1, param_2);
    if ((iVar1 === 0)) {
      iVar1 = FUN_005b8a1d(param_1, param_2);
      if ((iVar1 < 0)) {
        uVar3 = (param_1 - ((param_1 + param_2) >> 1));
        if ((((((param_1 + param_2) >> 1) & 3) + (uVar3 & 3) * 4) === ((((((param_1 + param_2) >> 3) * 0xb + (uVar3 >> 2) * 0xd) + ((DAT_006d1168) & 0xFFFF)) + 8) & 0x1f))) {
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
  return uVar2;
}


 export function FUN_005b90df (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let local_8;

  iVar1 = FUN_004087c0(param_1, param_2);
  if (((uVar2 & 0x80) === 0)) {
    FUN_005b94fc(param_1, param_2, 0x80, 1, 1);
    for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      FUN_005b8b1a(param_1, param_2, local_8);
    }
    wv(DAT_00655b12, (DAT_00655b12 + 1));
  }
  return;
}


 export function FUN_005b9179 (param_1, param_2)

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let local_18;
  let local_8;

  iVar2 = FUN_004087c0(param_1, param_2);
  if ((iVar2 !== 0)) {
    FUN_005b9ec6();
    for (/* cond: (local_8 < 9) */); local_8 = (local_8 < 9); local_8 = (local_8 + 1)) {
      uVar3 = FUN_005ae052((s8(_MEM[DAT_00628350 + local_8]) + param_1));
      iVar2 = (s8(_MEM[DAT_00628360 + local_8]) + param_2);
      iVar4 = FUN_004087c0(uVar3, iVar2);
      if ((iVar4 !== 0)) {
        iVar4 = FUN_0043cf76(uVar3, iVar2);
        if ((iVar4 < 0)) {
          iVar4 = FUN_005b89e4(uVar3, iVar2);
          if ((iVar4 === 0)) {
            iVar4 = FUN_005b8931(uVar3, iVar2);
            bVar1 = FUN_005b94d5(uVar3, iVar2);
            if (((bVar1 & 0x42) === 0x40)) {
              FUN_005b94fc(uVar3, iVar2, 0x40, 0, 1);
            }
            uVar5 = _rand();
            uVar6 = (uVar5 >> 0x1f);
            if ((((((uVar5 ^ uVar6) - uVar6) & 1) ^ uVar6) !== uVar6)) {
              FUN_005b94fc(uVar3, iVar2, 0x20, 0, 1);
            }
            if (((_MEM[(iVar4 + 1)] & 4) === 0)) {
              uVar5 = _rand();
              uVar6 = (uVar5 >> 0x1f);
              if ((((((uVar5 ^ uVar6) - uVar6) & 1) ^ uVar6) !== uVar6)) {
                FUN_005b94fc(uVar3, iVar2, 8, 0, 1);
              }
              uVar5 = _rand();
              uVar6 = (uVar5 >> 0x1f);
              if ((((((uVar5 ^ uVar6) - uVar6) & 1) ^ uVar6) !== uVar6)) {
                FUN_005b94fc(uVar3, iVar2, 4, 0, 1);
              }
            }
            else {
              uVar5 = _rand();
              uVar6 = (uVar5 >> 0x1f);
              if ((((((uVar5 ^ uVar6) - uVar6) & 1) ^ uVar6) !== uVar6)) {
                FUN_005b94fc(uVar3, iVar2, 8, 0, 1);
              }
            }
            for (/* cond: (local_18 < 8) */); local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
              FUN_005b8b1a(uVar3, iVar2, local_18);
            }
            iVar4 = _rand();
            if (((iVar4 % 3) !== 0)) {
              FUN_005b90df(uVar3, iVar2);
            }
            FUN_0047cea6(uVar3, iVar2);
          }
        }
        else {
          _MEM[DAT_0064f349 + iVar4 * 0x58] = (_MEM[DAT_0064f349 + iVar4 * 0x58] - (_MEM[DAT_0064f349 + iVar4 * 0x58] >> 1));
          FUN_0047ce1e(uVar3, iVar2, 0, DAT_006d1da0, 1);
        }
      }
    }
    FUN_005b9f1c();
  }
  return;
}


 export function FUN_005b9431 (param_1, param_2)

 {
  let local_c;
  let local_8;

  FUN_005ae3bf(param_2, DAT_fffffff4, DAT_fffffff8);
  return ((local_8 & u8(_MEM[DAT_00666137 + (local_c + param_1 * 0x10)])) !== 0);
}


 export function FUN_005b947f (param_1)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_8 = 0;
  for (/* cond: (local_c < 0x3f) */); local_c = (local_c < 0x3f); local_c = (local_c + 1)) {
    iVar1 = FUN_005b9431(local_c, param_1);
    if ((iVar1 !== 0)) {
      local_8 = (local_8 + 1);
    }
  }
  return local_8;
}


 export function FUN_005b94d5 (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_005b8931(param_1, param_2);
  return _MEM[(iVar1 + 1)];
}


 export function FUN_005b94fc (param_1, param_2, param_3, param_4, param_5)

 {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = _MEM[(iVar2 + 1)];
  if ((param_4 === 0)) {
    _MEM[(iVar2 + 1)] = (_MEM[(iVar2 + 1)] & (~((param_3) & 0xFF)));
  }
  else {
    _MEM[(iVar2 + 1)] = (_MEM[(iVar2 + 1)] | ((param_3) & 0xFF));
  }
  if ((2 < DAT_00655b02)) {
    if ((DAT_006ad69a !== 0)) {
      FUN_005b9fde(0, param_1, param_2, param_3, param_4, 0);
    }
    else if ((DAT_006ad699 !== 0)) {
      if ((DAT_006ad2f7 === 0)) {
        FUN_0046b14d(0x90, 0, param_1, param_2, param_3, param_4, 1, 0, 0, 0);
      }
      else {
        FUN_0046b14d(0x90, 0xff, param_1, param_2, param_3, param_4, 0, 0, 0, 0);
      }
    }
  }
  return;
}


 export function FUN_005b9646 (param_1, param_2, param_3, param_4)

 {
  let bVar1;
  let pbVar2;

  pbVar2 = FUN_005b8931(param_1, param_2);
  bVar1 = _MEM[pbVar2];
  _MEM[pbVar2] = (_MEM[pbVar2] & 0xf0);
  _MEM[pbVar2] = (_MEM[pbVar2] | ((param_3) & 0xFF));
  if ((2 < DAT_00655b02)) {
    if ((DAT_006ad69a !== 0)) {
      FUN_005b9fde(1, param_1, param_2, param_3, 0, 0);
    }
    else if ((DAT_006ad699 !== 0)) {
      if ((DAT_006ad2f7 === 0)) {
        FUN_0046b14d(0x91, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      }
      else {
        FUN_0046b14d(0x91, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
  return;
}


 export function FUN_005b976d (param_1, param_2, param_3, param_4, param_5)

 {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = _MEM[(iVar2 + 4)];
  if ((param_4 === 0)) {
    _MEM[(iVar2 + 4)] = (_MEM[(iVar2 + 4)] & (~((param_3) & 0xFF)));
  }
  else {
    _MEM[(iVar2 + 4)] = (_MEM[(iVar2 + 4)] | ((param_3) & 0xFF));
  }
  if ((2 < DAT_00655b02)) {
    if ((DAT_006ad69a !== 0)) {
      FUN_005b9fde(2, param_1, param_2, param_3, param_4, 0);
    }
    else if ((DAT_006ad699 !== 0)) {
      if ((DAT_006ad2f7 === 0)) {
        FUN_0046b14d(0x92, 0, param_1, param_2, param_3, param_4, 1, 0, 0, 0);
      }
      else {
        FUN_0046b14d(0x92, 0xff, param_1, param_2, param_3, param_4, 0, 0, 0, 0);
      }
    }
  }
  return;
}


 export function FUN_005b98b7 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = _MEM[(iVar2 + 5)];
  _MEM[(iVar2 + 5)] = (_MEM[(iVar2 + 5)] & 0xf0);
  _MEM[(iVar2 + 5)] = (_MEM[(iVar2 + 5)] | (((param_3) & 0xFF) & 0xf));
  if ((2 < DAT_00655b02)) {
    if ((DAT_006ad69a !== 0)) {
      FUN_005b9fde(3, param_1, param_2, param_3, 0, 0);
    }
    else if ((DAT_006ad699 !== 0)) {
      if ((DAT_006ad2f7 === 0)) {
        FUN_0046b14d(0x93, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      }
      else {
        FUN_0046b14d(0x93, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
  return;
}


 export function FUN_005b99e8 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let iVar2;

  if ((8 < param_3)) {
    param_3 = 0xf;
  }
  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = _MEM[(iVar2 + 5)];
  _MEM[(iVar2 + 5)] = (_MEM[(iVar2 + 5)] & 0xf);
  _MEM[(iVar2 + 5)] = (_MEM[(iVar2 + 5)] | (((param_3 << 4)) & 0xFF));
  if ((2 < DAT_00655b02)) {
    if ((DAT_006ad69a !== 0)) {
      FUN_005b9fde(4, param_1, param_2, param_3, 0, 0);
    }
    else if ((DAT_006ad699 !== 0)) {
      if ((DAT_006ad2f7 === 0)) {
        FUN_0046b14d(0x94, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      }
      else {
        FUN_0046b14d(0x94, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
  return;
}


 export function FUN_005b9b35 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = _MEM[(iVar2 + 3)];
  _MEM[(iVar2 + 3)] = ((param_3) & 0xFF);
  if ((2 < DAT_00655b02)) {
    if ((DAT_006ad69a !== 0)) {
      FUN_005b9fde(5, param_1, param_2, param_3, 0, 0);
    }
    else if ((DAT_006ad699 !== 0)) {
      if ((DAT_006ad2f7 === 0)) {
        FUN_0046b14d(0x95, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      }
      else {
        FUN_0046b14d(0x95, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
  return;
}


 export function FUN_005b9c49 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let iVar2;

  iVar2 = FUN_005b8931(param_1, param_2);
  cVar1 = _MEM[(iVar2 + 2)];
  _MEM[(iVar2 + 2)] = (_MEM[(iVar2 + 2)] & 0x1f);
  _MEM[(iVar2 + 2)] = (((((param_3 & 7) << 5)) & 0xFF) | _MEM[(iVar2 + 2)]);
  if ((2 < DAT_00655b02)) {
    if ((DAT_006ad69a !== 0)) {
      FUN_005b9fde(6, param_1, param_2, param_3, 0, 0);
    }
    else if ((DAT_006ad699 !== 0)) {
      if ((DAT_006ad2f7 === 0)) {
        FUN_0046b14d(0x96, 0, param_1, param_2, param_3, 1, 0, 0, 0, 0);
      }
      else {
        FUN_0046b14d(0x96, 0xff, param_1, param_2, param_3, 0, 0, 0, 0, 0);
      }
    }
  }
  return;
}


 export function FUN_005b9d81 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let bVar1;
  let pbVar2;

  pbVar2 = FUN_005b898b(param_1, param_2, param_4);
  bVar1 = _MEM[pbVar2];
  if ((param_5 === 0)) {
    _MEM[pbVar2] = param_3;
  }
  else {
    _MEM[pbVar2] = (_MEM[pbVar2] | param_3);
  }
  if ((2 < DAT_00655b02)) {
    if ((DAT_006ad69a !== 0)) {
      FUN_005b9fde(7, param_1, param_2, param_3, param_4, param_5);
    }
    else if ((DAT_006ad699 !== 0)) {
      if ((DAT_006ad2f7 === 0)) {
        FUN_0046b14d(0x97, 0, param_1, param_2, param_3, param_4, param_5, 1, 0, 0);
      }
      else {
        FUN_0046b14d(0x97, 0xff, param_1, param_2, param_3, param_4, param_5, 0, 0, 0);
      }
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005b9ec6 ()

 {
  if ((2 < DAT_00655b02)) {
    wv(DAT_006ad699, 0);
    wv(DAT_006ad69a, 1);
    _memset(DAT_006d1190, 0, 0x400);
    _DAT_006d1190 = 0;
    wv(DAT_006365f4, 1);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005b9f1c ()

 {
  if ((2 < DAT_00655b02)) {
    wv(DAT_006ad699, 1);
    wv(DAT_006ad69a, 0);
    if ((DAT_006ad2f7 === 0)) {
      if ((1 < DAT_006365f4)) {
        FUN_0046b14d(0x59, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        _memset(DAT_006d1190, 0, 0x400);
        _DAT_006d1190 = 0;
        wv(DAT_006365f4, 1);
      }
    }
    else {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_005b9fde (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  if ((DAT_006ad2f7 !== 0)) {
    FUN_005dae6b(7, s_!gNetMgr.bServer_00636634, s_D:\Ss\Franklinton\Map.cpp_00636618, 0x3de);
  }
  if (((0x100 - DAT_006365f4) < (s32((DAT_006365f8 + param_1 * 4), 0) + 1))) {
    FUN_0046b14d(0x59, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0x1388);
    _memset(DAT_006d1190, 0, 0x400);
    _DAT_006d1190 = 0;
    wv(DAT_006365f4, 1);
  }
  _DAT_006d1190 = (None + 1);
  w32((DAT_006d1190 + DAT_006365f4 * 4), 0, param_1);
  wv(DAT_006365f4, (DAT_006365f4 + 1));
  /* switch */ () {
  case 0 :
  case 2 :
    w32((DAT_006d1190 + (DAT_006365f4 + 1) * 4), 0, param_2);
    wv(DAT_006365f4, ((DAT_006365f4 + 1) + 1));
    w32((DAT_006d1190 + ((DAT_006365f4 + 1) + 1) * 4), 0, param_3);
    wv(DAT_006365f4, (((DAT_006365f4 + 1) + 1) + 1));
    w32((DAT_006d1190 + (((DAT_006365f4 + 1) + 1) + 1) * 4), 0, param_4);
    wv(DAT_006365f4, ((((DAT_006365f4 + 1) + 1) + 1) + 1));
    w32((DAT_006d1190 + ((((DAT_006365f4 + 1) + 1) + 1) + 1) * 4), 0, param_5);
    wv(DAT_006365f4, (((((DAT_006365f4 + 1) + 1) + 1) + 1) + 1));
    break;
  case 1 :
  case 3 :
  case 4 :
  case 5 :
  case 6 :
    w32((DAT_006d1190 + (DAT_006365f4 + 1) * 4), 0, param_2);
    wv(DAT_006365f4, ((DAT_006365f4 + 1) + 1));
    w32((DAT_006d1190 + ((DAT_006365f4 + 1) + 1) * 4), 0, param_3);
    wv(DAT_006365f4, (((DAT_006365f4 + 1) + 1) + 1));
    w32((DAT_006d1190 + (((DAT_006365f4 + 1) + 1) + 1) * 4), 0, param_4);
    wv(DAT_006365f4, ((((DAT_006365f4 + 1) + 1) + 1) + 1));
    break;
  case 7 :
    w32((DAT_006d1190 + (DAT_006365f4 + 1) * 4), 0, param_2);
    wv(DAT_006365f4, ((DAT_006365f4 + 1) + 1));
    w32((DAT_006d1190 + ((DAT_006365f4 + 1) + 1) * 4), 0, param_3);
    wv(DAT_006365f4, (((DAT_006365f4 + 1) + 1) + 1));
    w32((DAT_006d1190 + (((DAT_006365f4 + 1) + 1) + 1) * 4), 0, param_4);
    wv(DAT_006365f4, ((((DAT_006365f4 + 1) + 1) + 1) + 1));
    w32((DAT_006d1190 + ((((DAT_006365f4 + 1) + 1) + 1) + 1) * 4), 0, param_5);
    wv(DAT_006365f4, (((((DAT_006365f4 + 1) + 1) + 1) + 1) + 1));
    w32((DAT_006d1190 + (((((DAT_006365f4 + 1) + 1) + 1) + 1) + 1) * 4), 0, param_6);
    wv(DAT_006365f4, ((((((DAT_006365f4 + 1) + 1) + 1) + 1) + 1) + 1));
  }
  return;
}


 export function FUN_005ba206 (param_1)

 {
  let iVar1;
  let uVar2;
  let local_28;
  let local_24;
  let local_20;
  let local_10;
  let local_8;

  local_8 = 0;
  if ((2 < DAT_00655b02)) {
    if ((DAT_006ad2f7 === 0)) {
      FUN_005dae6b(7, s_gNetMgr.bServer_00636664, s_D:\Ss\Franklinton\Map.cpp_00636648, 0x416);
    }
    uVar2 = DAT_006ad699;
    wv(DAT_006ad699, 0);
    iVar1 = local_8 * 4;
    local_8 = (local_8 + 1);
    for (/* cond: (0 < local_28) */); 0 = (0 < local_28); local_28 = (local_28 + -1)) {
      iVar1 = s32((param_1 + local_8 * 4), 0);
      for (/* cond: (local_24 < (s32((DAT_006365f8 + iVar1 * 4), 0) + -1)) */); local_8 = (local_8 + 1), local_24 = (local_24 < (s32((DAT_006365f8 + iVar1 * 4), 0) + -1));
          local_24 = (local_24 + 1)) {
        w32(DAT_ffffffe0, local_24, s32((param_1 + local_8 * 4), 0));
      }
      /* switch */ () {
      case 0 :
        FUN_005b94fc(UNNAMED, UNNAMED, UNNAMED, UNNAMED, 1);
        break;
      case 1 :
        FUN_005b9646(UNNAMED, UNNAMED, UNNAMED, 1);
        break;
      case 2 :
        FUN_005b976d(UNNAMED, UNNAMED, UNNAMED, UNNAMED, 1);
        break;
      case 3 :
        FUN_005b98b7(UNNAMED, UNNAMED, UNNAMED, 1);
        break;
      case 4 :
        FUN_005b99e8(UNNAMED, UNNAMED, UNNAMED, 1);
        break;
      case 5 :
        FUN_005b9b35(UNNAMED, UNNAMED, UNNAMED, 1);
        break;
      case 6 :
        FUN_005b9c49(UNNAMED, UNNAMED, UNNAMED, 1);
        break;
      case 7 :
        FUN_005b9d81(UNNAMED, UNNAMED, UNNAMED, UNNAMED, local_10, 1);
      }
    }
    wv(DAT_006ad699, uVar2);
    FUN_004b0b53(0xff, 2, 0, 0, 0);
  }
  return;
}


 export function FUN_005bad40 (param_1)

 {
  let cVar1;
  let iVar2;
  let local_8;

  local_8 = 0;
  while ((_MEM[param_1] !== 0)) {
    cVar1 = _MEM[param_1];
    param_1 = (param_1 + 1);
    iVar2 = FID_conflict:__toupper_lk(s8(cVar1));
    if ((iVar2 === 0x31)) {
      local_8 = (local_8 * 2 + (iVar2 + -48));
    }
    else {
      for (/* cond: (_MEM[param_1] !== 0) */); param_1 = _MEM[param_1]; param_1 = (param_1 + 1)) {
      }
    }
  }
  return local_8;
}


 export function FUN_005badf0 (param_1, param_2, param_3)

 {
  let local_58;
  let local_54;

  FUN_005f22d0(DAT_ffffffac, param_2);
  for (/* cond: (_MEM[local_58] !== 0) */); local_58 = _MEM[local_58]; local_58 = (local_58 + 1)) {
  }
  if ((_MEM[local_58 + -1] !== 0x5c)) {
    FUN_005f22e0(DAT_ffffffac, DAT_006366a0);
  }
  FUN_005f22d0(param_1, DAT_ffffffac);
  FUN_005f22e0(param_1, param_3);
  __strupr(param_1);
  return param_1;
}


 export function FUN_005baeb0 (param_1)

 {
  wv(DAT_006366a8, param_1);
  return;
}


 export function FUN_005baec8 (param_1)

 {
  wv(DAT_006366ac, param_1);
  return;
}


 export function FUN_005baee0 (param_1, param_2, param_3, param_4)

 {
  wv(DAT_006366b0, param_1);
  wv(DAT_006366b4, param_2);
  if ((-1 < param_3)) {
    wv(DAT_006366b8, param_3);
  }
  if ((-1 < param_4)) {
    wv(DAT_006366bc, param_4);
  }
  return;
}


 export function FUN_005baf24 (param_1)

 {
  wv(DAT_006366c0, u8((param_1 !== 0)));
  return;
}


 export function FUN_005baf57 (param_1, param_2, param_3, param_4)

 {
  let iVar1;

  if ((-1 < DAT_006366b4)) {
    FUN_005c19ad(DAT_006366b4);
    FUN_005c0f57(DAT_006366ac, param_2, ((DAT_006366b8 + DAT_006366c0) + param_3), (DAT_006366bc + param_4), 5);
  }
  if ((-1 < DAT_006366b0)) {
    FUN_005c19ad(DAT_006366b0);
    if ((DAT_006366c0 !== 0)) {
      FUN_005c0f57(DAT_006366ac, param_2, (param_3 + 1), param_4, 5);
    }
    FUN_005c0f57(DAT_006366ac, param_2, param_3, param_4, 5);
  }
  iVar1 = FUN_0040efd0(param_2);
  return (param_3 + iVar1);
}


 export function FUN_005bb024 (param_1, param_2, param_3, param_4, param_5)

 {
  let local_8;

  local_8 = FUN_0040efd0(param_2);
  if ((-1 < DAT_006366b4)) {
    if ((DAT_006366b8 < 1)) {
      local_8 = (local_8 + ((~DAT_006366b8) + 1));
    }
    else {
      local_8 = (local_8 + DAT_006366b8);
    }
  }
  local_8 = (local_8 + DAT_006366c0);
  FUN_005baf57(param_1, param_2, (param_3 + ((param_5 >> 1) - (local_8 >> 1))), param_4);
  return local_8;
}


 export function FUN_005bb0af (param_1, param_2, param_3, param_4, param_5)

 {
  let local_8;

  local_8 = FUN_0040efd0(param_2);
  if ((-1 < DAT_006366b4)) {
    if ((DAT_006366b8 < 1)) {
      local_8 = (local_8 + ((~DAT_006366b8) + 1));
    }
    else {
      local_8 = (local_8 + DAT_006366b8);
    }
  }
  param_3 = (param_3 + (param_5 - (local_8 + DAT_006366c0)));
  FUN_005baf57(param_1, param_2, param_3, param_4);
  return param_3;
}


 export function FUN_005bb3f0 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005c5760(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_005bd65c(param_5, param_6);
  FUN_005c0cc5(param_7);
  uVar1 = FUN_00414d10();
  FUN_005e1880(in_ECX, uVar1);
  return;
}


 export function FUN_005bb463 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  FUN_005bb3f0(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
  return;
}


 export function FUN_005bb4ae (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005c57f9(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  FUN_005bd65c(param_5, param_6);
  FUN_005c0cc5(param_7);
  uVar1 = FUN_00414d10();
  FUN_005e1880(in_ECX, uVar1);
  return;
}


 export function FUN_005bb525 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  FUN_005bb4ae(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  FUN_00579b40(param_9);
  return;
}


 export function FUN_005bb574 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((in_ECX === 0)) {
    wv(DAT_00637ea4, 0);
  }
  else {
    wv(DAT_00637ea4, (in_ECX + 0x48));
  }
  FUN_005bb990();
  FUN_00408460();
  return;
}


 export function FUN_005bb5be (param_1)

 {
  let iVar1;
  let uVar2;
  let uVar3;

  iVar1 = FUN_005c0105(param_1);
  if ((iVar1 === 1)) {
    uVar2 = FUN_00407fc0(param_1);
    uVar3 = FUN_00407f90(param_1, uVar2);
    FUN_005bb8e0(uVar3, uVar2);
  }
  return (iVar1 === 1);
}


 export function FUN_005bb621 (in_ECX, param_1, param_2)

 {
  let pCVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_14;

  pCVar1 = GetActiveView(in_ECX);
  if ((pCVar1 === param_2)) {
    return;
  }
  FUN_006e7d90(DAT_ffffffec, 0, 0, param_1, param_2);
  in_ECX = in_ECX;
  uVar2 = FUN_005bb8c0();
  FUN_005c0d12(uVar2);
  if ((in_ECX === 0)) {
    wv(DAT_00637ea4, 0);
  }
  else {
    wv(DAT_00637ea4, (in_ECX + 0x48));
  }
  FUN_005bb990();
  FUN_00408460();
  return;
}


 export function FUN_005bb6c7 (param_1, param_2)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_005bb910(DAT_fffffff0, DAT_ffffffec);
  FUN_005bb950(DAT_fffffff8, DAT_fffffff4);
  if ((param_1 < local_10)) {
    param_1 = local_10;
  }
  if ((local_8 < param_1)) {
    param_1 = local_8;
  }
  if ((param_2 < local_14)) {
    param_2 = local_14;
  }
  if ((local_c < param_2)) {
    param_2 = local_c;
  }
  FUN_005bb8e0(param_1, param_2);
  return;
}


 export function FUN_005bb760 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005c589a(param_1, param_2, param_3, param_4, param_5, param_6);
  FUN_005c1b0d(param_5, param_6);
  uVar1 = FUN_00414d10();
  FUN_005e1880(in_ECX, uVar1);
  return;
}


 export function FUN_005bb7c3 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  FUN_005bb760(param_1, param_2, param_3, param_4, param_5, param_6);
  FUN_00579b40(param_7);
  return;
}


 export function FUN_005bb80a (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005c592b(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_005c1b0d(param_5, param_6);
  uVar1 = FUN_00414d10();
  FUN_005e1880(in_ECX, uVar1);
  return;
}


 export function FUN_005bb871 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  FUN_005bb80a(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
  return;
}


 export function FUN_005bb8c0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 4), 0);
}


 export function FUN_005bb8e0 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005bc505(s32((in_ECX + 8), 0), param_1, param_2);
  return;
}


 export function FUN_005bb910 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32(param_1, 0, s32((in_ECX + 0x7c), 0));
  w32(param_2, 0, s32((in_ECX + 0x80), 0));
  return;
}


 export function FUN_005bb950 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32(param_1, 0, s32((in_ECX + 0x84), 0));
  w32(param_2, 0, s32((in_ECX + 0x88), 0));
  return;
}


 export function FUN_005bb990 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x110), 0) !== 0)) {
    in_ECX = (in_ECX + 0x110);
  }
  return;
}


 export function FUN_005bb9c0 ()

 {
  let BVar1;
  let local_20;

  do {
    BVar1 = FUN_006e7e04(DAT_ffffffe0, 0, 0x200, 0x209, 1);
  } while ((BVar1 !== 0));
  do {
    BVar1 = FUN_006e7e04(DAT_ffffffe0, 0, 0x100, 0x108, 1);
  } while ((BVar1 !== 0));
  return;
}


 export function FUN_005bba1d ()

 {
  let BVar1;
  let local_20;

  do {
    BVar1 = FUN_006e7e04(DAT_ffffffe0, 0, 0, 0, 1);
  } while ((BVar1 !== 0));
  return;
}


 export function FUN_005bba4f ()

 {
  let BVar1;
  let uVar2;
  let local_20;

  BVar1 = FUN_006e7e04(DAT_ffffffe0, 0, 0, 0, 1);
  if ((BVar1 === 0)) {
    FUN_00407ff0();
    if ((DAT_00637efc !== 0)) {
      FUN_005e1c70();
    }
    uVar2 = 0;
  }
  else {
    FUN_006e7e0c(DAT_ffffffe0);
    FUN_006e7e08(DAT_ffffffe0);
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_005bbab8 ()

 {
  let BVar1;
  let local_20;

  BVar1 = FUN_006e7e04(DAT_ffffffe0, 0, 0xf, 0xf, 1);
  if ((BVar1 !== 0)) {
    FUN_006e7e0c(DAT_ffffffe0);
    FUN_006e7e08(DAT_ffffffe0);
  }
  return (BVar1 !== 0);
}


 export function FUN_005bbb0a ()

 {
  let iVar1;

  do {
    iVar1 = FUN_005bba4f();
  } while ((iVar1 !== 0));
  FUN_006e7a88();
  return;
}


 export function FUN_005bbb32 ()

 {
  let iVar1;

  do {
    iVar1 = FUN_005bbab8();
  } while ((iVar1 !== 0));
  FUN_006e7a88();
  return;
}


 export function FUN_005bbb5a (param_1)

 {
  FUN_006e7c1c(param_1, 1);
  return;
}


 export function FUN_005bbb76 ()

 {
  let BVar1;
  let local_20;

  BVar1 = FUN_006e7e04(DAT_ffffffe0, 0, 0x3bd, 0x3bd, 1);
  if ((BVar1 !== 0)) {
    FUN_006e7e0c(DAT_ffffffe0);
    FUN_006e7e08(DAT_ffffffe0);
  }
  return (BVar1 !== 0);
}


 export function FUN_005bbbce ()

 {
  let iVar1;

  do {
    iVar1 = FUN_005bbb76();
  } while ((iVar1 !== 0));
  if ((DAT_00637efc !== 0)) {
    FUN_005e1c70();
  }
  return;
}


 export function FUN_005bbc10 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  let puVar2;
  let iVar3;
  let pHVar4;
  let pHVar5;
  let pHVar6;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  local_20 = 0;
  uVar1 = FUN_005dce4f(0x4c);
  puVar2 = FUN_005dcdf9(uVar1);
  w32(puVar2, 0, uVar1);
  local_c = 0;
  local_10 = 0;
  local_14 = FUN_006e7d8c(4);
  local_18 = 0x2000000;
  if (((param_2 & 4) === 0)) {
    if (((param_2 & 0x40) !== 0)) {
      if (((param_2 & 0x40) === 0)) {
        if (((param_2 & 1) !== 0)) {
          local_18 = 0x2800000;
          local_c = FUN_006e7d8c(7);
          local_c = local_c * 2;
          local_10 = FUN_006e7d8c(8);
          local_10 = local_10 * 2;
          local_14 = (local_14 + 1);
        }
      }
      else {
        local_18 = 0x2800000;
        local_c = FUN_006e7d8c(7);
        local_c = local_c * 2;
        local_10 = FUN_006e7d8c(8);
        local_10 = local_10 * 2;
      }
    }
    else {
      local_18 = 0x2400000;
      local_c = FUN_006e7d8c(7);
      local_c = local_c * 2;
      local_10 = FUN_006e7d8c(8);
      local_10 = local_10 * 2;
    }
  }
  else {
    local_18 = 0x2040000;
    local_c = FUN_006e7d8c(0x20);
    local_c = local_c * 2;
    local_10 = FUN_006e7d8c(0x21);
    local_10 = local_10 * 2;
  }
  if (((param_2 & 8) !== 0)) {
    local_18 = (local_18 | 0x20000);
    param_2 = (param_2 | 0x40);
  }
  if (((param_2 & 0x10) !== 0)) {
    local_18 = (local_18 | 0x10000);
    param_2 = (param_2 | 0x40);
  }
  if (((param_2 & 0x20) !== 0)) {
    local_18 = (local_18 | 0x80000);
    param_2 = (param_2 | 0x40);
  }
  if (((param_2 & 0x40) === 0)) {
    local_14 = 0;
  }
  else {
    local_18 = (local_18 | 0xc00000);
  }
  if (((param_2 & 0x80) !== 0)) {
    local_18 = (local_18 | 0x200000);
    iVar3 = FUN_006e7d8c(2);
    local_c = (local_c + (iVar3 + -1));
  }
  if (((param_2 & 0x100) !== 0)) {
    local_18 = (local_18 | 0x100000);
    iVar3 = FUN_006e7d8c(3);
    local_10 = (local_10 + (iVar3 + -1));
  }
  if ((param_7 !== 0)) {
    local_18 = (local_18 | 0x44000000);
    local_20 = 4;
  }
  if (((param_2 & 0x800) !== 0)) {
    local_18 = ((local_18 & -0x40000001) | -0x80000000);
  }
  if (((param_2 & 0x400) === 0)) {
    w32(puVar2, 0xc, 0);
  }
  else {
    w32(puVar2, 0xc, 1);
  }
  if (((param_2 & 0x1000) === 0)) {
    w32(puVar2, 0xd, 0);
  }
  else {
    w32(puVar2, 0xd, 1);
  }
  if ((param_7 === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = s32((param_7 + 4), 0);
  }
  if ((param_6 === -1)) {
    local_28 = -0x80000000;
  }
  else {
    local_28 = (((local_10 + local_14) + param_6) + -1);
  }
  if ((param_5 === -1)) {
    local_2c = -0x80000000;
  }
  else {
    local_2c = (local_c + param_5);
  }
  if ((param_4 === -1)) {
    local_30 = -0x80000000;
  }
  else {
    local_30 = param_4;
  }
  if ((param_3 === -1)) {
    local_34 = -0x80000000;
  }
  else {
    local_34 = param_3;
  }
  pHVar4 = FUN_006e7d50(local_20, s_MSWindowClass_006366d0, param_1, local_18, local_34, local_30, local_2c, local_28, local_24, 0, DAT_006e4ff0, 0);
  w32(puVar2, 1, pHVar4);
  FUN_005bc1b5(s32(puVar2, 1));
  pHVar5 = FUN_006e7e10(s32(puVar2, 1));
  w32(puVar2, 2, pHVar5);
  pHVar6 = FUN_006e7dac(0, 0x7f00);
  w32(puVar2, 7, pHVar6);
  w32(puVar2, 6, 0);
  w32(puVar2, 8, 0);
  w32(puVar2, 0x11, 0);
  w32(puVar2, 5, 0);
  w32(puVar2, 3, 0);
  w32(puVar2, 9, 0);
  w32(puVar2, 0xa, 0);
  w32(puVar2, 0xb, 0);
  w32(puVar2, 0x12, param_2);
  w32(puVar2, 0xe, 0);
  w32(puVar2, 0xf, 0);
  w32(puVar2, 4, 0);
  w32(puVar2, 0x10, 8);
  return puVar2;
}


 export function FUN_005bbfee (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e14(s32((param_1 + 4), 0), param_2);
  }
  return;
}


 export function FUN_005bc019 (param_1, param_2)

 {
  w32((param_1 + 0x40), 0, param_2);
  return;
}


 export function FUN_005bc032 (param_1)

 {
  let BVar1;
  let uVar2;

  if ((param_1 === 0)) {
    uVar2 = 0;
  }
  else {
    BVar1 = FUN_006e7e18(s32((param_1 + 4), 0));
    if ((BVar1 === 0)) {
      uVar2 = 0;
    }
    else {
      uVar2 = 1;
    }
  }
  return uVar2;
}


 export function FUN_005bc07e (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7d6c(s32((param_1 + 4), 0), 0x10, 0, 0);
  }
  return;
}


 export function FUN_005bc0ab (param_1)

 {
  let uVar1;

  if ((param_1 !== 0)) {
    FUN_005bc1db(s32(param_1, 1));
    if ((s32(param_1, 0x11) === 0)) {
      if ((s32(param_1, 1) !== 0)) {
        FUN_006e7db0(s32(param_1, 1), 4, 0);
        FUN_006e7e24(s32(param_1, 1), 0);
        FUN_006e7e20(s32(param_1, 1), 0);
        FUN_006e7e1c(s32(param_1, 1));
      }
      w32(param_1, 1, 0);
    }
    if ((s32(param_1, 5) !== 0)) {
      FUN_006e7a94(s32(param_1, 5));
    }
    uVar1 = s32(param_1, 0);
    FUN_005dce29(uVar1);
    FUN_005dce96(uVar1);
  }
  return 0;
}


 export function FUN_005bc173 ()

 {
  let local_8;

  if ((DAT_006366cc !== 0)) {
    for (/* cond: (local_8 < DAT_006366cc) */); local_8 = (local_8 < DAT_006366cc); local_8 = (local_8 + 1)) {
    }
  }
  return;
}


 export function FUN_005bc1b5 (param_1)

 {
  w32((DAT_006d1db8 + DAT_006366cc * 4), 0, param_1);
  wv(DAT_006366cc, (DAT_006366cc + 1));
  return;
}


 export function FUN_005bc1db (param_1)

 {
  let local_8;

  for (/* cond: (s32((DAT_006d1db8 + local_8 * 4), 0) !== param_1) */); (local_8 = (local_8 < DAT_006366cc) && (wv(DAT_006d1db8, DAT_006d1db8)));
      local_8 = (local_8 + 1)) {
  }
  if ((local_8 < (DAT_006366cc + -1))) {
    for (/* cond: (local_8 < (DAT_006366cc + -1)) */); local_8 = (local_8 < (DAT_006366cc + -1)); local_8 = (local_8 + 1)) {
      w32((DAT_006d1db8 + local_8 * 4), 0, s32((DAT_006d1dbc + local_8 * 4), 0));
    }
  }
  wv(DAT_006366cc, (DAT_006366cc + -1));
  if (((DAT_006366cc + -1) < 0)) {
    FUN_005d225b(s_Error:_MS_window_stack_inaccurat_006366e0);
  }
  return;
}


 export function FUN_005bc280 (param_1, param_2)

 {
  let pHVar1;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((s32((param_1 + 0x14), 0) !== 0)) {
    FUN_006e7a94(s32((param_1 + 0x14), 0));
  }
  if ((DAT_00638b48 === 0)) {
    local_10 = FUN_006e7e2c(s32((param_1 + 4), 0), 0);
    FUN_00511320();
    FUN_00497c40(param_2, DAT_fffffff4, DAT_ffffffec, DAT_fffffff8);
    pHVar1 = FUN_006e7a84(((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
    w32((param_1 + 0x14), 0, pHVar1);
  }
  else {
    if ((s32((param_1 + 0x18), 0) !== 0)) {
      FUN_006e7a80(s32((param_1 + 8), 0));
    }
    pHVar1 = FUN_006e7a84((u8(param_2) | 0x1000000));
    w32((param_1 + 0x14), 0, pHVar1);
  }
  FUN_006e7e28(s32((param_1 + 4), 0), 0, 0);
  return;
}


 export function FUN_005bc35e (param_1, param_2, param_3, param_4)

 {
  let pHVar1;

  if ((s32((param_1 + 0x14), 0) !== 0)) {
    FUN_006e7a94(s32((param_1 + 0x14), 0));
  }
  pHVar1 = FUN_006e7a84(((param_4 << 16) | ((param_3 << 8) | param_2)));
  w32((param_1 + 0x14), 0, pHVar1);
  FUN_006e7e28(s32((param_1 + 4), 0), 0, 0);
  return;
}


 export function FUN_005bc3bf (param_1, param_2)

 {
  w32((param_1 + 0x24), 0, param_2);
  return;
}


 export function FUN_005bc3d8 (param_1, param_2)

 {
  w32((param_1 + 0x28), 0, param_2);
  return;
}


 export function FUN_005bc3f1 (param_1, param_2)

 {
  w32((param_1 + 0x2c), 0, param_2);
  return;
}


 export function FUN_005bc40a (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e24(s32((param_1 + 4), 0), 5);
    if (((_MEM[(param_1 + 0x49)] & 2) !== 0)) {
      FUN_006e7da0(s32((param_1 + 4), 0));
    }
  }
  return;
}


 export function FUN_005bc44d (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e24(s32((param_1 + 4), 0), 0);
  }
  return;
}


 export function FUN_005bc476 (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e30(s32((param_1 + 4), 0), param_2);
  }
  return;
}


 export function FUN_005bc4a1 (param_1, param_2, param_3)

 {
  let nHeight;
  let nWidth;
  let bRepaint;
  let local_14;

  if ((param_1 !== 0)) {
    FUN_006e7e38(s32((param_1 + 4), 0), DAT_ffffffec);
    bRepaint = 1;
    nHeight = FUN_00407fc0(DAT_ffffffec);
    nWidth = FUN_00407f90(DAT_ffffffec);
    FUN_006e7e34(s32((param_1 + 4), 0), param_2, param_3, nWidth, nHeight, bRepaint);
  }
  return;
}


 export function FUN_005bc505 (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let local_20;
  let local_18;
  let local_14;

  if ((param_1 !== 0)) {
    FUN_006e7e38(s32((param_1 + 4), 0), DAT_ffffffec);
    iVar1 = FUN_005bc9d3(param_1);
    iVar2 = FUN_005bca3d(param_1);
    local_18 = FUN_006e7e40(s32((param_1 + 4), 0));
    if (((_MEM[(param_1 + 0x49)] & 2) !== 0)) {
      local_20 = 0;
      local_20 = 0;
      FUN_006e7e3c(local_18, 0, DAT_ffffffe0, 1);
      local_14 = (UNNAMED - 0);
      local_14 = (UNNAMED - 0);
    }
    FUN_006e7e34(s32((param_1 + 4), 0), UNNAMED, UNNAMED, (param_2 + iVar1), (param_3 + iVar2), 1);
  }
  return;
}


 export function FUN_005bc5da (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e24(s32((param_1 + 4), 0), 3);
  }
  return;
}


 export function FUN_005bc603 (param_1)

 {
  let BVar1;

  if ((param_1 === 0)) {
    BVar1 = 0;
  }
  else {
    BVar1 = FUN_006e7e44(s32((param_1 + 4), 0));
  }
  return BVar1;
}


 export function FUN_005bc636 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e24(s32((param_1 + 4), 0), 6);
  }
  return;
}


 export function FUN_005bc65f (param_1)

 {
  let BVar1;

  if ((param_1 === 0)) {
    BVar1 = 0;
  }
  else {
    BVar1 = FUN_006e7d4c(s32((param_1 + 4), 0));
  }
  return BVar1;
}


 export function FUN_005bc692 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e24(s32((param_1 + 4), 0), 9);
  }
  return;
}


 export function FUN_005bc6bb (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e48(s32((param_1 + 4), 0), param_2);
  }
  return;
}


 export function FUN_005bc6e6 (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e28(s32((param_1 + 4), 0), param_2, 0);
  }
  return;
}


 export function FUN_005bc713 (param_1, param_2)

 {
  let nHeight;
  let nWidth;
  let bRepaint;

  if ((param_1 !== 0)) {
    bRepaint = 1;
    nHeight = FUN_00407fc0(param_2);
    nWidth = FUN_00407f90(param_2);
    FUN_006e7e34(s32((param_1 + 4), 0), s32(param_2, 0), s32(param_2, 1), nWidth, nHeight, bRepaint);
  }
  return;
}


 export function FUN_005bc763 (param_1, param_2, param_3)

 {
  let hWnd;
  let iVar1;
  let iVar2;
  let iVar3;
  let bRepaint;
  let local_34;
  let local_24;
  let local_20;
  let local_1c;
  let local_14;

  if ((param_1 !== 0)) {
    FUN_006e7e38(s32((param_1 + 4), 0), DAT_ffffffcc);
    hWnd = FUN_006e7e40(s32((param_1 + 4), 0));
    if ((hWnd === 0)) {
      iVar1 = FUN_006e7d8c(0);
      iVar2 = FUN_006e7d8c(1);
      iVar3 = FUN_00407f90(DAT_ffffffcc);
      local_20 = ((iVar1 - iVar3) >> 1);
      iVar1 = FUN_00407fc0(DAT_ffffffcc);
      local_24 = ((iVar2 - iVar1) >> 1);
    }
    else if (((_MEM[(param_1 + 0x49)] & 2) === 0)) {
      FUN_006e7e38(hWnd, DAT_ffffffec);
      iVar1 = FUN_00407f90(DAT_ffffffec);
      iVar2 = FUN_00407fc0(DAT_ffffffec);
      iVar3 = FUN_00407f90(DAT_ffffffcc);
      local_20 = ((iVar1 - iVar3) >> 1);
      iVar1 = FUN_00407fc0(DAT_ffffffcc);
      local_24 = ((iVar2 - iVar1) >> 1);
      local_1c = 0;
      local_1c = 0;
      FUN_006e7e3c(hWnd, 0, DAT_ffffffe4, 1);
      local_20 = (local_20 + UNNAMED);
      local_24 = (local_24 + UNNAMED);
    }
    else {
      FUN_006e7e4c(hWnd, DAT_ffffffec);
      iVar1 = FUN_00407f90(DAT_ffffffec);
      iVar2 = FUN_00407fc0(DAT_ffffffec);
      iVar3 = FUN_00407f90(DAT_ffffffcc);
      local_20 = ((iVar1 - iVar3) >> 1);
      iVar1 = FUN_00407fc0(DAT_ffffffcc);
      local_24 = ((iVar2 - iVar1) >> 1);
      if ((local_24 < 0)) {
        local_24 = 0;
      }
    }
    bRepaint = 1;
    iVar1 = FUN_00407fc0(DAT_ffffffcc);
    iVar2 = FUN_00407f90(DAT_ffffffcc);
    FUN_006e7e34(s32((param_1 + 4), 0), (local_20 + param_2), (local_24 + param_3), iVar2, iVar1, bRepaint);
  }
  return;
}


 export function FUN_005bc933 (param_1)

 {
  let local_14;

  if ((param_1 === 0)) {
    local_14 = 0;
  }
  else {
    FUN_006e7e4c(s32((param_1 + 4), 0), DAT_ffffffec);
  }
  return UNNAMED;
}


 export function FUN_005bc96b (param_1)

 {
  let local_14;

  if ((param_1 === 0)) {
    local_14 = 0;
  }
  else {
    FUN_006e7e4c(s32((param_1 + 4), 0), DAT_ffffffec);
  }
  return UNNAMED;
}


 export function FUN_005bc9a3 (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e38(s32((param_1 + 4), 0), param_2);
  }
  return;
}


 export function FUN_005bc9d3 (param_1)

 {
  let iVar1;
  let iVar2;
  let local_14;

  if ((param_1 === 0)) {
    iVar1 = 0;
  }
  else {
    FUN_006e7e38(s32((param_1 + 4), 0), DAT_ffffffec);
    iVar1 = FUN_00407f90(DAT_ffffffec);
    FUN_006e7e4c(s32((param_1 + 4), 0), DAT_ffffffec);
    iVar2 = FUN_00407f90(DAT_ffffffec);
    iVar1 = (iVar1 - iVar2);
  }
  return iVar1;
}


 export function FUN_005bca3d (param_1)

 {
  let iVar1;
  let iVar2;
  let local_14;

  if ((param_1 === 0)) {
    iVar1 = 0;
  }
  else {
    FUN_006e7e38(s32((param_1 + 4), 0), DAT_ffffffec);
    iVar1 = FUN_00407fc0(DAT_ffffffec);
    FUN_006e7e4c(s32((param_1 + 4), 0), DAT_ffffffec);
    iVar2 = FUN_00407fc0(DAT_ffffffec);
    iVar1 = (iVar1 - iVar2);
  }
  return iVar1;
}


 export function FUN_005bcaa7 (param_1)

 {
  let yBottom;
  let xRight;

  yBottom = FUN_006e7d8c(1);
  xRight = FUN_006e7d8c(0);
  FUN_006e7d90(param_1, 0, 0, xRight, yBottom);
  return;
}


 export function FUN_005bcad7 (param_1, param_2, param_3, param_4, param_5)

 {
  let local_c;

  if ((param_1 !== 0)) {
    local_c = param_2;
    local_c = param_3;
    FUN_006e7e50(s32((param_1 + 4), 0), DAT_fffffff4);
    w32(param_4, 0, param_2);
    w32(param_5, 0, param_3);
  }
  return;
}


 export function FUN_005bcb26 (param_1, param_2, param_3, param_4, param_5)

 {
  let hWndTo;
  let lpPoints;
  let cPoints;
  let local_c;

  if ((param_1 !== 0)) {
    local_c = param_2;
    local_c = param_3;
    cPoints = 1;
    lpPoints = DAT_fffffff4;
    hWndTo = FUN_006e7e40(s32((param_1 + 4), 0));
    FUN_006e7e3c(s32((param_1 + 4), 0), hWndTo, lpPoints, cPoints);
    w32(param_4, 0, param_2);
    w32(param_5, 0, param_3);
  }
  return;
}


 export function FUN_005bcb85 (param_1, param_2)

 {
  let hWndTo;
  let lpPoints;
  let cPoints;
  let local_14;
  let local_c;
  let local_8;

  if ((param_1 !== 0)) {
    FUN_006e7e38(s32((param_1 + 4), 0), param_2);
    local_14 = s32(DAT_00000000, 0);
    local_14 = s32(DAT_00000004, 0);
    local_c = s32(DAT_00000008, 0);
    local_8 = s32(DAT_0000000c, 0);
    cPoints = 2;
    lpPoints = DAT_ffffffec;
    hWndTo = FUN_006e7e40(s32((param_1 + 4), 0));
    FUN_006e7e3c(0, hWndTo, lpPoints, cPoints);
    FUN_006e7d90(param_2, s32(DAT_00000000, 0), s32(DAT_00000004, 0), local_c, local_8);
  }
  return;
}


 export function FUN_005bcc11 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  if ((param_6 !== 0)) {
    if ((DAT_00638b48 === 1)) {
      FUN_006e7a80(s32((param_6 + 8), 0));
    }
    FUN_006e7a7c(s32((param_6 + 8), 0), param_7, param_8, param_4, param_5, s32((param_1 + 4), 0), param_2, param_3, 0xcc0020);
  }
  return;
}


 export function FUN_005bcc8d (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  if ((param_6 !== 0)) {
    FUN_006e7a7c(s32((param_6 + 4), 0), param_7, param_8, param_4, param_5, s32((param_1 + 4), 0), param_2, param_3, 0xcc0020);
  }
  return;
}


 export function FUN_005bcce2 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10)

 {
  if ((param_6 !== 0)) {
    if ((DAT_00638b48 === 1)) {
      FUN_006e7a80(s32((param_6 + 8), 0));
    }
    FUN_006e7a78(s32((param_6 + 8), 0), param_7, param_8, param_9, param_10, s32((param_1 + 4), 0), param_2, param_3, param_4, param_5, 0xcc0020);
  }
  return;
}


 export function FUN_005bcd66 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10)

 {
  if ((param_6 !== 0)) {
    FUN_006e7a78(s32((param_6 + 4), 0), param_7, param_8, param_9, param_10, s32((param_1 + 4), 0), param_2, param_3, param_4, param_5, 0xcc0020);
  }
  return;
}


 export function FUN_005bcdc3 (param_1, param_2)

 {
  if ((DAT_00638b48 === 1)) {
    w32((param_1 + 0x18), 0, param_2);
    FUN_006e7a74(s32((param_1 + 8), 0), param_2, 0);
  }
  return;
}


 export function FUN_005bcdfc (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let uVar3;

  if ((param_1 !== 0)) {
    FUN_006e7e20(s32((param_1 + 4), 0), param_2);
    iVar1 = FUN_005bc96b(param_1);
    iVar2 = FUN_006e7d8c(0xf);
    uVar3 = FUN_005bc933(param_1, ((iVar1 + iVar2) + 1));
    FUN_005bc505(param_1, uVar3);
  }
  return;
}


 export function FUN_005bce5f (param_1, param_2)

 {
  let pHVar1;
  let BVar2;

  if ((param_1 !== 0)) {
    if ((s32((param_1 + 0x20), 0) !== 0)) {
      FUN_006e7e5c(s32((param_1 + 0x20), 0));
    }
    pHVar1 = FUN_006e7e58(DAT_006e4ff0, (param_2 & 0xffff));
    w32((param_1 + 0x20), 0, pHVar1);
    BVar2 = FUN_006e7e54(s32((param_1 + 4), 0));
    if ((BVar2 !== 0)) {
      FUN_006e7e28(s32((param_1 + 4), 0), 0, 0);
    }
  }
  return;
}


 export function FUN_005bceee (param_1)

 {
  let pHVar1;

  pHVar1 = FUN_006e7dac(DAT_006e4ff0, (param_1 & 0xffff));
  return pHVar1;
}


 export function FUN_005bcf1c (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e60(param_1);
  }
  return;
}


 export function FUN_005bcf40 (param_1)

 {
  FUN_006e7e64(param_1);
  return;
}


 export function FUN_005bcf5a (param_1, param_2, param_3)

 {
  if ((param_3 !== 0)) {
    FUN_006e7e64(param_2);
  }
  return;
}


 export function FUN_005bcfa0 ()

 {
  FUN_006e7d9c(1);
  return;
}


 export function FUN_005bcfb8 ()

 {
  let iVar1;

  do {
    iVar1 = FUN_006e7d9c(0);
  } while ((-1 < iVar1));
  return;
}


 export function FUN_005bcfdd (param_1, param_2, param_3)

 {
  if ((param_3 !== 0)) {
    FUN_006e7e64(s32((param_1 + 0x1c), 0));
  }
  return;
}


 export function FUN_005bd023 (param_1, param_2)

 {
  if ((param_2 !== 0)) {
    w32((param_1 + 0x1c), 0, param_2);
    FUN_006e7e64(param_2);
  }
  return;
}


 export function FUN_005bd05f (param_1, param_2)

 {
  let pHVar1;

  if ((param_1 !== 0)) {
    if ((param_2 < 0)) {
      if ((param_2 === -1)) {
        pHVar1 = FUN_006e7dac(0, 0x7f00);
        w32((param_1 + 0x1c), 0, pHVar1);
      }
      else if ((param_2 === -2)) {
        pHVar1 = FUN_006e7dac(0, 0x7f02);
        w32((param_1 + 0x1c), 0, pHVar1);
      }
    }
    else {
      pHVar1 = FUN_006e7dac(DAT_006e4ff0, (param_2 & 0xffff));
      w32((param_1 + 0x1c), 0, pHVar1);
    }
  }
  return;
}


 export function FUN_005bd0e7 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7d94(s32((param_1 + 4), 0));
    FUN_006e7da0(s32((param_1 + 4), 0));
  }
  return;
}


 export function FUN_005bd120 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7d94(s32((param_1 + 4), 0));
  }
  return;
}


 export function FUN_005bd14c (param_1, param_2)

 {
  let pHVar1;
  let BVar2;

  if ((param_1 !== 0)) {
    pHVar1 = FUN_006e7e40(s32((param_1 + 4), 0));
    BVar2 = FUN_006e7e54(pHVar1);
    if ((BVar2 !== 0)) {
      BVar2 = 0;
      pHVar1 = FUN_006e7e40(s32((param_1 + 4), 0));
      FUN_006e7e14(pHVar1, BVar2);
    }
  }
  else if ((param_2 !== 0)) {
    FUN_006e7e14(s32((param_2 + 4), 0), 0);
  }
  return;
}


 export function FUN_005bd1c5 (param_1, param_2)

 {
  let pHVar1;
  let BVar2;

  if ((param_1 !== 0)) {
    pHVar1 = FUN_006e7e40(s32((param_1 + 4), 0));
    BVar2 = FUN_006e7e54(pHVar1);
    if ((BVar2 !== 0)) {
      BVar2 = 1;
      pHVar1 = FUN_006e7e40(s32((param_1 + 4), 0));
      FUN_006e7e14(pHVar1, BVar2);
    }
  }
  else if ((param_2 !== 0)) {
    FUN_006e7e14(s32((param_2 + 4), 0), 1);
  }
  return;
}


 export function FUN_005bd248 (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    w32((param_1 + 0x38), 0, param_2);
  }
  return;
}


 export function FUN_005bd270 (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    w32((param_1 + 0x3c), 0, param_2);
  }
  return;
}


 export function FUN_005bd298 (param_1, param_2, param_3, param_4)

 {
  let BVar1;
  let local_48;
  let local_2c;
  let local_28;
  let local_24;
  let local_8;

  local_28 = 0;
  if ((param_1 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = s32((param_1 + 4), 0);
  }
  if ((param_3 === 0)) {
    local_2c = 0;
  }
  else {
    local_2c = 1;
  }
  do {
    while ((BVar1 !== 0)) {
      if ((UNNAMED === 0xa5)) {
        local_28 = 1;
        param_4 = 0;
      }
    }
  } while ((param_4 !== 0));
  return s8(local_28);
}


 export function FUN_005bd39e (param_1)

 {
  let SVar1;
  let BVar2;
  let local_24;
  let local_8;

  local_8 = 0;
  if ((param_1 === 0x200)) {
    SVar1 = FUN_006e7d80(0x11);
    local_8 = ((((SVar1) << 16 >> 16) & 0x8000) !== 0);
  }
  else if ((param_1 === 0x100)) {
    SVar1 = FUN_006e7d80(0x10);
    local_8 = ((((SVar1) << 16 >> 16) & 0x8000) !== 0);
  }
  else if ((param_1 === 0x400)) {
    while ((BVar2 !== 0)) {
      if ((UNNAMED === 0x105)) {
        local_8 = 1;
      }
      else {
        FUN_006e7e0c(DAT_ffffffdc);
        FUN_006e7e08(DAT_ffffffdc);
      }
    }
  }
  return s8(local_8);
}


 export function FUN_005bd48f (param_1, param_2, param_3)

 {
  let local_c;

  FUN_006e7d54(DAT_fffffff4);
  FUN_006e7d98(s32((param_1 + 4), 0), DAT_fffffff4);
  w32(param_2, 0, UNNAMED);
  w32(param_3, 0, UNNAMED);
  return;
}


 export function FUN_005bd4cd ()

 {
  let SVar1;

  SVar1 = FUN_006e7d64(1);
  return ((((SVar1 >>> 8)) & 0xFF) !== 0);
}


 export function FUN_005bd500 ()

 {
  let SVar1;

  SVar1 = FUN_006e7d64(2);
  return ((((SVar1 >>> 8)) & 0xFF) !== 0);
}


 export function FUN_005bd533 (param_1)

 {
  FUN_006e7d84(s32((param_1 + 4), 0));
  return;
}


 export function FUN_005bd550 ()

 {
  FUN_006e7d88();
  return;
}


 export function FUN_005bd566 (param_1, param_2)

 {
  let pHVar1;
  let uVar2;

  if ((param_1 !== 0)) {
    if ((param_2 === 0)) {
      w32((param_1 + 0x10), 0, 0);
    }
    else {
      pHVar1 = FUN_006e7e40(s32((param_2 + 4), 0));
      if ((pHVar1 === s32((param_1 + 4), 0))) {
        FUN_006e7e2c(s32((param_2 + 4), 0), 0);
        uVar2 = FUN_005bd610();
        if (((uVar2 & 0x200) === 0)) {
          FUN_005d225b(s_Window_not_SWS_ATTACHED_in_MSSet_0063672c);
        }
        else {
          w32((param_1 + 0x10), 0, s32((param_2 + 4), 0));
        }
      }
      else {
        FUN_005d225b(s_Window_not_a_child_in_MSSetTopMo_00636704);
      }
    }
  }
  return;
}


 export function FUN_005bd610 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32(in_ECX, 0);
}


 export function FUN_005bd630 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, PTR_FUN_0061d70c);
  FUN_005bd813(0);
  return in_ECX;
}


 export function FUN_005bd65c (param_1, param_2)

 {
  let local_14;

  FUN_006e7d90(DAT_ffffffec, 0, 0, param_1, param_2);
  FUN_005bd696(DAT_ffffffec);
  return;
}


 export function FUN_005bd696 (in_ECX, param_1)

 {
  let cVar1;
  let uVar2;
  let iVar3;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    cVar1 = FUN_005c54f0();
    if ((cVar1 !== 0)) {
      FUN_005c02e0();
    }
    uVar2 = FUN_005e388f(s32((in_ECX + 0x40), 0));
    w32((in_ECX + 0x40), 0, uVar2);
  }
  if ((iVar3 !== 0)) {
    FUN_005bd813(param_1);
    uVar2 = FUN_005e35b0((in_ECX + 0x24));
    w32((in_ECX + 0x40), 0, uVar2);
    if ((s32((in_ECX + 0x40), 0) !== 0)) {
      uVar2 = FUN_005e392a(s32((in_ECX + 0x40), 0));
      w32((in_ECX + 0xc), 0, uVar2);
      iVar3 = FUN_005e395a(s32((in_ECX + 0x40), 0));
      if ((iVar3 === 0)) {
        w32((in_ECX + 0x10), 0, (-s32((in_ECX + 0xc), 0)));
      }
      else {
        w32((in_ECX + 0x10), 0, s32((in_ECX + 0xc), 0));
      }
      FUN_005c01c1();
      return 1;
    }
    FUN_005dae6b(2, s_ERR_PORTALLOCFAILED_00636774, s_D:\Ss\Smeds32\Port.cpp_0063675c, 0x71);
    return 0;
  }
  FUN_005bd813(0);
  return 1;
}


 export function FUN_005bd7db (param_1, param_2, param_3, param_4)

 {
  FUN_004083f0();
  FUN_005bf930(param_1, param_2, param_3, param_4);
  return;
}


 export function FUN_005bd813 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x34), 0, 0);
  w32((in_ECX + 0x40), 0, 0);
  w32((in_ECX + 0x3c), 0, 0);
  w32((in_ECX + 0xc), 0, 0);
  w32((in_ECX + 0x10), 0, 0);
  w32((in_ECX + 0x44), 0, 1);
  if ((param_1 === 0)) {
    w32((in_ECX + 8), 0, 0);
    w32((in_ECX + 4), 0, 0);
    FUN_006e7d90((in_ECX + 0x24), 0, 0, 0, 0);
    FUN_006e7d90((in_ECX + 0x14), 0, 0, 0, 0);
  }
  else {
    w32((in_ECX + 8), 0, (s32(param_1, 3) - s32(param_1, 1)));
    w32((in_ECX + 4), 0, (s32(param_1, 2) - s32(param_1, 0)));
    FUN_006e7d90((in_ECX + 0x24), 0, 0, s32((in_ECX + 4), 0), s32((in_ECX + 8), 0));
    FUN_006e7d90((in_ECX + 0x14), 0, 0, s32((in_ECX + 4), 0), s32((in_ECX + 8), 0));
  }
  return;
}


 export function FUN_005bd915 (in_ECX)

 {
  let cVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, PTR_FUN_0061d70c);
  cVar1 = FUN_005c54f0();
  if ((cVar1 !== 0)) {
    FUN_005c02e0();
  }
  uVar2 = FUN_005e388f(s32(in_ECX, 0x10));
  w32(in_ECX, 0x10, uVar2);
  FUN_005bd813(0);
  if ((DAT_00637e58 === in_ECX)) {
    wv(DAT_00637e58, 0);
  }
  return;
}


 export function FUN_005bd987 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let pcVar1;
  let cVar2;
  let cVar3;
  let uVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let local_68;
  let local_64;
  let local_5c;
  let local_58;
  let local_54;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_37;
  let local_36;
  let local_35;
  let local_34;
  let local_30;
  let local_2c;
  let local_2a;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_38 = 0x4c;
  local_37 = 0x42;
  local_36 = 0x4d;
  local_35 = 0x53;
  local_40 = FUN_005c5540(DAT_ffffffc8, param_1);
  if ((local_40 === 0)) {
    FUN_005d2279(s_Error:_LBM_resource_not_found_-_00636788, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_006367c4, s_D:\Ss\Smeds32\Port.cpp_006367ac, 0xfa);
  }
  else {
    local_1c = FUN_005c5560(local_40);
    FUN_005dced3(local_1c, DAT_ffffffa4, 8);
    iVar5 = _strncmp(DAT_ffffffa4, DAT_006367dc, 4);
    if ((iVar5 === 0)) {
      local_1c = (local_1c + 8);
      FUN_005dced3(local_1c, DAT_ffffffa4, 4);
      iVar5 = _strncmp(DAT_ffffffa4, DAT_00636838, 4);
      local_14 = u8((iVar5 === 0));
      iVar5 = _strncmp(DAT_ffffffa4, DAT_00636840, 4);
      local_10 = u8((iVar5 === 0));
      if ((local_10 === 0)) {
        FUN_005d2279(s_Error:_LBM_Resource_is_not_a_ILB_00636848, param_1);
        FUN_005c5580(local_40);
        FUN_005c5520(local_40);
        FUN_005dae6b(4, s_ERR_BADPICFORMAT_0063688c, s_D:\Ss\Smeds32\Port.cpp_00636874, 0x111);
      }
      else {
        local_1c = (local_1c + 4);
        do {
          while ((iVar5 === 0)) {
            FUN_005dced3(local_1c, DAT_ffffffa4, 8);
            local_1c = (local_1c + 8);
            iVar5 = FUN_005c5430(local_58);
            local_58 = ((iVar5 + 1) & -2);
            iVar5 = _strncmp(DAT_ffffffa4, DAT_006368a0, 4);
            if ((iVar5 === 0));
            if ((iVar5 === 0)) {
              if ((param_4 !== 0)) {
                if ((0x100 < (param_3 + param_2))) {
                  param_3 = (0x100 - param_2);
                }
                FUN_005c6da8(param_2, param_3, local_1c);
                local_1c = (local_1c + local_58);
              }
            }
            else {
              iVar5 = _strncmp(DAT_ffffffa4, DAT_006368dc, 4);
              if ((iVar5 === 0)) {
                if (((((local_34) >> 16) & 0xFFFF) === 1)) {
                  local_34 = 0;
                }
                if ((local_10 === 0)) {
                  local_20 = (((local_34 & 0xffff) + 0xf) >> 4) * 2;
                }
                else {
                  local_20 = (((local_34 & 0xffff) + 1) & -2);
                }
                local_c = (local_34 & 0xffff);
                local_8 = (local_34 >>> 0x10);
                if ((local_2c < 5)) {
                  local_c = ((local_c + 1) & -2);
                }
                local_18 = local_8 * local_c;
                FUN_006e7d90(DAT_ffffffac, 0, 0, local_c, local_8);
                FUN_005c019d(DAT_ffffffac);
                local_44 = s32((in_ECX + 0x34), 0);
                for (/* cond: (local_3c < local_18) */); local_3c = (local_3c < local_18); local_3c = (local_3c + local_c)) {
                  if ((local_10 !== 0)) {
                    local_64 = 0;
                    cVar3 = ((param_2) & 0xFF);
                    if ((local_2a === 0)) {
                      for (/* cond: (local_64 < local_20) */); local_64 = (local_64 < local_20); local_64 = (local_64 + 1)) {
                        _MEM[(s32((in_ECX + 0x34), 0) + local_64)] = (_MEM[local_1c] + cVar3);
                        local_1c = (local_1c + 1);
                      }
                    }
                    else {
                      pcVar1 = local_1c;
                      if ((local_2a === 1)) {
                        while ((local_64 < local_20)) {
                          local_68 = s8(_MEM[local_1c]);
                          pcVar1 = (local_1c + 1);
                          if ((local_68 < 0)) {
                            if ((-128 < local_68)) {
                              cVar2 = _MEM[local_1c + 1];
                              while ((local_68 < 1)) {
                                _MEM[(s32((in_ECX + 0x34), 0) + local_64)] = (cVar2 + cVar3);
                                local_64 = (local_64 + 1);
                                local_68 = (local_68 + 1);
                              }
                            }
                          }
                          else {
                            while ((-1 < local_68)) {
                              _MEM[(s32((in_ECX + 0x34), 0) + local_64)] = (_MEM[local_1c] + cVar3);
                              local_64 = (local_64 + 1);
                              local_68 = (local_68 + -1);
                              pcVar1 = (local_1c + 1);
                            }
                          }
                        }
                      }
                    }
                  }
                  w32((in_ECX + 0x34), 0, (s32((in_ECX + 0x34), 0) + s32((in_ECX + 0xc), 0)));
                }
                FUN_005c0cc5(param_4);
                iVar5 = FUN_005e395a(s32((in_ECX + 0x40), 0));
                if ((iVar5 === 0)) {
                  FUN_005e3988(s32((in_ECX + 0x40), 0));
                }
                w32((in_ECX + 0x34), 0, local_44);
                FUN_005c5580(local_40);
                FUN_005c5520(local_40);
                return 1;
              }
              local_1c = (local_1c + local_58);
            }
          }
          FUN_005dced3(local_1c, DAT_ffffffcc, local_58);
          local_1c = (local_1c + local_58);
          uVar4 = FUN_005c5410((local_34 & 0xffff));
          local_34 = (((((local_34) >> 16) & 0xFFFF) << 16) | uVar4);
          uVar4 = FUN_005c5410((((local_34) >> 16) & 0xFFFF));
          local_34 = ((uVar4 << 16) | ((local_34) & 0xFFFF));
          uVar4 = FUN_005c5410((local_30 & 0xffff));
          local_30 = (((((local_30) >> 16) & 0xFFFF) << 16) | uVar4);
          uVar4 = FUN_005c5410((((local_30) >> 16) & 0xFFFF));
          local_30 = ((uVar4 << 16) | ((local_30) & 0xFFFF));
          uVar4 = FUN_005c5410((local_28 & 0xffff));
          local_28 = (((((local_28) >> 16) & 0xFFFF) << 16) | uVar4);
          uVar4 = FUN_005c5410((local_24 & 0xffff));
          local_24 = (((((local_24) >> 16) & 0xFFFF) << 16) | uVar4);
          uVar4 = FUN_005c5410((((local_24) >> 16) & 0xFFFF));
          local_24 = ((uVar4 << 16) | ((local_24) & 0xFFFF));
        } while ((local_2c < 9));
        FUN_005dae6b(4, s_ERR_BADPICFORMAT_006368c0, s_D:\Ss\Smeds32\Port.cpp_006368a8, 0x12a);
      }
    }
    else {
      FUN_005d2279(s_Error:_LBM_Resource_must_have_FO_006367e4, param_1);
      FUN_005c5580(local_40);
      FUN_005c5520(local_40);
      FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636824, s_D:\Ss\Smeds32\Port.cpp_0063680c, 0x104);
    }
  }
  return 0;
}


 export function FUN_005bdf7f (param_1, param_2, param_3, param_4, param_5)

 {
  let pcVar1;
  let cVar2;
  let uVar3;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  if ((param_5 === 0)) {
    for (/* cond: (local_14 < ((s16(param_2, 0)) & 0xFFFF)) */); local_14 = local_14; local_14 = (local_14 + 1)) {
      _MEM[(local_14 + param_1)] = 0;
    }
    for (/* cond: (local_6c < u8(((s16(param_2, 4)) & 0xFF))) */); local_6c = (local_6c < u8(((s16(param_2, 4)) & 0xFF))); local_6c = (local_6c + 1)) {
      FUN_005be1b3(DAT_ffffff98, param_2, param_3, param_4);
      local_70 = DAT_ffffff98;
      for (/* cond: (local_14 < ((s16(param_2, 0)) & 0xFFFF)) */); local_14 = local_14; local_14 = (local_14 + 1)) {
        uVar3 = (local_14 >> 0x1f);
        if ((((((local_14 ^ uVar3) - uVar3) & 7) ^ uVar3) === uVar3)) {
          local_18 = u8(_MEM[local_70]);
          local_70 = (local_70 + 1);
        }
        if (((local_18 & 0x80) !== 0)) {
          local_74 = (((1 << (((local_6c) & 0xFF) & 0x1f))) & 0xFF);
          _MEM[(local_14 + param_1)] = (_MEM[(local_14 + param_1)] | local_74);
        }
        local_18 = (local_18 << 1);
      }
    }
    if ((_MEM[(param_2 + 9)] === 1)) {
      FUN_005be1b3(DAT_ffffff98, param_2, param_3, param_4);
    }
  }
  else {
    local_c = 0;
    if ((((s16(param_2, 5)) & 0xFF) === 0)) {
      for (/* cond: (local_c < param_4) */); local_c = (local_c < param_4); local_c = (local_c + 1)) {
        _MEM[(local_c + param_1)] = _MEM[param_3];
        param_3 = (param_3 + 1);
      }
    }
    else {
      pcVar1 = param_3;
      if ((((s16(param_2, 5)) & 0xFF) === 1)) {
        while ((local_c < param_4)) {
          local_10 = s8(_MEM[param_3]);
          pcVar1 = (param_3 + 1);
          if ((local_10 < 0)) {
            if ((-128 < local_10)) {
              cVar2 = _MEM[param_3 + 1];
              while ((local_10 < 1)) {
                _MEM[(local_c + param_1)] = cVar2;
                local_c = (local_c + 1);
                local_10 = (local_10 + 1);
              }
            }
          }
          else {
            while ((-1 < local_10)) {
              _MEM[(local_c + param_1)] = _MEM[param_3];
              local_c = (local_c + 1);
              pcVar1 = (param_3 + 1);
              local_10 = (local_10 + -1);
            }
          }
        }
      }
    }
  }
  return;
}


 export function FUN_005be1b3 (param_1, param_2, param_3, param_4)

 {
  let pcVar1;
  let cVar2;
  let local_10;
  let local_c;

  local_c = 0;
  if ((_MEM[(param_2 + 0xa)] === 0)) {
    for (/* cond: (local_c < param_4) */); local_c = (local_c < param_4); local_c = (local_c + 1)) {
      _MEM[(local_c + param_1)] = _MEM[param_3];
      param_3 = (param_3 + 1);
    }
  }
  else {
    pcVar1 = param_3;
    if ((_MEM[(param_2 + 0xa)] === 1)) {
      while ((local_c < param_4)) {
        local_10 = s8(_MEM[param_3]);
        pcVar1 = (param_3 + 1);
        if ((local_10 < 0)) {
          if ((-128 < local_10)) {
            cVar2 = _MEM[param_3 + 1];
            while ((local_10 < 1)) {
              _MEM[(local_c + param_1)] = cVar2;
              local_c = (local_c + 1);
              local_10 = (local_10 + 1);
            }
          }
        }
        else {
          while ((-1 < local_10)) {
            _MEM[(local_c + param_1)] = _MEM[param_3];
            local_c = (local_c + 1);
            pcVar1 = (param_3 + 1);
            local_10 = (local_10 + -1);
          }
        }
      }
    }
  }
  return;
}


 export function FUN_005be2c4 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_44;
  let local_40;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1f;
  let local_1e;
  let local_1d;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_20 = 0x54;
  local_1f = 0x41;
  local_1e = 0x52;
  local_1d = 0x47;
  local_28 = FUN_005c5540(DAT_ffffffe0, param_1);
  if ((local_28 === 0)) {
    FUN_005d225b(s_Error:_Targa_file_not_found_-_006368e4);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_0063691c, s_D:\Ss\Smeds32\Port.cpp_00636904, 0x1f3);
    uVar1 = 0;
  }
  else {
    local_10 = FUN_005c5560(local_28);
    local_18 = ((s16((local_10 + 0xc), 0)) & 0xFFFF);
    local_1c = ((s16((local_10 + 0xe), 0)) & 0xFFFF);
    local_8 = local_10;
    FUN_006e7d90(DAT_ffffffc0, 0, 0, local_18, local_1c);
    iVar2 = s32(s32(in_ECX, 0), 0)(DAT_ffffffc0);
    if ((iVar2 === 0)) {
      FUN_005c5520(local_28);
      uVar1 = 0;
    }
    else {
      local_10 = (local_10 + (s8(_MEM[local_8]) + 0x12));
      if ((_MEM[local_8 + 7] === 0x18)) {
        local_c = local_10;
        for (/* cond: (local_24 < (param_3 + param_2)) */); local_24 = local_24; local_24 = (local_24 + 1))
        {
          uVar3 = (local_c >>> 8);
          FUN_005c6b93(local_24, ((uVar3 << 8) | _MEM[local_c + 2]), ((uVar3 << 8) | _MEM[local_c + 1]), ((uVar3 << 8) | _MEM[local_c]));
          local_c = (local_c + 3);
        }
        local_10 = (local_10 + ((s16((local_8 + 5), 0)) & 0xFFFF) * 3);
      }
      if ((_MEM[local_8 + 2] === 1)) {
        if (((_MEM[local_8 + 0x11] & 0x20) === 0)) {
          local_14 = FUN_005c19d3(0, (local_1c - 1));
          local_44 = (-s32(in_ECX, 4));
        }
        else {
          local_14 = FUN_005c19d3(0, 0);
          local_44 = s32(in_ECX, 4);
        }
        if ((_MEM[local_8 + 0x10] === 8)) {
          for (/* cond: (local_24 < local_1c) */); local_24 = (local_24 < local_1c); local_24 = (local_24 + 1)) {
            local_30 = local_14;
            for (/* cond: (local_2c < local_18) */); local_2c = (local_2c < local_18); local_2c = (local_2c + 1)) {
              _MEM[local_30] = (_MEM[local_10] + ((param_2) & 0xFF));
              local_10 = (local_10 + 1);
              local_30 = (local_30 + 1);
            }
            local_14 = (local_14 + local_44);
          }
        }
      }
      else if ((_MEM[local_8 + 2] === 0xa)) {
        FUN_005d225b(s_Targa_Compression_Not_Implemente_00636934);
      }
      if (((_MEM[local_8 + 0x11] & 0x10) !== 0)) {
        FUN_005d225b(s_Why_The_hell_would_anyone_want_t_0063695c);
      }
      FUN_005c0cc5(param_4);
      FUN_005c5580(local_28);
      FUN_005c5520(local_28);
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005be595 (in_ECX, unaff_ESI, unaff_EDI, unaff_EBX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  // unaff_EDI promoted to parameter;
  let unaff_FS_OFFSET;
  let in_stack_ffffff08;
  let in_stack_ffffff0c;
  let local_e0;
  let local_dc;
  let local_cc;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005be94c;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    FUN_005d225b(s_Error:_Targa_file_not_found_-_00636998);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_006369d0, s_D:\Ss\Smeds32\Port.cpp_006369b8, 0x24c);
    local_8 = -1;
    FUN_005be940();
    FUN_005be956(unaff_ESI, unaff_EBX, in_stack_ffffff08, in_stack_ffffff0c);
    return;
  }
  local_1c = FUN_005c5470();
  local_bc = ((s16((local_1c + 0xc), 0)) & 0xFFFF);
  local_c0 = ((s16((local_1c + 0xe), 0)) & 0xFFFF);
  local_14 = local_1c;
  FUN_006e7d90(DAT_ffffff24, 0, 0, local_bc, local_c0);
  iVar1 = s32(s32(in_ECX, 0), 0)(DAT_ffffff24);
  if ((iVar1 !== 0)) {
    local_1c = (local_1c + (s8(_MEM[local_14]) + 0x12));
    if ((_MEM[local_14 + 7] === 0x18)) {
      local_18 = local_1c;
      for (/* cond: (local_c4 < (param_3 + param_2)) */); local_c4 = local_c4; local_c4 = (local_c4 + 1)) {
        uVar2 = (local_18 >>> 8);
        FUN_005c6b93(local_c4, ((uVar2 << 8) | _MEM[local_18 + 2]), ((uVar2 << 8) | _MEM[local_18 + 1]), ((uVar2 << 8) | _MEM[local_18]));
        local_18 = (local_18 + 3);
      }
      local_1c = (local_1c + ((s16((local_14 + 5), 0)) & 0xFFFF) * 3);
    }
    if ((_MEM[local_14 + 2] === 1)) {
      if (((_MEM[local_14 + 0x11] & 0x20) === 0)) {
        local_b8 = FUN_005c19d3(0, (local_c0 - 1));
        local_e0 = (-s32(in_ECX, 4));
      }
      else {
        local_b8 = FUN_005c19d3(0, 0);
        local_e0 = s32(in_ECX, 4);
      }
      in_stack_ffffff08 = s8(_MEM[local_14 + 0x10]);
      if ((in_stack_ffffff08 === 8)) {
        for (/* cond: (local_c4 < local_c0) */); local_c4 = (local_c4 < local_c0); local_c4 = (local_c4 + 1)) {
          local_cc = local_b8;
          for (/* cond: (local_c8 < local_bc) */); local_c8 = (local_c8 < local_bc); local_c8 = (local_c8 + 1)) {
            _MEM[local_cc] = (_MEM[local_1c] + ((param_2) & 0xFF));
            local_1c = (local_1c + 1);
            local_cc = (local_cc + 1);
          }
          local_b8 = (local_b8 + local_e0);
        }
      }
    }
    else if ((_MEM[local_14 + 2] === 0xa)) {
      FUN_005d225b(s_Targa_Compression_Not_Implemente_006369e8);
    }
    if (((_MEM[local_14 + 0x11] & 0x10) !== 0)) {
      FUN_005d225b(s_Why_The_hell_would_anyone_want_t_00636a10);
    }
    FUN_005c0cc5(param_4);
    FUN_005c54a0();
    FUN_00421c30();
    local_8 = -1;
    FUN_005be940();
    FUN_005be956(unaff_EDI, unaff_ESI, unaff_EBX, in_stack_ffffff08);
    return;
  }
  FUN_005c54a0();
  FUN_00421c30();
  local_8 = -1;
  FUN_005be940();
  FUN_005be956(unaff_EDI, unaff_ESI, unaff_EBX, in_stack_ffffff08);
  return;
}


 export function FUN_005be940 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005be956 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005be967 (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  let local_c4;
  let local_c2;
  let local_c1;
  let local_bc;
  let local_ba;
  let local_83;
  let local_82;
  let local_44;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_27;
  let local_26;
  let local_25;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_28 = 0x50;
  local_27 = 0x43;
  local_26 = 0x58;
  local_25 = 0x53;
  local_30 = FUN_005c5540(DAT_ffffffd8, param_1);
  if ((local_30 === 0)) {
    FUN_005d2279(s_Error:_PCX_resource_not_found_-_00636a4c, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00636a88, s_D:\Ss\Smeds32\Port.cpp_00636a70, 0x2ac);
    uVar1 = 0;
  }
  else {
    local_14 = FUN_005c5560(local_30);
    local_8 = local_14;
    local_10 = FUN_005db5e9(local_30);
    FUN_005dced3(local_14, DAT_ffffff3c, 0x80);
    local_14 = (local_14 + 0x80);
    if ((local_c2 !== 0)) {
      if ((local_83 === 1)) {
        local_c = (((local_bc) << 16 >> 16) + 1);
        local_20 = (((local_ba) << 16 >> 16) + 1);
        FUN_006e7d90(DAT_ffffffbc, 0, 0, local_c, local_20);
        iVar2 = FUN_005c019d(DAT_ffffffbc);
        if ((iVar2 === 0)) {
          uVar1 = 0;
        }
        else {
          local_1c = 0;
          for (/* cond: (local_2c < local_20) */); local_2c = (local_2c < local_20); local_2c = (local_2c + 1)) {
            local_34 = FUN_005c19d3(0, local_2c);
            for (/* cond: (local_24 < ((local_82) << 16 >> 16)) */); local_24 = (local_24 < ((local_82) << 16 >> 16)); local_24 = (local_24 + 1)) {
              if ((local_1c === 0)) {
                local_18 = _MEM[local_14];
                if (((local_18 & 0xc0) === 0xc0)) {
                  local_1c = (local_18 & 0x3f);
                  local_18 = _MEM[local_14 + 1];
                  local_14 = (local_14 + 2);
                }
                else {
                  local_1c = 1;
                  local_14 = (local_14 + 1);
                }
              }
              _MEM[(local_24 + local_34)] = (local_18 + ((param_2) & 0xFF));
              local_1c = (local_1c - 1);
            }
          }
          local_10 = (((local_82) << 16 >> 16) - local_c);
          local_18 = _MEM[local_14 + (-local_10)];
          local_14 = ((local_14 + (-local_10)) + 1);
          if ((local_18 === 0xc)) {
            if ((0x100 < (param_3 + param_2))) {
              param_3 = (0x100 - param_2);
            }
            FUN_005c6da8(param_2, param_3, local_14);
            local_14 = (local_14 + 0x300);
          }
          FUN_005c0cc5(param_4);
          FUN_005c5580(local_30);
          FUN_005c5520(local_30);
          uVar1 = 1;
        }
      }
      else {
        FUN_005d2279(s_Error:_Not_a_256_color_or_1plane_00636ae8, param_1);
        FUN_005c5580(local_30);
        FUN_005c5520(local_30);
        FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636b34, s_D:\Ss\Smeds32\Port.cpp_00636b1c, 0x2c4);
        uVar1 = 0;
      }
    }
    else {
      FUN_005d2279(s_Error:_Not_a_PCX_file_-_00636aa0, param_1);
      FUN_005c5580(local_30);
      FUN_005c5520(local_30);
      FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636ad4, s_D:\Ss\Smeds32\Port.cpp_00636abc, 0x2bb);
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005bec8c (unaff_ESI, unaff_EBX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let uVar2;
  let in_stack_fffffe8c;
  let uVar3;
  let local_160;
  let local_15e;
  let local_15d;
  let local_158;
  let local_156;
  let local_11f;
  let local_11e;
  let local_e0;
  let local_d0;
  let local_cc;
  let local_c8;
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
  puStack_c = LAB_005bf056;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  uVar2 = extraout_var;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    FUN_005d225b(s_Error:_PCX_file_not_found_-_00636b48);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00636b80, s_D:\Ss\Smeds32\Port.cpp_00636b68, 0x30c);
    local_8 = -1;
    FUN_005bf04a();
    FUN_005bf060(unaff_ESI, unaff_EBX, uVar2, in_stack_fffffe8c);
    return;
  }
  local_1c = FUN_00492a80();
  local_20 = FUN_005c5470();
  local_14 = local_20;
  FUN_005dced3(local_20, DAT_fffffea0, 0x80);
  local_20 = (local_20 + 0x80);
  if ((local_15e === 0)) {
    FUN_005d225b(s_Error:_Not_a_PCX_file_-_00636b98);
    FUN_005c54a0();
    FUN_00421c30();
    FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636bcc, s_D:\Ss\Smeds32\Port.cpp_00636bb4, 0x31f);
    local_8 = -1;
    FUN_005bf04a();
    FUN_005bf060(unaff_ESI, unaff_EBX, uVar2, in_stack_fffffe8c);
    return;
  }
  if ((local_11f !== 1)) {
    FUN_005d225b(s_Error:_Not_a_256_color_or_1plane_00636be0);
    FUN_005c54a0();
    FUN_00421c30();
    FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636c2c, s_D:\Ss\Smeds32\Port.cpp_00636c14, 0x328);
    local_8 = -1;
    FUN_005bf04a();
    FUN_005bf060(unaff_ESI, unaff_EBX, uVar2, in_stack_fffffe8c);
    return;
  }
  local_18 = (((local_158) << 16 >> 16) + 1);
  local_2c = (((local_156) << 16 >> 16) + 1);
  FUN_006e7d90(DAT_ffffff20, 0, 0, local_18, local_2c);
  iVar1 = FUN_005c019d(DAT_ffffff20);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_005bf04a();
    FUN_005bf060(unaff_ESI, unaff_EBX, uVar2, in_stack_fffffe8c);
    return;
  }
  local_28 = 0;
  for (/* cond: (local_cc < local_2c) */); local_cc = (local_cc < local_2c); local_cc = (local_cc + 1)) {
    local_d0 = FUN_005c19d3(0, local_cc);
    for (/* cond: (local_c8 < ((local_11e) << 16 >> 16)) */); local_c8 = (local_c8 < ((local_11e) << 16 >> 16)); local_c8 = (local_c8 + 1)) {
      if ((local_28 === 0)) {
        local_24 = _MEM[local_20];
        if (((local_24 & 0xc0) === 0xc0)) {
          local_28 = (local_24 & 0x3f);
          local_24 = _MEM[local_20 + 1];
          local_20 = (local_20 + 2);
        }
        else {
          local_28 = 1;
          local_20 = (local_20 + 1);
        }
      }
      _MEM[(local_c8 + local_d0)] = (local_24 + ((param_2) & 0xFF));
      local_28 = (local_28 - 1);
    }
  }
  local_24 = _MEM[((local_1c + local_14) + -0x301)];
  local_20 = ((local_1c + local_14) + -0x300);
  if ((local_24 === 0xc)) {
    if ((0x100 < (param_3 + param_2))) {
      param_3 = (0x100 - param_2);
    }
    FUN_005c6da8(param_2, param_3, local_20);
    local_20 = (local_20 + 0x300);
  }
  FUN_005c0cc5(param_4);
  FUN_005c54a0();
  FUN_00421c30();
  uVar3 = 1;
  local_8 = -1;
  FUN_005bf04a();
  FUN_005bf060(unaff_ESI, unaff_EBX, uVar2, uVar3);
  return;
}


 export function FUN_005bf04a ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005bf060 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005bf071 (unaff_ESI, unaff_EBX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let iVar4;
  let in_stack_ffffff00;
  let local_dc;
  let local_cc;
  let local_c8;
  let local_c4;
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
  puStack_c = LAB_005bf5c6;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar4 = extraout_var;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_005bf5ba();
    FUN_005bf5d0(unaff_ESI, unaff_EBX, iVar4, in_stack_ffffff00);
    return;
  }
  uVar2 = FUN_00492a80();
  local_cc = FUN_005dce4f(uVar2);
  FUN_00407ff0();
  if ((local_cc === 0)) {
    local_8 = -1;
    FUN_005bf5ba();
    FUN_005bf5d0(unaff_ESI, unaff_EBX, iVar4, in_stack_ffffff00);
    return;
  }
  local_c8 = FUN_005dcdf9(local_cc);
  uVar2 = FUN_00492a80();
  FUN_004bb370(local_c8, uVar2);
  local_c8 = FUN_005dce29(local_cc);
  FUN_00407ff0();
  if ((local_cc === 0)) {
    FUN_005d237d(s_Error:_GIF_resource_not_found_-_00636c40, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00636c7c, s_D:\Ss\Smeds32\Port.cpp_00636c64, 0x382);
    local_8 = -1;
    FUN_005bf5ba();
    FUN_005bf5d0(unaff_ESI, unaff_EBX, iVar4, in_stack_ffffff00);
    return;
  }
  local_20 = FUN_005dcdf9(local_cc);
  iVar1 = _strncmp(local_20, DAT_00636c94, 3);
  if ((iVar1 !== 0)) {
    FUN_005d237d(s_Error:_Resource_is_not_a_GIF_-_00636c98, param_1);
    FUN_005dce29(local_cc);
    FUN_005dce96(local_cc);
    FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636cd0, s_D:\Ss\Smeds32\Port.cpp_00636cb8, 0x38d);
    local_8 = -1;
    FUN_005bf5ba();
    FUN_005bf5d0(unaff_ESI, unaff_EBX, iVar4, in_stack_ffffff00);
    return;
  }
  if (((_MEM[local_20 + 0xa] & 0x80) === 0)) {
    FUN_005d237d(s_Error:_GIF_contains_no_global_co_00636ce4, param_1);
    FUN_005dce29(local_cc);
    FUN_005dce96(local_cc);
    FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636d28, s_D:\Ss\Smeds32\Port.cpp_00636d10, 0x396);
    local_8 = -1;
    FUN_005bf5ba();
    FUN_005bf5d0(unaff_ESI, unaff_EBX, iVar4, in_stack_ffffff00);
    return;
  }
  uVar3 = (1 << ((_MEM[local_20 + 0xa] & 7) + 1));
  local_1c = (local_20 + 0xd);
  FUN_00407ff0();
  if ((param_4 !== 0)) {
    FUN_00407ff0();
    if ((0x100 < (param_3 + param_2))) {
      param_3 = (0x100 - param_2);
    }
    if ((uVar3 <= param_3)) {
      param_3 = uVar3;
    }
    FUN_005c6da8(param_2, param_3, local_1c);
    FUN_00407ff0();
  }
  for (/* cond: (_MEM[local_1c] === 0) */); local_1c = _MEM[local_1c]; local_1c = (local_1c + 1)) {
  }
  if ((_MEM[local_1c] !== 0x21)) {
    FUN_005d237d(s_Error:_GIF_Image_Block_not_found_00636d3c, param_1);
    FUN_005dce29(local_cc);
    FUN_005dce96(local_cc);
    FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636d78, s_D:\Ss\Smeds32\Port.cpp_00636d60, 0x3b3);
    local_8 = -1;
    FUN_005bf5ba();
    FUN_005bf5d0(unaff_ESI, unaff_EBX, iVar4, in_stack_ffffff00);
    return;
  }
  local_18 = (local_1c + 1);
  local_28 = FUN_005c54d0(s16((local_1c + 5), 0));
  local_c4 = FUN_005c54d0(s16((local_18 + 6), 0));
  if (((_MEM[local_18 + 8] & 0x80) !== 0)) {
    FUN_005d225b(s_Warning:_Skipping_local_color_ta_00636d8c);
  }
  FUN_006e7d90(DAT_ffffff24, 0, 0, local_28, local_c4);
  iVar1 = FUN_005c019d(DAT_ffffff24);
  if ((iVar1 === 0)) {
    FUN_005dce29(local_cc);
    FUN_005dce96(local_cc);
    local_8 = -1;
    FUN_005bf5ba();
    FUN_005bf5d0(unaff_ESI, unaff_EBX, iVar4, in_stack_ffffff00);
    return;
  }
  local_24 = _MEM[local_18 + 9];
  local_14 = (local_18 + 0xa);
  FUN_00407ff0();
  FUN_005e4d60(local_14, param_2, (((((s32((iVar4 + 0xc), 0) >>> 0x10)) & 0xFFFF) << 16) | u8(local_24)), s32((iVar4 + 0xc), 0), local_28, local_c4, s32((iVar4 + 0x34), 0));
  FUN_00407ff0();
  FUN_005c0cc5(param_4);
  iVar1 = FUN_005e395a(s32((iVar4 + 0x40), 0));
  if ((iVar1 === 0)) {
    FUN_005e3988(s32((iVar4 + 0x40), 0));
  }
  FUN_005dce29(local_cc);
  FUN_005dce96(local_cc);
  FUN_00421c30();
  uVar2 = 1;
  local_8 = -1;
  FUN_005bf5ba();
  FUN_005bf5d0(unaff_ESI, unaff_EBX, iVar4, uVar2);
  return;
}


 export function FUN_005bf5ba ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005bf5d0 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005bf5e1 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_38;
  let local_28;
  let local_24;
  let local_23;
  let local_22;
  let local_21;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_24 = 0x47;
  local_23 = 0x49;
  local_22 = 0x46;
  local_21 = 0x53;
  local_28 = FUN_005c5540(DAT_ffffffdc, param_1);
  if ((local_28 === 0)) {
    FUN_005d2279(s_Error:_GIF_resource_not_found_-_00636db0, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00636dec, s_D:\Ss\Smeds32\Port.cpp_00636dd4, 0x3f4);
    uVar1 = 0;
  }
  else {
    local_14 = FUN_005c5560(local_28);
    iVar2 = _strcmp(local_14, DAT_00636e04);
    if ((iVar2 === 0)) {
      FUN_005d2279(s_Error:_Resource_is_not_a_GIF_-_00636e08, param_1);
      FUN_005c5580(local_28);
      FUN_005c5520(local_28);
      FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636e40, s_D:\Ss\Smeds32\Port.cpp_00636e28, 0x3ff);
      uVar1 = 0;
    }
    else if (((_MEM[local_14 + 0xa] & 0x80) === 0)) {
      FUN_005d2279(s_Error:_GIF_contains_no_global_co_00636e54, param_1);
      FUN_005c5580(local_28);
      FUN_005c5520(local_28);
      FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636e98, s_D:\Ss\Smeds32\Port.cpp_00636e80, 0x408);
      uVar1 = 0;
    }
    else {
      uVar3 = (1 << ((_MEM[local_14 + 0xa] & 7) + 1));
      local_10 = (local_14 + 0xd);
      if ((param_4 !== 0)) {
        if ((0x100 < (param_3 + param_2))) {
          param_3 = (0x100 - param_2);
        }
        if ((uVar3 <= param_3)) {
          param_3 = uVar3;
        }
        FUN_005c6da8(param_2, param_3, local_10);
      }
      FUN_00407ff0();
      for (/* cond: (_MEM[local_10] === 0) */); local_10 = _MEM[local_10]; local_10 = (local_10 + 1)) {
      }
      if ((_MEM[local_10] === 0x21)) {
        local_c = (local_10 + 1);
        local_1c = FUN_005c54d0(s16((local_10 + 5), 0));
        local_20 = FUN_005c54d0(s16((local_c + 6), 0));
        if (((_MEM[local_c + 8] & 0x80) !== 0)) {
          FUN_005d225b(s_Warning:_Skipping_local_color_ta_00636efc);
        }
        FUN_006e7d90(DAT_ffffffc8, 0, 0, local_1c, local_20);
        FUN_005c019d(DAT_ffffffc8);
        local_18 = _MEM[local_c + 9];
        local_8 = (local_c + 0xa);
        FUN_00407ff0();
        FUN_005e4d60(local_8, param_2, (((((s32((in_ECX + 0xc), 0) >>> 0x10)) & 0xFFFF) << 16) | u8(local_18)), s32((in_ECX + 0xc), 0), local_1c, local_20, s32((in_ECX + 0x34), 0));
        FUN_00407ff0();
        FUN_005c0cc5(param_4);
        iVar2 = FUN_005e395a(s32((in_ECX + 0x40), 0));
        if ((iVar2 === 0)) {
          FUN_005e3988(s32((in_ECX + 0x40), 0));
        }
        FUN_005c5580(local_28);
        FUN_005c5520(local_28);
        uVar1 = 1;
      }
      else {
        FUN_005d2279(s_Error:_GIF_Image_Block_not_found_00636eac, param_1);
        FUN_005c5580(local_28);
        FUN_005c5520(local_28);
        FUN_005dae6b(4, s_ERR_BADPICFORMAT_00636ee8, s_D:\Ss\Smeds32\Port.cpp_00636ed0, 0x424);
        uVar1 = 0;
      }
    }
  }
  return uVar1;
}


 export function FUN_005bf930 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let bVar1;
  let uVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_30;
  let local_20;
  let local_1c;
  let local_1b;
  let local_1a;
  let local_19;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_1c = 0x43;
  local_1b = 0x76;
  local_1a = 0x50;
  local_19 = 0x63;
  local_20 = FUN_005c5540(DAT_ffffffe4, param_1);
  if ((local_20 === 0)) {
    FUN_005d2279(s_Error:_Picture_resource_not_foun_00636f20, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00636f60, s_D:\Ss\Smeds32\Port.cpp_00636f48, 0x459);
    uVar2 = 0;
  }
  else {
    local_c = FUN_005c5560(local_20);
    local_14 = FUN_005c5410(((s16(local_c, 0)) << 16 >> 16));
    local_18 = FUN_005c5410(((s16(local_c, 1)) << 16 >> 16));
    FUN_006e7d90(DAT_ffffffd0, 0, 0, local_14, local_18);
    iVar3 = FUN_005c019d(DAT_ffffffd0);
    if ((iVar3 === 0)) {
      FUN_005c5520(local_20);
      uVar2 = 0;
    }
    else {
      bVar1 = _MEM[(local_c + 5)];
      local_10 = (local_c + 3);
      if ((param_4 !== 0)) {
        FUN_005c6da8(param_2, param_3, local_10);
      }
      local_8 = (local_c + ((u8(bVar1) + 1) * 3 + 6));
      FUN_005e4d60(local_8, param_2, ((s16(local_c, 2)) & 0xFF), s32((in_ECX + 0xc), 0), local_14, local_18, s32((in_ECX + 0x34), 0));
      FUN_005c0cc5(param_4);
      iVar3 = FUN_005e395a(s32((in_ECX + 0x40), 0));
      if ((iVar3 === 0)) {
        FUN_005e3988(s32((in_ECX + 0x40), 0));
      }
      FUN_005c5580(local_20);
      FUN_005c5520(local_20);
      uVar2 = 1;
    }
  }
  return uVar2;
}


 export function FUN_005bfad9 (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_38;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_24 = FUN_005db2f8(param_1);
  if ((local_24 === 0)) {
    FUN_005d2279(s_Error:_Bitmap_resource_not_found_00636f78, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00636fb4, s_D:\Ss\Smeds32\Port.cpp_00636f9c, 0x495);
    uVar1 = 0;
  }
  else {
    local_c = FUN_005c5560(local_24);
    local_18 = s32((local_c + 4), 0);
    local_1c = s32((local_c + 8), 0);
    FUN_006e7d90(DAT_ffffffc8, 0, 0, local_18, local_1c);
    iVar2 = FUN_005c019d(DAT_ffffffc8);
    if ((iVar2 === 0)) {
      FUN_005c5520(local_24);
      uVar1 = 0;
    }
    else if ((s16((local_c + 0xe), 0) === 8)) {
      if ((s32((local_c + 0x10), 0) === 0)) {
        local_10 = (local_c + 0x28);
        if ((param_4 !== 0)) {
          for (/* cond: (local_20 < (param_3 + param_2)) */); local_20 = (local_20 < (param_3 + param_2)); local_20 = (local_20 + 1)) {
            uVar3 = (local_10 >>> 8);
            FUN_005c6b93(local_20, ((uVar3 << 8) | _MEM[local_10 + 2]), ((uVar3 << 8) | _MEM[local_10 + 1]), ((uVar3 << 8) | _MEM[local_10]));
            local_10 = (local_10 + 4);
          }
        }
        local_18 = FUN_005c55a0(local_18);
        local_8 = (local_c + 0x428);
        for (/* cond: (local_20 <= local_1c) */); local_20 = (local_20 <= local_1c); local_20 = (local_20 + 1)) {
          local_14 = FUN_005c19d3(0, (local_1c - local_20));
          local_10 = local_8;
          for (/* cond: (local_28 < local_18) */); local_28 = (local_28 < local_18); local_28 = (local_28 + 1)) {
            _MEM[local_14] = (_MEM[local_10] + ((param_2) & 0xFF));
            local_10 = (local_10 + 1);
            local_14 = (local_14 + 1);
          }
          local_8 = (local_8 + local_18);
        }
        FUN_005c0cc5(param_4);
        FUN_005c5580(local_24);
        FUN_005c5520(local_24);
        uVar1 = 1;
      }
      else {
        FUN_005d2279(s_Error:_Bitmap_compression_not_su_00636ff4, param_1);
        uVar1 = 0;
      }
    }
    else {
      FUN_005d2279(s_Error:_Bitmap_resource_not_suppo_00636fcc, param_1);
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005bfcff (unaff_ESI, unaff_EBX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let uVar2;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let iVar3;
  let in_stack_ffffff0c;
  let uVar4;
  let local_dc;
  let local_cc;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005c0019;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar3 = extraout_var;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    FUN_005d225b(s_Error:_Bitmap_file_not_found_-_00637020);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00637058, s_D:\Ss\Smeds32\Port.cpp_00637040, 0x4e1);
    local_8 = -1;
    FUN_005c000d();
    FUN_005c0023(unaff_ESI, unaff_EBX, iVar3, in_stack_ffffff0c);
    return;
  }
  iVar1 = FUN_005c5470();
  local_18 = (iVar1 + 0xe);
  local_24 = s32((iVar1 + 0x12), 0);
  local_c0 = s32((iVar1 + 0x16), 0);
  FUN_006e7d90(DAT_ffffff24, 0, 0, local_24, local_c0);
  iVar1 = FUN_005c019d(DAT_ffffff24);
  if ((iVar1 === 0)) {
    FUN_005c5520(local_c8);
    local_8 = -1;
    FUN_005c000d();
    FUN_005c0023(unaff_ESI, unaff_EBX, iVar3, in_stack_ffffff0c);
    return;
  }
  if ((s16((local_18 + 0xe), 0) !== 8)) {
    FUN_005d225b(s_Error:_Bitmap_resource_not_suppo_00637070);
    local_8 = -1;
    FUN_005c000d();
    FUN_005c0023(unaff_ESI, unaff_EBX, iVar3, in_stack_ffffff0c);
    return;
  }
  if ((s32((local_18 + 0x10), 0) !== 0)) {
    FUN_005d225b(s_Error:_Bitmap_compression_not_su_00637098);
    local_8 = -1;
    FUN_005c000d();
    FUN_005c0023(unaff_ESI, unaff_EBX, iVar3, in_stack_ffffff0c);
    return;
  }
  local_1c = (local_18 + 0x28);
  if ((param_4 !== 0)) {
    for (/* cond: (local_c4 < (param_3 + param_2)) */); local_c4 = (local_c4 < (param_3 + param_2)); local_c4 = (local_c4 + 1)) {
      uVar2 = (local_1c >>> 8);
      FUN_005c6b93(local_c4, ((uVar2 << 8) | _MEM[local_1c + 2]), ((uVar2 << 8) | _MEM[local_1c + 1]), ((uVar2 << 8) | _MEM[local_1c]));
      local_1c = (local_1c + 4);
    }
  }
  local_24 = FUN_005c55a0(local_24);
  local_14 = (local_18 + 0x428);
  for (/* cond: (local_c4 <= local_c0) */); local_c4 = (local_c4 <= local_c0); local_c4 = (local_c4 + 1)) {
    local_20 = FUN_005c19d3(0, (local_c0 - local_c4));
    local_1c = local_14;
    for (/* cond: (local_cc < local_24) */); local_cc = (local_cc < local_24); local_cc = (local_cc + 1)) {
      _MEM[local_20] = (_MEM[local_1c] + ((param_2) & 0xFF));
      local_1c = (local_1c + 1);
      local_20 = (local_20 + 1);
    }
    local_14 = (local_14 + s32((iVar3 + 0xc), 0));
  }
  FUN_005c0cc5(param_4);
  FUN_005c54a0();
  FUN_00421c30();
  uVar4 = 1;
  local_8 = -1;
  FUN_005c000d();
  FUN_005c0023(unaff_ESI, unaff_EBX, iVar3, uVar4);
  return;
}
