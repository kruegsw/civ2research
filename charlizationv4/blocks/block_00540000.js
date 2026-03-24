// ═══════════════════════════════════════════════════════════════════
// block_00540000.js — Mechanical transpilation of block_00540000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00540000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00540000.c
// ═══════════════════════════════════════════════════════════════════




// ============================================================
// Function: FUN_00543b80 @ 0x00543B80
// Size: 322 bytes
// ai_try_settle_unit
// ============================================================

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00408460, FUN_0040bbb0, FUN_0040bc40, FUN_0040bc80, FUN_0040ef50, FUN_0040ef70 } from './block_00400000.js';
import { FUN_0040fdb0 } from './block_00400000.js';
import { FUN_0041033a, FUN_00414d10, FUN_00414d70, FUN_0041508c, FUN_00415133, FUN_00417ef0 } from './block_00410000.js';
import { FUN_00417fa0, FUN_00418770, FUN_004187a0, FUN_00418870, FUN_00419020, FUN_00419060 } from './block_00410000.js';
import { FUN_004190d0 } from './block_00410000.js';
import { FUN_00421da0, FUN_00421ea0, FUN_00428b0c } from './block_00420000.js';
import { FUN_00453c40, FUN_00453c80 } from './block_00450000.js';
import { FUN_0047e94e } from './block_00470000.js';
import { FUN_00484d52 } from './block_00480000.js';
import { FUN_00493c7d } from './block_00490000.js';
import { FUN_004a24b1 } from './block_004A0000.js';
import { FUN_004b0b53 } from './block_004B0000.js';
import { FUN_004c5408, FUN_004cdd3d, FUN_004cdf4b, FUN_004ce38a, FUN_004ce71b, FUN_004ce8a4 } from './block_004C0000.js';
import { FUN_004ce98e, FUN_004cef35 } from './block_004C0000.js';
import { FUN_004d007e } from './block_004D0000.js';
import { FUN_004e4ceb } from './block_004E0000.js';
import { FUN_004fa4be, FUN_004fa5d9, FUN_004fa617 } from './block_004F0000.js';
import { FUN_0051d3e0, FUN_0051d63b, FUN_0051d75d } from './block_00510000.js';
import { FUN_00538a29 } from './block_00530000.js';
import { FUN_00550017, FUN_0055002d, FUN_00551cd0, FUN_00551d50, FUN_00551d80, FUN_00551e20 } from './block_00550000.js';
import { FUN_00551e60, FUN_00552112, FUN_005534bc } from './block_00550000.js';
import { FUN_0056b810 } from './block_00560000.js';
import { FUN_0059d3c9, FUN_0059db08, FUN_0059df8a, FUN_0059e5c9, FUN_0059e6a9, FUN_0059e6ff } from './block_00590000.js';
import { FUN_0059ea99, FUN_0059edf0 } from './block_00590000.js';
import { FUN_005a9964, FUN_005a9abf } from './block_005A0000.js';
import { FUN_005b2c3d, FUN_005b49cf, FUN_005b50ad, FUN_005b6458, FUN_005b6787, FUN_005baeb0 } from './block_005B0000.js';
import { FUN_005baec8, FUN_005baee0, FUN_005bb024, FUN_005bb574 } from './block_005B0000.js';
import { FUN_005c61b0, FUN_005c64da, FUN_005c656b, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005d2550, FUN_005d2568, FUN_005d2590, FUN_005d25a8, FUN_005d268e } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

export function FUN_00543b80() {
  let iVar1;
  let iVar2;

  FUN_00484d52();
  iVar1 = G.DAT_00655afe;
  if (((((((G.DAT_006560f0[iVar1 * 0x20 + 0x08]) !== 0) && ((G.DAT_006560f0[iVar1 * 0x20 + 0x0F]) === 0x0b)) &&
        ((G.DAT_0064b1bc[u8(G.DAT_006560f0[iVar1 * 0x20 + 0x06]) * 0x14 + 0x0D]) === 0)) &&
       (((G.DAT_0064b1bc[u8(G.DAT_006560f0[iVar1 * 0x20 + 0x06]) * 0x14 + 0x0E]) !== 0x02 ||
        (iVar2 = FUN_005b49cf(
          (G.DAT_006560f0[iVar1 * 0x20] | (G.DAT_006560f0[iVar1 * 0x20 + 1] << 8)) << 16 >> 16,
          (G.DAT_006560f0[iVar1 * 0x20 + 2] | (G.DAT_006560f0[iVar1 * 0x20 + 3] << 8)) << 16 >> 16,
          s8(G.DAT_006560f0[iVar1 * 0x20 + 0x07])), iVar2 === 0)))) ||
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

  iVar3 = G.DAT_00655b05;
  bVar1 = false;
  if (((((G.DAT_00655af0 & 0x80) !== 0) && (((G.DAT_0064bc60) & 0x8000) !== 0)) && (G.DAT_00655af8 === 1)
      ) && (G.DAT_0064bcba === iVar3)) {
    bVar1 = true;
  }
  local_c = 0;
  do {
    if (1 < local_c) {
      return;
    }
    local_18 = G.DAT_00655b16;
    while (local_18 = local_18 + -1, -1 < local_18) {
      if (2 < G.DAT_00655b02) {
        if (G.DAT_006ad698 !== 0) {
          return;
        }
        if (G.DAT_006ad685 !== 0) {
          return;
        }
      }
      if (((G.DAT_006560f0[local_18 * 0x20 + 0x1A] | (G.DAT_006560f0[local_18 * 0x20 + 0x1B] << 8) |
            (G.DAT_006560f0[local_18 * 0x20 + 0x1C] << 16) | (G.DAT_006560f0[local_18 * 0x20 + 0x1D] << 24)) !== 0) &&
          (s8(G.DAT_006560f0[local_18 * 0x20 + 0x07]) === iVar3) &&
         ((local_14 = 0, !bVar1 ||
          ((local_c !== 0 ||
           ((G.DAT_0064b1bc[u8(G.DAT_006560f0[local_18 * 0x20 + 0x06]) * 0x14 + 0x05]) === 0x01)))))) {
        while (iVar4 = FUN_005b6458(local_18), iVar4 !== 0) {
          if (2 < G.DAT_00655b02) {
            FUN_004b0b53(0xff,2,0,0,0);
            XD_FlushSendBuffer(5000);
            FUN_0047e94e(1,0);
          }
          sVar2 = G.DAT_00655b16;
          G.DAT_00655afe = local_18;
          FUN_00543b80();
          if (G.DAT_00655b16 !== sVar2) break;
          if ((G.DAT_006560f0[local_18 * 0x20 + 0x0F]) !== 0x0b &&
             ((G.DAT_0064b1bc[u8(G.DAT_006560f0[local_18 * 0x20 + 0x06]) * 0x14 + 0x05]) !== 0x01)) {
            local_14 = local_14 + 1;
          }
          local_14 = local_14 + 1;
          if (0x14 < local_14) {
            FUN_005b6787(local_18);
            break;
          }
          if ((((local_c === 0) && (iVar3 !== 0)) &&
              ((G.DAT_0064b1bc[u8(G.DAT_006560f0[local_18 * 0x20 + 0x06]) * 0x14 + 0x0D]) !== 0)) &&
             (((iVar4 = FUN_005b2c3d(local_18), iVar4 === 0 &&
               (iVar4 = FUN_005b89e4(
                 (G.DAT_006560f0[local_18 * 0x20] | (G.DAT_006560f0[local_18 * 0x20 + 1] << 8)) << 16 >> 16,
                 (G.DAT_006560f0[local_18 * 0x20 + 2] | (G.DAT_006560f0[local_18 * 0x20 + 3] << 8)) << 16 >> 16),
               iVar4 !== 0)) &&
              ((iVar4 = FUN_005b50ad(local_18,2), 1 < iVar4 &&
               (((G.DAT_00655b0b & (G.DAT_006560f0[local_18 * 0x20 + 0x09])) !== 0 ||
                (iVar4 = FUN_005b49cf(
                  (G.DAT_006560f0[local_18 * 0x20] | (G.DAT_006560f0[local_18 * 0x20 + 1] << 8)) << 16 >> 16,
                  (G.DAT_006560f0[local_18 * 0x20 + 2] | (G.DAT_006560f0[local_18 * 0x20 + 3] << 8)) << 16 >> 16,
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

  local_108 = G.DAT_0064b99c;
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
  let iVar1;
  let pcVar2;
  let local_228;
  let local_224;
  let local_220;
  let local_21c;
  let local_118;
  let local_108;

  local_224 = null;
  local_220 = null;
  // DEVIATION: Win32 API (strcpy/strcat for filename construction)
  local_118 = "EVENTS.";
  local_118 = local_118 + G.DAT_0062cd24;
  local_228 = 0;
  // DEVIATION: Win32 API (_getcwd, _chdir)
  local_21c = "";
  iVar1 = FUN_00415133("EVENTS.BAK");
  if (((iVar1 === 0) || (iVar1 = FID_conflict__remove("EVENTS.BAK"), iVar1 === 0)) &&
     ((iVar1 = FUN_00415133(local_118), iVar1 === 0 ||
      (iVar1 = FID_conflict___wrename(local_118, "EVENTS.BAK"), iVar1 === 0)))) {
    local_224 = FUN_0041508c("EVENTS.BAK", "r");
    local_220 = FUN_0041508c(local_118, "w");
    if (local_220 !== null) {
      if (local_224 === null) {
        iVar1 = local_220.fputs("@BEGINEVENTS\n");
        if (iVar1 === -1) {
          // goto LAB_0054a7eb
          if (local_224 !== null) {
            // DEVIATION: Win32 API (_fclose)
          }
          if (local_220 !== null) {
            // DEVIATION: Win32 API (_fclose)
          }
          // DEVIATION: Win32 API (_chdir)
          return local_228;
        }
      }
      else {
        do {
          pcVar2 = local_224.fgets(local_108, 0x100);
          if ((pcVar2 === null) || (iVar1 = local_220.fputs(local_108), iVar1 === -1)) {
            // goto LAB_0054a7eb
            if (local_224 !== null) {
              // DEVIATION: Win32 API (_fclose)
            }
            if (local_220 !== null) {
              // DEVIATION: Win32 API (_fclose)
            }
            // DEVIATION: Win32 API (_chdir)
            return local_228;
          }
          FUN_0056b810(local_108);
          FUN_004d007e(local_108);
          iVar1 = local_108.localeCompare("@BEGINEVENTS");
        } while (iVar1 !== 0);
      }
      FUN_00549aee(local_220);
      if (local_224 === null) {
        iVar1 = local_220.fputs("@ENDEVENTS\n");
        if (iVar1 !== -1) {
          local_228 = 1;
        }
      }
      else {
        do {
          pcVar2 = local_224.fgets(local_108, 0x100);
          if (pcVar2 === null) {
            // goto LAB_0054a7eb
            if (local_224 !== null) {
              // DEVIATION: Win32 API (_fclose)
            }
            if (local_220 !== null) {
              // DEVIATION: Win32 API (_fclose)
            }
            // DEVIATION: Win32 API (_chdir)
            return local_228;
          }
          FUN_0056b810(local_108);
          FUN_004d007e(local_108);
          iVar1 = local_108.localeCompare("@ENDEVENTS");
        } while (iVar1 !== 0);
        iVar1 = local_220.fputs("@ENDEVENTS\n");
        while (iVar1 !== -1) {
          pcVar2 = local_224.fgets(local_108, 0x100);
          if (pcVar2 === null) {
            local_228 = 1;
            break;
          }
          iVar1 = local_220.fputs(local_108);
        }
      }
    }
  }
  // LAB_0054a7eb
  if (local_224 !== null) {
    // DEVIATION: Win32 API (_fclose)
  }
  if (local_220 !== null) {
    // DEVIATION: Win32 API (_fclose)
  }
  // DEVIATION: Win32 API (_chdir)
  return local_228;
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
  let uVar1;
  let iVar2;
  let uVar3;
  let local_318;
  let local_310;
  let local_30c;

  // DEVIATION: Win32 API (SEH setup)
  // DEVIATION: Win32 API (dialog init: FUN_0059db08, FUN_0040bc40, FUN_0059e6a9, FUN_0059e6ff, FUN_0059e5c9)
  FUN_0059db08(0x4000);
  FUN_0040bc40(0x1001);
  FUN_0059e6a9(param_2);
  FUN_0059e6ff(0xdc);
  FUN_0059e5c9(8, 0xdc, 0);
  switch(param_3) {
  case 0:
    if (param_1 === 0) {
      param_1 = 1;
    }
    for (local_30c = 1; local_30c < 8; local_30c = local_30c + 1) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00493c7d(local_30c, local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 1:
    for (local_30c = 0; local_30c < 0x3e; local_30c = local_30c + 1) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00428b0c(G.DAT_0064b1b8[local_30c * 0x14], local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 2:
    for (local_310 = 0; local_310 < 100; local_310 = local_310 + 1) {
      uVar3 = 0;
      iVar2 = local_310;
      uVar1 = FUN_00428b0c(G.DAT_00627684[local_310 * 0x10], local_310, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 3:
    FUN_0059edf0("ANYUNIT", 0xfffffffe, 0);
    for (local_30c = 0; local_30c < 0x3e; local_30c = local_30c + 1) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00428b0c(G.DAT_0064b1b8[local_30c * 0x14], local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 4:
    if (param_1 === 0) {
      param_1 = -2;
    }
    FUN_0059edf0("ANYBODY", 0xfffffffe, 0);
    for (local_30c = 1; local_30c < 8; local_30c = local_30c + 1) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00493c7d(local_30c, local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 5:
    if (param_1 === 0) {
      param_1 = -3;
    }
    FUN_0059edf0("TRIGGERATTACKER", 0xfffffffd, 0);
    FUN_0059edf0("TRIGGERDEFENDER", 0xfffffffc, 0);
    for (local_30c = 1; local_30c < 8; local_30c = local_30c + 1) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00493c7d(local_30c, local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 6:
    if (param_1 === 0) {
      param_1 = -4;
    }
    FUN_0059edf0("TRIGGERRECEIVER", 0xfffffffc, 0);
    for (local_30c = 1; local_30c < 8; local_30c = local_30c + 1) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00493c7d(local_30c, local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
    break;
  case 7:
    for (local_30c = 0; local_30c < 0xb; local_30c = local_30c + 1) {
      uVar3 = 0;
      iVar2 = local_30c;
      uVar1 = FUN_00428b0c(G.DAT_00627cc4[local_30c * 0x18], local_30c, 0);
      FUN_0059edf0(uVar1, iVar2, uVar3);
    }
  }
  FUN_0059ea99(param_1);
  if (G.DAT_006a4f88 === 0) {
    local_318 = 0;
  }
  else {
    local_318 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_318);
  // DEVIATION: Win32 API (FUN_0040bc80 — run modal dialog)
  FUN_0040bc80(0);
  FUN_0059d3c9(0);
  // DEVIATION: Win32 API (SEH cleanup)
  FUN_0054ada1();
  FUN_0054adb7();
  return;
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

// Source: decompiled/block_00540000.c FUN_0054adb7 (14 bytes)
export function FUN_0054adb7() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
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
    local_14 = G.DAT_0064b99c;
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

  if (G.DAT_0062e014 === 0) {
    FUN_004cef35();
    iVar1 = FUN_0054a4c4();
    if (iVar1 === 0) {
      // MessageBoxA — error dialog, no-op in JS
    }
    G.DAT_006a1d7c = 0;
    // CRichEditDoc::InvalidateObjectCache — no-op in JS
    FUN_004e4ceb();
  }
  else {
    let local_28;
    if (G.DAT_006a4f88 === 0) {
      local_28 = 0;
    }
    else {
      local_28 = G.DAT_006a4f88 + 0x48;
    }
    FUN_0059d3c9(local_28);
    FUN_004190d0("DEBUG", "NOTICE");
    FUN_0059d3c9(0);
    G.DAT_0062e014 = 0;
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
  if (G.DAT_006a4f88 === 0) {
    local_c = 0;
  }
  else {
    local_c = G.DAT_006a4f88 + 0x48;
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
  if (G.DAT_006a4f88 === 0) {
    local_c = 0;
  }
  else {
    local_c = G.DAT_006a4f88 + 0x48;
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
      if (G.DAT_006a4f88 === 0) {
        local_20 = 0;
      }
      else {
        local_20 = G.DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_20);
      FUN_004190d0("", "EVENTS");
      FUN_0059d3c9(0);
      FUN_00548df0();
    }
    else {
      local_14 = G.DAT_0064b99c;
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
    local_14 = G.DAT_0064b99c;
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
  FUN_004ce98e(G.DAT_0064b690, G.DAT_00632578);
  G.DAT_006a1d7c = 0;
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
  for (local_10c = G.DAT_0064b99c; local_10c !== null; local_10c = local_10c[0x6f]) {
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
          uVar2 = FUN_00428b0c(G.DAT_00627684[local_10c[0xd] * 0x10],
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
  local_10c = G.DAT_0064b99c;
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
          uVar3 = FUN_00428b0c(G.DAT_00627cc4[local_10c[0x63] * 0x18]);
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
          uVar3 = FUN_00428b0c(G.DAT_00627684[local_10c[0x6d] * 0x10]);
          local_104 = `GIVETECHNOLOGY: receiver=${local_11c} tech=${uVar3}`;
        }
        else {
          uVar3 = FUN_00428b0c(G.DAT_00627684[local_10c[0x6d] * 0x10]);
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

  if (G.DAT_006a4f88 === 0) {
    local_14 = 0;
  }
  else {
    local_14 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_14);
  iVar1 = FUN_00421ea0("DELETEITEM");
  if (iVar1 !== 0) {
    iVar1 = FUN_00551d50();
    local_c = iVar1;
    for (local_10 = G.DAT_0064b99c; local_10 !== null; local_10 = local_10[0x6f]) {
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
      G.DAT_0064b99c = local_10._next_;
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
  if (G.DAT_006a4f88 === 0) {
    local_128 = 0;
  }
  else {
    local_128 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_128);
  local_10 = FUN_00551d50();
  local_120 = G.DAT_0064b99c;
  local_18 = local_10;
  while ((local_120 !== null &&
         (iVar2 = local_18 + -1, bVar5 = local_18 !== 0, local_18 = iVar2, bVar5))) {
    local_120 = local_120[0x6f];
  }
  uVar4 = local_120[0];
  if (uVar4 < 9) {
    if (uVar4 === 8) {
      if (G.DAT_006a4f88 === 0) {
        local_138 = 0;
      }
      else {
        local_138 = G.DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_138);
      local_c = FUN_0051d75d("DEBUG", "TURNINTERVAL", local_120[0xb], [local_14]);
      if (G.DAT_006a4f88 === 0) {
        local_13c = 0;
      }
      else {
        local_13c = G.DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_13c);
      if (local_c === 0) {
        uVar4 = FUN_004cdf4b(local_14, 0, 0x7fff);
        local_120[0xb] = uVar4;
        local_124 = 1;
      }
    }
    else if (uVar4 === 1) {
      uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x890, 1);
      local_c = FUN_0054a912(local_120[3], uVar3);
      if (local_c !== 0xffffffff) {
        if (local_c < 0) {
          local_120[3] = 0xfffffffe;
          local_8 = "ANYUNIT";
        }
        else {
          local_120[3] = local_c;
          local_8 = FUN_00428b0c(G.DAT_0064b1b8[local_120[3] * 0x14]);
        }
        sVar1 = local_8.length;
        uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
        local_120[2] = uVar4;
        if (local_120[2] !== 0) {
          FUN_005f22d0(local_120[2], local_8);
          uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x894, 4);
          local_c = FUN_0054a912(local_120[6], uVar3);
          if (local_c !== 0xffffffff) {
            if (local_c < 0) {
              local_120[6] = 0xfffffffe;
              local_8 = "ANYBODY";
            }
            else {
              local_120[6] = local_c;
              local_8 = FUN_00493c7d(local_120[6]);
            }
            sVar1 = local_8.length;
            uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
            local_120[5] = uVar4;
            if (local_120[5] !== 0) {
              FUN_005f22d0(local_120[5], local_8);
              uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x898, 4);
              local_c = FUN_0054a912(local_120[9], uVar3);
              if (local_c !== 0xffffffff) {
                if (local_c < 0) {
                  local_120[9] = 0xfffffffe;
                  local_8 = "ANYBODY";
                }
                else {
                  local_120[9] = local_c;
                  local_8 = FUN_00493c7d(local_120[9]);
                }
                sVar1 = local_8.length;
                uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
                local_120[8] = uVar4;
                if (local_120[8] !== 0) {
                  FUN_005f22d0(local_120[8], local_8);
                  local_124 = 1;
                }
              }
            }
          }
        }
      }
    }
    else if (uVar4 === 2) {
      do {
        if (local_120[4] === 0) {
          local_120[4] = "";
        }
        if (G.DAT_006a4f88 === 0) {
          local_130 = 0;
        }
        else {
          local_130 = G.DAT_006a4f88 + 0x48;
        }
        FUN_0059d3c9(local_130);
        local_c = FUN_0051d63b("DEBUG", "CITYNAME", 0x17, local_120[4], local_11c);
        FUN_0059d3c9(0);
      } while ((-1 < local_c) &&
              ((sVar1 = local_11c.length, sVar1 === 0 ||
               (iVar2 = FUN_004ce71b(local_11c), iVar2 === 0))));
      if ((-1 < local_c) && (sVar1 = local_11c.length, sVar1 !== 0)) {
        sVar1 = local_11c.length;
        uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
        local_120[4] = uVar4;
        if (local_120[4] !== 0) {
          FUN_005f22d0(local_120[4], local_11c);
          uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x894, 4);
          local_c = FUN_0054a912(local_120[6], uVar3);
          if (local_c !== 0xffffffff) {
            if (local_c < 0) {
              local_120[6] = 0xfffffffe;
              local_8 = "ANYBODY";
            }
            else {
              local_120[6] = local_c;
              local_8 = FUN_00493c7d(local_120[6]);
            }
            sVar1 = local_8.length;
            uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
            local_120[5] = uVar4;
            if (local_120[5] !== 0) {
              FUN_005f22d0(local_120[5], local_8);
              uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x898, 4);
              local_c = FUN_0054a912(local_120[9], uVar3);
              if (local_c !== 0xffffffff) {
                if (local_c < 0) {
                  local_120[9] = 0xfffffffe;
                  local_8 = "ANYBODY";
                }
                else {
                  local_120[9] = local_c;
                  local_8 = FUN_00493c7d(local_120[9]);
                }
                sVar1 = local_8.length;
                uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
                local_120[8] = uVar4;
                if (local_120[8] !== 0) {
                  FUN_005f22d0(local_120[8], local_8);
                  local_124 = 1;
                }
              }
            }
          }
        }
      }
    }
    else if (uVar4 === 4) {
      if (G.DAT_006a4f88 === 0) {
        local_134 = 0;
      }
      else {
        local_134 = G.DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_134);
      local_c = FUN_0051d75d("DEBUG", "TURNCOUNT", local_120[0xb], [local_14]);
      FUN_0059d3c9(0);
      if (local_c === 0) {
        uVar4 = FUN_004cdf4b(local_14, 0xffffffff, 0x7fff);
        local_120[0xb] = uVar4;
        local_124 = 1;
      }
    }
  }
  else {
    switch(uVar4) {
    case 0x10:
      uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x89c, 4);
      local_c = FUN_0054a912(local_120[6], uVar3);
      if (local_c !== 0xffffffff) {
        if (local_c < 0) {
          local_120[6] = 0xfffffffe;
          local_8 = "ANYBODY";
        }
        else {
          local_120[6] = local_c;
          local_8 = FUN_00493c7d(local_120[6]);
        }
        sVar1 = local_8.length;
        uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
        local_120[5] = uVar4;
        if (local_120[5] !== 0) {
          FUN_005f22d0(local_120[5], local_8);
          if ((local_120[7] === 0) || (local_120[7] === 1)) {
            local_c = 0;
          }
          else if (local_120[7] === 2) {
            local_c = 1;
          }
          else {
            local_c = 2;
          }
          if (G.DAT_006a4f88 === 0) {
            local_140 = 0;
          }
          else {
            local_140 = G.DAT_006a4f88 + 0x48;
          }
          FUN_0059d3c9(local_140);
          local_c = FUN_0051d3e0("DEBUG", "TALKERTYPE", local_c, 0, 0, 0, 1);
          FUN_0059d3c9(0);
          if (-1 < local_c) {
            if (local_c === 0) {
              local_120[7] = 1;
            }
            else if (local_c === 1) {
              local_120[7] = 2;
            }
            else {
              local_120[7] = 4;
            }
            uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8a0, 4);
            local_c = FUN_0054a912(local_120[9], uVar3);
            if (local_c !== 0xffffffff) {
              if (local_c < 0) {
                local_120[9] = 0xfffffffe;
                local_8 = "ANYBODY";
              }
              else {
                local_120[9] = local_c;
                local_8 = FUN_00493c7d(local_120[9]);
              }
              sVar1 = local_8.length;
              uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
              local_120[8] = uVar4;
              if (local_120[8] !== 0) {
                FUN_005f22d0(local_120[8], local_8);
                if ((local_120[10] === 0) || (local_120[10] === 1)) {
                  local_c = 0;
                }
                else if (local_120[10] === 2) {
                  local_c = 1;
                }
                else {
                  local_c = 2;
                }
                if (G.DAT_006a4f88 === 0) {
                  local_144 = 0;
                }
                else {
                  local_144 = G.DAT_006a4f88 + 0x48;
                }
                FUN_0059d3c9(local_144);
                local_c = FUN_0051d3e0("DEBUG", "TALKERTYPE", local_c, 0, 0, 0, 1);
                FUN_0059d3c9(0);
                if (-1 < local_c) {
                  if (local_c === 0) {
                    local_120[10] = 1;
                  }
                  else if (local_c === 1) {
                    local_120[10] = 2;
                  }
                  else {
                    local_120[10] = 4;
                  }
                  local_124 = 1;
                }
              }
            }
          }
        }
      }
      break;
    default:
      break;
    case 0x20:
      local_124 = 1;
      break;
    case 0x40:
      uVar4 = FUN_004cdf4b(local_120[0xc], 1, 1000);
      local_120[0xc] = uVar4;
      if (G.DAT_006a4f88 === 0) {
        local_148 = 0;
      }
      else {
        local_148 = G.DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_148);
      local_c = FUN_0051d75d("DEBUG", "RANDOMDENOM", local_120[0xc], [local_14]);
      FUN_0059d3c9(0);
      if (local_c === 0) {
        uVar4 = FUN_004cdf4b(local_14, 1, 1000);
        local_120[0xc] = uVar4;
        local_124 = 1;
      }
      break;
    case 0x80:
      uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8a4, 4);
      local_c = FUN_0054a912(local_120[9], uVar3);
      if (local_c !== 0xffffffff) {
        if (local_c < 0) {
          local_120[9] = 0xfffffffe;
          local_8 = "ANYBODY";
        }
        else {
          local_120[9] = local_c;
          local_8 = FUN_00493c7d(local_120[9]);
        }
        sVar1 = local_8.length;
        uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
        local_120[8] = uVar4;
        if (local_120[8] !== 0) {
          FUN_005f22d0(local_120[8], local_8);
          local_124 = 1;
        }
      }
      break;
    case 0x100:
      uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8a8, 4);
      local_c = FUN_0054a912(local_120[9], uVar3);
      if (local_c !== 0xffffffff) {
        if (local_c < 0) {
          local_120[9] = 0xfffffffe;
          local_8 = "ANYBODY";
        }
        else {
          local_120[9] = local_c;
          local_8 = FUN_00493c7d(local_120[9]);
        }
        sVar1 = local_8.length;
        uVar4 = show_messagebox_CA35(G.DAT_0064b984, sVar1 + 1);
        local_120[8] = uVar4;
        if (local_120[8] !== 0) {
          FUN_005f22d0(local_120[8], local_8);
          uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8ac, 2);
          local_c = FUN_0054a912(local_120[0xd], uVar3);
          if (local_c !== 0xffffffff) {
            local_120[0xd] = local_c;
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
  while (true) {
    if (G.DAT_006a4f88 === 0) {
      local_14 = 0;
    }
    else {
      local_14 = G.DAT_006a4f88 + 0x48;
    }
    FUN_0059d3c9(local_14);
    G.DAT_00631edc = 0;
    local_c = FUN_00551e20("TRIGGERS", local_c, 1);
    FUN_0059d3c9(0);
    if (G.DAT_00631edc === 0) break;
    FUN_0054b1d5(local_c);
  }
  if (local_c !== -1) {
    if ((G.DAT_0064b994 < 0x1c4) || (piVar1 = FUN_004fa617(), piVar1 === null)) {
      uType = 0;
      lpCaption = FUN_00428b0c(G.DAT_00628420 + 0x8d0);
      lpText = FUN_00428b0c(G.DAT_00628420 + 0x8e8);
      // DEVIATION: Win32 API (MessageBoxA)
      iVar2 = FUN_00414d10();
    }
    else {
      piVar1[0] = 1 << (local_c & 0x1f);
      FUN_0054b635();
      FUN_0054bc1a(0);
      // DEVIATION: Win32 API (streambuf::egptr for listbox count)
      pcVar3 = FUN_00551e60_egptr(G.DAT_006a4f88 + 0xad0);
      FUN_00551d80(pcVar3 + -1);
      iVar2 = FUN_0054c4a1(0);
      if (iVar2 === 0) {
        for (local_10 = G.DAT_0064b99c; local_10[0x6f] !== 0;
            local_10 = local_10[0x6f]) {
        }
        if (local_10[0x70] === 0) {
          G.DAT_0064b99c = local_10[0x6f];
        }
        else {
          local_10[0x70][0x6f] = local_10[0x6f];
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
  for (local_10 = G.DAT_0064b99c; local_10 !== null; local_10 = local_10[0x6f]) {
    if (local_c === 0) break;
    local_c = local_c + -1;
  }
  if (G.DAT_006a4f88 === 0) {
    local_18 = 0;
  }
  else {
    local_18 = G.DAT_006a4f88 + 0x48;
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
  let uVar1;
  let uVar2;
  let sVar3;
  let iVar4;
  let pcVar5;
  let lVar6;
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

  // DEVIATION: Win32 API (SEH setup, FUN_004187a0)
  FUN_004187a0();
  if (G.DAT_006a4f88 === 0) {
    local_1c4 = 0;
  }
  else {
    local_1c4 = G.DAT_006a4f88 + 0x48;
  }
  FUN_0059d3c9(local_1c4);
  local_ac = FUN_00551d50();
  local_1b8 = G.DAT_0064b99c;
  while ((local_1b8 !== null &&
         (iVar4 = local_ac + -1, bVar7 = local_ac !== 0, local_ac = iVar4, bVar7))) {
    local_1b8 = local_1b8[0x6f];
  }
  uVar1 = FUN_00551d50(local_1b8[1]);
  uVar2 = FUN_0054a874(uVar1);
  if (uVar2 < 9) {
    if (uVar2 === 8) {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8a8, local_1b8[0], [local_14]);
      local_18 = FUN_0054adc6(local_1b8[0x5e], uVar1);
      if (local_18 !== -1) {
        local_1b8[0x5e] = local_18;
        sVar3 = local_14.length;
        uVar1 = show_messagebox_CA35(G.DAT_0064b984, sVar3 + 1);
        local_1b8[0x5d] = uVar1;
        if (local_1b8[0x5d] !== 0) {
          FUN_005f22d0(local_1b8[0x5d], local_14);
          if (G.DAT_006a4f88 === 0) {
            local_1ec = 0;
          }
          else {
            local_1ec = G.DAT_006a4f88 + 0x48;
          }
          FUN_0059d3c9(local_1ec);
          local_18 = FUN_004ce8a4("DEBUG", "AMOUNT", local_1b8[0x5f], [local_60]);
          FUN_0059d3c9(0);
          if (local_18 === 0) {
            uVar1 = FUN_004cdf4b(local_60, 0xffff8ad0, 30000);
            local_1b8[0x5f] = uVar1;
          }
        }
      }
    }
    else if (uVar2 === 1) {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8b0);
      FUN_004ce38a(local_1b8[0x0e], uVar1);
    }
    else if (uVar2 === 2) {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8b4, 3);
      local_18 = FUN_0054a912(local_1b8[0x25], uVar1);
      if (local_18 !== -1) {
        if (local_18 < 0) {
          local_1b8[0x25] = 0xfffffffe;
          local_14 = "ANYUNIT";
        }
        else {
          local_1b8[0x25] = local_18;
          local_14 = FUN_00428b0c(G.DAT_0064b1b8[local_1b8[0x25] * 0x14]);
        }
        sVar3 = local_14.length;
        uVar1 = show_messagebox_CA35(G.DAT_0064b984, sVar3 + 1);
        local_1b8[0x24] = uVar1;
        if (local_1b8[0x24] !== 0) {
          FUN_005f22d0(local_1b8[0x24], local_14);
          uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8b8, local_1b8[0], [local_14]);
          local_18 = FUN_0054adc6(local_1b8[0x23], uVar1);
          if (local_18 !== -1) {
            local_1b8[0x23] = local_18;
            sVar3 = local_14.length;
            uVar1 = show_messagebox_CA35(G.DAT_0064b984, sVar3 + 1);
            local_1b8[0x22] = uVar1;
            if (local_1b8[0x22] !== 0) {
              FUN_005f22d0(local_1b8[0x22], local_14);
              local_58 = `${local_1b8[0x27]},${local_1b8[0x28]},${local_1b8[0x29]},${local_1b8[0x2a]},${local_1b8[0x2b]},${local_1b8[0x2c]},${local_1b8[0x2d]},${local_1b8[0x2e]}`;
              if (G.DAT_006a4f88 === 0) {
                local_1cc = 0;
              }
              else {
                local_1cc = G.DAT_006a4f88 + 0x48;
              }
              FUN_0059d3c9(local_1cc);
              do {
                local_18 = FUN_0051d63b("DEBUG", "MAPRECT", 0x1f, local_58, local_1b0);
                if (local_18 === -1) break;
                sVar3 = local_1b0.length;
              } while (sVar3 === 0);
              FUN_0059d3c9(0);
              if (local_18 !== -1) {
                sVar3 = local_1b0.length;
                if (sVar3 !== 0) {
                  FUN_005f22d0(G.DAT_00679640, local_1b0);
                  for (local_ac = 0; local_ac < 4; local_ac = local_ac + 1) {
                    pcVar5 = FUN_004a24b1(0, 0x7fff);
                    lVar6 = parseInt(pcVar5);
                    uVar1 = FUN_004cdf4b(lVar6);
                    local_1b8[local_ac * 2 + 0x27] = uVar1;
                    pcVar5 = FUN_004a24b1(0, 0x7fff);
                    lVar6 = parseInt(pcVar5);
                    uVar1 = FUN_004cdf4b(lVar6);
                    local_1b8[local_ac * 2 + 0x28] = uVar1;
                  }
                }
                local_58 = `${local_1b8[0x2f]},${local_1b8[0x30]}`;
                if (G.DAT_006a4f88 === 0) {
                  local_1d0 = 0;
                }
                else {
                  local_1d0 = G.DAT_006a4f88 + 0x48;
                }
                FUN_0059d3c9(local_1d0);
                local_18 = FUN_0051d63b("DEBUG", "LOCATION", 8, local_58, local_1b0);
                if (G.DAT_006a4f88 === 0) {
                  local_1d4 = 0;
                }
                else {
                  local_1d4 = G.DAT_006a4f88 + 0x48;
                }
                FUN_0059d3c9(local_1d4);
                if (local_18 !== -1) {
                  sVar3 = local_1b0.length;
                  if (sVar3 !== 0) {
                    FUN_005f22d0(G.DAT_00679640, local_1b0);
                    pcVar5 = FUN_004a24b1(0, 0x7fff);
                    lVar6 = parseInt(pcVar5);
                    uVar1 = FUN_004cdf4b(lVar6);
                    local_1b8[0x2f] = uVar1;
                    pcVar5 = FUN_004a24b1(0, 0x7fff);
                    lVar6 = parseInt(pcVar5);
                    uVar1 = FUN_004cdf4b(lVar6);
                    local_1b8[0x30] = uVar1;
                  }
                  if (G.DAT_006a4f88 === 0) {
                    local_1d8 = 0;
                  }
                  else {
                    local_1d8 = G.DAT_006a4f88 + 0x48;
                  }
                  FUN_0059d3c9(local_1d8);
                  if (local_1b8[0x26] === -2) {
                    local_1dc = 0xffffffff;
                  }
                  else {
                    local_1dc = local_1b8[0x26];
                  }
                  local_18 = FUN_0051d75d("DEBUG", "NUMUNITS", local_1dc, [local_60]);
                  FUN_0059d3c9(0);
                  if (local_18 === 0) {
                    if (local_60 === -1) {
                      local_1b8[0x26] = 0xfffffffe;
                    }
                    else {
                      uVar1 = FUN_004cdf4b(local_60, 0, 0x7fff);
                      local_1b8[0x26] = uVar1;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    else if (uVar2 === 4) {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8bc, 1);
      local_18 = FUN_0054a912(local_1b8[0x38], uVar1);
      if (local_18 !== -1) {
        local_1b8[0x38] = local_18;
        local_14 = FUN_00428b0c(G.DAT_0064b1b8[local_1b8[0x38] * 0x14]);
        sVar3 = local_14.length;
        uVar1 = show_messagebox_CA35(G.DAT_0064b984, sVar3 + 1);
        local_1b8[0x37] = uVar1;
        if (local_1b8[0x37] !== 0) {
          FUN_005f22d0(local_1b8[0x37], local_14);
          uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8b8, local_1b8[0], [local_14]);
          local_18 = FUN_0054adc6(local_1b8[0x36], uVar1);
          if (local_18 !== -1) {
            local_1b8[0x36] = local_18;
            sVar3 = local_14.length;
            uVar1 = show_messagebox_CA35(G.DAT_0064b984, sVar3 + 1);
            local_1b8[0x35] = uVar1;
            if (local_1b8[0x35] !== 0) {
              FUN_005f22d0(local_1b8[0x35], local_14);
              if (G.DAT_006a4f88 === 0) {
                local_1e0 = 0;
              }
              else {
                local_1e0 = G.DAT_006a4f88 + 0x48;
              }
              FUN_0059d3c9(local_1e0);
              local_5c = FUN_00551e60("VETERAN", local_1b8[0x4e], 0);
              FUN_0059d3c9(0);
              if (-1 < local_5c) {
                local_1b8[0x4e] = local_5c;
                do {
                  if (local_1b8[0x4f] === 0) {
                    local_1b8[0x4f] = "";
                  }
                  if (G.DAT_006a4f88 === 0) {
                    local_1e4 = 0;
                  }
                  else {
                    local_1e4 = G.DAT_006a4f88 + 0x48;
                  }
                  FUN_0059d3c9(local_1e4);
                  local_18 = FUN_0051d63b("DEBUG", "HOMECITYNAME", 0x17, local_1b8[0x4f], local_1b0);
                  FUN_0059d3c9(0);
                } while ((-1 < local_18) &&
                        ((sVar3 = local_1b0.length, sVar3 === 0 ||
                         (iVar4 = FUN_004ce71b(local_1b0), iVar4 === 0))));
                if ((-1 < local_18) && (sVar3 = local_1b0.length, sVar3 !== 0)) {
                  sVar3 = local_1b0.length;
                  uVar1 = show_messagebox_CA35(G.DAT_0064b984, sVar3 + 1);
                  local_1b8[0x4f] = uVar1;
                  if (local_1b8[0x4f] !== 0) {
                    FUN_005f22d0(local_1b8[0x4f], local_1b0);
                    for (local_ac = 0; local_ac < 10; local_ac = local_ac + 1) {
                      local_1b8[0x4d] = local_ac;
                      local_58 = `${local_1b8[local_ac * 2 + 0x39]},${local_1b8[local_ac * 2 + 0x3a]}`;
                      if (G.DAT_006a4f88 === 0) {
                        local_1e8 = 0;
                      }
                      else {
                        local_1e8 = G.DAT_006a4f88 + 0x48;
                      }
                      FUN_0059d3c9(local_1e8);
                      FUN_00421da0(0, local_ac + 1);
                      local_18 = FUN_0051d63b("DEBUG", "LOCATIONNUM", 8, local_58, local_1b0);
                      FUN_0059d3c9(0);
                      if (local_18 === -1) {
                        if (local_ac === 0) break;
                        do {
                          local_1b8[local_ac * 2 + 0x39] = 0;
                          local_1b8[local_ac * 2 + 0x3a] = 0;
                          local_ac = local_ac + 1;
                        } while (local_ac < 10);
                      }
                      else {
                        sVar3 = local_1b0.length;
                        if (sVar3 !== 0) {
                          FUN_005f22d0(G.DAT_00679640, local_1b0);
                          pcVar5 = FUN_004a24b1(0, 0x7fff);
                          lVar6 = parseInt(pcVar5);
                          uVar1 = FUN_004cdf4b(lVar6);
                          local_1b8[local_ac * 2 + 0x39] = uVar1;
                          pcVar5 = FUN_004a24b1(0, 0x7fff);
                          lVar6 = parseInt(pcVar5);
                          uVar1 = FUN_004cdf4b(lVar6);
                          local_1b8[local_ac * 2 + 0x3a] = uVar1;
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
  else if (uVar2 < 0x21) {
    if (uVar2 === 0x20) {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8c0, 0);
      local_18 = FUN_0054a912(local_1b8[0x34], uVar1);
      if (local_18 !== -1) {
        local_1b8[0x34] = local_18;
        local_14 = FUN_00493c7d(local_1b8[0x34]);
        sVar3 = local_14.length;
        uVar1 = show_messagebox_CA35(G.DAT_0064b984, sVar3 + 1);
        local_1b8[0x33] = uVar1;
        if (local_1b8[0x33] !== 0) {
          FUN_005f22d0(local_1b8[0x33], local_14);
          uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8c4, 0);
          local_18 = FUN_0054a912(local_1b8[0x32], uVar1);
          if (local_18 !== -1) {
            local_1b8[0x32] = local_18;
            local_14 = FUN_00493c7d(local_1b8[0x32]);
            sVar3 = local_14.length;
            uVar1 = show_messagebox_CA35(G.DAT_0064b984, sVar3 + 1);
            local_1b8[0x31] = uVar1;
            if (local_1b8[0x31] !== 0) {
              FUN_005f22d0(local_1b8[0x31], local_14);
            }
          }
        }
      }
    }
    else if (uVar2 === 0x10) {
      if (local_1b8[0x61] === 0) {
        local_1b8[0x61] = "";
      }
      if (G.DAT_006a4f88 === 0) {
        local_1f0 = 0;
      }
      else {
        local_1f0 = G.DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_1f0);
      do {
        local_18 = FUN_0051d63b("DEBUG", "WAVFILE", 10, local_1b8[0x61], local_1b0);
        if (local_18 === -1) break;
        sVar3 = local_1b0.length;
      } while (sVar3 === 0);
      FUN_0059d3c9(0);
      if ((-1 < local_18) && (sVar3 = local_1b0.length, sVar3 !== 0)) {
        // DEVIATION: Win32 API (_strchr, _strupr for filename extension handling)
        if (local_1b0.indexOf(".") === -1) {
          local_1b0 = local_1b0 + ".WAV";
        }
        local_1b0 = local_1b0.toUpperCase();
        sVar3 = local_1b0.length;
        uVar1 = show_messagebox_CA35(G.DAT_0064b984, sVar3 + 1);
        local_1b8[0x61] = uVar1;
        if (local_1b8[0x61] !== 0) {
          FUN_005f22d0(local_1b8[0x61], local_1b0);
        }
      }
    }
  }
  else if (uVar2 < 0x81) {
    if (uVar2 === 0x80) {
      uVar1 = FUN_004cdf4b(local_1b8[0x62], 2, 0x18);
      local_1b8[0x62] = uVar1;
      FUN_00421da0(0, 2);
      FUN_00421da0(1, 0x18);
      if (G.DAT_006a4f88 === 0) {
        local_1f4 = 0;
      }
      else {
        local_1f4 = G.DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_1f4);
      local_18 = FUN_0051d75d("DEBUG", "CDTRACK", local_1b8[0x62], [local_60]);
      FUN_0059d3c9(0);
      if (local_18 === 0) {
        uVar1 = FUN_004cdf4b(local_60, 2, 0x18);
        local_1b8[0x62] = uVar1;
      }
    }
  }
  else if (uVar2 < 0x201) {
    if (uVar2 === 0x200) {
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x970, 7);
      local_18 = FUN_0054a912(local_1b8[99], uVar1);
      if (local_18 === -1) {
        local_18 = -1;
      }
      else {
        local_1b8[99] = local_18;
        local_58 = `${local_1b8[100]},${local_1b8[0x65]},${local_1b8[0x66]},${local_1b8[0x67]},${local_1b8[0x68]},${local_1b8[0x69]},${local_1b8[0x6a]},${local_1b8[0x6b]}`;
        if (G.DAT_006a4f88 === 0) {
          local_1f8 = 0;
        }
        else {
          local_1f8 = G.DAT_006a4f88 + 0x48;
        }
        FUN_0059d3c9(local_1f8);
        do {
          local_18 = FUN_0051d63b("DEBUG", "MAPRECT", 0x1f, local_58, local_1b0);
          if (local_18 === -1) break;
          sVar3 = local_1b0.length;
        } while (sVar3 === 0);
        FUN_0059d3c9(0);
        if ((local_18 !== -1) && (sVar3 = local_1b0.length, sVar3 !== 0)) {
          FUN_005f22d0(G.DAT_00679640, local_1b0);
          for (local_ac = 0; local_ac < 4; local_ac = local_ac + 1) {
            pcVar5 = FUN_004a24b1(0, 0x7fff);
            lVar6 = parseInt(pcVar5);
            uVar1 = FUN_004cdf4b(lVar6);
            local_1b8[local_ac * 2 + 100] = uVar1;
            pcVar5 = FUN_004a24b1(0, 0x7fff);
            lVar6 = parseInt(pcVar5);
            uVar1 = FUN_004cdf4b(lVar6);
            local_1b8[local_ac * 2 + 0x65] = uVar1;
          }
        }
      }
    }
  }
  else if (uVar2 === 0x400) {
    uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8c8, local_1b8[0], [local_14]);
    local_18 = FUN_0054adc6(local_1b8[0x6c], uVar1);
    if (local_18 !== -1) {
      local_1b8[0x6c] = local_18;
    }
  }
  else if (uVar2 === 0x800) {
    uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8a8, local_1b8[0], [local_14]);
    local_18 = FUN_0054adc6(local_1b8[0x6e], uVar1);
    if (local_18 === -1) {
      local_18 = -1;
    }
    else {
      local_1b8[0x6e] = local_18;
      uVar1 = FUN_00428b0c(G.DAT_00628420 + 0x8ac, 2);
      local_18 = FUN_0054a912(local_1b8[0x6d], uVar1);
      if (local_18 !== -1) {
        local_1b8[0x6d] = local_18;
      }
    }
  }
  FUN_004cef35();
  FUN_0054bc1a(0);
  local_5c = FUN_0054a8d3(uVar2, local_1b8[1]);
  FUN_00551d80(local_5c);
  FUN_0054ae93(0);
  FUN_00548df0();
  FUN_0059d3c9(0);
  // DEVIATION: Win32 API (SEH cleanup)
  FUN_0054ee8f();
  FUN_0054eea5();
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

// Source: decompiled/block_00540000.c FUN_0054eea5 (14 bytes)
export function FUN_0054eea5() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
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
  local_18 = G.DAT_0064b99c;
  while ((local_18 !== null && (local_14 !== 0))) {
    local_18 = local_18[0x6f];
    local_14 = local_14 + -1;
  }
  if (local_18[0] === 0x20) {
    local_14 = 0;
    while ((1 << (local_14 & 0x1f) & (local_18[1] | 0xfffffe6f)) !== 0) {
      local_14 = local_14 + 1;
    }
  }
  else {
    local_14 = 0;
    while ((local_18[1] & 1 << (local_14 & 0x1f)) !== 0) {
      local_14 = local_14 + 1;
    }
  }
  if (local_14 < 0xd) {
    while (true) {
      if (G.DAT_006a4f88 === 0) {
        local_20 = 0;
      }
      else {
        local_20 = G.DAT_006a4f88 + 0x48;
      }
      FUN_0059d3c9(local_20);
      G.DAT_00631edc = 0;
      if (local_18[0] === 0x20) {
        local_14 = FUN_004cdd3d("ACTIONS", local_14, local_18[1] | 0xfffffe6f, 1);
      }
      else {
        local_14 = FUN_004cdd3d("ACTIONS", local_14, local_18[1], 1);
      }
      FUN_0059d3c9(0);
      if (G.DAT_00631edc === 0) break;
      FUN_0054b2ec(local_14);
    }
    if (local_14 !== -1) {
      local_18[1] = local_18[1] | 1 << (local_14 & 0x1f);
      uVar1 = FUN_0054a8d3(1 << (local_14 & 0x1f), local_18[1]);
      FUN_0054bc1a(0);
      FUN_00551d80(uVar1);
      iVar2 = FUN_0054d7ef(0);
      if (iVar2 === 0) {
        local_8 = FUN_00551d50();
        local_18 = G.DAT_0064b99c;
        while ((local_18 !== null && (local_8 !== 0))) {
          local_18 = local_18[0x6f];
          local_8 = local_8 + -1;
        }
        local_18[1] = local_18[1] & ~(1 << (local_14 & 0x1f));
        FUN_0054bc1a(0);
      }
    }
  }
  else {
    uType = 0;
    lpCaption = FUN_00428b0c(G.DAT_00628420 + 0x8d0);
    lpText = FUN_00428b0c(G.DAT_00628420 + 0x8cc);
    // DEVIATION: Win32 API (MessageBoxA)
  }
  FUN_00548df0();
  return;
}



// ============================================================
// Function: FUN_0054f16b @ 0x0054F16B
// Size: 590 bytes
// events_editor_paint
// ============================================================

export function FUN_0054f16b() {
  let iVar1;
  let uVar2;
  let iVar3;
  let uVar4;
  let in_ECX;
  let iVar5;

  // DEVIATION: Win32 API (FUN_00552112 — begin paint)
  FUN_00552112();
  // DEVIATION: Win32 API (FUN_0040fdb0 — set font)
  FUN_0040fdb0(in_ECX, in_ECX + 700, 0x1a);
  FUN_005baeb0(in_ECX);
  FUN_005baec8(G.DAT_006a4f90);
  FUN_005baee0(0x29, 0x12, 1, 1);
  iVar5 = in_ECX + 0x124 + in_ECX + 300 / 2;  // *(int *)(in_ECX + 0x124) + *(int *)(in_ECX + 300) / 2
  iVar1 = in_ECX + 0x128;  // *(int *)(in_ECX + 0x128)
  iVar3 = in_ECX + 0x2e8;  // *(int *)(in_ECX + 0x2e8)
  // DEVIATION: Win32 API (FUN_0040bbb0 — get DC)
  FUN_0040bbb0();
  uVar2 = FUN_00428b0c(G.DAT_00628420 + 0x8d4);
  // DEVIATION: Win32 API (FUN_00414d70 — set text)
  FUN_00414d70(uVar2);
  FUN_005bb024(in_ECX, G.DAT_00679640, iVar5, (iVar1 - iVar3) + 0x19, 0);
  iVar1 = in_ECX + 0x128;
  iVar3 = in_ECX + 0x2e8;
  FUN_0040bbb0();
  uVar2 = FUN_00428b0c(G.DAT_00628420 + 0x8d8);
  FUN_00414d70(uVar2);
  FUN_005bb024(in_ECX, G.DAT_00679640, iVar5, (iVar1 - iVar3) + 0xc3, 0);
  iVar1 = in_ECX + 0x124;
  iVar3 = iVar1 + 0x211;
  iVar5 = in_ECX + 0x128 + 0x1a;
  FUN_0040bbb0();
  G.DAT_00679640 = `${G.DAT_0064b994}`;
  FUN_005bb024(in_ECX, G.DAT_00679640, iVar1 + 0x216, (iVar5 - (in_ECX + 0x2e8)) + -2, 0);
  uVar4 = Math.trunc((G.DAT_0064b994 * 0x13b) / G.DAT_0064b992);
  FUN_005a9abf(in_ECX, iVar3, iVar5, 10, uVar4, 0x2a);
  FUN_005a9abf(in_ECX, iVar3, uVar4 + iVar5, 10, 0x13b - uVar4, 0x6a);
  FUN_005a9964(in_ECX, iVar3, iVar5, 10, 0x13b, 10);
  FUN_005a9964(in_ECX, iVar3, iVar5, 10, uVar4, 10);
  // DEVIATION: Win32 API (FUN_00408460 — end paint)
  FUN_00408460();
  return;
}



// ============================================================
// Function: FUN_0054f3b9 @ 0x0054F3B9
// Size: 3035 bytes
// events_editor_init
// ============================================================

export function FUN_0054f3b9() {
  let iVar1;
  let pvVar2;
  let uVar3;
  let uVar4;
  let extraout_EAX;
  let iVar5;
  let in_ECX;
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

  // DEVIATION: Win32 API (SEH setup)
  FUN_005c64da();
  G.DAT_006a1d7c = 1;
  G.DAT_006a4f88 = in_ECX;
  // DEVIATION: Win32 API (operator_new for event data backup)
  pvVar2 = {};
  if (pvVar2 === null) {
    local_464 = 0;
  }
  else {
    local_464 = FUN_004fa4be(50000);
  }
  G.DAT_00632578 = local_464;
  FUN_004fa5d9(50000);
  FUN_004ce98e(G.DAT_00632578, G.DAT_0064b690);
  FUN_00417ef0(0, G.DAT_0062e01c);
  FUN_005d268e(G.DAT_006a4f90);
  FUN_005d25a8(G.DAT_006a4f90);
  FUN_005d2550(0x29);
  FUN_005d2568(0x12, 1, 1);
  FUN_005d2590(0x25);
  // DEVIATION: Win32 API (property sheet layout: window sizes, control creation)
  // *(int *)(in_ECX + 0x2d8) = 0x230;
  // *(int *)(in_ECX + 0x2dc) = 0x17c;
  // *(int *)(in_ECX + 0x2ec) = 0;
  G.DAT_006a1d80 = 0xc9;
  uVar3 = FUN_0040ef70();
  // *(int *)(in_ECX + 0x2e8) = uVar3;
  // DEVIATION: Win32 API (button/listbox creation: FUN_005534bc, FUN_0040f680, FUN_0040f880, FUN_004086c0, FUN_00418f40, FUN_00418fe0)
  uVar4 = FUN_00428b0c(G.DAT_00628420 + 0x73c, 0xd, 0, 0);
  FUN_005534bc(uVar4, 0xd, 0, 0);
  // DEVIATION: Win32 API (_Timevec::~_Timevec)
  // Button creation for trigger list
  uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8dc);
  // DEVIATION: Win32 API (FUN_0040f680 — create button)
  uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8e0);
  uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8e4);
  // Button creation for action list
  uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8dc);
  uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8e0);
  uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8e4);
  // Trigger listbox creation
  iVar1 = G.DAT_006a1d80;
  G.DAT_006a1d80 = G.DAT_006a1d80 + 1;
  // DEVIATION: Win32 API (FUN_00418f40 — create listbox, FUN_00418fe0 — set listbox font)
  // DEVIATION: Win32 API (FUN_00551df0 — set listbox callback, FUN_00551dc0 — set listbox double-click handler)
  FUN_0054b635();
  FUN_00551d80(0);
  // Action listbox creation
  iVar1 = G.DAT_006a1d80;
  G.DAT_006a1d80 = G.DAT_006a1d80 + 1;
  FUN_0054bc1a(0);
  FUN_0054ae93(0);
  // Bottom buttons
  uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x3f8);
  uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x8ec);
  uVar3 = FUN_00428b0c(G.DAT_00628420 + 0x3fc);
  // DEVIATION: Win32 API (FUN_0040f840 — finalize buttons, FUN_0040f350 — show window)
  G.DAT_0062e014 = 0;
  // DEVIATION: Win32 API (CPropertySheet::EnableStackedTabs)
  FUN_005bb574();
  // DEVIATION: Win32 API (FUN_004085f0 — show window)
  FUN_005c61b0();
  // DEVIATION: Win32 API (message loop — FUN_0040ef50)
  while (G.DAT_006a1d7c !== 0) {
    FUN_0040ef50();
  }
  if (G.DAT_00632578 !== 0) {
    FUN_00551cd0(1);
  }
  G.DAT_00632578 = 0;
  // DEVIATION: Win32 API (SEH cleanup)
  FUN_0054ffa4();
  FUN_0054ffba();
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

// Source: decompiled/block_00540000.c FUN_0054ffba (14 bytes)
export function FUN_0054ffba() {
  // DEVIATION: Win32 — SEH epilog: *FS_OFFSET = *(EBP-0xc)
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
function XD_FlushSendBuffer() { /* XD_FlushSendBuffer */ }

// -- UI stubs --

// -- File I/O stubs (FUN_0054a4c4) --
function FID_conflict__remove() { return 0; /* FID_conflict__remove */ }
function FID_conflict___wrename() { return 0; /* FID_conflict___wrename */ }

// -- Dialog stubs (FUN_0054a912) --

// -- Edit trigger/action stubs --
function show_messagebox_CA35() { return 0; /* thunk_show_messagebox_CA35 — memory_alloc */ }
function FUN_00551e60_egptr() { return 0; /* streambuf::egptr wrapper */ }

// -- Paint stubs (FUN_0054f16b) --

// -- Editor init stubs (FUN_0054f3b9) --

// -- Globals used by this block (not in mem.js yet) --
