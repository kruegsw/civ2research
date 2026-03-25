// ═══════════════════════════════════════════════════════════════════
// block_00440000.js — Mechanical transpilation of block_00440000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00440000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00440000.c
// ═══════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════


// String constants (stubs)
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_0040bc80, FUN_0040ff60 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_004190d0 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421da0, FUN_00421f40, FUN_004271e8 } from './block_00420000.js';
import { FUN_0043c9d0, FUN_0043cf76, FUN_0043d07a, FUN_0043d20a, FUN_0043d400, FUN_0043f7a7 } from './block_00430000.js';
import { FUN_00453e51, FUN_00456f20 } from './block_00450000.js';
import { FUN_0046b14d, FUN_0046e020 } from './block_00460000.js';
import { FUN_0047e94e } from './block_00470000.js';
import { FUN_00488a45 } from './block_00480000.js';
import { FUN_00493c7d, FUN_00498e8b } from './block_00490000.js';
import { FUN_004a6c4b, FUN_004a6e39 } from './block_004A0000.js';
import { FUN_004b0b53 } from './block_004B0000.js';
import { FUN_004c2788 } from './block_004C0000.js';
import { FUN_004e74df, FUN_004eb4ed } from './block_004E0000.js';
import { FUN_00511880 } from './block_00510000.js';
import { FUN_00569363 } from './block_00560000.js';
import { FUN_0059df8a, FUN_0059ec88 } from './block_00590000.js';
import { FUN_005adfa0, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b2c82, FUN_005b2e69, FUN_005b53b6, FUN_005b6042, FUN_005b8a81, FUN_005b8af0 } from './block_005B0000.js';
import { FUN_005b8c18, FUN_005b8da4, FUN_005b9431, FUN_005b94fc, FUN_005b98b7, FUN_005b9c49 } from './block_005B0000.js';
import { FUN_005b9ec6, FUN_005b9f1c, FUN_005bb4ae, FUN_005bcaa7, FUN_005bd630, FUN_005bd65c } from './block_005B0000.js';
import { FUN_005bd915, FUN_005bf071, FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0593, FUN_005c0bf2, FUN_005c1020, FUN_005c1167, FUN_005c19ad, FUN_005c5fc4 } from './block_005C0000.js';
import { FUN_005c61b0, FUN_005c64da, FUN_005c656b, FUN_005cde4d, FUN_005cdf50, FUN_005cedad } from './block_005C0000.js';
import { FUN_005cef31, FUN_005cf467 } from './block_005C0000.js';
import { FUN_005dae6b, FUN_005db610, FUN_005db650 } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0, FUN_005f35f0 } from './block_00600000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

let s_FOODCARAVAN_006262ec = "FOODCARAVAN_006262ec";
let s_FOODCARAVAN_006262f8 = "FOODCARAVAN_006262f8";
let s_FOODCARAVAN_00626304 = "FOODCARAVAN_00626304";
let s_CARAVAN_006262d4 = "CARAVAN_006262d4";
let s_CARAVAN_006262dc = "CARAVAN_006262dc";
let s_CARAVAN_006262e4 = "CARAVAN_006262e4";
let s_CARAVANOTHER_00626310 = "CARAVANOTHER_00626310";
let s_CARAVANOTHER_00626320 = "CARAVANOTHER_00626320";
let s_Delete_City__Connection_to_serve_00626330 = "Delete City: Connection to server timed out";
let s_SERVERCONNECTTIME_00626360 = "SERVERCONNECTTIME";
let s_SWITCHWONDER_00626380 = "SWITCHWONDER";
let s_STARTWONDER_00626374 = "STARTWONDER";
let s_ABANDONWONDER_00626390 = "ABANDONWONDER";
let s_DEBUG_006359dc = "DEBUG";
let s_NETWORKTYPE_006264a4 = "NETWORKTYPE";
let s_IPVERIFY_0062657c = "IPVERIFY";
let s_IPADDRESS_006265b8 = "IPADDRESS";
let s_NETNAME_006265c4 = "NETNAME";
let s_GAMENAME_006265cc = "GAMENAME";
let s_DIFFICULTY_006265f4 = "DIFFICULTY";
let s_ADVANCEDMP_00626600 = "ADVANCEDMP";
let s_GENDER_00626654 = "GENDER";
let s_JOINEDMAX_00626614 = "JOINEDMAX";
let s_GAMECANCELED_00626620 = "GAMECANCELED";
let s_SERVERCONNECTFAIL_00626630 = "SERVERCONNECTFAIL";
let s_ALREADYCHOSEN_00626644 = "ALREADYCHOSEN";
let s_SCENARIOLOADED_006265e4 = "SCENARIOLOADED";
let s_LANNOT_006264f4 = "LANNOT";
let s_LANCONNECTFAIL_0062652c = "LANCONNECTFAIL";
let s_LANCONNECTFAIL_0062656c = "LANCONNECTFAIL";
let s_TERRAIN1_BMP_006266e0 = "TERRAIN1.BMP";
let s_TERRAIN1_GIF_006266f0 = "TERRAIN1.GIF";
let s_TERRAIN1_GIF_00626700 = "TERRAIN1.GIF";
let s_TERRAIN2_BMP_00626710 = "TERRAIN2.BMP";
let s_TERRAIN2_GIF_00626720 = "TERRAIN2.GIF";
let s_TERRAIN2_GIF_00626730 = "TERRAIN2.GIF";
let s_ICONS_BMP_00626740 = "ICONS.BMP";
let s_ICONS_GIF_0062674c = "ICONS.GIF";
let s_ICONS_GIF_00626758 = "ICONS.GIF";
let s_EDITORPT_GIF_00626764 = "EDITORPT.GIF";
let s_PEOPLE_BMP_00626774 = "PEOPLE.BMP";
let s_PEOPLE_GIF_00626780 = "PEOPLE.GIF";
let s_PEOPLE_GIF_0062678c = "PEOPLE.GIF";
let s_CITIES_BMP_00626798 = "CITIES.BMP";
let s_CITIES_GIF_006267a4 = "CITIES.GIF";
let s_CITIES_GIF_006267b0 = "CITIES.GIF";
let s_UNITS_BMP_006267bc = "UNITS.BMP";
let s_UNITS_GIF_006267c8 = "UNITS.GIF";
let s_UNITS_GIF_006267d4 = "UNITS.GIF";
let s_THRONE_00626824 = "THRONE";
let s_ADDTOTHRONE_00626830 = "ADDTOTHRONE";
let s_pv_dll_00626814 = "pv.dll";


// ═══════════════════════════════════════════════════════════════════
// FUN_00440325 — remove_trade_route_entry
// Removes a trade route entry at index param_2 from city param_1
// by shifting subsequent entries down.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00440325(param_1, param_2) {
  let local_8;

  for (local_8 = param_2; local_8 < s8(G.DAT_0064f37a[param_1 * 0x58]) + -1; local_8 = local_8 + 1) {
    G.DAT_0064f384[local_8 * 2 + param_1 * 0x58] = G.DAT_0064f386[local_8 * 2 + param_1 * 0x58];
    G.DAT_0064f384[local_8 * 2 + param_1 * 0x58 + 1] = G.DAT_0064f386[local_8 * 2 + param_1 * 0x58 + 1];
    G.DAT_0064f381[param_1 * 0x58 + local_8] = G.DAT_0064f382[param_1 * 0x58 + local_8];
  }
  G.DAT_0064f37a[param_1 * 0x58] = G.DAT_0064f37a[param_1 * 0x58] + -1;
  w32(G.DAT_0064f344, param_1 * 0x58, u32(G.DAT_0064f344, param_1 * 0x58) | 0x20000);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004403ec — set_trade_route_entry
// Sets trade route partner and commodity at index param_2 for city param_1.
// ═══════════════════════════════════════════════════════════════════
export function FUN_004403ec(param_1, param_2, param_3, param_4) {
  let uVar1;

  G.DAT_0064f384[param_2 * 2 + param_1 * 0x58] = param_3 & 0xff;
  G.DAT_0064f384[param_2 * 2 + param_1 * 0x58 + 1] = (param_3 >> 8) & 0xff;
  uVar1 = FUN_005adfa0(param_4, 0xffffffff, 0xf);
  G.DAT_0064f381[param_1 * 0x58 + param_2] = uVar1;
  w32(G.DAT_0064f344, param_1 * 0x58, u32(G.DAT_0064f344, param_1 * 0x58) | 0x20000);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00440453 — add_trade_route
// Attempts to add a trade route from city param_1 to city param_2
// for commodity param_3. If full, replaces the weakest route.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00440453(param_1, param_2, param_3) {
  let cVar1;
  let iVar2;
  let iVar3;
  let local_20;
  let local_1c;
  let local_14;
  let local_10;
  let local_8;

  for (local_10 = 0; local_10 < s8(G.DAT_0064f37a[param_1 * 0x58]); local_10 = local_10 + 1) {
    if ((s16(G.DAT_0064f384, param_1 * 0x58 + local_10 * 2) === param_2) &&
       (s8(G.DAT_0064f381[param_1 * 0x58 + local_10]) === param_3)) {
      return;
    }
  }
  if (s8(G.DAT_0064f37a[param_1 * 0x58]) < 0x03) {
    cVar1 = G.DAT_0064f37a[param_1 * 0x58];
    G.DAT_0064f37a[param_1 * 0x58] = G.DAT_0064f37a[param_1 * 0x58] + 1;
    FUN_004403ec(param_1, s8(cVar1), param_2, param_3);
    FUN_0043d400(param_1);
    FUN_0043d400(param_2);
  }
  else {
    local_1c = 9999;
    for (local_10 = 0; local_10 < s8(G.DAT_0064f37a[param_1 * 0x58]); local_10 = local_10 + 1) {
      if ((s8(G.DAT_0064f381[param_1 * 0x58 + local_10]) < 0) && (param_3 < 0)) {
        return;
      }
      iVar2 = s16(G.DAT_0064f384, param_1 * 0x58 + local_10 * 2);
      local_8 = s16(G.DAT_0064f35e, iVar2 * 0x58);
      local_14 = FUN_00488a45(s8(G.DAT_0064f348[param_1 * 0x58]),
                              s16(G.DAT_0064f340, param_1 * 0x58),
                              s16(G.DAT_0064f342, param_1 * 0x58),
                              s16(G.DAT_0064f340, iVar2 * 0x58),
                              s16(G.DAT_0064f342, iVar2 * 0x58));
      iVar3 = FUN_0043d20a(param_1, 0x20);
      if (((iVar3 !== 0) && (iVar3 = FUN_0043d20a(iVar2, 0x20), iVar3 !== 0)) && (local_14 < 2)) {
        local_14 = 1;
      }
      if (local_14 !== 0) {
        local_8 = local_8 + ((local_14 * local_8) >> 1);
      }
      if (G.DAT_0064f348[param_1 * 0x58] === G.DAT_0064f348[iVar2 * 0x58]) {
        local_8 = local_8 >> 1;
      }
      if (local_8 < local_1c) {
        local_1c = local_8;
        local_20 = local_10;
      }
    }
    if (local_1c <= s16(G.DAT_0064f35e, param_2 * 0x58)) {
      FUN_004403ec(param_1, local_20, param_2, param_3);
      FUN_0043d400(param_1);
      FUN_0043d400(param_2);
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00440750 — caravan_arrive (trade route revenue + diplomacy)
// Handles a caravan/freight unit arriving at a destination city.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00440750(param_1, param_2) {
  let bVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let iVar9;
  let uVar10;
  let uVar11;
  let bVar12;
  let uVar13;
  let local_40;
  let local_34;
  let local_30;
  let local_28;
  let local_24;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_8;

  bVar1 = G.DAT_006560f7[param_1 * 0x20];
  iVar4 = s8(bVar1);
  bVar2 = G.DAT_0064f348[param_2 * 0x58];
  iVar5 = s8(bVar2);
  if (G.DAT_00656100[param_1 * 0x20] === 0xff) {
    local_14 = 0xffffffff;
  }
  else {
    local_14 = u8(G.DAT_00656100[param_1 * 0x20]);
  }
  if (local_14 < 0) {
    local_14 = FUN_0043d07a(
      s16(G.DAT_006560f0, param_1 * 0x20),
      s16(G.DAT_006560f2, param_1 * 0x20),
      iVar4, 0xffffffff, 0xffffffff);
    if (local_14 < 0) {
      local_14 = 0;
    }
  }
  local_1c = FUN_005ae31d(
    s16(G.DAT_0064f340, param_2 * 0x58),
    s16(G.DAT_0064f342, param_2 * 0x58),
    s16(G.DAT_0064f340, local_14 * 0x58),
    s16(G.DAT_0064f342, local_14 * 0x58));
  if ((G.DAT_00655af0 & 4) !== 0) {
    local_1c = (local_1c << 2) / 5;
  }
  if ((G.DAT_00655af0 & 8) !== 0) {
    local_1c = (local_1c * 5 + ((local_1c * 5) >> 0x1f & 3)) >> 2;
  }
  local_1c = ((s16(G.DAT_0064f35e, local_14 * 0x58) +
              s16(G.DAT_0064f35e, param_2 * 0x58)) * (local_1c + 10)) / 0x18;
  iVar6 = FUN_005b8a81(
    s16(G.DAT_0064f340, param_2 * 0x58),
    s16(G.DAT_0064f342, param_2 * 0x58));
  iVar7 = FUN_005b8a81(
    s16(G.DAT_0064f340, local_14 * 0x58),
    s16(G.DAT_0064f342, local_14 * 0x58));
  if (iVar7 !== iVar6) {
    local_1c = local_1c << 1;
  }
  if (iVar4 === iVar5) {
    local_1c = local_1c >> 1;
  }
  uVar8 = s8(G.DAT_006560fd[param_1 * 0x20]); // C: (uint)(char) — sign-extends for < 0 checks (food = negative)
  bVar12 = (G.DAT_006560f6[param_1 * 0x20] === 0x31); // '1'
  if (bVar12) {
    local_1c = local_1c + (local_1c >> 1);
  }
  local_34 = FUN_00488a45(iVar4,
    s16(G.DAT_0064f340, param_2 * 0x58),
    s16(G.DAT_0064f342, param_2 * 0x58),
    s16(G.DAT_0064f340, local_14 * 0x58),
    s16(G.DAT_0064f342, local_14 * 0x58));
  iVar9 = FUN_0043d20a(param_2, 0x20);
  if ((iVar9 !== 0) && (iVar9 = FUN_0043d20a(local_14, 0x20), iVar9 !== 0)) {
    if (iVar7 === iVar6) {
      local_34 = local_34 + 1;
    } else {
      local_34 = local_34 + 2;
    }
  }
  iVar6 = FUN_0043d20a(param_2, 0x19);
  if (iVar6 !== 0) {
    local_34 = local_34 + 1;
  }
  iVar6 = FUN_0043d20a(local_14, 0x19);
  if (iVar6 !== 0) {
    local_34 = local_34 + 1;
  }
  local_1c = local_1c + ((local_34 * local_1c) >> 1);
  local_30 = 0;
  switch (uVar8) {
    case 3: case 5: case 8: case 10:
      local_30 = (local_1c / 2) | 0;
      break;
    case 9: case 0xb: case 0xc: case 0xd:
      local_30 = local_1c;
      break;
    case 0xe:
      local_30 = ((local_1c * 3) / 2) | 0;
      break;
    case 0xf:
      local_30 = local_1c * 2;
      break;
  }
  for (local_18 = 0; local_18 < 3; local_18 = local_18 + 1) {
    if (s8(G.DAT_0064f37e[param_2 * 0x58 + local_18]) === uVar8) {
      if (s8(G.DAT_006560f7[param_1 * 0x20]) === iVar4) {
        local_1c = local_1c * 2 + local_30;
      } else {
        local_1c = (local_1c + local_30) * 2;
      }
    }
  }
  if (((G.DAT_00655af8 < 200) && (iVar6 = FUN_004bd9f0(iVar4, 0x26), iVar6 === 0)) &&
     (iVar6 = FUN_004bd9f0(iVar4, 0x39), iVar6 === 0)) {
    local_1c = local_1c << 1;
  }
  iVar6 = FUN_004bd9f0(iVar4, 0x43);
  if (iVar6 !== 0) {
    local_1c = local_1c - ((local_1c / 3) | 0);
  }
  iVar6 = FUN_004bd9f0(iVar4, 0x1e);
  if (iVar6 !== 0) {
    local_1c = local_1c - ((local_1c / 3) | 0);
  }
  uVar13 = 30000;
  iVar6 = Math.floor(Math.random() * 0x7fff);
  iVar6 = FUN_004c2788(iVar4, iVar6 % 10 + 200, uVar13);
  uVar13 = FUN_005adfa0((iVar6 * 2) / 3);
  iVar6 = FUN_005adfa0(local_1c, 0, uVar13);

  // UI notification block — display trade messages
  if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
    if (uVar8 < 0) {
      FUN_004271e8(0, G.DAT_00628420 + 0x100); // stub
    } else {
      FUN_004271e8(0, G.DAT_0064b168[uVar8 * 4]); // stub
    }
    FUN_0040ff60(1, local_14); // stub
    FUN_0040ff60(2, param_2); // stub
    FUN_00421da0(0, iVar6); // stub
    FUN_0046e020((!bVar12 ? 0x14 : 0) + 0x16, 1, 0, 0); // stub
    if (uVar8 < 0) {
      // food caravan messages
      if (G.DAT_00655b02 < 3) {
        FUN_004442e0(s_FOODCARAVAN_006262ec, param_1);
      } else {
        if (G.DAT_006d1da0 === iVar4) {
          FUN_004442e0(s_FOODCARAVAN_006262f8, param_1);
        } else if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
          FUN_00511880(0x10, G.DAT_006ad30c + s32(G.DAT_006ad558, iVar4 * 4) * 0x54, 3, 1, param_1, bVar12);
        }
        if (iVar4 !== iVar5) {
          if (G.DAT_006d1da0 === iVar5) {
            FUN_004442e0(s_FOODCARAVAN_00626304, param_1);
          } else if ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0) {
            FUN_00511880(0x10, G.DAT_006ad30c + s32(G.DAT_006ad558, iVar5 * 4) * 0x54, 3, 1, param_1, bVar12);
          }
        }
      }
    } else if (G.DAT_00655b02 < 3) {
      FUN_004442e0(s_CARAVAN_006262d4, param_1);
    } else {
      if (G.DAT_006d1da0 === iVar4) {
        FUN_004442e0(s_CARAVAN_006262dc, param_1);
      } else if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
        FUN_00511880(0xf, G.DAT_006ad30c + s32(G.DAT_006ad558, iVar4 * 4) * 0x54, 3, 1, param_1, bVar12);
      }
      if (iVar4 !== iVar5) {
        if (G.DAT_006d1da0 === iVar5) {
          FUN_004442e0(s_CARAVAN_006262e4, param_1);
        } else if ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0) {
          FUN_00511880(0xf, G.DAT_006ad30c + s32(G.DAT_006ad558, iVar5 * 4) * 0x54, 3, 1, param_1, bVar12);
        }
      }
    }
  }
  FUN_00456f20(iVar5, iVar4, 0xfffffff6);
  FUN_00456f20(iVar4, iVar5, 0xfffffff6);
  if (uVar8 < 0) {
    FUN_004eb4ed(param_2, 0);
    w16(G.DAT_0064f35a, param_2 * 0x58,
        s16(G.DAT_0064f35a, param_2 * 0x58) +
        (((s8(G.DAT_0064f349[param_2 * 0x58]) + 1) * G.DAT_006a6560) / 2));
  } else {
    w32(G.DAT_0064c6a2, iVar4 * 0x594, s32(G.DAT_0064c6a2, iVar4 * 0x594) + iVar6);
    w16(G.DAT_0064c6a8, iVar4 * 0x594, s16(G.DAT_0064c6a8, iVar4 * 0x594) + (iVar6 & 0xffff));
    if (G.DAT_006d1da0 === iVar4) {
      FUN_00569363(1);
    }
  }
  uVar3 = G.DAT_006560f6[param_1 * 0x20];
  FUN_005b6042(param_1, 1);
  FUN_00440453(local_14, param_2, uVar8);
  if (-1 < uVar8) {
    local_10 = 0;
    local_40 = 0xffffffff;
    for (local_18 = 0; local_18 < 3; local_18 = local_18 + 1) {
      uVar10 = Math.floor(Math.random() * 0x7fff);
      uVar11 = uVar10 >> 0x1f;
      local_8 = ((uVar10 ^ uVar11) - uVar11 & 7 ^ uVar11) - uVar11;
      local_28 = u8(G.DAT_0064f37b[param_2 * 0x58 + local_18]);
      local_28 = s8(local_28);
      if (local_28 < 0) {
        if (local_28 < 1) {
          local_28 = ~local_28 + 1;
        }
      } else {
        local_8 = local_8 + 10;
      }
      if (local_28 !== uVar8) {
        if (9 < local_8) {
          for (local_24 = 0; local_24 < 3; local_24 = local_24 + 1) {
            if (s8(G.DAT_0064f37e[local_14 * 0x58 + local_24]) === local_28) {
              local_8 = local_8 + 10;
            }
          }
        }
        if (local_10 <= local_8) {
          local_10 = local_8;
          local_40 = local_28;
        }
      }
    }
    FUN_00440453(param_2, local_14, local_40);
    if (((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0) &&
       ((iVar4 !== iVar5 || (2 < G.DAT_00655b02)))) {
      FUN_0046e020((!bVar12 ? 0x14 : 0) + 0x16, 1, 0, 0);
      uVar13 = FUN_00410070(iVar4);
      FUN_0040ff60(0, uVar13);
      FUN_004271e8(1, G.DAT_0064b168[uVar8 * 4]);
      FUN_0040ff60(2, local_14);
      FUN_0040ff60(3, param_2);
      FUN_004271e8(4, G.DAT_0064b168[local_40 * 4]);
      if ((G.DAT_006d1da0 === iVar5) && (iVar4 !== iVar5)) {
        FUN_004442a0(s_CARAVANOTHER_00626310, uVar3, (G.DAT_00633584 === 0) - 1 & 8);
      } else if ((2 < G.DAT_00655b02) && (G.DAT_006d1da0 !== iVar5)) {
        FUN_00511880(0x11, G.DAT_006ad30c + s32(G.DAT_006ad558, iVar5 * 4) * 0x54, 5, 0, uVar3, (G.DAT_00633584 === 0) - 1 & 8);
      }
      if ((2 < G.DAT_00655b02) && (iVar4 !== iVar5)) {
        if (G.DAT_006d1da0 === iVar4) {
          FUN_004442a0(s_CARAVANOTHER_00626320, uVar3, (G.DAT_00633584 === 0) - 1 & 8);
        } else if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_006d1da0 !== iVar4)) {
          FUN_00511880(0x11, G.DAT_006ad30c + s32(G.DAT_006ad558, iVar4 * 4) * 0x54, 5, 0, uVar3, (G.DAT_00633584 === 0) - 1 & 8);
        }
      }
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// delete_city — delete city and clean up references
// Removes city param_1 from the game, reassigning units, clearing
// trade routes and wonders that reference it.
// ═══════════════════════════════════════════════════════════════════
export function delete_city(param_1, param_2) {
  let cVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let iVar5;
  let uVar6;
  let iVar7;
  let uVar8;
  let iVar9;
  let local_30;
  let local_28;
  let local_24;
  let local_14;
  let local_10;
  let local_c;

  if ((-1 < param_1) && (s32(G.DAT_0064f394, param_1 * 0x58) !== 0)) {
    G.DAT_006ad8c8 = 1;
    if ((G.DAT_00655b02 < 3) || (cVar1 = FUN_00421f40(), cVar1 !== 0)) {
      iVar2 = G.DAT_006aa760;
      G.DAT_006aa760 = 1;
      iVar3 = s16(G.DAT_0064f340, param_1 * 0x58);
      iVar4 = s16(G.DAT_0064f342, param_1 * 0x58);
      iVar5 = s8(G.DAT_0064f348[param_1 * 0x58]);
      let _off708 = iVar5 * 0x594;
      let _curCities = s16(G.DAT_0064c708, _off708);
      _curCities = _curCities + -1;
      G.DAT_0064c708[_off708] = _curCities & 0xff;
      G.DAT_0064c708[_off708+1] = (_curCities >> 8) & 0xff;

      // Main unit reassignment loop
      let _done = false;
      while (!_done) {
        local_30 = G.DAT_00655b16;
        let _innerDone = false;
        while (!_innerDone) {
          // count down through units
          local_30 = local_30 + -1;
          if (local_30 < 0) {
            // City is fully deleted — clean up references
            w32(G.DAT_0064f394, param_1 * 0x58, 0);
            if (G.DAT_00655b18 - 1 === param_1) {
              G.DAT_00655b18 = G.DAT_00655b18 + -1;
            }
            // Remove trade route references
            for (local_10 = 0; local_10 < G.DAT_00655b18; local_10 = local_10 + 1) {
              if (s32(G.DAT_0064f394, local_10 * 0x58) !== 0) {
                local_30 = s8(G.DAT_0064f37a[local_10 * 0x58]);
                while (local_30 = local_30 + -1, -1 < local_30) {
                  if (s16(G.DAT_0064f384, local_10 * 0x58 + local_30 * 2) === param_1) {
                    FUN_00440325(local_10, local_30);
                  }
                }
              }
            }
            // Remove wonder references
            for (local_10 = 0; local_10 < 0x1c; local_10 = local_10 + 1) {
              if (s16(G.DAT_00655be6, local_10 * 2) === param_1) {
                w16(G.DAT_00655be6, local_10 * 2, 0xfffe);
              }
            }
            local_28 = 0;
            FUN_005b9ec6();
            FUN_005b94fc(iVar3, iVar4, 2, 0, 1);
            for (local_10 = 0; local_10 < 0x2d; local_10 = local_10 + 1) {
              uVar8 = FUN_005ae052(s8(G.DAT_00628370[local_10]) + iVar3);
              iVar7 = s8(G.DAT_006283a0[local_10]) + iVar4;
              iVar9 = FUN_004087c0(uVar8, iVar7);
              if ((iVar9 !== 0) && (iVar9 = FUN_005b89e4(uVar8, iVar7), iVar9 === 0)) {
                uVar6 = FUN_005b8c18(uVar8, iVar7, 1);
                FUN_005b98b7(uVar8, iVar7, uVar6 | 8);
                if (local_10 < 0x15) {
                  iVar9 = FUN_005b8af0(uVar8, iVar7);
                  if (iVar9 === iVar5) {
                    FUN_005b9c49(uVar8, iVar7, 0, 1);
                  }
                  iVar7 = FUN_005b8da4(uVar8, iVar7);
                  if ((0 < iVar7) && (iVar7 !== iVar5)) {
                    local_14 = iVar7 & 0xff;
                    local_28 = local_28 | (1 << (local_14 & 0x1f));
                  }
                }
              }
            }
            FUN_005b9f1c();
            if (local_28 !== 0) {
              for (local_30 = FUN_005b2e69(iVar3, iVar4); -1 < local_30;
                  local_30 = FUN_005b2c82(local_30)) {
                G.DAT_006560f9[local_30 * 0x20] =
                     G.DAT_006560f9[local_30 * 0x20] | (local_28 & 0xff);
              }
            }
            for (local_24 = 0; local_24 < G.DAT_00655b18; local_24 = local_24 + 1) {
              if (s32(G.DAT_0064f394, local_24 * 0x58) !== 0) {
                FUN_0043f7a7(local_24);
              }
            }
            FUN_citywin_C449(param_1); // stub: thunk_citywin_C449
            G.DAT_006aa760 = iVar2;
            if (iVar2 === 0) {
              FUN_citywin_9429(); // stub: thunk_citywin_9429
            }
            if ((param_2 === 0) && (2 < G.DAT_00655b02)) {
              FUN_004b0b53(0xff, 2, 0, 0, 0);
              FUN_0046b14d(0x89, 0xff, param_1, 0, 0, 0, 0, 0, 0, 0);
              FUN_0046b14d(0x8a, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
              XD_FlushSendBuffer(5000);
            }
            G.DAT_006ad8c8 = 0;
            return;
          }
          // Skip inactive units and those not homed to this city
          if ((s32(G.DAT_0065610a, local_30 * 0x20) === 0) ||
              (u8(G.DAT_00656100[local_30 * 0x20]) !== param_1)) {
            continue;
          }
          if (G.DAT_006560f6[local_30 * 0x20] === 0x09) { // '\t'
            G.DAT_00656100[local_30 * 0x20] = 0xff;
            continue;
          }
          // Check if unit can be reassigned to another city
          if (((G.DAT_00655b0b & (1 << (G.DAT_006560f7[local_30 * 0x20] & 0x1f))) !== 0) ||
              (uVar6 = FUN_0043cf76(
                s16(G.DAT_006560f0, local_30 * 0x20),
                s16(G.DAT_006560f2, local_30 * 0x20)),
              uVar6 < 0) || (param_1 === uVar6)) {
            // C: goto LAB_004416ab — kill unit and restart scan from top
            FUN_005b6042(local_30, 1);
            _innerDone = true;
            break;
          }
          if ((G.DAT_0064b1ca[u8(G.DAT_006560f6[local_30 * 0x20]) * 0x14] !== 0x01) ||
             (iVar7 = FUN_005b53b6(local_30, 1), iVar7 !== 1)) {
            // C: break inner while → OR 0x20 into city flags → fall through to kill
            w32(G.DAT_0064f344, uVar6 * 0x58, u32(G.DAT_0064f344, uVar6 * 0x58) | 0x20);
            // LAB_004416ab: kill unit and restart scan
            FUN_005b6042(local_30, 1);
            _innerDone = true;
            break;
          } else {
            // C: unit IS type 0x01 AND FUN_005b53b6 == 1 → reassign home city, continue inner loop
            local_c = uVar6 & 0xff;
            G.DAT_00656100[local_30 * 0x20] = local_c;
            // inner while continues — do NOT kill unit
          }
        }
        if (!_innerDone) {
          _done = true;
        }
      }
    }
    // MP path: wait for server confirmation
    G.DAT_006ad8c8 = 0;
    G.DAT_006c90c8 = -2;
    FUN_0046b14d(0x39, 0, param_1, 0, 0, 0, 0, 0, 0, 0);
    iVar2 = FUN_00421bb0();
    while ((G.DAT_006c90c8 === -2 && (iVar3 = FUN_00421bb0(), iVar3 - iVar2 < 0xe10))) {
      FUN_0047e94e(1, 1);
    }
    if (G.DAT_006c90c8 === -2) {
      debug_log(s_Delete_City__Connection_to_serve_00626330);
      FUN_00410030(s_SERVERCONNECTTIME_00626360, G.DAT_0063fc58, 0);
      G.DAT_00628044 = 0;
    }
    while ((G.DAT_006c8fac !== 0 || (G.DAT_006c8fa0 !== 0))) {
      FUN_0047e94e(1, 0);
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00441a79 — check_aqueduct_sewer_needed
// Returns building ID needed for growth (9=Aqueduct, 0x17=Sewer System),
// or 0 if none needed.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00441a79(param_1) {
  let iVar1;

  if ((G.DAT_0064bcd1 <= s8(G.DAT_0064f349[param_1 * 0x58])) &&
     (iVar1 = FUN_0043d20a(param_1, 9), iVar1 === 0)) {
    return 9;
  }
  if ((G.DAT_0064bcd2 <= s8(G.DAT_0064f349[param_1 * 0x58])) &&
     (iVar1 = FUN_0043d20a(param_1, 0x17), iVar1 === 0)) {
    return 0x17;
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00441b11 — change_city_production (wonder notification logic)
// Changes what city param_1 is building to param_2, with wonder
// start/switch/abandon notifications.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00441b11(param_1, param_2) {
  let cVar1;
  let bVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let iVar6;
  let local_338;
  let local_330;
  let local_328;
  let local_324;
  let local_2c;
  let local_28;
  let local_24;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;

  // SEH/stack alloc stubs (no-op in JS)
  cVar1 = G.DAT_0064f379[param_1 * 0x58];
  bVar2 = G.DAT_0064f348[param_1 * 0x58];
  iVar4 = s8(bVar2);
  if ((-1 < s8(G.DAT_0064f379[param_1 * 0x58])) && (s8(G.DAT_0064f379[param_1 * 0x58]) < 0x3e)) {
    G.DAT_0064c7f4[iVar4 * 0x594 + s8(G.DAT_0064f379[param_1 * 0x58])] =
         G.DAT_0064c7f4[iVar4 * 0x594 + s8(G.DAT_0064f379[param_1 * 0x58])] + -1;
  }
  if (0x62 < param_2) {
    param_2 = FUN_00498e8b(param_1, 0, 0);
  }
  if (param_2 < 99) {
    if (((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_0062c5b8 === 0)) {
      uVar3 = FUN_004e74df(param_1, param_2);
      w16(G.DAT_0064f35c, param_1 * 0x58, uVar3);
    }
    G.DAT_0064f379[param_1 * 0x58] = param_2 & 0xff;
  }
  if ((G.DAT_0064f379[param_1 * 0x58] !== cVar1) &&
     ((1 << (bVar2 & 0x1f) & G.DAT_00655b0b) === 0)) {
    if ((s8(G.DAT_0064f379[param_1 * 0x58]) < -0x26) || (s8(cVar1) < -0x26)) {
      local_330 = 0;
      local_2c = 0;
      for (local_14 = 0; local_14 < G.DAT_00655b18; local_14 = local_14 + 1) {
        if (((s32(G.DAT_0064f394, local_14 * 0x58) !== 0) &&
            (G.DAT_0064f348[param_1 * 0x58] === G.DAT_0064f348[local_14 * 0x58])) &&
           (local_14 !== param_1)) {
          if (G.DAT_0064f379[local_14 * 0x58] === cVar1) {
            local_330 = local_330 + 1;
          }
          if (G.DAT_0064f379[param_1 * 0x58] === G.DAT_0064f379[local_14 * 0x58]) {
            local_2c = local_2c + 1;
          }
        }
      }
    }
    if (s8(G.DAT_0064f379[param_1 * 0x58]) < -0x26) {
      if (-0x27 < s8(cVar1)) {
        w16(G.DAT_0064f35c, param_1 * 0x58, (s16(G.DAT_0064f35c, param_1 * 0x58) / 2) | 0);
      }
      if (s8(G.DAT_0064f379[param_1 * 0x58]) < 0x01) {
        local_328 = ~s8(G.DAT_0064f379[param_1 * 0x58]) + 1;
      } else {
        local_328 = s8(G.DAT_0064f379[param_1 * 0x58]);
      }
      local_28 = local_328 + -0x27;
      if (s8(cVar1) < -0x26) {
        local_324 = -0x27 - s8(cVar1);
      } else {
        local_324 = 0;
      }
      uVar5 = FUN_00493c7d(iVar4);
      FUN_0040ff60(1, uVar5);
      if (local_2c === 0) {
        if ((s8(cVar1) < -0x26) &&
           ((local_330 === 0 || (s16(G.DAT_00655be6, local_324 * 2) !== -1)))) {
          if (local_330 !== 0) {
            for (local_1c = 0; local_1c < G.DAT_00655b18; local_1c = local_1c + 1) {
              if (((s32(G.DAT_0064f394, local_1c * 0x58) !== 0) &&
                  (s8(G.DAT_0064f348[local_1c * 0x58]) === iVar4)) &&
                 (G.DAT_0064f379[local_1c * 0x58] === cVar1)) {
                G.DAT_0064f379[local_1c * 0x58] = G.DAT_0064f379[param_1 * 0x58];
              }
            }
          }
          if (G.DAT_00654fa8 === 0) {
            if (s8(cVar1) < 0x01) {
              local_338 = ~s8(cVar1) + 1;
            } else {
              local_338 = s8(cVar1);
            }
            FUN_004271e8(2, u32(G.DAT_0064c488, local_338 * 8));
            FUN_004271e8(3, u32(G.DAT_0064c488, local_328 * 8));
            FUN_0043c9d0(s_SWITCHWONDER_00626380);
            FUN_0059ec88(G.DAT_00645160 + local_328 * 0x3c, 0, 0);
            // DEVIATION: CPropertySheet::EnableStackedTabs(local_320, 8) — MFC
            if (2 < G.DAT_00655b02) {
              FUN_00511880(0x13, 0xff, 4, 0, local_328, 8);
            }
            FUN_0040bc80(0);
          }
        }
        else if ((((G.DAT_0063f580[iVar4 * 0x1c + local_28]) & 1) === 0) &&
                (G.DAT_0063f580[iVar4 * 0x1c + local_28] = G.DAT_0063f580[iVar4 * 0x1c + local_28] | 1,
                 G.DAT_00654fa8 === 0)) {
          FUN_004271e8(2, u32(G.DAT_0064c488, local_328 * 8));
          FUN_0043c9d0(s_STARTWONDER_00626374);
          FUN_0059ec88(G.DAT_00645160 + local_328 * 0x3c, 0, 0);
          // DEVIATION: CPropertySheet::EnableStackedTabs(local_320, 8) — MFC
          if (2 < G.DAT_00655b02) {
            FUN_00511880(0x12, 0xff, 3, 0, local_328, 8);
          }
          FUN_0040bc80(0);
        }
      }
      // Wonder completion check
      let off35c2 = param_1 * 0x58;
      let shields35c = s16(G.DAT_0064f35c, off35c2);
      if ((shields35c === 0) &&
         (local_18 = ((local_328 + -0x27) / 7) | 0, G.DAT_0064c6b7[iVar4 * 0x594 + local_18] === 0)) {
        local_20 = 1;
        for (local_24 = 1; local_24 < 8; local_24 = local_24 + 1) {
          if ((1 << (local_24 & 0x1f) & G.DAT_00655b0b) !== 0) {
            if ((local_20 === 0) || (G.DAT_0064c6b7[local_24 * 0x594 + local_18] === 0)) {
              local_20 = 0;
            } else {
              local_20 = 1;
            }
          }
        }
        if (local_20 !== 0) {
          iVar6 = G.DAT_00655b08 + u8(G.DAT_0064c6b7[iVar4 * 0x594 + local_18]) * -2;
          if (iVar6 < 1) {
            iVar6 = 0;
          }
          let bonus = (iVar6 & 0xffff) * u8(G.DAT_0064c48c[local_328 * 8]);
          w16(G.DAT_0064f35c, param_1 * 0x58, shields35c + bonus);
        }
      }
    }
    else if ((s8(cVar1) < -0x26) && (local_330 === 0)) {
      if (s8(cVar1) < 0x01) {
        local_328 = ~s8(cVar1) + 1;
      } else {
        local_328 = s8(cVar1);
      }
      local_28 = local_328 + -0x27;
      let wonderCity = s16(G.DAT_00655b98, local_328 * 2);
      if (((wonderCity !== param_1) &&
          (iVar6 = FUN_00453e51(iVar4, local_328 + -0x27), iVar6 === 0)) &&
         (((G.DAT_0063f580[iVar4 * 0x1c + local_28] & 2) === 0 &&
          (G.DAT_0063f580[iVar4 * 0x1c + local_28] = G.DAT_0063f580[iVar4 * 0x1c + local_28] | 2,
          G.DAT_00654fa8 === 0)))) {
        uVar5 = FUN_00493c7d(iVar4);
        FUN_0040ff60(1, uVar5);
        FUN_004271e8(2, u32(G.DAT_0064c488, local_328 * 8));
        FUN_0043c9d0(s_ABANDONWONDER_00626390);
        FUN_0059ec88(G.DAT_00645160 + local_328 * 0x3c, 0, 0);
        // DEVIATION: CPropertySheet::EnableStackedTabs(local_320, 8) — MFC
        if (2 < G.DAT_00655b02) {
          FUN_00511880(0x14, 0xff, 3, 0, local_328, 8);
        }
        FUN_0040bc80(0);
      }
    }
  }
  if ((-1 < s8(G.DAT_0064f379[param_1 * 0x58])) && (s8(G.DAT_0064f379[param_1 * 0x58]) < 0x3e)) {
    G.DAT_0064c7f4[iVar4 * 0x594 + s8(G.DAT_0064f379[param_1 * 0x58])] =
         G.DAT_0064c7f4[iVar4 * 0x594 + s8(G.DAT_0064f379[param_1 * 0x58])] + 1;
  }
  // SEH cleanup stubs
  FUN_0044251d();
  FUN_00442533();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0044251d — seh_cleanup_1 (stack dealloc wrapper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044251d() {
  FUN_0059df8a(); // stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00442533 — seh_cleanup_2 (FS restore wrapper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00442533() {
  // Source: decompiled/block_00440000.c FUN_00442533 (14 bytes)
  // DEVIATION: Win32 — SEH epilog
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00442541 — reassign_all_city_production
// Forces all cities of player param_1 to re-choose production.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00442541(param_1, param_2) {
  let iVar1;
  let local_8;

  if ((G.DAT_00655b02 !== 1) || ((1 << (param_1 & 0x1f) & G.DAT_006c31a9) === 0)) {
    for (local_8 = 0; local_8 < G.DAT_00655b18; local_8 = local_8 + 1) {
      if (((s32(G.DAT_0064f394, local_8 * 0x58) !== 0) &&
          (s8(G.DAT_0064f348[local_8 * 0x58]) === (param_1 & 0xff))) &&
         ((param_2 < 0 ||
          (iVar1 = FUN_005b8a81(
            s16(G.DAT_0064f340, local_8 * 0x58),
            s16(G.DAT_0064f342, local_8 * 0x58)),
          iVar1 === param_2)))) {
        FUN_00441b11(local_8, 99);
      }
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0044263f — is_city_adjacent_to_continent
// Returns 1 if city param_1 is adjacent to continent param_2.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044263f(param_1, param_2) {
  let uVar1;
  let iVar2;
  let iVar3;
  let local_8;

  if (param_2 < 0x3f) {
    for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
      uVar1 = FUN_005ae052(s16(G.DAT_0064f340, param_1 * 0x58) + s8(G.DAT_00628350[local_8]));
      iVar2 = s16(G.DAT_0064f342, param_1 * 0x58) + s8(G.DAT_00628360[local_8]);
      iVar3 = FUN_004087c0(uVar1, iVar2);
      if (((iVar3 !== 0) && (iVar3 = FUN_005b89e4(uVar1, iVar2), iVar3 !== 0)) &&
         (iVar2 = FUN_005b8a81(uVar1, iVar2), iVar2 === param_2)) {
        return 1;
      }
    }
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0044272d — find_largest_adjacent_continent
// Returns the continent with the largest population adjacent to
// city param_1. Writes pop and direction to param_2/param_3.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044272d(param_1, param_2_ref, param_3_ref) {
  let sVar1;
  let sVar2;
  let uVar3;
  let iVar4;
  let iVar5;
  let local_24;
  let local_20;
  let local_c;
  let local_8;

  local_8 = 0;
  local_20 = 0;
  sVar1 = s16(G.DAT_0064f340, param_1 * 0x58);
  sVar2 = s16(G.DAT_0064f342, param_1 * 0x58);
  for (local_c = 0; local_c < 8; local_c = local_c + 1) {
    uVar3 = FUN_005ae052(s8(G.DAT_00628350[local_c]) + sVar1);
    iVar4 = s8(G.DAT_00628360[local_c]) + sVar2;
    iVar5 = FUN_004087c0(uVar3, iVar4);
    if ((iVar5 !== 0) && (iVar5 = FUN_005b89e4(uVar3, iVar4), iVar5 !== 0)) {
      local_20 = FUN_005b8a81(uVar3, iVar4);
      local_24 = s16(G.DAT_00666134, local_20 * 0x10);
      if (0x3e < local_20) {
        local_24 = 1;
      }
      if (local_8 <= local_24) {
        local_8 = local_24;
      }
      local_c = local_c + (2 - (local_c & 1));
    }
  }
  // C: if (param_2 != (int *)0x0) — callers pass 0 for NULL
  if (param_2_ref != null && param_2_ref !== 0) {
    param_2_ref.value = local_8;
  }
  if (param_3_ref != null && param_3_ref !== 0) {
    param_3_ref.value = local_c;
  }
  return local_20;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00442885 — is_city_connected_to_continent
// Returns 1 if city param_1 has a land/road connection to continent param_2.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00442885(param_1, param_2) {
  let sVar1;
  let sVar2;
  let iVar3;
  let uVar4;
  let iVar5;
  let local_8;

  sVar1 = s16(G.DAT_0064f340, param_1 * 0x58);
  sVar2 = s16(G.DAT_0064f342, param_1 * 0x58);
  iVar3 = FUN_005b8a81(sVar1, sVar2);
  if (iVar3 === param_2) {
    uVar4 = 1;
  } else {
    for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
      uVar4 = FUN_005ae052(s8(G.DAT_00628350[local_8]) + sVar1);
      iVar3 = s8(G.DAT_00628360[local_8]) + sVar2;
      iVar5 = FUN_004087c0(uVar4, iVar3);
      if ((iVar5 !== 0) && (iVar5 = FUN_005b89e4(uVar4, iVar3), iVar5 !== 0)) {
        uVar4 = FUN_005b8a81(uVar4, iVar3);
        iVar3 = FUN_005b9431(param_2, uVar4);
        if (iVar3 !== 0) {
          return 1;
        }
        local_8 = local_8 + (2 - (local_8 & 1));
      }
    }
    uVar4 = 0;
  }
  return uVar4;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004429af — are_cities_on_same_continent_chain
// Returns 1 if city param_1 and city param_2 share a continent connection.
// ═══════════════════════════════════════════════════════════════════
export function FUN_004429af(param_1, param_2) {
  let uVar1;
  let iVar2;
  let iVar3;
  let local_c;
  let local_8;

  local_c = -1;
  local_8 = 0;
  while (true) {
    if (7 < local_8) {
      return 0;
    }
    uVar1 = FUN_005ae052(s16(G.DAT_0064f340, param_1 * 0x58) + s8(G.DAT_00628350[local_8]));
    iVar2 = s16(G.DAT_0064f342, param_1 * 0x58) + s8(G.DAT_00628360[local_8]);
    iVar3 = FUN_004087c0(uVar1, iVar2);
    if ((((iVar3 !== 0) && (iVar3 = FUN_005b89e4(uVar1, iVar2), iVar3 !== 0)) &&
        (iVar2 = FUN_005b8a81(uVar1, iVar2), iVar2 !== local_c)) &&
       (iVar3 = FUN_0044263f(param_2, iVar2), local_c = iVar2, iVar3 !== 0)) break;
    local_8 = local_8 + 1;
  }
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00444270 — show_debug_message
// ═══════════════════════════════════════════════════════════════════
export function FUN_00444270(param_1) {
  FUN_004190d0(s_DEBUG_006359dc, param_1); // stub: UI debug dialog
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004442a0 — show_popup_message_3arg
// ═══════════════════════════════════════════════════════════════════
export function FUN_004442a0(param_1, param_2, param_3) {
  FUN_004a6c4b(G.DAT_006359d4, param_1, 0, param_2, param_3); // stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004442e0 — show_popup_message_2arg
// ═══════════════════════════════════════════════════════════════════
export function FUN_004442e0(param_1, param_2) {
  FUN_004a6e39(G.DAT_006359d4, param_1, 0, param_2); // stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00444310 — multiplayer_network_setup (UI-heavy, mostly stubbed)
// Handles the multiplayer network game setup flow.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00444310(param_1) {
  // Source: decompiled/block_00440000.c FUN_00444310 (3846 bytes)
  // DEVIATION: Win32 — SEH frame
    // C: thunk_FUN_0059db08(0x4000);
    // C: local_8 = 0;
    // C: local_318 = 1;
    // C: FUN_005c64da();
    // C: if ((((param_1 != 0) && (param_1 != 1)) && (param_1 != 4)) && ((param_1 != 2 && (param_1 != 3))))
    // C: {
    // C: FUN_005dae6b(7,s_whichNetwork____INTERNET____whic_0062640c,
    // C: s_D__Ss_Franklinton_startup_LAN_cp_006263e8,0x21);
    // C: }
    // C: G.DAT_006ad2f0 = param_1;
    // C: if ((param_1 == 1) || (param_1 == 4)) {
    // C: thunk_FUN_0040ffa0(s_NETWORKTYPE_006264a4,1);
    // C: thunk_FUN_0059ea99((int)(short)G.DAT_00666544);
    // C: if (param_1 == 4) {
    // C: thunk_FUN_0059e8db(1,1);
    // ... (330 more lines)
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0044525d — seh_cleanup_network_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044525d() {
  FUN_005c656b(); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445269 — seh_cleanup_network_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445269() {
  FUN_0059df8a(); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044527f — seh_fs_restore_network
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044527f() {
  return; // SEH restore — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044528e — get_ip_address_dialog (UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044528e() {
  return; // UI dialog — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445407 — seh_cleanup_ip
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445407() {
  FUN_0059df8a(); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044541d — seh_fs_restore_ip
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044541d() {
  return; // SEH restore — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044542c — get_net_name_dialog (UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044542c() {
  return; // UI dialog — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044556d — seh_cleanup_netname
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044556d() {
  FUN_0059df8a(); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445583 — seh_fs_restore_netname
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445583() {
  return; // SEH restore — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445592 — get_game_name_dialog (UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445592() {
  return; // UI dialog — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004456ed — seh_cleanup_gamename
// ═══════════════════════════════════════════════════════════════════
export function FUN_004456ed() {
  FUN_0059df8a(); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445703 — seh_fs_restore_gamename
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445703() {
  return; // SEH restore — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445712 — load_scenario_dialog (UI-heavy)
// Scenario/save selection dialog for multiplayer.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445712() {
  return; // UI dialog — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445e15 — seh_cleanup_scenario_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445e15() {
  FUN_005c656b(); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445e21 — seh_cleanup_scenario_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445e21() {
  FUN_0059df8a(); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445e37 — seh_fs_restore_scenario
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445e37() {
  return; // SEH restore — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00445e46 — mp_join_game_dialog (UI-heavy)
// Handles joining a multiplayer game (civ selection, gender, name).
// ═══════════════════════════════════════════════════════════════════
export function FUN_00445e46(param_1) {
  return; // UI dialog — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004467fa — seh_cleanup_join_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_004467fa() {
  FUN_0059df8a(); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00446810 — seh_fs_restore_join
// ═══════════════════════════════════════════════════════════════════
export function FUN_00446810() {
  return; // SEH restore — no-op
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00447170 — destructor_wrapper_1 (MFC CPropertySheet destructor)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00447170(param_1) {
  // Source: decompiled/block_00440000.c FUN_00447170 (57 bytes)
  let in_ECX = 0; // DEVIATION: MFC this pointer
  FUN_00421fad(); // DEVIATION: MFC ~CDialog destructor
  if ((param_1 & 1) !== 0) {
    // DEVIATION: operator_delete(in_ECX)
  }
  return in_ECX;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004471c0 — destructor_wrapper_2 (MFC destructor)
// ═══════════════════════════════════════════════════════════════════
export function FUN_004471c0(param_1) {
  // Source: decompiled/block_00440000.c FUN_004471c0 (57 bytes)
  let in_ECX = 0; // DEVIATION: MFC this pointer
  FUN_0056e2c9(); // DEVIATION: MFC destructor
  if ((param_1 & 1) !== 0) {
    // DEVIATION: operator_delete(in_ECX)
  }
  return in_ECX;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00447210 — listbox_disable_item (UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00447210(param_1) {
  return; // UI listbox — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// CCheckListBox::GetCheckStyle — MFC library function (UI)
// ═══════════════════════════════════════════════════════════════════
export function GetCheckStyle() {
  return 0; // UI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004472f0 — listbox_set_selected (UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_004472f0(param_1) {
  return; // UI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// Static initializer / CString constructor/destructor blocks
// (FUN_00447320 through FUN_00448f78)
//
// These are all MFC static initialization: _eh_vector_constructor_iterator_
// calling CString::CString on global arrays, plus _atexit registrations
// for destructors. They are UI/framework boilerplate with zero game logic.
// All are exported as no-op stubs.
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_00440000.c FUN_00447320 (26 bytes)
export function FUN_00447320() {
  FUN_0044733a();
  FUN_00447362();
}
// Source: decompiled/block_00440000.c FUN_0044733a (40 bytes)
export function FUN_0044733a() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00647c40, 0x3c, 0xb, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447362 (29 bytes)
export function FUN_00447362() {
  // DEVIATION: _atexit(FUN_0044737f)
}
// Source: decompiled/block_00440000.c FUN_0044737f (35 bytes)
export function FUN_0044737f() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00647c40, 0x3c, 0xb, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004473a2 (26 bytes)
export function FUN_004473a2() {
  FUN_004473bc();
  FUN_004473e4();
}
// Source: decompiled/block_00440000.c FUN_004473bc (40 bytes)
export function FUN_004473bc() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00640bd8, 0x3c, 0x34, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004473e4 (29 bytes)
export function FUN_004473e4() {
  // DEVIATION: _atexit(FUN_00447401)
}
// Source: decompiled/block_00440000.c FUN_00447401 (35 bytes)
export function FUN_00447401() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00640bd8, 0x3c, 0x34, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447424 (26 bytes)
export function FUN_00447424() {
  FUN_0044743e();
  FUN_00447466();
}
// Source: decompiled/block_00440000.c FUN_0044743e (40 bytes)
export function FUN_0044743e() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_0063f858, 0x3c, 0x10, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447466 (29 bytes)
export function FUN_00447466() {
  // DEVIATION: _atexit(FUN_00447483)
}
// Source: decompiled/block_00440000.c FUN_00447483 (35 bytes)
export function FUN_00447483() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_0063f858, 0x3c, 0x10, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004474a6 (26 bytes)
export function FUN_004474a6() {
  FUN_004474c0();
  FUN_004474e8();
}
// Source: decompiled/block_00440000.c FUN_004474c0 (40 bytes)
export function FUN_004474c0() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_006461d8, 0x3c, 0x10, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004474e8 (29 bytes)
export function FUN_004474e8() {
  // DEVIATION: _atexit(FUN_00447505)
}
// Source: decompiled/block_00440000.c FUN_00447505 (35 bytes)
export function FUN_00447505() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_006461d8, 0x3c, 0x10, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447528 (26 bytes)
export function FUN_00447528() {
  FUN_00447542();
  FUN_0044756a();
}
// Source: decompiled/block_00440000.c FUN_00447542 (40 bytes)
export function FUN_00447542() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00647388, 0x3c, 0x10, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044756a (29 bytes)
export function FUN_0044756a() {
  // DEVIATION: _atexit(FUN_00447587)
}
// Source: decompiled/block_00440000.c FUN_00447587 (35 bytes)
export function FUN_00447587() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00647388, 0x3c, 0x10, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004475aa (26 bytes)
export function FUN_004475aa() {
  FUN_004475c4();
  FUN_004475ec();
}
// Source: decompiled/block_00440000.c FUN_004475c4 (40 bytes)
export function FUN_004475c4() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_006447b0, 0x3c, 0x10, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004475ec (29 bytes)
export function FUN_004475ec() {
  // DEVIATION: _atexit(FUN_00447609)
}
// Source: decompiled/block_00440000.c FUN_00447609 (35 bytes)
export function FUN_00447609() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_006447b0, 0x3c, 0x10, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 (26 bytes)
export function FID_conflict___E31_44762C() {
  FUN_00447646();
  FUN_00447660();
}
// Source: decompiled/block_00440000.c FUN_00447646 (26 bytes)
export function FUN_00447646() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00646158)
}
// Source: decompiled/block_00440000.c FUN_00447660 (29 bytes)
export function FUN_00447660() {
  // DEVIATION: _atexit(FUN_0044767d)
}
// Source: decompiled/block_00440000.c FUN_0044767d (26 bytes)
export function FUN_0044767d() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FUN_00447697 (26 bytes)
export function FUN_00447697() {
  FUN_004476b1();
  FUN_004476d9();
}
// Source: decompiled/block_00440000.c FUN_004476b1 (40 bytes)
export function FUN_004476b1() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00644e88, 0x3c, 2, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004476d9 (29 bytes)
export function FUN_004476d9() {
  // DEVIATION: _atexit(FUN_004476f6)
}
// Source: decompiled/block_00440000.c FUN_004476f6 (35 bytes)
export function FUN_004476f6() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00644e88, 0x3c, 2, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447719 (26 bytes)
export function FID_conflict___E31_447719() {
  FUN_00447733();
  FUN_0044774d();
}
// Source: decompiled/block_00440000.c FUN_00447733 (26 bytes)
export function FUN_00447733() {
  // DEVIATION: CString::CString((CString *)&G.DAT_0063fcd8)
}
// Source: decompiled/block_00440000.c FUN_0044774d (29 bytes)
export function FUN_0044774d() {
  // DEVIATION: _atexit(FUN_0044776a)
}
// Source: decompiled/block_00440000.c FUN_0044776a (26 bytes)
export function FUN_0044776a() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447784 (26 bytes)
export function FID_conflict___E31_447784() {
  FUN_0044779e();
  FUN_004477b8();
}
// Source: decompiled/block_00440000.c FUN_0044779e (26 bytes)
export function FUN_0044779e() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00647ed8)
}
// Source: decompiled/block_00440000.c FUN_004477b8 (29 bytes)
export function FUN_004477b8() {
  // DEVIATION: _atexit(FUN_004477d5)
}
// Source: decompiled/block_00440000.c FUN_004477d5 (26 bytes)
export function FUN_004477d5() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x004477EF (26 bytes)
export function FID_conflict___E31_4477EF() {
  FUN_00447809();
  FUN_00447823();
}
// Source: decompiled/block_00440000.c FUN_00447809 (26 bytes)
export function FUN_00447809() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00646118)
}
// Source: decompiled/block_00440000.c FUN_00447823 (29 bytes)
export function FUN_00447823() {
  // DEVIATION: _atexit(FUN_00447840)
}
// Source: decompiled/block_00440000.c FUN_00447840 (26 bytes)
export function FUN_00447840() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FUN_0044785a (26 bytes)
export function FUN_0044785a() {
  FUN_00447874();
  FUN_0044789c();
}
// Source: decompiled/block_00440000.c FUN_00447874 (40 bytes)
export function FUN_00447874() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00643b38, 0x3c, 0x20, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044789c (29 bytes)
export function FUN_0044789c() {
  // DEVIATION: _atexit(FUN_004478b9)
}
// Source: decompiled/block_00440000.c FUN_004478b9 (35 bytes)
export function FUN_004478b9() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00643b38, 0x3c, 0x20, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004478dc (26 bytes)
export function FUN_004478dc() {
  FUN_004478f6();
  FUN_0044791e();
}
// Source: decompiled/block_00440000.c FUN_004478f6 (40 bytes)
export function FUN_004478f6() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_0063fd18, 0x3c, 4, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044791e (29 bytes)
export function FUN_0044791e() {
  // DEVIATION: _atexit(FUN_0044793b)
}
// Source: decompiled/block_00440000.c FUN_0044793b (35 bytes)
export function FUN_0044793b() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_0063fd18, 0x3c, 4, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044795e (26 bytes)
export function FUN_0044795e() {
  FUN_00447978();
  FUN_004479a0();
}
// Source: decompiled/block_00440000.c FUN_00447978 (40 bytes)
export function FUN_00447978() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00642710, 0x3c, 0x12, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004479a0 (29 bytes)
export function FUN_004479a0() {
  // DEVIATION: _atexit(FUN_004479bd)
}
// Source: decompiled/block_00440000.c FUN_004479bd (35 bytes)
export function FUN_004479bd() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00642710, 0x3c, 0x12, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004479e0 (26 bytes)
export function FUN_004479e0() {
  FUN_004479fa();
  FUN_00447a22();
}
// Source: decompiled/block_00440000.c FUN_004479fa (40 bytes)
export function FUN_004479fa() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_006446b8, 0x3c, 3, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447a22 (29 bytes)
export function FUN_00447a22() {
  // DEVIATION: _atexit(FUN_00447a3f)
}
// Source: decompiled/block_00440000.c FUN_00447a3f (35 bytes)
export function FUN_00447a3f() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_006446b8, 0x3c, 3, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447A62 (26 bytes)
export function FID_conflict___E31_447A62() {
  FUN_00447a7c();
  FUN_00447a96();
}
// Source: decompiled/block_00440000.c FUN_00447a7c (26 bytes)
export function FUN_00447a7c() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00641808)
}
// Source: decompiled/block_00440000.c FUN_00447a96 (29 bytes)
export function FUN_00447a96() {
  // DEVIATION: _atexit(FUN_00447ab3)
}
// Source: decompiled/block_00440000.c FUN_00447ab3 (26 bytes)
export function FUN_00447ab3() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447ACD (26 bytes)
export function FID_conflict___E31_447ACD() {
  FUN_00447ae7();
  FUN_00447b01();
}
// Source: decompiled/block_00440000.c FUN_00447ae7 (26 bytes)
export function FUN_00447ae7() {
  // DEVIATION: CString::CString((CString *)&G.DAT_0063fc18)
}
// Source: decompiled/block_00440000.c FUN_00447b01 (29 bytes)
export function FUN_00447b01() {
  // DEVIATION: _atexit(FUN_00447b1e)
}
// Source: decompiled/block_00440000.c FUN_00447b1e (26 bytes)
export function FUN_00447b1e() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FUN_00447b38 (26 bytes)
export function FUN_00447b38() {
  FUN_00447b52();
  FUN_00447b7a();
}
// Source: decompiled/block_00440000.c FUN_00447b52 (40 bytes)
export function FUN_00447b52() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_006482f8, 0x3c, 0x16, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447b7a (29 bytes)
export function FUN_00447b7a() {
  // DEVIATION: _atexit(FUN_00447b97)
}
// Source: decompiled/block_00440000.c FUN_00447b97 (35 bytes)
export function FUN_00447b97() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_006482f8, 0x3c, 0x16, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447bba (26 bytes)
export function FUN_00447bba() {
  FUN_00447bd4();
  FUN_00447bfc();
}
// Source: decompiled/block_00440000.c FUN_00447bd4 (40 bytes)
export function FUN_00447bd4() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00647fa0, 0x3c, 2, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447bfc (29 bytes)
export function FUN_00447bfc() {
  // DEVIATION: _atexit(FUN_00447c19)
}
// Source: decompiled/block_00440000.c FUN_00447c19 (35 bytes)
export function FUN_00447c19() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00647fa0, 0x3c, 2, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447C3C (26 bytes)
export function FID_conflict___E31_447C3C() {
  FUN_00447c56();
  FUN_00447c70();
}
// Source: decompiled/block_00440000.c FUN_00447c56 (26 bytes)
export function FUN_00447c56() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00645120)
}
// Source: decompiled/block_00440000.c FUN_00447c70 (29 bytes)
export function FUN_00447c70() {
  // DEVIATION: _atexit(FUN_00447c8d)
}
// Source: decompiled/block_00440000.c FUN_00447c8d (26 bytes)
export function FUN_00447c8d() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447CA7 (26 bytes)
export function FID_conflict___E31_447CA7() {
  FUN_00447cc1();
  FUN_00447cdb();
}
// Source: decompiled/block_00440000.c FUN_00447cc1 (26 bytes)
export function FUN_00447cc1() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00648820)
}
// Source: decompiled/block_00440000.c FUN_00447cdb (29 bytes)
export function FUN_00447cdb() {
  // DEVIATION: _atexit(FUN_00447cf8)
}
// Source: decompiled/block_00440000.c FUN_00447cf8 (26 bytes)
export function FUN_00447cf8() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447D12 (26 bytes)
export function FID_conflict___E31_447D12() {
  FUN_00447d2c();
  FUN_00447d46();
}
// Source: decompiled/block_00440000.c FUN_00447d2c (26 bytes)
export function FUN_00447d2c() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00647788)
}
// Source: decompiled/block_00440000.c FUN_00447d46 (29 bytes)
export function FUN_00447d46() {
  // DEVIATION: _atexit(FUN_00447d63)
}
// Source: decompiled/block_00440000.c FUN_00447d63 (26 bytes)
export function FUN_00447d63() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447D7D (26 bytes)
export function FID_conflict___E31_447D7D() {
  FUN_00447d97();
  FUN_00447db1();
}
// Source: decompiled/block_00440000.c FUN_00447d97 (26 bytes)
export function FUN_00447d97() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00647348)
}
// Source: decompiled/block_00440000.c FUN_00447db1 (29 bytes)
export function FUN_00447db1() {
  // DEVIATION: _atexit(FUN_00447dce)
}
// Source: decompiled/block_00440000.c FUN_00447dce (26 bytes)
export function FUN_00447dce() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447DE8 (26 bytes)
export function FID_conflict___E31_447DE8() {
  FUN_00447e02();
  FUN_00447e1c();
}
// Source: decompiled/block_00440000.c FUN_00447e02 (26 bytes)
export function FUN_00447e02() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00644770)
}
// Source: decompiled/block_00440000.c FUN_00447e1c (29 bytes)
export function FUN_00447e1c() {
  // DEVIATION: _atexit(FUN_00447e39)
}
// Source: decompiled/block_00440000.c FUN_00447e39 (26 bytes)
export function FUN_00447e39() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447E53 (26 bytes)
export function FID_conflict___E31_447E53() {
  FUN_00447e6d();
  FUN_00447e87();
}
// Source: decompiled/block_00440000.c FUN_00447e6d (26 bytes)
export function FUN_00447e6d() {
  // DEVIATION: CString::CString((CString *)&G.DAT_006480d8)
}
// Source: decompiled/block_00440000.c FUN_00447e87 (29 bytes)
export function FUN_00447e87() {
  // DEVIATION: _atexit(FUN_00447ea4)
}
// Source: decompiled/block_00440000.c FUN_00447ea4 (26 bytes)
export function FUN_00447ea4() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FUN_00447ebe (26 bytes)
export function FUN_00447ebe() {
  FUN_00447ed8();
  FUN_00447f00();
}
// Source: decompiled/block_00440000.c FUN_00447ed8 (40 bytes)
export function FUN_00447ed8() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00644b70, 0x3c, 0xb, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447f00 (29 bytes)
export function FUN_00447f00() {
  // DEVIATION: _atexit(FUN_00447f1d)
}
// Source: decompiled/block_00440000.c FUN_00447f1d (35 bytes)
export function FUN_00447f1d() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00644b70, 0x3c, 0xb, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447f40 (26 bytes)
export function FUN_00447f40() {
  FUN_00447f5a();
  FUN_00447f82();
}
// Source: decompiled/block_00440000.c FUN_00447f5a (40 bytes)
export function FUN_00447f5a() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_006477c8, 0x3c, 0xf, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00447f82 (29 bytes)
export function FUN_00447f82() {
  // DEVIATION: _atexit(FUN_00447f9f)
}
// Source: decompiled/block_00440000.c FUN_00447f9f (35 bytes)
export function FUN_00447f9f() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_006477c8, 0x3c, 0xf, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00447FC2 (26 bytes)
export function FID_conflict___E31_447FC2() {
  FUN_00447fdc();
  FUN_00447ff6();
}
// Source: decompiled/block_00440000.c FUN_00447fdc (26 bytes)
export function FUN_00447fdc() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00644e08)
}
// Source: decompiled/block_00440000.c FUN_00447ff6 (29 bytes)
export function FUN_00447ff6() {
  // DEVIATION: _atexit(FUN_00448013)
}
// Source: decompiled/block_00440000.c FUN_00448013 (26 bytes)
export function FUN_00448013() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x0044802D (26 bytes)
export function FID_conflict___E31_44802D() {
  FUN_00448047();
  FUN_00448061();
}
// Source: decompiled/block_00440000.c FUN_00448047 (26 bytes)
export function FUN_00448047() {
  // DEVIATION: CString::CString((CString *)&G.DAT_006442b8)
}
// Source: decompiled/block_00440000.c FUN_00448061 (29 bytes)
export function FUN_00448061() {
  // DEVIATION: _atexit(FUN_0044807e)
}
// Source: decompiled/block_00440000.c FUN_0044807e (26 bytes)
export function FUN_0044807e() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00448098 (26 bytes)
export function FID_conflict___E31_448098() {
  FUN_004480b2();
  FUN_004480cc();
}
// Source: decompiled/block_00440000.c FUN_004480b2 (26 bytes)
export function FUN_004480b2() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00640b98)
}
// Source: decompiled/block_00440000.c FUN_004480cc (29 bytes)
export function FUN_004480cc() {
  // DEVIATION: _atexit(FUN_004480e9)
}
// Source: decompiled/block_00440000.c FUN_004480e9 (26 bytes)
export function FUN_004480e9() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00448103 (26 bytes)
export function FID_conflict___E31_448103() {
  FUN_0044811d();
  FUN_00448137();
}
// Source: decompiled/block_00440000.c FUN_0044811d (26 bytes)
export function FUN_0044811d() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00647f60)
}
// Source: decompiled/block_00440000.c FUN_00448137 (29 bytes)
export function FUN_00448137() {
  // DEVIATION: _atexit(FUN_00448154)
}
// Source: decompiled/block_00440000.c FUN_00448154 (26 bytes)
export function FUN_00448154() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FUN_0044816e (26 bytes)
export function FUN_0044816e() {
  FUN_00448188();
  FUN_004481b0();
}
// Source: decompiled/block_00440000.c FUN_00448188 (40 bytes)
export function FUN_00448188() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_0063fe50, 0x3c, 0x30, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004481b0 (29 bytes)
export function FUN_004481b0() {
  // DEVIATION: _atexit(FUN_004481cd)
}
// Source: decompiled/block_00440000.c FUN_004481cd (35 bytes)
export function FUN_004481cd() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_0063fe50, 0x3c, 0x30, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004481f0 (26 bytes)
export function FUN_004481f0() {
  FUN_0044820a();
  FUN_00448232();
}
// Source: decompiled/block_00440000.c FUN_0044820a (40 bytes)
export function FUN_0044820a() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_006442f8, 0x3c, 0x10, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448232 (29 bytes)
export function FUN_00448232() {
  // DEVIATION: _atexit(FUN_0044824f)
}
// Source: decompiled/block_00440000.c FUN_0044824f (35 bytes)
export function FUN_0044824f() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_006442f8, 0x3c, 0x10, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448272 (26 bytes)
export function FUN_00448272() {
  FUN_0044828c();
  FUN_004482b4();
}
// Source: decompiled/block_00440000.c FUN_0044828c (40 bytes)
export function FUN_0044828c() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00641848, 0x3c, 0x3f, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004482b4 (29 bytes)
export function FUN_004482b4() {
  // DEVIATION: _atexit(FUN_004482d1)
}
// Source: decompiled/block_00440000.c FUN_004482d1 (35 bytes)
export function FUN_004482d1() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00641848, 0x3c, 0x3f, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004482f4 (26 bytes)
export function FUN_004482f4() {
  FUN_0044830e();
  FUN_00448336();
}
// Source: decompiled/block_00440000.c FUN_0044830e (40 bytes)
export function FUN_0044830e() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_006465d8, 0x3c, 8, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448336 (29 bytes)
export function FUN_00448336() {
  // DEVIATION: _atexit(FUN_00448353)
}
// Source: decompiled/block_00440000.c FUN_00448353 (35 bytes)
export function FUN_00448353() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_006465d8, 0x3c, 8, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448376 (26 bytes)
export function FUN_00448376() {
  FUN_00448390();
  FUN_004483b8();
}
// Source: decompiled/block_00440000.c FUN_00448390 (40 bytes)
export function FUN_00448390() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00642d48, 0x3c, 0x2c, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004483b8 (29 bytes)
export function FUN_004483b8() {
  // DEVIATION: _atexit(FUN_004483d5)
}
// Source: decompiled/block_00440000.c FUN_004483d5 (35 bytes)
export function FUN_004483d5() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00642d48, 0x3c, 0x2c, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004483f8 (26 bytes)
export function FUN_004483f8() {
  FUN_00448412();
  FUN_0044843a();
}
// Source: decompiled/block_00440000.c FUN_00448412 (40 bytes)
export function FUN_00448412() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00646a20, 0x3c, 0xb, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044843a (29 bytes)
export function FUN_0044843a() {
  // DEVIATION: _atexit(FUN_00448457)
}
// Source: decompiled/block_00440000.c FUN_00448457 (35 bytes)
export function FUN_00448457() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00646a20, 0x3c, 0xb, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044847a (26 bytes)
export function FUN_0044847a() {
  FUN_00448494();
  FUN_004484bc();
}
// Source: decompiled/block_00440000.c FUN_00448494 (40 bytes)
export function FUN_00448494() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00644f00, 0x3c, 6, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004484bc (29 bytes)
export function FUN_004484bc() {
  // DEVIATION: _atexit(FUN_004484d9)
}
// Source: decompiled/block_00440000.c FUN_004484d9 (35 bytes)
export function FUN_004484d9() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00644f00, 0x3c, 6, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004484fc (26 bytes)
export function FUN_004484fc() {
  FUN_00448516();
  FUN_0044853e();
}
// Source: decompiled/block_00440000.c FUN_00448516 (40 bytes)
export function FUN_00448516() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00648860, 0x3c, 3, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044853e (29 bytes)
export function FUN_0044853e() {
  // DEVIATION: _atexit(FUN_0044855b)
}
// Source: decompiled/block_00440000.c FUN_0044855b (35 bytes)
export function FUN_0044855b() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00648860, 0x3c, 3, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044857e (26 bytes)
export function FUN_0044857e() {
  FUN_00448598();
  FUN_004485c0();
}
// Source: decompiled/block_00440000.c FUN_00448598 (40 bytes)
export function FUN_00448598() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00645068, 0x3c, 3, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004485c0 (29 bytes)
export function FUN_004485c0() {
  // DEVIATION: _atexit(FUN_004485dd)
}
// Source: decompiled/block_00440000.c FUN_004485dd (35 bytes)
export function FUN_004485dd() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00645068, 0x3c, 3, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448600 (26 bytes)
export function FUN_00448600() {
  FUN_0044861a();
  FUN_00448642();
}
// Source: decompiled/block_00440000.c FUN_0044861a (40 bytes)
export function FUN_0044861a() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00648918, 0x3c, 3, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448642 (29 bytes)
export function FUN_00448642() {
  // DEVIATION: _atexit(FUN_0044865f)
}
// Source: decompiled/block_00440000.c FUN_0044865f (35 bytes)
export function FUN_0044865f() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00648918, 0x3c, 3, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00448682 (26 bytes)
export function FID_conflict___E31_448682() {
  FUN_0044869c();
  FUN_004486b6();
}
// Source: decompiled/block_00440000.c FUN_0044869c (26 bytes)
export function FUN_0044869c() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00646598)
}
// Source: decompiled/block_00440000.c FUN_004486b6 (29 bytes)
export function FUN_004486b6() {
  // DEVIATION: _atexit(FUN_004486d3)
}
// Source: decompiled/block_00440000.c FUN_004486d3 (26 bytes)
export function FUN_004486d3() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x004486ED (26 bytes)
export function FID_conflict___E31_4486ED() {
  FUN_00448707();
  FUN_00448721();
}
// Source: decompiled/block_00440000.c FUN_00448707 (26 bytes)
export function FUN_00448707() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00648058)
}
// Source: decompiled/block_00440000.c FUN_00448721 (29 bytes)
export function FUN_00448721() {
  // DEVIATION: _atexit(FUN_0044873e)
}
// Source: decompiled/block_00440000.c FUN_0044873e (26 bytes)
export function FUN_0044873e() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FUN_00448758 (26 bytes)
export function FUN_00448758() {
  FUN_00448772();
  FUN_0044879a();
}
// Source: decompiled/block_00440000.c FUN_00448772 (40 bytes)
export function FUN_00448772() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00648118, 0x3c, 4, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044879a (29 bytes)
export function FUN_0044879a() {
  // DEVIATION: _atexit(FUN_004487b7)
}
// Source: decompiled/block_00440000.c FUN_004487b7 (35 bytes)
export function FUN_004487b7() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00648118, 0x3c, 4, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004487da (26 bytes)
export function FUN_004487da() {
  FUN_004487f4();
  FUN_0044881c();
}
// Source: decompiled/block_00440000.c FUN_004487f4 (40 bytes)
export function FUN_004487f4() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00648208, 0x3c, 4, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044881c (29 bytes)
export function FUN_0044881c() {
  // DEVIATION: _atexit(FUN_00448839)
}
// Source: decompiled/block_00440000.c FUN_00448839 (35 bytes)
export function FUN_00448839() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00648208, 0x3c, 4, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044885c (26 bytes)
export function FUN_0044885c() {
  FUN_00448876();
  FUN_0044889e();
}
// Source: decompiled/block_00440000.c FUN_00448876 (40 bytes)
export function FUN_00448876() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_0063f6f0, 0x3c, 6, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044889e (29 bytes)
export function FUN_0044889e() {
  // DEVIATION: _atexit(FUN_004488bb)
}
// Source: decompiled/block_00440000.c FUN_004488bb (35 bytes)
export function FUN_004488bb() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_0063f6f0, 0x3c, 6, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x004488DE (26 bytes)
export function FID_conflict___E31_4488DE() {
  FUN_004488f8();
  FUN_00448912();
}
// Source: decompiled/block_00440000.c FUN_004488f8 (26 bytes)
export function FUN_004488f8() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00648098)
}
// Source: decompiled/block_00440000.c FUN_00448912 (29 bytes)
export function FUN_00448912() {
  // DEVIATION: _atexit(FUN_0044892f)
}
// Source: decompiled/block_00440000.c FUN_0044892f (26 bytes)
export function FUN_0044892f() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FUN_00448949 (26 bytes)
export function FUN_00448949() {
  FUN_00448963();
  FUN_0044898b();
}
// Source: decompiled/block_00440000.c FUN_00448963 (40 bytes)
export function FUN_00448963() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00645160, 0x3c, 0x43, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_0044898b (29 bytes)
export function FUN_0044898b() {
  // DEVIATION: _atexit(FUN_004489a8)
}
// Source: decompiled/block_00440000.c FUN_004489a8 (35 bytes)
export function FUN_004489a8() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00645160, 0x3c, 0x43, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_004489cb (26 bytes)
export function FUN_004489cb() {
  FUN_004489e5();
  FUN_00448a0d();
}
// Source: decompiled/block_00440000.c FUN_004489e5 (40 bytes)
export function FUN_004489e5() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00646cb8, 0x3c, 0x14, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448a0d (29 bytes)
export function FUN_00448a0d() {
  // DEVIATION: _atexit(FUN_00448a2a)
}
// Source: decompiled/block_00440000.c FUN_00448a2a (35 bytes)
export function FUN_00448a2a() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00646cb8, 0x3c, 0x14, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448a4d (26 bytes)
export function FUN_00448a4d() {
  FUN_00448a67();
  FUN_00448a8f();
}
// Source: decompiled/block_00440000.c FUN_00448a67 (40 bytes)
export function FUN_00448a67() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00647168, 0x3c, 8, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448a8f (29 bytes)
export function FUN_00448a8f() {
  // DEVIATION: _atexit(FUN_00448aac)
}
// Source: decompiled/block_00440000.c FUN_00448aac (35 bytes)
export function FUN_00448aac() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00647168, 0x3c, 8, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00448ACF (26 bytes)
export function FID_conflict___E31_448ACF() {
  FUN_00448ae9();
  FUN_00448b03();
}
// Source: decompiled/block_00440000.c FUN_00448ae9 (26 bytes)
export function FUN_00448ae9() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00646198)
}
// Source: decompiled/block_00440000.c FUN_00448b03 (29 bytes)
export function FUN_00448b03() {
  // DEVIATION: _atexit(FUN_00448b20)
}
// Source: decompiled/block_00440000.c FUN_00448b20 (26 bytes)
export function FUN_00448b20() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FUN_00448b3a (26 bytes)
export function FUN_00448b3a() {
  FUN_00448b54();
  FUN_00448b7c();
}
// Source: decompiled/block_00440000.c FUN_00448b54 (40 bytes)
export function FUN_00448b54() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00647b50, 0x3c, 4, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448b7c (29 bytes)
export function FUN_00448b7c() {
  // DEVIATION: _atexit(FUN_00448b99)
}
// Source: decompiled/block_00440000.c FUN_00448b99 (35 bytes)
export function FUN_00448b99() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00647b50, 0x3c, 4, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448bbc (26 bytes)
export function FUN_00448bbc() {
  FUN_00448bd6();
  FUN_00448bfe();
}
// Source: decompiled/block_00440000.c FUN_00448bd6 (40 bytes)
export function FUN_00448bd6() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00646878, 0x3c, 7, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448bfe (29 bytes)
export function FUN_00448bfe() {
  // DEVIATION: _atexit(FUN_00448c1b)
}
// Source: decompiled/block_00440000.c FUN_00448c1b (35 bytes)
export function FUN_00448c1b() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00646878, 0x3c, 7, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448c3e (26 bytes)
export function FUN_00448c3e() {
  FUN_00448c58();
  FUN_00448c80();
}
// Source: decompiled/block_00440000.c FUN_00448c58 (40 bytes)
export function FUN_00448c58() {
  // DEVIATION: _eh_vector_constructor_iterator_(&G.DAT_00643798, 0x3c, 8, CString::CString, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448c80 (29 bytes)
export function FUN_00448c80() {
  // DEVIATION: _atexit(FUN_00448c9d)
}
// Source: decompiled/block_00440000.c FUN_00448c9d (35 bytes)
export function FUN_00448c9d() {
  // DEVIATION: _eh_vector_destructor_iterator_(&G.DAT_00643798, 0x3c, 8, FUN_005cde4d)
}
// Source: decompiled/block_00440000.c FUN_00448cc0 (26 bytes)
export function FUN_00448cc0() {
  FUN_00448cda();
  FUN_00448d1c();
}
// Source: decompiled/block_00440000.c FUN_00448cda (66 bytes)
export function FUN_00448cda() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00647748)
  // DEVIATION: CString::CString((CString *)&G.DAT_006409d8)
  // DEVIATION: CString::CString((CString *)&G.DAT_00644e48)
  // DEVIATION: CString::CString((CString *)&G.DAT_0063fc98)
  // DEVIATION: CString::CString((CString *)&G.DAT_00648018)
}
// Source: decompiled/block_00440000.c FUN_00448d1c (29 bytes)
export function FUN_00448d1c() {
  // DEVIATION: _atexit(FUN_00448d39)
}
// Source: decompiled/block_00440000.c FUN_00448d39 (66 bytes)
export function FUN_00448d39() {
  FUN_005cde4d(); // DEVIATION: CString destructor x5
  FUN_005cde4d();
  FUN_005cde4d();
  FUN_005cde4d();
  FUN_005cde4d();
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00448D7B (26 bytes)
export function FID_conflict___E31_448D7B() {
  FUN_00448d95();
  FUN_00448daf();
}
// Source: decompiled/block_00440000.c FUN_00448d95 (26 bytes)
export function FUN_00448d95() {
  // DEVIATION: CString::CString((CString *)&G.DAT_0063fc58)
}
// Source: decompiled/block_00440000.c FUN_00448daf (29 bytes)
export function FUN_00448daf() {
  // DEVIATION: _atexit(FUN_00448dcc)
}
// Source: decompiled/block_00440000.c FUN_00448dcc (26 bytes)
export function FUN_00448dcc() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00448DE6 (26 bytes)
export function FID_conflict___E31_448DE6() {
  FUN_00448e00();
  FUN_00448e1a();
}
// Source: decompiled/block_00440000.c FUN_00448e00 (26 bytes)
export function FUN_00448e00() {
  // DEVIATION: CString::CString((CString *)&G.DAT_00643af8)
}
// Source: decompiled/block_00440000.c FUN_00448e1a (29 bytes)
export function FUN_00448e1a() {
  // DEVIATION: _atexit(FUN_00448e37)
}
// Source: decompiled/block_00440000.c FUN_00448e37 (26 bytes)
export function FUN_00448e37() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00448E51 (26 bytes)
export function FID_conflict___E31_448E51() {
  FUN_00448e6b();
  FUN_00448e85();
}
// Source: decompiled/block_00440000.c FUN_00448e6b (26 bytes)
export function FUN_00448e6b() {
  FUN_005bd630(); // DEVIATION: bitmap constructor
}
// Source: decompiled/block_00440000.c FUN_00448e85 (29 bytes)
export function FUN_00448e85() {
  // DEVIATION: _atexit(FUN_00448ea2)
}
// Source: decompiled/block_00440000.c FUN_00448ea2 (26 bytes)
export function FUN_00448ea2() {
  FUN_005bd915(); // DEVIATION: bitmap destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00448EBC (26 bytes)
export function FID_conflict___E31_448EBC() {
  FUN_00448ed6();
  FUN_00448ef0();
}
// Source: decompiled/block_00440000.c FUN_00448ed6 (26 bytes)
export function FUN_00448ed6() {
  FUN_005bd630(); // DEVIATION: bitmap constructor
}
// Source: decompiled/block_00440000.c FUN_00448ef0 (29 bytes)
export function FUN_00448ef0() {
  // DEVIATION: _atexit(FUN_00448f0d)
}
// Source: decompiled/block_00440000.c FUN_00448f0d (26 bytes)
export function FUN_00448f0d() {
  FUN_005bd915(); // DEVIATION: bitmap destructor
}
// Source: decompiled/block_00440000.c FID_conflict:_$E31 @ 0x00448F27 (26 bytes)
export function FID_conflict___E31_448F27() {
  FUN_00448f41();
  FUN_00448f5b();
}
// Source: decompiled/block_00440000.c FUN_00448f41 (26 bytes)
export function FUN_00448f41() {
  FUN_005bd630(); // DEVIATION: bitmap constructor
}
// Source: decompiled/block_00440000.c FUN_00448f5b (29 bytes)
export function FUN_00448f5b() {
  // DEVIATION: _atexit(FUN_00448f78)
}
// Source: decompiled/block_00440000.c FUN_00448f78 (26 bytes)
export function FUN_00448f78() {
  FUN_005bd915(); // DEVIATION: bitmap destructor
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00448f92 — get_government_type_from_techs
// Returns government type (0-3) based on which techs a civ has.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00448f92(param_1) {
  let iVar1;
  let uVar2;

  iVar1 = FUN_004bd9f0(param_1, 0x18);
  if ((iVar1 !== 0) && (iVar1 = FUN_004bd9f0(param_1, 5), iVar1 !== 0)) {
    return 3;
  }
  iVar1 = FUN_004bd9f0(param_1, 0x25);
  if (iVar1 === 0) {
    iVar1 = FUN_004bd9f0(param_1, 0x26);
    if ((iVar1 !== 0) && (iVar1 = FUN_004bd9f0(param_1, 0x3c), iVar1 !== 0)) {
      return 1;
    }
    uVar2 = 0;
  } else {
    uVar2 = 2;
  }
  return uVar2;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00449030 — load_terrain_sprites (UI/rendering)
// Loads TERRAIN1 and TERRAIN2 bitmap/gif and cuts them into sprite tiles.
// ═══════════════════════════════════════════════════════════════════
export function FUN_00449030() {
  return; // UI/rendering — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044996f — cstring_dtor_local_4c
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044996f (12 bytes)
export function FUN_0044996f() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044997b — cstring_dtor_local_ac
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044997b (9 bytes)
export function FUN_0044997b() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044998e — seh_fs_restore_terrain
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044998e (14 bytes)
export function FUN_0044998e() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044999c — cut_terrain_tile_64x32 (rendering helper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044999c(param_1, param_2, param_3) {
  FUN_005cedad(G.DAT_0063fe08, 7, param_2, param_3, 0x40, 0x20); // stub
  FUN_005cf467(9, 7); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004499d3 — cut_sprite_tile_variable (rendering helper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_004499d3(param_1, param_2, param_3, param_4, param_5) {
  FUN_005cedad(G.DAT_0063fe08, 7, param_2, param_3, param_4, param_5); // stub
  FUN_005cf467(9, 7); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00449a0e — load_icon_sprites (UI/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00449a0e() {
  return; // UI/rendering — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ab4e — seh_cleanup_icons_1
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044ab4e (12 bytes)
export function FUN_0044ab4e() {
  FUN_005c656b(); // DEVIATION: critical section cleanup
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ab64 — seh_fs_restore_icons
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044ab64 (14 bytes)
export function FUN_0044ab64() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ab72 — cut_icon_32x32 (rendering helper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044ab72(param_1, param_2, param_3) {
  FUN_005cedad(G.DAT_0063fe08, 7, param_2, param_3, 0x20, 0x20); // stub
  FUN_005cf467(9, 7); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044aba9 — cut_square_sprite (rendering helper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044aba9(param_1, param_2, param_3, param_4) {
  FUN_004499d3(param_1, param_2, param_3, param_4, param_4);
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044abd5 — cut_building_sprite (rendering helper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044abd5(param_1, param_2, param_3) {
  FUN_0044ac07(G.DAT_006465d8 + param_1 * 0x3c, param_2, param_3);
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ac07 — cut_large_tile_64x48 (rendering helper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044ac07(param_1, param_2, param_3) {
  FUN_005cedad(G.DAT_0063fe08, 7, param_2, param_3, 0x40, 0x30); // stub
  FUN_005cf467(9, 7); // stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ac3e — calc_chroma_offset_terrain (rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044ac3e(param_1, param_2, param_3, param_4, param_5) {
  return; // Rendering offset calc — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ad47 — calc_chroma_offset_terrain2 (rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044ad47(param_1, param_2, param_3, param_4, param_5) {
  return; // Rendering offset calc — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ae4c — load_cities_sprites (UI/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044ae4c() {
  return; // UI/rendering — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044b239 — calc_chroma_offset_units (rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044b239(param_1, param_2, param_3) {
  return; // Rendering offset calc — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044b30e — load_units_sprites (UI/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044b30e() {
  return; // UI/rendering — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044b49e — load_all_sprites (UI/rendering)
// Master sprite loader — calls terrain, icons, cities, units loaders.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044b49e() {
  return; // UI/rendering — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044b4f6 — seh_cleanup_sprites
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044b4f6 (12 bytes)
export function FUN_0044b4f6() {
  FUN_0044cba0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044b50c — seh_fs_restore_sprites
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044b50c (14 bytes)
export function FUN_0044b50c() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044c5a0 — sprite_manager_constructor (OOP/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044c5a0() {
  // Source: decompiled/block_00440000.c FUN_0044c5a0 (133 bytes)
  // DEVIATION: Win32 — SEH frame
    // C: FUN_005bd630();
    // C: local_8 = 0;
    // C: thunk_FUN_0044c670();
    // C: *in_ECX = &PTR_FUN_0061c060;
    // C: in_ECX[0x40] = 0;
    // C: in_ECX[0x44] = 0;
    // C: return in_ECX;
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044c670 — sprite_sub_constructor (OOP/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044c670() {
  // Source: decompiled/block_00440000.c FUN_0044c670 (132 bytes)
  // DEVIATION: Win32 — SEH frame
    // C: thunk_FUN_0044c730();
    // C: *(undefined4 *)(in_ECX + 0xb8) = 0;
    // C: *(undefined4 *)(in_ECX + 0xbc) = 0;
    // C: *(undefined4 *)(in_ECX + 0xc0) = 0;
    // C: *(undefined1 *)(in_ECX + 0xc4) = 1;
    // C: return in_ECX;
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044c730 — sprite_base_constructor (OOP/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044c730() {
  // Source: decompiled/block_00440000.c FUN_0044c730 (274 bytes)
  // DEVIATION: Win32 — SEH frame
    // C: FUN_005db610();
    // C: local_8 = 0;
    // C: CString::CString((CString *)(in_ECX + 0x10));
    // C: *(undefined4 *)(in_ECX + 0x78) = 0;
    // C: *(undefined4 *)(in_ECX + 0x98) = 0;
    // C: *(undefined4 *)(in_ECX + 0x9c) = 0;
    // C: *(undefined4 *)(in_ECX + 0x7c) = 0;
    // C: *(undefined4 *)(in_ECX + 0x80) = 0;
    // C: *(undefined4 *)(in_ECX + 0x84) = 0x4000;
    // C: *(undefined4 *)(in_ECX + 0x88) = 0x4000;
    // C: *(undefined4 *)(in_ECX + 0xa8) = 0;
    // C: *(undefined4 *)(in_ECX + 0xac) = 0;
    // C: *(undefined4 *)(in_ECX + 0x8c) = 0;
    // C: *(undefined4 *)(in_ECX + 0x90) = 1;
    // C: *(undefined4 *)(in_ECX + 0x94) = 1;
    // ... (3 more lines)
  return;
}

// ═══════════════════════════════════════════════════════════════════
// CString::CString — MFC CString default constructor (library)
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c CString_CString (29 bytes)
export function CString_CString() {
  // DEVIATION: MFC — _eh_vector_constructor_iterator_(G.DAT_00647c40, 0x3c, 0xb, CString::CString, FUN_005cde4d)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044c8e0 — zero_init_26_dwords (OOP init helper)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044c8e0(in_ECX) {
  // Source: decompiled/block_00440000.c FUN_0044c8e0 (281 bytes)
  // DEVIATION: MFC this pointer — zeroes 26 dwords of object state
  if (in_ECX) {
    for (let i = 0; i < 0x1a; i++) { in_ECX[i] = 0; }
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ca40 — empty_virtual_function (no-op)
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044ca40 (22 bytes)
export function FUN_0044ca40() {
  // C: return; (truly empty function)
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ca60 — sprite_base_destructor_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044ca60() {
  // Source: decompiled/block_00440000.c FUN_0044ca60 (75 bytes)
  // DEVIATION: SEH frame setup
  FUN_0044caab();
  FUN_0044cad3();
  FUN_0044cae6();
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044caab — sprite_conditional_dtor_call
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044caab() {
  // Source: decompiled/block_00440000.c FUN_0044caab (40 bytes)
  // DEVIATION: stack frame pointer manipulation (unaff_EBP + -0x14/0x10)
  FUN_0044ca40();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cad3 — win32_dtor_helper
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044cad3 (9 bytes)
export function FUN_0044cad3() {
  FUN_005db650(); // DEVIATION: GDI object destructor
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cae6 — seh_fs_restore_ca
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044cae6 (14 bytes)
export function FUN_0044cae6() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cb20 — sprite_sub_destructor_wrapper
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044cb20() {
  // Source: decompiled/block_00440000.c FUN_0044cb20 (62 bytes)
  // DEVIATION: SEH frame setup
  FUN_0044cb5e();
  FUN_0044cb71();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cb5e — sprite_sub_dtor_call
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044cb5e (9 bytes)
export function FUN_0044cb5e() {
  FUN_0044ca60();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cb71 — seh_fs_restore_cb
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044cb71 (14 bytes)
export function FUN_0044cb71() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cba0 — sprite_manager_destructor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044cba0() {
  // Source: decompiled/block_00440000.c FUN_0044cba0 (97 bytes)
  // DEVIATION: Win32 — SEH frame
    // C: *in_ECX = &PTR_FUN_0061c060;
    // C: in_ECX[0x44] = 0;
    // C: local_8 = 0;
    // C: FUN_0044cc01();
    // C: FUN_0044cc29();
    // C: FUN_0044cc3c();
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cc01 — sprite_mgr_conditional_dtor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044cc01() {
  // Source: decompiled/block_00440000.c FUN_0044cc01 (40 bytes)
  // DEVIATION: stack frame pointer manipulation (unaff_EBP + -0x14/0x10)
  FUN_0044cb20();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cc29 — bitmap_dtor_helper
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044cc29 (9 bytes)
export function FUN_0044cc29() {
  FUN_005bd915(); // DEVIATION: bitmap destructor
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cc3c — seh_fs_restore_cc
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044cc3c (14 bytes)
export function FUN_0044cc3c() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cc80 — throne_room_view (UI/rendering)
// Shows the throne room with improvement check.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044cc80(param_1) {
  return; // UI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cd77 — seh_cleanup_throne_1
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044cd77 (12 bytes)
export function FUN_0044cd77() {
  FUN_0044d027();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cd8d — seh_fs_restore_throne
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044cd8d (14 bytes)
export function FUN_0044cd8d() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cd9b — throne_room_quick_view (UI/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044cd9b(param_1) {
  return; // UI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044cdf2 — seh_cleanup_throne_quick
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044cdf2 (12 bytes)
export function FUN_0044cdf2() {
  FUN_0044d027();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ce08 — seh_fs_restore_throne_quick
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044ce08 (14 bytes)
export function FUN_0044ce08() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044ce16 — throne_room_init (OOP/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044ce16(param_1) {
  return; // UI/OOP — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044d027 — throne_room_destructor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044d027() {
  // Source: decompiled/block_00440000.c FUN_0044d027 (177 bytes)
  // DEVIATION: SEH frame setup
  G.DAT_00626810 = 0;
  FUN_00450340();
  FUN_0044d0d8();
  FUN_0044d0e7();
  FUN_0044d0f6();
  FUN_0044d105();
  FUN_0044d114();
  FUN_0044d123();
  FUN_0044d132();
  FUN_0044d141();
  FUN_0044d154();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044d0d8 through FUN_0044d154 — throne room destructor chain
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044d0d8 (15 bytes)
export function FUN_0044d0d8() {
  FUN_0043c520(); // DEVIATION: delete GDI object
}
// Source: decompiled/block_00440000.c FUN_0044d0e7 (15 bytes)
export function FUN_0044d0e7() {
  FUN_0059df8a(); // DEVIATION: stack dealloc
}
// Source: decompiled/block_00440000.c FUN_0044d0f6 (15 bytes)
export function FUN_0044d0f6() {
  FUN_0046ab49(); // DEVIATION: sound cleanup
}
// Source: decompiled/block_00440000.c FUN_0044d105 (15 bytes)
export function FUN_0044d105() {
  FUN_005bd915(); // DEVIATION: bitmap destructor
}
// Source: decompiled/block_00440000.c FUN_0044d114 (15 bytes)
export function FUN_0044d114() {
  FUN_0044cba0(); // sprite manager destructor
}
// Source: decompiled/block_00440000.c FUN_0044d123 (15 bytes)
export function FUN_0044d123() {
  // DEVIATION: _Timevec::~_Timevec((_Timevec *)(*(int *)(unaff_EBP + -0x10) + 0x4fc))
}
// Source: decompiled/block_00440000.c FUN_0044d132 (15 bytes)
export function FUN_0044d132() {
  FUN_005c656b(); // DEVIATION: critical section cleanup
}
// Source: decompiled/block_00440000.c FUN_0044d141 (9 bytes)
export function FUN_0044d141() {
  FUN_0044ca60(); // sprite base destructor
}
// Source: decompiled/block_00440000.c FUN_0044d154 (14 bytes)
export function FUN_0044d154() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044d162 — throne_room_load_dll (UI/rendering)
// Loads pv.dll and initializes throne room rendering.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044d162() {
  // Source: decompiled/block_00440000.c FUN_0044d162 (308 bytes)
  // DEVIATION: Win32/MFC — OOP method
    // C: thunk_FUN_004aef20(local_84);
    // C: thunk_FUN_0043c840(local_84,s_pv_dll_00626814);
    // C: iVar1 = thunk_FUN_00564713(local_84);
    // C: if (iVar1 != 0) {
    // C: thunk_FUN_004502e0(local_84);
    // C: FUN_005c5fc4(&G.DAT_0062681c,0x800,0,0,*(undefined4 *)(in_ECX + 0x4f4),
    // C: *(int *)(in_ECX + 0x4f8) + 5,&G.DAT_006a8c00,&G.DAT_006553d8);
    // C: thunk_FUN_00419ba0(0);
    // C: FUN_005bb4ae(&G.DAT_00626820,0x800,0,0,0x280,0x1e0,in_ECX + 0xb8,in_ECX);
    // C: thunk_FUN_00450400();
    // C: thunk_FUN_00408130(&LAB_004034bd);
    // C: COleControlSite::SetDlgCtrlID((COleControlSite *)(in_ECX + 0x55c),0x401fe6);
    // C: }
    // C: return iVar1 != 0;
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044d296 — throne_room_ceremony (UI/rendering)
// Full throne room improvement ceremony with animation.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044d296() {
  // Source: decompiled/block_00440000.c FUN_0044d296 (1799 bytes)
  // DEVIATION: Win32 — SEH frame
    // C: iVar1 = thunk_FUN_0044d162();
    // C: if (iVar1 == 0) {
    // C: FUN_0044d9b3();
    // C: }
    // C: iVar1 = thunk_FUN_0044db92();
    // C: if (iVar1 != 0) {
    // C: FUN_005bd65c(0x280,0x1e0);
    // C: SetRect(&local_20,0,0,0x280,0x1e0);
    // C: FUN_005c0593(in_ECX + 0x618,&local_20,&local_20);
    // C: thunk_FUN_0043c460(1,0x18);
    // C: local_8 = 0;
    // C: iVar1 = thunk_FUN_004a2379(&G.DAT_006558e8,s_THRONE_00626824);
    // C: if (iVar1 == 0) {
    // C: thunk_FUN_004aef20(local_420);
    // C: while (pcVar2 = (char *)thunk_FUN_004a23fc(1), *pcVar2 != '@') {
    // ... (102 more lines)
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044d99d — seh_cleanup_ceremony_1
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044d99d (12 bytes)
export function FUN_0044d99d() {
  FUN_0043c520(); // DEVIATION: delete GDI object
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044d9b3 — seh_fs_restore_ceremony
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044d9b3 (14 bytes)
export function FUN_0044d9b3() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044d9c1 — throne_room_show_existing (UI/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044d9c1() {
  // Source: decompiled/block_00440000.c FUN_0044d9c1 (244 bytes)
  let iVar1;
  let in_ECX = 0; // DEVIATION: MFC this pointer
  iVar1 = FUN_0044d162();
  if ((iVar1 !== 0) && (iVar1 = FUN_0044db92(), iVar1 !== 0)) {
    FUN_0044dab5();
    // DEVIATION: *(undefined4 *)(in_ECX + 0x1924) = 0 — MFC member write
    FUN_00408650();
    FUN_00419b80();
    FUN_00450390(in_ECX + 0xb8); // DEVIATION: in_ECX pointer arithmetic
    FUN_004085f0();
    FUN_00419b80();
    if (2 < G.DAT_00655b02) {
      // DEVIATION: CPropertySheet::EnableStackedTabs((CPropertySheet *)(in_ECX + 0x54c), 0x403585)
    }
    FUN_005c61b0();
    // DEVIATION: CPropertySheet::EnableStackedTabs((CPropertySheet *)(in_ECX + 0x54c), 0)
    FUN_004503d0();
    FUN_00419b80();
    FUN_00450390(G.DAT_006a8c00);
    FUN_004503d0();
    FUN_00419b80();
  }
    // C: }
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044dab5 — throne_room_draw_title (UI/rendering)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044dab5() {
  // Source: decompiled/block_00440000.c FUN_0044dab5 (221 bytes)
  // DEVIATION: Win32/MFC — OOP method
    // C: thunk_FUN_0040bbb0();
    // C: thunk_FUN_0040bbe0(&G.DAT_00626840);
    // C: uVar1 = thunk_FUN_00428b0c(*(undefined4 *)(G.DAT_00628420 + 0x720));
    // C: thunk_FUN_0040bbe0(uVar1);
    // C: thunk_FUN_0040bbe0(&G.DAT_00626844);
    // C: FUN_005c19ad(0);
    // C: FUN_005c1020(in_ECX + 0x1c34,&G.DAT_00679640,in_ECX + 0x1c24,0);
    // C: OffsetRect((LPRECT)(in_ECX + 0x1c24),-1,-1);
    // C: FUN_005c19ad(0xff);
    // C: FUN_005c1020(in_ECX + 0x1c34,&G.DAT_00679640,in_ECX + 0x1c24,0);
    // C: OffsetRect((LPRECT)(in_ECX + 0x1c24),1,1);
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044db92 — throne_room_build_scene (UI/rendering)
// Builds the throne room scene by compositing all improvement layers.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044db92() {
  // Source: decompiled/block_00440000.c FUN_0044db92 (3024 bytes)
  // DEVIATION: Win32 — SEH frame
    // C: FUN_005bd630();
    // C: local_8 = 0;
    // C: CString::CString(local_4c);
    // C: local_54 = 0;
    // C: do {
    // C: if (2 < local_54) {
    // C: thunk_FUN_00407ff0();
    // C: if ((*(int *)(in_ECX + 0x1928) != 0) &&
    // C: (((&G.DAT_0064ca9b)[*(int *)(in_ECX + 0x500) * 0x594] & 1) != 0)) {
    // C: iVar1 = FUN_005bf5e1(0xa0,10,0xec,in_ECX + 0xb8);
    // C: if (iVar1 == 0) {
    // C: local_b4 = 0;
    // C: FUN_0044e762();
    // C: FUN_0044e76b();
    // C: FUN_0044e781();
    // ... (167 more lines)
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044e762 — cstring_dtor_throne_local
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044e762 (9 bytes)
export function FUN_0044e762() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044e76b — bitmap_dtor_throne
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044e76b (12 bytes)
export function FUN_0044e76b() {
  FUN_005bd915(); // DEVIATION: bitmap destructor
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044e781 — seh_fs_restore_throne_scene
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044e781 (15 bytes)
export function FUN_0044e781() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044e790 — throne_room_pick_improvement (UI/rendering)
// Shows throne room improvement selection dialog.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044e790() {
  // Source: decompiled/block_00440000.c FUN_0044e790 (3336 bytes)
  // DEVIATION: Win32 — SEH frame
    // C: FUN_005bd630();
    // C: local_8 = 0;
    // C: CString::CString(local_270);
    // C: local_360[0] = 0xd4;
    // C: local_360[1] = 1;
    // C: local_360[2] = 0xb3;
    // C: local_360[3] = 0x127;
    // C: local_360[4] = 0x13;
    // C: local_360[5] = 0x11b;
    // C: local_360[6] = 0x24f;
    // C: local_360[7] = 0xc6;
    // C: local_360[8] = 0xc6;
    // C: local_360[9] = 0x12f;
    // C: local_360[10] = 0xd7;
    // C: local_360[0xb] = 0xb1;
    // ... (275 more lines)
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044f498 — cstring_dtor_pick
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044f498 (12 bytes)
export function FUN_0044f498() {
  FUN_005cde4d(); // DEVIATION: CString destructor
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044f4a4 — bitmap_dtor_pick
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044f4a4 (12 bytes)
export function FUN_0044f4a4() {
  FUN_005bd915(); // DEVIATION: bitmap destructor
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044f4ba — seh_fs_restore_pick
// ═══════════════════════════════════════════════════════════════════
// Source: decompiled/block_00440000.c FUN_0044f4ba (15 bytes)
export function FUN_0044f4ba() {
  // DEVIATION: Win32 — SEH epilog
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044f4c9 — throne_room_handle_click (UI/rendering)
// Handles mouse click in throne room improvement selection.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044f4c9(param_1, param_2) {
  return; // UI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044f717 — throne_room_handle_key (UI/rendering)
// Handles keyboard input in throne room.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044f717(param_1) {
  return; // UI — stubbed
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0044f799 — throne_room_invalidate (UI/rendering)
// Triggers redraw of throne room if active.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0044f799() {
  // Source: decompiled/block_00440000.c FUN_0044f799 (64 bytes)
  if (G.DAT_00626810 !== 0) {
    // DEVIATION: *(int *)(G.DAT_00626810 + 0x1924) == 0 — MFC member access
    // DEVIATION: CRichEditDoc::InvalidateObjectCache((CRichEditDoc *)(G.DAT_00626810 + 0x54c))
  }
}


// ═══════════════════════════════════════════════════════════════════
// STUB: External functions referenced by this block but defined
// elsewhere. These are no-op placeholders that prevent runtime errors.
// In a full integration, they would be imported from their respective
// block modules or from fn_utils.js.
// ═══════════════════════════════════════════════════════════════════

function debug_log(msg) { return; } // debug_log
function XD_FlushSendBuffer(p1) { return; } // flush_network
function FUN_citywin_C449(p1) { return; } // close_city_window
function FUN_citywin_9429() { return; } // refresh_city_window

// Win32 API stubs
function SetRect() { return; }
function OffsetRect() { return; }

// MFC stubs
function FUN_00628044_set(v) { G.DAT_00628044 = v; }
