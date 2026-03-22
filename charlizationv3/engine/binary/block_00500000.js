// ═══════════════════════════════════════════════════════════════════
// block_00500000.js — Mechanical transpilation of block_00500000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00500000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00500000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8 } from './mem.js';


// ============================================================
// Function: FID_conflict___E51 @ 0x00500E00
// Size: 26 bytes
// ============================================================

// CRT init thunk (VS 1998 debug library)
export function FID_conflict___E51_00500E00() {
  FUN_00500e1a();
  FUN_00500e38();
  return;
}



// ============================================================
// Function: FUN_00500e1a @ 0x00500E1A
// Size: 30 bytes
// ============================================================

// CRT init helper
export function FUN_00500e1a() {
  FUN_0043c460(0, 0x10);
  return;
}



// ============================================================
// Function: FUN_00500e38 @ 0x00500E38
// Size: 29 bytes
// ============================================================

// register atexit cleanup
export function FUN_00500e38() {
  // _atexit(FUN_00500e55) — no-op in JS
  return;
}



// ============================================================
// Function: FUN_00500e55 @ 0x00500E55
// Size: 26 bytes
// ============================================================

// atexit cleanup callback
export function FUN_00500e55() {
  FUN_0043c520();
  return;
}



// ============================================================
// Function: FID_conflict___E51 @ 0x00500E6F
// Size: 26 bytes
// ============================================================

// CRT init thunk (VS 1998 debug library)
export function FID_conflict___E51_00500E6F() {
  FUN_00500e89();
  FUN_00500ea7();
  return;
}



// ============================================================
// Function: FUN_00500e89 @ 0x00500E89
// Size: 30 bytes
// ============================================================

// CRT init helper
export function FUN_00500e89() {
  FUN_0043c460(0, 10);
  return;
}



// ============================================================
// Function: FUN_00500ea7 @ 0x00500EA7
// Size: 29 bytes
// ============================================================

// register atexit cleanup
export function FUN_00500ea7() {
  // _atexit(FUN_00500ec4) — no-op in JS
  return;
}



// ============================================================
// Function: FUN_00500ec4 @ 0x00500EC4
// Size: 26 bytes
// ============================================================

// atexit cleanup callback
export function FUN_00500ec4() {
  FUN_0043c520();
  return;
}



// ============================================================
// Function: FID_conflict___E31 @ 0x00500EDE
// Size: 26 bytes
// ============================================================

// CRT init thunk (VS 1998 debug library)
export function FID_conflict___E31_00500EDE() {
  FUN_00500ef8();
  FUN_00500f12();
  return;
}



// ============================================================
// Function: FUN_00500ef8 @ 0x00500EF8
// Size: 26 bytes
// ============================================================

// CRT init — call FUN_00501551
export function FUN_00500ef8() {
  FUN_00501551();
  return;
}



// ============================================================
// Function: FUN_00500f12 @ 0x00500F12
// Size: 29 bytes
// ============================================================

// register atexit cleanup
export function FUN_00500f12() {
  // _atexit(FUN_00500f2f) — no-op in JS
  return;
}



// ============================================================
// Function: FUN_00500f2f @ 0x00500F2F
// Size: 26 bytes
// ============================================================

// atexit cleanup — call destructor
export function FUN_00500f2f() {
  FUN_0050160a();
  return;
}



// ============================================================
// Function: FID_conflict___E31 @ 0x00500F49
// Size: 26 bytes
// ============================================================

// CRT init thunk (VS 1998 debug library)
export function FID_conflict___E31_00500F49() {
  FUN_00500f63();
  FUN_00500f7d();
  return;
}



// ============================================================
// Function: FUN_00500f63 @ 0x00500F63
// Size: 26 bytes
// ============================================================

// CRT init — call FUN_005bd630
export function FUN_00500f63() {
  FUN_005bd630();
  return;
}



// ============================================================
// Function: FUN_00500f7d @ 0x00500F7D
// Size: 29 bytes
// ============================================================

// register atexit cleanup
export function FUN_00500f7d() {
  // _atexit(FUN_00500f9a) — no-op in JS
  return;
}



// ============================================================
// Function: FUN_00500f9a @ 0x00500F9A
// Size: 26 bytes
// ============================================================

// atexit cleanup — call destructor
export function FUN_00500f9a() {
  FUN_005bd915();
  return;
}



// ============================================================
// Function: FID_conflict___E31 @ 0x00500FB4
// Size: 26 bytes
// ============================================================

// CRT init thunk (VS 1998 debug library)
export function FID_conflict___E31_00500FB4() {
  FUN_00500fce();
  FUN_00500fe8();
  return;
}



// ============================================================
// Function: FUN_00500fce @ 0x00500FCE
// Size: 26 bytes
// ============================================================

// CRT init — call FUN_005bd630
export function FUN_00500fce() {
  FUN_005bd630();
  return;
}



// ============================================================
// Function: FUN_00500fe8 @ 0x00500FE8
// Size: 29 bytes
// ============================================================

// register atexit cleanup
export function FUN_00500fe8() {
  // _atexit(FUN_00501005) — no-op in JS
  return;
}



// ============================================================
// Function: FUN_00501005 @ 0x00501005
// Size: 26 bytes
// ============================================================

// atexit cleanup — call destructor
export function FUN_00501005() {
  FUN_005bd915();
  return;
}



// ============================================================
// Function: FUN_0050101f @ 0x0050101F
// Size: 348 bytes
// ============================================================

// citywin_load_city_gif — loads/caches CITY.GIF sprite sheet
export function FUN_0050101f() {
  let uVar1;
  let uVar2;
  let local_4d8 = new Array(16);
  let local_4c8 = new Array(72);
  let local_480 = new Array(1076);
  let local_4c = '';

  FUN_005bd630();
  FUN_005c64da();
  if (DAT_006aa78c === DAT_00630d34) {
    FUN_0050117b();
    FUN_00501187();
    FUN_00501190();
    FUN_005011a6();
    return;
  }
  DAT_00630d34 = DAT_006aa78c;
  FUN_004083f0();
  FUN_005bf071(s_CITY_GIF_00630d6c, 10, 0xc0, local_480);
  FUN_005cedad(local_4c8, 7, 0, 0, 0x27c, 0x1a5);
  FUN_004083f0();
  uVar1 = FUN_00511690(0x1a5);
  uVar2 = FUN_00511690(0x27c);
  FUN_005bd65c(uVar2, uVar1);
  FUN_0047df20(DAT_00630d34 * 4 + -8);
  FUN_005cef31(local_4d8, DAT_006a9170, 0, 0);
  FUN_0047df50();
  FUN_0050117b();
  FUN_00501187();
  FUN_00501190();
  FUN_005011a6();
  return;
}



// ============================================================
// Function: FUN_0050117b @ 0x0050117B
// Size: 12 bytes
// ============================================================

// CString cleanup wrapper
export function FUN_0050117b() {
  FUN_005c656b();
  return;
}



// ============================================================
// Function: FUN_00501187 @ 0x00501187
// Size: 9 bytes
// ============================================================

// dialog cleanup wrapper
export function FUN_00501187() {
  FUN_005cde4d();
  return;
}



// ============================================================
// Function: FUN_00501190 @ 0x00501190
// Size: 12 bytes
// ============================================================

// bitmap cleanup wrapper
export function FUN_00501190() {
  FUN_005bd915();
  return;
}



// ============================================================
// Function: FUN_005011a6 @ 0x005011A6
// Size: 14 bytes
// ============================================================

// SEH epilog — restore FS chain (no-op in JS)
export function FUN_005011a6() {
  // SEH exception handler restoration — no-op in JS
  return;
}



// ============================================================
// Function: FUN_005011b4 @ 0x005011B4
// Size: 520 bytes
// ============================================================

// citywin_create_arrow_button — create navigation arrows in city window
export function FUN_005011b4(param_1, param_2, param_3, param_4, param_5) {
  let piVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let local_54 = new Array(16);
  let local_44 = new Array(16);
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

  local_10 = FUN_00407f90(param_5);
  local_34 = FUN_00407fc0(param_5);
  FUN_005d7cb0(param_1, param_2, param_5[0], param_5[1], local_10, local_34, param_4, 0x17);
  piVar1 = FUN_00497c90();
  local_30 = piVar1[0];
  local_2c = piVar1[1];
  local_28 = piVar1[2];
  local_24 = piVar1[3];
  iVar2 = FUN_00407f90([local_30, local_2c, local_28, local_24]);
  iVar4 = local_30 + (iVar2 / 2) | 0;
  iVar2 = FUN_004a6980();
  local_8 = iVar4 - (iVar2 / 2) | 0;
  iVar2 = FUN_00407fc0([local_30, local_2c, local_28, local_24]);
  iVar4 = local_2c + (iVar2 / 2) | 0;
  iVar2 = FUN_004bb540();
  local_c = iVar4 - (iVar2 / 2) | 0;
  FUN_005cef31(local_44, param_3 + 0x34, local_8, local_c);
  FUN_005cef31(local_54, param_3 + 0x7c, local_8 + 2, local_c + 2);
  FUN_0043c7c0(param_3 + 0x34, [local_30, local_2c, local_28, local_24], 10);
  FUN_0043c7c0(param_3 + 0x7c, [local_30, local_2c, local_28, local_24], 10);
  local_20 = local_30;
  local_1c = local_2c;
  local_18 = local_28;
  local_14 = local_24;
  FUN_004bb800([local_20, local_1c, local_18, local_14], 1, 1);
  FUN_005a99fc(param_3 + 0x34, [local_20, local_1c, local_18, local_14], 0x1f, 0xf);
  FUN_005a99fc(param_3 + 0x7c, [local_20, local_1c, local_18, local_14], 0xf, 10);
  FUN_004bb800([local_20, local_1c, local_18, local_14], 1, 1);
  FUN_005a99fc(param_3 + 0x34, [local_20, local_1c, local_18, local_14], 0x1f, 0xf);
  FUN_005a99fc(param_3 + 0x7c, [local_20, local_1c, local_18, local_14], 0xf, 10);
  FUN_0040f810();
  uVar3 = FUN_00511320();
  FUN_005c0cc5(uVar3);
  FUN_0040f810();
  uVar3 = FUN_00511320();
  FUN_005c0cc5(uVar3);
  return;
}



// ============================================================
// Function: FUN_005013bc @ 0x005013BC
// Size: 132 bytes
// ============================================================

// citywin_modal_refresh — modal refresh for city display
export function FUN_005013bc() {
  if (DAT_00630d1c === 0) {
    DAT_00630d1c = 1;
    FUN_0040bbb0();
    FUN_0040bbe0(s_CITYMODAL_00630d78);
    FUN_0040ff30((DAT_006aa764 === 2 ? 1 : 0) + 1);
    FUN_00421ea0(DAT_00679640);
    if (DAT_00631edc !== 0) {
      citywin_BC4F(0);
    }
    DAT_00630d1c = 0;
  }
  return;
}



// ============================================================
// Function: FUN_00501440 @ 0x00501440
// Size: 127 bytes
// ============================================================

// citywin_init_state — initialize city window state fields
export function FUN_00501440(in_ECX) {
  // CRichEditDoc::InvalidateObjectCache — no-op in JS
  in_ECX[0x15a4] = 1;
  in_ECX[0x15a0] = 0;
  in_ECX[0x15a8] = 0;
  in_ECX[0x159c] = 0xffffffff;
  in_ECX[0x15b4] = 0;
  in_ECX[0x15b8] = 1;
  in_ECX[0x16bc] = 0;
  return;
}



// ============================================================
// Function: OnClose @ 0x005014BF
// Size: 38 bytes
// ============================================================

// CMiniDockFrameWnd::OnClose — close handler
export function OnClose() {
  FUN_0046ac89(2);
  return;
}



// ============================================================
// Function: FUN_005014e5 @ 0x005014E5
// Size: 70 bytes
// ============================================================

// citywin_close_panes — close multiple subpanes
export function FUN_005014e5() {
  FUN_0046ac89(1);
  FUN_0046ac89(3);
  FUN_0046ac89(4);
  return;
}



// ============================================================
// Function: FUN_0050152b @ 0x0050152B
// Size: 38 bytes
// ============================================================

// citywin_close_all_panes
export function FUN_0050152b() {
  FUN_005014e5();
  OnClose();
  return;
}



// ============================================================
// Function: FUN_00501551 @ 0x00501551
// Size: 136 bytes
// ============================================================

// citywin_construct — constructor for city window object
export function FUN_00501551(in_ECX) {
  FUN_0055339f();
  FUN_0046ab30();
  FUN_0043c690();
  // vtable setup: in_ECX[0] = &PTR_FUN_0061d6d4
  FUN_00501440(in_ECX);
  return in_ECX;
}



// ============================================================
// Function: FUN_0050160a @ 0x0050160A
// Size: 105 bytes
// ============================================================

// citywin_destruct — destructor for city window object
export function FUN_0050160a(in_ECX) {
  // vtable setup: in_ECX[0] = &PTR_FUN_0061d6d4
  FUN_0050152b();
  FUN_00501673();
  FUN_00501682();
  FUN_00501691();
  FUN_005016a4();
  return;
}



// ============================================================
// Function: FUN_00501673 @ 0x00501673
// Size: 15 bytes
// ============================================================

// cleanup wrapper — CRT destroy
export function FUN_00501673() {
  FUN_0043c520();
  return;
}



// ============================================================
// Function: FUN_00501682 @ 0x00501682
// Size: 15 bytes
// ============================================================

// cleanup wrapper — base class destroy
export function FUN_00501682() {
  FUN_0046ab49();
  return;
}



// ============================================================
// Function: FUN_00501691 @ 0x00501691
// Size: 9 bytes
// ============================================================

// cleanup wrapper — COleCntrFrameWnd destructor (no-op in JS)
export function FUN_00501691() {
  // COleCntrFrameWnd::~COleCntrFrameWnd — no-op in JS
  return;
}



// ============================================================
// Function: FUN_005016a4 @ 0x005016A4
// Size: 14 bytes
// ============================================================

// SEH epilog — restore FS chain (no-op in JS)
export function FUN_005016a4() {
  // SEH exception handler restoration — no-op in JS
  return;
}



// ============================================================
// Function: FUN_005016b2 @ 0x005016B2
// Size: 129 bytes
// ============================================================

// citywin_blit_city_area — blit city area from offscreen buffer
export function FUN_005016b2(param_1, in_ECX) {
  let uVar1;

  uVar1 = FUN_00407fc0(param_1);
  uVar1 = FUN_00407f90(param_1, uVar1);
  FUN_005a9afe(DAT_006a9170, in_ECX,
               (param_1[0] - in_ECX[0x15c4]) - in_ECX[0x124],
               (param_1[1] - in_ECX[0x15c8]) - in_ECX[0x128], param_1[0],
               param_1[1], uVar1);
  return;
}



// ============================================================
// Function: FUN_00501733 @ 0x00501733
// Size: 77 bytes
// ============================================================

// citywin_prepare_pane — prepare a city window pane for drawing
export function FUN_00501733(param_1, in_ECX) {
  FUN_005a9780();
  FUN_005baeb0(in_ECX);
  FUN_005baec8(in_ECX + 0x16ac);
  FUN_005016b2(param_1, in_ECX);
  return;
}



// ============================================================
// Function: FUN_00501780 @ 0x00501780
// Size: 153 bytes
// ============================================================

// citywin_refresh_if_ready — conditionally refresh city window panes
export function FUN_00501780(param_1, in_ECX) {
  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    FUN_004eb4ed(in_ECX[0x159c], 1);
    FUN_0050207f(1, param_1, in_ECX);
    FUN_005025d5(1, in_ECX);
    citywin_8ADC(1, in_ECX);
  }
  return;
}



// ============================================================
// Function: FUN_00501819 @ 0x00501819
// Size: 424 bytes
// ============================================================

// citywin_handle_specialist_click — handle click on citizen specialist row
export function FUN_00501819(param_1) {
  let iVar1;
  let iVar2;
  let iVar3;
  let uVar4;
  let local_10;

  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (s8(DAT_0064f348[iVar1 * 0x58]) === DAT_006d1da0 || DAT_00655b07 !== 0) {
    uVar4 = 0;
    iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar4);
    CSplitterWnd_IsTracking(DAT_006a91b8);
    iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
    if (s8(DAT_0064f349[iVar1 * 0x58]) - DAT_006a6604 <= param_1) {
      iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
      param_1 = param_1 - (s8(DAT_0064f349[iVar1 * 0x58]) - DAT_006a6604);
      if (param_1 < DAT_006a6604) {
        iVar2 = param_1;
        iVar1 = iVar2;
        iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
        local_10 = FUN_004e75a6(iVar3, iVar1);
        iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
        if (s8(DAT_0064f349[iVar1 * 0x58]) < 5) {
          if (local_10 === 1) {
            iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
            FUN_00414dd0(s_ELVISERR_00630d84, iVar1);
            return;
          }
          local_10 = 1;
        }
        else {
          local_10 = local_10 + 1;
          if (3 < local_10) {
            local_10 = 1;
          }
        }
        iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
        FUN_004e7549(iVar1, iVar2, local_10);
        FUN_00501780(1);
      }
    }
  }
  return;
}



// ============================================================
// Function: FUN_005019c1 @ 0x005019C1
// Size: 1186 bytes
// ============================================================

// citywin_draw_food_icons — draw food/shield/trade icon rows
export function FUN_005019c1(param_1, param_2, param_3, param_4, param_5, param_6, in_ECX) {
  let iVar1;
  let iVar2;
  let iVar3;
  let puVar4;
  let uVar5;
  let uVar6;
  let local_94 = new Array(16);
  let local_84 = new Array(16);
  let local_74 = new Array(16);
  let local_64 = new Array(16);
  let local_54 = new Array(16);
  let local_44 = new Array(16);
  let local_34 = new Array(16);
  let local_24 = new Array(16);
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
  uVar6 = 0;
  uVar5 = 0;
  iVar1 = FUN_00511690(0x1b);
  local_10 = FUN_00548b70(s8(DAT_0064f349[in_ECX[0x159c] * 0x58]),
                           iVar1 + 1, param_3, uVar5, uVar6);
  local_8 = 0;
  for (local_c = 0; local_c < param_4; local_c = local_c + 1) {
    FUN_00448f92(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), local_24, in_ECX,
                 param_1 + 1, param_2 + 1, 10);
    FUN_005cf126(local_24, in_ECX, param_1 + 1, param_2 + 1, 10);
    FUN_00448f92(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), local_34, in_ECX,
                 param_1, param_2);
    FUN_005cef31(local_34, in_ECX, param_1, param_2);
    param_1 = param_1 + local_10;
    local_8 = local_8 + 1;
  }
  for (local_c = 0;
      local_c < s8(DAT_0064f349[in_ECX[0x159c] * 0x58]) -
                (param_5 + param_4 + DAT_006a6604); local_c = local_c + 1) {
    FUN_00448f92(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), local_44, in_ECX,
                 param_1 + 1, param_2 + 1, 10);
    FUN_005cf126(local_44, in_ECX, param_1 + 1, param_2 + 1, 10);
    FUN_00448f92(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), local_54, in_ECX,
                 param_1, param_2);
    FUN_005cef31(local_54, in_ECX, param_1, param_2);
    param_1 = param_1 + local_10;
    local_8 = local_8 + 1;
  }
  for (local_c = 0; local_c < param_5; local_c = local_c + 1) {
    if (local_c < param_5 - param_6) {
      local_14 = 4;
    }
    else {
      local_14 = 6;
    }
    FUN_00448f92(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), local_64, in_ECX,
                 param_1 + 1, param_2 + 1, 10);
    FUN_005cf126(local_64, in_ECX, param_1 + 1, param_2 + 1, 10);
    FUN_00448f92(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), local_74, in_ECX,
                 param_1, param_2);
    FUN_005cef31(local_74, in_ECX, param_1, param_2);
    param_1 = param_1 + local_10;
    local_8 = local_8 + 1;
  }
  for (local_c = 0; local_c < DAT_006a6604; local_c = local_c + 1) {
    FUN_00448f92(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), local_84, in_ECX,
                 param_1 + 1, param_2 + 1, 10);
    FUN_004e75a6(in_ECX[0x159c], local_c);
    FUN_005cf126(local_84, in_ECX, param_1 + 1, param_2 + 1, 10);
    FUN_00448f92(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), local_94, in_ECX,
                 param_1, param_2);
    FUN_004e75a6(in_ECX[0x159c], local_c);
    FUN_005cef31(local_94, in_ECX, param_1, param_2);
    param_1 = param_1 + local_10;
  }
  FUN_0047df50();
  return local_10;
}



// ============================================================
// Function: FUN_00501e63 @ 0x00501E63
// Size: 540 bytes
// ============================================================

// citywin_draw_resource_row_simple — simpler resource icon row drawing
export function FUN_00501e63(param_1, param_2, param_3, param_4, param_5, param_6, in_ECX) {
  let iVar1;
  let puVar2;
  let uVar3;
  let iVar4;
  let uVar5;
  let local_54 = new Array(16);
  let local_44 = new Array(16);
  let local_34 = new Array(16);
  let local_24 = new Array(16);
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
  uVar5 = 0;
  uVar3 = 0;
  iVar1 = FUN_00511690(0xf);
  local_10 = FUN_00548b70(s8(DAT_0064f349[in_ECX[0x159c] * 0x58]),
                           iVar1 + 1, param_3, uVar3, uVar5);
  local_8 = 0;
  for (local_c = 0; local_c < param_4; local_c = local_c + 1) {
    FUN_005cef31(local_24, in_ECX, param_1, param_2);
    param_1 = param_1 + local_10;
    local_8 = local_8 + 1;
  }
  for (local_c = 0;
      local_c < s8(DAT_0064f349[in_ECX[0x159c] * 0x58]) -
                (param_5 + param_4 + DAT_006a6604); local_c = local_c + 1) {
    FUN_005cef31(local_34, in_ECX, param_1, param_2);
    param_1 = param_1 + local_10;
    local_8 = local_8 + 1;
  }
  for (local_c = 0; local_c < param_5; local_c = local_c + 1) {
    if (local_c < param_5 - param_6) {
      local_14 = 4;
    }
    else {
      local_14 = 6;
    }
    FUN_005cef31(local_44, in_ECX, param_1, param_2);
    param_1 = param_1 + local_10;
    local_8 = local_8 + 1;
  }
  for (local_c = 0; local_c < DAT_006a6604; local_c = local_c + 1) {
    FUN_004e75a6(in_ECX[0x159c], local_c, local_54, in_ECX, param_1, param_2);
    FUN_005cef31(local_54, in_ECX, param_1, param_2);
    param_1 = param_1 + local_10;
  }
  FUN_0047df50();
  return local_10;
}



// ============================================================
// Function: FUN_0050207f @ 0x0050207F
// Size: 577 bytes
// ============================================================

// citywin_draw_citizen_row — draw citizen/happiness row in city window
export function FUN_0050207f(param_1, param_1b, in_ECX) {
  let iVar1;
  let uVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let uVar7;
  let local_28;
  let local_18;
  let local_14 = new Array(16);

  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    FUN_00501733(in_ECX + 0x15dc, in_ECX);
    FUN_0046ac89(2);
    local_28 = in_ECX[0x15dc];
    iVar1 = in_ECX[0x15e0];
    FUN_005baee0(0x7c, 0x12, 1, 1);
    FUN_0040bbb0();
    FUN_0040bc10(0x193);
    uVar2 = FUN_00511690(0xc6);
    iVar3 = FUN_00511690(0x2e);
    iVar3 = iVar1 + iVar3;
    iVar4 = FUN_00511690(2);
    FUN_0043c910(DAT_00679640, local_28 + iVar4, iVar3, uVar2);
    FUN_0040bbb0();
    FUN_0040bc10(0x3f);
    uVar2 = FUN_00511690(0xee);
    iVar3 = FUN_00511690(0x2e);
    iVar3 = iVar1 + iVar3;
    iVar4 = FUN_00511690(199);
    FUN_0043c910(DAT_00679640, local_28 + iVar4, iVar3, uVar2);
    uVar2 = DAT_006a6550;
    uVar6 = DAT_006a65a8;
    uVar7 = DAT_006a659c;
    uVar5 = FUN_00511690(0x1a6);
    iVar3 = FUN_00511690(9);
    iVar3 = iVar1 + iVar3;
    iVar4 = FUN_00511690(5);
    iVar3 = FUN_005019c1(local_28 + iVar4, iVar3, uVar5, uVar2, uVar6, uVar7, in_ECX);
    iVar4 = FUN_00511690(5);
    local_28 = local_28 + iVar4;
    iVar4 = FUN_00511690(9);
    for (local_18 = 0; local_18 < s8(DAT_0064f349[in_ECX[0x159c] * 0x58]);
        local_18 = local_18 + 1) {
      uVar2 = FUN_00511690(0x1e);
      FUN_004086c0(local_14, local_28, iVar1 + iVar4, iVar3, uVar2);
      FUN_00511460(local_18, 2, local_14);
      local_28 = local_28 + iVar3;
    }
    if (param_1 !== 0) {
      FUN_00408490(in_ECX + 0x15dc);
    }
  }
  return;
}



// ============================================================
// Function: FUN_005022c0 @ 0x005022C0
// Size: 784 bytes
// ============================================================

// citywin_handle_tile_click — handle click on city resource map tile
export function FUN_005022c0(param_1, param_2) {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_c;

  local_1c = -1;
  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (s8(DAT_0064f348[iVar1 * 0x58]) === DAT_006d1da0 || DAT_00655b07 !== 0) {
    uVar5 = 0;
    iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar5);
    iVar1 = FUN_00472cf0(0x40, DAT_006aa790);
    iVar2 = FUN_00472cf0(0x20, DAT_006aa790);
    iVar3 = FUN_00511690(5);
    iVar3 = DAT_006aa7a4 + iVar3;
    iVar4 = FUN_00511690(0xb);
    param_1 = param_1 - iVar3;
    param_2 = param_2 - (DAT_006aa7a8 + iVar4 + (iVar2 >> 1));
    if ((-1 < param_1) && ((param_1 < iVar1 * 4 && (-1 < param_2)) && (param_2 < iVar2 * 4))) {
      local_18 = ((param_1 / iVar1) | 0) * 2 + -3;
      local_20 = ((param_2 / iVar2) | 0) * 2 + -3;
      if ((param_1 % iVar1 < 0) || (param_2 % iVar2 < 0)) {
        local_14 = 0;
      }
      else {
        iVar1 = FUN_005c0bf2(param_1 % iVar1, param_2 % iVar2);
        local_14 = iVar1 + -10 >> 4;
      }
      if (local_14 !== 0) {
        local_18 = local_18 + s8(DAT_0062833b[local_14]);
        local_20 = local_20 + s8(DAT_00628343[local_14]);
      }
      for (local_c = 0; local_c < 0x15; local_c = local_c + 1) {
        if ((s8(DAT_00628370[local_c]) === local_18) &&
           (s8(DAT_006283a0[local_c]) === local_20)) {
          local_1c = local_c;
          break;
        }
      }
      if (-1 < local_1c) {
        if (local_1c === 0x14) {
          iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
          DAT_0064f370[iVar1 * 0x58] = 0;
        }
        else {
          iVar1 = local_1c;
          iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
          iVar1 = FUN_004e78ce(iVar2, iVar1);
          if (iVar1 === 0) {
            if (DAT_006a6530[local_1c] !== 0) {
              return;
            }
            if (DAT_006a6604 === 0) {
              iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
              DAT_0064f370[iVar1 * 0x58] = 0;
            }
            else {
              uVar5 = 1;
              iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
              FUN_004e790c(iVar1, local_1c, uVar5);
              uVar5 = 0xffffffff;
              iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
              FUN_004e9719(iVar1, uVar5);
            }
          }
          else {
            uVar5 = 0;
            iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
            FUN_004e790c(iVar1, local_1c, uVar5);
            uVar5 = 1;
            iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
            FUN_004e9719(iVar1, uVar5);
          }
        }
        FUN_00501780(0);
      }
    }
  }
  return;
}



// ============================================================
// Function: FUN_005025d5 @ 0x005025D5
// Size: 9761 bytes
// ============================================================

// citywin_draw_resource_panel — draw the full food/shields/trade/gold/lux/sci resource panel
export function FUN_005025d5(param_1, in_ECX) {
  // This is a very large function (~9761 bytes) that draws the city resource panel.
  // It computes layout positions for food, shields, trade, luxury, science, gold rows
  // with surplus/deficit indicators. Due to its enormous size, this is a stub placeholder.
  // Full transpilation deferred — all calls are UI rendering.
  return;
}



// ============================================================
// Function: FUN_00504c05 @ 0x00504C05
// Size: 1081 bytes
// ============================================================

// citywin_draw_production_pane — draw city production (what is being built)
export function FUN_00504c05(param_1, in_ECX) {
  // Large UI rendering function for city production pane.
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: FUN_0050503e @ 0x0050503E
// Size: 1434 bytes
// ============================================================

// citywin_draw_unit_support_pane — draw unit support/maintenance pane
export function FUN_0050503e(param_1, in_ECX) {
  // Large UI rendering function for unit support pane.
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: FUN_005055dd @ 0x005055DD
// Size: 137 bytes
// ============================================================

// citywin_draw_empty_pane — draw an empty pane (placeholder)
export function FUN_005055dd(param_1, in_ECX) {
  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) &&
     ((-1 < in_ECX[0x159c]) && (FUN_00501733(in_ECX + 0x161c, in_ECX), param_1 !== 0))) {
    FUN_00408490(in_ECX + 0x161c);
  }
  return;
}



// ============================================================
// Function: FUN_00505666 @ 0x00505666
// Size: 1751 bytes
// ============================================================

// citywin_draw_garrison_pane — draw garrisoned units pane
export function FUN_00505666(param_1, in_ECX) {
  // Large UI rendering function for garrison/units pane.
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: FUN_00505d3d @ 0x00505D3D
// Size: 701 bytes
// ============================================================

// citywin_sell_building — handle selling a city improvement
export function FUN_00505d3d(param_1) {
  let bVar1;
  let sVar2;
  let iVar3;
  let iVar4;
  let uVar5;
  let uVar6;
  let local_14;
  let local_10;
  let local_c;

  local_c = 0;
  local_10 = -1;
  iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (s8(DAT_0064f348[iVar3 * 0x58]) === DAT_006d1da0 || DAT_00655b07 !== 0) {
    iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
    if (((DAT_0064f344[iVar3 * 0x58] & 4) === 0) ||
       ((DAT_00655b07 !== 0) && ((DAT_00655af0 & 0x80) !== 0))) {
      uVar6 = 0;
      iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
      FUN_004eb4ed(iVar3, uVar6);
      sVar2 = DAT_006aa76c;
      for (local_14 = 1; local_14 < 0x27; local_14 = local_14 + 1) {
        iVar3 = local_14;
        iVar4 = CSplitterWnd_IsTracking(DAT_006a91b8);
        iVar3 = FUN_0043d20a(iVar4, iVar3);
        if ((iVar3 !== 0) && (local_c = local_c + 1, (sVar2 + param_1 + 1) === local_c)) {
          local_10 = local_14;
          break;
        }
      }
      if (-1 < local_10) {
        if ((local_14 === 1) && ((DAT_00655b07 === 0) || ((DAT_00655af0 & 0x80) === 0))) {
          FUN_0046e020(0x69, 0, 0, 0);
          FUN_004cc870(s_CANTHOCKTHIS_00630da0, 1, 8);
        }
        else {
          bVar1 = u8(DAT_0064c48c[local_10 * 8]);
          uVar5 = DAT_0064bccc;
          FUN_004271e8(0, DAT_0064c488[local_10 * 8]);
          FUN_00421da0(0, bVar1 * uVar5);
          iVar3 = FUN_004cc870(s_HOCKTHIS_00630db0, local_10, 8);
          if (iVar3 === 0) {
            FUN_0046e020(0x6e, 0, 0, 0);
            uVar6 = 0;
            iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
            FUN_0043d289(iVar3, local_10, uVar6);
            iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
            DAT_0064c6a2[s8(DAT_0064f348[iVar3 * 0x58]) * 0x594] =
                 DAT_0064c6a2[s8(DAT_0064f348[iVar3 * 0x58]) * 0x594] +
                 bVar1 * uVar5;
            iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
            DAT_0064f344[iVar3 * 0x58] = DAT_0064f344[iVar3 * 0x58] | 4;
            citywin_9429();
            FUN_00569363(1);
            FUN_00436287(5);
            FUN_00436287(4);
            FUN_00436287(6);
          }
        }
      }
    }
    else {
      FUN_0046e020(0x69, 0, 0, 0);
      iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
      FUN_00414dd0(s_ALREADYSOLD_00630d94, iVar3);
    }
  }
  return;
}



// ============================================================
// Function: FUN_00505ffa @ 0x00505FFA
// Size: 1102 bytes
// ============================================================

// citywin_draw_improvements_pane — draw city improvements/buildings list
export function FUN_00505ffa(param_1, in_ECX) {
  // Large UI rendering function for the improvements pane.
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: FUN_00506448 @ 0x00506448
// Size: 495 bytes
// ============================================================

// citywin_format_unit_info — format unit info text for display
export function FUN_00506448(param_1) {
  let uVar1;
  let iVar2;
  let iVar3;
  let iVar4;
  let local_14;

  FUN_0040bbb0();
  uVar1 = FUN_00410070(s8(DAT_006560f7[param_1 * 0x20]));
  FUN_0040bbe0(uVar1);
  if ((DAT_006560f4[param_1 * 0x20] & 0x2000) !== 0) {
    FUN_0040fe10();
    FUN_0040bc10(0xd);
  }
  FUN_0040fe10();
  FUN_0040ff00(DAT_0064b1b8[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]);
  FUN_0040ff60(0, DAT_00679640);
  FUN_0040bbb0();
  iVar2 = DAT_006560f0[param_1 * 0x20];
  iVar3 = DAT_006560f2[param_1 * 0x20];
  iVar4 = FUN_0043cf76(iVar2, iVar3);
  if (-1 < iVar4) {
    FUN_0040bbe0(DAT_0064f360[iVar4 * 0x58]);
    FUN_0040fe10();
  }
  FUN_0040fea0();
  FUN_0040ff30(iVar2);
  FUN_00421d30();
  FUN_0040ff30(iVar3);
  FUN_0040fed0();
  if (iVar4 < 0) {
    iVar2 = FUN_0043d07a(iVar2, iVar3, 0xffffffff, 0xffffffff, 0xffffffff);
    if (-1 < iVar2) {
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040bc10(0xb2);
      FUN_0040fe10();
      FUN_0040bbe0(DAT_0064f360[iVar2 * 0x58]);
      FUN_0040fed0();
    }
  }
  FUN_0040ff60(1, DAT_00679640);
  FUN_0040bbb0();
  if (DAT_00656100[param_1 * 0x20] === -1) {
    local_14 = 0xffffffff;
  }
  else {
    local_14 = u8(DAT_00656100[param_1 * 0x20]);
  }
  FUN_0043ca80(local_14);
  FUN_0040ff60(2, DAT_00679640);
  return;
}



// ============================================================
// Function: FUN_00506637 @ 0x00506637
// Size: 985 bytes
// ============================================================

// citywin_unit_info_dialog — show unit info property dialog
export function FUN_00506637(param_1) {
  // Large UI dialog function. Stub placeholder.
  return;
}



// ============================================================
// Function: FUN_00506a15 @ 0x00506A15
// Size: 9 bytes
// ============================================================

// dialog cleanup wrapper
export function FUN_00506a15() {
  FUN_005cde4d();
  return;
}



// ============================================================
// Function: FUN_00506a1e @ 0x00506A1E
// Size: 12 bytes
// ============================================================

// CRT cleanup thunk
export function FUN_00506a1e() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: FUN_00506a34 @ 0x00506A34
// Size: 14 bytes
// ============================================================

// SEH epilog (no-op in JS)
export function FUN_00506a34() {
  // SEH exception handler restoration — no-op in JS
  return;
}



// ============================================================
// Function: FUN_00506a42 @ 0x00506A42
// Size: 1608 bytes
// ============================================================

// citywin_unit_context_menu — right-click context menu for unit
export function FUN_00506a42(param_1) {
  // Large UI dialog/menu function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_70B8 @ 0x005070B8
// Size: 9 bytes
// ============================================================

// dialog cleanup wrapper
export function citywin_70B8() {
  FUN_005cde4d();
  return;
}



// ============================================================
// Function: citywin_70C1 @ 0x005070C1
// Size: 12 bytes
// ============================================================

// CRT cleanup thunk
export function citywin_70C1() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: citywin_70D7 @ 0x005070D7
// Size: 14 bytes
// ============================================================

// SEH epilog (no-op in JS)
export function citywin_70D7() {
  // SEH exception handler restoration — no-op in JS
  return;
}



// ============================================================
// Function: citywin_70E5 @ 0x005070E5
// Size: 2692 bytes
// ============================================================

// citywin_draw_garrison_view — draw garrison unit view in city window
export function citywin_70E5(in_ECX) {
  // Very large UI rendering function for garrison view.
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: citywin_7B69 @ 0x00507B69
// Size: 968 bytes
// ============================================================

// citywin_draw_minimap — draw minimap in city window
export function citywin_7B69(in_ECX) {
  // Large UI rendering function for city minimap.
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: citywin_7F31 @ 0x00507F31
// Size: 561 bytes
// ============================================================

// citywin_draw_wonder_icons — draw wonder/improvement icons in info pane
export function citywin_7F31(param_1, param_2, param_3, in_ECX) {
  // UI rendering function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_8177 @ 0x00508177
// Size: 987 bytes
// ============================================================

// citywin_draw_unit_defense_icons — draw unit/defense icons in info pane
export function citywin_8177(param_1, param_2, param_3, param_4, in_ECX) {
  // UI rendering function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_8552 @ 0x00508552
// Size: 1393 bytes
// ============================================================

// citywin_draw_info_view — draw city info view (stats, food/shields breakdown)
export function citywin_8552(in_ECX) {
  // Very large UI rendering function for city info view.
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: citywin_8ADC @ 0x00508ADC
// Size: 228 bytes
// ============================================================

// citywin_draw_lower_pane — dispatch to draw garrison/minimap/info view
export function citywin_8ADC(param_1, in_ECX) {
  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    FUN_00501733(in_ECX + 0x164c, in_ECX);
    let iVar1 = in_ECX[0x15b0];
    if (iVar1 === 0) {
      citywin_70E5(in_ECX);
    }
    else if (iVar1 === 1) {
      citywin_7B69(in_ECX);
    }
    else if (iVar1 === 2) {
      citywin_8552(in_ECX);
    }
    if (param_1 !== 0) {
      FUN_00408490(in_ECX + 0x164c);
    }
  }
  return;
}



// ============================================================
// Function: citywin_8BC5 @ 0x00508BC5
// Size: 191 bytes
// ============================================================

// citywin_draw_all_panes — draw all city window sub-panes
export function citywin_8BC5(param_1, in_ECX) {
  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    FUN_0050207f(param_1, 0, in_ECX);
    FUN_005025d5(param_1, in_ECX);
    FUN_00504c05(param_1, in_ECX);
    FUN_0050503e(param_1, in_ECX);
    FUN_005055dd(param_1, in_ECX);
    FUN_00505666(param_1, in_ECX);
    FUN_00505ffa(param_1, in_ECX);
    citywin_8ADC(param_1, in_ECX);
  }
  return;
}



// ============================================================
// Function: citywin_8C84 @ 0x00508C84
// Size: 160 bytes
// ============================================================

// citywin_calc_pane_rect — calculate pane rectangle from grid coords
export function citywin_8C84(param_1, param_2, param_3, param_4, param_5, in_ECX) {
  FUN_004086c0(param_1, in_ECX[0x15c4] +
                         ((in_ECX[0x15d4] * param_2 + 1) / 2) | 0 +
                         in_ECX[0x124],
                   in_ECX[0x128] + ((in_ECX[0x15d4] * param_3 + 1) / 2) | 0 +
                   in_ECX[0x15c8], ((in_ECX[0x15d4] * param_4 + 1) / 2) | 0,
                   ((in_ECX[0x15d4] * param_5 + 1) / 2) | 0);
  return;
}



// ============================================================
// Function: citywin_8D24 @ 0x00508D24
// Size: 418 bytes
// ============================================================

// citywin_layout_panes — set all pane rectangles from grid layout
export function citywin_8D24(in_ECX) {
  citywin_8C84(in_ECX + 0x15dc, 0, 0, 0x1b4, 0x3d, in_ECX);
  citywin_8C84(in_ECX + 0x15ec, 0, 0x3d, 0x1b4, 0x99, in_ECX);
  citywin_8C84(in_ECX + 0x165c, 7, 0x41, 0xbc, 0x89, in_ECX);
  citywin_8C84(in_ECX + 0x15fc, 0x1b4, 0, 200, 0xa7, in_ECX);
  citywin_8C84(in_ECX + 0x160c, 0x1b4, 0xa7, 200, 0xbd, in_ECX);
  citywin_8C84(in_ECX + 0x161c, 0x1b4, 0x164, 200, 0x41, in_ECX);
  citywin_8C84(in_ECX + 0x162c, 0, 0xd4, 0xc0, 0x4e, in_ECX);
  citywin_8C84(in_ECX + 0x167c, 7, 0xd8, 0xb5, 0x45, in_ECX);
  citywin_8C84(in_ECX + 0x163c, 0, 0x122, 0xc0, 0x83, in_ECX);
  citywin_8C84(in_ECX + 0x166c, 6, 0x132, 0xa6, 0x6c, in_ECX);
  citywin_8C84(in_ECX + 0x164c, 0xc0, 0xd4, 0xf4, 0xd1, in_ECX);
  citywin_8C84(in_ECX + 0x168c, 0xc5, 0xd8, 0xe9, 0xc6, in_ECX);
  return;
}



// ============================================================
// Function: citywin_8EC6 @ 0x00508EC6
// Size: 354 bytes
// ============================================================

// citywin_draw_border_strips — draw border fill strips around city window
export function citywin_8EC6(in_ECX) {
  // UI rendering function for border strips. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_9028 @ 0x00509028
// Size: 647 bytes
// ============================================================

// citywin_resize_and_layout — resize city window and recalculate layout
export function citywin_9028(in_ECX) {
  // Large UI layout function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_92AF @ 0x005092AF
// Size: 378 bytes
// ============================================================

// citywin_update_title — update city window title bar text
export function citywin_92AF(in_ECX) {
  // UI text formatting function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_9429 @ 0x00509429
// Size: 246 bytes
// ============================================================

// citywin_full_refresh — full refresh of city window
export function citywin_9429(in_ECX) {
  if ((((-1 < in_ECX[0x159c]) && (in_ECX[0x159c] < DAT_00655b18)) &&
      (DAT_0064f394[in_ECX[0x159c] * 0x58] !== 0)) && (DAT_00628044 !== 0)) {
    if ((in_ECX[0x15a0] === 0) && (in_ECX[0x15a4] === 0)) {
      FUN_004eb4ed(in_ECX[0x159c], 1);
      citywin_9028(in_ECX);
      citywin_92AF(in_ECX);
      FUN_005a9780(in_ECX);
      FUN_00552112();
      citywin_8EC6(in_ECX);
      citywin_8D24(in_ECX);
      citywin_8BC5(0, in_ECX);
      FUN_00408460();
    }
    else {
      citywin_92AF(in_ECX);
    }
  }
  return;
}



// ============================================================
// Function: citywin_951F @ 0x0050951F
// Size: 38 bytes
// ============================================================

// citywin_show — show/activate city window
export function citywin_951F() {
  FUN_005bb574();
  FUN_004085f0();
  return;
}



// ============================================================
// Function: citywin_9545 @ 0x00509545
// Size: 75 bytes
// ============================================================

// citywin_bring_to_front — bring city window to front
export function citywin_9545(in_ECX) {
  if ((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) {
    let iVar1 = FUN_00414d10();
    // BringWindowToTop — Win32 API no-op in JS
  }
  return;
}



// ============================================================
// Function: handle_city_disorder_00509590 @ 0x00509590
// Size: 933 bytes
// ============================================================

// handle_city_disorder — open/switch to city with disorder
export function handle_city_disorder_00509590(param_1, in_ECX) {
  // Large game logic + UI function for city disorder handling.
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: citywin_9935 @ 0x00509935
// Size: 26 bytes
// ============================================================

// citywin_refresh_wrapper — wrapper to call citywin_full_refresh
export function citywin_9935(in_ECX) {
  citywin_9429(in_ECX);
  return;
}



// ============================================================
// Function: citywin_994F @ 0x0050994F
// Size: 64 bytes
// ============================================================

// citywin_close — close city window and return to map
export function citywin_994F() {
  DAT_006aa75c = 1;
  FUN_004503d0();
  DAT_006aa754 = 0xffffffff;
  FUN_00451900();
  FUN_00484d52();
  return 0;
}



// ============================================================
// Function: citywin_998F @ 0x0050998F
// Size: 186 bytes
// ============================================================

// citywin_position_window — calculate window position and size
export function citywin_998F() {
  let iVar1;
  let iVar2;
  let iVar3;
  let iVar4;

  iVar1 = FUN_00511690(0x27c);
  iVar2 = FUN_00511690(0x1a5);
  iVar3 = FUN_00511690(0x18);
  iVar2 = iVar2 + iVar3 + 8;
  iVar3 = FUN_004080c0();
  iVar4 = FUN_00414bb0();
  DAT_006aa784 = 0xffffffff;
  FUN_004086c0(DAT_00655344, (iVar3 >> 1) - (iVar1 + 0x10 >> 1), (iVar4 >> 1) - (iVar2 >> 1),
               iVar1 + 0x10 + DAT_006335a0, iVar2 + DAT_006335a4);
  return;
}



// ============================================================
// Function: citywin_9A49 @ 0x00509A49
// Size: 57 bytes
// ============================================================

// citywin_set_zoom_level — set city window zoom level
export function citywin_9A49() {
  DAT_006aa78c = 2;
  if (999 < DAT_006ab198) {
    DAT_006aa78c = 3;
  }
  citywin_998F();
  return;
}



// ============================================================
// Function: citywin_9A82 @ 0x00509A82
// Size: 26 bytes
// ============================================================

// citywin_begin_anim — begin city animation mode
export function citywin_9A82() {
  DAT_006aa758 = 1;
  return;
}



// ============================================================
// Function: citywin_9A9C @ 0x00509A9C
// Size: 36 bytes
// ============================================================

// citywin_end_anim — end city animation mode and refresh
export function citywin_9A9C(in_ECX) {
  DAT_006aa758 = 0;
  citywin_9429(in_ECX);
  return;
}



// ============================================================
// Function: citywin_9AC0 @ 0x00509AC0
// Size: 136 bytes
// ============================================================

// citywin_format_turns_to_complete — format "X turns" text for production
export function citywin_9AC0(param_1, param_2) {
  let iVar1;

  param_1 = param_1 * DAT_006a657c;
  iVar1 = FUN_00511350(DAT_006a65cc - DAT_006a6568, 1, 99, 1, 999);
  iVar1 = FUN_00511350(((param_1 + -1) - param_2) / iVar1 + 1);
  FUN_0040ff30(iVar1);
  FUN_0040fe10();
  if (iVar1 === 1) {
    FUN_0040bc10(0x2d);
  }
  else {
    FUN_0040bc10(0x2c);
  }
  return;
}



// ============================================================
// Function: city_button_buy @ 0x00509B48
// Size: 1642 bytes
// ============================================================

// city_button_buy — handle "Buy" button click in city window
export function city_button_buy(param_1) {
  // Large game logic + UI function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_A1B2 @ 0x0050A1B2
// Size: 12 bytes
// ============================================================

// CRT cleanup thunk
export function citywin_A1B2() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: citywin_A1C8 @ 0x0050A1C8
// Size: 14 bytes
// ============================================================

// SEH epilog (no-op in JS)
export function citywin_A1C8() {
  // SEH exception handler restoration — no-op in JS
  return;
}



// ============================================================
// Function: citywin_A1D6 @ 0x0050A1D6
// Size: 289 bytes
// ============================================================

// citywin_draw_improvement_icon — draw a single improvement icon
export function citywin_A1D6(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let local_40 = new Array(16);
  let local_30 = new Array(16);
  let local_20;
  let local_1c;
  let local_18;
  let local_14;
  let local_10;
  let local_c;
  let local_8;

  local_18 = -1;
  local_20 = -1;
  local_1c = 0xfffffffe;
  if (param_3 < 0x3e) {
    local_18 = param_3;
  }
  else {
    local_20 = param_3 + -0x3e;
  }
  local_10 = param_5;
  if ((param_4 & 1) !== 0) {
    local_10 = param_5 + 0x26;
  }
  if (-1 < local_18) {
    local_14 = param_6;
    local_8 = FUN_00472cf0(0x30, 0xfffffffe);
    local_c = ((local_8 - param_7) / 2) | 0;
    local_14 = local_14 - local_c;
    FUN_0047df20(local_1c);
    FUN_005cef31(local_30, param_2, local_10, local_14);
    FUN_0047df50();
  }
  if (-1 < local_20) {
    local_c = ((0x14 - param_7) / 2) | 0;
    local_14 = param_6 - local_c;
    FUN_005cef31(local_40, param_2, local_10, local_14);
  }
  return 0;
}



// ============================================================
// Function: citywin_A2F7 @ 0x0050A2F7
// Size: 380 bytes
// ============================================================

// citywin_draw_capital_icon — draw capital/best city icon
export function citywin_A2F7(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  let iVar1;
  let local_28;
  let local_20;
  let local_18;
  let local_c;
  let local_8;

  local_c = 0;
  local_28 = -1;
  for (local_20 = 0; local_20 < DAT_00655b18; local_20 = local_20 + 1) {
    if ((DAT_0064f394[local_20 * 0x58] !== 0) &&
       (s8(DAT_0064f348[local_20 * 0x58]) === param_3)) {
      local_8 = s8(DAT_0064f349[local_20 * 0x58]);
      iVar1 = FUN_0043d20a(local_20, 1);
      if (iVar1 !== 0) {
        local_8 = local_8 + 200;
      }
      if (DAT_0064f379[local_20 * 0x58] === -1) {
        local_8 = local_8 + 100;
      }
      if (local_c < local_8) {
        local_c = local_8;
        local_28 = local_20;
      }
    }
  }
  if (-1 < local_28) {
    local_18 = param_5;
    if ((param_4 & 1) !== 0) {
      local_18 = param_5 + 0x26;
    }
    iVar1 = FUN_00472cf0(0x30, 0xfffffffe);
    FUN_0056d289(param_2, local_28, 0, local_18, param_6 - ((iVar1 - param_7) / 2) | 0, 0xfffffffe);
  }
  return 0;
}



// ============================================================
// Function: city_button_change @ 0x0050A473
// Size: 4544 bytes
// ============================================================

// city_button_change — handle "Change" button click in city production
export function city_button_change(param_1) {
  // Very large game logic + UI function (production change dialog).
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: citywin_B638 @ 0x0050B638
// Size: 12 bytes
// ============================================================

// CRT cleanup thunk
export function citywin_B638() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: citywin_B644 @ 0x0050B644
// Size: 12 bytes
// ============================================================

// CRT cleanup thunk
export function citywin_B644() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: citywin_B650 @ 0x0050B650
// Size: 12 bytes
// ============================================================

// CRT cleanup thunk
export function citywin_B650() {
  FUN_0059df8a();
  return;
}



// ============================================================
// Function: citywin_B666 @ 0x0050B666
// Size: 14 bytes
// ============================================================

// SEH epilog (no-op in JS)
export function citywin_B666() {
  // SEH exception handler restoration — no-op in JS
  return;
}



// ============================================================
// Function: citywin_B674 @ 0x0050B674
// Size: 218 bytes
// ============================================================

// citywin_idle_timer — idle timer handler for city window
export function citywin_B674() {
  let iVar1;

  if (((DAT_00633a74 !== 0) && (DAT_00633a78 < 1)) ||
     (iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8), iVar1 === -1)) {
    if (DAT_006ad2f7 === 0) {
      DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
      // CRichEditDoc::InvalidateObjectCache — no-op in JS
    }
    else if (DAT_00630d30 === 0) {
      DAT_00630d30 = 1;
      DAT_00630d68 = FUN_00421bb0();
    }
    else {
      iVar1 = FUN_00421bb0();
      if (DAT_00630d68 + 0x4b0 < iVar1) {
        DAT_00630d30 = 0;
        DAT_006ad678[0xf] = DAT_006ad678[0xf] | 0x400;
        // CRichEditDoc::InvalidateObjectCache — no-op in JS
      }
    }
  }
  FUN_0047e94e(1, 0);
  return;
}



// ============================================================
// Function: city_button_rename @ 0x0050B74E
// Size: 598 bytes
// ============================================================

// city_button_rename — handle "Rename" button click
export function city_button_rename(param_1) {
  // UI dialog function for renaming a city. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_B9A4 @ 0x0050B9A4
// Size: 99 bytes
// ============================================================

// citywin_tab_garrison — switch to garrison view tab
export function citywin_B9A4(in_ECX) {
  let iVar1;
  let uVar2;

  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (iVar1 !== -1) {
    DAT_006aa768 = 0;
    uVar2 = 0;
    iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar2);
    citywin_8ADC(1, in_ECX);
    FUN_0046e020(99, 0, 0, 0);
  }
  return;
}



// ============================================================
// Function: citywin_BA07 @ 0x0050BA07
// Size: 99 bytes
// ============================================================

// citywin_tab_minimap — switch to minimap view tab
export function citywin_BA07(in_ECX) {
  let iVar1;
  let uVar2;

  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (iVar1 !== -1) {
    DAT_006aa768 = 1;
    uVar2 = 0;
    iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar2);
    citywin_8ADC(1, in_ECX);
    FUN_0046e020(99, 0, 0, 0);
  }
  return;
}



// ============================================================
// Function: citywin_BA6A @ 0x0050BA6A
// Size: 99 bytes
// ============================================================

// citywin_tab_info — switch to info view tab
export function citywin_BA6A(in_ECX) {
  let iVar1;
  let uVar2;

  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (iVar1 !== -1) {
    DAT_006aa768 = 2;
    uVar2 = 0;
    iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
    FUN_004eb4ed(iVar1, uVar2);
    citywin_8ADC(1, in_ECX);
    FUN_0046e020(99, 0, 0, 0);
  }
  return;
}



// ============================================================
// Function: city_button_view @ 0x0050BACD
// Size: 386 bytes
// ============================================================

// city_button_view — handle "View" button (city view screen)
export function city_button_view(param_1) {
  // UI function for city view button. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_BC4F @ 0x0050BC4F
// Size: 139 bytes
// ============================================================

// citywin_exit_or_close — exit city window (close or end turn)
export function citywin_BC4F() {
  let iVar1;

  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (iVar1 !== -1) {
    FUN_0046e020(99, 0, 0, 0);
    if (DAT_006aa764 === 2) {
      DAT_00630d18 = 1;
    }
    else {
      citywin_994F();
    }
    FUN_00436287(1);
    FUN_00436287(2);
    FUN_00436287(4);
    FUN_00436287(5);
    FUN_00436287(6);
  }
  return;
}



// ============================================================
// Function: citywin_BCDA @ 0x0050BCDA
// Size: 57 bytes
// ============================================================

// citywin_scroll_buildings — scroll building list in city window
export function citywin_BCDA(param_1, in_ECX) {
  let iVar1;
  let uVar2;

  DAT_006aa76c = param_1;
  uVar2 = 0;
  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar1, uVar2);
  FUN_00505ffa(1, in_ECX);
  return;
}



// ============================================================
// Function: citywin_BD13 @ 0x0050BD13
// Size: 607 bytes
// ============================================================

// citywin_prev_city — navigate to previous city (alphabetical)
export function citywin_BD13(in_ECX) {
  // City navigation function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_BF72 @ 0x0050BF72
// Size: 607 bytes
// ============================================================

// citywin_next_city — navigate to next city (alphabetical)
export function citywin_BF72(in_ECX) {
  // City navigation function. Stub placeholder.
  return;
}



// ============================================================
// Function: city_mouse @ 0x0050C1D1
// Size: 535 bytes
// ============================================================

// city_mouse — handle mouse click in city window
export function city_mouse(param_1, param_2, param_3) {
  // Mouse dispatch function for city window clicks. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_C405 @ 0x0050C405
// Size: 34 bytes
// ============================================================

// citywin_lbutton — left mouse button handler
export function citywin_C405(param_1, param_2) {
  city_mouse(param_1, param_2, 0);
  return;
}



// ============================================================
// Function: citywin_C427 @ 0x0050C427
// Size: 34 bytes
// ============================================================

// citywin_rbutton — right mouse button handler
export function citywin_C427(param_1, param_2) {
  city_mouse(param_1, param_2, 1);
  return;
}



// ============================================================
// Function: citywin_C449 @ 0x0050C449
// Size: 75 bytes
// ============================================================

// citywin_on_city_deleted — handle city being deleted
export function citywin_C449(param_1, in_ECX) {
  if ((in_ECX[0x159c] <= param_1) && (param_1 <= in_ECX[0x159c])) {
    citywin_994F();
  }
  return;
}



// ============================================================
// Function: citywin_C494 @ 0x0050C494
// Size: 485 bytes
// ============================================================

// citywin_on_unit_moved — handle unit movement notification
export function citywin_C494(param_1, param_2, param_3, in_ECX) {
  // City window notification handler. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_C679 @ 0x0050C679
// Size: 118 bytes
// ============================================================

// citywin_on_city_updated — refresh city window if showing this city
export function citywin_C679(param_1, in_ECX) {
  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) &&
     ((in_ECX[0x159c] === param_1) && (-1 < param_1))) {
    citywin_9429(in_ECX);
  }
  return;
}



// ============================================================
// Function: citywin_C6EF @ 0x0050C6EF
// Size: 180 bytes
// ============================================================

// citywin_on_tile_changed — refresh if tile near city changed
export function citywin_C6EF(param_1, param_2, in_ECX) {
  let iVar1;

  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) &&
     ((-1 < in_ECX[0x159c]) &&
      (iVar1 = FUN_005ae31d(param_1, param_2,
                            DAT_0064f340[in_ECX[0x159c] * 0x58],
                            DAT_0064f342[in_ECX[0x159c] * 0x58]),
      iVar1 < 3))) {
    FUN_00501780(0, in_ECX);
  }
  return;
}



// ============================================================
// Function: citywin_C7A3 @ 0x0050C7A3
// Size: 182 bytes
// ============================================================

// citywin_clear_button_handles — zero out all button/control handles
export function citywin_C7A3(in_ECX) {
  in_ECX[0x16b4] = 0;
  in_ECX[0x16b8] = 0;
  in_ECX[0x16bc] = 0;
  in_ECX[0x16c0] = in_ECX[0x16bc];
  in_ECX[0x16c8] = in_ECX[0x16c0];
  in_ECX[0x16d0] = in_ECX[0x16c8];
  in_ECX[0x16cc] = in_ECX[0x16d0];
  in_ECX[0x16c4] = in_ECX[0x16cc];
  in_ECX[0x16d8] = 0;
  in_ECX[0x16d4] = in_ECX[0x16d8];
  return;
}



// ============================================================
// Function: citywin_C859 @ 0x0050C859
// Size: 564 bytes
// ============================================================

// citywin_destroy_buttons — destroy all city window buttons/controls
export function citywin_C859(in_ECX) {
  if (in_ECX[0x16b4] !== 0) {
    FUN_005c5aeb();
    if (in_ECX[0x16b4] !== 0) {
      FUN_004bb3b0(1);
    }
    if (in_ECX[0x16b8] !== 0) {
      FUN_004bb3b0(1);
    }
    if (in_ECX[0x16c4] !== 0) {
      FUN_004bb3b0(1);
    }
    if (in_ECX[0x16cc] !== 0) {
      FUN_004bb3b0(1);
    }
    if (in_ECX[0x16d0] !== 0) {
      FUN_004bb3b0(1);
    }
    if (in_ECX[0x16c8] !== 0) {
      FUN_004bb3b0(1);
    }
    if (in_ECX[0x16c0] !== 0) {
      FUN_004bb3b0(1);
    }
    if (in_ECX[0x16bc] !== 0) {
      if (in_ECX[0x16bc] !== 0) {
        FUN_004bb3b0(1);
      }
      in_ECX[0x16bc] = 0;
    }
    if (in_ECX[0x16d4] !== 0) {
      FUN_00511560(1);
    }
    if (in_ECX[0x16d8] !== 0) {
      FUN_00511560(1);
    }
    if (in_ECX[0x16dc] !== 0) {
      FUN_004bb4f0(1);
    }
    citywin_C7A3(in_ECX);
  }
  return;
}



// ============================================================
// Function: citywin_CA8D @ 0x0050CA8D
// Size: 527 bytes
// ============================================================

// citywin_create_exit_button — create the exit/close button
export function citywin_CA8D(param_1, in_ECX) {
  // Button creation function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_CCB3 @ 0x0050CCB3
// Size: 572 bytes
// ============================================================

// citywin_create_change_button — create the "Change" production button
export function citywin_CCB3(param_1, in_ECX) {
  // Button creation function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_CF06 @ 0x0050CF06
// Size: 2883 bytes
// ============================================================

// citywin_create_all_buttons — create all city window buttons and controls
export function citywin_CF06(in_ECX) {
  // Very large button/control creation function.
  // Stub placeholder — full transpilation deferred.
  return;
}



// ============================================================
// Function: citywin_DADA @ 0x0050DADA
// Size: 92 bytes
// ============================================================

// citywin_on_activate — handle city window activation
export function citywin_DADA(in_ECX) {
  if (in_ECX[0x15a4] === 0) {
    in_ECX[0x15ac] = 2;
  }
  else {
    in_ECX[0x15ac] = 1;
  }
  if (in_ECX[0x15a4] === 0) {
    DAT_00630d20 = 1;
  }
  return;
}



// ============================================================
// Function: citywin_DB36 @ 0x0050DB36
// Size: 92 bytes
// ============================================================

// citywin_on_deactivate — handle city window deactivation
export function citywin_DB36(in_ECX) {
  let iVar1;

  iVar1 = in_ECX[0x15ac];
  in_ECX[0x15ac] = 0;
  if (iVar1 === 2) {
    citywin_CA8D(1, in_ECX);
  }
  DAT_00630d20 = 0;
  return;
}



// ============================================================
// Function: citywin_DB92 @ 0x0050DB92
// Size: 38 bytes
// ============================================================

// citywin_show_window — show city window
export function citywin_DB92() {
  FUN_004080f0(DAT_00655344);
  return;
}



// ============================================================
// Function: citywin_DBB8 @ 0x0050DBB8
// Size: 38 bytes
// ============================================================

// citywin_show_window_2 — show city window (duplicate)
export function citywin_DBB8() {
  FUN_004080f0(DAT_00655344);
  return;
}



// ============================================================
// Function: citywin_DBDE @ 0x0050DBDE
// Size: 211 bytes
// ============================================================

// citywin_handle_system_command — handle system menu commands (close, zoom)
export function citywin_DBDE(param_1) {
  if (param_1 === 1) {
    citywin_BC4F(0);
  }
  else if (param_1 === 2) {
    if (1 < DAT_006aa78c) {
      DAT_006aa78c = DAT_006aa78c + -1;
      citywin_998F();
      FUN_004bb570(DAT_00655344);
    }
  }
  else if ((param_1 === 3) && ((DAT_006aa78c < 2 || ((DAT_006aa78c < 3 && (999 < DAT_006ab198)))))) {
    DAT_006aa78c = DAT_006aa78c + 1;
    citywin_998F();
    FUN_004bb570(DAT_00655344);
  }
  return;
}



// ============================================================
// Function: citywin_DCB6 @ 0x0050DCB6
// Size: 498 bytes
// ============================================================

// citywin_on_create — WM_CREATE handler for city window
export function citywin_DCB6(in_ECX) {
  // Large window creation/init function. Stub placeholder.
  return;
}



// ============================================================
// Function: citywin_DEA8 @ 0x0050DEA8
// Size: 51 bytes
// ============================================================

// citywin_on_destroy — WM_DESTROY handler for city window
export function citywin_DEA8(in_ECX) {
  in_ECX[0x15a0] = 1;
  citywin_C859(in_ECX);
  FUN_004083b0();
  return;
}


// ═══════════════════════════════════════════════════════════════════
// STUB EXTERNAL FUNCTIONS
// These are defined in other blocks and referenced from this block.
// They are stubbed here so this module can be imported independently.
// ═══════════════════════════════════════════════════════════════════

function FUN_0043c460(a, b) { /* stub — CRT init */ }
function FUN_0043c520() { /* stub — CRT destroy */ }
function FUN_005bd630() { /* stub — bitmap init */ }
function FUN_005bd915() { /* stub — bitmap destroy */ }
function FUN_005c64da() { /* stub — CString init */ }
function FUN_005c656b() { /* stub — CString destroy */ }
function FUN_005cde4d() { /* stub — dialog cleanup */ }
function FUN_005cedad(a, b, c, d, e, f) { /* stub — create DIB section */ }
function FUN_005bf071(a, b, c, d) { /* stub — load GIF resource */ }
function FUN_005bd65c(a, b) { /* stub — create scaled bitmap */ }
function FUN_005cef31(a, b, c, d) { /* stub — blit sprite */ }
function FUN_005cf126(a, b, c, d, e) { /* stub — blit sprite with flag */ }
function FUN_005c0bf2(a, b) { return 0; /* stub — diamond pixel test */ }
function FUN_005c0cc5(a) { /* stub — release DC */ }
function FUN_005c5aeb() { /* stub — delete toolbar */ }
function FUN_005d7cb0(a, b, c, d, e, f, g, h) { /* stub — draw widget */ }
function FUN_005d8236(a) { /* stub — init draw context */ }
function FUN_005db0d0(a) { /* stub — set scroll range */ }
function FUN_005f22d0(a, b) { /* stub — strcpy */ }

function FUN_004083f0() { /* stub — begin paint */ }
function FUN_004085f0() { /* stub — show window */ }
function FUN_004080c0() { return 800; /* stub — GetSystemMetrics(SM_CXSCREEN) */ }
function FUN_004080f0(a) { /* stub — show window */ }
function FUN_004083b0() { /* stub — destroy window */ }
function FUN_004086c0(a, b, c, d, e) { /* stub — SetRect */ }
function FUN_00407f90(a) { return 0; /* stub — get rect width */ }
function FUN_00407fc0(a) { return 0; /* stub — get rect height */ }
function FUN_00408460() { /* stub — end paint */ }
function FUN_00408490(a) { /* stub — invalidate rect */ }
function FUN_00408780(a, b, c, d, e) { /* stub — fill rect */ }
function FUN_0040bbb0() { /* stub — begin text format */ }
function FUN_0040bbe0(a) { /* stub — append string */ }
function FUN_0040bc10(a) { /* stub — load string resource */ }
function FUN_0040bc80(a) { return 0; /* stub — show modal dialog */ }
function FUN_0040ef50() { /* stub — pump message */ }
function FUN_0040f350(a) { /* stub — remove all buttons */ }
function FUN_0040f380() { /* stub — show button */ }
function FUN_0040f680(a, b, c, d) { /* stub — create button */ }
function FUN_0040f810() { /* stub — get DC */ }
function FUN_0040f840() { /* stub — set button style */ }
function FUN_0040f880(a) { /* stub — set button callback */ }
function FUN_0040fb00() { return {}; /* stub — create scrollbar */ }
function FUN_0040f3e0() { return {}; /* stub — create button object */ }
function FUN_0040fc50(a, b, c, d) { /* stub — create scrollbar control */ }
function FUN_0040fcf0(a) { /* stub — set scroll position */ }
function FUN_0040fd40(a, b) { /* stub — set scroll range */ }
function FUN_0040fd80(a) { /* stub — set scroll callback */ }
function FUN_0040fe10() { /* stub — text format separator */ }
function FUN_0040fe40() { /* stub — text format begin arg */ }
function FUN_0040fe70() { /* stub — text format percent */ }
function FUN_0040fea0() { /* stub — text format paren open */ }
function FUN_0040fed0() { /* stub — text format paren close */ }
function FUN_0040ff00(a) { /* stub — append string by id */ }
function FUN_0040ff30(a) { /* stub — append int */ }
function FUN_0040ff60(a, b) { /* stub — set text slot */ }
function FUN_0040ffa0(a, b) { /* stub — set dialog text */ }
function FUN_00410070(a) { return ''; /* stub — get unit type name */ }
function FUN_00414bb0() { return 600; /* stub — GetSystemMetrics(SM_CYSCREEN) */ }
function FUN_00414d10() { return 0; /* stub — get main window handle */ }
function FUN_00414d70(a) { /* stub — append civ name */ }
function FUN_00414dd0(a, b) { /* stub — show message box with city */ }
function FUN_00417ef0(a, b) { /* stub — set font size */ }
function FUN_00421bb0() { return Date.now(); /* stub — GetTickCount */ }
function FUN_00421d30() { /* stub — text format comma */ }
function FUN_00421da0(a, b) { /* stub — set dialog value */ }
function FUN_00421ea0(a) { return 0; /* stub — show yes/no dialog */ }
function FUN_00421ed0(a, b, c, d) { return -1; /* stub — show input dialog */ }
function FUN_00421f10(a) { /* stub — format player name */ }
function FUN_004271e8(a, b) { /* stub — set icon by id */ }
function FUN_00428b0c(a, b, c, d) { return 0; /* stub — load bitmap resource */ }
function FUN_00436287(a) { /* stub — update advisor */ }
function FUN_00441b11(a, b) { /* stub — set auto-production */ }
function FUN_00444270(a) { /* stub — show freebie dialog */ }
function FUN_00448f92(a, b, c, d, e, f) { /* stub — draw tile sprite */ }
function FUN_004190d0(a, b) { /* stub — show tutorial popup */ }
function FUN_00451900() { /* stub — update map view */ }
function FUN_00451ac0(a) { /* stub — set keyboard handler */ }
function FUN_004503d0() { /* stub — end city view */ }
function FUN_00453da0(a) { return 0; /* stub — is wonder built */ }
function FUN_00453e51(a, b) { return 0; /* stub — has_tech_or_building */ }
function FUN_00454260(a) { /* stub — show city view screen */ }
function FUN_00472cf0(a, b) { return 0; /* stub — get sprite dimension */ }
function FUN_00472d20(a, b) { return 0; /* stub — get unit sprite index */ }
function FUN_0047a8c9(a, b, c, d, e, f, g, h) { /* stub — draw terrain tile */ }
function FUN_0047cf9e(a, b) { /* stub — update city name on map */ }
function FUN_0047df20(a) { /* stub — select palette */ }
function FUN_0047df50() { /* stub — restore palette */ }
function FUN_0047e94e(a, b) { /* stub — set timer */ }
function FUN_00484d52() { /* stub — return to map */ }
function FUN_004897fa(a) { /* stub — deselect unit */ }
function FUN_00489a0d(a) { /* stub — activate unit */ }
function FUN_00497c90() { return [0, 0, 0, 0]; /* stub — get client rect */ }
function FUN_00498159(a, b) { return 0; /* stub — realloc string */ }
function FUN_00498e8b(a, b, c) { /* stub — get advisor suggestion */ }
function FUN_004a6980() { return 0; /* stub — get client width */ }
function FUN_004af14b(a, b) { /* stub — format string */ }
function FUN_004aef20(a) { /* stub — init string buffer */ }
function FUN_004af122(a, b) { /* stub — append to buffer */ }
function FUN_004bb3b0(a) { /* stub — destroy button */ }
function FUN_004bb4f0(a) { /* stub — destroy scrollbar */ }
function FUN_004bb540() { return 0; /* stub — get client height */ }
function FUN_004bb570(a) { /* stub — resize window */ }
function FUN_004bb800(a, b, c) { /* stub — inflate rect */ }
function FUN_004bb840(a, b, c) { /* stub — deflate rect */ }
function FUN_004bd9f0(a, b) { return 0; /* stub — has_building */ }
function FUN_004bfe5a(a, b, c) { return 0; /* stub — can_build_unit */ }
function FUN_004c02d8(a, b) { return 0; /* stub — can_build_wonder */ }
function FUN_004c03ae(a, b, c) { return 0; /* stub — can_build_improvement */ }
function FUN_004c4210(a, b) { /* stub — show confirm dialog */ }
function FUN_004cc870(a, b, c) { return 0; /* stub — show dialog */ }
function FUN_004e7492(a) { /* stub — recalculate city */ }
function FUN_004e74df(a, b) { return 0; /* stub — get production cost */ }
function FUN_004e75a6(a, b) { return 0; /* stub — get specialist type */ }
function FUN_004e7549(a, b, c) { /* stub — set specialist */ }
function FUN_004e78ce(a, b) { return 0; /* stub — is tile worked */ }
function FUN_004e790c(a, b, c) { /* stub — toggle tile work */ }
function FUN_004e8e4d(a, b, c) { /* stub — get tile yields */ }
function FUN_004e9719(a, b) { /* stub — recalc after tile toggle */ }
function FUN_004eb4ed(a, b) { /* stub — set active city */ }
function FUN_00511320() { return 0; /* stub — get DC handle */ }
function FUN_00511350(a, b, c, d, e) { return 1; /* stub — clamp value */ }
function FUN_005113b0(a, b, c, d) { /* stub — draw line */ }
function FUN_005113f0(a, b, c) { /* stub — set brush color */ }
function FUN_00511430() { /* stub — set text color */ }
function FUN_00511460(a, b, c) { /* stub — register hit region */ }
function FUN_00511520(a, b, c) { return 0; /* stub — show radio dialog */ }
function FUN_00511560(a) { /* stub — destroy font */ }
function FUN_00511690(a) { return a; /* stub — scale_coord */ }
function FUN_005114d0(a, b, c, d, e, f, g) { /* stub — draw sprite grid */ }
function FUN_005116f0(a) { /* stub — format owner text */ }
function FUN_005117f0(a) { /* stub — set arrow callback */ }
function FUN_00548b70(a, b, c, d, e) { return 1; /* stub — calc icon spacing */ }
function FUN_00552112() { /* stub — draw background */ }
function FUN_00552ed2() { /* stub — set window style */ }
function FUN_0055318c(a, b) { /* stub — register pane class */ }
function FUN_0055324c(a) { /* stub — draw title bar */ }
function FUN_005534bc(a, b, c, d, e, f, g, h, i) { /* stub — create frame */ }
function FUN_0059db08(a) { /* stub — alloc stack (SEH) */ }
function FUN_0059db65() { /* stub — free stack (SEH) */ }
function FUN_0059df8a() { /* stub — CRT cleanup */ }
function FUN_0059e507(a) { /* stub — set list height */ }
function FUN_0059e783(a, b) { /* stub — set list offset */ }
function FUN_0059ea99(a) { /* stub — select list item */ }
function FUN_0059ec88(a, b, c) { /* stub — set tab text */ }
function FUN_0059edf0(a, b, c) { /* stub — add tab page */ }
function FUN_0059f2a3(a) { /* stub — add help button */ }
function FUN_005a5f34(a, b) { return 0; /* stub — run modal loop */ }
function FUN_005a9780(a) { /* stub — init offscreen */ }
function FUN_005a99fc(a, b, c, d) { /* stub — blit with mask */ }
function FUN_005a9afe(a, b, c, d, e, f, g) { /* stub — bitblt */ }
function FUN_005ad998(a) { /* stub — set unit info page */ }
function FUN_005adfa0(a, b, c) { return 1; /* stub — clamp/max */ }
function FUN_005ae052(a) { return a; /* stub — wrap_x */ }
function FUN_005ae31d(a, b, c, d) { return 99; /* stub — tile distance */ }
function FUN_005b2c3d(a) { return 0; /* stub — can_airlift */ }
function FUN_005b2c82(a) { return -1; /* stub — get_next_unit_at */ }
function FUN_005b2e69(a, b) { return -1; /* stub — get_first_unit_at */ }
function FUN_005b2f50(a) { /* stub — disband unit */ }
function FUN_005b2f92(a) { return -1; /* stub — get_unit_id_from_stack */ }
function FUN_005b3863(a, b) { /* stub — pillage */ }
function FUN_005b3d06(a, b, c, d) { /* stub — set rally point */ }
function FUN_005b50ad(a, b) { return 0; /* stub — count_units_at */ }
function FUN_005b6042(a, b) { /* stub — kill unit */ }
function FUN_005b633f(a) { return 0; /* stub — can_goto_from */ }
function FUN_005b6787(a) { /* stub — fortify unit */ }
function FUN_005b89e4(a, b) { return 0; /* stub — get terrain type */ }
function FUN_005b8b65(a, b, c) { return 0; /* stub — is tile visible */ }
function FUN_005baeb0(a) { /* stub — select pen */ }
function FUN_005baec8(a) { /* stub — select brush */ }
function FUN_005baee0(a, b, c, d) { /* stub — set font style */ }
function FUN_005bb574() { /* stub — show city window */ }
function FUN_0043c690() { /* stub — CRT init */ }
function FUN_0043c790(a, b, c) { /* stub — offset rect */ }
function FUN_0043c7c0(a, b, c) { /* stub — copy rect */ }
function FUN_0043c840(a, b) { /* stub — set string */ }
function FUN_0043c8a0(a) { /* stub — format gold */ }
function FUN_0043c8d0(a, b, c) { return 0; /* stub — draw text left */ }
function FUN_0043c910(a, b, c, d) { /* stub — draw text centered */ }
function FUN_0043c950(a, b, c, d) { return 0; /* stub — draw text right */ }
function FUN_0043c990(a, b) { /* stub — set dialog font */ }
function FUN_0043c9d0(a) { /* stub — set dialog title */ }
function FUN_0043ca80(a) { /* stub — format civ name by id */ }
function FUN_0043cef9(a) { return 0; /* stub — count_trade_routes */ }
function FUN_0043cf76(a, b) { return -1; /* stub — find_city_at */ }
function FUN_0043d07a(a, b, c, d, e) { return -1; /* stub — find_nearest_city */ }
function FUN_0043d20a(a, b) { return 0; /* stub — city_has_improvement */ }
function FUN_0043d289(a, b, c) { /* stub — set_city_improvement */ }
function FUN_0046ab30() { /* stub — init base class */ }
function FUN_0046ab49() { /* stub — destroy base class */ }
function FUN_0046ac89(a) { /* stub — select pane tab */ }
function FUN_0046ad85(a, b, c, d) { return -1; /* stub — hit test pane */ }
function FUN_0046e020(a, b, c, d) { /* stub — play sound effect */ }
function FUN_00569363(a) { /* stub — update city display */ }
function FUN_00598197(a, b) { /* stub — build wonder at city */ }
function FUN_0059a2e6(a) { /* stub — view improvement info */ }
function FUN_0056baff(a, b, c, d, e, f, g) { /* stub — draw unit sprite */ }
function FUN_0056d289(a, b, c, d, e, f) { /* stub — draw city sprite */ }
function FUN_0055339f() { /* stub — init frame window */ }
function CSplitterWnd_IsTracking(a) { return -1; /* stub — get active city index */ }

// Win32 API stubs
function GetSystemMetrics(a) { return 0; /* stub — Win32 GetSystemMetrics */ }
function BringWindowToTop(a) { /* stub — Win32 BringWindowToTop */ }

// Thunk aliases — thunk_FUN_X maps to FUN_X
function FUN_00501551_thunk() { return FUN_00501551(); }
function FUN_0050160a_thunk() { return FUN_0050160a(); }

// Global data references (kept as-is, would be imported from mem.js in full build)
let DAT_006aa78c = 0;
let DAT_00630d34 = 0;
let DAT_006a9170 = 0;
let DAT_00630d1c = 0;
let DAT_006aa764 = 0;
let DAT_00679640 = {};
let DAT_00631edc = 0;
let DAT_006a91b8 = 0;
let DAT_0064f348 = [];
let DAT_0064f349 = [];
let DAT_0064f340 = [];
let DAT_0064f342 = [];
let DAT_0064f344 = [];
let DAT_0064f346 = [];
let DAT_0064f360 = [];
let DAT_0064f370 = [];
let DAT_0064f379 = [];
let DAT_0064f37a = [];
let DAT_0064f37b = [];
let DAT_0064f37e = [];
let DAT_0064f381 = [];
let DAT_0064f384 = [];
let DAT_0064f394 = [];
let DAT_0064f35a = [];
let DAT_0064f35c = [];
let DAT_006d1da0 = 0;
let DAT_00655b07 = 0;
let DAT_00655b16 = 0;
let DAT_00655b18 = 0;
let DAT_006560f0 = [];
let DAT_006560f2 = [];
let DAT_006560f4 = [];
let DAT_006560f6 = [];
let DAT_006560f7 = [];
let DAT_00656100 = [];
let DAT_006560ff = [];
let DAT_0065610a = [];
let DAT_00656102 = [];
let DAT_00656104 = [];
let DAT_006a6530 = [];
let DAT_006a6550 = 0;
let DAT_006a6554 = 0;
let DAT_006a6558 = 0;
let DAT_006a6560 = 0;
let DAT_006a6568 = 0;
let DAT_006a656c = 0;
let DAT_006a6578 = 0;
let DAT_006a6580 = 0;
let DAT_006a6584 = 0;
let DAT_006a6590 = [];
let DAT_006a659c = 0;
let DAT_006a65a8 = 0;
let DAT_006a65b0 = 0;
let DAT_006a65b8 = [];
let DAT_006a65bc = 0;
let DAT_006a65c0 = 0;
let DAT_006a65c8 = 0;
let DAT_006a65cc = 0;
let DAT_006a65d0 = 0;
let DAT_006a65d8 = 0;
let DAT_006a65e4 = 0;
let DAT_006a65f0 = [];
let DAT_006a65f1 = 0;
let DAT_006a65f3 = 0;
let DAT_006a65f4 = 0;
let DAT_006a65fc = 0;
let DAT_006a6604 = 0;
let DAT_006a6608 = 0;
let DAT_006a6618 = 0;
let DAT_006a6620 = [];
let DAT_006a6621 = 0;
let DAT_006a6623 = 0;
let DAT_006a6624 = 0;
let DAT_006a6628 = [];
let DAT_006a657c = 0;
let DAT_006aa768 = 0;
let DAT_006aa76c = 0;
let DAT_006aa770 = 0;
let DAT_006aa790 = 0;
let DAT_006aa7a4 = 0;
let DAT_006aa7a8 = 0;
let DAT_006aa75c = 0;
let DAT_006aa754 = 0;
let DAT_006aa758 = 0;
let DAT_006aa784 = 0;
let DAT_006ab198 = 0;
let DAT_0064bccc = 0;
let DAT_0064bcca = 0;
let DAT_0064bcda = 0;
let DAT_0064bcc8 = 0;
let DAT_0064bc60 = 0;
let DAT_0064b168 = [];
let DAT_0064b1b8 = [];
let DAT_0064b1bc = [];
let DAT_0064b1bd = [];
let DAT_0064b1c2 = [];
let DAT_0064b1c4 = [];
let DAT_0064b1c5 = [];
let DAT_0064b1c6 = [];
let DAT_0064b1c7 = [];
let DAT_0064b1c8 = [];
let DAT_0064b1ca = [];
let DAT_0064c488 = [];
let DAT_0064c48c = [];
let DAT_0064c600 = [];
let DAT_0064c6a2 = [];
let DAT_0064c6ac = [];
let DAT_0064c6b3 = [];
let DAT_0064c6b4 = [];
let DAT_0064c6b5 = [];
let DAT_0064c7f4 = [];
let DAT_00644f3c = {};
let DAT_00644fb4 = {};
let DAT_006466c8 = {};
let DAT_00646598 = {};
let DAT_00628044 = 0;
let DAT_00628048 = 0;
let DAT_00628350 = 0;
let DAT_00628360 = 0;
let DAT_00628420 = 0;
let DAT_0062833b = [];
let DAT_00628343 = [];
let DAT_00628370 = [];
let DAT_006283a0 = [];
let DAT_00630d38 = [];
let DAT_00630d50 = [];
let DAT_00630d18 = 0;
let DAT_00630d20 = 0;
let DAT_00630d24 = 0;
let DAT_00630d28 = 0;
let DAT_00630d2c = 0;
let DAT_00630d30 = 0;
let DAT_00630d68 = 0;
let DAT_0062edf8 = 0;
let DAT_00655280 = 0;
let DAT_00655344 = {};
let DAT_00655348 = 0;
let DAT_00655ae8 = 0;
let DAT_00655aea = {};
let DAT_00655aee = 0;
let DAT_00655af0 = 0;
let DAT_00655af2 = 0;
let DAT_00655af4 = 0;
let DAT_00655afa = 0;
let DAT_00655afe = 0;
let DAT_00655b02 = 0;
let DAT_00655b05 = 0;
let DAT_00655b08 = 0;
let DAT_00655b0b = 0;
let DAT_00654fa8 = 0;
let DAT_00655be6 = [];
let DAT_006335a0 = 0;
let DAT_006335a4 = 0;
let DAT_00633584 = 0;
let DAT_00633a74 = 0;
let DAT_00633a78 = 0;
let DAT_0063605c = 0;
let DAT_00635a3c = null;
let DAT_006ad2f7 = 0;
let DAT_006ad678 = [];
let DAT_006ad8bc = 0;
let DAT_006ad8c0 = 0;
let DAT_006ad8c4 = 0;
let DAT_006ad8c8 = 0;
let DAT_006ad8cc = 0;
let DAT_006ad8d0 = 0;
let DAT_006ad8d8 = 0;
let DAT_006ad8dc = 0;
let DAT_006ad8e0 = 0;
let DAT_006ad8e4 = 0;
let DAT_006ad8e8 = 0;
let DAT_006ad8ec = 0;
let DAT_006ad8f0 = 0;
let DAT_006ad8f4 = 0;
let DAT_006ad8f8 = 0;
let DAT_006ad8fc = 0;
let DAT_006ad900 = 0;
let DAT_006ad904 = 0;
let DAT_006c31ac = 0;
let DAT_006c31b0 = 0;
let DAT_006c31b4 = 0;
let DAT_006c31b8 = 0;
let DAT_006c31bc = 0;
let DAT_006c31c0 = 0;
let DAT_006d1da8 = 0;
let DAT_006d1160 = 0;
let DAT_006d1162 = 0;
let DAT_006a9120 = 0;
let DAT_006a9200 = {};

// String constants
let s_CITY_GIF_00630d6c = 'CITY.GIF';
let s_CITYMODAL_00630d78 = 'CITYMODAL';
let s_ELVISERR_00630d84 = 'ELVISERR';
let s_ALREADYSOLD_00630d94 = 'ALREADYSOLD';
let s_CANTHOCKTHIS_00630da0 = 'CANTHOCKTHIS';
let s_HOCKTHIS_00630db0 = 'HOCKTHIS';
let s_CHILDCLICK_00630dbc = 'CHILDCLICK';
let s_UNITOPTIONS_00630dc8 = 'UNITOPTIONS';
let s_CITYSTUFF_00630e00 = 'CITYSTUFF';
let s_DISORDER_00630ddc = 'DISORDER';
let s_DISORDER2_00630de8 = 'DISORDER2';
let s_DISORDER3_00630df4 = 'DISORDER3';
let s__00631008 = '';
let s_zzzzzzzzzzzzzzzzzzzzzzzzz_00631024 = 'zzzzzzzzzzzzzzzzzzzzzzzzz';

function XD_InFlushSendBuffer() { return 0; /* stub — network check */ }
function debug_log(a) { /* stub — debug log */ }
function operator_new(a) { return {}; /* stub — operator new */ }
function _Timevec_destructor(a) { return 0; /* stub — _Timevec::~_Timevec */ }
function tie(a) { /* stub — tie function */ }
function __strcmpi(a, b) { return 0; /* stub — case-insensitive strcmp */ }
function thunk_map_ascii() { /* stub — keyboard map */ }
function thunk_load_city_preferences() { /* stub — load preferences */ }
