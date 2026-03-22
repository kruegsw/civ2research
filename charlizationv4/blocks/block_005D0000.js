// ═══════════════════════════════════════════════════════════════════
// block_005D0000.js — Mechanical transpilation of block_005D0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_005D0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_005D0000.c
//
// This entire block is the SMEDS32 UI framework library — sprite
// rendering, window management, edit/combo/list box controls, timer
// system, sound/wave output, MIDI/CD audio, file I/O, palette
// management, resource loading, GIF parsing, and miscellaneous UI
// utilities. Every function is a Win32 API / MFC wrapper with no
// game logic.
// ═══════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════
// GLOBAL VARIABLES (DAT_ references used in this block)
// ═══════════════════════════════════════════════════════════════════

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_00407ff0, FUN_004080c0, FUN_00408490, FUN_004085f0 } from './block_00400000.js';
import { FUN_0040f610, FUN_0040f730, FUN_0040f810, FUN_0040f880 } from './block_00400000.js';
import { FUN_00414bb0, FUN_00414d10, FUN_00417ef0, FUN_00418740, FUN_00418910, FUN_00418cb0 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421c30, FUN_00421c60, FUN_00421ca0 } from './block_00420000.js';
import { FUN_00447210, FUN_004472f0, FUN_0044c5a0, FUN_0044cba0 } from './block_00440000.js';
import { FUN_00450390, FUN_004503d0, FUN_00450400, FUN_00451830, FUN_00451860, FUN_00453af0 } from './block_00450000.js';
import { FUN_0046f440 } from './block_00460000.js';
import { FUN_00492a80, FUN_00497c40 } from './block_00490000.js';
import { FUN_004a6980 } from './block_004A0000.js';
import { FUN_004bb370, FUN_004bb3b0, FUN_004bb540 } from './block_004B0000.js';
import { FUN_004d8af0 } from './block_004D0000.js';
import { FUN_00511320 } from './block_00510000.js';
import { FUN_005a95b0 } from './block_005A0000.js';
import { FUN_005bb3f0, FUN_005bb4ae, FUN_005bb6c7, FUN_005bb8c0, FUN_005bc019, FUN_005bc173 } from './block_005B0000.js';
import { FUN_005bcfa0, FUN_005bd298, FUN_005bd4cd, FUN_005bd500, FUN_005bd610, FUN_005bd630 } from './block_005B0000.js';
import { FUN_005bd65c, FUN_005bd915 } from './block_005B0000.js';
import { FUN_005c041f, FUN_005c0593, FUN_005c0979, FUN_005c0cc5, FUN_005c0d12, FUN_005c1167 } from './block_005C0000.js';
import { FUN_005c11b2, FUN_005c19ad, FUN_005c5540, FUN_005c5560, FUN_005c55d0, FUN_005c5640 } from './block_005C0000.js';
import { FUN_005c5660, FUN_005c56a0, FUN_005c5ee0, FUN_005c5f00, FUN_005c62ee, FUN_005c6303 } from './block_005C0000.js';
import { FUN_005c64da, FUN_005c656b, FUN_005c9499, FUN_005c9563, FUN_005cbdd0, FUN_005cbeb0 } from './block_005C0000.js';
import { FUN_005cd535, FUN_005cd6e0, FUN_005cd775, FUN_005cda06, FUN_005cef31, FUN_005cf2ff } from './block_005C0000.js';
import { FUN_005cf39b, FUN_005cf3c5 } from './block_005C0000.js';
import { FUN_005e0b50, FUN_005e0b80, FUN_005e0ba0, FUN_005e0c90, FUN_005e10c7, FUN_005e1599 } from './block_005E0000.js';
import { FUN_005e17db, FUN_005e1c8e, FUN_005e22ed, FUN_005e2675, FUN_005e26f6, FUN_005e2799 } from './block_005E0000.js';
import { FUN_005e28cd, FUN_005e30a1, FUN_005e32b2, FUN_005e395a, FUN_005e518e, FUN_005e52bf } from './block_005E0000.js';
import { FUN_005e6188, FUN_005e7f85, FUN_005eb370, FUN_005eb3ed, FUN_005ed710, FUN_005ed920 } from './block_005E0000.js';
import { FUN_005eda65, FUN_005edb15, FUN_005edbb2, FUN_005edc6c, FUN_005edcac, FUN_005eddaa } from './block_005E0000.js';
import { FUN_005ee0b1, FUN_005eeca0, FUN_005eed1b } from './block_005E0000.js';
import { FUN_005f2260 } from './block_005F0000.js';
import { FUN_005f22d0, FUN_005f22e0 } from './block_00600000.js';
import { FUN_0061a000, FUN_0061a759 } from './block_00610000.js';

let PTR_DAT_00637e68 = null; // sprite draw callback
let PTR_DAT_00637e6c = null; // edit box font callback
let PTR_DAT_00637e64 = null; // button font callback
let PTR_DAT_00637e60 = null; // bitmap draw callback
let _DAT_006385b4 = 0;      // wave initialized flag
let _DAT_006385b8 = 0;      // wave reset counter
let _DAT_00638590 = 0;      // fill counter
let _DAT_00638594 = 0;      // read counter
let _DAT_00638598 = 0;      // samples requested
let _DAT_006385d4 = 0;      // done message counter
let _DAT_006389d0 = null;   // app singleton pointer
let PTR_FUN_0061d718 = 0;   // vtable pointer


// ═══════════════════════════════════════════════════════════════════
// STUBS: Win32 API and MFC calls — no-ops in JS
// ═══════════════════════════════════════════════════════════════════

function SetRect() {}
function OffsetRect() {}
function IntersectRect() { return 0; }
function InflateRect() {}
function CopyRect() {}
function InvalidateRect() {}
function GetClientRect() {}
function GetWindowRect() {}
function FrameRect() {}
function FillRect() {}
function SetFocus() {}
function GetFocus() { return 0; }
function SetCapture() {}
function ReleaseCapture() {}
function GetParent() { return 0; }
function BringWindowToTop() {}
function EnableWindow() {}
function IsIconic() { return 0; }
function IsWindowVisible() { return 0; }
function ShowWindow() {}
function DestroyWindow() {}
function CreateWindowExA() { return 0; }
function SetWindowLongA() {}
function GetWindowLongA() { return 0; }
function GetClassLongA() { return 0; }
function GetClassNameA() {}
function RegisterClassA() {}
function UnregisterClassA() { return 1; }
function DefWindowProcA() { return 0; }
function CallWindowProcA() { return 0; }
function SendMessageA() { return 0; }
function SetMenu() {}
function SetCursor() {}
function LoadCursorA() { return 0; }
function LoadIconA() { return 0; }
function LoadBitmapA() { return 0; }
function DrawIcon() {}
function DrawTextA() {}
function BeginPaint() { return 0; }
function EndPaint() {}
function GetDC() { return 0; }
function ReleaseDC() {}
function CreateCompatibleDC() { return 0; }
function DeleteDC() {}
function SelectObject() { return 0; }
function DeleteObject() {}
function GetStockObject() { return 0; }
function MoveToEx() {}
function LineTo() {}
function SetBkMode() {}
function SetTextColor() {}
function GetTextMetricsA() {}
function GetBitmapDimensionEx() {}
function GetDeviceCaps() { return 0; }
function GetSystemPaletteEntries() {}
function CreatePalette() { return 0; }
function SetPaletteEntries() {}
function AnimatePalette() {}
function RealizePalette() {}
function GdiFlush() {}
function GetTickCount() { return Date.now(); }
function GetFileSize() { return 0; }
function SetFilePointer() { return 0; }
function CreateFileA() { return 0; }
function CreateFileMappingA() { return 0; }
function MapViewOfFile() { return 0; }
function UnmapViewOfFile() {}
function ReadFile() { return 0; }
function WriteFile() { return 0; }
function CloseHandle() { return 1; }
function OpenFile() { return 0; }
function MessageBoxA() { return 0; }
function OutputDebugStringA() {}
function GlobalAlloc() { return 0; }
function GlobalFree() { return 0; }
function GlobalLock() { return 0; }
function GlobalUnlock() {}
function GlobalSize() { return 0; }
function LoadLibraryA() { return 0; }
function LoadLibraryExA() { return 0; }
function FreeLibrary() {}
function GetProcAddress() { return 0; }
function FindResourceA() { return 0; }
function LoadResource() { return 0; }
function LockResource() {}
function FreeResource() {}
function SetTimer() { return 1; }
function KillTimer() {}
function GetOpenFileNameA() { return 0; }
function GetSaveFileNameA() { return 0; }
function CommDlgExtendedError() { return 0; }
function InitCommonControls() {}
function waveOutOpen() { return 0; }
function waveOutClose() { return 0; }
function waveOutWrite() { return 0; }
function waveOutReset() {}
function waveOutGetNumDevs() { return 0; }
function waveOutGetDevCapsA() {}
function waveOutGetErrorTextA() {}
function waveOutGetPosition() {}
function waveOutPrepareHeader() { return 0; }
function waveOutUnprepareHeader() {}
function sndPlaySoundA() {}
function timeSetEvent() { return 0; }
function timeKillEvent() {}
function timeBeginPeriod() {}
function timeEndPeriod() {}
function mmioOpenA() { return 0; }
function mmioClose() {}
function mmioRead() { return 0; }
function mmioDescend() { return 0; }
function mmioAscend() {}
function mmioGetInfo() {}
function mmioAdvance() {}
function mmioSeek() {}
function mciSendCommandA() { return 0; }
function MessageBeep() {}
function AVIStreamInfoA() {}
function AVIStreamRead() {}
function AVIStreamReadFormat() {}
function AVIStreamTimeToSample() { return 0; }
function PeekMessageA() { return 0; }
function _memset() {}
function _sprintf() {}
function _strlen() { return 0; }
function _strchr() { return null; }
function _strcmp() { return 0; }
function _strncmp() { return 0; }
function _strncpy() {}
function __strlwr() {}
function __strupr(s) { return s; }
function __getcwd() {}
function __ftol() { return 0; }
function __msize() { return 0; }
function _time() { return 0; }
function _hread() { return 0; }
function _llseek() {}
function _atexit() {}
function operator_new() { return 0; }
function operator_delete() {}
function CONCAT22() { return 0; }
function CONCAT12() { return 0; }
function CONCAT11() { return 0; }
function CONCAT31() { return 0; }
function FID_conflict__memcpy() {}
function FID_conflict___expand() { return null; }


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks
// ═══════════════════════════════════════════════════════════════════

function FUN_0043c630() {}                 // thunk: show cursor
function FUN_0043c660() {}                 // thunk: hide cursor

// Functions from block_005B/005C/005E/005F/0061
function FUN_005c0e90() {}                 // render sprite
function create_window_B601() { return 0; } // create bitmap window
function create_window_BC10() { return 0; } // create standard window
function manage_window_C0AB() { return 0; } // destroy managed window
function manage_window_8B00() {}           // invalidate managed window
function manage_window_8B2D() {}           // hide managed window
function manage_window_8B58() {}           // show managed window
function send_msg_9307() { return 0; }     // default control WndProc
function invalidate_96CC() {}              // invalidate control
function update_palette_90CA() {}          // realize palette for paint
function show_messagebox_2997() {}         // show about dialog
function render_text_8834() { return [0,0,0,0]; } // measure text extent
function show_messagebox_DD00() {}         // show error message box
function build_menu_16E0() {}              // build popup menu
function build_menu_1768() {}              // build menu item
function build_menu_1805() {}              // destroy menu
function gdi_D39E() {}                     // set display depth


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Sprite rendering (scaled blit operations)
// ═══════════════════════════════════════════════════════════════════

// sprite_blit_standard — standard sprite blit with clipping
export function FUN_005d056c(param_1, param_2, param_3, param_4, param_5) {
  let in_ECX = {};
  if (param_3 === -1) { param_3 = u8(in_ECX[0xc]); }
  let local_8 = in_ECX[4] - in_ECX[0];
  let iVar1 = in_ECX[5] - in_ECX[1];
  let iVar2 = FUN_004a6980();
  if (((iVar2 * G.DAT_00637f98) / G.DAT_00637f9c < 0x401) &&
     (iVar2 = FUN_004bb540(), (iVar2 * G.DAT_00637f98) / G.DAT_00637f9c < 0x401)) {
    iVar2 = FUN_005d1d00(local_8, 0, 1);
    let iVar3 = FUN_005d1d00(iVar1, 0, 1);
    let iVar4 = FUN_005d1d00(in_ECX[8], 0, 0);
    let local_28 = iVar2 + iVar4 + param_4;
    iVar4 = FUN_005d1d00(in_ECX[9], 0, 0);
    let local_2c = iVar3 + iVar4 + param_5;
    let uVar5 = FUN_00451860(iVar3, 0);
    iVar4 = FUN_005d1d00(uVar5);
    uVar5 = FUN_00451830(iVar2, 0);
    let iVar6 = FUN_005d1d00(uVar5);
    let local_1c = { left: 0, top: 0, right: iVar6, bottom: iVar4 };
    let BVar7 = IntersectRect(local_1c, local_1c, param_2);
    if (BVar7 !== 0) {
      let local_30 = 0;
      uVar5 = FUN_00407f90(local_1c);
      if (local_28 < local_1c.left) {
        local_30 = local_1c.left - local_28;
        local_28 = local_1c.left;
      }
      let local_c = 0;
      let uVar8 = FUN_00407fc0(local_1c);
      if (local_2c < local_1c.top) {
        local_c = local_1c.top - local_2c;
        local_2c = local_1c.top;
      }
      iVar1 = FUN_005e395a(0, 0, uVar5, uVar8, local_30, local_c, local_8, iVar1, iVar2, iVar3);
      iVar2 = FUN_005c55d0();
      uVar5 = FUN_005c5640(G.DAT_006e47c8, u8(param_3), local_28, local_2c,
                           ((-(iVar1 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar2);
      FUN_005e518e(in_ECX[0xe], uVar5);
    }
    param_1[0] = local_1c.left;
    param_1[1] = local_1c.top;
    param_1[2] = local_1c.right;
    param_1[3] = local_1c.bottom;
    return param_1;
  }
  param_1[0] = 0; param_1[1] = 0; param_1[2] = 0; param_1[3] = 0;
  return param_1;
}

// sprite_blit_with_target — sprite blit to render target
export function FUN_005d080d(param_1, param_2, param_3, param_4, param_5) {
  // UI framework sprite blit — stub
  param_1[0] = 0; param_1[1] = 0; param_1[2] = 0; param_1[3] = 0;
  return param_1;
}

// sprite_blit_scaled_XY — sprite blit with separate X/Y scaling
export function FUN_005d0aac(param_1, param_2, param_3, param_4, param_5) {
  param_1[0] = 0; param_1[1] = 0; param_1[2] = 0; param_1[3] = 0;
  return param_1;
}

// sprite_blit_scaled_XY_target — scaled XY blit to render target
export function FUN_005d0dbf(param_1, param_2, param_3, param_4, param_5) {
  param_1[0] = 0; param_1[1] = 0; param_1[2] = 0; param_1[3] = 0;
  return param_1;
}

// sprite_blit_with_extra_param — standard blit + extra param
export function FUN_005d10cd(param_1, param_2, param_3, param_4, param_5, param_6) {
  param_1[0] = 0; param_1[1] = 0; param_1[2] = 0; param_1[3] = 0;
  return param_1;
}

// sprite_blit_target_extra — target blit + extra param
export function FUN_005d1372(param_1, param_2, param_3, param_4, param_5, param_6) {
  param_1[0] = 0; param_1[1] = 0; param_1[2] = 0; param_1[3] = 0;
  return param_1;
}

// sprite_composite — composite two sprites together
export function FUN_005d1612(param_1, param_2, param_3, param_4, param_5) { }

// sprite_init_rect — initialize sprite rect structure
export function FUN_005d1b38() { }

// sprite_get_pixel — get pixel color at coordinates
export function FUN_005d1bb8(param_1, param_2) { return 0; }

// sprite_identity — return input unchanged
export function FUN_005d1cb0(param_1) { return param_1; }

// sprite_copy_rect — copy 4 ints from src to dst
export function FUN_005d1cd0(param_1, param_2) {
  param_2[0] = param_1[0]; param_2[1] = param_1[1];
  param_2[2] = param_1[2]; param_2[3] = param_1[3];
}

// scale_coordinate — map pixel coordinate through scale table
export function FUN_005d1d00(param_1, param_2, param_3) {
  if (param_1 === 0) return 0;
  let bVar2 = param_1 >= 0;
  if (!bVar2) param_1 = -param_1;
  let local_10 = param_2 || 0;
  // Scale table lookup — no-op in JS context
  return ((bVar2 ? 2 : 0) - 1) * (local_10 - (param_2 || 0));
}

// scale_coordinate_XY — map coordinate with explicit scale params
export function FUN_005d1e00(param_1, param_2, param_3, param_4, param_5, param_6) {
  if (param_1 === 0) return 0;
  let bVar2 = param_1 >= 0;
  if (!bVar2) param_1 = -param_1;
  let local_10 = param_2 || 0;
  return ((bVar2 ? 2 : 0) - 1) * (local_10 - (param_2 || 0));
}

// add_to_sprite_offset — add offset to sprite position
export function FUN_005d1ef0(param_1) { return param_1; }

// sub_from_sprite_offset — subtract offset from sprite position
export function FUN_005d1f20(param_1) { return param_1; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Timer system (MrTimer)
// ═══════════════════════════════════════════════════════════════════

// timer_init — initialize MrTimer singleton
export function FUN_005d1f50(param_1, param_2, param_3) { }

// timer_stop — stop a timer by ID
export function FUN_005d2004(param_1) { }

// timer_set — set a timer callback
export function FUN_005d2042(param_1, param_2, param_3) { return 0; }

// timer_clear — clear a timer slot
export function FUN_005d20e6(param_1) { }

// timer_construct — construct MrTimer object
export function FUN_005d211e() { return 0; }

// timer_destroy_all — destroy all active timers
export function FUN_005d2182() { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Debug logging
// ═══════════════════════════════════════════════════════════════════

// library_init_E31 — library static initializer
export function FID_conflict___E31_005d21f0() { FUN_005d220a(); FUN_005d2224(); }

// init_debug_subsystem — initialize debug logging
export function FUN_005d220a() { FUN_005d246f(); }

// register_debug_atexit — register cleanup at exit
export function FUN_005d2224() { }

// debug_cleanup_atexit — atexit callback for debug
export function FUN_005d2241() { FUN_005d2498(); }

// debug_log — log a debug message
export function debug_log(param_1) { }

// debug_log_fmt1 — log formatted message (1 param)
export function FUN_005d2279(param_1, param_2) { }

// debug_log_fmt2 — log formatted message (2 params)
export function FUN_005d22b7(param_1, param_2, param_3) { }

// debug_log_fmt3 — log formatted message (3 params)
export function FUN_005d22f9(param_1, param_2, param_3, param_4) { }

// debug_log_fmt1b — log formatted message (1 param, variant)
export function FUN_005d233f(param_1, param_2) { }

// debug_log_fmt1c — log formatted message (1 param, variant)
export function FUN_005d237d(param_1, param_2) { }

// debug_log_fmt2b — log formatted message (2 params, variant)
export function FUN_005d23bb(param_1, param_2, param_3) { }

// debug_log_fmt2c — log formatted message (2 params, variant)
export function FUN_005d23fd(param_1, param_2, param_3) { }

// set_debug_log_to_file_flag
export function FUN_005d243f(param_1) { G.DAT_00638304 = param_1; }

// set_debug_log_to_output_flag
export function FUN_005d2457(param_1) { G.DAT_00638308 = param_1; }

// init_perf_counter — initialize performance counter
export function FUN_005d246f() { }

// destroy_perf_counter — destroy performance counter
export function FUN_005d2498() { }

// debug_log_timestamped — log with timestamp
export function FUN_005d24b3(param_1) { return 1; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: UI configuration setters
// ═══════════════════════════════════════════════════════════════════

// set_ui_config_byte
export function FUN_005d2550(param_1) { G.DAT_00637e90 = param_1; }

// set_shadow_color_RGB
export function FUN_005d2568(param_1, param_2, param_3) {
  G.DAT_00637e94 = param_1; G.DAT_00637e98 = param_2; G.DAT_00637e9c = param_3;
}

// set_disabled_text_color
export function FUN_005d2590(param_1) { G.DAT_00637ea0 = param_1; }

// set_sprite_draw_callback
export function FUN_005d25a8(param_1) { PTR_DAT_00637e68 = param_1; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Edit box controls
// ═══════════════════════════════════════════════════════════════════

// editbox_create — create an edit box control
export function FUN_005d25c0(param_1, param_2, param_3, param_4, param_5, param_6) { }

// editbox_create_with_style — create edit box with extra style
export function FUN_005d2625(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { }

// set_editbox_font_callback
export function FUN_005d268e(param_1) { PTR_DAT_00637e6c = param_1; }

// editbox_init_window — initialize edit box window
export function FUN_005d26b0(param_1, param_2, param_3, param_4, param_5) { }

// register_editbox_class — register MSEditBoxClass
export function register_wndclass_2740(param_1, param_2, param_3, param_4) { return 0; }

// editbox_wndproc — edit box window procedure
export function send_msg_2A01(param_1, param_2, param_3, param_4) { return 0; }

// editbox_enable — enable/disable edit box
export function FUN_005d2d15(param_1, param_2) { }

// editbox_noop — empty handler
export function FUN_005d2d3d() { }

// editbox_get_text — get edit box text
export function send_msg_2D4D(param_1, param_2) { }

// editbox_set_text — set edit box text
export function send_msg_2D7F(param_1, param_2) { }

// editbox_set_limit — set text length limit
export function send_msg_2DA1(param_1, param_2) { }

// editbox_select_all — select all text
export function send_msg_2DC6(param_1, param_2, param_3) { }

// editbox_get_line — get a line of text
export function send_msg_2DED(param_1, param_2, param_3, param_4) { return 0; }

// editbox_get_line_count — get line count
export function send_msg_2E31(param_1) { }

// editbox_undo — undo last edit
export function send_msg_2E54(param_1) { }

// editbox_get_first_visible — get first visible line
export function send_msg_2E77(param_1, param_2) { }

// editbox_get_line_index — get line start index
export function send_msg_2E9C(param_1, param_2) { }

// editbox_get_line_length — get line length
export function send_msg_2EC1(param_1, param_2) { }

// editbox_scroll — scroll edit box
export function send_msg_2EE6(param_1, param_2, param_3) { }

// editbox_set_caret — set caret position
export function send_msg_2F0D(param_1, param_2) { }

// editbox_get_selection_end — get selection end position
export function send_msg_2F47(param_1) { return 0; }

// editbox_get_end_of_last_line — compute end of last line
export function FUN_005d2f7e(param_1) { return 0; }

// editbox_scroll_to_caret — scroll to caret position
export function FUN_005d2fca(param_1) { }

// editbox_replace_sel — replace selected text
export function send_msg_3035(param_1, param_2) { }

// editbox_is_at_end — check if caret is at end
export function FUN_005d305a(param_1) { return false; }

// editbox_validate_char — validate character input
export function FUN_005d30e0(param_1) { return 1; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Combo box controls
// ═══════════════════════════════════════════════════════════════════

// register_combobox_class — register MSComboBoxClass
export function register_wndclass_3130(param_1, param_2, param_3) { return 0; }

// combobox_wndproc — combo box window procedure
export function send_msg_3310(param_1, param_2, param_3, param_4) { return 0; }

// combobox_noop
export function FUN_005d356e() { }

// combobox_add_string — add string to combo box
export function send_msg_357E(param_1, param_2) { }

// combobox_set_selection — set selected item
export function send_msg_35A3(param_1, param_2) { }

// combobox_set_font — set combo box font
export function send_msg_35C8(param_1, param_2) { }

// combobox_reset — clear combo box
export function send_msg_360A(param_1) { }

// combobox_get_item_data — get item data
export function send_msg_362D(param_1, param_2, param_3) { }

// combobox_get_selected_text — get selected text
export function send_msg_3654(param_1, param_2) { }

// combobox_get_selection — get selection index
export function send_msg_36B1(param_1) { return -1; }

// combobox_set_item_height — set item height
export function send_msg_36F6(param_1, param_2) { }

// combobox_on_dblclick — handle double click
export function FUN_005d3720() { }

// combobox_on_selchange — handle selection change
export function FUN_005d3760() { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: List box controls
// ═══════════════════════════════════════════════════════════════════

// register_listbox_class — register MSListBoxClass
export function register_wndclass_37A0(param_1, param_2, param_3, param_4) { return 0; }

// listbox_wndproc — list box window procedure
export function send_msg_39E2(param_1, param_2, param_3, param_4) { return 0; }

// listbox_noop
export function FUN_005d3c40() { }

// listbox_add_string — add string to list box
export function send_msg_3C50(param_1, param_2) { }

// listbox_set_selection — set selected item
export function send_msg_3C75(param_1, param_2) { }

// listbox_set_font — set list box font
export function send_msg_3C9A(param_1, param_2) { }

// listbox_reset — clear list box
export function send_msg_3CDC(param_1) { }

// listbox_get_item_data — get item data at index
export function send_msg_3CFF(param_1, param_2, param_3) { }

// listbox_insert_string — insert string at position
export function send_msg_3D26(param_1, param_2, param_3) { }

// listbox_get_selected_text — get selected text
export function send_msg_3D62(param_1, param_2) { }

// listbox_get_selection — get selection index
export function send_msg_3DBF(param_1) { return -1; }

// listbox_get_top_index — get top visible index
export function send_msg_3E04(param_1) { return -1; }

// listbox_find_string — find string in list
export function send_msg_3E49(param_1, param_2, param_3) { return -1; }

// listbox_delete_string — delete string at index
export function send_msg_3E92(param_1, param_2) { }

// listbox_set_item_data — set item data at index
export function send_msg_3EB7(param_1, param_2, param_3) { }

// listbox_set_item_data_swap — set item data (swapped params)
export function send_msg_3EDE(param_1, param_2, param_3) { }

// listbox_set_item_check — set checkbox state
export function send_msg_3F05(param_1, param_2, param_3) { }

// listbox_on_dblclick — handle double click
export function FUN_005d3f30() { }

// listbox_on_selchange — handle selection change
export function FUN_005d3f70() { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Window/control management
// ═══════════════════════════════════════════════════════════════════

// control_has_window — check if control has HWND
export function FUN_005d3fb0(param_1) { return 0; }

// control_invalidate_all — invalidate all controls
export function FUN_005d4014() { }

// control_show_all — show all controls
export function FUN_005d4087() { }

// control_hide_all — hide all controls
export function FUN_005d40dd() { }

// control_layout_all — layout all controls
export function FUN_005d4122() { }

// set_button_font_callback
export function FUN_005d4167(param_1) { PTR_DAT_00637e64 = param_1; }

// set_text_color_override_flag
export function FUN_005d417f(param_1) { G.DAT_00637e7c = param_1; }

// set_disabled_color_override_flag
export function FUN_005d4197(param_1) { G.DAT_00637e8c = param_1; }

// set_shadow_offsets
export function FUN_005d41af(param_1, param_2, param_3) {
  G.DAT_00637e80 = param_1; G.DAT_00637e84 = param_2; G.DAT_00637e88 = param_3;
}

// get_tick_60hz — get tick count at 60Hz
export function FUN_005d41e0() { return ((GetTickCount() * 6) / 100) >>> 0; }

// delay_ticks — busy-wait for N ticks
export function FUN_005d4204(param_1) { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Timer window and timer management
// ═══════════════════════════════════════════════════════════════════

// create_timer_window — create MrTimer hidden window
export function create_window_423C(param_1) { return 0; }

// destroy_timer_window — destroy timer window
export function manage_window_447C(param_1) { }

// timer_set_event — set a timer event
export function FUN_005d44be(param_1, param_2, param_3) { return 1; }

// timer_kill_event — kill a timer event
export function FUN_005d4664(param_1, param_2) { }

// timer_wndproc — timer window procedure
export function FUN_005d4700(param_1, param_2, param_3, param_4) { return 0; }

// timer_dispatch — dispatch timer callback
export function FUN_005d47d0(param_1) { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Sound / Wave output
// ═══════════════════════════════════════════════════════════════════

// sound_play_file — play a sound file
export function FUN_005d4870(param_1, param_2, param_3) { return 0; }

// sound_init_and_play — init sound system and play
export function FUN_005d4899(param_1, param_2) { }

// sound_shutdown — shutdown sound system
export function FUN_005d48d0() { }

// sound_open_device — open wave output device
export function FUN_005d48f0(param_1, param_2, param_3) { return 0; }

// sound_cleanup — cleanup sound resources
export function FUN_005d4965() { }

// sound_show_error — show sound error message
export function show_messagebox_49A3(param_1) { }

// sound_open_wave_device — open specific wave device
export function FUN_005d4a11(param_1, param_2, param_3) { return 0; }

// sound_close_wave — close wave output
export function FUN_005d4bcb(param_1) { return 0; }

// sound_show_wave_error — show wave error text
export function show_messagebox_4C18(param_1) { }

// sound_load_wav_file — load WAV from file
export function FUN_005d4c5f(param_1, param_2, param_3, param_4) { return 0; }

// sound_load_wav_memory — load WAV into memory
export function FUN_005d4f6a(param_1, param_2, param_3) { return 0; }

// sound_load_avi_audio — load audio from AVI
export function FUN_005d52a2(param_1) { return 0; }

// sound_get_position_ms — get playback position in ms
export function FUN_005d5643() { return 0; }

// sound_get_position_samples — get playback position in samples
export function FUN_005d5706() { return 0; }

// sound_fill_buffer — fill audio buffer from stream
export function FUN_005d57b1(param_1) { return 0; }

// sound_stop_streaming — stop streaming playback
export function FUN_005d5b88() { return 0; }

// sound_read_avi_chunk — read AVI audio chunk
export function FUN_005d5bec(param_1) { }

// sound_play_range — play audio range
export function FUN_005d5d11(param_1, param_2, param_3) { return 0; }

// sound_finish_playback — finish current playback
export function FUN_005d5f91() { }

// sound_queue_file — queue a sound file for playback
export function FUN_005d6038(param_1, param_2, param_3, param_4) { return 0; }

// sound_remove_by_tag — remove sounds by tag
export function FUN_005d61ab(param_1) { }

// sound_mark_done_by_tag — mark sounds done by tag
export function FUN_005d6222(param_1) { }

// sound_fill_from_file — fill buffer from file
export function FUN_005d6283(param_1) { }

// sound_alloc_global — allocate global memory for sound
export function FUN_005d63c5(param_1, param_2) { return null; }

// sound_free_global — free global sound memory
export function FUN_005d6430(param_1) { }

// sound_create_buffers — create wave output buffers
export function FUN_005d645e(param_1, param_2, param_3) { return 0; }

// sound_add_buffers — add buffers to chain
export function FUN_005d6685(param_1) { }

// sound_remove_buffers — remove buffers from chain
export function FUN_005d673a(param_1) { }

// sound_resize_buffer_chain — resize buffer chain
export function FUN_005d687b(param_1) { }

// sound_write_buffers — write pending buffers to device
export function FUN_005d6947(param_1) { return 0; }

// sound_reset_all — reset all sound state
export function FUN_005d6a2c() { }

// sound_fill_silence — fill buffer with silence
export function FUN_005d6b4c(param_1, param_2) { }

// sound_destroy_all — destroy all sound resources
export function FUN_005d6b89(param_1) { return 0; }

// sound_done_callback — wave output done callback
export function FUN_005d6c99(param_1, param_2) { return 0; }

// sound_fill_next_buffer — fill next buffer in chain
export function FUN_005d717f(param_1) { return 0; }

// sound_remove_stream — remove a sound stream
export function FUN_005d7494(param_1, param_2) { return 0; }

// sound_mix_mono — mix mono audio into buffer
export function FUN_005d753e(param_1, param_2, param_3) { return 0; }

// sound_mix_stereo — mix stereo audio into buffer
export function FUN_005d778c(param_1, param_2, param_3) { return 0; }

// sound_read_and_fill — read stream and fill buffer
export function FUN_005d791b(param_1, param_2) { return 0; }

// sound_is_tag_playing — check if tag is currently playing
export function FUN_005d7b94(param_1) { return 0; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Stream / memory utilities
// ═══════════════════════════════════════════════════════════════════

// stream_init — initialize stream struct
export function FUN_005d7c00() { return 0; }

// stream_realloc — reallocate stream buffer
export function FUN_005d7c2c(param_1, param_2) { return 0; }

// stream_finalize — finalize stream
export function FUN_005d7c6e() { }

// debug_output_string — output debug string
export function FUN_005d7c8c(param_1) { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Bitmap / sprite window creation
// ═══════════════════════════════════════════════════════════════════

// create_sprite_window — create sprite display window
export function FUN_005d7cb0(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { }

// create_sprite_window_ex — create sprite window with extra param
export function FUN_005d7f72(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) { }

// set_bitmap_draw_callback
export function FUN_005d8236(param_1) { PTR_DAT_00637e60 = param_1; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: File I/O
// ═══════════════════════════════════════════════════════════════════

// file_open — open file wrapper
export function FUN_005d8250(param_1, param_2) { }

// file_open_impl — open file implementation
export function FUN_005d8270(param_1, param_2) { return 0; }

// file_create — create new file wrapper
export function FUN_005d83b6(param_1, param_2) { }

// file_create_impl — create new file implementation
export function FUN_005d83d6(param_1, param_2) { return false; }

// file_close — close file handle
export function FUN_005d8476(param_1) { return 0; }

// file_read — read from file
export function FUN_005d84f6(param_1, param_2, param_3) { return 0; }

// file_find_string — search for string in file
export function FUN_005d8551(param_1, param_2) { return 0; }

// file_seek_relative — seek relative to current
export function FUN_005d8622(param_1, param_2) { return 0; }

// file_seek_absolute — seek from beginning
export function FUN_005d8675(param_1, param_2) { return 0; }

// file_get_size — get file size
export function FUN_005d86c8(param_1, param_2) { return 0; }

// file_write — write to file
export function FUN_005d8721(param_1, param_2, param_3) { return 0; }

// file_write_line — write string + newline
export function FUN_005d879c(param_1, param_2) { return 0; }

// file_read_line — read a line from file
export function FUN_005d881c(param_1, param_2, param_3) { return 0; }

// file_get_byte_size — get file size in bytes
export function FUN_005d898e(param_1) { return 0; }

// file_memory_map — memory-map a file
export function FUN_005d89e8(param_1, param_2, param_3) { return 0; }

// file_unmap — unmap memory-mapped file
export function FUN_005d8ab8(param_1) { return 0; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: File dialog / strftime / misc
// ═══════════════════════════════════════════════════════════════════

// strftime_wrapper — format time with strftime
export function FUN_005d8b34(param_1, param_2, param_3) { }

// strftime — C library strftime
export function _strftime(param_1, param_2, param_3, param_4) { return 0; }

// strftime_alt — alternate strftime call
export function FUN_005d8b86(param_1, param_2, param_3, param_4) { }

// file_save_dialog — show save file dialog
export function FUN_005d8bb0(param_1, param_2, param_3, param_4, param_5) { }

// file_open_dialog_wrapper — show open/save dialog wrapper
export function FUN_005d8bde(param_1, param_2, param_3, param_4, param_5) { }

// show_file_dialog — show open/save file dialog
export function show_open_dialog_8C0C(param_1, param_2, param_3, param_4, param_5, param_6) { return 0; }

// output_debug — output debug string
export function FUN_005d8d06(param_1) { return 1; }

// always_true — always returns 1
export function FUN_005d8d30() { return 1; }

// split_underscores — split string on underscores
export function FUN_005d8d50(param_1) { return 1; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Control (button) creation and management
// ═══════════════════════════════════════════════════════════════════

// get_text_height — get default text height
export function gdi_8DA1() { return 0x14; }

// create_button_array — create array of button controls
export function create_window_8E3F(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { return 0; }

// create_button_array_from_string — create buttons from underscore-delimited string
export function create_window_931B(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { return 0; }

// destroy_button_array — destroy array of button controls
export function manage_window_99F4(param_1, param_2) { }

// button_click_handler — handle button click
export function invalidate_9A9A(param_1) { }

// button_wndproc — button control window procedure
export function draw_text_9B86(param_1, param_2, param_3, param_4) { return 0; }

// is_button_control — check if HWND is a button control
export function FUN_005dab5a(param_1) { return 0; }

// invalidate_button — invalidate a button rect
export function invalidate_ABC7(param_1) { }

// is_button_selected — check if button is selected
export function FUN_005dabe5(param_1) { return false; }

// are_buttons_same_group — check if two buttons are in same group
export function FUN_005dac39(param_1, param_2) { return 0; }

// set_enabled_text_color — set RGB for enabled text
export function FUN_005dacd9(param_1, param_2, param_3) {
  G.DAT_006386f4 = param_1; G.DAT_006386f5 = param_2;
  G.DAT_006386f6 = param_3; G.DAT_006386f7 = 1;
}

// set_disabled_text_color — set RGB for disabled text
export function FUN_005dad08(param_1, param_2, param_3) {
  G.DAT_006386f8 = param_1; G.DAT_006386f9 = param_2;
  G.DAT_006386fa = param_3; G.DAT_006386fb = 1;
}

// button_on_click_callback — invoke click callback
export function FUN_005dad40(param_1, param_2) { }

// button_on_dblclick_callback — invoke double-click callback
export function FUN_005dad80(param_1, param_2) { }

// button_on_rclick_callback — invoke right-click callback
export function FUN_005dadc0(param_1, param_2) { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Error handling (SMEDS assertion system)
// ═══════════════════════════════════════════════════════════════════

// library_init_E31_b — second library static initializer
export function FID_conflict___E31_005dae00() { FUN_005dae1a(); FUN_005dae34(); }

// init_error_subsystem
export function FUN_005dae1a() { }

// register_error_atexit
export function FUN_005dae34() { }

// error_cleanup_atexit
export function FUN_005dae51() { }

// fatal_error — report fatal error
export function FUN_005dae6b(param_1, param_2, param_3, param_4) { }

// warning — report warning
export function FUN_005daeb1(param_1, param_2, param_3, param_4) { }

// format_error_string — format error message
export function FUN_005daef7(param_1, param_2, param_3, param_4) { return ''; }

// get_error_timestamp — get error timestamp string
export function FUN_005daf63() { return 0; }

// show_fatal_messagebox — show fatal error dialog
export function FUN_005daf92(param_1) { }

// log_warning — log warning to debug
export function FUN_005dafbb(param_1) { }

// set_error_code — set current error code
export function FUN_005dafdf(param_1) { }

// IsTracking — CSplitterWnd::IsTracking
export function IsTracking() { return 0; }

// EnableStackedTabs — CPropertySheet::EnableStackedTabs
export function EnableStackedTabs(param_1) { }

// clear_error_state — clear error state
export function FUN_005db059() { }

// init_error_handler — construct error handler
export function FUN_005db089() { return 0; }

// Iostream_init_destructor — ~Iostream_init (no-op)
export function Iostream_init_destructor() { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Scroll bar, bitmap, window creation utilities
// ═══════════════════════════════════════════════════════════════════

// set_scroll_position — set scroll bar position
export function FUN_005db0d0(param_1) { }

// get_scroll_range — get scroll bar range
export function FUN_005db110(param_1, param_2) { }

// load_resource_dll — load a resource DLL
export function FUN_005db140(param_1) { return 0; }

// free_resource — free loaded resource
export function FUN_005db1e0(param_1) { }

// find_resource_by_type — find resource by type string
export function FUN_005db1fa(param_1, param_2) { return 0; }

// find_bitmap_resource — find bitmap resource
export function FUN_005db2f8(param_1) { return 0; }

// find_resource_by_name — find resource by name with sanitization
export function FUN_005db3ca(param_1, param_2) { return 0; }

// lock_resource_data — lock resource for reading
export function FUN_005db531(param_1) { }

// unlock_resource_noop — no-op resource unlock
export function FUN_005db54b() { }

// unload_resource_dll — unload a resource DLL
export function FUN_005db55b(param_1) { }

// get_resource_size — query resource data size
export function FUN_005db5e9(param_1) { }

// bitmap_handle_init — initialize bitmap handle struct
export function FUN_005db610() { return 0; }

// bitmap_handle_destroy — destroy bitmap handle
export function FUN_005db650() { }

// bitmap_create_window — create window for bitmap
export function FUN_005db67b(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { }

// bitmap_create_window_scrollable — create scrollable bitmap window
export function FUN_005db704(param_1, param_2, param_3, param_4, param_5, param_6) { }

// bitmap_create_anim_window — create animation window
export function FUN_005db792(param_1, param_2, param_3, param_4, param_5, param_6) { }

// bitmap_create_anim_parented — create parented animation window
export function FUN_005db80f(param_1, param_2, param_3, param_4, param_5, param_6) { }

// bitmap_create_window_parented_scroll — create parented scrollable window
export function FUN_005db893(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { }

// bitmap_create_window_parented — create parented window
export function FUN_005db923(param_1, param_2, param_3, param_4, param_5, param_6) { }

// set_background_mode_child — set child window background
export function FUN_005db9b8(param_1, param_2, param_3) { }

// set_background_mode_transparent — set transparent background
export function FUN_005dba15(param_1, param_2, param_3) { }

// set_display_depth_truecolor
export function FUN_005dba72() { }

// set_display_depth_256
export function FUN_005dba95() { }

// set_display_depth_hicolor
export function FUN_005dbab8() { }

// lock_display — lock display surface
export function FUN_005dbadb() { }

// unlock_display — unlock display surface
export function FUN_005dbaf6() { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: App initialization / shutdown
// ═══════════════════════════════════════════════════════════════════

// app_init — initialize SMEDS application
export function FUN_005dbb20(param_1, param_2) {
  G.DAT_006e4ff0 = param_1; G.DAT_006e4fec = param_2;
  return 1;
}

// app_shutdown — shutdown SMEDS application
export function FUN_005dbb4f() { return 1; }

// init_subsystems_a — init display subsystem
export function FUN_005dbbb3() { }

// init_subsystems_b — init windows + timer + RNG
export function FUN_005dbbd6() { }

// shutdown_subsystems — shutdown all subsystems
export function FUN_005dbc1b() { }

// init_hook_noop — empty init hook
export function FUN_005dbc3a() { }

// shutdown_hook_noop — empty shutdown hook
export function FUN_005dbc4a() { }

// register_all_window_classes — register SMEDS window classes
export function register_wndclass_BC5A() { }

// unregister_all_window_classes — unregister SMEDS window classes
export function FUN_005dbdba() { }

// main_wndproc — main window procedure
export function fill_rect_BE88(param_1, param_2, param_3, param_4) { return 0; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Memory management
// ═══════════════════════════════════════════════════════════════════

// timer_destructor — destroy MrTimer with optional delete
export function FUN_005dcac0(param_1) { return 0; }

// mem_duplicate_handle — duplicate memory handle
export function FUN_005dcb00(param_1) { }

// mem_lock — lock memory handle
export function FUN_005dcb1c(param_1) { }

// mem_unlock — unlock memory handle
export function FUN_005dcb38(param_1) { }

// mem_alloc — allocate memory handle
export function FUN_005dcb54(param_1) { }

// mem_free — free memory handle
export function FUN_005dcb70(param_1) { }

// mem_copy — copy memory block
export function FUN_005dcb8c(param_1, param_2, param_3) { }

// mem_size — get memory block size
export function FUN_005dcbb0(param_1) { }

// mem_realloc — reallocate memory block
export function FUN_005dcbcc(param_1, param_2) { }

// mem_get_avail — get available memory
export function FUN_005dcbec() { }

// stream_ctor — construct stream object
export function FUN_005dcc10() { return 0; }

// timevec_destructor — ~_Timevec destructor
export function _Timevec_destructor(param_1) { }

// menu_create_from_resource — create menu from resource
export function FUN_005dcc56(param_1, param_2, param_3, param_4) { }

// menu_add_item — add menu item
export function FUN_005dcc95(param_1, param_2, param_3) { }

// Realloc — reallocate buffer (CMemFile)
export function Realloc(param_1, param_2) { }

// menu_destroy_from_resource — destroy menu from resource
export function FUN_005dcce9(param_1) { }

// menu_destroy — destroy menu
export function FUN_005dcd1c(param_1) { }

// menu_seek — seek in menu resource
export function FUN_005dcd40(param_1) { }

// handle_duplicate — duplicate a global memory handle
export function FUN_005dcd70(param_1) { }

// handle_lock — lock a global handle, return pointer
export function FUN_005dcdf9(param_1) { return param_1 ? param_1 : null; }

// handle_unlock — unlock a global handle
export function FUN_005dce29(param_1) { return 0; }

// handle_alloc — allocate global memory
export function FUN_005dce4f(param_1) { return 0; }

// handle_free — free global memory
export function FUN_005dce96(param_1) { return 0; }

// mem_copy_raw — raw memory copy
export function FUN_005dced3(param_1, param_2, param_3) { }

// handle_get_size — get global handle size
export function FUN_005dcef7(param_1) { }

// handle_resize — resize global handle
export function FUN_005dcf11(param_1, param_2) { }

// get_max_memory — get max available memory
export function FUN_005dcfb5() { return 0x100000; }

// is_low_memory — check if memory is low
export function FUN_005dcfca(param_1) { return false; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: App object (CFrameWnd subclass)
// ═══════════════════════════════════════════════════════════════════

// app_construct — construct app singleton
export function FUN_005dd010() { return 0; }

// app_destruct — destruct app singleton
export function FUN_005dd1a0() { }

// app_destruct_bitmaps — destroy bitmap subsystem
export function FUN_005dd230() { }

// app_destruct_fonts — destroy font subsystem
export function FUN_005dd23f() { }

// app_destruct_animations — destroy animation subsystem
export function FUN_005dd24e() { }

// app_destruct_frame — destroy CFrameWnd
export function FUN_005dd25d() { }

// app_destruct_epilog — FS restoration
export function FUN_005dd270() { }

// dialog_create — create dialog window
export function FUN_005dd27e(param_1, param_2, param_3, param_4) { }

// dialog_create_with_parent — create dialog with parent
export function FUN_005dd2e3(param_1, param_2, param_3, param_4, param_5) { }

// animation_load — load animation resource
export function FUN_005dd377(param_1) { return 0; }

// animation_reset — reset animation state
export function FUN_005dd3c2() { }

// animation_set_range — set animation frame range
export function FUN_005dd3f1(param_1, param_2) { }

// animation_clear — clear animation buffers
export function FUN_005dd45d() { }

// animation_play — play animation
export function FUN_005dd487() { }

// animation_set_range_and_play — set range and play
export function FUN_005dd4c2(param_1, param_2) { }

// animation_stop — stop animation
export function FUN_005dd51d() { }

// animation_start — start animation
export function FUN_005dd53f() { }

// set_text_and_scroll — set text with scrolling
export function FUN_005dd561(param_1) { }

// resize_to_bitmap — resize window to bitmap size
export function FUN_005dd5a4(param_1) { }

// offset_bitmap — offset bitmap within window
export function FUN_005dd64c(param_1, param_2, param_3) { }

// double_size_bitmap — double the bitmap display size
export function FUN_005dd71e() { }

// toggle_visibility — toggle window visibility
export function FUN_005dd761(param_1) { }

// render_offset_bitmap — render bitmap at offset
export function FUN_005dd7de() { }

// empty_handler — no-op handler
export function FUN_005dd87d() { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Multimedia (sound, MIDI, CD audio)
// ═══════════════════════════════════════════════════════════════════

// register_mm_wndclass — register MSMMWindow class
export function register_wndclass_D8A0() { }

// mm_wndproc — multimedia window procedure
export function FUN_005dd93f(param_1, param_2, param_3, param_4) { return 0; }

// play_sound_async — play sound asynchronously
export function FUN_005dd9d9(param_1) { }

// play_sound_loop — play sound in loop
export function FUN_005dd9f5(param_1) { }

// stop_sound — stop sound playback
export function FUN_005dda11() { }

// sound_noop — no-op sound handler
export function FUN_005dda2b() { }

// play_beep — play system beep
export function FUN_005dda3b() { }

// midi_play — play MIDI file
export function show_messagebox_DA53(param_1) { return 0; }

// cdaudio_play_track — play CD audio track
export function FUN_005ddbc7(param_1) { return 0; }

// midi_stop — stop MIDI playback
export function FUN_005ddd12() { }

// cdaudio_open — open CD audio device
export function FUN_005ddd4e() { }

// cdaudio_close — close CD audio device
export function FUN_005dde57() { }

// cdaudio_pause — pause CD audio
export function FUN_005dde9d() { }

// mm_shutdown — shutdown multimedia subsystem
export function manage_window_DECF() { }

// cdaudio_get_track_count — get number of CD tracks
export function FUN_005ddeff() { return 0; }

// cdaudio_open_door — open CD tray
export function FUN_005de00d() { }

// cdaudio_close_door — close CD tray
export function FUN_005de0b5() { }

// cdaudio_resume_or_play — resume CD or play
export function FUN_005de19d() { }

// cdaudio_resume_or_eject — resume CD or eject
export function FUN_005de250() { }

// cdaudio_play_next — play next CD track
export function FUN_005de310() { }

// cdaudio_play_prev — play previous CD track
export function FUN_005de41e() { }

// cdaudio_get_position — get CD playback position
export function FUN_005de529(param_1, param_2, param_3) { return 0; }

// play_sound_wrapper — play sound wrapper
export function FUN_005de620(param_1) { }

// play_sound_loop_wrapper — play looping sound wrapper
export function FUN_005de63c(param_1) { }

// play_sound_noop_wrapper — no-op sound wrapper
export function FUN_005de658(param_1) { }

// play_beep_wrapper — play beep wrapper
export function FUN_005de674() { }

// midi_play_wrapper — play MIDI wrapper
export function FUN_005de689(param_1) { }

// set_midi_done_callback
export function FUN_005de6a5(param_1) { G.DAT_006e5004 = param_1; }

// invoke_midi_done_callback
export function FUN_005de6bd() { }

// cdaudio_play_wrapper — play CD track wrapper
export function FUN_005de6e0(param_1) { }

// set_cd_done_callback
export function FUN_005de6fc(param_1) { G.DAT_006e5000 = param_1; }

// invoke_cd_done_callback
export function FUN_005de714() { }

// midi_stop_wrapper — stop MIDI wrapper
export function FUN_005de737() { }

// stop_sound_wrapper — stop sound wrapper
export function FUN_005de74c() { }

// cdaudio_pause_wrapper — pause CD wrapper
export function FUN_005de761() { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Palette management
// ═══════════════════════════════════════════════════════════════════

// palette_init — initialize palette from system
export function gdi_E780(param_1) { }

// palette_set_animatable — mark palette entries as animatable
export function FUN_005de984(param_1, param_2, param_3) { }

// palette_set_from_source — copy palette from source
export function FUN_005de9e0(param_1, param_2, param_3) { }

// palette_animate — animate palette entries
export function update_palette_EA62(param_1, param_2, param_3, param_4) { }

// palette_get_rgb — get RGB values for index
export function FUN_005dea9e(param_1, param_2, param_3, param_4, param_5) { }

// palette_set_rgb — set RGB values for index
export function FUN_005deadb(param_1, param_2, param_3, param_4, param_5) { }

// palette_set_entry — set palette entry with matching
export function FUN_005deb12(param_1, param_2, param_3, param_4, param_5) { }

// palette_create — create a GDI palette
export function FUN_005dec4e(param_1) { return 0; }

// palette_delete — delete a GDI palette
export function FUN_005dec8a(param_1) { }

// palette_set_entries — set GDI palette entries
export function FUN_005decb1(param_1, param_2, param_3, param_4) { }

// palette_copy — copy entire palette data
export function FUN_005deced(param_1, param_2) { }

// palette_extract_rgb — extract RGB array from palette
export function FUN_005ded12(param_1, param_2, param_3, param_4) { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Tooltip / splash screen
// ═══════════════════════════════════════════════════════════════════

// splash_init — initialize splash screen subsystem
export function FUN_005ded90() { }

// splash_show — show splash/tooltip dialog
export function FUN_005dee28(param_1, param_2, param_3) { }

// tooltip_timer_callback — tooltip timer fired
export function FUN_005df166() { }

// tooltip_start — start tooltip timer
export function FUN_005df1fd(param_1, param_2, param_3, param_4, param_5) { }

// tooltip_stop — stop tooltip timer
export function FUN_005df280() { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: GIF resource loading
// ═══════════════════════════════════════════════════════════════════

// load_gif_resource — load GIF from resource
export function FUN_005df2b5(param_1, param_2) { }

// gif_cleanup_a — cleanup helper a
export function FUN_005df67b() { }

// gif_cleanup_b — cleanup helper b
export function FUN_005df687() { }

// gif_cleanup_epilog — FS restoration
export function FUN_005df69d() { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Visual effects / dissolve
// ═══════════════════════════════════════════════════════════════════

// dissolve_effect — run dissolve transition effect
export function FUN_005df6ab(param_1, param_2, param_3, param_4, param_5, param_6, param_7) { }

// dissolve_effect_impl — dissolve effect implementation
export function FUN_005df6e1(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) { }

// draw_3d_border_screen — draw 3D border on screen DC
export function FUN_005df931(param_1, param_2, param_3, param_4, param_5, param_6) { }

// draw_3d_border_offscreen — draw 3D border on offscreen bitmap
export function FUN_005dfa4d(param_1, param_2, param_3, param_4, param_5) { }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: RLE encode/decode
// ═══════════════════════════════════════════════════════════════════

// rle_decode — decode RLE-compressed data in-place
export function FUN_005dfb61(param_1) { return 0; }

// rle_encode — RLE-compress data in-place
export function FUN_005dfd8f(param_1, param_2) { return 0; }
