// Block 0x00480000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 61

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_00482305 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00482311 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_00482327 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_00482337 ()

 {
  FUN_0047e94e(1, 0);
  if ((DAT_006c9178 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    DAT_006ad678 = s32(DAT_006ad678, 0);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048237d ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  iVar1 = FUN_00421bb0();
  if ((0x4b0 < (iVar1 - DAT_006cec80))) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    DAT_006ad678 = s32(DAT_006ad678, 0);
    _DAT_006cec80 = FUN_00421bb0();
  }
  return;
}


 export function FUN_004823d6 (param_1, param_2)

 {
  w32(param_2, 0, s32((param_1 + 0x10), 0));
  w32(param_2, 1, s32((param_1 + 0x14), 0));
  w32(param_2, 2, s32((param_1 + 0x18), 0));
  w32(param_2, 3, s32((param_1 + 0x1c), 0));
  w32(param_2, 4, s32((param_1 + 0x20), 0));
  w32(param_2, 5, s32((param_1 + 0x24), 0));
  w32(param_2, 6, s32((param_1 + 0x28), 0));
  return;
}


 export function FUN_00482470 ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  if ((1 < DAT_006ad308)) {
    return;
  }
  w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
  DAT_006ad678 = s32(DAT_006ad678, 0);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004824e3 ()

 {
  let bVar1;
  let iVar2;
  let local_8;

  DAT_006ad698 = 1;
  FUN_0048de75();
  DAT_00655b0b = (DAT_006c31a8 | DAT_00655b0b);
  DAT_006c31a8 = 0;
  if ((1 < DAT_006ad308)) {
    DAT_00655b0b = ((DAT_006c31a8 | DAT_00655b0b) & (~(((1 << (DAT_006d1da0 & 0x1f))) & 0xFF)));
    DAT_006ad664 = (DAT_006ad308 + -1);
    FUN_0046b14d(0xe, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    FUN_0048de75();
    DAT_00635a3c = LAB_00403cc9;
    FUN_00426fb0(s_SERVERQUITWAIT_0062bf34, 0x2000000, DAT_0063fc58, 0);
    iVar2 = FUN_005ae006((((DAT_006c31a8 | DAT_00655b0b) & (~(((1 << (DAT_006d1da0 & 0x1f))) & 0xFF))) === 0));
    if ((iVar2 === 0)) {
      FUN_0046b14d(0xf, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      bVar1 = ((((DAT_006ad578 + 1) >> 0x1f)) & 0xFF);
      DAT_00654fa4 = ((((((((DAT_006ad578 + 1)) & 0xFF) ^ bVar1) - bVar1) & 7) ^ bVar1) - bVar1);
      (DAT_006ad359[local_8 * 0x54] === 0) (local_8 = 1; (local_8 = (local_8 < 7) && (DAT_006ad359 = DAT_006ad359));
          local_8 = (local_8 + 1)) {
      }
      if ((local_8 < 7)) {
        FID_conflict:_memcpy(DAT_006ad30c, (DAT_006ad30c + local_8 * 0x54), 0x54);
        DAT_006ad358 = 1;
        _DAT_006ad30c = 0;
        _DAT_006ad558 = s32((DAT_006ad558 + local_8 * 4), 0);
        DAT_006ad308 = (DAT_006ad308 + -1);
        w32((DAT_006ad558 + local_8 * 4), 0, -1);
        _memset((DAT_006ad30c + local_8 * 0x54), 0, 0x54);
        FUN_004b0b53(0xff, 2, 0, 1, 0);
        FUN_0046b14d(0x16, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
        FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
        XD_FlushSendBuffer(0xea60);
      }
    }
  }
  return;
}


 export function FUN_00482724 ()

 {
  FUN_0047e94e(1, 0);
  if ((DAT_006ad698 === 2)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    DAT_006ad678 = s32(DAT_006ad678, 0);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048276d ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  if (((iVar1 - DAT_00670d98) <= DAT_006ad8b8 * 0x3c)) {
    return;
  }
  w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
  DAT_006ad678 = s32(DAT_006ad678, 0);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004827d5 ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  if (((iVar1 - DAT_00670d98) <= DAT_006ad8b8 * 0x3c)) {
    return;
  }
  w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
  DAT_006ad678 = s32(DAT_006ad678, 0);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048283d ()

 {
  let iVar1;

  FUN_0047e94e(1, 0);
  if (((iVar1 - DAT_00670d98) <= DAT_006ad8b8 * 0x3c)) {
    return;
  }
  w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
  DAT_006ad678 = s32(DAT_006ad678, 0);
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_004828a5 ()

 {
  let cVar1;
  let uVar2;
  let iVar3;
  let local_284;
  let local_280;
  let local_27c;
  let acStack_274;
  let local_228;
  let local_c;
  let local_8;

  _DAT_006c901c = 0;
  DAT_006c9038 = 0;
  DAT_006c8ff0 = 0;
  FUN_0046b14d(0x10, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  DAT_00635a3c = LAB_004021fd;
  FUN_00426fb0(s_CLIENTQUITWAIT_0062bf44, 0x2000000, DAT_0063fc58, 0);
  DAT_006ad698 = 0;
  DAT_00635a3c = LAB_00402f22;
  _DAT_00670d98 = FUN_00421bb0();
  FUN_00426fb0(s_CLIENTQUITWAIT_0062bf54, 0x2000000, DAT_0063fc58, 0);
  if ((0 === 0)) {
    FUN_005d225b(s_ClientTransferServer:_Waiting_fo_0062bf64);
    FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
    FUN_00410030(s_LANCONNECTFAIL_0062bf9c, DAT_0063fc58, 0);
    DAT_0064b9bc = 0;
    DAT_00628044 = 0;
    uVar2 = 0;
  }
  else {
    DAT_00628048 = DAT_00654fa4;
    DAT_00635a3c = LAB_00402f54;
    _DAT_00670d98 = FUN_00421bb0();
    FUN_00426fb0(s_CLIENTQUITWAIT_0062bfac, 0x2000000, DAT_0063fc58, 0);
    if ((0 === 0)) {
      FUN_005d225b(s_ClientTransferServer:_Waiting_fo_0062bfbc);
      FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
      FUN_00410030(s_LANCONNECTFAIL_0062bff0, DAT_0063fc58, 0);
      DAT_0064b9bc = 0;
      DAT_00628044 = 0;
      uVar2 = 0;
    }
    else {
      FID_conflict:_memcpy(DAT_fffffd84, DAT_006ad308, 0x270);
      iVar3 = _strcmp(DAT_006665b0, DAT_006ad310);
      if ((iVar3 === 0)) {
        FUN_005d225b(s_ClientTransferServer:_Disconnect_0062c000);
        FUN_0059b293(0);
        cVar1 = FUN_0059adef(DAT_006ad2f8, 1);
        local_c = s8(cVar1);
        if ((local_c === 0)) {
          FUN_005d225b(s_ClientTransferServer:_Could_not_r_0062c034);
          FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
          FUN_00410030(s_LANCONNECTFAIL_0062c06c, DAT_0063fc58, 0);
          DAT_00628044 = 0;
          DAT_0064b9bc = 0;
          return 0;
        }
        FUN_005d225b(s_Reconnected_to_network_as_SERVER_0062c07c);
        FUN_005f22d0(DAT_006ad57c, DAT_006665b0);
        DAT_006ad300 = 0;
        DAT_006ad304 = 0;
        DAT_0067a408 = (DAT_0067a400 + DAT_0062d0bc);
        DAT_006ad664 = (UNNAMED + -1);
        DAT_006ad668 = (UNNAMED + -1);
        if (((UNNAMED + -1) < 1)) {
          local_8 = UNNAMED;
          w32((DAT_006ad558 + UNNAMED * 4), 0, 0);
          DAT_006ad35c = UNNAMED;
        }
        else {
          DAT_00635a3c = LAB_00402ff4;
          _DAT_00670d98 = FUN_00421bb0();
          FUN_00426fb0(s_CLIENTQUITWAIT_0062c0a0, 0x2000000, DAT_0063fc58, 0);
          iVar3 = FUN_00421bb0();
          if (((UNNAMED + -1) !== 0)) {
            FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
            if (((UNNAMED + -1) === (UNNAMED + -1))) {
              FUN_00410030(s_NOONESHOWED_0062c0b0, DAT_0063fc58, 0);
              DAT_00628044 = 0;
              DAT_0064b9bc = 0;
              return 0;
            }
            FUN_00410030(s_SOMESHOWED_0062c0bc, DAT_0063fc58, 0);
          }
          (local_284 < 7) (local_284 = 0; local_284 = (local_284 < 7); local_284 = (local_284 + 1)) {
            if ((DAT_006ad359[local_284 * 0x54] !== 0)) {
              local_280 = 0;
              while ((iVar3 !== 0)) {
                local_280 = (local_280 + 1);
              }
              if ((6 < local_280)) {
                FUN_005dae6b(7, s_oldIndex_<_MAX_NET_PLAYERS_0062c0ec, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062c0c8, 0x8a7);
              }
              local_8 = s32(DAT_fffffdd8, local_280 * 0x15);
              w32((DAT_006ad558 + local_8 * 4), 0, local_284);
              w32(DAT_006ad35c, local_284 * 0x15, local_8);
            }
          }
          DAT_006ad684 = ((DAT_00654c7c) & 0xFF);
          FUN_0046b14d(0x33, 0xff, ((DAT_00654fac) << 16 >> 16), ((DAT_00654fae) << 16 >> 16), ((DAT_00654c7c) << 16 >> 16), 0, 0, 0, 0, 0);
          FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
          XD_FlushSendBuffer(0xea60);
        }
        _memset(DAT_0064ba48, -1, 0xc0);
        DAT_006ad640 = 3;
        FUN_0059c2b8();
        _DAT_006c901c = 0;
        DAT_006c9038 = 0;
        DAT_006c8ff0 = 0;
        if ((DAT_0064b1ac !== 2)) {
          FUN_00410030(s_HOSTCHANGESERVER_0062c108, DAT_0063fc58, 0);
        }
      }
      else {
        FUN_005d237d(s_Disconnecting_from_server_%s._0062c11c, DAT_006ad57c);
        local_c = XD_CloseConnection();
        if ((local_c !== 0)) {
          FUN_005d23bb(s_ClientTransferServer:_Disconnect_0062c13c, DAT_006ad57c, local_c);
          FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
          FUN_00410030(s_LANCONNECTFAIL_0062c184, DAT_0063fc58, 0);
          DAT_00628044 = 0;
          DAT_0064b9bc = 0;
          return 0;
        }
        FUN_005f22d0(DAT_006ad57c, DAT_006ad310);
        _DAT_00670d98 = FUN_00421bb0();
        do {
          iVar3 = FUN_00421bb0();
        } while (((iVar3 - None) < 0x3c)) {
          FUN_005d2279(s_ConnectToGame:_Open_connection_f_0062c1c0, local_c);
          FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
          FUN_00410030(s_SERVERCONNECTFAIL_0062c1f0, DAT_0063fc58, 0);
          DAT_00628044 = 0;
          DAT_0064b9bc = 0;
          return 0;
        }
        FUN_005d225b(s_Connection_to_new_server_success_0062c204);
        _DAT_006c901c = 0;
        DAT_006c9038 = 0;
        DAT_00635a3c = LAB_00402f54;
        _DAT_00670d98 = FUN_00421bb0();
        FUN_00426fb0(s_CLIENTQUITWAIT_0062c22c, 0x2000000, DAT_0063fc58, 0);
        if ((DAT_006c8ff0 === 0)) {
          FUN_005d225b(s_ClientTransferServer:_Client_tim_0062c23c);
          FUN_005f22d0(DAT_0063cc48, DAT_006ad63c);
          FUN_00410030(s_LANCONNECTFAIL_0062c27c, DAT_0063fc58, 0);
          DAT_00628044 = 0;
          DAT_0064b9bc = 0;
          return 0;
        }
        FUN_005f22d0(DAT_0063cc48, DAT_006ad330);
        FUN_0059c2b8();
        DAT_006c8ff0 = 0;
        FUN_00410030(s_HOSTCHANGECLIENT_0062c28c, DAT_0063fc58, 0);
      }
      uVar2 = 1;
    }
  }
  return uVar2;
}


 export function FUN_0048308f ()

 {
  let iVar1;
  let sVar2;
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

  iVar1 = DAT_0064b998;
  if ((DAT_00627670 !== 0)) {
    DAT_0064b99c = DAT_0064b98c;
    local_10 = DAT_0064b98c;
    local_14 = (DAT_0064b98c + DAT_0064b998 * 0x1c4);
    if (((DAT_0064b98c + ((DAT_0064b992) & 0xFFFF)) <= local_14)) {
      FUN_005dae6b(7, s_pStrings_>_(CharPtr)pEvents_&&_p_0062c2c4, s_D:\Ss\Franklinton\NetMgr_Poll.cp_0062c2a0, 0x913);
    }
    (local_c < iVar1) (local_c = 0; local_c = (local_c < iVar1); local_c = (local_c + 1)) {
      local_10[0x1bc] = 0;
      local_10[0x1bd] = 0;
      local_10[0x1be] = 0;
      local_10[0x1bf] = 0;
      local_10[0x1c0] = 0;
      local_10[0x1c1] = 0;
      local_10[0x1c2] = 0;
      local_10[0x1c3] = 0;
      if ((0 < local_c)) {
        w32((local_10 + 0x1c0), 0, local_10);
        w32((local_10 + 0x1c0), 0, (s32((local_10 + 0x1c0), 0) + -0x1c4));
        w32((s32((local_10 + 0x1c0), 0) + 0x1bc), 0, local_10);
      }
      local_10 = (local_10 + 0x1c4);
    }
    (local_10 !== 0) (local_10 = DAT_0064b99c; local_10 = (local_10 !== 0); local_10 = s32((local_10 + 0x1bc), 0))
    {
      if ((s32((local_10 + 8), 0) !== 0)) {
        w32((local_10 + 8), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x10)) {
          local_18 = 0xf;
        }
        else {
          sVar2 = _strlen(local_14);
          local_18 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_18);
      }
      if ((s32((local_10 + 0x10), 0) !== 0)) {
        w32((local_10 + 0x10), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_1c = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_1c = (sVar2 + 1);
        }
        local_14 = (local_14 + local_1c);
      }
      if ((s32((local_10 + 0x14), 0) !== 0)) {
        w32((local_10 + 0x14), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_20 = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_20 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_20);
      }
      if ((s32((local_10 + 0x20), 0) !== 0)) {
        w32((local_10 + 0x20), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_24 = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_24 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_24);
      }
      (local_c < 0x14) (local_c = 0; local_c = (local_c < 0x14); local_c = (local_c + 1)) {
        if ((s32((local_10 + (local_c * 4 + 0x38)), 0) !== 0)) {
          w32((local_10 + (local_c * 4 + 0x38)), 0, local_14);
          sVar2 = _strlen(local_14);
          if (((sVar2 + 1) < 2)) {
            local_28 = 1;
          }
          else {
            sVar2 = _strlen(local_14);
            local_28 = (sVar2 + 1);
          }
          local_14 = (local_14 + local_28);
        }
      }
      if ((s32((local_10 + 0x88), 0) !== 0)) {
        w32((local_10 + 0x88), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_2c = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_2c = (sVar2 + 1);
        }
        local_14 = (local_14 + local_2c);
      }
      if ((s32((local_10 + 0x90), 0) !== 0)) {
        w32((local_10 + 0x90), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x10)) {
          local_30 = 0xf;
        }
        else {
          sVar2 = _strlen(local_14);
          local_30 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_30);
      }
      if ((s32((local_10 + 0xc4), 0) !== 0)) {
        w32((local_10 + 0xc4), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_34 = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_34 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_34);
      }
      if ((s32((local_10 + 0xcc), 0) !== 0)) {
        w32((local_10 + 0xcc), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_38 = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_38 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_38);
      }
      if ((s32((local_10 + 0xd4), 0) !== 0)) {
        w32((local_10 + 0xd4), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_3c = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_3c = (sVar2 + 1);
        }
        local_14 = (local_14 + local_3c);
      }
      if ((s32((local_10 + 0xdc), 0) !== 0)) {
        w32((local_10 + 0xdc), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x10)) {
          local_40 = 0xf;
        }
        else {
          sVar2 = _strlen(local_14);
          local_40 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_40);
      }
      if ((s32((local_10 + 0x13c), 0) !== 0)) {
        w32((local_10 + 0x13c), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_44 = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_44 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_44);
      }
      if ((s32((local_10 + 0x140), 0) !== 0)) {
        w32((local_10 + 0x140), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_48 = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_48 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_48);
      }
      if ((s32((local_10 + 0x148), 0) !== 0)) {
        w32((local_10 + 0x148), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x10)) {
          local_4c = 0xf;
        }
        else {
          sVar2 = _strlen(local_14);
          local_4c = (sVar2 + 1);
        }
        local_14 = (local_14 + local_4c);
      }
      if ((s32((local_10 + 0x174), 0) !== 0)) {
        w32((local_10 + 0x174), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 0x19)) {
          local_50 = 0x18;
        }
        else {
          sVar2 = _strlen(local_14);
          local_50 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_50);
      }
      if ((s32((local_10 + 0x184), 0) !== 0)) {
        w32((local_10 + 0x184), 0, local_14);
        sVar2 = _strlen(local_14);
        if (((sVar2 + 1) < 2)) {
          local_54 = 1;
        }
        else {
          sVar2 = _strlen(local_14);
          local_54 = (sVar2 + 1);
        }
        local_14 = (local_14 + local_54);
      }
    }
  }
  return;
}


 export function FUN_00484cc0 ()

 {
  let local_8;

  DAT_0064bc60 = 0;
  DAT_0064bc62 = 0;
  DAT_0064bcb2 = 0xa;
  DAT_0064bcb4 = 0;
  DAT_0064bcb6 = 0;
  DAT_0064bcb8 = 0;
  DAT_0064bcba = 0;
  (local_8 < 4) (local_8 = 0; local_8 = (local_8 < 4); local_8 = (local_8 + 1)) {
    w16(DAT_0064bcbc, local_8, 0);
  }
  return;
}


 export function FUN_00484d3b ()

 {
  DAT_00628044 = 0;
  return;
}


 export function FUN_00484d52 ()

 {
  if ((DAT_006ad684 === 0)) {
    FUN_00421bd0();
  }
  FUN_00407ff0();
  FUN_00419b80();
  FUN_00407ff0();
  return;
}


 export function FUN_00484d85 ()

 {
  let iVar1;
  let uVar2;
  let local_8;

  if ((iVar1 !== 0)) {
    if ((DAT_00655b02 === 0)) {
      FUN_0046e6a9();
      FUN_00484d3b();
    }
    else {
      if ((DAT_00655b02 === 1)) {
        local_8 = DAT_00655b0b;
        DAT_00655b0b = DAT_006c31a9;
      }
      if ((2 < DAT_00655b02)) {
        if ((DAT_00633a74 !== 0)) {
          FUN_005d2004(DAT_00633a74);
          DAT_00633a74 = 0;
        }
        FUN_004b7645();
        FUN_004b768d();
        uVar2 = FUN_00410070(DAT_006d1da0);
        FUN_0040ff60(0, uVar2);
        uVar2 = FUN_00493ba6(DAT_006d1da0);
        FUN_0040ff60(1, uVar2);
        uVar2 = FUN_00493b10(DAT_006d1da0);
        FUN_0040ff60(2, uVar2);
        uVar2 = FUN_00493c7d(DAT_006d1da0);
        FUN_0040ff60(3, uVar2);
        if ((DAT_00654c76 === 0)) {
          FUN_00511880(1, 0xff, 4, 0, 0, 0);
        }
        else {
          FUN_00511880(0, 0xff, 4, 0, 0, 0);
        }
      }
      DAT_00628054 = 0;
      FUN_0041033a();
      if ((((~(1 << (((DAT_006d1da0) & 0xFF) & 0x1f))) & u8(DAT_00655b0b)) === 0)) {
        if ((DAT_00655b02 < 3)) {
          DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((DAT_006d1da0) & 0xFF) & 0x1f))) & 0xFF)));
        }
        else {
          FUN_0046b14d(0x31, 0, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0);
        }
        FUN_00484d3b();
        FUN_0046e6a9();
      }
      else {
        FUN_004e1763(DAT_006d1da0, 0, 0);
        if ((2 < DAT_00655b02)) {
          FUN_00484d3b();
        }
      }
      DAT_0064b9bc = 0;
      DAT_006ad685 = 1;
      if ((DAT_00655b02 === 1)) {
        DAT_006c31a9 = DAT_00655b0b;
        DAT_00655b0b = local_8;
      }
    }
  }
  return 0;
}


 export function FUN_00484fec (param_1)

 {
  let iVar1;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  local_18 = 0;
  local_c = u8(DAT_00655b08);
  if (((DAT_00655af0 & 4) !== 0)) {
    local_c = (local_c - 1);
  }
  if (((DAT_00655af0 & 8) !== 0)) {
    local_c = (local_c + 1);
  }
  iVar1 = FUN_005adfa0((local_c - 1), 0, 3);
  if ((0xffff < DAT_00655afc)) {
    local_18 = (param_1 - ((DAT_00655afc) << 16 >> 16));
    if ((local_18 < 1)) {
      local_18 = 0;
    }
    param_1 = (param_1 - local_18);
  }
  if ((DAT_0064bcb6 === 0)) {
    if ((param_1 !== 0)) {
      param_1 = (param_1 + -1);
    }
    (local_14 < 6) (local_14 = 0;
        (DAT_0062c494 = DAT_0062c494 && (local_14 = (local_14 < 6)));
        local_14 = (local_14 + 1)) {
      param_1 = (param_1 - s32((DAT_0062c494 + (local_14 * 0xc + iVar1 * 0x48)), 0));
    }
    if ((local_14 < 6)) {
      local_10 = (s32((DAT_0062c498 + (local_14 * 0xc + iVar1 * 0x48)), 0) * param_1 + s32((DAT_0062c490 + (local_14 * 0xc + iVar1 * 0x48)), 0));
    }
    else {
      local_10 = ((s32((DAT_0062c4d4 + iVar1 * 0x48), 0) * s32((DAT_0062c4d0 + iVar1 * 0x48), 0) + s32((DAT_0062c4cc + iVar1 * 0x48), 0)) + param_1);
    }
    if ((local_10 === 0)) {
      local_10 = 1;
    }
  }
  else {
    if ((DAT_0064bcb4 < 1)) {
      local_1c = ((~((DAT_0064bcb4) << 16 >> 16)) + 1);
    }
    else {
      local_1c = ((DAT_0064bcb4) << 16 >> 16);
    }
    local_10 = ((((DAT_0064bcb6) << 16 >> 16) + param_1 * local_1c) + -1);
  }
  return (local_10 + local_18);
}


 export function FUN_00485208 (param_1, param_2)

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  if ((0xffff < DAT_0064bcb4)) {
    if ((DAT_00628064 === 0)) {
      FUN_004af14b(param_1, 1);
      FUN_004aef36(param_1);
    }
    if ((param_2 < 1)) {
      local_14 = ((~param_2) + 1);
    }
    else {
      local_14 = param_2;
    }
    FUN_004af1d5(param_1, local_14);
    if ((DAT_00628064 !== 0)) {
      FUN_004aef36(param_1);
      FUN_004af14b(param_1, 1);
    }
    if ((param_2 < 0)) {
      FUN_004aef36(param_1);
      FUN_004af14b(param_1, 0);
    }
  }
  else {
    if ((param_2 < 1)) {
      if (((param_2 % 0xc) < 1)) {
        local_c = ((~(param_2 % 0xc)) + 1);
      }
      else {
        local_c = (param_2 % 0xc);
      }
      FUN_0040bc10((0x1af - local_c));
    }
    else {
      if (((param_2 % 0xc) < 1)) {
        local_8 = ((~(param_2 % 0xc)) + 1);
      }
      else {
        local_8 = (param_2 % 0xc);
      }
      FUN_0040bc10((local_8 + 0x1a4));
    }
    FUN_0040fe10();
    if (((param_2 / 0xc | 0) < 1)) {
      local_10 = ((~(param_2 / 0xc | 0)) + 1);
    }
    else {
      local_10 = (param_2 / 0xc | 0);
    }
    FUN_004af1d5(param_1, local_10);
  }
  return;
}


 export function FUN_004853e7 ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let local_50;
  let local_4c;
  let aiStack_48;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  (local_50 < 8) (local_50 = 1; local_50 = local_50; local_50 = (local_50 + 1)) {
    if ((((1 << (((local_50) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) === 0)) {
      w32(DAT_ffffffb8, local_50, 0);
    }
    else if (((DAT_0064bc60 & 2) === 0)) {
      w32(DAT_ffffffb8, local_50, ((u8(DAT_0064c6b0[local_50 * 0x594]) * 3 + ((s16((DAT_0064c70c + local_50 * 0x594), 0)) << 16 >> 16) * 8) + (s32((DAT_0064c6a2 + local_50 * 0x594), 0) >> 5)));
      local_c = 0;
      (local_20 < 0x3e) (local_20 = 0; local_20 = (local_20 < 0x3e); local_20 = (local_20 + 1)) {
        if ((DAT_0064b1ca[local_20 * 0x14] < 5)) {
          if ((DAT_0064b1c1[local_20 * 0x14] === 0)) {
            local_18 = (((s8(DAT_0064b1c6[local_20 * 0x14]) + 1) + s8(DAT_0064b1c7[local_20 * 0x14])) / 2 | 0);
          }
          else {
            local_18 = 1;
          }
          local_4c = ((s8(DAT_0064b1c4[local_20 * 0x14]) * local_18 + s8(DAT_0064b1c5[local_20 * 0x14])) >> 1);
        }
        else {
          local_4c = ((s8(DAT_0064b1c8[local_20 * 0x14]) + 1) / 2 | 0);
        }
        local_c = (local_c + u8(DAT_0064c778[(local_50 * 0x594 + local_20)]) * local_4c);
      }
    }
    else {
      w32(DAT_ffffffb8, local_50, 0);
      (local_24 < ((DAT_00655b18) << 16 >> 16)) (local_24 = 0; local_24 = (local_24 < ((DAT_00655b18) << 16 >> 16)); local_24 = (local_24 + 1)) {
        if ((s8(DAT_0064f348[local_24 * 0x58]) === local_50)) {
          iVar2 = FUN_0043cef9(local_24);
          w32(DAT_ffffffb8, local_50, (s32(DAT_ffffffb8, local_50) + iVar2 * 2));
        }
      }
    }
    if (((DAT_0064bc60 & 2) === 0)) {
      if ((DAT_00655af8 < 0x258)) {
        uVar1 = FUN_005adfa0((s32(DAT_ffffffb8, local_50) >> 3), 0, 0xff);
        DAT_00655c38[(((((((DAT_00655af8) << 16 >> 16) >> 0x1f) << 32) | (((DAT_00655af8) << 16 >> 16) >> 2)) % 0x96) * 8 + local_50)] = uVar1;
      }
    }
    else if ((DAT_00655af8 < 0x4b)) {
      uVar1 = FUN_005adfa0(s32(DAT_ffffffb8, local_50), 0, 0xff);
      DAT_00655c38[(((((((DAT_00655af8) << 16 >> 16) >> 0x1f) << 32) | (((DAT_00655af8) << 16 >> 16) >> 1)) % 0x96) * 8 + local_50)] = uVar1;
    }
  }
  (local_28 < 8) (local_28 = 1; local_28 = (local_28 < 8); local_28 = (local_28 + 1)) {
    local_8 = -1;
    local_50 = 0;
    (local_10 < 8) (local_10 = 1; local_10 = local_10; local_10 = (local_10 + 1)) {
      if ((local_8 < s32(DAT_ffffffb8, local_10))) {
        local_50 = local_10;
        local_8 = s32(DAT_ffffffb8, local_10);
      }
    }
    DAT_00655c22[local_50] = (8 - ((local_28) & 0xFF));
    w32(DAT_ffffffb8, local_50, -1);
  }
  DAT_00655af0 = (DAT_00655af0 & 0xfffe);
  (local_50 < 8) (local_50 = 0; local_50 = local_50; local_50 = (local_50 + 1)) {
    DAT_00655c2a[local_50] = 0;
  }
  (local_50 < 8) (local_50 = 1; local_50 = local_50; local_50 = (local_50 + 1)) {
    if ((((1 << (((local_50) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
      DAT_00655c2a[u8(DAT_00655c22[local_50])] = ((local_50) & 0xFF);
    }
  }
  DAT_00655c20 = 0;
  DAT_00655c21 = 0;
  (-1 < local_50) (local_50 = 7; -1 = (-1 < local_50); local_50 = (local_50 + -1)) {
    if (((u8(DAT_00655b0b) & (1 << (DAT_00655c2a[local_50] & 0x1f))) !== 0)) {
      DAT_00655c20 = ((local_50) & 0xFF);
      break;
    }
  }
  local_50 = 0;
  do {
    if ((7 < local_50)) {
 LAB_00485891: :
      local_1c = 0;
      local_50 = u8(DAT_00655c31);
      if ((DAT_00655b08 !== 0)) {
        local_1c = 1;
      }
      if ((3 < DAT_00655b08)) {
        (local_10 < 8) (local_10 = 1; local_10 = local_10; local_10 = (local_10 + 1)) {
          if ((iVar2 !== 0)) {
            local_50 = local_10;
            local_1c = 1;
          }
        }
      }
      uVar3 = local_50;
      if ((local_1c !== 0)) {
        DAT_00655af0 = (DAT_00655af0 | 1);
        local_10 = local_50;
        local_14 = 0;
        (local_50 < 8) (local_50 = 1; local_50 = local_50; local_50 = (local_50 + 1)) {
          if (((DAT_0064c6c1[(local_50 * 4 + uVar3 * 0x594)] & 0x20) !== 0)) {
            local_14 = (local_14 + 1);
          }
        }
        (local_50 < 8) (local_50 = 1; local_50 = local_50; local_50 = (local_50 + 1)) {
          if ((iVar2 !== 0)) {
            if (((DAT_0064c6c0[(local_50 * 0x594 + local_10 * 4)] & 8) === 0)) {
              if (((DAT_0064c6c0[(local_50 * 0x594 + local_10 * 4)] & 6) === 0)) {
                FUN_00456f20(local_50, local_10, 1);
                w32((DAT_0064c6c0 + (local_50 * 0x594 + local_10 * 4)), 0, (s32((DAT_0064c6c0 + (local_50 * 0x594 + local_10 * 4)), 0) | 1));
              }
              else {
                uVar3 = _rand();
                uVar4 = (uVar3 >> 0x1f);
                if ((iVar2 !== 0)) {
                  w32((DAT_0064c6c0 + (local_50 * 0x594 + local_10 * 4)), 0, (s32((DAT_0064c6c0 + (local_50 * 0x594 + local_10 * 4)), 0) | 0x20));
                }
              }
            }
            else {
              iVar2 = FUN_004a7577(local_50);
              if ((3 < DAT_00655b08)) {
                w32((DAT_0064c6c0 + (local_50 * 0x594 + local_10 * 4)), 0, (s32((DAT_0064c6c0 + (local_50 * 0x594 + local_10 * 4)), 0) | 0x20));
              }
            }
          }
        }
      }
      return;
    }
    if (((u8(DAT_00655b0b) & (1 << (DAT_00655c2a[local_50] & 0x1f))) !== 0)) {
      DAT_00655c21 = ((local_50) & 0xFF);
      goto LAB_00485891;
    }
    local_50 = (local_50 + 1);
  } ( true );
}


 export function FUN_00485c15 ()

 {
  let sVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let uVar5;
  let uVar6;
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

  if ((DAT_00655b09 !== 0)) {
    if ((DAT_00655b08 < 5)) {
      iVar2 = ((3 - u8(DAT_00655b09)) * 3 + 0x1e) * (5 - u8(DAT_00655b08));
      if ((((iVar2 - ((DAT_00655af8) << 16 >> 16)) !== 0) && (((DAT_00655af8) << 16 >> 16) <= iVar2))) {
        return;
      }
    }
    else if ((((DAT_00655af8) << 16 >> 16) < ((3 - u8(DAT_00655b09)) * 3 + 0xf))) {
      return;
    }
    if ((DAT_00655b09 === 1)) {
      local_8 = 0xf;
    }
    else if ((DAT_00655b09 === 2)) {
      local_8 = 7;
    }
    else if ((DAT_00655b09 === 3)) {
      local_8 = 7;
    }
    if ((DAT_00655b82[s8(DAT_0064b383)] === 0)) {
      local_40 = 0;
      do {
        if (((((DAT_006d1160) << 16 >> 16) === 1) || ((((DAT_006d1160) << 16 >> 16) + -1) < 0))) {
          local_18 = 0;
        }
        else {
          iVar2 = _rand();
          local_18 = (iVar2 % ((DAT_006d1160) << 16 >> 16));
        }
        if (((((DAT_006d1162) << 16 >> 16) === 7) || ((((DAT_006d1162) << 16 >> 16) + -7) < 0))) {
          local_44 = 0;
        }
        else {
          local_44 = _rand();
          local_44 = (local_44 % (((DAT_006d1162) << 16 >> 16) + -6));
        }
        local_1c = (local_44 + 3);
        if (((local_18 & 1) !== 0)) {
          local_18 = (local_18 - 1);
        }
        if (((local_1c & 1) !== 0)) {
          local_18 = (local_18 + 1);
        }
        local_40 = (local_40 + 1);
        if ((0x3e8 < local_40)) {
          return;
        }
        iVar2 = FUN_005b89e4(local_18, local_1c);
      } while ((s16((DAT_00666134 + iVar2 * 0x10), 0) < 0x10)) {
        local_34 = (iVar2 + 2);
      }
      local_24 = 0x20;
      if ((DAT_00655bbb !== 0)) {
        local_24 = 0x21;
      }
      if ((DAT_00655baf !== 0)) {
        local_24 = 0x23;
      }
      local_38 = 2;
      if (((DAT_00655ae8 & 1) !== 0)) {
        local_38 = 4;
      }
      if (((DAT_00655b0b & DAT_00655ba9) !== 0)) {
        local_38 = 5;
      }
      if ((DAT_00655b8d !== 0)) {
        if (((DAT_00655ae8 & 1) === 0)) {
          local_38 = 0x13;
        }
        else {
          local_38 = 0x12;
        }
      }
      local_c = local_34;
      if (((DAT_00655ae8 & 1) !== 0)) {
        local_38 = 0x14;
      }
      while ((local_c < 0)) {
        local_c = (local_c + -1);
        if ((local_c < 0)) {
          local_20 = 0x2e;
        }
        iVar2 = FUN_005b3d06(local_20, 0, local_18, local_1c);
        if ((-1 < iVar2)) {
          FUN_005b2f50(iVar2);
        }
      }
      iVar2 = FUN_005b3d06(local_24, 0, local_18, local_1c);
      local_10 = iVar2;
      if ((iVar2 < 0)) {
        iVar2 = FUN_005b2e69(local_18, local_1c);
        if ((-1 < iVar2)) {
          FUN_005b47fa(iVar2, 1);
        }
      }
      else {
        uVar4 = _rand();
        uVar6 = (uVar4 >> 0x1f);
        if ((((((uVar4 ^ uVar6) - uVar6) & 1) ^ uVar6) === uVar6)) {
          w16((DAT_006560f4 + iVar2 * 0x20), 0, (s16((DAT_006560f4 + iVar2 * 0x20), 0) | 0x2000));
        }
        FUN_005b3863(local_10, 1);
      }
    }
    if (((((DAT_00655b18) << 16 >> 16) === 1) || ((((DAT_00655b18) << 16 >> 16) + -1) < 0))) {
      local_30 = 0;
    }
    else {
      local_30 = _rand();
      local_30 = (local_30 % ((DAT_00655b18) << 16 >> 16));
    }
    if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_30 * 0x58] & 0x1f))) !== 0)) {
      iVar2 = _rand();
      iVar3 = FUN_00579dbb(local_30);
      if (((iVar2 % 0x64) < iVar3)) {
        local_28 = 0;
        do {
          do {
            iVar2 = _rand();
            local_18 = FUN_005ae052(((((s16((DAT_0064f340 + local_30 * 0x58), 0)) << 16 >> 16) + (iVar2 % 0xd) * 2) + -6));
            sVar1 = s16((DAT_0064f342 + local_30 * 0x58), 0);
            iVar2 = _rand();
            local_1c = ((((sVar1) << 16 >> 16) + (iVar2 % 0xd)) - 6);
            if (((local_18 & 1) !== 0)) {
              local_18 = (local_18 - 1);
            }
            if (((local_1c & 1) !== 0)) {
              local_18 = (local_18 + 1);
            }
            iVar2 = FUN_004087c0(local_18, local_1c);
            if ((local_30 < 0)) {
              local_28 = 0xc8;
              goto LAB_004862b4;
            }
            local_28 = (local_28 + 1);
            if ((u8(DAT_00655b09) * 0x32 <= local_28)) {
          if ((DAT_00655b09 === 3)) {
            local_8 = s8(DAT_0064f349[local_30 * 0x58]);
          }
          if (((local_8 === 1) || ((local_8 - 1) < 0))) {
            local_34 = 0;
          }
          else {
            local_34 = _rand();
            local_34 = (local_34 % local_8);
          }
          if ((0x95 < DAT_00655af8)) {
            if ((((-u8(DAT_00655b08)) === -9) || (((-u8(DAT_00655b08)) + 9) < 0))) {
              local_48 = 0;
            }
            else {
              local_48 = _rand();
              local_48 = (local_48 % (0xa - u8(DAT_00655b08)));
            }
            if ((local_48 === 0)) {
              if ((((local_8 / 2 | 0) === 1) || (((local_8 / 2 | 0) + -1) < 0))) {
                local_4c = 0;
              }
              else {
                local_4c = _rand();
                local_4c = (local_4c % (local_8 / 2 | 0));
              }
              local_34 = (local_34 + (local_4c + (local_8 / 2 | 0)));
            }
          }
          uVar4 = FUN_005adfa0(local_34, 2, 0x63);
          local_14 = 0x10;
          local_2c = 0xf;
          iVar2 = _rand();
          if (((iVar2 % 3) === 0)) {
            FUN_005adfd9(DAT_ffffffec, DAT_ffffffd4);
          }
          uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0x188), 0));
          FUN_0040ff60(0, uVar5);
          if (((s8(DAT_0064f349[local_30 * 0x58]) / 2 | 0) < uVar4)) {
            uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0x18c), 0));
            FUN_0040ff60(0, uVar5);
          }
          if ((DAT_00655ba5 !== 0)) {
            uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0x190), 0));
            FUN_0040ff60(0, uVar5);
            if (((DAT_00655ae8 & 1) !== 0)) {
              local_14 = 4;
              local_2c = 0x11;
            }
          }
          if ((DAT_00655ba7 !== 0)) {
            uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0x194), 0));
            FUN_0040ff60(0, uVar5);
            local_14 = 0x18;
            local_2c = 7;
            if ((DAT_00655b82[s8(DAT_0064b383)] !== 0)) {
              uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0x198), 0));
              FUN_0040ff60(0, uVar5);
              local_2c = 0xb;
              if ((DAT_00655ba4 !== 0)) {
                if ((DAT_0064f348[local_30 * 0x58] !== DAT_0064f34a[local_30 * 0x58])) {
                  local_14 = 0x15;
                  local_2c = 9;
                }
                else {
                  local_2c = 8;
                  uVar5 = FUN_00428b0c(s32((DAT_00628420 + 0x19c), 0));
                  FUN_0040ff60(0, uVar5);
                }
              }
            }
          }
          local_3c = -1;
          (-1 < local_c) (local_c = uVar4; -1 = (-1 < local_c); local_c = (local_c - 1)) {
            if (((local_c & 4) === 0)) {
              local_20 = local_2c;
            }
            else {
              local_20 = local_14;
            }
            if ((local_c === uVar4)) {
              local_20 = 0x2e;
            }
            local_3c = FUN_005b3d06(local_20, 0, local_18, local_1c);
            if ((-1 < local_3c)) {
              if ((local_20 === 8)) {
                w16((DAT_006560f4 + local_3c * 0x20), 0, (s16((DAT_006560f4 + local_3c * 0x20), 0) | 0x2000));
              }
              iVar2 = FUN_005b8931(local_18, local_1c);
              DAT_006560f9[local_3c * 0x20] = (_MEM[(iVar2 + 4)] | DAT_006560f9[local_3c * 0x20]);
            }
          }
          if ((DAT_00654fa8 === 0)) {
            FUN_0040ff60(1, (DAT_0064f360 + local_30 * 0x58));
            if ((iVar2 !== 0)) {
              FUN_004442e0(s_BARBARIANS_0062c5d0, local_3c);
            }
            else if ((iVar2 !== 0)) {
              FUN_0046b14d(0x72, s32((DAT_006ad30c + s32((DAT_006ad558 + s8(DAT_0064f348[local_30 * 0x58]) * 4), 0) * 0x54), 0), local_18, local_1c, 0, 0, 0, 0, 0, 0);
              FUN_00511880(2, s32((DAT_006ad30c + s32((DAT_006ad558 + s8(DAT_0064f348[local_30 * 0x58]) * 4), 0) * 0x54), 0), 2, 0, local_3c, 0);
            }
          }
          if (((u8(DAT_00655b0b) & (1 << (DAT_0064f348[local_30 * 0x58] & 0x1f))) !== 0)) {
            FUN_0047cea6(local_18, local_1c);
          }
        }
      }
    }
  }
  return;
}


 export function FUN_004868fb (param_1)

 {
  let cVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let pbVar5;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_8;

  if ((DAT_00654fa8 === 0)) {
    if ((2 < DAT_00655b02)) {
      FUN_00511880(3, 0xff, 0, 0, 0, 0);
    }
    FUN_00410030(s_GLOBALWARMING_0062c5dc, DAT_0063fc58, 0);
  }
  local_1c = 0;
  local_18 = 0;
  FUN_005b9ec6();
  (local_20 < ((DAT_006d1164) << 16 >> 16)) (local_20 = 0; local_20 = (local_20 < ((DAT_006d1164) << 16 >> 16)); local_20 = (local_20 + 1)) {
    bVar2 = FUN_005b89bb(local_18, local_1c);
    if ((bVar2 < 4)) {
      local_14 = 0;
      (local_8 < 0x14) (local_8 = 0; local_8 = (local_8 < 0x14); local_8 = (local_8 + 1)) {
        uVar3 = FUN_005ae052((s8(DAT_00628350[local_8]) + local_18));
        cVar1 = DAT_00628360[local_8];
        iVar4 = FUN_004087c0(uVar3, (s8(cVar1) + local_1c));
        if ((iVar4 !== 0)) {
          local_14 = (local_14 + 1);
        }
      }
      if ((local_14 < (7 - param_1))) {
        if ((((local_18 * 3 + local_1c * -3) & 7) === param_1)) {
          iVar4 = FUN_005b8a1d(local_18, local_1c);
          if ((iVar4 < 0)) {
            FUN_005b99e8(local_18, local_1c, 0, 1);
          }
          if ((bVar2 < 2)) {
            FUN_005b9646(local_18, local_1c, 0, 1);
          }
          else {
            FUN_005b9646(local_18, local_1c, 1, 1);
          }
          iVar4 = FUN_005b8b65(local_18, local_1c, DAT_006d1da0);
          if ((iVar4 !== 0)) {
            FUN_0047cea6(local_18, local_1c);
          }
        }
      }
      else {
        iVar4 = FUN_005b8a1d(local_18, local_1c);
        if ((iVar4 < 0)) {
          FUN_005b99e8(local_18, local_1c, 0, 1);
        }
        if ((bVar2 === 3)) {
          FUN_005b9646(local_18, local_1c, 9, 1);
        }
        else {
          FUN_005b9646(local_18, local_1c, 8, 1);
        }
        FUN_005b94fc(local_18, local_1c, 0xc, 0, 1);
        (local_24 < 8) (local_24 = 1; local_24 = (local_24 < 8); local_24 = (local_24 + 1)) {
          iVar4 = FUN_005b8b65(local_18, local_1c, local_24);
          if ((DAT_006d1da0 === local_24)) {
            FUN_0047cea6(local_18, local_1c);
          }
        }
      }
    }
    local_18 = (local_18 + 2);
    if ((((DAT_006d1160) << 16 >> 16) <= local_18)) {
      local_1c = (local_1c + 1);
      local_18 = (local_1c & 1);
    }
  }
  FUN_005b9f1c();
  return;
}


 export function FUN_00486c2e ()

 {
  let cVar1;
  let iVar2;
  let iVar3;
  let local_14;
  let local_10;
  let local_c;

  iVar2 = FUN_005ae006(DAT_00655b0b);
  local_c = ((((DAT_00655b12) << 16 >> 16) - ((DAT_00655b10) << 16 >> 16)) + (((DAT_00655b10) << 16 >> 16) / 2 | 0));
  local_14 = 0;
  (local_10 < ((DAT_00655b18) << 16 >> 16)) (local_10 = 0; local_10 = (local_10 < ((DAT_00655b18) << 16 >> 16)); local_10 = (local_10 + 1)) {
    if ((iVar3 !== 0)) {
      local_14 = (local_14 + 1);
    }
  }
  if ((1 < iVar2)) {
    local_c = (((iVar2 + -1) + local_c) / iVar2 | 0);
  }
  iVar2 = ((local_c * 2 + s8(DAT_00655b0f) * -4) - local_14);
  if (((iVar2 === s8(DAT_00655b0e)) || ((iVar2 - s8(DAT_00655b0e)) < 0))) {
    if (((((local_c * 2 + s8(DAT_00655b0f) * -4) - local_14) - s8(DAT_00655b0e)) < 0)) {
      DAT_00655b0e = (DAT_00655b0e + 0xff);
    }
  }
  else {
    DAT_00655b0e = (DAT_00655b0e + 1);
  }
  DAT_00655b0e = FUN_005adfa0(s8(DAT_00655b0e), 0, 0x63);
  if ((DAT_00654fa8 === 0)) {
    if ((2 < DAT_00655b02)) {
      FUN_00511880(4, 0xff, 0, 0, 0, 0);
    }
    FUN_00410030(s_FEARWARMING_0062c5ec, DAT_0063fc58, 0);
  }
  cVar1 = DAT_00655b0f;
  if ((0x10 < DAT_00655b0e)) {
    DAT_00655b0f = (DAT_00655b0f + 1);
    FUN_004868fb(s8(cVar1));
    DAT_00655b0e = 0;
  }
  DAT_00655b10 = 0;
  return;
}


 export function FUN_00486e15 (param_1)

 {
  let local_c;
  let local_8;

  local_8 = 0;
  (local_c <= param_1) (local_c = 0; local_c = (local_c <= param_1); local_c = (local_c + 1)) {
    local_8 = (local_8 + (7 - u8(DAT_00655b08)) * local_c);
  }
  return ((local_8 / 2 | 0) + 1);
}


 export function FUN_00486e6f ()

 {
  let bVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let local_c;

  iVar2 = DAT_006d1da0;
  if ((DAT_00655b02 !== 1)) {
    bVar1 = 0;
    (local_c < ((DAT_00655b18) << 16 >> 16)) (local_c = 0; local_c = (local_c < ((DAT_00655b18) << 16 >> 16)); local_c = (local_c + 1)) {
      if ((iVar3 !== 0)) {
        bVar1 = 1;
        break;
      }
    }
    if (((((DAT_0064bc56) << 16 >> 16) * 0x14 + 1) < ((DAT_00655af8) << 16 >> 16))) {
      iVar3 = FUN_004a28b0(iVar2);
      iVar4 = FUN_00486e15((((s16((DAT_0064ca9e + iVar2 * 0x594), 0)) << 16 >> 16) + 1));
      if (((None & 2) !== 0)) {
        FUN_0044cc80(DAT_006d1da0);
      }
    }
  }
  return;
}


 export function FUN_00487007 ()

 {
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  DAT_006ad699 = 0;
  local_c = 0;
  local_8 = 0;
  (local_10 < ((DAT_006d1164) << 16 >> 16)) (local_10 = 0; local_10 = (local_10 < ((DAT_006d1164) << 16 >> 16)); local_10 = (local_10 + 1)) {
    FUN_005b94fc(local_8, local_c, 1, 0, 1);
    local_8 = (local_8 + 2);
    if ((((DAT_006d1160) << 16 >> 16) <= local_8)) {
      local_c = (local_c + 1);
      local_8 = (local_c & 1);
    }
  }
  (local_14 < ((DAT_00655b16) << 16 >> 16)) (local_14 = 0; local_14 = (local_14 < ((DAT_00655b16) << 16 >> 16)); local_14 = (local_14 + 1)) {
    if ((s32((DAT_0065610a + local_14 * 0x20), 0) !== 0)) {
      FUN_005b94fc(((s16((DAT_006560f0 + local_14 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_14 * 0x20), 0)) << 16 >> 16), 1, 1, 1);
    }
  }
  DAT_006ad699 = 1;
  FUN_004b0b53(0xff, 2, 0, 0, 1);
  return;
}


 export function FUN_0048710a (param_1)

 {
  let local_8;

  FUN_00487007();
  if ((param_1 === -3)) {
    (local_8 < ((DAT_00655b16) << 16 >> 16)) (local_8 = 0; local_8 = local_8; local_8 = (local_8 + 1)) {
      if ((s32((DAT_0065610a + local_8 * 0x20), 0) !== 0)) {
        FUN_005b6787(local_8);
      }
    }
  }
  (local_8 < ((DAT_00655b16) << 16 >> 16)) (local_8 = 0; local_8 = local_8; local_8 = (local_8 + 1)) {
    if ((s8(DAT_006560f7[local_8 * 0x20]) === param_1)) {
      if (((s16((DAT_006560f4 + local_8 * 0x20), 0) & 2) === 0)) {
        DAT_006560f8[local_8 * 0x20] = 0;
        DAT_006560fe[local_8 * 0x20] = 0;
        w16((DAT_006560f4 + local_8 * 0x20), 0, (s16((DAT_006560f4 + local_8 * 0x20), 0) & 0xbfff));
        if ((((((DAT_00655af8) << 16 >> 16) ^ (local_8 & 3)) & 3) === 0)) {
          w16((DAT_006560f4 + local_8 * 0x20), 0, (s16((DAT_006560f4 + local_8 * 0x20), 0) & 0xffdf));
        }
        w16((DAT_006560f4 + local_8 * 0x20), 0, (s16((DAT_006560f4 + local_8 * 0x20), 0) & 0xfffb));
      }
      else {
        DAT_006560fe[local_8 * 0x20] = (DAT_006560fe[local_8 * 0x20] + 0xff);
        if ((DAT_006560fe[local_8 * 0x20] === 0)) {
          w16((DAT_006560f4 + local_8 * 0x20), 0, (s16((DAT_006560f4 + local_8 * 0x20), 0) & 0xfffd));
          w32((DAT_0064c6c0 + (s8(DAT_006560fd[local_8 * 0x20]) * 4 + param_1 * 0x594)), 0, (s32((DAT_0064c6c0 + (s8(DAT_006560fd[local_8 * 0x20]) * 4 + param_1 * 0x594)), 0) & -0x1000001));
          FUN_004c5fae(local_8, 0, s8(DAT_006560fd[local_8 * 0x20]));
        }
      }
    }
  }
  return;
}


 export function FUN_00487371 (param_1)

 {
  let uVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  let local_1c;
  let local_18;
  let local_c;
  let local_8;

  if ((DAT_00655af8 !== 0)) {
    FUN_00485c15();
    FUN_00486c2e();
    FUN_004853e7();
    if ((DAT_00655b02 === 0)) {
      FUN_00486e6f();
    }
  }
  DAT_00655af8 = (DAT_00655af8 + 1);
  DAT_00655afa = FUN_00484fec((((DAT_00655af8 + 1)) << 16 >> 16));
  if ((0xc7 < (DAT_00655af8 + 1))) {
    DAT_00655b14 = (DAT_00655b14 + 1);
  }
  DAT_00655aee = (DAT_00655aee & 0xfffe);
  FUN_0048710a(param_1);
  uVar2 = u8(DAT_00655b08);
  if ((((((DAT_00655af8 + 1)) << 16 >> 16) % (uVar2 + 1) * 0xc) === 0)) {
    (local_1c < 8) (local_1c = 0; local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
      if ((DAT_0064c6be[local_1c * 0x594] !== 0)) {
        DAT_0064c6be[local_1c * 0x594] = (DAT_0064c6be[local_1c * 0x594] + 0xff);
        if ((((1 << (((local_1c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
          (local_c < 8) (local_c = 0; local_c = (local_c < 8); local_c = (local_c + 1)) {
            uVar1 = FUN_005adfa0(s8(DAT_0064c6e8[(local_c * 0x594 + local_1c)]), 0, DAT_0064c6be[local_1c * 0x594]);
            DAT_0064c6e8[(local_c * 0x594 + local_1c)] = uVar1;
          }
        }
      }
    }
  }
  if ((DAT_00655c1e < DAT_00655af8)) {
    iVar3 = _rand();
    DAT_00655c1e = ((DAT_00655af8 + (((iVar3 % 0x28)) & 0xFFFF)) + 0x14);
    if ((DAT_00654fa8 === 0)) {
      if ((2 < DAT_00655b02)) {
        FUN_00511880(5, 0xff, 0, 0, 0, 0);
      }
      if ((DAT_00655b02 === 1)) {
        FUN_0050994f();
        FUN_004503d0();
        FUN_004503d0();
        (local_8 < 8) (local_8 = 0; local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
          if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
            FUN_004503d0();
          }
        }
      }
      FUN_00432611();
      if ((DAT_00655b02 === 1)) {
        FUN_004085f0();
        FUN_004085f0();
        (local_8 < 8) (local_8 = 0; local_8 = (local_8 < 8); local_8 = (local_8 + 1)) {
          if ((s16((DAT_0066ca84 + local_8 * 0x3f0), 0) !== 0)) {
            FUN_004085f0();
          }
        }
      }
    }
  }
  local_1c = 1;
  while (((DAT_0064caa0[local_1c * 0x594] & 4) === 0)) {
    if ((7 < local_1c)) {
      return;
    }
    iVar3 = FUN_004a7577(local_1c);
    if (((DAT_0064caa0[local_1c * 0x594] & 4) === 0)) {
    DAT_0064caa0[local_1c * 0x594] = (DAT_0064caa0[local_1c * 0x594] | 0x10);
    DAT_0062c5b4 = local_1c;
    if ((DAT_006d1da0 === local_1c)) {
      DAT_0064b1ac = 1;
    }
    else {
      DAT_0064b1ac = 2;
    }
    if ((2 < DAT_00655b02)) {
      uVar4 = FUN_00410070(local_1c);
      FUN_0040ff60(0, uVar4);
      if ((((1 << (((local_1c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
        FUN_00511880(6, 0xff, 1, 0, 0, 0);
        FUN_0046b14d(0x6b, 0xff, DAT_00655af0, 2, local_1c, 0, 0, 0, 0, 0);
      }
      else {
        FUN_0046b14d(0x6b, s32((DAT_006ad30c + s32((DAT_006ad558 + local_1c * 4), 0) * 0x54), 0), DAT_00655af0, 1, local_1c, 0, 0, 0, 0, 0);
        (local_18 < 8) (local_18 = 1; local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
          if ((local_18 !== local_1c)) {
            FUN_00511880(6, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), 1, 0, 0, 0);
            FUN_0046b14d(0x6b, s32((DAT_006ad30c + s32((DAT_006ad558 + local_18 * 4), 0) * 0x54), 0), DAT_00655af0, 2, DAT_0062c5b4, 0, 0, 0, 0, 0);
          }
        }
      }
    }
  }
  if ((DAT_0064b1ac === 0)) {
    uVar4 = FUN_00410070(local_1c);
    FUN_0040ff60(0, uVar4);
    if ((DAT_0064b1ac === 0)) {
      FUN_00511880(6, 0xff, 1, 0, 0, 0);
    }
    FUN_00410030(s_EAGLEHASLANDED_0062c5f8, DAT_0063fc58, 0);
  }
  DAT_00655af0 = (DAT_00655af0 | 2);
  return;
}


 export function FUN_00487a41 (param_1)

 {
  let cVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let local_38;
  let local_2c;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;

  local_1c = 0;
  w16((DAT_0064ca72 + param_1 * 0x594), 0, 0);
  (local_38 < 7) (local_38 = 0; local_38 = (local_38 < 7); local_38 = (local_38 + 1)) {
    w16((DAT_0064ca74 + (param_1 * 0x594 + local_38 * 2)), 0, 0);
  }
  (local_14 < 0x1c) (local_14 = 0; local_14 = (local_14 < 0x1c); local_14 = (local_14 + 1)) {
    DAT_0063f580[(param_1 * 0x1c + local_14)] = 0;
  }
  DAT_00655aee = (DAT_00655aee & 0xfffb);
  FUN_0050dada();
  local_24 = ((DAT_00655b18) << 16 >> 16);
  while ((local_24 < 0)) {
    local_24 = (local_24 + -1);
    if ((local_24 < 0)) {
      FUN_0047e94e(1, 0);
    }
    if ((s8(DAT_0064f348[local_24 * 0x58]) === (param_1 & 0xff))) {
      w32((DAT_0064f344 + local_24 * 0x58), 0, (s32((DAT_0064f344 + local_24 * 0x58), 0) & -0x10001));
      iVar4 = FUN_004f0a9c(local_24);
      if ((iVar4 !== -0x3e7)) {
        if ((5 < DAT_0064f349[local_24 * 0x58])) {
          local_1c = (local_1c | 1);
        }
        if (((DAT_0064f344[local_24 * 0x58] & 1) !== 0)) {
          local_1c = (local_1c | 2);
        }
        (local_2c < 8) (local_2c = 1; local_2c = (local_2c < 8); local_2c = (local_2c + 1)) {
          if ((DAT_00655c18 !== 0xffff)) {
            DAT_0064f34d[(local_24 * 0x58 + local_2c)] = DAT_0064f349[local_24 * 0x58];
          }
        }
        iVar4 = IsTracking(DAT_006a91b8);
        if ((DAT_006a65a0 === 0)) {
          FUN_00509429();
        }
      }
    }
  }
  FUN_0050db36();
  w16((DAT_0064ca74 + param_1 * 0x594), 0, (s16((DAT_0064ca74 + param_1 * 0x594), 0) + s16((DAT_0064ca76 + param_1 * 0x594), 0) * 2))
  ;
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    local_18 = ((-(u8(DAT_0064c6b3[param_1 * 0x594]) + u8(DAT_0064c6b4[param_1 * 0x594]))) + 0xa);
    if ((local_18 < 4)) {
      local_18 = ((-(u8(DAT_0064c6b3[param_1 * 0x594]) + u8(DAT_0064c6b4[param_1 * 0x594]))) + 0xb);
    }
    if ((2 < local_18)) {
      local_18 = (local_18 + -1);
    }
    iVar4 = FUN_005adfa0(local_18, 0, 4);
    DAT_0064c6b3[param_1 * 0x594] = (DAT_006554fa[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30] + ((((0xa - iVar4) >> 1)) & 0xFF));
    if (((((DAT_00655af8) << 16 >> 16) + 0x64) < s32((DAT_0064c6a2 + param_1 * 0x594), 0))) {
      DAT_0064c6b3[param_1 * 0x594] = (DAT_0064c6b3[param_1 * 0x594] + 1);
    }
    if ((0x7d0 < s32((DAT_0064c6a2 + param_1 * 0x594), 0))) {
      DAT_0064c6b3[param_1 * 0x594] = (DAT_0064c6b3[param_1 * 0x594] + 1);
    }
    if ((0x1f40 < s32((DAT_0064c6a2 + param_1 * 0x594), 0))) {
      DAT_0064c6b3[param_1 * 0x594] = (0xa - ((iVar4) & 0xFF));
    }
    bVar2 = 0;
    (local_20 < 0x40) (local_20 = 1; local_20 = (local_20 < 0x40); local_20 = (local_20 + 1)) {
      if ((DAT_0064c932[(param_1 * 0x594 + local_20)] !== 0)) {
        if ((DAT_0064ca32[(param_1 * 0x594 + local_20)] === 1)) {
          bVar2 = 1;
        }
        if ((DAT_0064c9f2[(param_1 * 0x594 + local_20)] !== 0)) {
          bVar2 = 1;
        }
      }
    }
    if ((DAT_0064c6b3[param_1 * 0x594] < 7)) {
      DAT_0064c6b3[param_1 * 0x594] = (DAT_0064c6b3[param_1 * 0x594] + 1);
    }
    local_10 = 6;
    if ((1 < DAT_0064c6b5[param_1 * 0x594])) {
      local_10 = 7;
    }
    if ((4 < DAT_0064c6b5[param_1 * 0x594])) {
      local_10 = 8;
    }
    if ((5 < DAT_0064c6b5[param_1 * 0x594])) {
      local_10 = 0xa;
    }
    iVar5 = (0xa - iVar4);
    if ((local_10 <= (0xa - iVar4))) {
      iVar5 = local_10;
    }
    uVar3 = FUN_005adfa0(DAT_0064c6b3[param_1 * 0x594], 0, iVar5);
    DAT_0064c6b3[param_1 * 0x594] = uVar3;
    iVar5 = FUN_004bd9f0(param_1, 0x20);
    if ((iVar5 !== 0)) {
      DAT_0064c6b3[param_1 * 0x594] = 0;
    }
    DAT_0064c6b4[param_1 * 0x594] = (0xa - (DAT_0064c6b3[param_1 * 0x594] + ((iVar4) & 0xFF)));
  }
  local_c = 0;
  iVar4 = FUN_004bd9f0(param_1, 0x15);
  if ((DAT_0064c6b5[u8(DAT_00655c20) * 0x594] === 4)) {
    local_c = (((s16((DAT_0064c6bc + u8(DAT_00655c20) * 0x594), 0)) << 16 >> 16) + 1);
  }
  w16((DAT_0064ca80 + param_1 * 0x594), 0, (((u8(DAT_0064c7a6[u8(DAT_00655c20) * 0x594]) + u8(DAT_0064c7a7[u8(DAT_00655c20) * 0x594])) + s16((DAT_0064c6bc + u8(DAT_00655c20) * 0x594), 0)) * (s16((DAT_0064c6bc + u8(DAT_00655c20) * 0x594), 0) + ((local_c) & 0xFFFF)) + s16((DAT_0064ca80 + param_1 * 0x594), 0)));
  if ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) < s32((DAT_0064c6a2 + u8(DAT_00655c20) * 0x594), 0))) {
    w16((DAT_0064ca80 + param_1 * 0x594), 0, (s16((DAT_0064ca80 + param_1 * 0x594), 0) + 0xa));
  }
  if ((DAT_0064c6b0[param_1 * 0x594] < DAT_0064c6b0[u8(DAT_00655c20) * 0x594])) {
    w16((DAT_0064ca80 + param_1 * 0x594), 0, 0);
    w16((DAT_0064ca7e + param_1 * 0x594), 0, 0);
  }
  if ((0xff < DAT_006554f8[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30])) {
    if ((DAT_006554fa[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30] < 0)) {
      w16((DAT_0064ca80 + param_1 * 0x594), 0, ((((((s16((DAT_0064ca80 + param_1 * 0x594), 0)) << 16 >> 16) * 3 + ((((s16((DAT_0064ca80 + param_1 * 0x594), 0)) << 16 >> 16) * 3 >> 0x1f) & 3)) >> 2)) & 0xFFFF));
      w16((DAT_0064ca7e + param_1 * 0x594), 0, ((((((s16((DAT_0064ca7e + param_1 * 0x594), 0)) << 16 >> 16) * 3 + ((((s16((DAT_0064ca7e + param_1 * 0x594), 0)) << 16 >> 16) * 3 >> 0x1f) & 3)) >> 2)) & 0xFFFF));
    }
    if ((local_c === 0)) {
      iVar4 = (s8(DAT_006554f8[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]) * 2 - s8(DAT_006554fa[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30]));
      if ((DAT_0064c6b0[u8(DAT_00655c20) * 0x594] <= DAT_0064c6b0[param_1 * 0x594])) {
        if (((u8(DAT_0064c6b0[param_1 * 0x594]) + iVar4 * 4) < u8(DAT_0064c6b0[u8(DAT_00655c20) * 0x594]))) {
          if ((u8(DAT_0064c6b0[u8(DAT_00655c20) * 0x594]) <= (u8(DAT_0064c6b0[param_1 * 0x594]) + iVar4 * 8))) {
            w16((DAT_0064ca80 + param_1 * 0x594), 0, (s16((DAT_0064ca80 + param_1 * 0x594), 0) / 2 | 0));
            w16((DAT_0064ca7e + param_1 * 0x594), 0, (s16((DAT_0064ca7e + param_1 * 0x594), 0) / 2 | 0));
          }
        }
        else {
          w16((DAT_0064ca80 + param_1 * 0x594), 0, 0);
          w16((DAT_0064ca7e + param_1 * 0x594), 0, 0);
        }
      }
    }
  }
  iVar4 = FUN_004a7577(param_1);
  if ((3 < DAT_00655b08)) {
    w16((DAT_0064ca80 + param_1 * 0x594), 0, (s16((DAT_0064ca80 + param_1 * 0x594), 0) / 2 | 0));
    w16((DAT_0064ca7e + param_1 * 0x594), 0, (s16((DAT_0064ca7e + param_1 * 0x594), 0) / 2 | 0));
  }
  if ((0xff < DAT_006554f8[((s16((DAT_0064c6a6 + param_1 * 0x594), 0)) << 16 >> 16) * 0x30])) {
    w16((DAT_0064ca7e + param_1 * 0x594), 0, 0);
  }
  (local_14 < 0x1c) (local_14 = 0; local_14 = (local_14 < 0x1c); local_14 = (local_14 + 1)) {
    DAT_0063f580[(param_1 * 0x1c + local_14)] = 0;
  }
  return;
}


 export function FUN_00488937 (param_1)

 {
  let uVar1;
  let local_54;

  if ((DAT_006d1da0 === param_1)) {
    FUN_00473d5e(0);
    FUN_0040bbb0();
    uVar1 = FUN_00493b10(param_1);
    FUN_0040bbe0(uVar1);
    DAT_00679642 = 0;
    FUN_004d007e(DAT_00679640);
    FUN_0040bbe0(DAT_0062c608);
    FUN_0040bc10(0x5c);
    FUN_005f22d0(DAT_ffffffac, DAT_00679640);
    FUN_0043c840(DAT_ffffffac, DAT_0062c60c);
    FUN_0040bbe0(DAT_0062c610);
    FUN_0040bbe0(DAT_0066c4e9);
    FUN_0043c840(DAT_ffffffac, DAT_0062c614);
    FUN_0043c840(DAT_ffffffac, DAT_0066c4e9);
    if (((DAT_00655af8 & 4) === 0)) {
      FID_conflict:_remove(DAT_ffffffac);
      FID_conflict:__wrename(DAT_00679640, DAT_ffffffac);
    }
    FUN_004741be(DAT_00679640, 0);
  }
  return;
}


 export function FUN_00488a45 (param_1, param_2, param_3, param_4, param_5)

 {
  let bVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let local_20;
  let local_18;
  let local_10;

  local_10 = param_2;
  local_18 = param_3;
  iVar3 = FUN_005b8aa8(param_2, param_3);
  iVar4 = FUN_005b8aa8(param_4, param_5);
  local_20 = 0;
  bVar2 = 1;
  if ((iVar4 === iVar3)) {
    iVar3 = FUN_005ae1b0(param_4, param_5, param_2, param_3);
    if ((iVar3 < 0x17)) {
      DAT_0062d040 = 1;
      DAT_0062d044 = -1;
      DAT_00673fa0 = param_4;
      DAT_00673fa4 = param_5;
      DAT_0062d03c = 2;
      DAT_0062d048 = 1;
      bVar1 = 1;
      while ((local_18 === param_5)) {
        iVar3 = FUN_004abfe5(local_10, local_18, 0x63);
        if ((iVar3 === 8)) {
          bVar1 = 0;
          goto LAB_00488ca7;
        }
        if (((uVar6 & 0x10) === 0)) {
          bVar2 = 0;
        }
        local_20 = (local_20 + 1);
        if ((0x32 < local_20)) {
        uVar5 = 0;
      }
      else if (bVar2) {
        uVar5 = 2;
      }
      else {
        uVar5 = 1;
      }
    }
    else {
      uVar5 = 0;
    }
  }
  else {
    uVar5 = 0;
  }
  return uVar5;
}


 export function FUN_00488cef (param_1)

 {
  let cVar1;
  let uVar2;
  let bVar3;
  let uVar4;
  let bVar5;
  let uVar6;
  let iVar7;
  let iVar8;
  let uVar9;
  let local_1c;
  let local_18;
  let local_8;

  (local_1c < ((DAT_00655b16) << 16 >> 16)) (local_1c = 0; local_1c = (local_1c < ((DAT_00655b16) << 16 >> 16)); local_1c = (local_1c + 1)) {
    if ((2 < DAT_00655b02)) {
      FUN_0047e94e(1, 0);
    }
    if ((s8(DAT_006560f7[local_1c * 0x20]) === param_1)) {
      uVar2 = s16((DAT_006560f4 + local_1c * 0x20), 0);
      w16((DAT_006560f4 + local_1c * 0x20), 0, (s16((DAT_006560f4 + local_1c * 0x20), 0) & 0xffaf));
      if (((uVar2 & 0x40) === 0)) {
        if ((DAT_006560fa[local_1c * 0x20] !== 0)) {
          local_8 = 1;
          uVar9 = FUN_005b8a81(((s16((DAT_006560f0 + local_1c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_1c * 0x20), 0)) << 16 >> 16), -1);
          iVar7 = FUN_0043d07a(((s16((DAT_006560f0 + local_1c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_1c * 0x20), 0)) << 16 >> 16), param_1, uVar9)
          ;
          if ((-1 < iVar7)) {
            DAT_0063f660 = FUN_005ae1b0(((s16((DAT_006560f0 + local_1c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_1c * 0x20), 0)) << 16 >> 16), ((s16((DAT_0064f340 + iVar7 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + iVar7 * 0x58), 0)) << 16 >> 16));
          }
          bVar5 = FUN_005b94d5(((s16((DAT_006560f0 + local_1c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_1c * 0x20), 0)) << 16 >> 16));
          if (((bVar5 & 0x42) === 0x40)) {
            local_8 = 2;
          }
          bVar3 = 0;
          uVar6 = local_8;
          if ((DAT_0064b1c1[u8(DAT_006560f6[local_1c * 0x20]) * 0x14] === 0)) {
            iVar8 = FUN_0043d20a(iVar7, 2);
            uVar6 = (local_8 + 1);
            if ((iVar8 !== 0)) {
              uVar6 = (local_8 + 2);
            }
          }
          local_8 = uVar6;
          if ((DAT_0063f660 === 0)) {
            cVar1 = DAT_0064b1c1[u8(DAT_006560f6[local_1c * 0x20]) * 0x14];
            if ((cVar1 === 0)) {
              local_18 = 2;
            }
            else if ((cVar1 === 1)) {
              local_18 = 0x20;
            }
            else if ((cVar1 === 2)) {
              local_18 = 0x22;
            }
            iVar7 = FUN_0043d20a(iVar7, local_18);
            if ((DAT_0063f660 === 0)) {
              bVar3 = 1;
              local_8 = (local_8 << 1);
            }
          }
          if ((DAT_0063f660 === 0)) {
            local_8 = (local_8 << 1);
          }
          iVar7 = FUN_005b29aa(local_1c);
          local_8 = (iVar7 / 0xa | 0) * local_8;
          if ((DAT_0063f660 === 0)) {
            local_8 = u8(DAT_006560fa[local_1c * 0x20]);
          }
          if ((0 < iVar7)) {
            local_8 = u8(DAT_006560fa[local_1c * 0x20]);
          }
          uVar6 = u8(DAT_006560fa[local_1c * 0x20]);
          if ((local_8 <= u8(DAT_006560fa[local_1c * 0x20]))) {
            uVar6 = local_8;
          }
          DAT_006560fa[local_1c * 0x20] = (DAT_006560fa[local_1c * 0x20] - ((uVar6) & 0xFF));
          if ((iVar7 === 0)) {
            DAT_006560ff[local_1c * 0x20] = 0xff;
          }
          if ((s8(DAT_006560f7[local_1c * 0x20]) === (DAT_006d1da0 & 0xff))) {
            FUN_0047cea6(((s16((DAT_006560f0 + local_1c * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_1c * 0x20), 0)) << 16 >> 16));
          }
        }
      }
      else if (((uVar6 & 2) === 0)) {
        iVar7 = FUN_005b29aa(local_1c);
        iVar8 = FUN_005b29aa(local_1c);
        uVar4 = FUN_005adfa0((u8(DAT_006560fa[local_1c * 0x20]) + (iVar7 / 0xa | 0)), 0, (iVar8 + -1));
        DAT_006560fa[local_1c * 0x20] = uVar4;
      }
    }
  }
  return;
}


 export function FUN_00489292 (param_1, param_2)

 {
  let sVar1;
  let iVar2;
  let uVar3;
  let local_8;

  local_8 = -1;
  iVar2 = FUN_0043cce5(param_1);
  sVar1 = s16((DAT_0064c712 + param_1 * 0x594), 0);
  if ((iVar2 < 0x64)) {
    if ((((s16((DAT_0064c712 + param_1 * 0x594), 0)) << 16 >> 16) * 0xa < iVar2)) {
      local_8 = (iVar2 / 0xa | 0) * 0xa;
      w16((DAT_0064c712 + param_1 * 0x594), 0, (((iVar2 / 0xa | 0)) & 0xFFFF));
    }
  }
  else if (((((s16((DAT_0064c712 + param_1 * 0x594), 0)) << 16 >> 16) + -9) * 0x64 < iVar2)) {
    local_8 = (iVar2 / 0x64 | 0) * 0x64;
    w16((DAT_0064c712 + param_1 * 0x594), 0, ((((iVar2 / 0x64 | 0)) & 0xFFFF) + 9));
  }
  if ((DAT_00654fa8 === 0)) {
    uVar3 = FUN_00410070(param_1);
    FUN_0040ff60(1, uVar3);
    FUN_0040bbb0();
    FUN_0043ca50(param_1, local_8);
    FUN_0040ff60(2, DAT_00679640);
    FUN_00410030(s_FERTILE_0062c618, (DAT_00643798 + param_1 * 0x3c), 0);
  }
  if ((iVar2 !== 0)) {
    FUN_0040ddc6(param_1);
  }
  return;
}


 export function FUN_00489553 (param_1)

 {
  let uVar1;
  let iVar2;
  let local_10;
  let local_c;

  local_c = 0;
  DAT_0062c5b8 = 1;
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    iVar2 = FUN_004a75a6(param_1);
    if ((iVar2 !== 0)) {
      (local_10 < 6) (local_10 = 0; local_10 = (local_10 < 6); local_10 = (local_10 + 1)) {
        local_c = (local_c + ((s16((DAT_0064caa8 + (local_10 * 2 + param_1 * 0x594)), 0)) << 16 >> 16));
      }
    }
  }
  FUN_004d01ae(param_1);
  FUN_0042a768();
  if ((0x7530 < s32((DAT_0064c6a2 + param_1 * 0x594), 0))) {
    w32((DAT_0064c6a2 + param_1 * 0x594), 0, 0x7530);
  }
  if ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) < -0x4000)) {
    w32((DAT_0064c6a2 + param_1 * 0x594), 0, 0x7530);
  }
  if ((s32((DAT_0064c6a2 + param_1 * 0x594), 0) < 0)) {
    w32((DAT_0064c6a2 + param_1 * 0x594), 0, 0);
  }
  uVar1 = s32((DAT_0064c6a2 + param_1 * 0x594), 0);
  FUN_00488cef(param_1);
  FUN_00487a41(param_1);
  FUN_00560084(param_1);
  FUN_0053184d(param_1);
  FUN_00489292(param_1, uVar1);
  if ((((1 << (((param_1) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    iVar2 = FUN_004a75a6(param_1);
    if ((iVar2 !== 0)) {
      (local_10 < 6) (local_10 = 0; local_10 = (local_10 < 6); local_10 = (local_10 + 1)) {
        local_c = (local_c - ((s16((DAT_0064caa8 + (local_10 * 2 + param_1 * 0x594)), 0)) << 16 >> 16));
      }
    }
  }
  if ((local_c !== 0)) {
    iVar2 = FUN_004d0339(param_1);
    if ((iVar2 === 0)) {
      FUN_0059772c(param_1, (u8(DAT_00655b0b) & (1 << (((param_1) & 0xFF) & 0x1f))));
    }
  }
  DAT_0062c5b8 = 0;
  if (((None & 0x20) !== 0)) {
    __chdir(DAT_0064bb08);
    FUN_00488937(param_1);
    __chdir(DAT_00655020);
  }
  return;
}


 export function FUN_004897fa (param_1)

 {
  if ((param_1 !== 0)) {
    DAT_006d1da8 = 0;
    DAT_00628054 = 1;
    DAT_0062805c = 1;
    DAT_0062804c = 0;
    FUN_0056a65e(1);
    FUN_0041033a();
    FUN_004e4ceb();
  }
  return;
}


 export function FUN_00489859 (param_1)

 {
  let iVar1;
  let local_c;

  if ((DAT_0062c5bc === 0)) {
    local_c = ((DAT_00655afe) << 16 >> 16);
  }
  else {
    local_c = -1;
  }
  iVar1 = FUN_005b6512(local_c, param_1);
  DAT_0062c5bc = 0;
  DAT_00655afe = ((iVar1) & 0xFFFF);
  if ((s32((DAT_0065610a + iVar1 * 0x20), 0) !== 0)) {
    if ((0xa < DAT_006560ff[iVar1 * 0x20])) {
      DAT_006560fe[iVar1 * 0x20] = 0;
      DAT_0064b1b4 = s16((DAT_006560f0 + iVar1 * 0x20), 0);
      DAT_0064b1b0 = s16((DAT_006560f2 + iVar1 * 0x20), 0);
      FUN_0056a65e(1);
      FUN_004105f8(((s16((DAT_006560f0 + iVar1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar1 * 0x20), 0)) << 16 >> 16), s8(DAT_006560f7[iVar1 * 0x20]));
      FUN_004e4ceb();
    }
    if ((DAT_006560f8[iVar1 * 0x20] === 0)) {
      FUN_004274a6(iVar1, 1);
    }
    if ((DAT_006ad684 === 0)) {
      FUN_00421bd0();
    }
  }
  if ((s32((DAT_0065610a + iVar1 * 0x20), 0) === 0)) {
    FUN_004897fa(0);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_00489a0d (param_1)

 {
  let iVar1;
  let iVar2;
  let bVar3;

  bVar3 = (DAT_006d1da8 !== 1);
  if (bVar3) {
    DAT_00628054 = 0;
    DAT_0062805c = 1;
    FUN_0041033a();
    DAT_006d1da8 = 1;
    DAT_0062804c = 0;
  }
  iVar1 = FUN_005b633f(((DAT_00655afe) << 16 >> 16));
  if ((iVar1 === 0)) {
    FUN_00489859(param_1);
  }
  bVar3 = ((!(iVar1 === 0)) && bVar3);
  iVar1 = ((DAT_00655afe) << 16 >> 16);
  if ((None === DAT_006d1da0)) {
    if (bVar3) {
      FUN_0056a65e(1);
    }
    DAT_0064b1b4 = s16((DAT_006560f0 + iVar1 * 0x20), 0);
    DAT_0064b1b0 = s16((DAT_006560f2 + iVar1 * 0x20), 0);
    if (bVar3) {
      FUN_004105f8(((s16((DAT_006560f0 + iVar1 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar1 * 0x20), 0)) << 16 >> 16), s8(DAT_006560f7[iVar1 * 0x20]));
    }
    FUN_004e4ceb();
    DAT_00673b04 = 1;
    return;
  }
  DAT_0062804c = 0;
  FUN_004897fa(0);
  return;
}


 export function FUN_00489b9b (param_1, param_2)

 {
  if ((((DAT_0066ca8a) << 16 >> 16) !== param_2)) {
    FUN_00410402(param_1, param_2);
  }
  return;
}


 export function FUN_00489be2 (param_1)

 {
  let cVar1;
  let cVar2;
  let bVar3;
  let bVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let iVar8;
  let uVar9;
  let iVar10;
  let uVar11;
  let pbVar12;
  let uVar13;
  let local_10;

  if ((DAT_0062c5c0 === 0)) {
    iVar5 = ((s16((DAT_006560f0 + param_1 * 0x20), 0)) << 16 >> 16);
    iVar6 = ((s16((DAT_006560f2 + param_1 * 0x20), 0)) << 16 >> 16);
    iVar7 = s8(DAT_006560f7[param_1 * 0x20]);
    bVar4 = FUN_005b89bb(iVar5, iVar6);
    uVar13 = u8(bVar4);
    cVar1 = DAT_00627cca[uVar13 * 0x18];
    cVar2 = DAT_00627ccb[uVar13 * 0x18];
    iVar8 = FUN_005b8c42(iVar5, iVar6);
    bVar3 = ((9 < iVar8) && (1 < (s8(cVar1) + s8(cVar2))));
    (local_10 < 8) (local_10 = 0; local_10 = (local_10 < 8); local_10 = (local_10 + 1)) {
      uVar9 = FUN_005ae052((s8(DAT_00628350[local_10]) + iVar5));
      cVar1 = DAT_00628360[local_10];
      iVar10 = FUN_004087c0(uVar9, (s8(cVar1) + iVar6));
      if ((iVar8 < iVar10)) {
        bVar3 = 0;
      }
    }
    if (bVar3) {
      FUN_00489b9b(iVar5, iVar6);
      FUN_00490530(PTR_s_TUTORIAL_00627678, s_BUILDCITY_0062c628, param_1);
      DAT_0062c5c0 = 1;
    }
    else if ((5 < s16((DAT_0064c708 + iVar7 * 0x594), 0))) {
      iVar8 = FUN_0043d07a(iVar5, iVar6, iVar7, -1, -1);
      if ((iVar10 !== 0)) {
        FUN_0040ff60(0, (DAT_0064f360 + iVar8 * 0x58));
        uVar11 = FUN_005b94d5(iVar5, iVar6);
        if (((uVar11 & 0xc) === 0)) {
          FUN_00489b9b(iVar5, iVar6);
          FUN_00490530(PTR_s_TUTORIAL_00627678, s_MINING_0062c63c, param_1);
          DAT_0062c5c0 = 1;
        }
        if ((iVar8 !== 0)) {
          FUN_00489b9b(iVar5, iVar6);
          FUN_00490530(PTR_s_TUTORIAL_00627678, s_IRRIGATE_0062c644, param_1);
          DAT_0062c5c0 = 1;
        }
        else if (((_MEM[pbVar12] & 0x80) === 0)) {
          FUN_00489b9b(iVar5, iVar6);
          FUN_00490530(PTR_s_TUTORIAL_00627678, DAT_0062c650, param_1);
          DAT_0062c5c0 = 1;
        }
      }
    }
    else {
      FUN_00490530(PTR_s_TUTORIAL_00627678, s_EXPAND1_0062c634, param_1);
      w16((DAT_0064c6ae + iVar7 * 0x594), 0, DAT_00655af8);
      DAT_0062c5c0 = 1;
    }
  }
  return;
}


 export function FUN_0048a004 ()

 {
  let bVar1;
  let bVar2;
  let sVar3;
  let iVar4;
  let iVar5;
  let bVar6;
  let local_1c;
  let local_14;

  sVar3 = DAT_00655b16;
  local_14 = 0;
  bVar2 = 0;
  bVar1 = 0;
  DAT_0062804c = 1;
  iVar4 = ((DAT_00655afe) << 16 >> 16);
  if ((DAT_006560ff[iVar4 * 0x20] === 0xff)) {
    if ((iVar5 !== 0)) {
      FUN_00489be2(((DAT_00655afe) << 16 >> 16));
    }
    else if ((4 < DAT_006560fa[iVar4 * 0x20])) {
      bVar6 = 0;
      iVar5 = FUN_005b29aa(iVar4);
      if ((u8(DAT_006560fa[iVar4 * 0x20]) < (iVar5 / 3 | 0))) {
        if (((DAT_00655af4 & 0x80) === 0)) {
          DAT_00655af4 = (DAT_00655af4 | 0x80);
          bVar6 = 1;
        }
      }
      else {
        bVar6 = ((DAT_00655af4 & 0x40) === 0);
        if (bVar6) {
          DAT_00655af4 = (DAT_00655af4 | 0xc0);
        }
      }
      if ((DAT_00654fa8 === 0)) {
        FUN_00490530(PTR_s_TUTORIAL_00627678, s_DAMAGE_0062c658, iVar4);
      }
    }
  }
  iVar4 = ((DAT_00655afe) << 16 >> 16);
  local_1c = 0;
  while ((((1 << (None & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
    if ((2 < DAT_00655b02)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      FUN_0047e94e(1, 0);
    }
    if ((DAT_00634c9c === 2)) {
      DAT_0062804c = 1;
      DAT_00634c9c = 0;
      bVar1 = 1;
    }
    if ((DAT_006560ff[((DAT_00655afe) << 16 >> 16) * 0x20] !== 0xb)) {
      DAT_0062804c = 0;
      bVar1 = 0;
    }
    bVar2 = 1;
    FUN_0046e6c8();
    if (((((s16((DAT_006560f4 + iVar4 * 0x20), 0)) << 16 >> 16) & 0x8000) === 0)) {
      iVar5 = FUN_004c5408(iVar4);
      if ((iVar5 === 0)) {
        local_14 = 1;
        FUN_0040ef50();
      }
    }
    else {
      FUN_00543b80();
      local_1c = (local_1c + 1);
      if ((0x14 < local_1c)) {
        FUN_005b6787(iVar4);
      }
    }
  }
  FUN_0041033a();
  DAT_0062804c = 0;
  if ((!bVar2)) {
    DAT_00655afe = 0xffff;
  }
  return local_14;
}


 export function FUN_0048a374 ()

 {
  let sVar1;

  sVar1 = DAT_00655b16;
  DAT_0062804c = 1;
  while ((DAT_00655b16 === sVar1)) {
    FUN_0046e6c8();
    FUN_0040ef50();
    if ((2 < DAT_00655b02)) {
      FUN_0047e94e(1, 0);
    }
  }
  DAT_0062804c = 0;
  return;
}


 export function FUN_0048a416 ()

 {
  let sVar1;
  let iVar2;
  let uVar3;
  let local_18;
  let local_14;
  let local_c;

  local_c = 0;
  sVar1 = 0xffff;
  DAT_00655afe = 0xffff;
  FUN_00489a0d(0);
  DAT_0064b9bc = 1;
  DAT_0062c5c0 = 0;
  if ((DAT_006ad2f7 === 0)) {
    (local_18 < 8) (local_18 = 0; local_18 = (local_18 < 8); local_18 = (local_18 + 1)) {
      if (((u8(DAT_00655b0b) & (1 << (DAT_0062c468[local_18 * 4] & 0x1f))) === 0)) {
        FUN_00460129(s32((DAT_00673ad8 + local_18 * 4), 0), s32((DAT_00673ab8 + local_18 * 4), 0), s32((DAT_00673a78 + local_18 * 4), 0), s32((DAT_00673a98 + local_18 * 4), 0), 0);
      }
    }
  }
  do {
    if ((2 < DAT_00655b02)) {
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
      FUN_0047e94e(1, 0);
    }
    if ((DAT_006d1da8 === 1)) {
      FUN_005b633f(((DAT_00655afe) << 16 >> 16));
      if ((DAT_00655b16 !== sVar1)) {
        FUN_00489859(0);
      }
      else if ((DAT_00673b04 === 0)) {
        iVar2 = ((DAT_00655afe) << 16 >> 16);
        DAT_0064b1b4 = s16((DAT_006560f0 + iVar2 * 0x20), 0);
        DAT_0064b1b0 = s16((DAT_006560f2 + iVar2 * 0x20), 0);
        if ((DAT_006560ff[iVar2 * 0x20] !== 0xb)) {
          FUN_0056a65e(1);
          FUN_004105f8(((s16((DAT_006560f0 + iVar2 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + iVar2 * 0x20), 0)) << 16 >> 16), s8(DAT_006560f7[iVar2 * 0x20]));
          FUN_004e4ceb();
        }
      }
    }
    if ((0 < DAT_00633a78)) {
      FUN_005d225b(s_Primary.cpp_-_human_turn()_-_Tim_0062c660);
      FUN_0055b046(0);
    }
    sVar1 = DAT_00655b16;
    DAT_00634c9c = 0;
    DAT_00673b04 = 0;
    if ((DAT_00655afe < 0)) {
      DAT_00655aee = (DAT_00655aee | 1);
      if ((DAT_006d1da8 === 1)) {
        FUN_0046e020(0x64, 1, 0, 0);
      }
      FUN_004897fa(1);
      if (((DAT_00655aee & 2) !== 0)) {
 LAB_0048a77d: :
      DAT_0062804c = 1;
      if ((DAT_00655afe < 0)) {
        DAT_00655aee = (DAT_00655aee & 0xfffd);
        FUN_0048a374();
      }
      else {
        DAT_00655aee = (DAT_00655aee & 0xfffc);
        uVar3 = FUN_0048a004();
        local_c = (local_c | uVar3);
      }
      iVar2 = IsTracking(DAT_006a91b8);
      if ((iVar2 === -1)) {
        DAT_00655aee = (DAT_00655aee & 0xfffd);
      }
      if ((DAT_00628044 === 0)) {
        return;
      }
      if (((DAT_00655aee & 2) !== 0)) {
        local_c = 0;
      }
      if ((DAT_00628054 !== 0)) {
        FUN_0041033a();
      }
      DAT_0062804c = 0;
    }
    if ((((1 << (((DAT_006d1da0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
      if ((s8(DAT_0064f348[iVar2 * 0x58]) !== DAT_006d1da0)) {
        FUN_0050994f();
      }
      FUN_00421bd0();
      DAT_0064b9bc = 0;
      if ((DAT_00655b02 !== 0)) {
        (local_14 < ((DAT_00655b16) << 16 >> 16)) (local_14 = 0; local_14 = (local_14 < ((DAT_00655b16) << 16 >> 16)); local_14 = (local_14 + 1)) {
          if ((DAT_006560f7[local_14 * 0x20] === DAT_00655b05)) {
            FUN_005b6787(local_14);
          }
        }
      }
      return;
    }
  } while ( true );
}


 export function FUN_0048a92d ()

 {
  let bVar1;
  let local_c;
  let local_8;

  (local_8 < 4) (local_8 = 0; local_8 = (local_8 < 4); local_8 = (local_8 + 1)) {
    DAT_00673afc[local_8] = 0;
    DAT_00673af8[local_8] = 0x63;
    (local_c < 8) (local_c = 1; local_c = (local_c < 8); local_c = (local_c + 1)) {
      if ((((1 << (((local_c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        bVar1 = DAT_0064c6b7[(local_c * 0x594 + local_8)];
        if ((DAT_0064c6b7[(local_c * 0x594 + local_8)] <= DAT_00673afc[local_8])) {
          bVar1 = DAT_00673afc[local_8];
        }
        DAT_00673afc[local_8] = bVar1;
        bVar1 = DAT_0064c6b7[(local_c * 0x594 + local_8)];
        if ((DAT_00673af8[local_8] <= DAT_0064c6b7[(local_c * 0x594 + local_8)])) {
          bVar1 = DAT_00673af8[local_8];
        }
        DAT_00673af8[local_8] = bVar1;
      }
    }
  }
  return;
}


 export function FUN_0048aa24 ()

 {
  let uVar1;
  let iVar2;
  let uVar3;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = -1;
  uVar1 = ((DAT_00655af8) << 16 >> 16);
  if (((DAT_00655aea+2 & 0x10) !== 0)) {
    local_c = -1;
    (local_14 < ((DAT_00655b18) << 16 >> 16)) (local_14 = 0; local_14 = (local_14 < ((DAT_00655b18) << 16 >> 16)); local_14 = (local_14 + 1)) {
      if ((s8(DAT_0064f348[local_14 * 0x58]) === DAT_006d1da0)) {
        local_8 = s8(DAT_0064f349[local_14 * 0x58]);
        iVar2 = FUN_0043d20a(local_14, 1);
        if ((iVar2 !== 0)) {
          local_8 = (local_8 << 1);
        }
        if (((local_8 === 1) || ((local_8 + -1) < 0))) {
          local_8 = 0;
        }
        else {
          iVar2 = _rand();
          local_8 = (iVar2 % local_8);
        }
        if ((local_c < local_8)) {
          local_c = local_8;
          local_10 = local_14;
        }
      }
    }
    uVar3 = FUN_00493c7d(DAT_006d1da0);
    FUN_0040ff60(0, uVar3);
    FUN_0040bbb0();
    FUN_00421f10(((DAT_00655afa) << 16 >> 16));
    FUN_0040ff60(2, DAT_00679640);
    FUN_0040bbb0();
    if ((local_10 < 0)) {
      FUN_0040bc10(0xe);
    }
    else {
      FUN_0040bbe0((DAT_0064f360 + local_10 * 0x58));
      FUN_00410402(((s16((DAT_0064f340 + local_10 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_10 * 0x58), 0)) << 16 >> 16));
    }
    FUN_0040ff60(1, DAT_00679640);
    uVar1 = FUN_00410030(s_COUNCILTIME_0062c6a4, DAT_0063fc58, 0);
    if ((uVar1 === 0)) {
      uVar1 = FUN_00516570(DAT_006d1da0, 0);
    }
  }
  if (((None & 1) !== 0)) {
    if ((DAT_00655af8 === 1)) {
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_FIRSTMOVE_0062c6b0, DAT_00643af8, 0);
    }
    if ((DAT_00655af8 === 0x3c)) {
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_HELP1_0062c6bc, DAT_00643af8, 0);
    }
    if ((DAT_00655af8 === 0x50)) {
      FUN_004904c0(PTR_s_TUTORIAL_00627678, s_HELP2_0062c6c4, DAT_00643af8, 0);
    }
    if ((DAT_0064c7f4[DAT_006d1da0 * 0x594] === 0)) {
      uVar1 = FUN_0043d07a((((DAT_006d1160) << 16 >> 16) / 2 | 0), (((DAT_006d1162) << 16 >> 16) / 2 | 0), DAT_006d1da0, -1, -1);
      if ((-1 < uVar1)) {
        FUN_0040ff60(0, (DAT_0064f360 + uVar1 * 0x58));
        FUN_00490500(PTR_s_TUTORIAL_00627678, s_ONECITY_0062c6cc, uVar1);
        uVar1 = (((DAT_00655af8) << 16 >> 16) - 0x19);
        w16((DAT_0064c6ae + DAT_006d1da0 * 0x594), 0, ((uVar1) & 0xFFFF));
      }
    }
    else {
      uVar1 = (((DAT_00655af8) << 16 >> 16) - ((s16((DAT_0064c6ae + DAT_006d1da0 * 0x594), 0)) << 16 >> 16));
      if ((DAT_0064c778[DAT_006d1da0 * 0x594] === 0)) {
        FUN_004904c0(PTR_s_TUTORIAL_00627678, s_EXPAND0_0062c6d4, DAT_00643af8, 0);
        uVar1 = ((DAT_00655af8) & 0xFFFF);
        w16((DAT_0064c6ae + DAT_006d1da0 * 0x594), 0, DAT_00655af8);
      }
    }
  }
  return uVar1;
}


 export function FUN_0048aedc ()

 {
  let uVar1;
  let local_8;

  local_8 = 0;
  if ((DAT_0064b1ac === 0)) {
    uVar1 = FUN_00493ba6(DAT_006d1da0);
    FUN_0040ff60(0, uVar1);
    uVar1 = FUN_00493b10(DAT_006d1da0);
    FUN_0040ff60(1, uVar1);
    if ((DAT_0064bcb8 === 0)) {
      if ((DAT_00655afa === 0x7d0)) {
        if ((2 < DAT_00655b02)) {
          FUN_00511880(9, 0xff, 0, 0, 0, 0);
        }
        FUN_00410030(s_PLANRETIRE_0062c6f8, DAT_00643af8, 0);
      }
      else if ((DAT_00655afa === 0x7e4)) {
        if ((2 < DAT_00655b02)) {
          FUN_00511880(0xa, 0xff, 0, 0, 0, 0);
        }
        FUN_00410030(s_DORETIRE_0062c704, DAT_00643af8, 0);
        DAT_00655af0 = (DAT_00655af0 | 2);
        DAT_0064b1ac = 5;
        if ((2 < DAT_00655b02)) {
          FUN_0046b14d(0x6b, 0xff, (DAT_00655af0 | 2), 5, 0, 0, 0, 0, 0, 0);
        }
        local_8 = 1;
      }
    }
    else if (((((DAT_0064bcb8) << 16 >> 16) + -5) === ((DAT_00655af8) << 16 >> 16))) {
      if ((2 < DAT_00655b02)) {
        FUN_00511880(7, 0xff, 0, 0, 0, 0);
      }
      FUN_00410030(s_SCENARIOENDS_0062c6dc, DAT_00643af8, 0);
    }
    else if ((DAT_0064bcb8 === DAT_00655af8)) {
      if ((2 < DAT_00655b02)) {
        FUN_00511880(8, 0xff, 0, 0, 0, 0);
      }
      FUN_00410030(s_SCENARIOEND_0062c6ec, DAT_00643af8, 0);
      DAT_00655af0 = (DAT_00655af0 | 2);
      DAT_0064b1ac = 5;
      if ((2 < DAT_00655b02)) {
        FUN_0046b14d(0x6b, 0xff, (DAT_00655af0 | 2), 5, 0, 0, 0, 0, 0, 0);
      }
      local_8 = 1;
    }
  }
  return local_8;
}


 export function FUN_0048b165 ()

 {
  let iVar1;
  let bVar2;

  bVar2 = 0;
  /* switch */ () {
  case 1 :
  case 2 :
    if ((DAT_006d1da0 === DAT_0062c5b4)) {
      FUN_004710d0(DAT_006d1da0);
    }
    else {
      FUN_004710d0((-DAT_0062c5b4));
    }
    break;
  case 3 :
    FUN_00514e7b(DAT_006d1da0);
    break;
  case 4 :
    FUN_004702e0(DAT_006d1da0);
    break;
  case 5 :
  }
  FUN_00431d22();
  if (((DAT_00655af0 & 0x20) === 0)) {
    FUN_00435d15(DAT_006d1da0);
    FUN_004361cc(DAT_006d1da0);
    FUN_00436f5a(DAT_006d1da0);
  }
  if ((DAT_00655b02 === 0)) {
    if ((DAT_0064b1ac === 3)) {
      if ((DAT_0064b1ac === 4)) {
        bVar2 = 1;
      }
      else {
        iVar1 = FUN_00410030(s_KEEPPLAYING_0062c710, DAT_0063fc58, 0);
        bVar2 = (iVar1 === 0);
      }
      DAT_00655af0 = (DAT_00655af0 | 0x20);
    }
  }
  else {
    bVar2 = 1;
  }
  DAT_0064b1ac = 0;
  return bVar2;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048b340 ()

 {
  let bVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let unaff_FS_OFFSET;
  let local_330;
  let local_32c;
  let local_324;
  let local_318;
  let local_23c;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0048bf39;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_24 = 0;
  bVar1 = 0;
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_0042a768();
  FUN_0042a768();
  FUN_004e4ceb();
  if ((DAT_00655b02 === 1)) {
    DAT_006c31a9 = DAT_00655b0b;
  }
  while ((DAT_00655b0b === 0)) {
    bVar2 = 0;
    FUN_0048a92d();
    if ((DAT_00628048 === 0)) {
      FUN_00487371(-1);
    }
    iVar4 = FUN_0048aedc();
    if ((DAT_0064b1ac !== 0)) {
      local_20 = FUN_005ae006(DAT_00655b0b);
      local_18 = FUN_0048b165();
      if ((((~(1 << (((DAT_006d1da0) & 0xFF) & 0x1f))) & u8(DAT_00655b0b)) !== 0)) {
        DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((DAT_006d1da0) & 0xFF) & 0x1f))) & 0xFF)));
      }
      if ((local_20 < 2)) {
      FUN_004fba0c(((DAT_00655af8) << 16 >> 16));
      FUN_004fba9c(((DAT_00655af8) << 16 >> 16));
      FUN_004fbb2f(((DAT_00655af8) << 16 >> 16));
      FUN_004fbbdd();
    }
    (local_32c < 8) (local_32c = 0; (DAT_00628044 = (DAT_00628044 !== 0) && (local_32c = local_32c)); local_32c = (local_32c + 1)) {
      if ((((1 << (((local_32c) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        DAT_00655b05 = ((local_32c) & 0xFF);
        if ((DAT_00655b02 === 1)) {
          DAT_006c31a9 = DAT_00655b0b;
          _DAT_006ad578 = local_32c;
          local_24 = 1;
          FUN_0050994f();
          FUN_004503d0();
          FUN_004503d0();
          (local_1c < 8) (local_1c = 0; local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
            if ((s16((DAT_0066ca84 + local_1c * 0x3f0), 0) !== 0)) {
              FUN_004503d0();
            }
          }
        }
        if ((((1 << (((local_32c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          if ((DAT_00655b02 === 1)) {
            FUN_0040ffa0(s_HOTSEATAITURN_0062c750, 0x2000008);
            FUN_0040bc80(0);
          }
        }
        else {
          DAT_00655b03 = ((local_32c) & 0xFF);
          if ((DAT_00655b02 !== 0)) {
            FUN_00498a5c(local_32c);
          }
          if ((DAT_00655b02 === 1)) {
            uVar5 = FUN_00493b10(local_32c);
            FUN_0040ff60(0, uVar5);
            uVar5 = FUN_00493c7d(local_32c);
            FUN_0040ff60(1, uVar5);
            FUN_00410030(s_HOTSEATTURN_0062c72c, DAT_0063fc58, 0);
            w16((DAT_00654b40 + DAT_006d1da0 * 2), 0, DAT_0064b1b4);
            w16((DAT_00654b50 + DAT_006d1da0 * 2), 0, DAT_0064b1b0);
            if ((s16((DAT_00654b60 + local_32c * 2), 0) === 1)) {
              DAT_0064b1b4 = s16((DAT_00654b40 + local_32c * 2), 0);
              DAT_0064b1b0 = s16((DAT_00654b50 + local_32c * 2), 0);
              DAT_0066ca88 = s16((DAT_00654b40 + local_32c * 2), 0);
              DAT_0066ca8a = s16((DAT_00654b50 + local_32c * 2), 0);
            }
            else {
              FUN_0041b8ff(local_32c);
              (local_330 < ((DAT_00655b18) << 16 >> 16)) (local_330 = 0; local_330 = (local_330 < ((DAT_00655b18) << 16 >> 16)); local_330 = (local_330 + 1)) {
                if ((s8(DAT_0064f348[local_330 * 0x58]) === local_32c)) {
                  DAT_0064b1b4 = s16((DAT_0064f340 + local_330 * 0x58), 0);
                  DAT_0064b1b0 = s16((DAT_0064f342 + local_330 * 0x58), 0);
                  DAT_0066ca88 = s16((DAT_0064f340 + local_330 * 0x58), 0);
                  DAT_0066ca8a = s16((DAT_0064f342 + local_330 * 0x58), 0);
                  break;
                }
              }
              w16((DAT_00654b60 + local_32c * 2), 0, 1);
            }
          }
          uVar3 = DAT_006d1da0;
          DAT_006d1da0 = local_32c;
          if ((DAT_00655b02 === 2)) {
            if (bVar1) {
              FUN_0047758c(0);
              if ((DAT_00654da4[local_32c * 0x20] === 0)) {
                uVar5 = FUN_00493b10(local_32c);
                FUN_0040ff60(0, uVar5);
                FUN_00421ea0(s_EMAILDONE2_0062c744);
              }
              else {
                uVar5 = FUN_00493b10(local_32c);
                FUN_0040ff60(0, uVar5);
                FUN_0040ff60(1, (DAT_00654da4 + local_32c * 0x20));
                FUN_00421ea0(s_EMAILDONE1_0062c738);
              }
              DAT_00628044 = 0;
              goto LAB_0048bf12;
            }
            bVar1 = 1;
          }
          if ((DAT_00628048 !== 0)) {
            if ((DAT_00654b70 !== 0)) {
              DAT_00633a78 = (DAT_00654b70 / 0x3e8 | 0);
              _DAT_0066c990 = -1;
            }
            FUN_00413476();
            FUN_0047cf9e(local_32c, 1);
          }
          FUN_00569363(1);
          FUN_00568e86(local_32c);
          if ((local_24 !== 0)) {
            local_24 = 0;
            FUN_004085f0();
            FUN_004085f0();
            (local_1c < 8) (local_1c = 0; local_1c = (local_1c < 8); local_1c = (local_1c + 1)) {
              if ((s16((DAT_0066ca84 + local_1c * 0x3f0), 0) !== 0)) {
                FUN_004085f0();
              }
            }
          }
        }
        FUN_00568e86(local_32c);
        if ((((1 << (((local_32c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          DAT_00655b0b = 0;
          local_324 = ((DAT_006d1da0) & 0xFF);
          DAT_006d1da0 = -1;
        }
        if ((DAT_0062c488 !== 0)) {
          if ((DAT_0062c488 !== 0)) {
            FUN_00413476();
            FUN_0047cf9e(DAT_006d1da0, 1);
            FUN_00419b80();
          }
          local_14 = (s32((DAT_006af220 + DAT_006d1da0 * 4), 0) - s32((DAT_006af240 + DAT_006d1da0 * 4), 0));
          if ((DAT_00654fa8 === 0)) {
            DAT_00635a3c = LAB_00403c74;
            uVar5 = FUN_00493ba6(DAT_006d1da0);
            FUN_0040ff60(0, uVar5);
            uVar5 = FUN_00493b10(DAT_006d1da0);
            FUN_0040ff60(1, uVar5);
            if ((0 < local_14)) {
              w32((DAT_006af240 + DAT_006d1da0 * 4), 0, s32((DAT_006af220 + DAT_006d1da0 * 4), 0));
              FUN_00421da0(0, local_14);
              if ((local_14 === 1)) {
                FUN_0043ca10(DAT_006359d4, s_CASUALTY_0062c760);
              }
              else {
                FUN_0043ca10(DAT_006359d4, s_CASUALTIES_0062c76c);
              }
              FUN_0059ec88(DAT_0063fc58, 0, 0);
              local_318 = DAT_fffffce8;
              FUN_00421bd0();
              FUN_0046e020(0x30, 0, 0, 0);
              FUN_0040bc80(0);
              if ((local_23c !== 0)) {
                FUN_0043856b(DAT_006d1da0);
              }
            }
          }
          FUN_00489553(local_32c);
        }
        if ((((1 << (((local_32c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          if ((DAT_00655b02 === 1)) {
            FUN_0059db65();
            FUN_0059d5f5();
            DAT_006d1da0 = u8(local_324);
          }
        }
        else {
          if ((DAT_00655b02 === 1)) {
            DAT_00655b0b = (DAT_00655b0b & (((1 << (((local_32c) & 0xFF) & 0x1f))) & 0xFF));
          }
          FUN_0048aa24();
          if ((DAT_00654b70 !== 0)) {
            FUN_0055af2e(1);
            FUN_0048a416();
            FUN_0055ae80(1);
          }
          else {
            FUN_0048a416();
          }
          bVar2 = 1;
        }
        if ((DAT_00655b02 === 1)) {
          DAT_00655b0b = DAT_006c31a9;
        }
        DAT_00654fa4 = 0;
        DAT_00628048 = 0;
        DAT_00654fa6 = 0;
        DAT_0062c488 = 0;
        DAT_00655aee = (DAT_00655aee & 0xfffe);
        if ((DAT_00628044 === 0)) {
          local_20 = FUN_005ae006(DAT_00655b0b);
          local_18 = FUN_0048b165();
          if ((((~(1 << (((DAT_006d1da0) & 0xFF) & 0x1f))) & u8(DAT_00655b0b)) !== 0)) {
            DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((DAT_006d1da0) & 0xFF) & 0x1f))) & 0xFF)));
          }
          if ((local_20 < 2)) {
      DAT_00655b05 = ((DAT_006d1da0) & 0xFF);
      FUN_0048a416();
      if ((local_18 !== 0)) {
 LAB_0048bf12: :
      FUN_0055ae80(0);
      local_8 = -1;
      FUN_0048bf2d();
      FUN_0048bf43();
      return;
    }
  }
  FUN_00410030(s_HOTHUMANSDEAD_0062c71c, DAT_0063fc58, 0);
  goto LAB_0048bf12;
}


 export function FUN_0048bf2d ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0048bf43 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0048bf51 ()

 {
  FUN_0047e94e(1, 0);
  FUN_0048da51(DAT_006ad35c);
  if ((DAT_006c8fb4 !== 0)) {
    w32(DAT_006ad678, 0xf, (s32(DAT_006ad678, 0xf) | 0x400));
    DAT_006ad678 = s32(DAT_006ad678, 0);
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048bfec ()

 {
  let bVar1;
  let SVar2;
  let uVar3;
  let iVar4;
  let unaff_FS_OFFSET;
  let local_31c;
  let local_318;
  let local_314;
  let local_238;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0048c9da;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  local_14 = 1;
  FUN_0059db08(0x4000);
  local_8 = 0;
  local_20 = 1;
  uVar3 = FUN_00493c7d(DAT_006ad35c, DAT_006ad35c);
  FUN_005d23bb(s_Server:_%s_(%d)_0062c778, uVar3);
  (local_31c < 8) (local_31c = 1; local_31c = (local_31c < 8); local_31c = (local_31c + 1)) {
    if ((((1 << (((local_31c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      uVar3 = FUN_00493c7d(local_31c, local_31c);
      FUN_005d23bb(s_Client:_%s_(%d)_0062c788, uVar3);
    }
  }
  FUN_0059c2b8();
  DAT_006d1da0 = s32(DAT_006ad35c, DAT_006ad304 * 0x15);
  DAT_00628048 = DAT_00654fa4;
  DAT_0062c488 = ((DAT_00654fa6) << 16 >> 16);
  FUN_0042a768();
  FUN_0042a768();
  FUN_004e4ceb();
  DAT_00655b03 = ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF);
  DAT_00655b05 = ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF);
  FUN_00413476();
  local_1c = 0;
  (local_318 < ((DAT_00655b16) << 16 >> 16)) (local_318 = 0; local_318 = (local_318 < ((DAT_00655b16) << 16 >> 16)); local_318 = (local_318 + 1)) {
    if ((s8(DAT_006560f7[local_318 * 0x20]) === s32(DAT_006ad35c, DAT_006ad304 * 0x15))) {
      FUN_00410402(((s16((DAT_006560f0 + local_318 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_318 * 0x20), 0)) << 16 >> 16));
      local_1c = (local_1c + 1);
      break;
    }
  }
  if ((local_1c === 0)) {
    (local_318 < ((DAT_00655b18) << 16 >> 16)) (local_318 = 0; local_318 = (local_318 < ((DAT_00655b18) << 16 >> 16)); local_318 = (local_318 + 1)) {
      if ((s8(DAT_0064f348[local_318 * 0x58]) === DAT_006d1da0)) {
        FUN_00410402(((s16((DAT_0064f340 + local_318 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_318 * 0x58), 0)) << 16 >> 16));
        break;
      }
    }
  }
  FUN_00569363(1);
  FUN_00568e86(DAT_006d1da0);
  FUN_004897fa(1);
  bVar1 = DAT_00628048;
  if ((((1 << (((DAT_006d1da0) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
    FUN_0048d9ad(DAT_006ad35c);
    DAT_00635a3c = LAB_00401a5a;
    FUN_00426fb0(s_CLIENTHOTWAIT_0062c798, 0x2000000, DAT_0063fc58, 0);
    bVar1 = DAT_00628048;
  }
 LAB_0048c326: :
  do {
    DAT_00628048 = bVar1;
    if ((u8(bVar1) !== DAT_006d1da0)) {
      (local_318 < ((DAT_00655b16) << 16 >> 16)) (local_318 = 0; local_318 = (local_318 < ((DAT_00655b16) << 16 >> 16)); local_318 = (local_318 + 1)) {
        if ((s8(DAT_006560f7[local_318 * 0x20]) === DAT_006d1da0)) {
          FUN_005b6787(local_318);
        }
      }
    }
    FUN_0048d9ad(DAT_006ad35c);
    while ((DAT_00628044 !== 0)) {
      FUN_0047e94e(1, 0);
      FUN_0048da51(DAT_006ad35c);
      iVar4 = FUN_0048dab9();
      if ((iVar4 !== 0)) {
        local_8 = -1;
        FUN_0048c9ce();
        FUN_0048c9e4();
        return;
      }
    }
    if ((DAT_006ad698 !== 0)) {
      iVar4 = FUN_004828a5();
      if ((iVar4 === 0)) {
        local_8 = -1;
        FUN_0048c9ce();
        FUN_0048c9e4();
        return;
      }
      if ((DAT_006ad2f7 !== 0)) {
        local_8 = -1;
        FUN_0048c9ce();
        FUN_0048c9e4();
        return;
      }
      if ((DAT_00628044 !== 0)) {
      DAT_006c9038 = 0;
      DAT_006d1da0 = s32(DAT_006ad35c, DAT_006ad304 * 0x15);
      DAT_00655b03 = ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF);
      DAT_00655b05 = ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF);
      if ((u8(DAT_00628048) !== s32(DAT_006ad35c, DAT_006ad304 * 0x15))) {
        FUN_0048710a(s32(DAT_006ad35c, DAT_006ad304 * 0x15));
      }
      if ((DAT_00654b70 !== 0)) {
        DAT_00633a78 = (DAT_00654b70 / 0x3e8 | 0);
        _DAT_0066c990 = -1;
      }
      FUN_00413476();
      FUN_0047cf9e(DAT_006d1da0, 1);
      FUN_00569363(1);
      FUN_00568e86(DAT_006d1da0);
      local_18 = (s32((DAT_006af220 + DAT_006d1da0 * 4), 0) - s32((DAT_006af240 + DAT_006d1da0 * 4), 0));
      if ((DAT_00654fa8 === 0)) {
        DAT_00635a3c = LAB_00403c74;
        uVar3 = FUN_00493ba6(DAT_006d1da0);
        FUN_0040ff60(0, uVar3);
        uVar3 = FUN_00493b10(DAT_006d1da0);
        FUN_0040ff60(1, uVar3);
        if ((local_18 < 1)) {
          FUN_0043ca10(DAT_006359d4, s_OURTURNTOMOVE_0062c7c0);
          FUN_0059ec88(DAT_0063fc58, 0, 0);
          local_314 = DAT_fffffcec;
          FUN_00421bd0();
          FUN_0046e020(0x30, 0, 0, 0);
          FUN_0040bc80(0);
        }
        else {
          w32((DAT_006af240 + DAT_006d1da0 * 4), 0, s32((DAT_006af220 + DAT_006d1da0 * 4), 0));
          FUN_00421da0(0, local_18);
          if ((local_18 === 1)) {
            FUN_0043ca10(DAT_006359d4, s_CASUALTY_0062c7a8);
          }
          else {
            FUN_0043ca10(DAT_006359d4, s_CASUALTIES_0062c7b4);
          }
          FUN_0059ec88(DAT_0063fc58, 0, 0);
          local_314 = DAT_fffffcec;
          FUN_00421bd0();
          FUN_0046e020(0x30, 0, 0, 0);
          FUN_0040bc80(0);
          if ((local_238 !== 0)) {
            FUN_0043856b(DAT_006d1da0);
          }
        }
      }
      if ((DAT_00654fa8 === 0)) {
        if ((DAT_00628048 === 0)) {
          FUN_00486e6f();
        }
        if ((DAT_0062c488 !== 0)) {
          FUN_00489553(DAT_006d1da0);
          FUN_004b0b53(0xff, 2, 0, 0, 0);
        }
        FUN_0048aa24();
        if ((DAT_00654fa8 === 0)) {
          FUN_0041b8ff(DAT_006d1da0);
          w16((DAT_00654b60 + DAT_006d1da0 * 2), 0, 1);
        }
        if ((DAT_00654b70 !== 0)) {
          FUN_0055af2e(1);
        }
        FUN_0048a416();
      }
      else {
        _DAT_00673b08 = u8(DAT_00655b0b);
        DAT_00655b0b = 0;
        if ((DAT_0062c488 !== 0)) {
          FUN_00489553(DAT_006d1da0);
        }
        if ((DAT_00654b70 !== 0)) {
          FUN_0055af2e(1);
        }
        FUN_00543cd6();
        DAT_00655b0b = ((None) & 0xFF);
        SVar2 = FUN_006e7d64(0x1b);
        if (((((SVar2) << 16 >> 16) & 0x8001) !== 0)) {
          DAT_00654faa = 1;
        }
      }
    }
    else {
      local_20 = 0;
    }
    FUN_0055ae80(1);
    FUN_0056a65e(1);
    FUN_00453af0();
    if ((DAT_0064b1ac !== 0)) {
      DAT_00628044 = 0;
    }
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0xa2, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(0xea60);
    DAT_00654fa4 = 0;
    DAT_00628048 = 0;
    DAT_00654fa6 = 0;
    DAT_0062c488 = 0;
    local_14 = 0;
    bVar1 = 0;
    if ((DAT_00628044 === 0)) {
      FUN_0046b14d(0x2d, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0, 0);
      XD_FlushSendBuffer(0xea60);
      FUN_0059b293(1);
      if ((DAT_0064b1ac !== 0)) {
        FUN_0048b165();
      }
      local_8 = -1;
      FUN_0048c9ce();
      FUN_0048c9e4();
      return;
    }
  } while ( true );
}


 export function FUN_0048c9ce ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0048c9e4 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048c9f3 (param_1)

 {
  let bVar1;
  let SVar2;
  let uVar3;
  let iVar4;
  let unaff_FS_OFFSET;
  let local_32c;
  let local_328;
  let local_320;
  let local_31c;
  let local_240;
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
  puStack_c = LAB_0048d995;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  uVar3 = FUN_00493c7d(DAT_006d1da0, DAT_006d1da0);
  FUN_005d23bb(s_Server:_%s_(%d)_0062c7d0, uVar3);
  (local_32c < 8) (local_32c = 1; local_32c = local_32c; local_32c = (local_32c + 1)) {
    if ((((1 << (((local_32c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
      uVar3 = FUN_00493c7d(local_32c, local_32c);
      FUN_005d23bb(s_Client:_%s_(%d)_0062c7e0, uVar3);
    }
  }
  FUN_0059c2b8();
  FUN_00487007();
  FUN_0042a768();
  FUN_0042a768();
  FUN_004e4ceb();
  FUN_004897fa(1);
  FUN_00413476();
  local_18 = 0;
  (local_320 < ((DAT_00655b16) << 16 >> 16)) (local_320 = 0; local_320 = (local_320 < ((DAT_00655b16) << 16 >> 16)); local_320 = (local_320 + 1)) {
    if ((s8(DAT_006560f7[local_320 * 0x20]) === DAT_006d1da0)) {
      FUN_00410402(((s16((DAT_006560f0 + local_320 * 0x20), 0)) << 16 >> 16), ((s16((DAT_006560f2 + local_320 * 0x20), 0)) << 16 >> 16));
      local_18 = (local_18 + 1);
      break;
    }
  }
  if ((local_18 === 0)) {
    (local_320 < ((DAT_00655b18) << 16 >> 16)) (local_320 = 0; local_320 = (local_320 < ((DAT_00655b18) << 16 >> 16)); local_320 = (local_320 + 1)) {
      if ((s8(DAT_0064f348[local_320 * 0x58]) === DAT_006d1da0)) {
        FUN_00410402(((s16((DAT_0064f340 + local_320 * 0x58), 0)) << 16 >> 16), ((s16((DAT_0064f342 + local_320 * 0x58), 0)) << 16 >> 16));
        break;
      }
    }
  }
  bVar1 = DAT_00628048;
  if ((DAT_00628048 !== 0)) {
    do {
      if ((((1 << (DAT_00628048 & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        DAT_00628048 = 0;
      }
    } while ((DAT_00628048 !== bVar1)) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    XD_FlushSendBuffer(0xea60);
    while ((DAT_006c8fa0 !== 0)) {
      FUN_0047e94e(1, 0);
    }
    FUN_0048a92d();
    if ((DAT_00628048 === 0)) {
      FUN_00487371(-3);
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0xea60);
    }
    iVar4 = FUN_0048aedc();
    if ((DAT_0064b1ac !== 0)) {
      DAT_00628044 = 0;
 LAB_0048d957: :
      FUN_0055ae80(0);
      FUN_004824e3();
      if ((DAT_0064b1ac !== 0)) {
        FUN_0048b165();
      }
      local_8 = -1;
      FUN_0048d989();
      FUN_0048d99f();
      return;
    }
    if ((DAT_0062c488 !== 0)) {
      FUN_004fba0c(((DAT_00655af8) << 16 >> 16));
      FUN_004fba9c(((DAT_00655af8) << 16 >> 16));
      FUN_004fbb2f(((DAT_00655af8) << 16 >> 16));
      FUN_004fbbdd();
      FUN_004b0b53(0xff, 2, 0, 0, 0);
      XD_FlushSendBuffer(0x1388);
    }
    (local_32c < 8) (local_32c = 0; (DAT_00628044 = (DAT_00628044 !== 0) && (local_32c = local_32c)); local_32c = (local_32c + 1)) {
      DAT_00655b0b = ((DAT_006c31a8 | DAT_00655b0b) & ((DAT_00654fb0) & 0xFF));
      DAT_006c31a8 = 0;
      DAT_006d1da0 = s32(DAT_006ad35c, DAT_006ad304 * 0x15);
      DAT_00655b03 = ((s32(DAT_006ad35c, DAT_006ad304 * 0x15)) & 0xFF);
      if ((((1 << (((local_32c) & 0xFF) & 0x1f)) & u8(DAT_00655b0a)) !== 0)) {
        if ((param_1 !== 0)) {
          FUN_0048710a(local_32c);
        }
        FUN_004b0b53(0xff, 2, 0, 0, 0);
        XD_FlushSendBuffer(0x1388);
        while ((DAT_006c8fa0 !== 0)) {
          FUN_0047e94e(1, 0);
        }
        DAT_00655b05 = ((local_32c) & 0xFF);
        if ((DAT_006d1da0 === local_32c)) {
          w32((DAT_006ad644 + local_32c * 4), 0, 0);
          if ((DAT_00628044 === 0)) {
            FUN_0046b14d(0x31, 0, 0, DAT_006d1da0, 0, 0, 0, 0, 0, 0);
            goto LAB_0048d957;
          }
          if ((DAT_00654fa8 === 0)) {
            FUN_0041b8ff(local_32c);
            w16((DAT_00654b60 + local_32c * 2), 0, 1);
          }
          if ((DAT_00654b70 !== 0)) {
            DAT_00633a78 = (DAT_00654b70 / 0x3e8 | 0);
            _DAT_0066c990 = -1;
          }
          _DAT_006ad578 = local_32c;
          FUN_004e4ceb();
          _DAT_0066c990 = -1;
          FUN_00552112();
          local_28 = DAT_0066ca54;
          local_24 = DAT_0066ca58;
          local_20 = DAT_0066ca5c;
          local_1c = DAT_0066ca68;
          FUN_00408490(DAT_ffffffd8);
          FUN_0046b14d(0x69, 0xff, local_32c, 0, 0, 0, 0, 0, 0, 0);
          FUN_00413476();
          FUN_0047cf9e(DAT_006d1da0, 1);
          FUN_00568e86(local_32c);
          local_14 = (s32((DAT_006af220 + DAT_006d1da0 * 4), 0) - s32((DAT_006af240 + DAT_006d1da0 * 4), 0));
          if ((DAT_00654fa8 === 0)) {
            DAT_00635a3c = LAB_00403c74;
            uVar3 = FUN_00493ba6(DAT_006d1da0);
            FUN_0040ff60(0, uVar3);
            uVar3 = FUN_00493b10(DAT_006d1da0);
            FUN_0040ff60(1, uVar3);
            if ((s32((DAT_006af240 + DAT_006d1da0 * 4), 0) < s32((DAT_006af220 + DAT_006d1da0 * 4), 0))) {
              w32((DAT_006af240 + DAT_006d1da0 * 4), 0, s32((DAT_006af220 + DAT_006d1da0 * 4), 0));
              FUN_00421da0(0, local_14);
              if ((local_14 === 1)) {
                FUN_0043ca10(DAT_006359d4, s_CASUALTY_0062c7f0);
              }
              else {
                FUN_0043ca10(DAT_006359d4, s_CASUALTIES_0062c7fc);
              }
              FUN_0059ec88(DAT_0063fc58, 0, 0);
              local_31c = DAT_fffffce4;
              FUN_00421bd0();
              FUN_0046e020(0x30, 0, 0, 0);
              FUN_0040bc80(0);
              if ((local_240 !== 0)) {
                FUN_0043856b(DAT_006d1da0);
              }
            }
            else {
              FUN_0043ca10(DAT_006359d4, s_OURTURNTOMOVE_0062c808);
              FUN_0059ec88(DAT_0063fc58, 0, 0);
              local_31c = DAT_fffffce4;
              FUN_00421bd0();
              FUN_0046e020(0x30, 0, 0, 0);
              FUN_0040bc80(0);
            }
          }
          if ((DAT_00654fa8 === 0)) {
            if ((DAT_00628048 === 0)) {
              FUN_00486e6f();
            }
            if ((param_1 !== 0)) {
              if ((DAT_0062c488 !== 0)) {
                FUN_00413476();
                FUN_0047cf9e(DAT_006d1da0, 1);
                FUN_00419b80();
              }
              FUN_00489553(local_32c);
            }
            FUN_0048aa24();
            if ((DAT_00654b70 !== 0)) {
              FUN_0055af2e(1);
            }
            FUN_0048a416();
          }
          else {
            _DAT_00673b08 = u8(DAT_00655b0b);
            DAT_00655b0b = 0;
            if ((param_1 !== 0)) {
              if ((DAT_0062c488 !== 0)) {
                FUN_00413476();
                FUN_0047cf9e(DAT_006d1da0, 1);
                FUN_00419b80();
              }
              FUN_00489553(local_32c);
            }
            if ((DAT_00654b70 !== 0)) {
              FUN_0055af2e(1);
            }
            FUN_00543cd6();
            DAT_00655b0b = ((None) & 0xFF);
            SVar2 = FUN_006e7d64(0x1b);
            if (((((SVar2) << 16 >> 16) & 0x8001) !== 0)) {
              DAT_00654faa = 1;
            }
            DAT_00654faa = (DAT_00654faa + 0xffff);
            if (((DAT_00654faa + 0xffff) === 0)) {
              DAT_00654fa8 = 0;
            }
          }
          if ((DAT_00654b70 !== 0)) {
            FUN_0055ae80(1);
          }
        }
        else if ((((1 << (((local_32c) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) === 0)) {
          w32((DAT_006ad644 + local_32c * 4), 0, 0);
          DAT_006ad699 = 0;
          _DAT_006ad578 = local_32c;
          FUN_004e4ceb();
          _DAT_0066c990 = -1;
          FUN_00552112();
          local_28 = DAT_0066ca54;
          local_24 = DAT_0066ca58;
          local_20 = DAT_0066ca5c;
          local_1c = DAT_0066ca68;
          FUN_00408490(DAT_ffffffd8);
          FUN_0046b14d(0x69, 0xff, local_32c, 0, 0, 0, 0, 0, 0, 0);
          FUN_0047cf9e(DAT_006d1da0, 1);
          FUN_00568e86(local_32c);
          if ((DAT_0062c488 !== 0)) {
            if ((DAT_0062c488 !== 0)) {
              FUN_00413476();
              FUN_00419b80();
            }
            FUN_00489553(local_32c);
          }
          FUN_00543cd6();
          DAT_006ad699 = 1;
        }
        else {
          iVar4 = s32((DAT_006ad558 + local_32c * 4), 0);
          _DAT_006ad578 = local_32c;
          FUN_004e4ceb();
          _DAT_0066c990 = -1;
          FUN_00552112();
          local_28 = DAT_0066ca54;
          local_24 = DAT_0066ca58;
          local_20 = DAT_0066ca5c;
          local_1c = DAT_0066ca68;
          FUN_00408490(DAT_ffffffd8);
          DAT_006c9038 = 0;
          w32((DAT_006c3168 + local_32c * 4), 0, 0);
          FUN_0046b14d(0x69, 0xff, local_32c, 0, 0, 0, 0, 0, 0, 0);
          FUN_0047cf9e(DAT_006d1da0, 1);
          FUN_00568e86(local_32c);
          FUN_0046b14d(0x16, s32((DAT_006ad30c + iVar4 * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
          if ((s32((DAT_006ad644 + local_32c * 4), 0) !== 0)) {
            w32((DAT_006ad644 + local_32c * 4), 0, 0);
            FUN_005f22d0(DAT_0063cc48, (DAT_006ad330 + s32((DAT_006ad558 + local_32c * 4), 0) * 0x54));
            FUN_00511880(0x3f, 0xff, 1, 0, s32((DAT_006ad30c + s32((DAT_006ad558 + local_32c * 4), 0) * 0x54), 0), 0);
            FUN_00410030(s_NEWPLAYER_0062c818, DAT_0063fc58, 0);
          }
          FUN_0048d9ad(local_32c);
          while ((DAT_00628044 !== 0)) {
            FUN_0047e94e(1, 0);
            FUN_0048da51(local_32c);
          }
          DAT_006c9038 = 0;
          DAT_006c918c = 0;
        }
        FUN_0056a65e(1);
        FUN_0048dab9();
        if ((None === DAT_006d1da0)) {
          (local_320 < ((DAT_00655b16) << 16 >> 16)) (local_320 = 0; local_320 = (local_320 < ((DAT_00655b16) << 16 >> 16)); local_320 = (local_320 + 1)) {
            if ((s8(DAT_006560f7[local_320 * 0x20]) === local_32c)) {
              FUN_005b6787(local_320);
            }
          }
          local_328 = ((DAT_00655b18) << 16 >> 16);
          while ((-1 < local_328)) {
            if ((s32((DAT_0064f394 + local_328 * 0x58), 0) !== 0)) {
              w32((DAT_0064f344 + local_328 * 0x58), 0, (s32((DAT_0064f344 + local_328 * 0x58), 0) & -0x400001));
            }
          }
        }
        DAT_00654fa4 = 0;
        DAT_00628048 = 0;
        DAT_00654fa6 = 0;
        DAT_0062c488 = 0;
        param_1 = 0;
        DAT_00655aee = (DAT_00655aee & 0xfffe);
        FUN_00453af0();
        if ((DAT_00628044 === 0)) {
          DAT_00628044 = 0;
          goto LAB_0048d957;
        }
      }
    }
    if ((DAT_00628044 === 0))


 export function FUN_0048d989 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0048d99f (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048d9ad (param_1)

 {
  if ((DAT_006c31d0 === 0)) {
    DAT_006c9090 = 0;
    FUN_0046b14d(0x2b, s32((DAT_006ad30c + s32((DAT_006ad558 + param_1 * 4), 0) * 0x54), 0), 0, 0, 0, 0, 0, 0, 0, 0);
  }
  else {
    DAT_006c9090 = 1;
  }
  if ((DAT_00631130 === 0)) {
    DAT_00626a2c = 0;
    DAT_006c91e4 = 0;
  }
  _DAT_00673b00 = FUN_00421bb0();
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048da51 (param_1)

 {
  let iVar1;

  iVar1 = FUN_00421bb0();
  if ((0xe0f < (iVar1 - DAT_00673b00))) {
    if ((DAT_006c9090 === 0)) {
      w32((DAT_006c3168 + param_1 * 4), 0, (s32((DAT_006c3168 + param_1 * 4), 0) + 1));
      if ((DAT_006ad2f7 === 0)) {
        DAT_006c8fb4 = (DAT_006c8fb4 + 1);
      }
    }
    else {
      FUN_0048d9ad(param_1);
    }
  }
  return;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048dab9 ()

 {
  let iVar1;
  let bVar2;
  let local_30;
  let local_28;
  let local_24;
  let local_8;

  if ((DAT_006ad2f7 === 0)) {
    if ((DAT_006c8fb4 !== 0)) {
      DAT_00628044 = 0;
      FUN_005d225b(s_We_lost_connection_to_the_server_0062c824);
      FUN_0059b293(1);
      FUN_00410030(s_LOSTSERVER_0062c85c, DAT_0063fc58, 0);
      return 1;
    }
  }
  else {
    local_28 = FUN_0048de75();
    (local_30 < 8) (local_30 = 1; local_30 = (local_30 < 8); local_30 = (local_30 + 1)) {
      bVar2 = 1;
      if ((((1 << (((local_30) & 0xFF) & 0x1f)) & u8(DAT_00655b0b)) !== 0)) {
        (local_8 < 7) (local_8 = 0; local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
          if ((s32(DAT_006ad35c, local_8 * 0x15) === local_30)) {
            bVar2 = 0;
            break;
          }
        }
        if (bVar2) {
          DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((local_30) & 0xFF) & 0x1f))) & 0xFF)));
          if ((((1 << (((local_30) & 0xFF) & 0x1f)) & ((DAT_00654fb0) << 16 >> 16)) !== 0)) {
            DAT_00654fb0 = (DAT_00654fb0 & (~(((1 << (((local_30) & 0xFF) & 0x1f))) & 0xFFFF)));
            FUN_0046b14d(0x2a, 0xff, (((DAT_00654fb0 & (~(((1 << (((local_30) & 0xFF) & 0x1f))) & 0xFFFF)))) << 16 >> 16), 0, 0, 0, 0, 0, 0, 0);
            _DAT_006c90a0 = (None + 1);
          }
          local_28 = (local_28 + 1);
        }
      }
    }
    if ((DAT_006c8fb4 !== 0)) {
      FID_conflict:_memcpy(DAT_ffffffdc, DAT_006c8fc0, 0x1c);
      FUN_0059c2b8();
      (local_8 < 7) (local_8 = 1; local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
        if ((DAT_006ad359[local_8 * 0x54] !== 0)) {
          local_28 = (local_28 + 1);
          iVar1 = s32(DAT_006ad35c, local_8 * 0x15);
          FUN_0040ff60(0, (DAT_006ad330 + local_8 * 0x54));
          FUN_00511880(0x53, 0xff, 1, 0, 0, 0);
          w32((DAT_006c3188 + iVar1 * 4), 0, 0);
          local_30 = ((iVar1) & 0xFF);
          DAT_00655b0b = (DAT_00655b0b & (~(((1 << (((iVar1) & 0xFF) & 0x1f))) & 0xFF)));
          FUN_0059b96a(s32((DAT_006ad30c + local_8 * 0x54), 0));
          if ((((1 << (((iVar1) & 0xFF) & 0x1f)) & ((DAT_00654fb0) << 16 >> 16)) !== 0)) {
            DAT_00654fb0 = (DAT_00654fb0 & (~(((1 << (((iVar1) & 0xFF) & 0x1f))) & 0xFFFF)));
            FUN_0046b14d(0x2a, 0xff, (((DAT_00654fb0 & (~(((1 << (((iVar1) & 0xFF) & 0x1f))) & 0xFFFF)))) << 16 >> 16), 0, 0, 0, 0, 0, 0, 0);
            _DAT_006c90a0 = (None + 1);
          }
          FUN_00410030(s_LOSTCLIENT_0062c868, DAT_0063fc58, 0);
        }
      }
    }
    if ((local_28 !== 0)) {
      DAT_006ad308 = 0;
      (local_8 < 7) (local_8 = 0; local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
        if ((DAT_006ad359[local_8 * 0x54] !== 0)) {
          DAT_006ad308 = (DAT_006ad308 + 1);
        }
      }
      FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
      FUN_004b0b53(0xff, 2, 0, 0, 1);
    }
  }
  return 0;
}


 /* /*  WARNING: */  /* Globals */  /* starting */  /* with */  /* '_' */  /* overlap */  /* smaller */  /* symbols */  /* at */  /* the */  /* same */

 /* address  */ */ export function FUN_0048de75 ()

 {
  let iVar1;
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  (local_8 < 7) (local_8 = 1; local_8 = (local_8 < 7); local_8 = (local_8 + 1)) {
    if ((s32((DAT_006c3188 + s32(DAT_006ad35c, local_8 * 0x15) * 4), 0) !== 0)) {
      local_c = (local_c + 1);
      iVar1 = s32(DAT_006ad35c, local_8 * 0x15);
      w32((DAT_006c3188 + iVar1 * 4), 0, 0);
      w32((DAT_006c8fc0 + s32((DAT_006ad30c + local_8 * 0x54), 0) * 4), 0, 0);
      local_10 = ((iVar1) & 0xFF);
      DAT_00655b0b = (DAT_00655b0b & (~(((1 << (local_10 & 0x1f))) & 0xFF)));
      FUN_0059b96a(s32((DAT_006ad30c + local_8 * 0x54), 0));
      if ((((1 << (local_10 & 0x1f)) & ((DAT_00654fb0) << 16 >> 16)) !== 0)) {
        DAT_00654fb0 = (DAT_00654fb0 & (~(((1 << (local_10 & 0x1f))) & 0xFFFF)));
        _DAT_006c90a0 = (None + 1);
      }
    }
  }
  if ((local_c !== 0)) {
    FUN_0046b14d(0x2a, 0xff, ((DAT_00654fb0) << 16 >> 16), 0, 0, 0, 0, 0, 0, 0);
    FUN_0046b14d(4, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  return local_c;
}
