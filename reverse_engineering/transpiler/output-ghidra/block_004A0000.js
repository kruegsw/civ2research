// Block 0x004A0000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 117

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_004a2020 ()

 {
  if ((DAT_0062cd20 !== 0)) {
    _fclose(DAT_0062cd20);
    DAT_0062cd20 = 0;
  }
  return;
}


 export function FUN_004a2055 (param_1, param_2)

 {
  let bVar1;
  let bVar2;
  let sVar3;
  let pcVar4;
  let iVar5;
  let local_264;
  let local_214;
  let local_210;
  let local_10c;
  let local_8;

  local_214 = 1;
  bVar2 = 0;
  local_8 = -1;
  FUN_004aef20(DAT_fffffdf0);
  FUN_004aef20(DAT_fffffd9c);
  if ((param_2 !== 0)) {
    local_264 = 0x40;
    local_264 = 0;
    FUN_005f22e0(DAT_fffffd9c, param_2);
    __strupr(DAT_fffffd9c);
  }
  if ((param_1 === 0)) {
    bVar2 = 1;
  }
  else {
    FUN_004a2020();
    FUN_005f22d0(DAT_fffffdf0, param_1);
    FUN_00472950(DAT_fffffdf0, DAT_0062cd24);
    __getcwd(DAT_fffffef4, 0x104);
    __chdir(DAT_0064bb08);
    DAT_0062cd20 = FUN_0041508c(DAT_fffffdf0, DAT_0062cd28);
    if ((sVar3 !== 0)) {
      local_8 = FUN_004db481(DAT_fffffdf0, DAT_fffffd9c);
    }
    __chdir(DAT_00655020);
    if ((sVar3 !== 0)) {
      local_8 = FUN_004db481(DAT_fffffdf0, DAT_fffffd9c);
    }
    __chdir(DAT_fffffef4);
    if ((DAT_0062cd20 === 0)) {
    local_214 = 0;
  }
  else {
    if ((0 < local_8)) {
      _fseek(DAT_0062cd20, local_8, 0);
    }
    bVar1 = 0;
    while ((!bVar1)) {
      if (((s32(DAT_0000000c, 0) & 0x10) !== 0)) {
        if ((!bVar2));
        _rewind(DAT_0062cd20);
      }
      pcVar4 = _fgets(DAT_00679640, 0xff, DAT_0062cd20);
      if ((pcVar4 !== 0)) {
        FUN_0056b810(DAT_00679640);
        FUN_004d007e(DAT_00679640);
        iVar5 = __strcmpi(DAT_00679640, DAT_fffffd9c);
        if ((iVar5 === 0)) {
          bVar1 = 1;
        }
      }
    }
    sVar3 = _strlen(DAT_00679640);
    DAT_00673f14 = (DAT_00679640 + sVar3);
    local_214 = 0;
  }
 LAB_004a2348: :
  if ((local_214 !== 0)) {
    FUN_004a2020();
  }
  return local_214;
}


 export function FUN_004a2379 (param_1, param_2)

 {
  let local_10c;
  let local_8;

  local_8 = FUN_004a2055(param_1, param_2);
  if ((local_8 !== 0)) {
    FUN_005f22d0(DAT_fffffef4, DAT_0064bb08);
    FUN_005f22d0(DAT_0064bb08, DAT_00655020);
    local_8 = FUN_004a2055(param_1, param_2);
    FUN_005f22d0(DAT_0064bb08, DAT_fffffef4);
  }
  return local_8;
}


 export function FUN_004a23fc (param_1)

 {
  let pcVar1;
  let local_8;

  local_8 = 0;
  if ((pcVar1 !== 0)) {
    FUN_0056b810(DAT_00679640);
    if ((param_1 === 1)) {
      FUN_004d007e(DAT_00679640);
    }
    DAT_00673f14 = DAT_00679640;
    local_8 = DAT_00679640;
  }
  if ((local_8 === 0)) {
    DAT_00679640 = 0;
    FUN_004a2020();
  }
  return local_8;
}


 export function FUN_004a24b1 ()

 {
  let local_8;

  local_8 = DAT_00673e10;
  for (/* cond: (_MEM[DAT_00673f14] !== 0x2c) */); (DAT_00673f14 = _MEM[DAT_00673f14] && (DAT_00673f14 = _MEM[DAT_00673f14])); DAT_00673f14 = (DAT_00673f14 + 1)) {
    _MEM[local_8] = _MEM[DAT_00673f14];
    local_8 = (local_8 + 1);
  }
  if ((_MEM[DAT_00673f14] !== 0)) {
    DAT_00673f14 = (DAT_00673f14 + 1);
  }
  _MEM[local_8] = 0;
  FUN_004d007e(DAT_00673e10);
  return DAT_00673e10;
}


 export function FUN_004a2534 ()

 {
  let uVar1;

  uVar1 = FUN_004a24b1();
  FUN_00564bf0(uVar1);
  return;
}


 export function FUN_004a2552 ()

 {
  let sVar1;

  sVar1 = _strlen(DAT_00679640);
  DAT_00673f14 = (DAT_00679640 + sVar1);
  return;
}


 export function FUN_004a257a ()

 {
  let uVar1;

  FUN_004a23fc(1);
  uVar1 = FUN_00428a95(DAT_00679640);
  return uVar1;
}


 export function FUN_004a25aa ()

 {
  let uVar1;

  FUN_004a24b1();
  uVar1 = FUN_00428a95(DAT_00673e10);
  return uVar1;
}


 export function FUN_004a25d5 ()

 {
  let sVar1;
  let local_c;

  sVar1 = 0;
  FUN_004a24b1();
  for (/* cond: (_MEM[local_c] === 0x31) */); (local_c = _MEM[local_c] || (local_c = _MEM[local_c])); local_c = (local_c + 1)) {
    sVar1 = sVar1 * 2;
    if ((_MEM[local_c] === 0x31)) {
      sVar1 = (sVar1 + 1);
    }
  }
  return (((_MEM[local_c] >> 7) << 16) | sVar1);
}


 export function FUN_004a2645 (param_1, param_2, param_3)

 {
  let iVar1;
  let local_c;
  let local_8;

  local_c = 1;
  iVar1 = FUN_004a2379(param_1, param_2);
  if ((iVar1 === 0)) {
    for (/* cond: (local_8 <= param_3) */); local_8 = (local_8 <= param_3); local_8 = (local_8 + 1)) {
      FUN_004a23fc(1);
    }
    local_c = 0;
  }
  FUN_004a2020();
  return local_c;
}


 export function FUN_004a26bf (param_1)

 {
  let uVar1;

  FUN_004a24b1();
  uVar1 = FUN_00428b68(DAT_00673e10, param_1);
  return uVar1;
}


 export function FUN_004a28b0 (param_1)

 {
  let iVar1;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  DAT_00673f78 = 0;
  for (/* cond: (local_14 < ((DAT_00655b18) << 16 >> 16)) */); local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
    if ((s8(DAT_0064f348[local_14 * 0x58]) === param_1)) {
      DAT_00673f78 = (DAT_00673f78 + ((s8(DAT_0064f349[local_14 * 0x58]) + s8(DAT_0064f392[local_14 * 0x58])) - s8(DAT_0064f393[local_14 * 0x58])));
    }
  }
  DAT_00673f5c = 0;
  for (/* cond: (local_c < 0x1c) */); local_c = (local_c < 0x1c); local_c = (local_c + 1)) {
    if ((s8(DAT_0064f348[((s16((DAT_00655be6 + local_c * 2), 0)) << 16 >> 16) * 0x58]) === param_1)) {
      DAT_00673f5c = (DAT_00673f5c + 0x14);
    }
  }
  DAT_00673f84 = 0;
  DAT_00673f60 = 0;
  FUN_00596eec(param_1, 1);
  if (((DAT_0064caa0[param_1 * 0x594] & 0x10) !== 0)) {
    DAT_00673f84 = 0;
    DAT_00673f60 = ((s16((DAT_0064caa6 + param_1 * 0x594), 0)) << 16 >> 16) * DAT_006ad0ec;
  }
  DAT_00673f58 = (((DAT_00655b12) << 16 >> 16) - ((DAT_00655b10) << 16 >> 16)) * -10;
  DAT_00673f8c = 0;
  if ((0xc7 < DAT_00655af8)) {
    DAT_00673f8c = FUN_005adfa0(((DAT_00655b14) << 16 >> 16) * 3, 0, 0x64);
  }
  DAT_00673f6c = u8(DAT_0064c6b1[param_1 * 0x594]) * 5;
  DAT_00673f74 = (u8(DAT_00655b09) * 0x19 + -50);
  DAT_00673f88 = ((((((DAT_00673f8c + DAT_00673f58) + DAT_00673f60) + DAT_00673f5c) + DAT_00673f78) + (u8(DAT_00655b09) * 0x19 + -50)) + u8(DAT_0064c6b1[param_1 * 0x594]) * 5);
  if ((((((((DAT_00673f8c + DAT_00673f58) + DAT_00673f60) + DAT_00673f5c) + DAT_00673f78) + (u8(DAT_00655b09) * 0x19 + -50)) + u8(DAT_0064c6b1[param_1 * 0x594]) * 5) < 0)) {
    DAT_00673f88 = 0;
  }
  DAT_00673f7c = 0;
  if (((u8(DAT_00655b0a) & -2) === (1 << (((param_1) & 0xFF) & 0x1f)))) {
    local_18 = ((DAT_00655af8) << 16 >> 16);
    if ((local_18 < 0xfb)) {
      local_18 = 0xfa;
    }
    DAT_00673f7c = ((u8(DAT_00655b0d) * 0x64 + (0x23a - local_18) * 2) + 0x190);
    if (((DAT_00655af0 & 4) !== 0)) {
      DAT_00673f7c = ((((u8(DAT_00655b0d) * 0x64 + (0x23a - local_18) * 2) + 0x190) * 5 + ((((u8(DAT_00655b0d) * 0x64 + (0x23a - local_18) * 2) + 0x190) * 5 >> 0x1f) & 3)) >> 2);
    }
    if (((DAT_00655af0 & 8) !== 0)) {
      DAT_00673f7c = ((DAT_00673f7c << 2) / 5 | 0);
    }
  }
  DAT_00673f68 = 0;
  if (((DAT_0064bc60 & 2) === 0)) {
    iVar1 = DAT_00673f88;
    if ((DAT_00673f88 <= DAT_00673f7c)) {
      iVar1 = DAT_00673f7c;
    }
  }
  else {
    DAT_00673f70 = 0;
    DAT_00673f64 = 0;
    DAT_00673f80 = 0;
    for (/* cond: (local_14 < ((DAT_00655b18) << 16 >> 16)) */); local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
      if ((s32((DAT_0064f394 + local_14 * 0x58), 0) !== 0)) {
        iVar1 = FUN_0043cef9(local_14);
        DAT_00673f70 = (DAT_00673f70 + iVar1);
        if ((s8(DAT_0064f348[local_14 * 0x58]) === ((DAT_0064bcba) << 16 >> 16))) {
          DAT_00673f64 = (DAT_00673f64 + iVar1);
        }
        if ((s8(DAT_0064f348[local_14 * 0x58]) === param_1)) {
          DAT_00673f80 = (DAT_00673f80 + iVar1);
        }
      }
    }
    if ((DAT_0064bcba === 0)) {
      DAT_00673f64 = DAT_00673f80;
    }
    DAT_00673f54 = 2;
    if ((DAT_00673f64 < ((DAT_0064bcbc) << 16 >> 16))) {
      if ((DAT_00673f64 < ((DAT_0064bcbe) << 16 >> 16))) {
        if ((((DAT_0064bcc2) << 16 >> 16) < DAT_00673f64)) {
          if ((DAT_00673f64 <= ((DAT_0064bcc0) << 16 >> 16))) {
            DAT_00673f54 = 3;
          }
        }
        else {
          DAT_00673f54 = 4;
        }
      }
      else {
        DAT_00673f54 = 1;
      }
    }
    else {
      DAT_00673f54 = 0;
    }
    local_8 = DAT_00673f54;
    if ((((DAT_0064bcba) << 16 >> 16) !== param_1)) {
      local_8 = (4 - DAT_00673f54);
    }
    /* switch */ () {
    case 0 :
      DAT_00673f68 = 0x3e8;
      break;
    case 1 :
      DAT_00673f68 = 0x2ee;
      break;
    case 2 :
      DAT_00673f68 = 0x1f4;
      break;
    case 3 :
      DAT_00673f68 = 0xfa;
      break;
    case 4 :
      DAT_00673f68 = 0;
    }
    DAT_00673f68 = (DAT_00673f68 + DAT_00673f80 * 0xa);
    if ((0 < DAT_00673f7c)) {
      DAT_00673f68 = (DAT_00673f68 + DAT_00673f80 * 0xa) * 2;
    }
    DAT_00673f7c = -1;
    DAT_00673f88 = DAT_00673f68;
    iVar1 = DAT_00673f68;
  }
  return iVar1;
}


 export function FUN_004a3060 ()

 {
  let pcVar1;
  let sVar2;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  for (/* cond: (local_8 < 0x15) */); local_8 = (local_8 < 0x15); local_8 = (local_8 + 1)) {
    local_c = 1;
    while ((((s16((DAT_0064c6a6 + local_c * 0x594), 0)) << 16 >> 16) !== local_8)) {
      local_c = (local_c + 1);
    }
    if ((local_c < 8)) {
      sVar2 = 0x18;
      pcVar1 = FUN_00493c7d(local_c);
      _strncpy((DAT_006a1d88 + (local_8 * 5 + 0xd2) * 8), pcVar1, sVar2);
      DAT_006a1d9f[(local_8 * 5 + 0xd2) * 8] = 0;
      sVar2 = 0x18;
      pcVar1 = FUN_00493d13(local_c);
      _strncpy((DAT_006a1d88 + (local_8 * 5 + 0x13b) * 8), pcVar1, sVar2);
      DAT_006a1d9f[(local_8 * 5 + 0x13b) * 8] = 0;
      w32((DAT_006a2d28 + local_8 * 0x58), 0, ((s16((DAT_0064bcf8 + local_c * 0xf2), 0)) << 16 >> 16));
    }
    else {
      if ((s16((DAT_00655504 + local_8 * 0x30), 0) < 1)) {
        local_10 = ((~((s16((DAT_00655504 + local_8 * 0x30), 0)) << 16 >> 16)) + 1);
      }
      else {
        local_10 = ((s16((DAT_00655504 + local_8 * 0x30), 0)) << 16 >> 16);
      }
      sVar2 = 0x18;
      pcVar1 = FUN_00428b0c(local_10);
      _strncpy((DAT_006a1d88 + (local_8 * 5 + 0xd2) * 8), pcVar1, sVar2);
      DAT_006a1d9f[(local_8 * 5 + 0xd2) * 8] = 0;
      if ((s16((DAT_00655506 + local_8 * 0x30), 0) < 1)) {
        local_14 = ((~((s16((DAT_00655506 + local_8 * 0x30), 0)) << 16 >> 16)) + 1);
      }
      else {
        local_14 = ((s16((DAT_00655506 + local_8 * 0x30), 0)) << 16 >> 16);
      }
      sVar2 = 0x18;
      pcVar1 = FUN_00428b0c(local_14);
      _strncpy((DAT_006a1d88 + (local_8 * 5 + 0x13b) * 8), pcVar1, sVar2);
      DAT_006a1d9f[(local_8 * 5 + 0x13b) * 8] = 0;
      w32((DAT_006a2d28 + local_8 * 0x58), 0, ((s16((DAT_00655500 + local_8 * 0x30), 0)) << 16 >> 16));
    }
    w32((DAT_006a2d2c + local_8 * 0x58), 0, (s8(DAT_006554f8[local_8 * 0x30]) + 1));
    w32((DAT_006a2d30 + local_8 * 0x58), 0, (s8(DAT_006554f9[local_8 * 0x30]) + 1));
    w32((DAT_006a2d34 + local_8 * 0x58), 0, (s8(DAT_006554fa[local_8 * 0x30]) + 1));
  }
  for (/* cond: (local_8 < 7) */); local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
    sVar2 = 0xf;
    pcVar1 = FUN_00428b0c(s32((DAT_0064b9a0 + local_8 * 4), 0));
    _strncpy((DAT_006a1b98 + local_8 * 0xf), pcVar1, sVar2);
    DAT_006a1ba6[local_8 * 0xf] = 0;
    sVar2 = 0xf;
    pcVar1 = FUN_00428b0c(s32((DAT_00654fe0 + local_8 * 8), 0));
    _strncpy((DAT_006a1b98 + (local_8 * 3 + 0x15) * 5), pcVar1, sVar2);
    DAT_006a1ba6[local_8 * 0xf] = 0;
    sVar2 = 0xf;
    pcVar1 = FUN_00428b0c(s32((DAT_00654fe4 + local_8 * 8), 0));
    _strncpy((DAT_006a1b98 + (local_8 * 3 + 0x2a) * 5), pcVar1, sVar2);
    DAT_006a1ba6[local_8 * 0xf] = 0;
  }
  for (/* cond: (local_8 < 0x10) */); local_8 = (local_8 < 0x10); local_8 = (local_8 + 1)) {
    sVar2 = 0xa;
    pcVar1 = FUN_00428b0c(s32((DAT_0064b168 + local_8 * 4), 0));
    _strncpy((DAT_006a1cd8 + local_8 * 0xa), pcVar1, sVar2);
    DAT_006a1ce1[local_8 * 0xa] = 0;
  }
  return;
}


 export function FUN_004a3426 ()

 {
  let pcVar1;
  let pcVar2;
  let sVar3;
  let local_c;
  let local_8;

  for (/* cond: (local_8 < 0x15) */); local_8 = (local_8 < 0x15); local_8 = (local_8 + 1)) {
    local_c = 1;
    while ((((s16((DAT_0064c6a6 + local_c * 0x594), 0)) << 16 >> 16) !== local_8)) {
      local_c = (local_c + 1);
    }
    if ((local_c < 8)) {
      w16((DAT_0064bcf8 + local_c * 0xf2), 0, ((s32((DAT_006a2d28 + local_8 * 0x58), 0)) & 0xFFFF));
    }
    w16((DAT_00655500 + local_8 * 0x30), 0, ((s32((DAT_006a2d28 + local_8 * 0x58), 0)) & 0xFFFF));
    DAT_006554f8[local_8 * 0x30] = (((s32((DAT_006a2d2c + local_8 * 0x58), 0)) & 0xFF) + 0xff);
    DAT_006554f9[local_8 * 0x30] = (((s32((DAT_006a2d30 + local_8 * 0x58), 0)) & 0xFF) + 0xff);
    DAT_006554fa[local_8 * 0x30] = (((s32((DAT_006a2d34 + local_8 * 0x58), 0)) & 0xFF) + 0xff);
  }
  for (/* cond: (local_8 < 7) */); local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
    sVar3 = 0xf;
    pcVar1 = (DAT_006a1b98 + local_8 * 0xf);
    pcVar2 = FUN_00428b0c(s32((DAT_0064b9a0 + local_8 * 4), 0));
    _strncpy(pcVar2, pcVar1, sVar3);
    sVar3 = 0xf;
    pcVar1 = (DAT_006a1b98 + (local_8 * 3 + 0x15) * 5);
    pcVar2 = FUN_00428b0c(s32((DAT_00654fe0 + local_8 * 8), 0));
    _strncpy(pcVar2, pcVar1, sVar3);
    sVar3 = 0xf;
    pcVar1 = (DAT_006a1b98 + (local_8 * 3 + 0x2a) * 5);
    pcVar2 = FUN_00428b0c(s32((DAT_00654fe4 + local_8 * 8), 0));
    _strncpy(pcVar2, pcVar1, sVar3);
  }
  for (/* cond: (local_8 < 0x10) */); local_8 = (local_8 < 0x10); local_8 = (local_8 + 1)) {
    sVar3 = 0xa;
    pcVar1 = (DAT_006a1cd8 + local_8 * 0xa);
    pcVar2 = FUN_00428b0c(s32((DAT_0064b168 + local_8 * 4), 0));
    _strncpy(pcVar2, pcVar1, sVar3);
  }
  return;
}


 export function FUN_004a3640 ()

 {
  let iVar1;
  let local_c;

  for (/* cond: (local_c < 5) */); local_c = (local_c < 5); local_c = (local_c + 1)) {
    if ((s32((DAT_0062cd68 + local_c * 8), 0) === 9)) {
      FUN_00418a30((DAT_006a1d88 + (s32((DAT_006a4f88 + 0x2ec), 0) * 5 + 0x13b) * 8));
    }
    else if ((s32((DAT_0062cd68 + local_c * 8), 0) === 0xc)) {
      iVar1 = FUN_00418740();
      FUN_00418d90(s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0));
    }
  }
  return;
}


 export function FUN_004a3757 ()

 {
  let iVar1;
  let local_24;
  let local_20;
  let local_8;

  for (/* cond: (local_24 < 5) */); local_24 = (local_24 < 5); local_24 = (local_24 + 1)) {
    if ((s32((DAT_0062cd68 + local_24 * 8), 0) === 9)) {
      FUN_00418a70(DAT_ffffffe0);
      _strncpy((DAT_006a1d88 + (s32((DAT_006a4f88 + 0x2ec), 0) * 5 + 0x13b) * 8), DAT_ffffffe0, 0x18);
    }
    else if ((s32((DAT_0062cd68 + local_24 * 8), 0) === 0xc)) {
      local_8 = FUN_00418d60();
      iVar1 = FUN_00418740();
      w32((DAT_006a2a00 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0, local_8);
    }
  }
  return;
}


 export function FUN_004a3889 ()

 {
  FUN_004a4f89();
  return;
}


 export function FUN_004a38a4 (param_1)

 {
  let pcVar1;
  let sVar2;
  let local_10;
  let local_c;
  let local_8;

  for (/* cond: (local_8 < 7) */); local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
    FUN_0040bbb0();
    FUN_0040ff00(s32((DAT_0064b9a0 + local_8 * 4), 0));
    FUN_005f22e0(DAT_00679640, DAT_0062cd90);
    pcVar1 = FUN_00428b0c(s32((DAT_0064b9a0 + local_8 * 4), 0));
    sVar2 = _strlen(pcVar1);
    if ((sVar2 < 0xf)) {
      pcVar1 = FUN_00428b0c(s32((DAT_0064b9a0 + local_8 * 4), 0));
      local_c = _strlen(pcVar1);
    }
    else {
      local_c = 0xf;
    }
    FUN_004190a0((0xf - local_c));
    FUN_0040ff00(s32((DAT_00654fe0 + local_8 * 8), 0));
    FUN_005f22e0(DAT_00679640, DAT_0062cd94);
    pcVar1 = FUN_00428b0c(s32((DAT_00654fe0 + local_8 * 8), 0));
    sVar2 = _strlen(pcVar1);
    if ((sVar2 < 0xc)) {
      pcVar1 = FUN_00428b0c(s32((DAT_00654fe0 + local_8 * 8), 0));
      local_10 = _strlen(pcVar1);
    }
    else {
      local_10 = 0xc;
    }
    FUN_004190a0((0xc - local_10));
    FUN_0040ff00(s32((DAT_00654fe4 + local_8 * 8), 0));
    FUN_005f22e0(DAT_00679640, DAT_0062cd98);
    _fputs(DAT_00679640, param_1);
  }
  return 1;
}


 export function FUN_004a3a21 (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let pcVar3;
  let sVar4;
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
  let local_88;
  let local_84;

  uVar1 = DAT_0062cd20;
  DAT_0062cd20 = param_2;
  for (/* cond: (local_88 < 0x15) */); local_88 = (local_88 < 0x15); local_88 = (local_88 + 1)) {
    FUN_004a23fc(1);
    FUN_004a24b1();
    FUN_004a24b1();
    uVar2 = FUN_004a2534(0, 1);
    uVar2 = FUN_005adfa0(uVar2);
    FUN_004a2534();
    FUN_004a2534();
    FUN_004a24b1();
    FUN_004a24b1();
    FUN_004a2534();
    FUN_004a2534();
    FUN_004a2534();
    FUN_005f22d0(DAT_ffffff7c, DAT_00673f14);
    FUN_0040bbb0();
    if ((s16((DAT_00655508 + local_88 * 0x30), 0) < 1)) {
      local_94 = ((~((s16((DAT_00655508 + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
    }
    else {
      local_94 = ((s16((DAT_00655508 + local_88 * 0x30), 0)) << 16 >> 16);
    }
    FUN_0040ff00(local_94);
    FUN_005f22e0(DAT_00679640, DAT_0062cd9c);
    if ((s16((DAT_00655508 + local_88 * 0x30), 0) < 1)) {
      local_9c = ((~((s16((DAT_00655508 + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
    }
    else {
      local_9c = ((s16((DAT_00655508 + local_88 * 0x30), 0)) << 16 >> 16);
    }
    pcVar3 = FUN_00428b0c(local_9c);
    sVar4 = _strlen(pcVar3);
    if ((sVar4 < 0xd)) {
      if ((s16((DAT_00655508 + local_88 * 0x30), 0) < 1)) {
        local_a0 = ((~((s16((DAT_00655508 + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
      }
      else {
        local_a0 = ((s16((DAT_00655508 + local_88 * 0x30), 0)) << 16 >> 16);
      }
      pcVar3 = FUN_00428b0c(local_a0);
      local_98 = _strlen(pcVar3);
    }
    else {
      local_98 = 0xd;
    }
    FUN_004190a0((0xd - local_98));
    if ((s16((DAT_0065550a + local_88 * 0x30), 0) < 1)) {
      local_a4 = ((~((s16((DAT_0065550a + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
    }
    else {
      local_a4 = ((s16((DAT_0065550a + local_88 * 0x30), 0)) << 16 >> 16);
    }
    FUN_0040ff00(local_a4);
    FUN_005f22e0(DAT_00679640, DAT_0062cda0);
    if ((s16((DAT_0065550a + local_88 * 0x30), 0) < 1)) {
      local_ac = ((~((s16((DAT_0065550a + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
    }
    else {
      local_ac = ((s16((DAT_0065550a + local_88 * 0x30), 0)) << 16 >> 16);
    }
    pcVar3 = FUN_00428b0c(local_ac);
    sVar4 = _strlen(pcVar3);
    if ((sVar4 < 0x14)) {
      if ((s16((DAT_0065550a + local_88 * 0x30), 0) < 1)) {
        local_b0 = ((~((s16((DAT_0065550a + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
      }
      else {
        local_b0 = ((s16((DAT_0065550a + local_88 * 0x30), 0)) << 16 >> 16);
      }
      pcVar3 = FUN_00428b0c(local_b0);
      local_a8 = _strlen(pcVar3);
    }
    else {
      local_a8 = 0x14;
    }
    FUN_004190a0((0x14 - local_a8));
    FUN_0040ff30(uVar2);
    FUN_005f22e0(DAT_00679640, DAT_0062cda4);
    FUN_0040ff30(((s16((DAT_006554fe + local_88 * 0x30), 0)) << 16 >> 16));
    FUN_005f22e0(DAT_00679640, DAT_0062cda8);
    FUN_0040ff30(((s16((DAT_00655500 + local_88 * 0x30), 0)) << 16 >> 16));
    FUN_005f22e0(DAT_00679640, DAT_0062cdac);
    if ((s16((DAT_00655504 + local_88 * 0x30), 0) < 1)) {
      local_b4 = ((~((s16((DAT_00655504 + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
    }
    else {
      local_b4 = ((s16((DAT_00655504 + local_88 * 0x30), 0)) << 16 >> 16);
    }
    FUN_0040ff00(local_b4);
    FUN_005f22e0(DAT_00679640, DAT_0062cdb0);
    if ((s16((DAT_00655504 + local_88 * 0x30), 0) < 1)) {
      local_bc = ((~((s16((DAT_00655504 + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
    }
    else {
      local_bc = ((s16((DAT_00655504 + local_88 * 0x30), 0)) << 16 >> 16);
    }
    pcVar3 = FUN_00428b0c(local_bc);
    sVar4 = _strlen(pcVar3);
    if ((sVar4 < 0xc)) {
      if ((s16((DAT_00655504 + local_88 * 0x30), 0) < 1)) {
        local_c0 = ((~((s16((DAT_00655504 + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
      }
      else {
        local_c0 = ((s16((DAT_00655504 + local_88 * 0x30), 0)) << 16 >> 16);
      }
      pcVar3 = FUN_00428b0c(local_c0);
      local_b8 = _strlen(pcVar3);
    }
    else {
      local_b8 = 0xc;
    }
    FUN_004190a0((0xc - local_b8));
    if ((s16((DAT_00655506 + local_88 * 0x30), 0) < 1)) {
      local_c4 = ((~((s16((DAT_00655506 + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
    }
    else {
      local_c4 = ((s16((DAT_00655506 + local_88 * 0x30), 0)) << 16 >> 16);
    }
    FUN_0040ff00(local_c4);
    FUN_005f22e0(DAT_00679640, DAT_0062cdb4);
    if ((s16((DAT_00655506 + local_88 * 0x30), 0) < 1)) {
      local_cc = ((~((s16((DAT_00655506 + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
    }
    else {
      local_cc = ((s16((DAT_00655506 + local_88 * 0x30), 0)) << 16 >> 16);
    }
    pcVar3 = FUN_00428b0c(local_cc);
    sVar4 = _strlen(pcVar3);
    if ((sVar4 < 0xb)) {
      if ((s16((DAT_00655506 + local_88 * 0x30), 0) < 1)) {
        local_d0 = ((~((s16((DAT_00655506 + local_88 * 0x30), 0)) << 16 >> 16)) + 1);
      }
      else {
        local_d0 = ((s16((DAT_00655506 + local_88 * 0x30), 0)) << 16 >> 16);
      }
      pcVar3 = FUN_00428b0c(local_d0);
      local_c8 = _strlen(pcVar3);
    }
    else {
      local_c8 = 0xb;
    }
    FUN_004190a0((0xb - local_c8));
    FUN_004ccdb6(s8(DAT_006554f8[local_88 * 0x30]));
    FUN_005f22e0(DAT_00679640, DAT_0062cdb8);
    FUN_004ccdb6(s8(DAT_006554f9[local_88 * 0x30]));
    FUN_005f22e0(DAT_00679640, DAT_0062cdbc);
    FUN_004ccdb6(s8(DAT_006554fa[local_88 * 0x30]));
    FUN_005f22e0(DAT_00679640, DAT_0062cdc0);
    FUN_005f22e0(DAT_00679640, DAT_ffffff7c);
    FUN_005f22e0(DAT_00679640, DAT_0062cdc4);
    _fputs(DAT_00679640, param_1);
  }
  DAT_0062cd20 = uVar1;
  return 1;
}


 export function FUN_004a41d8 (param_1)

 {
  let local_8;

  for (/* cond: (local_8 < 0x10) */); local_8 = (local_8 < 0x10); local_8 = (local_8 + 1)) {
    FUN_0040bbb0();
    FUN_0040ff00(s32((DAT_0064b168 + local_8 * 4), 0));
    FUN_005f22e0(DAT_00679640, DAT_0062cdc8);
    _fputs(DAT_00679640, param_1);
  }
  return 1;
}


 export function FUN_004a4249 ()

 {
  let iVar1;
  let lpText;
  let lpCaption;
  let uType;
  let local_24;

  FUN_004a3757();
  FUN_004cd8a6();
  FUN_004a3426();
  FUN_004ccab9(s_GOVERNMENTS_0062cdcc, LAB_00401ba4);
  FUN_004ccaed(s_LEADERS_0062cdd8, LAB_0040211c);
  FUN_004ccaed(s_CARAVAN_0062cde0, LAB_00401f87);
  iVar1 = FUN_004ccf2d();
  if ((iVar1 === 0)) {
    _sprintf(DAT_ffffffdc, s_Error_updating_RULES.%s_0062cde8, DAT_0062cd24);
    uType = 0x10;
    lpCaption = s_File_I/O_Error_0062ce00;
    lpText = DAT_ffffffdc;
    iVar1 = FUN_00414d10();
    FUN_006e7dd4(s32((iVar1 + 4), 0), lpText, lpCaption, uType);
  }
  DAT_006a1d7c = 0;
  DAT_006a4f88 = (DAT_006a4f88 + 0x48);
  FUN_004e4ceb();
  return;
}


 export function FUN_004a4304 ()

 {
  let sVar1;
  let unaff_FS_OFFSET;
  let local_414;
  let local_410;
  let local_30c;
  let local_1f4;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004a44ae;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_006a4f88 === 0)) {
    local_414 = 0;
  }
  else {
    local_414 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_414);
  local_30c = DAT_fffffcf4;
  FUN_0059e6ff(0xdc);
  FUN_0059e5c9(0x10, 0xdc, 0);
  for (/* cond: (local_18 < 0x10) */); local_18 = (local_18 < 0x10); local_18 = (local_18 + 1)) {
    FUN_0059edf0((DAT_006a1cd8 + local_18 * 0xa), local_18, 0);
  }
  local_1f4 = 0xdc;
  local_18 = FUN_0040bc80(0);
  if ((-1 < local_18)) {
    do {
      local_14 = FUN_0051d63b(s_DEBUG_006359dc, s_COMMONAME_0062ce1c, 9, (DAT_006a1cd8 + local_18 * 0xa), DAT_fffffbf0);
      if ((local_14 === -1));
    } while ((sVar1 === 0));
    if ((-1 < local_14)) {
      _strncpy((DAT_006a1cd8 + local_18 * 0xa), DAT_fffffbf0, 0xa);
    }
  }
  FUN_0059d3c9(0);
  local_8 = -1;
  FUN_004a44a2();
  FUN_004a44b8();
  return;
}


 export function FUN_004a44a2 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004a44b8 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004a44c6 ()

 {
  let sVar1;
  let unaff_FS_OFFSET;
  let local_414;
  let local_410;
  let local_30c;
  let local_1f4;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004a4673;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_006a4f88 === 0)) {
    local_414 = 0;
  }
  else {
    local_414 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_414);
  local_30c = DAT_fffffcf4;
  FUN_0059e6ff(0xdc);
  FUN_0059e5c9(7, 0xdc, 0);
  for (/* cond: (local_18 < 7) */); local_18 = (local_18 < 7); local_18 = (local_18 + 1)) {
    FUN_0059edf0((DAT_006a1b98 + local_18 * 0xf), local_18, 0);
  }
  local_1f4 = 0xdc;
  local_18 = FUN_0040bc80(0);
  if ((-1 < local_18)) {
    do {
      local_14 = FUN_0051d63b(s_DEBUG_006359dc, s_GOVTNAME_0062ce34, 0xe, (DAT_006a1b98 + local_18 * 0xf), DAT_fffffbf0);
      if ((local_14 === -1));
    } while ((sVar1 === 0));
    if ((-1 < local_14)) {
      _strncpy((DAT_006a1b98 + local_18 * 0xf), DAT_fffffbf0, 0xf);
    }
  }
  FUN_0059d3c9(0);
  local_8 = -1;
  FUN_004a4667();
  FUN_004a467d();
  return;
}


 export function FUN_004a4667 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004a467d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004a468b ()

 {
  let iVar1;
  let sVar2;
  let unaff_FS_OFFSET;
  let local_464;
  let local_460;
  let local_45c;
  let local_458;
  let local_454;
  let local_450;
  let local_34c;
  let local_30c;
  let local_1f4;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004a4954;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_006a4f88 === 0)) {
    local_454 = 0;
  }
  else {
    local_454 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_454);
  local_30c = DAT_fffffcf4;
  FUN_0059e6ff(0x190);
  FUN_0059e5c9(0xe, 0x190, 0);
  for (/* cond: (local_18 < 0xe) */); local_18 = local_18; local_18 = (local_18 + 1)) {
    if (((local_18 & 1) === 0)) {
      iVar1 = ((local_18 >> 1) * 3 + 0x15);
    }
    else {
      iVar1 = ((local_18 >> 1) * 3 + 0x2a);
    }
    local_458 = (DAT_006a1b98 + iVar1 * 5);
    if (((local_18 & 1) === 0)) {
      local_45c = FUN_00428b0c(s32((DAT_00628420 + 0x8fc), 0));
    }
    else {
      local_45c = FUN_00428b0c(s32((DAT_00628420 + 0x900), 0));
    }
    _sprintf(DAT_fffffcb4, s_%s_%s_(%s)_0062ce4c, (DAT_006a1b98 + (local_18 >> 1) * 0xf), local_45c, local_458);
    FUN_0059edf0(DAT_fffffcb4, local_18, 0);
  }
  local_1f4 = 0x190;
  local_18 = FUN_0040bc80(0);
  if ((-1 < local_18)) {
    do {
      if (((local_18 & 1) === 0)) {
        iVar1 = ((local_18 >> 1) * 3 + 0x15);
      }
      else {
        iVar1 = ((local_18 >> 1) * 3 + 0x2a);
      }
      local_460 = (DAT_006a1b98 + iVar1 * 5);
      local_14 = FUN_0051d63b(s_DEBUG_006359dc, s_TITLENAME_0062ce58, 0xe, local_460, DAT_fffffbb0);
      if ((local_14 === -1));
    } while ((sVar2 === 0));
    if ((-1 < local_14)) {
      if (((local_18 & 1) === 0)) {
        iVar1 = ((local_18 >> 1) * 3 + 0x15);
      }
      else {
        iVar1 = ((local_18 >> 1) * 3 + 0x2a);
      }
      local_464 = (DAT_006a1b98 + iVar1 * 5);
      _strncpy(local_464, DAT_fffffbb0, 0xf);
    }
  }
  FUN_0059d3c9(0);
  local_8 = -1;
  FUN_004a4948();
  FUN_004a495e();
  return;
}


 export function FUN_004a4948 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004a495e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004a496c ()

 {
  let local_8;

  if ((DAT_006a4f88 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(DAT_0062ce6c, s_TRIBES_0062ce64);
  FUN_0059d3c9(0);
  return;
}


 export function FUN_004a49cb ()

 {
  DAT_006a1d7c = 0;
  DAT_006a4f88 = (DAT_006a4f88 + 0x48);
  return;
}


 export function FUN_004a49f3 (param_1)

 {
  let uVar1;

  if ((param_1 === 0xc9)) {
    FUN_004a3757();
    uVar1 = FUN_00418d60();
    w32((DAT_006a4f88 + 0x2ec), 0, uVar1);
    FUN_004a3640();
    FUN_004a3889();
  }
  else if ((param_1 === 0xca)) {
    FUN_004a3757();
    FUN_004a3889();
  }
  return;
}


 export function FUN_004a4a58 (in_ECX, param_1)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_28;
  let local_18;
  let local_14;

  iVar1 = (s32((DAT_0062cd38 + param_1 * 8), 0) + s32((in_ECX + 0x124), 0));
  iVar2 = (s32((DAT_0062cd3c + param_1 * 8), 0) + s32((in_ECX + 0x128), 0));
  if ((param_1 === 0)) {
    FUN_004086c0(DAT_ffffffec, (iVar1 + -50), iVar2, 0xc8, (s32((in_ECX + 0x2e8), 0) << 3));
  }
  else if ((param_1 < 2)) {
    FUN_004086c0(DAT_ffffffec, (iVar1 + -15), iVar2, 0x82, (s32((in_ECX + 0x2e8), 0) << 3));
  }
  else {
    FUN_004086c0(DAT_ffffffec, iVar1, iVar2, 0x64, (s32((in_ECX + 0x2e8), 0) << 3));
  }
  iVar1 = DAT_006a1d80;
  DAT_006a1d80 = (DAT_006a1d80 + 1);
  if ((in_ECX === 0)) {
    local_28 = 0;
  }
  else {
    local_28 = (in_ECX + 0x48);
  }
  FUN_00418bf0(local_28, iVar1, DAT_ffffffec);
  FUN_00418c70(DAT_006a4f90);
  FUN_00418dd0(LAB_00401424);
  /* switch */ () {
  case 0 :
    for (/* cond: (local_18 < 0x15) */); local_18 = (local_18 < 0x15); local_18 = (local_18 + 1)) {
      FUN_00418ce0((DAT_006a1d88 + (local_18 * 5 + 0xd2) * 8));
    }
    break;
  case 1 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x834), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x838), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x83c), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x840), 0));
    FUN_00418ce0(uVar3);
    break;
  case 2 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x904), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x908), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x90c), 0));
    FUN_00418ce0(uVar3);
    break;
  case 3 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x910), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x914), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x918), 0));
    FUN_00418ce0(uVar3);
    break;
  case 4 :
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x91c), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x914), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x920), 0));
    FUN_00418ce0(uVar3);
  }
  return;
}


 export function FUN_004a4eb2 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_24;
  let local_14;

  FUN_004086c0(DAT_ffffffec, (s32(DAT_0062cd60, param_1 * 2) + s32((in_ECX + 0x124), 0)), (s32(DAT_0062cd64, param_1 * 2) + s32((in_ECX + 0x128), 0)), 0x64, (s32((in_ECX + 0x2e8), 0) + 6));
  iVar1 = DAT_006a1d80;
  DAT_006a1d80 = (DAT_006a1d80 + 1);
  if ((in_ECX === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = (in_ECX + 0x48);
  }
  FUN_00418910(local_24, iVar1, DAT_ffffffec, DAT_0062ce74);
  FUN_004189c0(0x17);
  return;
}


 export function FUN_004a4f89 (in_ECX)

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
  local_18 = (s32((DAT_006a2d28 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58), 0) * 0x1e0 + 0x63ffb8);
  uVar1 = FUN_00417f70();
  FUN_005a9abf(in_ECX, local_8, local_c, 0x40, 0x40, uVar1);
  FUN_005cef66(DAT_ffffffd8, in_ECX, 0, local_8, (local_c + 8));
  FUN_004ccb6a(in_ECX, local_8, local_c, 0x40, 0x40, 6);
  local_8 = ((s32((in_ECX + 0x12c), 0) + s32((in_ECX + 0x124), 0)) + -96);
  local_c = (s32((in_ECX + 0x128), 0) + 0x20);
  FUN_005a9abf(in_ECX, local_8, local_c, 0x40, 0x40, s32((DAT_0065535c + ((s16((DAT_006554fe + s32((in_ECX + 0x2ec), 0) * 0x30), 0)) << 16 >> 16) * 0x10), 0));
  FUN_005a9abf(in_ECX, (local_8 + 0x10), (local_c + 0x10), 0x20, 0x20, s32((DAT_00655358 + ((s16((DAT_006554fe + s32((in_ECX + 0x2ec), 0) * 0x30), 0)) << 16 >> 16) * 0x10), 0));
  FUN_004ccb6a(in_ECX, local_8, local_c, 0x40, 0x40, 6);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0xa, 0xa, 0, 0);
  local_8 = (DAT_0062cd60 + s32((in_ECX + 0x124), 0));
  local_c = (DAT_0062cd64 + s32((in_ECX + 0x128), 0));
  FUN_005a9abf(in_ECX, local_8, local_c, 0x64, (s32((in_ECX + 0x2e8), 0) + 6), 0x29);
  FUN_005a9964(in_ECX, local_8, local_c, 0x64, (s32((in_ECX + 0x2e8), 0) + 6), 0xa);
  FUN_0040bbb0();
  FUN_00414d70((DAT_006a1d88 + (s32((DAT_006a4f88 + 0x2ec), 0) * 5 + 0x13b) * 8));
  FUN_005baf57(in_ECX, DAT_00679640, (local_8 + 3), (local_c + 2));
  FUN_005baee0(0x29, 0x12, 1, 1);
  local_8 = (s32((in_ECX + 0x124), 0) + 0x59);
  local_c = (s32((in_ECX + 0x128), 0) + 0x109);
  FUN_004ccb6a(in_ECX, local_8, local_c, 0x17c, 0x45, 6);
  local_10 = (s32((in_ECX + 0x124), 0) + (s32((in_ECX + 0x12c), 0) / 2 | 0));
  local_14 = (s32((in_ECX + 0x128), 0) + 0x10d);
  FUN_0040bbb0();
  FUN_0040bc10(0x25d);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_0062cd40 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_0062cd44 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x219);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_0062cd60 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_0062cd64 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x249);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_0062cd48 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_0062cd4c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1e5);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_0062cd50 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_0062cd54 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x24a);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_0062cd58 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_0062cd5c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x24b);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  FUN_00408460();
  return;
}


 export function FUN_004a54d9 (in_ECX)

 {
  let pvVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let extraout_EAX;
  let extraout_EAX_00;
  // in_ECX promoted to parameter;
  let iVar5;
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
  puStack_c = LAB_004a5d7a;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  DAT_006a1d7c = 1;
  DAT_006a4f88 = in_ECX;
  pvVar1 = operator_new(0x48);
  local_8 = 1;
  if ((pvVar1 === 0)) {
    local_468 = 0;
  }
  else {
    local_468 = FUN_005bd630();
  }
  local_8 = (UNNAMED << 8);
  DAT_0062e018 = local_468;
  FUN_00417ef0(0, DAT_0062e01c);
  FUN_005d268e(DAT_006a4f90);
  w32((in_ECX + 0x2d8), 0, 0x230);
  w32((in_ECX + 0x2dc), 0, 0x17c);
  w32((in_ECX + 0x2ec), 0, 0);
  DAT_006a1d80 = 0xc9;
  FUN_005bf071(s_EDITORSA.GIF_0062ce78, 0xa, 0xc0, DAT_fffffbbc);
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
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x930), 0), 0xd, 0, 0, uVar9, uVar2, 0, 0, 0);
  FUN_005534bc(uVar3, uVar6, uVar7, uVar8, uVar9, uVar2, uVar10, uVar11, uVar12);
  FUN_004a3060();
  for (/* cond: (local_460 < 5) */); local_460 = (local_460 < 5); local_460 = (local_460 + 1)) {
    if ((s32((DAT_0062cd68 + local_460 * 8), 0) === 9)) {
      FUN_004a4eb2(s32((DAT_0062cd6c + local_460 * 8), 0));
    }
    else if ((s32((DAT_0062cd68 + local_460 * 8), 0) === 0xc)) {
      FUN_004a4a58(s32((DAT_0062cd6c + local_460 * 8), 0));
    }
  }
  iVar4 = FUN_004a6980();
  w32((in_ECX + 0x2e0), 0, (iVar4 + 0x2d));
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  w32((in_ECX + 0x2e4), 0, (extraout_EAX + 8));
  iVar5 = ((s32((in_ECX + 0x128), 0) + (s32((in_ECX + 0x2e4), 0) * 3 / 2 | 0)) + 0x101);
  iVar4 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar4 + 0x69), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_474 = 0;
  }
  else {
    local_474 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x940), 0));
  FUN_0040f680(local_474, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00402775);
  FUN_004086c0(DAT_fffffbac, (iVar4 + 0xe1), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_478 = 0;
  }
  else {
    local_478 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x944), 0));
  FUN_0040f680(local_478, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00401631);
  FUN_004086c0(DAT_fffffbac, (iVar4 + 0x159), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_47c = 0;
  }
  else {
    local_47c = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x948), 0));
  FUN_0040f680(local_47c, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00402bda);
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  w32((in_ECX + 0x2e4), 0, (extraout_EAX_00 + 8));
  w32((in_ECX + 0x2e0), 0, ((s32((in_ECX + 0x12c), 0) + -8) / 3 | 0));
  iVar5 = ((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2e4), 0) + 2));
  iVar4 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar4 + 2), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_480 = 0;
  }
  else {
    local_480 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_480, 0x65, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_0040275c);
  iVar4 = ((iVar4 + 2) + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar4, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_484 = 0;
  }
  else {
    local_484 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x8ec), 0));
  FUN_0040f680(local_484, 0x66, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_00401bea);
  FUN_004086c0(DAT_fffffbac, (iVar4 + (s32((in_ECX + 0x2e0), 0) + 2)), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_488 = 0;
  }
  else {
    local_488 = (in_ECX + 0x48);
  }
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(local_488, 0x66, DAT_fffffbac, uVar2);
  FUN_0040f880(LAB_0040152d);
  FUN_0040f840();
  FUN_0040f350(0);
  FUN_00418d90(s32((in_ECX + 0x2ec), 0));
  FUN_004a3640();
  w32((in_ECX + 0x2f8), 0, 5);
  FUN_00408330(LAB_004019d8);
  in_ECX = EnableStackedTabs(in_ECX, 0x403cf1);
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
  FUN_004a5d6e();
  FUN_004a5d84();
  return;
}


 export function FUN_004a5d6e ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_004a5d84 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004a5d92 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004a5df7;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00417fa0();
  local_8 = 0;
  FUN_004a54d9();
  FUN_005bb574();
  local_8 = -1;
  FUN_004a5deb();
  FUN_004a5e01();
  return;
}


 export function FUN_004a5deb ()

 {
  FUN_004183d0();
  return;
}


 export function FUN_004a5e01 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004a6980 ()

 {
  FUN_00407f90();
  return;
}


 export function FUN_004a69b0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0xed8), 0) <= s32((in_ECX + 0x120), 0))) {
    w32((in_ECX + 0x120), 0, 0);
  }
  w32((in_ECX + 0x1b34), 0, s32((in_ECX + 0xed8), 0));
  w32((in_ECX + 0x1f38), 0, s32((in_ECX + 0x120), 0));
  w32((in_ECX + 0x1f3c), 0, s32((in_ECX + 0x120), 0));
  while (((DAT_006a85a4 % 9) !== 0)) {
    w32((in_ECX + 0x1f3c), 0, (s32((in_ECX + 0x1f3c), 0) + -1));
  }
  for (/* cond: (local_8 < s32((in_ECX + 0xed8), 0)) */); local_8 = (local_8 < s32((in_ECX + 0xed8), 0)); local_8 = (local_8 + 1)) {
    w32(((in_ECX + 0x1b38) + local_8 * 4), 0, s32(((in_ECX + 0x12dc) + local_8 * 4), 0));
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


 export function FUN_004a6b80 (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_0051d564(param_1, param_2, param_3, (DAT_00646cb8 + (s8(DAT_0062768c[param_4 * 0x10]) * 0xf0 + s8(DAT_0062768d[param_4 * 0x10]) * 0x3c)), param_5);
  return;
}


 export function FUN_004a6bdc (param_1, param_2, param_3, param_4, param_5)

 {
  let local_8;

  if ((param_4 < 0x27)) {
    local_8 = (DAT_00645160 + param_4 * 0x3c);
  }
  else {
    local_8 = (DAT_00645a84 + (param_4 * 4 + -0x9c) * 0xf);
  }
  FUN_0051d564(param_1, param_2, param_3, local_8, param_5);
  return;
}


 export function FUN_004a6c4b (param_1, param_2, param_3, param_4, param_5)

 {
  FUN_0051d564(param_1, param_2, param_3, (DAT_00641848 + param_4 * 0x3c), param_5);
  return;
}


 export function FUN_004a6c85 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_0056d289(param_2, param_3, 0, (param_5 + 2), param_6, (((DAT_00633584 === 0) - 1) & 8));
  return;
}


 export function FUN_004a6cc5 (param_1, param_2, param_3, param_4)

 {
  let unaff_FS_OFFSET;
  let local_340;
  let local_264;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004a6dde;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_4c = DAT_ffffffb4;
  local_8 = 1;
  FUN_005cdea1((2 - u8((DAT_00633584 === 0))) * 0x40, (2 - u8((DAT_00633584 === 0))) * 0x30, 0);
  local_340 = DAT_fffffcc0;
  local_340 = DAT_fffffcc0;
  local_340 = DAT_fffffcc0;
  FUN_0059ec88(DAT_ffffffb4, param_4, 0);
  FUN_0040bc80(0);
  DAT_00631edc = local_264;
  local_8 = (((local_8) >> 8) << 8);
  FUN_004a6dc9();
  local_8 = -1;
  FUN_004a6dd2();
  FUN_004a6de8();
  return;
}


 export function FUN_004a6dc9 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004a6dd2 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004a6de8 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004a6df7 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_0056baff(param_2, param_3, 4, (param_5 + 2), param_6, (((DAT_00633584 === 0) - 1) & 8), 0);
  return;
}


 export function FUN_004a6e39 (param_1, param_2, param_3, param_4)

 {
  let unaff_FS_OFFSET;
  let local_340;
  let local_264;
  let local_4c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004a6f52;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_4c = DAT_ffffffb4;
  local_8 = 1;
  FUN_005cdea1((2 - u8((DAT_00633584 === 0))) * 0x40, (2 - u8((DAT_00633584 === 0))) * 0x30, 0);
  local_340 = DAT_fffffcc0;
  local_340 = DAT_fffffcc0;
  local_340 = DAT_fffffcc0;
  FUN_0059ec88(DAT_ffffffb4, param_4, 0);
  FUN_0040bc80(0);
  DAT_00631edc = local_264;
  local_8 = (((local_8) >> 8) << 8);
  FUN_004a6f3d();
  local_8 = -1;
  FUN_004a6f46();
  FUN_004a6f5c();
  return;
}


 export function FUN_004a6f3d ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004a6f46 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004a6f5c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004a7070 (param_1)

 {
  if ((param_1 < 0x7b)) {
    param_1 = (param_1 + -32);
  }
  return param_1;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004a70b0 ()

 {
  let iVar1;
  let local_8;

  DAT_0064bc10 = 0x3f;
  _DAT_0064bc12 = 0;
  if ((0x3e7 < DAT_006ab198)) {
    _DAT_0064bc12 = 2;
  }
  DAT_0064bc14 = 0;
  DAT_0064bc16 = 0;
  DAT_0064bc18 = 0;
  _DAT_0064bc1a = 6;
  _DAT_0064bc1c = 4;
  DAT_0064bc24 = 0;
  DAT_0064bc26 = 1;
  DAT_0064bc1e = 0x3f3258;
  iVar1 = FUN_00568176(0x989680);
  if ((iVar1 === 0)) {
    DAT_0064bc1e = (0x3f3258 & -0x200001);
  }
  DAT_0064bc22 = 0;
  DAT_0064bc28 = 2;
  for (/* cond: (local_8 < 5) */); local_8 = (local_8 < 5); local_8 = (local_8 + 1)) {
    w16(DAT_0064bc2a, local_8, 0);
  }
  FUN_005f22d0(DAT_0064bc34, DAT_0062cee4);
  DAT_0064bc54 = 0;
  DAT_0064bc56 = 0;
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004a71bb ()

 {
  let local_c;
  let local_8;

  DAT_00666538 = 0;
  DAT_0066653a = 0;
  DAT_0066653c = 0;
  DAT_0066653e = 0;
  _DAT_00666540 = 0;
  DAT_00666542 = 0;
  DAT_00666544 = 0;
  DAT_00666546 = 0;
  DAT_00666548 = 0;
  DAT_0066654a = 0;
  DAT_0066654c = 0;
  DAT_0066654e = 0;
  DAT_00666550 = 0;
  DAT_00666570 = 0;
  DAT_00666590 = 0;
  DAT_006665b0 = 0;
  DAT_006665d0 = 0;
  FUN_005f22d0(DAT_006665d2, DAT_0062cee8);
  DAT_006665d8 = 0;
  _memset(DAT_006665da, 0, 0x10);
  _memset(DAT_006665ea, 0, 0x10);
  DAT_006665fa = 0;
  DAT_006665fc = 0;
  DAT_006665fe = 0;
  DAT_00666600 = 0;
  DAT_00666602 = 0;
  DAT_0066661a = 0;
  DAT_00666632 = 0;
  for (/* cond: (local_8 < 7) */); local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
    for (/* cond: (local_c < 0x18) */); local_c = (local_c < 0x18); local_c = (local_c + 1)) {
      DAT_0066664a[(local_8 * 0x18 + local_c)] = 0;
    }
  }
  _DAT_006666f2 = 0;
  return;
}


 export function FUN_004a733d ()

 {
  let _File;
  let sVar1;

  _File = _fopen(PTR_s_CIV2.DAT_0062cec8, DAT_0062ceec);
  if ((_File === 0)) {
    FUN_004a70b0();
    FUN_004a71bb();
  }
  else {
    sVar1 = _fread(DAT_0064bc10, 0x48, 1, _File);
    if ((sVar1 === 0)) {
      FUN_004a70b0();
    }
    sVar1 = _fread(DAT_00666538, 0x1bc, 1, _File);
    if ((sVar1 === 0)) {
      FUN_004a71bb();
    }
    _fclose(_File);
  }
  return;
}


 export function FUN_004a73d9 ()

 {
  let _File;
  let sVar1;
  let local_8;

  local_8 = 1;
  _File = _fopen(PTR_s_CIV2.DAT_0062cec8, DAT_0062cef0);
  if ((sVar1 !== 0)) {
    local_8 = 0;
  }
  if ((local_8 !== 0)) {
    FID_conflict:_remove(PTR_s_CIV2.DAT_0062cec8);
  }
  return local_8;
}


 export function FUN_004a74bc (param_1)

 {
  let local_8;

  DAT_0064caa0[param_1 * 0x594] = 0;
  w16((DAT_0064caa6 + param_1 * 0x594), 0, 0);
  w16((DAT_0064caa4 + param_1 * 0x594), 0, 0);
  w16((DAT_0064caa2 + param_1 * 0x594), 0, 0);
  for (/* cond: (local_8 < 6) */); local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
    w16((DAT_0064caa8 + (param_1 * 0x594 + local_8 * 2)), 0, 0);
  }
  return;
}


 export function FUN_004a7577 (param_1)

 {
  return (DAT_0064caa0[param_1 * 0x594] & 2);
}


 export function FUN_004a75a6 (param_1)

 {
  return (DAT_0064caa0[param_1 * 0x594] & 1);
}


 export function FUN_004a75d5 (param_1)

 {
  let iVar1;
  let uVar2;

  iVar1 = FUN_004a7577(param_1);
  if ((DAT_00655afa < s16((DAT_0064caa2 + param_1 * 0x594), 0))) {
    uVar2 = 0;
  }
  else {
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_004a762d (param_1)

 {
  let uVar1;
  let iVar2;

  uVar1 = FUN_00410070(param_1);
  FUN_0040ff60(0, uVar1);
  iVar2 = FUN_004a7577(param_1);
  if ((iVar2 === 0)) {
    iVar2 = FUN_004a75a6(param_1);
    if ((iVar2 !== 0)) {
      if ((2 < DAT_00655b02)) {
        FUN_00511880(0xd, 0xff, 1, 0, 0, 0);
      }
      FUN_00421ea0(s_SPACEDESTROYED_0062cf04);
    }
  }
  else {
    if ((2 < DAT_00655b02)) {
      FUN_00511880(0xc, 0xff, 1, 0, 0, 0);
    }
    FUN_00421ea0(s_SPACERETURNS_0062cef4);
  }
  FUN_004a74bc(param_1);
  return;
}


 export function FUN_004a76f5 ()

 {
  let local_8;

  DAT_00655128 = 0;
  for (/* cond: (local_8 < 0xc) */); local_8 = (local_8 < 0xc); local_8 = (local_8 + 1)) {
    w16((DAT_0065512a + local_8 * 2), 0, 0);
    DAT_00655142[local_8] = 0;
    DAT_0065515a[local_8 * 0x18] = 0;
  }
  return;
}


 export function FUN_004a7754 ()

 {
  let bVar1;
  let iVar2;
  let pbVar3;
  let local_18c;
  let aiStack_180;
  let local_80;
  let aiStack_7c;
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
  let aiStack_28;
  let local_8;

  for (/* cond: (local_5c < 0x40) */); local_5c = (local_5c < 0x40); local_5c = (local_5c + 1)) {
    w32(DAT_fffffe80, local_5c, 0);
  }
  local_4c = (((DAT_006d1160) << 16 >> 16) >> 1);
  local_54 = (((DAT_006d1162) << 16 >> 16) >> 1);
  for (/* cond: (local_18c < 8) */); local_18c = (local_18c < 8); local_18c = (local_18c + 1)) {
    iVar2 = FUN_005b67af(local_4c, local_54, local_18c, -1);
    w32(DAT_ffffff84, local_18c, iVar2);
    if ((-1 < iVar2)) {
      local_5c = FUN_005b8aa8(local_4c, local_54);
      if ((-1 < local_5c)) {
        w32(DAT_fffffe80, local_5c, (s32(DAT_fffffe80, local_5c) + 1));
      }
    }
  }
  local_38 = 0;
  for (/* cond: (local_18c < 8) */); local_18c = (local_18c < 8); local_18c = (local_18c + 1)) {
    iVar2 = s32(DAT_ffffff84, local_18c);
    if ((-1 < iVar2)) {
      local_4c = ((s16((DAT_006560f0 + iVar2 * 0x20), 0)) << 16 >> 16);
      local_54 = ((s16((DAT_006560f2 + iVar2 * 0x20), 0)) << 16 >> 16);
      local_5c = FUN_005b8aa8(local_4c, local_54);
      local_5c = FUN_005adfa0(local_5c, 0, 0x3f);
      local_2c = 0;
      local_34 = 0x3e7;
      for (/* cond: (local_3c < 8) */); local_3c = (local_3c < 8); local_3c = (local_3c + 1)) {
        iVar2 = s32(DAT_ffffff84, local_3c);
        if ((local_18c !== local_3c)) {
          local_50 = ((s16((DAT_006560f0 + iVar2 * 0x20), 0)) << 16 >> 16);
          local_80 = ((s16((DAT_006560f2 + iVar2 * 0x20), 0)) << 16 >> 16);
          iVar2 = FUN_005b8aa8(local_50, local_80);
          if ((local_5c === iVar2)) {
            local_48 = FUN_005ae31d(local_4c, local_54, local_50, local_80);
            if ((local_48 < local_34)) {
              local_34 = local_48;
            }
          }
        }
      }
      if ((9 < local_34)) {
        if ((local_34 < 0x14)) {
          local_2c = (local_2c + 1);
        }
        else if ((local_34 === 0x3e7)) {
          local_58 = (((s16((DAT_00666130 + local_5c * 0x10), 0)) << 16 >> 16) / 0x32 | 0);
          local_58 = FUN_005adfa0(local_58, 3, 6);
          local_2c = (local_2c + local_58);
        }
        else {
          local_2c = (local_2c + 2);
        }
      }
      local_44 = 0;
      local_8 = 0;
      for (/* cond: (local_30 < 0x15) */); local_30 = (local_30 < 0x15); local_30 = (local_30 + 1)) {
        local_50 = FUN_005ae052((s8(DAT_00628370[local_30]) + local_4c));
        local_80 = (s8(DAT_006283a0[local_30]) + local_54);
        iVar2 = FUN_004087c0(local_50, local_80);
        if ((iVar2 !== 0)) {
          bVar1 = FUN_005b89bb(local_50, local_80);
          local_40 = u8(bVar1);
          if ((local_40 === 2)) {
            local_44 = (local_44 + 1);
          }
          pbVar3 = FUN_005b8931(local_50, local_80);
          if (((_MEM[pbVar3] & 0x80) !== 0)) {
            local_8 = (local_8 + 1);
          }
        }
      }
      if ((local_8 < 4)) {
        if ((3 < local_44)) {
          local_2c = (local_2c + 2);
        }
      }
      else {
        local_2c = (local_2c + 4);
      }
      /* switch */ (() s16((DAT_00666130 + local_5c * 0x10), 0) ( *) (DAT_00666130 (DAT_00666130 + local_5c * 0x10) local_5c * 0x10  ) (((s16((DAT_00666130 + local_5c * 0x10), 0)) << 16 >> 16) / 0x32 | 0) ) {
      case 0 :
        break;
      case 1 :
        local_2c = (local_2c + 1);
        break;
      case 2 :
        local_2c = (local_2c + 2);
        break;
      case 3 :
        local_2c = (local_2c + 3);
        break;
      default :
        local_2c = (local_2c + 3);
      }
      if ((local_38 < local_2c)) {
        local_38 = local_2c;
      }
      w32(DAT_ffffffd8, local_18c, local_2c);
    }
  }
  for (/* cond: (local_18c < 8) */); local_18c = (local_18c < 8); local_18c = (local_18c + 1)) {
    iVar2 = s32(DAT_ffffff84, local_18c);
    if ((-1 < iVar2)) {
      if ((DAT_00655b08 === 5)) {
        FUN_005b3d06(0, local_18c, ((s16((DAT_006560f0 + iVar2 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar2 * 0x20), 0)) << 16 >> 16));
        if ((DAT_00655b08 !== 5)) {
          w32(DAT_ffffffd8, local_18c, (s32(DAT_ffffffd8, local_18c) + 3));
        }
        else {
          w32(DAT_ffffffd8, local_18c, (s32(DAT_ffffffd8, local_18c) + 1));
        }
      }
      for (/* cond: (local_30 < (local_38 - s32(DAT_ffffffd8, local_18c))) */); local_30 = (local_30 < (local_38 - s32(DAT_ffffffd8, local_18c))); local_30 = (local_30 + 1)) {
        FUN_004c21d5(local_18c, 0);
      }
    }
  }
  return;
}


 export function FUN_004a7ce9 (param_1)

 {
  let bVar1;
  let uVar2;
  let sVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let local_1c0;
  let local_1bc;
  let local_1b8;
  let local_1b4;
  let aiStack_1b0;
  let local_15c;
  let local_158;
  let local_154;
  let local_150;
  let local_14c;
  let local_148;
  let local_144;
  let local_140;
  let aiStack_13c;
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

  if ((DAT_00655af8 === 0)) {
    DAT_006ad8f0 = 1;
    if ((DAT_006ad2f7 !== 0)) {
      local_30 = ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16);
      w32((DAT_0064c6a2 + param_1 * 0x594), 0, 0);
      w16((DAT_0064c6a8 + param_1 * 0x594), 0, 0);
      DAT_0064c6b0[param_1 * 0x594] = 0;
      DAT_0064c6b2[param_1 * 0x594] = 0;
      sVar3 = DAT_00655af8;
      if ((DAT_00655af8 < 0xb)) {
        sVar3 = 0xa;
      }
      w16((DAT_0064c6ae + param_1 * 0x594), 0, sVar3);
      DAT_0064c6b5[param_1 * 0x594] = 1;
      DAT_0064c6b4[param_1 * 0x594] = 4;
      DAT_0064c6b3[param_1 * 0x594] = 4;
      w16((DAT_0064c6bc + param_1 * 0x594), 0, 0);
      DAT_0064c6be[param_1 * 0x594] = 0;
      DAT_0064c6bf[param_1 * 0x594] = 0;
      w16((DAT_0064ca72 + param_1 * 0x594), 0, 0);
      for (/* cond: (local_1c < 0xa) */); local_1c = (local_1c < 0xa); local_1c = (local_1c + 1)) {
        DAT_0064ca93[(param_1 * 0x594 + local_1c)] = 0;
      }
      DAT_0064ca93[param_1 * 0x594] = 1;
      DAT_0064ca94[param_1 * 0x594] = 1;
      DAT_0064ca96[param_1 * 0x594] = 1;
      DAT_0064ca99[param_1 * 0x594] = 1;
      w16((DAT_0064ca9e + param_1 * 0x594), 0, 0);
      for (/* cond: (local_24 < 8) */); local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
        DAT_0064c6e8[(param_1 * 0x594 + local_24)] = 0;
        DAT_0064c6e8[(local_24 * 0x594 + param_1)] = 0;
        DAT_0064c6f0[(param_1 * 0x594 + local_24)] = 0;
        DAT_0064c6f0[(local_24 * 0x594 + param_1)] = 0;
      }
      DAT_0064c6e0[param_1 * 0x594] = 0x64;
      for (/* cond: (local_24 < 8) */); local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
        if ((param_1 === 0)) {
          DAT_0064c6e0[local_24] = 0x64;
        }
        else if ((((1 << (((local_24) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          iVar4 = _rand();
          DAT_0064c6e0[(local_24 * 0x594 + param_1)] = ((((iVar4 % 0x50)) & 0xFF) + 0xa);
          DAT_0064c6e0[(param_1 * 0x594 + local_24)] = DAT_0064c6e0[(local_24 * 0x594 + param_1)];
        }
        else {
          uVar6 = 0x4b;
          uVar5 = 0xa;
          iVar4 = _rand();
          uVar2 = FUN_005adfa0(((u8(DAT_00655b08) * 5 + (iVar4 % 0x50)) + 0xa), uVar5, uVar6);
          DAT_0064c6e0[(local_24 * 0x594 + param_1)] = uVar2;
          DAT_0064c6e0[(param_1 * 0x594 + local_24)] = DAT_0064c6e0[(local_24 * 0x594 + param_1)];
        }
      }
      FUN_00493602(param_1);
      FUN_0049376f(param_1);
      for (/* cond: (local_1c < 0x40) */); local_1c = (local_1c < 0x40); local_1c = (local_1c + 1)) {
        DAT_0064ca32[(param_1 * 0x594 + local_1c)] = 5;
        w32(DAT_fffffec4, local_1c, 0);
        for (/* cond: (local_24 < 8) */); local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
          w32(DAT_fffffec4, local_1c, (s32(DAT_fffffec4, local_1c) + u8(DAT_0064c932[(local_24 * 0x594 + local_1c)])));
        }
      }
      w16((DAT_0064c708 + param_1 * 0x594), 0, 0);
      w32((DAT_0064b9e8 + param_1 * 4), 0, 0);
      w16((DAT_0064c706 + param_1 * 0x594), 0, 0);
      w16((DAT_0064c70e + param_1 * 0x594), 0, 0);
      w16((DAT_0064c710 + param_1 * 0x594), 0, 0);
      w16((DAT_0064c70c + param_1 * 0x594), 0, 0);
      w16((DAT_0064c70a + param_1 * 0x594), 0, 0);
      w16((DAT_0064c712 + param_1 * 0x594), 0, 0);
      for (/* cond: (local_1c < 4) */); local_1c = (local_1c < 4); local_1c = (local_1c + 1)) {
        DAT_0064c6b7[(param_1 * 0x594 + local_1c)] = 0;
      }
      for (/* cond: (local_24 < 8) */); local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
        w16((DAT_0064ca82 + (param_1 * 2 + local_24 * 0x594)), 0, 0xffff);
      }
      local_148 = (~(1 << (((param_1) & 0xFF) & 0x1f)));
      for (/* cond: (local_1c < 0x64) */); local_1c = (local_1c < 0x64); local_1c = (local_1c + 1)) {
        DAT_0064c714[(param_1 * 0x594 + local_1c)] = 0xff;
        DAT_00655b82[local_1c] = (DAT_00655b82[local_1c] & ((local_148) & 0xFF));
      }
      for (/* cond: (local_24 < 8) */); local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
        w32((DAT_0064c6c0 + (param_1 * 0x594 + local_24 * 4)), 0, 0);
        w32((DAT_0064c6c0 + (param_1 * 4 + local_24 * 0x594)), 0, 0);
      }
      for (/* cond: (local_1c < 0xd) */); local_1c = (local_1c < 0xd); local_1c = (local_1c + 1)) {
        DAT_0064c6f8[(param_1 * 0x594 + local_1c)] = 0;
      }
      if ((DAT_00655af8 !== 0)) {
        local_28 = (u8(DAT_00655b0a) & (1 << (((param_1) & 0xFF) & 0x1f)));
        DAT_00655b0a = (DAT_00655b0a & (~(((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF)));
        for (/* cond: (local_1c < 0x63) */); local_1c = (local_1c < 0x63); local_1c = (local_1c + 1)) {
          if (((DAT_00655b0b & DAT_00655b82[local_1c]) !== 0)) {
            if ((DAT_00655b08 === 0)) {
              local_1b4 = 0;
            }
            else {
              local_1b4 = _rand();
              local_1b4 = (local_1b4 % (u8(DAT_00655b08) + 1));
            }
            if ((local_1b4 !== 0)) {
              FUN_004bf05b(param_1, local_1c, param_1, 0, 0);
            }
          }
        }
        if ((local_28 !== 0)) {
          DAT_00655b0a = (DAT_00655b0a | (((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF));
        }
      }
      for (/* cond: (local_1c < 0x3e) */); local_1c = (local_1c < 0x3e); local_1c = (local_1c + 1)) {
        DAT_0064c778[(param_1 * 0x594 + local_1c)] = 0;
        DAT_0064c7f4[(param_1 * 0x594 + local_1c)] = 0;
        DAT_0064c7b6[(param_1 * 0x594 + local_1c)] = 0;
      }
      if ((param_1 === 0)) {
        DAT_006ad8f0 = 0;
        iVar4 = 1;
      }
      else {
        local_158 = 0;
        if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          local_c = 0;
          for (/* cond: (local_34 < 3) */); (local_c = (local_c === 0) && (local_34 = (local_34 < 3))); local_34 = (local_34 + 1)) {
            for (/* cond: (local_1c < 0x15) */); local_1c = (local_1c < 0x15); local_1c = (local_1c + 1)) {
              sVar3 = s16((DAT_006554fe + local_1c * 0x30), 0);
              local_2c = ((sVar3) << 16 >> 16);
              iVar4 = local_2c;
              local_2c = ((sVar3) & 0xFF);
              bVar1 = (((sVar3) & 0xFF) & 0x1f);
              local_2c = iVar4;
              if ((0 < local_34)) {
                w32(DAT_fffffe50, local_c, local_1c);
                local_c = (local_c + 1);
              }
            }
          }
          if ((local_c === 0)) {
            DAT_00655b0a = (DAT_00655b0a & (~(((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF)));
            DAT_006ad8f0 = 0;
            return 1;
          }
          if (((local_c === 1) || ((local_c + -1) < 0))) {
            local_1b8 = 0;
          }
          else {
            local_1b8 = _rand();
            local_1b8 = (local_1b8 % local_c);
          }
          local_24 = s32(DAT_fffffe50, local_1b8);
          if ((0xff < DAT_0062ced0[param_1])) {
            local_24 = s8(DAT_0062ced0[param_1]);
            DAT_0062ced0[param_1] = 0xff;
          }
          if ((DAT_006554fb[local_24 * 0x30] === 0)) {
            local_158 = 0;
          }
          else {
            local_158 = _rand();
            local_158 = (local_158 % (u8(DAT_006554fb[local_24 * 0x30]) + 1));
          }
          w16((DAT_0064c6a6 + param_1 * 0x594), 0, ((local_24) & 0xFFFF));
          DAT_006554fb[local_24 * 0x30] = (DAT_006554fb[local_24 * 0x30] + 1);
          DAT_006554fd[local_24 * 0x30] = 0;
          iVar4 = _rand();
          if (((iVar4 % 3) === 0)) {
            if ((DAT_006554fc[local_24 * 0x30] === 0)) {
              DAT_006554fc[local_24 * 0x30] = 1;
            }
            else {
              DAT_006554fc[local_24 * 0x30] = 0;
            }
          }
          w16((DAT_00655502 + local_24 * 0x30), 0, s16((DAT_00655508 + (u8(DAT_006554fc[local_24 * 0x30]) * 2 + local_24 * 0x30)), 0))
          ;
          DAT_0064ca92[param_1 * 0x594] = ((local_24) & 0xFF);
          w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0xfdff));
          if ((DAT_006554fc[local_24 * 0x30] !== 0)) {
            DAT_0064ca92[param_1 * 0x594] = (DAT_0064ca92[param_1 * 0x594] + 0x15);
            w16((DAT_0064c6a0 + param_1 * 0x594), 0, (s16((DAT_0064c6a0 + param_1 * 0x594), 0) | 0x200));
          }
        }
        if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
          DAT_006ad8f0 = 0;
          iVar4 = 1;
        }
        else {
          local_14c = 0;
          do {
            if ((0x5db < local_14c)) {
              if (((((DAT_006d1160) << 16 >> 16) === 1) || ((((DAT_006d1160) << 16 >> 16) + -1) < 0))) {
                local_3c = 0;
              }
              else {
                iVar4 = _rand();
                local_3c = (iVar4 % ((DAT_006d1160) << 16 >> 16));
              }
            }
            else {
              if (((((DAT_006d1160) << 16 >> 16) === 0x11) || ((((DAT_006d1160) << 16 >> 16) + -17) < 0))) {
                local_1bc = 0;
              }
              else {
                local_1bc = _rand();
                local_1bc = (local_1bc % (((DAT_006d1160) << 16 >> 16) + -16));
              }
              local_3c = (local_1bc + 8);
            }
            if ((0x5db < local_14c)) {
              if (((((DAT_006d1162) << 16 >> 16) === 1) || ((((DAT_006d1162) << 16 >> 16) + -1) < 0))) {
                local_140 = 0;
              }
              else {
                iVar4 = _rand();
                local_140 = (iVar4 % ((DAT_006d1162) << 16 >> 16));
              }
            }
            else {
              if (((((DAT_006d1162) << 16 >> 16) === 0x11) || ((((DAT_006d1162) << 16 >> 16) + -17) < 0))) {
                local_1c0 = 0;
              }
              else {
                local_1c0 = _rand();
                local_1c0 = (local_1c0 % (((DAT_006d1162) << 16 >> 16) + -16));
              }
              local_140 = (local_1c0 + 8);
            }
            if (((local_3c & 1) !== 0)) {
              local_3c = (local_3c - 1);
            }
            if (((local_140 & 1) !== 0)) {
              local_3c = (local_3c + 1);
            }
            local_14 = FUN_0043d07a(local_3c, local_140, -1, -1, -1);
            if ((local_14 < 0)) {
              DAT_0063f660 = 0x1e;
            }
            if ((DAT_00655af8 === 0)) {
              for (/* cond: (local_154 < ((DAT_00655b16) << 16 >> 16)) */); local_154 = (local_154 < ((DAT_00655b16) << 16 >> 16)); local_154 = (local_154 + 1)) {
                if ((local_38 < DAT_0063f660)) {
                  DAT_0063f660 = local_38;
                }
              }
            }
            local_18 = FUN_005b8c42(local_3c, local_140);
            local_144 = FUN_005b8a81(local_3c, local_140);
            local_150 = ((s16((DAT_00666132 + local_144 * 0x10), 0)) << 16 >> 16);
            local_14c = (local_14c + 1);
          } while ((-1 < iVar4));
          if ((iVar4 !== 0)) {
            local_3c = ((s16((DAT_00627fe0 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 2), 0)) << 16 >> 16);
            local_140 = ((s16((DAT_00628010 + ((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 2), 0)) << 16 >> 16);
            local_14c = 0;
          }
          if ((0x7d0 < local_14c)) {
            local_158 = 1;
          }
          if (((((DAT_006d1162) << 16 >> 16) + -3) <= local_140)) {
            local_158 = 1;
          }
          if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
            DAT_0064c6b3[param_1 * 0x594] = (DAT_006554fa[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30] + 3);
            DAT_0064c6b4[param_1 * 0x594] = (9 - DAT_0064c6b3[param_1 * 0x594]);
          }
          if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            DAT_0064c6b0[param_1 * 0x594] = 1;
            local_154 = ((DAT_00655b16) << 16 >> 16);
            while ((-1 < local_154)) {
              if ((iVar4 < 9)) {
                FUN_005b4391(local_154, 1);
              }
            }
            if ((DAT_006d1da0 === param_1)) {
              DAT_0066ca88 = ((local_3c) & 0xFFFF);
              DAT_0066ca8a = ((local_140) & 0xFFFF);
            }
            local_154 = FUN_005b3d06(0, param_1, local_3c, local_140);
            w16((DAT_0064c6ac + param_1 * 0x594), 0, ((local_3c) & 0xFFFF));
            if ((iVar4 !== 0)) {
              FUN_005b3d06(3, param_1, local_3c, local_140);
            }
            FUN_005b9ec6();
            for (/* cond: (local_1c < 0x15) */); local_1c = (local_1c < 0x15); local_1c = (local_1c + 1)) {
              local_15c = FUN_005ae052((s8(DAT_00628370[local_1c]) + local_3c));
              local_20 = (s8(DAT_006283a0[local_1c]) + local_140);
              iVar4 = FUN_004087c0(local_15c, local_20);
              if ((iVar4 !== 0)) {
                FUN_005b976d(local_15c, local_20, (1 << (((param_1) & 0xFF) & 0x1f)), 1, 1);
              }
            }
            FUN_005b9f1c();
            DAT_006ad8f0 = 0;
            iVar4 = 1;
          }
          else {
            DAT_00655b0a = (DAT_00655b0a & (~(((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF)));
            w16((DAT_0064c6a6 + param_1 * 0x594), 0, ((local_30) & 0xFFFF));
            local_10 = 0;
            for (/* cond: (local_1c < 8) */); local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
              if ((((1 << (((local_1c) & 0xFF) & 0x1f)) & u8((DAT_00655b0a & (~(((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF))))) !== 0)) {
                local_10 = (local_10 + 1);
              }
            }
            if ((local_10 < 2)) {
              if (((DAT_00655af0 & 2) === 0)) {
                DAT_0064b1ac = 3;
                DAT_00655af0 = (DAT_00655af0 | 2);
              }
              DAT_006ad8f0 = 0;
              iVar4 = -1;
            }
            else {
              DAT_006ad8f0 = 0;
              iVar4 = 0;
            }
          }
        }
      }
    }
    else {
      DAT_006ad8f0 = 0;
      DAT_006c9164 = -27;
      FUN_0046b14d(0x5f, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
      local_8 = FUN_00421bb0();
      while (((iVar4 - local_8) < 0xe10)) {
        FUN_0047e94e(1, 1);
      }
      if ((DAT_006c9164 === -27)) {
        FUN_005d225b(s_new_civ:_Connection_to_server_ti_0062cf14);
        FUN_00410030(s_SERVERCONNECTTIME_0062cf40, DAT_0063fc58, 0);
        DAT_00628044 = 0;
      }
      else {
        FUN_005d225b(s_new_civ:_Received_NM_NEW_CIV_ACK_0062cf54);
      }
      while ((DAT_006c8fa0 !== 0)) {
        FUN_0047e94e(1, 0);
      }
    }
  }
  else {
    iVar4 = 0;
  }
  return iVar4;
}


 export function FUN_004a93b3 (param_1, param_2)

 {
  let bVar1;
  let uVar2;
  let cVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let iVar7;
  let iVar8;
  let iVar9;
  let local_30;
  let local_18;
  let local_10;
  let local_c;
  let local_8;

  iVar4 = ((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16);
  iVar5 = ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16);
  FUN_005b9ec6();
  for (/* cond: (local_18 < param_2) */); local_18 = (local_18 < param_2); local_18 = (local_18 + 1)) {
    local_c = 0;
    local_30 = -1;
    for (/* cond: (local_10 < 0x14) */); local_10 = (local_10 < 0x14); local_10 = (local_10 + 1)) {
      uVar6 = FUN_005ae052((s8(DAT_00628370[local_10]) + iVar4));
      iVar7 = (s8(DAT_006283a0[local_10]) + iVar5);
      iVar8 = FUN_004087c0(uVar6, iVar7);
      if ((iVar8 === 0)) {
        local_8 = 0;
        uVar2 = FUN_005b89bb(uVar6, iVar7);
        /* switch */ () {
        case 0 :
          local_8 = 1;
          break;
        case 1 :
          local_8 = 4;
          break;
        case 2 :
          iVar8 = FUN_0040bcb0(uVar6, iVar7);
          if ((iVar8 === 0)) {
            local_8 = 3;
          }
          else {
            local_8 = 5;
          }
          break;
        case 4 :
          local_8 = 2;
        }
        if ((local_8 !== 0)) {
          if ((local_10 < 8)) {
            local_8 = (local_8 + 1);
          }
          iVar7 = FUN_005b8ee1(uVar6, iVar7);
          if ((iVar7 !== 0)) {
            local_8 = (local_8 + 3);
          }
          if ((local_c < local_8)) {
            local_c = local_8;
            local_30 = local_10;
          }
        }
      }
    }
    if ((local_30 < 0));
    iVar7 = (s8(DAT_006283a0[local_30]) + iVar5);
    cVar3 = FUN_005b89bb(uVar6, iVar7);
    FUN_005b8931(uVar6, iVar7);
    FUN_005b94fc(uVar6, iVar7, 0x10, 1, 1);
    if ((cVar3 === 4)) {
      FUN_005b94fc(uVar6, iVar7, 8, 1, 1);
    }
    else {
      FUN_005b94fc(uVar6, iVar7, 4, 1, 1);
    }
    FUN_005b8b1a(uVar6, iVar7, s8(DAT_0064f348[param_1 * 0x58]));
  }
  bVar1 = DAT_0064f348[param_1 * 0x58];
  for (/* cond: (local_10 < 0x2d) */); local_10 = (local_10 < 0x2d); local_10 = (local_10 + 1)) {
    uVar6 = FUN_005ae052((s8(DAT_00628370[local_10]) + iVar4));
    iVar7 = (s8(DAT_006283a0[local_10]) + iVar5);
    iVar8 = FUN_004087c0(uVar6, iVar7);
    if ((iVar8 === 0)) {
      iVar8 = FUN_005b8a81(((s16((DAT_0064f340 + param_1 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + param_1 * 0x58), 0)) << 16 >> 16));
      iVar9 = FUN_005b8a81(uVar6, iVar7);
      if ((iVar8 === iVar9)) {
        FUN_005b976d(uVar6, iVar7, ((1 << (bVar1 & 0x1f)) & 0xff), 1, 1);
      }
    }
  }
  FUN_005b9f1c();
  return;
}


 export function FUN_004a9785 (param_1)

 {
  let cVar1;
  let sVar2;
  let iVar3;
  let bVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let pbVar9;
  let uVar10;
  let iVar11;
  let uVar12;
  let local_a0;
  let local_98;
  let local_94;
  let local_90;
  let local_8c;
  let local_88;
  let local_84;
  let local_78;
  let local_70;
  let local_64;
  let aiStack_60;
  let local_40;
  let aiStack_3c;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  for (/* cond: (local_a0 < 8) */); local_a0 = (local_a0 < 8); local_a0 = (local_a0 + 1)) {
    w32(DAT_ffffffa0, local_a0, -1);
    w32(DAT_ffffffc4, local_a0, s32(DAT_ffffffa0, local_a0));
  }
  for (/* cond: (local_98 < ((DAT_00655b16) << 16 >> 16)) */); local_98 = (local_98 < ((DAT_00655b16) << 16 >> 16)); local_98 = (local_98 + 1)) {
    if ((s32((DAT_0065610a + local_98 * 0x20), 0) !== 0)) {
      sVar2 = s16((DAT_006560f2 + local_98 * 0x20), 0);
      cVar1 = DAT_006560f7[local_98 * 0x20];
      w32(DAT_ffffffc4, s8(cVar1), ((s16((DAT_006560f0 + local_98 * 0x20), 0)) << 16 >> 16));
      w32(DAT_ffffffa0, s8(cVar1), ((sVar2) << 16 >> 16));
    }
  }
  local_a0 = 1;
  do {
    if ((7 < local_a0)) {
      DAT_00655af8 = ((((param_1) & 0xFFFF) * 4 + 4) * 5 + 1);
      return;
    }
    iVar11 = s32(DAT_ffffffc4, local_a0);
    iVar3 = s32(DAT_ffffffa0, local_a0);
    iVar5 = FUN_004087c0(iVar11, iVar3);
    if ((iVar5 !== 0)) {
      FUN_004bf05b(local_a0, 0x24, 0, 0, 1);
      FUN_004bf05b(local_a0, 9, 0, 0, 1);
      FUN_004bf05b(local_a0, 1, 0, 0, 1);
      FUN_004bf05b(local_a0, 8, 0, 0, 1);
      DAT_0064c6b0[local_a0 * 0x594] = 4;
      if ((param_1 !== 0)) {
        for (/* cond: (local_14 < 3) */); local_14 = (local_14 < 3); local_14 = (local_14 + 1)) {
          FUN_004c21d5(local_a0, 0);
          DAT_0064c6b0[local_a0 * 0x594] = (DAT_0064c6b0[local_a0 * 0x594] + 1);
        }
      }
      iVar5 = FUN_0043f8b0(iVar11, iVar3, local_a0);
      if ((-1 < iVar5)) {
        iVar6 = _rand();
        w32((DAT_0064c6a2 + local_a0 * 0x594), 0, ((iVar6 % 0x32) + 0x19) * (param_1 + 1));
        if ((param_1 === 0)) {
          DAT_0064f349[iVar5 * 0x58] = 3;
        }
        else {
          DAT_0064f349[iVar5 * 0x58] = 5;
        }
        iVar6 = FUN_005b2e69(iVar11, iVar3);
        iVar7 = FUN_005b50ad(iVar6, 2);
        if ((1 < iVar7)) {
          local_8c = ((iVar5) & 0xFF);
          DAT_00656100[iVar6 * 0x20] = local_8c;
        }
        local_84 = s8(DAT_0064f379[iVar5 * 0x58]);
        _rand();
        if ((local_84 !== 6)) {
          local_84 = 4;
        }
        iVar6 = FUN_005b3d06(local_84, local_a0, iVar11, iVar3);
        DAT_006560ff[iVar6 * 0x20] = 2;
        iVar6 = FUN_005b3d06(3, local_a0, iVar11, iVar3);
        DAT_006560ff[iVar6 * 0x20] = 2;
        iVar6 = FUN_004bd9f0(local_a0, 0x57, local_a0, iVar11, iVar3);
        FUN_005b3d06((0x10 - u8((iVar6 === 0))));
        if ((param_1 !== 0)) {
          iVar6 = FUN_004bd9f0(local_a0, 0x40, local_a0, iVar11, iVar3);
          FUN_005b3d06((0x11 - u8((iVar6 === 0))));
        }
        FUN_0043d289(iVar5, 4, 1);
        if ((param_1 !== 0)) {
          iVar6 = FUN_004bd9f0(local_a0, 0x41);
          if ((iVar6 !== 0)) {
            FUN_0043d289(iVar5, 3, 1);
          }
          iVar6 = FUN_004bd9f0(local_a0, 0x14);
          if ((iVar6 === 0)) {
            FUN_0043d289(iVar5, 2, 1);
          }
          else {
            FUN_0043d289(iVar5, 5, 1);
          }
        }
        FUN_004a93b3(iVar5, (((-u8((param_1 === 0))) & -2) + 4));
        if ((param_1 !== 0)) {
          local_c = -1;
          local_94 = -1;
          iVar6 = FUN_005b8a81(iVar11, iVar3);
          for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
            uVar8 = FUN_005ae052((s8(DAT_00628350[local_14]) * 5 + iVar11));
            local_1c = (s8(DAT_00628360[local_14]) * 5 + iVar3);
            iVar7 = FUN_004087c0(uVar8, local_1c);
            if ((iVar7 === iVar6)) {
              FUN_0043d07a(uVar8, local_1c, -1, -1, -1);
              for (/* cond: (local_98 < ((DAT_00655b16) << 16 >> 16)) */); local_98 = (local_98 < ((DAT_00655b16) << 16 >> 16)); local_98 = (local_98 + 1)) {
                if ((local_18 < DAT_0063f660)) {
                  DAT_0063f660 = local_18;
                }
              }
              if ((4 < local_18)) {
                local_8 = 0;
                bVar4 = FUN_005b89bb(uVar8, local_1c);
                local_40 = u8(bVar4);
                if ((local_40 === 2)) {
                  local_8 = 4;
                }
                if ((local_40 === 1)) {
                  local_8 = 2;
                }
                if ((local_8 !== 0)) {
                  pbVar9 = FUN_005b8931(uVar8, local_1c);
                  if (((_MEM[pbVar9] & 0x80) !== 0)) {
                    local_8 = (local_8 + 1);
                  }
                  if ((local_c < local_8)) {
                    local_c = local_8;
                    local_94 = local_14;
                    local_90 = local_1c;
                    local_78 = uVar8;
                  }
                }
              }
            }
          }
          if ((local_94 < 0)) {
            FUN_004bf05b(local_a0, 0x14, 0, 0, 1);
            FUN_004bf05b(local_a0, 0x2f, 0, 0, 1);
            FUN_004bf05b(local_a0, 0x12, 0, 0, 1);
            FUN_004bf05b(local_a0, 0x38, 0, 0, 1);
            FUN_004bf05b(local_a0, 0xc, 0, 0, 1);
            FUN_004bf05b(local_a0, 0x36, 0, 0, 1);
            DAT_0064f349[iVar5 * 0x58] = 7;
            FUN_0043d289(iVar5, 0xe, 1);
            w32((DAT_0064c6a2 + local_a0 * 0x594), 0, (s32((DAT_0064c6a2 + local_a0 * 0x594), 0) + 0x19));
            FUN_004a93b3(iVar5, 2);
            FUN_005b3d06(4, local_a0, ((s16((DAT_0064f340 + iVar5 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar5 * 0x58), 0)) << 16 >> 16));
            FUN_005b3d06(5, local_a0, ((s16((DAT_0064f340 + iVar5 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar5 * 0x58), 0)) << 16 >> 16));
            FUN_005b3d06(0x10, local_a0, ((s16((DAT_0064f340 + iVar5 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar5 * 0x58), 0)) << 16 >> 16));
          }
          else {
            local_10 = FUN_0043f8b0(local_78, local_90, local_a0);
            DAT_0064f349[local_10 * 0x58] = 3;
            uVar10 = _rand();
            uVar12 = (uVar10 >> 0x1f);
            uVar10 = ((((uVar10 ^ uVar12) - uVar12) & 1) ^ uVar12);
            iVar5 = FUN_005b3d06((3 - u8((uVar10 === uVar12))), local_a0, local_78, local_90);
            DAT_006560ff[iVar5 * 0x20] = 2;
            iVar5 = FUN_005b3d06(((uVar10 === uVar12) + 3), local_a0, local_78, local_90);
            DAT_006560ff[iVar5 * 0x20] = 2;
            FUN_005b3d06(0xf, local_a0, local_78, local_90);
            FUN_004a93b3(local_10, 2);
            local_64 = ((s16((DAT_0064f340 + local_10 * 0x58), 0)) << 16 >> 16);
            local_70 = ((s16((DAT_0064f342 + local_10 * 0x58), 0)) << 16 >> 16);
            local_88 = 0;
            iVar5 = FUN_005ae1b0(iVar11, iVar3, local_64, local_70);
            if ((iVar5 < 0x17)) {
              DAT_0062d040 = 1;
              DAT_0062d044 = -1;
              DAT_0062d03c = 2;
              DAT_00673fa0 = iVar11;
              DAT_00673fa4 = iVar3;
              do {
                iVar5 = FUN_004abfe5(local_64, local_70, 0x63);
                if ((iVar5 === 8));
                local_70 = (local_70 + s8(DAT_00628360[iVar5]));
                if ((iVar3 === local_70));
                if ((iVar5 < 0)) {
                  FUN_005b94fc(local_64, local_70, 0x10, 1, 1);
                  FUN_005b8b1a(local_64, local_70, local_a0);
                }
                local_88 = (local_88 + 1);
              } while ((local_88 < 0x32));
              DAT_0062d040 = 0;
            }
          }
        }
        iVar11 = FUN_004bd9f0(local_a0, 0x36);
        if ((iVar11 !== 0)) {
          DAT_0064c6b5[local_a0 * 0x594] = 2;
        }
      }
    }
    local_a0 = (local_a0 + 1);
  } ( true );
}


 export function FUN_004aa378 (param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let uVar3;
  let local_1c;
  let local_18;
  let local_10;
  let local_c;

  if ((param_1 === 0)) {
    iVar1 = 0;
  }
  else {
    DAT_006ad8f4 = 1;
    if ((DAT_006ad2f7 !== 0)) {
      for (/* cond: (local_18 < ((DAT_00655b18) << 16 >> 16)) */); local_18 = (local_18 < ((DAT_00655b18) << 16 >> 16)); local_18 = (local_18 + 1)) {
        if ((s8(DAT_0064f348[local_18 * 0x58]) === param_1)) {
          DAT_006ad8f4 = 0;
          return 0;
        }
      }
      if ((param_2 === -1)) {
        FUN_004a74bc(param_1);
      }
      else {
        if ((DAT_00654fa8 === 0)) {
          uVar3 = FUN_00493d13(param_1);
          FUN_00421d60(0, uVar3);
          uVar3 = FUN_00493c7d(param_2);
          FUN_00421d60(1, uVar3);
          if ((2 < DAT_00655b02)) {
            FUN_00511880(0xe, 0xff, 2, 0, param_1, 0);
          }
          FUN_0046e571(2, 1);
          FUN_00410030(s_DESTROYED_0062cff4, (DAT_00643798 + param_1 * 0x3c), 0);
        }
        if ((DAT_00655128 < 0xc)) {
          iVar1 = ((DAT_00655128) << 16 >> 16);
          DAT_00655128 = (DAT_00655128 + 1);
          w16((DAT_0065512a + iVar1 * 2), 0, DAT_00655af8);
          DAT_00655142[iVar1] = ((param_2) & 0xFF);
          DAT_0065514e[iVar1] = DAT_0064ca92[param_1 * 0x594];
          uVar3 = FUN_00493c7d(param_1);
          FUN_005f22d0((DAT_0065515a + iVar1 * 0x18), uVar3);
        }
        FUN_004a762d(param_1);
      }
      local_1c = ((DAT_00655b16) << 16 >> 16);
      while ((-1 < local_1c)) {
        if ((s32((DAT_0065610a + local_1c * 0x20), 0) !== 0)) {
          if ((s8(DAT_006560fd[local_1c * 0x20]) !== param_1)) {
            if ((s8(DAT_006560f7[local_1c * 0x20]) === param_1)) {
              FUN_005b4391(local_1c, 1);
            }
          }
          else {
            w16((DAT_006560f4 + local_1c * 0x20), 0, (s16((DAT_006560f4 + local_1c * 0x20), 0) & 0xfffd));
            w32((DAT_0064c6c0 + (s8(DAT_006560fd[local_1c * 0x20]) * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (s8(DAT_006560fd[local_1c * 0x20]) * 4 + param_1 * 0x594)), 0) & -0x1000001));
            FUN_004c5fae(local_1c, 0, s8(DAT_006560fd[local_1c * 0x20]));
          }
        }
      }
      if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        if ((DAT_006d1da0 === param_1)) {
          DAT_0064b1ac = 4;
        }
        else if ((DAT_006d1da0 !== param_1)) {
          FUN_0046b14d(0x6b, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), DAT_00655af0, 4, 0, 0, 0, 0, 0, 0);
        }
        FUN_00498943();
        DAT_00654b74[param_1 * 0x20] = 0;
        FUN_004988b8();
        if ((((~(1 << (((param_1) & 0xFF) & 0x1f))) & u8(DAT_00655b0b)) === 0)) {
          DAT_006ad8f4 = 0;
          return 0;
        }
      }
      FUN_005b9ec6();
      for (/* cond: (local_c < ((DAT_006d1160) << 16 >> 16)) */); local_c = (local_c < ((DAT_006d1160) << 16 >> 16)); local_c = (local_c + 1)) {
        for (/* cond: (local_10 < ((DAT_006d1162) << 16 >> 16)) */); local_10 = (local_10 < ((DAT_006d1162) << 16 >> 16)); local_10 = (local_10 + 1)) {
          FUN_005b976d(local_c, local_10, (1 << (((param_1) & 0xFF) & 0x1f)), 0, 1);
        }
      }
      FUN_005b9f1c();
      if ((2 < DAT_00655b02)) {
        DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF)));
        FUN_0046b14d(0x31, 0, 0, param_1, 0, 0, 0, 0, 0, 0);
      }
      if ((DAT_00655b02 === 1)) {
        DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF)));
      }
      FUN_004a7ce9(param_1);
      if ((2 < DAT_00655b02)) {
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        FUN_0046b14d(0x74, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      }
      if ((((1 << (((DAT_006d1da0) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        FUN_0047cf9e(DAT_006d1da0, 1);
      }
      DAT_006ad8f4 = 0;
      iVar1 = 1;
    }
    else {
      DAT_006ad8f4 = 0;
      DAT_006c9168 = -27;
      FUN_0046b14d(0x60, 0, param_1, param_2, 0, 0, 0, 0, 0, 0);
      iVar1 = FUN_00421bb0();
      while (((iVar2 - iVar1) < 0xe10)) {
        FUN_0047e94e(1, 1);
      }
      if ((DAT_006c9168 === -27)) {
        FUN_005d225b(s_kill_civ:_Connection_to_server_t_0062cf84);
        FUN_00410030(s_SERVERCONNECTTIME_0062cfb0, DAT_0063fc58, 0);
        DAT_00628044 = 0;
      }
      else {
        FUN_005d225b(s_kill_civ:_Received_NM_NEW_CIV_AC_0062cfc4);
      }
      while ((DAT_006c8fa0 !== 0)) {
        FUN_0047e94e(1, 0);
      }
    }
  }
  return iVar1;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004aa9c0 ()

 {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  FUN_00484cc0();
  FUN_004a76f5();
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    w32((DAT_00655364 + local_8 * 0x10), 0, 0);
  }
  for (/* cond: (local_8 < 0x15) */); local_8 = (local_8 < 0x15); local_8 = (local_8 + 1)) {
    DAT_006554fb[local_8 * 0x30] = 0;
  }
  DAT_00655af8 = 0;
  DAT_00655afa = 0xf060;
  DAT_00655afc = 0xffff;
  if ((DAT_00655b08 === 0)) {
    DAT_00655aea = ((DAT_0064bc1e & -0x8001) | 0x300);
  }
  else {
    DAT_00655aea = (DAT_0064bc1e & -0x8101);
  }
  DAT_00655aee = 0;
  DAT_00655af2 = DAT_0064bc22;
  DAT_00655af4 = 0;
  DAT_006d1da8 = 1;
  DAT_00655b16 = 0;
  DAT_00655b18 = 0;
  DAT_00655afe = 0;
  DAT_00655b05 = 0;
  _DAT_00655b1c = 0;
  DAT_00655b07 = 0;
  DAT_00655b06 = 0xff;
  DAT_00655b12 = 0;
  DAT_00655b0e = 0;
  DAT_00655b0f = 0;
  DAT_00655b10 = 0;
  for (/* cond: (local_8 < 0x64) */); local_8 = (local_8 < 0x64); local_8 = (local_8 + 1)) {
    DAT_00655b1e[local_8] = 0;
    DAT_00655b82[local_8] = 0;
  }
  for (/* cond: (local_8 < 0x1c) */); local_8 = (local_8 < 0x1c); local_8 = (local_8 + 1)) {
    w16((DAT_00655be6 + local_8 * 2), 0, 0xffff);
  }
  for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
    FUN_004a74bc(local_10);
    w16((DAT_0064c708 + local_10 * 0x594), 0, 0);
    w32((DAT_0064b9e8 + local_10 * 4), 0, 0);
    w16((DAT_0064c706 + local_10 * 0x594), 0, 0);
    w16((DAT_0064c70a + local_10 * 0x594), 0, 0);
    w16((DAT_0064c70c + local_10 * 0x594), 0, 0);
    w16((DAT_0064c70e + local_10 * 0x594), 0, 0);
    w16((DAT_0064c710 + local_10 * 0x594), 0, 0);
    w16((DAT_0064c6aa + local_10 * 0x594), 0, 0xffff);
    for (/* cond: (local_8 < 0x40) */); local_8 = (local_8 < 0x40); local_8 = (local_8 + 1)) {
      w16((DAT_0064c832 + (local_8 * 2 + local_10 * 0x594)), 0, 0);
      w16((DAT_0064c8b2 + (local_8 * 2 + local_10 * 0x594)), 0, 0);
      DAT_0064c932[(local_10 * 0x594 + local_8)] = 0;
      DAT_0064c972[(local_10 * 0x594 + local_8)] = 0;
    }
  }
  iVar1 = _rand();
  DAT_00655c1e = (((iVar1 % 0x32)) & 0xFFFF);
  for (/* cond: (local_8 < 0x96) */); local_8 = (local_8 < 0x96); local_8 = (local_8 + 1)) {
    for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
      DAT_00655c38[(local_8 * 8 + local_c)] = 0;
    }
  }
  for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
    FUN_004a7ce9(local_10);
  }
  DAT_00655b0c = DAT_00655b0a;
  FUN_004a7754();
  if ((6 < None)) {
    _DAT_0064bc1a = 6;
    _DAT_0064bc1c = 4;
  }
  iVar1 = FUN_005ae006(DAT_00655b0b);
  if ((iVar1 === 1)) {
    DAT_0064c6b3[s8(DAT_00655b03) * 0x594] = ((None) & 0xFF);
    DAT_0064c6b4[s8(DAT_00655b03) * 0x594] = ((None) & 0xFF);
    if ((DAT_00655b08 === 0)) {
      w32((DAT_0064c6a2 + s8(DAT_00655b03) * 0x594), 0, 0x32);
    }
  }
  else {
    for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
      if ((((1 << (((local_10) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        DAT_0064c6b3[local_10 * 0x594] = 6;
        DAT_0064c6b4[local_10 * 0x594] = 4;
        if ((DAT_00655b08 === 0)) {
          w32((DAT_0064c6a2 + local_10 * 0x594), 0, 0x32);
        }
      }
    }
  }
  return;
}


 export function FUN_004abea0 (param_1, param_2)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_c = 8;
  if ((param_1 < 1)) {
    if ((param_1 < 0)) {
      param_1 = -1;
    }
    else {
      param_1 = 0;
    }
  }
  else {
    param_1 = 1;
  }
  if ((param_2 < 1)) {
    if ((param_2 < 0)) {
      param_2 = -1;
    }
    else {
      param_2 = 0;
    }
  }
  else {
    param_2 = 1;
  }
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((DAT_00628350[local_8] < 1)) {
      if ((DAT_00628350[local_8] < 0)) {
        local_10 = -1;
      }
      else {
        local_10 = 0;
      }
    }
    else {
      local_10 = 1;
    }
    if ((param_1 === local_10)) {
      if ((DAT_00628360[local_8] < 1)) {
        if ((DAT_00628360[local_8] < 0)) {
          local_14 = -1;
        }
        else {
          local_14 = 0;
        }
      }
      else {
        local_14 = 1;
      }
      if ((param_2 === local_14)) {
        local_c = local_8;
      }
    }
  }
  return local_c;
}


 export function FUN_004abfe5 (param_1, param_2, param_3)

 {
  let cVar1;
  let bVar2;
  let bVar3;
  let bVar4;
  let bVar5;
  let bVar6;
  let bVar7;
  let iVar8;
  let iVar9;
  let iVar10;
  let uVar11;
  let pbVar12;
  let iVar13;
  let iVar14;
  let iVar15;
  let iVar16;
  let iVar17;
  let uVar18;
  let iVar19;
  let uVar20;
  let bVar21;
  let local_94;
  let local_90;
  let local_84;
  let local_80;
  let local_7c;
  let local_60;
  let local_58;
  let local_54;
  let local_50;
  let local_40;
  let local_3c;
  let local_30;
  let local_20;
  let local_1c;
  let local_10;

  iVar19 = DAT_0062d04c;
  DAT_00673fb0 = DAT_00673fa0;
  DAT_00673fb4 = DAT_00673fa4;
  bVar21 = (DAT_0064b1c1[DAT_0062d03c * 0x14] === 2);
  cVar1 = DAT_0064b1c2[DAT_0062d03c * 0x14];
  uVar20 = u8(DAT_0064bcc8);
  if ((iVar8 === 0)) {
    bVar3 = 1;
  }
  else {
    bVar3 = 0;
  }
  DAT_00673fc0 = 0;
  local_40 = (param_1 - DAT_00673fb0);
  if (((DAT_00655ae8 & 0x8000) === 0)) {
    if ((local_40 < 0)) {
      local_40 = (local_40 + ((DAT_006d1160) << 16 >> 16));
    }
    if (((((DAT_006d1160) << 16 >> 16) >> 1) <= local_40)) {
      local_40 = (local_40 - ((DAT_006d1160) << 16 >> 16));
    }
  }
  local_40 = (local_40 + DAT_00673fb0);
  if ((iVar8 === 0)) {
    DAT_006787cc = DAT_00673fa0;
    DAT_00673fb8 = DAT_00673fa4;
    _memset(DAT_006ced60, 0, 0x2400);
    DAT_00673fc4 = 0;
    DAT_00673fc8 = DAT_00673fa0;
    DAT_006763c8 = DAT_00673fa4;
    DAT_00673fbc = 1;
    FUN_004ad076(DAT_00673fa0, DAT_00673fa4, 1);
    DAT_00673fc0 = param_3;
    do {
      iVar8 = s32(DAT_00673fc8, DAT_00673fc4);
      iVar13 = s32(DAT_006763c8, DAT_00673fc4);
      DAT_00673fc4 = (DAT_00673fc4 + 1);
      if ((0x8ff < (DAT_00673fc4 + 1))) {
        DAT_00673fc4 = 0;
      }
      iVar15 = FUN_005ae052(iVar8);
      iVar16 = FUN_004ad01e(iVar8, iVar13);
      iVar14 = DAT_00673fc0;
      if ((iVar13 !== param_2)) {
        uVar11 = FUN_005b94d5(iVar15, iVar13);
        if ((iVar14 < 0)) {
          bVar4 = 0;
        }
        else {
          bVar4 = 1;
        }
        pbVar12 = FUN_005b8931(iVar15, iVar13);
        bVar2 = _MEM[pbVar12];
        uVar11 = FUN_005b94d5(iVar15, iVar13);
        if ((iVar14 < 0)) {
          bVar5 = 0;
        }
        else {
          bVar5 = 1;
        }
        for (/* cond: (local_1c < 8) */); iVar14 = DAT_00673fc0, local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
          iVar14 = (s8(DAT_00628350[local_1c]) + iVar8);
          iVar17 = (s8(DAT_00628360[local_1c]) + iVar13);
          iVar9 = FUN_005ae052(iVar14);
          if (((iVar14 - DAT_00673fa0) < 1)) {
            local_7c = ((~(iVar14 - DAT_00673fa0)) + 1);
          }
          else {
            local_7c = (iVar14 - DAT_00673fa0);
          }
          if (((iVar17 - DAT_00673fa4) < 1)) {
            local_84 = ((~(iVar17 - DAT_00673fa4)) + 1);
          }
          else {
            local_84 = (iVar17 - DAT_00673fa4);
          }
          if ((iVar10 !== 0)) {
            bVar7 = FUN_005b89bb(iVar9, iVar17);
            if ((s16((DAT_00666134 + iVar10 * 0x10), 0) !== 1)) {
              local_30 = iVar16;
              if ((-1 < DAT_0062d044)) {
                local_80 = FUN_005b8da4(iVar9, iVar17);
                if ((DAT_0062d044 !== local_80)) {
                  uVar18 = FUN_005b2e69(iVar9, iVar17);
                  iVar10 = FUN_005b53b6(uVar18, s8(DAT_0064b1ca[DAT_0062d03c * 0x14]));
                  local_30 = (iVar16 + iVar10 * 0x10);
                }
                iVar10 = FUN_005b8dec(iVar9, iVar17, DAT_0062d044);
                if ((DAT_0064b1ca[DAT_0062d03c * 0x14] < 5)) {
                  local_30 = (local_30 + u8(DAT_0064bcc8) * 4);
                }
              }
              if ((-1 < iVar10)) {
                local_30 = (local_30 + 1);
              }
              else if (((DAT_0064b1bd[DAT_0062d03c * 0x14] & 2) === 0)) {
                if ((-1 < iVar10)) {
                  local_30 = (local_30 + 4);
                }
                else {
                  if ((DAT_0062d048 !== 0)) {
                    if (((iVar13 === iVar17) || ((iVar13 - iVar17) < 0))) {
                      local_90 = ((~(iVar13 - iVar17)) + 1);
                    }
                    else {
                      local_90 = (iVar13 - iVar17);
                    }
                    if ((local_90 === 1)) {
                      local_30 = (local_30 + 4);
                      goto LAB_004ac755;
                    }
                  }
                  if ((uVar20 < s8(cVar1))) {
                    local_30 = (local_30 + s8(DAT_00627cc8[u8(bVar7) * 0x18]) * u8(DAT_0064bcc8) * 4);
                  }
                  else {
                    local_30 = (local_30 + u8(DAT_0064bcc8) * 4);
                  }
                }
              }
              else {
                local_30 = (local_30 + 4);
              }
 LAB_004ac755: :
              if (((_MEM[pbVar12] & 0x40) !== 0)) {
                local_30 = (local_30 + u8(DAT_0064bcc8) * 4);
              }
              iVar9 = FUN_004ad01e(iVar14, iVar17);
              if ((local_30 < iVar9)) {
                FUN_004ad076(iVar14, iVar17, local_30);
                w32(DAT_00673fc8, DAT_00673fbc, iVar14);
                w32(DAT_006763c8, DAT_00673fbc, iVar17);
                DAT_00673fbc = (DAT_00673fbc + 1);
                if ((0x8ff < (DAT_00673fbc + 1))) {
                  DAT_00673fbc = 0;
                }
                if ((DAT_00673fc4 === DAT_00673fbc));
    } while ((DAT_00673fc4 !== 0));
  }
 LAB_004ac850: :
  local_50 = -1;
  if ((DAT_00673fc0 < param_3)) {
    local_10 = 0x4e1f;
    local_20 = 0x4e1f;
    uVar11 = FUN_005b94d5(param_1, param_2);
    if ((iVar8 < 0)) {
      bVar3 = 0;
    }
    else {
      bVar3 = 1;
    }
    pbVar12 = FUN_005b8931(param_1, param_2);
    bVar2 = _MEM[pbVar12];
    uVar11 = FUN_005b94d5(param_1, param_2);
    if ((iVar8 < 0)) {
      bVar4 = 0;
    }
    else {
      bVar4 = 1;
    }
    iVar8 = FUN_004ad01e(local_40, param_2);
    for (/* cond: (local_1c < 8) */); local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
      iVar13 = (s8(DAT_00628350[local_1c]) + param_1);
      iVar14 = (s8(DAT_00628360[local_1c]) + param_2);
      iVar15 = FUN_005ae052(iVar13);
      if (((iVar13 - DAT_00673fa0) < 1)) {
        local_7c = ((~(iVar13 - DAT_00673fa0)) + 1);
      }
      else {
        local_7c = (iVar13 - DAT_00673fa0);
      }
      if (((iVar14 - DAT_00673fa4) < 1)) {
        local_84 = ((~(iVar14 - DAT_00673fa4)) + 1);
      }
      else {
        local_84 = (iVar14 - DAT_00673fa4);
      }
      if ((iVar16 !== 0)) {
        bVar7 = FUN_005b89bb(iVar15, iVar14);
        if ((iVar14 === DAT_00673fb8)) {
          local_3c = (iVar13 - DAT_00673fb0);
          if (((DAT_00655ae8 & 0x8000) === 0)) {
            if ((local_3c < 0)) {
              local_3c = (local_3c + ((DAT_006d1160) << 16 >> 16));
            }
            if (((((DAT_006d1160) << 16 >> 16) >> 1) <= local_3c)) {
              local_3c = (local_3c - ((DAT_006d1160) << 16 >> 16));
            }
          }
          iVar16 = FUN_004ad01e((local_3c + DAT_00673fb0), iVar14);
          if ((iVar16 < iVar8)) {
            if ((DAT_0062d040 === 0)) {
              if ((-1 < iVar17)) {
                local_58 = 1;
              }
              else if (((DAT_0064b1bd[DAT_0062d03c * 0x14] & 2) === 0)) {
                if ((-1 < iVar17)) {
                  local_58 = 4;
                }
                else {
                  if ((DAT_0062d048 !== 0)) {
                    if (((param_2 === iVar14) || ((param_2 - iVar14) < 0))) {
                      local_94 = ((~(param_2 - iVar14)) + 1);
                    }
                    else {
                      local_94 = (param_2 - iVar14);
                    }
                    if ((local_94 === 1)) {
                      local_58 = 4;
                      goto LAB_004acce1;
                    }
                  }
                  if ((uVar20 < s8(cVar1))) {
                    local_58 = s8(DAT_00627cc8[u8(bVar7) * 0x18]) * u8(DAT_0064bcc8) * 4;
                  }
                  else {
                    local_58 = (u8(DAT_0064bcc8) << 2);
                  }
                }
              }
              else {
                local_58 = 4;
              }
 LAB_004acce1: :
              if (((_MEM[pbVar12] & 0x40) !== 0)) {
                local_58 = (local_58 + u8(DAT_0064bcc8) * 4);
              }
              if ((iVar17 !== 0)) {
                uVar18 = FUN_005b2e69(iVar15, iVar14);
                iVar17 = FUN_005b53b6(uVar18, s8(DAT_0064b1ca[DAT_0062d03c * 0x14]));
                local_58 = (local_58 + iVar17 * 8);
              }
              iVar15 = FUN_005b8dec(iVar15, iVar14, DAT_0062d044);
              if ((DAT_0064b1ca[DAT_0062d03c * 0x14] < 5)) {
                local_58 = (local_58 + u8(DAT_0064bcc8) * 4);
              }
            }
            else {
              local_58 = 1;
            }
            iVar16 = (iVar16 + local_58);
            if ((iVar16 <= local_10)) {
              iVar13 = FUN_005ae31d(DAT_00673fa0, DAT_00673fa4, iVar13, iVar14);
              if ((iVar16 < local_10)) {
                local_50 = local_1c;
                local_20 = iVar13;
                local_10 = iVar16;
              }
              else if ((iVar13 < local_20)) {
                local_50 = local_1c;
                local_20 = iVar13;
              }
            }
          }
        }
      }
 LAB_004ac936: :
    }
  }
  if ((local_50 < 0)) {
    DAT_00673fa0 = DAT_006787cc;
    DAT_00673fa4 = DAT_00673fb8;
  }
  if ((iVar19 !== 0)) {
    DAT_0066ca88 = ((param_1) & 0xFFFF);
    DAT_0066ca8a = ((param_2) & 0xFFFF);
    while ((iVar19 !== 4)) {
      while ((iVar19 !== 3)) {
        while ((iVar19 !== 2)) {
          while ((iVar19 !== 1)) {
            FUN_0047cd51(-1, 1);
            for (/* cond: (local_54 < 0x30) */); local_54 = (local_54 < 0x30); local_54 = (local_54 + 1)) {
              for (/* cond: (local_60 < 0x30) */); local_60 = (local_60 < 0x30); local_60 = (local_60 + 1)) {
                if ((s32((DAT_006ced60 + (local_60 * 4 + local_54 * 0xc0)), 0) !== 0)) {
                  FUN_00472b0a((((local_60 + -24) + (local_54 + -24)) + DAT_00673fb0), (((local_60 + -24) - (local_54 + -24)) + DAT_00673fb4), s32((DAT_006ced60 + (local_60 * 4 + local_54 * 0xc0)), 0), 0x29);
                }
              }
            }
            iVar19 = FUN_00444270(s_MOVEDEBUG_0062d054);
            if ((iVar19 !== 1));
          }
          if ((iVar19 !== 2));
        }
        if ((iVar19 !== 3));
      }
      if ((iVar19 !== 4));
    }
  }
  return local_50;
}


 export function FUN_004ad01e (param_1, param_2)

 {
  return s32((((param_1 - DAT_00673fb0) * 0xc0 + (((param_1 - DAT_00673fb0) + (param_2 - DAT_00673fb4)) >> 1) * -0xbc) + 0x6cffc0), 0);
}


 export function FUN_004ad076 (param_1, param_2, param_3)

 {
  w32((((param_1 - DAT_00673fb0) * 0xc0 + (((param_2 - DAT_00673fb4) + (param_1 - DAT_00673fb0)) >> 1) * -0xbc) + 0x6cffc0), 0, param_3);
  return;
}


 export function FUN_004ad0d1 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  let iVar2;
  let local_18;
  let local_14;

  uVar1 = DAT_0062d044;
  if (((param_1 === param_3) || ((param_1 - param_3) < 0))) {
    local_14 = ((~(param_1 - param_3)) + 1);
  }
  else {
    local_14 = (param_1 - param_3);
  }
  if (((((DAT_006d1160) << 16 >> 16) >> 1) < local_14)) {
    local_14 = (((DAT_006d1160) << 16 >> 16) - local_14);
  }
  if (((param_2 === param_4) || ((param_2 - param_4) < 0))) {
    local_18 = ((~(param_2 - param_4)) + 1);
  }
  else {
    local_18 = (param_2 - param_4);
  }
  iVar2 = ((local_18 + local_14) >> 1);
  if ((iVar2 === 0)) {
    iVar2 = 0;
  }
  else if ((iVar2 < 0x17)) {
    if ((param_5 === 0)) {
      DAT_0062d03c = 2;
    }
    else {
      DAT_0062d03c = 0x21;
    }
    DAT_00673fa0 = param_3;
    DAT_00673fa4 = param_4;
    DAT_0062d044 = -1;
    iVar2 = FUN_004abfe5(param_1, param_2, param_6);
    if ((-1 < iVar2)) {
      iVar2 = DAT_00673fc0;
    }
  }
  else {
    iVar2 = -1;
  }
  DAT_0062d044 = uVar1;
  return iVar2;
}


 export function FUN_004ad20f (param_1, param_2, param_3, param_4)

 {
  let bVar1;
  let iVar2;
  let iVar3;
  let puVar4;
  let pcVar5;
  let pbVar6;
  let iVar7;
  let local_60;
  let local_58;
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

  local_40 = 0;
  local_8 = DAT_0062d050;
  DAT_00673fa0 = param_3;
  DAT_00673fa4 = param_4;
  local_24 = u8((DAT_0064b1c1[DAT_0062d03c * 0x14] === 2));
  iVar3 = FUN_004ad822(param_1, param_2, local_24);
  iVar2 = param_4;
  iVar7 = param_3;
  if ((iVar3 === 0)) {
    DAT_00673fa0 = param_3;
    DAT_00673fa4 = param_4;
  }
  else {
    DAT_00673fa8 = param_3;
    DAT_00673fac = param_4;
    FUN_004ad822(param_3, param_4, local_24);
    _memset(DAT_006365e8, 0, ((DAT_006d116a) << 16 >> 16) * ((DAT_006d116c) << 16 >> 16));
    DAT_00673fc4 = 0;
    DAT_00673fc8 = param_3;
    DAT_006763c8 = param_4;
    DAT_00673fbc = 1;
    puVar4 = FUN_004aeef0(param_3, param_4);
    _MEM[puVar4] = 1;
    while ((local_3c === iVar2)) {
      local_34 = s32(DAT_00673fc8, DAT_00673fc4);
      local_3c = s32(DAT_006763c8, DAT_00673fc4);
      DAT_00673fc4 = ((DAT_00673fc4 + 1) & 0xff);
      if ((local_3c === iVar2));
      local_20 = u8(_MEM[pbVar6]);
      if ((local_24 === 0)) {
        pbVar6 = FUN_004aee90(local_34, local_3c);
        bVar1 = _MEM[pbVar6];
      }
      else {
        pbVar6 = FUN_004aeec0(local_34, local_3c);
        bVar1 = _MEM[pbVar6];
      }
      local_58 = u8(bVar1);
      local_18 = local_58;
      for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
        if (((local_18 & (1 << (((local_14) & 0xFF) & 0x1f))) !== 0)) {
          local_1c = FUN_005ae0b0((s8(DAT_006283d0[local_14]) + local_34));
          local_28 = (s8(DAT_006283e0[local_14]) + local_3c);
          if ((_MEM[pcVar5] === 0)) {
            pcVar5 = FUN_004aeef0(local_1c, local_28);
            _MEM[pcVar5] = (((local_20) & 0xFF) + 1);
            w32(DAT_00673fc8, DAT_00673fbc, local_1c);
            w32(DAT_006763c8, DAT_00673fbc, local_28);
            DAT_00673fbc = ((DAT_00673fbc + 1) & 0xff);
          }
        }
      }
      if ((DAT_00673fc4 === DAT_00673fbc));
 LAB_004ad51c: :
    local_38 = 0;
    if ((local_40 !== 0)) {
      local_c = 0x63;
      local_30 = -1;
      if ((local_24 === 0)) {
        pbVar6 = FUN_004aee90(iVar7, iVar2);
        bVar1 = _MEM[pbVar6];
      }
      else {
        pbVar6 = FUN_004aeec0(iVar7, iVar2);
        bVar1 = _MEM[pbVar6];
      }
      local_60 = u8(bVar1);
      local_18 = local_60;
      for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
        if (((local_18 & (1 << (((local_14) & 0xFF) & 0x1f))) !== 0)) {
          local_1c = FUN_005ae0b0((s8(DAT_006283d0[local_14]) + iVar7));
          local_28 = (s8(DAT_006283e0[local_14]) + iVar2);
          if ((local_28 < ((DAT_006d116c) << 16 >> 16))) {
            pbVar6 = FUN_004aeef0(local_1c, local_28);
            local_48 = u8(_MEM[pbVar6]);
            if ((local_48 !== 0)) {
              if ((local_48 < local_c)) {
                local_30 = local_14;
                local_c = local_48;
                local_20 = FUN_005ae31d(param_3, param_4, (local_1c * 4 + 1), (local_28 * 4 + 1));
              }
              else if ((local_2c < local_20)) {
                local_30 = local_14;
                local_20 = local_2c;
              }
            }
          }
        }
      }
      if ((-1 < local_30)) {
        iVar7 = FUN_005ae0b0((s8(DAT_006283d0[local_30]) + iVar7));
        local_4c = (iVar7 * 4 + 1);
        local_50 = ((s8(DAT_006283e0[local_30]) + iVar2) * 4 + 1);
        local_38 = 1;
        local_44 = local_4c;
        local_10 = local_50;
        FUN_004ad784(local_4c, local_50, DAT_ffffffb4, DAT_ffffffb0, local_24);
      }
    }
    if ((local_38 === 0)) {
      DAT_00673fa0 = param_3;
      DAT_00673fa4 = param_4;
    }
    else {
      DAT_00673fa0 = local_4c;
      DAT_00673fa4 = local_50;
    }
  }
  if ((local_8 !== 0)) {
    DAT_0062d04c = 1;
  }
  return local_40;
}


 export function FUN_004ad784 (param_1, param_2, param_3, param_4, param_5)

 {
  let uVar1;
  let iVar2;
  let iVar3;
  let local_8;

  local_8 = 0;
  while ((iVar3 === param_5)) {
    if ((1 < local_8)) {
      return 0;
    }
    uVar1 = FUN_005ae052((param_1 + local_8));
    iVar2 = (param_2 + local_8);
    iVar3 = FUN_004087c0(uVar1, iVar2);
    if ((iVar3 === param_5));
  }
  w32(param_3, 0, uVar1);
  w32(param_4, 0, iVar2);
  return 1;
}


 export function FUN_004ad822 (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let pcVar3;
  let iVar4;
  let iVar5;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_24 = -1;
  iVar1 = (param_1 >> 2);
  iVar2 = (param_2 >> 2);
  if ((param_3 === 0)) {
    pcVar3 = FUN_004aee90(iVar1, iVar2);
    if ((_MEM[pcVar3] !== 0)) {
      local_24 = 8;
    }
  }
  else {
    pcVar3 = FUN_004aeec0(iVar1, iVar2);
    if ((_MEM[pcVar3] !== 0)) {
      local_24 = 8;
    }
  }
  if ((local_24 === 8)) {
    iVar4 = FUN_004ad784((iVar1 * 4 + 1), (iVar2 * 4 + 1), DAT_fffffff4, DAT_ffffffec, param_3);
    if ((iVar4 === 0)) {
      local_24 = -1;
    }
    else {
      iVar4 = FUN_004ad0d1(local_c, local_14, param_1, param_2, param_3, 0x12);
      if ((iVar4 < 0)) {
        local_24 = -1;
      }
    }
  }
  if ((local_24 < 0)) {
    local_8 = 0x63;
    for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
      iVar4 = FUN_005ae0b0((s8(DAT_00628350[local_10]) + iVar1));
      iVar5 = (s8(DAT_00628360[local_10]) + iVar2);
      if ((_MEM[pcVar3] !== 0)) {
        local_c = (iVar4 * 4 + 1);
        local_14 = (iVar5 * 4 + 1);
        iVar4 = FUN_004087c0(local_c, local_14);
        if ((-1 < iVar5)) {
          local_24 = local_10;
          local_8 = iVar4;
        }
      }
    }
  }
  local_10 = local_24;
  if ((local_24 < 0)) {
    local_10 = 8;
  }
  DAT_00673fa0 = FUN_005ae0b0((s8(DAT_00628350[local_10]) + iVar1));
  DAT_00673fa4 = (s8(DAT_00628360[local_10]) + iVar2);
  return (-1 < local_24);
}


 export function FUN_004adafc (param_1)

 {
  let cVar1;
  let bVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let uVar9;
  let iVar10;
  let uVar11;
  let uVar12;
  let pbVar13;
  let uVar14;
  let iVar15;
  let iVar16;
  let iVar17;
  let uVar18;
  let local_84;
  let local_70;
  let local_58;
  let local_54;
  let local_48;
  let local_38;
  let local_30;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;

  local_54 = -1;
  iVar4 = ((s16((DAT_00656102 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar5 = ((s16((DAT_00656104 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar6 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
  iVar7 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
  DAT_0062d03c = u8(DAT_006560f6[param_1 * 0x20]);
  cVar1 = DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14];
  iVar8 = FUN_004087c0(iVar4, iVar5);
  if ((iVar5 !== iVar7)) {
    iVar8 = s8(DAT_006560f7[param_1 * 0x20]);
    uVar9 = (u8(DAT_00655b0b) & (1 << (DAT_006560f7[param_1 * 0x20] & 0x1f)));
    local_70 = (iVar4 - iVar6);
    if (((DAT_00655ae8 & 0x8000) === 0)) {
      if ((iVar6 < 2)) {
        local_70 = -1;
      }
      if (((((DAT_006d1160) << 16 >> 16) + -2) <= iVar6)) {
        local_70 = 1;
      }
    }
    iVar10 = FUN_005ae1b0(iVar6, iVar7, iVar4, iVar5);
    if ((iVar10 < 2)) {
      local_54 = FUN_004abea0(local_70, (iVar5 - iVar7));
    }
    else {
      iVar10 = iVar4;
      iVar15 = iVar5;
      if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] !== 1)) {
        iVar10 = FUN_005ae1b0(iVar6, iVar7, iVar4, iVar5);
        if ((-1 < local_54)) {
          DAT_0062d04c = 0;
          DAT_0062d050 = 0;
          return local_54;
        }
        iVar16 = FUN_004ad20f(iVar6, iVar7, iVar4, iVar5);
        iVar10 = DAT_00673fa0;
        iVar15 = DAT_00673fa4;
        if ((iVar16 !== 0)) {
          iVar10 = FUN_005ae1b0(iVar6, iVar7, DAT_00673fa0, DAT_00673fa4);
          if ((iVar10 < 0x17)) {
            local_54 = FUN_004abfe5(iVar6, iVar7, 0x3e6);
          }
          else {
            local_54 = -1;
          }
          iVar10 = DAT_00673fa0;
          iVar15 = DAT_00673fa4;
          if ((-1 < local_54)) {
            DAT_0062d04c = 0;
            DAT_0062d050 = 0;
            return local_54;
          }
        }
      }
      DAT_00673fa4 = iVar15;
      DAT_00673fa0 = iVar10;
      uVar11 = (iVar10 - iVar6);
      uVar12 = (iVar15 - iVar7);
      local_1c = uVar11;
      if ((uVar11 < 1)) {
        local_1c = ((~uVar11) + 1);
      }
      local_28 = uVar12;
      if ((uVar12 < 1)) {
        local_28 = ((~uVar12) + 1);
      }
      local_70 = uVar11;
      if ((-1 < uVar11)) {
        local_70 = (-local_1c);
      }
      iVar10 = ((local_28 + local_1c) >> 1);
      if ((local_28 < local_1c)) {
        local_38 = (local_1c * 2 - ((iVar10 - local_28) + 1));
      }
      else {
        local_38 = (local_28 * 2 - ((iVar10 - local_1c) + 1));
      }
      if ((uVar12 === 0)) {
        DAT_006560ff[param_1 * 0x20] = 0xff;
        FUN_005b6787(param_1);
      }
      else {
        local_18 = 0x270f;
        local_54 = 8;
        uVar11 = FUN_005b94d5(iVar6, iVar7);
        pbVar13 = FUN_005b8931(iVar6, iVar7);
        bVar2 = _MEM[pbVar13];
        uVar14 = FUN_005b94d5(iVar6, iVar7);
        iVar10 = FUN_005b4d8c(iVar6, iVar7, iVar8);
        for (/* cond: (local_24 < 8) */); local_24 = local_24; local_24 = (local_24 + 1)) {
          iVar15 = FUN_005ae052((s8(DAT_00628350[local_24]) + iVar6));
          local_84 = (s8(DAT_00628360[local_24]) + iVar7);
          local_20 = (local_70 - s8(DAT_00628350[local_24]));
          local_30 = (uVar12 - s8(DAT_00628360[local_24]));
          if ((local_20 < 1)) {
            local_20 = ((~local_20) + 1);
          }
          if ((local_30 < 1)) {
            local_30 = ((~local_30) + 1);
          }
          iVar16 = ((local_20 + local_30) >> 1);
          if ((local_30 < local_20)) {
            local_48 = (local_20 * 2 - ((iVar16 - local_30) + 1));
          }
          else {
            local_48 = (local_30 * 2 - ((iVar16 - local_20) + 1));
          }
          if ((local_84 === DAT_00673fa4)) {
            bVar3 = FUN_005b89bb(iVar15, local_84);
            iVar16 = FUN_005b8d62(iVar15, local_84);
            if ((local_84 === iVar5)) {
              if ((DAT_0064b1c1[u8(DAT_006560f6[param_1 * 0x20]) * 0x14] === 0)) {
                if (((uVar18 & 0x20) === 0)) {
                  if (((uVar18 & 0x10) === 0)) {
                    if ((iVar15 === 1)) {
                      if (((iVar7 === local_84) || ((iVar7 - local_84) < 0))) {
                        local_84 = ((~(iVar7 - local_84)) + 1);
                      }
                      else {
                        local_84 = (iVar7 - local_84);
                      }
                      if ((local_84 === 1)) {
                        local_58 = 4;
                        goto LAB_004ae320;
                      }
                    }
                    iVar15 = FUN_005b2a39(param_1);
                    if ((u8(DAT_0064bcc8) < iVar15)) {
                      local_58 = s8(DAT_00627cc8[u8(bVar3) * 0x18]) * u8(DAT_0064bcc8) * 4;
                    }
                    else {
                      local_58 = (u8(DAT_0064bcc8) << 2);
                    }
                  }
                  else {
                    local_58 = 4;
                  }
                }
                else {
                  local_58 = 1;
                }
              }
              else {
                local_58 = (u8(DAT_0064bcc8) << 2);
              }
 LAB_004ae320: :
              local_58 = (((local_48 * 4 + local_58) + local_20) + local_30) * 4;
              if ((-1 < iVar16)) {
                local_58 = (local_58 + 1);
              }
              if ((local_58 < local_18)) {
                local_54 = local_24;
                local_18 = local_58;
              }
            }
          }
        }
        if ((DAT_006560f8[param_1 * 0x20] !== 0)) {
          local_54 = -1;
          DAT_006560ff[param_1 * 0x20] = 0xff;
          if (((((s16((DAT_006560f4 + param_1 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
            if ((uVar9 !== 0)) {
              w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x7fff));
            }
            FUN_005b6787(param_1);
          }
        }
        if ((local_54 === 8)) {
          DAT_006560ff[param_1 * 0x20] = 0xff;
          if (((((s16((DAT_006560f4 + param_1 * 0x20), 0)) << 16 >> 16) & 0x8000) !== 0)) {
            if ((uVar9 !== 0)) {
              w16((DAT_006560f4 + param_1 * 0x20), 0, (s16((DAT_006560f4 + param_1 * 0x20), 0) & 0x7fff));
            }
            FUN_005b6787(param_1);
          }
          local_54 = -1;
        }
      }
    }
  }
  DAT_0062d04c = 0;
  DAT_0062d050 = 0;
  return local_54;
}


 export function FUN_004aee90 (param_1, param_2)

 {
  return ((((DAT_006d116a) << 16 >> 16) * param_2 + param_1) + DAT_006365e0);
}


 export function FUN_004aeec0 (param_1, param_2)

 {
  return ((((DAT_006d116a) << 16 >> 16) * param_2 + param_1) + DAT_006365e4);
}


 export function FUN_004aeef0 (param_1, param_2)

 {
  return ((((DAT_006d116a) << 16 >> 16) * param_2 + param_1) + DAT_006365e8);
}


 export function FUN_004aef20 (param_1)

 {
  _MEM[param_1] = 0;
  return;
}


 export function FUN_004aef36 (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d064);
  return;
}


 export function FUN_004aef57 (param_1, param_2)

 {
  let local_8;

  for (/* cond: (local_8 < param_2) */); local_8 = (local_8 < param_2); local_8 = (local_8 + 1)) {
    FUN_004aef36(param_1);
  }
  return;
}


 export function FUN_004aef96 (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d068);
  return;
}


 export function FUN_004aefb7 (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d06c);
  return;
}


 export function FUN_004aefd8 (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d070);
  return;
}


 export function FUN_004aeff9 (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d074);
  return;
}


 export function FUN_004af01a (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d078);
  return;
}


 export function FUN_004af03b (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d07c);
  return;
}


 export function FUN_004af05c (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d080);
  return;
}


 export function FUN_004af07d (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d084);
  return;
}


 export function FUN_004af09e (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d088);
  return;
}


 export function FUN_004af0bf (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d08c);
  return;
}


 export function FUN_004af0e0 (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d090);
  return;
}


 export function FUN_004af101 (param_1)

 {
  FUN_005f22e0(param_1, DAT_0062d094);
  return;
}


 export function FUN_004af122 (param_1, param_2)

 {
  let uVar1;

  uVar1 = FUN_00428b0c(param_2);
  FUN_005f22e0(param_1, uVar1);
  return;
}


 export function FUN_004af14b (param_1, param_2)

 {
  FUN_004af122(param_1, s32((DAT_00628420 + param_2 * 4), 0));
  return;
}


 export function FUN_004af174 (param_1, param_2)

 {
  FUN_005f22e0(param_1, param_2);
  return;
}


 export function FUN_004af194 (param_1, param_2)

 {
  let uVar1;

  FUN_004af05c(param_1);
  uVar1 = FUN_00428b0c(param_2);
  FUN_005f22e0(param_1, uVar1);
  FUN_004af07d(param_1);
  return;
}


 export function FUN_004af1d5 (param_1, param_2)

 {
  let local_18;

  __itoa(param_2, DAT_ffffffe8, 0xa);
  FUN_005f22e0(param_1, DAT_ffffffe8);
  return;
}


 export function FUN_004af20a (param_1, param_2)

 {
  let sVar1;
  let local_1c;
  let local_18;

  __itoa(param_2, DAT_ffffffe8, 2);
  sVar1 = _strlen(DAT_ffffffe8);
  for (/* cond: (local_1c < (8 - sVar1)) */); local_1c = (local_1c < (8 - sVar1)); local_1c = (local_1c + 1)) {
    FUN_005f22e0(param_1, DAT_0062d098);
  }
  FUN_005f22e0(param_1, DAT_ffffffe8);
  return;
}


 export function FUN_004af284 (param_1, param_2)

 {
  let local_18;

  __ltoa(param_2, DAT_ffffffe8, 0xa);
  FUN_005f22e0(param_1, DAT_ffffffe8);
  return;
}


 export function FUN_004af2b9 (param_1, param_2)

 {
  FUN_004af284(param_1, param_2);
  FUN_0040fe10();
  FUN_0040bc10(0x143);
  return;
}


 export function FUN_004af3e0 (in_ECX, param_1, param_2)

 {
  let piVar1;
  let iVar2;
  let iVar3;
  let pvVar4;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_40;
  let local_3c;
  let local_38;
  let local_30;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004af84d;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_24 = s32(param_1, 0);
  local_20 = s32(param_1, 1);
  local_1c = s32(param_1, 2);
  local_18 = s32(param_1, 3);
  if ((DAT_00655c16 === 0xffff)) {
    iVar2 = FUN_00453e51(DAT_006d1da0, 9);
    if ((DAT_00655b07 === 0)) {
      local_14 = 0;
      goto LAB_004af467;
    }
  }
  local_14 = 1;
 LAB_004af467: :
  w32(((in_ECX + 0x3e8) + param_2 * 4), 0, 0);
  for (/* cond: (local_28 < 8) */); local_28 = (local_28 < 8); local_28 = (local_28 + 1)) {
    if (((DAT_0064c6c0[(DAT_006d1da0 * 0x594 + local_28 * 4)] & 1) !== 0)) {
      w32((((param_2 * 0x2004 + s32(((in_ECX + 0x3e8) + param_2 * 4), 0) * 4) + 0x3f0) + in_ECX), 0, local_28);
      w32((((param_2 * 0x2004 + s32(((in_ECX + 0x3e8) + param_2 * 4), 0) * 4) + 0x8400) + in_ECX), 0, 0);
      piVar1 = ((in_ECX + 0x3e8) + param_2 * 4);
      w32(piVar1, 0, (s32(piVar1, 0) + 1));
    }
  }
  if ((s32(((in_ECX + 0x3e8) + param_2 * 4), 0) < 1)) {
    w32(((in_ECX + 0x10410) + param_2 * 4), 0, -1);
  }
  else {
    w32(((in_ECX + 0x10410) + param_2 * 4), 0, 0);
  }
  w32(((in_ECX + 0x3e0) + param_2 * 4), 0, 2);
  iVar2 = (param_2 * 0x10 + in_ECX);
  w32((iVar2 + 0x3c0), 0, s32(param_1, 0));
  w32((iVar2 + 0x3c4), 0, s32(param_1, 1));
  w32((iVar2 + 0x3c8), 0, s32(param_1, 2));
  w32((iVar2 + 0x3cc), 0, s32(param_1, 3));
  if ((s32(((in_ECX + 0x10420) + param_2 * 4), 0) < s32(((in_ECX + 0x3e8) + param_2 * 4), 0))) {
    iVar3 = FUN_006e7d8c(2);
    iVar2 = local_1c;
    piVar1 = ((param_2 * 0x10 + 0x3c8) + in_ECX);
    w32(piVar1, 0, (s32(piVar1, 0) - iVar3));
    local_24 = FUN_006e7d8c(2);
    local_24 = (iVar2 - local_24);
    pvVar4 = operator_new(0x40);
    local_8 = 0;
    if ((pvVar4 === 0)) {
      local_30 = 0;
    }
    else {
      local_30 = FUN_0040fb00();
    }
    local_8 = -1;
    w32(((in_ECX + 0x37c) + param_2 * 4), 0, local_30);
    if ((in_ECX === 0)) {
      local_3c = 0;
    }
    else {
      local_3c = (in_ECX + 0x48);
    }
    FUN_0040fc50(local_3c, (param_2 + 0x40d), DAT_ffffffdc, 1);
    FUN_0040fd40(0, (s32(((in_ECX + 0x3e8) + param_2 * 4), 0) - s32(((in_ECX + 0x10420) + param_2 * 4), 0)));
    FUN_0040fcf0(0);
    FUN_005db0d0(s32(((in_ECX + 0x10420) + param_2 * 4), 0));
    FUN_0040fd80((LAB_00401410 + ((u8((param_2 === 0)) - 1) & 0xb3b)));
    FUN_00451ac0((LAB_00401410 + ((u8((param_2 === 0)) - 1) & 0xb3b)));
  }
  pvVar4 = operator_new(0x40);
  local_8 = 1;
  if ((pvVar4 === 0)) {
    local_38 = 0;
  }
  else {
    local_38 = FUN_00451930();
  }
  local_8 = -1;
  w32(((in_ECX + 0x384) + param_2 * 4), 0, local_38);
  if ((in_ECX === 0)) {
    local_40 = 0;
  }
  else {
    local_40 = (in_ECX + 0x48);
  }
  FUN_004519b0(local_40, (param_2 + 0x40f), ((param_2 * 0x10 + in_ECX) + 0x3c0));
  FUN_00451a60(LAB_00401e42);
  in_ECX = (in_ECX + 0x384);
  FUN_004afc89(param_2);
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_004af867 (param_1)

 {
  FUN_004af8a3(0, param_1);
  return;
}


 export function FUN_004af885 (param_1)

 {
  FUN_004af8a3(1, param_1);
  return;
}


 export function FUN_004af8a3 (param_1, param_2)

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004518d0();
  w32(((local_8 + 0x10410) + param_1 * 4), 0, param_2);
  FUN_004afc89(param_1);
  return;
}


 export function FUN_004af904 (param_1)

 {
  let puVar1;
  let iVar2;
  let iVar3;
  let local_1c;
  let local_18;
  let local_14;
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
  FUN_004518d0();
  local_c = (param_1 + -0x40f);
  FUN_00451890(DAT_fffffff0, DAT_ffffffec);
  if ((iVar2 < s32(((local_8 + 0x3e8) + local_c * 4), 0))) {
    iVar3 = FUN_005dba95();
    if ((iVar3 === 0)) {
      iVar3 = FUN_005dbab8();
      if ((iVar3 === 0)) {
        for (/* cond: (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)) */); local_18 = (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0));
            local_18 = (local_18 + 1)) {
          if ((local_18 !== iVar2)) {
            w32((((local_18 * 4 + local_c * 0x2004) + 0x8400) + local_8), 0, 0);
          }
        }
        w32(((local_8 + 0x10418) + local_c * 4), 0, iVar2);
        puVar1 = (((iVar2 * 4 + local_c * 0x2004) + 0x8400) + local_8);
        w32(puVar1, 0, (s32(puVar1, 0) ^ 1));
      }
      else {
        w32(((local_8 + 0x10418) + local_c * 4), 0, iVar2);
        puVar1 = (((iVar2 * 4 + local_c * 0x2004) + 0x8400) + local_8);
        w32(puVar1, 0, (s32(puVar1, 0) ^ 1));
      }
    }
    else {
      for (/* cond: (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)) */); local_18 = (local_18 < s32(((local_8 + 0x3e8) + local_c * 4), 0)); local_18 = (local_18 + 1))
      {
        w32((((local_18 * 4 + local_c * 0x2004) + 0x8400) + local_8), 0, 0);
      }
      if ((s32(((local_8 + 0x10418) + local_c * 4), 0) < iVar2)) {
        local_18 = s32(((local_8 + 0x10418) + local_c * 4), 0);
        local_1c = iVar2;
      }
      else {
        local_1c = s32(((local_8 + 0x10418) + local_c * 4), 0);
        local_18 = iVar2;
      }
      for (/* cond: (local_18 <= local_1c) */); local_18 = (local_18 <= local_1c); local_18 = (local_18 + 1)) {
        w32((((local_18 * 4 + local_c * 0x2004) + 0x8400) + local_8), 0, 1);
      }
    }
    FUN_004afc89(local_c);
  }
  return;
}


 export function FUN_004afb77 (param_1, param_2, param_3)

 {
  let iVar1;
  let iVar2;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((param_2 < s32(((param_3 * 0x10 + 0x3c4) + local_8), 0))) {
    iVar1 = -1;
  }
  else if ((param_2 < s32(((param_3 * 0x10 + 0x3cc) + local_8), 0))) {
    if ((param_1 < s32(((param_3 * 0x10 + 0x3c0) + local_8), 0))) {
      iVar1 = -3;
    }
    else if ((param_1 < s32(((param_3 * 0x10 + 0x3c8) + local_8), 0))) {
      iVar1 = s32(((param_3 * 0x10 + 0x3c4) + local_8), 0);
      iVar2 = FUN_00407fc0(((param_3 * 0x10 + local_8) + 0x3c0));
      iVar1 = (((param_2 - iVar1) / (iVar2 / s32(((local_8 + 0x10420) + param_3 * 4), 0) | 0) | 0) + s32(((local_8 + 0x10410) + param_3 * 4), 0));
    }
    else {
      iVar1 = -4;
    }
  }
  else {
    iVar1 = -2;
  }
  return iVar1;
}


 export function FUN_004afc89 (param_1)

 {
  let xLeft;
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let local_5c;
  let local_50;
  let local_40;
  let local_38;
  let local_34;
  let local_2c;
  let local_1c;
  let local_18;
  let local_8;

  local_34 = FUN_005c62ee();
  if ((local_34 === 0)) {
    local_34 = 0;
  }
  else {
    local_34 = (local_34 + -72);
  }
  FUN_005c00ce(DAT_ffffffe8);
  FUN_005c0073(((param_1 * 0x10 + local_34) + 0x3c0));
  FUN_005c0333(((param_1 * 0x10 + local_34) + 0x3c0), DAT_00635a18);
  if ((s32((local_34 + 0x154), 0) === 0)) {
    local_8 = DAT_0067a7a0;
  }
  else {
    local_8 = DAT_0067a798;
  }
  xLeft = s32(((param_1 * 0x10 + 0x3c0) + local_34), 0);
  iVar2 = FUN_00407f90(((param_1 * 0x10 + local_34) + 0x3c0));
  local_1c = FUN_00407fc0(((param_1 * 0x10 + local_34) + 0x3c0));
  local_1c = (local_1c / s32(((local_34 + 0x10420) + param_1 * 4), 0) | 0);
  iVar3 = (local_1c / 2 | 0);
  iVar4 = FUN_0040ef70();
  iVar3 = (iVar3 - (iVar4 / 2 | 0));
  w32(((local_34 + 0x1e4) + param_1 * 4), 0, 0);
  local_50 = 0;
  do {
    if ((s32(((local_34 + 0x3e8) + param_1 * 4), 0) <= local_50)) {
 LAB_004afe04: :
      for (/* cond: (local_50 < s32(((local_34 + 0x10420) + param_1 * 4), 0)) */); local_50 = (local_50 < s32(((local_34 + 0x10420) + param_1 * 4), 0));
          local_50 = (local_50 + 1)) {
        iVar4 = (s32(((param_1 * 0x10 + 0x3c4) + local_34), 0) + local_1c * local_50);
        FUN_006e7d90(DAT_ffffffd4, xLeft, iVar4, (iVar2 + xLeft), (local_1c + iVar4));
        if (((s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_50) < s32(((local_34 + 0x3e8) + param_1 * 4), 0))) {
          iVar1 = s32((((param_1 * 0x2004 + (s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_50) * 4) + 0x8400) + local_34), 0);
          if ((iVar1 === 0)) {
            local_38 = DAT_00635a1c;
            local_40 = DAT_00635a20;
          }
          else {
            local_38 = DAT_00635a28;
            local_40 = DAT_00635a2c;
          }
          iVar5 = ((((-u8((s32((local_34 + 0x154), 0) === 0))) & -30) + 0x5a) + DAT_0062d858);
          local_2c = (UNNAMED + (iVar5 + -3));
          if ((iVar1 === 0)) {
            local_5c = DAT_00635a18;
          }
          else {
            local_5c = DAT_00635a24;
          }
          FUN_005c0333(DAT_ffffffd4, local_5c);
          if ((s32(((local_34 + 0x10410) + param_1 * 4), 0) === -1)) {
            FUN_0040bbb0();
            uVar6 = FUN_00428b0c(s32((DAT_00628420 + 0xb84), 0));
            FUN_0040bbe0(uVar6);
            w32(((local_34 + 0x1e4) + param_1 * 4), 0, 0);
          }
          else {
            uVar6 = FUN_0040ef70();
            FUN_004b0157(s32((((param_1 * 0x2004 + (s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_50) * 4) + 0x3f0) + local_34), 0), (s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_50), (xLeft + 2), iVar4, uVar6);
            FUN_0040bbb0();
            uVar6 = FUN_00493c7d(s32((((param_1 * 0x2004 + (s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_50) * 4) + 0x3f0) + local_34), 0));
            FUN_0040bbe0(uVar6);
            FUN_0040fe10();
            FUN_0040fea0();
            uVar6 = FUN_00493b10(s32((((param_1 * 0x2004 + (s32(((local_34 + 0x10410) + param_1 * 4), 0) + local_50) * 4) + 0x3f0) + local_34), 0));
            FUN_0040bbe0(uVar6);
            FUN_0040fed0();
          }
          if ((local_40 !== local_38)) {
            FUN_005c19ad(local_40);
            FUN_005c0f57(local_8, DAT_00679640, ((iVar5 + xLeft) + 2), ((iVar3 + iVar4) + 1), 5);
            FUN_005c19ad(local_38);
            FUN_005c0f57(local_8, DAT_00679640, ((iVar5 + xLeft) + 1), (iVar3 + iVar4), 5);
          }
          FUN_005c19ad(local_38);
          FUN_005c0f57(local_8, DAT_00679640, (iVar5 + xLeft), (iVar3 + iVar4), 5);
        }
      }
      FUN_005c0073(DAT_ffffffe8);
      FUN_0052e971();
      FUN_0040f380();
      return;
    }
    if ((s32((((param_1 * 0x2004 + local_50 * 4) + 0x8400) + local_34), 0) !== 0)) {
      w32(((local_34 + 0x1e4) + param_1 * 4), 0, 1);
      goto LAB_004afe04;
    }
    local_50 = (local_50 + 1);
  } ( true );
}
