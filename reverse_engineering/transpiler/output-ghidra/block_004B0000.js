// Block 0x004B0000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 164

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_004b0157 (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let local_30;
  let local_2c;
  let local_28;
  let local_20;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  local_14 = FUN_005c62ee();
  if ((local_14 === 0)) {
    local_14 = 0;
  }
  else {
    local_14 = (local_14 + -72);
  }
  if ((s32((local_14 + 0x154), 0) === 0)) {
    local_2c = -4;
  }
  else {
    local_2c = -2;
  }
  local_c = 0;
  local_30 = -1;
  for (/* cond: (local_28 < ((DAT_00655b18) << 16 >> 16)) */); local_28 = (local_28 < ((DAT_00655b18) << 16 >> 16)); local_28 = (local_28 + 1)) {
    if ((s8(DAT_0064f348[local_28 * 0x58]) === param_1)) {
      local_8 = s8(DAT_0064f349[local_28 * 0x58]);
      iVar1 = FUN_0043d20a(local_28, 1);
      if ((iVar1 !== 0)) {
        local_8 = (local_8 + 0xc8);
      }
      if ((DAT_0064f379[local_28 * 0x58] === 0xff)) {
        local_8 = (local_8 + 0x64);
      }
      if ((local_c < local_8)) {
        local_c = local_8;
        local_30 = local_28;
      }
    }
  }
  if ((-1 < local_30)) {
    local_20 = param_3;
    if ((s32((local_14 + 0x154), 0) === 0)) {
      local_18 = 0x18;
    }
    else {
      local_18 = 0x24;
    }
    if (((param_2 & 1) !== 0)) {
      local_20 = (param_3 + (local_18 + 2));
    }
    iVar1 = FUN_00472cf0(0x30, local_2c);
    FUN_0056d289(DAT_0067a7a8, local_30, 0, local_20, (param_4 - ((iVar1 - param_5) / 2 | 0)), local_2c);
  }
  return;
}


 export function FUN_004b0720 (param_1)

 {
  let iVar1;
  let local_c;
  let local_8;

  iVar1 = _strcmp(param_1, DAT_0062d0a4);
  if ((iVar1 === 0)) {
    local_c = -2;
  }
  else {
    iVar1 = _strcmp(param_1, DAT_0062d0a8);
    if ((iVar1 === 0)) {
      local_c = -1;
    }
    else {
      local_c = -3;
      for (/* cond: (local_8 < 0x64) */); (local_c = (local_c < 0) && (local_8 = (local_8 < 0x64))); local_8 = (local_8 + 1)) {
        iVar1 = _strcmp(param_1, (DAT_00627680 + local_8 * 0x10));
        if ((iVar1 === 0)) {
          local_c = local_8;
        }
      }
    }
  }
  return local_c;
}


 export function FUN_004b07d1 (param_1)

 {
  let iVar1;
  let local_c;
  let local_8;

  iVar1 = __strcmpi(param_1, DAT_0062d0ac);
  if ((iVar1 === 0)) {
    local_c = -1;
  }
  else {
    iVar1 = __strcmpi(param_1, DAT_0062d0b0);
    if ((iVar1 === 0)) {
      local_c = -2;
    }
    else {
      local_c = -3;
      for (/* cond: (local_8 < 0xb) */); (local_c = (local_c < 0) && (local_8 = (local_8 < 0xb))); local_8 = (local_8 + 1)) {
        iVar1 = _strcmp(param_1, (DAT_00627cc0 + local_8 * 0x18));
        if ((iVar1 === 0)) {
          local_c = local_8;
        }
      }
    }
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
  return;
}


 export function FUN_004b0905 ()

 {
  let sVar1;
  let uVar2;
  let local_8;

  if ((DAT_0062d0bc !== 0)) {
    FUN_004b0a0a();
  }
  DAT_0067a400 = 0;
  for (/* cond: (local_8 < 0x17) */); local_8 = (local_8 < 0x17); local_8 = (local_8 + 1)) {
    DAT_0067a400 = (DAT_0067a400 + s32(DAT_0067a414, local_8 * 6));
  }
  if (((DAT_0067a400 & 3) !== 0)) {
    FUN_005dae6b(7, s_mirrorLength_%_sizeof(long)_==_0_0062d0f0, s_D:\Ss\Franklinton\Difference_Eng_0062d0c8, 0x22);
  }
  DAT_0062d0bc = operator_new(DAT_0067a400);
  if ((operator_new(DAT_0067a400) === 0)) {
    uVar2 = 0;
  }
  else {
    _memset(operator_new(DAT_0067a400), 0, DAT_0067a400);
    sVar1 = DAT_0067a588;
    if ((DAT_006ad2f7 !== 0)) {
      sVar1 = DAT_0067a400;
    }
    DAT_0067a408 = (sVar1 + operator_new(DAT_0067a400));
    FUN_004b0a41();
    uVar2 = 1;
  }
  return uVar2;
}


 export function FUN_004b0a0a ()

 {
  operator_delete(DAT_0062d0bc);
  DAT_0062d0bc = 0;
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004b0a41 ()

 {
  let local_c;
  let local_8;

  local_8 = DAT_0062d0bc;
  for (/* cond: (local_c < 0x17) */); local_c = (local_c < 0x17); local_c = (local_c + 1)) {
    FID_conflict:_memcpy(local_8, s32(DAT_0067a424, local_c * 6), s32((DAT_0067a410 + local_c * 0x18), 0));
    local_8 = (local_8 + s32(DAT_0067a414, local_c * 6));
  }
  DAT_00679fe8 = DAT_0062d0bc;
  DAT_0067a404 = 0;
  _DAT_00679fec = 0;
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004b0ad0 ()

 {
  let uVar1;
  let local_c;

  FUN_004b0a41();
  DAT_00679fe8 = DAT_0062d0bc;
  uVar1 = (DAT_0067a400 >>> 2);
  for (/* cond: (local_c < uVar1) */); local_c = (local_c < uVar1); local_c = (local_c + 1)) {
    w32(DAT_00679fe8, 0, (~s32(DAT_00679fe8, 0)));
    DAT_00679fe8 = (DAT_00679fe8 + 1);
  }
  DAT_00679fe8 = DAT_0062d0bc;
  DAT_0067a404 = 0;
  _DAT_00679fec = 0;
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004b0b53 (param_1, param_2, param_3, param_4, param_5)

 {
  let _Dst;
  let _Src;
  let iVar1;
  let local_4c;
  let local_48;
  let local_44;
  let local_40;
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

  if ((DAT_00655b02 < 3)) {
    local_4c = 0;
  }
  else if ((DAT_006ad308 === 1)) {
    local_4c = 0;
  }
  else {
    local_4c = 0;
    local_10 = 0;
    local_c = 0;
    local_24 = DAT_00679fe8;
    _DAT_0062d0c4 = (DAT_0062d0c4 + 1);
    if (((param_2 & 1) !== 0)) {
      FUN_004b0ad0();
    }
    if (((param_2 & 4) === 0)) {
      if (((param_2 & 8) !== 0)) {
        local_10 = param_3;
      }
    }
    else {
      local_c = FUN_00421bb0();
      local_c = (param_3 + local_c);
    }
    local_40 = (s32(DAT_0067a424, DAT_0067a404 * 6) + None);
    local_8 = (s32(DAT_0067a414, DAT_0067a404 * 6) + s32(DAT_0067a424, DAT_0067a404 * 6));
    if ((DAT_0067a404 === 1)) {
      local_1c = (DAT_0067a438 + DAT_0062d0bc);
      w16((local_1c + 0x16), 0, DAT_00655afe);
      w16((local_1c + 0x18), 0, DAT_00655b00);
      _MEM[(local_1c + 0x1a)] = DAT_00655b02;
      _MEM[(local_1c + 0x1b)] = DAT_00655b03;
      _MEM[(local_1c + 0x1c)] = DAT_00655b04;
      _MEM[(local_1c + 0x1d)] = DAT_00655b05;
      w32((local_1c + 2), 0, DAT_00655aea);
      w16((local_1c + 0xa), 0, DAT_00655af2);
    }
    _DAT_00679ff0 = 0x66606660;
    if ((param_5 === 0)) {
      _DAT_00679ff4 = 0x15;
    }
    else {
      _DAT_00679ff4 = 0x5c;
    }
    local_18 = DAT_0067a01c;
    local_14 = 0;
    do {
      _Src = local_40;
      _Dst = DAT_00679fe8;
      if ((s32(local_40, 0) === s32(DAT_00679fe8, 0))) {
        DAT_00679fe8 = (DAT_00679fe8 + 1);
        if (((DAT_00679fe8 + 1) < DAT_0067a408)) {
          local_40 = (local_40 + 1);
          if ((local_8 <= local_40)) {
            DAT_0067a404 = (DAT_0067a404 + 1);
            if (((DAT_0067a404 + 1) === 1)) {
              local_1c = (DAT_0067a438 + DAT_0062d0bc);
              w16((local_1c + 0x16), 0, DAT_00655afe);
              w16((local_1c + 0x18), 0, DAT_00655b00);
              _MEM[(local_1c + 0x1a)] = DAT_00655b02;
              _MEM[(local_1c + 0x1b)] = DAT_00655b03;
              _MEM[(local_1c + 0x1c)] = DAT_00655b04;
              _MEM[(local_1c + 0x1d)] = DAT_00655b05;
              w32((local_1c + 2), 0, DAT_00655aea);
              w16((local_1c + 0xa), 0, DAT_00655af2);
            }
            _DAT_00679fec = 0;
            local_40 = s32(DAT_0067a424, DAT_0067a404 * 6);
            local_8 = (s32(DAT_0067a414, DAT_0067a404 * 6) + s32(DAT_0067a424, DAT_0067a404 * 6));
          }
        }
        else {
          DAT_00679fe8 = DAT_0062d0bc;
          DAT_0067a404 = 0;
          _DAT_00679fec = 0;
          local_40 = DAT_0067a424;
          local_8 = (DAT_0067a414 + DAT_0067a424);
        }
      }
      else {
        local_44 = 0;
        do {
          DAT_00679fe8 = (DAT_00679fe8 + 1);
          if (((DAT_00679fe8 + 1) < DAT_0067a408)) {
            local_40 = (local_40 + 1);
            if ((local_8 <= local_40)) {
              local_20 = (_Src - s32(DAT_0067a424, DAT_0067a404 * 6));
              local_44 = (local_8 - _Src);
              local_48 = DAT_0067a404;
              DAT_0067a404 = (DAT_0067a404 + 1);
              if (((DAT_0067a404 + 1) === 1)) {
                local_1c = (DAT_0067a438 + DAT_0062d0bc);
                w16((local_1c + 0x16), 0, DAT_00655afe);
                w16((local_1c + 0x18), 0, DAT_00655b00);
                _MEM[(local_1c + 0x1a)] = DAT_00655b02;
                _MEM[(local_1c + 0x1b)] = DAT_00655b03;
                _MEM[(local_1c + 0x1c)] = DAT_00655b04;
                _MEM[(local_1c + 0x1d)] = DAT_00655b05;
                w32((local_1c + 2), 0, DAT_00655aea);
                w16((local_1c + 0xa), 0, DAT_00655af2);
              }
              _DAT_00679fec = 0;
              local_40 = s32(DAT_0067a424, DAT_0067a404 * 6);
              local_8 = (s32(DAT_0067a414, DAT_0067a404 * 6) + s32(DAT_0067a424, DAT_0067a404 * 6));
            }
          }
          else {
            local_20 = (_Src - s32(DAT_0067a424, DAT_0067a404 * 6));
            local_44 = (DAT_0067a408 - _Dst);
            local_48 = DAT_0067a404;
            DAT_00679fe8 = DAT_0062d0bc;
            DAT_0067a404 = 0;
            _DAT_00679fec = 0;
            local_40 = DAT_0067a424;
            local_8 = (DAT_0067a414 + DAT_0067a424);
          }
        } while ((s32(local_40, 0) !== s32(DAT_00679fe8, 0)));
        if ((0x400 < local_44)) {
          FUN_005dae6b(7, s_diffLength_<=_DIFF_ENGINE_MESSAG_0062d13c, s_D:\Ss\Franklinton\Difference_Eng_0062d114, 0xee);
        }
        if ((local_44 === 0)) {
          local_20 = (_Src - s32(DAT_0067a424, DAT_0067a404 * 6));
          local_48 = DAT_0067a404;
          local_44 = (DAT_00679fe8 - _Dst);
        }
        if ((0x400 < local_44)) {
          FUN_005dae6b(7, s_diffLength_<=_DIFF_ENGINE_MESSAG_0062d190, s_D:\Ss\Franklinton\Difference_Eng_0062d168, 0xf7);
        }
        if (((param_2 & 0x10) === 0)) {
          FID_conflict:_memcpy(_Dst, _Src, local_44);
        }
        local_38 = _Src;
        local_34 = (_Src + local_44);
        local_30 = (local_18 + 3);
        local_2c = DAT_0067a400;
        iVar1 = FUN_004b263e(DAT_ffffffc8);
        if ((iVar1 === 0)) {
          FID_conflict:_memcpy((local_18 + 3), _Src, local_44);
          w32(local_18, 0, local_48);
          w32(local_18, 1, local_20);
          w32(local_18, 2, local_44);
          local_18 = (local_18 + (local_44 + 0xc));
        }
        else {
          w32(local_18, 0, (local_48 | 0x8000));
          w32(local_18, 1, local_20);
          w32(local_18, 2, local_28);
          local_18 = (local_18 + (local_28 + 0xc));
        }
        local_14 = (local_14 + 1);
        local_4c = (local_4c + local_44);
        if ((DAT_0062d0c0 <= (local_18 + -0x19e7fc))) {
          _DAT_00679ff8 = (local_18 + -0x19e7fc);
          _DAT_0067a000 = local_14;
          FUN_0046b14d(0x5c, param_1, 0, 0, 0, 0, 0, 0, 0, DAT_00679ff0);
          if (((param_2 & 1) !== 0)) {
            XD_FlushSendBuffer(0x1388);
          }
          local_18 = DAT_0067a01c;
          local_14 = 0;
        }
        if ((local_10 === 0));
    if ((DAT_0067a01c < local_18)) {
      _DAT_00679ff8 = (local_18 + -0x19e7fc);
      _DAT_0067a000 = local_14;
      FUN_0046b14d(0x5c, param_1, 0, 0, 0, 0, 0, 0, 0, DAT_00679ff0);
      if (((param_2 & 1) !== 0)) {
        XD_FlushSendBuffer(0x1388);
      }
    }
    _DAT_00679fec = (local_40 - s32(DAT_0067a424, DAT_0067a404 * 6));
  }
  return local_4c;
}


 export function FUN_004b12b3 (param_1)

 {
  let uVar1;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_0062d0bc !== 0)) {
    local_14 = s32(DAT_0067a424, param_1 * 6);
    local_c = (s32((DAT_0067a420 + param_1 * 0x18), 0) + DAT_0062d0bc);
    uVar1 = s32(DAT_0067a414, param_1 * 6);
    if (((uVar1 & 3) !== 0)) {
      FUN_005dae6b(7, s_!(size_%_4)_0062d1e4, s_D:\Ss\Franklinton\Difference_Eng_0062d1bc, 0x1a7);
    }
    for (/* cond: (local_10 < (uVar1 >>> 2)) */); local_10 = (local_10 < (uVar1 >>> 2)); local_10 = (local_10 + 1)) {
      if ((s32(local_14, 0) !== s32(local_c, 0))) {
        return 1;
      }
      local_14 = (local_14 + 1);
      local_c = (local_c + 1);
    }
  }
  return 0;
}


 export function FUN_004b1396 (param_1, param_2)

 {
  let uVar1;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_14;
  let local_c;
  let local_8;

  if ((param_2 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = 0;
    uVar1 = (param_2 >> 0x1f);
    if ((((((param_2 ^ uVar1) - uVar1) & 3) ^ uVar1) === uVar1)) {
      local_c = param_1;
      for (/* cond: (local_14 < (param_2 >> 2)) */); local_14 = (local_14 < (param_2 >> 2)); local_14 = (local_14 + 1)) {
        local_8 = (local_8 + s32(local_c, 0));
        local_c = (local_c + 2);
      }
    }
    else if ((((((param_2 ^ uVar1) - uVar1) & 1) ^ uVar1) === uVar1)) {
      local_20 = param_1;
      for (/* cond: (local_1c < (param_2 >> 2)) */); local_1c = (local_1c < (param_2 >> 2)); local_1c = (local_1c + 1)) {
        local_8 = (local_8 + ((s16(local_20, 0)) & 0xFFFF));
        local_20 = (local_20 + 1);
      }
    }
    else {
      local_28 = param_1;
      for (/* cond: (local_24 < param_2) */); local_24 = (local_24 < param_2); local_24 = (local_24 + 1)) {
        local_8 = (local_8 + u8(((s16(local_28, 0)) & 0xFF)));
        local_28 = (local_28 + 1);
      }
    }
  }
  return local_8;
}


 export function FUN_004b14a4 ()

 {
  let local_c;
  let local_8;

  local_8 = 0;
  for (/* cond: (local_c < 0x18) */); local_c = (local_c < 0x18); local_c = (local_c + 1)) {
    if ((local_c === 5)) {
      local_8 = (((DAT_00655b16) << 16 >> 16) * 0x20 + local_8);
    }
    else if ((local_c === 6)) {
      local_8 = (((DAT_00655b18) << 16 >> 16) * 0x58 + local_8);
    }
    else {
      local_8 = (local_8 + s32((DAT_0067a410 + local_c * 0x18), 0));
    }
  }
  return (local_8 + 0x1e0);
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004b153c (param_1)

 {
  let pvVar1;
  let uVar2;
  let local_14;
  let local_c;
  let local_8;

  local_14 = 0;
  local_c = (((((((DAT_0067a428 + DAT_0067a4b8) + DAT_0067a458) + DAT_0067a440) + DAT_0067a4e8) + DAT_0067a518) + DAT_0067a638) + 0x8c);
  if ((local_c < 0)) {
    FUN_005dae6b(7, s_size_>=_0_0062d218, s_D:\Ss\Franklinton\Difference_Eng_0062d1f0, 0x226);
  }
  pvVar1 = operator_new(local_c);
  w32(param_1, 0, pvVar1);
  local_8 = s32(param_1, 0);
  if ((local_8 === 0)) {
    FUN_005d225b(s_Failed_to_allocated_buffer_for_g_0062d224);
    uVar2 = 0;
  }
  else {
    _DAT_0067a434 = FUN_004b1396(DAT_0067a43c, DAT_0067a428);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a428, 0x14);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a43c, DAT_0067a428);
    _DAT_0067a4c4 = FUN_004b1396(DAT_0067a4cc, DAT_0067a4b8);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a4b8, 0x14);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a4cc, DAT_0067a4b8);
    _DAT_0067a464 = FUN_004b1396(DAT_0067a46c, DAT_0067a458);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a458, 0x14);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a46c, DAT_0067a458);
    _DAT_0067a44c = FUN_004b1396(DAT_0067a454, DAT_0067a440);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a440, 0x14);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a454, DAT_0067a440);
    _DAT_0067a4f4 = FUN_004b1396(DAT_0067a4fc, DAT_0067a4e8);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a4e8, 0x14);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a4fc, DAT_0067a4e8);
    _DAT_0067a524 = FUN_004b1396(DAT_0067a52c, DAT_0067a518);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a518, 0x14);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a52c, DAT_0067a518);
    _DAT_0067a644 = FUN_004b1396(DAT_0067a64c, DAT_0067a638);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a638, 0x14);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a64c, DAT_0067a638);
    uVar2 = FUN_005dfd8f(param_1, UNNAMED);
  }
  return uVar2;
}


 export function FUN_004b187f (param_1, param_2, param_3, param_4, param_5)

 {
  if ((param_3 < (s32(param_2, 0) + param_5))) {
    FUN_005dae6b(7, s_*curSize_+_datSize_<=_bufSize_0062d294, s_D:\Ss\Franklinton\Difference_Eng_0062d26c, 0x20d);
  }
  FID_conflict:_memcpy((s32(param_2, 0) + param_1), param_4, param_5);
  w32(param_2, 0, (s32(param_2, 0) + param_5));
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004b18e1 (param_1)

 {
  let pvVar1;
  let uVar2;
  let local_14;
  let local_c;
  let local_8;

  local_14 = 0;
  local_c = ((DAT_0067a428 + 0x28) + DAT_0067a530);
  pvVar1 = operator_new(local_c);
  w32(param_1, 0, pvVar1);
  local_8 = s32(param_1, 0);
  if ((local_8 === 0)) {
    FUN_005d225b(s_Failed_to_allocated_buffer_for_g_0062d2b4);
    uVar2 = 0;
  }
  else {
    _DAT_0067a434 = FUN_004b1396(DAT_0067a43c, DAT_0067a428);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a428, 0x14);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a43c, DAT_0067a428);
    _DAT_0067a53c = FUN_004b1396(DAT_0067a544, DAT_0067a530);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a530, 0x14);
    FUN_004b187f(local_8, DAT_ffffffec, local_c, DAT_0067a544, DAT_0067a530);
    uVar2 = FUN_005dfd8f(param_1, 0);
  }
  return uVar2;
}


 export function FUN_004b1a15 (param_1)

 {
  let uVar1;
  let pvVar2;
  let uVar3;
  let iVar4;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_10;
  let local_c;
  let local_8;

  uVar1 = FUN_004b14a4();
  if ((uVar1 < 0)) {
    FUN_005dae6b(7, s_sz_>=_0_0062d324, s_D:\Ss\Franklinton\Difference_Eng_0062d2fc, 0x27f);
  }
  pvVar2 = operator_new(uVar1);
  w32(param_1, 0, pvVar2);
  local_8 = s32(param_1, 0);
  if ((local_8 === 0)) {
    FUN_005d225b(s_Failed_to_allocated_buffer_for_g_0062d32c);
    local_2c = 0;
  }
  else {
    local_c = 0;
    for (/* cond: (local_28 < 0x18) */); local_28 = (local_28 < 0x18); local_28 = (local_28 + 1)) {
      FID_conflict:_memcpy(DAT_ffffffdc, (DAT_0067a410 + local_28 * 0x18), 0x14);
      if ((local_28 === 5)) {
        local_24 = (((DAT_00655b16) << 16 >> 16) << 5);
      }
      else if ((local_28 === 6)) {
        local_24 = ((DAT_00655b18) << 16 >> 16) * 0x58;
      }
      uVar3 = FUN_004b1396(s32(DAT_0067a424, local_28 * 6), UNNAMED);
      w32((DAT_0067a41c + local_28 * 0x18), 0, uVar3);
      FUN_004b187f(local_8, DAT_fffffff4, uVar1, DAT_ffffffdc, 0x14);
      FUN_004b187f(local_8, DAT_fffffff4, uVar1, s32(DAT_0067a424, local_28 * 6), UNNAMED);
    }
    local_3c = operator_new(local_c);
    if ((local_3c === 0)) {
      FUN_005d225b(s_Failed_to_allocated_buffer_2_for_0062d374);
      local_2c = 0;
    }
    else {
      local_38 = (local_c + local_3c);
      FID_conflict:_memcpy(local_3c, local_8, local_c);
      local_34 = s32(param_1, 0);
      local_30 = (local_c + s32(param_1, 0));
      iVar4 = FUN_004b263e(DAT_ffffffc4);
      if ((iVar4 === 0)) {
        local_10 = -1;
        local_2c = local_10;
      }
      else {
        pvVar2 = FID_conflict:__expand(s32(param_1, 0), local_2c);
        w32(param_1, 0, pvVar2);
      }
    }
  }
  return local_2c;
}


 export function FUN_004b1c11 (param_1)

 {
  let uVar1;
  let pvVar2;
  let uVar3;
  let local_2c;
  let local_28;
  let local_14;
  let local_10;
  let local_8;

  uVar1 = FUN_004b14a4();
  if ((uVar1 < 0)) {
    FUN_005dae6b(7, s_sz_>=_0_0062d3e4, s_D:\Ss\Franklinton\Difference_Eng_0062d3bc, 0x2c6);
  }
  pvVar2 = operator_new(uVar1);
  w32(param_1, 0, pvVar2);
  local_8 = s32(param_1, 0);
  if ((local_8 === 0)) {
    FUN_005d225b(s_Failed_to_allocate_buffer_for_ga_0062d3ec);
    uVar3 = 0;
  }
  else {
    local_10 = 0;
    for (/* cond: (local_2c < 0x18) */); local_2c = (local_2c < 0x18); local_2c = (local_2c + 1)) {
      FID_conflict:_memcpy(DAT_ffffffd8, (DAT_0067a410 + local_2c * 0x18), 0x14);
      if ((local_2c === 5)) {
        local_28 = (((DAT_00655b16) << 16 >> 16) << 5);
      }
      else if ((local_2c === 6)) {
        local_28 = ((DAT_00655b18) << 16 >> 16) * 0x58;
      }
      local_14 = FUN_004b1396(s32(DAT_0067a424, local_2c * 6), UNNAMED);
      if ((UNNAMED !== 0)) {
        w32((DAT_0067a41c + local_2c * 0x18), 0, local_14);
        FUN_004b187f(local_8, DAT_fffffff0, uVar1, DAT_ffffffd8, 0x14);
        FUN_004b187f(local_8, DAT_fffffff0, uVar1, s32(DAT_0067a424, local_2c * 6), UNNAMED);
      }
    }
    pvVar2 = FID_conflict:__expand(s32(param_1, 0), UNNAMED);
    w32(param_1, 0, pvVar2);
    if ((s32(param_1, 0) === 0)) {
      FUN_005d225b(s_Failed_to_re-allocate_buffer_for_0062d430);
      uVar3 = 0;
    }
    else {
      uVar3 = FUN_005dfd8f(param_1, UNNAMED);
    }
  }
  return uVar3;
}


 export function FUN_004b1de3 (param_1, param_2)

 {
  let psVar1;
  let psVar2;
  let sVar3;
  let iVar4;
  let uVar5;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((s32(param_1, 0) === 0)) {
    FUN_005dae6b(7, s_phData_&&_*phData_0062d4a0, s_D:\Ss\Franklinton\Difference_Eng_0062d478, 0x2fc);
  }
  local_1c = DAT_00655aea;
  local_18 = DAT_00655af2;
  if ((DAT_0067a424 === 0)) {
    FUN_004b21d7();
  }
  if ((DAT_006c8ffc === 0)) {
    if ((param_2 !== 0)) {
      local_c = FUN_005dfb61(param_1);
    }
    local_8 = s32(param_1, 0);
    local_c = __msize(s32(param_1, 0));
  }
  else {
    local_30 = s32(param_1, 0);
    sVar3 = __msize(s32(param_1, 0));
    local_2c = (local_30 + sVar3);
    local_c = FUN_004b24a2(DAT_ffffffd0);
    local_28 = operator_new(local_c);
    if ((local_28 === 0)) {
      FUN_005d225b(s_Failed_to_allocate_buffer_2_for_g_0062d4b4);
      return;
    }
    local_24 = (local_28 + local_c);
    iVar4 = FUN_004b251a(DAT_ffffffd0);
    if ((iVar4 === 0)) {
      FUN_005d225b(s_Failed_to_RLLBufferDecode_in_Set_0062d4fc);
      return;
    }
    operator_delete(s32(param_1, 0));
    w32(param_1, 0, local_28);
    local_8 = s32(param_1, 0);
  }
  local_10 = 0;
  while ((local_10 < local_c)) {
    local_14 = local_8;
    psVar2 = (local_8 + 5);
    local_10 = ((s32(local_8, 0) + local_10) + 0x14);
    if ((0x17 < s32(local_8, 2))) {
      local_8 = psVar2;
      FUN_005dae6b(7, s_pNode->type_>=_0_&&_pNode->type_<_0062d554, s_D:\Ss\Franklinton\Difference_Eng_0062d52c, 0x338);
    }
    FID_conflict:_memcpy(s32(DAT_0067a424, s32(local_14, 2) * 6), local_8, s32(local_14, 0));
    uVar5 = FUN_004b1396(local_8, s32(local_14, 0));
    w32((DAT_0067a41c + s32(local_14, 2) * 0x18), 0, uVar5);
    local_8 = (local_8 + s32(local_14, 0));
  }
  DAT_00655af2 = local_18;
  DAT_00655aea = local_1c;
  return;
}


 export function FUN_004b2010 (param_1, param_2)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let local_8;

  if ((s32(param_1, 0) === 0)) {
    FUN_005dae6b(7, s_phData_&&_*phData_0062d5b0, s_D:\Ss\Franklinton\Difference_Eng_0062d588, 0x34b);
  }
  uVar2 = DAT_00655af2;
  uVar1 = DAT_00655aea;
  if ((param_2 !== 0)) {
    FUN_005dfb61(param_1);
  }
  local_8 = s32(param_1, 0);
  FUN_005b8416();
  iVar3 = FUN_004b2123(DAT_fffffff8);
  if ((iVar3 !== 1)) {
    FUN_005dae6b(7, s_blockType_==_btGame_0062d5ec, s_D:\Ss\Franklinton\Difference_Eng_0062d5c4, 0x35a)
    ;
  }
  iVar3 = FUN_004b2123(DAT_fffffff8);
  if ((iVar3 !== 0xc)) {
    FUN_005dae6b(7, s_blockType_==_btMapStruct_0062d628, s_D:\Ss\Franklinton\Difference_Eng_0062d600, 0x35d);
  }
  DAT_00655aea = uVar1;
  DAT_00655af2 = uVar2;
  FUN_005b7fe0();
  FUN_004b21d7();
  FUN_004b0905();
  return;
}


 export function FUN_004b2123 (param_1)

 {
  let psVar1;
  let uVar2;

  psVar1 = s32(param_1, 0);
  w32(param_1, 0, (s32(param_1, 0) + 0x14));
  if ((0x17 < s32(psVar1, 2))) {
    FUN_005dae6b(7, s_pNode->type_>=_0_&&_pNode->type_<_0062d66c, s_D:\Ss\Franklinton\Difference_Eng_0062d644, 0x36d);
  }
  FID_conflict:_memcpy(s32(DAT_0067a424, s32(psVar1, 2) * 6), s32(param_1, 0), s32(psVar1, 0));
  uVar2 = FUN_004b1396(s32(param_1, 0), s32(psVar1, 0));
  w32((DAT_0067a41c + s32(psVar1, 2) * 0x18), 0, uVar2);
  w32(param_1, 0, (s32(param_1, 0) + s32(psVar1, 0)));
  return s32(psVar1, 2);
}


 export function FUN_004b21d7 ()

 {
  let local_c;
  let local_8;

  FUN_00497ff3(DAT_0064b984);
  FUN_004b3080(DAT_0062d0b8, 4, 0);
  FUN_004b3080(DAT_00655ae8, 0x14c, 1);
  FUN_004b3080(DAT_0064bcf8, 0x790, 2);
  FUN_004b3080(DAT_0064c6a0, 0x2ca0, 3);
  FUN_004b3080(DAT_00666130, 0x400, 4);
  FUN_004b3080(DAT_006560f0, 0x10000, 5);
  FUN_004b3080(DAT_0064f340, 0x5800, 6);
  FUN_004b3080(DAT_006554f8, 0x3f0, 7);
  FUN_004b3080(DAT_00655c38, 0x4b0, 8);
  FUN_004b3080(DAT_0064bc60, 0x64, 9);
  FUN_004b3080(DAT_00655128, 0x154, 0xa);
  FUN_004b3080(DAT_00654b40, 0x494, 0xb);
  FUN_004b3080(DAT_006d1160, 0x10, 0xc);
  FUN_004b3080(DAT_006365e0, ((DAT_006d116a) << 16 >> 16) * ((DAT_006d116c) << 16 >> 16), 0xd);
  FUN_004b3080(DAT_006365e4, ((DAT_006d116a) << 16 >> 16) * ((DAT_006d116c) << 16 >> 16), 0xe);
  FUN_004b3080(DAT_006365c4, ((DAT_006d1164) << 16 >> 16), 0xf);
  FUN_004b3080(DAT_006365c8, ((DAT_006d1164) << 16 >> 16), 0x10);
  FUN_004b3080(DAT_006365cc, ((DAT_006d1164) << 16 >> 16), 0x11);
  FUN_004b3080(DAT_006365d0, ((DAT_006d1164) << 16 >> 16), 0x12);
  FUN_004b3080(DAT_006365d4, ((DAT_006d1164) << 16 >> 16), 0x13);
  FUN_004b3080(DAT_006365d8, ((DAT_006d1164) << 16 >> 16), 0x14);
  FUN_004b3080(DAT_006365dc, ((DAT_006d1164) << 16 >> 16), 0x15);
  FUN_004b3080(DAT_00636598, ((DAT_006d1164) << 16 >> 16) * 6, 0x16);
  FUN_004b3080(DAT_0064b98c, 0xc350, 0x17);
  local_c = 0;
  for (/* cond: (local_8 < 0x17) */); local_8 = (local_8 < 0x17); local_8 = (local_8 + 1)) {
    w32((DAT_0067a420 + local_8 * 0x18), 0, local_c);
    local_c = (local_c + s32(DAT_0067a414, local_8 * 6));
  }
  return;
}


 export function FUN_004b24a2 (param_1)

 {
  let local_10;
  let local_c;
  let local_8;

  local_8 = s32(param_1, 0);
  local_c = 0;
  while ((local_8 < s32(param_1, 1))) {
    local_10 = ((s16(local_8, 0)) & 0xFFFF);
    if ((local_10 < 0x8000)) {
      local_8 = (local_8 + 3);
    }
    else {
      local_8 = (local_8 + ((local_10 & 0x7fff) + 2));
    }
    local_c = (local_c + (local_10 & 0x7fff));
  }
  return local_c;
}


 export function FUN_004b251a (param_1)

 {
  let _Src;
  let uVar1;
  let uVar2;
  let uVar3;
  let local_10;
  let local_c;

  uVar2 = FUN_004b24a2(param_1);
  if (((s32(param_1, 3) - s32(param_1, 2)) < uVar2)) {
    uVar3 = 0;
  }
  else {
    local_10 = s32(param_1, 0);
    local_c = s32(param_1, 2);
    while ((local_10 < s32(param_1, 1))) {
      uVar1 = s16(local_10, 0);
      _Src = (local_10 + 1);
      if ((uVar1 < 0x7fff)) {
        local_10 = (local_10 + 3);
        _memset(local_c, ((u8(((s16(local_10, 1)) & 0xFF))) << 16 >> 16), ((uVar1) & 0xFFFF));
      }
      else {
        uVar1 = (uVar1 + 0x8000);
        FID_conflict:_memcpy(local_c, _Src, ((uVar1) & 0xFFFF));
        local_10 = (_Src + ((uVar1) & 0xFFFF));
      }
      local_c = (local_c + ((uVar1) & 0xFFFF));
    }
    w32(param_1, 4, (local_c - s32(param_1, 2)));
    uVar3 = 1;
  }
  return uVar3;
}


 export function FUN_004b263e (param_1)

 {
  let psVar1;
  let uVar2;
  let uVar3;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;

  local_1c = s32(param_1, 2);
  local_20 = s32(param_1, 0);
  local_24 = (local_20 + 1);
  uVar2 = (s32(param_1, 1) - s32(param_1, 0));
  local_c = 0;
  uVar3 = (s32(param_1, 3) - s32(param_1, 2));
  do {
    if ((s32(param_1, 1) <= local_20)) {
      w32(param_1, 4, local_c);
      return 1;
    }
    for (/* cond: (_MEM[local_24] === _MEM[local_20]) */); (local_24 = (local_24 < s32(param_1, 1)) && (local_24 = _MEM[local_24])); local_24 = (local_24 + 1)) {
    }
    local_14 = (local_24 - local_20);
    if ((3 < local_14)) {
      while ((local_14 !== 0)) {
        if ((uVar2 <= (local_c + 2))) {
          return 0;
        }
        if ((local_14 < 0x8000)) {
          w16(local_1c, 0, ((local_14) & 0xFFFF));
          local_14 = 0;
        }
        else {
          w16(local_1c, 0, 0x7fff);
          local_14 = (local_14 - 0x7fff);
        }
        local_1c = (local_1c + 1);
        local_c = (local_c + 3);
        if ((uVar2 <= local_c)) {
          return 0;
        }
        _MEM[local_1c] = _MEM[local_20];
        local_1c = (psVar1 + 3);
      }
      local_20 = local_24;
    }
    for (/* cond: (local_24[1] !== _MEM[local_24]) */); (local_24 = (local_24 < s32(param_1, 1)) && (local_24 = (local_24 + 1))); local_24 = (local_24 + 1)) {
    }
    local_14 = (local_24 - local_20);
    while ((local_14 !== 0)) {
      local_c = (local_c + 2);
      if ((uVar2 <= local_c)) {
        return 0;
      }
      if ((local_14 < 0x8000)) {
        w16(local_1c, 0, (((local_14) & 0xFFFF) + 0x8000));
        local_18 = local_14;
        local_14 = 0;
      }
      else {
        w16(local_1c, 0, 0xffff);
        local_18 = 0x7fff;
        local_14 = (local_14 - 0x7fff);
      }
      local_1c = (local_1c + 1);
      local_c = (local_c + local_18);
      if ((uVar2 <= local_c)) {
        return 0;
      }
      FID_conflict:_memcpy(local_1c, local_20, local_18);
      local_1c = (local_1c + local_18);
      local_20 = (local_20 + local_18);
    }
  } while ( true );
}


 export function FUN_004b3080 (in_ECX, param_1, param_2, param_3)

 {
  // in_ECX promoted to parameter;

  w32(in_ECX, 5, param_1);
  w32(in_ECX, 0, param_2);
  w32(in_ECX, 2, param_3);
  w32(in_ECX, 3, 0);
  w32(in_ECX, 1, s32(in_ECX, 0));
  if (((s32(in_ECX, 0) & 3) !== 0)) {
    w32(in_ECX, 1, ((4 - (s32(in_ECX, 0) & 3)) + s32(in_ECX, 1)));
  }
  return;
}


 export function FUN_004b3110 (param_1, param_2)

 {
  let local_c;
  let local_8;

  FUN_005ae3bf(param_2, DAT_fffffff4, DAT_fffffff8);
  DAT_00666137[(param_1 * 0x10 + local_c)] = (DAT_00666137[(param_1 * 0x10 + local_c)] | UNNAMED)
  ;
  return;
}


 export function FUN_004b315c ()

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let iVar4;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  for (/* cond: (local_18 < 0x40) */); local_18 = (local_18 < 0x40); local_18 = (local_18 + 1)) {
    for (/* cond: (local_8 < 8) */); local_8 = local_8; local_8 = (local_8 + 1)) {
      DAT_00666137[(local_8 + local_18 * 0x10)] = 0;
    }
  }
  for (/* cond: (local_14 < ((DAT_006d1162) << 16 >> 16)) */); local_14 = local_14; local_14 = (local_14 + 1)) {
    for (/* cond: (local_10 < ((DAT_006d1160) << 16 >> 16)) */); local_10 = local_10;
        local_10 = (local_10 + 2)) {
      iVar1 = FUN_005b89e4(local_10, local_14);
      if ((iVar1 === 0)) {
        uVar2 = FUN_005b8a81(local_10, local_14);
        for (/* cond: (local_8 < 8) */); local_8 = local_8; local_8 = (local_8 + 1)) {
          uVar3 = FUN_005ae052((s8(DAT_00628350[local_8]) + local_10));
          iVar1 = (s8(DAT_00628360[local_8]) + local_14);
          iVar4 = FUN_004087c0(uVar3, iVar1);
          if ((iVar4 !== 0)) {
            uVar3 = FUN_005b8a81(uVar3, iVar1);
            FUN_004b3110(uVar2, uVar3);
            local_8 = (local_8 + (2 - (local_8 & 1)));
          }
        }
      }
    }
    FUN_0040894c();
  }
  return;
}


 export function FUN_004b32fe ()

 {
  let piVar1;
  let cVar2;
  let bVar3;
  let uVar4;
  let _Dst;
  let _Dst_00;
  let iVar5;
  let uVar6;
  let uVar7;
  let local_68;
  let local_54;
  let local_50;
  let local_4c;
  let local_44;
  let local_40;
  let local_38;
  let local_34;
  let local_30;
  let local_28;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  local_44 = 0;
  local_4c = 0;
  for (/* cond: (local_50 < 0x40) */); local_50 = (local_50 < 0x40); local_50 = (local_50 + 1)) {
    w16((DAT_00666130 + local_50 * 0x10), 0, 0);
    w16((DAT_00666134 + local_50 * 0x10), 0, 0);
  }
  uVar4 = FUN_004bb870(0x20000);
  _Dst = FUN_0046aad0(uVar4);
  if ((_Dst === 0)) {
    FUN_00589ef8(-9, 8, 0, 1, 0);
  }
  else {
    local_4c = FUN_004bb870((((DAT_006d1164) << 16 >> 16) << 2));
    _Dst_00 = FUN_0046aad0(local_4c);
    if ((_Dst_00 === 0)) {
      FUN_00589ef8(-9, 8, 0, 2, 0);
    }
    else {
      FUN_00408830((DAT_00636598 + 3), 0);
      for (/* cond: (-1 < local_18) */); -1 = (-1 < local_18); local_18 = (local_18 + -1)) {
        _memset(_Dst, 0, 0x20000);
        _memset(_Dst_00, 0, (((DAT_006d1164) << 16 >> 16) << 2));
        local_14 = 0;
        local_54 = 0;
        bVar3 = 0;
        for (/* cond: (local_40 < ((DAT_006d1162) << 16 >> 16)) */); local_40 = local_40; local_40 = (local_40 + 1)) {
          if (((DAT_00655ae8 & 0x8000) !== 0)) {
            bVar3 = 0;
            local_54 = 0;
          }
          for (/* cond: (local_34 < ((DAT_006d1160) << 16 >> 16)) */); local_34 = local_34;
              local_34 = (local_34 + 2)) {
            iVar5 = FUN_005b89e4(local_34, local_40);
            if ((iVar5 === local_18)) {
              if ((local_40 !== 0)) {
                for (/* cond: (local_10 < 3) */); local_10 = (local_10 < 3); local_10 = (local_10 + 1)) {
                  uVar6 = ((local_10 - 2) & 7);
                  uVar7 = FUN_005ae052((s8(DAT_00628350[uVar6]) + local_34));
                  cVar2 = DAT_00628360[uVar6];
                  iVar5 = FUN_004087c0(uVar7, (s8(cVar2) + local_40));
                  if ((uVar6 !== 0)) {
                    local_8 = uVar6;
                    if ((uVar6 !== local_54)) {
                      if ((local_54 <= uVar6)) {
                        local_8 = local_54;
                      }
                      if ((uVar6 <= local_54)) {
                        uVar6 = local_54;
                      }
                      piVar1 = (_Dst + local_8 * 4);
                      w32(piVar1, 0, (s32(piVar1, 0) + s32((_Dst + uVar6 * 4), 0)));
                      w32((_Dst + uVar6 * 4), 0, 0);
                      local_28 = _Dst_00;
                      for (/* cond: (local_1c <= local_40) */); local_1c = local_1c; local_1c = (local_1c + 1)) {
                        for (/* cond: (local_68 < ((DAT_006d1160) << 16 >> 16)) */);
                            local_68 = local_68; local_68 = (local_68 + 2)) {
                          if ((((s16(local_28, 0)) & 0xFFFF) === (uVar6 & 0xffff))) {
                            w16(local_28, 0, ((local_8) & 0xFFFF));
                          }
                          local_28 = (local_28 + 1);
                        }
                      }
                    }
                    local_54 = local_8;
                  }
                }
              }
              if ((local_54 === 0)) {
                if ((!bVar3)) {
                  local_14 = 0;
                  do {
                    local_14 = (local_14 + 1);
                    if ((0x7ffe < local_14));
                }
                local_54 = local_14;
              }
              w16((((((DAT_006d1160) << 16 >> 16) & -2) * local_40 + (local_34 & -2)) + _Dst_00), 0, ((local_54) & 0xFFFF));
              piVar1 = (_Dst + local_54 * 4);
              w32(piVar1, 0, (s32(piVar1, 0) + 1));
              bVar3 = 1;
            }
            else {
              bVar3 = 0;
              local_54 = 0;
            }
          }
          FUN_0040894c();
        }
        if ((local_18 !== 0)) {
          local_30 = 0;
          for (/* cond: (local_50 < 0x3f) */); local_50 = (local_50 < 0x3f); local_50 = (local_50 + 1)) {
            if ((s32((_Dst + local_50 * 4), 0) < 9)) {
              w32((_Dst + 0xfc), 0, (s32((_Dst + 0xfc), 0) + s32((_Dst + local_50 * 4), 0)));
              w32((_Dst + local_50 * 4), 0, -1);
              local_30 = (local_30 + 1);
            }
          }
          if ((local_30 !== 0)) {
            local_28 = _Dst_00;
            for (/* cond: (local_10 < ((DAT_006d1164) << 16 >> 16)) */); local_10 = (local_10 < ((DAT_006d1164) << 16 >> 16)); local_10 = (local_10 + 1)) {
              if ((s32((_Dst + ((s16(local_28, 0)) & 0xFFFF) * 4), 0) < 0)) {
                w16(local_28, 0, 0x3f);
              }
              local_28 = (local_28 + 1);
            }
            for (/* cond: (local_50 < 0x3f) */); local_50 = (local_50 < 0x3f); local_50 = (local_50 + 1)) {
              if ((s32((_Dst + local_50 * 4), 0) < 0)) {
                w32((_Dst + local_50 * 4), 0, 0);
              }
            }
          }
        }
        local_38 = (DAT_00636598 + 3);
        local_28 = _Dst_00;
        for (/* cond: (local_10 < ((DAT_006d1164) << 16 >> 16)) */); local_10 = (local_10 < ((DAT_006d1164) << 16 >> 16)); local_10 = (local_10 + 1)) {
          if ((s16(local_28, 0) !== 0)) {
            if ((0x3f < s16(local_28, 0))) {
              if ((s32((_Dst + ((s16(local_28, 0)) & 0xFFFF) * 4), 0) < 1)) {
                if ((s32((_Dst + ((s16(local_28, 0)) & 0xFFFF) * 4), 0) < 1)) {
                  w16(local_28, 0, ((~((s32((_Dst + ((s16(local_28, 0)) & 0xFFFF) * 4), 0)) & 0xFFFF)) + 1));
                }
                else {
                  w16(local_28, 0, ((s32((_Dst + ((s16(local_28, 0)) & 0xFFFF) * 4), 0)) & 0xFFFF));
                }
              }
              else {
                local_14 = 0;
                do {
                  local_14 = (local_14 + 1);
                } while ((s32((_Dst + local_14 * 4), 0) !== 0));
                if ((0x10 < s32((_Dst + ((s16(local_28, 0)) & 0xFFFF) * 4), 0))) {
                  w32((_Dst + local_14 * 4), 0, s32((_Dst + ((s16(local_28, 0)) & 0xFFFF) * 4), 0));
                  w32((_Dst + ((s16(local_28, 0)) & 0xFFFF) * 4), 0, (-local_14));
                  w16(local_28, 0, ((local_14) & 0xFFFF));
                }
                else {
                  local_44 = (local_44 | (1 << (((local_18) & 0xFF) & 0x1f)));
                  w16(local_28, 0, 0x3f);
                }
              }
            }
            _MEM[local_38] = ((s16(local_28, 0)) & 0xFF);
          }
          local_28 = (local_28 + 1);
          local_38 = (local_38 + 6);
          FUN_0040894c();
        }
        for (/* cond: (local_20 < 0x40) */); local_20 = (local_20 < 0x40); local_20 = (local_20 + 1)) {
          if ((local_18 === 0)) {
            w16((DAT_00666130 + local_20 * 0x10), 0, ((s32((_Dst + local_20 * 4), 0)) & 0xFFFF));
          }
          else {
            w16((DAT_00666134 + local_20 * 0x10), 0, ((s32((_Dst + local_20 * 4), 0)) & 0xFFFF));
          }
        }
      }
      FUN_004b315c();
    }
  }
  FUN_0046ab00(local_4c);
  FUN_0046aaa0(local_4c);
  FUN_0046ab00(uVar4);
  FUN_0046aaa0(uVar4);
  return local_44;
}


 export function FUN_004b3ca0 ()

 {
  FUN_004b3cba();
  FUN_004b3cda();
  return;
}


 export function FUN_004b3cba ()

 {
  FUN_0043c4c0(0, 0x10, 1);
  return;
}


 export function FUN_004b3cda ()

 {
  _atexit(FUN_004b3cf7);
  return;
}


 export function FUN_004b3cf7 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_004b3d2b();
  FUN_004b3d49();
  return;
}


 export function FUN_004b3d2b ()

 {
  FUN_0043c460(0, 0x14);
  return;
}


 export function FUN_004b3d49 ()

 {
  _atexit(FUN_004b3d66);
  return;
}


 export function FUN_004b3d66 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_004b3d9a();
  FUN_004b3db8();
  return;
}


 export function FUN_004b3d9a ()

 {
  FUN_0043c460(0, 0xe);
  return;
}


 export function FUN_004b3db8 ()

 {
  _atexit(FUN_004b3dd5);
  return;
}


 export function FUN_004b3dd5 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_004b3e09();
  FUN_004b3e27();
  return;
}


 export function FUN_004b3e09 ()

 {
  FUN_0043c460(0, 0x10);
  return;
}


 export function FUN_004b3e27 ()

 {
  _atexit(FUN_004b3e44);
  return;
}


 export function FUN_004b3e44 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_004b3e5e ()

 {
  FUN_004b3e78();
  FUN_004b3e98();
  return;
}


 export function FUN_004b3e78 ()

 {
  FUN_0043c4c0(0, 0x18, 1);
  return;
}


 export function FUN_004b3e98 ()

 {
  _atexit(FUN_004b3eb5);
  return;
}


 export function FUN_004b3eb5 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_004b3ee9();
  FUN_004b3f07();
  return;
}


 export function FUN_004b3ee9 ()

 {
  FUN_0043c460(0, 0x1e);
  return;
}


 export function FUN_004b3f07 ()

 {
  _atexit(FUN_004b3f24);
  return;
}


 export function FUN_004b3f24 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_004b3f58();
  FUN_004b3f76();
  return;
}


 export function FUN_004b3f58 ()

 {
  FUN_0043c460(0, 0x15);
  return;
}


 export function FUN_004b3f76 ()

 {
  _atexit(FUN_004b3f93);
  return;
}


 export function FUN_004b3f93 ()

 {
  FUN_0043c520();
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Multiple */  /* Matches */  /* With */  /* Different */  /* Base */
 /* Names */
 /* _$E41 */
 /* _$E46 */
 /* _$E51 */
 /* _$E56 */      /* 6 */  /* names */  /* - */  /* too */  /* many */  /* to */
 /* list */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function FID_conflict:_$E51 ()

 {
  FUN_004b3fc7();
  FUN_004b3fe5();
  return;
}


 export function FUN_004b3fc7 ()

 {
  FUN_0043c460(0, 0x18);
  return;
}


 export function FUN_004b3fe5 ()

 {
  _atexit(FUN_004b4002);
  return;
}


 export function FUN_004b4002 ()

 {
  FUN_0043c520();
  return;
}


 export function FUN_004b401c ()

 {
  FUN_004b4036();
  FUN_004b405b();
  return;
}


 export function FUN_004b4036 ()

 {
  FUN_004b4108(DAT_006665da);
  return;
}


 export function FUN_004b405b ()

 {
  _atexit(FUN_004b4078);
  return;
}


 export function FUN_004b4078 ()

 {
  FUN_004b4593();
  return;
}


 export function FUN_004b4092 ()

 {
  FUN_004b40ac();
  FUN_004b40d1();
  return;
}


 export function FUN_004b40ac ()

 {
  FUN_004b4108(DAT_006665ea);
  return;
}


 export function FUN_004b40d1 ()

 {
  _atexit(FUN_004b40ee);
  return;
}


 export function FUN_004b40ee ()

 {
  FUN_004b4593();
  return;
}


 export function FUN_004b4108 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_18;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004b4578;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0044c5a0();
  local_8 = 0;
  w32(in_ECX, 0, PTR_FUN_0061d6c4);
  w32(in_ECX, 0x54, param_1);
  w32(in_ECX, 0x45, 1);
  FUN_004a733d();
  iVar1 = FUN_00407f90(s32(in_ECX, 0x54));
  if ((iVar1 < 1)) {
    w32(in_ECX, 0x47, 0);
    w32(in_ECX, 0x48, 0);
  }
  else {
    w32(in_ECX, 0x47, s32(s32(in_ECX, 0x54), 0));
    w32(in_ECX, 0x48, s32((s32(in_ECX, 0x54) + 4), 0));
    if ((iVar1 < 0x321)) {
      w32(in_ECX, 0x55, 0);
    }
    else {
      w32(in_ECX, 0x55, 1);
    }
  }
  w32(in_ECX, 0xa4, 0);
  w32(in_ECX, 0xa8, 0);
  w32(in_ECX, 0xa9, 0);
  w32(in_ECX, 0xd0, 0);
  w32(in_ECX, 0xd1, 0);
  w32(in_ECX, 0xd2, 0);
  w32(in_ECX, 0xd5, 0);
  w32(in_ECX, 0xd3, 0);
  w32(in_ECX, 0xd4, 0);
  w32(in_ECX, 0xd6, 0);
  w32(in_ECX, 0xd7, 0);
  w32(in_ECX, 0xd8, 0);
  for (/* cond: (local_18 < 8) */); local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
    w32(in_ECX, (local_18 + 0xaa), 0);
    w32(in_ECX, (local_18 + 0xb2), 0);
    w32(in_ECX, (local_18 + 0xc0), 0);
    w32(in_ECX, (local_18 + 0xc8), 0);
  }
  w32(in_ECX, 0xbd, 0);
  w32(in_ECX, 0xbe, 0);
  w32(in_ECX, 0xbf, 0);
  w32(in_ECX, 0xbc, 0);
  w32(in_ECX, 0xba, 0);
  w32(in_ECX, 0xbb, 0);
  w32(in_ECX, 0xa5, 0);
  w32(in_ECX, 0x46, -1);
  w32(in_ECX, 0x8d, 0);
  w32(in_ECX, 0x83, 0);
  w32(in_ECX, 0x84, 1);
  w32(in_ECX, 0x85, 0);
  w32(in_ECX, 0x82, -1);
  w32(in_ECX, 0x88, 0);
  w32(in_ECX, 0x8a, 0);
  w32(in_ECX, 0x89, s32(in_ECX, 0x8a));
  w32(in_ECX, 0x8c, 0);
  w32(in_ECX, 0x8b, s32(in_ECX, 0x8c));
  w32(in_ECX, 0x87, 0);
  w32(in_ECX, 0x86, 0);
  w32(in_ECX, 0x7a, 0);
  w32(in_ECX, 0x79, s32(in_ECX, 0x7a));
  w32(in_ECX, 0x95, 0);
  w32(in_ECX, 0x9c, 0);
  w32(in_ECX, 0xa3, 0);
  w32(in_ECX, 0xa6, 0);
  w32(in_ECX, 0xa7, 0);
  DAT_0062d86c = 0;
  DAT_0062d870 = 0;
  DAT_0069b03c = 0;
  for (/* cond: (local_18 < 2) */); local_18 = (local_18 < 2); local_18 = (local_18 + 1)) {
    w32(in_ECX, (local_18 + 0xd9), 0);
    w32(in_ECX, (local_18 + 0xdb), 0);
    w32(in_ECX, (local_18 + 0xdd), 0);
    w32(in_ECX, (local_18 + 0xdf), 0);
    w32(in_ECX, (local_18 + 0xe1), 0);
    w32(in_ECX, (local_18 + 0xe3), 0);
    w32(in_ECX, (local_18 + 0xe5), 0);
    w32(in_ECX, (local_18 + 0xe7), 0);
    w32(in_ECX, (local_18 + 0xe9), 0);
  }
  _MEM[(in_ECX + 0xef)] = 0;
  _MEM[(in_ECX + 0x3bd)] = 0;
  _MEM[(in_ECX + 0x3be)] = 0;
  _MEM[(in_ECX + 0x3bf)] = 0;
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004b4593 (in_ECX)

 {
  let iVar1;
  let sVar2;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004b471d;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(in_ECX, 0, PTR_FUN_0061d6c4);
  local_8 = 0;
  if ((s32(in_ECX, 0x7b) === 4)) {
    FUN_005d7c00();
    local_8 = ((((local_8) >> 8) << 8) | 1);
    if ((DAT_0062d870 !== 0)) {
      _MEM[DAT_0062d870] = 0;
      iVar1 = Realloc(s_chatlog.txt_0062d874);
      if ((iVar1 !== 0)) {
        sVar2 = _strlen(DAT_0062d870);
        FUN_00421c60(DAT_0062d870, sVar2);
        FUN_00421c30();
      }
    }
    if ((DAT_0062d870 !== 0)) {
      operator_delete(DAT_0062d870);
      DAT_0062d870 = 0;
    }
    if ((DAT_0062d86c !== 0)) {
      operator_delete(DAT_0062d86c);
      DAT_0062d86c = 0;
    }
    local_8 = (local_8 & -0x100);
    FUN_004b4705();
  }
  FUN_004b50cf();
  FUN_004083b0();
  local_8 = -1;
  FUN_004b4711();
  FUN_004b4727();
  return;
}


 export function FUN_004b4705 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_004b4711 ()

 {
  FUN_0044cba0();
  return;
}


 export function FUN_004b4727 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004b4735 (in_ECX, unaff_ESI, param_1)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let puVar4;
  let puVar5;
  let local_b0;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004b4bef;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32((in_ECX + 0x114), 0, 1);
  if ((in_ECX === 0)) {
    local_b0 = 0;
  }
  else {
    local_b0 = (in_ECX + 0x48);
  }
  FUN_005c6303(local_b0);
  w32((in_ECX + 0x1ec), 0, param_1);
  if ((s32((in_ECX + 0x1ec), 0) !== 4));
  if ((FUN_006e7b34(s_Civilization_Gold_0062d898, s_ChatShowSize_0062d888, -1, s_CIV.INI_0062d880) < 0x2000)) {
    FUN_006e7b38(s_Civilization_Gold_0062d8cc, s_ChatShowSize_0062d8bc, DAT_0062d8b4, s_CIV.INI_0062d8ac);
    DAT_0069b03c = 0x2000;
  }
  else if ((0xdfff < FUN_006e7b34(s_Civilization_Gold_0062d898, s_ChatShowSize_0062d888, -1, s_CIV.INI_0062d880))) {
    FUN_006e7b38(s_Civilization_Gold_0062d900, s_ChatShowSize_0062d8f0, s_57344_0062d8e8, s_CIV.INI_0062d8e0);
    DAT_0069b03c = 0xe000;
  }
  if ((DAT_0062d870 === 0)) {
    DAT_0062d870 = operator_new((DAT_0069b03c + 1));
  }
  _memset(DAT_0062d870, 0, (DAT_0069b03c + 1));
  if ((DAT_0062d86c === 0)) {
    DAT_0062d86c = operator_new(0x101);
  }
  _memset(DAT_0062d86c, 0, 0x101);
  FUN_005d7c00();
  local_8 = 0;
  if ((DAT_006665fa === 0)) {
    iVar1 = Realloc(s_chatlog.txt_0062d914);
    if ((iVar1 === 0));
    if ((DAT_0069b03c < iVar1)) {
      Realloc((iVar1 - DAT_0069b03c));
    }
    FUN_004bb370(DAT_0062d870, DAT_0069b03c);
    FUN_00421c30();
  }
  else {
 LAB_004b496e: :
    _MEM[DAT_0062d870] = 0;
  }
  local_8 = -1;
  FUN_004b4be3();
 LAB_004b4982: :
  if ((s32((in_ECX + 0x120), 0) === 0)) {
    FUN_004b4c81();
  }
  FUN_005f22d0((in_ECX + 0x15c), DAT_0062d920);
  if ((s32((in_ECX + 0x1ec), 0) === 4)) {
    puVar5 = DAT_006553d8;
    puVar4 = DAT_006a8c00;
    uVar2 = FUN_00407fc0(s32((in_ECX + 0x150), 0), DAT_006a8c00, DAT_006553d8);
    uVar3 = FUN_00407f90(s32((in_ECX + 0x150), 0), uVar2);
    FUN_005bb4ae(0, 0x602, s32(s32((in_ECX + 0x150), 0), 0), s32((s32((in_ECX + 0x150), 0) + 4), 0), uVar3, uVar2, puVar4, puVar5);
  }
  else {
    puVar5 = DAT_006553d8;
    puVar4 = DAT_006a8c00;
    uVar2 = FUN_00407fc0(s32((in_ECX + 0x150), 0), DAT_006a8c00, DAT_006553d8);
    uVar3 = FUN_00407f90(s32((in_ECX + 0x150), 0), uVar2);
    FUN_005bb4ae(0, 0x602, s32(s32((in_ECX + 0x150), 0), 0), s32((s32((in_ECX + 0x150), 0) + 4), 0), uVar3, uVar2, puVar4, puVar5);
  }
  FUN_004b4cf0();
  FUN_004bb570(s32((in_ECX + 0x150), 0));
  w32((in_ECX + 0x158), 0, -1);
  w32((in_ECX + 0x1f0), 0, DAT_0062d7e8);
  w32((in_ECX + 0x1f4), 0, DAT_0062d7ec);
  w32((in_ECX + 0x1f8), 0, 0x15);
  w32((in_ECX + 0x1fc), 0, 0x15);
  FUN_00408230(thunk_FUN_004b76d5);
  in_ECX = EnableStackedTabs(in_ECX, 0x402680);
  FUN_00408330(LAB_00403d32);
  in_ECX = (in_ECX + 0x58);
  FUN_004b4e8a();
  FUN_004b4fb2();
  if ((s32((in_ECX + 0x1ec), 0) === 1)) {
    FUN_00453c40();
  }
  FUN_0052e971();
  FUN_004b4bf9(unaff_ESI);
  return;
}


 export function FUN_004b4be3 ()

 {
  FUN_005d7c6e();
  return;
}


 export function FUN_004b4bf9 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004b4c09 ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004080f0(s32((local_8 + 0x150), 0));
  w32((local_8 + 0x11c), 0, s32(s32((local_8 + 0x150), 0), 0));
  w32((local_8 + 0x120), 0, s32((s32((local_8 + 0x150), 0) + 4), 0));
  return;
}


 export function FUN_004b4c81 ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  w32((local_8 + 0x154), 0, 0);
  if ((0x3e7 < DAT_006ab198)) {
    w32((local_8 + 0x154), 0, 1);
  }
  FUN_004b4cf0();
  return;
}


 export function FUN_004b4cf0 (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((s32((in_ECX + 0x154), 0) === 0)) {
    local_10 = 0x208;
  }
  else {
    local_10 = 0x320;
  }
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    local_14 = 0x14f;
  }
  else {
    local_14 = 0x1cc;
  }
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    local_18 = FUN_0040ef70();
  }
  else {
    local_18 = FUN_0040ef70();
  }
  w32((in_ECX + 0x12c), 0, ((DAT_0062d85c * 2 + DAT_0062d864 * 2) + local_18));
  local_10 = (local_10 + ((DAT_0062d860 + DAT_0062d858) * 2 + 6));
  local_14 = (local_14 + ((DAT_0062d85c * 2 + s32((in_ECX + 0x12c), 0) * 2) + 0xe));
  iVar1 = FUN_00407f90(s32((in_ECX + 0x150), 0));
  if ((iVar1 === 0)) {
    iVar1 = FUN_004080c0();
    w32((in_ECX + 0x11c), 0, ((iVar1 >> 1) - (local_10 >> 1)));
    local_8 = s32((in_ECX + 0x11c), 0);
    iVar1 = FUN_00414bb0();
    w32((in_ECX + 0x120), 0, ((iVar1 >> 1) - (local_14 >> 1)));
    local_c = s32((in_ECX + 0x120), 0);
  }
  else {
    local_8 = s32((in_ECX + 0x11c), 0);
    local_c = s32((in_ECX + 0x120), 0);
  }
  FUN_006e7d90(s32((in_ECX + 0x150), 0), local_8, local_c, (local_10 + local_8), (local_14 + local_c));
  FUN_00497d00(s32((in_ECX + 0x12c), 0));
  return;
}


 export function FUN_004b4e8a (in_ECX)

 {
  let pCVar1;
  // in_ECX promoted to parameter;
  let local_8;

  pCVar1 = GetActiveView(in_ECX);
  w32((in_ECX + 0x124), 0, pCVar1);
  pCVar1 = GetActiveView(in_ECX);
  w32((in_ECX + 0x128), 0, pCVar1);
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    local_8 = FUN_0040ef70();
  }
  else {
    local_8 = FUN_0040ef70();
  }
  w32((in_ECX + 0x12c), 0, ((DAT_0062d85c * 2 + DAT_0062d864 * 2) + local_8));
  FUN_006e7d90((in_ECX + 0x130), 0, 0, s32((in_ECX + 0x124), 0), s32((in_ECX + 0x128), 0));
  FUN_006e7d90((in_ECX + 0x140), 0, 0, (s32((in_ECX + 0x124), 0) + (DAT_0062d860 + DAT_0062d858) * -2), (s32((in_ECX + 0x128), 0) - ((DAT_0062d85c * 2 + s32((in_ECX + 0x12c), 0) * 2) + DAT_0062d860)));
  FUN_006e7da4((in_ECX + 0x140), (DAT_0062d860 + DAT_0062d858), (s32((in_ECX + 0x12c), 0) + DAT_0062d85c));
  return;
}


 export function FUN_004b4fb2 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x158), 0) === s32((in_ECX + 0x154), 0))) {
    if ((s32((in_ECX + 0x1f8), 0) !== s32((in_ECX + 0x1f0), 0))) {
      FUN_00526ca0(s32((in_ECX + 0x1f0), 0), 0);
      w32((in_ECX + 0x1f8), 0, s32((in_ECX + 0x1f0), 0));
    }
    if ((s32((in_ECX + 0x1fc), 0) !== s32((in_ECX + 0x1f4), 0))) {
      FUN_00526ca0(s32((in_ECX + 0x1f4), 0), 1);
      w32((in_ECX + 0x1fc), 0, s32((in_ECX + 0x1f4), 0));
    }
  }
  else {
    FUN_004b50cf();
    FUN_004b5c93();
    FUN_00526ca0(s32((in_ECX + 0x1f0), 0), 0);
    FUN_00526ca0(s32((in_ECX + 0x1f4), 0), 1);
    w32((in_ECX + 0x1f8), 0, s32((in_ECX + 0x1f0), 0));
    w32((in_ECX + 0x1fc), 0, s32((in_ECX + 0x1f4), 0));
    w32((in_ECX + 0x158), 0, s32((in_ECX + 0x154), 0));
  }
  return;
}


 export function FUN_004b50cf (in_ECX)

 {
  // in_ECX promoted to parameter;
  let local_8;

  if ((s32((in_ECX + 0x234), 0) !== 0)) {
    operator_delete(s32((in_ECX + 0x234), 0));
    w32((in_ECX + 0x234), 0, 0);
  }
  for (/* cond: (local_8 < 3) */); local_8 = (local_8 < 3); local_8 = (local_8 + 1)) {
    if ((s32(((in_ECX + 0x254) + local_8 * 0x1c), 0) !== 0)) {
      if ((s32(((in_ECX + 0x254) + local_8 * 0x1c), 0) !== 0)) {
        FUN_00453aa0(1);
      }
      w32(((in_ECX + 0x254) + local_8 * 0x1c), 0, 0);
    }
  }
  if ((s32((in_ECX + 0x290), 0) !== 0)) {
    if ((s32((in_ECX + 0x290), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x290), 0, 0);
  }
  if ((s32((in_ECX + 0x2a0), 0) !== 0)) {
    if ((s32((in_ECX + 0x2a0), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x2a0), 0, 0);
  }
  if ((s32((in_ECX + 0x2a4), 0) !== 0)) {
    if ((s32((in_ECX + 0x2a4), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x2a4), 0, 0);
  }
  if ((s32((in_ECX + 0x344), 0) !== 0)) {
    if ((s32((in_ECX + 0x344), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x344), 0, 0);
  }
  if ((s32((in_ECX + 0x340), 0) !== 0)) {
    if ((s32((in_ECX + 0x340), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x340), 0, 0);
  }
  if ((s32((in_ECX + 0x348), 0) !== 0)) {
    if ((s32((in_ECX + 0x348), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x348), 0, 0);
  }
  if ((s32((in_ECX + 0x354), 0) !== 0)) {
    if ((s32((in_ECX + 0x354), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x354), 0, 0);
  }
  if ((s32((in_ECX + 0x34c), 0) !== 0)) {
    if ((s32((in_ECX + 0x34c), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x34c), 0, 0);
  }
  if ((s32((in_ECX + 0x350), 0) !== 0)) {
    if ((s32((in_ECX + 0x350), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x350), 0, 0);
  }
  if ((s32((in_ECX + 0x358), 0) !== 0)) {
    if ((s32((in_ECX + 0x358), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x358), 0, 0);
  }
  if ((s32((in_ECX + 0x35c), 0) !== 0)) {
    if ((s32((in_ECX + 0x35c), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x35c), 0, 0);
  }
  if ((s32((in_ECX + 0x360), 0) !== 0)) {
    if ((s32((in_ECX + 0x360), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32((in_ECX + 0x360), 0, 0);
  }
  if ((s32((in_ECX + 0x29c), 0) !== 0)) {
    if ((s32((in_ECX + 0x29c), 0) !== 0)) {
      FUN_004bb400(1);
    }
    w32((in_ECX + 0x29c), 0, 0);
  }
  if ((s32((in_ECX + 0x298), 0) !== 0)) {
    if ((s32((in_ECX + 0x298), 0) !== 0)) {
      FUN_004bb400(1);
    }
    w32((in_ECX + 0x298), 0, 0);
  }
  if ((s32((in_ECX + 0x2e8), 0) !== 0)) {
    if ((s32((in_ECX + 0x2e8), 0) !== 0)) {
      FUN_004bb450(1);
    }
    w32((in_ECX + 0x2e8), 0, 0);
  }
  if ((s32((in_ECX + 0x2ec), 0) !== 0)) {
    if ((s32((in_ECX + 0x2ec), 0) !== 0)) {
      FUN_004bb450(1);
    }
    w32((in_ECX + 0x2ec), 0, 0);
  }
  if ((s32((in_ECX + 0x294), 0) !== 0)) {
    if ((s32((in_ECX + 0x294), 0) !== 0)) {
      FUN_004bb400(1);
    }
    w32((in_ECX + 0x294), 0, 0);
  }
  if ((s32((in_ECX + 0x2f0), 0) !== 0)) {
    if ((s32((in_ECX + 0x2f0), 0) !== 0)) {
      FUN_004bb450(1);
    }
    w32((in_ECX + 0x2f0), 0, 0);
  }
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s32(((in_ECX + 0x2a8) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x2a8) + local_8 * 4), 0) !== 0)) {
        FUN_004bb450(1);
      }
      w32(((in_ECX + 0x2a8) + local_8 * 4), 0, 0);
    }
    if ((s32(((in_ECX + 0x2c8) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x2c8) + local_8 * 4), 0) !== 0)) {
        FUN_004bb450(1);
      }
      w32(((in_ECX + 0x2c8) + local_8 * 4), 0, 0);
    }
  }
  for (/* cond: (local_8 < 2) */); local_8 = (local_8 < 2); local_8 = (local_8 + 1)) {
    if ((s32(((in_ECX + 0x364) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x364) + local_8 * 4), 0) !== 0)) {
        FUN_004bb450(1);
      }
      w32(((in_ECX + 0x364) + local_8 * 4), 0, 0);
    }
    if ((s32(((in_ECX + 0x36c) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x36c) + local_8 * 4), 0) !== 0)) {
        FUN_004bb4a0(1);
      }
      w32(((in_ECX + 0x36c) + local_8 * 4), 0, 0);
    }
    if ((s32(((in_ECX + 0x374) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x374) + local_8 * 4), 0) !== 0)) {
        FUN_004bb400(1);
      }
      w32(((in_ECX + 0x374) + local_8 * 4), 0, 0);
    }
    if ((s32(((in_ECX + 0x37c) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x37c) + local_8 * 4), 0) !== 0)) {
        FUN_004bb4f0(1);
      }
      w32(((in_ECX + 0x37c) + local_8 * 4), 0, 0);
    }
    if ((s32(((in_ECX + 0x384) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x384) + local_8 * 4), 0) !== 0)) {
        FUN_00453aa0(1);
      }
      w32(((in_ECX + 0x384) + local_8 * 4), 0, 0);
    }
    if ((s32(((in_ECX + 0x38c) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x38c) + local_8 * 4), 0) !== 0)) {
        FUN_004bb3b0(1);
      }
      w32(((in_ECX + 0x38c) + local_8 * 4), 0, 0);
    }
    if ((s32(((in_ECX + 0x394) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x394) + local_8 * 4), 0) !== 0)) {
        FUN_004bb3b0(1);
      }
      w32(((in_ECX + 0x394) + local_8 * 4), 0, 0);
    }
    if ((s32(((in_ECX + 0x39c) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x39c) + local_8 * 4), 0) !== 0)) {
        FUN_004bb3b0(1);
      }
      w32(((in_ECX + 0x39c) + local_8 * 4), 0, 0);
    }
    if ((s32(((in_ECX + 0x3a4) + local_8 * 4), 0) !== 0)) {
      if ((s32(((in_ECX + 0x3a4) + local_8 * 4), 0) !== 0)) {
        FUN_004bb3b0(1);
      }
      w32(((in_ECX + 0x3a4) + local_8 * 4), 0, 0);
    }
  }
  return;
}


 export function FUN_004b5c93 (in_ECX)

 {
  let iVar1;
  let iVar2;
  let xLeft;
  let uVar3;
  let iVar4;
  let iVar5;
  let pvVar6;
  let extraout_EAX;
  let extraout_EAX_00;
  let yTop;
  let extraout_EAX_01;
  let extraout_EAX_02;
  let extraout_EAX_03;
  let extraout_EAX_04;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_134;
  let local_130;
  let local_12c;
  let local_128;
  let local_124;
  let local_120;
  let local_11c;
  let local_118;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;
  let local_104;
  let local_fc;
  let local_f8;
  let local_f4;
  let local_f0;
  let local_ec;
  let local_e4;
  let local_e0;
  let local_dc;
  let local_d8;
  let local_d4;
  let local_d0;
  let local_cc;
  let local_c8;
  let local_c0;
  let local_bc;
  let local_b4;
  let local_ac;
  let local_a4;
  let local_9c;
  let local_94;
  let local_8c;
  let local_84;
  let local_7c;
  let local_74;
  let local_6c;
  let local_64;
  let local_60;
  let local_58;
  let local_54;
  let local_4c;
  let local_44;
  let local_40;
  let local_38;
  let local_34;
  let local_2c;
  let local_28;
  let local_18;
  let local_14;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004b74ac;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_34 = DAT_0062d860;
  for (/* cond: (local_2c < 3) */); local_2c = (local_2c < 3); local_2c = (local_2c + 1)) {
    if ((local_2c === 0)) {
      w32((in_ECX + 0x250), 0, DAT_00645120);
    }
    else if ((local_2c === 1)) {
      w32((in_ECX + 0x26c), 0, DAT_00648820);
    }
    else {
      w32(((in_ECX + 0x250) + local_2c * 0x1c), 0, DAT_00647788);
    }
    w32(((in_ECX + 0x23c) + local_2c * 0x1c), 0, (local_2c + 1));
    uVar3 = FUN_004a6980();
    w32(((in_ECX + 0x248) + local_2c * 0x1c), 0, uVar3);
    uVar3 = FUN_004bb540();
    w32(((in_ECX + 0x24c) + local_2c * 0x1c), 0, uVar3);
    w32(((in_ECX + 0x254) + local_2c * 0x1c), 0, 0);
    iVar4 = (s32(((in_ECX + 0x248) + local_2c * 0x1c), 0) * s32((in_ECX + 0x12c), 0) / 0x18 | 0);
    local_18 = (s32(((in_ECX + 0x24c) + local_2c * 0x1c), 0) * s32((in_ECX + 0x12c), 0) / 0x18 | 0);
    iVar5 = ((s32((in_ECX + 0x12c), 0) >> 1) - (local_18 >> 1));
    FUN_006e7d90(DAT_ffffffd8, local_34, iVar5, (iVar4 + local_34), (iVar5 + local_18));
    pvVar6 = operator_new(0x40);
    local_8 = 0;
    if ((pvVar6 === 0)) {
      local_40 = 0;
    }
    else {
      local_40 = FUN_00451930();
    }
    local_8 = -1;
    w32(((in_ECX + 0x254) + local_2c * 0x1c), 0, local_40);
    if ((in_ECX === 0)) {
      local_c0 = 0;
    }
    else {
      local_c0 = (in_ECX + 0x48);
    }
    FUN_004519b0(local_c0, (s32(((in_ECX + 0x23c) + local_2c * 0x1c), 0) + 0x3e8), DAT_ffffffd8);
    FUN_00451a60(LAB_004012da);
    local_34 = (local_34 + (iVar4 + DAT_0062d858));
  }
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    local_44 = DAT_0068abd8;
  }
  else {
    local_44 = DAT_0068abe0;
  }
  FUN_005d8236(local_44);
  pvVar6 = operator_new(0x3c);
  local_8 = 1;
  if ((pvVar6 === 0)) {
    local_4c = 0;
  }
  else {
    local_4c = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x290), 0, local_4c);
  iVar4 = ((DAT_0062d864 + DAT_0062d858) + 2);
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    DAT_0068abd8 = DAT_0068abd8;
    local_c8 = extraout_EAX;
  }
  else {
    DAT_0068abe0 = DAT_0068abe0;
    local_c8 = extraout_EAX_00;
  }
  yTop = (s32((in_ECX + 0x128), 0) - ((DAT_0062d85c + DAT_0062d868) * 2 + local_c8));
  iVar1 = s32((in_ECX + 0x124), 0);
  iVar2 = DAT_0062d858 * 2;
  iVar5 = DAT_0062d864 * 2;
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    DAT_0068abd8 = DAT_0068abd8;
    local_cc = extraout_EAX_01;
  }
  else {
    DAT_0068abe0 = DAT_0068abe0;
    local_cc = extraout_EAX_02;
  }
  local_18 = (DAT_0062d868 * 2 + local_cc);
  FUN_006e7d90(DAT_ffffffd8, iVar4, yTop, ((iVar1 - ((iVar2 + iVar5) + 5)) + iVar4), (yTop + local_18));
  if ((s32((in_ECX + 0x1ec), 0) === 4)) {
    local_d0 = FUN_00428b0c(s32((DAT_00628420 + 0xb2c), 0));
  }
  else {
    local_d0 = FUN_00428b0c(s32((DAT_00628420 + 0xb30), 0));
  }
  if ((in_ECX === 0)) {
    local_d4 = 0;
  }
  else {
    local_d4 = (in_ECX + 0x48);
  }
  FUN_0040f680(local_d4, 0x3ed, DAT_ffffffd8, local_d0);
  FUN_0040f880(thunk_FUN_004b75fb);
  pvVar6 = operator_new(0x48);
  local_8 = 2;
  if ((pvVar6 === 0)) {
    local_54 = 0;
  }
  else {
    local_54 = FUN_004187a0();
  }
  local_8 = -1;
  w32((in_ECX + 0x29c), 0, local_54);
  iVar5 = (s32((in_ECX + 0x140), 0) + DAT_0062d858);
  iVar4 = FUN_00407f90((in_ECX + 0x140));
  iVar4 = (iVar4 + DAT_0062d858 * -2);
  if ((s32((in_ECX + 0x1ec), 0) === 4)) {
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_e0 = FUN_0040ef70();
    }
    else {
      local_e0 = FUN_0040ef70();
    }
    local_38 = (s32((in_ECX + 0x14c), 0) + (DAT_0062d85c + local_e0) * -9);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_e4 = FUN_0040ef70();
    }
    else {
      local_e4 = FUN_0040ef70();
    }
    local_18 = (local_e4 * 9 + DAT_0062d85c * 8);
  }
  else {
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_d8 = FUN_0040ef70();
    }
    else {
      local_d8 = FUN_0040ef70();
    }
    local_38 = (s32((in_ECX + 0x14c), 0) + (DAT_0062d85c + local_d8) * -6);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_dc = FUN_0040ef70();
    }
    else {
      local_dc = FUN_0040ef70();
    }
    local_18 = (DAT_0062d85c * 5 + local_dc * 6);
  }
  FUN_006e7d90(DAT_ffffffd8, iVar5, local_38, (iVar4 + iVar5), (local_38 + local_18));
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    local_58 = DAT_0067a7a0;
  }
  else {
    local_58 = DAT_0067a798;
  }
  FUN_005d268e(local_58);
  if ((in_ECX === 0)) {
    local_ec = 0;
  }
  else {
    local_ec = (in_ECX + 0x48);
  }
  FUN_004bb620(local_ec, 0x3ee, DAT_ffffffd8, DAT_0062d870, 0x122, 0);
  FUN_004189c0(0x2000);
  FUN_00418a00(LAB_00402040);
  FUN_0040f380();
  pvVar6 = operator_new(0x48);
  local_8 = 3;
  if ((pvVar6 === 0)) {
    local_60 = 0;
  }
  else {
    local_60 = FUN_004187a0();
  }
  local_8 = -1;
  w32((in_ECX + 0x298), 0, local_60);
  iVar4 = (iVar4 - (iVar4 / 0xa | 0));
  if ((s32((in_ECX + 0x1ec), 0) === 4)) {
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_f8 = FUN_0040ef70();
    }
    else {
      local_f8 = FUN_0040ef70();
    }
    iVar1 = (DAT_0062d85c * -4 + local_f8 * -3);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_fc = FUN_0040ef70();
    }
    else {
      local_fc = FUN_0040ef70();
    }
    local_18 = (local_fc * 3 + DAT_0062d85c * 3);
  }
  else {
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_f0 = FUN_0040ef70();
    }
    else {
      local_f0 = FUN_0040ef70();
    }
    iVar1 = (DAT_0062d85c * -3 + local_f0 * -2);
    if ((s32((in_ECX + 0x154), 0) === 0)) {
      local_f4 = FUN_0040ef70();
    }
    else {
      local_f4 = FUN_0040ef70();
    }
    local_18 = (DAT_0062d85c * 2 + local_f4 * 2);
  }
  local_38 = (local_38 + iVar1);
  FUN_006e7d90(DAT_ffffffd8, iVar5, local_38, (iVar4 + iVar5), (local_38 + local_18));
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    local_64 = DAT_0067a7a0;
  }
  else {
    local_64 = DAT_0067a798;
  }
  FUN_005d268e(local_64);
  if ((s32((in_ECX + 0x1ec), 0) === 4)) {
    local_14 = 0x200;
  }
  else {
    local_14 = 0x220;
  }
  if ((in_ECX === 0)) {
    local_104 = 0;
  }
  else {
    local_104 = (in_ECX + 0x48);
  }
  FUN_004bb620(local_104, 0x3ef, DAT_ffffffd8, DAT_0062d86c, local_14, 0);
  FUN_004189c0(0x100);
  FUN_00418a00(thunk_FUN_004b968a);
  FUN_004bb5b0();
  FUN_0040f380();
  pvVar6 = operator_new(0x3c);
  local_8 = 4;
  if ((pvVar6 === 0)) {
    local_6c = 0;
  }
  else {
    local_6c = FUN_0040f3e0();
  }
  xLeft = UNNAMED;
  local_8 = -1;
  w32((in_ECX + 0x2a0), 0, local_6c);
  iVar4 = (iVar4 / 9 | 0);
  local_18 = (local_18 / 2 | 0);
  FUN_006e7d90(DAT_ffffffd8, UNNAMED, local_38, (iVar4 + UNNAMED), (local_38 + local_18));
  if ((in_ECX === 0)) {
    local_108 = 0;
  }
  else {
    local_108 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb34), 0));
  FUN_0040f680(local_108, 0x3f0, DAT_ffffffd8, uVar3);
  FUN_0040f880(LAB_0040308a);
  pvVar6 = operator_new(0x3c);
  local_8 = 5;
  if ((pvVar6 === 0)) {
    local_74 = 0;
  }
  else {
    local_74 = FUN_0040f3e0();
  }
  local_8 = -1;
  w32((in_ECX + 0x2a4), 0, local_74);
  local_38 = (local_38 + local_18);
  FUN_006e7d90(DAT_ffffffd8, xLeft, local_38, (iVar4 + xLeft), (local_38 + local_18));
  if ((in_ECX === 0)) {
    local_10c = 0;
  }
  else {
    local_10c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb38), 0));
  FUN_0040f680(local_10c, 0x41e, DAT_ffffffd8, uVar3);
  FUN_0040f880(LAB_00403639);
  local_38 = (local_38 - local_18);
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    DAT_0068abd8 = DAT_0068abd8;
    local_110 = extraout_EAX_03;
  }
  else {
    DAT_0068abe0 = DAT_0068abe0;
    local_110 = extraout_EAX_04;
  }
  local_18 = (DAT_0062d868 * 2 + local_110);
  local_38 = (local_38 - (DAT_0062d85c + local_18));
  w32((in_ECX + 0x1e0), 0, (local_38 - DAT_0062d85c));
  if ((s32((in_ECX + 0x1ec), 0) !== 4)) {
    pvVar6 = operator_new(0x3c);
    local_8 = 6;
    if ((pvVar6 === 0)) {
      local_7c = 0;
    }
    else {
      local_7c = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x340), 0, local_7c);
    iVar4 = (s32((in_ECX + 0x140), 0) + DAT_0062d858);
    iVar5 = FUN_00407f90((in_ECX + 0x140));
    iVar5 = (iVar5 + DAT_0062d858 * -2);
    FUN_006e7d90(DAT_ffffffd8, iVar4, (local_38 - local_18), (iVar5 + iVar4), local_38);
    if ((in_ECX === 0)) {
      local_114 = 0;
    }
    else {
      local_114 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xdb4), 0));
    FUN_0040f680(local_114, 0x431, DAT_ffffffd8, uVar3);
    FUN_0040f880(LAB_0040349a);
    FUN_0043c5f0();
    FUN_00453c40();
    pvVar6 = operator_new(0x3c);
    local_8 = 7;
    if ((pvVar6 === 0)) {
      local_84 = 0;
    }
    else {
      local_84 = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x344), 0, local_84);
    iVar4 = (s32((in_ECX + 0x140), 0) + DAT_0062d858);
    FUN_006e7d90(DAT_ffffffd8, iVar4, (local_38 - local_18), (iVar5 + iVar4), local_38);
    if ((in_ECX === 0)) {
      local_118 = 0;
    }
    else {
      local_118 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xdb8), 0));
    FUN_0040f680(local_118, 0x432, DAT_ffffffd8, uVar3);
    FUN_0040f880(LAB_004016b3);
    FUN_0043c5f0();
    FUN_00453c40();
    pvVar6 = operator_new(0x3c);
    local_8 = 8;
    if ((pvVar6 === 0)) {
      local_8c = 0;
    }
    else {
      local_8c = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x354), 0, local_8c);
    iVar4 = (s32((in_ECX + 0x140), 0) + DAT_0062d858);
    iVar5 = FUN_00407f90((in_ECX + 0x140));
    iVar5 = ((iVar5 + DAT_0062d858 * -2) / 3 | 0);
    FUN_006e7d90(DAT_ffffffd8, iVar4, local_38, (iVar5 + iVar4), (local_38 + local_18));
    if ((in_ECX === 0)) {
      local_11c = 0;
    }
    else {
      local_11c = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x1a0), 0));
    FUN_0040f680(local_11c, 0x428, DAT_ffffffd8, uVar3);
    FUN_0040f880(LAB_0040144c);
    FUN_00453c80();
    pvVar6 = operator_new(0x3c);
    local_8 = 9;
    if ((pvVar6 === 0)) {
      local_94 = 0;
    }
    else {
      local_94 = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x348), 0, local_94);
    FUN_006e7d90(DAT_ffffffd8, UNNAMED, local_38, (iVar5 + UNNAMED), (local_38 + local_18));
    if ((in_ECX === 0)) {
      local_120 = 0;
    }
    else {
      local_120 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb3c), 0));
    FUN_0040f680(local_120, 0x3f1, DAT_ffffffd8, uVar3);
    FUN_0040f880(thunk_FUN_0052dd73);
    FUN_00453c80();
    pvVar6 = operator_new(0x3c);
    local_8 = 0xa;
    if ((pvVar6 === 0)) {
      local_9c = 0;
    }
    else {
      local_9c = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x34c), 0, local_9c);
    if ((in_ECX === 0)) {
      local_124 = 0;
    }
    else {
      local_124 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xd10), 0));
    FUN_0040f680(local_124, 0x427, DAT_ffffffd8, uVar3);
    FUN_0040f880(thunk_FUN_0052dd73);
    FUN_00453c40();
    FUN_0043c5f0();
    pvVar6 = operator_new(0x3c);
    local_8 = 0xb;
    if ((pvVar6 === 0)) {
      local_a4 = 0;
    }
    else {
      local_a4 = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x350), 0, local_a4);
    FUN_006e7d90(DAT_ffffffd8, UNNAMED, local_38, (iVar5 + UNNAMED), (local_38 + local_18));
    if ((in_ECX === 0)) {
      local_128 = 0;
    }
    else {
      local_128 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb40), 0));
    FUN_0040f680(local_128, 0x3f2, DAT_ffffffd8, uVar3);
    FUN_0040f880(LAB_0040339b);
    pvVar6 = operator_new(0x3c);
    local_8 = 0xc;
    if ((pvVar6 === 0)) {
      local_ac = 0;
    }
    else {
      local_ac = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x358), 0, local_ac);
    iVar4 = (s32((in_ECX + 0x140), 0) + DAT_0062d858);
    iVar5 = FUN_00407f90((in_ECX + 0x140));
    iVar5 = ((iVar5 + DAT_0062d858 * -2) / 3 | 0);
    FUN_006e7d90(DAT_ffffffd8, iVar4, local_38, (iVar5 + iVar4), (local_38 + local_18));
    if ((in_ECX === 0)) {
      local_12c = 0;
    }
    else {
      local_12c = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb44), 0));
    FUN_0040f680(local_12c, 0x3f2, DAT_ffffffd8, uVar3);
    FUN_0040f880(LAB_004030a8);
    FUN_0043c5f0();
    pvVar6 = operator_new(0x3c);
    local_8 = 0xd;
    if ((pvVar6 === 0)) {
      local_b4 = 0;
    }
    else {
      local_b4 = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x35c), 0, local_b4);
    FUN_006e7d90(DAT_ffffffd8, UNNAMED, local_38, (iVar5 + UNNAMED), (local_38 + local_18));
    if ((in_ECX === 0)) {
      local_130 = 0;
    }
    else {
      local_130 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb48), 0));
    FUN_0040f680(local_130, 0x3f2, DAT_ffffffd8, uVar3);
    FUN_0040f880(LAB_004019a1);
    FUN_0043c5f0();
    pvVar6 = operator_new(0x3c);
    local_8 = 0xe;
    if ((pvVar6 === 0)) {
      local_bc = 0;
    }
    else {
      local_bc = FUN_0040f3e0();
    }
    local_8 = -1;
    w32((in_ECX + 0x360), 0, local_bc);
    FUN_006e7d90(DAT_ffffffd8, UNNAMED, local_38, (iVar5 + UNNAMED), (local_38 + local_18));
    if ((in_ECX === 0)) {
      local_134 = 0;
    }
    else {
      local_134 = (in_ECX + 0x48);
    }
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb4c), 0));
    FUN_0040f680(local_134, 0x3f2, DAT_ffffffd8, uVar3);
    FUN_0040f880(LAB_0040334b);
    FUN_0043c5f0();
  }
  w32(unaff_FS_OFFSET, 0, local_10);
  return;
}


 export function FUN_004b74c4 (param_1)

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
  if ((param_1 === 0x3e9)) {
    FUN_004b76d5();
  }
  else if ((param_1 === 0x3ea)) {
    if ((0 < s32((local_8 + 0x154), 0))) {
      FUN_004503d0();
      w32((local_8 + 0x154), 0, (s32((local_8 + 0x154), 0) + -1));
      FUN_004b4cf0();
      FUN_004bb570(s32((local_8 + 0x150), 0));
      FUN_004085f0();
    }
  }
  else if ((0x3e7 < DAT_006ab198)) {
    FUN_004503d0();
    w32((local_8 + 0x154), 0, (s32((local_8 + 0x154), 0) + 1));
    FUN_004b4cf0();
    FUN_004bb570(s32((local_8 + 0x150), 0));
    FUN_004085f0();
  }
  return;
}


 export function FUN_004b75fb ()

 {
  FUN_005c62ee();
  FUN_004518d0();
  FUN_004b76d5();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x004b766b)  */ */ export function FUN_004b7645 ()

 {
  FUN_005c6303(DAT_0067a7f0);
  FUN_004b76d5();
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x004b76b3)  */ */ export function FUN_004b768d ()

 {
  FUN_005c6303(DAT_0068ac30);
  FUN_004b76d5();
  return;
}


 export function FUN_004b76d5 ()

 {
  let iVar1;
  let uVar2;
  let local_8;

  iVar1 = FUN_005c62ee();
  if ((iVar1 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (iVar1 + -72);
  }
  if ((DAT_0067a8bc === 0)) {
    if ((DAT_0067a9dc !== 0)) {
      operator_delete(DAT_0067a9dc);
      DAT_0067a9dc = 0;
    }
    if ((DAT_006c91ec !== 0)) {
      if ((DAT_006c91ec === 0)) {
        DAT_006c91e4 = 0;
        uVar2 = FUN_00493c7d(DAT_0067a8c0);
        FUN_0040ff60(0, uVar2);
        DAT_00635a3c = LAB_00403c74;
        FUN_00410030(s_PARLEYCANCEL_0062d924, DAT_0063fc58, 0);
      }
    }
    else {
      FUN_0046b14d(0x81, s32((DAT_006ad30c + s32((DAT_006ad558 + DAT_0067a8c0 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
    }
    DAT_00626a2c = 0;
  }
  w32((local_8 + 0x114), 0, 1);
  w32((local_8 + 0x118), 0, -1);
  FUN_004503d0();
  FUN_00451900();
  FUN_00484d52();
  return 1;
}


 export function FUN_004b7885 ()

 {
  let uVar1;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((s32((local_8 + 0x114), 0) === 0)) {
    FUN_004b4e8a();
    FUN_004b7d72();
    FUN_005a9780(local_8);
    FUN_004b794a();
    FUN_004b4fb2();
    FUN_00408460();
    FUN_004085f0();
    uVar1 = FUN_004bb710();
    FUN_004bb6d0(uVar1);
    uVar1 = FUN_00492ab0();
    FUN_004bb6d0(uVar1);
  }
  return;
}


 export function FUN_004b794a (in_ECX)

 {
  let iVar1;
  let iVar2;
  // in_ECX promoted to parameter;
  let local_3c;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  FUN_005c0034();
  FID_conflict:_memcpy(DAT_ffffffec, (in_ECX + 0x130), 0x10);
  for (/* cond: (local_18 < DAT_0062d864) */); local_18 = (local_18 < DAT_0062d864); local_18 = (local_18 + 1)) {
    FUN_005a99fc(in_ECX, DAT_ffffffec, DAT_00635a08, DAT_00635a0c);
    FUN_004bb800(DAT_ffffffec, 1, 1);
  }
  FUN_004b7c90(DAT_ffffffec, 1);
  FUN_004bb800(DAT_ffffffec, (DAT_0062d860 + DAT_0062d864 * -2), 0);
  local_14 = (UNNAMED + (s32((in_ECX + 0x12c), 0) + DAT_0062d864 * -2));
  iVar1 = FUN_00407fc0((in_ECX + 0x130));
  local_14 = ((iVar1 - s32((in_ECX + 0x12c), 0)) + DAT_0062d864 * -2);
  for (/* cond: (local_18 < DAT_0062d864) */); local_18 = (local_18 < DAT_0062d864); local_18 = (local_18 + 1)) {
    FUN_005a99fc(in_ECX, DAT_ffffffec, DAT_00635a0c, DAT_00635a08);
    FUN_004bb800(DAT_ffffffec, 1, 1);
  }
  FUN_004b7c90(DAT_ffffffec, 2);
  local_20 = DAT_0062d860;
  for (/* cond: (local_18 < 3) */); local_18 = (local_18 < 3); local_18 = (local_18 + 1)) {
    local_28 = (s32(((in_ECX + 0x248) + local_18 * 0x1c), 0) * s32((in_ECX + 0x12c), 0) / 0x18 | 0);
    local_2c = (s32(((in_ECX + 0x24c) + local_18 * 0x1c), 0) * s32((in_ECX + 0x12c), 0) / 0x18 | 0);
    local_24 = ((s32((in_ECX + 0x12c), 0) >> 1) - (local_2c >> 1));
    FUN_006e7d90(DAT_ffffffec, local_20, local_24, (local_28 + local_20), (local_2c + local_24));
    FUN_005cd775(s32((in_ECX + 0x12c), 0), 0x18);
    FUN_005cef31(DAT_ffffffc4, in_ECX, local_20, local_24);
    FUN_0047df50();
    local_20 = (local_20 + (DAT_0062d858 + local_28));
  }
  if ((s32((in_ECX + 0x154), 0) === 0)) {
    local_1c = DAT_0069b020;
  }
  else {
    local_1c = DAT_0069b018;
  }
  local_20 = (local_20 - DAT_0062d858);
  iVar1 = ((s32((in_ECX + 0x138), 0) - local_20) - DAT_0062d860);
  iVar2 = FUN_0040efd0((in_ECX + 0x15c));
  local_20 = (local_20 + ((iVar1 / 2 | 0) - (iVar2 >> 1)));
  local_24 = (DAT_0062d864 + DAT_0062d85c);
  FUN_005c19ad(0xa);
  FUN_005c0f57(local_1c, (in_ECX + 0x15c), (local_20 + 2), (local_24 + 1), 5);
  FUN_005c19ad(0x1a);
  FUN_005c0f57(local_1c, (in_ECX + 0x15c), (local_20 + 1), local_24, 5);
  FUN_005c0f57(local_1c, (in_ECX + 0x15c), local_20, local_24, 5);
  FUN_005c0073((in_ECX + 0x140));
  return;
}


 export function FUN_004b7c90 (in_ECX, param_1, param_2)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((param_2 !== 1)) {
    if ((param_2 !== 2)) {
      FUN_0040fdb0();
    }
    else {
      uVar1 = FUN_00407fc0(param_1, 0, 0);
      uVar1 = FUN_00407f90(param_1, uVar1);
      FUN_005a9b5d(in_ECX, DAT_00635aa4, s32(param_1, 0), s32(param_1, 1), uVar1);
    }
  }
  else {
    uVar1 = FUN_00407fc0(param_1, 0, 0);
    uVar1 = FUN_00407f90(param_1, uVar1);
    FUN_005a9b5d(in_ECX, DAT_00635aa0, s32(param_1, 0), s32(param_1, 1), uVar1);
  }
  return;
}


 export function FUN_004b7d72 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let local_8;

  FUN_0040bbb0();
  if ((s32((in_ECX + 0x1ec), 0) === 4)) {
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xb54), 0));
    FUN_0040bbe0(uVar1);
    FUN_005f22d0((in_ECX + 0x15c), DAT_00679640);
  }
  else {
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xb50), 0));
    FUN_0040bbe0(uVar1);
    FUN_0040fe10();
    uVar1 = FUN_00493c7d(s32((in_ECX + 0x118), 0));
    FUN_0040bbe0(uVar1);
    FUN_0040fe10();
    FUN_0040fea0();
    if ((DAT_0064c6e0[(s32((in_ECX + 0x118), 0) * 0x594 + DAT_006d1da0)] === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = FUN_004679ab(DAT_0064c6e0[(s32((in_ECX + 0x118), 0) * 0x594 + DAT_006d1da0)])
      ;
    }
    FUN_0040ff00(s32((DAT_0064b9c0 + local_8 * 4), 0));
    FUN_0040fed0();
    FUN_005f22d0((in_ECX + 0x15c), DAT_00679640);
  }
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x004b8008)  */ /*  WARNING: */  /* Removing */  /* unreachable */  /* block */
 /* (ram,0x004b8051)  */ /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004b7eb6 (in_ECX, param_1, param_2)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let uVar4;
  // in_ECX promoted to parameter;
  let local_14;
  let local_8;

  if ((param_2 === 4)) {
    bVar2 = 0;
    if ((DAT_00655b07 === 0)) {
      bVar1 = 0;
    }
    else {
      bVar1 = 1;
    }
    for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
      if (((DAT_0064c6c0[(DAT_006d1da0 * 4 + local_14 * 0x594)] & 1) !== 0)) {
        bVar2 = 1;
        break;
      }
    }
    if ((!bVar2)) {
      FUN_00421ea0(s_NOFOREIGNHUMAN_0062d934);
      return;
    }
    FUN_005c6303(DAT_0068ac30);
    DAT_006ad6a0 = 0;
    _DAT_006ad69c = 0;
  }
  else {
    FUN_005c6303(DAT_0067a7f0);
    DAT_0067a9b0 = -1;
    _MEM[(in_ECX + 0x3bc)] = 0;
    _MEM[(in_ECX + 0x3bd)] = 0;
    _MEM[(in_ECX + 0x3be)] = 0;
    _MEM[(in_ECX + 0x3bf)] = 0;
    if ((param_2 === 3)) {
      FUN_004b8676(0);
    }
  }
  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  if ((s32((local_8 + 0x114), 0) === 0)) {
    FUN_004085f0();
  }
  else {
    w32((local_8 + 0x114), 0, 0);
    w32((local_8 + 0x118), 0, param_1);
    if ((param_2 !== 3)) {
      w32((local_8 + 0x1ec), 0, param_2);
      w32((local_8 + 0x1f0), 0, s32(DAT_0062d7d0, param_2 * 2));
      w32((local_8 + 0x1f4), 0, s32(DAT_0062d7d4, param_2 * 2));
    }
    FUN_004b7d72();
    w32((local_8 + 0x1f8), 0, 0x15);
    w32((local_8 + 0x1fc), 0, 0x15);
    FUN_005bb574();
    FUN_004085f0();
    uVar4 = FUN_004bb710();
    FUN_004bb6d0(uVar4);
    uVar4 = FUN_00492ab0();
    FUN_004bb6d0(uVar4);
  }
  FUN_0046e020((((((DAT_006d1168) & 0xFFFF) + param_1) & 7) + 0x53), 1, 0, 0);
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x004b8211)  */ */ export function FUN_004b81dd ()

 {
  let uVar1;

  FUN_0047e94e(1, 0);
  FUN_005c6303(DAT_0067a7f0);
  if ((DAT_0067a994 !== 2)) {
    if ((DAT_0067a994 !== 1)) {
      if ((DAT_0067a994 !== 1)) {
        if ((DAT_0067a994 === 1)) {
          DAT_006c91f4 = 0;
          DAT_0067a994 = 2;
          DAT_0067a998 = DAT_0062d7e0;
          DAT_0067a99c = DAT_0062d7e4;
          DAT_0067a9a0 = DAT_0062d7e0;
          DAT_0067a9a4 = DAT_0062d7e4;
          FUN_00526ca0(DAT_0062d7e0, 0);
          FUN_00526ca0(DAT_0062d7e4, 1);
          uVar1 = FUN_00493c7d(DAT_0067a8c0);
          FUN_0040ff60(0, uVar1);
          DAT_00635a3c = thunk_FUN_004b81dd;
          FUN_00410030(s_PARLEYCOUNTEROFFER_0062d98c, DAT_0063fc58, 0);
        }
      }
      else {
        DAT_006c91f0 = 0;
        DAT_0067a994 = 3;
        DAT_0067a9b0 = -1;
        FUN_004b8676(1);
        uVar1 = FUN_00493c7d(DAT_0067a8c0);
        FUN_0040ff60(0, uVar1);
        DAT_00635a3c = thunk_FUN_004b81dd;
        FUN_00410030(s_PARLEYNOTHANKS_0062d97c, DAT_0063fc58, 0);
      }
    }
    else {
      DAT_006c91ec = 0;
      if ((DAT_0067a9dc !== 0)) {
        w32((DAT_0067a9dc + 4), 0, 0x86);
        if ((DAT_006ad2f7 === 0)) {
          FUN_0046b14d(0x86, 0, 0, 0, 0, 0, 0, 0, 0, DAT_0067a9dc);
        }
        else {
          FUN_004dd285(DAT_0067a9dc);
        }
        operator_delete(DAT_0067a9dc);
        DAT_0067a9dc = 0;
      }
      DAT_0067a994 = 2;
      DAT_0067a998 = DAT_0062d7e0;
      DAT_0067a99c = DAT_0062d7e4;
      DAT_0067a9a0 = DAT_0062d7e0;
      DAT_0067a9a4 = DAT_0062d7e4;
      FUN_00526ca0(DAT_0062d7e0, 0);
      FUN_00526ca0(DAT_0062d7e4, 1);
      DAT_00635a3c = thunk_FUN_004b81dd;
      FUN_00410030(s_PARLEYACCEPT_0062d96c, DAT_0063fc58, 0);
    }
  }
  else {
    DAT_006c91e8 = 0;
    if ((s32((DAT_0067a9dc + 0x28), 0) === 3)) {
      uVar1 = FUN_00493c7d(DAT_0067a8c0);
      FUN_0040ff60(0, uVar1);
      uVar1 = FUN_00493c7d(DAT_006d1da0);
      FUN_0040ff60(1, uVar1);
      if (((DAT_0064c6c0[(DAT_0067a8c0 * 4 + DAT_006d1da0 * 0x594)] & 8) === 0)) {
        if (((DAT_0064c6c0[(DAT_0067a8c0 * 4 + DAT_006d1da0 * 0x594)] & 4) === 0)) {
          if (((DAT_0064c6c0[(DAT_0067a8c0 * 4 + DAT_006d1da0 * 0x594)] & 2) !== 0)) {
            FUN_00467750(DAT_006d1da0, DAT_0067a8c0, 2);
            FUN_00421ea0(s_BREAKCEASE_0062d960);
          }
        }
        else {
          FUN_00467750(DAT_006d1da0, DAT_0067a8c0, 4);
          FUN_00421ea0(s_CANCELPEACE_0062d954);
        }
      }
      else {
        FUN_00467750(DAT_006d1da0, DAT_0067a8c0, 8);
        FUN_00421ea0(s_CANCELALLIED_0062d944);
      }
    }
    else {
      DAT_0067a994 = 0;
      DAT_0067a998 = DAT_0062d7d0;
      DAT_0067a99c = DAT_0062d7d4;
      DAT_0067a9a0 = DAT_0062d7d0;
      DAT_0067a9a4 = DAT_0062d7d4;
      FUN_00526ca0(DAT_0062d7d0, 0);
      FUN_00526ca0(DAT_0062d7d4, 1);
    }
  }
  return;
}


 /* /*  WARNING: */  /* Removing */  /* unreachable */  /* block */

 /* (ram,0x004b869f)  */ */ export function FUN_004b8676 (param_1)

 {
  FUN_005c6303(DAT_0067a7f0);
  if ((DAT_0067a9b0 === -1)) {
    DAT_0067a994 = 3;
    FUN_00453c40();
  }
  else if ((DAT_0067a9b0 === 0)) {
    DAT_0067a994 = 6;
    FUN_00453c80();
  }
  else if ((DAT_0067a9b0 === 1)) {
    DAT_0067a994 = 0xc;
    if ((DAT_0067a9c4 !== 0)) {
      DAT_0067a994 = 0xd;
    }
    FUN_00453c80();
  }
  else if ((DAT_0067a9b0 === 2)) {
    if ((DAT_0067a9c8 === 0)) {
      DAT_0067a994 = 7;
    }
    else if ((DAT_0067a9c8 === 1)) {
      DAT_0067a994 = 8;
    }
    else if ((DAT_0067a9c8 === 2)) {
      DAT_0067a994 = 9;
    }
    else if ((DAT_0067a9c8 === 3)) {
      DAT_0067a994 = 0xa;
    }
    else {
      DAT_0067a994 = 0xb;
    }
    FUN_00453c80();
  }
  else if ((DAT_0067a9b0 === 3)) {
    DAT_0067a994 = 5;
    FUN_00453c80();
  }
  else if ((DAT_0067a9b0 === 4)) {
    DAT_0067a994 = 0xf;
    FUN_00453c80();
  }
  DAT_0067a998 = s32(DAT_0062d7d0, DAT_0067a994 * 2);
  DAT_0067a99c = s32(DAT_0062d7d4, DAT_0067a994 * 2);
  DAT_0067a9a0 = s32(DAT_0062d7d0, DAT_0067a994 * 2);
  DAT_0067a9a4 = s32(DAT_0062d7d4, DAT_0067a994 * 2);
  if ((param_1 !== 0)) {
    FUN_00526ca0(s32(DAT_0062d7d0, DAT_0067a994 * 2), 0);
    FUN_00526ca0(s32(DAT_0062d7d4, DAT_0067a994 * 2), 1);
  }
  return;
}


 export function FUN_004b888e (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_8;

  if ((param_1 !== 1)) {
    FUN_005dae6b(7, s_leftright_==_LEFT_||_leftright_=_0062d9c0, s_D:\Ss\Franklinton\parleywin.cpp_0062d9a0, 0x4ea);
  }
  if ((param_1 === 1)) {
    if ((s32((in_ECX + 0x294), 0) !== 0)) {
      if ((s32((in_ECX + 0x294), 0) !== 0)) {
        FUN_004bb400(1);
      }
      w32((in_ECX + 0x294), 0, 0);
    }
    if ((s32((in_ECX + 0x2e8), 0) !== 0)) {
      if ((s32((in_ECX + 0x2e8), 0) !== 0)) {
        FUN_004bb450(1);
      }
      w32((in_ECX + 0x2e8), 0, 0);
    }
    if ((s32((in_ECX + 0x2ec), 0) !== 0)) {
      if ((s32((in_ECX + 0x2ec), 0) !== 0)) {
        FUN_004bb450(1);
      }
      w32((in_ECX + 0x2ec), 0, 0);
    }
    if ((s32((in_ECX + 0x2f0), 0) !== 0)) {
      if ((s32((in_ECX + 0x2f0), 0) !== 0)) {
        FUN_004bb450(1);
      }
      w32((in_ECX + 0x2f0), 0, 0);
    }
    for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      if ((s32(((in_ECX + 0x2a8) + local_8 * 4), 0) !== 0)) {
        if ((s32(((in_ECX + 0x2a8) + local_8 * 4), 0) !== 0)) {
          FUN_004bb450(1);
        }
        w32(((in_ECX + 0x2a8) + local_8 * 4), 0, 0);
      }
      if ((s32(((in_ECX + 0x2c8) + local_8 * 4), 0) !== 0)) {
        if ((s32(((in_ECX + 0x2c8) + local_8 * 4), 0) !== 0)) {
          FUN_004bb450(1);
        }
        w32(((in_ECX + 0x2c8) + local_8 * 4), 0, 0);
      }
    }
  }
  if ((s32(((in_ECX + 0x364) + param_1 * 4), 0) !== 0)) {
    if ((s32(((in_ECX + 0x364) + param_1 * 4), 0) !== 0)) {
      FUN_004bb450(1);
    }
    w32(((in_ECX + 0x364) + param_1 * 4), 0, 0);
  }
  if ((s32(((in_ECX + 0x36c) + param_1 * 4), 0) !== 0)) {
    if ((s32(((in_ECX + 0x36c) + param_1 * 4), 0) !== 0)) {
      FUN_004bb4a0(1);
    }
    w32(((in_ECX + 0x36c) + param_1 * 4), 0, 0);
  }
  if ((s32(((in_ECX + 0x374) + param_1 * 4), 0) !== 0)) {
    if ((s32(((in_ECX + 0x374) + param_1 * 4), 0) !== 0)) {
      FUN_004bb400(1);
    }
    w32(((in_ECX + 0x374) + param_1 * 4), 0, 0);
  }
  if ((s32(((in_ECX + 0x37c) + param_1 * 4), 0) !== 0)) {
    if ((s32(((in_ECX + 0x37c) + param_1 * 4), 0) !== 0)) {
      FUN_004bb4f0(1);
    }
    w32(((in_ECX + 0x37c) + param_1 * 4), 0, 0);
  }
  if ((s32(((in_ECX + 0x384) + param_1 * 4), 0) !== 0)) {
    if ((s32(((in_ECX + 0x384) + param_1 * 4), 0) !== 0)) {
      FUN_00453aa0(1);
    }
    w32(((in_ECX + 0x384) + param_1 * 4), 0, 0);
  }
  if ((s32(((in_ECX + 0x38c) + param_1 * 4), 0) !== 0)) {
    if ((s32(((in_ECX + 0x38c) + param_1 * 4), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32(((in_ECX + 0x38c) + param_1 * 4), 0, 0);
  }
  if ((s32(((in_ECX + 0x394) + param_1 * 4), 0) !== 0)) {
    if ((s32(((in_ECX + 0x394) + param_1 * 4), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32(((in_ECX + 0x394) + param_1 * 4), 0, 0);
  }
  if ((s32(((in_ECX + 0x39c) + param_1 * 4), 0) !== 0)) {
    if ((s32(((in_ECX + 0x39c) + param_1 * 4), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32(((in_ECX + 0x39c) + param_1 * 4), 0, 0);
  }
  if ((s32(((in_ECX + 0x3a4) + param_1 * 4), 0) !== 0)) {
    if ((s32(((in_ECX + 0x3a4) + param_1 * 4), 0) !== 0)) {
      FUN_004bb3b0(1);
    }
    w32(((in_ECX + 0x3a4) + param_1 * 4), 0, 0);
  }
  w32((in_ECX + 0x3ac), 0, s32((in_ECX + 0x140), 0));
  w32((in_ECX + 0x3b0), 0, s32((in_ECX + 0x144), 0));
  w32((in_ECX + 0x3b4), 0, s32((in_ECX + 0x148), 0));
  w32((in_ECX + 0x3b8), 0, s32((in_ECX + 0x14c), 0));
  w32((in_ECX + 0x3b8), 0, s32((in_ECX + 0x1e0), 0));
  if ((param_1 === 0)) {
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    w32((in_ECX + 0x3b4), 0, (iVar1 / 2 | 0));
  }
  else {
    iVar1 = FUN_00407f90((in_ECX + 0x140));
    w32((in_ECX + 0x3ac), 0, (iVar1 / 2 | 0));
  }
  FUN_004b7c90((in_ECX + 0x3ac), 2);
  return;
}


 export function FUN_004b8e5c (param_1)

 {
  let pcVar1;
  let sVar2;
  let iVar3;
  let sVar4;
  let local_58;
  let local_50;
  let local_30;
  let local_2c;
  let local_28;
  let local_8;

  local_2c = 0;
  _memset(DAT_ffffffd8, 0, 0x20);
  _memset(DAT_ffffffb0, 0, 0x20);
  local_30 = u8((param_1 !== 0x3f8));
  local_8 = FUN_00492ab0();
  FUN_00418a70(DAT_ffffffd8);
  __itoa(s32((DAT_0064c6a2 + DAT_006d1da0 * 0x594), 0), DAT_ffffffb0, 0xa);
  for (/* cond: (local_58 < sVar2) */); sVar2 = _strlen(DAT_ffffffd8), local_58 = (local_58 < sVar2); local_58 = (local_58 + 1)) {
    if ((0x39 < DAT_ffffffd8[local_58])) {
      local_2c = 1;
      FUN_005f22d0((DAT_ffffffd8 + local_58), (DAT_ffffffd8 + (local_58 + 1)));
    }
  }
  iVar3 = _atoi(DAT_ffffffd8);
  if ((DAT_0067a994 !== 0xe)) {
    sVar2 = _strlen(DAT_ffffffb0);
    sVar4 = _strlen(DAT_ffffffd8);
    if ((s32((DAT_0064c6a2 + DAT_006d1da0 * 0x594), 0) < iVar3)) {
      local_2c = 1;
      pcVar1 = (DAT_ffffffd8 + local_8);
      iVar3 = (local_8 - 1);
      local_8 = (local_8 - 1);
      FUN_005f22d0((DAT_ffffffd8 + iVar3), pcVar1);
    }
  }
  iVar3 = _atoi(DAT_ffffffd8);
  if ((iVar3 < 1)) {
    w32((DAT_0067a98c + local_30 * 4), 0, 0);
  }
  else {
    w32((DAT_0067a98c + local_30 * 4), 0, 1);
  }
  FUN_0052e971();
  if ((local_2c !== 0)) {
    sVar2 = _strlen(DAT_ffffffd8);
    if ((sVar2 < local_8)) {
      local_8 = _strlen(DAT_ffffffd8);
    }
    FUN_00418a30(DAT_ffffffd8);
    FUN_004bb6d0(local_8);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004b90ad (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  let sVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  let local_8;

  FUN_00418a70(DAT_0062d870);
  FUN_0040bbb0();
  sVar2 = _strlen(DAT_0062d870);
  if ((sVar2 !== 0)) {
    FUN_005f22e0(DAT_00679640, DAT_0062d9e8);
  }
  if ((param_3 === 0)) {
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb60), 0));
    FUN_005f22e0(DAT_00679640, uVar3);
    FUN_0040fe10();
    FUN_004b9504(param_1);
    FUN_005f22e0(DAT_00679640, DAT_0062d9f4);
    FUN_00421f10(((DAT_00655afa) << 16 >> 16));
    FUN_005f22e0(DAT_00679640, DAT_0062d9f8);
  }
  else {
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb58), 0));
    FUN_005f22e0(DAT_00679640, uVar3);
    FUN_0040fe10();
    FUN_004b9504(param_1);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xb5c), 0));
    FUN_005f22e0(DAT_00679640, uVar3);
    FUN_0040fe10();
    FUN_004b9504(param_2);
    FUN_005f22e0(DAT_00679640, DAT_0062d9ec);
    FUN_00421f10(((DAT_00655afa) << 16 >> 16));
    FUN_005f22e0(DAT_00679640, DAT_0062d9f0);
  }
  FUN_005f22e0(DAT_00679640, param_4);
  if ((DAT_0068aee0 !== 0)) {
    return;
  }
  if ((param_3 === 0)) {
    if ((DAT_0067a8bc === 0)) {
      if ((DAT_0067a8c0 === param_1));
    }
    else {
      iVar1 = s32(((in_ECX + 0x320) + param_1 * 4), 0);
    }
    if ((iVar1 !== 0)) {
      return;
    }
  }
 LAB_004b9295: :
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if (((DAT_0064c6c3[(DAT_006d1da0 * 4 + local_8 * 0x594)] & 1) !== 0)) {
      FUN_0046b14d(0x68, s32((DAT_006ad30c + s32((DAT_006ad558 + local_8 * 4), 0) * 0x54), 0), param_1, param_2, 1, 0, 0, 0, param_4, 0);
    }
  }
  FUN_004b93a2(DAT_00679640);
  if ((DAT_0068acfc !== 0)) {
    DAT_006ad6a0 = (DAT_006ad6a0 + 1);
    _DAT_006ad69c = (None + 1);
  }
  if ((DAT_0068acfc !== 0)) {
    FUN_004b7eb6(0, 4);
  }
  return;
}


 export function FUN_004b93a2 (param_1)

 {
  let iVar1;
  let sVar2;
  let sVar3;
  let uVar4;
  let local_8;

  iVar1 = DAT_0069b03c;
  local_8 = 0;
  sVar2 = _strlen(DAT_0062d870);
  sVar3 = _strlen(param_1);
  if (((iVar1 - (sVar2 + 1)) < (sVar3 + 1))) {
    local_8 = _strlen(param_1);
    do {
      local_8 = (local_8 + 1);
      if ((DAT_0062d870[local_8] === 0xa));
    if ((DAT_0062d870[local_8] !== 0)) {
      for (/* cond: (DAT_0062d870[local_8] === 0xa) */); (DAT_0062d870 = (DAT_0062d870 + local_8) || (DAT_0062d870 = (DAT_0062d870 + local_8)));
          local_8 = (local_8 + 1)) {
      }
    }
  }
  FUN_005f22d0(DAT_0062d870, (DAT_0062d870 + local_8));
  FUN_005f22e0(DAT_0062d870, param_1);
  FUN_00418a30(DAT_0062d870);
  FUN_00418a30(DAT_0062d870);
  uVar4 = FUN_004bb710();
  FUN_004bb6d0(uVar4);
  uVar4 = FUN_004bb710();
  FUN_004bb6d0(uVar4);
  return;
}


 export function FUN_004b9504 (param_1)

 {
  let uVar1;

  if ((param_1 === 0)) {
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0xb64), 0));
    FUN_005f22e0(DAT_00679640, uVar1);
  }
  else {
    uVar1 = FUN_00493ba6(param_1);
    FUN_005f22e0(DAT_00679640, uVar1);
    FUN_0040fe10();
    uVar1 = FUN_00493b10(param_1);
    FUN_005f22e0(DAT_00679640, uVar1);
  }
  return;
}


 export function FUN_004b957e (param_1)

 {
  if ((param_1 === 0xd2)) {
    FUN_004b75fb(0);
  }
  return;
}


 export function FUN_004b95c2 ()

 {
  FUN_004b968a(0, 0xd0);
  return;
}


 export function FUN_004b95e1 ()

 {
  _memset(DAT_0062d870, 0, (DAT_0069b03c + 1));
  FUN_00418a30(DAT_0062d870);
  FUN_00418a30(DAT_0062d870);
  FUN_004bb5e0();
  return;
}


 export function FUN_004b9635 (param_1, param_2)

 {
  let uVar1;

  if ((param_2 === 0xd2)) {
    FUN_004b75fb(0);
    uVar1 = 0;
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}


 export function FUN_004b968a (param_1, param_2)

 {
  let sVar1;
  let uVar2;
  let local_1c;
  let local_18;
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
  if ((param_2 < 0x2b5)) {
    if ((0x2af < param_2)) {
      FUN_004923f0(s32((local_8 + 0x298), 0), param_2);
      return 0;
    }
    if ((param_2 === 0xd0)) {
      FUN_00418a70(DAT_0062d86c);
      sVar1 = _strlen(DAT_0062d86c);
      if ((sVar1 === 0)) {
        return 0;
      }
      FUN_00418a70(DAT_0062d870);
      FUN_0040bbb0();
      sVar1 = _strlen(DAT_0062d870);
      if ((sVar1 !== 0)) {
        FUN_005f22e0(DAT_00679640, DAT_0062d9fc);
      }
      uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0xb68), 0));
      FUN_005f22e0(DAT_00679640, uVar2);
      FUN_0040fe10();
      if ((s32((local_8 + 0x1ec), 0) === 4)) {
        local_10 = 0;
        for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
          if ((s32((DAT_0068aee8 + local_c * 4), 0) !== 0)) {
            if ((local_10 !== 0)) {
              FUN_005f22e0(DAT_00679640, DAT_0062da00);
            }
            FUN_004b9504(local_c);
            local_10 = (local_10 + 1);
          }
        }
      }
      else {
        FUN_004b9504(s32((local_8 + 0x118), 0));
        local_10 = 1;
      }
      if ((local_10 === 0)) {
        return 0;
      }
      FUN_005f22e0(DAT_00679640, DAT_0062da04);
      FUN_00421f10(((DAT_00655afa) << 16 >> 16));
      FUN_005f22e0(DAT_00679640, DAT_0062da08);
      FUN_005f22e0(DAT_00679640, DAT_0062d86c);
      FUN_004b93a2(DAT_00679640);
      if ((s32((local_8 + 0x1ec), 0) === 4)) {
        for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
          if ((s32((DAT_0068aee8 + local_c * 4), 0) !== 0)) {
            if ((DAT_0068aedc === 0)) {
              local_18 = DAT_006d1da0;
            }
            else {
              local_18 = 0;
            }
            FUN_0046b14d(0x68, s32((DAT_006ad30c + s32((DAT_006ad558 + local_c * 4), 0) * 0x54), 0), local_18, local_c, 0, 0, 0, 0, DAT_0062d86c, 0);
            for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
              if (((DAT_0064c6c3[(DAT_006d1da0 * 4 + local_10 * 0x594)] & 1) !== 0)) {
                if ((DAT_0068aedc === 0)) {
                  local_1c = DAT_006d1da0;
                }
                else {
                  local_1c = 0;
                }
                FUN_0046b14d(0x68, s32((DAT_006ad30c + s32((DAT_006ad558 + local_10 * 4), 0) * 0x54), 0), local_1c, local_c, 1, 0, 0, 0, DAT_0062d86c, 0);
              }
            }
          }
        }
      }
      else {
        FUN_0046b14d(0x68, s32((DAT_006ad30c + s32((DAT_006ad558 + s32((local_8 + 0x118), 0) * 4), 0) * 0x54), 0), DAT_006d1da0, s32((local_8 + 0x118), 0), 0, 0, 0, 0, DAT_0062d86c, 0);
        for (/* cond: (local_10 < 8) */); local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
          if (((DAT_0064c6c3[(DAT_006d1da0 * 4 + local_10 * 0x594)] & 1) !== 0)) {
            FUN_0046b14d(0x68, s32((DAT_006ad30c + s32((DAT_006ad558 + local_10 * 4), 0) * 0x54), 0), DAT_006d1da0, s32((local_8 + 0x118), 0), 1, 0, 0, 0, DAT_0062d86c, 0);
          }
        }
      }
      _MEM[DAT_0062d86c] = 0;
      FUN_00418a30(DAT_0062d86c);
      FUN_004bb5e0();
      return 0;
    }
    if ((param_2 === 0xd2)) {
      FUN_004b75fb(0);
      return 0;
    }
  }
  return 1;
}


 export function FUN_004bb370 ()

 {
  FUN_005d84f6();
  return;
}


 export function FUN_004bb3b0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0040f570();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_004bb400 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_00418870();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_004bb450 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0040f930();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_004bb4a0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_004bb740();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_004bb4f0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_0040fbb0();
  if (((param_1 & 1) !== 0)) {
    operator_delete(in_ECX);
  }
  return in_ECX;
}


 export function FUN_004bb540 ()

 {
  FUN_00407fc0();
  return;
}


 export function FUN_004bb570 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bc713(s32((in_ECX + 8), 0), param_1);
  return;
}


 export function FUN_004bb5b0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  _MEM[(in_ECX + 0x24)] = 1;
  return;
}


 export function FUN_004bb5e0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005c90b0(s32((in_ECX + 0x1c), 0));
  }
  return;
}


 export function FUN_004bb620 (in_ECX, param_1, param_2, param_3, param_4, param_5, param_6)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  w32((in_ECX + 0x40), 0, PTR_DAT_00637e6c);
  FUN_0040f730(param_1, 4, param_2, param_3);
  uVar1 = FUN_005d2740(param_3, in_ECX, param_5, param_6, s32((in_ECX + 0x40), 0));
  w32((in_ECX + 0x1c), 0, uVar1);
  FUN_005d2d7f(s32((in_ECX + 0x1c), 0), param_4);
  return;
}


 export function FUN_004bb6d0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d2f0d(s32((in_ECX + 0x1c), 0), param_1);
  return;
}


 export function FUN_004bb710 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005d2f7e(s32((in_ECX + 0x1c), 0));
  return;
}


 export function FUN_004bb740 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004bb7b9;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x44), 0) !== 0)) {
    FUN_005dce29(s32((in_ECX + 0x44), 0));
    FUN_005d99f4(s32((in_ECX + 0x38), 0), s32((in_ECX + 0x44), 0));
  }
  local_8 = -1;
  FUN_004bb7b0();
  FUN_004bb7c3();
  return;
}


 export function FUN_004bb7b0 ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_004bb7c3 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004bb800 (param_1, param_2, param_3)

 {
  FUN_004bb840(param_1, (-param_2), (-param_3));
  return;
}


 export function FUN_004bb840 (param_1, param_2, param_3)

 {
  FUN_006e7d60(param_1, param_2, param_3);
  return;
}


 export function FUN_004bb870 (param_1)

 {
  let iVar1;

  DAT_00634818 = param_1;
  iVar1 = FUN_005dce4f(param_1);
  DAT_00634814 = u8((iVar1 === 0));
  return iVar1;
}


 export function FUN_004bb8e0 (param_1)

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004bb987;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005f35f0();
  FUN_005d6a2c();
  FUN_004bb99f();
  local_8 = 0;
  DAT_0062804c = 0;
  FUN_0046e6a9();
  FUN_004bbb3f(param_1);
  FUN_004bbdfb();
  FUN_005d6a2c();
  FUN_0046e6c8();
  if ((DAT_00628064 !== 0)) {
    FUN_0059a2e6((param_1 + 0x27));
  }
  local_8 = -1;
  FUN_004bb97b();
  FUN_004bb991();
  return;
}


 export function FUN_004bb97b ()

 {
  FUN_004bba79();
  return;
}


 export function FUN_004bb991 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004bb99f (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004bba60;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0055339f();
  local_8 = 0;
  FUN_005dd010();
  local_8 = 1;
  FUN_005bd630();
  local_8 = ((((local_8) >> 8) << 8) | 2);
  FUN_005c64da();
  w32(in_ECX, 0, PTR_FUN_0061d6c8);
  DAT_006a1864 = in_ECX;
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004bba79 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004bbb27;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  w32(in_ECX, 0, PTR_FUN_0061d6c8);
  local_8 = 0;
  DAT_006a1864 = 0;
  local_8 = 2;
  FUN_004bbaf1();
  local_8 = 1;
  FUN_004bbb00();
  local_8 = (0 << 8);
  FUN_004bbb0f();
  local_8 = -1;
  FUN_004bbb1e();
  FUN_004bbb31();
  return;
}


 export function FUN_004bbaf1 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_004bbb00 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004bbb0f ()

 {
  FUN_005dd1a0();
  return;
}


 export function FUN_004bbb1e (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_004bbb31 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004bbb3f (in_ECX, unaff_ESI, param_1)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  // in_ECX promoted to parameter;
  // unaff_ESI promoted to parameter;
  let unaff_FS_OFFSET;
  let uVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let local_134;
  let local_120;
  let local_d8;
  let local_d4;
  let local_d0;
  let local_94;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004bbde1;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_14 = 0x140;
  local_d8 = 0xf0;
  local_d0 = DAT_ffffff30;
  local_8 = 0;
  FUN_005bd630();
  local_8 = 1;
  local_d4 = FUN_006e7b0c(0x100000);
  FUN_004aef20(DAT_ffffff6c);
  FUN_0043c840(DAT_ffffff6c, s_civ2\wonder.dll_0062da84);
  iVar1 = FUN_00564713(DAT_ffffff6c);
  if ((iVar1 === 0)) {
    FUN_005bd65c(0x40, 0x20);
    FUN_005c041f(0x21);
  }
  else {
    FUN_0043c3f0(DAT_ffffff6c);
    local_8 = ((((local_8) >> 8) << 8) | 2);
    iVar1 = FUN_005bf5e1((param_1 + 0x4e20), 0xa, 0xec, (in_ECX + 0xd4c));
    if ((iVar1 === 0)) {
      FUN_006e7dd4(0, s_Failed_to_load_civ2art.gif_0062da9c, s_NOTICE_0062da94, 0x40);
    }
    else {
      FUN_005cedad(DAT_fffffee0, 2, 1, 1, 0x40, 0x20);
      FUN_005bd65c(0x40, 0x20);
      FUN_005cef31(DAT_fffffecc, (in_ECX + 0xd04), 0, 0);
      FUN_005cdf50();
      FUN_004083f0();
    }
    FUN_00450340();
    local_8 = 1;
    FUN_004bbdbd();
  }
  w32((in_ECX + 0xd00), 0, param_1);
  uVar9 = 0;
  uVar8 = 0;
  uVar7 = 0;
  uVar6 = 0;
  uVar5 = 0;
  uVar4 = 0xc;
  uVar3 = local_14;
  uVar10 = local_d8;
  uVar2 = FUN_00428b0c(s32(DAT_0064c5c0, s32((in_ECX + 0xd00), 0) * 2), 0xc, 0, 0, local_14, local_d8, 0, 0, 0);
  FUN_005534bc(uVar2, uVar4, uVar5, uVar6, uVar3, uVar10, uVar7, uVar8, uVar9);
  FUN_00450390((in_ECX + 0xd4c));
  uVar10 = 0;
  uVar3 = FUN_00497c90(0);
  FUN_005c0333(uVar3, uVar10);
  FUN_004bc0d3();
  FUN_005bb574();
  FUN_00450400();
  FUN_00408130(LAB_004025bd);
  local_8 = (UNNAMED << 8);
  FUN_004bbdc9();
  local_8 = -1;
  FUN_004bbdd5();
  FUN_004bbdeb(unaff_ESI);
  return;
}


 export function FUN_004bbdbd (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -0x120);
  return;
}


 export function FUN_004bbdc9 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_004bbdd5 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004bbdeb (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004bbdfb (in_ECX)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_88;
  let local_8;

  FUN_004bc10f();
  if (((DAT_00655af0 & 0x80) === 0)) {
    FUN_004aef20(DAT_ffffff78);
    FUN_0043c840(DAT_ffffff78, s_civ2\video\wonder_0062dab8);
    if ((s32((in_ECX + 0xd00), 0) < 0xa)) {
      FUN_004af1d5(DAT_ffffff78, 0);
    }
    FUN_004af1d5(DAT_ffffff78, s32((in_ECX + 0xd00), 0));
    FUN_004af174(DAT_ffffff78, DAT_0062dacc);
    iVar1 = FUN_00564713(DAT_ffffff78);
    if ((iVar1 !== 0)) {
      FUN_00408130(LAB_004025bd);
      in_ECX = (in_ECX + 0x58);
      FUN_005dd2e3(DAT_0062dad4, 0x200, s32((in_ECX + 0x11c), 0), s32((in_ECX + 0x118), 0), in_ECX);
      local_8 = FUN_005dd377(DAT_ffffff78);
      if ((local_8 === 0)) {
        in_ECX = (in_ECX + 0x2d8);
        FUN_00408130(LAB_004025bd);
        FUN_005dd561((in_ECX + 0xd4c));
        FUN_00450390((in_ECX + 0xd4c));
        FUN_0046efd6();
        FUN_00450390((in_ECX + 0xd4c));
        FUN_004085f0();
        FUN_004085f0();
        FUN_00419b80();
        FUN_005dd3c2();
        if ((2 < DAT_00655b02)) {
          in_ECX = (in_ECX + 0x48);
        }
        FUN_005c61b0();
        in_ECX = (in_ECX + 0x48);
        FUN_005d6a2c();
        FUN_004503d0();
        FUN_00419b80();
        FUN_00450390(DAT_006a8c00);
        FUN_004503d0();
        FUN_00419b80();
        FUN_0046f06f();
      }
      else if ((local_8 === -0x7ffbfeac)) {
        FUN_00421ea0(s_VFWNOTREGISTERED_0062dad8);
      }
    }
  }
  return;
}


 export function FUN_004bc0bb ()

 {
  return 0;
}


 export function FUN_004bc0d3 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005520fa((in_ECX + 0xd04));
  FUN_00552112();
  FUN_005520fa(DAT_00647f18);
  return;
}


 export function FUN_004bc10f (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let uVar2;

  FUN_005bb6c7((s32((in_ECX + 0x11c), 0) * 2 + 0x140), ((s32((in_ECX + 0x118), 0) + s32((in_ECX + 0x11c), 0)) + 0xf0));
  FUN_00552ed2();
  uVar2 = 0;
  uVar1 = FUN_00497c90(0);
  FUN_005c0333(uVar1, uVar2);
  FUN_005bb574();
  FUN_00450400();
  FUN_00419b80();
  return;
}


 export function FUN_004bc193 ()

 {
  DAT_006a1864 = (DAT_006a1864 + 0x48);
  return;
}


 export function FUN_004bc1b1 ()

 {
  DAT_006a1864 = (DAT_006a1864 + 0x48);
  return;
}


 export function FUN_004bc1cf (param_1)

 {
  if ((param_1 < 0xd3)) {
    DAT_006a1864 = (DAT_006a1864 + 0x48);
  }
  return;
}


 export function FUN_004bc480 (param_1)

 {
  let iVar1;
  let uVar2;
  let local_70;
  let local_6c;
  let aiStack_68;
  let local_48;
  let local_44;
  let local_40;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let aiStack_24;

  local_70 = 0;
  local_48 = 0;
  local_44 = -1;
  for (/* cond: (local_40 < ((DAT_00655b18) << 16 >> 16)) */); local_40 = (local_40 < ((DAT_00655b18) << 16 >> 16)); local_40 = (local_40 + 1)) {
    if ((s8(DAT_0064f348[local_40 * 0x58]) === param_1)) {
      iVar1 = FUN_0043d20a(local_40, 2);
      if ((iVar1 !== 0)) {
        local_70 = (local_70 + 1);
      }
      iVar1 = FUN_0043d20a(local_40, 1);
      if ((iVar1 !== 0)) {
        local_44 = local_40;
      }
      local_48 = (local_48 + 1);
    }
  }
  if ((local_48 < 2)) {
    local_48 = 1;
  }
  local_34 = 0;
  for (/* cond: (local_6c < ((DAT_00655b16) << 16 >> 16)) */); local_6c = (local_6c < ((DAT_00655b16) << 16 >> 16)); local_6c = (local_6c + 1)) {
    if ((s8(DAT_006560f7[local_6c * 0x20]) === param_1)) {
      local_34 = (local_34 + 1);
    }
  }
  if (((((local_48 + -1) + local_34) / local_48 | 0) < (u8((DAT_0064c6b5[param_1 * 0x594] < 5)) + 2))) {
    uVar2 = 1;
  }
  else {
    for (/* cond: (local_2c < 8) */); local_2c = (local_2c < 8); local_2c = (local_2c + 1)) {
      w32(DAT_ffffff98, local_2c, 0);
      w32(DAT_ffffffdc, local_2c, s32(DAT_ffffff98, local_2c));
    }
    for (/* cond: (local_2c < 8) */); local_2c = (local_2c < 8); local_2c = (local_2c + 1)) {
      iVar1 = FUN_004bd9f0(local_2c, 0x4b);
      if ((iVar1 !== 0)) {
        w32(DAT_ffffff98, local_2c, (s32(DAT_ffffff98, local_2c) + 1));
      }
      iVar1 = FUN_004bd9f0(local_2c, 0x3b);
      if ((iVar1 !== 0)) {
        w32(DAT_ffffff98, local_2c, (s32(DAT_ffffff98, local_2c) + 1));
      }
      for (/* cond: (local_38 < 0x3e) */); local_38 = (local_38 < 0x3e); local_38 = (local_38 + 1)) {
        iVar1 = FUN_004bd9f0(local_2c, s8(DAT_0064b1cb[local_38 * 0x14]));
        if ((iVar1 !== 0)) {
          if ((DAT_0064b1c1[local_38 * 0x14] === 2)) {
            w32(DAT_ffffff98, local_2c, (s32(DAT_ffffff98, local_2c) + 1));
          }
          else if ((DAT_0064b1ca[local_38 * 0x14] === 1)) {
            w32(DAT_ffffffdc, local_2c, (s32(DAT_ffffffdc, local_2c) + 1));
          }
        }
      }
    }
    local_3c = 0;
    local_28 = 0;
    local_30 = 0;
    for (/* cond: (local_2c < 8) */); local_2c = (local_2c < 8); local_2c = (local_2c + 1)) {
      if ((param_1 !== local_2c)) {
        if (((DAT_0064c6c1[(param_1 * 0x594 + local_2c * 4)] & 0x20) !== 0)) {
          local_30 = (local_30 + 1);
        }
        if ((s32(DAT_ffffff98, param_1) < s32(DAT_ffffff98, local_2c))) {
          local_28 = (local_28 + 1);
        }
        if ((s32(DAT_ffffffdc, param_1) < s32(DAT_ffffffdc, local_2c))) {
          local_3c = (local_3c + 1);
        }
      }
    }
    iVar1 = FUN_005ae006(DAT_00655b0a);
    if ((((iVar1 + -1) / 2 | 0) < local_3c)) {
      uVar2 = 2;
    }
    else {
      iVar1 = FUN_005ae006(DAT_00655b0a);
      if ((((iVar1 + -1) / 2 | 0) < local_28)) {
        uVar2 = 3;
      }
      else {
        iVar1 = FUN_004bd9f0(param_1, 0x2f);
        if ((iVar1 !== 0)) {
          if ((local_70 === 0)) {
            uVar2 = 4;
          }
          else if ((4 < DAT_00655c22[param_1])) {
            uVar2 = 7;
          }
          else {
            uVar2 = 6;
          }
        }
        else {
          uVar2 = 5;
        }
      }
    }
  }
  return uVar2;
}


 export function FUN_004bc8aa (param_1, param_2)

 {
  let uVar1;
  let iVar2;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0;
  for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
    if ((DAT_0064c6b0[param_1 * 0x594] <= DAT_0064c6b0[local_c * 0x594])) {
      local_10 = (local_10 + 1);
    }
  }
  if ((local_10 === 0)) {
    uVar1 = 7;
  }
  else {
    if ((DAT_0064c6b5[param_1 * 0x594] < 5)) {
      if ((DAT_0064c6b3[param_1 * 0x594] < 6)) {
        return 2;
      }
    }
    else if ((DAT_0064c6b3[param_1 * 0x594] < 4)) {
      return 2;
    }
    local_20 = 0;
    local_14 = 0;
    local_8 = (u8(DAT_0064c7a8[param_1 * 0x594]) + u8(DAT_0064c7a9[param_1 * 0x594]));
    if ((param_2 === 0)) {
      local_1c = 6;
    }
    else if ((param_2 === 1)) {
      local_1c = 0xc;
    }
    else {
      local_1c = 0x1a;
    }
    for (/* cond: (local_18 < ((DAT_00655b18) << 16 >> 16)) */); local_18 = (local_18 < ((DAT_00655b18) << 16 >> 16)); local_18 = (local_18 + 1)) {
      if ((s8(DAT_0064f348[local_18 * 0x58]) === param_1)) {
        local_20 = (local_20 + 1);
        iVar2 = FUN_0043d20a(local_18, local_1c);
        if ((iVar2 !== 0)) {
          local_14 = (local_14 + 1);
        }
        local_8 = (local_8 + s8(DAT_0064f37a[local_18 * 0x58]));
      }
    }
    iVar2 = FUN_004bd9f0(param_1, s8(DAT_0064c48e[local_1c * 8]));
    if (((local_20 / 2 | 0) <= local_14)) {
      iVar2 = FUN_004bd9f0(param_1, 0x54);
      if ((((local_20 + ((local_20 >> 0x1f) & 3)) >> 2) <= local_8)) {
        iVar2 = FUN_005ae006(DAT_00655b0a);
        if ((local_10 < (iVar2 / 2 | 0))) {
          uVar1 = 5;
        }
        else {
          uVar1 = 1;
        }
      }
      else {
        uVar1 = 4;
      }
    }
    else {
      uVar1 = 3;
    }
  }
  return uVar1;
}


 export function FUN_004bcb9b (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let local_d0;
  let local_c8;
  let local_c4;
  let local_c0;
  let local_bc;
  let local_b4;
  let local_b0;
  let aiStack_ac;
  let local_10;
  let local_c;
  let local_8;

  local_b0 = 0;
  local_b4 = 0;
  local_d0 = 0;
  local_c8 = 0;
  local_8 = (u8(DAT_0064c7a8[param_1 * 0x594]) + u8(DAT_0064c7a9[param_1 * 0x594]));
  if ((param_2 === 0)) {
    local_bc = 0x14;
    local_10 = 5;
    local_c = 2;
  }
  else if ((param_2 === 1)) {
    local_bc = 6;
    local_10 = 0xa;
    local_c = 3;
  }
  else {
    local_bc = 0x16;
    local_10 = 0x16;
    local_c = 4;
  }
  for (/* cond: (local_c4 < 0x27) */); local_c4 = (local_c4 < 0x27); local_c4 = (local_c4 + 1)) {
    w32(DAT_ffffff54, local_c4, 0);
  }
  for (/* cond: (local_c0 < ((DAT_00655b18) << 16 >> 16)) */); local_c0 = (local_c0 < ((DAT_00655b18) << 16 >> 16)); local_c0 = (local_c0 + 1)) {
    if ((s8(DAT_0064f348[local_c0 * 0x58]) === param_1)) {
      local_c8 = (local_c8 + 1);
      local_8 = (local_8 + s8(DAT_0064f37a[local_c0 * 0x58]));
      FUN_004ea1f6(local_c0, ((s16((DAT_0064f38e + local_c0 * 0x58), 0)) << 16 >> 16), 1, 0);
      for (/* cond: (local_c4 < 0x27) */); local_c4 = (local_c4 < 0x27); local_c4 = (local_c4 + 1)) {
        iVar1 = FUN_0043d20a(local_c0, local_c4);
        if ((iVar1 !== 0)) {
          w32(DAT_ffffff54, local_c4, (s32(DAT_ffffff54, local_c4) + 1));
        }
      }
      iVar1 = FUN_0043d20a(local_c0, local_10);
      if ((iVar1 !== 0)) {
        local_d0 = (local_d0 + 1);
      }
      if (((DAT_0064f344[local_c0 * 0x58] & 1) === 0)) {
        local_b0 = (local_b0 + ((s16((DAT_0064f38c + local_c0 * 0x58), 0)) << 16 >> 16));
      }
    }
  }
  for (/* cond: (local_c4 < 0x27) */); local_c4 = (local_c4 < 0x27); local_c4 = (local_c4 + 1)) {
    if ((iVar1 !== 0)) {
      local_b4 = (local_b4 + s32(DAT_ffffff54, local_c4) * iVar1);
    }
  }
  if ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) < 0x64)) {
    uVar2 = 1;
  }
  else {
    iVar1 = FUN_004bd9f0(param_1, local_bc);
    if ((iVar1 === 0)) {
      uVar2 = 2;
    }
    else if ((local_d0 < (local_c8 / local_c | 0))) {
      uVar2 = 3;
    }
    else {
      iVar1 = FUN_004bd9f0(param_1, 0x54);
      if ((iVar1 === 0)) {
        uVar2 = 4;
      }
      else if ((local_8 < ((local_c8 + ((local_c8 >> 0x1f) & 3)) >> 2))) {
        uVar2 = 5;
      }
      else if (((local_b0 - local_b4) < 6)) {
        uVar2 = 6;
      }
      else {
        uVar2 = 7;
      }
    }
  }
  return uVar2;
}


 export function FUN_004bcfcf (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = 0;
  local_1c = 0;
  local_10 = 0;
  local_8 = 0;
  for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
    if ((local_c !== param_1)) {
      if (((DAT_0064c6c0[(local_c * 4 + param_1 * 0x594)] & 1) !== 0)) {
        local_8 = (local_8 + 1);
      }
      if (((DAT_0064c6c0[(local_c * 4 + param_1 * 0x594)] & 8) !== 0)) {
        local_10 = (local_10 + 1);
      }
      if (((DAT_0064c6c1[(local_c * 4 + param_1 * 0x594)] & 0x20) !== 0)) {
        local_14 = (local_14 + 1);
      }
      if ((iVar1 !== 0)) {
        local_1c = (local_1c + 1);
      }
    }
  }
  if ((local_8 === 0)) {
    uVar2 = 1;
  }
  else {
    if ((param_2 === 2)) {
      local_18 = 0x1b;
    }
    else {
      local_18 = 0x58;
    }
    iVar1 = FUN_004bd9f0(param_1, local_18);
    if ((iVar1 === 0)) {
      uVar2 = 3;
    }
    else if ((6 < DAT_00655c22[param_1])) {
      if ((DAT_0064c6be[param_1 * 0x594] < 3)) {
        if ((1 < DAT_0064c6be[param_1 * 0x594])) {
          uVar2 = 4;
        }
        else if (((s16((DAT_0064c6a0 + param_1 * 0x594), 0) & 0x80) === 0)) {
          uVar2 = 6;
        }
        else if ((local_1c < local_8)) {
          uVar2 = 5;
        }
        else if ((local_14 === local_8)) {
          uVar2 = 6;
        }
        else {
          uVar2 = 7;
        }
      }
      else {
        uVar2 = 4;
      }
    }
    else {
      uVar2 = 2;
    }
  }
  return uVar2;
}


 export function FUN_004bd2a3 (param_1)

 {
  let bVar1;
  let uVar2;
  let uVar3;
  let local_20;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  uVar2 = (DAT_00655aee & 4);
  DAT_00655aee = (DAT_00655aee & 0xfffb);
  local_18 = 0;
  local_c = 0;
  local_14 = 0;
  local_10 = 0;
  for (/* cond: (local_20 < ((DAT_00655b18) << 16 >> 16)) */); local_20 = (local_20 < ((DAT_00655b18) << 16 >> 16)); local_20 = (local_20 + 1)) {
    if ((s8(DAT_0064f348[local_20 * 0x58]) === param_1)) {
      if ((4 < DAT_0064c6b5[param_1 * 0x594])) {
        FUN_004eb4ed(local_20, 1);
      }
      if ((DAT_0064f392[local_20 * 0x58] < DAT_0064f393[local_20 * 0x58])) {
        local_10 = (local_10 + 1);
        if (((DAT_0064f344[local_20 * 0x58] & 1) !== 0)) {
          local_c = (local_c + 1);
        }
      }
      else if ((DAT_0064f392[local_20 * 0x58] === DAT_0064f393[local_20 * 0x58])) {
        local_18 = (local_18 + 1);
      }
      if (((DAT_0064f344[local_20 * 0x58] & 2) !== 0)) {
        local_14 = (local_14 + 1);
      }
    }
  }
  if ((DAT_0064c6b5[param_1 * 0x594] < 5)) {
    bVar1 = 1;
    if (((u8(DAT_0064c6b3[param_1 * 0x594]) + u8(DAT_0064c6b4[param_1 * 0x594])) === 0xa)) {
      bVar1 = 0;
    }
  }
  else {
    bVar1 = ((u8(DAT_0064c6b3[param_1 * 0x594]) + u8(DAT_0064c6b4[param_1 * 0x594])) < 9);
  }
  if ((local_10 === 0)) {
    if (bVar1) {
      if ((local_14 === 0)) {
        uVar3 = 5;
      }
      else {
        uVar3 = 6;
      }
    }
    else {
      uVar3 = 4;
    }
  }
  else if (bVar1) {
    if ((DAT_0064c6b5[param_1 * 0x594] !== 6)) {
      uVar3 = 3;
    }
    else {
      uVar3 = 1;
    }
  }
  else {
    uVar3 = 2;
  }
  return uVar3;
}


 export function FUN_004bd9f0 (param_1, param_2)

 {
  let uVar1;
  let local_c;
  let local_8;

  if ((param_2 === -2)) {
    uVar1 = 0;
  }
  else if ((param_2 < 0)) {
    uVar1 = 1;
  }
  else if ((param_2 === 0x59)) {
    uVar1 = 0;
  }
  else if ((param_2 < 0x64)) {
    if ((param_1 < 1)) {
      uVar1 = 0;
    }
    else {
      FUN_005ae3bf(param_2, DAT_fffffff4, DAT_fffffff8);
      if (((UNNAMED & DAT_0064c6f8[(param_1 * 0x594 + local_c)]) === 0)) {
        uVar1 = 0;
      }
      else {
        uVar1 = 1;
      }
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_004bdaa5 (param_1, param_2)

 {
  let uVar1;
  let iVar2;

  if ((param_1 < 0)) {
    uVar1 = 0;
  }
  else if ((param_1 === param_2)) {
    uVar1 = 1;
  }
  else {
    iVar2 = FUN_004bdaa5(s8(DAT_0062768e[param_1 * 0x10]), param_2);
    if ((iVar2 === 0)) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  return uVar1;
}


 export function FUN_004bdb2c (param_1, param_2)

 {
  let bVar1;
  let bVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let local_3c;
  let local_38;
  let local_34;
  let local_30;
  let local_2c;
  let local_28;
  let local_24;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  local_38 = s8(DAT_006554fa[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]);
  if ((-1 < local_38)) {
    for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
      if ((DAT_0064c6b0[param_1 * 0x594] < DAT_0064c6b0[local_14 * 0x594])) {
        for (/* cond: (local_28 < 0x3f) */); local_28 = (local_28 < 0x3f); local_28 = (local_28 + 1)) {
          if ((DAT_0064c932[(local_14 * 0x594 + local_28)] !== 0)) {
            if ((-1 < local_38)) {
              local_38 = (local_38 + -1);
            }
            if ((6 < DAT_0064c6be[local_14 * 0x594])) {
              local_38 = -1;
            }
          }
        }
      }
    }
  }
  local_8 = (s8(DAT_0062768b[param_2 * 0x10]) * local_38 + s8(DAT_0062768a[param_2 * 0x10]));
  iVar4 = FUN_004bdaa5(s8(DAT_0064b44b), param_2);
  if ((iVar4 === 0)) {
    iVar4 = FUN_004bdaa5(s8(DAT_0064b45f), param_2);
    if ((iVar4 === 0)) {
      iVar4 = FUN_004bdaa5(s8(DAT_0064b527), param_2);
      if ((iVar4 === 0)) {
        local_10 = 0;
      }
      else {
        local_10 = 1;
      }
    }
    else {
      local_10 = 2;
    }
  }
  else {
    local_10 = 3;
  }
  if (((DAT_00655af0 & 4) !== 0)) {
    local_10 = (local_10 << 1);
  }
  if ((local_10 !== 0)) {
    local_34 = 0;
    bVar2 = 0;
    for (/* cond: (local_28 < 0x3f) */); local_28 = (local_28 < 0x3f); local_28 = (local_28 + 1)) {
      if ((DAT_0064c932[(param_1 * 0x594 + local_28)] !== 0)) {
        bVar3 = 0;
        for (/* cond: (local_14 < 8) */); local_14 = (local_14 < 8); local_14 = (local_14 + 1)) {
          if ((s16((DAT_0064c832 + (param_1 * 0x594 + local_28 * 2)), 0) !== 0)) {
            bVar3 = 1;
            if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
              bVar2 = 1;
            }
            break;
          }
        }
        if ((!bVar3)) {
          local_34 = 1;
          break;
        }
      }
    }
    if ((local_34 === 0)) {
      if (((DAT_00655af0 & 4) !== 0)) {
        local_8 = (local_8 + 1);
      }
    }
    else {
      local_8 = (local_8 + local_10);
    }
  }
  if ((s8(DAT_0064c59e) === param_2)) {
    local_8 = (local_8 + ((((s16((DAT_0064c70a + param_1 * 0x594), 0)) << 16 >> 16) + ((((s16((DAT_0064c70a + param_1 * 0x594), 0)) << 16 >> 16) >> 0x1f) & 3)) >> 2))
    ;
  }
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    if (((DAT_00655b0b & DAT_00655bce) !== 0)) {
      iVar4 = FUN_004bdaa5(0x20, param_2);
      if ((iVar4 !== 0)) {
        local_8 = (local_8 + 2);
      }
      for (/* cond: (local_30 < 0x26) */); local_30 = (local_30 < 0x26); local_30 = (local_30 + 1)) {
        if ((s8(DAT_0064c48e[local_30 * 8]) === param_2)) {
          local_8 = (local_8 + 3);
        }
      }
    }
    iVar4 = local_8;
    if ((s8(DAT_0064b3fb) === param_2)) {
      iVar4 = (local_8 + 5);
    }
    local_8 = iVar4;
    for (/* cond: (local_18 < 0x1c) */); local_18 = (local_18 < 0x1c); local_18 = (local_18 + 1)) {
      if ((s8(DAT_0064ba28[local_18]) === param_2)) {
        iVar4 = FUN_00453e51(param_1, local_18);
        if ((param_2 !== 0x25)) {
          local_8 = (local_8 + -2);
        }
        iVar4 = FUN_00453e18(local_18);
        if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[iVar4 * 0x58] & 0x1f))) !== 0)) {
          local_8 = (local_8 + 2);
        }
      }
    }
  }
  if ((s8(DAT_0064c546) === param_2)) {
    local_24 = 0;
    for (/* cond: (local_2c < ((DAT_00655b18) << 16 >> 16)) */); local_2c = (local_2c < ((DAT_00655b18) << 16 >> 16)); local_2c = (local_2c + 1)) {
      iVar4 = local_24;
      if ((s8(DAT_0064f349[local_2c * 0x58]) <= local_24)) {
        iVar4 = local_24;
      }
      local_24 = iVar4;
    }
    bVar1 = DAT_0064bcd2;
    if ((s8(DAT_0064c4d6) === param_2)) {
      bVar1 = DAT_0064bcd1;
    }
    local_3c = u8(bVar1);
    if ((local_3c <= local_24)) {
      local_8 = (local_8 + 2);
    }
  }
  if ((iVar4 !== 0)) {
    iVar4 = FUN_004bdaa5(0x10, param_2);
    if ((iVar4 !== 0)) {
      local_8 = (local_8 + (s8(DAT_006554fa[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]) + 1));
    }
    if ((param_2 === 0x10)) {
      local_8 = (local_8 + 2);
    }
  }
  iVar5 = FUN_004bd9f0(param_1, 0x26);
  iVar4 = local_8;
  if ((iVar5 !== 0)) {
    iVar5 = FUN_004bd9f0(param_1, 0x39);
    iVar4 = (local_8 + 1);
    if ((iVar5 !== 0)) {
      iVar4 = (local_8 + 2);
    }
  }
  local_8 = iVar4;
  /* switch */ (s16((DAT_0064c6a6 + param_1 * 0x594), 0) ( *) (DAT_0064c6a6 (DAT_0064c6a6 + param_1 * 0x594) param_1 * 0x594  )) {
  case 0 :
    if ((param_2 === 0x56)) {
      local_8 = (local_8 + 2);
    }
    if ((param_2 === 0x37)) {
      local_8 = (local_8 + -1);
    }
    break;
  case 1 :
    if ((param_2 === 0xc)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 2 :
    if ((param_2 === 6)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x52)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x3c)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 3 :
    if ((param_2 === 0x2f)) {
      local_8 = (local_8 + 2);
    }
    break;
  case 4 :
    if ((param_2 === 0x15)) {
      local_8 = (local_8 + 2);
    }
    if ((param_2 === 0xf)) {
      local_8 = (local_8 + -1);
    }
    if ((param_2 === 0x49)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x10)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x2a)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 5 :
    if ((param_2 === 0x40)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 8)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 1)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x2e)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x37)) {
      local_8 = (local_8 + -1);
    }
    if ((param_2 === 0x3c)) {
      local_8 = (local_8 + 2);
    }
    break;
  case 6 :
    if ((param_2 === 0x40)) {
      local_8 = (local_8 + 2);
    }
    if ((param_2 === 0x24)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x38)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 9)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x37)) {
      local_8 = (local_8 + -1);
    }
    break;
  case 7 :
    if ((param_2 === 0xf)) {
      local_8 = (local_8 + 2);
    }
    if ((param_2 === 0x3c)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x22)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 8 :
    if ((param_2 === 0x40)) {
      local_8 = (local_8 + 2);
    }
    if ((param_2 === 0x24)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x38)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 9)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 8)) {
      local_8 = (local_8 + -1);
    }
    if ((param_2 === 0x27)) {
      local_8 = (local_8 + -1);
    }
    break;
  case 9 :
    if ((param_2 === 0x2a)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x51)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x11)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 10 :
    if ((param_2 === 0x23)) {
      local_8 = (local_8 + -2);
    }
    if ((param_2 === 0x37)) {
      local_8 = (local_8 + -1);
    }
    break;
  case 0xb :
    if ((local_34 !== 0)) {
      local_8 = (local_8 - local_10);
    }
    if ((param_2 === 0x23)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 0xc :
    if ((param_2 === 0x37)) {
      local_8 = (local_8 + 1);
    }
    if ((local_10 !== 0)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 0xf :
    if ((param_2 === 0x4f)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x34)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 0x10 :
    if ((param_2 === 0x2e)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 0x11 :
    if ((1 < local_10)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x37)) {
      local_8 = (local_8 + 1);
    }
    break;
  case 0x12 :
  case 0x13 :
    if ((param_2 === 0x40)) {
      local_8 = (local_8 + 2);
    }
    if ((param_2 === 0x24)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x38)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 9)) {
      local_8 = (local_8 + 1);
    }
    if ((param_2 === 0x37)) {
      local_8 = (local_8 + -1);
    }
    break;
  case 0x14 :
    if ((param_2 === 0x24)) {
      local_8 = (local_8 + 2);
    }
  }
  if ((DAT_00655b82[param_2] === 0)) {
    local_8 = (local_8 + 1);
  }
  for (/* cond: (local_1c < 0x64) */); local_1c = (local_1c < 0x64); local_1c = (local_1c + 1)) {
    if ((iVar4 !== 0)) {
      local_8 = (local_8 + -1);
    }
  }
  if ((local_8 < 2)) {
    local_8 = 1;
  }
  return local_8;
}


 export function FUN_004be6ba (param_1)

 {
  let iVar1;
  let uVar2;
  let local_54;
  let local_50;
  let local_4c;
  let local_48;
  let acStack_44;

  iVar1 = FUN_00453e51(param_1, 0xe);
  if ((iVar1 !== 0)) {
    for (/* cond: (local_48 < 0x3e) */); local_48 = (local_48 < 0x3e); local_48 = (local_48 + 1)) {
      DAT_ffffffbc[local_48] = 0;
    }
    for (/* cond: (local_54 < ((DAT_00655b16) << 16 >> 16)) */); local_54 = (local_54 < ((DAT_00655b16) << 16 >> 16)); local_54 = (local_54 + 1)) {
      if ((s8(DAT_006560f7[local_54 * 0x20]) === param_1)) {
        uVar2 = u8(DAT_006560f6[local_54 * 0x20]);
        local_50 = s8(DAT_0064b1c0[uVar2 * 0x14]);
        if ((iVar1 !== 0)) {
          local_50 = 0x23;
        }
        if ((iVar1 !== 0)) {
          local_4c = -1;
          for (/* cond: (local_48 < 0x3e) */); local_48 = (local_48 < 0x3e); local_48 = (local_48 + 1)) {
            if ((DAT_0064b1c9[u8(DAT_006560f6[local_54 * 0x20]) * 0x14] <= DAT_0064b1c9[local_48 * 0x14])) {
              local_4c = local_48;
            }
          }
          if ((-1 < local_4c)) {
            if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
              DAT_ffffffbc[u8(DAT_006560f6[local_54 * 0x20])] = 1;
              FUN_004271e8(0, s32((DAT_0064b1b8 + u8(DAT_006560f6[local_54 * 0x20]) * 0x14), 0));
              FUN_004271e8(1, s32((DAT_0064b1b8 + local_4c * 0x14), 0));
              FUN_004271e8(2, DAT_0064c630);
              if ((DAT_006d1da0 === param_1)) {
                FUN_004442a0(s_UPGRADE_0062db04, local_4c, (((DAT_00633584 === 0) - 1) & 8));
              }
              else {
                FUN_00511880(0x3e, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), 3, 0, local_4c, DAT_00633584);
              }
            }
            DAT_006560f6[local_54 * 0x20] = ((local_4c) & 0xFF);
            w16((DAT_006560f4 + local_54 * 0x20), 0, (s16((DAT_006560f4 + local_54 * 0x20), 0) & 0xdfff));
            FUN_0047cea6(((s16((DAT_006560f0 + local_54 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_54 * 0x20), 0)) << 16 >> 16));
            if ((2 < DAT_00655b02)) {
              FUN_004b0b53(0xff, 2, 0, 0, 0);
              FUN_0046b14d(0x72, 0xff, ((s16((DAT_006560f0 + local_54 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_54 * 0x20), 0)) << 16 >> 16), 0, 0, 0, 0, 0, 0);
            }
          }
        }
      }
    }
  }
  return;
}


 export function FUN_004bea84 (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let local_8;

  if ((param_2 === 0x36)) {
    if ((iVar1 === 1)) {
      uVar2 = FUN_00493c7d(param_1);
      FUN_0040ff60(0, uVar2);
      FUN_00410030(s_STARTREV_0062db1c, DAT_0063fc58, 0);
      FUN_0055c066(param_1, 0);
    }
  }
  else if ((param_2 === 0x1f)) {
    if ((DAT_0064c6b5[param_1 * 0x594] < 3)) {
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_REPUBLIC_0062db28, DAT_00643af8, 0);
      return;
    }
    if ((param_2 === 0xf)) {
      local_8 = 3;
    }
    else if ((param_2 === 0x1f)) {
      local_8 = 4;
    }
    else if ((param_2 === 0x47)) {
      local_8 = 5;
    }
    else {
      local_8 = 6;
    }
    if ((DAT_0064c6b5[param_1 * 0x594] === 5)) {
      return;
    }
    if ((DAT_0064c6b5[param_1 * 0x594] === 3)) {
      return;
    }
    if ((DAT_0064c6b5[param_1 * 0x594] === 4)) {
      return;
    }
    if ((DAT_0064c6b5[param_1 * 0x594] !== 0)) {
      FUN_004271e8(0, s32((DAT_00627684 + param_2 * 0x10), 0));
      FUN_004271e8(1, s32((DAT_0064b9a0 + u8(DAT_0064c6b5[param_1 * 0x594]) * 4), 0));
      iVar1 = FUN_00410030(s_AUTOREV_0062db34, (DAT_00646878 + local_8 * 0x3c), 0);
      if ((iVar1 === 1)) {
        uVar2 = FUN_00493c7d(param_1);
        FUN_0040ff60(0, uVar2);
        FUN_00410030(s_STARTREV_0062db3c, DAT_0063fc58, 0);
        FUN_0055c066(param_1, 0);
      }
    }
  }
  if (((None & 1) !== 0)) {
    if ((param_2 === 0x43)) {
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_RAILROADS_0062db48, DAT_00643af8, 0);
    }
    if ((param_2 === 0x46)) {
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_FARMLAND_0062db54, DAT_00643af8, 0);
    }
    if ((param_2 === 0x54)) {
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_TRADE_0062db60, DAT_00643af8, 0);
    }
    if ((param_2 === 0x4b)) {
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_SEAFARING_0062db68, DAT_00643af8, 0);
    }
    if ((param_2 === 0x58)) {
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_WRITING_0062db74, DAT_00643af8, 0);
    }
  }
  return;
}


 export function FUN_004bee56 (param_1)

 {
  let uVar1;
  let iVar2;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;
  let local_8;

  uVar1 = FUN_00410070(param_1);
  FUN_0040ff60(0, uVar1);
  local_18 = -1;
  local_c = 0;
  for (/* cond: (local_14 < ((DAT_00655b18) << 16 >> 16)) */); local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
    if ((s8(DAT_0064f348[local_14 * 0x58]) === param_1)) {
      local_8 = s8(DAT_0064f349[local_14 * 0x58]);
      iVar2 = FUN_0043d20a(local_14, 1);
      if ((iVar2 !== 0)) {
        local_8 = (local_8 << 1);
      }
      if (((local_8 === 1) || ((local_8 + -1) < 0))) {
        local_1c = 0;
      }
      else {
        local_1c = _rand();
        local_1c = (local_1c % local_8);
      }
      if ((local_c <= (local_1c + 1))) {
        local_18 = local_14;
        local_c = (local_1c + 1);
      }
    }
  }
  if ((-1 < local_18)) {
    FUN_0040ff60(1, (DAT_0064f360 + local_18 * 0x58));
    if ((2 < DAT_00655b02)) {
      FUN_00511880(0x54, 0xff, 2, 0, 0, 0);
    }
    FUN_004c4240(s_GOLDENAGE_0062db7c, 0x3c, 8);
  }
  return;
}


 export function FUN_004befd1 (param_1, param_2, param_3, param_4)

 {
  if ((s32(param_3, 0) === 0)) {
    FUN_0040fea0();
  }
  else {
    FUN_0040bbe0(DAT_0062db88);
    if ((s32(param_4, 0) < 4)) {
      FUN_0040bbe0(DAT_0062db8c);
    }
    else {
      w32(param_4, 0, 0);
      FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
      FUN_0040bbb0();
    }
  }
  w32(param_4, 0, (s32(param_4, 0) + 1));
  w32(param_3, 0, (s32(param_3, 0) + 1));
  FUN_0040ff00(param_2);
  return;
}


 export function FUN_004bf05b (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let unaff_FS_OFFSET;
  let local_334;
  let local_330;
  let local_32c;
  let local_328;
  let local_324;
  let local_320;
  let local_31c;
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
  puStack_c = LAB_004bfda6;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_1c = 0;
  FUN_0059db08(0x4000);
  local_8 = 0;
  if ((DAT_006d1da0 !== param_1)) {
    FUN_0046b14d(0x9b, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), param_1, param_2, param_3, param_4, 0, 0, 0, 0);
    local_8 = -1;
    FUN_004bfd9a();
    FUN_004bfdb0();
    return;
  }
  if ((((s16((DAT_0064c6aa + param_1 * 0x594), 0)) << 16 >> 16) === param_2)) {
    w16((DAT_0064c6aa + param_1 * 0x594), 0, 0xffff);
  }
  if ((0x63 < param_2)) {
    DAT_0064c6b1[param_1 * 0x594] = (DAT_0064c6b1[param_1 * 0x594] + 1);
  }
  else {
    FUN_005ae3bf(param_2, DAT_fffffcd0, DAT_fffffcdc);
    DAT_0064c6f8[(param_1 * 0x594 + local_330)] = (DAT_0064c6f8[(param_1 * 0x594 + local_330)] | UNNAMED);
    DAT_0064c714[(param_1 * 0x594 + param_2)] = ((param_3) & 0xFF);
    if ((DAT_00655b82[param_2] === 0)) {
      local_1c = 1;
    }
    DAT_00655b82[param_2] = (DAT_00655b82[param_2] | (((1 << (((param_1) & 0xFF) & 0x1f))) & 0xFF));
  }
  if ((DAT_00655af8 !== 0)) {
    DAT_0064c6b0[param_1 * 0x594] = (DAT_0064c6b0[param_1 * 0x594] + 1);
    if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
      FUN_00421dd0();
      FUN_0059e6ff(0x140);
      FUN_0040bbb0();
      uVar2 = FUN_00493c7d(param_1);
      FUN_0040bbe0(uVar2);
      FUN_0040fe10();
      if ((DAT_00628064 !== 2)) {
        FUN_0040bc10((0x5f - u8((param_3 === 0))));
      }
      else {
        FUN_0040bbe0(s_erhalten_0062db90);
      }
      FUN_0040fe10();
      FUN_0040ff00(s32((DAT_00627684 + param_2 * 0x10), 0));
      if ((param_1 !== param_3)) {
        FUN_0040fe10();
        if ((DAT_00628064 === 2)) {
          FUN_0040bbe0(s_von_den_0062db9c);
        }
        else {
          FUN_0040bc10(0x60);
        }
        FUN_0040fe10();
        if ((param_3 < 0)) {
          FUN_0040ff00(DAT_0064c5e0);
        }
        else {
          uVar2 = FUN_00493c7d(param_3);
          FUN_0040bbe0(uVar2);
        }
      }
      FUN_0040bbe0(DAT_0062dba4);
      FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
      if ((DAT_00626a24 === 0)) {
        FUN_0059ec88((DAT_00646cb8 + (s8(DAT_0062768d[param_2 * 0x10]) * 0x3c + s8(DAT_0062768c[param_2 * 0x10]) * 0xf0)), 0, 0);
        local_31c = DAT_fffffce4;
      }
      local_14 = 0;
      local_328 = 0;
      FUN_0040bbb0();
      if ((((1 << (((DAT_006d1da0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        for (/* cond: (local_334 < 0x43) */); local_334 = (local_334 < 0x43); local_334 = (local_334 + 1)) {
          if ((s8(DAT_0064c48e[local_334 * 8]) === param_2)) {
            FUN_004befd1(DAT_fffffce4, s32((DAT_0064c488 + local_334 * 8), 0), DAT_fffffcd8, DAT_ffffffec);
          }
        }
        for (/* cond: (local_320 < 0x3e) */); local_320 = (local_320 < 0x3e); local_320 = (local_320 + 1)) {
          if ((s8(DAT_0064b1cb[local_320 * 0x14]) === param_2)) {
            FUN_004befd1(DAT_fffffce4, s32((DAT_0064b1b8 + local_320 * 0x14), 0), DAT_fffffcd8, DAT_ffffffec);
          }
        }
        if ((local_328 !== 0)) {
          FUN_0040fed0();
          FUN_0059e18b(DAT_00679640, -1, -1, -1, 0);
        }
      }
      FUN_0040bc80(0);
    }
    else if ((iVar1 === 0)) {
      iVar1 = FUN_00458df9(DAT_006d1da0, param_1, -1, -1);
      if ((iVar1 !== 0)) {
        uVar2 = FUN_00493c7d(param_1);
        FUN_0040ff60(1, uVar2);
        FUN_004271e8(2, s32((DAT_00627684 + param_2 * 0x10), 0));
        FUN_00421ea0(DAT_0062dba8);
      }
      FUN_0045918e();
    }
    if ((DAT_00654fa8 === 0)) {
      if ((param_4 === 0)) {
        FUN_00566584(param_2);
      }
      FUN_004bea84(param_1, param_2);
    }
    for (/* cond: (DAT_00627689[local_28 * 0x10] === 0) */); (-1 = (-1 < local_28) && (DAT_00627689 = DAT_00627689));
        local_28 = s8(DAT_0062768e[local_28 * 0x10])) {
    }
    if ((local_28 === param_2)) {
      local_18 = 0;
      for (/* cond: (local_32c < ((DAT_00655b18) << 16 >> 16)) */); local_32c = (local_32c < ((DAT_00655b18) << 16 >> 16)); local_32c = (local_32c + 1)) {
        if ((s8(DAT_0064f348[local_32c * 0x58]) === (param_1 & 0xff))) {
          iVar1 = FUN_0043d20a(local_32c, 2);
          if ((iVar1 !== 0)) {
            local_18 = (local_18 + 1);
          }
          FUN_0043d289(local_32c, 2, 0);
        }
      }
      if ((local_18 !== 0)) {
        local_18 = u8(DAT_0064c49c) * u8(DAT_0064bccc) * local_18;
        if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          FUN_004271e8(0, s32((DAT_00627684 + param_2 * 0x10), 0));
          FUN_00421da0(0, local_18);
          FUN_0043c9d0(s_BARRACKS_0062dbb0);
          if ((DAT_00626a24 === 0)) {
            FUN_0059ec88((DAT_00646cb8 + (s8(DAT_0062768d[param_2 * 0x10]) * 0x3c + s8(DAT_0062768c[param_2 * 0x10]) * 0xf0)), 0, 0);
            FUN_0059ec88(DAT_006451d8, 0, 0);
            local_31c = DAT_fffffce4;
          }
          FUN_0040bc80(0);
        }
        w32((DAT_0064c6a2 + param_1 * 0x594), 0, (s32((DAT_0064c6a2 + param_1 * 0x594), 0) + local_18));
        if ((DAT_006d1da0 === param_1)) {
          FUN_00569363(1);
        }
      }
    }
    if ((local_1c !== 0)) {
      if ((param_3 !== 0)) {
        FUN_004bee56(param_1);
      }
      DAT_00655b1e[param_2] = (DAT_00655b1e[param_2] | ((param_1) & 0xFF));
      if ((DAT_00654fa8 === 0)) {
        for (/* cond: (local_24 < 0x1c) */); local_24 = (local_24 < 0x1c); local_24 = (local_24 + 1)) {
          if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_32c * 0x58] & 0x1f))) !== 0)) {
            iVar1 = (local_24 + 0x27);
            FUN_004271e8(0, s32((DAT_00627684 + param_2 * 0x10), 0));
            FUN_004271e8(1, s32((DAT_0064c488 + iVar1 * 8), 0));
            FUN_0043c9d0(s_ENDWONDER_0062dbbc);
            if ((DAT_00626a24 === 0)) {
              FUN_0059ec88((DAT_00646cb8 + (s8(DAT_0062768d[param_2 * 0x10]) * 0x3c + s8(DAT_0062768c[param_2 * 0x10]) * 0xf0)), 0, 0);
              FUN_0059ec88((DAT_00645160 + iVar1 * 0x3c), 0, 0);
              local_31c = DAT_fffffce4;
            }
            if ((2 < DAT_00655b02)) {
              FUN_00511880(0x4d, 0xff, 2, 0, param_2, iVar1);
            }
            FUN_0040bc80(0);
          }
        }
      }
    }
    FUN_004be6ba(param_1);
    iVar1 = FUN_00453edf(4);
    if ((iVar3 === 0)) {
      local_18 = 0;
      for (/* cond: (local_20 < 8) */); local_20 = (local_20 < 8); local_20 = (local_20 + 1)) {
        iVar3 = FUN_004bd9f0(local_20, param_2);
        if ((iVar3 !== 0)) {
          local_18 = (local_18 + 1);
        }
      }
      if ((1 < local_18)) {
        FUN_004bf05b(iVar1, param_2, -2, 0, 0);
      }
    }
    if ((2 < DAT_00655b02)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
    }
    local_8 = -1;
    FUN_004bfd9a();
    FUN_004bfdb0();
    return;
  }
  if ((2 < DAT_00655b02)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
  }
  local_8 = -1;
  FUN_004bfd9a();
  FUN_004bfdb0();
  return;
}


 export function FUN_004bfd9a ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004bfdb0 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_004bfdbe (param_1, param_2)

 {
  let iVar1;

  if ((iVar1 !== 0)) {
    return 1;
  }
  return 0;
}


 export function FUN_004bfe5a (param_1, param_2, param_3)

 {
  let cVar1;
  let iVar2;
  let local_14;
  let local_10;

  local_14 = 0;
  cVar1 = DAT_0064b1cb[param_3 * 0x14];
  if (((DAT_0064f344[param_2 * 0x58] & 0x80) !== 0)) {
    if ((DAT_0064b1c1[param_3 * 0x14] === 0)) {
      for (/* cond: (local_10 < 0x3e) */); local_10 = (local_10 < 0x3e); local_10 = (local_10 + 1)) {
        if ((DAT_0064b1c5[param_3 * 0x14] <= DAT_0064b1c5[local_10 * 0x14])) {
          if ((DAT_0064b1c4[local_10 * 0x14] !== DAT_0064b1c4[param_3 * 0x14])) {
            return 0;
          }
          if ((DAT_0064b1c5[local_10 * 0x14] !== DAT_0064b1c5[param_3 * 0x14])) {
            return 0;
          }
        }
      }
    }
    if ((DAT_0064c6b5[param_1 * 0x594] === 4)) {
      local_14 = 1;
    }
  }
  return local_14;
}
