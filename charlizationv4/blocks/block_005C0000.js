// ═══════════════════════════════════════════════════════════════════
// block_005C0000.js — Mechanical transpilation of block_005C0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_005C0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_005C0000.c
// ═══════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════
// GLOBAL VARIABLES (DAT_ references used in this block)
// ═══════════════════════════════════════════════════════════════════



// ═══════════════════════════════════════════════════════════════════
// STUBS: Win32 API and MFC calls — no-ops in JS
// ═══════════════════════════════════════════════════════════════════

import { G } from '../globals.js';
import { s8, u8, s16, u16, s32, u32, w16, w32, getTileOffset, tileRead, tileWrite, initMapTiles } from '../mem.js';
import { FUN_004087c0, FUN_005ae052, FUN_005b8931, FUN_005b94d5, FUN_005b89bb, FUN_005b89e4, FUN_005b8a1d, FUN_005b8ca6, FUN_005b8ee1, FUN_004bd9f0, FUN_0058c56c, FUN_005b68f6 } from '../fn_utils.js';
// ── Cross-block imports (auto-wired) ──
import { FUN_00407f90, FUN_00407fc0, FUN_0040ef50, FUN_0040f810, FUN_0040fad0 } from './block_00400000.js';
import { FUN_00414d10, FUN_00418740, FUN_00418770 } from './block_00410000.js';
import { FUN_00421bb0, FUN_00421c30, FUN_00421c60 } from './block_00420000.js';
import { FUN_0044c8e0 } from './block_00440000.js';
import { FUN_00453af0 } from './block_00450000.js';
import { FUN_0046f440 } from './block_00460000.js';
import { FUN_00497c40 } from './block_00490000.js';
import { FUN_004bb370 } from './block_004B0000.js';
import { FUN_004d8af0 } from './block_004D0000.js';
import { FUN_00511320 } from './block_00510000.js';
import { FUN_00579b40 } from './block_00570000.js';
import { FUN_005bb8c0, FUN_005bd14c, FUN_005bd1c5, FUN_005bd4cd, FUN_005bd630, FUN_005bd65c } from './block_005B0000.js';
import { FUN_005bd696, FUN_005bd7db, FUN_005bd813, FUN_005bd915, FUN_005bf930 } from './block_005B0000.js';
import { FUN_005d056c, FUN_005d080d, FUN_005d0aac, FUN_005d0dbf, FUN_005d10cd, FUN_005d1372 } from './block_005D0000.js';
import { FUN_005d1612, FUN_005d1b38, FUN_005d1cb0, FUN_005d1cd0, FUN_005d1ef0, FUN_005d1f20 } from './block_005D0000.js';
import { FUN_005d2279, FUN_005d22b7, FUN_005d233f, FUN_005d4204, FUN_005d7c00, FUN_005d7c6e } from './block_005D0000.js';
import { FUN_005d89e8, FUN_005d8ab8, FUN_005dae6b, FUN_005db1e0, FUN_005db1fa, FUN_005db2f8 } from './block_005D0000.js';
import { FUN_005db531, FUN_005db54b, FUN_005db67b, FUN_005db704, FUN_005db893, FUN_005db923 } from './block_005D0000.js';
import { FUN_005dcdf9, FUN_005dce29, FUN_005dce4f, FUN_005dce96, FUN_005dced3, FUN_005dcef7 } from './block_005D0000.js';
import { FUN_005de984, FUN_005de9e0, FUN_005dea9e, FUN_005deadb, FUN_005deb12, FUN_005dec4e } from './block_005D0000.js';
import { FUN_005dec8a, FUN_005decb1, FUN_005deced, FUN_005ded12 } from './block_005D0000.js';
import { FUN_005e388f, FUN_005e392a, FUN_005e395a, FUN_005e3988, FUN_005e3a81, FUN_005e3aa8 } from './block_005E0000.js';
import { FUN_005e3bdc, FUN_005e3cb4, FUN_005e47a5, FUN_005e49a0, FUN_005e4aa6, FUN_005e4b9b } from './block_005E0000.js';
import { FUN_005e4c3f, FUN_005e4cc8, FUN_005e4d60, FUN_005e4e60, FUN_005e4ef8, FUN_005e4f9b } from './block_005E0000.js';
import { FUN_005e511c, FUN_005e5869, FUN_005e58e7, FUN_005e6188, FUN_005e7028, FUN_005e92c9 } from './block_005E0000.js';
import { FUN_005ea7a0, FUN_005eabcc, FUN_005eb393, FUN_005ed710 } from './block_005E0000.js';
import { FUN_005f7120 } from './block_005F0000.js';
import { FUN_005f22d0 } from './block_00600000.js';

function SetRect() {}
function IntersectRect() {}
function OffsetRect() {}
function InvalidateRect() {}
function UpdateWindow() {}
function ValidateRect() {}
function GetClientRect() {}
function GetWindowRect() {}
function SetFocus() {}
function GetFocus() { return 0; }
function SetCapture() {}
function ReleaseCapture() {}
function GetParent() { return 0; }
function GetAsyncKeyState() { return 0; }
function CreateWindowExA() { return 0; }
function DestroyWindow() {}
function ShowWindow() {}
function MoveWindow() {}
function EnableWindow() {}
function GetWindowLongA() { return 0; }
function SetWindowLongA() {}
function GetClassLongA() { return 0; }
function PostMessageA() {}
function SendMessageA() { return 0; }
function DefWindowProcA() { return 0; }
function PtInRect() { return 0; }
function MapWindowPoints() {}
function BeginPaint() { return 0; }
function EndPaint() {}
function FrameRect() {}
function FillRect() {}
function BitBlt() {}
function GetDC() { return 0; }
function ReleaseDC() {}
function CreateCompatibleDC() { return 0; }
function CreateCompatibleBitmap() { return 0; }
function DeleteDC() {}
function DeleteObject() {}
function SelectObject() { return 0; }
function SelectPalette() {}
function RealizePalette() {}
function SetBkMode() {}
function SetTextColor() {}
function DrawTextA() {}
function GetTextMetricsA() {}
function GetTextExtentPointA() {}
function GetBitmapDimensionEx() {}
function CreateFontIndirectA() { return 0; }
function CreatePen() { return 0; }
function GetStockObject() { return 0; }
function MoveToEx() {}
function LineTo() {}
function AddFontResourceA() { return 0; }
function RemoveFontResourceA() { return 0; }
function EnumFontFamiliesA() {}
function RegisterClassA() {}
function LoadCursorA() { return 0; }
function LoadBitmapA() { return 0; }
function ShowScrollBar() {}
function SetScrollRange() {}
function SetScrollPos() {}
function GetScrollPos() { return 0; }
function GetScrollRange() {}
function lstrlenA() { return 0; }
function lstrcpyA() {}
function _atexit() {}
function _strcmp() { return 0; }
function _strlen(s) { return typeof s === 'string' ? s.length : 0; }
function _strncpy() {}
function _strncmp() { return 0; }
function _rand() { return Math.floor(Math.random() * 32768); }
function __strlwr(s) { return s; }
function operator_new(n) { return new Array(n).fill(0); }
function operator_delete() {}
function FID_conflict__memcpy() {}
function debug_log() {}

// MFC class method stubs
function COleClientItem_GetActiveView() { return 0; }
function CCheckListBox_GetCheckStyle(self) { return self ? (self[0x40] || 0) : 0; }
function CSplitterWnd_IsTracking(self) { return self ? (self[0x408] || 0) : 0; }


// ═══════════════════════════════════════════════════════════════════
// STUBS: Functions from OTHER blocks
// ═══════════════════════════════════════════════════════════════════

function create_dib_35B0() { return 0; }
function create_dib_41BA() { return 0; }
function create_dib_43C5() { return 0; }
function create_dib_45B5() { return 0; }
function handle_colortable_3ECA() {}
function handle_colortable_3FEB() {}
function handle_colortable_40FB() {}
function update_palette_CC11() {}
function update_palette_CCE2() {}
function update_palette_EA62() {}
function stretch_blit_CD66() {}
function stretch_blit_98BA() {}
function blit_CC8D() {}
function blit_9838() {}
function invalidate_9A9A() {}
function gdi_847F() { return 1; }
function gdi_E780() {}

// thunk stubs
function FUN_0043c520() {}
function FUN_0043c690() {}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS
// ═══════════════════════════════════════════════════════════════════


// FUN_005c000d — SEH destructor trampoline
export function FUN_005c000d() {
  FUN_005d7c6e();
}

// FUN_005c0023 — SEH frame restore
export function FUN_005c0023() {
  // FS register manipulation — no-op in JS
}

// FUN_005c0034 — set port clip rect from internal fields
export function FUN_005c0034() {
  var in_ECX = 0;
  SetRect(in_ECX + 0x14, in_ECX + 0x24, in_ECX + 0x28, in_ECX + 0x2c, in_ECX + 0x30);
}

// FUN_005c0073 — set port clip rect from param, intersect with bounds
export function FUN_005c0073(param_1) {
  var in_ECX = 0;
  SetRect(in_ECX + 0x14, param_1[0], param_1[1], param_1[2], param_1[3]);
  IntersectRect(in_ECX + 0x14, in_ECX + 0x14, in_ECX + 0x24);
}

// FUN_005c00ce — get port clip rect into param
export function FUN_005c00ce(param_1) {
  var in_ECX = 0;
  param_1[0] = in_ECX + 0x14;
  param_1[1] = in_ECX + 0x18;
  param_1[2] = in_ECX + 0x1c;
  param_1[3] = in_ECX + 0x20;
}

// FUN_005c0105 — dispatch port allocation by type
export function FUN_005c0105(param_1) {
  var uVar1;
  var in_ECX = 0;
  switch (in_ECX + 0x44) {
    case 1: uVar1 = FUN_005bd696(param_1); break;
    case 2: uVar1 = FUN_005c1b47(param_1); break;
    case 3: uVar1 = FUN_005c1cf7(param_1); break;
    case 4: uVar1 = FUN_005c1ea7(param_1); break;
    default: uVar1 = 0;
  }
  return uVar1;
}

// FUN_005c019d — allocate port type 1
export function FUN_005c019d(param_1) {
  FUN_005bd696(param_1);
}

// FUN_005c01c1 — lock port surface (compute scanline offsets)
export function FUN_005c01c1() {
  var uVar1;
  var pvVar2;
  var iVar3;
  var in_ECX = 0;
  var local_8;
  // Port lock logic — no-op in JS context
}

// FUN_005c02e0 — unlock port surface
export function FUN_005c02e0() {
  var uVar1;
  var in_ECX = 0;
  // Port unlock logic — no-op in JS context
}

// FUN_005c0333 — fill rect with color
export function FUN_005c0333(param_1, param_2) {
  // Graphics fill operation — no-op in JS
}

// FUN_005c041f — fill entire port with color
export function FUN_005c041f(param_1) {
  var in_ECX = 0;
  FUN_005c0333(in_ECX + 0x14, param_1);
}

// FUN_005c044a — change pixels in port rect
export function FUN_005c044a(param_1, param_2) {
  var in_ECX = 0;
  FUN_005c0479(in_ECX + 0x14, param_1, param_2);
}

// FUN_005c0479 — change pixel color in rect
export function FUN_005c0479(param_1, param_2, param_3) {
  // Pixel manipulation — no-op in JS
}

// FUN_005c0593 — blit between two 8-bit ports
export function FUN_005c0593(param_1, param_2, param_3) {
  // Port-to-port blit — no-op in JS
}

// FUN_005c0753 — blit from direct surface to port
export function FUN_005c0753(param_1, param_2, param_3) {
  // Surface-to-port blit — no-op in JS
}

// FUN_005c0979 — copy port to screen (8-bit)
export function FUN_005c0979(param_1, param_2, param_3) {
  // Screen blit — no-op in JS
}

// FUN_005c0a55 — copy port to screen (inverse order)
export function FUN_005c0a55(param_1, param_2, param_3) {
  // Screen blit — no-op in JS
}

// FUN_005c0b2c — stretched copy to screen
export function FUN_005c0b2c(param_1, param_2, param_3) {
  // Stretch blit — no-op in JS
}

// FUN_005c0bf2 — get pixel at (x,y)
export function FUN_005c0bf2(param_1, param_2) {
  var cVar1;
  var uVar2;
  cVar1 = FUN_005c1a00(param_1, param_2);
  if (cVar1 === 0) {
    FUN_005d22b7(0, param_1, param_2);
    uVar2 = 0;
  } else {
    var puVar3 = FUN_005c19d3(param_1, param_2);
    uVar2 = puVar3;
  }
  return uVar2;
}

// FUN_005c0c5d — set pixel at (x,y)
export function FUN_005c0c5d(param_1, param_2, param_3) {
  var cVar1 = FUN_005c1a00(param_1, param_2);
  if (cVar1 === 0) {
    FUN_005d22b7(0, param_1, param_2);
  } else {
    // Set pixel — no-op in JS
  }
}

// FUN_005c0cc5 — update palette reference
export function FUN_005c0cc5(param_1) {
  // Palette tracking — no-op in JS
}

// FUN_005c0d12 — update palette reference (null-safe)
export function FUN_005c0d12(param_1) {
  if (param_1 !== 0) {
    FUN_005c0cc5(param_1);
  }
}

// FUN_005c0d69 — draw text string at position
export function FUN_005c0d69(param_1, param_2, param_3, param_4) {
  // Text rendering — no-op in JS
}

// FUN_005c0e57 — draw text string in rect
export function FUN_005c0e57(param_1, param_2, param_3) {
  // Text rendering — no-op in JS
}

// FUN_005c0f57 — draw text with custom font at position
export function FUN_005c0f57(param_1, param_2, param_3, param_4, param_5) {
  // Text rendering — no-op in JS
}

// FUN_005c1020 — draw text with custom font in rect
export function FUN_005c1020(param_1, param_2, param_3, param_4) {
  // Text rendering — no-op in JS
}

// FUN_005c10fb — measure text width
export function FUN_005c10fb(param_1, param_2, param_3) {
  // Text measurement — no-op in JS
}

// FUN_005c1167 — measure text width with custom font
export function FUN_005c1167(param_1, param_2, param_3, param_4) {
  // Text measurement — no-op in JS
}

// FUN_005c11b2 — draw line in port
export function FUN_005c11b2(param_1, param_2, param_3, param_4) {
  // Line drawing — no-op in JS
}

// FUN_005c145d — draw rect outline (4 lines)
export function FUN_005c145d(param_1) {
  var in_ECX = 0;
  if (in_ECX + 0x40 !== 0) {
    FUN_005c11b2(param_1[0], param_1[1], param_1[2], param_1[1]);
    FUN_005c11b2(param_1[2], param_1[1], param_1[2], param_1[3]);
    FUN_005c11b2(param_1[2], param_1[3], param_1[0], param_1[3]);
    FUN_005c11b2(param_1[0], param_1[3], param_1[0], param_1[1]);
  }
}

// FUN_005c1513 — draw 3D raised rect (8-bit)
export function FUN_005c1513(param_1) {
  // 3D rect rendering — no-op in JS
}

// FUN_005c1742 — draw 3D sunken rect (8-bit)
export function FUN_005c1742(param_1) {
  // 3D rect rendering — no-op in JS
}

// FUN_005c1972 — set current brush, return old
export function FUN_005c1972(param_1) {
  var uVar1 = G.DAT_00637e58;
  G.DAT_00637e58 = param_1;
  return uVar1;
}

// FUN_005c1998 — get current brush
export function FUN_005c1998() {
  return G.DAT_00637e58;
}

// FUN_005c19ad — set current pen color, return old
export function FUN_005c19ad(param_1) {
  var uVar1 = G.DAT_00637e78;
  G.DAT_00637e78 = param_1;
  return uVar1;
}

// FUN_005c19d3 — compute pixel address from (x,y)
export function FUN_005c19d3(param_1, param_2) {
  // Pixel address computation — returns 0 in JS
  return 0;
}

// FUN_005c1a00 — test if (x,y) is within clip rect
export function FUN_005c1a00(param_1, param_2) {
  // Clip test — returns 1 (always in-bounds) in JS
  return 1;
}

// FUN_005c1a62 — apply palette remap to port pixels
export function FUN_005c1a62(param_1, param_2) {
  // Palette remap — no-op in JS
}

// FUN_005c1b0d — create DIB port with width/height
export function FUN_005c1b0d(param_1, param_2) {
  FUN_005c1b47({ left: 0, top: 0, right: param_1, bottom: param_2 });
}

// FUN_005c1b47 — allocate DIB port (type 2)
export function FUN_005c1b47(param_1) {
  // DIB allocation — returns 1 in JS
  return 1;
}

// FUN_005c1c99 — wrapper for FUN_005c1b47
export function FUN_005c1c99(param_1) {
  return FUN_005c1b47(param_1);
}

// FUN_005c1cbd — create 16-bit DIB port with width/height
export function FUN_005c1cbd(param_1, param_2) {
  FUN_005c1cf7({ left: 0, top: 0, right: param_1, bottom: param_2 });
}

// FUN_005c1cf7 — allocate 16-bit DIB port (type 3)
export function FUN_005c1cf7(param_1) {
  return 1;
}

// FUN_005c1e49 — wrapper for FUN_005c1cf7
export function FUN_005c1e49(param_1) {
  return FUN_005c1cf7(param_1);
}

// FUN_005c1e6d — create 24-bit DIB port with width/height
export function FUN_005c1e6d(param_1, param_2) {
  FUN_005c1ea7({ left: 0, top: 0, right: param_1, bottom: param_2 });
}

// FUN_005c1ea7 — allocate 24-bit DIB port (type 4)
export function FUN_005c1ea7(param_1) {
  return 1;
}

// FUN_005c1ff9 — wrapper for FUN_005c1ea7
export function FUN_005c1ff9(param_1) {
  return FUN_005c1ea7(param_1);
}

// FUN_005c201d — convert RGB888 to RGB555
export function FUN_005c201d(param_1, param_2, param_3) {
  return (((param_1 & 0xf8) >> 1) << 8) | (param_3 >> 3) + (param_2 & 0xf8) * 4;
}

// FUN_005c2048 — load TGA from resource into 16-bit port
export function FUN_005c2048(param_1) {
  // TGA resource loading — no-op in JS
  return 0;
}

// FUN_005c2360 — load TGA from file into 16-bit port
export function FUN_005c2360(param_1) {
  // TGA file loading — no-op in JS
}

// FUN_005c2786 — SEH destructor trampoline
export function FUN_005c2786() {
  FUN_005d7c6e();
}

// FUN_005c279c — SEH frame restore
export function FUN_005c279c() {
  // FS register manipulation — no-op
}

// FUN_005c27ad — load BMP from resource into 16-bit port
export function FUN_005c27ad(param_1) {
  return 0;
}

// FUN_005c2a77 — load BMP from file into 16-bit port
export function FUN_005c2a77(param_1) {
  // BMP file loading — no-op in JS
}

// FUN_005c2e37 — SEH destructor trampoline
export function FUN_005c2e37() {
  FUN_005d7c6e();
}

// FUN_005c2e4d — SEH frame restore
export function FUN_005c2e4d() {}

// FUN_005c2e5e — load GIF from resource into 16-bit port
export function FUN_005c2e5e(param_1) {
  return 0;
}

// FUN_005c3313 — load GIF from file into 16-bit port
export function FUN_005c3313(param_1) {
  // GIF file loading — no-op in JS
}

// FUN_005c384d — SEH destructor trampoline
export function FUN_005c384d() {
  FUN_005d7c6e();
}

// FUN_005c3863 — SEH frame restore
export function FUN_005c3863() {}

// FUN_005c3874 — load CvPic from resource into 16-bit port
export function FUN_005c3874(param_1) {
  return 0;
}

// FUN_005c3b7a — load CvPic from file into 16-bit port
export function FUN_005c3b7a(param_1) {
  // CvPic file loading — no-op in JS
}

// FUN_005c3ed5 — SEH destructor trampoline
export function FUN_005c3ed5() {
  FUN_005d7c6e();
}

// FUN_005c3eeb — SEH frame restore
export function FUN_005c3eeb() {}

// FUN_005c3efc — load BMP from resource into 24-bit port
export function FUN_005c3efc(param_1) {
  return 0;
}

// FUN_005c40b6 — load BMP from file into 24-bit port
export function FUN_005c40b6(param_1) {
  // BMP file loading (24-bit) — no-op in JS
}

// FUN_005c434e — SEH destructor trampoline
export function FUN_005c434e() {
  FUN_005d7c6e();
}

// FUN_005c4364 — SEH frame restore
export function FUN_005c4364() {}

// FUN_005c4375 — load TGA from resource into 24-bit port
export function FUN_005c4375(param_1) {
  return 0;
}

// FUN_005c463f — load TGA from file into 24-bit port
export function FUN_005c463f(param_1) {
  // TGA file loading (24-bit) — no-op in JS
}

// FUN_005c4a00 — SEH destructor trampoline
export function FUN_005c4a00() {
  FUN_005d7c6e();
}

// FUN_005c4a16 — SEH frame restore
export function FUN_005c4a16() {}

// FUN_005c4a27 — fill rect with RGB color (24-bit port)
export function FUN_005c4a27(param_1, param_2, param_3, param_4) {
  // 24-bit fill — no-op in JS
}

// FUN_005c4b4c — fill entire 24-bit port with RGB
export function FUN_005c4b4c(param_1, param_2, param_3) {
  var in_ECX = 0;
  FUN_005c4a27(in_ECX + 0x14, param_1, param_2, param_3);
}

// FUN_005c4b7f — blit between two ports (24-bit dest)
export function FUN_005c4b7f(param_1, param_2, param_3) {
  // 24-bit blit — no-op in JS
}

// FUN_005c4c46 — blit from direct surface to 24-bit port
export function FUN_005c4c46(param_1, param_2, param_3) {
  // Surface blit — no-op in JS
}

// FUN_005c4d0d — copy 24-bit port to screen (stretch)
export function FUN_005c4d0d(param_1, param_2, param_3) {
  // Screen blit — no-op in JS
}

// FUN_005c4dd3 — draw text with shadow (24-bit)
export function FUN_005c4dd3(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // Text rendering — no-op in JS
}

// FUN_005c4eb6 — draw text in rect (24-bit)
export function FUN_005c4eb6(param_1, param_2, param_3) {
  // Text rendering — no-op in JS
}

// FUN_005c4f9f — draw text with custom font (24-bit)
export function FUN_005c4f9f(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // Text rendering — no-op in JS
}

// FUN_005c505d — draw text with custom font in rect (24-bit)
export function FUN_005c505d(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // Text rendering — no-op in JS
}

// FUN_005c512d — measure text with font (24-bit)
export function FUN_005c512d(param_1, param_2, param_3, param_4, param_5, param_6) {
  // Text measurement — no-op in JS
}

// FUN_005c51a5 — measure text with custom font (24-bit)
export function FUN_005c51a5(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // Text measurement — no-op in JS
}

// FUN_005c51fc — draw 24-bit line
export function FUN_005c51fc(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // Line drawing — no-op in JS
}

// FUN_005c52dd — draw 24-bit rect outline (4 lines)
export function FUN_005c52dd(param_1, param_2, param_3, param_4) {
  // Rect outline — no-op in JS
}

// FUN_005c53c3 — set palette from port data
export function FUN_005c53c3(param_1, param_2, param_3) {
  // Palette set — no-op in JS
}

// FUN_005c5410 — byte swap 16-bit value (endian)
export function FUN_005c5410(param_1) {
  return ((param_1 & 0xff) << 8) | ((param_1 >> 8) & 0xff);
}

// FUN_005c5430 — byte swap 32-bit value (endian)
export function FUN_005c5430(param_1) {
  return (param_1 << 24) | ((param_1 & 0xff00) << 8) | ((param_1 & 0xff0000) >> 8) | (param_1 >>> 24);
}

// FUN_005c5470 — open file for reading (wrapper)
export function FUN_005c5470() {
  return FUN_005d89e8();
}

// FUN_005c54a0 — close file (wrapper)
export function FUN_005c54a0() {
  FUN_005d8ab8();
}

// FUN_005c54d0 — identity / passthrough
export function FUN_005c54d0(param_1) {
  return param_1;
}

// FUN_005c54f0 — check if port is locked (has surface pointer)
export function FUN_005c54f0() {
  // Always return true in JS stub
  return 1;
}

// FUN_005c5520 — release resource handle (wrapper)
export function FUN_005c5520(param_1) {
  FUN_005db1e0(param_1);
}

// FUN_005c5540 — find resource by type and name (wrapper)
export function FUN_005c5540(param_1, param_2) {
  return FUN_005db1fa(param_1, param_2);
}

// FUN_005c5560 — lock resource handle (wrapper)
export function FUN_005c5560(param_1) {
  return FUN_005db531(param_1);
}

// FUN_005c5580 — unlock resource handle (wrapper)
export function FUN_005c5580(param_1) {
  FUN_005db54b(param_1);
}

// FUN_005c55a0 — align width to 4-byte boundary
export function FUN_005c55a0(param_1) {
  return ((param_1 + 3) & ~3);
}

// FUN_005c55d0 — get port scanline stride
export function FUN_005c55d0() {
  return 0;
}

// GetCheckStyle — get port DIB handle (MFC misidentification)
export function GetCheckStyle() {
  return 0;
}

// FUN_005c5610 — advance pointer by scanline stride
export function FUN_005c5610(param_1) {
  return param_1;
}

// FUN_005c5640 — get port surface pointer
export function FUN_005c5640() {
  return 0;
}

// FUN_005c5660 — get port width
export function FUN_005c5660() {
  return 0;
}

// FUN_005c5680 — get port height
export function FUN_005c5680() {
  return 0;
}

// FUN_005c56a0 — get port scanline stride (accessor)
export function FUN_005c56a0() {
  return 0;
}

// ~_Timevec — destructor (release direct surface)
export function _Timevec_destructor(param_1) {
  FUN_005e92c9(param_1);
}

// IsTracking — get palette handle (MFC misidentification)
export function IsTracking() {
  return 0;
}

// FUN_005c5710 — retreat pointer by scanline stride
export function FUN_005c5710(param_1) {
  return param_1;
}

// FUN_005c5740 — get direct surface base pointer
export function FUN_005c5740() {
  return 0;
}

// FUN_005c5760 — create sprite window (7 params)
export function FUN_005c5760(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  FUN_005c5f20(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  var uVar1 = FUN_00414d10();
  FUN_005ea7a0(0, uVar1);
}

// FUN_005c57b1 — create sprite window + show (8 params)
export function FUN_005c57b1(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  FUN_005c5760(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
}

// FUN_005c57f9 — create sprite window (8 params)
export function FUN_005c57f9(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  FUN_005c5fc4(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  var uVar1 = FUN_00414d10();
  FUN_005ea7a0(0, uVar1);
}

// FUN_005c584e — create sprite window + show (9 params)
export function FUN_005c584e(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  FUN_005c57f9(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  FUN_00579b40(param_9);
}

// FUN_005c589a — create animation window (6 params)
export function FUN_005c589a(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_005c6070(param_1, param_2, param_3, param_4, param_5, param_6);
  var uVar1 = FUN_00414d10();
  FUN_005ea7a0(0, uVar1);
}

// FUN_005c58e7 — create animation window + show (7 params)
export function FUN_005c58e7(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  FUN_005c589a(param_1, param_2, param_3, param_4, param_5, param_6);
  FUN_00579b40(param_7);
}

// FUN_005c592b — create animation window (7 params)
export function FUN_005c592b(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  FUN_005c610c(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  var uVar1 = FUN_00414d10();
  FUN_005ea7a0(0, uVar1);
}

// FUN_005c597c — create animation window + show (8 params)
export function FUN_005c597c(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  FUN_005c592b(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
}

// FUN_005c59c4 — add control to linked list
export function FUN_005c59c4(param_1) {
  // Linked list management — no-op in JS
}

// FUN_005c5a27 — remove control from linked list by ID
export function FUN_005c5a27(param_1) {
  // Linked list management — no-op in JS
}

// FUN_005c5aeb — clear all controls from linked list
export function FUN_005c5aeb() {
  // Linked list management — no-op in JS
}

// FUN_005c5b36 — invalidate all controls
export function FUN_005c5b36() {
  // Control invalidation — no-op in JS
}

// FUN_005c5b7f — find first visible control and repaint
export function FUN_005c5b7f() {
  // Control repaint — no-op in JS
}

// FUN_005c5c2d — find first visible control
export function FUN_005c5c2d() {
  return 0;
}

// FUN_005c5c86 — find control by name (hotkey lookup)
export function FUN_005c5c86(param_1) {
  return 0;
}

// FUN_005c5e60 — get control type
export function FUN_005c5e60() {
  return 0;
}

// FUN_005c5e80 — get next control in linked list
export function FUN_005c5e80() {
  return 0;
}

// FUN_005c5ea0 — get control visible flag
export function FUN_005c5ea0() {
  return 0;
}

// FUN_005c5ec0 — get control enabled flag
export function FUN_005c5ec0() {
  return 0;
}

// FUN_005c5ee0 — get control data pointer
export function FUN_005c5ee0() {
  return 0;
}

// FUN_005c5f00 — get control item count
export function FUN_005c5f00() {
  return 0;
}

// FUN_005c5f20 — create sprite and register with parent
export function FUN_005c5f20(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  FUN_005db67b(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  var uVar1 = FUN_00414d10();
  FUN_005eb393(0, uVar1);
  FUN_0044c8e0();
}

// FUN_005c5f7c — create sprite and register + show
export function FUN_005c5f7c(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  FUN_005c5f20(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
}

// FUN_005c5fc4 — create sprite and register (8 params)
export function FUN_005c5fc4(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  FUN_005db893(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  var uVar1 = FUN_00414d10();
  FUN_005eb393(0, uVar1);
  FUN_0044c8e0();
}

// FUN_005c6024 — create sprite and register + show (9 params)
export function FUN_005c6024(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8, param_9) {
  FUN_005c5fc4(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8);
  FUN_00579b40(param_9);
}

// FUN_005c6070 — create animation and register (6 params)
export function FUN_005c6070(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_005db704(param_1, param_2, param_3, param_4, param_5, param_6);
  var uVar1 = FUN_00414d10();
  FUN_005eb393(0, uVar1);
  FUN_0044c8e0();
}

// FUN_005c60c8 — create animation and register + show (7 params)
export function FUN_005c60c8(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  FUN_005c6070(param_1, param_2, param_3, param_4, param_5, param_6);
  FUN_00579b40(param_7);
}

// FUN_005c610c — create animation and register (7 params)
export function FUN_005c610c(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  FUN_005db923(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  var uVar1 = FUN_00414d10();
  FUN_005eb393(0, uVar1);
  FUN_0044c8e0();
}

// FUN_005c6168 — create animation and register + show (8 params)
export function FUN_005c6168(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  FUN_005c610c(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
  FUN_00579b40(param_8);
}

// FUN_005c61b0 — run modal dialog loop
export function FUN_005c61b0() {
  // Modal dialog loop — no-op in JS
}

// InvalidateObjectCache — dismiss modal dialog
export function InvalidateObjectCache() {
  // Modal dismiss — no-op in JS
}

// FUN_005c62ee — get saved parent window ref
export function FUN_005c62ee() {
  return G.DAT_00637ea4;
}

// FUN_005c6303 — set saved parent window ref, return old
export function FUN_005c6303(param_1) {
  var uVar1 = G.DAT_00637ea4;
  G.DAT_00637ea4 = param_1;
  return uVar1;
}

// FUN_005c6329 — set horizontal scroll position
export function FUN_005c6329(param_1) {
  // Scroll position — no-op in JS
}

// FUN_005c636c — set vertical scroll position
export function FUN_005c636c(param_1) {
  // Scroll position — no-op in JS
}

// FUN_005c63af — invoke callback if set
export function FUN_005c63af(param_1) {
  return false;
}

// FUN_005c6400 — get horizontal scroll range
export function FUN_005c6400(param_1, param_2) {
  // Scroll range — no-op in JS
}

// FUN_005c6440 — get vertical scroll range
export function FUN_005c6440(param_1, param_2) {
  // Scroll range — no-op in JS
}

// FUN_005c6480 — flush palette changes to hardware
export function FUN_005c6480() {
  FUN_005decb1();
  FUN_005c6a42();
}

// FUN_005c64da — initialize palette manager
export function FUN_005c64da() {
  gdi_E780();
  FUN_005c6a42();
  return 0;
}

// FUN_005c656b — destroy palette manager
export function FUN_005c656b() {
  // Palette destruction — no-op in JS
}

// FUN_005c65f9 — load color table from resource
export function FUN_005c65f9(param_1) {
  // Color table loading — no-op in JS
}

// FUN_005c66b9 — load color table from resource (with range)
export function FUN_005c66b9(param_1, param_2, param_3) {
  // Color table loading — no-op in JS
}

// FUN_005c6757 — load color table from file (wrapper)
export function FUN_005c6757(param_1) {
  FUN_005c68f0(param_1);
}

// FUN_005c677b — save color table to file (full range)
export function FUN_005c677b(param_1) {
  FUN_005c67a6(param_1, 0, 0xff);
}

// FUN_005c67a6 — save color table to file (with range)
export function FUN_005c67a6(param_1, param_2, param_3) {
  // Color table save — no-op in JS
}

// FUN_005c68ca — SEH destructor trampoline
export function FUN_005c68ca() {
  FUN_005d7c6e();
}

// FUN_005c68e0 — SEH frame restore
export function FUN_005c68e0() {}

// FUN_005c68f0 — load color table from file
export function FUN_005c68f0(param_1) {
  // Color table file load — no-op in JS
}

// FUN_005c6a1c — SEH destructor trampoline
export function FUN_005c6a1c() {
  FUN_005d7c6e();
}

// FUN_005c6a32 — SEH frame restore
export function FUN_005c6a32() {}

// FUN_005c6a42 — generate random palette ID
export function FUN_005c6a42() {
  // Random ID generation — no-op in JS
}

// FUN_005c6a8d — flush palette with animate flag
export function FUN_005c6a8d(param_1, param_2) {
  FUN_005de984();
  FUN_005c6480(param_1, param_2);
}

// FUN_005c6ac9 — flush palette with fade flag
export function FUN_005c6ac9(param_1, param_2) {
  FUN_005de9e0();
  FUN_005c6480(param_1, param_2);
}

// FUN_005c6b05 — update palette to hardware
export function FUN_005c6b05() {
  update_palette_EA62();
}

// Realloc — open file (MFC misidentification)
export function Realloc(param_1, param_2) {
  FUN_005deced(param_1, param_2);
}

// FUN_005c6b63 — read palette entries from hardware
export function FUN_005c6b63() {
  FUN_005ded12();
}

// FUN_005c6b93 — set single palette entry
export function FUN_005c6b93(param_1) {
  FUN_005deb12();
  FUN_005c6480(param_1, 1);
}

// FUN_005c6bd5 — rotate palette entries
export function FUN_005c6bd5(param_1, param_2, param_3) {
  // Palette rotation — no-op in JS
}

// FUN_005c6da8 — set palette range from RGB triplets
export function FUN_005c6da8(param_1, param_2, param_3) {
  // Palette range set — no-op in JS
}

// FUN_005c6e36 — setup palette fade (store target)
export function FUN_005c6e36(param_1, param_2, param_3) {
  // Palette fade setup — no-op in JS
}

// FUN_005c6edc — setup palette fade with target RGB
export function FUN_005c6edc(param_1, param_2, param_3, param_4, param_5, param_6) {
  // Palette fade setup — no-op in JS
}

// FUN_005c6f2c — restore palette from fade backup
export function FUN_005c6f2c() {
  // Palette restore — no-op in JS
}

// FUN_005c6fc3 — copy fade palette to buffer
export function FUN_005c6fc3(param_1, param_2) {
  // Palette copy — no-op in JS
}

// FUN_005c701c — apply palette fade step (to target color)
export function FUN_005c701c(param_1) {
  // Palette fade step — no-op in JS
}

// FUN_005c71f3 — setup palette cross-fade (two targets)
export function FUN_005c71f3(param_1, param_2, param_3) {
  // Palette cross-fade setup — no-op in JS
}

// FUN_005c72f8 — restore palette from cross-fade backup
export function FUN_005c72f8() {
  // Palette restore — no-op in JS
}

// FUN_005c738e — apply palette cross-fade step
export function FUN_005c738e(param_1) {
  // Palette cross-fade step — no-op in JS
}

// FUN_005c7579 — build color match table from palette
export function FUN_005c7579(param_1, param_2, param_3, param_4) {
  // Color match table — no-op in JS
}

// FUN_005c76e4 — cleanup color match table
export function FUN_005c76e4() {
  FUN_005c7a30();
}

// FUN_005c76fa — SEH frame restore
export function FUN_005c76fa() {}

// FUN_005c770a — build color match table with two palettes
export function FUN_005c770a(param_1, param_2, param_3, param_4, param_5, param_6) {
  // Color match table — no-op in JS
}

// FUN_005c7873 — cleanup color match table
export function FUN_005c7873() {
  FUN_005c7a30();
}

// FUN_005c7889 — SEH frame restore
export function FUN_005c7889() {}

// FUN_005c7899 — find nearest palette color to RGB
export function FUN_005c7899(param_1, param_2, param_3) {
  // Color match — no-op in JS
}

// FUN_005c7998 — cleanup color match table
export function FUN_005c7998() {
  FUN_005c7a30();
}

// FUN_005c79ae — SEH frame restore
export function FUN_005c79ae() {}

// FUN_005c79bf — initialize KD-tree for color matching
export function FUN_005c79bf() {
  // KD-tree init — no-op in JS
  return 0;
}

// FUN_005c7a30 — cleanup KD-tree
export function FUN_005c7a30() {
  // KD-tree cleanup — no-op in JS
}

// FUN_005c7a86 — build KD-tree from palette
export function FUN_005c7a86(param_1, param_2, param_3) {
  // KD-tree build — no-op in JS
}

// FUN_005c7c7b — insert node into KD-tree
export function FUN_005c7c7b(param_1, param_2) {
  // KD-tree insert — no-op in JS
}

// FUN_005c7e06 — nearest-neighbor search in KD-tree
export function FUN_005c7e06(param_1, param_2, param_3, param_4) {
  return 0;
}

// FUN_005c80fd — find palette entry closest to gray (0x80)
export function FUN_005c80fd(param_1) {
  return 0;
}

// create_font_8200 — create Windows font
export function create_font_8200(param_1, param_2, param_3) {
  return 0;
}

// FUN_005c8391 — get sub-font from font family
export function FUN_005c8391(param_1, param_2) {
  return 0;
}

// FUN_005c841d — delete font handle
export function FUN_005c841d(param_1) {
  // Font deletion — no-op in JS
}

// gdi_847F_export — get font height (exported version)
export function gdi_847F_export(param_1) {
  return 1;
}

// gdi_8514 — get font height + external leading
export function gdi_8514(param_1) {
  return 1;
}

// measure_text_858E — measure text width with font
export function measure_text_858E(param_1, param_2) {
  return 0;
}

// FUN_005c861c — load font from file
export function FUN_005c861c(param_1) {
  return 0;
}

// create_font_86BC — enum font callback
export function create_font_86BC(param_1, param_2, param_3, param_4) {
  return 1;
}

// gdi_8736 — enumerate font families
export function gdi_8736(param_1) {
  return 0;
}

// FUN_005c8791 — unload font file
export function FUN_005c8791(param_1) {
  // Font unload — no-op in JS
}

// render_text_8834 — render text and return bounding rect
export function render_text_8834(param_1, param_2, param_3, param_4) {
  return param_1;
}

// create_font_8908 — create font from LOGFONT
export function create_font_8908(param_1) {
  return 0;
}

// FUN_005c8984 — delete font object
export function FUN_005c8984(param_1) {
  return 0;
}

// send_msg_89ED — add font resource and broadcast
export function send_msg_89ED(param_1) {
  return 0;
}

// send_msg_8A85 — remove font resource and broadcast
export function send_msg_8A85(param_1) {
  // Font removal — no-op in JS
}

// invalidate_8B00 — invalidate entire window
export function invalidate_8B00(param_1) {
  // Window invalidation — no-op in JS
}

// manage_window_8B2D — show window
export function manage_window_8B2D(param_1) {
  // Window show — no-op in JS
}

// manage_window_8B58 — hide window
export function manage_window_8B58(param_1) {
  // Window hide — no-op in JS
}

// FUN_005c8b83 — move window to position
export function FUN_005c8b83(param_1, param_2, param_3) {
  // Window move — no-op in JS
}

// create_window_8BE1 — create control window (region)
export function create_window_8BE1(param_1, param_2) {
  return 0;
}

// FUN_005c8c83 — validate control handle
export function FUN_005c8c83(param_1) {
  if (param_1 === 0) {
    debug_log(0);
  }
}

// FUN_005c8caf — region control window proc
export function FUN_005c8caf(param_1, param_2, param_3, param_4) {
  return 0;
}

// FUN_005c8f50 — get control rect pointer
export function FUN_005c8f50() {
  return 0;
}

// FUN_005c8f70 — invoke mouse enter callback
export function FUN_005c8f70(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005c8fb0 — invoke mouse leave callback
export function FUN_005c8fb0(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005c8ff0 — invoke mouse click callback
export function FUN_005c8ff0(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005c9030 — invoke mouse down callback
export function FUN_005c9030(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005c9070 — invoke mouse double-click callback
export function FUN_005c9070(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005c90b0 — set keyboard focus to window
export function FUN_005c90b0(param_1) {
  SetFocus(param_1);
}

// update_palette_90CA — paint control background
export function update_palette_90CA(param_1, param_2) {
  // Control painting — no-op in JS
}

// FUN_005c9222 — parse hotkey from label string
export function FUN_005c9222(param_1, param_2) {
  // Hotkey parsing — no-op in JS
}

// send_msg_9307 — default control window proc
export function send_msg_9307(param_1, param_2, param_3, param_4) {
  return 0;
}

// manage_window_944B — destroy control window
export function manage_window_944B() {
  // Window destruction — no-op in JS
}

// FUN_005c9499 — initialize control data
export function FUN_005c9499(param_1, param_2) {
  return 0;
}

// FUN_005c9563 — get control data from window handle
export function FUN_005c9563(param_1) {
  return 0;
}

// FUN_005c9595 — dispose control data
export function FUN_005c9595(param_1) {
  // Control disposal — no-op in JS
}

// invalidate_96CC — full client repaint
export function invalidate_96CC(param_1) {
  // Full repaint — no-op in JS
}

// ios_delbuf — set stream delete flag (MFC)
export function ios_delbuf(param_1, param_2) {
  // Stream flag — no-op in JS
}

// draw_text_9740 — create button window (with 3 bitmaps)
export function draw_text_9740(param_1, param_2, param_3, param_4) {
  return 0;
}

// FUN_005cabf6 — validate button handle
export function FUN_005cabf6(param_1) {
  if (param_1 === 0) {
    debug_log(0);
  }
}

// FUN_005cac22 — activate text edit control
export function FUN_005cac22(param_1) {
  // Text edit activation — no-op in JS
}

// blit_ACD4 — button window proc
export function blit_ACD4(param_1, param_2, param_3, param_4) {
  return 0;
}

// create_window_B319 — create sprite button window
export function create_window_B319(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  return 0;
}

// create_window_B601 — create simple sprite button
export function create_window_B601(param_1, param_2, param_3, param_4, param_5, param_6) {
  return 0;
}

// FUN_005cb6db — empty function (placeholder)
export function FUN_005cb6db() {}

// blit_B6EB — sprite button window proc
export function blit_B6EB(param_1, param_2, param_3, param_4) {
  return 0;
}

// IsTracking_CBDB0 — get palette handle (second instance)
export function IsTracking_CBDB0() {
  return 0;
}

// FUN_005cbdd0 — get dialog keyboard-focus flag
export function FUN_005cbdd0() {
  return 0;
}

// FUN_005cbdf0 — invoke button click callback
export function FUN_005cbdf0(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005cbe30 — invoke button left-click callback
export function FUN_005cbe30(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005cbe70 — invoke button right-click callback
export function FUN_005cbe70(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005cbeb0 — wait for input event
export function FUN_005cbeb0(param_1) {
  FUN_005d4204(param_1);
}

// FID_conflict___E31 — CRT static initializer
export function FID_conflict___E31() {
  FUN_005cbeea();
  FUN_005cbf04();
}

// FUN_005cbeea — CRT init helper
export function FUN_005cbeea() {
  FUN_0043c690();
}

// FUN_005cbf04 — register CRT atexit handler
export function FUN_005cbf04() {
  _atexit(FUN_005cbf21);
}

// FUN_005cbf21 — CRT cleanup handler
export function FUN_005cbf21() {
  FUN_0043c520();
}

// measure_text_BF40 — measure checkbox text bounds
export function measure_text_BF40(param_1, param_2, param_3, param_4) {
  // Text measurement — no-op in JS
}

// gdi_C035 — measure checkbox bounds (no text)
export function gdi_C035(param_1, param_2, param_3, param_4) {
  // Control measurement — no-op in JS
}

// create_window_C0F0 — create checkbox window
export function create_window_C0F0(param_1, param_2, param_3, param_4) {
  return 0;
}

// FUN_005cc248 — validate checkbox handle
export function FUN_005cc248(param_1) {
  if (param_1 === 0) {
    debug_log(0);
  }
}

// invalidate_C274 — toggle checkbox and repaint
export function invalidate_C274(param_1) {
  // Checkbox toggle — no-op in JS
}

// draw_text_C320 — checkbox window proc
export function draw_text_C320(param_1, param_2, param_3, param_4) {
  return 0;
}

// FUN_005ccddf — set checkbox enabled text color
export function FUN_005ccddf(param_1, param_2, param_3) {
  G.DAT_00637f00 = param_1;
  G.DAT_00637f01 = param_2;
  G.DAT_00637f02 = param_3;
  G.DAT_00637f03 = 1;
}

// FUN_005cce0e — set checkbox disabled text color
export function FUN_005cce0e(param_1, param_2, param_3) {
  G.DAT_00637f04 = param_1;
  G.DAT_00637f05 = param_2;
  G.DAT_00637f06 = param_3;
  G.DAT_00637f07 = 1;
}

// FUN_005cce40 — invoke checkbox toggle callback
export function FUN_005cce40(param_1, param_2) {
  // Callback dispatch — no-op in JS
}

// FUN_005cce80 — subclassed control window proc
export function FUN_005cce80(param_1, param_2, param_3, param_4) {
  // Subclassed wndproc — no-op in JS
}

// register_wndclass_CF17 — create scrollbar control
export function register_wndclass_CF17(param_1, param_2, param_3, param_4) {
  return 0;
}

// FUN_005cd139 — empty function (placeholder)
export function FUN_005cd139() {}

// gdi_D149 — scrollbar message handler
export function gdi_D149(param_1, param_2, param_3, param_4) {
  // Scrollbar handler — no-op in JS
}

// FUN_005cd49f — enable/disable window
export function FUN_005cd49f(param_1, param_2) {
  // Window enable — no-op in JS
}

// FUN_005cd4c7 — set scrollbar range and position
export function FUN_005cd4c7(param_1, param_2, param_3) {
  FUN_005cd559(param_1, param_2);
}

// FUN_005cd4fd — set scrollbar range and position (with repaint flag)
export function FUN_005cd4fd(param_1, param_2, param_3, param_4) {
  FUN_005cd559(param_1, param_2);
}

// FUN_005cd535 — get scrollbar range
export function FUN_005cd535(param_1, param_2, param_3) {
  // Scrollbar range — no-op in JS
}

// FUN_005cd559 — set scrollbar position
export function FUN_005cd559(param_1, param_2) {
  gdi_D149(param_1, 0x111, 0x7f, param_2);
}

// FUN_005cd580 — set window scrollbar range
export function FUN_005cd580(param_1, param_2, param_3, param_4) {
  FUN_005cd5f0(param_1, param_2, param_4);
}

// FUN_005cd5c3 — get window scrollbar range
export function FUN_005cd5c3(param_1, param_2, param_3, param_4) {
  // Scrollbar range — no-op in JS
}

// FUN_005cd5f0 — set window scroll position
export function FUN_005cd5f0(param_1, param_2, param_3) {
  // Scroll position — no-op in JS
}

// FUN_005cd620 — get scrollbar current value
export function FUN_005cd620() {
  return 0;
}

// FUN_005cd640 — invoke scrollbar change callback
export function FUN_005cd640(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005cd680 — invoke scrollbar tracking callback
export function FUN_005cd680(param_1) {
  // Callback dispatch — no-op in JS
}

// FUN_005cd6c0 — get scrollbar page size
export function FUN_005cd6c0() {
  return 0;
}

// FUN_005cd6e0 — initialize scale table cache
export function FUN_005cd6e0() {
  FUN_005cd775(1, 1);
  FUN_005cda2a(1, 1, 1, 1);
}

// FUN_005cd775 — build/cache scale lookup table
export function FUN_005cd775(param_1, param_2) {
  if (param_1 < 2) param_1 = 1;
  if (param_2 < 2) param_2 = 1;
  G.DAT_00637f98 = param_1;
  G.DAT_00637f9c = param_2;
  // Scale table computation — simplified no-op in JS
}

// FUN_005cda06 — get current scale factors
export function FUN_005cda06(param_1, param_2) {
  if (param_1) param_1[0] = G.DAT_00637f98;
  if (param_2) param_2[0] = G.DAT_00637f9c;
}

// FUN_005cda2a — build/cache blit scale lookup tables (X and Y)
export function FUN_005cda2a(param_1, param_2, param_3, param_4) {
  if (param_1 < 2) param_1 = 1;
  if (param_2 < 2) param_2 = 1;
  if (param_3 < 2) param_3 = 1;
  if (param_4 < 2) param_4 = 1;
  G.DAT_00637fa0 = param_1;
  G.DAT_00637fa4 = param_2;
  G.DAT_00637fa8 = param_3;
  G.DAT_00637fac = param_4;
  // Scale table computation — simplified no-op in JS
}

// FUN_005cdcdb — compute single scale lookup table
export function FUN_005cdcdb(param_1, param_2, param_3) {
  // Scale table computation — no-op in JS
}

// CString::CString — default constructor
export function CString_CString() {
  FUN_005d1b38();
}

// FUN_005cde4d — release sprite data
export function FUN_005cde4d() {
  // Sprite data release — no-op in JS
}

// FUN_005cdea1 — create sprite from port (with fill)
export function FUN_005cdea1(param_1, param_2, param_3) {
  // Sprite creation — no-op in JS
}

// FUN_005cdf2d — sprite cleanup helper
export function FUN_005cdf2d() {
  FUN_005bd915();
}

// FUN_005cdf40 — SEH frame restore
export function FUN_005cdf40() {}

// FUN_005cdf50 — reset sprite data
export function FUN_005cdf50() {
  FUN_005d1b38();
}

// FUN_005cdfb2 — empty function (placeholder)
export function FUN_005cdfb2() {}

// FUN_005cdfc2 — load sprite from resource
export function FUN_005cdfc2(param_1) {
  // Sprite resource loading — no-op in JS
}

// FUN_005ce16e — load sprite from resource (with default palette)
export function FUN_005ce16e(param_1, param_2) {
  FUN_005ce19a(param_1, 0xffffffff, 0xffffffff, param_2);
}

// FUN_005ce19a — load sprite from resource (with palette range)
export function FUN_005ce19a(param_1, param_2, param_3) {
  // Sprite resource loading — no-op in JS
}

// FUN_005ce3a8 — load sprite from file (wrapper)
export function FUN_005ce3a8(param_1) {
  FUN_005ce9ef(param_1);
}

// FUN_005ce3cc — save sprite to file
export function FUN_005ce3cc(param_1, param_2, param_3) {
  // Sprite file save — no-op in JS
}

// FUN_005ce595 — SEH destructor trampoline
export function FUN_005ce595() {
  FUN_005d7c6e();
}

// FUN_005ce5ab — SEH frame restore
export function FUN_005ce5ab() {}

// FUN_005ce5bb — save sprite to file (simple)
export function FUN_005ce5bb(param_1) {
  // Sprite file save — no-op in JS
}

// FUN_005ce6fd — SEH destructor trampoline
export function FUN_005ce6fd() {
  FUN_005d7c6e();
}

// FUN_005ce713 — SEH frame restore
export function FUN_005ce713() {}

// FUN_005ce723 — load sprite from file (with default palette)
export function FUN_005ce723(param_1, param_2) {
  FUN_005ce74f(param_1, 0xffffffff, 0xffffffff, param_2);
}

// FUN_005ce74f — load sprite from file (with palette range)
export function FUN_005ce74f(param_1, param_2, param_3) {
  // Sprite file loading — no-op in JS
}

// FUN_005ce9c9 — SEH destructor trampoline
export function FUN_005ce9c9() {
  FUN_005d7c6e();
}

// FUN_005ce9df — SEH frame restore
export function FUN_005ce9df() {}

// FUN_005ce9ef — load sprite from file
export function FUN_005ce9ef(param_1) {
  // Sprite file loading — no-op in JS
}

// FUN_005ceb8e — SEH destructor trampoline
export function FUN_005ceb8e() {
  FUN_005d7c6e();
}

// FUN_005ceba4 — SEH frame restore
export function FUN_005ceba4() {}

// FUN_005cebb4 — extract sprite from port (default chroma)
export function FUN_005cebb4(param_1, param_2) {
  // Sprite extraction — no-op in JS
}

// FUN_005cebec — extract sprite from port (with rect)
export function FUN_005cebec(param_1, param_2, param_3, param_4, param_5) {
  // Sprite extraction — no-op in JS
}

// FUN_005cec44 — extract sprite from port (custom chroma)
export function FUN_005cec44(param_1, param_2, param_3) {
  // Sprite extraction — no-op in JS
}

// FUN_005cec80 — extract sprite from port (auto-detect chroma)
export function FUN_005cec80(param_1, param_2, param_3, param_4, param_5) {
  // Sprite extraction — no-op in JS
}

// FUN_005cedad — extract sprite from port (custom chroma, with rect)
export function FUN_005cedad(param_1, param_2, param_3, param_4, param_5, param_6) {
  // Sprite extraction — no-op in JS
}

// FUN_005cee09 — extract sprite from direct surface (default chroma)
export function FUN_005cee09(param_1, param_2) {
  // Sprite extraction — no-op in JS
}

// FUN_005cee41 — extract sprite from direct surface (with rect)
export function FUN_005cee41(param_1, param_2, param_3, param_4, param_5) {
  // Sprite extraction — no-op in JS
}

// FUN_005cee99 — extract sprite from direct surface (custom chroma)
export function FUN_005cee99(param_1, param_2, param_3) {
  // Sprite extraction — no-op in JS
}

// FUN_005ceed5 — extract sprite from direct surface (custom chroma, with rect)
export function FUN_005ceed5(param_1, param_2, param_3, param_4, param_5, param_6) {
  // Sprite extraction — no-op in JS
}

// FUN_005cef31 — draw sprite to port (default chroma)
export function FUN_005cef31(param_1, param_2, param_3, param_4) {
  FUN_005d056c(param_1, param_2, 0xffffffff, param_3, param_4);
  return param_1;
}

// FUN_005cef66 — draw sprite to port (custom chroma)
export function FUN_005cef66(param_1, param_2, param_3, param_4, param_5) {
  FUN_005d056c(param_1, param_2, param_3, param_4, param_5);
  return param_1;
}

// FUN_005cef9f — draw sprite to port mirrored (default chroma)
export function FUN_005cef9f(param_1, param_2, param_3, param_4) {
  FUN_005d080d(param_1, param_2, 0xffffffff, param_3, param_4);
  return param_1;
}

// FUN_005cefd4 — draw sprite to port mirrored (custom chroma)
export function FUN_005cefd4(param_1, param_2, param_3, param_4, param_5) {
  FUN_005d080d(param_1, param_2, param_3, param_4, param_5);
  return param_1;
}

// FUN_005cf00d — draw sprite scaled (default chroma)
export function FUN_005cf00d(param_1, param_2, param_3, param_4) {
  FUN_005d0aac(param_1, param_2, 0xffffffff, param_3, param_4);
  return param_1;
}

// FUN_005cf042 — draw sprite scaled (custom chroma)
export function FUN_005cf042(param_1, param_2, param_3, param_4, param_5) {
  FUN_005d0aac(param_1, param_2, param_3, param_4, param_5);
  return param_1;
}

// FUN_005cf07b — draw sprite scaled mirrored (default chroma)
export function FUN_005cf07b(param_1, param_2, param_3, param_4) {
  FUN_005d0dbf(param_1, param_2, 0xffffffff, param_3, param_4);
  return param_1;
}

// FUN_005cf0b0 — draw sprite scaled mirrored (custom chroma)
export function FUN_005cf0b0(param_1, param_2, param_3, param_4, param_5) {
  FUN_005d0dbf(param_1, param_2, param_3, param_4, param_5);
  return param_1;
}

// FUN_005cf0e9 — draw sprite with color remap (custom chroma)
export function FUN_005cf0e9(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_005d10cd(param_1, param_2, param_3, param_4, param_5, param_6);
  return param_1;
}

// FUN_005cf126 — draw sprite with color remap (default chroma)
export function FUN_005cf126(param_1, param_2, param_3, param_4, param_5) {
  FUN_005d10cd(param_1, param_2, 0xffffffff, param_3, param_4, param_5);
  return param_1;
}

// FUN_005cf15f — draw sprite with color remap mirrored (custom chroma)
export function FUN_005cf15f(param_1, param_2, param_3, param_4, param_5, param_6) {
  FUN_005d1372(param_1, param_2, param_3, param_4, param_5, param_6);
  return param_1;
}

// FUN_005cf19c — draw sprite with color remap mirrored (default chroma)
export function FUN_005cf19c(param_1, param_2, param_3, param_4, param_5) {
  FUN_005d1372(param_1, param_2, 0xffffffff, param_3, param_4, param_5);
  return param_1;
}

// FUN_005cf1d5 — draw sprite with auto-chroma detection
export function FUN_005cf1d5(param_1, param_2, param_3, param_4) {
  FUN_005d056c(param_1, param_2, 0xfffffffe, param_3, param_4);
  return param_1;
}

// FUN_005cf20a — draw sprite mirrored with auto-chroma
export function FUN_005cf20a(param_1, param_2, param_3, param_4) {
  FUN_005d080d(param_1, param_2, 0xfffffffe, param_3, param_4);
  return param_1;
}

// FUN_005cf23f — draw sprite to port (no offset)
export function FUN_005cf23f(param_1) {
  FUN_005d1612(0, param_1, 0, 0, 0);
}

// FUN_005cf26d — draw sprite to port (with offset)
export function FUN_005cf26d(param_1, param_2, param_3) {
  FUN_005d1612(0, param_1, 0, param_2, param_3);
}

// FUN_005cf29f — draw sprite to port clipped (no offset)
export function FUN_005cf29f(param_1) {
  FUN_005d1612(0, param_1, 1, 0, 0);
}

// FUN_005cf2cd — draw sprite to port clipped (with offset)
export function FUN_005cf2cd(param_1, param_2, param_3) {
  FUN_005d1612(0, param_1, 1, param_2, param_3);
}

// FUN_005cf2ff — lock sprite data (get pointer)
export function FUN_005cf2ff() {
  // Sprite lock — no-op in JS
}

// FUN_005cf337 — unlock sprite data
export function FUN_005cf337() {
  // Sprite unlock — no-op in JS
}

// FUN_005cf36f — check if sprite is locked
export function FUN_005cf36f() {
  return false;
}

// FUN_005cf39b — set sprite origin
export function FUN_005cf39b(param_1, param_2) {
  // Sprite origin — no-op in JS
}

// FUN_005cf3c5 — get sprite origin
export function FUN_005cf3c5(param_1, param_2) {
  // Sprite origin — no-op in JS
}

// FUN_005cf3f3 — set sprite scale factors
export function FUN_005cf3f3(param_1, param_2) {
  // Sprite scale — no-op in JS
}

// FUN_005cf439 — get sprite scale factors
export function FUN_005cf439(param_1, param_2) {
  // Sprite scale — no-op in JS
}

// FUN_005cf467 — replace pixel color in sprite
export function FUN_005cf467(param_1, param_2) {
  // Sprite pixel replace — no-op in JS
}

// FUN_005cf541 — apply palette remap to sprite
export function FUN_005cf541(param_1, param_2) {
  // Sprite palette remap — no-op in JS
}

// FUN_005cf64c — extract sprite from 8-bit port (core)
export function FUN_005cf64c(param_1, param_2, param_3) {
  return 0;
}

// FUN_005cfdeb — extract sprite from direct surface (core)
export function FUN_005cfdeb(param_1, param_2, param_3) {
  return 0;
}
