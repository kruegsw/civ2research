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
import { FUN_0043c630, FUN_0043c660 } from './block_00430000.js';
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
import { FUN_005f2260, __getcwd, _sprintf, operator_delete } from './block_005F0000.js';
import { FID_conflict__memcpy, FUN_005f22d0, FUN_005f22e0, __strlwr, _atexit, _memset } from './block_00600000.js';
import { _strncpy } from './block_00600000.js';
import { FUN_0061a000, FUN_0061a759 } from './block_00610000.js';
const ri = s32, wi = w32, rs = s16, ws = w16, rs16 = s16, rs32 = s32, ri32 = s32, wi32 = w32, w8 = (a,o,v) => { if (a && a[o] !== undefined) a[o] = v & 0xff; };

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
// DEVIATION: Win32 API — no-ops in JS
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
function _strlen() { return 0; }
function _strchr() { return null; }
function _strcmp() { return 0; }
function _strncmp() { return 0; }
function __strupr(s) { return s; }
function __ftol() { return 0; }
function __msize() { return 0; }
function _time() { return 0; }
function _hread() { return 0; }
function _llseek() {}
function operator_new() { return 0; }
function CONCAT22() { return 0; }
function CONCAT12() { return 0; }
function CONCAT11() { return 0; }
function CONCAT31() { return 0; }
function FID_conflict___expand() { return null; }


// ═══════════════════════════════════════════════════════════════════
// DEVIATION: Win32 API — functions from other blocks (forward declarations)
// ═══════════════════════════════════════════════════════════════════


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
    // C: OffsetRect(&local_1c, local_28, local_2c) — offset clip rect to sprite position
    local_1c.left += local_28; local_1c.right += local_28;
    local_1c.top += local_2c; local_1c.bottom += local_2c;
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
  let in_ECX = {};
  if (param_3 === -1) { param_3 = u8(in_ECX[0xc]); }
  let local_8 = in_ECX[4] - in_ECX[0];
  let iVar1 = in_ECX[5];
  let iVar2 = in_ECX[1];
  let iVar3 = FUN_004a6980();
  if (((iVar3 * G.DAT_00637f98) / G.DAT_00637f9c < 0x401) &&
     (iVar3 = FUN_004bb540(), (iVar3 * G.DAT_00637f98) / G.DAT_00637f9c < 0x401)) {
    iVar3 = FUN_005d1d00(local_8, 0, 1);
    let iVar4 = FUN_005d1d00(iVar1 - iVar2, 0, 1);
    let iVar5 = FUN_005d1d00(in_ECX[8], 0, 0);
    let local_28 = param_4 + iVar5 + iVar3;
    iVar5 = FUN_005d1d00(in_ECX[9], 0, 0);
    let local_2c = param_5 + iVar5 + iVar4;
    let uVar6 = FUN_00451860(iVar4, 0);
    iVar5 = FUN_005d1d00(uVar6);
    uVar6 = FUN_00451830(iVar3, 0);
    let xRight = FUN_005d1d00(uVar6);
    let local_1c = { left: 0, top: 0, right: xRight, bottom: iVar5 };
    // DEVIATION: Win32 — OffsetRect(&local_1c, local_28, local_2c)
    local_1c.left += local_28; local_1c.right += local_28;
    local_1c.top += local_2c; local_1c.bottom += local_2c;
    let BVar7 = IntersectRect(local_1c, local_1c, param_2);
    if (BVar7 !== 0) {
      let local_34 = 0;
      uVar6 = FUN_00407f90(local_1c);
      if (local_28 < local_1c.left) {
        local_34 = local_1c.left - local_28;
        local_28 = local_1c.left;
      }
      let local_c = 0;
      let uVar8 = FUN_00407fc0(local_1c);
      if (local_2c < local_1c.top) {
        local_c = local_1c.top - local_2c;
        local_2c = local_1c.top;
      }
      iVar5 = FUN_005e6188();
      if (iVar5 !== 0) {
        uVar6 = FUN_005c5660(uVar6, uVar8, local_34, local_c, local_8, iVar1 - iVar2, iVar3, iVar4);
        uVar6 = FUN_005c56a0(uVar6);
        FUN_005e518e(in_ECX[0xe], iVar5, G.DAT_006e47c8, u8(param_3), local_28, local_2c, uVar6);
        _Timevec_destructor(param_2);
      }
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

// sprite_blit_scaled_XY — sprite blit with separate X/Y scaling
export function FUN_005d0aac(param_1, param_2, param_3, param_4, param_5) {
  let in_ECX = {};
  if (param_3 === -1) { param_3 = u8(in_ECX[0xc]); }
  let local_8 = in_ECX[4] - in_ECX[0];
  let iVar1 = in_ECX[5] - in_ECX[1];
  let iVar2 = FUN_004a6980();
  if (((iVar2 * G.DAT_00637fa0) / G.DAT_00637fa4 < 0x401) &&
     (iVar2 = FUN_004bb540(), (iVar2 * G.DAT_00637fa8) / G.DAT_00637fac < 0x401)) {
    iVar2 = FUN_005d1e00(local_8, 0, 1, G.DAT_00637fa0, G.DAT_00637fa4, G.DAT_006e47c0);
    let iVar3 = FUN_005d1e00(iVar1, 0, 1, G.DAT_00637fa8, G.DAT_00637fac, G.DAT_006e47c4);
    let iVar4 = FUN_005d1e00(in_ECX[8], 0, 0, G.DAT_00637fa0, G.DAT_00637fa4, G.DAT_006e47c0);
    let local_28 = param_4 + iVar4 + iVar2;
    iVar4 = FUN_005d1e00(in_ECX[9], 0, 0, G.DAT_00637fa8, G.DAT_00637fac, G.DAT_006e47c4);
    let local_2c = param_5 + iVar4 + iVar3;
    let uVar5 = FUN_00451860(iVar3, 0, G.DAT_00637fa8, G.DAT_00637fac, G.DAT_006e47c4);
    iVar4 = FUN_005d1e00(uVar5);
    uVar5 = FUN_00451830(iVar2, 0, G.DAT_00637fa0, G.DAT_00637fa4, G.DAT_006e47c0);
    let iVar6 = FUN_005d1e00(uVar5);
    let local_1c = { left: 0, top: 0, right: iVar6, bottom: iVar4 };
    // DEVIATION: Win32 — OffsetRect(&local_1c, local_28, local_2c)
    local_1c.left += local_28; local_1c.right += local_28;
    local_1c.top += local_2c; local_1c.bottom += local_2c;
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
      iVar4 = local_c;
      iVar6 = local_8;
      let pCVar9 = 0; // DEVIATION: Win32 — COleClientItem::GetActiveView(param_2)
      let uVar10 = 0; // DEVIATION: Win32 — CCheckListBox::GetCheckStyle(param_2)
      iVar1 = FUN_005e395a(uVar10, pCVar9, uVar5, uVar8, local_30, iVar4, iVar6, iVar1, iVar2, iVar3);
      iVar2 = FUN_005c55d0();
      uVar5 = FUN_005c5640(G.DAT_006e47c0, G.DAT_006e47c4, u8(param_3), local_28, local_2c,
                           ((-(iVar1 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar2);
      FUN_0061a759(in_ECX[0xe], uVar5);
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

// sprite_blit_scaled_XY_target — scaled XY blit to render target
export function FUN_005d0dbf(param_1, param_2, param_3, param_4, param_5) {
  let in_ECX = {};
  if (param_3 === -1) { param_3 = u8(in_ECX[0xc]); }
  let local_8 = in_ECX[4] - in_ECX[0];
  let iVar1 = in_ECX[5];
  let iVar2 = in_ECX[1];
  let iVar3 = FUN_004a6980();
  if (((iVar3 * G.DAT_00637fa0) / G.DAT_00637fa4 < 0x401) &&
     (iVar3 = FUN_004bb540(), (iVar3 * G.DAT_00637fa8) / G.DAT_00637fac < 0x401)) {
    iVar3 = FUN_005d1e00(local_8, 0, 1, G.DAT_00637fa0, G.DAT_00637fa4, G.DAT_006e47c0);
    let iVar4 = FUN_005d1e00(iVar1 - iVar2, 0, 1, G.DAT_00637fa8, G.DAT_00637fac, G.DAT_006e47c4);
    let iVar5 = FUN_005d1e00(in_ECX[8], 0, 0, G.DAT_00637fa0, G.DAT_00637fa4, G.DAT_006e47c0);
    let local_2c = param_4 + iVar5 + iVar3;
    iVar5 = FUN_005d1e00(in_ECX[9], 0, 0, G.DAT_00637fa8, G.DAT_00637fac, G.DAT_006e47c4);
    let local_30 = param_5 + iVar5 + iVar4;
    let uVar6 = FUN_00451860(iVar4, 0, G.DAT_00637fa8, G.DAT_00637fac, G.DAT_006e47c4);
    iVar5 = FUN_005d1e00(uVar6);
    uVar6 = FUN_00451830(iVar3, 0, G.DAT_00637fa0, G.DAT_00637fa4, G.DAT_006e47c0);
    let xRight = FUN_005d1e00(uVar6);
    let local_20 = { left: 0, top: 0, right: xRight, bottom: iVar5 };
    // DEVIATION: Win32 — OffsetRect(&local_20, local_2c, local_30)
    local_20.left += local_2c; local_20.right += local_2c;
    local_20.top += local_30; local_20.bottom += local_30;
    let BVar7 = IntersectRect(local_20, local_20, param_2);
    if (BVar7 !== 0) {
      let local_34 = 0;
      uVar6 = FUN_00407f90(local_20);
      if (local_2c < local_20.left) {
        local_34 = local_20.left - local_2c;
        local_2c = local_20.left;
      }
      let local_10 = 0;
      let uVar8 = FUN_00407fc0(local_20);
      if (local_30 < local_20.top) {
        local_10 = local_20.top - local_30;
        local_30 = local_20.top;
      }
      let local_c = FUN_005e6188();
      if (local_c !== 0) {
        uVar6 = FUN_005c5660(uVar6, uVar8, local_34, local_10, local_8, iVar1 - iVar2, iVar3, iVar4);
        uVar6 = FUN_005c56a0(uVar6);
        FUN_0061a759(in_ECX[0xe], local_c, G.DAT_006e47c0, G.DAT_006e47c4, u8(param_3), local_2c,
                     local_30, uVar6);
        _Timevec_destructor(param_2);
      }
    }
    param_1[0] = local_20.left;
    param_1[1] = local_20.top;
    param_1[2] = local_20.right;
    param_1[3] = local_20.bottom;
    return param_1;
  }
  param_1[0] = 0; param_1[1] = 0; param_1[2] = 0; param_1[3] = 0;
  return param_1;
}

// sprite_blit_with_extra_param — standard blit + extra param
export function FUN_005d10cd(param_1, param_2, param_3, param_4, param_5, param_6) {
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
    let local_28 = param_4 + iVar4 + iVar2;
    iVar4 = FUN_005d1d00(in_ECX[9], 0, 0);
    let local_2c = param_5 + iVar4 + iVar3;
    let uVar5 = FUN_00451860(iVar3, 0);
    iVar4 = FUN_005d1d00(uVar5);
    uVar5 = FUN_00451830(iVar2, 0);
    let iVar6 = FUN_005d1d00(uVar5);
    let local_1c = { left: 0, top: 0, right: iVar6, bottom: iVar4 };
    // DEVIATION: Win32 — OffsetRect(&local_1c, local_28, local_2c)
    local_1c.left += local_28; local_1c.right += local_28;
    local_1c.top += local_2c; local_1c.bottom += local_2c;
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
      iVar4 = local_c;
      iVar6 = local_8;
      let pCVar9 = 0; // DEVIATION: Win32 — COleClientItem::GetActiveView(param_2)
      let uVar10 = 0; // DEVIATION: Win32 — CCheckListBox::GetCheckStyle(param_2)
      iVar1 = FUN_005e395a(uVar10, pCVar9, uVar5, uVar8, local_30, iVar4, iVar6, iVar1, iVar2, iVar3, param_6);
      iVar2 = FUN_005c55d0();
      uVar5 = FUN_005c5640(G.DAT_006e47c8, u8(param_3), local_28, local_2c,
                           ((-(iVar1 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar2);
      FUN_005e52bf(in_ECX[0xe], uVar5);
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

// sprite_blit_target_extra — target blit + extra param
export function FUN_005d1372(param_1, param_2, param_3, param_4, param_5, param_6) {
  let in_ECX = {};
  if (param_3 === -1) { param_3 = u8(in_ECX[0xc]); }
  let local_8 = in_ECX[4] - in_ECX[0];
  let iVar1 = in_ECX[5];
  let iVar2 = in_ECX[1];
  let iVar3 = FUN_004a6980();
  if (((iVar3 * G.DAT_00637f98) / G.DAT_00637f9c < 0x401) &&
     (iVar3 = FUN_004bb540(), (iVar3 * G.DAT_00637f98) / G.DAT_00637f9c < 0x401)) {
    iVar3 = FUN_005d1d00(local_8, 0, 1);
    let iVar4 = FUN_005d1d00(iVar1 - iVar2, 0, 1);
    let iVar5 = FUN_005d1d00(in_ECX[8], 0, 0);
    let local_2c = param_4 + iVar5 + iVar3;
    iVar5 = FUN_005d1d00(in_ECX[9], 0, 0);
    let local_30 = param_5 + iVar5 + iVar4;
    let uVar6 = FUN_00451860(iVar4, 0);
    iVar5 = FUN_005d1d00(uVar6);
    uVar6 = FUN_00451830(iVar3, 0);
    let xRight = FUN_005d1d00(uVar6);
    let local_20 = { left: 0, top: 0, right: xRight, bottom: iVar5 };
    // DEVIATION: Win32 — OffsetRect(&local_20, local_2c, local_30)
    local_20.left += local_2c; local_20.right += local_2c;
    local_20.top += local_30; local_20.bottom += local_30;
    let BVar7 = IntersectRect(local_20, local_20, param_2);
    if (BVar7 !== 0) {
      let local_34 = 0;
      uVar6 = FUN_00407f90(local_20);
      if (local_2c < local_20.left) {
        local_34 = local_20.left - local_2c;
        local_2c = local_20.left;
      }
      let local_10 = 0;
      let uVar8 = FUN_00407fc0(local_20);
      if (local_30 < local_20.top) {
        local_10 = local_20.top - local_30;
        local_30 = local_20.top;
      }
      let local_c = FUN_005e6188();
      if (local_c !== 0) {
        uVar6 = FUN_005c5660(uVar6, uVar8, local_34, local_10, local_8, iVar1 - iVar2, iVar3, iVar4, param_6);
        uVar6 = FUN_005c56a0(uVar6);
        FUN_005e52bf(in_ECX[0xe], local_c, G.DAT_006e47c8, u8(param_3), local_2c, local_30, uVar6);
        _Timevec_destructor(param_2);
      }
    }
    param_1[0] = local_20.left;
    param_1[1] = local_20.top;
    param_1[2] = local_20.right;
    param_1[3] = local_20.bottom;
    return param_1;
  }
  param_1[0] = 0; param_1[1] = 0; param_1[2] = 0; param_1[3] = 0;
  return param_1;
}

// Source: decompiled/block_005D0000.c FUN_005d1612 (1297 bytes)
// sprite_composite — composite two sprites together
export function FUN_005d1612(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — if (param_1[0xd] != 0) {
  // DEVIATION: Win32 — if (param_2[3].top == 0) {
  // DEVIATION: Win32 — SetRect(param_2,*param_1,param_1[1],param_1[2] + param_4,param_1[3] + param_5);
  // DEVIATION: Win32 — param_2[1].left = param_1[4];
  // DEVIATION: Win32 — param_2[1].top = param_1[5];
  // DEVIATION: Win32 — param_2[1].right = param_1[6];
  // DEVIATION: Win32 — param_2[1].bottom = param_1[7];
  // DEVIATION: Win32 — OffsetRect(param_2 + 1,param_4,param_5);
  // DEVIATION: Win32 — param_2[2].left = param_1[8] + param_4;
  // DEVIATION: Win32 — param_2[2].top = param_1[9] + param_5;
  // DEVIATION: Win32 — param_2[2].right = param_1[10];
  // DEVIATION: Win32 — param_2[2].bottom = param_1[0xb];
  // DEVIATION: Win32 — *(char *)&param_2[3].left = (char)param_1[0xc];
  // DEVIATION: Win32 — param_2[3].top = param_1[0xd];
  // DEVIATION: Win32 — FUN_005dcd70(&param_2[3].top);
  // DEVIATION: Win32 — FUN_005cf2ff();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar3 = (param_1[5] + param_5) - param_2[1].top;
  // DEVIATION: Win32 — iVar4 = thunk_FUN_00407f90(param_1 + 4);
  // DEVIATION: Win32 — iVar8 = param_1[4];
  // DEVIATION: Win32 — iVar5 = thunk_FUN_00407fc0(param_1 + 4);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00407f90(param_2 + 1);
  // DEVIATION: Win32 — iVar6 = param_2[1].left + iVar6;
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00407fc0(param_2 + 1);
  // DEVIATION: Win32 — iVar11 = iVar5 + iVar3;
  // DEVIATION: Win32 — if (iVar5 + iVar3 <= iVar7) {
  // DEVIATION: Win32 — iVar11 = iVar7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar8 = iVar8 + iVar4 + param_4;
  // DEVIATION: Win32 — if (iVar8 <= iVar6) {
  // DEVIATION: Win32 — iVar8 = iVar6;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — SetRect(&local_14,0,0,iVar8,iVar11);
  // DEVIATION: Win32 — LVar2 = local_14.bottom;
  // DEVIATION: Win32 — LVar12 = local_14.right;
  // DEVIATION: Win32 — FUN_005cf2ff();
  // DEVIATION: Win32 — FUN_005cf2ff();
  // DEVIATION: Win32 — local_54 = (int *)param_1[0xe];
  // DEVIATION: Win32 — local_5c = (int *)param_2[3].right;
  // DEVIATION: Win32 — LVar9 = FUN_005dce4f(LVar12 * LVar2 + LVar2 * 8);
  // DEVIATION: Win32 — local_20 = (int *)FUN_005dcdf9(LVar9);
  // DEVIATION: Win32 — for (local_40 = 0; local_40 < LVar2; local_40 = local_40 + 1) {
  // DEVIATION: Win32 — bVar1 = local_40 < iVar7;
  // DEVIATION: Win32 — if ((iVar3 <= local_40) && (local_40 < iVar5 + iVar3)) {
  // DEVIATION: Win32 — bVar1 = bVar1 | 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — switch(bVar1) {
  // DEVIATION: Win32 — case 0:
  // DEVIATION: Win32 — *local_20 = 0;
  // DEVIATION: Win32 — local_20[1] = 0;
  // DEVIATION: Win32 — local_20 = local_20 + 2;
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — case 1:
  // DEVIATION: Win32 — *local_20 = *local_5c;
  // DEVIATION: Win32 — local_20[1] = local_5c[1];
  // DEVIATION: Win32 — iVar8 = local_20[1];
  // DEVIATION: Win32 — FUN_005dced3(local_5c + 2,local_20 + 2,iVar8);
  // DEVIATION: Win32 — local_5c = (int *)((int)(local_5c + 2) + iVar8);
  // DEVIATION: Win32 — local_20 = (int *)((int)(local_20 + 2) + iVar8);
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — case 2:
  // DEVIATION: Win32 — *local_20 = *local_54 + param_4;
  // DEVIATION: Win32 — local_20[1] = local_54[1];
  // DEVIATION: Win32 — iVar8 = local_20[1];
  // DEVIATION: Win32 — FUN_005dced3(local_54 + 2,local_20 + 2,iVar8);
  // DEVIATION: Win32 — local_54 = (int *)((int)(local_54 + 2) + iVar8);
  // DEVIATION: Win32 — local_20 = (int *)((int)(local_20 + 2) + iVar8);
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — case 3:
  // DEVIATION: Win32 — iVar8 = *local_5c;
  // DEVIATION: Win32 — iVar4 = local_5c[1] + iVar8;
  // DEVIATION: Win32 — local_5c = local_5c + 2;
  // DEVIATION: Win32 — iVar6 = *local_54 + param_4;
  // DEVIATION: Win32 — iVar10 = local_54[1] + iVar6;
  // DEVIATION: Win32 — local_54 = local_54 + 2;
  // DEVIATION: Win32 — iVar11 = iVar8;
  // DEVIATION: Win32 — if (iVar6 <= iVar8) {
  // DEVIATION: Win32 — iVar11 = iVar6;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *local_20 = iVar11;
  // DEVIATION: Win32 — iVar11 = iVar4;
  // DEVIATION: Win32 — if (iVar4 <= iVar10) {
  // DEVIATION: Win32 — iVar11 = iVar10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_20[1] = iVar11 - *local_20;
  // DEVIATION: Win32 — local_20 = local_20 + 2;
  // DEVIATION: Win32 — local_24 = LVar12;
  // DEVIATION: Win32 — local_34 = 0;
  // DEVIATION: Win32 — while (local_24 != 0) {
  // DEVIATION: Win32 — local_60 = 0;
  // DEVIATION: Win32 — if ((iVar8 <= local_34) && (local_34 < iVar4)) {
  // DEVIATION: Win32 — *(char *)local_20 = (char)*local_5c;
  // DEVIATION: Win32 — local_5c = (int *)((int)local_5c + 1);
  // DEVIATION: Win32 — local_60 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((iVar6 <= local_34) && (local_34 < iVar10)) {
  // DEVIATION: Win32 — if ((uint)*(byte *)(param_1 + 0xc) == (int)(char)*local_54) {
  // DEVIATION: Win32 — if (local_60 == 0) {
  // DEVIATION: Win32 — *(char *)local_20 = (char)param_2[3].left;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(char *)local_20 = (char)*local_54;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_54 = (int *)((int)local_54 + 1);
  // DEVIATION: Win32 — local_60 = local_60 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_60 != 0) {
  // DEVIATION: Win32 — local_20 = (int *)((int)local_20 + 1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_34 = local_34 + 1;
  // DEVIATION: Win32 — local_24 = local_24 + -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — OffsetRect(&local_14,param_2[1].left,param_2[1].top);
  // DEVIATION: Win32 — param_2[1].left = local_14.left;
  // DEVIATION: Win32 — param_2[1].top = local_14.top;
  // DEVIATION: Win32 — param_2[1].right = local_14.right;
  // DEVIATION: Win32 — param_2[1].bottom = local_14.bottom;
  // DEVIATION: Win32 — param_2->left = local_14.left;
  // DEVIATION: Win32 — param_2->top = local_14.top;
  // DEVIATION: Win32 — param_2->right = local_14.right;
  // DEVIATION: Win32 — param_2->bottom = local_14.bottom;
  // DEVIATION: Win32 — if (param_2[3].right != 0) {
  // DEVIATION: Win32 — FUN_005cf337();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_2[3].top != 0) {
  // DEVIATION: Win32 — LVar12 = FUN_005dce96(param_2[3].top);
  // DEVIATION: Win32 — param_2[3].top = LVar12;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005dce29(LVar9);
  // DEVIATION: Win32 — param_2[3].top = LVar9;
  // DEVIATION: Win32 — FUN_005cf2ff();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005d1b38 (128 bytes)
// sprite_init_rect — initialize sprite rect structure
export function FUN_005d1b38() {
  // DEVIATION: Win32 — SetRect(in_ECX,0,0,0,0);
  // DEVIATION: Win32 — SetRect(in_ECX + 1,0,0,0,0);
  // DEVIATION: Win32 — in_ECX[2].left = 0;
  // DEVIATION: Win32 — in_ECX[2].top = 0;
  // DEVIATION: Win32 — in_ECX[2].right = 1;
  // DEVIATION: Win32 — in_ECX[2].bottom = 1;
  // DEVIATION: Win32 — *(undefined1 *)&in_ECX[3].left = 0;
  // DEVIATION: Win32 — in_ECX[3].top = 0;
  // DEVIATION: Win32 — in_ECX[3].right = 0;
}

// Source: decompiled/block_005D0000.c FUN_005d1bb8 (239 bytes)
// sprite_get_pixel — get pixel color at coordinates
export function FUN_005d1bb8(param_1, param_2) {
  // DEVIATION: Win32 — if ((((param_2 < *(int *)(in_ECX + 0x14)) || (*(int *)(in_ECX + 0x1c) < param_2)) ||
  // DEVIATION: Win32 — (param_1 < *(int *)(in_ECX + 0x10))) || (*(int *)(in_ECX + 0x18) < param_1)) {
  // DEVIATION: Win32 — uVar1 = *(undefined1 *)(in_ECX + 0x30);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — param_1 = param_1 - *(int *)(in_ECX + 0x10);
  // DEVIATION: Win32 — local_14 = *(int **)(in_ECX + 0x38);
  // DEVIATION: Win32 — local_c = param_2 - *(int *)(in_ECX + 0x14);
  // DEVIATION: Win32 — while( true ) {
  // DEVIATION: Win32 — if (local_c == 0) break;
  // DEVIATION: Win32 — local_14 = (int *)((int)local_14 + local_14[1] + 8);
  // DEVIATION: Win32 — local_c = local_c + -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar2 = *local_14 - *(int *)(in_ECX + 0x10);
  // DEVIATION: Win32 — if ((param_1 < iVar2) || (iVar2 + local_14[1] <= param_1)) {
  // DEVIATION: Win32 — uVar1 = *(undefined1 *)(in_ECX + 0x30);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = *(undefined1 *)((param_1 - iVar2) + 8 + (int)local_14);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

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
  let local_10;
  let slotOff = G.DAT_006e47c8 * 0x400;
  if (G.DAT_00637f98 < G.DAT_00637f9c) {
    local_10 = param_2;
    param_1 = G.DAT_006d470c[param_2 + slotOff] + param_1;
    while (G.DAT_006d470c[local_10 + slotOff] < param_1) {
      local_10 = local_10 + 1;
    }
    if ((param_3 === 0) && (G.DAT_006d470c[local_10 + slotOff] !== param_1)) {
      local_10 = local_10 - 1;
    }
  } else {
    local_10 = param_2;
    while (G.DAT_006d470c[local_10 + slotOff] < G.DAT_006d470c[param_2 + slotOff] + param_1) {
      local_10 = local_10 + 1;
    }
  }
  return ((bVar2 ? 2 : 0) - 1) * (local_10 - param_2);
}

// scale_coordinate_XY — map coordinate with explicit scale params
export function FUN_005d1e00(param_1, param_2, param_3, param_4, param_5, param_6) {
  if (param_1 === 0) return 0;
  let bVar2 = param_1 >= 0;
  if (!bVar2) param_1 = -param_1;
  let local_10;
  let slotOff = param_6 * 0x400;
  if (param_4 < param_5) {
    local_10 = param_2;
    param_1 = G.DAT_006d470c[param_2 + slotOff] + param_1;
    while (G.DAT_006d470c[local_10 + slotOff] < param_1) {
      local_10 = local_10 + 1;
    }
    if ((param_3 === 0) && (G.DAT_006d470c[local_10 + slotOff] !== param_1)) {
      local_10 = local_10 - 1;
    }
  } else {
    local_10 = param_2;
    while (G.DAT_006d470c[local_10 + slotOff] < G.DAT_006d470c[param_2 + slotOff] + param_1) {
      local_10 = local_10 + 1;
    }
  }
  return ((bVar2 ? 2 : 0) - 1) * (local_10 - param_2);
}

// add_to_sprite_offset — add offset to sprite position
export function FUN_005d1ef0(param_1) { return param_1; }

// sub_from_sprite_offset — subtract offset from sprite position
export function FUN_005d1f20(param_1) { return param_1; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Timer system (MrTimer)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005d1f50 (157 bytes)
// timer_init — initialize MrTimer singleton
export function FUN_005d1f50(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SEH frame + Win32 API calls
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — SEH: puStack_c = &LAB_005d1feb;
  // DEVIATION: Win32 — SEH: local_10 = *unaff_FS_OFFSET;
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = &local_10;
  // DEVIATION: Win32 — if (G.DAT_00637ef4 == 0) {
  // DEVIATION: Win32 — pvVar1 = operator_new(0x90);
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — if (pvVar1 == (void *)0x0) {
  // DEVIATION: Win32 — local_18 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_18 = FUN_005d211e();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_00637ef4 = local_18;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — FUN_005d2042(param_1,param_2,param_3);
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = local_10;
}

// Source: decompiled/block_005D0000.c FUN_005d2004 (62 bytes)
// timer_stop — stop a timer by ID
export function FUN_005d2004(param_1) {
  // DEVIATION: Win32 — if (G.DAT_00637ef4 == 0) {
  // DEVIATION: Win32 — debug_log(s_Error__MrTimer_not_initialized_i_006382d4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005d20e6(param_1);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005d2042 (159 bytes)
// timer_set — set a timer callback
export function FUN_005d2042(param_1, param_2, param_3) {
  // DEVIATION: Win32 — for (local_8 = 1; (local_8 < 0x11 && (in_ECX[local_8 + 1] != 0)); local_8 = local_8 + 1) {
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_8 < 0x11) {
  // DEVIATION: Win32 — iVar1 = FUN_005d44be(*in_ECX,param_2,local_8);
  // DEVIATION: Win32 — if (iVar1 == 0) {
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — in_ECX[local_8 + 1] = param_1;
  // DEVIATION: Win32 — in_ECX[local_8 + 0x12] = param_3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_8;
}

// Source: decompiled/block_005D0000.c FUN_005d20e6 (56 bytes)
// timer_clear — clear a timer slot
export function FUN_005d20e6(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d211e (100 bytes)
// timer_construct — construct MrTimer object
export function FUN_005d211e() {
  // DEVIATION: Win32 — for (local_8 = 1; local_8 < 0x11; local_8 = local_8 + 1) {
  // DEVIATION: Win32 — in_ECX[local_8 + 1] = 0;
  // DEVIATION: Win32 — in_ECX[local_8 + 0x12] = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = create_window_423C();
  // DEVIATION: Win32 — *in_ECX = uVar1;
  // DEVIATION: Win32 — return in_ECX;
}

// Source: decompiled/block_005D0000.c FUN_005d2182 (95 bytes)
// timer_destroy_all — destroy all active timers
export function FUN_005d2182() {
  // DEVIATION: Win32 — for (local_8 = 0; local_8 < 0x10; local_8 = local_8 + 1) {
  // DEVIATION: Win32 — if (in_ECX[local_8 + 1] != 0) {
  // DEVIATION: Win32 — FUN_005d20e6(local_8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — manage_window_447C(*in_ECX);
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Debug logging
// ═══════════════════════════════════════════════════════════════════

// library_init_E31 — library static initializer
export function FID_conflict___E31_005d21f0() { FUN_005d220a(); FUN_005d2224(); }

// init_debug_subsystem — initialize debug logging
export function FUN_005d220a() { FUN_005d246f(); }

// Source: decompiled/block_005D0000.c FUN_005d2224 (29 bytes)
// register_debug_atexit — register cleanup at exit
export function FUN_005d2224() {
  // DEVIATION: Win32 — _atexit(FUN_005d2241);
}

// debug_cleanup_atexit — atexit callback for debug
export function FUN_005d2241() { FUN_005d2498(); }

// Source: decompiled/block_005D0000.c debug_log (30 bytes)
// debug_log — log a debug message
export function debug_log(param_1) {
  // DEVIATION: Win32 — FUN_005d24b3(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005d2279 (62 bytes)
// debug_log_fmt1 — log formatted message (1 param)
export function FUN_005d2279(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d22b7 (66 bytes)
// debug_log_fmt2 — log formatted message (2 params)
export function FUN_005d22b7(param_1, param_2, param_3) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d22f9 (70 bytes)
// debug_log_fmt3 — log formatted message (3 params)
export function FUN_005d22f9(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d233f (62 bytes)
// debug_log_fmt1b — log formatted message (1 param, variant)
export function FUN_005d233f(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d237d (62 bytes)
// debug_log_fmt1c — log formatted message (1 param, variant)
export function FUN_005d237d(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d23bb (66 bytes)
// debug_log_fmt2b — log formatted message (2 params, variant)
export function FUN_005d23bb(param_1, param_2, param_3) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d23fd (66 bytes)
// debug_log_fmt2c — log formatted message (2 params, variant)
export function FUN_005d23fd(param_1, param_2, param_3) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// set_debug_log_to_file_flag
export function FUN_005d243f(param_1) { G.DAT_00638304 = param_1; }

// set_debug_log_to_output_flag
export function FUN_005d2457(param_1) { G.DAT_00638308 = param_1; }

// Source: decompiled/block_005D0000.c FUN_005d246f (41 bytes)
// init_perf_counter — initialize performance counter
export function FUN_005d246f() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d2498 (27 bytes)
// destroy_perf_counter — destroy performance counter
export function FUN_005d2498() {
  // DEVIATION: Win32 — FUN_005eda65();
}

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

// Source: decompiled/block_005D0000.c FUN_005d25c0 (101 bytes)
// editbox_create — create an edit box control
export function FUN_005d25c0(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d2625 (105 bytes)
// editbox_create_with_style — create edit box with extra style
export function FUN_005d2625(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// set_editbox_font_callback
export function FUN_005d268e(param_1) { PTR_DAT_00637e6c = param_1; }

// Source: decompiled/block_005D0000.c FUN_005d26b0 (132 bytes)
// editbox_init_window — initialize edit box window
export function FUN_005d26b0(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — if (*(int *)(in_ECX + 0x1c) != 0) {
  // DEVIATION: Win32 — thunk_FUN_0040f610();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(undefined **)(in_ECX + 0x40) = PTR_DAT_00637e6c;
  // DEVIATION: Win32 — thunk_FUN_0040f730(param_1,4,param_2,param_3);
  // DEVIATION: Win32 — uVar1 = register_wndclass_2740(param_3,in_ECX,1,param_5,*(undefined4 *)(in_ECX + 0x40));
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x1c) = uVar1;
  // DEVIATION: Win32 — send_msg_2D7F(*(undefined4 *)(in_ECX + 0x1c),param_4);
}

// Source: decompiled/block_005D0000.c register_wndclass_2740 (705 bytes)
// register_editbox_class — register MSEditBoxClass
export function register_wndclass_2740(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — local_8 = 0x40800000;
  // DEVIATION: Win32 — if (param_4 != 0) {
  // DEVIATION: Win32 — local_8 = 0x50800000;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((param_3 & 1) != 0) {
  // DEVIATION: Win32 — local_8 = local_8 | 0x80;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (((param_3 & 2) != 0) || ((param_3 & 0x200) != 0)) {
  // DEVIATION: Win32 — local_8 = local_8 | 4;
  // DEVIATION: Win32 — *(undefined1 *)(param_2 + 0x38) = 1;
  // DEVIATION: Win32 — if ((param_3 & 0x200) != 0) {
  // DEVIATION: Win32 — *(undefined1 *)(param_2 + 0x39) = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((param_3 & 4) != 0) {
  // DEVIATION: Win32 — local_8 = local_8 | 0xa0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((param_3 & 8) != 0) {
  // DEVIATION: Win32 — local_8 = local_8 | 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((param_3 & 0x10) != 0) {
  // DEVIATION: Win32 — local_8 = local_8 | 0x10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((param_3 & 0x20) != 0) {
  // DEVIATION: Win32 — local_8 = local_8 | 0x200040;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((param_3 & 0x40) != 0) {
  // DEVIATION: Win32 — local_8 = local_8 | 0x100080;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((param_3 & 0x80) != 0) {
  // DEVIATION: Win32 — local_8 = local_8 | 0x1000;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((param_3 & 0x100) != 0) {
  // DEVIATION: Win32 — local_8 = local_8 | 0x800;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(uint *)(param_2 + 0x3c) = local_8;
  // DEVIATION: Win32 — if (G.DAT_00638314 == 0) {
  // DEVIATION: Win32 — pvVar8 = (LPVOID)0x0;
  // DEVIATION: Win32 — pHVar6 = (HMENU)0x0;
  // DEVIATION: Win32 — pHVar7 = G.DAT_006e4ff0;
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar1 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar5 = *(HWND *)(iVar1 + 4);
  // DEVIATION: Win32 — iVar1 = thunk_FUN_00407fc0(param_1);
  // DEVIATION: Win32 — iVar2 = thunk_FUN_00407f90(param_1);
  // DEVIATION: Win32 — local_c = CreateWindowExA(4,&G.DAT_0063831c,&G.DAT_00638318,local_8,*param_1,param_1[1],iVar2,iVar1,
  // DEVIATION: Win32 — pHVar5,pHVar6,pHVar7,pvVar8);
  // DEVIATION: Win32 — G.DAT_006e47dc = (WNDPROC)GetWindowLongA(local_c,-4);
  // DEVIATION: Win32 — local_34.style = 0x88;
  // DEVIATION: Win32 — local_34.cbClsExtra = 0;
  // DEVIATION: Win32 — local_34.lpfnWndProc = G.DAT_006e47dc;
  // DEVIATION: Win32 — G.DAT_006e47d8 = GetClassLongA(local_c,-0x12);
  // DEVIATION: Win32 — local_34.cbWndExtra = G.DAT_006e47d8 + 8;
  // DEVIATION: Win32 — local_34.hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — local_34.hIcon = (HICON)0x0;
  // DEVIATION: Win32 — local_34.hCursor = LoadCursorA((HINSTANCE)0x0,(LPCSTR)0x7f01);
  // DEVIATION: Win32 — local_34.hbrBackground = (HBRUSH)0x0;
  // DEVIATION: Win32 — local_34.lpszMenuName = (LPCSTR)0x0;
  // DEVIATION: Win32 — local_34.lpszClassName = s_MSEditBoxClass_00638324;
  // DEVIATION: Win32 — RegisterClassA(&local_34);
  // DEVIATION: Win32 — G.DAT_00638314 = 1;
  // DEVIATION: Win32 — DestroyWindow(local_c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pvVar8 = (LPVOID)0x0;
  // DEVIATION: Win32 — pHVar6 = (HMENU)0x0;
  // DEVIATION: Win32 — pHVar7 = G.DAT_006e4ff0;
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar1 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar5 = *(HWND *)(iVar1 + 4);
  // DEVIATION: Win32 — iVar1 = thunk_FUN_00407fc0(param_1);
  // DEVIATION: Win32 — iVar2 = thunk_FUN_00407f90(param_1);
  // DEVIATION: Win32 — local_c = CreateWindowExA(4,s_MSEditBoxClass_00638338,&G.DAT_00638334,local_8 | 0x40800000,*param_1,
  // DEVIATION: Win32 — param_1[1],iVar2,iVar1,pHVar5,pHVar6,pHVar7,pvVar8);
  // DEVIATION: Win32 — uVar3 = thunk_FUN_004d8af0();
  // DEVIATION: Win32 — pWVar4 = (WPARAM *)FUN_005dcdf9(uVar3);
  // DEVIATION: Win32 — SendMessageA(local_c,0x30,*pWVar4,0);
  // DEVIATION: Win32 — uVar3 = thunk_FUN_004d8af0();
  // DEVIATION: Win32 — FUN_005dce29(uVar3);
  // DEVIATION: Win32 — SetWindowLongA(local_c,-4,0x5d2a01);
  // DEVIATION: Win32 — SetWindowLongA(local_c,G.DAT_006e47d8,(LONG)G.DAT_006e47dc);
  // DEVIATION: Win32 — SetWindowLongA(local_c,G.DAT_006e47d8 + 4,param_2);
  // DEVIATION: Win32 — return local_c;
}

// Source: decompiled/block_005D0000.c send_msg_2A01 (778 bytes)
// editbox_wndproc — edit box window procedure
export function send_msg_2A01(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — this = (ios *)GetWindowLongA(param_1,10);
  // DEVIATION: Win32 — DVar1 = GetClassLongA(param_1,-0x12);
  // DEVIATION: Win32 — lpPrevWndFunc = (WNDPROC)GetWindowLongA(param_1,DVar1 - 8);
  // DEVIATION: Win32 — uVar2 = local_20 & 0xff;
  // DEVIATION: Win32 — if (uVar2 < 8) {
  // DEVIATION: Win32 — if (uVar2 == 7) {
  // DEVIATION: Win32 — uVar5 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar5);
  // DEVIATION: Win32 — if (this[0x38] == (ios)0x0) {
  // DEVIATION: Win32 — send_msg_2DC6(param_1,0,0xffffffff);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar6 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar6;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (uVar2 == 2) {
  // DEVIATION: Win32 — if (this != (ios *)0x0) {
  // DEVIATION: MFC — ios::delbuf(this,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar6 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar6;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (uVar2 < 0x202) {
  // DEVIATION: Win32 — if (uVar2 == 0x201) {
  // DEVIATION: Win32 — LAB_005d2c05:
  // DEVIATION: Win32 — iVar3 = 0;
  // DEVIATION: Win32 — pHVar4 = GetParent(param_1);
  // DEVIATION: Win32 — GetWindowLongA(pHVar4,iVar3);
  // DEVIATION: Win32 — iVar3 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if ((*(byte *)(iVar3 + 0x49) & 2) != 0) {
  // DEVIATION: Win32 — pHVar4 = GetParent(param_1);
  // DEVIATION: Win32 — SetFocus(pHVar4);
  // DEVIATION: Win32 — pHVar4 = GetParent(param_1);
  // DEVIATION: Win32 — BringWindowToTop(pHVar4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar6 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar6;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (uVar2 == 0x100) {
  // DEVIATION: Win32 — if (((param_3 != 9) && (param_3 != 0xd)) && (param_3 != 0x1b)) {
  // DEVIATION: Win32 — LVar6 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar6;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pHVar4 = GetParent(param_1);
  // DEVIATION: Win32 — SendMessageA(pHVar4,param_2,param_3,param_4);
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (uVar2 == 0x101) {
  // DEVIATION: Win32 — uVar5 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar5);
  // DEVIATION: Win32 — iVar3 = FUN_005eb3ed(param_3);
  // DEVIATION: Win32 — if ((0x2af < iVar3) && (iVar3 < 0x2b5)) {
  // DEVIATION: Win32 — FUN_005d30e0(iVar3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar6 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar6;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (uVar2 == 0x102) {
  // DEVIATION: Win32 — uVar5 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar5);
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — if (param_3 != 9) {
  // DEVIATION: Win32 — uVar5 = FUN_005eb3ed(param_3);
  // DEVIATION: Win32 — local_8 = FUN_005d30e0(uVar5);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_8 == 0) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar6 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar6;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (uVar2 == 0x204) goto LAB_005d2c05;
  // DEVIATION: Win32 — LVar6 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar6;
}

// Source: decompiled/block_005D0000.c FUN_005d2d15 (40 bytes)
// editbox_enable — enable/disable edit box
export function FUN_005d2d15(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d2d3d (16 bytes)
// editbox_noop — empty handler
export function FUN_005d2d3d() {
  // C: return; (truly empty function)
}

// Source: decompiled/block_005D0000.c send_msg_2D4D (50 bytes)
// editbox_get_text — get edit box text
export function send_msg_2D4D(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_2D7F (34 bytes)
// editbox_set_text — set edit box text
export function send_msg_2D7F(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xc,0,param_2);
}

// Source: decompiled/block_005D0000.c send_msg_2DA1 (37 bytes)
// editbox_set_limit — set text length limit
export function send_msg_2DA1(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xc5,param_2,0);
}

// Source: decompiled/block_005D0000.c send_msg_2DC6 (39 bytes)
// editbox_select_all — select all text
export function send_msg_2DC6(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xb1,param_2,param_3);
}

// Source: decompiled/block_005D0000.c send_msg_2DED (68 bytes)
// editbox_get_line — get a line of text
export function send_msg_2DED(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_2E31 (35 bytes)
// editbox_get_line_count — get line count
export function send_msg_2E31(param_1) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xba,0,0);
}

// Source: decompiled/block_005D0000.c send_msg_2E54 (35 bytes)
// editbox_undo — undo last edit
export function send_msg_2E54(param_1) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xce,0,0);
}

// Source: decompiled/block_005D0000.c send_msg_2E77 (37 bytes)
// editbox_get_first_visible — get first visible line
export function send_msg_2E77(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xc9,param_2,0);
}

// Source: decompiled/block_005D0000.c send_msg_2E9C (37 bytes)
// editbox_get_line_index — get line start index
export function send_msg_2E9C(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xbb,param_2,0);
}

// Source: decompiled/block_005D0000.c send_msg_2EC1 (37 bytes)
// editbox_get_line_length — get line length
export function send_msg_2EC1(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xc1,param_2,0);
}

// Source: decompiled/block_005D0000.c send_msg_2EE6 (39 bytes)
// editbox_scroll — scroll edit box
export function send_msg_2EE6(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xb6,param_3,param_2);
}

// Source: decompiled/block_005D0000.c send_msg_2F0D (58 bytes)
// editbox_set_caret — set caret position
export function send_msg_2F0D(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_2F47 (55 bytes)
// editbox_get_selection_end — get selection end position
export function send_msg_2F47(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d2f7e (76 bytes)
// editbox_get_end_of_last_line — compute end of last line
export function FUN_005d2f7e(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d2fca (107 bytes)
// editbox_scroll_to_caret — scroll to caret position
export function FUN_005d2fca(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_3035 (37 bytes)
// editbox_replace_sel — replace selected text
export function send_msg_3035(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0xc2,0,param_2);
}

// Source: decompiled/block_005D0000.c FUN_005d305a (118 bytes)
// editbox_is_at_end — check if caret is at end
export function FUN_005d305a(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// editbox_validate_char — validate character input
export function FUN_005d30e0(param_1) { return 1; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Combo box controls
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c register_wndclass_3130 (480 bytes)
// register_combobox_class — register MSComboBoxClass
export function register_wndclass_3130(param_1, param_2, param_3) {
  // DEVIATION: Win32 — local_34 = 0x40a10003;
  // DEVIATION: Win32 — if (param_3 != 0) {
  // DEVIATION: Win32 — local_34 = 0x50a10003;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (G.DAT_00638348 == 0) {
  // DEVIATION: Win32 — pvVar6 = (LPVOID)0x0;
  // DEVIATION: Win32 — pHVar4 = (HMENU)0x0;
  // DEVIATION: Win32 — pHVar5 = G.DAT_006e4ff0;
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar1 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar3 = *(HWND *)(iVar1 + 4);
  // DEVIATION: Win32 — iVar1 = thunk_FUN_00407fc0(param_1);
  // DEVIATION: Win32 — iVar2 = thunk_FUN_00407f90(param_1);
  // DEVIATION: Win32 — local_8 = CreateWindowExA(4,s_COMBOBOX_00638350,&G.DAT_0063834c,local_34,*param_1,param_1[1],iVar2
  // DEVIATION: Win32 — ,iVar1,pHVar3,pHVar4,pHVar5,pvVar6);
  // DEVIATION: Win32 — G.DAT_006e47ec = (WNDPROC)GetWindowLongA(local_8,-4);
  // DEVIATION: Win32 — local_30.style = 0x88;
  // DEVIATION: Win32 — local_30.cbClsExtra = 0;
  // DEVIATION: Win32 — local_30.lpfnWndProc = G.DAT_006e47ec;
  // DEVIATION: Win32 — G.DAT_006e47e4 = GetClassLongA(local_8,-0x12);
  // DEVIATION: Win32 — local_30.cbWndExtra = G.DAT_006e47e4 + 8;
  // DEVIATION: Win32 — local_30.hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — local_30.hIcon = (HICON)0x0;
  // DEVIATION: Win32 — local_30.hCursor = LoadCursorA((HINSTANCE)0x0,(LPCSTR)0x7f00);
  // DEVIATION: Win32 — local_30.hbrBackground = (HBRUSH)0x0;
  // DEVIATION: Win32 — local_30.lpszMenuName = (LPCSTR)0x0;
  // DEVIATION: Win32 — local_30.lpszClassName = s_MSComboBoxClass_0063835c;
  // DEVIATION: Win32 — RegisterClassA(&local_30);
  // DEVIATION: Win32 — G.DAT_00638348 = 1;
  // DEVIATION: Win32 — DestroyWindow(local_8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_34 = 0x40a10203;
  // DEVIATION: Win32 — if (param_3 != 0) {
  // DEVIATION: Win32 — local_34 = 0x50a10203;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pvVar6 = (LPVOID)0x0;
  // DEVIATION: Win32 — pHVar4 = (HMENU)0x0;
  // DEVIATION: Win32 — pHVar5 = G.DAT_006e4ff0;
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar1 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar3 = *(HWND *)(iVar1 + 4);
  // DEVIATION: Win32 — iVar1 = thunk_FUN_00407fc0(param_1);
  // DEVIATION: Win32 — iVar2 = thunk_FUN_00407f90(param_1);
  // DEVIATION: Win32 — local_8 = CreateWindowExA(4,s_MSComboBoxClass_00638370,&G.DAT_0063836c,local_34,*param_1,param_1[1],
  // DEVIATION: Win32 — iVar2,iVar1,pHVar3,pHVar4,pHVar5,pvVar6);
  // DEVIATION: Win32 — SetWindowLongA(local_8,-4,0x5d3310);
  // DEVIATION: Win32 — SetWindowLongA(local_8,G.DAT_006e47e4,(LONG)G.DAT_006e47ec);
  // DEVIATION: Win32 — SetWindowLongA(local_8,G.DAT_006e47e4 + 4,param_2);
  // DEVIATION: Win32 — return local_8;
}

// Source: decompiled/block_005D0000.c send_msg_3310 (591 bytes)
// combobox_wndproc — combo box window procedure
export function send_msg_3310(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — DVar1 = GetClassLongA(param_1,-0x12);
  // DEVIATION: Win32 — lpPrevWndFunc = (WNDPROC)GetWindowLongA(param_1,DVar1 - 8);
  // DEVIATION: Win32 — this = (ios *)GetWindowLongA(param_1,DVar1 - 4);
  // DEVIATION: Win32 — if (this == (ios *)0x0) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar2 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar2);
  // DEVIATION: Win32 — if (param_2 < 0x103) {
  // DEVIATION: Win32 — if (0xff < param_2) {
  // DEVIATION: Win32 — if (((param_3 != 9) && (param_3 != 0xd)) && (param_3 != 0x1b)) {
  // DEVIATION: Win32 — LVar4 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pHVar3 = GetParent(param_1);
  // DEVIATION: Win32 — SendMessageA(pHVar3,param_2,param_3,param_4);
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_2 == 2) {
  // DEVIATION: Win32 — if (this != (ios *)0x0) {
  // DEVIATION: MFC — ios::delbuf(this,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar4 = CallWindowProcA(lpPrevWndFunc,param_1,2,param_3,param_4);
  // DEVIATION: Win32 — return LVar4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if ((param_2 == 0x201) || (param_2 == 0x204)) {
  // DEVIATION: Win32 — iVar5 = 0;
  // DEVIATION: Win32 — pHVar3 = GetParent(param_1);
  // DEVIATION: Win32 — GetWindowLongA(pHVar3,iVar5);
  // DEVIATION: Win32 — iVar5 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if ((*(byte *)(iVar5 + 0x49) & 2) != 0) {
  // DEVIATION: Win32 — pHVar3 = GetParent(param_1);
  // DEVIATION: Win32 — SetFocus(pHVar3);
  // DEVIATION: Win32 — pHVar3 = GetParent(param_1);
  // DEVIATION: Win32 — BringWindowToTop(pHVar3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar4 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_2 == 0x4c8) {
  // DEVIATION: Win32 — if (param_3 >> 0x10 == 1) {
  // DEVIATION: Win32 — if (this == (ios *)0x0) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005d3760();
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_3 >> 0x10 != 2) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005d3720();
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar4 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar4;
}

// Source: decompiled/block_005D0000.c FUN_005d356e (16 bytes)
// combobox_noop
export function FUN_005d356e() {
  // C: return; (truly empty function)
}

// Source: decompiled/block_005D0000.c send_msg_357E (37 bytes)
// combobox_add_string — add string to combo box
export function send_msg_357E(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x143,0,param_2);
}

// Source: decompiled/block_005D0000.c send_msg_35A3 (37 bytes)
// combobox_set_selection — set selected item
export function send_msg_35A3(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x144,param_2,0);
}

// Source: decompiled/block_005D0000.c send_msg_35C8 (66 bytes)
// combobox_set_font — set combo box font
export function send_msg_35C8(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_360A (35 bytes)
// combobox_reset — clear combo box
export function send_msg_360A(param_1) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x14b,0,0);
}

// Source: decompiled/block_005D0000.c send_msg_362D (39 bytes)
// combobox_get_item_data — get item data
export function send_msg_362D(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x148,param_2,param_3);
}

// Source: decompiled/block_005D0000.c send_msg_3654 (93 bytes)
// combobox_get_selected_text — get selected text
export function send_msg_3654(param_1, param_2) {
  // DEVIATION: Win32 — LVar1 = SendMessageA(param_1,0x147,0,0);
  // DEVIATION: Win32 — if (LVar1 == -1) {
  // DEVIATION: Win32 — FUN_005f22d0(param_2,&G.DAT_00638380);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — send_msg_362D(param_1,LVar1,param_2);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c send_msg_36B1 (64 bytes)
// combobox_get_selection — get selection index
export function send_msg_36B1(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_36F6 (37 bytes)
// combobox_set_item_height — set item height
export function send_msg_36F6(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x14e,param_2,0);
}

// Source: decompiled/block_005D0000.c FUN_005d3720 (51 bytes)
// combobox_on_dblclick — handle double click
export function FUN_005d3720() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d3760 (51 bytes)
// combobox_on_selchange — handle selection change
export function FUN_005d3760() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: List box controls
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c register_wndclass_37A0 (578 bytes)
// register_listbox_class — register MSListBoxClass
export function register_wndclass_37A0(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — local_38 = 0;
  // DEVIATION: Win32 — if (param_4 == 1) {
  // DEVIATION: Win32 — local_38 = 0x800;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = local_38 | 0x40a10000;
  // DEVIATION: Win32 — if (param_3 != 0) {
  // DEVIATION: Win32 — uVar1 = local_38 | 0x50a10000;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_38 = uVar1;
  // DEVIATION: Win32 — if (G.DAT_00638384 == 0) {
  // DEVIATION: Win32 — pvVar9 = (LPVOID)0x0;
  // DEVIATION: Win32 — pHVar7 = (HMENU)0x0;
  // DEVIATION: Win32 — pHVar8 = G.DAT_006e4ff0;
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar2 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar6 = *(HWND *)(iVar2 + 4);
  // DEVIATION: Win32 — iVar2 = thunk_FUN_00407fc0(param_1);
  // DEVIATION: Win32 — iVar3 = thunk_FUN_00407f90(param_1);
  // DEVIATION: Win32 — local_8 = CreateWindowExA(4,s_LISTBOX_0063838c,&G.DAT_00638388,local_38,*param_1,param_1[1],iVar3,
  // DEVIATION: Win32 — iVar2,pHVar6,pHVar7,pHVar8,pvVar9);
  // DEVIATION: Win32 — G.DAT_006e47f0 = (WNDPROC)GetWindowLongA(local_8,-4);
  // DEVIATION: Win32 — local_30.style = 0x88;
  // DEVIATION: Win32 — local_30.cbClsExtra = 0;
  // DEVIATION: Win32 — local_30.lpfnWndProc = G.DAT_006e47f0;
  // DEVIATION: Win32 — G.DAT_006e47f4 = GetClassLongA(local_8,-0x12);
  // DEVIATION: Win32 — local_30.cbWndExtra = G.DAT_006e47f4 + 8;
  // DEVIATION: Win32 — local_30.hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — local_30.hIcon = (HICON)0x0;
  // DEVIATION: Win32 — local_30.hCursor = LoadCursorA((HINSTANCE)0x0,(LPCSTR)0x7f00);
  // DEVIATION: Win32 — local_30.hbrBackground = (HBRUSH)0x0;
  // DEVIATION: Win32 — local_30.lpszMenuName = (LPCSTR)0x0;
  // DEVIATION: Win32 — local_30.lpszClassName = s_MSListBoxClass_00638394;
  // DEVIATION: Win32 — RegisterClassA(&local_30);
  // DEVIATION: Win32 — G.DAT_00638384 = 1;
  // DEVIATION: Win32 — DestroyWindow(local_8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_38 = 0x40a10001;
  // DEVIATION: Win32 — if (param_3 != 0) {
  // DEVIATION: Win32 — local_38 = 0x50a10001;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_4 == 1) {
  // DEVIATION: Win32 — local_38 = local_38 | 0x800;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pvVar9 = (LPVOID)0x0;
  // DEVIATION: Win32 — pHVar7 = (HMENU)0x0;
  // DEVIATION: Win32 — pHVar8 = G.DAT_006e4ff0;
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar2 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar6 = *(HWND *)(iVar2 + 4);
  // DEVIATION: Win32 — iVar2 = thunk_FUN_00407fc0(param_1);
  // DEVIATION: Win32 — iVar3 = thunk_FUN_00407f90(param_1);
  // DEVIATION: Win32 — local_8 = CreateWindowExA(4,s_MSListBoxClass_006383a8,&G.DAT_006383a4,local_38,*param_1,param_1[1],
  // DEVIATION: Win32 — iVar3,iVar2,pHVar6,pHVar7,pHVar8,pvVar9);
  // DEVIATION: Win32 — uVar4 = thunk_FUN_004d8af0();
  // DEVIATION: Win32 — pWVar5 = (WPARAM *)FUN_005dcdf9(uVar4);
  // DEVIATION: Win32 — SendMessageA(local_8,0x30,*pWVar5,0);
  // DEVIATION: Win32 — uVar4 = thunk_FUN_004d8af0();
  // DEVIATION: Win32 — FUN_005dce29(uVar4);
  // DEVIATION: Win32 — SetWindowLongA(local_8,-4,0x5d39e2);
  // DEVIATION: Win32 — SetWindowLongA(local_8,G.DAT_006e47f4,(LONG)G.DAT_006e47f0);
  // DEVIATION: Win32 — SetWindowLongA(local_8,G.DAT_006e47f4 + 4,param_2);
  // DEVIATION: Win32 — return local_8;
}

// Source: decompiled/block_005D0000.c send_msg_39E2 (591 bytes)
// listbox_wndproc — list box window procedure
export function send_msg_39E2(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — DVar1 = GetClassLongA(param_1,-0x12);
  // DEVIATION: Win32 — lpPrevWndFunc = (WNDPROC)GetWindowLongA(param_1,DVar1 - 8);
  // DEVIATION: Win32 — this = (ios *)GetWindowLongA(param_1,DVar1 - 4);
  // DEVIATION: Win32 — if (this == (ios *)0x0) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar2 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar2);
  // DEVIATION: Win32 — if (param_2 < 0x103) {
  // DEVIATION: Win32 — if (0xff < param_2) {
  // DEVIATION: Win32 — if (((param_3 != 9) && (param_3 != 0xd)) && (param_3 != 0x1b)) {
  // DEVIATION: Win32 — LVar4 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pHVar3 = GetParent(param_1);
  // DEVIATION: Win32 — SendMessageA(pHVar3,param_2,param_3,param_4);
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_2 == 2) {
  // DEVIATION: Win32 — if (this != (ios *)0x0) {
  // DEVIATION: MFC — ios::delbuf(this,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar4 = CallWindowProcA(lpPrevWndFunc,param_1,2,param_3,param_4);
  // DEVIATION: Win32 — return LVar4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if ((param_2 == 0x201) || (param_2 == 0x204)) {
  // DEVIATION: Win32 — iVar5 = 0;
  // DEVIATION: Win32 — pHVar3 = GetParent(param_1);
  // DEVIATION: Win32 — GetWindowLongA(pHVar3,iVar5);
  // DEVIATION: Win32 — iVar5 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if ((*(byte *)(iVar5 + 0x49) & 2) != 0) {
  // DEVIATION: Win32 — pHVar3 = GetParent(param_1);
  // DEVIATION: Win32 — SetFocus(pHVar3);
  // DEVIATION: Win32 — pHVar3 = GetParent(param_1);
  // DEVIATION: Win32 — BringWindowToTop(pHVar3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar4 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_2 == 0x4c8) {
  // DEVIATION: Win32 — if (param_3 >> 0x10 == 1) {
  // DEVIATION: Win32 — if (this == (ios *)0x0) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005d3f70();
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_3 >> 0x10 != 2) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005d3f30();
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar4 = CallWindowProcA(lpPrevWndFunc,param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar4;
}

// Source: decompiled/block_005D0000.c FUN_005d3c40 (16 bytes)
// listbox_noop
export function FUN_005d3c40() {
  // C: return; (truly empty function)
}

// Source: decompiled/block_005D0000.c send_msg_3C50 (37 bytes)
// listbox_add_string — add string to list box
export function send_msg_3C50(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x180,0,param_2);
}

// Source: decompiled/block_005D0000.c send_msg_3C75 (37 bytes)
// listbox_set_selection — set selected item
export function send_msg_3C75(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x182,param_2,0);
}

// Source: decompiled/block_005D0000.c send_msg_3C9A (66 bytes)
// listbox_set_font — set list box font
export function send_msg_3C9A(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_3CDC (35 bytes)
// listbox_reset — clear list box
export function send_msg_3CDC(param_1) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x184,0,0);
}

// Source: decompiled/block_005D0000.c send_msg_3CFF (39 bytes)
// listbox_get_item_data — get item data at index
export function send_msg_3CFF(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x189,param_2,param_3);
}

// Source: decompiled/block_005D0000.c send_msg_3D26 (60 bytes)
// listbox_insert_string — insert string at position
export function send_msg_3D26(param_1, param_2, param_3) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_3D62 (93 bytes)
// listbox_get_selected_text — get selected text
export function send_msg_3D62(param_1, param_2) {
  // DEVIATION: Win32 — LVar1 = SendMessageA(param_1,0x188,0,0);
  // DEVIATION: Win32 — if (LVar1 == -1) {
  // DEVIATION: Win32 — FUN_005f22d0(param_2,&G.DAT_006383b8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — send_msg_3CFF(param_1,LVar1,param_2);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c send_msg_3DBF (64 bytes)
// listbox_get_selection — get selection index
export function send_msg_3DBF(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_3E04 (64 bytes)
// listbox_get_top_index — get top visible index
export function send_msg_3E04(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_3E49 (68 bytes)
// listbox_find_string — find string in list
export function send_msg_3E49(param_1, param_2, param_3) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c send_msg_3E92 (37 bytes)
// listbox_delete_string — delete string at index
export function send_msg_3E92(param_1, param_2) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x186,param_2,0);
}

// Source: decompiled/block_005D0000.c send_msg_3EB7 (39 bytes)
// listbox_set_item_data — set item data at index
export function send_msg_3EB7(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x183,param_2,param_3);
}

// Source: decompiled/block_005D0000.c send_msg_3EDE (39 bytes)
// listbox_set_item_data_swap — set item data (swapped params)
export function send_msg_3EDE(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x183,param_3,param_2);
}

// Source: decompiled/block_005D0000.c send_msg_3F05 (40 bytes)
// listbox_set_item_check — set checkbox state
export function send_msg_3F05(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SendMessageA(param_1,0x185,(int)param_3,param_2);
}

// Source: decompiled/block_005D0000.c FUN_005d3f30 (51 bytes)
// listbox_on_dblclick — handle double click
export function FUN_005d3f30() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d3f70 (51 bytes)
// listbox_on_selchange — handle selection change
export function FUN_005d3f70() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Window/control management
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005d3fb0 (100 bytes)
// control_has_window — check if control has HWND
export function FUN_005d3fb0(param_1) {
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — while( true ) {
  // DEVIATION: Win32 — if (*(int *)(in_ECX + 0x38) <= local_8) {
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(int *)(*(int *)(in_ECX + 0x48) + local_8 * 0xa4) == param_1) break;
  // DEVIATION: Win32 — local_8 = local_8 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 1;
}

// Source: decompiled/block_005D0000.c FUN_005d4014 (115 bytes)
// control_invalidate_all — invalidate all controls
export function FUN_005d4014() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d4087 (86 bytes)
// control_show_all — show all controls
export function FUN_005d4087() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d40dd (69 bytes)
// control_hide_all — hide all controls
export function FUN_005d40dd() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d4122 (69 bytes)
// control_layout_all — layout all controls
export function FUN_005d4122() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

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

// Source: decompiled/block_005D0000.c FUN_005d4204 (56 bytes)
// delay_ticks — busy-wait for N ticks
export function FUN_005d4204(param_1) {
  // DEVIATION: Win32 — iVar1 = FUN_005d41e0();
  // DEVIATION: Win32 — while( true ) {
  // DEVIATION: Win32 — iVar2 = FUN_005d41e0();
  // DEVIATION: Win32 — if (iVar1 + param_1 <= iVar2) break;
  // DEVIATION: Win32 — thunk_FUN_00407ff0();
  // DEVIATION: Win32 — }
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Timer window and timer management
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c create_window_423C (571 bytes)
// create_timer_window — create MrTimer hidden window
export function create_window_423C(param_1) {
  // DEVIATION: Win32 — local_8 = (HWND)0x0;
  // DEVIATION: Win32 — G.DAT_006e4804 = LoadLibraryA(s_timerdll_dll_006383c0);
  // DEVIATION: Win32 — if (G.DAT_006e4804 == (HMODULE)0x0) {
  // DEVIATION: Win32 — local_8 = CreateWindowExA(0,s_MSMrTimerClass_006384a4,s_MrTimer_0063849c,0xcf0000,-0x80000000,
  // DEVIATION: Win32 — -0x80000000,-0x80000000,-0x80000000,(HWND)0x0,(HMENU)0x0,G.DAT_006e4ff0,
  // DEVIATION: Win32 — (LPVOID)0x0);
  // DEVIATION: Win32 — if (local_8 != (HWND)0x0) {
  // DEVIATION: Win32 — SetWindowLongA(local_8,0,param_1);
  // DEVIATION: Win32 — G.DAT_006383bc = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — G.DAT_006e4808 = GetProcAddress(G.DAT_006e4804,s_TimerCallBack_006383d0);
  // DEVIATION: Win32 — G.DAT_006e4810 = GetProcAddress(G.DAT_006e4804,s_SetTimerID_006383e0);
  // DEVIATION: Win32 — G.DAT_006e47fc = GetProcAddress(G.DAT_006e4804,s_GetTimerID_006383ec);
  // DEVIATION: Win32 — G.DAT_006e4800 = GetProcAddress(G.DAT_006e4804,s_GetTimerIndex_006383f8);
  // DEVIATION: Win32 — G.DAT_006e480c = GetProcAddress(G.DAT_006e4804,s_ResetTimerNotified_00638408);
  // DEVIATION: Win32 — if ((((G.DAT_006e4808 == (FARPROC)0x0) || (G.DAT_006e4810 == (FARPROC)0x0)) ||
  // DEVIATION: Win32 — (G.DAT_006e47fc == (FARPROC)0x0)) ||
  // DEVIATION: Win32 — ((G.DAT_006e4800 == (FARPROC)0x0 || (G.DAT_006e480c == (FARPROC)0x0)))) {
  // DEVIATION: Win32 — FUN_005dae6b(9,s_ERR_DYNAMICLINKFAILED_00638438,s_D__Ss_Smeds32_Pctimer_cpp_0063841c,0x55);
  // DEVIATION: Win32 — FreeLibrary(G.DAT_006e4804);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = CreateWindowExA(0,s_MSMrTimerClass_00638458,s_MrTimer_00638450,0xcf0000,-0x80000000,
  // DEVIATION: Win32 — -0x80000000,-0x80000000,-0x80000000,(HWND)0x0,(HMENU)0x0,
  // DEVIATION: Win32 — G.DAT_006e4ff0,(LPVOID)0x0);
  // DEVIATION: Win32 — if (local_8 == (HWND)0x0) {
  // DEVIATION: Win32 — FUN_005dae6b(10,s_ERR_CANTCREATEWINDOW_00638484,s_D__Ss_Smeds32_Pctimer_cpp_00638468,0x71);
  // DEVIATION: Win32 — FreeLibrary(G.DAT_006e4804);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — timeBeginPeriod(5);
  // DEVIATION: Win32 — SetWindowLongA(local_8,0,param_1);
  // DEVIATION: Win32 — uTimerID = timeSetEvent(100,5,G.DAT_006e4808,(DWORD_PTR)local_8,1);
  // DEVIATION: Win32 — if (uTimerID == 0) {
  // DEVIATION: Win32 — G.DAT_006383bc = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — timeKillEvent(uTimerID);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_8;
}

// Source: decompiled/block_005D0000.c manage_window_447C (66 bytes)
// destroy_timer_window — destroy timer window
export function manage_window_447C(param_1) {
  // DEVIATION: Win32 — if (param_1 != (HWND)0x0) {
  // DEVIATION: Win32 — timeEndPeriod(5);
  // DEVIATION: Win32 — DestroyWindow(param_1);
  // DEVIATION: Win32 — G.DAT_006e4808 = 0;
  // DEVIATION: Win32 — FreeLibrary(G.DAT_006e4804);
  // DEVIATION: Win32 — }
}

// timer_set_event — set a timer event
export function FUN_005d44be(param_1, param_2, param_3) { return 1; }

// Source: decompiled/block_005D0000.c FUN_005d4664 (156 bytes)
// timer_kill_event — kill a timer event
export function FUN_005d4664(param_1, param_2) {
  // DEVIATION: Win32 — UINT UVar1;
  // DEVIATION: Win32 — if (G.DAT_006383bc == 0) {
  // DEVIATION: Win32 — if (G.DAT_00637ef8 == 0) {
  // DEVIATION: Win32 — KillTimer(param_1,param_2);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — UVar1 = (*G.DAT_006e47fc)(param_2);
  // DEVIATION: Win32 — timeKillEvent(UVar1);
  // DEVIATION: Win32 — (*G.DAT_006e4810)(param_2,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (G.DAT_00637ef8 == 0) {
  // DEVIATION: Win32 — UVar1 = (*G.DAT_006e47fc)(param_2);
  // DEVIATION: Win32 — timeKillEvent(UVar1);
  // DEVIATION: Win32 — (*G.DAT_006e4810)(param_2,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — KillTimer(param_1,param_2);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005d4700 (188 bytes)
// timer_wndproc — timer window procedure
export function FUN_005d4700(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — LVar1 = GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — if (LVar1 == 0) {
  // DEVIATION: Win32 — LVar2 = DefWindowProcA(param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (param_2 == 0x113) {
  // DEVIATION: Win32 — FUN_005d47d0(param_3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (param_2 != 0x52c) {
  // DEVIATION: Win32 — LVar2 = DefWindowProcA(param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005d47d0(param_3);
  // DEVIATION: Win32 — (*G.DAT_006e480c)(param_3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return LVar2;
}

// Source: decompiled/block_005D0000.c FUN_005d47d0 (142 bytes)
// timer_dispatch — dispatch timer callback
export function FUN_005d47d0(param_1) {
  // DEVIATION: Win32 — if ((*(int *)(in_ECX + 4 + param_1 * 4) != 0) && (*(int *)(in_ECX + 0x48 + param_1 * 4) != 0)) {
  // DEVIATION: Win32 — if (0 < *(int *)(in_ECX + 0x48 + param_1 * 4)) {
  // DEVIATION: Win32 — piVar1 = (int *)(in_ECX + 0x48 + param_1 * 4);
  // DEVIATION: Win32 — *piVar1 = *piVar1 + -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — (**(code **)(in_ECX + 4 + param_1 * 4))(param_1,*(undefined4 *)(in_ECX + 0x48 + param_1 * 4));
  // DEVIATION: Win32 — if (*(int *)(in_ECX + 0x48 + param_1 * 4) == 0) {
  // DEVIATION: Win32 — FUN_005d20e6(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Sound / Wave output
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005d4870 (41 bytes)
// sound_play_file — play a sound file
export function FUN_005d4870(param_1, param_2, param_3) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d4899 (55 bytes)
// sound_init_and_play — init sound system and play
export function FUN_005d4899(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d48d0 (21 bytes)
// sound_shutdown — shutdown sound system
export function FUN_005d48d0() {
  // DEVIATION: Win32 — FUN_005d4965();
}

// Source: decompiled/block_005D0000.c FUN_005d48f0 (117 bytes)
// sound_open_device — open wave output device
export function FUN_005d48f0(param_1, param_2, param_3) {
  // DEVIATION: Win32 — G.DAT_0063857c = param_1;
  // DEVIATION: Win32 — G.DAT_00638580 = param_2;
  // DEVIATION: Win32 — G.DAT_00638584 = param_3;
  // DEVIATION: Win32 — G.DAT_00638588 = param_3;
  // DEVIATION: Win32 — iVar1 = FUN_005d4a11(param_1,0,&G.DAT_00638578);
  // DEVIATION: Win32 — if (iVar1 == 0) {
  // DEVIATION: Win32 — FUN_005d645e(param_2,G.DAT_00638578,param_3);
  // DEVIATION: Win32 — iVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return iVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d4965 (62 bytes)
// sound_cleanup — cleanup sound resources
export function FUN_005d4965() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c show_messagebox_49A3 (105 bytes)
// sound_show_error — show sound error message
export function show_messagebox_49A3(param_1) {
  // DEVIATION: Win32 — if (param_1 == 10) {
  // DEVIATION: Win32 — MessageBoxA((HWND)0x0,s_This_Sound_format_is_not_support_006385e4,s_Sound_Error_006385d8,0x40);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (param_1 != 0xb) {
  // DEVIATION: Win32 — MessageBoxA((HWND)0x0,s_Undefined_Sound_Error_00638614,s_Sound_Error_00638608,0x40);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005d4a11 (437 bytes)
// sound_open_wave_device — open specific wave device
export function FUN_005d4a11(param_1, param_2, param_3) {
  // DEVIATION: Win32 — UINT UVar2;
  // DEVIATION: Win32 — UINT local_14;
  // DEVIATION: Win32 — UINT_PTR local_10;
  // DEVIATION: Win32 — uint local_8;
  // DEVIATION: Win32 — bVar1 = false;
  // DEVIATION: Win32 — if (G.DAT_006385b0 == 0) {
  // DEVIATION: Win32 — if (param_2 != (undefined4 *)0x0) {
  // DEVIATION: Win32 — G.DAT_006385a0 = *param_2;
  // DEVIATION: Win32 — G.DAT_006385a4 = param_2[1];
  // DEVIATION: Win32 — G.DAT_006385a8 = param_2[2];
  // DEVIATION: Win32 — G.DAT_006385ac = param_2[3];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — UVar2 = waveOutGetNumDevs();
  // DEVIATION: Win32 — for (local_10 = 0; (int)local_10 < (int)UVar2; local_10 = local_10 + 1) {
  // DEVIATION: Win32 — waveOutGetDevCapsA(local_10,(LPWAVEOUTCAPSA)&G.DAT_006e4818,0x34);
  // DEVIATION: Win32 — if ((G.DAT_006e4840 & 0x20) != 0) {
  // DEVIATION: Win32 — bVar1 = false;
  // DEVIATION: Win32 — local_14 = local_10;
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((G.DAT_006e4840 & 0x10) != 0) {
  // DEVIATION: Win32 — local_14 = local_10;
  // DEVIATION: Win32 — bVar1 = true;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((bVar1) || (local_10 != UVar2)) {
  // DEVIATION: Win32 — if (bVar1) {
  // DEVIATION: Win32 — G.DAT_006385a0 = CONCAT22(1,(undefined2)G.DAT_006385a0);
  // DEVIATION: Win32 — G.DAT_006385a8 = 0x5622;
  // DEVIATION: Win32 — G.DAT_006385ac = CONCAT22(G.DAT_006385ac._2_2_,1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = waveOutOpen((LPHWAVEOUT)&G.DAT_00638578,local_14,(LPCWAVEFORMATEX)&G.DAT_006385a0,
  // DEVIATION: Win32 — param_1,0,0x10000);
  // DEVIATION: Win32 — if ((short)local_8 != 0) {
  // DEVIATION: Win32 — sndPlaySoundA((LPCSTR)0x0,0);
  // DEVIATION: Win32 — local_8 = waveOutOpen((LPHWAVEOUT)&G.DAT_00638578,local_14,(LPCWAVEFORMATEX)&G.DAT_006385a0,
  // DEVIATION: Win32 — param_1,0,0x10000);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = local_8 & 0xffff;
  // DEVIATION: Win32 — if ((local_8 == 0) && (G.DAT_006385b0 = 1, param_3 != (undefined4 *)0x0)) {
  // DEVIATION: Win32 — *param_3 = G.DAT_00638578;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — show_messagebox_49A3(0xb);
  // DEVIATION: Win32 — local_8 = 0xb;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_8;
}

// Source: decompiled/block_005D0000.c FUN_005d4bcb (77 bytes)
// sound_close_wave — close wave output
export function FUN_005d4bcb(param_1) {
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — if (G.DAT_006385b0 != 0) {
  // DEVIATION: Win32 — MVar1 = waveOutClose(param_1);
  // DEVIATION: Win32 — local_8 = MVar1 & 0xffff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_006385b0 = 0;
  // DEVIATION: Win32 — return local_8;
}

// Source: decompiled/block_005D0000.c show_messagebox_4C18 (71 bytes)
// sound_show_wave_error — show wave error text
export function show_messagebox_4C18(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d4c5f (779 bytes)
// sound_load_wav_file — load WAV from file
export function FUN_005d4c5f(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — _MMIOINFO *p_Var5;
  // DEVIATION: Win32 — _MMCKINFO *p_Var6;
  // DEVIATION: Win32 — DWORD *pDVar7;
  // DEVIATION: Win32 — FOURCC *pFVar8;
  // DEVIATION: Win32 — _MMCKINFO local_98;
  // DEVIATION: Win32 — _MMIOINFO local_84;
  // DEVIATION: Win32 — FOURCC *local_3c;
  // DEVIATION: Win32 — DWORD local_38;
  // DEVIATION: Win32 — FOURCC *local_34;
  // DEVIATION: Win32 — HGLOBAL local_30;
  // DEVIATION: Win32 — FOURCC local_2c;
  // DEVIATION: Win32 — FOURCC local_28;
  // DEVIATION: Win32 — FOURCC local_24;
  // DEVIATION: Win32 — undefined4 local_20;
  // DEVIATION: Win32 — _MMCKINFO local_1c;
  // DEVIATION: Win32 — HMMIO local_8;
  // DEVIATION: Win32 — _memset(&local_84,0,0x48);
  // DEVIATION: Win32 — local_84.cchBuffer = G.DAT_006385cc;
  // DEVIATION: Win32 — local_8 = mmioOpenA(param_1,&local_84,0x10000);
  // DEVIATION: Win32 — if (local_8 == (HMMIO)0x0) {
  // DEVIATION: Win32 — uVar1 = 7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_1c.fccType = 0x45564157;
  // DEVIATION: Win32 — MVar2 = mmioDescend(local_8,&local_1c,(MMCKINFO *)0x0,0x20);
  // DEVIATION: Win32 — if (MVar2 == 0) {
  // DEVIATION: Win32 — local_98.ckid = 0x20746d66;
  // DEVIATION: Win32 — MVar2 = mmioDescend(local_8,&local_98,&local_1c,0x10);
  // DEVIATION: Win32 — if (MVar2 == 0) {
  // DEVIATION: Win32 — local_38 = local_98.cksize;
  // DEVIATION: Win32 — DVar3 = mmioRead(local_8,(HPSTR)&local_2c,local_98.cksize);
  // DEVIATION: Win32 — if (DVar3 == local_38) {
  // DEVIATION: Win32 — if ((local_28 == 0x5622) && (local_20._2_2_ == 8)) {
  // DEVIATION: Win32 — mmioAscend(local_8,&local_98,0);
  // DEVIATION: Win32 — local_98.ckid = 0x61746164;
  // DEVIATION: Win32 — MVar2 = mmioDescend(local_8,&local_98,&local_1c,0x10);
  // DEVIATION: Win32 — if (MVar2 == 0) {
  // DEVIATION: Win32 — mmioGetInfo(local_8,&local_84,0);
  // DEVIATION: Win32 — mmioAdvance(local_8,&local_84,0);
  // DEVIATION: Win32 — local_30 = GlobalAlloc(0x2002,0xbc);
  // DEVIATION: Win32 — if (local_30 == (HGLOBAL)0x0) {
  // DEVIATION: Win32 — mmioClose(local_8,0);
  // DEVIATION: Win32 — uVar1 = 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_34 = GlobalLock(local_30);
  // DEVIATION: Win32 — if (local_34 == (FOURCC *)0x0) {
  // DEVIATION: Win32 — mmioClose(local_8,0);
  // DEVIATION: Win32 — GlobalFree(local_30);
  // DEVIATION: Win32 — uVar1 = 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — _memset(local_34,0,0xbc);
  // DEVIATION: Win32 — local_34[0x1b] = (FOURCC)local_30;
  // DEVIATION: Win32 — *local_34 = (FOURCC)local_8;
  // DEVIATION: Win32 — p_Var5 = &local_84;
  // DEVIATION: Win32 — pDVar7 = local_34 + 6;
  // DEVIATION: Win32 — for (iVar4 = 0x12; iVar4 != 0; iVar4 = iVar4 + -1) {
  // DEVIATION: Win32 — *pDVar7 = p_Var5->dwFlags;
  // DEVIATION: Win32 — p_Var5 = (_MMIOINFO *)&p_Var5->fccIOProc;
  // DEVIATION: Win32 — pDVar7 = pDVar7 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — p_Var6 = &local_98;
  // DEVIATION: Win32 — pFVar8 = local_34;
  // DEVIATION: Win32 — for (iVar4 = 5; pFVar8 = pFVar8 + 1, iVar4 != 0; iVar4 = iVar4 + -1) {
  // DEVIATION: Win32 — *pFVar8 = p_Var6->ckid;
  // DEVIATION: Win32 — p_Var6 = (_MMCKINFO *)&p_Var6->cksize;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(undefined2 *)((int)local_34 + 0x8a) = param_3;
  // DEVIATION: Win32 — local_34[0x1d] = local_2c;
  // DEVIATION: Win32 — local_34[0x1e] = local_28;
  // DEVIATION: Win32 — local_34[0x1f] = local_24;
  // DEVIATION: Win32 — local_34[0x20] = local_20;
  // DEVIATION: Win32 — *(undefined2 *)(local_34 + 0x22) = 1;
  // DEVIATION: Win32 — local_34[0x2d] = param_4;
  // DEVIATION: Win32 — if (G.DAT_006385d0 == (FOURCC *)0x0) {
  // DEVIATION: Win32 — G.DAT_006385d0 = local_34;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — for (local_3c = G.DAT_006385d0; local_3c[0x2e] != 0;
  // DEVIATION: Win32 — local_3c = (FOURCC *)local_3c[0x2e]) {
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_3c[0x2e] = (FOURCC)local_34;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioClose(local_8,0);
  // DEVIATION: Win32 — uVar1 = 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — show_messagebox_49A3(10);
  // DEVIATION: Win32 — mmioClose(local_8,0);
  // DEVIATION: Win32 — uVar1 = 10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioClose(local_8,0);
  // DEVIATION: Win32 — uVar1 = 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioClose(local_8,0);
  // DEVIATION: Win32 — uVar1 = 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioClose(local_8,0);
  // DEVIATION: Win32 — uVar1 = 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d4f6a (824 bytes)
// sound_load_wav_memory — load WAV into memory
export function FUN_005d4f6a(param_1, param_2, param_3) {
  // DEVIATION: Win32 — _MMIOINFO *p_Var5;
  // DEVIATION: Win32 — _MMCKINFO *p_Var6;
  // DEVIATION: Win32 — DWORD *pDVar7;
  // DEVIATION: Win32 — FOURCC *pFVar8;
  // DEVIATION: Win32 — _MMCKINFO local_9c;
  // DEVIATION: Win32 — _MMIOINFO local_88;
  // DEVIATION: Win32 — FOURCC *local_40;
  // DEVIATION: Win32 — DWORD local_3c;
  // DEVIATION: Win32 — FOURCC *local_38;
  // DEVIATION: Win32 — HGLOBAL local_34;
  // DEVIATION: Win32 — FOURCC local_30;
  // DEVIATION: Win32 — FOURCC local_2c;
  // DEVIATION: Win32 — FOURCC local_28;
  // DEVIATION: Win32 — undefined4 local_24;
  // DEVIATION: Win32 — _MMCKINFO local_20;
  // DEVIATION: Win32 — HMMIO local_c;
  // DEVIATION: Win32 — HMMIO local_8;
  // DEVIATION: Win32 — local_c = mmioOpenA(param_1,(LPMMIOINFO)0x0,0);
  // DEVIATION: Win32 — if (local_c == (HMMIO)0x0) {
  // DEVIATION: Win32 — uVar1 = 7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_20.fccType = 0x45564157;
  // DEVIATION: Win32 — MVar2 = mmioDescend(local_c,&local_20,(MMCKINFO *)0x0,0x20);
  // DEVIATION: Win32 — if (MVar2 == 0) {
  // DEVIATION: Win32 — local_9c.ckid = 0x20746d66;
  // DEVIATION: Win32 — MVar2 = mmioDescend(local_c,&local_9c,&local_20,0x10);
  // DEVIATION: Win32 — if (MVar2 == 0) {
  // DEVIATION: Win32 — local_3c = local_9c.cksize;
  // DEVIATION: Win32 — DVar3 = mmioRead(local_c,(HPSTR)&local_30,local_9c.cksize);
  // DEVIATION: Win32 — if (DVar3 == local_3c) {
  // DEVIATION: Win32 — if ((local_2c == 0x5622) && (local_24._2_2_ == 8)) {
  // DEVIATION: Win32 — mmioAscend(local_c,&local_9c,0);
  // DEVIATION: Win32 — local_9c.ckid = 0x61746164;
  // DEVIATION: Win32 — MVar2 = mmioDescend(local_c,&local_9c,&local_20,0x10);
  // DEVIATION: Win32 — if (MVar2 == 0) {
  // DEVIATION: Win32 — _memset(&local_88,0,0x48);
  // DEVIATION: Win32 — local_88.cchBuffer = G.DAT_006385cc;
  // DEVIATION: Win32 — local_88.fccIOProc = 0x204d454d;
  // DEVIATION: Win32 — local_88.adwInfo[0] = 0;
  // DEVIATION: Win32 — local_8 = mmioOpenA((LPSTR)0x0,&local_88,0x11002);
  // DEVIATION: Win32 — if (local_8 == (HMMIO)0x0) {
  // DEVIATION: Win32 — uVar1 = 7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioGetInfo(local_8,&local_88,0);
  // DEVIATION: Win32 — local_34 = GlobalAlloc(0x2002,0xbc);
  // DEVIATION: Win32 — if (local_34 == (HGLOBAL)0x0) {
  // DEVIATION: Win32 — uVar1 = 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_38 = GlobalLock(local_34);
  // DEVIATION: Win32 — if (local_38 == (FOURCC *)0x0) {
  // DEVIATION: Win32 — GlobalFree(local_34);
  // DEVIATION: Win32 — uVar1 = 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — _memset(local_38,0,0xbc);
  // DEVIATION: Win32 — local_38[0x1b] = (FOURCC)local_34;
  // DEVIATION: Win32 — *(undefined2 *)(local_38 + 0x22) = 1;
  // DEVIATION: Win32 — local_38[0x1d] = local_30;
  // DEVIATION: Win32 — local_38[0x1e] = local_2c;
  // DEVIATION: Win32 — local_38[0x1f] = local_28;
  // DEVIATION: Win32 — local_38[0x20] = local_24;
  // DEVIATION: Win32 — *local_38 = (FOURCC)local_8;
  // DEVIATION: Win32 — local_38[0x18] = (FOURCC)local_c;
  // DEVIATION: Win32 — p_Var5 = &local_88;
  // DEVIATION: Win32 — pDVar7 = local_38 + 6;
  // DEVIATION: Win32 — for (iVar4 = 0x12; iVar4 != 0; iVar4 = iVar4 + -1) {
  // DEVIATION: Win32 — *pDVar7 = p_Var5->dwFlags;
  // DEVIATION: Win32 — p_Var5 = (_MMIOINFO *)&p_Var5->fccIOProc;
  // DEVIATION: Win32 — pDVar7 = pDVar7 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — p_Var6 = &local_9c;
  // DEVIATION: Win32 — pFVar8 = local_38;
  // DEVIATION: Win32 — for (iVar4 = 5; pFVar8 = pFVar8 + 1, iVar4 != 0; iVar4 = iVar4 + -1) {
  // DEVIATION: Win32 — *pFVar8 = p_Var6->ckid;
  // DEVIATION: Win32 — p_Var6 = (_MMCKINFO *)&p_Var6->cksize;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_38[0x1c] = local_38[0x1c] | 4;
  // DEVIATION: Win32 — *(undefined2 *)((int)local_38 + 0x8a) = param_3;
  // DEVIATION: Win32 — FUN_005d6283(local_38);
  // DEVIATION: Win32 — if (G.DAT_006385d0 == (FOURCC *)0x0) {
  // DEVIATION: Win32 — G.DAT_006385d0 = local_38;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — for (local_40 = G.DAT_006385d0; local_40[0x2e] != 0;
  // DEVIATION: Win32 — local_40 = (FOURCC *)local_40[0x2e]) {
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_40[0x2e] = (FOURCC)local_38;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioClose(local_c,0);
  // DEVIATION: Win32 — uVar1 = 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — show_messagebox_49A3(10);
  // DEVIATION: Win32 — mmioClose(local_c,0);
  // DEVIATION: Win32 — uVar1 = 10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioClose(local_c,0);
  // DEVIATION: Win32 — uVar1 = 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioClose(local_c,0);
  // DEVIATION: Win32 — uVar1 = 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioClose(local_c,0);
  // DEVIATION: Win32 — uVar1 = 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d52a2 (929 bytes)
// sound_load_avi_audio — load audio from AVI
export function FUN_005d52a2(param_1) {
  // DEVIATION: Win32 — _MMIOINFO *p_Var3;
  // DEVIATION: Win32 — DWORD *pDVar4;
  // DEVIATION: Win32 — _MMIOINFO local_10c;
  // DEVIATION: Win32 — undefined4 local_c4;
  // DEVIATION: Win32 — undefined4 local_c0;
  // DEVIATION: Win32 — undefined4 local_bc;
  // DEVIATION: Win32 — undefined4 local_b8;
  // DEVIATION: Win32 — undefined4 *local_b4;
  // DEVIATION: Win32 — HGLOBAL local_b0;
  // DEVIATION: Win32 — undefined1 local_ac [4];
  // DEVIATION: Win32 — uint local_a8;
  // DEVIATION: Win32 — int local_a4;
  // DEVIATION: Win32 — undefined4 local_a0;
  // DEVIATION: Win32 — uint local_9c;
  // DEVIATION: Win32 — int local_98 [8];
  // DEVIATION: Win32 — int local_78;
  // DEVIATION: Win32 — int local_68;
  // DEVIATION: Win32 — HMMIO local_c;
  // DEVIATION: Win32 — undefined4 local_8;
  // DEVIATION: Win32 — local_a0 = 0xe;
  // DEVIATION: Win32 — if (G.DAT_00638578 == 0) {
  // DEVIATION: Win32 — uVar1 = 3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (param_1 == 0) {
  // DEVIATION: Win32 — uVar1 = 0xc;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if ((G.DAT_006385d0 == (undefined4 *)0x0) || (*(short *)(G.DAT_006385d0 + 0x22) != 4)) {
  // DEVIATION: Win32 — AVIStreamInfoA(param_1,local_98,0x8c);
  // DEVIATION: Win32 — if (local_98[0] == 0x73647561) {
  // DEVIATION: Win32 — AVIStreamRead(param_1,0,1,0,0,local_ac,0);
  // DEVIATION: Win32 — local_a4 = local_68 * local_78;
  // DEVIATION: Win32 — AVIStreamReadFormat(param_1,0,&local_c4,&local_a0);
  // DEVIATION: Win32 — if (G.DAT_006385a0._2_2_ == 1) {
  // DEVIATION: Win32 — if (local_c4._2_2_ == 2) {
  // DEVIATION: Win32 — local_8 = CONCAT22(local_8._2_2_,1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = CONCAT22(local_8._2_2_,2);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (local_c4._2_2_ == 2) {
  // DEVIATION: Win32 — local_8 = (uint)local_8._2_2_ << 0x10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = CONCAT22(local_8._2_2_,3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — _memset(&local_10c,0,0x48);
  // DEVIATION: Win32 — if ((local_8 & 0xffff) == 1) {
  // DEVIATION: Win32 — local_10c.cchBuffer = G.DAT_006385cc * 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if ((local_8 & 0xffff) == 3) {
  // DEVIATION: Win32 — local_10c.cchBuffer = G.DAT_006385cc >> 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_10c.cchBuffer = G.DAT_006385cc;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_a8 = (uint)local_10c.cchBuffer / G.DAT_00638584;
  // DEVIATION: Win32 — local_10c.fccIOProc = 0x204d454d;
  // DEVIATION: Win32 — local_10c.adwInfo[0] = 0;
  // DEVIATION: Win32 — local_c = mmioOpenA((LPSTR)0x0,&local_10c,0x11002);
  // DEVIATION: Win32 — if (local_c == (HMMIO)0x0) {
  // DEVIATION: Win32 — uVar1 = 7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioGetInfo(local_c,&local_10c,0);
  // DEVIATION: Win32 — local_b0 = GlobalAlloc(0x2002,0xbc);
  // DEVIATION: Win32 — if (local_b0 == (HGLOBAL)0x0) {
  // DEVIATION: Win32 — uVar1 = 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_b4 = GlobalLock(local_b0);
  // DEVIATION: Win32 — if (local_b4 == (undefined4 *)0x0) {
  // DEVIATION: Win32 — GlobalFree(local_b0);
  // DEVIATION: Win32 — uVar1 = 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — _memset(local_b4,0,0xbc);
  // DEVIATION: Win32 — local_b4[0x1b] = local_b0;
  // DEVIATION: Win32 — *(undefined2 *)(local_b4 + 0x22) = 4;
  // DEVIATION: Win32 — local_b4[0x1d] = local_c4;
  // DEVIATION: Win32 — local_b4[0x1e] = local_c0;
  // DEVIATION: Win32 — local_b4[0x1f] = local_bc;
  // DEVIATION: Win32 — local_b4[0x20] = local_b8;
  // DEVIATION: Win32 — *local_b4 = local_c;
  // DEVIATION: Win32 — p_Var3 = &local_10c;
  // DEVIATION: Win32 — pDVar4 = local_b4 + 6;
  // DEVIATION: Win32 — for (iVar2 = 0x12; iVar2 != 0; iVar2 = iVar2 + -1) {
  // DEVIATION: Win32 — *pDVar4 = p_Var3->dwFlags;
  // DEVIATION: Win32 — p_Var3 = (_MMIOINFO *)&p_Var3->fccIOProc;
  // DEVIATION: Win32 — pDVar4 = pDVar4 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_b4[1] = local_98[0];
  // DEVIATION: Win32 — local_b4[2] = local_a4;
  // DEVIATION: Win32 — local_b4[0x21] = param_1;
  // DEVIATION: Win32 — local_b4[0x1c] = local_b4[0x1c] | 2;
  // DEVIATION: Win32 — local_b4[0x27] = local_a8;
  // DEVIATION: Win32 — for (local_9c = local_10c.cchBuffer; 1 < local_9c; local_9c = local_9c >> 1) {
  // DEVIATION: Win32 — local_b4[0x2a] = local_b4[0x2a] << 1;
  // DEVIATION: Win32 — local_b4[0x2a] = local_b4[0x2a] + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_b4[0x2e] = G.DAT_006385d0;
  // DEVIATION: Win32 — G.DAT_006385d0 = local_b4;
  // DEVIATION: Win32 — G.DAT_0063858c = G.DAT_0063858c + 1;
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = 9;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d5643 (190 bytes)
// sound_get_position_ms — get playback position in ms
export function FUN_005d5643() {
  // DEVIATION: Win32 — mmtime_tag local_10;
  // DEVIATION: Win32 — local_10.wType = 2;
  // DEVIATION: Win32 — if (G.DAT_006385b0 != 0) {
  // DEVIATION: Win32 — waveOutGetPosition(G.DAT_00638578,&local_10,0xc);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_10.wType != 1) {
  // DEVIATION: Win32 — if (local_10.wType == 2) {
  // DEVIATION: Win32 — local_10.u.ms = __ftol();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (local_10.wType == 4) {
  // DEVIATION: Win32 — local_10.u.ms = __ftol();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_10.u.ms = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_10.u.ms;
}

// Source: decompiled/block_005D0000.c FUN_005d5706 (166 bytes)
// sound_get_position_samples — get playback position in samples
export function FUN_005d5706() {
  // DEVIATION: Win32 — mmtime_tag local_10;
  // DEVIATION: Win32 — local_10.wType = 2;
  // DEVIATION: Win32 — if (G.DAT_006385b0 != 0) {
  // DEVIATION: Win32 — waveOutGetPosition(G.DAT_00638578,&local_10,0xc);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_10.wType == 1) {
  // DEVIATION: Win32 — local_10.u.ms = __ftol();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (local_10.wType != 2) {
  // DEVIATION: Win32 — if (local_10.wType == 4) {
  // DEVIATION: Win32 — local_10.u.ms = local_10.u.ms / (ushort)G.DAT_006385ac;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_10.u.ms = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_10.u.ms;
}

// Source: decompiled/block_005D0000.c FUN_005d57b1 (983 bytes)
// sound_fill_buffer — fill audio buffer from stream
export function FUN_005d57b1(param_1) {
  // DEVIATION: Win32 — iVar1 = G.DAT_006385d0;
  // DEVIATION: Win32 — if (G.DAT_00638578 == 0) {
  // DEVIATION: Win32 — uVar2 = 3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (G.DAT_006385bc == 0) {
  // DEVIATION: Win32 — uVar2 = 0xe;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if ((G.DAT_006385d0 == 0) || (*(short *)(G.DAT_006385d0 + 0x88) != 4)) {
  // DEVIATION: Win32 — uVar2 = 5;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if ((*(byte *)(G.DAT_006385d0 + 0x70) & 1) == 0) {
  // DEVIATION: Win32 — if ((*(uint *)(*(int *)(G.DAT_006385d0 + 0x98) + 0xc) >> 3 & 1) == 0) {
  // DEVIATION: Win32 — if (((*(uint *)(*(int *)(G.DAT_006385d0 + 0x98) + 0xc) >> 7) -
  // DEVIATION: Win32 — (*(uint *)(G.DAT_006385c8 + 0xc) >> 7) & 7) == 0) {
  // DEVIATION: Win32 — param_1 = (uint)(*(int *)(G.DAT_006385d0 + 0x9c) - *(int *)(G.DAT_006385d0 + 0x68)) /
  // DEVIATION: Win32 — (uint)*(ushort *)(G.DAT_006385d0 + 0x80);
  // DEVIATION: Win32 — _DAT_00638594 = _DAT_00638594 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_c = *(int *)(G.DAT_006385d0 + 0x98);
  // DEVIATION: Win32 — uVar3 = (*(int *)(G.DAT_006385d0 + 0x3c) - *(int *)(G.DAT_006385d0 + 0x34)) /
  // DEVIATION: Win32 — (int)(uint)*(ushort *)(G.DAT_006385d0 + 0x80);
  // DEVIATION: Win32 — if (uVar3 < param_1) {
  // DEVIATION: Win32 — param_1 = uVar3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_24 = *(ushort *)(G.DAT_006385d0 + 0x80) * param_1;
  // DEVIATION: Win32 — uVar3 = *(int *)(G.DAT_006385d0 + 0x9c) - *(int *)(G.DAT_006385d0 + 0x68);
  // DEVIATION: Win32 — _DAT_00638598 = param_1;
  // DEVIATION: Win32 — if (uVar3 < local_24) {
  // DEVIATION: Win32 — local_24 = uVar3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar3 = *(int *)(G.DAT_006385d0 + 8) -
  // DEVIATION: Win32 — (*(int *)(G.DAT_006385d0 + 0x90) - *(int *)(G.DAT_006385d0 + 0x94));
  // DEVIATION: Win32 — if (uVar3 < local_24) {
  // DEVIATION: Win32 — local_24 = uVar3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — AVIStreamRead(*(undefined4 *)(G.DAT_006385d0 + 0x84),
  // DEVIATION: Win32 — *(uint *)(G.DAT_006385d0 + 0x90) / (uint)*(ushort *)(G.DAT_006385d0 + 0x80),
  // DEVIATION: Win32 — local_24 / *(ushort *)(G.DAT_006385d0 + 0x80),*(undefined4 *)(G.DAT_006385d0 + 0x34)
  // DEVIATION: Win32 — ,local_24,&local_8,0);
  // DEVIATION: Win32 — *(int *)(G.DAT_006385d0 + 0x90) = *(int *)(G.DAT_006385d0 + 0x90) + local_8;
  // DEVIATION: Win32 — *(int *)(iVar1 + 0x34) = *(int *)(iVar1 + 0x34) + local_8;
  // DEVIATION: Win32 — if (*(int *)(iVar1 + 0x3c) == *(int *)(iVar1 + 0x34)) {
  // DEVIATION: Win32 — *(undefined4 *)(iVar1 + 0x34) = *(undefined4 *)(iVar1 + 0x30);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(int *)(G.DAT_006385d0 + 0x68) = *(int *)(G.DAT_006385d0 + 0x68) + local_8;
  // DEVIATION: Win32 — if (*(uint *)(G.DAT_006385d0 + 0x9c) <= *(uint *)(G.DAT_006385d0 + 0x68)) {
  // DEVIATION: Win32 — *(uint *)(local_c + 0xc) = *(uint *)(local_c + 0xc) | 8;
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x98) = *(undefined4 *)(local_c + 0x1c);
  // DEVIATION: Win32 — local_c = *(int *)(G.DAT_006385d0 + 0x98);
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x68) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(uint *)(G.DAT_006385d0 + 8) <=
  // DEVIATION: Win32 — (uint)(*(int *)(G.DAT_006385d0 + 0x90) - *(int *)(G.DAT_006385d0 + 0x94))) {
  // DEVIATION: Win32 — for (local_20 = 0;
  // DEVIATION: Win32 — local_20 < (uint)(*(int *)(G.DAT_006385d0 + 0x9c) - *(int *)(G.DAT_006385d0 + 0x68));
  // DEVIATION: Win32 — local_20 = local_20 + 1) {
  // DEVIATION: Win32 — **(undefined1 **)(iVar1 + 0x34) = 0x80;
  // DEVIATION: Win32 — *(int *)(iVar1 + 0x34) = *(int *)(iVar1 + 0x34) + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(int *)(iVar1 + 0x3c) == *(int *)(iVar1 + 0x34)) {
  // DEVIATION: Win32 — *(undefined4 *)(iVar1 + 0x34) = *(undefined4 *)(iVar1 + 0x30);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(uint *)(local_c + 0xc) = *(uint *)(local_c + 0xc) | 8;
  // DEVIATION: Win32 — *(uint *)(local_c + 0xc) = *(uint *)(local_c + 0xc) | 2;
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x98) = *(undefined4 *)(local_c + 0x1c);
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x68) = 0;
  // DEVIATION: Win32 — *(uint *)(G.DAT_006385d0 + 0x70) = *(uint *)(G.DAT_006385d0 + 0x70) | 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — _DAT_00638590 = _DAT_00638590 + 1;
  // DEVIATION: Win32 — uVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar2 = 0xe;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar2;
}

// Source: decompiled/block_005D0000.c FUN_005d5b88 (95 bytes)
// sound_stop_streaming — stop streaming playback
export function FUN_005d5b88() {
  // DEVIATION: Win32 — G.DAT_006385bc = 0;
  // DEVIATION: Win32 — if ((G.DAT_006385d0 == 0) || (*(short *)(G.DAT_006385d0 + 0x88) != 4)) {
  // DEVIATION: Win32 — uVar1 = 5;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — G.DAT_006385d0 = FUN_005d7494(0,G.DAT_006385d0);
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d5bec (293 bytes)
// sound_read_avi_chunk — read AVI audio chunk
export function FUN_005d5bec(param_1) {
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — if ((*(int *)(param_1 + 0x3c) == *(int *)(param_1 + 0x34)) ||
  // DEVIATION: Win32 — (*(int *)(param_1 + 0x30) == *(int *)(param_1 + 0x34))) {
  // DEVIATION: Win32 — uVar1 = *(int *)(G.DAT_006385d0 + 8) -
  // DEVIATION: Win32 — (*(int *)(G.DAT_006385d0 + 0x90) - *(int *)(G.DAT_006385d0 + 0x94));
  // DEVIATION: Win32 — local_10 = *(uint *)(param_1 + 0x2c);
  // DEVIATION: Win32 — if (uVar1 < *(uint *)(param_1 + 0x2c)) {
  // DEVIATION: Win32 — local_10 = uVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(undefined4 *)(param_1 + 0x34) = *(undefined4 *)(param_1 + 0x30);
  // DEVIATION: Win32 — AVIStreamRead(*(undefined4 *)(param_1 + 0x84),
  // DEVIATION: Win32 — *(uint *)(param_1 + 0x90) / (uint)*(ushort *)(param_1 + 0x80),
  // DEVIATION: Win32 — local_10 / *(ushort *)(param_1 + 0x80),*(undefined4 *)(param_1 + 0x34),local_10,
  // DEVIATION: Win32 — &local_8,0);
  // DEVIATION: Win32 — *(int *)(param_1 + 0x90) = *(int *)(param_1 + 0x90) + local_8;
  // DEVIATION: Win32 — iVar2 = *(int *)(param_1 + 0x2c) - local_8;
  // DEVIATION: Win32 — if (iVar2 != 0) {
  // DEVIATION: Win32 — FUN_005d6b4c(*(int *)(param_1 + 0x34) + local_8,iVar2);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005d5d11 (640 bytes)
// sound_play_range — play audio range
export function FUN_005d5d11(param_1, param_2, param_3) {
  // DEVIATION: Win32 — if (G.DAT_00638578 == 0) {
  // DEVIATION: Win32 — uVar1 = 3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if ((G.DAT_006385d0 == 0) || (*(short *)(G.DAT_006385d0 + 0x88) != 4)) {
  // DEVIATION: Win32 — uVar1 = 5;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (G.DAT_00638588 != G.DAT_00638584) {
  // DEVIATION: Win32 — FUN_005d687b(G.DAT_00638584);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar2 = AVIStreamTimeToSample(*(undefined4 *)(G.DAT_006385d0 + 0x84),param_1);
  // DEVIATION: Win32 — local_10 = AVIStreamTimeToSample(*(undefined4 *)(G.DAT_006385d0 + 0x84),param_2);
  // DEVIATION: Win32 — local_10 = (uint)*(ushort *)(G.DAT_006385d0 + 0x80) * local_10;
  // DEVIATION: Win32 — iVar2 = (uint)*(ushort *)(G.DAT_006385d0 + 0x80) * iVar2;
  // DEVIATION: Win32 — if (local_10 == 0) {
  // DEVIATION: Win32 — local_10 = *(int *)(G.DAT_006385d0 + 8) - iVar2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_10 = local_10 - iVar2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_10 < 0) {
  // DEVIATION: Win32 — uVar1 = 0xc;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005d6a2c();
  // DEVIATION: Win32 — *(int *)(G.DAT_006385d0 + 8) = local_10;
  // DEVIATION: Win32 — *(int *)(G.DAT_006385d0 + 0x90) = iVar2;
  // DEVIATION: Win32 — *(int *)(G.DAT_006385d0 + 0x94) = iVar2;
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 100) = 0;
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x68) = 0;
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x34) = *(undefined4 *)(G.DAT_006385d0 + 0x3c);
  // DEVIATION: Win32 — FUN_005d5bec(G.DAT_006385d0);
  // DEVIATION: Win32 — *(uint *)(G.DAT_006385d0 + 0x70) = *(uint *)(G.DAT_006385d0 + 0x70) & 0xfffffffd;
  // DEVIATION: Win32 — *(uint *)(G.DAT_006385d0 + 0x70) = *(uint *)(G.DAT_006385d0 + 0x70) & 0xfffffffe;
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x8c) = param_3;
  // DEVIATION: Win32 — G.DAT_006385bc = 0;
  // DEVIATION: Win32 — local_8 = G.DAT_006385c0;
  // DEVIATION: Win32 — for (local_c = 0; local_c < G.DAT_00638584; local_c = local_c + 1) {
  // DEVIATION: Win32 — local_8[3] = local_8[3] & 0xffffffdf;
  // DEVIATION: Win32 — local_8[3] = local_8[3] & 0xfffffffe;
  // DEVIATION: Win32 — local_8[3] = local_8[3] & 0xfffffffd;
  // DEVIATION: Win32 — local_8[3] = local_8[3] & 0xffffffef;
  // DEVIATION: Win32 — local_8[3] = local_8[3] & 0xffffffdf;
  // DEVIATION: Win32 — local_8[3] = local_8[3] & 0xffffffbf;
  // DEVIATION: Win32 — local_8[4] = *(undefined4 *)*local_8;
  // DEVIATION: Win32 — iVar2 = FUN_005d717f(*local_8);
  // DEVIATION: Win32 — if (iVar2 == 1) break;
  // DEVIATION: Win32 — local_8 = (undefined4 *)local_8[7];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005d5bec(G.DAT_006385d0);
  // DEVIATION: Win32 — local_8 = G.DAT_006385c0;
  // DEVIATION: Win32 — for (local_c = 0; local_c < G.DAT_00638584; local_c = local_c + 1) {
  // DEVIATION: Win32 — local_8[3] = local_8[3] | 8;
  // DEVIATION: Win32 — local_8 = (undefined4 *)local_8[7];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_006385c8 = G.DAT_006385c0;
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d5f91 (167 bytes)
// sound_finish_playback — finish current playback
export function FUN_005d5f91() {
  // DEVIATION: Win32 — if ((G.DAT_006385d0 != 0) && (*(short *)(G.DAT_006385d0 + 0x88) == 4)) {
  // DEVIATION: Win32 — FUN_005d6947(G.DAT_006385c0);
  // DEVIATION: Win32 — *(uint *)(G.DAT_006385d0 + 0x70) = *(uint *)(G.DAT_006385d0 + 0x70) | 0x10;
  // DEVIATION: Win32 — if (*(int *)(G.DAT_006385d0 + 0x8c) != 0) {
  // DEVIATION: Win32 — **(ushort **)(G.DAT_006385d0 + 0x8c) = **(ushort **)(G.DAT_006385d0 + 0x8c) | 4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_006385bc = 1;
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x98) = G.DAT_006385c0;
}

// Source: decompiled/block_005D0000.c FUN_005d6038 (371 bytes)
// sound_queue_file — queue a sound file for playback
export function FUN_005d6038(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — if (G.DAT_00638578 == 0) {
  // DEVIATION: Win32 — sVar1 = 3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if ((G.DAT_006385b0 == 0) &&
  // DEVIATION: Win32 — (iVar2 = FUN_005d48f0(G.DAT_0063857c,G.DAT_00638580,G.DAT_00638584), iVar2 != 0)) {
  // DEVIATION: Win32 — sVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (G.DAT_0063858c < 5) {
  // DEVIATION: Win32 — if ((param_2 & 8) == 0) {
  // DEVIATION: Win32 — sVar1 = FUN_005d4c5f(param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — sVar1 = FUN_005d4f6a(param_1,param_2,param_3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((sVar1 == 0) && (G.DAT_0063858c = G.DAT_0063858c + 1, ((uint)G.DAT_006385c8[3] >> 5 & 1) == 0)) {
  // DEVIATION: Win32 — local_10 = 0;
  // DEVIATION: Win32 — local_8 = G.DAT_006385c8;
  // DEVIATION: Win32 — while ((local_10 < G.DAT_00638588 && (iVar2 = FUN_005d717f(*local_8), iVar2 != 1))) {
  // DEVIATION: Win32 — local_8 = (undefined4 *)local_8[7];
  // DEVIATION: Win32 — local_10 = local_10 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005d6947(G.DAT_006385c8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — sVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return sVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d61ab (119 bytes)
// sound_remove_by_tag — remove sounds by tag
export function FUN_005d61ab(param_1) {
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — local_c = G.DAT_006385d0;
  // DEVIATION: Win32 — while (local_c != 0) {
  // DEVIATION: Win32 — if (*(short *)(local_c + 0x8a) == param_1) {
  // DEVIATION: Win32 — local_c = FUN_005d7494(local_8,local_c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = local_c;
  // DEVIATION: Win32 — local_c = *(int *)(local_c + 0xb8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005d6222 (97 bytes)
// sound_mark_done_by_tag — mark sounds done by tag
export function FUN_005d6222(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d6283 (322 bytes)
// sound_fill_from_file — fill buffer from file
export function FUN_005d6283(param_1) {
  // DEVIATION: Win32 — HPSTR local_44;
  // DEVIATION: Win32 — HPSTR local_40;
  // DEVIATION: Win32 — int local_38;
  // DEVIATION: Win32 — int local_14;
  // DEVIATION: Win32 — int local_10;
  // DEVIATION: Win32 — size_t local_c;
  // DEVIATION: Win32 — int local_8;
  // DEVIATION: Win32 — local_10 = 0;
  // DEVIATION: Win32 — local_14 = 0;
  // DEVIATION: Win32 — puVar2 = (undefined4 *)(param_1 + 0x18);
  // DEVIATION: Win32 — puVar3 = local_5c;
  // DEVIATION: Win32 — for (iVar1 = 0x12; iVar1 != 0; iVar1 = iVar1 + -1) {
  // DEVIATION: Win32 — *puVar3 = *puVar2;
  // DEVIATION: Win32 — puVar2 = puVar2 + 1;
  // DEVIATION: Win32 — puVar3 = puVar3 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_44 == local_40) {
  // DEVIATION: Win32 — local_c = 0;
  // DEVIATION: Win32 — local_8 = local_48;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_c = local_38 - (int)local_40;
  // DEVIATION: Win32 — local_8 = local_48 - local_c;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_c == 0) {
  // DEVIATION: Win32 — local_40 = local_44;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FID_conflict__memcpy(local_44,local_40,local_c);
  // DEVIATION: Win32 — local_40 = local_44 + local_c;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — while (local_14 == 0) {
  // DEVIATION: Win32 — local_10 = *(int *)(param_1 + 8) - *(int *)(param_1 + 0x68);
  // DEVIATION: Win32 — if (local_8 < local_10) {
  // DEVIATION: Win32 — mmioRead(*(HMMIO *)(param_1 + 0x60),local_40,local_8);
  // DEVIATION: Win32 — *(int *)(param_1 + 0x68) = *(int *)(param_1 + 0x68) + local_8;
  // DEVIATION: Win32 — *(HPSTR *)(param_1 + 0x34) = local_44;
  // DEVIATION: Win32 — local_14 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mmioRead(*(HMMIO *)(param_1 + 0x60),local_40,local_10);
  // DEVIATION: Win32 — *(undefined4 *)(param_1 + 0x68) = 0;
  // DEVIATION: Win32 — local_40 = local_40 + local_10;
  // DEVIATION: Win32 — local_8 = local_38 - (int)local_40;
  // DEVIATION: Win32 — mmioSeek(*(HMMIO *)(param_1 + 0x60),*(LONG *)(param_1 + 0x10),0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005d63c5 (107 bytes)
// sound_alloc_global — allocate global memory for sound
export function FUN_005d63c5(param_1, param_2) {
  // DEVIATION: Win32 — pvVar1 = GlobalAlloc(0x2002,param_1);
  // DEVIATION: Win32 — *param_2 = (int)pvVar1;
  // DEVIATION: Win32 — if (*param_2 == 0) {
  // DEVIATION: Win32 — pvVar2 = (LPVOID)0x0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — pvVar2 = GlobalLock((HGLOBAL)*param_2);
  // DEVIATION: Win32 — if (pvVar2 == (LPVOID)0x0) {
  // DEVIATION: Win32 — GlobalFree((HGLOBAL)*param_2);
  // DEVIATION: Win32 — *param_2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return pvVar2;
}

// Source: decompiled/block_005D0000.c FUN_005d6430 (46 bytes)
// sound_free_global — free global sound memory
export function FUN_005d6430(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d645e (551 bytes)
// sound_create_buffers — create wave output buffers
export function FUN_005d645e(param_1, param_2, param_3) {
  // DEVIATION: Win32 — local_8 = (int *)0x0;
  // DEVIATION: Win32 — local_c = param_1 / param_3;
  // DEVIATION: Win32 — if (G.DAT_006385b0 == 0) {
  // DEVIATION: Win32 — local_10 = 3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — for (local_14 = 0; local_14 < param_3; local_14 = local_14 + 1) {
  // DEVIATION: Win32 — local_18 = local_8;
  // DEVIATION: Win32 — local_8 = (int *)FUN_005d63c5(0x20,&local_1c);
  // DEVIATION: Win32 — if (local_8 == (int *)0x0) {
  // DEVIATION: Win32 — if (local_14 != 0) {
  // DEVIATION: Win32 — FUN_005d6b89(param_2);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_14 == 0) {
  // DEVIATION: Win32 — G.DAT_006385c0 = local_8;
  // DEVIATION: Win32 — G.DAT_006385c8 = local_8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — _memset(local_8,0,0x20);
  // DEVIATION: Win32 — local_8[2] = local_1c;
  // DEVIATION: Win32 — iVar1 = FUN_005d63c5(local_c + 0x20,&local_1c);
  // DEVIATION: Win32 — *local_8 = iVar1;
  // DEVIATION: Win32 — if (*local_8 == 0) {
  // DEVIATION: Win32 — if (local_14 != 0) {
  // DEVIATION: Win32 — FUN_005d6b89(param_2);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — _memset((void *)*local_8,0,0x20);
  // DEVIATION: Win32 — *(int *)*local_8 = *local_8 + 0x20;
  // DEVIATION: Win32 — local_8[4] = *(int *)*local_8;
  // DEVIATION: Win32 — *(uint *)(*local_8 + 4) = local_c;
  // DEVIATION: Win32 — local_8[6] = *(int *)(*local_8 + 4);
  // DEVIATION: Win32 — local_8[5] = *(int *)*local_8 + local_8[6];
  // DEVIATION: Win32 — *(int **)(*local_8 + 0xc) = local_8;
  // DEVIATION: Win32 — local_8[1] = local_1c;
  // DEVIATION: Win32 — local_8[3] = local_8[3] & 0xffff807fU | (local_14 & 0xff) << 7;
  // DEVIATION: Win32 — local_10 = waveOutPrepareHeader(param_2,(LPWAVEHDR)*local_8,0x20);
  // DEVIATION: Win32 — if (local_10 != 0) {
  // DEVIATION: Win32 — show_messagebox_4C18(local_10);
  // DEVIATION: Win32 — FUN_005d6b89(param_2);
  // DEVIATION: Win32 — return 5;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(uint *)(*local_8 + 0x10) = *(uint *)(*local_8 + 0x10) | 1;
  // DEVIATION: Win32 — if (local_18 != (int *)0x0) {
  // DEVIATION: Win32 — local_18[7] = (int)local_8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_10 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8[7] = (int)G.DAT_006385c0;
  // DEVIATION: Win32 — _DAT_006385b4 = 1;
  // DEVIATION: Win32 — G.DAT_006385cc = param_1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_10;
}

// Source: decompiled/block_005D0000.c FUN_005d6685 (181 bytes)
// sound_add_buffers — add buffers to chain
export function FUN_005d6685(param_1) {
  // DEVIATION: Win32 — local_8 = G.DAT_006385c4;
  // DEVIATION: Win32 — *(uint *)(G.DAT_006385c4 + 0xc) = *(uint *)(G.DAT_006385c4 + 0xc) & 0xfffffffe;
  // DEVIATION: Win32 — for (local_10 = 0; (int)local_10 < param_1 + -1; local_10 = local_10 + 1) {
  // DEVIATION: Win32 — local_8 = *(int *)(local_8 + 0x1c);
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) & 0xfffffffe;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_c = G.DAT_006385c0;
  // DEVIATION: Win32 — for (local_10 = 0; local_10 < G.DAT_00638588 - 1U; local_10 = local_10 + 1) {
  // DEVIATION: Win32 — local_c = *(int *)(local_c + 0x1c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = *(undefined4 *)(local_8 + 0x1c);
  // DEVIATION: Win32 — *(int *)(local_c + 0x1c) = G.DAT_006385c4;
  // DEVIATION: Win32 — G.DAT_006385c4 = uVar1;
  // DEVIATION: Win32 — *(int *)(local_8 + 0x1c) = G.DAT_006385c0;
  // DEVIATION: Win32 — G.DAT_00638588 = G.DAT_00638588 + param_1;
}

// Source: decompiled/block_005D0000.c FUN_005d673a (321 bytes)
// sound_remove_buffers — remove buffers from chain
export function FUN_005d673a(param_1) {
  // DEVIATION: Win32 — local_8 = G.DAT_006385c0;
  // DEVIATION: Win32 — if ((uint)(G.DAT_00638588 - param_1) <= (*(uint *)(G.DAT_006385c8 + 0xc) >> 7 & 0xff)) {
  // DEVIATION: Win32 — G.DAT_006385c8 = G.DAT_006385c0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_14 = 0; local_14 < (int)((G.DAT_00638588 - param_1) - 1U); local_14 = local_14 + 1) {
  // DEVIATION: Win32 — local_8 = *(int *)(local_8 + 0x1c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar1 = *(int *)(local_8 + 0x1c);
  // DEVIATION: Win32 — *(int *)(local_8 + 0x1c) = G.DAT_006385c0;
  // DEVIATION: Win32 — local_8 = iVar1;
  // DEVIATION: Win32 — for (local_14 = 0; local_14 < param_1; local_14 = local_14 + 1) {
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) & 0xfffffffd;
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) & 0xfffffffb;
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) | 1;
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) & 0xfffffff7;
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) & 0xffffffef;
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) & 0xffffffdf;
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) & 0xffffffbf;
  // DEVIATION: Win32 — local_8 = *(int *)(local_8 + 0x1c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = iVar1;
  // DEVIATION: Win32 — for (local_14 = 0; local_14 < param_1 + -1; local_14 = local_14 + 1) {
  // DEVIATION: Win32 — local_8 = *(int *)(local_8 + 0x1c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(int *)(local_8 + 0x1c) = G.DAT_006385c4;
  // DEVIATION: Win32 — G.DAT_006385c4 = iVar1;
  // DEVIATION: Win32 — G.DAT_00638588 = G.DAT_00638588 - param_1;
}

// Source: decompiled/block_005D0000.c FUN_005d687b (204 bytes)
// sound_resize_buffer_chain — resize buffer chain
export function FUN_005d687b(param_1) {
  // DEVIATION: Win32 — if ((G.DAT_00638578 != 0) &&
  // DEVIATION: Win32 — (((G.DAT_006385d0 == 0 || (*(short *)(G.DAT_006385d0 + 0x88) != 4)) ||
  // DEVIATION: Win32 — ((*(uint *)(G.DAT_006385d0 + 0x70) >> 1 & 1) != 0)))) {
  // DEVIATION: Win32 — if (G.DAT_00638584 < param_1) {
  // DEVIATION: Win32 — param_1 = G.DAT_00638584;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((int)param_1 < 2) {
  // DEVIATION: Win32 — param_1 = 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (G.DAT_00638588 < param_1) {
  // DEVIATION: Win32 — FUN_005d6685(param_1 - G.DAT_00638588);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (param_1 < G.DAT_00638588) {
  // DEVIATION: Win32 — FUN_005d673a(G.DAT_00638588 - param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005d6947 (229 bytes)
// sound_write_buffers — write pending buffers to device
export function FUN_005d6947(param_1) {
  // DEVIATION: Win32 — local_10 = local_10 & 0xffff0000;
  // DEVIATION: Win32 — while (((uint)param_1[3] >> 6 & 1) != 0) {
  // DEVIATION: Win32 — local_c = *(byte **)*param_1;
  // DEVIATION: Win32 — for (local_14 = 0; local_14 < *(uint *)(*param_1 + 4); local_14 = local_14 + 1) {
  // DEVIATION: Win32 — *local_c = *local_c ^ 0x80;
  // DEVIATION: Win32 — local_c = local_c + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — MVar1 = waveOutWrite(G.DAT_00638578,(LPWAVEHDR)*param_1,0x20);
  // DEVIATION: Win32 — local_10 = CONCAT22(local_10._2_2_,(short)MVar1);
  // DEVIATION: Win32 — if ((short)MVar1 == 0) {
  // DEVIATION: Win32 — param_1[3] = param_1[3] | 0x20;
  // DEVIATION: Win32 — param_1[3] = param_1[3] & 0xffffffbf;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if ((MVar1 & 0xffff) != 0x21) {
  // DEVIATION: Win32 — show_messagebox_4C18(local_10);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — param_1[3] = param_1[3] & 0xffffffdf;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — param_1 = (int *)param_1[7];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 0;
}

// Source: decompiled/block_005D0000.c FUN_005d6a2c (288 bytes)
// sound_reset_all — reset all sound state
export function FUN_005d6a2c() {
  // DEVIATION: Win32 — tagMSG local_30;
  // DEVIATION: Win32 — int local_14;
  // DEVIATION: Win32 — uint local_10;
  // DEVIATION: Win32 — int local_c;
  // DEVIATION: Win32 — int local_8;
  // DEVIATION: Win32 — local_c = 0;
  // DEVIATION: Win32 — _DAT_006385b8 = 0;
  // DEVIATION: Win32 — local_14 = G.DAT_006385d0;
  // DEVIATION: Win32 — if (G.DAT_00638578 != (HWAVEOUT)0x0) {
  // DEVIATION: Win32 — waveOutReset(G.DAT_00638578);
  // DEVIATION: Win32 — while (BVar1 = PeekMessageA(&local_30,G.DAT_0063857c,0x3bd,0x3bd,1), BVar1 != 0) {
  // DEVIATION: Win32 — _DAT_006385d4 = _DAT_006385d4 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — while (local_14 != 0) {
  // DEVIATION: Win32 — if (*(short *)(local_14 + 0x88) == 4) {
  // DEVIATION: Win32 — local_c = local_14;
  // DEVIATION: Win32 — local_14 = *(int *)(local_14 + 0xb8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_14 = FUN_005d7494(local_c,local_14);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = G.DAT_006385c0;
  // DEVIATION: Win32 — if (G.DAT_006385c0 != 0) {
  // DEVIATION: Win32 — for (local_10 = 0; local_10 < G.DAT_00638588; local_10 = local_10 + 1) {
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) & 0xffffffdf;
  // DEVIATION: Win32 — *(uint *)(local_8 + 0xc) = *(uint *)(local_8 + 0xc) & 0xffffffbf;
  // DEVIATION: Win32 — local_8 = *(int *)(local_8 + 0x1c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005d6b4c (61 bytes)
// sound_fill_silence — fill buffer with silence
export function FUN_005d6b4c(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d6b89 (272 bytes)
// sound_destroy_all — destroy all sound resources
export function FUN_005d6b89(param_1) {
  // DEVIATION: Win32 — piVar1 = G.DAT_006385c0;
  // DEVIATION: Win32 — local_8 = G.DAT_006385c0;
  // DEVIATION: Win32 — _DAT_006385b8 = 0;
  // DEVIATION: Win32 — if (G.DAT_006385b0 != 0) {
  // DEVIATION: Win32 — waveOutReset(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (G.DAT_00638588 != G.DAT_00638584) {
  // DEVIATION: Win32 — FUN_005d687b(G.DAT_00638584);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (piVar1 != (int *)0x0) {
  // DEVIATION: Win32 — for (local_14 = 0; local_14 < G.DAT_00638584; local_14 = local_14 + 1) {
  // DEVIATION: Win32 — piVar1 = (int *)local_8[7];
  // DEVIATION: Win32 — if (*local_8 != 0) {
  // DEVIATION: Win32 — waveOutUnprepareHeader(param_1,(LPWAVEHDR)*local_8,0x20);
  // DEVIATION: Win32 — FUN_005d6430(local_8[1]);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005d6430(local_8[2]);
  // DEVIATION: Win32 — local_8 = piVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_006385c0 = (int *)0x0;
  // DEVIATION: Win32 — do {
  // DEVIATION: Win32 — G.DAT_006385d0 = FUN_005d7494(0,G.DAT_006385d0);
  // DEVIATION: Win32 — } while (G.DAT_006385d0 != 0);
  // DEVIATION: Win32 — G.DAT_006385d0 = 0;
  // DEVIATION: Win32 — return local_c;
}

// Source: decompiled/block_005D0000.c FUN_005d6c99 (1254 bytes)
// sound_done_callback — wave output done callback
export function FUN_005d6c99(param_1, param_2) {
  // DEVIATION: Win32 — code *local_8;
  // DEVIATION: Win32 — puVar2 = G.DAT_006385d0;
  // DEVIATION: Win32 — local_8 = (code *)0x0;
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — if (G.DAT_006385b0 != 0) {
  // DEVIATION: Win32 — local_20 = *(int **)(param_2 + 0xc);
  // DEVIATION: Win32 — local_2c = 0;
  // DEVIATION: Win32 — while ((local_2c < G.DAT_00638588 &&
  // DEVIATION: Win32 — (G.DAT_006385c8 = *(int *)(G.DAT_006385c8 + 0x1c),
  // DEVIATION: Win32 — (*(uint *)(G.DAT_006385c8 + 0xc) >> 5 & 1) == 0))) {
  // DEVIATION: Win32 — local_2c = local_2c + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((*(byte *)(local_20 + 3) & 1) == 0) {
  // DEVIATION: Win32 — local_30 = G.DAT_006385d0;
  // DEVIATION: Win32 — if ((((G.DAT_006385d0 != (undefined4 *)0x0) && (*(short *)(G.DAT_006385d0 + 0x22) == 4)) &&
  // DEVIATION: Win32 — (((uint)local_20[3] >> 1 & 1) != 0)) && (((uint)local_20[3] >> 4 & 1) != 0)) {
  // DEVIATION: Win32 — *(ushort *)G.DAT_006385d0[0x23] = *(ushort *)G.DAT_006385d0[0x23] & 0xfffb;
  // DEVIATION: Win32 — puVar2[0x1c] = puVar2[0x1c] | 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — do {
  // DEVIATION: Win32 — puVar2 = (undefined4 *)*local_20;
  // DEVIATION: Win32 — local_28 = *(byte **)*local_20;
  // DEVIATION: Win32 — while ((local_30 != (undefined4 *)0x0 && (((uint)local_30[0x1c] >> 1 & 1) != 0))) {
  // DEVIATION: Win32 — local_30 = (undefined4 *)local_30[0x2e];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_30 == (undefined4 *)0x0) {
  // DEVIATION: Win32 — FUN_005d6b4c(*(undefined4 *)*local_20,*(undefined4 *)(*local_20 + 4));
  // DEVIATION: Win32 — local_20[3] = local_20[3] & 0xffffffdf;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (((uint)local_20[3] >> 6 & 1) == 0) {
  // DEVIATION: Win32 — if (*(short *)(local_30 + 0x22) == 4) {
  // DEVIATION: Win32 — if (((uint)local_20[3] >> 3 & 1) == 0) {
  // DEVIATION: Win32 — FUN_005d791b(local_20,local_30);
  // DEVIATION: Win32 — _DAT_00638594 = _DAT_00638594 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar3 = ((uint)local_20[3] >> 7 & 0xff) * local_30[0x27] + local_30[0xc];
  // DEVIATION: Win32 — FUN_005edc6c(local_20[4],iVar3,local_20[6] / (int)(uint)(ushort)G.DAT_006385ac,
  // DEVIATION: Win32 — *(undefined2 *)(local_30 + 0x20),
  // DEVIATION: Win32 — CONCAT22((short)((uint)iVar3 >> 0x10),(ushort)G.DAT_006385ac));
  // DEVIATION: Win32 — if (((uint)local_20[3] >> 1 & 1) != 0) {
  // DEVIATION: Win32 — local_20[3] = local_20[3] | 0x10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005d753e(local_30,*puVar2,puVar2[1]);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_30 = (undefined4 *)local_30[0x2e]; local_30 != (undefined4 *)0x0;
  // DEVIATION: Win32 — local_30 = *(undefined4 **)((int)local_30 + 0xb8)) {
  // DEVIATION: Win32 — if ((*(uint *)((int)local_30 + 0x70) >> 1 & 1) == 0) {
  // DEVIATION: Win32 — FUN_005d778c(local_30,*puVar2,puVar2[1]);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_20[3] = local_20[3] | 0x40;
  // DEVIATION: Win32 — *(uint *)(*local_20 + 0x10) = *(uint *)(*local_20 + 0x10) & 0xfffffffe;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_2c = 0; local_2c < (uint)puVar2[1]; local_2c = local_2c + 1) {
  // DEVIATION: Win32 — *local_28 = *local_28 ^ 0x80;
  // DEVIATION: Win32 — local_28 = local_28 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — MVar4 = waveOutWrite(param_1,(LPWAVEHDR)*local_20,0x20);
  // DEVIATION: Win32 — local_10 = MVar4 & 0xffff;
  // DEVIATION: Win32 — if ((short)MVar4 == 0) {
  // DEVIATION: Win32 — local_20[3] = local_20[3] & 0xffffffbf;
  // DEVIATION: Win32 — local_20[3] = local_20[3] | 0x20;
  // DEVIATION: Win32 — local_20[3] = local_20[3] & 0xfffffff7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — show_messagebox_4C18(local_10);
  // DEVIATION: Win32 — local_20[3] = local_20[3] & 0xffffffdf;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_30 = G.DAT_006385d0;
  // DEVIATION: Win32 — local_18 = (undefined4 *)0x0;
  // DEVIATION: Win32 — local_14 = 0;
  // DEVIATION: Win32 — while (local_30 != (undefined4 *)0x0) {
  // DEVIATION: Win32 — if ((*(byte *)(local_30 + 0x1c) & 1) == 0) {
  // DEVIATION: Win32 — if (((((uint)local_30[0x1c] >> 1 & 1) == 0) &&
  // DEVIATION: Win32 — (local_14 = local_14 + 1, ((uint)local_30[0x1c] >> 3 & 1) != 0)) &&
  // DEVIATION: Win32 — (*(short *)(local_30 + 0x22) != 4)) {
  // DEVIATION: Win32 — if (((uint)local_30[0x1c] >> 2 & 1) == 0) {
  // DEVIATION: Win32 — mmioAdvance((HMMIO)*local_30,(LPMMIOINFO)(local_30 + 6),0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005d6283(local_30);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_18 = local_30;
  // DEVIATION: Win32 — local_30 = (undefined4 *)local_30[0x2e];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (*(short *)(local_30 + 0x22) == 4) {
  // DEVIATION: Win32 — local_18 = local_30;
  // DEVIATION: Win32 — local_30 = (undefined4 *)local_30[0x2e];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (local_30[0x2d] != 0) {
  // DEVIATION: Win32 — local_8 = (code *)local_30[0x2d];
  // DEVIATION: Win32 — local_30[0x2d] = 0;
  // DEVIATION: Win32 — uVar1 = *(undefined2 *)((int)local_30 + 0x8a);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_30 = (undefined4 *)FUN_005d7494(local_18,local_30);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_30 = G.DAT_006385d0;
  // DEVIATION: Win32 — local_20 = (int *)local_20[7];
  // DEVIATION: Win32 — } while ((local_14 != 0) && (((uint)local_20[3] >> 5 & 1) == 0));
  // DEVIATION: Win32 — if (local_8 != (code *)0x0) {
  // DEVIATION: Win32 — (*local_8)(uVar1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 0;
}

// Source: decompiled/block_005D0000.c FUN_005d717f (784 bytes)
// sound_fill_next_buffer — fill next buffer in chain
export function FUN_005d717f(param_1) {
  // DEVIATION: Win32 — bVar2 = false;
  // DEVIATION: Win32 — if (G.DAT_006385b0 == 0) {
  // DEVIATION: Win32 — uVar3 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar1 = param_1[3];
  // DEVIATION: Win32 — *(uint *)(iVar1 + 0xc) = *(uint *)(iVar1 + 0xc) & 0xfffffffd;
  // DEVIATION: Win32 — local_20 = G.DAT_006385d0;
  // DEVIATION: Win32 — while ((local_20 != (undefined4 *)0x0 && (((uint)local_20[0x1c] >> 1 & 1) != 0))) {
  // DEVIATION: Win32 — local_20 = (undefined4 *)local_20[0x2e];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_20 == (undefined4 *)0x0) {
  // DEVIATION: Win32 — *(uint *)(iVar1 + 0xc) = *(uint *)(iVar1 + 0xc) & 0xffffffdf;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if ((*(uint *)(iVar1 + 0xc) >> 6 & 1) == 0) {
  // DEVIATION: Win32 — if (*(short *)(local_20 + 0x22) == 4) {
  // DEVIATION: Win32 — iVar4 = (*(uint *)(iVar1 + 0xc) >> 7 & 0xff) * local_20[0x27] + local_20[0xc];
  // DEVIATION: Win32 — FUN_005edc6c(*(undefined4 *)(iVar1 + 0x10),iVar4,
  // DEVIATION: Win32 — *(int *)(iVar1 + 0x18) / (int)(uint)(ushort)G.DAT_006385ac,
  // DEVIATION: Win32 — CONCAT22((short)((uint)local_20 >> 0x10),*(undefined2 *)(local_20 + 0x20)),
  // DEVIATION: Win32 — CONCAT22((short)((uint)iVar4 >> 0x10),(ushort)G.DAT_006385ac));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar4 = FUN_005d753e(local_20,*param_1,param_1[1]);
  // DEVIATION: Win32 — if (iVar4 == 1) {
  // DEVIATION: Win32 — bVar2 = true;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(uint *)(iVar1 + 0xc) = *(uint *)(iVar1 + 0xc) | 0x40;
  // DEVIATION: Win32 — local_20 = (undefined4 *)local_20[0x2e];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (; local_20 != (undefined4 *)0x0; local_20 = (undefined4 *)local_20[0x2e]) {
  // DEVIATION: Win32 — if ((((uint)local_20[0x1c] >> 1 & 1) == 0) &&
  // DEVIATION: Win32 — (iVar4 = FUN_005d778c(local_20,*param_1,param_1[1]), iVar4 == 0)) {
  // DEVIATION: Win32 — bVar2 = false;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — param_1[4] = param_1[4] & 0xfffffffe;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_20 = G.DAT_006385d0;
  // DEVIATION: Win32 — local_c = (undefined4 *)0x0;
  // DEVIATION: Win32 — while (local_20 != (undefined4 *)0x0) {
  // DEVIATION: Win32 — if ((*(byte *)(local_20 + 0x1c) & 1) == 0) {
  // DEVIATION: Win32 — if ((((uint)local_20[0x1c] >> 1 & 1) == 0) && (((uint)local_20[0x1c] >> 3 & 1) != 0)) {
  // DEVIATION: Win32 — if (*(short *)(local_20 + 0x22) == 4) {
  // DEVIATION: Win32 — FUN_005d5bec(local_20);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(short *)(local_20 + 0x22) != 4) {
  // DEVIATION: Win32 — if (((uint)local_20[0x1c] >> 2 & 1) == 0) {
  // DEVIATION: Win32 — mmioAdvance((HMMIO)*local_20,(LPMMIOINFO)(local_20 + 6),0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005d6283(local_20);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_c = local_20;
  // DEVIATION: Win32 — local_20 = (undefined4 *)local_20[0x2e];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (*(short *)(local_20 + 0x22) == 4) {
  // DEVIATION: Win32 — *(uint *)(iVar1 + 0xc) = *(uint *)(iVar1 + 0xc) | 2;
  // DEVIATION: Win32 — local_20[0x1c] = local_20[0x1c] | 2;
  // DEVIATION: Win32 — local_c = local_20;
  // DEVIATION: Win32 — local_20 = (undefined4 *)local_20[0x2e];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_20 = (undefined4 *)FUN_005d7494(local_c,local_20);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((G.DAT_006385d0 == (undefined4 *)0x0) || (bVar2)) {
  // DEVIATION: Win32 — uVar3 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar3 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar3;
}

// Source: decompiled/block_005D0000.c FUN_005d7494 (165 bytes)
// sound_remove_stream — remove a sound stream
export function FUN_005d7494(param_1, param_2) {
  // DEVIATION: Win32 — if (param_2 == (undefined4 *)0x0) {
  // DEVIATION: Win32 — uVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar2 = param_2[0x2e];
  // DEVIATION: Win32 — uVar1 = uVar2;
  // DEVIATION: Win32 — if (param_1 != 0) {
  // DEVIATION: Win32 — *(undefined4 *)(param_1 + 0xb8) = uVar2;
  // DEVIATION: Win32 — uVar1 = G.DAT_006385d0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_006385d0 = uVar1;
  // DEVIATION: Win32 — mmioClose((HMMIO)*param_2,0);
  // DEVIATION: Win32 — if (((uint)param_2[0x1c] >> 2 & 1) != 0) {
  // DEVIATION: Win32 — mmioClose((HMMIO)param_2[0x18],0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — GlobalUnlock((HGLOBAL)param_2[0x1b]);
  // DEVIATION: Win32 — GlobalFree((HGLOBAL)param_2[0x1b]);
  // DEVIATION: Win32 — G.DAT_0063858c = G.DAT_0063858c + -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar2;
}

// Source: decompiled/block_005D0000.c FUN_005d753e (590 bytes)
// sound_mix_mono — mix mono audio into buffer
export function FUN_005d753e(param_1, param_2, param_3) {
  // DEVIATION: Win32 — ushort uVar1;
  // DEVIATION: Win32 — uint uVar2;
  // DEVIATION: Win32 — undefined4 uVar3;
  // DEVIATION: Win32 — uint local_14;
  // DEVIATION: Win32 — uint local_c;
  // DEVIATION: Win32 — param_3 = param_3 / (ushort)G.DAT_006385ac;
  // DEVIATION: Win32 — if ((param_1 == 0) || ((*(byte *)(param_1 + 0x70) & 1) != 0)) {
  // DEVIATION: Win32 — local_14 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if ((*(uint *)(param_1 + 0x70) >> 2 & 1) == 0) {
  // DEVIATION: Win32 — local_c = *(int *)(param_1 + 8) - *(int *)(param_1 + 100);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_c = *(int *)(param_1 + 0x3c) - *(int *)(param_1 + 0x34);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar2 = local_c / *(ushort *)(param_1 + 0x80);
  // DEVIATION: Win32 — local_14 = param_3;
  // DEVIATION: Win32 — if (uVar2 < param_3) {
  // DEVIATION: Win32 — *(uint *)(param_1 + 0x70) = *(uint *)(param_1 + 0x70) | 1;
  // DEVIATION: Win32 — local_14 = uVar2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((uint)(*(int *)(param_1 + 0x3c) - *(int *)(param_1 + 0x34)) /
  // DEVIATION: Win32 — (uint)*(ushort *)(param_1 + 0x80) < param_3 * 2) {
  // DEVIATION: Win32 — *(uint *)(param_1 + 0x70) = *(uint *)(param_1 + 0x70) | 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(uint *)(param_1 + 0x70) = *(uint *)(param_1 + 0x70) & 0xfffffff7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — param_3 = param_3 - local_14;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_14 != 0) {
  // DEVIATION: Win32 — uVar1 = FUN_005edc6c(param_2,*(undefined4 *)(param_1 + 0x34),local_14,
  // DEVIATION: Win32 — *(undefined2 *)(param_1 + 0x80),
  // DEVIATION: Win32 — CONCAT22((short)(param_3 >> 0x10),(ushort)G.DAT_006385ac));
  // DEVIATION: Win32 — *(int *)(param_1 + 0x34) = *(int *)(param_1 + 0x34) + (uint)uVar1;
  // DEVIATION: Win32 — if ((*(short *)(param_1 + 0x88) == 4) && (*(int *)(param_1 + 0x3c) == *(int *)(param_1 + 0x34)))
  // DEVIATION: Win32 — {
  // DEVIATION: Win32 — *(undefined4 *)(param_1 + 0x34) = *(undefined4 *)(param_1 + 0x30);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(uint *)(param_1 + 0x70) = *(uint *)(param_1 + 0x70) & 0xffffffef;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_3 == 0) {
  // DEVIATION: Win32 — if ((*(uint *)(param_1 + 0x70) >> 2 & 1) == 0) {
  // DEVIATION: Win32 — *(int *)(param_1 + 100) = *(int *)(param_1 + 100) + *(ushort *)(param_1 + 0x80) * local_14;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(undefined4 *)(param_1 + 100) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar3 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — _memset((void *)(param_2 + (ushort)G.DAT_006385ac * local_14),0,(ushort)G.DAT_006385ac * param_3);
  // DEVIATION: Win32 — if ((param_1 != 0) && (local_c != 0)) {
  // DEVIATION: Win32 — *(int *)(param_1 + 100) = *(int *)(param_1 + 100) + *(ushort *)(param_1 + 0x80) * local_14;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar3 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar3;
}

// Source: decompiled/block_005D0000.c FUN_005d778c (399 bytes)
// sound_mix_stereo — mix stereo audio into buffer
export function FUN_005d778c(param_1, param_2, param_3) {
  // DEVIATION: Win32 — ushort uVar1;
  // DEVIATION: Win32 — undefined4 uVar2;
  // DEVIATION: Win32 — undefined4 local_14;
  // DEVIATION: Win32 — undefined4 local_10;
  // DEVIATION: Win32 — undefined4 local_c;
  // DEVIATION: Win32 — if ((*(uint *)(param_1 + 0x70) >> 2 & 1) == 0) {
  // DEVIATION: Win32 — local_c = *(int *)(param_1 + 8) - *(int *)(param_1 + 100);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_c = *(int *)(param_1 + 0x3c) - *(int *)(param_1 + 0x34);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_c = local_c / *(ushort *)(param_1 + 0x80);
  // DEVIATION: Win32 — param_3 = param_3 / (ushort)G.DAT_006385ac;
  // DEVIATION: Win32 — local_10 = param_3;
  // DEVIATION: Win32 — if (local_c < param_3) {
  // DEVIATION: Win32 — *(uint *)(param_1 + 0x70) = *(uint *)(param_1 + 0x70) | 1;
  // DEVIATION: Win32 — local_10 = local_c;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((uint)(*(int *)(param_1 + 0x3c) - *(int *)(param_1 + 0x34)) /
  // DEVIATION: Win32 — (uint)*(ushort *)(param_1 + 0x80) < param_3 * 2) {
  // DEVIATION: Win32 — *(uint *)(param_1 + 0x70) = *(uint *)(param_1 + 0x70) | 8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(uint *)(param_1 + 0x70) = *(uint *)(param_1 + 0x70) & 0xfffffff7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_10 != 0) {
  // DEVIATION: Win32 — uVar1 = FUN_005edcac(param_2,*(undefined4 *)(param_1 + 0x34),local_10,
  // DEVIATION: Win32 — *(undefined2 *)(param_1 + 0x80),(ushort)G.DAT_006385ac);
  // DEVIATION: Win32 — local_14 = (uint)uVar1;
  // DEVIATION: Win32 — *(int *)(param_1 + 0x34) = *(int *)(param_1 + 0x34) + local_14;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((*(uint *)(param_1 + 0x70) >> 2 & 1) == 0) {
  // DEVIATION: Win32 — *(int *)(param_1 + 100) = *(int *)(param_1 + 100) + *(ushort *)(param_1 + 0x80) * local_10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(undefined4 *)(param_1 + 100) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (((*(byte *)(param_1 + 0x70) & 1) == 0) || ((*(uint *)(param_1 + 0x70) >> 2 & 1) != 0)) {
  // DEVIATION: Win32 — uVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar2 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar2;
}

// Source: decompiled/block_005D0000.c FUN_005d791b (633 bytes)
// sound_read_and_fill — read stream and fill buffer
export function FUN_005d791b(param_1, param_2) {
  // DEVIATION: Win32 — iVar1 = G.DAT_006385d0;
  // DEVIATION: Win32 — if (*(int *)(param_2 + 0x98) == param_1) {
  // DEVIATION: Win32 — local_14 = *(int *)(G.DAT_006385d0 + 0x9c) - *(int *)(G.DAT_006385d0 + 0x68);
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — uVar3 = *(int *)(G.DAT_006385d0 + 8) -
  // DEVIATION: Win32 — (*(int *)(G.DAT_006385d0 + 0x90) - *(int *)(G.DAT_006385d0 + 0x94));
  // DEVIATION: Win32 — if (uVar3 < local_14) {
  // DEVIATION: Win32 — local_14 = uVar3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — AVIStreamRead(*(undefined4 *)(G.DAT_006385d0 + 0x84),
  // DEVIATION: Win32 — *(uint *)(G.DAT_006385d0 + 0x90) / (uint)*(ushort *)(G.DAT_006385d0 + 0x80),
  // DEVIATION: Win32 — local_14 / *(ushort *)(G.DAT_006385d0 + 0x80),*(undefined4 *)(G.DAT_006385d0 + 0x34),
  // DEVIATION: Win32 — local_14,&local_8,0);
  // DEVIATION: Win32 — *(int *)(G.DAT_006385d0 + 0x90) = *(int *)(G.DAT_006385d0 + 0x90) + local_8;
  // DEVIATION: Win32 — *(int *)(iVar1 + 0x34) = *(int *)(iVar1 + 0x34) + local_8;
  // DEVIATION: Win32 — *(int *)(G.DAT_006385d0 + 0x68) = *(int *)(G.DAT_006385d0 + 0x68) + local_8;
  // DEVIATION: Win32 — if (*(int *)(iVar1 + 0x3c) == *(int *)(iVar1 + 0x34)) {
  // DEVIATION: Win32 — *(undefined4 *)(iVar1 + 0x34) = *(undefined4 *)(iVar1 + 0x30);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(uint *)(G.DAT_006385d0 + 0x9c) <= *(uint *)(G.DAT_006385d0 + 0x68)) {
  // DEVIATION: Win32 — *(uint *)(param_1 + 0xc) = *(uint *)(param_1 + 0xc) | 8;
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x98) = *(undefined4 *)(param_1 + 0x1c);
  // DEVIATION: Win32 — param_1 = *(int *)(G.DAT_006385d0 + 0x98);
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x68) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(uint *)(G.DAT_006385d0 + 8) <=
  // DEVIATION: Win32 — (uint)(*(int *)(G.DAT_006385d0 + 0x90) - *(int *)(G.DAT_006385d0 + 0x94))) {
  // DEVIATION: Win32 — local_10 = 0;
  // DEVIATION: Win32 — while ((local_10 < (uint)(*(int *)(G.DAT_006385d0 + 0x9c) - *(int *)(G.DAT_006385d0 + 0x68)) &&
  // DEVIATION: Win32 — (*(uint *)(iVar1 + 0x34) < *(uint *)(iVar1 + 0x3c)))) {
  // DEVIATION: Win32 — **(undefined1 **)(iVar1 + 0x34) = 0x80;
  // DEVIATION: Win32 — *(int *)(iVar1 + 0x34) = *(int *)(iVar1 + 0x34) + 1;
  // DEVIATION: Win32 — local_10 = local_10 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(int *)(iVar1 + 0x3c) == *(int *)(iVar1 + 0x34)) {
  // DEVIATION: Win32 — *(undefined4 *)(iVar1 + 0x34) = *(undefined4 *)(iVar1 + 0x30);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(uint *)(param_1 + 0xc) = *(uint *)(param_1 + 0xc) & 0xfffffff7;
  // DEVIATION: Win32 — *(uint *)(param_1 + 0xc) = *(uint *)(param_1 + 0xc) | 2;
  // DEVIATION: Win32 — *(uint *)(G.DAT_006385d0 + 0x70) = *(uint *)(G.DAT_006385d0 + 0x70) | 1;
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x98) = *(undefined4 *)(param_1 + 0x1c);
  // DEVIATION: Win32 — *(undefined4 *)(G.DAT_006385d0 + 0x68) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar2 = 0xd;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar2;
}

// Source: decompiled/block_005D0000.c FUN_005d7b94 (107 bytes)
// sound_is_tag_playing — check if tag is currently playing
export function FUN_005d7b94(param_1) {
  // DEVIATION: Win32 — local_c = G.DAT_006385d0;
  // DEVIATION: Win32 — while( true ) {
  // DEVIATION: Win32 — if (local_c == 0) {
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(short *)(local_c + 0x8a) == param_1) break;
  // DEVIATION: Win32 — local_c = *(int *)(local_c + 0xb8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 1;
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Stream / memory utilities
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005d7c00 (44 bytes)
// stream_init — initialize stream struct
export function FUN_005d7c00() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d7c2c (66 bytes)
// stream_realloc — reallocate stream buffer
export function FUN_005d7c2c(param_1, param_2) {
  // DEVIATION: Win32 — if (param_2 == 1) {
  // DEVIATION: Win32 — Realloc(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — Realloc(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return in_ECX;
}

// Source: decompiled/block_005D0000.c FUN_005d7c6e (30 bytes)
// stream_finalize — finalize stream
export function FUN_005d7c6e() {
  // DEVIATION: Win32 — thunk_FUN_00421c30();
}

// Source: decompiled/block_005D0000.c FUN_005d7c8c (28 bytes)
// debug_output_string — output debug string
export function FUN_005d7c8c(param_1) {
  // DEVIATION: Win32 — FUN_005d8d06(param_1);
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Bitmap / sprite window creation
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005d7cb0 (706 bytes)
// create_sprite_window — create sprite display window
export function FUN_005d7cb0(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — *(undefined1 *)(in_ECX + 200) = 0;
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00511320();
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0xc4) = uVar1;
  // DEVIATION: Win32 — SetRect(&local_3c,param_3,param_4,param_5 + param_3,param_4 + param_6);
  // DEVIATION: Win32 — thunk_FUN_0040f730(param_1,6,param_2,&local_3c);
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x2c) = 0;
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x30) = 0;
  // DEVIATION: Win32 — FUN_005cda06(&local_48,&local_4c);
  // DEVIATION: Win32 — FUN_005cd775(1,1);
  // DEVIATION: Win32 — FUN_005bd65c(param_5,param_6);
  // DEVIATION: Win32 — FUN_005bd65c(param_5,param_6);
  // DEVIATION: Win32 — FUN_005c041f(param_8);
  // DEVIATION: Win32 — FUN_005c041f(param_8);
  // DEVIATION: Win32 — local_40 = param_5 >> 1;
  // DEVIATION: Win32 — local_44 = param_6 >> 1;
  // DEVIATION: Win32 — FUN_005cf3c5(&local_50,&local_54);
  // DEVIATION: Win32 — local_28 = thunk_FUN_00451830();
  // DEVIATION: Win32 — local_28 = local_28 >> 1;
  // DEVIATION: Win32 — local_2c = thunk_FUN_00451860();
  // DEVIATION: Win32 — local_2c = local_2c >> 1;
  // DEVIATION: Win32 — FUN_005cf39b(-local_28,-local_2c);
  // DEVIATION: Win32 — FUN_005cef31(local_64,in_ECX + 0x7c,local_40,local_44);
  // DEVIATION: Win32 — FUN_005cef31(local_74,in_ECX + 0x34,local_40,local_44);
  // DEVIATION: Win32 — FUN_005cf39b(local_50,local_54);
  // DEVIATION: Win32 — FUN_005cd775(local_48,local_4c);
  // DEVIATION: MFC — pCVar2 = COleClientItem::GetActiveView((COleClientItem *)(in_ECX + 0x7c));
  // DEVIATION: Win32 — pCVar2 = pCVar2 + param_4 + -1;
  // DEVIATION: MFC — pCVar3 = COleClientItem::GetActiveView((COleClientItem *)(in_ECX + 0x7c));
  // DEVIATION: Win32 — SetRect(&local_3c,param_3,param_4,(int)(pCVar3 + param_3 + -1),(int)pCVar2);
  // DEVIATION: Win32 — OffsetRect(&local_3c,-local_3c.left,-local_3c.top);
  // DEVIATION: Win32 — local_24.left = local_3c.left;
  // DEVIATION: Win32 — local_24.top = local_3c.top;
  // DEVIATION: Win32 — local_24.right = local_3c.right;
  // DEVIATION: Win32 — local_24.bottom = local_3c.bottom;
  // DEVIATION: Win32 — SetRect(&local_24,local_3c.left,local_3c.top,local_3c.right + -2,local_3c.bottom + -2);
  // DEVIATION: Win32 — local_14 = local_24.left;
  // DEVIATION: Win32 — local_10 = local_24.top;
  // DEVIATION: Win32 — local_c = local_24.right;
  // DEVIATION: Win32 — local_8 = local_24.bottom;
  // DEVIATION: Win32 — OffsetRect(&local_24,2,2);
  // DEVIATION: Win32 — FUN_005c041f(G.DAT_00638b40);
  // DEVIATION: Win32 — FUN_005c0593(in_ECX + 0x7c,&local_14,&local_24);
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00511320();
  // DEVIATION: Win32 — FUN_005c0d12(uVar1);
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00511320();
  // DEVIATION: Win32 — FUN_005c0d12(uVar1);
  // DEVIATION: Win32 — uVar1 = create_window_B601(param_3,param_4,param_5,param_6,in_ECX,1);
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x1c) = uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d7f72 (708 bytes)
// create_sprite_window_ex — create sprite window with extra param
export function FUN_005d7f72(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  // DEVIATION: Win32 — *(undefined1 *)(in_ECX + 200) = 0;
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00511320();
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0xc4) = uVar1;
  // DEVIATION: Win32 — SetRect(&local_3c,param_3,param_4,param_5 + param_3,param_6 + param_4);
  // DEVIATION: Win32 — thunk_FUN_0040f730(param_1,6,param_2,&local_3c);
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x2c) = 0;
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x30) = 0;
  // DEVIATION: Win32 — FUN_005cda06(&local_48,&local_4c);
  // DEVIATION: Win32 — FUN_005cd775(1,1);
  // DEVIATION: Win32 — FUN_005bd65c(param_5,param_6);
  // DEVIATION: Win32 — FUN_005bd65c(param_5,param_6);
  // DEVIATION: Win32 — FUN_005c041f(param_8);
  // DEVIATION: Win32 — FUN_005c041f(param_8);
  // DEVIATION: Win32 — local_40 = param_5 >> 1;
  // DEVIATION: Win32 — local_44 = param_6 >> 1;
  // DEVIATION: Win32 — FUN_005cf3c5(&local_50,&local_54);
  // DEVIATION: Win32 — local_28 = thunk_FUN_00451830();
  // DEVIATION: Win32 — local_28 = local_28 >> 1;
  // DEVIATION: Win32 — local_2c = thunk_FUN_00451860();
  // DEVIATION: Win32 — local_2c = local_2c >> 1;
  // DEVIATION: Win32 — FUN_005cf39b(-local_28,-local_2c);
  // DEVIATION: Win32 — FUN_005cef31(local_64,in_ECX + 0x7c,local_40,local_44);
  // DEVIATION: Win32 — FUN_005cef31(local_74,in_ECX + 0x34,local_40,local_44);
  // DEVIATION: Win32 — FUN_005cf39b(local_50,local_54);
  // DEVIATION: Win32 — FUN_005cd775(local_48,local_4c);
  // DEVIATION: MFC — pCVar2 = COleClientItem::GetActiveView((COleClientItem *)(in_ECX + 0x7c));
  // DEVIATION: Win32 — pCVar2 = pCVar2 + param_4 + -1;
  // DEVIATION: MFC — pCVar3 = COleClientItem::GetActiveView((COleClientItem *)(in_ECX + 0x7c));
  // DEVIATION: Win32 — SetRect(&local_3c,param_3,param_4,(int)(pCVar3 + param_3 + -1),(int)pCVar2);
  // DEVIATION: Win32 — OffsetRect(&local_3c,-local_3c.left,-local_3c.top);
  // DEVIATION: Win32 — local_24.left = local_3c.left;
  // DEVIATION: Win32 — local_24.top = local_3c.top;
  // DEVIATION: Win32 — local_24.right = local_3c.right;
  // DEVIATION: Win32 — local_24.bottom = local_3c.bottom;
  // DEVIATION: Win32 — SetRect(&local_24,local_3c.left,local_3c.top,local_3c.right + -2,local_3c.bottom + -2);
  // DEVIATION: Win32 — local_14 = local_24.left;
  // DEVIATION: Win32 — local_10 = local_24.top;
  // DEVIATION: Win32 — local_c = local_24.right;
  // DEVIATION: Win32 — local_8 = local_24.bottom;
  // DEVIATION: Win32 — OffsetRect(&local_24,2,2);
  // DEVIATION: Win32 — FUN_005c041f(G.DAT_00638b40);
  // DEVIATION: Win32 — FUN_005c0593(in_ECX + 0x7c,&local_14,&local_24);
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00511320();
  // DEVIATION: Win32 — FUN_005c0d12(uVar1);
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00511320();
  // DEVIATION: Win32 — FUN_005c0d12(uVar1);
  // DEVIATION: Win32 — uVar1 = create_window_B601(param_3,param_4,param_5,param_6,in_ECX,param_9);
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x1c) = uVar1;
}

// set_bitmap_draw_callback
export function FUN_005d8236(param_1) { PTR_DAT_00637e60 = param_1; }


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: File I/O
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005d8250 (32 bytes)
// file_open — open file wrapper
export function FUN_005d8250(param_1, param_2) {
  // DEVIATION: Win32 — FUN_005d8270(param_1,param_2);
}

// Source: decompiled/block_005D0000.c FUN_005d8270 (321 bytes)
// file_open_impl — open file implementation
export function FUN_005d8270(param_1, param_2) {
  // DEVIATION: Win32 — HFILE HVar2;
  // DEVIATION: Win32 — undefined4 uVar3;
  // DEVIATION: Win32 — char local_108 [260];
  // DEVIATION: Win32 — pcVar1 = _strchr(param_1,0x5c);
  // DEVIATION: Win32 — if (pcVar1 == (char *)0x0) {
  // DEVIATION: Win32 — __getcwd(local_108,0x104);
  // DEVIATION: Win32 — FUN_005f22e0(local_108,&G.DAT_0063863c);
  // DEVIATION: Win32 — FUN_005f22e0(local_108,param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005f22d0(local_108,param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — HVar2 = OpenFile(local_108,(LPOFSTRUCT)(param_2 + 2),0x4000);
  // DEVIATION: Win32 — if (HVar2 == -1) {
  // DEVIATION: Win32 — uVar3 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — HVar2 = OpenFile(local_108,(LPOFSTRUCT)(param_2 + 2),2);
  // DEVIATION: Win32 — param_2[1] = HVar2;
  // DEVIATION: Win32 — if (param_2[1] == -1) {
  // DEVIATION: Win32 — *param_2 = 0;
  // DEVIATION: Win32 — HVar2 = OpenFile(local_108,(LPOFSTRUCT)(param_2 + 2),0);
  // DEVIATION: Win32 — param_2[1] = HVar2;
  // DEVIATION: Win32 — param_2[0x25] = 0;
  // DEVIATION: Win32 — param_2[0x24] = 0;
  // DEVIATION: Win32 — if (param_2[1] == -1) {
  // DEVIATION: Win32 — param_2[1] = 0;
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *param_2 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar3 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar3;
}

// Source: decompiled/block_005D0000.c FUN_005d83b6 (32 bytes)
// file_create — create new file wrapper
export function FUN_005d83b6(param_1, param_2) {
  // DEVIATION: Win32 — FUN_005d83d6(param_1,param_2);
}

// Source: decompiled/block_005D0000.c FUN_005d83d6 (155 bytes)
// file_create_impl — create new file implementation
export function FUN_005d83d6(param_1, param_2) {
  // DEVIATION: Win32 — pvVar2 = CreateFileA(param_1,0xc0000000,0,(LPSECURITY_ATTRIBUTES)0x0,2,0x80,(HANDLE)0x0);
  // DEVIATION: Win32 — param_2[1] = pvVar2;
  // DEVIATION: Win32 — iVar1 = param_2[1];
  // DEVIATION: Win32 — if (iVar1 != -1) {
  // DEVIATION: Win32 — *param_2 = 1;
  // DEVIATION: Win32 — param_2[0x25] = 0;
  // DEVIATION: Win32 — param_2[0x24] = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — param_2[1] = 0;
  // DEVIATION: Win32 — *param_2 = 0;
  // DEVIATION: Win32 — param_2[0x25] = 0;
  // DEVIATION: Win32 — param_2[0x24] = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return iVar1 != -1;
}

// Source: decompiled/block_005D0000.c FUN_005d8476 (123 bytes)
// file_close — close file handle
export function FUN_005d8476(param_1) {
  // DEVIATION: Win32 — if (*(int *)(param_1 + 4) == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if ((*(int *)(param_1 + 0x94) != 0) || (*(int *)(param_1 + 0x90) != 0)) {
  // DEVIATION: Win32 — FUN_005d8ab8(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — BVar2 = CloseHandle(*(HANDLE *)(param_1 + 4));
  // DEVIATION: Win32 — if (BVar2 == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(undefined4 *)(param_1 + 4) = 0;
  // DEVIATION: Win32 — uVar1 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d84f6 (86 bytes)
// file_read — read from file
export function FUN_005d84f6(param_1, param_2, param_3) {
  // DEVIATION: Win32 — if (*(int *)(param_1 + 4) == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — BVar2 = ReadFile(*(HANDLE *)(param_1 + 4),param_2,param_3,&local_8,(LPOVERLAPPED)0x0);
  // DEVIATION: Win32 — if (BVar2 == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d8551 (209 bytes)
// file_find_string — search for string in file
export function FUN_005d8551(param_1, param_2) {
  // DEVIATION: Win32 — size_t local_8;
  // DEVIATION: Win32 — local_14 = 0;
  // DEVIATION: Win32 — local_c = 0;
  // DEVIATION: Win32 — if (*(int *)(param_1 + 4) == 0) {
  // DEVIATION: Win32 — local_c = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = _strlen(param_2);
  // DEVIATION: Win32 — if (local_8 == 0) {
  // DEVIATION: Win32 — local_c = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — do {
  // DEVIATION: Win32 — while( true ) {
  // DEVIATION: Win32 — lVar1 = _hread(*(HFILE *)(param_1 + 4),local_10,1);
  // DEVIATION: Win32 — if (lVar1 != 1) {
  // DEVIATION: Win32 — return local_c;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_2[local_14] == local_10[0]) break;
  // DEVIATION: Win32 — local_14 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_14 = local_14 + 1;
  // DEVIATION: Win32 — } while (param_2[local_14] != '\0');
  // DEVIATION: Win32 — local_c = 1;
  // DEVIATION: Win32 — _llseek(*(HFILE *)(param_1 + 4),-local_8,1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_c;
}

// Source: decompiled/block_005D0000.c FUN_005d8622 (78 bytes)
// file_seek_relative — seek relative to current
export function FUN_005d8622(param_1, param_2) {
  // DEVIATION: Win32 — if (*(int *)(param_1 + 4) == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — DVar2 = SetFilePointer(*(HANDLE *)(param_1 + 4),param_2,(PLONG)0x0,1);
  // DEVIATION: Win32 — if (DVar2 == 0xffffffff) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d8675 (78 bytes)
// file_seek_absolute — seek from beginning
export function FUN_005d8675(param_1, param_2) {
  // DEVIATION: Win32 — if (*(int *)(param_1 + 4) == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — DVar2 = SetFilePointer(*(HANDLE *)(param_1 + 4),param_2,(PLONG)0x0,0);
  // DEVIATION: Win32 — if (DVar2 == 0xffffffff) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d86c8 (84 bytes)
// file_get_size — get file size
export function FUN_005d86c8(param_1, param_2) {
  // DEVIATION: Win32 — if (*(int *)(param_1 + 4) == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — DVar2 = SetFilePointer(*(HANDLE *)(param_1 + 4),0,(PLONG)0x0,0);
  // DEVIATION: Win32 — *param_2 = DVar2;
  // DEVIATION: Win32 — if (*param_2 == 0xffffffff) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d8721 (118 bytes)
// file_write — write to file
export function FUN_005d8721(param_1, param_2, param_3) {
  // DEVIATION: Win32 — if (param_1[1] == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (*param_1 == 0) {
  // DEVIATION: Win32 — debug_log(s_Error__Tried_to_write_to_a_read_o_00638640);
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — BVar2 = WriteFile((HANDLE)param_1[1],param_2,param_3,&local_8,(LPOVERLAPPED)0x0);
  // DEVIATION: Win32 — if (BVar2 == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d879c (128 bytes)
// file_write_line — write string + newline
export function FUN_005d879c(param_1, param_2) {
  // DEVIATION: Win32 — size_t sVar2;
  // DEVIATION: Win32 — uint uVar3;
  // DEVIATION: Win32 — if (param_1[1] == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (*param_1 == 0) {
  // DEVIATION: Win32 — debug_log(s_Error__Tried_to_write_to_a_read_o_0063866c);
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — sVar2 = _strlen(param_2);
  // DEVIATION: Win32 — uVar1 = FUN_005d8721(param_1,param_2,sVar2);
  // DEVIATION: Win32 — uVar3 = FUN_005d8721(param_1,&G.DAT_00638698,2);
  // DEVIATION: Win32 — uVar1 = uVar1 & uVar3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d881c (370 bytes)
// file_read_line — read a line from file
export function FUN_005d881c(param_1, param_2, param_3) {
  // DEVIATION: Win32 — local_14 = 0;
  // DEVIATION: Win32 — local_c = param_2;
  // DEVIATION: Win32 — *param_2 = '\0';
  // DEVIATION: Win32 — if (*(int *)(param_1 + 4) == 0) {
  // DEVIATION: Win32 — local_18 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_18 = ReadFile(*(HANDLE *)(param_1 + 4),local_8,1,&local_10,(LPOVERLAPPED)0x0);
  // DEVIATION: Win32 — if (local_10 == 0) {
  // DEVIATION: Win32 — local_18 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — while (((((local_18 != 0 && (local_10 != 0)) && (local_8[0] != '\n')) &&
  // DEVIATION: Win32 — ((local_8[0] != '\r' && (local_8[0] != '\0')))) && (local_14 < param_3))) {
  // DEVIATION: Win32 — if (((local_8[0] != '\r') && (local_8[0] != '\n')) && (local_8[0] != '\0')) {
  // DEVIATION: Win32 — *local_c = local_8[0];
  // DEVIATION: Win32 — local_c = local_c + 1;
  // DEVIATION: Win32 — local_14 = local_14 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_18 = ReadFile(*(HANDLE *)(param_1 + 4),local_8,1,&local_10,(LPOVERLAPPED)0x0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *local_c = '\0';
  // DEVIATION: Win32 — while (((local_18 != 0 && (local_10 != 0)) && ((local_8[0] == '\n' || (local_8[0] == '\r')))))
  // DEVIATION: Win32 — {
  // DEVIATION: Win32 — local_18 = ReadFile(*(HANDLE *)(param_1 + 4),local_8,1,&local_10,(LPOVERLAPPED)0x0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_10 != 0) {
  // DEVIATION: Win32 — FUN_005d8622(param_1,0xffffffff);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_18;
}

// Source: decompiled/block_005D0000.c FUN_005d898e (90 bytes)
// file_get_byte_size — get file size in bytes
export function FUN_005d898e(param_1) {
  // DEVIATION: Win32 — if (*(int *)(param_1 + 4) == 0) {
  // DEVIATION: Win32 — DVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — DVar1 = GetFileSize(*(HANDLE *)(param_1 + 4),(LPDWORD)0x0);
  // DEVIATION: Win32 — if (DVar1 == 0xffffffff) {
  // DEVIATION: Win32 — debug_log(s_Bad_file_handle_in_MSFileSize_0063869c);
  // DEVIATION: Win32 — DVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return DVar1;
}

// Source: decompiled/block_005D0000.c FUN_005d89e8 (196 bytes)
// file_memory_map — memory-map a file
export function FUN_005d89e8(param_1, param_2, param_3) {
  // DEVIATION: Win32 — if ((*(int *)(param_1 + 0x94) == 0) && (*(int *)(param_1 + 0x90) == 0)) {
  // DEVIATION: Win32 — pvVar1 = CreateFileMappingA(*(HANDLE *)(param_1 + 4),(LPSECURITY_ATTRIBUTES)0x0,2,0,0,
  // DEVIATION: Win32 — (LPCSTR)0x0);
  // DEVIATION: Win32 — *(HANDLE *)(param_1 + 0x94) = pvVar1;
  // DEVIATION: Win32 — if (*(int *)(param_1 + 0x94) == 0) {
  // DEVIATION: Win32 — uVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — pvVar3 = MapViewOfFile(*(HANDLE *)(param_1 + 0x94),4,0,param_2,param_3);
  // DEVIATION: Win32 — *(LPVOID *)(param_1 + 0x90) = pvVar3;
  // DEVIATION: Win32 — if (*(int *)(param_1 + 0x90) == 0) {
  // DEVIATION: Win32 — uVar2 = FUN_005d8ab8(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar2 = *(undefined4 *)(param_1 + 0x90);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar2 = *(undefined4 *)(param_1 + 0x90);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar2;
}

// Source: decompiled/block_005D0000.c FUN_005d8ab8 (124 bytes)
// file_unmap — unmap memory-mapped file
export function FUN_005d8ab8(param_1) {
  // DEVIATION: Win32 — if ((*(int *)(param_1 + 0x94) != 0) && (*(int *)(param_1 + 0x90) != 0)) {
  // DEVIATION: Win32 — UnmapViewOfFile(*(LPCVOID *)(param_1 + 0x90));
  // DEVIATION: Win32 — *(undefined4 *)(param_1 + 0x90) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(int *)(param_1 + 0x94) != 0) {
  // DEVIATION: Win32 — CloseHandle(*(HANDLE *)(param_1 + 0x94));
  // DEVIATION: Win32 — *(undefined4 *)(param_1 + 0x94) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 0;
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: File dialog / strftime / misc
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005d8b34 (40 bytes)
// strftime_wrapper — format time with strftime
export function FUN_005d8b34(param_1, param_2, param_3) {
  // DEVIATION: Win32 — FUN_005d8bde(param_1,param_2,0,param_3,0);
}

// Source: decompiled/block_005D0000.c _strftime (42 bytes)
// strftime — C library strftime
export function _strftime(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005d8b86 (42 bytes)
// strftime_alt — alternate strftime call
export function FUN_005d8b86(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — FUN_005d8bde(param_1,param_2,param_3,param_4,1);
}

// Source: decompiled/block_005D0000.c FUN_005d8bb0 (46 bytes)
// file_save_dialog — show save file dialog
export function FUN_005d8bb0(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — show_open_dialog_8C0C(param_1,param_2,param_3,param_4,1,param_5);
}

// Source: decompiled/block_005D0000.c FUN_005d8bde (46 bytes)
// file_open_dialog_wrapper — show open/save dialog wrapper
export function FUN_005d8bde(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — show_open_dialog_8C0C(param_1,param_2,param_3,param_4,param_5,0);
}

// Source: decompiled/block_005D0000.c show_open_dialog_8C0C (250 bytes)
// show_file_dialog — show open/save file dialog
export function show_open_dialog_8C0C(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — LPCSTR local_4c;
  // DEVIATION: Win32 — DWORD local_40;
  // DEVIATION: Win32 — LPSTR local_3c;
  // DEVIATION: Win32 — DWORD local_38;
  // DEVIATION: Win32 — char *local_28;
  // DEVIATION: Win32 — DWORD local_24;
  // DEVIATION: Win32 — LPCSTR local_1c;
  // DEVIATION: Win32 — LPSTR local_c;
  // DEVIATION: Win32 — DWORD local_8;
  // DEVIATION: Win32 — local_c = param_1;
  // DEVIATION: Win32 — _memset(&local_58,0,0x4c);
  // DEVIATION: Win32 — local_58 = 0x4c;
  // DEVIATION: Win32 — if (param_6 == 0) {
  // DEVIATION: Win32 — local_54 = (HWND)0x0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_54 = *(HWND *)(param_6 + 4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_4c = param_2;
  // DEVIATION: Win32 — local_40 = 1;
  // DEVIATION: Win32 — local_3c = local_c;
  // DEVIATION: Win32 — local_38 = 0x100;
  // DEVIATION: Win32 — local_28 = s_Select_a_File_006386bc;
  // DEVIATION: Win32 — local_1c = param_3;
  // DEVIATION: Win32 — if (param_4 == '\0') {
  // DEVIATION: Win32 — local_24 = 0x80e;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_24 = 0x180e;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_5 == '\0') {
  // DEVIATION: Win32 — BVar1 = GetOpenFileNameA((LPOPENFILENAMEA)&local_58);
  // DEVIATION: Win32 — local_5c = (char)BVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — BVar1 = GetSaveFileNameA((LPOPENFILENAMEA)&local_58);
  // DEVIATION: Win32 — local_5c = (char)BVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_5c == '\x01') {
  // DEVIATION: Win32 — uVar2 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = CommDlgExtendedError();
  // DEVIATION: Win32 — if (local_8 != 0) {
  // DEVIATION: Win32 — FUN_005d2279(s_Error__GetOpenFileName_returned_006386cc,local_8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar2;
}

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

// Source: decompiled/block_005D0000.c create_window_8E3F (1239 bytes)
// create_button_array — create array of button controls
export function create_window_8E3F(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — size_t sVar12;
  // DEVIATION: Win32 — int iVar13;
  // DEVIATION: Win32 — HMENU hMenu;
  // DEVIATION: Win32 — HINSTANCE hInstance;
  // DEVIATION: Win32 — LPVOID lpParam;
  // DEVIATION: Win32 — int local_44;
  // DEVIATION: Win32 — DWORD local_40;
  // DEVIATION: Win32 — uint local_28;
  // DEVIATION: Win32 — char *local_18;
  // DEVIATION: Win32 — char *local_10;
  // DEVIATION: Win32 — char local_c [4];
  // DEVIATION: Win32 — int local_8;
  // DEVIATION: Win32 — pHVar2 = LoadBitmapA(G.DAT_006e4ff0,(LPCSTR)0x12d);
  // DEVIATION: Win32 — pHVar3 = LoadBitmapA(G.DAT_006e4ff0,(LPCSTR)0x12f);
  // DEVIATION: Win32 — pHVar4 = LoadBitmapA(G.DAT_006e4ff0,(LPCSTR)0x12e);
  // DEVIATION: Win32 — uVar5 = FUN_005dce4f(param_5 * 0xa4);
  // DEVIATION: Win32 — iVar6 = FUN_005dcdf9(uVar5);
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00407f90(param_2);
  // DEVIATION: Win32 — iVar7 = iVar7 / param_3;
  // DEVIATION: Win32 — iVar8 = thunk_FUN_00407fc0(param_2);
  // DEVIATION: Win32 — iVar8 = (iVar8 * param_3) / param_5;
  // DEVIATION: Win32 — nHeight = gdi_8DA1(param_8);
  // DEVIATION: Win32 — local_44 = *param_2;
  // DEVIATION: Win32 — local_8 = param_2[1];
  // DEVIATION: Win32 — local_40 = 0x40010000;
  // DEVIATION: Win32 — if (param_7 != 0) {
  // DEVIATION: Win32 — local_40 = 0x50010000;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_28 = 0;
  // DEVIATION: Win32 — do {
  // DEVIATION: Win32 — if (param_5 <= (int)local_28) {
  // DEVIATION: Win32 — *param_1 = param_5;
  // DEVIATION: Win32 — FUN_005dce29(uVar5);
  // DEVIATION: Win32 — return uVar5;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — lpParam = (LPVOID)0x0;
  // DEVIATION: Win32 — hMenu = (HMENU)0x0;
  // DEVIATION: Win32 — hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar9 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — iVar10 = iVar8 >> 1;
  // DEVIATION: Win32 — iVar13 = nHeight >> 1;
  // DEVIATION: Win32 — pHVar11 = CreateWindowExA(4,s_MSControlClass_00638708,&G.DAT_00638704,local_40,local_44,
  // DEVIATION: Win32 — (iVar10 - iVar13) + local_8,iVar7,nHeight,*(HWND *)(iVar9 + 4),hMenu,
  // DEVIATION: Win32 — hInstance,lpParam);
  // DEVIATION: Win32 — *(HWND *)(iVar6 + local_28 * 0xa4) = pHVar11;
  // DEVIATION: Win32 — iVar9 = FUN_005c9499(*(undefined4 *)(iVar6 + local_28 * 0xa4),param_4);
  // DEVIATION: Win32 — if (local_28 == 0) {
  // DEVIATION: Win32 — *(undefined4 *)(iVar9 + 8) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(undefined4 *)(iVar9 + 8) = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(HBITMAP *)(iVar9 + 0xc) = pHVar2;
  // DEVIATION: Win32 — *(HBITMAP *)(iVar9 + 0x10) = pHVar3;
  // DEVIATION: Win32 — *(HBITMAP *)(iVar9 + 0x14) = pHVar4;
  // DEVIATION: Win32 — *(uint *)(iVar9 + 0x24) = local_28 * 0xa4 + iVar6;
  // DEVIATION: Win32 — *(undefined4 *)(iVar9 + 0x2c) = 3;
  // DEVIATION: Win32 — SetWindowLongA(*(HWND *)(iVar6 + local_28 * 0xa4),-4,0x5d9b86);
  // DEVIATION: Win32 — SetRect((LPRECT)(local_28 * 0xa4 + iVar6 + 4),local_44,(iVar10 - iVar13) + local_8,
  // DEVIATION: Win32 — local_44 + iVar7,(iVar10 - iVar13) + local_8 + nHeight);
  // DEVIATION: Win32 — *(uint *)(iVar6 + 0x14 + local_28 * 0xa4) = local_28;
  // DEVIATION: Win32 — local_10 = *(char **)(param_6 + local_28 * 4);
  // DEVIATION: Win32 — if (*local_10 == '!') {
  // DEVIATION: Win32 — *(undefined4 *)(iVar6 + 0x18 + local_28 * 0xa4) = 0;
  // DEVIATION: Win32 — local_10 = local_10 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (*local_10 == '^') {
  // DEVIATION: Win32 — *(undefined4 *)(iVar6 + 0x18 + local_28 * 0xa4) = 1;
  // DEVIATION: Win32 — thunk_FUN_004472f0(local_28);
  // DEVIATION: Win32 — local_10 = local_10 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(undefined4 *)(iVar6 + 0x18 + local_28 * 0xa4) = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005f22d0(local_28 * 0xa4 + iVar6 + 0x1c,local_10);
  // DEVIATION: Win32 — local_18 = (char *)(local_28 * 0xa4 + iVar6 + 0x1c);
  // DEVIATION: Win32 — *(undefined4 *)(iVar6 + 0xa0 + local_28 * 0xa4) = 0;
  // DEVIATION: Win32 — while( true ) {
  // DEVIATION: Win32 — if (*local_18 == '\0') goto LAB_005d9226;
  // DEVIATION: Win32 — if (*local_18 == '~') break;
  // DEVIATION: Win32 — piVar1 = (int *)(iVar6 + 0xa0 + local_28 * 0xa4);
  // DEVIATION: Win32 — *piVar1 = *piVar1 + 1;
  // DEVIATION: Win32 — local_18 = local_18 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_28 = *(uint *)(iVar6 + 0xa0 + local_28 * 0xa4);
  // DEVIATION: Win32 — sVar12 = _strlen((char *)(local_28 * 0xa4 + iVar6 + 0x1c)), local_28 < sVar12;
  // DEVIATION: Win32 — local_28 = local_28 + 1) {
  // DEVIATION: Win32 — *(undefined1 *)(local_28 * 0xa5 + 0x1c + iVar6) =
  // DEVIATION: Win32 — *(undefined1 *)(local_28 * 0xa5 + 0x1d + iVar6);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LAB_005d9226:
  // DEVIATION: Win32 — sVar12 = _strlen((char *)(local_28 * 0xa4 + iVar6 + 0x1c));
  // DEVIATION: Win32 — if (*(uint *)(iVar6 + 0xa0 + local_28 * 0xa4) < sVar12) {
  // DEVIATION: Win32 — local_c[0] = *(char *)(*(int *)(iVar6 + 0xa0 + local_28 * 0xa4) + local_28 * 0xa4 + 0x1c +
  // DEVIATION: Win32 — iVar6);
  // DEVIATION: Win32 — local_c[1] = 0;
  // DEVIATION: Win32 — __strlwr(local_c);
  // DEVIATION: Win32 — *(char *)(iVar6 + 0x9c + local_28 * 0xa4) = local_c[0];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(undefined4 *)(iVar6 + 0xa0 + local_28 * 0xa4) = 0xffffffff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = local_8 + iVar8;
  // DEVIATION: Win32 — if (param_2[3] <= local_8) {
  // DEVIATION: Win32 — local_44 = local_44 + iVar7;
  // DEVIATION: Win32 — local_8 = param_2[1];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_28 = local_28 + 1;
  // DEVIATION: Win32 — } while( true );
}

// Source: decompiled/block_005D0000.c create_window_931B (1748 bytes)
// create_button_array_from_string — create buttons from underscore-delimited string
export function create_window_931B(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — size_t sVar13;
  // DEVIATION: Win32 — int iVar14;
  // DEVIATION: Win32 — uint uVar15;
  // DEVIATION: Win32 — HMENU hMenu;
  // DEVIATION: Win32 — HINSTANCE hInstance;
  // DEVIATION: Win32 — LPVOID lpParam;
  // DEVIATION: Win32 — int local_44c;
  // DEVIATION: Win32 — DWORD local_448;
  // DEVIATION: Win32 — uint local_430;
  // DEVIATION: Win32 — int local_42c;
  // DEVIATION: Win32 — int local_428;
  // DEVIATION: Win32 — char *local_418;
  // DEVIATION: Win32 — char *local_410;
  // DEVIATION: Win32 — char local_40c [4];
  // DEVIATION: Win32 — char local_408 [1024];
  // DEVIATION: Win32 — int local_8;
  // DEVIATION: Win32 — pHVar2 = LoadBitmapA(G.DAT_006e4ff0,(LPCSTR)0x12d);
  // DEVIATION: Win32 — pHVar3 = LoadBitmapA(G.DAT_006e4ff0,(LPCSTR)0x12f);
  // DEVIATION: Win32 — pHVar4 = LoadBitmapA(G.DAT_006e4ff0,(LPCSTR)0x12e);
  // DEVIATION: Win32 — _strncpy(local_408,param_5,0x400);
  // DEVIATION: Win32 — uVar5 = FUN_005d8d50(local_408);
  // DEVIATION: Win32 — local_410 = local_408;
  // DEVIATION: Win32 — uVar6 = FUN_005dce4f(uVar5 * 0xa4);
  // DEVIATION: Win32 — iVar7 = FUN_005dcdf9(uVar6);
  // DEVIATION: Win32 — iVar8 = thunk_FUN_00407f90(param_2);
  // DEVIATION: Win32 — iVar8 = iVar8 / param_3;
  // DEVIATION: Win32 — if ((param_3 == 1) ||
  // DEVIATION: Win32 — (uVar15 = (int)uVar5 >> 0x1f, ((uVar5 ^ uVar15) - uVar15 & 1 ^ uVar15) == uVar15)) {
  // DEVIATION: Win32 — iVar9 = thunk_FUN_00407fc0(param_2);
  // DEVIATION: Win32 — local_428 = (iVar9 * param_3) / (int)uVar5;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar9 = thunk_FUN_00407fc0(param_2);
  // DEVIATION: Win32 — local_428 = (iVar9 * param_3) / (int)(uVar5 + 1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar9 = gdi_8DA1(param_7);
  // DEVIATION: Win32 — local_44c = *param_2;
  // DEVIATION: Win32 — local_8 = param_2[1];
  // DEVIATION: Win32 — local_448 = 0x40010000;
  // DEVIATION: Win32 — if (param_6 != 0) {
  // DEVIATION: Win32 — local_448 = 0x50010000;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_42c = 0;
  // DEVIATION: Win32 — do {
  // DEVIATION: Win32 — if ((int)uVar5 <= local_42c) {
  // DEVIATION: Win32 — *param_1 = uVar5;
  // DEVIATION: Win32 — FUN_005dce29(uVar6);
  // DEVIATION: Win32 — return uVar6;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — lpParam = (LPVOID)0x0;
  // DEVIATION: Win32 — hMenu = (HMENU)0x0;
  // DEVIATION: Win32 — hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar10 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — iVar11 = local_428 >> 1;
  // DEVIATION: Win32 — iVar14 = iVar9 >> 1;
  // DEVIATION: Win32 — pHVar12 = CreateWindowExA(4,s_MSControlClass_0063871c,&G.DAT_00638718,local_448,local_44c,
  // DEVIATION: Win32 — (iVar11 - iVar14) + local_8,iVar8,iVar9,*(HWND *)(iVar10 + 4),hMenu,
  // DEVIATION: Win32 — hInstance,lpParam);
  // DEVIATION: Win32 — *(HWND *)(iVar7 + local_42c * 0xa4) = pHVar12;
  // DEVIATION: Win32 — iVar10 = FUN_005c9499(*(undefined4 *)(iVar7 + local_42c * 0xa4),param_4);
  // DEVIATION: Win32 — if (local_42c == 0) {
  // DEVIATION: Win32 — *(undefined4 *)(iVar10 + 8) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(undefined4 *)(iVar10 + 8) = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *(HBITMAP *)(iVar10 + 0xc) = pHVar2;
  // DEVIATION: Win32 — *(HBITMAP *)(iVar10 + 0x10) = pHVar3;
  // DEVIATION: Win32 — *(HBITMAP *)(iVar10 + 0x14) = pHVar4;
  // DEVIATION: Win32 — *(int *)(iVar10 + 0x24) = local_42c * 0xa4 + iVar7;
  // DEVIATION: Win32 — *(undefined4 *)(iVar10 + 0x2c) = 3;
  // DEVIATION: Win32 — SetWindowLongA(*(HWND *)(iVar7 + local_42c * 0xa4),-4,0x5d9b86);
  // DEVIATION: Win32 — SetRect((LPRECT)(local_42c * 0xa4 + iVar7 + 4),local_44c,(iVar11 - iVar14) + local_8,
  // DEVIATION: Win32 — local_44c + iVar8,(iVar11 - iVar14) + iVar9 + local_8);
  // DEVIATION: Win32 — *(int *)(iVar7 + 0x14 + local_42c * 0xa4) = local_42c;
  // DEVIATION: Win32 — if (*local_410 == '!') {
  // DEVIATION: Win32 — *(undefined4 *)(iVar7 + 0x18 + local_42c * 0xa4) = 0;
  // DEVIATION: Win32 — local_410 = local_410 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (*local_410 == '^') {
  // DEVIATION: Win32 — *(undefined4 *)(iVar7 + 0x18 + local_42c * 0xa4) = 1;
  // DEVIATION: Win32 — thunk_FUN_004472f0(local_42c);
  // DEVIATION: Win32 — local_410 = local_410 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(undefined4 *)(iVar7 + 0x18 + local_42c * 0xa4) = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005f22d0(local_42c * 0xa4 + iVar7 + 0x1c,local_410);
  // DEVIATION: Win32 — local_418 = (char *)(local_42c * 0xa4 + iVar7 + 0x1c);
  // DEVIATION: Win32 — *(undefined4 *)(iVar7 + 0xa0 + local_42c * 0xa4) = 0;
  // DEVIATION: Win32 — while( true ) {
  // DEVIATION: Win32 — if (*local_418 == '\0') goto LAB_005d9893;
  // DEVIATION: Win32 — if (*local_418 == '~') break;
  // DEVIATION: Win32 — piVar1 = (int *)(iVar7 + 0xa0 + local_42c * 0xa4);
  // DEVIATION: Win32 — *piVar1 = *piVar1 + 1;
  // DEVIATION: Win32 — local_418 = local_418 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_430 = *(uint *)(iVar7 + 0xa0 + local_42c * 0xa4);
  // DEVIATION: Win32 — sVar13 = _strlen((char *)(local_42c * 0xa4 + iVar7 + 0x1c)), local_430 < sVar13;
  // DEVIATION: Win32 — local_430 = local_430 + 1) {
  // DEVIATION: Win32 — *(undefined1 *)(local_42c * 0xa4 + local_430 + 0x1c + iVar7) =
  // DEVIATION: Win32 — *(undefined1 *)(local_430 + local_42c * 0xa4 + 0x1d + iVar7);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LAB_005d9893:
  // DEVIATION: Win32 — sVar13 = _strlen((char *)(local_42c * 0xa4 + iVar7 + 0x1c));
  // DEVIATION: Win32 — if (*(uint *)(iVar7 + 0xa0 + local_42c * 0xa4) < sVar13) {
  // DEVIATION: Win32 — local_40c[0] = *(char *)(*(int *)(iVar7 + 0xa0 + local_42c * 0xa4) + local_42c * 0xa4 + 0x1c +
  // DEVIATION: Win32 — iVar7);
  // DEVIATION: Win32 — local_40c[1] = 0;
  // DEVIATION: Win32 — __strlwr(local_40c);
  // DEVIATION: Win32 — *(char *)(iVar7 + 0x9c + local_42c * 0xa4) = local_40c[0];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(undefined4 *)(iVar7 + 0xa0 + local_42c * 0xa4) = 0xffffffff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — sVar13 = _strlen(local_410);
  // DEVIATION: Win32 — local_410 = local_410 + sVar13 + 1;
  // DEVIATION: Win32 — local_8 = local_8 + local_428;
  // DEVIATION: Win32 — if (param_2[3] <= (iVar11 - iVar14) + local_8) {
  // DEVIATION: Win32 — local_44c = local_44c + iVar8;
  // DEVIATION: Win32 — local_8 = param_2[1];
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_42c = local_42c + 1;
  // DEVIATION: Win32 — } while( true );
}

// Source: decompiled/block_005D0000.c manage_window_99F4 (166 bytes)
// destroy_button_array — destroy array of button controls
export function manage_window_99F4(param_1, param_2) {
  // DEVIATION: Win32 — if (param_2 == 0) {
  // DEVIATION: Win32 — debug_log(s_Error__Tried_to_dismantle_NULL_R_0063872c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar1 = FUN_005dcdf9(param_2);
  // DEVIATION: Win32 — for (local_8 = 0; local_8 < param_1; local_8 = local_8 + 1) {
  // DEVIATION: Win32 — if (*(int *)(iVar1 + local_8 * 0xa4) != 0) {
  // DEVIATION: Win32 — DestroyWindow(*(HWND *)(iVar1 + local_8 * 0xa4));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005dce29(param_2);
  // DEVIATION: Win32 — FUN_005dce96(param_2);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c invalidate_9A9A (236 bytes)
// button_click_handler — handle button click
export function invalidate_9A9A(param_1) {
  // DEVIATION: Win32 — iVar1 = FUN_005c9563(param_1);
  // DEVIATION: Win32 — if (iVar1 != 0) {
  // DEVIATION: Win32 — this = *(CCheckListBox **)(iVar1 + 4);
  // DEVIATION: Win32 — iVar1 = *(int *)(iVar1 + 0x24);
  // DEVIATION: Win32 — SetFocus(param_1);
  // DEVIATION: MFC — uVar2 = CCheckListBox::GetCheckStyle(this);
  // DEVIATION: Win32 — if ((uVar2 != *(uint *)(iVar1 + 0x14)) && (*(int *)(iVar1 + 0x18) == 1)) {
  // DEVIATION: Win32 — BVar6 = 0;
  // DEVIATION: Win32 — pRVar5 = (RECT *)0x0;
  // DEVIATION: MFC — uVar2 = CCheckListBox::GetCheckStyle(this);
  // DEVIATION: Win32 — iVar3 = FUN_005c5ee0();
  // DEVIATION: Win32 — InvalidateRect(*(HWND *)(iVar3 + uVar2 * 0xa4),pRVar5,BVar6);
  // DEVIATION: Win32 — thunk_FUN_004472f0(*(undefined4 *)(iVar1 + 0x14));
  // DEVIATION: Win32 — BVar6 = 0;
  // DEVIATION: Win32 — pRVar5 = (RECT *)0x0;
  // DEVIATION: MFC — uVar2 = CCheckListBox::GetCheckStyle(this);
  // DEVIATION: Win32 — iVar1 = FUN_005c5ee0();
  // DEVIATION: Win32 — InvalidateRect(*(HWND *)(iVar1 + uVar2 * 0xa4),pRVar5,BVar6);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_00637ea4 = thunk_FUN_0040f810();
  // DEVIATION: MFC — uVar2 = CCheckListBox::GetCheckStyle(this);
  // DEVIATION: Win32 — uVar4 = thunk_FUN_00418740(uVar2);
  // DEVIATION: Win32 — FUN_005dad40(uVar4,uVar2);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c draw_text_9B86 (4031 bytes)
// button_wndproc — button control window procedure
export function draw_text_9B86(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — size_t sVar5;
  // DEVIATION: Win32 — HWND pHVar6;
  // DEVIATION: Win32 — undefined4 uVar7;
  // DEVIATION: Win32 — undefined1 *puVar8;
  // DEVIATION: Win32 — undefined1 *puVar9;
  // DEVIATION: Win32 — tagRECT *ptVar10;
  // DEVIATION: Win32 — RECT *pRVar11;
  // DEVIATION: Win32 — undefined1 *puVar12;
  // DEVIATION: Win32 — UINT UVar13;
  // DEVIATION: Win32 — BOOL BVar14;
  // DEVIATION: Win32 — tagRECT local_138;
  // DEVIATION: Win32 — HBITMAP local_128;
  // DEVIATION: Win32 — int local_124;
  // DEVIATION: Win32 — tagPAINTSTRUCT local_120;
  // DEVIATION: Win32 — HGDIOBJ local_e0;
  // DEVIATION: Win32 — tagSIZE local_dc;
  // DEVIATION: Win32 — int local_d4;
  // DEVIATION: Win32 — HDC local_d0;
  // DEVIATION: Win32 — int local_cc;
  // DEVIATION: Win32 — int local_c8;
  // DEVIATION: Win32 — undefined1 local_c4 [4];
  // DEVIATION: Win32 — int local_c0;
  // DEVIATION: Win32 — int local_bc;
  // DEVIATION: Win32 — int local_b8;
  // DEVIATION: Win32 — int local_b4;
  // DEVIATION: Win32 — int local_b0;
  // DEVIATION: Win32 — int local_ac;
  // DEVIATION: Win32 — HBRUSH local_a8;
  // DEVIATION: Win32 — undefined1 local_a4 [4];
  // DEVIATION: Win32 — undefined1 local_a0 [4];
  // DEVIATION: Win32 — CCheckListBox *local_9c;
  // DEVIATION: Win32 — undefined4 *local_98;
  // DEVIATION: Win32 — tagRECT local_94;
  // DEVIATION: Win32 — char local_84 [128];
  // DEVIATION: Win32 — local_124 = FUN_005c9563(param_1);
  // DEVIATION: Win32 — local_9c = *(CCheckListBox **)(local_124 + 4);
  // DEVIATION: Win32 — local_bc = *(int *)(local_124 + 0x24);
  // DEVIATION: Win32 — if (param_2 < 0x10) {
  // DEVIATION: Win32 — if (param_2 == 0xf) {
  // DEVIATION: Win32 — if (*(int *)(local_bc + 0x18) == 1) {
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — if (uVar3 == *(uint *)(local_bc + 0x14)) {
  // DEVIATION: Win32 — local_128 = *(HBITMAP *)(local_124 + 0x14);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_128 = *(HBITMAP *)(local_124 + 0x10);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_128 = *(HBITMAP *)(local_124 + 0xc);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — GetBitmapDimensionEx(local_128,&local_dc);
  // DEVIATION: Win32 — local_138.left = *(int *)(local_bc + 4);
  // DEVIATION: Win32 — local_138.top = *(int *)(local_bc + 8);
  // DEVIATION: Win32 — local_138.right = *(int *)(local_bc + 0xc);
  // DEVIATION: Win32 — local_138.bottom = *(int *)(local_bc + 0x10);
  // DEVIATION: Win32 — local_b8 = local_138.left;
  // DEVIATION: Win32 — local_b4 = local_138.top;
  // DEVIATION: Win32 — local_b0 = local_138.right;
  // DEVIATION: Win32 — local_ac = local_138.bottom;
  // DEVIATION: Win32 — if (G.DAT_006386fc != 0) {
  // DEVIATION: Win32 — local_b0 = local_138.left + 0x20;
  // DEVIATION: Win32 — iVar4 = thunk_FUN_00407fc0(&local_138);
  // DEVIATION: Win32 — local_b4 = iVar4 + -0x14 + local_138.top >> 1;
  // DEVIATION: Win32 — local_ac = local_138.top + 0x14;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — InvalidateRect(param_1,(RECT *)0x0,1);
  // DEVIATION: Win32 — OffsetRect(&local_138,-local_138.left,-local_138.top);
  // DEVIATION: Win32 — local_d0 = BeginPaint(param_1,&local_120);
  // DEVIATION: Win32 — update_palette_90CA(&local_120,param_1);
  // DEVIATION: Win32 — uVar7 = thunk_FUN_004d8af0();
  // DEVIATION: Win32 — local_98 = (undefined4 *)FUN_005dcdf9(uVar7);
  // DEVIATION: Win32 — local_e0 = SelectObject(local_d0,(HGDIOBJ)*local_98);
  // DEVIATION: Win32 — uVar7 = thunk_FUN_004d8af0();
  // DEVIATION: Win32 — FUN_005dce29(uVar7);
  // DEVIATION: Win32 — SetBkMode(local_d0,1);
  // DEVIATION: Win32 — FUN_005ed710(local_d0,local_128,local_138.left,local_138.bottom + -0x14 >> 1,0x20,0x14,0,7);
  // DEVIATION: Win32 — local_138.left = local_138.left + 0x25;
  // DEVIATION: Win32 — if ((G.DAT_00637e84 != 0) || (G.DAT_00637e88 != 0)) {
  // DEVIATION: Win32 — OffsetRect(&local_138,(uint)G.DAT_00637e84,(uint)G.DAT_00637e88);
  // DEVIATION: Win32 — puVar12 = local_a0;
  // DEVIATION: Win32 — puVar9 = local_c4;
  // DEVIATION: Win32 — puVar8 = local_a4;
  // DEVIATION: Win32 — uVar3 = (uint)G.DAT_00637e80;
  // DEVIATION: Win32 — thunk_FUN_0040f810(uVar3,puVar8,puVar9,puVar12);
  // DEVIATION: Win32 — thunk_FUN_00511320();
  // DEVIATION: Win32 — thunk_FUN_00497c40(uVar3,puVar8,puVar9,puVar12);
  // DEVIATION: Win32 — SetTextColor(local_d0,(uint)CONCAT12(local_a0[0],CONCAT11(local_c4[0],local_a4[0])));
  // DEVIATION: Win32 — UVar13 = 0x24;
  // DEVIATION: Win32 — ptVar10 = &local_138;
  // DEVIATION: Win32 — sVar5 = _strlen((char *)(local_bc + 0x1c));
  // DEVIATION: Win32 — DrawTextA(local_d0,(LPCSTR)(local_bc + 0x1c),sVar5,ptVar10,UVar13);
  // DEVIATION: Win32 — OffsetRect(&local_138,-(uint)G.DAT_00637e84,-(uint)G.DAT_00637e88);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (*(int *)(local_bc + 0x18) == 1) {
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar4 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(int *)(iVar4 + 0x40) == 8) {
  // DEVIATION: Win32 — if (G.DAT_00637e7c == '\0') {
  // DEVIATION: Win32 — SetTextColor(local_d0,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — thunk_FUN_0040f810(G.DAT_00637e7c,local_a4,local_c4,local_a0);
  // DEVIATION: Win32 — thunk_FUN_00511320();
  // DEVIATION: Win32 — uVar7 = thunk_FUN_0046f440();
  // DEVIATION: Win32 — FUN_005dea9e(uVar7);
  // DEVIATION: Win32 — SetTextColor(local_d0,(uint)CONCAT12(local_a0[0],CONCAT11(local_c4[0],local_a4[0])));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (G.DAT_006386f7 == '\0') {
  // DEVIATION: Win32 — SetTextColor(local_d0,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — SetTextColor(local_d0,(uint)CONCAT12(G.DAT_006386f6,CONCAT11(G.DAT_006386f5,G.DAT_006386f4)));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (*(int *)(local_bc + 0x18) == 0) {
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — iVar4 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(int *)(iVar4 + 0x40) == 8) {
  // DEVIATION: Win32 — if (G.DAT_00637e8c == '\0') {
  // DEVIATION: Win32 — SetTextColor(local_d0,0x404040);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — thunk_FUN_0040f810(G.DAT_00637e8c,local_a4,local_c4,local_a0);
  // DEVIATION: Win32 — thunk_FUN_00511320();
  // DEVIATION: Win32 — uVar7 = thunk_FUN_0046f440();
  // DEVIATION: Win32 — FUN_005dea9e(uVar7);
  // DEVIATION: Win32 — SetTextColor(local_d0,(uint)CONCAT12(local_a0[0],CONCAT11(local_c4[0],local_a4[0])));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (G.DAT_006386fb == '\0') {
  // DEVIATION: Win32 — SetTextColor(local_d0,0x404040);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — SetTextColor(local_d0,(uint)CONCAT12(G.DAT_006386fa,CONCAT11(G.DAT_006386f9,G.DAT_006386f8)));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — UVar13 = 0x24;
  // DEVIATION: Win32 — ptVar10 = &local_138;
  // DEVIATION: Win32 — sVar5 = _strlen((char *)(local_bc + 0x1c));
  // DEVIATION: Win32 — DrawTextA(local_d0,(LPCSTR)(local_bc + 0x1c),sVar5,ptVar10,UVar13);
  // DEVIATION: Win32 — if (*(int *)(local_bc + 0xa0) != -1) {
  // DEVIATION: Win32 — FUN_005f22d0(local_84,local_bc + 0x1c);
  // DEVIATION: Win32 — local_84[*(int *)(local_bc + 0xa0)] = '\0';
  // DEVIATION: Win32 — local_94.left = local_138.left;
  // DEVIATION: Win32 — local_94.top = local_138.top;
  // DEVIATION: Win32 — local_94.right = local_138.right;
  // DEVIATION: Win32 — local_94.bottom = local_138.bottom;
  // DEVIATION: Win32 — sVar5 = _strlen(local_84);
  // DEVIATION: Win32 — if (sVar5 == 0) {
  // DEVIATION: Win32 — local_c0 = local_94.left;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — UVar13 = 0x424;
  // DEVIATION: Win32 — ptVar10 = &local_94;
  // DEVIATION: Win32 — sVar5 = _strlen(local_84);
  // DEVIATION: Win32 — DrawTextA(local_d0,local_84,sVar5,ptVar10,UVar13);
  // DEVIATION: Win32 — local_c0 = local_94.right + -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005f22d0(local_84,local_bc + 0x1c);
  // DEVIATION: Win32 — local_84[*(int *)(local_bc + 0xa0) + 1] = '\0';
  // DEVIATION: Win32 — local_94.left = local_138.left;
  // DEVIATION: Win32 — local_94.top = local_138.top;
  // DEVIATION: Win32 — local_94.right = local_138.right;
  // DEVIATION: Win32 — local_94.bottom = local_138.bottom;
  // DEVIATION: Win32 — UVar13 = 0x424;
  // DEVIATION: Win32 — ptVar10 = &local_94;
  // DEVIATION: Win32 — sVar5 = _strlen(local_84);
  // DEVIATION: Win32 — DrawTextA(local_d0,local_84,sVar5,ptVar10,UVar13);
  // DEVIATION: Win32 — local_c0 = local_c0 + ((local_94.right + 1) - local_c0 >> 1) + -5;
  // DEVIATION: Win32 — local_cc = local_c0 + 10;
  // DEVIATION: Win32 — local_a8 = GetStockObject(3);
  // DEVIATION: Win32 — SelectObject(local_d0,local_a8);
  // DEVIATION: Win32 — MoveToEx(local_d0,local_c0,local_138.bottom + -3,(LPPOINT)0x0);
  // DEVIATION: Win32 — LineTo(local_d0,local_cc,local_138.bottom + -3);
  // DEVIATION: Win32 — MoveToEx(local_d0,local_c0,local_138.bottom + -2,(LPPOINT)0x0);
  // DEVIATION: Win32 — LineTo(local_d0,local_cc,local_138.bottom + -2);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — SelectObject(local_d0,local_e0);
  // DEVIATION: Win32 — EndPaint(param_1,&local_120);
  // DEVIATION: Win32 — pHVar6 = GetFocus();
  // DEVIATION: Win32 — if (pHVar6 != param_1) {
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (param_2 != 7) {
  // DEVIATION: Win32 — if (param_2 == 8) {
  // DEVIATION: Win32 — invalidate_96CC(param_1);
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — goto switchD_005dab35_default;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — cVar1 = FUN_005cbdd0();
  // DEVIATION: Win32 — if (cVar1 == '\0') {
  // DEVIATION: Win32 — uVar7 = send_msg_9307(param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return uVar7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_d0 = GetDC(param_1);
  // DEVIATION: Win32 — local_a8 = GetStockObject(3);
  // DEVIATION: Win32 — GetClientRect(param_1,&local_138);
  // DEVIATION: Win32 — SelectObject(local_d0,local_a8);
  // DEVIATION: Win32 — local_138.left = local_138.left + 0x20;
  // DEVIATION: Win32 — FrameRect(local_d0,&local_138,local_a8);
  // DEVIATION: Win32 — DeleteObject(local_a8);
  // DEVIATION: Win32 — ReleaseDC(param_1,local_d0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (param_2 < 0x202) {
  // DEVIATION: Win32 — if (param_2 == 0x201) {
  // DEVIATION: Win32 — if (G.DAT_006386fc == 0) {
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — if ((uVar3 != *(uint *)(local_bc + 0x14)) && (*(int *)(local_bc + 0x18) == 1)) {
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — if (uVar3 != 0xffffffff) {
  // DEVIATION: Win32 — BVar14 = 0;
  // DEVIATION: Win32 — pRVar11 = (RECT *)0x0;
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — iVar4 = FUN_005c5ee0();
  // DEVIATION: Win32 — InvalidateRect(*(HWND *)(iVar4 + uVar3 * 0xa4),pRVar11,BVar14);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — thunk_FUN_004472f0(*(undefined4 *)(local_bc + 0x14));
  // DEVIATION: Win32 — SetFocus(param_1);
  // DEVIATION: Win32 — InvalidateRect(param_1,(RECT *)0x0,0);
  // DEVIATION: Win32 — uVar7 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar7);
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — uVar7 = thunk_FUN_00418740(uVar3);
  // DEVIATION: Win32 — FUN_005dad40(uVar7,uVar3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_006386fc = 1;
  // DEVIATION: Win32 — SetCapture(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (param_2 != 0x100) goto switchD_005dab35_default;
  // DEVIATION: Win32 — if (param_3 == 9) {
  // DEVIATION: Win32 — pHVar6 = GetParent(param_1);
  // DEVIATION: Win32 — SendMessageA(pHVar6,param_2,param_3,param_4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (param_3 == 0x20) {
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — cVar1 = FUN_005cbdd0();
  // DEVIATION: Win32 — if (cVar1 != '\0') {
  // DEVIATION: Win32 — SendMessageA(param_1,0x201,0,0);
  // DEVIATION: Win32 — SendMessageA(param_1,0x202,0,0);
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((((param_3 == 0x27) || (param_3 == 0x28)) || (param_3 == 0x66)) || (param_3 == 0x62)) {
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — cVar1 = FUN_005cbdd0();
  // DEVIATION: Win32 — if (cVar1 != '\0') {
  // DEVIATION: Win32 — local_d4 = FUN_005c5f00();
  // DEVIATION: Win32 — local_c8 = *(int *)(local_bc + 0x14) + 1;
  // DEVIATION: Win32 — iVar4 = FUN_005c5f00();
  // DEVIATION: Win32 — if (iVar4 <= local_c8) {
  // DEVIATION: Win32 — local_c8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — while ((0 < local_d4 &&
  // DEVIATION: Win32 — (iVar4 = FUN_005c5ee0(), *(int *)(iVar4 + 0x18 + local_c8 * 0xa4) == 0))) {
  // DEVIATION: Win32 — local_d4 = local_d4 + -1;
  // DEVIATION: Win32 — local_c8 = local_c8 + 1;
  // DEVIATION: Win32 — iVar4 = FUN_005c5f00();
  // DEVIATION: Win32 — if (iVar4 <= local_c8) {
  // DEVIATION: Win32 — local_c8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_d4 < 1) {
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar4 = FUN_005c5ee0();
  // DEVIATION: Win32 — SetFocus(*(HWND *)(iVar4 + local_c8 * 0xa4));
  // DEVIATION: Win32 — BVar14 = 0;
  // DEVIATION: Win32 — pRVar11 = (RECT *)0x0;
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — iVar4 = FUN_005c5ee0();
  // DEVIATION: Win32 — InvalidateRect(*(HWND *)(iVar4 + uVar3 * 0xa4),pRVar11,BVar14);
  // DEVIATION: Win32 — thunk_FUN_004472f0(local_c8);
  // DEVIATION: Win32 — BVar14 = 0;
  // DEVIATION: Win32 — pRVar11 = (RECT *)0x0;
  // DEVIATION: Win32 — iVar4 = FUN_005c5ee0();
  // DEVIATION: Win32 — InvalidateRect(*(HWND *)(iVar4 + local_c8 * 0xa4),pRVar11,BVar14);
  // DEVIATION: Win32 — uVar7 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar7);
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — uVar7 = thunk_FUN_00418740(uVar3);
  // DEVIATION: Win32 — FUN_005dad40(uVar7,uVar3);
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (((param_3 == 0x26) || (param_3 == 0x25)) || ((param_3 == 0x68 || (param_3 == 100)))) {
  // DEVIATION: Win32 — thunk_FUN_0040f810();
  // DEVIATION: Win32 — cVar1 = FUN_005cbdd0();
  // DEVIATION: Win32 — if (cVar1 != '\0') {
  // DEVIATION: Win32 — local_d4 = FUN_005c5f00();
  // DEVIATION: Win32 — local_c8 = *(int *)(local_bc + 0x14) + -1;
  // DEVIATION: Win32 — if (local_c8 < 0) {
  // DEVIATION: Win32 — local_c8 = FUN_005c5f00();
  // DEVIATION: Win32 — local_c8 = local_c8 + -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — while ((0 < local_d4 &&
  // DEVIATION: Win32 — (iVar4 = FUN_005c5ee0(), *(int *)(iVar4 + 0x18 + local_c8 * 0xa4) == 0))) {
  // DEVIATION: Win32 — local_d4 = local_d4 + -1;
  // DEVIATION: Win32 — local_c8 = local_c8 + -1;
  // DEVIATION: Win32 — if (local_c8 < 0) {
  // DEVIATION: Win32 — local_c8 = FUN_005c5f00();
  // DEVIATION: Win32 — local_c8 = local_c8 + -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_d4 < 1) {
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar4 = FUN_005c5ee0();
  // DEVIATION: Win32 — SetFocus(*(HWND *)(iVar4 + local_c8 * 0xa4));
  // DEVIATION: Win32 — BVar14 = 0;
  // DEVIATION: Win32 — pRVar11 = (RECT *)0x0;
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — iVar4 = FUN_005c5ee0();
  // DEVIATION: Win32 — InvalidateRect(*(HWND *)(iVar4 + uVar3 * 0xa4),pRVar11,BVar14);
  // DEVIATION: Win32 — thunk_FUN_004472f0(local_c8);
  // DEVIATION: Win32 — BVar14 = 0;
  // DEVIATION: Win32 — pRVar11 = (RECT *)0x0;
  // DEVIATION: Win32 — iVar4 = FUN_005c5ee0();
  // DEVIATION: Win32 — InvalidateRect(*(HWND *)(iVar4 + local_c8 * 0xa4),pRVar11,BVar14);
  // DEVIATION: Win32 — uVar7 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar7);
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — uVar7 = thunk_FUN_00418740(uVar3);
  // DEVIATION: Win32 — FUN_005dad40(uVar7,uVar3);
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pHVar6 = GetParent(param_1);
  // DEVIATION: Win32 — SendMessageA(pHVar6,param_2,param_3,param_4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — switch(param_2) {
  // DEVIATION: Win32 — case 0x202:
  // DEVIATION: Win32 — ReleaseCapture();
  // DEVIATION: Win32 — G.DAT_006386fc = 0;
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — case 0x203:
  // DEVIATION: Win32 — if (*(int *)(local_bc + 0x18) == 1) {
  // DEVIATION: Win32 — uVar7 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar7);
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — if (uVar3 != *(uint *)(local_bc + 0x14)) {
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — if (uVar3 != 0xffffffff) {
  // DEVIATION: Win32 — BVar14 = 0;
  // DEVIATION: Win32 — pRVar11 = (RECT *)0x0;
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(local_9c);
  // DEVIATION: Win32 — iVar4 = FUN_005c5ee0();
  // DEVIATION: Win32 — InvalidateRect(*(HWND *)(iVar4 + uVar3 * 0xa4),pRVar11,BVar14);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — thunk_FUN_004472f0(*(undefined4 *)(local_bc + 0x14));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar7 = *(undefined4 *)(local_bc + 0x14);
  // DEVIATION: Win32 — uVar2 = thunk_FUN_00418740(uVar7);
  // DEVIATION: Win32 — FUN_005dad80(uVar2,uVar7);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — case 0x204:
  // DEVIATION: Win32 — if (G.DAT_00638700 == 0) {
  // DEVIATION: Win32 — G.DAT_00638700 = 1;
  // DEVIATION: Win32 — SetCapture(param_1);
  // DEVIATION: Win32 — uVar7 = thunk_FUN_0040f810();
  // DEVIATION: Win32 — FUN_005c6303(uVar7);
  // DEVIATION: Win32 — uVar7 = *(undefined4 *)(local_bc + 0x14);
  // DEVIATION: Win32 — uVar2 = thunk_FUN_00418740(uVar7);
  // DEVIATION: Win32 — FUN_005dadc0(uVar2,uVar7);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — case 0x205:
  // DEVIATION: Win32 — ReleaseCapture();
  // DEVIATION: Win32 — G.DAT_00638700 = 0;
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — default:
  // DEVIATION: Win32 — switchD_005dab35_default:
  // DEVIATION: Win32 — uVar7 = send_msg_9307(param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return uVar7;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 0;
}

// Source: decompiled/block_005D0000.c FUN_005dab5a (109 bytes)
// is_button_control — check if HWND is a button control
export function FUN_005dab5a(param_1) {
  // DEVIATION: Win32 — CHAR local_38 [52];
  // DEVIATION: Win32 — GetClassNameA(param_1,local_38,0x32);
  // DEVIATION: Win32 — _Str2 = s_MSCONTROLCLASS_00638768;
  // DEVIATION: Win32 — _Str1 = __strupr(local_38);
  // DEVIATION: Win32 — iVar1 = _strcmp(_Str1,_Str2);
  // DEVIATION: Win32 — if ((iVar1 == 0) && (iVar1 = FUN_005c9563(param_1), *(int *)(iVar1 + 0x2c) == 3)) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 0;
}

// Source: decompiled/block_005D0000.c invalidate_ABC7 (30 bytes)
// invalidate_button — invalidate a button rect
export function invalidate_ABC7(param_1) {
  // DEVIATION: Win32 — InvalidateRect(param_1,(RECT *)0x0,0);
}

// Source: decompiled/block_005D0000.c FUN_005dabe5 (84 bytes)
// is_button_selected — check if button is selected
export function FUN_005dabe5(param_1) {
  // DEVIATION: Win32 — iVar2 = FUN_005c9563(param_1);
  // DEVIATION: Win32 — iVar1 = *(int *)(iVar2 + 0x24);
  // DEVIATION: MFC — uVar3 = CCheckListBox::GetCheckStyle(*(CCheckListBox **)(iVar2 + 4));
  // DEVIATION: Win32 — return uVar3 == *(uint *)(iVar1 + 0x14);
}

// Source: decompiled/block_005D0000.c FUN_005dac39 (160 bytes)
// are_buttons_same_group — check if two buttons are in same group
export function FUN_005dac39(param_1, param_2) {
  // DEVIATION: Win32 — iVar1 = FUN_005dab5a(param_1);
  // DEVIATION: Win32 — if ((iVar1 == 0) || (iVar1 = FUN_005dab5a(param_2), iVar1 == 0)) {
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_1 == param_2) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar1 = FUN_005c9563(param_1);
  // DEVIATION: Win32 — iVar2 = FUN_005c9563(param_2);
  // DEVIATION: Win32 — if (*(int *)(iVar2 + 4) == *(int *)(iVar1 + 4)) {
  // DEVIATION: Win32 — return 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 0;
}

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

// Source: decompiled/block_005D0000.c FUN_005dad40 (54 bytes)
// button_on_click_callback — invoke click callback
export function FUN_005dad40(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dad80 (54 bytes)
// button_on_dblclick_callback — invoke double-click callback
export function FUN_005dad80(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dadc0 (54 bytes)
// button_on_rclick_callback — invoke right-click callback
export function FUN_005dadc0(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Error handling (SMEDS assertion system)
// ═══════════════════════════════════════════════════════════════════

// library_init_E31_b — second library static initializer
export function FID_conflict___E31_005dae00() { FUN_005dae1a(); FUN_005dae34(); }

// Source: decompiled/block_005D0000.c FUN_005dae1a (26 bytes)
// init_error_subsystem
export function FUN_005dae1a() {
  // DEVIATION: Win32 — FUN_005db089();
}

// Source: decompiled/block_005D0000.c FUN_005dae34 (29 bytes)
// register_error_atexit
export function FUN_005dae34() {
  // DEVIATION: Win32 — _atexit(FUN_005dae51);
}

// Source: decompiled/block_005D0000.c FUN_005dae51 (26 bytes)
// error_cleanup_atexit
export function FUN_005dae51() {
  // DEVIATION: MFC — Iostream_init::~Iostream_init((Iostream_init *)&G.DAT_006e4850);
}

// Source: decompiled/block_005D0000.c FUN_005dae6b (70 bytes)
// fatal_error — report fatal error
export function FUN_005dae6b(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005daeb1 (70 bytes)
// warning — report warning
export function FUN_005daeb1(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005daef7 (108 bytes)
// format_error_string — format error message
export function FUN_005daef7(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — size_t sVar1;
  // DEVIATION: Win32 — undefined4 uVar2;
  // DEVIATION: Win32 — char *in_ECX;
  // DEVIATION: Win32 — char *_Format;
  // DEVIATION: Win32 — FUN_005f22d0();
  // DEVIATION: Win32 — _Format = s_Error___s_File___s_Line___d_00638790;
  // DEVIATION: Win32 — sVar1 = _strlen(in_ECX);
  // DEVIATION: Win32 — _sprintf(in_ECX + sVar1,_Format,param_2,param_3,param_4);
  // DEVIATION: Win32 — uVar2 = FUN_005daf63();
  // DEVIATION: Win32 — FUN_005f22e0(in_ECX,uVar2);
  // DEVIATION: Win32 — return in_ECX;
}

// Source: decompiled/block_005D0000.c FUN_005daf63 (47 bytes)
// get_error_timestamp — get error timestamp string
export function FUN_005daf63() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005daf92 (41 bytes)
// show_fatal_messagebox — show fatal error dialog
export function FUN_005daf92(param_1) {
  // DEVIATION: Win32 — show_messagebox_DD00(s_SMEDS_Application_Error_006387b4,param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dafbb (36 bytes)
// log_warning — log warning to debug
export function FUN_005dafbb(param_1) {
  // DEVIATION: Win32 — debug_log(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dafdf (55 bytes)
// set_error_code — set current error code
export function FUN_005dafdf(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c IsTracking (31 bytes)
// IsTracking — CSplitterWnd::IsTracking
export function IsTracking() {
  // DEVIATION: Win32 — return *(int *)(this + 0x704);
}

// Source: decompiled/block_005D0000.c EnableStackedTabs (36 bytes)
// EnableStackedTabs — CPropertySheet::EnableStackedTabs
export function EnableStackedTabs(param_1) {
  // DEVIATION: Win32 — *(int *)(this + 0x708) = param_1;
}

// Source: decompiled/block_005D0000.c FUN_005db059 (48 bytes)
// clear_error_state — clear error state
export function FUN_005db059() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005db089 (43 bytes)
// init_error_handler — construct error handler
export function FUN_005db089() {
  // DEVIATION: MFC — CPropertySheet::EnableStackedTabs(in_ECX,0);
  // DEVIATION: Win32 — FUN_005db059();
  // DEVIATION: Win32 — return in_ECX;
}

// Source: decompiled/block_005D0000.c ~Iostream_init (22 bytes)
// Iostream_init_destructor — ~Iostream_init (no-op)
export function Iostream_init_destructor() {
  // C: return; (truly empty function)
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Scroll bar, bitmap, window creation utilities
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005db0d0 (64 bytes)
// set_scroll_position — set scroll bar position
export function FUN_005db0d0(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005db110 (47 bytes)
// get_scroll_range — get scroll bar range
export function FUN_005db110(param_1, param_2) {
  // DEVIATION: Win32 — FUN_005cd535(*(undefined4 *)(in_ECX + 0x1c),param_1,param_2);
}

// Source: decompiled/block_005D0000.c FUN_005db140 (155 bytes)
// load_resource_dll — load a resource DLL
export function FUN_005db140(param_1) {
  // DEVIATION: Win32 — pHVar1 = LoadLibraryExA(param_1,(HANDLE)0x0,2);
  // DEVIATION: Win32 — if (pHVar1 == (HMODULE)0x0) {
  // DEVIATION: Win32 — FUN_005f22d0(local_84,s_Error__Resource_file_006387d0);
  // DEVIATION: Win32 — FUN_005f22e0(local_84,param_1);
  // DEVIATION: Win32 — FUN_005f22e0(local_84,s_not_found__006387e8);
  // DEVIATION: Win32 — debug_log(local_84);
  // DEVIATION: Win32 — pHVar1 = (HMODULE)0x0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *(HMODULE *)(&G.DAT_006e4f60 + G.DAT_006387cc * 4) = pHVar1;
  // DEVIATION: Win32 — G.DAT_006387cc = G.DAT_006387cc + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return pHVar1;
}

// Source: decompiled/block_005D0000.c FUN_005db1e0 (26 bytes)
// free_resource — free loaded resource
export function FUN_005db1e0(param_1) {
  // DEVIATION: Win32 — FreeResource(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005db1fa (249 bytes)
// find_resource_by_type — find resource by type string
export function FUN_005db1fa(param_1, param_2) {
  // DEVIATION: Win32 — HRSRC local_10;
  // DEVIATION: Win32 — CHAR local_c;
  // DEVIATION: Win32 — CHAR local_b;
  // DEVIATION: Win32 — CHAR local_a;
  // DEVIATION: Win32 — CHAR local_9;
  // DEVIATION: Win32 — undefined1 local_8;
  // DEVIATION: Win32 — local_c = *param_1;
  // DEVIATION: Win32 — local_b = param_1[1];
  // DEVIATION: Win32 — local_a = param_1[2];
  // DEVIATION: Win32 — local_9 = param_1[3];
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — local_14 = 0xffffffff;
  // DEVIATION: Win32 — local_10 = FindResourceA(G.DAT_006e4ff0,param_2,&local_c);
  // DEVIATION: Win32 — if (local_10 == (HRSRC)0x0) {
  // DEVIATION: Win32 — local_14 = 0;
  // DEVIATION: Win32 — while ((local_14 < G.DAT_006387cc &&
  // DEVIATION: Win32 — (local_10 = FindResourceA(*(HMODULE *)(&G.DAT_006e4f60 + local_14 * 4),param_2,&local_c),
  // DEVIATION: Win32 — local_10 == (HRSRC)0x0))) {
  // DEVIATION: Win32 — local_14 = local_14 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_10 == (HRSRC)0x0) {
  // DEVIATION: Win32 — pvVar1 = (HGLOBAL)0x0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (local_14 == 0xffffffff) {
  // DEVIATION: Win32 — local_1c = G.DAT_006e4ff0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_1c = *(HMODULE *)(&G.DAT_006e4f60 + local_14 * 4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pvVar1 = LoadResource(local_1c,local_10);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return pvVar1;
}

// Source: decompiled/block_005D0000.c FUN_005db2f8 (205 bytes)
// find_bitmap_resource — find bitmap resource
export function FUN_005db2f8(param_1) {
  // DEVIATION: Win32 — HRSRC local_8;
  // DEVIATION: Win32 — local_c = 0xffffffff;
  // DEVIATION: Win32 — local_8 = FindResourceA(G.DAT_006e4ff0,param_1,(LPCSTR)0x2);
  // DEVIATION: Win32 — if (local_8 == (HRSRC)0x0) {
  // DEVIATION: Win32 — local_c = 0;
  // DEVIATION: Win32 — while ((local_c < G.DAT_006387cc &&
  // DEVIATION: Win32 — (local_8 = FindResourceA(*(HMODULE *)(&G.DAT_006e4f60 + local_c * 4),param_1,(LPCSTR)0x2),
  // DEVIATION: Win32 — local_8 == (HRSRC)0x0))) {
  // DEVIATION: Win32 — local_c = local_c + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_8 == (HRSRC)0x0) {
  // DEVIATION: Win32 — pvVar1 = (HGLOBAL)0x0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (local_c == 0xffffffff) {
  // DEVIATION: Win32 — local_14 = G.DAT_006e4ff0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_14 = *(HMODULE *)(&G.DAT_006e4f60 + local_c * 4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pvVar1 = LoadResource(local_14,local_8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return pvVar1;
}

// Source: decompiled/block_005D0000.c FUN_005db3ca (354 bytes)
// find_resource_by_name — find resource by name with sanitization
export function FUN_005db3ca(param_1, param_2) {
  // DEVIATION: Win32 — size_t sVar1;
  // DEVIATION: Win32 — HGLOBAL pvVar2;
  // DEVIATION: Win32 — HMODULE local_18;
  // DEVIATION: Win32 — uint local_14;
  // DEVIATION: Win32 — HRSRC local_10;
  // DEVIATION: Win32 — CHAR local_c;
  // DEVIATION: Win32 — CHAR local_b;
  // DEVIATION: Win32 — CHAR local_a;
  // DEVIATION: Win32 — CHAR local_9;
  // DEVIATION: Win32 — undefined1 local_8;
  // DEVIATION: Win32 — local_c = *param_1;
  // DEVIATION: Win32 — local_b = param_1[1];
  // DEVIATION: Win32 — local_a = param_1[2];
  // DEVIATION: Win32 — local_9 = param_1[3];
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — for (local_14 = 0; sVar1 = _strlen(param_2), local_14 < sVar1; local_14 = local_14 + 1) {
  // DEVIATION: Win32 — if (((param_2[local_14] == ' ') || (param_2[local_14] == '.')) || (param_2[local_14] == '\'')) {
  // DEVIATION: Win32 — param_2[local_14] = '_';
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_14 = 0xffffffff;
  // DEVIATION: Win32 — local_10 = FindResourceA(G.DAT_006e4ff0,param_2,&local_c);
  // DEVIATION: Win32 — if (local_10 == (HRSRC)0x0) {
  // DEVIATION: Win32 — local_14 = 0;
  // DEVIATION: Win32 — while ((local_14 < G.DAT_006387cc &&
  // DEVIATION: Win32 — (local_10 = FindResourceA(*(HMODULE *)(&G.DAT_006e4f60 + local_14 * 4),param_2,&local_c),
  // DEVIATION: Win32 — local_10 == (HRSRC)0x0))) {
  // DEVIATION: Win32 — local_14 = local_14 + 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_10 == (HRSRC)0x0) {
  // DEVIATION: Win32 — pvVar2 = (HGLOBAL)0x0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (local_14 == 0xffffffff) {
  // DEVIATION: Win32 — local_18 = G.DAT_006e4ff0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_18 = *(HMODULE *)(&G.DAT_006e4f60 + local_14 * 4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pvVar2 = LoadResource(local_18,local_10);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return pvVar2;
}

// Source: decompiled/block_005D0000.c FUN_005db531 (26 bytes)
// lock_resource_data — lock resource for reading
export function FUN_005db531(param_1) {
  // DEVIATION: Win32 — LockResource(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005db54b (16 bytes)
// unlock_resource_noop — no-op resource unlock
export function FUN_005db54b() {
  // C: return; (truly empty function)
}

// Source: decompiled/block_005D0000.c FUN_005db55b (142 bytes)
// unload_resource_dll — unload a resource DLL
export function FUN_005db55b(param_1) {
  // DEVIATION: Win32 — for (local_8 = 0;
  // DEVIATION: Win32 — (*(HMODULE *)(&G.DAT_006e4f60 + local_8 * 4) != param_1 && (local_8 < G.DAT_006387cc));
  // DEVIATION: Win32 — local_8 = local_8 + 1) {
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_8 < G.DAT_006387cc) {
  // DEVIATION: Win32 — for (; local_8 < G.DAT_006387cc; local_8 = local_8 + 1) {
  // DEVIATION: Win32 — *(undefined4 *)(&G.DAT_006e4f60 + local_8 * 4) = *(undefined4 *)(&G.DAT_006e4f64 + local_8 * 4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_006387cc = G.DAT_006387cc - 1;
  // DEVIATION: Win32 — FreeLibrary(param_1);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005db5e9 (28 bytes)
// get_resource_size — query resource data size
export function FUN_005db5e9(param_1) {
  // DEVIATION: Win32 — FUN_005dcef7(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005db610 (64 bytes)
// bitmap_handle_init — initialize bitmap handle struct
export function FUN_005db610() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005db650 (43 bytes)
// bitmap_handle_destroy — destroy bitmap handle
export function FUN_005db650() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005db67b (137 bytes)
// bitmap_create_window — create window for bitmap
export function FUN_005db67b(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — *in_ECX = param_2;
  // DEVIATION: Win32 — if (in_ECX[2] != 0) {
  // DEVIATION: Win32 — uVar1 = manage_window_C0AB(in_ECX[2]);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = create_window_BC10(param_1,param_2,param_3,param_4,param_5,param_6,0);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — FUN_005eb370(in_ECX,in_ECX[2]);
  // DEVIATION: Win32 — thunk_FUN_00450390(param_7);
}

// Source: decompiled/block_005D0000.c FUN_005db704 (142 bytes)
// bitmap_create_window_scrollable — create scrollable bitmap window
export function FUN_005db704(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — *in_ECX = param_2;
  // DEVIATION: Win32 — if (in_ECX[2] != 0) {
  // DEVIATION: Win32 — uVar1 = manage_window_C0AB(in_ECX[2]);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = create_window_BC10(param_1,param_2,param_3,param_4,param_5,param_6,0);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — FUN_005eb370(in_ECX,in_ECX[2]);
  // DEVIATION: Win32 — FUN_005bc019(in_ECX[2],0x10);
}

// Source: decompiled/block_005D0000.c FUN_005db792 (125 bytes)
// bitmap_create_anim_window — create animation window
export function FUN_005db792(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — *in_ECX = param_2;
  // DEVIATION: Win32 — if (in_ECX[2] != 0) {
  // DEVIATION: Win32 — uVar1 = manage_window_C0AB(in_ECX[2]);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = FUN_005ee0b1(param_1,param_2,param_3,param_4,param_5,param_6,0);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — FUN_005eb370(in_ECX,in_ECX[2]);
}

// Source: decompiled/block_005D0000.c FUN_005db80f (132 bytes)
// bitmap_create_anim_parented — create parented animation window
export function FUN_005db80f(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — *in_ECX = param_2;
  // DEVIATION: Win32 — if (in_ECX[2] != 0) {
  // DEVIATION: Win32 — uVar1 = manage_window_C0AB(in_ECX[2]);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — uVar1 = FUN_005ee0b1(param_1,param_2,param_3,param_4,param_5,param_6,uVar1);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — FUN_005eb370(in_ECX,in_ECX[2]);
}

// Source: decompiled/block_005D0000.c FUN_005db893 (144 bytes)
// bitmap_create_window_parented_scroll — create parented scrollable window
export function FUN_005db893(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — *in_ECX = param_2;
  // DEVIATION: Win32 — if (in_ECX[2] != 0) {
  // DEVIATION: Win32 — uVar1 = manage_window_C0AB(in_ECX[2]);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — uVar1 = create_window_BC10(param_1,param_2,param_3,param_4,param_5,param_6,uVar1);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — FUN_005eb370(in_ECX,in_ECX[2]);
  // DEVIATION: Win32 — thunk_FUN_00450390(param_7);
}

// Source: decompiled/block_005D0000.c FUN_005db923 (149 bytes)
// bitmap_create_window_parented — create parented window
export function FUN_005db923(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — *in_ECX = param_2;
  // DEVIATION: Win32 — if (in_ECX[2] != 0) {
  // DEVIATION: Win32 — uVar1 = manage_window_C0AB(in_ECX[2]);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — uVar1 = create_window_BC10(param_1,param_2,param_3,param_4,param_5,param_6,uVar1);
  // DEVIATION: Win32 — in_ECX[2] = uVar1;
  // DEVIATION: Win32 — FUN_005eb370(in_ECX,in_ECX[2]);
  // DEVIATION: Win32 — FUN_005bc019(in_ECX[2],0x10);
}

// Source: decompiled/block_005D0000.c FUN_005db9b8 (88 bytes)
// set_background_mode_child — set child window background
export function FUN_005db9b8(param_1, param_2, param_3) {
  // DEVIATION: Win32 — if (param_1 == '\0') {
  // DEVIATION: Win32 — FUN_005bd298(0,1,param_2,param_3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00414d10(1,param_2,param_3);
  // DEVIATION: Win32 — FUN_005bd298(uVar1);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005dba15 (88 bytes)
// set_background_mode_transparent — set transparent background
export function FUN_005dba15(param_1, param_2, param_3) {
  // DEVIATION: Win32 — if (param_1 == '\0') {
  // DEVIATION: Win32 — FUN_005bd298(0,0,param_2,param_3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00414d10(0,param_2,param_3);
  // DEVIATION: Win32 — FUN_005bd298(uVar1);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005dba72 (35 bytes)
// set_display_depth_truecolor
export function FUN_005dba72() {
  // DEVIATION: Win32 — gdi_D39E(0x400);
}

// Source: decompiled/block_005D0000.c FUN_005dba95 (35 bytes)
// set_display_depth_256
export function FUN_005dba95() {
  // DEVIATION: Win32 — gdi_D39E(0x100);
}

// Source: decompiled/block_005D0000.c FUN_005dbab8 (35 bytes)
// set_display_depth_hicolor
export function FUN_005dbab8() {
  // DEVIATION: Win32 — gdi_D39E(0x200);
}

// Source: decompiled/block_005D0000.c FUN_005dbadb (27 bytes)
// lock_display — lock display surface
export function FUN_005dbadb() {
  // DEVIATION: Win32 — FUN_005bd4cd();
}

// Source: decompiled/block_005D0000.c FUN_005dbaf6 (27 bytes)
// unlock_display — unlock display surface
export function FUN_005dbaf6() {
  // DEVIATION: Win32 — FUN_005bd500();
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: App initialization / shutdown
// ═══════════════════════════════════════════════════════════════════

// app_init — initialize SMEDS application
export function FUN_005dbb20(param_1, param_2) {
  G.DAT_006e4ff0 = param_1; G.DAT_006e4fec = param_2;
  FUN_005dbbb3();
  FUN_005dbbd6();
  return 1;
}

// app_shutdown — shutdown SMEDS application
export function FUN_005dbb4f() { return 1; }

// Source: decompiled/block_005D0000.c FUN_005dbbb3 (35 bytes)
// init_subsystems_a — init display subsystem
export function FUN_005dbbb3() {
  // DEVIATION: Win32 — thunk_FUN_00417ef0(2, 0xe);
  FUN_005cd6e0();
}

// Source: decompiled/block_005D0000.c FUN_005dbbd6 (69 bytes)
// init_subsystems_b — init windows + timer + RNG
export function FUN_005dbbd6() {
  // DEVIATION: Win32 — if (G.DAT_006e4fec == 0) { register_wndclass_BC5A(); }
  // DEVIATION: Win32 — register_wndclass_D8A0();
  FUN_005dbc3a();
  var tVar1 = Math.floor(Date.now() / 1000);
  FUN_005f2260(tVar1);
  // DEVIATION: Win32 — InitCommonControls();
}

// Source: decompiled/block_005D0000.c FUN_005dbc1b (31 bytes)
// shutdown_subsystems — shutdown all subsystems
export function FUN_005dbc1b() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dbc3a (16 bytes)
// init_hook_noop — empty init hook
export function FUN_005dbc3a() {
  // C: return; (truly empty function)
}

// Source: decompiled/block_005D0000.c FUN_005dbc4a (16 bytes)
// shutdown_hook_noop — empty shutdown hook
export function FUN_005dbc4a() {
  // C: return; (truly empty function)
}

// Source: decompiled/block_005D0000.c register_wndclass_BC5A (352 bytes)
// register_all_window_classes — register SMEDS window classes
export function register_wndclass_BC5A() {
  // DEVIATION: Win32 — local_2c.style = 0x28;
  // DEVIATION: Win32 — local_2c.lpfnWndProc = fill_rect_BE88;
  // DEVIATION: Win32 — local_2c.cbClsExtra = 0;
  // DEVIATION: Win32 — local_2c.cbWndExtra = 0x14;
  // DEVIATION: Win32 — local_2c.hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — local_2c.hIcon = (HICON)0x0;
  // DEVIATION: Win32 — local_2c.hCursor = (HCURSOR)0x0;
  // DEVIATION: Win32 — local_2c.hbrBackground = (HBRUSH)0x0;
  // DEVIATION: Win32 — local_2c.lpszMenuName = (LPCSTR)0x0;
  // DEVIATION: Win32 — local_2c.lpszClassName = s_MSWindowClass_00638810;
  // DEVIATION: Win32 — RegisterClassA(&local_2c);
  // DEVIATION: Win32 — local_2c.style = 0x28;
  // DEVIATION: Win32 — local_2c.lpfnWndProc = FUN_005ec317;
  // DEVIATION: Win32 — local_2c.cbClsExtra = 0;
  // DEVIATION: Win32 — local_2c.cbWndExtra = 0x14;
  // DEVIATION: Win32 — local_2c.hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — local_2c.hIcon = (HICON)0x0;
  // DEVIATION: Win32 — local_2c.hCursor = (HCURSOR)0x0;
  // DEVIATION: Win32 — local_2c.hbrBackground = (HBRUSH)0x0;
  // DEVIATION: Win32 — local_2c.lpszMenuName = (LPCSTR)0x0;
  // DEVIATION: Win32 — local_2c.lpszClassName = s_MSMovieClass_00638820;
  // DEVIATION: Win32 — RegisterClassA(&local_2c);
  // DEVIATION: Win32 — local_2c.style = 0x88;
  // DEVIATION: Win32 — local_2c.lpfnWndProc = send_msg_9307;
  // DEVIATION: Win32 — local_2c.cbClsExtra = 0;
  // DEVIATION: Win32 — local_2c.cbWndExtra = 0x10;
  // DEVIATION: Win32 — local_2c.hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — local_2c.hIcon = (HICON)0x0;
  // DEVIATION: Win32 — local_2c.hCursor = LoadCursorA((HINSTANCE)0x0,(LPCSTR)0x7f00);
  // DEVIATION: Win32 — local_2c.hbrBackground = (HBRUSH)0x0;
  // DEVIATION: Win32 — local_2c.lpszMenuName = (LPCSTR)0x0;
  // DEVIATION: Win32 — local_2c.lpszClassName = s_MSControlClass_00638830;
  // DEVIATION: Win32 — RegisterClassA(&local_2c);
  // DEVIATION: Win32 — local_2c.style = 0;
  // DEVIATION: Win32 — local_2c.lpfnWndProc = FUN_005d4700;
  // DEVIATION: Win32 — local_2c.cbClsExtra = 0;
  // DEVIATION: Win32 — local_2c.cbWndExtra = 4;
  // DEVIATION: Win32 — local_2c.hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — local_2c.hIcon = (HICON)0x0;
  // DEVIATION: Win32 — local_2c.hCursor = (HCURSOR)0x0;
  // DEVIATION: Win32 — local_2c.hbrBackground = (HBRUSH)0x0;
  // DEVIATION: Win32 — local_2c.lpszMenuName = (LPCSTR)0x0;
  // DEVIATION: Win32 — local_2c.lpszClassName = s_MSMrTimerClass_00638840;
  // DEVIATION: Win32 — RegisterClassA(&local_2c);
}

// Source: decompiled/block_005D0000.c FUN_005dbdba (206 bytes)
// unregister_all_window_classes — unregister SMEDS window classes
export function FUN_005dbdba() {
  // DEVIATION: Win32 — BVar1 = UnregisterClassA(s_MSAppWindow_00638850,G.DAT_006e4ff0);
  // DEVIATION: Win32 — if (BVar1 == 0) {
  // DEVIATION: Win32 — debug_log(s_Error__Cannot_unregister_AppWind_0063885c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — BVar1 = UnregisterClassA(s_MSWindowClass_00638888,G.DAT_006e4ff0);
  // DEVIATION: Win32 — if (BVar1 == 0) {
  // DEVIATION: Win32 — debug_log(s_Error__Cannot_unregister_window_c_00638898);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — BVar1 = UnregisterClassA(s_MSMovieClass_006388c0,G.DAT_006e4ff0);
  // DEVIATION: Win32 — if (BVar1 == 0) {
  // DEVIATION: Win32 — debug_log(s_Error__Cannot_unregister_window_c_006388d0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — BVar1 = UnregisterClassA(s_MSControlClass_006388f8,G.DAT_006e4ff0);
  // DEVIATION: Win32 — if (BVar1 == 0) {
  // DEVIATION: Win32 — debug_log(s_Error__Cannot_unregister_control_00638908);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — BVar1 = UnregisterClassA(s_MSMrTimerClass_00638930,G.DAT_006e4ff0);
  // DEVIATION: Win32 — if (BVar1 == 0) {
  // DEVIATION: Win32 — debug_log(s_Error__Cannot_unregister_timer_c_00638940);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c fill_rect_BE88 (3076 bytes)
// main_wndproc — main window procedure
export function fill_rect_BE88(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — tagPAINTSTRUCT local_98;
  // DEVIATION: Win32 — int local_58;
  // DEVIATION: Win32 — LONG local_54;
  // DEVIATION: Win32 — HDC local_50;
  // DEVIATION: Win32 — int local_4c;
  // DEVIATION: Win32 — int local_48;
  // DEVIATION: Win32 — CView *local_44;
  // DEVIATION: Win32 — int local_40;
  // DEVIATION: Win32 — CView *local_3c;
  // DEVIATION: Win32 — RECT local_38;
  // DEVIATION: Win32 — tagRECT local_28;
  // DEVIATION: Win32 — int local_18;
  // DEVIATION: Win32 — tagRECT local_14;
  // DEVIATION: Win32 — if (param_2 < 0x10) {
  // DEVIATION: Win32 — if (param_2 == 0xf) {
  // DEVIATION: Win32 — local_50 = BeginPaint(param_1,&local_98);
  // DEVIATION: Win32 — local_54 = GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — BVar4 = IsIconic(param_1);
  // DEVIATION: Win32 — if (BVar4 != 0) {
  // DEVIATION: Win32 — GetWindowRect(param_1,&local_14);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(int *)(iVar6 + 0x20) == 0) {
  // DEVIATION: Win32 — hIcon = LoadIconA((HINSTANCE)0x0,(LPCSTR)0x7f00);
  // DEVIATION: Win32 — DrawIcon(local_50,0,0,hIcon);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if ((*(int *)(iVar6 + 0x18) != 0) && (G.DAT_00638b48 == 1)) {
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — RealizePalette(*(HDC *)(iVar6 + 8));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — DrawIcon(local_50,0,0,*(HICON *)(iVar6 + 0x20));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(int *)(iVar6 + 0x24) == 0) {
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(int *)(iVar6 + 0x14) != 0) {
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — FillRect(local_50,&local_98.rcPaint,*(HBRUSH *)(iVar6 + 0x14));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: MFC — local_3c = COleClientItem::GetActiveView(*(COleClientItem **)(iVar6 + 0x24));
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: MFC — local_44 = COleClientItem::GetActiveView(*(COleClientItem **)(iVar6 + 0x24));
  // DEVIATION: Win32 — if ((local_3c != (CView *)0x0) && (local_44 != (CView *)0x0)) {
  // DEVIATION: Win32 — local_38.left = local_98.rcPaint.left;
  // DEVIATION: Win32 — local_38.top = local_98.rcPaint.top;
  // DEVIATION: Win32 — local_38.right = local_98.rcPaint.right;
  // DEVIATION: Win32 — local_38.bottom = local_98.rcPaint.bottom;
  // DEVIATION: Win32 — SetRect(&local_14,0,0,(int)local_3c,(int)local_44);
  // DEVIATION: Win32 — for (local_58 = local_38.top / (int)local_44;
  // DEVIATION: Win32 — local_58 < local_38.bottom / (int)local_44 + 1; local_58 = local_58 + 1) {
  // DEVIATION: Win32 — for (local_4c = local_38.left / (int)local_3c;
  // DEVIATION: Win32 — local_4c < local_38.right / (int)local_3c + 1; local_4c = local_4c + 1) {
  // DEVIATION: Win32 — SetRect(&local_28,local_4c * (int)local_3c,local_58 * (int)local_44,
  // DEVIATION: Win32 — (int)(local_3c + local_4c * (int)local_3c),
  // DEVIATION: Win32 — (int)(local_44 + local_58 * (int)local_44));
  // DEVIATION: Win32 — ptVar10 = &local_28;
  // DEVIATION: Win32 — ptVar9 = &local_14;
  // DEVIATION: Win32 — LVar8 = local_54;
  // DEVIATION: Win32 — thunk_FUN_00414d10(local_54,ptVar9,ptVar10);
  // DEVIATION: Win32 — FUN_005c0979(LVar8,ptVar9,ptVar10);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(int *)(iVar6 + 0x2c) != 0) {
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: MFC — local_3c = COleClientItem::GetActiveView(*(COleClientItem **)(iVar6 + 0x2c));
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: MFC — local_44 = COleClientItem::GetActiveView(*(COleClientItem **)(iVar6 + 0x2c));
  // DEVIATION: Win32 — local_38.left = local_98.rcPaint.left;
  // DEVIATION: Win32 — local_38.top = local_98.rcPaint.top;
  // DEVIATION: Win32 — local_38.right = local_98.rcPaint.right;
  // DEVIATION: Win32 — local_38.bottom = local_98.rcPaint.bottom;
  // DEVIATION: Win32 — SetRect(&local_14,0,0,(int)local_3c,(int)local_44);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414bb0();
  // DEVIATION: Win32 — iVar6 = iVar6 - (int)local_44 >> 1;
  // DEVIATION: Win32 — iVar7 = thunk_FUN_004080c0();
  // DEVIATION: Win32 — OffsetRect(&local_14,iVar7 - (int)local_3c >> 1,iVar6);
  // DEVIATION: Win32 — BVar4 = IntersectRect(&local_28,&local_14,&local_38);
  // DEVIATION: Win32 — if (BVar4 != 0) {
  // DEVIATION: Win32 — local_14.left = local_28.left;
  // DEVIATION: Win32 — local_14.top = local_28.top;
  // DEVIATION: Win32 — local_14.right = local_28.right;
  // DEVIATION: Win32 — local_14.bottom = local_28.bottom;
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414bb0();
  // DEVIATION: Win32 — iVar6 = -(iVar6 - (int)local_44 >> 1);
  // DEVIATION: Win32 — iVar7 = thunk_FUN_004080c0();
  // DEVIATION: Win32 — OffsetRect(&local_14,-(iVar7 - (int)local_3c >> 1),iVar6);
  // DEVIATION: Win32 — ptVar10 = &local_28;
  // DEVIATION: Win32 — ptVar9 = &local_14;
  // DEVIATION: Win32 — LVar8 = local_54;
  // DEVIATION: Win32 — thunk_FUN_00414d10(local_54,ptVar9,ptVar10);
  // DEVIATION: Win32 — FUN_005c0979(LVar8,ptVar9,ptVar10);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — EndPaint(param_1,&local_98);
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — switch(param_2) {
  // DEVIATION: Win32 — case 2:
  // DEVIATION: Win32 — SetMenu(param_1,(HMENU)0x0);
  // DEVIATION: Win32 — GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — *(undefined4 *)(iVar6 + 0x44) = 1;
  // DEVIATION: Win32 — if ((*(byte *)(iVar6 + 0x49) & 2) != 0) {
  // DEVIATION: Win32 — iVar6 = 0;
  // DEVIATION: Win32 — pHVar2 = GetParent(param_1);
  // DEVIATION: Win32 — GetWindowLongA(pHVar2,iVar6);
  // DEVIATION: Win32 — local_18 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(HWND *)(local_18 + 0xc) == param_1) {
  // DEVIATION: Win32 — *(undefined4 *)(local_18 + 0xc) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar5 = DefWindowProcA(param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — return LVar5;
  // DEVIATION: Win32 — case 3:
  // DEVIATION: Win32 — local_54 = GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — if (local_54 != 0) {
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar3 = *(HDC *)(iVar6 + 8);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — ReleaseDC(*(HWND *)(iVar6 + 4),pHVar3);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar3 = GetDC(*(HWND *)(iVar7 + 4));
  // DEVIATION: Win32 — *(HDC *)(iVar6 + 8) = pHVar3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — case 5:
  // DEVIATION: Win32 — local_54 = GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — if ((local_54 != 0) && (iVar6 = thunk_FUN_00414d10(), *(int *)(iVar6 + 0x2c) != 0)) {
  // DEVIATION: Win32 — InvalidateRect(param_1,(RECT *)0x0,1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_54 != 0) {
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar3 = *(HDC *)(iVar6 + 8);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — ReleaseDC(*(HWND *)(iVar6 + 4),pHVar3);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — pHVar3 = GetDC(*(HWND *)(iVar7 + 4));
  // DEVIATION: Win32 — *(HDC *)(iVar6 + 8) = pHVar3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — case 7:
  // DEVIATION: Win32 — GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(int *)(iVar6 + 0xc) != 0) {
  // DEVIATION: Win32 — SendMessageA(*(HWND *)(iVar6 + 0xc),0x86,1,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — break;
  // DEVIATION: Win32 — case 8:
  // DEVIATION: Win32 — GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(int *)(iVar6 + 0xc) != 0) {
  // DEVIATION: Win32 — SendMessageA(*(HWND *)(iVar6 + 0xc),0x86,0,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (param_2 < 0x47) {
  // DEVIATION: Win32 — if (param_2 == 0x46) {
  // DEVIATION: Win32 — if ((*(byte *)(param_4 + 0x18) & 4) == 0) {
  // DEVIATION: Win32 — local_54 = GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — thunk_FUN_00414d10();
  // DEVIATION: Win32 — uVar1 = FUN_005bd610();
  // DEVIATION: Win32 — if ((uVar1 & 0x200) != 0) {
  // DEVIATION: Win32 — iVar6 = 0;
  // DEVIATION: Win32 — pHVar2 = GetParent(param_1);
  // DEVIATION: Win32 — GetWindowLongA(pHVar2,iVar6);
  // DEVIATION: Win32 — local_18 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (((*(int *)(local_18 + 0x10) != 0) && (*(HWND *)(local_18 + 0x10) != param_1)) &&
  // DEVIATION: Win32 — (BVar4 = IsWindowVisible(*(HWND *)(local_18 + 0x10)), BVar4 != 0)) {
  // DEVIATION: Win32 — *(undefined4 *)(param_4 + 4) = *(undefined4 *)(local_18 + 0x10);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (param_2 == 0x22) {
  // DEVIATION: Win32 — GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if ((*(byte *)(iVar6 + 0x49) & 2) != 0) {
  // DEVIATION: Win32 — iVar6 = 0;
  // DEVIATION: Win32 — pHVar2 = GetParent(param_1);
  // DEVIATION: Win32 — GetWindowLongA(pHVar2,iVar6);
  // DEVIATION: Win32 — local_18 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if (*(int *)(local_18 + 0xc) != 0) {
  // DEVIATION: Win32 — SendMessageA(*(HWND *)(local_18 + 0xc),0x86,0,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — SendMessageA(param_1,0x86,1,0);
  // DEVIATION: Win32 — *(HWND *)(local_18 + 0xc) = param_1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (param_2 < 0xa5) {
  // DEVIATION: Win32 — if ((param_2 != 0xa4) && (param_2 != 0xa1)) goto switchD_005dc5f2_caseD_4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (param_2 == 0x112) {
  // DEVIATION: Win32 — if ((param_3 == 0xf100) || (param_3 == 0xf090)) {
  // DEVIATION: Win32 — GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if ((*(byte *)(iVar6 + 0x48) & 0x20) == 0) {
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — goto switchD_005dc5f2_caseD_4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((param_2 != 0x201) && (param_2 != 0x204)) goto switchD_005dc5f2_caseD_4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if ((*(byte *)(iVar6 + 0x49) & 2) != 0) {
  // DEVIATION: Win32 — SetFocus(*(HWND *)(iVar6 + 4));
  // DEVIATION: Win32 — BringWindowToTop(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — switchD_005dc5f2_caseD_4:
  // DEVIATION: Win32 — local_a0 = DefWindowProcA(param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — if (param_2 == 0x84) {
  // DEVIATION: Win32 — GetWindowLongA(param_1,0);
  // DEVIATION: Win32 — iVar6 = thunk_FUN_00414d10();
  // DEVIATION: Win32 — if ((*(int *)(iVar6 + 0x34) != 0) && (local_a0 == 1)) {
  // DEVIATION: Win32 — GetWindowRect(param_1,&local_14);
  // DEVIATION: Win32 — local_40 = (param_4 & 0xffff) - local_14.left;
  // DEVIATION: Win32 — local_48 = (param_4 >> 0x10) - local_14.top;
  // DEVIATION: Win32 — if (*(int *)(iVar6 + 0x3c) == 0) {
  // DEVIATION: Win32 — local_3c = (CView *)0x5;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_3c = *(CView **)(iVar6 + 0x3c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — GetClientRect(param_1,&local_28);
  // DEVIATION: Win32 — local_58 = 0;
  // DEVIATION: Win32 — local_4c = 0;
  // DEVIATION: Win32 — if (local_48 < (int)local_3c) {
  // DEVIATION: Win32 — local_58 = -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00407fc0(&local_28);
  // DEVIATION: Win32 — if (iVar7 - (int)local_3c < local_48) {
  // DEVIATION: Win32 — local_58 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_40 < (int)local_3c) {
  // DEVIATION: Win32 — local_4c = -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00407f90(&local_28);
  // DEVIATION: Win32 — if (iVar7 - (int)local_3c < local_40) {
  // DEVIATION: Win32 — local_4c = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_58 < 0) {
  // DEVIATION: Win32 — if (local_40 < (int)local_3c * 4) {
  // DEVIATION: Win32 — local_4c = -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00407f90(&local_28);
  // DEVIATION: Win32 — if (iVar7 + (int)local_3c * -4 < local_40) {
  // DEVIATION: Win32 — local_4c = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_4c < 0) {
  // DEVIATION: Win32 — local_a0 = 0xd;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (local_4c < 1) {
  // DEVIATION: Win32 — local_a0 = 0xc;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_a0 = 0xe;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (local_58 < 1) {
  // DEVIATION: Win32 — if (local_4c < 0) {
  // DEVIATION: Win32 — if (local_48 < (int)local_3c * 4) {
  // DEVIATION: Win32 — local_58 = -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00407fc0(&local_28);
  // DEVIATION: Win32 — if (iVar7 + (int)local_3c * -4 < local_48) {
  // DEVIATION: Win32 — local_58 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_58 < 0) {
  // DEVIATION: Win32 — local_a0 = 0xd;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (local_58 < 1) {
  // DEVIATION: Win32 — local_a0 = 10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_a0 = 0x10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (0 < local_4c) {
  // DEVIATION: Win32 — if (local_48 < (int)local_3c * 4) {
  // DEVIATION: Win32 — local_58 = -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00407fc0(&local_28);
  // DEVIATION: Win32 — if (iVar7 + (int)local_3c * -4 < local_48) {
  // DEVIATION: Win32 — local_58 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_58 < 0) {
  // DEVIATION: Win32 — local_a0 = 0xe;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (local_58 < 1) {
  // DEVIATION: Win32 — local_a0 = 0xb;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_a0 = 0x11;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — if (local_40 < (int)local_3c * 4) {
  // DEVIATION: Win32 — local_4c = -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar7 = thunk_FUN_00407f90(&local_28);
  // DEVIATION: Win32 — if (iVar7 + (int)local_3c * -4 < local_40) {
  // DEVIATION: Win32 — local_4c = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_4c < 0) {
  // DEVIATION: Win32 — local_a0 = 0x10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (local_4c < 1) {
  // DEVIATION: Win32 — local_a0 = 0xf;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_a0 = 0x11;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((*(int *)(iVar6 + 0x30) != 0) && (local_a0 == 1)) {
  // DEVIATION: Win32 — GetWindowRect(param_1,&local_14);
  // DEVIATION: Win32 — local_48 = (param_4 >> 0x10) - local_14.top;
  // DEVIATION: Win32 — if ((*(int *)(iVar6 + 0x38) == 0) || (local_48 < *(int *)(iVar6 + 0x38))) {
  // DEVIATION: Win32 — local_a0 = 2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_a0 == 1) {
  // DEVIATION: Win32 — SetCursor(*(HCURSOR *)(iVar6 + 0x1c));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_a0;
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Memory management
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005dcac0 (57 bytes)
// timer_destructor — destroy MrTimer with optional delete
export function FUN_005dcac0(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dcb00 (28 bytes)
// mem_duplicate_handle — duplicate memory handle
export function FUN_005dcb00(param_1) {
  // DEVIATION: Win32 — FUN_005dcd70(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dcb1c (28 bytes)
// mem_lock — lock memory handle
export function FUN_005dcb1c(param_1) {
  // DEVIATION: Win32 — FUN_005dcdf9(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dcb38 (28 bytes)
// mem_unlock — unlock memory handle
export function FUN_005dcb38(param_1) {
  // DEVIATION: Win32 — FUN_005dce29(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dcb54 (28 bytes)
// mem_alloc — allocate memory handle
export function FUN_005dcb54(param_1) {
  // DEVIATION: Win32 — FUN_005dce4f(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dcb70 (28 bytes)
// mem_free — free memory handle
export function FUN_005dcb70(param_1) {
  // DEVIATION: Win32 — FUN_005dce96(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dcb8c (36 bytes)
// mem_copy — copy memory block
export function FUN_005dcb8c(param_1, param_2, param_3) {
  // DEVIATION: Win32 — FUN_005dced3(param_1,param_2,param_3);
}

// Source: decompiled/block_005D0000.c FUN_005dcbb0 (28 bytes)
// mem_size — get memory block size
export function FUN_005dcbb0(param_1) {
  // DEVIATION: Win32 — FUN_005dcef7(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dcbcc (32 bytes)
// mem_realloc — reallocate memory block
export function FUN_005dcbcc(param_1, param_2) {
  // DEVIATION: Win32 — FUN_005dcf11(param_1,param_2);
}

// Source: decompiled/block_005D0000.c FUN_005dcbec (21 bytes)
// mem_get_avail — get available memory
export function FUN_005dcbec() {
  // DEVIATION: Win32 — FUN_005dcfb5();
}

// Source: decompiled/block_005D0000.c FUN_005dcc10 (34 bytes)
// stream_ctor — construct stream object
export function FUN_005dcc10() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c ~_Timevec (36 bytes)
// timevec_destructor — ~_Timevec destructor
export function _Timevec_destructor(param_1) {
  // DEVIATION: Win32 — FUN_005e10c7(*(undefined4 *)this);
}

// Source: decompiled/block_005D0000.c FUN_005dcc56 (63 bytes)
// menu_create_from_resource — create menu from resource
export function FUN_005dcc56(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dcc95 (44 bytes)
// menu_add_item — add menu item
export function FUN_005dcc95(param_1, param_2, param_3) {
  // DEVIATION: Win32 — build_menu_1768(param_1,param_3,param_2);
}

// Source: decompiled/block_005D0000.c Realloc (40 bytes)
// Realloc — reallocate buffer (CMemFile)
export function Realloc(param_1, param_2) {
  // DEVIATION: Win32 — FUN_005e17db(param_1,param_2);
}

// Source: decompiled/block_005D0000.c FUN_005dcce9 (51 bytes)
// menu_destroy_from_resource — destroy menu from resource
export function FUN_005dcce9(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dcd1c (36 bytes)
// menu_destroy — destroy menu
export function FUN_005dcd1c(param_1) {
  // DEVIATION: Win32 — build_menu_1805(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dcd40 (42 bytes)
// menu_seek — seek in menu resource
export function FUN_005dcd40(param_1) {
  // DEVIATION: Win32 — FUN_005e1599(*in_ECX,param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dcd70 (137 bytes)
// handle_duplicate — duplicate a global memory handle
export function FUN_005dcd70(param_1) {
  // DEVIATION: Win32 — SIZE_T _Size;
  // DEVIATION: Win32 — HGLOBAL hMem;
  // DEVIATION: Win32 — LPVOID _Dst;
  // DEVIATION: Win32 — LPVOID _Src;
  // DEVIATION: Win32 — _Size = GlobalSize((HGLOBAL)*param_1);
  // DEVIATION: Win32 — hMem = (HGLOBAL)FUN_005dce4f(_Size);
  // DEVIATION: Win32 — if (hMem != (HGLOBAL)0x0) {
  // DEVIATION: Win32 — _Dst = GlobalLock(hMem);
  // DEVIATION: Win32 — _Src = GlobalLock((HGLOBAL)*param_1);
  // DEVIATION: Win32 — FID_conflict__memcpy(_Dst,_Src,_Size);
  // DEVIATION: Win32 — GlobalUnlock(hMem);
  // DEVIATION: Win32 — GlobalUnlock((HGLOBAL)*param_1);
  // DEVIATION: Win32 — *param_1 = hMem;
  // DEVIATION: Win32 — }
}

// handle_lock — lock a global handle, return pointer
export function FUN_005dcdf9(param_1) { return param_1 ? param_1 : null; }

// Source: decompiled/block_005D0000.c FUN_005dce29 (38 bytes)
// handle_unlock — unlock a global handle
export function FUN_005dce29(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dce4f (71 bytes)
// handle_alloc — allocate global memory
export function FUN_005dce4f(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dce96 (56 bytes)
// handle_free — free global memory
export function FUN_005dce96(param_1) {
  // DEVIATION: Win32 — if (param_1 == (HGLOBAL)0x0) {
  // DEVIATION: Win32 — debug_log(s_Error__Tried_to_dispose_of_NULL_H_00638994);
  // DEVIATION: Win32 — pvVar1 = (HGLOBAL)0x0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — pvVar1 = GlobalFree(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return pvVar1;
}

// Source: decompiled/block_005D0000.c FUN_005dced3 (36 bytes)
// mem_copy_raw — raw memory copy
export function FUN_005dced3(param_1, param_2, param_3) {
  // DEVIATION: Win32 — FID_conflict__memcpy(param_2,param_1,param_3);
}

// Source: decompiled/block_005D0000.c FUN_005dcef7 (26 bytes)
// handle_get_size — get global handle size
export function FUN_005dcef7(param_1) {
  // DEVIATION: Win32 — GlobalSize(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005dcf11 (164 bytes)
// handle_resize — resize global handle
export function FUN_005dcf11(param_1, param_2) {
  // DEVIATION: Win32 — uVar1 = FUN_005dce4f(param_2);
  // DEVIATION: Win32 — uVar2 = FUN_005dcdf9(*param_1);
  // DEVIATION: Win32 — uVar3 = FUN_005dcdf9(uVar1);
  // DEVIATION: Win32 — iVar4 = FUN_005dcef7(*param_1);
  // DEVIATION: Win32 — if (param_2 <= iVar4) {
  // DEVIATION: Win32 — iVar4 = param_2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005dced3(uVar2,uVar3,iVar4);
  // DEVIATION: Win32 — FUN_005dce29(uVar1);
  // DEVIATION: Win32 — FUN_005dce29(*param_1);
  // DEVIATION: Win32 — FUN_005dce96(*param_1);
  // DEVIATION: Win32 — *param_1 = uVar1;
}

// get_max_memory — get max available memory
export function FUN_005dcfb5() { return 0x100000; }

// Source: decompiled/block_005D0000.c FUN_005dcfca (58 bytes)
// is_low_memory — check if memory is low
export function FUN_005dcfca(param_1) {
  // DEVIATION: Win32 — return 0x100000 < param_1 << 10;
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: App object (CFrameWnd subclass)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005dd010 (336 bytes)
// app_construct — construct app singleton
export function FUN_005dd010() {
  // DEVIATION: Win32 — SEH frame + Win32 API calls
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — SEH: puStack_c = &LAB_005dd187;
  // DEVIATION: Win32 — SEH: local_10 = *unaff_FS_OFFSET;
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = &local_10;
  // DEVIATION: Win32 — thunk_FUN_0044c5a0();
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — FUN_005eeca0();
  // DEVIATION: Win32 — local_8._0_1_ = 1;
  // DEVIATION: Win32 — FUN_005c64da();
  // DEVIATION: Win32 — local_8 = CONCAT31(local_8._1_3_,2);
  // DEVIATION: Win32 — FUN_005bd630();
  // DEVIATION: Win32 — *in_ECX = &PTR_FUN_0061d718;
  // DEVIATION: Win32 — in_ECX[0x45] = 0;
  // DEVIATION: Win32 — in_ECX[0x168] = 0;
  // DEVIATION: Win32 — in_ECX[0x169] = 0;
  // DEVIATION: Win32 — in_ECX[0x16d] = 0;
  // DEVIATION: Win32 — in_ECX[0x16a] = 1;
  // DEVIATION: Win32 — in_ECX[0x16c] = 0;
  // DEVIATION: Win32 — in_ECX[0x16d] = 0;
  // DEVIATION: Win32 — in_ECX[0x284] = 0;
  // DEVIATION: Win32 — in_ECX[0x285] = 0;
  // DEVIATION: Win32 — in_ECX[0x286] = 0;
  // DEVIATION: Win32 — in_ECX[0x287] = 0;
  // DEVIATION: Win32 — in_ECX[0x288] = 0;
  // DEVIATION: Win32 — in_ECX[0x16b] = 1;
  // DEVIATION: Win32 — in_ECX[0x289] = 0;
  // DEVIATION: Win32 — _DAT_006389d0 = in_ECX;
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = local_10;
  // DEVIATION: Win32 — return in_ECX;
}

// Source: decompiled/block_005D0000.c FUN_005dd1a0 (144 bytes)
// app_destruct — destruct app singleton
export function FUN_005dd1a0() {
  // DEVIATION: Win32 — SEH frame + Win32 API calls
  // DEVIATION: Win32 — SEH: puStack_c = &LAB_005dd266;
  // DEVIATION: Win32 — SEH: uStack_10 = *unaff_FS_OFFSET;
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = &uStack_10;
  // DEVIATION: Win32 — *in_ECX = &PTR_FUN_0061d718;
  // DEVIATION: Win32 — local_8._1_3_ = 0;
  // DEVIATION: Win32 — local_8._0_1_ = 3;
  // DEVIATION: Win32 — FUN_005e2675();
  // DEVIATION: Win32 — FUN_005e2799(in_ECX);
  // DEVIATION: Win32 — _DAT_006389d0 = 0;
  // DEVIATION: Win32 — local_8._0_1_ = 2;
  // DEVIATION: Win32 — FUN_005dd230();
  // DEVIATION: Win32 — local_8._0_1_ = 1;
  // DEVIATION: Win32 — FUN_005dd23f();
  // DEVIATION: Win32 — local_8 = (uint)local_8._1_3_ << 8;
  // DEVIATION: Win32 — FUN_005dd24e();
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — FUN_005dd25d();
  // DEVIATION: Win32 — FUN_005dd270();
}

// Source: decompiled/block_005D0000.c FUN_005dd230 (15 bytes)
// app_destruct_bitmaps — destroy bitmap subsystem
export function FUN_005dd230() {
  // DEVIATION: Win32 — FUN_005bd915();
}

// Source: decompiled/block_005D0000.c FUN_005dd23f (15 bytes)
// app_destruct_fonts — destroy font subsystem
export function FUN_005dd23f() {
  // DEVIATION: Win32 — FUN_005c656b();
}

// Source: decompiled/block_005D0000.c FUN_005dd24e (15 bytes)
// app_destruct_animations — destroy animation subsystem
export function FUN_005dd24e() {
  // DEVIATION: Win32 — FUN_005eed1b();
}

// Source: decompiled/block_005D0000.c FUN_005dd25d (9 bytes)
// app_destruct_frame — destroy CFrameWnd
export function FUN_005dd25d() {
  // DEVIATION: Win32 — thunk_FUN_0044cba0();
}

// Source: decompiled/block_005D0000.c FUN_005dd270 (14 bytes)
// app_destruct_epilog — FS restoration
export function FUN_005dd270() {
  // DEVIATION: Win32 — SEH frame + Win32 API calls
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
}

// Source: decompiled/block_005D0000.c FUN_005dd27e (101 bytes)
// dialog_create — create dialog window
export function FUN_005dd27e(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dd2e3 (148 bytes)
// dialog_create_with_parent — create dialog with parent
export function FUN_005dd2e3(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — if (param_5 == 0) {
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = param_5 + 0x48;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — FUN_005bb4ae(param_1,param_2,param_3,param_4,0x140,0xf0,in_ECX + 0x124,local_8);
  // DEVIATION: Win32 — FUN_005c041f(0);
  // DEVIATION: Win32 — *(int *)(in_ECX + 0x5b4) = param_5;
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x5b8) = param_3;
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x5bc) = param_4;
}

// Source: decompiled/block_005D0000.c FUN_005dd377 (75 bytes)
// animation_load — load animation resource
export function FUN_005dd377(param_1) {
  // DEVIATION: Win32 — FUN_005e2799();
  // DEVIATION: Win32 — iVar1 = FUN_005e1c8e(in_ECX,param_1);
  // DEVIATION: Win32 — if (iVar1 == 0) {
  // DEVIATION: Win32 — iVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return iVar1;
}

// Source: decompiled/block_005D0000.c FUN_005dd3c2 (47 bytes)
// animation_reset — reset animation state
export function FUN_005dd3c2() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dd3f1 (108 bytes)
// animation_set_range — set animation frame range
export function FUN_005dd3f1(param_1, param_2) {
  // DEVIATION: Win32 — if (param_1 <= param_2) {
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0xa24) = 0;
  // DEVIATION: Win32 — FUN_005e28cd();
  // DEVIATION: Win32 — *(int *)(in_ECX + 0xa14) = param_2;
  // DEVIATION: Win32 — *(int *)(in_ECX + 0xa10) = param_1;
  // DEVIATION: Win32 — FUN_005e22ed(in_ECX);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005dd45d (42 bytes)
// animation_clear — clear animation buffers
export function FUN_005dd45d() {
  // DEVIATION: Win32 — FUN_005e28cd();
}

// Source: decompiled/block_005D0000.c FUN_005dd487 (59 bytes)
// animation_play — play animation
export function FUN_005dd487() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dd4c2 (91 bytes)
// animation_set_range_and_play — set range and play
export function FUN_005dd4c2(param_1, param_2) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dd51d (34 bytes)
// animation_stop — stop animation
export function FUN_005dd51d() {
  // DEVIATION: Win32 — FUN_005e2675();
}

// Source: decompiled/block_005D0000.c FUN_005dd53f (34 bytes)
// animation_start — start animation
export function FUN_005dd53f() {
  // DEVIATION: Win32 — FUN_005e26f6();
}

// Source: decompiled/block_005D0000.c FUN_005dd561 (67 bytes)
// set_text_and_scroll — set text with scrolling
export function FUN_005dd561(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dd5a4 (168 bytes)
// resize_to_bitmap — resize window to bitmap size
export function FUN_005dd5a4(param_1) {
  // DEVIATION: Win32 — CRichEditView *pCVar1;
  // DEVIATION: Win32 — CView *pCVar2;
  // DEVIATION: Win32 — CRichEditView *pCVar3;
  // DEVIATION: Win32 — CRichEditCntrItem *in_ECX;
  // DEVIATION: Win32 — tagRECT local_14;
  // DEVIATION: Win32 — show_messagebox_2997();
  // DEVIATION: MFC — pCVar1 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: MFC — pCVar2 = COleClientItem::GetActiveView(param_1);
  // DEVIATION: Win32 — if ((int)pCVar1 <= (int)pCVar2) {
  // DEVIATION: MFC — pCVar1 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: MFC — pCVar2 = COleClientItem::GetActiveView(param_1);
  // DEVIATION: Win32 — if ((int)pCVar1 <= (int)pCVar2) goto LAB_005dd60c;
  // DEVIATION: Win32 — }
  // DEVIATION: MFC — pCVar1 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: MFC — pCVar3 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: Win32 — FUN_005bd65c(pCVar3,pCVar1);
  // DEVIATION: Win32 — LAB_005dd60c:
  // DEVIATION: MFC — pCVar1 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: MFC — pCVar3 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: Win32 — SetRect(&local_14,0,0,(int)pCVar3,(int)pCVar1);
  // DEVIATION: Win32 — FUN_005c0593(param_1,&local_14,&local_14);
}

// Source: decompiled/block_005D0000.c FUN_005dd64c (210 bytes)
// offset_bitmap — offset bitmap within window
export function FUN_005dd64c(param_1, param_2, param_3) {
  // DEVIATION: Win32 — CRichEditView *pCVar2;
  // DEVIATION: Win32 — CRichEditView *xRight;
  // DEVIATION: Win32 — CRichEditCntrItem *in_ECX;
  // DEVIATION: Win32 — tagRECT local_24;
  // DEVIATION: Win32 — tagRECT local_14;
  // DEVIATION: Win32 — if ((-1 < param_2) && (-1 < param_3)) {
  // DEVIATION: MFC — pCVar1 = COleClientItem::GetActiveView(param_1);
  // DEVIATION: MFC — pCVar2 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: Win32 — if ((int)pCVar2 <= (int)pCVar1 - param_2) {
  // DEVIATION: MFC — pCVar1 = COleClientItem::GetActiveView(param_1);
  // DEVIATION: MFC — pCVar2 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: Win32 — if ((int)pCVar2 <= (int)pCVar1 - param_3) {
  // DEVIATION: Win32 — show_messagebox_2997(in_ECX,0);
  // DEVIATION: MFC — pCVar2 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: MFC — xRight = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: Win32 — SetRect(&local_24,0,0,(int)xRight,(int)pCVar2);
  // DEVIATION: Win32 — CopyRect(&local_14,&local_24);
  // DEVIATION: Win32 — OffsetRect(&local_14,param_2,param_3);
  // DEVIATION: Win32 — FUN_005c0593(param_1,&local_24,&local_14);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005dd71e (67 bytes)
// double_size_bitmap — double the bitmap display size
export function FUN_005dd71e() {
  // DEVIATION: Win32 — CRichEditView *pCVar1;
  // DEVIATION: Win32 — CRichEditCntrItem *in_ECX;
  // DEVIATION: Win32 — int iVar2;
  // DEVIATION: MFC — pCVar1 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: Win32 — iVar2 = (int)pCVar1 * 2;
  // DEVIATION: MFC — pCVar1 = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: Win32 — FUN_005bb6c7((int)pCVar1 * 2,iVar2);
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x5a0) = 1;
}

// Source: decompiled/block_005D0000.c FUN_005dd761 (125 bytes)
// toggle_visibility — toggle window visibility
export function FUN_005dd761(param_1) {
  // DEVIATION: Win32 — if (param_1 == 0) {
  // DEVIATION: Win32 — if (*(int *)(in_ECX + 0x5a4) != 0) {
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x5a4) = 0;
  // DEVIATION: Win32 — FUN_005e32b2();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (*(int *)(in_ECX + 0x5a4) == 0) {
  // DEVIATION: Win32 — *(undefined4 *)(in_ECX + 0x5a4) = 1;
  // DEVIATION: Win32 — FUN_005e32b2();
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005dd7de (159 bytes)
// render_offset_bitmap — render bitmap at offset
export function FUN_005dd7de() {
  // DEVIATION: Win32 — CRichEditView *yBottom;
  // DEVIATION: Win32 — CRichEditView *xRight;
  // DEVIATION: Win32 — CRichEditCntrItem *in_ECX;
  // DEVIATION: Win32 — tagRECT local_24;
  // DEVIATION: Win32 — tagRECT local_14;
  // DEVIATION: MFC — yBottom = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: MFC — xRight = CRichEditCntrItem::GetActiveView(in_ECX);
  // DEVIATION: Win32 — SetRect(&local_14,0,0,(int)xRight,(int)yBottom);
  // DEVIATION: Win32 — local_24.left = local_14.left;
  // DEVIATION: Win32 — local_24.top = local_14.top;
  // DEVIATION: Win32 — local_24.right = local_14.right;
  // DEVIATION: Win32 — local_24.bottom = local_14.bottom;
  // DEVIATION: Win32 — OffsetRect(&local_24,*(int *)(in_ECX + 0x5b8),*(int *)(in_ECX + 0x5bc));
  // DEVIATION: Win32 — if (*(int *)(in_ECX + 0x5b4) != 0) {
  // DEVIATION: Win32 — FUN_005c0593(in_ECX + 0x558,&local_24,&local_14);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005dd87d (16 bytes)
// empty_handler — no-op handler
export function FUN_005dd87d() {
  // C: return; (truly empty function)
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Multimedia (sound, MIDI, CD audio)
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c register_wndclass_D8A0 (159 bytes)
// register_mm_wndclass — register MSMMWindow class
export function register_wndclass_D8A0() {
  // DEVIATION: Win32 — local_2c.style = 0;
  // DEVIATION: Win32 — local_2c.lpfnWndProc = FUN_005dd93f;
  // DEVIATION: Win32 — local_2c.cbClsExtra = 0;
  // DEVIATION: Win32 — local_2c.cbWndExtra = 0;
  // DEVIATION: Win32 — local_2c.hInstance = G.DAT_006e4ff0;
  // DEVIATION: Win32 — local_2c.hIcon = (HICON)0x0;
  // DEVIATION: Win32 — local_2c.hCursor = (HCURSOR)0x0;
  // DEVIATION: Win32 — local_2c.hbrBackground = (HBRUSH)0x0;
  // DEVIATION: Win32 — local_2c.lpszMenuName = (LPCSTR)0x0;
  // DEVIATION: Win32 — local_2c.lpszClassName = s_MSMMWindow_006389e4;
  // DEVIATION: Win32 — RegisterClassA(&local_2c);
  // DEVIATION: Win32 — G.DAT_006e4ff8 = CreateWindowExA(0,s_MSMMWindow_006389f0,(LPCSTR)0x0,0,-0x80000000,-0x80000000,
  // DEVIATION: Win32 — -0x80000000,-0x80000000,(HWND)0x0,(HMENU)0x0,G.DAT_006e4ff0,
  // DEVIATION: Win32 — (LPVOID)0x0);
  // DEVIATION: Win32 — FUN_005ddd4e();
}

// Source: decompiled/block_005D0000.c FUN_005dd93f (149 bytes)
// mm_wndproc — multimedia window procedure
export function FUN_005dd93f(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — if (param_2 == 0x3b9) {
  // DEVIATION: Win32 — if (param_3 == 1) {
  // DEVIATION: Win32 — if ((param_4 & 0xffff) == G.DAT_006389d4) {
  // DEVIATION: Win32 — FUN_005de6bd();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if ((param_4 & 0xffff) == G.DAT_006389d8) {
  // DEVIATION: Win32 — FUN_005de714();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — LVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — LVar1 = DefWindowProcA(param_1,param_2,param_3,param_4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return LVar1;
}

// Source: decompiled/block_005D0000.c FUN_005dd9d9 (28 bytes)
// play_sound_async — play sound asynchronously
export function FUN_005dd9d9(param_1) {
  // DEVIATION: Win32 — sndPlaySoundA(param_1,1);
}

// Source: decompiled/block_005D0000.c FUN_005dd9f5 (28 bytes)
// play_sound_loop — play sound in loop
export function FUN_005dd9f5(param_1) {
  // DEVIATION: Win32 — sndPlaySoundA(param_1,9);
}

// Source: decompiled/block_005D0000.c FUN_005dda11 (26 bytes)
// stop_sound — stop sound playback
export function FUN_005dda11() {
  // DEVIATION: Win32 — sndPlaySoundA((LPCSTR)0x0,1);
}

// Source: decompiled/block_005D0000.c FUN_005dda2b (16 bytes)
// sound_noop — no-op sound handler
export function FUN_005dda2b() {
  // C: return; (truly empty function)
}

// Source: decompiled/block_005D0000.c FUN_005dda3b (24 bytes)
// play_beep — play system beep
export function FUN_005dda3b() {
  // DEVIATION: Win32 — MessageBeep(0xffffffff);
}

// Source: decompiled/block_005D0000.c show_messagebox_DA53 (372 bytes)
// midi_play — play MIDI file
export function show_messagebox_DA53(param_1) {
  // DEVIATION: Win32 — if (G.DAT_006389d4 != 0) {
  // DEVIATION: Win32 — FUN_005ddd12();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_24 = s_sequencer_006389fc;
  // DEVIATION: Win32 — local_20 = param_1;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(0,0x803,0x2200,(DWORD_PTR)local_2c);
  // DEVIATION: Win32 — if (MVar1 == 0) {
  // DEVIATION: Win32 — local_18 = local_28;
  // DEVIATION: Win32 — G.DAT_006389d4 = local_28;
  // DEVIATION: Win32 — local_c = 0x4003;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(local_28,0x814,0x100,(DWORD_PTR)local_14);
  // DEVIATION: Win32 — if (MVar1 == 0) {
  // DEVIATION: Win32 — if (((local_10 & 0xffff) != 0xffffffff) &&
  // DEVIATION: Win32 — (iVar2 = MessageBoxA((HWND)0x0,s_The_MIDI_Mapper_is_not_available_00638a48,&G.DAT_00638a44,4)
  // DEVIATION: Win32 — , iVar2 == 7)) {
  // DEVIATION: Win32 — mciSendCommandA(local_18,0x804,0,0);
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_38[0] = G.DAT_006e4ff8;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(local_18,0x806,1,(DWORD_PTR)local_38);
  // DEVIATION: Win32 — if (MVar1 == 0) {
  // DEVIATION: Win32 — MVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mciSendCommandA(local_18,0x804,0,0);
  // DEVIATION: Win32 — FUN_005d2279(s_Midi_Play_error_00638a74,MVar1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mciSendCommandA(local_18,0x804,0,0);
  // DEVIATION: Win32 — FUN_005d2279(s_Output_port_is_not_MIDI_Mapper_00638a24,MVar1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005d2279(s_Midi_Device_failed_to_open_00638a08,MVar1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return MVar1;
}

// Source: decompiled/block_005D0000.c FUN_005ddbc7 (326 bytes)
// cdaudio_play_track — play CD audio track
export function FUN_005ddbc7(param_1) {
  // DEVIATION: Win32 — DWORD_PTR local_14;
  // DEVIATION: Win32 — undefined4 local_10;
  // DEVIATION: Win32 — uint local_c;
  // DEVIATION: Win32 — MCIDEVICEID local_8;
  // DEVIATION: Win32 — if (G.DAT_006389d8 == 0) {
  // DEVIATION: Win32 — FUN_005ddd4e();
  // DEVIATION: Win32 — if (G.DAT_006389d8 == 0) {
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = G.DAT_006389d8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = G.DAT_006389d8;
  // DEVIATION: Win32 — mciSendCommandA(G.DAT_006389d8,0x808,0,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_10 = 0;
  // DEVIATION: Win32 — local_c = (uint)param_1;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(local_8,0x807,8,(DWORD_PTR)&local_10);
  // DEVIATION: Win32 — if (MVar1 == 0) {
  // DEVIATION: Win32 — if (param_1 == G.DAT_006389e0) {
  // DEVIATION: Win32 — local_14 = 5;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_14 = 0xd;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_1c = (uint)param_1;
  // DEVIATION: Win32 — local_18 = (uint)(byte)(param_1 + 1);
  // DEVIATION: Win32 — local_20 = G.DAT_006e4ff8;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(local_8,0x806,local_14,(DWORD_PTR)&local_20);
  // DEVIATION: Win32 — if (MVar1 == 0) {
  // DEVIATION: Win32 — uVar2 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005dde57();
  // DEVIATION: Win32 — FUN_005d2279(s_Failed_to_play_requested_CD_Trac_00638aa8,MVar1);
  // DEVIATION: Win32 — uVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005dde57();
  // DEVIATION: Win32 — FUN_005d2279(s_Failed_to_play_requested_CD_Trac_00638a84,MVar1);
  // DEVIATION: Win32 — uVar2 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar2;
}

// Source: decompiled/block_005D0000.c FUN_005ddd12 (60 bytes)
// midi_stop — stop MIDI playback
export function FUN_005ddd12() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005ddd4e (265 bytes)
// cdaudio_open — open CD audio device
export function FUN_005ddd4e() {
  // DEVIATION: Win32 — if (G.DAT_006389d8 == 0) {
  // DEVIATION: Win32 — local_2c = s_cdaudio_00638acc;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(0,0x803,0x2000,(DWORD_PTR)local_34);
  // DEVIATION: Win32 — if (MVar1 == 0) {
  // DEVIATION: Win32 — G.DAT_006389d8 = local_30;
  // DEVIATION: Win32 — local_1c = 10;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(local_30,0x80d,0x400,(DWORD_PTR)local_20);
  // DEVIATION: Win32 — if (MVar1 == 0) {
  // DEVIATION: Win32 — local_14 = 0;
  // DEVIATION: Win32 — local_10 = 0;
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — local_c = 3;
  // DEVIATION: Win32 — mciSendCommandA(G.DAT_006389d8,0x814,0x100,(DWORD_PTR)&local_14);
  // DEVIATION: Win32 — G.DAT_006389e0 = local_10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mciSendCommandA(G.DAT_006389d8,0x804,0,0);
  // DEVIATION: Win32 — G.DAT_006389d8 = 0;
  // DEVIATION: Win32 — FUN_005d2279(s_CDAUDIO__could_not_set_time_form_00638af4,MVar1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005d2279(s_Failed_to_open_CDAUDIO_device_00638ad4,MVar1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005dde57 (70 bytes)
// cdaudio_close — close CD audio device
export function FUN_005dde57() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dde9d (50 bytes)
// cdaudio_pause — pause CD audio
export function FUN_005dde9d() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c manage_window_DECF (48 bytes)
// mm_shutdown — shutdown multimedia subsystem
export function manage_window_DECF() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005ddeff (270 bytes)
// cdaudio_get_track_count — get number of CD tracks
export function FUN_005ddeff() {
  // DEVIATION: Win32 — if (G.DAT_006389d8 == 0) {
  // DEVIATION: Win32 — local_34 = s_cdaudio_00638b18;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(0,0x803,0x2000,(DWORD_PTR)local_3c);
  // DEVIATION: Win32 — if (MVar1 != 0) {
  // DEVIATION: Win32 — return 0xffffffff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_24 = local_38;
  // DEVIATION: Win32 — G.DAT_006389d8 = local_38;
  // DEVIATION: Win32 — local_1c = 10;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(local_38,0x80d,0x400,(DWORD_PTR)local_20);
  // DEVIATION: Win32 — if (MVar1 != 0) {
  // DEVIATION: Win32 — mciSendCommandA(local_24,0x804,0,0);
  // DEVIATION: Win32 — G.DAT_006389d8 = 0;
  // DEVIATION: Win32 — return 0xffffffff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_24 = G.DAT_006389d8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_c = 3;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(local_24,0x814,0x100,(DWORD_PTR)local_14);
  // DEVIATION: Win32 — if (MVar1 == 0) {
  // DEVIATION: Win32 — G.DAT_006389e0 = local_10;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005dde57();
  // DEVIATION: Win32 — local_10 = 0xffffffff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_10;
}

// Source: decompiled/block_005D0000.c FUN_005de00d (168 bytes)
// cdaudio_open_door — open CD tray
export function FUN_005de00d() {
  // DEVIATION: Win32 — if (G.DAT_006389d8 == 0) {
  // DEVIATION: Win32 — local_14 = s_cdaudio_00638b20;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(0,0x803,0x2000,(DWORD_PTR)local_1c);
  // DEVIATION: Win32 — if (MVar1 != 0) {
  // DEVIATION: Win32 — return;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = local_18;
  // DEVIATION: Win32 — local_20 = 0x100;
  // DEVIATION: Win32 — mciSendCommandA(local_18,0x80d,0x100,(DWORD_PTR)local_2c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = G.DAT_006389d8;
  // DEVIATION: Win32 — FUN_005dde9d();
  // DEVIATION: Win32 — local_20 = 0x100;
  // DEVIATION: Win32 — mciSendCommandA(G.DAT_006389d8,0x80d,0x100,(DWORD_PTR)local_2c);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_006389dc = local_8;
}

// Source: decompiled/block_005D0000.c FUN_005de0b5 (232 bytes)
// cdaudio_close_door — close CD tray
export function FUN_005de0b5() {
  // DEVIATION: Win32 — if ((G.DAT_006389d8 == 0) && (G.DAT_006389dc == 0)) {
  // DEVIATION: Win32 — local_14 = s_cdaudio_00638b28;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(0,0x803,0x2000,(DWORD_PTR)local_1c);
  // DEVIATION: Win32 — if (MVar1 == 0) {
  // DEVIATION: Win32 — local_8 = local_18;
  // DEVIATION: Win32 — local_20 = 0x100;
  // DEVIATION: Win32 — mciSendCommandA(local_18,0x80d,0x100,(DWORD_PTR)local_2c);
  // DEVIATION: Win32 — mciSendCommandA(local_8,0x804,0,0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (G.DAT_006389dc != 0) {
  // DEVIATION: Win32 — local_8 = G.DAT_006389dc;
  // DEVIATION: Win32 — G.DAT_006389dc = 0;
  // DEVIATION: Win32 — FUN_005dde9d();
  // DEVIATION: Win32 — local_20 = 0x200;
  // DEVIATION: Win32 — mciSendCommandA(local_8,0x80d,0x200,(DWORD_PTR)local_2c);
  // DEVIATION: Win32 — mciSendCommandA(local_8,0x804,0,0);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005de19d (179 bytes)
// cdaudio_resume_or_play — resume CD or play
export function FUN_005de19d() {
  // DEVIATION: Win32 — local_c = 4;
  // DEVIATION: Win32 — local_1c = mciSendCommandA(G.DAT_006389d8,0x814,0x100,(DWORD_PTR)local_14);
  // DEVIATION: Win32 — if (local_1c == 0) {
  // DEVIATION: Win32 — if (local_10 == 0x20d) {
  // DEVIATION: Win32 — mciSendCommandA(G.DAT_006389d8,0x806,0,(DWORD_PTR)local_28);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — mciSendCommandA(G.DAT_006389d8,0x809,0,(DWORD_PTR)local_18);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005de250 (192 bytes)
// cdaudio_resume_or_eject — resume CD or eject
export function FUN_005de250() {
  // DEVIATION: Win32 — local_c = 4;
  // DEVIATION: Win32 — local_1c = mciSendCommandA(G.DAT_006389d8,0x814,0x100,(DWORD_PTR)local_14);
  // DEVIATION: Win32 — if (local_1c == 0) {
  // DEVIATION: Win32 — if (local_10 == 0x20d) {
  // DEVIATION: Win32 — mciSendCommandA(G.DAT_006389d8,0x806,0,(DWORD_PTR)local_28);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if (local_10 == 0x211) {
  // DEVIATION: Win32 — mciSendCommandA(G.DAT_006389d8,0x855,0,(DWORD_PTR)local_18);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005de310 (270 bytes)
// cdaudio_play_next — play next CD track
export function FUN_005de310() {
  // DEVIATION: Win32 — if (G.DAT_006389d8 == 0) {
  // DEVIATION: Win32 — local_2c = s_cdaudio_00638b30;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(0,0x803,0x2000,(DWORD_PTR)local_34);
  // DEVIATION: Win32 — if (MVar1 != 0) {
  // DEVIATION: Win32 — return;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_18 = local_30;
  // DEVIATION: Win32 — local_1c = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_18 = G.DAT_006389d8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_c = 8;
  // DEVIATION: Win32 — G.DAT_006389d8 = local_18;
  // DEVIATION: Win32 — local_1c = mciSendCommandA(local_18,0x814,0x100,(DWORD_PTR)local_14);
  // DEVIATION: Win32 — if (local_1c == 0) {
  // DEVIATION: Win32 — local_20 = local_10;
  // DEVIATION: Win32 — local_c = 3;
  // DEVIATION: Win32 — local_1c = mciSendCommandA(local_18,0x814,0x100,(DWORD_PTR)local_14);
  // DEVIATION: Win32 — if (local_1c == 0) {
  // DEVIATION: Win32 — if (local_10 < local_20 + 1) {
  // DEVIATION: Win32 — FUN_005ddbc7(1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005ddbc7(local_20 + 1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005de41e (267 bytes)
// cdaudio_play_prev — play previous CD track
export function FUN_005de41e() {
  // DEVIATION: Win32 — if (G.DAT_006389d8 == 0) {
  // DEVIATION: Win32 — local_2c = s_cdaudio_00638b38;
  // DEVIATION: Win32 — MVar1 = mciSendCommandA(0,0x803,0x2000,(DWORD_PTR)local_34);
  // DEVIATION: Win32 — if (MVar1 != 0) {
  // DEVIATION: Win32 — return;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_18 = local_30;
  // DEVIATION: Win32 — local_1c = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_18 = G.DAT_006389d8;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_c = 8;
  // DEVIATION: Win32 — G.DAT_006389d8 = local_18;
  // DEVIATION: Win32 — local_1c = mciSendCommandA(local_18,0x814,0x100,(DWORD_PTR)local_14);
  // DEVIATION: Win32 — if (local_1c == 0) {
  // DEVIATION: Win32 — local_20 = local_10;
  // DEVIATION: Win32 — local_c = 3;
  // DEVIATION: Win32 — local_1c = mciSendCommandA(local_18,0x814,0x100,(DWORD_PTR)local_14);
  // DEVIATION: Win32 — if (local_1c == 0) {
  // DEVIATION: Win32 — if (local_20 == 1) {
  // DEVIATION: Win32 — FUN_005ddbc7(1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005ddbc7(local_20 + -1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005de529 (231 bytes)
// cdaudio_get_position — get CD playback position
export function FUN_005de529(param_1, param_2, param_3) {
  // DEVIATION: Win32 — if (G.DAT_006389d8 == 0) {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_18 = G.DAT_006389d8;
  // DEVIATION: Win32 — local_28 = 10;
  // DEVIATION: Win32 — local_20 = 0x400;
  // DEVIATION: Win32 — local_1c = mciSendCommandA(G.DAT_006389d8,0x80d,0x400,(DWORD_PTR)local_2c);
  // DEVIATION: Win32 — if (local_1c == 0) {
  // DEVIATION: Win32 — local_20 = 0x100;
  // DEVIATION: Win32 — local_c = 2;
  // DEVIATION: Win32 — MVar2 = mciSendCommandA(local_18,0x814,0x100,(DWORD_PTR)local_14);
  // DEVIATION: Win32 — if (MVar2 == 0) {
  // DEVIATION: Win32 — if (param_1 != (uint *)0x0) {
  // DEVIATION: Win32 — *param_1 = local_10 >> 8 & 0xff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_2 != (uint *)0x0) {
  // DEVIATION: Win32 — *param_2 = local_10 >> 0x10 & 0xff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (param_3 != (uint *)0x0) {
  // DEVIATION: Win32 — *param_3 = local_10 & 0xff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar1 = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — uVar1 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar1;
}

// Source: decompiled/block_005D0000.c FUN_005de620 (28 bytes)
// play_sound_wrapper — play sound wrapper
export function FUN_005de620(param_1) {
  // DEVIATION: Win32 — FUN_005dd9d9(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005de63c (28 bytes)
// play_sound_loop_wrapper — play looping sound wrapper
export function FUN_005de63c(param_1) {
  // DEVIATION: Win32 — FUN_005dd9f5(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005de658 (28 bytes)
// play_sound_noop_wrapper — no-op sound wrapper
export function FUN_005de658(param_1) {
  // DEVIATION: Win32 — FUN_005dda2b(param_1);
}

// Source: decompiled/block_005D0000.c FUN_005de674 (21 bytes)
// play_beep_wrapper — play beep wrapper
export function FUN_005de674() {
  // DEVIATION: Win32 — FUN_005dda3b();
}

// Source: decompiled/block_005D0000.c FUN_005de689 (28 bytes)
// midi_play_wrapper — play MIDI wrapper
export function FUN_005de689(param_1) {
  // DEVIATION: Win32 — show_messagebox_DA53(param_1);
}

// set_midi_done_callback
export function FUN_005de6a5(param_1) { G.DAT_006e5004 = param_1; }

// Source: decompiled/block_005D0000.c FUN_005de6bd (35 bytes)
// invoke_midi_done_callback
export function FUN_005de6bd() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005de6e0 (28 bytes)
// cdaudio_play_wrapper — play CD track wrapper
export function FUN_005de6e0(param_1) {
  // DEVIATION: Win32 — FUN_005ddbc7(param_1);
}

// set_cd_done_callback
export function FUN_005de6fc(param_1) { G.DAT_006e5000 = param_1; }

// Source: decompiled/block_005D0000.c FUN_005de714 (35 bytes)
// invoke_cd_done_callback
export function FUN_005de714() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005de737 (21 bytes)
// midi_stop_wrapper — stop MIDI wrapper
export function FUN_005de737() {
  // DEVIATION: Win32 — FUN_005ddd12();
}

// Source: decompiled/block_005D0000.c FUN_005de74c (21 bytes)
// stop_sound_wrapper — stop sound wrapper
export function FUN_005de74c() {
  // DEVIATION: Win32 — FUN_005dda11();
}

// Source: decompiled/block_005D0000.c FUN_005de761 (21 bytes)
// cdaudio_pause_wrapper — pause CD wrapper
export function FUN_005de761() {
  // DEVIATION: Win32 — FUN_005dde9d();
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Palette management
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c gdi_E780 (516 bytes)
// palette_init — initialize palette from system
export function gdi_E780(param_1) {
  // DEVIATION: Win32 — *param_1 = 0x300;
  // DEVIATION: Win32 — param_1[1] = 0x100;
  // DEVIATION: Win32 — hdc = GetDC((HWND)0x0);
  // DEVIATION: Win32 — uVar1 = GetDeviceCaps(hdc,0x26);
  // DEVIATION: Win32 — if ((uVar1 & 0x100) == 0) {
  // DEVIATION: Win32 — G.DAT_006e500c = 0;
  // DEVIATION: Win32 — G.DAT_00638b48 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — iVar2 = GetDeviceCaps(hdc,0x18);
  // DEVIATION: Win32 — G.DAT_006e500c = iVar2 / 2;
  // DEVIATION: Win32 — GetSystemPaletteEntries(hdc,0,0x100,(LPPALETTEENTRY)(param_1 + 2));
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_c = 0; local_c < G.DAT_006e500c; local_c = local_c + 1) {
  // DEVIATION: Win32 — *(undefined1 *)((int)param_1 + local_c * 4 + 7) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (; local_c < 0x100 - G.DAT_006e500c; local_c = local_c + 1) {
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + local_c * 2 + 2) = 0;
  // DEVIATION: Win32 — *(undefined1 *)((int)param_1 + local_c * 4 + 5) = 0;
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + local_c * 2 + 3) = 0;
  // DEVIATION: Win32 — *(undefined1 *)((int)param_1 + local_c * 4 + 7) = 4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (; local_c < 0x100; local_c = local_c + 1) {
  // DEVIATION: Win32 — *(undefined1 *)((int)param_1 + local_c * 4 + 7) = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (G.DAT_00638b48 == 0) {
  // DEVIATION: Win32 — local_10 = &G.DAT_00638b50;
  // DEVIATION: Win32 — for (local_c = 0; local_c < 10; local_c = local_c + 1) {
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + local_c * 2 + 2) = *local_10;
  // DEVIATION: Win32 — *(undefined1 *)((int)param_1 + local_c * 4 + 5) = local_10[1];
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + local_c * 2 + 3) = local_10[2];
  // DEVIATION: Win32 — local_10 = local_10 + 3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_c = 0xf6; local_c < 0x100; local_c = local_c + 1) {
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + local_c * 2 + 2) = *local_10;
  // DEVIATION: Win32 — *(undefined1 *)((int)param_1 + local_c * 4 + 5) = local_10[1];
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + local_c * 2 + 3) = local_10[2];
  // DEVIATION: Win32 — local_10 = local_10 + 3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — ReleaseDC((HWND)0x0,hdc);
}

// Source: decompiled/block_005D0000.c FUN_005de984 (92 bytes)
// palette_set_animatable — mark palette entries as animatable
export function FUN_005de984(param_1, param_2, param_3) {
  // DEVIATION: Win32 — if (0x100 < param_3 + param_2) {
  // DEVIATION: Win32 — param_3 = 0x100 - param_2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_8 = param_2; local_8 < param_3 + param_2; local_8 = local_8 + 1) {
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + 7 + local_8 * 4) = 1;
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005de9e0 (130 bytes)
// palette_set_from_source — copy palette from source
export function FUN_005de9e0(param_1, param_2, param_3) {
  // DEVIATION: Win32 — if (0x100 < param_3 + param_2) {
  // DEVIATION: Win32 — param_3 = 0x100 - param_2;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_8 = param_2; local_8 < param_3 + param_2; local_8 = local_8 + 1) {
  // DEVIATION: Win32 — FUN_005deb12(param_1,local_8,*(undefined1 *)(param_1 + 4 + param_3 * 4),
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + 5 + param_3 * 4),
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + 6 + param_3 * 4));
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c update_palette_EA62 (60 bytes)
// palette_animate — animate palette entries
export function update_palette_EA62(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005dea9e (61 bytes)
// palette_get_rgb — get RGB values for index
export function FUN_005dea9e(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005deadb (55 bytes)
// palette_set_rgb — set RGB values for index
export function FUN_005deadb(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005deb12 (316 bytes)
// palette_set_entry — set palette entry with matching
export function FUN_005deb12(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — *(char *)(param_1 + 4 + param_2 * 4) = param_3;
  // DEVIATION: Win32 — *(char *)(param_1 + 5 + param_2 * 4) = param_4;
  // DEVIATION: Win32 — *(char *)(param_1 + 6 + param_2 * 4) = param_5;
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + 7 + param_2 * 4) = 4;
  // DEVIATION: Win32 — for (local_8 = 0; local_8 < G.DAT_006e500c; local_8 = local_8 + 1) {
  // DEVIATION: Win32 — if (((*(char *)(param_1 + 4 + local_8 * 4) == param_3) &&
  // DEVIATION: Win32 — (*(char *)(param_1 + 5 + local_8 * 4) == param_4)) &&
  // DEVIATION: Win32 — (*(char *)(param_1 + 6 + local_8 * 4) == param_5)) {
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + 7 + param_2 * 4) = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_8 = 0x100 - G.DAT_006e500c; local_8 < 0x100; local_8 = local_8 + 1) {
  // DEVIATION: Win32 — if (((*(char *)(param_1 + 4 + local_8 * 4) == param_3) &&
  // DEVIATION: Win32 — (*(char *)(param_1 + 5 + local_8 * 4) == param_4)) &&
  // DEVIATION: Win32 — (*(char *)(param_1 + 6 + local_8 * 4) == param_5)) {
  // DEVIATION: Win32 — *(undefined1 *)(param_1 + 7 + param_2 * 4) = 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005dec4e (60 bytes)
// palette_create — create a GDI palette
export function FUN_005dec4e(param_1) {
  // DEVIATION: Win32 — if (G.DAT_00638b48 == 1) {
  // DEVIATION: Win32 — local_8 = CreatePalette(param_1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = (HPALETTE)0x0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_8;
}

// Source: decompiled/block_005D0000.c FUN_005dec8a (39 bytes)
// palette_delete — delete a GDI palette
export function FUN_005dec8a(param_1) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005decb1 (60 bytes)
// palette_set_entries — set GDI palette entries
export function FUN_005decb1(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — entire function is Win32 API calls
}

// Source: decompiled/block_005D0000.c FUN_005deced (37 bytes)
// palette_copy — copy entire palette data
export function FUN_005deced(param_1, param_2) {
  // DEVIATION: Win32 — FID_conflict__memcpy(param_2,param_1,0x404);
}

// Source: decompiled/block_005D0000.c FUN_005ded12 (123 bytes)
// palette_extract_rgb — extract RGB array from palette
export function FUN_005ded12(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — for (local_c = param_3; local_c < param_4 + param_3; local_c = local_c + 1) {
  // DEVIATION: Win32 — *(undefined1 *)(local_8 + param_2) = *(undefined1 *)(param_1 + 4 + local_c * 4);
  // DEVIATION: Win32 — *(undefined1 *)(local_8 + 1 + param_2) = *(undefined1 *)(param_1 + 5 + local_c * 4);
  // DEVIATION: Win32 — *(undefined1 *)(local_8 + 2 + param_2) = *(undefined1 *)(param_1 + 6 + local_c * 4);
  // DEVIATION: Win32 — local_8 = local_8 + 3;
  // DEVIATION: Win32 — }
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Tooltip / splash screen
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005ded90 (152 bytes)
// splash_init — initialize splash screen subsystem
export function FUN_005ded90() {
  // DEVIATION: Win32 — thunk_FUN_0043c660();
  // DEVIATION: Win32 — thunk_FUN_004503d0();
  // DEVIATION: Win32 — thunk_FUN_00453af0();
  // DEVIATION: Win32 — if (G.DAT_006e501c != 0) {
  // DEVIATION: Win32 — thunk_FUN_004bb3b0(1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (G.DAT_006e5014 != 0) {
  // DEVIATION: Win32 — thunk_FUN_005a95b0(1);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — iVar1 = thunk_FUN_00421bb0();
  // DEVIATION: Win32 — G.DAT_00638bac = iVar1 + 0xe10;
  // DEVIATION: Win32 — G.DAT_00638ba4 = 0;
}

// Source: decompiled/block_005D0000.c FUN_005dee28 (794 bytes)
// splash_show — show splash/tooltip dialog
export function FUN_005dee28(param_1, param_2, param_3) {
  // DEVIATION: Win32 — SEH frame + Win32 API calls
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — SEH: puStack_c = &LAB_005df14e;
  // DEVIATION: Win32 — SEH: local_10 = *unaff_FS_OFFSET;
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = &local_10;
  // DEVIATION: Win32 — local_2c = 0x54;
  // DEVIATION: Win32 — local_2b = 0x45;
  // DEVIATION: Win32 — local_2a = 0x58;
  // DEVIATION: Win32 — local_29 = 0x54;
  // DEVIATION: Win32 — local_28 = FUN_005c5540(&local_2c,param_1);
  // DEVIATION: Win32 — if (local_28 != 0) {
  // DEVIATION: Win32 — local_30 = FUN_005c5560(local_28);
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00418cb0(local_30,0x1a4);
  // DEVIATION: Win32 — pLVar2 = (LONG *)render_text_8834(local_84,uVar1);
  // DEVIATION: Win32 — local_64 = *pLVar2;
  // DEVIATION: Win32 — local_60 = pLVar2[1];
  // DEVIATION: Win32 — local_5c = pLVar2[2];
  // DEVIATION: Win32 — local_58 = pLVar2[3];
  // DEVIATION: Win32 — local_24.left = local_64;
  // DEVIATION: Win32 — local_24.top = local_60;
  // DEVIATION: Win32 — local_24.right = local_5c;
  // DEVIATION: Win32 — local_24.bottom = local_58;
  // DEVIATION: Win32 — local_14 = thunk_FUN_00407f90(&local_24);
  // DEVIATION: Win32 — local_14 = local_14 + 0x20;
  // DEVIATION: Win32 — local_44 = thunk_FUN_00407fc0(&local_24);
  // DEVIATION: Win32 — local_44 = local_44 + 0x48;
  // DEVIATION: Win32 — OffsetRect(&local_24,0x10,0x10);
  // DEVIATION: Win32 — SetRect(&local_54,0,0,0x48,0x20);
  // DEVIATION: Win32 — OffsetRect(&local_54,local_14 + -0x40 >> 1,local_44 + -0x30);
  // DEVIATION: Win32 — local_68 = operator_new(0x114);
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — if (local_68 == (void *)0x0) {
  // DEVIATION: Win32 — local_6c = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_6c = thunk_FUN_0044c5a0();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — G.DAT_006e5014 = local_6c;
  // DEVIATION: Win32 — local_70 = operator_new(0x3c);
  // DEVIATION: Win32 — local_8 = 1;
  // DEVIATION: Win32 — if (local_70 == (void *)0x0) {
  // DEVIATION: Win32 — local_74 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_74 = thunk_FUN_0040f3e0();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — G.DAT_006e501c = local_74;
  // DEVIATION: Win32 — uVar1 = FUN_005bb8c0(param_2);
  // DEVIATION: Win32 — FUN_005bb4ae(&G.DAT_00638bb0,0xc01,0,0,local_14,local_44,uVar1,param_2);
  // DEVIATION: Win32 — FUN_005c041f(7);
  // DEVIATION: Win32 — thunk_FUN_00450400();
  // DEVIATION: Win32 — if (G.DAT_006e5014 == 0) {
  // DEVIATION: Win32 — local_88 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_88 = G.DAT_006e5014 + 0x48;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — thunk_FUN_0040f680(local_88,0x65,&local_54,&G.DAT_00638bb4);
  // DEVIATION: Win32 — thunk_FUN_0040f880(FUN_005ded90);
  // DEVIATION: Win32 — SetRect(&local_40,0,0,local_14,local_44);
  // DEVIATION: Win32 — FUN_005dfa4d(G.DAT_006e5014,&local_40,3,0xff,0xf8);
  // DEVIATION: Win32 — InflateRect(&local_40,-6,-6);
  // DEVIATION: Win32 — FUN_005dfa4d(G.DAT_006e5014,&local_40,0xffffffff,0xff,0xf8);
  // DEVIATION: Win32 — FUN_005dfa4d(G.DAT_006e5014,&local_40,1,0xff,0xf8);
  // DEVIATION: Win32 — FUN_005c19ad(0);
  // DEVIATION: Win32 — FUN_005c1167(&G.DAT_006d1ec8,local_30,&local_24,0);
  // DEVIATION: Win32 — thunk_FUN_004085f0();
  // DEVIATION: Win32 — FUN_005bcfa0();
  // DEVIATION: Win32 — thunk_FUN_00453af0();
  // DEVIATION: Win32 — if (param_3 != 0) {
  // DEVIATION: Win32 — thunk_FUN_0043c630();
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = local_10;
}

// Source: decompiled/block_005D0000.c FUN_005df166 (151 bytes)
// tooltip_timer_callback — tooltip timer fired
export function FUN_005df166() {
  // DEVIATION: Win32 — iVar1 = FUN_005dcfca(G.DAT_00638b94);
  // DEVIATION: Win32 — if (iVar1 == 0) {
  // DEVIATION: Win32 — G.DAT_00638ba8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else if ((G.DAT_00638ba4 == 0) &&
  // DEVIATION: Win32 — ((G.DAT_00638ba8 == 0 ||
  // DEVIATION: Win32 — ((G.DAT_00638ba8 < 3 && (iVar1 = thunk_FUN_00421bb0(), G.DAT_00638bac < iVar1)))))) {
  // DEVIATION: Win32 — G.DAT_00638ba4 = 1;
  // DEVIATION: Win32 — G.DAT_00638ba8 = G.DAT_00638ba8 + 1;
  // DEVIATION: Win32 — FUN_005dee28(G.DAT_00638b98,G.DAT_00638b90,G.DAT_00638b9c);
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005df1fd (131 bytes)
// tooltip_start — start tooltip timer
export function FUN_005df1fd(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — if (G.DAT_00638ba0 != 0) {
  // DEVIATION: Win32 — FUN_005d2004(G.DAT_00638ba0);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — G.DAT_00638b94 = param_1;
  // DEVIATION: Win32 — G.DAT_00638b98 = param_3;
  // DEVIATION: Win32 — G.DAT_00638b90 = param_4;
  // DEVIATION: Win32 — G.DAT_00638b9c = param_5;
  // DEVIATION: Win32 — G.DAT_00638ba8 = 0;
  // DEVIATION: Win32 — G.DAT_00638ba4 = 0;
  // DEVIATION: Win32 — G.DAT_00638ba0 = FUN_005d1f50(FUN_005df166,param_2 * 1000,0xffffffff);
}

// Source: decompiled/block_005D0000.c FUN_005df280 (53 bytes)
// tooltip_stop — stop tooltip timer
export function FUN_005df280() {
  // DEVIATION: Win32 — entire function is Win32 API calls
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: GIF resource loading
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005df2b5 (966 bytes)
// load_gif_resource — load GIF from resource
export function FUN_005df2b5(param_1, param_2) {
  // DEVIATION: Win32 — SEH frame + Win32 API calls
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — SEH: puStack_c = &LAB_005df693;
  // DEVIATION: Win32 — SEH: uStack_10 = *unaff_FS_OFFSET;
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = &uStack_10;
  // DEVIATION: Win32 — FUN_005d7c00();
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — FUN_005d7c00();
  // DEVIATION: Win32 — local_8._0_1_ = 1;
  // DEVIATION: Win32 — Realloc(param_1);
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00492a80();
  // DEVIATION: Win32 — local_168 = FUN_005dce4f(uVar1);
  // DEVIATION: Win32 — local_164 = FUN_005dcdf9(local_168);
  // DEVIATION: Win32 — uVar1 = thunk_FUN_00492a80();
  // DEVIATION: Win32 — thunk_FUN_004bb370(local_164,uVar1);
  // DEVIATION: Win32 — local_1c = thunk_FUN_00492a80();
  // DEVIATION: Win32 — local_1c = local_164 + local_1c;
  // DEVIATION: Win32 — local_164 = FUN_005dce29(local_168);
  // DEVIATION: Win32 — if (local_168 == 0) {
  // DEVIATION: Win32 — FUN_005d237d(s_Error__GIF_resource_not_found___00638bbc,param_1);
  // DEVIATION: Win32 — local_8 = (uint)local_8._1_3_ << 8;
  // DEVIATION: Win32 — FUN_005df67b();
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — FUN_005df687();
  // DEVIATION: Win32 — FUN_005df69d();
  // DEVIATION: Win32 — return;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_24 = (char *)FUN_005dcdf9(local_168);
  // DEVIATION: Win32 — iVar2 = _strncmp(local_24,&G.DAT_00638be0,3);
  // DEVIATION: Win32 — if (iVar2 != 0) {
  // DEVIATION: Win32 — FUN_005d237d(s_Error__Resource_is_not_a_GIF___00638be4,param_1);
  // DEVIATION: Win32 — FUN_005dce29(local_168);
  // DEVIATION: Win32 — FUN_005dcb70(local_168);
  // DEVIATION: Win32 — local_8 = (uint)local_8._1_3_ << 8;
  // DEVIATION: Win32 — FUN_005df67b();
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — FUN_005df687();
  // DEVIATION: Win32 — FUN_005df69d();
  // DEVIATION: Win32 — return;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((local_24[10] & 0x80U) == 0) {
  // DEVIATION: Win32 — FUN_005d237d(s_Error__GIF_contains_no_global_co_00638c04,param_1);
  // DEVIATION: Win32 — FUN_005dce29(local_168);
  // DEVIATION: Win32 — FUN_005dcb70(local_168);
  // DEVIATION: Win32 — local_8 = (uint)local_8._1_3_ << 8;
  // DEVIATION: Win32 — FUN_005df67b();
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — FUN_005df687();
  // DEVIATION: Win32 — FUN_005df69d();
  // DEVIATION: Win32 — return;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_16c = 1 << (local_24[10] & 7U) + 1;
  // DEVIATION: Win32 — local_20 = local_24 + 0xd;
  // DEVIATION: Win32 — FID_conflict__memcpy(local_474,local_20,local_16c * 3);
  // DEVIATION: Win32 — for (local_20 = local_24 + local_16c * 3 + 0xd; *local_20 == '\0'; local_20 = local_20 + 1) {
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if ((*local_20 != ',') && (*local_20 != '!')) {
  // DEVIATION: Win32 — FUN_005d237d(s_Error__GIF_Image_Block_not_found_00638c30,param_1);
  // DEVIATION: Win32 — FUN_005dce29(local_168);
  // DEVIATION: Win32 — FUN_005dcb70(local_168);
  // DEVIATION: Win32 — local_8 = (uint)local_8._1_3_ << 8;
  // DEVIATION: Win32 — FUN_005df67b();
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — FUN_005df687();
  // DEVIATION: Win32 — FUN_005df69d();
  // DEVIATION: Win32 — return;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_18 = local_20 + 1;
  // DEVIATION: Win32 — local_2c = (uint)*(ushort *)(local_20 + 5);
  // DEVIATION: Win32 — local_c8 = (uint)*(ushort *)(local_20 + 7);
  // DEVIATION: Win32 — if ((local_20[9] & 0x80U) != 0) {
  // DEVIATION: Win32 — debug_log(s_Warning__Skipping_local_color_ta_00638c54);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_28 = local_18[9];
  // DEVIATION: Win32 — local_14 = local_18 + 10;
  // DEVIATION: Win32 — local_174 = FUN_005e0b80(local_2c);
  // DEVIATION: Win32 — local_172 = FUN_005e0b80(local_c8);
  // DEVIATION: Win32 — local_170 = local_28;
  // DEVIATION: Win32 — local_16f = (char)local_16c + -1;
  // DEVIATION: Win32 — Realloc(param_2);
  // DEVIATION: Win32 — thunk_FUN_00421c60(&local_174,6);
  // DEVIATION: Win32 — thunk_FUN_00421c60(local_474,local_16c * 3);
  // DEVIATION: Win32 — thunk_FUN_00421c60(local_14,local_1c - (int)local_14);
  // DEVIATION: Win32 — local_168 = FUN_005dce96(local_168);
  // DEVIATION: Win32 — thunk_FUN_00421c30();
  // DEVIATION: Win32 — local_8 = (uint)local_8._1_3_ << 8;
  // DEVIATION: Win32 — FUN_005df67b();
  // DEVIATION: Win32 — local_8 = 0xffffffff;
  // DEVIATION: Win32 — FUN_005df687();
  // DEVIATION: Win32 — FUN_005df69d();
}

// Source: decompiled/block_005D0000.c FUN_005df67b (12 bytes)
// gif_cleanup_a — cleanup helper a
export function FUN_005df67b() {
  // DEVIATION: Win32 — FUN_005d7c6e();
}

// Source: decompiled/block_005D0000.c FUN_005df687 (12 bytes)
// gif_cleanup_b — cleanup helper b
export function FUN_005df687() {
  // DEVIATION: Win32 — FUN_005d7c6e();
}

// Source: decompiled/block_005D0000.c FUN_005df69d (14 bytes)
// gif_cleanup_epilog — FS restoration
export function FUN_005df69d() {
  // DEVIATION: Win32 — SEH frame + Win32 API calls
  // DEVIATION: Win32 — SEH: *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: Visual effects / dissolve
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005df6ab (54 bytes)
// dissolve_effect — run dissolve transition effect
export function FUN_005df6ab(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: Win32 — FUN_005df6e1(param_1,param_2,param_3,param_4,param_5,param_6,param_7,0);
}

// Source: decompiled/block_005D0000.c FUN_005df6e1 (592 bytes)
// dissolve_effect_impl — dissolve effect implementation
export function FUN_005df6e1(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 — uVar1 = *param_3;
  // DEVIATION: Win32 — uVar2 = param_3[1];
  // DEVIATION: Win32 — iVar3 = thunk_FUN_00407f90(param_3);
  // DEVIATION: Win32 — iVar4 = thunk_FUN_00407fc0(param_3);
  // DEVIATION: Win32 — SetRect(&local_1c,param_4,param_5,param_4 + iVar3,param_5 + iVar4);
  // DEVIATION: Win32 — uVar5 = FUN_005e0ba0();
  // DEVIATION: Win32 — uVar6 = FUN_005e0ba0();
  // DEVIATION: Win32 — pvVar7 = operator_new((iVar4 + iVar3) * 4);
  // DEVIATION: Win32 — pvVar8 = (void *)(iVar4 * 4 + (int)pvVar7);
  // DEVIATION: Win32 — for (local_44 = 0; local_44 < iVar3; local_44 = local_44 + 1) {
  // DEVIATION: Win32 — *(int *)((int)pvVar8 + local_44 * 4) = local_44;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_48 = 0; local_48 < iVar4; local_48 = local_48 + 1) {
  // DEVIATION: Win32 — *(int *)((int)pvVar7 + local_48 * 4) = local_48;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_44 = 0; local_44 < iVar3; local_44 = local_44 + 1) {
  // DEVIATION: Win32 — uVar9 = FUN_005e0b50(iVar4);
  // DEVIATION: Win32 — *(undefined4 *)((int)pvVar8 + local_44 * 4) = uVar9;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_48 = 0; local_48 < iVar4; local_48 = local_48 + 1) {
  // DEVIATION: Win32 — local_8 = FUN_005e0b50(iVar4);
  // DEVIATION: Win32 — local_c = FUN_005e0b50(iVar4);
  // DEVIATION: Win32 — uVar9 = *(undefined4 *)((int)pvVar7 + local_8 * 4);
  // DEVIATION: Win32 — *(undefined4 *)((int)pvVar7 + local_8 * 4) = *(undefined4 *)((int)pvVar7 + local_c * 4);
  // DEVIATION: Win32 — *(undefined4 *)((int)pvVar7 + local_c * 4) = uVar9;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (local_48 = 0; local_48 < iVar4; local_48 = local_48 + param_7) {
  // DEVIATION: Win32 — uVar9 = FUN_005c5640(pvVar8,pvVar7,uVar5,uVar6,local_48,iVar3,iVar4,param_7,uVar1,uVar2,param_4,
  // DEVIATION: Win32 — param_5,param_6);
  // DEVIATION: Win32 — uVar9 = FUN_005c5640(uVar9);
  // DEVIATION: Win32 — FUN_0061a000(uVar9);
  // DEVIATION: Win32 — thunk_FUN_00408490(&local_1c);
  // DEVIATION: Win32 — if (param_8 != 0) {
  // DEVIATION: Win32 — FUN_005cbeb0(param_8);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — thunk_FUN_00408490(&local_1c);
  // DEVIATION: Win32 — operator_delete(pvVar7);
}

// Source: decompiled/block_005D0000.c FUN_005df931 (284 bytes)
// draw_3d_border_screen — draw 3D border on screen DC
export function FUN_005df931(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 — if (param_3 < 1) {
  // DEVIATION: Win32 — local_8 = param_4;
  // DEVIATION: Win32 — local_c = param_5;
  // DEVIATION: Win32 — param_3 = -param_3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = param_5;
  // DEVIATION: Win32 — local_c = param_4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — while( true ) {
  // DEVIATION: Win32 — if (param_3 == 0) break;
  // DEVIATION: Win32 — FUN_005e0c90(local_8,param_6);
  // DEVIATION: Win32 — FUN_005e7f85(param_2->right + -1,param_2->top,param_2->right + -1,param_2->bottom + -1);
  // DEVIATION: Win32 — FUN_005e7f85(param_2->right + -1,param_2->bottom + -1,param_2->left,param_2->bottom + -1);
  // DEVIATION: Win32 — FUN_005e0c90(local_c,param_6);
  // DEVIATION: Win32 — FUN_005e7f85(param_2->left,param_2->bottom + -1,param_2->left,param_2->top);
  // DEVIATION: Win32 — FUN_005e7f85(param_2->left,param_2->top,param_2->right + -1,param_2->top);
  // DEVIATION: Win32 — InflateRect(param_2,-1,-1);
  // DEVIATION: Win32 — param_3 = param_3 + -1;
  // DEVIATION: Win32 — }
}

// Source: decompiled/block_005D0000.c FUN_005dfa4d (276 bytes)
// draw_3d_border_offscreen — draw 3D border on offscreen bitmap
export function FUN_005dfa4d(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: Win32 — if (param_3 < 1) {
  // DEVIATION: Win32 — local_8 = param_4;
  // DEVIATION: Win32 — local_c = param_5;
  // DEVIATION: Win32 — param_3 = -param_3;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_8 = param_5;
  // DEVIATION: Win32 — local_c = param_4;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — while( true ) {
  // DEVIATION: Win32 — if (param_3 == 0) break;
  // DEVIATION: Win32 — FUN_005c19ad(local_8);
  // DEVIATION: Win32 — FUN_005c11b2(param_2->right + -1,param_2->top,param_2->right + -1,param_2->bottom + -1);
  // DEVIATION: Win32 — FUN_005c11b2(param_2->right + -1,param_2->bottom + -1,param_2->left,param_2->bottom + -1);
  // DEVIATION: Win32 — FUN_005c19ad(local_c);
  // DEVIATION: Win32 — FUN_005c11b2(param_2->left,param_2->bottom + -1,param_2->left,param_2->top);
  // DEVIATION: Win32 — FUN_005c11b2(param_2->left,param_2->top,param_2->right + -1,param_2->top);
  // DEVIATION: Win32 — InflateRect(param_2,-1,-1);
  // DEVIATION: Win32 — param_3 = param_3 + -1;
  // DEVIATION: Win32 — }
}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS: RLE encode/decode
// ═══════════════════════════════════════════════════════════════════

// Source: decompiled/block_005D0000.c FUN_005dfb61 (558 bytes)
// rle_decode — decode RLE-compressed data in-place
export function FUN_005dfb61(param_1) {
  // DEVIATION: Win32 — size_t sVar2;
  // DEVIATION: Win32 — byte *pbVar3;
  // DEVIATION: Win32 — void *pvVar4;
  // DEVIATION: Win32 — byte *local_30;
  // DEVIATION: Win32 — uint local_2c;
  // DEVIATION: Win32 — byte *local_1c;
  // DEVIATION: Win32 — byte *local_18;
  // DEVIATION: Win32 — size_t local_14;
  // DEVIATION: Win32 — size_t local_8;
  // DEVIATION: Win32 — sVar2 = __msize((void *)*param_1);
  // DEVIATION: Win32 — pbVar3 = operator_new(sVar2);
  // DEVIATION: Win32 — if (pbVar3 == (byte *)0x0) {
  // DEVIATION: Win32 — debug_log(s_RLLDecode_could_not_allocate_dec_00638c78);
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — FUN_005dced3(*param_1,pbVar3,sVar2);
  // DEVIATION: Win32 — local_14 = sVar2 * 2;
  // DEVIATION: Win32 — local_18 = FID_conflict___expand((void *)*param_1,local_14);
  // DEVIATION: Win32 — if (local_18 == (byte *)0x0) {
  // DEVIATION: Win32 — debug_log(s_RLLDecode_could_not_allocate_dec_00638cac);
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *param_1 = local_18;
  // DEVIATION: Win32 — local_30 = local_18 + local_14;
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — local_1c = pbVar3;
  // DEVIATION: Win32 — while (local_1c < pbVar3 + (sVar2 - 1)) {
  // DEVIATION: Win32 — local_2c = (uint)*local_1c;
  // DEVIATION: Win32 — if (local_30 < local_18 + (local_2c & 0x7f) + 1) {
  // DEVIATION: Win32 — local_14 = local_14 + 1000;
  // DEVIATION: Win32 — pvVar4 = FID_conflict___expand((void *)*param_1,local_14);
  // DEVIATION: Win32 — if (pvVar4 == (void *)0x0) {
  // DEVIATION: Win32 — debug_log(s_RLLDecode_could_not_allocate_dec_00638ce0);
  // DEVIATION: Win32 — return 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — *param_1 = pvVar4;
  // DEVIATION: Win32 — local_18 = (byte *)(local_8 + (int)pvVar4);
  // DEVIATION: Win32 — local_30 = (byte *)(local_14 + (int)pvVar4);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — if (local_2c < 0x80) {
  // DEVIATION: Win32 — bVar1 = local_1c[1];
  // DEVIATION: Win32 — local_1c = local_1c + 2;
  // DEVIATION: Win32 — while (local_2c != 0) {
  // DEVIATION: Win32 — *local_18 = bVar1;
  // DEVIATION: Win32 — local_18 = local_18 + 1;
  // DEVIATION: Win32 — local_8 = local_8 + 1;
  // DEVIATION: Win32 — local_2c = local_2c - 1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_2c = local_2c - 0x80;
  // DEVIATION: Win32 — local_1c = local_1c + 1;
  // DEVIATION: Win32 — while (local_2c != 0) {
  // DEVIATION: Win32 — *local_18 = *local_1c;
  // DEVIATION: Win32 — local_1c = local_1c + 1;
  // DEVIATION: Win32 — local_18 = local_18 + 1;
  // DEVIATION: Win32 — local_8 = local_8 + 1;
  // DEVIATION: Win32 — local_2c = local_2c + -1;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — pvVar4 = FID_conflict___expand((void *)*param_1,local_8);
  // DEVIATION: Win32 — if (pvVar4 == (void *)0x0) {
  // DEVIATION: Win32 — debug_log(s_RLLDecode_could_not_allocate_dec_00638d14);
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *param_1 = pvVar4;
  // DEVIATION: Win32 — operator_delete(pbVar3);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return local_8;
}

// Source: decompiled/block_005D0000.c FUN_005dfd8f (777 bytes)
// rle_encode — RLE-compress data in-place
export function FUN_005dfd8f(param_1, param_2) {
  // DEVIATION: Win32 — pcVar2 = operator_new(param_2 + ((int)(param_2 + (param_2 >> 0x1f & 0x7fU)) >> 7) + 5);
  // DEVIATION: Win32 — if (pcVar2 == (char *)0x0) {
  // DEVIATION: Win32 — debug_log(s_RLLEncode_could_not_allocate_com_00638d48);
  // DEVIATION: Win32 — uVar3 = 0xffffffff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — local_1c = (char *)*param_1;
  // DEVIATION: Win32 — local_24 = local_1c + 1;
  // DEVIATION: Win32 — pcVar4 = local_1c + param_2;
  // DEVIATION: Win32 — local_8 = 0;
  // DEVIATION: Win32 — local_14 = pcVar2;
  // DEVIATION: Win32 — while (local_1c < pcVar4) {
  // DEVIATION: Win32 — for (; (local_24 < pcVar4 && (*local_24 == *local_1c)); local_24 = local_24 + 1) {
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_c = (int)local_24 - (int)local_1c;
  // DEVIATION: Win32 — if (2 < local_c) {
  // DEVIATION: Win32 — while (pcVar1 = local_14, local_c != 0) {
  // DEVIATION: Win32 — if (local_c < 0x80) {
  // DEVIATION: Win32 — *local_14 = (char)local_c;
  // DEVIATION: Win32 — if (param_2 <= local_8 + 1) goto LAB_005e0071;
  // DEVIATION: Win32 — local_c = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *local_14 = '\x7f';
  // DEVIATION: Win32 — if (param_2 <= local_8 + 1) goto LAB_005e0071;
  // DEVIATION: Win32 — local_c = local_c + -0x7f;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_14 = local_14 + 1;
  // DEVIATION: Win32 — *local_14 = *local_1c;
  // DEVIATION: Win32 — local_14 = pcVar1 + 2;
  // DEVIATION: Win32 — local_8 = local_8 + 2;
  // DEVIATION: Win32 — if (param_2 <= local_8) goto LAB_005e0071;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_1c = local_24;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — for (; (local_24 < pcVar4 && (local_24[1] != *local_24)); local_24 = local_24 + 1) {
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — local_c = (int)local_24 - (int)local_1c;
  // DEVIATION: Win32 — while (local_c != 0) {
  // DEVIATION: Win32 — if (local_c < 0x80) {
  // DEVIATION: Win32 — *local_14 = (char)local_c + -0x80;
  // DEVIATION: Win32 — local_14 = local_14 + 1;
  // DEVIATION: Win32 — local_8 = local_8 + 1;
  // DEVIATION: Win32 — if (param_2 <= local_8) goto LAB_005e0071;
  // DEVIATION: Win32 — local_10 = local_c;
  // DEVIATION: Win32 — local_c = 0;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — *local_14 = -1;
  // DEVIATION: Win32 — local_14 = local_14 + 1;
  // DEVIATION: Win32 — local_8 = local_8 + 1;
  // DEVIATION: Win32 — if (param_2 <= local_8) goto LAB_005e0071;
  // DEVIATION: Win32 — local_c = local_c + -0x7f;
  // DEVIATION: Win32 — local_10 = 0x7f;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — while (local_10 != 0) {
  // DEVIATION: Win32 — *local_14 = *local_1c;
  // DEVIATION: Win32 — local_1c = local_1c + 1;
  // DEVIATION: Win32 — local_14 = local_14 + 1;
  // DEVIATION: Win32 — local_8 = local_8 + 1;
  // DEVIATION: Win32 — local_10 = local_10 + -1;
  // DEVIATION: Win32 — if (param_2 <= local_8) goto LAB_005e0071;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — uVar3 = (int)local_14 - (int)pcVar2;
  // DEVIATION: Win32 — if (param_2 < (int)uVar3) {
  // DEVIATION: Win32 — LAB_005e0071:
  // DEVIATION: Win32 — operator_delete(pcVar2);
  // DEVIATION: Win32 — uVar3 = 0xffffffff;
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — else {
  // DEVIATION: Win32 — operator_delete((void *)*param_1);
  // DEVIATION: Win32 — pvVar5 = operator_new(uVar3);
  // DEVIATION: Win32 — *param_1 = pvVar5;
  // DEVIATION: Win32 — FUN_005dced3(pcVar2,*param_1,uVar3);
  // DEVIATION: Win32 — operator_delete(pcVar2);
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — }
  // DEVIATION: Win32 — return uVar3;
}
