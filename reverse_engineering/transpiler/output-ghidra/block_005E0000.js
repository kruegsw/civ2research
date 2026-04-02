// Block 0x005E0000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 357

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_005e00bb (param_1)

 {
  if ((param_1 === 0x65)) {
    DAT_006e5020 = (DAT_006e5020 + 0x48);
  }
  else if ((param_1 === 0x66)) {
    DAT_006e5018 = -1;
    DAT_006e5020 = (DAT_006e5020 + 0x48);
  }
  return;
}


 export function FUN_005e010a (param_1, param_2)

 {
  DAT_006e5018 = param_2;
  return;
}


 export function FUN_005e0122 (param_1, param_2)

 {
  DAT_006e5018 = param_2;
  DAT_006e5020 = (DAT_006e5020 + 0x48);
  return;
}


 export function FUN_005e0148 (param_1, param_2)

 {
  let uVar1;
  let local_98;
  let local_94;
  let local_90;
  let local_10;
  let local_c;
  let local_8;

  local_98 = 1;
  local_c = 0;
  local_8 = 0;
  (_MEM[local_94] !== 0) (local_94 = param_1; local_94 = _MEM[local_94]; local_94 = (local_94 + 1)) {
    if ((_MEM[local_94] === 0x5f)) {
      DAT_ffffff70[local_c] = 0;
      uVar1 = FUN_004d8af0(DAT_ffffff70);
      local_10 = FUN_005c858e(uVar1);
      if ((local_8 < local_10)) {
        local_8 = local_10;
      }
      local_c = 0;
      local_98 = (local_98 + 1);
    }
    DAT_ffffff70[local_c] = _MEM[local_94];
    local_c = (local_c + 1);
  }
  w32(param_2, 0, local_8);
  return local_98;
}


 export function FUN_005e0215 (param_1, param_2)

 {
  let uVar1;
  let iVar2;

  uVar1 = FUN_004d8af0(param_1);
  iVar2 = FUN_005c858e(uVar1);
  return ((iVar2 / param_2 | 0) + 1);
}


 export function FUN_005e0248 (param_1, param_2)

 {
  FUN_005e026a(param_1, param_2, 0);
  return;
}


 export function FUN_005e026a (param_1, param_2, param_3)

 {
  let sVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let pCVar5;
  let pCVar6;
  let iVar7;
  let unaff_FS_OFFSET;
  let local_684;
  let local_680;
  let local_63c;
  let local_638;
  let local_628;
  let local_624;
  let local_5c4;
  let local_5c0;
  let local_5bc;
  let local_5b8;
  let local_5ac;
  let local_5a8;
  let local_174;
  let local_134;
  let local_124;
  let local_dc;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005e084a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  FUN_0043c690();
  local_8 = 1;
  FUN_0044c5a0();
  local_8 = 2;
  FUN_0040f3e0();
  local_8 = 3;
  FUN_0040f3e0();
  local_8 = 4;
  FUN_00531010();
  local_8 = ((((local_8) >> 8) << 8) | 5);
  sVar1 = _strlen((param_1 + 1));
  local_5ac = operator_new(sVar1);
  FUN_005f22d0(local_5ac, param_1);
  sVar1 = _strlen((param_2 + 1));
  local_174 = operator_new(sVar1);
  FUN_005f22d0(local_174, param_2);
  FUN_00417ef0(0, 0x11);
  FUN_005d8236(DAT_fffff980);
  FUN_005d4167(DAT_fffff980);
  local_5c4 = FUN_005e0148(local_174, DAT_fffff97c, DAT_fffff980);
  iVar2 = (local_684 + 0x66);
  local_684 = (local_684 + 0x20);
  local_63c = FUN_005e0215(local_5ac, iVar2, DAT_fffff980);
  DAT_006e5018 = 0;
  local_5c0 = 0x18;
  uVar3 = FUN_004d8af0();
  local_628 = FUN_005c8514(uVar3);
  FUN_006e7d90(DAT_fffffecc, 0, 0, (local_684 + 0x5a), ((local_628 * local_63c + local_5c0 * local_5c4) + 0x1e));
  if ((param_3 === 0)) {
    FUN_005bb3f0(DAT_00638d7c, 0x442, UNNAMED, UNNAMED, UNNAMED, UNNAMED, DAT_fffffa58);
    FUN_00450400();
  }
  else {
    FUN_005bb4ae(DAT_00638d80, 0xc01, UNNAMED, UNNAMED, UNNAMED, UNNAMED, DAT_fffffa58, param_3);
    FUN_005a9600(DAT_fffffa44);
    iVar2 = FUN_00407fc0(DAT_fffffa44);
    iVar4 = FUN_00407fc0(DAT_fffffecc);
    iVar7 = (local_5b8 + ((iVar2 - iVar4) / 2 | 0));
    iVar2 = FUN_00407f90(DAT_fffffa44, iVar7);
    iVar4 = FUN_00407f90(DAT_fffffecc);
    FUN_00518e80((local_5bc + ((iVar2 - iVar4) / 2 | 0)), iVar7);
  }
  FUN_005c041f(7);
  FUN_005dfa4d(DAT_fffffedc, DAT_fffffecc, -3, 0xff, 0);
  DAT_006e5020 = DAT_fffffedc;
  FUN_005c19ad((((DAT_fffffedc >>> 8) << 8) | DAT_00638b40));
  iVar2 = (local_628 * local_63c + 0xa);
  pCVar5 = GetActiveView(DAT_fffffedc);
  FUN_006e7d90(DAT_fffff9c8, 0xa, 0xa, (pCVar5 + -10), iVar2);
  FUN_005c1167(DAT_fffff980, local_5ac, DAT_fffff9c8, 1);
  pCVar5 = GetActiveView(DAT_fffffedc);
  FUN_006e7d90(DAT_fffff9dc, UNNAMED, (UNNAMED + 0xa), (UNNAMED + -70), (pCVar5 + -10));
  FUN_005e0bc0(DAT_ffffff24, 0x64, DAT_fffff9dc, 1, local_174);
  FUN_005311b0(FUN_005e010a);
  FUN_005311e0(FUN_005e0122);
  FUN_006e7d90(DAT_fffffecc, 0, 0, 0x3c, 0x19);
  pCVar5 = GetActiveView(DAT_fffffedc);
  pCVar5 = (pCVar5 + -35);
  pCVar6 = GetActiveView(DAT_fffffedc);
  FUN_006e7da4(DAT_fffffecc, (pCVar6 + -70), pCVar5);
  FUN_0040f680(DAT_ffffff24, 0x65, DAT_fffffecc, DAT_00638d84);
  FUN_0040f880(FUN_005e00bb);
  FUN_006e7da4(DAT_fffffecc, 0, -35);
  FUN_0040f680(DAT_ffffff24, 0x66, DAT_fffffecc, s_Cancel_00638d88);
  FUN_0040f880(FUN_005e00bb);
  FUN_004085f0();
  FUN_005c61b0();
  operator_delete(local_5ac);
  operator_delete(local_174);
  local_8 = 4;
  FUN_005e0802();
  local_8 = 3;
  FUN_005e080e();
  local_8 = 2;
  FUN_005e081a();
  local_8 = 1;
  FUN_005e0826();
  local_8 = (((local_8) >> 8) << 8);
  FUN_005e0832();
  local_8 = -1;
  FUN_005e083e();
  FUN_005e0854();
  return;
}


 export function FUN_005e0802 ()

 {
  FUN_004bb740();
  return;
}


 export function FUN_005e080e ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005e081a ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005e0826 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_005e0832 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_005e083e ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_005e0854 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005e0863 ()

 {
  let pCVar1;
  let pCVar2;
  let unaff_FS_OFFSET;
  let local_5f4;
  let local_1b8;
  let local_170;
  let local_20;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005e0a76;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  FUN_0044c5a0();
  local_8 = 1;
  FUN_0043c690();
  local_8 = 2;
  FUN_0040f3e0();
  local_8 = 3;
  FUN_0040f3e0();
  local_8 = 4;
  FUN_004187a0();
  local_8 = 5;
  FUN_00417ef0(0, 0x11);
  FUN_005d8236(DAT_fffffa0c);
  FUN_005d268e(DAT_fffffa0c);
  FUN_006e7d90(DAT_ffffffe0, 0, 0, 0x3c, 0x19);
  pCVar1 = GetActiveView(DAT_fffffe48);
  pCVar1 = (pCVar1 + -35);
  pCVar2 = GetActiveView(DAT_fffffe48);
  FUN_006e7da4(DAT_ffffffe0, (pCVar2 + -70), pCVar1);
  FUN_0040f680(DAT_fffffe90, 0x65, DAT_ffffffe0, DAT_00638d90);
  FUN_0040f880(FUN_005e00bb);
  FUN_006e7da4(DAT_ffffffe0, 0, -35);
  FUN_0040f680(DAT_fffffe90, 0x66, DAT_ffffffe0, s_Cancel_00638d94);
  FUN_0040f880(FUN_005e00bb);
  local_8 = 4;
  FUN_005e0a31();
  local_8 = 3;
  FUN_005e0a3a();
  local_8 = 2;
  FUN_005e0a46();
  local_8 = 1;
  FUN_005e0a52();
  local_8 = (((local_8) >> 8) << 8);
  FUN_005e0a5e();
  local_8 = -1;
  FUN_005e0a6a();
  FUN_005e0a80();
  return;
}


 export function FUN_005e0a31 ()

 {
  FUN_00418870();
  return;
}


 export function FUN_005e0a3a ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005e0a46 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_005e0a52 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_005e0a5e ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_005e0a6a ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_005e0a80 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005e0a8f (param_1, param_2, param_3)

 {
  FUN_005eeeb0(param_1, param_2, param_3);
  return;
}


 export function FUN_005e0ab3 (param_1, param_2, param_3, param_4)

 {
  FUN_005ef0b9(param_1, param_2, param_3, param_4);
  return;
}


 export function FUN_005e0adb (param_1)

 {
  FUN_005bbb5a(param_1);
  return;
}


 export function FUN_005e0af7 (param_1, param_2, param_3)

 {
  let uVar1;

  if ((s32(param_1, 3) < param_3)) param_1 = (param_1 + 2) param_3 = (param_3 < s32(param_1, 1)) param_1 = (param_1 + 3) {
    uVar1 = 0;
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_005e0b50 (param_1)

 {
  let iVar1;

  iVar1 = _rand();
  return ((iVar1 * param_1 + ((iVar1 * param_1 >> 0x1f) & 0x7fff)) >> 0xf);
}


 export function FUN_005e0b80 (param_1)

 {
  return ((((param_1) & 0xFF) << 8) | (((param_1) >> 8) & 0xFF));
}


 export function FUN_005e0ba0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0x38), 0);
}


 export function FUN_005e0bc0 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x44), 0) !== 0)) {
    FUN_0040f610();
  }
  w32((in_ECX + 0x4c), 0, PTR_DAT_00637e64);
  FUN_0040f730(param_1, 3, param_2, param_3);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x30), 0, 0);
  w32((in_ECX + 0x34), 0, 0);
  w32((in_ECX + 0x3c), 0, param_4);
  w32((in_ECX + 0x40), 0, 0);
  uVar1 = FUN_005d931b((in_ECX + 0x38), param_3, param_4, in_ECX, param_5, 1, s32((in_ECX + 0x4c), 0));
  w32((in_ECX + 0x44), 0, uVar1);
  uVar1 = FUN_005dcdf9(s32((in_ECX + 0x44), 0));
  w32((in_ECX + 0x48), 0, uVar1);
  return;
}


 export function FUN_005e0c90 (param_1)

 {
  let uVar1;

  uVar1 = FUN_005e0cc0();
  FUN_005e9944(param_1, uVar1);
  return;
}


 export function FUN_005e0cc0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32(in_ECX, 0);
}


 export function FUN_005e0ce0 (param_1, param_2)

 {
  let bVar1;
  let _Source;
  let uBytes;
  let hMem;
  let _Dest;
  let iVar2;
  let local_1c;
  let local_14;
  let local_10;
  let local_c;

  bVar1 = 0;
  local_1c = 0;
  uBytes = _strlen(param_2);
  hMem = FUN_006e7c70(2, uBytes);
  _Dest = FUN_006e7c68(hMem);
  _MEM[_Dest] = 0;
  (_MEM[param_2] === 0x20) (; param_2 = _MEM[param_2]; param_2 = (param_2 + 1)) {
  }
  while ((!bVar1)) bVar1 = (!bVar1) {
    if ((_MEM[param_2] === 0x21)) {
      local_10 = 3;
      param_2 = (param_2 + 1);
    }
    else {
      local_10 = 0;
    }
    if ((_MEM[param_2] === 0x2a)) {
      local_10 = (local_10 | 8);
      param_2 = (param_2 + 1);
    }
    _Source = param_2;
    local_c = 0;
    (_MEM[param_2] !== 0x7b) (; ((param_2 = _MEM[param_2] && (param_2 = _MEM[param_2])) && (param_2 = _MEM[param_2])); param_2 = (param_2 + 1)) {
      local_c = (local_c + 1);
    }
    _strncat(_Dest, _Source, local_c);
    if ((_MEM[param_2] === 0x7d)) param_2 = _MEM[param_2] {
      if ((_MEM[param_2] === 0x7d)) {
        bVar1 = 1;
      }
      local_14 = DAT_00638d9c;
      DAT_00638d9c = (DAT_00000000 + 1);
      do {
        param_2 = (param_2 + 1);
      } while ((param_2[1] === 0x20)) {
      local_14 = FUN_006e7ed4();
      param_2 = FUN_005e0ce0(local_14, (param_2 + 1));
      local_10 = (local_10 | 0x10);
      (_MEM[param_2] === 0x20) (; param_2 = _MEM[param_2]; param_2 = (param_2 + 1)) {
      }
      if ((_MEM[param_2] === 0x7d)) {
        bVar1 = 1;
        param_2 = (param_2 + 1);
      }
    }
    local_1c = (local_1c + 1);
    if ((0x16 < local_1c)) {
      local_1c = 0;
      local_10 = (local_10 | 0x40);
    }
    iVar2 = _strcmp(_Dest, DAT_00638da0);
    if ((iVar2 === 0)) {
      local_10 = 0x800;
      _MEM[_Dest] = 0;
      local_14 = 0;
    }
    FUN_006e7ed0(param_1, local_10, local_14, _Dest);
    _MEM[_Dest] = 0;
  }
  FUN_006e7b44(hMem);
  FUN_006e7c54(hMem);
  return param_2;
}


 export function FUN_005e0f2a (param_1)

 {
  let cVar1;
  let iVar2;
  let _Source;
  let hMenu;
  let uBytes;
  let hMem;
  let _Dest;
  let uIDNewItem;
  let local_28;
  let local_14;

  local_14 = param_1;
  hMenu = FUN_006e7ed4();
  iVar2 = DAT_00638d9c;
  uBytes = _strlen(param_1);
  hMem = FUN_006e7c70(2, uBytes);
  _Dest = FUN_006e7c68(hMem);
  _MEM[_Dest] = 0;
  while ((_MEM[local_14] !== 0)) local_14 = _MEM[local_14] {
    (_MEM[local_14] === 0x20) (; local_14 = _MEM[local_14]; local_14 = (local_14 + 1)) {
    }
    cVar1 = _MEM[local_14];
    if ((!(cVar1 !== 0x21))) {
      local_14 = (local_14 + 1);
    }
    _Source = local_14;
    local_28 = 0;
    (_MEM[local_14] !== 0x7b) (; local_14 = _MEM[local_14]; local_14 = (local_14 + 1)) {
      local_28 = (local_28 + 1);
    }
    _strncat(_Dest, _Source, local_28);
    do {
      local_14 = (local_14 + 1);
    } while ((local_14[1] === 0x20)) uIDNewItem = FUN_006e7ed4() local_14 = FUN_005e0ce0(uIDNewItem, local_14) {
      FUN_006e7ed0(hMenu, 0x10, uIDNewItem, _Dest);
    }
    else {
      FUN_006e7ed0(hMenu, 0x13, uIDNewItem, _Dest);
    }
    _MEM[_Dest] = 0;
  }
  DAT_00638d9c = (iVar2 + 0x64);
  FUN_006e7b44(hMem);
  FUN_006e7c54(hMem);
  return hMenu;
}


 export function FUN_005e10a2 (param_1)

 {
  FUN_006e7e6c(DAT_006e4ff0, (param_1 & 0xffff));
  return;
}


 export function FUN_005e10c7 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e00(param_1);
  }
  return;
}


 export function FUN_005e10eb ()

 {
  return;
}


 export function FUN_005e10fb (param_1)

 {
  FUN_006e7e70(s32((param_1 + 4), 0));
  return;
}


 export function FUN_005e1118 (param_1, param_2, param_3, param_4)

 {
  let hMenu;

  if ((param_3 === 0)) {
    if ((param_4 === 0)) {
      FUN_006e7df8(param_1, (param_2 - 1), 0x403);
    }
    else {
      FUN_006e7df8(param_1, (param_2 - 1), 0x400);
    }
  }
  else {
    hMenu = FUN_006e7df4(param_1, (param_2 + -1));
    if ((param_4 === 0)) {
      FUN_006e7df8(hMenu, (param_3 - 1), 0x403);
    }
    else {
      FUN_006e7df8(hMenu, (param_3 - 1), 0x400);
    }
  }
  return;
}


 export function FUN_005e11be (param_1, param_2, param_3, param_4)

 {
  let hMenu;

  if ((param_1 !== 0)) {
    hMenu = FUN_006e7df4(param_1, (param_2 + -1));
    if ((param_4 === 0)) {
      FUN_006e7dfc(hMenu, (param_3 - 1), 0x400);
    }
    else {
      FUN_006e7dfc(hMenu, (param_3 - 1), 0x408);
    }
  }
  return;
}


 export function FUN_005e1226 (param_1, param_2, param_3)

 {
  let hMenu;

  if ((param_1 !== 0)) {
    hMenu = FUN_006e7df4(param_1, (param_2 + -1));
    if ((param_3 === -1)) {
      FUN_006e7de8(param_1, (param_2 - 1), 0x400);
    }
    else {
      FUN_006e7dec(hMenu, (param_3 - 1), 0x400);
    }
  }
  return;
}


 export function FUN_005e128c (param_1, param_2, param_3, param_4)

 {
  let uIDNewItem;
  let pHVar1;
  let local_c;
  let local_8;

  if ((param_1 !== 0)) {
    pHVar1 = FUN_006e7df4(param_1, (param_2 + -1));
    local_c = 0;
    if ((param_2 !== -1)) param_3 = (param_3 !== -1) param_2 = (param_2 !== -1) {
      local_c = FUN_006e7ddc(pHVar1);
    }
    uIDNewItem = DAT_00638d9c;
    if ((local_c !== 0)) local_c = (local_c !== 0) {
      local_8 = 0x440;
    }
    else {
      local_8 = 0x400;
    }
    if ((param_3 === -1)) {
      pHVar1 = FUN_006e7de0();
      if ((param_2 === -1)) {
        FUN_006e7ed0(param_1, (local_8 | 0x10), pHVar1, param_4);
      }
      else {
        FUN_006e7df0(param_1, (param_2 - 1), (local_8 | 0x10), pHVar1, param_4);
      }
    }
    else {
      DAT_00638d9c = (DAT_00638d9c + 1);
      FUN_006e7df0(pHVar1, (param_3 - 1), local_8, uIDNewItem, param_4);
    }
  }
  return;
}


 export function FUN_005e13b1 (param_1, param_2, param_3, param_4, param_5)

 {
  let pHVar1;
  let local_c;
  let local_8;

  if ((param_1 !== 0)) {
    pHVar1 = FUN_006e7df4(param_1, (param_2 + -1));
    local_c = 0;
    if ((param_2 !== -1)) param_3 = (param_3 !== -1) param_2 = (param_2 !== -1) {
      local_c = FUN_006e7ddc(pHVar1);
    }
    if ((local_c !== 0)) local_c = (local_c !== 0) {
      local_8 = 0x440;
    }
    else {
      local_8 = 0x400;
    }
    if ((param_3 === -1)) {
      pHVar1 = FUN_006e7de0();
      if ((param_2 === -1)) {
        FUN_006e7ed0(param_1, (local_8 | 0x10), pHVar1, param_4);
      }
      else {
        FUN_006e7df0(param_1, (param_2 - 1), (local_8 | 0x10), pHVar1, param_4);
      }
    }
    else {
      FUN_006e7df0(pHVar1, (param_3 - 1), local_8, param_5, param_4);
    }
  }
  return;
}


 export function FUN_005e14c8 (param_1, param_2, param_3, param_4)

 {
  let hMenu;
  let uIDNewItem;

  if ((param_1 !== 0)) {
    hMenu = FUN_006e7df4(param_1, (param_2 + -1));
    if ((param_3 === -1)) {
      FUN_006e7de4(param_1, (param_2 - 1), 0x410, hMenu, param_4);
    }
    else {
      uIDNewItem = FUN_006e7e68(hMenu, (param_3 + -1));
      FUN_006e7de4(hMenu, (param_3 - 1), 0x400, uIDNewItem, param_4);
    }
  }
  return;
}


 export function FUN_005e154a (param_1, param_2, param_3, param_4)

 {
  let local_c;

  local_c = param_3;
  local_c = param_4;
  FUN_006e7e50(s32((param_2 + 4), 0), DAT_fffffff4);
  FUN_006e7dd0(param_1, 2, param_3, param_4, 0, s32((param_2 + 4), 0), 0);
  return;
}


 export function FUN_005e1599 (param_1, param_2)

 {
  let pHVar1;

  if ((param_1 === 0)) {
    pHVar1 = 0;
  }
  else {
    pHVar1 = FUN_006e7df4(param_1, (param_2 + -1));
  }
  return pHVar1;
}


 export function FUN_005e15ce (param_1, param_2, param_3)

 {
  if ((param_1 !== 0)) {
    if ((param_3 === 0)) {
      FUN_006e7df8(param_1, param_2, 3);
    }
    else {
      FUN_006e7df8(param_1, param_2, 0);
    }
  }
  return;
}


 export function FUN_005e1619 (param_1, param_2, param_3)

 {
  if ((param_1 !== 0)) {
    if ((param_3 === 0)) {
      FUN_006e7dfc(param_1, param_2, 0);
    }
    else {
      FUN_006e7dfc(param_1, param_2, 8);
    }
  }
  return;
}


 export function FUN_005e1664 (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    FUN_006e7dec(param_1, param_2, 0);
  }
  return;
}


 export function FUN_005e168e (param_1, param_2, param_3)

 {
  if ((param_1 !== 0)) {
    FUN_006e7de4(param_1, param_2, 0, param_2, param_3);
  }
  return;
}


 export function FUN_005e16c0 ()

 {
  return;
}


 export function FUN_005e16d0 ()

 {
  return;
}


 export function FUN_005e16e0 (param_1, param_2, param_3, param_4)

 {
  let hMenu;
  let iVar1;
  let local_c;

  if ((param_1 !== 0)) {
    hMenu = FUN_006e7df4(param_1, (param_2 + -1));
    iVar1 = FUN_006e7ddc(hMenu);
    if ((iVar1 !== 0)) iVar1 = (iVar1 !== 0) {
      local_c = 0x40;
    }
    else {
      local_c = 0;
    }
    FUN_006e7ed0(hMenu, local_c, param_4, param_3);
  }
  return;
}


 export function FUN_005e1768 (param_1, param_2, param_3)

 {
  let iVar1;
  let local_8;

  if ((param_1 !== 0)) {
    iVar1 = FUN_006e7ddc(param_1);
    if ((iVar1 !== 0)) iVar1 = (iVar1 !== 0) {
      local_8 = 0x40;
    }
    else {
      local_8 = 0;
    }
    FUN_006e7ed0(param_1, local_8, param_3, param_2);
  }
  return;
}


 export function FUN_005e17db (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    FUN_006e7dec(param_1, param_2, 0);
  }
  return;
}


 export function FUN_005e1805 (param_1)

 {
  let iVar1;
  let local_8;

  if ((param_1 !== 0)) {
    iVar1 = FUN_006e7ddc(param_1);
    if ((iVar1 !== 0)) iVar1 = (iVar1 !== 0) {
      local_8 = 0x840;
    }
    else {
      local_8 = 0x800;
    }
    FUN_006e7ed0(param_1, local_8, 0, 0);
  }
  return;
}


 export function FUN_005e1880 (param_1, param_2)

 {
  FUN_006e7db0(s32((param_2 + 4), 0), 0xc, param_1);
  FUN_006e7db0(s32((param_2 + 4), 0), -4, 0x5e18ff);
  return;
}


 export function FUN_005e18b7 (param_1, param_2, param_3)

 {
  FUN_006e7eb8(s32((param_1 + 4), 0), param_2, param_3, 0);
  return;
}


 export function FUN_005e18de (param_1, param_2)

 {
  FUN_006e7ebc(s32((param_1 + 4), 0), param_2);
  return;
}


 export function FUN_005e18ff (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let BVar2;
  let iVar3;
  let pCVar4;
  let pCVar5;
  let uVar6;
  let iVar7;
  let yDest;
  let wDest;
  let hDest;
  let hdcSrc;
  let xSrc;
  let ySrc;
  let rop;
  let local_74;
  let local_68;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_74 = FUN_006e7e2c(param_1, 0xc);
  if ((local_74 === 0)) {
    uVar1 = FUN_005eacc0(param_1, param_2, param_3, param_4);
  }
  else if ((param_2 === 2)) {
    FUN_005bd65c(0, 0);
    FUN_006e7db0(param_1, 0xc, 0);
    uVar1 = FUN_005eacc0(param_1, 2, param_3, param_4);
  }
  else if ((param_2 === 5)) {
    if ((local_74 === 0)) {
      DAT_00637ea4 = 0;
    }
    else {
      DAT_00637ea4 = (local_74 + 0x48);
    }
    BVar2 = FUN_006e7d4c(param_1);
    if ((BVar2 === 0)) {
      FUN_005bb621((param_4 & 0xffff), (param_4 >>> 0x10));
    }
    uVar1 = FUN_005eacc0(param_1, 5, param_3, param_4);
  }
  else if ((param_2 === 0xf)) {
    BVar2 = FUN_006e7d4c(param_1);
    if ((BVar2 === 0)) {
      BVar2 = FUN_006e7e18(param_1);
      if ((BVar2 !== 0)) {
        FUN_006e7e88(param_1, DAT_ffffff98);
        local_14 = UNNAMED;
        local_10 = UNNAMED;
        local_c = UNNAMED;
        local_8 = UNNAMED;
        if ((local_74 === 0)) {
          local_74 = 0;
        }
        else {
          local_74 = (local_74 + 0x48);
        }
        FUN_005c0979(local_74, DAT_ffffffec, DAT_ffffffec);
        FUN_006e7e84(param_1, DAT_ffffff98);
      }
    }
    else {
      iVar3 = FUN_00414d10();
      if ((s32((iVar3 + 0x20), 0) !== 0)) {
        uVar1 = FUN_005dbe88(param_1, 0xf, param_3, param_4);
        return uVar1;
      }
      local_28 = FUN_006e7e88(param_1, DAT_ffffff98);
      local_14 = UNNAMED;
      local_10 = UNNAMED;
      local_c = UNNAMED;
      local_8 = UNNAMED;
      FUN_006e7d90(DAT_ffffffdc, 0, 0, 0, 0);
      pCVar4 = GetActiveView(local_74);
      pCVar5 = GetActiveView(local_74);
      if ((pCVar4 < pCVar5)) {
        pCVar4 = GetActiveView(local_74);
        iVar3 = FUN_00407f90(DAT_ffffffec);
        pCVar5 = GetActiveView(local_74);
        local_24 = (pCVar4 * iVar3 / pCVar5 | 0);
        local_24 = FUN_00407fc0(DAT_ffffffec);
      }
      else {
        local_24 = FUN_00407f90(DAT_ffffffec);
        pCVar4 = GetActiveView(local_74);
        iVar3 = FUN_00407fc0(DAT_ffffffec);
        pCVar5 = GetActiveView(local_74);
        local_24 = (pCVar4 * iVar3 / pCVar5 | 0);
      }
      uVar6 = GetCheckStyle(local_74);
      hdcSrc = s32((uVar6 + 4), 0);
      rop = 0xcc0020;
      pCVar4 = GetActiveView(local_74);
      pCVar5 = GetActiveView(local_74);
      ySrc = 0;
      xSrc = 0;
      wDest = UNNAMED;
      hDest = UNNAMED;
      iVar3 = FUN_00407fc0(DAT_ffffffec);
      iVar7 = FUN_00407fc0(DAT_ffffffdc);
      yDest = ((iVar3 - iVar7) >> 1);
      iVar3 = FUN_00407f90(DAT_ffffffec);
      iVar7 = FUN_00407f90(DAT_ffffffdc);
      FUN_006e7a78(local_28, ((iVar3 - iVar7) >> 1), yDest, wDest, hDest, hdcSrc, xSrc, ySrc, pCVar5, pCVar4, rop);
      FUN_006e7e84(param_1, DAT_ffffff98);
    }
    uVar1 = 0;
  }
  else {
    uVar1 = FUN_005eacc0(param_1, param_2, param_3, param_4);
  }
  return uVar1;
}


 export function FUN_005e1c70 ()

 {
  FUN_005e2cd1(DAT_00638dd4);
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005e1c8e (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  let pvVar5;
  let local_360;
  let local_9c;
  let local_98;
  let local_88;
  let local_84;
  let local_74;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_006e50c4 === 0)) {
    AVIFileInit();
    DAT_006e50c4 = 1;
  }
  DAT_00638dd4 = param_1;
  _DAT_006e5098 = 0x2c;
  _DAT_006e509c = 0x31345649;
  _DAT_006e50a8 = 2;
  _DAT_006e50a0 = 0x10002;
  _DAT_006e50a4 = 4;
  _DAT_006e50ac = 0;
  _DAT_006e50bc = 0;
  _DAT_006e5028 = 0x70;
  _DAT_006e502c = 0x31345649;
  _DAT_006e5038 = 2;
  _DAT_006e5030 = 0x10002;
  _DAT_006e5034 = 2;
  _DAT_006e5064 = DAT_006e50c8;
  _DAT_006e503c = -0x7ffffff8;
  DAT_006e50c8 = 0;
  DAT_006e50cc = 0;
  _DAT_006e50d0 = 0;
  _DAT_006e50d4 = 0;
  local_8 = AVIFileOpenA(DAT_00638dc0, param_2, 0, 0);
  if ((local_8 === 0)) {
    local_8 = AVIFileGetStream(DAT_00638dc0, DAT_00638dc4, 0x73646976, 0);
    if ((local_8 === 0)) {
      iVar3 = 0;
      if ((s32((param_1 + 0x5a8), 0) !== 0)) {
        local_8 = AVIFileGetStream(DAT_00638dc0, DAT_00638dc8, 0x73647561, 0);
        if ((local_8 === 0)) {
          w32((param_1 + 0x5b0), 0, 0);
          iVar1 = FUN_005eed76(DAT_00638dc8);
          iVar3 = local_8;
          if ((iVar1 === 0)) {
            w32((param_1 + 0x5a8), 0, 1);
          }
          else {
            w32((param_1 + 0x5a8), 0, 0);
          }
        }
        else {
          w32((param_1 + 0x5a8), 0, 0);
          iVar3 = local_8;
        }
      }
      local_8 = iVar3;
      local_c = 0x28;
      AVIStreamReadFormat(DAT_00638dc4, 1, (param_1 + 0x5c0), DAT_fffffff4);
      AVIStreamInfoA(DAT_00638dc4, DAT_ffffff64, 0x8c);
      w32((param_1 + 0x5d4), 0, local_74);
      _DAT_006e50d8 = (local_84 / local_88 | 0);
      DAT_00638db0 = ICLocate(0x63646976, local_98, (param_1 + 0x5c0), 0, 2);
      if ((ICLocate(0x63646976, local_98, (param_1 + 0x5c0), 0, 2) === 0)) {
        FUN_005e2799(param_1);
        local_8 = 0;
      }
      else {
        uVar2 = AVIStreamStart(DAT_00638dc4);
        w32((param_1 + 0xa10), 0, uVar2);
        iVar3 = AVIStreamLength(DAT_00638dc4);
        w32((param_1 + 0xa14), 0, ((s32((param_1 + 0xa10), 0) + iVar3) + -1));
        w32((param_1 + 0xa18), 0, s32((param_1 + 0xa10), 0));
        FID_conflict:_memcpy((param_1 + 0x5e8), (param_1 + 0x5c0), 0x28);
        w32((param_1 + 0x5f8), 0, 0);
        w16((param_1 + 0x5f6), 0, 8);
        w32((param_1 + 0x5fc), 0, 0);
        w32((param_1 + 0x608), 0, 0x100);
        DAT_00638db4 = s32((param_1 + 0x5c4), 0);
        DAT_00638db8 = s32((param_1 + 0x5c8), 0);
        uVar4 = GetCheckStyle(param_1);
        iVar3 = FUN_005e395a(uVar4);
        if ((iVar3 !== 0)) {
          w32((param_1 + 0x5f0), 0, (-s32((param_1 + 0x5f0), 0)));
        }
        if ((s32((param_1 + 0x5a0), 0) === 0)) {
          FUN_005bb6c7(DAT_00638db4, DAT_00638db8);
        }
        else {
          FUN_005bb6c7(DAT_00638db4 * 2, DAT_00638db8 * 2);
        }
        if ((local_74 === 0)) {
          iVar3 = ((s16((param_1 + 0x5ce), 0)) & 0xFFFF) * s32((param_1 + 0x5c4), 0) * s32((param_1 + 0x5c8), 0);
          pvVar5 = FUN_006e7af0(0x40, ((iVar3 + ((iVar3 >> 0x1f) & 7)) >> 3));
          DAT_00638da8 = FUN_006e7ae4(pvVar5);
        }
        else {
          pvVar5 = FUN_006e7af0(0x40, local_74);
          DAT_00638da8 = FUN_006e7ae4(pvVar5);
        }
        if ((DAT_00638da8 === 0)) {
          FUN_005e2799(param_1);
          local_8 = 0;
        }
        else {
          local_8 = FUN_005e2583(DAT_00638db0, 0, (param_1 + 0x5c0), 0, 0, 0, s32((param_1 + 0x5c4), 0), s32((param_1 + 0x5c8), 0), (param_1 + 0x5e8), 0, 0, 0, s32((param_1 + 0x5c4), 0), s32((param_1 + 0x5c8), 0));
          if ((local_8 === 0)) {
            ICSendMessage(DAT_00638db0, 0x401e, (param_1 + 0x5c0), (param_1 + 0x5e8));
            (local_10 < 0xec) (local_10 = 0; local_10 = (local_10 < 0xec); local_10 = (local_10 + 1)) {
              DAT_fffffca0[local_10 * 3] = param_1[(local_10 * 4 + 0x63a)];
              DAT_fffffca0[(local_10 * 3 + 1)] = param_1[(local_10 * 4 + 0x639)];
              DAT_fffffca0[(local_10 * 3 + 2)] = param_1[(local_10 * 4 + 0x638)];
            }
            FUN_005c6da8(0xa, 0xec, DAT_fffffca0);
            ICSendMessage(DAT_00638db0, 0x401d, (param_1 + 0x5e8), 0);
            local_8 = FUN_005e250c(DAT_00638db0, 0, (param_1 + 0x5c0), 0, 0, 0, s32((param_1 + 0x5c4), 0), s32((param_1 + 0x5c8), 0), (param_1 + 0x5e8), 0, 0, 0, s32((param_1 + 0x5c4), 0), s32((param_1 + 0x5c8), 0));
            if ((local_8 === 0)) {
              DAT_00638dcc = 1;
              DAT_00638dd0 = 0;
              if ((s32((param_1 + 0x5a4), 0) === 0)) {
                FUN_005e32b2(param_1, 0);
              }
              else {
                FUN_005e32b2(param_1, 1);
              }
              iVar3 = ((s16((param_1 + 0x5ce), 0)) & 0xFFFF) * s32((param_1 + 0x5c4), 0) * s32((param_1 + 0x5c8), 0);
              DAT_00638dac = ((iVar3 + ((iVar3 >> 0x1f) & 7)) >> 3);
              _DAT_00638dec = 0;
              _DAT_006e50dc = 0;
              local_8 = 0;
            }
            else {
              FUN_005e2799(param_1);
            }
          }
          else {
            FUN_005e2799(param_1);
          }
        }
      }
    }
    else {
      FUN_005e2799(param_1);
    }
  }
  else {
    FUN_005e2799(param_1);
  }
  return local_8;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005e22ed (param_1)

 {
  let uVar1;
  let uVar2;

  if ((DAT_00638dcc !== 0)) DAT_00638dcc = (DAT_00638dcc !== 0) {
    if ((DAT_00638dd0 !== 0)) {
      FUN_005e2675(param_1);
    }
    if ((s32((param_1 + 0x5a0), 0) !== 0)) {
      ICSendMessage(DAT_00638db0, 0x403f, 0, 0);
      _DAT_006e50ac = 8;
      if ((s32((param_1 + 0x5a4), 0) !== 0)) {
        _DAT_006e50ac = -0x7ffffff4;
      }
      _DAT_006e503c = -0x7ffffff8;
      ICSendMessage(DAT_00638db0, 0x5001, DAT_006e5098, 0x2c);
      ICSendMessage(DAT_00638db0, 0x5001, DAT_006e5028, 0x70);
      w32((param_1 + 0x5f0), 0, (s32((param_1 + 0x5f0), 0) << 1));
      w32((param_1 + 0x5ec), 0, (s32((param_1 + 0x5ec), 0) << 1));
      FUN_005e250c(DAT_00638db0, 0, (param_1 + 0x5c0), 0, 0, 0, s32((param_1 + 0x5c4), 0), s32((param_1 + 0x5c8), 0), (param_1 + 0x5e8), 0, 0, 0, s32((param_1 + 0x5c4), 0) * 2, s32((param_1 + 0x5c8), 0) * 2);
      w32((param_1 + 0x5f0), 0, (s32((param_1 + 0x5f0), 0) >> 1));
      w32((param_1 + 0x5ec), 0, (s32((param_1 + 0x5ec), 0) >> 1));
    }
    if ((s32((param_1 + 0x5a8), 0) !== 0)) {
      uVar1 = AVIStreamSampleToTime(DAT_00638dc4, s32((param_1 + 0xa14), 0));
      uVar2 = AVIStreamSampleToTime(DAT_00638dc4, s32((param_1 + 0xa18), 0));
      FUN_005eedec(uVar2, uVar1);
    }
    if ((DAT_00638dcc !== 0)) {
      if ((s32((param_1 + 0x5a4), 0) === 0)) {
        FUN_005e2cd1(param_1);
      }
      DAT_00637efc = 1;
      DAT_00638dd0 = 1;
      _DAT_00638dec = 0;
      if ((s32((param_1 + 0x5a8), 0) === 0)) {
        _DAT_00638dbc = FUN_006e7f58();
      }
      else {
        FUN_005eee4f();
        w32((param_1 + 0x5b0), 0, 1);
      }
    }
  }
  return;
}


 export function FUN_005e250c (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14)

 {
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
  let local_10;
  let local_c;
  let local_8;

  local_38 = param_2;
  local_34 = param_3;
  local_30 = param_4;
  local_14 = param_5;
  local_10 = param_6;
  local_c = param_7;
  local_8 = param_8;
  local_2c = param_9;
  local_28 = param_10;
  local_24 = param_11;
  local_20 = param_12;
  local_1c = param_13;
  local_18 = param_14;
  ICSendMessage(param_1, 0x403c, DAT_ffffffc8, 0x34);
  return;
}


 export function FUN_005e2583 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14)

 {
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
  let local_10;
  let local_c;
  let local_8;

  local_38 = param_2;
  local_34 = param_3;
  local_30 = param_4;
  local_14 = param_5;
  local_10 = param_6;
  local_c = param_7;
  local_8 = param_8;
  local_2c = param_9;
  local_28 = param_10;
  local_24 = param_11;
  local_20 = param_12;
  local_1c = param_13;
  local_18 = param_14;
  ICSendMessage(param_1, 0x403d, DAT_ffffffc8, 0x34);
  return;
}


 export function FUN_005e25fa (param_1, param_2, param_3)

 {
  if ((DAT_00638dcc !== 0)) DAT_00638dcc = (DAT_00638dcc !== 0) {
    if ((DAT_00638dd0 !== 0)) {
      FUN_005e2675(param_1);
    }
    FUN_005e28cd(param_1, param_2, 0);
    w32((param_1 + 0xa10), 0, param_2);
    w32((param_1 + 0xa14), 0, param_3);
    FUN_005e22ed(param_1);
  }
  return;
}


 export function FUN_005e2675 (param_1)

 {
  if ((DAT_00638dcc !== 0)) DAT_00638dcc = (DAT_00638dcc !== 0) {
    if ((s32((param_1 + 0x5a8), 0) !== 0)) {
      w32((param_1 + 0x5b0), 0, 0);
    }
    w32((param_1 + 0x5ac), 0, 1);
    if ((DAT_00638dd0 !== 0)) {
      DAT_00637efc = 0;
      DAT_00638de8 = 0;
      DAT_00638dd0 = 0;
    }
  }
  return;
}


 export function FUN_005e26f6 (param_1)

 {
  let uVar1;
  let iVar2;

  if ((DAT_00638dcc !== 0)) DAT_00638dcc = (DAT_00638dcc !== 0) {
    if ((DAT_00638dd0 !== 0)) {
      FUN_005e2675(param_1);
    }
    uVar1 = AVIStreamStart(DAT_00638dc4);
    w32((param_1 + 0xa10), 0, uVar1);
    iVar2 = AVIStreamLength(DAT_00638dc4);
    w32((param_1 + 0xa14), 0, ((s32((param_1 + 0xa10), 0) + iVar2) + -1));
    w32((param_1 + 0xa18), 0, s32((param_1 + 0xa10), 0));
    FUN_005e28cd(param_1, s32((param_1 + 0xa10), 0), 0);
  }
  return;
}


 export function FUN_005e2799 (param_1)

 {
  let pvVar1;

  if ((param_1 !== 0)) {
    FUN_005e2675(param_1);
    if ((DAT_00638db0 !== 0)) {
      ICClose(DAT_00638db0);
      DAT_00638db0 = 0;
    }
    if ((DAT_00638dc8 !== 0)) {
      AVIStreamRelease(DAT_00638dc8);
      DAT_00638dc8 = 0;
    }
    if ((DAT_00638dc4 !== 0)) {
      AVIStreamRelease(DAT_00638dc4);
      DAT_00638dc4 = 0;
    }
    if ((DAT_00638dc0 !== 0)) {
      AVIFileRelease(DAT_00638dc0);
      DAT_00638dc0 = 0;
    }
    if ((DAT_006e50c4 !== 0)) {
      AVIFileExit();
      DAT_006e50c4 = 0;
    }
    if ((DAT_00638da8 !== 0)) {
      pvVar1 = FUN_006e7b3c(DAT_00638da8);
      FUN_006e7b20(pvVar1);
      pvVar1 = FUN_006e7b3c(DAT_00638da8);
      FUN_006e7b40(pvVar1);
      DAT_00638da8 = 0;
    }
    DAT_00638dac = 0;
    DAT_00638db4 = 0;
    DAT_00638db8 = 0;
    DAT_00638dd4 = 0;
  }
  return;
}


 export function FUN_005e28cd (param_1, param_2, param_3)

 {
  let uVar1;
  let local_8;

  if ((DAT_00638dcc !== 0)) DAT_00638dcc = (DAT_00638dcc !== 0) {
    if ((DAT_00638dd0 !== 0)) {
      FUN_005e2675(param_1);
    }
    uVar1 = AVIStreamFindSample(DAT_00638dc4, param_2, 0x14);
    w32((param_1 + 0xa18), 0, uVar1);
    while ((local_8 <= s32((param_1 + 0xa18), 0))) {
      if ((param_2 < 0)) {
        local_8 = 0;
      }
      else {
        local_8 = param_2;
      }
      if ((local_8 <= s32((param_1 + 0xa18), 0))) break; FUN_005e2997(param_1, -0x80000000) FUN_005e2997(param_1, 0) {
      FUN_005e2cd1(param_1);
    }
  }
  return;
}


 export function FUN_005e2997 (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let local_5c;
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = 0;
  if ((DAT_00638dcc === 0)) DAT_00638dcc = (DAT_00638dcc === 0) {
    local_8 = 1;
  }
  else {
    if ((param_2 === 0)) param_2 = (param_2 === 0) {
      FUN_005c0593(param_1, DAT_00638dd8, DAT_00638dd8);
    }
    local_8 = AVIStreamRead(DAT_00638dc4, s32((param_1 + 0xa18), 0), 1, DAT_00638da8, DAT_00638dac, DAT_fffffff4, 0);
    if ((local_8 === 0)) {
      w32((param_1 + 0x5d4), 0, local_c);
      if ((s32((param_1 + 0x5a0), 0) === 0)) {
        uVar3 = 0;
        uVar2 = 0;
        iVar5 = DAT_00638db4;
        iVar4 = DAT_00638db8;
        uVar1 = FUN_005c5640(0, 0, DAT_00638db4, DAT_00638db8);
        local_8 = FUN_005e2c5a(DAT_00638db0, param_2, (param_1 + 0x5c0), DAT_00638da8, 0, 0, DAT_00638db4, DAT_00638db8, (param_1 + 0x5e8), uVar1, uVar2, uVar3, iVar5, iVar4);
      }
      else {
        w32((param_1 + 0x5f0), 0, (s32((param_1 + 0x5f0), 0) << 1));
        w32((param_1 + 0x5ec), 0, (s32((param_1 + 0x5ec), 0) << 1));
        iVar5 = DAT_00638db8 * 2;
        iVar4 = DAT_00638db4 * 2;
        uVar3 = 0;
        uVar2 = 0;
        uVar1 = FUN_005c5640(0, 0, iVar4, iVar5);
        local_8 = FUN_005e2c5a(DAT_00638db0, param_2, (param_1 + 0x5c0), DAT_00638da8, 0, 0, DAT_00638db4, DAT_00638db8, (param_1 + 0x5e8), uVar1, uVar2, uVar3, iVar4, iVar5);
        w32((param_1 + 0x5f0), 0, (s32((param_1 + 0x5f0), 0) >> 1));
        w32((param_1 + 0x5ec), 0, (s32((param_1 + 0x5ec), 0) >> 1));
      }
      if ((local_8 !== 1)) local_8 = (local_8 !== 1) {
        FUN_006e7dcc(DAT_ffffffa4, s_ICDecompressEx_returned_%ld_00638df0, local_8);
        FUN_006e7dd4(0, DAT_ffffffa4, s_Get_Frame_00638e0c, 0);
      }
      if ((s32((param_1 + 0xa20), 0) === s32((param_1 + 0xa18), 0))) param_1 = (param_1 + 0xa20) {
        w32((param_1 + 0xa20), 0, 0);
        FUN_005e3580();
      }
      if ((DAT_00638dd0 !== 0)) DAT_00638dd0 = (DAT_00638dd0 !== 0) {
        if ((s32((param_1 + 0xa24), 0) === 0)) {
          FUN_005e2675(param_1);
          FUN_005e3550();
          local_8 = 0;
        }
        else {
          FUN_005e28cd(param_1, s32((param_1 + 0xa10), 0), 0);
          FUN_005e22ed(param_1);
          local_8 = 0;
        }
      }
      else {
        w32((param_1 + 0xa18), 0, (s32((param_1 + 0xa18), 0) + 1));
        if ((param_2 !== 0)) {
          local_8 = 1;
        }
      }
    }
  }
  return local_8;
}


 export function FUN_005e2c5a (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14)

 {
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
  let local_10;
  let local_c;
  let local_8;

  local_38 = param_2;
  local_34 = param_3;
  local_30 = param_4;
  local_14 = param_5;
  local_10 = param_6;
  local_c = param_7;
  local_8 = param_8;
  local_2c = param_9;
  local_28 = param_10;
  local_24 = param_11;
  local_20 = param_12;
  local_1c = param_13;
  local_18 = param_14;
  ICSendMessage(param_1, 0x403e, DAT_ffffffc8, 0x34);
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005e2cd1 (param_1)

 {
  let iVar1;
  let uVar2;
  let local_20;
  let local_1c;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    return;
  }
  if ((DAT_00638dcc === 0)) {
    return;
  }
  if ((DAT_00638dd0 !== 0)) {
    if ((s32((param_1 + 0x5a8), 0) === 0)) {
      local_8 = FUN_006e7f58();
      iVar1 = AVIStreamTimeToSample(DAT_00638dc4, (local_8 - DAT_00638dbc));
      local_20 = (s32((param_1 + 0xa10), 0) + iVar1);
      if ((local_20 < s32((param_1 + 0xa18), 0))) {
        return;
      }
      if ((s32((param_1 + 0xa14), 0) < local_20)) {
        if ((s32((param_1 + 0xa24), 0) === 0)) {
          FUN_005e2675(param_1);
          FUN_005e3550();
          return;
        }
        FUN_005e28cd(param_1, s32((param_1 + 0xa10), 0), 0);
        FUN_005e22ed(param_1);
        return;
      }
    }
    else {
      iVar1 = FUN_005eed43();
      if ((iVar1 === 0)) {
        if ((s32((param_1 + 0xa24), 0) === 0)) {
          FUN_005e2675(param_1);
          FUN_005e3550();
          return;
        }
        FUN_005e28cd(param_1, s32((param_1 + 0xa10), 0), 0);
        FUN_005e22ed(param_1);
        return;
      }
      uVar2 = FUN_005eedd1();
      iVar1 = AVIStreamTimeToSample(DAT_00638dc4, uVar2);
      local_20 = (s32((param_1 + 0xa10), 0) + iVar1);
      if ((local_20 < s32((param_1 + 0xa18), 0))) local_20 = (local_20 < s32((param_1 + 0xa18), 0)) {
        FUN_005d57b1(0x40);
        _DAT_00638dec = (DAT_00638dec + 1);
        return;
      }
    }
    if ((DAT_00638de8 !== 0)) {
      if ((s32((param_1 + 0x5a4), 0) === 0)) {
        FUN_00408460();
      }
      else {
        local_1c = DAT_006e50c8;
        local_1c = DAT_006e50cc;
        local_1c = (DAT_006e50c8 + None);
        local_1c = (DAT_006e50cc + None);
        FUN_006e7dc8(DAT_ffffffe4, DAT_ffffffe4, DAT_00638dd8);
        FUN_00408490(DAT_ffffffe4);
        DAT_00638dd8 = DAT_006e50c8;
        DAT_00638ddc = DAT_006e50cc;
        DAT_00638de0 = (DAT_006e50c8 + None);
        DAT_00638de4 = (DAT_006e50cc + None);
      }
    }
    if ((s32((param_1 + 0xa18), 0) < local_20)) {
      local_c = s32((param_1 + 0xa18), 0);
      do {
        iVar1 = local_c;
        local_c = (local_c + 1);
        local_c = AVIStreamFindSample(DAT_00638dc4, local_c, 0x11);
        if ((local_20 <= local_c)) break; {
        if (((local_c - local_20) < (local_20 - s32((param_1 + 0xa18), 0)))) local_c = (local_c - local_20) {
          w32((param_1 + 0xa18), 0, local_c);
        }
      }
      else if (((local_20 - iVar1) <= (local_c - local_20))) local_20 = (local_20 - iVar1) {
        if ((iVar1 !== -1)) {
          w32((param_1 + 0xa18), 0, iVar1);
        }
      }
      else {
        w32((param_1 + 0xa18), 0, local_c);
      }
      while ((s32((param_1 + 0xa18), 0) < (s32((param_1 + 0xa14), 0) - 1))) param_1 = (param_1 + 0xa18) param_1 = (param_1 + 0xa18) {
        FUN_005e2997(param_1, -0x80000000);
      }
    }
  }
  if ((s32((param_1 + 0x5a8), 0) !== 0)) param_1 = (param_1 + 0x5a8) {
    FUN_005d57b1(0x40);
    _DAT_00638dec = (None + 1);
  }
  iVar1 = FUN_005e2997(param_1, 0);
  DAT_00638de8 = u8((iVar1 === 0));
  return;
}


 export function FUN_005e30a1 (param_1)

 {
  let local_2d0;
  let local_c;
  let local_8;

  if ((DAT_00638dcc !== 0)) DAT_00638dcc = (DAT_00638dcc !== 0) {
    ICSendMessage(DAT_00638db0, 0x403f, 0, 0);
    FUN_005c6b63(DAT_fffffd30, 0, 0xec);
    (local_c < 0xec) (local_c = 0; local_c = (local_c < 0xec); local_c = (local_c + 1)) {
      _MEM[((param_1 + 0x610) + local_c * 4)] = DAT_fffffd30[(local_c * 3 + 2)];
      _MEM[((param_1 + 0x611) + local_c * 4)] = DAT_fffffd30[(local_c * 3 + 1)];
      _MEM[((param_1 + 0x612) + local_c * 4)] = DAT_fffffd30[local_c * 3];
      _MEM[((param_1 + 0x613) + local_c * 4)] = 0;
    }
    ICSendMessage(DAT_00638db0, 0x401d, (param_1 + 0x5e8), 0);
    if ((s32((param_1 + 0x5a0), 0) === 0)) {
      local_8 = FUN_005e250c(DAT_00638db0, 0, (param_1 + 0x5c0), 0, 0, 0, s32((param_1 + 0x5c4), 0), s32((param_1 + 0x5c8), 0), (param_1 + 0x5e8), 0, 0, 0, s32((param_1 + 0x5c4), 0), s32((param_1 + 0x5c8), 0));
    }
    else {
      w32((param_1 + 0x5f0), 0, (s32((param_1 + 0x5f0), 0) << 1));
      w32((param_1 + 0x5ec), 0, (s32((param_1 + 0x5ec), 0) << 1));
      local_8 = FUN_005e250c(DAT_00638db0, 0, (param_1 + 0x5c0), 0, 0, 0, s32((param_1 + 0x5c4), 0), s32((param_1 + 0x5c8), 0), (param_1 + 0x5e8), 0, 0, 0, s32((param_1 + 0x5c4), 0) * 2, s32((param_1 + 0x5c8), 0) * 2);
      w32((param_1 + 0x5f0), 0, (s32((param_1 + 0x5f0), 0) / 2 | 0));
      w32((param_1 + 0x5ec), 0, (s32((param_1 + 0x5ec), 0) / 2 | 0));
    }
    if ((local_8 !== 0)) {
      DAT_00638dcc = 0;
    }
  }
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005e32b2 (param_1, param_2)

 {
  let yBottom;
  let xRight;
  let local_2c;
  let local_1c;
  let local_c;
  let local_8;

  if ((DAT_00638dcc !== 0)) DAT_00638dcc = (DAT_00638dcc !== 0) {
    ICSendMessage(DAT_00638db0, 0x403f, 0, 0);
    if ((param_2 === 0)) {
      _DAT_006e50ac = 0;
    }
    else {
      _DAT_006e50ac = -0x7ffffffc;
    }
    _DAT_006e503c = -0x7ffffff8;
    ICSendMessage(DAT_00638db0, 0x5001, DAT_006e5098, 0x2c);
    ICSendMessage(DAT_00638db0, 0x5001, DAT_006e5028, 0x70);
    if ((s32((param_1 + 0x5a0), 0) === 0)) {
      local_8 = FUN_005e250c(DAT_00638db0, 0, (param_1 + 0x5c0), 0, 0, 0, DAT_00638db4, DAT_00638db8, (param_1 + 0x5e8), 0, 0, 0, DAT_00638db4, DAT_00638db8);
    }
    else {
      w32((param_1 + 0x5f0), 0, (s32((param_1 + 0x5f0), 0) << 1));
      w32((param_1 + 0x5ec), 0, (s32((param_1 + 0x5ec), 0) << 1));
      local_8 = FUN_005e250c(DAT_00638db0, 0, (param_1 + 0x5c0), 0, 0, 0, DAT_00638db4, DAT_00638db8, (param_1 + 0x5e8), 0, 0, 0, DAT_00638db4 * 2, DAT_00638db8 * 2);
      w32((param_1 + 0x5f0), 0, (s32((param_1 + 0x5f0), 0) >> 1));
      w32((param_1 + 0x5ec), 0, (s32((param_1 + 0x5ec), 0) >> 1));
    }
    if ((local_8 !== 0)) {
      DAT_00638dcc = 0;
    }
    if ((param_2 === 0)) {
      FUN_005bd65c(0, 0);
    }
    else {
      FUN_005bd65c(DAT_00638db4, DAT_00638db8);
      yBottom = GetActiveView(param_1);
      xRight = GetActiveView(param_1);
      FUN_006e7d90(DAT_ffffffe4, 0, 0, xRight, yBottom);
      local_2c = UNNAMED;
      local_2c = UNNAMED;
      local_2c = UNNAMED;
      local_2c = UNNAMED;
      FUN_006e7da4(DAT_ffffffd4, s32((param_1 + 0x5b8), 0), s32((param_1 + 0x5bc), 0));
      if ((s32((param_1 + 0x5b4), 0) !== 0)) {
        FUN_005c0593((param_1 + 0x558), DAT_ffffffd4, DAT_ffffffe4);
      }
      if ((DAT_00638dcc !== 0)) {
        FUN_005c0593(param_1, DAT_ffffffe4, DAT_ffffffe4);
        local_c = s32((param_1 + 0xa18), 0);
        FUN_005e28cd(param_1, local_c, 0);
        FUN_00408460();
      }
    }
  }
  return;
}


 export function FUN_005e3550 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x114), 0) !== 0)) {
    in_ECX = (in_ECX + 0x114);
  }
  return;
}


 export function FUN_005e3580 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x118), 0) !== 0)) {
    in_ECX = (in_ECX + 0x118);
  }
  return;
}


 export function FUN_005e35b0 (param_1)

 {
  let iVar1;
  let hdc;
  let h;
  let hMem;
  let pvVar2;
  let local_444;
  let local_434;
  let local_c;
  let local_8;

  local_444 = 0;
  iVar1 = (s32(param_1, 2) - s32(param_1, 0));
  local_c = (s32(param_1, 3) - s32(param_1, 1));
  if ((local_c < 1)) local_c = (local_c < 1) {
    local_444 = 0;
  }
  else {
    hdc = FUN_006e79f8(0);
    if ((hdc === 0)) {
      FUN_005d225b(s_Error:_Unable_to_create_DC_in_MS_00638e74);
    }
    else {
      _memset(DAT_fffffbcc, 0, 0x28);
      local_434 = 0x28;
      local_434 = 1;
      local_434 = 8;
      local_434 = 1;
      local_434 = FUN_005c55a0(iVar1);
      if ((0 < 1)) bmiHeader biHeight {
        if ((DAT_00638e1c === 0)) {
          FUN_005d225b(s_Bottom-up_orientation_recommende_00638e20);
        }
        DAT_00638e1c = 1;
      }
      if ((DAT_00638e18 === -1)) {
        local_434 = local_c;
      }
      else if ((DAT_00638e18 === 1)) {
        local_434 = (-local_c);
      }
      else {
        local_434 = UNNAMED * local_c;
      }
      _memset(DAT_00000028, 0, 0x400);
      h = FUN_006e7a30(hdc, DAT_fffffbcc, 0, DAT_fffffff8, 0, 0);
      if ((h === 0)) {
        FUN_005d225b(s_Error:_Unable_to_create_Bitmap_i_00638e44);
        FUN_006e7a08(hdc);
      }
      else {
        hMem = FUN_005dce4f(0x28);
        local_444 = FUN_006e7ae4(hMem);
        w32(local_444, 0, hMem);
        w32(local_444, 1, hdc);
        w32(local_444, 2, 0);
        w32(local_444, 3, h);
        w32(local_444, 8, UNNAMED);
        w32(local_444, 6, iVar1);
        w32(local_444, 7, local_c);
        pvVar2 = FUN_006e7a6c(hdc, h);
        w32(local_444, 4, pvVar2);
        w32(local_444, 9, local_8);
        if ((UNNAMED < 0)) bmiHeader biHeight {
          w32(local_444, 5, 1);
        }
        else {
          w32(local_444, 5, 0);
        }
        FUN_006e7a14(hdc, 1);
      }
    }
  }
  return local_444;
}


 export function FUN_005e3877 (param_1)

 {
  DAT_00638e18 = param_1;
  return;
}


 export function FUN_005e388f (param_1)

 {
  let uVar1;

  if ((param_1 !== 0)) {
    if ((s32(param_1, 1) !== 0)) {
      FUN_006e7a6c(s32(param_1, 1), s32(param_1, 4));
      FUN_006e7a94(s32(param_1, 3));
      FUN_006e7a08(s32(param_1, 1));
    }
    if ((s32(param_1, 2) !== 0)) {
      FUN_006e7a94(s32(param_1, 2));
    }
    uVar1 = s32(param_1, 0);
    FUN_005dce29(uVar1);
    FUN_005dce96(uVar1);
  }
  return 0;
}


 export function FUN_005e392a (param_1)

 {
  let uVar1;

  if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    uVar1 = s32((param_1 + 0x20), 0);
  }
  return uVar1;
}


 export function FUN_005e395a (param_1)

 {
  return (s32((param_1 + 0x14), 0) === 1);
}


 export function FUN_005e3988 (param_1)

 {
  let uVar1;
  let _Dst;
  let local_18;
  let local_14;
  let local_c;

  local_c = FUN_005e3a81(param_1);
  uVar1 = FUN_005dce4f(s32((param_1 + 0x20), 0));
  _Dst = FUN_005dcdf9(uVar1);
  local_14 = ((s32((param_1 + 0x1c), 0) + -1) * s32((param_1 + 0x20), 0) + local_c);
  (local_18 < (s32((param_1 + 0x1c), 0) / 2 | 0)) (local_18 = 0; local_18 = (local_18 < (s32((param_1 + 0x1c), 0) / 2 | 0)); local_18 = (local_18 + 1)) {
    FID_conflict:_memcpy(_Dst, local_14, s32((param_1 + 0x20), 0));
    FID_conflict:_memcpy(local_14, local_c, s32((param_1 + 0x20), 0));
    FID_conflict:_memcpy(local_c, _Dst, s32((param_1 + 0x20), 0));
    local_c = (local_c + s32((param_1 + 0x20), 0));
    local_14 = (local_14 - s32((param_1 + 0x20), 0));
  }
  FUN_005dce29(uVar1);
  FUN_005dce96(uVar1);
  return;
}


 export function FUN_005e3a81 (param_1)

 {
  let uVar1;

  if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    uVar1 = s32((param_1 + 0x24), 0);
  }
  return uVar1;
}


 export function FUN_005e3aa8 ()

 {
  return 0;
}


 export function FUN_005e3acb (param_1, param_2, param_3, param_4)

 {
  let local_408;
  let auStack_406;
  let local_8;

  FUN_006e7a34(s32((param_1 + 4), 0), param_3, param_4, DAT_fffffbf8);
  (local_8 < (param_4 + param_3)) (local_8 = param_3; local_8 = local_8; local_8 = (local_8 + 1)) {
    FUN_005c6b93(local_8, s32((DAT_fffffbf8 + (local_8 * 4 + 2)), 0), s32((DAT_fffffbf8 + (local_8 * 4 + 1)), 0), s32((DAT_fffffbf8 + local_8 * 4), 0));
  }
  return;
}


 export function FUN_005e3b4c (param_1, param_2, param_3, param_4)

 {
  let local_408;
  let local_8;

  (local_8 < (param_4 + param_3)) (local_8 = param_3; local_8 = local_8; local_8 = (local_8 + 1)) {
    FUN_00497c40(local_8, DAT_00000002, DAT_00000001, (DAT_fffffbf8 + local_8));
    DAT_00000003[0] = 0;
  }
  FUN_006e7a38(s32((param_1 + 4), 0), param_3, param_4, DAT_fffffbf8);
  return;
}


 export function FUN_005e3bdc (param_1, param_2)

 {
  FUN_005e3b4c(param_1, param_2, 0, 0x100);
  return;
}


 export function FUN_005e3c03 (param_1, param_2)

 {
  let local_808;
  let local_408;
  let local_8;

  FUN_006e7a3c(param_2, 0, 0x100, (DAT_fffff7f8 + 0x100));
  (local_8 < 0x100) (local_8 = 0; local_8 = (local_8 < 0x100); local_8 = (local_8 + 1)) {
    DAT_00000002[0] = DAT_00000000[0];
    DAT_00000001[0] = DAT_00000001[0];
    DAT_00000000[0] = DAT_00000002[0];
    DAT_00000003[0] = 0;
  }
  FUN_006e7a38(s32((param_1 + 4), 0), 0, 0x100, DAT_fffff7f8);
  return;
}


 export function FUN_005e3cb4 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  let iVar2;
  let cchText;
  let lprc;
  let format;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawString_00638ea0);
  }
  else {
    local_8 = FUN_005dcdf9(param_2);
    iVar1 = FUN_005c847f(param_2);
    iVar1 = (param_5 + iVar1);
    iVar2 = FUN_005c858e(param_2, param_3);
    FUN_006e7d90(DAT_ffffffe8, param_4, param_5, (param_4 + iVar2), iVar1);
    local_20 = FUN_006e7a6c(s32((param_1 + 4), 0), s32(local_8, 0));
    FUN_006e7a34(s32((param_1 + 4), 0), u8(DAT_00637e78), 1, DAT_ffffffdc);
    FUN_006e7a04(s32((param_1 + 4), 0), ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
    iVar1 = FUN_00407fc0(DAT_ffffffe8);
    iVar1 = (iVar1 / 2 | 0);
    iVar2 = FUN_00407f90(DAT_ffffffe8);
    iVar2 = (iVar2 / 2 | 0);
    FUN_006e7da4(DAT_ffffffe8, (-iVar2), (-iVar1));
    if (((param_7 & 1) !== 0)) {
      FUN_006e7da4(DAT_ffffffe8, iVar2, 0);
    }
    if (((param_7 & 4) !== 0)) {
      FUN_006e7da4(DAT_ffffffe8, 0, iVar1);
    }
    if (((param_7 & 8) !== 0)) {
      FUN_006e7da4(DAT_ffffffe8, 0, (-iVar1));
    }
    if (((param_7 & 2) !== 0)) {
      FUN_006e7da4(DAT_ffffffe8, (-iVar2), 0);
    }
    local_1c = FUN_006e7a44(s32((param_1 + 4), 0));
    FUN_006e7a40(s32((param_1 + 4), 0), 1);
    FUN_006e7a1c(s32((param_1 + 4), 0), UNNAMED, UNNAMED, 0);
    FUN_006e7d48(DAT_ffffffe8, DAT_ffffffe8, param_6);
    format = 0;
    lprc = DAT_ffffffe8;
    cchText = _strlen(param_3);
    FUN_006e7e74(s32((param_1 + 4), 0), param_3, cchText, lprc, format);
    FUN_006e7a40(s32((param_1 + 4), 0), local_1c);
    FUN_006e7a6c(s32((param_1 + 4), 0), local_20);
    FUN_005dce29(param_2);
  }
  return;
}


 export function FUN_005e3eca (param_1, param_2, param_3, param_4, param_5)

 {
  let cchText;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawString_00638ec4);
  }
  else if ((param_1 !== 0)) {
    local_8 = FUN_005dcdf9(param_2);
    local_c = FUN_006e7a6c(s32((param_1 + 4), 0), s32(local_8, 0));
    FUN_006e7a34(s32((param_1 + 4), 0), u8(DAT_00637e78), 1, DAT_fffffff0);
    FUN_006e7a04(s32((param_1 + 4), 0), ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
    local_14 = 0;
    if ((param_5 === 0)) {
      local_14 = 0x25;
    }
    else {
      if (((param_5 & 8) !== 0)) {
        local_14 = 8;
      }
      if (((param_5 & 2) !== 0)) {
        local_14 = (local_14 | 2);
      }
    }
    cchText = _strlen(param_3);
    FUN_006e7e74(s32((param_1 + 4), 0), param_3, cchText, param_4, local_14);
    FUN_006e7a6c(s32((param_1 + 4), 0), local_c);
    FUN_005dce29(param_2);
  }
  return;
}


 export function FUN_005e3feb (param_1, param_2, param_3, param_4, param_5)

 {
  let cchText;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawText_00638ee8);
  }
  else if ((param_1 !== 0)) {
    local_8 = FUN_005dcdf9(param_2);
    local_c = FUN_006e7a6c(s32((param_1 + 4), 0), s32(local_8, 0));
    FUN_006e7a34(s32((param_1 + 4), 0), u8(DAT_00637e78), 1, DAT_fffffff0);
    FUN_006e7a04(s32((param_1 + 4), 0), ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
    local_14 = 0x10;
    if ((param_5 === 0)) {
      local_14 = 0x11;
    }
    else if (((param_5 & 2) !== 0)) {
      local_14 = 0x12;
    }
    cchText = _strlen(param_3);
    FUN_006e7e74(s32((param_1 + 4), 0), param_3, cchText, param_4, local_14);
    FUN_006e7a6c(s32((param_1 + 4), 0), local_c);
    FUN_005dce29(param_2);
  }
  return;
}


 export function FUN_005e40fb (param_1, param_2, param_3, param_4, param_5)

 {
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 !== 0)) {
    FUN_006e7a34(s32((param_1 + 4), 0), u8(DAT_00637e78), 1, DAT_fffffff0);
    local_c = FUN_006e7a0c(0, 1, ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
    local_8 = FUN_006e7a6c(s32((param_1 + 4), 0), local_c);
    FUN_006e7a1c(s32((param_1 + 4), 0), param_2, param_3, 0);
    FUN_006e7a24(s32((param_1 + 4), 0), param_4, param_5);
    FUN_006e7a6c(s32((param_1 + 4), 0), local_8);
    FUN_006e7a94(local_c);
  }
  return;
}


 export function FUN_005e41ba (param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let hdc;
  let h;
  let hMem;
  let pvVar4;
  let local_50;
  let local_3c;
  let local_10;
  let local_c;
  let local_8;

  local_50 = 0;
  iVar2 = (s32(param_1, 2) - s32(param_1, 0));
  iVar3 = (s32(param_1, 3) - s32(param_1, 1));
  if ((iVar3 < 1)) iVar3 = (iVar3 < 1) {
    local_50 = 0;
  }
  else {
    hdc = FUN_006e79f8(0);
    if ((hdc === 0)) {
      FUN_005d225b(s_Error:_Unable_to_create_DC_in_MS_00638f38);
    }
    else {
      _memset(DAT_ffffffc4, 0, 0x34);
      local_3c = 0x28;
      local_3c = 1;
      local_3c = 0x10;
      local_3c = 1;
      local_3c = 3;
      local_3c = 0;
      local_3c = 0x7c;
      local_3c = 0;
      local_3c = 0;
      local_10 = 0x3e0;
      local_c = 0x1f;
      local_3c = FUN_005c55a0(iVar2);
      iVar1 = iVar3;
      if ((DAT_00638e18 !== -1)) {
        if ((DAT_00638e18 === 1)) {
          iVar1 = (-iVar3);
        }
        else {
          iVar1 = 1 * iVar3;
        }
      }
      local_3c = iVar1;
      h = FUN_006e7a30(hdc, DAT_ffffffc4, 0, DAT_fffffff8, 0, 0);
      if ((h === 0)) {
        FUN_005d225b(s_Error:_Unable_to_create_Bitmap_i_00638f08);
        FUN_006e7a08(hdc);
      }
      else {
        hMem = FUN_005dce4f(0x28);
        local_50 = FUN_006e7ae4(hMem);
        w32(local_50, 0, hMem);
        w32(local_50, 1, hdc);
        w32(local_50, 2, 0);
        w32(local_50, 3, h);
        w32(local_50, 8, FUN_005c55a0(iVar2) * 2);
        w32(local_50, 6, iVar2);
        w32(local_50, 7, iVar3);
        pvVar4 = FUN_006e7a6c(hdc, h);
        w32(local_50, 4, pvVar4);
        w32(local_50, 9, local_8);
        if ((iVar1 < 0)) bmiHeader biHeight {
          w32(local_50, 5, 1);
        }
        else {
          w32(local_50, 5, 0);
        }
        FUN_006e7a14(hdc, 1);
      }
    }
  }
  return local_50;
}


 export function FUN_005e43c5 (param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let hdc;
  let h;
  let hMem;
  let pvVar4;
  let local_48;
  let local_34;
  let local_8;

  local_48 = 0;
  iVar2 = (s32(param_1, 2) - s32(param_1, 0));
  iVar3 = (s32(param_1, 3) - s32(param_1, 1));
  if ((iVar3 < 1)) iVar3 = (iVar3 < 1) {
    local_48 = 0;
  }
  else {
    hdc = FUN_006e79f8(0);
    if ((hdc === 0)) {
      FUN_005d225b(s_Error:_Unable_to_create_DC_in_MS_00638f94);
    }
    else {
      _memset(DAT_ffffffcc, 0, 0x2c);
      local_34 = 0x28;
      local_34 = 1;
      local_34 = 0x18;
      local_34 = 1;
      local_34 = FUN_005c55a0(iVar2);
      iVar1 = iVar3;
      if ((DAT_00638e18 !== -1)) {
        if ((DAT_00638e18 === 1)) {
          iVar1 = (-iVar3);
        }
        else {
          iVar1 = 1 * iVar3;
        }
      }
      local_34 = iVar1;
      h = FUN_006e7a30(hdc, DAT_ffffffcc, 0, DAT_fffffff8, 0, 0);
      if ((h === 0)) {
        FUN_005d225b(s_Error:_Unable_to_create_Bitmap_i_00638f64);
        FUN_006e7a08(hdc);
      }
      else {
        hMem = FUN_005dce4f(0x28);
        local_48 = FUN_006e7ae4(hMem);
        w32(local_48, 0, hMem);
        w32(local_48, 1, hdc);
        w32(local_48, 2, 0);
        w32(local_48, 3, h);
        w32(local_48, 8, FUN_005c55a0(iVar2) * 3);
        w32(local_48, 6, iVar2);
        w32(local_48, 7, iVar3);
        pvVar4 = FUN_006e7a6c(hdc, h);
        w32(local_48, 4, pvVar4);
        w32(local_48, 9, local_8);
        if ((iVar1 < 0)) bmiHeader biHeight {
          w32(local_48, 5, 1);
        }
        else {
          w32(local_48, 5, 0);
        }
        FUN_006e7a14(hdc, 1);
      }
    }
  }
  return local_48;
}


 export function FUN_005e45b5 (param_1)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let hdc;
  let h;
  let hMem;
  let pvVar4;
  let local_48;
  let local_34;
  let local_8;

  local_48 = 0;
  iVar2 = (s32(param_1, 2) - s32(param_1, 0));
  iVar3 = (s32(param_1, 3) - s32(param_1, 1));
  if ((iVar3 < 1)) iVar3 = (iVar3 < 1) {
    local_48 = 0;
  }
  else {
    hdc = FUN_006e79f8(0);
    if ((hdc === 0)) {
      FUN_005d225b(s_Error:_Unable_to_create_DC_in_MS_00638ff0);
    }
    else {
      _memset(DAT_ffffffcc, 0, 0x2c);
      local_34 = 0x28;
      local_34 = 1;
      local_34 = 0x20;
      local_34 = 1;
      local_34 = FUN_005c55a0(iVar2);
      iVar1 = iVar3;
      if ((DAT_00638e18 !== -1)) {
        if ((DAT_00638e18 === 1)) {
          iVar1 = (-iVar3);
        }
        else {
          iVar1 = 1 * iVar3;
        }
      }
      local_34 = iVar1;
      h = FUN_006e7a30(hdc, DAT_ffffffcc, 0, DAT_fffffff8, 0, 0);
      if ((h === 0)) {
        FUN_005d225b(s_Error:_Unable_to_create_Bitmap_i_00638fc0);
        FUN_006e7a08(hdc);
      }
      else {
        hMem = FUN_005dce4f(0x28);
        local_48 = FUN_006e7ae4(hMem);
        w32(local_48, 0, hMem);
        w32(local_48, 1, hdc);
        w32(local_48, 2, 0);
        w32(local_48, 3, h);
        w32(local_48, 8, (FUN_005c55a0(iVar2) << 2));
        w32(local_48, 6, iVar2);
        w32(local_48, 7, iVar3);
        pvVar4 = FUN_006e7a6c(hdc, h);
        w32(local_48, 4, pvVar4);
        w32(local_48, 9, local_8);
        if ((iVar1 < 0)) bmiHeader biHeight {
          w32(local_48, 5, 1);
        }
        else {
          w32(local_48, 5, 0);
        }
        FUN_006e7a14(hdc, 1);
      }
    }
  }
  return local_48;
}


 export function FUN_005e47a5 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10)

 {
  let iVar1;
  let iVar2;
  let h;
  let align;
  let cchText;
  let lprc;
  let format;
  let local_18;
  let local_8;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawString_0063901c);
  }
  else {
    local_8 = FUN_005dcdf9(param_2);
    iVar1 = FUN_005c847f(param_2);
    iVar1 = (param_5 + iVar1);
    iVar2 = FUN_005c858e(param_2, param_3);
    FUN_006e7d90(DAT_ffffffe8, param_4, param_5, (param_4 + iVar2), iVar1);
    h = FUN_006e7a6c(s32((param_1 + 4), 0), s32(local_8, 0));
    FUN_006e7a04(s32((param_1 + 4), 0), ((param_10 << 16) | ((param_9 << 8) | param_8)));
    iVar1 = FUN_00407fc0(DAT_ffffffe8);
    iVar1 = (iVar1 / 2 | 0);
    iVar2 = FUN_00407f90(DAT_ffffffe8);
    iVar2 = (iVar2 / 2 | 0);
    FUN_006e7da4(DAT_ffffffe8, (-iVar2), (-iVar1));
    if (((param_7 & 1) !== 0)) {
      FUN_006e7da4(DAT_ffffffe8, iVar2, 0);
    }
    if (((param_7 & 4) !== 0)) {
      FUN_006e7da4(DAT_ffffffe8, 0, iVar1);
    }
    if (((param_7 & 8) !== 0)) {
      FUN_006e7da4(DAT_ffffffe8, 0, (-iVar1));
    }
    if (((param_7 & 2) !== 0)) {
      FUN_006e7da4(DAT_ffffffe8, (-iVar2), 0);
    }
    align = FUN_006e7a44(s32((param_1 + 4), 0));
    FUN_006e7a40(s32((param_1 + 4), 0), 1);
    FUN_006e7a1c(s32((param_1 + 4), 0), UNNAMED, UNNAMED, 0);
    FUN_006e7d48(DAT_ffffffe8, DAT_ffffffe8, param_6);
    format = 0;
    lprc = DAT_ffffffe8;
    cchText = _strlen(param_3);
    FUN_006e7e74(s32((param_1 + 4), 0), param_3, cchText, lprc, format);
    FUN_006e7a40(s32((param_1 + 4), 0), align);
    FUN_006e7a6c(s32((param_1 + 4), 0), h);
    FUN_005dce29(param_2);
  }
  return;
}


 export function FUN_005e49a0 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let puVar1;
  let h;
  let cchText;
  let local_10;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawString_00639040);
  }
  else if ((param_1 !== 0)) {
    puVar1 = FUN_005dcdf9(param_2);
    h = FUN_006e7a6c(s32((param_1 + 4), 0), s32(puVar1, 0));
    FUN_006e7a04(s32((param_1 + 4), 0), ((param_8 << 16) | ((param_7 << 8) | param_6)));
    local_10 = 0;
    if ((param_5 === 0)) {
      local_10 = 0x25;
    }
    else {
      if (((param_5 & 8) !== 0)) {
        local_10 = 8;
      }
      if (((param_5 & 2) !== 0)) {
        local_10 = (local_10 | 2);
      }
    }
    cchText = _strlen(param_3);
    FUN_006e7e74(s32((param_1 + 4), 0), param_3, cchText, param_4, local_10);
    FUN_006e7a6c(s32((param_1 + 4), 0), h);
    FUN_005dce29(param_2);
  }
  return;
}


 export function FUN_005e4aa6 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let puVar1;
  let h;
  let cchText;
  let local_10;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawText_00639064);
  }
  else if ((param_1 !== 0)) {
    puVar1 = FUN_005dcdf9(param_2);
    h = FUN_006e7a6c(s32((param_1 + 4), 0), s32(puVar1, 0));
    FUN_006e7a04(s32((param_1 + 4), 0), ((param_8 << 16) | ((param_7 << 8) | param_6)));
    local_10 = 0x10;
    if ((param_5 === 0)) {
      local_10 = 0x11;
    }
    else if (((param_5 & 2) !== 0)) {
      local_10 = 0x12;
    }
    cchText = _strlen(param_3);
    FUN_006e7e74(s32((param_1 + 4), 0), param_3, cchText, param_4, local_10);
    FUN_006e7a6c(s32((param_1 + 4), 0), h);
    FUN_005dce29(param_2);
  }
  return;
}


 export function FUN_005e4b9b (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let h;
  let h_00;

  if ((param_1 !== 0)) {
    h = FUN_006e7a0c(0, 1, ((param_8 << 16) | ((param_7 << 8) | param_6)));
    h_00 = FUN_006e7a6c(s32((param_1 + 4), 0), h);
    FUN_006e7a1c(s32((param_1 + 4), 0), param_2, param_3, 0);
    FUN_006e7a24(s32((param_1 + 4), 0), param_4, param_5);
    FUN_006e7a6c(s32((param_1 + 4), 0), h_00);
    FUN_006e7a94(h);
  }
  return;
}


 export function FUN_005e4c3f (param_1, param_2, param_3, param_4, param_5)

 {
  let hbr;
  let h;

  if ((param_1 !== 0)) {
    hbr = FUN_006e7a84(((param_5 << 16) | ((param_4 << 8) | param_3)));
    h = FUN_006e7a6c(s32((param_1 + 4), 0), hbr);
    FUN_006e7e7c(s32((param_1 + 4), 0), param_2, hbr);
    FUN_006e7a6c(s32((param_1 + 4), 0), h);
    FUN_006e7a94(hbr);
  }
  return;
}


 export function FUN_005e4cc8 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  let color;

  color = FUN_006e7a54(s32((param_1 + 4), 0), 0, 0);
  FUN_006e7a48(s32((param_1 + 4), 0), 0, 0, ((param_6 << 16) | ((param_5 << 8) | param_4)));
  uVar1 = s32(param_2, 0);
  FUN_006e7a48(s32((param_1 + 4), 0), 0, 0, color);
  return (uVar1 & ((1 << (param_3 & 0x1f)) - 1));
}


 export function FUN_005e4d60 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let local_18;

  iVar1 = FUN_005dce4f(0x6000);
  if ((iVar1 === 0)) {
    FUN_005d225b(s_Error:_Cannot_allocate_decompres_00639084);
    uVar2 = 0;
  }
  else {
    iVar3 = FUN_005dcdf9(iVar1);
    (local_18 < 0x1000) (local_18 = 0; local_18 = (local_18 < 0x1000); local_18 = (local_18 + 1)) {
      w16((iVar3 + ((local_18) << 16 >> 16) * 2), 0, 0xffff);
      w16(((iVar3 + 0x2000) + ((local_18) << 16 >> 16) * 2), 0, (u8(param_2) + local_18));
      w16(((iVar3 + 0x4000) + ((local_18) << 16 >> 16) * 2), 0, 1);
    }
    FUN_005e53f3(param_1, param_7, iVar3, param_5, param_6, param_4, param_3);
    FUN_005dce29(iVar1);
    FUN_005dce96(iVar1);
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_005e4e60 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let puVar4;

  iVar3 = param_7;
  if ((param_7 < 1)) {
    param_4 = ((param_8 + -1) - param_4);
    iVar3 = (-param_7);
  }
  puVar4 = (param_1 + (param_4 * iVar3 + param_3));
  uVar1 = (param_2 | (param_2 << 8));
  do {
    uVar2 = (param_5 >>> 2);
    if ((uVar2 !== 0)) {
      (uVar2 !== 0) (; uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
        w32(puVar4, 0, ((uVar1 | (param_2 << 0x10)) | (param_2 << 0x18)));
        puVar4 = (puVar4 + 1);
      }
    }
    if (((param_5 & 2) !== 0)) {
      w16(puVar4, 0, ((uVar1) & 0xFFFF));
      puVar4 = (puVar4 + 2);
    }
    if (((param_5 & 1) !== 0)) {
      _MEM[puVar4] = ((param_2) & 0xFF);
      puVar4 = (puVar4 + 1);
    }
    puVar4 = (puVar4 + (param_7 - param_5));
    param_6 = (param_6 + -1);
  } while ((param_6 !== 0)) return


 export function FUN_005e4ef8 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10)

 {
  let uVar1;
  let sVar2;
  let iVar3;
  let psVar4;

  iVar3 = param_9;
  if ((param_9 < 1)) {
    param_6 = ((param_10 + -1) - param_6);
    iVar3 = (-param_9);
  }
  psVar4 = (param_1 + (param_6 * iVar3 + param_5 * 2));
  sVar2 = (((((param_2 & 0xf8) >>> 1) << 8) | (param_4 >>> 3)) + (u8(param_3) & 0xf8) * 4);
  do {
    uVar1 = (param_7 * 2 >>> 2);
    if ((uVar1 !== 0)) {
      (uVar1 !== 0) (; uVar1 = (uVar1 !== 0); uVar1 = (uVar1 - 1)) {
        w32(psVar4, 0, ((sVar2 << 16) | sVar2));
        psVar4 = (psVar4 + 2);
      }
    }
    if (((param_7 * 2 & 2) !== 0)) {
      w16(psVar4, 0, sVar2);
      psVar4 = (psVar4 + 1);
    }
    psVar4 = (psVar4 + (param_9 + param_7 * -2));
    param_8 = (param_8 + -1);
  } while ((param_8 !== 0)) return


 export function FUN_005e4f9b (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let puVar4;
  let puVar5;
  let local_8;

  iVar3 = param_11;
  if ((param_11 < 1)) {
    param_4 = ((param_9 + -1) - param_4);
    iVar3 = (-param_11);
  }
  puVar4 = (param_1 + (param_4 * iVar3 + param_3));
  iVar3 = param_12;
  if ((param_12 < 1)) {
    param_6 = ((param_10 + -1) - param_6);
    iVar3 = (-param_12);
  }
  puVar5 = (param_2 + (param_6 * iVar3 + param_5));
  local_8 = param_8;
  do {
    uVar2 = (param_7 >>> 2);
    if ((uVar2 !== 0)) {
      (uVar2 !== 0) (; uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
        w32(puVar5, 0, s32(puVar4, 0));
        puVar4 = (puVar4 + 1);
        puVar5 = (puVar5 + 1);
      }
    }
    (uVar2 !== 0) (uVar2 = (param_7 & 3); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
      uVar1 = _MEM[puVar4];
      puVar4 = (puVar4 + 1);
      _MEM[puVar5] = uVar1;
      puVar5 = (puVar5 + 1);
    }
    puVar4 = (puVar4 + (param_11 - param_7));
    puVar5 = (puVar5 + (param_12 - param_7));
    local_8 = (local_8 + -1);
  } while ((local_8 !== 0)) return


 export function FUN_005e5056 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  let puVar5;
  let puVar6;
  let local_8;

  iVar3 = param_11;
  if ((param_11 < 1)) {
    param_4 = ((param_9 + -1) - param_4);
    iVar3 = (-param_11);
  }
  puVar5 = (param_1 + (param_4 * iVar3 + param_3 * 2));
  iVar3 = param_12;
  if ((param_12 < 1)) {
    param_6 = ((param_10 + -1) - param_6);
    iVar3 = (-param_12);
  }
  puVar6 = (param_2 + (param_6 * iVar3 + param_5 * 2));
  uVar4 = (param_11 + param_7 * -2);
  local_8 = param_8;
  do {
    uVar2 = (param_7 * 2 >>> 2);
    if ((uVar2 !== 0)) {
      (uVar2 !== 0) (; uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
        w32(puVar6, 0, s32(puVar5, 0));
        puVar5 = (puVar5 + 1);
        puVar6 = (puVar6 + 1);
      }
    }
    if (((uVar4 & 2) !== 0)) {
      uVar1 = s16(puVar5, 0);
      puVar5 = (puVar5 + 2);
      w16(puVar6, 0, uVar1);
      puVar6 = (puVar6 + 2);
    }
    puVar5 = (puVar5 + uVar4);
    puVar6 = (puVar6 + (param_12 + param_7 * -2));
    local_8 = (local_8 + -1);
  } while ((local_8 !== 0)) return


 export function FUN_005e511c (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12)

 {
  let uVar1;
  let iVar2;
  let puVar3;
  let puVar4;
  let puVar5;
  let puVar6;
  let local_8;

  puVar3 = (param_1 + (param_4 * param_11 + param_3));
  puVar5 = (param_2 + (param_6 * param_12 + param_5));
  local_8 = param_7;
  iVar2 = param_8;
  puVar6 = puVar5;
  puVar4 = puVar3;
  do {
    do {
      uVar1 = _MEM[puVar3];
      puVar3 = (puVar3 + param_11);
      _MEM[puVar5] = uVar1;
      puVar5 = (puVar5 + param_12);
      iVar2 = (iVar2 + -1);
    } while ((iVar2 !== 0)) puVar3 = (puVar4 + 1) puVar5 = (puVar6 + 1) local_8 = (local_8 + -1) iVar2 = param_8 puVar6 = puVar5 puVar4 = puVar3 return


 export function FUN_005e518e (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14, param_15, param_16)

 {
  let cVar1;
  let iVar2;
  let piVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let pcVar7;
  let pcVar8;
  let local_20;

  iVar5 = param_7;
  if ((param_7 < 1)) {
    param_6 = ((param_8 + -1) - param_6);
    iVar5 = (-param_7);
  }
  pcVar7 = (param_2 + (param_6 * iVar5 + param_5));
  local_20 = ((param_12 + param_16) * 4 + param_3);
  param_1 = (param_1 + 8);
  do {
    (param_14 < s32(local_20, 0)) (; param_14 = (param_14 < s32(local_20, 0)); param_14 = (param_14 + 1)) {
      param_1 = (param_1 + (s32((param_1 + -4), 0) + 8));
    }
    iVar5 = s32((param_1 + -8), 0);
    iVar2 = s32((param_1 + -4), 0);
    if ((iVar2 !== 0)) {
      iVar4 = param_9;
      pcVar8 = pcVar7;
      (s32(piVar3, 0) < iVar5) (piVar3 = ((param_11 + param_15) * 4 + param_3); piVar3 = s32(piVar3, 0);
          piVar3 = (piVar3 + 1)) {
        pcVar8 = (pcVar8 + 1);
        iVar4 = (iVar4 + -1);
      }
      if ((0 < iVar4)) {
        do {
          iVar6 = (s32(piVar3, 0) - iVar5);
          if ((iVar2 <= iVar6)) break; cVar1 = _MEM[(iVar6 + param_1)] {
            _MEM[pcVar8] = cVar1;
          }
          piVar3 = (piVar3 + 1);
          pcVar8 = (pcVar8 + 1);
          iVar4 = (iVar4 + -1);
        } while ((iVar4 !== 0)) pcVar7 = (pcVar7 + param_7) local_20 = (local_20 + 1) param_10 = (param_10 + -1) {
      return;
    }
  } while ( true );
}


 export function FUN_005e52bf (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10, param_11, param_12, param_13, param_14, param_15, param_16, param_17)

 {
  let iVar1;
  let piVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let puVar6;
  let puVar7;
  let local_20;

  iVar4 = param_7;
  if ((param_7 < 1)) {
    param_6 = ((param_8 + -1) - param_6);
    iVar4 = (-param_7);
  }
  puVar6 = (param_2 + (param_6 * iVar4 + param_5));
  local_20 = ((param_12 + param_16) * 4 + param_3);
  param_1 = (param_1 + 8);
  do {
    (param_14 < s32(local_20, 0)) (; param_14 = (param_14 < s32(local_20, 0)); param_14 = (param_14 + 1)) {
      param_1 = (param_1 + (s32((param_1 + -4), 0) + 8));
    }
    iVar4 = s32((param_1 + -8), 0);
    iVar1 = s32((param_1 + -4), 0);
    if ((iVar1 !== 0)) {
      iVar3 = param_9;
      puVar7 = puVar6;
      (s32(piVar2, 0) < iVar4) (piVar2 = ((param_11 + param_15) * 4 + param_3); piVar2 = s32(piVar2, 0);
          piVar2 = (piVar2 + 1)) {
        puVar7 = (puVar7 + 1);
        iVar3 = (iVar3 + -1);
      }
      if ((0 < iVar3)) {
        do {
          iVar5 = (s32(piVar2, 0) - iVar4);
          if ((iVar1 <= iVar5)) break; {
            _MEM[puVar7] = param_17;
          }
          piVar2 = (piVar2 + 1);
          puVar7 = (puVar7 + 1);
          iVar3 = (iVar3 + -1);
        } while ((iVar3 !== 0)) puVar6 = (puVar6 + param_7) local_20 = (local_20 + 1) param_10 = (param_10 + -1) {
      return;
    }
  } while ( true );
}


 export function FUN_005e53f3 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let pbVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let puVar11;
  let puVar12;
  let puVar13;
  let local_5c;
  let local_58;
  let local_54;
  let local_50;
  let local_4c;
  let local_44;
  let local_40;
  let local_24;
  let local_20;
  let local_14;
  let local_c;
  let local_8;

  iVar9 = (param_3 + 0x2000);
  iVar10 = (param_3 + 0x4000);
  local_40 = 0;
  local_5c = param_1;
  local_8 = param_1;
  local_24 = param_2;
  param_2 = (param_2 + (((param_5) & 0xFFFF) * ((param_6) & 0xFFFF) + 1));
  uVar3 = (2 << (((param_7) & 0xFF) & 0x1f));
  local_54 = (uVar3 + 4);
  uVar4 = (param_7 + 1);
  uVar5 = ((2 << (((uVar4) & 0xFF) & 0x1f)) - 2);
  local_44 = 0;
  local_14 = 0;
  local_50 = uVar4;
  local_20 = uVar5;
  local_c = uVar3;
 LAB_005e549a: :
  do {
    while ((uVar6 !== uVar3)) {
      if (((param_6 - param_4) !== 0)) local_40 = (local_40 - param_4) param_6 = (param_6 - param_4) {
        puVar12 = (local_24 + (((param_6 - param_4)) & 0xFFFF));
        puVar13 = puVar12;
        puVar11 = local_24;
        (uVar7 !== 0) (uVar7 = ((local_40) & 0xFFFF); local_24 = puVar12, uVar7 = (uVar7 !== 0); uVar7 = (uVar7 - 1)) {
          puVar11 = (puVar11 + -1);
          puVar13 = (puVar13 + -1);
          puVar13[-1] = puVar11[-1];
        }
      }
      pbVar1 = local_5c;
      (local_14 < local_50) (; local_5c = pbVar1, local_14 = (local_14 < local_50); local_14 = (local_14 + 8)) {
        if ((local_8 === pbVar1)) {
          local_5c = (pbVar1 + 1);
          local_8 = (pbVar1 + (u8(_MEM[pbVar1]) + 1));
        }
        pbVar1 = (local_5c + 1);
        local_44 = ((u8(_MEM[local_5c]) << (((local_14) & 0xFF) & 0x1f)) | local_44);
      }
      uVar6 = ((UNNAMED << 1) & local_20);
      if ((local_54 < uVar6)) {
        return;
      }
      local_44 = (local_44 >>> (((local_50) & 0xFF) & 0x1f));
      local_14 = (local_14 - local_50);
      if ((uVar6 === (uVar3 + 2))) {
        return;
      }
      if ((uVar6 !== uVar3)) break; local_54 = (uVar3 + 4) local_50 = uVar4 local_20 = uVar5 local_c = uVar3 local_4c = uVar6 {
      uVar7 = ((local_54) & 0xFFFF);
      w16((param_3 + uVar7), 0, local_c);
      w16((iVar10 + uVar7), 0, s16((iVar10 + ((local_c) & 0xFFFF)), 0));
      w16((iVar10 + uVar7), 0, (s16((iVar10 + uVar7), 0) + 1));
      if ((uVar6 < local_54)) {
        local_24 = (local_24 + ((s16((iVar10 + ((uVar6) & 0xFFFF)), 0)) & 0xFFFF));
        local_40 = (local_40 + s16((iVar10 + ((uVar6) & 0xFFFF)), 0));
        local_58 = local_24;
        if ((param_2 <= local_24)) {
          return;
        }
        do {
          puVar13 = (local_58 + -1);
          local_58[-1] = _MEM[(iVar9 + ((local_4c) & 0xFFFF))];
          uVar2 = s16((param_3 + ((local_4c) & 0xFFFF)), 0);
          if ((uVar2 === 0xffff)) break; puVar13 = (local_58 + -2) local_58[-2] = _MEM[(iVar9 + ((uVar2) & 0xFFFF))] local_4c = s16((param_3 + ((uVar2) & 0xFFFF)), 0) local_58 = puVar13 {
        iVar8 = (((s16((iVar10 + ((local_c) & 0xFFFF)), 0)) & 0xFFFF) + 1);
        local_24 = (local_24 + iVar8);
        local_58 = (local_24 + -1);
        local_40 = (local_40 + ((iVar8) & 0xFFFF));
        if ((param_2 <= local_24)) {
          return;
        }
        do {
          puVar13 = (local_58 + -1);
          local_58[-1] = _MEM[(iVar9 + ((local_c) & 0xFFFF))];
          uVar2 = s16((param_3 + ((local_c) & 0xFFFF)), 0);
          if ((uVar2 === 0xffff)) break; puVar13 = (local_58 + -2) local_58[-2] = _MEM[(iVar9 + ((uVar2) & 0xFFFF))] local_c = s16((param_3 + ((uVar2) & 0xFFFF)), 0) local_58 = puVar13 local_24[-1] = _MEM[puVar13] _MEM[(iVar9 + ((local_54) & 0xFFFF))] = _MEM[puVar13] local_54 = (local_54 + 2) local_c = uVar6 local_50 = (local_50 !== 0xc) {
        local_50 = (local_50 + 1);
        local_20 = (local_20 * 2 + 2);
      }
      goto LAB_005e549a;
    }
    local_24 = (local_24 + ((s16((iVar10 + ((uVar6) & 0xFFFF)), 0)) & 0xFFFF));
    local_40 = (local_40 + s16((iVar10 + ((uVar6) & 0xFFFF)), 0));
    local_58 = local_24;
    if ((param_2 <= local_24)) {
      return;
    }
    do {
      local_58[-1] = _MEM[(iVar9 + ((local_4c) & 0xFFFF))];
      uVar2 = s16((param_3 + ((local_4c) & 0xFFFF)), 0);
      local_c = uVar6;
      if ((uVar2 === 0xffff)) break; local_58[-2] = _MEM[(iVar9 + ((uVar2) & 0xFFFF))] local_4c = s16((param_3 + ((uVar2) & 0xFFFF)), 0) local_58 = (local_58 + -2)


 export function FUN_005e5869 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  let iVar2;
  let puVar3;

  if ((param_7 < 1)) {
    param_7 = (-param_7);
    param_5 = ((param_6 + -1) - param_5);
  }
  puVar3 = (param_1 + (param_5 * param_7 + param_4));
  uVar1 = (((param_3) & 0xFFFF) >>> 2);
  iVar2 = (((((param_3 >>> 0x10)) & 0xFFFF) << 16) | uVar1);
  if ((uVar1 !== 0)) {
    (iVar2 !== 0) (; iVar2 = (iVar2 !== 0); iVar2 = (iVar2 + -1)) {
      w32(puVar3, 0, ((((param_2 << 8) | param_2) << 16) | ((param_2 << 8) | param_2)));
      puVar3 = (puVar3 + 1);
    }
  }
  if (((param_3 & 2) !== 0)) {
    w16(puVar3, 0, ((param_2 << 8) | param_2));
    puVar3 = (puVar3 + 2);
  }
  if (((param_3 & 1) !== 0)) {
    _MEM[puVar3] = param_2;
  }
  return;
}


 export function FUN_005e58e7 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  let puVar2;

  iVar1 = param_7;
  if ((param_7 < 1)) {
    param_5 = ((param_6 + -1) - param_5);
    iVar1 = (-param_7);
  }
  puVar2 = (param_1 + (param_5 * iVar1 + param_4));
  do {
    _MEM[puVar2] = param_2;
    puVar2 = (puVar2 + param_7);
    param_3 = (param_3 + -1);
  } while ((param_3 !== 0)) return


 export function FUN_005e593a (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let uVar2;

  do {
    (uVar2 !== 0) (uVar2 = (param_3 >>> 2); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
      iVar1 = s32(param_1, 0);
      param_1 = (param_1 + 1);
      w32(param_2, 0, (iVar1 + ((((param_6 << 8) | param_6) << 16) | ((param_6 << 8) | param_6))));
      param_2 = (param_2 + 1);
    }
    (uVar2 !== 0) (uVar2 = (param_3 & 3); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
      iVar1 = s32(param_1, 0);
      param_1 = (param_1 + 1);
      _MEM[param_2] = (((iVar1) & 0xFF) + param_6);
      param_2 = (param_2 + 1);
    }
    param_2 = (param_2 + (param_5 - param_3));
    param_4 = (param_4 + -1);
  } while ((param_4 !== 0)) return


 export function FUN_005e59b3 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let uVar2;
  let piVar3;

  piVar3 = (param_2 + (param_4 + -1) * (-param_5));
  do {
    (uVar2 !== 0) (uVar2 = (param_3 >>> 2); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
      iVar1 = s32(param_1, 0);
      param_1 = (param_1 + 1);
      w32(piVar3, 0, (iVar1 + ((((param_6 << 8) | param_6) << 16) | ((param_6 << 8) | param_6))));
      piVar3 = (piVar3 + 1);
    }
    (uVar2 !== 0) (uVar2 = (param_3 & 3); uVar2 = (uVar2 !== 0); uVar2 = (uVar2 - 1)) {
      iVar1 = s32(param_1, 0);
      param_1 = (param_1 + 1);
      _MEM[piVar3] = (((iVar1) & 0xFF) + param_6);
      piVar3 = (piVar3 + 1);
    }
    piVar3 = (piVar3 + (param_5 - param_3));
    param_4 = (param_4 + -1);
  } while ((param_4 !== 0)) return


 export function FUN_005e5a39 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let piVar6;

  iVar4 = ((((param_6 << 8) | param_6) << 16) | ((param_6 << 8) | param_6));
  while ((-1 < param_4)) param_4 = (param_4 + -1) -1 = (-1 < param_4) {
    param_1 = (param_1 + 1);
    iVar5 = param_3;
    while ((0 < iVar5)) 0 = (0 < iVar5) {
      uVar1 = s8(((s32(param_1, 0)) & 0xFF));
      piVar6 = (param_1 + 1);
      if ((uVar1 < 0)) {
        uVar1 = (-uVar1);
        iVar5 = (iVar5 - ((uVar1) & 0xFFFF));
        param_1 = piVar6;
        (uVar3 !== 0) (uVar3 = (((uVar1 >>> 2)) & 0xFFFF); uVar3 = (uVar3 !== 0); uVar3 = (uVar3 - 1)) {
          iVar2 = s32(param_1, 0);
          param_1 = (param_1 + 1);
          w32(param_2, 0, (iVar2 + iVar4));
          param_2 = (param_2 + 1);
        }
        uVar3 = (((uVar1) & 0xFFFF) & 3);
        if (((uVar1 & 3) !== 0)) {
          do {
            iVar2 = s32(param_1, 0);
            param_1 = (param_1 + 1);
            _MEM[param_2] = (((iVar2) & 0xFF) + param_6);
            param_2 = (param_2 + 1);
            uVar3 = (uVar3 - 1);
          } while ((uVar3 !== 0)) {
        iVar2 = (((((_MEM[piVar6] << 8) | _MEM[piVar6]) << 16) | ((_MEM[piVar6] << 8) | _MEM[piVar6])) + iVar4);
        iVar5 = (iVar5 - ((uVar1) & 0xFFFF));
        param_1 = (param_1 + 2);
        (uVar3 !== 0) (uVar3 = (((uVar1 >>> 2)) & 0xFFFF); uVar3 = (uVar3 !== 0); uVar3 = (uVar3 - 1)) {
          w32(param_2, 0, iVar2);
          param_2 = (param_2 + 1);
        }
        uVar3 = (((uVar1) & 0xFFFF) & 3);
        if (((uVar1 & 3) !== 0)) {
          do {
            _MEM[param_2] = ((iVar2) & 0xFF);
            param_2 = (param_2 + 1);
            uVar3 = (uVar3 - 1);
          } while ((uVar3 !== 0)) param_2 = (param_2 + (param_5 - param_3)) return


 export function FUN_005e5b1e (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let piVar6;
  let piVar7;

  piVar7 = (param_2 + (param_4 + -1) * (-param_5));
  iVar4 = ((((param_6 << 8) | param_6) << 16) | ((param_6 << 8) | param_6));
  while ((-1 < param_4)) param_4 = (param_4 + -1) -1 = (-1 < param_4) {
    param_1 = (param_1 + 1);
    iVar5 = param_3;
    while ((0 < iVar5)) 0 = (0 < iVar5) {
      uVar1 = s8(((s32(param_1, 0)) & 0xFF));
      piVar6 = (param_1 + 1);
      if ((uVar1 < 0)) {
        uVar1 = (-uVar1);
        iVar5 = (iVar5 - ((uVar1) & 0xFFFF));
        param_1 = piVar6;
        (uVar3 !== 0) (uVar3 = (((uVar1 >>> 2)) & 0xFFFF); uVar3 = (uVar3 !== 0); uVar3 = (uVar3 - 1)) {
          iVar2 = s32(param_1, 0);
          param_1 = (param_1 + 1);
          w32(piVar7, 0, (iVar2 + iVar4));
          piVar7 = (piVar7 + 1);
        }
        uVar3 = (((uVar1) & 0xFFFF) & 3);
        if (((uVar1 & 3) !== 0)) {
          do {
            iVar2 = s32(param_1, 0);
            param_1 = (param_1 + 1);
            _MEM[piVar7] = (((iVar2) & 0xFF) + param_6);
            piVar7 = (piVar7 + 1);
            uVar3 = (uVar3 - 1);
          } while ((uVar3 !== 0)) {
        iVar2 = (((((_MEM[piVar6] << 8) | _MEM[piVar6]) << 16) | ((_MEM[piVar6] << 8) | _MEM[piVar6])) + iVar4);
        iVar5 = (iVar5 - ((uVar1) & 0xFFFF));
        param_1 = (param_1 + 2);
        (uVar3 !== 0) (uVar3 = (((uVar1 >>> 2)) & 0xFFFF); uVar3 = (uVar3 !== 0); uVar3 = (uVar3 - 1)) {
          w32(piVar7, 0, iVar2);
          piVar7 = (piVar7 + 1);
        }
        uVar3 = (((uVar1) & 0xFFFF) & 3);
        if (((uVar1 & 3) !== 0)) {
          do {
            _MEM[piVar7] = ((iVar2) & 0xFF);
            piVar7 = (piVar7 + 1);
            uVar3 = (uVar3 - 1);
          } while ((uVar3 !== 0)) piVar7 = (piVar7 + (param_5 - param_3)) return


 export function FUN_005e5c10 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let puVar6;
  let local_c;
  let local_8;

  local_c = ((s16(param_1, 0)) & 0xFFFF);
  param_1 = (param_1 + 1);
  iVar4 = ((((param_6 << 8) | param_6) << 16) | ((param_6 << 8) | param_6));
  do {
    while ((0xffff < uVar5)) {
      uVar5 = s16(param_1, 0);
      param_1 = (param_1 + 1);
      if ((0xffff < uVar5)) break; {
        local_c = (local_c - 1);
        if ((local_c === 0)) {
          return;
        }
      }
      else {
        param_2 = (param_2 + param_5 * (((-uVar5)) & 0xFFFF));
      }
    }
    local_8 = 0;
    do {
      while ((uVar1 < 0)) {
        if ((uVar5 < 0)) goto LAB_005e5d32; param_2 = (param_2 + u8(((s16(param_1, 0)) & 0xFF))) local_8 = (local_8 + u8(((s16(param_1, 0)) & 0xFF))) puVar6 = (param_1 + 1) uVar1 = s8(_MEM[(param_1 + 1)]) break; local_8 = (local_8 + ((uVar1) & 0xFFFF) * 2) param_1 = puVar6 uVar3 = (((uVar1 >>> 1)) & 0xFFFF) uVar3 = (uVar3 !== 0) uVar3 = (uVar3 - 1) {
          iVar2 = s32(param_1, 0);
          param_1 = (param_1 + 2);
          w32(param_2, 0, (iVar2 + iVar4));
          param_2 = (param_2 + 1);
        }
        if (((uVar1 & 1) !== 0)) {
          uVar1 = s16(param_1, 0);
          param_1 = (param_1 + 1);
          w16(param_2, 0, (uVar1 + ((param_6 << 8) | param_6)));
          param_2 = (param_2 + 2);
        }
        uVar5 = (uVar5 - 1);
        if ((uVar5 === 0)) goto LAB_005e5d32; uVar1 = (-uVar1) local_8 = (local_8 + ((uVar1) & 0xFFFF) * 2) iVar2 = (((s16(param_1, 1) << 16) | s16(param_1, 1)) + iVar4) param_1 = (param_1 + 2) uVar3 = (((uVar1 >>> 1)) & 0xFFFF) uVar3 = (uVar3 !== 0) uVar3 = (uVar3 - 1) {
        w32(param_2, 0, iVar2);
        param_2 = (param_2 + 1);
      }
      if (((uVar1 & 1) !== 0)) {
        w16(param_2, 0, ((iVar2) & 0xFFFF));
        param_2 = (param_2 + 2);
      }
      uVar5 = (uVar5 - 1);
    } while ((uVar5 !== 0)) LAB_005e5d32: param_2 = (param_2 + (param_5 - local_8)) local_c = (local_c - 1) {
      return;
    }
  } while ( true );
}


 export function FUN_005e5d4f (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let puVar6;
  let piVar7;
  let local_c;
  let local_8;

  piVar7 = (param_2 + (param_4 + -1) * (-param_5));
  local_c = ((s16(param_1, 0)) & 0xFFFF);
  param_1 = (param_1 + 1);
  iVar4 = ((((param_6 << 8) | param_6) << 16) | ((param_6 << 8) | param_6));
  do {
    while ((0xffff < uVar5)) {
      uVar5 = s16(param_1, 0);
      param_1 = (param_1 + 1);
      if ((0xffff < uVar5)) break; {
        local_c = (local_c - 1);
        if ((local_c === 0)) {
          return;
        }
      }
      else {
        piVar7 = (piVar7 + param_5 * (((-uVar5)) & 0xFFFF));
      }
    }
    local_8 = 0;
    do {
      while ((uVar1 < 0)) {
        if ((uVar5 < 0)) goto LAB_005e5e7e; piVar7 = (piVar7 + u8(((s16(param_1, 0)) & 0xFF))) local_8 = (local_8 + u8(((s16(param_1, 0)) & 0xFF))) puVar6 = (param_1 + 1) uVar1 = s8(_MEM[(param_1 + 1)]) break; local_8 = (local_8 + ((uVar1) & 0xFFFF) * 2) param_1 = puVar6 uVar3 = (((uVar1 >>> 1)) & 0xFFFF) uVar3 = (uVar3 !== 0) uVar3 = (uVar3 - 1) {
          iVar2 = s32(param_1, 0);
          param_1 = (param_1 + 2);
          w32(piVar7, 0, (iVar2 + iVar4));
          piVar7 = (piVar7 + 1);
        }
        if (((uVar1 & 1) !== 0)) {
          uVar1 = s16(param_1, 0);
          param_1 = (param_1 + 1);
          w16(piVar7, 0, (uVar1 + ((param_6 << 8) | param_6)));
          piVar7 = (piVar7 + 2);
        }
        uVar5 = (uVar5 - 1);
        if ((uVar5 === 0)) goto LAB_005e5e7e; uVar1 = (-uVar1) local_8 = (local_8 + ((uVar1) & 0xFFFF) * 2) iVar2 = (((s16(param_1, 1) << 16) | s16(param_1, 1)) + iVar4) param_1 = (param_1 + 2) uVar3 = (((uVar1 >>> 1)) & 0xFFFF) uVar3 = (uVar3 !== 0) uVar3 = (uVar3 - 1) {
        w32(piVar7, 0, iVar2);
        piVar7 = (piVar7 + 1);
      }
      if (((uVar1 & 1) !== 0)) {
        w16(piVar7, 0, ((iVar2) & 0xFFFF));
        piVar7 = (piVar7 + 2);
      }
      uVar5 = (uVar5 - 1);
    } while ((uVar5 !== 0)) LAB_005e5e7e: piVar7 = (piVar7 + (param_5 - local_8)) local_c = (local_c - 1) {
      return;
    }
  } while ( true );
}


 export function FUN_005e5ea0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0, 0);
  w32(in_ECX, 0x10, 0);
  w32(in_ECX, 0xf, 0);
  FUN_005e6450(0);
  return in_ECX;
}


 export function FUN_005e5ee0 ()

 {
  return;
}


 export function FUN_005e5ef6 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    if ((s32(in_ECX, 0xc) === 0)) {
      FUN_005e906b(s32(in_ECX, 0));
    }
    w32(in_ECX, 0, 0);
    FUN_005e6450(0);
    if ((s32(in_ECX, 0xf) !== 0)) {
      operator_delete(s32(in_ECX, 0xf));
      w32(in_ECX, 0xf, 0);
    }
  }
  return;
}


 export function FUN_005e5f78 (param_1, param_2)

 {
  let local_14;

  FUN_006e7d90(DAT_ffffffec, 0, 0, param_1, param_2);
  FUN_005e6018(DAT_ffffffec, 0);
  return;
}


 export function FUN_005e5fb4 (param_1)

 {
  FUN_005e6018(param_1, 0);
  return;
}


 export function FUN_005e5fda (param_1, param_2, param_3)

 {
  let local_14;

  FUN_006e7d90(DAT_ffffffec, 0, 0, param_1, param_2);
  FUN_005e6018(DAT_ffffffec, param_3);
  return;
}


 export function FUN_005e6018 (in_ECX, param_1, param_2)

 {
  let iVar1;
  let pvVar2;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_8 = 1;
  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005e5ef6();
  }
  if ((iVar1 === 0)) iVar1 = FUN_00407f90(param_1) iVar1 = (iVar1 === 0) iVar1 = FUN_00407fc0(param_1) iVar1 = (iVar1 === 0) {
    FUN_005e6450(0);
  }
  else {
    FUN_005e6450(param_1);
    iVar1 = FUN_005e8fb7(param_1, param_2);
    w32(in_ECX, 0, iVar1);
    if ((s32(in_ECX, 0) === 0)) {
      FUN_005dae6b(2, s_ERR_PORTALLOCFAILED_006390dc, s_D:\Ss\Smeds32\dd.cpp_006390c4, 0x76);
      local_8 = 0;
    }
    else {
      iVar1 = FUN_005e910b(s32(in_ECX, 0));
      w32(in_ECX, 3, iVar1);
      FUN_005e9783(s32(in_ECX, 0), param_1, DAT_00638b40);
      iVar1 = FUN_005e9150(s32(in_ECX, 0));
      w32(in_ECX, 0xe, iVar1);
      pvVar2 = operator_new((s32(in_ECX, 1) << 2));
      w32(in_ECX, 0xf, pvVar2);
      w32(s32(in_ECX, 0xf), 0, 0);
      (local_c < s32(in_ECX, 1)) (local_c = 1; local_c = (local_c < s32(in_ECX, 1)); local_c = (local_c + 1)) {
        w32((s32(in_ECX, 0xf) + local_c * 4), 0, (s32(((s32(in_ECX, 0xf) + -4) + local_c * 4), 0) + s32(in_ECX, 3)));
      }
    }
  }
  return local_8;
}


 export function FUN_005e6188 (in_ECX)

 {
  let cVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  iVar2 = FUN_005e924e(s32(in_ECX, 0));
  if ((iVar2 === 0)) {
    cVar1 = FUN_005ea5c5(s32(in_ECX, 0));
    if ((cVar1 !== 0)) {
      FUN_005e61e9();
    }
    iVar2 = 0;
  }
  return iVar2;
}


 export function FUN_005e61e9 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0xc) === 0)) {
    iVar1 = FUN_005e9091(s32(in_ECX, 0));
    if ((s32(in_ECX, 0x10) !== 0)) in_ECX = (in_ECX + 0x10) {
      in_ECX = (in_ECX + 0x10);
    }
  }
  else {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e6245 (param_1, param_2, param_3)

 {
  return ((((param_1 << 8) | (param_3 >>> 3)) & 0xf8ff) + (u8(param_2) & 0xfc) * 8);
}


 export function FUN_005e626c (param_1, param_2, param_3)

 {
  return (((((param_1 & 0xf8) >>> 1) << 8) | (param_3 >>> 3)) + (u8(param_2) & 0xf8) * 4);
}


 export function FUN_005e6297 (in_ECX, param_1, param_2)

 {
  let iVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005e5ef6();
  }
  FUN_005e6450(param_1);
  iVar1 = FUN_005e8eb0(param_2);
  w32(in_ECX, 0, iVar1);
  iVar1 = s32(in_ECX, 0);
  if ((iVar1 === 0)) {
    FUN_005dae6b(2, s_ERR_PORTALLOCFAILED_00639108, s_D:\Ss\Smeds32\dd.cpp_006390f0, 0xd5);
  }
  else {
    iVar2 = FUN_005e910b(s32(in_ECX, 0));
    w32(in_ECX, 3, iVar2);
    iVar2 = FUN_005e9150(s32(in_ECX, 0));
    w32(in_ECX, 0xe, iVar2);
    FUN_005e9783(s32(in_ECX, 0), param_1, DAT_00638b40);
  }
  return (!(iVar1 === 0));
}


 export function FUN_005e635f (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let pvVar2;
  // in_ECX promoted to parameter;
  let local_8;

  if ((param_1 !== 0)) {
    FUN_005e6450(param_2);
    w32(in_ECX, 0, param_1);
    w32(in_ECX, 0xd, param_3);
    iVar1 = FUN_005e910b(s32(in_ECX, 0));
    w32(in_ECX, 3, iVar1);
    iVar1 = FUN_005e9150(s32(in_ECX, 0));
    w32(in_ECX, 0xe, iVar1);
    FUN_005e9783(s32(in_ECX, 0), param_2, DAT_00638b40);
    w32(in_ECX, 0xc, 1);
    pvVar2 = operator_new((s32(in_ECX, 1) << 2));
    w32(in_ECX, 0xf, pvVar2);
    w32(s32(in_ECX, 0xf), 0, 0);
    (local_8 < s32(in_ECX, 1)) (local_8 = 1; local_8 = (local_8 < s32(in_ECX, 1)); local_8 = (local_8 + 1)) {
      w32((s32(in_ECX, 0xf) + local_8 * 4), 0, (s32(((s32(in_ECX, 0xf) + -4) + local_8 * 4), 0) + s32(in_ECX, 3)));
    }
  }
  return;
}


 export function FUN_005e6450 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0xc), 0, 0);
  w32((in_ECX + 0x34), 0, 0);
  if ((param_1 === 0)) {
    w32((in_ECX + 4), 0, 0);
    w32((in_ECX + 8), 0, 0);
    FUN_006e7d90((in_ECX + 0x20), 0, 0, 0, 0);
    FUN_006e7d90((in_ECX + 0x10), 0, 0, 0, 0);
  }
  else {
    w32((in_ECX + 4), 0, (s32(param_1, 3) - s32(param_1, 1)));
    w32((in_ECX + 8), 0, (s32(param_1, 2) - s32(param_1, 0)));
    FUN_006e7d90((in_ECX + 0x20), 0, 0, s32((in_ECX + 8), 0), s32((in_ECX + 4), 0));
    FUN_006e7d90((in_ECX + 0x10), 0, 0, s32((in_ECX + 8), 0), s32((in_ECX + 4), 0));
  }
  w32((in_ECX + 0x30), 0, 0);
  if ((s32((in_ECX + 0x3c), 0) !== 0)) {
    operator_delete(s32((in_ECX + 0x3c), 0));
    w32((in_ECX + 0x3c), 0, 0);
  }
  return;
}


 export function FUN_005e6566 (param_1)

 {
  FUN_005e5fb4(param_1);
  return;
}


 export function FUN_005e658a (in_ECX, param_1, param_2)

 {
  let iVar1;
  let puVar2;
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = 0;
  iVar1 = FUN_005e924e(s32(in_ECX, 0));
  if ((iVar1 !== 0)) {
    puVar2 = FUN_005e7028(param_1, param_2, iVar1);
    local_8 = _MEM[puVar2];
    FUN_005e92c9(s32(in_ECX, 0));
  }
  return local_8;
}


 export function FUN_005e65f1 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let puVar2;
  // in_ECX promoted to parameter;

  iVar1 = FUN_005e924e(s32(in_ECX, 0));
  if ((iVar1 !== 0)) {
    puVar2 = FUN_005e7028(param_1, param_2, iVar1);
    _MEM[puVar2] = param_3;
    FUN_005e92c9(s32(in_ECX, 0));
  }
  return;
}


 export function FUN_005e6651 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_338;
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
    FUN_005d2279(s_Error:_Bitmap_resource_not_found_0063911c, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00639158, s_D:\Ss\Smeds32\dd.cpp_00639140, 0x13a);
    uVar1 = 0;
  }
  else {
    local_c = FUN_005c5560(local_24);
    local_18 = s32((local_c + 4), 0);
    local_1c = s32((local_c + 8), 0);
    FUN_006e7d90(DAT_ffffffc8, 0, 0, local_18, local_1c);
    iVar2 = FUN_005e6566(DAT_ffffffc8);
    if ((iVar2 === 0)) {
      FUN_005c5520(local_24);
      uVar1 = 0;
    }
    else if ((s16((local_c + 0xe), 0) === 8)) {
      if ((s32((local_c + 0x10), 0) === 0)) {
        local_10 = (local_c + 0x28);
        if ((param_4 !== 0)) {
          local_28 = 0;
          (local_20 < (param_3 + param_2)) (local_20 = param_2; local_20 = (local_20 < (param_3 + param_2)); local_20 = (local_20 + 1)) {
            DAT_fffffcc8[local_28] = local_10[2];
            iVar2 = (local_28 + 1);
            local_28 = (local_28 + 1);
            DAT_fffffcc8[iVar2] = local_10[1];
            iVar2 = (local_28 + 1);
            local_28 = (local_28 + 1);
            DAT_fffffcc8[iVar2] = _MEM[local_10];
            local_28 = (local_28 + 1);
            local_10 = (local_10 + 4);
          }
          FUN_005e8990(param_2, param_3, DAT_fffffcc8);
        }
        local_8 = (local_c + 0x428);
        local_10 = FUN_005e6188();
        local_14 = ((s32((in_ECX + 4), 0) + -1) * s32((in_ECX + 0xc), 0) + local_10);
        (local_20 < local_1c) (local_20 = 0; local_20 = (local_20 < local_1c); local_20 = (local_20 + 1)) {
          FID_conflict:_memcpy(local_14, local_8, local_18);
          local_14 = (local_14 - s32((in_ECX + 0xc), 0));
          local_8 = (local_8 + local_18);
        }
        in_ECX = ~_Timevec(in_ECX);
        FUN_005c5520(local_24);
        uVar1 = 1;
      }
      else {
        FUN_005d2279(s_Error:_Bitmap_compression_not_su_00639198, param_1);
        uVar1 = 0;
      }
    }
    else {
      FUN_005d2279(s_Error:_Bitmap_resource_not_suppo_00639170, param_1);
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005e6893 (in_ECX, param_1, param_2, param_3, param_4)

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
    FUN_005d2279(s_Error:_GIF_resource_not_found_-_006391c4, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00639200, s_D:\Ss\Smeds32\dd.cpp_006391e8, 0x183);
    uVar1 = 0;
  }
  else {
    local_14 = FUN_005c5560(local_28);
    iVar2 = _strcmp(local_14, DAT_00639218);
    if ((iVar2 === 0)) {
      FUN_005d2279(s_Error:_Resource_is_not_a_GIF_-_0063921c, param_1);
      FUN_005c5580(local_28);
      FUN_005c5520(local_28);
      FUN_005dae6b(4, s_ERR_BADPICFORMAT_00639254, s_D:\Ss\Smeds32\dd.cpp_0063923c, 0x18e);
      uVar1 = 0;
    }
    else if (((local_14[0xa] & 0x80) === 0)) {
      FUN_005d2279(s_Error:_GIF_contains_no_global_co_00639268, param_1);
      FUN_005c5580(local_28);
      FUN_005c5520(local_28);
      FUN_005dae6b(4, s_ERR_BADPICFORMAT_006392ac, s_D:\Ss\Smeds32\dd.cpp_00639294, 0x197);
      uVar1 = 0;
    }
    else {
      uVar3 = (1 << ((local_14[0xa] & 7) + 1));
      local_10 = (local_14 + 0xd);
      if ((param_4 !== 0)) {
        if ((0x100 < (param_3 + param_2))) {
          param_3 = (0x100 - param_2);
        }
        if ((uVar3 <= param_3)) {
          param_3 = uVar3;
        }
        FUN_005e8990(param_2, param_3, local_10);
      }
      (_MEM[local_10] === 0) (local_10 = (local_14 + (uVar3 * 3 + 0xd)); local_10 = _MEM[local_10]; local_10 = (local_10 + 1)) {
      }
      if ((_MEM[local_10] === 0x21)) local_10 = _MEM[local_10] {
        local_c = (local_10 + 1);
        local_1c = FUN_005c54d0(s16((local_10 + 5), 0));
        w16((local_c + 4), 0, ((local_1c) & 0xFFFF));
        local_20 = FUN_005c54d0(s16((local_c + 6), 0));
        w16((local_c + 6), 0, ((local_20) & 0xFFFF));
        if (((local_c[8] & 0x80) !== 0)) {
          FUN_005d225b(s_Warning:_Skipping_local_color_ta_00639310);
        }
        FUN_006e7d90(DAT_ffffffc8, 0, 0, local_1c, local_20);
        FUN_005e6566(DAT_ffffffc8);
        local_18 = local_c[9];
        local_8 = (local_c + 0xa);
        uVar1 = FUN_005e6188();
        FUN_005e4d60(local_8, param_2, (((((s32((in_ECX + 0xc), 0) >>> 0x10)) & 0xFFFF) << 16) | u8(local_18)), s32((in_ECX + 0xc), 0), local_1c, local_20, uVar1);
        in_ECX = ~_Timevec(in_ECX);
        FUN_005c5580(local_28);
        FUN_005c5520(local_28);
        uVar1 = 1;
      }
      else {
        FUN_005d2279(s_Error:_GIF_Image_Block_not_found_006392c0, param_1);
        FUN_005c5580(local_28);
        FUN_005c5520(local_28);
        FUN_005dae6b(4, s_ERR_BADPICFORMAT_006392fc, s_D:\Ss\Smeds32\dd.cpp_006392e4, 0x1b1);
        uVar1 = 0;
      }
    }
  }
  return uVar1;
}


 export function FUN_005e6bc5 (in_ECX, param_1, param_2, param_3, param_4)

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
    FUN_005d2279(s_Error:_Picture_resource_not_foun_00639334, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00639374, s_D:\Ss\Smeds32\dd.cpp_0063935c, 0x1e0);
    uVar2 = 0;
  }
  else {
    local_c = FUN_005c5560(local_20);
    local_14 = FUN_005c5410(((s16(local_c, 0)) << 16 >> 16));
    local_18 = FUN_005c5410(((s16(local_c, 1)) << 16 >> 16));
    FUN_006e7d90(DAT_ffffffd0, 0, 0, local_14, local_18);
    iVar3 = FUN_005e6566(DAT_ffffffd0);
    if ((iVar3 === 0)) {
      FUN_005c5520(local_20);
      uVar2 = 0;
    }
    else {
      bVar1 = _MEM[(local_c + 5)];
      local_10 = (local_c + 3);
      if ((param_4 !== 0)) {
        FUN_005e8990(param_2, param_3, local_10);
      }
      local_8 = (local_c + ((u8(bVar1) + 1) * 3 + 6));
      uVar2 = FUN_005e6188();
      FUN_005e4d60(local_8, param_2, ((s16(local_c, 2)) & 0xFF), s32((in_ECX + 0xc), 0), local_14, local_18, uVar2);
      in_ECX = ~_Timevec(in_ECX);
      FUN_005c5580(local_20);
      FUN_005c5520(local_20);
      uVar2 = 1;
    }
  }
  return uVar2;
}


 export function FUN_005e6d4c (in_ECX, param_1)

 {
  let sVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  // in_ECX promoted to parameter;
  let local_3c;
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
    FUN_005d2279(s_Error:_Bitmap_resource_not_found_0063938c, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_006393c8, s_D:\Ss\Smeds32\dd.cpp_006393b0, 0x217);
    uVar3 = 0;
  }
  else {
    local_c = FUN_005c5560(local_24);
    local_18 = s32((local_c + 4), 0);
    local_1c = s32((local_c + 8), 0);
    FUN_006e7d90(DAT_ffffffc8, 0, 0, local_18, local_1c);
    iVar4 = FUN_005e6566(DAT_ffffffc8);
    if ((iVar4 === 0)) {
      FUN_005c5520(local_24);
      uVar3 = 0;
    }
    else {
      local_10 = FUN_005e6188();
      local_14 = ((s32((in_ECX + 4), 0) + -1) * s32((in_ECX + 0xc), 0) + local_10);
      sVar1 = s16((local_c + 0xe), 0);
      if ((sVar1 === 0x18)) sVar1 = (sVar1 !== 0x10) sVar1 = (sVar1 === 0x18) {
        local_8 = (local_c + 0x28);
        (local_20 < local_1c) (local_20 = 0; local_20 = (local_20 < local_1c); local_20 = (local_20 + 1)) {
          local_3c = local_14;
          (local_28 < local_18) (local_28 = 0; local_28 = (local_28 < local_18); local_28 = (local_28 + 1)) {
            uVar5 = (local_8 >>> 8);
            uVar2 = FUN_005e626c(((uVar5 << 8) | local_8[2]), ((uVar5 << 8) | local_8[1]), ((uVar5 << 8) | _MEM[local_8]));
            w16(local_3c, 0, uVar2);
            local_3c = (local_3c + 1);
            local_8 = (local_8 + 3);
          }
          local_14 = (local_14 - s32((in_ECX + 0xc), 0));
        }
      }
      in_ECX = ~_Timevec(in_ECX);
      FUN_005c5580(local_24);
      FUN_005c5520(local_24);
      uVar3 = 1;
    }
  }
  return uVar3;
}


 export function FUN_005e6f25 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005e9331(s32(in_ECX, 0), param_1, param_2, param_3);
  return;
}


 export function FUN_005e6f57 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d90((in_ECX + 0x10), s32((in_ECX + 0x20), 0), s32((in_ECX + 0x24), 0), s32((in_ECX + 0x28), 0), s32((in_ECX + 0x2c), 0));
  return;
}


 export function FUN_005e6f96 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d90((in_ECX + 0x10), s32(param_1, 0), s32(param_1, 1), s32(param_1, 2), s32(param_1, 3));
  FUN_006e7d48((in_ECX + 0x10), (in_ECX + 0x10), (in_ECX + 0x20));
  return;
}


 export function FUN_005e6ff1 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32(param_1, 0, s32((in_ECX + 0x10), 0));
  w32(param_1, 1, s32((in_ECX + 0x14), 0));
  w32(param_1, 2, s32((in_ECX + 0x18), 0));
  w32(param_1, 3, s32((in_ECX + 0x1c), 0));
  return;
}


 export function FUN_005e7028 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  return ((s32((s32((in_ECX + 0x3c), 0) + param_2 * 4), 0) + param_1) + param_3);
}


 export function FUN_005e7052 (in_ECX, param_1, param_2)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_18;
  let local_8;

  FUN_006e7d48(DAT_ffffffe8, param_1, (in_ECX + 4));
  iVar1 = FUN_00407f90(DAT_ffffffe8);
  if ((local_8 === -1)) iVar1 = FUN_00407fc0(DAT_ffffffe8) iVar1 = (iVar1 !== 0) local_8 = FUN_005e9783(s32(in_ECX, 0), DAT_ffffffe8, param_2) local_8 = (local_8 === -1) {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e70d7 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005e7052((in_ECX + 0x10), param_1);
  return;
}


 export function FUN_005e7102 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_1c;
  let local_c;
  let local_8;

  FUN_006e7d48(DAT_ffffffe4, param_1, (in_ECX + 4));
  iVar1 = FUN_00407f90(DAT_ffffffe4);
  if ((iVar1 !== 0)) iVar1 = FUN_00407fc0(DAT_ffffffe4) iVar1 = (iVar1 !== 0) {
    /* BRANCHIND */ ((in_ECX + 0xe) []) {
    case 1 :
      local_c = FUN_005e9331(s32(in_ECX, 0), param_2, param_3, param_4);
      break;
    case 2 :
      local_c = FUN_005e6245(param_2, param_3, param_4);
      local_c = (local_c & 0xffff);
      break;
    case 4 :
      local_c = FUN_005e626c(param_2, param_3, param_4);
      local_c = (local_c & 0xffff);
      break;
    case 8 :
      local_c = FUN_005e9331(s32(in_ECX, 0), param_2, param_3, param_4);
    }
    local_8 = FUN_005e9783(s32(in_ECX, 0), DAT_ffffffe4, local_c);
    if ((local_8 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e7257 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005e7102((in_ECX + 0x10), param_1, param_2, param_3);
  return;
}


 export function FUN_005e728a (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_30;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  FUN_006e7d48(DAT_ffffffe0, param_2, (in_ECX + 4));
  FUN_006e7d48(DAT_ffffffd0, param_3, (param_1 + 0x10));
  local_c = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) right left right left {
    local_c = (UNNAMED - UNNAMED);
  }
  local_10 = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) bottom top bottom top {
    local_10 = (UNNAMED - UNNAMED);
  }
  if ((local_10 !== 0)) local_10 = (local_10 !== 0) {
    uVar1 = FUN_005c5740(DAT_ffffffd0);
    local_8 = FUN_005e95a4(s32(in_ECX, 0), DAT_ffffffe0, uVar1);
    if ((local_8 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e7355 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let pCVar5;
  // in_ECX promoted to parameter;
  let local_30;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  FUN_006e7d48(DAT_ffffffe0, param_2, (in_ECX + 0x10));
  FUN_006e7d48(DAT_ffffffd0, param_3, (param_1 + 0x14));
  local_8 = FUN_005e6188();
  if ((local_8 !== 0)) {
    local_c = (UNNAMED - UNNAMED);
    if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) right left right left {
      local_c = (UNNAMED - UNNAMED);
    }
    local_10 = (UNNAMED - UNNAMED);
    if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) bottom top bottom top {
      local_10 = (UNNAMED - UNNAMED);
    }
    if ((local_10 !== 0)) local_10 = (local_10 !== 0) {
      uVar1 = GetCheckStyle(param_1);
      iVar2 = FUN_005e395a(uVar1);
      iVar3 = FUN_005c55d0();
      uVar4 = FUN_005c56a0((((-u8((iVar2 === 0))) & -2) + 1) * iVar3);
      pCVar5 = GetActiveView(param_1);
      uVar4 = FUN_005c5660(pCVar5, uVar4);
      uVar4 = FUN_005c5640(UNNAMED, UNNAMED, UNNAMED, UNNAMED, local_c, local_10, uVar4);
      FUN_005e4f9b(local_8, uVar4);
    }
    in_ECX = ~_Timevec(in_ECX);
  }
  return;
}


 export function FUN_005e747c (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005c5740(param_3);
  iVar2 = FUN_005e9455(s32(in_ECX, 0), param_2, uVar1);
  if ((iVar2 === -1)) {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e74c8 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_30;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  FUN_006e7d48(DAT_ffffffe0, param_2, (in_ECX + 4));
  FUN_006e7d48(DAT_ffffffd0, param_3, (param_1 + 0x10));
  local_c = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) right left right left {
    local_c = (UNNAMED - UNNAMED);
  }
  local_10 = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) bottom top bottom top {
    local_10 = (UNNAMED - UNNAMED);
  }
  if ((local_10 !== 0)) local_10 = (local_10 !== 0) {
    uVar1 = FUN_005c5740(DAT_ffffffd0);
    local_8 = FUN_005e965c(s32(in_ECX, 0), DAT_ffffffe0, uVar1);
    if ((local_8 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e7593 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005c5740(param_3);
  iVar2 = FUN_005e9506(s32(in_ECX, 0), param_2, uVar1);
  if ((iVar2 === -1)) {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e75df (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_006393e0);
  }
  else if ((s32(in_ECX, 0) !== 0)) {
    if (((param_4 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(PTR_DAT_00637e5c, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      iVar1 = FUN_005e9f8a(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, (param_2 + iVar1), (param_3 + iVar1), (in_ECX + 4), param_4, 0, 0, 0);
      if ((iVar1 === -1)) {
        FUN_005e61e9();
      }
    }
    iVar1 = FUN_005e997c(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3, (in_ECX + 4), param_4);
    if ((iVar1 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e76dd (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_18;
  let local_8;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_00639400);
  }
  else if ((s32(in_ECX, 0) !== 0)) {
    if (((param_3 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(PTR_DAT_00637e5c, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      local_18 = s32(param_2, 0);
      local_18 = s32(param_2, 1);
      local_18 = s32(param_2, 2);
      local_18 = s32(param_2, 3);
      FUN_006e7da4(DAT_ffffffe8, iVar1, iVar1);
      local_8 = FUN_005ea1dd(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, DAT_ffffffe8, param_3, 0, 0, 0);
      if ((local_8 === -1)) {
        FUN_005e61e9();
      }
    }
    local_8 = FUN_005e9bd7(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3);
    if ((local_8 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e77ed (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    if (((param_5 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(param_1, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      iVar1 = FUN_005e9f8a(s32(in_ECX, 0), s32(param_1, 0), param_2, (iVar1 + param_3), (iVar1 + param_4), (in_ECX + 4), param_5, 0, 0, 0);
      if ((iVar1 === -1)) {
        FUN_005e61e9();
      }
    }
    iVar1 = FUN_005e997c(s32(in_ECX, 0), s32(param_1, 0), param_2, param_3, param_4, (in_ECX + 4), param_5);
    if ((iVar1 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e78c6 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_18;
  let local_8;

  if ((s32(in_ECX, 0) !== 0)) {
    if (((param_4 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(param_1, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      local_18 = s32(param_3, 0);
      local_18 = s32(param_3, 1);
      local_18 = s32(param_3, 2);
      local_18 = s32(param_3, 3);
      FUN_006e7da4(DAT_ffffffe8, iVar1, iVar1);
      local_8 = FUN_005ea1dd(s32(in_ECX, 0), s32(param_1, 0), param_2, DAT_ffffffe8, param_4, 0, 0, 0);
      if ((local_8 === -1)) {
        FUN_005e61e9();
      }
    }
    local_8 = FUN_005e9bd7(s32(in_ECX, 0), s32(param_1, 0), param_2, param_3, param_4);
    if ((local_8 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e79b1 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_00639420);
  }
  else if ((iVar1 === -1)) iVar1 = FUN_005e9d31(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3) iVar1 = (iVar1 === -1) {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e7a30 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((iVar1 === -1)) iVar1 = FUN_005e9d31(s32(in_ECX, 0), s32(param_1, 0), param_2, param_3, param_4) iVar1 = (iVar1 === -1) {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e7a8e (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_00639440);
  }
  else if ((s32(in_ECX, 0) !== 0)) {
    if (((param_4 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(PTR_DAT_00637e5c, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      iVar1 = FUN_005e9f8a(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, (param_2 + iVar1), (param_3 + iVar1), (in_ECX + 4), param_4, 0, 0, 0);
      if ((iVar1 === -1)) {
        FUN_005e61e9();
      }
    }
    iVar1 = FUN_005e9f8a(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3, (in_ECX + 4), param_4, param_5, param_6, param_7);
    if ((iVar1 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e7b98 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_18;
  let local_8;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_00639460);
  }
  else if ((s32(in_ECX, 0) !== 0)) {
    if (((param_3 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(PTR_DAT_00637e5c, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      local_18 = s32(param_2, 0);
      local_18 = s32(param_2, 1);
      local_18 = s32(param_2, 2);
      local_18 = s32(param_2, 3);
      FUN_006e7da4(DAT_ffffffe8, iVar1, iVar1);
      local_8 = FUN_005ea1dd(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, DAT_ffffffe8, param_3, 0, 0, 0);
      if ((local_8 === -1)) {
        FUN_005e61e9();
      }
    }
    local_8 = FUN_005ea1dd(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3, param_4, param_5, param_6);
    if ((local_8 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e7cb4 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    if (((param_5 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(param_1, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      iVar1 = FUN_005e9f8a(s32(in_ECX, 0), s32(param_1, 0), param_2, (param_3 + iVar1), (param_4 + iVar1), (in_ECX + 4), param_5, 0, 0, 0);
      if ((iVar1 === -1)) {
        FUN_005e61e9();
      }
    }
    iVar1 = FUN_005e9f8a(s32(in_ECX, 0), s32(param_1, 0), param_2, param_3, param_4, (in_ECX + 4), param_5, param_6, param_7, param_8);
    if ((iVar1 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e7d99 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_18;
  let local_8;

  if ((s32(in_ECX, 0) !== 0)) {
    if (((param_4 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(param_1, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      local_18 = s32(param_3, 0);
      local_18 = s32(param_3, 1);
      local_18 = s32(param_3, 2);
      local_18 = s32(param_3, 3);
      FUN_006e7da4(DAT_ffffffe8, iVar1, iVar1);
      local_8 = FUN_005ea1dd(s32(in_ECX, 0), s32(param_1, 0), param_2, DAT_ffffffe8, param_4, 0, 0, 0);
      if ((local_8 === -1)) {
        FUN_005e61e9();
      }
    }
    local_8 = FUN_005ea1dd(s32(in_ECX, 0), s32(param_1, 0), param_2, param_3, param_4, param_5, param_6, param_7);
    if ((local_8 === -1)) {
      FUN_005e61e9();
    }
  }
  return;
}


 export function FUN_005e7e90 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_00639480);
  }
  else if ((iVar1 === -1)) iVar1 = FUN_005ea32f(s32(in_ECX, 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3, param_4, param_5, param_6) iVar1 = (iVar1 === -1) {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e7f1b (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((iVar1 === -1)) iVar1 = FUN_005ea32f(s32(in_ECX, 0), s32(param_1, 0), param_2, param_3, param_4, param_5, param_6, param_7) iVar1 = (iVar1 === -1) {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e7f85 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((iVar1 === -1)) in_ECX = (in_ECX + 4) param_3 = (param_3 < s32(in_ECX, 6)) param_1 = (param_1 < s32(in_ECX, 6)) in_ECX = (in_ECX + 5) in_ECX = (in_ECX + 5) param_2 = (param_2 < s32(in_ECX, 7)) param_4 = (param_4 < s32(in_ECX, 7)) in_ECX = s32(in_ECX, 0) iVar1 = FUN_005e9e87(s32(in_ECX, 0), param_1, param_2, param_3, param_4) iVar1 = (iVar1 === -1) {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e806d (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005e7f85(s32(param_1, 0), s32(param_1, 1), s32(param_1, 2), s32(param_1, 1));
    FUN_005e7f85(s32(param_1, 2), s32(param_1, 1), s32(param_1, 2), s32(param_1, 3));
    FUN_005e7f85(s32(param_1, 2), s32(param_1, 3), s32(param_1, 0), s32(param_1, 3));
    FUN_005e7f85(s32(param_1, 0), s32(param_1, 3), s32(param_1, 0), s32(param_1, 1));
  }
  return;
}


 export function FUN_005e8122 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((iVar1 === -1)) in_ECX = (in_ECX + 4) param_3 = (param_3 < s32(in_ECX, 6)) param_1 = (param_1 < s32(in_ECX, 6)) in_ECX = (in_ECX + 5) in_ECX = (in_ECX + 5) param_2 = (param_2 < s32(in_ECX, 7)) param_4 = (param_4 < s32(in_ECX, 7)) in_ECX = s32(in_ECX, 0) iVar1 = FUN_005ea47d(s32(in_ECX, 0), param_1, param_2, param_3, param_4, param_5, param_6, param_7) iVar1 = (iVar1 === -1) {
    FUN_005e61e9();
  }
  return;
}


 export function FUN_005e8216 (in_ECX, param_1, param_2, param_3, param_4)

 {
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005e8122(s32(param_1, 0), s32(param_1, 1), s32(param_1, 2), s32(param_1, 1), param_2, param_3, param_4);
    FUN_005e8122(s32(param_1, 2), s32(param_1, 1), s32(param_1, 2), s32(param_1, 3), param_2, param_3, param_4);
    FUN_005e8122(s32(param_1, 2), s32(param_1, 3), s32(param_1, 0), s32(param_1, 3), param_2, param_3, param_4);
    FUN_005e8122(s32(param_1, 0), s32(param_1, 3), s32(param_1, 0), s32(param_1, 1), param_2, param_3, param_4);
  }
  return;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* __thiscall */ /* CReObject::CReObject(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function CReObject (this)

 {
  w32(this, 0, 0);
  w32((this + 0x20), 0, 0);
  w32((this + 0x24), 0, 0);
  w32((this + 0x28), 0, 0);
  return this;
}


 export function FUN_005e833b (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005e8c29(s32(in_ECX, 0));
    w32(in_ECX, 0, 0);
  }
  if ((s32(in_ECX, 8) !== 0)) {
    FUN_005dce96(s32(in_ECX, 8));
  }
  if ((s32(in_ECX, 9) !== 0)) {
    FUN_005dce96(s32(in_ECX, 9));
  }
  if ((s32(in_ECX, 0xa) !== 0)) {
    FUN_005dce96(s32(in_ECX, 0xa));
  }
  return;
}


 export function FUN_005e83c8 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005e8c29(s32(in_ECX, 0));
    w32(in_ECX, 0, 0);
  }
  return;
}


 export function FUN_005e8401 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;
  let local_610;
  let local_60c;
  let local_30c;
  let local_c;
  let local_8;

  if ((0x100 < (param_2 + param_1))) {
    param_2 = (0x100 - param_1);
  }
  FUN_005e8d58(s32(in_ECX, 0), param_1, param_2, DAT_fffffcf4);
  if ((param_3 < 1)) {
    local_c = DAT_fffff9f4;
    local_610 = (DAT_fffffcf4 + param_3 * -3);
    (local_8 < (param_3 + param_2)) (local_8 = 0; local_8 = (local_8 < (param_3 + param_2)); local_8 = (local_8 + 1)) {
      _MEM[local_c] = _MEM[local_610];
      local_c = (local_c + 1);
      local_c[1] = local_610[1];
      local_c = (local_c + 1);
      local_c[1] = local_610[2];
      local_610 = (local_610 + 3);
      local_c = (local_c + 1);
    }
    local_610 = DAT_fffffcf4;
    (((-local_8) !== param_3) && (local_8 <= (-param_3))) (local_8 = 0; local_8 = (-local_8); local_8 = (local_8 + 1)) {
      _MEM[local_c] = _MEM[local_610];
      local_c = (local_c + 1);
      local_c[1] = local_610[1];
      local_c = (local_c + 1);
      local_c[1] = local_610[2];
      local_610 = (local_610 + 3);
      local_c = (local_c + 1);
    }
  }
  else {
    local_610 = (DAT_fffffcf4 + param_3 * 3);
    local_c = DAT_fffff9f4;
    (local_8 < param_3) (local_8 = 0; local_8 = (local_8 < param_3); local_8 = (local_8 + 1)) {
      _MEM[local_c] = _MEM[local_610];
      local_c = (local_c + 1);
      local_c[1] = local_610[1];
      local_c = (local_c + 1);
      local_c[1] = local_610[2];
      local_610 = (local_610 + 3);
      local_c = (local_c + 1);
    }
    local_610 = DAT_fffffcf4;
    (local_8 < (param_2 - param_3)) (local_8 = 0; local_8 = (local_8 < (param_2 - param_3)); local_8 = (local_8 + 1)) {
      _MEM[local_c] = _MEM[local_610];
      local_c = (local_c + 1);
      local_c[1] = local_610[1];
      local_c = (local_c + 1);
      local_c[1] = local_610[2];
      local_610 = (local_610 + 3);
      local_c = (local_c + 1);
    }
  }
  FUN_005e8c54(s32(in_ECX, 0), param_1, param_2, DAT_fffff9f4);
  return;
}


 export function FUN_005e866c (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32(in_ECX, 1, param_3);
  w32(in_ECX, 2, param_1);
  w32(in_ECX, 3, param_2);
  uVar1 = FUN_005dce4f(param_2 * 3);
  w32(in_ECX, 0xa, uVar1);
  uVar1 = FUN_005dcdf9(s32(in_ECX, 0xa));
  FUN_005e8d58(s32(in_ECX, 0), param_1, param_2, uVar1);
  FUN_005dce29(s32(in_ECX, 0xa));
  return;
}


 export function FUN_005e86f2 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  // in_ECX promoted to parameter;

  _MEM[(in_ECX + 0x1c)] = param_4;
  _MEM[(in_ECX + 0x1d)] = param_5;
  _MEM[(in_ECX + 0x1e)] = param_6;
  FUN_005e866c(param_1, param_2, param_3);
  return;
}


 export function FUN_005e8739 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005dcdf9(s32((in_ECX + 0x28), 0));
  FUN_005e8990(s32((in_ECX + 8), 0), s32((in_ECX + 0xc), 0), uVar1);
  FUN_005dce29(s32((in_ECX + 0x28), 0));
  uVar1 = FUN_005dce96(s32((in_ECX + 0x28), 0));
  w32((in_ECX + 0x28), 0, uVar1);
  return;
}


 export function FUN_005e87a2 (in_ECX, param_1)

 {
  let cVar1;
  let iVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_31c;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((s32(in_ECX, 1) < param_1)) in_ECX = (in_ECX + 1) {
    FUN_005d2279(s_Color_Scale_factor_out_of_range_006394a0, param_1);
  }
  else {
    local_10 = (s32(in_ECX, 1) - param_1);
    local_c = local_10 * (u8(_MEM[(in_ECX + 7)]) / s32(in_ECX, 1) | 0);
    local_1c = local_10 * (u8(_MEM[(in_ECX + 0x1d)]) / s32(in_ECX, 1) | 0);
    local_8 = local_10 * (u8(_MEM[(in_ECX + 0x1e)]) / s32(in_ECX, 1) | 0);
    iVar3 = FUN_005dcdf9(s32(in_ECX, 0xa));
    local_18 = 0;
    (local_14 < s32(in_ECX, 3) * 3) (local_14 = 0; local_14 = (local_14 < s32(in_ECX, 3) * 3); local_14 = (local_14 + 3)) {
      cVar1 = ((param_1) & 0xFF);
      DAT_fffffce4[local_18] = ((((u8(_MEM[(local_14 + iVar3)]) / s32(in_ECX, 1) | 0)) & 0xFF) * cVar1 + ((local_c) & 0xFF));
      iVar2 = (local_18 + 1);
      local_18 = (local_18 + 1);
      DAT_fffffce4[iVar2] = ((((u8(_MEM[((local_14 + 1) + iVar3)]) / s32(in_ECX, 1) | 0)) & 0xFF) * cVar1 + ((local_1c) & 0xFF));
      iVar2 = (local_18 + 1);
      local_18 = (local_18 + 1);
      DAT_fffffce4[iVar2] = ((((u8(_MEM[((local_14 + 2) + iVar3)]) / s32(in_ECX, 1) | 0)) & 0xFF) * cVar1 + ((local_8) & 0xFF));
      local_18 = (local_18 + 1);
    }
    FUN_005e8c54(s32(in_ECX, 0), s32(in_ECX, 2), s32(in_ECX, 3), DAT_fffffce4);
    FUN_005dce29(s32(in_ECX, 0xa));
  }
  return;
}


 export function FUN_005e8990 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005e8c54(s32(in_ECX, 0), param_1, param_2, param_3);
  return;
}


 /* /*  */ /* WARNING: */ /* Globals */ /* starting */ /* with */ /* '_' */ /* overlap */ /* smaller */ /* symbols */ /* at */ /* the */ /* same */ /* address */ /*  */ */

 export function FUN_005e89d0 ()

 {
  let iVar1;
  let uVar2;
  let local_2c;

  local_2c = 0xb;
  local_2c = FUN_005ef6cb;
  local_2c = 8;
  local_2c = 0;
  local_2c = DAT_006e4ff0;
  local_2c = 0;
  local_2c = FUN_006e7dac(0, 0x7f00);
  local_2c = 0;
  local_2c = 0;
  local_2c = s_MSDirectWindow_006394c4;
  FUN_006e7da8(DAT_ffffffd4);
  iVar1 = DirectDrawCreate(0, DAT_006394c0, 0);
  if ((iVar1 === 0)) {
    _DAT_006e50e8 = 0x13c;
    _DAT_006e5228 = 0x13c;
    DAT_006394c0 = s32(DAT_006394c0, 0);
    if (((DAT_006e50ec & 0x40) === 0)) {
      FUN_005d225b(s_Direct_Draw>_Doesn't_Supports_Ha_006394f8);
    }
    if (((DAT_006e50ee & 0x40) === 0)) {
      FUN_005d225b(s_Direct_Draw>_Doesn't_Supports_Co_00639524);
    }
    if (((DAT_006e50ef & 4) === 0)) {
      FUN_005d225b(s_Direct_Draw>_Doesn't_Supports_Co_0063954c);
    }
    if (((DAT_006e50ef & 8) !== 0)) {
      FUN_005d225b(s_Direct_Draw>_Device_is_Bank_Swit_00639578);
    }
    uVar2 = 1;
  }
  else {
    FUN_005d225b(s_Error:_DirectDrawInitialize_Fail_006394d4);
    uVar2 = 0;
  }
  return uVar2;
}


 export function FUN_005e8b04 ()

 {
  if ((DAT_006394c0 !== 0)) {
    DAT_006394c0 = s32(DAT_006394c0, 0);
    DAT_006394c0 = 0;
    FUN_006e7ec4(s_MSDirectWindow_006395a0, DAT_006e4ff0);
  }
  return;
}


 export function FUN_005e8b54 (param_1, param_2, param_3)

 {
  let local_410;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_006394c0 === 0)) {
    local_8 = 0;
  }
  else {
    (local_c < param_2) (local_c = 0; local_c = (local_c < param_2); local_c = (local_c + 1)) {
      DAT_fffffbf0[(param_1 + local_c) * 4] = _MEM[param_3];
      DAT_fffffbf0[((param_1 + local_c) * 4 + 1)] = param_3[1];
      DAT_fffffbf0[((param_1 + local_c) * 4 + 2)] = param_3[2];
      param_3 = (param_3 + 3);
    }
    local_10 = s32((s32(DAT_006394c0, 0) + 0x14), 0)(DAT_006394c0, 0x44, DAT_fffffbf0, DAT_fffffff8, 0);
    if ((local_10 !== 0)) {
      FUN_005d2279(s_DD->CreatePalette_error_006395b0, (local_10 & 0xffff));
      local_8 = 0;
    }
  }
  return local_8;
}


 export function FUN_005e8c29 (param_1)

 {
  if ((param_1 !== 0)) {
    param_1 = s32(param_1, 0);
  }
  return;
}


 export function FUN_005e8c54 (param_1, param_2, param_3, param_4)

 {
  let local_40c;
  let local_c;
  let local_8;

  if ((DAT_006394c0 !== 0)) DAT_006394c0 = (DAT_006394c0 !== 0) {
    (local_8 < param_3) (local_8 = 0; local_8 = (local_8 < param_3); local_8 = (local_8 + 1)) {
      DAT_fffffbf4[local_8 * 4] = _MEM[param_4];
      DAT_fffffbf4[(local_8 * 4 + 1)] = param_4[1];
      DAT_fffffbf4[(local_8 * 4 + 2)] = param_4[2];
      param_4 = (param_4 + 3);
    }
    local_c = s32((s32(DAT_006394c0, 0) + 0x58), 0)(DAT_006394c0, 1, 0);
    if ((local_c !== 0)) {
      FUN_005d2279(s_DD->SetPalette_WaitForBlank_erro_006395c8, (local_c & 0xffff));
    }
    local_c = s32((s32(param_1, 0) + 0x18), 0)(param_1, 0, param_2, param_3, DAT_fffffbf4);
    if ((local_c !== 0)) {
      FUN_005d2279(s_DDPal->SetEntrieserror_006395ec, (local_c & 0xffff));
    }
  }
  return;
}


 export function FUN_005e8d58 (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let local_408;
  let local_8;

  if ((iVar1 === 0)) iVar1 = s32((s32(param_1, 0) + 0x10), 0)(param_1, 0, param_2, param_3, DAT_fffffbf8) iVar1 = (iVar1 === 0) {
    (local_8 < param_3) (local_8 = 0; local_8 = (local_8 < param_3); local_8 = (local_8 + 1)) {
      _MEM[param_4] = DAT_fffffbf8[(param_2 + local_8) * 4];
      param_4[1] = DAT_fffffbf8[((param_2 + local_8) * 4 + 1)];
      param_4[2] = DAT_fffffbf8[((param_2 + local_8) * 4 + 2)];
      param_4 = (param_4 + 3);
    }
  }
  return;
}


 export function FUN_005e8e06 (param_1, param_2)

 {
  if ((param_2 !== 0)) param_2 = (param_2 !== 0) {
    param_1 = s32(param_1, 0);
  }
  return;
}


 export function FUN_005e8e4f (param_1)

 {
  let uVar1;
  let local_8;

  local_8 = 0;
  if ((param_1 === 0)) {
    local_8 = 0;
  }
  else {
    uVar1 = s32((s32(param_1, 0) + 0x50), 0)(param_1, DAT_fffffff8);
    if ((uVar1 !== 0)) {
      FUN_005d2279(s_GetPalette_Failed_00639604, (uVar1 & 0xffff));
    }
  }
  return local_8;
}


 export function FUN_005e8eb0 (param_1)

 {
  let uVar1;
  let local_74;
  let local_70;
  let local_6c;
  let local_5c;
  let local_8;

  if ((DAT_006394c0 === 0)) {
    local_74 = 0;
  }
  else {
    local_70 = 0x6c;
    local_6c = 1;
    local_8 = 0x200;
    if ((param_1 !== 0)) {
      local_6c = 0x21;
      local_8 = 0x218;
    }
    local_5c = param_1;
    uVar1 = s32((s32(DAT_006394c0, 0) + 0x18), 0)(DAT_006394c0, DAT_ffffff90, DAT_ffffff8c, 0);
    if ((uVar1 !== 0)) {
      FUN_005d2279(s_DD->CreatePrimarySurface_failed_00639618, (uVar1 & 0xffff));
      local_74 = 0;
    }
  }
  return local_74;
}


 export function FUN_005e8f4b (param_1)

 {
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    local_10 = 0;
  }
  else {
    local_8 = 4;
    local_c = s32((s32(param_1, 0) + 0x30), 0)(param_1, DAT_fffffff8, DAT_fffffff0);
    if ((local_c !== 0)) {
      FUN_005d2279(s_DD->GetAttachedSurface_failed_00639638, (local_c & 0xffff));
      local_10 = 0;
    }
  }
  return local_10;
}


 export function FUN_005e8fb7 (param_1, param_2)

 {
  let uVar1;
  let local_74;
  let local_70;
  let local_6c;
  let local_68;
  let local_64;
  let local_8;

  if ((DAT_006394c0 === 0)) {
    local_74 = 0;
  }
  else {
    local_70 = 0x6c;
    local_6c = 7;
    local_8 = 0x40;
    if ((param_2 !== 0)) {
      local_8 = 0x840;
    }
    local_64 = FUN_00407f90(param_1);
    local_68 = FUN_00407fc0(param_1);
    uVar1 = s32((s32(DAT_006394c0, 0) + 0x18), 0)(DAT_006394c0, DAT_ffffff90, DAT_ffffff8c, 0);
    if ((uVar1 !== 0)) {
      FUN_005d2279(s_DD->CreateOffscreenSurface_faile_00639658, (uVar1 & 0xffff));
      local_74 = 0;
    }
  }
  return local_74;
}


 export function FUN_005e906b (param_1)

 {
  if ((param_1 !== 0)) {
    param_1 = s32(param_1, 0);
  }
  return;
}


 export function FUN_005e9091 (param_1)

 {
  let uVar1;
  let iVar2;
  let uVar3;

  if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    iVar2 = s32((s32(param_1, 0) + 0x60), 0)(param_1);
    if ((iVar2 === 0)) {
      uVar1 = 0;
    }
    else {
      uVar3 = s32((s32(param_1, 0) + 0x6c), 0)(param_1);
      if ((uVar3 === 0)) {
        uVar1 = 1;
      }
      else {
        FUN_005d2279(s_Restore_Surface_failed_0063967c, (uVar3 & 0xffff));
        uVar1 = 0;
      }
    }
  }
  return uVar1;
}


 export function FUN_005e910b (param_1)

 {
  let local_70;
  let local_6c;
  let local_60;

  if ((param_1 === 0)) {
    local_60 = 0;
  }
  else {
    local_70 = 0x6c;
    local_6c = 8;
    param_1 = s32(param_1, 0);
  }
  return local_60;
}


 export function FUN_005e9150 (param_1)

 {
  let iVar1;
  let local_28;
  let local_24;
  let local_18;
  let local_13;
  let local_10;
  let local_c;

  local_24 = 0x20;
  iVar1 = s32((s32(param_1, 0) + 0x54), 0)(param_1, DAT_ffffffdc);
  if ((iVar1 === 0)) {
    if ((local_18 === 8)) {
      local_28 = 1;
    }
    else if ((local_18 === 0x10)) {
      if (((local_c & 0x1f) === 0)) local_10 = (local_10 & 0x3e0) local_c = (local_c & 0x1f) {
        if (((local_c & 0x1f) === 0)) local_10 = (local_10 & 0x7e0) local_c = (local_c & 0x1f) {
          FUN_005d225b(s_Unknown_16-bit_pixel_format_00639694);
        }
        else {
          local_28 = 2;
        }
      }
      else {
        local_28 = 4;
      }
    }
    else if ((local_18 === 0x18)) {
      local_28 = 8;
    }
    else {
      FUN_005d225b(s_Unknown_pixel_format_006396b0);
    }
  }
  return local_28;
}


 export function FUN_005e924e (param_1)

 {
  let uVar1;
  let local_70;
  let local_4c;

  if ((param_1 === 0)) {
    local_4c = 0;
  }
  else {
    local_70 = 0x6c;
    uVar1 = s32((s32(param_1, 0) + 0x64), 0)(param_1, 0, DAT_ffffff90, 1, 0);
    if ((uVar1 !== 0)) {
      if ((uVar1 !== -0x7789fe3e)) {
        FUN_005d2279(s_DD>Lock_Surface_failed_006396c8, (uVar1 & 0xffff));
      }
      local_4c = 0;
    }
  }
  return local_4c;
}


 export function FUN_005e92c9 (param_1)

 {
  if ((param_1 !== 0)) {
    param_1 = s32(param_1, 0);
  }
  return 0;
}


 export function FUN_005e92fd (param_1, param_2, param_3)

 {
  let local_c;
  let local_8;

  local_c = param_2;
  local_8 = (param_2 + param_3);
  param_1 = s32(param_1, 0);
  return;
}


 export function FUN_005e9331 (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let local_84;
  let local_7c;
  let local_78;
  let local_74;
  let local_70;
  let local_4c;
  let local_1c;

  local_7c = 0;
  iVar1 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_ffffff88);
  if ((iVar1 === 0)) {
    local_84 = FUN_006e7a54(local_78, 0, 0);
    FUN_006e7a48(local_78, 0, 0, ((param_4 << 16) | ((param_3 << 8) | param_2)));
    param_1 = s32(param_1, 0);
  }
  local_70 = 0x6c;
  while ((local_74 !== -0x7789fde4)) {
    local_74 = s32((s32(param_1, 0) + 0x64), 0)(param_1, 0, DAT_ffffff90, 0, 0);
    if ((local_74 !== -0x7789fde4)) break; local_74 = -0x7789fde4 {
    local_7c = (s32(local_4c, 0) & ((1 << (local_1c & 0x1f)) - 1));
    param_1 = s32(param_1, 0);
  }
  iVar1 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_ffffff88);
  if ((iVar1 === 0)) {
    FUN_006e7a48(local_78, 0, 0, local_84);
    param_1 = s32(param_1, 0);
  }
  return local_7c;
}


 export function FUN_005e9455 (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  if ((param_3 !== 0)) param_3 = (param_3 !== 0) {
    do {
      uVar1 = s32((s32(param_3, 0) + 0x14), 0)(param_3, param_4, param_1, param_2, 0, 0);
      if ((uVar1 === 0)) {
        return 1;
      }
      if ((uVar1 === -0x7789fe3e)) {
        return -1;
      }
    } while ((uVar1 === -0x7789fde4)) FUN_005d2279(s_BltError_006396e0, (uVar1 & 0xffff)) return 0


 export function FUN_005e9506 (param_1, param_2, param_3, param_4)

 {
  let iVar1;

  if ((param_3 !== 0)) param_3 = (param_3 !== 0) {
    do {
      iVar1 = s32((s32(param_3, 0) + 0x14), 0)(param_3, param_4, param_1, param_2, 0x8000, 0);
      if ((iVar1 === 0)) {
        return 1;
      }
      if ((iVar1 === -0x7789fe3e)) {
        return -1;
      }
    } while ((iVar1 === -0x7789fde4)) return 0


 export function FUN_005e95a4 (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  if ((param_3 !== 0)) param_3 = (param_3 !== 0) {
    do {
      uVar1 = s32((s32(param_3, 0) + 0x1c), 0)(param_3, s32(param_4, 0), s32(param_4, 1), param_1, param_2, 0);
      if ((uVar1 === 0)) {
        return 1;
      }
      if ((uVar1 === -0x7789fe3e)) {
        return -1;
      }
    } while ((uVar1 === -0x7789fde4)) FUN_005d2279(s_FastBltError_006396ec, (uVar1 & 0xffff)) return 0


 export function FUN_005e965c (param_1, param_2, param_3, param_4)

 {
  let iVar1;

  if ((param_3 !== 0)) param_3 = (param_3 !== 0) {
    do {
      iVar1 = s32((s32(param_3, 0) + 0x1c), 0)(param_3, s32(param_4, 0), s32(param_4, 1), param_1, param_2, 1);
      if ((iVar1 === 0)) {
        return 1;
      }
      if ((iVar1 === -0x7789fe3e)) {
        return -1;
      }
    } while ((iVar1 === -0x7789fde4)) return 0


 export function FUN_005e96fe (param_1)

 {
  let iVar1;

  if ((param_1 !== 0)) {
    do {
      iVar1 = s32((s32(param_1, 0) + 0x2c), 0)(param_1, 0, 0);
      if ((iVar1 === 0)) {
        return 1;
      }
      if ((iVar1 === -0x7789fe3e)) {
        return -1;
      }
    } while ((iVar1 === -0x7789fde4)) return 0


 export function FUN_005e9783 (param_1, param_2, param_3)

 {
  let uVar1;
  let local_68;
  let local_18;

  if ((param_1 !== 0)) {
    local_68 = 0x64;
    local_18 = param_3;
    do {
      uVar1 = s32((s32(param_1, 0) + 0x14), 0)(param_1, param_2, 0, 0, 0x400, DAT_ffffff98);
      if ((uVar1 === 0)) {
        return 1;
      }
      if ((uVar1 === -0x7789fe3e)) {
        return -1;
      }
    } while ((uVar1 === -0x7789fde4)) FUN_005d2279(s_FillError_006396fc, (uVar1 & 0xffff)) return 0


 export function FUN_005e9838 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let iVar1;
  let local_8;

  if ((param_6 !== 0)) param_6 = (param_6 !== 0) {
    iVar1 = s32((s32(param_6, 0) + 0x44), 0)(param_6, DAT_fffffff8);
    if ((iVar1 === 0)) {
      FUN_006e7a7c(local_8, param_7, param_8, param_4, param_5, s32((param_1 + 4), 0), param_2, param_3, 0xcc0020)
      ;
      param_6 = s32(param_6, 0);
    }
  }
  return;
}


 export function FUN_005e98ba (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10)

 {
  let iVar1;
  let local_8;

  if ((param_6 !== 0)) param_6 = (param_6 !== 0) {
    iVar1 = s32((s32(param_6, 0) + 0x44), 0)(param_6, DAT_fffffff8);
    if ((iVar1 === 0)) {
      FUN_006e7a78(local_8, param_7, param_8, param_9, param_10, s32((param_1 + 4), 0), param_2, param_3, param_4, param_5, 0xcc0020);
      param_6 = s32(param_6, 0);
    }
  }
  return;
}


 export function FUN_005e9944 (param_1, param_2)

 {
  param_2 = s32(param_2, 0);
  return;
}


 export function FUN_005e997c (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let h;
  let cchText;
  let lprc;
  let format;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawString_00639708);
    uVar1 = 0;
  }
  else {
    local_8 = FUN_005dcdf9(param_2);
    iVar2 = FUN_005c847f(param_2);
    iVar2 = (param_5 + iVar2);
    iVar3 = FUN_005c858e(param_2, param_3);
    FUN_006e7d90(DAT_ffffffe8, param_4, param_5, (param_4 + iVar3), iVar2);
    iVar2 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_ffffffe0);
    if ((iVar2 === 0)) {
      h = FUN_006e7a6c(local_20, s32(local_8, 0));
      FUN_006e7a14(local_20, 1);
      FUN_006e7a04(local_20, ((DAT_006e5226 << 16) | ((DAT_006e5225 << 8) | DAT_006e5224)));
      iVar2 = FUN_00407fc0(DAT_ffffffe8);
      iVar2 = (iVar2 / 2 | 0);
      iVar3 = FUN_00407f90(DAT_ffffffe8);
      iVar3 = (iVar3 / 2 | 0);
      FUN_006e7da4(DAT_ffffffe8, (-iVar3), (-iVar2));
      if (((param_7 & 1) !== 0)) {
        FUN_006e7da4(DAT_ffffffe8, iVar3, 0);
      }
      if (((param_7 & 4) !== 0)) {
        FUN_006e7da4(DAT_ffffffe8, 0, iVar2);
      }
      if (((param_7 & 8) !== 0)) {
        FUN_006e7da4(DAT_ffffffe8, 0, (-iVar2));
      }
      if (((param_7 & 2) !== 0)) {
        FUN_006e7da4(DAT_ffffffe8, (-iVar3), 0);
      }
      local_1c = FUN_006e7a44(local_20);
      FUN_006e7a40(local_20, 1);
      FUN_006e7a1c(local_20, UNNAMED, UNNAMED, 0);
      FUN_006e7d48(DAT_ffffffe8, DAT_ffffffe8, param_6);
      format = 0;
      lprc = DAT_ffffffe8;
      cchText = _strlen(param_3);
      FUN_006e7e74(local_20, param_3, cchText, lprc, format);
      FUN_006e7a40(local_20, local_1c);
      FUN_006e7a6c(local_20, h);
      FUN_005dce29(param_2);
      param_1 = s32(param_1, 0);
      uVar1 = 1;
    }
    else if ((iVar2 === -0x7789fe3e)) {
      uVar1 = -1;
    }
    else {
      FUN_005d225b(s_DrawString_-_GetDC_Error_0063972c);
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005e9bd7 (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  let iVar2;
  let h;
  let cchText;
  let local_18;
  let local_c;
  let local_8;

  if ((param_2 === 0)) {
    uVar1 = 0;
  }
  else if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    local_8 = FUN_005dcdf9(param_2);
    iVar2 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_fffffff4);
    if ((iVar2 === 0)) {
      h = FUN_006e7a6c(local_c, s32(local_8, 0));
      FUN_006e7a14(local_c, 1);
      FUN_006e7a04(local_c, ((DAT_006e5226 << 16) | ((DAT_006e5225 << 8) | DAT_006e5224)));
      local_18 = 0;
      if ((param_5 === 0)) {
        local_18 = 0x25;
      }
      else {
        if (((param_5 & 8) !== 0)) {
          local_18 = 8;
        }
        if (((param_5 & 2) !== 0)) {
          local_18 = (local_18 | 2);
        }
      }
      cchText = _strlen(param_3);
      FUN_006e7e74(local_c, param_3, cchText, param_4, local_18);
      FUN_006e7a6c(local_c, h);
      FUN_005dce29(param_2);
      param_1 = s32(param_1, 0);
      uVar1 = 1;
    }
    else if ((iVar2 === -0x7789fe3e)) {
      uVar1 = -1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005e9d31 (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  let iVar2;
  let h;
  let cchText;
  let local_18;
  let local_c;
  let local_8;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawText_00639748);
    uVar1 = 0;
  }
  else if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    local_8 = FUN_005dcdf9(param_2);
    iVar2 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_fffffff4);
    if ((iVar2 === 0)) {
      h = FUN_006e7a6c(local_c, s32(local_8, 0));
      FUN_006e7a14(local_c, 1);
      FUN_006e7a04(local_c, ((DAT_006e5226 << 16) | ((DAT_006e5225 << 8) | DAT_006e5224)));
      local_18 = 0x10;
      if ((param_5 === 0)) {
        local_18 = 0x11;
      }
      else if (((param_5 & 2) !== 0)) {
        local_18 = 0x12;
      }
      cchText = _strlen(param_3);
      FUN_006e7e74(local_c, param_3, cchText, param_4, local_18);
      FUN_006e7a6c(local_c, h);
      FUN_005dce29(param_2);
      param_1 = s32(param_1, 0);
      uVar1 = 1;
    }
    else if ((iVar2 === -0x7789fe3e)) {
      uVar1 = -1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005e9e87 (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  let iVar2;
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    iVar2 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_fffffff0);
    if ((iVar2 === 0)) {
      FUN_006e7a14(local_10, 1);
      local_c = FUN_006e7a0c(0, 1, ((DAT_006e5226 << 16) | ((DAT_006e5225 << 8) | DAT_006e5224)));
      local_8 = FUN_006e7a6c(local_10, local_c);
      FUN_006e7a1c(local_10, param_2, param_3, 0);
      FUN_006e7a24(local_10, param_4, param_5);
      FUN_006e7a6c(local_10, local_8);
      FUN_006e7a94(local_c);
      param_1 = s32(param_1, 0);
      uVar1 = 1;
    }
    else if ((iVar2 === -0x7789fe3e)) {
      uVar1 = -1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005e9f8a (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9, param_10)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let h;
  let cchText;
  let lprc;
  let format;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawString_00639768);
    uVar1 = 0;
  }
  else {
    local_8 = FUN_005dcdf9(param_2);
    iVar2 = FUN_005c847f(param_2);
    iVar2 = (param_5 + iVar2);
    iVar3 = FUN_005c858e(param_2, param_3);
    FUN_006e7d90(DAT_ffffffe8, param_4, param_5, (param_4 + iVar3), iVar2);
    iVar2 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_ffffffe0);
    if ((iVar2 === 0)) {
      h = FUN_006e7a6c(local_20, s32(local_8, 0));
      FUN_006e7a14(local_20, 1);
      FUN_006e7a04(local_20, ((param_10 << 16) | ((param_9 << 8) | param_8)));
      iVar2 = FUN_00407fc0(DAT_ffffffe8);
      iVar2 = (iVar2 / 2 | 0);
      iVar3 = FUN_00407f90(DAT_ffffffe8);
      iVar3 = (iVar3 / 2 | 0);
      FUN_006e7da4(DAT_ffffffe8, (-iVar3), (-iVar2));
      if (((param_7 & 1) !== 0)) {
        FUN_006e7da4(DAT_ffffffe8, iVar3, 0);
      }
      if (((param_7 & 4) !== 0)) {
        FUN_006e7da4(DAT_ffffffe8, 0, iVar2);
      }
      if (((param_7 & 8) !== 0)) {
        FUN_006e7da4(DAT_ffffffe8, 0, (-iVar2));
      }
      if (((param_7 & 2) !== 0)) {
        FUN_006e7da4(DAT_ffffffe8, (-iVar3), 0);
      }
      local_1c = FUN_006e7a44(local_20);
      FUN_006e7a40(local_20, 1);
      FUN_006e7a1c(local_20, UNNAMED, UNNAMED, 0);
      FUN_006e7d48(DAT_ffffffe8, DAT_ffffffe8, param_6);
      format = 0;
      lprc = DAT_ffffffe8;
      cchText = _strlen(param_3);
      FUN_006e7e74(local_20, param_3, cchText, lprc, format);
      FUN_006e7a40(local_20, local_1c);
      FUN_006e7a6c(local_20, h);
      FUN_005dce29(param_2);
      param_1 = s32(param_1, 0);
      uVar1 = 1;
    }
    else if ((iVar2 === -0x7789fe3e)) {
      uVar1 = -1;
    }
    else {
      FUN_005d225b(s_DrawString_-_GetDC_Error_0063978c);
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005ea1dd (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;
  let iVar2;
  let h;
  let cchText;
  let local_18;
  let local_c;
  let local_8;

  if ((param_2 === 0)) {
    uVar1 = 0;
  }
  else if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    local_8 = FUN_005dcdf9(param_2);
    iVar2 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_fffffff4);
    if ((iVar2 === 0)) {
      h = FUN_006e7a6c(local_c, s32(local_8, 0));
      FUN_006e7a14(local_c, 1);
      FUN_006e7a04(local_c, ((param_8 << 16) | ((param_7 << 8) | param_6)));
      local_18 = 0;
      if ((param_5 === 0)) {
        local_18 = 0x25;
      }
      else {
        if (((param_5 & 8) !== 0)) {
          local_18 = 8;
        }
        if (((param_5 & 2) !== 0)) {
          local_18 = (local_18 | 2);
        }
      }
      cchText = _strlen(param_3);
      FUN_006e7e74(local_c, param_3, cchText, param_4, local_18);
      FUN_006e7a6c(local_c, h);
      FUN_005dce29(param_2);
      param_1 = s32(param_1, 0);
      uVar1 = 1;
    }
    else if ((iVar2 === -0x7789fe3e)) {
      uVar1 = -1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005ea32f (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;
  let iVar2;
  let h;
  let cchText;
  let local_18;
  let local_c;
  let local_8;

  if ((param_2 === 0)) {
    FUN_005d225b(s_Error:_NULL_font_in_MSDrawText_006397a8);
    uVar1 = 0;
  }
  else if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    local_8 = FUN_005dcdf9(param_2);
    iVar2 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_fffffff4);
    if ((iVar2 === 0)) {
      h = FUN_006e7a6c(local_c, s32(local_8, 0));
      FUN_006e7a14(local_c, 1);
      FUN_006e7a04(local_c, ((param_8 << 16) | ((param_7 << 8) | param_6)));
      local_18 = 0x10;
      if ((param_5 === 0)) {
        local_18 = 0x11;
      }
      else if (((param_5 & 2) !== 0)) {
        local_18 = 0x12;
      }
      cchText = _strlen(param_3);
      FUN_006e7e74(local_c, param_3, cchText, param_4, local_18);
      FUN_006e7a6c(local_c, h);
      FUN_005dce29(param_2);
      param_1 = s32(param_1, 0);
      uVar1 = 1;
    }
    else if ((iVar2 === -0x7789fe3e)) {
      uVar1 = -1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005ea47d (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;
  let iVar2;
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    iVar2 = s32((s32(param_1, 0) + 0x44), 0)(param_1, DAT_fffffff0);
    if ((iVar2 === 0)) {
      FUN_006e7a14(local_10, 1);
      local_c = FUN_006e7a0c(0, 1, ((param_8 << 16) | ((param_7 << 8) | param_6)));
      local_8 = FUN_006e7a6c(local_10, local_c);
      FUN_006e7a1c(local_10, param_2, param_3, 0);
      FUN_006e7a24(local_10, param_4, param_5);
      FUN_006e7a6c(local_10, local_8);
      FUN_006e7a94(local_c);
      param_1 = s32(param_1, 0);
      uVar1 = 1;
    }
    else if ((iVar2 === -0x7789fe52)) {
      uVar1 = -1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005ea578 (in_EAX, param_1)

 {
  // in_EAX promoted to parameter;
  let uVar1;

  if ((param_1 === 0)) {
    uVar1 = (in_EAX & -0x100);
  }
  else {
    uVar1 = s32((s32(param_1, 0) + 0x48), 0)(param_1, 1);
    if ((uVar1 === 0)) {
      uVar1 = 1;
    }
    else {
      uVar1 = (uVar1 & -0x100);
    }
  }
  return uVar1;
}


 export function FUN_005ea5c5 (param_1)

 {
  let uVar1;
  let iVar2;

  if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    iVar2 = s32((s32(param_1, 0) + 0x60), 0)(param_1);
    if ((iVar2 === 0)) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005ea610 (param_1)

 {
  let local_8;

  if ((DAT_006394c0 !== 0)) {
    if ((param_1 === 0)) {
      local_8 = 4;
    }
    else {
      local_8 = 1;
    }
    DAT_006394c0 = s32(DAT_006394c0, 0);
  }
  return;
}


 export function FUN_005ea677 (in_EAX)

 {
  // in_EAX promoted to parameter;
  let uVar1;
  let local_8;

  if ((DAT_006394c0 === 0)) {
    uVar1 = (in_EAX & -0x100);
  }
  else {
    uVar1 = s32((s32(DAT_006394c0, 0) + 0x44), 0)(DAT_006394c0, DAT_fffffff8);
    if ((uVar1 === 0)) {
      uVar1 = u8(UNNAMED);
    }
    else {
      uVar1 = (uVar1 & -0x100);
    }
  }
  return uVar1;
}


 export function FUN_005ea6c4 ()

 {
  let iVar1;
  let local_8;

  if ((DAT_006394c0 === 0)) {
    local_8 = 0;
  }
  else {
    iVar1 = s32((s32(DAT_006394c0, 0) + 0x40), 0)(DAT_006394c0, DAT_fffffff8);
    if ((iVar1 !== 0)) {
      local_8 = 0;
    }
  }
  return local_8;
}


 export function FUN_005ea711 ()

 {
  let uVar1;
  let local_8;

  if ((DAT_006394c0 === 0)) {
    local_8 = 0;
  }
  else {
    uVar1 = s32((s32(DAT_006394c0, 0) + 0x3c), 0)(DAT_006394c0, DAT_fffffff8);
    if ((uVar1 !== 0)) {
      FUN_005d2279(s_DD->GetMonitorFrequency_failed_006397c8, (uVar1 & 0xffff));
      local_8 = 0;
    }
  }
  return local_8;
}


 export function FUN_005ea779 ()

 {
  return;
}


 export function FUN_005ea7a0 (param_1, param_2)

 {
  FUN_006e7db0(s32((param_2 + 4), 0), 8, param_1);
  FUN_006e7db0(s32((param_2 + 4), 0), -4, 0x5eacc0);
  return;
}


 export function FUN_005ea7d7 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  local_8 = param_2;
  while ((iVar1 === param_1)) {
    if ((local_8 === 0)) {
      return 0;
    }
    iVar1 = FUN_00418770();
    if ((iVar1 === param_1)) break; local_8 = FUN_005c5e80() return local_8


 export function FUN_005ea825 (param_1)

 {
  let BVar1;
  let pHVar2;

  BVar1 = FUN_006e7e54(param_1);
  if ((BVar1 === 0)) {
    pHVar2 = 0;
  }
  else {
    pHVar2 = FUN_006e7dc4(param_1, 2);
    if ((pHVar2 === 0)) {
      pHVar2 = FUN_006e7dc4(param_1, 0);
    }
  }
  return pHVar2;
}


 export function FUN_005ea87c (param_1)

 {
  let BVar1;
  let pHVar2;

  BVar1 = FUN_006e7e54(param_1);
  if ((BVar1 === 0)) {
    pHVar2 = 0;
  }
  else {
    pHVar2 = FUN_006e7dc4(param_1, 3);
    if ((pHVar2 === 0)) {
      pHVar2 = FUN_006e7dc4(param_1, 1);
    }
  }
  return pHVar2;
}


 export function FUN_005ea8d3 (param_1, param_2, param_3)

 {
  let iVar1;
  let BVar2;
  let pHVar3;
  let this;
  let pcVar4;
  let UVar5;
  let uCmd;
  let local_10;

  if ((param_2 === 0)) {
    param_2 = FUN_006e7e94();
    pHVar3 = param_2;
    iVar1 = FUN_00414d10();
    BVar2 = FUN_006e7dc0(s32((iVar1 + 4), 0), pHVar3);
    if ((BVar2 === 0)) {
      param_2 = 0;
    }
  }
  if ((param_2 === 0)) {
    if ((s32((param_1 + 0xb8), 0) === 0)) {
      return;
    }
    if ((param_3 === 2)) {
      UVar5 = 5;
      iVar1 = FUN_00414d10();
      param_2 = FUN_006e7dc4(s32((iVar1 + 4), 0), UVar5);
      pHVar3 = param_2;
    }
    else {
      uCmd = 1;
      UVar5 = 5;
      iVar1 = FUN_00414d10();
      pHVar3 = FUN_006e7dc4(s32((iVar1 + 4), 0), UVar5);
      param_2 = FUN_006e7dc4(pHVar3, uCmd);
      pHVar3 = param_2;
    }
  }
  else if ((param_3 === 2)) {
    param_2 = FUN_005ea825(param_2);
    pHVar3 = param_2;
  }
  else {
    param_2 = FUN_005ea87c(param_2);
    pHVar3 = param_2;
  }
  do {
    BVar2 = FUN_006e7e54(param_2);
    if ((BVar2 === 0)) {
      return;
    }
    BVar2 = FUN_006e7e18(param_2);
    if ((BVar2 === 0)) {
      if ((param_3 === 2)) {
        param_2 = FUN_005ea825(param_2);
      }
      else {
        param_2 = FUN_005ea87c(param_2);
      }
    }
    else {
      iVar1 = FUN_005dab5a(param_2);
      if ((iVar1 !== 0)) {
        local_10 = param_2;
        while ((iVar1 === 0)) {
          BVar2 = FUN_006e7e54(param_2);
          if ((BVar2 === 0)) {
            return;
          }
          iVar1 = FUN_005dac39(local_10, param_2);
          if ((iVar1 === 0)) break; iVar1 = FUN_005dabe5(param_2) {
            FUN_006e7d94(param_2);
            return;
          }
          local_10 = param_2;
          if ((param_3 === 2)) {
            param_2 = FUN_005ea825(param_2);
          }
          else {
            param_2 = FUN_005ea87c(param_2);
          }
        }
        FUN_005ea8d3(param_1, local_10, param_3);
        return;
      }
      this = FUN_005ea7d7(param_2, s32((param_1 + 0xb8), 0));
      if ((iVar1 === 0xa)) iVar1 = FUN_005c5e60() iVar1 = (iVar1 === 6) pcVar4 = egptr(this) pcVar4 = (pcVar4 !== 0) iVar1 = FUN_005c5e60() iVar1 = (iVar1 === 2) iVar1 = FUN_005c5ec0() iVar1 = (iVar1 !== 0) iVar1 = FUN_005c5e60() iVar1 = (iVar1 === 4) iVar1 = FUN_005c5e60() iVar1 = (iVar1 === 7) iVar1 = FUN_005c5e60() iVar1 = (iVar1 === 0xa) {
        FUN_006e7d94(param_2);
        return;
      }
      if ((param_3 === 2)) {
        param_2 = FUN_005ea825(param_2);
      }
      else {
        param_2 = FUN_005ea87c(param_2);
      }
    }
    if ((param_2 === pHVar3)) {
      return;
    }
  } while ( true );
}


 export function FUN_005eabcc (param_1)

 {
  let cVar1;
  let iVar2;
  let puVar3;
  let uVar4;

  cVar1 = FUN_005cbdd0();
  if ((cVar1 !== 0)) {
    iVar2 = FUN_005c5e60();
    if ((iVar2 === 3)) {
      puVar3 = FUN_005c5ee0();
      uVar4 = FUN_005ea87c(s32(puVar3, 0));
      FUN_005ea8d3(param_1, uVar4, 2);
    }
    else {
      uVar4 = FUN_00418770();
      uVar4 = FUN_005ea87c(uVar4);
      FUN_005ea8d3(param_1, uVar4, 2);
    }
  }
  return;
}


 export function FUN_005eac6d (param_1)

 {
  let iVar1;
  let uVar2;
  let local_8;

  local_8 = param_1;
  while ((iVar1 === 0xb)) {
    if ((local_8 === 0)) {
      return 0;
    }
    iVar1 = FUN_005c5e60();
    if ((iVar1 === 0xb)) break; local_8 = FUN_005c5e80() uVar2 = FUN_00418770() return uVar2


 export function FUN_005eacc0 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let SVar2;
  let LVar3;
  let uVar4;
  let pHVar5;
  let uVar6;
  let BVar7;
  let DVar8;
  let iVar9;
  let local_4c;
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
  let local_10;
  let local_c;
  let local_8;

  local_18 = FUN_006e7e2c(param_1, 8);
  if ((local_18 === 0)) {
    LVar3 = FUN_005eb447(param_1, param_2, param_3, param_4);
    return LVar3;
  }
  if ((param_2 < 6)) {
    if ((param_2 === 5)) {
      local_34 = FUN_005eac6d(s32((local_18 + 0xb8), 0));
      if ((local_34 !== 0)) {
        FUN_006e7d6c(local_34, 5, param_3, param_4);
      }
      LVar3 = FUN_005eb447(param_1, 5, param_3, param_4);
      return LVar3;
    }
    if ((param_2 === 2)) {
      w32((local_18 + 0xb8), 0, 0);
      FUN_006e7db0(param_1, 8, 0);
      LVar3 = FUN_005eb447(param_1, 2, param_3, param_4);
      return LVar3;
    }
  }
  else if ((param_2 < 0x101)) {
    if ((param_2 === 0x100)) {
      SVar2 = FUN_006e7d64(0x10);
      iVar9 = ((SVar2) << 16 >> 16);
      local_2c = (((SVar2 >>> 8)) & 0xFF);
      local_2c = iVar9;
      if (((((SVar2 >>> 8)) & 0xFF) === 0)) local_2c = ((((SVar2 >>> 8)) & 0xFF) === 0) {
        cVar1 = FUN_005cbdd0();
        if ((cVar1 !== 0)) {
          FUN_005ea8d3(local_18, 0, 2);
        }
      }
      else if (((((SVar2 >>> 8)) & 0xFF) !== 0)) local_2c = ((((SVar2 >>> 8)) & 0xFF) !== 0) {
        cVar1 = FUN_005cbdd0();
        if ((cVar1 !== 0)) {
          FUN_005ea8d3(local_18, 0, 3);
        }
      }
      else if (((((SVar2 >>> 8)) & 0xFF) === 0)) local_2c = ((((SVar2 >>> 8)) & 0xFF) === 0) {
        if ((s32((local_18 + 0xbc), 0) !== 0)) {
          uVar6 = FUN_00418770();
          FUN_005cac22(uVar6);
        }
      }
      else if (((((SVar2 >>> 8)) & 0xFF) === 0)) local_2c = ((((SVar2 >>> 8)) & 0xFF) === 0) {
        if ((s32((local_18 + 0xc0), 0) !== 0)) {
          uVar6 = FUN_00418770();
          FUN_005cac22(uVar6);
        }
      }
      else {
        uVar6 = FUN_005eb3ed(param_3);
        FUN_005c5c86(uVar6);
      }
      BVar7 = FUN_006e7e54(param_1);
      if ((BVar7 === 0)) {
        return 0;
      }
      LVar3 = FUN_005eb447(param_1, 0x100, param_3, param_4);
      return LVar3;
    }
    if ((param_2 === 0x46)) {
      if (((s32(DAT_00000000, 0) & 4) === 0)) unused {
        local_24 = FUN_006e7e2c(param_1, 0);
        local_28 = FUN_00414d10();
        uVar4 = FUN_005bd610();
        if (((uVar4 & 0x200) !== 0)) {
          iVar9 = 0;
          pHVar5 = FUN_006e7e40(param_1);
          FUN_006e7e2c(pHVar5, iVar9);
          local_8 = FUN_00414d10();
          local_1c = FUN_006e7e2c(s32((local_8 + 4), 0), 8);
          if ((local_38 !== 0)) local_38 = FUN_005eac6d(s32((local_1c + 0xb8), 0)) local_38 = (local_38 !== 0) {
            w32(DAT_00000000, 0, local_38);
            LVar3 = FUN_006e7e80(param_1, 0x46, param_3, param_4);
            return LVar3;
          }
        }
      }
      LVar3 = FUN_005eb447(param_1, 0x46, param_3, param_4);
      return LVar3;
    }
  }
  else {
    if ((param_2 < 0x116)) {
      if ((param_2 < 0x114)) {
        if ((param_2 !== 0x111)) goto LAB_005eb241; uVar4 = (param_3 >>> 0x10) {
          if ((uVar4 === 0x300)) {
            local_10 = param_4;
            DVar8 = FUN_006e7e9c(param_4, -18);
            local_20 = (DVar8 - 4);
            local_14 = FUN_006e7e2c(local_10, local_20);
            FUN_005eb330();
          }
          else if ((uVar4 === 1)) {
            local_30 = param_4;
            FUN_006e7d6c(param_4, 0x4c8, param_3, param_4);
          }
          else {
            if ((uVar4 !== 2)) goto LAB_005eb1df; local_30 = param_4 FUN_006e7d6c(param_4, 0x4c8, param_3, param_4) {
          if ((uVar4 !== 0x501)) {
 LAB_005eb1df: :
            LVar3 = FUN_005eb447(param_1, 0x111, param_3, param_4);
            return LVar3;
          }
          local_10 = param_4;
          DVar8 = FUN_006e7e9c(param_4, -18);
          local_20 = (DVar8 - 4);
          local_14 = FUN_006e7e2c(local_10, local_20);
          FUN_005eb2f0();
        }
      }
      else {
        iVar9 = FUN_00414d10();
        if (((_MEM[(iVar9 + 0x49)] & 1) !== 0)) iVar9 = FUN_00414d10() iVar9 = (iVar9 + 0x49) {
          LVar3 = FUN_005eb447(param_1, param_2, param_3, param_4);
          return LVar3;
        }
        local_c = param_4;
        FUN_005cd149(param_4, param_2, param_3, param_4);
      }
      return 0;
    }
    if ((param_2 === 0x216)) {
      local_24 = FUN_006e7e2c(param_1, 0);
      local_28 = FUN_00414d10();
      uVar4 = FUN_005bd610();
      if (((uVar4 & 0x200) !== 0)) {
        iVar9 = 0;
        pHVar5 = FUN_006e7e40(param_1);
        FUN_006e7e2c(pHVar5, iVar9);
        local_8 = FUN_00414d10();
        local_1c = FUN_006e7e2c(s32((local_8 + 4), 0), 8);
        if ((BVar7 !== 0)) local_3c = FUN_005eac6d(s32((local_1c + 0xb8), 0)) local_3c = (local_3c !== 0) BVar7 = FUN_006e7e18(local_3c) BVar7 = (BVar7 !== 0) {
          iVar9 = FUN_006e7d8c(4);
          FUN_006e7e38(local_3c, DAT_ffffffb4);
          local_2c = FUN_00407f90(param_4);
          if (((UNNAMED - iVar9) <= s32(DAT_00000000, 0))) top unused {
            w32(DAT_00000000, 0, (UNNAMED - iVar9));
            w32(DAT_00000000, 0, ((UNNAMED - iVar9) + local_2c));
          }
        }
      }
      LVar3 = FUN_005eb447(param_1, 0x216, param_3, param_4);
      return LVar3;
    }
  }
 LAB_005eb241: :
  LVar3 = FUN_005eb447(param_1, param_2, param_3, param_4);
  return LVar3;
}


 export function FUN_005eb2f0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) !== 0)) {
    in_ECX = (in_ECX + 0x30);
  }
  return;
}


 export function FUN_005eb330 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x2c);
  }
  return;
}


 export function FUN_005eb370 (param_1, param_2)

 {
  FUN_006e7db0(s32((param_2 + 4), 0), 0, param_1);
  return;
}


 export function FUN_005eb393 (param_1, param_2)

 {
  FUN_006e7db0(s32((param_2 + 4), 0), 4, param_1);
  FUN_006e7db0(s32((param_2 + 4), 0), -4, 0x5eb447);
  return;
}


 export function FUN_005eb3ca (param_1, param_2)

 {
  FUN_006e7db0(s32((param_2 + 4), 0), 4, param_1);
  return;
}


 export function FUN_005eb3ed (param_1)

 {
  let iVar1;
  let local_8;

  local_8 = s32((DAT_006397e8 + (param_1 & 0xff) * 4), 0);
  if ((local_8 !== 0)) {
    iVar1 = FUN_005ecf20();
    if ((iVar1 !== 0)) {
      local_8 = (local_8 | 0x200);
    }
    iVar1 = FUN_005ecef0();
    if ((iVar1 !== 0)) {
      local_8 = (local_8 | 0x100);
    }
  }
  return local_8;
}


 export function FUN_005eb447 (param_1, param_2, param_3, param_4)

 {
  let sVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let BVar6;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = FUN_006e7e2c(param_1, 4);
  if ((local_14 === 0)) {
    uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
    return uVar2;
  }
  sVar1 = (((param_4 >>> 0x10)) & 0xFFFF);
  if ((param_2 < 0x11)) {
    if ((param_2 === 0x10)) {
      DAT_00637ea4 = local_14;
      iVar5 = FUN_005ed250();
      if ((iVar5 !== 0)) {
        uVar2 = FUN_005dbe88(param_1, 0x10, param_3, param_4);
        return uVar2;
      }
    }
    else {
      /* BRANCHIND */ () {
      case 2 :
        FUN_006e7db0(param_1, 4, 0);
        uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
        return uVar2;
      case 3 :
        DAT_00637ea4 = local_14;
        FUN_005ed360(((((param_4) & 0xFFFF)) << 16 >> 16), ((sVar1) << 16 >> 16));
        uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
        return uVar2;
      default :
        goto switchD_005ec033_caseD_4;
      case 5 :
        DAT_00637ea4 = local_14;
        BVar6 = FUN_006e7d4c(param_1);
        if ((BVar6 === 0)) {
          FUN_005ed580(((((param_4) & 0xFFFF)) << 16 >> 16), ((sVar1) << 16 >> 16));
          FUN_005ed320(param_3);
        }
        uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
        return uVar2;
      case 7 :
        DAT_00637ea4 = local_14;
        FUN_005ed2f0();
      }
    }
  }
  else if ((param_2 < 0x45)) {
    if ((param_2 === 0x44)) {
      DAT_00637ea4 = local_14;
      FUN_005ed3a0((param_4 & 0xffff));
      return 1;
    }
    if ((param_2 !== 0x24)) goto switchD_005ec033_caseD_4; uVar3 = FUN_00414d10() iVar5 = FUN_005bca3d(uVar3) uVar3 = FUN_00414d10() iVar4 = FUN_005bc9d3(uVar3) FUN_005bb910(DAT_ffffffe0, DAT_ffffffdc) FUN_005bb950(DAT_fffffff8, DAT_fffffff4) w32((param_4 + 0x20), 0, (iVar4 + local_8)) w32((param_4 + 0x24), 0, (iVar5 + local_c)) w32((param_4 + 0x18), 0, (iVar4 + local_20)) w32((param_4 + 0x1c), 0, (iVar5 + local_24)) {
    if ((param_2 === 0x111)) {
      DAT_00637ea4 = local_14;
      if ((((param_4) & 0xFFFF) === 0)) {
        FUN_005ec1a1(param_1, param_3);
      }
    }
    else if ((param_2 === 0x100)) {
      DAT_00637ea4 = local_14;
      uVar3 = FUN_005eb3ed(param_3);
      FUN_005ed150(uVar3);
      uVar3 = FUN_005eb3ed(param_3);
      FUN_005ed1d0(uVar3);
    }
    else if ((param_2 === 0x101)) {
      DAT_00637ea4 = local_14;
      uVar3 = FUN_005eb3ed(param_3);
      FUN_005ed190(uVar3);
    }
    else {
      if ((param_2 !== 0x102)) goto switchD_005ec033_caseD_4; DAT_00637ea4 = local_14 FUN_005ed210((param_3 & 0xff)) {
    if ((param_2 === 0x11f)) {
      if ((param_4 === 0)) param_4 = (param_4 === 0) {
        DAT_00637ea4 = local_14;
        FUN_005c63af(-1);
      }
      else {
        DAT_00637ea4 = local_14;
        FUN_005c63af((param_3 & 0xffff));
      }
    }
    else {
      if ((param_2 === 0x112)) {
        if ((param_3 === 0xf020)) {
          DAT_00637ea4 = local_14;
          FUN_005ed290();
        }
        else {
          DAT_00637ea4 = local_14;
          if ((param_3 === 0xf120)) {
            FUN_005ed2c0();
          }
        }
        uVar2 = FUN_005dbe88(param_1, 0x112, param_3, param_4);
        return uVar2;
      }
      sVar1 = (((param_3 >>> 0x10)) & 0xFFFF);
      if ((param_2 === 0x114)) {
        local_1c = IsTracking(local_14);
        /* BRANCHIND */ () {
        case () 0x0 :
          local_1c = (local_1c + -1);
          FUN_006e7ea8(param_1, 0, local_1c, 1);
          local_1c = FUN_006e7ea4(param_1, 0);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_1c);
          FUN_005ed3e0(local_1c);
          break;
        case () 0x1 :
          local_1c = (local_1c + 1);
          FUN_006e7ea8(param_1, 0, local_1c, 1);
          local_1c = FUN_006e7ea4(param_1, 0);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_1c);
          FUN_005ed3e0(local_1c);
          break;
        case () 0x2 :
          iVar5 = IsTracking(local_14);
          local_1c = (local_1c - iVar5);
          FUN_006e7ea8(param_1, 0, local_1c, 1);
          local_1c = FUN_006e7ea4(param_1, 0);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_1c);
          FUN_005ed3e0(local_1c);
          break;
        case () 0x3 :
          iVar5 = IsTracking(local_14);
          local_1c = (local_1c + iVar5);
          FUN_006e7ea8(param_1, 0, local_1c, 1);
          local_1c = FUN_006e7ea4(param_1, 0);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_1c);
          FUN_005ed3e0(local_1c);
          break;
        case () 0x4 :
          local_1c = ((sVar1) << 16 >> 16);
          FUN_006e7ea8(param_1, 0, local_1c, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_1c);
          FUN_005ed3e0(s32((local_14 + 0xb0), 0));
          break;
        case () 0x5 :
          DAT_00637ea4 = local_14;
          FUN_005ed420(((sVar1) << 16 >> 16));
        }
      }
      else {
        if ((param_2 !== 0x115)) goto switchD_005ec033_caseD_4; local_1c = IsTracking(local_14) {
        case () 0x0 :
          local_1c = (local_1c + -1);
          FUN_006e7ea8(param_1, 1, local_1c, 1);
          local_1c = FUN_006e7ea4(param_1, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_1c);
          FUN_005ed460(local_1c);
          break;
        case () 0x1 :
          local_1c = (local_1c + 1);
          FUN_006e7ea8(param_1, 1, local_1c, 1);
          local_1c = FUN_006e7ea4(param_1, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_1c);
          FUN_005ed460(local_1c);
          break;
        case () 0x2 :
          iVar5 = IsTracking(local_14);
          local_1c = (local_1c - iVar5);
          FUN_006e7ea8(param_1, 1, local_1c, 1);
          local_1c = FUN_006e7ea4(param_1, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_1c);
          FUN_005ed460(local_1c);
          break;
        case () 0x3 :
          iVar5 = IsTracking(local_14);
          local_1c = (local_1c + iVar5);
          FUN_006e7ea8(param_1, 1, local_1c, 1);
          local_1c = FUN_006e7ea4(param_1, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_1c);
          FUN_005ed460(local_1c);
          break;
        case () 0x4 :
          local_1c = ((sVar1) << 16 >> 16);
          FUN_006e7ea8(param_1, 1, local_1c, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_1c);
          FUN_005ed460(s32((local_14 + 0xb4), 0));
          break;
        case () 0x5 :
          DAT_00637ea4 = local_14;
          FUN_005ed4a0(((sVar1) << 16 >> 16));
        }
      }
    }
  }
  else {
    if ((0x210 < param_2)) {
      if ((param_2 < 0x310)) {
        if ((param_2 === 0x30f)) {
 LAB_005eb8a1: :
          local_18 = FUN_006e7e10(param_1);
          iVar5 = FUN_00414d10();
          if ((s32((iVar5 + 0x18), 0) !== 0)) {
            BVar6 = 0;
            iVar5 = FUN_00414d10();
            FUN_006e7a74(local_18, s32((iVar5 + 0x18), 0), BVar6);
            local_10 = FUN_006e7a80(local_18);
            FUN_006e7e28(param_1, 0, 1);
          }
          FUN_006e7dd8(param_1, local_18);
          return u8((local_10 !== 0));
        }
        if ((param_2 === 0x231)) {
          FUN_006e7e2c(param_1, 0);
          FUN_00414d10();
          DAT_00637ea4 = local_14;
          FUN_005ed520();
          uVar2 = FUN_005dbe88(param_1, 0x231, param_3, param_4);
          return uVar2;
        }
        if ((param_2 === 0x232)) {
          FUN_006e7e2c(param_1, 0);
          FUN_00414d10();
          DAT_00637ea4 = local_14;
          FUN_005ed550();
          uVar2 = FUN_005dbe88(param_1, 0x232, param_3, param_4);
          return uVar2;
        }
      }
      else {
        if ((param_2 === 0x311)) {
          if ((param_3 === param_1)) {
            uVar2 = FUN_005dbe88(param_1, 0x311, param_3, param_4);
            return uVar2;
          }
          goto LAB_005eb8a1;
        }
        if ((param_2 === 0x3bd)) {
          FUN_005d6c99(param_3, param_4);
          return 0;
        }
        if ((param_2 === 0x4c8)) {
          if ((param_4 !== 0x20d)) {
            return 0;
          }
          FUN_005ed4e0(0);
          return 0;
        }
      }
 switchD_005ec033_caseD_4: :
      uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
      return uVar2;
    }
    if ((param_2 === 0x210)) {
      if (((param_3 & 0xffff) === 0x201)) {
        DAT_00637ea4 = local_14;
        FUN_005ecf90((param_4 & 0xffff), (param_4 >>> 0x10));
      }
      else if (((param_3 & 0xffff) === 0x204)) {
        DAT_00637ea4 = local_14;
        FUN_005ed050((param_4 & 0xffff), (param_4 >>> 0x10));
      }
    }
    else {
      /* BRANCHIND */ () {
      case 0x200 :
        DAT_00637ea4 = local_14;
        FUN_005ecf50(((((param_4) & 0xFFFF)) << 16 >> 16), ((sVar1) << 16 >> 16));
        break;
      case 0x201 :
        FUN_006e7e2c(param_1, 0);
        iVar5 = FUN_00414d10();
        DAT_00637ea4 = local_14;
        if (((_MEM[(iVar5 + 0x49)] & 2) !== 0)) {
          FUN_006e7d94(s32((iVar5 + 4), 0));
          FUN_006e7da0(param_1);
        }
        w32((local_14 + 0xa8), 0, 1);
        FUN_005ecf90(((((param_4) & 0xFFFF)) << 16 >> 16), ((sVar1) << 16 >> 16));
        break;
      case 0x202 :
        DAT_00637ea4 = local_14;
        if ((s32((local_14 + 0xa8), 0) === 1)) {
          w32((local_14 + 0xa8), 0, 0);
          FUN_005ed010(((((param_4) & 0xFFFF)) << 16 >> 16), ((sVar1) << 16 >> 16));
        }
        FUN_005ecfd0((param_4 & 0xffff), (param_4 >>> 0x10));
        break;
      case 0x203 :
        DAT_00637ea4 = local_14;
        FUN_005ed110(((((param_4) & 0xFFFF)) << 16 >> 16), ((sVar1) << 16 >> 16));
        break;
      case 0x204 :
        FUN_006e7e2c(param_1, 0);
        iVar5 = FUN_00414d10();
        if (((_MEM[(iVar5 + 0x49)] & 2) !== 0)) {
          FUN_006e7d94(s32((iVar5 + 4), 0));
          FUN_006e7da0(param_1);
        }
        DAT_00637ea4 = local_14;
        w32((local_14 + 0xac), 0, 1);
        FUN_005ed050(((((param_4) & 0xFFFF)) << 16 >> 16), ((sVar1) << 16 >> 16));
        break;
      case 0x205 :
        DAT_00637ea4 = local_14;
        if ((s32((local_14 + 0xac), 0) === 1)) {
          w32((local_14 + 0xac), 0, 0);
          FUN_005ed0d0(((((param_4) & 0xFFFF)) << 16 >> 16), ((sVar1) << 16 >> 16));
        }
        FUN_005ed090(((((param_4) & 0xFFFF)) << 16 >> 16), ((sVar1) << 16 >> 16));
        break;
      default :
        goto switchD_005ec033_caseD_4;
      }
    }
  }
  return 0;
}


 export function FUN_005ec1a1 (param_1, param_2)

 {
  let cVar1;
  let pHVar2;
  let uVar3;

  FUN_006e7e2c(param_1, 4);
  cVar1 = FUN_005ed5f0(param_2);
  if ((cVar1 === 0)) {
    DAT_006e5368 = 0;
    pHVar2 = FUN_006e7dbc(param_1);
    if ((pHVar2 !== 0)) {
      uVar3 = FUN_005ec23a(pHVar2, param_2);
      FUN_005ed5a0((uVar3 & 0xffff), (uVar3 >>> 0x10));
    }
  }
  return;
}


 export function FUN_005ec23a (param_1, param_2)

 {
  let iVar1;
  let UVar2;
  let pHVar3;
  let local_c;
  let local_8;

  local_c = 0;
  DAT_006e5368 = (DAT_006e5368 + 1);
  iVar1 = FUN_006e7ddc(param_1);
  (local_8 < iVar1) (local_8 = 0; local_8 = (local_8 < iVar1); local_8 = (local_8 + 1)) {
    UVar2 = FUN_006e7e68(param_1, local_8);
    if ((UVar2 === -1)) {
      pHVar3 = FUN_006e7df4(param_1, local_8);
      local_c = FUN_005ec23a(pHVar3, param_2);
      if ((local_c !== 0)) {
        local_8 = (iVar1 + 1);
      }
    }
    else {
      UVar2 = FUN_006e7e68(param_1, local_8);
      if ((param_2 === UVar2)) {
        local_c = ((local_8 + 1) * 0x10000 | (DAT_006e5368 - 1));
        local_8 = (iVar1 + 1);
      }
    }
  }
  return local_c;
}


 export function FUN_005ec317 (param_1, param_2, param_3, param_4)

 {
  let sVar1;
  let uVar2;
  let BVar3;
  let iVar4;
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

  local_14 = FUN_006e7e2c(param_1, 4);
  if ((local_14 === 0)) {
    uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
    return uVar2;
  }
  if ((param_2 < 0x11)) {
    if ((param_2 !== 0x10)) {
      /* BRANCHIND */ () {
      case 3 :
        DAT_00637ea4 = local_14;
        FUN_005ed360((param_4 & 0xffff), (param_4 >>> 0x10));
        uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
        return uVar2;
      default :
        goto switchD_005ecda6_caseD_4;
      case 5 :
 switchD_005ecda6_caseD_5: :
        DAT_00637ea4 = local_14;
        BVar3 = FUN_006e7d4c(param_1);
        if ((BVar3 === 0)) {
          FUN_005ed580((param_4 & 0xffff), (param_4 >>> 0x10));
          FUN_005ed320(param_3);
        }
        uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
        return uVar2;
      case 6 :
        goto switchD_005ecda6_caseD_6;
      case 7 :
        DAT_00637ea4 = local_14;
        FUN_005ed2f0();
        return 0;
      }
    }
    DAT_00637ea4 = local_14;
    iVar4 = FUN_005ed250();
    if ((iVar4 !== 0)) {
      uVar2 = FUN_005dbe88(param_1, 0x10, param_3, param_4);
      return uVar2;
    }
  }
  else {
    if ((param_2 < 0x45)) {
      if ((param_2 === 0x44)) {
        DAT_00637ea4 = local_14;
        FUN_005ed3a0((param_4 & 0xffff));
        return 1;
      }
      if ((param_2 === 0x24)) {
        local_2c = param_4;
        uVar2 = FUN_00414d10();
        local_30 = FUN_005bca3d(uVar2);
        uVar2 = FUN_00414d10();
        local_28 = FUN_005bc9d3(uVar2);
        FUN_005bb910(DAT_ffffffe4, DAT_ffffffe0);
        FUN_005bb950(DAT_fffffff8, DAT_fffffff4);
        w32((local_2c + 0x20), 0, (local_28 + local_8));
        w32((local_2c + 0x24), 0, (local_30 + local_c));
        w32((local_2c + 0x18), 0, (local_28 + local_1c));
        w32((local_2c + 0x1c), 0, (local_30 + local_20));
        return 0;
      }
 switchD_005ecda6_caseD_4: :
      uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
      return uVar2;
    }
    if ((param_2 < 0x112)) {
      if ((param_2 === 0x111)) {
        DAT_00637ea4 = local_14;
        return 0;
      }
      if ((param_2 === 0x100)) {
        DAT_00637ea4 = local_14;
        uVar2 = FUN_005eb3ed(param_3);
        FUN_005ed150(uVar2);
        uVar2 = FUN_005eb3ed(param_3);
        FUN_005ed1d0(uVar2);
        return 0;
      }
      if ((param_2 === 0x101)) {
        DAT_00637ea4 = local_14;
        uVar2 = FUN_005eb3ed(param_3);
        FUN_005ed190(uVar2);
        return 0;
      }
      if ((param_2 === 0x102)) {
        DAT_00637ea4 = local_14;
        FUN_005ed210((param_3 & 0xff));
        return 0;
      }
      goto switchD_005ecda6_caseD_4;
    }
    if ((param_2 < 0x201)) {
      if ((param_2 === 0x200)) {
        DAT_00637ea4 = local_14;
        FUN_005ecf50((param_4 & 0xffff), (param_4 >>> 0x10));
        return 0;
      }
      if ((param_2 === 0x112)) {
        if ((param_3 === 0xf020)) {
          DAT_00637ea4 = local_14;
          FUN_005ed290();
        }
        else {
          DAT_00637ea4 = local_14;
          if ((param_3 === 0xf120)) {
            FUN_005ed2c0();
          }
        }
        uVar2 = FUN_005dbe88(param_1, 0x112, param_3, param_4);
        return uVar2;
      }
      sVar1 = (((param_3 >>> 0x10)) & 0xFFFF);
      if ((param_2 === 0x114)) {
        local_18 = IsTracking(local_14);
        /* BRANCHIND */ () {
        case 0 :
          local_18 = (local_18 + -1);
          FUN_006e7ea8(param_1, 0, local_18, 1);
          local_18 = FUN_006e7ea4(param_1, 0);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_18);
          FUN_005ed3e0(local_18);
          return 0;
        case 1 :
          local_18 = (local_18 + 1);
          FUN_006e7ea8(param_1, 0, local_18, 1);
          local_18 = FUN_006e7ea4(param_1, 0);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_18);
          FUN_005ed3e0(local_18);
          return 0;
        case 2 :
          iVar4 = IsTracking(local_14);
          local_18 = (local_18 - iVar4);
          FUN_006e7ea8(param_1, 0, local_18, 1);
          local_18 = FUN_006e7ea4(param_1, 0);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_18);
          FUN_005ed3e0(local_18);
          return 0;
        case 3 :
          iVar4 = IsTracking(local_14);
          local_18 = (local_18 + iVar4);
          FUN_006e7ea8(param_1, 0, local_18, 1);
          local_18 = FUN_006e7ea4(param_1, 0);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_18);
          FUN_005ed3e0(local_18);
          return 0;
        case 4 :
          local_18 = ((sVar1) << 16 >> 16);
          FUN_006e7ea8(param_1, 0, local_18, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb0), 0, local_18);
          FUN_005ed3e0(s32((local_14 + 0xb0), 0));
          return 0;
        case 5 :
          DAT_00637ea4 = local_14;
          FUN_005ed420(((sVar1) << 16 >> 16));
          return 0;
        default :
          return 0;
        }
      }
      if ((param_2 === 0x115)) {
        local_18 = IsTracking(local_14);
        /* BRANCHIND */ () {
        case 0 :
          local_18 = (local_18 + -1);
          FUN_006e7ea8(param_1, 1, local_18, 1);
          local_18 = FUN_006e7ea4(param_1, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_18);
          FUN_005ed460(local_18);
          return 0;
        case 1 :
          local_18 = (local_18 + 1);
          FUN_006e7ea8(param_1, 1, local_18, 1);
          local_18 = FUN_006e7ea4(param_1, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_18);
          FUN_005ed460(local_18);
          return 0;
        case 2 :
          iVar4 = IsTracking(local_14);
          local_18 = (local_18 - iVar4);
          FUN_006e7ea8(param_1, 1, local_18, 1);
          local_18 = FUN_006e7ea4(param_1, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_18);
          FUN_005ed460(local_18);
          return 0;
        case 3 :
          iVar4 = IsTracking(local_14);
          local_18 = (local_18 + iVar4);
          FUN_006e7ea8(param_1, 1, local_18, 1);
          local_18 = FUN_006e7ea4(param_1, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_18);
          FUN_005ed460(local_18);
          return 0;
        case 4 :
          local_18 = ((sVar1) << 16 >> 16);
          FUN_006e7ea8(param_1, 1, local_18, 1);
          DAT_00637ea4 = local_14;
          w32((local_14 + 0xb4), 0, local_18);
          FUN_005ed460(s32((local_14 + 0xb4), 0));
          return 0;
        case 5 :
          DAT_00637ea4 = local_14;
          FUN_005ed4a0(((sVar1) << 16 >> 16));
          return 0;
        default :
          return 0;
        }
      }
      goto switchD_005ecda6_caseD_4;
    }
    if ((param_2 < 0x211)) {
      if ((param_2 === 0x210)) {
        if ((param_3 === 0x201)) {
          DAT_00637ea4 = local_14;
          FUN_005ecf90((param_4 & 0xffff), (param_4 >>> 0x10));
          return 0;
        }
        if ((param_3 !== 0x204)) {
          return 0;
        }
        DAT_00637ea4 = local_14;
        FUN_005ed050((param_4 & 0xffff), (param_4 >>> 0x10));
        return 0;
      }
      /* BRANCHIND */ () {
      case 0x201 :
        FUN_006e7e2c(param_1, 0);
        local_24 = FUN_00414d10();
        DAT_00637ea4 = local_14;
        if (((_MEM[(local_24 + 0x49)] & 2) !== 0)) {
          FUN_006e7d94(s32((local_24 + 4), 0));
          FUN_006e7da0(param_1);
        }
        w32((local_14 + 0xa8), 0, 1);
        FUN_005ecf90((param_4 & 0xffff), (param_4 >>> 0x10));
        return 0;
      case 0x202 :
        DAT_00637ea4 = local_14;
        if ((s32((local_14 + 0xa8), 0) === 1)) {
          w32((local_14 + 0xa8), 0, 0);
          FUN_005ed010((param_4 & 0xffff), (param_4 >>> 0x10));
        }
        FUN_005ecfd0((param_4 & 0xffff), (param_4 >>> 0x10));
        return 0;
      case 0x203 :
        DAT_00637ea4 = local_14;
        FUN_005ed110((param_4 & 0xffff), (param_4 >>> 0x10));
        return 0;
      case 0x204 :
        FUN_006e7e2c(param_1, 0);
        local_24 = FUN_00414d10();
        if (((_MEM[(local_24 + 0x49)] & 2) !== 0)) {
          FUN_006e7d94(s32((local_24 + 4), 0));
          FUN_006e7da0(param_1);
        }
        DAT_00637ea4 = local_14;
        w32((local_14 + 0xac), 0, 1);
        FUN_005ed050((param_4 & 0xffff), (param_4 >>> 0x10));
        return 0;
      case 0x205 :
        DAT_00637ea4 = local_14;
        if ((s32((local_14 + 0xac), 0) === 1)) {
          w32((local_14 + 0xac), 0, 0);
          FUN_005ed0d0((param_4 & 0xffff), (param_4 >>> 0x10));
        }
        FUN_005ed090((param_4 & 0xffff), (param_4 >>> 0x10));
        return 0;
      }
      goto switchD_005ecda6_caseD_4;
    }
    if ((param_2 !== 0x311)) param_2 = (param_2 !== 0x311) {
      if ((param_2 === 0x3b9)) {
        if ((param_3 === 1)) {
          FUN_005ed6e0();
          return 0;
        }
        goto switchD_005ecda6_caseD_5;
      }
      goto switchD_005ecda6_caseD_4;
    }
 switchD_005ecda6_caseD_6: :
    local_10 = IsTracking(local_14);
    if ((local_10 === 0)) {
      uVar2 = FUN_005dbe88(param_1, param_2, param_3, param_4);
      return uVar2;
    }
    FUN_006e7fac(s32((local_10 + 8), 0), 0x840, s32((local_10 + 0x10), 0), DAT_ffffffcc);
  }
  return 0;
}


 export function FUN_005eceda ()

 {
  return;
}


 export function FUN_005ecef0 ()

 {
  let SVar1;

  SVar1 = FUN_006e7d80(0x10);
  return ((((SVar1) << 16 >> 16) & 0x8000) !== 0);
}


 export function FUN_005ecf20 ()

 {
  let SVar1;

  SVar1 = FUN_006e7d80(0x11);
  return ((((SVar1) << 16 >> 16) & 0x8000) !== 0);
}


 export function FUN_005ecf50 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    in_ECX = s32(in_ECX, 0);
  }
  return;
}


 export function FUN_005ecf90 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 4), 0) !== 0)) {
    in_ECX = (in_ECX + 4);
  }
  return;
}


 export function FUN_005ecfd0 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 8), 0) !== 0)) {
    in_ECX = (in_ECX + 8);
  }
  return;
}


 export function FUN_005ed010 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0xc), 0) !== 0)) {
    in_ECX = (in_ECX + 0xc);
  }
  return;
}


 export function FUN_005ed050 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x10), 0) !== 0)) {
    in_ECX = (in_ECX + 0x10);
  }
  return;
}


 export function FUN_005ed090 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x14), 0) !== 0)) {
    in_ECX = (in_ECX + 0x14);
  }
  return;
}


 export function FUN_005ed0d0 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x18), 0) !== 0)) {
    in_ECX = (in_ECX + 0x18);
  }
  return;
}


 export function FUN_005ed110 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x1c);
  }
  return;
}


 export function FUN_005ed150 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x20), 0) !== 0)) {
    in_ECX = (in_ECX + 0x20);
  }
  return;
}


 export function FUN_005ed190 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x24), 0) !== 0)) {
    in_ECX = (in_ECX + 0x24);
  }
  return;
}


 export function FUN_005ed1d0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x28), 0) !== 0)) {
    in_ECX = (in_ECX + 0x28);
  }
  return;
}


 export function FUN_005ed210 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x2c);
  }
  return;
}


 export function FUN_005ed250 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) === 0)) {
    uVar1 = 0;
  }
  else {
    uVar1 = s32((in_ECX + 0x30), 0)();
  }
  return uVar1;
}


 export function FUN_005ed290 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    in_ECX = (in_ECX + 0x34);
  }
  return;
}


 export function FUN_005ed2c0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x38), 0) !== 0)) {
    in_ECX = (in_ECX + 0x38);
  }
  return;
}


 export function FUN_005ed2f0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x3c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x3c);
  }
  return;
}


 export function FUN_005ed320 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    in_ECX = (in_ECX + 0x40);
  }
  return;
}


 export function FUN_005ed360 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x44), 0) !== 0)) {
    in_ECX = (in_ECX + 0x44);
  }
  return;
}


 export function FUN_005ed3a0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x48), 0) !== 0)) {
    in_ECX = (in_ECX + 0x48);
  }
  return;
}


 export function FUN_005ed3e0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x4c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x4c);
  }
  return;
}


 export function FUN_005ed420 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x50), 0) !== 0)) {
    in_ECX = (in_ECX + 0x50);
  }
  return;
}


 export function FUN_005ed460 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x54), 0) !== 0)) {
    in_ECX = (in_ECX + 0x54);
  }
  return;
}


 export function FUN_005ed4a0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x58), 0) !== 0)) {
    in_ECX = (in_ECX + 0x58);
  }
  return;
}


 export function FUN_005ed4e0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x5c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x5c);
  }
  return;
}


 export function FUN_005ed520 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x60), 0) !== 0)) {
    in_ECX = (in_ECX + 0x60);
  }
  return;
}


 export function FUN_005ed550 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x64), 0) !== 0)) {
    in_ECX = (in_ECX + 0x64);
  }
  return;
}


 export function FUN_005ed580 ()

 {
  return;
}


 export function FUN_005ed5a0 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;
  let bVar1;

  bVar1 = (s32((in_ECX + 0x98), 0) !== 0);
  if (bVar1) {
    in_ECX = (in_ECX + 0x98);
  }
  return bVar1;
}


 export function FUN_005ed5f0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let bVar1;

  bVar1 = (s32((in_ECX + 0x9c), 0) !== 0);
  if (bVar1) {
    in_ECX = (in_ECX + 0x9c);
  }
  return bVar1;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* int */ /* __thiscall */ /* CSplitterWnd::IsTracking(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function IsTracking (this)

 {
  return s32((this + 0xb0), 0);
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* int */ /* __thiscall */ /* CSplitterWnd::IsTracking(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function IsTracking (this)

 {
  return s32((this + 0xb4), 0);
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* int */ /* __thiscall */ /* CSplitterWnd::IsTracking(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function IsTracking (this)

 {
  return s32((this + 0x90), 0);
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* int */ /* __thiscall */ /* CSplitterWnd::IsTracking(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function IsTracking (this)

 {
  return s32((this + 0x94), 0);
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* int */ /* __thiscall */ /* CSplitterWnd::IsTracking(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function IsTracking (this)

 {
  return s32((this + 0xb8), 0);
}


 export function FUN_005ed6e0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0xbc), 0) !== 0)) {
    in_ECX = (in_ECX + 0xbc);
  }
  return;
}


 export function FUN_005ed710 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let hdc;
  let h;
  let hdc_00;
  let hdc_01;
  let h_00;
  let h_01;
  let h_02;
  let h_03;

  hdc = FUN_006e79f8(param_1);
  h = FUN_006e7a6c(hdc, param_2);
  hdc_00 = FUN_006e79f8(param_1);
  hdc_01 = FUN_006e79f8(param_1);
  h_00 = FUN_006e7a18(param_1, param_5, param_6);
  h_01 = FUN_006e7a6c(hdc_01, h_00);
  h_02 = FUN_006e7a60(param_5, param_6, 1, 1, 0);
  h_03 = FUN_006e7a6c(hdc_00, h_02);
  FUN_006e7a4c(hdc_01, 0xffffff);
  FUN_006e7a04(hdc_01, 0);
  FUN_006e7a4c(hdc, 0x808000);
  FUN_006e7a7c(hdc_00, 0, 0, param_5, param_6, hdc, param_7, param_8, 0xcc0020);
  FUN_006e7a7c(hdc_01, 0, 0, param_5, param_6, param_1, param_3, param_4, 0xcc0020);
  FUN_006e7a7c(hdc_01, 0, 0, param_5, param_6, hdc, param_7, param_8, 0x660046);
  FUN_006e7a7c(hdc_01, 0, 0, param_5, param_6, hdc_00, 0, 0, 0x8800c6);
  FUN_006e7a7c(hdc_01, 0, 0, param_5, param_6, hdc, param_7, param_8, 0x660046);
  FUN_006e7a7c(param_1, param_3, param_4, param_5, param_6, hdc_01, 0, 0, 0xcc0020);
  FUN_006e7a6c(hdc_00, h_03);
  FUN_006e7a94(h_02);
  FUN_006e7a6c(hdc_01, h_01);
  FUN_006e7a94(h_00);
  FUN_006e7a08(hdc_00);
  FUN_006e7a08(hdc_01);
  FUN_006e7a6c(hdc, h);
  FUN_006e7a08(hdc);
  return;
}


 export function FUN_005ed920 ()

 {
  let nNumberOfBytesToWrite;
  let lpNumberOfBytesWritten;
  let lpOverlapped;
  let local_42c;
  let local_40c;
  let local_c;
  let local_8;

  local_c = 0;
  local_c = FUN_006e7bcc(s_smeds.log_00639bec, -0x40000000, 0, 0, 2, 0x80, 0);
  if ((local_c !== -1)) {
    DAT_00639be8 = 1;
  }
  FUN_005f22d0(DAT_fffffbf4, s_********************_SMEDS_LOG_*_00639bf8);
  FUN_005f22e0(DAT_fffffbf4, s_File_Output_to:_00639c30);
  FUN_005f22e0(DAT_fffffbf4, s_smeds.log_00639c44);
  FUN_005f22e0(DAT_fffffbf4, DAT_00639c50);
  FUN_005f22e0(DAT_fffffbf4, s_SMEDS32_Version:_00639c54);
  _sprintf(DAT_fffffbd4, s_%d.%d.%d_00639c68, 2, 0, 0);
  FUN_005f22e0(DAT_fffffbf4, DAT_fffffbd4);
  FUN_005f22e0(DAT_fffffbf4, DAT_00639c7c);
  if ((DAT_00639be8 !== 0)) {
    lpOverlapped = 0;
    lpNumberOfBytesWritten = DAT_fffffff8;
    nNumberOfBytesToWrite = _strlen(DAT_fffffbf4);
    FUN_006e7c4c(local_c, DAT_fffffbf4, nNumberOfBytesToWrite, lpNumberOfBytesWritten, lpOverlapped);
    FUN_006e7c38(local_c);
  }
  FUN_006e7af4(DAT_fffffbf4);
  return 1;
}


 export function FUN_005eda65 ()

 {
  let nNumberOfBytesToWrite;
  let lpNumberOfBytesWritten;
  let lpOverlapped;
  let local_40c;
  let local_c;
  let local_8;

  local_c = 0;
  if ((DAT_00639be8 !== 0)) {
    local_c = FUN_006e7bcc(s_smeds.log_00639c84, -0x40000000, 0, 0, 3, 0x80, 0);
    FUN_006e7ba8(local_c, 0, 0, 2);
    FUN_005f22d0(DAT_fffffbf4, s_********************_LOG_CLOSED_*_00639c90);
    lpOverlapped = 0;
    lpNumberOfBytesWritten = DAT_fffffff8;
    nNumberOfBytesToWrite = _strlen(DAT_fffffbf4);
    FUN_006e7c4c(local_c, DAT_fffffbf4, nNumberOfBytesToWrite, lpNumberOfBytesWritten, lpOverlapped);
    FUN_006e7c38(local_c);
    FUN_006e7af4(DAT_fffffbf4);
  }
  return 1;
}


 export function FUN_005edb15 (param_1)

 {
  let hFile;
  let nNumberOfBytesToWrite;
  let lpNumberOfBytesWritten;
  let lpOverlapped;
  let local_8;

  if ((DAT_00639be8 !== 0)) {
    hFile = FUN_006e7bcc(s_smeds.log_00639ccc, -0x40000000, 0, 0, 3, 0x80, 0);
    FUN_006e7ba8(hFile, 0, 0, 2);
    lpOverlapped = 0;
    lpNumberOfBytesWritten = DAT_fffffff8;
    nNumberOfBytesToWrite = _strlen(param_1);
    FUN_006e7c4c(hFile, param_1, nNumberOfBytesToWrite, lpNumberOfBytesWritten, lpOverlapped);
    FUN_006e7c4c(hFile, DAT_00639cd8, 2, DAT_fffffff8, 0);
    FUN_006e7c38(hFile);
  }
  return 1;
}


 export function FUN_005edbb2 (param_1)

 {
  FUN_006e7af4(param_1);
  FUN_006e7af4(DAT_00639cdc);
  return 1;
}


 export function FUN_005edc6c (param_1, param_2, param_3, param_4, param_5)

 {
  let bVar1;
  let in_AL;
  let uVar2;
  let iVar3;
  let uVar4;
  let cVar6;
  let uVar5;

  uVar2 = ((param_3) & 0xFFFF);
  iVar3 = 0;
 LAB_005edc7f: :
  uVar5 = ((((param_5 << 8) | param_4)) & 0xFFFF);
 LAB_005edc85: :
  if ((((uVar5) & 0xFF) === 0)) {
    uVar4 = ((uVar5) & 0xFFFF);
    if (((((uVar5 >>> 8)) & 0xFF) === 0)) goto LAB_005edca2; {
    bVar1 = _MEM[param_2];
    param_2 = (param_2 + 1);
    in_AL = (bVar1 ^ 0x80);
    iVar3 = (iVar3 + 1);
    uVar4 = (((((uVar5 >>> 8) << 8) | (((uVar5) & 0xFF) + 0xff))) & 0xFFFF);
  }
  uVar5 = ((uVar4) & 0xFFFF);
  cVar6 = (((uVar4 >>> 8)) & 0xFF);
  if ((cVar6 !== 0)) {
    _MEM[param_1] = in_AL;
    param_1 = (param_1 + 1);
    uVar5 = (((((cVar6 + 0xff) << 8) | ((uVar4) & 0xFF))) & 0xFFFF);
  }
  goto LAB_005edc85;
 LAB_005edca2: :
  uVar2 = (uVar2 - 1);
  if ((uVar2 === 0)) {
    return iVar3;
  }
  goto LAB_005edc7f;
}


 export function FUN_005edcac (param_1, param_2, param_3, param_4, param_5)

 {
  let cVar1;
  let bVar2;
  let in_AL;
  let uVar3;
  let iVar4;
  let cVar5;
  let uVar6;
  let uVar7;

  uVar3 = ((param_3) & 0xFFFF);
  iVar4 = 0;
 LAB_005edcbf: :
  uVar7 = ((((param_5 << 8) | param_4)) & 0xFFFF);
 LAB_005edcc5: :
  cVar5 = ((uVar7) & 0xFF);
  uVar6 = ((uVar7) & 0xFFFF);
  if ((cVar5 === 0)) {
    if (((((uVar7 >>> 8)) & 0xFF) === 0)) goto LAB_005edcf2; {
    bVar2 = _MEM[param_2];
    param_2 = (param_2 + 1);
    in_AL = (bVar2 ^ 0x80);
    uVar6 = (((((uVar7 >>> 8) << 8) | (cVar5 + 0xff))) & 0xFFFF);
    iVar4 = (iVar4 + 1);
  }
  uVar7 = ((uVar6) & 0xFFFF);
  cVar5 = (((uVar6 >>> 8)) & 0xFF);
  if ((cVar5 !== 0)) {
    cVar1 = _MEM[param_1];
    _MEM[param_1] = (_MEM[param_1] + in_AL);
    if (/* INT_SCARRY */) {
      if ((_MEM[param_1] < 0)) {
        _MEM[param_1] = 0x7f;
      }
      else {
        _MEM[param_1] = 0x80;
      }
    }
    param_1 = (param_1 + 1);
    uVar7 = (((((cVar5 + 0xff) << 8) | ((uVar6) & 0xFF))) & 0xFFFF);
  }
  goto LAB_005edcc5;
 LAB_005edcf2: :
  uVar3 = (uVar3 - 1);
  if ((uVar3 === 0)) {
    return iVar4;
  }
  goto LAB_005edcbf;
}


 export function FUN_005edd00 (param_1, param_2)

 {
  FUN_006e7dd4(0, param_2, param_1, 0x2030);
  FUN_006e7b18();
  return;
}


 export function FUN_005edd2b (param_1, param_2)

 {
  let BVar1;
  let local_c;
  let local_8;

  local_8 = param_1;
  local_c = param_2;
  while ((_MEM[local_c] !== 0xd)) local_c = _MEM[local_c] local_c = _MEM[local_c] {
    _MEM[local_8] = _MEM[local_c];
    local_c = (local_c + 1);
    local_8 = (local_8 + 1);
    BVar1 = FUN_006e7c74(local_c, 1);
    if ((BVar1 !== 0)) {
      local_8[1] = 0;
      return 0;
    }
  }
  _MEM[local_8] = 0;
  return (local_c + 1);
}


 export function FUN_005eddaa (param_1)

 {
  _sprintf(param_1, s_Stack_trace_not_yet_available_in_00639ce4);
  return;
}


 export function FUN_005eddd0 ()

 {
  let MVar1;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_20 = 0;
  local_1c = 0;
  local_18 = s_avivideo_00639d10;
  local_14 = 0;
  local_10 = 0;
  local_c = 0;
  local_8 = 0;
  MVar1 = FUN_006e7fac(0, 0x803, 0x2000, DAT_ffffffe0);
  return (MVar1 === 0);
}


 export function FUN_005ede3b ()

 {
  let local_c;
  let local_8;

  local_8 = FUN_006e7fb4(s_avivideo_00639d1c);
  FUN_006e7fac(local_8, 0x804, 0, DAT_fffffff4);
  if ((DAT_00639d0c !== 0)) {
    FUN_006e7a94(DAT_00639d0c);
    DAT_00639d0c = 0;
  }
  return;
}


 export function FUN_005ede94 (param_1)

 {
  let local_8;

  FUN_006e7fac(s32((param_1 + 8), 0), 0x804, 0, DAT_fffffff8);
  return;
}


 export function FUN_005edebf (param_1, param_2)

 {
  let MVar1;
  let MVar2;
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
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_1c = 0;
  local_50 = 0;
  local_4c = 0;
  local_48 = 0;
  local_44 = param_2;
  local_40 = 0;
  local_3c = 0x40000000;
  local_38 = s32((param_1 + 4), 0);
  MVar1 = FUN_006e7fac(0, 0x803, 0x30200, DAT_ffffffb0);
  if ((MVar1 === 0)) {
    local_8 = FUN_005dce4f(0x14);
    local_1c = FUN_005dcdf9(local_8);
    w32(local_1c, 0, local_8);
    MVar2 = FUN_006e7fb4(s_avivideo_00639d28);
    w32(local_1c, 2, MVar2);
    local_18 = 0;
    local_14 = 0;
    local_10 = 5;
    local_c = 0;
    FUN_006e7fac(s32(local_1c, 2), 0x841, 0x40000, DAT_ffffffe8);
    local_2c = 0x4001;
    FUN_006e7fac(s32(local_1c, 2), 0x814, 0x100, DAT_ffffffcc);
    w32(local_1c, 3, local_30);
    w32(local_1c, 4, 0x20000);
  }
  return local_1c;
}


 export function FUN_005edfcd (param_1, param_2)

 {
  if ((param_2 === 0)) {
    w32((param_1 + 0x10), 0, 0x10000);
  }
  else {
    w32((param_1 + 0x10), 0, 0x20000);
  }
  return;
}


 export function FUN_005ee002 (param_1, param_2)

 {
  let local_10;

  local_10 = ((s16((param_1 + 4), 0)) & 0xFFFF);
  FUN_006e7fac(s32((param_2 + 8), 0), 0x806, 1, DAT_fffffff0);
  return;
}


 export function FUN_005ee04c (param_1, param_2)

 {
  let local_18;
  let local_14;

  FUN_006e7fac(s32((param_1 + 8), 0), 0x843, 0x20000, DAT_ffffffe8);
  FUN_006e7d68(param_2, DAT_ffffffec);
  return;
}


 export function FUN_005ee088 (param_1)

 {
  FUN_006e7fac(s32((param_1 + 8), 0), 0x807, 0x100, 0);
  return;
}


 export function FUN_005ee0b1 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  let puVar2;
  let iVar3;
  let pHVar4;
  let pHVar5;
  let pHVar6;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  uVar1 = FUN_005dce4f(0x4c);
  puVar2 = FUN_005dcdf9(uVar1);
  w32(puVar2, 0, uVar1);
  local_14 = FUN_006e7d8c(4);
  local_18 = 0x2000000;
  if (((param_2 & 4) === 0)) {
    if (((param_2 & 0x40) !== 0)) param_2 = (param_2 & 0x40) {
      if (((param_2 & 0x40) === 0)) param_2 = (param_2 & 0x40) {
        if (((param_2 & 1) !== 0)) {
          local_18 = 0x2800000;
          iVar3 = FUN_006e7d8c(5);
          local_c = iVar3 * 2;
          iVar3 = FUN_006e7d8c(6);
          local_10 = iVar3 * 2;
        }
      }
      else {
        local_18 = 0x2800000;
        iVar3 = FUN_006e7d8c(5);
        local_c = iVar3 * 2;
        iVar3 = FUN_006e7d8c(6);
        local_10 = iVar3 * 2;
      }
    }
    else {
      local_18 = 0x2400000;
      iVar3 = FUN_006e7d8c(0x20);
      local_c = iVar3 * 2;
      iVar3 = FUN_006e7d8c(0x21);
      local_10 = iVar3 * 2;
    }
  }
  else {
    local_18 = 0x2040000;
    iVar3 = FUN_006e7d8c(0x20);
    local_c = iVar3 * 2;
    iVar3 = FUN_006e7d8c(0x21);
    local_10 = iVar3 * 2;
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
  if ((param_7 !== 0)) param_7 = (param_7 !== 0) {
    local_18 = (local_18 | 0x44000000);
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
    local_20 = 0;
  }
  else {
    local_20 = s32((param_7 + 4), 0);
  }
  if ((param_6 === -1)) {
    local_24 = -0x80000000;
  }
  else {
    local_24 = (((local_10 + local_14) + param_6) + -1);
  }
  if ((param_5 === -1)) {
    local_28 = -0x80000000;
  }
  else {
    local_28 = (local_c + param_5);
  }
  if ((param_4 === -1)) {
    local_2c = -0x80000000;
  }
  else {
    local_2c = param_4;
  }
  if ((param_3 === -1)) {
    local_30 = -0x80000000;
  }
  else {
    local_30 = param_3;
  }
  pHVar4 = FUN_006e7d50(0, s_MSMovieClass_00639d34, param_1, local_18, local_30, local_2c, local_28, local_24, local_20, 0, DAT_006e4ff0, 0);
  w32(puVar2, 1, pHVar4);
  FUN_005bc1b5(s32(puVar2, 1));
  pHVar5 = FUN_006e7e10(s32(puVar2, 1));
  w32(puVar2, 2, pHVar5);
  pHVar6 = FUN_006e7dac(0, 0x7f00);
  w32(puVar2, 7, pHVar6);
  w32(puVar2, 6, 0);
  w32(puVar2, 0x11, 0);
  w32(puVar2, 5, 0);
  w32(puVar2, 3, 0);
  w32(puVar2, 9, 0);
  w32(puVar2, 0xa, 0);
  w32(puVar2, 0xb, 0);
  w32(puVar2, 0x12, param_2);
  w32(puVar2, 0xe, 0);
  w32(puVar2, 0xf, 0);
  return puVar2;
}


 export function FUN_005ee450 (param_1)

 {
  let iVar1;

  if ((iVar1 !== 0)) iVar1 = s32(param_1, 0) iVar1 = (iVar1 !== 0) {
    FUN_005dce29(iVar1);
    FUN_005dce96(iVar1);
  }
  return;
}


 export function FUN_005ee49a (param_1)

 {
  let local_2c;
  let local_28;
  let local_18;
  let local_c;
  let local_8;

  FUN_006e7fac(s32((param_1 + 8), 0), 0x843, 0x20000, DAT_ffffffe8);
  FUN_006e7d90(DAT_ffffffd8, 0, 0, local_c * 2, local_8 * 2);
  FUN_006e7fac(s32((param_1 + 8), 0), 0x842, 0x210000, DAT_ffffffd4);
  return;
}


 export function FUN_005ee4fd (param_1)

 {
  let local_8;

  FUN_006e7fac(s32((param_1 + 8), 0), 0x808, 2, DAT_fffffff8);
  return;
}


 export function FUN_005ee528 (param_1, param_2)

 {
  let local_c;
  let local_8;

  local_8 = param_2;
  FUN_006e7fac(s32((param_1 + 8), 0), 0x807, 0xa, DAT_fffffff4);
  return;
}


 export function FUN_005ee559 (param_1)

 {
  let local_1c;
  let local_18;
  let local_14;

  local_14 = 2;
  FUN_006e7fac(s32((param_1 + 8), 0), 0x814, 0x102, DAT_ffffffe4);
  return local_18;
}


 export function FUN_005ee591 (param_1, param_2)

 {
  let pvVar1;
  let plpal;
  let local_3c;
  let local_38;
  let local_30;
  let local_1c;
  let local_14;

  pvVar1 = FUN_006e7af0(0x40, 0x408);
  plpal = FUN_006e7ae4(pvVar1);
  w16(DAT_00000000, 0, 0x300);
  w16(DAT_00000002, 0, 0xec);
  FUN_006e7a3c(param_2, 0xa, 0xec, DAT_00000004);
  (local_3c < 0xec) (local_3c = 0; local_3c = (local_3c < 0xec); local_3c = (local_3c + 1)) {
    DAT_00000003[0] = 4;
  }
  DAT_00639d0c = FUN_006e7a8c(plpal);
  pvVar1 = FUN_006e7b3c(plpal);
  FUN_006e7b20(pvVar1);
  pvVar1 = FUN_006e7b3c(plpal);
  FUN_006e7b40(pvVar1);
  local_30 = FUN_006e7a8c(plpal);
  FUN_006e7fac(s32((param_1 + 8), 0), 0x876, 0x4007, DAT_ffffffc8);
  local_14 = 0x4004;
  FUN_006e7fac(s32((param_1 + 8), 0), 0x814, 0x100, DAT_ffffffe4);
  local_14 = 0x4018;
  FUN_006e7fac(s32((param_1 + 8), 0), 0x814, 0x100, DAT_ffffffe4);
  return;
}


 export function FUN_005ee6b1 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005ee8f1();
    FUN_005ee94b();
  }
  return;
}


 export function FUN_005ee6e3 (in_ECX, param_1, param_2)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005ee8f1();
    FUN_005ee94b();
  }
  iVar1 = FUN_00414d10(DAT_006e4ff0, 0x4000010a, param_2);
  iVar1 = MCIWndCreateA(s32((iVar1 + 4), 0));
  w32(in_ECX, 0, iVar1);
  FUN_006e7d6c(s32(in_ECX, 0), 0x477, 0, 0x639d44);
  return;
}


 export function FUN_005ee757 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005ee8f1();
    FUN_005ee94b();
  }
  iVar1 = FUN_00414d10(DAT_006e4ff0, 0x4000010a, 0);
  iVar1 = MCIWndCreateA(s32((iVar1 + 4), 0));
  w32(in_ECX, 0, iVar1);
  return;
}


 export function FUN_005ee7b1 (in_ECX, param_1, param_2)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let uVar2;
  let uVar3;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005ee8f1();
    FUN_005ee94b();
  }
  uVar3 = 0x4000010a;
  uVar2 = DAT_006e4ff0;
  iVar1 = IsTracking(param_1);
  iVar1 = MCIWndCreateA(s32((iVar1 + 4), 0), uVar2, uVar3, param_2);
  w32(in_ECX, 0, iVar1);
  FUN_006e7d6c(s32(in_ECX, 0), 0x477, 0, 0x639d4c);
  return;
}


 export function FUN_005ee825 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let uVar2;
  let uVar3;
  let uVar4;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005ee8f1();
    FUN_005ee94b();
  }
  uVar4 = 0;
  uVar3 = 0x4000010a;
  uVar2 = DAT_006e4ff0;
  iVar1 = IsTracking(param_1);
  iVar1 = MCIWndCreateA(s32((iVar1 + 4), 0), uVar2, uVar3, uVar4);
  w32(in_ECX, 0, iVar1);
  return;
}


 export function FUN_005ee87f (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d6c(s32(in_ECX, 0), 0x499, 0, param_1);
  FUN_006e7d6c(s32(in_ECX, 0), 0x477, 0, 0x639d54);
  return;
}


 export function FUN_005ee8c6 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d6c(s32(in_ECX, 0), 0x806, 0, 0);
  return;
}


 export function FUN_005ee8f1 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d6c(s32(in_ECX, 0), 0x808, 0, 0);
  return;
}


 export function FUN_005ee91c (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d6c(s32(in_ECX, 0), 0x807, 0, param_1);
  return;
}


 export function FUN_005ee94b (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d6c(s32(in_ECX, 0), 0x804, 0, 0);
  FUN_006e7d6c(s32(in_ECX, 0), 0x10, 0, 0);
  w32(in_ECX, 0, 0);
  return;
}


 export function FUN_005ee991 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d6c(s32(in_ECX, 0), 0x807, 0, -1);
  return;
}


 export function FUN_005ee9bc (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d6c(s32(in_ECX, 0), 0x466, 0, 0);
  return;
}


 export function FUN_005ee9e7 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d6c(s32(in_ECX, 0), 0x809, 0, 0);
  return;
}


 export function FUN_005eea12 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_006e7e4c(s32(in_ECX, 0), param_1);
  return;
}


 export function FUN_005eea3a (in_ECX)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_28;
  let local_18;
  let local_14;

  FUN_006e7e38(s32(in_ECX, 0), DAT_ffffffd8);
  local_18 = FUN_006e7e40(s32(in_ECX, 0));
  FUN_006e7e4c(local_18, DAT_ffffffec);
  iVar1 = FUN_00407f90(DAT_ffffffec);
  iVar2 = FUN_00407f90(DAT_ffffffd8);
  iVar3 = FUN_00407fc0(DAT_ffffffec);
  iVar4 = FUN_00407fc0(DAT_ffffffd8);
  FUN_006e7db8(s32(in_ECX, 0), 0, ((iVar1 - iVar2) >> 1), ((iVar3 - iVar4) >> 1), 0, 0, 5);
  return;
}


 export function FUN_005eeadd (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_006e7db8(s32(in_ECX, 0), 0, 0, 0, param_1, param_2, 6);
  return;
}


 export function FUN_005eeb11 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_006e7db8(s32(in_ECX, 0), 0, param_1, param_2, 0, 0, 5);
  return;
}


 export function FUN_005eeb45 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7e24(s32(in_ECX, 0), 5);
  FUN_006e7d6c(s32(in_ECX, 0), 0x476, 0, 0);
  return;
}


 export function FUN_005eeb7e (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7e24(s32(in_ECX, 0), 0);
  return;
}


 export function FUN_005eeba2 (in_ECX, param_1)

 {
  let wParam;
  // in_ECX promoted to parameter;
  let lParam;

  lParam = 0;
  wParam = IsTracking(param_1);
  FUN_006e7d6c(s32(in_ECX, 0), 0x47f, wParam, lParam);
  return;
}


 export function FUN_005eebd6 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_40c;
  let auStack_40a;
  let local_c;
  let local_8;

  local_8 = FUN_006e7d6c(s32(in_ECX, 0), 0x47e, 0, 0);
  FUN_006e7a3c(local_8, 0, 0x100, DAT_fffffbf4);
  (local_c < 0x100) (local_c = 0; local_c = (local_c < 0x100); local_c = (local_c + 1)) {
    FUN_005c6b93(local_c, s32((DAT_fffffbf4 + local_c * 4), 0), s32((DAT_fffffbf4 + (local_c * 4 + 1)), 0), s32((DAT_fffffbf4 + (local_c * 4 + 2)), 0));
  }
  return;
}


 /* /*  */ /* Library */ /* Function */ /* - */ /* Single */ /* Match */
    /* public: */ /* int */ /* __thiscall */ /* CSplitterWnd::IsTracking(void) */

   /* Library: */ /* Visual */ /* Studio */ /* 1998 */ /* Debug */ /*  */ */

 export function IsTracking (this)

 {
  return s32((this + 0xb0), 0);
}


 export function FUN_005eeca0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 4), 0, 0);
  return in_ECX;
}


 export function FUN_005eecc3 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_005d52a2(param_1);
  if ((iVar1 === 0)) {
    w32((in_ECX + 2), 0, param_1);
    w16(in_ECX, 0, (s16(in_ECX, 0) | 1));
  }
  else {
    w16(in_ECX, 2, 0);
    w16(in_ECX, 3, 0);
  }
  return in_ECX;
}


 export function FUN_005eed1b (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 4), 0) !== 0)) {
    FUN_005d5b88();
  }
  return;
}


 export function FUN_005eed43 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return ((s16(in_ECX, 0) & 4) !== 0);
}


 export function FUN_005eed76 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_005d52a2(param_1);
  if ((iVar1 === 0)) {
    w32((in_ECX + 2), 0, param_1);
    w16(in_ECX, 0, (s16(in_ECX, 0) | 1));
  }
  else {
    w16(in_ECX, 0, 0);
  }
  return iVar1;
}


 export function FUN_005eedd1 ()

 {
  FUN_005d5643();
  return;
}


 export function FUN_005eedec (in_ECX, param_1, param_2)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = FUN_005d5d11(param_1, param_2);
  if ((iVar1 === 0)) {
    w16(in_ECX, 0, (s16(in_ECX, 0) | 2));
  }
  else {
    w16(in_ECX, 0, (s16(in_ECX, 0) & 0xfffd));
  }
  return iVar1;
}


 export function FUN_005eee4f ()

 {
  FUN_005d5f91();
  return 0;
}


 export function FUN_005eee6d ()

 {
  return 0;
}


 export function FUN_005eee86 ()

 {
  return;
}


 export function FUN_005eeeb0 (param_1, param_2, param_3)

 {
  let iVar1;
  let local_10;
  let local_c;

  local_c = 0;
  /* BRANCHIND */ () {
  case 0 :
    local_c = 0x40;
    break;
  case 1 :
    local_c = 0x20;
    break;
  case 2 :
    local_c = 0x30;
    break;
  case 3 :
    local_c = 0x10;
  }
  /* BRANCHIND */ () {
  case 1 :
    break;
  case 2 :
    local_c = (local_c | 1);
    break;
  case 4 :
    local_c = (local_c | 4);
    break;
  case 8 :
    local_c = (local_c | 3);
    break;
  case 0x10 :
    local_c = (local_c | 2);
    break;
  case 0x20 :
    local_c = (local_c | 5);
  }
  iVar1 = FUN_006e7dd4(0, param_1, s_Potentially_fatal_error_00639d5c, (local_c | 0x2000));
  /* BRANCHIND */ () {
  case 1 :
    local_10 = 0;
    break;
  case 2 :
    local_10 = 1;
    break;
  case 3 :
    local_10 = 4;
    break;
  case 4 :
    local_10 = 5;
    break;
  case 5 :
    local_10 = 6;
    break;
  case 6 :
    local_10 = 2;
    break;
  case 7 :
    local_10 = 3;
  }
  return local_10;
}


 export function FUN_005ef0b9 (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let local_10;
  let local_c;

  local_c = 0;
  /* BRANCHIND */ () {
  case 0 :
    local_c = 0x40;
    break;
  case 1 :
    local_c = 0x20;
    break;
  case 2 :
    local_c = 0x30;
    break;
  case 3 :
    local_c = 0x10;
  }
  /* BRANCHIND */ () {
  case 1 :
    break;
  case 2 :
    local_c = (local_c | 1);
    break;
  case 4 :
    local_c = (local_c | 4);
    break;
  case 8 :
    local_c = (local_c | 3);
    break;
  case 0x10 :
    local_c = (local_c | 2);
    break;
  case 0x20 :
    local_c = (local_c | 5);
  }
  iVar1 = FUN_006e7dd4(0, param_2, param_1, (local_c | 0x2000));
  /* BRANCHIND */ () {
  case 1 :
    local_10 = 0;
    break;
  case 2 :
    local_10 = 1;
    break;
  case 3 :
    local_10 = 4;
    break;
  case 4 :
    local_10 = 5;
    break;
  case 5 :
    local_10 = 6;
    break;
  case 6 :
    local_10 = 2;
    break;
  case 7 :
    local_10 = 3;
  }
  return local_10;
}


 export function FUN_005ef320 (param_1, param_2)

 {
  FUN_006e7db4(s32((param_2 + 4), 0), 4, param_1);
  FUN_006e7db4(s32((param_2 + 4), 0), 0, param_2);
  return;
}


 export function FUN_005ef356 (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let puVar2;
  let pHVar3;
  let local_14;
  let local_10;

  uVar1 = FUN_005dce4f(0x1c);
  puVar2 = FUN_005dcdf9(uVar1);
  w32(puVar2, 0, uVar1);
  w32(puVar2, 3, param_3);
  w32(puVar2, 2, param_4);
  w32(puVar2, 5, 0);
  if ((param_4 === -1)) {
    local_10 = -0x80000000;
  }
  else {
    local_10 = param_4;
  }
  if ((param_3 === -1)) {
    local_14 = -0x80000000;
  }
  else {
    local_14 = param_3;
  }
  pHVar3 = FUN_006e7d50(4, s_MSDirectWindow_00639d78, param_1, -0x80000000, -0x80000000, -0x80000000, local_14, local_10, 0, 0, DAT_006e4ff0, 0);
  w32(puVar2, 1, pHVar3);
  return puVar2;
}


 export function FUN_005ef41e (in_EAX, param_1, param_2)

 {
  // in_EAX promoted to parameter;
  let uVar1;
  let local_c;

  if ((DAT_006394c0 === 0)) {
    uVar1 = (in_EAX & -0x100);
  }
  else {
    if ((param_2 === 0)) {
      local_c = 8;
    }
    else if ((param_2 === 1)) {
      local_c = 0x11;
    }
    else if ((param_2 === 2)) {
      local_c = 0x51;
    }
    uVar1 = s32((s32(DAT_006394c0, 0) + 0x50), 0)(DAT_006394c0, s32((param_1 + 4), 0), local_c);
    if ((uVar1 === 0)) {
      uVar1 = 1;
    }
    else {
      uVar1 = FUN_005d2279(s_DD->SetCooperativeLevel_failed_00639d88, (uVar1 & 0xffff));
      uVar1 = (uVar1 & -0x100);
    }
  }
  return uVar1;
}


 export function FUN_005ef4e3 (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let uVar2;

  if ((DAT_006394c0 === 0)) {
    uVar1 = 0;
  }
  else {
    w32((param_1 + 0xc), 0, param_2);
    w32((param_1 + 8), 0, param_3);
    w32((param_1 + 0x10), 0, param_4);
    uVar2 = s32((s32(DAT_006394c0, 0) + 0x54), 0)(DAT_006394c0, param_2, param_3, param_4);
    if ((uVar2 === 0)) {
      FUN_006e7e34(s32((param_1 + 4), 0), 0, 0, s32((param_1 + 0xc), 0), s32((param_1 + 8), 0), 1);
      uVar1 = 1;
    }
    else {
      FUN_005d2279(s_DD->SetDisplayMode_failed_00639da8, (uVar2 & 0xffff));
      uVar1 = 0;
    }
  }
  return uVar1;
}


 export function FUN_005ef58e (in_EAX)

 {
  // in_EAX promoted to parameter;
  let uVar1;

  if ((DAT_006394c0 === 0)) {
    uVar1 = (in_EAX & -0x100);
  }
  else {
    uVar1 = s32((s32(DAT_006394c0, 0) + 0x4c), 0)(DAT_006394c0);
    if ((uVar1 === 0)) {
      uVar1 = 1;
    }
    else {
      uVar1 = (uVar1 & -0x100);
    }
  }
  return uVar1;
}


 export function FUN_005ef5db (param_1)

 {
  let uVar1;

  if ((param_1 !== 0)) {
    if ((s32(param_1, 5) === 0)) {
      if ((s32(param_1, 1) !== 0)) {
        FUN_006e7e24(s32(param_1, 1), 0);
        FUN_006e7e1c(s32(param_1, 1));
      }
      w32(param_1, 1, 0);
    }
    uVar1 = s32(param_1, 0);
    FUN_005dce29(uVar1);
    FUN_005dce96(uVar1);
  }
  return 0;
}


 export function FUN_005ef65a (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e24(s32((param_1 + 4), 0), 5);
    FUN_006e7e8c(s32((param_1 + 4), 0));
  }
  return (param_1 !== 0);
}


 export function FUN_005ef699 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e24(s32((param_1 + 4), 0), 0);
  }
  return (param_1 !== 0);
}


 export function FUN_005ef6cb (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let DVar2;
  let LVar3;
  let uVar4;
  let iVar5;
  let uVar6;

  DVar2 = FUN_006e7e9c(param_1, 4);
  if ((DVar2 === 0)) {
    LVar3 = FUN_006e7e80(param_1, param_2, param_3, param_4);
    return LVar3;
  }
  if ((param_2 < 0x11)) {
    if ((param_2 !== 0x10)) {
      if ((param_2 === 2)) {
        DVar2 = FUN_006e7e9c(param_1, 0);
        w32((DVar2 + 0x14), 0, 1);
        LVar3 = FUN_006e7e80(param_1, 2, param_3, param_4);
        return LVar3;
      }
      goto switchD_005efc68_default;
    }
    iVar5 = FUN_005ed250();
    if ((iVar5 !== 0)) {
      LVar3 = FUN_006e7e80(param_1, 0x10, param_3, param_4);
      return LVar3;
    }
  }
  else if ((param_2 < 0x45)) {
    if ((param_2 !== 0x44)) {
      if ((param_2 !== 0x1c)) goto switchD_005efc68_default; {
        FUN_005efd70(param_3);
        DAT_00639d74 = param_3;
      }
    }
  }
  else if ((param_2 < 0x201)) {
    if ((param_2 === 0x200)) {
      cVar1 = FUN_005f0391(0x200, (param_4 & 0xffff), (param_4 >>> 0x10));
      if ((cVar1 === 0)) {
        FUN_005ecf50((param_4 & 0xffff), (param_4 >>> 0x10));
      }
    }
    else if ((param_2 === 0x100)) {
      uVar6 = 0;
      uVar4 = FUN_005eb3ed(param_3, 0);
      cVar1 = FUN_005f0391(0x100, uVar4, uVar6);
      if ((cVar1 === 0)) {
        uVar4 = FUN_005eb3ed(param_3);
        FUN_005ed150(uVar4);
        uVar4 = FUN_005eb3ed(param_3);
        FUN_005ed1d0(uVar4);
      }
    }
    else if ((param_2 === 0x101)) {
      uVar4 = FUN_005eb3ed(param_3);
      FUN_005ed190(uVar4);
    }
    else {
      if ((param_2 !== 0x102)) goto switchD_005efc68_default; cVar1 = FUN_005f0391(0x102, (param_3 & 0xff), 0) {
        FUN_005ed210((param_3 & 0xff));
      }
    }
  }
  else if ((param_2 < 0x211)) {
    if ((param_2 === 0x210)) {
      if (((param_3 & 0xffff) === 0x201)) {
        FUN_005ecf90((param_4 & 0xffff), (param_4 >>> 0x10));
      }
      else if (((param_3 & 0xffff) === 0x204)) {
        FUN_005ed050((param_4 & 0xffff), (param_4 >>> 0x10));
      }
    }
    else {
      /* BRANCHIND */ () {
      case 0x201 :
        cVar1 = FUN_005f0391(param_2, (param_4 & 0xffff), (param_4 >>> 0x10));
        if ((cVar1 === 0)) {
          w32((DVar2 + 0xd0), 0, 1);
          FUN_005ecf90((param_4 & 0xffff), (param_4 >>> 0x10));
        }
        break;
      case 0x202 :
        cVar1 = FUN_005f0391(param_2, (param_4 & 0xffff), (param_4 >>> 0x10));
        if ((cVar1 === 0)) {
          if ((s32((DVar2 + 0xd0), 0) === 1)) {
            w32((DVar2 + 0xd0), 0, 0);
            FUN_005ed010((param_4 & 0xffff), (param_4 >>> 0x10));
          }
          FUN_005ecfd0((param_4 & 0xffff), (param_4 >>> 0x10));
        }
        break;
      case 0x203 :
        cVar1 = FUN_005f0391(param_2, (param_4 & 0xffff), (param_4 >>> 0x10));
        if ((cVar1 === 0)) {
          FUN_005ed110((param_4 & 0xffff), (param_4 >>> 0x10));
        }
        break;
      case 0x204 :
        cVar1 = FUN_005f0391(param_2, (param_4 & 0xffff), (param_4 >>> 0x10));
        if ((cVar1 === 0)) {
          w32((DVar2 + 0xd4), 0, 1);
          FUN_005ed050((param_4 & 0xffff), (param_4 >>> 0x10));
        }
        break;
      case 0x205 :
        cVar1 = FUN_005f0391(param_2, (param_4 & 0xffff), (param_4 >>> 0x10));
        if ((cVar1 === 0)) {
          if ((s32((DVar2 + 0xd4), 0) === 1)) {
            w32((DVar2 + 0xd4), 0, 0);
            FUN_005ed0d0((param_4 & 0xffff), (param_4 >>> 0x10));
          }
          FUN_005ed090((param_4 & 0xffff), (param_4 >>> 0x10));
        }
        break;
      default :
        goto switchD_005efc68_default;
      }
    }
  }
  else {
    if ((param_2 !== 0x4c8)) {
 switchD_005efc68_default: :
      LVar3 = FUN_006e7e80(param_1, param_2, param_3, param_4);
      return LVar3;
    }
    if ((param_4 === 0x20d)) {
      FUN_005ed4e0(0);
    }
  }
  return 0;
}


 export function FUN_005efca3 (param_1, param_2)

 {
  param_2 = param_2(s32((param_1 + 0xc), 0), s32((param_1 + 8), 0), s32((param_1 + 0x54), 0));
  return 1;
}


 export function FUN_005efcde (param_1, param_2)

 {
  if ((param_2 !== 0)) param_1 = (param_1 !== 0) param_2 = (param_2 !== 0) {
    DAT_006394c0 = s32(DAT_006394c0, 0);
    DAT_006394c0 = s32(DAT_006394c0, 0);
    DAT_006394c0 = s32(DAT_006394c0, 0);
  }
  return;
}


 export function FUN_005efd70 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0xbc), 0) !== 0)) {
    in_ECX = (in_ECX + 0xbc);
  }
  return;
}


 export function FUN_005efdc0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005efe97;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005e5ea0();
  local_8 = 0;
  in_ECX = (in_ECX + 0x44);
  local_8 = ((((local_8) >> 8) << 8) | 1);
  FUN_005f0520();
  w32((in_ECX + 0xb0), 0, 0);
  w32((in_ECX + 0xb4), 0, 0);
  w32((in_ECX + 0xb8), 0, 0);
  w32((in_ECX + 0xac), 0, 0);
  w32((in_ECX + 0xcc), 0, 0);
  w32((in_ECX + 0xbc), 0, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_005efeb0 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_005eff6b;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 2;
  uVar1 = FUN_005ef5db(s32((in_ECX + 0xb0), 0));
  w32((in_ECX + 0xb0), 0, uVar1);
  FUN_005f029e();
  local_8 = 1;
  FUN_005eff2b();
  local_8 = (0 << 8);
  FUN_005eff3a();
  local_8 = -1;
  FUN_005eff62();
  FUN_005eff75();
  return;
}


 export function FUN_005eff2b ()

 {
  FUN_005f04c0();
  return;
}


 export function FUN_005eff3a (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  if ((s32((unaff_EBP + -20), 0) === 0)) {
    w32((unaff_EBP + -16), 0, 0);
  }
  else {
    w32((unaff_EBP + -16), 0, (s32((unaff_EBP + -20), 0) + 0x44));
  }
  FUN_0044ca40();
  return;
}


 export function FUN_005eff62 ()

 {
  FUN_005e5ee0();
  return;
}


 export function FUN_005eff75 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005eff83 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005ef356(param_1, param_2, param_3, param_4);
  w32((in_ECX + 0xb0), 0, uVar1);
  FUN_005ef320(in_ECX, s32((in_ECX + 0xb0), 0));
  w32((in_ECX + 0xb4), 0, param_5);
  FUN_005f01ad(param_6);
  return 1;
}


 export function FUN_005effec (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005ef356(DAT_00639dc4, param_1, param_2, param_3);
  w32((in_ECX + 0xb0), 0, uVar1);
  FUN_005ef320(in_ECX, s32((in_ECX + 0xb0), 0));
  w32((in_ECX + 0xb4), 0, param_4);
  FUN_005f01ad(param_5);
  return 1;
}
