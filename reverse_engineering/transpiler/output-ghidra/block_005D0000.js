// Block 0x005D0000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 370

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_005d056c (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let BVar7;
  let uVar8;
  let pCVar9;
  let uVar10;
  // in_ECX promoted to parameter;
  let local_30;
  let local_2c;
  let local_28;
  let local_1c;
  let local_c;
  let local_8;

  if ((param_3 === -1)) {
    param_3 = ((s32(in_ECX, 0xc)) & 0xFF);
  }
  else {
  }
  local_8 = (s32(in_ECX, 4) - s32(in_ECX, 0));
  iVar1 = (s32(in_ECX, 5) - s32(in_ECX, 1));
  iVar2 = FUN_004a6980();
  if (((iVar2 * DAT_00637f98 / DAT_00637f9c | 0) < 0x401)) iVar2 = FUN_004bb540() iVar2 = iVar2 * DAT_00637f98 {
    iVar2 = FUN_005d1d00(local_8, 0, 1);
    iVar3 = FUN_005d1d00(iVar1, 0, 1);
    iVar4 = FUN_005d1d00(s32(in_ECX, 8), 0, 0);
    local_28 = ((iVar2 + iVar4) + param_4);
    iVar4 = FUN_005d1d00(s32(in_ECX, 9), 0, 0);
    local_2c = ((iVar3 + iVar4) + param_5);
    uVar5 = FUN_00451860(iVar3, 0);
    iVar4 = FUN_005d1d00(uVar5);
    uVar5 = FUN_00451830(iVar2, 0);
    iVar6 = FUN_005d1d00(uVar5);
    FUN_006e7d90(DAT_ffffffe4, 0, 0, iVar6, iVar4);
    FUN_006e7da4(DAT_ffffffe4, local_28, local_2c);
    BVar7 = FUN_006e7d48(DAT_ffffffe4, DAT_ffffffe4, (param_2 + 0x14));
    if ((BVar7 !== 0)) {
      local_30 = 0;
      uVar5 = FUN_00407f90(DAT_ffffffe4);
      if ((local_28 < UNNAMED)) left {
        local_30 = (UNNAMED - local_28);
        local_28 = UNNAMED;
      }
      local_c = 0;
      uVar8 = FUN_00407fc0(DAT_ffffffe4);
      if ((local_2c < UNNAMED)) top {
        local_c = (UNNAMED - local_2c);
        local_2c = UNNAMED;
      }
      iVar4 = local_c;
      iVar6 = local_8;
      pCVar9 = GetActiveView(param_2);
      uVar10 = GetCheckStyle(param_2);
      iVar1 = FUN_005e395a(uVar10, pCVar9, uVar5, uVar8, local_30, iVar4, iVar6, iVar1, iVar2, iVar3);
      iVar2 = FUN_005c55d0();
      uVar5 = FUN_005c5640(DAT_006e47c8, UNNAMED, local_28, local_2c, (((-u8((iVar1 === 0))) & -2) + 1) * iVar2);
      FUN_005e518e(s32(in_ECX, 0xe), uVar5);
    }
    w32(param_1, 0, UNNAMED);
    w32(param_1, 1, UNNAMED);
    w32(param_1, 2, UNNAMED);
    w32(param_1, 3, UNNAMED);
    return param_1;
  }
  FUN_005d225b(s_Error:_Sprite_size_exceeds_scale_006381cc);
  FUN_006e7d90(DAT_ffffffe4, 0, 0, 0, 0);
  w32(param_1, 0, UNNAMED);
  w32(param_1, 1, UNNAMED);
  w32(param_1, 2, UNNAMED);
  w32(param_1, 3, UNNAMED);
  return param_1;
}


 export function FUN_005d080d (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let xRight;
  let BVar7;
  let uVar8;
  // in_ECX promoted to parameter;
  let local_34;
  let local_2c;
  let local_28;
  let local_1c;
  let local_c;
  let local_8;

  if ((param_3 === -1)) {
    param_3 = ((s32(in_ECX, 0xc)) & 0xFF);
  }
  else {
  }
  local_8 = (s32(in_ECX, 4) - s32(in_ECX, 0));
  iVar1 = s32(in_ECX, 5);
  iVar2 = s32(in_ECX, 1);
  iVar3 = FUN_004a6980();
  if (((iVar3 * DAT_00637f98 / DAT_00637f9c | 0) < 0x401)) iVar3 = FUN_004bb540() iVar3 = iVar3 * DAT_00637f98 {
    iVar3 = FUN_005d1d00(local_8, 0, 1);
    iVar4 = FUN_005d1d00((iVar1 - iVar2), 0, 1);
    iVar5 = FUN_005d1d00(s32(in_ECX, 8), 0, 0);
    local_28 = ((param_4 + iVar5) + iVar3);
    iVar5 = FUN_005d1d00(s32(in_ECX, 9), 0, 0);
    local_2c = ((param_5 + iVar5) + iVar4);
    uVar6 = FUN_00451860(iVar4, 0);
    iVar5 = FUN_005d1d00(uVar6);
    uVar6 = FUN_00451830(iVar3, 0);
    xRight = FUN_005d1d00(uVar6);
    FUN_006e7d90(DAT_ffffffe4, 0, 0, xRight, iVar5);
    FUN_006e7da4(DAT_ffffffe4, local_28, local_2c);
    BVar7 = FUN_006e7d48(DAT_ffffffe4, DAT_ffffffe4, (param_2 + 0x10));
    if ((BVar7 !== 0)) {
      local_34 = 0;
      uVar6 = FUN_00407f90(DAT_ffffffe4);
      if ((local_28 < UNNAMED)) left {
        local_34 = (UNNAMED - local_28);
        local_28 = UNNAMED;
      }
      local_c = 0;
      uVar8 = FUN_00407fc0(DAT_ffffffe4);
      if ((local_2c < UNNAMED)) top {
        local_c = (UNNAMED - local_2c);
        local_2c = UNNAMED;
      }
      iVar5 = FUN_005e6188();
      if ((iVar5 !== 0)) {
        uVar6 = FUN_005c5660(uVar6, uVar8, local_34, local_c, local_8, (iVar1 - iVar2), iVar3, iVar4);
        uVar6 = FUN_005c56a0(uVar6);
        FUN_005e518e(s32(in_ECX, 0xe), iVar5, DAT_006e47c8, UNNAMED, local_28, local_2c, uVar6);
        param_2 = ~_Timevec(param_2);
      }
    }
    w32(param_1, 0, UNNAMED);
    w32(param_1, 1, UNNAMED);
    w32(param_1, 2, UNNAMED);
    w32(param_1, 3, UNNAMED);
    return param_1;
  }
  FUN_005d225b(s_Error:_Sprite_size_exceeds_scale_006381f8);
  FUN_006e7d90(DAT_ffffffe4, 0, 0, 0, 0);
  w32(param_1, 0, UNNAMED);
  w32(param_1, 1, UNNAMED);
  w32(param_1, 2, UNNAMED);
  w32(param_1, 3, UNNAMED);
  return param_1;
}


 export function FUN_005d0aac (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let BVar7;
  let uVar8;
  let pCVar9;
  let uVar10;
  // in_ECX promoted to parameter;
  let local_30;
  let local_2c;
  let local_28;
  let local_1c;
  let local_c;
  let local_8;

  if ((param_3 === -1)) {
    param_3 = ((s32(in_ECX, 0xc)) & 0xFF);
  }
  else {
  }
  local_8 = (s32(in_ECX, 4) - s32(in_ECX, 0));
  iVar1 = (s32(in_ECX, 5) - s32(in_ECX, 1));
  iVar2 = FUN_004a6980();
  if (((iVar2 * DAT_00637fa8 / DAT_00637fac | 0) < 0x401)) iVar2 = FUN_004bb540() iVar2 = iVar2 * DAT_00637fa8 {
    iVar2 = FUN_005d1e00(local_8, 0, 1, DAT_00637fa0, DAT_00637fa4, DAT_006e47c0);
    iVar3 = FUN_005d1e00(iVar1, 0, 1, DAT_00637fa8, DAT_00637fac, DAT_006e47c4);
    iVar4 = FUN_005d1e00(s32(in_ECX, 8), 0, 0, DAT_00637fa0, DAT_00637fa4, DAT_006e47c0);
    local_28 = ((param_4 + iVar4) + iVar2);
    iVar4 = FUN_005d1e00(s32(in_ECX, 9), 0, 0, DAT_00637fa8, DAT_00637fac, DAT_006e47c4);
    local_2c = ((param_5 + iVar4) + iVar3);
    uVar5 = FUN_00451860(iVar3, 0, DAT_00637fa8, DAT_00637fac, DAT_006e47c4);
    iVar4 = FUN_005d1e00(uVar5);
    uVar5 = FUN_00451830(iVar2, 0, DAT_00637fa0, DAT_00637fa4, DAT_006e47c0);
    iVar6 = FUN_005d1e00(uVar5);
    FUN_006e7d90(DAT_ffffffe4, 0, 0, iVar6, iVar4);
    FUN_006e7da4(DAT_ffffffe4, local_28, local_2c);
    BVar7 = FUN_006e7d48(DAT_ffffffe4, DAT_ffffffe4, (param_2 + 0x14));
    if ((BVar7 !== 0)) {
      local_30 = 0;
      uVar5 = FUN_00407f90(DAT_ffffffe4);
      if ((local_28 < UNNAMED)) left {
        local_30 = (UNNAMED - local_28);
        local_28 = UNNAMED;
      }
      local_c = 0;
      uVar8 = FUN_00407fc0(DAT_ffffffe4);
      if ((local_2c < UNNAMED)) top {
        local_c = (UNNAMED - local_2c);
        local_2c = UNNAMED;
      }
      iVar4 = local_c;
      iVar6 = local_8;
      pCVar9 = GetActiveView(param_2);
      uVar10 = GetCheckStyle(param_2);
      iVar1 = FUN_005e395a(uVar10, pCVar9, uVar5, uVar8, local_30, iVar4, iVar6, iVar1, iVar2, iVar3);
      iVar2 = FUN_005c55d0();
      uVar5 = FUN_005c5640(DAT_006e47c0, DAT_006e47c4, UNNAMED, local_28, local_2c, (((-u8((iVar1 === 0))) & -2) + 1) * iVar2);
      FUN_0061a759(s32(in_ECX, 0xe), uVar5);
    }
    w32(param_1, 0, UNNAMED);
    w32(param_1, 1, UNNAMED);
    w32(param_1, 2, UNNAMED);
    w32(param_1, 3, UNNAMED);
    return param_1;
  }
  FUN_005d225b(s_Error:_Sprite_size_exceeds_scale_00638224);
  FUN_006e7d90(DAT_ffffffe4, 0, 0, 0, 0);
  w32(param_1, 0, UNNAMED);
  w32(param_1, 1, UNNAMED);
  w32(param_1, 2, UNNAMED);
  w32(param_1, 3, UNNAMED);
  return param_1;
}


 export function FUN_005d0dbf (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let xRight;
  let BVar7;
  let uVar8;
  // in_ECX promoted to parameter;
  let local_34;
  let local_30;
  let local_2c;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  if ((param_3 === -1)) {
    param_3 = ((s32(in_ECX, 0xc)) & 0xFF);
  }
  else {
  }
  local_8 = (s32(in_ECX, 4) - s32(in_ECX, 0));
  iVar1 = s32(in_ECX, 5);
  iVar2 = s32(in_ECX, 1);
  iVar3 = FUN_004a6980();
  if (((iVar3 * DAT_00637fa8 / DAT_00637fac | 0) < 0x401)) iVar3 = FUN_004bb540() iVar3 = iVar3 * DAT_00637fa8 {
    iVar3 = FUN_005d1e00(local_8, 0, 1, DAT_00637fa0, DAT_00637fa4, DAT_006e47c0);
    iVar4 = FUN_005d1e00((iVar1 - iVar2), 0, 1, DAT_00637fa8, DAT_00637fac, DAT_006e47c4);
    iVar5 = FUN_005d1e00(s32(in_ECX, 8), 0, 0, DAT_00637fa0, DAT_00637fa4, DAT_006e47c0);
    local_2c = ((param_4 + iVar5) + iVar3);
    iVar5 = FUN_005d1e00(s32(in_ECX, 9), 0, 0, DAT_00637fa8, DAT_00637fac, DAT_006e47c4);
    local_30 = ((param_5 + iVar5) + iVar4);
    uVar6 = FUN_00451860(iVar4, 0, DAT_00637fa8, DAT_00637fac, DAT_006e47c4);
    iVar5 = FUN_005d1e00(uVar6);
    uVar6 = FUN_00451830(iVar3, 0, DAT_00637fa0, DAT_00637fa4, DAT_006e47c0);
    xRight = FUN_005d1e00(uVar6);
    FUN_006e7d90(DAT_ffffffe0, 0, 0, xRight, iVar5);
    FUN_006e7da4(DAT_ffffffe0, local_2c, local_30);
    BVar7 = FUN_006e7d48(DAT_ffffffe0, DAT_ffffffe0, (param_2 + 0x10));
    if ((BVar7 !== 0)) {
      local_34 = 0;
      uVar6 = FUN_00407f90(DAT_ffffffe0);
      if ((local_2c < UNNAMED)) left {
        local_34 = (UNNAMED - local_2c);
        local_2c = UNNAMED;
      }
      local_10 = 0;
      uVar8 = FUN_00407fc0(DAT_ffffffe0);
      if ((local_30 < UNNAMED)) top {
        local_10 = (UNNAMED - local_30);
        local_30 = UNNAMED;
      }
      local_c = FUN_005e6188();
      if ((local_c !== 0)) {
        uVar6 = FUN_005c5660(uVar6, uVar8, local_34, local_10, local_8, (iVar1 - iVar2), iVar3, iVar4);
        uVar6 = FUN_005c56a0(uVar6);
        FUN_0061a759(s32(in_ECX, 0xe), local_c, DAT_006e47c0, DAT_006e47c4, UNNAMED, local_2c, local_30, uVar6);
        param_2 = ~_Timevec(param_2);
      }
    }
    w32(param_1, 0, UNNAMED);
    w32(param_1, 1, UNNAMED);
    w32(param_1, 2, UNNAMED);
    w32(param_1, 3, UNNAMED);
    return param_1;
  }
  FUN_005d225b(s_Error:_Sprite_size_exceeds_scale_00638250);
  FUN_006e7d90(DAT_ffffffe0, 0, 0, 0, 0);
  w32(param_1, 0, UNNAMED);
  w32(param_1, 1, UNNAMED);
  w32(param_1, 2, UNNAMED);
  w32(param_1, 3, UNNAMED);
  return param_1;
}


 export function FUN_005d10cd (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let BVar7;
  let uVar8;
  let pCVar9;
  let uVar10;
  // in_ECX promoted to parameter;
  let local_30;
  let local_2c;
  let local_28;
  let local_1c;
  let local_c;
  let local_8;

  if ((param_3 === -1)) {
    param_3 = ((s32(in_ECX, 0xc)) & 0xFF);
  }
  else {
  }
  local_8 = (s32(in_ECX, 4) - s32(in_ECX, 0));
  iVar1 = (s32(in_ECX, 5) - s32(in_ECX, 1));
  iVar2 = FUN_004a6980();
  if (((iVar2 * DAT_00637f98 / DAT_00637f9c | 0) < 0x401)) iVar2 = FUN_004bb540() iVar2 = iVar2 * DAT_00637f98 {
    iVar2 = FUN_005d1d00(local_8, 0, 1);
    iVar3 = FUN_005d1d00(iVar1, 0, 1);
    iVar4 = FUN_005d1d00(s32(in_ECX, 8), 0, 0);
    local_28 = ((param_4 + iVar4) + iVar2);
    iVar4 = FUN_005d1d00(s32(in_ECX, 9), 0, 0);
    local_2c = ((param_5 + iVar4) + iVar3);
    uVar5 = FUN_00451860(iVar3, 0);
    iVar4 = FUN_005d1d00(uVar5);
    uVar5 = FUN_00451830(iVar2, 0);
    iVar6 = FUN_005d1d00(uVar5);
    FUN_006e7d90(DAT_ffffffe4, 0, 0, iVar6, iVar4);
    FUN_006e7da4(DAT_ffffffe4, local_28, local_2c);
    BVar7 = FUN_006e7d48(DAT_ffffffe4, DAT_ffffffe4, (param_2 + 0x14));
    if ((BVar7 !== 0)) {
      local_30 = 0;
      uVar5 = FUN_00407f90(DAT_ffffffe4);
      if ((local_28 < UNNAMED)) left {
        local_30 = (UNNAMED - local_28);
        local_28 = UNNAMED;
      }
      local_c = 0;
      uVar8 = FUN_00407fc0(DAT_ffffffe4);
      if ((local_2c < UNNAMED)) top {
        local_c = (UNNAMED - local_2c);
        local_2c = UNNAMED;
      }
      iVar4 = local_c;
      iVar6 = local_8;
      pCVar9 = GetActiveView(param_2);
      uVar10 = GetCheckStyle(param_2);
      iVar1 = FUN_005e395a(uVar10, pCVar9, uVar5, uVar8, local_30, iVar4, iVar6, iVar1, iVar2, iVar3, param_6)
      ;
      iVar2 = FUN_005c55d0();
      uVar5 = FUN_005c5640(DAT_006e47c8, UNNAMED, local_28, local_2c, (((-u8((iVar1 === 0))) & -2) + 1) * iVar2);
      FUN_005e52bf(s32(in_ECX, 0xe), uVar5);
    }
    w32(param_1, 0, UNNAMED);
    w32(param_1, 1, UNNAMED);
    w32(param_1, 2, UNNAMED);
    w32(param_1, 3, UNNAMED);
    return param_1;
  }
  FUN_005d225b(s_Error:_Sprite_size_exceeds_scale_0063827c);
  FUN_006e7d90(DAT_ffffffe4, 0, 0, 0, 0);
  w32(param_1, 0, UNNAMED);
  w32(param_1, 1, UNNAMED);
  w32(param_1, 2, UNNAMED);
  w32(param_1, 3, UNNAMED);
  return param_1;
}


 export function FUN_005d1372 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let xRight;
  let BVar7;
  let uVar8;
  // in_ECX promoted to parameter;
  let local_34;
  let local_30;
  let local_2c;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  if ((param_3 === -1)) {
    param_3 = ((s32(in_ECX, 0xc)) & 0xFF);
  }
  else {
  }
  local_8 = (s32(in_ECX, 4) - s32(in_ECX, 0));
  iVar1 = s32(in_ECX, 5);
  iVar2 = s32(in_ECX, 1);
  iVar3 = FUN_004a6980();
  if (((iVar3 * DAT_00637f98 / DAT_00637f9c | 0) < 0x401)) iVar3 = FUN_004bb540() iVar3 = iVar3 * DAT_00637f98 {
    iVar3 = FUN_005d1d00(local_8, 0, 1);
    iVar4 = FUN_005d1d00((iVar1 - iVar2), 0, 1);
    iVar5 = FUN_005d1d00(s32(in_ECX, 8), 0, 0);
    local_2c = ((param_4 + iVar5) + iVar3);
    iVar5 = FUN_005d1d00(s32(in_ECX, 9), 0, 0);
    local_30 = ((param_5 + iVar5) + iVar4);
    uVar6 = FUN_00451860(iVar4, 0);
    iVar5 = FUN_005d1d00(uVar6);
    uVar6 = FUN_00451830(iVar3, 0);
    xRight = FUN_005d1d00(uVar6);
    FUN_006e7d90(DAT_ffffffe0, 0, 0, xRight, iVar5);
    FUN_006e7da4(DAT_ffffffe0, local_2c, local_30);
    BVar7 = FUN_006e7d48(DAT_ffffffe0, DAT_ffffffe0, (param_2 + 0x10));
    if ((BVar7 !== 0)) {
      local_34 = 0;
      uVar6 = FUN_00407f90(DAT_ffffffe0);
      if ((local_2c < UNNAMED)) left {
        local_34 = (UNNAMED - local_2c);
        local_2c = UNNAMED;
      }
      local_10 = 0;
      uVar8 = FUN_00407fc0(DAT_ffffffe0);
      if ((local_30 < UNNAMED)) top {
        local_10 = (UNNAMED - local_30);
        local_30 = UNNAMED;
      }
      local_c = FUN_005e6188();
      if ((local_c !== 0)) {
        uVar6 = FUN_005c5660(uVar6, uVar8, local_34, local_10, local_8, (iVar1 - iVar2), iVar3, iVar4, param_6);
        uVar6 = FUN_005c56a0(uVar6);
        FUN_005e52bf(s32(in_ECX, 0xe), local_c, DAT_006e47c8, UNNAMED, local_2c, local_30, uVar6);
        param_2 = ~_Timevec(param_2);
      }
    }
    w32(param_1, 0, UNNAMED);
    w32(param_1, 1, UNNAMED);
    w32(param_1, 2, UNNAMED);
    w32(param_1, 3, UNNAMED);
    return param_1;
  }
  FUN_005d225b(s_Error:_Sprite_size_exceeds_scale_006382a8);
  FUN_006e7d90(DAT_ffffffe0, 0, 0, 0, 0);
  w32(param_1, 0, UNNAMED);
  w32(param_1, 1, UNNAMED);
  w32(param_1, 2, UNNAMED);
  w32(param_1, 3, UNNAMED);
  return param_1;
}


 export function FUN_005d1612 (param_1, param_2, param_3, param_4, param_5)

 {
  let bVar1;
  let LVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let LVar9;
  let iVar10;
  let iVar11;
  let LVar12;
  let local_60;
  let local_5c;
  let local_54;
  let local_40;
  let local_34;
  let local_24;
  let local_20;
  let local_14;

  if ((s32(param_1, 0xd) !== 0)) {
    if ((s32(DAT_00000004, 0) === 0)) top {
      FUN_006e7d90(param_2, s32(param_1, 0), s32(param_1, 1), (s32(param_1, 2) + param_4), (s32(param_1, 3) + param_5));
      w32(DAT_00000000, 0, s32(param_1, 4));
      w32(DAT_00000004, 0, s32(param_1, 5));
      w32(DAT_00000008, 0, s32(param_1, 6));
      w32(DAT_0000000c, 0, s32(param_1, 7));
      FUN_006e7da4((param_2 + 1), param_4, param_5);
      w32(DAT_00000000, 0, (s32(param_1, 8) + param_4));
      w32(DAT_00000004, 0, (s32(param_1, 9) + param_5));
      w32(DAT_00000008, 0, s32(param_1, 0xa));
      w32(DAT_0000000c, 0, s32(param_1, 0xb));
      _MEM[DAT_00000000] = ((s32(param_1, 0xc)) & 0xFF);
      w32(DAT_00000004, 0, s32(param_1, 0xd));
      FUN_005dcd70(DAT_00000004);
      FUN_005cf2ff();
    }
    else {
      iVar3 = ((s32(param_1, 5) + param_5) - s32(DAT_00000004, 0));
      iVar4 = FUN_00407f90((param_1 + 4));
      iVar8 = s32(param_1, 4);
      iVar5 = FUN_00407fc0((param_1 + 4));
      iVar6 = FUN_00407f90((param_2 + 1));
      iVar6 = (s32(DAT_00000000, 0) + iVar6);
      iVar7 = FUN_00407fc0((param_2 + 1));
      iVar11 = (iVar5 + iVar3);
      if (((iVar5 + iVar3) <= iVar7)) {
        iVar11 = iVar7;
      }
      iVar8 = ((iVar8 + iVar4) + param_4);
      if ((iVar8 <= iVar6)) {
        iVar8 = iVar6;
      }
      FUN_006e7d90(DAT_ffffffec, 0, 0, iVar8, iVar11);
      LVar2 = UNNAMED;
      LVar12 = UNNAMED;
      FUN_005cf2ff();
      FUN_005cf2ff();
      local_54 = s32(param_1, 0xe);
      local_5c = s32(DAT_00000008, 0);
      LVar9 = FUN_005dce4f((LVar12 * LVar2 + LVar2 * 8));
      local_20 = FUN_005dcdf9(LVar9);
      (local_40 < LVar2) (local_40 = 0; local_40 = (local_40 < LVar2); local_40 = (local_40 + 1)) {
        bVar1 = (local_40 < iVar7);
        if ((local_40 < (iVar5 + iVar3))) local_40 = (local_40 < (iVar5 + iVar3)) {
          bVar1 = (bVar1 | 2);
        }
        /* BRANCHIND */ () {
        case 0 :
          w32(local_20, 0, 0);
          w32(local_20, 1, 0);
          local_20 = (local_20 + 2);
          break;
        case 1 :
          w32(local_20, 0, s32(local_5c, 0));
          w32(local_20, 1, s32(local_5c, 1));
          iVar8 = s32(local_20, 1);
          FUN_005dced3((local_5c + 2), (local_20 + 2), iVar8);
          local_5c = ((local_5c + 2) + iVar8);
          local_20 = ((local_20 + 2) + iVar8);
          break;
        case 2 :
          w32(local_20, 0, (s32(local_54, 0) + param_4));
          w32(local_20, 1, s32(local_54, 1));
          iVar8 = s32(local_20, 1);
          FUN_005dced3((local_54 + 2), (local_20 + 2), iVar8);
          local_54 = ((local_54 + 2) + iVar8);
          local_20 = ((local_20 + 2) + iVar8);
          break;
        case 3 :
          iVar8 = s32(local_5c, 0);
          iVar4 = (s32(local_5c, 1) + iVar8);
          local_5c = (local_5c + 2);
          iVar6 = (s32(local_54, 0) + param_4);
          iVar10 = (s32(local_54, 1) + iVar6);
          local_54 = (local_54 + 2);
          iVar11 = iVar8;
          if ((iVar6 <= iVar8)) {
            iVar11 = iVar6;
          }
          w32(local_20, 0, iVar11);
          iVar11 = iVar4;
          if ((iVar4 <= iVar10)) {
            iVar11 = iVar10;
          }
          w32(local_20, 1, (iVar11 - s32(local_20, 0)));
          local_20 = (local_20 + 2);
          local_24 = LVar12;
          local_34 = 0;
          while ((local_24 !== 0)) local_24 = (local_24 !== 0) {
            local_60 = 0;
            if ((local_34 < iVar4)) local_34 = (local_34 < iVar4) {
              _MEM[local_20] = ((s32(local_5c, 0)) & 0xFF);
              local_5c = (local_5c + 1);
              local_60 = 1;
            }
            if ((local_34 < iVar10)) local_34 = (local_34 < iVar10) {
              if ((u8(_MEM[(param_1 + 0xc)]) === s8(((s32(local_54, 0)) & 0xFF)))) {
                if ((local_60 === 0)) {
                  _MEM[local_20] = ((s32(DAT_00000000, 0)) & 0xFF);
                }
              }
              else {
                _MEM[local_20] = ((s32(local_54, 0)) & 0xFF);
              }
              local_54 = (local_54 + 1);
              local_60 = (local_60 + 1);
            }
            if ((local_60 !== 0)) {
              local_20 = (local_20 + 1);
            }
            local_34 = (local_34 + 1);
            local_24 = (local_24 + -1);
          }
        }
      }
      FUN_006e7da4(DAT_ffffffec, s32(DAT_00000000, 0), s32(DAT_00000004, 0));
      w32(DAT_00000000, 0, UNNAMED);
      w32(DAT_00000004, 0, UNNAMED);
      w32(DAT_00000008, 0, UNNAMED);
      w32(DAT_0000000c, 0, UNNAMED);
      w32(DAT_00000000, 0, UNNAMED);
      w32(DAT_00000004, 0, UNNAMED);
      w32(DAT_00000008, 0, UNNAMED);
      w32(DAT_0000000c, 0, UNNAMED);
      if ((s32(DAT_00000008, 0) !== 0)) right {
        FUN_005cf337();
      }
      if ((s32(DAT_00000004, 0) !== 0)) top {
        LVar12 = FUN_005dce96(s32(DAT_00000004, 0));
        w32(DAT_00000004, 0, LVar12);
      }
      FUN_005dce29(LVar9);
      w32(DAT_00000004, 0, LVar9);
      FUN_005cf2ff();
    }
  }
  return;
}


 export function FUN_005d1b38 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d90(in_ECX, 0, 0, 0, 0);
  FUN_006e7d90((in_ECX + 1), 0, 0, 0, 0);
  w32(DAT_00000000, 0, 0);
  w32(DAT_00000004, 0, 0);
  w32(DAT_00000008, 0, 1);
  w32(DAT_0000000c, 0, 1);
  _MEM[DAT_00000000] = 0;
  w32(DAT_00000004, 0, 0);
  w32(DAT_00000008, 0, 0);
  return;
}


 export function FUN_005d1bb8 (in_ECX, param_1, param_2)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_14;
  let local_c;

  if ((s32((in_ECX + 0x18), 0) < param_1)) in_ECX = (in_ECX + 0x1c) param_1 = (param_1 < s32((in_ECX + 0x10), 0)) in_ECX = (in_ECX + 0x18) {
    uVar1 = _MEM[(in_ECX + 0x30)];
  }
  else {
    param_1 = (param_1 - s32((in_ECX + 0x10), 0));
    local_14 = s32((in_ECX + 0x38), 0);
    local_c = (param_2 - s32((in_ECX + 0x14), 0));
    while ((local_c === 0)) {
      if ((local_c === 0)) break; local_14 = (local_14 + (s32(local_14, 1) + 8)) local_c = (local_c + -1) iVar2 = (s32(local_14, 0) - s32((in_ECX + 0x10), 0)) iVar2 = (iVar2 + s32(local_14, 1)) {
      uVar1 = _MEM[(in_ECX + 0x30)];
    }
    else {
      uVar1 = _MEM[(((param_1 - iVar2) + 8) + local_14)];
    }
  }
  return uVar1;
}


 export function FUN_005d1cb0 (param_1)

 {
  return param_1;
}


 export function FUN_005d1cd0 (param_1, param_2)

 {
  w32(param_2, 0, s32(param_1, 0));
  w32(param_2, 1, s32(param_1, 1));
  w32(param_2, 2, s32(param_1, 2));
  w32(param_2, 3, s32(param_1, 3));
  return;
}


 export function FUN_005d1d00 (param_1, param_2, param_3)

 {
  let iVar1;
  let bVar2;
  let local_10;

  if ((param_1 === 0)) {
    iVar1 = 0;
  }
  else {
    bVar2 = (-1 < param_1);
    if ((!bVar2)) {
      param_1 = (-param_1);
    }
    if ((DAT_00637f98 < DAT_00637f9c)) {
      local_10 = param_2;
      param_1 = (s32((DAT_006e47c8 + param_2 * 4), 0) + param_1);
      (s32((DAT_006e47c8 + local_10 * 4), 0) < param_1) (; DAT_006e47c8 = (DAT_006e47c8 + local_10 * 4); local_10 = (local_10 + 1)) {
      }
      if ((s32((DAT_006e47c8 + local_10 * 4), 0) !== param_1)) DAT_006e47c8 = (DAT_006e47c8 + local_10 * 4) {
        local_10 = (local_10 + -1);
      }
    }
    else {
      local_10 = param_2;
      (s32((DAT_006e47c8 + local_10 * 4), 0) < (s32((DAT_006e47c8 + param_2 * 4), 0) + param_1)) (; DAT_006e47c8 = (DAT_006e47c8 + local_10 * 4);
          local_10 = (local_10 + 1)) {
      }
    }
    iVar1 = (((-u8(bVar2)) & 2) - 1) * (local_10 - param_2);
  }
  return iVar1;
}


 export function FUN_005d1e00 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let bVar2;
  let local_10;

  if ((param_1 === 0)) {
    iVar1 = 0;
  }
  else {
    bVar2 = (-1 < param_1);
    if ((!bVar2)) {
      param_1 = (-param_1);
    }
    if ((param_4 < param_5)) {
      local_10 = param_2;
      param_1 = (s32((param_6 + param_2 * 4), 0) + param_1);
      (s32((param_6 + local_10 * 4), 0) < param_1) (; param_6 = (param_6 + local_10 * 4); local_10 = (local_10 + 1)) {
      }
      if ((s32((param_6 + local_10 * 4), 0) !== param_1)) param_6 = (param_6 + local_10 * 4) {
        local_10 = (local_10 + -1);
      }
    }
    else {
      local_10 = param_2;
      (s32((param_6 + local_10 * 4), 0) < (s32((param_6 + param_2 * 4), 0) + param_1)) (; param_6 = (param_6 + local_10 * 4);
          local_10 = (local_10 + 1)) {
      }
    }
    iVar1 = (((-u8(bVar2)) & 2) - 1) * (local_10 - param_2);
  }
  return iVar1;
}


 export function FUN_005d1ef0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  return (s32((in_ECX + 0xc), 0) + param_1);
}


 export function FUN_005d1f20 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  return (param_1 - s32((in_ECX + 0xc), 0));
}


 export function FUN_005d1f50 (param_1, param_2, param_3)

 {
  let pvVar1;
  let unaff_FS_OFFSET;
  let local_18;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005d1feb;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  if ((DAT_00637ef4 === 0)) {
    pvVar1 = operator_new(0x90);
    local_8 = 0;
    if ((pvVar1 === 0)) {
      local_18 = 0;
    }
    else {
      local_18 = FUN_005d211e();
    }
    DAT_00637ef4 = local_18;
  }
  local_8 = -1;
  FUN_005d2042(param_1, param_2, param_3);
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_005d2004 (param_1)

 {
  if ((DAT_00637ef4 === 0)) {
    FUN_005d225b(s_Error:_MrTimer_not_initialized_i_006382d4);
  }
  else {
    FUN_005d20e6(param_1);
  }
  return;
}


 export function FUN_005d2042 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_8;

  (s32(in_ECX, (local_8 + 1)) !== 0) (local_8 = 1; (local_8 = (local_8 < 0x11) && (in_ECX = (in_ECX + (local_8 + 1)))); local_8 = (local_8 + 1)) {
  }
  if ((local_8 < 0x11)) {
    iVar1 = FUN_005d44be(s32(in_ECX, 0), param_2, local_8);
    if ((iVar1 === 0)) {
      local_8 = 0;
    }
    else {
      w32(in_ECX, (local_8 + 1), param_1);
      w32(in_ECX, (local_8 + 0x12), param_3);
    }
  }
  else {
    local_8 = 0;
  }
  return local_8;
}


 export function FUN_005d20e6 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, (param_1 + 1), 0);
  FUN_005d4664(s32(in_ECX, 0), param_1);
  return;
}


 export function FUN_005d211e (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_8;

  (local_8 < 0x11) (local_8 = 1; local_8 = (local_8 < 0x11); local_8 = (local_8 + 1)) {
    w32(in_ECX, (local_8 + 1), 0);
    w32(in_ECX, (local_8 + 0x12), 0);
  }
  uVar1 = FUN_005d423c();
  w32(in_ECX, 0, uVar1);
  return in_ECX;
}


 export function FUN_005d2182 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  (local_8 < 0x10) (local_8 = 0; local_8 = (local_8 < 0x10); local_8 = (local_8 + 1)) {
    if ((s32(in_ECX, (local_8 + 1)) !== 0)) {
      FUN_005d20e6(local_8);
    }
  }
  FUN_005d447c(s32(in_ECX, 0));
  return;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Multiple */ /* Matches */ /* With */ /* Different */ /* Base */ /* Names */
    /* _$E26 */
    /* _$E31 */
    /* _$E353 */
    /* _$E354 */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function FID_conflict:_$E31 ()

 {
  FUN_005d220a();
  FUN_005d2224();
  return;
}


 export function FUN_005d220a ()

 {
  FUN_005d246f();
  return;
}


 export function FUN_005d2224 ()

 {
  _atexit(FUN_005d2241);
  return;
}


 export function FUN_005d2241 ()

 {
  FUN_005d2498();
  return;
}


 export function FUN_005d225b (param_1)

 {
  FUN_005d24b3(param_1);
  return;
}


 export function FUN_005d2279 (param_1, param_2)

 {
  let local_404;

  _sprintf(DAT_fffffbfc, param_1, param_2);
  FUN_005d24b3(DAT_fffffbfc);
  return;
}


 export function FUN_005d22b7 (param_1, param_2, param_3)

 {
  let local_404;

  _sprintf(DAT_fffffbfc, param_1, param_2, param_3);
  FUN_005d24b3(DAT_fffffbfc);
  return;
}


 export function FUN_005d22f9 (param_1, param_2, param_3, param_4)

 {
  let local_404;

  _sprintf(DAT_fffffbfc, param_1, param_2, param_3, param_4);
  FUN_005d24b3(DAT_fffffbfc);
  return;
}


 export function FUN_005d233f (param_1, param_2)

 {
  let local_404;

  _sprintf(DAT_fffffbfc, param_1, param_2);
  FUN_005d24b3(DAT_fffffbfc);
  return;
}


 export function FUN_005d237d (param_1, param_2)

 {
  let local_404;

  _sprintf(DAT_fffffbfc, param_1, param_2);
  FUN_005d24b3(DAT_fffffbfc);
  return;
}


 export function FUN_005d23bb (param_1, param_2, param_3)

 {
  let local_404;

  _sprintf(DAT_fffffbfc, param_1, param_2, param_3);
  FUN_005d24b3(DAT_fffffbfc);
  return;
}


 export function FUN_005d23fd (param_1, param_2, param_3)

 {
  let local_404;

  _sprintf(DAT_fffffbfc, param_1, param_2, param_3);
  FUN_005d24b3(DAT_fffffbfc);
  return;
}


 export function FUN_005d243f (param_1)

 {
  DAT_00638304 = param_1;
  return;
}


 export function FUN_005d2457 (param_1)

 {
  DAT_00638308 = param_1;
  return;
}


 export function FUN_005d246f (in_ECX)

 {
  let DVar1;
  // in_ECX promoted to parameter;

  FUN_005ed920();
  DVar1 = FUN_006e7b58();
  w32(in_ECX, 0, DVar1);
  return in_ECX;
}


 export function FUN_005d2498 ()

 {
  FUN_005eda65();
  return;
}


 export function FUN_005d24b3 (in_ECX, param_1)

 {
  let DVar1;
  // in_ECX promoted to parameter;
  let local_40c;

  DVar1 = FUN_006e7b58();
  _sprintf(DAT_fffffbf4, s_(%5d)_0063830c, ((DVar1 - s32(in_ECX, 0)) / 0x3e8 | 0));
  FUN_005f22e0(DAT_fffffbf4, param_1);
  if ((DAT_00638308 !== 0)) {
    FUN_005edbb2(DAT_fffffbf4);
  }
  if ((DAT_00638304 !== 0)) {
    FUN_005edb15(DAT_fffffbf4);
  }
  return 1;
}


 export function FUN_005d2550 (param_1)

 {
  DAT_00637e90 = param_1;
  return;
}


 export function FUN_005d2568 (param_1, param_2, param_3)

 {
  DAT_00637e94 = param_1;
  DAT_00637e98 = param_2;
  DAT_00637e9c = param_3;
  return;
}


 export function FUN_005d2590 (param_1)

 {
  DAT_00637ea0 = param_1;
  return;
}


 export function FUN_005d25a8 (param_1)

 {
  PTR_DAT_00637e68 = param_1;
  return;
}


 export function FUN_005d25c0 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  // in_ECX promoted to parameter;
  let local_14;

  w32((in_ECX + 0x40), 0, PTR_DAT_00637e6c);
  w32((in_ECX + 0x2c), 0, 0);
  FUN_006e7d90(DAT_ffffffec, param_3, param_4, (param_5 + param_3), (param_4 + 0x1e));
  FUN_00418910(param_1, param_2, DAT_ffffffec, param_6);
  return;
}


 export function FUN_005d2625 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  // in_ECX promoted to parameter;
  let local_14;

  w32((in_ECX + 0x40), 0, PTR_DAT_00637e6c);
  w32((in_ECX + 0x2c), 0, 0);
  FUN_006e7d90(DAT_ffffffec, param_3, param_4, (param_5 + param_3), (param_4 + 0x1e));
  FUN_005d26b0(param_1, param_2, DAT_ffffffec, param_6, param_7);
  return;
}


 export function FUN_005d268e (param_1)

 {
  PTR_DAT_00637e6c = param_1;
  return;
}


 export function FUN_005d26b0 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  w32((in_ECX + 0x40), 0, PTR_DAT_00637e6c);
  FUN_0040f730(param_1, 4, param_2, param_3);
  uVar1 = FUN_005d2740(param_3, in_ECX, 1, param_5, s32((in_ECX + 0x40), 0));
  w32((in_ECX + 0x1c), 0, uVar1);
  FUN_005d2d7f(s32((in_ECX + 0x1c), 0), param_4);
  return;
}


 export function FUN_005d2740 (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let pWVar4;
  let pHVar5;
  let pHVar6;
  let pHVar7;
  let pvVar8;
  let local_34;
  let local_c;
  let local_8;

  local_8 = 0x40800000;
  if ((param_4 !== 0)) {
    local_8 = 0x50800000;
  }
  if (((param_3 & 1) !== 0)) {
    local_8 = (local_8 | 0x80);
  }
  if (((param_3 & 0x200) !== 0)) param_3 = (param_3 & 0x200) {
    local_8 = (local_8 | 4);
    _MEM[(param_2 + 0x38)] = 1;
    if (((param_3 & 0x200) !== 0)) {
      _MEM[(param_2 + 0x39)] = 1;
    }
  }
  if (((param_3 & 4) !== 0)) {
    local_8 = (local_8 | 0xa0);
  }
  if (((param_3 & 8) !== 0)) {
    local_8 = (local_8 | 8);
  }
  if (((param_3 & 0x10) !== 0)) {
    local_8 = (local_8 | 0x10);
  }
  if (((param_3 & 0x20) !== 0)) {
    local_8 = (local_8 | 0x200040);
  }
  if (((param_3 & 0x40) !== 0)) {
    local_8 = (local_8 | 0x100080);
  }
  if (((param_3 & 0x80) !== 0)) {
    local_8 = (local_8 | 0x1000);
  }
  if (((param_3 & 0x100) !== 0)) {
    local_8 = (local_8 | 0x800);
  }
  w32((param_2 + 0x3c), 0, local_8);
  if ((DAT_00638314 === 0)) {
    pvVar8 = 0;
    pHVar6 = 0;
    pHVar7 = DAT_006e4ff0;
    FUN_0040f810();
    iVar1 = FUN_00414d10();
    pHVar5 = s32((iVar1 + 4), 0);
    iVar1 = FUN_00407fc0(param_1);
    iVar2 = FUN_00407f90(param_1);
    local_c = FUN_006e7d50(4, DAT_0063831c, DAT_00638318, local_8, s32(param_1, 0), s32(param_1, 1), iVar2, iVar1, pHVar5, pHVar6, pHVar7, pvVar8);
    DAT_006e47dc = FUN_006e7e2c(local_c, -4);
    local_34 = 0x88;
    local_34 = 0;
    local_34 = FUN_006e7e2c(local_c, -4);
    DAT_006e47d8 = FUN_006e7e9c(local_c, -18);
    local_34 = (FUN_006e7e9c(local_c, -18) + 8);
    local_34 = DAT_006e4ff0;
    local_34 = 0;
    local_34 = FUN_006e7dac(0, 0x7f01);
    local_34 = 0;
    local_34 = 0;
    local_34 = s_MSEditBoxClass_00638324;
    FUN_006e7da8(DAT_ffffffcc);
    DAT_00638314 = 1;
    FUN_006e7e1c(local_c);
  }
  pvVar8 = 0;
  pHVar6 = 0;
  pHVar7 = DAT_006e4ff0;
  FUN_0040f810();
  iVar1 = FUN_00414d10();
  pHVar5 = s32((iVar1 + 4), 0);
  iVar1 = FUN_00407fc0(param_1);
  iVar2 = FUN_00407f90(param_1);
  local_c = FUN_006e7d50(4, s_MSEditBoxClass_00638338, DAT_00638334, (local_8 | 0x40800000), s32(param_1, 0), s32(param_1, 1), iVar2, iVar1, pHVar5, pHVar6, pHVar7, pvVar8);
  uVar3 = FUN_004d8af0();
  pWVar4 = FUN_005dcdf9(uVar3);
  FUN_006e7d6c(local_c, 0x30, s32(pWVar4, 0), 0);
  uVar3 = FUN_004d8af0();
  FUN_005dce29(uVar3);
  FUN_006e7db0(local_c, -4, 0x5d2a01);
  FUN_006e7db0(local_c, DAT_006e47d8, DAT_006e47dc);
  FUN_006e7db0(local_c, (DAT_006e47d8 + 4), param_2);
  return local_c;
}


 export function FUN_005d2a01 (param_1, param_2, param_3, param_4)

 {
  let this;
  let DVar1;
  let lpPrevWndFunc;
  let uVar2;
  let iVar3;
  let pHVar4;
  let uVar5;
  let LVar6;
  let local_20;
  let local_8;

  this = FUN_006e7e2c(param_1, 0xa);
  DVar1 = FUN_006e7e9c(param_1, -18);
  lpPrevWndFunc = FUN_006e7e2c(param_1, (DVar1 - 8));
  uVar2 = (local_20 & 0xff);
  if ((uVar2 < 8)) {
    if ((uVar2 === 7)) {
      uVar5 = FUN_0040f810();
      FUN_005c6303(uVar5);
      if ((this[0x38] === 0)) {
        FUN_005d2dc6(param_1, 0, -1);
      }
      LVar6 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
      return LVar6;
    }
    if ((uVar2 === 2)) {
      if ((this !== 0)) {
        this = delbuf(this, 0);
      }
      LVar6 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
      return LVar6;
    }
  }
  else if ((uVar2 < 0x202)) {
    if ((uVar2 === 0x201)) {
 LAB_005d2c05: :
      iVar3 = 0;
      pHVar4 = FUN_006e7e40(param_1);
      FUN_006e7e2c(pHVar4, iVar3);
      iVar3 = FUN_00414d10();
      if (((_MEM[(iVar3 + 0x49)] & 2) !== 0)) {
        pHVar4 = FUN_006e7e40(param_1);
        FUN_006e7d94(pHVar4);
        pHVar4 = FUN_006e7e40(param_1);
        FUN_006e7da0(pHVar4);
      }
      LVar6 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
      return LVar6;
    }
    if ((uVar2 === 0x100)) {
      if ((param_3 !== 0x1b)) param_3 = (param_3 !== 0xd) param_3 = (param_3 !== 0x1b) {
        LVar6 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
        return LVar6;
      }
      pHVar4 = FUN_006e7e40(param_1);
      FUN_006e7d6c(pHVar4, param_2, param_3, param_4);
      return 1;
    }
    if ((uVar2 === 0x101)) {
      uVar5 = FUN_0040f810();
      FUN_005c6303(uVar5);
      iVar3 = FUN_005eb3ed(param_3);
      if ((iVar3 < 0x2b5)) iVar3 = (iVar3 < 0x2b5) {
        FUN_005d30e0(iVar3);
      }
      LVar6 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
      return LVar6;
    }
    if ((uVar2 === 0x102)) {
      uVar5 = FUN_0040f810();
      FUN_005c6303(uVar5);
      local_8 = 0;
      if ((param_3 !== 9)) {
        uVar5 = FUN_005eb3ed(param_3);
        local_8 = FUN_005d30e0(uVar5);
      }
      if ((local_8 === 0)) {
        return 1;
      }
      LVar6 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
      return LVar6;
    }
  }
  else if ((uVar2 === 0x204)) goto LAB_005d2c05; LVar6 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4) return LVar6


 export function FUN_005d2d15 (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e14(param_1, param_2);
  }
  return;
}


 export function FUN_005d2d3d ()

 {
  return;
}


 export function FUN_005d2d4d (param_1, param_2)

 {
  let LVar1;

  LVar1 = FUN_006e7d6c(param_1, 0xe, 0, 0);
  FUN_006e7d6c(param_1, 0xd, (LVar1 + 1), param_2);
  return;
}


 export function FUN_005d2d7f (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0xc, 0, param_2);
  return;
}


 export function FUN_005d2da1 (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0xc5, param_2, 0);
  return;
}


 export function FUN_005d2dc6 (param_1, param_2, param_3)

 {
  FUN_006e7d6c(param_1, 0xb1, param_2, param_3);
  return;
}


 export function FUN_005d2ded (param_1, param_2, param_3, param_4)

 {
  let LVar1;

  w16(param_3, 0, (param_4 + 0xffff));
  LVar1 = FUN_006e7d6c(param_1, 0xc4, param_2, param_3);
  _MEM[(LVar1 + param_3)] = 0;
  return LVar1;
}


 export function FUN_005d2e31 (param_1)

 {
  FUN_006e7d6c(param_1, 0xba, 0, 0);
  return;
}


 export function FUN_005d2e54 (param_1)

 {
  FUN_006e7d6c(param_1, 0xce, 0, 0);
  return;
}


 export function FUN_005d2e77 (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0xc9, param_2, 0);
  return;
}


 export function FUN_005d2e9c (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0xbb, param_2, 0);
  return;
}


 export function FUN_005d2ec1 (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0xc1, param_2, 0);
  return;
}


 export function FUN_005d2ee6 (param_1, param_2, param_3)

 {
  FUN_006e7d6c(param_1, 0xb6, param_3, param_2);
  return;
}


 export function FUN_005d2f0d (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0xb1, param_2, param_2);
  FUN_006e7d6c(param_1, 0xb7, 0, 0);
  return;
}


 export function FUN_005d2f47 (param_1)

 {
  let uVar1;

  uVar1 = FUN_006e7d6c(param_1, 0xb0, 0, 0);
  return (uVar1 >>> 0x10);
}


 export function FUN_005d2f7e (param_1)

 {
  let iVar1;
  let iVar2;

  iVar1 = FUN_005d2e31(param_1);
  iVar1 = FUN_005d2e9c(param_1, (iVar1 + -1));
  iVar2 = FUN_005d2ec1(param_1, iVar1);
  return (iVar1 + iVar2);
}


 export function FUN_005d2fca (param_1)

 {
  let uVar1;
  let iVar2;
  let iVar3;

  uVar1 = FUN_005d2f47(param_1);
  uVar1 = FUN_005d2e77(param_1, uVar1);
  iVar2 = FUN_005d2e9c(param_1, uVar1);
  iVar3 = FUN_005d2ec1(param_1, iVar2);
  FUN_005d2f0d(param_1, (iVar2 + iVar3));
  return;
}


 export function FUN_005d3035 (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0xc2, 0, param_2);
  return;
}


 export function FUN_005d305a (param_1)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;

  iVar1 = FUN_005d2f47(param_1);
  uVar2 = FUN_005d2e77(param_1, iVar1);
  iVar3 = FUN_005d2e9c(param_1, uVar2);
  iVar4 = FUN_005d2ec1(param_1, iVar3);
  return (iVar1 === (iVar3 + iVar4));
}


 export function FUN_005d30e0 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34), 0) === 0)) {
    uVar1 = 1;
  }
  else {
    uVar1 = s32((in_ECX + 0x34), 0)(s32((in_ECX + 4), 0), param_1);
  }
  return uVar1;
}


 export function FUN_005d3130 (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let pHVar3;
  let pHVar4;
  let pHVar5;
  let pvVar6;
  let local_34;
  let local_30;
  let local_8;

  local_34 = 0x40a10003;
  if ((param_3 !== 0)) {
    local_34 = 0x50a10003;
  }
  if ((DAT_00638348 === 0)) {
    pvVar6 = 0;
    pHVar4 = 0;
    pHVar5 = DAT_006e4ff0;
    FUN_0040f810();
    iVar1 = FUN_00414d10();
    pHVar3 = s32((iVar1 + 4), 0);
    iVar1 = FUN_00407fc0(param_1);
    iVar2 = FUN_00407f90(param_1);
    local_8 = FUN_006e7d50(4, s_COMBOBOX_00638350, DAT_0063834c, local_34, s32(param_1, 0), s32(param_1, 1), iVar2, iVar1, pHVar3, pHVar4, pHVar5, pvVar6);
    DAT_006e47ec = FUN_006e7e2c(local_8, -4);
    local_30 = 0x88;
    local_30 = 0;
    local_30 = FUN_006e7e2c(local_8, -4);
    DAT_006e47e4 = FUN_006e7e9c(local_8, -18);
    local_30 = (FUN_006e7e9c(local_8, -18) + 8);
    local_30 = DAT_006e4ff0;
    local_30 = 0;
    local_30 = FUN_006e7dac(0, 0x7f00);
    local_30 = 0;
    local_30 = 0;
    local_30 = s_MSComboBoxClass_0063835c;
    FUN_006e7da8(DAT_ffffffd0);
    DAT_00638348 = 1;
    FUN_006e7e1c(local_8);
  }
  local_34 = 0x40a10203;
  if ((param_3 !== 0)) {
    local_34 = 0x50a10203;
  }
  pvVar6 = 0;
  pHVar4 = 0;
  pHVar5 = DAT_006e4ff0;
  FUN_0040f810();
  iVar1 = FUN_00414d10();
  pHVar3 = s32((iVar1 + 4), 0);
  iVar1 = FUN_00407fc0(param_1);
  iVar2 = FUN_00407f90(param_1);
  local_8 = FUN_006e7d50(4, s_MSComboBoxClass_00638370, DAT_0063836c, local_34, s32(param_1, 0), s32(param_1, 1), iVar2, iVar1, pHVar3, pHVar4, pHVar5, pvVar6);
  FUN_006e7db0(local_8, -4, 0x5d3310);
  FUN_006e7db0(local_8, DAT_006e47e4, DAT_006e47ec);
  FUN_006e7db0(local_8, (DAT_006e47e4 + 4), param_2);
  return local_8;
}


 export function FUN_005d3310 (param_1, param_2, param_3, param_4)

 {
  let DVar1;
  let lpPrevWndFunc;
  let this;
  let uVar2;
  let pHVar3;
  let LVar4;
  let iVar5;

  DVar1 = FUN_006e7e9c(param_1, -18);
  lpPrevWndFunc = FUN_006e7e2c(param_1, (DVar1 - 8));
  this = FUN_006e7e2c(param_1, (DVar1 - 4));
  if ((this === 0)) {
    return 1;
  }
  uVar2 = FUN_0040f810();
  FUN_005c6303(uVar2);
  if ((param_2 < 0x103)) {
    if ((0xff < param_2)) {
      if ((param_3 !== 0x1b)) param_3 = (param_3 !== 0xd) param_3 = (param_3 !== 0x1b) {
        LVar4 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
        return LVar4;
      }
      pHVar3 = FUN_006e7e40(param_1);
      FUN_006e7d6c(pHVar3, param_2, param_3, param_4);
      return 1;
    }
    if ((param_2 === 2)) {
      if ((this !== 0)) {
        this = delbuf(this, 0);
      }
      LVar4 = FUN_006e7eb4(lpPrevWndFunc, param_1, 2, param_3, param_4);
      return LVar4;
    }
  }
  else {
    if ((param_2 === 0x204)) param_2 = (param_2 === 0x204) {
      iVar5 = 0;
      pHVar3 = FUN_006e7e40(param_1);
      FUN_006e7e2c(pHVar3, iVar5);
      iVar5 = FUN_00414d10();
      if (((_MEM[(iVar5 + 0x49)] & 2) !== 0)) {
        pHVar3 = FUN_006e7e40(param_1);
        FUN_006e7d94(pHVar3);
        pHVar3 = FUN_006e7e40(param_1);
        FUN_006e7da0(pHVar3);
      }
      LVar4 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
      return LVar4;
    }
    if ((param_2 === 0x4c8)) {
      if (((param_3 >>> 0x10) === 1)) {
        if ((this === 0)) {
          return 1;
        }
        FUN_005d3760();
        return 1;
      }
      if (((param_3 >>> 0x10) !== 2)) {
        return 1;
      }
      FUN_005d3720();
      return 1;
    }
  }
  LVar4 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
  return LVar4;
}


 export function FUN_005d356e ()

 {
  return;
}


 export function FUN_005d357e (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0x143, 0, param_2);
  return;
}


 export function FUN_005d35a3 (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0x144, param_2, 0);
  return;
}


 export function FUN_005d35c8 (param_1, param_2)

 {
  let pWVar1;

  pWVar1 = FUN_005dcdf9(param_2);
  FUN_006e7d6c(param_1, 0x30, s32(pWVar1, 0), 0);
  FUN_005dce29(param_2);
  return;
}


 export function FUN_005d360a (param_1)

 {
  FUN_006e7d6c(param_1, 0x14b, 0, 0);
  return;
}


 export function FUN_005d362d (param_1, param_2, param_3)

 {
  FUN_006e7d6c(param_1, 0x148, param_2, param_3);
  return;
}


 export function FUN_005d3654 (param_1, param_2)

 {
  let LVar1;

  LVar1 = FUN_006e7d6c(param_1, 0x147, 0, 0);
  if ((LVar1 === -1)) {
    FUN_005f22d0(param_2, DAT_00638380);
  }
  else {
    FUN_005d362d(param_1, LVar1, param_2);
  }
  return;
}


 export function FUN_005d36b1 (param_1)

 {
  let LVar1;

  LVar1 = FUN_006e7d6c(param_1, 0x147, 0, 0);
  if ((LVar1 === -1)) {
    LVar1 = -1;
  }
  return LVar1;
}


 export function FUN_005d36f6 (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0x14e, param_2, 0);
  return;
}


 export function FUN_005d3720 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) !== 0)) {
    in_ECX = (in_ECX + 0x30);
  }
  return;
}


 export function FUN_005d3760 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    in_ECX = (in_ECX + 0x34);
  }
  return;
}


 export function FUN_005d37a0 (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let pWVar5;
  let pHVar6;
  let pHVar7;
  let pHVar8;
  let pvVar9;
  let local_38;
  let local_30;
  let local_8;

  local_38 = 0;
  if ((param_4 === 1)) {
    local_38 = 0x800;
  }
  uVar1 = (local_38 | 0x40a10000);
  if ((param_3 !== 0)) {
    uVar1 = (local_38 | 0x50a10000);
  }
  local_38 = uVar1;
  if ((DAT_00638384 === 0)) {
    pvVar9 = 0;
    pHVar7 = 0;
    pHVar8 = DAT_006e4ff0;
    FUN_0040f810();
    iVar2 = FUN_00414d10();
    pHVar6 = s32((iVar2 + 4), 0);
    iVar2 = FUN_00407fc0(param_1);
    iVar3 = FUN_00407f90(param_1);
    local_8 = FUN_006e7d50(4, s_LISTBOX_0063838c, DAT_00638388, local_38, s32(param_1, 0), s32(param_1, 1), iVar3, iVar2, pHVar6, pHVar7, pHVar8, pvVar9);
    DAT_006e47f0 = FUN_006e7e2c(local_8, -4);
    local_30 = 0x88;
    local_30 = 0;
    local_30 = FUN_006e7e2c(local_8, -4);
    DAT_006e47f4 = FUN_006e7e9c(local_8, -18);
    local_30 = (FUN_006e7e9c(local_8, -18) + 8);
    local_30 = DAT_006e4ff0;
    local_30 = 0;
    local_30 = FUN_006e7dac(0, 0x7f00);
    local_30 = 0;
    local_30 = 0;
    local_30 = s_MSListBoxClass_00638394;
    FUN_006e7da8(DAT_ffffffd0);
    DAT_00638384 = 1;
    FUN_006e7e1c(local_8);
  }
  local_38 = 0x40a10001;
  if ((param_3 !== 0)) {
    local_38 = 0x50a10001;
  }
  if ((param_4 === 1)) {
    local_38 = (local_38 | 0x800);
  }
  pvVar9 = 0;
  pHVar7 = 0;
  pHVar8 = DAT_006e4ff0;
  FUN_0040f810();
  iVar2 = FUN_00414d10();
  pHVar6 = s32((iVar2 + 4), 0);
  iVar2 = FUN_00407fc0(param_1);
  iVar3 = FUN_00407f90(param_1);
  local_8 = FUN_006e7d50(4, s_MSListBoxClass_006383a8, DAT_006383a4, local_38, s32(param_1, 0), s32(param_1, 1), iVar3, iVar2, pHVar6, pHVar7, pHVar8, pvVar9);
  uVar4 = FUN_004d8af0();
  pWVar5 = FUN_005dcdf9(uVar4);
  FUN_006e7d6c(local_8, 0x30, s32(pWVar5, 0), 0);
  uVar4 = FUN_004d8af0();
  FUN_005dce29(uVar4);
  FUN_006e7db0(local_8, -4, 0x5d39e2);
  FUN_006e7db0(local_8, DAT_006e47f4, DAT_006e47f0);
  FUN_006e7db0(local_8, (DAT_006e47f4 + 4), param_2);
  return local_8;
}


 export function FUN_005d39e2 (param_1, param_2, param_3, param_4)

 {
  let DVar1;
  let lpPrevWndFunc;
  let this;
  let uVar2;
  let pHVar3;
  let LVar4;
  let iVar5;

  DVar1 = FUN_006e7e9c(param_1, -18);
  lpPrevWndFunc = FUN_006e7e2c(param_1, (DVar1 - 8));
  this = FUN_006e7e2c(param_1, (DVar1 - 4));
  if ((this === 0)) {
    return 1;
  }
  uVar2 = FUN_0040f810();
  FUN_005c6303(uVar2);
  if ((param_2 < 0x103)) {
    if ((0xff < param_2)) {
      if ((param_3 !== 0x1b)) param_3 = (param_3 !== 0xd) param_3 = (param_3 !== 0x1b) {
        LVar4 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
        return LVar4;
      }
      pHVar3 = FUN_006e7e40(param_1);
      FUN_006e7d6c(pHVar3, param_2, param_3, param_4);
      return 1;
    }
    if ((param_2 === 2)) {
      if ((this !== 0)) {
        this = delbuf(this, 0);
      }
      LVar4 = FUN_006e7eb4(lpPrevWndFunc, param_1, 2, param_3, param_4);
      return LVar4;
    }
  }
  else {
    if ((param_2 === 0x204)) param_2 = (param_2 === 0x204) {
      iVar5 = 0;
      pHVar3 = FUN_006e7e40(param_1);
      FUN_006e7e2c(pHVar3, iVar5);
      iVar5 = FUN_00414d10();
      if (((_MEM[(iVar5 + 0x49)] & 2) !== 0)) {
        pHVar3 = FUN_006e7e40(param_1);
        FUN_006e7d94(pHVar3);
        pHVar3 = FUN_006e7e40(param_1);
        FUN_006e7da0(pHVar3);
      }
      LVar4 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
      return LVar4;
    }
    if ((param_2 === 0x4c8)) {
      if (((param_3 >>> 0x10) === 1)) {
        if ((this === 0)) {
          return 1;
        }
        FUN_005d3f70();
        return 1;
      }
      if (((param_3 >>> 0x10) !== 2)) {
        return 1;
      }
      FUN_005d3f30();
      return 1;
    }
  }
  LVar4 = FUN_006e7eb4(lpPrevWndFunc, param_1, param_2, param_3, param_4);
  return LVar4;
}


 export function FUN_005d3c40 ()

 {
  return;
}


 export function FUN_005d3c50 (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0x180, 0, param_2);
  return;
}


 export function FUN_005d3c75 (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0x182, param_2, 0);
  return;
}


 export function FUN_005d3c9a (param_1, param_2)

 {
  let pWVar1;

  pWVar1 = FUN_005dcdf9(param_2);
  FUN_006e7d6c(param_1, 0x30, s32(pWVar1, 0), 0);
  FUN_005dce29(param_2);
  return;
}


 export function FUN_005d3cdc (param_1)

 {
  FUN_006e7d6c(param_1, 0x184, 0, 0);
  return;
}


 export function FUN_005d3cff (param_1, param_2, param_3)

 {
  FUN_006e7d6c(param_1, 0x189, param_2, param_3);
  return;
}


 export function FUN_005d3d26 (param_1, param_2, param_3)

 {
  FUN_006e7d6c(param_1, 0x182, param_2, 0);
  FUN_006e7d6c(param_1, 0x181, param_2, param_3);
  return;
}


 export function FUN_005d3d62 (param_1, param_2)

 {
  let LVar1;

  LVar1 = FUN_006e7d6c(param_1, 0x188, 0, 0);
  if ((LVar1 === -1)) {
    FUN_005f22d0(param_2, DAT_006383b8);
  }
  else {
    FUN_005d3cff(param_1, LVar1, param_2);
  }
  return;
}


 export function FUN_005d3dbf (param_1)

 {
  let LVar1;

  LVar1 = FUN_006e7d6c(param_1, 0x188, 0, 0);
  if ((LVar1 === -1)) {
    LVar1 = -1;
  }
  return LVar1;
}


 export function FUN_005d3e04 (param_1)

 {
  let LVar1;

  LVar1 = FUN_006e7d6c(param_1, 0x190, 0, 0);
  if ((LVar1 === -1)) {
    LVar1 = -1;
  }
  return LVar1;
}


 export function FUN_005d3e49 (param_1, param_2, param_3)

 {
  let LVar1;

  LVar1 = FUN_006e7d6c(param_1, 0x191, param_3, param_2);
  if ((LVar1 === -1)) {
    LVar1 = -1;
  }
  return LVar1;
}


 export function FUN_005d3e92 (param_1, param_2)

 {
  FUN_006e7d6c(param_1, 0x186, param_2, 0);
  return;
}


 export function FUN_005d3eb7 (param_1, param_2, param_3)

 {
  FUN_006e7d6c(param_1, 0x183, param_2, param_3);
  return;
}


 export function FUN_005d3ede (param_1, param_2, param_3)

 {
  FUN_006e7d6c(param_1, 0x183, param_3, param_2);
  return;
}


 export function FUN_005d3f05 (param_1, param_2, param_3)

 {
  FUN_006e7d6c(param_1, 0x185, s8(param_3), param_2);
  return;
}


 export function FUN_005d3f30 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) !== 0)) {
    in_ECX = (in_ECX + 0x30);
  }
  return;
}


 export function FUN_005d3f70 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    in_ECX = (in_ECX + 0x34);
  }
  return;
}


 export function FUN_005d3fb0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = 0;
  while ((s32((s32((in_ECX + 0x48), 0) + local_8 * 0xa4), 0) === param_1)) {
    if ((s32((in_ECX + 0x38), 0) <= local_8)) {
      return 0;
    }
    if ((s32((s32((in_ECX + 0x48), 0) + local_8 * 0xa4), 0) === param_1)) break; local_8 = (local_8 + 1) return 1


 export function FUN_005d4014 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  (local_8 < s32((in_ECX + 0x38), 0)) (local_8 = 0; local_8 = (local_8 < s32((in_ECX + 0x38), 0)); local_8 = (local_8 + 1)) {
    FUN_005c8b2d(s32((s32((in_ECX + 0x48), 0) + local_8 * 0xa4), 0));
    FUN_005c8b00(s32((s32((in_ECX + 0x48), 0) + local_8 * 0xa4), 0));
  }
  return;
}


 export function FUN_005d4087 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  (local_8 < s32((in_ECX + 0x38), 0)) (local_8 = 0; local_8 = (local_8 < s32((in_ECX + 0x38), 0)); local_8 = (local_8 + 1)) {
    FUN_005c8b58(s32((s32((in_ECX + 0x48), 0) + local_8 * 0xa4), 0));
  }
  return;
}


 export function FUN_005d40dd (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  (local_8 < s32((in_ECX + 0x38), 0)) (local_8 = 0; local_8 = (local_8 < s32((in_ECX + 0x38), 0)); local_8 = (local_8 + 1)) {
    FUN_00447210(local_8);
  }
  return;
}


 export function FUN_005d4122 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  (local_8 < s32((in_ECX + 0x38), 0)) (local_8 = 0; local_8 = (local_8 < s32((in_ECX + 0x38), 0)); local_8 = (local_8 + 1)) {
    FUN_00421ca0(local_8);
  }
  return;
}


 export function FUN_005d4167 (param_1)

 {
  PTR_DAT_00637e64 = param_1;
  return;
}


 export function FUN_005d417f (param_1)

 {
  DAT_00637e7c = param_1;
  return;
}


 export function FUN_005d4197 (param_1)

 {
  DAT_00637e8c = param_1;
  return;
}


 export function FUN_005d41af (param_1, param_2, param_3)

 {
  DAT_00637e80 = param_1;
  DAT_00637e84 = param_2;
  DAT_00637e88 = param_3;
  return;
}


 export function FUN_005d41e0 ()

 {
  let DVar1;

  DVar1 = FUN_006e7b58();
  return (DVar1 * 6 / 0x64 | 0);
}


 export function FUN_005d4204 (param_1)

 {
  let iVar1;
  let iVar2;

  iVar1 = FUN_005d41e0();
  while (((iVar1 + param_1) <= iVar2)) {
    iVar2 = FUN_005d41e0();
    if (((iVar1 + param_1) <= iVar2)) break; FUN_00407ff0() return


 export function FUN_005d423c (param_1)

 {
  let uTimerID;
  let local_8;

  local_8 = 0;
  DAT_006e4804 = FUN_006e7c30(s_timerdll.dll_006383c0);
  if ((FUN_006e7c30(s_timerdll.dll_006383c0) === 0)) {
    local_8 = FUN_006e7d50(0, s_MSMrTimerClass_006384a4, s_MrTimer_0063849c, 0xcf0000, -0x80000000, -0x80000000, -0x80000000, -0x80000000, 0, 0, DAT_006e4ff0, 0);
    if ((local_8 !== 0)) {
      FUN_006e7db0(local_8, 0, param_1);
      DAT_006383bc = 0;
    }
  }
  else {
    DAT_006e4808 = FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_TimerCallBack_006383d0);
    DAT_006e4810 = FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_SetTimerID_006383e0);
    DAT_006e47fc = FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_GetTimerID_006383ec);
    DAT_006e4800 = FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_GetTimerIndex_006383f8);
    DAT_006e480c = FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_ResetTimerNotified_00638408);
    if ((FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_ResetTimerNotified_00638408) === 0)) DAT_006e4810 = (FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_SetTimerID_006383e0) === 0) DAT_006e47fc = (FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_GetTimerID_006383ec) === 0) DAT_006e4800 = (FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_GetTimerIndex_006383f8) === 0) DAT_006e480c = (FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_ResetTimerNotified_00638408) === 0) {
      FUN_005dae6b(9, s_ERR_DYNAMICLINKFAILED_00638438, s_D:\Ss\Smeds32\Pctimer.cpp_0063841c, 0x55);
      FUN_006e7c28(FUN_006e7c30(s_timerdll.dll_006383c0));
    }
    else {
      local_8 = FUN_006e7d50(0, s_MSMrTimerClass_00638458, s_MrTimer_00638450, 0xcf0000, -0x80000000, -0x80000000, -0x80000000, -0x80000000, 0, 0, DAT_006e4ff0, 0);
      if ((local_8 === 0)) {
        FUN_005dae6b(0xa, s_ERR_CANTCREATEWINDOW_00638484, s_D:\Ss\Smeds32\Pctimer.cpp_00638468, 0x71);
        FUN_006e7c28(FUN_006e7c30(s_timerdll.dll_006383c0));
      }
      else {
        FUN_006e7fb8(5);
        FUN_006e7db0(local_8, 0, param_1);
        uTimerID = FUN_006e7f54(0x64, 5, FUN_006e7c2c(FUN_006e7c30(s_timerdll.dll_006383c0), s_TimerCallBack_006383d0), local_8, 1);
        if ((uTimerID === 0)) {
          DAT_006383bc = 0;
        }
        else {
          FUN_006e7f5c(uTimerID);
        }
      }
    }
  }
  return local_8;
}


 export function FUN_005d447c (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7f80(5);
    FUN_006e7e1c(param_1);
    DAT_006e4808 = 0;
    FUN_006e7c28(DAT_006e4804);
  }
  return;
}


 export function FUN_005d44be (param_1, param_2, param_3)

 {
  let MVar1;
  let uVar2;
  let UVar3;

  if ((DAT_006383bc === 0)) {
    if ((DAT_00637ef8 === 0)) {
      UVar3 = FUN_006e7eb8(param_1, param_3, param_2, 0);
      if ((UVar3 === 0)) {
        FUN_005dae6b(0xb, s_ERR_TIMERSETFAILED_00638530, s_D:\Ss\Smeds32\Pctimer.cpp_00638514, 0xc3);
        uVar2 = 0;
      }
      else {
        uVar2 = 1;
      }
    }
    else {
      MVar1 = FUN_006e7f54(param_2, 5, DAT_006e4808, param_1, 1);
      if ((MVar1 === 0)) {
        FUN_005dae6b(0xb, s_ERR_TIMERSETFAILED_00638560, s_D:\Ss\Smeds32\Pctimer.cpp_00638544, 0xd7);
        uVar2 = 0;
      }
      else {
        DAT_006e4810 = DAT_006e4810(param_3, MVar1);
        uVar2 = 1;
      }
    }
  }
  else if ((DAT_00637ef8 === 0)) {
    MVar1 = FUN_006e7f54(param_2, 5, DAT_006e4808, param_1, 1);
    if ((MVar1 === 0)) {
      FUN_005dae6b(0xb, s_ERR_TIMERSETFAILED_006384d0, s_D:\Ss\Smeds32\Pctimer.cpp_006384b4, 0xa8);
      uVar2 = 0;
    }
    else {
      DAT_006e4810 = DAT_006e4810(param_3, MVar1);
      uVar2 = 1;
    }
  }
  else {
    UVar3 = FUN_006e7eb8(param_1, param_3, param_2, 0);
    if ((UVar3 === 0)) {
      FUN_005dae6b(0xb, s_ERR_TIMERSETFAILED_00638500, s_D:\Ss\Smeds32\Pctimer.cpp_006384e4, 0xb4);
      uVar2 = 0;
    }
    else {
      uVar2 = 1;
    }
  }
  return uVar2;
}


 export function FUN_005d4664 (param_1, param_2)

 {
  let UVar1;

  if ((DAT_006383bc === 0)) {
    if ((DAT_00637ef8 === 0)) {
      FUN_006e7ebc(param_1, param_2);
    }
    else {
      UVar1 = DAT_006e47fc(param_2);
      FUN_006e7f5c(UVar1);
      DAT_006e4810 = DAT_006e4810(param_2, 0);
    }
  }
  else if ((DAT_00637ef8 === 0)) {
    UVar1 = DAT_006e47fc(param_2);
    FUN_006e7f5c(UVar1);
    DAT_006e4810 = DAT_006e4810(param_2, 0);
  }
  else {
    FUN_006e7ebc(param_1, param_2);
  }
  return;
}


 export function FUN_005d4700 (param_1, param_2, param_3, param_4)

 {
  let LVar1;
  let LVar2;

  LVar1 = FUN_006e7e2c(param_1, 0);
  if ((LVar1 === 0)) {
    LVar2 = FUN_006e7e80(param_1, param_2, param_3, param_4);
  }
  else {
    if ((param_2 === 0x113)) {
      FUN_005d47d0(param_3);
    }
    else {
      if ((param_2 !== 0x52c)) {
        LVar2 = FUN_006e7e80(param_1, param_2, param_3, param_4);
        return LVar2;
      }
      FUN_005d47d0(param_3);
      DAT_006e480c = DAT_006e480c(param_3);
    }
    LVar2 = 0;
  }
  return LVar2;
}


 export function FUN_005d47d0 (in_ECX, param_1)

 {
  let piVar1;
  // in_ECX promoted to parameter;

  if ((s32(((in_ECX + 0x48) + param_1 * 4), 0) !== 0)) in_ECX = (in_ECX + 0x48) {
    if ((0 < s32(((in_ECX + 0x48) + param_1 * 4), 0))) {
      piVar1 = ((in_ECX + 0x48) + param_1 * 4);
      w32(piVar1, 0, (s32(piVar1, 0) + -1));
    }
    in_ECX = (in_ECX + 4);
    if ((s32(((in_ECX + 0x48) + param_1 * 4), 0) === 0)) {
      FUN_005d20e6(param_1);
    }
  }
  return;
}


 export function FUN_005d4870 (param_1, param_2, param_3)

 {
  let uVar1;

  uVar1 = FUN_005d6038(param_1, param_2, param_3, 0);
  return uVar1;
}


 export function FUN_005d4899 (param_1, param_2)

 {
  let iVar1;

  FUN_005c62ee();
  iVar1 = FUN_00414d10(param_1, param_2);
  FUN_005d48f0(s32((iVar1 + 4), 0));
  return;
}


 export function FUN_005d48d0 ()

 {
  FUN_005d4965();
  return;
}


 export function FUN_005d48f0 (param_1, param_2, param_3)

 {
  let iVar1;

  DAT_0063857c = param_1;
  DAT_00638580 = param_2;
  DAT_00638584 = param_3;
  DAT_00638588 = param_3;
  iVar1 = FUN_005d4a11(param_1, 0, DAT_00638578);
  if ((iVar1 === 0)) {
    FUN_005d645e(param_2, DAT_00638578, param_3);
    iVar1 = 0;
  }
  return iVar1;
}


 export function FUN_005d4965 ()

 {
  if ((DAT_00638578 !== 0)) {
    FUN_005d6b89(DAT_00638578);
    FUN_005d4bcb(DAT_00638578);
  }
  return;
}


 export function FUN_005d49a3 (param_1)

 {
  if ((param_1 === 0xa)) {
    FUN_006e7dd4(0, s_This_Sound_format_is_not_support_006385e4, s_Sound_Error_006385d8, 0x40);
  }
  else if ((param_1 !== 0xb)) {
    FUN_006e7dd4(0, s_Undefined_Sound_Error_00638614, s_Sound_Error_00638608, 0x40);
  }
  return;
}


 export function FUN_005d4a11 (param_1, param_2, param_3)

 {
  let bVar1;
  let UVar2;
  let local_14;
  let local_10;
  let local_8;

  bVar1 = 0;
  if ((DAT_006385b0 === 0)) {
    if ((param_2 !== 0)) {
      DAT_006385a0 = s32(param_2, 0);
      DAT_006385a4 = s32(param_2, 1);
      DAT_006385a8 = s32(param_2, 2);
      DAT_006385ac = s32(param_2, 3);
    }
    UVar2 = FUN_006e7f60();
    (local_10 < UVar2) (local_10 = 0; local_10 = local_10; local_10 = (local_10 + 1)) {
      FUN_006e7f68(local_10, DAT_006e4818, 0x34);
      if (((DAT_006e4840 & 0x20) !== 0)) {
        bVar1 = 0;
        local_14 = local_10;
        break;
      }
      if (((DAT_006e4840 & 0x10) !== 0)) {
        local_14 = local_10;
        bVar1 = 1;
      }
    }
    if ((local_10 !== UVar2)) local_10 = (local_10 !== UVar2) {
      if (bVar1) {
        DAT_006385a0 = ((1 << 16) | ((DAT_006385a0) & 0xFFFF));
        DAT_006385a8 = 0x5622;
        DAT_006385ac = (((((DAT_006385ac) >> 16) & 0xFFFF) << 16) | 1);
      }
      local_8 = FUN_006e7f64(DAT_00638578, local_14, DAT_006385a0, param_1, 0, 0x10000);
      if ((((local_8) & 0xFFFF) !== 0)) {
        FUN_006e7fb0(0, 0);
        local_8 = FUN_006e7f64(DAT_00638578, local_14, DAT_006385a0, param_1, 0, 0x10000);
      }
      local_8 = (local_8 & 0xffff);
      if ((param_3 !== 0)) DAT_006385b0 = 1 param_3 = (param_3 !== 0) {
        w32(param_3, 0, DAT_00638578);
      }
    }
    else {
      FUN_005d49a3(0xb);
      local_8 = 0xb;
    }
  }
  else {
    local_8 = 0;
  }
  return local_8;
}


 export function FUN_005d4bcb (param_1)

 {
  let MVar1;
  let local_8;

  local_8 = 0;
  if ((DAT_006385b0 !== 0)) {
    MVar1 = FUN_006e7f70(param_1);
    local_8 = (MVar1 & 0xffff);
  }
  DAT_006385b0 = 0;
  return local_8;
}


 export function FUN_005d4c18 (param_1)

 {
  let local_cc;

  FUN_006e7f74((param_1 & 0xffff), DAT_ffffff34, 0xc8);
  FUN_006e7dd4(0, DAT_ffffff34, s_Wave_Out_Error_0063862c, 0x40);
  return;
}


 export function FUN_005d4c5f (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let MVar2;
  let DVar3;
  let iVar4;
  let p_Var5;
  let p_Var6;
  let pDVar7;
  let pFVar8;
  let local_98;
  let local_84;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_8;

  _memset(DAT_ffffff7c, 0, 0x48);
  local_84 = DAT_006385cc;
  local_8 = FUN_006e7f90(param_1, DAT_ffffff7c, 0x10000);
  if ((local_8 === 0)) {
    uVar1 = 7;
  }
  else {
    local_1c = 0x45564157;
    MVar2 = FUN_006e7f84(local_8, DAT_ffffffe4, 0, 0x20);
    if ((MVar2 === 0)) {
      local_98 = 0x20746d66;
      MVar2 = FUN_006e7f84(local_8, DAT_ffffff68, DAT_ffffffe4, 0x10);
      if ((MVar2 === 0)) {
        local_38 = UNNAMED;
        DVar3 = FUN_006e7f8c(local_8, DAT_ffffffd4, UNNAMED);
        if ((DVar3 === local_38)) {
          if (((((local_20) >> 16) & 0xFFFF) === 8)) local_20 = ((((local_20) >> 16) & 0xFFFF) === 8) {
            FUN_006e7f88(local_8, DAT_ffffff68, 0);
            local_98 = 0x61746164;
            MVar2 = FUN_006e7f84(local_8, DAT_ffffff68, DAT_ffffffe4, 0x10);
            if ((MVar2 === 0)) {
              FUN_006e7f78(local_8, DAT_ffffff7c, 0);
              FUN_006e7f7c(local_8, DAT_ffffff7c, 0);
              local_30 = FUN_006e7af0(0x2002, 0xbc);
              if ((local_30 === 0)) {
                FUN_006e7f6c(local_8, 0);
                uVar1 = 2;
              }
              else {
                local_34 = FUN_006e7ae4(local_30);
                if ((local_34 === 0)) {
                  FUN_006e7f6c(local_8, 0);
                  FUN_006e7b40(local_30);
                  uVar1 = 2;
                }
                else {
                  _memset(local_34, 0, 0xbc);
                  w32(local_34, 0x1b, local_30);
                  w32(local_34, 0, local_8);
                  p_Var5 = DAT_ffffff7c;
                  pDVar7 = (local_34 + 6);
                  (iVar4 !== 0) (iVar4 = 0x12; iVar4 = (iVar4 !== 0); iVar4 = (iVar4 + -1)) {
                    w32(pDVar7, 0, s32(DAT_00000000, 0));
                    p_Var5 = DAT_00000004;
                    pDVar7 = (pDVar7 + 1);
                  }
                  p_Var6 = DAT_ffffff68;
                  pFVar8 = local_34;
                  (iVar4 !== 0) (iVar4 = 5; pFVar8 = (pFVar8 + 1), iVar4 = (iVar4 !== 0); iVar4 = (iVar4 + -1)) {
                    w32(pFVar8, 1, s32(DAT_00000000, 0));
                    p_Var6 = DAT_00000004;
                  }
                  w16((local_34 + 0x8a), 0, param_3);
                  w32(local_34, 0x1d, local_2c);
                  w32(local_34, 0x1e, local_28);
                  w32(local_34, 0x1f, local_24);
                  w32(local_34, 0x20, local_20);
                  w16((local_34 + 0x22), 0, 1);
                  w32(local_34, 0x2d, param_4);
                  if ((DAT_006385d0 === 0)) {
                    DAT_006385d0 = local_34;
                  }
                  else {
                    (s32(local_3c, 0x2e) !== 0) (local_3c = DAT_006385d0; local_3c = (local_3c + 0x2e);
                        local_3c = s32(local_3c, 0x2e)) {
                    }
                    w32(local_3c, 0x2e, local_34);
                  }
                  uVar1 = 0;
                }
              }
            }
            else {
              FUN_006e7f6c(local_8, 0);
              uVar1 = 8;
            }
          }
          else {
            FUN_005d49a3(0xa);
            FUN_006e7f6c(local_8, 0);
            uVar1 = 0xa;
          }
        }
        else {
          FUN_006e7f6c(local_8, 0);
          uVar1 = 8;
        }
      }
      else {
        FUN_006e7f6c(local_8, 0);
        uVar1 = 8;
      }
    }
    else {
      FUN_006e7f6c(local_8, 0);
      uVar1 = 8;
    }
  }
  return uVar1;
}


 export function FUN_005d4f6a (param_1, param_2, param_3)

 {
  let uVar1;
  let MVar2;
  let DVar3;
  let iVar4;
  let p_Var5;
  let p_Var6;
  let pDVar7;
  let pFVar8;
  let local_9c;
  let local_88;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_c;
  let local_8;

  local_c = FUN_006e7f90(param_1, 0, 0);
  if ((local_c === 0)) {
    uVar1 = 7;
  }
  else {
    local_20 = 0x45564157;
    MVar2 = FUN_006e7f84(local_c, DAT_ffffffe0, 0, 0x20);
    if ((MVar2 === 0)) {
      local_9c = 0x20746d66;
      MVar2 = FUN_006e7f84(local_c, DAT_ffffff64, DAT_ffffffe0, 0x10);
      if ((MVar2 === 0)) {
        local_3c = UNNAMED;
        DVar3 = FUN_006e7f8c(local_c, DAT_ffffffd0, UNNAMED);
        if ((DVar3 === local_3c)) {
          if (((((local_24) >> 16) & 0xFFFF) === 8)) local_24 = ((((local_24) >> 16) & 0xFFFF) === 8) {
            FUN_006e7f88(local_c, DAT_ffffff64, 0);
            local_9c = 0x61746164;
            MVar2 = FUN_006e7f84(local_c, DAT_ffffff64, DAT_ffffffe0, 0x10);
            if ((MVar2 === 0)) {
              _memset(DAT_ffffff78, 0, 0x48);
              local_88 = DAT_006385cc;
              local_88 = 0x204d454d;
              local_88 = 0;
              local_8 = FUN_006e7f90(0, DAT_ffffff78, 0x11002);
              if ((local_8 === 0)) {
                uVar1 = 7;
              }
              else {
                FUN_006e7f78(local_8, DAT_ffffff78, 0);
                local_34 = FUN_006e7af0(0x2002, 0xbc);
                if ((local_34 === 0)) {
                  uVar1 = 2;
                }
                else {
                  local_38 = FUN_006e7ae4(local_34);
                  if ((local_38 === 0)) {
                    FUN_006e7b40(local_34);
                    uVar1 = 2;
                  }
                  else {
                    _memset(local_38, 0, 0xbc);
                    w32(local_38, 0x1b, local_34);
                    w16((local_38 + 0x22), 0, 1);
                    w32(local_38, 0x1d, local_30);
                    w32(local_38, 0x1e, local_2c);
                    w32(local_38, 0x1f, local_28);
                    w32(local_38, 0x20, local_24);
                    w32(local_38, 0, local_8);
                    w32(local_38, 0x18, local_c);
                    p_Var5 = DAT_ffffff78;
                    pDVar7 = (local_38 + 6);
                    (iVar4 !== 0) (iVar4 = 0x12; iVar4 = (iVar4 !== 0); iVar4 = (iVar4 + -1)) {
                      w32(pDVar7, 0, s32(DAT_00000000, 0));
                      p_Var5 = DAT_00000004;
                      pDVar7 = (pDVar7 + 1);
                    }
                    p_Var6 = DAT_ffffff64;
                    pFVar8 = local_38;
                    (iVar4 !== 0) (iVar4 = 5; pFVar8 = (pFVar8 + 1), iVar4 = (iVar4 !== 0); iVar4 = (iVar4 + -1)) {
                      w32(pFVar8, 1, s32(DAT_00000000, 0));
                      p_Var6 = DAT_00000004;
                    }
                    w32(local_38, 0x1c, (s32(local_38, 0x1c) | 4));
                    w16((local_38 + 0x8a), 0, param_3);
                    FUN_005d6283(local_38);
                    if ((DAT_006385d0 === 0)) {
                      DAT_006385d0 = local_38;
                    }
                    else {
                      (s32(local_40, 0x2e) !== 0) (local_40 = DAT_006385d0; local_40 = (local_40 + 0x2e);
                          local_40 = s32(local_40, 0x2e)) {
                      }
                      w32(local_40, 0x2e, local_38);
                    }
                    uVar1 = 0;
                  }
                }
              }
            }
            else {
              FUN_006e7f6c(local_c, 0);
              uVar1 = 8;
            }
          }
          else {
            FUN_005d49a3(0xa);
            FUN_006e7f6c(local_c, 0);
            uVar1 = 0xa;
          }
        }
        else {
          FUN_006e7f6c(local_c, 0);
          uVar1 = 8;
        }
      }
      else {
        FUN_006e7f6c(local_c, 0);
        uVar1 = 8;
      }
    }
    else {
      FUN_006e7f6c(local_c, 0);
      uVar1 = 8;
    }
  }
  return uVar1;
}


 export function FUN_005d52a2 (param_1)

 {
  let uVar1;
  let iVar2;
  let p_Var3;
  let pDVar4;
  let local_10c;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_b4;
  let local_b0;
  let local_ac;
  let local_a8;
  let local_a4;
  let local_a0;
  let local_9c;
  let local_98;
  let local_78;
  let local_68;
  let local_c;
  let local_8;

  local_a0 = 0xe;
  if ((DAT_00638578 === 0)) {
    uVar1 = 3;
  }
  else if ((param_1 === 0)) {
    uVar1 = 0xc;
  }
  else if ((s16((DAT_006385d0 + 0x22), 0) !== 4)) DAT_006385d0 = (DAT_006385d0 + 0x22) {
    AVIStreamInfoA(param_1, DAT_ffffff68, 0x8c);
    if ((UNNAMED === 0x73647561)) {
      AVIStreamRead(param_1, 0, 1, 0, 0, DAT_ffffff54, 0);
      local_a4 = local_68 * local_78;
      AVIStreamReadFormat(param_1, 0, DAT_ffffff3c, DAT_ffffff60);
      if ((DAT_006385a0+2 === 1)) {
        if (((((local_c4) >> 16) & 0xFFFF) === 2)) {
          local_8 = (((((local_8) >> 16) & 0xFFFF) << 16) | 1);
        }
        else {
          local_8 = (((((local_8) >> 16) & 0xFFFF) << 16) | 2);
        }
      }
      else if (((((local_c4) >> 16) & 0xFFFF) === 2)) {
        local_8 = ((((((local_8) >> 16) & 0xFFFF)) & 0xFFFF) << 0x10);
      }
      else {
        local_8 = (((((local_8) >> 16) & 0xFFFF) << 16) | 3);
      }
      _memset(DAT_fffffef4, 0, 0x48);
      if (((local_8 & 0xffff) === 1)) {
        local_10c = DAT_006385cc * 2;
      }
      else if (((local_8 & 0xffff) === 3)) {
        local_10c = (DAT_006385cc >>> 1);
      }
      else {
        local_10c = DAT_006385cc;
      }
      local_a8 = (UNNAMED / DAT_00638584 | 0);
      local_10c = 0x204d454d;
      local_10c = 0;
      local_c = FUN_006e7f90(0, DAT_fffffef4, 0x11002);
      if ((local_c === 0)) {
        uVar1 = 7;
      }
      else {
        FUN_006e7f78(local_c, DAT_fffffef4, 0);
        local_b0 = FUN_006e7af0(0x2002, 0xbc);
        if ((local_b0 === 0)) {
          uVar1 = 2;
        }
        else {
          local_b4 = FUN_006e7ae4(local_b0);
          if ((local_b4 === 0)) {
            FUN_006e7b40(local_b0);
            uVar1 = 2;
          }
          else {
            _memset(local_b4, 0, 0xbc);
            w32(local_b4, 0x1b, local_b0);
            w16((local_b4 + 0x22), 0, 4);
            w32(local_b4, 0x1d, local_c4);
            w32(local_b4, 0x1e, local_c0);
            w32(local_b4, 0x1f, local_bc);
            w32(local_b4, 0x20, local_b8);
            w32(local_b4, 0, local_c);
            p_Var3 = DAT_fffffef4;
            pDVar4 = (local_b4 + 6);
            (iVar2 !== 0) (iVar2 = 0x12; iVar2 = (iVar2 !== 0); iVar2 = (iVar2 + -1)) {
              w32(pDVar4, 0, s32(DAT_00000000, 0));
              p_Var3 = DAT_00000004;
              pDVar4 = (pDVar4 + 1);
            }
            w32(local_b4, 1, UNNAMED);
            w32(local_b4, 2, local_a4);
            w32(local_b4, 0x21, param_1);
            w32(local_b4, 0x1c, (s32(local_b4, 0x1c) | 2));
            w32(local_b4, 0x27, local_a8);
            (1 < local_9c) (local_9c = UNNAMED; 1 = (1 < local_9c); local_9c = (local_9c >>> 1)) {
              w32(local_b4, 0x2a, (s32(local_b4, 0x2a) << 1));
              w32(local_b4, 0x2a, (s32(local_b4, 0x2a) + 1));
            }
            w32(local_b4, 0x2e, DAT_006385d0);
            DAT_006385d0 = local_b4;
            DAT_0063858c = (DAT_0063858c + 1);
            uVar1 = 0;
          }
        }
      }
    }
    else {
      uVar1 = 9;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_005d5643 ()

 {
  let local_10;

  local_10 = 2;
  if ((DAT_006385b0 !== 0)) {
    FUN_006e7f94(DAT_00638578, DAT_fffffff0, 0xc);
  }
  if ((UNNAMED !== 1)) wType {
    if ((UNNAMED === 2)) wType {
      local_10 = __ftol();
    }
    else if ((UNNAMED === 4)) wType {
      local_10 = __ftol();
    }
    else {
      local_10 = 0;
    }
  }
  return UNNAMED;
}


 export function FUN_005d5706 ()

 {
  let local_10;

  local_10 = 2;
  if ((DAT_006385b0 !== 0)) {
    FUN_006e7f94(DAT_00638578, DAT_fffffff0, 0xc);
  }
  if ((UNNAMED === 1)) wType {
    local_10 = __ftol();
  }
  else if ((UNNAMED !== 2)) wType {
    if ((UNNAMED === 4)) wType {
      local_10 = (UNNAMED / ((None) & 0xFFFF) | 0);
    }
    else {
      local_10 = 0;
    }
  }
  return UNNAMED;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005d57b1 (param_1)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_24;
  let local_20;
  let local_c;
  let local_8;

  iVar1 = DAT_006385d0;
  if ((DAT_00638578 === 0)) {
    uVar2 = 3;
  }
  else if ((DAT_006385bc === 0)) {
    uVar2 = 0xe;
  }
  else if ((s16((DAT_006385d0 + 0x88), 0) !== 4)) DAT_006385d0 = (DAT_006385d0 + 0x88) {
    uVar2 = 5;
  }
  else if (((_MEM[(DAT_006385d0 + 0x70)] & 1) === 0)) {
    if ((((s32((s32((DAT_006385d0 + 0x98), 0) + 0xc), 0) >>> 3) & 1) === 0)) {
      if (((((s32((s32((DAT_006385d0 + 0x98), 0) + 0xc), 0) >>> 7) - (s32((DAT_006385c8 + 0xc), 0) >>> 7)) & 7) === 0)) {
        param_1 = ((s32((DAT_006385d0 + 0x9c), 0) - s32((DAT_006385d0 + 0x68), 0)) / ((s16((DAT_006385d0 + 0x80), 0)) & 0xFFFF) | 0);
        _DAT_00638594 = (DAT_00638594 + 1);
      }
      local_c = s32((DAT_006385d0 + 0x98), 0);
      uVar3 = ((s32((DAT_006385d0 + 0x3c), 0) - s32((DAT_006385d0 + 0x34), 0)) / ((s16((DAT_006385d0 + 0x80), 0)) & 0xFFFF) | 0);
      if ((uVar3 < param_1)) {
        param_1 = uVar3;
      }
      local_24 = ((s16((DAT_006385d0 + 0x80), 0)) & 0xFFFF) * param_1;
      uVar3 = (s32((DAT_006385d0 + 0x9c), 0) - s32((DAT_006385d0 + 0x68), 0));
      _DAT_00638598 = param_1;
      if ((uVar3 < local_24)) {
        local_24 = uVar3;
      }
      uVar3 = (s32((DAT_006385d0 + 8), 0) - (s32((DAT_006385d0 + 0x90), 0) - s32((DAT_006385d0 + 0x94), 0)));
      if ((uVar3 < local_24)) {
        local_24 = uVar3;
      }
      local_8 = 0;
      AVIStreamRead(s32((DAT_006385d0 + 0x84), 0), (s32((DAT_006385d0 + 0x90), 0) / ((s16((DAT_006385d0 + 0x80), 0)) & 0xFFFF) | 0), (local_24 / ((s16((DAT_006385d0 + 0x80), 0)) & 0xFFFF) | 0), s32((DAT_006385d0 + 0x34), 0), local_24, DAT_fffffff8, 0);
      w32((DAT_006385d0 + 0x90), 0, (s32((DAT_006385d0 + 0x90), 0) + local_8));
      w32((iVar1 + 0x34), 0, (s32((iVar1 + 0x34), 0) + local_8));
      if ((s32((iVar1 + 0x3c), 0) === s32((iVar1 + 0x34), 0))) {
        w32((iVar1 + 0x34), 0, s32((iVar1 + 0x30), 0));
      }
      w32((DAT_006385d0 + 0x68), 0, (s32((DAT_006385d0 + 0x68), 0) + local_8));
      if ((s32((DAT_006385d0 + 0x9c), 0) <= s32((DAT_006385d0 + 0x68), 0))) {
        w32((local_c + 0xc), 0, (s32((local_c + 0xc), 0) | 8));
        w32((DAT_006385d0 + 0x98), 0, s32((local_c + 0x1c), 0));
        local_c = s32((DAT_006385d0 + 0x98), 0);
        w32((DAT_006385d0 + 0x68), 0, 0);
      }
      if ((s32((DAT_006385d0 + 8), 0) <= (s32((DAT_006385d0 + 0x90), 0) - s32((DAT_006385d0 + 0x94), 0)))) {
        (local_20 < (s32((DAT_006385d0 + 0x9c), 0) - s32((DAT_006385d0 + 0x68), 0))) (local_20 = 0;
            local_20 = (local_20 < (s32((DAT_006385d0 + 0x9c), 0) - s32((DAT_006385d0 + 0x68), 0)));
            local_20 = (local_20 + 1)) {
          _MEM[s32((iVar1 + 0x34), 0)] = 0x80;
          w32((iVar1 + 0x34), 0, (s32((iVar1 + 0x34), 0) + 1));
        }
        if ((s32((iVar1 + 0x3c), 0) === s32((iVar1 + 0x34), 0))) {
          w32((iVar1 + 0x34), 0, s32((iVar1 + 0x30), 0));
        }
        w32((local_c + 0xc), 0, (s32((local_c + 0xc), 0) | 8));
        w32((local_c + 0xc), 0, (s32((local_c + 0xc), 0) | 2));
        w32((DAT_006385d0 + 0x98), 0, s32((local_c + 0x1c), 0));
        w32((DAT_006385d0 + 0x68), 0, 0);
        w32((DAT_006385d0 + 0x70), 0, (s32((DAT_006385d0 + 0x70), 0) | 1));
      }
      _DAT_00638590 = (None + 1);
      uVar2 = 0;
    }
    else {
      uVar2 = 0;
    }
  }
  else {
    uVar2 = 0xe;
  }
  return uVar2;
}


 export function FUN_005d5b88 ()

 {
  let uVar1;

  DAT_006385bc = 0;
  if ((s16((DAT_006385d0 + 0x88), 0) !== 4)) DAT_006385d0 = (DAT_006385d0 + 0x88) {
    uVar1 = 5;
  }
  else {
    DAT_006385d0 = FUN_005d7494(0, DAT_006385d0);
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_005d5bec (param_1)

 {
  let uVar1;
  let iVar2;
  let local_10;
  let local_8;

  local_8 = 0;
  if ((s32((param_1 + 0x30), 0) === s32((param_1 + 0x34), 0))) param_1 = (param_1 + 0x30) {
    uVar1 = (s32((DAT_006385d0 + 8), 0) - (s32((DAT_006385d0 + 0x90), 0) - s32((DAT_006385d0 + 0x94), 0)));
    local_10 = s32((param_1 + 0x2c), 0);
    if ((uVar1 < s32((param_1 + 0x2c), 0))) {
      local_10 = uVar1;
    }
    w32((param_1 + 0x34), 0, s32((param_1 + 0x30), 0));
    AVIStreamRead(s32((param_1 + 0x84), 0), (s32((param_1 + 0x90), 0) / ((s16((param_1 + 0x80), 0)) & 0xFFFF) | 0), (local_10 / ((s16((param_1 + 0x80), 0)) & 0xFFFF) | 0), s32((param_1 + 0x34), 0), local_10, DAT_fffffff8, 0);
    w32((param_1 + 0x90), 0, (s32((param_1 + 0x90), 0) + local_8));
    iVar2 = (s32((param_1 + 0x2c), 0) - local_8);
    if ((iVar2 !== 0)) {
      FUN_005d6b4c((s32((param_1 + 0x34), 0) + local_8), iVar2);
    }
  }
  return;
}


 export function FUN_005d5d11 (param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_00638578 === 0)) {
    uVar1 = 3;
  }
  else if ((s16((DAT_006385d0 + 0x88), 0) !== 4)) DAT_006385d0 = (DAT_006385d0 + 0x88) {
    uVar1 = 5;
  }
  else {
    if ((DAT_00638588 !== DAT_00638584)) {
      FUN_005d687b(DAT_00638584);
    }
    iVar2 = AVIStreamTimeToSample(s32((DAT_006385d0 + 0x84), 0), param_1);
    local_10 = AVIStreamTimeToSample(s32((DAT_006385d0 + 0x84), 0), param_2);
    local_10 = ((s16((DAT_006385d0 + 0x80), 0)) & 0xFFFF) * local_10;
    iVar2 = ((s16((DAT_006385d0 + 0x80), 0)) & 0xFFFF) * iVar2;
    if ((local_10 === 0)) {
      local_10 = (s32((DAT_006385d0 + 8), 0) - iVar2);
    }
    else {
      local_10 = (local_10 - iVar2);
    }
    if ((local_10 < 0)) {
      uVar1 = 0xc;
    }
    else {
      FUN_005d6a2c();
      w32((DAT_006385d0 + 8), 0, local_10);
      w32((DAT_006385d0 + 0x90), 0, iVar2);
      w32((DAT_006385d0 + 0x94), 0, iVar2);
      w32((DAT_006385d0 + 0x64), 0, 0);
      w32((DAT_006385d0 + 0x68), 0, 0);
      w32((DAT_006385d0 + 0x34), 0, s32((DAT_006385d0 + 0x3c), 0));
      FUN_005d5bec(DAT_006385d0);
      w32((DAT_006385d0 + 0x70), 0, (s32((DAT_006385d0 + 0x70), 0) & -3));
      w32((DAT_006385d0 + 0x70), 0, (s32((DAT_006385d0 + 0x70), 0) & -2));
      w32((DAT_006385d0 + 0x8c), 0, param_3);
      DAT_006385bc = 0;
      local_8 = DAT_006385c0;
      (local_c < DAT_00638584) (local_c = 0; local_c = (local_c < DAT_00638584); local_c = (local_c + 1)) {
        w32(local_8, 3, (s32(local_8, 3) & -33));
        w32(local_8, 3, (s32(local_8, 3) & -2));
        w32(local_8, 3, (s32(local_8, 3) & -3));
        w32(local_8, 3, (s32(local_8, 3) & -17));
        w32(local_8, 3, (s32(local_8, 3) & -33));
        w32(local_8, 3, (s32(local_8, 3) & -65));
        w32(local_8, 4, s32(s32(local_8, 0), 0));
        iVar2 = FUN_005d717f(s32(local_8, 0));
        if ((iVar2 === 1)) break; local_8 = s32(local_8, 7) FUN_005d5bec(DAT_006385d0) local_8 = DAT_006385c0 local_c = 0 local_c = (local_c < DAT_00638584) local_c = (local_c + 1) {
        w32(local_8, 3, (s32(local_8, 3) | 8));
        local_8 = s32(local_8, 7);
      }
      DAT_006385c8 = DAT_006385c0;
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005d5f91 ()

 {
  if ((s16((DAT_006385d0 + 0x88), 0) === 4)) DAT_006385d0 = (DAT_006385d0 + 0x88) {
    FUN_005d6947(DAT_006385c0);
    w32((DAT_006385d0 + 0x70), 0, (s32((DAT_006385d0 + 0x70), 0) | 0x10));
    if ((s32((DAT_006385d0 + 0x8c), 0) !== 0)) {
      w16(s32((DAT_006385d0 + 0x8c), 0), 0, (s16(s32((DAT_006385d0 + 0x8c), 0), 0) | 4));
    }
  }
  DAT_006385bc = 1;
  w32((DAT_006385d0 + 0x98), 0, DAT_006385c0);
  return;
}


 export function FUN_005d6038 (param_1, param_2, param_3, param_4)

 {
  let sVar1;
  let iVar2;
  let local_10;
  let local_8;

  if ((DAT_00638578 === 0)) {
    sVar1 = 3;
  }
  else if ((iVar2 !== 0)) iVar2 = FUN_005d48f0(DAT_0063857c, DAT_00638580, DAT_00638584) iVar2 = (iVar2 !== 0) {
    sVar1 = 0;
  }
  else if ((DAT_0063858c < 5)) {
    if (((param_2 & 8) === 0)) {
      sVar1 = FUN_005d4c5f(param_1, param_2, param_3, param_4);
    }
    else {
      sVar1 = FUN_005d4f6a(param_1, param_2, param_3);
    }
    if ((((s32(DAT_006385c8, 3) >>> 5) & 1) === 0)) DAT_0063858c = (DAT_0063858c + 1) DAT_006385c8 = (DAT_006385c8 + 3) {
      local_10 = 0;
      local_8 = DAT_006385c8;
      while ((iVar2 !== 1)) local_10 = (local_10 < DAT_00638588) iVar2 = FUN_005d717f(s32(local_8, 0)) iVar2 = (iVar2 !== 1) {
        local_8 = s32(local_8, 7);
        local_10 = (local_10 + 1);
      }
      FUN_005d6947(DAT_006385c8);
    }
  }
  else {
    sVar1 = 0;
  }
  return sVar1;
}


 export function FUN_005d61ab (param_1)

 {
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = DAT_006385d0;
  while ((local_c !== 0)) local_c = (local_c !== 0) {
    if ((s16((local_c + 0x8a), 0) === param_1)) {
      local_c = FUN_005d7494(local_8, local_c);
    }
    else {
      local_8 = local_c;
      local_c = s32((local_c + 0xb8), 0);
    }
  }
  return;
}


 export function FUN_005d6222 (param_1)

 {
  let local_8;

  (local_8 !== 0) (local_8 = DAT_006385d0; local_8 = (local_8 !== 0); local_8 = s32((local_8 + 0xb8), 0)) {
    if ((s16((local_8 + 0x8a), 0) === param_1)) {
      w32((local_8 + 0x70), 0, (s32((local_8 + 0x70), 0) | 2));
    }
  }
  return;
}


 export function FUN_005d6283 (param_1)

 {
  let iVar1;
  let puVar2;
  let puVar3;
  let local_5c;
  let local_48;
  let local_44;
  let local_40;
  let local_38;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0;
  local_14 = 0;
  puVar2 = (param_1 + 0x18);
  puVar3 = DAT_ffffffa4;
  (iVar1 !== 0) (iVar1 = 0x12; iVar1 = (iVar1 !== 0); iVar1 = (iVar1 + -1)) {
    w32(puVar3, 0, s32(puVar2, 0));
    puVar2 = (puVar2 + 1);
    puVar3 = (puVar3 + 1);
  }
  if ((local_44 === local_40)) {
    local_c = 0;
    local_8 = local_48;
  }
  else {
    local_c = (local_38 - local_40);
    local_8 = (local_48 - local_c);
  }
  if ((local_c === 0)) {
    local_40 = local_44;
  }
  else {
    FID_conflict:_memcpy(local_44, local_40, local_c);
    local_40 = (local_44 + local_c);
  }
  while ((local_14 === 0)) local_14 = (local_14 === 0) {
    local_10 = (s32((param_1 + 8), 0) - s32((param_1 + 0x68), 0));
    if ((local_8 < local_10)) {
      FUN_006e7f8c(s32((param_1 + 0x60), 0), local_40, local_8);
      w32((param_1 + 0x68), 0, (s32((param_1 + 0x68), 0) + local_8));
      w32((param_1 + 0x34), 0, local_44);
      local_14 = 1;
    }
    else {
      FUN_006e7f8c(s32((param_1 + 0x60), 0), local_40, local_10);
      w32((param_1 + 0x68), 0, 0);
      local_40 = (local_40 + local_10);
      local_8 = (local_38 - local_40);
      FUN_006e7f98(s32((param_1 + 0x60), 0), s32((param_1 + 0x10), 0), 0);
    }
  }
  return;
}


 export function FUN_005d63c5 (param_1, param_2)

 {
  let pvVar1;
  let pvVar2;

  pvVar1 = FUN_006e7af0(0x2002, param_1);
  w32(param_2, 0, pvVar1);
  if ((s32(param_2, 0) === 0)) {
    pvVar2 = 0;
  }
  else {
    pvVar2 = FUN_006e7ae4(s32(param_2, 0));
    if ((pvVar2 === 0)) {
      FUN_006e7b40(s32(param_2, 0));
      w32(param_2, 0, 0);
    }
  }
  return pvVar2;
}


 export function FUN_005d6430 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7b20(param_1);
    FUN_006e7b40(param_1);
  }
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005d645e (param_1, param_2, param_3)

 {
  let iVar1;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = (param_1 / param_3 | 0);
  if ((DAT_006385b0 === 0)) {
    local_10 = 3;
  }
  else {
    (local_14 < param_3) (local_14 = 0; local_14 = (local_14 < param_3); local_14 = (local_14 + 1)) {
      local_18 = local_8;
      local_8 = FUN_005d63c5(0x20, DAT_ffffffe4);
      if ((local_8 === 0)) {
        if ((local_14 !== 0)) {
          FUN_005d6b89(param_2);
        }
        return 4;
      }
      if ((local_14 === 0)) {
        DAT_006385c0 = local_8;
        DAT_006385c8 = local_8;
      }
      _memset(local_8, 0, 0x20);
      w32(local_8, 2, local_1c);
      iVar1 = FUN_005d63c5((local_c + 0x20), DAT_ffffffe4);
      w32(local_8, 0, iVar1);
      if ((s32(local_8, 0) === 0)) {
        if ((local_14 !== 0)) {
          FUN_005d6b89(param_2);
        }
        return 4;
      }
      _memset(s32(local_8, 0), 0, 0x20);
      w32(s32(local_8, 0), 0, (s32(local_8, 0) + 0x20));
      w32(local_8, 4, s32(s32(local_8, 0), 0));
      w32((s32(local_8, 0) + 4), 0, local_c);
      w32(local_8, 6, s32((s32(local_8, 0) + 4), 0));
      w32(local_8, 5, (s32(s32(local_8, 0), 0) + s32(local_8, 6)));
      w32((s32(local_8, 0) + 0xc), 0, local_8);
      w32(local_8, 1, local_1c);
      w32(local_8, 3, ((s32(local_8, 3) & -0x7f81) | ((local_14 & 0xff) << 7)));
      local_10 = FUN_006e7f9c(param_2, s32(local_8, 0), 0x20);
      if ((local_10 !== 0)) {
        FUN_005d4c18(local_10);
        FUN_005d6b89(param_2);
        return 5;
      }
      w32((s32(local_8, 0) + 0x10), 0, (s32((s32(local_8, 0) + 0x10), 0) | 1));
      if ((local_18 !== 0)) {
        w32(local_18, 7, local_8);
      }
      local_10 = 0;
    }
    w32(local_8, 7, DAT_006385c0);
    _DAT_006385b4 = 1;
    DAT_006385cc = param_1;
  }
  return local_10;
}


 export function FUN_005d6685 (param_1)

 {
  let uVar1;
  let local_10;
  let local_c;
  let local_8;

  local_8 = DAT_006385c4;
  w32((DAT_006385c4 + 0xc), 0, (s32((DAT_006385c4 + 0xc), 0) & -2));
  (local_10 < (param_1 + -1)) (local_10 = 0; local_10 = local_10; local_10 = (local_10 + 1)) {
    local_8 = s32((local_8 + 0x1c), 0);
    w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) & -2));
  }
  local_c = DAT_006385c0;
  (local_10 < (DAT_00638588 - 1)) (local_10 = 0; local_10 = (local_10 < (DAT_00638588 - 1)); local_10 = (local_10 + 1)) {
    local_c = s32((local_c + 0x1c), 0);
  }
  uVar1 = s32((local_8 + 0x1c), 0);
  w32((local_c + 0x1c), 0, DAT_006385c4);
  DAT_006385c4 = uVar1;
  w32((local_8 + 0x1c), 0, DAT_006385c0);
  DAT_00638588 = (DAT_00638588 + param_1);
  return;
}


 export function FUN_005d673a (param_1)

 {
  let iVar1;
  let local_14;
  let local_8;

  local_8 = DAT_006385c0;
  if (((DAT_00638588 - param_1) <= ((s32((DAT_006385c8 + 0xc), 0) >>> 7) & 0xff))) {
    DAT_006385c8 = DAT_006385c0;
  }
  (local_14 < ((DAT_00638588 - param_1) - 1)) (local_14 = 0; local_14 = (local_14 < ((DAT_00638588 - param_1) - 1)); local_14 = (local_14 + 1)) {
    local_8 = s32((local_8 + 0x1c), 0);
  }
  iVar1 = s32((local_8 + 0x1c), 0);
  w32((local_8 + 0x1c), 0, DAT_006385c0);
  local_8 = iVar1;
  (local_14 < param_1) (local_14 = 0; local_14 = (local_14 < param_1); local_14 = (local_14 + 1)) {
    w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) & -3));
    w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) & -5));
    w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) | 1));
    w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) & -9));
    w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) & -17));
    w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) & -33));
    w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) & -65));
    local_8 = s32((local_8 + 0x1c), 0);
  }
  local_8 = iVar1;
  (local_14 < (param_1 + -1)) (local_14 = 0; local_14 = (local_14 < (param_1 + -1)); local_14 = (local_14 + 1)) {
    local_8 = s32((local_8 + 0x1c), 0);
  }
  w32((local_8 + 0x1c), 0, DAT_006385c4);
  DAT_006385c4 = iVar1;
  DAT_00638588 = (DAT_00638588 - param_1);
  return;
}


 export function FUN_005d687b (param_1)

 {
  if ((((s32((DAT_006385d0 + 0x70), 0) >>> 1) & 1) !== 0)) DAT_006385d0 = (DAT_006385d0 === 0) DAT_006385d0 = (DAT_006385d0 + 0x88) DAT_006385d0 = (DAT_006385d0 + 0x70) {
    if ((DAT_00638584 < param_1)) {
      param_1 = DAT_00638584;
    }
    if ((param_1 < 2)) {
      param_1 = 2;
    }
    if ((DAT_00638588 < param_1)) {
      FUN_005d6685((param_1 - DAT_00638588));
    }
    else if ((param_1 < DAT_00638588)) {
      FUN_005d673a((DAT_00638588 - param_1));
    }
  }
  return;
}


 export function FUN_005d6947 (param_1)

 {
  let MVar1;
  let local_14;
  let local_10;
  let local_c;

  local_10 = (local_10 & -0x10000);
  while ((((s32(param_1, 3) >>> 6) & 1) !== 0)) param_1 = (param_1 + 3) {
    local_c = s32(s32(param_1, 0), 0);
    (local_14 < s32((s32(param_1, 0) + 4), 0)) (local_14 = 0; local_14 = (local_14 < s32((s32(param_1, 0) + 4), 0)); local_14 = (local_14 + 1)) {
      _MEM[local_c] = (_MEM[local_c] ^ 0x80);
      local_c = (local_c + 1);
    }
    MVar1 = FUN_006e7fa0(DAT_00638578, s32(param_1, 0), 0x20);
    local_10 = (((((local_10) >> 16) & 0xFFFF) << 16) | ((MVar1) & 0xFFFF));
    if ((((MVar1) & 0xFFFF) === 0)) {
      w32(param_1, 3, (s32(param_1, 3) | 0x20));
      w32(param_1, 3, (s32(param_1, 3) & -65));
    }
    else {
      if (((MVar1 & 0xffff) !== 0x21)) {
        FUN_005d4c18(local_10);
      }
      w32(param_1, 3, (s32(param_1, 3) & -33));
    }
    param_1 = s32(param_1, 7);
  }
  return 0;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005d6a2c ()

 {
  let BVar1;
  let local_30;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  _DAT_006385b8 = 0;
  local_14 = DAT_006385d0;
  if ((DAT_00638578 !== 0)) {
    FUN_006e7fa4(DAT_00638578);
    while ((BVar1 !== 0)) BVar1 = FUN_006e7e04(DAT_ffffffd0, DAT_0063857c, 0x3bd, 0x3bd, 1) BVar1 = (BVar1 !== 0) {
      _DAT_006385d4 = (None + 1);
    }
    while ((local_14 !== 0)) local_14 = (local_14 !== 0) {
      if ((s16((local_14 + 0x88), 0) === 4)) {
        local_c = local_14;
        local_14 = s32((local_14 + 0xb8), 0);
      }
      else {
        local_14 = FUN_005d7494(local_c, local_14);
      }
    }
    local_8 = DAT_006385c0;
    if ((DAT_006385c0 !== 0)) {
      (local_10 < DAT_00638588) (local_10 = 0; local_10 = (local_10 < DAT_00638588); local_10 = (local_10 + 1)) {
        w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) & -33));
        w32((local_8 + 0xc), 0, (s32((local_8 + 0xc), 0) & -65));
        local_8 = s32((local_8 + 0x1c), 0);
      }
    }
  }
  return;
}


 export function FUN_005d6b4c (param_1, param_2)

 {
  let local_8;

  (local_8 < param_2) (local_8 = 0; local_8 = (local_8 < param_2); local_8 = (local_8 + 1)) {
    _MEM[(local_8 + param_1)] = 0x80;
  }
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005d6b89 (param_1)

 {
  let piVar1;
  let local_14;
  let local_c;
  let local_8;

  piVar1 = DAT_006385c0;
  local_8 = DAT_006385c0;
  _DAT_006385b8 = 0;
  if ((DAT_006385b0 !== 0)) {
    FUN_006e7fa4(param_1);
  }
  if ((DAT_00638588 !== DAT_00638584)) {
    FUN_005d687b(DAT_00638584);
  }
  if ((piVar1 !== 0)) {
    (local_14 < DAT_00638584) (local_14 = 0; local_14 = (local_14 < DAT_00638584); local_14 = (local_14 + 1)) {
      piVar1 = s32(local_8, 7);
      if ((s32(local_8, 0) !== 0)) {
        FUN_006e7fa8(param_1, s32(local_8, 0), 0x20);
        FUN_005d6430(s32(local_8, 1));
      }
      FUN_005d6430(s32(local_8, 2));
      local_8 = piVar1;
    }
  }
  DAT_006385c0 = 0;
  do {
    DAT_006385d0 = FUN_005d7494(0, DAT_006385d0);
  } while ((FUN_005d7494(0, DAT_006385d0) !== 0)) DAT_006385d0 = 0 return local_c


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005d6c99 (param_1, param_2)

 {
  let uVar1;
  let puVar2;
  let iVar3;
  let MVar4;
  let local_30;
  let local_2c;
  let local_28;
  let local_20;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  puVar2 = DAT_006385d0;
  local_8 = 0;
  uVar1 = 0;
  if ((DAT_006385b0 !== 0)) {
    local_20 = s32((param_2 + 0xc), 0);
    local_2c = 0;
    while ((((s32((s32((DAT_006385c8 + 0x1c), 0) + 0xc), 0) >>> 5) & 1) === 0)) local_2c = (local_2c < DAT_00638588) DAT_006385c8 = s32((DAT_006385c8 + 0x1c), 0) DAT_006385c8 = (s32((DAT_006385c8 + 0x1c), 0) + 0xc) {
      local_2c = (local_2c + 1);
    }
    if (((_MEM[(local_20 + 3)] & 1) === 0)) {
      local_30 = DAT_006385d0;
      if ((((s32(local_20, 3) >>> 4) & 1) !== 0)) DAT_006385d0 = (DAT_006385d0 + 0x22) local_20 = (local_20 + 3) local_20 = (local_20 + 3) {
        w16(s32(DAT_006385d0, 0x23), 0, (s16(s32(DAT_006385d0, 0x23), 0) & 0xfffb));
        w32(puVar2, 0x1c, (s32(puVar2, 0x1c) | 2));
      }
      do {
        puVar2 = s32(local_20, 0);
        local_28 = s32(s32(local_20, 0), 0);
        while ((((s32(local_30, 0x1c) >>> 1) & 1) !== 0)) local_30 = (local_30 !== 0) local_30 = (local_30 + 0x1c) {
          local_30 = s32(local_30, 0x2e);
        }
        if ((local_30 === 0)) {
          FUN_005d6b4c(s32(s32(local_20, 0), 0), s32((s32(local_20, 0) + 4), 0));
          w32(local_20, 3, (s32(local_20, 3) & -33));
        }
        else {
          if ((((s32(local_20, 3) >>> 6) & 1) === 0)) {
            if ((s16((local_30 + 0x22), 0) === 4)) {
              if ((((s32(local_20, 3) >>> 3) & 1) === 0)) {
                FUN_005d791b(local_20, local_30);
                _DAT_00638594 = (None + 1);
              }
              iVar3 = (((s32(local_20, 3) >>> 7) & 0xff) * s32(local_30, 0x27) + s32(local_30, 0xc));
              FUN_005edc6c(s32(local_20, 4), iVar3, (s32(local_20, 6) / ((None) & 0xFFFF) | 0), s16((local_30 + 0x20), 0), (((((iVar3 >>> 0x10)) & 0xFFFF) << 16) | None));
              if ((((s32(local_20, 3) >>> 1) & 1) !== 0)) {
                w32(local_20, 3, (s32(local_20, 3) | 0x10));
              }
            }
            else {
              FUN_005d753e(local_30, s32(puVar2, 0), s32(puVar2, 1));
            }
            (local_30 !== 0) (local_30 = s32(local_30, 0x2e); local_30 = (local_30 !== 0);
                local_30 = s32((local_30 + 0xb8), 0)) {
              if ((((s32((local_30 + 0x70), 0) >>> 1) & 1) === 0)) {
                FUN_005d778c(local_30, s32(puVar2, 0), s32(puVar2, 1));
              }
            }
            w32(local_20, 3, (s32(local_20, 3) | 0x40));
            w32((s32(local_20, 0) + 0x10), 0, (s32((s32(local_20, 0) + 0x10), 0) & -2));
          }
          (local_2c < s32(puVar2, 1)) (local_2c = 0; local_2c = (local_2c < s32(puVar2, 1)); local_2c = (local_2c + 1)) {
            _MEM[local_28] = (_MEM[local_28] ^ 0x80);
            local_28 = (local_28 + 1);
          }
          MVar4 = FUN_006e7fa0(param_1, s32(local_20, 0), 0x20);
          local_10 = (MVar4 & 0xffff);
          if ((((MVar4) & 0xFFFF) === 0)) {
            w32(local_20, 3, (s32(local_20, 3) & -65));
            w32(local_20, 3, (s32(local_20, 3) | 0x20));
            w32(local_20, 3, (s32(local_20, 3) & -9));
          }
          else {
            FUN_005d4c18(local_10);
            w32(local_20, 3, (s32(local_20, 3) & -33));
          }
        }
        local_30 = DAT_006385d0;
        local_18 = 0;
        local_14 = 0;
        while ((local_30 !== 0)) local_30 = (local_30 !== 0) {
          if (((_MEM[(local_30 + 0x1c)] & 1) === 0)) {
            if ((s16((local_30 + 0x22), 0) !== 4)) local_14 = (local_14 + 1) local_30 = (local_30 + 0x1c) local_30 = (local_30 + 0x22) {
              if ((((s32(local_30, 0x1c) >>> 2) & 1) === 0)) {
                FUN_006e7f7c(s32(local_30, 0), (local_30 + 6), 0);
              }
              else {
                FUN_005d6283(local_30);
              }
            }
            local_18 = local_30;
            local_30 = s32(local_30, 0x2e);
          }
          else if ((s16((local_30 + 0x22), 0) === 4)) {
            local_18 = local_30;
            local_30 = s32(local_30, 0x2e);
          }
          else {
            if ((s32(local_30, 0x2d) !== 0)) {
              local_8 = s32(local_30, 0x2d);
              w32(local_30, 0x2d, 0);
              uVar1 = s16((local_30 + 0x8a), 0);
            }
            local_30 = FUN_005d7494(local_18, local_30);
          }
        }
        local_30 = DAT_006385d0;
        local_20 = s32(local_20, 7);
      } while ((((s32(local_20, 3) >>> 5) & 1) === 0)) local_20 = (local_20 + 3) {
        local_8 = local_8(uVar1);
      }
    }
  }
  return 0;
}


 export function FUN_005d717f (param_1)

 {
  let iVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let local_20;
  let local_c;

  bVar2 = 0;
  if ((DAT_006385b0 === 0)) {
    uVar3 = 0;
  }
  else {
    iVar1 = s32(param_1, 3);
    w32((iVar1 + 0xc), 0, (s32((iVar1 + 0xc), 0) & -3));
    local_20 = DAT_006385d0;
    while ((((s32(local_20, 0x1c) >>> 1) & 1) !== 0)) local_20 = (local_20 !== 0) local_20 = (local_20 + 0x1c) {
      local_20 = s32(local_20, 0x2e);
    }
    if ((local_20 === 0)) {
      w32((iVar1 + 0xc), 0, (s32((iVar1 + 0xc), 0) & -33));
    }
    else {
      if ((((s32((iVar1 + 0xc), 0) >>> 6) & 1) === 0)) {
        if ((s16((local_20 + 0x22), 0) === 4)) {
          iVar4 = (((s32((iVar1 + 0xc), 0) >>> 7) & 0xff) * s32(local_20, 0x27) + s32(local_20, 0xc));
          FUN_005edc6c(s32((iVar1 + 0x10), 0), iVar4, (s32((iVar1 + 0x18), 0) / ((DAT_006385ac) & 0xFFFF) | 0), (((((local_20 >>> 0x10)) & 0xFFFF) << 16) | s16((local_20 + 0x20), 0)), (((((iVar4 >>> 0x10)) & 0xFFFF) << 16) | DAT_006385ac));
        }
        else {
          iVar4 = FUN_005d753e(local_20, s32(param_1, 0), s32(param_1, 1));
          if ((iVar4 === 1)) {
            bVar2 = 1;
          }
        }
        w32((iVar1 + 0xc), 0, (s32((iVar1 + 0xc), 0) | 0x40));
        local_20 = s32(local_20, 0x2e);
      }
      (local_20 !== 0) (; local_20 = (local_20 !== 0); local_20 = s32(local_20, 0x2e)) {
        if ((iVar4 === 0)) iVar4 = FUN_005d778c(local_20, s32(param_1, 0), s32(param_1, 1)) iVar4 = (iVar4 === 0) {
          bVar2 = 0;
        }
      }
      w32(param_1, 4, (s32(param_1, 4) & -2));
    }
    local_20 = DAT_006385d0;
    local_c = 0;
    while ((local_20 !== 0)) local_20 = (local_20 !== 0) {
      if (((_MEM[(local_20 + 0x1c)] & 1) === 0)) {
        if ((((s32(local_20, 0x1c) >>> 3) & 1) !== 0)) local_20 = (local_20 + 0x1c) {
          if ((s16((local_20 + 0x22), 0) === 4)) {
            FUN_005d5bec(local_20);
          }
          if ((s16((local_20 + 0x22), 0) !== 4)) {
            if ((((s32(local_20, 0x1c) >>> 2) & 1) === 0)) {
              FUN_006e7f7c(s32(local_20, 0), (local_20 + 6), 0);
            }
            else {
              FUN_005d6283(local_20);
            }
          }
        }
        local_c = local_20;
        local_20 = s32(local_20, 0x2e);
      }
      else if ((s16((local_20 + 0x22), 0) === 4)) {
        w32((iVar1 + 0xc), 0, (s32((iVar1 + 0xc), 0) | 2));
        w32(local_20, 0x1c, (s32(local_20, 0x1c) | 2));
        local_c = local_20;
        local_20 = s32(local_20, 0x2e);
      }
      else {
        local_20 = FUN_005d7494(local_c, local_20);
      }
    }
    if (bVar2) bVar2 = bVar2 {
      uVar3 = 1;
    }
    else {
      uVar3 = 0;
    }
  }
  return uVar3;
}


 export function FUN_005d7494 (param_1, param_2)

 {
  let uVar1;
  let uVar2;

  if ((param_2 === 0)) {
    uVar2 = 0;
  }
  else {
    uVar2 = s32(param_2, 0x2e);
    uVar1 = uVar2;
    if ((param_1 !== 0)) {
      w32((param_1 + 0xb8), 0, uVar2);
      uVar1 = DAT_006385d0;
    }
    DAT_006385d0 = uVar1;
    FUN_006e7f6c(s32(param_2, 0), 0);
    if ((((s32(param_2, 0x1c) >>> 2) & 1) !== 0)) {
      FUN_006e7f6c(s32(param_2, 0x18), 0);
    }
    FUN_006e7b20(s32(param_2, 0x1b));
    FUN_006e7b40(s32(param_2, 0x1b));
    DAT_0063858c = (DAT_0063858c + 0xffff);
  }
  return uVar2;
}


 export function FUN_005d753e (param_1, param_2, param_3)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let local_14;
  let local_c;

  param_3 = (param_3 / ((DAT_006385ac) & 0xFFFF) | 0);
  if (((_MEM[(param_1 + 0x70)] & 1) !== 0)) param_1 = (param_1 + 0x70) {
    local_14 = 0;
  }
  else {
    if ((((s32((param_1 + 0x70), 0) >>> 2) & 1) === 0)) {
      local_c = (s32((param_1 + 8), 0) - s32((param_1 + 0x64), 0));
    }
    else {
      local_c = (s32((param_1 + 0x3c), 0) - s32((param_1 + 0x34), 0));
    }
    uVar2 = (local_c / ((s16((param_1 + 0x80), 0)) & 0xFFFF) | 0);
    local_14 = param_3;
    if ((uVar2 < param_3)) {
      w32((param_1 + 0x70), 0, (s32((param_1 + 0x70), 0) | 1));
      local_14 = uVar2;
    }
    if ((((s32((param_1 + 0x3c), 0) - s32((param_1 + 0x34), 0)) / ((s16((param_1 + 0x80), 0)) & 0xFFFF) | 0) < param_3 * 2)) {
      w32((param_1 + 0x70), 0, (s32((param_1 + 0x70), 0) | 8));
    }
    else {
      w32((param_1 + 0x70), 0, (s32((param_1 + 0x70), 0) & -9));
    }
    param_3 = (param_3 - local_14);
  }
  if ((local_14 !== 0)) {
    uVar1 = FUN_005edc6c(param_2, s32((param_1 + 0x34), 0), local_14, s16((param_1 + 0x80), 0), (((((param_3 >>> 0x10)) & 0xFFFF) << 16) | None));
    w32((param_1 + 0x34), 0, (s32((param_1 + 0x34), 0) + ((uVar1) & 0xFFFF)));
    if ((s32((param_1 + 0x3c), 0) === s32((param_1 + 0x34), 0))) param_1 = (param_1 + 0x3c) {
      w32((param_1 + 0x34), 0, s32((param_1 + 0x30), 0));
    }
    w32((param_1 + 0x70), 0, (s32((param_1 + 0x70), 0) & -17));
  }
  if ((param_3 === 0)) {
    if ((((s32((param_1 + 0x70), 0) >>> 2) & 1) === 0)) {
      w32((param_1 + 0x64), 0, (s32((param_1 + 0x64), 0) + ((s16((param_1 + 0x80), 0)) & 0xFFFF) * local_14));
    }
    else {
      w32((param_1 + 0x64), 0, 0);
    }
    uVar3 = 0;
  }
  else {
    _memset((param_2 + ((None) & 0xFFFF) * local_14), 0, ((None) & 0xFFFF) * param_3);
    if ((local_c !== 0)) local_c = (local_c !== 0) {
      w32((param_1 + 0x64), 0, (s32((param_1 + 0x64), 0) + ((s16((param_1 + 0x80), 0)) & 0xFFFF) * local_14));
    }
    uVar3 = 1;
  }
  return uVar3;
}


 export function FUN_005d778c (param_1, param_2, param_3)

 {
  let uVar1;
  let uVar2;
  let local_14;
  let local_10;
  let local_c;

  if ((((s32((param_1 + 0x70), 0) >>> 2) & 1) === 0)) {
    local_c = (s32((param_1 + 8), 0) - s32((param_1 + 0x64), 0));
  }
  else {
    local_c = (s32((param_1 + 0x3c), 0) - s32((param_1 + 0x34), 0));
  }
  local_c = (local_c / ((s16((param_1 + 0x80), 0)) & 0xFFFF) | 0);
  param_3 = (param_3 / ((DAT_006385ac) & 0xFFFF) | 0);
  local_10 = param_3;
  if ((local_c < param_3)) {
    w32((param_1 + 0x70), 0, (s32((param_1 + 0x70), 0) | 1));
    local_10 = local_c;
  }
  if ((((s32((param_1 + 0x3c), 0) - s32((param_1 + 0x34), 0)) / ((s16((param_1 + 0x80), 0)) & 0xFFFF) | 0) < param_3 * 2)) {
    w32((param_1 + 0x70), 0, (s32((param_1 + 0x70), 0) | 8));
  }
  else {
    w32((param_1 + 0x70), 0, (s32((param_1 + 0x70), 0) & -9));
  }
  if ((local_10 !== 0)) {
    uVar1 = FUN_005edcac(param_2, s32((param_1 + 0x34), 0), local_10, s16((param_1 + 0x80), 0), /* ? */);
    local_14 = ((uVar1) & 0xFFFF);
    w32((param_1 + 0x34), 0, (s32((param_1 + 0x34), 0) + local_14));
  }
  if ((((s32((param_1 + 0x70), 0) >>> 2) & 1) === 0)) {
    w32((param_1 + 0x64), 0, (s32((param_1 + 0x64), 0) + ((s16((param_1 + 0x80), 0)) & 0xFFFF) * local_10));
  }
  else {
    w32((param_1 + 0x64), 0, 0);
  }
  if ((((s32((param_1 + 0x70), 0) >>> 2) & 1) !== 0)) param_1 = (param_1 + 0x70) {
    uVar2 = 0;
  }
  else {
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_005d791b (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_14;
  let local_10;
  let local_8;

  iVar1 = DAT_006385d0;
  if ((s32((param_2 + 0x98), 0) === param_1)) {
    local_14 = (s32((DAT_006385d0 + 0x9c), 0) - s32((DAT_006385d0 + 0x68), 0));
    local_8 = 0;
    uVar3 = (s32((DAT_006385d0 + 8), 0) - (s32((DAT_006385d0 + 0x90), 0) - s32((DAT_006385d0 + 0x94), 0)));
    if ((uVar3 < local_14)) {
      local_14 = uVar3;
    }
    AVIStreamRead(s32((DAT_006385d0 + 0x84), 0), (s32((DAT_006385d0 + 0x90), 0) / ((s16((DAT_006385d0 + 0x80), 0)) & 0xFFFF) | 0), (local_14 / ((s16((DAT_006385d0 + 0x80), 0)) & 0xFFFF) | 0), s32((DAT_006385d0 + 0x34), 0), local_14, DAT_fffffff8, 0);
    w32((DAT_006385d0 + 0x90), 0, (s32((DAT_006385d0 + 0x90), 0) + local_8));
    w32((iVar1 + 0x34), 0, (s32((iVar1 + 0x34), 0) + local_8));
    w32((DAT_006385d0 + 0x68), 0, (s32((DAT_006385d0 + 0x68), 0) + local_8));
    if ((s32((iVar1 + 0x3c), 0) === s32((iVar1 + 0x34), 0))) {
      w32((iVar1 + 0x34), 0, s32((iVar1 + 0x30), 0));
    }
    if ((s32((DAT_006385d0 + 0x9c), 0) <= s32((DAT_006385d0 + 0x68), 0))) {
      w32((param_1 + 0xc), 0, (s32((param_1 + 0xc), 0) | 8));
      w32((DAT_006385d0 + 0x98), 0, s32((param_1 + 0x1c), 0));
      param_1 = s32((DAT_006385d0 + 0x98), 0);
      w32((DAT_006385d0 + 0x68), 0, 0);
    }
    if ((s32((DAT_006385d0 + 8), 0) <= (s32((DAT_006385d0 + 0x90), 0) - s32((DAT_006385d0 + 0x94), 0)))) {
      local_10 = 0;
      while ((s32((iVar1 + 0x34), 0) < s32((iVar1 + 0x3c), 0))) local_10 = (local_10 < (s32((DAT_006385d0 + 0x9c), 0) - s32((DAT_006385d0 + 0x68), 0))) iVar1 = (iVar1 + 0x34) {
        _MEM[s32((iVar1 + 0x34), 0)] = 0x80;
        w32((iVar1 + 0x34), 0, (s32((iVar1 + 0x34), 0) + 1));
        local_10 = (local_10 + 1);
      }
      if ((s32((iVar1 + 0x3c), 0) === s32((iVar1 + 0x34), 0))) {
        w32((iVar1 + 0x34), 0, s32((iVar1 + 0x30), 0));
      }
      w32((param_1 + 0xc), 0, (s32((param_1 + 0xc), 0) & -9));
      w32((param_1 + 0xc), 0, (s32((param_1 + 0xc), 0) | 2));
      w32((DAT_006385d0 + 0x70), 0, (s32((DAT_006385d0 + 0x70), 0) | 1));
      w32((DAT_006385d0 + 0x98), 0, s32((param_1 + 0x1c), 0));
      w32((DAT_006385d0 + 0x68), 0, 0);
    }
    uVar2 = 0;
  }
  else {
    uVar2 = 0xd;
  }
  return uVar2;
}


 export function FUN_005d7b94 (param_1)

 {
  let local_c;

  local_c = DAT_006385d0;
  while ((s16((local_c + 0x8a), 0) === param_1)) {
    if ((local_c === 0)) {
      return 0;
    }
    if ((s16((local_c + 0x8a), 0) === param_1)) break; local_c = s32((local_c + 0xb8), 0) return 1


 export function FUN_005d7c00 (in_ECX)

 {
  // in_ECX promoted to parameter;

  _memset(in_ECX, 0, 0x98);
  return in_ECX;
}


 export function FUN_005d7c2c (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((param_2 === 1)) {
    Realloc(param_1);
  }
  else {
    Realloc(param_1);
  }
  return in_ECX;
}


 export function FUN_005d7c6e ()

 {
  FUN_00421c30();
  return;
}


 export function FUN_005d7c8c (param_1)

 {
  FUN_005d8d06(param_1);
  return;
}


 export function FUN_005d7cb0 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;
  let pCVar2;
  let pCVar3;
  // in_ECX promoted to parameter;
  let local_74;
  let local_64;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_2c;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  _MEM[(in_ECX + 0xc8)] = 0;
  uVar1 = FUN_00511320();
  w32((in_ECX + 0xc4), 0, uVar1);
  FUN_006e7d90(DAT_ffffffc4, param_3, param_4, (param_5 + param_3), (param_4 + param_6));
  FUN_0040f730(param_1, 6, param_2, DAT_ffffffc4);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x30), 0, 0);
  FUN_005cda06(DAT_ffffffb8, DAT_ffffffb4);
  FUN_005cd775(1, 1);
  FUN_005bd65c(param_5, param_6);
  FUN_005bd65c(param_5, param_6);
  FUN_005c041f(param_8);
  FUN_005c041f(param_8);
  local_40 = (param_5 >> 1);
  local_44 = (param_6 >> 1);
  FUN_005cf3c5(DAT_ffffffb0, DAT_ffffffac);
  local_28 = FUN_00451830();
  local_28 = (local_28 >> 1);
  local_2c = FUN_00451860();
  local_2c = (local_2c >> 1);
  FUN_005cf39b((-local_28), (-local_2c));
  FUN_005cef31(DAT_ffffff9c, (in_ECX + 0x7c), local_40, local_44);
  FUN_005cef31(DAT_ffffff8c, (in_ECX + 0x34), local_40, local_44);
  FUN_005cf39b(local_50, local_54);
  FUN_005cd775(local_48, local_4c);
  pCVar2 = GetActiveView((in_ECX + 0x7c));
  pCVar2 = (pCVar2 + (param_4 + -1));
  pCVar3 = GetActiveView((in_ECX + 0x7c));
  FUN_006e7d90(DAT_ffffffc4, param_3, param_4, (pCVar3 + (param_3 + -1)), pCVar2);
  FUN_006e7da4(DAT_ffffffc4, (-UNNAMED), (-UNNAMED));
  local_24 = UNNAMED;
  local_24 = UNNAMED;
  local_24 = UNNAMED;
  local_24 = UNNAMED;
  FUN_006e7d90(DAT_ffffffdc, UNNAMED, UNNAMED, (UNNAMED + -2), (UNNAMED + -2));
  local_14 = UNNAMED;
  local_10 = UNNAMED;
  local_c = UNNAMED;
  local_8 = UNNAMED;
  FUN_006e7da4(DAT_ffffffdc, 2, 2);
  FUN_005c041f(DAT_00638b40);
  FUN_005c0593((in_ECX + 0x7c), DAT_ffffffec, DAT_ffffffdc);
  FUN_0040f810();
  uVar1 = FUN_00511320();
  FUN_005c0d12(uVar1);
  FUN_0040f810();
  uVar1 = FUN_00511320();
  FUN_005c0d12(uVar1);
  uVar1 = FUN_005cb601(param_3, param_4, param_5, param_6, in_ECX, 1);
  w32((in_ECX + 0x1c), 0, uVar1);
  return;
}


 export function FUN_005d7f72 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  let uVar1;
  let pCVar2;
  let pCVar3;
  // in_ECX promoted to parameter;
  let local_74;
  let local_64;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_2c;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  _MEM[(in_ECX + 0xc8)] = 0;
  uVar1 = FUN_00511320();
  w32((in_ECX + 0xc4), 0, uVar1);
  FUN_006e7d90(DAT_ffffffc4, param_3, param_4, (param_5 + param_3), (param_6 + param_4));
  FUN_0040f730(param_1, 6, param_2, DAT_ffffffc4);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x30), 0, 0);
  FUN_005cda06(DAT_ffffffb8, DAT_ffffffb4);
  FUN_005cd775(1, 1);
  FUN_005bd65c(param_5, param_6);
  FUN_005bd65c(param_5, param_6);
  FUN_005c041f(param_8);
  FUN_005c041f(param_8);
  local_40 = (param_5 >> 1);
  local_44 = (param_6 >> 1);
  FUN_005cf3c5(DAT_ffffffb0, DAT_ffffffac);
  local_28 = FUN_00451830();
  local_28 = (local_28 >> 1);
  local_2c = FUN_00451860();
  local_2c = (local_2c >> 1);
  FUN_005cf39b((-local_28), (-local_2c));
  FUN_005cef31(DAT_ffffff9c, (in_ECX + 0x7c), local_40, local_44);
  FUN_005cef31(DAT_ffffff8c, (in_ECX + 0x34), local_40, local_44);
  FUN_005cf39b(local_50, local_54);
  FUN_005cd775(local_48, local_4c);
  pCVar2 = GetActiveView((in_ECX + 0x7c));
  pCVar2 = (pCVar2 + (param_4 + -1));
  pCVar3 = GetActiveView((in_ECX + 0x7c));
  FUN_006e7d90(DAT_ffffffc4, param_3, param_4, (pCVar3 + (param_3 + -1)), pCVar2);
  FUN_006e7da4(DAT_ffffffc4, (-UNNAMED), (-UNNAMED));
  local_24 = UNNAMED;
  local_24 = UNNAMED;
  local_24 = UNNAMED;
  local_24 = UNNAMED;
  FUN_006e7d90(DAT_ffffffdc, UNNAMED, UNNAMED, (UNNAMED + -2), (UNNAMED + -2));
  local_14 = UNNAMED;
  local_10 = UNNAMED;
  local_c = UNNAMED;
  local_8 = UNNAMED;
  FUN_006e7da4(DAT_ffffffdc, 2, 2);
  FUN_005c041f(DAT_00638b40);
  FUN_005c0593((in_ECX + 0x7c), DAT_ffffffec, DAT_ffffffdc);
  FUN_0040f810();
  uVar1 = FUN_00511320();
  FUN_005c0d12(uVar1);
  FUN_0040f810();
  uVar1 = FUN_00511320();
  FUN_005c0d12(uVar1);
  uVar1 = FUN_005cb601(param_3, param_4, param_5, param_6, in_ECX, param_9);
  w32((in_ECX + 0x1c), 0, uVar1);
  return;
}


 export function FUN_005d8236 (param_1)

 {
  PTR_DAT_00637e60 = param_1;
  return;
}


 export function FUN_005d8250 (param_1, param_2)

 {
  FUN_005d8270(param_1, param_2);
  return;
}


 export function FUN_005d8270 (param_1, param_2)

 {
  let pcVar1;
  let HVar2;
  let uVar3;
  let local_108;

  pcVar1 = _strchr(param_1, 0x5c);
  if ((pcVar1 === 0)) {
    __getcwd(DAT_fffffef8, 0x104);
    FUN_005f22e0(DAT_fffffef8, DAT_0063863c);
    FUN_005f22e0(DAT_fffffef8, param_1);
  }
  else {
    FUN_005f22d0(DAT_fffffef8, param_1);
  }
  HVar2 = FUN_006e7b30(DAT_fffffef8, (param_2 + 2), 0x4000);
  if ((HVar2 === -1)) {
    uVar3 = 0;
  }
  else {
    HVar2 = FUN_006e7b30(DAT_fffffef8, (param_2 + 2), 2);
    w32(param_2, 1, HVar2);
    if ((s32(param_2, 1) === -1)) {
      w32(param_2, 0, 0);
      HVar2 = FUN_006e7b30(DAT_fffffef8, (param_2 + 2), 0);
      w32(param_2, 1, HVar2);
      w32(param_2, 0x25, 0);
      w32(param_2, 0x24, 0);
      if ((s32(param_2, 1) === -1)) {
        w32(param_2, 1, 0);
        return 0;
      }
    }
    else {
      w32(param_2, 0, 1);
    }
    uVar3 = 1;
  }
  return uVar3;
}


 export function FUN_005d83b6 (param_1, param_2)

 {
  FUN_005d83d6(param_1, param_2);
  return;
}


 export function FUN_005d83d6 (param_1, param_2)

 {
  let iVar1;
  let pvVar2;

  pvVar2 = FUN_006e7bcc(param_1, -0x40000000, 0, 0, 2, 0x80, 0);
  w32(param_2, 1, pvVar2);
  iVar1 = s32(param_2, 1);
  if ((iVar1 !== -1)) {
    w32(param_2, 0, 1);
    w32(param_2, 0x25, 0);
    w32(param_2, 0x24, 0);
  }
  else {
    w32(param_2, 1, 0);
    w32(param_2, 0, 0);
    w32(param_2, 0x25, 0);
    w32(param_2, 0x24, 0);
  }
  return (iVar1 !== -1);
}


 export function FUN_005d8476 (param_1)

 {
  let uVar1;
  let BVar2;

  if ((s32((param_1 + 4), 0) === 0)) {
    uVar1 = 0;
  }
  else {
    if ((s32((param_1 + 0x90), 0) !== 0)) param_1 = (param_1 + 0x90) {
      FUN_005d8ab8(param_1);
    }
    BVar2 = FUN_006e7c38(s32((param_1 + 4), 0));
    if ((BVar2 === 0)) {
      uVar1 = 0;
    }
    else {
      w32((param_1 + 4), 0, 0);
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005d84f6 (param_1, param_2, param_3)

 {
  let uVar1;
  let BVar2;
  let local_8;

  if ((s32((param_1 + 4), 0) === 0)) {
    uVar1 = 0;
  }
  else {
    BVar2 = FUN_006e7c3c(s32((param_1 + 4), 0), param_2, param_3, DAT_fffffff8, 0);
    if ((BVar2 === 0)) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005d8551 (param_1, param_2)

 {
  let lVar1;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = 0;
  local_c = 0;
  if ((s32((param_1 + 4), 0) === 0)) {
    local_c = 0;
  }
  else {
    local_8 = _strlen(param_2);
    if ((local_8 === 0)) {
      local_c = 0;
    }
    else {
      do {
        while ((param_2[local_14] === UNNAMED)) {
          lVar1 = FUN_006e7b98(s32((param_1 + 4), 0), DAT_fffffff0, 1);
          if ((lVar1 !== 1)) {
            return local_c;
          }
          if ((param_2[local_14] === UNNAMED)) break; local_14 = 0 local_14 = (local_14 + 1) local_c = 1 FUN_006e7b9c(s32((param_1 + 4), 0), (-local_8), 1) return local_c


 export function FUN_005d8622 (param_1, param_2)

 {
  let uVar1;
  let DVar2;

  if ((s32((param_1 + 4), 0) === 0)) {
    uVar1 = 0;
  }
  else {
    DVar2 = FUN_006e7ba8(s32((param_1 + 4), 0), param_2, 0, 1);
    if ((DVar2 === -1)) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005d8675 (param_1, param_2)

 {
  let uVar1;
  let DVar2;

  if ((s32((param_1 + 4), 0) === 0)) {
    uVar1 = 0;
  }
  else {
    DVar2 = FUN_006e7ba8(s32((param_1 + 4), 0), param_2, 0, 0);
    if ((DVar2 === -1)) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005d86c8 (param_1, param_2)

 {
  let uVar1;
  let DVar2;

  if ((s32((param_1 + 4), 0) === 0)) {
    uVar1 = 0;
  }
  else {
    DVar2 = FUN_006e7ba8(s32((param_1 + 4), 0), 0, 0, 0);
    w32(param_2, 0, DVar2);
    if ((s32(param_2, 0) === -1)) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005d8721 (param_1, param_2, param_3)

 {
  let uVar1;
  let BVar2;
  let local_8;

  if ((s32(param_1, 1) === 0)) {
    uVar1 = 0;
  }
  else if ((s32(param_1, 0) === 0)) {
    FUN_005d225b(s_Error:_Tried_to_write_to_a_read_o_00638640);
    uVar1 = 0;
  }
  else {
    BVar2 = FUN_006e7c4c(s32(param_1, 1), param_2, param_3, DAT_fffffff8, 0);
    if ((BVar2 === 0)) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005d879c (param_1, param_2)

 {
  let uVar1;
  let sVar2;
  let uVar3;

  if ((s32(param_1, 1) === 0)) {
    uVar1 = 0;
  }
  else if ((s32(param_1, 0) === 0)) {
    FUN_005d225b(s_Error:_Tried_to_write_to_a_read_o_0063866c);
    uVar1 = 0;
  }
  else {
    sVar2 = _strlen(param_2);
    uVar1 = FUN_005d8721(param_1, param_2, sVar2);
    uVar3 = FUN_005d8721(param_1, DAT_00638698, 2);
    uVar1 = (uVar1 & uVar3);
  }
  return uVar1;
}


 export function FUN_005d881c (param_1, param_2, param_3)

 {
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = 0;
  local_c = param_2;
  _MEM[param_2] = 0;
  if ((s32((param_1 + 4), 0) === 0)) {
    local_18 = 0;
  }
  else {
    local_18 = FUN_006e7c3c(s32((param_1 + 4), 0), DAT_fffffff8, 1, DAT_fffffff0, 0);
    if ((local_10 === 0)) {
      local_18 = 0;
    }
    else {
      while ((local_14 < param_3)) local_18 = (local_18 !== 0) local_10 = (local_10 !== 0) local_8 = (UNNAMED !== 0xa) local_8 = (UNNAMED !== 0xd) local_8 = (UNNAMED !== 0) local_14 = (local_14 < param_3) {
        if ((UNNAMED !== 0)) local_8 = (UNNAMED !== 0xa) local_8 = (UNNAMED !== 0) {
          _MEM[local_c] = UNNAMED;
          local_c = (local_c + 1);
          local_14 = (local_14 + 1);
        }
        local_18 = FUN_006e7c3c(s32((param_1 + 4), 0), DAT_fffffff8, 1, DAT_fffffff0, 0);
      }
      _MEM[local_c] = 0;
      while ((UNNAMED === 0xd)) local_18 = (local_18 !== 0) local_10 = (local_10 !== 0) local_8 = (UNNAMED === 0xa) local_8 = (UNNAMED === 0xd) {
        local_18 = FUN_006e7c3c(s32((param_1 + 4), 0), DAT_fffffff8, 1, DAT_fffffff0, 0);
      }
      if ((local_10 !== 0)) {
        FUN_005d8622(param_1, -1);
      }
    }
  }
  return local_18;
}


 export function FUN_005d898e (param_1)

 {
  let DVar1;

  if ((s32((param_1 + 4), 0) === 0)) {
    DVar1 = 0;
  }
  else {
    DVar1 = FUN_006e7c04(s32((param_1 + 4), 0), 0);
    if ((DVar1 === -1)) {
      FUN_005d225b(s_Bad_file_handle_in_MSFileSize_0063869c);
      DVar1 = 0;
    }
  }
  return DVar1;
}


 export function FUN_005d89e8 (param_1, param_2, param_3)

 {
  let pvVar1;
  let uVar2;
  let pvVar3;

  if ((s32((param_1 + 0x90), 0) === 0)) param_1 = (param_1 + 0x90) {
    pvVar1 = FUN_006e7bc8(s32((param_1 + 4), 0), 0, 2, 0, 0, 0);
    w32((param_1 + 0x94), 0, pvVar1);
    if ((s32((param_1 + 0x94), 0) === 0)) {
      uVar2 = 0;
    }
    else {
      pvVar3 = FUN_006e7bc4(s32((param_1 + 0x94), 0), 4, 0, param_2, param_3);
      w32((param_1 + 0x90), 0, pvVar3);
      if ((s32((param_1 + 0x90), 0) === 0)) {
        uVar2 = FUN_005d8ab8(param_1);
      }
      else {
        uVar2 = s32((param_1 + 0x90), 0);
      }
    }
  }
  else {
    uVar2 = s32((param_1 + 0x90), 0);
  }
  return uVar2;
}


 export function FUN_005d8ab8 (param_1)

 {
  if ((s32((param_1 + 0x90), 0) !== 0)) param_1 = (param_1 + 0x90) {
    FUN_006e7c5c(s32((param_1 + 0x90), 0));
    w32((param_1 + 0x90), 0, 0);
  }
  if ((s32((param_1 + 0x94), 0) !== 0)) {
    FUN_006e7c38(s32((param_1 + 0x94), 0));
    w32((param_1 + 0x94), 0, 0);
  }
  return 0;
}


 export function FUN_005d8b34 (param_1, param_2, param_3)

 {
  FUN_005d8bde(param_1, param_2, 0, param_3, 0);
  return;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* _strftime */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function _strftime (_Buf, _SizeInBytes, _Format, _Tm)

 {
  let sVar1;

  sVar1 = FUN_005d8bde(_Buf, _SizeInBytes, _Format, _Tm, 0);
  return sVar1;
}


 export function FUN_005d8b86 (param_1, param_2, param_3, param_4)

 {
  FUN_005d8bde(param_1, param_2, param_3, param_4, 1);
  return;
}


 export function FUN_005d8bb0 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005d8c0c(param_1, param_2, param_3, param_4, 1, param_5);
  return;
}


 export function FUN_005d8bde (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005d8c0c(param_1, param_2, param_3, param_4, param_5, 0);
  return;
}


 export function FUN_005d8c0c (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let BVar1;
  let uVar2;
  let local_5c;
  let local_58;
  let local_54;
  let local_4c;
  let local_40;
  let local_3c;
  let local_38;
  let local_28;
  let local_24;
  let local_1c;
  let local_c;
  let local_8;

  local_c = param_1;
  _memset(DAT_ffffffa8, 0, 0x4c);
  local_58 = 0x4c;
  if ((param_6 === 0)) {
    local_54 = 0;
  }
  else {
    local_54 = s32((param_6 + 4), 0);
  }
  local_4c = param_2;
  local_40 = 1;
  local_3c = local_c;
  local_38 = 0x100;
  local_28 = s_Select_a_File_006386bc;
  local_1c = param_3;
  if ((param_4 === 0)) {
    local_24 = 0x80e;
  }
  else {
    local_24 = 0x180e;
  }
  if ((param_5 === 0)) {
    BVar1 = GetOpenFileNameA(DAT_ffffffa8);
    local_5c = ((BVar1) & 0xFF);
  }
  else {
    BVar1 = GetSaveFileNameA(DAT_ffffffa8);
    local_5c = ((BVar1) & 0xFF);
  }
  if ((local_5c === 1)) {
    uVar2 = 1;
  }
  else {
    local_8 = CommDlgExtendedError();
    if ((local_8 !== 0)) {
      FUN_005d2279(s_Error:_GetOpenFileName_returned_006386cc, local_8);
    }
    uVar2 = 0;
  }
  return uVar2;
}


 export function FUN_005d8d06 (param_1)

 {
  FUN_006e7af4(param_1);
  FUN_006e7af4(DAT_006386f0);
  return 1;
}


 export function FUN_005d8d30 ()

 {
  return 1;
}


 export function FUN_005d8d50 (param_1)

 {
  let local_c;
  let local_8;

  local_c = 1;
  (_MEM[local_8] !== 0) (local_8 = param_1; local_8 = _MEM[local_8]; local_8 = (local_8 + 1)) {
    if ((_MEM[local_8] === 0x5f)) {
      _MEM[local_8] = 0;
      local_c = (local_c + 1);
    }
  }
  return local_c;
}


 export function FUN_005d8da1 ()

 {
  let hdc;
  let hdc_00;
  let uVar1;
  let local_4c;
  let local_40;
  let local_8;

  hdc = FUN_006e7e10(0);
  hdc_00 = FUN_006e79f8(hdc);
  FUN_006e7dd8(0, hdc);
  uVar1 = FUN_004d8af0();
  local_8 = FUN_005dcdf9(uVar1);
  FUN_006e7a6c(hdc_00, s32(local_8, 0));
  uVar1 = FUN_004d8af0();
  FUN_005dce29(uVar1);
  FUN_006e7a68(hdc_00, DAT_ffffffc0);
  local_4c = UNNAMED;
  FUN_006e7a08(hdc_00);
  if ((UNNAMED < 0x14)) tmHeight {
    local_4c = 0x14;
  }
  return local_4c;
}


 export function FUN_005d8e3f (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let piVar1;
  let pHVar2;
  let pHVar3;
  let pHVar4;
  let uVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let nHeight;
  let iVar9;
  let iVar10;
  let pHVar11;
  let sVar12;
  let iVar13;
  let hMenu;
  let hInstance;
  let lpParam;
  let local_44;
  let local_40;
  let local_28;
  let local_18;
  let local_10;
  let local_c;
  let local_8;

  pHVar2 = FUN_006e7e98(DAT_006e4ff0, 0x12d);
  pHVar3 = FUN_006e7e98(DAT_006e4ff0, 0x12f);
  pHVar4 = FUN_006e7e98(DAT_006e4ff0, 0x12e);
  uVar5 = FUN_005dce4f(param_5 * 0xa4);
  iVar6 = FUN_005dcdf9(uVar5);
  iVar7 = FUN_00407f90(param_2);
  iVar7 = (iVar7 / param_3 | 0);
  iVar8 = FUN_00407fc0(param_2);
  iVar8 = (iVar8 * param_3 / param_5 | 0);
  nHeight = FUN_005d8da1(param_8);
  local_44 = s32(param_2, 0);
  local_8 = s32(param_2, 1);
  local_40 = 0x40010000;
  if ((param_7 !== 0)) {
    local_40 = 0x50010000;
  }
  local_28 = 0;
  do {
    if ((param_5 <= local_28)) {
      w32(param_1, 0, param_5);
      FUN_005dce29(uVar5);
      return uVar5;
    }
    lpParam = 0;
    hMenu = 0;
    hInstance = DAT_006e4ff0;
    FUN_0040f810();
    iVar9 = FUN_00414d10();
    iVar10 = (iVar8 >> 1);
    iVar13 = (nHeight >> 1);
    pHVar11 = FUN_006e7d50(4, s_MSControlClass_00638708, DAT_00638704, local_40, local_44, ((iVar10 - iVar13) + local_8), iVar7, nHeight, s32((iVar9 + 4), 0), hMenu, hInstance, lpParam);
    w32((iVar6 + local_28 * 0xa4), 0, pHVar11);
    iVar9 = FUN_005c9499(s32((iVar6 + local_28 * 0xa4), 0), param_4);
    if ((local_28 === 0)) {
      w32((iVar9 + 8), 0, 0);
    }
    else {
      w32((iVar9 + 8), 0, 1);
    }
    w32((iVar9 + 0xc), 0, pHVar2);
    w32((iVar9 + 0x10), 0, pHVar3);
    w32((iVar9 + 0x14), 0, pHVar4);
    w32((iVar9 + 0x24), 0, (local_28 * 0xa4 + iVar6));
    w32((iVar9 + 0x2c), 0, 3);
    FUN_006e7db0(s32((iVar6 + local_28 * 0xa4), 0), -4, 0x5d9b86);
    FUN_006e7d90(((local_28 * 0xa4 + iVar6) + 4), local_44, ((iVar10 - iVar13) + local_8), (local_44 + iVar7), (((iVar10 - iVar13) + local_8) + nHeight));
    w32(((iVar6 + 0x14) + local_28 * 0xa4), 0, local_28);
    local_10 = s32((param_6 + local_28 * 4), 0);
    if ((_MEM[local_10] === 0x21)) {
      w32(((iVar6 + 0x18) + local_28 * 0xa4), 0, 0);
      local_10 = (local_10 + 1);
    }
    else if ((_MEM[local_10] === 0x5e)) {
      w32(((iVar6 + 0x18) + local_28 * 0xa4), 0, 1);
      FUN_004472f0(local_28);
      local_10 = (local_10 + 1);
    }
    else {
      w32(((iVar6 + 0x18) + local_28 * 0xa4), 0, 1);
    }
    FUN_005f22d0(((local_28 * 0xa4 + iVar6) + 0x1c), local_10);
    local_18 = ((local_28 * 0xa4 + iVar6) + 0x1c);
    w32(((iVar6 + 0xa0) + local_28 * 0xa4), 0, 0);
    while ((_MEM[local_18] === 0x7e)) {
      if ((_MEM[local_18] === 0)) goto LAB_005d9226; break; piVar1 = ((iVar6 + 0xa0) + local_28 * 0xa4) w32(piVar1, 0, (s32(piVar1, 0) + 1)) local_18 = (local_18 + 1) local_28 = s32(((iVar6 + 0xa0) + local_28 * 0xa4), 0) sVar12 = _strlen(((local_28 * 0xa4 + iVar6) + 0x1c)) local_28 = (local_28 < sVar12) local_28 = (local_28 + 1) {
      _MEM[((local_28 * 0xa5 + 0x1c) + iVar6)] = _MEM[((local_28 * 0xa5 + 0x1d) + iVar6)];
    }
 LAB_005d9226: :
    sVar12 = _strlen(((local_28 * 0xa4 + iVar6) + 0x1c));
    if ((s32(((iVar6 + 0xa0) + local_28 * 0xa4), 0) < sVar12)) {
      local_c = _MEM[(((s32(((iVar6 + 0xa0) + local_28 * 0xa4), 0) + local_28 * 0xa4) + 0x1c) + iVar6)];
      local_c = 0;
      __strlwr(DAT_fffffff4);
      _MEM[((iVar6 + 0x9c) + local_28 * 0xa4)] = _MEM[(((s32(((iVar6 + 0xa0) + local_28 * 0xa4), 0) + local_28 * 0xa4) + 0x1c) + iVar6)];
    }
    else {
      w32(((iVar6 + 0xa0) + local_28 * 0xa4), 0, -1);
    }
    local_8 = (local_8 + iVar8);
    if ((s32(param_2, 3) <= local_8)) {
      local_44 = (local_44 + iVar7);
      local_8 = s32(param_2, 1);
    }
    local_28 = (local_28 + 1);
  } ( true );
}


 export function FUN_005d931b (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let piVar1;
  let pHVar2;
  let pHVar3;
  let pHVar4;
  let uVar5;
  let uVar6;
  let iVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let iVar11;
  let pHVar12;
  let sVar13;
  let iVar14;
  let uVar15;
  let hMenu;
  let hInstance;
  let lpParam;
  let local_44c;
  let local_448;
  let local_430;
  let local_42c;
  let local_428;
  let local_418;
  let local_410;
  let local_40c;
  let local_408;
  let local_8;

  pHVar2 = FUN_006e7e98(DAT_006e4ff0, 0x12d);
  pHVar3 = FUN_006e7e98(DAT_006e4ff0, 0x12f);
  pHVar4 = FUN_006e7e98(DAT_006e4ff0, 0x12e);
  _strncpy(DAT_fffffbf8, param_5, 0x400);
  uVar5 = FUN_005d8d50(DAT_fffffbf8);
  local_410 = DAT_fffffbf8;
  uVar6 = FUN_005dce4f(uVar5 * 0xa4);
  iVar7 = FUN_005dcdf9(uVar6);
  iVar8 = FUN_00407f90(param_2);
  iVar8 = (iVar8 / param_3 | 0);
  if ((((((uVar5 ^ uVar15) - uVar15) & 1) ^ uVar15) === uVar15)) uVar15 = (uVar5 >> 0x1f) uVar5 = (uVar5 ^ uVar15) {
    iVar9 = FUN_00407fc0(param_2);
    local_428 = (iVar9 * param_3 / uVar5 | 0);
  }
  else {
    iVar9 = FUN_00407fc0(param_2);
    local_428 = (iVar9 * param_3 / (uVar5 + 1) | 0);
  }
  iVar9 = FUN_005d8da1(param_7);
  local_44c = s32(param_2, 0);
  local_8 = s32(param_2, 1);
  local_448 = 0x40010000;
  if ((param_6 !== 0)) {
    local_448 = 0x50010000;
  }
  local_42c = 0;
  do {
    if ((uVar5 <= local_42c)) {
      w32(param_1, 0, uVar5);
      FUN_005dce29(uVar6);
      return uVar6;
    }
    lpParam = 0;
    hMenu = 0;
    hInstance = DAT_006e4ff0;
    FUN_0040f810();
    iVar10 = FUN_00414d10();
    iVar11 = (local_428 >> 1);
    iVar14 = (iVar9 >> 1);
    pHVar12 = FUN_006e7d50(4, s_MSControlClass_0063871c, DAT_00638718, local_448, local_44c, ((iVar11 - iVar14) + local_8), iVar8, iVar9, s32((iVar10 + 4), 0), hMenu, hInstance, lpParam);
    w32((iVar7 + local_42c * 0xa4), 0, pHVar12);
    iVar10 = FUN_005c9499(s32((iVar7 + local_42c * 0xa4), 0), param_4);
    if ((local_42c === 0)) {
      w32((iVar10 + 8), 0, 0);
    }
    else {
      w32((iVar10 + 8), 0, 1);
    }
    w32((iVar10 + 0xc), 0, pHVar2);
    w32((iVar10 + 0x10), 0, pHVar3);
    w32((iVar10 + 0x14), 0, pHVar4);
    w32((iVar10 + 0x24), 0, (local_42c * 0xa4 + iVar7));
    w32((iVar10 + 0x2c), 0, 3);
    FUN_006e7db0(s32((iVar7 + local_42c * 0xa4), 0), -4, 0x5d9b86);
    FUN_006e7d90(((local_42c * 0xa4 + iVar7) + 4), local_44c, ((iVar11 - iVar14) + local_8), (local_44c + iVar8), (((iVar11 - iVar14) + iVar9) + local_8));
    w32(((iVar7 + 0x14) + local_42c * 0xa4), 0, local_42c);
    if ((_MEM[local_410] === 0x21)) {
      w32(((iVar7 + 0x18) + local_42c * 0xa4), 0, 0);
      local_410 = (local_410 + 1);
    }
    else if ((_MEM[local_410] === 0x5e)) {
      w32(((iVar7 + 0x18) + local_42c * 0xa4), 0, 1);
      FUN_004472f0(local_42c);
      local_410 = (local_410 + 1);
    }
    else {
      w32(((iVar7 + 0x18) + local_42c * 0xa4), 0, 1);
    }
    FUN_005f22d0(((local_42c * 0xa4 + iVar7) + 0x1c), local_410);
    local_418 = ((local_42c * 0xa4 + iVar7) + 0x1c);
    w32(((iVar7 + 0xa0) + local_42c * 0xa4), 0, 0);
    while ((_MEM[local_418] === 0x7e)) {
      if ((_MEM[local_418] === 0)) goto LAB_005d9893; break; piVar1 = ((iVar7 + 0xa0) + local_42c * 0xa4) w32(piVar1, 0, (s32(piVar1, 0) + 1)) local_418 = (local_418 + 1) local_430 = s32(((iVar7 + 0xa0) + local_42c * 0xa4), 0) sVar13 = _strlen(((local_42c * 0xa4 + iVar7) + 0x1c)) local_430 = (local_430 < sVar13) local_430 = (local_430 + 1) {
      _MEM[(((local_42c * 0xa4 + local_430) + 0x1c) + iVar7)] = _MEM[(((local_430 + local_42c * 0xa4) + 0x1d) + iVar7)];
    }
 LAB_005d9893: :
    sVar13 = _strlen(((local_42c * 0xa4 + iVar7) + 0x1c));
    if ((s32(((iVar7 + 0xa0) + local_42c * 0xa4), 0) < sVar13)) {
      local_40c = _MEM[(((s32(((iVar7 + 0xa0) + local_42c * 0xa4), 0) + local_42c * 0xa4) + 0x1c) + iVar7)];
      local_40c = 0;
      __strlwr(DAT_fffffbf4);
      _MEM[((iVar7 + 0x9c) + local_42c * 0xa4)] = _MEM[(((s32(((iVar7 + 0xa0) + local_42c * 0xa4), 0) + local_42c * 0xa4) + 0x1c) + iVar7)];
    }
    else {
      w32(((iVar7 + 0xa0) + local_42c * 0xa4), 0, -1);
    }
    sVar13 = _strlen(local_410);
    local_410 = (local_410 + (sVar13 + 1));
    local_8 = (local_8 + local_428);
    if ((s32(param_2, 3) <= ((iVar11 - iVar14) + local_8))) {
      local_44c = (local_44c + iVar8);
      local_8 = s32(param_2, 1);
    }
    local_42c = (local_42c + 1);
  } ( true );
}


 export function FUN_005d99f4 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_Tried_to_dismantle_NULL_R_0063872c);
  }
  else {
    iVar1 = FUN_005dcdf9(param_2);
    (local_8 < param_1) (local_8 = 0; local_8 = (local_8 < param_1); local_8 = (local_8 + 1)) {
      if ((s32((iVar1 + local_8 * 0xa4), 0) !== 0)) {
        FUN_006e7e1c(s32((iVar1 + local_8 * 0xa4), 0));
      }
    }
    FUN_005dce29(param_2);
    FUN_005dce96(param_2);
  }
  return;
}


 export function FUN_005d9a9a (param_1)

 {
  let this;
  let iVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  let pRVar5;
  let BVar6;

  iVar1 = FUN_005c9563(param_1);
  if ((iVar1 !== 0)) {
    this = s32((iVar1 + 4), 0);
    iVar1 = s32((iVar1 + 0x24), 0);
    FUN_006e7d94(param_1);
    uVar2 = GetCheckStyle(this);
    if ((s32((iVar1 + 0x18), 0) === 1)) iVar1 = (iVar1 + 0x18) {
      BVar6 = 0;
      pRVar5 = 0;
      uVar2 = GetCheckStyle(this);
      iVar3 = FUN_005c5ee0();
      FUN_006e7e28(s32((iVar3 + uVar2 * 0xa4), 0), pRVar5, BVar6);
      FUN_004472f0(s32((iVar1 + 0x14), 0));
      BVar6 = 0;
      pRVar5 = 0;
      uVar2 = GetCheckStyle(this);
      iVar1 = FUN_005c5ee0();
      FUN_006e7e28(s32((iVar1 + uVar2 * 0xa4), 0), pRVar5, BVar6);
    }
    DAT_00637ea4 = FUN_0040f810();
    uVar2 = GetCheckStyle(this);
    uVar4 = FUN_00418740(uVar2);
    FUN_005dad40(uVar4, uVar2);
  }
  return;
}


 export function FUN_005d9b86 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let sVar5;
  let pHVar6;
  let uVar7;
  let puVar8;
  let puVar9;
  let ptVar10;
  let pRVar11;
  let puVar12;
  let UVar13;
  let BVar14;
  let local_138;
  let local_128;
  let local_124;
  let local_120;
  let local_e0;
  let local_dc;
  let local_d4;
  let local_d0;
  let local_cc;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_b4;
  let local_b0;
  let local_ac;
  let local_a8;
  let local_a4;
  let local_a0;
  let local_9c;
  let local_98;
  let local_94;
  let local_84;

  local_124 = FUN_005c9563(param_1);
  local_9c = s32((local_124 + 4), 0);
  local_bc = s32((local_124 + 0x24), 0);
  if ((param_2 < 0x10)) {
    if ((param_2 === 0xf)) {
      if ((s32((local_bc + 0x18), 0) === 1)) {
        uVar3 = GetCheckStyle(local_9c);
        if ((uVar3 === s32((local_bc + 0x14), 0))) {
          local_128 = s32((local_124 + 0x14), 0);
        }
        else {
          local_128 = s32((local_124 + 0x10), 0);
        }
      }
      else {
        local_128 = s32((local_124 + 0xc), 0);
      }
      FUN_006e7a20(local_128, DAT_ffffff24);
      local_138 = s32((local_bc + 4), 0);
      local_138 = s32((local_bc + 8), 0);
      local_138 = s32((local_bc + 0xc), 0);
      local_138 = s32((local_bc + 0x10), 0);
      local_b8 = s32((local_bc + 4), 0);
      local_b4 = s32((local_bc + 8), 0);
      local_b0 = s32((local_bc + 0xc), 0);
      local_ac = s32((local_bc + 0x10), 0);
      if ((DAT_006386fc !== 0)) {
        local_b0 = (s32((local_bc + 4), 0) + 0x20);
        iVar4 = FUN_00407fc0(DAT_fffffec8);
        local_b4 = (((iVar4 + -20) + s32((local_bc + 8), 0)) >> 1);
        local_ac = (s32((local_bc + 8), 0) + 0x14);
      }
      FUN_006e7e28(param_1, 0, 1);
      FUN_006e7da4(DAT_fffffec8, (-UNNAMED), (-UNNAMED));
      local_d0 = FUN_006e7e88(param_1, DAT_fffffee0);
      FUN_005c90ca(DAT_fffffee0, param_1);
      uVar7 = FUN_004d8af0();
      local_98 = FUN_005dcdf9(uVar7);
      local_e0 = FUN_006e7a6c(local_d0, s32(local_98, 0));
      uVar7 = FUN_004d8af0();
      FUN_005dce29(uVar7);
      FUN_006e7a14(local_d0, 1);
      FUN_005ed710(local_d0, local_128, UNNAMED, ((UNNAMED + -20) >> 1), 0x20, 0x14, 0, 7);
      local_138 = (UNNAMED + 0x25);
      if ((DAT_00637e88 !== 0)) DAT_00637e88 = (DAT_00637e88 !== 0) {
        FUN_006e7da4(DAT_fffffec8, u8(DAT_00637e84), u8(DAT_00637e88));
        puVar12 = DAT_ffffff60;
        puVar9 = DAT_ffffff3c;
        puVar8 = DAT_ffffff5c;
        uVar3 = u8(DAT_00637e80);
        FUN_0040f810(uVar3, puVar8, puVar9, puVar12);
        FUN_00511320();
        FUN_00497c40(uVar3, puVar8, puVar9, puVar12);
        FUN_006e7a04(local_d0, ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
        UVar13 = 0x24;
        ptVar10 = DAT_fffffec8;
        sVar5 = _strlen((local_bc + 0x1c));
        FUN_006e7e74(local_d0, (local_bc + 0x1c), sVar5, ptVar10, UVar13);
        FUN_006e7da4(DAT_fffffec8, (-u8(DAT_00637e84)), (-u8(DAT_00637e88)));
      }
      if ((s32((local_bc + 0x18), 0) === 1)) {
        FUN_0040f810();
        iVar4 = FUN_00414d10();
        if ((s32((iVar4 + 0x40), 0) === 8)) {
          if ((DAT_00637e7c === 0)) {
            FUN_006e7a04(local_d0, 0);
          }
          else {
            FUN_0040f810(DAT_00637e7c, DAT_ffffff5c, DAT_ffffff3c, DAT_ffffff60);
            FUN_00511320();
            uVar7 = FUN_0046f440();
            FUN_005dea9e(uVar7);
            FUN_006e7a04(local_d0, ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
          }
        }
        else if ((DAT_006386f7 === 0)) {
          FUN_006e7a04(local_d0, 0);
        }
        else {
          FUN_006e7a04(local_d0, ((DAT_006386f6 << 16) | ((DAT_006386f5 << 8) | DAT_006386f4)));
        }
      }
      else if ((s32((local_bc + 0x18), 0) === 0)) {
        FUN_0040f810();
        iVar4 = FUN_00414d10();
        if ((s32((iVar4 + 0x40), 0) === 8)) {
          if ((DAT_00637e8c === 0)) {
            FUN_006e7a04(local_d0, 0x404040);
          }
          else {
            FUN_0040f810(DAT_00637e8c, DAT_ffffff5c, DAT_ffffff3c, DAT_ffffff60);
            FUN_00511320();
            uVar7 = FUN_0046f440();
            FUN_005dea9e(uVar7);
            FUN_006e7a04(local_d0, ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
          }
        }
        else if ((DAT_006386fb === 0)) {
          FUN_006e7a04(local_d0, 0x404040);
        }
        else {
          FUN_006e7a04(local_d0, ((DAT_006386fa << 16) | ((DAT_006386f9 << 8) | DAT_006386f8)));
        }
      }
      UVar13 = 0x24;
      ptVar10 = DAT_fffffec8;
      sVar5 = _strlen((local_bc + 0x1c));
      FUN_006e7e74(local_d0, (local_bc + 0x1c), sVar5, ptVar10, UVar13);
      if ((s32((local_bc + 0xa0), 0) !== -1)) {
        FUN_005f22d0(DAT_ffffff7c, (local_bc + 0x1c));
        DAT_ffffff7c[s32((local_bc + 0xa0), 0)] = 0;
        local_94 = UNNAMED;
        local_94 = UNNAMED;
        local_94 = UNNAMED;
        local_94 = UNNAMED;
        sVar5 = _strlen(DAT_ffffff7c);
        if ((sVar5 === 0)) {
          local_c0 = UNNAMED;
        }
        else {
          UVar13 = 0x424;
          ptVar10 = DAT_ffffff6c;
          sVar5 = _strlen(DAT_ffffff7c);
          FUN_006e7e74(local_d0, DAT_ffffff7c, sVar5, ptVar10, UVar13);
          local_c0 = (UNNAMED + -1);
        }
        FUN_005f22d0(DAT_ffffff7c, (local_bc + 0x1c));
        DAT_ffffff7c[(s32((local_bc + 0xa0), 0) + 1)] = 0;
        local_94 = UNNAMED;
        local_94 = UNNAMED;
        local_94 = UNNAMED;
        local_94 = UNNAMED;
        UVar13 = 0x424;
        ptVar10 = DAT_ffffff6c;
        sVar5 = _strlen(DAT_ffffff7c);
        FUN_006e7e74(local_d0, DAT_ffffff7c, sVar5, ptVar10, UVar13);
        local_c0 = (local_c0 + ((((UNNAMED + 1) - local_c0) >> 1) + -5));
        local_cc = (local_c0 + 0xa);
        local_a8 = FUN_006e7a10(3);
        FUN_006e7a6c(local_d0, local_a8);
        FUN_006e7a1c(local_d0, local_c0, (UNNAMED + -3), 0);
        FUN_006e7a24(local_d0, local_cc, (UNNAMED + -3));
        FUN_006e7a1c(local_d0, local_c0, (UNNAMED + -2), 0);
        FUN_006e7a24(local_d0, local_cc, (UNNAMED + -2));
      }
      FUN_006e7a6c(local_d0, local_e0);
      FUN_006e7e84(param_1, DAT_fffffee0);
      pHVar6 = FUN_006e7e94();
      if ((pHVar6 !== param_1)) {
        return 0;
      }
    }
    else if ((param_2 !== 7)) {
      if ((param_2 === 8)) {
        FUN_005c96cc(param_1);
        return 0;
      }
      goto switchD_005dab35_default;
    }
    FUN_0040f810();
    cVar1 = FUN_005cbdd0();
    if ((cVar1 === 0)) {
      uVar7 = FUN_005c9307(param_1, param_2, param_3, param_4);
      return uVar7;
    }
    local_d0 = FUN_006e7e10(param_1);
    local_a8 = FUN_006e7a10(3);
    FUN_006e7e4c(param_1, DAT_fffffec8);
    FUN_006e7a6c(local_d0, local_a8);
    local_138 = (UNNAMED + 0x20);
    FUN_006e7e90(local_d0, DAT_fffffec8, local_a8);
    FUN_006e7a94(local_a8);
    FUN_006e7dd8(param_1, local_d0);
  }
  else if ((param_2 < 0x202)) {
    if ((param_2 === 0x201)) {
      if ((DAT_006386fc === 0)) {
        uVar3 = GetCheckStyle(local_9c);
        if ((s32((local_bc + 0x18), 0) === 1)) local_bc = (local_bc + 0x18) {
          uVar3 = GetCheckStyle(local_9c);
          if ((uVar3 !== -1)) {
            BVar14 = 0;
            pRVar11 = 0;
            uVar3 = GetCheckStyle(local_9c);
            iVar4 = FUN_005c5ee0();
            FUN_006e7e28(s32((iVar4 + uVar3 * 0xa4), 0), pRVar11, BVar14);
          }
          FUN_004472f0(s32((local_bc + 0x14), 0));
          FUN_006e7d94(param_1);
          FUN_006e7e28(param_1, 0, 0);
          uVar7 = FUN_0040f810();
          FUN_005c6303(uVar7);
          uVar3 = GetCheckStyle(local_9c);
          uVar7 = FUN_00418740(uVar3);
          FUN_005dad40(uVar7, uVar3);
        }
        DAT_006386fc = 1;
        FUN_006e7d84(param_1);
      }
    }
    else {
      if ((param_2 !== 0x100)) goto switchD_005dab35_default; {
        pHVar6 = FUN_006e7e40(param_1);
        FUN_006e7d6c(pHVar6, param_2, param_3, param_4);
      }
      else {
        if ((param_3 === 0x20)) {
          FUN_0040f810();
          cVar1 = FUN_005cbdd0();
          if ((cVar1 !== 0)) {
            FUN_006e7d6c(param_1, 0x201, 0, 0);
            FUN_006e7d6c(param_1, 0x202, 0, 0);
            return 0;
          }
        }
        if ((param_3 === 0x62)) param_3 = (param_3 === 0x28) param_3 = (param_3 === 0x66) param_3 = (param_3 === 0x62) {
          FUN_0040f810();
          cVar1 = FUN_005cbdd0();
          if ((cVar1 !== 0)) {
            local_d4 = FUN_005c5f00();
            local_c8 = (s32((local_bc + 0x14), 0) + 1);
            iVar4 = FUN_005c5f00();
            if ((iVar4 <= local_c8)) {
              local_c8 = 0;
            }
            while ((s32(((iVar4 + 0x18) + local_c8 * 0xa4), 0) === 0)) 0 = (0 < local_d4) iVar4 = FUN_005c5ee0() iVar4 = (iVar4 + 0x18) {
              local_d4 = (local_d4 + -1);
              local_c8 = (local_c8 + 1);
              iVar4 = FUN_005c5f00();
              if ((iVar4 <= local_c8)) {
                local_c8 = 0;
              }
            }
            if ((local_d4 < 1)) {
              return 0;
            }
            iVar4 = FUN_005c5ee0();
            FUN_006e7d94(s32((iVar4 + local_c8 * 0xa4), 0));
            BVar14 = 0;
            pRVar11 = 0;
            uVar3 = GetCheckStyle(local_9c);
            iVar4 = FUN_005c5ee0();
            FUN_006e7e28(s32((iVar4 + uVar3 * 0xa4), 0), pRVar11, BVar14);
            FUN_004472f0(local_c8);
            BVar14 = 0;
            pRVar11 = 0;
            iVar4 = FUN_005c5ee0();
            FUN_006e7e28(s32((iVar4 + local_c8 * 0xa4), 0), pRVar11, BVar14);
            uVar7 = FUN_0040f810();
            FUN_005c6303(uVar7);
            uVar3 = GetCheckStyle(local_9c);
            uVar7 = FUN_00418740(uVar3);
            FUN_005dad40(uVar7, uVar3);
            return 0;
          }
        }
        if ((param_3 === 0x64)) param_3 = (param_3 === 0x25) param_3 = (param_3 === 0x68) param_3 = (param_3 === 0x64) {
          FUN_0040f810();
          cVar1 = FUN_005cbdd0();
          if ((cVar1 !== 0)) {
            local_d4 = FUN_005c5f00();
            local_c8 = (s32((local_bc + 0x14), 0) + -1);
            if ((local_c8 < 0)) {
              local_c8 = FUN_005c5f00();
              local_c8 = (local_c8 + -1);
            }
            while ((s32(((iVar4 + 0x18) + local_c8 * 0xa4), 0) === 0)) 0 = (0 < local_d4) iVar4 = FUN_005c5ee0() iVar4 = (iVar4 + 0x18) {
              local_d4 = (local_d4 + -1);
              local_c8 = (local_c8 + -1);
              if ((local_c8 < 0)) {
                local_c8 = FUN_005c5f00();
                local_c8 = (local_c8 + -1);
              }
            }
            if ((local_d4 < 1)) {
              return 0;
            }
            iVar4 = FUN_005c5ee0();
            FUN_006e7d94(s32((iVar4 + local_c8 * 0xa4), 0));
            BVar14 = 0;
            pRVar11 = 0;
            uVar3 = GetCheckStyle(local_9c);
            iVar4 = FUN_005c5ee0();
            FUN_006e7e28(s32((iVar4 + uVar3 * 0xa4), 0), pRVar11, BVar14);
            FUN_004472f0(local_c8);
            BVar14 = 0;
            pRVar11 = 0;
            iVar4 = FUN_005c5ee0();
            FUN_006e7e28(s32((iVar4 + local_c8 * 0xa4), 0), pRVar11, BVar14);
            uVar7 = FUN_0040f810();
            FUN_005c6303(uVar7);
            uVar3 = GetCheckStyle(local_9c);
            uVar7 = FUN_00418740(uVar3);
            FUN_005dad40(uVar7, uVar3);
            return 0;
          }
        }
        pHVar6 = FUN_006e7e40(param_1);
        FUN_006e7d6c(pHVar6, param_2, param_3, param_4);
      }
    }
  }
  else {
    /* BRANCHIND */ () {
    case 0x202 :
      FUN_006e7d88();
      DAT_006386fc = 0;
      break;
    case 0x203 :
      if ((s32((local_bc + 0x18), 0) === 1)) {
        uVar7 = FUN_0040f810();
        FUN_005c6303(uVar7);
        uVar3 = GetCheckStyle(local_9c);
        if ((uVar3 !== s32((local_bc + 0x14), 0))) {
          uVar3 = GetCheckStyle(local_9c);
          if ((uVar3 !== -1)) {
            BVar14 = 0;
            pRVar11 = 0;
            uVar3 = GetCheckStyle(local_9c);
            iVar4 = FUN_005c5ee0();
            FUN_006e7e28(s32((iVar4 + uVar3 * 0xa4), 0), pRVar11, BVar14);
          }
          FUN_004472f0(s32((local_bc + 0x14), 0));
        }
        uVar7 = s32((local_bc + 0x14), 0);
        uVar2 = FUN_00418740(uVar7);
        FUN_005dad80(uVar2, uVar7);
      }
      break;
    case 0x204 :
      if ((DAT_00638700 === 0)) {
        DAT_00638700 = 1;
        FUN_006e7d84(param_1);
        uVar7 = FUN_0040f810();
        FUN_005c6303(uVar7);
        uVar7 = s32((local_bc + 0x14), 0);
        uVar2 = FUN_00418740(uVar7);
        FUN_005dadc0(uVar2, uVar7);
      }
      break;
    case 0x205 :
      FUN_006e7d88();
      DAT_00638700 = 0;
      break;
    default :
 switchD_005dab35_default: :
      uVar7 = FUN_005c9307(param_1, param_2, param_3, param_4);
      return uVar7;
    }
  }
  return 0;
}


 export function FUN_005dab5a (param_1)

 {
  let _Str1;
  let iVar1;
  let _Str2;
  let local_38;

  FUN_006e7ec0(param_1, DAT_ffffffc8, 0x32);
  _Str2 = s_MSCONTROLCLASS_00638768;
  _Str1 = __strupr(DAT_ffffffc8);
  iVar1 = _strcmp(_Str1, _Str2);
  if ((s32((iVar1 + 0x2c), 0) === 3)) iVar1 = FUN_005c9563(param_1) iVar1 = (iVar1 + 0x2c) {
    return 1;
  }
  return 0;
}


 export function FUN_005dabc7 (param_1)

 {
  FUN_006e7e28(param_1, 0, 0);
  return;
}


 export function FUN_005dabe5 (param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;

  iVar2 = FUN_005c9563(param_1);
  iVar1 = s32((iVar2 + 0x24), 0);
  uVar3 = GetCheckStyle(s32((iVar2 + 4), 0));
  return (uVar3 === s32((iVar1 + 0x14), 0));
}


 export function FUN_005dac39 (param_1, param_2)

 {
  let iVar1;
  let iVar2;

  iVar1 = FUN_005dab5a(param_1);
  if ((iVar1 === 0)) iVar1 = FUN_005dab5a(param_2) iVar1 = (iVar1 === 0) {
    return 0;
  }
  if ((param_1 === param_2)) {
    return 1;
  }
  iVar1 = FUN_005c9563(param_1);
  iVar2 = FUN_005c9563(param_2);
  if ((s32((iVar2 + 4), 0) === s32((iVar1 + 4), 0))) {
    return 1;
  }
  return 0;
}


 export function FUN_005dacd9 (param_1, param_2, param_3)

 {
  DAT_006386f4 = param_1;
  DAT_006386f5 = param_2;
  DAT_006386f6 = param_3;
  DAT_006386f7 = 1;
  return;
}


 export function FUN_005dad08 (param_1, param_2, param_3)

 {
  DAT_006386f8 = param_1;
  DAT_006386f9 = param_2;
  DAT_006386fa = param_3;
  DAT_006386fb = 1;
  return;
}


 export function FUN_005dad40 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x2c);
  }
  return;
}


 export function FUN_005dad80 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) !== 0)) {
    in_ECX = (in_ECX + 0x30);
  }
  return;
}


 export function FUN_005dadc0 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    in_ECX = (in_ECX + 0x34);
  }
  return;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Multiple */ /* Matches */ /* With */ /* Different */ /* Base */ /* Names */
    /* _$E26 */
    /* _$E31 */
    /* _$E353 */
    /* _$E354 */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function FID_conflict:_$E31 ()

 {
  FUN_005dae1a();
  FUN_005dae34();
  return;
}


 export function FUN_005dae1a ()

 {
  FUN_005db089();
  return;
}


 export function FUN_005dae34 ()

 {
  _atexit(FUN_005dae51);
  return;
}


 export function FUN_005dae51 ()

 {
  DAT_006e4850 = DAT_006e4850;
  return;
}


 export function FUN_005dae6b (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  FUN_005dafdf(param_1);
  uVar1 = FUN_005daef7(s_FATAL_ERROR_00638778, param_2, param_3, param_4);
  FUN_005daf92(uVar1);
  return;
}


 export function FUN_005daeb1 (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  FUN_005dafdf(param_1);
  uVar1 = FUN_005daef7(s_WARNING_00638784, param_2, param_3, param_4);
  FUN_005dafbb(uVar1);
  return;
}


 export function FUN_005daef7 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let sVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let _Format;

  FUN_005f22d0();
  _Format = s_Error:_%s_File:_%s_Line:_%d_00638790;
  sVar1 = _strlen(in_ECX);
  _sprintf((in_ECX + sVar1), _Format, param_2, param_3, param_4);
  uVar2 = FUN_005daf63();
  FUN_005f22e0(in_ECX, uVar2);
  return in_ECX;
}


 export function FUN_005daf63 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005eddaa((in_ECX + 0x400));
  return (in_ECX + 0x400);
}


 export function FUN_005daf92 (param_1)

 {
  FUN_005edd00(s_SMEDS_Application_Error_006387b4, param_1);
  return;
}


 export function FUN_005dafbb (param_1)

 {
  FUN_005d225b(param_1);
  return;
}


 export function FUN_005dafdf (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x704), 0, param_1);
  w32((in_ECX + 0x700), 0, (s32((in_ECX + 0x700), 0) | (1 << (((param_1) & 0xFF) & 0x1f))));
  return;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* int */ /* __thiscall */ /* CSplitterWnd::IsTracking(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function IsTracking (this)

 {
  return s32((this + 0x704), 0);
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* void */ /* __thiscall */ /* CPropertySheet::EnableStackedTabs(int) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x708), 0, param_1);
  return;
}


 export function FUN_005db059 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x700), 0, 0);
  w32((in_ECX + 0x704), 0, 0);
  return;
}


 export function FUN_005db089 (in_ECX)

 {
  // in_ECX promoted to parameter;

  in_ECX = EnableStackedTabs(in_ECX, 0);
  FUN_005db059();
  return in_ECX;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* __thiscall */ /* Iostream_init::~Iostream_init(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function ~Iostream_init (this)

 {
  return;
}


 export function FUN_005db0d0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  FUN_005db110(DAT_fffffff4, DAT_fffffff8);
  if ((param_1 <= (local_8 - local_c))) {
    w32((in_ECX + 0x34), 0, param_1);
  }
  return;
}


 export function FUN_005db110 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005cd535(s32((in_ECX + 0x1c), 0), param_1, param_2);
  return;
}


 export function FUN_005db140 (param_1)

 {
  let pHVar1;
  let local_84;

  pHVar1 = FUN_006e7c60(param_1, 0, 2);
  if ((pHVar1 === 0)) {
    FUN_005f22d0(DAT_ffffff7c, s_Error:_Resource_file_006387d0);
    FUN_005f22e0(DAT_ffffff7c, param_1);
    FUN_005f22e0(DAT_ffffff7c, s_not_found._006387e8);
    FUN_005d225b(DAT_ffffff7c);
    pHVar1 = 0;
  }
  else {
    w32((DAT_006e4f60 + DAT_006387cc * 4), 0, pHVar1);
    DAT_006387cc = (DAT_006387cc + 1);
  }
  return pHVar1;
}


 export function FUN_005db1e0 (param_1)

 {
  FUN_006e7c64(param_1);
  return;
}


 export function FUN_005db1fa (param_1, param_2)

 {
  let pvVar1;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;
  let local_b;
  let local_a;
  let local_9;
  let local_8;

  local_c = _MEM[param_1];
  local_b = param_1[1];
  local_a = param_1[2];
  local_9 = param_1[3];
  local_8 = 0;
  local_14 = -1;
  local_10 = FUN_006e7c6c(DAT_006e4ff0, param_2, DAT_fffffff4);
  if ((local_10 === 0)) {
    local_14 = 0;
    while ((local_10 === 0)) local_14 = (local_14 < DAT_006387cc) local_10 = FUN_006e7c6c(s32((DAT_006e4f60 + local_14 * 4), 0), param_2, DAT_fffffff4) local_10 = (local_10 === 0) {
      local_14 = (local_14 + 1);
    }
  }
  if ((local_10 === 0)) {
    pvVar1 = 0;
  }
  else {
    if ((local_14 === -1)) {
      local_1c = DAT_006e4ff0;
    }
    else {
      local_1c = s32((DAT_006e4f60 + local_14 * 4), 0);
    }
    pvVar1 = FUN_006e7c34(local_1c, local_10);
  }
  return pvVar1;
}


 export function FUN_005db2f8 (param_1)

 {
  let pvVar1;
  let local_14;
  let local_c;
  let local_8;

  local_c = -1;
  local_8 = FUN_006e7c6c(DAT_006e4ff0, param_1, 2);
  if ((local_8 === 0)) {
    local_c = 0;
    while ((local_8 === 0)) local_c = (local_c < DAT_006387cc) local_8 = FUN_006e7c6c(s32((DAT_006e4f60 + local_c * 4), 0), param_1, 2) local_8 = (local_8 === 0) {
      local_c = (local_c + 1);
    }
  }
  if ((local_8 === 0)) {
    pvVar1 = 0;
  }
  else {
    if ((local_c === -1)) {
      local_14 = DAT_006e4ff0;
    }
    else {
      local_14 = s32((DAT_006e4f60 + local_c * 4), 0);
    }
    pvVar1 = FUN_006e7c34(local_14, local_8);
  }
  return pvVar1;
}


 export function FUN_005db3ca (param_1, param_2)

 {
  let sVar1;
  let pvVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_b;
  let local_a;
  let local_9;
  let local_8;

  local_c = _MEM[param_1];
  local_b = param_1[1];
  local_a = param_1[2];
  local_9 = param_1[3];
  local_8 = 0;
  (local_14 < sVar1) (local_14 = 0; sVar1 = _strlen(param_2), local_14 = (local_14 < sVar1); local_14 = (local_14 + 1)) {
    if ((param_2[local_14] === 0x27)) param_2 = (param_2 + local_14) param_2 = (param_2 + local_14) {
      param_2[local_14] = 0x5f;
    }
  }
  local_14 = -1;
  local_10 = FUN_006e7c6c(DAT_006e4ff0, param_2, DAT_fffffff4);
  if ((local_10 === 0)) {
    local_14 = 0;
    while ((local_10 === 0)) local_14 = (local_14 < DAT_006387cc) local_10 = FUN_006e7c6c(s32((DAT_006e4f60 + local_14 * 4), 0), param_2, DAT_fffffff4) local_10 = (local_10 === 0) {
      local_14 = (local_14 + 1);
    }
  }
  if ((local_10 === 0)) {
    pvVar2 = 0;
  }
  else {
    if ((local_14 === -1)) {
      local_18 = DAT_006e4ff0;
    }
    else {
      local_18 = s32((DAT_006e4f60 + local_14 * 4), 0);
    }
    pvVar2 = FUN_006e7c34(local_18, local_10);
  }
  return pvVar2;
}


 export function FUN_005db531 (param_1)

 {
  FUN_006e7c44(param_1);
  return;
}


 export function FUN_005db54b ()

 {
  return;
}


 export function FUN_005db55b (param_1)

 {
  let local_8;

  (local_8 < DAT_006387cc) (local_8 = 0;
      (DAT_006e4f60 = DAT_006e4f60 && (local_8 = (local_8 < DAT_006387cc)));
      local_8 = (local_8 + 1)) {
  }
  if ((local_8 < DAT_006387cc)) {
    (local_8 < DAT_006387cc) (; local_8 = (local_8 < DAT_006387cc); local_8 = (local_8 + 1)) {
      w32((DAT_006e4f60 + local_8 * 4), 0, s32((DAT_006e4f64 + local_8 * 4), 0));
    }
    DAT_006387cc = (DAT_006387cc - 1);
    FUN_006e7c28(param_1);
  }
  return;
}


 export function FUN_005db5e9 (param_1)

 {
  FUN_005dcef7(param_1);
  return;
}


 export function FUN_005db610 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 2, 0);
  w32(in_ECX, 1, 0);
  w32(in_ECX, 3, 0);
  w32(in_ECX, 0, 0);
  return in_ECX;
}


 export function FUN_005db650 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005bc0ab(s32((in_ECX + 8), 0));
  w32((in_ECX + 8), 0, uVar1);
  return;
}


 export function FUN_005db67b (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, param_2);
  if ((s32(in_ECX, 2) !== 0)) {
    uVar1 = FUN_005bc0ab(s32(in_ECX, 2));
    w32(in_ECX, 2, uVar1);
  }
  uVar1 = FUN_005bbc10(param_1, param_2, param_3, param_4, param_5, param_6, 0);
  w32(in_ECX, 2, uVar1);
  FUN_005eb370(in_ECX, s32(in_ECX, 2));
  FUN_00450390(param_7);
  return;
}


 export function FUN_005db704 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, param_2);
  if ((s32(in_ECX, 2) !== 0)) {
    uVar1 = FUN_005bc0ab(s32(in_ECX, 2));
    w32(in_ECX, 2, uVar1);
  }
  uVar1 = FUN_005bbc10(param_1, param_2, param_3, param_4, param_5, param_6, 0);
  w32(in_ECX, 2, uVar1);
  FUN_005eb370(in_ECX, s32(in_ECX, 2));
  FUN_005bc019(s32(in_ECX, 2), 0x10);
  return;
}


 export function FUN_005db792 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, param_2);
  if ((s32(in_ECX, 2) !== 0)) {
    uVar1 = FUN_005bc0ab(s32(in_ECX, 2));
    w32(in_ECX, 2, uVar1);
  }
  uVar1 = FUN_005ee0b1(param_1, param_2, param_3, param_4, param_5, param_6, 0);
  w32(in_ECX, 2, uVar1);
  FUN_005eb370(in_ECX, s32(in_ECX, 2));
  return;
}


 export function FUN_005db80f (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, param_2);
  if ((s32(in_ECX, 2) !== 0)) {
    uVar1 = FUN_005bc0ab(s32(in_ECX, 2));
    w32(in_ECX, 2, uVar1);
  }
  uVar1 = FUN_00414d10();
  uVar1 = FUN_005ee0b1(param_1, param_2, param_3, param_4, param_5, param_6, uVar1);
  w32(in_ECX, 2, uVar1);
  FUN_005eb370(in_ECX, s32(in_ECX, 2));
  return;
}


 export function FUN_005db893 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, param_2);
  if ((s32(in_ECX, 2) !== 0)) {
    uVar1 = FUN_005bc0ab(s32(in_ECX, 2));
    w32(in_ECX, 2, uVar1);
  }
  uVar1 = FUN_00414d10();
  uVar1 = FUN_005bbc10(param_1, param_2, param_3, param_4, param_5, param_6, uVar1);
  w32(in_ECX, 2, uVar1);
  FUN_005eb370(in_ECX, s32(in_ECX, 2));
  FUN_00450390(param_7);
  return;
}


 export function FUN_005db923 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, param_2);
  if ((s32(in_ECX, 2) !== 0)) {
    uVar1 = FUN_005bc0ab(s32(in_ECX, 2));
    w32(in_ECX, 2, uVar1);
  }
  uVar1 = FUN_00414d10();
  uVar1 = FUN_005bbc10(param_1, param_2, param_3, param_4, param_5, param_6, uVar1);
  w32(in_ECX, 2, uVar1);
  FUN_005eb370(in_ECX, s32(in_ECX, 2));
  FUN_005bc019(s32(in_ECX, 2), 0x10);
  return;
}


 export function FUN_005db9b8 (param_1, param_2, param_3)

 {
  let uVar1;

  if ((param_1 === 0)) {
    FUN_005bd298(0, 1, param_2, param_3);
  }
  else {
    uVar1 = FUN_00414d10(1, param_2, param_3);
    FUN_005bd298(uVar1);
  }
  return;
}


 export function FUN_005dba15 (param_1, param_2, param_3)

 {
  let uVar1;

  if ((param_1 === 0)) {
    FUN_005bd298(0, 0, param_2, param_3);
  }
  else {
    uVar1 = FUN_00414d10(0, param_2, param_3);
    FUN_005bd298(uVar1);
  }
  return;
}


 export function FUN_005dba72 ()

 {
  FUN_005bd39e(0x400);
  return;
}


 export function FUN_005dba95 ()

 {
  FUN_005bd39e(0x100);
  return;
}


 export function FUN_005dbab8 ()

 {
  FUN_005bd39e(0x200);
  return;
}


 export function FUN_005dbadb ()

 {
  FUN_005bd4cd();
  return;
}


 export function FUN_005dbaf6 ()

 {
  FUN_005bd500();
  return;
}


 export function FUN_005dbb20 (param_1, param_2)

 {
  DAT_006e4ff0 = param_1;
  DAT_006e4fec = param_2;
  FUN_005dbbb3();
  FUN_005dbbd6();
  return 1;
}


 export function FUN_005dbb4f ()

 {
  FUN_005dbc1b();
  FUN_005d225b(s_SMEDS>_Terminated_Normally._006387f4);
  if ((DAT_00637ef4 !== 0)) {
    if ((DAT_00637ef4 !== 0)) {
      FUN_005dcac0(1);
    }
  }
  FUN_006e7a88();
  return 1;
}


 export function FUN_005dbbb3 ()

 {
  FUN_00417ef0(2, 0xe);
  FUN_005cd6e0();
  return;
}


 export function FUN_005dbbd6 ()

 {
  let tVar1;

  if ((DAT_006e4fec === 0)) {
    FUN_005dbc5a();
  }
  FUN_005dd8a0();
  FUN_005dbc3a();
  tVar1 = _time(0);
  FUN_005f2260(tVar1);
  FUN_006e7998();
  return;
}


 export function FUN_005dbc1b ()

 {
  FUN_005bc173();
  FUN_005dbc4a();
  FUN_005ddecf();
  return;
}


 export function FUN_005dbc3a ()

 {
  return;
}


 export function FUN_005dbc4a ()

 {
  return;
}


 export function FUN_005dbc5a ()

 {
  let local_2c;

  local_2c = 0x28;
  local_2c = FUN_005dbe88;
  local_2c = 0;
  local_2c = 0x14;
  local_2c = DAT_006e4ff0;
  local_2c = 0;
  local_2c = 0;
  local_2c = 0;
  local_2c = 0;
  local_2c = s_MSWindowClass_00638810;
  FUN_006e7da8(DAT_ffffffd4);
  local_2c = 0x28;
  local_2c = FUN_005ec317;
  local_2c = 0;
  local_2c = 0x14;
  local_2c = DAT_006e4ff0;
  local_2c = 0;
  local_2c = 0;
  local_2c = 0;
  local_2c = 0;
  local_2c = s_MSMovieClass_00638820;
  FUN_006e7da8(DAT_ffffffd4);
  local_2c = 0x88;
  local_2c = FUN_005c9307;
  local_2c = 0;
  local_2c = 0x10;
  local_2c = DAT_006e4ff0;
  local_2c = 0;
  local_2c = FUN_006e7dac(0, 0x7f00);
  local_2c = 0;
  local_2c = 0;
  local_2c = s_MSControlClass_00638830;
  FUN_006e7da8(DAT_ffffffd4);
  local_2c = 0;
  local_2c = FUN_005d4700;
  local_2c = 0;
  local_2c = 4;
  local_2c = DAT_006e4ff0;
  local_2c = 0;
  local_2c = 0;
  local_2c = 0;
  local_2c = 0;
  local_2c = s_MSMrTimerClass_00638840;
  FUN_006e7da8(DAT_ffffffd4);
  return;
}


 export function FUN_005dbdba ()

 {
  let BVar1;

  BVar1 = FUN_006e7ec4(s_MSAppWindow_00638850, DAT_006e4ff0);
  if ((BVar1 === 0)) {
    FUN_005d225b(s_Error:_Cannot_unregister_AppWind_0063885c);
  }
  BVar1 = FUN_006e7ec4(s_MSWindowClass_00638888, DAT_006e4ff0);
  if ((BVar1 === 0)) {
    FUN_005d225b(s_Error:_Cannot_unregister_window_c_00638898);
  }
  BVar1 = FUN_006e7ec4(s_MSMovieClass_006388c0, DAT_006e4ff0);
  if ((BVar1 === 0)) {
    FUN_005d225b(s_Error:_Cannot_unregister_window_c_006388d0);
  }
  BVar1 = FUN_006e7ec4(s_MSControlClass_006388f8, DAT_006e4ff0);
  if ((BVar1 === 0)) {
    FUN_005d225b(s_Error:_Cannot_unregister_control_00638908);
  }
  BVar1 = FUN_006e7ec4(s_MSMrTimerClass_00638930, DAT_006e4ff0);
  if ((BVar1 === 0)) {
    FUN_005d225b(s_Error:_Cannot_unregister_timer_c_00638940);
  }
  return;
}


 export function FUN_005dbe88 (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let pHVar2;
  let pHVar3;
  let BVar4;
  let hIcon;
  let LVar5;
  let iVar6;
  let iVar7;
  let LVar8;
  let ptVar9;
  let ptVar10;
  let local_a0;
  let local_98;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_28;
  let local_18;
  let local_14;

  if ((param_2 < 0x10)) {
    if ((param_2 === 0xf)) {
      local_50 = FUN_006e7e88(param_1, DAT_ffffff68);
      local_54 = FUN_006e7e2c(param_1, 0);
      BVar4 = FUN_006e7d4c(param_1);
      if ((BVar4 !== 0)) {
        FUN_006e7e38(param_1, DAT_ffffffec);
        iVar6 = FUN_00414d10();
        if ((s32((iVar6 + 0x20), 0) === 0)) {
          hIcon = FUN_006e7e58(0, 0x7f00);
          FUN_006e7ec8(local_50, 0, 0, hIcon);
        }
        else {
          iVar6 = FUN_00414d10();
          if ((DAT_00638b48 === 1)) DAT_00638b48 = (DAT_00638b48 === 1) {
            iVar6 = FUN_00414d10();
            FUN_006e7a80(s32((iVar6 + 8), 0));
          }
          iVar6 = FUN_00414d10();
          FUN_006e7ec8(local_50, 0, 0, s32((iVar6 + 0x20), 0));
        }
        return 0;
      }
      iVar6 = FUN_00414d10();
      if ((s32((iVar6 + 0x24), 0) === 0)) {
        iVar6 = FUN_00414d10();
        if ((s32((iVar6 + 0x14), 0) !== 0)) {
          iVar6 = FUN_00414d10();
          FUN_006e7e7c(local_50, DAT_00000008, s32((iVar6 + 0x14), 0));
        }
      }
      else {
        iVar6 = FUN_00414d10();
        local_3c = GetActiveView(s32((iVar6 + 0x24), 0));
        iVar6 = FUN_00414d10();
        local_44 = GetActiveView(s32((iVar6 + 0x24), 0));
        if ((local_44 !== 0)) local_44 = (local_44 !== 0) {
          local_38 = UNNAMED;
          local_38 = UNNAMED;
          local_38 = UNNAMED;
          local_38 = UNNAMED;
          FUN_006e7d90(DAT_ffffffec, 0, 0, local_3c, local_44);
          (local_58 < ((UNNAMED / local_44 | 0) + 1)) (local_58 = (UNNAMED / local_44 | 0);
              local_58 = (local_58 < ((UNNAMED / local_44 | 0) + 1)); local_58 = (local_58 + 1)) {
            (local_4c < ((UNNAMED / local_3c | 0) + 1)) (local_4c = (UNNAMED / local_3c | 0);
                local_4c = (local_4c < ((UNNAMED / local_3c | 0) + 1)); local_4c = (local_4c + 1)) {
              FUN_006e7d90(DAT_ffffffd8, local_4c * local_3c, local_58 * local_44, (local_3c + local_4c * local_3c), (local_44 + local_58 * local_44));
              ptVar10 = DAT_ffffffd8;
              ptVar9 = DAT_ffffffec;
              LVar8 = local_54;
              FUN_00414d10(local_54, ptVar9, ptVar10);
              FUN_005c0979(LVar8, ptVar9, ptVar10);
            }
          }
        }
      }
      iVar6 = FUN_00414d10();
      if ((s32((iVar6 + 0x2c), 0) !== 0)) {
        iVar6 = FUN_00414d10();
        local_3c = GetActiveView(s32((iVar6 + 0x2c), 0));
        iVar6 = FUN_00414d10();
        local_44 = GetActiveView(s32((iVar6 + 0x2c), 0));
        local_38 = UNNAMED;
        local_38 = UNNAMED;
        local_38 = UNNAMED;
        local_38 = UNNAMED;
        FUN_006e7d90(DAT_ffffffec, 0, 0, local_3c, local_44);
        iVar6 = FUN_00414bb0();
        iVar6 = ((iVar6 - local_44) >> 1);
        iVar7 = FUN_004080c0();
        FUN_006e7da4(DAT_ffffffec, ((iVar7 - local_3c) >> 1), iVar6);
        BVar4 = FUN_006e7d48(DAT_ffffffd8, DAT_ffffffec, DAT_ffffffc8);
        if ((BVar4 !== 0)) {
          local_14 = UNNAMED;
          local_14 = UNNAMED;
          local_14 = UNNAMED;
          local_14 = UNNAMED;
          iVar6 = FUN_00414bb0();
          iVar6 = (-((iVar6 - local_44) >> 1));
          iVar7 = FUN_004080c0();
          FUN_006e7da4(DAT_ffffffec, (-((iVar7 - local_3c) >> 1)), iVar6);
          ptVar10 = DAT_ffffffd8;
          ptVar9 = DAT_ffffffec;
          LVar8 = local_54;
          FUN_00414d10(local_54, ptVar9, ptVar10);
          FUN_005c0979(LVar8, ptVar9, ptVar10);
        }
      }
      FUN_006e7e84(param_1, DAT_ffffff68);
      return 0;
    }
    /* BRANCHIND */ () {
    case 2 :
      FUN_006e7e20(param_1, 0);
      FUN_006e7e2c(param_1, 0);
      iVar6 = FUN_00414d10();
      w32((iVar6 + 0x44), 0, 1);
      if (((_MEM[(iVar6 + 0x49)] & 2) !== 0)) {
        iVar6 = 0;
        pHVar2 = FUN_006e7e40(param_1);
        FUN_006e7e2c(pHVar2, iVar6);
        local_18 = FUN_00414d10();
        if ((s32((local_18 + 0xc), 0) === param_1)) {
          w32((local_18 + 0xc), 0, 0);
        }
      }
      LVar5 = FUN_006e7e80(param_1, param_2, param_3, param_4);
      return LVar5;
    case 3 :
      local_54 = FUN_006e7e2c(param_1, 0);
      if ((local_54 !== 0)) {
        iVar6 = FUN_00414d10();
        pHVar3 = s32((iVar6 + 8), 0);
        iVar6 = FUN_00414d10();
        FUN_006e7dd8(s32((iVar6 + 4), 0), pHVar3);
        iVar6 = FUN_00414d10();
        iVar7 = FUN_00414d10();
        pHVar3 = FUN_006e7e10(s32((iVar7 + 4), 0));
        w32((iVar6 + 8), 0, pHVar3);
      }
      break;
    case 5 :
      local_54 = FUN_006e7e2c(param_1, 0);
      if ((s32((iVar6 + 0x2c), 0) !== 0)) iVar6 = FUN_00414d10() iVar6 = (iVar6 + 0x2c) {
        FUN_006e7e28(param_1, 0, 1);
      }
      if ((local_54 !== 0)) {
        iVar6 = FUN_00414d10();
        pHVar3 = s32((iVar6 + 8), 0);
        iVar6 = FUN_00414d10();
        FUN_006e7dd8(s32((iVar6 + 4), 0), pHVar3);
        iVar6 = FUN_00414d10();
        iVar7 = FUN_00414d10();
        pHVar3 = FUN_006e7e10(s32((iVar7 + 4), 0));
        w32((iVar6 + 8), 0, pHVar3);
      }
      break;
    case 7 :
      FUN_006e7e2c(param_1, 0);
      iVar6 = FUN_00414d10();
      if ((s32((iVar6 + 0xc), 0) !== 0)) {
        FUN_006e7d6c(s32((iVar6 + 0xc), 0), 0x86, 1, 0);
      }
      break;
    case 8 :
      FUN_006e7e2c(param_1, 0);
      iVar6 = FUN_00414d10();
      if ((s32((iVar6 + 0xc), 0) !== 0)) {
        FUN_006e7d6c(s32((iVar6 + 0xc), 0), 0x86, 0, 0);
      }
    }
  }
  else if ((param_2 < 0x47)) {
    if ((param_2 === 0x46)) {
      if (((_MEM[(param_4 + 0x18)] & 4) === 0)) {
        local_54 = FUN_006e7e2c(param_1, 0);
        FUN_00414d10();
        uVar1 = FUN_005bd610();
        if (((uVar1 & 0x200) !== 0)) {
          iVar6 = 0;
          pHVar2 = FUN_006e7e40(param_1);
          FUN_006e7e2c(pHVar2, iVar6);
          local_18 = FUN_00414d10();
          if ((BVar4 !== 0)) local_18 = (local_18 + 0x10) BVar4 = FUN_006e7e18(s32((local_18 + 0x10), 0)) BVar4 = (BVar4 !== 0) {
            w32((param_4 + 4), 0, s32((local_18 + 0x10), 0));
          }
        }
      }
    }
    else if ((param_2 === 0x22)) {
      FUN_006e7e2c(param_1, 0);
      iVar6 = FUN_00414d10();
      if (((_MEM[(iVar6 + 0x49)] & 2) !== 0)) {
        iVar6 = 0;
        pHVar2 = FUN_006e7e40(param_1);
        FUN_006e7e2c(pHVar2, iVar6);
        local_18 = FUN_00414d10();
        if ((s32((local_18 + 0xc), 0) !== 0)) {
          FUN_006e7d6c(s32((local_18 + 0xc), 0), 0x86, 0, 0);
        }
        FUN_006e7d6c(param_1, 0x86, 1, 0);
        w32((local_18 + 0xc), 0, param_1);
      }
    }
  }
  else {
    if ((param_2 < 0xa5)) {
      if ((param_2 !== 0xa1)) param_2 = (param_2 !== 0xa1) goto switchD_005dc5f2_caseD_4; {
      if ((param_2 === 0x112)) {
        if ((param_3 === 0xf090)) param_3 = (param_3 === 0xf090) {
          FUN_006e7e2c(param_1, 0);
          iVar6 = FUN_00414d10();
          if (((_MEM[(iVar6 + 0x48)] & 0x20) === 0)) {
            return 0;
          }
        }
        goto switchD_005dc5f2_caseD_4;
      }
      if ((param_2 !== 0x204)) param_2 = (param_2 !== 0x204) goto switchD_005dc5f2_caseD_4; FUN_006e7e2c(param_1, 0) iVar6 = FUN_00414d10() {
      FUN_006e7d94(s32((iVar6 + 4), 0));
      FUN_006e7da0(param_1);
    }
  }
 switchD_005dc5f2_caseD_4: :
  local_a0 = FUN_006e7e80(param_1, param_2, param_3, param_4);
  if ((param_2 === 0x84)) {
    FUN_006e7e2c(param_1, 0);
    iVar6 = FUN_00414d10();
    if ((local_a0 === 1)) local_a0 = (local_a0 === 1) {
      FUN_006e7e38(param_1, DAT_ffffffec);
      local_40 = ((param_4 & 0xffff) - UNNAMED);
      local_48 = ((param_4 >>> 0x10) - UNNAMED);
      if ((s32((iVar6 + 0x3c), 0) === 0)) {
        local_3c = 5;
      }
      else {
        local_3c = s32((iVar6 + 0x3c), 0);
      }
      FUN_006e7e4c(param_1, DAT_ffffffd8);
      local_58 = 0;
      local_4c = 0;
      if ((local_48 < local_3c)) {
        local_58 = -1;
      }
      else {
        iVar7 = FUN_00407fc0(DAT_ffffffd8);
        if (((iVar7 - local_3c) < local_48)) {
          local_58 = 1;
        }
      }
      if ((local_40 < local_3c)) {
        local_4c = -1;
      }
      else {
        iVar7 = FUN_00407f90(DAT_ffffffd8);
        if (((iVar7 - local_3c) < local_40)) {
          local_4c = 1;
        }
      }
      if ((local_58 < 0)) {
        if ((local_40 < local_3c * 4)) {
          local_4c = -1;
        }
        else {
          iVar7 = FUN_00407f90(DAT_ffffffd8);
          if (((iVar7 + local_3c * -4) < local_40)) {
            local_4c = 1;
          }
        }
        if ((local_4c < 0)) {
          local_a0 = 0xd;
        }
        else if ((local_4c < 1)) {
          local_a0 = 0xc;
        }
        else {
          local_a0 = 0xe;
        }
      }
      else if ((local_58 < 1)) {
        if ((local_4c < 0)) {
          if ((local_48 < local_3c * 4)) {
            local_58 = -1;
          }
          else {
            iVar7 = FUN_00407fc0(DAT_ffffffd8);
            if (((iVar7 + local_3c * -4) < local_48)) {
              local_58 = 1;
            }
          }
          if ((local_58 < 0)) {
            local_a0 = 0xd;
          }
          else if ((local_58 < 1)) {
            local_a0 = 0xa;
          }
          else {
            local_a0 = 0x10;
          }
        }
        else if ((0 < local_4c)) {
          if ((local_48 < local_3c * 4)) {
            local_58 = -1;
          }
          else {
            iVar7 = FUN_00407fc0(DAT_ffffffd8);
            if (((iVar7 + local_3c * -4) < local_48)) {
              local_58 = 1;
            }
          }
          if ((local_58 < 0)) {
            local_a0 = 0xe;
          }
          else if ((local_58 < 1)) {
            local_a0 = 0xb;
          }
          else {
            local_a0 = 0x11;
          }
        }
      }
      else {
        if ((local_40 < local_3c * 4)) {
          local_4c = -1;
        }
        else {
          iVar7 = FUN_00407f90(DAT_ffffffd8);
          if (((iVar7 + local_3c * -4) < local_40)) {
            local_4c = 1;
          }
        }
        if ((local_4c < 0)) {
          local_a0 = 0x10;
        }
        else if ((local_4c < 1)) {
          local_a0 = 0xf;
        }
        else {
          local_a0 = 0x11;
        }
      }
    }
    if ((local_a0 === 1)) local_a0 = (local_a0 === 1) {
      FUN_006e7e38(param_1, DAT_ffffffec);
      local_48 = ((param_4 >>> 0x10) - UNNAMED);
      if ((local_48 < s32((iVar6 + 0x38), 0))) local_48 = (local_48 < s32((iVar6 + 0x38), 0)) {
        local_a0 = 2;
      }
    }
    if ((local_a0 === 1)) {
      FUN_006e7e64(s32((iVar6 + 0x1c), 0));
    }
  }
  return local_a0;
}


 export function FUN_005dcac0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d2182();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_005dcb00 (param_1)

 {
  FUN_005dcd70(param_1);
  return;
}


 export function FUN_005dcb1c (param_1)

 {
  FUN_005dcdf9(param_1);
  return;
}


 export function FUN_005dcb38 (param_1)

 {
  FUN_005dce29(param_1);
  return;
}


 export function FUN_005dcb54 (param_1)

 {
  FUN_005dce4f(param_1);
  return;
}


 export function FUN_005dcb70 (param_1)

 {
  FUN_005dce96(param_1);
  return;
}


 export function FUN_005dcb8c (param_1, param_2, param_3)

 {
  FUN_005dced3(param_1, param_2, param_3);
  return;
}


 export function FUN_005dcbb0 (param_1)

 {
  FUN_005dcef7(param_1);
  return;
}


 export function FUN_005dcbcc (param_1, param_2)

 {
  FUN_005dcf11(param_1, param_2);
  return;
}


 export function FUN_005dcbec ()

 {
  FUN_005dcfb5();
  return;
}


 export function FUN_005dcc10 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, 0);
  return in_ECX;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* __thiscall */ /* _Timevec::~_Timevec(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function ~_Timevec (this)

 {
  FUN_005e10c7(s32(this, 0));
  return;
}


 export function FUN_005dcc56 (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  uVar1 = FUN_005dcd40(param_1);
  FUN_005e16e0(uVar1, param_2, param_3, param_4);
  return;
}


 export function FUN_005dcc95 (param_1, param_2, param_3)

 {
  FUN_005e1768(param_1, param_3, param_2);
  return;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Multiple */ /* Matches */ /* With */ /* Same */ /* Base */ /* Name */
    /* protected: */ /* virtual */ /* unsigned */ /* char */ /* * */ /* __thiscall */ /* CHtmlStream::Realloc(unsigned */ /* char */ /* *,unsigned */
   /* long) */
    /* protected: */ /* virtual */ /* unsigned */ /* char */ /* * */ /* __thiscall */ /* CMemFile::Realloc(unsigned */ /* char */ /* *,unsigned */ /* long) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function Realloc (param_1, param_2)

 {
  FUN_005e17db(param_1, param_2);
  return;
}


 export function FUN_005dcce9 (param_1)

 {
  let uVar1;

  uVar1 = FUN_005dcd40(param_1);
  FUN_005e1805(uVar1);
  return;
}


 export function FUN_005dcd1c (param_1)

 {
  FUN_005e1805(param_1);
  return;
}


 export function FUN_005dcd40 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005e1599(s32(in_ECX, 0), param_1);
  return;
}


 export function FUN_005dcd70 (param_1)

 {
  let _Size;
  let hMem;
  let _Dst;
  let _Src;

  _Size = FUN_006e7c50(s32(param_1, 0));
  hMem = FUN_005dce4f(_Size);
  if ((hMem !== 0)) {
    _Dst = FUN_006e7ae4(hMem);
    _Src = FUN_006e7ae4(s32(param_1, 0));
    FID_conflict:_memcpy(_Dst, _Src, _Size);
    FUN_006e7b20(hMem);
    FUN_006e7b20(s32(param_1, 0));
    w32(param_1, 0, hMem);
  }
  return;
}


 export function FUN_005dcdf9 (param_1)

 {
  let pvVar1;

  if ((param_1 === 0)) {
    pvVar1 = 0;
  }
  else {
    pvVar1 = FUN_006e7ae4(param_1);
  }
  return pvVar1;
}


 export function FUN_005dce29 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7b20(param_1);
  }
  return 0;
}


 export function FUN_005dce4f (param_1)

 {
  let pvVar1;

  pvVar1 = FUN_006e7af0(0x42, param_1);
  if ((pvVar1 === 0)) {
    FUN_005dae6b(1, s_ERR_MEMALLOCFAILED_00638980, s_D:\Ss\Smeds32\Pcmem.cpp_00638968, 0x4c);
  }
  return pvVar1;
}


 export function FUN_005dce96 (param_1)

 {
  let pvVar1;

  if ((param_1 === 0)) {
    FUN_005d225b(s_Error:_Tried_to_dispose_of_NULL_H_00638994);
    pvVar1 = 0;
  }
  else {
    pvVar1 = FUN_006e7b40(param_1);
  }
  return pvVar1;
}


 export function FUN_005dced3 (param_1, param_2, param_3)

 {
  FID_conflict:_memcpy(param_2, param_1, param_3);
  return;
}


 export function FUN_005dcef7 (param_1)

 {
  FUN_006e7c50(param_1);
  return;
}


 export function FUN_005dcf11 (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let iVar4;

  uVar1 = FUN_005dce4f(param_2);
  uVar2 = FUN_005dcdf9(s32(param_1, 0));
  uVar3 = FUN_005dcdf9(uVar1);
  iVar4 = FUN_005dcef7(s32(param_1, 0));
  if ((param_2 <= iVar4)) {
    iVar4 = param_2;
  }
  FUN_005dced3(uVar2, uVar3, iVar4);
  FUN_005dce29(uVar1);
  FUN_005dce29(s32(param_1, 0));
  FUN_005dce96(s32(param_1, 0));
  w32(param_1, 0, uVar1);
  return;
}


 export function FUN_005dcfb5 ()

 {
  return 0x100000;
}


 export function FUN_005dcfca (param_1)

 {
  return (0x100000 < (param_1 << 0xa));
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005dd010 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005dd187;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c5a0();
  local_8 = 0;
  FUN_005eeca0();
  local_8 = 1;
  FUN_005c64da();
  local_8 = ((((local_8) >> 8) << 8) | 2);
  FUN_005bd630();
  w32(in_ECX, 0, PTR_FUN_0061d718);
  w32(in_ECX, 0x45, 0);
  w32(in_ECX, 0x168, 0);
  w32(in_ECX, 0x169, 0);
  w32(in_ECX, 0x16d, 0);
  w32(in_ECX, 0x16a, 1);
  w32(in_ECX, 0x16c, 0);
  w32(in_ECX, 0x16d, 0);
  w32(in_ECX, 0x284, 0);
  w32(in_ECX, 0x285, 0);
  w32(in_ECX, 0x286, 0);
  w32(in_ECX, 0x287, 0);
  w32(in_ECX, 0x288, 0);
  w32(in_ECX, 0x16b, 1);
  w32(in_ECX, 0x289, 0);
  _DAT_006389d0 = in_ECX;
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005dd1a0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_005dd266;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(in_ECX, 0, PTR_FUN_0061d718);
  local_8 = 0;
  local_8 = 3;
  FUN_005e2675();
  FUN_005e2799(in_ECX);
  _DAT_006389d0 = 0;
  local_8 = 2;
  FUN_005dd230();
  local_8 = 1;
  FUN_005dd23f();
  local_8 = (0 << 8);
  FUN_005dd24e();
  local_8 = -1;
  FUN_005dd25d();
  FUN_005dd270();
  return;
}


 export function FUN_005dd230 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_005dd23f ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_005dd24e ()

 {
  FUN_005eed1b();
  return;
}


 export function FUN_005dd25d ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_005dd270 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005dd27e (in_ECX, param_1, param_2, param_3, param_4)

 {
  // in_ECX promoted to parameter;

  FUN_005bb3f0(param_1, param_2, param_3, param_4, 0x140, 0xf0, (in_ECX + 0x124));
  FUN_005c041f(0);
  w32((in_ECX + 0x5b8), 0, param_3);
  w32((in_ECX + 0x5bc), 0, param_4);
  return;
}


 export function FUN_005dd2e3 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((param_5 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (param_5 + 0x48);
  }
  FUN_005bb4ae(param_1, param_2, param_3, param_4, 0x140, 0xf0, (in_ECX + 0x124), local_8);
  FUN_005c041f(0);
  w32((in_ECX + 0x5b4), 0, param_5);
  w32((in_ECX + 0x5b8), 0, param_3);
  w32((in_ECX + 0x5bc), 0, param_4);
  return;
}


 export function FUN_005dd377 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  FUN_005e2799();
  iVar1 = FUN_005e1c8e(in_ECX, param_1);
  if ((iVar1 === 0)) {
    iVar1 = 0;
  }
  return iVar1;
}


 export function FUN_005dd3c2 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0xa24), 0, 0);
  FUN_005e22ed();
  return;
}


 export function FUN_005dd3f1 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((param_1 <= param_2)) {
    w32((in_ECX + 0xa24), 0, 0);
    FUN_005e28cd();
    w32((in_ECX + 0xa14), 0, param_2);
    w32((in_ECX + 0xa10), 0, param_1);
    FUN_005e22ed(in_ECX);
  }
  return;
}


 export function FUN_005dd45d ()

 {
  FUN_005e28cd();
  return;
}


 export function FUN_005dd487 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005e26f6();
  w32((in_ECX + 0xa24), 0, 1);
  FUN_005e22ed(in_ECX);
  return;
}


 export function FUN_005dd4c2 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0xa10), 0, param_1);
  FUN_005e28cd();
  w32((in_ECX + 0xa14), 0, param_2);
  w32((in_ECX + 0xa24), 0, 1);
  FUN_005e22ed(in_ECX);
  return;
}


 export function FUN_005dd51d ()

 {
  FUN_005e2675();
  return;
}


 export function FUN_005dd53f ()

 {
  FUN_005e26f6();
  return;
}


 export function FUN_005dd561 (param_1)

 {
  FUN_005e30a1();
  FUN_005c0cc5(param_1);
  FUN_00450390(param_1);
  return;
}


 export function FUN_005dd5a4 (in_ECX, param_1)

 {
  let pCVar1;
  let pCVar2;
  let pCVar3;
  // in_ECX promoted to parameter;
  let local_14;

  FUN_005e2997();
  pCVar1 = GetActiveView(in_ECX);
  pCVar2 = GetActiveView(param_1);
  if ((pCVar1 <= pCVar2)) {
    pCVar1 = GetActiveView(in_ECX);
    pCVar2 = GetActiveView(param_1);
    if ((pCVar1 <= pCVar2)) goto LAB_005dd60c; pCVar1 = GetActiveView(in_ECX) pCVar3 = GetActiveView(in_ECX) FUN_005bd65c(pCVar3, pCVar1) LAB_005dd60c: pCVar1 = GetActiveView(in_ECX) pCVar3 = GetActiveView(in_ECX) FUN_006e7d90(DAT_ffffffec, 0, 0, pCVar3, pCVar1) FUN_005c0593(param_1, DAT_ffffffec, DAT_ffffffec) return


 export function FUN_005dd64c (in_ECX, param_1, param_2, param_3)

 {
  let pCVar1;
  let pCVar2;
  let xRight;
  // in_ECX promoted to parameter;
  let local_24;
  let local_14;

  if ((-1 < param_3)) -1 = (-1 < param_3) {
    pCVar1 = GetActiveView(param_1);
    pCVar2 = GetActiveView(in_ECX);
    if ((pCVar2 <= (pCVar1 - param_2))) {
      pCVar1 = GetActiveView(param_1);
      pCVar2 = GetActiveView(in_ECX);
      if ((pCVar2 <= (pCVar1 - param_3))) {
        FUN_005e2997(in_ECX, 0);
        pCVar2 = GetActiveView(in_ECX);
        xRight = GetActiveView(in_ECX);
        FUN_006e7d90(DAT_ffffffdc, 0, 0, xRight, pCVar2);
        FUN_006e7d68(DAT_ffffffec, DAT_ffffffdc);
        FUN_006e7da4(DAT_ffffffec, param_2, param_3);
        FUN_005c0593(param_1, DAT_ffffffdc, DAT_ffffffec);
      }
    }
  }
  return;
}


 export function FUN_005dd71e (in_ECX)

 {
  let pCVar1;
  // in_ECX promoted to parameter;
  let iVar2;

  pCVar1 = GetActiveView(in_ECX);
  iVar2 = pCVar1 * 2;
  pCVar1 = GetActiveView(in_ECX);
  FUN_005bb6c7(pCVar1 * 2, iVar2);
  w32((in_ECX + 0x5a0), 0, 1);
  return;
}


 export function FUN_005dd761 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((param_1 === 0)) {
    if ((s32((in_ECX + 0x5a4), 0) !== 0)) {
      w32((in_ECX + 0x5a4), 0, 0);
      FUN_005e32b2();
    }
  }
  else if ((s32((in_ECX + 0x5a4), 0) === 0)) {
    w32((in_ECX + 0x5a4), 0, 1);
    FUN_005e32b2();
  }
  return;
}


 export function FUN_005dd7de (in_ECX)

 {
  let yBottom;
  let xRight;
  // in_ECX promoted to parameter;
  let local_24;
  let local_14;

  yBottom = GetActiveView(in_ECX);
  xRight = GetActiveView(in_ECX);
  FUN_006e7d90(DAT_ffffffec, 0, 0, xRight, yBottom);
  local_24 = UNNAMED;
  local_24 = UNNAMED;
  local_24 = UNNAMED;
  local_24 = UNNAMED;
  FUN_006e7da4(DAT_ffffffdc, s32((in_ECX + 0x5b8), 0), s32((in_ECX + 0x5bc), 0));
  if ((s32((in_ECX + 0x5b4), 0) !== 0)) {
    FUN_005c0593((in_ECX + 0x558), DAT_ffffffdc, DAT_ffffffec);
  }
  return;
}


 export function FUN_005dd87d ()

 {
  return;
}


 export function FUN_005dd8a0 ()

 {
  let local_2c;

  local_2c = 0;
  local_2c = FUN_005dd93f;
  local_2c = 0;
  local_2c = 0;
  local_2c = DAT_006e4ff0;
  local_2c = 0;
  local_2c = 0;
  local_2c = 0;
  local_2c = 0;
  local_2c = s_MSMMWindow_006389e4;
  FUN_006e7da8(DAT_ffffffd4);
  DAT_006e4ff8 = FUN_006e7d50(0, s_MSMMWindow_006389f0, 0, 0, -0x80000000, -0x80000000, -0x80000000, -0x80000000, 0, 0, DAT_006e4ff0, 0);
  FUN_005ddd4e();
  return;
}


 export function FUN_005dd93f (param_1, param_2, param_3, param_4)

 {
  let LVar1;

  if ((param_2 === 0x3b9)) {
    if ((param_3 === 1)) {
      if (((param_4 & 0xffff) === DAT_006389d4)) {
        FUN_005de6bd();
      }
      else if (((param_4 & 0xffff) === DAT_006389d8)) {
        FUN_005de714();
      }
    }
    LVar1 = 0;
  }
  else {
    LVar1 = FUN_006e7e80(param_1, param_2, param_3, param_4);
  }
  return LVar1;
}


 export function FUN_005dd9d9 (param_1)

 {
  FUN_006e7fb0(param_1, 1);
  return;
}


 export function FUN_005dd9f5 (param_1)

 {
  FUN_006e7fb0(param_1, 9);
  return;
}


 export function FUN_005dda11 ()

 {
  FUN_006e7fb0(0, 1);
  return;
}


 export function FUN_005dda2b ()

 {
  return;
}


 export function FUN_005dda3b ()

 {
  FUN_006e7ecc(-1);
  return;
}


 export function FUN_005dda53 (param_1)

 {
  let MVar1;
  let iVar2;
  let local_38;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_006389d4 !== 0)) {
    FUN_005ddd12();
  }
  local_24 = s_sequencer_006389fc;
  local_20 = param_1;
  MVar1 = FUN_006e7fac(0, 0x803, 0x2200, DAT_ffffffd4);
  if ((MVar1 === 0)) {
    local_18 = local_28;
    DAT_006389d4 = local_28;
    local_c = 0x4003;
    MVar1 = FUN_006e7fac(local_28, 0x814, 0x100, DAT_ffffffec);
    if ((MVar1 === 0)) {
      if ((iVar2 === 7)) iVar2 = FUN_006e7dd4(0, s_The_MIDI_Mapper_is_not_available_00638a48, DAT_00638a44, 4) iVar2 = (iVar2 === 7) {
        FUN_006e7fac(local_18, 0x804, 0, 0);
        return 0;
      }
      local_38 = DAT_006e4ff8;
      MVar1 = FUN_006e7fac(local_18, 0x806, 1, DAT_ffffffc8);
      if ((MVar1 === 0)) {
        MVar1 = 0;
      }
      else {
        FUN_006e7fac(local_18, 0x804, 0, 0);
        FUN_005d2279(s_Midi_Play_error_00638a74, MVar1);
      }
    }
    else {
      FUN_006e7fac(local_18, 0x804, 0, 0);
      FUN_005d2279(s_Output_port_is_not_MIDI_Mapper_00638a24, MVar1);
    }
  }
  else {
    FUN_005d2279(s_Midi_Device_failed_to_open_00638a08, MVar1);
  }
  return MVar1;
}


 export function FUN_005ddbc7 (param_1)

 {
  let MVar1;
  let uVar2;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_006389d8 === 0)) {
    FUN_005ddd4e();
    if ((DAT_006389d8 === 0)) {
      return 0;
    }
    local_8 = DAT_006389d8;
  }
  else {
    local_8 = DAT_006389d8;
    FUN_006e7fac(DAT_006389d8, 0x808, 0, 0);
  }
  local_10 = 0;
  local_c = u8(param_1);
  MVar1 = FUN_006e7fac(local_8, 0x807, 8, DAT_fffffff0);
  if ((MVar1 === 0)) {
    if ((u8(param_1) === DAT_006389e0)) {
      local_14 = 5;
    }
    else {
      local_14 = 0xd;
    }
    local_1c = u8(param_1);
    local_18 = u8((param_1 + 1));
    local_20 = DAT_006e4ff8;
    MVar1 = FUN_006e7fac(local_8, 0x806, local_14, DAT_ffffffe0);
    if ((MVar1 === 0)) {
      uVar2 = 1;
    }
    else {
      FUN_005dde57();
      FUN_005d2279(s_Failed_to_play_requested_CD_Trac_00638aa8, MVar1);
      uVar2 = 0;
    }
  }
  else {
    FUN_005dde57();
    FUN_005d2279(s_Failed_to_play_requested_CD_Trac_00638a84, MVar1);
    uVar2 = 0;
  }
  return uVar2;
}


 export function FUN_005ddd12 ()

 {
  if ((DAT_006389d4 !== 0)) {
    FUN_006e7fac(DAT_006389d4, 0x808, 0, 0);
    DAT_006389d4 = 0;
  }
  return;
}


 export function FUN_005ddd4e ()

 {
  let MVar1;
  let local_34;
  let local_30;
  let local_2c;
  let local_20;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_006389d8 === 0)) {
    local_2c = s_cdaudio_00638acc;
    MVar1 = FUN_006e7fac(0, 0x803, 0x2000, DAT_ffffffcc);
    if ((MVar1 === 0)) {
      DAT_006389d8 = local_30;
      local_1c = 0xa;
      MVar1 = FUN_006e7fac(local_30, 0x80d, 0x400, DAT_ffffffe0);
      if ((MVar1 === 0)) {
        local_14 = 0;
        local_10 = 0;
        local_8 = 0;
        local_c = 3;
        FUN_006e7fac(local_30, 0x814, 0x100, DAT_ffffffec);
        DAT_006389e0 = local_10;
      }
      else {
        FUN_006e7fac(local_30, 0x804, 0, 0);
        DAT_006389d8 = 0;
        FUN_005d2279(s_CDAUDIO:_could_not_set_time_form_00638af4, MVar1);
      }
    }
    else {
      FUN_005d2279(s_Failed_to_open_CDAUDIO_device_00638ad4, MVar1);
    }
  }
  return;
}


 export function FUN_005dde57 ()

 {
  if ((DAT_006389d8 !== 0)) {
    FUN_006e7fac(DAT_006389d8, 0x804, 0, 0);
    DAT_006389d8 = 0;
    DAT_006389e0 = 0;
  }
  return;
}


 export function FUN_005dde9d ()

 {
  if ((DAT_006389d8 !== 0)) {
    FUN_006e7fac(DAT_006389d8, 0x808, 0, 0);
  }
  return;
}


 export function FUN_005ddecf ()

 {
  FUN_005dda11();
  FUN_005dde9d();
  FUN_005dde57();
  FUN_005ddd12();
  FUN_006e7e1c(DAT_006e4ff8);
  return;
}


 export function FUN_005ddeff ()

 {
  let MVar1;
  let local_3c;
  let local_38;
  let local_34;
  let local_24;
  let local_20;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_006389d8 === 0)) {
    local_34 = s_cdaudio_00638b18;
    MVar1 = FUN_006e7fac(0, 0x803, 0x2000, DAT_ffffffc4);
    if ((MVar1 !== 0)) {
      return -1;
    }
    local_24 = local_38;
    DAT_006389d8 = local_38;
    local_1c = 0xa;
    MVar1 = FUN_006e7fac(local_38, 0x80d, 0x400, DAT_ffffffe0);
    if ((MVar1 !== 0)) {
      FUN_006e7fac(local_24, 0x804, 0, 0);
      DAT_006389d8 = 0;
      return -1;
    }
  }
  else {
    local_24 = DAT_006389d8;
  }
  local_c = 3;
  MVar1 = FUN_006e7fac(local_24, 0x814, 0x100, DAT_ffffffec);
  if ((MVar1 === 0)) {
    DAT_006389e0 = local_10;
  }
  else {
    FUN_005dde57();
    local_10 = -1;
  }
  return local_10;
}


 export function FUN_005de00d ()

 {
  let MVar1;
  let local_2c;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_8;

  if ((DAT_006389d8 === 0)) {
    local_14 = s_cdaudio_00638b20;
    MVar1 = FUN_006e7fac(0, 0x803, 0x2000, DAT_ffffffe4);
    if ((MVar1 !== 0)) {
      return;
    }
    local_8 = local_18;
    local_20 = 0x100;
    FUN_006e7fac(local_18, 0x80d, 0x100, DAT_ffffffd4);
  }
  else {
    local_8 = DAT_006389d8;
    FUN_005dde9d();
    local_20 = 0x100;
    FUN_006e7fac(DAT_006389d8, 0x80d, 0x100, DAT_ffffffd4);
  }
  DAT_006389dc = local_8;
  return;
}


 export function FUN_005de0b5 ()

 {
  let MVar1;
  let local_2c;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_8;

  if ((DAT_006389dc === 0)) DAT_006389dc = (DAT_006389dc === 0) {
    local_14 = s_cdaudio_00638b28;
    MVar1 = FUN_006e7fac(0, 0x803, 0x2000, DAT_ffffffe4);
    if ((MVar1 === 0)) {
      local_8 = local_18;
      local_20 = 0x100;
      FUN_006e7fac(local_18, 0x80d, 0x100, DAT_ffffffd4);
      FUN_006e7fac(local_8, 0x804, 0, 0);
    }
  }
  else if ((DAT_006389dc !== 0)) {
    local_8 = DAT_006389dc;
    DAT_006389dc = 0;
    FUN_005dde9d();
    local_20 = 0x200;
    FUN_006e7fac(local_8, 0x80d, 0x200, DAT_ffffffd4);
    FUN_006e7fac(local_8, 0x804, 0, 0);
  }
  return;
}


 export function FUN_005de19d ()

 {
  let local_28;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  local_c = 4;
  local_1c = FUN_006e7fac(DAT_006389d8, 0x814, 0x100, DAT_ffffffec);
  if ((local_1c === 0)) {
    if ((local_10 === 0x20d)) {
      FUN_006e7fac(DAT_006389d8, 0x806, 0, DAT_ffffffd8);
    }
    else {
      FUN_006e7fac(DAT_006389d8, 0x809, 0, DAT_ffffffe8);
    }
  }
  return;
}


 export function FUN_005de250 ()

 {
  let local_28;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  local_c = 4;
  local_1c = FUN_006e7fac(DAT_006389d8, 0x814, 0x100, DAT_ffffffec);
  if ((local_1c === 0)) {
    if ((local_10 === 0x20d)) {
      FUN_006e7fac(DAT_006389d8, 0x806, 0, DAT_ffffffd8);
    }
    else if ((local_10 === 0x211)) {
      FUN_006e7fac(DAT_006389d8, 0x855, 0, DAT_ffffffe8);
    }
  }
  return;
}


 export function FUN_005de310 ()

 {
  let MVar1;
  let local_34;
  let local_30;
  let local_2c;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_006389d8 === 0)) {
    local_2c = s_cdaudio_00638b30;
    MVar1 = FUN_006e7fac(0, 0x803, 0x2000, DAT_ffffffcc);
    if ((MVar1 !== 0)) {
      return;
    }
    local_18 = local_30;
    local_1c = 0;
  }
  else {
    local_18 = DAT_006389d8;
  }
  local_c = 8;
  DAT_006389d8 = local_18;
  local_1c = FUN_006e7fac(local_18, 0x814, 0x100, DAT_ffffffec);
  if ((local_1c === 0)) {
    local_20 = local_10;
    local_c = 3;
    local_1c = FUN_006e7fac(local_18, 0x814, 0x100, DAT_ffffffec);
    if ((local_1c === 0)) {
      if ((local_10 < (local_20 + 1))) {
        FUN_005ddbc7(1);
      }
      else {
        FUN_005ddbc7((local_20 + 1));
      }
    }
  }
  return;
}


 export function FUN_005de41e ()

 {
  let MVar1;
  let local_34;
  let local_30;
  let local_2c;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_006389d8 === 0)) {
    local_2c = s_cdaudio_00638b38;
    MVar1 = FUN_006e7fac(0, 0x803, 0x2000, DAT_ffffffcc);
    if ((MVar1 !== 0)) {
      return;
    }
    local_18 = local_30;
    local_1c = 0;
  }
  else {
    local_18 = DAT_006389d8;
  }
  local_c = 8;
  DAT_006389d8 = local_18;
  local_1c = FUN_006e7fac(local_18, 0x814, 0x100, DAT_ffffffec);
  if ((local_1c === 0)) {
    local_20 = local_10;
    local_c = 3;
    local_1c = FUN_006e7fac(local_18, 0x814, 0x100, DAT_ffffffec);
    if ((local_1c === 0)) {
      if ((local_20 === 1)) {
        FUN_005ddbc7(1);
      }
      else {
        FUN_005ddbc7((local_20 + -1));
      }
    }
  }
  return;
}


 export function FUN_005de529 (param_1, param_2, param_3)

 {
  let uVar1;
  let MVar2;
  let local_2c;
  let local_28;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_006389d8 === 0)) {
    uVar1 = 0;
  }
  else {
    local_18 = DAT_006389d8;
    local_28 = 0xa;
    local_20 = 0x400;
    local_1c = FUN_006e7fac(DAT_006389d8, 0x80d, 0x400, DAT_ffffffd4);
    if ((local_1c === 0)) {
      local_20 = 0x100;
      local_c = 2;
      MVar2 = FUN_006e7fac(local_18, 0x814, 0x100, DAT_ffffffec);
      if ((MVar2 === 0)) {
        if ((param_1 !== 0)) {
          w32(param_1, 0, ((local_10 >>> 8) & 0xff));
        }
        if ((param_2 !== 0)) {
          w32(param_2, 0, ((local_10 >>> 0x10) & 0xff));
        }
        if ((param_3 !== 0)) {
          w32(param_3, 0, (local_10 & 0xff));
        }
        uVar1 = 1;
      }
      else {
        uVar1 = 0;
      }
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005de620 (param_1)

 {
  FUN_005dd9d9(param_1);
  return;
}


 export function FUN_005de63c (param_1)

 {
  FUN_005dd9f5(param_1);
  return;
}


 export function FUN_005de658 (param_1)

 {
  FUN_005dda2b(param_1);
  return;
}


 export function FUN_005de674 ()

 {
  FUN_005dda3b();
  return;
}


 export function FUN_005de689 (param_1)

 {
  FUN_005dda53(param_1);
  return;
}


 export function FUN_005de6a5 (param_1)

 {
  DAT_006e5004 = param_1;
  return;
}


 export function FUN_005de6bd ()

 {
  if ((DAT_006e5004 !== 0)) {
    DAT_006e5004 = DAT_006e5004();
  }
  return;
}


 export function FUN_005de6e0 (param_1)

 {
  FUN_005ddbc7(param_1);
  return;
}


 export function FUN_005de6fc (param_1)

 {
  DAT_006e5000 = param_1;
  return;
}


 export function FUN_005de714 ()

 {
  if ((DAT_006e5000 !== 0)) {
    DAT_006e5000 = DAT_006e5000();
  }
  return;
}


 export function FUN_005de737 ()

 {
  FUN_005ddd12();
  return;
}


 export function FUN_005de74c ()

 {
  FUN_005dda11();
  return;
}


 export function FUN_005de761 ()

 {
  FUN_005dde9d();
  return;
}


 export function FUN_005de780 (param_1)

 {
  let hdc;
  let uVar1;
  let iVar2;
  let local_10;
  let local_c;

  w16(param_1, 0, 0x300);
  w16(param_1, 1, 0x100);
  hdc = FUN_006e7e10(0);
  uVar1 = FUN_006e7a58(hdc, 0x26);
  if (((uVar1 & 0x100) === 0)) {
    DAT_006e500c = 0;
    DAT_00638b48 = 0;
  }
  else {
    iVar2 = FUN_006e7a58(hdc, 0x18);
    DAT_006e500c = (iVar2 / 2 | 0);
    FUN_006e7a50(hdc, 0, 0x100, (param_1 + 2));
  }
  (local_c < DAT_006e500c) (local_c = 0; local_c = (local_c < DAT_006e500c); local_c = (local_c + 1)) {
    _MEM[(param_1 + (local_c * 4 + 7))] = 0;
  }
  (local_c < (0x100 - DAT_006e500c)) (; local_c = (local_c < (0x100 - DAT_006e500c)); local_c = (local_c + 1)) {
    _MEM[(param_1 + (local_c * 2 + 2))] = 0;
    _MEM[(param_1 + (local_c * 4 + 5))] = 0;
    _MEM[(param_1 + (local_c * 2 + 3))] = 0;
    _MEM[(param_1 + (local_c * 4 + 7))] = 4;
  }
  (local_c < 0x100) (; local_c = (local_c < 0x100); local_c = (local_c + 1)) {
    _MEM[(param_1 + (local_c * 4 + 7))] = 0;
  }
  if ((DAT_00638b48 === 0)) {
    local_10 = DAT_00638b50;
    (local_c < 0xa) (local_c = 0; local_c = (local_c < 0xa); local_c = (local_c + 1)) {
      _MEM[(param_1 + (local_c * 2 + 2))] = _MEM[local_10];
      _MEM[(param_1 + (local_c * 4 + 5))] = local_10[1];
      _MEM[(param_1 + (local_c * 2 + 3))] = local_10[2];
      local_10 = (local_10 + 3);
    }
    (local_c < 0x100) (local_c = 0xf6; local_c = (local_c < 0x100); local_c = (local_c + 1)) {
      _MEM[(param_1 + (local_c * 2 + 2))] = _MEM[local_10];
      _MEM[(param_1 + (local_c * 4 + 5))] = local_10[1];
      _MEM[(param_1 + (local_c * 2 + 3))] = local_10[2];
      local_10 = (local_10 + 3);
    }
  }
  FUN_006e7dd8(0, hdc);
  return;
}


 export function FUN_005de984 (param_1, param_2, param_3)

 {
  let local_8;

  if ((0x100 < (param_3 + param_2))) {
    param_3 = (0x100 - param_2);
  }
  (local_8 < (param_3 + param_2)) (local_8 = param_2; local_8 = (local_8 < (param_3 + param_2)); local_8 = (local_8 + 1)) {
    _MEM[((param_1 + 7) + local_8 * 4)] = 1;
  }
  return;
}


 export function FUN_005de9e0 (param_1, param_2, param_3)

 {
  let local_8;

  if ((0x100 < (param_3 + param_2))) {
    param_3 = (0x100 - param_2);
  }
  (local_8 < (param_3 + param_2)) (local_8 = param_2; local_8 = (local_8 < (param_3 + param_2)); local_8 = (local_8 + 1)) {
    FUN_005deb12(param_1, local_8, _MEM[((param_1 + 4) + param_3 * 4)], _MEM[((param_1 + 5) + param_3 * 4)], _MEM[((param_1 + 6) + param_3 * 4)]);
  }
  return;
}


 export function FUN_005dea62 (param_1, param_2, param_3, param_4)

 {
  if ((DAT_00638b48 === 1)) {
    FUN_006e7a28(param_2, param_3, param_4, ((param_3 * 4 + param_1) + 4));
  }
  return;
}


 export function FUN_005dea9e (param_1, param_2, param_3, param_4, param_5)

 {
  _MEM[param_3] = _MEM[((param_1 + 4) + param_2 * 4)];
  _MEM[param_4] = _MEM[((param_1 + 5) + param_2 * 4)];
  _MEM[param_5] = _MEM[((param_1 + 6) + param_2 * 4)];
  return;
}


 export function FUN_005deadb (param_1, param_2, param_3, param_4, param_5)

 {
  _MEM[((param_1 + 4) + param_2 * 4)] = param_3;
  _MEM[((param_1 + 5) + param_2 * 4)] = param_4;
  _MEM[((param_1 + 6) + param_2 * 4)] = param_5;
  return;
}


 export function FUN_005deb12 (param_1, param_2, param_3, param_4, param_5)

 {
  let local_8;

  _MEM[((param_1 + 4) + param_2 * 4)] = param_3;
  _MEM[((param_1 + 5) + param_2 * 4)] = param_4;
  _MEM[((param_1 + 6) + param_2 * 4)] = param_5;
  _MEM[((param_1 + 7) + param_2 * 4)] = 4;
  (local_8 < DAT_006e500c) (local_8 = 0; local_8 = (local_8 < DAT_006e500c); local_8 = (local_8 + 1)) {
    if ((_MEM[((param_1 + 6) + local_8 * 4)] === param_5)) param_1 = (param_1 + 5) param_1 = (param_1 + 6) {
      _MEM[((param_1 + 7) + param_2 * 4)] = 1;
    }
  }
  (local_8 < 0x100) (local_8 = (0x100 - DAT_006e500c); local_8 = (local_8 < 0x100); local_8 = (local_8 + 1)) {
    if ((_MEM[((param_1 + 6) + local_8 * 4)] === param_5)) param_1 = (param_1 + 5) param_1 = (param_1 + 6) {
      _MEM[((param_1 + 7) + param_2 * 4)] = 1;
    }
  }
  return;
}


 export function FUN_005dec4e (param_1)

 {
  let local_8;

  if ((DAT_00638b48 === 1)) {
    local_8 = FUN_006e7a8c(param_1);
  }
  else {
    local_8 = 0;
  }
  return local_8;
}


 export function FUN_005dec8a (param_1)

 {
  if ((DAT_00638b48 === 1)) {
    FUN_006e7a94(param_1);
  }
  return;
}


 export function FUN_005decb1 (param_1, param_2, param_3, param_4)

 {
  if ((DAT_00638b48 === 1)) {
    FUN_006e7a2c(param_2, param_3, param_4, ((param_3 * 4 + param_1) + 4));
  }
  return;
}


 export function FUN_005deced (param_1, param_2)

 {
  FID_conflict:_memcpy(param_2, param_1, 0x404);
  return;
}


 export function FUN_005ded12 (param_1, param_2, param_3, param_4)

 {
  let local_c;
  let local_8;

  local_8 = 0;
  (local_c < (param_4 + param_3)) (local_c = param_3; local_c = (local_c < (param_4 + param_3)); local_c = (local_c + 1)) {
    _MEM[(local_8 + param_2)] = _MEM[((param_1 + 4) + local_c * 4)];
    _MEM[((local_8 + 1) + param_2)] = _MEM[((param_1 + 5) + local_c * 4)];
    _MEM[((local_8 + 2) + param_2)] = _MEM[((param_1 + 6) + local_c * 4)];
    local_8 = (local_8 + 3);
  }
  return;
}


 export function FUN_005ded90 ()

 {
  let iVar1;

  FUN_0043c660();
  FUN_004503d0();
  FUN_00453af0();
  if ((DAT_006e501c !== 0)) {
    FUN_004bb3b0(1);
  }
  if ((DAT_006e5014 !== 0)) {
    FUN_005a95b0(1);
  }
  iVar1 = FUN_00421bb0();
  DAT_00638bac = (iVar1 + 0xe10);
  DAT_00638ba4 = 0;
  return;
}


 export function FUN_005dee28 (param_1, param_2, param_3)

 {
  let uVar1;
  let pLVar2;
  let unaff_FS_OFFSET;
  let local_88;
  let local_84;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_60;
  let local_5c;
  let local_58;
  let local_54;
  let local_44;
  let local_40;
  let local_30;
  let local_2c;
  let local_2b;
  let local_2a;
  let local_29;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005df14e;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_2c = 0x54;
  local_2b = 0x45;
  local_2a = 0x58;
  local_29 = 0x54;
  local_28 = FUN_005c5540(DAT_ffffffd4, param_1);
  if ((local_28 !== 0)) {
    local_30 = FUN_005c5560(local_28);
    uVar1 = FUN_00418cb0(local_30, 0x1a4);
    pLVar2 = FUN_005c8834(DAT_ffffff7c, uVar1);
    local_64 = s32(pLVar2, 0);
    local_60 = s32(pLVar2, 1);
    local_5c = s32(pLVar2, 2);
    local_58 = s32(pLVar2, 3);
    local_24 = local_64;
    local_24 = local_60;
    local_24 = local_5c;
    local_24 = local_58;
    local_14 = FUN_00407f90(DAT_ffffffdc);
    local_14 = (local_14 + 0x20);
    local_44 = FUN_00407fc0(DAT_ffffffdc);
    local_44 = (local_44 + 0x48);
    FUN_006e7da4(DAT_ffffffdc, 0x10, 0x10);
    FUN_006e7d90(DAT_ffffffac, 0, 0, 0x48, 0x20);
    FUN_006e7da4(DAT_ffffffac, ((local_14 + -64) >> 1), (local_44 + -48));
    local_68 = operator_new(0x114);
    local_8 = 0;
    if ((local_68 === 0)) {
      local_6c = 0;
    }
    else {
      local_6c = FUN_0044c5a0();
    }
    local_8 = -1;
    DAT_006e5014 = local_6c;
    local_70 = operator_new(0x3c);
    local_8 = 1;
    if ((local_70 === 0)) {
      local_74 = 0;
    }
    else {
      local_74 = FUN_0040f3e0();
    }
    local_8 = -1;
    DAT_006e501c = local_74;
    uVar1 = FUN_005bb8c0(param_2);
    FUN_005bb4ae(DAT_00638bb0, 0xc01, 0, 0, local_14, local_44, uVar1, param_2);
    FUN_005c041f(7);
    FUN_00450400();
    if ((DAT_006e5014 === 0)) {
      local_88 = 0;
    }
    else {
      local_88 = (DAT_006e5014 + 0x48);
    }
    FUN_0040f680(local_88, 0x65, DAT_ffffffac, DAT_00638bb4);
    FUN_0040f880(FUN_005ded90);
    FUN_006e7d90(DAT_ffffffc0, 0, 0, local_14, local_44);
    FUN_005dfa4d(DAT_006e5014, DAT_ffffffc0, 3, 0xff, 0xf8);
    FUN_006e7d60(DAT_ffffffc0, -6, -6);
    FUN_005dfa4d(DAT_006e5014, DAT_ffffffc0, -1, 0xff, 0xf8);
    FUN_005dfa4d(DAT_006e5014, DAT_ffffffc0, 1, 0xff, 0xf8);
    FUN_005c19ad(0);
    FUN_005c1167(DAT_006d1ec8, local_30, DAT_ffffffdc, 0);
    FUN_004085f0();
    FUN_005bcfa0();
    FUN_00453af0();
    if ((param_3 !== 0)) {
      FUN_0043c630();
    }
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_005df166 ()

 {
  let iVar1;

  iVar1 = FUN_005dcfca(DAT_00638b94);
  if ((iVar1 === 0)) {
    DAT_00638ba8 = 0;
  }
  else if ((DAT_00638bac < iVar1)) DAT_00638ba8 = (DAT_00638ba8 === 0) DAT_00638ba8 = (DAT_00638ba8 < 3) iVar1 = FUN_00421bb0() DAT_00638bac = (DAT_00638bac < iVar1) {
    DAT_00638ba4 = 1;
    DAT_00638ba8 = (DAT_00638ba8 + 1);
    FUN_005dee28(DAT_00638b98, DAT_00638b90, DAT_00638b9c);
  }
  return;
}


 export function FUN_005df1fd (param_1, param_2, param_3, param_4, param_5)

 {
  if ((DAT_00638ba0 !== 0)) {
    FUN_005d2004(DAT_00638ba0);
  }
  DAT_00638b94 = param_1;
  DAT_00638b98 = param_3;
  DAT_00638b90 = param_4;
  DAT_00638b9c = param_5;
  DAT_00638ba8 = 0;
  DAT_00638ba4 = 0;
  DAT_00638ba0 = FUN_005d1f50(FUN_005df166, param_2 * 0x3e8, -1);
  return;
}


 export function FUN_005df280 ()

 {
  if ((DAT_00638ba0 !== 0)) {
    FUN_005d2004(DAT_00638ba0);
  }
  DAT_00638ba0 = 0;
  return;
}


 export function FUN_005df2b5 (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_474;
  let local_174;
  let local_172;
  let local_170;
  let local_16f;
  let local_16c;
  let local_168;
  let local_164;
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
  puStack_c = LAB_005df693;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  FUN_005d7c00();
  local_8 = 1;
  Realloc(param_1);
  uVar1 = FUN_00492a80();
  local_168 = FUN_005dce4f(uVar1);
  local_164 = FUN_005dcdf9(local_168);
  uVar1 = FUN_00492a80();
  FUN_004bb370(local_164, uVar1);
  local_1c = FUN_00492a80();
  local_1c = (local_164 + local_1c);
  local_164 = FUN_005dce29(local_168);
  if ((local_168 === 0)) {
    FUN_005d237d(s_Error:_GIF_resource_not_found_-_00638bbc, param_1);
    local_8 = (((local_8) >> 8) << 8);
    FUN_005df67b();
    local_8 = -1;
    FUN_005df687();
    FUN_005df69d();
    return;
  }
  local_24 = FUN_005dcdf9(local_168);
  iVar2 = _strncmp(local_24, DAT_00638be0, 3);
  if ((iVar2 !== 0)) {
    FUN_005d237d(s_Error:_Resource_is_not_a_GIF_-_00638be4, param_1);
    FUN_005dce29(local_168);
    FUN_005dcb70(local_168);
    local_8 = (((local_8) >> 8) << 8);
    FUN_005df67b();
    local_8 = -1;
    FUN_005df687();
    FUN_005df69d();
    return;
  }
  if (((local_24[0xa] & 0x80) === 0)) {
    FUN_005d237d(s_Error:_GIF_contains_no_global_co_00638c04, param_1);
    FUN_005dce29(local_168);
    FUN_005dcb70(local_168);
    local_8 = (((local_8) >> 8) << 8);
    FUN_005df67b();
    local_8 = -1;
    FUN_005df687();
    FUN_005df69d();
    return;
  }
  local_16c = (1 << ((local_24[0xa] & 7) + 1));
  local_20 = (local_24 + 0xd);
  FID_conflict:_memcpy(DAT_fffffb8c, local_20, local_16c * 3);
  (_MEM[local_20] === 0) (local_20 = (local_24 + (local_16c * 3 + 0xd)); local_20 = _MEM[local_20]; local_20 = (local_20 + 1)) {
  }
  if ((_MEM[local_20] !== 0x21)) local_20 = _MEM[local_20] {
    FUN_005d237d(s_Error:_GIF_Image_Block_not_found_00638c30, param_1);
    FUN_005dce29(local_168);
    FUN_005dcb70(local_168);
    local_8 = (((local_8) >> 8) << 8);
    FUN_005df67b();
    local_8 = -1;
    FUN_005df687();
    FUN_005df69d();
    return;
  }
  local_18 = (local_20 + 1);
  local_2c = ((s16((local_20 + 5), 0)) & 0xFFFF);
  local_c8 = ((s16((local_20 + 7), 0)) & 0xFFFF);
  if (((local_20[9] & 0x80) !== 0)) {
    FUN_005d225b(s_Warning:_Skipping_local_color_ta_00638c54);
  }
  local_28 = local_18[9];
  local_14 = (local_18 + 0xa);
  local_174 = FUN_005e0b80(local_2c);
  local_172 = FUN_005e0b80(local_c8);
  local_170 = local_28;
  local_16f = (((local_16c) & 0xFF) + 0xff);
  Realloc(param_2);
  FUN_00421c60(DAT_fffffe8c, 6);
  FUN_00421c60(DAT_fffffb8c, local_16c * 3);
  FUN_00421c60(local_14, (local_1c - local_14));
  local_168 = FUN_005dce96(local_168);
  FUN_00421c30();
  local_8 = (UNNAMED << 8);
  FUN_005df67b();
  local_8 = -1;
  FUN_005df687();
  FUN_005df69d();
  return;
}


 export function FUN_005df67b ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005df687 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005df69d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005df6ab (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  FUN_005df6e1(param_1, param_2, param_3, param_4, param_5, param_6, param_7, 0);
  return;
}


 export function FUN_005df6e1 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let pvVar7;
  let pvVar8;
  let uVar9;
  let local_48;
  let local_44;
  let local_1c;
  let local_c;
  let local_8;

  uVar1 = s32(param_3, 0);
  uVar2 = s32(param_3, 1);
  iVar3 = FUN_00407f90(param_3);
  iVar4 = FUN_00407fc0(param_3);
  FUN_006e7d90(DAT_ffffffe4, param_4, param_5, (param_4 + iVar3), (param_5 + iVar4));
  uVar5 = FUN_005e0ba0();
  uVar6 = FUN_005e0ba0();
  pvVar7 = operator_new((iVar4 + iVar3) * 4);
  pvVar8 = (iVar4 * 4 + pvVar7);
  (local_44 < iVar3) (local_44 = 0; local_44 = (local_44 < iVar3); local_44 = (local_44 + 1)) {
    w32((pvVar8 + local_44 * 4), 0, local_44);
  }
  (local_48 < iVar4) (local_48 = 0; local_48 = (local_48 < iVar4); local_48 = (local_48 + 1)) {
    w32((pvVar7 + local_48 * 4), 0, local_48);
  }
  (local_44 < iVar3) (local_44 = 0; local_44 = (local_44 < iVar3); local_44 = (local_44 + 1)) {
    uVar9 = FUN_005e0b50(iVar4);
    w32((pvVar8 + local_44 * 4), 0, uVar9);
  }
  (local_48 < iVar4) (local_48 = 0; local_48 = (local_48 < iVar4); local_48 = (local_48 + 1)) {
    local_8 = FUN_005e0b50(iVar4);
    local_c = FUN_005e0b50(iVar4);
    uVar9 = s32((pvVar7 + local_8 * 4), 0);
    w32((pvVar7 + local_8 * 4), 0, s32((pvVar7 + local_c * 4), 0));
    w32((pvVar7 + local_c * 4), 0, uVar9);
  }
  (local_48 < iVar4) (local_48 = 0; local_48 = (local_48 < iVar4); local_48 = (local_48 + param_7)) {
    uVar9 = FUN_005c5640(pvVar8, pvVar7, uVar5, uVar6, local_48, iVar3, iVar4, param_7, uVar1, uVar2, param_4, param_5, param_6);
    uVar9 = FUN_005c5640(uVar9);
    FUN_0061a000(uVar9);
    FUN_00408490(DAT_ffffffe4);
    if ((param_8 !== 0)) {
      FUN_005cbeb0(param_8);
    }
  }
  FUN_00408490(DAT_ffffffe4);
  operator_delete(pvVar7);
  return;
}


 export function FUN_005df931 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let local_c;
  let local_8;

  if ((param_3 < 1)) {
    local_8 = param_4;
    local_c = param_5;
    param_3 = (-param_3);
  }
  else {
    local_8 = param_5;
    local_c = param_4;
  }
  while ((param_3 === 0)) {
    if ((param_3 === 0)) break; FUN_005e0c90(local_8, param_6) FUN_005e7f85((s32(DAT_00000008, 0) + -1), s32(DAT_00000004, 0), (s32(DAT_00000008, 0) + -1), (s32(DAT_0000000c, 0) + -1)) FUN_005e7f85((s32(DAT_00000008, 0) + -1), (s32(DAT_0000000c, 0) + -1), s32(DAT_00000000, 0), (s32(DAT_0000000c, 0) + -1)) FUN_005e0c90(local_c, param_6) FUN_005e7f85(s32(DAT_00000000, 0), (s32(DAT_0000000c, 0) + -1), s32(DAT_00000000, 0), s32(DAT_00000004, 0)) FUN_005e7f85(s32(DAT_00000000, 0), s32(DAT_00000004, 0), (s32(DAT_00000008, 0) + -1), s32(DAT_00000004, 0)) FUN_006e7d60(param_2, -1, -1) param_3 = (param_3 + -1) return


 export function FUN_005dfa4d (param_1, param_2, param_3, param_4, param_5)

 {
  let local_c;
  let local_8;

  if ((param_3 < 1)) {
    local_8 = param_4;
    local_c = param_5;
    param_3 = (-param_3);
  }
  else {
    local_8 = param_5;
    local_c = param_4;
  }
  while ((param_3 === 0)) {
    if ((param_3 === 0)) break; FUN_005c19ad(local_8) FUN_005c11b2((s32(DAT_00000008, 0) + -1), s32(DAT_00000004, 0), (s32(DAT_00000008, 0) + -1), (s32(DAT_0000000c, 0) + -1)) FUN_005c11b2((s32(DAT_00000008, 0) + -1), (s32(DAT_0000000c, 0) + -1), s32(DAT_00000000, 0), (s32(DAT_0000000c, 0) + -1)) FUN_005c19ad(local_c) FUN_005c11b2(s32(DAT_00000000, 0), (s32(DAT_0000000c, 0) + -1), s32(DAT_00000000, 0), s32(DAT_00000004, 0)) FUN_005c11b2(s32(DAT_00000000, 0), s32(DAT_00000004, 0), (s32(DAT_00000008, 0) + -1), s32(DAT_00000004, 0)) FUN_006e7d60(param_2, -1, -1) param_3 = (param_3 + -1) return


 export function FUN_005dfb61 (param_1)

 {
  let bVar1;
  let sVar2;
  let pbVar3;
  let pvVar4;
  let local_30;
  let local_2c;
  let local_1c;
  let local_18;
  let local_14;
  let local_8;

  sVar2 = __msize(s32(param_1, 0));
  pbVar3 = operator_new(sVar2);
  if ((pbVar3 === 0)) {
    FUN_005d225b(s_RLLDecode_could_not_allocate_dec_00638c78);
    local_8 = 0;
  }
  else {
    FUN_005dced3(s32(param_1, 0), pbVar3, sVar2);
    local_14 = sVar2 * 2;
    local_18 = FID_conflict:__expand(s32(param_1, 0), local_14);
    if ((local_18 === 0)) {
      FUN_005d225b(s_RLLDecode_could_not_allocate_dec_00638cac);
      local_8 = 0;
    }
    else {
      w32(param_1, 0, local_18);
      local_30 = (local_18 + local_14);
      local_8 = 0;
      local_1c = pbVar3;
      while ((local_1c < (pbVar3 + (sVar2 - 1)))) local_1c = (local_1c < (pbVar3 + (sVar2 - 1))) {
        local_2c = u8(_MEM[local_1c]);
        if ((local_30 < (local_18 + ((local_2c & 0x7f) + 1)))) {
          local_14 = (local_14 + 0x3e8);
          pvVar4 = FID_conflict:__expand(s32(param_1, 0), local_14);
          if ((pvVar4 === 0)) {
            FUN_005d225b(s_RLLDecode_could_not_allocate_dec_00638ce0);
            return 0;
          }
          w32(param_1, 0, pvVar4);
          local_18 = (local_8 + pvVar4);
          local_30 = (local_14 + pvVar4);
        }
        if ((local_2c < 0x80)) {
          bVar1 = local_1c[1];
          local_1c = (local_1c + 2);
          while ((local_2c !== 0)) local_2c = (local_2c !== 0) {
            _MEM[local_18] = bVar1;
            local_18 = (local_18 + 1);
            local_8 = (local_8 + 1);
            local_2c = (local_2c - 1);
          }
        }
        else {
          local_2c = (local_2c - 0x80);
          local_1c = (local_1c + 1);
          while ((local_2c !== 0)) local_2c = (local_2c !== 0) {
            _MEM[local_18] = _MEM[local_1c];
            local_1c = (local_1c + 1);
            local_18 = (local_18 + 1);
            local_8 = (local_8 + 1);
            local_2c = (local_2c + -1);
          }
        }
      }
      pvVar4 = FID_conflict:__expand(s32(param_1, 0), local_8);
      if ((pvVar4 === 0)) {
        FUN_005d225b(s_RLLDecode_could_not_allocate_dec_00638d14);
        local_8 = 0;
      }
      else {
        w32(param_1, 0, pvVar4);
        operator_delete(pbVar3);
      }
    }
  }
  return local_8;
}


 export function FUN_005dfd8f (param_1, param_2)

 {
  let pcVar1;
  let pcVar2;
  let uVar3;
  let pcVar4;
  let pvVar5;
  let local_24;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  pcVar2 = operator_new(((param_2 + ((param_2 + ((param_2 >> 0x1f) & 0x7f)) >> 7)) + 5));
  if ((pcVar2 === 0)) {
    FUN_005d225b(s_RLLEncode_could_not_allocate_com_00638d48);
    uVar3 = -1;
  }
  else {
    local_1c = s32(param_1, 0);
    local_24 = (local_1c + 1);
    pcVar4 = (local_1c + param_2);
    local_8 = 0;
    local_14 = pcVar2;
    while ((local_1c < pcVar4)) local_1c = (local_1c < pcVar4) {
      (_MEM[local_24] === _MEM[local_1c]) (; (local_24 = (local_24 < pcVar4) && (local_24 = _MEM[local_24])); local_24 = (local_24 + 1)) {
      }
      local_c = (local_24 - local_1c);
      if ((2 < local_c)) {
        while ((local_c !== 0)) pcVar1 = local_14 local_c = (local_c !== 0) {
          if ((local_c < 0x80)) {
            _MEM[local_14] = ((local_c) & 0xFF);
            if ((param_2 <= (local_8 + 1))) goto LAB_005e0071; local_c = 0 {
            _MEM[local_14] = 0x7f;
            if ((param_2 <= (local_8 + 1))) goto LAB_005e0071; local_c = (local_c + -127) local_14 = (local_14 + 1) local_14[1] = _MEM[local_1c] local_14 = (pcVar1 + 2) local_8 = (local_8 + 2) goto LAB_005e0071; local_1c = local_24 local_24 = (local_24 < pcVar4) local_24 = (local_24 + 1) local_24 = (local_24 + 1) {
      }
      local_c = (local_24 - local_1c);
      while ((local_c !== 0)) local_c = (local_c !== 0) {
        if ((local_c < 0x80)) {
          _MEM[local_14] = (((local_c) & 0xFF) + 0x80);
          local_14 = (local_14 + 1);
          local_8 = (local_8 + 1);
          if ((param_2 <= local_8)) goto LAB_005e0071; local_10 = local_c local_c = 0 {
          _MEM[local_14] = 0xff;
          local_14 = (local_14 + 1);
          local_8 = (local_8 + 1);
          if ((param_2 <= local_8)) goto LAB_005e0071; local_c = (local_c + -127) local_10 = 0x7f local_10 = (local_10 !== 0) {
          _MEM[local_14] = _MEM[local_1c];
          local_1c = (local_1c + 1);
          local_14 = (local_14 + 1);
          local_8 = (local_8 + 1);
          local_10 = (local_10 + -1);
          if ((param_2 <= local_8)) goto LAB_005e0071; uVar3 = (local_14 - pcVar2) {
 LAB_005e0071: :
      operator_delete(pcVar2);
      uVar3 = -1;
    }
    else {
      operator_delete(s32(param_1, 0));
      pvVar5 = operator_new(uVar3);
      w32(param_1, 0, pvVar5);
      FUN_005dced3(pcVar2, s32(param_1, 0), uVar3);
      operator_delete(pcVar2);
    }
  }
  return uVar3;
}
