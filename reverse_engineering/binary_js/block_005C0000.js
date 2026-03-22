// ═══════════════════════════════════════════════════════════════════
// block_005C0000.js — Mechanical transpilation of block_005C0000.c
//
// IMPORTANT: Function names in comments are BEST GUESSES and may be
// wrong. Do not trust them blindly — verify against the decompiled C
// in reverse_engineering/decompiled/block_005C0000.c if in doubt.
//
// Source: reverse_engineering/decompiled/block_005C0000.c
// ═══════════════════════════════════════════════════════════════════

import { s8, u8 } from './mem.js';


// ═══════════════════════════════════════════════════════════════════
// GLOBAL VARIABLES (DAT_ references used in this block)
// ═══════════════════════════════════════════════════════════════════

let DAT_00637e5c = 0;       // PTR_DAT_00637e5c — current font pointer
let DAT_00637e58 = 0;       // current brush/fill pattern
let DAT_00637e78 = 0;       // current pen/draw color index
let DAT_00637ea4 = 0;       // saved parent window ref
let DAT_00637ea8 = -1;      // modal dialog stack index
let DAT_00637eb0 = new Array(16).fill(0); // modal dialog stack (16 entries)
let DAT_00637f98 = 1;       // scale table numerator X
let DAT_00637f9c = 1;       // scale table denominator X
let DAT_00637fa0 = 1;       // scale table numerator X (blit)
let DAT_00637fa4 = 1;       // scale table denominator X (blit)
let DAT_00637fa8 = 1;       // scale table numerator Y (blit)
let DAT_00637fac = 1;       // scale table denominator Y (blit)
let DAT_006e47c8 = 0;       // active scale table pointer
let DAT_006e47c0 = 0;       // active blit scale table X
let DAT_006e47c4 = 0;       // active blit scale table Y
let DAT_006d4700 = new Array(16).fill(0);  // scale table cache — numerators (stride 0x100c)
let DAT_006d4704 = new Array(16).fill(0);  // scale table cache — denominators (stride 0x100c)
let DAT_006d4708 = new Array(16).fill(0);  // scale table cache — timestamps (stride 0x100c)
let DAT_006d470c = [];      // scale table cache — lookup tables
let DAT_006e4ff0 = 0;       // HINSTANCE — app instance handle
let DAT_00638b48 = 0;       // palette mode flag (1 = 8-bit)
let DAT_00638b40 = 0;       // shadow color index
let DAT_00637c9c = 0;       // mouse tracking state
let DAT_00637ca0 = 0;       // mouse button down state
let DAT_00637f58 = 0;       // scrollbar class registered flag
let DAT_006d46f8 = 0;       // saved scrollbar wndproc
let DAT_006d46f4 = 0;       // scrollbar extra bytes offset
let DAT_00637f08 = 0;       // checkbox capture flag
let DAT_00637e90 = 0;       // checkbox enabled text color flag
let DAT_00637ea0 = 0;       // checkbox disabled text color flag
let DAT_00637e94 = 0;       // checkbox shadow color index
let DAT_00637e98 = 0;       // text shadow offset X
let DAT_00637e9c = 0;       // text shadow offset Y
let DAT_00637f00 = 0;       // checkbox text R (enabled)
let DAT_00637f01 = 0;       // checkbox text G (enabled)
let DAT_00637f02 = 0;       // checkbox text B (enabled)
let DAT_00637f03 = 0;       // checkbox text color set flag (enabled)
let DAT_00637f04 = 0;       // checkbox text R (disabled)
let DAT_00637f05 = 0;       // checkbox text G (disabled)
let DAT_00637f06 = 0;       // checkbox text B (disabled)
let DAT_00637f07 = 0;       // checkbox text color set flag (disabled)


// ═══════════════════════════════════════════════════════════════════
// Win32 API calls — all DEVIATION
// ═══════════════════════════════════════════════════════════════════

function SetRect() {}                               // DEVIATION: Win32
function IntersectRect() { return 0; }              // DEVIATION: Win32
function OffsetRect() {}                            // DEVIATION: Win32
function InvalidateRect() {}                        // DEVIATION: Win32
function UpdateWindow() {}                          // DEVIATION: Win32
function ValidateRect() {}                          // DEVIATION: Win32
function GetClientRect() {}                         // DEVIATION: Win32
function GetWindowRect() {}                         // DEVIATION: Win32
function SetFocus() {}                              // DEVIATION: Win32
function GetFocus() { return 0; }                   // DEVIATION: Win32
function SetCapture() {}                            // DEVIATION: Win32
function ReleaseCapture() {}                        // DEVIATION: Win32
function GetParent() { return 0; }                  // DEVIATION: Win32
function GetAsyncKeyState() { return 0; }           // DEVIATION: Win32
function CreateWindowExA() { return 0; }            // DEVIATION: Win32
function DestroyWindow() {}                         // DEVIATION: Win32
function ShowWindow() {}                            // DEVIATION: Win32
function MoveWindow() {}                            // DEVIATION: Win32
function EnableWindow() {}                          // DEVIATION: Win32
function GetWindowLongA() { return 0; }             // DEVIATION: Win32
function SetWindowLongA() {}                        // DEVIATION: Win32
function GetClassLongA() { return 0; }              // DEVIATION: Win32
function PostMessageA() {}                          // DEVIATION: Win32
function SendMessageA() { return 0; }               // DEVIATION: Win32
function DefWindowProcA() { return 0; }             // DEVIATION: Win32
function PtInRect() { return 0; }                   // DEVIATION: Win32
function MapWindowPoints() {}                       // DEVIATION: Win32
function BeginPaint() { return 0; }                 // DEVIATION: Win32
function EndPaint() {}                              // DEVIATION: Win32
function FrameRect() {}                             // DEVIATION: Win32
function FillRect() {}                              // DEVIATION: Win32
function BitBlt() {}                                // DEVIATION: Win32
function GetDC() { return 0; }                      // DEVIATION: Win32
function ReleaseDC() {}                             // DEVIATION: Win32
function CreateCompatibleDC() { return 0; }         // DEVIATION: Win32
function CreateCompatibleBitmap() { return 0; }     // DEVIATION: Win32
function DeleteDC() {}                              // DEVIATION: Win32
function DeleteObject() {}                          // DEVIATION: Win32
function SelectObject() { return 0; }               // DEVIATION: Win32
function SelectPalette() {}                         // DEVIATION: Win32
function RealizePalette() {}                        // DEVIATION: Win32
function SetBkMode() {}                             // DEVIATION: Win32
function SetTextColor() {}                          // DEVIATION: Win32
function DrawTextA() {}                             // DEVIATION: Win32
function GetTextMetricsA() {}                       // DEVIATION: Win32
function GetTextExtentPointA() {}                   // DEVIATION: Win32
function GetBitmapDimensionEx() {}                  // DEVIATION: Win32
function CreateFontIndirectA() { return 0; }        // DEVIATION: Win32
function CreatePen() { return 0; }                  // DEVIATION: Win32
function GetStockObject() { return 0; }             // DEVIATION: Win32
function MoveToEx() {}                              // DEVIATION: Win32
function LineTo() {}                                // DEVIATION: Win32
function AddFontResourceA() { return 0; }           // DEVIATION: Win32
function RemoveFontResourceA() { return 0; }        // DEVIATION: Win32
function EnumFontFamiliesA() {}                     // DEVIATION: Win32
function RegisterClassA() {}                        // DEVIATION: Win32
function LoadCursorA() { return 0; }                // DEVIATION: Win32
function LoadBitmapA() { return 0; }                // DEVIATION: Win32
function ShowScrollBar() {}                         // DEVIATION: Win32
function SetScrollRange() {}                        // DEVIATION: Win32
function SetScrollPos() {}                          // DEVIATION: Win32
function GetScrollPos() { return 0; }               // DEVIATION: Win32
function GetScrollRange() {}                        // DEVIATION: Win32
function lstrlenA() { return 0; }                   // DEVIATION: Win32
function lstrcpyA() {}                              // DEVIATION: Win32
function _atexit() {}                               // DEVIATION: CRT
function _strcmp() { return 0; }                     // DEVIATION: CRT
function _strlen(s) { return typeof s === 'string' ? s.length : 0; } // DEVIATION: CRT
function _strncpy() {}                              // DEVIATION: CRT
function _strncmp() { return 0; }                   // DEVIATION: CRT
function _rand() { return Math.floor(Math.random() * 32768); }      // DEVIATION: CRT
function __strlwr(s) { return s; }                  // DEVIATION: CRT
function operator_new(n) { return new Array(n).fill(0); }            // DEVIATION: CRT
function operator_delete() {}                       // DEVIATION: CRT
function FID_conflict__memcpy() {}                  // DEVIATION: CRT
function debug_log() {}                             // DEVIATION: debug output

// MFC class methods — DEVIATION
function COleClientItem_GetActiveView() { return 0; }
function CCheckListBox_GetCheckStyle() { return 0; }
function CSplitterWnd_IsTracking() { return 0; }
function streambuf_egptr() { return 0; }


// ═══════════════════════════════════════════════════════════════════
// Functions from OTHER blocks — DEVIATION
// ═══════════════════════════════════════════════════════════════════

function FUN_005d7c6e() {}
function FUN_005d7c00() {}
function FUN_005bd696() { return 0; }
function FUN_005bd813() {}
function FUN_005bd630() {}
function FUN_005bd65c() {}
function FUN_005bd915() {}
function FUN_005bd14c() {}
function FUN_005bd1c5() {}
function FUN_005bd4cd() { return 0; }
function FUN_005bd7db() {}
function FUN_005bf930() {}
function FUN_005bb8c0() { return 0; }
function FUN_005dae6b() {}
function FUN_005d22b7() {}
function FUN_005d2279() {}
function FUN_005d233f() {}
function FUN_005d4204() {}
function FUN_005d1b38() {}
function FUN_005d1cd0() {}
function FUN_005d1cb0() { return 0; }
function FUN_005d1ef0() { return 0; }
function FUN_005d1f20() { return 0; }
function FUN_005d056c() {}
function FUN_005d080d() {}
function FUN_005d0aac() {}
function FUN_005d0dbf() {}
function FUN_005d10cd() {}
function FUN_005d1372() {}
function FUN_005d1612() {}
function FUN_005d89e8() { return 0; }
function FUN_005d8ab8() {}
function FUN_005e3a81() { return 0; }
function FUN_005e3aa8() { return 0; }
function FUN_005e388f() { return 0; }
function FUN_005e392a() { return 0; }
function FUN_005e395a() { return 0; }
function FUN_005e3988() {}
function FUN_005e3bdc() {}
function FUN_005e3cb4() {}
function FUN_005e4b9b() {}
function FUN_005e4c3f() {}
function FUN_005e4cc8() {}
function FUN_005e4d60() {}
function FUN_005e4e60() {}
function FUN_005e4ef8() {}
function FUN_005e4f9b() {}
function FUN_005e47a5() {}
function FUN_005e49a0() {}
function FUN_005e4aa6() {}
function FUN_005e511c() {}
function FUN_005e5869() {}
function FUN_005e58e7() {}
function FUN_005e6188() { return 0; }
function FUN_005e7028() { return 0; }
function FUN_005e92c9() {}
function FUN_005ea7a0() {}
function FUN_005eabcc() {}
function FUN_005eb393() {}
function FUN_005ed710() {}
function FUN_005decb1() {}
function FUN_005dec4e() { return 0; }
function FUN_005dec8a() {}
function FUN_005deced() {}
function FUN_005ded12() {}
function FUN_005deb12() {}
function FUN_005de984() {}
function FUN_005de9e0() {}
function FUN_005dea9e() {}
function FUN_005deadb() {}
function FUN_005dce4f() { return 0; }
function FUN_005dcdf9() { return 0; }
function FUN_005dce29() { return 0; }
function FUN_005dce96() { return 0; }
function FUN_005dcef7() { return 0; }
function FUN_005dced3() {}
function FUN_005db1e0() {}
function FUN_005db1fa() { return 0; }
function FUN_005db2f8() { return 0; }
function FUN_005db531() { return 0; }
function FUN_005db54b() {}
function FUN_005db67b() {}
function FUN_005db704() {}
function FUN_005db893() {}
function FUN_005db923() {}
function FUN_005f22d0() {}
function FUN_005f7120() { return 0; }
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

// thunk functions — DEVIATION
function FUN_00407f90() { return 0; }
function FUN_00407fc0() { return 0; }
function FUN_00414d10() { return 0; }
function FUN_00418740() { return 0; }
function FUN_00418770() { return 0; }
function FUN_0040ef50() {}
function FUN_0040f810() { return 0; }
function FUN_0040fad0() {}
function FUN_00421bb0() { return 0; }
function FUN_00421c30() {}
function FUN_00421c60() {}
function FUN_00453af0() {}
function FUN_0043c520() {}
function FUN_0043c690() {}
function FUN_0044c8e0() {}
function FUN_0046f440() { return 0; }
function FUN_004bb370() {}
function FUN_004d8af0() { return 0; }
function FUN_00497c40() {}
function FUN_00511320() { return 0; }
function FUN_00579b40() {}


// ═══════════════════════════════════════════════════════════════════
// FUNCTIONS
// ═══════════════════════════════════════════════════════════════════


// FUN_005c000d — SEH destructor trampoline
export function FUN_005c000d() {
  FUN_005d7c6e();
}

// FUN_005c0023 — SEH frame restore
export function FUN_005c0023() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c0034 — set port clip rect from internal fields
export function FUN_005c0034() {
  var in_ECX = 0; // DEVIATION: this pointer
  SetRect(in_ECX + 0x14, in_ECX + 0x24, in_ECX + 0x28, in_ECX + 0x2c, in_ECX + 0x30); // DEVIATION: Win32
}

// FUN_005c0073 — set port clip rect from param, intersect with bounds
export function FUN_005c0073(param_1) {
  var in_ECX = 0; // DEVIATION: this pointer
  SetRect(in_ECX + 0x14, param_1[0], param_1[1], param_1[2], param_1[3]); // DEVIATION: Win32
  IntersectRect(in_ECX + 0x14, in_ECX + 0x14, in_ECX + 0x24); // DEVIATION: Win32
}

// FUN_005c00ce — get port clip rect into param
export function FUN_005c00ce(param_1) {
  var in_ECX = 0; // DEVIATION: this pointer
  param_1[0] = in_ECX + 0x14;
  param_1[1] = in_ECX + 0x18;
  param_1[2] = in_ECX + 0x1c;
  param_1[3] = in_ECX + 0x20;
}

// FUN_005c0105 — dispatch port allocation by type
export function FUN_005c0105(param_1) {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
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
  var in_ECX = 0; // DEVIATION: this pointer
  var local_8;
  // DEVIATION: in_ECX + 0x34 is surface pointer
  if (in_ECX + 0x34 === 0) {
    uVar1 = FUN_005e3a81(in_ECX + 0x40);
    // *(in_ECX + 0x34) = uVar1;
    if (uVar1 !== 0) {
      pvVar2 = operator_new((in_ECX + 8) << 2);
      // *(in_ECX + 0x38) = pvVar2;
      iVar3 = FUN_005e395a(in_ECX + 0x40);
      if (iVar3 === 0) {
        // bottom-up scanlines
        // **(in_ECX + 0x38) = ((in_ECX + 8) - 1) * (in_ECX + 0xc);
        for (local_8 = 1; local_8 < (in_ECX + 8); local_8 = local_8 + 1) {
          // scanline[local_8] = scanline[local_8 - 1] - stride
        }
      } else {
        // top-down scanlines
        // **(in_ECX + 0x38) = 0;
        for (local_8 = 1; local_8 < (in_ECX + 8); local_8 = local_8 + 1) {
          // scanline[local_8] = scanline[local_8 - 1] + stride
        }
      }
    }
  }
}

// FUN_005c02e0 — unlock port surface
export function FUN_005c02e0() {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  if (in_ECX + 0x34 !== 0) {
    uVar1 = FUN_005e3aa8(in_ECX + 0x40);
    // *(in_ECX + 0x34) = uVar1;
    operator_delete(in_ECX + 0x38);
  }
}

// FUN_005c0333 — fill rect with color
export function FUN_005c0333(param_1, param_2) {
  var cVar1;
  var pCVar2;
  var uVar3;
  var iVar4;
  var iVar5;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_20 = [0, 0, 0, 0];
  var local_10;
  var local_c;
  var local_8;

  local_8 = 1;
  cVar1 = FUN_005c54f0();
  if (cVar1 === 0) {
    debug_log(0); // DEVIATION: string ref
    local_8 = 0;
    FUN_005c01c1();
  }
  IntersectRect(local_20, param_1, in_ECX + 0x14); // DEVIATION: Win32
  local_c = FUN_00407f90(local_20);
  if (local_c !== 0) {
    local_10 = FUN_00407fc0(local_20);
    if (local_10 !== 0) {
      pCVar2 = COleClientItem_GetActiveView(in_ECX); // DEVIATION: MFC
      uVar3 = CCheckListBox_GetCheckStyle(in_ECX);   // DEVIATION: MFC
      iVar4 = FUN_005e395a(uVar3, pCVar2);
      iVar5 = FUN_005c55d0();
      FUN_005e4e60(in_ECX + 0x34, param_2, local_20[0], local_20[1], local_c, local_10,
                   ((-(iVar4 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar5);
    }
  }
}

// FUN_005c041f — fill entire port with color
export function FUN_005c041f(param_1) {
  var in_ECX = 0; // DEVIATION: this pointer
  FUN_005c0333(in_ECX + 0x14, param_1);
}

// FUN_005c044a — change pixels in port rect
export function FUN_005c044a(param_1, param_2) {
  var in_ECX = 0; // DEVIATION: this pointer
  FUN_005c0479(in_ECX + 0x14, param_1, param_2);
}

// FUN_005c0479 — change pixel color in rect
export function FUN_005c0479(param_1, param_2, param_3) {
  var cVar1;
  var iVar2;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_28;
  var local_24 = [0, 0, 0, 0];
  var local_14;
  var local_10;
  var local_c;
  var local_8;

  local_8 = 1;
  cVar1 = FUN_005c54f0();
  if (cVar1 === 0) {
    debug_log(0); // DEVIATION: string ref
    local_8 = 0;
    FUN_005c01c1();
  }
  IntersectRect(local_24, param_1, in_ECX + 0x14); // DEVIATION: Win32
  local_c = FUN_00407f90(local_24);
  local_28 = FUN_005c19d3(local_24[0], local_24[1]);
  local_14 = 0;
  while (true) {
    iVar2 = FUN_00407fc0(local_24);
    if (iVar2 <= local_14) break;
    local_10 = 0;
    while (true) {
      iVar2 = FUN_00407f90(local_24);
      if (iVar2 <= local_10) break;
      // DEVIATION: pixel comparison and set (*local_28 == param_2 → *local_28 = param_3)
      local_28 = local_28 + 1;
      local_10 = local_10 + 1;
    }
    iVar2 = FUN_005c5610(local_28);
    local_28 = iVar2 - local_c;
    local_14 = local_14 + 1;
  }
  if (local_8 === 0) {
    FUN_005c02e0();
  }
}

// FUN_005c0593 — blit between two 8-bit ports
export function FUN_005c0593(param_1, param_2, param_3) {
  var iVar1;
  var uVar2;
  var iVar3;
  var iVar4;
  var pCVar5;
  var pCVar6;
  var uVar7;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_30 = [0, 0, 0, 0];
  var local_20 = [0, 0, 0, 0];
  var local_10;
  var local_c;
  var local_8;

  local_10 = 1;
  iVar1 = in_ECX + 0x34;
  if (iVar1 === 0) {
    debug_log(0); // DEVIATION: string ref
    FUN_005c01c1();
  }
  if (param_1 + 0x34 === 0) {
    debug_log(0); // DEVIATION: string ref
    FUN_005c01c1();
    local_10 = 0;
  }
  IntersectRect(local_20, param_2, in_ECX + 0x14); // DEVIATION: Win32
  IntersectRect(local_30, param_3, param_1 + 0x14); // DEVIATION: Win32
  local_8 = local_30[2] - local_30[0];
  if (local_20[2] - local_20[0] <= local_30[2] - local_30[0]) {
    local_8 = local_20[2] - local_20[0];
  }
  local_c = local_30[3] - local_30[1];
  if (local_20[3] - local_20[1] <= local_30[3] - local_30[1]) {
    local_c = local_20[3] - local_20[1];
  }
  if (local_8 !== 0 && local_c !== 0) {
    uVar2 = CCheckListBox_GetCheckStyle(param_1); // DEVIATION: MFC
    iVar3 = FUN_005e395a(uVar2);
    iVar4 = FUN_005c55d0();
    iVar4 = ((-(iVar3 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar4;
    uVar2 = CCheckListBox_GetCheckStyle(in_ECX); // DEVIATION: MFC
    iVar3 = FUN_005e395a(uVar2, iVar4);
    iVar4 = FUN_005c55d0();
    iVar4 = ((-(iVar3 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar4;
    pCVar5 = COleClientItem_GetActiveView(param_1); // DEVIATION: MFC
    pCVar6 = COleClientItem_GetActiveView(in_ECX);  // DEVIATION: MFC
    uVar7 = FUN_005c5640((in_ECX + 0x44) * local_20[0], local_20[1],
                         (in_ECX + 0x44) * local_30[0], local_30[1],
                         (in_ECX + 0x44) * local_8, local_c, pCVar6, pCVar5, iVar4);
    uVar7 = FUN_005c5640(uVar7);
    FUN_005e4f9b(uVar7);
  }
  if (iVar1 === 0) {
    FUN_005c02e0();
  }
  if (local_10 === 0) {
    FUN_005c02e0();
  }
}

// FUN_005c0753 — blit from direct surface to port
export function FUN_005c0753(param_1, param_2, param_3) {
  var iVar1;
  var iVar2;
  var uVar3;
  var uVar4;
  var iVar5;
  var pCVar6;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_34 = [0, 0, 0, 0];
  var local_24 = [0, 0, 0, 0];
  var local_14;
  var local_10;
  var local_c;
  var local_8;

  local_10 = 1;
  iVar1 = in_ECX + 0x34;
  if (iVar1 === 0) {
    debug_log(0); // DEVIATION: string ref
    FUN_005c01c1();
  }
  local_14 = FUN_005e6188();
  if (local_14 !== 0) {
    local_10 = 0;
    IntersectRect(local_24, param_2, in_ECX + 0x14); // DEVIATION: Win32
    IntersectRect(local_34, param_3, param_1 + 0x10); // DEVIATION: Win32
    local_8 = local_24[2] - local_24[0];
    if (local_34[2] - local_34[0] <= local_24[2] - local_24[0]) {
      local_8 = local_34[2] - local_34[0];
    }
    local_c = local_34[3] - local_34[1];
    if (local_24[3] - local_24[1] <= local_34[3] - local_34[1]) {
      local_c = local_24[3] - local_24[1];
    }
    if (local_8 !== 0 && local_c !== 0) {
      iVar2 = FUN_005c5680();
      if (iVar2 === 0x140) {
        uVar3 = FUN_005c56a0();
        uVar4 = CCheckListBox_GetCheckStyle(in_ECX); // DEVIATION: MFC
        iVar2 = FUN_005e395a(uVar4, uVar3);
        iVar5 = FUN_005c55d0();
        uVar3 = FUN_005c5660(((-(iVar2 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar5);
        pCVar6 = COleClientItem_GetActiveView(in_ECX); // DEVIATION: MFC
        uVar3 = FUN_005c5640(local_14, local_24[0], local_24[1], local_34[0], local_34[1], local_8,
                             local_c, pCVar6, uVar3);
        FUN_005e511c(uVar3);
      } else {
        uVar3 = FUN_005c56a0();
        uVar4 = CCheckListBox_GetCheckStyle(in_ECX); // DEVIATION: MFC
        iVar2 = FUN_005e395a(uVar4, uVar3);
        iVar5 = FUN_005c55d0();
        uVar3 = FUN_005c5660(((-(iVar2 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar5);
        pCVar6 = COleClientItem_GetActiveView(in_ECX); // DEVIATION: MFC
        uVar3 = FUN_005c5640(local_14, (in_ECX + 0x44) * local_24[0], local_24[1],
                             (in_ECX + 0x44) * local_34[0], local_34[1],
                             (in_ECX + 0x44) * local_8, local_c, pCVar6, uVar3);
        FUN_005e4f9b(uVar3);
      }
    }
  }
  if (iVar1 === 0) {
    FUN_005c02e0();
  }
  if (local_10 === 0) {
    FUN_005e92c9(param_1); // _Timevec::~_Timevec(param_1)
  }
}

// FUN_005c0979 — copy port to screen (8-bit)
export function FUN_005c0979(param_1, param_2, param_3) {
  var cVar1;
  var uVar2;
  var in_ECX = 0; // DEVIATION: this pointer

  if (in_ECX + 0x40 === 0) {
    debug_log(0); // DEVIATION: string ref
  } else {
    cVar1 = FUN_005c54f0();
    if (cVar1 === 0) {
      debug_log(0); // DEVIATION: string ref
      FUN_005c01c1();
    }
    uVar2 = FUN_005bb8c0();
    FUN_005c0d12(uVar2);
    uVar2 = FUN_00414d10(param_3[0], param_3[1]);
    uVar2 = FUN_00407fc0(param_2, uVar2);
    uVar2 = FUN_00407f90(param_2, uVar2);
    update_palette_CC11(in_ECX + 0x40, param_2[0], param_2[1], uVar2); // DEVIATION: GDI
    if (cVar1 === 0) {
      FUN_005c02e0();
    }
  }
}

// FUN_005c0a55 — copy port to screen (inverse order)
export function FUN_005c0a55(param_1, param_2, param_3) {
  var cVar1;
  var uVar2;
  var in_ECX = 0; // DEVIATION: this pointer

  cVar1 = FUN_005c54f0();
  if (cVar1 === 0) {
    debug_log(0); // DEVIATION: string ref
    FUN_005c01c1();
  }
  uVar2 = FUN_005bb8c0();
  FUN_005c0d12(uVar2);
  uVar2 = FUN_00407fc0(param_3);
  uVar2 = FUN_00407f90(param_3, uVar2);
  uVar2 = FUN_00414d10(param_3[0], param_3[1], uVar2);
  uVar2 = FUN_00407fc0(param_2, uVar2);
  uVar2 = FUN_00407f90(param_2, uVar2);
  update_palette_CCE2(in_ECX + 0x40, param_2[0], param_2[1], uVar2); // DEVIATION: GDI
  if (cVar1 === 0) {
    FUN_005c02e0();
  }
}

// FUN_005c0b2c — stretched copy to screen
export function FUN_005c0b2c(param_1, param_2, param_3) {
  var cVar1;
  var uVar2;
  var uVar3;
  var uVar4;
  var in_ECX = 0; // DEVIATION: this pointer
  var uVar5;

  cVar1 = FUN_005c54f0();
  if (cVar1 === 0) {
    debug_log(0); // DEVIATION: string ref
    FUN_005c01c1();
  }
  uVar2 = FUN_00407fc0(param_3);
  uVar3 = FUN_00407f90(param_3, uVar2);
  uVar2 = param_3[1];
  uVar5 = param_3[0];
  uVar4 = CCheckListBox_GetCheckStyle(param_1); // DEVIATION: MFC
  uVar2 = FUN_00407fc0(param_2, uVar4, uVar5, uVar2, uVar3);
  uVar2 = FUN_00407f90(param_2, uVar2);
  stretch_blit_CD66(in_ECX + 0x40, param_2[0], param_2[1], uVar2); // DEVIATION: GDI
  if (cVar1 === 0) {
    FUN_005c02e0();
  }
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
    uVar2 = puVar3; // DEVIATION: would dereference *puVar3
  }
  return uVar2;
}

// FUN_005c0c5d — set pixel at (x,y)
export function FUN_005c0c5d(param_1, param_2, param_3) {
  var cVar1;
  cVar1 = FUN_005c1a00(param_1, param_2);
  if (cVar1 === 0) {
    FUN_005d22b7(0, param_1, param_2);
  } else {
    var puVar2 = FUN_005c19d3(param_1, param_2);
    // DEVIATION: *puVar2 = param_3 (pixel write)
  }
}

// FUN_005c0cc5 — update palette reference
export function FUN_005c0cc5(param_1) {
  var iVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  iVar1 = CSplitterWnd_IsTracking(param_1); // DEVIATION: MFC
  if (iVar1 !== in_ECX + 0x3c) {
    FUN_005e3bdc(in_ECX + 0x40, param_1);
    iVar1 = CSplitterWnd_IsTracking(param_1); // DEVIATION: MFC
    // *(in_ECX + 0x3c) = iVar1;
  }
}

// FUN_005c0d12 — update palette reference (null-safe)
export function FUN_005c0d12(param_1) {
  var iVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  if (param_1 !== 0) {
    iVar1 = CSplitterWnd_IsTracking(param_1); // DEVIATION: MFC
    if (iVar1 !== in_ECX + 0x3c) {
      FUN_005e3bdc(in_ECX + 0x40, param_1);
      iVar1 = CSplitterWnd_IsTracking(param_1); // DEVIATION: MFC
      // *(in_ECX + 0x3c) = iVar1;
    }
  }
}

// FUN_005c0d69 — draw text string at position
export function FUN_005c0d69(param_1, param_2, param_3, param_4) {
  var uVar1;
  var iVar2;
  var iVar3;
  var in_ECX = 0; // DEVIATION: this pointer

  if (DAT_00637e5c === 0) {
    debug_log(0); // DEVIATION: string ref
  } else if (in_ECX + 0x40 !== 0) {
    if ((param_4 & 0x10) !== 0) {
      iVar2 = gdi_847F(DAT_00637e5c);
      iVar2 = iVar2 + (iVar2 >> 0x1f & 7);
      iVar3 = iVar2 >> 3;
      uVar1 = FUN_005c19ad(DAT_00638b40);
      FUN_005e3cb4(in_ECX + 0x40, DAT_00637e5c, param_1, iVar3 + param_2, iVar3 + param_3, in_ECX + 0x14, param_4);
      FUN_005c19ad(uVar1);
    }
    FUN_005e3cb4(in_ECX + 0x40, DAT_00637e5c, param_1, param_2, param_3, in_ECX + 0x14, param_4);
  }
}

// FUN_005c0e57 — draw text string in rect
export function FUN_005c0e57(param_1, param_2, param_3) {
  var uVar1;
  var iVar2;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_14 = [0, 0, 0, 0];

  if (DAT_00637e5c === 0) {
    debug_log(0); // DEVIATION: string ref
  } else if (in_ECX + 0x40 !== 0) {
    if ((param_3 & 0x10) !== 0) {
      iVar2 = gdi_847F(DAT_00637e5c);
      iVar2 = (iVar2 + (iVar2 >> 0x1f & 7)) >> 3;
      local_14[0] = param_2[0];
      local_14[1] = param_2[1];
      local_14[2] = param_2[2];
      local_14[3] = param_2[3];
      OffsetRect(local_14, iVar2, iVar2); // DEVIATION: Win32
      uVar1 = FUN_005c19ad(DAT_00638b40);
      handle_colortable_3ECA(in_ECX + 0x40, DAT_00637e5c, param_1, local_14, param_3);
      FUN_005c19ad(uVar1);
    }
    handle_colortable_3ECA(in_ECX + 0x40, DAT_00637e5c, param_1, param_2, param_3);
  }
}

// FUN_005c0f57 — draw text with custom font at position
export function FUN_005c0f57(param_1, param_2, param_3, param_4, param_5) {
  var uVar1;
  var iVar2;
  var iVar3;
  var in_ECX = 0; // DEVIATION: this pointer

  if (in_ECX + 0x40 !== 0) {
    if ((param_5 & 0x10) !== 0) {
      iVar2 = gdi_847F(param_1[0]);
      iVar2 = iVar2 + (iVar2 >> 0x1f & 7);
      iVar3 = iVar2 >> 3;
      uVar1 = FUN_005c19ad(DAT_00638b40);
      FUN_005e3cb4(in_ECX + 0x40, param_1[0], param_2, param_3 + iVar3, param_4 + iVar3, in_ECX + 0x14, param_5);
      FUN_005c19ad(uVar1);
    }
    FUN_005e3cb4(in_ECX + 0x40, param_1[0], param_2, param_3, param_4, in_ECX + 0x14, param_5);
  }
}

// FUN_005c1020 — draw text with custom font in rect
export function FUN_005c1020(param_1, param_2, param_3, param_4) {
  var uVar1;
  var iVar2;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_14 = [0, 0, 0, 0];

  if (in_ECX + 0x40 !== 0) {
    if ((param_4 & 0x10) !== 0) {
      iVar2 = gdi_847F(param_1[0]);
      iVar2 = (iVar2 + (iVar2 >> 0x1f & 7)) >> 3;
      local_14[0] = param_3[0];
      local_14[1] = param_3[1];
      local_14[2] = param_3[2];
      local_14[3] = param_3[3];
      OffsetRect(local_14, iVar2, iVar2); // DEVIATION: Win32
      uVar1 = FUN_005c19ad(DAT_00638b40);
      handle_colortable_3ECA(in_ECX + 0x40, param_1[0], param_2, local_14, param_4);
      FUN_005c19ad(uVar1);
    }
    handle_colortable_3ECA(in_ECX + 0x40, param_1[0], param_2, param_3, param_4);
  }
}

// FUN_005c10fb — measure text width
export function FUN_005c10fb(param_1, param_2, param_3) {
  var in_ECX = 0; // DEVIATION: this pointer
  if (DAT_00637e5c === 0) {
    debug_log(0); // DEVIATION: string ref
  } else if (in_ECX + 0x40 !== 0) {
    handle_colortable_3FEB(in_ECX + 0x40, DAT_00637e5c, param_1, param_2, param_3);
  }
}

// FUN_005c1167 — measure text width with custom font
export function FUN_005c1167(param_1, param_2, param_3, param_4) {
  var in_ECX = 0; // DEVIATION: this pointer
  if (in_ECX + 0x40 !== 0) {
    handle_colortable_3FEB(in_ECX + 0x40, param_1[0], param_2, param_3, param_4);
  }
}

// FUN_005c11b2 — draw line in port
export function FUN_005c11b2(param_1, param_2, param_3, param_4) {
  var uVar1;
  var iVar2;
  var iVar3;
  var pCVar4;
  var uVar5;
  var in_ECX = 0; // DEVIATION: this pointer

  if (((((in_ECX + 0x14 <= param_1 || in_ECX + 0x14 <= param_3) &&
        (param_3 < in_ECX + 0x1c || param_1 < in_ECX + 0x1c)) &&
       (in_ECX + 0x18 <= param_2 || in_ECX + 0x18 <= param_4)) &&
      (param_2 < in_ECX + 0x20 || param_4 < in_ECX + 0x20)) &&
     in_ECX + 0x40 !== 0) {
    if (param_4 === param_2) {
      // horizontal line
      if (param_1 < in_ECX + 0x14) { param_1 = in_ECX + 0x14; }
      if (in_ECX + 0x1c <= param_1) { param_1 = in_ECX + 0x1c - 1; }
      if (param_3 < in_ECX + 0x14) { param_3 = in_ECX + 0x14; }
      if (in_ECX + 0x1c <= param_3) { param_3 = in_ECX + 0x1c - 1; }
      if (param_3 !== param_1) {
        uVar1 = CCheckListBox_GetCheckStyle(in_ECX); // DEVIATION: MFC
        iVar2 = FUN_005e395a(uVar1);
        iVar3 = FUN_005c55d0();
        iVar3 = ((-(iVar2 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar3;
        pCVar4 = COleClientItem_GetActiveView(in_ECX); // DEVIATION: MFC
        iVar2 = param_3;
        if (param_1 <= param_3) { iVar2 = param_1; }
        iVar2 = FUN_005f7120(param_3 - param_1, iVar2, param_2, pCVar4, iVar3);
        uVar5 = FUN_005c5640(DAT_00637e78, iVar2 + 1);
        FUN_005e5869(uVar5);
      }
    } else if (param_3 === param_1) {
      // vertical line
      if (param_2 < in_ECX + 0x18) { param_2 = in_ECX + 0x18; }
      if (in_ECX + 0x20 <= param_2) { param_2 = in_ECX + 0x20 - 1; }
      if (param_4 < in_ECX + 0x18) { param_4 = in_ECX + 0x18; }
      if (in_ECX + 0x20 <= param_4) { param_4 = in_ECX + 0x20 - 1; }
      if (param_4 !== param_2) {
        uVar1 = CCheckListBox_GetCheckStyle(in_ECX); // DEVIATION: MFC
        iVar2 = FUN_005e395a(uVar1);
        iVar3 = FUN_005c55d0();
        iVar3 = ((-(iVar2 === 0 ? 1 : 0) & 0xfffffffe) + 1) * iVar3;
        pCVar4 = COleClientItem_GetActiveView(in_ECX); // DEVIATION: MFC
        iVar2 = param_4;
        if (param_2 <= param_4) { iVar2 = param_2; }
        iVar2 = FUN_005f7120(param_4 - param_2, param_1, iVar2, pCVar4, iVar3);
        uVar5 = FUN_005c5640(DAT_00637e78, iVar2 + 1);
        FUN_005e58e7(uVar5);
      }
    } else {
      // diagonal line
      handle_colortable_40FB(in_ECX + 0x40, param_1, param_2, param_3, param_4);
    }
  }
}

// FUN_005c145d — draw rect outline (4 lines)
export function FUN_005c145d(param_1) {
  var in_ECX = 0; // DEVIATION: this pointer
  if (in_ECX + 0x40 !== 0) {
    FUN_005c11b2(param_1[0], param_1[1], param_1[2], param_1[1]);
    FUN_005c11b2(param_1[2], param_1[1], param_1[2], param_1[3]);
    FUN_005c11b2(param_1[2], param_1[3], param_1[0], param_1[3]);
    FUN_005c11b2(param_1[0], param_1[3], param_1[0], param_1[1]);
  }
}

// FUN_005c1513 — draw 3D raised rect (8-bit)
export function FUN_005c1513(param_1) {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer

  uVar1 = DAT_00637e78;
  if (in_ECX + 0x40 !== 0) {
    if (in_ECX + 0x44 === 1) {
      FUN_005c19ad(0xef);
      FUN_005c145d(param_1);
      FUN_005c19ad(0xff);
      handle_colortable_40FB(in_ECX + 0x40, param_1[0] + 1, param_1[1] + 1, param_1[2] - 1, param_1[1] + 1);
      handle_colortable_40FB(in_ECX + 0x40, param_1[0] + 1, param_1[3] - 1, param_1[0] + 1, param_1[1] + 1);
      FUN_005c19ad(0xf7);
      handle_colortable_40FB(in_ECX + 0x40, param_1[2] - 1, param_1[1] + 1, param_1[2] - 1, param_1[3] - 1);
      handle_colortable_40FB(in_ECX + 0x40, param_1[2] - 1, param_1[3] - 1, param_1[0] + 1, param_1[3] - 1);
      FUN_005c19ad(uVar1);
    } else {
      FUN_005c52dd(param_1, 0, 0, 0);
      FUN_005e4b9b(in_ECX + 0x40, param_1[0] + 1, param_1[1] + 1, param_1[2] - 1, param_1[1] + 1, 0xff, 0xff, 0xff);
      FUN_005e4b9b(in_ECX + 0x40, param_1[0] + 1, param_1[3] - 1, param_1[0] + 1, param_1[1] + 1, 0xff, 0xff, 0xff);
      FUN_005e4b9b(in_ECX + 0x40, param_1[2] - 1, param_1[1] + 1, param_1[2] - 1, param_1[3] - 1, 0x40, 0x40, 0x40);
      FUN_005e4b9b(in_ECX + 0x40, param_1[2] - 1, param_1[3] - 1, param_1[0] + 1, param_1[3] - 1, 0x40, 0x40, 0x40);
    }
  }
}

// FUN_005c1742 — draw 3D sunken rect (8-bit)
export function FUN_005c1742(param_1) {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer

  uVar1 = DAT_00637e78;
  if (in_ECX + 0x40 !== 0) {
    if (in_ECX + 0x44 === 1) {
      FUN_005c19ad(DAT_00638b40);
      FUN_005c145d(param_1);
      FUN_005c19ad(0xf7);
      handle_colortable_40FB(in_ECX + 0x40, param_1[0] + 1, param_1[1] + 1, param_1[2] - 1, param_1[1] + 1);
      handle_colortable_40FB(in_ECX + 0x40, param_1[0] + 1, param_1[3] - 1, param_1[0] + 1, param_1[1] + 1);
      FUN_005c19ad(0xff);
      handle_colortable_40FB(in_ECX + 0x40, param_1[2] - 1, param_1[1] + 1, param_1[2] - 1, param_1[3] - 1);
      handle_colortable_40FB(in_ECX + 0x40, param_1[2] - 1, param_1[3] - 1, param_1[0] + 1, param_1[3] - 1);
      FUN_005c19ad(uVar1);
    } else {
      FUN_005c52dd(param_1, 0, 0, 0);
      FUN_005e4b9b(in_ECX + 0x40, param_1[0] + 1, param_1[1] + 1, param_1[2] - 1, param_1[1] + 1, 0x40, 0x40, 0x40);
      FUN_005e4b9b(in_ECX + 0x40, param_1[0] + 1, param_1[3] - 1, param_1[0] + 1, param_1[1] + 1, 0x40, 0x40, 0x40);
      FUN_005e4b9b(in_ECX + 0x40, param_1[2] - 1, param_1[1] + 1, param_1[2] - 1, param_1[3] - 1, 0xff, 0xff, 0xff);
      FUN_005e4b9b(in_ECX + 0x40, param_1[2] - 1, param_1[3] - 1, param_1[0] + 1, param_1[3] - 1, 0xff, 0xff, 0xff);
    }
  }
}

// FUN_005c1972 — set current brush, return old
export function FUN_005c1972(param_1) {
  var uVar1 = DAT_00637e58;
  DAT_00637e58 = param_1;
  return uVar1;
}

// FUN_005c1998 — get current brush
export function FUN_005c1998() {
  return DAT_00637e58;
}

// FUN_005c19ad — set current pen color, return old
export function FUN_005c19ad(param_1) {
  var uVar1 = DAT_00637e78;
  DAT_00637e78 = param_1;
  return uVar1;
}

// FUN_005c19d3 — compute pixel address from (x,y)
export function FUN_005c19d3(param_1, param_2) {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(*(in_ECX + 0x38) + param_2 * 4) + *(in_ECX + 0x34) + param_1
  return 0;
}

// FUN_005c1a00 — test if (x,y) is within clip rect
export function FUN_005c1a00(param_1, param_2) {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  if (param_1 < in_ECX + 0x14 || in_ECX + 0x1c <= param_1 ||
      param_2 < in_ECX + 0x18 || in_ECX + 0x20 <= param_2) {
    uVar1 = 0;
  } else {
    uVar1 = 1;
  }
  return uVar1;
}

// FUN_005c1a62 — apply palette remap to port pixels
export function FUN_005c1a62(param_1, param_2) {
  var in_ECX = 0; // DEVIATION: this pointer
  var local_10;
  var local_c;
  var local_8;
  // DEVIATION: pixel-level palette remap on surface buffer
  if (in_ECX + 0x34 !== 0) {
    local_10 = in_ECX + 0x34;
    for (local_8 = 0; local_8 < in_ECX + 8; local_8 = local_8 + 1) {
      for (local_c = 0; local_c < in_ECX + 4; local_c = local_c + 1) {
        // DEVIATION: remap pixel through lookup table
        local_10 = local_10 + 1;
      }
      local_10 = local_10 + ((in_ECX + 0xc) - (in_ECX + 4));
    }
  }
}

// FUN_005c1b0d — create DIB port with width/height
export function FUN_005c1b0d(param_1, param_2) {
  var local_14 = [0, 0, 0, 0];
  SetRect(local_14, 0, 0, param_1, param_2); // DEVIATION: Win32
  FUN_005c1b47(local_14);
}

// FUN_005c1b47 — allocate DIB port (type 2)
export function FUN_005c1b47(param_1) {
  var cVar1;
  var uVar2;
  var iVar3;
  var in_ECX = 0; // DEVIATION: this pointer

  if (in_ECX + 0x40 !== 0) {
    cVar1 = FUN_005c54f0();
    if (cVar1 !== 0) {
      FUN_005c02e0();
    }
    uVar2 = FUN_005e388f(in_ECX + 0x40);
    // *(in_ECX + 0x40) = uVar2;
  }
  if (param_1 !== 0) {
    iVar3 = FUN_00407f90(param_1);
    if (iVar3 !== 0) {
      iVar3 = FUN_00407fc0(param_1);
      if (iVar3 !== 0) {
        FUN_005bd813(param_1);
        uVar2 = create_dib_41BA(in_ECX + 0x24);
        // *(in_ECX + 0x40) = uVar2;
        if (uVar2 !== 0) {
          uVar2 = FUN_005e392a(in_ECX + 0x40);
          // *(in_ECX + 0xc) = uVar2;
          iVar3 = FUN_005e395a(in_ECX + 0x40);
          if (iVar3 === 0) {
            // *(in_ECX + 0x10) = -(in_ECX + 0xc);
          } else {
            // *(in_ECX + 0x10) = (in_ECX + 0xc);
          }
          // *(in_ECX + 0x44) = 2;
          FUN_005c01c1();
          return 1;
        }
        FUN_005dae6b(2, 0, 0, 0x86c);
        return 0;
      }
    }
  }
  FUN_005bd813(0);
  return 1;
}

// FUN_005c1c99 — wrapper for FUN_005c1b47
export function FUN_005c1c99(param_1) {
  return FUN_005c1b47(param_1);
}

// FUN_005c1cbd — create 16-bit DIB port with width/height
export function FUN_005c1cbd(param_1, param_2) {
  var local_14 = [0, 0, 0, 0];
  SetRect(local_14, 0, 0, param_1, param_2); // DEVIATION: Win32
  FUN_005c1cf7(local_14);
}

// FUN_005c1cf7 — allocate 16-bit DIB port (type 3)
export function FUN_005c1cf7(param_1) {
  var cVar1;
  var uVar2;
  var iVar3;
  var in_ECX = 0; // DEVIATION: this pointer

  if (in_ECX + 0x40 !== 0) {
    cVar1 = FUN_005c54f0();
    if (cVar1 !== 0) {
      FUN_005c02e0();
    }
    uVar2 = FUN_005e388f(in_ECX + 0x40);
  }
  if (param_1 !== 0) {
    iVar3 = FUN_00407f90(param_1);
    if (iVar3 !== 0) {
      iVar3 = FUN_00407fc0(param_1);
      if (iVar3 !== 0) {
        FUN_005bd813(param_1);
        uVar2 = create_dib_43C5(in_ECX + 0x24);
        if (uVar2 !== 0) {
          uVar2 = FUN_005e392a(in_ECX + 0x40);
          iVar3 = FUN_005e395a(in_ECX + 0x40);
          // *(in_ECX + 0x44) = 3;
          FUN_005c01c1();
          return 1;
        }
        FUN_005dae6b(2, 0, 0, 0x8a1);
        return 0;
      }
    }
  }
  FUN_005bd813(0);
  return 1;
}

// FUN_005c1e49 — wrapper for FUN_005c1cf7
export function FUN_005c1e49(param_1) {
  return FUN_005c1cf7(param_1);
}

// FUN_005c1e6d — create 24-bit DIB port with width/height
export function FUN_005c1e6d(param_1, param_2) {
  var local_14 = [0, 0, 0, 0];
  SetRect(local_14, 0, 0, param_1, param_2); // DEVIATION: Win32
  FUN_005c1ea7(local_14);
}

// FUN_005c1ea7 — allocate 24-bit DIB port (type 4)
export function FUN_005c1ea7(param_1) {
  var cVar1;
  var uVar2;
  var iVar3;
  var in_ECX = 0; // DEVIATION: this pointer

  if (in_ECX + 0x40 !== 0) {
    cVar1 = FUN_005c54f0();
    if (cVar1 !== 0) {
      FUN_005c02e0();
    }
    uVar2 = FUN_005e388f(in_ECX + 0x40);
  }
  if (param_1 !== 0) {
    iVar3 = FUN_00407f90(param_1);
    if (iVar3 !== 0) {
      iVar3 = FUN_00407fc0(param_1);
      if (iVar3 !== 0) {
        FUN_005bd813(param_1);
        uVar2 = create_dib_45B5(in_ECX + 0x24);
        if (uVar2 !== 0) {
          uVar2 = FUN_005e392a(in_ECX + 0x40);
          iVar3 = FUN_005e395a(in_ECX + 0x40);
          // *(in_ECX + 0x44) = 4;
          FUN_005c01c1();
          return 1;
        }
        FUN_005dae6b(2, 0, 0, 0x8d6);
        return 0;
      }
    }
  }
  FUN_005bd813(0);
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
  // DEVIATION: TGA resource loading — all Win32 API
  var iVar3;
  var in_ECX = 0;
  var local_24 = FUN_005c5540([0x54, 0x41, 0x52, 0x47], param_1);
  if (local_24 === 0) {
    FUN_005d2279(0, param_1);
    FUN_005dae6b(3, 0, 0, 0x905);
    return 0;
  }
  var local_c = FUN_005c5560(local_24);
  // DEVIATION: TGA parsing, pixel format conversion, all in surface buffers
  FUN_005c5580(local_24);
  FUN_005c5520(local_24);
  return 1;
}

// FUN_005c2360 — load TGA from file into 16-bit port
export function FUN_005c2360(param_1) {
  // DEVIATION: TGA file loading — all Win32 file I/O and surface operations
  FUN_005d7c00();
  var iVar3 = FUN_005deced(param_1); // Realloc
  if (iVar3 === 0) {
    debug_log(0);
    FUN_005dae6b(3, 0, 0, 0x965);
    FUN_005c2786();
    FUN_005c279c();
    return;
  }
  FUN_005c5470();
  // DEVIATION: TGA parsing
  FUN_005c54a0();
  FUN_00421c30();
  FUN_005c2786();
  FUN_005c279c();
}

// FUN_005c2786 — SEH destructor trampoline
export function FUN_005c2786() {
  FUN_005d7c6e();
}

// FUN_005c279c — SEH frame restore
export function FUN_005c279c() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c27ad — load BMP from resource into 16-bit port
export function FUN_005c27ad(param_1) {
  // DEVIATION: BMP resource loading — all Win32 GDI
  var local_24 = FUN_005db2f8(param_1);
  if (local_24 === 0) {
    FUN_005d2279(0, param_1);
    FUN_005dae6b(3, 0, 0, 0x9c7);
    return 0;
  }
  var local_c = FUN_005c5560(local_24);
  // DEVIATION: BMP parsing, palette/pixel conversion
  FUN_005c5580(local_24);
  FUN_005c5520(local_24);
  return 1;
}

// FUN_005c2a77 — load BMP from file into 16-bit port
export function FUN_005c2a77(param_1) {
  // DEVIATION: BMP file loading — all Win32 file I/O
  FUN_005d7c00();
  var iVar3 = FUN_005deced(param_1);
  if (iVar3 === 0) {
    debug_log(0);
    FUN_005dae6b(3, 0, 0, 0xa0a);
    FUN_005c2e37();
    FUN_005c2e4d();
    return;
  }
  FUN_005c5470();
  // DEVIATION: BMP parsing
  FUN_005c54a0();
  FUN_00421c30();
  FUN_005c2e37();
  FUN_005c2e4d();
}

// FUN_005c2e37 — SEH destructor trampoline
export function FUN_005c2e37() {
  FUN_005d7c6e();
}

// FUN_005c2e4d — SEH frame restore
export function FUN_005c2e4d() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c2e5e — load GIF from resource into 16-bit port
export function FUN_005c2e5e(param_1) {
  // DEVIATION: GIF resource loading — all Win32 GDI
  return 0;
}

// FUN_005c3313 — load GIF from file into 16-bit port
export function FUN_005c3313(param_1) {
  // DEVIATION: GIF file loading — all Win32 file I/O
}

// FUN_005c384d — SEH destructor trampoline
export function FUN_005c384d() {
  FUN_005d7c6e();
}

// FUN_005c3863 — SEH frame restore
export function FUN_005c3863() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c3874 — load CvPic from resource into 16-bit port
export function FUN_005c3874(param_1) {
  // DEVIATION: CvPic resource loading
  return 0;
}

// FUN_005c3b7a — load CvPic from file into 16-bit port
export function FUN_005c3b7a(param_1) {
  // DEVIATION: CvPic file loading
}

// FUN_005c3ed5 — SEH destructor trampoline
export function FUN_005c3ed5() {
  FUN_005d7c6e();
}

// FUN_005c3eeb — SEH frame restore
export function FUN_005c3eeb() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c3efc — load BMP from resource into 24-bit port
export function FUN_005c3efc(param_1) {
  // DEVIATION: BMP resource loading (24-bit) — all Win32 GDI
  return 0;
}

// FUN_005c40b6 — load BMP from file into 24-bit port
export function FUN_005c40b6(param_1) {
  // DEVIATION: BMP file loading (24-bit) — all Win32 file I/O
}

// FUN_005c434e — SEH destructor trampoline
export function FUN_005c434e() {
  FUN_005d7c6e();
}

// FUN_005c4364 — SEH frame restore
export function FUN_005c4364() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c4375 — load TGA from resource into 24-bit port
export function FUN_005c4375(param_1) {
  // DEVIATION: TGA resource loading (24-bit)
  return 0;
}

// FUN_005c463f — load TGA from file into 24-bit port
export function FUN_005c463f(param_1) {
  // DEVIATION: TGA file loading (24-bit)
}

// FUN_005c4a00 — SEH destructor trampoline
export function FUN_005c4a00() {
  FUN_005d7c6e();
}

// FUN_005c4a16 — SEH frame restore
export function FUN_005c4a16() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c4a27 — fill rect with RGB color (24-bit port)
export function FUN_005c4a27(param_1, param_2, param_3, param_4) {
  // DEVIATION: 24-bit pixel fill on surface buffer
}

// FUN_005c4b4c — fill entire 24-bit port with RGB
export function FUN_005c4b4c(param_1, param_2, param_3) {
  var in_ECX = 0; // DEVIATION: this pointer
  FUN_005c4a27(in_ECX + 0x14, param_1, param_2, param_3);
}

// FUN_005c4b7f — blit between two ports (24-bit dest)
export function FUN_005c4b7f(param_1, param_2, param_3) {
  // DEVIATION: 24-bit port-to-port blit
}

// FUN_005c4c46 — blit from direct surface to 24-bit port
export function FUN_005c4c46(param_1, param_2, param_3) {
  // DEVIATION: surface-to-24bit-port blit
}

// FUN_005c4d0d — copy 24-bit port to screen (stretch)
export function FUN_005c4d0d(param_1, param_2, param_3) {
  // DEVIATION: 24-bit screen blit
}

// FUN_005c4dd3 — draw text with shadow (24-bit)
export function FUN_005c4dd3(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: 24-bit text rendering
}

// FUN_005c4eb6 — draw text in rect (24-bit)
export function FUN_005c4eb6(param_1, param_2, param_3) {
  // DEVIATION: 24-bit text rendering in rect
}

// FUN_005c4f9f — draw text with custom font (24-bit)
export function FUN_005c4f9f(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: 24-bit text rendering with custom font
}

// FUN_005c505d — draw text with custom font in rect (24-bit)
export function FUN_005c505d(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: 24-bit text rendering with custom font in rect
}

// FUN_005c512d — measure text with font (24-bit)
export function FUN_005c512d(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: 24-bit text measurement
}

// FUN_005c51a5 — measure text with custom font (24-bit)
export function FUN_005c51a5(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: 24-bit text measurement with custom font
}

// FUN_005c51fc — draw 24-bit line
export function FUN_005c51fc(param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  // DEVIATION: 24-bit line drawing
}

// FUN_005c52dd — draw 24-bit rect outline (4 lines)
export function FUN_005c52dd(param_1, param_2, param_3, param_4) {
  // DEVIATION: 24-bit rect outline drawing
}

// FUN_005c53c3 — set palette from port data
export function FUN_005c53c3(param_1, param_2, param_3) {
  // DEVIATION: palette set from port data
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
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x34) != 0
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
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0xc)
  return 0;
}

// GetCheckStyle — get port DIB handle (MFC misidentification)
export function GetCheckStyle() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x40)
  return 0;
}

// FUN_005c5610 — advance pointer by scanline stride
export function FUN_005c5610(param_1) {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return param_1 + *(in_ECX + 0x10)
  return param_1;
}

// FUN_005c5640 — get port surface pointer
export function FUN_005c5640() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x34)
  return 0;
}

// FUN_005c5660 — get port width
export function FUN_005c5660() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 4)
  return 0;
}

// FUN_005c5680 — get port height
export function FUN_005c5680() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 8)
  return 0;
}

// FUN_005c56a0 — get port scanline stride (accessor)
export function FUN_005c56a0() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0xc)
  return 0;
}

// ~_Timevec — destructor (release direct surface)
export function _Timevec_destructor(param_1) {
  FUN_005e92c9(param_1);
}

// IsTracking — get palette handle (MFC misidentification)
export function IsTracking() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x3c)
  return 0;
}

// FUN_005c5710 — retreat pointer by scanline stride
export function FUN_005c5710(param_1) {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return param_1 - *(in_ECX + 0x10)
  return param_1;
}

// FUN_005c5740 — get direct surface base pointer
export function FUN_005c5740() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x38)
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
  var in_ECX = 0; // DEVIATION: this pointer
  var local_8;
  // DEVIATION: linked list traversal on in_ECX + 0xb8
  local_8 = in_ECX + 0xb8;
  if (local_8 === 0) {
    // *(in_ECX + 0xb8) = param_1;
  } else {
    // traverse to end, append param_1
  }
}

// FUN_005c5a27 — remove control from linked list by ID
export function FUN_005c5a27(param_1) {
  var iVar1;
  var uVar2;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_8;

  if (in_ECX + 0xb8 !== 0) {
    local_8 = in_ECX + 0xb8;
    iVar1 = FUN_00418740();
    if (iVar1 === param_1) {
      // *(in_ECX + 0xb8) = *(local_8 + 0x20);
    } else {
      while (true) {
        if (local_8 === 0) return;
        iVar1 = FUN_005c5e80();
        if (iVar1 === 0) return;
        FUN_005c5e80();
        iVar1 = FUN_00418740();
        if (iVar1 === param_1) break;
        local_8 = FUN_005c5e80();
      }
      FUN_005c5e80();
      uVar2 = FUN_005c5e80();
      // *(local_8 + 0x20) = uVar2;
    }
  }
}

// FUN_005c5aeb — clear all controls from linked list
export function FUN_005c5aeb() {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_8;

  for (local_8 = in_ECX + 0xb8; local_8 !== 0; /* local_8 = *(local_8 + 0x20) */) {
    uVar1 = FUN_00418740();
    FUN_005c5a27(uVar1);
    break; // DEVIATION: would continue linked list traversal
  }
}

// FUN_005c5b36 — invalidate all controls
export function FUN_005c5b36() {
  // DEVIATION: linked list traversal + InvalidateRect on each control
  var in_ECX = 0;
  var local_8;
  for (local_8 = in_ECX + 0xb8; local_8 !== 0; /* local_8 = *(local_8 + 0x20) */) {
    InvalidateRect(); // DEVIATION: Win32
    break;
  }
}

// FUN_005c5b7f — find first visible control and repaint
export function FUN_005c5b7f() {
  // DEVIATION: linked list traversal + repaint
}

// FUN_005c5c2d — find first visible control
export function FUN_005c5c2d() {
  // DEVIATION: linked list traversal
  return 0;
}

// FUN_005c5c86 — find control by name (hotkey lookup)
export function FUN_005c5c86(param_1) {
  // DEVIATION: linked list traversal + string comparison
  return 0;
}

// FUN_005c5e60 — get control type
export function FUN_005c5e60() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x24)
  return 0;
}

// FUN_005c5e80 — get next control in linked list
export function FUN_005c5e80() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x20)
  return 0;
}

// FUN_005c5ea0 — get control visible flag
export function FUN_005c5ea0() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x1c)
  return 0;
}

// FUN_005c5ec0 — get control enabled flag
export function FUN_005c5ec0() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x18)
  return 0;
}

// FUN_005c5ee0 — get control data pointer
export function FUN_005c5ee0() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 4)
  return 0;
}

// FUN_005c5f00 — get control item count
export function FUN_005c5f00() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 8)
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
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_c;
  var local_8;

  if (DAT_00637ea8 !== 0xf) {
    // *(in_ECX + 0x8c) = 1;
    DAT_00637ea8 = DAT_00637ea8 + 1;
    DAT_00637eb0[DAT_00637ea8] = in_ECX;
    if (DAT_00637ea8 === 0) {
      local_8 = 0;
    } else {
      local_8 = FUN_00414d10();
    }
    uVar1 = FUN_00414d10(local_8);
    FUN_005bd14c(uVar1);
    while (in_ECX + 0x8c !== 0) {
      FUN_0040ef50();
      // DEVIATION: callback dispatch *(in_ECX + 0xa4)
      break; // DEVIATION: would loop until dialog dismissed
    }
    if (DAT_00637ea8 === 0) {
      local_c = 0;
    } else {
      local_c = FUN_00414d10();
    }
    uVar1 = FUN_00414d10(local_c);
    FUN_005bd1c5(uVar1);
    DAT_00637ea8 = DAT_00637ea8 - 1;
    if (DAT_00637ea8 >= 0) {
      // *(in_ECX + 0x8c) = 1;
    }
  }
}

// InvalidateObjectCache — dismiss modal dialog
export function InvalidateObjectCache() {
  var in_ECX = 0; // DEVIATION: this pointer (CRichEditDoc *)
  // *(in_ECX + 0x8c) = 0;
}

// FUN_005c62ee — get saved parent window ref
export function FUN_005c62ee() {
  return DAT_00637ea4;
}

// FUN_005c6303 — set saved parent window ref, return old
export function FUN_005c6303(param_1) {
  var uVar1 = DAT_00637ea4;
  DAT_00637ea4 = param_1;
  return uVar1;
}

// FUN_005c6329 — set horizontal scroll position
export function FUN_005c6329(param_1) {
  var in_ECX = 0; // DEVIATION: this pointer
  var local_c = [0];
  var local_8 = [0];
  FUN_005c6400(local_c, local_8);
  if (param_1 <= local_8[0] - local_c[0]) {
    // *(in_ECX + 0x90) = param_1;
  }
}

// FUN_005c636c — set vertical scroll position
export function FUN_005c636c(param_1) {
  var in_ECX = 0; // DEVIATION: this pointer
  var local_c = [0];
  var local_8 = [0];
  FUN_005c6440(local_c, local_8);
  if (param_1 <= local_8[0] - local_c[0]) {
    // *(in_ECX + 0x94) = param_1;
  }
}

// FUN_005c63af — invoke callback if set
export function FUN_005c63af(param_1) {
  var in_ECX = 0; // DEVIATION: this pointer
  var bVar1 = (in_ECX + 0xa0) !== 0;
  if (bVar1) {
    // DEVIATION: callback dispatch (*(in_ECX + 0xa0))(param_1)
  }
  return bVar1;
}

// FUN_005c6400 — get horizontal scroll range
export function FUN_005c6400(param_1, param_2) {
  var uVar1 = FUN_00414d10(param_1, param_2, 0);
  FUN_005cd5c3(uVar1);
}

// FUN_005c6440 — get vertical scroll range
export function FUN_005c6440(param_1, param_2) {
  var uVar1 = FUN_00414d10(param_1, param_2, 1);
  FUN_005cd5c3(uVar1);
}

// FUN_005c6480 — flush palette changes to hardware
export function FUN_005c6480() {
  FUN_005decb1();
  FUN_005c6a42();
}

// FUN_005c64da — initialize palette manager
export function FUN_005c64da() {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  gdi_E780();
  uVar1 = FUN_005dec4e(in_ECX);
  // *(in_ECX + 0x404) = uVar1;
  FUN_005c6a42();
  // *(in_ECX + 0x424) = 0;
  // *(in_ECX + 0x425) = 0;
  // *(in_ECX + 0x426) = 0;
  // *(in_ECX + 0x430) = 0;
  // *(in_ECX + 0x42c) = 0;
  // *(in_ECX + 0x428) = 0;
  return in_ECX;
}

// FUN_005c656b — destroy palette manager
export function FUN_005c656b() {
  var in_ECX = 0; // DEVIATION: this pointer
  FUN_005dec8a(in_ECX + 0x404);
  if (in_ECX + 0x428 !== 0) {
    FUN_005dce96(in_ECX + 0x428);
  }
  if (in_ECX + 0x42c !== 0) {
    FUN_005dce96(in_ECX + 0x42c);
  }
  if (in_ECX + 0x430 !== 0) {
    FUN_005dce96(in_ECX + 0x430);
  }
}

// FUN_005c65f9 — load color table from resource
export function FUN_005c65f9(param_1) {
  var iVar1;
  var puVar2;
  var uVar3;
  var uVar4;

  iVar1 = FUN_005c5540([0x43, 0x54, 0x41, 0x42], param_1);
  if (iVar1 === 0) {
    FUN_005d233f(0, param_1);
  } else {
    puVar2 = FUN_005c5560(iVar1);
    uVar3 = FUN_005c54d0(puVar2[0]);
    uVar4 = FUN_005c54d0(puVar2[1]);
    FUN_005c6da8(uVar3, uVar4, puVar2 + 2);
    FUN_005c5580(iVar1);
    FUN_005c5520(iVar1);
  }
}

// FUN_005c66b9 — load color table from resource (with range)
export function FUN_005c66b9(param_1, param_2, param_3) {
  var iVar1;
  var iVar2;

  iVar1 = FUN_005c5540([0x43, 0x54, 0x41, 0x42], param_1);
  if (iVar1 === 0) {
    FUN_005d233f(0, param_1);
  } else {
    iVar2 = FUN_005c5560(iVar1);
    FUN_005c6da8(param_2, param_3, iVar2 + 8);
    FUN_005c5580(iVar1);
    FUN_005c5520(iVar1);
  }
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
  // DEVIATION: file I/O — save palette to file
  FUN_005d7c00();
  var uVar1 = FUN_005dce4f(param_3 * 3);
  var uVar2 = FUN_005dcdf9(uVar1);
  FUN_005ded12(0, uVar2, param_2, param_3);
  var iVar3 = FUN_005deced(param_1); // Realloc
  if (iVar3 === 0) {
    FUN_005c68ca();
    FUN_005c68e0();
  } else {
    // DEVIATION: write palette data to file
    FUN_005c54a0();
    FUN_00421c30();
    FUN_005dce29(uVar1);
    FUN_005dce96(uVar1);
    FUN_005c68ca();
    FUN_005c68e0();
  }
}

// FUN_005c68ca — SEH destructor trampoline
export function FUN_005c68ca() {
  FUN_005d7c6e();
}

// FUN_005c68e0 — SEH frame restore
export function FUN_005c68e0() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c68f0 — load color table from file
export function FUN_005c68f0(param_1) {
  // DEVIATION: file I/O — load palette from file
  FUN_005d7c00();
  var iVar3 = FUN_005deced(param_1);
  if (iVar3 === 0) {
    debug_log(0);
    FUN_005c6a1c();
    FUN_005c6a32();
  } else {
    // DEVIATION: read palette data from file
    FUN_005c54a0();
    FUN_00421c30();
    FUN_005c6a1c();
    FUN_005c6a32();
  }
}

// FUN_005c6a1c — SEH destructor trampoline
export function FUN_005c6a1c() {
  FUN_005d7c6e();
}

// FUN_005c6a32 — SEH frame restore
export function FUN_005c6a32() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c6a42 — generate random palette ID
export function FUN_005c6a42() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: *(in_ECX + 0x408) = _rand() | (_rand() << 16)
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
  var iVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  var local_24;
  var local_20 = [0];
  var local_1c;
  var local_18 = [0];
  var local_14 = [0];
  var local_10 = [0];
  var local_c = [0];
  var local_8 = [0];

  if (0x100 < param_2 + param_1) {
    param_2 = 0x100 - param_1;
  }
  if (param_3 < 0) {
    for (local_24 = 0; -local_24 !== param_3 && local_24 <= -param_3; local_24 = local_24 + 1) {
      FUN_005dea9e(in_ECX, param_1, local_14, local_20, local_10);
      for (local_1c = param_1; local_1c < param_2 + param_1 - 1; local_1c = local_1c + 1) {
        FUN_005dea9e(in_ECX, local_1c + 1, local_c, local_18, local_8);
        FUN_005deadb(in_ECX, local_1c, local_c[0], local_18[0], local_8[0]);
      }
      FUN_005deadb(in_ECX, param_2 + param_1 - 1, local_14[0], local_20[0], local_10[0]);
    }
  } else {
    for (local_24 = 0; local_24 < param_3; local_24 = local_24 + 1) {
      FUN_005dea9e(in_ECX, param_2 + param_1 - 1, local_14, local_20, local_10);
      iVar1 = param_2 + param_1;
      while (true) {
        local_1c = iVar1 - 1;
        if (param_1 >= local_1c) break;
        FUN_005dea9e(in_ECX, iVar1 - 2, local_c, local_18, local_8);
        FUN_005deadb(in_ECX, local_1c, local_c[0], local_18[0], local_8[0]);
        iVar1 = local_1c;
      }
      FUN_005deadb(in_ECX, param_1, local_14[0], local_20[0], local_10[0]);
    }
  }
  update_palette_EA62(in_ECX, in_ECX + 0x404, param_1, param_2);
}

// FUN_005c6da8 — set palette range from RGB triplets
export function FUN_005c6da8(param_1, param_2, param_3) {
  var in_ECX = 0; // DEVIATION: this pointer
  var local_8;

  if (0x100 < param_2 + param_1) {
    param_2 = 0x100 - param_1;
  }
  for (local_8 = param_1; local_8 < param_2 + param_1; local_8 = local_8 + 1) {
    FUN_005deb12(in_ECX, local_8, param_3[0], param_3[1], param_3[2]);
    param_3 = param_3 + 3; // DEVIATION: pointer arithmetic
  }
  FUN_005c6480(param_1, param_2);
}

// FUN_005c6e36 — setup palette fade (store target)
export function FUN_005c6e36(param_1, param_2, param_3) {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  // *(in_ECX + 0x40c) = param_3;
  // *(in_ECX + 0x410) = param_1;
  // *(in_ECX + 0x414) = param_2;
  uVar1 = FUN_005dce4f(param_2 * 3);
  // *(in_ECX + 0x430) = uVar1;
  uVar1 = FUN_005dcdf9(uVar1);
  FUN_005ded12(in_ECX, uVar1, param_1, param_2);
  FUN_005dce29(in_ECX + 0x430);
  FUN_005c6a8d(param_1, param_2);
}

// FUN_005c6edc — setup palette fade with target RGB
export function FUN_005c6edc(param_1, param_2, param_3, param_4, param_5, param_6) {
  var in_ECX = 0; // DEVIATION: this pointer
  // *(in_ECX + 0x424) = param_4;
  // *(in_ECX + 0x425) = param_5;
  // *(in_ECX + 0x426) = param_6;
  FUN_005c6e36(param_1, param_2, param_3);
}

// FUN_005c6f2c — restore palette from fade backup
export function FUN_005c6f2c() {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  uVar1 = FUN_005dcdf9(in_ECX + 0x430);
  FUN_005c6da8(in_ECX + 0x410, in_ECX + 0x414, uVar1);
  FUN_005dce29(in_ECX + 0x430);
  FUN_005c6ac9(in_ECX + 0x410, in_ECX + 0x414);
  uVar1 = FUN_005dce96(in_ECX + 0x430);
  // *(in_ECX + 0x430) = uVar1;
}

// FUN_005c6fc3 — copy fade palette to buffer
export function FUN_005c6fc3(param_1, param_2) {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  uVar1 = FUN_005dcdf9(in_ECX + 0x430);
  FUN_005dced3(param_2, uVar1, param_1 * 3);
  FUN_005dce29(in_ECX + 0x430);
}

// FUN_005c701c — apply palette fade step (to target color)
export function FUN_005c701c(param_1) {
  // DEVIATION: palette fade interpolation math on byte arrays
  var in_ECX = 0;
  if (param_1 < 0 || in_ECX + 0x40c < param_1) {
    FUN_005d2279(0, param_1);
  } else {
    var iVar9 = FUN_005dcdf9(in_ECX + 0x430);
    // DEVIATION: per-entry color interpolation loop
    update_palette_EA62(in_ECX, in_ECX + 0x404, in_ECX + 0x410, in_ECX + 0x414);
    FUN_005dce29(in_ECX + 0x430);
  }
}

// FUN_005c71f3 — setup palette cross-fade (two targets)
export function FUN_005c71f3(param_1, param_2, param_3) {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  // *(in_ECX + 0x418) = param_3;
  // *(in_ECX + 0x41c) = param_1;
  // *(in_ECX + 0x420) = param_2;
  uVar1 = FUN_005dce4f(param_2 * 3);
  // *(in_ECX + 0x428) = uVar1;
  uVar1 = FUN_005dce4f(param_2 * 3);
  // *(in_ECX + 0x42c) = uVar1;
  uVar1 = FUN_005dcdf9(in_ECX + 0x428);
  FUN_005ded12(in_ECX, uVar1, param_1, param_2);
  FUN_005dce29(in_ECX + 0x428);
  uVar1 = FUN_005dcdf9(in_ECX + 0x42c);
  uVar1 = FUN_0046f440(uVar1, param_1, param_2);
  FUN_005ded12(uVar1);
  FUN_005dce29(in_ECX + 0x42c);
  FUN_005c6a8d(param_1, param_2);
}

// FUN_005c72f8 — restore palette from cross-fade backup
export function FUN_005c72f8() {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  uVar1 = FUN_005dcdf9(in_ECX + 0x428);
  FUN_005c6da8(in_ECX + 0x41c, in_ECX + 0x420, uVar1);
  FUN_005dce29(in_ECX + 0x428);
  uVar1 = FUN_005dce96(in_ECX + 0x428);
  // *(in_ECX + 0x428) = uVar1;
  uVar1 = FUN_005dce96(in_ECX + 0x42c);
  // *(in_ECX + 0x42c) = uVar1;
}

// FUN_005c738e — apply palette cross-fade step
export function FUN_005c738e(param_1) {
  // DEVIATION: palette cross-fade interpolation
  var in_ECX = 0;
  if (param_1 < 0 || in_ECX + 0x418 < param_1) {
    FUN_005d2279(0, param_1);
  } else {
    var iVar3 = FUN_005dcdf9(in_ECX + 0x428);
    var iVar4 = FUN_005dcdf9(in_ECX + 0x42c);
    // DEVIATION: per-entry cross-fade loop
    update_palette_EA62(in_ECX, in_ECX + 0x404, in_ECX + 0x41c, in_ECX + 0x420);
    FUN_005dce29(in_ECX + 0x428);
    FUN_005dce29(in_ECX + 0x42c);
  }
}

// FUN_005c7579 — build color match table from palette
export function FUN_005c7579(param_1, param_2, param_3, param_4) {
  // DEVIATION: KD-tree color matching
  FUN_005c79bf();
  var uVar2 = FUN_005dce4f(param_4 * 3);
  var iVar3 = FUN_005dcdf9(uVar2);
  FUN_005c6b63(iVar3, param_3, param_4);
  FUN_005c7a86(iVar3, param_3, param_4);
  FUN_005c6b63(iVar3, param_3, param_4);
  // DEVIATION: loop building color match entries via FUN_005c7e06
  FUN_005dce29(uVar2);
  FUN_005dce96(uVar2);
  FUN_005c76e4();
  FUN_005c76fa();
}

// FUN_005c76e4 — cleanup color match table
export function FUN_005c76e4() {
  FUN_005c7a30();
}

// FUN_005c76fa — SEH frame restore
export function FUN_005c76fa() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c770a — build color match table with two palettes
export function FUN_005c770a(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: dual-palette KD-tree color matching
  FUN_005c79bf();
  var uVar2 = FUN_005dce4f(param_6 * 3);
  var iVar3 = FUN_005dcdf9(uVar2);
  FUN_005c6b63(iVar3, param_5, param_6);
  FUN_005c7a86(iVar3, param_5, param_6);
  // DEVIATION: dual palette loop
  FUN_005dce29(uVar2);
  FUN_005dce96(uVar2);
  FUN_005c7873();
  FUN_005c7889();
}

// FUN_005c7873 — cleanup color match table
export function FUN_005c7873() {
  FUN_005c7a30();
}

// FUN_005c7889 — SEH frame restore
export function FUN_005c7889() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c7899 — find nearest palette color to RGB
export function FUN_005c7899(param_1, param_2, param_3) {
  // DEVIATION: KD-tree nearest neighbor search
  FUN_005c79bf();
  FUN_005c7a86(0, 0, 0);
  FUN_005c7e06(param_1, param_2, param_3, 0x20);
  FUN_005c7998();
  FUN_005c79ae();
}

// FUN_005c7998 — cleanup color match table
export function FUN_005c7998() {
  FUN_005c7a30();
}

// FUN_005c79ae — SEH frame restore
export function FUN_005c79ae() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005c79bf — initialize KD-tree for color matching
export function FUN_005c79bf() {
  // DEVIATION: KD-tree allocation
  return 0;
}

// FUN_005c7a30 — cleanup KD-tree
export function FUN_005c7a30() {
  // DEVIATION: KD-tree deallocation
}

// FUN_005c7a86 — build KD-tree from palette
export function FUN_005c7a86(param_1, param_2, param_3) {
  // DEVIATION: KD-tree construction from palette entries
}

// FUN_005c7c7b — insert node into KD-tree
export function FUN_005c7c7b(param_1, param_2) {
  // DEVIATION: KD-tree node insertion
}

// FUN_005c7e06 — nearest-neighbor search in KD-tree
export function FUN_005c7e06(param_1, param_2, param_3, param_4) {
  // DEVIATION: KD-tree nearest neighbor search
  return 0;
}

// FUN_005c80fd — find palette entry closest to gray (0x80)
export function FUN_005c80fd(param_1) {
  // DEVIATION: palette search for closest gray
  return 0;
}

// create_font_8200 — create Windows font
export function create_font_8200(param_1, param_2, param_3) {
  // DEVIATION: Win32 CreateFontIndirectA
  return 0;
}

// FUN_005c8391 — get sub-font from font family
export function FUN_005c8391(param_1, param_2) {
  // DEVIATION: font lookup
  return 0;
}

// FUN_005c841d — delete font handle
export function FUN_005c841d(param_1) {
  // DEVIATION: Win32 DeleteObject
}

// gdi_847F_export — get font height (exported version)
export function gdi_847F_export(param_1) {
  // DEVIATION: Win32 GetTextMetricsA
  return 1;
}

// gdi_8514 — get font height + external leading
export function gdi_8514(param_1) {
  // DEVIATION: Win32 GetTextMetricsA
  return 1;
}

// measure_text_858E — measure text width with font
export function measure_text_858E(param_1, param_2) {
  // DEVIATION: Win32 GetTextExtentPointA
  return 0;
}

// FUN_005c861c — load font from file
export function FUN_005c861c(param_1) {
  // DEVIATION: Win32 AddFontResourceA
  return 0;
}

// create_font_86BC — enum font callback
export function create_font_86BC(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 EnumFontFamiliesA callback
  return 1;
}

// gdi_8736 — enumerate font families
export function gdi_8736(param_1) {
  // DEVIATION: Win32 EnumFontFamiliesA
  return 0;
}

// FUN_005c8791 — unload font file
export function FUN_005c8791(param_1) {
  // DEVIATION: Win32 RemoveFontResourceA
}

// render_text_8834 — render text and return bounding rect
export function render_text_8834(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 DrawTextA
  return param_1;
}

// create_font_8908 — create font from LOGFONT
export function create_font_8908(param_1) {
  // DEVIATION: Win32 CreateFontIndirectA
  return 0;
}

// FUN_005c8984 — delete font object
export function FUN_005c8984(param_1) {
  // DEVIATION: Win32 DeleteObject
  return 0;
}

// send_msg_89ED — add font resource and broadcast
export function send_msg_89ED(param_1) {
  // DEVIATION: Win32 AddFontResourceA + SendMessageA
  return 0;
}

// send_msg_8A85 — remove font resource and broadcast
export function send_msg_8A85(param_1) {
  // DEVIATION: Win32 RemoveFontResourceA + SendMessageA
}

// invalidate_8B00 — invalidate entire window
export function invalidate_8B00(param_1) {
  // DEVIATION: Win32 InvalidateRect
}

// manage_window_8B2D — show window
export function manage_window_8B2D(param_1) {
  // DEVIATION: Win32 ShowWindow
}

// manage_window_8B58 — hide window
export function manage_window_8B58(param_1) {
  // DEVIATION: Win32 ShowWindow(SW_HIDE)
}

// FUN_005c8b83 — move window to position
export function FUN_005c8b83(param_1, param_2, param_3) {
  // DEVIATION: Win32 MoveWindow
}

// create_window_8BE1 — create control window (region)
export function create_window_8BE1(param_1, param_2) {
  // DEVIATION: Win32 CreateWindowExA
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
  // DEVIATION: Win32 window procedure — message dispatch
  return 0;
}

// FUN_005c8f50 — get control rect pointer
export function FUN_005c8f50() {
  // DEVIATION: return pointer to control rect
  return 0;
}

// FUN_005c8f70 — invoke mouse enter callback
export function FUN_005c8f70(param_1) {
  // DEVIATION: callback dispatch
}

// FUN_005c8fb0 — invoke mouse leave callback
export function FUN_005c8fb0(param_1) {
  // DEVIATION: callback dispatch
}

// FUN_005c8ff0 — invoke mouse click callback
export function FUN_005c8ff0(param_1) {
  // DEVIATION: callback dispatch
}

// FUN_005c9030 — invoke mouse down callback
export function FUN_005c9030(param_1) {
  // DEVIATION: callback dispatch
}

// FUN_005c9070 — invoke mouse double-click callback
export function FUN_005c9070(param_1) {
  // DEVIATION: callback dispatch
}

// FUN_005c90b0 — set keyboard focus to window
export function FUN_005c90b0(param_1) {
  SetFocus(param_1); // DEVIATION: Win32
}

// update_palette_90CA — paint control background
export function update_palette_90CA(param_1, param_2) {
  // DEVIATION: Win32 BeginPaint/BitBlt/EndPaint
}

// FUN_005c9222 — parse hotkey from label string
export function FUN_005c9222(param_1, param_2) {
  // DEVIATION: string parsing for '&' hotkey character
}

// send_msg_9307 — default control window proc
export function send_msg_9307(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 DefWindowProcA
  return 0;
}

// manage_window_944B — destroy control window
export function manage_window_944B() {
  // DEVIATION: Win32 DestroyWindow + cleanup
}

// FUN_005c9499 — initialize control data
export function FUN_005c9499(param_1, param_2) {
  // DEVIATION: Win32 SetWindowLongA + allocate control data
  return 0;
}

// FUN_005c9563 — get control data from window handle
export function FUN_005c9563(param_1) {
  // DEVIATION: Win32 GetWindowLongA
  return 0;
}

// FUN_005c9595 — dispose control data
export function FUN_005c9595(param_1) {
  // DEVIATION: free control data + Win32 cleanup
}

// invalidate_96CC — full client repaint
export function invalidate_96CC(param_1) {
  // DEVIATION: Win32 InvalidateRect + UpdateWindow
}

// ios_delbuf — set stream delete flag (MFC)
export function ios_delbuf(param_1, param_2) {
  // DEVIATION: MFC CArchive stream flag
}

// draw_text_9740 — create button window (with 3 bitmaps)
export function draw_text_9740(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 CreateWindowExA + CreateCompatibleBitmap + GDI rendering (5302 bytes of Win32 code)
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
  // DEVIATION: Win32 SetFocus + text edit activation
  var iVar1 = FUN_005c9563(param_1);
  if (iVar1 !== 0) {
    var pcVar2 = streambuf_egptr(iVar1 + 4); // DEVIATION: MFC
    if (pcVar2 !== 0) {
      SetFocus(param_1); // DEVIATION: Win32
      // *(iVar1 + 0x18) = 1;
      invalidate_96CC(param_1);
      // *(iVar1 + 0x18) = 0;
      FUN_00453af0();
      FUN_005cbeb0(8);
      invalidate_96CC(param_1);
      DAT_00637ea4 = FUN_0040f810();
      var uVar3 = FUN_00418740();
      FUN_005cbdf0(uVar3);
    }
  }
}

// blit_ACD4 — button window proc
export function blit_ACD4(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 window procedure — 1600 bytes of message dispatch, painting, input handling
  return 0;
}

// create_window_B319 — create sprite button window
export function create_window_B319(param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  // DEVIATION: Win32 CreateWindowExA + sprite button setup
  return 0;
}

// create_window_B601 — create simple sprite button
export function create_window_B601(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: Win32 CreateWindowExA + sprite button setup
  return 0;
}

// FUN_005cb6db — empty function (placeholder)
export function FUN_005cb6db() {
  // empty in C source
}

// blit_B6EB — sprite button window proc
export function blit_B6EB(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 window procedure — sprite button message dispatch
  return 0;
}

// IsTracking_CBDB0 — get palette handle (second instance)
export function IsTracking_CBDB0() {
  // DEVIATION: return *(in_ECX + 0x3c) — MFC misidentification
  return 0;
}

// FUN_005cbdd0 — get dialog keyboard-focus flag
export function FUN_005cbdd0() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x88)
  return 0;
}

// FUN_005cbdf0 — invoke button click callback
export function FUN_005cbdf0(param_1) {
  // DEVIATION: callback dispatch
}

// FUN_005cbe30 — invoke button left-click callback
export function FUN_005cbe30(param_1) {
  // DEVIATION: callback dispatch
}

// FUN_005cbe70 — invoke button right-click callback
export function FUN_005cbe70(param_1) {
  // DEVIATION: callback dispatch
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
  // DEVIATION: Win32 text measurement for checkbox layout
}

// gdi_C035 — measure checkbox bounds (no text)
export function gdi_C035(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 checkbox measurement
}

// create_window_C0F0 — create checkbox window
export function create_window_C0F0(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 CreateWindowExA for checkbox
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
  // DEVIATION: Win32 checkbox toggle + InvalidateRect
}

// draw_text_C320 — checkbox window proc
export function draw_text_C320(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 window procedure — checkbox message dispatch (2800+ bytes)
  return 0;
}

// FUN_005ccddf — set checkbox enabled text color
export function FUN_005ccddf(param_1, param_2, param_3) {
  DAT_00637f00 = param_1;
  DAT_00637f01 = param_2;
  DAT_00637f02 = param_3;
  DAT_00637f03 = 1;
}

// FUN_005cce0e — set checkbox disabled text color
export function FUN_005cce0e(param_1, param_2, param_3) {
  DAT_00637f04 = param_1;
  DAT_00637f05 = param_2;
  DAT_00637f06 = param_3;
  DAT_00637f07 = 1;
}

// FUN_005cce40 — invoke checkbox toggle callback
export function FUN_005cce40(param_1, param_2) {
  // DEVIATION: callback dispatch
}

// FUN_005cce80 — subclassed control window proc
export function FUN_005cce80(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 subclassed wndproc
}

// register_wndclass_CF17 — create scrollbar control
export function register_wndclass_CF17(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 RegisterClassA + CreateWindowExA for scrollbar
  return 0;
}

// FUN_005cd139 — empty function (placeholder)
export function FUN_005cd139() {
  // empty in C source
}

// gdi_D149 — scrollbar message handler
export function gdi_D149(param_1, param_2, param_3, param_4) {
  // DEVIATION: Win32 scrollbar window procedure (840+ bytes)
}

// FUN_005cd49f — enable/disable window
export function FUN_005cd49f(param_1, param_2) {
  // DEVIATION: Win32 EnableWindow
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
  // DEVIATION: Win32 GetScrollRange
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
  // DEVIATION: Win32 GetScrollRange
}

// FUN_005cd5f0 — set window scroll position
export function FUN_005cd5f0(param_1, param_2, param_3) {
  // DEVIATION: Win32 SetScrollPos
}

// FUN_005cd620 — get scrollbar current value
export function FUN_005cd620() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x20)
  return 0;
}

// FUN_005cd640 — invoke scrollbar change callback
export function FUN_005cd640(param_1) {
  // DEVIATION: callback dispatch
}

// FUN_005cd680 — invoke scrollbar tracking callback
export function FUN_005cd680(param_1) {
  // DEVIATION: callback dispatch
}

// FUN_005cd6c0 — get scrollbar page size
export function FUN_005cd6c0() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x1c)
  return 0;
}

// FUN_005cd6e0 — initialize scale table cache
export function FUN_005cd6e0() {
  FUN_005cd775(1, 1);
  FUN_005cda2a(1, 1, 1, 1);
}

// FUN_005cd775 — build/cache scale lookup table
export function FUN_005cd775(param_1, param_2) {
  var uVar1;
  var local_18;
  var local_14;
  var local_10;
  var local_c;
  var local_8;

  if (param_1 < 2) { param_1 = 1; }
  if (param_2 < 2) { param_2 = 1; }
  DAT_00637f98 = param_1;
  DAT_00637f9c = param_2;
  local_10 = FUN_00421bb0();
  local_18 = -1;
  local_14 = 0;
  while (true) {
    if (0xf < local_14) {
      DAT_006d4700[local_18] = DAT_00637f98;
      DAT_006d4704[local_18] = DAT_00637f9c;
      uVar1 = FUN_00421bb0();
      DAT_006d4708[local_18] = uVar1;
      local_8 = 0;
      if (DAT_00637f98 < DAT_00637f9c) {
        local_c = 0;
        local_14 = 0;
        while (local_14 < 0x400) {
          for (; -1 < local_c && local_14 < 0x400; local_14 = local_14 + 1) {
            // DAT_006d470c[local_14 + local_18 * 0x400] = local_8;
            local_c = local_c - DAT_00637f9c;
          }
          local_c = local_c + DAT_00637f98;
          local_8 = local_8 + 1;
        }
      } else {
        local_c = DAT_00637f98;
        local_14 = 0;
        while (local_14 < 0x400) {
          for (; DAT_00637f9c <= local_c && local_14 < 0x400; local_14 = local_14 + 1) {
            // DAT_006d470c[local_14 + local_18 * 0x400] = local_8;
            local_c = local_c - DAT_00637f9c;
          }
          local_c = local_c + DAT_00637f98;
          local_8 = local_8 + 1;
        }
      }
      // DAT_006e47c8 = &DAT_006d470c + local_18 * 0x100c;
      return;
    }
    if (DAT_006d4700[local_14] === DAT_00637f98 && DAT_006d4704[local_14] === DAT_00637f9c) {
      uVar1 = FUN_00421bb0();
      DAT_006d4708[local_14] = uVar1;
      local_18 = local_14;
      // DAT_006e47c8 = &DAT_006d470c + local_18 * 0x100c;
      return;
    }
    if (DAT_006d4708[local_14] <= local_10) {
      local_10 = DAT_006d4708[local_14];
      local_18 = local_14;
    }
    local_14 = local_14 + 1;
  }
}

// FUN_005cda06 — get current scale factors
export function FUN_005cda06(param_1, param_2) {
  param_1[0] = DAT_00637f98;
  param_2[0] = DAT_00637f9c;
}

// FUN_005cda2a — build/cache blit scale lookup tables (X and Y)
export function FUN_005cda2a(param_1, param_2, param_3, param_4) {
  var uVar1;
  var local_14;
  var local_10;
  var local_c;
  var local_8;

  if (param_1 < 2) { param_1 = 1; }
  if (param_2 < 2) { param_2 = 1; }
  if (param_3 < 2) { param_3 = 1; }
  if (param_4 < 2) { param_4 = 1; }
  DAT_00637fa0 = param_1;
  DAT_00637fa4 = param_2;
  DAT_00637fa8 = param_3;
  DAT_00637fac = param_4;

  // X scale table
  local_10 = FUN_00421bb0();
  local_8 = -1;
  for (local_14 = 0; local_14 < 0x10; local_14 = local_14 + 1) {
    if (DAT_006d4700[local_14] === DAT_00637fa0 && DAT_006d4704[local_14] === DAT_00637fa4) {
      uVar1 = FUN_00421bb0();
      DAT_006d4708[local_14] = uVar1;
      local_8 = local_14;
      // goto LAB_005cdbab;
      break;
    }
    if (DAT_006d4708[local_14] <= local_10) {
      local_10 = DAT_006d4708[local_14];
      local_8 = local_14;
    }
  }
  if (local_14 >= 0x10) {
    FUN_005cdcdb(local_8, DAT_00637fa0, DAT_00637fa4);
  }
  // DAT_006e47c0 = &DAT_006d470c + local_8 * 0x100c;

  // Y scale table
  local_10 = FUN_00421bb0();
  local_c = -1;
  local_14 = 0;
  while (true) {
    if (0xf < local_14) {
      FUN_005cdcdb(local_c, DAT_00637fa8, DAT_00637fac);
      local_14 = local_c;
      // DAT_006e47c4 = &DAT_006d470c + local_14 * 0x100c;
      return;
    }
    if (DAT_006d4700[local_14] === DAT_00637fa8 && DAT_006d4704[local_14] === DAT_00637fac) {
      uVar1 = FUN_00421bb0();
      DAT_006d4708[local_14] = uVar1;
      // DAT_006e47c4 = &DAT_006d470c + local_14 * 0x100c;
      return;
    }
    if (DAT_006d4708[local_14] <= local_10 && local_8 !== local_14) {
      local_10 = DAT_006d4708[local_14];
      local_c = local_14;
    }
    local_14 = local_14 + 1;
  }
}

// FUN_005cdcdb — compute single scale lookup table
export function FUN_005cdcdb(param_1, param_2, param_3) {
  var uVar1;
  var local_10;
  var local_c;
  var local_8;

  DAT_006d4700[param_1] = param_2;
  DAT_006d4704[param_1] = param_3;
  uVar1 = FUN_00421bb0();
  DAT_006d4708[param_1] = uVar1;
  local_8 = 0;
  if (param_2 < param_3) {
    local_c = 0;
    local_10 = 0;
    while (local_10 < 0x400) {
      for (; -1 < local_c && local_10 < 0x400; local_10 = local_10 + 1) {
        // DAT_006d470c[local_10 + param_1 * 0x400] = local_8;
        local_c = local_c - param_3;
      }
      local_c = local_c + param_2;
      local_8 = local_8 + 1;
    }
  } else {
    local_c = param_2;
    local_10 = 0;
    while (local_10 < 0x400) {
      for (; param_3 <= local_c && local_10 < 0x400; local_10 = local_10 + 1) {
        // DAT_006d470c[local_10 + param_1 * 0x400] = local_8;
        local_c = local_c - param_3;
      }
      local_c = local_c + param_2;
      local_8 = local_8 + 1;
    }
  }
}

// CString::CString — default constructor
export function CString_CString() {
  FUN_005d1b38();
}

// FUN_005cde4d — release sprite data
export function FUN_005cde4d() {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  if (in_ECX + 0x34 !== 0) {
    if (in_ECX + 0x38 !== 0) {
      uVar1 = FUN_005dce29(in_ECX + 0x34);
      // *(in_ECX + 0x38) = uVar1;
    }
    FUN_005dce96(in_ECX + 0x34);
  }
}

// FUN_005cdea1 — create sprite from port (with fill)
export function FUN_005cdea1(param_1, param_2, param_3) {
  // DEVIATION: SEH frame setup
  FUN_005bd630();
  FUN_005bd65c(param_1, param_2);
  FUN_005c041f(param_3);
  FUN_005cebec(new Array(72).fill(0), 0, 0, param_1, param_2);
  SetRect(0, 0, 0, 0, 0); // DEVIATION: Win32
  FUN_005cdf2d();
  FUN_005cdf40();
}

// FUN_005cdf2d — sprite cleanup helper
export function FUN_005cdf2d() {
  FUN_005bd915();
}

// FUN_005cdf40 — SEH frame restore
export function FUN_005cdf40() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005cdf50 — reset sprite data
export function FUN_005cdf50() {
  var uVar1;
  var in_ECX = 0; // DEVIATION: this pointer
  if (in_ECX + 0x38 !== 0) {
    uVar1 = FUN_005dce29(in_ECX + 0x34);
    // *(in_ECX + 0x38) = uVar1;
  }
  if (in_ECX + 0x34 !== 0) {
    uVar1 = FUN_005dce96(in_ECX + 0x34);
    // *(in_ECX + 0x34) = uVar1;
  }
  FUN_005d1b38();
}

// FUN_005cdfb2 — empty function (placeholder)
export function FUN_005cdfb2() {
  // empty in C source
}

// FUN_005cdfc2 — load sprite from resource
export function FUN_005cdfc2(param_1) {
  // DEVIATION: resource loading + sprite data parsing
  var in_ECX = 0;
  var iVar1 = FUN_005c5540([0x53, 0x50, 0x52, 0x54], param_1);
  if (iVar1 === 0) {
    FUN_005d233f(0, param_1);
  } else {
    var puVar2 = FUN_005c5560(iVar1);
    var uVar3 = FUN_005c54d0(puVar2[0]);
    // *(in_ECX + 0x20) = uVar3;
    uVar3 = FUN_005c54d0(puVar2[1]);
    // *(in_ECX + 0x24) = uVar3;
    FUN_005d1cd0(puVar2 + 2, in_ECX);
    FUN_005d1cd0(puVar2 + 6, in_ECX + 0x10);
    // *(in_ECX + 0x30) = *(puVar2 + 10);
    var local_8 = FUN_005d1cb0(puVar2 + 0x29);
    if (in_ECX + 0x38 !== 0) { FUN_005cf337(); }
    if (in_ECX + 0x34 !== 0) {
      uVar3 = FUN_005dce96(in_ECX + 0x34);
    }
    uVar3 = FUN_005dce4f(local_8);
    // *(in_ECX + 0x34) = uVar3;
    uVar3 = FUN_005dcdf9(in_ECX + 0x34);
    FUN_005dced3(puVar2 + 0x2d, uVar3, local_8);
    var uVar4 = FUN_00407fc0(in_ECX + 0x10);
    FUN_005cdfb2(uVar3, uVar4);
    FUN_005dce29(in_ECX + 0x34);
    FUN_005c5580(iVar1);
    FUN_005c5520(iVar1);
  }
}

// FUN_005ce16e — load sprite from resource (with default palette)
export function FUN_005ce16e(param_1, param_2) {
  FUN_005ce19a(param_1, 0xffffffff, 0xffffffff, param_2);
}

// FUN_005ce19a — load sprite from resource (with palette range)
export function FUN_005ce19a(param_1, param_2, param_3) {
  // DEVIATION: resource loading + sprite extraction with palette
}

// FUN_005ce3a8 — load sprite from file (wrapper)
export function FUN_005ce3a8(param_1) {
  FUN_005ce9ef(param_1);
}

// FUN_005ce3cc — save sprite to file
export function FUN_005ce3cc(param_1, param_2, param_3) {
  // DEVIATION: file I/O — sprite save
}

// FUN_005ce595 — SEH destructor trampoline
export function FUN_005ce595() {
  FUN_005d7c6e();
}

// FUN_005ce5ab — SEH frame restore
export function FUN_005ce5ab() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005ce5bb — save sprite to file (simple)
export function FUN_005ce5bb(param_1) {
  // DEVIATION: file I/O — simple sprite save
}

// FUN_005ce6fd — SEH destructor trampoline
export function FUN_005ce6fd() {
  FUN_005d7c6e();
}

// FUN_005ce713 — SEH frame restore
export function FUN_005ce713() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005ce723 — load sprite from file (with default palette)
export function FUN_005ce723(param_1, param_2) {
  FUN_005ce74f(param_1, 0xffffffff, 0xffffffff, param_2);
}

// FUN_005ce74f — load sprite from file (with palette range)
export function FUN_005ce74f(param_1, param_2, param_3) {
  // DEVIATION: file I/O — sprite load with palette
}

// FUN_005ce9c9 — SEH destructor trampoline
export function FUN_005ce9c9() {
  FUN_005d7c6e();
}

// FUN_005ce9df — SEH frame restore
export function FUN_005ce9df() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005ce9ef — load sprite from file
export function FUN_005ce9ef(param_1) {
  // DEVIATION: file I/O — sprite load
}

// FUN_005ceb8e — SEH destructor trampoline
export function FUN_005ceb8e() {
  FUN_005d7c6e();
}

// FUN_005ceba4 — SEH frame restore
export function FUN_005ceba4() {
  // DEVIATION: FS register manipulation (SEH)
}

// FUN_005cebb4 — extract sprite from port (default chroma)
export function FUN_005cebb4(param_1, param_2) {
  // DEVIATION: sprite extraction from port surface
}

// FUN_005cebec — extract sprite from port (with rect)
export function FUN_005cebec(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: sprite extraction from port surface with rect
}

// FUN_005cec44 — extract sprite from port (custom chroma)
export function FUN_005cec44(param_1, param_2, param_3) {
  // DEVIATION: sprite extraction with custom chroma key
}

// FUN_005cec80 — extract sprite from port (auto-detect chroma)
export function FUN_005cec80(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: sprite extraction with auto chroma detection
}

// FUN_005cedad — extract sprite from port (custom chroma, with rect)
export function FUN_005cedad(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: sprite extraction with custom chroma and rect
}

// FUN_005cee09 — extract sprite from direct surface (default chroma)
export function FUN_005cee09(param_1, param_2) {
  // DEVIATION: sprite extraction from direct surface
}

// FUN_005cee41 — extract sprite from direct surface (with rect)
export function FUN_005cee41(param_1, param_2, param_3, param_4, param_5) {
  // DEVIATION: sprite extraction from direct surface with rect
}

// FUN_005cee99 — extract sprite from direct surface (custom chroma)
export function FUN_005cee99(param_1, param_2, param_3) {
  // DEVIATION: sprite extraction from direct surface with custom chroma
}

// FUN_005ceed5 — extract sprite from direct surface (custom chroma, with rect)
export function FUN_005ceed5(param_1, param_2, param_3, param_4, param_5, param_6) {
  // DEVIATION: sprite extraction from direct surface with custom chroma and rect
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
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: *(in_ECX + 0x38) = FUN_005dcdf9(*(in_ECX + 0x34))
}

// FUN_005cf337 — unlock sprite data
export function FUN_005cf337() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: FUN_005dce29(*(in_ECX + 0x34)); *(in_ECX + 0x38) = 0
}

// FUN_005cf36f — check if sprite is locked
export function FUN_005cf36f() {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: return *(in_ECX + 0x38) != 0
  return false;
}

// FUN_005cf39b — set sprite origin
export function FUN_005cf39b(param_1, param_2) {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: *(in_ECX + 0x20) = param_1; *(in_ECX + 0x24) = param_2
}

// FUN_005cf3c5 — get sprite origin
export function FUN_005cf3c5(param_1, param_2) {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: *param_1 = *(in_ECX + 0x20); *param_2 = *(in_ECX + 0x24)
}

// FUN_005cf3f3 — set sprite scale factors
export function FUN_005cf3f3(param_1, param_2) {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: *(in_ECX + 0x28) = param_1; *(in_ECX + 0x2c) = param_2
}

// FUN_005cf439 — get sprite scale factors
export function FUN_005cf439(param_1, param_2) {
  var in_ECX = 0; // DEVIATION: this pointer
  // DEVIATION: *param_1 = *(in_ECX + 0x28); *param_2 = *(in_ECX + 0x2c)
}

// FUN_005cf467 — replace pixel color in sprite
export function FUN_005cf467(param_1, param_2) {
  // DEVIATION: sprite pixel-level color replacement
}

// FUN_005cf541 — apply palette remap to sprite
export function FUN_005cf541(param_1, param_2) {
  // DEVIATION: sprite palette remap
}

// FUN_005cf64c — extract sprite from 8-bit port (core)
export function FUN_005cf64c(param_1, param_2, param_3) {
  // DEVIATION: 1951 bytes of sprite extraction from 8-bit port surface
  return 0;
}

// FUN_005cfdeb — extract sprite from direct surface (core)
export function FUN_005cfdeb(param_1, param_2, param_3) {
  // DEVIATION: 1921 bytes of sprite extraction from direct surface
  return 0;
}
