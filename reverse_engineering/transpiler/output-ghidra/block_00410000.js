// Block 0x00410000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 204

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_00410030 (param_1, param_2, param_3)

 {
  FUN_0051d564(DAT_006359d4, param_1, 0, param_2, param_3);
  return;
}


 export function FUN_00410070 (param_1)

 {
  FUN_00493d13(param_1);
  return;
}


 export function FUN_004100a0 (param_1, param_2, param_3, param_4, param_5, param_6)

 {
  FUN_0056d289(param_2, param_3, 0, (param_5 + 2), param_6, 0);
  return;
}


 export function FUN_004100cf (param_1)

 {
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_350;
  let local_34c;
  let local_50;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004102ea;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_50 = DAT_ffffffb0;
  local_8 = 0;
  FUN_0059db08(0x4000);
  local_8 = ((((local_8) >> 8) << 8) | 1);
  FUN_005cdea1(0x40, 0x30, 0);
  FUN_0040ff60(0, (DAT_0064f360 + param_1 * 0x58));
  FUN_0040bbb0();
  uVar1 = FUN_00410070(s8(_MEM[DAT_0064f348 + param_1 * 0x58]));
  FUN_0040bbe0(uVar1);
  if (((DAT_0064bc60 & 2) !== 0)) {
    iVar2 = FUN_0043cef9(param_1);
    if ((iVar2 !== 0)) {
      FUN_0040fe10();
      FUN_0040bc10(0x1b0);
      if ((1 < iVar2)) {
        FUN_0040bbe0(DAT_00624f68);
        FUN_0040ff30(iVar2);
      }
    }
  }
  FUN_0040ff60(1, DAT_00679640);
  for (/* cond: (local_34c < 3) */); local_34c = (local_34c < 3); local_34c = (local_34c + 1)) {
    local_14 = s8(_MEM[DAT_0064f37e + (param_1 * 0x58 + local_34c)]);
    FUN_0040bbb0();
    if ((local_14 < 0)) {
      FUN_0040fea0();
    }
    if ((local_14 < 1)) {
      local_350 = ((~local_14) + 1);
    }
    else {
      local_350 = local_14;
    }
    FUN_0040ff00(s32((DAT_0064b168 + local_350 * 4), 0));
    if ((local_14 < 0)) {
      FUN_0040fed0();
    }
    FUN_0040ff60((local_34c + 2), DAT_00679640);
  }
  FUN_00414dd0(s_CITYINFO_00624f6c, param_1);
  local_8 = (local_8 & -0x100);
  FUN_004102d5();
  local_8 = -1;
  FUN_004102e1();
  FUN_004102f4();
  return;
}


 export function FUN_004102d5 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_004102e1 ()

 {
  FUN_005cde4d();
  return;
}


 export function FUN_004102f4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00410302 ()

 {
  FUN_0047cbb4(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16), 0, DAT_006d1da0, 1);
  return;
}


 export function FUN_0041033a ()

 {
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      FUN_00410302();
    }
  }
  return;
}


 export function FUN_004103ae ()

 {
  FUN_00509545();
  FUN_005c62ee();
  FUN_0047cd51(DAT_006d1da0, 1);
  return;
}


 export function FUN_00410402 (in_ECX, param_1, param_2)

 {
  let uVar1;
  let uVar2;
  // in_ECX promoted to parameter;

  uVar2 = FUN_005ae052(param_1);
  w16((in_ECX + 0x2e0), 0, uVar2);
  w16((in_ECX + 0x2e2), 0, param_2);
  uVar1 = DAT_0062804c;
  wv(DAT_0062804c, 0);
  FUN_0047cd51(DAT_006d1da0, 1);
  wv(DAT_0062804c, uVar1);
  return;
}


 export function FUN_00410464 (in_ECX, param_1, param_2)

 {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  // in_ECX promoted to parameter;
  let local_c;

  local_c = 0;
  iVar1 = s32((in_ECX + 0x2e8), 0);
  iVar2 = s32((in_ECX + 0x2ec), 0);
  if (((((DAT_006d1160) << 16 >> 16) + s32((in_ECX + 0x2f8), 0) * -2) <= iVar1)) {
    param_1 = (param_1 + ((DAT_006d1160) << 16 >> 16));
  }
  iVar3 = s32((in_ECX + 0x300), 0);
  iVar4 = s32((in_ECX + 0x2f4), 0);
  if ((s32((in_ECX + 0x330), 0) === 0)) {
    if (((DAT_00655ae8 & 0x8000) !== 0)) {
      param_1 = FUN_005adfa0(param_1, 2, (((DAT_006d1160) << 16 >> 16) + -3));
    }
    if ((((iVar3 * 2 + iVar1) + -3) <= param_1)) {
      local_c = 1;
    }
  }
  if (((iVar4 + -1) <= param_2)) {
    local_c = 1;
  }
  if ((local_c !== 0)) {
    wv(DAT_0062805c, 1);
    wv(DAT_00628054, (DAT_006d1da8 === 0));
    FUN_00410402(param_1, param_2);
  }
  return local_c;
}


 export function FUN_004105f8 (param_1, param_2, param_3)

 {
  let uVar1;
  let uVar2;
  let local_c;
  let local_8;

  local_c = 1;
  wv(DAT_006ad908, 1);
  if ((param_3 < 0)) {
    uVar1 = 3;
  }
  else if ((DAT_006d1da0 === param_3)) {
    uVar1 = 1;
  }
  else {
    uVar1 = 2;
  }
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      if (((uVar1 & s16((DAT_0066ca86 + local_8 * 0x3f0), 0)) === 0)) {
        local_c = 0;
      }
      else {
        uVar2 = FUN_00410464(param_1, param_2);
        local_c = (local_c & uVar2);
      }
    }
  }
  wv(DAT_006ad908, 0);
  return local_c;
}


 export function FUN_004106fd (in_ECX, param_1, param_2, param_3, param_4)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_18;
  let local_10;
  let local_c;
  let local_8;

  FUN_0047a6b0(DAT_ffffffe8, DAT_fffffff8, param_3, param_4);
  if ((((param_2) << 16 >> 16) < local_8)) {
    iVar1 = 8;
  }
  else if ((((param_2) << 16 >> 16) < (s32((in_ECX + 0x30c), 0) + local_8))) {
    local_c = (((param_1) << 16 >> 16) - UNNAMED);
    local_10 = (((param_2) << 16 >> 16) - local_8);
    param_1 = (param_1 - ((s32((in_ECX + 0x124), 0)) & 0xFFFF));
    param_2 = (param_2 - ((s32((in_ECX + 0x128), 0)) & 0xFFFF));
    if ((param_2 < 0)) {
      iVar1 = 8;
    }
    else if ((((param_2) << 16 >> 16) < s32((in_ECX + 0x130), 0))) {
      iVar1 = FUN_005c0bf2(local_c, local_10);
      iVar1 = ((iVar1 + -10) >> 4);
    }
    else {
      iVar1 = 8;
    }
  }
  else {
    iVar1 = 8;
  }
  return iVar1;
}


 export function FUN_00410835 (param_1, param_2)

 {
  let iVar1;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_c = FUN_005c62ee();
  if ((local_c === 0)) {
    local_c = 0;
  }
  else {
    local_c = (local_c + -72);
  }
  if ((s32((local_c + 0x358), 0) !== 0x1fe)) {
    iVar1 = FUN_00410e0a();
    if ((iVar1 === 0)) {
      local_10 = 0x201;
      if ((local_8 < 8)) {
        local_10 = (((local_8 + 1) & 7) + 0x1f4);
      }
    }
    else {
      local_10 = 0x202;
      local_1c = ((DAT_00655afe) << 16 >> 16);
      iVar1 = FUN_0047a540(DAT_ffffffe0, DAT_ffffffe8, param_1, param_2);
      if ((iVar1 !== 0)) {
        return;
      }
      iVar1 = FUN_004087c0(local_20, local_18);
      if ((iVar1 === 0)) {
        return;
      }
      iVar1 = FUN_005ae1b0(local_20, local_18, ((s16((DAT_006560f0 + local_1c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_1c * 0x20), 0)) << 16 >> 16));
      if ((u8(DAT_0064bcdb) < iVar1)) {
        local_10 = 0x203;
      }
      else {
        iVar1 = FUN_005b89e4(local_20, local_18);
        if ((iVar1 === 0)) {
          local_14 = FUN_005b8d62(local_20, local_18);
          if ((s8(_MEM[DAT_006560f7 + local_1c * 0x20]) !== local_14)) {
            local_10 = 0x203;
          }
        }
        else {
          local_10 = 0x203;
        }
      }
    }
    if ((s32((local_c + 0x358), 0) !== local_10)) {
      w32((local_c + 0x358), 0, local_10);
      FUN_00414b70(local_10, 1);
    }
  }
  return;
}


 export function FUN_00410a64 ()

 {
  if ((-1 < DAT_00624f54)) {
    FUN_005d2004(DAT_00624f54);
    wv(DAT_00624f54, -1);
  }
  if ((s32(DAT_0066cb00, DAT_00624f58 * 0xfc) === 0x1fe)) {
    w32(DAT_0066cb00, DAT_00624f58 * 0xfc, 0x201);
    FUN_00414b70(0x201, 1);
    FUN_00414d40();
  }
  wv(DAT_00624f58, -1);
  return;
}


 export function FUN_00410b23 ()

 {
  if ((-1 < DAT_00624f54)) {
    FUN_005d2004(DAT_00624f54);
    wv(DAT_00624f54, -1);
    if ((-1 < DAT_00624f58)) {
      w32(DAT_0066cb00, DAT_00624f58 * 0xfc, 0x1fe);
      FUN_00414b70(0x1fe, 1);
      FUN_00414ce0();
    }
  }
  return;
}


 export function FUN_00410bc3 ()

 {
  let SVar1;
  let iVar2;
  let local_8;

  if ((DAT_006ad8d4 === 0)) {
    wv(DAT_006ad8d4, 1);
    local_8 = FUN_005c62ee();
    if ((local_8 === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = (local_8 + -72);
    }
    FUN_00410a64();
    if ((iVar2 === 0)) {
      wv(DAT_00624f58, s32((local_8 + 0x2d8), 0));
      SVar1 = FUN_006e7d64(0x10);
      if (((((SVar1 >>> 8)) & 0xFF) === 0)) {
        wv(DAT_00624f54, FUN_005d1f50(LAB_004025cc, 0x190, 1));
      }
      else {
        w32(DAT_0066cb00, s32((local_8 + 0x2d8), 0) * 0xfc, 0x1fe);
        FUN_00414b70(0x1fe, 1);
        FUN_00414ce0();
      }
    }
    wv(DAT_006ad8d4, 0);
  }
  return;
}


 export function FUN_00410cfa ()

 {
  if ((DAT_006ad8d4 === 0)) {
    wv(DAT_006ad8d4, 1);
    FUN_005c62ee();
    if ((-1 < DAT_00624f54)) {
      FUN_00410a64();
    }
    FUN_00414d40();
    wv(DAT_006ad8d4, 0);
  }
  return;
}


 export function FUN_00410d98 (param_1, param_2)

 {
  let iVar1;

  iVar1 = FUN_004087c0(param_1, param_2);
  if ((iVar1 !== 0)) {
    wv(DAT_00628054, 0);
    FUN_00410302();
    wv(DAT_0064b1b4, ((param_1) & 0xFFFF));
    wv(DAT_0064b1b0, ((param_2) & 0xFFFF));
    FUN_0056a65e(1);
    wv(DAT_00628054, 1);
    FUN_00410302();
  }
  return (iVar1 !== 0);
}


 export function FUN_00410e0a ()

 {
  let uVar1;

  if ((DAT_0066cb00 === 0x203)) {
    uVar1 = 1;
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_00410e46 ()

 {
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      w32(DAT_0066cb00, local_8 * 0xfc, 0x202);
      FUN_00414b70(0x202, 1);
    }
  }
  return;
}


 export function FUN_00410ed8 ()

 {
  let iVar1;
  let local_8;

  iVar1 = FUN_00410e0a();
  if ((iVar1 !== 0)) {
    for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
      if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
        w32(DAT_0066cb00, local_8 * 0xfc, 0x201);
        FUN_00414b70(0x201, 1);
      }
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00410f77 (param_1, param_2, param_3)

 {
  let iVar1;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((DAT_006ad8d4 === 0)) {
    iVar1 = XD_InFlushSendBuffer();
    if ((DAT_006ad904 === 0)) {
      wv(DAT_006ad8d4, 1);
      if ((DAT_0062edf8 === 0)) {
        local_c = FUN_005c62ee();
        if ((local_c === 0)) {
          local_c = 0;
        }
        else {
          local_c = (local_c + -72);
        }
        local_8 = u8((s32((local_c + 0x358), 0) === 0x1fe));
        local_20 = FUN_00410e0a();
        FUN_00410a64();
        if ((param_3 === 0)) {
          FUN_00410ed8();
        }
        iVar1 = FUN_0047a540(DAT_ffffffdc, DAT_fffffff0, param_1, param_2);
        if ((iVar1 === 0)) {
          wv(DAT_0062bcb0, 1);
          iVar1 = FUN_004087c0(local_24, local_10);
          if ((iVar1 !== 0)) {
            wv(DAT_00624f5c, local_24);
            wv(DAT_00624f60, local_10);
            if ((param_3 !== 0)) {
              wv(DAT_00628054, 0);
              FUN_00410302();
              FUN_00410402(local_24, local_10);
              wv(DAT_0062bcb0, 0);
              wv(DAT_006ad8d4, 0);
              return;
            }
            if ((param_3 !== 0)) {
              if ((s32((local_c + 0x2d8), 0) === 0)) {
                FUN_004897fa(0);
                FUN_00410d98(local_24, local_10);
              }
              if ((param_3 === 0)) {
                local_18 = FUN_0043cf76(local_24, local_10);
                if ((-1 < local_18)) {
                  if (((_MEM[DAT_0064f346 + local_18 * 0x58] & 0x40) !== 0)) {
                    FUN_00509590(local_18);
                  }
                  else {
                    iVar1 = FUN_004bd9f0(DAT_006d1da0, 0x54);
                    if (((DAT_0064bc60 & 8) !== 0)) {
                      FUN_004100cf(local_18);
                    }
                  }
                  wv(DAT_0062bcb0, 0);
                  wv(DAT_006ad8d4, 0);
                  return;
                }
                FUN_0058d442();
              }
            }
            else {
              if ((local_8 !== 0)) {
                local_1c = ((DAT_00655afe) << 16 >> 16);
                if ((-1 < local_1c)) {
                  w16((DAT_00656102 + local_1c * 0x20), 0, ((local_24) & 0xFFFF));
                  w16((DAT_00656104 + local_1c * 0x20), 0, ((local_10) & 0xFFFF));
                  _MEM[DAT_006560ff + local_1c * 0x20] = 0xb;
                  FUN_004c4e6d(local_1c);
                }
                wv(DAT_0062bcb0, 0);
                wv(DAT_006ad8d4, 0);
                return;
              }
              if ((local_20 !== 0)) {
                FUN_004ca39e(((DAT_00655afe) << 16 >> 16), local_24, local_10);
                wv(DAT_0062bcb0, 0);
                wv(DAT_006ad8d4, 0);
                return;
              }
              if ((s32((local_c + 0x358), 0) < 0x1fc)) {
                local_14 = (s32((local_c + 0x358), 0) + -0x1f5);
                if ((local_14 < 0)) {
                  local_14 = 7;
                }
                FUN_0059062c(((DAT_00655afe) << 16 >> 16), local_14, 3);
                wv(DAT_0062bcb0, 0);
                wv(DAT_006ad8d4, 0);
                return;
              }
              local_18 = FUN_0043cf76(local_24, local_10);
              if ((-1 < local_18)) {
                if (((_MEM[DAT_0064f346 + local_18 * 0x58] & 0x40) !== 0)) {
                  FUN_00509590(local_18);
                }
                else {
                  iVar1 = FUN_004bd9f0(DAT_006d1da0, 0x54);
                  if (((DAT_0064bc60 & 8) !== 0)) {
                    FUN_004100cf(local_18);
                  }
                }
                wv(DAT_0062bcb0, 0);
                wv(DAT_006ad8d4, 0);
                return;
              }
              local_1c = FUN_005b2e69(local_24, local_10);
              if ((s8(_MEM[DAT_006560f7 + local_1c * 0x20]) === DAT_006d1da0)) {
                FUN_004897fa(0);
                FUN_00410d98(local_24, local_10);
                FUN_0058d442();
              }
              wv(DAT_00628054, 0);
              FUN_0041033a();
            }
            FUN_00410402(local_24, local_10);
          }
          wv(DAT_0062bcb0, 0);
          wv(DAT_006ad8d4, 0);
        }
        else {
          wv(DAT_006ad8d4, 0);
        }
      }
      else {
        FUN_005013bc();
        wv(DAT_006ad8d4, 0);
      }
    }
    else {
      FUN_005d225b(s_Map_3:_map_window_click()_blocke_00624f78);
      wv(DAT_006c31ac, 1);
      _DAT_006c31b0 = param_1;
      _DAT_006c31b4 = param_2;
      _DAT_006c31b8 = param_3;
      _DAT_006c31cc = FUN_005c62ee();
      if ((FUN_005c62ee() === 0)) {
        _DAT_006c31cc = 0;
      }
      else {
        _DAT_006c31cc = (FUN_005c62ee() + -72);
      }
    }
  }
  return;
}


 export function FUN_004116c1 (param_1, param_2)

 {
  FUN_00410f77(param_1, param_2, 0);
  return;
}


 export function FUN_004116e3 (param_1, param_2)

 {
  FUN_00410f77(param_1, param_2, 1);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00411705 (param_1, param_2)

 {
  let bVar1;
  let uVar2;
  let uVar3;
  let bVar4;
  let iVar5;
  let local_8;

  bVar1 = 0;
  if ((DAT_006ad8d4 !== 0)) {
    bVar1 = 1;
  }
  iVar5 = XD_InFlushSendBuffer();
  if ((DAT_006ad904 === 0)) {
    if ((!bVar1)) {
      wv(DAT_006ad8d4, 1);
    }
    if ((DAT_0062edf8 === 0)) {
      FUN_005c62ee();
      uVar3 = DAT_00624f60;
      uVar2 = DAT_00624f5c;
      iVar5 = FUN_004087c0(DAT_00624f5c, DAT_00624f60);
      if ((iVar5 !== 0)) {
        bVar4 = FUN_005b89bb(uVar2, uVar3);
        if ((u8(bVar4) === 2)) {
          iVar5 = FUN_0040bcb0(uVar2, uVar3);
          local_8 = u8((iVar5 !== 0));
        }
        else {
          local_8 = FUN_005b8ee1(uVar2, uVar3);
        }
        FUN_00491c20((local_8 * 0xb + u8(bVar4)));
      }
      if ((!bVar1)) {
        wv(DAT_006ad8d4, 0);
      }
    }
    else {
      FUN_005013bc();
      if ((!bVar1)) {
        wv(DAT_006ad8d4, 0);
      }
    }
  }
  else {
    FUN_005d225b(s_Map_3:_map_double_click()_blocke_00624fc0);
    wv(DAT_006c31ac, 2);
    _DAT_006c31b0 = param_1;
    _DAT_006c31b4 = param_2;
    _DAT_006c31cc = FUN_005c62ee();
    if ((FUN_005c62ee() === 0)) {
      _DAT_006c31cc = 0;
    }
    else {
      _DAT_006c31cc = (FUN_005c62ee() + -72);
    }
  }
  return;
}


 export function FUN_00411a13 (param_1)

 {
  let cVar1;
  let uVar2;
  let iVar3;
  let iVar4;

  uVar2 = FUN_005ae052((s8(_MEM[DAT_00628350 + param_1]) + ((DAT_0064b1b4) << 16 >> 16)));
  cVar1 = _MEM[DAT_00628360 + param_1];
  iVar4 = ((DAT_0064b1b0) << 16 >> 16);
  iVar3 = FUN_00410d98(uVar2, (s8(cVar1) + iVar4));
  if ((iVar3 !== 0)) {
    FUN_00410464(uVar2, (s8(cVar1) + iVar4));
  }
  return;
}


 export function FUN_00411a85 (param_1)

 {
  let iVar1;
  let iVar2;

  if ((param_1 === 0x20)) {
    if ((param_1 !== 0xd)) {
      iVar1 = FUN_0043cf76(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
      if ((-1 < iVar1)) {
        if (((_MEM[DAT_0064f346 + iVar1 * 0x58] & 0x40) !== 0)) {
          FUN_00509590(iVar1);
        }
        else {
          iVar2 = FUN_004bd9f0(DAT_006d1da0, 0x54);
          if (((DAT_0064bc60 & 8) !== 0)) {
            FUN_004100cf(iVar1);
          }
        }
      }
    }
    else {
      wv(DAT_0064b9bc, 0);
    }
  }
  else if ((param_1 === 0x43)) {
    FUN_00410402(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
  }
  return;
}


 export function FUN_00411bd7 ()

 {
  FUN_0044cc80(DAT_006d1da0);
  return;
}


 export function FUN_00411bf5 (param_1, param_2)

 {
  let iVar1;
  let iVar2;

  iVar1 = ((DAT_00655afe) << 16 >> 16);
  if ((param_1 === 0xd)) {
    /* switch */ () {
    case 0xd :
      iVar1 = FUN_0043cf76(((DAT_0064b1b4) << 16 >> 16), ((DAT_0064b1b0) << 16 >> 16));
      if ((-1 < iVar1)) {
        if (((_MEM[DAT_0064f346 + iVar1 * 0x58] & 0x40) !== 0)) {
          FUN_00509590(iVar1);
        }
        else {
          iVar2 = FUN_004bd9f0(DAT_006d1da0, 0x54);
          if (((DAT_0064bc60 & 8) !== 0)) {
            FUN_004100cf(iVar1);
          }
        }
      }
      break;
    case 0x20 :
      FUN_0058bd60();
      break;
    case 0x42 :
      FUN_0058be56();
      break;
    case 0x43 :
      FUN_00410402(((s16((DAT_006560f0 + iVar1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar1 * 0x20), 0)) << 16 >> 16));
      break;
    case 0x45 :
      FUN_0058c65e(0xa);
      break;
    case 0x46 :
      if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + iVar1 * 0x20]) * 0x14] === 5)) {
        FUN_0058c65e(4);
      }
      else {
        FUN_0058cce6();
      }
      break;
    case 0x47 :
      FUN_0058d6af();
      break;
    case 0x48 :
      FUN_0058cbe1();
      break;
    case 0x49 :
      FUN_0058c65e(6);
      break;
    case 0x4b :
      FUN_0058df14();
      break;
    case 0x4c :
      FUN_0058df7b();
      break;
    case 0x4d :
      FUN_0058c65e(7);
      break;
    case 0x4f :
      FUN_0058c65e(8);
      break;
    case 0x50 :
      if (((_MEM[DAT_0064b1bd + u8(_MEM[DAT_006560f6 + iVar1 * 0x20]) * 0x14] & 1) !== 0)) {
        FUN_0058d60a();
      }
      else if ((_MEM[DAT_0064b1ca + u8(_MEM[DAT_006560f6 + iVar1 * 0x20]) * 0x14] === 5)) {
        FUN_0058c65e(9);
      }
      else if ((param_2 === 0x50)) {
        FUN_0058cfcd();
      }
      break;
    case 0x51 :
      if ((DAT_00655b02 === 0)) {
        FUN_00411bd7();
      }
      break;
    case 0x52 :
      FUN_0058c65e(5);
      break;
    case 0x53 :
      FUN_0058cde5();
      break;
    case 0x55 :
      FUN_0058ddce();
      break;
    case 0x57 :
      FUN_0058bdfd();
    }
  }
  return;
}


 export function FUN_00411f91 (param_1)

 {
  let bVar1;
  let bVar2;
  let iVar3;

  bVar2 = param_1;
  if ((DAT_006252c4 === 0)) {
    return;
  }
  if ((DAT_006ad8d4 !== 0)) {
    return;
  }
  if ((DAT_006c31ac === 4)) {
    FUN_005d225b(s_Map_3:_map_ascii()_blocked_by_XD_00625008);
    wv(DAT_006c31c4, 3);
    wv(DAT_006c31c8, param_1);
    return;
  }
  wv(DAT_006ad8d4, 1);
  if ((DAT_0062edf8 !== 0)) {
    if ((param_1 === 0xd)) {
      wv(DAT_006ad8d4, 0);
      return;
    }
    if ((param_1 === 0x1b)) {
      wv(DAT_006ad8d4, 0);
      return;
    }
    if ((param_1 === 0xa)) {
      wv(DAT_006ad8d4, 0);
      return;
    }
    FUN_005013bc();
    wv(DAT_006ad8d4, 0);
    return;
  }
  iVar3 = IsTracking(DAT_006a91b8);
  if (((DAT_00655aea & 0x40) !== 0)) {
    /* switch */ () {
    case 0xd :
    case 0x45 :
    case 0x58 :
    case 0x65 :
    case 0x78 :
      FUN_0050bc4f(0);
      break;
    default :
      goto switchD_00412142_caseD_e;
    case 0x41 :
    case 0x43 :
    case 0x61 :
    case 99 :
      FUN_0050a473(0);
      break;
    case 0x42 :
    case 0x62 :
      FUN_00509b48(0);
      break;
    case 0x48 :
    case 0x68 :
      FUN_0050ba6a(0);
      break;
    case 0x49 :
    case 0x69 :
      FUN_0050b9a4(0);
      break;
    case 0x4d :
    case 0x6d :
      FUN_0050ba07(0);
      break;
    case 0x52 :
    case 0x72 :
      FUN_0050b74e(0);
      break;
    case 0x56 :
    case 0x76 :
      FUN_0050bacd(0);
    }
  }
  else {
 switchD_00412142_caseD_e: :
    FUN_00410a64();
    iVar3 = FUN_00410e0a();
    if ((param_1 !== 0x70)) {
      iVar3 = _isalpha(u8(param_1));
      if ((iVar3 !== 0)) {
        iVar3 = FID_conflict:__toupper_lk(u8(param_1));
        param_1 = ((iVar3) & 0xFF);
      }
      bVar1 = 0;
      /* switch */ () {
      case 0x43 :
        FUN_0040e017();
        break;
      case 0x44 :
        FUN_0058c295();
        break;
      default :
        bVar1 = 1;
        break;
      case 0x48 :
        if ((DAT_00655b02 !== 1)) {
          FUN_0044cd9b(DAT_006d1da0);
        }
        break;
      case 0x52 :
        FUN_0040e3b1();
        break;
      case 0x53 :
        if ((DAT_00655b02 !== 2)) {
          FUN_0047758c(0);
        }
        break;
      case 0x54 :
        FUN_0040ddc6(DAT_006d1da0);
        break;
      case 0x58 :
        wv(DAT_0066ca8c, 0xfffd);
        FUN_0047cd51(DAT_006d1da0, 1);
        break;
      case 0x5a :
        wv(DAT_0066ca8c, 0);
        wv(DAT_0066ca88, DAT_0064b1b4);
        wv(DAT_0066ca8a, DAT_0064b1b0);
        FUN_0047cd51(DAT_006d1da0, 1);
      }
      if (bVar1) {
        /* switch */ () {
        case 0x41 :
          FUN_0058d442();
          break;
        case 0x54 :
          FUN_004e2597();
          break;
        case 0x56 :
          if ((DAT_006d1da8 === 1)) {
            FUN_004897fa(0);
          }
          else {
            FUN_00489a0d(1);
          }
          break;
        case 0x58 :
          if ((0xfff9 < DAT_0066ca8c)) {
            wv(DAT_0066ca8c, (DAT_0066ca8c + 0xffff));
            FUN_0047cd51(DAT_006d1da0, 1);
          }
          break;
        case 0x5a :
          if ((DAT_0066ca8c < 8)) {
            wv(DAT_0066ca8c, (DAT_0066ca8c + 1));
            FUN_0047cd51(DAT_006d1da0, 1);
          }
        }
        if ((param_1 === 0x59)) {
          wv(DAT_00655b07, (DAT_00655b07 === 0));
          FUN_0047cf9e(DAT_006d1da0, 1);
        }
        if ((DAT_006d1da8 === 0)) {
          FUN_00411a85(param_1, bVar2);
        }
        else {
          FUN_00411bf5(param_1, bVar2);
        }
      }
    }
  }
  wv(DAT_006ad8d4, 0);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004125c6 (param_1)

 {
  let SVar1;
  let iVar2;
  let local_8;

  if ((DAT_006252c4 === 0)) {
    return;
  }
  if ((param_1 === 0xd0)) {
    iVar2 = IsTracking(DAT_006a91b8);
    if ((iVar2 === 0)) {
      FUN_0050bc4f(0);
      return;
    }
    return;
  }
  if ((DAT_006ad8d4 !== 0)) {
    return;
  }
  iVar2 = XD_InFlushSendBuffer();
  if ((DAT_006ad904 !== 0)) {
    FUN_005d225b(s_Map_3:_map_key()_blocked_by_XD_F_00625048);
    wv(DAT_006c31ac, 4);
    _DAT_006c31b0 = param_1;
    wv(DAT_006c31c4, 0);
    return;
  }
  wv(DAT_006ad8d4, 1);
  local_8 = -1;
  if ((DAT_0062edf8 !== 0)) {
    if ((param_1 !== 0xd0)) {
      FUN_005013bc();
      wv(DAT_006ad8d4, 0);
      return;
    }
    iVar2 = IsTracking(DAT_006a91b8);
    if ((iVar2 !== 0)) {
      wv(DAT_006ad8d4, 0);
      return;
    }
    FUN_0050bc4f(0);
    wv(DAT_006ad8d4, 0);
    return;
  }
  if ((param_1 === 0x100)) {
    wv(DAT_006ad8d4, 0);
    return;
  }
  if ((param_1 === 0)) {
    wv(DAT_006ad8d4, 0);
    return;
  }
  FUN_00410a64();
  FUN_00410ed8();
  iVar2 = IsTracking(DAT_006a91b8);
  if (((DAT_00655aea & 0x40) !== 0)) {
    /* switch */ () {
    case 0xa2 :
    case 0xa6 :
    case 0xc1 :
    case 0xc3 :
      FUN_0050bd13(0);
      wv(DAT_006ad8d4, 0);
      return;
    case 0xa4 :
    case 0xa8 :
    case 0xc0 :
    case 0xc2 :
      FUN_0050bf72(0);
      wv(DAT_006ad8d4, 0);
      return;
    }
  }
  if ((param_1 < 0xd3)) {
    if ((param_1 === 0xd2)) {
      iVar2 = IsTracking(DAT_006a91b8);
      if ((iVar2 === 0)) {
        FUN_0050994f();
      }
    }
    else {
      /* switch */ () {
      case 0xb0 :
        FUN_0042d71e(DAT_006d1da0);
        break;
      case 0xb1 :
        FUN_0042f079(DAT_006d1da0);
        break;
      case 0xb2 :
        FUN_004308ae(DAT_006d1da0);
        break;
      case 0xb3 :
        FUN_0042e185(DAT_006d1da0);
        break;
      case 0xb4 :
        FUN_0042cd2f(DAT_006d1da0);
        break;
      case 0xb5 :
        FUN_0042b67d(DAT_006d1da0);
        break;
      case 0xb6 :
        FUN_00431c73(DAT_006d1da0);
        break;
      case 0xb7 :
        FUN_00433122(DAT_006d1da0);
        break;
      case 0xb8 :
        FUN_00435d15(DAT_006d1da0);
        if ((DAT_00655b07 !== 0)) {
          FUN_004361cc(DAT_006d1da0);
          FUN_00431d22();
        }
        break;
      case 0xba :
        FUN_00434d8a(DAT_006d1da0);
        break;
      case 0xbb :
        if (((DAT_00655ae8 & 0x80) === 0)) {
          FUN_00598b4e(DAT_006d1da0);
        }
      }
    }
  }
  else if ((param_1 < 0x355)) {
    if ((param_1 === 0x354)) {
      if (((((SVar1 >>> 8)) & 0xFF) === 0)) {
        FUN_00516570(DAT_006d1da0, 0);
      }
      else {
        FUN_00516570(DAT_006d1da0, 1);
      }
    }
    else {
      /* switch */ () {
      case 0x243 :
        if ((2 < DAT_00655b02)) {
          FUN_004b7eb6(0, 4);
        }
        break;
      case 0x244 :
        FUN_0043856b(DAT_006d1da0);
        break;
      case 0x245 :
        FUN_004e1452();
        break;
      case 0x246 :
        if ((DAT_00655b02 === 0)) {
          FUN_00553ff6();
        }
        break;
      case 0x247 :
        wv(DAT_00655aea, (DAT_00655aea ^ 0x20));
        FUN_0057940d(0x327, (((DAT_00655aea ^ 0x20) & 0x20) >>> 5));
        FUN_0047cf9e(DAT_006d1da0, 1);
        wv(DAT_0064bc1e, (DAT_00655aea ^ 0x20));
        FUN_004a73d9();
        break;
      case 0x248 :
        if ((iVar2 !== 0)) {
          FUN_0046e6a9();
          FUN_00484d3b();
        }
        break;
      case 0x24a :
        if ((DAT_00655b02 === 1)) {
          FUN_00522b2b();
        }
        break;
      case 0x24b :
        if ((DAT_0062eb30 !== 0)) {
          FUN_00554297();
        }
        break;
      case 0x24c :
        if ((DAT_00655b02 === 0)) {
          FUN_004e068d();
        }
        break;
      case 0x24e :
        FUN_0058bd84();
        break;
      case 0x24f :
        FUN_004e0ab0();
        break;
      case 0x250 :
        FUN_004e0d71();
        break;
      case 0x251 :
        FUN_004e22c9(0);
        break;
      case 0x252 :
        FUN_004e22c9(1);
        break;
      case 0x253 :
        if ((DAT_00655b02 !== 2)) {
          FUN_0047758c(0);
        }
        break;
      case 0x254 :
        if ((DAT_006ad2f7 !== 0)) {
          FUN_0055b2c6();
        }
        break;
      case 599 :
        FUN_0049836a(DAT_006d1da0);
        break;
      case 600 :
        wv(DAT_0066ca8c, 0xfff9);
        FUN_0047cd51(DAT_006d1da0, 1);
        break;
      case 0x259 :
        if ((DAT_00655b02 !== 0)) {
          FUN_004e0f18();
        }
        break;
      case 0x25a :
        wv(DAT_0066ca8c, 8);
        FUN_0047cd51(DAT_006d1da0, 1);
      }
    }
  }
  if ((DAT_00655b02 !== 0)) {
    if ((param_1 === 0x331)) {
      FUN_00417566();
      goto switchD_00412ef0_default;
    }
    /* switch */ () {
    case 0x1b0 :
      FUN_005551b3();
      break;
    case 0x1b1 :
      FUN_0055560f();
      break;
    case 0x1b2 :
      FUN_0055583f();
      break;
    case 0x1b3 :
      FUN_00555a02();
      break;
    case 0x1b4 :
      FUN_00555a8b();
      break;
    case 0x1b5 :
      FUN_00554423();
      break;
    case 0x1b6 :
      FUN_00554962();
      break;
    case 0x1b7 :
      wv(DAT_00633678, -1);
      goto switchD_00412f3a_caseD_3b7;
    case 0x1b8 :
      FUN_0055615c();
    }
  }
  else {
    /* switch */ () {
    case 0x332 :
      FUN_00429e77();
      break;
    case 0x333 :
      FUN_0058760d();
      break;
    case 0x334 :
      FUN_004da9e2();
      break;
    case 0x335 :
      FUN_0051c635();
      break;
    case 0x336 :
      FUN_004a5d92();
      break;
    case 0x337 :
      FUN_005b1a29();
      break;
    case 0x338 :
      FUN_0054ffc8();
      break;
    case 0x343 :
      FUN_005569e3();
      break;
    case 0x344 :
      FUN_00555cb1();
      break;
    case 0x34b :
      FUN_00556f54();
      break;
    case 0x350 :
      FUN_005582ad();
      break;
    case 0x353 :
      FUN_0055891d();
      break;
    case 0x355 :
      FUN_0055625b();
      break;
    case 0x3b5 :
      FUN_005545d3();
      break;
    case 0x3b7 :
 switchD_00412f3a_caseD_3b7: :
      FUN_0055499f();
    }
  }
 switchD_00412ef0_default: :
  /* switch */ () {
  case 0xa1 :
  case 199 :
    local_8 = 4;
    break;
  case 0xa2 :
  case 0xc1 :
    local_8 = 3;
    break;
  case 0xa3 :
  case 0xc6 :
    local_8 = 2;
    break;
  case 0xa4 :
  case 0xc2 :
    local_8 = 5;
    break;
  case 0xa6 :
  case 0xc3 :
    local_8 = 1;
    break;
  case 0xa7 :
  case 0xc4 :
    local_8 = 6;
    break;
  case 0xa8 :
  case 0xc0 :
    local_8 = 7;
    break;
  case 0xa9 :
  case 0xc5 :
    local_8 = 0;
  }
  if ((-1 < local_8)) {
    if ((DAT_006d1da8 === 1)) {
      FUN_0059062c(((DAT_00655afe) << 16 >> 16), local_8, 3);
    }
    else {
      FUN_00411a13(local_8);
    }
  }
  wv(DAT_006ad8d4, 0);
  return;
}


 export function FUN_004131c0 ()

 {
  if ((2 < DAT_00655b02)) {
    FUN_0047e94e(1, 1);
  }
  if ((DAT_00628044 !== 0)) {
    if ((DAT_0062804c !== 0)) {
      wv(DAT_00628054, (DAT_00628054 === 0));
      FUN_0041033a();
    }
  }
  else {
    wv(DAT_0062805c, 0);
  }
  return;
}


 export function FUN_0041325d ()

 {
  if ((DAT_00628044 !== 0)) {
    wv(DAT_00628058, (DAT_00628058 === 0));
    FUN_00568f43(1);
  }
  return;
}


 export function FUN_004132b7 ()

 {
  let iVar1;
  let iVar2;
  let local_14;
  let local_c;

  iVar1 = FUN_004080c0();
  iVar2 = FUN_00407f90(DAT_00655324);
  local_14 = FUN_00414bb0();
  local_14 = (local_14 + 1);
  local_c = 0;
  if ((DAT_00628060 !== 0)) {
    local_c = (DAT_0064bcf4 + 1);
    local_14 = (local_14 - (DAT_0064bcf4 + 1));
  }
  FUN_004086c0(DAT_006552a4, 0, local_c, (iVar1 - iVar2), local_14);
  return;
}


 export function FUN_00413350 ()

 {
  let bVar1;
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  bVar1 = (s32((local_8 + 0x2d8), 0) === 0);
  if (bVar1) {
    FUN_00408090();
  }
  else {
    w16((local_8 + 0x2dc), 0, 0);
  }
  return (!bVar1);
}


 export function FUN_004133c2 ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004080f0((DAT_006552a4 + s32((local_8 + 0x2d8), 0) * 0x10));
  return;
}


 export function FUN_0041341c ()

 {
  let local_8;

  local_8 = FUN_005c62ee();
  if ((local_8 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (local_8 + -72);
  }
  FUN_004080f0((DAT_006552a4 + s32((local_8 + 0x2d8), 0) * 0x10));
  return;
}


 export function FUN_00413476 (in_ECX)

 {
  let bVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_c;
  let local_8;

  local_8 = u8(((s16((in_ECX + 0x2de), 0) & 1) !== 0));
  if (((s16((in_ECX + 0x2de), 0) & 2) !== 0)) {
    local_8 = (local_8 + 2);
  }
  FUN_0040bbb0();
  if ((s32((in_ECX + 0x2d8), 0) === 0)) {
    if ((DAT_00628064 !== 1)) {
      uVar2 = FUN_00410070(DAT_006d1da0);
      FUN_00414d70(uVar2);
      if ((DAT_00628064 === 2)) {
        FUN_0040bbe0(DAT_00625090);
      }
      FUN_0040fe10();
    }
    bVar1 = 0;
    for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
      if ((s16((DAT_0066ca84 + local_c * 0x3f0), 0) !== 0)) {
        bVar1 = 1;
        break;
      }
    }
  }
  else {
    bVar1 = 1;
  }
  FUN_0040bc10(4);
  if (bVar1) {
    FUN_0040fe40();
    FUN_0040bc10((local_8 + 0x12c));
  }
  FUN_0055324c(DAT_00679640);
  return;
}


 export function FUN_004135ab (param_1)

 {
  let local_8;

  if ((DAT_006ad8d4 === 0)) {
    wv(DAT_006ad8d4, 1);
    local_8 = FUN_005c62ee();
    if ((local_8 === 0)) {
      local_8 = 0;
    }
    else {
      local_8 = (local_8 + -72);
    }
    /* switch */ () {
    case 1 :
      w16((local_8 + 0x2dc), 0, 0);
      FUN_004083b0();
      FUN_00413476();
      FUN_005bb574();
      break;
    case 2 :
      if ((s16((local_8 + 0x2e4), 0) < 8)) {
        w16((local_8 + 0x2e4), 0, (s16((local_8 + 0x2e4), 0) + 1));
        FUN_0047cd51(DAT_006d1da0, 1);
      }
      break;
    case 3 :
      if ((0xfff9 < s16((local_8 + 0x2e4), 0))) {
        w16((local_8 + 0x2e4), 0, (s16((local_8 + 0x2e4), 0) + 0xffff));
        FUN_0047cd51(DAT_006d1da0, 1);
      }
      break;
    case 4 :
      w16((local_8 + 0x2de), 0, ((s16((local_8 + 0x2de), 0) + 1) & 3));
      FUN_00413476();
      FUN_0047cd51(DAT_006d1da0, 1);
    }
    wv(DAT_006ad8d4, 0);
  }
  return;
}


 export function FUN_00413717 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;
  let uVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_00479ede(s32((in_ECX + 0x2d8), 0));
  if ((DAT_00655280 === 0)) {
    w16((in_ECX + 0x2e4), 0, 0);
    if ((0x3e7 < DAT_006ab198)) {
      w16((in_ECX + 0x2e4), 0, 2);
    }
    if ((s32((in_ECX + 0x2d8), 0) === 0)) {
      FUN_004132b7();
    }
  }
  if ((s32((in_ECX + 0x2d8), 0) === 0)) {
    w16((in_ECX + 0x2de), 0, 3);
  }
  else {
    w16((in_ECX + 0x2de), 0, 2);
  }
  if ((s16((in_ECX + 0x2dc), 0) !== 0)) {
    local_8 = s32((DAT_006552a4 + s32((in_ECX + 0x2d8), 0) * 0x10), 0);
    local_c = s32((DAT_006552a8 + s32((in_ECX + 0x2d8), 0) * 0x10), 0);
    local_10 = FUN_00407f90((DAT_006552a4 + s32((in_ECX + 0x2d8), 0) * 0x10));
    local_10 = (local_10 - DAT_006335a0);
    local_14 = FUN_00407fc0((DAT_006552a4 + s32((in_ECX + 0x2d8), 0) * 0x10));
    local_14 = (local_14 - DAT_006335a4);
  }
  else {
    local_8 = s32((in_ECX + 0x2d8), 0) * 0x28;
    local_c = s32((in_ECX + 0x2d8), 0) * 0x28;
    local_10 = 0x1f4;
    local_14 = 0x12c;
    FUN_004086c0((DAT_006552a4 + s32((in_ECX + 0x2d8), 0) * 0x10), local_8, local_c, (DAT_006335a0 + 0x1f4), (DAT_006335a4 + 0x12c));
  }
  w16((in_ECX + 0x2dc), 0, 1);
  uVar5 = 0;
  uVar4 = 0;
  uVar3 = 6;
  uVar2 = 6;
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x10), 0), 6, local_8, local_c, local_10, local_14, 6, 0, 0);
  FUN_005534bc(uVar1, uVar2, local_8, local_c, local_10, local_14, uVar3, uVar4, uVar5);
  FUN_00408370(0x100, 0x80);
  in_ECX = EnableStackedTabs(in_ECX, 0x402315);
  FUN_00408130(LAB_004030c6);
  FUN_00408170(LAB_004018d9);
  FUN_00414c20(LAB_00402d9c);
  FUN_00414c60(LAB_00401a7d);
  FUN_00414be0(LAB_004014e7);
  FUN_00414ca0(thunk_FUN_00411705);
  tie(thunk_FUN_00411f91);
  in_ECX = (in_ECX + 0x58);
  FUN_00408230(LAB_0040235b);
  FUN_004082f0(LAB_00403b43);
  FUN_00408330(LAB_00402653);
  FUN_00413476();
  if ((s32((in_ECX + 0x2d8), 0) !== 0)) {
    FUN_0055318c(DAT_00645120, 1);
  }
  FUN_0055318c(DAT_00648820, 2);
  FUN_0055318c(DAT_00647788, 3);
  if ((s32((in_ECX + 0x2d8), 0) !== 0)) {
    FUN_0055318c(DAT_00647348, 4);
  }
  in_ECX = EnableStackedTabs(in_ECX, 0x403cd8);
  FUN_005bb574();
  if ((DAT_00655b02 !== 1)) {
    FUN_004085f0();
  }
  if ((s32((in_ECX + 0x2d8), 0) !== 0)) {
    FUN_00413476();
    FUN_005bb574();
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00413a90 ()

 {
  let local_8;

  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    FUN_00479ede(local_8);
    if ((DAT_00628048 === 0)) {
      if ((local_8 === 0)) {
        _DAT_0066ca84 = 1;
      }
      else {
        w16((DAT_0066ca84 + local_8 * 0x3f0), 0, 0);
      }
    }
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      FUN_00413717();
    }
  }
  _DAT_0066c98c = 1;
  if ((DAT_00654b70 !== 0)) {
    wv(DAT_0066c988, 1);
  }
  wv(DAT_00637ef8, 1);
  wv(DAT_0063cbc4, FUN_005d1f50(LAB_0040364d, 0x96, -1));
  wv(DAT_0063cbc0, FUN_005d1f50(LAB_00402540, 0x1f4, -1));
  wv(DAT_00637ef8, 0);
  return;
}


 export function FUN_00413bd1 ()

 {
  let local_8;

  wv(DAT_00637ef8, 1);
  FUN_005d2004(DAT_0063cbc4);
  FUN_005d2004(DAT_0063cbc0);
  wv(DAT_00637ef8, 0);
  for (/* cond: (local_8 < 8) */); local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
    if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
      FUN_004083b0();
    }
  }
  return;
}


 export function FUN_00414b70 (in_ECX, param_1, param_2)

 {
  // in_ECX promoted to parameter;

  FUN_005bcfdd(s32((in_ECX + 8), 0), param_1, param_2);
  return;
}


 export function FUN_00414bb0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005bc96b(s32((in_ECX + 8), 0));
  return;
}


 export function FUN_00414be0 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32(in_ECX, 0);
  w32(in_ECX, 0, param_1);
  return uVar1;
}


 export function FUN_00414c20 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 4), 0);
  w32((in_ECX + 4), 0, param_1);
  return uVar1;
}


 export function FUN_00414c60 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 8), 0);
  w32((in_ECX + 8), 0, param_1);
  return uVar1;
}


 export function FUN_00414ca0 (in_ECX, param_1)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = s32((in_ECX + 0x1c), 0);
  w32((in_ECX + 0x1c), 0, param_1);
  return uVar1;
}


 export function FUN_00414ce0 ()

 {
  let uVar1;

  uVar1 = FUN_00414d10();
  FUN_005bd533(uVar1);
  return;
}


 export function FUN_00414d10 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 8), 0);
}


 export function FUN_00414d40 ()

 {
  let uVar1;

  uVar1 = FUN_00414d10();
  FUN_005bd550(uVar1);
  return;
}


 export function FUN_00414d70 (param_1)

 {
  FUN_004af174(DAT_00679640, param_1);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* void */  /* __thiscall */
 /* CPropertySheet::EnableStackedTabs(int) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function EnableStackedTabs (this, param_1)

 {
  w32((this + 0x2a8), 0, param_1);
  return;
}


 export function FUN_00414dd0 (param_1, param_2)

 {
  FUN_004a6cc5(DAT_006359d4, param_1, 0, param_2);
  return;
}


 /* /*  Library */  /* Function */  /* - */  /* Single */
 /* Match */     /* public: */  /* int */  /* __thiscall */
 /* CSplitterWnd::IsTracking(void) */
    /* Library: */  /* Visual */  /* Studio */  /* 1998 */

 /* Debug  */ */ export function IsTracking (this)

 {
  return s32((this + 0x15a4), 0);
}


 export function FUN_00414e30 (param_1, param_2, param_3)

 {
  let uVar1;
  let bVar2;
  let local_c;

  do {
    bVar2 = 0;
    for (/* cond: (local_c < (param_1 + -1)) */); (bVar2 = (!bVar2) && (local_c = (local_c < (param_1 + -1)))); local_c = (local_c + 1)) {
      if ((_MEM[((local_c + 1) + param_3)] < _MEM[(local_c + param_3)])) {
        uVar1 = _MEM[(local_c + param_3)];
        _MEM[(local_c + param_3)] = _MEM[((local_c + 1) + param_3)];
        _MEM[((local_c + 1) + param_3)] = uVar1;
        uVar1 = _MEM[(local_c + param_2)];
        _MEM[(local_c + param_2)] = _MEM[((local_c + 1) + param_2)];
        _MEM[((local_c + 1) + param_2)] = uVar1;
        bVar2 = 1;
      }
    }
  } while (bVar2);
  return;
}


 export function FUN_00414f02 (param_1, param_2, param_3)

 {
  let uVar1;
  let bVar2;
  let local_c;

  do {
    bVar2 = 0;
    for (/* cond: (local_c < (param_1 + -1)) */); (bVar2 = (!bVar2) && (local_c = (local_c < (param_1 + -1)))); local_c = (local_c + 1)) {
      if ((s32(((param_3 + 4) + local_c * 4), 0) < s32((param_3 + local_c * 4), 0))) {
        uVar1 = s32((param_3 + local_c * 4), 0);
        w32((param_3 + local_c * 4), 0, s32(((param_3 + 4) + local_c * 4), 0));
        w32(((param_3 + 4) + local_c * 4), 0, uVar1);
        uVar1 = s32((param_2 + local_c * 4), 0);
        w32((param_2 + local_c * 4), 0, s32(((param_2 + 4) + local_c * 4), 0));
        w32(((param_2 + 4) + local_c * 4), 0, uVar1);
        bVar2 = 1;
      }
    }
  } while (bVar2);
  return;
}


 export function FUN_00415040 (param_1, param_2)

 {
  if ((DAT_00625114 === 0)) {
    FUN_005f22d0(param_1, param_2);
  }
  else {
    FUN_005badf0(param_1, DAT_006250d8, param_2);
  }
  return param_1;
}


 export function FUN_0041508c (param_1, param_2)

 {
  let pFVar1;
  let local_8c;

  FUN_00415040(DAT_ffffff74, param_1);
  FUN_005f22d0(DAT_006347c0, DAT_ffffff74);
  pFVar1 = _fopen(DAT_ffffff74, param_2);
  wv(DAT_00634810, u8((pFVar1 === 0)));
  return pFVar1;
}


 export function FUN_00415105 (param_1)

 {
  let _FileHandle;
  let lVar1;

  _FileHandle = FUN_006076a0(param_1);
  lVar1 = __filelength(_FileHandle);
  return lVar1;
}


 export function FUN_00415133 (param_1)

 {
  let _File;

  _File = FUN_0041508c(param_1, DAT_00625118);
  if ((_File !== 0)) {
    _fclose(_File);
  }
  return (_File !== 0);
}


 export function FUN_004151e0 ()

 {
  let _Source;
  let _Count;
  let local_8;

  for (/* cond: (local_8 < 0x64) */); local_8 = (local_8 < 0x64); local_8 = (local_8 + 1)) {
    _Count = 0x28;
    _Source = FUN_00428b0c(s32((DAT_00627684 + local_8 * 0x10), 0));
    _strncpy((DAT_006a1d88 + local_8 * 0x28), _Source, _Count);
    _MEM[DAT_006a1daf + local_8 * 0x28] = 0;
    w32((DAT_006a2d28 + local_8 * 0x58), 0, s8(_MEM[DAT_0062768e + local_8 * 0x10]));
    w32((DAT_006a2d2c + local_8 * 0x58), 0, s8(_MEM[DAT_0062768f + local_8 * 0x10]));
    w32((DAT_006a2d30 + local_8 * 0x58), 0, s8(_MEM[DAT_0062768d + local_8 * 0x10]));
    w32((DAT_006a2d34 + local_8 * 0x58), 0, s8(_MEM[DAT_0062768c + local_8 * 0x10]));
    w32((DAT_006a2d38 + local_8 * 0x58), 0, s8(_MEM[DAT_0062768a + local_8 * 0x10]));
    w32((DAT_006a2d3c + local_8 * 0x58), 0, s8(_MEM[DAT_0062768b + local_8 * 0x10]));
  }
  return;
}


 export function FUN_00415307 ()

 {
  let _Dest;
  let _Source;
  let _Count;
  let local_8;

  for (/* cond: (local_8 < 0x64) */); local_8 = (local_8 < 0x64); local_8 = (local_8 + 1)) {
    _Count = 0x14;
    _Source = (DAT_006a1d88 + local_8 * 0x28);
    _Dest = FUN_00428b0c(s32((DAT_00627684 + local_8 * 0x10), 0));
    _strncpy(_Dest, _Source, _Count);
    _MEM[DAT_0062768e + local_8 * 0x10] = _MEM[DAT_006a2d28 + local_8 * 0x58];
    _MEM[DAT_0062768f + local_8 * 0x10] = _MEM[DAT_006a2d2c + local_8 * 0x58];
    _MEM[DAT_0062768d + local_8 * 0x10] = _MEM[DAT_006a2d30 + local_8 * 0x58];
    _MEM[DAT_0062768c + local_8 * 0x10] = _MEM[DAT_006a2d34 + local_8 * 0x58];
    _MEM[DAT_0062768a + local_8 * 0x10] = _MEM[DAT_006a2d38 + local_8 * 0x58];
    _MEM[DAT_0062768b + local_8 * 0x10] = _MEM[DAT_006a2d3c + local_8 * 0x58];
  }
  return;
}


 export function FUN_0041541a ()

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_8;

  for (/* cond: (local_14 < 7) */); local_14 = (local_14 < 7); local_14 = (local_14 + 1)) {
    if ((s32((DAT_00625160 + local_14 * 8), 0) === 9)) {
      iVar1 = FUN_00418740();
      _sprintf(DAT_fffffff0, DAT_006251a8, s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0));
      FUN_00418a30(DAT_fffffff0);
    }
    else if ((s32((DAT_00625160 + local_14 * 8), 0) === 0xc)) {
      iVar1 = FUN_00418740();
      local_8 = s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0);
      if ((local_14 < 3)) {
        local_8 = (local_8 + 2);
      }
      FUN_00418d90(local_8);
    }
  }
  return;
}


 export function FUN_0041557b ()

 {
  let iVar1;
  let uVar2;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  local_14 = 0;
  for (/* cond: (local_18 < 7) */); local_18 = (local_18 < 7); local_18 = (local_18 + 1)) {
    if ((s32((DAT_00625160 + local_18 * 8), 0) === 9)) {
      FUN_00418a70(DAT_fffffff0);
      local_8 = _atoi(DAT_fffffff0);
      iVar1 = FUN_00418740();
      iVar1 = (iVar1 + -0xca);
      uVar2 = FUN_005adfa0(local_8, s32((DAT_00625188 + iVar1 * 4), 0), s32((DAT_00625190 + iVar1 * 4), 0));
      w32((DAT_006a2d28 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0, uVar2);
      iVar1 = FUN_00418740();
      if ((s32((DAT_006a2a00 + (iVar1 * 4 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58)), 0) !== local_8)) {
        local_14 = (local_14 + 1);
      }
    }
    else if ((s32((DAT_00625160 + local_18 * 8), 0) === 0xc)) {
      local_8 = FUN_00418d60();
      if ((local_18 < 3)) {
        local_8 = (local_8 + -2);
      }
      iVar1 = FUN_00418740();
      w32((DAT_006a2a00 + (s32((DAT_006a4f88 + 0x2ec), 0) * 0x58 + iVar1 * 4)), 0, local_8);
    }
  }
  return local_14;
}


 export function FUN_00415765 ()

 {
  FUN_00416828();
  return;
}


 export function FUN_00415780 (param_1)

 {
  let pcVar1;
  let sVar2;
  let local_c;
  let local_8;

  for (/* cond: (local_8 < 0x64) */); local_8 = (local_8 < 0x64); local_8 = (local_8 + 1)) {
    FUN_0040bbb0();
    FUN_0040ff00(s32((DAT_00627684 + local_8 * 0x10), 0));
    FUN_005f22e0(DAT_00679640, DAT_006251ac);
    pcVar1 = FUN_00428b0c(s32((DAT_00627684 + local_8 * 0x10), 0));
    sVar2 = _strlen(pcVar1);
    if ((sVar2 < 0x13)) {
      pcVar1 = FUN_00428b0c(s32((DAT_00627684 + local_8 * 0x10), 0));
      local_c = _strlen(pcVar1);
    }
    else {
      local_c = 0x13;
    }
    FUN_004190a0((0x13 - local_c));
    FUN_0040ff30(s8(_MEM[DAT_0062768a + local_8 * 0x10]));
    FUN_005f22e0(DAT_00679640, DAT_006251b0);
    FUN_004ccdb6(s8(_MEM[DAT_0062768b + local_8 * 0x10]));
    FUN_005f22e0(DAT_00679640, DAT_006251b4);
    FUN_004ccdef(s8(_MEM[DAT_0062768e + local_8 * 0x10]), 1);
    FUN_0040fe10();
    FUN_004ccdef(s8(_MEM[DAT_0062768f + local_8 * 0x10]), 1);
    FUN_0040fe10();
    FUN_0040ff30(s8(_MEM[DAT_0062768d + local_8 * 0x10]));
    FUN_005f22e0(DAT_00679640, DAT_006251b8);
    FUN_0040ff30(s8(_MEM[DAT_0062768c + local_8 * 0x10]));
    FUN_005f22e0(DAT_00679640, s_;_006251bc);
    FUN_004ccdef(local_8, 0);
    FUN_005f22e0(DAT_00679640, DAT_006251c4);
    _fputs(DAT_00679640, param_1);
  }
  return 1;
}


 export function FUN_00415952 ()

 {
  let bVar1;
  let local_14;
  let local_10;
  let local_c;

  wv(DAT_00655b1a, 0);
  for (/* cond: (local_10 < 0x64) */); local_10 = (local_10 < 0x64); local_10 = (local_10 + 1)) {
    if ((_MEM[DAT_00627689 + local_10 * 0x10] !== 0)) {
      wv(DAT_00655b1a, (DAT_00655b1a + 1));
      for (/* cond: (local_c < 2) */); local_c = (local_c < 2); local_c = (local_c + 1)) {
        local_14 = s8(_MEM[DAT_0062768e + (local_c + local_10 * 0x10)]);
        bVar1 = 0;
        while ((!bVar1)) {
          if ((_MEM[DAT_00627689 + local_14 * 0x10] === 0)) {
            local_14 = s8(_MEM[DAT_0062768e + local_14 * 0x10]);
          }
          else {
            bVar1 = 1;
          }
        }
        _MEM[DAT_0062768e + (local_c + local_10 * 0x10)] = ((local_14) & 0xFF);
      }
    }
  }
  return;
}


 export function FUN_00415a40 ()

 {
  let iVar1;
  let hWnd;
  let lpText;
  let lpCaption;
  let uType;
  let local_28;
  let local_24;

  iVar1 = FUN_0041557b();
  if ((iVar1 === 0)) {
    FUN_00415307();
    FUN_00415952();
    FUN_004ccab9(s_CIVILIZE_006251d0, LAB_00401be5);
    iVar1 = FUN_004ccf2d();
    if ((iVar1 === 0)) {
      _sprintf(DAT_ffffffdc, s_Error_updating_RULES.%s_006251dc, DAT_0062cd24);
      uType = 0x10;
      lpCaption = s_File_I/O_Error_006251f4;
      lpText = DAT_ffffffdc;
      iVar1 = FUN_00414d10();
      FUN_006e7dd4(s32((iVar1 + 4), 0), lpText, lpCaption, uType);
    }
    wv(DAT_006a1d7c, 0);
    wv(DAT_006a4f88, (DAT_006a4f88 + 0x48));
    FUN_004e4ceb();
  }
  else {
    FUN_0041541a();
    FUN_00415765();
    if ((DAT_006a4f88 === 0)) {
      local_28 = 0;
    }
    else {
      local_28 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_28);
    FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_006251c8);
    FUN_0059d3c9(0);
    hWnd = FUN_00418770();
    FUN_006e7d94(hWnd);
  }
  return;
}


 export function FUN_00415b52 ()

 {
  let bVar1;
  let bVar2;
  let uVar3;
  let local_64;
  let local_60;
  let local_54;

  bVar2 = 0;
  bVar1 = 0;
  FUN_00419060();
  for (/* cond: (local_60 < 0x3e) */); local_60 = (local_60 < 0x3e); local_60 = (local_60 + 1)) {
    if ((s8(_MEM[DAT_0064b1cb + local_60 * 0x14]) === s32((DAT_006a4f88 + 0x2ec), 0))) {
      if ((!bVar1)) {
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x808), 0));
        FUN_00419020(uVar3);
        bVar1 = 1;
      }
      uVar3 = FUN_00428b0c(s32((DAT_0064b1b8 + local_60 * 0x14), 0));
      FUN_00419020(uVar3);
    }
  }
  for (/* cond: (local_64 < 0x64) */); local_64 = (local_64 < 0x64); local_64 = (local_64 + 1)) {
    if ((s8(_MEM[DAT_0062768e + local_64 * 0x10]) === s32((DAT_006a4f88 + 0x2ec), 0))) {
      if ((!bVar2)) {
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x80c), 0));
        FUN_00419020(uVar3);
        bVar2 = 1;
      }
      if ((_MEM[DAT_0062768f + local_64 * 0x10] < 0)) {
        uVar3 = FUN_00428b0c(s32((DAT_00627684 + local_64 * 0x10), 0));
        _sprintf(DAT_ffffffac, DAT_00625210, uVar3);
      }
      else {
        uVar3 = FUN_00428b0c(s32((DAT_00627684 + s8(_MEM[DAT_0062768f + local_64 * 0x10]) * 0x10), 0))
        ;
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x1ec), 0), uVar3);
        uVar3 = FUN_00428b0c(s32((DAT_00627684 + local_64 * 0x10), 0), uVar3);
        _sprintf(DAT_ffffffac, s_%s_(%s_%s)_00625204, uVar3);
      }
      FUN_00419020(DAT_ffffffac);
    }
    else if ((s8(_MEM[DAT_0062768f + local_64 * 0x10]) === s32((DAT_006a4f88 + 0x2ec), 0))) {
      if ((!bVar2)) {
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x80c), 0));
        FUN_00419020(uVar3);
        bVar2 = 1;
      }
      if ((_MEM[DAT_0062768e + local_64 * 0x10] < 0)) {
        uVar3 = FUN_00428b0c(s32((DAT_00627684 + local_64 * 0x10), 0));
        _sprintf(DAT_ffffffac, DAT_00625220, uVar3);
      }
      else {
        uVar3 = FUN_00428b0c(s32((DAT_00627684 + s8(_MEM[DAT_0062768e + local_64 * 0x10]) * 0x10), 0))
        ;
        uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x1ec), 0), uVar3);
        uVar3 = FUN_00428b0c(s32((DAT_00627684 + local_64 * 0x10), 0), uVar3);
        _sprintf(DAT_ffffffac, s_%s_(%s_%s)_00625214, uVar3);
      }
      FUN_00419020(DAT_ffffffac);
    }
  }
  return;
}


 export function FUN_00415e53 ()

 {
  let iVar1;
  let sVar2;
  let uVar3;
  let local_134;
  let local_130;
  let local_12c;
  let local_119;
  let local_118;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  iVar1 = s32((DAT_006a4f88 + 0x2ec), 0);
  _strncpy(DAT_fffffed4, (DAT_006a1d88 + iVar1 * 0x28), 0x14);
  local_119 = 0;
  do {
    if ((DAT_006a4f88 === 0)) {
      local_134 = 0;
    }
    else {
      local_134 = (DAT_006a4f88 + 0x48);
    }
    FUN_005a6c23(local_134);
    local_8 = FUN_0051d63b(s_DEBUG_006359dc, s_TECHNAME_00625224, 0x13, DAT_fffffed4, DAT_fffffee8);
    FUN_005a6c45();
    if ((local_8 === -1));
  } while ((sVar2 === 0));
  if ((-1 < local_8)) {
    FUN_005f22d0((DAT_006a1d88 + iVar1 * 0x28), DAT_fffffee8);
    local_c = FUN_00418d60();
    local_10 = FUN_00418d60();
    local_14 = FUN_00418d60();
    FUN_00418d20();
    FUN_00418d20();
    FUN_00418d20();
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7c4), 0));
    FUN_00418ce0(uVar3);
    uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7c4), 0));
    FUN_00418ce0(uVar3);
    for (/* cond: (local_130 < 0x64) */); local_130 = (local_130 < 0x64); local_130 = (local_130 + 1)) {
      FUN_00418ce0((DAT_006a1d88 + local_130 * 0x28));
      FUN_00418ce0((DAT_006a1d88 + local_130 * 0x28));
      FUN_00418ce0((DAT_006a1d88 + local_130 * 0x28));
    }
    FUN_00418d90(local_c);
    FUN_00418d90(local_10);
    FUN_00418d90(local_14);
    FUN_00415b52();
    FUN_00415765();
  }
  return;
}


 export function FUN_0041612e ()

 {
  let local_8;

  if ((DAT_006a4f88 === 0)) {
    local_8 = 0;
  }
  else {
    local_8 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_8);
  FUN_004190d0(DAT_0062523c, s_ADVANCES_00625230);
  FUN_0059d3c9(0);
  return;
}


 export function FUN_0041618d ()

 {
  wv(DAT_006a1d7c, 0);
  wv(DAT_006a4f88, (DAT_006a4f88 + 0x48));
  return;
}


 export function FUN_004161b5 ()

 {
  let uVar1;

  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x7d8), 0), 0, LAB_00401d8e);
  FUN_00573e59((DAT_00646cb8 + (s32((DAT_006a2d34 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58), 0) * 0xf0 + s32((DAT_006a2d30 + s32((DAT_006a4f88 + 0x2ec), 0) * 0x58), 0) * 0x3c)), uVar1);
  FUN_00415765();
  return;
}


 export function FUN_0041623d (param_1)

 {
  let iVar1;
  let hWnd;
  let uVar2;
  let local_8;

  if ((param_1 === 0xc9)) {
    iVar1 = FUN_0041557b();
    if ((iVar1 === 0)) {
      uVar2 = FUN_00418d60();
      w32((DAT_006a4f88 + 0x2ec), 0, uVar2);
      FUN_0041541a();
      FUN_00415b52();
      FUN_00415765();
    }
    else {
      FUN_00418d90(s32((DAT_006a4f88 + 0x2ec), 0));
      FUN_0041541a();
      FUN_00415765();
      if ((DAT_006a4f88 === 0)) {
        local_8 = 0;
      }
      else {
        local_8 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_8);
      FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_00625244);
      FUN_0059d3c9(0);
      hWnd = FUN_00418770();
      FUN_006e7d94(hWnd);
    }
  }
  else if ((param_1 === 0xcd)) {
    FUN_0041557b();
    FUN_00415b52();
    FUN_00415765();
  }
  return;
}


 export function FUN_00416354 (in_ECX, param_1)

 {
  let iVar1;
  let uVar2;
  // in_ECX promoted to parameter;
  let local_28;
  let local_20;
  let local_14;

  FUN_004086c0(DAT_ffffffec, ((s32((DAT_00625128 + param_1 * 8), 0) + s32((in_ECX + 0x124), 0)) + -30), (s32((DAT_0062512c + param_1 * 8), 0) + s32((in_ECX + 0x128), 0)), 0xa0, (s32((in_ECX + 0x2e8), 0) << 3));
  iVar1 = DAT_006a1d80;
  wv(DAT_006a1d80, (DAT_006a1d80 + 1));
  if ((in_ECX === 0)) {
    local_28 = 0;
  }
  else {
    local_28 = (in_ECX + 0x48);
  }
  FUN_00418bf0(local_28, iVar1, DAT_ffffffec);
  FUN_00418c70(DAT_006a4f90);
  FUN_00418dd0(thunk_FUN_0041623d);
  /* switch */ () {
  case 0 :
    for (/* cond: (local_20 < 0x64) */); local_20 = (local_20 < 0x64); local_20 = (local_20 + 1)) {
      uVar2 = FUN_00428b0c(s32((DAT_00627684 + local_20 * 0x10), 0));
      FUN_00418ce0(uVar2);
    }
    break;
  case 1 :
  case 2 :
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7c0), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x7c4), 0));
    FUN_00418ce0(uVar2);
    for (/* cond: (local_20 < 0x64) */); local_20 = (local_20 < 0x64); local_20 = (local_20 + 1)) {
      uVar2 = FUN_00428b0c(s32((DAT_00627684 + local_20 * 0x10), 0));
      FUN_00418ce0(uVar2);
    }
    break;
  case 3 :
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x810), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x814), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x818), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x81c), 0));
    FUN_00418ce0(uVar2);
    break;
  case 4 :
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x820), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x824), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x828), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x82c), 0));
    FUN_00418ce0(uVar2);
    uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x830), 0));
    FUN_00418ce0(uVar2);
  }
  return;
}


 export function FUN_00416734 (in_ECX, param_1)

 {
  let iVar1;
  // in_ECX promoted to parameter;
  let local_24;
  let local_14;

  FUN_004086c0(DAT_ffffffec, (s32(DAT_00625150, param_1 * 2) + s32((in_ECX + 0x124), 0)), (s32(DAT_00625154, param_1 * 2) + s32((in_ECX + 0x128), 0)), 0x30, (s32((in_ECX + 0x2e8), 0) + 6));
  iVar1 = DAT_006a1d80;
  wv(DAT_006a1d80, (DAT_006a1d80 + 1));
  if ((in_ECX === 0)) {
    local_24 = 0;
  }
  else {
    local_24 = (in_ECX + 0x48);
  }
  FUN_00418910(local_24, iVar1, DAT_ffffffec, DAT_0062524c);
  FUN_004189c0(4);
  FUN_00418a00(LAB_00401019);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00416828 (in_ECX)

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
  local_18 = (DAT_00646cb8 + (s32((DAT_006a2d34 + s32((in_ECX + 0x2ec), 0) * 0x58), 0) * 0xf0 + s32((DAT_006a2d30 + s32((in_ECX + 0x2ec), 0) * 0x58), 0) * 0x3c));
  uVar1 = FUN_00417f70();
  FUN_005a9abf(in_ECX, local_8, local_c, 0x48, 0x28, uVar1);
  FUN_005cd775(2, 1);
  FUN_005cef31(DAT_ffffffd8, in_ECX, local_8, local_c);
  FUN_005cd775(1, 1);
  FUN_004ccb6a(in_ECX, local_8, local_c, 0x48, 0x28, 6);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  local_10 = ((DAT_00625130 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00625134 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x7e);
  FUN_005f22e0(DAT_00679640, DAT_00625250);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00625138 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_0062513c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x7e);
  FUN_005f22e0(DAT_00679640, DAT_00625254);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00625140 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((DAT_00625144 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1eb);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00625148 + s32((in_ECX + 0x124), 0)) + 0x32);
  local_14 = (((s32((in_ECX + 0x128), 0) + None) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1ec);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00625150 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_00625154 + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1ed);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = ((DAT_00625158 + s32((in_ECX + 0x124), 0)) + 0x18);
  local_14 = (((DAT_0062515c + s32((in_ECX + 0x128), 0)) - s32((in_ECX + 0x2e8), 0)) + -2);
  FUN_0040bbb0();
  FUN_0040bc10(0x1ee);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  local_10 = (s32((in_ECX + 0x124), 0) + (s32((in_ECX + 0x2d8), 0) / 2 | 0));
  local_14 = ((s32((in_ECX + 0x128), 0) - s32((in_ECX + 0x2e8), 0)) + 0xe6);
  FUN_0040bbb0();
  FUN_0040bc10(0x1ea);
  FUN_005bb024(in_ECX, DAT_00679640, local_10, local_14, 0);
  FUN_00408460();
  return;
}


 export function FUN_00416c9e (in_ECX)

 {
  let iVar1;
  let pvVar2;
  let uVar3;
  let uVar4;
  let extraout_EAX;
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
  let local_468;
  let local_460;
  let local_454;
  let local_444;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0041754e;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  wv(DAT_006a1d7c, 1);
  wv(DAT_006a4f88, in_ECX);
  pvVar2 = operator_new(0x48);
  local_8 = 1;
  if ((pvVar2 === 0)) {
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
  FUN_005bf071(s_EDITORPT.GIF_00625258, 0xa, 0xc0, DAT_fffffbbc);
  uVar3 = FUN_0040ef70();
  w32((in_ECX + 0x2e8), 0, uVar3);
  uVar12 = 0;
  uVar11 = 0;
  uVar10 = 0;
  uVar3 = s32((in_ECX + 0x2dc), 0);
  uVar9 = s32((in_ECX + 0x2d8), 0);
  uVar8 = 0;
  uVar7 = 0;
  uVar6 = 0xd;
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x734), 0), 0xd, 0, 0, uVar9, uVar3, 0, 0, 0);
  FUN_005534bc(uVar4, uVar6, uVar7, uVar8, uVar9, uVar3, uVar10, uVar11, uVar12);
  for (/* cond: (local_460 < 7) */); local_460 = (local_460 < 7); local_460 = (local_460 + 1)) {
    if ((s32((DAT_00625160 + local_460 * 8), 0) === 9)) {
      FUN_00416734(s32((DAT_00625164 + local_460 * 8), 0));
    }
    else if ((s32((DAT_00625160 + local_460 * 8), 0) === 0xc)) {
      FUN_00416354(s32((DAT_00625164 + local_460 * 8), 0));
    }
  }
  FUN_004086c0(DAT_fffffbac, (s32((in_ECX + 0x124), 0) + 0x32), (s32((in_ECX + 0x128), 0) + 0xe7), 0x1cb, 0x6e);
  iVar1 = DAT_006a1d80;
  wv(DAT_006a1d80, (DAT_006a1d80 + 1));
  if ((in_ECX === 0)) {
    local_478 = 0;
  }
  else {
    local_478 = (in_ECX + 0x48);
  }
  FUN_00418f40(local_478, iVar1, DAT_fffffbac);
  FUN_00418fe0(DAT_006a4f90);
  wv(PTR_DAT_006359f0, PTR_DAT_006359f0);
  w32((in_ECX + 0x2e4), 0, (extraout_EAX + 8));
  w32((in_ECX + 0x2e0), 0, (((s32((in_ECX + 0x12c), 0) + -10) + (((s32((in_ECX + 0x12c), 0) + -10) >> 0x1f) & 3)) >> 2));
  iVar5 = ((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2e4), 0) + 2));
  iVar1 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 2), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_47c = 0;
  }
  else {
    local_47c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_47c, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00401e51);
  iVar1 = ((iVar1 + 2) + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_480 = 0;
  }
  else {
    local_480 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0xa8), 0));
  FUN_0040f680(local_480, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00402054);
  iVar1 = (iVar1 + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_484 = 0;
  }
  else {
    local_484 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8ec), 0));
  FUN_0040f680(local_484, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00403bb1);
  FUN_004086c0(DAT_fffffbac, (iVar1 + (s32((in_ECX + 0x2e0), 0) + 2)), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_488 = 0;
  }
  else {
    local_488 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(local_488, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_0040394a);
  FUN_0040f840();
  w32((in_ECX + 0x2e0), 0, 0x55);
  wv(PTR_DAT_006359f0, PTR_DAT_006359f0);
  w32((in_ECX + 0x2e4), 0, (extraout_EAX_00 + 8));
  FUN_004086c0(DAT_fffffbac, (s32((in_ECX + 0x124), 0) + 0x19), (s32((in_ECX + 0x128), 0) + 0x50), s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_48c = 0;
  }
  else {
    local_48c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x7cc), 0));
  FUN_0040f680(local_48c, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_004019d3);
  FUN_0040f350(0);
  FUN_004151e0();
  FUN_00418d90(s32((in_ECX + 0x2ec), 0));
  FUN_0041541a();
  w32((in_ECX + 0x2f8), 0, 5);
  FUN_00408330(LAB_004019d8);
  in_ECX = EnableStackedTabs(in_ECX, 0x402a68);
  FUN_0041623d(0xc9);
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
  FUN_00417542();
  FUN_00417558();
  return;
}


 export function FUN_00417542 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_00417558 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00417566 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004175cb;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00417fa0();
  local_8 = 0;
  FUN_00416c9e();
  FUN_005bb574();
  local_8 = -1;
  FUN_004175bf();
  FUN_004175d5();
  return;
}


 export function FUN_004175bf ()

 {
  FUN_004183d0();
  return;
}


 export function FUN_004175d5 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00417ef0 (in_ECX, param_1, param_2)

 {
  let iVar1;
  // in_ECX promoted to parameter;

  if ((s32(in_ECX, 0) !== 0)) {
    FUN_005c841d(s32(in_ECX, 0));
  }
  iVar1 = FUN_005c8200(param_1, param_2, 0);
  w32(in_ECX, 0, iVar1);
  iVar1 = FUN_005c847f(s32(in_ECX, 0));
  w32(in_ECX, 1, iVar1);
  return;
}


 export function FUN_00417f70 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return _MEM[(in_ECX + 0x30)];
}


 export function FUN_00417fa0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_004182d9;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0055339f();
  local_8 = 0;
  `eh_vector_constructor_iterator'((in_ECX + 0xbf), 0x38, 6, LAB_0040388c, LAB_00403553);
  local_8 = 1;
  `eh_vector_constructor_iterator'((in_ECX + 0x113), 0x48, 9, thunk_FUN_004187a0, thunk_FUN_00418870);
  local_8 = 2;
  FUN_0040f3e0();
  local_8 = 3;
  FUN_0040f3e0();
  local_8 = 4;
  FUN_0040f3e0();
  local_8 = 5;
  FUN_0040f3e0();
  local_8 = 6;
  FUN_0040f3e0();
  local_8 = 7;
  FUN_0040f3e0();
  local_8 = 8;
  FUN_0040f3e0();
  local_8 = 9;
  FUN_0040f3e0();
  local_8 = 0xa;
  FUN_0040f3e0();
  local_8 = 0xb;
  FUN_0040f3e0();
  local_8 = 0xc;
  FUN_0040f3e0();
  local_8 = 0xd;
  FUN_0040f3e0();
  local_8 = 0xe;
  FUN_0040f3e0();
  local_8 = 0xf;
  FUN_0040f3e0();
  local_8 = 0x10;
  FUN_0040f3e0();
  local_8 = 0x11;
  FUN_0040f3e0();
  local_8 = 0x12;
  FUN_00418e00();
  local_8 = 0x13;
  FUN_00418e00();
  local_8 = ((((local_8) >> 8) << 8) | 0x14);
  FUN_00418e00();
  w32(in_ECX, 0, PTR_FUN_0061c058);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_004183d0 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_00418675;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  local_8 = 0x14;
  FUN_0041851f();
  local_8 = 0x13;
  FUN_0041852e();
  local_8 = 0x12;
  FUN_0041853d();
  local_8 = 0x11;
  FUN_0041854c();
  local_8 = 0x10;
  FUN_0041855b();
  local_8 = 0xf;
  FUN_0041856a();
  local_8 = 0xe;
  FUN_00418579();
  local_8 = 0xd;
  FUN_00418588();
  local_8 = 0xc;
  FUN_00418597();
  local_8 = 0xb;
  FUN_004185a6();
  local_8 = 0xa;
  FUN_004185b5();
  local_8 = 9;
  FUN_004185c4();
  local_8 = 8;
  FUN_004185d3();
  local_8 = 7;
  FUN_004185e2();
  local_8 = 6;
  FUN_004185f1();
  local_8 = 5;
  FUN_00418600();
  local_8 = 4;
  FUN_0041860f();
  local_8 = 3;
  FUN_0041861e();
  local_8 = 2;
  FUN_0041862d();
  local_8 = 1;
  FUN_0041863c();
  local_8 = (0 << 8);
  FUN_00418654();
  local_8 = -1;
  FUN_0041866c();
  FUN_0041867f();
  return;
}


 export function FUN_0041851f ()

 {
  FUN_00418ea0();
  return;
}


 export function FUN_0041852e ()

 {
  FUN_00418ea0();
  return;
}


 export function FUN_0041853d ()

 {
  FUN_00418ea0();
  return;
}


 export function FUN_0041854c ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0041855b ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0041856a ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_00418579 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_00418588 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_00418597 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004185a6 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004185b5 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004185c4 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004185d3 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004185e2 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_004185f1 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_00418600 ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0041860f ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0041861e ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0041862d ()

 {
  FUN_0040f570();
  return;
}


 export function FUN_0041863c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((s32((unaff_EBP + -16), 0) + 0x44c), 0x48, 9, thunk_FUN_00418870);
  return;
}


 export function FUN_00418654 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  `eh_vector_destructor_iterator'((s32((unaff_EBP + -16), 0) + 0x2fc), 0x38, 6, LAB_00403553);
  return;
}


 export function FUN_0041866c (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;

  unaff_EBP = (unaff_EBP + -16);
  return;
}


 export function FUN_0041867f (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00418740 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 4), 0);
}


 export function FUN_00418770 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32((in_ECX + 0x1c), 0);
}


 export function FUN_004187a0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00418823;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  w32((in_ECX + 0x30), 0, 0);
  w32((in_ECX + 0x2c), 0, 0);
  w32((in_ECX + 0x44), 0, 0);
  w32((in_ECX + 0x34), 0, 0);
  _MEM[(in_ECX + 0x38)] = 0;
  _MEM[(in_ECX + 0x39)] = 0;
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_00418870 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_004188d3;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005d2d3d(s32((in_ECX + 0x1c), 0));
  }
  local_8 = -1;
  FUN_004188ca();
  FUN_004188dd();
  return;
}


 export function FUN_004188ca ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_004188dd (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00418910 (in_ECX, param_1, param_2, param_3, param_4)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  w32((in_ECX + 0x40), 0, PTR_DAT_00637e6c);
  FUN_0040f730(param_1, 4, param_2, param_3);
  uVar1 = FUN_005d2740(param_3, in_ECX, 1, 1, s32((in_ECX + 0x40), 0));
  w32((in_ECX + 0x1c), 0, uVar1);
  FUN_005d2d7f(s32((in_ECX + 0x1c), 0), param_4);
  return;
}


 export function FUN_004189c0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d2da1(s32((in_ECX + 0x1c), 0), param_1);
  return;
}


 export function FUN_00418a00 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x34), 0, param_1);
  return;
}


 export function FUN_00418a30 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d2d7f(s32((in_ECX + 0x1c), 0), param_1);
  return;
}


 export function FUN_00418a70 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d2d4d(s32((in_ECX + 0x1c), 0), param_1);
  return;
}


 export function FUN_00418ab0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00418b11;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  w32((in_ECX + 0x30), 0, 0);
  w32((in_ECX + 0x34), 0, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_00418b50 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_00418bb3;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005d356e(s32((in_ECX + 0x1c), 0));
  }
  local_8 = -1;
  FUN_00418baa();
  FUN_00418bbd();
  return;
}


 export function FUN_00418baa ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_00418bbd (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00418bf0 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  FUN_0040f730(param_1, 0xa, param_2, param_3);
  uVar1 = FUN_005d3130(param_3, in_ECX, 1);
  w32((in_ECX + 0x1c), 0, uVar1);
  w32((in_ECX + 0x2c), 0, 0);
  return;
}


 export function FUN_00418c70 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_00418cb0();
  FUN_005d35c8(s32((in_ECX + 0x1c), 0), uVar1);
  return;
}


 export function FUN_00418cb0 (in_ECX)

 {
  // in_ECX promoted to parameter;

  return s32(in_ECX, 0);
}


 export function FUN_00418ce0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d357e(s32((in_ECX + 0x1c), 0), param_1);
  w32((in_ECX + 0x2c), 0, (s32((in_ECX + 0x2c), 0) + 1));
  return;
}


 export function FUN_00418d20 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005d360a(s32((in_ECX + 0x1c), 0));
  w32((in_ECX + 0x2c), 0, 0);
  return;
}


 export function FUN_00418d60 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005d36b1(s32((in_ECX + 0x1c), 0));
  return;
}


 export function FUN_00418d90 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d36f6(s32((in_ECX + 0x1c), 0), param_1);
  return;
}


 export function FUN_00418dd0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  w32((in_ECX + 0x34), 0, param_1);
  return;
}


 export function FUN_00418e00 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let local_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00418e61;
  local_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0040f480();
  w32((in_ECX + 0x30), 0, 0);
  w32((in_ECX + 0x34), 0, 0);
  w32(unaff_FS_OFFSET, 0, local_10);
  return in_ECX;
}


 export function FUN_00418ea0 (in_ECX)

 {
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  puStack_c = LAB_00418f03;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_8 = 0;
  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_005d3c40(s32((in_ECX + 0x1c), 0));
  }
  local_8 = -1;
  FUN_00418efa();
  FUN_00418f0d();
  return;
}


 export function FUN_00418efa ()

 {
  FUN_0040f510();
  return;
}


 export function FUN_00418f0d (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00418f40 (in_ECX, param_1, param_2, param_3)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  if ((s32((in_ECX + 0x1c), 0) !== 0)) {
    FUN_0040f610();
  }
  w32((in_ECX + 0x38), 0, PTR_DAT_00637e70);
  FUN_0040f730(param_1, 7, param_2, param_3);
  uVar1 = FUN_005d37a0(param_3, in_ECX, 1, 0, s32((in_ECX + 0x38), 0));
  w32((in_ECX + 0x1c), 0, uVar1);
  w32((in_ECX + 0x2c), 0, 0);
  return;
}


 export function FUN_00418fe0 (in_ECX)

 {
  let uVar1;
  // in_ECX promoted to parameter;

  uVar1 = FUN_00418cb0();
  FUN_005d3c9a(s32((in_ECX + 0x1c), 0), uVar1);
  return;
}


 export function FUN_00419020 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005d3c50(s32((in_ECX + 0x1c), 0), param_1);
  w32((in_ECX + 0x2c), 0, (s32((in_ECX + 0x2c), 0) + 1));
  return;
}


 export function FUN_00419060 (in_ECX)

 {
  // in_ECX promoted to parameter;

  FUN_005d3cdc(s32((in_ECX + 0x1c), 0));
  w32((in_ECX + 0x2c), 0, 0);
  return;
}


 export function FUN_004190a0 (param_1)

 {
  FUN_004aef57(DAT_00679640, param_1);
  return;
}


 export function FUN_004190d0 (param_1, param_2)

 {
  FUN_00419100(param_1, param_2, 0);
  return;
}


 export function FUN_00419100 (param_1, param_2, param_3)

 {
  FUN_00419130(param_1, param_2, 0, param_3);
  return;
}


 export function FUN_00419130 (param_1, param_2, param_3, param_4)

 {
  FUN_0051d3e0(param_1, param_2, param_3, 0, 0, 0, param_4);
  return;
}


 export function FUN_00419170 ()

 {
  let iVar1;
  let uVar2;
  let unaff_FS_OFFSET;
  let local_744;
  let local_310;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00419958;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_005c64da();
  local_8 = 1;
  for (/* cond: (local_310 < 8) */); local_310 = (local_310 < 8); local_310 = (local_310 + 1)) {
    w16((DAT_00654b60 + local_310 * 2), 0, 0);
  }
  wv(DAT_00654b70, 0);
  wv(DAT_00655b02, 1);
 LAB_004191ff: :
  FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff8bc);
  FUN_00419be0(DAT_0063cbd0);
  FUN_00419ba0(0x9e);
  FUN_00419b80();
  wv(DAT_00631eec, 3);
  FUN_0052263c(-1, 0);
  FUN_0040ffa0(s_HOTSEAT1_006252a4, 1);
  FUN_0059ea99(((DAT_0066653c) << 16 >> 16));
  FUN_005f22d0(DAT_0064bb08, DAT_00655020);
  iVar1 = (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1));
  uVar2 = FUN_005226fa(0, iVar1);
  FUN_0059e783(uVar2, iVar1);
  iVar1 = FUN_0040bc80(0);
  FUN_0046e020(0x6a, 0, 0, 0);
  FUN_0055a567();
  if ((iVar1 < 0)) {
    local_8 = (UNNAMED << 8);
    FUN_00419940();
    local_8 = -1;
    FUN_0041994c();
    FUN_00419962();
    return;
  }
  wv(DAT_0066653c, ((iVar1) & 0xFFFF));
  if ((iVar1 < 3)) {
    __chdir(DAT_00655020);
    FUN_0041e864(1);
  }
  wv(DAT_00627670, 0);
  /* switch */ () {
  case 0 :
    iVar1 = FUN_0041d417();
    if ((iVar1 !== 0));
    iVar1 = _rand();
    wv(DAT_00624ee8, ((iVar1 % 3) + -1));
    wv(DAT_00624eec, 0);
    iVar1 = _rand();
    if (((iVar1 % 3) === 0)) {
      wv(DAT_00624eec, ((iVar1 % 3) + -1));
    }
    iVar1 = _rand();
    wv(DAT_00624ef0, ((iVar1 % 3) + -1));
    iVar1 = _rand();
    wv(DAT_00624ef4, ((iVar1 % 3) + -1));
    iVar1 = _rand();
    wv(DAT_00624ef8, ((iVar1 % 3) + -1));
    iVar1 = FUN_0051dd97(local_18, 1);
    break;
  case 1 :
    iVar1 = FUN_0041dd0e();
    if ((iVar1 !== 0));
    if ((DAT_006d1166 !== 0)) {
      local_18 = 2;
    }
    iVar1 = _rand();
    wv(DAT_00624ee8, ((iVar1 % 3) + -1));
    wv(DAT_00624eec, 0);
    iVar1 = _rand();
    if (((iVar1 % 3) === 0)) {
      wv(DAT_00624eec, ((iVar1 % 3) + -1));
    }
    iVar1 = _rand();
    wv(DAT_00624ef0, ((iVar1 % 3) + -1));
    iVar1 = _rand();
    wv(DAT_00624ef4, ((iVar1 % 3) + -1));
    iVar1 = _rand();
    wv(DAT_00624ef8, ((iVar1 % 3) + -1));
    iVar1 = FUN_0051dd97(local_18, 1);
    break;
  case 2 :
    iVar1 = FUN_0041d417();
    if ((iVar1 !== 0));
    iVar1 = FUN_0041d7ea();
    if ((iVar1 !== 0));
    break;
  case 3 :
    wv(DAT_006a9110, 0);
    iVar1 = FUN_005218cb(1);
    if ((iVar1 === 0)) {
      if ((0 !== 0)) {
        wv(DAT_00655aea, (DAT_00655aea & -0x10001));
      }
      wv(DAT_00655b02, 1);
      local_14 = FUN_005227e3();
      if ((local_14 === 0)) {
        FUN_005f22d0(DAT_0064bb08, DAT_00655020);
      }
      else {
        iVar1 = FUN_00521fe0(local_14);
        if ((iVar1 === 0)) {
          FUN_0040bbb0();
          FUN_0040bc10(0x363);
          FUN_00578c12(1, 0x1f2, DAT_00679640, 0);
          FUN_004a73d9();
          FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff8bc);
          FUN_00419be0(DAT_0063cbd0);
          FUN_00419ba0(0x9e);
          FUN_00419b80();
          local_8 = (UNNAMED << 8);
          FUN_00419940();
          local_8 = -1;
          FUN_0041994c();
          FUN_00419962();
          return;
        }
        FUN_005f22d0(DAT_0064bb08, DAT_00655020);
      }
    }
    else {
      FUN_005f22d0(DAT_0064bb08, DAT_00655020);
    }
    goto LAB_004191ff;
  case 4 :
    goto switchD_004197af_caseD_4;
  default :
    goto switchD_004197af_default;
  }
  if ((iVar1 === 0)) {
 switchD_004197af_default: :
    wv(DAT_00654fb0, 0);
 LAB_004197d3: :
    wv(DAT_00655b0a, 0);
    wv(DAT_00655b0b, 0);
    local_14 = FUN_005227e3();
    if ((local_14 !== 0)) {
      FUN_00522dfa();
      local_310 = 0;
      do {
        if ((local_14 <= local_310)) {
          FUN_00522f8f(local_14);
          FUN_004a73d9();
          FUN_0041a046(1);
          FUN_0041a5c4(1);
          FUN_0041a422(1);
          FUN_00419c8b();
          FUN_00408d33(local_18);
          FUN_004aa9c0();
          if ((DAT_00631ee8 !== 0)) {
            FUN_004a9785((DAT_00631ee8 + -1));
          }
          wv(DAT_00655b02, 1);
          if ((DAT_00628048 !== 0)) {
            wv(DAT_00655b03, DAT_00628048);
            wv(DAT_006d1da0, s8(DAT_00628048));
          }
          FUN_0040bbb0();
          FUN_0040bc10(0x363);
          FUN_00578c12(1, 0x1f2, DAT_00679640, 0);
          local_8 = (UNNAMED << 8);
          FUN_00419940();
          local_8 = -1;
          FUN_0041994c();
          FUN_00419962();
          return;
        }
        while ((iVar1 !== 0)) {
          local_310 = (local_310 + -1);
          if ((local_310 < 0));
      } ( true );
    }
  }
  goto LAB_004191ff;
 switchD_004197af_caseD_4: :
  wv(DAT_006a9110, 0);
  iVar1 = FUN_00477d8c(0, 1, 1);
  if ((iVar1 === 0)) {
    if ((DAT_00655b02 === 1)) {
      FUN_0040bbb0();
      FUN_0040bc10(0x363);
      FUN_00578c12(1, 0x1f2, DAT_00679640, 0);
      FUN_004a73d9();
      FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff8bc);
      FUN_00419be0(DAT_0063cbd0);
      FUN_00419ba0(0x9e);
      FUN_00419b80();
      local_8 = (UNNAMED << 8);
      FUN_00419940();
      local_8 = -1;
      FUN_0041994c();
      FUN_00419962();
      return;
    }
    FUN_00410030(s_HOTSEATNOT_006252b0, DAT_0063fc58, 0);
    if ((0 !== 0)) {
      wv(DAT_00655aea, (DAT_00655aea & -0x10001));
    }
  }
  else if ((0 !== 0)) {
    wv(DAT_00655aea, (DAT_00655aea & -0x10001));
  }
  goto LAB_004191ff;
}


 export function FUN_00419940 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0041994c ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00419962 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00419b80 ()

 {
  FUN_005bbb32();
  return;
}


 export function FUN_00419ba0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bc280(s32((in_ECX + 8), 0), param_1);
  return;
}


 export function FUN_00419be0 (in_ECX, param_1)

 {
  // in_ECX promoted to parameter;

  FUN_005bc3f1(s32((in_ECX + 8), 0), param_1);
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
  FUN_00419c3a();
  FUN_00419c54();
  return;
}


 export function FUN_00419c3a ()

 {
  FUN_005bd630();
  return;
}


 export function FUN_00419c54 ()

 {
  _atexit(FUN_00419c71);
  return;
}


 export function FUN_00419c71 ()

 {
  FUN_005bd915();
  return;
}


 export function FUN_00419c8b ()

 {
  FUN_0046e020(-107, 0, 1, 0);
  FUN_0046e020(0x6c, 0, 0, 0);
  return;
}


 export function FUN_00419cbb (param_1, param_2)

 {
  let uVar1;

  FUN_004a23fc(1);
  uVar1 = FUN_004a2534();
  FUN_005adfa0(uVar1, param_1, param_2);
  return;
}


 export function FUN_00419cf4 (param_1, param_2)

 {
  let uVar1;

  uVar1 = FUN_004a2534();
  FUN_005adfa0(uVar1, param_1, param_2);
  return;
}


 export function FUN_00419d23 ()

 {
  FUN_004a2379(DAT_006559e8, s_COSMIC_006252cc);
  wv(DAT_0064bcc8, FUN_00419cbb(1, 0xa));
  wv(DAT_0064bcc9, FUN_00419cbb(1, 0x64));
  wv(DAT_0064bcca, FUN_00419cbb(0, 0xa));
  wv(DAT_0064bccb, FUN_00419cbb(4, 0x14));
  if (((FUN_00419cbb(4, 0x14) & 1) !== 0)) {
    wv(DAT_0064bccb, (FUN_00419cbb(4, 0x14) + 1));
  }
  wv(DAT_0064bccc, FUN_00419cbb(4, 0x14));
  wv(DAT_0064bccd, FUN_00419cbb(0, 0xa));
  wv(DAT_0064bcce, FUN_00419cbb(0, 0xa));
  wv(DAT_0064bccf, FUN_00419cbb(4, 0xc));
  wv(DAT_0064bcd0, FUN_00419cbb(0xa, 0x64));
  wv(DAT_0064bcd1, FUN_00419cbb(4, 0x32));
  wv(DAT_0064bcd2, FUN_00419cbb(4, 0x32));
  wv(DAT_0064bcd3, FUN_00419cbb(3, 0xa));
  wv(DAT_0064bcd4, FUN_00419cbb(5, 0x64));
  wv(DAT_0064bcd5, FUN_00419cbb(0, 8));
  wv(DAT_0064bcd6, FUN_00419cbb(0, 8));
  wv(DAT_0064bcd7, FUN_00419cbb(0, 8));
  wv(DAT_0064bcd8, FUN_00419cbb(1, 0x14));
  wv(DAT_0064bcd9, FUN_00419cbb(0, 0x64));
  wv(DAT_0064bcda, FUN_00419cbb(0, 0x64));
  wv(DAT_0064bcdb, FUN_00419cbb(4, 0x64));
  wv(DAT_0064bcdc, FUN_00419cbb(0x19, 0xc8));
  wv(DAT_0064bcdd, FUN_00419cbb(0, 0xa));
  return;
}


 export function FUN_00419ed3 ()

 {
  let local_10;
  let local_c;
  let local_8;

  for (/* cond: (local_8 < 0x15) */); local_8 = (local_8 < 0x15); local_8 = (local_8 + 1)) {
    w16((DAT_00655502 + local_8 * 0x30), 0, s16((DAT_00655508 + (u8(_MEM[DAT_006554fc + local_8 * 0x30]) * 2 + local_8 * 0x30)), 0));
    if ((s16((DAT_00655504 + local_8 * 0x30), 0) < 1)) {
      w16((DAT_00655504 + local_8 * 0x30), 0, ((~s16((DAT_00655504 + local_8 * 0x30), 0)) + 1))
      ;
    }
    if ((s16((DAT_00655506 + local_8 * 0x30), 0) < 1)) {
      w16((DAT_00655506 + local_8 * 0x30), 0, ((~s16((DAT_00655506 + local_8 * 0x30), 0)) + 1))
      ;
    }
    for (/* cond: (local_10 < 7) */); local_10 = (local_10 < 7); local_10 = (local_10 + 1)) {
      for (/* cond: (local_c < 2) */); local_c = (local_c < 2); local_c = (local_c + 1)) {
        if ((s16((DAT_0065550c + (local_8 * 0x30 + (local_c * 2 + local_10 * 4))), 0) < 1)) {
          w16((DAT_0065550c + (local_8 * 0x30 + (local_c * 2 + local_10 * 4))), 0, ((~s16((DAT_0065550c + (local_8 * 0x30 + (local_c * 2 + local_10 * 4))), 0)) + 1));
        }
      }
    }
  }
  return;
}


 export function FUN_0041a046 (param_1)

 {
  let bVar1;
  let uVar2;
  let sVar3;
  let uVar4;
  let local_18;
  let local_14;
  let local_c;

  FUN_004a2379(DAT_006559e8, s_CIVILIZE_006252d4);
  wv(DAT_00655b1a, 0);
  for (/* cond: (local_14 < 0x64) */); local_14 = (local_14 < 0x64); local_14 = (local_14 + 1)) {
    _MEM[DAT_0062768f + local_14 * 0x10] = 0xfe;
    _MEM[DAT_0062768e + local_14 * 0x10] = _MEM[DAT_0062768f + local_14 * 0x10];
    if ((_MEM[DAT_0062768e + local_14 * 0x10] === 0xfe)) {
      _MEM[DAT_00627689 + local_14 * 0x10] = 0;
    }
    else {
      _MEM[DAT_00627689 + local_14 * 0x10] = 1;
    }
  }
  for (/* cond: (local_14 < 0x64) */); local_14 = (local_14 < 0x64); local_14 = (local_14 + 1)) {
    FUN_004a23fc(1);
    sVar3 = _strlen(DAT_00679640);
    if ((DAT_00679640 === 0x3b)) {
      uVar4 = FUN_004a26bf(0x14);
      w32((DAT_00627684 + local_14 * 0x10), 0, uVar4);
    }
    else {
      FUN_004a24b1();
    }
    uVar2 = FUN_004a2534();
    _MEM[DAT_0062768a + local_14 * 0x10] = uVar2;
    uVar2 = FUN_004a2534();
    _MEM[DAT_0062768b + local_14 * 0x10] = uVar2;
    for (/* cond: (local_c < 2) */); local_c = (local_c < 2); local_c = (local_c + 1)) {
      uVar4 = FUN_004a24b1();
      uVar2 = FUN_004b0720(uVar4);
      _MEM[DAT_0062768e + (local_14 * 0x10 + local_c)] = uVar2;
      if ((_MEM[DAT_0062768e + (local_14 * 0x10 + local_c)] === 0xfd)) {
        FUN_00589ef8(-4, 3, DAT_00679640, local_14, local_c);
      }
    }
    uVar2 = FUN_004a2534();
    _MEM[DAT_0062768d + local_14 * 0x10] = uVar2;
    uVar2 = FUN_004a2534();
    _MEM[DAT_0062768c + local_14 * 0x10] = uVar2;
    if ((_MEM[DAT_0062768e + local_14 * 0x10] === 0xfe)) {
      _MEM[DAT_00627689 + local_14 * 0x10] = 0;
    }
    else {
      _MEM[DAT_00627689 + local_14 * 0x10] = 1;
    }
  }
  for (/* cond: (local_14 < 0x64) */); local_14 = (local_14 < 0x64); local_14 = (local_14 + 1)) {
    if ((param_1 === 0)) {
      _sprintf(DAT_00673e10, s_Advance_%d_006252e0, (local_14 + 1));
      uVar4 = FUN_00428b68(DAT_00673e10, 0x14);
      w32((DAT_00627684 + local_14 * 0x10), 0, uVar4);
    }
    _MEM[DAT_0062768a + local_14 * 0x10] = 3;
    _MEM[DAT_0062768b + local_14 * 0x10] = 0;
    for (/* cond: (local_c < 2) */); local_c = (local_c < 2); local_c = (local_c + 1)) {
      _MEM[DAT_0062768e + (local_14 * 0x10 + local_c)] = 0xfe;
    }
    _MEM[DAT_0062768d + local_14 * 0x10] = 0;
    _MEM[DAT_0062768c + local_14 * 0x10] = 0;
    if ((_MEM[DAT_0062768e + local_14 * 0x10] === 0xfe)) {
      _MEM[DAT_00627689 + local_14 * 0x10] = 0;
    }
    else {
      _MEM[DAT_00627689 + local_14 * 0x10] = 1;
    }
  }
  for (/* cond: (local_14 < 0x64) */); local_14 = (local_14 < 0x64); local_14 = (local_14 + 1)) {
    if ((_MEM[DAT_00627689 + local_14 * 0x10] !== 0)) {
      wv(DAT_00655b1a, (DAT_00655b1a + 1));
      for (/* cond: (local_c < 2) */); local_c = (local_c < 2); local_c = (local_c + 1)) {
        local_18 = s8(_MEM[DAT_0062768e + (local_14 * 0x10 + local_c)]);
        bVar1 = 0;
        while ((!bVar1)) {
          if ((_MEM[DAT_00627689 + local_18 * 0x10] === 0)) {
            local_18 = s8(_MEM[DAT_0062768e + local_18 * 0x10]);
          }
          else {
            bVar1 = 1;
          }
        }
        _MEM[DAT_0062768e + (local_14 * 0x10 + local_c)] = ((local_18) & 0xFF);
      }
    }
  }
  return;
}


 export function FUN_0041a422 (param_1)

 {
  let uVar1;
  let uVar2;
  let local_8;

  FUN_004a2379(DAT_006559e8, s_IMPROVE_006252ec);
  for (/* cond: (local_8 < 0x43) */); local_8 = (local_8 < 0x43); local_8 = (local_8 + 1)) {
    FUN_004a23fc(1);
    if ((param_1 === 0)) {
      uVar2 = FUN_004a26bf(0x19);
      w32((DAT_0064c488 + local_8 * 8), 0, uVar2);
    }
    else {
      FUN_004a24b1();
    }
    uVar1 = FUN_004a2534();
    _MEM[DAT_0064c48c + local_8 * 8] = uVar1;
    uVar1 = FUN_004a2534();
    _MEM[DAT_0064c48d + local_8 * 8] = uVar1;
    uVar2 = FUN_004a24b1();
    uVar1 = FUN_004b0720(uVar2);
    _MEM[DAT_0064c48e + local_8 * 8] = uVar1;
    if ((_MEM[DAT_0064c48e + local_8 * 8] === 0xfd)) {
      FUN_00589ef8(-5, 3, DAT_00679640, local_8, 0);
    }
    while ((_MEM[DAT_00627689 + s8(_MEM[DAT_0064c48e + local_8 * 8]) * 0x10] === 0)) {
      _MEM[DAT_0064c48e + local_8 * 8] = _MEM[DAT_0062768e + s8(_MEM[DAT_0064c48e + local_8 * 8]) * 0x10];
    }
  }
  FUN_004a2379(0, s_ENDWONDER_006252f4);
  for (/* cond: (local_8 < 0x1c) */); local_8 = (local_8 < 0x1c); local_8 = (local_8 + 1)) {
    FUN_004a23fc(1);
    uVar2 = FUN_004a24b1();
    uVar1 = FUN_004b0720(uVar2);
    _MEM[DAT_0064ba28 + local_8] = uVar1;
    if ((_MEM[DAT_0064ba28 + local_8] === 0xfd)) {
      FUN_00589ef8(-4, 3, DAT_00679640, local_8, 0);
    }
  }
  return;
}


 export function FUN_0041a5c4 (param_1)

 {
  let uVar1;
  let cVar2;
  let sVar3;
  let uVar4;
  let uVar5;
  let local_8;

  wv(DAT_00628068, 0);
  for (/* cond: (local_8 < 0x3e) */); local_8 = (local_8 < 0x3e); local_8 = (local_8 + 1)) {
    _MEM[DAT_0064b1cb + local_8 * 0x14] = 0xfe;
  }
  FUN_004a2379(0, s_UNITS_00625300);
  for (/* cond: (local_8 < 0x3e) */); local_8 = (local_8 < 0x3e); local_8 = (local_8 + 1)) {
    FUN_004a23fc(1);
    sVar3 = _strlen(DAT_00679640);
    if ((DAT_00679640 === 0x3b)) {
      uVar5 = FUN_004a26bf(0xf);
      w32((DAT_0064b1b8 + local_8 * 0x14), 0, uVar5);
      w32((DAT_0066be90 + local_8 * 4), 0, DAT_0063e4b8);
    }
    else {
      FUN_004a24b1();
    }
    uVar5 = FUN_004a24b1();
    uVar1 = FUN_004b0720(uVar5);
    _MEM[DAT_0064b1c0 + local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    _MEM[DAT_0064b1c1 + local_8 * 0x14] = uVar1;
    cVar2 = FUN_004a2534();
    _MEM[DAT_0064b1c2 + local_8 * 0x14] = cVar2 * DAT_0064bcc8;
    uVar1 = FUN_004a2534();
    _MEM[DAT_0064b1c3 + local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    _MEM[DAT_0064b1c4 + local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    _MEM[DAT_0064b1c5 + local_8 * 0x14] = uVar1;
    cVar2 = FUN_004a2534();
    _MEM[DAT_0064b1c6 + local_8 * 0x14] = cVar2 * 0xa;
    uVar1 = FUN_004a2534();
    _MEM[DAT_0064b1c7 + local_8 * 0x14] = uVar1;
    uVar1 = FUN_00419cf4(1, 0xc8);
    _MEM[DAT_0064b1c8 + local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    _MEM[DAT_0064b1c9 + local_8 * 0x14] = uVar1;
    uVar1 = FUN_004a2534();
    _MEM[DAT_0064b1ca + local_8 * 0x14] = uVar1;
    uVar5 = FUN_004a24b1();
    uVar1 = FUN_004b0720(uVar5);
    _MEM[DAT_0064b1cb + local_8 * 0x14] = uVar1;
    uVar4 = FUN_004a25d5();
    w32((DAT_0064b1bc + local_8 * 0x14), 0, (uVar4 & 0xffff));
    if ((_MEM[DAT_0064b1cb + local_8 * 0x14] === 0xfd)) {
      FUN_00589ef8(-6, 3, DAT_00679640, local_8, 0);
    }
  }
  for (/* cond: (local_8 < 0x3e) */); local_8 = (local_8 < 0x3e); local_8 = (local_8 + 1)) {
    if ((param_1 === 0)) {
      _sprintf(DAT_00673e10, s_Unit_%d_00625308, (local_8 + 1));
      uVar5 = FUN_00428b68(DAT_00673e10, 0xf);
      w32((DAT_0064b1b8 + local_8 * 0x14), 0, uVar5);
    }
    _MEM[DAT_0064b1c0 + local_8 * 0x14] = 0xfe;
    _MEM[DAT_0064b1c1 + local_8 * 0x14] = 0;
    _MEM[DAT_0064b1c2 + local_8 * 0x14] = 0;
    _MEM[DAT_0064b1c3 + local_8 * 0x14] = 0;
    _MEM[DAT_0064b1c4 + local_8 * 0x14] = 1;
    _MEM[DAT_0064b1c5 + local_8 * 0x14] = 0;
    _MEM[DAT_0064b1c6 + local_8 * 0x14] = 0;
    _MEM[DAT_0064b1c7 + local_8 * 0x14] = 0;
    _MEM[DAT_0064b1c8 + local_8 * 0x14] = 1;
    _MEM[DAT_0064b1c9 + local_8 * 0x14] = 0;
    _MEM[DAT_0064b1ca + local_8 * 0x14] = 0;
    _MEM[DAT_0064b1cb + local_8 * 0x14] = 0xfe;
    w32((DAT_0064b1bc + local_8 * 0x14), 0, 0);
    if ((_MEM[DAT_0064b1cb + local_8 * 0x14] === 0xfd)) {
      FUN_00589ef8(-6, 3, DAT_00679640, local_8, 0);
    }
  }
  return;
}


 export function FUN_0041a95f ()

 {
  let uVar1;
  let uVar2;
  let local_c;
  let local_8;

  FUN_004a2379(0, s_TERRAIN_00625310);
  for (/* cond: (local_c < 0x21) */); local_c = (local_c < 0x21); local_c = (local_c + 1)) {
    FUN_004a23fc(1);
    uVar2 = FUN_004a26bf(0xf);
    w32((DAT_00627cc4 + local_c * 0x18), 0, uVar2);
    uVar1 = FUN_004a2534();
    _MEM[DAT_00627cc8 + local_c * 0x18] = uVar1;
    uVar1 = FUN_004a2534();
    _MEM[DAT_00627cc9 + local_c * 0x18] = uVar1;
    for (/* cond: (local_8 < 3) */); local_8 = (local_8 < 3); local_8 = (local_8 + 1)) {
      uVar1 = FUN_004a2534();
      _MEM[DAT_00627cca + (local_c * 0x18 + local_8)] = uVar1;
    }
    if ((local_c < 0xb)) {
      for (/* cond: (local_8 < 2) */); local_8 = (local_8 < 2); local_8 = (local_8 + 1)) {
        uVar2 = FUN_004a24b1();
        uVar1 = FUN_004b07d1(uVar2);
        _MEM[DAT_00627cce + (local_c * 0x18 + local_8)] = uVar1;
        uVar1 = FUN_004a2534();
        _MEM[DAT_00627cd0 + (local_c * 0x18 + local_8)] = uVar1;
        uVar1 = FUN_004a2534();
        _MEM[DAT_00627cd2 + (local_c * 0x18 + local_8)] = uVar1;
        uVar1 = FUN_004a2534();
        _MEM[DAT_00627cd4 + (local_c * 0x18 + local_8)] = uVar1;
        if ((_MEM[DAT_00627cce + (local_c * 0x18 + local_8)] === 0xfd)) {
          FUN_00589ef8(-7, 3, DAT_00679640, local_c, local_8);
        }
      }
      uVar2 = FUN_004a24b1();
      uVar1 = FUN_004b07d1(uVar2);
      _MEM[DAT_00627ccd + local_c * 0x18] = uVar1;
      if ((_MEM[DAT_00627ccd + local_c * 0x18] === 0xfd)) {
        FUN_00589ef8(-7, 3, DAT_00679640, local_c, 0x63);
      }
    }
  }
  return;
}


 export function FUN_0041ab18 (param_1)

 {
  let uVar1;
  let uVar2;
  let uVar3;
  let uVar4;
  let uVar5;
  let uVar6;
  let iVar7;
  let local_1c;
  let local_18;
  let local_10;

  FUN_004a2379(0, s_GOVERNMENTS_00625318);
  for (/* cond: (local_10 < 7) */); local_10 = (local_10 < 7); local_10 = (local_10 + 1)) {
    FUN_004a23fc(1);
    uVar6 = FUN_004a26bf(0xf);
    w32((DAT_0064b9a0 + local_10 * 4), 0, uVar6);
    uVar6 = FUN_004a26bf(0xf);
    w32((DAT_00654fe0 + local_10 * 8), 0, uVar6);
    uVar6 = FUN_004a26bf(0xf);
    w32((DAT_00654fe4 + local_10 * 8), 0, uVar6);
  }
  FUN_004a2379(0, s_LEADERS_00625324);
  for (/* cond: (local_10 < 0x15) */); local_10 = (local_10 < 0x15); local_10 = (local_10 + 1)) {
    FUN_004a23fc(1);
    uVar5 = s16((DAT_00655508 + local_10 * 0x30), 0);
    uVar4 = s16((DAT_0065550a + local_10 * 0x30), 0);
    uVar3 = FUN_004a26bf(0x18);
    w16((DAT_00655508 + local_10 * 0x30), 0, uVar3);
    uVar3 = FUN_004a26bf(0x18);
    w16((DAT_0065550a + local_10 * 0x30), 0, uVar3);
    if ((param_1 === 0)) {
      w16((DAT_00655508 + local_10 * 0x30), 0, uVar5);
      w16((DAT_0065550a + local_10 * 0x30), 0, uVar4);
    }
    uVar1 = _MEM[DAT_006554fc + local_10 * 0x30];
    uVar6 = FUN_004a2534(0, 1);
    uVar2 = FUN_005adfa0(uVar6);
    _MEM[DAT_006554fc + local_10 * 0x30] = uVar2;
    if ((param_1 === 0)) {
      _MEM[DAT_006554fc + local_10 * 0x30] = uVar1;
    }
    else {
      w16((DAT_00655502 + local_10 * 0x30), 0, s16((DAT_00655508 + (u8(_MEM[DAT_006554fc + local_10 * 0x30]) * 2 + local_10 * 0x30)), 0));
    }
    uVar5 = s16((DAT_006554fe + local_10 * 0x30), 0);
    uVar4 = FUN_004a2534();
    w16((DAT_006554fe + local_10 * 0x30), 0, uVar4);
    if ((param_1 === 0)) {
      w16((DAT_006554fe + local_10 * 0x30), 0, uVar5);
    }
    else {
      uVar5 = FUN_005adfa0(((s16((DAT_006554fe + local_10 * 0x30), 0)) << 16 >> 16), 1, 7);
      w16((DAT_006554fe + local_10 * 0x30), 0, uVar5);
    }
    uVar5 = s16((DAT_00655500 + local_10 * 0x30), 0);
    uVar4 = FUN_004a2534();
    w16((DAT_00655500 + local_10 * 0x30), 0, uVar4);
    if ((param_1 === 0)) {
      w16((DAT_00655500 + local_10 * 0x30), 0, uVar5);
    }
    else {
      uVar5 = FUN_005adfa0(((s16((DAT_00655500 + local_10 * 0x30), 0)) << 16 >> 16), 0, 3);
      w16((DAT_00655500 + local_10 * 0x30), 0, uVar5);
    }
    uVar5 = s16((DAT_00655504 + local_10 * 0x30), 0);
    uVar4 = s16((DAT_00655506 + local_10 * 0x30), 0);
    uVar3 = FUN_004a26bf(0x18);
    w16((DAT_00655504 + local_10 * 0x30), 0, uVar3);
    uVar3 = FUN_004a26bf(0x18);
    w16((DAT_00655506 + local_10 * 0x30), 0, uVar3);
    if ((param_1 === 0)) {
      w16((DAT_00655504 + local_10 * 0x30), 0, uVar5);
      w16((DAT_00655506 + local_10 * 0x30), 0, uVar4);
    }
    uVar1 = _MEM[DAT_006554f8 + local_10 * 0x30];
    uVar2 = FUN_004a2534();
    _MEM[DAT_006554f8 + local_10 * 0x30] = uVar2;
    if ((param_1 === 0)) {
      _MEM[DAT_006554f8 + local_10 * 0x30] = uVar1;
    }
    uVar1 = _MEM[DAT_006554f9 + local_10 * 0x30];
    uVar2 = FUN_004a2534();
    _MEM[DAT_006554f9 + local_10 * 0x30] = uVar2;
    if ((param_1 === 0)) {
      _MEM[DAT_006554f9 + local_10 * 0x30] = uVar1;
    }
    uVar1 = _MEM[DAT_006554fa + local_10 * 0x30];
    uVar2 = FUN_004a2534();
    _MEM[DAT_006554fa + local_10 * 0x30] = uVar2;
    if ((param_1 === 0)) {
      _MEM[DAT_006554fa + local_10 * 0x30] = uVar1;
    }
    for (/* cond: (local_18 < 7) */); local_18 = (local_18 < 7); local_18 = (local_18 + 1)) {
      for (/* cond: (local_1c < 2) */); local_1c = (local_1c < 2); local_1c = (local_1c + 1)) {
        if ((param_1 !== 0)) {
          w16((DAT_0065550c + (local_18 * 4 + (local_10 * 0x30 + local_1c * 2))), 0, ((s32((DAT_00654fe0 + (local_1c * 4 + local_18 * 8)), 0)) & 0xFFFF));
        }
      }
    }
    do {
      iVar7 = FUN_004a2534();
      if ((0 < iVar7)) {
        uVar5 = s16((DAT_0065550c + (iVar7 * 4 + local_10 * 0x30)), 0);
        uVar4 = s16((DAT_0065550e + (iVar7 * 4 + local_10 * 0x30)), 0);
        uVar3 = FUN_004a25aa();
        w16((DAT_0065550c + (iVar7 * 4 + local_10 * 0x30)), 0, uVar3);
        uVar3 = FUN_004a25aa();
        w16((DAT_0065550e + (iVar7 * 4 + local_10 * 0x30)), 0, uVar3);
        if ((param_1 === 0)) {
          w16((DAT_0065550c + (iVar7 * 4 + local_10 * 0x30)), 0, uVar5);
          w16((DAT_0065550e + (iVar7 * 4 + local_10 * 0x30)), 0, uVar4);
        }
      }
    } while ((0 < iVar7));
  }
  return;
}


 export function FUN_0041b00e (param_1)

 {
  let uVar1;
  let local_8;

  FUN_00419d23();
  FUN_0041a046(0);
  FUN_0041a422(0);
  FUN_0041a5c4(0);
  FUN_0041a95f();
  FUN_0041ab18(param_1);
  FUN_004a2379(0, s_CARAVAN_0062532c);
  for (/* cond: (local_8 < 0x10) */); local_8 = (local_8 < 0x10); local_8 = (local_8 + 1)) {
    FUN_004a23fc(1);
    uVar1 = FUN_004a26bf(0xa);
    w32((DAT_0064b168 + local_8 * 4), 0, uVar1);
  }
  FUN_004a2379(0, s_ORDERS_00625334);
  for (/* cond: (local_8 < 0xd) */); local_8 = (local_8 < 0xd); local_8 = (local_8 + 1)) {
    FUN_004a23fc(1);
    uVar1 = FUN_004a25aa();
    w32((DAT_00655490 + local_8 * 8), 0, uVar1);
    FUN_004a24b1();
    _MEM[(local_8 * 8 + 0x655494)] = DAT_00673e10;
  }
  FUN_004a2379(0, s_DIFFICULTY_0062533c);
  for (/* cond: (local_8 < 6) */); local_8 = (local_8 < 6); local_8 = (local_8 + 1)) {
    uVar1 = FUN_004a257a();
    w32((DAT_0064ba10 + local_8 * 4), 0, uVar1);
  }
  FUN_004a2379(0, s_ATTITUDES_00625348);
  for (/* cond: (local_8 < 9) */); local_8 = (local_8 < 9); local_8 = (local_8 + 1)) {
    uVar1 = FUN_004a257a();
    w32((DAT_0064b9c0 + local_8 * 4), 0, uVar1);
  }
  FUN_004a2020();
  return;
}


 export function FUN_0041b177 ()

 {
  let iVar1;
  let UVar2;
  let unaff_FS_OFFSET;
  let local_330;
  let local_32c;
  let local_328;
  let local_2c;
  let local_28;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0041b476;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_328 = 1;
  local_2c = 1;
  local_32c = 1;
  FUN_0059db08(0x4000);
  local_8 = 0;
  iVar1 = FUN_004a2379(s_INTER.DAT_00625358, DAT_00625354);
  if ((iVar1 === 0)) {
    FUN_004a23fc(1);
    local_328 = FUN_004a2534();
    FUN_004a23fc(1);
    local_2c = FUN_004a2534();
    FUN_004a23fc(1);
    local_32c = FUN_004a2534();
    FUN_004a2020();
  }
  if ((local_32c === 0)) {
    local_32c = 1;
    local_2c = 1;
    local_328 = 1;
  }
  FUN_0040bc40(1);
  local_14 = 0;
  local_330 = -1;
  if ((local_328 !== 0)) {
    FUN_0059edf0(s_English_00625364, 0, 0);
    local_14 = (local_14 + 1);
    local_330 = 0;
  }
  if ((local_2c !== 0)) {
    FUN_0059edf0(s_Francais_0062536c, 1, 0);
    local_14 = (local_14 + 1);
    if ((local_330 < 0)) {
      local_330 = 1;
    }
  }
  if ((local_32c !== 0)) {
    FUN_0059edf0(s_Deutsch_00625378, 2, 0);
    local_14 = (local_14 + 1);
    if ((local_330 < 0)) {
      local_330 = 2;
    }
  }
  if ((local_330 < 0)) {
    local_330 = 0;
  }
  UVar2 = FUN_006e7b34(s_Civilization_Gold_0062539c, s_Language_Preference_00625388, 0, s_CIV.INI_00625380);
  if ((UVar2 < 1)) {
    if ((1 < local_14)) {
      local_330 = FUN_0040bc80(0);
    }
    FUN_004aef20(DAT_ffffffd8);
    FUN_004af1d5(DAT_ffffffd8, (local_330 + 1));
    FUN_006e7b38(s_Civilization_Gold_006253cc, s_Language_Preference_006253b8, DAT_ffffffd8, s_CIV.INI_006253b0);
  }
  else {
    local_330 = (UVar2 - 1);
  }
  wv(DAT_00628064, local_330);
  if ((local_330 < 0)) {
    local_8 = -1;
    FUN_0041b46a();
    FUN_0041b480();
    return;
  }
  if ((local_330 === 1)) {
    FUN_005f22d0(DAT_0062cd24, DAT_006253e0);
  }
  if ((local_330 === 2)) {
    FUN_005f22d0(DAT_0062cd24, DAT_006253e4);
  }
  local_8 = -1;
  FUN_0041b46a();
  FUN_0041b480();
  return;
}


 export function FUN_0041b46a ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0041b480 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0041b48f ()

 {
  if ((DAT_006252c4 !== 0)) {
    FUN_0041f878();
  }
  FUN_0041b8b0();
  wv(DAT_0062c5b0, 1);
  return;
}


 export function FUN_0041b4c0 ()

 {
  let uVar1;
  let iVar2;
  let UVar3;
  let local_c;

  FUN_005f22d0(DAT_006558e8, DAT_006253e8);
  FUN_005f22d0(DAT_006559e8, s_RULES_006253f0);
  __getcwd(DAT_00655020, 0x104);
  FUN_005f22d0(DAT_0064bb08, DAT_00655020);
  for (/* cond: (local_c < 8) */); local_c = (local_c < 8); local_c = (local_c + 1)) {
    w16((DAT_0066ca84 + local_c * 0x3f0), 0, 0);
    w32(DAT_0066c988, local_c * 0xfc, 0);
  }
  FUN_006e7fb8(4);
  uVar1 = FUN_00421bb0();
  FUN_005f2260(uVar1);
  uVar1 = FUN_00421bb0();
  FUN_0059a6f0(uVar1);
  FUN_0059d487(0x10, 0x21, 0x25, 0x1a, 0x1d, 0x25, 0x12, 0x1a, 0xa);
  FUN_005d417f(0x10);
  FUN_005d41af(0x21, 1, 1);
  FUN_005d4197(0x1a);
  FUN_005d2550(0x10);
  FUN_005d2568(0x21, 1, 1);
  FUN_0059d4df(0x23, 0xa, 0xa, 0x17, 0x29, 0xa, 0x12);
  FUN_0044b49e();
  FUN_00453f90();
  wv(DAT_00628064, (DAT_00626960 + -1));
  if ((2 < (DAT_00626960 + -1))) {
    wv(DAT_00628064, 0);
  }
  FUN_005f22d0(DAT_0062cd24, DAT_006253f8);
  /* switch */ () {
  case 1 :
    FUN_005f22d0(DAT_0062cd24, DAT_006253fc);
    break;
  case 2 :
    FUN_005f22d0(DAT_0062cd24, DAT_00625400);
    break;
  case 3 :
    FUN_005f22d0(DAT_0062cd24, DAT_00625404);
    break;
  case 4 :
    FUN_005f22d0(DAT_0062cd24, DAT_00625408);
    break;
  case 5 :
    FUN_005f22d0(DAT_0062cd24, DAT_0062540c);
  }
  FUN_004db23f(DAT_006558e8, 0x4000);
  iVar2 = FUN_004a2379(PTR_s_LABELS_00627674, s_STRINGHEAP_00625410);
  if ((iVar2 === 0)) {
    FUN_004a23fc(1);
    iVar2 = FUN_004a2534();
    if ((DAT_006252c0 < iVar2)) {
      wv(DAT_006252c0, iVar2);
    }
  }
  FUN_00428a0f(DAT_006252c0);
  FUN_00428a95(s_<nil>_0062541c);
  FUN_0046a78d();
  FUN_0059d401();
  FUN_004a733d();
  wv(DAT_00655aea, DAT_0064bc1e);
  UVar3 = FUN_006e7b34(s_Civilization_Gold_00625444, s_Herald_Warning_Shown_0062542c, 0, s_CIV.INI_00625424);
  if ((UVar3 === 0)) {
    iVar2 = FUN_00421ea0(s_HERALDWARNING_00625458);
    if ((iVar2 === 0)) {
      wv(DAT_0064bc1e, (DAT_0064bc1e & -0x200001));
    }
    else {
      wv(DAT_0064bc1e, (DAT_0064bc1e | 0x200000));
    }
    wv(DAT_00655aea, DAT_0064bc1e);
    FUN_004a73d9();
    FUN_006e7b38(s_Civilization_Gold_0062548c, s_Herald_Warning_Shown_00625474, DAT_00625470, s_CIV.INI_00625468);
  }
  iVar2 = FUN_00589a5b();
  if ((iVar2 === 0)) {
    uVar1 = 1;
  }
  else {
    iVar2 = FUN_004080c0();
    if ((0x3e8 < (DAT_006acbb0 + iVar2))) {
      FUN_00417ef0(0, 0x18);
      FUN_00417ef0(0, 0x14);
      FUN_00417ef0(0, 0x18);
      FUN_00421e40(3, 2);
    }
    FUN_00551fed();
    FUN_00589d80(LAB_0040234c);
    FUN_0041b00e(1);
    FUN_005681c9();
    FUN_00498d40();
    FUN_00498784();
    wv(DAT_00654fa8, 0);
    wv(DAT_00654fa4, 0);
    wv(DAT_00654fa6, 0);
    uVar1 = 0;
  }
  return uVar1;
}


 export function FUN_0041b8b0 ()

 {
  FUN_00484d52();
  FUN_005d48d0();
  FUN_00484d52();
  FUN_00568381();
  FUN_00484d52();
  FUN_004db450();
  FUN_0046a740();
  FUN_00428a78();
  FUN_00484d52();
  FUN_00589c79();
  FUN_00484d52();
  FUN_006e7f80(4);
  return;
}


 export function FUN_0041b8ff (param_1)

 {
  let iVar1;
  let uVar2;
  let local_3c;
  let local_38;
  let aiStack_34;

  local_3c = 0x64;
  local_38 = 0;
  while ((local_38 < 0xc)) {
    if ((iVar1 !== 0)) {
      w32(DAT_ffffffcc, local_38, local_3c);
      local_38 = (local_38 + 1);
    }
    local_3c = (local_3c + -1);
  }
  uVar2 = FUN_00493b10(param_1);
  FUN_0040ff60(0, uVar2);
  uVar2 = FUN_00493c7d(param_1);
  FUN_0040ff60(1, uVar2);
  FUN_0040bbb0();
  local_3c = local_38;
  if ((0 < local_38)) {
    while ((-1 < local_3c)) {
      FUN_0040ff00(s32((DAT_00627684 + s32(DAT_ffffffcc, local_3c) * 0x10), 0));
      FUN_00421d30();
      FUN_0040fe10();
    }
  }
  FUN_0040ff60(2, DAT_00679640);
  if ((2 < DAT_00655b02)) {
    wv(DAT_00635a3c, LAB_00403c74);
  }
  FUN_00410030(DAT_006254a0, DAT_0063fc58, 0);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0041ba52 (param_1)

 {
  let bVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let unaff_FS_OFFSET;
  let iVar5;
  let uVar6;
  let local_458;
  let local_454;
  let local_450;
  let local_448;
  let local_444;
  let local_43c;
  let local_438;
  let local_434;
  let local_330;
  let local_32c;
  let local_328;
  let local_324;
  let local_2fc;
  let local_2e8;
  let local_248;
  let local_fc;
  let local_30;
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
  puStack_c = LAB_0041d3fe;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_330 = 1;
  local_28 = 0;
  local_328 = 0;
  FUN_0059db08(0x2000);
  local_8 = 0;
  FUN_00419ed3();
  _DAT_00655af6 = 0;
 LAB_0041bab3: :
  do {
    do {
      FUN_0055a41d(3, 6, 3);
      FUN_0040ffa0(s_DIFFICULTY_006254a8, 1);
      FUN_0059ea99(((DAT_0064bc14) << 16 >> 16));
      FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      local_18 = FUN_0040bc80(0);
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_0055a567();
      if ((local_18 < 0)) {
 LAB_0041d3cf: :
        local_8 = -1;
        FUN_0041d3f2();
        FUN_0041d408();
        return;
      }
      wv(DAT_00655b08, ((local_18) & 0xFF));
      wv(DAT_0064bc14, ((local_18) & 0xFFFF));
      FUN_0055a41d(1, 6, 4);
      FUN_0040ffa0(s_ENEMIES_006254b4, 1);
      FUN_0059ea99(((DAT_0064bc24) << 16 >> 16));
      FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      local_32c = FUN_0040bc80(0);
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_0055a567();
    } while ((local_32c < 0));
    if ((local_248 === 0)) {
      wv(DAT_0064bc24, ((local_32c) & 0xFFFF));
      wv(DAT_00655b0d, (6 - ((local_32c) & 0xFF)));
    }
    else {
      iVar2 = _rand();
      wv(DAT_00655b0d, ((((iVar2 % 5)) & 0xFF) + 2));
    }
    FUN_0055a41d(3, 6, 5);
    FUN_0040ffa0(s_BARBARITY_006254bc, 1);
    FUN_0059ea99(((DAT_0064bc28) << 16 >> 16));
    FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    iVar2 = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
  } while ((iVar2 < 0));
  if ((local_248 === 0)) {
    local_438 = ((iVar2) & 0xFF);
    wv(DAT_00655b09, local_438);
    wv(DAT_0064bc28, ((iVar2) & 0xFFFF));
  }
  else if ((DAT_00655b08 < 2)) {
    iVar2 = _rand();
    bVar1 = (((iVar2 >> 0x1f)) & 0xFF);
    wv(DAT_00655b09, ((((((((iVar2) & 0xFF) ^ bVar1) - bVar1) & 1) ^ bVar1) - bVar1) + DAT_00655b08));
  }
  else if ((DAT_00655b08 < 5)) {
    iVar2 = _rand();
    wv(DAT_00655b09, ((((iVar2 % 3)) & 0xFF) + 1));
  }
  else {
    iVar2 = _rand();
    bVar1 = (((iVar2 >> 0x1f)) & 0xFF);
    wv(DAT_00655b09, ((((((((iVar2) & 0xFF) ^ bVar1) - bVar1) & 1) ^ bVar1) - bVar1) + 2));
  }
  do {
    wv(DAT_00655ae8, 0x3f);
    FUN_0055a41d(1, 6, 9);
    FUN_0040ffa0(s_RULES_006254c8, 1);
    FUN_0059ea99(((DAT_0064bc54) << 16 >> 16));
    FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    iVar2 = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
    if ((iVar2 < 0));
    if ((iVar2 === 0));
    if ((param_1 === 1)) {
      wv(DAT_00655ae8, (DAT_0064bc10 & 0x7fff));
    }
    else if ((param_1 === 2)) {
      wv(DAT_00655ae8, (DAT_0064bc10 | 0x8000));
    }
    FUN_0051d7bc();
    FUN_0051d7d6(0, ((DAT_00655ae8 & 0x10) === 0));
    FUN_0051d7d6(1, (DAT_00655ae8 & 0x8000));
    FUN_0051d7d6(2, 0);
    FUN_0051d7d6(3, ((DAT_0064bc56) << 16 >> 16));
    FUN_0051d7d6(4, (DAT_00655ae8 & 0x80));
    FUN_0051d7d6(5, (DAT_00655ae8 & 0x100));
    FUN_0055a41d(3, 6, 9);
    FUN_005a632a(DAT_006359d4, s_ADVANCED_006254d0, 0, 0, 0, 0, 0, 0);
    if (((local_2e8 & 4) !== 0)) {
      for (/* cond: (local_30 < local_2fc) */); local_30 = (local_30 < local_2fc); local_30 = (local_30 + 1)) {
        FUN_0059ea4d(local_30, ((1 << (((local_30) & 0xFF) & 0x1f)) & DAT_00631ed8));
      }
    }
    FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
    wv(DAT_00631edc, local_248);
    if (((local_2e8 & 4) !== 0)) {
      wv(DAT_00631ed8, 0);
      for (/* cond: (local_30 < local_2fc) */); local_30 = (local_30 < local_2fc); local_30 = (local_30 + 1)) {
        iVar2 = FUN_0059e9f3(local_30);
        if ((iVar2 !== 0)) {
          wv(DAT_00631ed8, (DAT_00631ed8 | (1 << (((local_30) & 0xFF) & 0x1f))));
        }
      }
    }
    wv(DAT_00655ae8, 0x2f);
    iVar2 = FUN_0051d817(0);
    if ((iVar2 === 0)) {
      wv(DAT_00655ae8, (0x2f | 0x10));
    }
    iVar2 = FUN_0051d817(1);
    if ((iVar2 !== 0)) {
      wv(DAT_00655ae8, (DAT_00655ae8 | 0x8000));
    }
    local_28 = FUN_0051d817(2);
    local_328 = FUN_0051d817(3);
    iVar2 = FUN_0051d817(4);
    if ((iVar2 !== 0)) {
      wv(DAT_00655ae8, (DAT_00655ae8 | 0x80));
    }
    iVar2 = FUN_0051d817(5);
    if ((iVar2 !== 0)) {
      wv(DAT_00655ae8, (DAT_00655ae8 | 0x100));
    }
    if ((param_1 === 0)) {
      wv(DAT_0064bc10, DAT_00655ae8);
    }
    else {
      wv(DAT_0064bc10, ((DAT_00655ae8 & 0x7fff) | (DAT_0064bc10 & 0x8000)));
    }
    if ((local_328 === 0));
    iVar2 = FUN_00484fec(0);
    if ((iVar2 < 1)) {
      uVar3 = FUN_00484fec(0);
      local_450 = ((~uVar3) + 1);
    }
    else {
      local_450 = FUN_00484fec(0);
    }
    FUN_00421da0(0, local_450);
    iVar2 = FUN_00484fec(0x15);
    if ((iVar2 < 1)) {
      uVar3 = FUN_00484fec(0x15);
      local_454 = ((~uVar3) + 1);
    }
    else {
      local_454 = FUN_00484fec(0x15);
    }
    FUN_00421da0(1, local_454);
    iVar2 = FUN_00484fec(0x29);
    if ((iVar2 < 1)) {
      uVar3 = FUN_00484fec(0x29);
      local_458 = ((~uVar3) + 1);
    }
    else {
      local_458 = FUN_00484fec(0x29);
    }
    FUN_00421da0(2, local_458);
    FUN_0055a41d(1, 6, 9);
    FUN_0040ffa0(s_ACCELERATED_006254dc, 1);
    FUN_0059ea99(((DAT_0064bc56) << 16 >> 16));
    FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    local_328 = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
  } while ((local_328 < 0));
  wv(DAT_0064bc56, ((local_328) & 0xFFFF));
 LAB_0041c35d: :
  do {
    for (/* cond: (local_448 < 0x15) */); local_448 = (local_448 < 0x15); local_448 = (local_448 + 1)) {
      if ((s16((DAT_00655502 + local_448 * 0x30), 0) < 1)) {
        w16((DAT_00655502 + local_448 * 0x30), 0, ((~s16((DAT_00655502 + local_448 * 0x30), 0)) + 1));
      }
      if ((s16((DAT_00655504 + local_448 * 0x30), 0) < 1)) {
        w16((DAT_00655504 + local_448 * 0x30), 0, ((~s16((DAT_00655504 + local_448 * 0x30), 0)) + 1));
      }
      if ((s16((DAT_00655506 + local_448 * 0x30), 0) < 1)) {
        w16((DAT_00655506 + local_448 * 0x30), 0, ((~s16((DAT_00655506 + local_448 * 0x30), 0)) + 1));
      }
      for (/* cond: (local_20 < 7) */); local_20 = (local_20 < 7); local_20 = (local_20 + 1)) {
        if ((s16((DAT_0065550c + (local_20 * 4 + local_448 * 0x30)), 0) < 1)) {
          w16((DAT_0065550c + (local_20 * 4 + local_448 * 0x30)), 0, ((~s16((DAT_0065550c + (local_20 * 4 + local_448 * 0x30)), 0)) + 1));
        }
        if ((s16((DAT_0065550e + (local_20 * 4 + local_448 * 0x30)), 0) < 1)) {
          w16((DAT_0065550e + (local_20 * 4 + local_448 * 0x30)), 0, ((~s16((DAT_0065550e + (local_20 * 4 + local_448 * 0x30)), 0)) + 1));
        }
      }
    }
    FUN_0055a41d(2, 6, 6);
    FUN_0040ffa0(s_GENDER_006254e8, 1);
    FUN_0059ea99(((DAT_0064bc18) << 16 >> 16));
    FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    iVar2 = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
    if ((iVar2 < 0));
    FUN_0055a41d(2, 6, 7);
    local_14 = Create(DAT_fffffcdc, 0x6254f8, 0x6254f0, 1);
    if ((local_14 !== 0)) {
      FUN_0055a567();
      goto LAB_0041d3cf;
    }
    FUN_0059e4e6(3);
    for (/* cond: (local_448 < 0x15) */); local_448 = (local_448 < 0x15); local_448 = (local_448 + 1)) {
      uVar6 = 0;
      iVar5 = local_448;
      uVar4 = FUN_00428b0c(((s16((DAT_00655504 + local_448 * 0x30), 0)) << 16 >> 16), local_448, 0);
      FUN_0059edf0(uVar4, iVar5, uVar6);
    }
    FUN_0059ea99(((DAT_0064bc16) << 16 >> 16));
    FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    local_1c = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
    if ((-1 < local_1c)) {
      wv(DAT_00655b03, _MEM[DAT_006554fe + local_1c * 0x30]);
      wv(DAT_0064bc16, ((local_1c) & 0xFFFF));
      w16((DAT_0064c6a6 + s8(_MEM[DAT_006554fe + local_1c * 0x30]) * 0x594), 0, ((local_1c) & 0xFFFF));
      _MEM[DAT_0064ca92 + s8(_MEM[DAT_006554fe + local_1c * 0x30]) * 0x594] = ((local_1c) & 0xFF);
      if ((iVar2 !== 0)) {
        _MEM[DAT_0064ca92 + s8(_MEM[DAT_006554fe + local_1c * 0x30]) * 0x594] = (_MEM[DAT_0064ca92 + s8(_MEM[DAT_006554fe + local_1c * 0x30]) * 0x594] + 0x15);
      }
      wv(DAT_006d1da0, s8(DAT_00655b03));
      wv(DAT_00655b0b, (((1 << (DAT_00655b03 & 0x1f))) & 0xFF));
      local_43c = ((iVar2) & 0xFF);
      _MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30] = local_43c;
      w16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, s16((DAT_00655508 + (u8(_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30]) * 2 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30)), 0));
      uVar4 = FUN_00428b0c(((s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
      FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), uVar4);
      w16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655502 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
      if ((local_248 === 0)) {
        FUN_0055a41d(2, 6, 7);
        FUN_005a632a(DAT_006359d4, DAT_0062551c, 0x17, (DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), 0, 0, 0, 1);
        FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
        local_14 = FUN_005a5f34(DAT_fffffbcc, 0);
        FUN_0046e020(0x6a, 0, 0, 0);
        FUN_0055a567();
        if ((local_14 !== 0));
      }
      else {
        uVar4 = FUN_00428b0c(((s16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
        FUN_005f22d0((DAT_0064bd12 + s8(DAT_00655b03) * 0xf2), uVar4);
        uVar4 = FUN_00428b0c(((s16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
        FUN_005f22d0((DAT_0064bd2a + s8(DAT_00655b03) * 0xf2), uVar4);
        w16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655504 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
        w16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0, (-s16((DAT_00655506 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)));
        for (/* cond: (local_20 < 7) */); local_20 = (local_20 < 7); local_20 = (local_20 + 1)) {
          uVar4 = FUN_00428b0c(((s16((DAT_0065550c + (local_20 * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + iVar2 * 2))), 0)) << 16 >> 16));
          FUN_005f22d0((DAT_0064bd42 + (s8(DAT_00655b03) * 0xf2 + local_20 * 0x18)), uVar4);
          w16((DAT_0065550c + (local_20 * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + iVar2 * 2))), 0, (-s16((DAT_0065550c + (local_20 * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + iVar2 * 2))), 0)))
          ;
        }
        while ((local_248 !== 2)) {
          while ((local_248 !== 1)) {
            FUN_00421d60(1, (DAT_0064bd12 + s8(DAT_00655b03) * 0xf2));
            FUN_00421d60(2, (DAT_0064bd2a + s8(DAT_00655b03) * 0xf2));
            FUN_0055a41d(2, 6, 7);
            local_14 = FUN_005a632a(DAT_006359d4, s_CUSTOMTRIBE_00625500, 0x17, (DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), 0, 0, 0, 1);
            if ((local_14 !== 0)) {
              FUN_0055a567();
              goto LAB_0041d3cf;
            }
            FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
            iVar2 = FUN_0040bc80(0);
            FUN_0046e020(0x6a, 0, 0, 0);
            FUN_0055a567();
            if ((iVar2 < 0));
            FUN_005f22d0((DAT_0064bd12 + s8(DAT_00655b03) * 0xf2), DAT_0063cd4c);
            FUN_005f22d0((DAT_0064bd2a + s8(DAT_00655b03) * 0xf2), DAT_0063ce50);
            if ((local_248 !== 1));
            local_14 = FUN_0040ffa0(s_CUSTOMTRIBE2_0062550c, 1);
            if ((local_14 !== 0)) {
              FUN_0055a567();
              goto LAB_0041d3cf;
            }
            local_14 = 0;
            for (/* cond: (local_20 < 7) */); local_20 = (local_20 < 7); local_20 = (local_20 + 1)) {
              FUN_0040bbb0();
              FUN_0040ff00(s32((DAT_0064b9a0 + local_20 * 4), 0));
              FUN_0040fe40();
              FUN_0059f06d(DAT_00679640, (DAT_0064bd42 + (s8(DAT_00655b03) * 0xf2 + local_20 * 0x18)), 0x17);
            }
            FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
            iVar2 = FUN_0040bc80(0);
            if ((iVar2 === 0)) {
              for (/* cond: (local_20 < 7) */); local_20 = (local_20 < 7); local_20 = (local_20 + 1)) {
                FUN_005f22d0((DAT_0064bd42 + (s8(DAT_00655b03) * 0xf2 + local_20 * 0x18)), (DAT_0063cc48 + local_20 * 0x104));
              }
            }
            FUN_0046e020(0x6a, 0, 0, 0);
            FUN_0055a567();
          }
          if ((local_248 !== 2));
        }
      }
 LAB_0041cfad: :
      FUN_0055a41d(1, 6, 8);
      FUN_0040ffa0(s_CUSTOMCITY_00625524, 0x20001);
      for (/* cond: (local_444 < 4) */); local_444 = (local_444 < 4); local_444 = (local_444 + 1)) {
        uVar4 = FUN_00428b0c(s32(((DAT_00628420 + 0x3d8) + local_444 * 4), 0));
        FUN_0059ec88((local_444 * 0x1e0 + 0x63fff4), local_444, uVar4);
      }
      FUN_0059ea99(((s16((DAT_00655500 + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30), 0)) << 16 >> 16));
      FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      iVar2 = FUN_0040bc80(0);
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_0055a567();
      if ((-1 < iVar2)) {
        w16((DAT_0064bcf8 + s8(DAT_00655b03) * 0xf2), 0, ((iVar2) & 0xFFFF));
        wv(DAT_00655b0a, (DAT_00655b0b | 1));
        for (/* cond: (local_20 < u8(DAT_00655b0d)) */); local_20 = (local_20 < u8(DAT_00655b0d)); local_20 = (local_20 + 1)) {
          iVar2 = _rand();
          local_448 = (((iVar2 >> 0x1f)) & 0xFF);
          local_448 = (((((((iVar2) & 0xFF) ^ (((iVar2 >> 0x1f)) & 0xFF)) - (((iVar2 >> 0x1f)) & 0xFF)) & 7) ^ (((iVar2 >> 0x1f)) & 0xFF)) - (((iVar2 >> 0x1f)) & 0xFF));
          if ((((1 << ((((((((iVar2) & 0xFF) ^ (((iVar2 >> 0x1f)) & 0xFF)) - (((iVar2 >> 0x1f)) & 0xFF)) & 7) ^ (((iVar2 >> 0x1f)) & 0xFF)) - (((iVar2 >> 0x1f)) & 0xFF)) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
            wv(DAT_00655b0a, (DAT_00655b0a | (((1 << ((((((((iVar2) & 0xFF) ^ (((iVar2 >> 0x1f)) & 0xFF)) - (((iVar2 >> 0x1f)) & 0xFF)) & 7) ^ (((iVar2 >> 0x1f)) & 0xFF)) - (((iVar2 >> 0x1f)) & 0xFF)) & 0x1f))) & 0xFF)));
          }
          else {
            local_20 = (local_20 + -1);
          }
        }
        if ((local_28 !== 0)) {
          local_24 = 0;
          local_448 = 1;
          do {
            if ((7 < local_448)) {
              local_24 = (local_24 + 1);
              FUN_00421da0(0, local_24);
              FUN_0055a41d(2, 6, 9);
              FUN_0040ffa0(s_OPPONENT_00625530, 1);
              w32((local_fc + 4), 0, 0x15);
              for (/* cond: (local_2c < 0x15) */); local_2c = (local_2c < 0x15); local_2c = (local_2c + 1)) {
                if ((((s16((DAT_006554fe + local_2c * 0x30), 0)) << 16 >> 16) === local_448)) {
                  FUN_0040bbb0();
                  FUN_0040ff00(((s16((DAT_00655504 + local_2c * 0x30), 0)) << 16 >> 16));
                  FUN_0040fe10();
                  FUN_0040fea0();
                  FUN_0040ff00(((s16((DAT_00655502 + local_2c * 0x30), 0)) << 16 >> 16));
                  FUN_0040fed0();
                  FUN_0059edf0(DAT_00679640, local_2c, 0);
                }
              }
              FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
              local_2c = FUN_0040bc80(0);
              FUN_0046e020(0x6a, 0, 0, 0);
              FUN_0055a567();
              if ((local_2c < 0)) {
                _MEM[DAT_0062ced0 + local_448] = ((local_2c) & 0xFF);
              }
            }
            local_448 = (local_448 + 1);
          } ( true );
        }
        FUN_004a73d9();
        FUN_0041a046(1);
        FUN_0041a5c4(1);
        FUN_0041a422(1);
        FUN_00419c8b();
        FUN_00408d33(param_1);
        FUN_004aa9c0();
        if ((local_328 !== 0)) {
          FUN_004a9785((local_328 + -1));
        }
        FUN_0041b8ff(s8(DAT_00655b03));
        local_330 = 0;
        goto LAB_0041d3cf;
      }
    }
  } while ( true );
}


 export function FUN_0041d3f2 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0041d408 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0041d417 ()

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_22c;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0041d7d1;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  wv(DAT_00655af0, 0);
  do {
    FUN_0055a41d(2, 6, 2);
    FUN_0040ffa0(s_SIZEOFMAP_0062553c, 1);
    FUN_0059ea99(((DAT_0064bc26) << 16 >> 16));
    FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    iVar1 = FUN_0040bc80(0);
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
    if ((iVar1 < 0)) {
 LAB_0041d739: :
      if ((0x176f < ((DAT_006d1162) << 16 >> 16) * ((DAT_006d1160) << 16 >> 16))) {
        wv(DAT_00655af0, (DAT_00655af0 | 4));
      }
      if ((((DAT_006d1162) << 16 >> 16) * ((DAT_006d1160) << 16 >> 16) < 0xbb8)) {
        wv(DAT_00655af0, (DAT_00655af0 | 8));
      }
      wv(DAT_006d1160, DAT_006d1160 * 2);
      local_8 = -1;
      FUN_0041d7c5();
      FUN_0041d7db();
      return;
    }
    if ((local_22c === 0)) {
      wv(DAT_0064bc26, ((iVar1) & 0xFFFF));
      if ((iVar1 === 0)) {
        wv(DAT_006d1160, 0x28);
        wv(DAT_006d1162, 0x32);
      }
      else if ((iVar1 === 2)) {
        wv(DAT_006d1160, 0x4b);
        wv(DAT_006d1162, 0x78);
      }
      else {
        wv(DAT_006d1160, 0x32);
        wv(DAT_006d1162, 0x50);
      }
      goto LAB_0041d739;
    }
    while ((iVar1 < 0)) {
      FUN_00421d60(1, DAT_00625548);
      FUN_0055a41d(2, 6, 2);
      iVar1 = FUN_005a632a(DAT_006359d4, s_CUSTOMSIZE_00625550, 5, DAT_0062554c, 0, 0, 0, 1);
      if ((iVar1 !== 0)) {
        FUN_0055a567();
        goto LAB_0041d739;
      }
      FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      iVar1 = FUN_0040bc80(0);
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_0055a567();
      if ((iVar1 < 0));
      wv(DAT_006d1160, ((iVar1) & 0xFFFF));
      iVar1 = _atoi(DAT_0063cd4c);
      wv(DAT_006d1162, ((iVar1) & 0xFFFF));
      if ((0x3e7 < ((((iVar1) & 0xFFFF)) << 16 >> 16) * ((((iVar1) & 0xFFFF)) << 16 >> 16)));
}


 export function FUN_0041d7c5 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0041d7db (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0041d7ea ()

 {
  let bVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_228;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0041dcaa;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  bVar1 = 1;
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_0055a41d(2, 6, 2);
  FUN_0040ffa0(s_CUSTOMLAND_0062555c, 1);
  FUN_0059ea99((((DAT_0064bc2a) << 16 >> 16) + 1));
  FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
  iVar2 = FUN_0040bc80(0);
  wv(DAT_00624ee8, (iVar2 + -1));
  FUN_0046e020(0x6a, 0, 0, 0);
  FUN_0055a567();
  if ((-2 < (iVar2 + -1))) {
    if ((local_228 === 0)) {
      wv(DAT_0064bc2a, (((iVar2 + -1)) & 0xFFFF));
    }
    else {
      iVar2 = _rand();
      wv(DAT_00624ee8, ((iVar2 % 3) + -1));
    }
    FUN_0055a41d(2, 6, 0xc);
    FUN_0040ffa0(s_CUSTOMFORM_00625568, 1);
    FUN_0059ea99((((DAT_0064bc2c) << 16 >> 16) + 1));
    FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
    iVar2 = FUN_0040bc80(0);
    wv(DAT_00624eec, (iVar2 + -1));
    FUN_0046e020(0x6a, 0, 0, 0);
    FUN_0055a567();
    if ((-2 < (iVar2 + -1))) {
      if ((local_228 === 0)) {
        wv(DAT_0064bc2c, (((iVar2 + -1)) & 0xFFFF));
      }
      else {
        wv(DAT_00624eec, 0);
        iVar2 = _rand();
        if (((iVar2 % 3) === 0)) {
          wv(DAT_00624eec, DAT_00624ee8);
        }
      }
      FUN_0055a41d(2, 6, 0xb);
      FUN_0040ffa0(s_CUSTOMCLIMATE_00625574, 1);
      FUN_0059ea99((((DAT_0064bc30) << 16 >> 16) + 1));
      FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      iVar2 = FUN_0040bc80(0);
      wv(DAT_00624ef4, (iVar2 + -1));
      FUN_0046e020(0x6a, 0, 0, 0);
      FUN_0055a567();
      if ((-2 < (iVar2 + -1))) {
        if ((local_228 === 0)) {
          wv(DAT_0064bc30, (((iVar2 + -1)) & 0xFFFF));
        }
        else {
          iVar2 = _rand();
          wv(DAT_00624ef4, ((iVar2 % 3) + -1));
        }
        FUN_0055a41d(2, 6, 0xd);
        FUN_0040ffa0(s_CUSTOMTEMP_00625584, 1);
        FUN_0059ea99((((DAT_0064bc2e) << 16 >> 16) + 1));
        FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
        iVar2 = FUN_0040bc80(0);
        wv(DAT_00624ef0, (iVar2 + -1));
        FUN_0046e020(0x6a, 0, 0, 0);
        FUN_0055a567();
        if ((-2 < (iVar2 + -1))) {
          if ((local_228 === 0)) {
            wv(DAT_0064bc2e, (((iVar2 + -1)) & 0xFFFF));
          }
          else {
            iVar2 = _rand();
            wv(DAT_00624ef0, ((iVar2 % 3) + -1));
          }
          FUN_0055a41d(2, 6, 0xa);
          FUN_0040ffa0(s_CUSTOMAGE_00625590, 1);
          FUN_0059ea99((((DAT_0064bc32) << 16 >> 16) + 1));
          FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
          iVar2 = FUN_0040bc80(0);
          wv(DAT_00624ef8, (iVar2 + -1));
          FUN_0046e020(0x6a, 0, 0, 0);
          FUN_0055a567();
          if ((-2 < (iVar2 + -1))) {
            if ((local_228 === 0)) {
              wv(DAT_0064bc32, (((iVar2 + -1)) & 0xFFFF));
            }
            else {
              iVar2 = _rand();
              wv(DAT_00624ef8, ((iVar2 % 3) + -1));
            }
            bVar1 = 0;
          }
        }
      }
    }
  }
  if ((!bVar1)) {
    FUN_004a73d9();
  }
  local_8 = -1;
  FUN_0041dc9e();
  FUN_0041dcb4();
  return;
}


 export function FUN_0041dc9e ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0041dcb4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0041dcc3 ()

 {
  let local_8;

  for (/* cond: (local_8 < 0x15) */); local_8 = (local_8 < 0x15); local_8 = (local_8 + 1)) {
    w16((DAT_00627fe0 + local_8 * 2), 0, 0xffff);
    w16((DAT_00628010 + local_8 * 2), 0, 0xffff);
  }
  return;
}


 export function FUN_0041dd0e ()

 {
  let uVar1;
  let iVar2;
  let local_120;
  let local_11c;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_14 = 1;
  local_18 = 0;
  FUN_005f22d0(DAT_fffffee4, DAT_0062559c);
  local_1c = FUN_00473e55(0, 0, 1);
  uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x40c), 0), DAT_fffffee4, local_1c, DAT_006255a4, 1, 0);
  iVar2 = FUN_004731d2(DAT_006553d8, uVar1);
  if ((iVar2 !== 0)) {
    local_18 = _fopen(DAT_fffffee4, DAT_006255a8);
    if ((local_18 === 0)) {
      FUN_00421ea0(s_FAILEDTOLOAD_006255ac);
    }
    else {
      iVar2 = FUN_005b8783(local_18, 1);
      if ((iVar2 === 0)) {
        local_10 = DAT_00636598;
        for (/* cond: (local_8 < ((DAT_006d1164) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
          _MEM[(local_10 + 1)] = 0;
          _MEM[(local_10 + 2)] = 0;
          _MEM[(local_10 + 4)] = 0;
          _MEM[(local_10 + 3)] = 0;
          _MEM[(local_10 + 5)] = 0xf0;
          local_10 = (local_10 + 6);
        }
        for (/* cond: (local_120 < 8) */); local_120 = (local_120 < 8); local_120 = (local_120 + 1)) {
          _memset(s32((DAT_006365c0 + local_120 * 4), 0), 0, ((DAT_006d1164) << 16 >> 16));
        }
        if ((DAT_006d1168 < 2)) {
          FUN_005b85fe();
        }
        else {
          iVar2 = FUN_00421ea0(s_USESEED_006255cc);
          if ((iVar2 === 0)) {
            FUN_005b85fe();
          }
          FUN_0046e020(0x6a, 0, 0, 0);
        }
        local_c = 0;
        for (/* cond: (local_8 < 0x15) */); local_8 = (local_8 < 0x15); local_8 = (local_8 + 1)) {
          if ((0xffff < s16((DAT_00627fe0 + local_8 * 2), 0))) {
            local_c = 1;
            break;
          }
        }
        if ((iVar2 === 0)) {
          FUN_0046e020(0x6a, 0, 0, 0);
          for (/* cond: (local_8 < 0x15) */); local_8 = (local_8 < 0x15); local_8 = (local_8 + 1)) {
            w16((DAT_00627fe0 + local_8 * 2), 0, 0xffff);
            w16((DAT_00628010 + local_8 * 2), 0, 0xffff);
          }
        }
        if ((DAT_006d1166 === 0)) {
          wv(DAT_00655ae8, (DAT_00655ae8 & 0x7fff));
        }
        else {
          wv(DAT_00655ae8, (DAT_00655ae8 | 0x8000));
        }
        local_14 = 0;
      }
      else {
        FUN_00421ea0(s_FAILEDTOLOAD_006255bc);
      }
    }
  }
  return local_14;
}


 export function FUN_0041dfe1 ()

 {
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let local_97c;
  let local_974;
  let local_970;
  let local_96c;
  let local_868;
  let local_434;
  let local_430;
  let local_13c;
  let local_138;
  let local_134;
  let local_34;
  let aiStack_30;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0041e7ca;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_005c64da();
  local_8 = ((((local_8) >> 8) << 8) | 1);
 LAB_0041e028: :
  do {
    if ((DAT_0062b420 === 0)) {
      FUN_0046e6a9();
      FUN_0046e020(0x6b, 0, 1, 0);
    }
    FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff798);
    FUN_00419be0(DAT_0063cbd0);
    FUN_00419ba0(0x9e);
    local_434 = FUN_00477d8c(1, 0, 1);
    if ((local_434 !== 0)) {
 LAB_0041e731: :
      if ((local_434 !== 0)) {
        FUN_0046e020(0x6a, 0, 0, 0);
      }
      FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff798);
      FUN_00419be0(DAT_0063cbd0);
      FUN_00419ba0(0x9e);
      local_8 = (local_8 & -0x100);
      FUN_0041e7b2();
      local_8 = -1;
      FUN_0041e7be();
      FUN_0041e7d4();
      return;
    }
    FUN_004729ab(DAT_fffffecc, DAT_00679640, DAT_0062cd24);
    if ((DAT_0062b420 !== 0)) {
      FUN_0046e020(0x6a, 0, 0, 0);
    }
    wv(DAT_00655aea, (DAT_0064bc1e & -0x8001));
    wv(DAT_00655af2, DAT_0064bc22);
    FUN_0040ff60(0, DAT_0064bc62);
    FUN_00421da0(0, ((DAT_0064bcb2) << 16 >> 16));
    FUN_0040bbb0();
    uVar1 = FUN_00484fec(((DAT_00655af8) << 16 >> 16));
    FUN_00421f10(uVar1);
    FUN_0040ff60(1, DAT_00679640);
    FUN_0040bbb0();
    if ((DAT_0064bcb8 === 0)) {
      FUN_00421f10(0x7d0);
    }
    else {
      uVar1 = FUN_00484fec(((DAT_0064bcb8) << 16 >> 16));
      FUN_00421f10(uVar1);
    }
    FUN_0040ff60(2, DAT_00679640);
    if ((DAT_0062b420 !== 0)) {
      FUN_00419c8b();
    }
    FUN_00421dd0();
    iVar2 = Create(DAT_fffffbd0, DAT_fffffecc, 0x6255e0, 0x4008001);
    if ((iVar2 === 0));
  } while ((iVar2 < 0));
  goto LAB_0041e2b4;
 code_r0x0041e1e4: :
  iVar2 = ((DAT_00655afe) << 16 >> 16);
  if ((s8(_MEM[DAT_006560f7 + iVar2 * 0x20]) === ((DAT_0064bcba) << 16 >> 16))) {
    FUN_0059ec88((DAT_00641848 + u8(_MEM[DAT_006560f6 + iVar2 * 0x20]) * 0x3c), 0, 0);
  }
  iVar2 = FUN_0040bc80(0);
  if ((-1 < iVar2)) {
 LAB_0041e2b4: :
    FUN_0040bc40(1);
    for (/* cond: (local_97c < 8) */); local_97c = (local_97c < 8); local_97c = (local_97c + 1)) {
      if ((((1 << (((local_97c) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        FUN_0040bbb0();
        uVar1 = FUN_00493c7d(local_97c);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
        FUN_0040fea0();
        uVar1 = FUN_00493b10(local_97c);
        FUN_0040bbe0(uVar1);
        FUN_0040fed0();
        local_13c = FUN_0059edf0(DAT_00679640, local_97c, 0);
        w32(DAT_ffffffd0, s32((local_13c + 4), 0), local_97c);
      }
    }
    iVar2 = FUN_0040bc80(0);
    if ((-1 < iVar2)) {
      wv(DAT_00654fa4, ((DAT_006d1da0) & 0xFF));
      wv(DAT_00628048, ((DAT_006d1da0) & 0xFF));
      local_97c = ((s32(DAT_ffffffd0, iVar2)) & 0xFF);
      wv(DAT_00655b0b, (((1 << (((s32(DAT_ffffffd0, iVar2)) & 0xFF) & 0x1f))) & 0xFF));
      wv(DAT_00655b03, ((s32(DAT_ffffffd0, iVar2)) & 0xFF));
      wv(DAT_00655b05, ((s32(DAT_ffffffd0, iVar2)) & 0xFF));
      wv(DAT_00655aea, (DAT_00655aea & -0x101));
      wv(DAT_006d1da0, s32(DAT_ffffffd0, iVar2));
      while ((local_34 < 0)) {
        FUN_0040ffa0(s_DIFFICULTY_006255fc, 1);
        FUN_0059ea99(DAT_00655b08);
        FUN_0059e783(((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
        local_34 = FUN_0040bc80(0);
        if ((local_34 < 0));
        if ((((local_34) & 0xFF) === 0)) {
          wv(DAT_00655aea, (DAT_00655aea | 0x100));
        }
        else {
          wv(DAT_00655aea, (DAT_00655aea & -0x101));
        }
        FUN_0040ffa0(s_GENDER_00625608, 1);
        FUN_0059ea99(_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30]);
        FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
        iVar2 = FUN_0040bc80(0);
        FUN_0046e020(0x6a, 0, 0, 0);
        if ((-1 < iVar2)) {
          local_974 = ((iVar2) & 0xFF);
          _MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30] = local_974
          ;
          w16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0, (s16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0) & 0xfdff));
          if ((iVar2 !== 0)) {
            w16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0, (s16((DAT_0064c6a0 + DAT_006d1da0 * 0x594), 0) | 0x200));
          }
          for (/* cond: (local_138 < 7) */); local_138 = (local_138 < 7); local_138 = (local_138 + 1)) {
            for (/* cond: (local_970 < 2) */); local_970 = (local_970 < 2); local_970 = (local_970 + 1)) {
              w16((DAT_0065550c + (local_138 * 4 + (((s16((DAT_0064c6a6 + s8(DAT_00655b03) * 0x594), 0)) << 16 >> 16) * 0x30 + local_970 * 2))), 0, ((s32((DAT_00654fe0 + (local_970 * 4 + local_138 * 8)), 0)) & 0xFFFF));
            }
          }
          iVar2 = FUN_00421ed0(DAT_00625610, 0x17, (DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), DAT_fffff694);
          if ((iVar2 === 0)) {
            FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), DAT_fffff694);
            wv(DAT_00654fa6, 1);
            wv(DAT_0062c488, 1);
            local_434 = 0;
            goto LAB_0041e731;
          }
        }
      }
    }
  }
  goto LAB_0041e028;
}


 export function FUN_0041e7b2 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0041e7be ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0041e7d4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0041e7e3 ()

 {
  let iVar1;

  iVar1 = FUN_004a2379(PTR_s_LABELS_00627674, s_STRINGHEAP_00625618);
  if ((iVar1 === 0)) {
    FUN_004a23fc(1);
    iVar1 = FUN_004a2534();
    if ((DAT_006252c0 < iVar1)) {
      wv(DAT_006252c0, iVar1);
    }
  }
  FUN_00428a0f(DAT_006252c0);
  FUN_00428a95(s_<nil>_00625624);
  FUN_0046a740();
  FUN_0046a78d();
  FUN_0059d401();
  return;
}


 export function FUN_0041e864 (param_1)

 {
  let iVar1;
  let local_108;

  FUN_0041e7e3();
  FUN_0044b49e();
  __chdir(DAT_0064bb08);
  FUN_005f22d0(DAT_fffffef8, s_RULES._0062562c);
  FUN_005f22e0(DAT_fffffef8, DAT_0062cd24);
  iVar1 = FUN_00415133(DAT_fffffef8);
  if ((iVar1 === 0)) {
    __chdir(DAT_00655020);
  }
  FUN_0041b00e(param_1);
  __chdir(DAT_00655020);
  FUN_00421bd0();
  return;
}


 export function FUN_0041e8fb (param_1)

 {
  let uVar1;
  let iVar2;
  let unaff_FS_OFFSET;
  let uVar3;
  let uVar4;
  let uVar5;
  let uVar6;
  let local_440;
  let local_43c;
  let local_438;
  let local_334;
  let local_330;
  let local_32c;
  let local_328;
  let local_250;
  let local_24c;
  let local_c0;
  let local_34;
  let aiStack_30;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0041eed2;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  while ((iVar2 < 0)) {
    wv(DAT_00655b0b, 0);
    FUN_0040bc40(1);
    FUN_0052182c(DAT_fffffcd8, (param_1 + 0x25e));
    local_334 = 0;
    for (/* cond: (local_440 < 8) */); local_440 = (local_440 < 8); local_440 = (local_440 + 1)) {
      if ((((1 << (((local_440) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        FUN_0040bbb0();
        uVar1 = FUN_00493c7d(local_440);
        FUN_0040bbe0(uVar1);
        FUN_0040fe10();
        FUN_0040fea0();
        uVar1 = FUN_00493b10(local_440);
        FUN_0040bbe0(uVar1);
        FUN_0040fed0();
        FUN_0040fe10();
        FUN_0040fea0();
        FUN_0040ff30(((s16((DAT_0064c708 + local_440 * 0x594), 0)) << 16 >> 16));
        FUN_0040fe10();
        FUN_0040bc10(0xc5);
        FUN_0040bbe0(DAT_00625634);
        FUN_0040ff30(((s16((DAT_0064c706 + local_440 * 0x594), 0)) << 16 >> 16));
        FUN_0040fe10();
        FUN_0040bc10(0xc4);
        FUN_0040bbe0(DAT_00625638);
        iVar2 = local_334;
        local_334 = (local_334 + 1);
        local_34 = FUN_0059edf0(DAT_00679640, iVar2, 0);
        w32(DAT_ffffffd0, s32((local_34 + 4), 0), local_440);
      }
    }
    local_32c = local_334;
    local_330 = 0;
    for (/* cond: (local_334 < local_32c) */); local_334 = (local_334 < local_32c); local_334 = (local_334 + 1)) {
      local_34 = FUN_0059e7ad(local_334);
      if ((local_34 !== 0)) {
        local_330 = (local_330 + 1);
        FUN_0059e8db(s32((local_34 + 4), 0), 0);
        if ((local_c0 !== 0)) {
          FUN_00421ca0(s32((local_34 + 4), 0));
        }
      }
    }
    local_250 = 0;
    local_24c = 0;
    iVar2 = FUN_0040bc80(0);
    if ((iVar2 < 0));
    local_440 = ((s32(DAT_ffffffd0, iVar2)) & 0xFF);
    wv(DAT_00655b0b, (DAT_00655b0b | (((1 << (((s32(DAT_ffffffd0, iVar2)) & 0xFF) & 0x1f))) & 0xFF)));
    wv(DAT_00655b03, ((s32(DAT_ffffffd0, iVar2)) & 0xFF));
    wv(DAT_00655b05, ((s32(DAT_ffffffd0, iVar2)) & 0xFF));
    iVar2 = FUN_00498a5c(s32(DAT_ffffffd0, iVar2));
    if ((iVar2 !== 0)) {
      wv(DAT_00655aea, (DAT_00655aea & -0x101));
      FUN_0040ffa0(s_GENDER_0062563c, 1);
      FUN_0052182c(DAT_fffffcd8, (param_1 + 0x25e));
      FUN_0059ea99(_MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + s8(((s32(DAT_ffffffd0, iVar2)) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30]);
      FUN_0059e783(-0x3e7, (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      iVar2 = FUN_0040bc80(0);
      FUN_0046e020(0x6a, 0, 0, 0);
      if ((-1 < iVar2)) {
        local_43c = ((iVar2) & 0xFF);
        _MEM[DAT_006554fc + ((s16((DAT_0064c6a6 + s8(((s32(DAT_ffffffd0, iVar2)) & 0xFF)) * 0x594), 0)) << 16 >> 16) * 0x30] = local_43c;
        w16((DAT_0064c6a0 + s32(DAT_ffffffd0, iVar2) * 0x594), 0, (s16((DAT_0064c6a0 + s32(DAT_ffffffd0, iVar2) * 0x594), 0) & 0xfdff));
        if ((iVar2 !== 0)) {
          w16((DAT_0064c6a0 + s32(DAT_ffffffd0, iVar2) * 0x594), 0, (s16((DAT_0064c6a0 + s32(DAT_ffffffd0, iVar2) * 0x594), 0) | 0x200));
        }
        uVar6 = 1;
        uVar5 = 0;
        uVar4 = 0;
        uVar3 = 0;
        uVar1 = FUN_00493b10(s8(DAT_00655b03), 0, 0, 0, 1);
        iVar2 = FUN_005a632a(DAT_006359d4, DAT_00625644, 0x17, uVar1, uVar3, uVar4, uVar5, uVar6);
        if ((iVar2 === 0)) {
          FUN_0052182c(DAT_fffffcd8, (param_1 + 0x25e));
          iVar2 = FUN_005a5f34(DAT_fffffbc8, 0);
          if ((iVar2 === 0)) {
            FUN_005f22d0((DAT_0064bcfa + s8(DAT_00655b03) * 0xf2), DAT_fffffbc8);
            local_8 = -1;
            FUN_0041eec6();
            FUN_0041eedc();
            return;
          }
        }
      }
    }
  }
  local_8 = -1;
  FUN_0041eec6();
  FUN_0041eedc();
  return;
}


 export function FUN_0041eec6 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0041eedc (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0041eeeb ()

 {
  let iVar1;
  let unaff_FS_OFFSET;
  let local_758;
  let local_754;
  let local_750;
  let local_318;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0041f686;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_318 = 1;
  local_18 = 1;
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_005c64da();
  local_8 = ((((local_8) >> 8) << 8) | 1);
  __chdir(DAT_00655020);
  FUN_005f22d0(DAT_0064bb08, DAT_00655020);
  FUN_004a733d();
  wv(DAT_00655aea, DAT_0064bc1e);
  wv(DAT_00655b02, 0);
  FUN_00484d52();
  FUN_0055a5e4();
  FUN_005d687b(4);
  if ((DAT_0062af10 === 0)) {
    FUN_0046e020(0x6b, 0, 1, 0);
  }
  do {
    FUN_005f22d0(DAT_006558e8, DAT_0062564c);
    FUN_005f22d0(DAT_006559e8, s_RULES_00625654);
    FUN_004a733d();
    FUN_0041dcc3();
    FUN_004fa5d9(0xc350);
    for (/* cond: (local_758 < 8) */); local_758 = (local_758 < 8); local_758 = (local_758 + 1)) {
      FUN_00493602(local_758);
      FUN_0049376f(local_758);
    }
    wv(DAT_0064b1ac, 0);
    if ((DAT_006ad228 === -1)) {
      FUN_0055a41d(1, 6, 1);
      FUN_0040ffa0(s_MAINMENU_0062565c, 1);
      FUN_0059ea99(((DAT_00666538) << 16 >> 16));
      FUN_0059e783((-((((DAT_006ab198 + -0x280) + (((DAT_006ab198 + -0x280) >> 0x1f) & 7)) >> 3) + 1)), (-((((DAT_006ab19c + -0x1e0) + (((DAT_006ab19c + -0x1e0) >> 0x1f) & 7)) >> 3) + 1)));
      local_754 = FUN_0040bc80(0);
      FUN_0055a567();
      if ((local_754 < 0));
      FUN_004a73d9();
    }
    else {
      local_754 = 5;
    }
    FUN_0046e020(0x6a, 0, 0, 0);
    wv(DAT_00627670, 0);
    FUN_0059a998();
    /* switch */ () {
    case 0 :
    case 1 :
    case 2 :
      __chdir(DAT_00655020);
      FUN_0041e864(1);
      if ((local_754 === 1)) {
        iVar1 = FUN_0041dd0e();
        if ((iVar1 !== 0)) {
          local_754 = -1;
        }
        local_20 = 1;
        if ((DAT_006d1166 !== 0)) {
          local_20 = 2;
        }
      }
      else {
        iVar1 = FUN_0041d417();
        if ((iVar1 !== 0)) {
          local_754 = -1;
        }
        local_20 = 0;
      }
      if ((local_754 === 2)) {
        iVar1 = FUN_0041d7ea();
        if ((iVar1 !== 0)) {
          local_754 = -1;
        }
      }
      else {
        iVar1 = _rand();
        wv(DAT_00624ee8, ((iVar1 % 3) + -1));
        wv(DAT_00624eec, 0);
        iVar1 = _rand();
        if (((iVar1 % 3) === 0)) {
          wv(DAT_00624eec, ((iVar1 % 3) + -1));
        }
        iVar1 = _rand();
        wv(DAT_00624ef0, ((iVar1 % 3) + -1));
        iVar1 = _rand();
        wv(DAT_00624ef4, ((iVar1 % 3) + -1));
        iVar1 = _rand();
        wv(DAT_00624ef8, ((iVar1 % 3) + -1));
      }
      if ((-1 < local_754)) {
        local_18 = FUN_0041ba52(local_20);
      }
      break;
    case 3 :
      wv(DAT_006a9110, 0);
      local_18 = FUN_0041dfe1();
      if ((local_18 === 0)) {
        if ((0 !== 0)) {
          wv(DAT_00655aea, (DAT_00655aea & -0x10001));
        }
      }
      else {
        FUN_005f22d0(DAT_0064bb08, DAT_00655020);
      }
      break;
    case 4 :
      wv(DAT_006a9110, 0);
      local_18 = FUN_00477d8c(0, 0, 1);
      FUN_0046e020(0x6a, 0, 0, 0);
      if ((DAT_00655b02 !== 0)) {
        local_18 = FUN_0041e8fb(1);
      }
      if ((local_18 === 0)) {
        wv(DAT_00654fa4, None);
        wv(DAT_00628048, None);
        wv(DAT_00655b02, 0);
        wv(DAT_00655b0b, (((1 << (None & 0x1f))) & 0xFF));
      }
      else if ((DAT_006a9110 !== 0)) {
        wv(DAT_00655aea, (DAT_00655aea & -0x10001));
      }
      break;
    case 5 :
      XD_GetXDaemonVersion(DAT_fffff8b0, DAT_ffffffe4, DAT_ffffffec);
      if ((DAT_0062766c === local_14)) {
        __chdir(DAT_00655020);
        FUN_0041e864(1);
        local_18 = FUN_0051d9a0();
        if ((DAT_006ad228 !== -1)) {
        FUN_004aef20(DAT_0063cc48);
        FUN_004af1d5(DAT_0063cc48, DAT_00627664);
        FUN_005f22e0(DAT_0063cc48, DAT_00625668);
        FUN_004af1d5(DAT_0063cc48, DAT_00627668);
        FUN_005f22e0(DAT_0063cc48, DAT_0062566c);
        FUN_004af1d5(DAT_0063cc48, DAT_0062766c);
        FUN_004aef20(DAT_0063cd4c);
        FUN_004af1d5(DAT_0063cd4c, UNNAMED);
        FUN_005f22e0(DAT_0063cd4c, DAT_00625670);
        FUN_004af1d5(DAT_0063cd4c, local_1c);
        FUN_005f22e0(DAT_0063cd4c, DAT_00625674);
        FUN_004af1d5(DAT_0063cd4c, local_14);
        FUN_00410030(s_WRONGXDAEMONVERSION_00625678, DAT_0063fc58, 0);
      }
      break;
    case 6 :
      FUN_00436bb7(-1);
      break;
    case 7 :
      iVar1 = FUN_00421e70(s_NEWCREDITS_0062568c, 1);
      if ((iVar1 < 0)) {
        FUN_004a2020();
      }
      else {
        FUN_0046e020(-107, 0, 0, 0);
        FUN_0046e020(-108, 0, 0, 0);
        FUN_0046e4a9();
        FUN_00437a4a(iVar1);
        FUN_0046e6a9();
        FUN_00484d52();
        FUN_0046e020(0x6b, 0, 1, 0);
      }
    }
  } while ((local_18 !== 0));
  local_318 = 0;
 LAB_0041f5ea: :
  FUN_0046e020(-107, 0, 0, 0);
  FUN_0046e020(-108, 0, 0, 0);
  FUN_005d687b(8);
  if (((DAT_00655aea & 8) !== 0)) {
    FUN_0046e6c8();
  }
  FUN_0055a64a();
  local_8 = (local_8 & -0x100);
  FUN_0041f66e();
  local_8 = -1;
  FUN_0041f67a();
  FUN_0041f690();
  return;
}


 export function FUN_0041f66e ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0041f67a ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0041f690 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0041f69f ()

 {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  wv(DAT_006252c4, 1);
  if ((DAT_00655b08 === 0)) {
    local_10 = 0;
    local_c = 0;
    FUN_005b9ec6();
    for (/* cond: (local_8 < ((DAT_006d1164) << 16 >> 16)) */); local_8 = (local_8 < ((DAT_006d1164) << 16 >> 16)); local_8 = (local_8 + 1)) {
      iVar1 = FUN_005b8931(local_c, local_10);
      if (((DAT_00655b0b & _MEM[(iVar1 + 4)]) !== 0)) {
        FUN_005b976d(local_c, local_10, DAT_00655b0b, 1, 1);
      }
      local_c = (local_c + 2);
      if ((((DAT_006d1160) << 16 >> 16) <= local_c)) {
        local_10 = (local_10 + 1);
        local_c = (local_10 & 1);
      }
    }
    FUN_005b9f1c();
  }
  if ((DAT_00655b08 === 0)) {
    for (/* cond: (local_c < 8) */); local_c = local_c; local_c = (local_c + 1)) {
      if ((((1 << (((local_c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        for (/* cond: (local_10 < 8) */); local_10 = local_10; local_10 = (local_10 + 1)) {
          if ((((1 << (((local_10) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
            FUN_00467825(local_c, local_10, 1);
          }
        }
      }
    }
  }
  if ((2 < DAT_00655b02)) {
    wv(DAT_006d1da0, s32(DAT_006ad35c, DAT_006ad304 * 0x15));
  }
  return;
}


 export function FUN_0041f878 ()

 {
  FUN_00484d52();
  if ((DAT_00655b02 === 1)) {
    FUN_005793a3(0x1f2);
  }
  FUN_00413bd1();
  FUN_0050dea8();
  FUN_0056ac46();
  FUN_00407b31();
  FUN_005b8416();
  FUN_00484d52();
  wv(DAT_006252c4, 0);
  return;
}


 export function FUN_0041f8d9 ()

 {
  let cVar1;
  let iVar2;
  let UVar3;
  let sVar4;
  let unaff_FS_OFFSET;
  let pLVar5;
  let local_7e8;
  let local_748;
  let local_740;
  let local_73c;
  let local_738;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00420213;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_005c64da();
  local_8 = ((((local_8) >> 8) << 8) | 1);
  FUN_005d225b(PTR_s_5.4.0f_Multiplayer_26-March-99_0062765c);
  FUN_005d225b(PTR_s_Patch_3_00627660);
  FUN_0059a998();
  iVar2 = FUN_0041b4c0();
  if ((iVar2 === 0)) {
    _memset(DAT_006ad22c, 0, 0xc4);
    pLVar5 = DAT_006ad22c;
    iVar2 = FUN_00414d10();
    iVar2 = XD_LaunchedByLobby(s32((iVar2 + 4), 0), pLVar5);
    if ((iVar2 === 1)) {
      wv(DAT_006ad228, iVar2);
      FUN_005d225b(s_LobbyLaunchInfo_(gNetMgr.IGZInfo_00625698);
      FUN_005d237d(s_IPAddr[32]:_%s_006256bc, DAT_006ad22c);
      FUN_005d237d(s_LongName[64]:_%s_006256d8, DAT_006ad24c);
      FUN_005d237d(s_ShortName[32]:_%s_006256f4, DAT_006ad28c);
      FUN_005d237d(s_SessionName[64]:_%s_00625710, DAT_006ad2ac);
      FUN_005d2279(s_bHost:_%d_0062572c, DAT_006ad2ec);
    }
    else {
      if ((iVar2 !== -5)) {
        FUN_005d225b(s_IGZ_-_Sending_DPLSYS_DPLAYCONNEC_00625768);
        iVar2 = XD_LobbySendMessage(2);
        if ((iVar2 !== 0)) {
          FUN_005d2279(s_IGZ_-_XD_LobbySendMessage_return_0062579c, iVar2);
        }
        local_8 = (local_8 & -0x100);
        FUN_004201fb();
        local_8 = -1;
        FUN_00420207();
        FUN_0042021d();
        return;
      }
      FUN_005d2279(s_Not_an_IGZ_Game!!_event_=_%d_00625748, iVar2);
      wv(DAT_006ad228, -1);
    }
    wv(DAT_006c3160, 0);
    UVar3 = FUN_006e7b34(s_Civilization_Gold_006257e4, s_Simultaneous_006257d4, -1, s_CIV.INI_006257cc);
    if ((0 < UVar3)) {
      wv(DAT_006c3160, 1);
      FUN_006e7b38(s_Civilization_Gold_00625814, s_Simultaneous_00625804, DAT_00625800, s_CIV.INI_006257f8);
    }
    wv(DAT_006c3164, 7);
    local_73c = FUN_006e7b34(s_Civilization_Gold_0062583c, s_MaxPlayers_00625830, -1, s_CIV.INI_00625828)
    ;
    if ((4 < local_73c)) {
      if ((7 < local_73c)) {
        local_73c = 7;
      }
      wv(DAT_006c3164, local_73c);
      FUN_006e7b38(s_Civilization_Gold_00625868, s_MaxPlayers_0062585c, DAT_00625858, s_CIV.INI_00625850);
    }
    FUN_005f22d0(DAT_006ad59c, DAT_00666550);
    while ((iVar2 !== 0)) {
      wv(DAT_00628044, 1);
      wv(DAT_006ad6ac, 0);
      wv(DAT_006ad6ae, 0);
      wv(DAT_006ad7b2, 0);
      for (/* cond: (local_748 < 8) */); local_748 = (local_748 < 8); local_748 = (local_748 + 1)) {
        w32((DAT_006af220 + local_748 * 4), 0, 0);
        w32((DAT_006af240 + local_748 * 4), 0, 0);
        w32((DAT_006af260 + local_748 * 4), 0, 0);
        w32((DAT_006af280 + local_748 * 4), 0, 0);
      }
      FUN_00498784();
      FUN_004fa5d9(0xc350);
      _memset(DAT_0064ba48, -1, 0xc0);
      for (/* cond: (local_748 < 0x800) */); local_748 = (local_748 < 0x800); local_748 = (local_748 + 1)) {
        w32((DAT_0065610a + local_748 * 0x20), 0, 0);
        w16((DAT_00656106 + local_748 * 0x20), 0, 0xffff);
        w16((DAT_00656108 + local_748 * 0x20), 0, 0xffff);
      }
      wv(DAT_00655b16, 0);
      for (/* cond: (local_740 < 0x100) */); local_740 = (local_740 < 0x100); local_740 = (local_740 + 1)) {
        w32((DAT_0064f394 + local_740 * 0x58), 0, 0);
      }
      wv(DAT_00655b18, 0);
      iVar2 = FUN_0041eeeb();
      if ((iVar2 !== 0));
      FUN_0056aacb();
      FUN_00413a90();
      FUN_0050dcb6();
      if ((2 < DAT_00655b02)) {
        FUN_004b4735(4);
        FUN_004b4735(3);
      }
      FUN_004f4b9f();
      FUN_005bf5e1(0x5a, 0xa, 0xc0, DAT_fffff8c8);
      FUN_00419be0(DAT_0063cbd0);
      FUN_00419ba0(0x9e);
      if ((DAT_00655b02 !== 0)) {
        if ((cVar1 !== 0)) {
          FUN_004e1314();
        }
        if ((cVar1 !== 0)) {
          wv(DAT_006ad684, ((DAT_00654c7c) & 0xFF));
          FUN_0046b14d(0x33, 0xff, ((DAT_00654fac) << 16 >> 16), ((DAT_00654fae) << 16 >> 16), ((DAT_00654c7c) << 16 >> 16), 0, 0, 0, 0, 0);
        }
      }
      if ((2 < DAT_00655b02)) {
        FUN_005792e1(0x120, 1);
        wv(DAT_00635a40, LAB_00403c74);
        cVar1 = FUN_00421f40();
        if ((cVar1 !== 0)) {
          FUN_00523d8a(0xff);
        }
        wv(DAT_006ad699, 1);
        XD_FlushSendBuffer(0x2bf20);
        FUN_0055b3fd();
      }
      FUN_0041f69f();
      if ((DAT_006252c8 === 0)) {
        FUN_00410030(s_SIMULTUT_0062587c, DAT_00643af8, 0);
        wv(DAT_006252c8, 1);
      }
      FUN_005d8236(DAT_006cec90);
      wv(DAT_00654fd8, 1);
      if ((DAT_00655b02 < 3)) {
        FUN_0048b340();
      }
      else {
        if ((DAT_006ad2f7 === 0)) {
          XD_FlushSendBuffer(0x1388);
          while ((DAT_006c9250 === 0)) {
            FUN_0047e94e(1, 0);
          }
        }
        else {
          FUN_0046b14d(0x9c, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
          XD_FlushSendBuffer(0x1388);
        }
        if ((DAT_006ad684 === 0)) {
          if ((DAT_006ad2f7 === 0)) {
            iVar2 = FUN_0048bfec();
            if ((iVar2 !== 0)) {
              FUN_0048c9f3(1);
            }
          }
          else {
            FUN_0048c9f3(0);
          }
        }
        else if ((DAT_006ad2f7 === 0)) {
          iVar2 = FUN_005ab2d5();
          if ((iVar2 !== 0)) {
            FUN_005aa0e5();
          }
        }
        else {
          FUN_005aa0e5();
        }
      }
      FUN_004a73d9();
      wv(DAT_00635a40, 0);
      wv(DAT_00627670, 0);
      FUN_0055ae80(1);
      FUN_0055b3c8();
      if ((2 < DAT_00655b02)) {
        FUN_005d7c00();
        local_8 = ((((local_8) >> 8) << 8) | 2);
        FUN_004b0a0a();
        if ((DAT_006ad2f7 !== 0)) {
          FUN_0059b293(1);
        }
        iVar2 = Realloc(s_chatlog.txt_00625888);
        if ((iVar2 !== 0)) {
          sVar4 = _strlen(DAT_0062d870);
          FUN_00421c60(DAT_0062d870, sVar4);
          FUN_00421c30();
        }
        for (/* cond: (local_7e8 < 8) */); local_7e8 = (local_7e8 < 8); local_7e8 = (local_7e8 + 1)) {
          w32((DAT_0068aee8 + local_7e8 * 4), 0, 0);
          w32((DAT_0068af08 + local_7e8 * 4), 0, 0);
        }
        wv(DAT_0068aedc, 0);
        wv(DAT_0068aee4, 0);
        wv(DAT_0068aee0, 0);
        FUN_004b7645();
        FUN_004b768d();
        local_8 = ((((local_8) >> 8) << 8) | 1);
        FUN_004201ef();
      }
      FUN_004f5dd1();
      FUN_0042a768();
      FUN_0042a768();
      if ((DAT_0062c5b0 !== 0)) {
        local_8 = (local_8 & -0x100);
        FUN_004201fb();
        local_8 = -1;
        FUN_00420207();
        FUN_0042021d();
        return;
      }
      FUN_0041f878();
      if ((DAT_006ad228 !== -1)) {
        local_8 = (local_8 & -0x100);
        FUN_004201fb();
        local_8 = -1;
        FUN_00420207();
        FUN_0042021d();
        return;
      }
    }
  }
  FUN_0041b8b0();
  local_8 = (local_8 & -0x100);
  FUN_004201fb();
  local_8 = -1;
  FUN_00420207();
  FUN_0042021d();
  return;
}
