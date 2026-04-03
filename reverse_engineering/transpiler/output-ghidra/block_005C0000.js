// Block 0x005C0000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 339

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_005c000d ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005c0023 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c0034 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d90((in_ECX + 0x14), s32((in_ECX + 0x24), 0), s32((in_ECX + 0x28), 0), s32((in_ECX + 0x2c), 0), s32((in_ECX + 0x30), 0));
  return;
}


 export function FUN_005c0073 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_006e7d90((in_ECX + 0x14), s32(param_1, 0), s32(param_1, 1), s32(param_1, 2), s32(param_1, 3));
  FUN_006e7d48((in_ECX + 0x14), (in_ECX + 0x14), (in_ECX + 0x24));
  return;
}


 export function FUN_005c00ce (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32(param_1, 0, s32((in_ECX + 0x14), 0));
  w32(param_1, 1, s32((in_ECX + 0x18), 0));
  w32(param_1, 2, s32((in_ECX + 0x1c), 0));
  w32(param_1, 3, s32((in_ECX + 0x20), 0));
  return;
}


 export function FUN_005c0105 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  /* switch */ (s32((in_ECX + 0x44), 0) ( *) ((in_ECX + 0x44)  )) {
  case 1 :
    uVar1 = FUN_005bd696(param_1);
    break;
  case 2 :
    uVar1 = FUN_005c1b47(param_1);
    break;
  case 3 :
    uVar1 = FUN_005c1cf7(param_1);
    break;
  case 4 :
    uVar1 = FUN_005c1ea7(param_1);
    break;
  default :
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_005c019d (param_1)

 {
  FUN_005bd696(param_1);
  return;
}


 export function FUN_005c01c1 (in_ECX)

 {
  let uVar1;
  let pvVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0x34), 0) === 0)) {
    uVar1 = FUN_005e3a81(s32((in_ECX + 0x40), 0));
    w32((in_ECX + 0x34), 0, uVar1);
    if ((s32((in_ECX + 0x34), 0) !== 0)) {
      pvVar2 = operator_new((s32((in_ECX + 8), 0) << 2));
      w32((in_ECX + 0x38), 0, pvVar2);
      iVar3 = FUN_005e395a(s32((in_ECX + 0x40), 0));
      if ((iVar3 === 0)) {
        w32(s32((in_ECX + 0x38), 0), 0, (s32((in_ECX + 8), 0) + -1) * s32((in_ECX + 0xc), 0));
        for (/* cond: (local_8 < s32((in_ECX + 8), 0)) */); local_8 = (local_8 < s32((in_ECX + 8), 0)); local_8 = (local_8 + 1)) {
          w32((s32((in_ECX + 0x38), 0) + local_8 * 4), 0, (s32(((s32((in_ECX + 0x38), 0) + -4) + local_8 * 4), 0) - s32((in_ECX + 0xc), 0)));
        }
      }
      else {
        w32(s32((in_ECX + 0x38), 0), 0, 0);
        for (/* cond: (local_8 < s32((in_ECX + 8), 0)) */); local_8 = (local_8 < s32((in_ECX + 8), 0)); local_8 = (local_8 + 1)) {
          w32((s32((in_ECX + 0x38), 0) + local_8 * 4), 0, (s32(((s32((in_ECX + 0x38), 0) + -4) + local_8 * 4), 0) + s32((in_ECX + 0xc), 0)));
        }
      }
    }
  }
  return;
}


 export function FUN_005c02e0 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    uVar1 = FUN_005e3aa8(s32((in_ECX + 0x40), 0));
    w32((in_ECX + 0x34), 0, uVar1);
    operator_delete(s32((in_ECX + 0x38), 0));
  }
  return;
}


 export function FUN_005c0333 (in_ECX, param_1, param_2)

 {
  let cVar1;
  let pCVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 1;
  cVar1 = FUN_005c54f0();
  if ((cVar1 === 0)) {
    FUN_005d225b(s_Warning:_Port_not_locked_in_Fill_006370c4);
    local_8 = 0;
    FUN_005c01c1();
  }
  FUN_006e7d48(DAT_ffffffe0, param_1, (in_ECX + 0x14));
  local_c = FUN_00407f90(DAT_ffffffe0);
  if ((local_10 !== 0)) {
    pCVar2 = GetActiveView(in_ECX);
    uVar3 = GetCheckStyle(in_ECX);
    iVar4 = FUN_005e395a(uVar3, pCVar2);
    iVar5 = FUN_005c55d0();
    FUN_005e4e60(s32((in_ECX + 0x34), 0), param_2, UNNAMED, UNNAMED, local_c, local_10, (((-u8((iVar4 === 0))) & -2) + 1) * iVar5);
  }
  return;
}


 export function FUN_005c041f (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005c0333((in_ECX + 0x14), param_1);
  return;
}


 export function FUN_005c044a (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005c0479((in_ECX + 0x14), param_1, param_2);
  return;
}


 export function FUN_005c0479 (in_ECX, param_1, param_2, param_3)

 {
  let cVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 1;
  cVar1 = FUN_005c54f0();
  if ((cVar1 === 0)) {
    FUN_005d225b(s_Warning:_Port_not_locked_in_Chan_006370ec);
    local_8 = 0;
    FUN_005c01c1();
  }
  FUN_006e7d48(DAT_ffffffdc, param_1, (in_ECX + 0x14));
  local_c = FUN_00407f90(DAT_ffffffdc);
  local_28 = FUN_005c19d3(UNNAMED, UNNAMED);
  local_14 = 0;
  while ((iVar2 <= local_14)) {
    iVar2 = FUN_00407fc0(DAT_ffffffdc);
    if ((iVar2 <= local_14));
    while ((iVar2 <= local_10)) {
      iVar2 = FUN_00407f90(DAT_ffffffdc);
      if ((iVar2 <= local_10)) {
        _MEM[local_28] = param_3;
      }
      local_28 = (local_28 + 1);
      local_10 = (local_10 + 1);
    }
    iVar2 = FUN_005c5610(local_28);
    local_28 = (iVar2 - local_c);
    local_14 = (local_14 + 1);
  }
  if ((local_8 === 0)) {
    FUN_005c02e0();
  }
  return;
}


 export function FUN_005c0593 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let pCVar5;
  let pCVar6;
  let uVar7;
  // in_ECX promoted to parameter;
  let local_30;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 1;
  iVar1 = s32((in_ECX + 0x34), 0);
  if ((iVar1 === 0)) {
    FUN_005d225b(s_Warning:_Source_Port_not_locked_i_00637114);
    FUN_005c01c1();
  }
  if ((s32((param_1 + 0x34), 0) === 0)) {
    FUN_005d225b(s_Warning:_Destination_Port_not_lo_00637144);
    FUN_005c01c1();
    local_10 = 0;
  }
  FUN_006e7d48(DAT_ffffffe0, param_2, (in_ECX + 0x14));
  FUN_006e7d48(DAT_ffffffd0, param_3, (param_1 + 0x14));
  local_8 = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) {
    local_8 = (UNNAMED - UNNAMED);
  }
  local_c = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) {
    local_c = (UNNAMED - UNNAMED);
  }
  if ((local_c !== 0)) {
    uVar2 = GetCheckStyle(param_1);
    iVar3 = FUN_005e395a(uVar2);
    iVar4 = FUN_005c55d0();
    iVar4 = (((-u8((iVar3 === 0))) & -2) + 1) * iVar4;
    uVar2 = GetCheckStyle(in_ECX);
    iVar3 = FUN_005e395a(uVar2, iVar4);
    iVar4 = FUN_005c55d0();
    iVar4 = (((-u8((iVar3 === 0))) & -2) + 1) * iVar4;
    pCVar5 = GetActiveView(param_1);
    pCVar6 = GetActiveView(in_ECX);
    uVar7 = FUN_005c5640(s32((in_ECX + 0x44), 0) * UNNAMED, UNNAMED, s32((in_ECX + 0x44), 0) * UNNAMED, UNNAMED, s32((in_ECX + 0x44), 0) * local_8, local_c, pCVar6, pCVar5, iVar4);
    uVar7 = FUN_005c5640(uVar7);
    FUN_005e4f9b(uVar7);
  }
  if ((iVar1 === 0)) {
    FUN_005c02e0();
  }
  if ((local_10 === 0)) {
    FUN_005c02e0();
  }
  return;
}


 export function FUN_005c0753 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let iVar5;
  let pCVar6;
  // in_ECX promoted to parameter;
  let local_34;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 1;
  iVar1 = s32((in_ECX + 0x34), 0);
  if ((iVar1 === 0)) {
    FUN_005d225b(s_Warning:_Source_Port_not_locked_i_00637178);
    FUN_005c01c1();
  }
  local_14 = FUN_005e6188();
  if ((local_14 !== 0)) {
    local_10 = 0;
    FUN_006e7d48(DAT_ffffffdc, param_2, (in_ECX + 0x14));
    FUN_006e7d48(DAT_ffffffcc, param_3, (param_1 + 0x10));
    local_8 = (UNNAMED - UNNAMED);
    if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) {
      local_8 = (UNNAMED - UNNAMED);
    }
    local_c = (UNNAMED - UNNAMED);
    if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) {
      local_c = (UNNAMED - UNNAMED);
    }
    if ((local_c !== 0)) {
      iVar2 = FUN_005c5680();
      if ((iVar2 === 0x140)) {
        uVar3 = FUN_005c56a0();
        uVar4 = GetCheckStyle(in_ECX);
        iVar2 = FUN_005e395a(uVar4, uVar3);
        iVar5 = FUN_005c55d0();
        uVar3 = FUN_005c5660((((-u8((iVar2 === 0))) & -2) + 1) * iVar5);
        pCVar6 = GetActiveView(in_ECX);
        uVar3 = FUN_005c5640(local_14, UNNAMED, UNNAMED, UNNAMED, UNNAMED, local_8, local_c, pCVar6, uVar3);
        FUN_005e511c(uVar3);
      }
      else {
        uVar3 = FUN_005c56a0();
        uVar4 = GetCheckStyle(in_ECX);
        iVar2 = FUN_005e395a(uVar4, uVar3);
        iVar5 = FUN_005c55d0();
        uVar3 = FUN_005c5660((((-u8((iVar2 === 0))) & -2) + 1) * iVar5);
        pCVar6 = GetActiveView(in_ECX);
        uVar3 = FUN_005c5640(local_14, s32((in_ECX + 0x44), 0) * UNNAMED, UNNAMED, s32((in_ECX + 0x44), 0) * UNNAMED, UNNAMED, s32((in_ECX + 0x44), 0) * local_8, local_c, pCVar6, uVar3);
        FUN_005e4f9b(uVar3);
      }
    }
  }
  if ((iVar1 === 0)) {
    FUN_005c02e0();
  }
  if ((local_10 === 0)) {
    param_1 = ~_Timevec(param_1);
  }
  return;
}


 export function FUN_005c0979 (in_ECX, param_1, param_2, param_3)

 {
  let cVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) === 0)) {
    FUN_005d225b(s_Error:_NULL_Port_in_CopyToScreen_006371a8);
  }
  else {
    cVar1 = FUN_005c54f0();
    if ((cVar1 === 0)) {
      FUN_005d225b(s_Warning:_Port_not_locked_in_Copy_006371cc);
      FUN_005c01c1();
    }
    uVar2 = FUN_005bb8c0();
    FUN_005c0d12(uVar2);
    uVar2 = FUN_00414d10(s32(param_3, 0), s32(param_3, 1));
    uVar2 = FUN_00407fc0(param_2, uVar2);
    uVar2 = FUN_00407f90(param_2, uVar2);
    FUN_005bcc11(s32((in_ECX + 0x40), 0), s32(param_2, 0), s32(param_2, 1), uVar2);
    if ((cVar1 === 0)) {
      FUN_005c02e0();
    }
  }
  return;
}


 export function FUN_005c0a55 (in_ECX, param_1, param_2, param_3)

 {
  let cVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  cVar1 = FUN_005c54f0();
  if ((cVar1 === 0)) {
    FUN_005d225b(s_Warning:_Port_not_locked_in_Copy_006371f8);
    FUN_005c01c1();
  }
  uVar2 = FUN_005bb8c0();
  FUN_005c0d12(uVar2);
  uVar2 = FUN_00407fc0(param_3);
  uVar2 = FUN_00407f90(param_3, uVar2);
  uVar2 = FUN_00414d10(s32(param_3, 0), s32(param_3, 1), uVar2);
  uVar2 = FUN_00407fc0(param_2, uVar2);
  uVar2 = FUN_00407f90(param_2, uVar2);
  FUN_005bcce2(s32((in_ECX + 0x40), 0), s32(param_2, 0), s32(param_2, 1), uVar2);
  if ((cVar1 === 0)) {
    FUN_005c02e0();
  }
  return;
}


 export function FUN_005c0b2c (in_ECX, param_1, param_2, param_3)

 {
  let cVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  // in_ECX promoted to parameter;
  let uVar5;

  cVar1 = FUN_005c54f0();
  if ((cVar1 === 0)) {
    FUN_005d225b(s_Warning:_Port_not_locked_in_Copy_00637224);
    FUN_005c01c1();
  }
  uVar2 = FUN_00407fc0(param_3);
  uVar3 = FUN_00407f90(param_3, uVar2);
  uVar2 = s32(param_3, 1);
  uVar5 = s32(param_3, 0);
  uVar4 = GetCheckStyle(param_1);
  uVar2 = FUN_00407fc0(param_2, uVar4, uVar5, uVar2, uVar3);
  uVar2 = FUN_00407f90(param_2, uVar2);
  FUN_005bcd66(s32((in_ECX + 0x40), 0), s32(param_2, 0), s32(param_2, 1), uVar2);
  if ((cVar1 === 0)) {
    FUN_005c02e0();
  }
  return;
}


 export function FUN_005c0bf2 (param_1, param_2)

 {
  let cVar1;
  let uVar2;
  let puVar3;

  cVar1 = FUN_005c1a00(param_1, param_2);
  if ((cVar1 === 0)) {
    FUN_005d22b7(s_Warning:_GetPixel_out_of_clip_re_00637250, param_1, param_2);
    uVar2 = 0;
  }
  else {
    puVar3 = FUN_005c19d3(param_1, param_2);
    uVar2 = _MEM[puVar3];
  }
  return uVar2;
}


 export function FUN_005c0c5d (param_1, param_2, param_3)

 {
  let cVar1;
  let puVar2;

  cVar1 = FUN_005c1a00(param_1, param_2);
  if ((cVar1 === 0)) {
    FUN_005d22b7(s_Warning:_SetPixel_out_of_clip_re_00637278, param_1, param_2);
  }
  else {
    puVar2 = FUN_005c19d3(param_1, param_2);
    _MEM[puVar2] = param_3;
  }
  return;
}


 export function FUN_005c0cc5 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  iVar1 = IsTracking(param_1);
  if ((iVar1 !== s32((in_ECX + 0x3c), 0))) {
    FUN_005e3bdc(s32((in_ECX + 0x40), 0), param_1);
    iVar1 = IsTracking(param_1);
    w32((in_ECX + 0x3c), 0, iVar1);
  }
  return;
}


 export function FUN_005c0d12 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((param_1 !== 0)) {
    iVar1 = IsTracking(param_1);
    if ((iVar1 !== s32((in_ECX + 0x3c), 0))) {
      FUN_005e3bdc(s32((in_ECX + 0x40), 0), param_1);
      iVar1 = IsTracking(param_1);
      w32((in_ECX + 0x3c), 0, iVar1);
    }
  }
  return;
}


 export function FUN_005c0d69 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  // in_ECX promoted to parameter;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_006372a0);
  }
  else if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if (((param_4 & 0x10) !== 0)) {
      iVar2 = FUN_005c847f(s32(PTR_DAT_00637e5c, 0));
      iVar2 = (iVar2 + ((iVar2 >> 0x1f) & 7));
      iVar3 = (iVar2 >> 3);
      uVar1 = FUN_005c19ad((((iVar2 >> 0xb) << 8) | DAT_00638b40));
      FUN_005e3cb4(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, (iVar3 + param_2), (iVar3 + param_3), (in_ECX + 0x14), param_4);
      FUN_005c19ad(uVar1);
    }
    FUN_005e3cb4(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3, (in_ECX + 0x14), param_4);
  }
  return;
}


 export function FUN_005c0e57 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_14;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_006372c0);
  }
  else if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if (((param_3 & 0x10) !== 0)) {
      iVar2 = FUN_005c847f(s32(PTR_DAT_00637e5c, 0));
      iVar2 = ((iVar2 + ((iVar2 >> 0x1f) & 7)) >> 3);
      local_14 = s32(param_2, 0);
      local_14 = s32(param_2, 1);
      local_14 = s32(param_2, 2);
      local_14 = s32(param_2, 3);
      FUN_006e7da4(DAT_ffffffec, iVar2, iVar2);
      uVar1 = FUN_005c19ad(DAT_00638b40);
      FUN_005e3eca(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, DAT_ffffffec, param_3);
      FUN_005c19ad(uVar1);
    }
    FUN_005e3eca(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3);
  }
  return;
}


 export function FUN_005c0f57 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if (((param_5 & 0x10) !== 0)) {
      iVar2 = FUN_005c847f(s32(param_1, 0));
      iVar2 = (iVar2 + ((iVar2 >> 0x1f) & 7));
      iVar3 = (iVar2 >> 3);
      uVar1 = FUN_005c19ad((((iVar2 >> 0xb) << 8) | DAT_00638b40));
      FUN_005e3cb4(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, (param_3 + iVar3), (param_4 + iVar3), (in_ECX + 0x14), param_5);
      FUN_005c19ad(uVar1);
    }
    FUN_005e3cb4(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, param_3, param_4, (in_ECX + 0x14), param_5);
  }
  return;
}


 export function FUN_005c1020 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_14;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if (((param_4 & 0x10) !== 0)) {
      iVar2 = FUN_005c847f(s32(param_1, 0));
      iVar2 = ((iVar2 + ((iVar2 >> 0x1f) & 7)) >> 3);
      local_14 = s32(param_3, 0);
      local_14 = s32(param_3, 1);
      local_14 = s32(param_3, 2);
      local_14 = s32(param_3, 3);
      FUN_006e7da4(DAT_ffffffec, iVar2, iVar2);
      uVar1 = FUN_005c19ad(DAT_00638b40);
      FUN_005e3eca(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, DAT_ffffffec, param_4);
      FUN_005c19ad(uVar1);
    }
    FUN_005e3eca(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, param_3, param_4);
  }
  return;
}


 export function FUN_005c10fb (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_006372e0);
  }
  else if ((s32((in_ECX + 0x40), 0) !== 0)) {
    FUN_005e3feb(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3);
  }
  return;
}


 export function FUN_005c1167 (in_ECX, param_1, param_2, param_3, param_4)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    FUN_005e3feb(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, param_3, param_4);
  }
  return;
}


 export function FUN_005c11b2 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let pCVar4;
  let uVar5;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if ((param_4 === param_2)) {
      if ((param_1 < s32((in_ECX + 0x14), 0))) {
        param_1 = s32((in_ECX + 0x14), 0);
      }
      if ((s32((in_ECX + 0x1c), 0) <= param_1)) {
        param_1 = (s32((in_ECX + 0x1c), 0) + -1);
      }
      if ((param_3 < s32((in_ECX + 0x14), 0))) {
        param_3 = s32((in_ECX + 0x14), 0);
      }
      if ((s32((in_ECX + 0x1c), 0) <= param_3)) {
        param_3 = (s32((in_ECX + 0x1c), 0) + -1);
      }
      if ((param_3 !== param_1)) {
        uVar1 = GetCheckStyle(in_ECX);
        iVar2 = FUN_005e395a(uVar1);
        iVar3 = FUN_005c55d0();
        iVar3 = (((-u8((iVar2 === 0))) & -2) + 1) * iVar3;
        pCVar4 = GetActiveView(in_ECX);
        iVar2 = param_3;
        if ((param_1 <= param_3)) {
          iVar2 = param_1;
        }
        iVar2 = FUN_005f7120((param_3 - param_1), iVar2, param_2, pCVar4, iVar3);
        uVar5 = FUN_005c5640(((((iVar2 + 1) >>> 8) << 8) | DAT_00637e78), (iVar2 + 1));
        FUN_005e5869(uVar5);
      }
    }
    else if ((param_3 === param_1)) {
      if ((param_2 < s32((in_ECX + 0x18), 0))) {
        param_2 = s32((in_ECX + 0x18), 0);
      }
      if ((s32((in_ECX + 0x20), 0) <= param_2)) {
        param_2 = (s32((in_ECX + 0x20), 0) + -1);
      }
      if ((param_4 < s32((in_ECX + 0x18), 0))) {
        param_4 = s32((in_ECX + 0x18), 0);
      }
      if ((s32((in_ECX + 0x20), 0) <= param_4)) {
        param_4 = (s32((in_ECX + 0x20), 0) + -1);
      }
      if ((param_4 !== param_2)) {
        uVar1 = GetCheckStyle(in_ECX);
        iVar2 = FUN_005e395a(uVar1);
        iVar3 = FUN_005c55d0();
        iVar3 = (((-u8((iVar2 === 0))) & -2) + 1) * iVar3;
        pCVar4 = GetActiveView(in_ECX);
        iVar2 = param_4;
        if ((param_2 <= param_4)) {
          iVar2 = param_2;
        }
        iVar2 = FUN_005f7120((param_4 - param_2), param_1, iVar2, pCVar4, iVar3);
        uVar5 = FUN_005c5640(((((iVar2 + 1) >>> 8) << 8) | DAT_00637e78), (iVar2 + 1));
        FUN_005e58e7(uVar5);
      }
    }
    else {
      FUN_005e40fb(s32((in_ECX + 0x40), 0), param_1, param_2, param_3, param_4);
    }
  }
  return;
}


 export function FUN_005c145d (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    FUN_005c11b2(s32(param_1, 0), s32(param_1, 1), s32(param_1, 2), s32(param_1, 1));
    FUN_005c11b2(s32(param_1, 2), s32(param_1, 1), s32(param_1, 2), s32(param_1, 3));
    FUN_005c11b2(s32(param_1, 2), s32(param_1, 3), s32(param_1, 0), s32(param_1, 3));
    FUN_005c11b2(s32(param_1, 0), s32(param_1, 3), s32(param_1, 0), s32(param_1, 1));
  }
  return;
}


 export function FUN_005c1513 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = DAT_00637e78;
  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if ((s32((in_ECX + 0x44), 0) === 1)) {
      FUN_005c19ad(0xef);
      FUN_005c145d(param_1);
      FUN_005c19ad(0xff);
      FUN_005e40fb(s32((in_ECX + 0x40), 0), (s32(param_1, 0) + 1), (s32(param_1, 1) + 1), (s32(param_1, 2) + -1), (s32(param_1, 1) + 1));
      FUN_005e40fb(s32((in_ECX + 0x40), 0), (s32(param_1, 0) + 1), (s32(param_1, 3) + -1), (s32(param_1, 0) + 1), (s32(param_1, 1) + 1));
      FUN_005c19ad(0xf7);
      FUN_005e40fb(s32((in_ECX + 0x40), 0), (s32(param_1, 2) + -1), (s32(param_1, 1) + 1), (s32(param_1, 2) + -1), (s32(param_1, 3) + -1));
      FUN_005e40fb(s32((in_ECX + 0x40), 0), (s32(param_1, 2) + -1), (s32(param_1, 3) + -1), (s32(param_1, 0) + 1), (s32(param_1, 3) + -1));
      FUN_005c19ad(uVar1);
    }
    else {
      FUN_005c52dd(param_1, 0, 0, 0);
      FUN_005e4b9b(s32((in_ECX + 0x40), 0), (s32(param_1, 0) + 1), (s32(param_1, 1) + 1), (s32(param_1, 2) + -1), (s32(param_1, 1) + 1), 0xff, 0xff, 0xff);
      FUN_005e4b9b(s32((in_ECX + 0x40), 0), (s32(param_1, 0) + 1), (s32(param_1, 3) + -1), (s32(param_1, 0) + 1), (s32(param_1, 1) + 1), 0xff, 0xff, 0xff);
      FUN_005e4b9b(s32((in_ECX + 0x40), 0), (s32(param_1, 2) + -1), (s32(param_1, 1) + 1), (s32(param_1, 2) + -1), (s32(param_1, 3) + -1), 0x40, 0x40, 0x40);
      FUN_005e4b9b(s32((in_ECX + 0x40), 0), (s32(param_1, 2) + -1), (s32(param_1, 3) + -1), (s32(param_1, 0) + 1), (s32(param_1, 3) + -1), 0x40, 0x40, 0x40);
    }
  }
  return;
}


 export function FUN_005c1742 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = DAT_00637e78;
  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if ((s32((in_ECX + 0x44), 0) === 1)) {
      FUN_005c19ad(DAT_00638b40);
      FUN_005c145d(param_1);
      FUN_005c19ad(0xf7);
      FUN_005e40fb(s32((in_ECX + 0x40), 0), (s32(param_1, 0) + 1), (s32(param_1, 1) + 1), (s32(param_1, 2) + -1), (s32(param_1, 1) + 1));
      FUN_005e40fb(s32((in_ECX + 0x40), 0), (s32(param_1, 0) + 1), (s32(param_1, 3) + -1), (s32(param_1, 0) + 1), (s32(param_1, 1) + 1));
      FUN_005c19ad(0xff);
      FUN_005e40fb(s32((in_ECX + 0x40), 0), (s32(param_1, 2) + -1), (s32(param_1, 1) + 1), (s32(param_1, 2) + -1), (s32(param_1, 3) + -1));
      FUN_005e40fb(s32((in_ECX + 0x40), 0), (s32(param_1, 2) + -1), (s32(param_1, 3) + -1), (s32(param_1, 0) + 1), (s32(param_1, 3) + -1));
      FUN_005c19ad(uVar1);
    }
    else {
      FUN_005c52dd(param_1, 0, 0, 0);
      FUN_005e4b9b(s32((in_ECX + 0x40), 0), (s32(param_1, 0) + 1), (s32(param_1, 1) + 1), (s32(param_1, 2) + -1), (s32(param_1, 1) + 1), 0x40, 0x40, 0x40);
      FUN_005e4b9b(s32((in_ECX + 0x40), 0), (s32(param_1, 0) + 1), (s32(param_1, 3) + -1), (s32(param_1, 0) + 1), (s32(param_1, 1) + 1), 0x40, 0x40, 0x40);
      FUN_005e4b9b(s32((in_ECX + 0x40), 0), (s32(param_1, 2) + -1), (s32(param_1, 1) + 1), (s32(param_1, 2) + -1), (s32(param_1, 3) + -1), 0xff, 0xff, 0xff);
      FUN_005e4b9b(s32((in_ECX + 0x40), 0), (s32(param_1, 2) + -1), (s32(param_1, 3) + -1), (s32(param_1, 0) + 1), (s32(param_1, 3) + -1), 0xff, 0xff, 0xff);
    }
  }
  return;
}


 export function FUN_005c1972 (param_1)

 {
  let uVar1;

  uVar1 = DAT_00637e58;
  wv(DAT_00637e58, param_1);
  return uVar1;
}


 export function FUN_005c1998 ()

 {
  return DAT_00637e58;
}


 export function FUN_005c19ad (param_1)

 {
  let uVar1;

  uVar1 = DAT_00637e78;
  wv(DAT_00637e78, param_1);
  return uVar1;
}


 export function FUN_005c19d3 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  return ((s32((s32((in_ECX + 0x38), 0) + param_2 * 4), 0) + s32((in_ECX + 0x34), 0)) + param_1);
}


 export function FUN_005c1a00 (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x20), 0) <= param_2)) {
    uVar1 = 0;
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_005c1a62 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;
  let local_10;
  let local_c;
  let local_8;

  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    local_10 = s32((in_ECX + 0x34), 0);
    for (/* cond: (local_8 < s32((in_ECX + 8), 0)) */); local_8 = (local_8 < s32((in_ECX + 8), 0)); local_8 = (local_8 + 1)) {
      for (/* cond: (local_c < s32((in_ECX + 4), 0)) */); local_c = (local_c < s32((in_ECX + 4), 0)); local_c = (local_c + 1)) {
        if ((-1 < (u8(_MEM[local_10]) - param_2))) {
          _MEM[local_10] = _MEM[((u8(_MEM[local_10]) - param_2) + param_1)];
        }
        local_10 = (local_10 + 1);
      }
      local_10 = (local_10 + (s32((in_ECX + 0xc), 0) - s32((in_ECX + 4), 0)));
    }
  }
  return;
}


 export function FUN_005c1b0d (param_1, param_2)

 {
  let local_14;

  FUN_006e7d90(DAT_ffffffec, 0, 0, param_1, param_2);
  FUN_005c1b47(DAT_ffffffec);
  return;
}


 export function FUN_005c1b47 (in_ECX, param_1)

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
    uVar2 = FUN_005e41ba((in_ECX + 0x24));
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
      w32((in_ECX + 0x44), 0, 2);
      FUN_005c01c1();
      return 1;
    }
    FUN_005dae6b(2, s_ERR_PORTALLOCFAILED_00637318, s_D:\Ss\Smeds32\Port.cpp_00637300, 0x86c);
    return 0;
  }
  FUN_005bd813(0);
  return 1;
}


 export function FUN_005c1c99 (param_1)

 {
  FUN_005c1b47(param_1);
  return;
}


 export function FUN_005c1cbd (param_1, param_2)

 {
  let local_14;

  FUN_006e7d90(DAT_ffffffec, 0, 0, param_1, param_2);
  FUN_005c1cf7(DAT_ffffffec);
  return;
}


 export function FUN_005c1cf7 (in_ECX, param_1)

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
    uVar2 = FUN_005e43c5((in_ECX + 0x24));
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
      w32((in_ECX + 0x44), 0, 3);
      FUN_005c01c1();
      return 1;
    }
    FUN_005dae6b(2, s_ERR_PORTALLOCFAILED_00637344, s_D:\Ss\Smeds32\Port.cpp_0063732c, 0x8a1);
    return 0;
  }
  FUN_005bd813(0);
  return 1;
}


 export function FUN_005c1e49 (param_1)

 {
  FUN_005c1cf7(param_1);
  return;
}


 export function FUN_005c1e6d (param_1, param_2)

 {
  let local_14;

  FUN_006e7d90(DAT_ffffffec, 0, 0, param_1, param_2);
  FUN_005c1ea7(DAT_ffffffec);
  return;
}


 export function FUN_005c1ea7 (in_ECX, param_1)

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
    uVar2 = FUN_005e45b5((in_ECX + 0x24));
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
      w32((in_ECX + 0x44), 0, 4);
      FUN_005c01c1();
      return 1;
    }
    FUN_005dae6b(2, s_ERR_PORTALLOCFAILED_00637370, s_D:\Ss\Smeds32\Port.cpp_00637358, 0x8d6);
    return 0;
  }
  FUN_005bd813(0);
  return 1;
}


 export function FUN_005c1ff9 (param_1)

 {
  FUN_005c1ea7(param_1);
  return;
}


 export function FUN_005c201d (param_1, param_2, param_3)

 {
  return (((((param_1 & 0xf8) >>> 1) << 8) | (param_3 >>> 3)) + (u8(param_2) & 0xf8) * 4);
}


 export function FUN_005c2048 (in_ECX, param_1)

 {
  let cVar1;
  let uVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_40;
  let local_3c;
  let local_2c;
  let local_28;
  let local_24;
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

  local_1c = 0x54;
  local_1b = 0x41;
  local_1a = 0x52;
  local_19 = 0x47;
  local_24 = FUN_005c5540(DAT_ffffffe4, param_1);
  if ((local_24 === 0)) {
    FUN_005d2279(s_Error:_Picture_resource_not_foun_00637384, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_006373c4, s_D:\Ss\Smeds32\Port.cpp_006373ac, 0x905);
    return 0;
  }
  local_c = FUN_005c5560(local_24);
  local_14 = ((s16((local_c + 0xc), 0)) & 0xFFFF);
  local_18 = ((s16((local_c + 0xe), 0)) & 0xFFFF);
  local_8 = local_c;
  FUN_006e7d90(DAT_ffffffc4, 0, 0, local_14, local_18);
  iVar3 = FUN_005c1c99(DAT_ffffffc4);
  if ((iVar3 === 0)) {
    FUN_005c5520(local_24);
    return 0;
  }
  if ((_MEM[local_8 + 2] === 2)) {
    local_c = (local_c + (s8(_MEM[local_8]) + 0x12));
    if (((_MEM[local_8 + 0x11] & 0x20) === 0)) {
      local_10 = FUN_005c19d3(0, (local_18 - 1));
      local_40 = (-s32((in_ECX + 0x10), 0));
    }
    else {
      local_10 = FUN_005c19d3(0, 0);
      local_40 = s32((in_ECX + 0x10), 0);
    }
    cVar1 = _MEM[local_8 + 0x10];
    if ((cVar1 === 0x10)) {
      for (/* cond: (local_20 < local_18) */); local_20 = (local_20 < local_18); local_20 = (local_20 + 1)) {
        FID_conflict:_memcpy(local_10, local_c, local_14 * 2);
        local_10 = (local_10 + local_40);
        local_c = (local_c + local_14 * 2);
      }
    }
    else {
      if ((cVar1 === 0x18)) {
        for (/* cond: (local_20 < local_18) */); local_20 = (local_20 < local_18); local_20 = (local_20 + 1)) {
          local_2c = local_10;
          for (/* cond: (local_28 < local_14) */); local_28 = (local_28 < local_14); local_28 = (local_28 + 1)) {
            uVar2 = FUN_005c201d(_MEM[local_c + 2], _MEM[local_c + 1], _MEM[local_c]);
            w16(local_2c, 0, uVar2);
            local_2c = (local_2c + 1);
            local_c = (local_c + 3);
          }
          local_10 = (local_10 + local_40);
        }
      }
      else if ((cVar1 !== 0x20)); local_20 = (local_20 < local_18); local_20 = (local_20 + 1)) {
        local_2c = local_10;
        for (/* cond: (local_28 < local_14) */); local_28 = (local_28 < local_14); local_28 = (local_28 + 1)) {
          uVar2 = FUN_005c201d(_MEM[local_c + 2], _MEM[local_c + 1], _MEM[local_c]);
          w16(local_2c, 0, uVar2);
          local_2c = (local_2c + 1);
          local_c = (local_c + 4);
        }
        local_10 = (local_10 + local_40);
      }
    }
  }
  else if ((_MEM[local_8 + 2] === 0xa)) {
    FUN_005d225b(s_Targa_Compression_Not_Implemente_006373dc);
  }
 LAB_005c231b: :
  if (((_MEM[local_8 + 0x11] & 0x10) !== 0)) {
    FUN_005d225b(s_Why_The_hell_would_anyone_want_t_00637404);
  }
  FUN_005c5580(local_24);
  FUN_005c5520(local_24);
  return 1;
}


 export function FUN_005c2360 (in_ECX, unaff_ESI, param_1)

 {
  let cVar1;
  let uVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_dc;
  let local_d8;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_b4;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005c2792;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar3 = Realloc(param_1);
  if ((iVar3 === 0)) {
    FUN_005d225b(s_Error:_Targa_File_not_found_-_00637440);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00637478, s_D:\Ss\Smeds32\Port.cpp_00637460, 0x965);
    local_8 = -1;
    FUN_005c2786();
    FUN_005c279c(unaff_ESI);
    return;
  }
  local_18 = FUN_005c5470();
  local_b8 = ((s16((local_18 + 0xc), 0)) & 0xFFFF);
  local_bc = ((s16((local_18 + 0xe), 0)) & 0xFFFF);
  local_14 = local_18;
  FUN_006e7d90(DAT_ffffff28, 0, 0, local_b8, local_bc);
  iVar3 = FUN_005c1c99(DAT_ffffff28);
  if ((iVar3 !== 0)) {
    if ((_MEM[local_14 + 2] === 2)) {
      local_18 = (local_18 + (s8(_MEM[local_14]) + 0x12));
      if (((_MEM[local_14 + 0x11] & 0x20) === 0)) {
        local_b4 = FUN_005c19d3(0, (local_bc - 1));
        local_dc = (-s32((in_ECX + 0x10), 0));
      }
      else {
        local_b4 = FUN_005c19d3(0, 0);
        local_dc = s32((in_ECX + 0x10), 0);
      }
      cVar1 = _MEM[local_14 + 0x10];
      if ((cVar1 === 0x10)) {
        for (/* cond: (local_c0 < local_bc) */); local_c0 = (local_c0 < local_bc); local_c0 = (local_c0 + 1)) {
          FID_conflict:_memcpy(local_b4, local_18, local_b8 * 2);
          local_b4 = (local_b4 + local_dc);
          local_18 = (local_18 + local_b8 * 2);
        }
      }
      else if ((cVar1 === 0x18)) {
        for (/* cond: (local_c0 < local_bc) */); local_c0 = (local_c0 < local_bc); local_c0 = (local_c0 + 1)) {
          local_c8 = local_b4;
          for (/* cond: (local_c4 < local_b8) */); local_c4 = (local_c4 < local_b8); local_c4 = (local_c4 + 1)) {
            uVar2 = FUN_005c201d(_MEM[local_18 + 2], _MEM[local_18 + 1], _MEM[local_18]);
            w16(local_c8, 0, uVar2);
            local_c8 = (local_c8 + 1);
            local_18 = (local_18 + 3);
          }
          local_b4 = (local_b4 + local_dc);
        }
      }
      else if ((cVar1 === 0x20)) {
        for (/* cond: (local_c0 < local_bc) */); local_c0 = (local_c0 < local_bc); local_c0 = (local_c0 + 1)) {
          local_c8 = local_b4;
          for (/* cond: (local_c4 < local_b8) */); local_c4 = (local_c4 < local_b8); local_c4 = (local_c4 + 1)) {
            uVar2 = FUN_005c201d(_MEM[local_18 + 2], _MEM[local_18 + 1], _MEM[local_18]);
            w16(local_c8, 0, uVar2);
            local_c8 = (local_c8 + 1);
            local_18 = (local_18 + 4);
          }
          local_b4 = (local_b4 + local_dc);
        }
      }
    }
    else if ((_MEM[local_14 + 2] === 0xa)) {
      FUN_005d225b(s_Targa_Compression_Not_Implemente_00637490);
    }
    if (((_MEM[local_14 + 0x11] & 0x10) !== 0)) {
      FUN_005d225b(s_Why_The_hell_would_anyone_want_t_006374b8);
    }
    FUN_005c54a0();
    FUN_00421c30();
    local_8 = -1;
    FUN_005c2786();
    FUN_005c279c(unaff_ESI);
    return;
  }
  FUN_005c54a0();
  FUN_00421c30();
  local_8 = -1;
  FUN_005c2786();
  FUN_005c279c(unaff_ESI);
  return;
}


 export function FUN_005c2786 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005c279c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c27ad (in_ECX, param_1)

 {
  let sVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  // in_ECX promoted to parameter;
  let auStack_23c;
  let local_3c;
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

  local_24 = FUN_005db2f8(param_1);
  if ((local_24 === 0)) {
    FUN_005d2279(s_Error:_Bitmap_resource_not_found_006374f4, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00637530, s_D:\Ss\Smeds32\Port.cpp_00637518, 0x9c7);
    uVar3 = 0;
  }
  else {
    local_c = FUN_005c5560(local_24);
    local_18 = s32((local_c + 4), 0);
    local_1c = s32((local_c + 8), 0);
    FUN_006e7d90(DAT_ffffffc4, 0, 0, local_18, local_1c);
    iVar4 = FUN_005c1c99(DAT_ffffffc4);
    if ((iVar4 === 0)) {
      FUN_005c5520(local_24);
      uVar3 = 0;
    }
    else {
      local_18 = FUN_005c55a0(local_18);
      local_14 = FUN_005c19d3(0, (s32((in_ECX + 8), 0) + -1));
      sVar1 = s16((local_c + 0xe), 0);
      if ((sVar1 === 8)) {
        local_10 = (local_c + 0x28);
        for (/* cond: (local_20 < 0x100) */); local_20 = (local_20 < 0x100); local_20 = (local_20 + 1)) {
          uVar5 = (local_10 >>> 8);
          uVar2 = FUN_005c201d(((uVar5 << 8) | _MEM[local_10 + 2]), ((uVar5 << 8) | _MEM[local_10 + 1]), ((uVar5 << 8) | _MEM[local_10]));
          w16(DAT_fffffdc4, local_20, uVar2);
          local_10 = (local_10 + 4);
        }
        local_8 = (local_c + 0x428);
        for (/* cond: (local_20 < local_1c) */); local_20 = (local_20 < local_1c); local_20 = (local_20 + 1)) {
          local_2c = local_14;
          for (/* cond: (local_28 < local_18) */); local_28 = (local_28 < local_18); local_28 = (local_28 + 1)) {
            w16(local_2c, 0, s16(DAT_fffffdc4, u8(_MEM[local_8])));
            local_8 = (local_8 + 1);
            local_2c = (local_2c + 1);
          }
          local_14 = FUN_005c5710(local_14);
        }
      }
      else if ((sVar1 === 0x18)) {
        local_8 = (local_c + 0x28);
        for (/* cond: (local_20 < local_1c) */); local_20 = (local_20 < local_1c); local_20 = (local_20 + 1)) {
          local_2c = local_14;
          for (/* cond: (local_28 < local_18) */); local_28 = (local_28 < local_18); local_28 = (local_28 + 1)) {
            uVar2 = FUN_005c201d(_MEM[local_8 + 2], _MEM[local_8 + 1], _MEM[local_8]);
            w16(local_2c, 0, uVar2);
            local_2c = (local_2c + 1);
            local_8 = (local_8 + 3);
          }
          local_14 = FUN_005c5710(local_14);
        }
      }
      FUN_005c5580(local_24);
      FUN_005c5520(local_24);
      uVar3 = 1;
    }
  }
  return uVar3;
}


 export function FUN_005c2a77 (in_ECX, unaff_ESI, param_1)

 {
  let sVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let auStack_2e0;
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
  puStack_c = LAB_005c2e43;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar3 = Realloc(param_1);
  if ((iVar3 === 0)) {
    FUN_005d225b(s_Error:_Bitmap_file_not_found_-_00637548);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00637580, s_D:\Ss\Smeds32\Port.cpp_00637568, 0xa16);
    local_8 = -1;
    FUN_005c2e37();
    FUN_005c2e4d(unaff_ESI);
    return;
  }
  local_e0 = FUN_005c5470();
  local_18 = (local_e0 + 0xe);
  local_bc = s32((local_e0 + 0x12), 0);
  local_c0 = s32((local_e0 + 0x16), 0);
  FUN_006e7d90(DAT_ffffff24, 0, 0, local_bc, local_c0);
  iVar3 = FUN_005c1c99(DAT_ffffff24);
  if ((iVar3 !== 0)) {
    local_bc = FUN_005c55a0(local_bc);
    local_b8 = FUN_005c19d3(0, (s32((in_ECX + 8), 0) + -1));
    sVar1 = s16((local_18 + 0xe), 0);
    if ((sVar1 === 8)) {
      local_1c = (local_18 + 0x28);
      for (/* cond: (local_c4 < 0x100) */); local_c4 = (local_c4 < 0x100); local_c4 = (local_c4 + 1)) {
        uVar4 = (local_1c >>> 8);
        uVar2 = FUN_005c201d(((uVar4 << 8) | _MEM[local_1c + 2]), ((uVar4 << 8) | _MEM[local_1c + 1]), ((uVar4 << 8) | _MEM[local_1c]));
        w16(DAT_fffffd20, local_c4, uVar2);
        local_1c = (local_1c + 4);
      }
      local_14 = (local_18 + 0x428);
      for (/* cond: (local_c4 < local_c0) */); local_c4 = (local_c4 < local_c0); local_c4 = (local_c4 + 1)) {
        local_cc = local_b8;
        for (/* cond: (local_c8 < local_bc) */); local_c8 = (local_c8 < local_bc); local_c8 = (local_c8 + 1)) {
          w16(local_cc, 0, s16(DAT_fffffd20, u8(_MEM[local_14])));
          local_14 = (local_14 + 1);
          local_cc = (local_cc + 1);
        }
        local_b8 = FUN_005c5710(local_b8);
      }
    }
    else if ((sVar1 === 0x18)) {
      local_14 = (local_18 + 0x28);
      for (/* cond: (local_c4 < local_c0) */); local_c4 = (local_c4 < local_c0); local_c4 = (local_c4 + 1)) {
        local_cc = local_b8;
        for (/* cond: (local_c8 < local_bc) */); local_c8 = (local_c8 < local_bc); local_c8 = (local_c8 + 1)) {
          uVar2 = FUN_005c201d(_MEM[local_14 + 2], _MEM[local_14 + 1], _MEM[local_14]);
          w16(local_cc, 0, uVar2);
          local_cc = (local_cc + 1);
          local_14 = (local_14 + 3);
        }
        local_b8 = FUN_005c5710(local_b8);
      }
    }
    FUN_005c54a0();
    FUN_00421c30();
    local_8 = -1;
    FUN_005c2e37();
    FUN_005c2e4d(unaff_ESI);
    return;
  }
  FUN_005c54a0();
  FUN_00421c30();
  local_8 = -1;
  FUN_005c2e37();
  FUN_005c2e4d(unaff_ESI);
  return;
}


 export function FUN_005c2e37 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005c2e4d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c2e5e (in_ECX, param_1)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_550;
  let local_54c;
  let auStack_54a;
  let local_24c;
  let local_248;
  let local_238;
  let local_234;
  let local_230;
  let local_22c;
  let auStack_228;
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

  local_28 = 0x47;
  local_27 = 0x49;
  local_26 = 0x46;
  local_25 = 0x53;
  local_230 = FUN_005c5540(DAT_ffffffd8, param_1);
  if ((local_230 === 0)) {
    FUN_005d2279(s_Error:_GIF_resource_not_found_-_00637598, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_006375d4, s_D:\Ss\Smeds32\Port.cpp_006375bc, 0xa6c);
    uVar2 = 0;
  }
  else {
    local_14 = FUN_005c5560(local_230);
    iVar3 = _strcmp(local_14, DAT_006375ec);
    if ((iVar3 === 0)) {
      FUN_005d2279(s_Error:_Resource_is_not_a_GIF_-_006375f0, param_1);
      FUN_005c5580(local_230);
      FUN_005c5520(local_230);
      FUN_005dae6b(4, s_ERR_BADPICFORMAT_00637628, s_D:\Ss\Smeds32\Port.cpp_00637610, 0xa77);
      uVar2 = 0;
    }
    else if (((_MEM[local_14 + 0xa] & 0x80) === 0)) {
      FUN_005d2279(s_Error:_GIF_contains_no_global_co_0063763c, param_1);
      FUN_005c5580(local_230);
      FUN_005c5520(local_230);
      FUN_005dae6b(4, s_ERR_BADPICFORMAT_00637680, s_D:\Ss\Smeds32\Port.cpp_00637668, 0xa80);
      uVar2 = 0;
    }
    else {
      local_24c = (1 << ((_MEM[local_14 + 0xa] & 7) + 1));
      local_10 = (local_14 + 0xd);
      FID_conflict:_memcpy(DAT_fffffab4, local_10, local_24c * 3);
      local_234 = 0;
      for (/* cond: (local_22c < local_24c) */); local_22c = (local_22c < local_24c); local_22c = (local_22c + 1)) {
        uVar1 = FUN_005c201d(s32((DAT_fffffab4 + local_234), 0), s32((DAT_fffffab4 + (local_234 + 1)), 0), s32((DAT_fffffab4 + (local_234 + 2)), 0));
        w16(DAT_fffffdd8, local_22c, uVar1);
        local_234 = (local_234 + 3);
      }
      for (/* cond: (_MEM[local_10] === 0) */); local_10 = _MEM[local_10]; local_10 = (local_10 + 1)) {
      }
      if ((_MEM[local_10] === 0x21)) {
        local_c = (local_10 + 1);
        local_1c = FUN_005c54d0(s16((local_10 + 5), 0));
        w16((local_c + 4), 0, ((local_1c) & 0xFFFF));
        local_24 = FUN_005c54d0(s16((local_c + 6), 0));
        w16((local_c + 6), 0, ((local_24) & 0xFFFF));
        if (((_MEM[local_c + 8] & 0x80) !== 0)) {
          FUN_005d225b(s_Warning:_Skipping_local_color_ta_006376e4);
        }
        FUN_006e7d90(DAT_fffffdb8, 0, 0, local_1c, local_24);
        local_20 = FUN_005e35b0(DAT_fffffdb8);
        local_18 = _MEM[local_c + 9];
        local_8 = (local_c + 0xa);
        uVar2 = FUN_005e3a81(local_20);
        uVar2 = FUN_005e392a(local_20, local_1c, local_24, uVar2);
        FUN_005e4d60(local_8, 0, local_18, uVar2);
        iVar3 = FUN_005e395a(local_20);
        if ((iVar3 === 0)) {
          FUN_005e3988(local_20);
        }
        FUN_005c1c99(DAT_fffffdb8);
        local_10 = s32((in_ECX + 0x34), 0);
        local_8 = FUN_005e3a81(local_20);
        for (/* cond: (local_22c < local_24) */); local_22c = (local_22c < local_24); local_22c = (local_22c + 1)) {
          local_238 = local_10;
          local_550 = local_8;
          for (/* cond: (local_234 < local_1c) */); local_234 = (local_234 < local_1c); local_234 = (local_234 + 1)) {
            w16(local_238, 0, s16(DAT_fffffdd8, u8(_MEM[local_550])));
            local_550 = (local_550 + 1);
            local_238 = (local_238 + 1);
          }
          local_10 = (local_10 + s32((in_ECX + 0xc), 0));
          iVar3 = FUN_005e392a(local_20);
          local_8 = (local_8 + iVar3);
        }
        FUN_005e388f(local_20);
        FUN_005c5580(local_230);
        FUN_005c5520(local_230);
        uVar2 = 1;
      }
      else {
        FUN_005d2279(s_Error:_GIF_Image_Block_not_found_00637694, param_1);
        FUN_005c5580(local_230);
        FUN_005c5520(local_230);
        FUN_005dae6b(4, s_ERR_BADPICFORMAT_006376d0, s_D:\Ss\Smeds32\Port.cpp_006376b8, 0xa9d);
        uVar2 = 0;
      }
    }
  }
  return uVar2;
}


 export function FUN_005c3313 (in_ECX, unaff_ESI, param_1)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_5ec;
  let local_5e8;
  let auStack_5e6;
  let local_2e8;
  let local_2e4;
  let local_2d4;
  let local_2d0;
  let local_2cc;
  let auStack_2c8;
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
  puStack_c = LAB_005c3859;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar2 = Realloc(param_1);
  if ((iVar2 === 0)) {
    FUN_005d225b(s_Error:_GIF_file_not_found_-_00637708);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00637740, s_D:\Ss\Smeds32\Port.cpp_00637728, 0xae3);
    local_8 = -1;
    FUN_005c384d();
    FUN_005c3863(unaff_ESI);
    return;
  }
  local_20 = FUN_005c5470();
  iVar2 = _strcmp(local_20, DAT_00637758);
  if ((iVar2 === 0)) {
    FUN_005d225b(s_Error:_Resource_is_not_a_GIF_-_0063775c);
    FUN_005c54a0();
    FUN_00421c30();
    FUN_005dae6b(4, s_ERR_BADPICFORMAT_00637794, s_D:\Ss\Smeds32\Port.cpp_0063777c, 0xaee);
    local_8 = -1;
    FUN_005c384d();
    FUN_005c3863(unaff_ESI);
    return;
  }
  if (((_MEM[local_20 + 0xa] & 0x80) === 0)) {
    FUN_005d225b(s_Error:_GIF_contains_no_global_co_006377a8);
    FUN_005c54a0();
    FUN_00421c30();
    FUN_005dae6b(4, s_ERR_BADPICFORMAT_006377ec, s_D:\Ss\Smeds32\Port.cpp_006377d4, 0xaf7);
    local_8 = -1;
    FUN_005c384d();
    FUN_005c3863(unaff_ESI);
    return;
  }
  local_2e8 = (1 << ((_MEM[local_20 + 0xa] & 7) + 1));
  local_1c = (local_20 + 0xd);
  FID_conflict:_memcpy(DAT_fffffa18, local_1c, local_2e8 * 3);
  local_2d0 = 0;
  for (/* cond: (local_2cc < local_2e8) */); local_2cc = (local_2cc < local_2e8); local_2cc = (local_2cc + 1)) {
    uVar1 = FUN_005c201d(s32((DAT_fffffa18 + local_2d0), 0), s32((DAT_fffffa18 + (local_2d0 + 1)), 0), s32((DAT_fffffa18 + (local_2d0 + 2)), 0));
    w16(DAT_fffffd38, local_2cc, uVar1);
    local_2d0 = (local_2d0 + 3);
  }
  for (/* cond: (_MEM[local_1c] === 0) */); local_1c = _MEM[local_1c]; local_1c = (local_1c + 1)) {
  }
  if ((_MEM[local_1c] !== 0x21)) {
    FUN_005d225b(s_Error:_GIF_Image_Block_not_found_00637800);
    FUN_005c54a0();
    FUN_00421c30();
    FUN_005dae6b(4, s_ERR_BADPICFORMAT_0063783c, s_D:\Ss\Smeds32\Port.cpp_00637824, 0xb14);
    local_8 = -1;
    FUN_005c384d();
    FUN_005c3863(unaff_ESI);
    return;
  }
  local_18 = (local_1c + 1);
  local_c0 = FUN_005c54d0(s16((local_1c + 5), 0));
  w16((local_18 + 4), 0, ((local_c0) & 0xFFFF));
  local_c8 = FUN_005c54d0(s16((local_18 + 6), 0));
  w16((local_18 + 6), 0, ((local_c8) & 0xFFFF));
  if (((_MEM[local_18 + 8] & 0x80) !== 0)) {
    FUN_005d225b(s_Warning:_Skipping_local_color_ta_00637850);
  }
  FUN_006e7d90(DAT_fffffd1c, 0, 0, local_c0, local_c8);
  local_c4 = FUN_005e35b0(DAT_fffffd1c);
  local_24 = _MEM[local_18 + 9];
  local_14 = (local_18 + 0xa);
  uVar3 = FUN_005e3a81(local_c4);
  uVar3 = FUN_005e392a(local_c4, local_c0, local_c8, uVar3);
  FUN_005e4d60(local_14, 0, local_24, uVar3);
  iVar2 = FUN_005e395a(local_c4);
  if ((iVar2 === 0)) {
    FUN_005e3988(local_c4);
  }
  FUN_005c1c99(DAT_fffffd1c);
  local_1c = s32((in_ECX + 0x34), 0);
  local_14 = FUN_005e3a81(local_c4);
  for (/* cond: (local_2cc < local_c8) */); local_2cc = (local_2cc < local_c8); local_2cc = (local_2cc + 1)) {
    local_2d4 = local_1c;
    local_5ec = local_14;
    for (/* cond: (local_2d0 < local_c0) */); local_2d0 = (local_2d0 < local_c0); local_2d0 = (local_2d0 + 1)) {
      w16(local_2d4, 0, s16(DAT_fffffd38, u8(_MEM[local_5ec])));
      local_5ec = (local_5ec + 1);
      local_2d4 = (local_2d4 + 1);
    }
    local_1c = (local_1c + s32((in_ECX + 0xc), 0));
    iVar2 = FUN_005e392a(local_c4);
    local_14 = (local_14 + iVar2);
  }
  FUN_005e388f(local_c4);
  FUN_005c54a0();
  FUN_00421c30();
  local_8 = -1;
  FUN_005c384d();
  FUN_005c3863(unaff_ESI);
  return;
}


 export function FUN_005c384d ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005c3863 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c3874 (in_ECX, param_1)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  // in_ECX promoted to parameter;
  let local_548;
  let local_544;
  let auStack_542;
  let local_244;
  let local_240;
  let local_230;
  let local_22c;
  let local_228;
  let local_224;
  let auStack_220;
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

  local_20 = 0x43;
  local_1f = 0x76;
  local_1e = 0x50;
  local_1d = 0x63;
  local_228 = FUN_005c5540(DAT_ffffffe0, param_1);
  if ((local_228 === 0)) {
    FUN_005d2279(s_Error:_Picture_resource_not_foun_00637874, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_006378b4, s_D:\Ss\Smeds32\Port.cpp_0063789c, 0xb59);
    uVar2 = 0;
  }
  else {
    local_c = FUN_005c5560(local_228);
    local_14 = FUN_005c5410(((s16(local_c, 0)) << 16 >> 16));
    local_1c = FUN_005c5410(((s16(local_c, 1)) << 16 >> 16));
    FUN_006e7d90(DAT_fffffdc0, 0, 0, local_14, local_1c);
    local_244 = (u8(_MEM[(local_c + 5)]) + 1);
    local_10 = (local_c + 3);
    FID_conflict:_memcpy(DAT_fffffabc, local_10, local_244 * 3);
    local_22c = 0;
    for (/* cond: (local_224 < local_244) */); local_224 = (local_224 < local_244); local_224 = (local_224 + 1)) {
      uVar1 = FUN_005c201d(s32((DAT_fffffabc + local_22c), 0), s32((DAT_fffffabc + (local_22c + 1)), 0), s32((DAT_fffffabc + (local_22c + 2)), 0));
      w16(DAT_fffffde0, local_224, uVar1);
      local_22c = (local_22c + 3);
    }
    local_8 = (local_c + (local_244 * 3 + 6));
    local_18 = FUN_005e35b0(DAT_fffffdc0);
    uVar2 = FUN_005e3a81(local_18);
    uVar2 = FUN_005e392a(local_18, local_14, local_1c, uVar2);
    FUN_005e4d60(local_8, 0, ((s16(local_c, 2)) & 0xFF), uVar2);
    iVar3 = FUN_005e395a(local_18);
    if ((iVar3 === 0)) {
      FUN_005e3988(local_18);
    }
    FUN_005c1c99(DAT_fffffdc0);
    local_10 = s32((in_ECX + 0x34), 0);
    local_8 = FUN_005e3a81(local_18);
    for (/* cond: (local_224 < local_1c) */); local_224 = (local_224 < local_1c); local_224 = (local_224 + 1)) {
      local_230 = local_10;
      local_548 = local_8;
      for (/* cond: (local_22c < local_14) */); local_22c = (local_22c < local_14); local_22c = (local_22c + 1)) {
        w16(local_230, 0, s16(DAT_fffffde0, u8(_MEM[local_548])));
        local_548 = (local_548 + 1);
        local_230 = (local_230 + 1);
      }
      local_10 = (local_10 + s32((in_ECX + 0xc), 0));
      iVar3 = FUN_005e392a(local_18);
      local_8 = (local_8 + iVar3);
    }
    FUN_005e388f(local_18);
    FUN_005c5580(local_228);
    FUN_005c5520(local_228);
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_005c3b7a (in_ECX, unaff_ESI, param_1)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_5e4;
  let local_5e0;
  let auStack_5de;
  let local_2e0;
  let local_2dc;
  let local_2cc;
  let local_2c8;
  let local_2c4;
  let auStack_2c0;
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
  puStack_c = LAB_005c3ee1;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar2 = Realloc(param_1);
  if ((iVar2 === 0)) {
    FUN_005d225b(s_Error:_Picture_resource_not_foun_006378cc);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_0063790c, s_D:\Ss\Smeds32\Port.cpp_006378f4, 0xba3);
    local_8 = -1;
    FUN_005c3ed5();
    FUN_005c3eeb(unaff_ESI);
    return;
  }
  local_18 = FUN_005c5470();
  local_b8 = FUN_005c5410(((s16(local_18, 0)) << 16 >> 16));
  local_c0 = FUN_005c5410(((s16(local_18, 1)) << 16 >> 16));
  FUN_006e7d90(DAT_fffffd24, 0, 0, local_b8, local_c0);
  local_2e0 = (u8(_MEM[(local_18 + 5)]) + 1);
  local_1c = (local_18 + 3);
  FID_conflict:_memcpy(DAT_fffffa20, local_1c, local_2e0 * 3);
  local_2c8 = 0;
  for (/* cond: (local_2c4 < local_2e0) */); local_2c4 = (local_2c4 < local_2e0); local_2c4 = (local_2c4 + 1)) {
    uVar1 = FUN_005c201d(s32((DAT_fffffa20 + local_2c8), 0), s32((DAT_fffffa20 + (local_2c8 + 1)), 0), s32((DAT_fffffa20 + (local_2c8 + 2)), 0));
    w16(DAT_fffffd40, local_2c4, uVar1);
    local_2c8 = (local_2c8 + 3);
  }
  local_14 = (local_18 + (local_2e0 * 3 + 6));
  local_bc = FUN_005e35b0(DAT_fffffd24);
  uVar3 = FUN_005e3a81(local_bc);
  uVar3 = FUN_005e392a(local_bc, local_b8, local_c0, uVar3);
  FUN_005e4d60(local_14, 0, ((s16(local_18, 2)) & 0xFF), uVar3);
  iVar2 = FUN_005e395a(local_bc);
  if ((iVar2 === 0)) {
    FUN_005e3988(local_bc);
  }
  FUN_005c1c99(DAT_fffffd24);
  local_1c = s32((in_ECX + 0x34), 0);
  local_14 = FUN_005e3a81(local_bc);
  for (/* cond: (local_2c4 < local_c0) */); local_2c4 = (local_2c4 < local_c0); local_2c4 = (local_2c4 + 1)) {
    local_2cc = local_1c;
    local_5e4 = local_14;
    for (/* cond: (local_2c8 < local_b8) */); local_2c8 = (local_2c8 < local_b8); local_2c8 = (local_2c8 + 1)) {
      w16(local_2cc, 0, s16(DAT_fffffd40, u8(_MEM[local_5e4])));
      local_5e4 = (local_5e4 + 1);
      local_2cc = (local_2cc + 1);
    }
    local_1c = (local_1c + s32((in_ECX + 0xc), 0));
    iVar2 = FUN_005e392a(local_bc);
    local_14 = (local_14 + iVar2);
  }
  FUN_005e388f(local_bc);
  FUN_005c54a0();
  FUN_00421c30();
  local_8 = -1;
  FUN_005c3ed5();
  FUN_005c3eeb(unaff_ESI);
  return;
}


 export function FUN_005c3ed5 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005c3eeb (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c3efc (in_ECX, param_1)

 {
  let uVar1;
  let iVar2;
  // in_ECX promoted to parameter;
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

  local_20 = FUN_005db2f8(param_1);
  if ((local_20 === 0)) {
    FUN_005d2279(s_Error:_Bitmap_resource_not_found_00637924, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00637960, s_D:\Ss\Smeds32\Port.cpp_00637948, 0xbeb);
    uVar1 = 0;
  }
  else {
    local_c = FUN_005c5560(local_20);
    local_14 = s32((local_c + 4), 0);
    local_18 = s32((local_c + 8), 0);
    FUN_006e7d90(DAT_ffffffc8, 0, 0, local_14, local_18);
    iVar2 = FUN_005c1e49(DAT_ffffffc8);
    if ((iVar2 === 0)) {
      FUN_005c5520(local_20);
      uVar1 = 0;
    }
    else {
      local_14 = FUN_005c55a0(local_14);
      local_10 = FUN_005c19d3(0, (s32((in_ECX + 8), 0) + -1));
      if ((s16((local_c + 0xe), 0) === 0x18)) {
        local_8 = (local_c + 0x28);
        for (/* cond: (local_1c < local_18) */); local_1c = (local_1c < local_18); local_1c = (local_1c + 1)) {
          local_28 = local_10;
          for (/* cond: (local_24 < local_14) */); local_24 = (local_24 < local_14); local_24 = (local_24 + 1)) {
            _MEM[local_28] = _MEM[local_8 + 2];
            _MEM[local_28 + 1] = _MEM[local_8 + 1];
            _MEM[local_28 + 2] = _MEM[local_8];
            local_28 = (local_28 + 3);
            local_8 = (local_8 + 3);
          }
          local_10 = FUN_005c5710(local_10);
        }
      }
      FUN_005c5580(local_20);
      FUN_005c5520(local_20);
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005c40b6 (in_ECX, unaff_ESI, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_d8;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b8;
  let local_b4;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005c435a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    FUN_005d225b(s_Error:_Bitmap_file_not_found_-_00637978);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_006379b0, s_D:\Ss\Smeds32\Port.cpp_00637998, 0xc24);
    local_8 = -1;
    FUN_005c434e();
    FUN_005c4364(unaff_ESI);
    return;
  }
  iVar1 = FUN_005c5470();
  local_18 = (iVar1 + 0xe);
  local_b8 = s32((iVar1 + 0x12), 0);
  local_bc = s32((iVar1 + 0x16), 0);
  FUN_006e7d90(DAT_ffffff28, 0, 0, local_b8, local_bc);
  iVar1 = FUN_005c1e49(DAT_ffffff28);
  if ((iVar1 !== 0)) {
    local_b8 = FUN_005c55a0(local_b8);
    local_b4 = FUN_005c19d3(0, (s32((in_ECX + 8), 0) + -1));
    if ((s16((local_18 + 0xe), 0) === 0x18)) {
      local_14 = (local_18 + 0x28);
      for (/* cond: (local_c0 < local_bc) */); local_c0 = (local_c0 < local_bc); local_c0 = (local_c0 + 1)) {
        local_c8 = local_b4;
        for (/* cond: (local_c4 < local_b8) */); local_c4 = (local_c4 < local_b8); local_c4 = (local_c4 + 1)) {
          _MEM[local_c8] = _MEM[local_14 + 2];
          _MEM[local_c8 + 1] = _MEM[local_14 + 1];
          _MEM[local_c8 + 2] = _MEM[local_14];
          local_c8 = (local_c8 + 3);
          local_14 = (local_14 + 3);
        }
        local_b4 = FUN_005c5710(local_b4);
      }
    }
    FUN_005c54a0();
    FUN_00421c30();
    local_8 = -1;
    FUN_005c434e();
    FUN_005c4364(unaff_ESI);
    return;
  }
  FUN_005c54a0();
  FUN_00421c30();
  local_8 = -1;
  FUN_005c434e();
  FUN_005c4364(unaff_ESI);
  return;
}


 export function FUN_005c434e ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005c4364 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c4375 (in_ECX, param_1)

 {
  let uVar1;
  let iVar2;
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
    FUN_005d2279(s_Error:_Picture_resource_not_foun_006379c8, param_1);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00637a08, s_D:\Ss\Smeds32\Port.cpp_006379f0, 0xc60);
    uVar1 = 0;
  }
  else {
    local_10 = FUN_005c5560(local_28);
    local_18 = ((s16((local_10 + 0xc), 0)) & 0xFFFF);
    local_1c = ((s16((local_10 + 0xe), 0)) & 0xFFFF);
    local_8 = local_10;
    FUN_006e7d90(DAT_ffffffc0, 0, 0, local_18, local_1c);
    iVar2 = FUN_005c1e49(DAT_ffffffc0);
    if ((iVar2 === 0)) {
      FUN_005c5520(local_28);
      uVar1 = 0;
    }
    else {
      if ((_MEM[local_8 + 2] === 2)) {
        local_10 = (local_10 + (s8(_MEM[local_8]) + 0x12));
        if (((_MEM[local_8 + 0x11] & 0x20) === 0)) {
          local_14 = FUN_005c19d3(0, (local_1c - 1));
          local_44 = (-s32((in_ECX + 0x10), 0));
        }
        else {
          local_14 = FUN_005c19d3(0, 0);
          local_44 = s32((in_ECX + 0x10), 0);
        }
        if ((_MEM[local_8 + 0x10] === 0x18)) {
          for (/* cond: (local_24 < local_1c) */); local_24 = (local_24 < local_1c); local_24 = (local_24 + 1)) {
            local_30 = local_14;
            for (/* cond: (local_2c < local_18) */); local_2c = (local_2c < local_18); local_2c = (local_2c + 1)) {
              _MEM[local_30] = _MEM[local_10 + 2];
              _MEM[local_30 + 1] = _MEM[local_10 + 1];
              _MEM[local_30 + 2] = _MEM[local_10];
              local_30 = (local_30 + 3);
              local_c = (local_c + 3);
            }
            local_14 = (local_14 + local_44);
          }
        }
        else if ((_MEM[local_8 + 0x10] === 0x20)) {
          for (/* cond: (local_24 < local_1c) */); local_24 = (local_24 < local_1c); local_24 = (local_24 + 1)) {
            local_30 = local_14;
            for (/* cond: (local_2c < local_18) */); local_2c = (local_2c < local_18); local_2c = (local_2c + 1)) {
              _MEM[local_30] = _MEM[local_10 + 2];
              _MEM[local_30 + 1] = _MEM[local_10 + 1];
              _MEM[local_30 + 2] = _MEM[local_10];
              local_30 = (local_30 + 3);
              local_10 = (local_10 + 4);
            }
            local_14 = (local_14 + local_44);
          }
        }
      }
      else if ((_MEM[local_8 + 2] === 0xa)) {
        FUN_005d225b(s_Targa_Compression_Not_Implemente_00637a20);
      }
      if (((_MEM[local_8 + 0x11] & 0x10) !== 0)) {
        FUN_005d225b(s_Why_The_hell_would_anyone_want_t_00637a48);
      }
      FUN_005c5580(local_28);
      FUN_005c5520(local_28);
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_005c463f (in_ECX, unaff_ESI, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
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
  puStack_c = LAB_005c4a0c;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    FUN_005d225b(s_Error:_Targa_File_not_found_-_00637a84);
    FUN_005dae6b(3, s_ERR_RESOURCENOTFOUND_00637abc, s_D:\Ss\Smeds32\Port.cpp_00637aa4, 0xcbd);
    local_8 = -1;
    FUN_005c4a00();
    FUN_005c4a16(unaff_ESI);
    return;
  }
  local_1c = FUN_005c5470();
  local_bc = ((s16((local_1c + 0xc), 0)) & 0xFFFF);
  local_c0 = ((s16((local_1c + 0xe), 0)) & 0xFFFF);
  local_14 = local_1c;
  FUN_006e7d90(DAT_ffffff24, 0, 0, local_bc, local_c0);
  iVar1 = FUN_005c1e49(DAT_ffffff24);
  if ((iVar1 !== 0)) {
    if ((_MEM[local_14 + 2] === 2)) {
      local_1c = (local_1c + (s8(_MEM[local_14]) + 0x12));
      if (((_MEM[local_14 + 0x11] & 0x20) === 0)) {
        local_b8 = FUN_005c19d3(0, (local_c0 - 1));
        local_e0 = (-s32((in_ECX + 0x10), 0));
      }
      else {
        local_b8 = FUN_005c19d3(0, 0);
        local_e0 = s32((in_ECX + 0x10), 0);
      }
      if ((_MEM[local_14 + 0x10] === 0x18)) {
        for (/* cond: (local_c4 < local_c0) */); local_c4 = (local_c4 < local_c0); local_c4 = (local_c4 + 1)) {
          local_cc = local_b8;
          for (/* cond: (local_c8 < local_bc) */); local_c8 = (local_c8 < local_bc); local_c8 = (local_c8 + 1)) {
            _MEM[local_cc] = _MEM[local_1c + 2];
            _MEM[local_cc + 1] = _MEM[local_1c + 1];
            _MEM[local_cc + 2] = _MEM[local_1c];
            local_cc = (local_cc + 3);
            local_18 = (local_18 + 3);
          }
          local_b8 = (local_b8 + local_e0);
        }
      }
      else if ((_MEM[local_14 + 0x10] === 0x20)) {
        for (/* cond: (local_c4 < local_c0) */); local_c4 = (local_c4 < local_c0); local_c4 = (local_c4 + 1)) {
          local_cc = local_b8;
          for (/* cond: (local_c8 < local_bc) */); local_c8 = (local_c8 < local_bc); local_c8 = (local_c8 + 1)) {
            _MEM[local_cc] = _MEM[local_1c + 2];
            _MEM[local_cc + 1] = _MEM[local_1c + 1];
            _MEM[local_cc + 2] = _MEM[local_1c];
            local_cc = (local_cc + 3);
            local_1c = (local_1c + 4);
          }
          local_b8 = (local_b8 + local_e0);
        }
      }
    }
    else if ((_MEM[local_14 + 2] === 0xa)) {
      FUN_005d225b(s_Targa_Compression_Not_Implemente_00637ad4);
    }
    if (((_MEM[local_14 + 0x11] & 0x10) !== 0)) {
      FUN_005d225b(s_Why_The_hell_would_anyone_want_t_00637afc);
    }
    FUN_005c54a0();
    FUN_00421c30();
    local_8 = -1;
    FUN_005c4a00();
    FUN_005c4a16(unaff_ESI);
    return;
  }
  FUN_005c54a0();
  FUN_00421c30();
  local_8 = -1;
  FUN_005c4a00();
  FUN_005c4a16(unaff_ESI);
  return;
}


 export function FUN_005c4a00 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005c4a16 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c4a27 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let pCVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 1;
  cVar1 = FUN_005c54f0();
  if ((cVar1 === 0)) {
    FUN_005d225b(s_Warning:_Port_not_locked_in_Fill_00637b38);
    local_8 = 0;
    FUN_005c01c1();
  }
  FUN_006e7d48(DAT_ffffffe0, param_1, (in_ECX + 0x14));
  local_c = FUN_00407f90(DAT_ffffffe0);
  if ((local_10 !== 0)) {
    if ((s32((in_ECX + 0x44), 0) === 2)) {
      pCVar2 = GetActiveView(in_ECX);
      uVar3 = GetCheckStyle(in_ECX);
      iVar4 = FUN_005e395a(uVar3, pCVar2);
      iVar5 = FUN_005c55d0();
      FUN_005e4ef8(s32((in_ECX + 0x34), 0), param_2, param_3, param_4, UNNAMED, UNNAMED, local_c, local_10, (((-u8((iVar4 === 0))) & -2) + 1) * iVar5);
    }
    else {
      FUN_005e4c3f(s32((in_ECX + 0x40), 0), DAT_ffffffe0, param_2, param_3, param_4);
    }
  }
  return;
}


 export function FUN_005c4b4c (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005c4a27((in_ECX + 0x14), param_1, param_2, param_3);
  return;
}


 export function FUN_005c4b7f (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_2c;
  let local_1c;
  let local_c;
  let local_8;

  FUN_006e7d48(DAT_ffffffe4, param_2, (in_ECX + 0x14));
  FUN_006e7d48(DAT_ffffffd4, param_3, (param_1 + 0x14));
  local_8 = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) {
    local_8 = (UNNAMED - UNNAMED);
  }
  local_c = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) {
    local_c = (UNNAMED - UNNAMED);
  }
  if ((local_c !== 0)) {
    uVar1 = GetCheckStyle(param_1);
    FUN_005bcc8d(s32((in_ECX + 0x40), 0), UNNAMED, UNNAMED, local_8, local_c, uVar1, UNNAMED, UNNAMED);
  }
  return;
}


 export function FUN_005c4c46 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_2c;
  let local_1c;
  let local_c;
  let local_8;

  FUN_006e7d48(DAT_ffffffe4, param_2, (in_ECX + 0x14));
  FUN_006e7d48(DAT_ffffffd4, param_3, (param_1 + 0x10));
  local_8 = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) {
    local_8 = (UNNAMED - UNNAMED);
  }
  local_c = (UNNAMED - UNNAMED);
  if (((UNNAMED - UNNAMED) <= (UNNAMED - UNNAMED))) {
    local_c = (UNNAMED - UNNAMED);
  }
  if ((local_c !== 0)) {
    uVar1 = FUN_005c5740(UNNAMED, UNNAMED);
    FUN_005e9838(s32((in_ECX + 0x40), 0), UNNAMED, UNNAMED, local_8, local_c, uVar1);
  }
  return;
}


 export function FUN_005c4d0d (in_ECX, param_1, param_2, param_3)

 {
  let cVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  cVar1 = FUN_005c54f0();
  if ((cVar1 === 0)) {
    FUN_005d225b(s_Warning:_Port_not_locked_in_Copy_00637b60);
    FUN_005c01c1();
  }
  uVar2 = FUN_00407fc0(param_3);
  uVar2 = FUN_00407f90(param_3, uVar2);
  uVar2 = FUN_005c5740(s32(param_3, 0), s32(param_3, 1), uVar2);
  uVar2 = FUN_00407fc0(param_2, uVar2);
  uVar2 = FUN_00407f90(param_2, uVar2);
  FUN_005e98ba(s32((in_ECX + 0x40), 0), s32(param_2, 0), s32(param_2, 1), uVar2);
  if ((cVar1 === 0)) {
    FUN_005c02e0();
  }
  return;
}


 export function FUN_005c4dd3 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_00637b8c);
  }
  else if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if (((param_4 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(PTR_DAT_00637e5c, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      FUN_005e47a5(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, (iVar1 + param_2), (iVar1 + param_3), (in_ECX + 0x14), param_4, 0, 0, 0);
    }
    FUN_005e47a5(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3, (in_ECX + 0x14), param_4, param_5, param_6, param_7);
  }
  return;
}


 export function FUN_005c4eb6 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_14;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_00637bac);
  }
  else if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if (((param_3 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(PTR_DAT_00637e5c, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      local_14 = s32(param_2, 0);
      local_14 = s32(param_2, 1);
      local_14 = s32(param_2, 2);
      local_14 = s32(param_2, 3);
      FUN_006e7da4(DAT_ffffffec, iVar1, iVar1);
      FUN_005e49a0(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, DAT_ffffffec, param_3, 0, 0, 0);
    }
    FUN_005e3eca(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3);
  }
  return;
}


 export function FUN_005c4f9f (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if (((param_5 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(param_1, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      FUN_005e47a5(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, (param_3 + iVar1), (param_4 + iVar1), (in_ECX + 0x14), param_5, 0, 0, 0);
    }
    FUN_005e47a5(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, param_3, param_4, (in_ECX + 0x14), param_5, param_6, param_7, param_8);
  }
  return;
}


 export function FUN_005c505d (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_14;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    if (((param_4 & 0x10) !== 0)) {
      iVar1 = FUN_005c847f(s32(param_1, 0));
      iVar1 = ((iVar1 + ((iVar1 >> 0x1f) & 7)) >> 3);
      local_14 = s32(param_3, 0);
      local_14 = s32(param_3, 1);
      local_14 = s32(param_3, 2);
      local_14 = s32(param_3, 3);
      FUN_006e7da4(DAT_ffffffec, iVar1, iVar1);
      FUN_005e49a0(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, DAT_ffffffec, param_4, 0, 0, 0);
    }
    FUN_005e49a0(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, param_3, param_4, param_5, param_6, param_7);
  }
  return;
}


 export function FUN_005c512d (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  // in_ECX promoted to parameter;

  if ((PTR_DAT_00637e5c === 0)) {
    FUN_005d225b(s_Error:_No_current_font_selected_00637bcc);
  }
  else if ((s32((in_ECX + 0x40), 0) !== 0)) {
    FUN_005e4aa6(s32((in_ECX + 0x40), 0), s32(PTR_DAT_00637e5c, 0), param_1, param_2, param_3, param_4, param_5, param_6);
  }
  return;
}


 export function FUN_005c51a5 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    FUN_005e4aa6(s32((in_ECX + 0x40), 0), s32(param_1, 0), param_2, param_3, param_4, param_5, param_6, param_7);
  }
  return;
}


 export function FUN_005c51fc (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    FUN_005e4b9b(s32((in_ECX + 0x40), 0), param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  }
  return;
}


 export function FUN_005c52dd (in_ECX, param_1, param_2, param_3, param_4)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x40), 0) !== 0)) {
    FUN_005c51fc(s32(param_1, 0), s32(param_1, 1), s32(param_1, 2), s32(param_1, 1), param_2, param_3, param_4);
    FUN_005c51fc(s32(param_1, 2), s32(param_1, 1), s32(param_1, 2), s32(param_1, 3), param_2, param_3, param_4);
    FUN_005c51fc(s32(param_1, 2), s32(param_1, 3), s32(param_1, 0), s32(param_1, 3), param_2, param_3, param_4);
    FUN_005c51fc(s32(param_1, 0), s32(param_1, 3), s32(param_1, 0), s32(param_1, 1), param_2, param_3, param_4);
  }
  return;
}


 export function FUN_005c53c3 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  iVar1 = (s32((in_ECX + 0x44), 0) << 3);
  uVar2 = FUN_005c19d3(0, 0);
  FUN_005e4cc8(s32((in_ECX + 0x40), 0), uVar2, iVar1, param_1, param_2, param_3);
  return;
}


 export function FUN_005c5410 (param_1)

 {
  return ((((param_1) & 0xFF) << 8) | (((param_1) >> 8) & 0xFF));
}


 export function FUN_005c5430 (param_1)

 {
  return ((((param_1 << 0x18) | ((param_1 & 0xff00) << 8)) | ((param_1 & 0xff0000) >>> 8)) | (param_1 >>> 0x18));
}


 export function FUN_005c5470 ()

 {
  FUN_005d89e8();
  return;
}


 export function FUN_005c54a0 ()

 {
  FUN_005d8ab8();
  return;
}


 export function FUN_005c54d0 (param_1)

 {
  return param_1;
}


 export function FUN_005c54f0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return (s32((in_ECX + 0x34), 0) !== 0);
}


 export function FUN_005c5520 (param_1)

 {
  FUN_005db1e0(param_1);
  return;
}


 export function FUN_005c5540 (param_1, param_2)

 {
  FUN_005db1fa(param_1, param_2);
  return;
}


 export function FUN_005c5560 (param_1)

 {
  FUN_005db531(param_1);
  return;
}


 export function FUN_005c5580 (param_1)

 {
  FUN_005db54b(param_1);
  return;
}


 export function FUN_005c55a0 (param_1)

 {
  return ((((param_1 + 3) + (((param_1 + 3) >> 0x1f) & 3)) >> 2) << 2);
}


 export function FUN_005c55d0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0xc), 0);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* unsigned */  /* int */  /* __thiscall */
 /* CCheckListBox::GetCheckStyle(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function GetCheckStyle (this)

 {
  return s32((this + 0x40), 0);
}


 export function FUN_005c5610 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  return (s32((in_ECX + 0x10), 0) + param_1);
}


 export function FUN_005c5640 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0x34), 0);
}


 export function FUN_005c5660 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 4), 0);
}


 export function FUN_005c5680 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 8), 0);
}


 export function FUN_005c56a0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0xc), 0);
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* __thiscall */
 /* _Timevec::~_Timevec(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~_Timevec (this)

 {
  FUN_005e92c9(s32(this, 0));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* int */  /* __thiscall */
 /* CSplitterWnd::IsTracking(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function IsTracking (this)

 {
  return s32((this + 0x408), 0);
}


 export function FUN_005c5710 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  return (param_1 - s32((in_ECX + 0x10), 0));
}


 export function FUN_005c5740 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32(in_ECX, 0);
}


 export function FUN_005c5760 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005c5f20(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  uVar1 = FUN_00414d10();
  FUN_005ea7a0(in_ECX, uVar1);
  return;
}


 export function FUN_005c57b1 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  FUN_005c5760(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
  return;
}


 export function FUN_005c57f9 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005c5fc4(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  uVar1 = FUN_00414d10();
  FUN_005ea7a0(in_ECX, uVar1);
  return;
}


 export function FUN_005c584e (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  FUN_005c57f9(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  FUN_00579b40(param_9);
  return;
}


 export function FUN_005c589a (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005c6070(param_1, param_2, param_3, param_4, param_5, param_6);
  uVar1 = FUN_00414d10();
  FUN_005ea7a0(in_ECX, uVar1);
  return;
}


 export function FUN_005c58e7 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  FUN_005c589a(param_1, param_2, param_3, param_4, param_5, param_6);
  FUN_00579b40(param_7);
  return;
}


 export function FUN_005c592b (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005c610c(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  uVar1 = FUN_00414d10();
  FUN_005ea7a0(in_ECX, uVar1);
  return;
}


 export function FUN_005c597c (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  FUN_005c592b(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
  return;
}


 export function FUN_005c59c4 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = s32((in_ECX + 0xb8), 0);
  if ((local_8 === 0)) {
    w32((in_ECX + 0xb8), 0, param_1);
  }
  else {
    for (/* cond: (s32((local_8 + 0x20), 0) !== 0) */); local_8 = (local_8 + 0x20); local_8 = s32((local_8 + 0x20), 0)) {
    }
    w32((local_8 + 0x20), 0, param_1);
  }
  return;
}


 export function FUN_005c5a27 (in_ECX, param_1)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0xb8), 0) !== 0)) {
    local_8 = s32((in_ECX + 0xb8), 0);
    iVar1 = FUN_00418740();
    if ((iVar1 === param_1)) {
      w32((in_ECX + 0xb8), 0, s32((local_8 + 0x20), 0));
    }
    else {
      while ((iVar1 === param_1)) {
        if ((local_8 === 0)) {
          return;
        }
        iVar1 = FUN_005c5e80();
        if ((iVar1 === 0)) {
          return;
        }
        FUN_005c5e80();
        iVar1 = FUN_00418740();
        if ((iVar1 === param_1));
      }
      FUN_005c5e80();
      uVar2 = FUN_005c5e80();
      w32((local_8 + 0x20), 0, uVar2);
    }
  }
  return;
}


 export function FUN_005c5aeb (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_8;

  for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32((local_8 + 0x20), 0)) {
    uVar1 = FUN_00418740();
    FUN_005c5a27(uVar1);
  }
  return;
}


 export function FUN_005c5b36 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  for (/* cond: (local_8 !== 0) */); local_8 = (local_8 !== 0); local_8 = s32((local_8 + 0x20), 0)) {
    FUN_005c8b00(s32((local_8 + 0x1c), 0));
  }
  return;
}


 export function FUN_005c5b7f (in_ECX)

 {
  let cVar1;
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = s32((in_ECX + 0xb8), 0);
  while ((cVar1 !== 0)) {
    if ((local_8 === 0)) {
      if ((_MEM[(in_ECX + 0xc4)] !== 0)) {
        FUN_005eabcc(in_ECX, s32((in_ECX + 0xb8), 0));
      }
      return;
    }
    cVar1 = FUN_005c5ea0();
    if ((cVar1 !== 0));
  }
  if ((_MEM[(in_ECX + 0xc4)] === 0)) {
    return;
  }
  FUN_005eabcc(in_ECX, local_8);
  return;
}


 export function FUN_005c5c2d (in_ECX)

 {
  let cVar1;
  // in_ECX promoted to parameter;
  let local_8;

  local_8 = s32((in_ECX + 0xb8), 0);
  while ((cVar1 !== 0)) {
    if ((local_8 === 0)) {
      return 0;
    }
    cVar1 = FUN_005c5ea0();
    if ((cVar1 !== 0));
  }
  return local_8;
}


 export function FUN_005c5c86 (in_ECX, param_1)

 {
  let sVar1;
  let iVar2;
  let pcVar3;
  let uVar4;
  let iVar5;
  // in_ECX promoted to parameter;
  let local_20;
  let local_14;
  let local_10;
  let local_c;
  let local_b;
  let local_8;

  local_8 = 0;
  local_14 = 0;
  local_c = param_1;
  local_b = 0;
  __strlwr(DAT_fffffff4);
  sVar1 = local_c;
  local_10 = s32((in_ECX + 0xb8), 0);
  do {
    if ((local_10 === 0)) {
      return local_14;
    }
    if ((local_8 !== 0)) {
      return local_14;
    }
    if ((s32((local_10 + 0x28), 0) < 0)) {
      iVar2 = FUN_005c5e60();
      if ((iVar2 === 3)) {
        iVar2 = FUN_005c5ee0();
        iVar5 = FUN_005c5f00();
        for (/* cond: (local_20 < iVar5) */); local_20 = (local_20 < iVar5); local_20 = (local_20 + 1)) {
          if ((_MEM[((iVar2 + 0x9c) + local_20 * 0xa4)] === sVar1)) {
            FUN_005d9a9a(s32((iVar2 + local_20 * 0xa4), 0));
            local_14 = 1;
            local_8 = 1;
            break;
          }
        }
      }
    }
    else if ((_MEM[local_10 + 0x25] === sVar1)) {
      iVar2 = FUN_005c5e60();
      if ((pcVar3 !== 0)) {
        uVar4 = FUN_00418770();
        FUN_005cac22(uVar4);
        return 1;
      }
      iVar2 = FUN_005c5e60();
      if ((iVar2 !== 0)) {
        uVar4 = FUN_00418770();
        FUN_005cc274(uVar4);
        return 1;
      }
    }
    local_10 = s32((local_10 + 0x20), 0);
  } /* goto */ ( true );
}


 export function FUN_005c5e60 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32(in_ECX, 0);
}


 export function FUN_005c5e80 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0x20), 0);
}


 export function FUN_005c5ea0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return _MEM[(in_ECX + 0x24)];
}


 export function FUN_005c5ec0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0x34), 0);
}


 export function FUN_005c5ee0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0x48), 0);
}


 export function FUN_005c5f00 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0x38), 0);
}


 export function FUN_005c5f20 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005db67b(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  uVar1 = FUN_00414d10();
  FUN_005eb393(in_ECX, uVar1);
  FUN_0044c8e0();
  return;
}


 export function FUN_005c5f7c (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  FUN_005c5f20(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
  return;
}


 export function FUN_005c5fc4 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005db893(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  uVar1 = FUN_00414d10();
  FUN_005eb393(in_ECX, uVar1);
  FUN_0044c8e0();
  return;
}


 export function FUN_005c6024 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  FUN_005c5fc4(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  FUN_00579b40(param_9);
  return;
}


 export function FUN_005c6070 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005db704(param_1, param_2, param_3, param_4, param_5, param_6);
  uVar1 = FUN_00414d10();
  FUN_005eb393(in_ECX, uVar1);
  FUN_0044c8e0();
  return;
}


 export function FUN_005c60c8 (param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  FUN_005c6070(param_1, param_2, param_3, param_4, param_5, param_6);
  FUN_00579b40(param_7);
  return;
}


 export function FUN_005c610c (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6, param_7)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005db923(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  uVar1 = FUN_00414d10();
  FUN_005eb393(in_ECX, uVar1);
  FUN_0044c8e0();
  return;
}


 export function FUN_005c6168 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  FUN_005c610c(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
  return;
}


 export function FUN_005c61b0 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  if ((DAT_00637ea8 !== 0xf)) {
    w32((in_ECX + 0x8c), 0, 1);
    wv(DAT_00637ea8, (DAT_00637ea8 + 1));
    w32(DAT_00637eb0, (DAT_00637ea8 + 1), in_ECX);
    if (((DAT_00637ea8 + 1) === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = FUN_00414d10();
    }
    uVar1 = FUN_00414d10(local_8);
    FUN_005bd14c(uVar1);
    while ((s32((in_ECX + 0x8c), 0) !== 0)) {
      FUN_0040ef50();
      if ((s32((in_ECX + 0xa4), 0) !== 0)) {
        in_ECX = (in_ECX + 0xa4);
      }
    }
    if ((DAT_00637ea8 === 0)) {
      local_c = 0;
    }
    else {
      local_c = FUN_00414d10();
    }
    uVar1 = FUN_00414d10(local_c);
    FUN_005bd1c5(uVar1);
    wv(DAT_00637ea8, (DAT_00637ea8 + -1));
    if ((-1 < (DAT_00637ea8 + -1))) {
      w32((in_ECX + 0x8c), 0, 1);
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CRichEditDoc::InvalidateObjectCache(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function InvalidateObjectCache (this)

 {
  w32((this + 0x8c), 0, 0);
  return;
}


 export function FUN_005c62ee ()

 {
  return DAT_00637ea4;
}


 export function FUN_005c6303 (param_1)

 {
  let uVar1;

  uVar1 = DAT_00637ea4;
  wv(DAT_00637ea4, param_1);
  return uVar1;
}


 export function FUN_005c6329 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  FUN_005c6400(DAT_fffffff4, DAT_fffffff8);
  if ((param_1 <= (local_8 - local_c))) {
    w32((in_ECX + 0x90), 0, param_1);
  }
  return;
}


 export function FUN_005c636c (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  FUN_005c6440(DAT_fffffff4, DAT_fffffff8);
  if ((param_1 <= (local_8 - local_c))) {
    w32((in_ECX + 0x94), 0, param_1);
  }
  return;
}


 export function FUN_005c63af (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;
  let bVar1;

  bVar1 = (s32((in_ECX + 0xa0), 0) !== 0);
  if (bVar1) {
    in_ECX = (in_ECX + 0xa0);
  }
  return bVar1;
}


 export function FUN_005c6400 (param_1, param_2)

 {
  let uVar1;

  uVar1 = FUN_00414d10(param_1, param_2, 0);
  FUN_005cd5c3(uVar1);
  return;
}


 export function FUN_005c6440 (param_1, param_2)

 {
  let uVar1;

  uVar1 = FUN_00414d10(param_1, param_2, 1);
  FUN_005cd5c3(uVar1);
  return;
}


 export function FUN_005c6480 ()

 {
  FUN_005decb1();
  FUN_005c6a42();
  return;
}


 export function FUN_005c64da (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  FUN_005de780();
  uVar1 = FUN_005dec4e(in_ECX);
  w32((in_ECX + 0x404), 0, uVar1);
  FUN_005c6a42();
  _MEM[(in_ECX + 0x424)] = 0;
  _MEM[(in_ECX + 0x425)] = 0;
  _MEM[(in_ECX + 0x426)] = 0;
  w32((in_ECX + 0x430), 0, 0);
  w32((in_ECX + 0x42c), 0, s32((in_ECX + 0x430), 0));
  w32((in_ECX + 0x428), 0, s32((in_ECX + 0x42c), 0));
  return in_ECX;
}


 export function FUN_005c656b (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005dec8a(s32((in_ECX + 0x404), 0));
  if ((s32((in_ECX + 0x428), 0) !== 0)) {
    FUN_005dce96(s32((in_ECX + 0x428), 0));
  }
  if ((s32((in_ECX + 0x42c), 0) !== 0)) {
    FUN_005dce96(s32((in_ECX + 0x42c), 0));
  }
  if ((s32((in_ECX + 0x430), 0) !== 0)) {
    FUN_005dce96(s32((in_ECX + 0x430), 0));
  }
  return;
}


 export function FUN_005c65f9 (param_1)

 {
  let iVar1;
  let puVar2;
  let uVar3;
  let uVar4;
  let local_8;
  let local_7;
  let local_6;
  let local_5;

  local_8 = 0x43;
  local_7 = 0x54;
  local_6 = 0x41;
  local_5 = 0x42;
  iVar1 = FUN_005c5540(DAT_fffffff8, param_1);
  if ((iVar1 === 0)) {
    FUN_005d233f(s_Error:_Color_resource_not_found_-_00637bec, param_1);
  }
  else {
    puVar2 = FUN_005c5560(iVar1);
    uVar3 = FUN_005c54d0(s32(puVar2, 0));
    uVar4 = FUN_005c54d0(s32(puVar2, 1));
    FUN_005c6da8(uVar3, uVar4, (puVar2 + 2));
    FUN_005c5580(iVar1);
    FUN_005c5520(iVar1);
  }
  return;
}


 export function FUN_005c66b9 (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let local_8;
  let local_7;
  let local_6;
  let local_5;

  local_8 = 0x43;
  local_7 = 0x54;
  local_6 = 0x41;
  local_5 = 0x42;
  iVar1 = FUN_005c5540(DAT_fffffff8, param_1);
  if ((iVar1 === 0)) {
    FUN_005d233f(s_Error:_Color_resource_not_found_-_00637c10, param_1);
  }
  else {
    iVar2 = FUN_005c5560(iVar1);
    FUN_005c6da8(param_2, param_3, (iVar2 + 8));
    FUN_005c5580(iVar1);
    FUN_005c5520(iVar1);
  }
  return;
}


 export function FUN_005c6757 (param_1)

 {
  FUN_005c68f0(param_1);
  return;
}


 export function FUN_005c677b (param_1)

 {
  FUN_005c67a6(param_1, 0, 0xff);
  return;
}


 export function FUN_005c67a6 (unaff_ESI, unaff_EBX, param_1, param_2, param_3)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let uVar4;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005c68d6;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  uVar4 = extraout_var;
  uVar1 = FUN_005dce4f(param_3 * 3);
  uVar2 = FUN_005dcdf9(uVar1);
  FUN_005ded12(uVar4, uVar2, param_2, param_3);
  iVar3 = Realloc(param_1);
  if ((iVar3 === 0)) {
    local_8 = -1;
    FUN_005c68ca();
    FUN_005c68e0(unaff_ESI, unaff_EBX, uVar4);
    return;
  }
  FUN_00421c60(DAT_00000008, 4);
  FUN_00421c60(DAT_0000000c, 4);
  FUN_00421c60(uVar2, param_3 * 3);
  FUN_00421c30();
  FUN_005dce29(uVar1);
  FUN_005dce96(uVar1);
  local_8 = -1;
  FUN_005c68ca();
  FUN_005c68e0(unaff_ESI, unaff_EBX, uVar4);
  return;
}


 export function FUN_005c68ca ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005c68e0 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c68f0 (unaff_ESI, param_1)

 {
  let iVar1;
  let uVar2;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_b4;
  let local_b0;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005c6a28;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_005c6a1c();
    FUN_005c6a32(unaff_ESI);
    return;
  }
  FUN_004bb370(DAT_ffffffec, 4);
  FUN_004bb370(DAT_ffffff4c, 4);
  local_b0 = FUN_005dce4f(local_b4 * 3);
  uVar2 = FUN_005dcdf9(local_b0);
  FUN_004bb370(uVar2, local_b4 * 3);
  FUN_00421c30();
  FUN_005c6da8(local_14, local_b4, uVar2);
  FUN_005dce29(local_b0);
  FUN_005dce96(local_b0);
  local_8 = -1;
  FUN_005c6a1c();
  FUN_005c6a32(unaff_ESI);
  return;
}


 export function FUN_005c6a1c ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005c6a32 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c6a42 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x408), 0, 0);
  while ((s32((in_ECX + 0x408), 0) === 0)) {
    uVar1 = _rand();
    w32((in_ECX + 0x408), 0, (uVar1 & 0x7fff));
  }
  return;
}


 export function FUN_005c6a8d (param_1, param_2)

 {
  FUN_005de984();
  FUN_005c6480(param_1, param_2);
  return;
}


 export function FUN_005c6ac9 (param_1, param_2)

 {
  FUN_005de9e0();
  FUN_005c6480(param_1, param_2);
  return;
}


 export function FUN_005c6b05 ()

 {
  FUN_005dea62();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Same */  /* Base */
 /* Name */     /* protected: */  /* virtual */  /* unsigned */  /* char */  /* * */  /* __thiscall */  /* CHtmlStream::Realloc(unsigned */  /* char */
 /* *,unsigned */
 /* long) */     /* protected: */  /* virtual */  /* unsigned */  /* char */  /* * */  /* __thiscall */  /* CMemFile::Realloc(unsigned */  /* char */  /* *,unsigned */
 /* long) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function Realloc (param_1, param_2)

 {
  FUN_005deced(param_1, param_2);
  return;
}


 export function FUN_005c6b63 ()

 {
  FUN_005ded12();
  return;
}


 export function FUN_005c6b93 (param_1)

 {
  FUN_005deb12();
  FUN_005c6480(param_1, 1);
  return;
}


 export function FUN_005c6bd5 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((0x100 < (param_2 + param_1))) {
    param_2 = (0x100 - param_1);
  }
  if ((param_3 < 0)) {
    for (/* cond: (((-local_24) !== param_3) && (local_24 <= (-param_3))) */); local_24 = (-local_24); local_24 = (local_24 + 1)) {
      FUN_005dea9e(in_ECX, param_1, DAT_ffffffec, DAT_ffffffe0, DAT_fffffff0);
      for (/* cond: (local_1c < ((param_2 + param_1) + -1)) */); local_1c = (local_1c < ((param_2 + param_1) + -1)); local_1c = (local_1c + 1)) {
        FUN_005dea9e(in_ECX, (local_1c + 1), DAT_fffffff4, DAT_ffffffe8, DAT_fffffff8);
        FUN_005deadb(in_ECX, local_1c, local_c, local_18, local_8);
      }
      FUN_005deadb(in_ECX, ((param_2 + param_1) + -1), local_14, local_20, local_10);
    }
  }
  else {
    for (/* cond: (local_24 < param_3) */); local_24 = (local_24 < param_3); local_24 = (local_24 + 1)) {
      FUN_005dea9e(in_ECX, ((param_2 + param_1) + -1), DAT_ffffffec, DAT_ffffffe0, DAT_fffffff0);
      iVar1 = (param_2 + param_1);
      while ((param_1 < local_1c)) {
        FUN_005dea9e(in_ECX, (iVar1 + -2), DAT_fffffff4, DAT_ffffffe8, DAT_fffffff8);
        FUN_005deadb(in_ECX, local_1c, local_c, local_18, local_8);
        iVar1 = local_1c;
      }
      FUN_005deadb(in_ECX, param_1, local_14, local_20, local_10);
    }
  }
  FUN_005dea62(in_ECX, s32((in_ECX + 0x404), 0), param_1, param_2);
  return;
}


 export function FUN_005c6da8 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((0x100 < (param_2 + param_1))) {
    param_2 = (0x100 - param_1);
  }
  for (/* cond: (local_8 < (param_2 + param_1)) */); local_8 = (local_8 < (param_2 + param_1)); local_8 = (local_8 + 1)) {
    FUN_005deb12(in_ECX, local_8, _MEM[param_3], _MEM[param_3 + 1], _MEM[param_3 + 2]);
    param_3 = (param_3 + 3);
  }
  FUN_005c6480(param_1, param_2);
  return;
}


 export function FUN_005c6e36 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x40c), 0, param_3);
  w32((in_ECX + 0x410), 0, param_1);
  w32((in_ECX + 0x414), 0, param_2);
  uVar1 = FUN_005dce4f(param_2 * 3);
  w32((in_ECX + 0x430), 0, uVar1);
  uVar1 = FUN_005dcdf9(s32((in_ECX + 0x430), 0));
  FUN_005ded12(in_ECX, uVar1, param_1, param_2);
  FUN_005dce29(s32((in_ECX + 0x430), 0));
  FUN_005c6a8d(param_1, param_2);
  return;
}


 export function FUN_005c6edc (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  // in_ECX promoted to parameter;

  _MEM[(in_ECX + 0x424)] = param_4;
  _MEM[(in_ECX + 0x425)] = param_5;
  _MEM[(in_ECX + 0x426)] = param_6;
  FUN_005c6e36(param_1, param_2, param_3);
  return;
}


 export function FUN_005c6f2c (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005dcdf9(s32((in_ECX + 0x430), 0));
  FUN_005c6da8(s32((in_ECX + 0x410), 0), s32((in_ECX + 0x414), 0), uVar1);
  FUN_005dce29(s32((in_ECX + 0x430), 0));
  FUN_005c6ac9(s32((in_ECX + 0x410), 0), s32((in_ECX + 0x414), 0));
  uVar1 = FUN_005dce96(s32((in_ECX + 0x430), 0));
  w32((in_ECX + 0x430), 0, uVar1);
  return;
}


 export function FUN_005c6fc3 (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005dcdf9(s32((in_ECX + 0x430), 0));
  FUN_005dced3(param_2, uVar1, param_1 * 3);
  FUN_005dce29(s32((in_ECX + 0x430), 0));
  return;
}


 export function FUN_005c701c (in_ECX, param_1)

 {
  let bVar1;
  let bVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let cVar7;
  let cVar8;
  let iVar9;
  // in_ECX promoted to parameter;
  let local_20;

  if ((s32((in_ECX + 0x40c), 0) < param_1)) {
    FUN_005d2279(s_Color_Scale_factor_out_of_range_00637c34, param_1);
  }
  else {
    bVar1 = _MEM[(in_ECX + 0x424)];
    iVar4 = s32((in_ECX + 0x40c), 0);
    bVar2 = _MEM[(in_ECX + 0x426)];
    iVar5 = s32((in_ECX + 0x40c), 0);
    bVar3 = _MEM[(in_ECX + 0x425)];
    iVar6 = s32((in_ECX + 0x40c), 0);
    cVar8 = ((param_1) & 0xFF);
    cVar7 = (((s32((in_ECX + 0x40c), 0)) & 0xFF) - cVar8);
    iVar9 = FUN_005dcdf9(s32((in_ECX + 0x430), 0));
    for (/* cond: (local_20 < s32((in_ECX + 0x414), 0) * 3) */); local_20 = (local_20 < s32((in_ECX + 0x414), 0) * 3); local_20 = (local_20 + 3)) {
      FUN_005deadb(in_ECX, (s32((in_ECX + 0x410), 0) + (local_20 / 3 | 0)), ((((u8(_MEM[(local_20 + iVar9)]) / s32((in_ECX + 0x40c), 0) | 0)) & 0xFF) * cVar8 + cVar7 * (((u8(bVar1) / iVar4 | 0)) & 0xFF)), ((((u8(_MEM[((local_20 + 1) + iVar9)]) / s32((in_ECX + 0x40c), 0) | 0)) & 0xFF) * cVar8 + cVar7 * (((u8(bVar3) / iVar6 | 0)) & 0xFF)), ((((u8(_MEM[((local_20 + 2) + iVar9)]) / s32((in_ECX + 0x40c), 0) | 0)) & 0xFF) * cVar8 + cVar7 * (((u8(bVar2) / iVar5 | 0)) & 0xFF)));
    }
    FUN_005dea62(in_ECX, s32((in_ECX + 0x404), 0), s32((in_ECX + 0x410), 0), s32((in_ECX + 0x414), 0));
    FUN_005dce29(s32((in_ECX + 0x430), 0));
  }
  return;
}


 export function FUN_005c71f3 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x418), 0, param_3);
  w32((in_ECX + 0x41c), 0, param_1);
  w32((in_ECX + 0x420), 0, param_2);
  uVar1 = FUN_005dce4f(param_2 * 3);
  w32((in_ECX + 0x428), 0, uVar1);
  uVar1 = FUN_005dce4f(param_2 * 3);
  w32((in_ECX + 0x42c), 0, uVar1);
  uVar1 = FUN_005dcdf9(s32((in_ECX + 0x428), 0));
  FUN_005ded12(in_ECX, uVar1, param_1, param_2);
  FUN_005dce29(s32((in_ECX + 0x428), 0));
  uVar1 = FUN_005dcdf9(s32((in_ECX + 0x42c), 0));
  uVar1 = FUN_0046f440(uVar1, param_1, param_2);
  FUN_005ded12(uVar1);
  FUN_005dce29(s32((in_ECX + 0x42c), 0));
  FUN_005c6a8d(param_1, param_2);
  return;
}


 export function FUN_005c72f8 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005dcdf9(s32((in_ECX + 0x428), 0));
  FUN_005c6da8(s32((in_ECX + 0x41c), 0), s32((in_ECX + 0x420), 0), uVar1);
  FUN_005dce29(s32((in_ECX + 0x428), 0));
  uVar1 = FUN_005dce96(s32((in_ECX + 0x428), 0));
  w32((in_ECX + 0x428), 0, uVar1);
  uVar1 = FUN_005dce96(s32((in_ECX + 0x42c), 0));
  w32((in_ECX + 0x42c), 0, uVar1);
  return;
}


 export function FUN_005c738e (in_ECX, param_1)

 {
  let cVar1;
  let cVar2;
  let iVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_18;

  if ((s32((in_ECX + 0x418), 0) < param_1)) {
    FUN_005d2279(s_Color_Scale_factor_out_of_range_00637c54, param_1);
  }
  else {
    cVar2 = ((param_1) & 0xFF);
    cVar1 = (((s32((in_ECX + 0x418), 0)) & 0xFF) - cVar2);
    iVar3 = FUN_005dcdf9(s32((in_ECX + 0x428), 0));
    iVar4 = FUN_005dcdf9(s32((in_ECX + 0x42c), 0));
    for (/* cond: (local_18 < s32((in_ECX + 0x420), 0) * 3) */); local_18 = (local_18 < s32((in_ECX + 0x420), 0) * 3); local_18 = (local_18 + 3)) {
      FUN_005deadb(in_ECX, (s32((in_ECX + 0x41c), 0) + (local_18 / 3 | 0)), ((((u8(_MEM[(local_18 + iVar4)]) / s32((in_ECX + 0x418), 0) | 0)) & 0xFF) * cVar1 + (((u8(_MEM[(local_18 + iVar3)]) / s32((in_ECX + 0x418), 0) | 0)) & 0xFF) * cVar2), ((((u8(_MEM[((local_18 + 1) + iVar3)]) / s32((in_ECX + 0x418), 0) | 0)) & 0xFF) * cVar2 + (((u8(_MEM[((local_18 + 1) + iVar4)]) / s32((in_ECX + 0x418), 0) | 0)) & 0xFF) * cVar1), ((((u8(_MEM[((local_18 + 2) + iVar4)]) / s32((in_ECX + 0x418), 0) | 0)) & 0xFF) * cVar1 + (((u8(_MEM[((local_18 + 2) + iVar3)]) / s32((in_ECX + 0x418), 0) | 0)) & 0xFF) * cVar2));
    }
    FUN_005dea62(in_ECX, s32((in_ECX + 0x404), 0), s32((in_ECX + 0x41c), 0), s32((in_ECX + 0x420), 0));
    FUN_005dce29(s32((in_ECX + 0x428), 0));
    FUN_005dce29(s32((in_ECX + 0x42c), 0));
  }
  return;
}


 export function FUN_005c7579 (unaff_ESI, unaff_EBX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let uVar5;
  let local_834;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005c76f0;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c79bf();
  local_8 = 0;
  uVar5 = extraout_var;
  uVar2 = FUN_005dce4f(param_4 * 3);
  iVar3 = FUN_005dcdf9(uVar2);
  FUN_005c6b63(iVar3, param_3, param_4);
  FUN_005c7a86(iVar3, param_3, param_4);
  FUN_005c6b63(iVar3, param_3, param_4);
  for (/* cond: (local_834 < param_4 * 3) */); local_834 = (local_834 < param_4 * 3); local_834 = (local_834 + 3)) {
    uVar4 = (local_834 >>> 8);
    uVar1 = FUN_005c7e06(((uVar4 << 8) | _MEM[(local_834 + iVar3)]), ((uVar4 << 8) | _MEM[((local_834 + 1) + iVar3)]), ((uVar4 << 8) | _MEM[((local_834 + 2) + iVar3)]), 0x20);
    _MEM[(param_1 + (local_834 / 3 | 0))] = uVar1;
  }
  FUN_005dce29(uVar2);
  uVar2 = FUN_005dce96(uVar2);
  local_8 = -1;
  FUN_005c76e4();
  FUN_005c76fa(unaff_ESI, unaff_EBX, uVar5, uVar2);
  return;
}


 export function FUN_005c76e4 ()

 {
  FUN_005c7a30();
  return;
}


 export function FUN_005c76fa (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c770a (unaff_ESI, unaff_EBX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let uVar5;
  let uVar4;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let uVar6;
  let iVar7;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005c787f;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c79bf();
  local_8 = 0;
  uVar6 = extraout_var;
  uVar2 = FUN_005dce4f(0x300);
  iVar3 = FUN_005dcdf9(uVar2);
  FUN_005c6b63(iVar3, param_5, param_6);
  FUN_005c7a86(iVar3, param_5, param_6);
  FUN_005c6b63(iVar3, param_3, param_4);
  for (/* cond: (iVar7 < param_4 * 3) */); iVar7 = (iVar7 < param_4 * 3); iVar7 = (iVar7 + 3)) {
    uVar5 = (iVar7 >>> 8);
    uVar1 = FUN_005c7e06(((uVar5 << 8) | _MEM[(iVar7 + iVar3)]), ((uVar5 << 8) | _MEM[((iVar7 + 1) + iVar3)]), ((uVar5 << 8) | _MEM[((iVar7 + 2) + iVar3)]), 0x20);
    _MEM[(param_1 + (iVar7 / 3 | 0))] = uVar1;
  }
  uVar4 = FUN_005dce29(uVar2);
  uVar2 = FUN_005dce96(uVar2);
  local_8 = -1;
  FUN_005c7873();
  FUN_005c7889(unaff_ESI, unaff_EBX, uVar6, uVar2, uVar4, iVar7);
  return;
}


 export function FUN_005c7873 ()

 {
  FUN_005c7a30();
  return;
}


 export function FUN_005c7889 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c7899 (unaff_ESI, unaff_EBX, param_1, param_2, param_3)

 {
  let uVar1;
  let uVar2;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let uVar3;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005c79a4;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c79bf();
  local_8 = 0;
  uVar3 = extraout_var;
  uVar1 = FUN_005dce4f(0x300);
  uVar2 = FUN_005dcdf9(uVar1);
  FUN_005c6b63(uVar2, 0, 0x100);
  FUN_005c7a86(uVar2, 0, 0x100);
  FUN_005c7e06(param_1, param_2, param_3, 0x20);
  FUN_005dce29(uVar1);
  FUN_005dce96(uVar1);
  local_8 = -1;
  FUN_005c7998();
  FUN_005c79ae(unaff_ESI, unaff_EBX, uVar3);
  return;
}


 export function FUN_005c7998 ()

 {
  FUN_005c7a30();
  return;
}


 export function FUN_005c79ae (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005c79bf (in_ECX)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 0x206, 0);
  w32(in_ECX, 0x207, 0);
  w32(in_ECX, 0x205, 0);
  w32(in_ECX, 1, 0);
  w32(in_ECX, 0, 0);
  w32(in_ECX, 3, 0);
  w32(in_ECX, 4, 0);
  w32(in_ECX, 2, 0);
  return in_ECX;
}


 export function FUN_005c7a30 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 1) !== 0)) {
    iVar1 = FUN_005dce29(s32(in_ECX, 0));
    w32(in_ECX, 1, iVar1);
  }
  if ((s32(in_ECX, 0) !== 0)) {
    iVar1 = FUN_005dce96(s32(in_ECX, 0));
    w32(in_ECX, 0, iVar1);
  }
  return;
}


 export function FUN_005c7a86 (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_20;
  let local_1c;
  let local_18;
  let local_17;
  let local_16;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 1;
  w32(in_ECX, 4, param_2);
  w32(in_ECX, 3, param_3);
  uVar3 = FUN_005dce4f((s32(in_ECX, 3) + 2) * 0x10);
  w32(in_ECX, 0, uVar3);
  uVar3 = FUN_005dcdf9(s32(in_ECX, 0));
  w32(in_ECX, 1, uVar3);
  w32(in_ECX, 2, (s32(in_ECX, 3) + 1));
  w32((s32(in_ECX, 1) + 4), 0, -1);
  w32((s32(in_ECX, 1) + 8), 0, s32(in_ECX, 2));
  w32((s32(in_ECX, 1) + 0xc), 0, s32(in_ECX, 2));
  w32(((s32(in_ECX, 2) * 0x10 + 4) + s32(in_ECX, 1)), 0, -1);
  w32(((s32(in_ECX, 2) * 0x10 + 0xc) + s32(in_ECX, 1)), 0, s32(in_ECX, 2));
  w32(((s32(in_ECX, 2) * 0x10 + 8) + s32(in_ECX, 1)), 0, s32(((s32(in_ECX, 2) * 0x10 + 0xc) + s32(in_ECX, 1)), 0));
  local_10 = 0;
  local_c = 0;
  local_20 = FUN_005c80fd(param_1);
  for (/* cond: (-1 < local_1c) */); iVar2 = local_8, -1 = (-1 < local_1c); local_1c = (local_1c + -1)) {
    iVar1 = local_1c * 3;
    local_17 = _MEM[(iVar1 + param_1)];
    local_18 = _MEM[((iVar1 + 1) + param_1)];
    local_16 = _MEM[((iVar1 + 2) + param_1)];
    local_14 = local_1c;
    local_8 = (local_8 + 1);
    FUN_005c7c7b(DAT_ffffffe8, iVar2);
  }
  while ((local_20 < s32(in_ECX, 3))) {
    iVar1 = local_20 * 3;
    local_17 = _MEM[(iVar1 + param_1)];
    local_18 = _MEM[((iVar1 + 1) + param_1)];
    local_16 = _MEM[((iVar1 + 2) + param_1)];
    local_14 = local_20;
    local_8 = (local_8 + 1);
    FUN_005c7c7b(DAT_ffffffe8, iVar2);
  }
  w32(in_ECX, 0x206, 1);
  return;
}


 export function FUN_005c7c7b (in_ECX, param_1, param_2)

 {
  let bVar1;
  // in_ECX promoted to parameter;
  let local_14;
  let local_c;
  let local_8;

  local_c = 0;
  local_14 = s32((s32((in_ECX + 4), 0) + 0xc), 0);
  local_8 = -1;
  bVar1 = 1;
  _MEM[((s32((in_ECX + 4), 0) + 1) + param_2 * 0x10)] = _MEM[param_1 + 1];
  _MEM[(s32((in_ECX + 4), 0) + param_2 * 0x10)] = _MEM[param_1];
  _MEM[((s32((in_ECX + 4), 0) + 2) + param_2 * 0x10)] = _MEM[param_1 + 2];
  w32(((s32((in_ECX + 4), 0) + 4) + param_2 * 0x10), 0, s32((param_1 + 4), 0));
  w32(((s32((in_ECX + 4), 0) + 0xc) + param_2 * 0x10), 0, s32((in_ECX + 8), 0));
  w32(((s32((in_ECX + 4), 0) + 8) + param_2 * 0x10), 0, s32(((s32((in_ECX + 4), 0) + 0xc) + param_2 * 0x10), 0));
  while ((s32((in_ECX + 8), 0) !== local_14)) {
    local_c = local_14;
    if ((local_8 === 2)) {
      local_8 = 0;
    }
    else {
      local_8 = (local_8 + 1);
    }
    bVar1 = (_MEM[param_1 + local_8] < _MEM[((s32((in_ECX + 4), 0) + local_14 * 0x10) + local_8)]);
    if (bVar1) {
      local_14 = s32(((s32((in_ECX + 4), 0) + 8) + local_14 * 0x10), 0);
    }
    else {
      local_14 = s32(((s32((in_ECX + 4), 0) + 0xc) + local_14 * 0x10), 0);
    }
    bVar1 = (!bVar1);
  }
  if (bVar1) {
    w32(((s32((in_ECX + 4), 0) + 0xc) + local_c * 0x10), 0, param_2);
  }
  else {
    w32(((s32((in_ECX + 4), 0) + 8) + local_c * 0x10), 0, param_2);
  }
  return;
}


 export function FUN_005c7e06 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_40;
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

  local_c = s32((in_ECX + 8), 0);
  w32((in_ECX + 0x814), 0, 0);
  if ((s32((in_ECX + 0x818), 0) === 0)) {
    iVar1 = -1;
  }
  else {
    local_3c = 0x30000;
    w32((in_ECX + 0x81c), 0, 0);
    local_38 = (u8(param_2) - param_4);
    local_38 = (u8(param_2) + param_4);
    local_38 = (u8(param_1) - param_4);
    local_38 = (u8(param_1) + param_4);
    local_28 = (u8(param_3) - param_4);
    local_24 = (u8(param_3) + param_4);
    w32(((in_ECX + 0x14) + s32((in_ECX + 0x814), 0) * 4), 0, -1);
    w32((in_ECX + 0x814), 0, (s32((in_ECX + 0x814), 0) + 1));
    w32(((in_ECX + 0x14) + s32((in_ECX + 0x814), 0) * 4), 0, 0);
    w32((in_ECX + 0x814), 0, (s32((in_ECX + 0x814), 0) + 1));
    while ((local_3c !== 0)) {
      w32((in_ECX + 0x814), 0, (s32((in_ECX + 0x814), 0) + -1));
      local_40 = s32(((s32(((in_ECX + 0x14) + s32((in_ECX + 0x814), 0) * 4), 0) * 0x10 + 0xc) + s32((in_ECX + 4), 0)), 0);
      w32((in_ECX + 0x814), 0, (s32((in_ECX + 0x814), 0) + -1));
      local_8 = s32(((in_ECX + 0x14) + s32((in_ECX + 0x814), 0) * 4), 0);
      while ((local_3c !== 0)) {
        w32((in_ECX + 0x81c), 0, (s32((in_ECX + 0x81c), 0) + 1));
        if ((local_8 === 2)) {
          local_8 = 0;
        }
        else {
          local_8 = (local_8 + 1);
        }
        local_14 = u8(_MEM[((s32((in_ECX + 4), 0) + local_8) + local_40 * 0x10)]);
        if ((s32(DAT_ffffffc8, local_8 * 2) < local_14)) {
          if ((local_14 <= s32(DAT_ffffffc8, (local_8 * 2 + 1)))) {
            w32(((in_ECX + 0x14) + s32((in_ECX + 0x814), 0) * 4), 0, local_8);
            w32((in_ECX + 0x814), 0, (s32((in_ECX + 0x814), 0) + 1));
            w32(((in_ECX + 0x14) + s32((in_ECX + 0x814), 0) * 4), 0, local_40);
            w32((in_ECX + 0x814), 0, (s32((in_ECX + 0x814), 0) + 1));
            local_1c = u8(_MEM[((s32((in_ECX + 4), 0) + 1) + local_40 * 0x10)]);
            local_20 = u8(_MEM[(s32((in_ECX + 4), 0) + local_40 * 0x10)]);
            local_18 = u8(_MEM[((s32((in_ECX + 4), 0) + 2) + local_40 * 0x10)]);
            local_10 = (((local_1c - u8(param_1)) * (local_1c - u8(param_1)) + (local_20 - u8(param_2)) * (local_20 - u8(param_2))) + (local_18 - u8(param_3)) * (local_18 - u8(param_3)));
            if ((local_10 < local_3c)) {
              local_c = local_40;
              local_3c = local_10;
            }
          }
          local_40 = s32(((s32((in_ECX + 4), 0) + 8) + local_40 * 0x10), 0);
        }
        else {
          local_40 = s32(((s32((in_ECX + 4), 0) + 0xc) + local_40 * 0x10), 0);
        }
      }
    }
    if ((s32(((s32((in_ECX + 4), 0) + 4) + local_c * 0x10), 0) === -1)) {
      iVar1 = 0;
    }
    else {
      iVar1 = (s32(((s32((in_ECX + 4), 0) + 4) + local_c * 0x10), 0) + s32((in_ECX + 0x10), 0));
    }
  }
  return iVar1;
}


 export function FUN_005c80fd (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_14;
  let local_10;
  let local_8;

  local_8 = 0;
  local_14 = 0x5f5e100;
  for (/* cond: (local_10 < s32((in_ECX + 0xc), 0) * 3) */); local_10 = (local_10 < s32((in_ECX + 0xc), 0) * 3); local_10 = (local_10 + 3)) {
    iVar1 = (((u8(_MEM[((local_10 + 2) + param_1)]) - 0x80) * (u8(_MEM[((local_10 + 2) + param_1)]) - 0x80) + (u8(_MEM[((local_10 + 1) + param_1)]) - 0x80) * (u8(_MEM[((local_10 + 1) + param_1)]) - 0x80)) + (u8(_MEM[(local_10 + param_1)]) - 0x80) * (u8(_MEM[(local_10 + param_1)]) - 0x80));
    if ((iVar1 < local_14)) {
      local_8 = (local_10 / 3 | 0);
      local_14 = iVar1;
    }
  }
  return local_8;
}


 export function FUN_005c8200 (param_1, param_2, param_3)

 {
  let local_4c;
  let local_10;
  let local_c;
  let local_8;

  local_4c = (-param_2);
  local_4c = 0;
  local_4c = 0;
  local_4c = 0;
  local_4c = 1;
  local_4c = 4;
  local_4c = 1;
  local_4c = 0;
  local_4c = 0;
  if (((param_3 & 1) === 0)) {
    local_4c = 0x190;
  }
  else {
    local_4c = 0x2bc;
  }
  local_4c = (param_3 & 2);
  local_4c = (param_3 & 4);
  local_4c = (param_3 & 8);
  /* switch */ () {
  case 0 :
    local_4c = 0x10;
    FUN_005f22d0(DAT_0000001c, s_Times_New_Roman_00637c74);
    break;
  case 1 :
    local_4c = 0x20;
    FUN_005f22d0(DAT_0000001c, s_Arial_00637c84);
    break;
  case 2 :
    FUN_005f22d0(DAT_0000001c, s_System_00637c94);
    break;
  case 3 :
    local_4c = 0x30;
    FUN_005f22d0(DAT_0000001c, s_Courier_00637c8c);
  }
  local_10 = 0;
  local_c = FUN_006e7a70(DAT_ffffffb4);
  if ((local_c !== 0)) {
    local_10 = FUN_005dce4f(8);
    local_8 = FUN_005dcdf9(local_10);
    w32(local_8, 0, local_c);
    w32(local_8, 1, 1);
    FUN_005dce29(local_10);
  }
  return local_10;
}


 export function FUN_005c8391 (param_1, param_2)

 {
  let iVar1;
  let puVar2;
  let local_10;

  local_10 = 0;
  iVar1 = FUN_005dcdf9(param_1);
  if ((param_2 < s32((iVar1 + 0x100), 0))) {
    local_10 = FUN_005dce4f(8);
    puVar2 = FUN_005dcdf9(local_10);
    w32(puVar2, 0, s32(((iVar1 + 0x108) + param_2 * 4), 0));
    w32(puVar2, 1, 0);
    FUN_005dce29(local_10);
  }
  return local_10;
}


 export function FUN_005c841d (param_1)

 {
  let puVar1;

  puVar1 = FUN_005dcdf9(param_1);
  if ((puVar1 !== 0)) {
    if ((s32(puVar1, 1) === 1)) {
      FUN_006e7a94(s32(puVar1, 0));
    }
    FUN_005dce29(param_1);
    FUN_005dce96(param_1);
  }
  return;
}


 export function FUN_005c847f (param_1)

 {
  let iVar1;
  let hdc;
  let h;
  let local_40;
  let local_8;

  iVar1 = FUN_005dcef7(param_1);
  if ((iVar1 === 0)) {
    local_40 = 1;
  }
  else {
    local_8 = FUN_005dcdf9(param_1);
    hdc = FUN_006e7e10(0);
    h = FUN_006e7a6c(hdc, s32(local_8, 0));
    FUN_006e7a68(hdc, DAT_ffffffc0);
    FUN_006e7a6c(hdc, h);
    FUN_006e7dd8(0, hdc);
    FUN_005dce29(param_1);
  }
  return UNNAMED;
}


 export function FUN_005c8514 (param_1)

 {
  let hdc;
  let h;
  let local_40;
  let local_8;

  local_8 = FUN_005dcdf9(param_1);
  hdc = FUN_006e7e10(0);
  h = FUN_006e7a6c(hdc, s32(local_8, 0));
  FUN_006e7a68(hdc, DAT_ffffffc0);
  FUN_006e7a6c(hdc, h);
  FUN_006e7dd8(0, hdc);
  FUN_005dce29(param_1);
  return (UNNAMED + UNNAMED);
}


 export function FUN_005c858e (param_1, param_2)

 {
  let hdc;
  let h;
  let c;
  let lpsz;
  let local_10;
  let local_8;

  local_8 = FUN_005dcdf9(param_1);
  hdc = FUN_006e7e10(0);
  h = FUN_006e7a6c(hdc, s32(local_8, 0));
  lpsz = DAT_fffffff0;
  c = _strlen(param_2);
  FUN_006e7a64(hdc, param_2, c, lpsz);
  FUN_006e7a6c(hdc, h);
  FUN_006e7dd8(0, hdc);
  FUN_005dce29(param_1);
  return UNNAMED;
}


 export function FUN_005c861c (param_1)

 {
  let iVar1;
  let local_c;

  local_c = 0;
  iVar1 = FUN_006e79fc(param_1);
  if ((iVar1 !== 0)) {
    local_c = FUN_005dce4f(0x208);
    iVar1 = FUN_005dcdf9(local_c);
    FUN_005f22d0(iVar1, param_1);
    _strncpy((iVar1 + 0x104), param_1, 3);
    FUN_005c8736(iVar1);
    FUN_005dce29(local_c);
  }
  return local_c;
}


 export function FUN_005c86bc (param_1, param_2, param_3, param_4)

 {
  let _Str2;
  let _Str1;
  let iVar1;
  let pHVar2;
  let _MaxCount;

  _MaxCount = 3;
  _Str2 = __strlwr((param_4 + 0x104));
  _Str1 = __strlwr(DAT_0000001c);
  iVar1 = _strncmp(_Str1, _Str2, _MaxCount);
  if ((iVar1 === 0)) {
    pHVar2 = FUN_006e7a70(param_1);
    w32(((param_4 + 0x108) + s32((param_4 + 0x100), 0) * 4), 0, pHVar2);
    w32((param_4 + 0x100), 0, (s32((param_4 + 0x100), 0) + 1));
  }
  return 1;
}


 export function FUN_005c8736 (param_1)

 {
  let hdc;

  hdc = FUN_006e7e10(0);
  w32((param_1 + 0x100), 0, 0);
  FUN_006e7a5c(hdc, 0, FUN_005c86bc, param_1);
  FUN_006e7dd8(0, hdc);
  return s32((param_1 + 0x100), 0);
}


 export function FUN_005c8791 (param_1)

 {
  let pCVar1;
  let lpFileName;
  let local_c;

  lpFileName = FUN_005dcdf9(param_1);
  for (/* cond: (local_c < s32((lpFileName + 0x100), 0)) */); local_c = (local_c < s32((lpFileName + 0x100), 0)); local_c = (local_c + 1)) {
    if ((s32((lpFileName + (local_c * 4 + 0x108)), 0) !== 0)) {
      FUN_006e7a94(s32((lpFileName + (local_c * 4 + 0x108)), 0));
      pCVar1 = (lpFileName + (local_c * 4 + 0x108));
      _MEM[pCVar1 + 0] = 0;
      _MEM[pCVar1 + 1] = 0;
      _MEM[pCVar1 + 2] = 0;
      _MEM[pCVar1 + 3] = 0;
    }
  }
  FUN_006e7a00(lpFileName);
  FUN_005dce29(param_1);
  FUN_005dce96(param_1);
  return;
}


 export function FUN_005c8834 (param_1, param_2, param_3, param_4)

 {
  let puVar1;
  let hdc;
  let hdc_00;
  let h;
  let cchText;
  let lprc;
  let format;
  let local_14;

  puVar1 = FUN_005dcdf9(param_2);
  hdc = FUN_006e7e10(0);
  hdc_00 = FUN_006e79f8(hdc);
  FUN_006e7dd8(0, hdc);
  h = FUN_006e7a6c(hdc_00, s32(puVar1, 0));
  FUN_006e7d90(DAT_ffffffec, 0, 0, param_4, 0);
  format = 0x410;
  lprc = DAT_ffffffec;
  cchText = _strlen(param_3);
  FUN_006e7e74(hdc_00, param_3, cchText, lprc, format);
  FUN_006e7a6c(hdc_00, h);
  FUN_006e7a08(hdc_00);
  FUN_005dce29(param_2);
  w32(param_1, 0, UNNAMED);
  w32(param_1, 1, UNNAMED);
  w32(param_1, 2, UNNAMED);
  w32(param_1, 3, UNNAMED);
  return param_1;
}


 export function FUN_005c8908 (param_1)

 {
  let pHVar1;
  let puVar2;
  let local_10;

  local_10 = 0;
  pHVar1 = FUN_006e7a70(param_1);
  if ((pHVar1 !== 0)) {
    local_10 = FUN_005dce4f(8);
    if ((local_10 === 0)) {
      local_10 = 0;
    }
    else {
      puVar2 = FUN_005dcdf9(local_10);
      w32(puVar2, 0, pHVar1);
      FUN_005dce29(local_10);
    }
  }
  return local_10;
}


 export function FUN_005c8984 (param_1)

 {
  let uVar1;
  let piVar2;

  if ((param_1 === 0)) {
    uVar1 = 0;
  }
  else {
    piVar2 = FUN_005dcdf9(param_1);
    if ((s32(piVar2, 0) !== 0)) {
      FUN_006e7a94(s32(piVar2, 0));
    }
    FUN_005dce29(param_1);
    uVar1 = FUN_005dce96(param_1);
  }
  return uVar1;
}


 export function FUN_005c89ed (param_1)

 {
  let iVar1;
  let lpString1;
  let local_8;

  local_8 = 0;
  iVar1 = FUN_006e79fc(param_1);
  if ((iVar1 !== 0)) {
    iVar1 = FUN_006e7b10(param_1);
    local_8 = FUN_005dce4f((iVar1 + 1));
    if ((local_8 === 0)) {
      local_8 = 0;
    }
    else {
      lpString1 = FUN_005dcdf9(local_8);
      FUN_006e7c20(lpString1, param_1);
      FUN_005dce29(local_8);
      FUN_006e7d6c(0xffff, 0x1d, 0, 0);
    }
  }
  return local_8;
}


 export function FUN_005c8a85 (param_1)

 {
  let lpFileName;
  let BVar1;

  if ((param_1 !== 0)) {
    lpFileName = FUN_005dcdf9(param_1);
    BVar1 = FUN_006e7a00(lpFileName);
    if ((BVar1 !== 0)) {
      FUN_006e7d6c(0xffff, 0x1d, 0, 0);
    }
    FUN_005dce29(param_1);
    FUN_005dce96(param_1);
  }
  return;
}


 export function FUN_005c8b00 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e28(param_1, 0, 0);
  }
  return;
}


 export function FUN_005c8b2d (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e24(param_1, 5);
  }
  return;
}


 export function FUN_005c8b58 (param_1)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e24(param_1, 0);
  }
  return;
}


 export function FUN_005c8b83 (param_1, param_2, param_3)

 {
  let nHeight;
  let nWidth;
  let bRepaint;
  let local_14;

  if ((param_1 !== 0)) {
    FUN_006e7e38(param_1, DAT_ffffffec);
    bRepaint = 1;
    nHeight = FUN_00407fc0(DAT_ffffffec);
    nWidth = FUN_00407f90(DAT_ffffffec);
    FUN_006e7e34(param_1, param_2, param_3, nWidth, nHeight, bRepaint);
  }
  return;
}


 export function FUN_005c8be1 (param_1, param_2)

 {
  let iVar1;
  let nWidth;
  let pHVar2;
  let hMenu;
  let hInstance;
  let lpParam;

  lpParam = 0;
  hMenu = 0;
  hInstance = DAT_006e4ff0;
  FUN_0040f810();
  iVar1 = FUN_00414d10();
  pHVar2 = s32((iVar1 + 4), 0);
  iVar1 = FUN_00407fc0(param_1);
  nWidth = FUN_00407f90(param_1);
  pHVar2 = FUN_006e7d50(4, s_MSControlClass_00637ca8, DAT_00637ca4, 0x50000000, s32(param_1, 0), s32(param_1, 1), nWidth, iVar1, pHVar2, hMenu, hInstance, lpParam);
  iVar1 = FUN_005c9499(pHVar2, param_2);
  w32((iVar1 + 0x2c), 0, 1);
  FUN_006e7db0(pHVar2, -4, 0x5c8caf);
  return pHVar2;
}


 export function FUN_005c8c83 (param_1)

 {
  if ((param_1 === 0)) {
    FUN_005d225b(s_Error:_Tried_to_dispose_NULL_reg_00637cb8);
  }
  return;
}


 export function FUN_005c8caf (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let piVar2;
  let BVar3;
  let uVar4;
  let local_14;

  iVar1 = FUN_005c9563(param_1);
  iVar1 = s32((iVar1 + 4), 0);
  /* switch */ () {
  case 0x200 :
    if ((DAT_00637c9c === 0)) {
      if ((DAT_00637ca0 === 0)) {
        wv(DAT_00637c9c, 1);
        FUN_006e7d84(param_1);
        if ((iVar1 !== 0)) {
          uVar4 = FUN_0040f810();
          FUN_005c6303(uVar4);
          uVar4 = FUN_00418740();
          FUN_005c8f70(uVar4);
        }
      }
    }
    else {
      piVar2 = FUN_005c8f50();
      local_14 = s32(piVar2, 0);
      local_14 = s32(piVar2, 1);
      local_14 = s32(piVar2, 2);
      local_14 = s32(piVar2, 3);
      FUN_006e7da4(DAT_ffffffec, (-s32(piVar2, 0)), (-s32(piVar2, 1)));
      BVar3 = FUN_006e7e78(DAT_ffffffec, ((((param_4 >>> 0x10) << 32) | param_4) & -4294901761));
      if ((iVar1 !== 0)) {
        uVar4 = FUN_0040f810();
        FUN_005c6303(uVar4);
        uVar4 = FUN_00418740();
        FUN_005c8fb0(uVar4);
      }
    }
    break;
  case 0x201 :
    if ((DAT_00637c9c !== 0)) {
      wv(DAT_00637ca0, 1);
      uVar4 = FUN_0040f810();
      FUN_005c6303(uVar4);
      uVar4 = FUN_00418740();
      FUN_005c9030(uVar4);
    }
    break;
  case 0x202 :
    if ((DAT_00637ca0 !== 0)) {
      wv(DAT_00637ca0, 0);
      if ((DAT_00637c9c === 0)) {
        FUN_006e7d88();
        if ((iVar1 !== 0)) {
          uVar4 = FUN_0040f810();
          FUN_005c6303(uVar4);
          uVar4 = FUN_00418740();
          FUN_005c8fb0(uVar4);
        }
      }
      else if ((iVar1 !== 0)) {
        uVar4 = FUN_0040f810();
        FUN_005c6303(uVar4);
        uVar4 = FUN_00418740();
        FUN_005c8ff0(uVar4);
      }
    }
    break;
  case 0x203 :
    if ((DAT_00637c9c !== 0)) {
      uVar4 = FUN_0040f810();
      FUN_005c6303(uVar4);
      uVar4 = FUN_00418740();
      FUN_005c9070(uVar4);
    }
    break;
  default :
    uVar4 = FUN_005c9307(param_1, param_2, param_3, param_4);
    return uVar4;
  }
  return 0;
}


 export function FUN_005c8f50 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return (in_ECX + 0xc);
}


 export function FUN_005c8f70 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x2c);
  }
  return;
}


 export function FUN_005c8fb0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) !== 0)) {
    in_ECX = (in_ECX + 0x30);
  }
  return;
}


 export function FUN_005c8ff0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    in_ECX = (in_ECX + 0x34);
  }
  return;
}


 export function FUN_005c9030 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x38), 0) !== 0)) {
    in_ECX = (in_ECX + 0x38);
  }
  return;
}


 export function FUN_005c9070 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x3c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x3c);
  }
  return;
}


 export function FUN_005c90b0 (param_1)

 {
  FUN_006e7d94(param_1);
  return;
}


 export function FUN_005c90ca (param_1, param_2)

 {
  let LVar1;
  let this;
  let iVar2;
  let cx;
  let hdcSrc;
  let y1;
  let rop;
  let local_14;
  let local_c;
  let local_8;

  local_8 = FUN_006e7e40(param_2);
  LVar1 = FUN_006e7e2c(local_8, 0xc);
  if ((LVar1 === 0)) {
    FUN_006e7e2c(local_8, 0);
    iVar2 = FUN_00414d10();
    if ((s32((iVar2 + 0x14), 0) !== 0)) {
      FUN_006e7e7c(s32(param_1, 0), (param_1 + 2), s32((iVar2 + 0x14), 0));
    }
  }
  else {
    this = FUN_006e7e2c(local_8, 0xc);
    FUN_006e7e2c(local_8, 0);
    iVar2 = FUN_00414d10();
    local_c = GetCheckStyle(this);
    local_14 = s32(param_1, 2);
    local_14 = s32(param_1, 3);
    FUN_006e7e3c(param_2, s32((iVar2 + 4), 0), DAT_ffffffec, 1);
    if ((DAT_00638b48 === 1)) {
      FUN_006e7a74(s32(param_1, 0), s32((iVar2 + 0x18), 0), 0);
      FUN_006e7a80(s32(param_1, 0));
    }
    rop = 0xcc0020;
    hdcSrc = s32((local_c + 4), 0);
    LVar1 = UNNAMED;
    y1 = UNNAMED;
    iVar2 = FUN_00407fc0((param_1 + 2));
    cx = FUN_00407f90((param_1 + 2));
    FUN_006e7a7c(s32(param_1, 0), s32(param_1, 2), s32(param_1, 3), cx, iVar2, hdcSrc, LVar1, y1, rop);
  }
  return;
}


 export function FUN_005c9222 (param_1, param_2)

 {
  let sVar1;
  let local_10;
  let local_c;
  let local_8;

  local_c = param_2;
  w32((param_1 + 0x28), 0, 0);
  while ((_MEM[local_c] === 0x7e)) {
    if ((_MEM[local_c] === 0));
    local_c = (local_c + 1);
  }
  for (/* cond: (local_10 < sVar1) */); sVar1 = _strlen(param_2), local_10 = (local_10 < sVar1);
      local_10 = (local_10 + 1)) {
    _MEM[param_2 + local_10] = _MEM[param_2 + (local_10 + 1)];
  }
 LAB_005c92ae: :
  sVar1 = _strlen(param_2);
  if ((s32((param_1 + 0x28), 0) < sVar1)) {
    local_8 = _MEM[param_2 + s32((param_1 + 0x28), 0)];
    local_8 = 0;
    __strlwr(DAT_fffffff8);
    _MEM[(param_1 + 0x25)] = _MEM[param_2 + s32((param_1 + 0x28), 0)];
  }
  else {
    w32((param_1 + 0x28), 0, -1);
  }
  return;
}


 export function FUN_005c9307 (param_1, param_2, param_3, param_4)

 {
  let hWnd;
  let iVar1;
  let LVar2;
  let local_44;

  if ((param_2 < 0x10)) {
    if ((param_2 === 0xf)) {
      FUN_006e7e88(param_1, DAT_ffffffbc);
      FUN_005c90ca(DAT_ffffffbc, param_1);
      FUN_006e7e84(param_1, DAT_ffffffbc);
      return 0;
    }
    if ((param_2 === 2)) {
      iVar1 = FUN_005c9563(param_1);
      if ((iVar1 !== 0)) {
        if ((s32((iVar1 + 0x2c), 0) === 3)) {
          w32(s32((iVar1 + 0x24), 0), 0, 0);
        }
        else {
          iVar1 = (iVar1 + 4);
        }
        FUN_005c9595(param_1);
      }
      LVar2 = FUN_006e7e80(param_1, 2, param_3, param_4);
      return LVar2;
    }
  }
  else if ((param_2 < 0x103)) {
    hWnd = FUN_006e7e40(param_1);
    FUN_006e7d6c(hWnd, param_2, param_3, param_4);
    return 0;
  }
  LVar2 = FUN_006e7e80(param_1, param_2, param_3, param_4);
  return LVar2;
}


 export function FUN_005c944b ()

 {
  let iVar1;
  let hWnd;

  iVar1 = FUN_005c5e60();
  if ((iVar1 !== 0)) {
    hWnd = FUN_00418770();
    FUN_006e7e1c(hWnd);
  }
  return;
}


 export function FUN_005c9499 (param_1, param_2)

 {
  let uVar1;
  let local_c;

  local_c = 0;
  if ((param_1 === 0)) {
    FUN_005d225b(s_Error:_Tried_to_initialize_NULL_c_00637cf4);
  }
  else {
    uVar1 = FUN_005dce4f(0x30);
    local_c = FUN_005dcdf9(uVar1);
    w32(local_c, 2, 0);
    w32(local_c, 5, 0);
    w32(local_c, 4, s32(local_c, 5));
    w32(local_c, 3, s32(local_c, 4));
    w32(local_c, 0, uVar1);
    w32(local_c, 1, param_2);
    w32(local_c, 6, 0);
    w32(local_c, 7, 0);
    w32(local_c, 8, 0);
    w32(local_c, 0xb, 0);
    FUN_006e7db0(param_1, 0, local_c);
  }
  return local_c;
}


 export function FUN_005c9563 (param_1)

 {
  let LVar1;

  if ((param_1 === 0)) {
    LVar1 = 0;
  }
  else {
    LVar1 = FUN_006e7e2c(param_1, 0);
  }
  return LVar1;
}


 export function FUN_005c9595 (param_1)

 {
  let uVar1;
  let puVar2;

  if ((param_1 === 0)) {
    FUN_005d225b(s_Error:_Tried_to_dispose_NULL_con_00637d30);
  }
  else {
    puVar2 = FUN_006e7e2c(param_1, 0);
    if ((puVar2 !== 0)) {
      if ((s32(puVar2, 2) === 0)) {
        if ((s32(puVar2, 3) !== 0)) {
          FUN_006e7a94(s32(puVar2, 3));
          w32(puVar2, 3, 0);
        }
        if ((s32(puVar2, 4) !== 0)) {
          FUN_006e7a94(s32(puVar2, 4));
          w32(puVar2, 4, 0);
        }
        if ((s32(puVar2, 5) !== 0)) {
          FUN_006e7a94(s32(puVar2, 5));
          w32(puVar2, 5, 0);
        }
      }
      if ((s32(puVar2, 0xb) === 2)) {
        operator_delete(s32(puVar2, 9));
        w32(puVar2, 9, 0);
      }
      uVar1 = s32(puVar2, 0);
      FUN_005dce29(uVar1);
      FUN_005dce96(uVar1);
      FUN_006e7db0(param_1, -4, 0x5c9307);
      FUN_006e7db0(param_1, 0, 0);
    }
  }
  return;
}


 export function FUN_005c96cc (param_1)

 {
  let local_14;

  FUN_006e7e4c(param_1, DAT_ffffffec);
  FUN_006e7e28(param_1, DAT_ffffffec, 1);
  FUN_006e7e8c(param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* ios::delbuf(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function delbuf (this, param_1)

 {
  w32((this + 0x1c), 0, param_1);
  return;
}


 export function FUN_005c9740 (param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let iVar2;
  let hdc;
  let h;
  let h_00;
  let this;
  let hPal;
  let h_01;
  let h_02;
  let uVar3;
  let puVar4;
  let h_03;
  let h_04;
  let sVar5;
  let hWndParent;
  let hMenu;
  let LVar6;
  let hInstance;
  let ptVar7;
  let lpParam;
  let bForceBkgd;
  let UVar8;
  let LVar9;
  let local_2a0;
  let local_278;
  let local_178;
  let local_174;
  let local_170;
  let local_16c;
  let local_168;
  let local_164;
  let local_160;
  let local_15c;
  let local_158;
  let local_154;
  let local_150;
  let local_140;
  let local_13c;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_005f22d0(DAT_fffffd88, param_3);
  local_170 = param_2;
  local_2a0 = 0x40810000;
  if ((param_4 !== 0)) {
    local_2a0 = 0x50810000;
  }
  lpParam = 0;
  hMenu = 0;
  hInstance = DAT_006e4ff0;
  FUN_0040f810();
  iVar1 = FUN_00414d10();
  hWndParent = s32((iVar1 + 4), 0);
  iVar1 = FUN_00407fc0(param_1);
  iVar2 = FUN_00407f90(param_1);
  local_154 = FUN_006e7d50(4, s_MSControlClass_00637d70, DAT_00637d6c, local_2a0, s32(param_1, 0), s32(param_1, 1), iVar2, iVar1, hWndParent, hMenu, hInstance, lpParam);
  FUN_005c9222(local_170, DAT_fffffd88);
  local_150 = s32(param_1, 0);
  local_150 = s32(param_1, 1);
  local_150 = s32(param_1, 2);
  local_150 = s32(param_1, 3);
  FUN_006e7da4(DAT_fffffeb0, (-s32(param_1, 0)), (-s32(param_1, 1)));
  local_150 = (s32(param_1, 2) + -2);
  local_150 = (s32(param_1, 3) + -2);
  hdc = FUN_006e7e10(local_154);
  iVar1 = FUN_00407fc0(DAT_fffffeb0);
  iVar2 = FUN_00407f90(DAT_fffffeb0);
  h = FUN_006e7a18(hdc, iVar2, iVar1);
  if ((h === 0)) {
    FUN_005d225b(s_Could_not_create_bitmap_in_MSIni_00637d80);
    FUN_006e7e1c(local_154);
    local_154 = 0;
  }
  else {
    iVar1 = FUN_00407fc0(DAT_fffffeb0);
    iVar2 = FUN_00407f90(DAT_fffffeb0);
    h_00 = FUN_006e7a18(hdc, iVar2, iVar1);
    if ((h_00 === 0)) {
      FUN_005d225b(s_Could_not_create_bitmap_in_MSIni_00637da8);
      FUN_006e7e1c(local_154);
      local_154 = 0;
    }
    else {
      iVar1 = FUN_00407fc0(DAT_fffffeb0);
      iVar2 = FUN_00407f90(DAT_fffffeb0);
      local_168 = FUN_006e7a18(hdc, iVar2, iVar1);
      if ((local_168 === 0)) {
        FUN_005d225b(s_Could_not_create_bitmap_in_MSIni_00637dd0);
        FUN_006e7e1c(local_154);
        local_154 = 0;
      }
      else {
        local_164 = FUN_006e79f8(hdc);
        FUN_006e7dd8(local_154, hdc);
        FUN_006e7a14(local_164, 1);
        if ((s32((local_170 + 0x34), 0) === -1)) {
          local_18 = FUN_006e7a10(1);
        }
        else {
          if ((DAT_00638b48 === 1)) {
            bForceBkgd = 0;
            FUN_0040f810();
            this = FUN_00511320();
            hPal = IsTracking(this);
            FUN_006e7a74(local_164, hPal, bForceBkgd);
            FUN_006e7a80(local_164);
          }
          FUN_0040f810(s32((local_170 + 0x34), 0), DAT_fffffea0, DAT_fffffe8c, DAT_fffffea4);
          FUN_00511320();
          uVar3 = FUN_0046f440();
          FUN_005dea9e(uVar3);
          local_18 = FUN_006e7a0c(0, 1, ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)))
          ;
        }
        h_01 = FUN_006e7a0c(0, 1, 0xffffff);
        h_02 = FUN_006e7a0c(0, 1, 0x808080);
        uVar3 = FUN_004d8af0();
        puVar4 = FUN_005dcdf9(uVar3);
        h_03 = FUN_006e7a6c(local_164, s32(puVar4, 0));
        uVar3 = FUN_004d8af0();
        FUN_005dce29(uVar3);
        h_04 = FUN_006e7a6c(local_164, h);
        local_14 = UNNAMED;
        local_10 = UNNAMED;
        local_c = UNNAMED;
        local_8 = UNNAMED;
        if ((s32((local_170 + 0x34), 0) === -1)) {
          FUN_006e7e7c(local_164, DAT_fffffeb0, local_18);
        }
        else {
          local_140 = FUN_006e7a6c(local_164, local_18);
          for (/* cond: (local_178 < UNNAMED) */); local_178 = (local_178 < UNNAMED); local_178 = (local_178 + 1)) {
            FUN_006e7a1c(local_164, UNNAMED, local_178, 0);
            FUN_006e7a24(local_164, UNNAMED, local_178);
          }
          FUN_006e7a6c(local_164, local_140);
        }
        local_140 = FUN_006e7a6c(local_164, h_01);
        FUN_006e7a1c(local_164, UNNAMED, UNNAMED, 0);
        FUN_006e7a24(local_164, UNNAMED, UNNAMED);
        FUN_006e7a24(local_164, UNNAMED, UNNAMED);
        FUN_006e7a1c(local_164, (UNNAMED + 1), (UNNAMED + -1), 0);
        FUN_006e7a24(local_164, (UNNAMED + 1), (UNNAMED + 1));
        FUN_006e7a24(local_164, (UNNAMED + -1), (UNNAMED + 1));
        FUN_006e7a6c(local_164, h_02);
        FUN_006e7a1c(local_164, (UNNAMED + 1), (UNNAMED + -1), 0);
        FUN_006e7a24(local_164, (UNNAMED + -1), (UNNAMED + -1));
        FUN_006e7a24(local_164, (UNNAMED + -1), UNNAMED);
        FUN_006e7a1c(local_164, (UNNAMED + 2), (UNNAMED + -2), 0);
        FUN_006e7a24(local_164, (UNNAMED + -2), (UNNAMED + -2));
        FUN_006e7a24(local_164, (UNNAMED + -2), (UNNAMED + 1));
        FUN_006e7a6c(local_164, local_140);
        local_28 = UNNAMED;
        local_28 = UNNAMED;
        local_28 = UNNAMED;
        local_28 = UNNAMED;
        UVar8 = 0x424;
        ptVar7 = DAT_ffffffd8;
        sVar5 = _strlen(DAT_fffffd88);
        FUN_006e7e74(local_164, DAT_fffffd88, sVar5, ptVar7, UVar8);
        local_16c = FUN_00407f90(DAT_ffffffd8);
        LVar9 = UNNAMED;
        iVar1 = FUN_00407f90(DAT_fffffeb0);
        iVar2 = (((UNNAMED + (iVar1 / 2 | 0)) - (local_16c / 2 | 0)) + local_16c);
        LVar6 = UNNAMED;
        iVar1 = FUN_00407f90(DAT_fffffeb0);
        FUN_006e7d90(DAT_ffffffd8, ((UNNAMED + (iVar1 / 2 | 0)) - (local_16c / 2 | 0)), LVar6, iVar2, LVar9);
        UVar8 = 0x24;
        ptVar7 = DAT_ffffffd8;
        sVar5 = _strlen(DAT_fffffd88);
        FUN_006e7e74(local_164, DAT_fffffd88, sVar5, ptVar7, UVar8);
        local_3c = UNNAMED;
        local_38 = UNNAMED;
        local_34 = UNNAMED;
        local_30 = UNNAMED;
        if ((-1 < s32((local_170 + 0x28), 0))) {
          FUN_005f22d0(DAT_fffffec4, DAT_fffffd88);
          _MEM[DAT_fffffec4 + s32((local_170 + 0x28), 0)] = 0;
          sVar5 = _strlen(DAT_fffffec4);
          if ((sVar5 === 0)) {
            local_2c = UNNAMED;
          }
          else {
            local_28 = local_3c;
            local_28 = local_38;
            local_28 = local_34;
            local_28 = local_30;
            UVar8 = 0x424;
            ptVar7 = DAT_ffffffd8;
            sVar5 = _strlen(DAT_fffffec4);
            FUN_006e7e74(local_164, DAT_fffffec4, sVar5, ptVar7, UVar8);
            local_2c = (local_34 + -1);
          }
          FUN_005f22d0(DAT_fffffec4, DAT_fffffd88);
          _MEM[DAT_fffffec4 + (s32((local_170 + 0x28), 0) + 1)] = 0;
          local_28 = local_3c;
          local_28 = local_38;
          local_28 = local_34;
          local_28 = local_30;
          UVar8 = 0x424;
          ptVar7 = DAT_ffffffd8;
          sVar5 = _strlen(DAT_fffffec4);
          FUN_006e7e74(local_164, DAT_fffffec4, sVar5, ptVar7, UVar8);
          local_16c = ((local_34 + 1) - local_2c);
          local_2c = (local_2c + ((local_16c >> 1) + -5));
          local_158 = (local_2c + 0xa);
          FUN_006e7a6c(local_164, h_02);
          FUN_006e7a1c(local_164, local_2c, (local_30 + -2), 0);
          FUN_006e7a24(local_164, local_158, (local_30 + -2));
          FUN_006e7a1c(local_164, local_2c, (local_30 + -1), 0);
          FUN_006e7a24(local_164, local_158, (local_30 + -1));
          FUN_006e7a6c(local_164, local_140);
        }
        FUN_006e7a6c(local_164, h_00);
        if ((s32((local_170 + 0x34), 0) === -1)) {
          FUN_006e7e7c(local_164, DAT_fffffeb0, local_18);
        }
        else {
          local_140 = FUN_006e7a6c(local_164, local_18);
          for (/* cond: (local_178 < UNNAMED) */); local_178 = (local_178 < UNNAMED); local_178 = (local_178 + 1)) {
            FUN_006e7a1c(local_164, UNNAMED, local_178, 0);
            FUN_006e7a24(local_164, UNNAMED, local_178);
          }
          FUN_006e7a6c(local_164, local_140);
        }
        local_140 = FUN_006e7a6c(local_164, h_02);
        FUN_006e7a1c(local_164, UNNAMED, UNNAMED, 0);
        FUN_006e7a24(local_164, UNNAMED, UNNAMED);
        FUN_006e7a24(local_164, UNNAMED, UNNAMED);
        FUN_006e7a1c(local_164, (UNNAMED + 1), (UNNAMED + -1), 0);
        FUN_006e7a24(local_164, (UNNAMED + 1), (UNNAMED + 1));
        FUN_006e7a24(local_164, (UNNAMED + -1), (UNNAMED + 1));
        FUN_006e7a6c(local_164, local_140);
        local_150 = (UNNAMED + 2);
        local_150 = (UNNAMED + 2);
        local_28 = UNNAMED;
        local_28 = UNNAMED;
        UVar8 = 0x424;
        ptVar7 = DAT_ffffffd8;
        local_28 = (UNNAMED + 2);
        local_28 = (UNNAMED + 2);
        sVar5 = _strlen(DAT_fffffd88);
        FUN_006e7e74(local_164, DAT_fffffd88, sVar5, ptVar7, UVar8);
        local_16c = FUN_00407f90(DAT_ffffffd8);
        LVar9 = UNNAMED;
        iVar1 = FUN_00407f90(DAT_fffffeb0);
        iVar1 = ((((iVar1 >> 1) + (UNNAMED + 2)) - (local_16c >> 1)) + local_16c);
        LVar6 = (UNNAMED + 2);
        iVar2 = FUN_00407f90(DAT_fffffeb0);
        FUN_006e7d90(DAT_ffffffd8, (((iVar2 >> 1) + (UNNAMED + 2)) - (local_16c >> 1)), LVar6, iVar1, LVar9);
        UVar8 = 0x24;
        ptVar7 = DAT_ffffffd8;
        sVar5 = _strlen(DAT_fffffd88);
        FUN_006e7e74(local_164, DAT_fffffd88, sVar5, ptVar7, UVar8);
        local_3c = (UNNAMED + 2);
        local_38 = (UNNAMED + 2);
        local_34 = UNNAMED;
        local_30 = UNNAMED;
        if ((-1 < s32((local_170 + 0x28), 0))) {
          FUN_005f22d0(DAT_fffffec4, DAT_fffffd88);
          _MEM[DAT_fffffec4 + s32((local_170 + 0x28), 0)] = 0;
          sVar5 = _strlen(DAT_fffffec4);
          if ((sVar5 === 0)) {
            local_2c = (UNNAMED + 2);
          }
          else {
            local_28 = local_3c;
            local_28 = local_38;
            local_28 = local_34;
            local_28 = local_30;
            UVar8 = 0x424;
            ptVar7 = DAT_ffffffd8;
            sVar5 = _strlen(DAT_fffffec4);
            FUN_006e7e74(local_164, DAT_fffffec4, sVar5, ptVar7, UVar8);
            local_2c = (local_34 + -1);
          }
          FUN_005f22d0(DAT_fffffec4, DAT_fffffd88);
          _MEM[DAT_fffffec4 + (s32((local_170 + 0x28), 0) + 1)] = 0;
          local_28 = local_3c;
          local_28 = local_38;
          local_28 = local_34;
          local_28 = local_30;
          UVar8 = 0x424;
          ptVar7 = DAT_ffffffd8;
          sVar5 = _strlen(DAT_fffffec4);
          FUN_006e7e74(local_164, DAT_fffffec4, sVar5, ptVar7, UVar8);
          local_16c = ((local_34 + 1) - local_2c);
          local_2c = (local_2c + ((local_16c >> 1) + -5));
          local_158 = (local_2c + 0xa);
          FUN_006e7a6c(local_164, h_02);
          FUN_006e7a1c(local_164, local_2c, (local_30 + -2), 0);
          FUN_006e7a24(local_164, local_158, (local_30 + -2));
          FUN_006e7a1c(local_164, local_2c, (local_30 + -1), 0);
          FUN_006e7a24(local_164, local_158, (local_30 + -1));
          FUN_006e7a6c(local_164, local_140);
        }
        FUN_006e7a6c(local_164, local_168);
        local_150 = local_14;
        local_150 = local_10;
        local_150 = local_c;
        local_150 = local_8;
        if ((s32((local_170 + 0x34), 0) === -1)) {
          FUN_006e7e7c(local_164, DAT_fffffeb0, local_18);
        }
        else {
          local_140 = FUN_006e7a6c(local_164, local_18);
          for (/* cond: (local_178 < UNNAMED) */); local_178 = (local_178 < UNNAMED); local_178 = (local_178 + 1)) {
            FUN_006e7a1c(local_164, UNNAMED, local_178, 0);
            FUN_006e7a24(local_164, UNNAMED, local_178);
          }
          FUN_006e7a6c(local_164, local_140);
        }
        local_140 = FUN_006e7a6c(local_164, h_01);
        FUN_006e7a1c(local_164, UNNAMED, UNNAMED, 0);
        FUN_006e7a24(local_164, UNNAMED, UNNAMED);
        FUN_006e7a24(local_164, UNNAMED, UNNAMED);
        FUN_006e7a1c(local_164, (UNNAMED + 1), (UNNAMED + -1), 0);
        FUN_006e7a24(local_164, (UNNAMED + 1), (UNNAMED + 1));
        FUN_006e7a24(local_164, (UNNAMED + -1), (UNNAMED + 1));
        FUN_006e7a6c(local_164, h_02);
        FUN_006e7a1c(local_164, (UNNAMED + 1), (UNNAMED + -1), 0);
        FUN_006e7a24(local_164, (UNNAMED + -1), (UNNAMED + -1));
        FUN_006e7a24(local_164, (UNNAMED + -1), UNNAMED);
        FUN_006e7a1c(local_164, (UNNAMED + 2), (UNNAMED + -2), 0);
        FUN_006e7a24(local_164, (UNNAMED + -2), (UNNAMED + -2));
        FUN_006e7a24(local_164, (UNNAMED + -2), (UNNAMED + 1));
        FUN_006e7a6c(local_164, local_140);
        local_28 = UNNAMED;
        local_28 = UNNAMED;
        local_28 = UNNAMED;
        local_28 = UNNAMED;
        UVar8 = 0x424;
        ptVar7 = DAT_ffffffd8;
        sVar5 = _strlen(DAT_fffffd88);
        FUN_006e7e74(local_164, DAT_fffffd88, sVar5, ptVar7, UVar8);
        local_16c = FUN_00407f90(DAT_ffffffd8);
        LVar9 = UNNAMED;
        iVar1 = FUN_00407f90(DAT_fffffeb0);
        iVar1 = ((((iVar1 >> 1) + UNNAMED) - (local_16c >> 1)) + local_16c);
        LVar6 = UNNAMED;
        iVar2 = FUN_00407f90(DAT_fffffeb0);
        FUN_006e7d90(DAT_ffffffd8, (((iVar2 >> 1) + UNNAMED) - (local_16c >> 1)), LVar6, iVar1, LVar9);
        FUN_006e7a04(local_164, 0xffffff);
        UVar8 = 0x24;
        ptVar7 = DAT_ffffffd8;
        sVar5 = _strlen(DAT_fffffd88);
        FUN_006e7e74(local_164, DAT_fffffd88, sVar5, ptVar7, UVar8);
        FUN_006e7da4(DAT_ffffffd8, -1, -1);
        FUN_006e7a04(local_164, 0x808080);
        UVar8 = 0x24;
        ptVar7 = DAT_ffffffd8;
        sVar5 = _strlen(DAT_fffffd88);
        FUN_006e7e74(local_164, DAT_fffffd88, sVar5, ptVar7, UVar8);
        FUN_006e7da4(DAT_ffffffd8, 1, 1);
        local_3c = UNNAMED;
        local_38 = UNNAMED;
        local_34 = UNNAMED;
        local_30 = UNNAMED;
        if ((-1 < s32((local_170 + 0x28), 0))) {
          FUN_005f22d0(DAT_fffffec4, DAT_fffffd88);
          _MEM[DAT_fffffec4 + s32((local_170 + 0x28), 0)] = 0;
          sVar5 = _strlen(DAT_fffffec4);
          if ((sVar5 === 0)) {
            local_2c = UNNAMED;
          }
          else {
            local_28 = local_3c;
            local_28 = local_38;
            local_28 = local_34;
            local_28 = local_30;
            UVar8 = 0x424;
            ptVar7 = DAT_ffffffd8;
            sVar5 = _strlen(DAT_fffffec4);
            FUN_006e7e74(local_164, DAT_fffffec4, sVar5, ptVar7, UVar8);
            local_2c = (local_34 + -1);
          }
          FUN_005f22d0(DAT_fffffec4, DAT_fffffd88);
          _MEM[DAT_fffffec4 + (s32((local_170 + 0x28), 0) + 1)] = 0;
          local_28 = local_3c;
          local_28 = local_38;
          local_28 = local_34;
          local_28 = local_30;
          UVar8 = 0x424;
          ptVar7 = DAT_ffffffd8;
          sVar5 = _strlen(DAT_fffffec4);
          FUN_006e7e74(local_164, DAT_fffffec4, sVar5, ptVar7, UVar8);
          local_16c = ((local_34 + 1) - local_2c);
          local_2c = (local_2c + ((local_16c >> 1) + -5));
          local_158 = (local_2c + 0xa);
          FUN_006e7a6c(local_164, h_02);
          FUN_006e7a1c(local_164, local_2c, (local_30 + -2), 0);
          FUN_006e7a24(local_164, local_158, (local_30 + -2));
          FUN_006e7a1c(local_164, local_2c, (local_30 + -1), 0);
          FUN_006e7a24(local_164, local_158, (local_30 + -1));
          FUN_006e7a6c(local_164, local_140);
        }
        FUN_006e7a6c(local_164, h_04);
        FUN_006e7a6c(local_164, h_03);
        FUN_006e7a94(h_01);
        if ((s32((local_170 + 0x34), 0) !== -1)) {
          FUN_006e7a94(local_18);
        }
        FUN_006e7a94(h_02);
        FUN_006e7a08(local_164);
        iVar1 = FUN_005c9499(local_154, param_2);
        w32((iVar1 + 0xc), 0, h);
        w32((iVar1 + 0x10), 0, h_00);
        w32((iVar1 + 0x14), 0, local_168);
        w32((iVar1 + 0x2c), 0, 6);
        FUN_006e7db0(local_154, -4, 0x5cacd4);
      }
    }
  }
  return local_154;
}


 export function FUN_005cabf6 (param_1)

 {
  if ((param_1 === 0)) {
    FUN_005d225b(s_Error:_Tried_to_dispose_NULL_But_00637df8);
  }
  return;
}


 export function FUN_005cac22 (param_1)

 {
  let iVar1;
  let pcVar2;
  let uVar3;

  iVar1 = FUN_005c9563(param_1);
  if ((pcVar2 !== 0)) {
    FUN_006e7d94(param_1);
    w32((iVar1 + 0x18), 0, 1);
    FUN_005c96cc(param_1);
    w32((iVar1 + 0x18), 0, 0);
    FUN_00453af0();
    FUN_005cbeb0(8);
    FUN_005c96cc(param_1);
    wv(DAT_00637ea4, FUN_0040f810());
    uVar3 = FUN_00418740();
    FUN_005cbdf0(uVar3);
  }
  return;
}


 export function FUN_005cacd4 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let SVar2;
  let piVar3;
  let BVar4;
  let pLVar5;
  let pHVar6;
  let pcVar7;
  let h;
  let iVar8;
  let cx;
  let uVar9;
  let hdcSrc;
  let x1;
  let y1;
  let lpRect;
  let rop;
  let local_84;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  local_44 = FUN_005c9563(param_1);
  if ((local_44 === 0)) {
    return 0;
  }
  local_28 = s32((local_44 + 4), 0);
  if ((0xf < param_2)) {
    if ((param_2 < 0x201)) {
      if ((param_2 !== 0x200)) {
        if ((param_2 === 0x100)) {
          if ((param_3 === 9)) {
            pHVar6 = FUN_006e7e40(param_1);
            FUN_006e7d6c(pHVar6, param_2, param_3, param_4);
            return 0;
          }
          if ((pcVar7 !== 0)) {
            FUN_0040f810();
            cVar1 = FUN_005cbdd0();
            if ((cVar1 !== 0)) {
              w32((local_44 + 0x18), 0, 1);
              FUN_005c96cc(param_1);
              w32((local_44 + 0x18), 0, 0);
              SVar2 = FUN_006e7d64(0x20);
              local_8 = ((SVar2) << 16 >> 16);
              FUN_00453af0();
              while (((((local_8) >> 8) & 0xFF) !== 0)) {
                SVar2 = FUN_006e7d64(0x20);
                local_8 = ((SVar2) << 16 >> 16);
              }
              FUN_005c96cc(param_1);
              uVar9 = FUN_0040f810();
              FUN_005c6303(uVar9);
              uVar9 = FUN_00418740();
              FUN_005cbdf0(uVar9);
              return 0;
            }
          }
          pHVar6 = FUN_006e7e40(param_1);
          FUN_006e7d6c(pHVar6, param_2, param_3, param_4);
          return 0;
        }
        goto LAB_005cb26a;
      }
    }
    else {
      if ((param_2 !== 0x201)) {
        if ((param_2 === 0x202)) {
          if ((s32((local_44 + 0x1c), 0) === 0)) {
            return 0;
          }
          FUN_006e7d88();
          w32((local_44 + 0x1c), 0, 0);
          piVar3 = FUN_005c8f50();
          local_38 = s32(piVar3, 0);
          local_38 = s32(piVar3, 1);
          local_38 = s32(piVar3, 2);
          local_38 = s32(piVar3, 3);
          FUN_006e7da4(DAT_ffffffc8, (-s32(piVar3, 0)), (-s32(piVar3, 1)));
          FUN_006e7e28(param_1, DAT_ffffffc8, 0);
          w32((local_44 + 0x18), 0, 0);
          BVar4 = FUN_006e7e78(DAT_ffffffc8, ((((param_4 >>> 0x10) << 32) | param_4) & -4294901761));
          if ((BVar4 === 0)) {
            return 0;
          }
          FUN_005cacd4(param_1, 0xf, 0, 0);
          uVar9 = FUN_0040f810();
          FUN_005c6303(uVar9);
          uVar9 = FUN_00418740();
          FUN_005cbdf0(uVar9);
          return 0;
        }
        goto LAB_005cb26a;
      }
      pcVar7 = egptr(local_28);
      if ((pcVar7 === 0)) {
        return 0;
      }
      w32((local_44 + 0x1c), 0, 1);
      FUN_006e7d94(param_1);
      FUN_006e7d84(param_1);
    }
    if ((s32((local_44 + 0x1c), 0) !== 0)) {
      piVar3 = FUN_005c8f50();
      local_38 = s32(piVar3, 0);
      local_38 = s32(piVar3, 1);
      local_38 = s32(piVar3, 2);
      local_38 = s32(piVar3, 3);
      FUN_006e7da4(DAT_ffffffc8, (-s32(piVar3, 0)), (-s32(piVar3, 1)));
      BVar4 = FUN_006e7e78(DAT_ffffffc8, ((((param_4 >>> 0x10) << 32) | param_4) & -4294901761));
      local_20 = u8((BVar4 !== 0));
      if ((s32((local_44 + 0x18), 0) !== local_20)) {
        w32((local_44 + 0x18), 0, local_20);
        FUN_006e7e28(param_1, DAT_ffffffc8, 0);
      }
    }
    return 0;
  }
  if ((param_2 === 0xf)) {
    local_40 = FUN_006e7e88(param_1, DAT_ffffff7c);
    pLVar5 = FUN_005c8f50();
    local_38 = s32(pLVar5, 0);
    local_38 = s32(pLVar5, 1);
    local_38 = s32(pLVar5, 2);
    local_38 = s32(pLVar5, 3);
    lpRect = DAT_ffffffc8;
    pHVar6 = FUN_006e7e40(param_1);
    FUN_006e7e48(pHVar6, lpRect);
    pcVar7 = egptr(local_28);
    if ((pcVar7 === 0)) {
      pHVar6 = FUN_006e7e94();
      if ((pHVar6 === param_1)) {
        FUN_0040f810();
        cVar1 = FUN_005cbdd0();
        if ((cVar1 === 0)) {
          FUN_0040f810();
          iVar8 = FUN_00414d10();
          FUN_006e7d94(s32((iVar8 + 4), 0));
        }
        else {
          FUN_006e7d94(0);
        }
      }
      local_3c = s32((local_44 + 0x14), 0);
    }
    else {
      if ((s32((local_44 + 0x18), 0) === 0)) {
        local_3c = s32((local_44 + 0xc), 0);
      }
      if ((s32((local_44 + 0x18), 0) === 1)) {
        local_3c = s32((local_44 + 0x10), 0);
      }
    }
    local_24 = FUN_006e79f8(local_40);
    FUN_006e7a80(local_24);
    h = FUN_006e7a6c(local_24, local_3c);
    rop = 0xcc0020;
    y1 = 0;
    x1 = 0;
    hdcSrc = local_24;
    iVar8 = FUN_00407fc0(DAT_ffffffc8);
    cx = FUN_00407f90(DAT_ffffffc8);
    FUN_006e7a7c(local_40, 0, 0, cx, iVar8, hdcSrc, x1, y1, rop);
    FUN_006e7a6c(local_24, h);
    FUN_006e7a08(local_24);
    FUN_006e7e84(param_1, DAT_ffffff7c);
    pHVar6 = FUN_006e7e94();
    if ((pHVar6 !== param_1)) {
      return 0;
    }
    FUN_005cacd4(param_1, 7, 0, 0);
    return 0;
  }
  if ((param_2 === 7)) {
    FUN_0040f810();
    cVar1 = FUN_005cbdd0();
    if ((cVar1 !== 0)) {
      local_40 = FUN_006e7e10(param_1);
      local_1c = FUN_006e7a10(3);
      FUN_006e7e4c(param_1, DAT_ffffffe8);
      FUN_006e7a6c(local_40, local_1c);
      FUN_006e7e90(local_40, DAT_ffffffe8, local_1c);
      FUN_006e7d90(DAT_ffffffe8, (UNNAMED + 4), (UNNAMED + 4), (UNNAMED + -4), (UNNAMED + -4))
      ;
      FUN_006e7e90(local_40, DAT_ffffffe8, local_1c);
      FUN_006e7a94(local_1c);
      FUN_006e7dd8(param_1, local_40);
      return 0;
    }
    uVar9 = FUN_005c9307(param_1, 7, param_3, param_4);
    return uVar9;
  }
  if ((param_2 === 8)) {
    FUN_005c96cc(param_1);
    return 0;
  }
 LAB_005cb26a: :
  uVar9 = FUN_005c9307(param_1, param_2, param_3, param_4);
  return uVar9;
}


 export function FUN_005cb319 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8)

 {
  let pCVar1;
  let pCVar2;
  let uVar3;
  let iVar4;
  let nWidth;
  let hWndParent;
  let hMenu;
  let hInstance;
  let lpParam;
  let local_44;
  let local_3c;
  let local_2c;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_2c = param_3;
  if ((_MEM[(param_3 + 0xc8)] === 0)) {
    FUN_005bf930(param_4, param_6, param_7, s32((param_3 + 0xc4), 0));
    FUN_005bf930(param_5, param_6, param_7, s32((local_2c + 0xc4), 0));
  }
  else {
    FUN_005bd7db(param_4, param_6, param_7, s32((param_3 + 0xc4), 0));
    FUN_005bd7db(param_5, param_6, param_7, s32((local_2c + 0xc4), 0));
  }
  FUN_00453af0();
  pCVar1 = GetActiveView((local_2c + 0x7c));
  pCVar1 = (pCVar1 + (param_2 + -1));
  pCVar2 = GetActiveView((local_2c + 0x7c));
  FUN_006e7d90(DAT_ffffffc4, param_1, param_2, (pCVar2 + (param_1 + -1)), pCVar1);
  FUN_006e7da4(DAT_ffffffc4, (-UNNAMED), (-UNNAMED));
  if ((param_4 === param_5)) {
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
    FUN_005c0593((local_2c + 0x7c), DAT_ffffffec, DAT_ffffffdc);
  }
  FUN_00453af0();
  FUN_0040f810();
  uVar3 = FUN_00511320();
  FUN_005c0d12(uVar3);
  FUN_0040f810();
  uVar3 = FUN_00511320();
  FUN_005c0d12(uVar3);
  FUN_005c19ad(0xff);
  FUN_005c19ad(0xf8);
  FUN_005c19ad(0xf8);
  FUN_005c19ad(0xff);
  pCVar1 = GetActiveView((local_2c + 0x7c));
  pCVar1 = (pCVar1 + param_2);
  pCVar2 = GetActiveView((local_2c + 0x7c));
  FUN_006e7d90(DAT_ffffffc4, param_1, param_2, (pCVar2 + param_1), pCVar1);
  local_44 = 0x40810000;
  if ((param_8 !== 0)) {
    local_44 = 0x50810000;
  }
  lpParam = 0;
  hMenu = 0;
  hInstance = DAT_006e4ff0;
  FUN_0040f810();
  iVar4 = FUN_00414d10();
  hWndParent = s32((iVar4 + 4), 0);
  iVar4 = FUN_00407fc0(DAT_ffffffc4);
  nWidth = FUN_00407f90(DAT_ffffffc4);
  local_28 = FUN_006e7d50(4, s_MSControlClass_00637e34, DAT_00637e30, local_44, param_1, param_2, nWidth, iVar4, hWndParent, hMenu, hInstance, lpParam);
  iVar4 = FUN_005c9499(local_28, param_3);
  w32((iVar4 + 0x2c), 0, 5);
  FUN_006e7db0(local_28, -4, 0x5cb6eb);
  return local_28;
}


 export function FUN_005cb601 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let iVar1;
  let nWidth;
  let hWndParent;
  let hMenu;
  let hInstance;
  let lpParam;
  let local_24;
  let local_1c;
  let local_c;
  let local_8;

  local_24 = 0x40810000;
  if ((param_6 !== 0)) {
    local_24 = 0x50810000;
  }
  local_c = param_5;
  FUN_006e7d90(DAT_ffffffe4, param_1, param_2, (param_1 + param_3), (param_2 + param_4));
  lpParam = 0;
  hMenu = 0;
  hInstance = DAT_006e4ff0;
  FUN_0040f810();
  iVar1 = FUN_00414d10();
  hWndParent = s32((iVar1 + 4), 0);
  iVar1 = FUN_00407fc0(DAT_ffffffe4);
  nWidth = FUN_00407f90(DAT_ffffffe4);
  local_8 = FUN_006e7d50(4, s_MSControlClass_00637e48, DAT_00637e44, local_24, param_1, param_2, nWidth, iVar1, hWndParent, hMenu, hInstance, lpParam);
  iVar1 = FUN_005c9499(local_8, param_5);
  w32((iVar1 + 0x2c), 0, 5);
  FUN_006e7db0(local_8, -4, 0x5cb6eb);
  return local_8;
}


 export function FUN_005cb6db ()

 {
  return;
}


 export function FUN_005cb6eb (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let sVar2;
  let iVar3;
  let piVar4;
  let pHVar5;
  let this;
  let hPal;
  let uVar6;
  let pCVar7;
  let pCVar8;
  let uVar9;
  let pHVar10;
  let iVar11;
  let y1;
  let lpRect;
  let BVar12;
  let DVar13;
  let local_64;
  let local_24;
  let local_20;
  let local_10;
  let local_c;
  let local_8;

  iVar3 = FUN_005c9563(param_1);
  if ((iVar3 === 0)) {
    return 1;
  }
  local_10 = s32((iVar3 + 4), 0);
  if ((param_2 < 0x10)) {
    if ((param_2 === 0xf)) {
      local_24 = FUN_006e7e88(param_1, DAT_ffffff9c);
      piVar4 = FUN_005c8f50();
      local_20 = s32(piVar4, 0);
      local_20 = s32(piVar4, 1);
      local_20 = s32(piVar4, 2);
      local_20 = s32(piVar4, 3);
      lpRect = DAT_ffffffe0;
      pHVar5 = FUN_006e7e40(param_1);
      FUN_006e7e48(pHVar5, lpRect);
      FUN_006e7da4(DAT_ffffffe0, (-s32(piVar4, 0)), (-s32(piVar4, 1)));
      FUN_006e7e48(param_1, DAT_ffffffe0);
      if ((DAT_00638b48 === 1)) {
        BVar12 = 0;
        FUN_0040f810();
        this = FUN_00511320();
        hPal = IsTracking(this);
        FUN_006e7a74(local_24, hPal, BVar12);
      }
      if ((s32((iVar3 + 0x18), 0) === 0)) {
        FUN_005c01c1();
        FUN_0040f810();
        uVar9 = FUN_00511320();
        FUN_005c0d12(uVar9);
        if ((DAT_00638b48 === 1)) {
          FUN_006e7a80(local_24);
        }
        DVar13 = 0xcc0020;
        y1 = 0;
        iVar11 = 0;
        uVar6 = GetCheckStyle((local_10 + 0x34));
        pHVar10 = s32((uVar6 + 4), 0);
        pCVar7 = GetActiveView((local_10 + 0x34));
        pCVar8 = GetActiveView((local_10 + 0x34));
        FUN_006e7a7c(local_24, 0, 0, pCVar8, pCVar7, pHVar10, iVar11, y1, DVar13);
        FUN_005c02e0();
      }
      if ((s32((iVar3 + 0x18), 0) === 1)) {
        FUN_005c01c1();
        FUN_0040f810();
        uVar9 = FUN_00511320();
        FUN_005c0d12(uVar9);
        FUN_006e7a80(local_24);
        DVar13 = 0xcc0020;
        iVar11 = 0;
        iVar3 = 0;
        uVar6 = GetCheckStyle((local_10 + 0x7c));
        pHVar10 = s32((uVar6 + 4), 0);
        pCVar7 = GetActiveView((local_10 + 0x7c));
        pCVar8 = GetActiveView((local_10 + 0x7c));
        FUN_006e7a7c(local_24, 0, 0, pCVar8, pCVar7, pHVar10, iVar3, iVar11, DVar13);
        FUN_005c02e0();
      }
      FUN_006e7e84(param_1, DAT_ffffff9c);
      pHVar5 = FUN_006e7e94();
      if ((pHVar5 !== param_1)) {
        return 0;
      }
      FUN_005cb6eb(param_1, 7, 0, 0);
      return 0;
    }
    if ((param_2 === 7)) {
      FUN_0040f810();
      cVar1 = FUN_005cbdd0();
      if ((cVar1 !== 0)) {
        uVar9 = FUN_005c9307(param_1, 7, param_3, param_4);
        return uVar9;
      }
      return 0;
    }
    if ((param_2 === 8)) {
      FUN_005c96cc(param_1);
      return 0;
    }
 switchD_005cbd7f_caseD_203: :
    uVar9 = FUN_005c9307(param_1, param_2, param_3, param_4);
    return uVar9;
  }
  if ((param_2 < 0x201)) {
    if ((param_2 !== 0x200)) {
      if ((param_2 === 0x100)) {
        if ((param_3 === 9)) {
          pHVar5 = FUN_006e7e40(param_1);
          FUN_006e7d6c(pHVar5, param_2, param_3, param_4);
          return 0;
        }
        if ((param_3 === 0x20)) {
          FUN_0040f810();
          cVar1 = FUN_005cbdd0();
          if ((cVar1 !== 0)) {
            w32((iVar3 + 0x18), 0, 1);
            FUN_005c96cc(param_1);
            w32((iVar3 + 0x18), 0, 0);
            sVar2 = FUN_006e7d64(0x20);
            while (((((sVar2 >>> 8)) & 0xFF) === 0)) {
              local_8 = ((sVar2) << 16 >> 16);
              iVar3 = local_8;
              local_8 = (((sVar2 >>> 8)) & 0xFF);
              local_8 = iVar3;
              if (((((sVar2 >>> 8)) & 0xFF) === 0));
            }
            FUN_005c96cc(param_1);
            uVar9 = FUN_0040f810();
            FUN_005c6303(uVar9);
            uVar9 = FUN_00418740();
            FUN_005cbe30(uVar9);
            return 0;
          }
        }
        pHVar5 = FUN_006e7e40(param_1);
        FUN_006e7d6c(pHVar5, param_2, param_3, param_4);
        return 0;
      }
      goto switchD_005cbd7f_caseD_203;
    }
 LAB_005cb749: :
    if ((s32((iVar3 + 0x1c), 0) !== 0)) {
      piVar4 = FUN_005c8f50();
      local_20 = s32(piVar4, 0);
      local_20 = s32(piVar4, 1);
      local_20 = s32(piVar4, 2);
      local_20 = s32(piVar4, 3);
      FUN_006e7da4(DAT_ffffffe0, (-s32(piVar4, 0)), (-s32(piVar4, 1)));
      BVar12 = FUN_006e7e78(DAT_ffffffe0, ((((param_4 >>> 0x10) << 32) | param_4) & -4294901761));
      local_c = u8((BVar12 !== 0));
      if ((s32((iVar3 + 0x18), 0) !== local_c)) {
        w32((iVar3 + 0x18), 0, local_c);
        FUN_006e7e28(param_1, DAT_ffffffe0, 0);
      }
    }
  }
  else {
    /* switch */ () {
    case 0x201 :
      w32((iVar3 + 0x1c), 0, 1);
      FUN_006e7d94(param_1);
      FUN_006e7d84(param_1);
      goto LAB_005cb749;
    case 0x202 :
      if ((s32((iVar3 + 0x1c), 0) !== 0)) {
        FUN_006e7d88();
        w32((iVar3 + 0x1c), 0, 0);
        piVar4 = FUN_005c8f50();
        local_20 = s32(piVar4, 0);
        local_20 = s32(piVar4, 1);
        local_20 = s32(piVar4, 2);
        local_20 = s32(piVar4, 3);
        FUN_006e7da4(DAT_ffffffe0, (-s32(piVar4, 0)), (-s32(piVar4, 1)));
        FUN_006e7e28(param_1, DAT_ffffffe0, 0);
        w32((iVar3 + 0x18), 0, 0);
        BVar12 = FUN_006e7e78(DAT_ffffffe0, ((((param_4 >>> 0x10) << 32) | param_4) & -4294901761))
        ;
        if ((BVar12 !== 0)) {
          FUN_005cb6eb(param_1, 0xf, 0, 0);
          uVar9 = FUN_0040f810();
          FUN_005c6303(uVar9);
          uVar9 = FUN_00418740();
          FUN_005cbe30(uVar9);
        }
      }
      break;
    default :
      goto switchD_005cbd7f_caseD_203;
    case 0x204 :
      w32((iVar3 + 0x1c), 0, 1);
      FUN_006e7d94(param_1);
      FUN_006e7d84(param_1);
      break;
    case 0x205 :
      if ((s32((iVar3 + 0x1c), 0) !== 0)) {
        FUN_006e7d88();
        w32((iVar3 + 0x1c), 0, 0);
        piVar4 = FUN_005c8f50();
        local_20 = s32(piVar4, 0);
        local_20 = s32(piVar4, 1);
        local_20 = s32(piVar4, 2);
        local_20 = s32(piVar4, 3);
        FUN_006e7da4(DAT_ffffffe0, (-s32(piVar4, 0)), (-s32(piVar4, 1)));
        FUN_006e7e28(param_1, DAT_ffffffe0, 0);
        w32((iVar3 + 0x18), 0, 0);
        BVar12 = FUN_006e7e78(DAT_ffffffe0, ((((param_4 >>> 0x10) << 32) | param_4) & -4294901761))
        ;
        if ((BVar12 !== 0)) {
          FUN_005cb6eb(param_1, 0xf, 0, 0);
          uVar9 = FUN_0040f810();
          FUN_005c6303(uVar9);
          uVar9 = FUN_00418740();
          FUN_005cbe70(uVar9);
        }
      }
    }
  }
  return 0;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* int */  /* __thiscall */
 /* CSplitterWnd::IsTracking(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function IsTracking (this)

 {
  return s32((this + 0x404), 0);
}


 export function FUN_005cbdd0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return _MEM[(in_ECX + 0xc4)];
}


 export function FUN_005cbdf0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) !== 0)) {
    in_ECX = (in_ECX + 0x30);
  }
  return;
}


 export function FUN_005cbe30 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x2c);
  }
  return;
}


 export function FUN_005cbe70 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) !== 0)) {
    in_ECX = (in_ECX + 0x30);
  }
  return;
}


 export function FUN_005cbeb0 (param_1)

 {
  FUN_005d4204(param_1);
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
  FUN_005cbeea();
  FUN_005cbf04();
  return;
}


 export function FUN_005cbeea ()

 {
  FUN_0043c690();
  return;
}


 export function FUN_005cbf04 ()

 {
  _atexit(FUN_005cbf21);
  return;
}


 export function FUN_005cbf21 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_005cbf40 (param_1, param_2, param_3, param_4)

 {
  let hdc;
  let hdc_00;
  let uVar1;
  let h;
  let c;
  let lpsz;
  let local_5c;
  let local_4c;
  let local_44;
  let local_c;
  let local_8;

  hdc = FUN_006e7e10(0);
  hdc_00 = FUN_006e79f8(hdc);
  FUN_006e7dd8(0, hdc);
  uVar1 = FUN_004d8af0();
  local_8 = FUN_005dcdf9(uVar1);
  h = FUN_006e7a6c(hdc_00, s32(local_8, 0));
  uVar1 = FUN_004d8af0();
  FUN_005dce29(uVar1);
  FUN_006e7a68(hdc_00, DAT_ffffffbc);
  local_5c = UNNAMED;
  lpsz = DAT_ffffffb4;
  c = _strlen(param_1);
  FUN_006e7a64(hdc_00, param_1, c, lpsz);
  local_c = UNNAMED;
  FUN_006e7a6c(hdc_00, h);
  FUN_006e7a08(hdc_00);
  local_c = (local_c + 0x25);
  if ((UNNAMED < 0x14)) {
    local_5c = 0x14;
  }
  FUN_006e7d90(param_4, param_2, param_3, (local_c + param_2), (local_5c + param_3));
  return;
}


 export function FUN_005cc035 (param_1, param_2, param_3, param_4)

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
  if ((UNNAMED < 0x14)) {
    local_4c = 0x14;
  }
  FUN_006e7d90(param_4, param_1, param_2, (param_3 + param_1), (local_4c + param_2));
  return;
}


 export function FUN_005cc0f0 (param_1, param_2, param_3, param_4)

 {
  let sVar1;
  let pvVar2;
  let iVar3;
  let nWidth;
  let pHVar4;
  let pHVar5;
  let pHVar6;
  let pHVar7;
  let hMenu;
  let hInstance;
  let lpParam;
  let local_24;

  sVar1 = _strlen(param_3);
  pvVar2 = operator_new((sVar1 + 1));
  FUN_005f22d0(pvVar2, param_3);
  local_24 = 0x40010000;
  if ((param_4 !== 0)) {
    local_24 = 0x50010000;
  }
  lpParam = 0;
  hMenu = 0;
  hInstance = DAT_006e4ff0;
  FUN_0040f810();
  iVar3 = FUN_00414d10();
  pHVar4 = s32((iVar3 + 4), 0);
  iVar3 = FUN_00407fc0(param_1);
  nWidth = FUN_00407f90(param_1);
  pHVar4 = FUN_006e7d50(4, s_MSControlClass_00637f10, DAT_00637f0c, local_24, s32(param_1, 0), s32(param_1, 1), nWidth, iVar3, pHVar4, hMenu, hInstance, lpParam);
  FUN_005c9222(param_2, pvVar2);
  pHVar5 = FUN_006e7e98(DAT_006e4ff0, 0x132);
  pHVar6 = FUN_006e7e98(DAT_006e4ff0, 0x131);
  pHVar7 = FUN_006e7e98(DAT_006e4ff0, 0x130);
  iVar3 = FUN_005c9499(pHVar4, param_2);
  w32((iVar3 + 0xc), 0, pHVar5);
  w32((iVar3 + 0x10), 0, pHVar6);
  w32((iVar3 + 0x14), 0, pHVar7);
  w32((iVar3 + 0x2c), 0, 2);
  w32((iVar3 + 0x24), 0, pvVar2);
  FUN_006e7db0(pHVar4, -4, 0x5cc320);
  return pHVar4;
}


 export function FUN_005cc248 (param_1)

 {
  if ((param_1 === 0)) {
    FUN_005d225b(s_Error:_Tried_to_dispose_NULL_Che_00637f20);
  }
  return;
}


 export function FUN_005cc274 (param_1)

 {
  let this;
  let iVar1;
  let uVar2;

  iVar1 = FUN_005c9563(param_1);
  if ((iVar1 !== 0)) {
    this = s32((iVar1 + 4), 0);
    FUN_006e7d94(param_1);
    iVar1 = width(this);
    if ((iVar1 === 0)) {
      FUN_0040fad0(1);
    }
    else {
      FUN_0040fad0(0);
    }
    FUN_006e7d84(param_1);
    FUN_006e7e28(param_1, 0, 0);
    wv(DAT_00637ea4, FUN_0040f810());
    iVar1 = width(this);
    uVar2 = FUN_00418740(iVar1);
    FUN_005cce40(uVar2, iVar1);
  }
  return;
}


 export function FUN_005cc320 (param_1, param_2, param_3, param_4)

 {
  let cVar1;
  let iVar2;
  let piVar3;
  let uVar4;
  let sVar5;
  let pHVar6;
  let uVar7;
  let puVar8;
  let puVar9;
  let ptVar10;
  let puVar11;
  let UVar12;
  let local_1b0;
  let local_1a0;
  let local_19c;
  let local_198;
  let local_194;
  let local_154;
  let local_150;
  let local_148;
  let local_144;
  let local_140;
  let local_13c;
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
  let local_14;

  local_19c = FUN_005c9563(param_1);
  local_198 = s32((local_19c + 4), 0);
  if ((param_2 < 0x10)) {
    if ((param_2 === 0xf)) {
      iVar2 = FUN_005c5ec0();
      if ((iVar2 === 0)) {
        pHVar6 = FUN_006e7e94();
        if ((pHVar6 === param_1)) {
          FUN_006e7d94(0);
        }
        local_1a0 = s32((local_19c + 0xc), 0);
      }
      else {
        iVar2 = width(local_198);
        if ((iVar2 === 0)) {
          local_1a0 = s32((local_19c + 0x10), 0);
        }
        else {
          local_1a0 = s32((local_19c + 0x14), 0);
        }
      }
      FUN_006e7a20(local_1a0, DAT_fffffeb0);
      piVar3 = FUN_005c8f50();
      local_1b0 = s32(piVar3, 0);
      local_1b0 = s32(piVar3, 1);
      local_1b0 = s32(piVar3, 2);
      local_1b0 = s32(piVar3, 3);
      local_134 = s32(piVar3, 0);
      local_130 = s32(piVar3, 1);
      local_12c = s32(piVar3, 2);
      local_128 = s32(piVar3, 3);
      if ((DAT_00637f08 !== 0)) {
        local_12c = (s32(piVar3, 0) + 0x20);
        iVar2 = FUN_00407fc0(DAT_fffffe50);
        local_130 = (((iVar2 + -20) + s32(piVar3, 1)) >> 1);
        local_128 = (s32(piVar3, 1) + 0x14);
      }
      FUN_006e7da4(DAT_fffffe50, (-UNNAMED), (-UNNAMED));
      local_144 = FUN_006e7e88(param_1, DAT_fffffe6c);
      FUN_005c90ca(DAT_fffffe6c, param_1);
      uVar7 = FUN_004d8af0();
      local_118 = FUN_005dcdf9(uVar7);
      local_154 = FUN_006e7a6c(local_144, s32(local_118, 0));
      uVar7 = FUN_004d8af0();
      FUN_005dce29(uVar7);
      FUN_006e7a14(local_144, 1);
      FUN_005ed710(local_144, local_1a0, UNNAMED, ((UNNAMED + -20) >> 1), 0x20, 0x14, 0, 7);
      local_1b0 = (UNNAMED + 0x25);
      local_140 = s32((local_19c + 0x24), 0);
      if ((DAT_00637e9c !== 0)) {
        FUN_006e7da4(DAT_fffffe50, u8(DAT_00637e98), u8(DAT_00637e9c));
        puVar11 = DAT_fffffee0;
        puVar9 = DAT_fffffeb8;
        puVar8 = DAT_fffffedc;
        uVar4 = u8(DAT_00637e94);
        FUN_0040f810(uVar4, puVar8, puVar9, puVar11);
        FUN_00511320();
        FUN_00497c40(uVar4, puVar8, puVar9, puVar11);
        FUN_006e7a04(local_144, ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
        UVar12 = 0x24;
        ptVar10 = DAT_fffffe50;
        sVar5 = _strlen(local_140);
        FUN_006e7e74(local_144, local_140, sVar5, ptVar10, UVar12);
        FUN_006e7da4(DAT_fffffe50, (-u8(DAT_00637e98)), (-u8(DAT_00637e9c)));
      }
      iVar2 = FUN_005c5ec0();
      if ((iVar2 === 1)) {
        FUN_0040f810();
        iVar2 = FUN_00414d10();
        if ((s32((iVar2 + 0x40), 0) === 8)) {
          if ((DAT_00637e90 === 0)) {
            FUN_006e7a04(local_144, 0);
          }
          else {
            FUN_0040f810(DAT_00637e90, DAT_fffffedc, DAT_fffffeb8, DAT_fffffee0);
            FUN_00511320();
            uVar7 = FUN_0046f440();
            FUN_005dea9e(uVar7);
            FUN_006e7a04(local_144, ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)))
            ;
          }
        }
        else if ((DAT_00637f03 === 0)) {
          FUN_006e7a04(local_144, 0);
        }
        else {
          FUN_006e7a04(local_144, ((DAT_00637f02 << 16) | ((DAT_00637f01 << 8) | DAT_00637f00)));
        }
      }
      else {
        iVar2 = FUN_005c5ec0();
        if ((iVar2 === 0)) {
          FUN_0040f810();
          iVar2 = FUN_00414d10();
          if ((s32((iVar2 + 0x40), 0) === 8)) {
            if ((DAT_00637ea0 === 0)) {
              FUN_006e7a04(local_144, 0x404040);
            }
            else {
              FUN_0040f810(DAT_00637ea0, DAT_fffffedc, DAT_fffffeb8, DAT_fffffee0);
              FUN_00511320();
              uVar7 = FUN_0046f440();
              FUN_005dea9e(uVar7);
              FUN_006e7a04(local_144, ((UNNAMED << 16) | ((UNNAMED << 8) | UNNAMED)));
            }
          }
          else if ((DAT_00637f07 === 0)) {
            FUN_006e7a04(local_144, 0x404040);
          }
          else {
            FUN_006e7a04(local_144, ((DAT_00637f06 << 16) | ((DAT_00637f05 << 8) | DAT_00637f04)))
            ;
          }
        }
      }
      UVar12 = 0x24;
      ptVar10 = DAT_fffffe50;
      sVar5 = _strlen(local_140);
      FUN_006e7e74(local_144, local_140, sVar5, ptVar10, UVar12);
      if ((s32((local_198 + 0x28), 0) !== -1)) {
        FUN_005f22d0(DAT_fffffeec, local_140);
        _MEM[DAT_fffffeec + s32((local_198 + 0x28), 0)] = 0;
        local_14 = UNNAMED;
        local_14 = UNNAMED;
        local_14 = UNNAMED;
        local_14 = UNNAMED;
        sVar5 = _strlen(DAT_fffffeec);
        if ((sVar5 === 0)) {
          local_138 = UNNAMED;
        }
        else {
          UVar12 = 0x424;
          ptVar10 = DAT_ffffffec;
          sVar5 = _strlen(DAT_fffffeec);
          FUN_006e7e74(local_144, DAT_fffffeec, sVar5, ptVar10, UVar12);
          local_138 = (UNNAMED + -1);
        }
        FUN_005f22d0(DAT_fffffeec, local_140);
        _MEM[DAT_fffffeec + (s32((local_198 + 0x28), 0) + 1)] = 0;
        local_14 = UNNAMED;
        local_14 = UNNAMED;
        local_14 = UNNAMED;
        local_14 = UNNAMED;
        UVar12 = 0x424;
        ptVar10 = DAT_ffffffec;
        sVar5 = _strlen(DAT_fffffeec);
        FUN_006e7e74(local_144, DAT_fffffeec, sVar5, ptVar10, UVar12);
        local_138 = (local_138 + ((((UNNAMED + 1) - local_138) >> 1) + -5));
        local_13c = (local_138 + 0xa);
        local_11c = FUN_006e7a10(3);
        FUN_006e7a6c(local_144, local_11c);
        FUN_006e7a1c(local_144, local_138, (UNNAMED + -3), 0);
        FUN_006e7a24(local_144, local_13c, (UNNAMED + -3));
        FUN_006e7a1c(local_144, local_138, (UNNAMED + -2), 0);
        FUN_006e7a24(local_144, local_13c, (UNNAMED + -2));
      }
      FUN_006e7a6c(local_144, local_154);
      FUN_006e7e84(param_1, DAT_fffffe6c);
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
 LAB_005ccd4b: :
      uVar7 = FUN_005c9307(param_1, param_2, param_3, param_4);
      return uVar7;
    }
    FUN_0040f810();
    cVar1 = FUN_005cbdd0();
    if ((cVar1 === 0)) {
      uVar7 = FUN_005c9307(param_1, param_2, param_3, param_4);
      return uVar7;
    }
    local_144 = FUN_006e7e10(param_1);
    local_11c = FUN_006e7a10(3);
    FUN_006e7e4c(param_1, DAT_fffffe50);
    FUN_006e7a6c(local_144, local_11c);
    local_1b0 = (UNNAMED + 0x20);
    FUN_006e7e90(local_144, DAT_fffffe50, local_11c);
    FUN_006e7a94(local_11c);
    FUN_006e7dd8(param_1, local_144);
  }
  else if ((param_2 === 0x100)) {
    if ((param_3 === 9)) {
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
      pHVar6 = FUN_006e7e40(param_1);
      FUN_006e7d6c(pHVar6, param_2, param_3, param_4);
    }
  }
  else if ((param_2 === 0x201)) {
    iVar2 = FUN_005c5ec0();
    if ((DAT_00637f08 === 0)) {
      FUN_006e7d94(param_1);
      iVar2 = width(local_198);
      if ((iVar2 === 0)) {
        FUN_0040fad0(1);
      }
      else {
        FUN_0040fad0(0);
      }
      wv(DAT_00637f08, 1);
      FUN_006e7d84(param_1);
      FUN_006e7e28(param_1, 0, 0);
      uVar7 = FUN_0040f810();
      FUN_005c6303(uVar7);
      iVar2 = width(local_198);
      uVar7 = FUN_00418740(iVar2);
      FUN_005cce40(uVar7, iVar2);
    }
  }
  else {
    if ((param_2 !== 0x202));
    if ((iVar2 !== 0)) {
      FUN_006e7d88();
      wv(DAT_00637f08, 0);
    }
  }
  return 0;
}


 export function FUN_005ccddf (param_1, param_2, param_3)

 {
  wv(DAT_00637f00, param_1);
  wv(DAT_00637f01, param_2);
  wv(DAT_00637f02, param_3);
  wv(DAT_00637f03, 1);
  return;
}


 export function FUN_005cce0e (param_1, param_2, param_3)

 {
  wv(DAT_00637f04, param_1);
  wv(DAT_00637f05, param_2);
  wv(DAT_00637f06, param_3);
  wv(DAT_00637f07, 1);
  return;
}


 export function FUN_005cce40 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x2c);
  }
  return;
}


 export function FUN_005cce80 (param_1, param_2, param_3, param_4)

 {
  let DVar1;
  let pcVar2;
  let this;

  DVar1 = FUN_006e7e9c(param_1, -18);
  pcVar2 = FUN_006e7e2c(param_1, (DVar1 - 4));
  if ((this !== 0)) {
    this = delbuf(this, 0);
  }
  pcVar2 = pcVar2(param_1, param_2, param_3, param_4);
  return;
}


 export function FUN_005ccf17 (param_1, param_2, param_3, param_4)

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

  local_34 = 0x40000000;
  if ((param_4 !== 0)) {
    local_34 = 0x50000000;
  }
  if ((param_3 !== 0)) {
    local_34 = (local_34 | 1);
  }
  if ((param_4 !== 0)) {
    param_3 = (param_3 | 0x10000000);
  }
  if ((DAT_00637f58 === 0)) {
    pvVar6 = 0;
    pHVar4 = 0;
    pHVar5 = DAT_006e4ff0;
    FUN_0040f810();
    iVar1 = FUN_00414d10();
    pHVar3 = s32((iVar1 + 4), 0);
    iVar1 = FUN_00407fc0(param_1);
    iVar2 = FUN_00407f90(param_1);
    local_8 = FUN_006e7d50(4, s_SCROLLBAR_00637f60, DAT_00637f5c, (param_3 | 0x40000000), s32(param_1, 0), s32(param_1, 1), iVar2, iVar1, pHVar3, pHVar4, pHVar5, pvVar6);
    wv(DAT_006d46f8, FUN_006e7e2c(local_8, -4));
    local_34 = FUN_006e7e2c(local_8, -16);
    local_30 = 0x8b;
    local_30 = FUN_006e7e2c(local_8, -4);
    local_30 = 0;
    wv(DAT_006d46f4, FUN_006e7e9c(local_8, -18));
    local_30 = (FUN_006e7e9c(local_8, -18) + 8);
    local_30 = DAT_006e4ff0;
    local_30 = 0;
    local_30 = FUN_006e7dac(0, 0x7f00);
    local_30 = FUN_006e7a10(1);
    local_30 = 0;
    local_30 = s_MSScrollBarClass_00637f6c;
    FUN_006e7da8(DAT_ffffffd0);
    wv(DAT_00637f58, 1);
    FUN_006e7e1c(local_8);
  }
  pvVar6 = 0;
  pHVar4 = 0;
  pHVar5 = DAT_006e4ff0;
  FUN_0040f810();
  iVar1 = FUN_00414d10();
  pHVar3 = s32((iVar1 + 4), 0);
  iVar1 = FUN_00407fc0(param_1);
  iVar2 = FUN_00407f90(param_1);
  local_8 = FUN_006e7d50(4, s_MSScrollBarClass_00637f84, DAT_00637f80, local_34, s32(param_1, 0), s32(param_1, 1), iVar2, iVar1, pHVar3, pHVar4, pHVar5, pvVar6);
  FUN_006e7db0(local_8, -4, 0x5cce80);
  FUN_006e7db0(local_8, DAT_006d46f4, param_2);
  FUN_006e7db0(local_8, (DAT_006d46f4 + 4), DAT_006d46f8);
  FUN_006e7ea0(local_8, 2, 1);
  FUN_005cd4c7(local_8, 1, 0x64);
  return local_8;
}


 export function FUN_005cd139 ()

 {
  return;
}


 export function FUN_005cd149 (param_1, param_2, param_3, param_4)

 {
  let sVar1;
  let DVar2;
  let LVar3;
  let iVar4;
  let uVar5;
  let pWVar6;
  let iVar7;
  let LVar8;

  DVar2 = FUN_006e7e9c(param_1, -18);
  LVar3 = FUN_006e7e2c(param_1, (DVar2 - 8));
  iVar4 = FUN_005cd620();
  if ((param_2 === 0x111)) {
    if ((param_3 === 0x7f)) {
      FUN_006e7ea8(param_1, 2, param_4, 1);
      iVar4 = FUN_006e7ea4(param_1, 2);
      w32((LVar3 + 0x3c), 0, iVar4);
    }
  }
  else if ((param_2 < 0x116)) {
    sVar1 = (((param_3 >>> 0x10)) & 0xFFFF);
    /* switch */ ((param_3 & 0xffff)  ) {
    case 0 :
      iVar7 = FUN_005bd4cd();
      if ((iVar7 === 0)) {
        iVar4 = FUN_005c8f50();
        LVar8 = s32((iVar4 + 4), 0);
        pWVar6 = FUN_005c8f50();
        FUN_006e7d7c(param_1, 0x202, s32(pWVar6, 0), LVar8);
      }
      else {
        FUN_006e7ea8(param_1, 2, (iVar4 + -1), 1);
        iVar4 = FUN_006e7ea4(param_1, 2);
        uVar5 = FUN_0040f810();
        FUN_005c6303(uVar5);
        w32((LVar3 + 0x3c), 0, iVar4);
        FUN_005cd640(iVar4);
      }
      break;
    case 1 :
      iVar7 = FUN_005bd4cd();
      if ((iVar7 === 0)) {
        iVar4 = FUN_005c8f50();
        LVar8 = s32((iVar4 + 4), 0);
        pWVar6 = FUN_005c8f50();
        FUN_006e7d7c(param_1, 0x202, s32(pWVar6, 0), LVar8);
      }
      else {
        FUN_006e7ea8(param_1, 2, (iVar4 + 1), 1);
        iVar4 = FUN_006e7ea4(param_1, 2);
        uVar5 = FUN_0040f810();
        FUN_005c6303(uVar5);
        w32((LVar3 + 0x3c), 0, iVar4);
        FUN_005cd640(iVar4);
      }
      break;
    case 2 :
      iVar7 = FUN_005cd6c0();
      FUN_006e7ea8(param_1, 2, (iVar4 - iVar7), 1);
      iVar4 = FUN_006e7ea4(param_1, 2);
      uVar5 = FUN_0040f810();
      FUN_005c6303(uVar5);
      w32((LVar3 + 0x3c), 0, iVar4);
      FUN_005cd640(iVar4);
      break;
    case 3 :
      iVar7 = FUN_005cd6c0();
      FUN_006e7ea8(param_1, 2, (iVar4 + iVar7), 1);
      iVar4 = FUN_006e7ea4(param_1, 2);
      uVar5 = FUN_0040f810();
      FUN_005c6303(uVar5);
      w32((LVar3 + 0x3c), 0, iVar4);
      FUN_005cd640(iVar4);
      break;
    case 4 :
      FUN_006e7ea8(param_1, 2, ((sVar1) << 16 >> 16), 1);
      uVar5 = FUN_0040f810();
      FUN_005c6303(uVar5);
      w32((LVar3 + 0x3c), 0, ((sVar1) << 16 >> 16));
      FUN_005cd640(s32((LVar3 + 0x3c), 0));
      break;
    case 5 :
      uVar5 = FUN_0040f810();
      FUN_005c6303(uVar5);
      FUN_005cd680(((sVar1) << 16 >> 16));
    }
  }
  return;
}


 export function FUN_005cd49f (param_1, param_2)

 {
  if ((param_1 !== 0)) {
    FUN_006e7e14(param_1, param_2);
  }
  return;
}


 export function FUN_005cd4c7 (param_1, param_2, param_3)

 {
  FUN_006e7eac(param_1, 2, param_2, param_3, 1);
  FUN_005cd559(param_1, param_2);
  return;
}


 export function FUN_005cd4fd (param_1, param_2, param_3, param_4)

 {
  FUN_006e7eac(param_1, 2, param_2, param_3, param_4);
  FUN_005cd559(param_1, param_2);
  return;
}


 export function FUN_005cd535 (param_1, param_2, param_3)

 {
  FUN_006e7eb0(param_1, 2, param_2, param_3);
  return;
}


 export function FUN_005cd559 (param_1, param_2)

 {
  FUN_005cd149(param_1, 0x111, 0x7f, param_2);
  return;
}


 export function FUN_005cd580 (param_1, param_2, param_3, param_4)

 {
  FUN_006e7eac(s32((param_1 + 4), 0), u8((param_4 !== 0)), param_2, param_3, 1);
  FUN_005cd5f0(param_1, param_2, param_4);
  return;
}


 export function FUN_005cd5c3 (param_1, param_2, param_3, param_4)

 {
  FUN_006e7eb0(s32((param_1 + 4), 0), u8((param_4 !== 0)), param_2, param_3);
  return;
}


 export function FUN_005cd5f0 (param_1, param_2, param_3)

 {
  FUN_006e7ea8(s32((param_1 + 4), 0), u8((param_3 !== 0)), param_2, 1);
  return;
}


 export function FUN_005cd620 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0x3c), 0);
}


 export function FUN_005cd640 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x2c), 0) !== 0)) {
    in_ECX = (in_ECX + 0x2c);
  }
  return;
}


 export function FUN_005cd680 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x30), 0) !== 0)) {
    in_ECX = (in_ECX + 0x30);
  }
  return;
}


 export function FUN_005cd6c0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0x34), 0);
}


 export function FUN_005cd6e0 ()

 {
  let local_8;

  for (/* cond: (local_8 < 0x10) */); local_8 = (local_8 < 0x10); local_8 = (local_8 + 1)) {
    w32((DAT_006d4708 + local_8 * 0x100c), 0, 0);
    w32((DAT_006d4700 + local_8 * 0x100c), 0, 0);
    w32((DAT_006d4704 + local_8 * 0x100c), 0, 0);
  }
  FUN_005cd775(1, 1);
  FUN_005cda2a(1, 1, 1, 1);
  return;
}


 export function FUN_005cd775 (param_1, param_2)

 {
  let uVar1;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 < 2)) {
    param_1 = 1;
  }
  if ((param_2 < 2)) {
    param_2 = 1;
  }
  wv(DAT_00637f98, param_1);
  wv(DAT_00637f9c, param_2);
  local_10 = FUN_00421bb0();
  local_18 = -1;
  local_14 = 0;
  do {
    if ((0xf < local_14)) {
      w32((DAT_006d4700 + local_18 * 0x100c), 0, param_1);
      w32((DAT_006d4704 + local_18 * 0x100c), 0, param_2);
      uVar1 = FUN_00421bb0();
      w32((DAT_006d4708 + local_18 * 0x100c), 0, uVar1);
      local_8 = 0;
      if ((param_1 < param_2)) {
        local_c = 0;
        local_14 = 0;
        while ((local_14 < 0x400)) {
          for (/* cond: (local_14 < 0x400) */); (-1 = (-1 < local_c) && (local_14 = (local_14 < 0x400))); local_14 = (local_14 + 1)) {
            w32((DAT_006d470c + (local_14 * 4 + local_18 * 0x100c)), 0, local_8);
            local_c = (local_c - DAT_00637f9c);
          }
          local_c = (local_c + DAT_00637f98);
          local_8 = (local_8 + 1);
        }
      }
      else {
        local_c = param_1;
        local_14 = 0;
        while ((local_14 < 0x400)) {
          for (/* cond: (local_14 < 0x400) */); (wv(DAT_00637f9c, (DAT_00637f9c <= local_c)) && (local_14 = (local_14 < 0x400))); local_14 = (local_14 + 1)) {
            w32((DAT_006d470c + (local_14 * 4 + local_18 * 0x100c)), 0, local_8);
            local_c = (local_c - DAT_00637f9c);
          }
          local_c = (local_c + DAT_00637f98);
          local_8 = (local_8 + 1);
        }
      }
 LAB_005cda01: :
      wv(DAT_006e47c8, (DAT_006d470c + local_18 * 0x100c));
      return;
    }
    if ((s32((DAT_006d4704 + local_14 * 0x100c), 0) === param_2)) {
      uVar1 = FUN_00421bb0();
      w32((DAT_006d4708 + local_14 * 0x100c), 0, uVar1);
      local_18 = local_14;
      goto LAB_005cda01;
    }
    if ((s32((DAT_006d4708 + local_14 * 0x100c), 0) <= local_10)) {
      local_10 = s32((DAT_006d4708 + local_14 * 0x100c), 0);
      local_18 = local_14;
    }
    local_14 = (local_14 + 1);
  } ( true );
}


 export function FUN_005cda06 (param_1, param_2)

 {
  w32(param_1, 0, DAT_00637f98);
  w32(param_2, 0, DAT_00637f9c);
  return;
}


 export function FUN_005cda2a (param_1, param_2, param_3, param_4)

 {
  let uVar1;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((param_1 < 2)) {
    param_1 = 1;
  }
  if ((param_2 < 2)) {
    param_2 = 1;
  }
  if ((param_3 < 2)) {
    param_3 = 1;
  }
  if ((param_4 < 2)) {
    param_4 = 1;
  }
  wv(DAT_00637fa0, param_1);
  wv(DAT_00637fa4, param_2);
  wv(DAT_00637fa8, param_3);
  wv(DAT_00637fac, param_4);
  local_10 = FUN_00421bb0();
  local_8 = -1;
  for (/* cond: (local_14 < 0x10) */); local_14 = (local_14 < 0x10); local_14 = (local_14 + 1)) {
    if ((s32((DAT_006d4704 + local_14 * 0x100c), 0) === param_2)) {
      uVar1 = FUN_00421bb0();
      w32((DAT_006d4708 + local_14 * 0x100c), 0, uVar1);
      local_8 = local_14;
      goto LAB_005cdbab;
    }
    if ((s32((DAT_006d4708 + local_14 * 0x100c), 0) <= local_10)) {
      local_10 = s32((DAT_006d4708 + local_14 * 0x100c), 0);
      local_8 = local_14;
    }
  }
  FUN_005cdcdb(local_8, param_1, param_2);
 LAB_005cdbab: :
  wv(DAT_006e47c0, (DAT_006d470c + local_8 * 0x100c));
  local_10 = FUN_00421bb0();
  local_c = -1;
  local_14 = 0;
  do {
    if ((0xf < local_14)) {
      FUN_005cdcdb(local_c, DAT_00637fa8, DAT_00637fac);
      local_14 = local_c;
 LAB_005cdcd6: :
      wv(DAT_006e47c4, (DAT_006d470c + local_14 * 0x100c));
      return;
    }
    if ((s32((DAT_006d4704 + local_14 * 0x100c), 0) === DAT_00637fac)) {
      uVar1 = FUN_00421bb0();
      w32((DAT_006d4708 + local_14 * 0x100c), 0, uVar1);
      goto LAB_005cdcd6;
    }
    if ((local_8 !== local_14)) {
      local_10 = s32((DAT_006d4708 + local_14 * 0x100c), 0);
      local_c = local_14;
    }
    local_14 = (local_14 + 1);
  } ( true );
}


 export function FUN_005cdcdb (param_1, param_2, param_3)

 {
  let uVar1;
  let local_10;
  let local_c;
  let local_8;

  w32((DAT_006d4700 + param_1 * 0x100c), 0, param_2);
  w32((DAT_006d4704 + param_1 * 0x100c), 0, param_3);
  uVar1 = FUN_00421bb0();
  w32((DAT_006d4708 + param_1 * 0x100c), 0, uVar1);
  local_8 = 0;
  if ((param_2 < param_3)) {
    local_c = 0;
    local_10 = 0;
    while ((local_10 < 0x400)) {
      for (/* cond: (local_10 < 0x400) */); (-1 = (-1 < local_c) && (local_10 = (local_10 < 0x400))); local_10 = (local_10 + 1)) {
        w32((DAT_006d470c + (local_10 * 4 + param_1 * 0x100c)), 0, local_8);
        local_c = (local_c - param_3);
      }
      local_c = (local_c + param_2);
      local_8 = (local_8 + 1);
    }
  }
  else {
    local_c = param_2;
    local_10 = 0;
    while ((local_10 < 0x400)) {
      for (/* cond: (local_10 < 0x400) */); (param_3 = (param_3 <= local_c) && (local_10 = (local_10 < 0x400))); local_10 = (local_10 + 1)) {
        w32((DAT_006d470c + (local_10 * 4 + param_1 * 0x100c)), 0, local_8);
        local_c = (local_c - param_3);
      }
      local_c = (local_c + param_2);
      local_8 = (local_8 + 1);
    }
  }
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* __thiscall */
 /* CString::CString(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function CString (this)

 {
  FUN_005d1b38();
  return this;
}


 export function FUN_005cde4d (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    if ((s32((in_ECX + 0x38), 0) !== 0)) {
      uVar1 = FUN_005dce29(s32((in_ECX + 0x34), 0));
      w32((in_ECX + 0x38), 0, uVar1);
    }
    FUN_005dce96(s32((in_ECX + 0x34), 0));
  }
  return;
}


 export function FUN_005cdea1 (unaff_ESI, unaff_EBX, param_1, param_2, param_3)

 {
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let iVar1;
  let local_58;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005cdf36;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005bd630();
  local_8 = 0;
  iVar1 = extraout_var;
  FUN_005bd65c(param_1, param_2);
  FUN_005c041f(param_3);
  FUN_005cebec(DAT_ffffffa8, 0, 0, param_1, param_2);
  FUN_006e7d90((iVar1 + 0x10), 0, 0, 0, 0);
  local_8 = -1;
  FUN_005cdf2d();
  FUN_005cdf40(unaff_ESI, unaff_EBX, iVar1);
  return;
}


 export function FUN_005cdf2d ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_005cdf40 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005cdf50 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x38), 0) !== 0)) {
    uVar1 = FUN_005dce29(s32((in_ECX + 0x34), 0));
    w32((in_ECX + 0x38), 0, uVar1);
  }
  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    uVar1 = FUN_005dce96(s32((in_ECX + 0x34), 0));
    w32((in_ECX + 0x34), 0, uVar1);
  }
  FUN_005d1b38();
  return;
}


 export function FUN_005cdfb2 ()

 {
  return;
}


 export function FUN_005cdfc2 (in_ECX, param_1)

 {
  let iVar1;
  let puVar2;
  let uVar3;
  let uVar4;
  // in_ECX promoted to parameter;
  let local_c;
  let local_b;
  let local_a;
  let local_9;
  let local_8;

  local_c = 0x53;
  local_b = 0x50;
  local_a = 0x52;
  local_9 = 0x54;
  iVar1 = FUN_005c5540(DAT_fffffff4, param_1);
  if ((iVar1 === 0)) {
    FUN_005d233f(s_Error:_SPRT_resource_not_found_-_00637fb0, param_1);
  }
  else {
    puVar2 = FUN_005c5560(iVar1);
    uVar3 = FUN_005c54d0(s32(puVar2, 0));
    w32((in_ECX + 0x20), 0, uVar3);
    uVar3 = FUN_005c54d0(s32(puVar2, 1));
    w32((in_ECX + 0x24), 0, uVar3);
    FUN_005d1cd0((puVar2 + 2), in_ECX);
    FUN_005d1cd0((puVar2 + 6), (in_ECX + 0x10));
    _MEM[(in_ECX + 0x30)] = _MEM[(puVar2 + 0xa)];
    local_8 = FUN_005d1cb0(s32((puVar2 + 0x29), 0));
    if ((s32((in_ECX + 0x38), 0) !== 0)) {
      FUN_005cf337();
    }
    if ((s32((in_ECX + 0x34), 0) !== 0)) {
      uVar3 = FUN_005dce96(s32((in_ECX + 0x34), 0));
      w32((in_ECX + 0x34), 0, uVar3);
    }
    uVar3 = FUN_005dce4f(local_8);
    w32((in_ECX + 0x34), 0, uVar3);
    uVar3 = FUN_005dcdf9(s32((in_ECX + 0x34), 0));
    FUN_005dced3((puVar2 + 0x2d), uVar3, local_8);
    uVar4 = FUN_00407fc0((in_ECX + 0x10));
    FUN_005cdfb2(uVar3, uVar4);
    FUN_005dce29(s32((in_ECX + 0x34), 0));
    FUN_005c5580(iVar1);
    FUN_005c5520(iVar1);
    FUN_005cf2ff();
  }
  return;
}


 export function FUN_005ce16e (param_1, param_2)

 {
  FUN_005ce19a(param_1, -1, -1, param_2);
  return;
}


 export function FUN_005ce19a (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_14;
  let local_10;
  let local_f;
  let local_e;
  let local_d;
  let local_c;
  let local_8;

  local_10 = 0x53;
  local_f = 0x50;
  local_e = 0x52;
  local_d = 0x54;
  iVar1 = FUN_005c5540(DAT_fffffff0, param_1);
  if ((iVar1 === 0)) {
    FUN_005d233f(s_Error:_SPRT_resource_not_found_-_00637fd4, param_1);
  }
  else {
    iVar2 = FUN_005c5560(iVar1);
    FUN_005dced3(iVar2, (in_ECX + 0x20), 4);
    FUN_005dced3((iVar2 + 4), (in_ECX + 0x24), 4);
    FUN_005dced3((iVar2 + 8), in_ECX, 0x10);
    FUN_005dced3((iVar2 + 0x18), (in_ECX + 0x10), 0x10);
    FUN_005dced3((iVar2 + 0x28), (in_ECX + 0x30), 1);
    FUN_005dced3((iVar2 + 0x29), DAT_fffffff4, 4);
    if ((s32((in_ECX + 0x38), 0) !== 0)) {
      FUN_005cf337();
    }
    if ((s32((in_ECX + 0x34), 0) !== 0)) {
      uVar3 = FUN_005dce96(s32((in_ECX + 0x34), 0));
      w32((in_ECX + 0x34), 0, uVar3);
    }
    uVar3 = FUN_005dce4f(local_c);
    w32((in_ECX + 0x34), 0, uVar3);
    uVar3 = FUN_005dcdf9(s32((in_ECX + 0x34), 0));
    FUN_005dced3((iVar2 + 0x2d), uVar3, local_c);
    FUN_005dce29(s32((in_ECX + 0x34), 0));
    FUN_005dced3((iVar2 + 0x2d), DAT_ffffffec, 4);
    FUN_005dced3((iVar2 + 0x31), DAT_fffffff8, 4);
    if ((param_3 === -1)) {
      FUN_005c6da8(local_14, local_8, (iVar2 + 0x35));
    }
    else {
      FUN_005c6da8(param_2, param_3, (iVar2 + 0x35));
    }
    FUN_005c5580(iVar1);
    FUN_005c5520(iVar1);
    FUN_005cf2ff();
  }
  return;
}


 export function FUN_005ce3a8 (param_1)

 {
  FUN_005ce9ef(param_1);
  return;
}


 export function FUN_005ce3cc (unaff_ESI, unaff_EBX, param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let iVar5;
  let in_stack_ffffff4c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005ce5a1;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar5 = extraout_var;
  local_14 = FUN_005dcef7(s32((extraout_var + 0x34), 0));
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_005ce595();
    FUN_005ce5ab(unaff_ESI, unaff_EBX, iVar5, in_stack_ffffff4c);
    return;
  }
  FUN_00421c60((iVar5 + 0x20), 4);
  FUN_00421c60((iVar5 + 0x24), 4);
  FUN_00421c60(iVar5, 0x10);
  FUN_00421c60((iVar5 + 0x10), 0x10);
  FUN_00421c60((iVar5 + 0x30), 1);
  FUN_00421c60(DAT_ffffffec, 4);
  FUN_005cf2ff();
  FUN_00421c60(s32((iVar5 + 0x38), 0), local_14);
  FUN_005cf337();
  uVar2 = FUN_005dce4f(param_3 * 3);
  uVar3 = FUN_005dcdf9(uVar2);
  uVar4 = FUN_0046f440(uVar3, param_2, param_3);
  FUN_005ded12(uVar4);
  FUN_00421c60(uVar3, param_3 * 3);
  FUN_00421c30();
  uVar3 = FUN_005dce29(uVar2);
  FUN_005dce96(uVar2);
  local_8 = -1;
  FUN_005ce595();
  FUN_005ce5ab(unaff_ESI, unaff_EBX, iVar5, uVar3);
  return;
}


 export function FUN_005ce595 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005ce5ab (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005ce5bb (in_ECX, unaff_ESI, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005ce709;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  local_14 = FUN_005dcef7(s32((in_ECX + 0x34), 0));
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_005ce6fd();
    FUN_005ce713(unaff_ESI);
    return;
  }
  FUN_00421c60((in_ECX + 0x20), 4);
  FUN_00421c60((in_ECX + 0x24), 4);
  FUN_00421c60(in_ECX, 0x10);
  FUN_00421c60((in_ECX + 0x10), 0x10);
  FUN_00421c60((in_ECX + 0x30), 1);
  FUN_00421c60(DAT_ffffffec, 4);
  FUN_005cf2ff();
  FUN_00421c60(s32((in_ECX + 0x38), 0), local_14);
  FUN_005cf337();
  FUN_00421c30();
  local_8 = -1;
  FUN_005ce6fd();
  FUN_005ce713(unaff_ESI);
  return;
}


 export function FUN_005ce6fd ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005ce713 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005ce723 (param_1, param_2)

 {
  FUN_005ce74f(param_1, -1, -1, param_2);
  return;
}


 export function FUN_005ce74f (unaff_ESI, unaff_EBX, param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  // unaff_EBX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let extraout_var;
  let iVar5;
  let in_stack_ffffff40;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005ce9d5;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar5 = extraout_var;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_005ce9c9();
    FUN_005ce9df(unaff_ESI, unaff_EBX, iVar5, in_stack_ffffff40);
    return;
  }
  FUN_004bb370((iVar5 + 0x20), 4);
  FUN_004bb370((iVar5 + 0x24), 4);
  FUN_004bb370(iVar5, 0x10);
  FUN_004bb370((iVar5 + 0x10), 0x10);
  FUN_004bb370((iVar5 + 0x30), 1);
  FUN_004bb370(DAT_ffffffe8, 4);
  if ((s32((iVar5 + 0x38), 0) !== 0)) {
    FUN_005cf337();
  }
  if ((s32((iVar5 + 0x34), 0) !== 0)) {
    uVar2 = FUN_005dce96(s32((iVar5 + 0x34), 0));
    w32((iVar5 + 0x34), 0, uVar2);
  }
  uVar2 = FUN_005dce4f(local_18);
  w32((iVar5 + 0x34), 0, uVar2);
  uVar2 = FUN_005dcdf9(s32((iVar5 + 0x34), 0));
  FUN_004bb370(uVar2, local_18);
  uVar2 = FUN_005dce29(s32((iVar5 + 0x34), 0));
  FUN_004bb370(DAT_ffffffe4, 4);
  FUN_004bb370(DAT_ffffffec, 4);
  uVar3 = FUN_005dce4f(local_14 * 3);
  uVar4 = FUN_005dcdf9(uVar3);
  FUN_004bb370(uVar4, param_3 * 3);
  if ((param_3 === -1)) {
    FUN_005c6da8(local_1c, local_14, uVar4);
  }
  else {
    FUN_005c6da8(param_2, param_3, uVar4);
  }
  FUN_005dce29(uVar3);
  FUN_005dce96(uVar3);
  FUN_00421c30();
  FUN_005cf2ff();
  local_8 = -1;
  FUN_005ce9c9();
  FUN_005ce9df(unaff_ESI, unaff_EBX, iVar5, uVar2);
  return;
}


 export function FUN_005ce9c9 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005ce9df (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005ce9ef (in_ECX, unaff_ESI, param_1)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_005ceb9a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_005ceb8e();
    FUN_005ceba4(unaff_ESI);
    return;
  }
  FUN_004bb370((in_ECX + 0x20), 4);
  FUN_004bb370((in_ECX + 0x24), 4);
  FUN_004bb370(in_ECX, 0x10);
  FUN_004bb370((in_ECX + 0x10), 0x10);
  FUN_004bb370((in_ECX + 0x30), 1);
  FUN_004bb370(DAT_ffffffec, 4);
  if ((s32((in_ECX + 0x38), 0) !== 0)) {
    FUN_005cf337();
  }
  if ((s32((in_ECX + 0x34), 0) !== 0)) {
    uVar2 = FUN_005dce96(s32((in_ECX + 0x34), 0));
    w32((in_ECX + 0x34), 0, uVar2);
  }
  uVar2 = FUN_005dce4f(local_14);
  w32((in_ECX + 0x34), 0, uVar2);
  uVar2 = FUN_005dcdf9(s32((in_ECX + 0x34), 0));
  FUN_004bb370(uVar2, local_14);
  FUN_005dce29(s32((in_ECX + 0x34), 0));
  FUN_005cf2ff();
  local_8 = -1;
  FUN_005ceb8e();
  FUN_005ceba4(unaff_ESI);
  return;
}


 export function FUN_005ceb8e ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_005ceba4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_005cebb4 (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005cf64c(param_1, -1, param_2);
  w32((in_ECX + 0x34), 0, uVar1);
  FUN_005cf2ff();
  return;
}


 export function FUN_005cebec (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_14;

  FUN_006e7d90(DAT_ffffffec, param_2, param_3, (param_2 + param_4), (param_5 + param_3));
  uVar1 = FUN_005cf64c(param_1, -1, DAT_ffffffec);
  w32((in_ECX + 0x34), 0, uVar1);
  FUN_005cf2ff();
  return;
}


 export function FUN_005cec44 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005cf64c(param_1, param_2, param_3);
  w32((in_ECX + 0x34), 0, uVar1);
  FUN_005cf2ff();
  return;
}


 export function FUN_005cec80 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let pcVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  pcVar1 = FUN_005c19d3(param_4, param_5);
  local_1c = param_4;
  for (/* cond: (_MEM[local_8] !== param_3) */); local_8 = _MEM[local_8]; local_8 = (local_8 + 1)) {
    local_1c = (local_1c + 1);
  }
  local_10 = (local_1c + -1);
  local_1c = param_4;
  for (/* cond: (_MEM[local_8] !== param_3) */); local_8 = _MEM[local_8]; local_8 = (local_8 + -1)) {
    local_1c = (local_1c + -1);
  }
  local_18 = (local_1c + 1);
  local_1c = param_5;
  for (/* cond: (_MEM[local_8] !== param_3) */); local_8 = _MEM[local_8]; local_8 = (local_8 + iVar2)) {
    iVar2 = FUN_005c55d0();
    local_1c = (local_1c + 1);
  }
  local_c = (local_1c + -1);
  local_1c = param_5;
  for (/* cond: (_MEM[local_8] !== param_3) */); local_8 = _MEM[local_8]; local_8 = (local_8 + (-iVar2))) {
    iVar2 = FUN_005c55d0();
    local_1c = (local_1c + -1);
  }
  local_14 = (local_1c + 1);
  uVar3 = FUN_005cf64c(param_1, param_2, DAT_ffffffe8);
  w32((in_ECX + 0x34), 0, uVar3);
  FUN_005cf2ff();
  return;
}


 export function FUN_005cedad (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_14;

  FUN_006e7d90(DAT_ffffffec, param_3, param_4, (param_5 + param_3), (param_6 + param_4));
  uVar1 = FUN_005cf64c(param_1, param_2, DAT_ffffffec);
  w32((in_ECX + 0x34), 0, uVar1);
  FUN_005cf2ff();
  return;
}


 export function FUN_005cee09 (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005cfdeb(param_1, -1, param_2);
  w32((in_ECX + 0x34), 0, uVar1);
  FUN_005cf2ff();
  return;
}


 export function FUN_005cee41 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_14;

  FUN_006e7d90(DAT_ffffffec, param_2, param_3, (param_4 + param_2), (param_5 + param_3));
  uVar1 = FUN_005cfdeb(param_1, -1, DAT_ffffffec);
  w32((in_ECX + 0x34), 0, uVar1);
  FUN_005cf2ff();
  return;
}


 export function FUN_005cee99 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_005cfdeb(param_1, param_2, param_3);
  w32((in_ECX + 0x34), 0, uVar1);
  FUN_005cf2ff();
  return;
}


 export function FUN_005ceed5 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_14;

  FUN_006e7d90(DAT_ffffffec, param_3, param_4, (param_5 + param_3), (param_6 + param_4));
  uVar1 = FUN_005cfdeb(param_1, param_2, DAT_ffffffec);
  w32((in_ECX + 0x34), 0, uVar1);
  FUN_005cf2ff();
  return;
}


 export function FUN_005cef31 (param_1, param_2, param_3, param_4)

 {
  FUN_005d056c(param_1, param_2, -1, param_3, param_4);
  return param_1;
}


 export function FUN_005cef66 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005d056c(param_1, param_2, param_3, param_4, param_5);
  return param_1;
}


 export function FUN_005cef9f (param_1, param_2, param_3, param_4)

 {
  FUN_005d080d(param_1, param_2, -1, param_3, param_4);
  return param_1;
}


 export function FUN_005cefd4 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005d080d(param_1, param_2, param_3, param_4, param_5);
  return param_1;
}


 export function FUN_005cf00d (param_1, param_2, param_3, param_4)

 {
  FUN_005d0aac(param_1, param_2, -1, param_3, param_4);
  return param_1;
}


 export function FUN_005cf042 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005d0aac(param_1, param_2, param_3, param_4, param_5);
  return param_1;
}


 export function FUN_005cf07b (param_1, param_2, param_3, param_4)

 {
  FUN_005d0dbf(param_1, param_2, -1, param_3, param_4);
  return param_1;
}


 export function FUN_005cf0b0 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005d0dbf(param_1, param_2, param_3, param_4, param_5);
  return param_1;
}


 export function FUN_005cf0e9 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_005d10cd(param_1, param_2, param_3, param_4, param_5, param_6);
  return param_1;
}


 export function FUN_005cf126 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005d10cd(param_1, param_2, -1, param_3, param_4, param_5);
  return param_1;
}


 export function FUN_005cf15f (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_005d1372(param_1, param_2, param_3, param_4, param_5, param_6);
  return param_1;
}


 export function FUN_005cf19c (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_005d1372(param_1, param_2, -1, param_3, param_4, param_5);
  return param_1;
}


 export function FUN_005cf1d5 (param_1, param_2, param_3, param_4)

 {
  FUN_005d056c(param_1, param_2, -2, param_3, param_4);
  return param_1;
}


 export function FUN_005cf20a (param_1, param_2, param_3, param_4)

 {
  FUN_005d080d(param_1, param_2, -2, param_3, param_4);
  return param_1;
}


 export function FUN_005cf23f (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d1612(in_ECX, param_1, 0, 0, 0);
  return;
}


 export function FUN_005cf26d (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005d1612(in_ECX, param_1, 0, param_2, param_3);
  return;
}


 export function FUN_005cf29f (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d1612(in_ECX, param_1, 1, 0, 0);
  return;
}


 export function FUN_005cf2cd (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  FUN_005d1612(in_ECX, param_1, 1, param_2, param_3);
  return;
}


 export function FUN_005cf2ff (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x38), 0) === 0)) {
    uVar1 = FUN_005dcdf9(s32((in_ECX + 0x34), 0));
    w32((in_ECX + 0x38), 0, uVar1);
  }
  return;
}


 export function FUN_005cf337 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x38), 0) !== 0)) {
    uVar1 = FUN_005dce29(s32((in_ECX + 0x34), 0));
    w32((in_ECX + 0x38), 0, uVar1);
  }
  return;
}


 export function FUN_005cf36f (in_ECX)

 {
  // in_ECX promoted to parameter;

  return (s32((in_ECX + 0x38), 0) !== 0);
}


 export function FUN_005cf39b (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x20), 0, param_1);
  w32((in_ECX + 0x24), 0, param_2);
  return;
}


 export function FUN_005cf3c5 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32(param_1, 0, s32((in_ECX + 0x20), 0));
  w32(param_2, 0, s32((in_ECX + 0x24), 0));
  return;
}


 export function FUN_005cf3f3 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  if ((param_1 < 2)) {
    param_1 = 1;
  }
  w32((in_ECX + 0x28), 0, param_1);
  if ((param_2 < 2)) {
    param_2 = 1;
  }
  w32((in_ECX + 0x2c), 0, param_2);
  return;
}


 export function FUN_005cf439 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  w32(param_1, 0, s32((in_ECX + 0x28), 0));
  w32(param_2, 0, s32((in_ECX + 0x2c), 0));
  return;
}


 export function FUN_005cf467 (in_ECX, param_1, param_2)

 {
  let iVar1;
  let piVar2;
  let cVar3;
  // in_ECX promoted to parameter;
  let local_14;
  let local_c;
  let local_8;

  cVar3 = FUN_005cf36f();
  if ((cVar3 === 0)) {
    FUN_005cf2ff();
    FUN_005d225b(s_Warning:_Sprite_not_locked_in_Ch_00637ff8);
  }
  local_8 = FUN_00407fc0((in_ECX + 0x10));
  local_14 = s32((in_ECX + 0x38), 0);
  while ((local_8 !== 0)) {
    piVar2 = (local_14 + 4);
    local_14 = (local_14 + 8);
    local_c = s32(piVar2, 0);
    while ((local_c !== 0)) {
      if ((_MEM[local_14] === param_1)) {
        _MEM[local_14] = param_2;
      }
      local_14 = (local_14 + 1);
      local_c = (local_c + -1);
    }
  }
  if ((cVar3 === 0)) {
    FUN_005cf337();
  }
  return;
}


 export function FUN_005cf541 (in_ECX, param_1, param_2)

 {
  let iVar1;
  let pbVar2;
  let cVar3;
  // in_ECX promoted to parameter;
  let local_14;
  let local_c;
  let local_8;

  cVar3 = FUN_005cf36f();
  if ((cVar3 === 0)) {
    FUN_005cf2ff();
    FUN_005d225b(s_Warning:_Sprite_not_locked_in_Ch_00638024);
  }
  local_8 = FUN_00407fc0((in_ECX + 0x10));
  local_14 = s32((in_ECX + 0x38), 0);
  while ((local_8 !== 0)) {
    pbVar2 = (local_14 + 4);
    local_14 = (local_14 + 8);
    local_c = s32(pbVar2, 0);
    while ((local_c !== 0)) {
      if ((-1 < (u8(_MEM[local_14]) - param_2))) {
        _MEM[local_14] = _MEM[((u8(_MEM[local_14]) - param_2) + param_1)];
      }
      local_14 = (local_14 + 1);
      local_c = (local_c + -1);
    }
  }
  if ((-1 < (u8(_MEM[(in_ECX + 0x30)]) - param_2))) {
    _MEM[(in_ECX + 0x30)] = _MEM[((u8(_MEM[(in_ECX + 0x30)]) - param_2) + param_1)];
  }
  if ((cVar3 === 0)) {
    FUN_005cf337();
  }
  return;
}


 export function FUN_005cf64c (in_ECX, param_1, param_2, param_3)

 {
  let cVar1;
  let iVar2;
  let iVar3;
  let LVar4;
  // in_ECX promoted to parameter;
  let local_64;
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
  let local_10;
  let local_c;
  let local_8;

  local_34 = 1;
  local_48 = 1;
  FUN_006e7d90(DAT_ffffff9c, s32(param_3, 0), s32(param_3, 1), s32(param_3, 2), s32(param_3, 3));
  FUN_006e7d48(DAT_ffffff9c, DAT_ffffff9c, (param_1 + 0x14));
  local_1c = 0x2710;
  local_14 = 0;
  local_c = 0;
  local_24 = (UNNAMED - UNNAMED);
  local_50 = (UNNAMED - UNNAMED);
  cVar1 = FUN_005c54f0();
  if ((cVar1 === 0)) {
    FUN_005d225b(s_Warning:_Port_not_locked_on_Spri_00638050);
    local_34 = 0;
    FUN_005c01c1();
  }
  local_2c = FUN_005c19d3(UNNAMED, UNNAMED);
  if ((local_2c === 0)) {
    FUN_005d22b7(s_Error:_Sprite_Extract_Illegal_Pi_0063807c, UNNAMED, UNNAMED);
    if ((local_34 === 0)) {
      FUN_005c02e0();
    }
    local_30 = 0;
  }
  else {
    if ((param_2 === -1)) {
      local_40 = _MEM[local_2c];
    }
    else if ((param_2 !== -2)) {
      local_40 = ((param_2) & 0xFF);
    }
    local_44 = 0;
    while ((local_44 < local_50)) {
      local_54 = local_2c;
      for (/* cond: (local_3c < local_24) */); local_3c = (local_3c < local_24); local_3c = (local_3c + 1)) {
        if ((param_2 === -2)) {
          local_18 = local_44;
          local_54 = (local_54 + 1);
          local_2c = FUN_005c5710(local_2c);
          local_44 = local_50;
          local_48 = 0;
          break;
        }
        local_54 = (local_54 + 1);
      }
      local_44 = (local_44 + 1);
      local_2c = FUN_005c5610(local_2c);
    }
    if ((local_48 === 0)) {
      local_28 = FUN_005c19d3(UNNAMED, (UNNAMED + (local_50 + -1)));
      local_44 = 0;
      while ((local_44 < local_50)) {
        local_54 = local_28;
        for (/* cond: (local_3c < local_24) */); local_3c = (local_3c < local_24); local_3c = (local_3c + 1)) {
          if ((param_2 === -2)) {
            local_10 = (local_50 - local_44);
            local_44 = local_50;
            local_54 = (local_54 + 1);
            break;
          }
          local_54 = (local_54 + 1);
        }
        local_44 = (local_44 + 1);
        local_28 = FUN_005c5710(local_28);
      }
      local_8 = operator_new(0xa00);
      local_20 = operator_new(0xa00);
      local_38 = operator_new(0xa00);
      if ((local_38 === 0)) {
        FUN_005d225b(s_Error:_Unable_to_allocate_scan_l_006380b0);
        local_30 = 0;
      }
      else {
        local_44 = 0;
        while ((local_44 < (local_10 - local_18))) {
          local_c = (local_c + 8);
          w32((local_20 + local_44 * 4), 0, 0);
          w32((local_38 + local_44 * 4), 0, 0);
          local_54 = local_2c;
          for (/* cond: (local_3c < local_24) */); local_3c = (local_3c < local_24); local_3c = (local_3c + 1)) {
            if ((param_2 === -2)) {
              w32((local_8 + local_44 * 4), 0, local_54);
              w32((local_20 + local_44 * 4), 0, local_3c);
              break;
            }
            local_54 = (local_54 + 1);
          }
          if ((s32((local_20 + local_44 * 4), 0) < local_1c)) {
            local_1c = s32((local_20 + local_44 * 4), 0);
          }
          local_54 = (local_2c + local_24);
          for (/* cond: (local_3c < local_24) */); local_54 = (local_54 + -1), local_3c = (local_3c < local_24); local_3c = (local_3c + 1))
          {
            if ((param_2 === -2)) {
              w32((local_38 + local_44 * 4), 0, ((local_24 - local_3c) - s32((local_20 + local_44 * 4), 0)));
              local_c = (local_c + s32((local_38 + local_44 * 4), 0));
              break;
            }
          }
          if ((local_14 < (s32((local_38 + local_44 * 4), 0) + s32((local_20 + local_44 * 4), 0)))) {
            local_14 = (s32((local_38 + local_44 * 4), 0) + s32((local_20 + local_44 * 4), 0));
          }
          local_44 = (local_44 + 1);
          local_2c = FUN_005c5610(local_2c);
        }
        if ((s32(DAT_00000008, 0) !== 0)) {
          FUN_005cf337();
        }
        if ((s32(DAT_00000004, 0) !== 0)) {
          LVar4 = FUN_005dce96(s32(DAT_00000004, 0));
          w32(DAT_00000004, 0, LVar4);
        }
        local_c = (local_c + 8);
        local_30 = FUN_005dce4f(local_c);
        if ((local_30 === 0)) {
          FUN_005d2279(s_Error:_Couldn't_allocate_memory_f_006380ec, local_c);
          if ((local_34 === 0)) {
            FUN_005c02e0();
          }
          operator_delete(local_8);
          operator_delete(local_20);
          operator_delete(local_38);
        }
        else {
          FUN_006e7d90((in_ECX + 1), local_1c, local_18, local_14, local_10);
          iVar2 = FUN_00407fc0(DAT_ffffff9c);
          iVar3 = FUN_00407f90(DAT_ffffff9c);
          FUN_006e7d90(in_ECX, 0, 0, iVar3, iVar2);
          if ((param_2 === -2)) {
            _MEM[DAT_00000000] = 0;
          }
          else {
            _MEM[DAT_00000000] = local_40;
          }
          w32(DAT_00000000, 0, 0);
          w32(DAT_00000004, 0, 0);
          local_4c = FUN_005dcdf9(local_30);
          for (/* cond: (local_44 < (local_10 - local_18)) */); local_44 = (local_44 < (local_10 - local_18)); local_44 = (local_44 + 1)) {
            w32(local_4c, 0, s32((local_20 + local_44 * 4), 0));
            w32(local_4c, 1, s32((local_38 + local_44 * 4), 0));
            local_4c = (local_4c + 2);
            FUN_005dced3(s32((local_8 + local_44 * 4), 0), local_4c, s32((local_38 + local_44 * 4), 0));
            local_4c = (local_4c + s32((local_38 + local_44 * 4), 0));
          }
          w32(local_4c, 0, 0);
          local_4c = FUN_005dce29(local_30);
          if ((local_34 === 0)) {
            FUN_005c02e0();
          }
          operator_delete(local_8);
          operator_delete(local_20);
          operator_delete(local_38);
        }
      }
    }
    else {
      FUN_006e7d90((in_ECX + 1), 0, 0, 0, 0);
      iVar2 = FUN_00407fc0(DAT_ffffff9c);
      iVar3 = FUN_00407f90(DAT_ffffff9c);
      FUN_006e7d90(in_ECX, 0, 0, iVar3, iVar2);
      if ((param_2 === -2)) {
        _MEM[DAT_00000000] = 0;
      }
      else {
        _MEM[DAT_00000000] = local_40;
      }
      w32(DAT_00000000, 0, 0);
      w32(DAT_00000004, 0, 0);
      if ((local_34 === 0)) {
        FUN_005c02e0();
      }
      w32(DAT_00000008, 0, 0);
      local_30 = 0;
    }
  }
  return local_30;
}


 export function FUN_005cfdeb (in_ECX, param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let LVar3;
  // in_ECX promoted to parameter;
  let local_68;
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
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  local_8 = FUN_005e6188();
  if ((local_8 === 0)) {
    local_34 = 0;
  }
  else {
    local_38 = 1;
    local_4c = 1;
    FUN_006e7d90(DAT_ffffff98, s32(param_3, 0), s32(param_3, 1), s32(param_3, 2), s32(param_3, 3));
    FUN_006e7d48(DAT_ffffff98, DAT_ffffff98, (param_1 + 0x10));
    local_20 = 0x2710;
    local_18 = 0;
    local_10 = 0;
    local_28 = (UNNAMED - UNNAMED);
    local_54 = (UNNAMED - UNNAMED);
    local_30 = FUN_005e7028(UNNAMED, UNNAMED, local_8);
    if ((local_30 === 0)) {
      FUN_005d22b7(s_Error:_Sprite_Extract_Illegal_Pi_00638124, UNNAMED, UNNAMED);
      param_1 = ~_Timevec(param_1);
      local_34 = 0;
    }
    else {
      if ((param_2 === -1)) {
        local_44 = _MEM[local_30];
      }
      else if ((param_2 !== -2)) {
        local_44 = ((param_2) & 0xFF);
      }
      local_48 = 0;
      while ((local_48 < local_54)) {
        local_58 = local_30;
        for (/* cond: (local_40 < local_28) */); local_40 = (local_40 < local_28); local_40 = (local_40 + 1)) {
          if ((param_2 === -2)) {
            local_1c = local_48;
            local_58 = (local_58 + 1);
            local_30 = FUN_005d1f20(local_30);
            local_48 = local_54;
            local_4c = 0;
            break;
          }
          local_58 = (local_58 + 1);
        }
        local_48 = (local_48 + 1);
        local_30 = FUN_005d1ef0(local_30);
      }
      if ((local_4c === 0)) {
        local_2c = FUN_005e7028(UNNAMED, (UNNAMED + (local_54 + -1)), local_8);
        local_48 = 0;
        while ((local_48 < local_54)) {
          local_58 = local_2c;
          for (/* cond: (local_40 < local_28) */); local_40 = (local_40 < local_28); local_40 = (local_40 + 1)) {
            if ((param_2 === -2)) {
              local_14 = (local_54 - local_48);
              local_48 = local_54;
              local_58 = (local_58 + 1);
              break;
            }
            local_58 = (local_58 + 1);
          }
          local_48 = (local_48 + 1);
          local_2c = FUN_005d1f20(local_2c);
        }
        local_c = operator_new(0xa00);
        local_24 = operator_new(0xa00);
        local_3c = operator_new(0xa00);
        if ((local_3c === 0)) {
          FUN_005d225b(s_Error:_Unable_to_allocate_scan_l_00638158);
          param_1 = ~_Timevec(param_1);
          local_34 = 0;
        }
        else {
          local_48 = 0;
          while ((local_48 < (local_14 - local_1c))) {
            local_10 = (local_10 + 8);
            w32((local_24 + local_48 * 4), 0, 0);
            w32((local_3c + local_48 * 4), 0, 0);
            local_58 = local_30;
            for (/* cond: (local_40 < local_28) */); local_40 = (local_40 < local_28); local_40 = (local_40 + 1)) {
              if ((param_2 === -2)) {
                w32((local_c + local_48 * 4), 0, local_58);
                w32((local_24 + local_48 * 4), 0, local_40);
                break;
              }
              local_58 = (local_58 + 1);
            }
            if ((s32((local_24 + local_48 * 4), 0) < local_20)) {
              local_20 = s32((local_24 + local_48 * 4), 0);
            }
            local_58 = (local_30 + local_28);
            for (/* cond: (local_40 < local_28) */); local_58 = (local_58 + -1), local_40 = (local_40 < local_28);
                local_40 = (local_40 + 1)) {
              if ((param_2 === -2)) {
                w32((local_3c + local_48 * 4), 0, ((local_28 - local_40) - s32((local_24 + local_48 * 4), 0)));
                local_10 = (local_10 + s32((local_3c + local_48 * 4), 0));
                break;
              }
            }
            if ((local_18 < (s32((local_3c + local_48 * 4), 0) + s32((local_24 + local_48 * 4), 0)))) {
              local_18 = (s32((local_3c + local_48 * 4), 0) + s32((local_24 + local_48 * 4), 0));
            }
            local_48 = (local_48 + 1);
            local_30 = FUN_005d1ef0(local_30);
          }
          if ((s32(DAT_00000008, 0) !== 0)) {
            FUN_005cf337();
          }
          if ((s32(DAT_00000004, 0) !== 0)) {
            LVar3 = FUN_005dce96(s32(DAT_00000004, 0));
            w32(DAT_00000004, 0, LVar3);
          }
          local_10 = (local_10 + 8);
          local_34 = FUN_005dce4f(local_10);
          if ((local_34 === 0)) {
            FUN_005d2279(s_Error:_Couldn't_allocate_memory_f_00638194, local_10);
            param_1 = ~_Timevec(param_1);
            operator_delete(local_c);
            operator_delete(local_24);
            operator_delete(local_3c);
          }
          else {
            FUN_006e7d90((in_ECX + 1), local_20, local_1c, local_18, local_14);
            iVar1 = FUN_00407fc0(DAT_ffffff98);
            iVar2 = FUN_00407f90(DAT_ffffff98);
            FUN_006e7d90(in_ECX, 0, 0, iVar2, iVar1);
            if ((param_2 === -2)) {
              _MEM[DAT_00000000] = 0;
            }
            else {
              _MEM[DAT_00000000] = local_44;
            }
            w32(DAT_00000000, 0, 0);
            w32(DAT_00000004, 0, 0);
            local_50 = FUN_005dcdf9(local_34);
            for (/* cond: (local_48 < (local_14 - local_1c)) */); local_48 = (local_48 < (local_14 - local_1c)); local_48 = (local_48 + 1)) {
              w32(local_50, 0, s32((local_24 + local_48 * 4), 0));
              w32(local_50, 1, s32((local_3c + local_48 * 4), 0));
              local_50 = (local_50 + 2);
              FUN_005dced3(s32((local_c + local_48 * 4), 0), local_50, s32((local_3c + local_48 * 4), 0));
              local_50 = (local_50 + s32((local_3c + local_48 * 4), 0));
            }
            w32(local_50, 0, 0);
            local_50 = FUN_005dce29(local_34);
            operator_delete(local_c);
            operator_delete(local_24);
            operator_delete(local_3c);
            param_1 = ~_Timevec(param_1);
          }
        }
      }
      else {
        FUN_006e7d90((in_ECX + 1), 0, 0, 0, 0);
        iVar1 = FUN_00407fc0(DAT_ffffff98);
        iVar2 = FUN_00407f90(DAT_ffffff98);
        FUN_006e7d90(in_ECX, 0, 0, iVar2, iVar1);
        if ((param_2 === -2)) {
          _MEM[DAT_00000000] = 0;
        }
        else {
          _MEM[DAT_00000000] = local_44;
        }
        w32(DAT_00000000, 0, 0);
        w32(DAT_00000004, 0, 0);
        param_1 = ~_Timevec(param_1);
        w32(DAT_00000008, 0, 0);
        local_34 = 0;
      }
    }
  }
  return local_34;
}
