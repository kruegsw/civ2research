// ═══════════════════════════════════════════════════════════════════
// block_00500000.js — Mechanical transpilation of block_00500000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00500000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00500000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, s16, s32, u8, u16, w8, w16, w32 } from './mem.js';


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
  let iVar1, iVar2, iVar3, iVar4;
  let uVar5, uVar6, uVar7;
  let local_20c, local_208, local_204, local_200, local_1fc, local_1f8, local_1f4;
  let local_1f0 = new Array(16);
  let local_1e0 = new Array(16);
  let local_1d0 = new Array(16);
  let local_1c0 = new Array(16);
  let local_1b0 = new Array(16);
  let local_1a0 = new Array(16);
  let local_190 = new Array(16);
  let local_180 = new Array(16);
  let local_170 = new Array(16);
  let local_160 = new Array(16);
  let local_150 = new Array(16);
  let local_140 = new Array(16);
  let local_130 = new Array(16);
  let local_120 = new Array(16);
  let local_110 = new Array(16);
  let local_100, local_fc, local_f8, local_f4, local_f0, local_ec, local_e8, local_e4, local_e0;
  let local_dc, local_d8, local_d4, local_d0, local_cc, local_c8, local_c4, local_c0, local_bc;
  let local_b8, local_b4, local_b0, local_ac, local_a8, local_a4, local_a0, local_9c, local_98;
  let local_94, local_90, local_8c, local_88, local_84, local_80, local_7c, local_78, local_74;
  let local_70, local_6c, local_68, local_64, local_60, local_5c, local_58, local_54, local_50;
  let local_4c, local_48, local_44;
  let local_40, local_3c, local_38, local_34, local_30, local_2c, local_28, local_24;
  let local_20 = new Array(16);
  let local_10;
  let local_c;
  let local_8;

  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    FUN_00501733(in_ECX + 0x15ec, in_ECX);
    local_90 = in_ECX[0x15ec];
    local_a0 = in_ECX[0x15f0];
    local_e0 = FUN_00472cf0(0x40, in_ECX[0x15d8]);
    local_100 = FUN_00472cf0(0x20, in_ECX[0x15d8]);
    local_80 = local_e0 >> 1;
    local_50 = local_100 >> 1;
    local_58 = FUN_00511690(5);
    local_58 = local_90 + local_58;
    local_a8 = FUN_00511690(0xb);
    local_a8 = local_a0 + local_a8;
    FUN_0046ac89(1);
    FUN_004086c0(local_20, local_58, local_50 + local_a8, local_e0 << 2, local_100 << 2);
    FUN_00511460(0, 1, local_20);
    local_b4 = local_80 * 3 + local_58;
    local_8c = local_50 * 4 + local_a8;
    for (local_3c = 0; local_3c < 0x15; local_3c = local_3c + 1) {
      local_fc = FUN_005ae052(s16(DAT_0064f340, in_ECX[0x159c] * 0x58) +
                              s8(DAT_00630d38[local_3c]));
      local_4c = s16(DAT_0064f342, in_ECX[0x159c] * 0x58) +
                 s8(DAT_00630d50[local_3c]);
      local_cc = s8(DAT_00630d38[local_3c]) * local_80 + local_b4;
      local_e4 = s8(DAT_00630d50[local_3c]) * local_50 + local_8c;
      local_9c = local_e4 - local_50;
      local_94 = 0;
      for (local_5c = 0; local_5c < 0x15; local_5c = local_5c + 1) {
        if ((DAT_00628370[local_5c] === DAT_00630d38[local_3c]) &&
           (DAT_006283a0[local_5c] === DAT_00630d50[local_3c])) {
          local_94 = local_5c;
          break;
        }
      }
      FUN_0047a8c9(in_ECX, local_cc, local_e4, local_fc, local_4c,
                   s8(DAT_0064f348[in_ECX[0x159c] * 0x58]),
                   in_ECX[0x15d8], local_94);
      if (local_3c < 0x15) {
        if ((DAT_006a6530[local_94] & 8) === 0) {
          if ((DAT_006a6530[local_94] & 4) === 0) {
            if ((DAT_006a6530[local_94] & 2) !== 0) {
              FUN_0047df20(in_ECX[0x15d8]);
              FUN_005cef31(local_110, in_ECX, local_cc, local_e4);
              FUN_0047df50();
            }
          }
          else {
            local_dc = FUN_005b2e69(local_fc, local_4c);
            while ((-1 < local_dc) &&
                   (DAT_0064b1c4[u8(DAT_006560f6[local_dc * 0x20]) * 0x14] === 0)) {
              local_dc = FUN_005b2c82(local_dc);
            }
            if (-1 < local_dc) {
              FUN_0056baff(in_ECX, local_dc, 7, local_cc, local_9c,
                           in_ECX[0x15d8], 0);
            }
          }
        }
        else {
          local_c0 = FUN_0043cf76(local_fc, local_4c);
          if (-1 < local_c0) {
            local_8 = 1;
            FUN_0056d289(in_ECX, local_c0, 1, local_cc, local_9c, in_ECX[0x15d8]);
          }
        }
        if (((DAT_006a6530[local_94] & 0x10) !== 0) && ((DAT_006a6530[local_94] & 9) === 0)) {
          FUN_0047df20(in_ECX[0x15d8]);
          FUN_005cef31(local_120, in_ECX, local_cc, local_e4);
          FUN_0047df50();
        }
      }
    }
    for (local_3c = 0; local_3c < 0x15; local_3c = local_3c + 1) {
      local_fc = FUN_005ae052(s16(DAT_0064f340, in_ECX[0x159c] * 0x58) +
                              s8(DAT_00630d38[local_3c]));
      local_4c = s16(DAT_0064f342, in_ECX[0x159c] * 0x58) +
                 s8(DAT_00630d50[local_3c]);
      local_cc = s8(DAT_00630d38[local_3c]) * local_80 + local_b4;
      local_e4 = s8(DAT_00630d50[local_3c]) * local_50 + local_8c;
      local_9c = local_e4 - local_50;
      local_94 = 0;
      for (local_5c = 0; local_5c < 0x15; local_5c = local_5c + 1) {
        if ((DAT_00628370[local_5c] === DAT_00630d38[local_3c]) &&
           (DAT_006283a0[local_5c] === DAT_00630d50[local_3c])) {
          local_94 = local_5c;
          break;
        }
      }
      iVar1 = FUN_004e78ce(in_ECX[0x159c], local_94);
      if (iVar1 !== 0) {
        FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
        local_e8 = 0;
        FUN_004e8e4d(in_ECX[0x159c], local_94, 0);
        iVar1 = local_e0;
        local_7c = DAT_006a65bc + DAT_006a65c0 + DAT_006a65b8;
        if (local_7c === 0) {
          local_7c = 1;
          local_e8 = 1;
        }
        uVar6 = 0;
        uVar5 = 0;
        iVar2 = FUN_00511690(8);
        iVar1 = iVar1 + iVar2 * -2;
        iVar2 = FUN_00511690(10);
        local_70 = FUN_00548b70(local_7c, iVar2 + 1, iVar1, uVar5, uVar6);
        iVar1 = local_e0;
        iVar2 = FUN_00511690(8);
        iVar3 = FUN_00511690(10);
        local_74 = ((iVar1 + iVar2 * -2) / (iVar3 + 1)) | 0;
        if (local_7c <= local_74) {
          local_7c = local_74;
        }
        local_c4 = 0;
        local_6c = 0;
        local_78 = FUN_00511690(8);
        local_78 = local_cc + local_78;
        iVar2 = local_50 + local_e4;
        iVar1 = FUN_00511690(10);
        local_88 = iVar2 - (iVar1 >> 1);
        for (; local_c4 < 3; local_c4 = local_c4 + 1) {
          while (DAT_006a65b8[local_c4] !== 0) {
            FUN_005cef31(local_130, in_ECX, local_78, local_88);
            local_6c = local_6c + 1;
            if (local_6c < local_7c) {
              local_78 = local_78 + local_70;
            }
            else {
              local_6c = 0;
              local_78 = FUN_00511690(8);
              local_78 = local_cc + local_78;
              iVar1 = FUN_00511690(0xb);
              local_88 = local_88 + iVar1;
            }
            DAT_006a65b8[local_c4] = DAT_006a65b8[local_c4] + -1;
          }
        }
        if (local_e8 !== 0) {
          FUN_005cef31(local_140, in_ECX, local_78, local_88);
        }
        FUN_0047df50();
      }
    }
    FUN_005baec8(in_ECX + 0x16ac);
    FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
    FUN_0040bbb0();
    FUN_0040bc10(0x1c2);
    FUN_005baee0(0x7c, 0x39, 1, 1);
    uVar5 = FUN_00407f90(in_ECX + 0x165c);
    iVar1 = in_ECX[0x1668];
    iVar2 = FUN_00511690(0xe);
    FUN_0043c910(DAT_00679640, in_ECX[0x165c], iVar1 - iVar2, uVar5);
    FUN_005baee0(0x29, 10, 1, 1);
    local_40 = (in_ECX[0x15d4] === 3) ? 1 : 0;
    local_f0 = s8(DAT_0064f349[in_ECX[0x159c] * 0x58]) * DAT_0064bcca +
               DAT_006a65d8 * DAT_006a6608;
    local_48 = DAT_006a65c8;
    local_c = DAT_006a65c8 - local_f0;
    local_ec = local_f0;
    if (local_f0 <= DAT_006a65c8) {
      local_ec = DAT_006a65c8;
    }
    local_98 = local_f0;
    if (local_c < 0) {
      local_98 = DAT_006a65c8;
    }
    local_38 = local_f0;
    iVar1 = FUN_00511690(0xe2);
    local_2c = FUN_00511690(2);
    local_2c = iVar1 - local_2c;
    local_c8 = FUN_00511690(0xe);
    local_c8 = local_c8 + 1;
    if (((local_c < 0) && (local_48 !== 0)) || ((0 < local_c) && (local_f0 !== 0))) {
      iVar1 = FUN_00511690(4);
      local_2c = (local_2c - iVar1) - local_c8;
      local_ec = local_ec + -1;
    }
    local_70 = FUN_00548b70(local_ec, local_c8, local_2c, 0, 0);
    let _local_30 = local_ec; // track capacity for while loop
    while (_local_30 > 0 && local_30_fits(local_ec)) {
      // simplified: original loops trim items to fit
      break;
    }
    if ((local_c === 0) || (local_48 !== 0)) {
      if (local_c === 0) {
        local_68 = 0;
      }
      else {
        if (local_c < 1) {
          local_1f4 = (~local_c >>> 0) + 1;
        }
        else {
          local_1f4 = local_c;
        }
        iVar1 = FUN_00511690(2);
        iVar2 = FUN_00511690(1);
        local_68 = iVar1 + iVar2 + (local_1f4 - 1) * local_70 + local_c8;
      }
    }
    else {
      local_68 = FUN_00511690(0xe2);
    }
    local_f4 = FUN_00511690(0xe2);
    local_f4 = local_f4 - local_68;
    local_10 = FUN_00511690(0xcd);
    local_10 = local_90 + local_10;
    local_a4 = local_f4 + local_10;
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    in_ECX[0x15c0] = iVar1 + iVar2;
    local_4c = FUN_00511690(0xe);
    local_4c = local_a0 + local_4c;
    if (in_ECX[0x15d4] === 3) {
      local_4c = local_4c + -1;
    }
    if (local_c < 0) {
      local_f4 = local_f4 + local_68;
      local_68 = 0;
    }
    if (local_f4 !== 0) {
      FUN_00408780(local_10, local_4c, local_f4, in_ECX[0x15c0], 0x2d);
    }
    if (local_68 !== 0) {
      uVar6 = 0x30;
      uVar5 = in_ECX[0x15c0];
      iVar1 = FUN_00511690(6);
      FUN_00408780(local_a4, local_4c, local_68 + iVar1, uVar5, uVar6);
    }
    iVar1 = FUN_00511690(1);
    local_4c = local_4c + local_40 + iVar1;
    if (0 < local_98) {
      local_fc = FUN_00511690(1);
      local_fc = local_10 + local_fc;
      for (local_3c = 0; local_3c < local_98; local_3c = local_3c + 1) {
        FUN_005cef31(local_150, in_ECX, local_fc, local_4c);
        local_fc = local_fc + local_70;
      }
    }
    if (local_c !== 0) {
      local_fc = local_a4;
      if (local_98 < 1) {
        iVar1 = FUN_00511690(1);
        local_fc = local_fc + iVar1;
      }
      else {
        iVar1 = FUN_00511690(4);
        local_fc = local_fc + (iVar1 >> 1);
      }
      local_3c = 0;
      while (true) {
        if (local_c < 1) {
          local_1f8 = (~local_c >>> 0) + 1;
        }
        else {
          local_1f8 = local_c;
        }
        if (local_1f8 <= local_3c) break;
        FUN_005cef31(local_160, in_ECX, local_fc, local_4c);
        local_fc = local_fc + local_70;
        local_3c = local_3c + 1;
      }
    }
    local_84 = FUN_00511690(0xcd);
    local_84 = local_90 + local_84;
    iVar1 = FUN_00511690(0xe2);
    local_60 = local_84 + iVar1 + -1;
    iVar1 = FUN_00511690(0xe);
    iVar1 = local_a0 + iVar1;
    local_4c = FUN_00511690(0xe);
    local_4c = iVar1 - local_4c;
    FUN_0040bbb0();
    FUN_0040bc10(0x40);
    FUN_005baee0(0x2a, 10, 1, 1);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a65b0 + local_98);
    if (DAT_006a6558 !== DAT_006a65b0) {
      FUN_0040fe10();
      FUN_0040fea0();
      FUN_0040ff30(DAT_006a6558 - DAT_006a65b0);
      FUN_0040fe10();
      FUN_0040bc10(0xa9);
      FUN_0040fed0();
    }
    FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    FUN_0040bbb0();
    if (local_c < 0) {
      FUN_0040bc10(0x4a);
      FUN_005baee0(0xb, 0x1d, 1, 1);
    }
    else {
      FUN_0040bc10(0x41);
      FUN_005baee0(0x2e, 10, 1, 1);
    }
    FUN_0040fe40();
    if (local_c < 1) {
      local_1fc = (~local_c >>> 0) + 1;
    }
    else {
      local_1fc = local_c;
    }
    FUN_0040ff30(local_1fc);
    FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    // --- Shields section ---
    local_b8 = DAT_006a6568;
    local_48 = DAT_006a65cc + DAT_006a656c;
    local_c = DAT_006a65cc - DAT_006a6568;
    local_54 = DAT_006a6568;
    if (DAT_006a6568 <= local_48) {
      local_54 = local_48;
    }
    local_28 = local_48;
    if (-1 < local_c) {
      local_28 = DAT_006a6568;
    }
    iVar1 = FUN_00511690(0xe2);
    local_2c = FUN_00511690(2);
    local_2c = iVar1 - local_2c;
    local_c8 = FUN_00511690(0xe);
    local_c8 = local_c8 + 1;
    if (((local_c < 0) && (local_48 !== 0)) || ((0 < local_c) && (DAT_006a6568 !== 0))) {
      iVar1 = FUN_00511690(4);
      local_2c = (local_2c - iVar1) - local_c8;
      local_54 = local_54 + -1;
    }
    if (DAT_006a656c !== 0) {
      iVar1 = FUN_00511690(4);
      local_2c = (local_2c - iVar1) - local_c8;
      local_54 = local_54 + -1;
    }
    local_70 = FUN_00548b70(local_54, local_c8, local_2c, 0, 0);
    local_d8 = 0;
    if (DAT_006a656c !== 0) {
      local_d8 = (DAT_006a656c + -1) * local_70 + local_c8;
      if (local_c !== 0) {
        iVar1 = FUN_00511690(4);
        local_d8 = local_d8 + (iVar1 >> 1);
      }
      if (local_48 !== DAT_006a656c) {
        iVar1 = FUN_00511690(4);
        local_d8 = local_d8 + (iVar1 >> 1);
      }
    }
    if ((local_c === 0) || (local_48 !== 0)) {
      if (local_c === 0) {
        local_68 = 0;
      }
      else {
        if (local_c < 1) {
          local_200 = (~local_c >>> 0) + 1;
        }
        else {
          local_200 = local_c;
        }
        iVar1 = FUN_00511690(2);
        iVar2 = FUN_00511690(1);
        local_68 = iVar1 + iVar2 + (local_200 - 1) * local_70 + local_c8;
      }
    }
    else {
      local_68 = FUN_00511690(0xe2);
    }
    local_f4 = FUN_00511690(0xe2);
    local_f4 = local_f4 - (local_d8 + local_68);
    if (local_d8 !== 0) {
      if (DAT_006a6568 === 0) {
        local_f4 = 0;
      }
      else {
        iVar1 = FUN_00511690(2);
        iVar2 = FUN_00511690(1);
        local_f4 = iVar1 + iVar2 + (DAT_006a6568 + -1) * local_70 + local_c8;
      }
      local_d8 = FUN_00511690(0xe2);
      local_d8 = local_d8 - (local_68 + local_f4);
    }
    local_10 = FUN_00511690(0xcd);
    local_10 = local_90 + local_10;
    local_34 = local_f4 + local_10;
    local_a4 = local_d8 + local_34;
    if (local_d8 !== 0) {
      local_bc = ((local_d8 >> 1) + local_34) - ((DAT_006a656c + -1) * local_70 + local_c8 >> 1);
    }
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    in_ECX[0x15c0] = iVar1 + iVar2;
    local_4c = FUN_00511690(0x78);
    local_4c = local_a0 + local_4c;
    if (in_ECX[0x15d4] === 3) {
      local_4c = local_4c + -1;
    }
    if (local_c < 0) {
      local_f4 = local_f4 + local_68;
      local_68 = 0;
    }
    if (local_f4 !== 0) {
      FUN_00408780(local_10, local_4c, local_f4, in_ECX[0x15c0], 0x54);
    }
    if (local_d8 !== 0) {
      FUN_00408780(local_34, local_4c, local_d8, in_ECX[0x15c0], 0xb);
    }
    if (local_68 !== 0) {
      uVar6 = 0x5c;
      uVar5 = in_ECX[0x15c0];
      iVar1 = FUN_00511690(6);
      FUN_00408780(local_a4, local_4c, local_68 + iVar1, uVar5, uVar6);
    }
    iVar1 = FUN_00511690(1);
    local_4c = local_4c + local_40 + iVar1;
    if (0 < local_28) {
      local_fc = FUN_00511690(1);
      local_fc = local_10 + local_fc;
      for (local_3c = 0; local_3c < local_28; local_3c = local_3c + 1) {
        FUN_005cef31(local_170, in_ECX, local_fc, local_4c);
        local_fc = local_fc + local_70;
      }
    }
    if (0 < DAT_006a656c) {
      local_fc = FUN_00511690(2);
      local_fc = local_bc + local_fc;
      for (local_3c = 0; local_3c < DAT_006a656c; local_3c = local_3c + 1) {
        FUN_005cef31(local_180, in_ECX, local_fc, local_4c);
        local_fc = local_fc + local_70;
      }
    }
    if (local_c !== 0) {
      local_fc = local_a4;
      if (local_28 < 1) {
        iVar1 = FUN_00511690(1);
        local_fc = local_fc + iVar1;
      }
      else {
        iVar1 = FUN_00511690(4);
        local_fc = local_fc + (iVar1 >> 1);
      }
      local_3c = 0;
      while (true) {
        if (local_c < 1) {
          local_204 = (~local_c >>> 0) + 1;
        }
        else {
          local_204 = local_c;
        }
        if (local_204 <= local_3c) break;
        if (DAT_0064f379[in_ECX[0x159c] * 0x58] === -0x26) {
          FUN_005cef31(local_190, in_ECX, local_fc, local_4c);
        }
        else {
          FUN_005cef31(local_1a0, in_ECX, local_fc, local_4c);
        }
        local_fc = local_fc + local_70;
        local_3c = local_3c + 1;
      }
    }
    // --- Shields label ---
    local_84 = FUN_00511690(0xcd);
    local_84 = local_90 + local_84;
    iVar1 = FUN_00511690(0xe2);
    local_60 = local_84 + iVar1 + -1;
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    iVar3 = FUN_00511690(0x78);
    iVar4 = FUN_00511690(0xffffffff);
    local_4c = iVar1 + iVar2 + iVar3 + iVar4 + local_a0;
    FUN_0040bbb0();
    FUN_0040bc10(0xcc);
    FUN_0040fe40();
    iVar1 = DAT_006a6568;
    if (local_48 <= DAT_006a6568) {
      iVar1 = local_48;
    }
    FUN_0040ff30(iVar1);
    FUN_005baee0(0x54, 10, 1, 1);
    FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    if (DAT_006a656c !== 0) {
      FUN_0040bbb0();
      FUN_0040bc10(0x43);
      FUN_0040fe40();
      FUN_0040ff30(DAT_006a656c);
      FUN_005baee0(0xb, 0x1d, 1, 1);
      uVar5 = FUN_00511690(0xe2);
      FUN_0043c910(DAT_00679640, local_84, local_4c, uVar5);
    }
    FUN_0040bbb0();
    if (local_c < 0) {
      FUN_0040bc10(0x4b);
      FUN_005baee0(0xb, 0x1d, 1, 1);
    }
    else {
      FUN_0040bc10(0x44);
      FUN_005baee0(0x5c, 10, 1, 1);
    }
    FUN_0040fe40();
    if (local_c < 1) {
      local_208 = (~local_c >>> 0) + 1;
    }
    else {
      local_208 = local_c;
    }
    FUN_0040ff30(local_208);
    FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    // --- Trade section ---
    local_48 = DAT_006a65d0;
    local_54 = DAT_006a65d0;
    iVar1 = FUN_00511690(0xe2);
    local_2c = FUN_00511690(2);
    local_2c = iVar1 - local_2c;
    local_c8 = FUN_00511690(0xe);
    local_c8 = local_c8 + 1;
    if (DAT_006a6580 !== 0) {
      iVar1 = FUN_00511690(4);
      local_2c = (local_2c - iVar1) - local_c8;
      local_54 = local_54 + -1;
    }
    local_70 = FUN_00548b70(local_54, local_c8, local_2c, 0, 0);
    if (local_68 !== undefined) local_68 = 0;
    if (DAT_006a6580 !== 0) {
      if (DAT_006a6580 < 1) {
        local_20c = (~DAT_006a6580 >>> 0) + 1;
      }
      else {
        local_20c = DAT_006a6580;
      }
      iVar1 = FUN_00511690(2);
      iVar2 = FUN_00511690(1);
      local_68 = iVar1 + iVar2 + (local_20c - 1) * local_70 + local_c8;
    }
    else {
      local_68 = 0;
    }
    local_f4 = FUN_00511690(0xe2);
    local_f4 = local_f4 - local_68;
    local_10 = FUN_00511690(0xcd);
    local_10 = local_90 + local_10;
    local_a4 = local_f4 + local_10;
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    in_ECX[0x15c0] = iVar1 + iVar2;
    local_4c = FUN_00511690(0x37);
    local_4c = local_a0 + local_4c;
    if (local_c < 0) {
      local_f4 = local_f4 + local_68;
      local_68 = 0;
    }
    if (local_f4 !== 0) {
      FUN_00408780(local_10, local_4c, local_f4, in_ECX[0x15c0], 0x76);
    }
    if (local_68 !== 0) {
      FUN_00408780(local_a4, local_4c, local_68, in_ECX[0x15c0], 0x79);
    }
    iVar1 = FUN_00511690(1);
    local_4c = local_4c + local_40 + iVar1;
    if (0 < (DAT_006a65d0 - DAT_006a6580)) {
      local_fc = local_10 + 1;
      for (local_3c = 0; local_3c < (DAT_006a65d0 - DAT_006a6580); local_3c = local_3c + 1) {
        FUN_005cef31(local_1b0, in_ECX, local_fc, local_4c);
        local_fc = local_fc + local_70;
      }
    }
    if (DAT_006a6580 !== 0) {
      local_fc = local_a4;
      iVar1 = FUN_00511690(4);
      local_fc = local_fc + (iVar1 >> 1);
      for (local_3c = 0; local_3c < DAT_006a6580; local_3c = local_3c + 1) {
        FUN_005cef31(local_1c0, in_ECX, local_fc, local_4c);
        local_fc = local_fc + local_70;
      }
    }
    local_84 = FUN_00511690(0xcd);
    local_84 = local_90 + local_84;
    iVar1 = FUN_00511690(0xe2);
    local_60 = local_84 + iVar1 + -1;
    iVar1 = FUN_00511690(0x37);
    iVar1 = local_a0 + iVar1;
    local_4c = FUN_00511690(0xe);
    local_4c = iVar1 - local_4c;
    FUN_0040bbb0();
    FUN_0040bc10(0x45);
    FUN_005baee0(0x76, 10, 1, 1);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a65d0 - DAT_006a6580);
    local_d0 = FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    if ((DAT_0064c6b5[s8(DAT_0064f348[in_ECX[0x159c] * 0x58]) * 0x594] === 4) &&
        (DAT_006a6618 !== 0)) {
      iVar1 = FUN_00511690(4);
      local_d0 = local_d0 + iVar1;
      FUN_0040bbb0();
      FUN_0040bc10(0x5d);
      FUN_0040fe40();
      FUN_0040bbe0(DAT_00630d90);
      FUN_0040ff30(DAT_006a6618);
      FUN_005baee0(0x79, 10, 1, 1);
      FUN_0043c8d0(DAT_00679640, local_d0, local_4c);
    }
    FUN_0040bbb0();
    FUN_0040bc10(0x46);
    FUN_005baee0(0x79, 10, 1, 1);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a6580);
    FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    // --- Gold/Lux/Science section ---
    local_48 = DAT_006a65d0;
    local_b0 = DAT_006a6554;
    local_64 = DAT_006a65fc;
    local_44 = DAT_006a6578;
    local_54 = DAT_006a6578 + DAT_006a65fc + DAT_006a6554;
    local_24 = ((0 < DAT_006a6578) ? 1 : 0) + ((0 < DAT_006a65fc) ? 1 : 0) +
               ((0 < DAT_006a6554) ? 1 : 0);
    iVar1 = FUN_00511690(0xe2);
    local_2c = FUN_00511690(2);
    local_2c = iVar1 - local_2c;
    local_c8 = FUN_00511690(0xe);
    local_c8 = local_c8 + 1;
    for (; 1 < local_24; local_24 = local_24 + -1) {
      iVar1 = FUN_00511690(4);
      local_2c = local_2c - (local_c8 + iVar1);
      local_54 = local_54 + -1;
    }
    local_70 = FUN_00548b70(local_54, local_c8, local_2c, 0, 0);
    local_f4 = 0;
    local_10 = FUN_00511690(0xcd);
    local_10 = local_90 + local_10;
    if (local_b0 !== 0) {
      iVar1 = FUN_00511690(1);
      local_f4 = iVar1 + (local_b0 + -1) * local_70 + local_c8;
    }
    local_68 = 0;
    if (local_44 !== 0) {
      iVar1 = FUN_00511690(1);
      local_68 = iVar1 + (local_44 + -1) * local_70 + local_c8;
    }
    iVar1 = FUN_00511690(0xe2);
    iVar2 = FUN_00511690(0xcd);
    local_a4 = (iVar1 + iVar2 + local_90) - local_68;
    local_d8 = FUN_00511690(0xe2);
    local_d8 = local_d8 - (local_68 + local_f4);
    local_34 = FUN_00511690(0xcd);
    local_34 = local_90 + local_34;
    if (local_f4 !== 0) {
      iVar1 = FUN_00511690(4);
      local_d8 = local_d8 - iVar1;
      iVar1 = FUN_00511690(4);
      local_34 = local_34 + local_f4 + iVar1;
    }
    if (local_68 !== 0) {
      iVar1 = FUN_00511690(4);
      local_d8 = local_d8 - iVar1;
    }
    local_bc = local_34;
    local_34 = local_34 + (local_d8 >> 1);
    if (local_64 !== 0) {
      local_34 = local_34 - ((local_64 + -1) * local_70 + local_c8 >> 1);
    }
    local_ac = 0;
    if ((local_64 === 0) || (local_b0 !== 0)) {
      if ((local_64 !== 0) && (local_44 === 0)) {
        local_ac = 2;
        iVar1 = FUN_00511690(1);
        local_24 = iVar1 + (local_64 + -1) * local_70 + local_c8;
        iVar1 = FUN_00511690(0xe2);
        iVar2 = FUN_00511690(0xcd);
        local_34 = (iVar1 + iVar2 + local_90) - local_24;
      }
    }
    else {
      local_ac = 1;
      local_34 = local_10;
    }
    iVar1 = FUN_00511690(0xe);
    iVar2 = FUN_00511690(2);
    in_ECX[0x15c0] = iVar1 + iVar2;
    local_4c = FUN_00511690(0x4f);
    local_4c = local_a0 + local_4c;
    uVar7 = 0x79;
    uVar5 = in_ECX[0x15c0];
    uVar6 = FUN_00511690(0xe2);
    FUN_00408780(local_10, local_4c, uVar6, uVar5, uVar7);
    iVar1 = FUN_00511690(1);
    local_4c = local_4c + local_40 + iVar1;
    if (0 < local_b0) {
      local_fc = FUN_00511690(1);
      local_fc = local_10 + local_fc;
      for (local_3c = 0; local_3c < local_b0; local_3c = local_3c + 1) {
        FUN_005cef31(local_1d0, in_ECX, local_fc, local_4c);
        local_fc = local_fc + local_70;
      }
    }
    if (local_64 !== 0) {
      local_fc = local_34;
      for (local_3c = 0; local_3c < local_64; local_3c = local_3c + 1) {
        FUN_005cef31(local_1e0, in_ECX, local_fc, local_4c);
        local_fc = local_fc + local_70;
      }
    }
    if (local_44 !== 0) {
      local_fc = local_a4;
      for (local_3c = 0; local_3c < local_44; local_3c = local_3c + 1) {
        FUN_005cef31(local_1f0, in_ECX, local_fc, local_4c);
        local_fc = local_fc + local_70;
      }
    }
    local_84 = FUN_00511690(0xcd);
    local_84 = local_90 + local_84;
    iVar1 = FUN_00511690(0xe2);
    local_60 = local_84 + iVar1 + -1;
    iVar1 = FUN_00511690(0x4f);
    iVar2 = FUN_00511690(0xe);
    iVar3 = FUN_00511690(2);
    iVar4 = FUN_00511690(0);
    local_4c = iVar1 + iVar2 + iVar3 + iVar4 + local_a0;
    local_f8 = s8(DAT_0064f348[in_ECX[0x159c] * 0x58]);
    FUN_0040bbb0();
    FUN_0040ff30(u8(DAT_0064c6b4[local_f8 * 0x594]) * 10);
    FUN_0040fe70();
    FUN_0040fe10();
    FUN_0040bc10(0x47);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a6554);
    FUN_005baee0(0x76, 10, 1, 1);
    if (local_ac === 1) {
      uVar5 = FUN_00511690(0xe2);
      FUN_0043c910(DAT_00679640, local_84, local_4c, uVar5);
    }
    else {
      FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    }
    FUN_0040bbb0();
    FUN_0040ff30((10 - (u8(DAT_0064c6b4[local_f8 * 0x594]) +
                        u8(DAT_0064c6b3[local_f8 * 0x594]))) * 10);
    FUN_0040fe70();
    FUN_0040fe10();
    FUN_0040bc10(0x48);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a65fc);
    FUN_005baee0(0x29, 10, 1, 1);
    if (local_ac === 1) {
      FUN_0043c8d0(DAT_00679640, local_84, local_4c);
    }
    else if (local_ac === 2) {
      FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    }
    else {
      uVar5 = FUN_00511690(0xe2);
      FUN_0043c910(DAT_00679640, local_84, local_4c, uVar5);
    }
    FUN_0040bbb0();
    FUN_0040ff30(u8(DAT_0064c6b3[local_f8 * 0x594]) * 10);
    FUN_0040fe70();
    FUN_0040fe10();
    FUN_0040bc10(0x49);
    FUN_0040fe40();
    FUN_0040ff30(DAT_006a6578);
    FUN_005baee0(0x5e, 10, 1, 1);
    if (local_ac === 2) {
      uVar5 = FUN_00511690(0xe2);
      FUN_0043c910(DAT_00679640, local_84, local_4c, uVar5);
    }
    else {
      FUN_0043c950(DAT_00679640, local_60, local_4c, 0);
    }
    FUN_0047df50();
    if (param_1 !== 0) {
      FUN_00408490(in_ECX + 0x15ec);
    }
  }
  return;
}
function local_30_fits() { return false; } // helper for while loop trimming



// ============================================================
// Function: FUN_00504c05 @ 0x00504C05
// Size: 1081 bytes
// ============================================================

// citywin_draw_production_pane — draw city production (what is being built)
export function FUN_00504c05(param_1, in_ECX) {
  let uVar1, uVar2, uVar3, uVar4;
  let iVar5, iVar6, iVar7;
  let local_2c, local_24, local_1c, local_14 = new Array(16), local_10, local_c, local_8;

  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    FUN_00501733(in_ECX + 0x15fc, in_ECX);
    FUN_005baee0(0x2c, 10, 1, 1);
    uVar1 = FUN_00407f90(in_ECX + 0x15fc);
    uVar1 = FUN_00428b0c(DAT_00628420[0xac], in_ECX[0x15fc], in_ECX[0x1600], uVar1);
    FUN_0043c910(uVar1);
    uVar1 = FUN_00511690(0xb7);
    uVar2 = FUN_00511690(0x93);
    uVar3 = FUN_00511690(0xf);
    uVar4 = FUN_00511690(6);
    FUN_004086c0(local_14, uVar4, uVar3, uVar1, uVar2);
    FUN_0043c790(local_14, in_ECX[0x15fc], in_ECX[0x1600]);
    uVar1 = FUN_00511690(3);
    uVar2 = FUN_00511690(3);
    FUN_004bb800(local_14, uVar2, uVar1);
    uVar1 = FUN_00407f90(local_14, 0, 0);
    uVar2 = FUN_00511690(0x11);
    iVar5 = FUN_00548b70(s8(DAT_0064f349[in_ECX[0x159c] * 0x58]) + 1, uVar2, uVar1);
    uVar1 = FUN_00407fc0(local_14, 0, 0);
    uVar2 = FUN_00511690(0xe);
    iVar6 = FUN_00548b70(DAT_006a6560, uVar2, uVar1);
    iVar5 = (s8(DAT_0064f349[in_ECX[0x159c] * 0x58]) + 1) * iVar5;
    iVar7 = FUN_00407f90(local_14);
    if (iVar5 < iVar7) {
      iVar7 = FUN_00407f90(local_14, 0);
      FUN_004bb800(local_14, iVar7 - iVar5 >> 1);
    }
    iVar5 = iVar6 * DAT_006a6560;
    iVar7 = FUN_00407fc0(local_14);
    if (iVar5 < iVar7) {
      iVar7 = FUN_00407fc0(local_14);
      local_8 = local_8 - (iVar7 - iVar5);
    }
    FUN_004bb840(local_14, 3, 3);
    FUN_005113f0(local_14, 0x2c, 0x39);
    FUN_004bb800(local_14, 1, 1);
    FUN_004bb800(local_14, 2, 2);
    iVar5 = local_14[0];
    local_1c = 0;
    local_24 = s16(DAT_0064f35a, in_ECX[0x159c] * 0x58);
    local_2c = local_10;
    FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
    for (; (0 < local_24) && (local_1c < DAT_006a6560); local_1c = local_1c + 1) {
      iVar7 = s8(DAT_0064f349[in_ECX[0x159c] * 0x58]) + 1;
      if (local_24 <= s8(DAT_0064f349[in_ECX[0x159c] * 0x58]) + 1) {
        iVar7 = local_24;
      }
      uVar1 = FUN_00407f90(local_14, 1);
      uVar2 = FUN_00511690(0x11);
      FUN_005114d0(DAT_00644f3c, iVar5, local_2c, iVar7,
                   s8(DAT_0064f349[in_ECX[0x159c] * 0x58]) + 1, uVar2, uVar1);
      local_24 = local_24 - iVar7;
      local_2c = local_2c + iVar6;
    }
    FUN_0047df50();
    iVar5 = FUN_0043d20a(in_ECX[0x159c], 3);
    if ((iVar5 !== 0) ||
       (iVar5 = FUN_00453e51(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), 0),
       iVar5 !== 0)) {
      iVar7 = DAT_006a6560 >> 1;
      iVar5 = FUN_00511690(1);
      iVar6 = local_10 + (iVar7 * iVar6 - iVar5);
      uVar1 = 0x2a;
      iVar5 = FUN_00511690(2);
      iVar5 = (local_c + -1) - iVar5;
      iVar7 = FUN_00511690(2);
      FUN_005113b0(local_14[0] + iVar7, iVar5, iVar6, uVar1);
    }
    if (param_1 !== 0) {
      FUN_00408490(in_ECX + 0x15fc);
    }
  }
  return;
}



// ============================================================
// Function: FUN_0050503e @ 0x0050503E
// Size: 1434 bytes
// ============================================================

// citywin_draw_unit_support_pane — draw unit support/maintenance pane
export function FUN_0050503e(param_1, in_ECX) {
  let iVar1, iVar2;
  let uVar3, uVar4, uVar5, uVar6;
  let local_6c = new Array(16);
  let local_5c, local_58, local_54, local_50, local_4c, local_48, local_44, local_40;
  let local_3c, local_38, local_34, local_30, local_2c, local_28, local_24, local_20;
  let local_1c, local_18, local_14, local_10, local_c, local_8;

  local_44 = -1;
  local_38 = -1;
  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    FUN_00501733(in_ECX + 0x160c, in_ECX);
    local_3c = FUN_00511690(0xb7);
    local_50 = FUN_00511690(0x92);
    local_14 = in_ECX[0x160c];
    local_10 = in_ECX[0x1610];
    local_c = in_ECX[0x1614];
    local_8 = FUN_00511690(0x28);
    local_8 = local_10 + local_8;
    FUN_0046ac89(5);
    FUN_00511460(0, 5, [local_14, local_10, local_c, local_8]);
    if (s8(DAT_0064f379[in_ECX[0x159c] * 0x58]) < 0) {
      if (s8(DAT_0064f379[in_ECX[0x159c] * 0x58]) < 1) {
        local_44 = ~s8(DAT_0064f379[in_ECX[0x159c] * 0x58]) + 1;
      }
      else {
        local_44 = s8(DAT_0064f379[in_ECX[0x159c] * 0x58]);
      }
      local_34 = u8(DAT_0064c48c[local_44 * 8]);
      FUN_005baee0(0x54, 10, 1, 1);
      uVar5 = FUN_00407f90(in_ECX + 0x160c);
      uVar5 = FUN_00428b0c(DAT_0064c488[local_44 * 8], in_ECX[0x160c], in_ECX[0x1610], uVar5);
      FUN_0043c910(uVar5);
      FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
      iVar1 = FUN_00511690(0x10);
      iVar1 = in_ECX[0x1610] + iVar1;
      iVar2 = FUN_00511690(0x50);
      FUN_005cef31(local_6c, DAT_006a91b8, in_ECX[0x160c] + iVar2, iVar1);
      FUN_0047df50();
    }
    else {
      local_38 = s8(DAT_0064f379[in_ECX[0x159c] * 0x58]);
      local_34 = s8(DAT_0064b1c8[local_38 * 0x14]);
      local_4c = FUN_00472d20(local_38, s8(DAT_0064f348[in_ECX[0x159c] * 0x58]));
      local_48 = 0xffffffff;
      if (in_ECX[0x15d4] === 1) {
        local_48 = 0xfffffffb;
      }
      if (in_ECX[0x15d4] === 3) {
        local_48 = 1;
      }
      uVar6 = 0;
      uVar5 = local_48;
      iVar1 = FUN_00511690(1);
      iVar1 = in_ECX[0x1610] + iVar1;
      iVar2 = FUN_00511690(0x49);
      FUN_0056baff(DAT_006a91b8, local_4c, 0, in_ECX[0x160c] + iVar2, iVar1, uVar5, uVar6);
    }
    if (DAT_0064f379[in_ECX[0x159c] * 0x58] !== -0x26) {
      uVar5 = local_3c;
      uVar6 = local_50;
      uVar3 = FUN_00511690(0x28);
      uVar4 = FUN_00511690(6);
      FUN_004086c0([local_14, local_10, local_c, local_8], uVar4, uVar3, uVar5, uVar6);
      FUN_0043c790([local_14, local_10, local_c, local_8], in_ECX[0x160c], in_ECX[0x1610]);
      uVar5 = FUN_00511690(3);
      uVar6 = FUN_00511690(3);
      FUN_004bb800([local_14, local_10, local_c, local_8], uVar6, uVar5);
      uVar5 = FUN_00407fc0([local_14, local_10, local_c, local_8], 0, 0);
      uVar6 = FUN_00511690(0xe);
      local_5c = FUN_00548b70(10, uVar6, uVar5);
      local_2c = local_34;
      if (local_34 < 10) {
        local_2c = DAT_006a657c;
        local_8 = local_8 - (10 - local_34) * local_5c;
      }
      uVar5 = FUN_00407f90([local_14, local_10, local_c, local_8], 0, 0);
      uVar6 = FUN_00511690(0x11);
      local_54 = FUN_00548b70(DAT_006a657c, uVar6, uVar5);
      local_18 = local_54 * DAT_006a657c + local_58;
      local_40 = 0;
      iVar1 = FUN_00407f90([local_14, local_10, local_c, local_8]);
      if (local_18 < iVar1) {
        iVar1 = FUN_00407f90([local_14, local_10, local_c, local_8]);
        local_40 = iVar1 - local_18 >> 1;
      }
      FUN_004bb840([local_14, local_10, local_c, local_8], 3, 3);
      FUN_005113f0([local_14, local_10, local_c, local_8], 0x51, 0x5d);
      FUN_004bb800([local_14, local_10, local_c, local_8], 1, 1);
      FUN_004bb800([local_14, local_10, local_c, local_8], local_40 + 2, 2);
      local_1c = 0;
      local_24 = s16(DAT_0064f35c, in_ECX[0x159c] * 0x58);
      local_28 = local_14;
      local_30 = local_10;
      FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
      for (; (0 < local_24) && (local_1c < 10); local_1c = local_1c + 1) {
        local_20 = local_24;
        if (local_2c <= local_24) {
          local_20 = local_2c;
        }
        uVar5 = FUN_00407f90([local_14, local_10, local_c, local_8], 1);
        uVar6 = FUN_00511690(0x11);
        FUN_005114d0(DAT_00644fb4, local_28, local_30, local_20, local_2c, uVar6, uVar5);
        local_24 = local_24 - local_20;
        local_30 = local_30 + local_5c;
      }
      FUN_0047df50();
    }
    if (param_1 !== 0) {
      FUN_00408490(in_ECX + 0x160c);
    }
  }
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
  let iVar1, iVar2, iVar3;
  let uVar4, uVar5, uVar6, uVar7;
  let local_c0 = new Array(16), local_b0 = new Array(16);
  let local_a0 = new Array(16), local_90 = new Array(16);
  let local_80, local_7c, local_78, local_74, local_70, local_6c, local_68, local_64;
  let local_60, local_5c, local_58, local_54, local_50, local_4c, local_48, local_44;
  let local_40, local_3c, local_38, local_34, local_30, local_2c, local_28, local_24;
  let local_20, local_1c, local_18;
  let local_14 = new Array(16);

  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    FUN_00501733(in_ECX + 0x162c, in_ECX);
    local_4c = in_ECX[0x162c];
    local_54 = in_ECX[0x1630];
    local_20 = 0xfffffffd;
    if (in_ECX[0x15d4] === 1) { local_20 = 0xfffffffa; }
    if (in_ECX[0x15d4] === 3) { local_20 = 0; }
    local_48 = FUN_00472cf0(0x45, local_20);
    local_78 = FUN_00472cf0(0x34, local_20);
    local_18 = FUN_00511690(0xc0);
    local_18 = (local_18 / local_48) | 0;
    local_28 = FUN_00511690(0x4e);
    local_28 = (local_28 / local_78) | 0;
    iVar1 = FUN_00511690(0xc0);
    iVar2 = local_48 * local_18;
    iVar3 = FUN_00472cf0(5, local_20);
    local_5c = (iVar1 - iVar2) + iVar3 >> 1;
    iVar1 = FUN_00511690(0x4e);
    iVar2 = local_78 * local_28;
    iVar3 = FUN_00472cf0(4, local_20);
    local_58 = (iVar1 - iVar2) + iVar3 >> 1;
    local_3c = FUN_00472cf0(0x20, local_20);
    local_40 = 0;
    for (local_70 = 0; local_70 < DAT_00655b16; local_70 = local_70 + 1) {
      if ((DAT_0065610a[local_70 * 0x20] !== 0) &&
         (u8(DAT_00656100[local_70 * 0x20]) === in_ECX[0x159c])) {
        local_40 = local_40 + 1;
      }
    }
    if (local_40 <= local_18) {
      iVar1 = FUN_00511690(0x4e);
      iVar2 = FUN_00472cf0(0x30, local_20);
      local_58 = iVar1 - iVar2 >> 1;
      FUN_0040bbb0();
      FUN_0040bc10(0x1bf);
      FUN_005baee0(0x7c, 0x12, 1, 1);
      uVar4 = FUN_00407f90(in_ECX + 0x167c);
      iVar1 = FUN_00511690(1);
      FUN_0043c910(DAT_00679640, in_ECX[0x167c], in_ECX[0x1680] + iVar1, uVar4);
    }
    local_1c = FUN_00472cf0(0x40, local_20);
    local_6c = local_5c + local_4c;
    local_74 = local_58 + local_54;
    local_34 = 0;
    local_60 = 0;
    local_7c = s8(DAT_0064f348[in_ECX[0x159c] * 0x58]);
    local_64 = u8(DAT_0064c6b5[local_7c * 0x594]);
    local_30 = 0;
    FUN_0046ac89(6);
    for (local_70 = 0; local_70 < DAT_00655b16; local_70 = local_70 + 1) {
      if ((DAT_0065610a[local_70 * 0x20] !== 0) &&
         (u8(DAT_00656100[local_70 * 0x20]) === in_ECX[0x159c])) {
        local_38 = local_3c + local_74;
        FUN_0056baff(in_ECX, local_70, 4, local_6c, local_74, local_20, 0);
        local_68 = 0;
        local_2c = 0;
        if (DAT_0064b1ca[u8(DAT_006560f6[local_70 * 0x20]) * 0x14] === 5) {
          local_68 = DAT_006a6608;
        }
        if ((DAT_006560f4[local_70 * 0x20] & 0x800) !== 0) {
          local_68 = local_68 + 1;
        }
        if (((DAT_006560f4[local_70 * 0x20] & 0x400) !== 0) && (4 < local_64)) {
          iVar1 = FUN_00453e51(local_7c, 0x15);
          if ((iVar1 === 0) &&
             (iVar1 = FUN_0043d20a(in_ECX[0x159c], 0x21), iVar1 === 0)) {
            local_44 = 1;
          } else {
            local_44 = 0;
          }
          if (local_64 === 6) {
            local_44 = local_44 + 1;
          } else if ((local_44 !== 0) && (local_30 === 0)) {
            local_44 = 0;
          }
          if (local_44 === 0) {
            local_44 = 1;
            local_2c = 2;
          } else {
            local_2c = 1;
          }
          local_68 = local_68 + local_44;
          local_30 = local_30 + 1;
        }
        FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
        uVar7 = 0; uVar6 = 0;
        uVar4 = local_1c;
        uVar5 = FUN_00511690(10);
        local_50 = FUN_00548b70(local_68, uVar5, uVar4, uVar6, uVar7);
        local_80 = local_6c;
        if (DAT_0064b1ca[u8(DAT_006560f6[local_70 * 0x20]) * 0x14] === 5) {
          for (local_24 = 0; local_24 < DAT_006a6608; local_24 = local_24 + 1) {
            FUN_005cef31(local_90, in_ECX, local_80, local_38);
            local_80 = local_80 + local_50;
          }
        }
        if ((DAT_006560f4[local_70 * 0x20] & 0x800) !== 0) {
          FUN_005cef31(local_a0, in_ECX, local_80, local_38);
          local_80 = local_80 + local_50;
        }
        if (local_2c !== 0) {
          for (local_24 = 0; local_24 < local_44; local_24 = local_24 + 1) {
            if (local_2c === 1) {
              FUN_005cef31(local_b0, in_ECX, local_80, local_38);
            } else {
              FUN_005cef31(local_c0, in_ECX, local_80, local_38);
            }
            local_80 = local_80 + local_50;
          }
        }
        FUN_0047df50();
        FUN_004086c0(local_14, local_6c, local_74, local_1c, local_1c);
        FUN_00511460(local_70, 6, local_14);
        local_60 = local_60 + 1;
        local_6c = local_6c + local_48;
        if (local_18 <= local_60) {
          local_60 = 0;
          local_6c = local_5c + local_4c;
          local_34 = local_34 + 1;
          local_74 = local_74 + local_78;
          if (local_28 <= local_34) break;
        }
      }
    }
    if (param_1 !== 0) {
      FUN_00408490(in_ECX + 0x162c);
    }
  }
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
  let uVar1;
  let iVar2, iVar3;
  let local_78 = new Array(16), local_68 = new Array(16), local_58 = new Array(16);
  let local_48, local_44, local_40, local_3c, local_38, local_34, local_30, local_2c;
  let local_28, local_24, local_20, local_1c, local_18;
  let local_14 = new Array(16);

  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    FUN_00501733(in_ECX + 0x163c, in_ECX);
    FUN_0046ac89(4);
    local_30 = in_ECX[0x166c];
    local_34 = in_ECX[0x1670];
    FUN_0040bbb0();
    FUN_0040bc10(0x1c0);
    FUN_005baee0(0x7c, 0x12, 1, 1);
    uVar1 = FUN_00407f90(in_ECX + 0x163c);
    iVar3 = in_ECX[0x1640];
    iVar2 = FUN_00511690(1);
    FUN_0043c910(DAT_00679640, in_ECX[0x163c], iVar3 - iVar2, uVar1);
    local_3c = FUN_00511690(2);
    local_3c = local_30 + local_3c;
    local_44 = FUN_00511690(1);
    local_44 = local_34 + local_44;
    iVar3 = FUN_00407fc0(in_ECX + 0x166c);
    iVar2 = FUN_00511690(1);
    local_20 = FUN_00511690(0xc);
    local_20 = ((iVar3 - (iVar2 >> 1)) / local_20) | 0;
    local_18 = in_ECX[0x15d4] * 2 + -8;
    for (local_1c = 0; local_1c < local_20; local_1c = local_1c + 1) {
      uVar1 = FUN_00511690(0xc);
      iVar3 = FUN_00511690(0xc0);
      iVar2 = FUN_00511690(4);
      FUN_004086c0(local_14, local_3c, local_44, iVar3 - iVar2, uVar1);
      FUN_00511460(local_1c, 4, local_14);
      iVar3 = FUN_00511690(0xc);
      local_44 = local_44 + iVar3;
    }
    local_44 = local_34 + 1;
    local_38 = 0;
    for (local_40 = 0; local_40 < 0x43; local_40 = local_40 + 1) {
      if (local_40 < 0x27) {
        local_48 = FUN_0043d20a(in_ECX[0x159c], local_40);
        local_24 = -1;
      }
      else {
        local_24 = local_40 + -0x27;
        if (s16(DAT_00655be6, local_24 * 2) === in_ECX[0x159c]) {
          local_48 = 1;
        } else {
          local_48 = 0;
        }
      }
      if (((local_48 !== 0) && (local_38 = local_38 + 1, in_ECX[0x15b4] + 1 <= local_38)) &&
         (local_38 <= in_ECX[0x15b4] + local_20)) {
        FUN_0047df20(local_18);
        if (local_24 < 0) {
          FUN_005cef31(local_68, in_ECX, local_3c, local_44);
        } else {
          FUN_005cef31(local_58, in_ECX, local_3c, local_44);
        }
        FUN_0047df50();
        local_28 = FUN_00511690(0x18);
        local_28 = local_3c + local_28;
        local_2c = local_44 + -1;
        FUN_0040bbb0();
        FUN_0040ff00(DAT_0064c488[local_40 * 8]);
        FUN_005baee0(0x29, 10, 1, 0);
        FUN_0043c8d0(DAT_00679640, local_28, local_2c + -1);
        iVar3 = in_ECX[0x1674];
        iVar2 = FUN_00511690(0xe);
        local_28 = FUN_00511690(4);
        local_28 = (iVar3 - iVar2) - local_28;
        if (local_24 < 0) {
          FUN_0047df20(in_ECX[0x15d4] * 3 + -7);
          FUN_005cef31(local_78, in_ECX, local_28, local_2c);
          FUN_0047df50();
        }
        iVar3 = FUN_00511690(0xc);
        local_44 = local_44 + iVar3;
      }
    }
    DAT_006aa770 = local_38;
    FUN_0040fd40(0, local_38 + -1);
    FUN_005db0d0(local_20 + -1);
    FUN_0040fcf0(in_ECX[0x15b4]);
    if (param_1 !== 0) {
      FUN_00408490(in_ECX + 0x163c);
    }
  }
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
  let iVar1, iVar2;
  let uVar3, uVar4, uVar5;

  if (DAT_00630d2c === 0) {
    DAT_00630d2c = 1;
    iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
    if ((s8(DAT_0064f348[iVar1 * 0x58]) === DAT_006d1da0) || (DAT_00655b07 !== 0)) {
      uVar4 = 0;
      iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
      FUN_004eb4ed(iVar1, uVar4);
      DAT_0063605c = 8;
      FUN_005cdea1(0x40, 0x20, 0);
      FUN_00506448(param_1);
      FUN_0040ffa0(s_CHILDCLICK_00630dbc, 1);
      // CPropertySheet::EnableStackedTabs — DEVIATION: Win32 no-op
      FUN_0059ec88(0, param_1, 0);
      uVar5 = 0;
      uVar3 = 4;
      uVar4 = FUN_00428b0c(DAT_00628420[0x4c8], 4, 0);
      FUN_0059edf0(uVar4, uVar3, uVar5);
      iVar1 = FUN_0040bc80(0);
      if (0 < iVar1) {
        if (iVar1 === 3) {
          DAT_006560ff[param_1 * 0x20] = 0xb;
          iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
          w16(DAT_00656102, param_1 * 0x20, s16(DAT_0064f340, iVar1 * 0x58));
          iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
          w16(DAT_00656104, param_1 * 0x20, s16(DAT_0064f342, iVar1 * 0x58));
        }
        else if (iVar1 === 4) {
          iVar1 = FUN_0043cf76(s16(DAT_006560f0, param_1 * 0x20),
                               s16(DAT_006560f2, param_1 * 0x20));
          if (-1 < iVar1) {
            let cost = ((s8(DAT_0064b1c8[u8(DAT_006560f6[param_1 * 0x20]) * 0x14]) *
                        DAT_0064bccc) / 2) | 0;
            w16(DAT_0064f35c, iVar1 * 0x58,
                 cost + s16(DAT_0064f35c, iVar1 * 0x58));
            iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
            if (iVar2 === iVar1) {
              iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
              FUN_004e7492(iVar1);
            }
          }
          FUN_005b6042(param_1, 1);
          citywin_9429();
        }
        else {
          // case 2 (activate unit) and others
          iVar2 = FUN_005b633f(param_1);
          if (iVar2 === 0) {
            FUN_004897fa(0);
          }
          else {
            DAT_00655afe = param_1;
            DAT_006560ff[param_1 * 0x20] = 0xff;
            DAT_006d1da8 = 0;
            FUN_00489a0d(0);
          }
          if (iVar1 === 2) {
            citywin_994F();
          }
        }
      }
    }
    DAT_00630d2c = 0;
    FUN_00506a15();
    FUN_00506a1e();
    FUN_00506a34();
    return;
  }
  FUN_00506a15();
  FUN_00506a1e();
  FUN_00506a34();
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
  let iVar1, iVar2, iVar3;
  let uVar4, uVar5, uVar6, uVar7;

  if (DAT_00630d2c !== 0) {
    citywin_70B8(); citywin_70C1(); citywin_70D7();
    return;
  }
  DAT_00630d2c = 1;
  FUN_005cdea1(0x40, 0x20, 0);
  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if ((s8(DAT_0064f348[iVar1 * 0x58]) !== DAT_006d1da0) && (DAT_00655b07 === 0)) {
    DAT_00630d2c = 0; citywin_70B8(); citywin_70C1(); citywin_70D7(); return;
  }
  uVar6 = 0;
  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar1, uVar6);
  if (DAT_006aa768 !== 0) {
    DAT_00630d2c = 0; citywin_70B8(); citywin_70C1(); citywin_70D7(); return;
  }
  iVar1 = param_1;
  iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
  iVar2 = s16(DAT_0064f342, iVar2 * 0x58);
  iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
  uVar6 = FUN_005b2e69(s16(DAT_0064f340, iVar3 * 0x58), iVar2, iVar1);
  iVar1 = FUN_005b2f92(uVar6);
  if (iVar1 < 0) {
    DAT_00630d2c = 0; citywin_70B8(); citywin_70C1(); citywin_70D7(); return;
  }
  FUN_00506448(iVar1);
  FUN_0040ffa0(s_UNITOPTIONS_00630dc8, 1);
  DAT_0063605c = 8;
  // CPropertySheet setup — DEVIATION: Win32 no-op
  FUN_0059ec88(0, iVar1, 0);
  uVar7 = 0; uVar5 = 0;
  uVar6 = FUN_00428b0c(DAT_00628420[0x144], 0, 0);
  FUN_0059edf0(uVar6, uVar5, uVar7);
  if (DAT_006560ff[iVar1 * 0x20] !== -1) {
    uVar7 = 0; uVar5 = 1;
    uVar6 = FUN_00428b0c(DAT_00628420[0x148], 1, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
    FUN_0059ea99(1);
  }
  if (DAT_006560ff[iVar1 * 0x20] !== 3) {
    uVar7 = 0; uVar5 = 2;
    uVar6 = FUN_00428b0c(DAT_00628420[0x14c], 2, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
  }
  if ((DAT_006560ff[iVar1 * 0x20] !== 1) && (DAT_006560ff[iVar1 * 0x20] !== 2)) {
    uVar7 = 0; uVar5 = 3;
    uVar6 = FUN_00428b0c(DAT_00628420[0x150], 3, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
  }
  uVar4 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (uVar4 !== u8(DAT_00656100[iVar1 * 0x20])) {
    uVar7 = 0; uVar5 = 5;
    uVar6 = FUN_00428b0c(DAT_00628420[0x2cc], 5, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
    if (DAT_00656100[iVar1 * 0x20] !== -1) {
      uVar7 = 0; uVar5 = 6;
      uVar6 = FUN_00428b0c(DAT_00628420[0x2f4], 6, 0);
      FUN_0059edf0(uVar6, uVar5, uVar7);
    }
  }
  uVar7 = 0; uVar5 = 7;
  uVar6 = FUN_00428b0c(DAT_00628420[0x2d0], 7, 0);
  FUN_0059edf0(uVar6, uVar5, uVar7);
  if ((((DAT_00655b0b & (1 << (DAT_006560f7[iVar1 * 0x20] & 0x1f))) !== 0) &&
      (DAT_00655b05 !== 0)) && (iVar2 = FUN_005b2c3d(iVar1), iVar2 !== 0)) {
    uVar7 = 0; uVar5 = 8;
    uVar6 = FUN_00428b0c(DAT_00628420[0x2f8], 8, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
    uVar7 = 0; uVar5 = 9;
    uVar6 = FUN_00428b0c(DAT_00628420[0x2fc], 9, 0);
    FUN_0059edf0(uVar6, uVar5, uVar7);
  }
  uVar6 = FUN_0040bc80(0);
  switch (uVar6) {
  case 1:
    DAT_006560ff[iVar1 * 0x20] = 0xff;
    break;
  case 2:
    FUN_005b2f50(iVar1);
    break;
  case 3:
    DAT_006560ff[iVar1 * 0x20] = 1;
    FUN_005b6787(iVar1);
    break;
  case 4:
    FUN_005b3863(iVar1, 1);
    break;
  case 5:
    iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
    DAT_00656100[iVar1 * 0x20] = iVar2 & 0xff;
    citywin_9429();
    DAT_00630d2c = 0; citywin_70B8(); citywin_70C1(); citywin_70D7(); return;
  case 6:
    handle_city_disorder_00509590(DAT_00656100[iVar1 * 0x20]);
    DAT_00630d2c = 0; citywin_70B8(); citywin_70C1(); citywin_70D7(); return;
  case 7:
    iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
    let shieldCost = ((s8(DAT_0064b1c8[u8(DAT_006560f6[iVar1 * 0x20]) * 0x14]) *
                      DAT_0064bccc) / 2) | 0;
    w16(DAT_0064f35c, iVar2 * 0x58,
         shieldCost + s16(DAT_0064f35c, iVar2 * 0x58));
    iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
    FUN_004e7492(iVar2);
    FUN_005b6042(iVar1, 1);
    citywin_9429();
    DAT_00630d2c = 0; citywin_70B8(); citywin_70C1(); citywin_70D7(); return;
  case 8:
    DAT_00655afe = iVar1;
    DAT_006560ff[iVar1 * 0x20] = 0xff;
    DAT_006d1da8 = 0;
    FUN_00489a0d(0);
    break;
  case 9:
    DAT_00655afe = iVar1;
    DAT_006560ff[iVar1 * 0x20] = 0xff;
    DAT_006d1da8 = 0;
    FUN_00489a0d(0);
    citywin_994F();
    DAT_00630d2c = 0; citywin_70B8(); citywin_70C1(); citywin_70D7(); return;
  }
  uVar6 = 0;
  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar1, uVar6);
  citywin_8ADC(1);
  DAT_00630d2c = 0;
  citywin_70B8(); citywin_70C1(); citywin_70D7();
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
  let iVar1, iVar3, iVar4, iVar5, iVar6;
  let uVar2;
  let local_a4, local_a0, local_9c;
  let local_98 = new Array(16), local_88 = new Array(16);
  let local_78, local_74, local_70, local_6c, local_68, local_64, local_60;
  let local_5c, local_58, local_54, local_50, local_4c, local_48, local_44;
  let local_40, local_3c, local_38, local_34, local_30, local_2c, local_28;
  let local_24, local_20;
  let local_1c = new Array(16);
  let local_c, local_8;

  local_54 = in_ECX[0x164c];
  local_58 = in_ECX[0x1650];
  local_2c = in_ECX[0x15d8];
  local_6c = FUN_00472cf0(0x40, local_2c);
  local_28 = FUN_00472cf0(0x30, local_2c);
  local_c = FUN_00472cf0(0x40, local_2c);
  local_64 = FUN_00472cf0(0x34, local_2c);
  local_50 = FUN_00511690(0xf4);
  local_50 = (local_50 / local_c) | 0;
  iVar1 = FUN_00511690(0xf4);
  local_8 = ((iVar1 - local_c * local_50) / 2) | 0;
  local_20 = FUN_00472cf0(4, local_2c);
  local_3c = local_50 << 2;
  FUN_0046ac89(3);
  local_78 = FUN_005b2e69(s16(DAT_0064f340, in_ECX[0x159c] * 0x58),
                          s16(DAT_0064f342, in_ECX[0x159c] * 0x58));
  local_68 = 0;
  local_38 = 0;
  local_44 = local_54 + local_8;
  local_5c = FUN_005b50ad(local_78, 2);
  if (local_5c <= local_50) {
    local_20 = local_20 + (local_64 >> 1);
    FUN_0040bbb0();
    FUN_0040bc10(0x1c3);
    FUN_005baee0(0x7c, 0x12, 1, 1);
    uVar2 = FUN_00407f90(in_ECX + 0x168c);
    iVar1 = FUN_00511690(1);
    FUN_0043c910(DAT_00679640, in_ECX[0x168c], in_ECX[0x1690] + iVar1, uVar2);
  }
  local_70 = local_44;
  local_74 = local_58 + local_20;
  FUN_005baeb0(in_ECX);
  FUN_005baec8(in_ECX + 0x16ac);
  local_48 = local_50;
  for (; -1 < local_78; local_78 = FUN_005b2c82(local_78)) {
    FUN_0056baff(in_ECX, local_78, 4, local_70, local_74, local_2c, 0);
    if (local_38 < 2) {
      iVar1 = FUN_00511690(0);
      local_34 = local_74 + iVar1 + local_28;
      FUN_0040bbb0();
      if (DAT_00656100[local_78 * 0x20] === -1) {
        FUN_0040bc10(0xe);
      } else {
        FUN_0040bbe0(DAT_0064f360[u8(DAT_00656100[local_78 * 0x20]) * 0x58]);
      }
      DAT_00679643 = 0;
      FUN_005baee0(10, 0x1a, 1, 1);
      FUN_0043c910(DAT_00679640, local_70, local_34, local_6c);
    }
    local_68 = local_68 + 1;
    local_70 = local_70 + local_c;
    if (local_50 <= local_68) {
      local_70 = local_44;
      local_74 = local_74 + local_64;
      local_38 = local_38 + 1;
      local_68 = 0;
      if (local_38 === 2) {
        local_70 = (local_c >> 1) + local_54 + local_8;
        local_74 = (local_64 >> 1) + local_58 + local_20;
        local_50 = local_50 + -1;
        local_44 = local_70;
      }
      else if (local_38 === 4) break;
    }
  }
  local_68 = 0;
  local_38 = 0;
  local_50 = local_48;
  local_70 = local_54 + local_8;
  local_74 = local_58 + local_20;
  local_44 = local_70;
  for (local_40 = 0; local_40 < local_3c; local_40 = local_40 + 1) {
    if (local_38 === 0) {
      local_9c = local_28 + -3;
    } else {
      local_9c = local_28;
    }
    FUN_004086c0(local_1c, local_70, local_74, local_6c, local_9c);
    FUN_00511460(local_40, 3, local_1c);
    local_68 = local_68 + 1;
    local_70 = local_70 + local_c;
    if (local_50 <= local_68) {
      local_68 = 0;
      local_38 = local_38 + 1;
      local_70 = local_44;
      local_74 = local_74 + local_64;
      if (local_38 === 2) {
        local_70 = (local_c >> 1) + local_54 + local_8;
        local_74 = (local_64 >> 1) + local_58 + local_20;
        local_50 = local_50 + -1;
        local_44 = local_70;
      }
      else if (local_38 === 4) break;
    }
  }
  if (DAT_006a6584 !== 0) {
    FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
    iVar3 = FUN_00407f90(in_ECX + 0x164c, 0);
    iVar1 = FUN_00511690(0xe);
    iVar3 = iVar3 - iVar1;
    uVar2 = FUN_00511690(0x40);
    iVar4 = FUN_00511690(100);
    iVar4 = local_58 + iVar4;
    iVar5 = FUN_00511690(7);
    FUN_005114d0(DAT_006466c8, local_54 + iVar5, iVar4, DAT_006a6584, DAT_006a6584, uVar2, iVar3);
    FUN_0047df50();
  }
  local_70 = FUN_00511690(7);
  local_70 = local_54 + local_70;
  local_44 = local_70;
  local_74 = FUN_00511690(0x85);
  local_74 = local_58 + local_74;
  _Timevec_destructor(in_ECX + 0x16ac);
  local_24 = -2; // extraout_EAX simplified
  FUN_005baee0(0x79, 0x12, 1, 1);
  iVar1 = FUN_004bd9f0(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), 0x54);
  if (iVar1 !== 0) {
    FUN_0040bbb0();
    FUN_0040bc10(0x56);
    FUN_0040fe40();
    for (local_30 = 0; local_30 < 3; local_30 = local_30 + 1) {
      local_60 = (s8(DAT_0064f37b[in_ECX[0x159c] * 0x58 + local_30]) < 0) ? 1 : 0;
      if (local_60 !== 0) { FUN_0040fea0(); }
      if (s8(DAT_0064f37b[in_ECX[0x159c] * 0x58 + local_30]) < 1) {
        local_a0 = ~s8(DAT_0064f37b[in_ECX[0x159c] * 0x58 + local_30]) + 1;
      } else {
        local_a0 = s8(DAT_0064f37b[in_ECX[0x159c] * 0x58 + local_30]);
      }
      FUN_0040ff00(DAT_0064b168[local_a0 * 4]);
      if (local_60 !== 0) { FUN_0040fed0(); }
      if (local_30 < 2) { FUN_00421d30(); }
    }
    FUN_0043c8d0(DAT_00679640, local_70, local_74);
    local_74 = local_74 + local_24;
    FUN_0040bbb0();
    FUN_0040bc10(0x57);
    FUN_0040fe40();
    for (local_30 = 0; local_30 < 3; local_30 = local_30 + 1) {
      local_60 = (s8(DAT_0064f37e[in_ECX[0x159c] * 0x58 + local_30]) < 0) ? 1 : 0;
      if (local_60 !== 0) { FUN_0040fea0(); }
      if (s8(DAT_0064f37e[in_ECX[0x159c] * 0x58 + local_30]) < 1) {
        local_a4 = ~s8(DAT_0064f37e[in_ECX[0x159c] * 0x58 + local_30]) + 1;
      } else {
        local_a4 = s8(DAT_0064f37e[in_ECX[0x159c] * 0x58 + local_30]);
      }
      FUN_0040ff00(DAT_0064b168[local_a4 * 4]);
      if (local_60 !== 0) { FUN_0040fed0(); }
      if (local_30 < 2) { FUN_00421d30(); }
    }
    FUN_0043c8d0(DAT_00679640, local_70, local_74);
    local_74 = local_74 + local_24;
  }
  iVar1 = FUN_00511690(2);
  local_74 = local_74 + iVar1;
  for (local_30 = 0; local_30 < s8(DAT_0064f37a[in_ECX[0x159c] * 0x58]); local_30 = local_30 + 1) {
    FUN_0040bbb0();
    FUN_0040bbe0(DAT_0064f360[s16(DAT_0064f384, in_ECX[0x159c] * 0x58 + local_30 * 2) * 0x58]);
    FUN_0040fe10();
    if (s8(DAT_0064f381[in_ECX[0x159c] * 0x58 + local_30]) < 0) {
      FUN_0040bc10(0xc0);
    } else {
      FUN_0040ff00(DAT_0064b168[s8(DAT_0064f381[in_ECX[0x159c] * 0x58 + local_30]) * 4]);
    }
    FUN_0040fe40();
    if (s8(DAT_0064f381[in_ECX[0x159c] * 0x58 + local_30]) < 0) {
      FUN_0040bbe0(DAT_00630dd4);
      iVar1 = FUN_0043c8d0(DAT_00679640, local_70, local_74);
      local_4c = FUN_00511690(2);
      local_4c = iVar1 + local_4c;
      FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
      iVar1 = FUN_00511690(3);
      FUN_005cef31(local_98, in_ECX, local_4c, local_74 + iVar1);
      FUN_0047df50();
    } else {
      FUN_00511430();
      FUN_0040ff30(DAT_006a6590[local_30 * 4]);
      iVar1 = FUN_0043c8d0(DAT_00679640, local_70, local_74);
      local_4c = FUN_00511690(2);
      local_4c = iVar1 + local_4c;
      FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
      iVar1 = FUN_00511690(3);
      FUN_005cef31(local_88, in_ECX, local_4c, local_74 + iVar1);
      FUN_0047df50();
    }
    local_74 = local_74 + local_24;
  }
  return;
}



// ============================================================
// Function: citywin_7B69 @ 0x00507B69
// Size: 968 bytes
// ============================================================

// citywin_draw_minimap — draw minimap in city window
export function citywin_7B69(in_ECX) {
  let cVar1, iVar3, iVar4, iVar5, iVar6;
  let uVar2;
  let local_34, local_30, local_20, local_8;

  cVar1 = s8(DAT_0064f348[in_ECX[0x159c] * 0x58]);
  FUN_0040bbb0();
  FUN_0040bc10(0x1c4);
  FUN_005baee0(0x7c, 0x12, 1, 1);
  uVar2 = FUN_00407f90(in_ECX + 0x168c);
  iVar3 = FUN_00511690(1);
  FUN_0043c910(DAT_00679640, in_ECX[0x168c], in_ECX[0x1690] + iVar3, uVar2);
  iVar3 = FUN_00407f90(in_ECX + 0x164c);
  iVar4 = FUN_00407fc0(in_ECX + 0x164c);
  iVar5 = FUN_005adfa0(((iVar3 + -4) / DAT_006d1160) | 0, 1, ((iVar4 + -4) / DAT_006d1162) | 0);
  iVar3 = ((iVar3 + -4) - DAT_006d1160 * iVar5 >> 1) + 2 + in_ECX[0x164c];
  iVar4 = ((iVar4 + -4) - DAT_006d1162 * iVar5 >> 1) + 2 + in_ECX[0x1650];
  local_8 = s16(DAT_0064c6ac, cVar1 * 0x594) - (DAT_006d1160 >> 1);
  if ((DAT_00655ae8 & 0x8000) !== 0) {
    local_8 = 0;
  }
  for (local_30 = 0; local_30 < DAT_006d1162; local_30 = local_30 + 1) {
    for (local_20 = 0; local_20 < DAT_006d1160; local_20 = local_20 + 1) {
      uVar2 = FUN_005ae052(local_20 + local_8);
      iVar6 = FUN_004087c0(uVar2, local_30);
      if ((iVar6 !== 0) &&
         ((iVar6 = FUN_005b8b65(uVar2, local_30, cVar1), iVar6 !== 0) ||
          (DAT_00655b07 !== 0))) {
        iVar6 = FUN_005b89e4(uVar2, local_30);
        FUN_00408780(local_20 * iVar5 + iVar3, local_30 * iVar5 + iVar4, iVar5, iVar5,
                     (iVar6 === 0 ? 0xffffffd3 : 0) + 0x5d);
      }
    }
  }
  for (local_34 = 0; local_34 < DAT_00655b16; local_34 = local_34 + 1) {
    if ((DAT_0065610a[local_34 * 0x20] !== 0) &&
       (u8(DAT_00656100[local_34 * 0x20]) === in_ECX[0x159c])) {
      iVar6 = FUN_005ae052(s16(DAT_006560f0, local_34 * 0x20) - local_8);
      FUN_00408780(iVar6 * iVar5 + iVar3,
                   s16(DAT_006560f2, local_34 * 0x20) * iVar5 + iVar4, iVar5, iVar5, 0x1d);
    }
  }
  iVar6 = FUN_005ae052(s16(DAT_0064f340, in_ECX[0x159c] * 0x58) - local_8);
  FUN_00408780(iVar6 * iVar5 + iVar3,
               s16(DAT_0064f342, in_ECX[0x159c] * 0x58) * iVar5 + iVar4, iVar5, iVar5, 0x29);
  return;
}



// ============================================================
// Function: citywin_7F31 @ 0x00507F31
// Size: 561 bytes
// ============================================================

// citywin_draw_wonder_icons — draw wonder/improvement icons in info pane
export function citywin_7F31(param_1, param_2, param_3, in_ECX) {
  let iVar1;
  let local_28 = new Array(16);
  let local_18, local_14, local_10, local_c, local_8;

  local_10 = 0;
  iVar1 = FUN_00511690(0x14);
  local_14 = ((param_3 >> 1) + param_2) - (iVar1 >> 1);
  local_c = 0;
  while (true) {
    if (3 < local_c) { return; }
    local_8 = 0;
    switch (local_c) {
    case 0:
      local_18 = 0xe;
      break;
    case 1:
      local_18 = 0xb;
      iVar1 = FUN_004bd9f0(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), 0x37);
      if (iVar1 !== 0) {
        iVar1 = FUN_00453e51(s8(DAT_0064f348[in_ECX[0x159c] * 0x58]), 10);
        if (iVar1 !== 0) {
          local_8 = 1;
          local_18 = 0x31;
        }
        break;
      }
      local_c = local_c + 1; continue;
    case 2:
      local_18 = 4;
      break;
    case 3:
      iVar1 = FUN_0043d20a(in_ECX[0x159c], 1);
      if (iVar1 === 0) { local_18 = 7; }
      else { local_18 = 1; }
      if (DAT_0064c6b5[s8(DAT_0064f348[in_ECX[0x159c] * 0x58]) * 0x594] !== 6) {
        local_c = local_c + 1; continue;
      }
      break;
    }
    iVar1 = FUN_0043d20a(in_ECX[0x159c], local_18);
    if ((iVar1 !== 0) || (local_8 !== 0)) {
      if (2 < local_10) { return; }
      if (local_10 !== 0) {
        iVar1 = FUN_00511690(2);
        param_1[0] = param_1[0] - iVar1;
      }
      local_10 = local_10 + 1;
      iVar1 = FUN_00511690(0x24);
      param_1[0] = param_1[0] - iVar1;
      FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
      FUN_005cef31(local_28, in_ECX, param_1[0], local_14);
      FUN_0047df50();
    }
    local_c = local_c + 1;
  }
}



// ============================================================
// Function: citywin_8177 @ 0x00508177
// Size: 987 bytes
// ============================================================

// citywin_draw_unit_defense_icons — draw unit/defense icons in info pane
export function citywin_8177(param_1, param_2, param_3, param_4, in_ECX) {
  let bVar2 = false;
  let iVar3, iVar4, iVar6;
  let uVar5;
  let local_38, local_28, local_20, local_18, local_14, local_10, local_c, local_8;

  iVar3 = s8(DAT_0064f348[in_ECX[0x159c] * 0x58]);
  let bVar1 = u8(DAT_0064c6b5[iVar3 * 0x594]);
  local_c = in_ECX[0x15d8];
  iVar4 = FUN_00472cf0(0x40, local_c);
  local_8 = FUN_00472cf0(0x30, local_c);
  param_3 = param_3 >> 1;
  if (bVar1 === 4) {
    _Timevec_destructor(in_ECX + 0x16ac);
    FUN_005baee0(0x29, 10, 1, 0);
    uVar5 = FUN_00428b0c(DAT_0064b9b0, param_1[0], (param_3 + param_2) - (0 >> 1), 0);
    iVar3 = FUN_0043c950(uVar5);
    param_1[0] = iVar3;
  }
  else if (bVar1 < 5) {
    local_28 = 0;
    for (local_38 = 0; local_38 < DAT_00655b16; local_38 = local_38 + 1) {
      if (((DAT_0065610a[local_38 * 0x20] !== 0) &&
          (iVar3 = local_8 >> 1,
          s16(DAT_0064f340, in_ECX[0x159c] * 0x58) ===
          s16(DAT_006560f0, local_38 * 0x20))) &&
         (s16(DAT_0064f342, in_ECX[0x159c] * 0x58) ===
          s16(DAT_006560f2, local_38 * 0x20)) &&
         (DAT_0064b1c4[u8(DAT_006560f6[local_38 * 0x20]) * 0x14] !== 0)) {
        local_28 = local_28 + 1;
        if (3 < local_28) { return; }
        param_1[0] = param_1[0] - iVar4;
        if (bVar2) {
          iVar6 = FUN_00511690(2);
          param_1[0] = param_1[0] - iVar6;
        } else {
          bVar2 = true;
        }
        FUN_0056baff(in_ECX, local_38, 4, param_1[0], (param_3 + param_2) - iVar3, local_c, 0);
      }
    }
  }
  else {
    iVar4 = FUN_00511690(10);
    iVar6 = FUN_00453e51(iVar3, 0x15);
    if ((iVar6 === 0) &&
       (iVar6 = FUN_0043d20a(in_ECX[0x159c], 0x21), iVar6 === 0)) {
      local_18 = 1;
    } else {
      local_18 = 0;
    }
    if (DAT_0064c6b5[iVar3 * 0x594] === 6) {
      local_18 = local_18 + 1;
    }
    if (local_18 !== 0) {
      local_20 = DAT_006a65e4;
      if ((DAT_006a65e4 !== 0) && (DAT_0064c6b5[iVar3 * 0x594] === 5)) {
        local_20 = DAT_006a65e4 + -1;
      }
      local_14 = local_20 * local_18;
      if (local_14 !== 0) {
        iVar3 = FUN_00511690(2);
        param_4 = param_4 - iVar3;
        uVar5 = 0;
        local_10 = param_4;
        iVar3 = FUN_00511690(10);
        iVar3 = FUN_00548b70(local_14, iVar3 + 1, param_4, 0, uVar5);
        local_10 = FUN_00511690(10);
        local_10 = local_10 + (local_14 + -1) * iVar3;
        param_1[0] = param_1[0] - local_10;
        FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
        uVar5 = 0;
        iVar6 = FUN_00511690(10);
        FUN_005114d0(DAT_00646598, param_1[0], (param_3 + param_2) - (iVar4 >> 1), local_14,
                     local_14, iVar6 + 1, local_10, uVar5);
        FUN_0047df50();
      }
    }
  }
  return;
}



// ============================================================
// Function: citywin_8552 @ 0x00508552
// Size: 1393 bytes
// ============================================================

// citywin_draw_info_view — draw city info view (stats, food/shields breakdown)
export function citywin_8552(in_ECX) {
  let uVar1;
  let iVar2, iVar3, iVar4;
  let local_64 = new Array(16), local_54 = new Array(16);
  let local_44, local_40, local_3c, local_38, local_34, local_30, local_2c, local_28;
  let local_24, local_20, local_1c, local_18, local_14, local_10, local_c, local_8;

  local_44 = s8(DAT_0064f348[in_ECX[0x159c] * 0x58]);
  FUN_0040bbb0();
  FUN_0040bc10(0x1c5);
  FUN_005baee0(0x7c, 0x12, 1, 1);
  uVar1 = FUN_00407f90(in_ECX + 0x168c);
  iVar2 = FUN_00511690(1);
  FUN_0043c910(DAT_00679640, in_ECX[0x168c], in_ECX[0x1690] + iVar2, uVar1);
  local_20 = in_ECX[0x168c] + 2;
  iVar2 = FUN_00511690(0xe);
  local_34 = in_ECX[0x1690] + iVar2 + 2;
  local_30 = FUN_00407f90(in_ECX + 0x168c);
  local_30 = local_30 + -4;
  local_3c = FUN_00407fc0(in_ECX + 0x168c);
  local_3c = local_3c + -4;
  local_10 = (local_3c / 5) | 0;
  local_38 = local_20;
  local_40 = local_34;
  iVar4 = local_10 >> 1;
  iVar2 = FUN_00511690(0x1e);
  local_24 = iVar4 - (iVar2 >> 1);
  local_14 = 0;
  local_18 = 0;
  while (true) {
    if (4 < local_18) { return; }
    if (local_18 !== 0) {
      FUN_005113b0(in_ECX[0x168c], in_ECX[0x1694] + -1, local_40, 0x7c);
    }
    local_c = local_30 >> 1;
    local_2c = local_38 + local_30;
    switch (local_18) {
    case 0: break;
    case 1:
      if (u8(DAT_006a6620[local_14]) - u8(DAT_006a65f0[local_14]) !==
          DAT_006a6621 - DAT_006a65f1) {
        local_14 = 1;
        local_8 = FUN_00511690(0xe);
        local_2c = local_2c - local_8;
        iVar4 = (local_10 >> 1) + local_40;
        iVar2 = FUN_00511690(0xe);
        local_1c = iVar4 - (iVar2 >> 1);
        FUN_0047df20(in_ECX[0x15d4] * 4 + -8);
        FUN_005cef31(local_54, in_ECX, local_2c, local_1c);
        FUN_0047df50();
        break;
      }
      // fall through to next
      local_18 = local_18 + 1;
      iVar2 = FUN_00511690(2);
      local_2c = local_2c - iVar2;
      local_28 = local_2c - local_38;
      iVar2 = local_28;
      if (local_c <= local_28) { iVar2 = local_c; }
      local_c = iVar2;
      FUN_00501e63(local_38, local_40 + local_24, iVar2, DAT_006a6620[local_18],
                   DAT_006a65f0[local_18], DAT_006a6628[local_18]);
      local_40 = local_40 + local_10;
      continue;
    case 2:
      iVar2 = FUN_0043d20a(in_ECX[0x159c], 4);
      if ((((iVar2 === 0) &&
           (iVar2 = FUN_0043d20a(in_ECX[0x159c], 0xe), iVar2 === 0)) &&
          (iVar2 = FUN_0043d20a(in_ECX[0x159c], 0xb), iVar2 === 0)) &&
         (iVar2 = FUN_00453e51(local_44, 10), iVar2 === 0) &&
         (((iVar2 = FUN_0043d20a(in_ECX[0x159c], 7), iVar2 === 0) &&
          (iVar2 = FUN_0043d20a(in_ECX[0x159c], 1), iVar2 === 0)) ||
         (DAT_0064c6b5[local_44 * 0x594] !== 6))) {
        local_18 = local_18 + 1; continue;
      }
      local_14 = 2;
      citywin_7F31([local_2c], local_40, local_10, in_ECX);
      break;
    case 3:
      if (u8(DAT_006a6620[local_14]) - u8(DAT_006a65f0[local_14]) ===
          DAT_006a6623 - DAT_006a65f3) {
        local_18 = local_18 + 1; continue;
      }
      citywin_8177([local_2c], local_40, local_10, local_30, in_ECX);
      break;
    case 4:
      if (DAT_006a6623 - DAT_006a65f3 === DAT_006a6624 - DAT_006a65f4) {
        local_18 = local_18 + 1; continue;
      }
      iVar2 = (local_10 >> 1) + local_40;
      _Timevec_destructor(in_ECX + 0x16ac);
      local_1c = iVar2 - (0 >> 1);
      FUN_005baee0(0x29, 10, 1, 0);
      uVar1 = FUN_00428b0c(DAT_00628420[0x160], local_2c, local_1c, 0);
      local_2c = FUN_0043c950(uVar1);
      break;
    }
    iVar2 = FUN_00511690(2);
    local_2c = local_2c - iVar2;
    local_28 = local_2c - local_38;
    iVar2 = local_28;
    if (local_c <= local_28) { iVar2 = local_c; }
    local_c = iVar2;
    if ((local_18 === 2) && (DAT_0064c6b5[local_44 * 0x594] === 4)) {
      iVar2 = (local_10 >> 1) + local_40;
      _Timevec_destructor(in_ECX + 0x16ac);
      local_1c = iVar2 - (0 >> 1);
      FUN_005baee0(0x29, 10, 1, 0);
      FUN_0040bbb0();
      FUN_0040bc10(0x5d);
      FUN_0040fe40();
      FUN_0040ff30(DAT_006a6618);
      iVar4 = (local_10 >> 1) + local_40;
      iVar2 = FUN_00511690(0xe);
      local_1c = iVar4 - (iVar2 >> 1);
      FUN_005cef31(local_64, in_ECX, local_38, local_1c);
      iVar2 = local_1c;
      iVar4 = FUN_00511690(0xe);
      iVar3 = FUN_00511690(3);
      FUN_0043c8d0(DAT_00679640, iVar4 + iVar3 + local_38, iVar2);
    }
    else {
      FUN_00501e63(local_38, local_40 + local_24, iVar2, DAT_006a6620[local_18],
                   DAT_006a65f0[local_18], DAT_006a6628[local_18]);
    }
    local_40 = local_40 + local_10;
    local_18 = local_18 + 1;
  }
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
  let iVar1, iVar2, iVar3, iVar4;
  let uVar5, uVar6, uVar7;

  iVar4 = in_ECX[0x15c4];
  iVar1 = in_ECX[0x15c8];
  if (0 < iVar4) {
    iVar3 = in_ECX[0x15bc];
    iVar2 = FUN_00511690(0x27c);
    iVar3 = iVar3 - (iVar4 + iVar2);
    FUN_00408780(in_ECX[0x124], in_ECX[0x128], in_ECX[0x15c4], in_ECX[0x15c0], 10);
    uVar6 = 10;
    uVar5 = in_ECX[0x15c0];
    uVar7 = in_ECX[0x128];
    iVar2 = FUN_00511690(0x27c);
    FUN_00408780(in_ECX[0x124] + iVar2 + iVar4, uVar7, iVar3, uVar5, uVar6);
  }
  if (0 < iVar1) {
    iVar4 = in_ECX[0x15c0];
    iVar3 = FUN_00511690(0x1a5);
    iVar4 = iVar4 - (iVar1 + iVar3);
    FUN_00408780(in_ECX[0x124], in_ECX[0x128], in_ECX[0x15bc], in_ECX[0x15c8], 10);
    uVar7 = 10;
    uVar5 = in_ECX[0x15bc];
    iVar3 = FUN_00511690(0x1a5);
    FUN_00408780(in_ECX[0x124], in_ECX[0x128] + iVar3 + iVar1, uVar5, iVar4, uVar7);
  }
  return;
}



// ============================================================
// Function: citywin_9028 @ 0x00509028
// Size: 647 bytes
// ============================================================

// citywin_resize_and_layout — resize city window and recalculate layout
export function citywin_9028(in_ECX) {
  let iVar4, iVar5;
  let uVar3, uVar6;
  let pCVar1, pCVar2;
  let local_10;

  iVar4 = in_ECX[0x11c];
  pCVar1 = in_ECX[0x12c]; // CRichEditCntrItem::GetActiveView
  pCVar2 = in_ECX[0x130]; // CRichEditCntrItem::GetActiveView
  in_ECX[0x15d4] = 2;
  if ((iVar4 + 0x297 <= pCVar1) && (iVar4 * 2 + 0x3b6 <= pCVar2)) {
    in_ECX[0x15d4] = 3;
  }
  if ((pCVar1 < iVar4 + 0x1b9) || (pCVar2 < iVar4 * 2 + 0x278)) {
    in_ECX[0x15d4] = 1;
  }
  if (in_ECX[0x15d4] < 2) {
    local_10 = 0xc;
    in_ECX[0x118] = 0x12;
  }
  else {
    local_10 = FUN_00511690(0x10);
    uVar3 = FUN_00511690(0x18);
    in_ECX[0x118] = uVar3;
  }
  FUN_00417ef0(0, local_10);
  FUN_00417ef0(0, ((local_10 * 2) / 3) | 0);
  FUN_00552ed2();
  in_ECX[0x15bc] = in_ECX[0x12c];
  in_ECX[0x15c0] = in_ECX[0x130];
  FUN_0050101f();
  iVar4 = FUN_00511690(0x27c);
  iVar5 = FUN_00511690(0x1a5);
  if (iVar4 < in_ECX[0x15bc]) {
    in_ECX[0x15c4] = in_ECX[0x15bc] - iVar4 >> 1;
  } else {
    in_ECX[0x15c4] = 0;
  }
  if (iVar5 < in_ECX[0x15c0]) {
    in_ECX[0x15c8] = in_ECX[0x15c0] - iVar5 >> 1;
  } else {
    in_ECX[0x15c8] = 0;
  }
  uVar6 = (in_ECX[0x15d4] < 3) ? 1 : 0;
  uVar3 = FUN_00511690(0xc);
  FUN_0043c6c0(1, uVar3, uVar6);
  if ((in_ECX[0x15c4] === in_ECX[0x15cc]) &&
     (in_ECX[0x15c8] === in_ECX[0x15d0])) {
    if (in_ECX[0x15cc] < 0) {
      citywin_CF06(in_ECX);
    }
  } else {
    citywin_CF06(in_ECX);
  }
  in_ECX[0x15cc] = in_ECX[0x15c4];
  in_ECX[0x15d0] = in_ECX[0x15c8];
  return;
}



// ============================================================
// Function: citywin_92AF @ 0x005092AF
// Size: 378 bytes
// ============================================================

// citywin_update_title — update city window title bar text
export function citywin_92AF(in_ECX) {
  let iVar1;

  FUN_0040bbb0();
  FUN_0040bc10(0x1f);
  FUN_0040fe10();
  FUN_00414d70(DAT_0064f360[in_ECX[0x159c] * 0x58]);
  if (1 < DAT_006aa78c) {
    FUN_00421d30();
    FUN_00421f10(DAT_00655afa);
    if ((DAT_00655af0 & 0x80) === 0) {
      FUN_00421d30();
      FUN_0040bc10(0x22);
      FUN_0040fe10();
      FUN_005116f0(in_ECX[0x159c]);
    }
    else if (((DAT_0064bc60 & 2) !== 0) &&
            (iVar1 = FUN_0043cef9(in_ECX[0x159c]), iVar1 !== 0)) {
      FUN_00421d30();
      FUN_0040bc10(0x1b0);
      if (1 < iVar1) {
        FUN_0040bbe0(DAT_00630dd8);
        FUN_0040ff30(iVar1);
      }
    }
    FUN_0040fe10();
    FUN_0040fea0();
    FUN_0040bc10(0x9a);
    FUN_0040fe40();
    FUN_0043c8a0(DAT_0064c6a2[s8(DAT_0064f348[in_ECX[0x159c] * 0x58]) * 0x594]);
    FUN_0040fed0();
  }
  FUN_0055324c(DAT_00679640);
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
  let iVar1;

  if ((DAT_0062edf8 === 0) ||
     (((((iVar1 = XD_InFlushSendBuffer(), iVar1 === 0) && (DAT_006ad8bc === 0)) && (DAT_006ad8c0 === 0)) &&
       (((DAT_006ad8c4 === 0) && (DAT_006ad8c8 === 0)) &&
        ((DAT_006ad8cc === 0) && ((DAT_006ad8d0 === 0) && (DAT_006ad8d8 === 0))))) &&
      ((DAT_006ad8dc === 0) && (((DAT_006ad8e0 === 0) && (DAT_006ad8e4 === 0)) && (DAT_006ad8e8 === 0))) &&
      (((DAT_006ad8ec === 0) && (DAT_006ad8f0 === 0)) &&
       ((((DAT_006ad8f4 === 0) && ((DAT_006ad8f8 === 0) && (DAT_006ad8fc === 0))) &&
        (DAT_006ad900 === 0)) && (DAT_006ad904 === 0))))) {
    DAT_00655aee = DAT_00655aee | 2;
    in_ECX[0x159c] = param_1;
    FUN_004e7492(in_ECX[0x159c]);
    if (in_ECX[0x15a4] !== 0) {
      in_ECX[0x15b0] = 0;
      in_ECX[0x15b4] = 0;
      in_ECX[0x15b8] = 1;
      if (in_ECX[0x15a0] !== 0) {
        FUN_004085f0();
      }
    }
    in_ECX[0x15a4] = 0;
    in_ECX[0x15a8] = 0;
    if (in_ECX[0x15a0] === 0) {
      FUN_005bb574();
      FUN_004085f0();
    } else {
      FUN_004e7240();
    }
    if (DAT_00630d20 !== 0) {
      citywin_CA8D(1, in_ECX);
      DAT_00630d20 = 0;
    }
    citywin_CCB3(1, in_ECX);
    DAT_00630d18 = 0;
    if (DAT_0062edf8 === 0) {
      if (((DAT_00655aea & 0x100) !== 0) && (3 < s8(DAT_0064f349[param_1 * 0x58])) &&
          ((DAT_00655af4 & 1) === 0) && (s8(DAT_0064f348[param_1 * 0x58]) !== DAT_006d1da0)) {
        FUN_004190d0(PTR_s_TUTORIAL_00627678, s_CITYSTUFF_00630e00);
        DAT_00655af4 = DAT_00655af4 | 1;
      }
    } else {
      if ((((((DAT_00655aea & 0x100) !== 0) && ((DAT_0064f344[param_1 * 0x58] & 1) !== 0)) ||
           (((DAT_0064f346[param_1 * 0x58] & 0x10) !== 0) && (DAT_00655b08 < 3))) &&
          ((s8(DAT_0064f348[param_1 * 0x58]) === DAT_006d1da0) && (DAT_00654fa8 === 0))) &&
         (FUN_004190d0(PTR_s_TUTORIAL_00627678, s_DISORDER_00630ddc), DAT_00631edc !== 0)) {
        FUN_004190d0(PTR_s_TUTORIAL_00627678, s_DISORDER2_00630de8);
        FUN_004190d0(PTR_s_TUTORIAL_00627678, s_DISORDER3_00630df4);
      }
      while (((in_ECX[0x15a0] === 0) && (in_ECX[0x15a4] === 0)) && (DAT_00630d18 === 0)) {
        FUN_0040ef50();
      }
    }
  }
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
  let bVar1;
  let iVar2, iVar3, iVar4, iVar5;
  let uVar6, uVar7, uVar8;
  let local_368, local_35c;

  iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (iVar2 === -1) { citywin_A1B2(); citywin_A1C8(); return; }
  iVar2 = XD_InFlushSendBuffer();
  if (iVar2 !== 0 || DAT_006ad8bc !== 0 || DAT_006ad8c0 !== 0 || DAT_006ad8c4 !== 0 ||
      DAT_006ad8c8 !== 0 || DAT_006ad8cc !== 0 || DAT_006ad8d0 !== 0 || DAT_006ad8d8 !== 0 ||
      DAT_006ad8dc !== 0 || DAT_006ad8e0 !== 0 || DAT_006ad8e4 !== 0 || DAT_006ad8e8 !== 0 ||
      DAT_006ad8ec !== 0 || DAT_006ad8f0 !== 0 || DAT_006ad8f4 !== 0 || DAT_006ad8f8 !== 0 ||
      DAT_006ad8fc !== 0 || DAT_006ad900 !== 0 || DAT_006ad904 !== 0) {
    debug_log(s_Citywin__city_button_buy___block_00630e0c);
    DAT_006c31ac = 7;
    DAT_006c31b0 = CSplitterWnd_IsTracking(DAT_006a91b8);
    iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
    DAT_006c31b4 = s8(DAT_0064f348[iVar2 * 0x58]);
    DAT_006c31b8 = param_1;
    citywin_A1B2(); citywin_A1C8(); return;
  }
  uVar7 = 0;
  iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar2, uVar7);
  iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
  iVar2 = s8(DAT_0064f348[iVar2 * 0x58]);
  iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
  iVar3 = s8(DAT_0064f379[iVar3 * 0x58]);
  iVar4 = CSplitterWnd_IsTracking(DAT_006a91b8);
  iVar4 = s8(DAT_0064f379[iVar4 * 0x58]);
  if ((DAT_006d1da0 !== iVar2) && (DAT_00655b07 === 0)) {
    citywin_A1B2(); citywin_A1C8(); return;
  }
  if (-iVar4 === 0x26) { citywin_A1B2(); citywin_A1C8(); return; }
  iVar5 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (s8(DAT_0064f379[iVar5 * 0x58]) < 0) {
    local_368 = u8(DAT_0064c48c[iVar4 * -8]);
    uVar8 = 999; uVar7 = 0;
    uVar6 = DAT_0064bccc;
    iVar5 = CSplitterWnd_IsTracking(DAT_006a91b8);
    iVar5 = FUN_005adfa0(uVar6 * local_368 - s16(DAT_0064f35c, iVar5 * 0x58), uVar7, uVar8);
    local_35c = iVar5 * 2;
    if (0x22 < -iVar4) { local_35c = iVar5 << 2; }
    FUN_004271e8(0, DAT_0064c488[iVar4 * -8]);
  } else {
    local_368 = s8(DAT_0064b1c8[iVar3 * 0x14]);
    uVar8 = 999; uVar7 = 0;
    uVar6 = DAT_0064bccc;
    iVar5 = CSplitterWnd_IsTracking(DAT_006a91b8);
    iVar5 = FUN_005adfa0(uVar6 * local_368 - s16(DAT_0064f35c, iVar5 * 0x58), uVar7, uVar8);
    local_35c = ((iVar5 * iVar5) / 0x14) | 0 + iVar5 * 2;
    FUN_004271e8(0, DAT_0064b1b8[iVar3 * 0x14]);
  }
  iVar5 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (s16(DAT_0064f35c, iVar5 * 0x58) === 0) {
    local_35c = local_35c << 1;
  }
  FUN_00421da0(0, local_35c);
  FUN_00467580(1, DAT_0064c6a2[iVar2 * 0x594]);
  FUN_005f22d0(0, s_COMPLETE0_00630e54);
  bVar1 = local_35c <= DAT_0064c6a2[iVar2 * 0x594];
  iVar5 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if ((-1 < s8(DAT_0064f379[iVar5 * 0x58])) &&
     (iVar5 = CSplitterWnd_IsTracking(DAT_006a91b8),
     (DAT_0064f344[iVar5 * 0x58] & 1) !== 0)) {
    bVar1 = false;
  }
  FUN_0043c9d0(0);
  iVar5 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (s8(DAT_0064f379[iVar5 * 0x58]) < 0) {
    FUN_0059ec88(DAT_00645160[iVar4 * -0x3c], 0, 0);
  } else {
    FUN_0059ec88(DAT_00641848[iVar3 * 0x3c], 0, 0);
  }
  // CPropertySheet — DEVIATION
  if (bVar1) { FUN_0059ea99(1); }
  iVar3 = FUN_0040bc80(0);
  if (bVar1) {
    if ((iVar3 === 0) && (DAT_006aa75c !== 1)) {
      DAT_0064c6a2[iVar2 * 0x594] = DAT_0064c6a2[iVar2 * 0x594] - local_35c;
      iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
      w16(DAT_0064f35c, iVar2 * 0x58, DAT_0064bccc * local_368);
      iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
      FUN_004e7492(iVar2);
      FUN_0046e020(0x68, 1, 0, 0);
      uVar7 = 1;
      iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
      FUN_004eb4ed(iVar2, uVar7);
      FUN_0050503e(1);
      citywin_92AF();
      FUN_00569363(1);
    }
  }
  citywin_A1B2(); citywin_A1C8();
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
  let bVar1, iVar2, iVar3, iVar4;
  let uVar6;
  let local_95c, local_958;
  let local_660, local_65c, local_658;
  let local_578;
  let local_6c, local_68, local_14;

  iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (iVar2 === -1) { citywin_B638(); citywin_B644(); citywin_B650(); citywin_B666(); return; }
  iVar2 = XD_InFlushSendBuffer();
  if (iVar2 !== 0 || DAT_006ad8bc !== 0 || DAT_006ad8c0 !== 0 || DAT_006ad8c4 !== 0 ||
      DAT_006ad8c8 !== 0 || DAT_006ad8cc !== 0 || DAT_006ad8d0 !== 0 || DAT_006ad8d8 !== 0 ||
      DAT_006ad8dc !== 0 || DAT_006ad8e0 !== 0 || DAT_006ad8e4 !== 0 || DAT_006ad8e8 !== 0 ||
      DAT_006ad8ec !== 0 || DAT_006ad8f0 !== 0 || DAT_006ad8f4 !== 0 || DAT_006ad8f8 !== 0 ||
      DAT_006ad8fc !== 0 || DAT_006ad900 !== 0 || DAT_006ad904 !== 0) {
    debug_log(s_Citywin__city_button_change___bl_00630e60);
    DAT_006c31ac = 8;
    DAT_006c31b0 = CSplitterWnd_IsTracking(DAT_006a91b8);
    iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
    DAT_006c31b4 = s8(DAT_0064f348[iVar2 * 0x58]);
    DAT_006c31b8 = param_1;
    citywin_B638(); citywin_B644(); citywin_B650(); citywin_B666(); return;
  }
  uVar6 = 0;
  iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar2, uVar6);
  iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
  bVar1 = DAT_0064f348[iVar2 * 0x58];
  iVar2 = s8(bVar1);
  if ((DAT_006d1da0 !== iVar2) && (DAT_00655b07 === 0)) {
    citywin_B638(); citywin_B644(); citywin_B650(); citywin_B666(); return;
  }
  iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
  local_658 = s8(DAT_0064f379[iVar3 * 0x58]);
  // Main production dialog loop — simplified for transpilation
  // Build list, show dialog, apply selection
  iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (iVar3 === -1) { citywin_B638(); citywin_B644(); citywin_B650(); citywin_B666(); return; }
  FUN_0040ff60(0, DAT_0064f360[iVar3 * 0x58]);
  FUN_0043c9d0(s_PRODUCTION_00630f1c);
  // CPropertySheet — DEVIATION
  FUN_0043c990(0x4b, 0);
  local_65c = 0;
  for (local_660 = 0; local_660 < 0x3e; local_660 = local_660 + 1) {
    iVar3 = local_660;
    iVar4 = CSplitterWnd_IsTracking(DAT_006a91b8);
    iVar3 = FUN_004bfe5a(iVar2, iVar4, iVar3);
    if (iVar3 !== 0) {
      FUN_0040bbb0();
      FUN_0040ff00(DAT_0064b1b8[local_660 * 0x14]);
      FUN_0040fe10();
      FUN_0040bbe0(DAT_00630f28);
      FUN_0040fea0();
      iVar3 = local_660;
      iVar4 = CSplitterWnd_IsTracking(DAT_006a91b8);
      uVar6 = FUN_004e74df(iVar4, iVar3);
      citywin_9AC0(s8(DAT_0064b1c8[local_660 * 0x14]), uVar6);
      FUN_00421d30();
      FUN_0040bc10(0xaa);
      FUN_0040fe40();
      FUN_0040ff30(s8(DAT_0064b1c4[local_660 * 0x14]));
      FUN_0040bbe0(DAT_00630f2c);
      FUN_0040ff30(s8(DAT_0064b1c5[local_660 * 0x14]));
      if ((DAT_0064b1bd[local_660 * 0x14] & 4) !== 0) {
        FUN_0040bbe0(DAT_00630f30);
      }
      FUN_0040bbe0(DAT_00630f34);
      FUN_0040ff30((s8(DAT_0064b1c2[local_660 * 0x14]) / DAT_0064bcc8) | 0);
      FUN_0040fe10();
      FUN_0040bc10(0xab);
      FUN_0040fe40();
      FUN_0040ff30((s8(DAT_0064b1c6[local_660 * 0x14]) / 10) | 0);
      FUN_0040bbe0(DAT_00630f38);
      FUN_0040ff30(s8(DAT_0064b1c7[local_660 * 0x14]));
      FUN_0040fed0();
      FUN_0059edf0(DAT_00679640, local_660, 0);
      if (local_658 === local_660) { FUN_0059ea99(local_660); }
      local_65c = local_65c + 1;
    }
  }
  for (local_95c = 1; local_95c < 0x27; local_95c = local_95c + 1) {
    iVar3 = local_95c;
    iVar4 = CSplitterWnd_IsTracking(DAT_006a91b8);
    iVar3 = FUN_004c03ae(iVar2, iVar4, iVar3);
    if (iVar3 !== 0) {
      FUN_0040bbb0();
      FUN_0040ff00(DAT_0064c488[local_95c * 8]);
      FUN_0040fe10();
      FUN_0040bbe0(DAT_00630f3c);
      FUN_0040fea0();
      iVar3 = -local_95c;
      iVar4 = CSplitterWnd_IsTracking(DAT_006a91b8);
      uVar6 = FUN_004e74df(iVar4, iVar3);
      citywin_9AC0(DAT_0064c48c[local_95c * 8], uVar6);
      FUN_0040fed0();
      FUN_0059edf0(DAT_00679640, local_95c + 0x3e, 0);
      if (-local_658 === local_95c) { FUN_0059ea99(local_95c + 0x3e); }
      local_65c = local_65c + 1;
    }
  }
  for (local_6c = 0; local_6c < 0x1c; local_6c = local_6c + 1) {
    iVar3 = FUN_004c02d8(iVar2, local_6c);
    if (iVar3 !== 0) {
      local_95c = local_6c + 0x27;
      FUN_0040bbb0();
      iVar3 = FUN_00453da0(local_6c);
      if (iVar3 !== 0) { FUN_00414d70(DAT_00630f40); }
      FUN_0040ff00(DAT_0064c488[local_95c * 8]);
      FUN_0040fe10();
      FUN_0040bbe0(DAT_00630f44);
      FUN_0040fea0();
      iVar3 = -local_95c;
      iVar4 = CSplitterWnd_IsTracking(DAT_006a91b8);
      uVar6 = FUN_004e74df(iVar4, iVar3);
      citywin_9AC0(DAT_0064c48c[local_95c * 8], uVar6);
      FUN_0040fed0();
      FUN_0059edf0(DAT_00679640, local_6c + 0x65, 0);
      if (-local_658 === local_95c) { FUN_0059ea99(local_95c + 0x3e); }
      local_65c = local_65c + 1;
    }
  }
  local_958 = FUN_005a5f34(0, 300);
  if ((local_958 < 0) ||
     (iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8), iVar3 === -1)) {
    citywin_CCB3(1);
    citywin_B638(); citywin_B644(); citywin_B650(); citywin_B666(); return;
  }
  iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
  DAT_0064f344[iVar3 * 0x58] = DAT_0064f344[iVar3 * 0x58] & 0xfcffffef;
  // Apply production choice
  if (local_958 < 0x3e) {
    local_14 = local_958;
  } else {
    local_14 = -(local_958 + -0x3e);
  }
  iVar3 = local_14;
  iVar4 = CSplitterWnd_IsTracking(DAT_006a91b8);
  local_68 = FUN_004e74df(iVar4, iVar3);
  iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (-1 < s8(DAT_0064f379[iVar3 * 0x58])) {
    iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
    DAT_0064c7f4[iVar2 * 0x594 + s8(DAT_0064f379[iVar3 * 0x58])] =
         DAT_0064c7f4[iVar2 * 0x594 + s8(DAT_0064f379[iVar3 * 0x58])] + -1;
  }
  iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
  DAT_0064f379[iVar3 * 0x58] = local_14 & 0xff;
  iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (-1 < s8(DAT_0064f379[iVar3 * 0x58])) {
    iVar3 = CSplitterWnd_IsTracking(DAT_006a91b8);
    DAT_0064c7f4[iVar2 * 0x594 + s8(DAT_0064f379[iVar3 * 0x58])] =
         DAT_0064c7f4[iVar2 * 0x594 + s8(DAT_0064f379[iVar3 * 0x58])] + 1;
  }
  iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
  w16(DAT_0064f35c, iVar2 * 0x58, local_68);
  FUN_00436287(1);
  FUN_00436287(2);
  uVar6 = 1;
  iVar2 = CSplitterWnd_IsTracking(DAT_006a91b8);
  FUN_004eb4ed(iVar2, uVar6);
  FUN_0050503e(1);
  FUN_005025d5(1);
  citywin_CCB3(1);
  citywin_B638(); citywin_B644(); citywin_B650(); citywin_B666();
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
  let iVar1;

  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if ((iVar1 !== -1) &&
     (iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8),
     s8(DAT_0064f348[iVar1 * 0x58]) === DAT_006d1da0)) {
    iVar1 = XD_InFlushSendBuffer();
    if (iVar1 === 0 && DAT_006ad8bc === 0 && DAT_006ad8c0 === 0 && DAT_006ad8c4 === 0 &&
        DAT_006ad8c8 === 0 && DAT_006ad8cc === 0 && DAT_006ad8d0 === 0 && DAT_006ad8d8 === 0 &&
        DAT_006ad8dc === 0 && DAT_006ad8e0 === 0 && DAT_006ad8e4 === 0 && DAT_006ad8e8 === 0 &&
        DAT_006ad8ec === 0 && DAT_006ad8f0 === 0 && DAT_006ad8f4 === 0 && DAT_006ad8f8 === 0 &&
        DAT_006ad8fc === 0 && DAT_006ad900 === 0 && DAT_006ad904 === 0) {
      DAT_00630d30 = 0;
      DAT_00635a3c = 0; // LAB_00402815
      iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
      iVar1 = FUN_00421ed0(s_RENAMECITY_00630fb4, 0xf, DAT_0064f360[iVar1 * 0x58], 0);
      if ((iVar1 === 0) &&
         (iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8), iVar1 !== -1)) {
        FUN_0046e020(0x68, 0, 0, 0);
        iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
        FUN_005f22d0(DAT_0064f360[iVar1 * 0x58], 0);
        citywin_9429();
        FUN_0047cf9e(DAT_006d1da0, 1);
      }
      DAT_00630d30 = 0;
    } else {
      debug_log(s_Citywin__city_button_rename___bl_00630f68);
      DAT_006c31ac = 10;
      DAT_006c31b0 = CSplitterWnd_IsTracking(DAT_006a91b8);
      iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
      DAT_006c31b4 = s8(DAT_0064f348[iVar1 * 0x58]);
      DAT_006c31b8 = param_1;
    }
  }
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
  let iVar1;

  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if (iVar1 !== -1) {
    iVar1 = XD_InFlushSendBuffer();
    if (iVar1 === 0 && DAT_006ad8bc === 0 && DAT_006ad8c0 === 0 && DAT_006ad8c4 === 0 &&
        DAT_006ad8c8 === 0 && DAT_006ad8cc === 0 && DAT_006ad8d0 === 0 && DAT_006ad8d8 === 0 &&
        DAT_006ad8dc === 0 && DAT_006ad8e0 === 0 && DAT_006ad8e4 === 0 && DAT_006ad8e8 === 0 &&
        DAT_006ad8ec === 0 && DAT_006ad8f0 === 0 && DAT_006ad8f4 === 0 && DAT_006ad8f8 === 0 &&
        DAT_006ad8fc === 0 && DAT_006ad900 === 0 && DAT_006ad904 === 0) {
      iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
      FUN_00454260(iVar1);
    } else {
      debug_log(s_Citywin__city_button_view___bloc_00630fc0);
      DAT_006c31ac = 9;
      DAT_006c31b0 = CSplitterWnd_IsTracking(DAT_006a91b8);
      iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
      DAT_006c31b4 = s8(DAT_0064f348[iVar1 * 0x58]);
      DAT_006c31b8 = param_1;
    }
  }
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
  let iVar1;
  let local_c, local_10, local_8, local_64;

  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if ((iVar1 !== -1) &&
     ((iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8),
      s8(DAT_0064f348[iVar1 * 0x58]) === DAT_006d1da0) || (DAT_00655b07 !== 0))) {
    if (DAT_0062edf8 === 0) {
      local_c = CSplitterWnd_IsTracking(DAT_006a91b8);
      local_10 = -1;
      local_8 = local_c;
      let local_60 = s__00631008;
      let local_b4 = DAT_0064f360[local_8 * 0x58];
      for (local_64 = 0; local_64 < DAT_00655b18; local_64 = local_64 + 1) {
        if ((DAT_0064f394[local_64 * 0x58] !== 0) &&
           (DAT_0064f348[local_8 * 0x58] === DAT_0064f348[local_64 * 0x58])) {
          iVar1 = __strcmpi(DAT_0064f360[local_64 * 0x58], local_60);
          if ((0 < iVar1) &&
             (iVar1 = __strcmpi(DAT_0064f360[local_64 * 0x58], DAT_0064f360[local_8 * 0x58]),
             iVar1 < 0)) {
            local_10 = local_64;
            local_60 = DAT_0064f360[local_64 * 0x58];
          }
          iVar1 = __strcmpi(DAT_0064f360[local_64 * 0x58], local_b4);
          if (0 < iVar1) {
            local_c = local_64;
            local_b4 = DAT_0064f360[local_64 * 0x58];
          }
        }
      }
      if (local_10 < 0) {
        if (local_8 !== local_c) {
          handle_city_disorder_00509590(local_c);
        }
      } else {
        handle_city_disorder_00509590(local_10);
      }
    } else {
      FUN_005013bc();
    }
  }
  return;
}



// ============================================================
// Function: citywin_BF72 @ 0x0050BF72
// Size: 607 bytes
// ============================================================

// citywin_next_city — navigate to next city (alphabetical)
export function citywin_BF72(in_ECX) {
  let iVar1;
  let local_c, local_10, local_8, local_64;

  iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
  if ((iVar1 !== -1) &&
     ((iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8),
      s8(DAT_0064f348[iVar1 * 0x58]) === DAT_006d1da0) || (DAT_00655b07 !== 0))) {
    if (DAT_0062edf8 === 0) {
      local_c = CSplitterWnd_IsTracking(DAT_006a91b8);
      local_10 = -1;
      local_8 = local_c;
      let local_60 = s_zzzzzzzzzzzzzzzzzzzzzzzzz_00631024;
      let local_b4 = DAT_0064f360[local_8 * 0x58];
      for (local_64 = 0; local_64 < DAT_00655b18; local_64 = local_64 + 1) {
        if ((DAT_0064f394[local_64 * 0x58] !== 0) &&
           (DAT_0064f348[local_8 * 0x58] === DAT_0064f348[local_64 * 0x58])) {
          iVar1 = __strcmpi(DAT_0064f360[local_64 * 0x58], local_60);
          if ((iVar1 < 0) &&
             (iVar1 = __strcmpi(DAT_0064f360[local_64 * 0x58], DAT_0064f360[local_8 * 0x58]),
             0 < iVar1)) {
            local_10 = local_64;
            local_60 = DAT_0064f360[local_64 * 0x58];
          }
          iVar1 = __strcmpi(DAT_0064f360[local_64 * 0x58], local_b4);
          if (iVar1 < 0) {
            local_c = local_64;
            local_b4 = DAT_0064f360[local_64 * 0x58];
          }
        }
      }
      if (local_10 < 0) {
        if (local_c !== local_8) {
          handle_city_disorder_00509590(local_c);
        }
      } else {
        handle_city_disorder_00509590(local_10);
      }
    } else {
      FUN_005013bc();
    }
  }
  return;
}



// ============================================================
// Function: city_mouse @ 0x0050C1D1
// Size: 535 bytes
// ============================================================

// city_mouse — handle mouse click in city window
export function city_mouse(param_1, param_2, param_3) {
  let iVar1;
  let local_10, local_c, local_8;

  iVar1 = XD_InFlushSendBuffer();
  if (iVar1 === 0 && DAT_006ad8bc === 0 && DAT_006ad8c0 === 0 && DAT_006ad8c4 === 0 &&
      DAT_006ad8c8 === 0 && DAT_006ad8cc === 0 && DAT_006ad8d0 === 0 && DAT_006ad8d8 === 0 &&
      DAT_006ad8dc === 0 && DAT_006ad8e0 === 0 && DAT_006ad8e4 === 0 && DAT_006ad8e8 === 0 &&
      DAT_006ad8ec === 0 && DAT_006ad8f0 === 0 && DAT_006ad8f4 === 0 && DAT_006ad8f8 === 0 &&
      DAT_006ad8fc === 0 && DAT_006ad900 === 0 && DAT_006ad904 === 0) {
    local_c = FUN_0046ad85(param_1, param_2, 0, 0);
    if (-1 < local_c) {
      local_8 = local_c; // pane id
      local_10 = 0; // hit item
      switch (local_8) {
      case 1:
        FUN_005022c0(param_1, param_2);
        break;
      case 2:
        FUN_00501819(local_10);
        break;
      case 3:
        FUN_00506a42(local_10);
        break;
      case 4:
        FUN_00505d3d(local_10);
        break;
      case 5:
        break;
      case 6:
        FUN_00506637(local_10);
        break;
      }
    }
  } else {
    debug_log(s_Citywin__city_mouse___blocked_by_00631040);
    DAT_006c31ac = 6;
    DAT_006c31b0 = CSplitterWnd_IsTracking(DAT_006a91b8);
    iVar1 = CSplitterWnd_IsTracking(DAT_006a91b8);
    DAT_006c31b4 = s8(DAT_0064f348[iVar1 * 0x58]);
    DAT_006c31b8 = param_1;
    DAT_006c31bc = param_2;
    DAT_006c31c0 = param_3;
  }
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
  if (((in_ECX[0x15a4] === 0) && (in_ECX[0x15a0] === 0)) &&
      (in_ECX[0x15a8] === 0) && (-1 < in_ECX[0x159c])) {
    if (param_1 < 0) {
      if ((s16(DAT_0064f340, in_ECX[0x159c] * 0x58) === param_2) &&
         (s16(DAT_0064f342, in_ECX[0x159c] * 0x58) === param_3)) {
        FUN_004eb4ed(in_ECX[0x159c], 0);
        citywin_8ADC(1, in_ECX);
        FUN_0050503e(1, in_ECX);
      }
    }
    else if (((s16(DAT_0064f340, in_ECX[0x159c] * 0x58) ===
               s16(DAT_006560f0, param_1 * 0x20)) &&
             (s16(DAT_0064f342, in_ECX[0x159c] * 0x58) ===
              s16(DAT_006560f2, param_1 * 0x20))) ||
            ((s16(DAT_0064f340, in_ECX[0x159c] * 0x58) === param_2) &&
             (s16(DAT_0064f342, in_ECX[0x159c] * 0x58) === param_3))) {
      FUN_004eb4ed(in_ECX[0x159c], 0);
      citywin_8ADC(1, in_ECX);
      FUN_0050503e(1, in_ECX);
      if (u8(DAT_00656100[param_1 * 0x20]) === in_ECX[0x159c]) {
        FUN_004eb4ed(in_ECX[0x159c], 1);
        FUN_00505666(1, in_ECX);
        FUN_00501780(0, in_ECX);
      }
    }
  }
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
  let uVar2, uVar3;
  let iVar4, iVar5;
  let local_30;
  let local_20 = new Array(16);

  if (in_ECX[0x16bc] !== 0) {
    if (in_ECX[0x16bc] !== 0) {
      FUN_004bb3b0(1);
    }
    in_ECX[0x16bc] = 0;
  }
  local_30 = FUN_0040f3e0();
  in_ECX[0x16bc] = local_30;
  FUN_005d8236(in_ECX + 0x16ac);
  uVar2 = FUN_00511690(0x18);
  uVar3 = FUN_00511690(0x39);
  iVar4 = FUN_00511690(0x16c);
  iVar5 = in_ECX[0x15c8] + iVar4 + in_ECX[0x128];
  iVar4 = FUN_00511690(0x1cb);
  FUN_004086c0(local_20, in_ECX[0x124] + iVar4 + in_ECX[0x15c4], iVar5, uVar3, uVar2);
  uVar2 = FUN_00511690(0x19);
  iVar4 = FUN_00511690(0x3a);
  iVar5 = FUN_00511690(0x3a);
  FUN_0043c790(local_20, iVar4 + iVar5, uVar2);
  uVar2 = FUN_00428b0c(DAT_00628420[0x94 +
                       ((in_ECX[0x15ac] === 2 ? 0xcc : 0) * 4)]);
  FUN_0040f680(DAT_006a9200, 8, local_20, uVar2);
  FUN_0040f840();
  FUN_0040f880(citywin_BC4F);
  if (param_1 !== 0) {
    FUN_0040f380();
  }
  return;
}



// ============================================================
// Function: citywin_CCB3 @ 0x0050CCB3
// Size: 572 bytes
// ============================================================

// citywin_create_change_button — create the "Change" production button
export function citywin_CCB3(param_1, in_ECX) {
  let iVar1, iVar2, iVar3;
  let uVar5, uVar6;
  let iVar7, iVar8;
  let local_3c;
  let local_24 = new Array(16);
  let local_14;

  local_14 = (DAT_0064f344[in_ECX[0x159c] * 0x58] & 0x10) !== 0 ? 1 : 0;
  if (DAT_00630d24 !== local_14) {
    DAT_00630d24 = local_14;
    if (in_ECX[0x16b8] !== 0) {
      if (in_ECX[0x16b8] !== 0) {
        FUN_004bb3b0(1);
      }
      in_ECX[0x16b8] = 0;
    }
    local_3c = FUN_0040f3e0();
    in_ECX[0x16b8] = local_3c;
    FUN_005d8236(in_ECX + 0x16ac);
    iVar1 = in_ECX[0x15c4];
    iVar2 = in_ECX[0x124];
    iVar8 = in_ECX[0x128];
    iVar3 = in_ECX[0x15c8];
    uVar5 = FUN_00511690(0x18);
    uVar6 = FUN_00511690(0x44);
    iVar7 = FUN_00511690(0xb5);
    iVar7 = iVar8 + iVar3 + iVar7;
    iVar8 = FUN_00511690(0x1ba);
    FUN_004086c0(local_24, iVar1 + iVar2 + iVar8, iVar7, uVar6, uVar5);
    uVar6 = 0;
    uVar5 = FUN_00511690(0x73);
    FUN_0043c790(local_24, uVar5, uVar6);
    uVar5 = FUN_00428b0c(DAT_00628420[0x510 + ((local_14 === 0 ? 0xfffffee0 : 0) * 4)]);
    FUN_0040f680(DAT_006a9200, 2, local_24, uVar5);
    FUN_0040f880(city_button_change);
    if (param_1 !== 0) {
      FUN_0040f380();
    }
  }
  return;
}



// ============================================================
// Function: citywin_CF06 @ 0x0050CF06
// Size: 2883 bytes
// ============================================================

// citywin_create_all_buttons — create all city window buttons and controls
export function citywin_CF06(in_ECX) {
  let uVar1, uVar2;
  let iVar3, iVar4, iVar5, iVar6, iVar7;
  let local_90 = new Array(16);
  let local_28, local_2c, local_30;
  let local_20 = new Array(16);

  FUN_0040f350(0);
  citywin_C859(in_ECX);
  in_ECX[0x16b4] = FUN_0040f3e0();
  in_ECX[0x16b8] = FUN_0040f3e0();
  in_ECX[0x16c4] = FUN_0040f3e0();
  in_ECX[0x16cc] = FUN_0040f3e0();
  in_ECX[0x16d0] = FUN_0040f3e0();
  in_ECX[0x16c8] = FUN_0040f3e0();
  in_ECX[0x16c0] = FUN_0040f3e0();
  in_ECX[0x16d4] = 1; // font object placeholder
  in_ECX[0x16d8] = 1; // font object placeholder
  in_ECX[0x16dc] = FUN_0040fb00();
  local_28 = in_ECX[0x15c4] + in_ECX[0x124];
  local_2c = in_ECX[0x128] + in_ECX[0x15c8];
  FUN_005d8236(in_ECX + 0x16ac);
  citywin_CA8D(0, in_ECX);
  uVar1 = FUN_00511690(0x18);
  uVar2 = FUN_00511690(0x44);
  iVar3 = FUN_00511690(0xb5);
  iVar3 = local_2c + iVar3;
  iVar4 = FUN_00511690(0x1ba);
  FUN_004086c0(local_20, local_28 + iVar4, iVar3, uVar2, uVar1);
  uVar1 = FUN_00428b0c(DAT_00628420[0x8c]);
  FUN_0040f680(DAT_006a9200, 1, local_20, uVar1);
  FUN_0040f880(city_button_buy);
  DAT_00630d24 = 0xff;
  citywin_CCB3(0, in_ECX);
  uVar1 = FUN_00511690(0x18);
  uVar2 = FUN_00511690(0x15);
  iVar3 = FUN_00511690(0x16c);
  iVar3 = local_2c + iVar3;
  iVar4 = FUN_00511690(0x1b5);
  FUN_004086c0(local_20, local_28 + iVar4, iVar3, uVar2, uVar1);
  FUN_005011b4(DAT_006a9200, 9, in_ECX[0x16d4], DAT_00644770, local_20);
  FUN_005117f0(citywin_BF72);
  uVar1 = FUN_00511690(0x19);
  FUN_0043c790(local_20, 0, uVar1);
  FUN_005011b4(DAT_006a9200, 10, in_ECX[0x16d8], DAT_006480d8, local_20);
  FUN_005117f0(citywin_BD13);
  uVar1 = FUN_00511690(0x18);
  uVar2 = FUN_00511690(0x39);
  iVar3 = FUN_00511690(0x16c);
  iVar3 = local_2c + iVar3;
  iVar4 = FUN_00511690(0x1cb);
  FUN_004086c0(local_20, local_28 + iVar4, iVar3, uVar2, uVar1);
  uVar1 = FUN_00428b0c(DAT_00628420[0x9c]);
  FUN_0040f680(DAT_006a9200, 3, local_20, uVar1);
  FUN_0040f880(citywin_B9A4);
  uVar2 = 0;
  uVar1 = FUN_00511690(0x3a);
  FUN_0043c790(local_20, uVar1, uVar2);
  uVar1 = FUN_00428b0c(DAT_00628420[0xa4]);
  FUN_0040f680(DAT_006a9200, 4, local_20, uVar1);
  FUN_0040f880(citywin_BA07);
  uVar2 = 0;
  uVar1 = FUN_00511690(0x3a);
  FUN_0043c790(local_20, uVar1, uVar2);
  uVar1 = FUN_00428b0c(DAT_00628420[0xa8]);
  FUN_0040f680(DAT_006a9200, 5, local_20, uVar1);
  FUN_0040f880(city_button_rename);
  uVar1 = FUN_00511690(0x19);
  iVar3 = FUN_00511690(0xffffffc6);
  iVar4 = FUN_00511690(0xffffffc6);
  FUN_0043c790(local_20, iVar3 + iVar4, uVar1);
  uVar1 = FUN_00428b0c(DAT_00628420[0xa0]);
  FUN_0040f680(DAT_006a9200, 6, local_20, uVar1);
  FUN_0040f880(citywin_BA6A);
  uVar2 = 0;
  uVar1 = FUN_00511690(0x3a);
  FUN_0043c790(local_20, uVar1, uVar2);
  uVar1 = FUN_00428b0c(DAT_00628420[0x98]);
  FUN_0040f680(DAT_006a9200, 7, local_20, uVar1);
  FUN_0040f880(city_button_view);
  local_30 = GetSystemMetrics(2);
  iVar4 = FUN_00511690(0x83);
  iVar4 = iVar4 + -2;
  iVar3 = local_30;
  iVar5 = FUN_00511690(0x122);
  iVar7 = local_2c + iVar5 + 1;
  iVar5 = FUN_00511690(0xc0);
  iVar6 = FUN_00511690(0);
  FUN_004086c0(in_ECX + 0x169c, (iVar5 + iVar6 + local_28) - (local_30 + 1), iVar7, iVar3, iVar4);
  FUN_0040fc50(DAT_006a9200, 99, in_ECX + 0x169c, 1);
  iVar3 = FUN_00407fc0(in_ECX + 0x166c);
  iVar4 = FUN_00511690(1);
  iVar5 = FUN_00511690(0xc);
  FUN_005db0d0(((iVar3 - (iVar4 >> 1)) / iVar5) | 0);
  FUN_0040fd80(0); // callback LAB_00402f4f
  FUN_00451ac0(0); // keyboard handler
  iVar3 = in_ECX[0x15d4];
  if (iVar3 === 1) { in_ECX[0x15d8] = 0xfffffffb; }
  else if (iVar3 === 2) { in_ECX[0x15d8] = 0xfffffffe; }
  else if (iVar3 === 3) { in_ECX[0x15d8] = 1; }
  if (in_ECX[0x15d8] !== DAT_00630d28) {
    DAT_00630d28 = in_ECX[0x15d8];
    uVar1 = FUN_00472cf0(0x20, in_ECX[0x15d8]);
    uVar2 = FUN_00472cf0(0x40, in_ECX[0x15d8], uVar1);
    FUN_005bd65c(uVar2, uVar1);
    FUN_0047df20(in_ECX[0x15d8]);
    FUN_005cef31(local_90, DAT_006a9120, 0, 0);
    FUN_0047df50();
  }
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
  let iVar1, iVar2;
  let uVar3, uVar4, uVar5, uVar6, uVar7, uVar8, uVar9;

  FUN_00501440(in_ECX);
  in_ECX[0x15ac] = 0;
  in_ECX[0x15c8] = 0;
  in_ECX[0x15c4] = in_ECX[0x15c8];
  in_ECX[0x15d0] = 0xffffffff;
  in_ECX[0x15cc] = in_ECX[0x15d0];
  in_ECX[0x15a0] = 0;
  if ((DAT_00628048 === 0) || (DAT_00655280 === 0)) {
    citywin_9A49();
  }
  uVar9 = 8;
  uVar8 = 0x18;
  uVar7 = 0;
  iVar1 = FUN_00407fc0(DAT_00655344, 0, 0x18, 8);
  iVar1 = iVar1 - DAT_006335a4;
  iVar2 = FUN_00407f90(DAT_00655344, iVar1);
  iVar2 = iVar2 - DAT_006335a0;
  uVar4 = 2;
  uVar5 = DAT_00655344;
  uVar6 = DAT_00655348;
  uVar3 = FUN_00428b0c(DAT_00628420[0x1c], 2, DAT_00655344, DAT_00655348, iVar2);
  FUN_005534bc(uVar3, uVar4, uVar5, uVar6, iVar2, iVar1, uVar7, uVar8, uVar9);
  // CPropertySheet::EnableStackedTabs — DEVIATION: Win32 no-op
  FUN_0055318c(DAT_00645120, 1);
  FUN_0055318c(DAT_00648820, 2);
  FUN_0055318c(DAT_00647788, 3);
  // CPropertySheet::EnableStackedTabs — DEVIATION
  citywin_C7A3(in_ECX);
  // thunk_FUN_00408230(citywin_994F) — DEVIATION: register callback
  // Various Win32 message handler registration — DEVIATION
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

let DAT_00630d90 = '';
let DAT_00630dd4 = '';
let DAT_00630dd8 = '';
let DAT_00630f28 = '';
let DAT_00630f2c = '';
let DAT_00630f30 = '';
let DAT_00630f34 = '';
let DAT_00630f38 = '';
let DAT_00630f3c = '';
let DAT_00630f40 = '';
let DAT_00630f44 = '';
let DAT_00641848 = {};
let DAT_00644770 = {};
let DAT_00645120 = {};
let DAT_00645160 = {};
let DAT_00647788 = {};
let DAT_006480d8 = {};
let DAT_00648820 = {};
let DAT_0064b9b0 = 0;
let DAT_00679643 = 0;
let PTR_s_TUTORIAL_00627678 = 'TUTORIAL';

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
let s_Citywin__city_button_buy___block_00630e0c = 'Citywin: city_button_buy - blocked';
let s_Citywin__city_button_change___bl_00630e60 = 'Citywin: city_button_change - blocked';
let s_Citywin__city_button_rename___bl_00630f68 = 'Citywin: city_button_rename - blocked';
let s_Citywin__city_button_view___bloc_00630fc0 = 'Citywin: city_button_view - blocked';
let s_Citywin__city_mouse___blocked_by_00631040 = 'Citywin: city_mouse - blocked by';
let s_COMPLETE0_00630e54 = 'COMPLETE0';
let s_PRODUCTION_00630f1c = 'PRODUCTION';
let s_RENAMECITY_00630fb4 = 'RENAMECITY';

function FUN_005cdea1(a, b, c) { /* stub — create dialog context */ }
function FUN_004087c0(a, b) { return 1; /* stub — is tile on map */ }
function FUN_0043c6c0(a, b, c) { /* stub — set scrollbar mode */ }
function FUN_00467580(a, b) { /* stub — set treasury display */ }
function FUN_004e7240() { /* stub — recalculate active city */ }
function FUN_00408230(a) { /* stub — register close handler */ }
function FUN_00511720() { return {}; /* stub — create font object */ }
function FUN_00410d98(a, b) { /* stub — center map on tile */ }
function FUN_00410402(a, b) { /* stub — scroll to tile */ }

function XD_InFlushSendBuffer() { return 0; /* stub — network check */ }
function debug_log(a) { /* stub — debug log */ }
function operator_new(a) { return {}; /* stub — operator new */ }
function _Timevec_destructor(a) { return 0; /* stub — _Timevec::~_Timevec */ }
function tie(a) { /* stub — tie function */ }
function __strcmpi(a, b) { return 0; /* stub — case-insensitive strcmp */ }
function thunk_map_ascii() { /* stub — keyboard map */ }
function thunk_load_city_preferences() { /* stub — load preferences */ }
