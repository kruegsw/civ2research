// Block 0x00540000 — Ghidra P-code transpiler
// Source: civ2.exe (Civilization II MGE)
// Functions: 37

import { _MEM, s8, u8, s16, u16, s32, u32, w16, w32, w16r, w32r } from '../mem.js';


 export function FUN_00543b80 ()

 {
  let iVar1;
  let iVar2;

  FUN_00484d52();
  iVar1 = ((DAT_00655afe) << 16 >> 16);
  if ((iVar2 === 0)) {
    FUN_005b6787(iVar1);
  }
  return;
}


 export function FUN_00543cd6 ()

 {
  let bVar1;
  let sVar2;
  let iVar3;
  let iVar4;
  let local_18;
  let local_14;
  let local_c;

  iVar3 = s8(DAT_00655b05);
  bVar1 = 0;
  if ((((DAT_0064bcba) << 16 >> 16) === iVar3)) {
    bVar1 = 1;
  }
  local_c = 0;
  do {
    if ((1 < local_c)) {
      return;
    }
    local_18 = ((DAT_00655b16) << 16 >> 16);
    while ((-1 < local_18)) {
      if ((2 < DAT_00655b02)) {
        if ((DAT_006ad698 !== 0)) {
          return;
        }
        if ((DAT_006ad685 !== 0)) {
          return;
        }
      }
      if ((DAT_0064b1c1[u8(DAT_006560f6[local_18 * 0x20]) * 0x14] === 1)) {
        while ((iVar4 !== 0)) {
          if ((2 < DAT_00655b02)) {
            FUN_004b0b53(0xff, 2, 0, 0, 0);
            XD_FlushSendBuffer(0x1388);
            FUN_0047e94e(1, 0);
          }
          sVar2 = DAT_00655b16;
          DAT_00655afe = ((local_18) & 0xFFFF);
          FUN_00543b80();
          if ((DAT_00655b16 !== sVar2)) {
            local_14 = (local_14 + 1);
          }
          local_14 = (local_14 + 1);
          if ((0x14 < local_14)) {
            FUN_005b6787(local_18);
            break;
          }
          if ((iVar4 !== 0)) {
            FUN_00543b80();
          }
        }
        FUN_0041033a();
      }
    }
    local_c = (local_c + 1);
  } ( true );
}


 export function FUN_00548b70 (param_1, param_2, param_3, param_4, param_5)

 {
  let iVar1;
  let iVar2;

  if ((param_2 < 2)) {
    param_2 = 1;
  }
  if ((param_1 < 2)) {
    param_1 = 1;
  }
  iVar2 = param_2;
  if ((param_1 === 1)) {
    if ((param_5 !== 0)) {
      w32(param_5, 0, 0);
    }
    if ((param_4 !== 0)) {
      w32(param_4, 0, 1);
    }
  }
  else {
    param_3 = (param_3 - param_2);
    iVar1 = (param_3 / (param_1 + -1) | 0);
    if ((param_5 !== 0)) {
      w32(param_5, 0, (param_3 % (param_1 + -1)));
    }
    if ((param_4 !== 0)) {
      w32(param_4, 0, param_1);
    }
    if ((iVar1 < 1)) {
      if ((param_5 !== 0)) {
        w32(param_5, 0, 0);
      }
      if ((param_4 !== 0)) {
        w32(param_4, 0, ((param_3 - param_2) + 1));
      }
      iVar2 = 1;
    }
  }
  return iVar2;
}


 export function FUN_00548c78 (param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9)

 {
  let iVar1;
  let local_24;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0;
  local_8 = param_6;
  param_7 = FUN_00548b70(param_6, param_7, param_8, DAT_00000018, DAT_ffffffec);
  if ((param_5 !== local_8)) {
    param_5 = (param_6 * param_5 / local_8 | 0);
  }
  local_c = 0;
  while ((iVar1 <= local_c)) {
    iVar1 = param_6;
    if ((param_5 <= param_6)) {
      iVar1 = param_5;
    }
    if ((iVar1 <= local_c)) {
      ((param_6 + -1) <= local_10) (local_10 = (local_10 + local_14); param_6 = (param_6 + -1);
          local_10 = (local_10 - (param_6 + -1))) {
        param_3 = (param_3 + 1);
      }
    }
    local_c = (local_c + 1);
  }
  return;
}


 export function FUN_00548df0 ()

 {
  let hWnd;

  hWnd = FUN_00418770();
  FUN_006e7d94(hWnd);
  FUN_0054f16b();
  return;
}


 /* /*  WARNING: */  /* Type */  /* propagation */  /* algorithm */  /* not */

 /* settling  */ */ export function FUN_00548e23 (param_1, param_2)

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_5c;
  let local_58;
  let local_54;

  iVar1 = _fputs(s_@THEN_0063257c, param_1);
  if ((s32((param_2 + 4), 0) === 0)) {
    return;
  }
  do {
    uVar2 = (s32((param_2 + 4), 0) & local_5c);
    if ((uVar2 < 9)) {
      if ((uVar2 === 8)) {
        iVar1 = _fputs(s_CHANGEMONEY_00632680, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_receiver=%s_00632690, s32((param_2 + 0x174), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_amount=%d_006326a0, s32((param_2 + 0x17c), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
      }
      else if ((uVar2 === 1)) {
        iVar1 = _fputs(s_TEXT_00632584, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        (s32(((param_2 + 0x38) + local_58 * 4), 0) !== 0) (local_58 = 0; (local_58 = (local_58 < 0x14) && (param_2 = (param_2 + 0x38)));
            local_58 = (local_58 + 1)) {
          iVar1 = _fputs(s32(((param_2 + 0x38) + local_58 * 4), 0), param_1);
          if ((iVar1 === -1)) {
            return;
          }
          iVar1 = _fputs(DAT_0063258c, param_1);
          if ((iVar1 === -1)) {
            return;
          }
        }
        iVar1 = _fputs(s_ENDTEXT_00632590, param_1);
      }
      else if ((uVar2 === 2)) {
        iVar1 = _fputs(s_MOVEUNIT_0063259c, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_unit=%s_006325a8, s32((param_2 + 0x90), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_owner=%s_006325b4, s32((param_2 + 0x88), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        iVar1 = _fputs(s_maprect_006325c0, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        (local_58 < 4) (local_58 = 0; local_58 = (local_58 < 4); local_58 = (local_58 + 1)) {
          _sprintf(DAT_ffffffac, s_%d,%d_006325cc, s32(((param_2 + 0x9c) + local_58 * 8), 0), s32(((param_2 + 0xa0) + local_58 * 8), 0));
          if ((local_58 < 3)) {
            FUN_005f22e0(DAT_ffffffac, DAT_006325d4);
          }
          iVar1 = _fputs(DAT_ffffffac, param_1);
          if ((iVar1 === -1)) {
            return;
          }
        }
        iVar1 = _fputs(s_moveto_006325d8, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_%d,%d_006325e4, s32((param_2 + 0xbc), 0), s32((param_2 + 0xc0), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        if ((s32((param_2 + 0x98), 0) === -2)) {
          _sprintf(DAT_ffffffac, s_numbertomove=ALL_006325ec);
        }
        else {
          _sprintf(DAT_ffffffac, s_numbertomove=%d_00632600, s32((param_2 + 0x98), 0));
        }
        iVar1 = _fputs(DAT_ffffffac, param_1);
      }
      else {
        if ((uVar2 !== 4)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_unit=%s_00632620, s32((param_2 + 0xdc), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_owner=%s_0063262c, s32((param_2 + 0xd4), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_veteran=%s_00632640, (DAT_00632638 + ((u8((s32((param_2 + 0x138), 0) !== 0)) - 1) & 4)));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_homecity=%s_0063264c, s32((param_2 + 0x13c), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        iVar1 = _fputs(s_locations_0063265c, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        (local_58 < s32((param_2 + 0x134), 0)) (local_58 = 0; local_58 = (local_58 < s32((param_2 + 0x134), 0)); local_58 = (local_58 + 1)) {
          _sprintf(DAT_ffffffac, s_%d,%d_00632668, s32(((param_2 + 0xe4) + local_58 * 8), 0), s32(((param_2 + 0xe8) + local_58 * 8), 0));
          iVar1 = _fputs(DAT_ffffffac, param_1);
          if ((iVar1 === -1)) {
            return;
          }
        }
        iVar1 = _fputs(s_endlocations_00632670, param_1);
      }
 joined_r0x0054934c: :
      if ((iVar1 === -1)) {
        return;
      }
    }
    else {
      if ((0x20 < uVar2)) {
        if ((uVar2 < 0x81)) {
          if ((uVar2 === 0x80)) {
            iVar1 = _fputs(s_PLAYCDTRACK_00632700, param_1);
            if ((iVar1 === -1)) {
              return;
            }
            _sprintf(DAT_ffffffac, DAT_00632710, s32((param_2 + 0x188), 0));
            iVar1 = _fputs(DAT_ffffffac, param_1);
          }
          else {
            if ((uVar2 !== 0x40)) {
          if ((uVar2 === 0x200)) {
            iVar1 = _fputs(s_CHANGETERRAIN_00632728, param_1);
            if ((iVar1 === -1)) {
              return;
            }
            _sprintf(DAT_ffffffac, s_terraintype=%d_00632738, s32((param_2 + 0x18c), 0));
            iVar1 = _fputs(DAT_ffffffac, param_1);
            if ((iVar1 === -1)) {
              return;
            }
            iVar1 = _fputs(s_maprect_00632748, param_1);
            if ((iVar1 === -1)) {
              return;
            }
            (local_58 < 4) (local_58 = 0; local_58 = (local_58 < 4); local_58 = (local_58 + 1)) {
              _sprintf(DAT_ffffffac, s_%d,%d_00632754, s32(((param_2 + 0x190) + local_58 * 8), 0), s32(((param_2 + 0x194) + local_58 * 8), 0));
              if ((local_58 < 3)) {
                FUN_005f22e0(DAT_ffffffac, DAT_0063275c);
              }
              iVar1 = _fputs(DAT_ffffffac, param_1);
              if ((iVar1 === -1)) {
                return;
              }
            }
            iVar1 = _fputs(DAT_00632760, param_1);
          }
          else {
            if ((uVar2 !== 0x100)) {
          iVar1 = _fputs(s_DESTROYACIVILIZATION_00632764, param_1);
          if ((iVar1 === -1)) {
            return;
          }
          if ((s32((param_2 + 0x1b0), 0) < 0)) {
            if (((_MEM[(param_2 + 1)] & 1) === 0)) {
              if ((s32((param_2 + 0x1b0), 0) === -3)) {
                _sprintf(DAT_ffffffac, s_whom=TRIGGERATTACKER_006327a0);
              }
              else {
                _sprintf(DAT_ffffffac, s_whom=TRIGGERDEFENDER_006327b8);
              }
            }
            else {
              _sprintf(DAT_ffffffac, s_whom=TRIGGERRECEIVER_00632788);
            }
          }
          else {
            uVar3 = FUN_00493c7d(s32((param_2 + 0x1b0), 0));
            _sprintf(DAT_ffffffac, s_whom=%s_0063277c, uVar3);
          }
          iVar1 = _fputs(DAT_ffffffac, param_1);
        }
        else if ((uVar2 === 0x800)) {
          iVar1 = _fputs(s_GIVETECHNOLOGY_006327d0, param_1);
          if ((iVar1 === -1)) {
            return;
          }
          if ((s32((param_2 + 0x1b8), 0) < 0)) {
            if (((_MEM[(param_2 + 1)] & 1) === 0)) {
              if ((s32((param_2 + 0x1b8), 0) === -3)) {
                _sprintf(DAT_ffffffac, s_receiver=TRIGGERATTACKER_0063280c);
              }
              else {
                _sprintf(DAT_ffffffac, s_receiver=TRIGGERDEFENDER_00632828);
              }
            }
            else {
              _sprintf(DAT_ffffffac, s_receiver=TRIGGERRECEIVER_006327f0);
            }
          }
          else {
            uVar3 = FUN_00493c7d(s32((param_2 + 0x1b8), 0));
            _sprintf(DAT_ffffffac, s_receiver=%s_006327e0, uVar3);
          }
          iVar1 = _fputs(DAT_ffffffac, param_1);
          if ((iVar1 === -1)) {
            return;
          }
          _sprintf(DAT_ffffffac, s_technology=%d_00632844, s32((param_2 + 0x1b4), 0));
          iVar1 = _fputs(DAT_ffffffac, param_1);
        }
        else {
          if ((uVar2 !== 0x2000)) {
        iVar1 = _fputs(s_MAKEAGGRESSION_006326c0, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_who=%s_006326d0, s32((param_2 + 0xcc), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, s_whom=%s_006326d8, s32((param_2 + 0xc4), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        goto joined_r0x0054934c;
      }
      if ((uVar2 === 0x10)) {
        iVar1 = _fputs(s_PLAYWAVEFILE_006326ac, param_1);
        if ((iVar1 === -1)) {
          return;
        }
        _sprintf(DAT_ffffffac, DAT_006326bc, s32((param_2 + 0x184), 0));
        iVar1 = _fputs(DAT_ffffffac, param_1);
        goto joined_r0x0054934c;
      }
    }
 LAB_005499f7: :
    local_5c = (local_5c << 1);
    if ((local_5c === 0x8000)) {
      return;
    }
  } while ( true );
}


 export function FUN_00549aee (param_1)

 {
  let uVar1;
  let iVar2;
  let local_108;
  let local_104;

  local_108 = DAT_0064b99c;
  do {
    if ((local_108 === 0)) {
      _fputs(DAT_00632a1c, param_1);
      return;
    }
    iVar2 = _fputs(s_@IF_00632854, param_1);
    if ((iVar2 === -1)) {
      return;
    }
    uVar1 = s32(local_108, 0);
    if ((uVar1 < 9)) {
      if ((uVar1 === 8)) {
        iVar2 = _fputs(s_TURNINTERVAL_006328e0, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_interval=%d_006328f0, s32(local_108, 0xb));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
      else if ((uVar1 === 1)) {
        iVar2 = _fputs(s_UNITKILLED_0063285c, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_unit=%s_00632868, s32(local_108, 2));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_attacker=%s_00632874, s32(local_108, 5));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_defender=%s_00632884, s32(local_108, 8));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
      else if ((uVar1 === 2)) {
        iVar2 = _fputs(s_CITYTAKEN_00632894, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_city=%s_006328a0, s32(local_108, 4));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_attacker=%s_006328ac, s32(local_108, 5));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_defender=%s_006328bc, s32(local_108, 8));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
      else if ((uVar1 === 4)) {
        iVar2 = _fputs(s_TURN_006328cc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_turn=%d_006328d4, s32(local_108, 0xb));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
    }
    else {
      /* switch */ () {
      case 0x10 :
        iVar2 = _fputs(s_NEGOTIATION_00632900, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_talker=%s_00632910, s32(local_108, 5));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_talkertype=_0063291c);
        if ((s32(local_108, 7) === 1)) {
          FUN_005f22e0(DAT_fffffefc, s_Human_00632928);
        }
        if ((s32(local_108, 7) === 2)) {
          FUN_005f22e0(DAT_fffffefc, s_Computer_00632930);
        }
        if ((s32(local_108, 7) === 4)) {
          FUN_005f22e0(DAT_fffffefc, s_HumanOrComputer_0063293c);
        }
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_listener=%s_00632950, s32(local_108, 8));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_listenertype=_00632960);
        if ((s32(local_108, 0xa) === 1)) {
          FUN_005f22e0(DAT_fffffefc, s_Human_00632970);
        }
        if ((s32(local_108, 0xa) === 2)) {
          FUN_005f22e0(DAT_fffffefc, s_Computer_00632978);
        }
        if ((s32(local_108, 0xa) === 4)) {
          FUN_005f22e0(DAT_fffffefc, s_HumanOrComputer_00632984);
        }
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        FUN_00548e23(param_1, local_108);
        break;
      case 0x11 :
      case 0x12 :
      case 0x13 :
      case 0x14 :
      case 0x15 :
      case 0x16 :
      case 0x17 :
      case 0x18 :
      case 0x19 :
      case 0x1a :
      case 0x1b :
      case 0x1c :
      case 0x1d :
      case 0x1e :
      case 0x1f :
      case 0x21 :
      case 0x22 :
      case 0x23 :
      case 0x24 :
      case 0x25 :
      case 0x26 :
      case 0x27 :
      case 0x28 :
      case 0x29 :
      case 0x2a :
      case 0x2b :
      case 0x2c :
      case 0x2d :
      case 0x2e :
      case 0x2f :
      case 0x30 :
      case 0x31 :
      case 0x32 :
      case 0x33 :
      case 0x34 :
      case 0x35 :
      case 0x36 :
      case 0x37 :
      case 0x38 :
      case 0x39 :
      case 0x3a :
      case 0x3b :
      case 0x3c :
      case 0x3d :
      case 0x3e :
      case 0x3f :
      case 0x41 :
      case 0x42 :
      case 0x43 :
      case 0x44 :
      case 0x45 :
      case 0x46 :
      case 0x47 :
      case 0x48 :
      case 0x49 :
      case 0x4a :
      case 0x4b :
      case 0x4c :
      case 0x4d :
      case 0x4e :
      case 0x4f :
      case 0x50 :
      case 0x51 :
      case 0x52 :
      case 0x53 :
      case 0x54 :
      case 0x55 :
      case 0x56 :
      case 0x57 :
      case 0x58 :
      case 0x59 :
      case 0x5a :
      case 0x5b :
      case 0x5c :
      case 0x5d :
      case 0x5e :
      case 0x5f :
      case 0x60 :
      case 0x61 :
      case 0x62 :
      case 99 :
      case 100 :
      case 0x65 :
      case 0x66 :
      case 0x67 :
      case 0x68 :
      case 0x69 :
      case 0x6a :
      case 0x6b :
      case 0x6c :
      case 0x6d :
      case 0x6e :
      case 0x6f :
      case 0x70 :
      case 0x71 :
      case 0x72 :
      case 0x73 :
      case 0x74 :
      case 0x75 :
      case 0x76 :
      case 0x77 :
      case 0x78 :
      case 0x79 :
      case 0x7a :
      case 0x7b :
      case 0x7c :
      case 0x7d :
      case 0x7e :
      case 0x7f :
      case 0x81 :
      case 0x82 :
      case 0x83 :
      case 0x84 :
      case 0x85 :
      case 0x86 :
      case 0x87 :
      case 0x88 :
      case 0x89 :
      case 0x8a :
      case 0x8b :
      case 0x8c :
      case 0x8d :
      case 0x8e :
      case 0x8f :
      case 0x90 :
      case 0x91 :
      case 0x92 :
      case 0x93 :
      case 0x94 :
      case 0x95 :
      case 0x96 :
      case 0x97 :
      case 0x98 :
      case 0x99 :
      case 0x9a :
      case 0x9b :
      case 0x9c :
      case 0x9d :
      case 0x9e :
      case 0x9f :
      case 0xa0 :
      case 0xa1 :
      case 0xa2 :
      case 0xa3 :
      case 0xa4 :
      case 0xa5 :
      case 0xa6 :
      case 0xa7 :
      case 0xa8 :
      case 0xa9 :
      case 0xaa :
      case 0xab :
      case 0xac :
      case 0xad :
      case 0xae :
      case 0xaf :
      case 0xb0 :
      case 0xb1 :
      case 0xb2 :
      case 0xb3 :
      case 0xb4 :
      case 0xb5 :
      case 0xb6 :
      case 0xb7 :
      case 0xb8 :
      case 0xb9 :
      case 0xba :
      case 0xbb :
      case 0xbc :
      case 0xbd :
      case 0xbe :
      case 0xbf :
      case 0xc0 :
      case 0xc1 :
      case 0xc2 :
      case 0xc3 :
      case 0xc4 :
      case 0xc5 :
      case 0xc6 :
      case 199 :
      case 200 :
      case 0xc9 :
      case 0xca :
      case 0xcb :
      case 0xcc :
      case 0xcd :
      case 0xce :
      case 0xcf :
      case 0xd0 :
      case 0xd1 :
      case 0xd2 :
      case 0xd3 :
      case 0xd4 :
      case 0xd5 :
      case 0xd6 :
      case 0xd7 :
      case 0xd8 :
      case 0xd9 :
      case 0xda :
      case 0xdb :
      case 0xdc :
      case 0xdd :
      case 0xde :
      case 0xdf :
      case 0xe0 :
      case 0xe1 :
      case 0xe2 :
      case 0xe3 :
      case 0xe4 :
      case 0xe5 :
      case 0xe6 :
      case 0xe7 :
      case 0xe8 :
      case 0xe9 :
      case 0xea :
      case 0xeb :
      case 0xec :
      case 0xed :
      case 0xee :
      case 0xef :
      case 0xf0 :
      case 0xf1 :
      case 0xf2 :
      case 0xf3 :
      case 0xf4 :
      case 0xf5 :
      case 0xf6 :
      case 0xf7 :
      case 0xf8 :
      case 0xf9 :
      case 0xfa :
      case 0xfb :
      case 0xfc :
      case 0xfd :
      case 0xfe :
      case 0xff :
        break;
      case 0x20 :
        iVar2 = _fputs(s_SCENARIOLOADED_00632998, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        FUN_00548e23(param_1, local_108);
        break;
      case 0x40 :
        iVar2 = _fputs(s_RANDOMTURN_006329a8, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_denominator=%d_006329b4, s32(local_108, 0xc));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        FUN_00548e23(param_1, local_108);
        break;
      case 0x80 :
        iVar2 = _fputs(s_NOSCHISM_006329c4, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_defender=%s_006329d0, s32(local_108, 8));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        FUN_00548e23(param_1, local_108);
        break;
      case 0x100 :
        iVar2 = _fputs(s_RECEIVEDTECHNOLOGY_006329e0, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_technology=%d_006329f4, s32(local_108, 0xd));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        _sprintf(DAT_fffffefc, s_receiver=%s_00632a04, s32(local_108, 8));
        iVar2 = _fputs(DAT_fffffefc, param_1);
        if ((iVar2 === -1)) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
    }
    iVar2 = _fputs(s_@ENDIF_00632a14, param_1);
    if ((iVar2 === -1)) {
      return;
    }
    local_108 = s32(local_108, 0x6f);
  } /* goto */ ( true );
}


 export function FUN_0054a4c4 ()

 {
  let iVar1;
  let pcVar2;
  let local_228;
  let local_224;
  let local_220;
  let local_21c;
  let local_118;
  let local_108;

  local_224 = 0;
  local_220 = 0;
  FUN_005f22d0(DAT_fffffee8, s_EVENTS._00632a20);
  FUN_005f22e0(DAT_fffffee8, DAT_0062cd24);
  local_228 = 0;
  __getcwd(DAT_fffffde4, 0x104);
  __chdir(DAT_0064bb08);
  iVar1 = FUN_00415133(s_EVENTS.BAK_00632a28);
  if ((iVar1 === 0)) {
    local_224 = FUN_0041508c(s_EVENTS.BAK_00632a50, DAT_00632a4c);
    local_220 = FUN_0041508c(DAT_fffffee8, DAT_00632a5c);
    if ((local_220 !== 0)) {
      if ((local_224 === 0)) {
        iVar1 = _fputs(s_@BEGINEVENTS_00632a70, local_220);
        if ((iVar1 === -1)) {
        do {
          pcVar2 = _fgets(DAT_fffffef8, 0x100, local_224);
          if ((iVar1 === -1)) {
        iVar1 = _fputs(s_@ENDEVENTS_00632a98, local_220);
        if ((iVar1 !== -1)) {
 LAB_0054a7e1: :
          local_228 = 1;
        }
      }
      else {
        do {
          pcVar2 = _fgets(DAT_fffffef8, 0x100, local_224);
          if ((pcVar2 === 0)) {
          pcVar2 = _fgets(DAT_fffffef8, 0x100, local_224);
          if ((pcVar2 === 0)) {
    _fclose(local_224);
  }
  if ((local_220 !== 0)) {
    _fclose(local_220);
  }
  __chdir(DAT_fffffde4);
  return local_228;
}


 export function FUN_0054a874 (param_1, param_2)

 {
  let bVar1;
  let local_8;

  local_8 = 0;
  do {
    if ((local_8 === 0)) {
      local_8 = 1;
    }
    else {
      local_8 = (local_8 << 1);
    }
    ((param_2 & local_8) === 0) (; param_2 = (param_2 & local_8); local_8 = (local_8 << 1)) {
    }
    bVar1 = (param_1 !== 0);
    param_1 = (param_1 + -1);
  } while (bVar1)


 export function FUN_0054a8d3 (param_1, param_2)

 {
  let local_8;

  local_8 = 0;
  while ((param_1 !== 0)) {
    if (((param_2 & param_1) !== 0)) {
      local_8 = (local_8 + 1);
    }
  }
  return local_8;
}


 export function FUN_0054a912 (param_1, param_2, param_3)

 {
  let uVar1;
  let unaff_FS_OFFSET;
  let iVar2;
  let uVar3;
  let local_318;
  let local_310;
  let local_30c;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0054adad;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_0059db08(0x4000);
  local_8 = 0;
  FUN_0040bc40(0x1001);
  FUN_0059e6a9(param_2);
  FUN_0059e6ff(0xdc);
  FUN_0059e5c9(8, 0xdc, 0);
  /* switch */ () {
  case 0 :
    if ((param_1 === 0)) {
      param_1 = 1;
    }
    (local_30c < 8) (local_30c = 1; local_30c = (local_30c < 8); local_30c = (local_30c + 1)) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00493c7d(local_30c, local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 1 :
    (local_30c < 0x3e) (local_30c = 0; local_30c = (local_30c < 0x3e); local_30c = (local_30c + 1)) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00428b0c(s32((DAT_0064b1b8 + local_30c * 0x14), 0), local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 2 :
    (local_310 < 0x64) (local_310 = 0; local_310 = (local_310 < 0x64); local_310 = (local_310 + 1)) {
      uVar3 = 0;
      iVar2 = local_310;
      uVar1 = FUN_00428b0c(s32((DAT_00627684 + local_310 * 0x10), 0), local_310, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 3 :
    FUN_0059edf0(s_ANYUNIT_00632adc, -2, 0);
    (local_30c < 0x3e) (local_30c = 0; local_30c = (local_30c < 0x3e); local_30c = (local_30c + 1)) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00428b0c(s32((DAT_0064b1b8 + local_30c * 0x14), 0), local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 4 :
    if ((param_1 === 0)) {
      param_1 = -2;
    }
    FUN_0059edf0(s_ANYBODY_00632aa4, -2, 0);
    (local_30c < 8) (local_30c = 1; local_30c = (local_30c < 8); local_30c = (local_30c + 1)) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00493c7d(local_30c, local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 5 :
    if ((param_1 === 0)) {
      param_1 = -3;
    }
    FUN_0059edf0(s_TRIGGERATTACKER_00632aac, -3, 0);
    FUN_0059edf0(s_TRIGGERDEFENDER_00632abc, -4, 0);
    (local_30c < 8) (local_30c = 1; local_30c = (local_30c < 8); local_30c = (local_30c + 1)) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00493c7d(local_30c, local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 6 :
    if ((param_1 === 0)) {
      param_1 = -4;
    }
    FUN_0059edf0(s_TRIGGERRECEIVER_00632acc, -4, 0);
    (local_30c < 8) (local_30c = 1; local_30c = (local_30c < 8); local_30c = (local_30c + 1)) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00493c7d(local_30c, local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 7 :
    (local_14 < 0xb) (local_14 = 0; local_14 = (local_14 < 0xb); local_14 = (local_14 + 1)) {
      uVar3 = 0;
      iVar2 = local_14;
      uVar1 = FUN_00428b0c(s32((DAT_00627cc4 + local_14 * 0x18), 0), local_14, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
  }
  FUN_0059ea99(param_1);
  if ((DAT_006a4f88 === 0)) {
    local_318 = 0;
  }
  else {
    local_318 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_318);
  FUN_0040bc80(0);
  FUN_0059d3c9(0);
  local_8 = -1;
  FUN_0054ada1();
  FUN_0054adb7();
  return;
}


 export function FUN_0054ada1 ()

 {
  FUN_0059df8a();
  return;
}


 export function FUN_0054adb7 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0054adc6 (param_1, param_2, param_3, param_4)

 {
  let uVar1;

  if ((param_3 === 0x100)) {
    param_1 = FUN_0054a912(param_1, param_2, 6);
    if ((param_1 !== -1)) {
      if ((param_1 < 0)) {
        w32(param_4, 0, s_TRIGGERRECEIVER_00632ae4);
      }
      else {
        uVar1 = FUN_00493c7d(param_1);
        w32(param_4, 0, uVar1);
      }
    }
  }
  else {
    param_1 = FUN_0054a912(param_1, param_2, 5);
    if ((param_1 !== -1)) {
      if ((param_1 < 0)) {
        if ((param_1 === -3)) {
          w32(param_4, 0, s_TRIGGERATTACKER_00632af4);
        }
        else {
          w32(param_4, 0, s_TRIGGERDEFENDER_00632b04);
        }
      }
      else {
        uVar1 = FUN_00493c7d(param_1);
        w32(param_4, 0, uVar1);
      }
    }
  }
  return param_1;
}


 export function FUN_0054ae93 ()

 {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10;
  let local_8;

  FUN_00453c80();
  local_8 = FUN_00551d50();
  if ((local_8 < 0)) {
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
  }
  else {
    FUN_00453c80();
    local_14 = DAT_0064b99c;
    while ((local_8 !== 0)) {
      local_14 = s32((local_14 + 0x1bc), 0);
      local_8 = (local_8 + -1);
    }
    if (((_MEM[local_14] & 0x20) === 0)) {
      FUN_00453c80();
    }
    else {
      FUN_00453c40();
    }
    if ((s32(local_14, 0) === 0x20)) {
      local_10 = 0;
      while ((((1 << (((local_10) & 0xFF) & 0x1f)) & (s32((local_14 + 4), 0) | -0x191)) !== 0)) {
        local_10 = (local_10 + 1);
      }
    }
    else {
      local_10 = 0;
      while (((s32((local_14 + 4), 0) & (1 << (((local_10) & 0xFF) & 0x1f))) !== 0)) {
        local_10 = (local_10 + 1);
      }
    }
    if (((_MEM[local_14] & 0x90) === 0)) {
      FUN_00453c80();
    }
    else {
      FUN_00453c40();
    }
    iVar1 = FUN_00551d50();
    if ((iVar1 < 0)) {
      FUN_00453c40();
      FUN_00453c40();
    }
    else {
      FUN_00453c80();
      uVar2 = FUN_0054a874(iVar1, s32((local_14 + 4), 0));
      if (((uVar2 & 0x3140) === 0)) {
        FUN_00453c80();
      }
      else {
        FUN_00453c40();
      }
    }
  }
  return;
}


 export function FUN_0054b0ed ()

 {
  let iVar1;
  let lpText;
  let lpCaption;
  let uType;
  let local_28;
  let local_24;

  if ((DAT_0062e014 === 0)) {
    FUN_004cef35();
    iVar1 = FUN_0054a4c4();
    if ((iVar1 === 0)) {
      _sprintf(DAT_ffffffdc, s_Error_updating_EVENTS.%s_00632b1c, DAT_0062cd24);
      uType = 0x10;
      lpCaption = s_File_I/O_Error_00632b38;
      lpText = DAT_ffffffdc;
      iVar1 = FUN_00414d10();
      FUN_006e7dd4(s32((iVar1 + 4), 0), lpText, lpCaption, uType);
    }
    DAT_006a1d7c = 0;
    DAT_006a4f88 = (DAT_006a4f88 + 0x48);
    FUN_004e4ceb();
  }
  else {
    if ((DAT_006a4f88 === 0)) {
      local_28 = 0;
    }
    else {
      local_28 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_28);
    FUN_004190d0(s_DEBUG_006359dc, s_NOTICE_00632b14);
    FUN_0059d3c9(0);
    DAT_0062e014 = 0;
    FUN_00548df0();
  }
  return;
}


 export function FUN_0054b1d5 (param_1)

 {
  let local_c;
  let local_8;

  /* switch */ () {
  case 0 :
    local_8 = s_HELPUNITKILLED_00632b48;
    break;
  case 1 :
    local_8 = s_HELPCITYTAKEN_00632b58;
    break;
  case 2 :
    local_8 = s_HELPTURN_00632b68;
    break;
  case 3 :
    local_8 = s_HELPTURNINTERVAL_00632b74;
    break;
  case 4 :
    local_8 = s_HELPNEGOTIATION_00632b88;
    break;
  case 5 :
    local_8 = s_HELPSCENARIOLOADED_00632b98;
    break;
  case 6 :
    local_8 = s_HELPRANDOMTURN_00632bac;
    break;
  case 7 :
    local_8 = s_HELPNOSCHISM_00632bbc;
    break;
  case 8 :
    local_8 = s_HELPRECEIVEDTECHNOLOGY_00632bcc;
  }
  if ((DAT_006a4f88 === 0)) {
    local_c = 0;
  }
  else {
    local_c = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_c);
  FUN_004190d0(DAT_00632be4, local_8);
  FUN_0059d3c9(0);
  FUN_00548df0();
  return;
}


 export function FUN_0054b2ec (param_1)

 {
  let local_c;
  let local_8;

  /* switch */ () {
  case 0 :
    local_8 = s_HELPTEXT_00632bec;
    break;
  case 1 :
    local_8 = s_HELPMOVEUNIT_00632bf8;
    break;
  case 2 :
    local_8 = s_HELPCREATEUNIT_00632c08;
    break;
  case 3 :
    local_8 = s_HELPCHANGEMONEY_00632c18;
    break;
  case 4 :
    local_8 = s_HELPPLAYWAVEFILE_00632c28;
    break;
  case 5 :
    local_8 = s_HELPMAKEAGGRESSION_00632c3c;
    break;
  case 6 :
    local_8 = s_HELPJUSTONCE_00632c50;
    break;
  case 7 :
    local_8 = s_HELPPLAYCDTRACK_00632c60;
    break;
  case 8 :
    local_8 = s_HELPDONTPLAYWONDERS_00632c70;
    break;
  case 9 :
    local_8 = s_HELPCHANGETERRAIN_00632c84;
    break;
  case 10 :
    local_8 = s_HELPDESTROYACIVILIZATION_00632c98;
    break;
  case 0xb :
    local_8 = s_HELPGIVETECHNOLOGY_00632cb4;
  }
  if ((DAT_006a4f88 === 0)) {
    local_c = 0;
  }
  else {
    local_c = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_c);
  FUN_004190d0(DAT_00632cc8, local_8);
  FUN_0059d3c9(0);
  FUN_00548df0();
  return;
}


 export function FUN_0054b433 ()

 {
  let iVar1;
  let local_20;
  let local_14;
  let local_10;
  let local_c;

  iVar1 = FUN_00551d50();
  if ((iVar1 < 0)) {
    local_c = FUN_00551d50();
    if ((local_c < 0)) {
      if ((DAT_006a4f88 === 0)) {
        local_20 = 0;
      }
      else {
        local_20 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_20);
      FUN_004190d0(DAT_00632cd8, s_EVENTS_00632cd0);
      FUN_0059d3c9(0);
      FUN_00548df0();
    }
    else {
      local_14 = DAT_0064b99c;
      while ((local_c !== 0)) {
        local_14 = s32(local_14, 0x6f);
        local_c = (local_c + -1);
      }
      local_10 = s32(local_14, 0);
      local_c = 0;
      ((local_10 & 1) === 0) (; local_10 = (local_10 & 1); local_10 = (local_10 >>> 1)) {
        local_c = (local_c + 1);
      }
      if ((local_14 !== 0)) {
        FUN_0054b1d5(local_c);
      }
    }
  }
  else {
    local_c = FUN_00551d50();
    local_14 = DAT_0064b99c;
    while ((local_c !== 0)) {
      local_14 = s32(local_14, 0x6f);
      local_c = (local_c + -1);
    }
    local_10 = FUN_0054a874(iVar1, s32(local_14, 1));
    local_c = 0;
    ((local_10 & 1) === 0) (; local_10 = (local_10 & 1); local_10 = (local_10 >>> 1)) {
      local_c = (local_c + 1);
    }
    if ((local_14 !== 0)) {
      FUN_0054b2ec(local_c);
    }
  }
  return;
}


 export function FUN_0054b5eb ()

 {
  FUN_004fa5d9(0xc350);
  FUN_004ce98e(DAT_0064b690, DAT_00632578);
  DAT_006a1d7c = 0;
  DAT_006a4f88 = (DAT_006a4f88 + 0x48);
  return;
}


 export function FUN_0054b635 ()

 {
  let uVar1;
  let uVar2;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;
  let local_104;

  local_108 = 0;
  FUN_00419060();
  (local_10c !== 0) (local_10c = DAT_0064b99c; local_10c = (local_10c !== 0); local_10c = s32(local_10c, 0x6f)) {
    local_108 = (local_108 + 1);
    uVar1 = s32(local_10c, 0);
    if ((uVar1 < 9)) {
      if ((uVar1 === 8)) {
        _sprintf(DAT_fffffefc, s_%d)_TURNINTERVAL_(%d)_00632d68, local_108, s32(local_10c, 0xb));
      }
      else if ((uVar1 === 1)) {
        if ((s32(local_10c, 8) === 0)) {
          _sprintf(DAT_fffffefc, s_%d)_UNITKILLED_00632d0c, local_108);
        }
        else {
          _sprintf(DAT_fffffefc, s_%d)_UNITKILLED_(%s_attacker=%s_d_00632ce0, local_108, s32(local_10c, 2), s32(local_10c, 5), s32(local_10c, 8));
        }
      }
      else if ((uVar1 === 2)) {
        if ((s32(local_10c, 8) === 0)) {
          _sprintf(DAT_fffffefc, s_%d)_CITYTAKEN_00632d48, local_108);
        }
        else {
          _sprintf(DAT_fffffefc, s_%d)_CITYTAKEN_(%s_attacker=%s_de_00632d1c, local_108, s32(local_10c, 4), s32(local_10c, 5), s32(local_10c, 8));
        }
      }
      else if ((uVar1 === 4)) {
        _sprintf(DAT_fffffefc, s_%d)_TURN_(%d)_00632d58, local_108, s32(local_10c, 0xb));
      }
    }
    else {
      /* switch */ () {
      case 0x10 :
        if ((s32(local_10c, 8) === 0)) {
          _sprintf(DAT_fffffefc, s_%d)_NEGOTIATION_00632dfc, local_108);
        }
        else {
          if ((s32(local_10c, 0xa) === 1)) {
            local_110 = s_HUMAN_00632d80;
          }
          else if ((s32(local_10c, 0xa) === 2)) {
            local_110 = s_COMPUTER_00632d88;
          }
          else {
            local_110 = s_HUMANORCOMPUTER_00632d94;
          }
          if ((s32(local_10c, 7) === 1)) {
            local_114 = s_HUMAN_00632da4;
          }
          else if ((s32(local_10c, 7) === 2)) {
            local_114 = s_COMPUTER_00632dac;
          }
          else {
            local_114 = s_HUMANORCOMPUTER_00632db8;
          }
          _sprintf(DAT_fffffefc, s_%d)_NEGOTIATION_(talker=%s_(%s)_l_00632dc8, local_108, s32(local_10c, 5), local_114, s32(local_10c, 8), local_110);
        }
        break;
      case 0x11 :
      case 0x12 :
      case 0x13 :
      case 0x14 :
      case 0x15 :
      case 0x16 :
      case 0x17 :
      case 0x18 :
      case 0x19 :
      case 0x1a :
      case 0x1b :
      case 0x1c :
      case 0x1d :
      case 0x1e :
      case 0x1f :
      case 0x21 :
      case 0x22 :
      case 0x23 :
      case 0x24 :
      case 0x25 :
      case 0x26 :
      case 0x27 :
      case 0x28 :
      case 0x29 :
      case 0x2a :
      case 0x2b :
      case 0x2c :
      case 0x2d :
      case 0x2e :
      case 0x2f :
      case 0x30 :
      case 0x31 :
      case 0x32 :
      case 0x33 :
      case 0x34 :
      case 0x35 :
      case 0x36 :
      case 0x37 :
      case 0x38 :
      case 0x39 :
      case 0x3a :
      case 0x3b :
      case 0x3c :
      case 0x3d :
      case 0x3e :
      case 0x3f :
      case 0x41 :
      case 0x42 :
      case 0x43 :
      case 0x44 :
      case 0x45 :
      case 0x46 :
      case 0x47 :
      case 0x48 :
      case 0x49 :
      case 0x4a :
      case 0x4b :
      case 0x4c :
      case 0x4d :
      case 0x4e :
      case 0x4f :
      case 0x50 :
      case 0x51 :
      case 0x52 :
      case 0x53 :
      case 0x54 :
      case 0x55 :
      case 0x56 :
      case 0x57 :
      case 0x58 :
      case 0x59 :
      case 0x5a :
      case 0x5b :
      case 0x5c :
      case 0x5d :
      case 0x5e :
      case 0x5f :
      case 0x60 :
      case 0x61 :
      case 0x62 :
      case 99 :
      case 100 :
      case 0x65 :
      case 0x66 :
      case 0x67 :
      case 0x68 :
      case 0x69 :
      case 0x6a :
      case 0x6b :
      case 0x6c :
      case 0x6d :
      case 0x6e :
      case 0x6f :
      case 0x70 :
      case 0x71 :
      case 0x72 :
      case 0x73 :
      case 0x74 :
      case 0x75 :
      case 0x76 :
      case 0x77 :
      case 0x78 :
      case 0x79 :
      case 0x7a :
      case 0x7b :
      case 0x7c :
      case 0x7d :
      case 0x7e :
      case 0x7f :
      case 0x81 :
      case 0x82 :
      case 0x83 :
      case 0x84 :
      case 0x85 :
      case 0x86 :
      case 0x87 :
      case 0x88 :
      case 0x89 :
      case 0x8a :
      case 0x8b :
      case 0x8c :
      case 0x8d :
      case 0x8e :
      case 0x8f :
      case 0x90 :
      case 0x91 :
      case 0x92 :
      case 0x93 :
      case 0x94 :
      case 0x95 :
      case 0x96 :
      case 0x97 :
      case 0x98 :
      case 0x99 :
      case 0x9a :
      case 0x9b :
      case 0x9c :
      case 0x9d :
      case 0x9e :
      case 0x9f :
      case 0xa0 :
      case 0xa1 :
      case 0xa2 :
      case 0xa3 :
      case 0xa4 :
      case 0xa5 :
      case 0xa6 :
      case 0xa7 :
      case 0xa8 :
      case 0xa9 :
      case 0xaa :
      case 0xab :
      case 0xac :
      case 0xad :
      case 0xae :
      case 0xaf :
      case 0xb0 :
      case 0xb1 :
      case 0xb2 :
      case 0xb3 :
      case 0xb4 :
      case 0xb5 :
      case 0xb6 :
      case 0xb7 :
      case 0xb8 :
      case 0xb9 :
      case 0xba :
      case 0xbb :
      case 0xbc :
      case 0xbd :
      case 0xbe :
      case 0xbf :
      case 0xc0 :
      case 0xc1 :
      case 0xc2 :
      case 0xc3 :
      case 0xc4 :
      case 0xc5 :
      case 0xc6 :
      case 199 :
      case 200 :
      case 0xc9 :
      case 0xca :
      case 0xcb :
      case 0xcc :
      case 0xcd :
      case 0xce :
      case 0xcf :
      case 0xd0 :
      case 0xd1 :
      case 0xd2 :
      case 0xd3 :
      case 0xd4 :
      case 0xd5 :
      case 0xd6 :
      case 0xd7 :
      case 0xd8 :
      case 0xd9 :
      case 0xda :
      case 0xdb :
      case 0xdc :
      case 0xdd :
      case 0xde :
      case 0xdf :
      case 0xe0 :
      case 0xe1 :
      case 0xe2 :
      case 0xe3 :
      case 0xe4 :
      case 0xe5 :
      case 0xe6 :
      case 0xe7 :
      case 0xe8 :
      case 0xe9 :
      case 0xea :
      case 0xeb :
      case 0xec :
      case 0xed :
      case 0xee :
      case 0xef :
      case 0xf0 :
      case 0xf1 :
      case 0xf2 :
      case 0xf3 :
      case 0xf4 :
      case 0xf5 :
      case 0xf6 :
      case 0xf7 :
      case 0xf8 :
      case 0xf9 :
      case 0xfa :
      case 0xfb :
      case 0xfc :
      case 0xfd :
      case 0xfe :
      case 0xff :
        break;
      case 0x20 :
        _sprintf(DAT_fffffefc, s_%d)_SCENARIOLOADED_00632e0c, local_108);
        break;
      case 0x40 :
        if ((s32(local_10c, 0xc) === 0)) {
          _sprintf(DAT_fffffefc, s_%d)_RANDOMTURN_00632e40, local_108);
        }
        else {
          _sprintf(DAT_fffffefc, s_%d)_RANDOMTURN_(denominator=%d)_00632e20, local_108, s32(local_10c, 0xc));
        }
        break;
      case 0x80 :
        if ((s32(local_10c, 8) === 0)) {
          _sprintf(DAT_fffffefc, s_%d)_NOSCHISM_00632e64, local_108);
        }
        else {
          _sprintf(DAT_fffffefc, s_%d)_NOSCHISM_(%s)_00632e50, local_108, s32(local_10c, 8));
        }
        break;
      case 0x100 :
        if ((s32(local_10c, 8) === 0)) {
          _sprintf(DAT_fffffefc, s_%d)_RECEIVEDTECHNOLOGY_00632e98, local_108);
        }
        else {
          uVar2 = FUN_00428b0c(s32((DAT_00627684 + s32(local_10c, 0xd) * 0x10), 0), s32(local_10c, 8));
          _sprintf(DAT_fffffefc, s_%d)_RECEIVEDTECHNOLOGY_(%s_whom=_00632e74, local_108, uVar2);
        }
      }
    }
    FUN_00419020(DAT_fffffefc);
  }
  FUN_0054ae93(0);
  return;
}


 export function FUN_0054bc1a ()

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let bVar4;
  let local_11c;
  let local_10c;
  let local_108;
  let local_104;

  local_108 = FUN_00551d50();
  local_10c = DAT_0064b99c;
  while (bVar4) {
    local_10c = s32((local_10c + 0x1bc), 0);
  }
  FUN_00419060();
  local_108 = 1;
  if ((local_10c !== 0)) {
    do {
      local_104 = 0;
      uVar2 = (s32((local_10c + 4), 0) & local_108);
      if ((uVar2 < 9)) {
        if ((uVar2 === 8)) {
          if ((s32((local_10c + 0x174), 0) === 0)) {
            _sprintf(DAT_fffffefc, s_CHANGEMONEY_00632f50);
          }
          else {
            _sprintf(DAT_fffffefc, s_CHANGEMONEY_(receiver=%s_amount=_00632f2c, s32((local_10c + 0x174), 0), s32((local_10c + 0x17c), 0));
          }
        }
        else if ((uVar2 === 1)) {
          if ((s32((local_10c + 0x38), 0) === 0)) {
            _sprintf(DAT_fffffefc, DAT_00632ebc);
          }
          else {
            _sprintf(DAT_fffffefc, s_TEXT_(%s)_00632eb0, s32((local_10c + 0x38), 0));
          }
        }
        else if ((uVar2 === 2)) {
          if ((s32((local_10c + 0x88), 0) === 0)) {
            _sprintf(DAT_fffffefc, s_MOVEUNIT_00632edc);
          }
          else {
            _sprintf(DAT_fffffefc, s_MOVEUNIT_(%s_owner=%s)_00632ec4, s32((local_10c + 0x90), 0), s32((local_10c + 0x88), 0));
          }
        }
        else if ((uVar2 === 4)) {
          if ((s32((local_10c + 0x13c), 0) === 0)) {
            _sprintf(DAT_fffffefc, s_CREATEUNIT_00632f20);
          }
          else {
            _sprintf(DAT_fffffefc, s_CREATEUNIT_(%s_owner=%s_veteran=_00632ef0, s32((local_10c + 0xdc), 0), s32((local_10c + 0xd4), 0), (DAT_00632ee8 + ((u8((s32((local_10c + 0x138), 0) !== 0)) - 1) & 4)), s32((local_10c + 0x13c), 0));
          }
        }
      }
      else if ((uVar2 < 0x21)) {
        if ((uVar2 === 0x20)) {
          if ((s32((local_10c + 0xc4), 0) === 0)) {
            _sprintf(DAT_fffffefc, s_MAKEAGGRESSION_00632fa8);
          }
          else {
            _sprintf(DAT_fffffefc, s_MAKEAGGRESSION_(aggressor=%s_vic_00632f80, s32((local_10c + 0xcc), 0), s32((local_10c + 0xc4), 0));
          }
        }
        else if ((uVar2 === 0x10)) {
          if ((s32((local_10c + 0x184), 0) === 0)) {
            _sprintf(DAT_fffffefc, s_PLAYWAVEFILE_00632f70);
          }
          else {
            _sprintf(DAT_fffffefc, s_PLAYWAVEFILE_(%s)_00632f5c, s32((local_10c + 0x184), 0));
          }
        }
      }
      else if ((uVar2 < 0x81)) {
        if ((uVar2 === 0x80)) {
          if ((s32((local_10c + 0x188), 0) === 0)) {
            _sprintf(DAT_fffffefc, s_PLAYCDTRACK_00632fe8);
          }
          else {
            _sprintf(DAT_fffffefc, s_PLAYCDTRACK_(%d)_00632fd4, s32((local_10c + 0x188), 0));
          }
        }
        else if ((uVar2 === 0x40)) {
          _sprintf(DAT_fffffefc, s_JUSTONCE_00632fb8);
        }
      }
      else if ((uVar2 < 0x201)) {
        if ((uVar2 === 0x200)) {
          uVar3 = FUN_00428b0c(s32((DAT_00627cc4 + s32((local_10c + 0x18c), 0) * 0x18), 0));
          _sprintf(DAT_fffffefc, s_CHANGETERRAIN_(%s)_00633004, uVar3);
        }
        else if ((uVar2 === 0x100)) {
          _sprintf(DAT_fffffefc, s_DONTPLAYWONDERS_00632ff4);
        }
      }
      else if ((uVar2 === 0x400)) {
        if ((s32((local_10c + 0x1b0), 0) < 0)) {
          if (((_MEM[(local_10c + 1)] & 1) === 0)) {
            if ((s32((local_10c + 0x1b0), 0) === -3)) {
              _sprintf(DAT_fffffefc, s_DESTROYACIVILIZATION_(TRIGGERATT_0063305c);
            }
            else {
              _sprintf(DAT_fffffefc, s_DESTROYACIVILIZATION_(TRIGGERDEF_00633084);
            }
          }
          else {
            _sprintf(DAT_fffffefc, s_DESTROYACIVILIZATION_(TRIGGERREC_00633034);
          }
        }
        else {
          uVar3 = FUN_00493c7d(s32((local_10c + 0x1b0), 0));
          _sprintf(DAT_fffffefc, s_DESTROYACIVILIZATION_(%s)_00633018, uVar3);
        }
      }
      else if ((uVar2 === 0x800)) {
        if ((s32((local_10c + 0x1b8), 0) === 0)) {
          _sprintf(DAT_fffffefc, s_GIVETECHNOLOGY_00633134);
        }
        else if ((s32((local_10c + 0x1b8), 0) < 0)) {
          if (((_MEM[(local_10c + 1)] & 1) === 0)) {
            if ((s32((local_10c + 0x1b8), 0) === -3)) {
              _sprintf(DAT_fffffee4, s_TRIGGERATTACKER_006330e8);
            }
            else {
              _sprintf(DAT_fffffee4, s_TRIGGERDEFENDER_006330f8);
            }
          }
          else {
            _sprintf(DAT_fffffee4, s_TRIGGERRECEIVER_006330d8);
          }
          uVar3 = FUN_00428b0c(s32((DAT_00627684 + s32((local_10c + 0x1b4), 0) * 0x10), 0));
          _sprintf(DAT_fffffefc, s_GIVETECHNOLOGY_(receiver=%s_tech_00633108, DAT_fffffee4, uVar3);
        }
        else {
          uVar3 = FUN_00428b0c(s32((DAT_00627684 + s32((local_10c + 0x1b4), 0) * 0x10), 0));
          uVar3 = FUN_00493c7d(s32((local_10c + 0x1b8), 0), uVar3);
          _sprintf(DAT_fffffefc, s_GIVETECHNOLOGY_(receiver=%s_tech_006330ac, uVar3);
        }
      }
      else if ((uVar2 === 0x2000)) {
        _sprintf(DAT_fffffefc, s_HASTRIGGERED_00632fc4);
      }
      if ((UNNAMED !== 0)) {
        FUN_00419020(DAT_fffffefc);
      }
      local_108 = (local_108 << 1);
    } while ((local_108 !== 0x8000))


 export function FUN_0054c36e ()

 {
  let iVar1;
  let local_14;
  let local_10;
  let local_c;

  if ((DAT_006a4f88 === 0)) {
    local_14 = 0;
  }
  else {
    local_14 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_14);
  iVar1 = FUN_00421ea0(s_DELETEITEM_00633144);
  if ((iVar1 !== 0)) {
    iVar1 = FUN_00551d50();
    local_c = iVar1;
    (local_10 !== 0) (local_10 = DAT_0064b99c; local_10 = (local_10 !== 0); local_10 = s32((local_10 + 0x1bc), 0)) {
      if ((local_c === 0)) {
      w32((s32((local_10 + 0x1c0), 0) + 0x1bc), 0, s32((local_10 + 0x1bc), 0));
    }
    if ((s32((local_10 + 0x1bc), 0) !== 0)) {
      w32((s32((local_10 + 0x1bc), 0) + 0x1c0), 0, s32((local_10 + 0x1c0), 0));
    }
    if ((iVar1 === 0)) {
      DAT_0064b99c = s32((local_10 + 0x1bc), 0);
    }
    FUN_004cef35();
    FUN_0054b635();
    FUN_0054bc1a(0);
  }
  FUN_0059d3c9(0);
  FUN_00548df0();
  return;
}


 export function FUN_0054c4a1 ()

 {
  let sVar1;
  let iVar2;
  let uVar3;
  let uVar4;
  let bVar5;
  let local_148;
  let local_144;
  let local_140;
  let local_13c;
  let local_138;
  let local_134;
  let local_130;
  let local_128;
  let local_124;
  let local_120;
  let local_11c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_124 = 0;
  if ((DAT_006a4f88 === 0)) {
    local_128 = 0;
  }
  else {
    local_128 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_128);
  local_10 = FUN_00551d50();
  local_120 = DAT_0064b99c;
  local_18 = local_10;
  while (bVar5) {
    local_120 = s32(local_120, 0x6f);
  }
  uVar4 = s32(local_120, 0);
  if ((uVar4 < 9)) {
    if ((uVar4 === 8)) {
      if ((DAT_006a4f88 === 0)) {
        local_138 = 0;
      }
      else {
        local_138 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_138);
      local_c = FUN_0051d75d(s_DEBUG_006359dc, s_TURNINTERVAL_00633194, s32(local_120, 0xb), DAT_ffffffec);
      if ((DAT_006a4f88 === 0)) {
        local_13c = 0;
      }
      else {
        local_13c = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_13c);
      if ((local_c === 0)) {
        uVar4 = FUN_004cdf4b(local_14, 0, 0x7fff);
        w32(local_120, 0xb, uVar4);
        local_124 = 1;
      }
    }
    else if ((uVar4 === 1)) {
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x890), 0), 1);
      local_c = FUN_0054a912(s32(local_120, 3), uVar3);
      if ((local_c !== -1)) {
        if ((local_c < 0)) {
          w32(local_120, 3, -2);
          local_8 = s_ANYUNIT_00633150;
        }
        else {
          w32(local_120, 3, local_c);
          local_8 = FUN_00428b0c(s32((DAT_0064b1b8 + s32(local_120, 3) * 0x14), 0))
          ;
        }
        sVar1 = _strlen(local_8);
        uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
        w32(local_120, 2, uVar4);
        if ((s32(local_120, 2) !== 0)) {
          FUN_005f22d0(s32(local_120, 2), local_8);
          uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x894), 0), 4);
          local_c = FUN_0054a912(s32(local_120, 6), uVar3);
          if ((local_c !== -1)) {
            if ((local_c < 0)) {
              w32(local_120, 6, -2);
              local_8 = s_ANYBODY_00633158;
            }
            else {
              w32(local_120, 6, local_c);
              local_8 = FUN_00493c7d(s32(local_120, 6));
            }
            sVar1 = _strlen(local_8);
            uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
            w32(local_120, 5, uVar4);
            if ((s32(local_120, 5) !== 0)) {
              FUN_005f22d0(s32(local_120, 5), local_8);
              uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x898), 0), 4);
              local_c = FUN_0054a912(s32(local_120, 9), uVar3);
              if ((local_c !== -1)) {
                if ((local_c < 0)) {
                  w32(local_120, 9, -2);
                  local_8 = s_ANYBODY_00633160;
                }
                else {
                  w32(local_120, 9, local_c);
                  local_8 = FUN_00493c7d(s32(local_120, 9));
                }
                sVar1 = _strlen(local_8);
                uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
                w32(local_120, 8, uVar4);
                if ((s32(local_120, 8) !== 0)) {
                  FUN_005f22d0(s32(local_120, 8), local_8);
                  local_124 = 1;
                }
              }
            }
          }
        }
      }
    }
    else if ((uVar4 === 2)) {
      do {
        if ((s32(local_120, 4) === 0)) {
          w32(local_120, 4, DAT_00633168);
        }
        if ((DAT_006a4f88 === 0)) {
          local_130 = 0;
        }
        else {
          local_130 = (DAT_006a4f88 + 0x48);
        }
        FUN_0059d3c9(local_130);
        local_c = FUN_0051d63b(s_DEBUG_006359dc, s_CITYNAME_0063316c, 0x17, s32(local_120, 4), DAT_fffffee4);
        FUN_0059d3c9(0);
      } while ((iVar2 === 0)) {
        sVar1 = _strlen(DAT_fffffee4);
        uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
        w32(local_120, 4, uVar4);
        if ((s32(local_120, 4) !== 0)) {
          FUN_005f22d0(s32(local_120, 4), DAT_fffffee4);
          uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x894), 0), 4);
          local_c = FUN_0054a912(s32(local_120, 6), uVar3);
          if ((local_c !== -1)) {
            if ((local_c < 0)) {
              w32(local_120, 6, -2);
              local_8 = s_ANYBODY_00633178;
            }
            else {
              w32(local_120, 6, local_c);
              local_8 = FUN_00493c7d(s32(local_120, 6));
            }
            sVar1 = _strlen(local_8);
            uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
            w32(local_120, 5, uVar4);
            if ((s32(local_120, 5) !== 0)) {
              FUN_005f22d0(s32(local_120, 5), local_8);
              uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x898), 0), 4);
              local_c = FUN_0054a912(s32(local_120, 9), uVar3);
              if ((local_c !== -1)) {
                if ((local_c < 0)) {
                  w32(local_120, 9, -2);
                  local_8 = s_ANYBODY_00633180;
                }
                else {
                  w32(local_120, 9, local_c);
                  local_8 = FUN_00493c7d(s32(local_120, 9));
                }
                sVar1 = _strlen(local_8);
                uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
                w32(local_120, 8, uVar4);
                if ((s32(local_120, 8) !== 0)) {
                  FUN_005f22d0(s32(local_120, 8), local_8);
                  local_124 = 1;
                }
              }
            }
          }
        }
      }
    }
    else if ((uVar4 === 4)) {
      if ((DAT_006a4f88 === 0)) {
        local_134 = 0;
      }
      else {
        local_134 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_134);
      local_c = FUN_0051d75d(s_DEBUG_006359dc, s_TURNCOUNT_00633188, s32(local_120, 0xb), DAT_ffffffec);
      FUN_0059d3c9(0);
      if ((local_c === 0)) {
        uVar4 = FUN_004cdf4b(local_14, -1, 0x7fff);
        w32(local_120, 0xb, uVar4);
        local_124 = 1;
      }
    }
  }
  else {
    /* switch */ () {
    case 0x10 :
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x89c), 0), 4);
      local_c = FUN_0054a912(s32(local_120, 6), uVar3);
      if ((local_c !== -1)) {
        if ((local_c < 0)) {
          w32(local_120, 6, -2);
          local_8 = s_ANYBODY_006331a4;
        }
        else {
          w32(local_120, 6, local_c);
          local_8 = FUN_00493c7d(s32(local_120, 6));
        }
        sVar1 = _strlen(local_8);
        uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
        w32(local_120, 5, uVar4);
        if ((s32(local_120, 5) !== 0)) {
          FUN_005f22d0(s32(local_120, 5), local_8);
          if ((s32(local_120, 7) === 1)) {
            local_c = 0;
          }
          else if ((s32(local_120, 7) === 2)) {
            local_c = 1;
          }
          else {
            local_c = 2;
          }
          if ((DAT_006a4f88 === 0)) {
            local_140 = 0;
          }
          else {
            local_140 = (DAT_006a4f88 + 0x48);
          }
          FUN_0059d3c9(local_140);
          local_c = FUN_0051d3e0(s_DEBUG_006359dc, s_TALKERTYPE_006331ac, local_c, 0, 0, 0, 1);
          FUN_0059d3c9(0);
          if ((-1 < local_c)) {
            if ((local_c === 0)) {
              w32(local_120, 7, 1);
            }
            else if ((local_c === 1)) {
              w32(local_120, 7, 2);
            }
            else {
              w32(local_120, 7, 4);
            }
            uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8a0), 0), 4);
            local_c = FUN_0054a912(s32(local_120, 9), uVar3);
            if ((local_c !== -1)) {
              if ((local_c < 0)) {
                w32(local_120, 9, -2);
                local_8 = s_ANYBODY_006331b8;
              }
              else {
                w32(local_120, 9, local_c);
                local_8 = FUN_00493c7d(s32(local_120, 9));
              }
              sVar1 = _strlen(local_8);
              uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
              w32(local_120, 8, uVar4);
              if ((s32(local_120, 8) !== 0)) {
                FUN_005f22d0(s32(local_120, 8), local_8);
                if ((s32(local_120, 0xa) === 1)) {
                  local_c = 0;
                }
                else if ((s32(local_120, 0xa) === 2)) {
                  local_c = 1;
                }
                else {
                  local_c = 2;
                }
                if ((DAT_006a4f88 === 0)) {
                  local_144 = 0;
                }
                else {
                  local_144 = (DAT_006a4f88 + 0x48);
                }
                FUN_0059d3c9(local_144);
                local_c = FUN_0051d3e0(s_DEBUG_006359dc, s_TALKERTYPE_006331c0, local_c, 0, 0, 0, 1)
                ;
                FUN_0059d3c9(0);
                if ((-1 < local_c)) {
                  if ((local_c === 0)) {
                    w32(local_120, 0xa, 1);
                  }
                  else if ((local_c === 1)) {
                    w32(local_120, 0xa, 2);
                  }
                  else {
                    w32(local_120, 0xa, 4);
                  }
                  local_124 = 1;
                }
              }
            }
          }
        }
      }
      break;
    case 0x11 :
    case 0x12 :
    case 0x13 :
    case 0x14 :
    case 0x15 :
    case 0x16 :
    case 0x17 :
    case 0x18 :
    case 0x19 :
    case 0x1a :
    case 0x1b :
    case 0x1c :
    case 0x1d :
    case 0x1e :
    case 0x1f :
    case 0x21 :
    case 0x22 :
    case 0x23 :
    case 0x24 :
    case 0x25 :
    case 0x26 :
    case 0x27 :
    case 0x28 :
    case 0x29 :
    case 0x2a :
    case 0x2b :
    case 0x2c :
    case 0x2d :
    case 0x2e :
    case 0x2f :
    case 0x30 :
    case 0x31 :
    case 0x32 :
    case 0x33 :
    case 0x34 :
    case 0x35 :
    case 0x36 :
    case 0x37 :
    case 0x38 :
    case 0x39 :
    case 0x3a :
    case 0x3b :
    case 0x3c :
    case 0x3d :
    case 0x3e :
    case 0x3f :
    case 0x41 :
    case 0x42 :
    case 0x43 :
    case 0x44 :
    case 0x45 :
    case 0x46 :
    case 0x47 :
    case 0x48 :
    case 0x49 :
    case 0x4a :
    case 0x4b :
    case 0x4c :
    case 0x4d :
    case 0x4e :
    case 0x4f :
    case 0x50 :
    case 0x51 :
    case 0x52 :
    case 0x53 :
    case 0x54 :
    case 0x55 :
    case 0x56 :
    case 0x57 :
    case 0x58 :
    case 0x59 :
    case 0x5a :
    case 0x5b :
    case 0x5c :
    case 0x5d :
    case 0x5e :
    case 0x5f :
    case 0x60 :
    case 0x61 :
    case 0x62 :
    case 99 :
    case 100 :
    case 0x65 :
    case 0x66 :
    case 0x67 :
    case 0x68 :
    case 0x69 :
    case 0x6a :
    case 0x6b :
    case 0x6c :
    case 0x6d :
    case 0x6e :
    case 0x6f :
    case 0x70 :
    case 0x71 :
    case 0x72 :
    case 0x73 :
    case 0x74 :
    case 0x75 :
    case 0x76 :
    case 0x77 :
    case 0x78 :
    case 0x79 :
    case 0x7a :
    case 0x7b :
    case 0x7c :
    case 0x7d :
    case 0x7e :
    case 0x7f :
    case 0x81 :
    case 0x82 :
    case 0x83 :
    case 0x84 :
    case 0x85 :
    case 0x86 :
    case 0x87 :
    case 0x88 :
    case 0x89 :
    case 0x8a :
    case 0x8b :
    case 0x8c :
    case 0x8d :
    case 0x8e :
    case 0x8f :
    case 0x90 :
    case 0x91 :
    case 0x92 :
    case 0x93 :
    case 0x94 :
    case 0x95 :
    case 0x96 :
    case 0x97 :
    case 0x98 :
    case 0x99 :
    case 0x9a :
    case 0x9b :
    case 0x9c :
    case 0x9d :
    case 0x9e :
    case 0x9f :
    case 0xa0 :
    case 0xa1 :
    case 0xa2 :
    case 0xa3 :
    case 0xa4 :
    case 0xa5 :
    case 0xa6 :
    case 0xa7 :
    case 0xa8 :
    case 0xa9 :
    case 0xaa :
    case 0xab :
    case 0xac :
    case 0xad :
    case 0xae :
    case 0xaf :
    case 0xb0 :
    case 0xb1 :
    case 0xb2 :
    case 0xb3 :
    case 0xb4 :
    case 0xb5 :
    case 0xb6 :
    case 0xb7 :
    case 0xb8 :
    case 0xb9 :
    case 0xba :
    case 0xbb :
    case 0xbc :
    case 0xbd :
    case 0xbe :
    case 0xbf :
    case 0xc0 :
    case 0xc1 :
    case 0xc2 :
    case 0xc3 :
    case 0xc4 :
    case 0xc5 :
    case 0xc6 :
    case 199 :
    case 200 :
    case 0xc9 :
    case 0xca :
    case 0xcb :
    case 0xcc :
    case 0xcd :
    case 0xce :
    case 0xcf :
    case 0xd0 :
    case 0xd1 :
    case 0xd2 :
    case 0xd3 :
    case 0xd4 :
    case 0xd5 :
    case 0xd6 :
    case 0xd7 :
    case 0xd8 :
    case 0xd9 :
    case 0xda :
    case 0xdb :
    case 0xdc :
    case 0xdd :
    case 0xde :
    case 0xdf :
    case 0xe0 :
    case 0xe1 :
    case 0xe2 :
    case 0xe3 :
    case 0xe4 :
    case 0xe5 :
    case 0xe6 :
    case 0xe7 :
    case 0xe8 :
    case 0xe9 :
    case 0xea :
    case 0xeb :
    case 0xec :
    case 0xed :
    case 0xee :
    case 0xef :
    case 0xf0 :
    case 0xf1 :
    case 0xf2 :
    case 0xf3 :
    case 0xf4 :
    case 0xf5 :
    case 0xf6 :
    case 0xf7 :
    case 0xf8 :
    case 0xf9 :
    case 0xfa :
    case 0xfb :
    case 0xfc :
    case 0xfd :
    case 0xfe :
    case 0xff :
      break;
    case 0x20 :
      local_124 = 1;
      break;
    case 0x40 :
      uVar4 = FUN_004cdf4b(s32(local_120, 0xc), 1, 0x3e8);
      w32(local_120, 0xc, uVar4);
      if ((DAT_006a4f88 === 0)) {
        local_148 = 0;
      }
      else {
        local_148 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_148);
      local_c = FUN_0051d75d(s_DEBUG_006359dc, s_RANDOMDENOM_006331cc, s32(local_120, 0xc), DAT_ffffffec)
      ;
      FUN_0059d3c9(0);
      if ((local_c === 0)) {
        uVar4 = FUN_004cdf4b(local_14, 1, 0x3e8);
        w32(local_120, 0xc, uVar4);
        local_124 = 1;
      }
      break;
    case 0x80 :
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8a4), 0), 4);
      local_c = FUN_0054a912(s32(local_120, 9), uVar3);
      if ((local_c !== -1)) {
        if ((local_c < 0)) {
          w32(local_120, 9, -2);
          local_8 = s_ANYBODY_006331d8;
        }
        else {
          w32(local_120, 9, local_c);
          local_8 = FUN_00493c7d(s32(local_120, 9));
        }
        sVar1 = _strlen(local_8);
        uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
        w32(local_120, 8, uVar4);
        if ((s32(local_120, 8) !== 0)) {
          FUN_005f22d0(s32(local_120, 8), local_8);
          local_124 = 1;
        }
      }
      break;
    case 0x100 :
      uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8a8), 0), 4);
      local_c = FUN_0054a912(s32(local_120, 9), uVar3);
      if ((local_c !== -1)) {
        if ((local_c < 0)) {
          w32(local_120, 9, -2);
          local_8 = s_ANYBODY_006331e0;
        }
        else {
          w32(local_120, 9, local_c);
          local_8 = FUN_00493c7d(s32(local_120, 9));
        }
        sVar1 = _strlen(local_8);
        uVar4 = FUN_004cca35(DAT_0064b984, (sVar1 + 1));
        w32(local_120, 8, uVar4);
        if ((s32(local_120, 8) !== 0)) {
          FUN_005f22d0(s32(local_120, 8), local_8);
          uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8ac), 0), 2);
          local_c = FUN_0054a912(s32(local_120, 0xd), uVar3);
          if ((local_c !== -1)) {
            w32(local_120, 0xd, local_c);
            local_124 = 1;
          }
        }
      }
    }
  }
  FUN_004cef35();
  FUN_0054b635();
  FUN_00551d80(local_10);
  FUN_0054ae93(0);
  FUN_00548df0();
  FUN_0059d3c9(0);
  return local_124;
}


 export function FUN_0054d4ca (param_1)

 {
  FUN_0054c4a1(param_1);
  return;
}


 export function FUN_0054d4e6 ()

 {
  let piVar1;
  let lpCaption;
  let lpText;
  let iVar2;
  let pcVar3;
  let uType;
  let local_14;
  let local_10;
  let local_c;

  local_c = 0;
  while ((0 === 0)) {
    if ((DAT_006a4f88 === 0)) {
      local_14 = 0;
    }
    else {
      local_14 = (DAT_006a4f88 + 0x48);
    }
    FUN_0059d3c9(local_14);
    DAT_00631edc = 0;
    local_c = FUN_00551e20(s_TRIGGERS_006331e8, local_c, 1);
    FUN_0059d3c9(0);
    if ((0 === 0)) {
    if ((piVar1 === 0)) {
      uType = 0;
      lpCaption = FUN_00428b0c(s32((DAT_00628420 + 0x8d0), 0));
      lpText = FUN_00428b0c(s32((DAT_00628420 + 0x8e8), 0));
      iVar2 = FUN_00414d10();
      FUN_006e7dd4(s32((iVar2 + 4), 0), lpText, lpCaption, uType);
    }
    else {
      w32(piVar1, 0, (1 << (((local_c) & 0xFF) & 0x1f)));
      FUN_0054b635();
      FUN_0054bc1a(0);
      pcVar3 = egptr((DAT_006a4f88 + 0xad0));
      FUN_00551d80((pcVar3 + -1));
      iVar2 = FUN_0054c4a1(0);
      if ((iVar2 === 0)) {
        (s32((local_10 + 0x1bc), 0) !== 0) (local_10 = DAT_0064b99c; local_10 = (local_10 + 0x1bc);
            local_10 = s32((local_10 + 0x1bc), 0)) {
        }
        if ((s32((local_10 + 0x1c0), 0) === 0)) {
          DAT_0064b99c = s32((local_10 + 0x1bc), 0);
        }
        else {
          w32((s32((local_10 + 0x1c0), 0) + 0x1bc), 0, s32((local_10 + 0x1bc), 0));
        }
        FUN_004cef35();
        FUN_0054b635();
        FUN_0054bc1a(0);
      }
      FUN_0054ae93(0);
    }
  }
  FUN_00548df0();
  return;
}


 export function FUN_0054d6da ()

 {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_18;
  let local_10;
  let local_c;

  local_c = FUN_00551d50();
  (local_10 !== 0) (local_10 = DAT_0064b99c; local_10 = (local_10 !== 0); local_10 = s32((local_10 + 0x1bc), 0)) {
    if ((local_c === 0)) {
    local_18 = 0;
  }
  else {
    local_18 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_18);
  iVar1 = FUN_00421ea0(s_DELETEITEM_006331f4);
  if ((iVar1 !== 0)) {
    uVar2 = FUN_00551d50();
    iVar1 = FUN_0054a874(uVar2, s32((local_10 + 4), 0));
    if ((iVar1 === 1)) {
      w32((local_10 + 0x38), 0, 0);
    }
    uVar3 = FUN_0054a874(uVar2, s32((local_10 + 4), 0));
    w32((local_10 + 4), 0, (s32((local_10 + 4), 0) & (~uVar3)));
    FUN_0054bc1a(0);
    FUN_004cef35();
  }
  FUN_0059d3c9(0);
  FUN_00548df0();
  return;
}


 export function FUN_0054d7ef ()

 {
  let uVar1;
  let uVar2;
  let sVar3;
  let iVar4;
  let pcVar5;
  let lVar6;
  let unaff_FS_OFFSET;
  let bVar7;
  let local_1f8;
  let local_1f4;
  let local_1f0;
  let local_1ec;
  let local_1e8;
  let local_1e4;
  let local_1e0;
  let local_1dc;
  let local_1d8;
  let local_1d4;
  let local_1d0;
  let local_1cc;
  let local_1c4;
  let local_1b8;
  let local_1b0;
  let local_ac;
  let local_60;
  let local_5c;
  let local_58;
  let local_18;
  let local_14;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0054ee9b;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_004187a0();
  local_8 = 0;
  if ((DAT_006a4f88 === 0)) {
    local_1c4 = 0;
  }
  else {
    local_1c4 = (DAT_006a4f88 + 0x48);
  }
  FUN_0059d3c9(local_1c4);
  local_ac = FUN_00551d50();
  local_1b8 = DAT_0064b99c;
  while (bVar7) {
    local_1b8 = s32(local_1b8, 0x6f);
  }
  uVar1 = FUN_00551d50(s32(local_1b8, 1));
  uVar2 = FUN_0054a874(uVar1);
  if ((uVar2 < 9)) {
    if ((uVar2 === 8)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8a8), 0), s32(local_1b8, 0), DAT_ffffffec);
      local_18 = FUN_0054adc6(s32(local_1b8, 0x5e), uVar1);
      if ((local_18 !== -1)) {
        w32(local_1b8, 0x5e, local_18);
        sVar3 = _strlen(local_14);
        uVar1 = FUN_004cca35(DAT_0064b984, (sVar3 + 1));
        w32(local_1b8, 0x5d, uVar1);
        if ((s32(local_1b8, 0x5d) !== 0)) {
          FUN_005f22d0(s32(local_1b8, 0x5d), local_14);
          if ((DAT_006a4f88 === 0)) {
            local_1ec = 0;
          }
          else {
            local_1ec = (DAT_006a4f88 + 0x48);
          }
          FUN_0059d3c9(local_1ec);
          local_18 = FUN_004ce8a4(s_DEBUG_006359dc, s_AMOUNT_00633278, s32(local_1b8, 0x5f), DAT_ffffffa0);
          FUN_0059d3c9(0);
          if ((local_18 === 0)) {
            uVar1 = FUN_004cdf4b(local_60, -0x7530, 0x7530);
            w32(local_1b8, 0x5f, uVar1);
          }
        }
      }
    }
    else if ((uVar2 === 1)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8b0), 0));
      FUN_004ce38a((local_1b8 + 0xe), uVar1);
    }
    else if ((uVar2 === 2)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8b4), 0), 3);
      local_18 = FUN_0054a912(s32(local_1b8, 0x25), uVar1);
      if ((local_18 !== -1)) {
        if ((local_18 < 0)) {
          w32(local_1b8, 0x25, -2);
          local_14 = s_ANYUNIT_00633200;
        }
        else {
          w32(local_1b8, 0x25, local_18);
          local_14 = FUN_00428b0c(s32((DAT_0064b1b8 + s32(local_1b8, 0x25) * 0x14), 0));
        }
        sVar3 = _strlen(local_14);
        uVar1 = FUN_004cca35(DAT_0064b984, (sVar3 + 1));
        w32(local_1b8, 0x24, uVar1);
        if ((s32(local_1b8, 0x24) !== 0)) {
          FUN_005f22d0(s32(local_1b8, 0x24), local_14);
          uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8b8), 0), s32(local_1b8, 0), DAT_ffffffec);
          local_18 = FUN_0054adc6(s32(local_1b8, 0x23), uVar1);
          if ((local_18 !== -1)) {
            w32(local_1b8, 0x23, local_18);
            sVar3 = _strlen(local_14);
            uVar1 = FUN_004cca35(DAT_0064b984, (sVar3 + 1));
            w32(local_1b8, 0x22, uVar1);
            if ((s32(local_1b8, 0x22) !== 0)) {
              FUN_005f22d0(s32(local_1b8, 0x22), local_14);
              _sprintf(DAT_ffffffa8, s_%d,%d,%d,%d,%d,%d,%d,%d_00633208, s32(local_1b8, 0x27), s32(local_1b8, 0x28), s32(local_1b8, 0x29), s32(local_1b8, 0x2a), s32(local_1b8, 0x2b), s32(local_1b8, 0x2c), s32(local_1b8, 0x2d), s32(local_1b8, 0x2e));
              if ((DAT_006a4f88 === 0)) {
                local_1cc = 0;
              }
              else {
                local_1cc = (DAT_006a4f88 + 0x48);
              }
              FUN_0059d3c9(local_1cc);
              do {
                local_18 = FUN_0051d63b(s_DEBUG_006359dc, s_MAPRECT_00633220, 0x1f, DAT_ffffffa8, DAT_fffffe50);
                if ((local_18 === -1)) {
                sVar3 = _strlen(DAT_fffffe50);
                if ((sVar3 !== 0)) {
                  FUN_005f22d0(DAT_00679640, DAT_fffffe50);
                  (local_ac < 4) (local_ac = 0; local_ac = (local_ac < 4); local_ac = (local_ac + 1)) {
                    pcVar5 = FUN_004a24b1(0, 0x7fff);
                    lVar6 = _atol(pcVar5);
                    uVar1 = FUN_004cdf4b(lVar6);
                    w32(local_1b8, (local_ac * 2 + 0x27), uVar1);
                    pcVar5 = FUN_004a24b1(0, 0x7fff);
                    lVar6 = _atol(pcVar5);
                    uVar1 = FUN_004cdf4b(lVar6);
                    w32(local_1b8, (local_ac * 2 + 0x28), uVar1);
                  }
                }
                _sprintf(DAT_ffffffa8, s_%d,%d_00633228, s32(local_1b8, 0x2f), s32(local_1b8, 0x30));
                if ((DAT_006a4f88 === 0)) {
                  local_1d0 = 0;
                }
                else {
                  local_1d0 = (DAT_006a4f88 + 0x48);
                }
                FUN_0059d3c9(local_1d0);
                local_18 = FUN_0051d63b(s_DEBUG_006359dc, s_LOCATION_00633230, 8, DAT_ffffffa8, DAT_fffffe50);
                if ((DAT_006a4f88 === 0)) {
                  local_1d4 = 0;
                }
                else {
                  local_1d4 = (DAT_006a4f88 + 0x48);
                }
                FUN_0059d3c9(local_1d4);
                if ((local_18 !== -1)) {
                  sVar3 = _strlen(DAT_fffffe50);
                  if ((sVar3 !== 0)) {
                    FUN_005f22d0(DAT_00679640, DAT_fffffe50);
                    pcVar5 = FUN_004a24b1(0, 0x7fff);
                    lVar6 = _atol(pcVar5);
                    uVar1 = FUN_004cdf4b(lVar6);
                    w32(local_1b8, 0x2f, uVar1);
                    pcVar5 = FUN_004a24b1(0, 0x7fff);
                    lVar6 = _atol(pcVar5);
                    uVar1 = FUN_004cdf4b(lVar6);
                    w32(local_1b8, 0x30, uVar1);
                  }
                  if ((DAT_006a4f88 === 0)) {
                    local_1d8 = 0;
                  }
                  else {
                    local_1d8 = (DAT_006a4f88 + 0x48);
                  }
                  FUN_0059d3c9(local_1d8);
                  if ((s32(local_1b8, 0x26) === -2)) {
                    local_1dc = -1;
                  }
                  else {
                    local_1dc = s32(local_1b8, 0x26);
                  }
                  local_18 = FUN_0051d75d(s_DEBUG_006359dc, s_NUMUNITS_0063323c, local_1dc, DAT_ffffffa0);
                  FUN_0059d3c9(0);
                  if ((local_18 === 0)) {
                    if ((local_60 === -1)) {
                      w32(local_1b8, 0x26, -2);
                    }
                    else {
                      uVar1 = FUN_004cdf4b(local_60, 0, 0x7fff);
                      w32(local_1b8, 0x26, uVar1);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    else if ((uVar2 === 4)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8bc), 0), 1);
      local_18 = FUN_0054a912(s32(local_1b8, 0x38), uVar1);
      if ((local_18 !== -1)) {
        w32(local_1b8, 0x38, local_18);
        local_14 = FUN_00428b0c(s32((DAT_0064b1b8 + s32(local_1b8, 0x38) * 0x14), 0));
        sVar3 = _strlen(local_14);
        uVar1 = FUN_004cca35(DAT_0064b984, (sVar3 + 1));
        w32(local_1b8, 0x37, uVar1);
        if ((s32(local_1b8, 0x37) !== 0)) {
          FUN_005f22d0(s32(local_1b8, 0x37), local_14);
          uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8b8), 0), s32(local_1b8, 0), DAT_ffffffec);
          local_18 = FUN_0054adc6(s32(local_1b8, 0x36), uVar1);
          if ((local_18 !== -1)) {
            w32(local_1b8, 0x36, local_18);
            sVar3 = _strlen(local_14);
            uVar1 = FUN_004cca35(DAT_0064b984, (sVar3 + 1));
            w32(local_1b8, 0x35, uVar1);
            if ((s32(local_1b8, 0x35) !== 0)) {
              FUN_005f22d0(s32(local_1b8, 0x35), local_14);
              if ((DAT_006a4f88 === 0)) {
                local_1e0 = 0;
              }
              else {
                local_1e0 = (DAT_006a4f88 + 0x48);
              }
              FUN_0059d3c9(local_1e0);
              local_5c = FUN_00551e60(s_VETERAN_00633248, s32(local_1b8, 0x4e), 0);
              FUN_0059d3c9(0);
              if ((-1 < local_5c)) {
                w32(local_1b8, 0x4e, local_5c);
                do {
                  if ((s32(local_1b8, 0x4f) === 0)) {
                    w32(local_1b8, 0x4f, DAT_00633250);
                  }
                  if ((DAT_006a4f88 === 0)) {
                    local_1e4 = 0;
                  }
                  else {
                    local_1e4 = (DAT_006a4f88 + 0x48);
                  }
                  FUN_0059d3c9(local_1e4);
                  local_18 = FUN_0051d63b(s_DEBUG_006359dc, s_HOMECITYNAME_00633254, 0x17, s32(local_1b8, 0x4f), DAT_fffffe50);
                  FUN_0059d3c9(0);
                } while ((iVar4 === 0)) {
                  sVar3 = _strlen(DAT_fffffe50);
                  uVar1 = FUN_004cca35(DAT_0064b984, (sVar3 + 1));
                  w32(local_1b8, 0x4f, uVar1);
                  if ((s32(local_1b8, 0x4f) !== 0)) {
                    FUN_005f22d0(s32(local_1b8, 0x4f), DAT_fffffe50);
                    (local_ac < 0xa) (local_ac = 0; local_ac = (local_ac < 0xa); local_ac = (local_ac + 1)) {
                      w32(local_1b8, 0x4d, local_ac);
                      _sprintf(DAT_ffffffa8, s_%d,%d_00633264, s32(local_1b8, (local_ac * 2 + 0x39)), s32(local_1b8, (local_ac * 2 + 0x3a)));
                      if ((DAT_006a4f88 === 0)) {
                        local_1e8 = 0;
                      }
                      else {
                        local_1e8 = (DAT_006a4f88 + 0x48);
                      }
                      FUN_0059d3c9(local_1e8);
                      FUN_00421da0(0, (local_ac + 1));
                      local_18 = FUN_0051d63b(s_DEBUG_006359dc, s_LOCATIONNUM_0063326c, 8, DAT_ffffffa8, DAT_fffffe50);
                      FUN_0059d3c9(0);
                      if ((local_18 === -1)) {
                        if ((local_ac === 0)) {
                          w32(local_1b8, (local_ac * 2 + 0x39), 0);
                          w32(local_1b8, (local_ac * 2 + 0x3a), 0);
                          local_ac = (local_ac + 1);
                        } while ((local_ac < 0xa)) {
                        sVar3 = _strlen(DAT_fffffe50);
                        if ((sVar3 !== 0)) {
                          FUN_005f22d0(DAT_00679640, DAT_fffffe50);
                          pcVar5 = FUN_004a24b1(0, 0x7fff);
                          lVar6 = _atol(pcVar5);
                          uVar1 = FUN_004cdf4b(lVar6);
                          w32(local_1b8, (local_ac * 2 + 0x39), uVar1);
                          pcVar5 = FUN_004a24b1(0, 0x7fff);
                          lVar6 = _atol(pcVar5);
                          uVar1 = FUN_004cdf4b(lVar6);
                          w32(local_1b8, (local_ac * 2 + 0x3a), uVar1);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  else if ((uVar2 < 0x21)) {
    if ((uVar2 === 0x20)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8c0), 0), 0);
      local_18 = FUN_0054a912(s32(local_1b8, 0x34), uVar1);
      if ((local_18 !== -1)) {
        w32(local_1b8, 0x34, local_18);
        local_14 = FUN_00493c7d(s32(local_1b8, 0x34));
        sVar3 = _strlen(local_14);
        uVar1 = FUN_004cca35(DAT_0064b984, (sVar3 + 1));
        w32(local_1b8, 0x33, uVar1);
        if ((s32(local_1b8, 0x33) !== 0)) {
          FUN_005f22d0(s32(local_1b8, 0x33), local_14);
          uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8c4), 0), 0);
          local_18 = FUN_0054a912(s32(local_1b8, 0x32), uVar1);
          if ((local_18 !== -1)) {
            w32(local_1b8, 0x32, local_18);
            local_14 = FUN_00493c7d(s32(local_1b8, 0x32));
            sVar3 = _strlen(local_14);
            uVar1 = FUN_004cca35(DAT_0064b984, (sVar3 + 1));
            w32(local_1b8, 0x31, uVar1);
            if ((s32(local_1b8, 0x31) !== 0)) {
              FUN_005f22d0(s32(local_1b8, 0x31), local_14);
            }
          }
        }
      }
    }
    else if ((uVar2 === 0x10)) {
      if ((s32(local_1b8, 0x61) === 0)) {
        w32(local_1b8, 0x61, DAT_00633280);
      }
      if ((DAT_006a4f88 === 0)) {
        local_1f0 = 0;
      }
      else {
        local_1f0 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_1f0);
      do {
        local_18 = FUN_0051d63b(s_DEBUG_006359dc, s_WAVFILE_00633284, 0xa, s32(local_1b8, 0x61), DAT_fffffe50);
        if ((local_18 === -1)) {
        pcVar5 = _strchr(DAT_fffffe50, 0x2e);
        if ((pcVar5 === 0)) {
          FUN_005f22e0(DAT_fffffe50, DAT_0063328c);
        }
        __strupr(DAT_fffffe50);
        sVar3 = _strlen(DAT_fffffe50);
        uVar1 = FUN_004cca35(DAT_0064b984, (sVar3 + 1));
        w32(local_1b8, 0x61, uVar1);
        if ((s32(local_1b8, 0x61) !== 0)) {
          FUN_005f22d0(s32(local_1b8, 0x61), DAT_fffffe50);
        }
      }
    }
  }
  else if ((uVar2 < 0x81)) {
    if ((uVar2 === 0x80)) {
      uVar1 = FUN_004cdf4b(s32(local_1b8, 0x62), 2, 0x18);
      w32(local_1b8, 0x62, uVar1);
      FUN_00421da0(0, 2);
      FUN_00421da0(1, 0x18);
      if ((DAT_006a4f88 === 0)) {
        local_1f4 = 0;
      }
      else {
        local_1f4 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_1f4);
      local_18 = FUN_0051d75d(s_DEBUG_006359dc, s_CDTRACK_00633294, s32(local_1b8, 0x62), DAT_ffffffa0);
      FUN_0059d3c9(0);
      if ((local_18 === 0)) {
        uVar1 = FUN_004cdf4b(local_60, 2, 0x18);
        w32(local_1b8, 0x62, uVar1);
      }
    }
  }
  else if ((uVar2 < 0x201)) {
    if ((uVar2 === 0x200)) {
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x970), 0), 7);
      local_18 = FUN_0054a912(s32(local_1b8, 0x63), uVar1);
      if ((local_18 === -1)) {
        local_18 = -1;
      }
      else {
        w32(local_1b8, 0x63, local_18);
        _sprintf(DAT_ffffffa8, s_%d,%d,%d,%d,%d,%d,%d,%d_0063329c, s32(local_1b8, 0x64), s32(local_1b8, 0x65), s32(local_1b8, 0x66), s32(local_1b8, 0x67), s32(local_1b8, 0x68), s32(local_1b8, 0x69), s32(local_1b8, 0x6a), s32(local_1b8, 0x6b));
        if ((DAT_006a4f88 === 0)) {
          local_1f8 = 0;
        }
        else {
          local_1f8 = (DAT_006a4f88 + 0x48);
        }
        FUN_0059d3c9(local_1f8);
        do {
          local_18 = FUN_0051d63b(s_DEBUG_006359dc, s_MAPRECT_006332b4, 0x1f, DAT_ffffffa8, DAT_fffffe50)
          ;
          if ((local_18 === -1)) {
          FUN_005f22d0(DAT_00679640, DAT_fffffe50);
          (local_ac < 4) (local_ac = 0; local_ac = (local_ac < 4); local_ac = (local_ac + 1)) {
            pcVar5 = FUN_004a24b1(0, 0x7fff);
            lVar6 = _atol(pcVar5);
            uVar1 = FUN_004cdf4b(lVar6);
            w32(local_1b8, (local_ac * 2 + 0x64), uVar1);
            pcVar5 = FUN_004a24b1(0, 0x7fff);
            lVar6 = _atol(pcVar5);
            uVar1 = FUN_004cdf4b(lVar6);
            w32(local_1b8, (local_ac * 2 + 0x65), uVar1);
          }
        }
      }
    }
  }
  else if ((uVar2 === 0x400)) {
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8c8), 0), s32(local_1b8, 0), DAT_ffffffec);
    local_18 = FUN_0054adc6(s32(local_1b8, 0x6c), uVar1);
    if ((local_18 !== -1)) {
      w32(local_1b8, 0x6c, local_18);
    }
  }
  else if ((uVar2 === 0x800)) {
    uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8a8), 0), s32(local_1b8, 0), DAT_ffffffec);
    local_18 = FUN_0054adc6(s32(local_1b8, 0x6e), uVar1);
    if ((local_18 === -1)) {
      local_18 = -1;
    }
    else {
      w32(local_1b8, 0x6e, local_18);
      uVar1 = FUN_00428b0c(s32((DAT_00628420 + 0x8ac), 0), 2);
      local_18 = FUN_0054a912(s32(local_1b8, 0x6d), uVar1);
      if ((local_18 !== -1)) {
        w32(local_1b8, 0x6d, local_18);
      }
    }
  }
  FUN_004cef35();
  FUN_0054bc1a(0);
  local_5c = FUN_0054a8d3(uVar2, s32(local_1b8, 1));
  FUN_00551d80(local_5c);
  FUN_0054ae93(0);
  FUN_00548df0();
  FUN_0059d3c9(0);
  local_8 = -1;
  FUN_0054ee8f();
  FUN_0054eea5();
  return;
}


 export function FUN_0054ee8f ()

 {
  FUN_00418870();
  return;
}


 export function FUN_0054eea5 (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0054eeb4 (param_1)

 {
  FUN_0054d7ef(param_1);
  return;
}


 export function FUN_0054eed0 ()

 {
  let lpCaption;
  let lpText;
  let uVar1;
  let iVar2;
  let uType;
  let local_20;
  let local_18;
  let local_14;
  let local_8;

  local_14 = FUN_00551d50();
  local_18 = DAT_0064b99c;
  while ((local_14 !== 0)) {
    local_18 = s32(local_18, 0x6f);
    local_14 = (local_14 + -1);
  }
  if ((s32(local_18, 0) === 0x20)) {
    local_14 = 0;
    while ((((1 << (((local_14) & 0xFF) & 0x1f)) & (s32(local_18, 1) | -0x191)) !== 0)) {
      local_14 = (local_14 + 1);
    }
  }
  else {
    local_14 = 0;
    while (((s32(local_18, 1) & (1 << (((local_14) & 0xFF) & 0x1f))) !== 0)) {
      local_14 = (local_14 + 1);
    }
  }
  if ((local_14 < 0xd)) {
    while ((DAT_00631edc === 0)) {
      if ((DAT_006a4f88 === 0)) {
        local_20 = 0;
      }
      else {
        local_20 = (DAT_006a4f88 + 0x48);
      }
      FUN_0059d3c9(local_20);
      DAT_00631edc = 0;
      if ((s32(local_18, 0) === 0x20)) {
        local_14 = FUN_004cdd3d(s_ACTIONS_006332bc, local_14, (s32(local_18, 1) | -0x191), 1);
      }
      else {
        local_14 = FUN_004cdd3d(s_ACTIONS_006332c4, local_14, s32(local_18, 1), 1);
      }
      FUN_0059d3c9(0);
      if ((DAT_00631edc === 0)) {
      w32(local_18, 1, (s32(local_18, 1) | (1 << (((local_14) & 0xFF) & 0x1f))));
      uVar1 = FUN_0054a8d3((1 << (((local_14) & 0xFF) & 0x1f)), s32(local_18, 1));
      FUN_0054bc1a(0);
      FUN_00551d80(uVar1);
      iVar2 = FUN_0054d7ef(0);
      if ((iVar2 === 0)) {
        local_8 = FUN_00551d50();
        local_18 = DAT_0064b99c;
        while ((local_8 !== 0)) {
          local_18 = s32(local_18, 0x6f);
          local_8 = (local_8 + -1);
        }
        w32(local_18, 1, (s32(local_18, 1) & (~(1 << (((local_14) & 0xFF) & 0x1f)))));
        FUN_0054bc1a(0);
      }
    }
  }
  else {
    uType = 0;
    lpCaption = FUN_00428b0c(s32((DAT_00628420 + 0x8d0), 0));
    lpText = FUN_00428b0c(s32((DAT_00628420 + 0x8cc), 0));
    FUN_006e7dd4(0, lpText, lpCaption, uType);
  }
  FUN_00548df0();
  return;
}


 export function FUN_0054f16b (in_ECX)

 {
  let iVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  // in_ECX promoted to parameter;
  let iVar5;

  FUN_00552112();
  FUN_0040fdb0(in_ECX, (in_ECX + 0x2bc), 0x1a);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  iVar5 = (s32((in_ECX + 0x124), 0) + (s32((in_ECX + 0x12c), 0) / 2 | 0));
  iVar1 = s32((in_ECX + 0x128), 0);
  iVar3 = s32((in_ECX + 0x2e8), 0);
  FUN_0040bbb0();
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x8d4), 0));
  FUN_00414d70(uVar2);
  FUN_005bb024(in_ECX, DAT_00679640, iVar5, ((iVar1 - iVar3) + 0x19), 0);
  iVar1 = s32((in_ECX + 0x128), 0);
  iVar3 = s32((in_ECX + 0x2e8), 0);
  FUN_0040bbb0();
  uVar2 = FUN_00428b0c(s32((DAT_00628420 + 0x8d8), 0));
  FUN_00414d70(uVar2);
  FUN_005bb024(in_ECX, DAT_00679640, iVar5, ((iVar1 - iVar3) + 0xc3), 0);
  iVar1 = s32((in_ECX + 0x124), 0);
  iVar3 = (iVar1 + 0x211);
  iVar5 = (s32((in_ECX + 0x128), 0) + 0x1a);
  FUN_0040bbb0();
  _sprintf(DAT_00679640, DAT_006332cc, ((DAT_0064b994) & 0xFFFF));
  FUN_005bb024(in_ECX, DAT_00679640, (iVar1 + 0x216), ((iVar5 - s32((in_ECX + 0x2e8), 0)) + -2), 0);
  uVar4 = (((DAT_0064b994) & 0xFFFF) * 0x13b / ((DAT_0064b992) & 0xFFFF) | 0);
  FUN_005a9abf(in_ECX, iVar3, iVar5, 0xa, uVar4, 0x2a);
  FUN_005a9abf(in_ECX, iVar3, (uVar4 + iVar5), 0xa, (0x13b - uVar4), 0x6a);
  FUN_005a9964(in_ECX, iVar3, iVar5, 0xa, 0x13b, 0xa);
  FUN_005a9964(in_ECX, iVar3, iVar5, 0xa, uVar4, 0xa);
  FUN_00408460();
  return;
}


 export function FUN_0054f3b9 (in_ECX)

 {
  let iVar1;
  let pvVar2;
  let uVar3;
  let uVar4;
  let extraout_EAX;
  let iVar5;
  // in_ECX promoted to parameter;
  let unaff_FS_OFFSET;
  let uVar6;
  let uVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let uVar11;
  let uVar12;
  let local_4a0;
  let local_49c;
  let local_498;
  let local_494;
  let local_48c;
  let local_484;
  let local_480;
  let local_47c;
  let local_478;
  let local_474;
  let local_470;
  let local_464;
  let local_454;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_0054ffb0;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_005c64da();
  local_8 = 0;
  DAT_006a1d7c = 1;
  DAT_006a4f88 = in_ECX;
  pvVar2 = operator_new(0x310);
  local_8 = 1;
  if ((pvVar2 === 0)) {
    local_464 = 0;
  }
  else {
    local_464 = FUN_004fa4be(0xc350);
  }
  local_8 = (UNNAMED << 8);
  DAT_00632578 = local_464;
  FUN_004fa5d9(0xc350);
  FUN_004ce98e(local_464, DAT_0064b690);
  FUN_00417ef0(0, DAT_0062e01c);
  FUN_005d268e(DAT_006a4f90);
  FUN_005d25a8(DAT_006a4f90);
  FUN_005d2550(0x29);
  FUN_005d2568(0x12, 1, 1);
  FUN_005d2590(0x25);
  w32((in_ECX + 0x2d8), 0, 0x230);
  w32((in_ECX + 0x2dc), 0, 0x17c);
  w32((in_ECX + 0x2ec), 0, 0);
  DAT_006a1d80 = 0xc9;
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
  uVar4 = FUN_00428b0c(s32((DAT_00628420 + 0x73c), 0), 0xd, 0, 0, uVar9, uVar3, 0, 0, 0);
  FUN_005534bc(uVar4, uVar6, uVar7, uVar8, uVar9, uVar3, uVar10, uVar11, uVar12);
  PTR_DAT_006359f0 = PTR_DAT_006359f0;
  w32((in_ECX + 0x2e4), 0, (extraout_EAX + 8));
  w32((in_ECX + 0x2e0), 0, 0x97);
  iVar5 = (s32((in_ECX + 0x128), 0) + 0x90);
  iVar1 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 0x32), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_470 = 0;
  }
  else {
    local_470 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8dc), 0));
  FUN_0040f680(local_470, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00403643);
  iVar1 = ((iVar1 + 0x32) + (s32((in_ECX + 0x2e0), 0) + 3));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_474 = 0;
  }
  else {
    local_474 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8e0), 0));
  FUN_0040f680(local_474, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_0040114a);
  FUN_004086c0(DAT_fffffbac, (iVar1 + (s32((in_ECX + 0x2e0), 0) + 3)), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_478 = 0;
  }
  else {
    local_478 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8e4), 0));
  FUN_0040f680(local_478, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_0040164a);
  iVar5 = (s32((in_ECX + 0x128), 0) + 0x13a);
  iVar1 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 0x32), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_47c = 0;
  }
  else {
    local_47c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8dc), 0));
  FUN_0040f680(local_47c, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00402c84);
  iVar1 = ((iVar1 + 0x32) + (s32((in_ECX + 0x2e0), 0) + 3));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_480 = 0;
  }
  else {
    local_480 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8e0), 0));
  FUN_0040f680(local_480, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00402919);
  FUN_004086c0(DAT_fffffbac, (iVar1 + (s32((in_ECX + 0x2e0), 0) + 3)), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_484 = 0;
  }
  else {
    local_484 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8e4), 0));
  FUN_0040f680(local_484, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_004027c5);
  FUN_004086c0(DAT_fffffbac, (s32((in_ECX + 0x124), 0) + 0x32), (s32((in_ECX + 0x128), 0) + 0x1b), 0x1cb, 0x6e);
  iVar1 = 0xc9;
  DAT_006a1d80 = (0xc9 + 1);
  if ((in_ECX === 0)) {
    local_48c = 0;
  }
  else {
    local_48c = (in_ECX + 0x48);
  }
  FUN_00418f40(local_48c, iVar1, DAT_fffffbac);
  FUN_00418fe0(DAT_006a4f90);
  FUN_00551df0(thunk_FUN_0054bc1a);
  FUN_00551dc0(LAB_0040114a);
  FUN_0054b635();
  FUN_00551d80(0);
  FUN_004086c0(DAT_fffffbac, (s32((in_ECX + 0x124), 0) + 0x32), (s32((in_ECX + 0x128), 0) + 0xc5), 0x1cb, 0x6e);
  iVar1 = (0xc9 + 1);
  DAT_006a1d80 = ((0xc9 + 1) + 1);
  if ((in_ECX === 0)) {
    local_494 = 0;
  }
  else {
    local_494 = (in_ECX + 0x48);
  }
  FUN_00418f40(local_494, iVar1, DAT_fffffbac);
  FUN_00418fe0(DAT_006a4f90);
  FUN_00551df0(thunk_FUN_0054ae93);
  FUN_00551dc0(LAB_00402919);
  FUN_0054bc1a(0);
  FUN_0054ae93(0);
  w32((in_ECX + 0x2e0), 0, ((s32((in_ECX + 0x12c), 0) + -8) / 3 | 0));
  iVar5 = ((s32((in_ECX + 0x128), 0) + s32((in_ECX + 0x130), 0)) - (s32((in_ECX + 0x2e4), 0) + 2));
  iVar1 = s32((in_ECX + 0x124), 0);
  FUN_004086c0(DAT_fffffbac, (iVar1 + 2), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_498 = 0;
  }
  else {
    local_498 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x3f8), 0));
  FUN_0040f680(local_498, 0x65, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00402ced);
  iVar1 = ((iVar1 + 2) + (s32((in_ECX + 0x2e0), 0) + 2));
  FUN_004086c0(DAT_fffffbac, iVar1, iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_49c = 0;
  }
  else {
    local_49c = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x8ec), 0));
  FUN_0040f680(local_49c, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_00401861);
  FUN_004086c0(DAT_fffffbac, (iVar1 + (s32((in_ECX + 0x2e0), 0) + 2)), iVar5, s32((in_ECX + 0x2e0), 0), s32((in_ECX + 0x2e4), 0));
  if ((in_ECX === 0)) {
    local_4a0 = 0;
  }
  else {
    local_4a0 = (in_ECX + 0x48);
  }
  uVar3 = FUN_00428b0c(s32((DAT_00628420 + 0x3fc), 0));
  FUN_0040f680(local_4a0, 0x66, DAT_fffffbac, uVar3);
  FUN_0040f880(LAB_0040317a);
  FUN_0040f840();
  FUN_0040f350(0);
  DAT_0062e014 = 0;
  in_ECX = EnableStackedTabs(in_ECX, 0x402ed2);
  FUN_005bb574();
  FUN_004085f0();
  FUN_005c61b0();
  while ((DAT_006a1d7c !== 0)) {
    FUN_0040ef50();
  }
  if ((DAT_00632578 !== 0)) {
    FUN_00551cd0(1);
  }
  DAT_00632578 = 0;
  local_8 = -1;
  FUN_0054ffa4();
  FUN_0054ffba();
  return;
}


 export function FUN_0054ffa4 ()

 {
  FUN_005c656b();
  return;
}


 export function FUN_0054ffba (unaff_EBP)

 {
  // unaff_EBP promoted to parameter;
  let unaff_FS_OFFSET;

  w32(unaff_FS_OFFSET, 0, s32((unaff_EBP + -12), 0));
  return;
}


 export function FUN_0054ffc8 ()

 {
  let unaff_FS_OFFSET;
  let uStack_10;
  let puStack_c;
  let local_8;

  local_8 = -1;
  puStack_c = LAB_00550023;
  uStack_10 = s32(unaff_FS_OFFSET, 0);
  w32(unaff_FS_OFFSET, 0, DAT_fffffff0);
  FUN_00417fa0();
  local_8 = 0;
  FUN_0054f3b9();
  local_8 = -1;
  FUN_00550017();
  FUN_0055002d();
  return;
}
