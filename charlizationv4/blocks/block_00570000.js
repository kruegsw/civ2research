// ═══════════════════════════════════════════════════════════════════
// block_00570000.js — Mechanical transpilation of block_00570000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_00570000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_00570000.c
// ═══════════════════════════════════════════════════════════════════




// ═══════════════════════════════════════════════════════════════════
// STUB: Global DAT_ variables referenced but not defined in mem.js.
// ═══════════════════════════════════════════════════════════════════


// ── Dialog/UI state (stubs) ──

// ── Large data arrays (stubs) ──


// ═══════════════════════════════════════════════════════════════════
// FUN_0057075c — SEH_cleanup_1
// ═══════════════════════════════════════════════════════════════════
import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_0040bbb0, FUN_0040bbe0, FUN_0040bc10, FUN_0040bc80, FUN_0040f010, FUN_0040f570 } from './block_00400000.js';
import { FUN_0040fbb0, FUN_0040fe10, FUN_0040ff30, FUN_0040ff60 } from './block_00400000.js';
import { FUN_00410030, FUN_00410070, FUN_004105f8, FUN_00414dd0 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421da0, FUN_004271e8 } from './block_00420000.js';
import { FUN_0043c9d0, FUN_0043cc00, FUN_0043cf76, FUN_0043d20a, FUN_0043d289 } from './block_00430000.js';
import { FUN_00441b11, FUN_00442541, FUN_00444270, FUN_004442e0 } from './block_00440000.js';
import { FUN_00453e18, FUN_00453e51, FUN_00456f20, FUN_0045ac71 } from './block_00450000.js';
import { FUN_00467750, FUN_00467825, FUN_00467933, FUN_0046b14d, FUN_0046e020, FUN_0046e287 } from './block_00460000.js';
import { FUN_0047a6b0, FUN_0047c3e0, FUN_0047cea6, FUN_0047cf22, FUN_0047cf9e, FUN_0047df20 } from './block_00470000.js';
import { FUN_0047df50, FUN_0047dfb0, FUN_0047dff0, FUN_0047e94e } from './block_00470000.js';
import { FUN_00492c15, FUN_00493c7d } from './block_00490000.js';
import { FUN_004a7577, FUN_004a75a6, FUN_004a762d, FUN_004abfe5, kill_civ, new_civ } from './block_004A0000.js';
import { FUN_004b0b53, FUN_004bdb2c, FUN_004be6ba, FUN_004bf05b, FUN_004bfe5a } from './block_004B0000.js';
import { FUN_004c03ae, FUN_004c0cf7, FUN_004c4240, FUN_004ca39e, FUN_004cc870 } from './block_004C0000.js';
import { FUN_004eb80a, FUN_004ec312 } from './block_004E0000.js';
import { FUN_004fbd9d, FUN_004fc20d, FUN_004fc2bb } from './block_004F0000.js';
import { FUN_00511880 } from './block_00510000.js';
import { FUN_0055bef9 } from './block_00550000.js';
import { FUN_00569363, FUN_0056c5fc } from './block_00560000.js';
import { FUN_0059c575, FUN_0059db08, FUN_0059df8a, FUN_0059ec88 } from './block_00590000.js';
import { FUN_005adfa0, FUN_005ae1b0, FUN_005ae31d } from './block_005A0000.js';
import { FUN_005b29aa, FUN_005b29d7, FUN_005b2c3d, FUN_005b2c82, FUN_005b2d39, FUN_005b2e69 } from './block_005B0000.js';
import { FUN_005b3d06, FUN_005b4391, FUN_005b47fa, FUN_005b490e, FUN_005b50ad, FUN_005b53b6 } from './block_005B0000.js';
import { FUN_005b6042, FUN_005b8a81, FUN_005b8b1a, FUN_005b8b65, FUN_005b8da4, FUN_005b9179 } from './block_005B0000.js';
import { FUN_005b976d, FUN_005b99e8, FUN_005b9c49, FUN_005b9ec6, FUN_005b9f1c, FUN_005bb4ae } from './block_005B0000.js';
import { FUN_005bb574, FUN_005bcdfc, FUN_005bd65c, FUN_005bf071 } from './block_005B0000.js';
import { FUN_005c0073, FUN_005c00ce, FUN_005c0333, FUN_005c041f, FUN_005c044a, FUN_005c0bf2 } from './block_005C0000.js';
import { FUN_005c0c5d, FUN_005c61b0, FUN_005c64da, FUN_005c656b, FUN_005cde4d, FUN_005cdf50 } from './block_005C0000.js';
import { FUN_005cebb4, FUN_005cec44, FUN_005cedad, FUN_005cef31, FUN_005cef66, FUN_005cf23f } from './block_005C0000.js';
import { FUN_005cf467 } from './block_005C0000.js';
import { FUN_005dcc10 } from './block_005D0000.js';
import { FUN_005e0f2a, FUN_005e10fb, FUN_005e1118, FUN_005e11be, FUN_005e1226, FUN_005e14c8 } from './block_005E0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';

export function FUN_0057075c() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570772 — SEH_epilog_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_00570772() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570780 — load_terrain1_bitmap
// ═══════════════════════════════════════════════════════════════════
export function FUN_00570780() {
  // UI bitmap loading — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570fa2 — SEH_cleanup_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00570fa2() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570fb8 — SEH_epilog_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00570fb8() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00570fc6 — load_terrain2_bitmap
// ═══════════════════════════════════════════════════════════════════
export function FUN_00570fc6() {
  // UI bitmap loading — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005718ec — SEH_cleanup_3
// ═══════════════════════════════════════════════════════════════════
export function FUN_005718ec() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571902 — SEH_epilog_3
// ═══════════════════════════════════════════════════════════════════
export function FUN_00571902() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571910 — load_icons_bitmap
// ═══════════════════════════════════════════════════════════════════
export function FUN_00571910() {
  // UI bitmap loading — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571baa — SEH_cleanup_4
// ═══════════════════════════════════════════════════════════════════
export function FUN_00571baa() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571bc0 — SEH_epilog_4
// ═══════════════════════════════════════════════════════════════════
export function FUN_00571bc0() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00571bce — load_icons_bitmap_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00571bce() {
  // UI bitmap loading — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572065 — SEH_cleanup_5
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572065() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057207b — SEH_epilog_5
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057207b() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572089 — setup_dialog_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572089(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  // UI dialog setup — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005722ab — invalidate_map_display
// ═══════════════════════════════════════════════════════════════════
export function FUN_005722ab() {
  // UI display invalidation — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572364 — clear_map_dirty_flag
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572364() {
  G.DAT_006ac88c = 0;
  // CRichEditDoc::InvalidateObjectCache — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572389 — refresh_map_view
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572389() {
  // UI map refresh — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005723ee — draw_map_controls
// ═══════════════════════════════════════════════════════════════════
export function FUN_005723ee() {
  // UI drawing — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057261a — draw_color_swatch
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057261a(param_1, param_2, param_3, param_4) {
  // UI drawing — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572740 — hit_test_map_region
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572740(param_1, param_2) {
  let iVar1;

  param_1 = param_1 + -0x11e;
  param_2 = param_2 + -0x14;
  if ((((param_1 < 0) || (0x6c < param_1)) || (param_2 < 0)) ||
     (((0xbe < param_2 || (0x20 < param_1 % 0x24)) || (0x20 < param_2 % 0x26)))) {
    iVar1 = -1;
  } else {
    iVar1 = ((param_1 / 0x24) | 0) + (((param_2 / 0x26) | 0) * 3);
  }
  return iVar1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005727d8 — setup_map_editor_colors
// ═══════════════════════════════════════════════════════════════════
export function FUN_005727d8() {
  // UI setup — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572887 — get_map_editor_tile_rect
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572887(param_1, param_2) {
  // UI rect calculation — no-op in JS, returns stub
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572da0 — draw_map_editor_cursor
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572da0() {
  // UI drawing — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00572fff — handle_map_editor_click
// ═══════════════════════════════════════════════════════════════════
export function FUN_00572fff(param_1, param_2) {
  // UI interaction handler — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573adc — cleanup_cstring
// ═══════════════════════════════════════════════════════════════════
export function FUN_00573adc() {
  FUN_005cde4d();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573aef — SEH_epilog_6
// ═══════════════════════════════════════════════════════════════════
export function FUN_00573aef() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573afd — release_capture
// ═══════════════════════════════════════════════════════════════════
export function FUN_00573afd() {
  G.DAT_006ac8a4 = 0;
  // ReleaseCapture — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573b1d — handle_map_editor_mouse_move
// ═══════════════════════════════════════════════════════════════════
export function FUN_00573b1d(param_1, param_2) {
  // UI interaction handler — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00573e59 — open_map_editor_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00573e59(param_1, param_2, param_3, param_4) {
  // UI dialog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057420c — cleanup_dialog_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057420c() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574218 — cleanup_dialog_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574218() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057422b — SEH_epilog_7
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057422b() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574239 — redraw_map_editor_full
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574239() {
  // UI redraw — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574522 — draw_preview_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574522() {
  // UI drawing — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574686 — refresh_preview_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574686() {
  FUN_00574522();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005746a1 — get_sprite_rect_for_editor_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_005746a1(param_1, param_2, param_3, param_4, param_5) {
  // This returns sprite coordinates for various map editor items.
  // Writes to param_2..param_5 (pass-by-reference in C).
  // Since JS doesn't have pointers, we return an object.
  let local_8 = 0;
  let x = 0, y = 0, w = 0, h = 0;

  if (G.DAT_006ac924 < 0xc) {
    const uVar1 = param_1 >> 31;
    switch (G.DAT_006ac924) {
      case 0:
        local_8 = 0x14;
        x = (((param_1 + (uVar1 & 3)) >> 2) | 0) * 0x25 + 0x157;
        y = ((((param_1 ^ uVar1) - uVar1 & 3 ^ uVar1) - uVar1) | 0) * 0x15 + 0xd3;
        w = 0x24;
        h = 0x14;
        break;
      case 1:
        if (param_1 < 0x18) {
          x = 1;
        } else {
          x = 0x14e;
          param_1 = param_1 - 0x18;
        }
        {
          const u1 = param_1 >> 31;
          x = x + ((((param_1 ^ u1) - u1 & 3 ^ u1) - u1) | 0) * 0x41;
          y = (((param_1 + (u1 & 3)) >> 2) | 0) * 0x31 + 0x27;
        }
        w = 0x40;
        h = 0x30;
        local_8 = 0x30;
        break;
      case 2:
        local_8 = 4;
        x = param_1 * 0x41 + 0x8f;
        y = 0x1a7;
        w = 0x40;
        h = 0x30;
        break;
      case 3:
        local_8 = 0x12;
        w = 0xe;
        h = 0x16;
        x = (((param_1 >> 1) % 9) | 0) * (w + 1) + 1;
        y = (h + 1) * (param_1 & 1) + 0x1a9;
        break;
      case 4:
        local_8 = 0x42;
        w = 0x24;
        h = 0x14;
        if (param_1 < 0x26) {
          x = ((((param_1 ^ uVar1) - uVar1 & 7 ^ uVar1) - uVar1) | 0) * 0x25 + 0x157;
          y = (((param_1 + (uVar1 & 7)) >> 3) | 0) * 0x15 + 1;
        } else {
          x = (((param_1 - 0x26) % 7) | 0) * 0x25 + 0x157;
          y = (((param_1 - 0x26) / 7) | 0) * 0x15 + 0x6a;
        }
        break;
      case 5:
        local_8 = 1;
        w = 0x40;
        h = 0x20;
        x = 199;
        y = 0x100;
        break;
      case 6:
        local_8 = 8;
        w = 0x20;
        h = 0x20;
        x = (w + 1) * param_1 + 1;
        y = 0x164;
        break;
      case 7:
        local_8 = 0x2c;
        w = 0x40;
        h = 0x20;
        x = (((param_1 / 0xb) | 0) * 0x41) + 1;
        y = ((param_1 % 0xb) | 0) * 0x21 + 1;
        break;
      case 8:
        w = 0x40;
        h = 0x20;
        if (param_1 < 0x40) {
          x = ((((param_1 ^ uVar1) - uVar1 & 7 ^ uVar1) - uVar1) | 0) * 0x41 + 1;
          y = (((((((param_1 ^ uVar1) - uVar1 & 0xf ^ uVar1) - uVar1) | 0) < 8 ? 0 : 1) - 1) & 0x21) +
              (((param_1 + (uVar1 & 0xf)) >> 4) | 0) * 0x42 + 0x43;
        } else {
          x = (param_1 - 0x40) * 0x41 + 1;
          y = 0x14b;
        }
        local_8 = 0x44;
        break;
      case 9:
        w = 0x20;
        h = 0x10;
        x = 1;
        y = 0x1ad;
        {
          const r = (((param_1 ^ uVar1) - uVar1 & 3 ^ uVar1) - uVar1) | 0;
          switch (r) {
            case 0: break;
            case 1: y = y + 0x22; x = x + 0x21; break;
            case 2: y = y + 0x11; break;
            case 3: y = y + 0x22; break;
          }
        }
        x = x + (((param_1 + (uVar1 & 3)) >> 2) | 0) * 0x42;
        local_8 = 0x20;
        break;
      case 10:
        w = 0x40;
        h = 0x20;
        x = 0x1c8;
        if (param_1 < 6) {
          y = param_1 * 0x21 + 100;
        } else {
          x = (((param_1 - 6) % 9) | 0) * 0x41 + 1;
          y = (((param_1 - 6) / 9) | 0) * 0x21 + 0x16c;
        }
        local_8 = 0x18;
        break;
      case 0xb:
        local_8 = 0x3f;
        y = (((param_1 / 9) | 0) * 0x31) + 1;
        x = ((param_1 % 9) | 0) * 0x41 + 1;
        w = 0x40;
        h = 0x30;
        break;
    }
  }

  // Write results to param objects (in C these are pointer writes)
  if (param_2 !== undefined) {
    param_2.val = x;
    if (param_3) param_3.val = y;
    if (param_4) param_4.val = w;
    if (param_5) param_5.val = h;
  }
  return local_8;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574c47 — show_sprite_editor_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574c47(param_1) {
  // UI sprite display — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574ca6 — setup_sprite_editor_dialog
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574ca6(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  // UI dialog setup — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574e98 — init_sprite_preview
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574e98() {
  // UI initialization — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00574f50 — debug_export_sprites
// ═══════════════════════════════════════════════════════════════════
export function FUN_00574f50() {
  // UI/debug function — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00575d89 — export_single_sprite
// ═══════════════════════════════════════════════════════════════════
export function FUN_00575d89(param_1, param_2, param_3, param_4, param_5) {
  // UI/debug function — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00575dc4 — clear_sprite_dirty
// ═══════════════════════════════════════════════════════════════════
export function FUN_00575dc4() {
  G.DAT_006ac890 = 0;
  // CRichEditDoc::InvalidateObjectCache — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00575dec — open_sprite_editor
// ═══════════════════════════════════════════════════════════════════
export function FUN_00575dec() {
  // UI dialog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057624d — launch_sprite_editor
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057624d() {
  FUN_00575dec();
}

// ═══════════════════════════════════════════════════════════════════
// show_messagebox_6267 — show_import_sprite_dialog
// ═══════════════════════════════════════════════════════════════════
export function show_messagebox_6267() {
  // UI dialog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005767a7 — free_text_buffer
// ═══════════════════════════════════════════════════════════════════
export function FUN_005767a7() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005767b3 — SEH_cleanup_6
// ═══════════════════════════════════════════════════════════════════
export function FUN_005767b3() {
  FUN_005c656b();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005767c9 — SEH_epilog_8
// ═══════════════════════════════════════════════════════════════════
export function FUN_005767c9() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// CBitmapButton::~CBitmapButton — destructor (MFC library)
// ═══════════════════════════════════════════════════════════════════
export function CBitmapButton_destructor() {
  // MFC destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578402 — destroy_bitmap_1
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578402() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578411 — destroy_bitmap_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578411() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578420 — destroy_bitmap_3
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578420() {
  FUN_0040f570();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057842f — destroy_button_base
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057842f() {
  FUN_0040fbb0();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057843e — destroy_frame_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057843e() {
  // MFC destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578451 — SEH_epilog_9
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578451() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005784a0 — create_bitmap_button
// ═══════════════════════════════════════════════════════════════════
export function FUN_005784a0() {
  // MFC constructor — no-op in JS
  return {};
}

// ═══════════════════════════════════════════════════════════════════
// ios_base::precision — library function
// ═══════════════════════════════════════════════════════════════════
export function ios_base_precision(thisObj, param_1) {
  // MFC library — no-op in JS
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// ios_base::width — library function
// ═══════════════════════════════════════════════════════════════════
export function ios_base_width(thisObj, param_1) {
  // MFC library — no-op in JS
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578650 — setup_html_stream_lines
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578650(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// CHtmlStream::Reset — library function
// ═══════════════════════════════════════════════════════════════════
export function CHtmlStream_Reset() {
  // MFC library — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005786b6 — reset_and_setup_html
// ═══════════════════════════════════════════════════════════════════
export function FUN_005786b6(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005786f1 — create_html_view
// ═══════════════════════════════════════════════════════════════════
export function FUN_005786f1(param_1) {
  // UI — no-op in JS
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578770 — destroy_html_view
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578770() {
  // UI destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005787bd — destroy_timevec
// ═══════════════════════════════════════════════════════════════════
export function FUN_005787bd() {
  // C++ destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005787d0 — SEH_epilog_10
// ═══════════════════════════════════════════════════════════════════
export function FUN_005787d0() {
  // SEH epilog — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005787de — find_menu_item_by_id
// ═══════════════════════════════════════════════════════════════════
export function FUN_005787de(param_1) {
  // Menu traversal — UI only, stub
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578840 — count_visible_menu_items
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578840(param_1) {
  // Menu traversal — UI only, stub
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005788a9 — get_menu_item_id_by_index
// ═══════════════════════════════════════════════════════════════════
export function FUN_005788a9(param_1) {
  return 0xffffffff;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578922 — find_submenu_item_by_id
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578922(param_1) {
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005789aa — count_visible_submenu_items
// ═══════════════════════════════════════════════════════════════════
export function FUN_005789aa(param_1) {
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578a1c — get_submenu_item_id_by_index
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578a1c(param_1, param_2) {
  return 0xffffffff;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578abd — replace_pipes_with_tabs
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578abd(param_1) {
  if (typeof param_1 === 'string') {
    return param_1.replace(/\|/g, '\t');
  }
  // For array-based strings:
  for (let i = 0; i < param_1.length; i++) {
    if (param_1[i] === 0x7C) { // '|'
      param_1[i] = 0x09; // '\t'
    }
    if (param_1[i] === 0) break;
  }
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578b06 — add_menu_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578b06(param_1, param_2) {
  // Menu building — UI only, stub
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578c12 — add_submenu_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578c12(param_1, param_2, param_3, param_4) {
  // Menu building — UI only, stub
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578d8a — dispatch_menu_callback
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578d8a(param_1, param_2) {
  // Menu callback dispatch — UI only, stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578de8 — set_menu_parent_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578de8(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578e38 — set_menu_callback
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578e38(param_1) {
  G.DAT_0063430c = param_1;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578e60 — toggle_menu_item_check
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578e60(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578ec7 — toggle_menu_item_grayed
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578ec7(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00578f2c — build_full_menu
// ═══════════════════════════════════════════════════════════════════
export function FUN_00578f2c(param_1) {
  // Menu building — UI only, stub
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005791df — set_menu_item_visibility
// ═══════════════════════════════════════════════════════════════════
export function FUN_005791df(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579260 — set_submenu_item_visibility
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579260(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005792e1 — set_submenu_item_checked
// ═══════════════════════════════════════════════════════════════════
export function FUN_005792e1(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005793a3 — remove_submenu_item
// ═══════════════════════════════════════════════════════════════════
export function FUN_005793a3(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057940d — set_submenu_item_grayed
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057940d(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005794cf — set_all_subitems_checked
// ═══════════════════════════════════════════════════════════════════
export function FUN_005794cf(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057953e — update_submenu_item_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057953e(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_005799c0 — set_tab_control_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_005799c0(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579a00 — insert_menu_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579a00(param_1, param_2, param_3) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579a40 — remove_menu_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579a40(param_1, param_2) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579a80 — update_menu_entry_text
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579a80(param_1, param_2, param_3) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579ac0 — check_menu_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579ac0(param_1, param_2, param_3) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579b00 — gray_menu_entry
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579b00(param_1, param_2, param_3) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579b40 — set_menu_window
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579b40(param_1) {
  // UI — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579b90 — get_menu_handle
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579b90() {
  return 0;
}

// ═══════════════════════════════════════════════════════════════════
// CPropertySheet::EnableStackedTabs — library function
// ═══════════════════════════════════════════════════════════════════
export function CPropertySheet_EnableStackedTabs(thisObj, param_1) {
  // MFC library — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_00579bf0 — flush_menu_updates
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579bf0() {
  // UI — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00579c40 — handle_war_declaration (GAME LOGIC)
// Checks/triggers war declaration between two civs on city capture
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579c40(param_1, param_2) {
  let local_8 = 0;

  FUN_00467750(param_1, param_2, 0x60);

  if (((G.DAT_0064c6c0[param_1 * 4 + param_2 * 0x594] & 6) !== 0) &&
     (((1 << (u8(param_1) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0 ||
      ((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0)) {
    FUN_0045ac71(param_1, param_2, 0xffffffff);
  }

  FUN_00467750(param_1, param_2, 0xc);

  if ((G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594] & 1) !== 0) {
    FUN_00467825(param_1, param_2, 0x2000);
    FUN_00467933(param_1, param_2, 100);
    FUN_00467933(param_2, param_1, 100);

    if (((G.DAT_0064c6c0[param_1 * 4 + param_2 * 0x594 + 1] & 0x10) === 0) &&
       ((G.DAT_0064c6c0[param_2 * 4 + param_1 * 0x594 + 1] & 0x10) === 0)) {
      let off = param_2 * 4 + param_1 * 0x594;
      w32(G.DAT_0064c6c0, off, u32(G.DAT_0064c6c0, off) | 0x1000);
      local_8 = 1;
    }
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00579dbb — calc_city_value (GAME LOGIC)
// Calculate value metric for a city (population * treasury ratio)
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579dbb(param_1) {
  let iVar1;
  let local_8;

  iVar1 = s8(G.DAT_0064f340[param_1 * 0x58 + 8]);
  if (s32(G.DAT_0064c600, iVar1 * 0x594 + 0xa2) <
      ((32000 / s8(G.DAT_0064f340[param_1 * 0x58 + 9])) | 0)) {
    local_8 = (s8(G.DAT_0064f340[param_1 * 0x58 + 9]) * s32(G.DAT_0064c600, iVar1 * 0x594 + 0xa2)) /
              (s16(G.DAT_0064c600, iVar1 * 0x594 + 0x10c) + 1) | 0;
  } else {
    local_8 = (s32(G.DAT_0064c600, iVar1 * 0x594 + 0xa2) /
              (s16(G.DAT_0064c600, iVar1 * 0x594 + 0x10c) + 1) | 0) *
              s8(G.DAT_0064f340[param_1 * 0x58 + 9]);
  }
  if (local_8 < 0) {
    local_8 = 32000;
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_00579ed0 — can_declare_war (GAME LOGIC)
// Check if civ can declare war / show war declaration dialogs
// ═══════════════════════════════════════════════════════════════════
export function FUN_00579ed0(param_1, param_2, param_3) {
  let uVar1;
  let iVar2;
  let local_8;

  if ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4 + 1] & 0x20) !== 0) {
    return 0;
  }

  if ((param_3 & u32(G.DAT_0064c6c0, param_1 * 0x594 + param_2 * 4)) === 0) {
    return 0;
  }

  if ((1 << (u8(param_2) & 0x1f) & u8(G.DAT_00655b0a)) === 0) {
    return 0;
  }

  uVar1 = FUN_00493c7d(param_2);
  FUN_0040ff60(1, uVar1);
  if ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 8) === 0) {
    if ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 4) === 0) {
      if ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4] & 2) === 0) {
        // DEVIATION: Win32 API (show dialog s_ANNOY)
        local_8 = 1;
      } else if ((G.DAT_0064c6c0[param_1 * 0x594 + param_2 * 4 + 2] & 4) === 0) {
        // DEVIATION: Win32 API (show dialog s_ANNOYCEASE)
        local_8 = 1;
      } else {
        // DEVIATION: Win32 API (show dialog s_ANNOYVASSAL)
        local_8 = 1;
      }
    } else {
      // DEVIATION: Win32 API (show dialog s_ANNOYPEACE)
      local_8 = 1;
    }
    if (local_8 === 1) {
      iVar2 = FUN_0055bef9(param_1, param_2);
      if (iVar2 === 0) {
        if (4 < u8(G.DAT_0064c600[param_1 * 0x594 + 0xb5])) {
          iVar2 = FUN_00453e51(param_2, 0x18);
          if (iVar2 === 0) {
            if (((G.DAT_0064c6c0[param_2 * 0x594 + param_1 * 4 + 1] & 0x10) === 0) &&
               (G.DAT_0064c600[param_2 * 0x594 + 0xbe] === 0)) {
              // DEVIATION: Win32 API (show dialog s_ALLOWHAWKS)
            } else {
              uVar1 = FUN_00410070(param_2);
              FUN_0040ff60(0, uVar1);
              // DEVIATION: Win32 API (show dialog s_ALLOWAGGRESSOR)
            }
          } else {
            // DEVIATION: Win32 API (show dialog s_ALLOWUN)
          }
        }
        uVar1 = 0;
      } else {
        // DEVIATION: Win32 API (show dialog s_OVERRULE)
        uVar1 = 1;
      }
    } else {
      uVar1 = 1;
    }
  } else {
    // DEVIATION: Win32 API (show dialog s_ANNOYALLIED)
    uVar1 = 1;
  }
  return uVar1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a27a — steal_tech_on_capture (GAME LOGIC)
// Transfer technology from one civ to another on city capture
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a27a(param_1, param_2) {
  let local_318 = -1;
  let local_18 = -999;

  if ((param_1 === 0) || (param_2 === 0)) {
    return;
  }

  let bVar3 = G.DAT_006d1da0 === param_1;
  if (G.DAT_00654fa8 !== 0) {
    bVar3 = false;
  }

  while (true) {
    for (let local_314 = 0; local_314 < 100; local_314 = local_314 + 1) {
      let iVar1 = FUN_004bd9f0(param_1, local_314);
      if ((iVar1 === 0) && (iVar1 = FUN_004bd9f0(param_2, local_314), iVar1 !== 0) &&
         (((G.DAT_00655af0 & 0x80) === 0 || ((G.DAT_0064bc60 & 0x10) === 0)) ||
          (local_314 !== 0x1f && local_314 !== 0x36 && local_314 !== 0xf &&
           local_314 !== 0x47 && local_314 !== 0x15))) {
        let iVar1_check = FUN_004bdb2c(param_1, local_314);
        if (local_18 <= iVar1_check) {
          local_318 = local_314;
          local_18 = iVar1_check;
        }
      }
    }
    if (local_318 < 0) break;

    let local_314 = local_318;
    if (((1 << (u8(param_1) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) {
      // AI civ — auto-steal
    } else {
      // Human civ — would show dialog, we just proceed
    }

    FUN_004bf05b(param_1, local_314, param_2, 0, 0);

    if (((1 << (u8(param_1) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) {
      FUN_00442541(param_1, 0xffffffff);
    }
    return;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a661 — free_text_buffer_2
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a661() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057a677 — SEH_epilog_11
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a677() {
  // SEH epilog — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a685 — find_best_capital_city (GAME LOGIC)
// Finds the most centrally-located city for a civ to serve as capital
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a685(param_1) {
  let local_10 = 0x7fff;
  let local_18 = -1;

  for (let local_14 = 0; local_14 < G.DAT_00655b18; local_14 = local_14 + 1) {
    if ((s16(G.DAT_0064f340, local_14 * 0x58 + 0x54) !== 0) && // G.DAT_0064f394
       (s8(G.DAT_0064f340[local_14 * 0x58 + 8]) === param_1)) { // G.DAT_0064f348
      let local_8 = 0;
      for (let local_c = 0; local_c < G.DAT_00655b18; local_c = local_c + 1) {
        if ((s16(G.DAT_0064f340, local_c * 0x58 + 0x54) !== 0) &&
           (s8(G.DAT_0064f340[local_c * 0x58 + 8]) === param_1)) {
          let iVar1 = FUN_005ae31d(
            s16(G.DAT_0064f340, local_14 * 0x58),
            s16(G.DAT_0064f340, local_14 * 0x58 + 2),
            s16(G.DAT_0064f340, local_c * 0x58),
            s16(G.DAT_0064f340, local_c * 0x58 + 2));
          local_8 = local_8 + iVar1;
        }
      }
      if (local_8 < local_10) {
        local_10 = local_8;
        local_18 = local_14;
      }
    }
  }
  return local_18;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a7e9 — transfer_city (GAME LOGIC)
// Transfer a city from one civ to another (used in civil war/schism)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a7e9(param_1, param_2, param_3) {
  w16(G.DAT_0064c600, param_2 * 0x594 + 0x108, s16(G.DAT_0064c600, param_2 * 0x594 + 0x108) - 1);
  w16(G.DAT_0064c600, param_3 * 0x594 + 0x108, s16(G.DAT_0064c600, param_3 * 0x594 + 0x108) + 1);
  w16(G.DAT_0064c600, param_2 * 0x594 + 0x10c,
      s16(G.DAT_0064c600, param_2 * 0x594 + 0x10c) - s8(G.DAT_0064f340[param_1 * 0x58 + 9]));
  w16(G.DAT_0064c600, param_3 * 0x594 + 0x10c,
      s8(G.DAT_0064f340[param_1 * 0x58 + 9]) + s16(G.DAT_0064c600, param_3 * 0x594 + 0x10c));
  G.DAT_0064f340[param_1 * 0x58 + 8] = u8(param_3);
  FUN_005b99e8(
    s16(G.DAT_0064f340, param_1 * 0x58),
    s16(G.DAT_0064f340, param_1 * 0x58 + 2),
    param_3, 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057a904 — attempt_civil_war (GAME LOGIC)
// Attempts to trigger a civil war / civ split
// Returns 1 on success, 0 on failure
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057a904(param_1) {
  let cVar1;
  let iVar2;
  let uVar3;
  let local_15c;
  let local_158;
  let local_154;
  let local_150;
  let local_14c;
  let local_148;
  let local_144;
  let local_140;
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

  iVar2 = FUN_004fc20d(param_1);
  if (iVar2 === 0) {
    return 0;
  }

  local_24 = -1;
  for (local_148 = 1; local_148 < 8; local_148 = local_148 + 1) {
    if ((s16(G.DAT_0064c600, local_148 * 0x594 + 0x106) === 0) &&
       (s16(G.DAT_0064c600, local_148 * 0x594 + 0x108) === 0)) {
      local_24 = local_148;
    }
  }
  if (local_24 < 1) {
    return 0;
  }

  let aiStack_13c = new Array(64).fill(0);
  local_154 = -1;
  for (local_140 = 0; local_140 < G.DAT_00655b18; local_140 = local_140 + 1) {
    if ((s32(G.DAT_0064f340, local_140 * 0x58 + 0x54) !== 0) &&
       (s8(G.DAT_0064f340[local_140 * 0x58 + 8]) === param_1)) {
      local_3c = FUN_005b8a81(
        s16(G.DAT_0064f340, local_140 * 0x58),
        s16(G.DAT_0064f340, local_140 * 0x58 + 2));
      aiStack_13c[local_3c] =
           aiStack_13c[local_3c] + s8(G.DAT_0064f340[local_140 * 0x58 + 9]);
      iVar2 = FUN_0043d20a(local_140, 1);
      if ((iVar2 !== 0) &&
         ((local_154 < 0 ||
          (s16(G.DAT_0064c600, param_1 * 0x594 + 0xac) ===
           s16(G.DAT_0064f340, local_140 * 0x58))))) {
        local_154 = local_3c;
        local_15c = s16(G.DAT_0064f340, local_140 * 0x58);
        local_8 = s16(G.DAT_0064f340, local_140 * 0x58 + 2);
        local_144 = local_140;
      }
    }
  }

  if (local_154 < 0) {
    return 0;
  }

  G.DAT_00655b0a = G.DAT_00655b0a & ~(1 << (u8(local_24) & 0x1f));
  iVar2 = new_civ(local_24);
  if (iVar2 === 0) {
    return 0;
  }
  G.DAT_00655b0a = G.DAT_00655b0a | (1 << (u8(local_24) & 0x1f));

  uVar3 = FUN_00410070(param_1);
  FUN_0040ff60(0, uVar3);
  uVar3 = FUN_00410070(local_24);
  FUN_0040ff60(1, uVar3);
  // DEVIATION: Win32 API (FUN_00421ea0 s_SCHISM)
  if (2 < G.DAT_00655b02) {
    FUN_00511880(0x16, 0xff, 2, 0, 0, 0);
  }

  // Transfer treasury (half)
  w32(G.DAT_0064c600, local_24 * 0x594 + 0xa2,
      (s32(G.DAT_0064c600, param_1 * 0x594 + 0xa2) / 2) | 0);
  w32(G.DAT_0064c600, param_1 * 0x594 + 0xa2,
      s32(G.DAT_0064c600, param_1 * 0x594 + 0xa2) - s32(G.DAT_0064c600, local_24 * 0x594 + 0xa2));

  // Transfer science beakers (half)
  w16(G.DAT_0064c600, local_24 * 0x594 + 0x10e,
      (u16(G.DAT_0064c600, param_1 * 0x594 + 0x10e) >> 1) & 0xffff);

  // Copy government type
  G.DAT_0064c600[local_24 * 0x594 + 0xb5] = G.DAT_0064c600[param_1 * 0x594 + 0xb5];
  // Copy tax rate
  w16(G.DAT_0064c600, local_24 * 0x594 + 0xa8, u16(G.DAT_0064c600, param_1 * 0x594 + 0xa8));
  // Copy government count/type
  G.DAT_0064c600[local_24 * 0x594 + 0xb0] = G.DAT_0064c600[param_1 * 0x594 + 0xb0];

  // Copy tech flags (13 bytes)
  for (local_18 = 0; local_18 < 0xd; local_18 = local_18 + 1) {
    G.DAT_0064c600[local_24 * 0x594 + 0xf8 + local_18] =
         G.DAT_0064c600[param_1 * 0x594 + 0xf8 + local_18];
  }

  // Set contact turns for all civs
  for (local_148 = 1; local_148 < 8; local_148 = local_148 + 1) {
    w16(G.DAT_0064c600, local_148 * 0x594 + 0x482 + local_24 * 2, G.DAT_00655af8 - 8);
  }

  // Set diplomacy: alliance + peace between old and new
  w32(G.DAT_0064c6c0, local_24 * 0x594 + param_1 * 4, 0x2001);
  w32(G.DAT_0064c6c0, local_24 * 4 + param_1 * 0x594, 0x82801);

  // Copy visibility from old civ to new civ
  local_30 = 1 << (u8(param_1) & 0x1f);
  local_38 = 1 << (u8(local_24) & 0x1f);
  local_158 = 0;
  local_34 = 0;
  FUN_005b9ec6();
  for (local_18 = 0; local_18 < G.DAT_006d1164; local_18 = local_18 + 1) {
    iVar2 = FUN_005b8931(local_34, local_158);
    if ((local_30 & tileRead(iVar2, 4)) !== 0) {
      FUN_005b976d(local_34, local_158, local_38, 1, 1);
    }
    local_34 = local_34 + 2;
    if (G.DAT_006d1160 <= local_34) {
      local_158 = local_158 + 1;
      local_34 = local_158 & 1;
    }
  }
  FUN_005b9f1c();

  // Partition cities between old and new civ based on continents
  local_14 = aiStack_13c[local_154];
  local_20 = 0;
  for (local_3c = 0; local_3c < 0x40; local_3c = local_3c + 1) {
    if (aiStack_13c[local_3c] !== 0) {
      if ((local_14 < local_20) || (local_154 === local_3c)) {
        if (local_154 !== local_3c) {
          local_14 = local_14 + aiStack_13c[local_3c];
        }
        aiStack_13c[local_3c] = 1;
      } else {
        local_20 = local_20 + aiStack_13c[local_3c];
        aiStack_13c[local_3c] = 2;
      }
    }
  }

  if ((local_14 < local_20 * 2) && (local_20 <= local_14)) {
    // Continent-based partition
    for (local_140 = 0; local_140 < G.DAT_00655b18; local_140 = local_140 + 1) {
      if ((s32(G.DAT_0064f340, local_140 * 0x58 + 0x54) !== 0) &&
         (s8(G.DAT_0064f340[local_140 * 0x58 + 8]) === param_1)) {
        local_3c = FUN_005b8a81(
          s16(G.DAT_0064f340, local_140 * 0x58),
          s16(G.DAT_0064f340, local_140 * 0x58 + 2));
        if (aiStack_13c[local_3c] === 2) {
          FUN_0043cc00(local_140, param_1);
          FUN_0057a7e9(local_140, param_1, local_24);
        } else {
          FUN_0043cc00(local_140, local_24);
        }
      }
    }
  } else {
    // Distance-based partition
    local_20 = 0;
    local_10 = s16(G.DAT_0064c600, param_1 * 0x594 + 0x10c);
    while (local_20 * 3 < local_10) {
      local_c = 1;
      local_14c = -1;
      for (local_140 = 0; local_140 < G.DAT_00655b18; local_140 = local_140 + 1) {
        if ((s32(G.DAT_0064f340, local_140 * 0x58 + 0x54) !== 0) &&
           (s8(G.DAT_0064f340[local_140 * 0x58 + 8]) === param_1)) {
          FUN_0043cc00(local_140, local_24);
          FUN_0043cc00(local_140, param_1);
          local_1c = FUN_005ae31d(local_15c, local_8,
            s16(G.DAT_0064f340, local_140 * 0x58),
            s16(G.DAT_0064f340, local_140 * 0x58 + 2));
          if (local_c < local_1c) {
            local_14c = local_140;
            local_c = local_1c;
          }
        }
      }
      if (local_14c < 0) break;
      local_20 = local_20 + s8(G.DAT_0064f340[local_14c * 0x58 + 9]);
      FUN_0057a7e9(local_14c, param_1, local_24);
    }
  }

  // Reassign units to new civ based on city ownership
  for (local_150 = 0; local_150 < G.DAT_00655b16; local_150 = local_150 + 1) {
    if ((s16(G.DAT_006560f0, local_150 * 0x20 + 0x1a) !== 0) &&
       (s8(G.DAT_006560f0[local_150 * 0x20 + 7]) === param_1)) {
      local_140 = FUN_0043cf76(
        s16(G.DAT_006560f0, local_150 * 0x20),
        s16(G.DAT_006560f0, local_150 * 0x20 + 2));
      if ((local_140 < 0) && (G.DAT_006560f0[local_150 * 0x20 + 0x10] !== 0xff)) {
        local_140 = u8(G.DAT_006560f0[local_150 * 0x20 + 0x10]);
      }
      if (-1 < local_140) {
        cVar1 = s8(G.DAT_0064f340[local_140 * 0x58 + 8]);
        iVar2 = cVar1;
        if ((iVar2 === param_1) || (iVar2 === local_24)) {
          FUN_005b99e8(
            s16(G.DAT_006560f0, local_150 * 0x20),
            s16(G.DAT_006560f0, local_150 * 0x20 + 2), iVar2, 1);
          local_2c = local_150;
          for (local_150 = FUN_005b2d39(local_150); -1 < local_150;
              local_150 = FUN_005b2c82(local_150)) {
            G.DAT_006560f0[local_150 * 0x20 + 7] = u8(cVar1);
            if ((G.DAT_006560f0[local_150 * 0x20 + 0x10] !== 0xff) &&
               (s8(G.DAT_0064f340[u8(G.DAT_006560f0[local_150 * 0x20 + 0x10]) * 0x58 + 8])
                !== iVar2)) {
              G.DAT_006560f0[local_150 * 0x20 + 0x10] = u8(local_140);
            }
          }
          local_150 = local_2c;
        }
      }
    }
  }

  // Find capital for new civ
  iVar2 = FUN_0057a685(local_24);
  if (-1 < iVar2) {
    FUN_0043d289(iVar2, 1, 1);
    w16(G.DAT_0064c600, local_24 * 0x594 + 0xac,
        u16(G.DAT_0064f340, iVar2 * 0x58));
  }

  // Temporarily mark original city as unowned to find old capital
  G.DAT_0064f340[local_144 * 0x58 + 8] = 0xff;
  iVar2 = FUN_0057a685(param_1);
  if (-1 < iVar2) {
    FUN_0043d289(iVar2, 1, 1);
    w16(G.DAT_0064c600, param_1 * 0x594 + 0xac,
        u16(G.DAT_0064f340, iVar2 * 0x58));
  }
  G.DAT_0064f340[local_144 * 0x58 + 8] = u8(param_1);

  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x74, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
  }
  FUN_0047cf9e(G.DAT_006d1da0, 1);
  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057b5df — handle_city_capture (CRITICAL GAME LOGIC)
// This is the main city capture handler (~800 lines, 11451 bytes).
// Called when a military unit conquers an enemy city.
//
// param_1 = city index (uint)
// param_2 = capturing civ
// param_3 = capture mode (0=normal, 1=subvert, 2+=diplomatic)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057b5df(param_1, param_2, param_3) {
  let cVar1;
  let bVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let iVar6;
  let iVar7;
  let uVar8;
  let uVar9;
  let uVar10;
  let local_3ec;
  let local_3e8;
  let local_3e4;
  let local_3e0;
  let local_3d8;
  let local_3cc;
  let local_3c8;
  let local_3c4;
  let local_3c0;
  let local_3bc;
  let local_3b4;
  let local_3b0;
  let local_398;
  let local_394;
  let local_390;
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
  let local_6c = new Uint8Array(80);
  let local_1c;
  let local_18;
  let local_14;

  FUN_0059db08(0x4000);

  // Get original owner of the city
  local_84 = s8(G.DAT_0064f340[param_1 * 0x58 + 8]); // G.DAT_0064f348
  iVar4 = s16(G.DAT_0064f340, param_1 * 0x58);        // city x
  iVar5 = s16(G.DAT_0064f340, param_1 * 0x58 + 2);    // city y

  // Handle war declaration if capture is by combat
  if (param_3 < 2) {
    FUN_00579c40(param_2, local_84);
  }

  // Check if the city's original builder is the capturer
  local_7c = (s8(G.DAT_0064f340[param_1 * 0x58 + 0xa]) === param_2) ? 1 : 0; // G.DAT_0064f34a

  // Save city name
  FUN_005f22d0(local_6c, param_1 * 0x58 + 0x20); // G.DAT_0064f360 + offset

  // ── Reputation/diplomacy effects ──
  if ((((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0 ||
      ((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0) &&
     (((iVar6 = FUN_004a7577(local_84), iVar6 === 0) &&
       (iVar6 = FUN_004a7577(param_2), iVar6 === 0)) || (G.DAT_00655b08 < 2))) {
    FUN_00467825(param_2, local_84, 0x10000);

    if (!(((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0 &&
        u8(G.DAT_0064c600[param_2 * 0x594 + 0xb5]) === 6 && // government = democracy
        u8(G.DAT_00655c22[param_2]) === 7)) {
      if (((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0 &&
         u8(G.DAT_00655c22[local_84]) < u8(G.DAT_00655c22[param_2])) {
        local_88 = 0;
        for (local_1c = 0; local_1c < G.DAT_00655b18; local_1c = local_1c + 1) {
          if (((s16(G.DAT_0064f340, local_1c * 0x58 + 0x54) !== 0) && (local_1c !== param_1)) &&
             ((s8(G.DAT_0064f340[local_1c * 0x58 + 0xa]) === local_84) &&
              (s8(G.DAT_0064f340[local_1c * 0x58 + 8]) === param_2))) {
            local_88 = local_88 + 1;
          }
        }
        if ((1 < local_88) && ((local_88 & 1) === 0)) {
          let off = param_2 * 4 + local_84 * 0x594;
          w32(G.DAT_0064c6c0, off, u32(G.DAT_0064c6c0, off) | 0x400000);
        }
      }
    } else {
      let off = param_2 * 4 + local_84 * 0x594;
      w32(G.DAT_0064c6c0, off, u32(G.DAT_0064c6c0, off) | 0x400000);
    }
  }

  // Remove cease-fire flags
  FUN_00467750(param_2, local_84, 0x800);

  if (((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) === 0 &&
     (s8(G.DAT_0064f340[param_1 * 0x58 + 9]) > 14) && (local_7c === 0)) {
    let off = param_2 * 4 + local_84 * 0x594;
    w32(G.DAT_0064c6c0, off, u32(G.DAT_0064c6c0, off) | 0x10);
  }

  // ── Civil war check ──
  local_398 = -1;
  if (((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) === 0 &&
     (iVar6 = FUN_0043d20a(param_1, 1), iVar6 !== 0) &&
     s16(G.DAT_0064c600, local_84 * 0x594 + 0x108) > 4) { // city count > 4
    if (((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) {
      bVar2 = u8(G.DAT_00655c22[G.DAT_00655c21]) < u8(G.DAT_00655c22[local_84]);
    } else {
      bVar2 = u8(G.DAT_00655c22[param_2]) < u8(G.DAT_00655c22[local_84]);
    }
    if (bVar2 && (iVar6 = FUN_0057a904(local_84), iVar6 === 0)) {
      G.DAT_0064f340[param_1 * 0x58 + 8] = 0xff;
      local_398 = FUN_0057a685(local_84);
      G.DAT_0064f340[param_1 * 0x58 + 8] = u8(local_84);
    }
  }

  // ── Calculate gold plundered ──
  local_74 = FUN_00579dbb(param_1);

  // ── Check for capital escape ──
  iVar6 = FUN_0043d20a(param_1, 1); // is this the capital?
  if (iVar6 !== 0) {
    local_18 = -999;
    local_3c8 = 0xffffffff;

    // Find best candidate city for capital relocation
    for (local_1c = 0; local_1c < G.DAT_00655b18; local_1c = local_1c + 1) {
      if ((s16(G.DAT_0064f340, local_1c * 0x58 + 0x54) !== 0) &&
         (s8(G.DAT_0064f340[local_1c * 0x58 + 8]) === local_84) && (local_1c !== param_1) &&
         (s8(G.DAT_0064f340[param_1 * 0x58 + 9]) / 2 <=
          s8(G.DAT_0064f340[local_1c * 0x58 + 9])) &&
         (s8(G.DAT_0064f340[local_1c * 0x58 + 9]) > 7)) {
        cVar1 = s8(G.DAT_0064f340[local_1c * 0x58 + 9]);
        local_14 = FUN_005ae31d(
          s16(G.DAT_0064f340, local_1c * 0x58),
          s16(G.DAT_0064f340, local_1c * 0x58 + 2),
          iVar4, iVar5);
        local_14 = cVar1 * 3 - local_14;

        local_3cc = FUN_005b2e69(
          s16(G.DAT_0064f340, local_1c * 0x58),
          s16(G.DAT_0064f340, local_1c * 0x58 + 2));
        iVar6 = FUN_005b50ad(local_3cc, 2);
        local_14 = local_14 + iVar6 * 4;

        iVar6 = FUN_0043d20a(local_1c, 0x1b); // has courthouse
        if (iVar6 !== 0) {
          local_14 = ((local_14 * 3) / 2) | 0;
        }

        iVar6 = FUN_0043d20a(local_1c, 8); // has walls
        if ((iVar6 !== 0) || (iVar6 = FUN_00453e51(local_84, 6), iVar6 !== 0)) {
          local_14 = local_14 << 1;
        }

        iVar6 = FUN_0043d20a(local_1c, 0x11); // has palace
        if (iVar6 !== 0) {
          local_14 = local_14 * 3;
        }

        // Penalty if on different continent
        iVar6 = FUN_005b8a81(
          s16(G.DAT_0064f340, local_1c * 0x58),
          s16(G.DAT_0064f340, local_1c * 0x58 + 2));
        iVar7 = FUN_005b8a81(iVar4, iVar5);
        if (iVar6 !== iVar7) {
          local_14 = (local_14 / 2) | 0;
        }

        if (local_18 < local_14) {
          local_18 = local_14;
          local_3c8 = local_1c;
        }
      }
    }

    // Decide if capital escapes
    local_3c4 = 0;
    if ((999 < s32(G.DAT_0064c600, local_84 * 0x594 + 0xa2)) &&
       (0 < local_3c8) && (local_398 < 0)) {
      local_1c = local_3c8;

      if ((((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) ||
         (G.DAT_006d1da0 !== local_84) || (G.DAT_00654fa8 !== 0)) {
        if ((((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) ||
           (G.DAT_00655b02 < 3) || (G.DAT_00654fa8 !== 0)) {
          if ((2 < G.DAT_00655b08) &&
             ((iVar6 = FUN_004a75a6(local_84), iVar6 !== 0) ||
              s16(G.DAT_0064c600, local_84 * 0x594 + 0x108) > 0xb ||
              s32(G.DAT_0064c600, local_84 * 0x594 + 0xa2) > 1999)) {
            local_3c4 = 1;
          }
        } else {
          // Multiplayer: ask other player
          G.DAT_006acb38 = -1;
          FUN_00511880(0x17, 0, 3, 1, G.DAT_006d1da0, 0);
          // Wait for response... (simplified)
          if (G.DAT_006acb38 === -1) {
            local_3c4 = 0;
            iVar6 = FUN_004a75a6(local_84);
            if ((iVar6 !== 0) || s16(G.DAT_0064c600, local_84 * 0x594 + 0x108) > 0xb ||
               s32(G.DAT_0064c600, local_84 * 0x594 + 0xa2) > 1999) {
              local_3c4 = 1;
            }
          }
        }
      } else {
        // Human player captures own civ's capital — show dialog
        // DEVIATION: Win32 API (FUN_00410030 s_CANESCAPE dialog)
        local_3c4 = FUN_00410030("CANESCAPE", 0, 0);
      }
    }

    // Execute capital escape or destroy capital
    if (local_3c4 === 1) {
      w32(G.DAT_0064c600, local_84 * 0x594 + 0xa2,
          s32(G.DAT_0064c600, local_84 * 0x594 + 0xa2) - 1000);
      FUN_0043d289(local_1c, 1, 1);
      // DEVIATION: Win32 API (FUN_00414dd0 s_ESCAPE notification)
      if (((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) {
        FUN_00441b11(local_3c8, 99);
      }
    } else {
      FUN_004a762d(local_84);
      if (-1 < local_398) {
        G.DAT_0064f340[local_398 * 0x58 + 0x39] = 0xff;
      }
    }
  }

  // ── Handle wonders in captured city ──
  if ((s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]) < -0x26) && (G.DAT_00654fa8 === 0)) {
    // Wonder was being built — announce abandonment
    if (s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]) < 1) {
      local_3c0 = ~s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]) + 1;
    } else {
      local_3c0 = s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]);
    }
    // Show wonder notification...
  }

  // ── Check for wonder captures ──
  if ((((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0 ||
      ((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0) && (G.DAT_00654fa8 === 0)) {
    for (local_8c = 0; local_8c < 0x1c; local_8c = local_8c + 1) {
      uVar9 = FUN_00453e18(local_8c);
      if (uVar9 === param_1) {
        iVar6 = local_8c + 0x27;
        // Show wonder capture/loss notifications
        if (local_8c === 0x14) { // Great Library
          FUN_004ec312(param_2);
        }
      }
    }
  }

  local_74 = FUN_005adfa0(local_74, 0, s32(G.DAT_0064c600, local_84 * 0x594 + 0xa2));
  w32(G.DAT_0064c600, local_84 * 0x594 + 0xa2,
      s32(G.DAT_0064c600, local_84 * 0x594 + 0xa2) - local_74);
  if (param_2 !== 0) {
    w32(G.DAT_0064c600, param_2 * 0x594 + 0xa2,
        s32(G.DAT_0064c600, param_2 * 0x594 + 0xa2) + local_74);
  }

  if ((G.DAT_006d1da0 === param_2) || (G.DAT_006d1da0 === local_84)) {
    FUN_00569363(1);
  }

  w16(G.DAT_0064f340, param_1 * 0x58 + 0x1c, 0);
  w32(G.DAT_0064f340, param_1 * 0x58 + 4,
      u32(G.DAT_0064f340, param_1 * 0x58 + 4) & 0xffffffc4);

  if (s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]) >= 0) {
    let bldg = s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]);
    G.DAT_0064c600[local_84 * 0x594 + 0x1f4 + bldg] =
         G.DAT_0064c600[local_84 * 0x594 + 0x1f4 + bldg] - 1;
  }

  // ── Remove capital-related improvements if not original city ──
  if (local_7c === 0) {
    FUN_0043d289(param_1, 1, 0);  // Remove palace
    FUN_0043d289(param_1, 4, 0);  // Remove courthouse-type
    FUN_0043d289(param_1, 0xb, 0);
    FUN_0043d289(param_1, 7, 0);
  }

  // ── Population reduction ──
  if ((param_3 === 0) && (local_7c === 0)) {
    iVar6 = _rand();
    bVar3 = u8(iVar6 >> 31);
    for (local_70 = 0; local_70 < 5; local_70 = local_70 + 1) {
      G.DAT_0064f340[param_1 * 0x58 + 0x34 + local_70] =
           G.DAT_0064f340[param_1 * 0x58 + 0x34 + local_70] &
           u8(0xaa >> ((((u8(iVar6) ^ bVar3) - bVar3 & 1 ^ bVar3) - bVar3) & 0x1f));
    }
  }

  // ── Reduce city size ──
  if (((param_3 === 0) && (local_7c === 0)) ||
     (s8(G.DAT_0064f340[param_1 * 0x58 + 9]) > 1)) {
    local_78 = 0;

    if (param_2 === 0) {
      iVar6 = FUN_005b8a81(iVar4, iVar5);
      for (local_3bc = 1; local_3bc < 8; local_3bc = local_3bc + 1) {
        if (((1 << (u8(local_3bc) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0 &&
           (G.DAT_0064c600[local_3bc * 0x594 + 0x332 + iVar6] !== 0)) {
          local_78 = 1;
        }
      }
    }

    // Decide whether to reduce population
    if ((s8(G.DAT_0064f340[param_1 * 0x58 + 9]) < 2) &&
       ((((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) === 0 &&
         ((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) ||
        ((param_2 === 0 && ((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0))) &&
       (((param_2 !== 0 || local_78 !== 0) &&
         ((G.DAT_00655b0b & G.DAT_0064f340[param_1 * 0x58 + 0xc]) === 0) &&
         u8(G.DAT_00655c22[param_2]) !== 7))) {
      if (u8(G.DAT_00655c22[G.DAT_00655c21]) < u8(G.DAT_00655c22[param_2])) {
        uVar9 = Math.floor(Math.random() * 0x7fff);
        uVar10 = uVar9 >> 31;
        if (((uVar9 ^ uVar10) - uVar10 & 1 ^ uVar10) !== uVar10) {
          // Don't reduce — skip
        }
      }
    } else {
      // Reduce population by 1
      G.DAT_0064f340[param_1 * 0x58 + 9] = G.DAT_0064f340[param_1 * 0x58 + 9] - 1;
    }

    // If city reaches size 0, destroy it
    if (G.DAT_0064f340[param_1 * 0x58 + 9] === 0) {
      delete_city(param_1, 0);
      param_1 = 0xffffffff;
    }
  }

  if (param_1 >= 0 && param_1 !== 0xffffffff) {
    w16(G.DAT_0064c600, param_2 * 0x594 + 0xae, G.DAT_00655af8);
    FUN_00492c15(param_2, 5, iVar4, iVar5, 4);

    // Update visibility
    FUN_005b9ec6();
    for (local_70 = 0; local_70 < 0x15; local_70 = local_70 + 1) {
      uVar8 = FUN_005ae052(s8(G.DAT_0064f340[0x28370 + local_70]) + iVar4);
      local_80 = s8(G.DAT_0064f340[0x283a0 + local_70]) + iVar5;
      iVar6 = FUN_004087c0(uVar8, local_80);
      if (iVar6 !== 0) {
        FUN_005b9c49(uVar8, local_80, param_2, 1);
        if (param_2 === 0) {
          FUN_005b976d(uVar8, local_80, 1, 1, 1);
        }
      }
    }
    FUN_005b9f1c();

    // Set new owner
    G.DAT_0064f340[param_1 * 0x58 + 8] = u8(param_2);
    FUN_0043cc00(param_1, local_84);

    // Check for events
    if (G.DAT_00627670 !== 0) {
      FUN_004fc2bb(param_1 * 0x58 + 0x20, param_2, local_84);
    }
  }

  // Update tile ownership
  FUN_005b99e8(iVar4, iVar5, param_2, 1);

  if ((G.DAT_006d1da0 === param_2) || (G.DAT_006d1da0 === local_84)) {
    FUN_0046e020(5, 0, 0, 0);
  }

  // ── Notify multiplayer ──
  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x78, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }

  // ── Notify human players of capture ──
  if ((((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) === 0 &&
      ((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) || (G.DAT_00654fa8 !== 0)) {
    // AI vs AI or autoplay — notify allied human players
    if (G.DAT_00654fa8 === 0) {
      for (local_3d8 = 1; local_3d8 < 8; local_3d8 = local_3d8 + 1) {
        if (((1 << (u8(local_3d8) & 0x1f)) & u8(G.DAT_00655b0a)) !== 0 &&
           ((1 << (u8(local_3d8) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0) {
          if (G.DAT_006d1da0 === local_3d8) {
            FUN_0047cea6(iVar4, iVar5);
          }
          // Check alliance notifications...
        }
      }
    }
  } else {
    // Human player involved — show city capture dialog
    if ((G.DAT_006d1da0 === param_2) || (G.DAT_006d1da0 === local_84)) {
      FUN_004105f8(iVar4, iVar5, param_2);
      FUN_0047cea6(iVar4, iVar5);
      FUN_004eb80a("CITYCAPTURE", param_1, 0x46, 1, param_2);
    }
    // Send multiplayer notifications if needed
  }

  // ── Steal technology ──
  if (((G.DAT_00655af0 & 0x80) === 0) || ((G.DAT_0064bc60 & 0x20) === 0)) {
    FUN_0057a27a(param_2, local_84);
  }

  // ── Handle units at captured city ──
  if (param_1 < 0 || param_1 === 0xffffffff) {
    // City was destroyed — skip unit handling
  } else {
    // Kill/reassign units belonging to old owner at this city
    local_3cc = G.DAT_00655b16;
    while (true) {
      local_3cc = local_3cc - 1;
      if (local_3cc < 0) break;

      if ((s16(G.DAT_006560f0, local_3cc * 0x20 + 0x1a) !== 0) && // unit alive
         (s8(G.DAT_006560f0[local_3cc * 0x20 + 7]) === local_84) && // owned by old civ
         (u8(G.DAT_006560f0[local_3cc * 0x20 + 0x10]) === param_1)) { // home city = captured city
        if (u8(G.DAT_006560f0[local_3cc * 0x20 + 6]) !== 9) { // not diplomat type
          // Check if land unit at city location
          if (((1 << (u8(local_84) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) {
            let nearby_city = FUN_0043cf76(
              s16(G.DAT_006560f0, local_3cc * 0x20),
              s16(G.DAT_006560f0, local_3cc * 0x20 + 2));
            if (nearby_city >= 0 && nearby_city !== param_1) {
              if (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[local_3cc * 0x20 + 6]) * 0x14 + 0x0e]) === 1) {
                iVar6 = FUN_005b53b6(local_3cc, 1);
                if (iVar6 === 1) {
                  G.DAT_006560f0[local_3cc * 0x20 + 0x10] = u8(nearby_city);
                  local_3cc = G.DAT_00655b16;
                  continue;
                }
              }
              w32(G.DAT_0064f340, nearby_city * 0x58 + 4,
                  u32(G.DAT_0064f340, nearby_city * 0x58 + 4) | 0x20);
            }
          }
          FUN_005b6042(local_3cc, 1); // Kill unit
          local_3cc = G.DAT_00655b16;
          continue;
        }
        // Diplomat — set home to 0xff (no home)
        G.DAT_006560f0[local_3cc * 0x20 + 0x10] = 0xff;
      }
    }

    if (((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) !== 0 &&
       ((u8(G.DAT_0064c600[param_2 * 0x594 + 0xb5]) > 4 ||
         u8(G.DAT_0064c600[local_84 * 0x594 + 0xb5]) > 4) &&
        G.DAT_00655b08 !== 0)) {
      w32(G.DAT_0064f340, param_1 * 0x58 + 4,
          u32(G.DAT_0064f340, param_1 * 0x58 + 4) | 1);
    }

    // ── Assign production for AI ──
    if (((1 << (u8(param_2) & 0x1f)) & u8(G.DAT_00655b0b)) === 0) {
      G.DAT_0064f340[param_1 * 0x58 + 0x39] = 0;
      if (param_2 === 0) {
        G.DAT_0064f340[param_1 * 0x58 + 0x39] = 5;
        local_3cc = FUN_005b2e69(iVar4, iVar5);
        if (-1 < local_3cc) {
          G.DAT_0064f340[param_1 * 0x58 + 0x39] = G.DAT_006560f0[local_3cc * 0x20 + 6];
        }
      }
      G.DAT_0064c600[param_2 * 0x594 + 0x1f4 + s8(G.DAT_0064f340[param_1 * 0x58 + 0x39])] =
           G.DAT_0064c600[param_2 * 0x594 + 0x1f4 + s8(G.DAT_0064f340[param_1 * 0x58 + 0x39])] + 1;
      FUN_00441b11(param_1, 99);
    } else {
      // ── Human player: assign best available production ──
      FUN_0047cf22(
        s16(G.DAT_0064f340, param_1 * 0x58),
        s16(G.DAT_0064f340, param_1 * 0x58 + 2));

      // Try to keep existing production item, or find best alternative
      if (s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]) < 0 ||
         (iVar6 = FUN_004bfe5a(param_2, param_1, s8(G.DAT_0064f340[param_1 * 0x58 + 0x39])),
          iVar6 !== 0)) {
        if (s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]) < 0) {
          if (s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]) < 1) {
            local_3e0 = ~s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]) + 1;
          } else {
            local_3e0 = s8(G.DAT_0064f340[param_1 * 0x58 + 0x39]);
          }
          iVar6 = FUN_004c03ae(param_2, param_1, local_3e0);
          if (iVar6 !== 0) {
            // Keep current production
          } else {
            // Reset and find best
            G.DAT_0064f340[param_1 * 0x58 + 0x39] = 0;
            local_18 = 0;
            for (local_3b0 = 0x3e; local_3b0 >= 0; local_3b0 = local_3b0 - 1) {
              if ((u8(G.DAT_0064b1bc[local_3b0 * 0x14 + 0x0e]) === 1) &&
                 (iVar6 = FUN_004bfe5a(param_2, param_1, local_3b0), iVar6 !== 0)) {
                local_14 = (s8(G.DAT_0064b1bc[local_3b0 * 0x14 + 9]) << 3) /
                           s8(G.DAT_0064b1bc[local_3b0 * 0x14 + 0x0c]);
                if ((u8(G.DAT_0064b1bc[local_3b0 * 0x14 + 1]) & 4) !== 0) {
                  local_14 = local_14 + 1;
                }
                if (local_18 < local_14) {
                  local_18 = local_14;
                  G.DAT_0064f340[param_1 * 0x58 + 0x39] = u8(local_3b0);
                }
                break;
              }
            }
          }
        }
      } else {
        // Can't build current item — find alternative
        G.DAT_0064f340[param_1 * 0x58 + 0x39] = 0;
        local_18 = 0;
        for (local_3b0 = 0x3e; local_3b0 >= 0; local_3b0 = local_3b0 - 1) {
          if ((u8(G.DAT_0064b1bc[local_3b0 * 0x14 + 0x0e]) === 1) &&
             (iVar6 = FUN_004bfe5a(param_2, param_1, local_3b0), iVar6 !== 0)) {
            local_14 = (s8(G.DAT_0064b1bc[local_3b0 * 0x14 + 9]) << 3) /
                       s8(G.DAT_0064b1bc[local_3b0 * 0x14 + 0x0c]);
            if ((u8(G.DAT_0064b1bc[local_3b0 * 0x14 + 1]) & 4) !== 0) {
              local_14 = local_14 + 1;
            }
            if (local_18 < local_14) {
              local_18 = local_14;
              G.DAT_0064f340[param_1 * 0x58 + 0x39] = u8(local_3b0);
            }
            break;
          }
        }
      }

      // Reveal surrounding tiles
      FUN_005b9ec6();
      for (local_70 = 0; local_70 < 8; local_70 = local_70 + 1) {
        uVar8 = FUN_005ae052(s8(G.DAT_0064f340[0x28350 + local_70]) + iVar4);
        local_80 = s8(G.DAT_0064f340[0x28360 + local_70]) + iVar5;
        iVar6 = FUN_004087c0(uVar8, local_80);
        if (iVar6 !== 0) {
          iVar6 = FUN_005b8931(uVar8, local_80);
          if (((1 << (u8(param_2) & 0x1f)) & u8(tileRead(iVar6, 4))) === 0) {
            FUN_005b976d(uVar8, local_80, 1 << (u8(param_2) & 0x1f), 1, 1);
            FUN_0047cea6(uVar8, local_80);
          }
        }
      }
      FUN_005b9f1c();

      G.DAT_0062edf8 = 1;
      FUN_citywin_DADA();
      FUN_handle_city_disorder_00509590(param_1);
      FUN_citywin_DB36();
      G.DAT_0062edf8 = 0;
    }
  }

  // ── Check if old owner is eliminated ──
  iVar6 = kill_civ(local_84, param_2);

  // ── Partisan generation ──
  if ((iVar6 === 0) && (param_1 >= 0 && param_1 !== 0xffffffff) && (local_7c === 0) &&
     ((u8(G.DAT_0064c600[local_84 * 0x594 + 0xb5]) === 3 ||
       u8(G.DAT_0064c600[local_84 * 0x594 + 0xb5]) === 6) ||
      (G.DAT_00655b40 !== 0 || (iVar6 = FUN_004bd9f0(local_84, 0xf), iVar6 !== 0)))) {
    // Calculate how many partisans to spawn
    let gov_old = u8(G.DAT_0064c600[local_84 * 0x594 + 0xb5]);
    let gov_new = u8(G.DAT_0064c600[param_2 * 0x594 + 0xb5]);
    if (gov_old === gov_new || (gov_old - gov_new) < 0) {
      local_3e4 = ~(gov_old - gov_new) + 1;
    } else {
      local_3e4 = gov_old - gov_new;
    }

    let era_old = u8(G.DAT_00655c22[local_84]);
    let era_new = u8(G.DAT_00655c22[param_2]);
    if (era_old === era_new || (era_old - era_new) < 0) {
      local_3e8 = ~(era_old - era_new) + 1;
    } else {
      local_3e8 = era_old - era_new;
    }

    let cityPop = s8(G.DAT_0064f340[param_1 * 0x58 + 9]);
    local_3b4 = (((((cityPop + 5 + ((cityPop + 5) >> 31 & 7)) >> 3) | 0) *
                (local_3e4 + local_3e8 + 1)) / 2) | 0;

    if (param_3 !== 0) {
      local_3b4 = (local_3b4 / 2) | 0;
    }

    // Check for Guerrilla Warfare tech
    iVar6 = FUN_004bd9f0(local_84, 0x11);
    if (iVar6 === 0) {
      local_3b4 = local_3b4 - 1;
    }

    // Check for Communism/Gunpowder
    iVar6 = FUN_004bd9f0(local_84, 0x22);
    if (iVar6 === 0) {
      iVar6 = FUN_004bd9f0(local_84, 0xf);
      if (iVar6 === 0) {
        local_3b4 = 0;
      }
      iVar6 = FUN_004bd9f0(local_84, 0x23);
      if (iVar6 === 0) {
        local_3b4 = 0;
      }
    } else {
      iVar6 = FUN_004bd9f0(param_2, 0x22);
      if (iVar6 === 0) {
        local_3b4 = local_3b4 << 1;
      } else {
        local_3b4 = local_3b4 + 1;
      }
    }

    // Check capturer's government
    // ...simplified...

    local_394 = 0;
    for (local_90 = 0; local_90 < local_3b4; local_90 = local_90 + 1) {
      // Find best tile for partisan placement
      local_18 = 0;
      for (local_70 = 0; local_70 < 0x14; local_70 = local_70 + 1) {
        uVar8 = FUN_005ae052(s8(G.DAT_0064f340[0x28370 + local_70]) + iVar4);
        local_80 = s8(G.DAT_0064f340[0x283a0 + local_70]) + iVar5;
        iVar7 = FUN_004087c0(uVar8, local_80);
        if ((iVar7 !== 0) && (iVar7 = FUN_005b89e4(uVar8, local_80), iVar7 === 0) &&
           (iVar7 = FUN_005b8da4(uVar8, local_80), iVar7 < 0)) {
          bVar3 = FUN_005b89bb(uVar8, local_80);
          local_14 = s8(G.DAT_00627cc0[u8(bVar3) * 0x18 + 9]) * 2;
          uVar9 = FUN_005b94d5(uVar8, local_80);
          if ((uVar9 & 0x10) !== 0) {
            local_14 = local_14 + 1;
          }
          uVar9 = FUN_005b94d5(uVar8, local_80);
          if ((uVar9 & 0x20) !== 0) {
            local_14 = local_14 + 1;
          }
          bVar3 = FUN_005b94d5(uVar8, local_80);
          if ((bVar3 & 0x42) === 0x40) {
            local_14 = local_14 << 1;
          }
          if (local_18 < local_14) {
            local_18 = local_14;
            local_390 = local_80;
            local_98 = uVar8;
          }
        }
      }
      if (local_18 !== 0) {
        local_3cc = FUN_005b3d06(9, local_84, local_98, local_390);
        if (local_3cc >= 0) {
          local_394 = local_394 + 1;
          // Set unit to fortified
          G.DAT_006560f0[local_3cc * 0x20 + 0x0f] = 2;
          FUN_005b490e(local_3cc, param_2);
          FUN_0047cea6(local_98, local_390);
        }
      }
    }
  }

  // ── Set captured-city metadata ──
  if (param_1 >= 0 && param_1 !== 0xffffffff) {
    G.DAT_0064f340[param_1 * 0x58 + 0xa] = u8(local_84); // G.DAT_0064f34a — previous owner
    G.DAT_0064f340[param_1 * 0x58 + 0xb] = u8(G.DAT_00655af8); // G.DAT_0064f34b — turn captured

    uVar9 = FUN_00453e18(0xe);
    if (uVar9 === param_1) {
      FUN_004be6ba(param_2);
    }
  }

  // Final multiplayer sync
  if (2 < G.DAT_00655b02) {
    FUN_004b0b53(0xff, 2, 0, 0, 0);
    FUN_0046b14d(0x78, 0xff, 0, 0, 0, 0, 0, 0, 0, 0);
    XD_FlushSendBuffer(5000);
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e29f — free_text_buffer_3
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e29f() {
  FUN_0059df8a();
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057e2b5 — SEH_epilog_12
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e2b5() {
  // SEH epilog — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e2c3 — get_unit_firepower (GAME LOGIC)
// Returns the effective firepower of a unit, considering veteran
// status and fortification bonuses.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e2c3(param_1) {
  let local_8;

  local_8 = s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 8]) * 8;

  // Veteran bonus
  if ((u16(G.DAT_006560f0, param_1 * 0x20 + 4) & 0x2000) !== 0) {
    local_8 = local_8 + (local_8 >> 1);
  }
  // Fortified bonus
  if ((u16(G.DAT_006560f0, param_1 * 0x20 + 4) & 0x10) !== 0) {
    local_8 = local_8 + (local_8 >> 1);
  }
  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e33a — calc_defense_strength (CRITICAL GAME LOGIC)
// Calculates the defense strength of a unit at its current position.
//
// param_1 = unit index (defender)
// param_2 = flag: if nonzero, read terrain/city data fresh
// param_3 = attacker unit index (-1 if none)
//
// Returns defense value used in combat calculations.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e33a(param_1, param_2, param_3) {
  let cVar1;
  let bVar2;
  let iVar3;
  let iVar4;
  let pbVar5;
  let uVar6;
  let local_8;

  iVar3 = s16(G.DAT_006560f0, param_1 * 0x20);     // unit x
  iVar4 = s16(G.DAT_006560f0, param_1 * 0x20 + 2);  // unit y

  // If param_2 is set, refresh terrain/city data for this tile
  if (param_2 !== 0) {
    bVar2 = FUN_005b89bb(iVar3, iVar4);
    G.DAT_006acb30 = u8(bVar2);                      // terrain type
    G.DAT_006acb08 = FUN_0043cf76(iVar3, iVar4);     // city at tile (-1 if none)
  }

  // Get unit defense stat
  cVar1 = s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 9]); // defense value

  // Get tile data: terrain defense bonus + river bonus
  pbVar5 = FUN_005b8931(iVar3, iVar4);
  let byte0 = tileRead(pbVar5, 0);
  let riverBonus = (byte0 >> 7) & 1; // river = +1 defense
  let terrainDefense = s8(G.DAT_00627cc0[G.DAT_006acb30 * 0x18 + 9]); // terrain defense from table

  local_8 = (riverBonus + terrainDefense) * cVar1 * 4;

  // ── Determine defense multiplier ──
  G.DAT_006acb34 = 2; // base multiplier

  // Check if unit is fortified and is a ground unit (domain == 0)
  if ((s8(G.DAT_006560f0[param_1 * 0x20 + 0x0f]) === 2) && // fortified
     (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 0)) { // land unit
    G.DAT_006acb34 = 3; // fortified bonus
  }

  // ── Fortress bonus ──
  bVar2 = FUN_005b94d5(iVar3, iVar4);
  if ((u8(bVar2) & 0x42) === 0x40) { // fortress without city
    if (param_3 < 0) {
      G.DAT_006acb34 = 4; // fortress against unknown attacker
    } else if ((s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_3 * 0x20 + 6]) * 0x14 + 5]) !== 1) && // not air
              ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_3 * 0x20 + 6]) * 0x14]) & 0x40) === 0)) { // not ignores fortress
      G.DAT_006acb34 = 4;
    }
  }

  // ── City walls / coastal fortress / SAM battery bonuses ──
  if (G.DAT_006acb08 >= 0) {
    // Check if defender is air unit with "ignore walls" attacking ground unit
    if ((s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 1) && // air unit
       (param_3 >= 0) &&
       ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14]) & 0x10) !== 0)) { // has flag
      uVar6 = u8(G.DAT_006560f0[param_3 * 0x20 + 6]);
      if (s8(G.DAT_0064b1bc[uVar6 * 0x14 + 5]) === 1 && // attacker is air
         (u8(G.DAT_0064b1bc[uVar6 * 0x14 + 1]) & 0x10) === 0) { // attacker no air defense
        if ((u8(G.DAT_0064b1bc[uVar6 * 0x14]) & 0x10) === 0) {
          G.DAT_006acb34 = G.DAT_006acb34 << 2; // x4 SAM battery effect
        } else {
          G.DAT_006acb34 = G.DAT_006acb34 << 1; // x2
        }
        // Skip city wall check
      } else {
        // Check for city walls improvement
        iVar3 = FUN_0043d20a(G.DAT_006acb08, 8); // city walls
        if ((iVar3 !== 0 ||
            (iVar3 = FUN_00453e51(s8(G.DAT_006560f0[param_1 * 0x20 + 7]), 6), iVar3 !== 0)) &&
           (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 0)) { // land unit
          if (param_3 < 0) {
            G.DAT_006acb34 = 6; // walls vs unknown
          } else if ((s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_3 * 0x20 + 6]) * 0x14 + 5]) === 0) && // land attacker
                    ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_3 * 0x20 + 6]) * 0x14]) & 0x40) === 0)) { // doesn't ignore walls
            G.DAT_006acb34 = 6; // walls bonus
          }
        }
      }
    } else {
      // Non-air defender in city
      iVar3 = FUN_0043d20a(G.DAT_006acb08, 8); // city walls
      if ((iVar3 !== 0 ||
          (iVar3 = FUN_00453e51(s8(G.DAT_006560f0[param_1 * 0x20 + 7]), 6), iVar3 !== 0)) &&
         (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 0)) { // land unit
        if (param_3 < 0) {
          G.DAT_006acb34 = 6;
        } else if ((s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_3 * 0x20 + 6]) * 0x14 + 5]) === 0) &&
                  ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_3 * 0x20 + 6]) * 0x14]) & 0x40) === 0)) {
          G.DAT_006acb34 = 6;
        }
      }
    }
  }

  // Non-land units don't get terrain multiplier
  if (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) !== 0) {
    G.DAT_006acb34 = 2; // reset to base
  }

  // Apply defense multiplier
  if (G.DAT_006acb34 !== 2) {
    local_8 = (local_8 * G.DAT_006acb34) >> 1;
  }

  // ── Veteran bonus ──
  if ((u16(G.DAT_006560f0, param_1 * 0x20 + 4) & 0x2000) !== 0) {
    local_8 = local_8 + (local_8 >> 1); // +50%
  }

  return local_8;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e6e2 — find_best_defender (GAME LOGIC)
// Finds the unit in a stack that provides the best defense.
//
// param_1 = stack leader unit index
// param_2 = attacker unit index (-1 if none)
//
// Returns the unit index of the best defender.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e6e2(param_1, param_2) {
  let sVar1;
  let sVar2;
  let bVar3;
  let iVar4;
  let iVar5;
  let local_10;
  let local_c;
  let local_8;

  local_8 = 0;
  local_c = param_1;

  if (param_1 >= 0) {
    sVar1 = s16(G.DAT_006560f0, param_1 * 0x20);      // x
    sVar2 = s16(G.DAT_006560f0, param_1 * 0x20 + 2);   // y
    bVar3 = FUN_005b89bb(sVar1, sVar2);
    G.DAT_006acb30 = u8(bVar3);
    G.DAT_006acb08 = FUN_0043cf76(sVar1, sVar2);

    // Iterate through all units in the stack
    for (param_1 = FUN_005b2d39(param_1); param_1 >= 0; param_1 = FUN_005b2c82(param_1)) {
      // Skip sea units defending on ocean
      if ((G.DAT_006acb30 !== 10) ||
         (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) !== 0)) {
        local_10 = FUN_0057e33a(param_1, 0, param_2);

        // Apply HP ratio if damage affects defense
        if ((G.DAT_00655ae8 & 0x10) !== 0) {
          iVar4 = FUN_005b29d7(param_1); // current HP
          iVar5 = FUN_005b29aa(param_1); // max HP
          local_10 = ((iVar4 * local_10) / iVar5) | 0;
        }

        // Pikeman vs mounted bonus
        if ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 1]) & 4) !== 0) {
          local_10 = local_10 + 1;
        }

        // Anti-air bonus
        if ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 1]) & 0x20) !== 0) {
          if (param_2 === -1) {
            local_10 = local_10 + 1;
          } else if (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_2 * 0x20 + 6]) * 0x14 + 5]) === 1) {
            // Air attacker — bonus depends on attacker having air defense
            if ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_2 * 0x20 + 6]) * 0x14 + 1]) & 0x10) === 0) {
              local_10 = local_10 * 3;
            } else {
              local_10 = local_10 * 5;
            }
          }
        }

        // Fighter vs fighter bonus
        if (((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14]) & 0x10) !== 0) &&
           (param_2 !== -1) &&
           (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_2 * 0x20 + 6]) * 0x14 + 5]) === 1) &&
           ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_2 * 0x20 + 6]) * 0x14]) & 0x10) !== 0)) {
          local_10 = local_10 << 1;
        }

        // Submarine in city penalty
        if ((s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 5]) === 2) &&
           (G.DAT_006acb08 >= 0)) {
          if (param_2 === -1) {
            local_10 = (local_10 / 2) | 0;
          } else if ((s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[param_2 * 0x20 + 6]) * 0x14 + 5]) === 1) &&
                    (iVar4 = FUN_0043d20a(G.DAT_006acb08, 0x1b), iVar4 === 0)) {
            local_10 = local_10 << 1;
          } else {
            local_10 = (local_10 / 2) | 0;
          }
        }

        if (local_8 <= local_10) {
          local_8 = local_10;
          local_c = param_1;
        }
      }
    }
  }
  return local_c;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057e9f9 — kill_unit_in_combat (GAME LOGIC)
// Handles killing a unit (updating stats, calling events, etc.)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057e9f9(param_1, param_2, param_3, param_4) {
  let unitOwner = s8(G.DAT_006560f0[param_1 * 0x20 + 7]);
  let unitType = u8(G.DAT_006560f0[param_1 * 0x20 + 6]);

  if (G.DAT_0064c600[unitOwner * 0x594 + 0x1b6 + unitType] !== 0xff) {
    G.DAT_0064c600[unitOwner * 0x594 + 0x1b6 + unitType] =
         G.DAT_0064c600[unitOwner * 0x594 + 0x1b6 + unitType] + 1;
  }

  if ((unitOwner === G.DAT_006d1da0) || (G.DAT_00655b02 < 3)) {
    FUN_0059c575(param_1, param_2, G.DAT_00655afa, param_3, param_4);
  } else if ((2 < G.DAT_00655b02) &&
            ((u8(G.DAT_00655b0b) & (1 << (G.DAT_006560f0[param_1 * 0x20 + 7] & 0x1f))) !== 0)) {
    FUN_0046b14d(100, 0, param_1, param_2, G.DAT_00655afa, param_3, param_4, 0, 0, 0);
  }

  G.DAT_006acb0c = G.DAT_006acb0c + 1;

  if (G.DAT_00627670 !== 0) {
    FUN_004fbd9d(unitType, s8(G.DAT_006560f0[param_2 * 0x20 + 7]), unitOwner);
  }

  FUN_005b4391(param_1, 1);
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057eb94 — kill_all_units_in_stack (GAME LOGIC)
// Kills all units in a stack (param_1 = stack bottom)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057eb94(param_1, param_2, param_3, param_4) {
  G.DAT_006acb0c = 0;
  param_1 = FUN_005b2d39(param_1);
  while (param_1 >= 0) {
    let sVar1 = s16(G.DAT_006560f0, param_1 * 0x20 + 0x18); // next in stack
    FUN_0057e9f9(param_1, param_2, param_3, param_4);
    param_1 = sVar1;
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057ebfd — promote_unit (GAME LOGIC)
// Promotes a unit to veteran status
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057ebfd(param_1) {
  if (((u16(G.DAT_006560f0, param_1 * 0x20 + 4) & 0x2000) === 0) &&
     ((G.DAT_0064b1bc[u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 + 1] & 0x10) === 0)) {
    w16(G.DAT_006560f0, param_1 * 0x20 + 4,
        u16(G.DAT_006560f0, param_1 * 0x20 + 4) | 0x2000);
    if (((u8(G.DAT_00655b0b) & (1 << (G.DAT_006560f0[param_1 * 0x20 + 7] & 0x1f))) !== 0) &&
       (G.DAT_00654fa8 === 0)) {
      FUN_004271e8(0, u32(G.DAT_0064b1bc, u8(G.DAT_006560f0[param_1 * 0x20 + 6]) * 0x14 - 4));
      if (s8(G.DAT_006560f0[param_1 * 0x20 + 7]) === G.DAT_006d1da0) {
        FUN_004442e0("PROMOTED", param_1);
      } else if (2 < G.DAT_00655b02) {
        FUN_00511880(0x20, 0, 1, 0, param_1, 0);
      }
    }
  }
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057ed3f — play_combat_animation (UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057ed3f(param_1, param_2, param_3) {
  // Combat animation — UI only, no-op in JS
  G.DAT_006ad908 = 1;
  // ... animation frames ...
  G.DAT_006ad908 = 0;
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057f628 — destroy_combat_animation_data
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057f628() {
  // C++ destructor — no-op in JS
}

// ═══════════════════════════════════════════════════════════════════
// FUN_0057f648 — SEH_epilog_13
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057f648() {
  // SEH epilog — no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057f657 — show_nuke_animation (UI)
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057f657(param_1, param_2) {
  // Nuclear explosion animation — UI only, no-op in JS
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057f9e3 — nuclear_attack (GAME LOGIC)
// Handles nuclear missile strike on a tile.
// param_1 = attacking civ
// param_2 = target x
// param_3 = target y
// param_4 = flag (check for SDI)
// Returns 1 if strike succeeds, 0 if intercepted.
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057f9e3(param_1, param_2, param_3, param_4) {
  let cVar1;
  let iVar2;
  let uVar3;
  let iVar4;
  let local_14;
  let local_c;
  let local_8;

  iVar2 = FUN_005b8da4(param_2, param_3);
  local_c = u8(iVar2);

  // ── Check for SDI defense ──
  if (param_4 !== 0) {
    for (local_14 = 0; local_14 < G.DAT_00655b18; local_14 = local_14 + 1) {
      if (((s16(G.DAT_0064f340, local_14 * 0x58 + 0x54) !== 0) &&
          (s8(G.DAT_0064f340[local_14 * 0x58 + 8]) !== param_1)) &&
         ((iVar4 = FUN_0043d20a(local_14, 0x11), iVar4 !== 0) &&
          (iVar4 = FUN_005ae1b0(
            s16(G.DAT_0064f340, local_14 * 0x58),
            s16(G.DAT_0064f340, local_14 * 0x58 + 2),
            param_2, param_3), iVar4 < 4))) {
        // SDI within range — nuke intercepted
        return 0;
      }
    }
  }

  // ── Execute nuclear strike ──
  FUN_0057f657(param_2, param_3);

  // Kill all units in 9-tile area
  for (local_8 = 0; local_8 < 9; local_8 = local_8 + 1) {
    uVar3 = FUN_005ae052(s8(G.DAT_0064f340[0x28350 + local_8]) + param_2);
    cVar1 = s8(G.DAT_0064f340[0x28360 + local_8]);
    iVar2 = FUN_004087c0(uVar3, cVar1 + param_3);
    if ((iVar2 !== 0) && (iVar2 = FUN_005b2e69(uVar3, cVar1 + param_3), -1 < iVar2)) {
      if (s8(G.DAT_006560f0[iVar2 * 0x20 + 7]) !== param_1) {
        let unitOwner = s8(G.DAT_006560f0[iVar2 * 0x20 + 7]);
        let off1 = unitOwner * 0x594 + param_1 * 4;
        w32(G.DAT_0064c6c0, off1, u32(G.DAT_0064c6c0, off1) | 0x110);
        let off2 = unitOwner * 4 + param_1 * 0x594;
        w32(G.DAT_0064c6c0, off2, u32(G.DAT_0064c6c0, off2) | 0x20000);
        FUN_00456f20(unitOwner, param_1, 100);
      }
      FUN_005b47fa(iVar2, 1);
    }
  }

  // Destroy terrain improvements
  FUN_005b9179(param_2, param_3);

  return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUN_0057febc — scramble_air_defense (GAME LOGIC)
// Orders air units to intercept an incoming attack
// ═══════════════════════════════════════════════════════════════════
export function FUN_0057febc(param_1, param_2, param_3) {
  let iVar1;
  let iVar2;
  let iVar3;
  let local_14;

  local_14 = 0;
  while (true) {
    if (G.DAT_00655b16 <= local_14) {
      // Second pass: order nearby interceptors to scramble
      iVar1 = FUN_005b8a1d(param_2, param_3);
      iVar2 = FUN_005b8a81(param_2, param_3);

      for (local_14 = 0; local_14 < G.DAT_00655b16; local_14 = local_14 + 1) {
        if ((s16(G.DAT_006560f0, local_14 * 0x20 + 0x1a) !== 0) &&
           ((s8(G.DAT_006560f0[local_14 * 0x20 + 7]) === param_1 ||
            ((s8(G.DAT_006560f0[local_14 * 0x20 + 7]) !== iVar1 &&
             ((G.DAT_0064c6c0[s8(G.DAT_006560f0[local_14 * 0x20 + 7]) * 4 + param_1 * 0x594] & 8) !== 0) &&
             ((u8(G.DAT_00655b0b) & (1 << (u8(G.DAT_006560f0[local_14 * 0x20 + 7]) & 0x1f))) === 0)))) &&
           (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[local_14 * 0x20 + 6]) * 0x14 + 5]) === 0) && // land unit
           (s8(G.DAT_0064b1bc[u8(G.DAT_006560f0[local_14 * 0x20 + 6]) * 0x14 + 8]) !== 0) && // has attack
           (iVar3 = FUN_005b2c3d(local_14), iVar3 !== 0))) {
          // Check if unit can reach target
          if ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[local_14 * 0x20 + 6]) * 0x14 + 0x0e]) !== 1) ||
             (iVar3 = FUN_005b8ca6(
               s16(G.DAT_006560f0, local_14 * 0x20),
               s16(G.DAT_006560f0, local_14 * 0x20 + 2)), iVar3 < 0)) {
            iVar3 = FUN_005ae1b0(
              param_2, param_3,
              s16(G.DAT_006560f0, local_14 * 0x20),
              s16(G.DAT_006560f0, local_14 * 0x20 + 2));
            iVar3 = FUN_005b8a81(
              s16(G.DAT_006560f0, local_14 * 0x20),
              s16(G.DAT_006560f0, local_14 * 0x20 + 2));
            if (iVar3 === iVar2) {
              // Set unit to intercept
              G.DAT_006560f0[local_14 * 0x20 + 0x0f] = 0x0b; // goto order
              // Set target coords
              // G.DAT_00656102[local_14] = param_2, G.DAT_00656104[local_14] = param_3
            }
          }
        }
      }
      return;
    }

    // First pass: check for fighters that can immediately intercept
    if (((s16(G.DAT_006560f0, local_14 * 0x20 + 0x1a) !== 0) &&
        (s8(G.DAT_006560f0[local_14 * 0x20 + 7]) === param_1)) &&
       ((u8(G.DAT_0064b1bc[u8(G.DAT_006560f0[local_14 * 0x20 + 6]) * 0x14 + 1]) & 1) !== 0) &&
       (iVar1 = FUN_005b8ca6(
         s16(G.DAT_006560f0, local_14 * 0x20),
         s16(G.DAT_006560f0, local_14 * 0x20 + 2)), iVar1 >= 0) &&
       ((u8(G.DAT_006560f0[local_14 * 0x20 + 8]) === 0 ||
        (u16(G.DAT_006560f0, local_14 * 0x20 + 4) & 0x100) !== 0)) &&
       ((u16(G.DAT_006560f0, local_14 * 0x20 + 4) & 0x10) === 0)) {
      iVar1 = FUN_005ae1b0(
        s16(G.DAT_006560f0, local_14 * 0x20),
        s16(G.DAT_006560f0, local_14 * 0x20 + 2),
        param_2, param_3);
      if (iVar1 <= u8(G.DAT_0064bcdb)) {
        break; // Found interceptor
      }
    }
    local_14 = local_14 + 1;
  }

  FUN_004ca39e(local_14, param_2, param_3);
}


// ═══════════════════════════════════════════════════════════════════
// EXTERNAL FUNCTION STUBS
// Functions called from other blocks — stubbed as no-ops or
// returning default values until fully transpiled.
// ═══════════════════════════════════════════════════════════════════

function _rand() { return Math.floor(Math.random() * 0x7fff); }
function FUN_004bd9f0_stub() { return 0; }
function XD_FlushSendBuffer() { /* flush network */ }
function delete_city() { /* destroy city */ }
function FUN_citywin_DADA() { /* city window update 1 */ }
function FUN_handle_city_disorder_00509590() { /* check city disorder */ }
function FUN_citywin_DB36() { /* city window update 2 */ }
function build_menu_128C() { /* build menu entry */ }
