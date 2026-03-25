// ═══════════════════════════════════════════════════════════════════
// block_00490000.js — Mechanical transpilation of block_00490000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00490000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00490000.c
//
// DEVIATION: MFC object pointer dereferences throughout this file.
// C uses *(int *)(ptr + offset) to read/write MFC object members.
// JS uses ptr[offset] which does NOT correctly dereference. Fixing requires
// implementing flat memory for dynamically allocated MFC objects.
// All in_ECX[0xNNN] patterns on MFC object pointers are affected.
// ═══════════════════════════════════════════════════════════════════


// s32, w32, w16 imported from mem.js above



// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced in this block.
// These are placeholders — in a full integration they would be
// imported from mem.js or from the appropriate block module.
// ═══════════════════════════════════════════════════════════════════


// Per-civ data block

// Per-city data block

// Game state

// Direction tables

// Pointer/string references (stubs)
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_00408130, FUN_004083b0, FUN_00408420, FUN_00408460 } from './block_00400000.js';
import { FUN_00408490, FUN_004085f0, FUN_00408650, FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10 } from './block_00400000.js';
import { FUN_0040ef70, FUN_0040efd0, FUN_0040f3e0, FUN_0040f570, FUN_0040f680, FUN_0040f880 } from './block_00400000.js';
import { FUN_0040fcf0, FUN_0040fd40, FUN_0040fe10, FUN_0040fe40, FUN_0040ff60 } from './block_00400000.js';
import { FUN_00414ca0, FUN_00419b80 } from './block_00410000.js';
import { FUN_00421c30, FUN_00421ea0, FUN_00428b0c } from './block_00420000.js';
import { FUN_0043c840, FUN_0043cab0, FUN_0043d07a, FUN_0043d20a, FUN_0043d289 } from './block_00430000.js';
import { FUN_0044263f, FUN_0044272d, FUN_00448f92, FUN_0044c5a0, FUN_0044c730, FUN_0044ca60 } from './block_00440000.js';
import { FUN_0044cba0 } from './block_00440000.js';
import { FUN_004502b0, FUN_004502e0, FUN_00450340, FUN_00450390, FUN_004503d0, FUN_00450400 } from './block_00450000.js';
import { FUN_00451830, FUN_00451860, FUN_004518d0, FUN_00451bf0, FUN_00452768, FUN_00452c14 } from './block_00450000.js';
import { FUN_00453da0, FUN_00453e18, FUN_00453e51 } from './block_00450000.js';
import { FUN_0046e020, FUN_0046e287, FUN_0046e6a9, FUN_0046e6c8 } from './block_00460000.js';
import { FUN_004a2020, FUN_004a2379, FUN_004a23fc, FUN_004a24b1, FUN_004a6cc5, FUN_004a6e39 } from './block_004A0000.js';
import { FUN_004a7577, FUN_004a75a6, FUN_004aef20, FUN_004af14b } from './block_004A0000.js';
import { FUN_004bfe5a } from './block_004B0000.js';
import { FUN_004c03ae } from './block_004C0000.js';
import { FUN_004e78ce, FUN_004eb4ed } from './block_004E0000.js';
import { FUN_004f4793, FUN_004f6244, FUN_004f6564, FUN_004f6646, FUN_004f7bd1, FUN_004f8a9b } from './block_004F0000.js';
import { FUN_0051d564 } from './block_00510000.js';
import { FUN_0055ae80, FUN_0055b046 } from './block_00550000.js';
import { FUN_00564713 } from './block_00560000.js';
import { FUN_00589ef8 } from './block_00580000.js';
import { FUN_00597d6f, FUN_00598ceb, FUN_00598d45, FUN_0059a791, FUN_0059d3b1, FUN_0059d3c9 } from './block_00590000.js';
import { FUN_0059d3e1, FUN_0059db08, FUN_0059df8a } from './block_00590000.js';
import { FUN_005a5f34, FUN_005a632a, FUN_005a99fc, FUN_005a9b5d, FUN_005adfa0, FUN_005ae006 } from './block_005A0000.js';
import { FUN_005ae1b0, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b2a39, FUN_005b2c3d, FUN_005b2c82, FUN_005b2e69, FUN_005b36df, FUN_005b4391 } from './block_005B0000.js';
import { FUN_005b4b66, FUN_005b4c63, FUN_005b50ad, FUN_005b53b6, FUN_005b6458, FUN_005b6787 } from './block_005B0000.js';
import { FUN_005b8a81, FUN_005b8d62, FUN_005b947f, FUN_005b94fc, FUN_005bb4ae, FUN_005bb574 } from './block_005B0000.js';
import { FUN_005bc3bf, FUN_005bcaa7, FUN_005bd120, FUN_005bd248, FUN_005bd630, FUN_005bd915 } from './block_005B0000.js';
import { FUN_005bf5e1 } from './block_005B0000.js';
import { FUN_005c0073, FUN_005c00ce, FUN_005c0593, FUN_005c0cc5, FUN_005c0f57, FUN_005c1020 } from './block_005C0000.js';
import { FUN_005c19ad, FUN_005c5fc4, FUN_005c61b0, FUN_005c62ee, FUN_005c64da, FUN_005c656b } from './block_005C0000.js';
import { FUN_005c65f9, FUN_005c6b63, FUN_005c6b93, FUN_005c6da8, FUN_005cd775, FUN_005cda06 } from './block_005C0000.js';
import { FUN_005cde4d, FUN_005cedad, FUN_005cef31 } from './block_005C0000.js';
import { FUN_005d7c00, FUN_005d7c6e, FUN_005d8270, FUN_005d8622, FUN_005d881c, FUN_005d898e } from './block_005D0000.js';
import { FUN_005dcdf9, FUN_005dce29, FUN_005dce4f, FUN_005dce96, FUN_005dd010, FUN_005dd1a0 } from './block_005D0000.js';
import { FUN_005dd2e3, FUN_005dd377, FUN_005dd3f1, FUN_005dd45d, FUN_005dd4c2, FUN_005dd561 } from './block_005D0000.js';
import { FUN_005dd761, FUN_005dea9e } from './block_005D0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

let PTR_DAT_0062c9e0 = new Array(16).fill(null);
let PTR_FUN_0061d6c0 = 0;
let PTR_DAT_00637e60 = 0;


// ═══════════════════════════════════════════════════════════════════
// FUN_004904c0 — splitter_draw_wrapper
// Source: block_00490000.c @ 0x004904C0, 42 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004904c0(param_1, param_2, param_3, param_4) {
  FUN_0051d564(param_1, param_2, 0, param_3, param_4);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00490500 — ui_draw_wrapper_a
// Source: block_00490000.c @ 0x00490500, 38 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00490500(param_1, param_2, param_3) {
  FUN_004a6cc5(param_1, param_2, 0, param_3);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00490530 — ui_draw_wrapper_b
// Source: block_00490000.c @ 0x00490530, 38 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00490530(param_1, param_2, param_3) {
  FUN_004a6e39(param_1, param_2, 0, param_3);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// IsTracking — CSplitterWnd::IsTracking (library function)
// Source: block_00490000.c @ 0x00490560, 31 bytes
// ═══════════════════════════════════════════════════════════════════
export function IsTracking(thisPtr) {
  // return *(int *)(this + 0x159c);
  return 0; // UI library stub
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00490590 — science_advisor_init
// Source: block_00490000.c @ 0x00490590, 365 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00490590(in_ECX) {
  let local_8;

  if (in_ECX[0x120] < 0 || in_ECX[0xdcc] <= in_ECX[0x120]) {
    in_ECX[0x120] = 0;
  }
  in_ECX[0x1b34] = in_ECX[0xdcc];
  in_ECX[0x1f38] = in_ECX[0x120];
  in_ECX[0x1f3c] = in_ECX[0x120];
  while (G.DAT_006a85a4 % 9 !== 0) {
    in_ECX[0x1f3c] = in_ECX[0x1f3c] + -1;
  }
  for (local_8 = 0; local_8 < in_ECX[0xdcc]; local_8 = local_8 + 1) {
    in_ECX[0x1b38 + local_8 * 4] = in_ECX[0xe54 + local_8 * 4];
  }
  FUN_0040fd40(0, (in_ECX[0x1b34] / 9) | 0);
  FUN_0040fcf0((in_ECX[0x1f3c] / 9) | 0);
  if (in_ECX[0x1b34] < 1) {
    in_ECX[0x1f3c] = 0xffffffff;
  }
  FUN_00451bf0();
  FUN_004923c0();
  FUN_004518d0();
  FUN_004f6646();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004906fd — science_advisor_draw (UI rendering)
// Source: decompiled/block_00490000.c FUN_004906fd (5411 bytes)
// ═══════════════════════════════════════════════════════════════════
export function FUN_004906fd() {
  // DEVIATION: Win32 — entire function is UI rendering (science advisor dialog).
  // Draws tech tree info, government stats, research progress icons.
  // All calls are Win32 GDI/MFC drawing primitives (SetRect, sprintf, text output,
  // bitmap blitting) operating on dialog device contexts. No game state mutations.
  //
  // C body: 457 lines of Win32 drawing calls including:
  //   FUN_005c00ce, FUN_005c0073, thunk_FUN_00451bf0, thunk_FUN_004f6564,
  //   thunk_FUN_00407f90, thunk_FUN_00407fc0, thunk_FUN_0040ef70,
  //   FUN_005cda06, FUN_005cd775, thunk_FUN_00451860, thunk_FUN_00451830,
  //   FUN_005cef31, FUN_005c0f57, thunk_FUN_0040efd0, FUN_005c19ad,
  //   thunk_FUN_0040bbb0, thunk_FUN_0040bc10, thunk_FUN_0040fe40,
  //   thunk_FUN_0040bbe0, thunk_FUN_0040fe10, FUN_005f22d0, FUN_005f22e0,
  //   thunk_FUN_00452c14, thunk_FUN_00452768, thunk_FUN_00408490,
  //   thunk_FUN_00491d61, thunk_FUN_004f8a9b, thunk_FUN_00428b0c,
  //   thunk_FUN_004aef20, SetRect, _sprintf, _Timevec::~_Timevec
  // Reads: G.DAT_0067a798, G.DAT_0062d858, G.DAT_006a6668, G.DAT_00635a1c,
  //   G.DAT_006a7d58, G.DAT_00679640, G.DAT_00628420, G.DAT_00627cc8-G.DAT_00627cd2,
  //   G.DAT_0062c944-G.DAT_0062c980
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00491c20 — science_advisor_select_tech
// Source: block_00490000.c @ 0x00491C20, 321 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00491c20(param_1, in_ECX) {
  let uVar1;
  let local_8;

  if (G.DAT_006a677c !== 0) {
    for (local_8 = 0;
      (local_8 < in_ECX[0xdcc] && (in_ECX[0xe54 + local_8 * 4] !== param_1));
      local_8 = local_8 + 1) {
    }
    if (in_ECX[0xdcc] !== local_8) {
      FUN_004f7bd1(5, 1);
      in_ECX[0x120] = local_8;
      in_ECX[0x1f38] = local_8;
      in_ECX[0x124] = 1;
      in_ECX[0x11c] = 1;
      FUN_004f4793();
      FUN_00451bf0();
      uVar1 = FUN_004f8a9b(G.DAT_006a7d58, local_8);
      FUN_005f22d0(in_ECX + 0x618, uVar1);
      FUN_004f6244();
      FUN_004906fd();
      FUN_00408460();
      FUN_004518d0();
      // CPropertySheet::EnableStackedTabs — UI stub
      FUN_005c61b0();
      // CPropertySheet::EnableStackedTabs — UI stub
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00491d61 — find_tech_index_in_list
// Source: block_00490000.c @ 0x00491D61, 86 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00491d61(param_1) {
  let local_8;

  local_8 = 0;
  while (true) {
    if (G.DAT_006a7434 <= local_8) {
      return -1;
    }
    if (G.DAT_006a74bc[local_8] === param_1) break;
    local_8 = local_8 + 1;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004923c0 — invalidate_window
// Source: block_00490000.c @ 0x004923C0, 37 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004923c0(in_ECX) {
  FUN_005bd120(in_ECX ? in_ECX[8] : 0);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004923f0 — chat_macro_command_handler
// Source: block_00490000.c @ 0x004923F0, 849 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004923f0(param_1, param_2) {
  let bVar1;
  let iVar2;
  let uVar3;
  let sVar4;
  let local_14;

  FUN_0040bbb0();
  local_14 = 0;
  if (((G.DAT_00655c16 === -1) && (iVar2 = FUN_00453e51(G.DAT_006d1da0, 9), iVar2 === 0)) &&
    (G.DAT_00655b07 === 0)) {
    bVar1 = false;
  } else {
    bVar1 = true;
  }

  // goto-based switch restructured with labeled block
  let doDefault = false;
  switch_block: {
    switch (param_2) {
      case 0x2b0:
        while (((((iVar2 = G.DAT_0062c990, local_14 < 8 && (G.DAT_006d1da0 !== G.DAT_0062c990)) && (!bVar1)) &&
          ((G.DAT_00654c7a === 0 || ((1 << (u8(G.DAT_0062c990) & 0x1f) & G.DAT_00655b0b) === 0)))) &&
          ((G.DAT_0064c6c0[G.DAT_006d1da0 * 4 + G.DAT_0062c990 * 0x594] & 1) === 0))) {
          local_14 = local_14 + 1;
          G.DAT_0062c990 = G.DAT_0062c990 + 1;
          if (G.DAT_0062c990 === 8) {
            G.DAT_0062c990 = 1;
          }
        }
        if (local_14 === 8) {
          return;
        }
        G.DAT_0062c990 = G.DAT_0062c990 + 1;
        uVar3 = FUN_00493d13(iVar2);
        FUN_0040bbe0(uVar3);
        FUN_0040fe10();
        if (G.DAT_0062c990 === 8) {
          G.DAT_0062c990 = 1;
        }
        doDefault = true;
        break;
      case 0x2b1:
        while ((((local_14 < 8 && (G.DAT_006d1da0 !== G.DAT_0062c994)) &&
          ((!bVar1 &&
            ((G.DAT_00654c7a === 0 || ((1 << (u8(G.DAT_0062c994) & 0x1f) & G.DAT_00655b0b) === 0)))
          ))) && ((G.DAT_0064c6c0[G.DAT_006d1da0 * 4 + G.DAT_0062c994 * 0x594] & 1) === 0))) {
          local_14 = local_14 + 1;
          G.DAT_0062c994 = G.DAT_0062c994 + 1;
          if (G.DAT_0062c994 === 8) {
            G.DAT_0062c994 = 1;
          }
        }
        if (local_14 === 8) {
          return;
        }
        uVar3 = FUN_00493ba6(G.DAT_0062c994);
        FUN_0040bbe0(uVar3);
        FUN_0040fe10();
        iVar2 = G.DAT_0062c994;
        G.DAT_0062c994 = G.DAT_0062c994 + 1;
        uVar3 = FUN_00493b10(iVar2);
        FUN_0040bbe0(uVar3);
        FUN_0040fe10();
        if (G.DAT_0062c994 === 8) {
          G.DAT_0062c994 = 1;
        }
        doDefault = true;
        break;
      case 0x2b2:
        FUN_0049275a("chatmac1.txt", G.DAT_0062c998);
        iVar2 = G.DAT_0062c998;
        break switch_block;
      case 0x2b3:
        FUN_0049275a("chatmac2.txt", G.DAT_0062c99c);
        iVar2 = G.DAT_0062c99c;
        break switch_block;
      case 0x2b4:
        FUN_0049275a("chatmac3.txt", G.DAT_0062c9a0);
        iVar2 = G.DAT_0062c9a0;
        break switch_block;
      default:
        doDefault = true;
        break;
    }
  }
  if (!doDefault) {
    if (iVar2 === 0) {
      return;
    }
  }
  // switchD_004926f8_default:
  FUN_00492ae0(G.DAT_00679640);
  iVar2 = FUN_00492ab0();
  sVar4 = _strlen(G.DAT_00679640);
  FUN_00492b20(iVar2 - sVar4, iVar2);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0049275a — load_chat_macro_file
// Source: block_00490000.c @ 0x0049275A, 270 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_0049275a(param_1, param_2) {
  let iVar1;
  let sVar2;

  FUN_005d7c00();
  iVar1 = Realloc_a(param_1);
  if (iVar1 === 0) {
    param_2[0] = 0;
    FUN_00492868();
    FUN_0049287e();
    return;
  }
  iVar1 = FUN_00492a80();
  if (iVar1 <= param_2[0]) {
    param_2[0] = 0;
  }
  iVar1 = Realloc_a(param_2[0]);
  if (iVar1 === 0) {
    param_2[0] = 0;
    FUN_00421c30();
    FUN_00492868();
    FUN_0049287e();
    return;
  }
  FUN_00492a40(G.DAT_00679640, 0x100);
  FUN_00421c30();
  sVar2 = _strlen(G.DAT_00679640);
  param_2[0] = param_2[0] + sVar2 + 2;
  FUN_00492868();
  FUN_0049287e();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492868 — cleanup_chat_macro_file
// Source: block_00490000.c @ 0x00492868, 12 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492868() {
  FUN_005d7c6e();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0049287e — restore_seh_frame
// Source: block_00490000.c @ 0x0049287E, 14 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_0049287e() {
  // SEH frame restore — no-op in JS
  return;
}


// ═══════════════════════════════════════════════════════════════════
// Realloc_a — CHtmlStream/CMemFile::Realloc (at 0x004929C0)
// Source: block_00490000.c @ 0x004929C0, 40 bytes
// ═══════════════════════════════════════════════════════════════════
export function Realloc_a(param_1) {
  FUN_005d8270(param_1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// Realloc_b — CHtmlStream/CMemFile::Realloc (at 0x00492A00)
// Source: block_00490000.c @ 0x00492A00, 40 bytes
// ═══════════════════════════════════════════════════════════════════
export function Realloc_b() {
  FUN_005d8622();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492a40 — read_line_from_stream
// Source: block_00490000.c @ 0x00492A40, 44 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492a40() {
  FUN_005d881c();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492a80 — get_stream_line_count
// Source: block_00490000.c @ 0x00492A80, 34 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492a80() {
  FUN_005d898e();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492ab0 — send_get_text_length
// Source: block_00490000.c @ 0x00492AB0, 37 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492ab0(in_ECX) {
  send_msg_2F47(in_ECX ? in_ECX[0x1c] : 0);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492ae0 — send_set_text
// Source: block_00490000.c @ 0x00492AE0, 43 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492ae0(param_1, in_ECX) {
  send_msg_3035(in_ECX ? in_ECX[0x1c] : 0, param_1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492b20 — send_select_text
// Source: block_00490000.c @ 0x00492B20, 47 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492b20(param_1, param_2, in_ECX) {
  send_msg_2DC6(in_ECX ? in_ECX[0x1c] : 0, param_1, param_2);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492b60 — negate_diplomacy_attitude
// Source: block_00490000.c @ 0x00492B60, 181 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492b60(param_1, param_2) {
  let cVar1;

  if (s8(G.DAT_0064cab9[param_2 * 6 + param_1 * 0x594]) < 1) {
    cVar1 = (~s8(G.DAT_0064cab9[param_2 * 6 + param_1 * 0x594]) + 1) & 0xFF;
  } else {
    cVar1 = G.DAT_0064cab9[param_2 * 6 + param_1 * 0x594];
  }
  G.DAT_0064cab9[param_2 * 6 + param_1 * 0x594] = u8(-cVar1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492c15 — clear_diplomacy_entries_in_range
// Source: block_00490000.c @ 0x00492C15, 259 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492c15(param_1, param_2, param_3, param_4, param_5) {
  let iVar1;
  let local_c;

  for (local_c = 0; local_c < 0x10; local_c = local_c + 1) {
    if (G.DAT_0064cbd8[param_1 * 0x594 + local_c * 6] === u8(param_2)) {
      iVar1 = FUN_005ae31d(param_3, param_4,
        s16(G.DAT_0064cbd4, param_1 * 0x594 + local_c * 6),
        s16(G.DAT_0064cbd6, param_1 * 0x594 + local_c * 6));
      if (iVar1 <= param_5) {
        G.DAT_0064cbd8[param_1 * 0x594 + local_c * 6] = 0xff;
        G.DAT_0064cbd9[param_1 * 0x594 + local_c * 6] = 0;
      }
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492d18 — shift_diplomacy_entries_down (recursive)
// Source: block_00490000.c @ 0x00492D18, 184 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492d18(param_1, param_2) {
  let iVar1;
  let iVar2;

  if ((param_2 < 0x2f) && (G.DAT_0064cab8[param_2 * 6 + param_1 * 0x594] !== 0xFF)) {
    FUN_00492d18(param_1, param_2 + 1);
    iVar1 = param_1 * 0x594 + param_2 * 6;
    iVar2 = param_1 * 0x594 + (param_2 * 3 + 3) * 2;
    // Copy 4 bytes + 2 bytes
    G.DAT_0064cab4[iVar2] = G.DAT_0064cab4[iVar1];
    G.DAT_0064cab4[iVar2 + 1] = G.DAT_0064cab4[iVar1 + 1];
    G.DAT_0064cab4[iVar2 + 2] = G.DAT_0064cab4[iVar1 + 2];
    G.DAT_0064cab4[iVar2 + 3] = G.DAT_0064cab4[iVar1 + 3];
    G.DAT_0064cab8[iVar2] = G.DAT_0064cab8[iVar1];
    G.DAT_0064cab8[iVar2 + 1] = G.DAT_0064cab8[iVar1 + 1];
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492dd0 — shift_diplomacy_entries_up
// Source: block_00490000.c @ 0x00492DD0, 144 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492dd0(param_1, param_2) {
  let iVar1;
  let iVar2;
  let local_8;

  for (local_8 = 0xe; param_2 <= local_8; local_8 = local_8 + -1) {
    iVar1 = param_1 * 0x594 + local_8 * 6;
    iVar2 = param_1 * 0x594 + (local_8 * 3 + 3) * 2;
    G.DAT_0064cbd4[iVar2] = G.DAT_0064cbd4[iVar1];
    G.DAT_0064cbd4[iVar2 + 1] = G.DAT_0064cbd4[iVar1 + 1];
    G.DAT_0064cbd4[iVar2 + 2] = G.DAT_0064cbd4[iVar1 + 2];
    G.DAT_0064cbd4[iVar2 + 3] = G.DAT_0064cbd4[iVar1 + 3];
    G.DAT_0064cbd8[iVar2] = G.DAT_0064cbd8[iVar1];
    G.DAT_0064cbd8[iVar2 + 1] = G.DAT_0064cbd8[iVar1 + 1];
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00492e60 — get_max_diplomacy_attitude
// Source: block_00490000.c @ 0x00492E60, 443 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00492e60(param_1, param_2, param_3, param_4) {
  let local_10;
  let local_c;
  let local_8;

  local_c = 0;
  for (local_8 = 0; local_8 < 0x30; local_8 = local_8 + 1) {
    if (((s16(G.DAT_0064cab4, param_1 * 0x594 + local_8 * 6) === param_2) &&
      (s16(G.DAT_0064cab6, param_1 * 0x594 + local_8 * 6) === param_3)) &&
      (G.DAT_0064cab8[param_1 * 0x594 + local_8 * 6] === u8(param_4))) {
      if (s8(G.DAT_0064cab9[param_1 * 0x594 + local_8 * 6]) < 1) {
        local_10 = ~s8(G.DAT_0064cab9[param_1 * 0x594 + local_8 * 6]) + 1;
      } else {
        local_10 = s8(G.DAT_0064cab9[param_1 * 0x594 + local_8 * 6]);
      }
      if (s8(local_c) <= local_10) {
        if (s8(G.DAT_0064cab9[param_1 * 0x594 + local_8 * 6]) < 1) {
          local_c = ~s8(G.DAT_0064cab9[param_1 * 0x594 + local_8 * 6]) + 1;
        } else {
          local_c = s8(G.DAT_0064cab9[param_1 * 0x594 + local_8 * 6]);
        }
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0049301b — add_or_update_diplomacy_entry
// Source: block_00490000.c @ 0x0049301B, 958 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_0049301b(param_1, param_2, param_3, param_4, param_5) {
  let iVar1;
  let iVar2;
  let local_10;
  let local_c;

  local_c = 0;
  while (true) {
    if (0x2f < local_c) {
      if (((G.DAT_00655b05 === param_1) && ((1 << (u8(param_1) & 0x1f) & G.DAT_00655b0b) === 0)) &&
        ((param_4 === 2 || (param_4 === 3)))) {
        for (local_10 = 0; local_10 < G.DAT_00655b16; local_10 = local_10 + 1) {
          if (((G.DAT_0065610a[local_10 * 0x20] !== 0) &&
            (s8(G.DAT_006560f7[local_10 * 0x20]) === param_1)) &&
            ((iVar1 = FUN_005b6458(local_10), iVar1 !== 0 &&
              (s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[local_10 * 0x20]) * 0x14]) === param_4)))) {
            iVar1 = FUN_005b8a81(s16(G.DAT_006560f0, local_10 * 0x20),
              s16(G.DAT_006560f2, local_10 * 0x20));
            iVar2 = FUN_005b8a81(param_2, param_3);
            if (iVar1 === iVar2) {
              iVar1 = FUN_005ae31d(param_2, param_3,
                s16(G.DAT_006560f0, local_10 * 0x20),
                s16(G.DAT_006560f2, local_10 * 0x20));
              iVar2 = FUN_005b2c3d(local_10);
              if (iVar1 * 2 <= iVar2) {
                G.DAT_006560ff[local_10 * 0x20] = 0xb;
                // Write int16 at offset
                G.DAT_00656102[local_10 * 0x20] = param_2 & 0xFF;
                G.DAT_00656102[local_10 * 0x20 + 1] = (param_2 >> 8) & 0xFF;
                G.DAT_00656104[local_10 * 0x20] = param_3 & 0xFF;
                G.DAT_00656104[local_10 * 0x20 + 1] = (param_3 >> 8) & 0xFF;
              }
            }
          }
        }
      }
      local_c = 0;
      while (true) {
        if (0x2f < local_c) {
          return;
        }
        if ((s8(G.DAT_0064cab9[local_c * 6 + param_1 * 0x594]) < param_5) ||
          (G.DAT_0064cab8[local_c * 6 + param_1 * 0x594] === 0xFF)) break;
        local_c = local_c + 1;
      }
      FUN_00492d18(param_1, local_c);
      // Write int16 at cab4
      G.DAT_0064cab4[local_c * 6 + param_1 * 0x594] = param_2 & 0xFF;
      G.DAT_0064cab4[local_c * 6 + param_1 * 0x594 + 1] = (param_2 >> 8) & 0xFF;
      G.DAT_0064cab6[local_c * 6 + param_1 * 0x594] = param_3 & 0xFF;
      G.DAT_0064cab6[local_c * 6 + param_1 * 0x594 + 1] = (param_3 >> 8) & 0xFF;
      G.DAT_0064cab8[local_c * 6 + param_1 * 0x594] = u8(param_4);
      G.DAT_0064cab9[local_c * 6 + param_1 * 0x594] = u8(param_5);
      return;
    }
    if ((((s16(G.DAT_0064cab4, local_c * 6 + param_1 * 0x594) === param_2) &&
      (s16(G.DAT_0064cab6, local_c * 6 + param_1 * 0x594) === param_3)) &&
      (G.DAT_0064cab8[local_c * 6 + param_1 * 0x594] === u8(param_4))) &&
      (param_5 <= s8(G.DAT_0064cab9[local_c * 6 + param_1 * 0x594]))) break;
    local_c = local_c + 1;
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004933f2 — add_or_update_intelligence_entry
// Source: block_00490000.c @ 0x004933F2, 518 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004933f2(param_1, param_2, param_3, param_4, param_5) {
  let local_8;

  local_8 = 0;
  while (true) {
    if (0xf < local_8) {
      local_8 = 0;
      while (true) {
        if (0xf < local_8) {
          return;
        }
        if ((s8(G.DAT_0064cbd9[param_1 * 0x594 + local_8 * 6]) < param_5) ||
          (G.DAT_0064cbd8[param_1 * 0x594 + local_8 * 6] === 0xFF)) break;
        local_8 = local_8 + 1;
      }
      FUN_00492dd0(param_1, local_8);
      G.DAT_0064cbd4[param_1 * 0x594 + local_8 * 6] = param_2 & 0xFF;
      G.DAT_0064cbd4[param_1 * 0x594 + local_8 * 6 + 1] = (param_2 >> 8) & 0xFF;
      G.DAT_0064cbd6[param_1 * 0x594 + local_8 * 6] = param_3 & 0xFF;
      G.DAT_0064cbd6[param_1 * 0x594 + local_8 * 6 + 1] = (param_3 >> 8) & 0xFF;
      G.DAT_0064cbd8[param_1 * 0x594 + local_8 * 6] = u8(param_4);
      G.DAT_0064cbd9[param_1 * 0x594 + local_8 * 6] = u8(param_5);
      return;
    }
    if ((((s16(G.DAT_0064cbd4, param_1 * 0x594 + local_8 * 6) === param_2) &&
      (s16(G.DAT_0064cbd6, param_1 * 0x594 + local_8 * 6) === param_3)) &&
      (G.DAT_0064cbd8[param_1 * 0x594 + local_8 * 6] === u8(param_4))) &&
      (param_5 <= s8(G.DAT_0064cbd9[param_1 * 0x594 + local_8 * 6]))) break;
    local_8 = local_8 + 1;
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493602 — process_diplomacy_turn
// Source: block_00490000.c @ 0x00493602, 365 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493602(param_1) {
  let local_8;

  for (local_8 = 0; local_8 < 0x30; local_8 = local_8 + 1) {
    if (s8(G.DAT_0064cab9[local_8 * 6 + param_1 * 0x594]) < 0) {
      G.DAT_0064cab8[local_8 * 6 + param_1 * 0x594] = 0xff;
    }
    FUN_00492b60(param_1, local_8);
  }
  for (local_8 = 0; local_8 < 0x10; local_8 = local_8 + 1) {
    if (-1 < s8(G.DAT_0064cbd8[local_8 * 6 + param_1 * 0x594])) {
      FUN_0049301b(param_1, s16(G.DAT_0064cbd4, local_8 * 6 + param_1 * 0x594),
        s16(G.DAT_0064cbd6, local_8 * 6 + param_1 * 0x594),
        s8(G.DAT_0064cbd8[local_8 * 6 + param_1 * 0x594]),
        s8(G.DAT_0064cbd9[local_8 * 6 + param_1 * 0x594]));
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0049376f — clear_intelligence_entries
// Source: block_00490000.c @ 0x0049376F, 115 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_0049376f(param_1) {
  let local_8;

  for (local_8 = 0; local_8 < 0x10; local_8 = local_8 + 1) {
    G.DAT_0064cbd8[param_1 * 0x594 + local_8 * 6] = 0xff;
    G.DAT_0064cbd9[param_1 * 0x594 + local_8 * 6] = 0;
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493b10 — get_civ_title_string
// Source: block_00490000.c @ 0x00493B10, 145 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493b10(param_1) {
  let puVar1;

  if (param_1 < 1) {
    puVar1 = FUN_00428b0c(G.DAT_00628420 + 0x44);
  } else if (s16(G.DAT_00655502, s16(G.DAT_0064c6a6, param_1 * 0x594) * 0x30) < 0) {
    puVar1 = G.DAT_0064bcfa[param_1 * 0xf2];
  } else {
    puVar1 = FUN_00428b0c(s16(G.DAT_00655502, s16(G.DAT_0064c6a6, param_1 * 0x594) * 0x30));
  }
  return puVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493ba6 — get_civ_adjective_string
// Source: block_00490000.c @ 0x00493BA6, 210 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493ba6(param_1) {
  let puVar1;

  if (param_1 < 1) {
    puVar1 = FUN_00428b0c(G.DAT_00654ff0);
  } else {
    const govIdx = s16(G.DAT_0064c6a6, param_1 * 0x594);
    const civEra = u8(G.DAT_0064c6b5[param_1 * 0x594]);
    const govEpochOff = u8(G.DAT_006554fc[govIdx * 0x30]);
    const shortVal = s16(G.DAT_0065550c, govIdx * 0x30 + govEpochOff * 2 + civEra * 4);
    if (shortVal < 0) {
      puVar1 = G.DAT_0064bd42[civEra * 0x18 + param_1 * 0xf2];
    } else {
      puVar1 = FUN_00428b0c(shortVal);
    }
  }
  return puVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493c7d — get_civ_noun_string
// Source: block_00490000.c @ 0x00493C7D, 145 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493c7d(param_1) {
  let puVar1;

  if (param_1 < 1) {
    puVar1 = FUN_00428b0c(G.DAT_00628420 + 0x3c);
  } else if (s16(G.DAT_00655504, s16(G.DAT_0064c6a6, param_1 * 0x594) * 0x30) < 0) {
    puVar1 = G.DAT_0064bd12[param_1 * 0xf2];
  } else {
    puVar1 = FUN_00428b0c(s16(G.DAT_00655504, s16(G.DAT_0064c6a6, param_1 * 0x594) * 0x30));
  }
  return puVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493d13 — get_leader_name_string
// Source: block_00490000.c @ 0x00493D13, 145 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493d13(param_1) {
  let puVar1;

  if (param_1 < 1) {
    puVar1 = FUN_00428b0c(G.DAT_00628420 + 0x40);
  } else if (s16(G.DAT_00655506, s16(G.DAT_0064c6a6, param_1 * 0x594) * 0x30) < 0) {
    puVar1 = G.DAT_0064bd2a[param_1 * 0xf2];
  } else {
    puVar1 = FUN_00428b0c(s16(G.DAT_00655506, s16(G.DAT_0064c6a6, param_1 * 0x594) * 0x30));
  }
  return puVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493e50 — play_throne_animation
// Source: block_00490000.c @ 0x00493E50, 51 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493e50() {
  if (G.DAT_0062ca38 !== 0) {
    FUN_0046e020(G.DAT_0062ca48, 1, 1, 0);
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493e83 — open_throne_room_dialog
// Source: block_00490000.c @ 0x00493E83, 104 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493e83() {
  let iVar1;

  FUN_0049621d();
  iVar1 = FUN_00496402();
  if (iVar1 !== 0) {
    FUN_004965ff();
  }
  FUN_00493eeb();
  FUN_00493f01();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493eeb — destroy_command_line_info
// Source: block_00490000.c @ 0x00493EEB, 12 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493eeb() {
  // CCommandLineInfo::~CCommandLineInfo — UI stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493f01 — restore_seh_frame_2
// Source: block_00490000.c @ 0x00493F01, 14 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493f01() {
  // SEH frame restore — no-op in JS
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00493f0f — init_throne_room
// Source: block_00490000.c @ 0x00493F0F, 546 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00493f0f(param_1, param_2) {
  let iVar2;
  let local_2c;
  let local_28;
  let local_24;
  let local_14;

  G.DAT_0062ca38 = 0;
  G.DAT_0062ca44 = ((G.DAT_006d1168 + param_2 & 7) + 0x53) >>> 0;
  if (s16(G.DAT_0064c6a6, param_2 * 0x594) < 1) {
    local_28 = ~s16(G.DAT_0064c6a6, param_2 * 0x594) + 1;
  } else {
    local_28 = s16(G.DAT_0064c6a6, param_2 * 0x594);
  }
  G.DAT_0062ca48 = u8(G.DAT_0061d1e8[local_28]) * 4 + 0x70;
  for (local_14 = 0; local_14 < 3; local_14 = local_14 + 1) {
    G.DAT_0062ca50[local_14] = G.DAT_0062ca48 + local_14 + 1;
  }
  FUN_0046e6a9();
  if (G.DAT_0062ca34 !== 0) {
    if (G.DAT_0062ca34 !== 0) {
      FUN_00497bf0(1);
    }
    G.DAT_0062ca34 = 0;
  }
  // operator_new(0x108c) — allocate throne room object
  local_24 = FUN_004942a3();
  G.DAT_0062ca34 = local_24;
  if (((local_24 !== 0) && ((G.DAT_00655aea[2] & 4) !== 0)) &&
    (iVar2 = init_tile(param_1, param_2), iVar2 !== 0)) {
    G.DAT_0062ca38 = 1;
    if (G.DAT_0062ca34 === -200) {
      local_2c = 0;
    } else {
      local_2c = G.DAT_0062ca34 + 0x110;
    }
    FUN_0059d3c9(local_2c);
    FUN_0059d3b1(G.DAT_0062ca34 + 0x224);
    FUN_00494704();
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00494148 — close_throne_room
// Source: block_00490000.c @ 0x00494148, 166 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00494148() {
  if (G.DAT_0062ca38 !== 0) {
    G.DAT_0062ca38 = 0;
    if (G.DAT_0062ca34 !== 0) {
      FUN_004947f0();
      if (G.DAT_0062ca34 !== 0) {
        FUN_00497bf0(1);
      }
      G.DAT_0062ca34 = 0;
    }
    G.DAT_0062ca44 = 0;
    FUN_0046e287(0x1e);
    FUN_0046e020(-G.DAT_0062ca48, 0, 0, 0);
    FUN_0046e6c8();
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004941ee — throne_room_set_improvement_type
// Source: block_00490000.c @ 0x004941EE, 181 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004941ee(param_1) {
  if ((((G.DAT_0062ca40 !== 0) && (G.DAT_0062ca34 !== 0)) &&
    ((param_1 === 2 || ((param_1 === 3 || (param_1 === 4)))))) &&
    ((G.DAT_0061d2b0[u8(G.DAT_0062ca34 + 0x1084) * 0x28] <
      G.DAT_0062ca34 + 0x1074 &&
      (G.DAT_0062ca34 + 0x1074 <
        G.DAT_0061d2b4[u8(G.DAT_0062ca34 + 0x1084) * 0x28])))) {
    // C: *(undefined1 *)(G.DAT_0062ca34 + 0x1088) = (undefined1)param_1;
    if (G.DAT_0062ca34) { G.DAT_0062ca34[0x1088] = param_1 & 0xFF; }
    FUN_00496125();
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004942a3 — construct_throne_room_object
// Source: block_00490000.c @ 0x004942A3, 200 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004942a3(in_ECX) {
  // MFC object construction — UI stub
  return in_ECX || 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004943c9 — destruct_throne_room_object
// Source: block_00490000.c @ 0x004943C9, 134 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004943c9() {
  G.DAT_0062ca40 = 0;
  FUN_0049444f();
  FUN_0049445e();
  FUN_0049446d();
  FUN_0049447c();
  FUN_0049448b();
  FUN_0049449a();
  FUN_004944ad();
  return;
}

// Source: decompiled/block_00490000.c FUN_0049444f (15 bytes)
export function FUN_0049444f() {
  // DEVIATION: MFC — calls FUN_005dd1a0 (MFC cleanup)
  // FUN_005dd1a0();
  return;
}
// Source: decompiled/block_00490000.c FUN_0049445e (15 bytes)
export function FUN_0049445e() {
  // DEVIATION: C++ destructor — _Timevec::~_Timevec on dialog member
  // _Timevec::~_Timevec((_Timevec *)(*(int *)(unaff_EBP + -0x10) + 0x658));
  return;
}
// Source: decompiled/block_00490000.c FUN_0049446d (15 bytes)
export function FUN_0049446d() {
  // DEVIATION: MFC — calls FUN_005c656b (MFC cleanup)
  // FUN_005c656b();
  return;
}
// Source: decompiled/block_00490000.c FUN_0049447c (15 bytes)
export function FUN_0049447c() {
  // DEVIATION: MFC — calls FUN_005bd915 (MFC cleanup)
  // FUN_005bd915();
  return;
}
// Source: decompiled/block_00490000.c FUN_0049448b (15 bytes)
export function FUN_0049448b() {
  // DEVIATION: MFC — calls thunk_FUN_0044cba0 (MFC cleanup)
  // FUN_0044cba0();
  return;
}
// Source: decompiled/block_00490000.c FUN_0049449a (19 bytes)
export function FUN_0049449a() {
  // DEVIATION: MFC — calls thunk_FUN_0044ca60 (MFC cleanup)
  // FUN_0044ca60();
  return;
}
// Source: decompiled/block_00490000.c FUN_004944ad (14 bytes)
export function FUN_004944ad() {
  // DEVIATION: Win32 — SEH epilog
  // *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// init_tile — load throne room tile assets
// Source: block_00490000.c @ 0x004944BB, 585 bytes
// ═══════════════════════════════════════════════════════════════════
export function init_tile(param_1, param_2) {
  // Complex UI initialization that loads DLL resources for the
  // throne room. Multiple MessageBoxA calls on failure.
  // Returns 1 on success, 0 on failure.
  // Stub: UI only
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00494704 — setup_throne_room_display
// Source: block_00490000.c @ 0x00494704, 236 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00494704() {
  // UI setup for throne room display
  G.DAT_0062ca3c = 0;
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004947f0 — teardown_throne_room_display
// Source: block_00490000.c @ 0x004947F0, 158 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004947f0() {
  // UI teardown stub
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0049488e — init_throne_tile_art
// Source: block_00490000.c @ 0x0049488E, 88 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_0049488e() {
  // UI art init stub
  return true;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_004948e6 — init_throne_background
// Source: block_00490000.c @ 0x004948E6, 99 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004948e6() {
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00494949 — init_throne_main_art
// Source: block_00490000.c @ 0x00494949, 497 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00494949() {
  // UI art loading — stub
  return;
}

// Source: decompiled/block_00490000.c FUN_00494b3a (22 bytes)
export function FUN_00494b3a() {
  // DEVIATION: MFC — calls FUN_005c656b (MFC cleanup)
  // FUN_005c656b();
  return;
}
// Source: decompiled/block_00490000.c FUN_00494b50 (15 bytes)
export function FUN_00494b50() {
  // DEVIATION: Win32 — SEH epilog
  // *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00494b5f — init_throne_military_art
// Source: block_00490000.c @ 0x00494B5F, 530 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00494b5f() {
  // UI art loading — stub
  return;
}

// Source: decompiled/block_00490000.c FUN_00494d71 (12 bytes)
export function FUN_00494d71() {
  // DEVIATION: MFC — calls FUN_005bd915 (MFC cleanup)
  // FUN_005bd915();
  return;
}
// Source: decompiled/block_00490000.c FUN_00494d7d (12 bytes)
export function FUN_00494d7d() {
  // DEVIATION: MFC — calls FUN_005c656b (MFC cleanup)
  // FUN_005c656b();
  return;
}
// Source: decompiled/block_00490000.c FUN_00494d89 (22 bytes)
export function FUN_00494d89() {
  // DEVIATION: MFC — calls FUN_005cde4d (MFC cleanup)
  // FUN_005cde4d();
  return;
}
// Source: decompiled/block_00490000.c FUN_00494d9f (15 bytes)
export function FUN_00494d9f() {
  // DEVIATION: Win32 — SEH epilog
  // *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00494dae — count_tech_tree_depth (recursive)
// Source: block_00490000.c @ 0x00494DAE, 124 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00494dae(param_1) {
  let local_8;

  if (G.DAT_0062ca5c < 0x65) {
    for (local_8 = 0; local_8 < 2; local_8 = local_8 + 1) {
      if (s8(G.DAT_0062768e[param_1 * 0x10 + local_8]) > 0) {
        G.DAT_0062ca5c = G.DAT_0062ca5c + 1;
        FUN_00494dae(s8(G.DAT_0062768e[param_1 * 0x10 + local_8]));
      }
    }
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00494e2a — init_throne_science_display
// Source: block_00490000.c @ 0x00494E2A, 3512 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00494e2a() {
  // Very large UI function for science display in throne room.
  // Sorts techs by tree depth, renders names and icons.
  // Stub: UI only, no game state mutations.
  return;
}

// Source: decompiled/block_00490000.c FUN_00495be2 (12 bytes)
export function FUN_00495be2() {
  // DEVIATION: MFC — calls FUN_005bd915 (MFC cleanup)
  // FUN_005bd915();
  return;
}
// Source: decompiled/block_00490000.c FUN_00495bee (12 bytes)
export function FUN_00495bee() {
  // DEVIATION: MFC — calls FUN_005c656b (MFC cleanup)
  // FUN_005c656b();
  return;
}
// Source: decompiled/block_00490000.c FUN_00495bfa (22 bytes)
export function FUN_00495bfa() {
  // DEVIATION: MFC — calls _eh_vector_destructor_iterator_ (MFC cleanup)
  // _eh_vector_destructor_iterator_((void *)(unaff_EBP + -0x600), 0x3c, 5, FUN_005cde4d);
  return;
}
// Source: decompiled/block_00490000.c FUN_00495c10 (22 bytes)
export function FUN_00495c10() {
  // DEVIATION: MFC — calls thunk_FUN_0043c520 (MFC cleanup)
  // FUN_0043c520();
  return;
}
// Source: decompiled/block_00490000.c FUN_00495c26 (15 bytes)
export function FUN_00495c26() {
  // DEVIATION: Win32 — SEH epilog
  // *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00495c35 — init_throne_portrait
// Source: block_00490000.c @ 0x00495C35, 410 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00495c35() {
  // UI portrait loading — stub
  return;
}

// Source: decompiled/block_00490000.c FUN_00495dcf (12 bytes)
export function FUN_00495dcf() {
  // DEVIATION: MFC — calls FUN_005bd915 (MFC cleanup)
  // FUN_005bd915();
  return;
}
// Source: decompiled/block_00490000.c FUN_00495ddb (12 bytes)
export function FUN_00495ddb() {
  // DEVIATION: MFC — calls FUN_005c656b (MFC cleanup)
  // FUN_005c656b();
  return;
}
// Source: decompiled/block_00490000.c FUN_00495de7 (22 bytes)
export function FUN_00495de7() {
  // DEVIATION: MFC — calls FUN_005cde4d (MFC cleanup)
  // FUN_005cde4d();
  return;
}
// Source: decompiled/block_00490000.c FUN_00495dfd (15 bytes)
export function FUN_00495dfd() {
  // DEVIATION: Win32 — SEH epilog
  // *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00495e0c — init_throne_video
// Source: block_00490000.c @ 0x00495E0C, 756 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00495e0c() {
  // Video playback initialization — stub
  return 0;
}

// Source: decompiled/block_00490000.c FUN_00496100 (22 bytes)
export function FUN_00496100() {
  // DEVIATION: MFC — calls FUN_005c656b (MFC cleanup)
  // FUN_005c656b();
  return;
}
// Source: decompiled/block_00490000.c FUN_00496116 (15 bytes)
export function FUN_00496116() {
  // DEVIATION: Win32 — SEH epilog
  // *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00496125 — throne_room_play_improvement
// Source: block_00490000.c @ 0x00496125, 248 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00496125() {
  // Throne room improvement animation — UI stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0049621d — construct_throne_dialog
// Source: block_00490000.c @ 0x0049621D, 190 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_0049621d() {
  // MFC dialog construction — UI stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// ~CCommandLineInfo — destructor (library function)
// Source: block_00490000.c @ 0x0049632A, 123 bytes
// ═══════════════════════════════════════════════════════════════════
export function CCommandLineInfo_dtor() {
  // Library destructor — stub
  return;
}

// Source: decompiled/block_00490000.c FUN_004963a5 (15 bytes)
export function FUN_004963a5() {
  // DEVIATION: C++ destructor — _Timevec::~_Timevec on dialog member
  // _Timevec::~_Timevec((_Timevec *)(*(int *)(unaff_EBP + -0x10) + 0x1d4));
  return;
}
// Source: decompiled/block_00490000.c FUN_004963b4 (15 bytes)
export function FUN_004963b4() {
  // DEVIATION: MFC — calls thunk_FUN_0040f570 (MFC cleanup)
  // FUN_0040f570();
  return;
}
// Source: decompiled/block_00490000.c FUN_004963c3 (15 bytes)
export function FUN_004963c3() {
  // DEVIATION: MFC — calls thunk_FUN_0040f570 (MFC cleanup)
  // FUN_0040f570();
  return;
}
// Source: decompiled/block_00490000.c FUN_004963d2 (15 bytes)
export function FUN_004963d2() {
  // DEVIATION: MFC — calls FUN_005bd915 (MFC cleanup)
  // FUN_005bd915();
  return;
}
// Source: decompiled/block_00490000.c FUN_004963e1 (19 bytes)
export function FUN_004963e1() {
  // DEVIATION: MFC — calls thunk_FUN_0044cba0 (MFC cleanup)
  // FUN_0044cba0();
  return;
}
// Source: decompiled/block_00490000.c FUN_004963f4 (14 bytes)
export function FUN_004963f4() {
  // DEVIATION: Win32 — SEH epilog
  // *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00496402 — setup_throne_room_dialog
// Source: block_00490000.c @ 0x00496402, 177 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00496402() {
  // Dialog setup — UI stub
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004964b3 — setup_throne_room_buttons
// Source: block_00490000.c @ 0x004964B3, 332 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004964b3() {
  // Button layout — UI stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004965ff — finalize_throne_room
// Source: block_00490000.c @ 0x004965FF, 197 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004965ff() {
  // UI finalization — stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004966c4 — draw_throne_room_grid
// Source: block_00490000.c @ 0x004966C4, 1400 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004966c4() {
  // Large UI rendering function for throne room grid.
  // Draws bordered cells with art sprites.
  // Stub: UI only
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00496c3c — throne_room_click_handler
// Source: block_00490000.c @ 0x00496C3C, 545 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00496c3c(param_1, param_2) {
  // Click handler for throne room grid cells — UI stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00496e5d — throne_room_double_click
// Source: block_00490000.c @ 0x00496E5D, 114 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00496e5d(param_1, param_2) {
  // Double-click handler — UI stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00496ecf — throne_room_button_handler
// Source: block_00490000.c @ 0x00496ECF, 195 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00496ecf(param_1) {
  // Button click handler — UI stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497bf0 — delete_throne_room_object
// Source: block_00490000.c @ 0x00497BF0, 57 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497bf0(param_1) {
  FUN_004943c9();
  // if ((param_1 & 1) !== 0) operator_delete(in_ECX);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497c40 — set_throne_palette
// Source: block_00490000.c @ 0x00497C40, 52 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497c40() {
  FUN_005dea9e();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497c90 — get_throne_rect_ptr
// Source: block_00490000.c @ 0x00497C90, 28 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497c90(in_ECX) {
  return in_ECX + 0x24;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497cc0 — set_throne_background_bitmap
// Source: block_00490000.c @ 0x00497CC0, 43 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497cc0(param_1, in_ECX) {
  FUN_005bc3bf(in_ECX ? in_ECX[8] : 0, param_1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497d00 — set_throne_cell_height
// Source: block_00490000.c @ 0x00497D00, 43 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497d00(param_1, in_ECX) {
  FUN_005bd248(in_ECX ? in_ECX[8] : 0, param_1);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497d40 — setup_throne_button
// Source: block_00490000.c @ 0x00497D40, 68 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497d40(param_1, param_2, param_3, param_4, param_5, in_ECX) {
  if (in_ECX) {
    in_ECX[0x34] = param_4;
    in_ECX[0x38] = PTR_DAT_00637e60;
  }
  FUN_0040f680(param_1, param_2, param_3, param_5);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497da0 — read_line_from_file
// Source: block_00490000.c @ 0x00497DA0, 111 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497da0(param_1, param_2) {
  let local_10;
  let local_c = 0;
  let local_8;

  local_10 = 1;
  for (local_8 = 0; (local_10 !== 0 && (local_8 < 0x4f)); local_8 = local_8 + 1) {
    local_10 = _fgetc(param_2);
    param_1[local_c] = u8(local_10);
    local_c = local_c + 1;
  }
  _fgetc(param_2);
  return param_1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497e0f — write_line_to_file
// Source: block_00490000.c @ 0x00497E0F, 83 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497e0f(param_1, param_2) {
  let local_8;
  let idx = 0;

  local_8 = 1;
  while (local_8 !== 0) {
    local_8 = param_1[idx];
    idx = idx + 1;
    _fputc(local_8, param_2);
  }
  _fputc(0x1a, param_2);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497ea0 — audio_open_device
// Source: block_00490000.c @ 0x00497EA0, 251 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497ea0(param_1, param_2, param_3) {
  let iVar1;
  let uVar2;

  if (param_1[4] !== 0) {
    if (param_1[8] !== 0) {
      FUN_005dce29(param_1[4]);
      param_1[8] = 0;
    }
    FUN_005dce96(param_1[4]);
    param_1[4] = 0;
  }
  param_1[0] = u8(param_2);
  uVar2 = FUN_005dce4f(param_3);
  param_1[4] = uVar2;
  iVar1 = param_1[4];
  if (iVar1 !== 0) {
    param_1[1] = 1;
    param_1[0xc] = 0;
    param_1[0x10] = param_3;
    param_1[0xe] = param_3;
    param_1[8] = 0;
  } else {
    param_1[4] = 0;
    FUN_00589ef8(0xfffffffe, param_2, 0, param_3, 0);
  }
  return iVar1 === 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497fa0 — audio_init_device
// Source: block_00490000.c @ 0x00497FA0, 83 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497fa0(param_1, param_2, param_3, param_4, param_5) {
  param_1[1] = 0;
  param_1[0] = param_2;
  param_1[4] = param_3;
  param_1[8] = param_4;
  param_1[0xc] = 0;
  param_1[0x10] = param_5;
  param_1[0xe] = param_1[0x10];
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00497ff3 — audio_lock_buffer
// Source: block_00490000.c @ 0x00497FF3, 107 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00497ff3(param_1) {
  let uVar1;

  if (param_1[8] === 0) {
    uVar1 = FUN_005dcdf9(param_1[4]);
    param_1[8] = uVar1;
    if (param_1[8] === 0) {
      FUN_00589ef8(0xfffffff6, param_1[0], 0, 0, 0);
    }
  }
  return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0049805e — audio_clear_buffer_ptrs
// Source: block_00490000.c @ 0x0049805E, 36 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_0049805e(param_1) {
  param_1[8] = 0;
  param_1[4] = 0;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00498082 — audio_reset_position
// Source: block_00490000.c @ 0x00498082, 39 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00498082(param_1) {
  param_1[0xc] = 0;
  param_1[0x10] = param_1[0xe];
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004980a9 — audio_unlock_buffer
// Source: block_00490000.c @ 0x004980A9, 67 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004980a9(param_1) {
  if (param_1[8] !== 0) {
    if (param_1[4] !== 0) {
      FUN_005dce29(param_1[4]);
    }
    param_1[8] = 0;
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004980ec — audio_release_device
// Source: block_00490000.c @ 0x004980EC, 109 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004980ec(param_1) {
  if (param_1[1] !== 0) {
    FUN_004980a9(param_1);
    if (param_1[4] !== 0) {
      FUN_005dce96(param_1[4]);
      param_1[4] = 0;
    }
  }
  param_1[0xc] = 0;
  param_1[0x10] = 0;
  param_1[0xe] = 0;
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00498159 — audio_get_buffer_ptr
// Source: block_00490000.c @ 0x00498159, 199 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00498159(param_1, param_2) {
  let iVar1;
  let local_8;

  local_8 = 0;
  if (u16(param_1, 0x10) < param_2) {
    FUN_00589ef8(0xfffffffd, param_1[0], 0, param_2, u16(param_1, 0x10));
  }
  iVar1 = FUN_00497ff3(param_1);
  if (iVar1 === 0) {
    local_8 = u16(param_1, 0xc) + param_1[8];
    // Update position
    param_1[0xc] = (param_1[0xc] + param_2) & 0xFFFF;
    param_1[0x10] = (param_1[0x10] - param_2) & 0xFFFF;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00498310 — password_check_entry
// Source: block_00490000.c @ 0x00498310, 90 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00498310(param_1) {
  let local_24 = new Uint8Array(32);

  FUN_0055ae80(1);
  FUN_00498943();
  FUN_005f22d0(local_24, G.DAT_00654b74, param_1 * 0x20);
  FUN_004988b8();
  if (local_24[0] === 0) {
    FUN_0049836a(param_1);
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0049836a — password_set_dialog
// Source: block_00490000.c @ 0x0049836A, 614 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_0049836a(param_1) {
  // Password entry dialog — UI stub with game state mutations
  // DEVIATION: Win32 — dialog UI for password entry omitted
  G.DAT_00673d18[param_1] = 0;
  G.DAT_00673d38[param_1] = 0; // C: *(undefined4 *)(&G.DAT_00673d38 + param_1 * 4) = 0
  return;
}


// Source: decompiled/block_00490000.c FUN_004985d0 (22 bytes)
export function FUN_004985d0() {
  // DEVIATION: MFC — calls thunk_FUN_0059df8a (MFC cleanup)
  // FUN_0059df8a();
  return;
}
// Source: decompiled/block_00490000.c FUN_004985e6 (14 bytes)
export function FUN_004985e6() {
  // DEVIATION: Win32 — SEH epilog
  // *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004985f4 — password_verify_dialog
// Source: block_00490000.c @ 0x004985F4, 341 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004985f4(param_1) {
  // Password verification dialog — UI stub
  return 0;
}

// Source: decompiled/block_00490000.c FUN_0049875f (22 bytes)
export function FUN_0049875f() {
  // DEVIATION: MFC — calls thunk_FUN_0059df8a (MFC cleanup)
  // FUN_0059df8a();
  return;
}
// Source: decompiled/block_00490000.c FUN_00498775 (15 bytes)
export function FUN_00498775() {
  // DEVIATION: Win32 — SEH epilog
  // *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00498784 — init_passwords
// Source: block_00490000.c @ 0x00498784, 167 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00498784() {
  let bVar1;
  let iVar2;
  let local_10;
  let local_8;

  for (local_8 = 0; local_8 < 0xff; local_8 = local_8 + 1) {
    iVar2 = _rand();
    bVar1 = u8(iVar2 >> 0x1f);
    G.DAT_00654b74[local_8] = u8(((u8(iVar2) ^ bVar1) - bVar1 ^ bVar1) - bVar1);
  }
  for (local_10 = 0; local_10 < 8; local_10 = local_10 + 1) {
    G.DAT_00654b74[local_10 * 0x20] = 0;
    G.DAT_00673d18[local_10] = 0;
    G.DAT_00673d38[local_10] = 0;
  }
  FUN_004988b8();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0049882b — refresh_password_flags
// Source: block_00490000.c @ 0x0049882B, 141 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_0049882b() {
  let local_8;

  FUN_00498943();
  for (local_8 = 0; local_8 < 8; local_8 = local_8 + 1) {
    if (G.DAT_00654b74[local_8 * 0x20] === 0) {
      G.DAT_00673d18[local_8] = 0;
      G.DAT_00673d38[local_8] = 0;
    } else {
      G.DAT_00673d18[local_8] = 1;
      G.DAT_00673d38[local_8] = 1;
    }
  }
  FUN_004988b8();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004988b8 — encrypt_passwords
// Source: block_00490000.c @ 0x004988B8, 139 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004988b8() {
  let cVar1;
  let local_10;
  let local_c;

  cVar1 = G.DAT_00654c73;
  for (local_10 = 0; local_10 < 0x100; local_10 = local_10 + 1) {
    local_c = u8(cVar1 << 5);
    cVar1 = G.DAT_00654b74[local_10];
    G.DAT_00654b74[local_10] =
      u8(((u8(s8(G.DAT_00654b74[local_10]) >> 3) & 0x1f) | local_c) ^ u8(local_10));
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00498943 — decrypt_passwords
// Source: block_00490000.c @ 0x00498943, 144 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00498943() {
  let uVar1;
  let local_10;
  let local_8;

  local_8 = G.DAT_00654b74[0];
  for (local_10 = 0xff; -1 < local_10; local_10 = local_10 + -1) {
    uVar1 = u8(local_8);
    G.DAT_00654b74[local_10] = u8(G.DAT_00654b74[local_10] ^ u8(local_10));
    local_8 = G.DAT_00654b74[local_10];
    G.DAT_00654b74[local_10] = u8(G.DAT_00654b74[local_10] << 3 | (u8(uVar1 >> 5) & 7));
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_004989d3 — format_password_prompt
// Source: block_00490000.c @ 0x004989D3, 137 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_004989d3(param_1, param_2, param_3) {
  // Formats a password prompt with the civ name
  // UI dialog stub
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00498a5c — check_password_or_set
// Source: block_00490000.c @ 0x00498A5C, 192 bytes
// ═══════════════════════════════════════════════════════════════════
export function FUN_00498a5c(param_1) {
  let iVar1;

  if (G.DAT_00673d18[param_1] === 0) {
    if (G.DAT_00655b02 === 2) {
      FUN_00498310(param_1);
    } else {
      G.DAT_00628044 = 1;
    }
  } else {
    do {
      G.DAT_00628044 = 1;
      iVar1 = FUN_004985f4(param_1);
      if (iVar1 === 0) {
        G.DAT_00673d18[param_1] = 0;
        return 1;
      }
    } while (iVar1 === 1);
    if (iVar1 === 2) {
      G.DAT_00628044 = 0;
      return 0;
    }
  }
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// load_city_preferences — parse CITYPREF.TXT
// Source: block_00490000.c @ 0x00498D40, 326 bytes
// ═══════════════════════════════════════════════════════════════════
export function load_city_preferences() {
  let iVar1;
  let _Str1;
  let _Str2;
  let local_10;
  let local_c;

  G.DAT_0062ccc0 = 0;
  iVar1 = FUN_004a2379("CITYPREF.TXT", "NODEFEND");
  if (iVar1 === 0) {
    G.DAT_0062ccc4 = 1;
  }
  FUN_004a2020();
  iVar1 = FUN_004a2379("CITYPREF.TXT", "AUTOBUILD");
  if (iVar1 === 0) {
    do {
      iVar1 = FUN_004a23fc(1);
      if (iVar1 === 0) break;
      FUN_004a24b1();
      local_10 = -1;
      for (local_c = 1; local_c < 0x27; local_c = local_c + 1) {
        _Str2 = G.DAT_00673e10;
        _Str1 = FUN_00428b0c(G.DAT_0064c488[local_c * 8]);
        iVar1 = __strcmpi(_Str1, _Str2);
        if (iVar1 === 0) {
          local_10 = local_c;
          break;
        }
      }
      if (0 < local_10) {
        G.DAT_00673d70[G.DAT_0062ccc0] = local_10;
        G.DAT_0062ccc0 = G.DAT_0062ccc0 + 1;
      }
    } while (G.DAT_0062ccc0 < 0x20 && 0 < local_10);
    FUN_004a2020();
  }
  return;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00498e8b — AI city production decision (MAJOR GAME LOGIC)
// Source: block_00490000.c @ 0x00498E8B, 29400 bytes
//
// This is the core AI city production decision function. It evaluates
// buildings, units, and wonders to decide what a city should produce.
// Returns a production item index (negative = building, positive = unit).
// ═══════════════════════════════════════════════════════════════════
export function FUN_00498e8b(param_1, param_2, param_3) {
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
  let aiStack_364 = new Int32Array(62);
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
  let local_21c = new Int32Array(62);
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
  let auStack_cc = new Uint8Array(28);
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
  if (param_2 != null && param_2 !== 0) {
    param_2[0] = 999;
  }
  if (param_3 != null && param_3 !== 0) {
    param_3[0] = 999;
  }
  FUN_004eb4ed(param_1, 0);
  bVar1 = G.DAT_0064f348[param_1 * 0x58];
  uVar4 = s8(bVar1);
  local_fc = FUN_005b8a81(s16(G.DAT_0064f340, param_1 * 0x58),
    s16(G.DAT_0064f342, param_1 * 0x58));
  local_f8 = u8(G.DAT_0064ca32[uVar4 * 0x594 + local_fc]);
  if ((local_f8 === 0) || (local_f8 === 1)) {
    local_b0 = 1;
  } else {
    local_b0 = 0;
  }
  if (((G.DAT_00655af0 & 1) !== 0) && (local_f8 === 4)) {
    local_b0 = 1;
  }
  iVar5 = FUN_00598d45(uVar4);
  local_54 = FUN_00598ceb();
  local_54 = iVar5 + local_54;
  local_114 = 0;
  for (local_224 = 0; local_224 < G.DAT_00655b18; local_224 = local_224 + 1) {
    if ((((s32(G.DAT_0064f394, local_224 * 0x58) !== 0) &&
      (s8(G.DAT_0064f34a[local_224 * 0x58]) === uVar4)) &&
      (s8(G.DAT_0064f348[local_224 * 0x58]) !== uVar4)) &&
      ((iVar5 = FUN_005b8a81(s16(G.DAT_0064f340, local_224 * 0x58),
        s16(G.DAT_0064f342, local_224 * 0x58)),
        iVar5 === local_fc &&
        ((G.DAT_00655b0b & (1 << (G.DAT_0064f348[local_224 * 0x58] & 0x1f))) !== 0)))) {
      local_114 = local_114 + 1;
    }
  }
  if (s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 1 < local_114) {
    local_b0 = 1;
  }
  local_220 = (G.DAT_006a65c8 - s8(G.DAT_0064f349[param_1 * 0x58]) * G.DAT_0064bcca) -
    G.DAT_006a65d8 * G.DAT_006a6608;
  local_60 = 0;
  local_48 = G.DAT_006a65cc * 2 - G.DAT_006a6568;
  local_98 = G.DAT_006a65d0 - G.DAT_006a6580;
  if ((s8(G.DAT_0064f379[param_1 * 0x58]) < -0x26) &&
    (0x27 < s16(G.DAT_0064f35c, param_1 * 0x58))) {
    local_78 = 1;
  } else {
    local_78 = 0;
  }
  local_8c = 0;
  local_18 = 0;
  for (local_74 = 0; local_74 < 0x1c; local_74 = local_74 + 1) {
    auStack_cc[local_74] = 0;
    iVar5 = FUN_00453e18(local_74);
    if (iVar5 === param_1) {
      local_8c = local_8c + 1;
    }
    iVar5 = FUN_00453e51(uVar4, local_74);
    if (iVar5 !== 0) {
      local_18 = local_18 + 1;
    }
  }
  if (((G.DAT_0064f344[param_1 * 0x58] & 1) === 0) &&
    ((u8((G.DAT_0064f344[param_1 * 0x58] >> 8)) & 0xc0) !== 0xc0)) {
    if (G.DAT_006a65a8 === G.DAT_006a6550) {
      local_d8 = 1;
    } else {
      local_d8 = 0;
    }
  } else {
    local_d8 = 2;
  }
  FUN_0043d07a(s16(G.DAT_0064f340, param_1 * 0x58),
    s16(G.DAT_0064f342, param_1 * 0x58), uVar4, 0xfffffffe, 0xffffffff);
  local_ac = G.DAT_0063f660;
  local_5c = -1;
  local_24c = 0;
  if ((((local_220 === 0) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0)) &&
    ((G.DAT_0064f344[param_1 * 0x58] & 0x40) === 0)) && (G.DAT_006a65d8 === 0)) {
    local_24c = 1;
  }
  local_d4 = 0;
  local_24 = 0;
  for (local_50 = 0; local_50 < 0x14; local_50 = local_50 + 1) {
    local_dc = FUN_005ae052(s16(G.DAT_0064f340, param_1 * 0x58) +
      s8(G.DAT_00628370[local_50]));
    local_ec = s16(G.DAT_0064f342, param_1 * 0x58) +
      s8(G.DAT_006283a0[local_50]);
    iVar5 = FUN_004087c0(local_dc, local_ec);
    if (iVar5 !== 0) {
      bVar3 = FUN_005b89bb(local_dc, local_ec);
      local_7c = u8(bVar3);
      if (local_7c === 10) {
        local_60 = local_60 + 1;
        iVar5 = FUN_004e78ce(param_1, local_50);
        if (iVar5 !== 0) {
          local_60 = local_60 + 3;
        }
      }
      local_70 = FUN_005b8d62(local_dc, local_ec);
      if (((-1 < local_70) && (local_70 !== uVar4)) &&
        ((local_258 = FUN_005b2e69(local_dc, local_ec), -1 < local_258 &&
          (s8(G.DAT_006560f7[local_258 * 0x20]) !== uVar4)))) {
        iVar5 = FUN_005b50ad(local_258, 2);
        local_d4 = local_d4 + iVar5;
      }
      bVar3 = FUN_005b94d5(local_dc, local_ec);
      if ((bVar3 & 0xc) === 0xc) {
        local_24 = local_24 + 1;
      }
      if (((local_24c !== 0) && (iVar5 = FUN_005b68f6(uVar4, local_dc, local_ec), iVar5 === 1)) &&
        ((uVar6 = FUN_005b94d5(local_dc, local_ec), (uVar6 & 4) === 0 &&
          (s8(G.DAT_00627cce[local_7c * 0x18]) < 0)))) {
        local_5c = local_50;
        iVar5 = FUN_005b8ee1(local_dc, local_ec);
        if ((iVar5 !== 0) && (local_7c === 1)) {
          local_24c = 0;
        }
      }
    }
  }
  if (-1 < local_5c) {
    local_dc = FUN_005ae052(s16(G.DAT_0064f340, param_1 * 0x58) +
      s8(G.DAT_00628370[local_5c]));
    local_ec = s16(G.DAT_0064f342, param_1 * 0x58) +
      s8(G.DAT_006283a0[local_5c]);
    iVar5 = FUN_005b8931(local_dc, local_ec);
    if ((G.DAT_00655b0b & tileRead(iVar5, 4)) === 0) {
      local_d0 = 4;
      pbVar7 = FUN_005b8931(local_dc, local_ec);
      if ((tileRead(pbVar7, 0) & 0x80) === 0) {
        local_d0 = local_d0 | 0x10;
      }
      FUN_005b94fc(local_dc, local_ec, local_d0, 1, 1);
      local_220 = local_220 + 1;
    }
  }

  // Initialize tracking arrays
  for (local_f4 = 0; local_f4 < 0x3e; local_f4 = local_f4 + 1) {
    local_21c[local_f4] = 0;
    aiStack_364[local_f4] = 0;
  }

  local_238 = 0;
  local_6c = 0;
  local_e0 = 0;
  local_124 = 0;
  iVar5 = FUN_00453e51(uVar4, 7);
  if (iVar5 === 0) {
    local_268 = 0;
  } else {
    local_268 = 4;
  }
  local_260 = 0;
  local_f0 = 0;
  local_a4 = 0;
  local_40 = 0;
  local_64 = 0;
  local_234 = 0;
  local_104 = 0;

  for (local_224 = 0; local_224 < G.DAT_00655b18; local_224 = local_224 + 1) {
    if (s32(G.DAT_0064f394, local_224 * 0x58) !== 0) {
      if (s8(G.DAT_0064f348[local_224 * 0x58]) === uVar4) {
        iVar5 = FUN_0043d20a(local_224, 1);
        if (((iVar5 !== 0) || (G.DAT_0064f379[local_224 * 0x58] === 0xff)) &&
          (local_234 = local_234 + 1, local_104 < s8(G.DAT_0064f349[local_224 * 0x58]))) {
          local_104 = s8(G.DAT_0064f349[local_224 * 0x58]);
        }
        if (local_224 !== param_1) {
          if ((G.DAT_0064f379[param_1 * 0x58] === G.DAT_0064f379[local_224 * 0x58]) &&
            (local_f0 = local_f0 + 1,
              u8(G.DAT_0064f391[param_1 * 0x58]) < u8(G.DAT_0064f391[local_224 * 0x58]))) {
            local_260 = local_260 + 1;
          }
          if ((-0x26 < s8(G.DAT_0064f379[local_224 * 0x58])) &&
            (s8(G.DAT_0064f379[local_224 * 0x58]) < -0x22)) {
            local_40 = local_40 + 1;
          }
          iVar5 = FUN_005b8a81(s16(G.DAT_0064f340, local_224 * 0x58),
            s16(G.DAT_0064f342, local_224 * 0x58));
          if (iVar5 === local_fc) {
            iVar5 = FUN_0043d20a(local_224, 2);
            if (iVar5 !== 0) {
              local_268 = local_268 + 1;
            }
            iVar5 = FUN_0043d20a(local_224, 0x20);
            if (iVar5 !== 0) {
              local_6c = local_6c + 1;
            }
            iVar5 = FUN_0043d20a(local_224, 0x22);
            if (iVar5 !== 0) {
              local_e0 = local_e0 + 1;
            }
            if (G.DAT_0064f379[local_224 * 0x58] === 0xfe) {
              local_268 = local_268 + 1;
            }
            if (s8(G.DAT_0064f379[local_224 * 0x58]) < -0x26) {
              local_238 = local_238 + 1;
              if (u8(G.DAT_0064f391[param_1 * 0x58]) < u8(G.DAT_0064f391[local_224 * 0x58])) {
                auStack_cc[1 - s8(G.DAT_0064f379[local_224 * 0x58])] =
                  u8(auStack_cc[1 - s8(G.DAT_0064f379[local_224 * 0x58])] |
                    u8(1 << (bVar1 & 0x1f)));
              }
              if (u8(G.DAT_0064c48c[s8(G.DAT_0064f379[local_224 * 0x58]) * -8]) *
                G.DAT_006a657c - s16(G.DAT_0064f35c, local_224 * 0x58) === 0 ||
                (u8(G.DAT_0064c48c[s8(G.DAT_0064f379[local_224 * 0x58]) * -8]) *
                  G.DAT_006a657c) < s16(G.DAT_0064f35c, local_224 * 0x58)) {
                auStack_cc[1 - s8(G.DAT_0064f379[local_224 * 0x58])] =
                  u8(auStack_cc[1 - s8(G.DAT_0064f379[local_224 * 0x58])] | 1);
              }
            }
            if (-1 < s8(G.DAT_0064f379[local_224 * 0x58])) {
              local_21c[s8(G.DAT_0064f379[local_224 * 0x58])] =
                local_21c[s8(G.DAT_0064f379[local_224 * 0x58])] + 1;
            }
          }
        }
      } else {
        if (G.DAT_0064f379[param_1 * 0x58] === G.DAT_0064f379[local_224 * 0x58]) {
          local_a4 = local_a4 + 1;
        }
        if (s8(G.DAT_0064f379[local_224 * 0x58]) < -0x26) {
          auStack_cc[1 - s8(G.DAT_0064f379[local_224 * 0x58])] =
            u8(auStack_cc[1 - s8(G.DAT_0064f379[local_224 * 0x58])] |
              u8(1 << (G.DAT_0064f348[local_224 * 0x58] & 0x1f)));
        }
        if (((G.DAT_00655b0b & (1 << (G.DAT_0064f348[local_224 * 0x58] & 0x1f))) !== 0) &&
          (-0x26 < s8(G.DAT_0064f379[local_224 * 0x58])) &&
          (s8(G.DAT_0064f379[local_224 * 0x58]) < -0x22)) {
          local_64 = local_64 + 1;
        }
      }
    }
  }
  local_120 = 0;
  local_4c = 0;
  for (local_258 = 0; local_258 < G.DAT_00655b16; local_258 = local_258 + 1) {
    if ((s32(G.DAT_0065610a, local_258 * 0x20) !== 0) &&
      (s8(G.DAT_006560f7[local_258 * 0x20]) === uVar4)) {
      local_124 = local_124 + 1;
      if (s8(G.DAT_0064b1ca[local_f4 * 0x14]) === 5) {
        if ((u16(G.DAT_006560f4, local_258 * 0x20) & 0x200) !== 0) {
          local_120 = local_120 + 1;
        }
        if (G.DAT_00656100[local_258 * 0x20] === 0xff) {
          local_4c = local_4c + 1;
          continue; // goto LAB_00499ca3
        }
      }
      iVar5 = FUN_005b8a81(s16(G.DAT_006560f0, local_258 * 0x20),
        s16(G.DAT_006560f2, local_258 * 0x20));
      if (iVar5 === local_fc) {
        aiStack_364[u8(G.DAT_006560f6[local_258 * 0x20])] =
          aiStack_364[u8(G.DAT_006560f6[local_258 * 0x20])] + 1;
      }
    }
  }
  if ((((s32(G.DAT_0064f344, param_1 * 0x58) & 0x80040) === 0x80000) && (local_d4 === 0)) &&
    ((G.DAT_006a65d8 === 0 && ((local_f8 !== 1 && (2 < s8(G.DAT_0064f349[param_1 * 0x58]))))))) {
    local_30 = 9999;
    for (local_224 = 0; local_224 < G.DAT_00655b18; local_224 = local_224 + 1) {
      if ((((s32(G.DAT_0064f394, local_224 * 0x58) !== 0) && (local_224 !== param_1)) &&
        (s8(G.DAT_0064f348[local_224 * 0x58]) === uVar4)) &&
        (local_68 = FUN_005ae1b0(s16(G.DAT_0064f340, param_1 * 0x58),
          s16(G.DAT_0064f342, param_1 * 0x58),
          s16(G.DAT_0064f340, local_224 * 0x58),
          s16(G.DAT_0064f342, local_224 * 0x58)),
          local_68 < local_30)) {
        local_30 = local_68;
      }
    }
    if (8 < local_30) {
      local_100 = 1;
    }
    if ((6 < s8(G.DAT_0064f349[param_1 * 0x58])) &&
      (4 < u8(G.DAT_0064c6b5[uVar4 * 0x594])) && ((0 < local_220 && (local_f8 !== 0)))) {
      local_100 = local_100 + 1;
    }
  }
  local_3c = 0;
  for (local_50 = 0; local_50 < 0x10; local_50 = local_50 + 1) {
    if ((G.DAT_0064cbd8[uVar4 * 0x594 + local_50 * 6] === 1) &&
      (iVar5 = FUN_005b8a81(s16(G.DAT_0064cbd4, uVar4 * 0x594 + local_50 * 6),
        s16(G.DAT_0064cbd6, uVar4 * 0x594 + local_50 * 6)),
        iVar5 === local_fc)) {
      local_3c = local_3c + 1;
    }
  }
  if (local_b0 !== 0) {
    local_3c = local_3c + (local_3c >> 1);
  }
  if ((((local_124 === 0) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0)) &&
    (u8(G.DAT_0064c6b5[uVar4 * 0x594]) < 2)) &&
    (((param_2 === null || param_2 === 0) && (param_3 === null || param_3 === 0)))) {
    for (local_f4 = 0x3d; -1 < local_f4; local_f4 = local_f4 + -1) {
      if (((s8(G.DAT_0064b1ca[local_f4 * 0x14]) === 1) &&
        ((G.DAT_0064b1bd[local_f4 * 0x14] & 1) === 0)) &&
        (iVar5 = FUN_004bfe5a(uVar4, param_1, local_f4), iVar5 !== 0)) {
        return local_f4;
      }
    }
  }
  if (uVar4 === 0) {
    if (s8(G.DAT_0064f379[param_1 * 0x58]) < 1) {
      if (G.DAT_00655b9e !== 0) {
        return 0x13;
      }
      return 5;
    }
    local_f4 = s8(G.DAT_0064f379[param_1 * 0x58]);
    local_118 = s8(G.DAT_0064b1c0[local_f4 * 0x14]);
    if (local_118 < 0) {
      return local_f4;
    }
    if (G.DAT_00655b08 === 0) {
      return local_f4;
    }
    iVar5 = FUN_005ae006(G.DAT_00655b82[local_118]);
    if (iVar5 < 2) {
      return local_f4;
    }
    if (((G.DAT_00655b0b & G.DAT_00655b82[local_118]) === 0) && (G.DAT_00655b08 < 4)) {
      return local_f4;
    }
    local_50 = 0;
    while (true) {
      if (0x3d < local_50) {
        return local_f4;
      }
      if ((s8(G.DAT_0064b1cb[local_50 * 0x14]) === local_118) &&
        (G.DAT_0064b1ca[local_f4 * 0x14] === G.DAT_0064b1ca[local_50 * 0x14])) break;
      local_50 = local_50 + 1;
    }
    return local_50;
  }
  local_34 = 0;
  if (local_f8 === 4) {
    for (local_70 = 1; local_70 < 8; local_70 = local_70 + 1) {
      if (((G.DAT_0064c6c1[local_70 * 4 + uVar4 * 0x594] & 0x20) !== 0) &&
        (G.DAT_0064c932[local_70 * 0x594 + local_fc] === 0)) {
        local_34 = 1;
      }
    }
  }
  local_250 = 0;
  local_264 = 0;
  local_80 = 0;
  local_258 = FUN_005b2e69(s16(G.DAT_0064f340, param_1 * 0x58),
    s16(G.DAT_0064f342, param_1 * 0x58));
  local_a8 = FUN_005b53b6(local_258, 1);
  iVar5 = FUN_005b53b6(local_258, 4);
  local_22c = FUN_005b53b6(local_258, 2);
  local_22c = (iVar5 >> 1) + local_22c;
  if (local_a8 < 1) {
    local_264 = 2;
    local_80 = 2;
  } else {
    if ((local_250 === 0) &&
      (iVar5 = FUN_005b4c63(s16(G.DAT_0064f340, param_1 * 0x58),
        s16(G.DAT_0064f342, param_1 * 0x58), uVar4),
        iVar5 === 0)) {
      local_14 = 4;
    } else {
      local_14 = 3;
    }
    iVar5 = FUN_0043d20a(param_1, 1);
    if (iVar5 === 0) {
      if ((local_f8 === 5) && (local_250 === 0)) {
        local_14 = local_14 + 1;
      }
    } else {
      local_14 = local_14 + -1;
    }
    if ((local_b0 === 0) && (G.DAT_0064c9f2[uVar4 * 0x594 + local_fc] === 0)) {
      local_370 = 0;
    } else {
      local_370 = 1;
    }
    local_108 = local_370 + ((s8(G.DAT_0064f349[param_1 * 0x58]) / local_14) | 0);
    iVar5 = FUN_0043d20a(param_1, 1);
    uVar6 = local_108;
    if (iVar5 !== 0) {
      local_d0 = 1;
      if (3 < s8(G.DAT_0064f349[param_1 * 0x58])) {
        local_d0 = 2;
      }
      if (7 < s16(G.DAT_0064c708, uVar4 * 0x594)) {
        local_d0 = 3;
      }
      if (0xb < s16(G.DAT_0064c708, uVar4 * 0x594)) {
        local_d0 = 4;
      }
      uVar6 = local_d0;
      if (local_d0 <= local_108) {
        uVar6 = local_108;
      }
    }
    local_108 = uVar6;
    if ((local_a8 < local_108) && (local_80 = 1, local_a8 + 1 < local_108)) {
      local_264 = 1;
    }
  }
  if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) {
    iVar5 = FUN_00453e51(uVar4, 0);
    if ((iVar5 !== 0) && (iVar5 = FUN_0043d20a(param_1, 3), iVar5 !== 0)) {
      FUN_0043d289(param_1, 3, 0);
      G.DAT_0064c6a2[uVar4] = G.DAT_0064c6a2[uVar4] + G.DAT_0064c4a4 * G.DAT_006a657c;
    }
    iVar5 = FUN_00453e51(uVar4, 0x1a);
    if ((iVar5 !== 0) && (iVar5 = FUN_0043d20a(param_1, 0x1a), iVar5 !== 0)) {
      FUN_0043d289(param_1, 0x1a, 0);
      G.DAT_0064c6a2[uVar4] = G.DAT_0064c6a2[uVar4] + G.DAT_0064c55c * G.DAT_006a657c;
    }
    iVar5 = FUN_00453e51(uVar4, 0x15);
    if ((iVar5 !== 0) && (iVar5 = FUN_0043d20a(param_1, 0x21), iVar5 !== 0)) {
      FUN_0043d289(param_1, 0x21, 0);
      G.DAT_0064c6a2[uVar4] = G.DAT_0064c6a2[uVar4] + G.DAT_0064c594 * G.DAT_006a657c;
    }
    iVar5 = FUN_00453e51(uVar4, 10);
    if ((iVar5 !== 0) && (iVar5 = FUN_0043d20a(param_1, 0xb), iVar5 !== 0)) {
      FUN_0043d289(param_1, 0xb, 0);
      G.DAT_0064c6a2[uVar4] = G.DAT_0064c6a2[uVar4] + G.DAT_0064c4e4 * G.DAT_006a657c;
    }
    iVar5 = FUN_0043d20a(param_1, 0x20);
    if ((((iVar5 !== 0) && (G.DAT_00655b05 === uVar4)) &&
      ((G.DAT_0064f346[param_1 * 0x58] & 1) === 0)) && ((local_f8 !== 4 && (local_f8 !== 5)))) {
      for (local_224 = 0; local_224 < G.DAT_00655b18; local_224 = local_224 + 1) {
        if (((s32(G.DAT_0064f394, local_224 * 0x58) !== 0) &&
          (s8(G.DAT_0064f348[local_224 * 0x58]) === uVar4)) &&
          ((local_224 !== param_1 &&
            (((iVar5 = FUN_0043d20a(local_224, 0x20), iVar5 !== 0 &&
              ((G.DAT_0064f346[local_224 * 0x58] & 1) === 0)) &&
              (iVar5 = FUN_005b4b66(s16(G.DAT_0064f340, local_224 * 0x58),
                s16(G.DAT_0064f342, local_224 * 0x58), uVar4),
                iVar5 === 0)))))) {
          iVar5 = FUN_005b8a81(s16(G.DAT_0064f340, local_224 * 0x58),
            s16(G.DAT_0064f342, local_224 * 0x58));
          if (iVar5 === local_fc) {
            if (1 < local_80) {
              // Fall through to LAB_0049a9d5
            } else {
              continue;
            }
          } else if (u8(G.DAT_0064ca32[uVar4 * 0x594 + iVar5]) === local_f8) {
            continue;
          }
          // LAB_0049a9d5
          local_258 = FUN_005b2e69(s16(G.DAT_0064f340, local_224 * 0x58),
            s16(G.DAT_0064f342, local_224 * 0x58));
          if (((-1 < local_258) &&
            ((local_f8 !== 1 || (iVar8 = FUN_005b53b6(local_258, 1), 1 < iVar8)))) &&
            (cVar2 = G.DAT_0064ca32[uVar4 * 0x594 + iVar5],
              iVar5 = FUN_005b50ad(local_258, 2),
              (3 - ((cVar2 === 4) ? 1 : 0)) <= iVar5)) {
            // goto LAB_0049aab5
            while ((-1 < local_258 &&
              (s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[local_258 * 0x20]) * 0x14]) !== local_f8))) {
              local_258 = FUN_005b2c82(local_258);
            }
            if (-1 < local_258) {
              let v344_p1 = s32(G.DAT_0064f344, param_1 * 0x58);
              w32(G.DAT_0064f344, param_1 * 0x58, v344_p1 | 0x10000);
              let v344_l224 = s32(G.DAT_0064f344, local_224 * 0x58);
              w32(G.DAT_0064f344, local_224 * 0x58, v344_l224 | 0x10000);
              FUN_005b6787(local_258);
              FUN_005b36df(local_258, s16(G.DAT_0064f340, param_1 * 0x58),
                s16(G.DAT_0064f342, param_1 * 0x58), 1);
              local_84 = local_258;
              local_230 = 0;
              for (local_258 = 0; local_258 < G.DAT_00655b16; local_258 = local_258 + 1) {
                if (((s32(G.DAT_0065610a, local_258 * 0x20) !== 0) &&
                  (s8(G.DAT_0064b1ca[u8(G.DAT_006560f6[local_258 * 0x20]) * 0x14]) === 3)) &&
                  ((G.DAT_00655b0b & (1 << (G.DAT_006560f7[local_258 * 0x20] & 0x1f))) !== 0) &&
                  ((G.DAT_0064c6c1[s8(G.DAT_006560f7[local_258 * 0x20]) * 0x594 + uVar4 * 4] & 0x20) !== 0)) {
                  iVar5 = FUN_005ae1b0(s16(G.DAT_0064f340, param_1 * 0x58),
                    s16(G.DAT_0064f342, param_1 * 0x58),
                    s16(G.DAT_006560f0, local_258 * 0x20),
                    s16(G.DAT_006560f2, local_258 * 0x20));
                  iVar8 = FUN_005b2a39(local_258);
                  if ((iVar8 / G.DAT_0064bcc8 | 0) < iVar5) {
                    iVar5 = FUN_005ae1b0(s16(G.DAT_0064f340, local_224 * 0x58),
                      s16(G.DAT_0064f342, local_224 * 0x58),
                      s16(G.DAT_006560f0, local_258 * 0x20),
                      s16(G.DAT_006560f2, local_258 * 0x20));
                    iVar8 = FUN_005b2a39(local_258);
                    if ((iVar8 / G.DAT_0064bcc8 | 0) < iVar5) continue; // goto LAB_0049aba3
                  }
                  iVar5 = FUN_0059a791(0, (-((u16(G.DAT_006560f4, local_258 * 0x20) & 0x2000) === 0 ? 1 : 0) & 2) + 3);
                  if (iVar5 === 0) {
                    FUN_005b4391(local_84, 1);
                    local_84 = -1;
                    break;
                  }
                  local_230 = local_230 + 1;
                }
              }
              if (local_84 < 0) {
                FUN_0040ff60(0, G.DAT_0064f360[param_1 * 0x58]);
                FUN_00421ea0("WESHOT");
              } else if (local_230 !== 0) {
                FUN_0040ff60(0, G.DAT_0064f360[param_1 * 0x58]);
                FUN_00421ea0("WESAW");
              }
            }
            break; // exit the for loop after handling
          }
        }
      }
    }
  }
  // LAB_0049ae3e
  local_20 = 999;
  local_26c = 999;
  local_30 = 999;
  local_254 = 999;
  local_240 = 999;
  local_58 = 999;
  for (local_244 = 1; local_244 < 0x27; local_244 = local_244 + 1) {
    iVar5 = FUN_004c03ae(uVar4, param_1, local_244);
    if (iVar5 !== 0) {
      local_1c = 999;
      local_90 = 0;
      if (local_244 - 1 < 0x23) {
        iVar5 = local_220 >> 1;
        switch (local_244) {
          case 1:
            if ((((local_234 === 0) || ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0)) &&
              ((local_234 === 0 ||
                ((local_234 === 1 && (local_104 * 2 < s8(G.DAT_0064f349[local_224 * 0x58]))))
              )) && ((local_f8 === 4 || (((local_f8 === 5 || (local_f8 === 0)) || (3 < G.DAT_006a656c)))
            )))) {
              local_1c = 2;
              if (9 < s8(G.DAT_0064f349[local_224 * 0x58])) {
                local_1c = 1;
              }
              if (0xe < s8(G.DAT_0064f349[local_224 * 0x58])) {
                local_1c = local_1c - 1;
              }
              if (3 < G.DAT_006a656c) {
                local_90 = local_b0;
              }
            }
            break;
          case 2:
            local_1c = ((s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) +
              local_268 + 4) -
              s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]));
            if (((s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) < 0) ||
              (0 < s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]))) &&
              (s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) +
                s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) !== 0)) {
              local_1c = local_1c + local_268;
            }
            local_90 = 1;
            if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
              if (G.DAT_00655b08 === 3) {
                local_1c = ((local_1c * 3) / 2) | 0;
              }
              if (3 < G.DAT_00655b08) {
                local_1c = local_1c << 1;
              }
            }
            break;
          case 3:
            iVar5 = FUN_00453e51(uVar4, 0);
            if (iVar5 === 0) {
              if (G.DAT_006a65cc < 3) {
                local_1c = 8;
              } else {
                local_1c = 4;
              }
              if (G.DAT_006a6550 <= G.DAT_006a65a8) {
                local_1c = local_1c + 2;
              }
              if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) &&
                (local_d0 = (G.DAT_00655b08 + 4) - s8(G.DAT_0064f349[local_224 * 0x58]),
                  0 < local_d0)) {
                local_1c = local_1c + local_d0;
              }
            }
            break;
          case 4:
            if (local_d8 === 1) {
              local_1c = 9;
            }
            if (local_d8 === 2) {
              local_1c = -5;
            }
            break;
          case 5:
            local_1c = FUN_005adfa0(10 - (local_98 >> 1), 1, 10);
            if (local_d8 === 1) {
              local_1c = local_1c - 1;
            }
            if (local_d8 === 2) {
              local_1c = -4;
            }
            break;
          case 6:
            local_1c = FUN_005adfa0(10 - ((local_98 / 3) | 0), 1, 10);
            break;
          case 7:
            local_1c = 0xe - (G.DAT_006a656c * 2 + G.DAT_006a6580);
            if (G.DAT_0064c6b5[uVar4 * 0x594] === 6) {
              if (local_d8 === 2) {
                local_1c = -1;
              }
            } else if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) {
              local_1c = local_1c - ((s16(G.DAT_0064c6bc, G.DAT_00655c20 * 0x594) / 2) | 0);
            }
            break;
          case 8:
            iVar5 = FUN_00453e51(uVar4, 6);
            if (iVar5 === 0) {
              local_1c = 10 - (s8(G.DAT_0064f349[param_1 * 0x58]) >> 1);
              for (local_228 = 1; local_228 < 8; local_228 = local_228 + 1) {
                if ((1 << (u8(local_228) & 0x1f) & G.DAT_00655b0b) !== 0) {
                  if ((s32(G.DAT_0064c6c0, uVar4 * 0x594 + local_228 * 4) & 0x2010) !== 0) {
                    local_1c = local_1c + -2;
                  }
                  if (G.DAT_0064c932[local_228 * 0x594 + local_fc] !== 0) {
                    local_1c = local_1c + -1;
                  }
                }
              }
              if (G.DAT_00655bca !== 0) {
                local_1c = local_1c + 2;
              }
              if (G.DAT_00655b82[0] !== 0) {
                local_1c = local_1c + 2;
              }
              if (G.DAT_00655bcb !== 0) {
                local_1c = local_1c + 2;
              }
              local_1c = FUN_005adfa0(local_1c, 1, 10);
              iVar5 = FUN_0043d20a(param_1, 1);
              if (iVar5 !== 0) {
                local_1c = local_1c - 4;
              }
              local_90 = 1;
            }
            break;
          case 9:
            if ((G.DAT_0064bcd1 - iVar5) <= s8(G.DAT_0064f349[param_1 * 0x58])) {
              local_1c = ((G.DAT_0064bcd1 + 4) - s8(G.DAT_0064f349[param_1 * 0x58])) - iVar5;
              local_1c = FUN_005adfa0(local_1c, 1, 0x14);
            }
            break;
          case 10:
            local_1c = FUN_005adfa0(10 - ((local_98 / 3) | 0), 1, 10);
            if (local_d8 === 1) {
              local_1c = local_1c - 1;
            }
            if (local_d8 === 2) {
              local_1c = 0;
            }
            break;
          case 0xb:
            iVar5 = FUN_00453e51(uVar4, 10);
            if (iVar5 === 0) {
              if (local_d8 === 1) {
                local_1c = 8;
              }
              if (local_d8 === 2) {
                local_1c = -3;
              }
            }
            break;
          case 0xc:
            if ((G.DAT_0064c6b3[uVar4 * 0x594] !== 0) &&
              ((local_54 === 0 || (iVar5 = FUN_004bd9f0(uVar4, 0x4c), iVar5 === 0)))) {
              local_1c = FUN_005adfa0(10 - (local_98 >> 2), 2, 10);
            }
            break;
          case 0xd:
            break;
          case 0xe:
            if (local_d8 === 2) {
              local_1c = -2;
            }
            break;
          case 0xf:
          case 0x14:
            local_1c = FUN_005adfa0(0xe - G.DAT_006a65cc, 1, 0xe);
            break;
          case 0x11:
            if (local_d8 < 2) {
              iVar5 = FUN_005adfa0(0xf - s8(G.DAT_0064f349[param_1 * 0x58]), 1, 0xf);
              local_1c = ((iVar5 + 1) / 2) | 0;
              if (G.DAT_00655c14 === -1) {
                local_1c = local_1c << 1;
              }
              if (G.DAT_0064c7a5[G.DAT_00655c20 * 0x594] === 0) {
                local_1c = local_1c << 1;
              }
              if (9 < s8(G.DAT_0064f349[param_1 * 0x58])) {
                local_1c = local_1c - 1;
              }
              iVar5 = FUN_0043d20a(param_1, 1);
              if (iVar5 !== 0) {
                local_1c = 0;
              }
            }
            local_90 = 1;
            break;
          case 0x13:
            local_1c = FUN_005adfa0(0xc - ((G.DAT_006a65cc / 5) | 0), 2, 0xe);
            break;
          case 0x16:
            if ((local_d8 !== 0) || (local_54 < 2)) {
              local_1c = FUN_005adfa0(0xb - (local_98 >> 2), 2, 0xb);
              if (local_d8 === 1) {
                local_1c = local_1c - 1;
              }
              if (local_d8 === 2) {
                local_1c = 0;
              }
            }
            break;
          case 0x17:
            if ((local_54 < 2) &&
              ((G.DAT_0064bcd2 - iVar5) <= s8(G.DAT_0064f349[param_1 * 0x58]))) {
              local_1c = ((G.DAT_0064bcd2 + 4) - s8(G.DAT_0064f349[param_1 * 0x58])) - iVar5;
              local_1c = FUN_005adfa0(local_1c, 1, 0x14);
            }
            break;
          case 0x18:
            local_1c = (0xe - (s8(G.DAT_0064f349[param_1 * 0x58]) >> 1)) + local_24 * -2 +
              local_54 * 2 + iVar5;
            local_1c = FUN_005adfa0(local_1c, 2, 0xe);
            break;
          case 0x19:
            local_1c = (0xf - (s8(G.DAT_0064f349[param_1 * 0x58]) >> 1)) + local_54 * 6;
            local_1c = FUN_005adfa0(local_1c, 2, 0xf);
            break;
          case 0x1a:
            if (((local_54 === 0) || (iVar5 = FUN_004bd9f0(uVar4, 0x4c), iVar5 === 0)) &&
              (G.DAT_0064c6b3[uVar4 * 0x594] !== 0)) {
              local_1c = FUN_005adfa0(0xb - (local_98 >> 2), 2, 10);
            }
            break;
          case 0x1b: {
            local_10 = (u8(G.DAT_0064c797[G.DAT_00655c20 * 0x594]) * 2 +
              u8(G.DAT_0064c794[G.DAT_00655c20 * 0x594]) * 2 +
              u8(G.DAT_0064c7a4[G.DAT_00655c20 * 0x594]) +
              u8(G.DAT_0064c795[G.DAT_00655c20 * 0x594])) * 2;
            if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
              local_10 = 0;
              for (local_70 = 1; local_70 < 8; local_70 = local_70 + 1) {
                if (local_70 !== uVar4) {
                  local_d0 = u8(G.DAT_0064c7a4[local_70 * 0x594]) +
                    u8(G.DAT_0064c794[local_70 * 0x594]) +
                    u8(G.DAT_0064c795[local_70 * 0x594]) +
                    u8(G.DAT_0064c797[local_70 * 0x594]);
                  if (((G.DAT_0064c6c1[local_70 * 4 + uVar4 * 0x594] & 0x20) === 0) &&
                    ((G.DAT_0064c6c0[uVar4 * 4 + local_70 * 0x594] & 0x10) === 0)) {
                    local_d0 = (local_d0 / 2) | 0;
                  }
                  local_10 = local_10 + local_d0;
                }
              }
            }
            local_1c = 0xc - local_10;
            local_1c = FUN_005adfa0(local_1c, 1, 0xc);
            if ((G.DAT_0064f346[param_1 * 0x58] & 4) !== 0) {
              local_1c = local_1c - 3;
            }
            local_90 = 1;
            for (local_228 = 1; local_228 < 8; local_228 = local_228 + 1) {
              if (((1 << (u8(local_228) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                ((4 < u8(G.DAT_0064c6be[local_228 * 0x594])) ||
                  ((G.DAT_0064c6c1[uVar4 * 0x594 + local_228 * 4] & 0x20) !== 0))) {
                local_90 = (local_b0 !== 0) ? 1 : 0;
                break;
              }
            }
            break;
          }
          case 0x1c: {
            iVar5 = FUN_0044263f(param_1, 1);
            if (iVar5 !== 0) {
              local_10 = u8(G.DAT_0064c79e[G.DAT_00655c20 * 0x594]) * 3 +
                u8(G.DAT_0064c79f[G.DAT_00655c20 * 0x594]) * 3 +
                u8(G.DAT_0064c7a0[G.DAT_00655c20 * 0x594]) * 5 +
                u8(G.DAT_0064c79c[G.DAT_00655c20 * 0x594]) +
                u8(G.DAT_0064c79d[G.DAT_00655c20 * 0x594]);
              if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
                local_10 = 0;
                for (local_70 = 1; local_70 < 8; local_70 = local_70 + 1) {
                  if (local_70 !== uVar4) {
                    local_d0 = (u8(G.DAT_0064c79c[local_70 * 0x594]) >> 1) +
                      (u8(G.DAT_0064c79d[local_70 * 0x594]) >> 1) +
                      u8(G.DAT_0064c7a0[local_70 * 0x594]) * 2 +
                      u8(G.DAT_0064c79e[local_70 * 0x594]) +
                      u8(G.DAT_0064c79f[local_70 * 0x594]);
                    if (((G.DAT_0064c6c1[local_70 * 4 + uVar4 * 0x594] & 0x20) === 0) &&
                      ((G.DAT_0064c6c0[uVar4 * 4 + local_70 * 0x594] & 0x10) === 0)) {
                      local_d0 = (local_d0 / 2) | 0;
                    }
                    local_10 = local_10 + local_d0;
                  }
                }
              }
              local_1c = 0xc - local_10;
              local_1c = FUN_005adfa0(local_1c, 1, 0xc);
              local_90 = 1;
              for (local_228 = 1; local_228 < 8; local_228 = local_228 + 1) {
                if (((1 << (u8(local_228) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                  ((4 < u8(G.DAT_0064c6be[local_228 * 0x594])) ||
                    ((G.DAT_0064c6c1[uVar4 * 0x594 + local_228 * 4] & 0x20) !== 0))) {
                  local_90 = (local_b0 !== 0) ? 1 : 0;
                  break;
                }
              }
            }
            break;
          }
          case 0x1d:
            break;
          case 0x1e:
            if ((local_d8 < 2) &&
              (local_1c = FUN_005adfa0(0x10 - local_60, 2, 0x10), local_220 < 1)) {
              local_1c = (local_1c / 2) | 0;
            }
            break;
          case 0x1f:
            if (local_d8 < 2) {
              local_1c = 0x10 - local_60;
              local_1c = FUN_005adfa0(local_1c, 2, 0x10);
              if (0 < local_1c) {
                iVar5 = FUN_0043d20a(param_1, 0xf);
                if (iVar5 !== 0) {
                  local_1c = (local_1c / 2) | 0;
                }
                iVar5 = FUN_0043d20a(param_1, 0x10);
                if (iVar5 !== 0) {
                  local_1c = (local_1c / 2) | 0;
                }
              }
              if (((G.DAT_006a65cc - G.DAT_006a6568 <= ((G.DAT_006a65cc / 3) | 0)) ||
                (G.DAT_006a65cc < ((s8(G.DAT_0064f349[local_224 * 0x58]) / 2) | 0))) &&
                (((s8(G.DAT_0064f349[local_224 * 0x58]) / 2) | 0) <=
                  ((local_60 + (local_60 >> 0x1f & 3)) >> 2))) {
                local_1c = local_1c - 2;
              }
            }
            break;
          case 0x20:
            local_1c = (local_6c * 4 + 4) -
              s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]);
            if (G.DAT_0064ca32[uVar4 * 0x594 + local_fc] === 4) {
              local_1c = (local_1c / 2) | 0;
            }
            iVar5 = FUN_004bd9f0(uVar4, 0);
            if (iVar5 === 0) {
              local_1c = local_1c << 1;
            }
            if (((G.DAT_0064c932[uVar4 * 0x594 + local_fc] === 1) ||
              (((G.DAT_0064c9f2[uVar4 * 0x594 + local_fc] & 0x10) !== 0 && (local_6c === 0)))) &&
              (u8(G.DAT_0064c932[uVar4 * 0x594 + local_fc]) < local_1c)) {
              local_1c = u8(G.DAT_0064c932[uVar4 * 0x594 + local_fc]);
            }
            iVar5 = FUN_0043d20a(param_1, 1);
            if ((iVar5 !== 0) && (-1 < local_1c)) {
              local_1c = 0;
            }
            local_90 = local_b0;
            break;
          case 0x21:
            iVar5 = FUN_00453e51(uVar4, 0x15);
            if (iVar5 === 0) {
              local_d0 = G.DAT_006a65e4;
              if (5 < u8(G.DAT_0064c6b5[uVar4 * 0x594])) {
                local_d0 = G.DAT_006a65e4 << 1;
              }
              if (((4 < u8(G.DAT_0064c6b5[uVar4 * 0x594])) && (local_d0 !== 0)) &&
                (G.DAT_006a6550 - G.DAT_006a65a8 < 2)) {
                local_d0 = local_d0 + 2;
              }
              local_1c = 10 - local_d0;
            }
            break;
          case 0x22:
            iVar5 = FUN_0044263f(param_1, 1);
            if (iVar5 !== 0) {
              iVar5 = local_ac;
              if (0x27 < local_ac) {
                iVar5 = 0x28;
              }
              local_1c = (0xb - (iVar5 >> 2)) + local_22c * -5 +
                (local_e0 * 2 -
                  s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30])) +
                s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]);
              local_1c = FUN_005adfa0(local_1c, 2, 0xf);
              if (s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) < 0) {
                local_1c = local_1c + local_e0;
              }
            }
            break;
          case 0x23:
            iVar5 = FUN_004a7577(uVar4);
            if (((iVar5 === 0) && ((G.DAT_00655af0 & 2) === 0)) &&
              ((iVar5 = FUN_00597d6f(uVar4, 0), -1 < iVar5 &&
                (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0 ||
                  (s16(G.DAT_0064caa8, uVar4 * 0x594) < 0x26)))))) {
              local_1c = 4;
              for (local_228 = 1; local_228 < 8; local_228 = local_228 + 1) {
                if (((1 << (u8(local_228) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                  (iVar5 = FUN_004a75a6(local_228), iVar5 !== 0)) {
                  local_1c = 2;
                  break;
                }
              }
              if ((local_f8 !== 0) && ((G.DAT_0064c9f2[uVar4 * 0x594 + local_fc] & 0x10) === 0)) {
                local_90 = local_b0;
              }
              local_248 = 0;
              if ((G.DAT_00655af0 & 2) === 0) {
                for (local_228 = 1; local_228 < 8; local_228 = local_228 + 1) {
                  if (((1 << (u8(local_228) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                    (iVar5 = FUN_004a7577(local_228), iVar5 !== 0)) {
                    local_248 = 1;
                    break;
                  }
                }
              }
              if ((1 < local_54) && (G.DAT_00655b08 !== 0)) {
                uVar6 = local_1c - 1;
                if (local_248 !== 0) {
                  uVar6 = local_1c - 2;
                }
                local_1c = uVar6;
                if (local_264 === 0) {
                  local_90 = local_b0;
                }
              }
              local_88 = 0;
              local_10c = 0;
              for (local_94 = 0; local_94 < 6; local_94 = local_94 + 1) {
                local_110 = FUN_005adfa0(((local_94 + 1) / 2) | 0, 0, 2);
                local_10c = local_10c +
                  s16(G.DAT_0064caa8, uVar4 * 0x594 + local_94 * 2) *
                  u8(G.DAT_0064c5a4[local_110 * 8]);
                local_88 = local_88 +
                  s16(G.DAT_0064caa8, G.DAT_00655c20 * 0x594 + local_94 * 2) *
                  u8(G.DAT_0064c5a4[local_110 * 8]);
              }
              if (((local_40 === 0) ||
                (((local_40 <= local_64 && (local_10c <= local_88)) || (local_248 !== 0)))) &&
                ((((G.DAT_0064f344[param_1 * 0x58] & 1) === 0 && (G.DAT_00655b08 !== 0)) &&
                  (((s16(G.DAT_0064ca72, uVar4 * 0x594) >> 1 <= local_48) ||
                    (0x13 < local_48)))))) {
                local_30 = 999;
              }
            }
            break;
          default:
            local_1c = FUN_005adfa0(0xc - ((G.DAT_006a65cc + (G.DAT_006a65cc >> 0x1f & 3)) >> 2), 2, 0xc);
            break;
        }
      }
      if (local_1c < 400) {
        local_1c = (((((local_b0 === local_90) ? 0xfffffff6 : 0) + 0x14) * local_1c * 3) /
          (s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 3)) | 0;
      } else {
        local_1c = 0x3fff;
      }
      iVar5 = FUN_0043d20a(param_1, 2);
      if (iVar5 !== 0) {
        local_1c = local_1c + ((local_1c / ((local_268 >> 1) + 3)) | 0);
      }
      iVar5 = FUN_00453e18(0xd);
      if (iVar5 === param_1) {
        local_1c = local_1c + ((local_1c / 3) | 0);
      }
      if (local_1c < local_30) {
        local_30 = local_1c;
        local_58 = -local_244;
      }
      if (local_1c < local_20) {
        local_20 = local_1c;
        local_254 = -local_244;
      }
    }
  }
  if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) && (G.DAT_0062ccc0 !== 0)) {
    for (local_50 = 0; local_50 < G.DAT_0062ccc0; local_50 = local_50 + 1) {
      local_244 = G.DAT_00673d70[local_50];
      iVar5 = FUN_0043d20a(param_1, local_244);
      if ((iVar5 === 0) && (iVar5 = FUN_004c03ae(uVar4, param_1, local_244), iVar5 !== 0)) {
        local_254 = -local_244;
        local_58 = -local_244;
        // goto LAB_0049ea4a — skip wonders/units loops below
        break;
      }
    }
  }
  // Wonder evaluation loop
  if ((local_78 !== 0) ||
    (((((G.DAT_0064c9f2[uVar4 * 0x594 + local_fc] & 0x10) === 0 &&
      (2 < s8(G.DAT_0064f349[param_1 * 0x58]))) &&
      (((u8(s32(G.DAT_0064f344, param_1 * 0x58) >> 8) & 0xc0) !== 0xc0))) &&
      ((4 - s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) <=
        u8(G.DAT_0064c932[uVar4 * 0x594 + local_fc])) ||
        ((G.DAT_0064c9f2[uVar4 * 0x594 + local_fc] === 0 &&
          (4 - s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) <=
            s16(G.DAT_0064c708, uVar4 * 0x594)))))))) {
    for (local_74 = 0; local_74 < 0x1c; local_74 = local_74 + 1) {
      local_244 = local_74 + 0x27;
      iVar5 = FUN_004c03ae(uVar4, param_1, local_244);
      if (iVar5 !== 0) {
        local_90 = 0;
        if (local_f8 === 4) {
          local_90 = local_b0;
        }
        iVar5 = (local_18 + local_8c + 8) - ((G.DAT_0064c6a2[uVar4] / 200) | 0);
        if (iVar5 < 2) {
          iVar5 = 1;
        }
        local_28 = (local_74 / 7) | 0;
        local_1c = iVar5 + u8(G.DAT_0064c6b7[uVar4 * 0x594 + local_28]);
        if (u8(G.DAT_00673af8[local_28]) < u8(G.DAT_0064c6b7[uVar4 * 0x594 + local_28])) {
          local_1c = iVar5 + u8(G.DAT_0064c6b7[uVar4 * 0x594 + local_28]) + 2;
        }
        if (u8(G.DAT_0064c6b7[uVar4 * 0x594 + local_28]) <
          u8(G.DAT_0064c6b7[G.DAT_00655c21 * 0x594 + local_28])) {
          local_1c = local_1c + -1;
        }
        if ((((local_78 === 0) || (s8(G.DAT_0064f379[param_1 * 0x58]) === -local_244)) ||
          ((((G.DAT_00655b0b &
            auStack_cc[1 - s8(G.DAT_0064f379[param_1 * 0x58])]) === 0 ||
            ((s16(G.DAT_00655b98, s8(G.DAT_0064f379[param_1 * 0x58]) * -2) !== -1 ||
              (s16(G.DAT_0064f35c, param_1 * 0x58) <
                ((u8(G.DAT_0064c48c[s8(G.DAT_0064f379[param_1 * 0x58]) * -8]) *
                  G.DAT_006a657c) / 2 | 0))))) &&
            ((auStack_cc[1 - s8(G.DAT_0064f379[param_1 * 0x58])] & 1) === 0)))) &&
          (((1 < G.DAT_00655b08 ||
            (local_a0 = s8(G.DAT_0064c48e[local_244 * 8]), local_a0 < 0)) ||
            ((G.DAT_00655b0b & G.DAT_00655b82[local_a0]) !== 0)))) {
          if (local_74 !== 0x17) {
            if (G.DAT_00655b08 < 2) {
              for (local_224 = 0; local_224 < G.DAT_00655b18; local_224 = local_224 + 1) {
                if (((s32(G.DAT_0064f394, local_224 * 0x58) !== 0) &&
                  ((G.DAT_00655b0b & (1 << (G.DAT_0064f348[local_224 * 0x58] & 0x1f))) !== 0)) &&
                  (s8(G.DAT_0064f379[local_224 * 0x58]) === -local_244)) {
                  local_1c = 999;
                }
              }
              if (local_1c === 999) continue; // goto LAB_0049cadf
            }
            iVar5 = FUN_004bd9f0(uVar4, 0x49);
            if ((iVar5 !== 0) && ((G.DAT_00655b0b & G.DAT_00655bcb) === 0)) continue;
          }
          uVar6 = local_1c;
          switch (local_74) {
            case 0:
              uVar6 = local_1c -
                (s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) * 3 + 2);
              break;
            case 1:
              uVar6 = local_1c - (((s16(G.DAT_0064c708, uVar4 * 0x594) / 3) | 0) + 1);
              break;
            case 2:
              iVar5 = FUN_0043d20a(param_1, 1);
              if (iVar5 !== 0) {
                local_1c = local_1c + -1;
              }
              iVar5 = FUN_0043d20a(param_1, 5);
              if (iVar5 !== 0) {
                local_1c = local_1c + -1;
              }
              uVar6 = local_1c - ((s8(G.DAT_0064f349[param_1 * 0x58]) / 3) | 0);
              break;
            case 3:
              uVar6 = local_1c -
                ((u8(G.DAT_0064c799[uVar4 * 0x594]) + 2 +
                  u8(G.DAT_0064c798[uVar4 * 0x594])) >> 2);
              break;
            case 4:
              for (local_44 = 1; uVar6 = local_1c, local_44 < 8; local_44 = local_44 + 1) {
                if (u8(G.DAT_0064c6b0[local_44 * 0x594]) < u8(G.DAT_0064c6b0[uVar4 * 0x594])) {
                  if ((1 << (u8(local_44) & 0x1f) & G.DAT_00655b0b) !== 0) {
                    uVar6 = local_1c + 1;
                  }
                } else {
                  uVar6 = local_1c + -1;
                  if (((1 << (u8(local_44) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                    (u8(G.DAT_0064c6b0[uVar4 * 0x594]) + 5 <
                      u8(G.DAT_0064c6b0[local_44 * 0x594]))) {
                    uVar6 = local_1c + -3;
                  }
                }
                local_1c = uVar6;
              }
              break;
            case 5:
              uVar6 = local_1c -
                (((s16(G.DAT_0064c708, uVar4 * 0x594) +
                  (s16(G.DAT_0064c708, uVar4 * 0x594) >> 0x1f & 3)) >> 2) -
                  ((G.DAT_00655af8 / 0x19) | 0));
              break;
            case 6:
              uVar6 = local_1c +
                s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) * -2;
              break;
            case 7:
              uVar6 = local_1c -
                (s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) * 3 +
                  s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) +
                  s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) * -2 +
                  1);
              break;
            case 8:
              iVar5 = FUN_005adfa0(((G.DAT_006a65cc * 2) / 3) | 0, 0, 3);
              uVar6 = local_1c - iVar5;
              break;
            case 9:
              for (local_228 = 1; uVar6 = local_1c, local_228 < 8; local_228 = local_228 + 1) {
                if ((1 << (u8(local_228) & 0x1f) & G.DAT_00655b0b) !== 0) {
                  if ((G.DAT_0064c6c0[uVar4 * 0x594 + local_228 * 4] & 8) !== 0) {
                    local_1c = local_1c + -1;
                  }
                  if ((G.DAT_0064c6c0[uVar4 * 0x594 + local_228 * 4] & 6) !== 0) {
                    local_1c = local_1c + -1;
                  }
                }
              }
              break;
            case 10:
              uVar6 = local_1c -
                ((s16(G.DAT_0064c708, uVar4 * 0x594) +
                  (s16(G.DAT_0064c708, uVar4 * 0x594) >> 0x1f & 3)) >> 2);
              break;
            case 0xb:
              local_1c = (local_1c - ((local_98 + (local_98 >> 0x1f & 7)) >> 3)) + -1;
              iVar5 = FUN_0043d20a(param_1, 1);
              uVar6 = local_1c;
              if (iVar5 !== 0) {
                uVar6 = local_1c + -1;
              }
              break;
            case 0xc: {
              local_2c = 0;
              for (local_f4 = 0; local_f4 < 0x3e; local_f4 = local_f4 + 1) {
                if (G.DAT_0064b1c1[local_f4 * 0x14] === 2) {
                  local_2c = local_2c + u8(G.DAT_0064c778[uVar4 * 0x594 + local_f4]);
                }
              }
              uVar6 = local_1c - ((local_2c + 3 + (local_2c + 3 >> 0x1f & 3)) >> 2);
              break;
            }
            case 0xd:
              uVar6 = local_1c - ((s8(G.DAT_0064f349[param_1 * 0x58]) / 5) | 0);
              break;
            case 0xe:
              local_90 = local_b0;
              uVar6 = local_1c + -4;
              break;
            case 0xf:
              local_1c = local_1c - (u8(G.DAT_0064c972[uVar4 * 0x594 + local_fc]) >> 4);
              iVar5 = FUN_0043d20a(param_1, 1);
              uVar6 = local_1c;
              if (iVar5 !== 0) {
                uVar6 = local_1c + -1;
              }
              break;
            case 0x10:
              local_1c = local_1c - ((s8(G.DAT_0064f349[param_1 * 0x58]) / 6) | 0);
              iVar5 = FUN_0043d20a(param_1, 1);
              uVar6 = local_1c;
              if (iVar5 !== 0) {
                uVar6 = local_1c + -1;
              }
              break;
            case 0x11:
              uVar6 = local_1c -
                ((s16(G.DAT_0064c708, uVar4 * 0x594) +
                  (s16(G.DAT_0064c708, uVar4 * 0x594) >> 0x1f & 3)) >> 2);
              break;
            case 0x12:
              uVar6 = local_1c + -3;
              break;
            case 0x13:
              iVar5 = FUN_004bd9f0(uVar4, 0xf);
              if (iVar5 === 0) {
                uVar6 = local_1c + -2;
              } else {
                uVar6 = local_1c + -1;
              }
              break;
            case 0x14:
              if ((G.DAT_00655b0b & (1 << (G.DAT_00655c31 & 0x1f))) !== 0) {
                uVar6 = local_1c + -1;
                if (3 < u8(G.DAT_0064c6be[G.DAT_00655c31 * 0x594])) {
                  uVar6 = local_1c + -2;
                }
                local_1c = uVar6;
                uVar6 = local_1c;
                if ((7 < s16(G.DAT_0064c708, G.DAT_00655c31 * 0x594)) &&
                  (uVar6 = local_1c + -1, G.DAT_00655c22[uVar4] === 6)) {
                  uVar6 = local_1c + -2;
                }
              }
              break;
            case 0x15:
              uVar6 = local_1c + -1;
              if (((-1 < s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30])) &&
                (-1 < s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]))) &&
                (-1 < s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]))) {
                uVar6 = local_1c + -2;
              }
              local_1c = uVar6;
              if (0 < s16(G.DAT_0064ca7e, uVar4 * 0x594)) {
                local_1c = local_1c + -1;
              }
              if (4 < u8(G.DAT_0064c6b5[uVar4 * 0x594])) {
                local_1c = local_1c + -1;
              }
              uVar6 = local_1c;
              if (5 < u8(G.DAT_0064c6b5[uVar4 * 0x594])) {
                uVar6 = local_1c + -1;
              }
              break;
            case 0x16:
              uVar6 = local_1c - ((u8(G.DAT_0064c972[uVar4 * 0x594 + local_fc]) / 0x14) | 0);
              break;
            case 0x17:
              iVar5 = FUN_004bd9f0(uVar4, 0x49);
              if (iVar5 !== 0) {
                local_d0 = 0;
                for (local_228 = 1; local_228 < 8; local_228 = local_228 + 1) {
                  if (((1 << (u8(local_228) & 0x1f) & G.DAT_00655b0b) !== 0) &&
                    (iVar5 = FUN_004bd9f0(local_228, 0x49), iVar5 !== 0) &&
                    (u16(G.DAT_0064c70e, local_228 * 0x594) <
                      u16(G.DAT_0064c70e, uVar4 * 0x594))) {
                    local_d0 = 1;
                    break;
                  }
                }
                if (local_d0 === 0) {
                  if ((G.DAT_00655b0b & (1 << (G.DAT_00655c31 & 0x1f))) !== 0) {
                    local_1c = local_1c + -1;
                    iVar5 = FUN_004bd9f0(G.DAT_00655c31, 0x49);
                    if (iVar5 === 0) {
                      local_1c = local_1c + -1;
                    }
                  }
                  uVar6 = local_1c +
                    (s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) * 2 -
                      s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]));
                  break;
                }
              }
              continue; // goto LAB_0049cadf
            case 0x18:
              uVar6 = local_1c -
                (s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) +
                  s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) * -2);
              if (G.DAT_00655c22[uVar4] === 7) {
                uVar6 = uVar6 + -1;
              }
              break;
            case 0x19:
              uVar6 = local_1c -
                (s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) * 3 +
                  s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) * -2);
              break;
            case 0x1a:
              uVar6 = local_1c -
                (s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) * 2 + 2);
              break;
            case 0x1b:
              uVar6 = local_1c -
                (s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 2);
              break;
          }
          local_1c = uVar6;
          local_9c = FUN_00453da0(local_74);
          if (local_9c !== 0) {
            local_1c = local_1c * 3 + G.DAT_00655b08 * 0x32;
          }
          local_1c = local_1c + local_238 * 5;
          if (((local_238 === 0) || (local_78 !== 0)) &&
            (G.DAT_0064c6b7[uVar4 * 0x594 + local_28] === 0)) {
            local_1c = local_1c + -2;
          }
          if (local_f8 === 1) {
            local_1c = local_1c + local_d4 + 1;
          } else {
            local_1c = local_1c + ((local_d4 / 2) | 0);
          }
          if (s8(G.DAT_0064f379[param_1 * 0x58]) === -local_244) {
            if (local_a4 !== 0) {
              local_1c = (local_1c / 2) | 0;
            }
            local_1c = (local_260 + 1) * local_1c + local_260;
          } else if ((1 << (bVar1 & 0x1f) &
            auStack_cc[1 - s8(G.DAT_0064f379[param_1 * 0x58])]) !== 0) {
            local_1c = local_1c * 2 + 1;
          }
          local_c = local_1c;
          local_e4 = u8(G.DAT_0064c48c[local_244 * 8]) * G.DAT_006a657c + 1;
          if (((local_78 !== 0) && (local_264 === 0)) && (local_9c === 0)) {
            if (local_238 === 0) {
              if (local_b0 === local_90) {
                local_1c = (local_1c / 2) | 0;
              } else {
                local_90 = local_b0;
              }
            }
            if (((local_e4 * 3 + (local_e4 * 3 >> 0x1f & 3)) >> 2) <=
              s16(G.DAT_0064f35c, param_1 * 0x58)) {
              local_90 = local_b0;
            }
            if (((local_b0 !== local_90) &&
              ((local_e4 / 2 | 0) <= s16(G.DAT_0064f35c, param_1 * 0x58))) &&
              (local_238 < 3)) {
              local_90 = local_b0;
            }
          }
          if (local_78 === 0) {
            if (s16(G.DAT_0064ca72, uVar4 * 0x594) >> 1 < local_48) {
              if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) &&
                (s16(G.DAT_0064ca72, uVar4 * 0x594) !== local_48) && (local_48 < 6)) {
                local_1c = local_1c << 1;
              }
            } else {
              local_1c = local_1c << 1;
            }
          }
          if (s16(G.DAT_0064ca72, uVar4 * 0x594) === local_48) {
            local_1c = local_1c - ((local_1c / 3) | 0);
          }
          local_1c = (((((local_b0 === local_90) ? 0xfffffff6 : 0) + 0x14) * local_1c * 3) /
            (s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 3)) | 0;
          iVar5 = FUN_0043d20a(param_1, 2);
          if (iVar5 !== 0) {
            local_1c = local_1c + ((local_1c / ((local_268 >> 1) + 3)) | 0);
          }
          iVar5 = FUN_0043d20a(param_1, 1);
          if ((iVar5 !== 0) &&
            (local_1c = local_1c - ((local_1c / 3) | 0), local_8c === 0 ||
              (G.DAT_0064c6b7[uVar4 * 0x594 + local_28] === 0))) {
            local_1c = (local_1c / 2) | 0;
          }
          if ((G.DAT_0064f345[param_1 * 0x58] & 1) === 0) {
            if ((local_78 !== 0) && (local_9c === 0)) {
              local_1c = (((local_e4 - s16(G.DAT_0064f35c, param_1 * 0x58)) *
                ((local_1c * 3 + (((local_1c * 3) >> 0x1f) & 3)) >> 2)) /
                local_e4 + ((local_1c + ((local_1c >> 0x1f) & 3)) >> 2)) / 3 | 0;
            }
          } else {
            local_1c = local_1c * 3;
          }
          if (local_58 < -0x26) {
            if (local_c < local_8) {
              local_8 = local_c;
              local_58 = -local_244;
              local_254 = -local_244;
              if (local_1c < local_30) {
                local_30 = local_1c;
              }
              if (local_1c < local_20) {
                local_20 = local_1c;
              }
            }
          } else {
            if (local_1c < local_30) {
              local_8 = local_c;
              local_30 = local_1c;
              local_58 = -local_244;
            }
            if (local_1c < local_20) {
              local_20 = local_1c;
              local_254 = -local_244;
            }
          }
        }
      }
      // LAB_0049cadf
    }
  }
  // Unit evaluation (C lines 5526-6109)
  if (s16(G.DAT_0064c706, uVar4 * 0x594) < 0x200) {
    for (local_f4 = 0; local_f4 < 0x3e; local_f4 = local_f4 + 1) {
      if ((5 < s8(G.DAT_0064b1ca[local_f4 * 0x14])) &&
        (iVar5 = FUN_004bfe5a(uVar4, param_1, local_f4), iVar5 !== 0)) {
        local_1c = 999;
        local_90 = 0;
        // Military unit (category 6) evaluation
        if (s8(G.DAT_0064b1ca[local_f4 * 0x14]) === 6) {
          local_23c = FUN_00598d45(uVar4);
          if (local_23c !== 0) {
            iVar5 = FUN_004bd9f0(uVar4, 0x4c);
            if ((((iVar5 !== 0) && (iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064c5ae)), iVar5 !== 0)) &&
              (iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064c5b6)), iVar5 !== 0)) &&
              (iVar5 = FUN_004bd9f0(uVar4, 0x20), iVar5 !== 0)) {
              local_23c = 0;
            }
            if ((local_264 !== 0) || ((G.DAT_0064f344[param_1 * 0x58] & 1) !== 0)) {
              local_23c = 0;
            }
            if (G.DAT_00655b08 < 2) {
              local_23c = 0;
            }
          }
          if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) ||
            ((G.DAT_0064f344[param_1 * 0x58] & 0x10) === 0)) {
            if ((local_21c[local_f4] <= local_23c) &&
              (aiStack_364[local_f4] < (G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff))) {
              local_1c = 0xb;
              local_44 = 0xffffffff;
              for (local_70 = 1; local_70 < 8; local_70 = local_70 + 1) {
                if (((local_70 !== uVar4) &&
                    ((((G.DAT_0064c6c0[local_70 * 4 + uVar4 * 0x594] & 6) === 0 ||
                    (((((1 << (u8(local_70) & 0x1f) & G.DAT_00655b0b) !== 0 &&
                      (((G.DAT_00655c22[uVar4] & 0xff) <= (G.DAT_00655c22[local_70] & 0xff) ||
                        (local_23c !== 0)))) &&
                      ((local_f4 === 0x2f ||
                        (((7 < ((G.DAT_0064c6b0[local_70 * 0x594] & 0xff) -
                          (G.DAT_0064c6b0[uVar4 * 0x594] & 0xff)) || (local_23c !== 0)) ||
                          (s8(G.DAT_00655c22[local_70]) === 7)))))) &&
                      ((((G.DAT_0064c6c0[local_70 * 4 + uVar4 * 0x594] & 8) !== 0 ||
                        (local_23c !== 0)) ||
                        (((G.DAT_0064c6b5[local_70 * 0x594] & 0xff) < 5 ||
                          ((u16(G.DAT_0064c8b2, local_70 * 0x594 + local_fc * 2) <=
                            u16(G.DAT_0064c832, local_fc * 2 + uVar4 * 0x594)) ||
                            (s8(G.DAT_0064c932[uVar4 * 0x594 + local_fc]) === 0)))))))))))) &&
                  (s8(G.DAT_0064c932[local_70 * 0x594 + local_fc]) !== 0)) {
                  local_44 = local_70;
                }
              }
              if (local_44 < 0) {
                local_44 = G.DAT_00655c20 & 0xff;
                if ((local_f8 === 4) && (G.DAT_00655b08 !== 0)) {
                  local_90 = local_b0;
                  local_1c = 8;
                  if (((G.DAT_0064c778[uVar4 * 0x594 + local_f4] & 0xff) +
                    (G.DAT_0064c7f4[uVar4 * 0x594 + local_f4] & 0xff)) <
                    ((s16(G.DAT_0064c708, uVar4 * 0x594) + 3 +
                      (s16(G.DAT_0064c708, uVar4 * 0x594) + 3 >> 0x1f & 3)) >> 2)) {
                    if (s32(G.DAT_0064c6a2, (G.DAT_00655c20 & 0xff) * 0x594) <
                      s32(G.DAT_0064c6a2, uVar4 * 0x594)) {
                      local_1c = 7;
                    }
                    if (s32(G.DAT_0064c6a2, (G.DAT_00655c20 & 0xff) * 0x594) * 2 <
                      s32(G.DAT_0064c6a2, uVar4 * 0x594)) {
                      local_1c = local_1c + -1;
                    }
                    if ((G.DAT_0064c6b0[uVar4 * 0x594] & 0xff) <
                      (G.DAT_0064c6b0[(G.DAT_00655c20 & 0xff) * 0x594] & 0xff)) {
                      if (aiStack_364[local_f4] + local_21c[local_f4] === 0) {
                        local_1c = local_1c + -3;
                      }
                      local_1c = local_1c -
                        ((G.DAT_0064c6b0[(G.DAT_00655c20 & 0xff) * 0x594] & 0xff) -
                          (G.DAT_0064c6b0[uVar4 * 0x594] & 0xff));
                    }
                    local_1c = FUN_005adfa0(local_1c, (G.DAT_0064c778[uVar4 * 0x594 + local_f4] & 0xff) + 1, 10);
                  }
                }
                if (local_23c !== 0) {
                  local_1c = (local_1c / 2) | 0;
                }
                if (aiStack_364[local_f4] !== 0) {
                  local_1c = 999;
                }
              } else {
                local_1c = FUN_005adfa0(10 - ((G.DAT_0064c6b0[local_44 * 0x594] & 0xff) -
                  (G.DAT_0064c6b0[uVar4 * 0x594] & 0xff)), 2, 10);
                if ((((G.DAT_0064c6c0[local_70 * 4 + uVar4 * 0x594] & 6) !== 0) &&
                  (local_1c = local_1c + 1, aiStack_364[local_f4] !== 0)) && (local_23c === 0)) {
                  local_1c = 999;
                }
                if (u16(G.DAT_0064c70e, local_44 * 0x594) <=
                  u16(G.DAT_0064c70e, uVar4 * 0x594)) {
                  local_90 = local_b0;
                }
              }
              if (s8(G.DAT_0064c6b5[uVar4 * 0x594]) === 3) {
                local_1c = local_1c + -1;
              }
              if ((local_23c !== 0) && (local_1c < 0x14)) {
                for (local_244 = 0x23; local_244 < 0x26; local_244 = local_244 + 1) {
                  iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064c48e[local_244 * 8]));
                  if ((iVar5 === 0) &&
                    (iVar5 = FUN_004bd9f0(local_44, s8(G.DAT_0064c48e[local_244 * 8])),
                      iVar5 !== 0)) {
                    local_90 = local_b0;
                    uVar6 = local_21c[local_f4] * 2 + 1;
                    if (local_1c <= uVar6) {
                      uVar6 = local_1c;
                    }
                    local_1c = uVar6;
                    if ((((local_21c[local_f4] === 0) &&
                      (s8(G.DAT_0064c778[uVar4 * 0x594 + local_f4]) === 0)) &&
                      (local_1c = uVar6 + -1, -0x26 < local_58)) && (local_58 < -0x22)) {
                      local_58 = local_f4;
                    }
                  }
                }
              }
            }
            // goto LAB_0049e97a — fall through to scoring below
          } else {
            // ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) && ((G.DAT_0064f344[param_1 * 0x58] & 0x10) !== 0)
            // skip to next unit (continue equivalent)
            continue;
          }
        } else if (s8(G.DAT_0064b1ca[local_f4 * 0x14]) === 7) {
          // Category 7 — spy/diplomat
          if ((G.DAT_0064f345[param_1 * 0x58] & 0x10) === 0) {
            local_1c = 10;
            if (s8(G.DAT_0064f37a[param_1 * 0x58]) < 3) {
              local_1c = 10 - ((5 - s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30])) *
                G.DAT_006a65d0) / 10;
            }
            iVar5 = local_1c + s8(G.DAT_0064f37a[param_1 * 0x58]) * 2;
            if (iVar5 < 3) {
              iVar5 = 2;
            }
            local_1c = iVar5 + (G.DAT_0064c9b2[uVar4 * 0x594 + local_fc] & 0xff);
            if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) ||
              ((G.DAT_0064f344[param_1 * 0x58] & 0x10) === 0)) {
              // goto LAB_0049e97a — fall through to scoring below
            } else {
              continue;
            }
          } else {
            continue;
          }
        } else {
          // Categories 8+ that are not 6 or 7 — fall through to LAB_0049e97a
        }
        // LAB_0049e97a — final scoring for military/spy units
        if (local_1c < 400) {
          local_1c = ((((-(local_b0 === local_90 ? 1 : 0) & 0xfffffff6) + 0x14) * local_1c * 3) /
            (s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 3)) | 0;
        } else {
          local_1c = 0x3fff;
        }
        iVar5 = FUN_0043d20a(param_1, 2);
        if (iVar5 !== 0) {
          local_1c = local_1c + ((local_1c + (local_1c >> 0x1f & 3)) >> 2);
        }
        if (local_1c < local_30) {
          local_30 = local_1c;
          local_58 = local_f4;
        }
        if (local_1c < local_20) {
          local_20 = local_1c;
          local_254 = local_f4;
        }
      }
    }
    // LAB_0049ea4a — non-military unit evaluation (categories 0-5)
    if (s16(G.DAT_0064c706, uVar4 * 0x594) < 0x200) {
      for (local_f4 = 0; local_f4 < 0x3e; local_f4 = local_f4 + 1) {
        local_e8 = s8(G.DAT_0064b1ca[local_f4 * 0x14]) & 0xff;
        let _skip_unit = false;
        if ((((((local_e8 < 6) &&
          (iVar5 = FUN_004bfe5a(uVar4, param_1, local_f4), iVar5 !== 0)) &&
          (local_f4 !== 0x2a)) &&
          ((local_e8 !== 5 ||
            (((G.DAT_006a6608 <= local_220 ||
              (((G.DAT_006a65d8 === 0 &&
                ((G.DAT_0064c778[uVar4 * 0x594] & 0xff) +
                  (G.DAT_0064c779[uVar4 * 0x594] & 0xff) === local_120)) &&
                (local_21c[1] + local_21c[0] < 2)))) &&
              (1 < s8(G.DAT_0064f349[param_1 * 0x58]))))))) &&
          (((local_f4 !== 2 || ((G.DAT_0064c6b5[uVar4 * 0x594] & 0xff) < 2)) &&
            ((s8(G.DAT_0064b1c4[local_f4 * 0x14]) < 0x63 ||
              (((G.DAT_0064c778[uVar4 * 0x594 + local_f4] & 0xff) < 4 &&
                ((G.DAT_0064c7f4[uVar4 * 0x594 + local_f4] & 0xff) < 2)))))))) &&
          ((local_e8 !== 3 ||
            (((G.DAT_0064c793[uVar4 * 0x594] & 0xff) +
              (G.DAT_0064c80f[uVar4 * 0x594] & 0xff) +
              (G.DAT_0064c796[uVar4 * 0x594] & 0xff) +
              (G.DAT_0064c812[uVar4 * 0x594] & 0xff) <
              (G.DAT_0064c794[(G.DAT_00655c20 & 0xff) * 0x594] & 0xff) +
              (G.DAT_0064c795[(G.DAT_00655c20 & 0xff) * 0x594] & 0xff) +
              (G.DAT_0064c797[(G.DAT_00655c20 & 0xff) * 0x594] & 0xff) + 2 &&
              (((G.DAT_0064c6c0[(G.DAT_00655c20 & 0xff) * 4 + uVar4 * 0x594] & 4) === 0 ||
                ((G.DAT_0064c778[uVar4 * 0x594 + local_f4] & 0xff) +
                  (G.DAT_0064c7f4[uVar4 * 0x594 + local_f4] & 0xff) === 0)))))))) {
          // Human player tech bypass check (C lines 5723-5737)
          // goto LAB_0049eee7 = skip past the iVar5 check (continue to LAB_0049eee7)
          // goto LAB_0049ea9e = skip unit (continue)
          if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
            if (local_f4 === 2) {
              iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064b207));
              if (iVar5 !== 0) { _skip_unit = true; } // goto LAB_0049ea9e
            } else if (local_f4 === 4) {
              iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064b22f));
              if (iVar5 !== 0) { _skip_unit = true; } // goto LAB_0049ea9e
            } else if (local_f4 === 0xf) {
              iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064b30b));
              if (iVar5 !== 0) {
                _skip_unit = true; // goto LAB_0049ea9e
              } else {
                iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064b31f));
                if (iVar5 !== 0) { _skip_unit = true; } // goto LAB_0049ea9e
              }
            }
            // else: local_f4 is not 2, 4, or 0xf → goto LAB_0049eee7 (fall through)
          }
          if (!_skip_unit) {
            // LAB_0049eee7
            if (local_f4 === 0x10) {
              iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064b347));
              if (iVar5 === 0) {
                iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064b333));
                // joined_r0x0049ef35
                if (iVar5 !== 0) { _skip_unit = true; }
              }
            } else {
              if (local_f4 === 0x11) {
                iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064b347));
                // joined_r0x0049ef35
                if (iVar5 !== 0) { _skip_unit = true; }
              }
            }
          }
          if (!_skip_unit) {
            if (s8(G.DAT_0064b1c1[local_f4 * 0x14]) === 0) {
              local_1c = local_21c[local_f4] * 2 + aiStack_364[local_f4];
              if ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0) {
                local_1c = (local_1c / 2) | 0;
                if (((local_f4 === 0xc) || (local_f4 === 10)) || (local_f4 === 9)) {
                  local_1c = local_1c + 2;
                }
              }
              if (local_f4 === 4) {
                local_1c = local_1c + local_21c[5] * 2 + aiStack_364[5];
              }
              if (s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) < 0) {
                if (local_f4 === 0x13) {
                  local_1c = local_1c + local_21c[0x12] * 2 + aiStack_364[0x12];
                }
              } else if (local_f4 === 0x12) {
                local_1c = local_1c + local_21c[0x13] * 2 + aiStack_364[0x13];
              }
              if ((s8(G.DAT_0064b1ca[local_f4 * 0x14]) === 0) &&
                (s8(G.DAT_0064b1c4[local_f4 * 0x14]) === 0)) {
                let _goto_f199 = false;
                if ((local_f8 !== 0) && (local_f8 !== 1)) {
                  if (local_f8 === 4) {
                    local_374 = 1;
                  } else {
                    local_374 = ((s16(G.DAT_00666130, local_fc * 0x10) + 199) / 200) | 0;
                  }
                  if ((local_21c[local_f4] * 2 + aiStack_364[local_f4] <= local_374) &&
                    ((G.DAT_0064c778[uVar4 * 0x594 + local_f4] & 0xff) < 2)) {
                    _goto_f199 = true;
                  }
                }
                if (!_goto_f199) {
                  // Skip the LAB_0049f199 block — go to LAB_0049ea9e (continue)
                  continue;
                }
              }
              // else fall through to LAB_0049f199
            }
            // LAB_0049f199 — production cost evaluation
            if (local_f8 === 4) {
              local_d0 = 1 - s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]);
              if (s8(G.DAT_0064b1ca[local_f4 * 0x14]) !== 5) {
                local_d0 = (1 - s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30])) * 2;
              }
              if (local_34 !== 0) {
                local_d0 = (local_d0 / 2) | 0;
              }
              local_1c = local_1c + local_d0;
              if ((local_34 !== 0) && (s8(G.DAT_0064b1ca[local_f4 * 0x14]) === 0)) {
                local_d0 = s8(G.DAT_006554f8[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 1;
                iVar5 = FUN_004bd9f0(uVar4, s8(G.DAT_0064b527));
                if (iVar5 !== 0) {
                  local_d0 = local_d0 << 1;
                }
                local_1c = FUN_005adfa0(local_1c - local_d0, 0, 99);
              }
            }
            // LAB_0049f3ea — spy/diplomat flag handling
            if ((G.DAT_0064b1bd[local_f4 * 0x14] & 1) !== 0) {
              local_e8 = 0;
            }
            if ((local_80 !== 0) &&
              (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) || (G.DAT_0062ccc4 === 0))) {
              if (local_e8 === 1) {
                local_1c = (2 / local_80) >>> 0;
                if ((local_80 === 2) && (local_d8 < 2)) {
                  local_1c = -1;
                }
              } else if (local_80 === 2) {
                // goto LAB_0049ea9e — skip unit
                continue;
              }
            }
            uVar6 = local_1c;
            if (((local_e8 !== 1) && (local_e8 !== 5)) &&
              (uVar6 = local_1c << 1, local_f8 !== local_e8)) {
              uVar6 = local_1c << 2;
            }
            local_1c = uVar6;
            if (((local_f4 !== 9) ||
              ((local_80 === 0 && ((G.DAT_0064c9f2[uVar4 * 0x594 + local_fc] & 0x10) !== 0)))) &&
              ((s8(G.DAT_0064b1c1[local_f4 * 0x14]) !== 2 ||
                ((((iVar5 = FUN_0044272d(param_1, 0, 0), iVar5 !== 0x3f &&
                  ((G.DAT_0064f344[param_1 * 0x58] & 0x80) !== 0)) && (iVar5 !== 0)) &&
                  ((iVar8 = FUN_005b947f(iVar5), 1 < iVar8 ||
                    (((local_e8 !== 4 && (0x2f < s16(G.DAT_00666134, iVar5 * 0x10))) &&
                      (iVar5 < 0x3f)))))))))) {
              if (local_e8 === 4) {
                if (local_f8 === 4) {
                  local_1c = ((local_1c * 3) / 2) | 0;
                } else {
                  if ((local_f8 === 1) || (s8(G.DAT_0064c778[uVar4 * 0x594 + local_f4]) !== 0)) {
                    // goto LAB_0049ea9e
                    continue;
                  }
                  if (local_f4 !== 0x2b) {
                    local_1c = local_1c * 2 << (u8(local_b0) & 0x1f);
                  }
                }
              }
              if (local_e8 === 5) {
                iVar5 = FUN_0043d20a(param_1, 3);
                if ((iVar5 === 0) && (iVar5 = FUN_00453e51(uVar4, 0), iVar5 === 0)) {
                  local_378 = 6;
                } else {
                  local_378 = 4;
                }
                iVar5 = local_f4;
                if (aiStack_364[local_f4] <
                  (((G.DAT_0064c6b5[uVar4 * 0x594] & 0xff) + 1) / 2) | 0) {
                  cVar2 = s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]);
                } else {
                  cVar2 = s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]);
                }
                local_1c = ((local_378 - cVar2) - local_100) * local_1c;
                if (G.DAT_006a65d8 !== 0) {
                  local_11c = 8;
                  if (s8(G.DAT_0064f349[param_1 * 0x58]) < 4) {
                    local_11c = 0x10;
                  }
                  for (local_50 = 0; local_50 < G.DAT_006a65d8; local_50 = local_50 + 1) {
                    local_1c = local_1c + (local_50 + 1) * local_11c;
                  }
                }
                if (s8(G.DAT_0064f349[param_1 * 0x58]) < 2) {
                  local_1c = local_1c << 1;
                }
                if ((aiStack_364[local_f4] === 0) && (G.DAT_006a6608 === local_220)) {
                  local_1c = local_1c - ((local_1c / 2) | 0);
                }
                if (local_80 < 2) {
                  if (local_21c[local_f4] === 0) {
                    if ((G.DAT_0064c6b5[uVar4 * 0x594] & 0xff) < 5) {
                      if (1 < (G.DAT_0064c6b5[uVar4 * 0x594] & 0xff)) {
                        iVar5 = FUN_005adfa0((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) >> 1, 1, 3);
                        if (aiStack_364[local_f4] < iVar5) {
                          local_1c = (local_1c / 2) | 0;
                        }
                        if (aiStack_364[local_f4] <
                          (((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) / 5) | 0)) {
                          local_1c = (local_1c / 2) | 0;
                        }
                      }
                    } else {
                      iVar8 = FUN_005adfa0((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) - 1, 1, 6);
                      if (aiStack_364[iVar5] < iVar8) {
                        local_1c = (local_1c / 2) | 0;
                      }
                      if (aiStack_364[local_f4] <
                        ((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) >> 2)) {
                        local_1c = (local_1c / 2) | 0;
                      }
                    }
                  }
                  if (((aiStack_364[local_f4] === 0) && (local_21c[local_f4] === 0)) &&
                    (local_1c = (local_1c / 2) | 0, local_f8 !== 4)) {
                    local_10 = s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 3;
                    if (local_f8 === 1) {
                      local_10 = s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 2;
                    }
                    if (local_f8 === 5) {
                      local_10 = local_10 + 1;
                    }
                    if ((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) < local_10) {
                      local_1c = 0;
                    }
                  }
                }
              } else {
                local_1c = local_1c << 4;
              }
              local_1c = (s8(G.DAT_0064b1c8[local_f4 * 0x14]) + 2) * local_1c;
              if ((s8(G.DAT_0064b1c4[local_f4 * 0x14]) === 0) &&
                (s8(G.DAT_0064b1c5[local_f4 * 0x14]) === 0)) {
                local_1c = 0;
              } else {
                if ((G.DAT_00655ae8 & 0x10) === 0) {
                  local_38 = 2;
                } else {
                  local_38 = FUN_005adfa0(((s8(G.DAT_0064b1c6[local_f4 * 0x14]) / 10) | 0) +
                    s8(G.DAT_0064b1c7[local_f4 * 0x14]), 2, 4);
                }
                local_25c = (s8(G.DAT_0064b1c4[local_f4 * 0x14]) +
                  s8(G.DAT_0064b1c5[local_f4 * 0x14])) * local_38;
                if ((G.DAT_0064b1bd[local_f4 * 0x14] & 4) !== 0) {
                  local_25c = local_25c + 1;
                }
                if (local_f4 === 9) {
                  local_25c = local_25c + 1;
                }
                local_1c = (local_1c /
                  ((((s8(G.DAT_0064b1c2[local_f4 * 0x14]) /
                    (G.DAT_0064bcc8 & 0xff)) | 0) + 1) * local_25c / 2)) | 0;
              }
              if (local_e8 === 2) {
                if ((G.DAT_00655af0 & 4) !== 0) {
                  local_1c = local_1c - ((local_1c + (local_1c >> 0x1f & 3)) >> 2);
                }
                if ((local_f8 === 4) && (0 < local_1c)) {
                  local_1c = local_1c - ((local_1c + (local_1c >> 0x1f & 3)) >> 2);
                }
                if (local_b0 === 0) {
                  local_1c = local_1c << 1;
                } else {
                  local_1c = local_1c << 2;
                }
                iVar5 = FUN_0043d20a(param_1, 0x22);
                if (iVar5 !== 0) {
                  local_1c = local_1c - ((local_1c + (local_1c >> 0x1f & 3)) >> 2);
                }
              }
              if (s8(G.DAT_0064b1c1[local_f4 * 0x14]) === 1) {
                local_1c = local_1c << 1;
                iVar5 = FUN_0043d20a(param_1, 0x20);
                if (iVar5 !== 0) {
                  local_1c = local_1c - ((local_1c + (local_1c >> 0x1f & 3)) >> 2);
                }
              }
              if (local_e8 === 1) {
                local_1c = local_1c - (local_3c + 1 >> 1);
              }
              if (0x77 < local_124) {
                local_1c = local_1c << 2;
              }
              if ((local_80 === 0) && (local_e8 < 6)) {
                local_11c = 0;
                if ((G.DAT_006a6568 !== 0) && (G.DAT_006a65cc !== 0)) {
                  local_11c = (((3 - local_b0) * (G.DAT_006a6568 + 1) * local_1c) /
                    G.DAT_006a65cc) | 0;
                }
                if (local_e8 === 5) {
                  if ((((G.DAT_0064c778[uVar4 * 0x594 + local_f4] & 0xff) - local_4c) +
                    local_21c[local_f4] === 0) &&
                    (3 - s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) <
                      s8(G.DAT_0064f349[param_1 * 0x58]))) {
                    local_11c = 0;
                    if (G.DAT_006a65cc <=
                      ((-1 < s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) ? 1 : 0) +
                        G.DAT_006a6568 * 2)) {
                      local_1c = local_1c - ((local_1c / 3) | 0);
                    }
                  } else {
                    local_11c = (local_11c / 2) | 0;
                  }
                } else if (((local_b0 === 0) && (G.DAT_006a65cc <= G.DAT_006a660c)) ||
                  ((u16(G.DAT_0064c6a0, uVar4 * 0x594) & 2) === 0)) {
                  local_1c = local_1c << 1;
                }
                local_1c = local_1c + local_11c;
              }
              if (((local_e8 === 1) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) &&
                (G.DAT_0062ccc4 !== 0)) {
                local_1c = 999;
              }
              if ((local_1c < local_30) ||
                (((local_58 < 0 && ((G.DAT_0064f344[param_1 * 0x58] & 1) === 0)) &&
                  ((1 < local_80 ||
                    (((local_264 !== 0 && (local_d8 < 2)) &&
                      ((G.DAT_0064c9f2[uVar4 * 0x594 + local_fc] & 0x10) !== 0)))))))) {
                local_30 = local_1c;
                local_58 = local_f4;
              }
              if (local_1c < local_26c) {
                local_26c = local_1c;
                local_240 = local_f4;
              }
            } else if ((((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) < 2 ? 0 : 4) + 4) <=
              u16(G.DAT_0064c832, local_fc * 2 + uVar4 * 0x594)) {
              local_1c = (((G.DAT_0064c778[uVar4 * 0x594 + local_f4] & 0xff) +
                (G.DAT_0064c7f4[uVar4 * 0x594 + local_f4] & 0xff) * 2) *
                u16(G.DAT_0064c832, local_fc * 2 + uVar4 * 0x594)) /
                (local_124 + 1) | 0;
              if (((G.DAT_0064b1bd[local_f4 * 0x14] & 0x40) !== 0) &&
                (local_1c = local_1c - (G.DAT_0064c7a1[(G.DAT_00655c20 & 0xff) * 0x594] & 0xff),
                  local_1c < 1)) {
                local_1c = 0;
              }
              // goto LAB_0049f3ea — jump back to spy/diplomat handling above
              // LAB_0049f3ea — spy/diplomat flag handling (duplicate for goto target)
              if ((G.DAT_0064b1bd[local_f4 * 0x14] & 1) !== 0) {
                local_e8 = 0;
              }
              if ((local_80 !== 0) &&
                (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) || (G.DAT_0062ccc4 === 0))) {
                if (local_e8 === 1) {
                  local_1c = (2 / local_80) >>> 0;
                  if ((local_80 === 2) && (local_d8 < 2)) {
                    local_1c = -1;
                  }
                } else if (local_80 === 2) {
                  continue;
                }
              }
              uVar6 = local_1c;
              if (((local_e8 !== 1) && (local_e8 !== 5)) &&
                (uVar6 = local_1c << 1, local_f8 !== local_e8)) {
                uVar6 = local_1c << 2;
              }
              local_1c = uVar6;
              if (((local_f4 !== 9) ||
                ((local_80 === 0 && ((G.DAT_0064c9f2[uVar4 * 0x594 + local_fc] & 0x10) !== 0)))) &&
                ((s8(G.DAT_0064b1c1[local_f4 * 0x14]) !== 2 ||
                  ((((iVar5 = FUN_0044272d(param_1, 0, 0), iVar5 !== 0x3f &&
                    ((G.DAT_0064f344[param_1 * 0x58] & 0x80) !== 0)) && (iVar5 !== 0)) &&
                    ((iVar8 = FUN_005b947f(iVar5), 1 < iVar8 ||
                      (((local_e8 !== 4 && (0x2f < s16(G.DAT_00666134, iVar5 * 0x10))) &&
                        (iVar5 < 0x3f)))))))))) {
                if (local_e8 === 4) {
                  if (local_f8 === 4) {
                    local_1c = ((local_1c * 3) / 2) | 0;
                  } else {
                    if ((local_f8 === 1) || (s8(G.DAT_0064c778[uVar4 * 0x594 + local_f4]) !== 0)) {
                      continue;
                    }
                    if (local_f4 !== 0x2b) {
                      local_1c = local_1c * 2 << (u8(local_b0) & 0x1f);
                    }
                  }
                }
                if (local_e8 === 5) {
                  iVar5 = FUN_0043d20a(param_1, 3);
                  if ((iVar5 === 0) && (iVar5 = FUN_00453e51(uVar4, 0), iVar5 === 0)) {
                    local_378 = 6;
                  } else {
                    local_378 = 4;
                  }
                  iVar5 = local_f4;
                  if (aiStack_364[local_f4] <
                    (((G.DAT_0064c6b5[uVar4 * 0x594] & 0xff) + 1) / 2) | 0) {
                    cVar2 = s8(G.DAT_006554fa[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]);
                  } else {
                    cVar2 = s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]);
                  }
                  local_1c = ((local_378 - cVar2) - local_100) * local_1c;
                  if (G.DAT_006a65d8 !== 0) {
                    local_11c = 8;
                    if (s8(G.DAT_0064f349[param_1 * 0x58]) < 4) {
                      local_11c = 0x10;
                    }
                    for (local_50 = 0; local_50 < G.DAT_006a65d8; local_50 = local_50 + 1) {
                      local_1c = local_1c + (local_50 + 1) * local_11c;
                    }
                  }
                  if (s8(G.DAT_0064f349[param_1 * 0x58]) < 2) {
                    local_1c = local_1c << 1;
                  }
                  if ((aiStack_364[local_f4] === 0) && (G.DAT_006a6608 === local_220)) {
                    local_1c = local_1c - ((local_1c / 2) | 0);
                  }
                  if (local_80 < 2) {
                    if (local_21c[local_f4] === 0) {
                      if ((G.DAT_0064c6b5[uVar4 * 0x594] & 0xff) < 5) {
                        if (1 < (G.DAT_0064c6b5[uVar4 * 0x594] & 0xff)) {
                          iVar5 = FUN_005adfa0((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) >> 1, 1, 3);
                          if (aiStack_364[local_f4] < iVar5) {
                            local_1c = (local_1c / 2) | 0;
                          }
                          if (aiStack_364[local_f4] <
                            (((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) / 5) | 0)) {
                            local_1c = (local_1c / 2) | 0;
                          }
                        }
                      } else {
                        iVar8 = FUN_005adfa0((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) - 1, 1, 6);
                        if (aiStack_364[iVar5] < iVar8) {
                          local_1c = (local_1c / 2) | 0;
                        }
                        if (aiStack_364[local_f4] <
                          ((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) >> 2)) {
                          local_1c = (local_1c / 2) | 0;
                        }
                      }
                    }
                    if (((aiStack_364[local_f4] === 0) && (local_21c[local_f4] === 0)) &&
                      (local_1c = (local_1c / 2) | 0, local_f8 !== 4)) {
                      local_10 = s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 3;
                      if (local_f8 === 1) {
                        local_10 = s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) + 2;
                      }
                      if (local_f8 === 5) {
                        local_10 = local_10 + 1;
                      }
                      if ((G.DAT_0064c932[uVar4 * 0x594 + local_fc] & 0xff) < local_10) {
                        local_1c = 0;
                      }
                    }
                  }
                } else {
                  local_1c = local_1c << 4;
                }
                local_1c = (s8(G.DAT_0064b1c8[local_f4 * 0x14]) + 2) * local_1c;
                if ((s8(G.DAT_0064b1c4[local_f4 * 0x14]) === 0) &&
                  (s8(G.DAT_0064b1c5[local_f4 * 0x14]) === 0)) {
                  local_1c = 0;
                } else {
                  if ((G.DAT_00655ae8 & 0x10) === 0) {
                    local_38 = 2;
                  } else {
                    local_38 = FUN_005adfa0(((s8(G.DAT_0064b1c6[local_f4 * 0x14]) / 10) | 0) +
                      s8(G.DAT_0064b1c7[local_f4 * 0x14]), 2, 4);
                  }
                  local_25c = (s8(G.DAT_0064b1c4[local_f4 * 0x14]) +
                    s8(G.DAT_0064b1c5[local_f4 * 0x14])) * local_38;
                  if ((G.DAT_0064b1bd[local_f4 * 0x14] & 4) !== 0) {
                    local_25c = local_25c + 1;
                  }
                  if (local_f4 === 9) {
                    local_25c = local_25c + 1;
                  }
                  local_1c = (local_1c /
                    ((((s8(G.DAT_0064b1c2[local_f4 * 0x14]) /
                      (G.DAT_0064bcc8 & 0xff)) | 0) + 1) * local_25c / 2)) | 0;
                }
                if (local_e8 === 2) {
                  if ((G.DAT_00655af0 & 4) !== 0) {
                    local_1c = local_1c - ((local_1c + (local_1c >> 0x1f & 3)) >> 2);
                  }
                  if ((local_f8 === 4) && (0 < local_1c)) {
                    local_1c = local_1c - ((local_1c + (local_1c >> 0x1f & 3)) >> 2);
                  }
                  if (local_b0 === 0) {
                    local_1c = local_1c << 1;
                  } else {
                    local_1c = local_1c << 2;
                  }
                  iVar5 = FUN_0043d20a(param_1, 0x22);
                  if (iVar5 !== 0) {
                    local_1c = local_1c - ((local_1c + (local_1c >> 0x1f & 3)) >> 2);
                  }
                }
                if (s8(G.DAT_0064b1c1[local_f4 * 0x14]) === 1) {
                  local_1c = local_1c << 1;
                  iVar5 = FUN_0043d20a(param_1, 0x20);
                  if (iVar5 !== 0) {
                    local_1c = local_1c - ((local_1c + (local_1c >> 0x1f & 3)) >> 2);
                  }
                }
                if (local_e8 === 1) {
                  local_1c = local_1c - (local_3c + 1 >> 1);
                }
                if (0x77 < local_124) {
                  local_1c = local_1c << 2;
                }
                if ((local_80 === 0) && (local_e8 < 6)) {
                  local_11c = 0;
                  if ((G.DAT_006a6568 !== 0) && (G.DAT_006a65cc !== 0)) {
                    local_11c = (((3 - local_b0) * (G.DAT_006a6568 + 1) * local_1c) /
                      G.DAT_006a65cc) | 0;
                  }
                  if (local_e8 === 5) {
                    if ((((G.DAT_0064c778[uVar4 * 0x594 + local_f4] & 0xff) - local_4c) +
                      local_21c[local_f4] === 0) &&
                      (3 - s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) <
                        s8(G.DAT_0064f349[param_1 * 0x58]))) {
                      local_11c = 0;
                      if (G.DAT_006a65cc <=
                        ((-1 < s8(G.DAT_006554f9[s16(G.DAT_0064c6a6, uVar4 * 0x594) * 0x30]) ? 1 : 0) +
                          G.DAT_006a6568 * 2)) {
                        local_1c = local_1c - ((local_1c / 3) | 0);
                      }
                    } else {
                      local_11c = (local_11c / 2) | 0;
                    }
                  } else if (((local_b0 === 0) && (G.DAT_006a65cc <= G.DAT_006a660c)) ||
                    ((u16(G.DAT_0064c6a0, uVar4 * 0x594) & 2) === 0)) {
                    local_1c = local_1c << 1;
                  }
                  local_1c = local_1c + local_11c;
                }
                if (((local_e8 === 1) && ((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) !== 0)) &&
                  (G.DAT_0062ccc4 !== 0)) {
                  local_1c = 999;
                }
                if ((local_1c < local_30) ||
                  (((local_58 < 0 && ((G.DAT_0064f344[param_1 * 0x58] & 1) === 0)) &&
                    ((1 < local_80 ||
                      (((local_264 !== 0 && (local_d8 < 2)) &&
                        ((G.DAT_0064c9f2[uVar4 * 0x594 + local_fc] & 0x10) !== 0)))))))) {
                  local_30 = local_1c;
                  local_58 = local_f4;
                }
                if (local_1c < local_26c) {
                  local_26c = local_1c;
                  local_240 = local_f4;
                }
              }
            }
          }
        }
        // LAB_0049ea9e (loop continue target)
      }
    }
    if (local_58 === 999) {
      local_58 = -0x26;
    }
  } else if (local_58 === 999) {
    local_58 = -0x26;
  }

  if (param_3 != null && param_3 !== 0) {
    param_3[0] = local_254;
  }
  if (param_2 != null && param_2 !== 0) {
    param_2[0] = local_240;
  }
  if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) ||
    ((G.DAT_0064f344[param_1 * 0x58] & 0x10) === 0)) {
    if (((1 << (bVar1 & 0x1f) & G.DAT_00655b0b) === 0) && (G.DAT_0064f379[param_1 * 0x58] === 0xff)) {
      local_58 = -1;
    } else if ((local_58 < -0x26) && (iVar5 = FUN_0043d20a(param_1, 4), iVar5 === 0)) {
      local_58 = -4;
    } else if ((s8(G.DAT_0064f379[param_1 * 0x58]) < -0x26) &&
      (((local_f0 === 0 && (-0x27 < local_58)) &&
        ((G.DAT_0064f345[param_1 * 0x58] & 0x20) === 0)))) {
      if (s8(G.DAT_0064f379[param_1 * 0x58]) < 1) {
        local_380 = ~s8(G.DAT_0064f379[param_1 * 0x58]) + 1;
      } else {
        local_380 = s8(G.DAT_0064f379[param_1 * 0x58]);
      }
      local_74 = local_380 + -0x27;
      if (((local_80 < 2) && (iVar5 = FUN_00453da0(local_74), iVar5 === 0)) &&
        ((s16(G.DAT_00655be6, local_74 * 2) === -1 &&
          ((local_264 === 0 || ((G.DAT_0064f344[param_1 * 0x58] & 0x20) === 0)))))) {
        uVar9 = FUN_005b2e69(s16(G.DAT_0064f340, param_1 * 0x58),
          s16(G.DAT_0064f342, param_1 * 0x58), 1);
        iVar5 = FUN_005b53b6(uVar9);
        if (1 < iVar5) {
          local_58 = s8(G.DAT_0064f379[param_1 * 0x58]);
        }
      }
    }
  } else if ((G.DAT_0064f347[param_1 * 0x58] & 1) === 0) {
    if ((G.DAT_0064f347[param_1 * 0x58] & 2) === 0) {
      if (500 < local_30) {
        local_58 = 99;
      }
    } else if ((0x62 < local_254) || (local_58 = local_254, 500 < local_20)) {
      local_58 = 99;
    }
  } else if ((0x62 < local_240) || (local_58 = local_240, 500 < local_26c)) {
    local_58 = 99;
  }
  return local_58;
}


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
// These functions are called from this block but defined elsewhere.
// ═══════════════════════════════════════════════════════════════════

function send_msg_2F47() { return; }
function send_msg_3035() { return; }
function send_msg_2DC6() { return; }
function _strlen() { return 0; }
function _sprintf() { return; }
function _strcmp() { return 0; }
function __strcmpi() { return 0; }
function _rand() { return 0; }
function _fgetc() { return 0; }
function _fputc() { return; }
function FUN_00497c40_inner() { return; }
function _eh_vector_constructor_iterator_() { return; }
function _eh_vector_destructor_iterator_() { return; }
function FUN_005c19ad_inner() { return; }
function FUN_005c0f57_inner() { return; }
function FUN_00497d40_inner() { return; }
function FUN_00497cc0_inner() { return; }
function FUN_00497d00_inner() { return; }
