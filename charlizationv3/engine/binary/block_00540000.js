// ═══════════════════════════════════════════════════════════════════
// block_00540000.js — Mechanical transpilation of block_00540000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00540000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00540000.c
// ═══════════════════════════════════════════════════════════════════

import {
  s8, u8,
  DAT_006560f0, DAT_0064b1bc, DAT_0064c600,
  DAT_00655b16,
} from './mem.js';

import {
  FUN_005b89e4,
} from './fn_utils.js';


// ============================================================
// Function: FUN_00543b80 @ 0x00543B80
// Size: 322 bytes
// ai_try_settle_unit
// ============================================================

export function FUN_00543b80() {
  let iVar1;
  let iVar2;

  FUN_00484d52();
  iVar1 = DAT_00655afe;
  if (((((((DAT_006560f0[iVar1 * 0x20 + 0x08]) !== 0) && ((DAT_006560f0[iVar1 * 0x20 + 0x0F]) === 0x0b)) &&
        ((DAT_0064b1bc[u8(DAT_006560f0[iVar1 * 0x20 + 0x06]) * 0x14 + 0x0D]) === 0)) &&
       (((DAT_0064b1bc[u8(DAT_006560f0[iVar1 * 0x20 + 0x06]) * 0x14 + 0x0E]) !== 0x02 ||
        (iVar2 = FUN_005b49cf(
          (DAT_006560f0[iVar1 * 0x20] | (DAT_006560f0[iVar1 * 0x20 + 1] << 8)) << 16 >> 16,
          (DAT_006560f0[iVar1 * 0x20 + 2] | (DAT_006560f0[iVar1 * 0x20 + 3] << 8)) << 16 >> 16,
          s8(DAT_006560f0[iVar1 * 0x20 + 0x07])), iVar2 === 0)))) ||
      ((iVar2 = FUN_00538a29(), iVar2 === 0 && (iVar2 = FUN_005b2c3d(iVar1), iVar2 !== 0))
      )) && (iVar2 = FUN_004c5408(iVar1), iVar2 === 0)) {
    FUN_005b6787(iVar1);
  }
  return;
}



// ============================================================
// Function: FUN_00543cd6 @ 0x00543CD6
// Size: 801 bytes
// ai_process_unit_automation
// ============================================================

export function FUN_00543cd6() {
  let bVar1;
  let sVar2;
  let iVar3;
  let iVar4;
  let local_18;
  let local_14;
  let local_c;

  iVar3 = DAT_00655b05;
  bVar1 = false;
  if (((((DAT_00655af0 & 0x80) !== 0) && (((DAT_0064bc60) & 0x8000) !== 0)) && (DAT_00655af8 === 1)
      ) && (DAT_0064bcba === iVar3)) {
    bVar1 = true;
  }
  local_c = 0;
  do {
    if (1 < local_c) {
      return;
    }
    local_18 = DAT_00655b16;
    while (local_18 = local_18 + -1, -1 < local_18) {
      if (2 < DAT_00655b02) {
        if (DAT_006ad698 !== 0) {
          return;
        }
        if (DAT_006ad685 !== 0) {
          return;
        }
      }
      if (((DAT_006560f0[local_18 * 0x20 + 0x1A] | (DAT_006560f0[local_18 * 0x20 + 0x1B] << 8) |
            (DAT_006560f0[local_18 * 0x20 + 0x1C] << 16) | (DAT_006560f0[local_18 * 0x20 + 0x1D] << 24)) !== 0) &&
          (s8(DAT_006560f0[local_18 * 0x20 + 0x07]) === iVar3) &&
         ((local_14 = 0, !bVar1 ||
          ((local_c !== 0 ||
           ((DAT_0064b1bc[u8(DAT_006560f0[local_18 * 0x20 + 0x06]) * 0x14 + 0x05]) === 0x01)))))) {
        while (iVar4 = FUN_005b6458(local_18), iVar4 !== 0) {
          if (2 < DAT_00655b02) {
            FUN_004b0b53(0xff,2,0,0,0);
            XD_FlushSendBuffer(5000);
            FUN_0047e94e(1,0);
          }
          sVar2 = DAT_00655b16;
          DAT_00655afe = local_18;
          FUN_00543b80();
          if (DAT_00655b16 !== sVar2) break;
          if ((DAT_006560f0[local_18 * 0x20 + 0x0F]) !== 0x0b &&
             ((DAT_0064b1bc[u8(DAT_006560f0[local_18 * 0x20 + 0x06]) * 0x14 + 0x05]) !== 0x01)) {
            local_14 = local_14 + 1;
          }
          local_14 = local_14 + 1;
          if (0x14 < local_14) {
            FUN_005b6787(local_18);
            break;
          }
          if ((((local_c === 0) && (iVar3 !== 0)) &&
              ((DAT_0064b1bc[u8(DAT_006560f0[local_18 * 0x20 + 0x06]) * 0x14 + 0x0D]) !== 0)) &&
             (((iVar4 = FUN_005b2c3d(local_18), iVar4 === 0 &&
               (iVar4 = FUN_005b89e4(
                 (DAT_006560f0[local_18 * 0x20] | (DAT_006560f0[local_18 * 0x20 + 1] << 8)) << 16 >> 16,
                 (DAT_006560f0[local_18 * 0x20 + 2] | (DAT_006560f0[local_18 * 0x20 + 3] << 8)) << 16 >> 16),
               iVar4 !== 0)) &&
              ((iVar4 = FUN_005b50ad(local_18,2), 1 < iVar4 &&
               (((DAT_00655b0b & (DAT_006560f0[local_18 * 0x20 + 0x09])) !== 0 ||
                (iVar4 = FUN_005b49cf(
                  (DAT_006560f0[local_18 * 0x20] | (DAT_006560f0[local_18 * 0x20 + 1] << 8)) << 16 >> 16,
                  (DAT_006560f0[local_18 * 0x20 + 2] | (DAT_006560f0[local_18 * 0x20 + 3] << 8)) << 16 >> 16,
                  iVar3),
                iVar4 !== 0)))))))) {
            FUN_00543b80();
          }
        }
        FUN_0041033a();
      }
    }
    local_c = local_c + 1;
  } while( true );
}



// ============================================================
// Function: FUN_00548b70 @ 0x00548B70
// Size: 264 bytes
// calc_icon_spacing
// ============================================================

export function FUN_00548b70(param_1, param_2, param_3, param_4, param_5) {
  let iVar1;
  let iVar2;

  if (param_2 < 2) {
    param_2 = 1;
  }
  if (param_1 < 2) {
    param_1 = 1;
  }
  iVar2 = param_2;
  if (param_1 === 1) {
    if (param_5 !== null) {
      param_5[0] = 0;
    }
    if (param_4 !== null) {
      param_4[0] = 1;
    }
  }
  else {
    param_3 = param_3 - param_2;
    iVar1 = Math.trunc(param_3 / (param_1 + -1));
    if (param_5 !== null) {
      param_5[0] = param_3 % (param_1 + -1);
    }
    if (param_4 !== null) {
      param_4[0] = param_1;
    }
    if ((iVar1 < param_2) && (iVar2 = iVar1, iVar1 < 1)) {
      if (param_5 !== null) {
        param_5[0] = 0;
      }
      if (param_4 !== null) {
        param_4[0] = (param_3 - param_2) + 1;
      }
      iVar2 = 1;
    }
  }
  return iVar2;
}



// ============================================================
// Function: FUN_00548c78 @ 0x00548C78
// Size: 246 bytes
// draw_icon_row_spaced
// ============================================================

export function FUN_00548c78(param_1, param_2, param_3, param_4, param_5,
                             param_6, param_7, param_8, param_9) {
  let iVar1;
  let local_24 = {};  // placeholder for RECT-like struct
  let local_14 = [0];
  let local_10;
  let local_c;
  let local_8;

  local_10 = 0;
  local_8 = param_6;
  let param_6_arr = [param_6];
  param_7 = FUN_00548b70(param_6, param_7, param_8, param_6_arr, local_14);
  param_6 = param_6_arr[0];
  if (((local_8 !== 0) && (param_6 !== local_8)) && (param_5 !== local_8)) {
    param_5 = Math.trunc((param_6 * param_5) / local_8);
  }
  local_c = 0;
  while (true) {
    iVar1 = param_6;
    if (param_5 <= param_6) {
      iVar1 = param_5;
    }
    if (iVar1 <= local_c) break;
    FUN_005cef31(local_24, param_1, param_3, param_4);
    param_3 = param_3 + param_7;
    if ((param_9 !== 0) && (1 < param_6)) {
      for (local_10 = local_10 + local_14[0]; param_6 + -1 <= local_10;
          local_10 = local_10 - (param_6 + -1)) {
        param_3 = param_3 + 1;
      }
    }
    local_c = local_c + 1;
  }
  return;
}



// ============================================================
// Function: FUN_00548df0 @ 0x00548DF0
// Size: 51 bytes
// events_editor_set_focus
// ============================================================

export function FUN_00548df0() {
  let hWnd;

  hWnd = FUN_00418770();
  // SetFocus(hWnd);  // Win32 API — no-op in JS
  FUN_0054f16b();
  return;
}



// ============================================================
// Function: FUN_00548e23 @ 0x00548E23
// Size: 3045 bytes
// write_event_actions
// ============================================================

export function FUN_00548e23(param_1, param_2) {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_5c;
  let local_58;
  let local_54 = "";

  // iVar1 = _fputs("@THEN\n", param_1);
  iVar1 = param_1.fputs("@THEN\n");
  if (((iVar1 === -1) || (local_5c = 1, param_2 === 0)) || (param_2[1] === 0)) {
    return;
  }
  do {
    uVar2 = param_2[1] & local_5c;
    if (uVar2 < 9) {
      if (uVar2 === 8) {
        iVar1 = param_1.fputs("CHANGEMONEY\n");
        if (iVar1 === -1) {
          return;
        }
        local_54 = `receiver=${param_2[0x5d]}`;
        iVar1 = param_1.fputs(local_54);
        if (iVar1 === -1) {
          return;
        }
        local_54 = `amount=${param_2[0x5f]}`;
        iVar1 = param_1.fputs(local_54);
      }
      else if (uVar2 === 1) {
        iVar1 = param_1.fputs("TEXT\n");
        if (iVar1 === -1) {
          return;
        }
        for (local_58 = 0; (local_58 < 0x14 && (param_2[0x0e + local_58] !== 0));
            local_58 = local_58 + 1) {
          iVar1 = param_1.fputs(param_2[0x0e + local_58]);
          if (iVar1 === -1) {
            return;
          }
          iVar1 = param_1.fputs("\n");
          if (iVar1 === -1) {
            return;
          }
        }
        iVar1 = param_1.fputs("ENDTEXT\n");
      }
      else if (uVar2 === 2) {
        iVar1 = param_1.fputs("MOVEUNIT\n");
        if (iVar1 === -1) {
          return;
        }
        local_54 = `unit=${param_2[0x24]}`;
        iVar1 = param_1.fputs(local_54);
        if (iVar1 === -1) {
          return;
        }
        local_54 = `owner=${param_2[0x22]}`;
        iVar1 = param_1.fputs(local_54);
        if (iVar1 === -1) {
          return;
        }
        iVar1 = param_1.fputs("maprect\n");
        if (iVar1 === -1) {
          return;
        }
        for (local_58 = 0; local_58 < 4; local_58 = local_58 + 1) {
          local_54 = `${param_2[0x27 + local_58 * 2]},${param_2[0x28 + local_58 * 2]}`;
          if (local_58 < 3) {
            local_54 = local_54 + ",";
          }
          iVar1 = param_1.fputs(local_54);
          if (iVar1 === -1) {
            return;
          }
        }
        iVar1 = param_1.fputs("moveto\n");
        if (iVar1 === -1) {
          return;
        }
        local_54 = `${param_2[0x2f]},${param_2[0x30]}`;
        iVar1 = param_1.fputs(local_54);
        if (iVar1 === -1) {
          return;
        }
        if (param_2[0x26] === -2) {
          local_54 = "numbertomove=ALL";
        }
        else {
          local_54 = `numbertomove=${param_2[0x26]}`;
        }
        iVar1 = param_1.fputs(local_54);
      }
      else {
        if (uVar2 !== 4) { local_5c = local_5c << 1; if (local_5c === 0x8000) { return; } continue; } // goto LAB_005499f7
        iVar1 = param_1.fputs("CREATEUNIT\n");
        if (iVar1 === -1) {
          return;
        }
        local_54 = `unit=${param_2[0x37]}`;
        iVar1 = param_1.fputs(local_54);
        if (iVar1 === -1) {
          return;
        }
        local_54 = `owner=${param_2[0x35]}`;
        iVar1 = param_1.fputs(local_54);
        if (iVar1 === -1) {
          return;
        }
        local_54 = `veteran=${(param_2[0x4e] !== 0) ? "yes" : "no"}`;
        iVar1 = param_1.fputs(local_54);
        if (iVar1 === -1) {
          return;
        }
        local_54 = `homecity=${param_2[0x4f]}`;
        iVar1 = param_1.fputs(local_54);
        if (iVar1 === -1) {
          return;
        }
        iVar1 = param_1.fputs("locations\n");
        if (iVar1 === -1) {
          return;
        }
        for (local_58 = 0; local_58 < param_2[0x4d]; local_58 = local_58 + 1) {
          local_54 = `${param_2[0x39 + local_58 * 2]},${param_2[0x3a + local_58 * 2]}`;
          iVar1 = param_1.fputs(local_54);
          if (iVar1 === -1) {
            return;
          }
        }
        iVar1 = param_1.fputs("endlocations\n");
      }
      // joined_r0x0054934c
      if (iVar1 === -1) {
        return;
      }
    }
    else {
      if (0x20 < uVar2) {
        if (uVar2 < 0x81) {
          if (uVar2 === 0x80) {
            iVar1 = param_1.fputs("PLAYCDTRACK\n");
            if (iVar1 === -1) {
              return;
            }
            local_54 = `${param_2[0x62]}`;
            iVar1 = param_1.fputs(local_54);
          }
          else {
            if (uVar2 !== 0x40) { local_5c = local_5c << 1; if (local_5c === 0x8000) { return; } continue; } // goto LAB_005499f7
            iVar1 = param_1.fputs("JUSTONCE\n");
          }
        }
        else if (uVar2 < 0x201) {
          if (uVar2 === 0x200) {
            iVar1 = param_1.fputs("CHANGETERRAIN\n");
            if (iVar1 === -1) {
              return;
            }
            local_54 = `terraintype=${param_2[0x63]}`;
            iVar1 = param_1.fputs(local_54);
            if (iVar1 === -1) {
              return;
            }
            iVar1 = param_1.fputs("maprect\n");
            if (iVar1 === -1) {
              return;
            }
            for (local_58 = 0; local_58 < 4; local_58 = local_58 + 1) {
              local_54 = `${param_2[100 + local_58 * 2]},${param_2[0x65 + local_58 * 2]}`;
              if (local_58 < 3) {
                local_54 = local_54 + ",";
              }
              iVar1 = param_1.fputs(local_54);
              if (iVar1 === -1) {
                return;
              }
            }
            iVar1 = param_1.fputs("\n");
          }
          else {
            if (uVar2 !== 0x100) { local_5c = local_5c << 1; if (local_5c === 0x8000) { return; } continue; } // goto LAB_005499f7
            iVar1 = param_1.fputs("DONTPLAYWONDERS\n");
          }
        }
        else if (uVar2 === 0x400) {
          iVar1 = param_1.fputs("DESTROYACIVILIZATION\n");
          if (iVar1 === -1) {
            return;
          }
          if (param_2[0x6c] < 0) {
            if ((param_2._1_ & 1) === 0) {
              if (param_2[0x6c] === -3) {
                local_54 = "whom=TRIGGERATTACKER";
              }
              else {
                local_54 = "whom=TRIGGERDEFENDER";
              }
            }
            else {
              local_54 = "whom=TRIGGERRECEIVER";
            }
          }
          else {
            uVar3 = FUN_00493c7d(param_2[0x6c]);
            local_54 = `whom=${uVar3}`;
          }
          iVar1 = param_1.fputs(local_54);
        }
        else if (uVar2 === 0x800) {
          iVar1 = param_1.fputs("GIVETECHNOLOGY\n");
          if (iVar1 === -1) {
            return;
          }
          if (param_2[0x6e] < 0) {
            if ((param_2._1_ & 1) === 0) {
              if (param_2[0x6e] === -3) {
                local_54 = "receiver=TRIGGERATTACKER";
              }
              else {
                local_54 = "receiver=TRIGGERDEFENDER";
              }
            }
            else {
              local_54 = "receiver=TRIGGERRECEIVER";
            }
          }
          else {
            uVar3 = FUN_00493c7d(param_2[0x6e]);
            local_54 = `receiver=${uVar3}`;
          }
          iVar1 = param_1.fputs(local_54);
          if (iVar1 === -1) {
            return;
          }
          local_54 = `technology=${param_2[0x6d]}`;
          iVar1 = param_1.fputs(local_54);
        }
        else {
          if (uVar2 !== 0x2000) { local_5c = local_5c << 1; if (local_5c === 0x8000) { return; } continue; } // goto LAB_005499f7
          iVar1 = param_1.fputs("HASTRIGGERED\n");
        }
        // goto joined_r0x0054934c
        if (iVar1 === -1) {
          return;
        }
      }
      else if (uVar2 === 0x20) {
        iVar1 = param_1.fputs("MAKEAGGRESSION\n");
        if (iVar1 === -1) {
          return;
        }
        local_54 = `who=${param_2[0x33]}`;
        iVar1 = param_1.fputs(local_54);
        if (iVar1 === -1) {
          return;
        }
        local_54 = `whom=${param_2[0x31]}`;
        iVar1 = param_1.fputs(local_54);
        // goto joined_r0x0054934c
        if (iVar1 === -1) {
          return;
        }
      }
      else if (uVar2 === 0x10) {
        iVar1 = param_1.fputs("PLAYWAVEFILE\n");
        if (iVar1 === -1) {
          return;
        }
        local_54 = `${param_2[0x61]}`;
        iVar1 = param_1.fputs(local_54);
        // goto joined_r0x0054934c
        if (iVar1 === -1) {
          return;
        }
      }
    }
    // LAB_005499f7
    local_5c = local_5c << 1;
    if (local_5c === 0x8000) {
      return;
    }
  } while( true );
}



// ============================================================
// Function: FUN_00549aee @ 0x00549AEE
// Size: 2113 bytes
// write_all_events
// ============================================================

export function FUN_00549aee(param_1) {
  let uVar1;
  let iVar2;
  let local_108;
  let local_104 = "";

  local_108 = DAT_0064b99c;
  do {
    if (local_108 === null) {
      param_1.fputs("\n");
      return;
    }
    iVar2 = param_1.fputs("@IF\n");
    if (iVar2 === -1) {
      return;
    }
    uVar1 = local_108[0];
    if (uVar1 < 9) {
      if (uVar1 === 8) {
        iVar2 = param_1.fputs("TURNINTERVAL\n");
        if (iVar2 === -1) {
          return;
        }
        local_104 = `interval=${local_108[0xb]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
      else if (uVar1 === 1) {
        iVar2 = param_1.fputs("UNITKILLED\n");
        if (iVar2 === -1) {
          return;
        }
        local_104 = `unit=${local_108[2]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        local_104 = `attacker=${local_108[5]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        local_104 = `defender=${local_108[8]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
      else if (uVar1 === 2) {
        iVar2 = param_1.fputs("CITYTAKEN\n");
        if (iVar2 === -1) {
          return;
        }
        local_104 = `city=${local_108[4]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        local_104 = `attacker=${local_108[5]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        local_104 = `defender=${local_108[8]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
      else if (uVar1 === 4) {
        iVar2 = param_1.fputs("TURN\n");
        if (iVar2 === -1) {
          return;
        }
        local_104 = `turn=${local_108[0xb]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
    }
    else {
      switch(uVar1) {
      case 0x10:
        iVar2 = param_1.fputs("NEGOTIATION\n");
        if (iVar2 === -1) {
          return;
        }
        local_104 = `talker=${local_108[5]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        local_104 = "talkertype=";
        if (local_108[7] === 1) {
          local_104 = local_104 + "Human";
        }
        if (local_108[7] === 2) {
          local_104 = local_104 + "Computer";
        }
        if (local_108[7] === 4) {
          local_104 = local_104 + "HumanOrComputer";
        }
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        local_104 = `listener=${local_108[8]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        local_104 = "listenertype=";
        if (local_108[10] === 1) {
          local_104 = local_104 + "Human";
        }
        if (local_108[10] === 2) {
          local_104 = local_104 + "Computer";
        }
        if (local_108[10] === 4) {
          local_104 = local_104 + "HumanOrComputer";
        }
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        FUN_00548e23(param_1, local_108);
        break;
      // cases 0x11-0x1f, 0x21-0xff: fall through (break)
      default:
        break;
      case 0x20:
        iVar2 = param_1.fputs("SCENARIOLOADED\n");
        if (iVar2 === -1) {
          return;
        }
        FUN_00548e23(param_1, local_108);
        break;
      case 0x40:
        iVar2 = param_1.fputs("RANDOMTURN\n");
        if (iVar2 === -1) {
          return;
        }
        local_104 = `denominator=${local_108[0xc]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        FUN_00548e23(param_1, local_108);
        break;
      case 0x80:
        iVar2 = param_1.fputs("NOSCHISM\n");
        if (iVar2 === -1) {
          return;
        }
        local_104 = `defender=${local_108[8]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        FUN_00548e23(param_1, local_108);
        break;
      case 0x100:
        iVar2 = param_1.fputs("RECEIVEDTECHNOLOGY\n");
        if (iVar2 === -1) {
          return;
        }
        local_104 = `technology=${local_108[0xd]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        local_104 = `receiver=${local_108[8]}`;
        iVar2 = param_1.fputs(local_104);
        if (iVar2 === -1) {
          return;
        }
        FUN_00548e23(param_1, local_108);
      }
    }
    iVar2 = param_1.fputs("@ENDIF\n");
    if (iVar2 === -1) {
      return;
    }
    local_108 = local_108[0x6f];
  } while( true );
}



// ============================================================
// Function: FUN_0054a4c4 @ 0x0054A4C4
// Size: 894 bytes
// save_events_file
// ============================================================

export function FUN_0054a4c4() {
  // This function saves the events file (EVENTS.TXT).
  // It is heavily UI/file-I/O dependent (Win32 file operations).
  // Stubbed — not relevant to game logic engine.
  return 0;
}



// ============================================================
// Function: FUN_0054a874 @ 0x0054A874
// Size: 95 bytes
// get_nth_set_bit
// ============================================================

export function FUN_0054a874(param_1, param_2) {
  let bVar1;
  let local_8;

  local_8 = 0;
  do {
    if (local_8 === 0) {
      local_8 = 1;
    }
    else {
      local_8 = local_8 << 1;
    }
    for (; (param_2 & local_8) === 0; local_8 = local_8 << 1) {
    }
    bVar1 = param_1 !== 0;
    param_1 = param_1 + -1;
  } while (bVar1);
  return local_8;
}



// ============================================================
// Function: FUN_0054a8d3 @ 0x0054A8D3
// Size: 63 bytes
// count_set_bits_below
// ============================================================

export function FUN_0054a8d3(param_1, param_2) {
  let local_8;

  local_8 = 0;
  while (param_1 = param_1 >>> 1, param_1 !== 0) {
    if ((param_2 & param_1) !== 0) {
      local_8 = local_8 + 1;
    }
  }
  return local_8;
}



// ============================================================
// Function: FUN_0054a912 @ 0x0054A912
// Size: 1125 bytes
// show_event_picker_dialog
// ============================================================

export function FUN_0054a912(param_1, param_2, param_3) {
  // This function shows a UI dialog for picking event parameters
  // (civs, unit types, techs, terrains, etc.).
  // Heavily UI dependent (MFC dialog, list box, etc.).
  // Stubbed — not relevant to game logic engine.
  // Returns param_1 unchanged as default.
  return param_1;
}



// ============================================================
// Function: FUN_0054ada1 @ 0x0054ADA1
// Size: 12 bytes
// event_picker_cleanup
// ============================================================

export function FUN_0054ada1() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_0054adb7 @ 0x0054ADB7
// Size: 15 bytes
// event_picker_seh_cleanup
// ============================================================

export function FUN_0054adb7() {
  // SEH (structured exception handling) cleanup — no-op in JS
  return;
}



// ============================================================
// Function: FUN_0054adc6 @ 0x0054ADC6
// Size: 205 bytes
// event_pick_civ_with_trigger_roles
// ============================================================

export function FUN_0054adc6(param_1, param_2, param_3, param_4) {
  let uVar1;

  if (param_3 === 0x100) {
    param_1 = FUN_0054a912(param_1, param_2, 6);
    if (param_1 !== -1) {
      if (param_1 < 0) {
        param_4[0] = "TRIGGERRECEIVER";
      }
      else {
        uVar1 = FUN_00493c7d(param_1);
        param_4[0] = uVar1;
      }
    }
  }
  else {
    param_1 = FUN_0054a912(param_1, param_2, 5);
    if (param_1 !== -1) {
      if (param_1 < 0) {
        if (param_1 === -3) {
          param_4[0] = "TRIGGERATTACKER";
        }
        else {
          param_4[0] = "TRIGGERDEFENDER";
        }
      }
      else {
        uVar1 = FUN_00493c7d(param_1);
        param_4[0] = uVar1;
      }
    }
  }
  return param_1;
}



// ============================================================
// Function: FUN_0054ae93 @ 0x0054AE93
// Size: 602 bytes
// event_editor_enable_buttons
// ============================================================

export function FUN_0054ae93() {
  let iVar1;
  let uVar2;
  let local_14;
  let local_10;
  let local_8;

  FUN_00453c80();
  local_8 = FUN_00551d50();
  if (local_8 < 0) {
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
    FUN_00453c40();
  }
  else {
    FUN_00453c80();
    local_14 = DAT_0064b99c;
    while ((local_14 !== null && (local_8 !== 0))) {
      local_14 = local_14[0x6f]; // linked list traversal (offset 0x1bc / 4 = 0x6f)
      local_8 = local_8 + -1;
    }
    if ((local_14[0] & 0x20) === 0) {
      FUN_00453c80();
    }
    else {
      FUN_00453c40();
    }
    if (local_14[0] === 0x20) {
      local_10 = 0;
      while ((1 << (local_10 & 0x1f) & (local_14[1] | 0xfffffe6f)) !== 0) {
        local_10 = local_10 + 1;
      }
    }
    else {
      local_10 = 0;
      while ((local_14[1] & (1 << (local_10 & 0x1f))) !== 0) {
        local_10 = local_10 + 1;
      }
    }
    if ((local_10 < 0xc) && ((local_14[0] & 0x90) === 0)) {
      FUN_00453c80();
    }
    else {
      FUN_00453c40();
    }
    iVar1 = FUN_00551d50();
    if (iVar1 < 0) {
      FUN_00453c40();
      FUN_00453c40();
    }
    else {
      FUN_00453c80();
      uVar2 = FUN_0054a874(iVar1, local_14[1]);
      if ((uVar2 & 0x3140) === 0) {
        FUN_00453c80();
      }
      else {
        FUN_00453c40();
      }
    }
  }
  return;
}



// ============================================================
// Function: show_messagebox_B0ED @ 0x0054B0ED
// Size: 232 bytes
// event_editor_save_and_refresh
// ============================================================

export function show_messagebox_B0ED() {
  let iVar1;

  if (DAT_0062e014 === 0) {
    FUN_004cef35();
    iVar1 = FUN_0054a4c4();
    if (iVar1 === 0) {
      // MessageBoxA — error dialog, no-op in JS
    }
    DAT_006a1d7c = 0;
    // CRichEditDoc::InvalidateObjectCache — no-op in JS
    FUN_004e4ceb();
  }
  else {
    let local_28;
    if (DAT_006a4f88 === 0) {
      local_28 = 0;
    }
    else {
      local_28 = DAT_006a4f88 + 0x48;
    }
    FUN_0059d3c9(local_28);
    FUN_004190d0("DEBUG", "NOTICE");
    FUN_0059d3c9(0);
    DAT_0062e014 = 0;
    FUN_00548df0();
  }
  return;
}



// ============================================================
// Function: FUN_0054b1d5 @ 0x0054B1D5
// Size: 238 bytes
// show_trigger_help
// ============================================================

export function FUN_0054b1d5(param_1) {
  let local_c;
  let local_8;

  switch(param_1) {
  case 0:
    local_8 = "HELPUNITKILLED";
    break;
  case 1:
    local_8 = "HELPCITYTAKEN";
    break;
  case 2:
    local_8 = "HELPTURN";
    break;
  case 3:
    local_8 = "HELPTURNINTERVAL";
    break;
  case 4:
    local_8 = "HELPNEGOTIATION";
    break;
  case 5:
    local_8 = "HELPSCENARIOLOADED";
    break;
  case 6:
    local_8 = "HELPRANDOMTURN";
    break;
  case 7:
    local_8 = "HELPNOSCHISM";
    break;
  case 8:
    local_8 = "HELPRECEIVEDTECHNOLOGY";
    break;
  }
  if (DAT_006a4f88 === 0) {
    local_c = 0;
  }
  else {
    local_c = DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_c);
  FUN_004190d0("", local_8);
  FUN_0059d3c9(0);
  FUN_00548df0();
  return;
}



// ============================================================
// Function: FUN_0054b2ec @ 0x0054B2EC
// Size: 274 bytes
// show_action_help
// ============================================================

export function FUN_0054b2ec(param_1) {
  let local_c;
  let local_8;

  switch(param_1) {
  case 0:
    local_8 = "HELPTEXT";
    break;
  case 1:
    local_8 = "HELPMOVEUNIT";
    break;
  case 2:
    local_8 = "HELPCREATEUNIT";
    break;
  case 3:
    local_8 = "HELPCHANGEMONEY";
    break;
  case 4:
    local_8 = "HELPPLAYWAVEFILE";
    break;
  case 5:
    local_8 = "HELPMAKEAGGRESSION";
    break;
  case 6:
    local_8 = "HELPJUSTONCE";
    break;
  case 7:
    local_8 = "HELPPLAYCDTRACK";
    break;
  case 8:
    local_8 = "HELPDONTPLAYWONDERS";
    break;
  case 9:
    local_8 = "HELPCHANGETERRAIN";
    break;
  case 10:
    local_8 = "HELPDESTROYACIVILIZATION";
    break;
  case 0xb:
    local_8 = "HELPGIVETECHNOLOGY";
    break;
  }
  if (DAT_006a4f88 === 0) {
    local_c = 0;
  }
  else {
    local_c = DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_c);
  FUN_004190d0("", local_8);
  FUN_0059d3c9(0);
  FUN_00548df0();
  return;
}



// ============================================================
// Function: FUN_0054b433 @ 0x0054B433
// Size: 440 bytes
// event_editor_show_help
// ============================================================

export function FUN_0054b433() {
  let iVar1;
  let local_20;
  let local_14;
  let local_10;
  let local_c;

  iVar1 = FUN_00551d50();
  if (iVar1 < 0) {
    local_c = FUN_00551d50();
    if (local_c < 0) {
      if (DAT_006a4f88 === 0) {
        local_20 = 0;
      }
      else {
        local_20 = DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_20);
      FUN_004190d0("", "EVENTS");
      FUN_0059d3c9(0);
      FUN_00548df0();
    }
    else {
      local_14 = DAT_0064b99c;
      while ((local_14 !== null && (local_c !== 0))) {
        local_14 = local_14[0x6f];
        local_c = local_c + -1;
      }
      local_10 = local_14[0];
      local_c = 0;
      for (; (local_10 & 1) === 0; local_10 = local_10 >>> 1) {
        local_c = local_c + 1;
      }
      if (local_14 !== null) {
        FUN_0054b1d5(local_c);
      }
    }
  }
  else {
    local_c = FUN_00551d50();
    local_14 = DAT_0064b99c;
    while ((local_14 !== null && (local_c !== 0))) {
      local_14 = local_14[0x6f];
      local_c = local_c + -1;
    }
    local_10 = FUN_0054a874(iVar1, local_14[1]);
    local_c = 0;
    for (; (local_10 & 1) === 0; local_10 = local_10 >>> 1) {
      local_c = local_c + 1;
    }
    if (local_14 !== null) {
      FUN_0054b2ec(local_c);
    }
  }
  return;
}



// ============================================================
// Function: FUN_0054b5eb @ 0x0054B5EB
// Size: 74 bytes
// event_editor_reload_events
// ============================================================

export function FUN_0054b5eb() {
  FUN_004fa5d9(50000);
  FUN_004ce98e(DAT_0064b690, DAT_00632578);
  DAT_006a1d7c = 0;
  // CRichEditDoc::InvalidateObjectCache — no-op in JS
  return;
}



// ============================================================
// Function: FUN_0054b635 @ 0x0054B635
// Size: 1239 bytes
// event_editor_populate_trigger_list
// ============================================================

export function FUN_0054b635() {
  let uVar1;
  let uVar2;
  let local_114;
  let local_110;
  let local_10c;
  let local_108;
  let local_104 = "";

  local_108 = 0;
  FUN_00419060();
  for (local_10c = DAT_0064b99c; local_10c !== null; local_10c = local_10c[0x6f]) {
    local_108 = local_108 + 1;
    uVar1 = local_10c[0];
    if (uVar1 < 9) {
      if (uVar1 === 8) {
        local_104 = `${local_108}. TURNINTERVAL: ${local_10c[0xb]}`;
      }
      else if (uVar1 === 1) {
        if (((local_10c[2] === 0) || (local_10c[5] === 0)) || (local_10c[8] === 0)) {
          local_104 = `${local_108}. UNITKILLED`;
        }
        else {
          local_104 = `${local_108}. UNITKILLED: ${local_10c[2]} attacker=${local_10c[5]} defender=${local_10c[8]}`;
        }
      }
      else if (uVar1 === 2) {
        if (((local_10c[4] === 0) || (local_10c[5] === 0)) || (local_10c[8] === 0)) {
          local_104 = `${local_108}. CITYTAKEN`;
        }
        else {
          local_104 = `${local_108}. CITYTAKEN: ${local_10c[4]} attacker=${local_10c[5]} defender=${local_10c[8]}`;
        }
      }
      else if (uVar1 === 4) {
        local_104 = `${local_108}. TURN: ${local_10c[0xb]}`;
      }
    }
    else {
      switch(uVar1) {
      case 0x10:
        if ((local_10c[5] === 0) || (local_10c[8] === 0)) {
          local_104 = `${local_108}. NEGOTIATION`;
        }
        else {
          if (local_10c[10] === 1) {
            local_110 = "HUMAN";
          }
          else if (local_10c[10] === 2) {
            local_110 = "COMPUTER";
          }
          else {
            local_110 = "HUMANORCOMPUTER";
          }
          if (local_10c[7] === 1) {
            local_114 = "HUMAN";
          }
          else if (local_10c[7] === 2) {
            local_114 = "COMPUTER";
          }
          else {
            local_114 = "HUMANORCOMPUTER";
          }
          local_104 = `${local_108}. NEGOTIATION: talker=${local_10c[5]} (${local_114}) listener=${local_10c[8]} (${local_110})`;
        }
        break;
      // cases 0x11-0x1f, 0x21-0xff: fall through (break)
      default:
        break;
      case 0x20:
        local_104 = `${local_108}. SCENARIOLOADED`;
        break;
      case 0x40:
        if (local_10c[0xc] === 0) {
          local_104 = `${local_108}. RANDOMTURN`;
        }
        else {
          local_104 = `${local_108}. RANDOMTURN: denominator=${local_10c[0xc]}`;
        }
        break;
      case 0x80:
        if (local_10c[8] === 0) {
          local_104 = `${local_108}. NOSCHISM`;
        }
        else {
          local_104 = `${local_108}. NOSCHISM: ${local_10c[8]}`;
        }
        break;
      case 0x100:
        if (local_10c[8] === 0) {
          local_104 = `${local_108}. RECEIVEDTECHNOLOGY`;
        }
        else {
          uVar2 = FUN_00428b0c(DAT_00627684[local_10c[0xd] * 0x10],
                               local_10c[8]);
          local_104 = `${local_108}. RECEIVEDTECHNOLOGY: ${uVar2}`;
        }
      }
    }
    FUN_00419020(local_104);
  }
  FUN_0054ae93(0);
  return;
}



// ============================================================
// Function: FUN_0054bc1a @ 0x0054BC1A
// Size: 1866 bytes
// event_editor_populate_action_list
// ============================================================

export function FUN_0054bc1a() {
  let iVar1;
  let uVar2;
  let uVar3;
  let bVar4;
  let local_11c = "";
  let local_10c;
  let local_108;
  let local_104 = "";

  local_108 = FUN_00551d50();
  local_10c = DAT_0064b99c;
  while ((local_10c !== null &&
         (iVar1 = local_108 + -1, bVar4 = local_108 !== 0, local_108 = iVar1, bVar4))) {
    local_10c = local_10c[0x6f]; // offset 0x1bc bytes = word offset 0x6f
  }
  FUN_00419060();
  local_108 = 1;
  if (local_10c !== null) {
    do {
      local_104 = "";
      uVar2 = local_10c[1] & local_108;
      if (uVar2 < 9) {
        if (uVar2 === 8) {
          if (local_10c[0x5d] === 0) {
            local_104 = "CHANGEMONEY";
          }
          else {
            local_104 = `CHANGEMONEY: receiver=${local_10c[0x5d]} amount=${local_10c[0x5f]}`;
          }
        }
        else if (uVar2 === 1) {
          if (local_10c[0x0e] === 0) {
            local_104 = "TEXT";
          }
          else {
            local_104 = `TEXT: ${local_10c[0x0e]}`;
          }
        }
        else if (uVar2 === 2) {
          if ((local_10c[0x24] === 0) || (local_10c[0x22] === 0)) {
            local_104 = "MOVEUNIT";
          }
          else {
            local_104 = `MOVEUNIT: ${local_10c[0x24]} owner=${local_10c[0x22]}`;
          }
        }
        else if (uVar2 === 4) {
          if (((local_10c[0x37] === 0) || (local_10c[0x35] === 0)) ||
             (local_10c[0x4f] === 0)) {
            local_104 = "CREATEUNIT";
          }
          else {
            local_104 = `CREATEUNIT: ${local_10c[0x37]} owner=${local_10c[0x35]} veteran=${(local_10c[0x4e] !== 0) ? "yes" : "no"} homecity=${local_10c[0x4f]}`;
          }
        }
      }
      else if (uVar2 < 0x21) {
        if (uVar2 === 0x20) {
          if ((local_10c[0x33] === 0) || (local_10c[0x31] === 0)) {
            local_104 = "MAKEAGGRESSION";
          }
          else {
            local_104 = `MAKEAGGRESSION: aggressor=${local_10c[0x33]} victim=${local_10c[0x31]}`;
          }
        }
        else if (uVar2 === 0x10) {
          if (local_10c[0x61] === 0) {
            local_104 = "PLAYWAVEFILE";
          }
          else {
            local_104 = `PLAYWAVEFILE: ${local_10c[0x61]}`;
          }
        }
      }
      else if (uVar2 < 0x81) {
        if (uVar2 === 0x80) {
          if (local_10c[0x62] === 0) {
            local_104 = "PLAYCDTRACK";
          }
          else {
            local_104 = `PLAYCDTRACK: ${local_10c[0x62]}`;
          }
        }
        else if (uVar2 === 0x40) {
          local_104 = "JUSTONCE";
        }
      }
      else if (uVar2 < 0x201) {
        if (uVar2 === 0x200) {
          uVar3 = FUN_00428b0c(DAT_00627cc4[local_10c[0x63] * 0x18]);
          local_104 = `CHANGETERRAIN: ${uVar3}`;
        }
        else if (uVar2 === 0x100) {
          local_104 = "DONTPLAYWONDERS";
        }
      }
      else if (uVar2 === 0x400) {
        if (local_10c[0x6c] < 0) {
          if ((local_10c._1_ & 1) === 0) {
            if (local_10c[0x6c] === -3) {
              local_104 = "DESTROYACIVILIZATION: TRIGGERATTACKER";
            }
            else {
              local_104 = "DESTROYACIVILIZATION: TRIGGERDEFENDER";
            }
          }
          else {
            local_104 = "DESTROYACIVILIZATION: TRIGGERRECEIVER";
          }
        }
        else {
          uVar3 = FUN_00493c7d(local_10c[0x6c]);
          local_104 = `DESTROYACIVILIZATION: ${uVar3}`;
        }
      }
      else if (uVar2 === 0x800) {
        if (local_10c[0x6e] === 0) {
          local_104 = "GIVETECHNOLOGY";
        }
        else if (local_10c[0x6e] < 0) {
          if ((local_10c._1_ & 1) === 0) {
            if (local_10c[0x6e] === -3) {
              local_11c = "TRIGGERATTACKER";
            }
            else {
              local_11c = "TRIGGERDEFENDER";
            }
          }
          else {
            local_11c = "TRIGGERRECEIVER";
          }
          uVar3 = FUN_00428b0c(DAT_00627684[local_10c[0x6d] * 0x10]);
          local_104 = `GIVETECHNOLOGY: receiver=${local_11c} tech=${uVar3}`;
        }
        else {
          uVar3 = FUN_00428b0c(DAT_00627684[local_10c[0x6d] * 0x10]);
          uVar3 = FUN_00493c7d(local_10c[0x6e], uVar3);
          local_104 = `GIVETECHNOLOGY: receiver=${uVar3}`;
        }
      }
      else if (uVar2 === 0x2000) {
        local_104 = "HASTRIGGERED";
      }
      if (local_104 !== "") {
        FUN_00419020(local_104);
      }
      local_108 = local_108 << 1;
    } while (local_108 !== 0x8000);
  }
  FUN_0054ae93(0);
  return;
}



// ============================================================
// Function: FUN_0054c36e @ 0x0054C36E
// Size: 307 bytes
// event_editor_delete_trigger
// ============================================================

export function FUN_0054c36e() {
  let iVar1;
  let local_14;
  let local_10;
  let local_c;

  if (DAT_006a4f88 === 0) {
    local_14 = 0;
  }
  else {
    local_14 = DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_14);
  iVar1 = FUN_00421ea0("DELETEITEM");
  if (iVar1 !== 0) {
    iVar1 = FUN_00551d50();
    local_c = iVar1;
    for (local_10 = DAT_0064b99c; local_10 !== null; local_10 = local_10[0x6f]) {
      if (local_c === 0) break;
      local_c = local_c + -1;
    }
    if (local_10._next_ !== null) {
      local_10._next_._prev_ = local_10._prev_;
    }
    if (local_10._prev_ !== null) {
      local_10._prev_._next_ = local_10._next_;
    }
    if (iVar1 === 0) {
      DAT_0064b99c = local_10._next_;
    }
    FUN_004cef35();
    FUN_0054b635();
    FUN_0054bc1a(0);
  }
  FUN_0059d3c9(0);
  FUN_00548df0();
  return;
}



// ============================================================
// Function: FUN_0054c4a1 @ 0x0054C4A1
// Size: 3867 bytes
// event_editor_edit_trigger
// ============================================================

export function FUN_0054c4a1() {
  // This is the main "edit trigger" UI function for the scenario events editor.
  // Heavily UI-dependent (dialogs, list boxes, text inputs).
  // Stubbed — not relevant to game logic engine.
  return 0;
}



// ============================================================
// Function: FUN_0054d4ca @ 0x0054D4CA
// Size: 28 bytes
// event_editor_edit_trigger_wrapper
// ============================================================

export function FUN_0054d4ca(param_1) {
  FUN_0054c4a1(param_1);
  return;
}



// ============================================================
// Function: show_messagebox_D4E6 @ 0x0054D4E6
// Size: 500 bytes
// event_editor_add_trigger
// ============================================================

export function show_messagebox_D4E6() {
  // This is the "add new trigger" UI function for the scenario events editor.
  // Heavily UI-dependent (dialogs, list boxes, message boxes).
  // Stubbed — not relevant to game logic engine.
  FUN_00548df0();
  return;
}



// ============================================================
// Function: FUN_0054d6da @ 0x0054D6DA
// Size: 277 bytes
// event_editor_delete_action
// ============================================================

export function FUN_0054d6da() {
  let iVar1;
  let uVar2;
  let uVar3;
  let local_18;
  let local_10;
  let local_c;

  local_c = FUN_00551d50();
  for (local_10 = DAT_0064b99c; local_10 !== null; local_10 = local_10[0x6f]) {
    if (local_c === 0) break;
    local_c = local_c + -1;
  }
  if (DAT_006a4f88 === 0) {
    local_18 = 0;
  }
  else {
    local_18 = DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_18);
  iVar1 = FUN_00421ea0("DELETEITEM");
  if (iVar1 !== 0) {
    uVar2 = FUN_00551d50();
    iVar1 = FUN_0054a874(uVar2, local_10[1]);
    if (iVar1 === 1) {
      local_10[0x0e] = 0;  // clear TEXT action data
    }
    uVar3 = FUN_0054a874(uVar2, local_10[1]);
    local_10[1] = local_10[1] & ~uVar3;
    FUN_0054bc1a(0);
    FUN_004cef35();
  }
  FUN_0059d3c9(0);
  FUN_00548df0();
  return;
}



// ============================================================
// Function: FUN_0054d7ef @ 0x0054D7EF
// Size: 5782 bytes
// event_editor_edit_action
// ============================================================

export function FUN_0054d7ef() {
  // This is the main "edit action" UI function for the scenario events editor.
  // Extremely large, heavily UI-dependent (dialogs, text inputs, file pickers).
  // Stubbed — not relevant to game logic engine.
  FUN_004cef35();
  FUN_0054bc1a(0);
  FUN_0054ae93(0);
  FUN_00548df0();
  FUN_0059d3c9(0);
  return;
}



// ============================================================
// Function: FUN_0054ee8f @ 0x0054EE8F
// Size: 12 bytes
// event_editor_action_cleanup
// ============================================================

export function FUN_0054ee8f() {
  FUN_00418870();
  return;
}



// ============================================================
// Function: FUN_0054eea5 @ 0x0054EEA5
// Size: 15 bytes
// event_editor_action_seh_cleanup
// ============================================================

export function FUN_0054eea5() {
  // SEH (structured exception handling) cleanup — no-op in JS
  return;
}



// ============================================================
// Function: FUN_0054eeb4 @ 0x0054EEB4
// Size: 28 bytes
// event_editor_edit_action_wrapper
// ============================================================

export function FUN_0054eeb4(param_1) {
  FUN_0054d7ef(param_1);
  return;
}



// ============================================================
// Function: show_messagebox_EED0 @ 0x0054EED0
// Size: 667 bytes
// event_editor_add_action
// ============================================================

export function show_messagebox_EED0() {
  // This is the "add action to trigger" UI function for the scenario events editor.
  // Heavily UI-dependent (dialogs, list boxes, message boxes).
  // Stubbed — not relevant to game logic engine.
  FUN_00548df0();
  return;
}



// ============================================================
// Function: FUN_0054f16b @ 0x0054F16B
// Size: 590 bytes
// events_editor_paint
// ============================================================

export function FUN_0054f16b() {
  // Events editor paint/render function.
  // Purely UI — draws buttons, progress bars, labels.
  // Stubbed — not relevant to game logic engine.
  return;
}



// ============================================================
// Function: FUN_0054f3b9 @ 0x0054F3B9
// Size: 3035 bytes
// events_editor_init
// ============================================================

export function FUN_0054f3b9() {
  // Events editor initialization and main loop.
  // Creates MFC property sheets, buttons, list boxes, runs message loop.
  // Stubbed — not relevant to game logic engine.
  return;
}



// ============================================================
// Function: FUN_0054ffa4 @ 0x0054FFA4
// Size: 12 bytes
// events_editor_init_cleanup
// ============================================================

export function FUN_0054ffa4() {
  FUN_005c656b();
  return;
}



// ============================================================
// Function: FUN_0054ffba @ 0x0054FFBA
// Size: 14 bytes
// events_editor_init_seh_cleanup
// ============================================================

export function FUN_0054ffba() {
  // SEH (structured exception handling) cleanup — no-op in JS
  return;
}



// ============================================================
// Function: FUN_0054ffc8 @ 0x0054FFC8
// Size: 79 bytes
// events_editor_open
// ============================================================

export function FUN_0054ffc8() {
  // Opens the events editor window (wrapper around init).
  // Purely UI.
  FUN_00417fa0();
  FUN_0054f3b9();
  FUN_00550017();
  FUN_0055002d();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// STUB DECLARATIONS
//
// Functions called by this block but defined elsewhere.
// These are declared here as no-op stubs so the module can load
// without import errors. Replace with real imports when available.
// ═══════════════════════════════════════════════════════════════════

// -- AI/Game logic stubs --
function FUN_00484d52() { /* thunk_FUN_00484d52 */ }
function FUN_005b49cf() { return 0; /* thunk_FUN_005b49cf — check_city_at_tile_for_civ */ }
function FUN_00538a29() { return 0; /* thunk_FUN_00538a29 */ }
function FUN_005b2c3d() { return 0; /* thunk_FUN_005b2c3d */ }
function FUN_004c5408() { return 0; /* thunk_FUN_004c5408 */ }
function FUN_005b6787() { /* thunk_FUN_005b6787 — execute_settle */ }
function FUN_005b6458() { return 0; /* thunk_FUN_005b6458 — unit_needs_processing */ }
function FUN_004b0b53() { /* thunk_FUN_004b0b53 — multiplayer broadcast */ }
function XD_FlushSendBuffer() { /* XD_FlushSendBuffer */ }
function FUN_0047e94e() { /* thunk_FUN_0047e94e */ }
function FUN_0041033a() { /* thunk_FUN_0041033a — yield/message pump */ }
function FUN_005b50ad() { return 0; /* thunk_FUN_005b50ad */ }
function FUN_005cef31() { /* FUN_005cef31 — draw icon */ }

// -- UI stubs --
function FUN_00418770() { return 0; /* thunk_FUN_00418770 — get window handle */ }
function FUN_00493c7d() { return ""; /* thunk_FUN_00493c7d — get_civ_name */ }
function FUN_00428b0c() { return ""; /* thunk_FUN_00428b0c — get_string_resource */ }
function FUN_005f22d0() { /* FUN_005f22d0 — strcpy */ }
function FUN_005f22e0() { /* FUN_005f22e0 — strcat */ }
function FUN_00453c80() { /* thunk_FUN_00453c80 — enable_button */ }
function FUN_00453c40() { /* thunk_FUN_00453c40 — disable_button */ }
function FUN_00551d50() { return -1; /* thunk_FUN_00551d50 — get_listbox_selection */ }
function FUN_00551d80() { /* thunk_FUN_00551d80 — set_listbox_selection */ }
function FUN_00419060() { /* thunk_FUN_00419060 — clear_listbox */ }
function FUN_00419020() { /* thunk_FUN_00419020 — add_listbox_item */ }
function FUN_0059d3c9() { /* thunk_FUN_0059d3c9 — set_dialog_parent */ }
function FUN_004190d0() { /* thunk_FUN_004190d0 — show_help_dialog */ }
function FUN_00421ea0() { return 0; /* thunk_FUN_00421ea0 — confirm_dialog */ }
function FUN_004cef35() { /* thunk_FUN_004cef35 — mark_events_dirty */ }
function FUN_004e4ceb() { /* thunk_FUN_004e4ceb */ }
function FUN_004fa5d9() { /* thunk_FUN_004fa5d9 */ }
function FUN_004ce98e() { /* thunk_FUN_004ce98e */ }
function FUN_0059df8a() { /* thunk_FUN_0059df8a */ }
function FUN_00418870() { /* thunk_FUN_00418870 */ }
function FUN_00417fa0() { /* thunk_FUN_00417fa0 */ }
function FUN_005c656b() { /* FUN_005c656b */ }
function FUN_00550017() { /* FUN_00550017 */ }
function FUN_0055002d() { /* FUN_0055002d */ }
function FUN_00551e20() { return -1; /* thunk_FUN_00551e20 */ }
function FUN_004fa617() { return null; /* thunk_FUN_004fa617 */ }
function FUN_0051d75d() { return -1; /* thunk_FUN_0051d75d */ }
function FUN_004cdf4b() { return 0; /* thunk_FUN_004cdf4b */ }
function FUN_0051d63b() { return -1; /* thunk_FUN_0051d63b */ }
function FUN_004ce71b() { return 0; /* thunk_FUN_004ce71b */ }
function FUN_0051d3e0() { return -1; /* thunk_FUN_0051d3e0 */ }
function FUN_004cdd3d() { return -1; /* thunk_FUN_004cdd3d */ }
function FUN_004a24b1() { return "0"; /* thunk_FUN_004a24b1 */ }
function FUN_005bb574() { /* FUN_005bb574 */ }
function FUN_005c64da() { /* FUN_005c64da */ }
function FUN_005c61b0() { /* FUN_005c61b0 */ }
function FUN_005d268e() { /* FUN_005d268e */ }
function FUN_005d25a8() { /* FUN_005d25a8 */ }
function FUN_005d2550() { /* FUN_005d2550 */ }
function FUN_005d2568() { /* FUN_005d2568 */ }
function FUN_005d2590() { /* FUN_005d2590 */ }

// -- Globals used by this block (not in mem.js yet) --
let DAT_00655afe = 0;     // current unit index
let DAT_00655b05 = 0;     // current civ
let DAT_00655af0 = 0;     // game flags
let DAT_0064bc60 = 0;     // scenario flags
let DAT_00655af8 = 0;     // turn number
let DAT_0064bcba = 0;     // scenario civ
let DAT_00655b02 = 0;     // multiplayer status
let DAT_006ad698 = 0;     // disconnect flag
let DAT_006ad685 = 0;     // disconnect flag 2
let DAT_00655b0b = 0;     // human players bitmask
let DAT_0064b99c = null;  // event linked list head
let DAT_006a4f88 = 0;     // events editor window pointer
let DAT_0062e014 = 0;     // events editor debug flag
let DAT_006a1d7c = 0;     // events editor active flag
let DAT_006a1d80 = 0;     // events editor control ID counter
let DAT_00632578 = 0;     // events backup pointer
let DAT_0064b690 = 0;     // events data
let DAT_00628420 = 0;     // string resource table base
let DAT_0064b984 = 0;     // memory allocation context
let DAT_0064b994 = 0;     // events count
let DAT_0064b992 = 0;     // events max
let DAT_00631edc = 0;     // help flag
let DAT_0062cd24 = "";    // file extension
let DAT_00627684 = [];    // tech name table
let DAT_00627cc4 = [];    // terrain name table
let DAT_0062e01c = 0;     // events editor param
let DAT_006560ff = 0;     // (alias, used inline)
let DAT_00679640 = "";    // string buffer
