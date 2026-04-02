// Block 0x00490000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 124

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_004904c0 (param_1, param_2, param_3, param_4)

 {
  FUN_0051d564(param_1, param_2, 0, param_3, param_4);
  return;
}


 export function FUN_00490500 (param_1, param_2, param_3)

 {
  FUN_004a6cc5(param_1, param_2, 0, param_3);
  return;
}


 export function FUN_00490530 (param_1, param_2, param_3)

 {
  FUN_004a6e39(param_1, param_2, 0, param_3);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* int */  /* __thiscall */
 /* CSplitterWnd::IsTracking(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function IsTracking (this)

 {
  return s32((this + 0x159c), 0);
}


 export function FUN_00490590 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0xdcc), 0) <= s32((in_ECX + 0x120), 0))) {
    w32((in_ECX + 0x120), 0, 0);
  }
  w32((in_ECX + 0x1b34), 0, s32((in_ECX + 0xdcc), 0));
  w32((in_ECX + 0x1f38), 0, s32((in_ECX + 0x120), 0));
  w32((in_ECX + 0x1f3c), 0, s32((in_ECX + 0x120), 0));
  while (((DAT_006a85a4 % 9) !== 0)) {
    w32((in_ECX + 0x1f3c), 0, (s32((in_ECX + 0x1f3c), 0) + -1));
  }
  for (/* cond: (local_8 < s32((in_ECX + 0xdcc), 0)) */); local_8 = (local_8 < s32((in_ECX + 0xdcc), 0)); local_8 = (local_8 + 1)) {
    w32(((in_ECX + 0x1b38) + local_8 * 4), 0, s32(((in_ECX + 0xe54) + local_8 * 4), 0));
  }
  FUN_0040fd40(0, (s32((in_ECX + 0x1b34), 0) / 9 | 0));
  FUN_0040fcf0((s32((in_ECX + 0x1f3c), 0) / 9 | 0));
  if ((s32((in_ECX + 0x1b34), 0) < 1)) {
    w32((in_ECX + 0x1f3c), 0, -1);
  }
  FUN_00451bf0();
  FUN_004923c0();
  FUN_004518d0();
  FUN_004f6646();
  return;
}


 export function FUN_004906fd (in_ECX)

 {
  let cVar1;
  let extraout_EAX;
  let iVar2;
  let uVar3;
  let extraout_EAX_00;
  let extraout_EAX_01;
  let extraout_EAX_02;
  let extraout_EAX_03;
  let _Format;
  // in_ECX promoted to parameter;
  let iVar4;
  let local_2a0;
  let local_290;
  let local_280;
  let local_270;
  let local_260;
  let local_250;
  let local_240;
  let local_230;
  let local_220;
  let local_210;
  let local_200;
  let local_1f0;
  let local_1e0;
  let local_1d0;
  let local_1c0;
  let local_c0;
  let local_bc;
  let local_94;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;
  let local_80;
  let local_7c;
  let local_78;
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
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_8;

  FUN_005c00ce(DAT_ffffffe8);
  FUN_005c0073((in_ECX + 0x5f8));
  FUN_00451bf0();
  FUN_004f6564((in_ECX + 0x5f8), 2);
  local_8 = DAT_0067a798;
  local_58 = s32((in_ECX + 0x5f8), 0);
  local_44 = 0xa;
  local_54 = FUN_00407f90((in_ECX + 0x5f8));
  local_78 = (local_54 / 2 | 0);
  local_1c = FUN_00407fc0((in_ECX + 0x5f8));
  local_1c = (local_1c / 0xc | 0);
  local_80 = FUN_0040ef70();
  local_5c = (s32((in_ECX + 0x5fc), 0) + 8);
  local_7c = s32(((in_ECX + 0xe54) + s32((in_ECX + 0x120), 0) * 4), 0);
  FUN_005cda06(DAT_ffffffe0, DAT_ffffffdc);
  FUN_005cd775(local_20 * 2, local_24);
  local_64 = FUN_00451860();
  local_48 = FUN_00451830();
  local_58 = (local_58 + local_44);
  local_5c = (local_5c + ((local_1c / 2 | 0) - (local_64 / 2 | 0)));
  local_70 = (local_7c % 0xb);
  local_6c = (local_48 * 2 + DAT_0062d858 * 2);
  FUN_005cef31(DAT_fffffe30, DAT_006a6668, local_58, local_5c);
  if ((local_7c < 0xb)) {
    if ((local_7c === 3)) {
      FUN_005cef31(DAT_fffffe20, DAT_006a6668, local_58, local_5c);
    }
    else if ((local_7c === 4)) {
      FUN_005cef31(DAT_fffffe10, DAT_006a6668, local_58, local_5c);
    }
    else if ((local_7c === 5)) {
      FUN_005cef31(DAT_fffffe00, DAT_006a6668, local_58, local_5c);
    }
  }
  else {
    local_4c = u8((0x15 < local_7c));
    /* switch */ () {
    case 0xd :
    case 0x18 :
      FUN_005cef31(DAT_fffffdf0, DAT_006a6668, local_58, local_5c);
      goto LAB_00490a7d;
    case 0xe :
    case 0x19 :
      FUN_005cef31(DAT_fffffde0, DAT_006a6668, local_58, local_5c);
      break;
    case 0xf :
    case 0x1a :
      FUN_005cef31(DAT_fffffdd0, DAT_006a6668, local_58, local_5c);
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
    FUN_005cef31(DAT_fffffdc0, DAT_006a6668, local_58, local_5c);
  }
 LAB_00490a7d: :
  FUN_005cd775(local_20, local_24);
  local_3c = DAT_00635a1c;
  FUN_005c19ad(DAT_00635a1c);
  local_58 = (s32((in_ECX + 0x5f8), 0) + local_44);
  local_40 = FUN_00407f90((in_ECX + 0x5f8));
  local_40 = (local_40 / 2 | 0);
  local_50 = (local_40 + -100);
  if ((0xa < local_7c)) {
    local_58 = (local_58 + (local_6c + 0x1e));
    local_5c = (local_5c + local_80);
    FUN_0040bbb0();
    FUN_0040bc10(0x295);
    FUN_0040fe40();
    FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
    iVar2 = FUN_0040efd0(DAT_00679640);
    local_58 = (local_58 + (iVar2 + 0xa));
    FUN_0040bbb0();
    uVar3 = FUN_00491d61(local_70);
    uVar3 = FUN_004f8a9b(DAT_006a7d58, uVar3);
    FUN_005f22d0(DAT_00679640, uVar3);
    local_38 = FUN_0040efd0(DAT_00679640);
    local_8 = ~_Timevec(local_8);
    FUN_006e7d90(DAT_ffffffcc, local_58, local_5c, ((local_58 + local_38) + 5), (local_5c + extraout_EAX));
    FUN_00452c14(local_70, local_58, local_5c, 4, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
    local_5c = (local_5c + ((local_64 * 2 + 0xa) - local_80));
  }
  else {
    local_60 = (local_5c + (local_64 * 2 + 0xa));
    local_5c = local_60;
    FUN_0040bbb0();
    FUN_0040bc10(0x293);
    FUN_0040fe40();
    FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
    FUN_0040bbb0();
    _sprintf(DAT_00679640, DAT_0062c944, s8(DAT_00627cc8[local_7c * 0x18]));
    FUN_005c0f57(local_8, DAT_00679640, local_50, local_5c, 5);
    local_58 = (s32((in_ECX + 0x5f8), 0) + local_44);
    local_5c = (local_5c + local_80);
    FUN_0040bbb0();
    FUN_0040bc10(0x294);
    FUN_0040fe40();
    FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
    FUN_0040bbb0();
    if ((DAT_00627cc9[local_7c * 0x18] === 6)) {
      FUN_005f22d0(DAT_00679640, s_+200%_0062c948);
    }
    else if ((DAT_00627cc9[local_7c * 0x18] === 3)) {
      FUN_005f22d0(DAT_00679640, DAT_0062c950);
    }
    else if ((DAT_00627cc9[local_7c * 0x18] === 4)) {
      FUN_005f22d0(DAT_00679640, s_+100%_0062c958);
    }
    else if ((DAT_00627cc9[local_7c * 0x18] === 5)) {
      FUN_005f22d0(DAT_00679640, s_+150%_0062c960);
    }
    else {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb08), 0));
      FUN_0040bbe0(uVar3);
    }
    FUN_005c0f57(local_8, DAT_00679640, local_50, local_5c, 5);
  }
  local_58 = (s32((in_ECX + 0x5f8), 0) + local_44);
  local_5c = (local_5c + local_80);
  FUN_0040bbb0();
  FUN_0040bc10(0x40);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_0062c968, s8(DAT_00627cca[local_7c * 0x18]));
  FUN_005c0f57(local_8, DAT_00679640, local_50, local_5c, 5);
  iVar2 = FUN_0040efd0(DAT_00679640);
  local_58 = ((local_50 + iVar2) + 3);
  iVar4 = (local_5c + (local_1c / 2 | 0));
  iVar2 = FUN_00451860();
  FUN_005cef31(DAT_fffffdb0, DAT_006a6668, local_58, ((iVar4 + -2) - (iVar2 / 2 | 0)));
  local_58 = (s32((in_ECX + 0x5f8), 0) + local_44);
  local_5c = (local_5c + local_80);
  FUN_0040bbb0();
  FUN_0040bc10(0x296);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
  FUN_0040bbb0();
  if ((local_7c === 2)) {
    cVar1 = 0;
  }
  else {
    cVar1 = DAT_00627ccb[local_7c * 0x18];
  }
  _sprintf(DAT_00679640, DAT_0062c96c, s8(cVar1));
  FUN_005c0f57(local_8, DAT_00679640, local_50, local_5c, 5);
  iVar2 = FUN_0040efd0(DAT_00679640);
  local_58 = ((local_50 + iVar2) + 3);
  iVar4 = (local_5c + (local_1c / 2 | 0));
  iVar2 = FUN_00451860();
  FUN_005cef31(DAT_fffffda0, DAT_006a6668, local_58, ((iVar4 + -2) - (iVar2 / 2 | 0)));
  local_58 = (s32((in_ECX + 0x5f8), 0) + local_44);
  local_5c = (local_5c + local_80);
  FUN_0040bbb0();
  FUN_0040bc10(0x45);
  FUN_0040fe40();
  FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_0062c970, s8(DAT_00627ccc[local_7c * 0x18]));
  FUN_005c0f57(local_8, DAT_00679640, local_50, local_5c, 5);
  iVar2 = FUN_0040efd0(DAT_00679640);
  local_58 = ((local_50 + iVar2) + 3);
  iVar4 = (local_5c + (local_1c / 2 | 0));
  iVar2 = FUN_00451860();
  FUN_005cef31(DAT_fffffd90, DAT_006a6668, local_58, ((iVar4 + -2) - (iVar2 / 2 | 0)));
  if ((0xa < local_7c)) {
    local_58 = (s32((in_ECX + 0x5f8), 0) + local_44);
    local_5c = (local_5c + local_80 * 2);
    uVar3 = FUN_00491d61(local_70);
    uVar3 = FUN_004f8a9b(DAT_006a7d58, uVar3);
    FUN_005f22d0(DAT_ffffff44, uVar3);
    local_8c = s8(DAT_00627cca[local_70 * 0x18]);
    if ((local_70 === 2)) {
      cVar1 = 0;
    }
    else {
      cVar1 = DAT_00627ccb[local_70 * 0x18];
    }
    local_94 = s8(cVar1);
    local_c0 = s8(DAT_00627ccc[local_70 * 0x18]);
    local_84 = s8(DAT_00627cca[local_7c * 0x18]);
    local_88 = s8(DAT_00627ccb[local_7c * 0x18]);
    local_90 = s8(DAT_00627ccc[local_7c * 0x18]);
    FUN_0040bbb0();
    if ((local_8c < local_84)) {
      _Format = FUN_00428b0c(s32((DAT_00628420 + 0xb10), 0), DAT_ffffff44, local_8c, local_84);
      _sprintf(DAT_00679640, _Format);
    }
    else {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb14), 0));
      FUN_005f22d0(DAT_00679640, uVar3);
    }
    FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
    local_5c = (local_5c + local_80);
    FUN_0040bbb0();
    FUN_004aef20(DAT_fffffe40);
    if ((local_94 < local_88)) {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb18), 0));
      FUN_005f22d0(DAT_fffffe40, uVar3);
      _sprintf(DAT_00679640, DAT_fffffe40, local_94, local_88);
      FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
      local_5c = (local_5c + local_80);
      FUN_0040bbb0();
      FUN_004aef20(DAT_fffffe40);
      if ((local_c0 < local_90)) {
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb1c), 0));
        FUN_005f22e0(DAT_fffffe40, uVar3);
        _sprintf(DAT_00679640, DAT_fffffe40, local_c0, local_90);
      }
      else {
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb20), 0));
        FUN_005f22e0(DAT_00679640, uVar3);
      }
    }
    else {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb24), 0));
      FUN_005f22d0(DAT_00679640, uVar3);
      FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
      local_5c = (local_5c + local_80);
      FUN_0040bbb0();
      FUN_004aef20(DAT_fffffe40);
      if ((local_c0 < local_90)) {
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb1c), 0));
        FUN_005f22e0(DAT_fffffe40, uVar3);
        _sprintf(DAT_00679640, DAT_fffffe40, local_c0, local_90);
      }
      else {
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb28), 0));
        FUN_005f22e0(DAT_00679640, uVar3);
      }
    }
    FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
  }
  else {
    for (/* cond: (local_68 < 2) */); local_68 = (local_68 < 2); local_68 = (local_68 + 1)) {
      local_58 = (s32((in_ECX + 0x5f8), 0) + local_44);
      local_5c = (local_5c + local_80);
      FUN_0040bbb0();
      if ((local_68 === 0)) {
        FUN_0040bc10(0x297);
      }
      else {
        FUN_0040bc10(0x299);
      }
      FUN_0040fe40();
      FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
      FUN_0040bbb0();
      if ((DAT_00627cce[(local_7c * 0x18 + local_68)] < 0)) {
        if ((DAT_00627cd0[(local_7c * 0x18 + local_68)] < 1)) {
          FUN_0040bc10(0x29b);
          FUN_005c0f57(local_8, DAT_00679640, local_50, local_5c, 5);
        }
        else {
          _sprintf(DAT_00679640, DAT_0062c974, s8(DAT_00627cd0[(local_7c * 0x18 + local_68)]));
          FUN_005c0f57(local_8, DAT_00679640, local_50, local_5c, 5);
          iVar2 = FUN_0040efd0(DAT_00679640);
          local_58 = ((local_50 + iVar2) + 3);
          if ((local_68 === 0)) {
            iVar4 = (local_5c + (local_1c / 2 | 0));
            iVar2 = FUN_00451860();
            FUN_005cef31(DAT_fffffd80, DAT_006a6668, local_58, ((iVar4 + -2) - (iVar2 / 2 | 0)));
          }
          else {
            iVar4 = (local_5c + (local_1c / 2 | 0));
            iVar2 = FUN_00451860();
            FUN_005cef31(DAT_fffffd70, DAT_006a6668, local_58, ((iVar4 + -2) - (iVar2 / 2 | 0)));
          }
        }
      }
      else {
        uVar3 = FUN_00491d61(s8(DAT_00627cce[(local_7c * 0x18 + local_68)]));
        uVar3 = FUN_004f8a9b(DAT_006a7d58, uVar3);
        FUN_005f22d0(DAT_00679640, uVar3);
        local_38 = FUN_0040efd0(DAT_00679640);
        local_8 = ~_Timevec(local_8);
        FUN_006e7d90(DAT_ffffffcc, local_50, local_5c, ((local_38 + local_50) + 5), (local_5c + extraout_EAX_00));
        FUN_00452c14(s8(DAT_00627cce[(local_7c * 0x18 + local_68)]), local_50, local_5c, 4, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
      }
      local_58 = (s32((in_ECX + 0x5f8), 0) + local_44);
      local_5c = (local_5c + local_80);
      FUN_0040bbb0();
      if ((local_68 === 0)) {
        FUN_0040bc10(0x298);
      }
      else {
        FUN_0040bc10(0x29a);
      }
      FUN_0040fe40();
      FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
      FUN_0040bbb0();
      if ((DAT_00627cd2[(local_7c * 0x18 + local_68)] < 1)) {
        FUN_0040bc10(0x29b);
      }
      else {
        _sprintf(DAT_00679640, DAT_0062c97c, s8(DAT_00627cd2[(local_7c * 0x18 + local_68)]))
        ;
      }
      FUN_005c0f57(local_8, DAT_00679640, local_50, local_5c, 5);
    }
    local_58 = local_40;
    FUN_0040bbb0();
    local_5c = local_60;
    FUN_0040bc10(0x29c);
    FUN_0040fe40();
    FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
    local_58 = (local_58 + 0x14);
    local_5c = (local_5c + local_80);
    FUN_0040bbb0();
    if ((DAT_00627ccd[local_7c * 0x18] < 0)) {
      FUN_0040bc10(0x29b);
      FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
    }
    else {
      uVar3 = FUN_00491d61(s8(DAT_00627ccd[local_7c * 0x18]));
      uVar3 = FUN_004f8a9b(DAT_006a7d58, uVar3);
      FUN_005f22d0(DAT_00679640, uVar3);
      local_38 = FUN_0040efd0(DAT_00679640);
      local_8 = ~_Timevec(local_8);
      FUN_006e7d90(DAT_ffffffcc, local_58, local_5c, ((local_58 + local_38) + 5), (local_5c + extraout_EAX_01));
      FUN_00452c14(s8(DAT_00627ccd[local_7c * 0x18]), local_58, local_5c, 4, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
    }
    if ((local_7c !== 0xa)) {
      local_58 = local_40;
      local_5c = (local_5c + local_80);
      FUN_0040bbb0();
      FUN_0040bc10(0x29d);
      FUN_0040fe40();
      FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
      FUN_0040bbb0();
      local_58 = (local_58 + 0x14);
      local_5c = (local_5c + local_80);
      FUN_0040bc10(0x293);
      FUN_0040fe40();
      FUN_0040fe10();
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb0c), 0));
      FUN_0040bbe0(uVar3);
      FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
      if ((local_7c === 1)) {
        local_5c = (local_5c + local_80);
        FUN_0040bbb0();
        FUN_0040bc10(0x45);
        FUN_0040fe40();
        FUN_0040bbe0(DAT_0062c980);
        FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
        iVar2 = FUN_0040efd0(DAT_00679640);
        local_58 = (local_58 + (iVar2 + 3));
        iVar4 = (local_5c + (local_1c / 2 | 0));
        iVar2 = FUN_00451860();
        FUN_005cef31(DAT_fffffd60, DAT_006a6668, local_58, ((iVar4 + -2) - (iVar2 / 2 | 0)));
      }
    }
    local_58 = local_40;
    local_5c = (local_5c + local_80);
    FUN_0040bbb0();
    FUN_0040bc10(0x29e);
    FUN_0040fe40();
    FUN_005c0f57(local_8, DAT_00679640, local_58, local_5c, 5);
    local_58 = (local_58 + 0x14);
    local_5c = (local_5c + local_80);
    FUN_0040bbb0();
    uVar3 = FUN_00491d61((local_7c + 0xb));
    uVar3 = FUN_004f8a9b(DAT_006a7d58, uVar3);
    FUN_005f22d0(DAT_00679640, uVar3);
    local_38 = FUN_0040efd0(DAT_00679640);
    local_8 = ~_Timevec(local_8);
    FUN_006e7d90(DAT_ffffffcc, local_58, local_5c, ((local_58 + local_38) + 5), (local_5c + extraout_EAX_02));
    FUN_00452c14((local_7c + 0xb), local_58, local_5c, 4, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
    if ((local_7c !== 2)) {
      FUN_0040bbb0();
      local_5c = (local_5c + local_80);
      uVar3 = FUN_00491d61((local_7c + 0x16));
      uVar3 = FUN_004f8a9b(DAT_006a7d58, uVar3);
      FUN_005f22d0(DAT_00679640, uVar3);
      local_38 = FUN_0040efd0(DAT_00679640);
      local_8 = ~_Timevec(local_8);
      FUN_006e7d90(DAT_ffffffcc, local_58, local_5c, ((local_58 + local_38) + 5), (local_5c + extraout_EAX_03));
      FUN_00452c14((local_7c + 0x16), local_58, local_5c, 4, UNNAMED, UNNAMED, UNNAMED, UNNAMED);
    }
  }
  FUN_00452768(s32((in_ECX + 0x120), 0));
  FUN_005c0073(DAT_ffffffe8);
  FUN_00408490((in_ECX + 0x5f8));
  return;
}


 export function FUN_00491c20 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_8;

  if ((DAT_006a677c !== 0)) {
    for (/* cond: (s32(((in_ECX + 0xe54) + local_8 * 4), 0) !== param_1) */);
        (local_8 = (local_8 < s32((in_ECX + 0xdcc), 0)) && (in_ECX = (in_ECX + 0xe54)));
        local_8 = (local_8 + 1)) {
    }
    if ((s32((in_ECX + 0xdcc), 0) !== local_8)) {
      FUN_004f7bd1(5, 1);
      w32((in_ECX + 0x120), 0, local_8);
      w32((in_ECX + 0x1f38), 0, local_8);
      w32((in_ECX + 0x124), 0, 1);
      w32((in_ECX + 0x11c), 0, 1);
      FUN_004f4793();
      FUN_00451bf0();
      uVar1 = FUN_004f8a9b(DAT_006a7d58, local_8);
      FUN_005f22d0((in_ECX + 0x618), uVar1);
      FUN_004f6244();
      FUN_004906fd();
      FUN_00408460();
      FUN_004518d0();
      DAT_006a66b0 = DAT_006a66b0;
      FUN_005c61b0();
      DAT_006a66b0 = DAT_006a66b0;
    }
  }
  return;
}


 export function FUN_00491d61 (param_1)

 {
  let local_8;

  local_8 = 0;
  while ((s32((DAT_006a74bc + local_8 * 4), 0) === param_1)) {
    if ((DAT_006a7434 <= local_8)) {
      return -1;
    }
    if ((s32((DAT_006a74bc + local_8 * 4), 0) === param_1));
  }
  return local_8;
}


 export function FUN_004923c0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bd120(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_004923f0 (param_1, param_2)

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let sVar4;
  let local_14;

  FUN_0040bbb0();
  local_14 = 0;
  if ((DAT_00655b07 === 0)) {
    bVar1 = 0;
  }
  else {
    bVar1 = 1;
  }
  /* switch */ () {
  case 0x2b0 :
    while (((DAT_0064c6c0[(DAT_006d1da0 * 4 + DAT_0062c990 * 0x594)] & 1) === 0)) {
      local_14 = (local_14 + 1);
      DAT_0062c990 = (DAT_0062c990 + 1);
      if (((DAT_0062c990 + 1) === 8)) {
        DAT_0062c990 = 1;
      }
    }
    if ((local_14 === 8)) {
      return;
    }
    DAT_0062c990 = (DAT_0062c990 + 1);
    uVar3 = FUN_00493d13(iVar2);
    FUN_0040bbe0(uVar3);
    FUN_0040fe10();
    if (((DAT_0062c990 + 1) === 8)) {
      DAT_0062c990 = 1;
    }
    goto switchD_004926f8_default;
  case 0x2b1 :
    while (((DAT_0064c6c0[(DAT_006d1da0 * 4 + DAT_0062c994 * 0x594)] & 1) === 0)) {
      local_14 = (local_14 + 1);
      DAT_0062c994 = (DAT_0062c994 + 1);
      if (((DAT_0062c994 + 1) === 8)) {
        DAT_0062c994 = 1;
      }
    }
    if ((local_14 === 8)) {
      return;
    }
    uVar3 = FUN_00493ba6(DAT_0062c994);
    FUN_0040bbe0(uVar3);
    FUN_0040fe10();
    iVar2 = DAT_0062c994;
    DAT_0062c994 = (DAT_0062c994 + 1);
    uVar3 = FUN_00493b10(iVar2);
    FUN_0040bbe0(uVar3);
    FUN_0040fe10();
    if (((DAT_0062c994 + 1) === 8)) {
      DAT_0062c994 = 1;
    }
    goto switchD_004926f8_default;
  case 0x2b2 :
    FUN_0049275a(s_chatmac1.txt_0062c9a4, DAT_0062c998);
    iVar2 = DAT_0062c998;
    break;
  case 0x2b3 :
    FUN_0049275a(s_chatmac2.txt_0062c9b4, DAT_0062c99c);
    iVar2 = DAT_0062c99c;
    break;
  case 0x2b4 :
    FUN_0049275a(s_chatmac3.txt_0062c9c4, DAT_0062c9a0);
    iVar2 = DAT_0062c9a0;
    break;
  default :
    goto switchD_004926f8_default;
  }
  if ((iVar2 === 0)) {
    return;
  }
 switchD_004926f8_default: :
  FUN_00492ae0(DAT_00679640);
  iVar2 = FUN_00492ab0();
  sVar4 = _strlen(DAT_00679640);
  FUN_00492b20((iVar2 - sVar4), iVar2);
  return;
}


 export function FUN_0049275a (param_1, param_2)

 {
  let iVar1;
  let sVar2;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00492874;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005d7c00();
  local_8 = 0;
  iVar1 = Realloc(param_1);
  if ((iVar1 === 0)) {
    w32(param_2, 0, 0);
    local_8 = -1;
    FUN_00492868();
    FUN_0049287e();
    return;
  }
  iVar1 = FUN_00492a80();
  if ((iVar1 <= s32(param_2, 0))) {
    w32(param_2, 0, 0);
  }
  iVar1 = Realloc(s32(param_2, 0));
  if ((iVar1 === 0)) {
    w32(param_2, 0, 0);
    FUN_00421c30();
    local_8 = -1;
    FUN_00492868();
    FUN_0049287e();
    return;
  }
  FUN_00492a40(DAT_00679640, 0x100);
  FUN_00421c30();
  sVar2 = _strlen(DAT_00679640);
  w32(param_2, 0, ((s32(param_2, 0) + sVar2) + 2));
  local_8 = -1;
  FUN_00492868();
  FUN_0049287e();
  return;
}


 export function FUN_00492868 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_0049287e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Same */  /* Base */
 /* Name */     /* protected: */  /* virtual */  /* unsigned */  /* char */  /* * */  /* __thiscall */  /* CHtmlStream::Realloc(unsigned */  /* char */
 /* *,unsigned */
 /* long) */     /* protected: */  /* virtual */  /* unsigned */  /* char */  /* * */  /* __thiscall */  /* CMemFile::Realloc(unsigned */  /* char */  /* *,unsigned */
 /* long) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function Realloc (param_1)

 {
  FUN_005d8270(param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Same */  /* Base */
 /* Name */     /* protected: */  /* virtual */  /* unsigned */  /* char */  /* * */  /* __thiscall */  /* CHtmlStream::Realloc(unsigned */  /* char */
 /* *,unsigned */
 /* long) */     /* protected: */  /* virtual */  /* unsigned */  /* char */  /* * */  /* __thiscall */  /* CMemFile::Realloc(unsigned */  /* char */  /* *,unsigned */
 /* long) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function Realloc ()

 {
  FUN_005d8622();
  return;
}


 export function FUN_00492a40 ()

 {
  FUN_005d881c();
  return;
}


 export function FUN_00492a80 ()

 {
  FUN_005d898e();
  return;
}


 export function FUN_00492ab0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005d2f47(s32((in_ECX + 0x1c), 0));
  return;
}


 export function FUN_00492ae0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d3035(s32((in_ECX + 0x1c), 0), param_1);
  return;
}


 export function FUN_00492b20 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005d2dc6(s32((in_ECX + 0x1c), 0), param_1, param_2);
  return;
}


 export function FUN_00492b60 (param_1, param_2)

 {
  let cVar1;

  if ((DAT_0064cab9[(param_2 * 6 + param_1 * 0x594)] < 1)) {
    cVar1 = ((~DAT_0064cab9[(param_2 * 6 + param_1 * 0x594)]) + 1);
  }
  else {
    cVar1 = DAT_0064cab9[(param_2 * 6 + param_1 * 0x594)];
  }
  DAT_0064cab9[(param_2 * 6 + param_1 * 0x594)] = (-cVar1);
  return;
}


 export function FUN_00492c15 (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let local_c;

  for (/* cond: (local_c < 0x10) */); local_c = (local_c < 0x10); local_c = (local_c + 1)) {
    if ((DAT_0064cbd8[(param_1 * 0x594 + local_c * 6)] === param_2)) {
      iVar1 = FUN_005ae31d(param_3, param_4, ((s16((DAT_0064cbd4 + (param_1 * 0x594 + local_c * 6)), 0)) << 16 >> 16), ((s16((DAT_0064cbd6 + (param_1 * 0x594 + local_c * 6)), 0)) << 16 >> 16));
      if ((iVar1 <= param_5)) {
        DAT_0064cbd8[(param_1 * 0x594 + local_c * 6)] = 0xff;
        DAT_0064cbd9[(param_1 * 0x594 + local_c * 6)] = 0;
      }
    }
  }
  return;
}


 export function FUN_00492d18 (param_1, param_2)

 {
  let iVar1;
  let iVar2;

  if ((DAT_0064cab8[(param_2 * 6 + param_1 * 0x594)] !== 0xff)) {
    FUN_00492d18(param_1, (param_2 + 1));
    iVar1 = (param_1 * 0x594 + param_2 * 6);
    iVar2 = (param_1 * 0x594 + (param_2 * 3 + 3) * 2);
    w32((DAT_0064cab4 + iVar2), 0, s32((DAT_0064cab4 + iVar1), 0));
    w16((DAT_0064cab8 + iVar2), 0, s16((DAT_0064cab8 + iVar1), 0));
  }
  return;
}


 export function FUN_00492dd0 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let local_8;

  for (/* cond: (param_2 <= local_8) */); param_2 = (param_2 <= local_8); local_8 = (local_8 + -1)) {
    iVar1 = (param_1 * 0x594 + local_8 * 6);
    iVar2 = (param_1 * 0x594 + (local_8 * 3 + 3) * 2);
    w32((DAT_0064cbd4 + iVar2), 0, s32((DAT_0064cbd4 + iVar1), 0));
    w16((DAT_0064cbd8 + iVar2), 0, s16((DAT_0064cbd8 + iVar1), 0));
  }
  return;
}


 export function FUN_00492e60 (param_1, param_2, param_3, param_4)

 {
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  for (/* cond: (local_8 < 0x30) */); local_8 = (local_8 < 0x30); local_8 = (local_8 + 1)) {
    if ((DAT_0064cab8[(param_1 * 0x594 + local_8 * 6)] === param_4)) {
      if ((DAT_0064cab9[(param_1 * 0x594 + local_8 * 6)] < 1)) {
        local_10 = ((~s8(DAT_0064cab9[(param_1 * 0x594 + local_8 * 6)])) + 1);
      }
      else {
        local_10 = s8(DAT_0064cab9[(param_1 * 0x594 + local_8 * 6)]);
      }
      if ((s8(((local_c) & 0xFF)) <= local_10)) {
        if ((DAT_0064cab9[(param_1 * 0x594 + local_8 * 6)] < 1)) {
          local_c = ((~s8(DAT_0064cab9[(param_1 * 0x594 + local_8 * 6)])) + 1);
        }
        else {
          local_c = s8(DAT_0064cab9[(param_1 * 0x594 + local_8 * 6)]);
        }
      }
    }
  }
  return local_c;
}


 export function FUN_0049301b (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let iVar2;
  let local_10;
  let local_c;

  local_c = 0;
  while ((param_5 <= DAT_0064cab9[(local_c * 6 + param_1 * 0x594)])) {
    if ((0x2f < local_c)) {
      if ((param_4 === 3)) {
        for (/* cond: (local_10 < ((DAT_00655b16) << 16 >> 16)) */); local_10 = (local_10 < ((DAT_00655b16) << 16 >> 16)); local_10 = (local_10 + 1)) {
          if ((s8(DAT_0064b1ca[u8(DAT_006560f6[local_10 * 0x20]) * 0x14]) === param_4)) {
            iVar1 = FUN_005b8a81(((s16((DAT_006560f0 + local_10 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_10 * 0x20), 0)) << 16 >> 16));
            iVar2 = FUN_005b8a81(param_2, param_3);
            if ((iVar1 === iVar2)) {
              iVar1 = FUN_005ae31d(param_2, param_3, ((s16((DAT_006560f0 + local_10 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_10 * 0x20), 0)) << 16 >> 16));
              iVar2 = FUN_005b2c3d(local_10);
              if ((iVar1 * 2 <= iVar2)) {
                DAT_006560ff[local_10 * 0x20] = 0xb;
                w16((DAT_00656102 + local_10 * 0x20), 0, ((param_2) & 0xFFFF));
                w16((DAT_00656104 + local_10 * 0x20), 0, ((param_3) & 0xFFFF));
              }
            }
          }
        }
      }
      local_c = 0;
      while ((DAT_0064cab8[(local_c * 6 + param_1 * 0x594)] === 0xff)) {
        if ((0x2f < local_c)) {
          return;
        }
        if ((DAT_0064cab8[(local_c * 6 + param_1 * 0x594)] === 0xff));
      }
      FUN_00492d18(param_1, local_c);
      w16((DAT_0064cab4 + (local_c * 6 + param_1 * 0x594)), 0, ((param_2) & 0xFFFF));
      w16((DAT_0064cab6 + (local_c * 6 + param_1 * 0x594)), 0, ((param_3) & 0xFFFF));
      DAT_0064cab8[(local_c * 6 + param_1 * 0x594)] = ((param_4) & 0xFF);
      DAT_0064cab9[(local_c * 6 + param_1 * 0x594)] = param_5;
      return;
    }
    if ((param_5 <= DAT_0064cab9[(local_c * 6 + param_1 * 0x594)]));
  }
  return;
}


 export function FUN_004933f2 (param_1, param_2, param_3, param_4, param_5)

 {
  let local_8;

  local_8 = 0;
  while ((param_5 <= DAT_0064cbd9[(param_1 * 0x594 + local_8 * 6)])) {
    if ((0xf < local_8)) {
      local_8 = 0;
      while ((DAT_0064cbd8[(param_1 * 0x594 + local_8 * 6)] === 0xff)) {
        if ((0xf < local_8)) {
          return;
        }
        if ((DAT_0064cbd8[(param_1 * 0x594 + local_8 * 6)] === 0xff));
      }
      FUN_00492dd0(param_1, local_8);
      w16((DAT_0064cbd4 + (param_1 * 0x594 + local_8 * 6)), 0, ((param_2) & 0xFFFF));
      w16((DAT_0064cbd6 + (param_1 * 0x594 + local_8 * 6)), 0, ((param_3) & 0xFFFF));
      DAT_0064cbd8[(param_1 * 0x594 + local_8 * 6)] = param_4;
      DAT_0064cbd9[(param_1 * 0x594 + local_8 * 6)] = param_5;
      return;
    }
    if ((param_5 <= DAT_0064cbd9[(param_1 * 0x594 + local_8 * 6)]));
  }
  return;
}


 export function FUN_00493602 (param_1)

 {
  let local_8;

  for (/* cond: (local_8 < 0x30) */); local_8 = (local_8 < 0x30); local_8 = (local_8 + 1)) {
    if ((DAT_0064cab9[(local_8 * 6 + param_1 * 0x594)] < 0)) {
      DAT_0064cab8[(local_8 * 6 + param_1 * 0x594)] = 0xff;
    }
    FUN_00492b60(param_1, local_8);
  }
  for (/* cond: (local_8 < 0x10) */); local_8 = (local_8 < 0x10); local_8 = (local_8 + 1)) {
    if ((0xff < DAT_0064cbd8[(local_8 * 6 + param_1 * 0x594)])) {
      FUN_0049301b(param_1, ((s16((DAT_0064cbd4 + (local_8 * 6 + param_1 * 0x594)), 0)) << 16 >> 16), ((s16((DAT_0064cbd6 + (local_8 * 6 + param_1 * 0x594)), 0)) << 16 >> 16), s8(DAT_0064cbd8[(local_8 * 6 + param_1 * 0x594)]), s8(DAT_0064cbd9[(local_8 * 6 + param_1 * 0x594)]));
    }
  }
  return;
}


 export function FUN_0049376f (param_1)

 {
  let local_8;

  for (/* cond: (local_8 < 0x10) */); local_8 = (local_8 < 0x10); local_8 = (local_8 + 1)) {
    DAT_0064cbd8[(param_1 * 0x594 + local_8 * 6)] = 0xff;
    DAT_0064cbd9[(param_1 * 0x594 + local_8 * 6)] = 0;
  }
  return;
}


 export function FUN_00493b10 (param_1)

 {
  let puVar1;

  if ((param_1 < 1)) {
    puVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x44), 0));
  }
  else if ((((s16((DAT_00655502 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16) < 0)) {
    puVar1 = (DAT_0064bcfa + param_1 * 0xf2);
  }
  else {
    puVar1 = FUN_00428b0c(((s16((DAT_00655502 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
  }
  return puVar1;
}


 export function FUN_00493ba6 (param_1)

 {
  let puVar1;

  if ((param_1 < 1)) {
    puVar1 = FUN_00428b0c(DAT_00654ff0);
  }
  else if ((((s16((DAT_0065550c + (((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30 + (u8(DAT_006554fc[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]) * 2 + u8(DAT_0064c6b5[param_1 * 0x594]) * 4))), 0)) << 16 >> 16) < 0)) {
    puVar1 = (DAT_0064bd42 + (u8(DAT_0064c6b5[param_1 * 0x594]) * 0x18 + param_1 * 0xf2));
  }
  else {
    puVar1 = FUN_00428b0c(((s16((DAT_0065550c + (((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30 + (u8(DAT_006554fc[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]) * 2 + u8(DAT_0064c6b5[param_1 * 0x594]) * 4))), 0)) << 16 >> 16));
  }
  return puVar1;
}


 export function FUN_00493c7d (param_1)

 {
  let puVar1;

  if ((param_1 < 1)) {
    puVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x3c), 0));
  }
  else if ((((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16) < 0)) {
    puVar1 = (DAT_0064bd12 + param_1 * 0xf2);
  }
  else {
    puVar1 = FUN_00428b0c(((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
  }
  return puVar1;
}


 export function FUN_00493d13 (param_1)

 {
  let puVar1;

  if ((param_1 < 1)) {
    puVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x40), 0));
  }
  else if ((((s16((DAT_00655506 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16) < 0)) {
    puVar1 = (DAT_0064bd2a + param_1 * 0xf2);
  }
  else {
    puVar1 = FUN_00428b0c(((s16((DAT_00655506 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
  }
  return puVar1;
}


 export function FUN_00493e50 ()

 {
  if ((DAT_0062ca38 !== 0)) {
    FUN_0046e020(DAT_0062ca48, 1, 1, 0);
  }
  return;
}


 export function FUN_00493e83 ()

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00493ef7;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0049621d();
  local_8 = 0;
  iVar1 = FUN_00496402();
  if ((iVar1 !== 0)) {
    FUN_004965ff();
  }
  local_8 = -1;
  FUN_00493eeb();
  FUN_00493f01();
  return;
}


 export function FUN_00493eeb (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -0x1f4);
  return;
}


 export function FUN_00493f01 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00493f0f (param_1, param_2)

 {
  let pvVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_2c;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00494130;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  DAT_0062ca38 = 0;
  DAT_0062ca44 = (((((DAT_006d1168) & 0xFFFF) + param_2) & 7) + 0x53);
  if ((s16((DAT_0064c6a6 + param_2 * 0x594), 0) < 1)) {
    local_28 = ((~((s16((DAT_0064c6a6 + param_2 * 0x594), 0)) << 16 >> 16)) + 1);
  }
  else {
    local_28 = ((s16((DAT_0064c6a6 + param_2 * 0x594), 0)) << 16 >> 16);
  }
  DAT_0062ca48 = (u8(DAT_0061d1e8[local_28]) * 4 + 0x70);
  for (/* cond: (local_14 < 3) */); local_14 = (local_14 < 3); local_14 = (local_14 + 1)) {
    w32((DAT_0062ca50 + local_14 * 4), 0, ((DAT_0062ca48 + local_14) + 1));
  }
  FUN_0046e6a9();
  if ((DAT_0062ca34 !== 0)) {
    if ((DAT_0062ca34 !== 0)) {
      FUN_00497bf0(1);
    }
    DAT_0062ca34 = 0;
  }
  pvVar1 = operator_new(0x108c);
  local_8 = 0;
  if ((pvVar1 === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = FUN_004942a3();
  }
  local_8 = -1;
  DAT_0062ca34 = local_24;
  if ((iVar2 !== 0)) {
    DAT_0062ca38 = 1;
    if ((local_24 === -0xc8)) {
      local_2c = 0;
    }
    else {
      local_2c = (local_24 + 0x110);
    }
    FUN_0059d3c9(local_2c);
    FUN_0059d3b1((local_24 + 0x224));
    FUN_00494704();
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_00494148 ()

 {
  if ((DAT_0062ca38 !== 0)) {
    DAT_0062ca38 = 0;
    if ((DAT_0062ca34 !== 0)) {
      FUN_004947f0();
      if ((DAT_0062ca34 !== 0)) {
        FUN_00497bf0(1);
      }
      DAT_0062ca34 = 0;
    }
    DAT_0062ca44 = 0;
    FUN_0046e287(0x1e);
    FUN_0046e020((-DAT_0062ca48), 0, 0, 0);
    FUN_0046e6c8();
  }
  return;
}


 export function FUN_004941ee (param_1)

 {
  if ((s32((DAT_0062ca34 + 0x1074), 0) < s32((DAT_0061d2b4 + u8(_MEM[(DAT_0062ca34 + 0x1084)]) * 0x28), 0))) {
    _MEM[(DAT_0062ca34 + 0x1088)] = ((param_1) & 0xFF);
    FUN_00496125();
  }
  return;
}


 export function FUN_004942a3 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004943b0;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c730();
  local_8 = 0;
  FUN_0044c5a0();
  local_8 = 1;
  FUN_005bd630();
  local_8 = 2;
  FUN_005c64da();
  local_8 = 3;
  FUN_004502b0();
  local_8 = 4;
  FUN_005dd010();
  local_8 = ((((local_8) >> 8) << 8) | 5);
  FUN_005bcaa7((in_ECX + 0xb8));
  _MEM[(in_ECX + 0x1088)] = 0;
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004943c9 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004944a3;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  DAT_0062ca40 = 0;
  local_8 = 4;
  FUN_0049444f();
  local_8 = 3;
  FUN_0049445e();
  local_8 = 2;
  FUN_0049446d();
  local_8 = 1;
  FUN_0049447c();
  local_8 = (0 << 8);
  FUN_0049448b();
  local_8 = -1;
  FUN_0049449a();
  FUN_004944ad();
  return;
}


 export function FUN_0049444f ()

 {
  FUN_005dd1a0();
  return;
}


 export function FUN_0049445e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_0049446d ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0049447c ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_0049448b ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_0049449a ()

 {
  FUN_0044ca60();
  return;
}


 export function FUN_004944ad (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004944bb (in_ECX, param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_e4;
  let local_84;

  DAT_0062ca40 = 0;
  FUN_005c6b63(DAT_ffffff1c, 0xa, 0x20);
  FUN_005c6da8(0xa, 0x20, DAT_ffffff1c);
  _MEM[(in_ECX + 0x1086)] = param_1;
  _MEM[(in_ECX + 0x1085)] = param_2;
  _MEM[(in_ECX + 0x1084)] = DAT_0064c6a6[u8(_MEM[(in_ECX + 0x1085)]) * 0x594];
  FUN_004aef20(DAT_ffffff7c);
  FUN_0043c840(DAT_ffffff7c, s_civ2\mk.dll_0062cab4);
  iVar2 = FUN_00564713(DAT_ffffff7c);
  if ((iVar2 === 0)) {
    uVar3 = 0;
  }
  else {
    FUN_004502e0(DAT_ffffff7c);
    uVar1 = FUN_00448f92(_MEM[(in_ECX + 0x1085)]);
    _MEM[(in_ECX + 0x1087)] = uVar1;
    iVar2 = FUN_0049488e();
    if ((iVar2 === 0)) {
      FUN_006e7dd4(0, s_init_tile_failed._0062cac8, s_NOTICE_0062cac0, 0x40);
      uVar3 = 0;
    }
    else {
      iVar2 = FUN_004948e6();
      if ((iVar2 === 0)) {
        FUN_006e7dd4(0, s_init_background_failed._0062cae4, s_NOTICE_0062cadc, 0x40);
        uVar3 = 0;
      }
      else {
        iVar2 = FUN_00494949();
        if ((iVar2 === 0)) {
          FUN_006e7dd4(0, s_init_main_art_failed._0062cb04, s_NOTICE_0062cafc, 0x40);
          uVar3 = 0;
        }
        else {
          iVar2 = FUN_00494b5f();
          if ((iVar2 === 0)) {
            FUN_006e7dd4(0, s_init_military_failed._0062cb24, s_NOTICE_0062cb1c, 0x40);
            uVar3 = 0;
          }
          else {
            iVar2 = FUN_00494e2a();
            if ((iVar2 === 0)) {
              FUN_006e7dd4(0, s_init_science_failed._0062cb44, s_NOTICE_0062cb3c, 0x40);
              uVar3 = 0;
            }
            else {
              iVar2 = FUN_00495c35();
              if ((iVar2 === 0)) {
                FUN_006e7dd4(0, s_init_portrait_failed._0062cb64, s_NOTICE_0062cb5c, 0x40);
                uVar3 = 0;
              }
              else {
                if (((DAT_00655aea+2 & 0x20) !== 0)) {
                  DAT_0062ca40 = FUN_00495e0c();
                }
                uVar3 = 1;
              }
            }
          }
        }
      }
    }
  }
  return uVar3;
}


 export function FUN_00494704 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_00408650();
  FUN_00419b80();
  FUN_00450390((in_ECX + 0x224));
  FUN_00450390((in_ECX + 0x224));
  if ((DAT_0062ca40 !== 0)) {
    FUN_004085f0();
  }
  FUN_004085f0();
  FUN_00419b80();
  if ((DAT_0062ca40 !== 0)) {
    FUN_005dd3f1(s32((DAT_0061d2a8 + u8(_MEM[(in_ECX + 0x1084)]) * 0x28), 0), s32((DAT_0061d2ac + u8(_MEM[(in_ECX + 0x1084)]) * 0x28), 0));
  }
  FUN_00450340();
  DAT_0062ca3c = 0;
  FUN_0046e020(DAT_0062ca44, 1, 0, LAB_00401a91);
  return;
}


 export function FUN_004947f0 ()

 {
  FUN_004503d0();
  FUN_00419b80();
  FUN_00450390(DAT_006a8c00);
  FUN_00450390(DAT_006a8c00);
  FUN_004503d0();
  FUN_00419b80();
  FUN_00408420();
  FUN_00450340();
  FUN_0059d3c9(0);
  FUN_0059d3b1(0);
  FUN_004083b0();
  FUN_00408420();
  FUN_0059d3e1(0, 0);
  return;
}


 export function FUN_0049488e ()

 {
  let iVar1;

  FUN_005bd65c(0x40, 0x40);
  iVar1 = FUN_005bf5e1(0x12b, 0xa, 0x20, DAT_006a8c00);
  return (iVar1 !== 0);
}


 export function FUN_004948e6 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005c5fc4(DAT_0062cb7c, 0x800, 0, 0, s32((in_ECX + 0xc0), 0), (s32((in_ECX + 0xc4), 0) + 5), DAT_006a8c00, DAT_006553d8);
  FUN_00497cc0((in_ECX + 0x1dc));
  return 1;
}


 export function FUN_00494949 (in_ECX)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let puVar3;
  let puVar4;
  let puVar5;
  let local_4d0;
  let local_458;
  let local_454;
  let local_450;
  let local_44c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00494b46;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  local_454 = ((s32((in_ECX + 0xc0), 0) + -0x280) / 3 | 0);
  local_458 = ((s32((in_ECX + 0xc4), 0) + -0x1e0) / 3 | 0);
  FUN_005bb4ae(DAT_0062cb80, 0x800, local_454, local_458, 0x280, 0x1e0, (in_ECX + 0x224), in_ECX);
  iVar1 = FUN_005bf5e1((u8(DAT_0064c6b5[u8(_MEM[(in_ECX + 0x1085)]) * 0x594]) + 0xc8), 0xa, 0xec, DAT_fffffbb4);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00494b3a();
    FUN_00494b50();
    return;
  }
  puVar5 = DAT_ffffffec;
  puVar4 = DAT_fffffbb0;
  puVar3 = DAT_ffffffe8;
  uVar2 = FUN_0043cab0(_MEM[(in_ECX + 0x1085)], puVar3, puVar4, puVar5);
  FUN_00497c40(uVar2, puVar3, puVar4, puVar5);
  FUN_005c6b93(0x91, local_18, local_450, local_14);
  FUN_005c6b63(DAT_fffffb30, 0x6a, 0x28);
  FUN_005c6da8(0x6a, 0x28, DAT_fffffb30);
  FUN_005c0cc5((in_ECX + 0x224));
  local_8 = -1;
  FUN_00494b3a();
  FUN_00494b50();
  return;
}


 export function FUN_00494b3a ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00494b50 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00494b5f (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_4f4;
  let local_4e4;
  let local_4e0;
  let local_4dc;
  let local_4d8;
  let local_4d4;
  let local_4d0;
  let local_4cc;
  let local_4c8;
  let local_48c;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00494d95;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_4c8 = DAT_fffffb38;
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  FUN_005bd630();
  local_8 = 2;
  local_4dc = (u8(DAT_00655c22[u8(_MEM[(in_ECX + 0x1085)])]) - 1);
  if ((local_4dc === 0)) {
    local_4e0 = 1;
    local_8 = 1;
    FUN_00494d71();
    local_8 = (((local_8) >> 8) << 8);
    FUN_00494d7d();
    local_8 = -1;
    FUN_00494d89();
    FUN_00494d9f();
    return;
  }
  iVar1 = FUN_005bf5e1(0xd7, 0xa, 0xec, DAT_fffffbbc);
  if ((iVar1 === 0)) {
    local_4e4 = 0;
    local_8 = 1;
    FUN_00494d71();
    local_8 = (((local_8) >> 8) << 8);
    FUN_00494d7d();
    local_8 = -1;
    FUN_00494d89();
    FUN_00494d9f();
    return;
  }
  local_4cc = (u8(_MEM[(in_ECX + 0x1087)]) * 0x6d + 1);
  local_4d4 = 0x9c;
  FUN_005cedad(DAT_fffffb74, 9, local_4cc, 0x9c, 0x6c, 0x1e);
  local_4cc = 0x2d;
  local_4d4 = 0x82;
  local_4d8 = 0x1f;
  for (/* cond: (local_4d0 < local_4dc) */); local_4d0 = (local_4d0 < local_4dc); local_4d0 = (local_4d0 + 1)) {
    FUN_005cef31(DAT_fffffb0c, (in_ECX + 0xc8), local_4cc, local_4d4);
    local_4d4 = (local_4d4 + local_4d8);
  }
  local_8 = 1;
  FUN_00494d71();
  local_8 = (UNNAMED << 8);
  FUN_00494d7d();
  local_8 = -1;
  FUN_00494d89();
  FUN_00494d9f();
  return;
}


 export function FUN_00494d71 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00494d7d ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00494d89 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00494d9f (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00494dae (param_1)

 {
  let local_8;

  if ((DAT_0062ca5c < 0x65)) {
    for (/* cond: (local_8 < 2) */); local_8 = (local_8 < 2); local_8 = (local_8 + 1)) {
      if ((0 < DAT_0062768e[(param_1 * 0x10 + local_8)])) {
        DAT_0062ca5c = (DAT_0062ca5c + 1);
        FUN_00494dae(s8(DAT_0062768e[(param_1 * 0x10 + local_8)]));
      }
    }
  }
  return;
}


 export function FUN_00494e2a (in_ECX)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let iVar3;
  let unaff_FS_OFFSET;
  let local_7d0;
  let local_7c0;
  let local_7bc;
  let local_7b8;
  let local_7b4;
  let local_7b0;
  let local_7ac;
  let local_6b0;
  let local_6ac;
  let local_6a8;
  let local_6a4;
  let local_6a0;
  let local_69c;
  let local_698;
  let local_694;
  let local_684;
  let local_680;
  let local_678;
  let local_674;
  let aCStack_641;
  let local_60c;
  let local_608;
  let local_604;
  let local_4d8;
  let local_490;
  let local_45c;
  let local_28;
  let local_24;
  let local_14;
  let local_13;
  let local_12;
  let local_11;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00495c1c;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0043c460(0, 0xb);
  local_8 = 0;
  `eh_vector_constructor_iterator'(DAT_fffff9fc, 0x3c, 5, CString, FUN_005cde4d);
  local_8 = 1;
  FUN_005c64da();
  local_8 = 2;
  FUN_005bd630();
  local_8 = ((((local_8) >> 8) << 8) | 3);
  local_14 = 0x13;
  local_13 = 0x62;
  local_12 = 0x13;
  local_11 = 0x25;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_490 = -1;
  local_6ac = 0;
  if ((DAT_00655b08 !== 0)) {
    local_490 = 0;
  }
  else {
    local_490 = 1;
  }
  for (/* cond: (local_6b0 < 0x64) */); local_6b0 = (local_6b0 < 0x64); local_6b0 = (local_6b0 + 1)) {
    iVar1 = FUN_004bd9f0(_MEM[(in_ECX + 0x1085)], local_6b0);
    if ((iVar1 !== 0)) {
      local_6ac = (local_6ac + 1);
      if ((s32((DAT_00673b30 + local_6b0 * 4), 0) < 1)) {
        DAT_0062ca5c = 0;
        FUN_00494dae(local_6b0);
        DAT_0062ca5c = (0 + 1);
        w32((DAT_00673b30 + local_6b0 * 4), 0, (0 + 1));
        local_608 = (0 + 1);
      }
      else {
        local_608 = s32((DAT_00673b30 + local_6b0 * 4), 0);
      }
      if ((UNNAMED < local_608)) {
        local_490 = local_6b0;
        local_490 = local_608;
        for (/* cond: (local_684 < 6) */); local_684 = (local_684 < 6); local_684 = (local_684 + 1)) {
          local_7b4 = s32(DAT_fffffb70, local_684 * 2);
          local_7b8 = s32(DAT_fffffb70, (local_684 * 2 + 1));
          local_6a0 = (local_684 + -1);
          while ((local_7b8 < s32(DAT_fffffb70, (local_6a0 * 2 + 1)))) {
            w32(DAT_fffffb70, (local_6a0 * 2 + 2), s32(DAT_fffffb70, local_6a0 * 2));
            w32(DAT_fffffb70, (local_6a0 * 2 + 3), s32(DAT_fffffb70, (local_6a0 * 2 + 1)));
            local_6a0 = (local_6a0 + -1);
          }
          w32(DAT_fffffb70, (local_6a0 * 2 + 2), local_7b4);
          w32(DAT_fffffb70, (local_6a0 * 2 + 3), local_7b8);
        }
      }
    }
  }
  if ((6 < local_6ac)) {
    local_6ac = 6;
  }
  if ((local_6ac === 0)) {
    local_7bc = 1;
    local_8 = 2;
    FUN_00495be2();
    local_8 = 1;
    FUN_00495bee();
    local_8 = (((local_8) >> 8) << 8);
    FUN_00495bfa();
    local_8 = -1;
    FUN_00495c10();
    FUN_00495c26();
    return;
  }
  iVar1 = FUN_005bf5e1(0xd7, 0xa, 0xec, DAT_fffffba4);
  if ((iVar1 === 0)) {
    local_7c0 = 0;
    local_8 = 2;
    FUN_00495be2();
    local_8 = 1;
    FUN_00495bee();
    local_8 = (((local_8) >> 8) << 8);
    FUN_00495bfa();
    local_8 = -1;
    FUN_00495c10();
    FUN_00495c26();
    return;
  }
  FUN_005c0cc5((in_ECX + 0x224));
  local_678 = (u8(_MEM[(in_ECX + 0x1087)]) * 0x6d + 1);
  local_69c = 1;
  FUN_005cedad(DAT_fffffb28, 9, local_678, 1, 0x6c, 0x1e);
  local_69c = (local_69c + 0x1f);
  FUN_005cedad(DAT_fffffb28, 9, local_678, local_69c, 0x6c, 0x1e);
  local_69c = (local_69c + 0x1f);
  FUN_005cedad(DAT_fffffb28, 9, local_678, local_69c, 0x6c, 0x1e);
  local_69c = (local_69c + 0x1f);
  FUN_005cedad(DAT_fffffb28, 9, local_678, local_69c, 0x6c, 0x1e);
  local_69c = (local_69c + 0x1f);
  FUN_005cedad(DAT_fffffb28, 9, local_678, local_69c, 0x6c, 0x1e);
  local_6a4 = 0x1f;
  local_678 = 0x1e5;
  local_69c = 0x82;
  FUN_006e7d90(DAT_ffffffdc, 0, 0, 0x3a, 0x14);
  FUN_006e7da4(DAT_ffffffdc, 0x213, 0x89);
  local_28 = (UNNAMED - UNNAMED);
  local_6a8 = 5;
  do {
    if ((local_6a8 < 0)) {
      local_8 = 2;
      FUN_00495be2();
      local_8 = 1;
      FUN_00495bee();
      local_8 = (((local_8) >> 8) << 8);
      FUN_00495bfa();
      local_8 = -1;
      FUN_00495c10();
      FUN_00495c26();
      return;
    }
    local_6b0 = s32(DAT_fffffb70, local_6a8 * 2);
    if ((-1 < local_6b0)) {
      local_698 = s8(DAT_0062768c[local_6b0 * 0x10]);
      FUN_005cef31(DAT_fffff830, (in_ECX + 0xc8), local_678, local_69c);
      for (/* cond: (local_684 < 5) */); local_684 = (local_684 < 5); local_684 = (local_684 + 1)) {
        FUN_004aef20((DAT_fffff854 + local_684 * 0x32));
      }
      uVar2 = FUN_00428b0c(s32((DAT_00627684 + local_6b0 * 0x10), 0));
      FUN_0043c840(DAT_fffff854, uVar2);
      FUN_006e7d5c(DAT_fffff854);
      local_6a0 = 0;
      do {
        local_60c = 0;
        while ((DAT_fffff854[(s8(local_60c) + local_6a0 * 0x32)] !== 0x20)) {
          local_60c = (local_60c + 1);
        }
        if ((DAT_fffff854[(s8(local_60c) + local_6a0 * 0x32)] !== 0)) {
          DAT_fffff854[(s8(local_60c) + local_6a0 * 0x32)] = 0;
          FUN_0043c840((DAT_fffff854 + (local_6a0 * 5 + 5) * 0xa), (DAT_fffff854 + ((s8(local_60c) + local_6a0 * 0x32) + 1)));
        }
        local_6a0 = (local_6a0 + 1);
      } while ((local_60c !== 0));
      FUN_004aef20((DAT_fffff9bf + 1));
      for (/* cond: (DAT_fffff854[local_684 * 0x32] !== 0) */); (local_684 = (local_684 < 5) && (local_7ac = DAT_fffff854));
          local_684 = (local_684 + 1)) {
        FUN_0043c840((DAT_fffff9bf + 1), (DAT_fffff854 + local_684 * 0x32));
        FUN_0043c840((DAT_fffff9bf + 1), DAT_0062cb84);
        iVar1 = FUN_0040efd0((DAT_fffff9bf + 1));
        if ((local_28 < iVar1)) {
        if ((local_6a0 === 2)) {
          local_7b0 = 0;
          iVar1 = FUN_006e7b10((DAT_fffff9bf + 1));
          local_60c = ((iVar1) & 0xFF);
          while ((local_28 < iVar1)) {
            DAT_fffff9bf[(s8(local_60c) + 1)] = 0;
            local_60c = (local_60c + 0xff);
            local_7b0 = 1;
          }
          if ((local_7b0 !== 0)) {
            DAT_fffff9bf[s8(local_60c)] = 0;
            FUN_0043c840((DAT_fffff9bf + 1), DAT_0062cb88);
          }
        }
        FUN_006e7d68(DAT_fffff96c, DAT_ffffffdc);
        if ((UNNAMED !== 0)) {
          FUN_005c19ad(0xa);
          FUN_005c1020(DAT_fffff980, (DAT_fffff9bf + 1), DAT_fffff96c, 0);
          FUN_006e7da4(DAT_fffff96c, -1, -1);
          FUN_005c19ad(s32((DAT_ffffffec + u8(_MEM[(in_ECX + 0x1087)])), 0));
          FUN_005c1020(DAT_fffff980, (DAT_fffff9bf + 1), DAT_fffff96c, 0);
        }
      }
      else {
        FUN_004aef20((DAT_fffff9bf + 1));
        if ((local_684 === 0)) {
          FUN_0043c840((DAT_fffff9bf + 1), DAT_fffff854);
          local_6a0 = 1;
          iVar1 = FUN_006e7b10(DAT_fffff98c);
          local_7b0 = 0;
          local_60c = ((iVar1) & 0xFF);
          while ((local_28 < iVar1)) {
            DAT_fffff9bf[(s8(local_60c) + 1)] = 0;
            local_60c = (local_60c + 0xff);
            local_7b0 = 1;
          }
          if ((local_7b0 !== 0)) {
            DAT_fffff9bf[s8(local_60c)] = 0;
            FUN_0043c840((DAT_fffff9bf + 1), DAT_0062cb8c);
          }
        }
        else {
          for (/* cond: (local_6a0 < local_684) */); local_6a0 = (local_6a0 < local_684); local_6a0 = (local_6a0 + 1)) {
            FUN_0043c840((DAT_fffff9bf + 1), (DAT_fffff854 + local_6a0 * 0x32));
          }
        }
        if ((UNNAMED !== 0)) {
          FUN_006e7d68(DAT_fffff96c, DAT_ffffffdc);
          iVar3 = (UNNAMED - UNNAMED);
          iVar1 = FUN_0040ef70();
          FUN_006e7da4(DAT_fffff96c, 0, (((iVar3 >> 1) - iVar1) + 1));
          FUN_005c19ad(0xa);
          FUN_005c1020(DAT_fffff980, (DAT_fffff9bf + 1), DAT_fffff96c, 1);
          FUN_006e7da4(DAT_fffff96c, -1, -1);
          FUN_005c19ad(s32((DAT_ffffffec + u8(_MEM[(in_ECX + 0x1087)])), 0));
          FUN_005c1020(DAT_fffff980, (DAT_fffff9bf + 1), DAT_fffff96c, 1);
        }
        FUN_004aef20(DAT_fffff98c);
        for (/* cond: (local_6a0 < 5) */); local_6a0 = (local_6a0 < 5); local_6a0 = (local_6a0 + 1)) {
          FUN_0043c840(DAT_fffff98c, (DAT_fffff854 + local_6a0 * 0x32));
        }
        iVar1 = FUN_006e7b10(DAT_fffff98c);
        local_7b0 = 0;
        local_60c = ((iVar1) & 0xFF);
        while ((local_28 < iVar1)) {
          DAT_fffff98c[s8(local_60c)] = 0;
          local_60c = (local_60c + 0xff);
          local_7b0 = 1;
        }
        if ((local_7b0 !== 0)) {
          DAT_fffff98c[(s8(local_60c) + -1)] = 0;
          FUN_0043c840(DAT_fffff98c, DAT_0062cb90);
        }
        if ((UNNAMED !== 0)) {
          iVar1 = FUN_0040ef70();
          FUN_006e7da4(DAT_fffff96c, 0, (iVar1 + -3));
          FUN_005c19ad(0xa);
          FUN_005c1020(DAT_fffff980, DAT_fffff98c, DAT_fffff96c, 1);
          FUN_006e7da4(DAT_fffff96c, -1, -1);
          FUN_005c19ad(s32((DAT_ffffffec + u8(_MEM[(in_ECX + 0x1087)])), 0));
          FUN_005c1020(DAT_fffff980, DAT_fffff98c, DAT_fffff96c, 1);
        }
      }
      FUN_006e7da4(DAT_ffffffdc, 0, local_6a4);
      local_69c = (local_69c + local_6a4);
    }
    local_6a8 = (local_6a8 + -1);
  } ( true );
}


 export function FUN_00495be2 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00495bee ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00495bfa (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((unaff_EBP + -0x600), 0x3c, 5, FUN_005cde4d);
  return;
}


 export function FUN_00495c10 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_00495c26 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00495c35 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_59c;
  let local_58c;
  let local_588;
  let local_4c8;
  let local_48c;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00495df3;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_4c8 = DAT_fffffb38;
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  FUN_005bd630();
  local_8 = 2;
  iVar1 = FUN_005bf5e1((u8(DAT_0064ca92[u8(_MEM[(in_ECX + 0x1085)]) * 0x594]) + 0xdc), 0xa, 0xec, DAT_fffffbbc);
  if ((iVar1 === 0)) {
    local_58c = 0;
    local_8 = 1;
    FUN_00495dcf();
    local_8 = (((local_8) >> 8) << 8);
    FUN_00495ddb();
    local_8 = -1;
    FUN_00495de7();
    FUN_00495dfd();
    return;
  }
  FUN_005c6b63(DAT_fffffa78, 0x2a, 0x40);
  FUN_005c6da8(0x2a, 0x40, DAT_fffffa78);
  FUN_005c0cc5((in_ECX + 0x224));
  FUN_005cedad(DAT_fffffb74, 9, 1, 1, 0xe1, 0x113);
  FUN_005cef31(DAT_fffffa64, (in_ECX + 0xc8), 0xd0, 0x39);
  local_8 = 1;
  FUN_00495dcf();
  local_8 = (((local_8) >> 8) << 8);
  FUN_00495ddb();
  local_8 = -1;
  FUN_00495de7();
  FUN_00495dfd();
  return;
}


 export function FUN_00495dcf ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00495ddb ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00495de7 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_00495dfd (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00495e0c (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_608;
  let local_601;
  let local_5f4;
  let local_4c8;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0049610c;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  _MEM[(in_ECX + 0x1084)] = DAT_0064c6a6[u8(_MEM[(in_ECX + 0x1085)]) * 0x594];
  FUN_004aef20(DAT_fffffb38);
  FUN_0043c840(DAT_fffffb38, s_civ2\kings\_0062cb94);
  FUN_004aef20(DAT_fffff9f8);
  FUN_0043c840(DAT_fffff9f8, DAT_0062cba0);
  FUN_0043c840(DAT_fffff9f8, s32(PTR_DAT_0062c9e0, ((s16((DAT_0064c6a6 + u8(_MEM[(in_ECX + 0x1085)]) * 0x594), 0)) << 16 >> 16)));
  local_601 = 0;
  FUN_0043c840(DAT_fffffb38, DAT_fffff9f8);
  FUN_0043c840(DAT_fffffb38, DAT_0062cba8);
  iVar1 = FUN_00564713(DAT_fffffb38);
  if ((iVar1 === 0)) {
    local_8 = -1;
    FUN_00496100();
    FUN_00496116();
    return;
  }
  FUN_005dd2e3(DAT_0062cbb0, 0x200, s32((DAT_0061d200 + u8(_MEM[(in_ECX + 0x1084)]) * 8), 0), s32((DAT_0061d204 + u8(_MEM[(in_ECX + 0x1084)]) * 8), 0), (in_ECX + 0xc8));
  local_14 = FUN_005dd377(DAT_fffffb38);
  if ((local_14 !== 0)) {
    if ((local_14 === -0x7ffbfeac)) {
      FUN_00421ea0(s_VFWNOTREGISTERED_0062cbb4);
    }
    local_8 = -1;
    FUN_00496100();
    FUN_00496116();
    return;
  }
  in_ECX = (in_ECX + 0x65c);
  FUN_005dd761(1);
  FUN_005c65f9((u8(_MEM[(in_ECX + 0x1084)]) + 0x3e8));
  FUN_005c6b63(DAT_fffffa0c, 0x92, 0x64);
  FUN_005c6da8(0x92, 0x64, DAT_fffffa0c);
  FUN_005dd561((in_ECX + 0x224));
  FUN_00450390((in_ECX + 0x224));
  FUN_005dd45d(0);
  local_8 = -1;
  FUN_00496100();
  FUN_00496116();
  return;
}


 export function FUN_00496100 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00496116 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00496125 ()

 {
  let iVar1;
  let uVar2;

  iVar1 = DAT_0062ca34;
  if ((DAT_0062ca40 !== 0)) {
    if ((_MEM[(DAT_0062ca34 + 0x1088)] === 0)) {
      FUN_005dd4c2(s32((DAT_0061d2b0 + u8(_MEM[(DAT_0062ca34 + 0x1084)]) * 0x28), 0), s32((DAT_0061d2b4 + u8(_MEM[(DAT_0062ca34 + 0x1084)]) * 0x28), 0));
    }
    else {
      uVar2 = u8(_MEM[(DAT_0062ca34 + 0x1088)]);
      _MEM[(DAT_0062ca34 + 0x1088)] = 0;
      FUN_005dd3f1(s32((DAT_0061d2a8 + (u8(_MEM[(iVar1 + 0x1084)]) * 0x28 + uVar2 * 8)), 0), s32((DAT_0061d2ac + (u8(_MEM[(iVar1 + 0x1084)]) * 0x28 + uVar2 * 8)), 0));
      FUN_0046e020(s32(DAT_0062ca48, uVar2), 1, 0, 0);
    }
  }
  return;
}


 export function FUN_0049621d (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00496311;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c5a0();
  local_8 = 0;
  FUN_005bd630();
  local_8 = 1;
  FUN_0040f3e0();
  local_8 = 2;
  FUN_0040f3e0();
  local_8 = ((((local_8) >> 8) << 8) | 3);
  FUN_004502b0();
  w32(in_ECX, 0, PTR_FUN_0061d6c0);
  w32(in_ECX, 0x77, 0);
  w32(in_ECX, 0x78, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* virtual */  /* __thiscall */
 /* CCommandLineInfo::~CCommandLineInfo(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function ~CCommandLineInfo (this)

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004963ea;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(this, 0, PTR_FUN_0061d6c0);
  local_8 = 0;
  local_8 = 3;
  FUN_004963a5();
  local_8 = 2;
  FUN_004963b4();
  local_8 = 1;
  FUN_004963c3();
  local_8 = (0 << 8);
  FUN_004963d2();
  local_8 = -1;
  FUN_004963e1();
  FUN_004963f4();
  return;
}


 export function FUN_004963a5 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_004963b4 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004963c3 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004963d2 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004963e1 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_004963f4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00496402 ()

 {
  FUN_005bb4ae(DAT_0062cbc8, 0xc00, 0, 0, (DAT_0063359c * 8 + 0x276), ((DAT_0063359c * 4 + DAT_00633598) + 0x16e), DAT_006a8c00, DAT_006553d8);
  FUN_004964b3();
  FUN_00497d00(DAT_00633598);
  FUN_00408130(thunk_FUN_00496c3c);
  FUN_00414ca0(LAB_00401f14);
  FUN_004966c4();
  FUN_005bb574();
  FUN_00450400();
  return 1;
}


 export function FUN_004964b3 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_1c;
  let local_18;
  let local_14;

  FUN_006e7d90(DAT_ffffffec, (DAT_0063359c + 2), (((DAT_0063359c * 3 + DAT_00633598) + DAT_00633588) + 0x14a), (((DAT_0063359c * 8 + 0x276) >> 1) + -2), (((DAT_0063359c * 3 + DAT_00633598) + 0x16e) + DAT_00633588));
  if ((in_ECX === 0)) {
    local_18 = 0;
  }
  else {
    local_18 = (in_ECX + 0x48);
  }
  FUN_00497d40(local_18, 0x65, DAT_ffffffec, 0x21, DAT_0062cbcc);
  FUN_006e7da4(DAT_ffffffec, ((((DAT_0063359c * 8 + 0x276) >> 1) + 2) - DAT_0063359c), 0);
  if ((in_ECX === 0)) {
    local_1c = 0;
  }
  else {
    local_1c = (in_ECX + 0x48);
  }
  FUN_00497d40(local_1c, 0x64, DAT_ffffffec, 0x21, s_~Cancel_0062cbd0);
  FUN_0040f880(thunk_FUN_00496ecf);
  FUN_0040f880(thunk_FUN_00496ecf);
  return;
}


 export function FUN_004965ff (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_0040f380();
  FUN_0040f380();
  FUN_004085f0();
  if ((2 < DAT_00655b02)) {
    in_ECX = (in_ECX + 0x48);
  }
  FUN_005c61b0();
  in_ECX = (in_ECX + 0x48);
  FUN_004503d0();
  FUN_00419b80();
  FUN_0043c5f0();
  FUN_0043c5f0();
  DAT_0064ca92[s32((in_ECX + 0x1dc), 0) * 0x594] = _MEM[(in_ECX + 0x1e4)];
  return;
}


 export function FUN_004966c4 (in_ECX)

 {
  let iVar1;
  let pCVar2;
  let iVar3;
  let iVar4;
  let pCVar5;
  let lprcSrc;
  // in_ECX promoted to parameter;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_18;
  let local_8;

  local_8 = FUN_00428b0c(s32((DAT_00628420 + 0x4a8), 0));
  FUN_004502e0(s_mk.dll_0062cbd8);
  iVar1 = FUN_005bf5e1((0xd3 - u8((DAT_006554fc[((s16((DAT_0064c6a6 + s32((in_ECX + 0x1dc), 0) * 0x594), 0)) << 16 >> 16) * 0x30] === 0))), 0xa, 0xec, DAT_006a8c00);
  if ((iVar1 !== 0)) {
    FUN_00450340();
    iVar1 = (DAT_00633598 + DAT_00633588 * -2);
    pCVar2 = GetActiveView(in_ECX);
    FUN_005a9b5d(in_ECX, DAT_0063357c, 0, DAT_00633588, pCVar2, iVar1, 0, DAT_00633588);
    pCVar2 = GetActiveView(in_ECX);
    iVar1 = (DAT_0063359c + DAT_00633588 * -2);
    local_30 = DAT_00633588;
    iVar3 = (DAT_00633598 - DAT_00633588);
    for (/* cond: (local_34 < 8) */); local_34 = (local_34 < 8); local_34 = (local_34 + 1)) {
      FUN_005a9b5d(in_ECX, DAT_0063357c, local_30, iVar3, iVar1, pCVar2, local_30, iVar3);
      local_30 = (local_30 + (DAT_0063359c + 0x5a));
    }
    iVar4 = (DAT_0063359c + DAT_00633588 * -2);
    local_38 = ((DAT_00633588 + DAT_00633598) + 0x6e);
    pCVar2 = GetActiveView(in_ECX);
    iVar3 = DAT_00633588;
    iVar1 = DAT_00633588 * -2;
    for (/* cond: (local_34 < 2) */); local_34 = (local_34 < 2); local_34 = (local_34 + 1)) {
      FUN_005a9b5d(in_ECX, DAT_0063357c, iVar3, local_38, (pCVar2 + iVar1), iVar4, iVar3, local_38);
      local_38 = (local_38 + (DAT_0063359c + 0x6e));
    }
    iVar1 = DAT_0063359c * 2;
    pCVar2 = GetActiveView(in_ECX);
    iVar4 = DAT_00633588;
    iVar3 = DAT_00633588 * -2;
    pCVar5 = GetActiveView(in_ECX);
    FUN_005a9b5d(in_ECX, DAT_0063357c, iVar4, (pCVar5 + (DAT_00633588 + (DAT_0063359c * -2 + -36))), (pCVar2 + iVar3), (iVar1 + 0x24), iVar4, (pCVar5 + (DAT_00633588 + (DAT_0063359c * -2 + -36))));
    FUN_006e7d90(DAT_ffffffd8, (DAT_0063359c - DAT_00633588), (DAT_00633598 - DAT_00633588), ((DAT_00633588 * 2 + (DAT_0063359c - DAT_00633588)) + 0x5a), ((DAT_00633588 * 2 + (DAT_00633598 - DAT_00633588)) + 0x6e));
    FUN_006e7d90(DAT_ffffffe8, 1, 1, 0x5b, 0x6f);
    for (/* cond: (local_34 < 3) */); local_34 = (local_34 < 3); local_34 = (local_34 + 1)) {
      for (/* cond: (local_3c < 7) */); local_3c = (local_3c < 7); local_3c = (local_3c + 1)) {
        for (/* cond: (local_2c < DAT_00633588) */); local_2c = (local_2c < DAT_00633588); local_2c = (local_2c + 1)) {
          FUN_005a99fc(in_ECX, DAT_ffffffd8, DAT_00633594, DAT_00633590);
          FUN_006e7d60(DAT_ffffffd8, -1, -1);
        }
        FUN_005c0593(in_ECX, DAT_ffffffe8, DAT_ffffffd8);
        FUN_006e7da4(DAT_ffffffe8, 0x5b, 0);
        FUN_006e7d60(DAT_ffffffd8, DAT_00633588, DAT_00633588);
        FUN_006e7da4(DAT_ffffffd8, (DAT_0063359c + 0x5a), 0);
      }
      FUN_006e7da4(DAT_ffffffe8, -0x27d, 0x6f);
      FUN_006e7da4(DAT_ffffffd8, (DAT_0063359c + 0x5a) * -7, (DAT_0063359c + 0x6e));
    }
    lprcSrc = FUN_00497c90();
    FUN_006e7d68(DAT_ffffffd8, lprcSrc);
    for (/* cond: (local_2c < DAT_00633588) */); local_2c = (local_2c < DAT_00633588); local_2c = (local_2c + 1)) {
      FUN_005a99fc(in_ECX, DAT_ffffffd8, DAT_00633590, DAT_00633594);
      FUN_006e7d60(DAT_ffffffd8, -1, -1);
    }
    FUN_006e7d90(DAT_ffffffd8, (DAT_0063359c - DAT_00633588), (DAT_00633598 - DAT_00633588), ((DAT_00633588 * 2 + (DAT_0063359c - DAT_00633588)) + 0x5a), ((DAT_00633588 * 2 + (DAT_00633598 - DAT_00633588)) + 0x6e));
    for (/* cond: (local_2c < DAT_00633588) */); local_2c = (local_2c < DAT_00633588); local_2c = (local_2c + 1)) {
      FUN_005a99fc(in_ECX, DAT_ffffffd8, 0x5e, 0x5e);
      FUN_006e7d60(DAT_ffffffd8, -1, -1);
    }
    pCVar2 = GetActiveView(in_ECX);
    iVar3 = FUN_0040efd0(local_8);
    iVar1 = DAT_00633588;
    iVar4 = ((pCVar2 >> 1) - ((iVar3 + 4) >> 1));
    iVar3 = (DAT_00633588 + 1);
    FUN_005c19ad(0x12);
    FUN_005c0f57(DAT_006ab190, local_8, (iVar4 + 3), (iVar1 + 2), 5);
    FUN_005c19ad(0x29);
    FUN_005c0f57(DAT_006ab190, local_8, (iVar4 + 1), iVar3, 5);
    FUN_005c0f57(DAT_006ab190, local_8, iVar4, iVar3, 5);
  }
  return;
}


 export function FUN_00496c3c (param_1, param_2)

 {
  let iVar1;
  let pCVar2;
  let local_40;
  let local_30;
  let local_2c;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  iVar1 = FUN_005c62ee();
  if ((iVar1 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (iVar1 + -72);
  }
  local_14 = s32((local_8 + 0x1e0), 0);
  pCVar2 = GetActiveView(local_8);
  if ((param_2 <= (pCVar2 + (DAT_0063359c * -2 + -36)))) {
    iVar1 = ((param_2 - DAT_00633598) / (DAT_0063359c + 0x6e) | 0);
    w32((local_8 + 0x1e0), 0, ((((param_1 - (DAT_0063359c >> 1)) / (DAT_0063359c + 0x5a) | 0) - iVar1) + iVar1 * 8));
    local_10 = (((s32((local_8 + 0x1e0), 0) % 7) * (DAT_0063359c + 0x5a) + DAT_0063359c) - DAT_00633588);
    local_1c = (((s32((local_8 + 0x1e0), 0) / 7 | 0) * (DAT_0063359c + 0x6e) + DAT_00633598) - DAT_00633588);
    local_18 = (((DAT_0063359c + 0x5a) * (local_14 % 7) + DAT_0063359c) - DAT_00633588);
    local_30 = (((DAT_0063359c + 0x6e) * (local_14 / 7 | 0) + DAT_00633598) - DAT_00633588);
    FUN_006e7d90(DAT_ffffffd4, local_10, local_1c, ((DAT_00633588 * 2 + local_10) + 0x5a), ((DAT_00633588 * 2 + local_1c) + 0x6e));
    FUN_006e7d90(DAT_ffffffc0, local_18, local_30, ((DAT_00633588 * 2 + local_18) + 0x5a), ((DAT_00633588 * 2 + local_30) + 0x6e));
    for (/* cond: (local_c < DAT_00633588) */); local_c = (local_c < DAT_00633588); local_c = (local_c + 1)) {
      FUN_005a99fc(local_8, DAT_ffffffd4, 0x5e, 0x5e);
      FUN_006e7d60(DAT_ffffffd4, -1, -1);
      FUN_005a99fc(local_8, DAT_ffffffc0, DAT_00633594, DAT_00633590);
      FUN_006e7d60(DAT_ffffffc0, -1, -1);
    }
    FUN_00408460();
  }
  return;
}


 export function FUN_00496e5d (param_1, param_2)

 {
  let iVar1;
  let pCVar2;
  let local_8;

  iVar1 = FUN_005c62ee();
  if ((iVar1 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (iVar1 + -72);
  }
  FUN_00496c3c(param_1, param_2);
  pCVar2 = GetActiveView(local_8);
  if ((param_2 < (pCVar2 + (DAT_0063359c * -2 + -36)))) {
    FUN_00496ecf(0x64);
  }
  return;
}


 export function FUN_00496ecf (param_1)

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((DAT_006554fc[((s16((DAT_0064c6a6 + s32((local_8 + 0x1dc), 0) * 0x594), 0)) << 16 >> 16) * 0x30] !== 0)) {
    w32((local_8 + 0x1e4), 0, (s32((local_8 + 0x1e4), 0) + 0x15));
  }
  local_8 = (local_8 + 0x48);
  return;
}


 export function FUN_00497bf0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_004943c9();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_00497c40 ()

 {
  FUN_005dea9e();
  return;
}


 export function FUN_00497c90 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return (in_ECX + 0x24);
}


 export function FUN_00497cc0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bc3bf(s32((in_ECX + 8), 0), param_1);
  return;
}


 export function FUN_00497d00 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bd248(s32((in_ECX + 8), 0), param_1);
  return;
}


 export function FUN_00497d40 (in_ECX, param_1, param_2, param_3, param_4, param_5)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x34), 0, param_4);
  w32((in_ECX + 0x38), 0, PTR_DAT_00637e60);
  FUN_0040f680(param_1, param_2, param_3, param_5);
  return;
}


 export function FUN_00497da0 (param_1, param_2)

 {
  let local_10;
  let local_c;
  let local_8;

  local_c = param_1;
  local_10 = 1;
  for (/* cond: (local_8 < 0x4f) */); (local_10 = (local_10 !== 0) && (local_8 = (local_8 < 0x4f))); local_8 = (local_8 + 1)) {
    local_10 = _fgetc(param_2);
    _MEM[local_c] = ((local_10) & 0xFF);
    local_c = (local_c + 1);
  }
  _fgetc(param_2);
  return param_1;
}


 export function FUN_00497e0f (param_1, param_2)

 {
  let local_8;

  local_8 = 1;
  while ((local_8 !== 0)) {
    local_8 = s8(_MEM[param_1]);
    param_1 = (param_1 + 1);
    _fputc(local_8, param_2);
  }
  _fputc(0x1a, param_2);
  return;
}


 export function FUN_00497ea0 (param_1, param_2, param_3)

 {
  let iVar1;
  let uVar2;

  if ((s32((param_1 + 4), 0) !== 0)) {
    if ((s32((param_1 + 8), 0) !== 0)) {
      FUN_005dce29(s32((param_1 + 4), 0));
      w32((param_1 + 8), 0, 0);
    }
    FUN_005dce96(s32((param_1 + 4), 0));
    w32((param_1 + 4), 0, 0);
  }
  _MEM[param_1] = ((param_2) & 0xFF);
  uVar2 = FUN_005dce4f(param_3);
  w32((param_1 + 4), 0, uVar2);
  iVar1 = s32((param_1 + 4), 0);
  if ((iVar1 !== 0)) {
    param_1[1] = 1;
    w16((param_1 + 0xc), 0, 0);
    w16((param_1 + 0x10), 0, param_3);
    w16((param_1 + 0xe), 0, param_3);
    w32((param_1 + 8), 0, 0);
  }
  else {
    w32((param_1 + 4), 0, 0);
    FUN_00589ef8(-2, param_2, 0, param_3, 0);
  }
  return (!(iVar1 !== 0));
}


 export function FUN_00497fa0 (param_1, param_2, param_3, param_4, param_5)

 {
  param_1[1] = 0;
  _MEM[param_1] = param_2;
  w32((param_1 + 4), 0, param_3);
  w32((param_1 + 8), 0, param_4);
  w16((param_1 + 0xc), 0, 0);
  w16((param_1 + 0x10), 0, param_5);
  w16((param_1 + 0xe), 0, s16((param_1 + 0x10), 0));
  return;
}


 export function FUN_00497ff3 (param_1)

 {
  let uVar1;

  if ((s32((param_1 + 8), 0) === 0)) {
    uVar1 = FUN_005dcdf9(s32((param_1 + 4), 0));
    w32((param_1 + 8), 0, uVar1);
    if ((s32((param_1 + 8), 0) === 0)) {
      FUN_00589ef8(-10, _MEM[param_1], 0, 0, 0);
    }
  }
  return 0;
}


 export function FUN_0049805e (param_1)

 {
  w32((param_1 + 8), 0, 0);
  w32((param_1 + 4), 0, 0);
  return;
}


 export function FUN_00498082 (param_1)

 {
  w16((param_1 + 0xc), 0, 0);
  w16((param_1 + 0x10), 0, s16((param_1 + 0xe), 0));
  return;
}


 export function FUN_004980a9 (param_1)

 {
  if ((s32((param_1 + 8), 0) !== 0)) {
    if ((s32((param_1 + 4), 0) !== 0)) {
      FUN_005dce29(s32((param_1 + 4), 0));
    }
    w32((param_1 + 8), 0, 0);
  }
  return;
}


 export function FUN_004980ec (param_1)

 {
  if ((_MEM[(param_1 + 1)] !== 0)) {
    FUN_004980a9(param_1);
    if ((s32((param_1 + 4), 0) !== 0)) {
      FUN_005dce96(s32((param_1 + 4), 0));
      w32((param_1 + 4), 0, 0);
    }
  }
  w16((param_1 + 0xc), 0, 0);
  w16((param_1 + 0x10), 0, 0);
  w16((param_1 + 0xe), 0, 0);
  return;
}


 export function FUN_00498159 (param_1, param_2)

 {
  let iVar1;
  let local_8;

  local_8 = 0;
  if ((s16((param_1 + 0x10), 0) < param_2)) {
    FUN_00589ef8(-3, _MEM[param_1], 0, param_2, s16((param_1 + 0x10), 0));
  }
  iVar1 = FUN_00497ff3(param_1);
  if ((iVar1 === 0)) {
    local_8 = (((s16((param_1 + 0xc), 0)) & 0xFFFF) + s32((param_1 + 8), 0));
    w16((param_1 + 0xc), 0, (s16((param_1 + 0xc), 0) + param_2));
    w16((param_1 + 0x10), 0, (s16((param_1 + 0x10), 0) - param_2));
  }
  return local_8;
}


 export function FUN_00498310 (param_1)

 {
  let local_24;

  FUN_0055ae80(1);
  FUN_00498943();
  FUN_005f22d0(DAT_ffffffdc, (DAT_00654b74 + param_1 * 0x20));
  FUN_004988b8();
  if ((UNNAMED === 0)) {
    FUN_0049836a(param_1);
  }
  return;
}


 export function FUN_0049836a (param_1)

 {
  let unaff_FS_OFFSET;
  let local_348;
  let local_328;
  let local_34;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004985dc;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_0055ae80(1);
  FUN_00498943();
  FUN_005f22d0(DAT_ffffffcc, (DAT_00654b74 + param_1 * 0x20));
  FUN_004988b8();
  if ((UNNAMED === 0)) {
    FUN_005a632a(DAT_006359d4, s_PASSWORD1_0062cc78, 0x1f, DAT_0062cc74, 0, 0, 0, 1);
    FUN_004989d3(DAT_fffffcd8, param_1, 0x26c);
    local_14 = FUN_005a5f34(DAT_fffffcb8, 0);
  }
  else {
    FUN_005a632a(DAT_006359d4, s_PASSWORD1_0062cc4c, 0x1f, DAT_0062cc48, 0, 0, 0, 1);
    FUN_004989d3(DAT_fffffcd8, param_1, 0x26d);
    local_14 = FUN_005a5f34(DAT_fffffcb8, 0);
    if ((local_14 < 0));
    if ((local_14 !== 0)) {
      FUN_00421ea0(s_PASSWORD0_0062cc58);
      goto LAB_004985a2;
    }
    FUN_005a632a(DAT_006359d4, s_PASSWORD1_0062cc68, 0x1f, DAT_0062cc64, 0, 0, 0, 1);
    FUN_004989d3(DAT_fffffcd8, param_1, 0x26c);
    local_14 = FUN_005a5f34(DAT_fffffcb8, 0);
  }
  if ((-1 < local_14)) {
    FUN_00498943();
    FUN_005f22d0((DAT_00654b74 + param_1 * 0x20), DAT_fffffcb8);
    FUN_005f22d0(DAT_ffffffcc, DAT_fffffcb8);
    FUN_004988b8();
    if ((UNNAMED !== 0)) {
      FUN_00421ea0(s_PASSWORD4_0062cc84);
    }
  }
 LAB_004985a2: :
  FUN_0049882b();
  w32((DAT_00673d18 + param_1 * 4), 0, 0);
  FUN_0055b046(1);
  local_8 = -1;
  FUN_004985d0();
  FUN_004985e6();
  return;
}


 export function FUN_004985d0 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004985e6 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004985f4 (param_1)

 {
  let unaff_FS_OFFSET;
  let local_328;
  let local_308;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0049876b;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_005a632a(DAT_006359d4, s_PASSWORD1_0062cc94, 0x1f, DAT_0062cc90, 0, 0, 0, 1);
  FUN_004989d3(DAT_fffffcf8, param_1, 0x26b);
  local_328 = 0;
  DAT_00635a3c = LAB_00402c3e;
  local_14 = FUN_005a5f34(DAT_fffffcd8, 0);
  if ((local_14 < 0)) {
    local_8 = -1;
    FUN_0049875f();
    FUN_00498775();
    return;
  }
  FUN_00498943();
  local_14 = _strcmp(DAT_fffffcd8, (DAT_00654b74 + param_1 * 0x20));
  FUN_004988b8();
  if ((local_14 === 0)) {
    local_8 = -1;
    FUN_0049875f();
    FUN_00498775();
    return;
  }
  DAT_00635a3c = LAB_00402c3e;
  FUN_00421ea0(s_PASSWORD0_0062cca0);
  local_8 = -1;
  FUN_0049875f();
  FUN_00498775();
  return;
}


 export function FUN_0049875f ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00498775 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00498784 ()

 {
  let bVar1;
  let iVar2;
  let local_10;
  let local_8;

  for (/* cond: (local_8 < 0xff) */); local_8 = (local_8 < 0xff); local_8 = (local_8 + 1)) {
    iVar2 = _rand();
    bVar1 = (((iVar2 >> 0x1f)) & 0xFF);
    DAT_00654b74[local_8] = ((((((iVar2) & 0xFF) ^ bVar1) - bVar1) ^ bVar1) - bVar1);
  }
  for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
    DAT_00654b74[local_10 * 0x20] = 0;
    w32((DAT_00673d18 + local_10 * 4), 0, 0);
    w32((DAT_00673d38 + local_10 * 4), 0, 0);
  }
  FUN_004988b8();
  return;
}


 export function FUN_0049882b ()

 {
  let local_8;

  FUN_00498943();
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((DAT_00654b74[local_8 * 0x20] === 0)) {
      w32((DAT_00673d18 + local_8 * 4), 0, 0);
      w32((DAT_00673d38 + local_8 * 4), 0, 0);
    }
    else {
      w32((DAT_00673d18 + local_8 * 4), 0, 1);
      w32((DAT_00673d38 + local_8 * 4), 0, 1);
    }
  }
  FUN_004988b8();
  return;
}


 export function FUN_004988b8 ()

 {
  let cVar1;
  let local_10;
  let local_c;

  cVar1 = DAT_00654c73;
  for (/* cond: (local_10 < 0x100) */); local_c = (cVar1 << 5), local_10 = (local_10 < 0x100); local_10 = (local_10 + 1)) {
    cVar1 = DAT_00654b74[local_10];
    DAT_00654b74[local_10] = ((((((s8(DAT_00654b74[local_10]) >>> 3)) & 0xFF) & 0x1f) | local_c) ^ ((local_10) & 0xFF))
    ;
  }
  return;
}


 export function FUN_00498943 ()

 {
  let uVar1;
  let local_10;
  let local_8;

  local_8 = DAT_00654b74;
  for (/* cond: (-1 < local_10) */); -1 = (-1 < local_10); local_10 = (local_10 + -1)) {
    uVar1 = s8(local_8);
    DAT_00654b74[local_10] = (DAT_00654b74[local_10] ^ ((local_10) & 0xFF));
    local_8 = DAT_00654b74[local_10];
    DAT_00654b74[local_10] = ((DAT_00654b74[local_10] << 3) | ((((uVar1 >>> 5)) & 0xFF) & 7));
  }
  return;
}


 export function FUN_004989d3 (param_1, param_2, param_3)

 {
  let sVar1;
  let uVar2;
  let local_84;

  FUN_005f22d0(DAT_ffffff7c, (DAT_0064bcfa + param_2 * 0xf2));
  FUN_004af14b(DAT_ffffff7c, param_3);
  sVar1 = _strlen(DAT_ffffff7c);
  uVar2 = FUN_00498159((param_1 + 0x254), (sVar1 + 1));
  w32((param_1 + 0x134), 0, uVar2);
  FUN_005f22d0(s32((param_1 + 0x134), 0), DAT_ffffff7c);
  return;
}


 export function FUN_00498a5c (param_1)

 {
  let iVar1;

  if ((s32((DAT_00673d18 + param_1 * 4), 0) === 0)) {
    if ((DAT_00655b02 === 2)) {
      FUN_00498310(param_1);
    }
    else {
      DAT_00628044 = 1;
    }
  }
  else {
    do {
      DAT_00628044 = 1;
      iVar1 = FUN_004985f4(param_1);
      if ((iVar1 === 0)) {
        w32((DAT_00673d18 + param_1 * 4), 0, 0);
        return 1;
      }
    } while ((iVar1 === 1));
    if ((iVar1 === 2)) {
      DAT_00628044 = 0;
      return 0;
    }
  }
  return 1;
}


 export function FUN_00498d40 ()

 {
  let iVar1;
  let _Str1;
  let _Str2;
  let local_10;
  let local_c;

  DAT_0062ccc0 = 0;
  iVar1 = FUN_004a2379(s_CITYPREF.TXT_0062ccd4, s_NODEFEND_0062ccc8);
  if ((iVar1 === 0)) {
    DAT_0062ccc4 = 1;
  }
  FUN_004a2020();
  iVar1 = FUN_004a2379(s_CITYPREF.TXT_0062ccf0, s_AUTOBUILD_0062cce4);
  if ((iVar1 === 0)) {
    do {
      iVar1 = FUN_004a23fc(1);
      if ((iVar1 === 0));
      local_10 = -1;
      for (/* cond: (local_c < 0x27) */); local_c = (local_c < 0x27); local_c = (local_c + 1)) {
        _Str2 = DAT_00673e10;
        _Str1 = FUN_00428b0c(s32((DAT_0064c488 + local_c * 8), 0));
        iVar1 = __strcmpi(_Str1, _Str2);
        if ((iVar1 === 0)) {
          local_10 = local_c;
          break;
        }
      }
      if ((0 < local_10)) {
        w32(DAT_00673d70, DAT_0062ccc0, local_10);
        DAT_0062ccc0 = (DAT_0062ccc0 + 1);
      }
    } while (((DAT_0062ccc0 < 0x20) && (0 < local_10)));
    FUN_004a2020();
  }
  return;
}


 /* /*  WARNING: */  /* Type */  /* propagation */  /* algorithm */  /* not */

 /* settling  */ */ export function FUN_00498e8b (param_1, param_2, param_3)

 {
  let bVar1;
  let cVar2;
  let bVar3;
  let uVar4;
  let iVar5;
  let uVar6;
  let pbVar7;
  let iVar8;
  let uVar9;
  let local_380;
  let local_378;
  let local_374;
  let local_370;
  let aiStack_364;
  let local_26c;
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
  let local_240;
  let local_23c;
  let local_238;
  let local_234;
  let local_230;
  let local_22c;
  let local_228;
  let local_224;
  let local_220;
  let local_21c;
  let local_124;
  let local_120;
  let local_11c;
  let local_118;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;
  let local_104;
  let local_100;
  let local_fc;
  let local_f8;
  let local_f4;
  let local_f0;
  let local_ec;
  let local_e8;
  let local_e4;
  let local_e0;
  let local_dc;
  let local_d8;
  let local_d4;
  let local_d0;
  let auStack_cc;
  let local_b0;
  let local_ac;
  let local_a8;
  let local_a4;
  let local_a0;
  let local_9c;
  let local_98;
  let local_94;
  let local_90;
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

  local_100 = 0;
  if ((param_2 !== 0)) {
    w32(param_2, 0, 0x3e7);
  }
  if ((param_3 !== 0)) {
    w32(param_3, 0, 0x3e7);
  }
  FUN_004eb4ed(param_1, 0);
  bVar1 = DAT_0064f348[param_1 * 0x58];
  uVar4 = s8(bVar1);
  local_fc = FUN_005b8a81(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16));
  local_f8 = u8(DAT_0064ca32[(uVar4 * 0x594 + local_fc)]);
  if ((local_f8 === 1)) {
    local_b0 = 1;
  }
  else {
    local_b0 = 0;
  }
  if ((local_f8 === 4)) {
    local_b0 = 1;
  }
  iVar5 = FUN_00598d45(uVar4);
  local_54 = FUN_00598ceb();
  local_54 = (iVar5 + local_54);
  local_114 = 0;
  for (/* cond: (local_224 < ((DAT_00655b18) << 16 >> 16)) */); local_224 = (local_224 < ((DAT_00655b18) << 16 >> 16)); local_224 = (local_224 + 1)) {
    if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_224 * 0x58] & 0x1f))) !== 0)) {
      local_114 = (local_114 + 1);
    }
  }
  if (((s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + 1) < local_114)) {
    local_b0 = 1;
  }
  local_220 = ((DAT_006a65c8 - s8(DAT_0064f349[param_1 * 0x58]) * u8(DAT_0064bcca)) - DAT_006a65d8 * DAT_006a6608);
  local_60 = 0;
  local_48 = (DAT_006a65cc * 2 - DAT_006a6568);
  local_98 = (DAT_006a65d0 - DAT_006a6580);
  if ((0x27 < s16((DAT_0064f35c + param_1 * 0x58), 0))) {
    local_78 = 1;
  }
  else {
    local_78 = 0;
  }
  local_8c = 0;
  local_18 = 0;
  for (/* cond: (local_74 < 0x1c) */); local_74 = (local_74 < 0x1c); local_74 = (local_74 + 1)) {
    DAT_ffffff34[local_74] = 0;
    iVar5 = FUN_00453e18(local_74);
    if ((iVar5 === param_1)) {
      local_8c = (local_8c + 1);
    }
    iVar5 = FUN_00453e51(uVar4, local_74);
    if ((iVar5 !== 0)) {
      local_18 = (local_18 + 1);
    }
  }
  if ((((((s32((DAT_0064f344 + param_1 * 0x58), 0) >>> 8)) & 0xFF) & 0xc0) !== 0xc0)) {
    if ((DAT_006a65a8 === DAT_006a6550)) {
      local_d8 = 1;
    }
    else {
      local_d8 = 0;
    }
  }
  else {
    local_d8 = 2;
  }
  FUN_0043d07a(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16), uVar4, -2, -1);
  local_ac = DAT_0063f660;
  local_5c = -1;
  local_24c = 0;
  if ((DAT_006a65d8 === 0)) {
    local_24c = 1;
  }
  local_d4 = 0;
  local_24 = 0;
  for (/* cond: (local_50 < 0x14) */); local_50 = (local_50 < 0x14); local_50 = (local_50 + 1)) {
    local_dc = FUN_005ae052((((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) + s8(DAT_00628370[local_50])));
    local_ec = (((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) + s8(DAT_006283a0[local_50]));
    iVar5 = FUN_004087c0(local_dc, local_ec);
    if ((iVar5 !== 0)) {
      bVar3 = FUN_005b89bb(local_dc, local_ec);
      local_7c = u8(bVar3);
      if ((local_7c === 0xa)) {
        local_60 = (local_60 + 1);
        iVar5 = FUN_004e78ce(param_1, local_50);
        if ((iVar5 !== 0)) {
          local_60 = (local_60 + 3);
        }
      }
      local_70 = FUN_005b8d62(local_dc, local_ec);
      if ((s8(DAT_006560f7[local_258 * 0x20]) !== uVar4)) {
        iVar5 = FUN_005b50ad(local_258, 2);
        local_d4 = (local_d4 + iVar5);
      }
      bVar3 = FUN_005b94d5(local_dc, local_ec);
      if (((bVar3 & 0xc) === 0xc)) {
        local_24 = (local_24 + 1);
      }
      if ((DAT_00627cce[local_7c * 0x18] < 0)) {
        local_5c = local_50;
        iVar5 = FUN_005b8ee1(local_dc, local_ec);
        if ((local_7c === 1)) {
          local_24c = 0;
        }
      }
    }
  }
  if ((-1 < local_5c)) {
    local_dc = FUN_005ae052((((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16) + s8(DAT_00628370[local_5c])));
    local_ec = (((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16) + s8(DAT_006283a0[local_5c]));
    iVar5 = FUN_005b8931(local_dc, local_ec);
    if (((DAT_00655b0b & _MEM[(iVar5 + 4)]) === 0)) {
      local_d0 = 4;
      pbVar7 = FUN_005b8931(local_dc, local_ec);
      if (((_MEM[pbVar7] & 0x80) === 0)) {
        local_d0 = (local_d0 | 0x10);
      }
      FUN_005b94fc(local_dc, local_ec, local_d0, 1, 1);
      local_220 = (local_220 + 1);
    }
  }
  for (/* cond: (local_f4 < 0x3e) */); local_f4 = (local_f4 < 0x3e); local_f4 = (local_f4 + 1)) {
    w32(DAT_fffffde4, local_f4, 0);
    w32(DAT_fffffc9c, local_f4, 0);
  }
  local_238 = 0;
  local_6c = 0;
  local_e0 = 0;
  local_124 = 0;
  iVar5 = FUN_00453e51(uVar4, 7);
  if ((iVar5 === 0)) {
    local_268 = 0;
  }
  else {
    local_268 = 4;
  }
  local_260 = 0;
  local_f0 = 0;
  local_a4 = 0;
  local_40 = 0;
  local_64 = 0;
  local_234 = 0;
  local_104 = 0;
  for (/* cond: (local_224 < ((DAT_00655b18) << 16 >> 16)) */); local_224 = (local_224 < ((DAT_00655b18) << 16 >> 16)); local_224 = (local_224 + 1)) {
    if ((s32((DAT_0064f394 + local_224 * 0x58), 0) !== 0)) {
      if ((s8(DAT_0064f348[local_224 * 0x58]) === uVar4)) {
        iVar5 = FUN_0043d20a(local_224, 1);
        if ((local_104 < s8(DAT_0064f349[local_224 * 0x58]))) {
          local_104 = s8(DAT_0064f349[local_224 * 0x58]);
        }
        if ((local_224 !== param_1)) {
          if ((DAT_0064f391[param_1 * 0x58] < DAT_0064f391[local_224 * 0x58])) {
            local_260 = (local_260 + 1);
          }
          if ((DAT_0064f379[local_224 * 0x58] < 0xde)) {
            local_40 = (local_40 + 1);
          }
          iVar5 = FUN_005b8a81(((s16((DAT_0064f340 + local_224 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_224 * 0x58), 0)) << 16 >> 16));
          if ((iVar5 === local_fc)) {
            iVar5 = FUN_0043d20a(local_224, 2);
            if ((iVar5 !== 0)) {
              local_268 = (local_268 + 1);
            }
            iVar5 = FUN_0043d20a(local_224, 0x20);
            if ((iVar5 !== 0)) {
              local_6c = (local_6c + 1);
            }
            iVar5 = FUN_0043d20a(local_224, 0x22);
            if ((iVar5 !== 0)) {
              local_e0 = (local_e0 + 1);
            }
            if ((DAT_0064f379[local_224 * 0x58] === 0xfe)) {
              local_268 = (local_268 + 1);
            }
            if ((DAT_0064f379[local_224 * 0x58] < 0xda)) {
              local_238 = (local_238 + 1);
              if ((DAT_0064f391[param_1 * 0x58] < DAT_0064f391[local_224 * 0x58])) {
                _MEM[(DAT_ffffff0c + (1 - s8(DAT_0064f379[local_224 * 0x58])))] = (_MEM[(DAT_ffffff0c + (1 - s8(DAT_0064f379[local_224 * 0x58])))] | (((1 << (bVar1 & 0x1f))) & 0xFF));
              }
              if ((((u8(DAT_0064c48c[s8(DAT_0064f379[local_224 * 0x58]) * -8]) * DAT_006a657c - ((s16((DAT_0064f35c + local_224 * 0x58), 0)) << 16 >> 16)) === 0) || (u8(DAT_0064c48c[s8(DAT_0064f379[local_224 * 0x58]) * -8]) * DAT_006a657c < ((s16((DAT_0064f35c + local_224 * 0x58), 0)) << 16 >> 16)))) {
                _MEM[(DAT_ffffff0c + (1 - s8(DAT_0064f379[local_224 * 0x58])))] = (_MEM[(DAT_ffffff0c + (1 - s8(DAT_0064f379[local_224 * 0x58])))] | 1);
              }
            }
            if ((0xff < DAT_0064f379[local_224 * 0x58])) {
              w32(DAT_fffffde4, s8(DAT_0064f379[local_224 * 0x58]), (s32(DAT_fffffde4, s8(DAT_0064f379[local_224 * 0x58])) + 1));
            }
          }
        }
      }
      else {
        if ((DAT_0064f379[param_1 * 0x58] === DAT_0064f379[local_224 * 0x58])) {
          local_a4 = (local_a4 + 1);
        }
        if ((DAT_0064f379[local_224 * 0x58] < 0xda)) {
          _MEM[(DAT_ffffff0c + (1 - s8(DAT_0064f379[local_224 * 0x58])))] = (_MEM[(DAT_ffffff0c + (1 - s8(DAT_0064f379[local_224 * 0x58])))] | (((1 << (DAT_0064f348[local_224 * 0x58] & 0x1f))) & 0xFF));
        }
        if ((DAT_0064f379[local_224 * 0x58] < 0xde)) {
          local_64 = (local_64 + 1);
        }
      }
    }
  }
  local_120 = 0;
  local_4c = 0;
  for (/* cond: (local_258 < ((DAT_00655b16) << 16 >> 16)) */); local_258 = (local_258 < ((DAT_00655b16) << 16 >> 16)); local_258 = (local_258 + 1)) {
    if ((s8(DAT_006560f7[local_258 * 0x20]) === uVar4)) {
      local_124 = (local_124 + 1);
      if ((DAT_0064b1ca[local_f4 * 0x14] === 5)) {
        if (((s16((DAT_006560f4 + local_258 * 0x20), 0) & 0x200) !== 0)) {
          local_120 = (local_120 + 1);
        }
        if ((DAT_00656100[local_258 * 0x20] === 0xff)) {
          local_4c = (local_4c + 1);
          goto LAB_00499ca3;
        }
      }
      iVar5 = FUN_005b8a81(((s16((DAT_006560f0 + local_258 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_258 * 0x20), 0)) << 16 >> 16));
      if ((iVar5 === local_fc)) {
        w32(DAT_fffffc9c, u8(DAT_006560f6[local_258 * 0x20]), (s32(DAT_fffffc9c, u8(DAT_006560f6[local_258 * 0x20])) + 1));
      }
    }
 LAB_00499ca3: :
  }
  if ((2 < DAT_0064f349[param_1 * 0x58])) {
    local_30 = 0x270f;
    for (/* cond: (local_224 < ((DAT_00655b18) << 16 >> 16)) */); local_224 = (local_224 < ((DAT_00655b18) << 16 >> 16)); local_224 = (local_224 + 1)) {
      if ((local_68 < local_30)) {
        local_30 = local_68;
      }
    }
    if ((8 < local_30)) {
      local_100 = 1;
    }
    if ((local_f8 !== 0)) {
      local_100 = (local_100 + 1);
    }
  }
  local_3c = 0;
  for (/* cond: (local_50 < 0x10) */); local_50 = (local_50 < 0x10); local_50 = (local_50 + 1)) {
    if ((iVar5 === local_fc)) {
      local_3c = (local_3c + 1);
    }
  }
  if ((local_b0 !== 0)) {
    local_3c = (local_3c + (local_3c >> 1));
  }
  if ((param_3 === 0)) {
    for (/* cond: (-1 < local_f4) */); -1 = (-1 < local_f4); local_f4 = (local_f4 + -1)) {
      if ((iVar5 !== 0)) {
        return local_f4;
      }
    }
  }
  if ((uVar4 === 0)) {
    if ((DAT_0064f379[param_1 * 0x58] < 1)) {
      if ((DAT_00655b9e !== 0)) {
        return 0x13;
      }
      return 5;
    }
    local_f4 = s8(DAT_0064f379[param_1 * 0x58]);
    local_118 = s8(DAT_0064b1c0[local_f4 * 0x14]);
    if ((local_118 < 0)) {
      return local_f4;
    }
    if ((DAT_00655b08 === 0)) {
      return local_f4;
    }
    iVar5 = FUN_005ae006(s8(DAT_00655b82[local_118]));
    if ((iVar5 < 2)) {
      return local_f4;
    }
    if ((DAT_00655b08 < 4)) {
      return local_f4;
    }
    local_50 = 0;
    while ((DAT_0064b1ca[local_f4 * 0x14] === DAT_0064b1ca[local_50 * 0x14])) {
      if ((0x3d < local_50)) {
        return local_f4;
      }
      if ((DAT_0064b1ca[local_f4 * 0x14] === DAT_0064b1ca[local_50 * 0x14]));
    }
    return local_50;
  }
  local_34 = 0;
  if ((local_f8 === 4)) {
    for (/* cond: (local_70 < 8) */); local_70 = local_70; local_70 = (local_70 + 1)) {
      if ((DAT_0064c932[(local_70 * 0x594 + local_fc)] === 0)) {
        local_34 = 1;
      }
    }
  }
  local_250 = 0;
  local_264 = 0;
  local_80 = 0;
  local_258 = FUN_005b2e69(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16));
  local_a8 = FUN_005b53b6(local_258, 1);
  iVar5 = FUN_005b53b6(local_258, 4);
  local_22c = FUN_005b53b6(local_258, 2);
  local_22c = ((iVar5 >> 1) + local_22c);
  if ((local_a8 < 1)) {
    local_264 = 2;
    local_80 = 2;
  }
  else {
    if ((iVar5 === 0)) {
      local_14 = 4;
    }
    else {
      local_14 = 3;
    }
    iVar5 = FUN_0043d20a(param_1, 1);
    if ((iVar5 === 0)) {
      if ((local_250 === 0)) {
        local_14 = (local_14 + 1);
      }
    }
    else {
      local_14 = (local_14 + -1);
    }
    if ((DAT_0064c9f2[(uVar4 * 0x594 + local_fc)] === 0)) {
      local_370 = 0;
    }
    else {
      local_370 = 1;
    }
    local_108 = (local_370 + (s8(DAT_0064f349[param_1 * 0x58]) / local_14 | 0));
    iVar5 = FUN_0043d20a(param_1, 1);
    uVar6 = local_108;
    if ((iVar5 !== 0)) {
      local_d0 = 1;
      if ((3 < DAT_0064f349[param_1 * 0x58])) {
        local_d0 = 2;
      }
      if ((7 < s16((DAT_0064c708 + uVar4 * 0x594), 0))) {
        local_d0 = 3;
      }
      if ((0xb < s16((DAT_0064c708 + uVar4 * 0x594), 0))) {
        local_d0 = 4;
      }
      uVar6 = local_d0;
      if ((local_d0 <= local_108)) {
        uVar6 = local_108;
      }
    }
    local_108 = uVar6;
    if (((local_a8 + 1) < local_108)) {
      local_264 = 1;
    }
  }
  if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    iVar5 = FUN_00453e51(uVar4, 0);
    if ((iVar5 !== 0)) {
      FUN_0043d289(param_1, 3, 0);
      w32((DAT_0064c6a2 + uVar4 * 0x594), 0, (s32((DAT_0064c6a2 + uVar4 * 0x594), 0) + u8(DAT_0064c4a4) * DAT_006a657c));
    }
    iVar5 = FUN_00453e51(uVar4, 0x1a);
    if ((iVar5 !== 0)) {
      FUN_0043d289(param_1, 0x1a, 0);
      w32((DAT_0064c6a2 + uVar4 * 0x594), 0, (s32((DAT_0064c6a2 + uVar4 * 0x594), 0) + u8(DAT_0064c55c) * DAT_006a657c));
    }
    iVar5 = FUN_00453e51(uVar4, 0x15);
    if ((iVar5 !== 0)) {
      FUN_0043d289(param_1, 0x21, 0);
      w32((DAT_0064c6a2 + uVar4 * 0x594), 0, (s32((DAT_0064c6a2 + uVar4 * 0x594), 0) + u8(DAT_0064c594) * DAT_006a657c));
    }
    iVar5 = FUN_00453e51(uVar4, 0xa);
    if ((iVar5 !== 0)) {
      FUN_0043d289(param_1, 0xb, 0);
      w32((DAT_0064c6a2 + uVar4 * 0x594), 0, (s32((DAT_0064c6a2 + uVar4 * 0x594), 0) + u8(DAT_0064c4e4) * DAT_006a657c));
    }
    iVar5 = FUN_0043d20a(param_1, 0x20);
    if ((local_f8 !== 5)) {
      for (/* cond: (local_224 < ((DAT_00655b18) << 16 >> 16)) */); local_224 = (local_224 < ((DAT_00655b18) << 16 >> 16)); local_224 = (local_224 + 1)) {
        if ((iVar5 === 0)) {
          iVar5 = FUN_005b8a81(((s16((DAT_0064f340 + local_224 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_224 * 0x58), 0)) << 16 >> 16));
          if ((iVar5 === local_fc)) {
            if ((1 < local_80)) {
 LAB_0049a9d5: :
              local_258 = FUN_005b2e69(((s16((DAT_0064f340 + local_224 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_224 * 0x58), 0)) << 16 >> 16));
              if (((3 - u8((cVar2 === 4))) <= iVar5)) {
    local_258 = FUN_005b2c82(local_258);
  }
  if ((-1 < local_258)) {
    w32((DAT_0064f344 + param_1 * 0x58), 0, (s32((DAT_0064f344 + param_1 * 0x58), 0) | 0x10000));
    w32((DAT_0064f344 + local_224 * 0x58), 0, (s32((DAT_0064f344 + local_224 * 0x58), 0) | 0x10000));
    FUN_005b6787(local_258);
    FUN_005b36df(local_258, ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16), 1);
    local_84 = local_258;
    local_230 = 0;
    for (/* cond: (local_258 < ((DAT_00655b16) << 16 >> 16)) */); local_258 = (local_258 < ((DAT_00655b16) << 16 >> 16)); local_258 = (local_258 + 1)) {
      if (((DAT_0064c6c1[(s8(DAT_006560f7[local_258 * 0x20]) * 0x594 + uVar4 * 4)] & 0x20) !== 0)) {
        iVar5 = FUN_005ae1b0(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_006560f0 + local_258 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_258 * 0x20), 0)) << 16 >> 16));
        iVar8 = FUN_005b2a39(local_258);
        if (((iVar8 / u8(DAT_0064bcc8) | 0) < iVar5)) {
          iVar5 = FUN_005ae1b0(((s16((DAT_0064f340 + local_224 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_224 * 0x58), 0)) << 16 >> 16), ((s16((DAT_006560f0 + local_258 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_258 * 0x20), 0)) << 16 >> 16));
          iVar8 = FUN_005b2a39(local_258);
          if (((iVar8 / u8(DAT_0064bcc8) | 0) < iVar5));
        if ((iVar5 === 0)) {
          FUN_005b4391(local_84, 1);
          local_84 = -1;
          break;
        }
        local_230 = (local_230 + 1);
      }
 LAB_0049aba3: :
    }
    if ((local_84 < 0)) {
      FUN_0040ff60(0, (DAT_0064f360 + param_1 * 0x58));
      FUN_00421ea0(s_WESHOT_0062cd00);
    }
    else if ((local_230 !== 0)) {
      FUN_0040ff60(0, (DAT_0064f360 + param_1 * 0x58));
      FUN_00421ea0(s_WESAW_0062cd08);
    }
  }
 LAB_0049ae3e: :
  local_20 = 0x3e7;
  local_26c = 0x3e7;
  local_30 = 0x3e7;
  local_254 = 0x3e7;
  local_240 = 0x3e7;
  local_58 = 0x3e7;
  for (/* cond: (local_244 < 0x27) */); local_244 = (local_244 < 0x27); local_244 = (local_244 + 1)) {
    iVar5 = FUN_004c03ae(uVar4, param_1, local_244);
    if ((iVar5 !== 0)) {
      local_1c = 0x3e7;
      local_90 = 0;
      if (((local_244 - 1) < 0x23)) {
        iVar5 = (local_220 >> 1);
        /* switch */ () {
        case 1 :
          if ((3 < DAT_006a656c)) {
            local_1c = 2;
            if ((9 < DAT_0064f349[local_224 * 0x58])) {
              local_1c = 1;
            }
            if ((0xe < DAT_0064f349[local_224 * 0x58])) {
              local_1c = (local_1c - 1);
            }
            if ((3 < DAT_006a656c)) {
              local_90 = local_b0;
            }
          }
          break;
        case 2 :
          local_1c = (((s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + local_268) + 4) - s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]));
          if (((s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])) !== 0)) {
            local_1c = (local_1c + local_268);
          }
          local_90 = 1;
          if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            if ((DAT_00655b08 === 3)) {
              local_1c = (local_1c * 3 / 2 | 0);
            }
            if ((3 < DAT_00655b08)) {
              local_1c = (local_1c << 1);
            }
          }
          break;
        case 3 :
          iVar5 = FUN_00453e51(uVar4, 0);
          if ((iVar5 === 0)) {
            if ((DAT_006a65cc < 3)) {
              local_1c = 8;
            }
            else {
              local_1c = 4;
            }
            if ((DAT_006a6550 <= DAT_006a65a8)) {
              local_1c = (local_1c + 2);
            }
            if ((0 < local_d0)) {
              local_1c = (local_1c + local_d0);
            }
          }
          break;
        case 4 :
          if ((local_d8 === 1)) {
            local_1c = 9;
          }
          if ((local_d8 === 2)) {
            local_1c = -5;
          }
          break;
        case 5 :
          local_1c = FUN_005adfa0((0xa - (local_98 >> 1)), 1, 0xa);
          if ((local_d8 === 1)) {
            local_1c = (local_1c - 1);
          }
          if ((local_d8 === 2)) {
            local_1c = -4;
          }
          break;
        case 6 :
          local_1c = FUN_005adfa0((0xa - (local_98 / 3 | 0)), 1, 0xa);
          break;
        case 7 :
          local_1c = (0xe - (DAT_006a656c * 2 + DAT_006a6580));
          if ((DAT_0064c6b5[uVar4 * 0x594] === 6)) {
            if ((local_d8 === 2)) {
              local_1c = -1;
            }
          }
          else if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
            local_1c = (local_1c - (((s16((DAT_0064c6bc + u8(DAT_00655c20) * 0x594), 0)) << 16 >> 16) / 2 | 0));
          }
          break;
        case 8 :
          iVar5 = FUN_00453e51(uVar4, 6);
          if ((iVar5 === 0)) {
            local_1c = (0xa - (s8(DAT_0064f349[param_1 * 0x58]) >> 1));
            for (/* cond: (local_228 < 8) */); local_228 = (local_228 < 8); local_228 = (local_228 + 1)) {
              if ((((1 << (((local_228) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
                if (((s32((DAT_0064c6c0 + (uVar4 * 0x594 + local_228 * 4)), 0) & 0x2010) !== 0)) {
                  local_1c = (local_1c + -2);
                }
                if ((DAT_0064c932[(local_228 * 0x594 + local_fc)] !== 0)) {
                  local_1c = (local_1c + -1);
                }
              }
            }
            if ((DAT_00655bca !== 0)) {
              local_1c = (local_1c + 2);
            }
            if ((DAT_00655b82 !== 0)) {
              local_1c = (local_1c + 2);
            }
            if ((DAT_00655bcb !== 0)) {
              local_1c = (local_1c + 2);
            }
            local_1c = FUN_005adfa0(local_1c, 1, 0xa);
            iVar5 = FUN_0043d20a(param_1, 1);
            if ((iVar5 !== 0)) {
              local_1c = (local_1c - 4);
            }
            local_90 = 1;
          }
          break;
        case 9 :
          if (((u8(DAT_0064bcd1) - iVar5) <= s8(DAT_0064f349[param_1 * 0x58]))) {
            local_1c = (((u8(DAT_0064bcd1) + 4) - s8(DAT_0064f349[param_1 * 0x58])) - iVar5);
            local_1c = FUN_005adfa0(local_1c, 1, 0x14);
          }
          break;
        case 10 :
          local_1c = FUN_005adfa0((0xa - (local_98 / 3 | 0)), 1, 0xa);
          if ((local_d8 === 1)) {
            local_1c = (local_1c - 1);
          }
          if ((local_d8 === 2)) {
            local_1c = 0;
          }
          break;
        case 0xb :
          iVar5 = FUN_00453e51(uVar4, 0xa);
          if ((iVar5 === 0)) {
            if ((local_d8 === 1)) {
              local_1c = 8;
            }
            if ((local_d8 === 2)) {
              local_1c = -3;
            }
          }
          break;
        case 0xc :
          if ((iVar5 === 0)) {
            local_1c = FUN_005adfa0((0xa - (local_98 >> 2)), 2, 0xa);
          }
          break;
        case 0xd :
          break;
        case 0xe :
          if ((local_d8 === 2)) {
            local_1c = -2;
          }
          break;
        case 0xf :
        case 0x14 :
          local_1c = FUN_005adfa0((0xe - DAT_006a65cc), 1, 0xe);
          break;
        default :
          local_1c = FUN_005adfa0((0xc - ((DAT_006a65cc + ((DAT_006a65cc >> 0x1f) & 3)) >> 2)), 2, 0xc);
          break;
        case 0x11 :
          if ((local_d8 < 2)) {
            iVar5 = FUN_005adfa0((0xf - s8(DAT_0064f349[param_1 * 0x58])), 1, 0xf);
            local_1c = ((iVar5 + 1) / 2 | 0);
            if ((DAT_00655c14 === 0xffff)) {
              local_1c = (local_1c << 1);
            }
            if ((DAT_0064c7a5[u8(DAT_00655c20) * 0x594] === 0)) {
              local_1c = (local_1c << 1);
            }
            if ((9 < DAT_0064f349[param_1 * 0x58])) {
              local_1c = (local_1c - 1);
            }
            iVar5 = FUN_0043d20a(param_1, 1);
            if ((iVar5 !== 0)) {
              local_1c = 0;
            }
          }
          local_90 = 1;
          break;
        case 0x13 :
          local_1c = FUN_005adfa0((0xc - (DAT_006a65cc / 5 | 0)), 2, 0xe);
          break;
        case 0x16 :
          if ((local_54 < 2)) {
            local_1c = FUN_005adfa0((0xb - (local_98 >> 2)), 2, 0xb);
            if ((local_d8 === 1)) {
              local_1c = (local_1c - 1);
            }
            if ((local_d8 === 2)) {
              local_1c = 0;
            }
          }
          break;
        case 0x17 :
          if (((u8(DAT_0064bcd2) - iVar5) <= s8(DAT_0064f349[param_1 * 0x58]))) {
            local_1c = (((u8(DAT_0064bcd2) + 4) - s8(DAT_0064f349[param_1 * 0x58])) - iVar5);
            local_1c = FUN_005adfa0(local_1c, 1, 0x14);
          }
          break;
        case 0x18 :
          local_1c = ((((0xe - (s8(DAT_0064f349[param_1 * 0x58]) >> 1)) + local_24 * -2) + local_54 * 2) + iVar5);
          local_1c = FUN_005adfa0(local_1c, 2, 0xe);
          break;
        case 0x19 :
          local_1c = ((0xf - (s8(DAT_0064f349[param_1 * 0x58]) >> 1)) + local_54 * 6);
          local_1c = FUN_005adfa0(local_1c, 2, 0xf);
          break;
        case 0x1a :
          if ((DAT_0064c6b3[uVar4 * 0x594] !== 0)) {
            local_1c = FUN_005adfa0((0xb - (local_98 >> 2)), 2, 0xa);
          }
          break;
        case 0x1b :
          local_10 = (((u8(DAT_0064c797[u8(DAT_00655c20) * 0x594]) * 2 + u8(DAT_0064c794[u8(DAT_00655c20) * 0x594]) * 2) + u8(DAT_0064c7a4[u8(DAT_00655c20) * 0x594])) + u8(DAT_0064c795[u8(DAT_00655c20) * 0x594])) * 2;
          if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            local_10 = 0;
            for (/* cond: (local_70 < 8) */); local_70 = local_70; local_70 = (local_70 + 1)) {
              if ((local_70 !== uVar4)) {
                local_d0 = (((u8(DAT_0064c7a4[local_70 * 0x594]) + u8(DAT_0064c794[local_70 * 0x594])) + u8(DAT_0064c795[local_70 * 0x594])) + u8(DAT_0064c797[local_70 * 0x594]));
                if (((DAT_0064c6c0[(uVar4 * 4 + local_70 * 0x594)] & 0x10) === 0)) {
                  local_d0 = (local_d0 / 2 | 0);
                }
                local_10 = (local_10 + local_d0);
              }
            }
          }
          local_1c = (0xc - local_10);
          local_1c = FUN_005adfa0(local_1c, 1, 0xc);
          if (((DAT_0064f346[param_1 * 0x58] & 4) !== 0)) {
            local_1c = (local_1c - 3);
          }
          local_90 = 1;
          for (/* cond: (local_228 < 8) */); local_228 = (local_228 < 8); local_228 = (local_228 + 1)) {
            if (((DAT_0064c6c1[(uVar4 * 0x594 + local_228 * 4)] & 0x20) !== 0)) {
              local_90 = u8((local_b0 !== 0));
              break;
            }
          }
          break;
        case 0x1c :
          iVar5 = FUN_0044263f(param_1, 1);
          if ((iVar5 !== 0)) {
            local_10 = ((((u8(DAT_0064c79e[u8(DAT_00655c20) * 0x594]) * 3 + u8(DAT_0064c79f[u8(DAT_00655c20) * 0x594]) * 3) + u8(DAT_0064c7a0[u8(DAT_00655c20) * 0x594]) * 5) + u8(DAT_0064c79c[u8(DAT_00655c20) * 0x594])) + u8(DAT_0064c79d[u8(DAT_00655c20) * 0x594]));
            if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
              local_10 = 0;
              for (/* cond: (local_70 < 8) */); local_70 = local_70; local_70 = (local_70 + 1)) {
                if ((local_70 !== uVar4)) {
                  local_d0 = (((((u8(DAT_0064c79c[local_70 * 0x594]) >> 1) + (u8(DAT_0064c79d[local_70 * 0x594]) >> 1)) + u8(DAT_0064c7a0[local_70 * 0x594]) * 2) + u8(DAT_0064c79e[local_70 * 0x594])) + u8(DAT_0064c79f[local_70 * 0x594]));
                  if (((DAT_0064c6c0[(uVar4 * 4 + local_70 * 0x594)] & 0x10) === 0)) {
                    local_d0 = (local_d0 / 2 | 0);
                  }
                  local_10 = (local_10 + local_d0);
                }
              }
            }
            local_1c = (0xc - local_10);
            local_1c = FUN_005adfa0(local_1c, 1, 0xc);
            local_90 = 1;
            for (/* cond: (local_228 < 8) */); local_228 = (local_228 < 8); local_228 = (local_228 + 1)) {
              if (((DAT_0064c6c1[(uVar4 * 0x594 + local_228 * 4)] & 0x20) !== 0)) {
                local_90 = u8((local_b0 !== 0));
                break;
              }
            }
          }
          break;
        case 0x1d :
          break;
        case 0x1e :
          if ((local_220 < 1)) {
            local_1c = (local_1c / 2 | 0);
          }
          break;
        case 0x1f :
          if ((local_d8 < 2)) {
            local_1c = (0x10 - local_60);
            local_1c = FUN_005adfa0(local_1c, 2, 0x10);
            if ((0 < local_1c)) {
              iVar5 = FUN_0043d20a(param_1, 0xf);
              if ((iVar5 !== 0)) {
                local_1c = (local_1c / 2 | 0);
              }
              iVar5 = FUN_0043d20a(param_1, 0x10);
              if ((iVar5 !== 0)) {
                local_1c = (local_1c / 2 | 0);
              }
            }
            if (((s8(DAT_0064f349[local_224 * 0x58]) / 2 | 0) <= ((local_60 + ((local_60 >> 0x1f) & 3)) >> 2))) {
              local_1c = (local_1c - 2);
            }
          }
          break;
        case 0x20 :
          local_1c = ((local_6c * 4 + 4) - s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]));
          if ((DAT_0064ca32[(uVar4 * 0x594 + local_fc)] === 4)) {
            local_1c = (local_1c / 2 | 0);
          }
          iVar5 = FUN_004bd9f0(uVar4, 0);
          if ((iVar5 === 0)) {
            local_1c = (local_1c << 1);
          }
          if ((u8(DAT_0064c932[(uVar4 * 0x594 + local_fc)]) < local_1c)) {
            local_1c = u8(DAT_0064c932[(uVar4 * 0x594 + local_fc)]);
          }
          iVar5 = FUN_0043d20a(param_1, 1);
          if ((-1 < local_1c)) {
            local_1c = 0;
          }
          local_90 = local_b0;
          break;
        case 0x21 :
          iVar5 = FUN_00453e51(uVar4, 0x15);
          if ((iVar5 === 0)) {
            local_d0 = DAT_006a65e4;
            if ((5 < DAT_0064c6b5[uVar4 * 0x594])) {
              local_d0 = (DAT_006a65e4 << 1);
            }
            if (((DAT_006a6550 - DAT_006a65a8) < 2)) {
              local_d0 = (local_d0 + 2);
            }
            local_1c = (0xa - local_d0);
          }
          break;
        case 0x22 :
          iVar5 = FUN_0044263f(param_1, 1);
          if ((iVar5 !== 0)) {
            iVar5 = local_ac;
            if ((0x27 < local_ac)) {
              iVar5 = 0x28;
            }
            local_1c = (((0xb - (iVar5 >> 2)) + local_22c * -5) + ((local_e0 * 2 - s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])) + s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])));
            local_1c = FUN_005adfa0(local_1c, 2, 0xf);
            if ((DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30] < 0)) {
              local_1c = (local_1c + local_e0);
            }
          }
          break;
        case 0x23 :
          iVar5 = FUN_004a7577(uVar4);
          if ((s16((DAT_0064caa8 + uVar4 * 0x594), 0) < 0x26)) {
            local_1c = 4;
            for (/* cond: (local_228 < 8) */); local_228 = (local_228 < 8); local_228 = (local_228 + 1)) {
              if ((iVar5 !== 0)) {
                local_1c = 2;
                break;
              }
            }
            if (((DAT_0064c9f2[(uVar4 * 0x594 + local_fc)] & 0x10) === 0)) {
              local_90 = local_b0;
            }
            local_248 = 0;
            if (((DAT_00655af0 & 2) === 0)) {
              for (/* cond: (local_228 < 8) */); local_228 = (local_228 < 8); local_228 = (local_228 + 1)) {
                if ((iVar5 !== 0)) {
                  local_248 = 1;
                  break;
                }
              }
            }
            if ((DAT_00655b08 !== 0)) {
              uVar6 = (local_1c - 1);
              if ((local_248 !== 0)) {
                uVar6 = (local_1c - 2);
              }
              local_1c = uVar6;
              if ((local_264 === 0)) {
                local_90 = local_b0;
              }
            }
            local_88 = 0;
            local_10c = 0;
            for (/* cond: (local_94 < 6) */); local_94 = (local_94 < 6); local_94 = (local_94 + 1)) {
              local_110 = FUN_005adfa0(((local_94 + 1) / 2 | 0), 0, 2);
              local_10c = (local_10c + ((s16((DAT_0064caa8 + (uVar4 * 0x594 + local_94 * 2)), 0)) << 16 >> 16) * u8(DAT_0064c5a4[local_110 * 8]));
              local_88 = (local_88 + ((s16((DAT_0064caa8 + (u8(DAT_00655c20) * 0x594 + local_94 * 2)), 0)) << 16 >> 16) * u8(DAT_0064c5a4[local_110 * 8]));
            }
            if ((0x13 < local_48)) {
              local_30 = 0x3e7;
            }
          }
        }
      }
      if ((local_1c < 0x190)) {
        local_1c = ((((-u8((local_b0 === local_90))) & -10) + 0x14) * local_1c * 3 / (s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + 3) | 0);
      }
      else {
        local_1c = 0x3fff;
      }
      iVar5 = FUN_0043d20a(param_1, 2);
      if ((iVar5 !== 0)) {
        local_1c = (local_1c + (local_1c / ((local_268 >> 1) + 3) | 0));
      }
      iVar5 = FUN_00453e18(0xd);
      if ((iVar5 === param_1)) {
        local_1c = (local_1c + (local_1c / 3 | 0));
      }
      if ((local_1c < local_30)) {
        local_30 = local_1c;
        local_58 = (-local_244);
      }
      if ((local_1c < local_20)) {
        local_20 = local_1c;
        local_254 = (-local_244);
      }
    }
  }
  if ((DAT_0062ccc0 !== 0)) {
    for (/* cond: (local_50 < DAT_0062ccc0) */); local_50 = (local_50 < DAT_0062ccc0); local_50 = (local_50 + 1)) {
      local_244 = s32(DAT_00673d70, local_50);
      iVar5 = FUN_0043d20a(param_1, local_244);
      if ((iVar5 !== 0)) {
        local_254 = (-local_244);
        local_58 = (-local_244);
        goto LAB_0049ea4a;
      }
    }
  }
  if (((4 - s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])) <= ((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16))) {
    for (/* cond: (local_74 < 0x1c) */); local_74 = (local_74 < 0x1c); local_74 = (local_74 + 1)) {
      local_244 = (local_74 + 0x27);
      iVar5 = FUN_004c03ae(uVar4, param_1, local_244);
      if ((iVar5 !== 0)) {
        local_90 = 0;
        if ((local_f8 === 4)) {
          local_90 = local_b0;
        }
        iVar5 = (((local_18 + local_8c) + 8) - (s32((DAT_0064c6a2 + uVar4 * 0x594), 0) / 0xc8 | 0));
        if ((iVar5 < 2)) {
          iVar5 = 1;
        }
        local_28 = (local_74 / 7 | 0);
        local_1c = (iVar5 + u8(DAT_0064c6b7[(uVar4 * 0x594 + local_28)]));
        if ((DAT_00673af8[local_28] < DAT_0064c6b7[(uVar4 * 0x594 + local_28)])) {
          local_1c = ((iVar5 + u8(DAT_0064c6b7[(uVar4 * 0x594 + local_28)])) + 2);
        }
        if ((DAT_0064c6b7[(uVar4 * 0x594 + local_28)] < DAT_0064c6b7[(u8(DAT_00655c21) * 0x594 + local_28)])) {
          local_1c = (local_1c + -1);
        }
        if (((DAT_00655b0b & DAT_00655b82[local_a0]) !== 0)) {
          if ((local_74 !== 0x17)) {
            if ((DAT_00655b08 < 2)) {
              for (/* cond: (local_224 < ((DAT_00655b18) << 16 >> 16)) */); local_224 = (local_224 < ((DAT_00655b18) << 16 >> 16)); local_224 = (local_224 + 1)) {
                if ((s8(DAT_0064f379[local_224 * 0x58]) === (-local_244))) {
                  local_1c = 0x3e7;
                }
              }
              if ((local_1c === 0x3e7));
            if (((DAT_00655b0b & DAT_00655bcb) === 0));
          /* switch */ () {
          case 0 :
            uVar6 = (local_1c - (s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) * 3 + 2));
            break;
          case 1 :
            uVar6 = (local_1c - ((((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16) / 3 | 0) + 1));
            break;
          case 2 :
            iVar5 = FUN_0043d20a(param_1, 1);
            if ((iVar5 !== 0)) {
              local_1c = (local_1c + -1);
            }
            iVar5 = FUN_0043d20a(param_1, 5);
            if ((iVar5 !== 0)) {
              local_1c = (local_1c + -1);
            }
            uVar6 = (local_1c - (s8(DAT_0064f349[param_1 * 0x58]) / 3 | 0));
            break;
          case 3 :
            uVar6 = (local_1c - (((u8(DAT_0064c799[uVar4 * 0x594]) + 2) + u8(DAT_0064c798[uVar4 * 0x594])) >> 2));
            break;
          case 4 :
            for (/* cond: (local_44 < 8) */); uVar6 = local_1c, local_44 = local_44; local_44 = (local_44 + 1)) {
              if ((DAT_0064c6b0[local_44 * 0x594] < DAT_0064c6b0[uVar4 * 0x594])) {
                if ((((1 << (((local_44) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
                  uVar6 = (local_1c + 1);
                }
              }
              else {
                uVar6 = (local_1c + -1);
                if (((u8(DAT_0064c6b0[uVar4 * 0x594]) + 5) < u8(DAT_0064c6b0[local_44 * 0x594]))) {
                  uVar6 = (local_1c + -3);
                }
              }
              local_1c = uVar6;
            }
            break;
          case 5 :
            uVar6 = (local_1c - (((((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16) + ((((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16) >> 0x1f) & 3)) >> 2) - (((DAT_00655af8) << 16 >> 16) / 0x19 | 0)));
            break;
          case 6 :
            uVar6 = (local_1c + s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) * -2);
            break;
          case 7 :
            uVar6 = (local_1c - (((s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) * 3 + s8(DAT_006554f9[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])) + s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) * -2) + 1));
            break;
          case 8 :
            iVar5 = FUN_005adfa0((DAT_006a65cc * 2 / 3 | 0), 0, 3);
            uVar6 = (local_1c - iVar5);
            break;
          case 9 :
            for (/* cond: (local_228 < 8) */); uVar6 = local_1c, local_228 = (local_228 < 8); local_228 = (local_228 + 1)) {
              if ((((1 << (((local_228) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
                if (((DAT_0064c6c0[(uVar4 * 0x594 + local_228 * 4)] & 8) !== 0)) {
                  local_1c = (local_1c + -1);
                }
                if (((DAT_0064c6c0[(uVar4 * 0x594 + local_228 * 4)] & 6) !== 0)) {
                  local_1c = (local_1c + -1);
                }
              }
            }
            break;
          case 10 :
            uVar6 = (local_1c - ((((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16) + ((((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16) >> 0x1f) & 3)) >> 2));
            break;
          case 0xb :
            local_1c = ((local_1c - ((local_98 + ((local_98 >> 0x1f) & 7)) >> 3)) + -1);
            iVar5 = FUN_0043d20a(param_1, 1);
            uVar6 = local_1c;
            if ((iVar5 !== 0)) {
              uVar6 = (local_1c + -1);
            }
            break;
          case 0xc :
            local_2c = 0;
            for (/* cond: (local_f4 < 0x3e) */); local_f4 = (local_f4 < 0x3e); local_f4 = (local_f4 + 1)) {
              if ((DAT_0064b1c1[local_f4 * 0x14] === 2)) {
                local_2c = (local_2c + u8(DAT_0064c778[(uVar4 * 0x594 + local_f4)]));
              }
            }
            uVar6 = (local_1c - (((local_2c + 3) + (((local_2c + 3) >> 0x1f) & 3)) >> 2));
            break;
          case 0xd :
            uVar6 = (local_1c - (s8(DAT_0064f349[param_1 * 0x58]) / 5 | 0));
            break;
          case 0xe :
            local_90 = local_b0;
            uVar6 = (local_1c + -4);
            break;
          case 0xf :
            local_1c = (local_1c - (u8(DAT_0064c972[(uVar4 * 0x594 + local_fc)]) >> 4));
            iVar5 = FUN_0043d20a(param_1, 1);
            uVar6 = local_1c;
            if ((iVar5 !== 0)) {
              uVar6 = (local_1c + -1);
            }
            break;
          case 0x10 :
            local_1c = (local_1c - (s8(DAT_0064f349[param_1 * 0x58]) / 6 | 0));
            iVar5 = FUN_0043d20a(param_1, 1);
            uVar6 = local_1c;
            if ((iVar5 !== 0)) {
              uVar6 = (local_1c + -1);
            }
            break;
          case 0x11 :
            uVar6 = (local_1c - ((((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16) + ((((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16) >> 0x1f) & 3)) >> 2));
            break;
          case 0x12 :
            uVar6 = (local_1c + -3);
            break;
          case 0x13 :
            iVar5 = FUN_004bd9f0(uVar4, 0xf);
            if ((iVar5 === 0)) {
              uVar6 = (local_1c + -2);
            }
            else {
              uVar6 = (local_1c + -1);
            }
            break;
          case 0x14 :
            if (((u8(DAT_00655b0b) & (1 << (DAT_00655c31 & 0x1f))) !== 0)) {
              uVar6 = (local_1c + -1);
              if ((3 < DAT_0064c6be[u8(DAT_00655c31) * 0x594])) {
                uVar6 = (local_1c + -2);
              }
              local_1c = uVar6;
              uVar6 = local_1c;
              if ((DAT_00655c22[uVar4] === 6)) {
                uVar6 = (local_1c + -2);
              }
            }
            break;
          case 0x15 :
            uVar6 = (local_1c + -1);
            if ((0xff < DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])) {
              uVar6 = (local_1c + -2);
            }
            local_1c = uVar6;
            if ((0 < s16((DAT_0064ca7e + uVar4 * 0x594), 0))) {
              local_1c = (local_1c + -1);
            }
            if ((4 < DAT_0064c6b5[uVar4 * 0x594])) {
              local_1c = (local_1c + -1);
            }
            uVar6 = local_1c;
            if ((5 < DAT_0064c6b5[uVar4 * 0x594])) {
              uVar6 = (local_1c + -1);
            }
            break;
          case 0x16 :
            uVar6 = (local_1c - (u8(DAT_0064c972[(uVar4 * 0x594 + local_fc)]) / 0x14 | 0));
            break;
          case 0x17 :
            iVar5 = FUN_004bd9f0(uVar4, 0x49);
            if ((iVar5 !== 0)) {
              local_d0 = 0;
              for (/* cond: (local_228 < 8) */); local_228 = (local_228 < 8); local_228 = (local_228 + 1)) {
                if ((s16((DAT_0064c70e + local_228 * 0x594), 0) < s16((DAT_0064c70e + uVar4 * 0x594), 0))) {
                  local_d0 = 1;
                  break;
                }
              }
              if ((local_d0 === 0)) {
                if (((u8(DAT_00655b0b) & (1 << (DAT_00655c31 & 0x1f))) !== 0)) {
                  local_1c = (local_1c + -1);
                  iVar5 = FUN_004bd9f0(DAT_00655c31, 0x49);
                  if ((iVar5 === 0)) {
                    local_1c = (local_1c + -1);
                  }
                }
                uVar6 = (local_1c + (s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) * 2 - s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])));
                break;
              }
            }
            goto LAB_0049cadf;
          case 0x18 :
            uVar6 = (local_1c - (s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) * -2));
            if ((DAT_00655c22[uVar4] === 7)) {
              uVar6 = (uVar6 + -1);
            }
            break;
          case 0x19 :
            uVar6 = (local_1c - (s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) * 3 + s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) * -2));
            break;
          case 0x1a :
            uVar6 = (local_1c - (s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) * 2 + 2));
            break;
          case 0x1b :
            uVar6 = (local_1c - (s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + 2));
          }
          local_1c = uVar6;
          local_9c = FUN_00453da0(local_74);
          if ((local_9c !== 0)) {
            local_1c = (local_1c * 3 + u8(DAT_00655b08) * 0x32);
          }
          local_1c = (local_1c + local_238 * 5);
          if ((DAT_0064c6b7[(uVar4 * 0x594 + local_28)] === 0)) {
            local_1c = (local_1c + -2);
          }
          if ((local_f8 === 1)) {
            local_1c = (local_1c + (local_d4 + 1));
          }
          else {
            local_1c = (local_1c + (local_d4 / 2 | 0));
          }
          if ((s8(DAT_0064f379[param_1 * 0x58]) === (-local_244))) {
            if ((local_a4 !== 0)) {
              local_1c = (local_1c / 2 | 0);
            }
            local_1c = ((local_260 + 1) * local_1c + local_260);
          }
          else if ((((1 << (bVar1 & 0x1f)) & u8(_MEM[(DAT_ffffff0c + (1 - s8(DAT_0064f379[param_1 * 0x58])))])) !== 0)) {
            local_1c = (local_1c * 2 + 1);
          }
          local_c = local_1c;
          local_e4 = (u8(DAT_0064c48c[local_244 * 8]) * DAT_006a657c + 1);
          if ((local_9c === 0)) {
            if ((local_238 === 0)) {
              if ((local_b0 === local_90)) {
                local_1c = (local_1c / 2 | 0);
              }
              else {
                local_90 = local_b0;
              }
            }
            if ((((local_e4 * 3 + ((local_e4 * 3 >> 0x1f) & 3)) >> 2) <= ((s16((DAT_0064f35c + param_1 * 0x58), 0)) << 16 >> 16))) {
              local_90 = local_b0;
            }
            if ((local_238 < 3)) {
              local_90 = local_b0;
            }
          }
          if ((local_78 === 0)) {
            if (((((s16((DAT_0064ca72 + uVar4 * 0x594), 0)) << 16 >> 16) >> 1) < local_48)) {
              if ((local_48 < 6)) {
                local_1c = (local_1c << 1);
              }
            }
            else {
              local_1c = (local_1c << 1);
            }
          }
          if ((((s16((DAT_0064ca72 + uVar4 * 0x594), 0)) << 16 >> 16) === local_48)) {
            local_1c = (local_1c - (local_1c / 3 | 0));
          }
          local_1c = ((((-u8((local_b0 === local_90))) & -10) + 0x14) * local_1c * 3 / (s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + 3) | 0);
          iVar5 = FUN_0043d20a(param_1, 2);
          if ((iVar5 !== 0)) {
            local_1c = (local_1c + (local_1c / ((local_268 >> 1) + 3) | 0));
          }
          iVar5 = FUN_0043d20a(param_1, 1);
          if ((DAT_0064c6b7[(uVar4 * 0x594 + local_28)] === 0)) {
            local_1c = (local_1c / 2 | 0);
          }
          if (((DAT_0064f345[param_1 * 0x58] & 1) === 0)) {
            if ((local_9c === 0)) {
              local_1c = ((((local_e4 - ((s16((DAT_0064f35c + param_1 * 0x58), 0)) << 16 >> 16)) * ((local_1c * 3 + ((local_1c * 3 >> 0x1f) & 3)) >> 2) / local_e4 | 0) + ((local_1c + ((local_1c >> 0x1f) & 3)) >> 2)) / 3 | 0);
            }
          }
          else {
            local_1c = local_1c * 3;
          }
          if ((local_58 < -38)) {
            if ((local_c < local_8)) {
              local_8 = local_c;
              local_58 = (-local_244);
              local_254 = (-local_244);
              if ((local_1c < local_30)) {
                local_30 = local_1c;
              }
              if ((local_1c < local_20)) {
                local_20 = local_1c;
              }
            }
          }
          else {
            if ((local_1c < local_30)) {
              local_8 = local_c;
              local_30 = local_1c;
              local_58 = (-local_244);
            }
            if ((local_1c < local_20)) {
              local_20 = local_1c;
              local_254 = (-local_244);
            }
          }
        }
      }
 LAB_0049cadf: :
    }
  }
  if ((s16((DAT_0064c706 + uVar4 * 0x594), 0) < 0x200)) {
    for (/* cond: (local_f4 < 0x3e) */); local_f4 = (local_f4 < 0x3e); local_f4 = (local_f4 + 1)) {
      if ((iVar5 !== 0)) {
        local_1c = 0x3e7;
        local_90 = 0;
        if ((DAT_0064b1ca[local_f4 * 0x14] === 6)) {
          local_23c = FUN_00598d45(uVar4);
          if ((local_23c !== 0)) {
            iVar5 = FUN_004bd9f0(uVar4, 0x4c);
            if ((iVar5 !== 0)) {
              local_23c = 0;
            }
            if (((DAT_0064f344[param_1 * 0x58] & 1) !== 0)) {
              local_23c = 0;
            }
            if ((DAT_00655b08 < 2)) {
              local_23c = 0;
            }
          }
          if (((DAT_0064f344[param_1 * 0x58] & 0x10) === 0)) {
            if ((s32(DAT_fffffc9c, local_f4) < u8(DAT_0064c932[(uVar4 * 0x594 + local_fc)]))) {
              local_1c = 0xb;
              local_44 = -1;
              for (/* cond: (local_70 < 8) */); local_70 = local_70; local_70 = (local_70 + 1)) {
                if ((DAT_0064c932[(local_70 * 0x594 + local_fc)] !== 0)) {
                  local_44 = local_70;
                }
              }
              if ((local_44 < 0)) {
                local_44 = u8(DAT_00655c20);
                if ((DAT_00655b08 !== 0)) {
                  local_90 = local_b0;
                  local_1c = 8;
                  if (((u8(DAT_0064c778[(uVar4 * 0x594 + local_f4)]) + u8(DAT_0064c7f4[(uVar4 * 0x594 + local_f4)])) < (((((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16) + 3) + (((((s16((DAT_0064c708 + uVar4 * 0x594), 0)) << 16 >> 16) + 3) >> 0x1f) & 3)) >> 2))) {
                    if ((s32((DAT_0064c6a2 + u8(DAT_00655c20) * 0x594), 0) < s32((DAT_0064c6a2 + uVar4 * 0x594), 0))) {
                      local_1c = 7;
                    }
                    if ((s32((DAT_0064c6a2 + u8(DAT_00655c20) * 0x594), 0) * 2 < s32((DAT_0064c6a2 + uVar4 * 0x594), 0))) {
                      local_1c = (local_1c + -1);
                    }
                    if ((DAT_0064c6b0[uVar4 * 0x594] < DAT_0064c6b0[u8(DAT_00655c20) * 0x594])) {
                      if (((s32(DAT_fffffc9c, local_f4) + s32(DAT_fffffde4, local_f4)) === 0)) {
                        local_1c = (local_1c + -3);
                      }
                      local_1c = (local_1c - (u8(DAT_0064c6b0[u8(DAT_00655c20) * 0x594]) - u8(DAT_0064c6b0[uVar4 * 0x594])));
                    }
                    local_1c = FUN_005adfa0(local_1c, (u8(DAT_0064c778[(uVar4 * 0x594 + local_f4)]) + 1), 0xa);
                  }
                }
                if ((local_23c !== 0)) {
                  local_1c = (local_1c / 2 | 0);
                }
                if ((s32(DAT_fffffc9c, local_f4) !== 0)) {
                  local_1c = 0x3e7;
                }
              }
              else {
                local_1c = FUN_005adfa0((0xa - (u8(DAT_0064c6b0[local_44 * 0x594]) - u8(DAT_0064c6b0[uVar4 * 0x594]))), 2, 0xa)
                ;
                if ((local_23c === 0)) {
                  local_1c = 0x3e7;
                }
                if ((s16((DAT_0064c70e + local_44 * 0x594), 0) <= s16((DAT_0064c70e + uVar4 * 0x594), 0))) {
                  local_90 = local_b0;
                }
              }
              if ((DAT_0064c6b5[uVar4 * 0x594] === 3)) {
                local_1c = (local_1c + -1);
              }
              if ((local_1c < 0x14)) {
                for (/* cond: (local_244 < 0x26) */); local_244 = (local_244 < 0x26); local_244 = (local_244 + 1)) {
                  iVar5 = FUN_004bd9f0(uVar4, s8(DAT_0064c48e[local_244 * 8]));
                  if ((iVar5 !== 0)) {
                    local_90 = local_b0;
                    uVar6 = (s32(DAT_fffffde4, local_f4) * 2 + 1);
                    if ((local_1c <= uVar6)) {
                      uVar6 = local_1c;
                    }
                    local_1c = uVar6;
                    if ((local_58 < -34)) {
                      local_58 = local_f4;
                    }
                  }
                }
              }
            }
            goto LAB_0049e97a;
          }
        }
        else if ((DAT_0064b1ca[local_f4 * 0x14] === 7)) {
          if (((DAT_0064f345[param_1 * 0x58] & 0x10) === 0)) {
            local_1c = 0xa;
            if ((DAT_0064f37a[param_1 * 0x58] < 3)) {
              local_1c = (0xa - ((5 - s8(DAT_006554f9[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])) * DAT_006a65d0 / 0xa | 0));
            }
            iVar5 = (local_1c + s8(DAT_0064f37a[param_1 * 0x58]) * 2);
            if ((iVar5 < 3)) {
              iVar5 = 2;
            }
            local_1c = (iVar5 + u8(DAT_0064c9b2[(uVar4 * 0x594 + local_fc)]));
            if (((DAT_0064f344[param_1 * 0x58] & 0x10) === 0)) {
 LAB_0049e97a: :
          if ((local_1c < 0x190)) {
            local_1c = ((((-u8((local_b0 === local_90))) & -10) + 0x14) * local_1c * 3 / (s8(DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + 3) | 0)
            ;
          }
          else {
            local_1c = 0x3fff;
          }
          iVar5 = FUN_0043d20a(param_1, 2);
          if ((iVar5 !== 0)) {
            local_1c = (local_1c + ((local_1c + ((local_1c >> 0x1f) & 3)) >> 2));
          }
          if ((local_1c < local_30)) {
            local_30 = local_1c;
            local_58 = local_f4;
          }
          if ((local_1c < local_20)) {
            local_20 = local_1c;
            local_254 = local_f4;
          }
        }
      }
    }
 LAB_0049ea4a: :
    if ((s16((DAT_0064c706 + uVar4 * 0x594), 0) < 0x200)) {
      for (/* cond: (local_f4 < 0x3e) */); local_f4 = (local_f4 < 0x3e); local_f4 = (local_f4 + 1)) {
        local_e8 = s8(DAT_0064b1ca[local_f4 * 0x14]);
        if (((u8(DAT_0064c778[(uVar4 * 0x594 + local_f4)]) + u8(DAT_0064c7f4[(uVar4 * 0x594 + local_f4)])) === 0)) {
          if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            if ((local_f4 === 2)) {
              iVar5 = FUN_004bd9f0(uVar4, s8(DAT_0064b207));
            }
            else if ((local_f4 === 4)) {
              iVar5 = FUN_004bd9f0(uVar4, s8(DAT_0064b22f));
            }
            else {
              if ((local_f4 !== 0xf));
              if ((iVar5 !== 0));
            }
            if ((iVar5 !== 0)) {
            iVar5 = FUN_004bd9f0(uVar4, s8(DAT_0064b347));
            if ((iVar5 === 0)) {
              iVar5 = FUN_004bd9f0(uVar4, s8(DAT_0064b333));
              goto joined_r0x0049ef35;
            }
          }
          else {
            if ((local_f4 === 0x11)) {
              iVar5 = FUN_004bd9f0(uVar4, s8(DAT_0064b347));
 joined_r0x0049ef35: :
              if ((iVar5 !== 0)) {
              local_1c = (s32(DAT_fffffde4, local_f4) * 2 + s32(DAT_fffffc9c, local_f4));
              if ((((1 << (bVar1 & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
                local_1c = (local_1c / 2 | 0);
                if ((local_f4 === 9)) {
                  local_1c = (local_1c + 2);
                }
              }
              if ((local_f4 === 4)) {
                local_1c = (local_1c + (UNNAMED * 2 + UNNAMED));
              }
              if ((DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30] < 0)) {
                if ((local_f4 === 0x13)) {
                  local_1c = (local_1c + (UNNAMED * 2 + UNNAMED));
                }
              }
              else if ((local_f4 === 0x12)) {
                local_1c = (local_1c + (UNNAMED * 2 + UNNAMED));
              }
              if ((DAT_0064b1c4[local_f4 * 0x14] === 0)) {
                if ((local_f8 !== 1)) {
                  if ((local_f8 === 4)) {
                    local_374 = 1;
                  }
                  else {
                    local_374 = ((((s16((DAT_00666130 + local_fc * 0x10), 0)) << 16 >> 16) + 0xc7) / 0xc8 | 0);
                  }
                  if ((DAT_0064c778[(uVar4 * 0x594 + local_f4)] < 2)) {
 LAB_0049f199: :
                if ((local_f8 === 4)) {
                  local_d0 = (1 - s8(DAT_006554f9[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]));
                  if ((DAT_0064b1ca[local_f4 * 0x14] !== 5)) {
                    local_d0 = (1 - s8(DAT_006554f9[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])) * 2;
                  }
                  if ((local_34 !== 0)) {
                    local_d0 = (local_d0 / 2 | 0);
                  }
                  local_1c = (local_1c + local_d0);
                  if ((DAT_0064b1ca[local_f4 * 0x14] === 0)) {
                    local_d0 = (s8(DAT_006554f8[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + 1);
                    iVar5 = FUN_004bd9f0(uVar4, s8(DAT_0064b527));
                    if ((iVar5 !== 0)) {
                      local_d0 = (local_d0 << 1);
                    }
                    local_1c = FUN_005adfa0((local_1c - local_d0), 0, 0x63);
                  }
                }
 LAB_0049f3ea: :
                if (((DAT_0064b1bd[local_f4 * 0x14] & 1) !== 0)) {
                  local_e8 = 0;
                }
                if ((DAT_0062ccc4 === 0)) {
                  if ((local_e8 === 1)) {
                    local_1c = (2 / local_80 | 0);
                    if ((local_d8 < 2)) {
                      local_1c = -1;
                    }
                  }
                  else if ((local_80 === 2));
                if ((local_f8 !== local_e8)) {
                  uVar6 = (local_1c << 2);
                }
                local_1c = uVar6;
                if ((iVar5 < 0x3f)) {
                  if ((local_e8 === 4)) {
                    if ((local_f8 === 4)) {
                      local_1c = (local_1c * 3 / 2 | 0);
                    }
                    else {
                      if ((DAT_0064c778[(uVar4 * 0x594 + local_f4)] !== 0)) {
                        local_1c = (local_1c * 2 << (((local_b0) & 0xFF) & 0x1f));
                      }
                    }
                  }
                  if ((local_e8 === 5)) {
                    iVar5 = FUN_0043d20a(param_1, 3);
                    if ((iVar5 === 0)) {
                      local_378 = 6;
                    }
                    else {
                      local_378 = 4;
                    }
                    iVar5 = local_f4;
                    if ((s32(DAT_fffffc9c, local_f4) < ((u8(DAT_0064c6b5[uVar4 * 0x594]) + 1) / 2 | 0))) {
                      cVar2 = DAT_006554fa[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30];
                    }
                    else {
                      cVar2 = DAT_006554f9[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30];
                    }
                    local_1c = ((local_378 - s8(cVar2)) - local_100) * local_1c;
                    if ((DAT_006a65d8 !== 0)) {
                      local_11c = 8;
                      if ((DAT_0064f349[param_1 * 0x58] < 4)) {
                        local_11c = 0x10;
                      }
                      for (/* cond: (local_50 < DAT_006a65d8) */); local_50 = (local_50 < DAT_006a65d8); local_50 = (local_50 + 1)) {
                        local_1c = (local_1c + (local_50 + 1) * local_11c);
                      }
                    }
                    if ((DAT_0064f349[param_1 * 0x58] < 2)) {
                      local_1c = (local_1c << 1);
                    }
                    if ((DAT_006a6608 === local_220)) {
                      local_1c = (local_1c - (local_1c / 2 | 0));
                    }
                    if ((local_80 < 2)) {
                      if ((s32(DAT_fffffde4, local_f4) === 0)) {
                        if ((DAT_0064c6b5[uVar4 * 0x594] < 5)) {
                          if ((1 < DAT_0064c6b5[uVar4 * 0x594])) {
                            iVar5 = FUN_005adfa0((u8(DAT_0064c932[(uVar4 * 0x594 + local_fc)]) >> 1), 1, 3);
                            if ((s32(DAT_fffffc9c, local_f4) < iVar5)) {
                              local_1c = (local_1c / 2 | 0);
                            }
                            if ((s32(DAT_fffffc9c, local_f4) < (u8(DAT_0064c932[(uVar4 * 0x594 + local_fc)]) / 5 | 0))) {
                              local_1c = (local_1c / 2 | 0);
                            }
                          }
                        }
                        else {
                          iVar8 = FUN_005adfa0((u8(DAT_0064c932[(uVar4 * 0x594 + local_fc)]) - 1), 1, 6);
                          if ((s32(DAT_fffffc9c, iVar5) < iVar8)) {
                            local_1c = (local_1c / 2 | 0);
                          }
                          if ((s32(DAT_fffffc9c, local_f4) < (u8(DAT_0064c932[(uVar4 * 0x594 + local_fc)]) >> 2))) {
                            local_1c = (local_1c / 2 | 0);
                          }
                        }
                      }
                      if ((local_f8 !== 4)) {
                        local_10 = (s8(DAT_006554f9[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + 3);
                        if ((local_f8 === 1)) {
                          local_10 = (s8(DAT_006554f9[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30]) + 2);
                        }
                        if ((local_f8 === 5)) {
                          local_10 = (local_10 + 1);
                        }
                        if ((u8(DAT_0064c932[(uVar4 * 0x594 + local_fc)]) < local_10)) {
                          local_1c = 0;
                        }
                      }
                    }
                  }
                  else {
                    local_1c = (local_1c << 4);
                  }
                  local_1c = (s8(DAT_0064b1c8[local_f4 * 0x14]) + 2) * local_1c;
                  if ((DAT_0064b1c5[local_f4 * 0x14] === 0)) {
                    local_1c = 0;
                  }
                  else {
                    if (((DAT_00655ae8 & 0x10) === 0)) {
                      local_38 = 2;
                    }
                    else {
                      local_38 = FUN_005adfa0(((s8(DAT_0064b1c6[local_f4 * 0x14]) / 0xa | 0) + s8(DAT_0064b1c7[local_f4 * 0x14])), 2, 4);
                    }
                    local_25c = (s8(DAT_0064b1c4[local_f4 * 0x14]) + s8(DAT_0064b1c5[local_f4 * 0x14])) * local_38;
                    if (((DAT_0064b1bd[local_f4 * 0x14] & 4) !== 0)) {
                      local_25c = (local_25c + 1);
                    }
                    if ((local_f4 === 9)) {
                      local_25c = (local_25c + 1);
                    }
                    local_1c = (local_1c / (((s8(DAT_0064b1c2[local_f4 * 0x14]) / u8(DAT_0064bcc8) | 0) + 1) * local_25c / 2 | 0) | 0);
                  }
                  if ((local_e8 === 2)) {
                    if (((DAT_00655af0 & 4) !== 0)) {
                      local_1c = (local_1c - ((local_1c + ((local_1c >> 0x1f) & 3)) >> 2));
                    }
                    if ((0 < local_1c)) {
                      local_1c = (local_1c - ((local_1c + ((local_1c >> 0x1f) & 3)) >> 2));
                    }
                    if ((local_b0 === 0)) {
                      local_1c = (local_1c << 1);
                    }
                    else {
                      local_1c = (local_1c << 2);
                    }
                    iVar5 = FUN_0043d20a(param_1, 0x22);
                    if ((iVar5 !== 0)) {
                      local_1c = (local_1c - ((local_1c + ((local_1c >> 0x1f) & 3)) >> 2));
                    }
                  }
                  if ((DAT_0064b1c1[local_f4 * 0x14] === 1)) {
                    local_1c = (local_1c << 1);
                    iVar5 = FUN_0043d20a(param_1, 0x20);
                    if ((iVar5 !== 0)) {
                      local_1c = (local_1c - ((local_1c + ((local_1c >> 0x1f) & 3)) >> 2));
                    }
                  }
                  if ((local_e8 === 1)) {
                    local_1c = (local_1c - ((local_3c + 1) >> 1));
                  }
                  if ((0x77 < local_124)) {
                    local_1c = (local_1c << 2);
                  }
                  if ((local_e8 < 6)) {
                    local_11c = 0;
                    if ((DAT_006a65cc !== 0)) {
                      local_11c = ((3 - local_b0) * (DAT_006a6568 + 1) * local_1c / DAT_006a65cc | 0);
                    }
                    if ((local_e8 === 5)) {
                      if (((3 - s8(DAT_006554f9[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])) < s8(DAT_0064f349[param_1 * 0x58]))) {
                        local_11c = 0;
                        if ((DAT_006a65cc <= (u8((0xff < DAT_006554f9[((s16((DAT_0064c6a6 + uVar4 * 0x594), 0)) << 16 >> 16) * 0x30])) + DAT_006a6568 * 2))) {
                          local_1c = (local_1c - (local_1c / 3 | 0));
                        }
                      }
                      else {
                        local_11c = (local_11c / 2 | 0);
                      }
                    }
                    else if (((s16((DAT_0064c6a0 + uVar4 * 0x594), 0) & 2) === 0)) {
                      local_1c = (local_1c << 1);
                    }
                    local_1c = (local_1c + local_11c);
                  }
                  if ((DAT_0062ccc4 !== 0)) {
                    local_1c = 0x3e7;
                  }
                  if (((DAT_0064c9f2[(uVar4 * 0x594 + local_fc)] & 0x10) !== 0)) {
                    local_30 = local_1c;
                    local_58 = local_f4;
                  }
                  if ((local_1c < local_26c)) {
                    local_26c = local_1c;
                    local_240 = local_f4;
                  }
                }
              }
            }
            else if (((((u8((DAT_0064c932[(uVar4 * 0x594 + local_fc)] < 2)) - 1) & 4) + 4) <= s16((DAT_0064c832 + (local_fc * 2 + uVar4 * 0x594)), 0))) {
              local_1c = ((u8(DAT_0064c778[(uVar4 * 0x594 + local_f4)]) + u8(DAT_0064c7f4[(uVar4 * 0x594 + local_f4)]) * 2) * ((s16((DAT_0064c832 + (local_fc * 2 + uVar4 * 0x594)), 0)) & 0xFFFF) / (local_124 + 1) | 0);
              if ((local_1c < 1)) {
                local_1c = 0;
              }
              goto LAB_0049f3ea;
            }
          }
        }
 LAB_0049ea9e: :
      }
    }
    else if ((local_58 === 0x3e7)) {
      local_58 = -38;
    }
  }
  else if ((local_58 === 0x3e7)) {
    local_58 = -38;
  }
  if ((param_3 !== 0)) {
    w32(param_3, 0, local_254);
  }
  if ((param_2 !== 0)) {
    w32(param_2, 0, local_240);
  }
  if (((DAT_0064f344[param_1 * 0x58] & 0x10) === 0)) {
    if ((DAT_0064f379[param_1 * 0x58] === 0xff)) {
      local_58 = -1;
    }
    else if ((iVar5 === 0)) {
      local_58 = -4;
    }
    else if (((DAT_0064f345[param_1 * 0x58] & 0x20) === 0)) {
      if ((DAT_0064f379[param_1 * 0x58] < 1)) {
        local_380 = ((~s8(DAT_0064f379[param_1 * 0x58])) + 1);
      }
      else {
        local_380 = s8(DAT_0064f379[param_1 * 0x58]);
      }
      local_74 = (local_380 + -39);
      if (((DAT_0064f344[param_1 * 0x58] & 0x20) === 0)) {
        uVar9 = FUN_005b2e69(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16), 1);
        iVar5 = FUN_005b53b6(uVar9);
        if ((1 < iVar5)) {
          local_58 = s8(DAT_0064f379[param_1 * 0x58]);
        }
      }
    }
  }
  else if (((DAT_0064f347[param_1 * 0x58] & 1) === 0)) {
    if (((DAT_0064f347[param_1 * 0x58] & 2) === 0)) {
      if ((0x1f4 < local_30)) {
        local_58 = 0x63;
      }
    }
    else if ((0x1f4 < local_20)) {
      local_58 = 0x63;
    }
  }
  else if ((0x1f4 < local_26c)) {
    local_58 = 0x63;
  }
  return local_58;
}
