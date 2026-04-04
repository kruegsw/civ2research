// ═══════════════════════════════════════════════════════════════════
// gdi.js — Win32 GDI → HTML5 Canvas abstraction layer
//
// Maps Win32 GDI function calls to Canvas 2D API operations.
// In browser: creates real <canvas> elements for rendering.
// In Node.js: returns tracked handles with no visual output (headless).
//
// The binary passes integer handles (HDC, HBITMAP, HFONT, etc.)
// between GDI functions. This module maintains a handle table
// mapping those integers to JS objects (canvases, contexts, etc.).
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';
import { s16, s32, u16, w32, _MEM } from './mem.js';

const isBrowser = typeof document !== 'undefined';

// ── Handle table ──────────────────────────────────────────────────
const handles = new Map();
let nextHandle = 0x1000;

function allocHandle(obj) {
  const h = nextHandle++;
  handles.set(h, obj);
  return h;
}

function getHandle(h) {
  return handles.get(h) || null;
}

function freeHandle(h) {
  handles.delete(h);
}

// ── Canvas creation helper ────────────────────────────────────────
function makeCanvas(w, h) {
  if (!isBrowser) return { width: w, height: h, getContext: () => null };
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

function makeCtx(canvas) {
  if (!isBrowser) return null;
  return canvas.getContext('2d', { willReadFrequently: true });
}

// ── Main display canvas (set by browser.js) ───────────────────────
let mainCanvas = null;
let mainCtx = null;

export function setMainCanvas(canvas) {
  mainCanvas = canvas;
  mainCtx = canvas ? canvas.getContext('2d') : null;
}

// ── COLORREF helpers ──────────────────────────────────────────────
// Win32 COLORREF: 0x00BBGGRR (note: BGR not RGB)
function colorrefToCSS(cr) {
  const r = cr & 0xFF;
  const g = (cr >> 8) & 0xFF;
  const b = (cr >> 16) & 0xFF;
  return `rgb(${r},${g},${b})`;
}

// ═══════════════════════════════════════════════════════════════════
// PHASE 0: Rect helpers (pure math on _MEM, no GDI objects needed)
// ═══════════════════════════════════════════════════════════════════

export function SetRect(lprc, left, top, right, bottom) {
  if (lprc === 0) return 0;
  w32(lprc, 0, left);
  w32(lprc, 4, top);
  w32(lprc, 8, right);
  w32(lprc, 12, bottom);
  return 1;
}

export function CopyRect(dst, src) {
  if (dst === 0 || src === 0) return 0;
  for (let i = 0; i < 16; i++) _MEM[dst + i] = _MEM[src + i];
  return 1;
}

export function OffsetRect(lprc, dx, dy) {
  if (lprc === 0) return 0;
  w32(lprc, 0, s32(lprc, 0) + dx);
  w32(lprc, 4, s32(lprc, 4) + dy);
  w32(lprc, 8, s32(lprc, 8) + dx);
  w32(lprc, 12, s32(lprc, 12) + dy);
  return 1;
}

export function InflateRect(lprc, dx, dy) {
  if (lprc === 0) return 0;
  w32(lprc, 0, s32(lprc, 0) - dx);
  w32(lprc, 4, s32(lprc, 4) - dy);
  w32(lprc, 8, s32(lprc, 8) + dx);
  w32(lprc, 12, s32(lprc, 12) + dy);
  return 1;
}

export function IntersectRect(dst, r1, r2) {
  const l = Math.max(s32(r1, 0), s32(r2, 0));
  const t = Math.max(s32(r1, 4), s32(r2, 4));
  const r = Math.min(s32(r1, 8), s32(r2, 8));
  const b = Math.min(s32(r1, 12), s32(r2, 12));
  if (l >= r || t >= b) { SetRect(dst, 0, 0, 0, 0); return 0; }
  SetRect(dst, l, t, r, b);
  return 1;
}

export function UnionRect(dst, r1, r2) {
  SetRect(dst,
    Math.min(s32(r1, 0), s32(r2, 0)),
    Math.min(s32(r1, 4), s32(r2, 4)),
    Math.max(s32(r1, 8), s32(r2, 8)),
    Math.max(s32(r1, 12), s32(r2, 12)));
  return 1;
}

export function PtInRect(lprc, ptX, ptY) {
  return (ptX >= s32(lprc, 0) && ptX < s32(lprc, 8) &&
          ptY >= s32(lprc, 4) && ptY < s32(lprc, 12)) ? 1 : 0;
}

export function IsRectEmpty(lprc) {
  return (s32(lprc, 0) >= s32(lprc, 8) || s32(lprc, 4) >= s32(lprc, 12)) ? 1 : 0;
}

export function EqualRect(r1, r2) {
  return (s32(r1,0)===s32(r2,0) && s32(r1,4)===s32(r2,4) &&
          s32(r1,8)===s32(r2,8) && s32(r1,12)===s32(r2,12)) ? 1 : 0;
}

// ═══════════════════════════════════════════════════════════════════
// PHASE 1: DC, Bitmap, and BitBlt
// ═══════════════════════════════════════════════════════════════════

// ── CreateCompatibleDC ────────────────────────────────────────────
// Creates an offscreen device context compatible with the given DC.
// Pass 0 for the screen DC.
export function CreateCompatibleDC(hdc) {
  const canvas = makeCanvas(1, 1); // sized later by SelectObject
  const ctx = makeCtx(canvas);
  return allocHandle({
    type: 'DC',
    canvas,
    ctx,
    selectedBitmap: 0,
    selectedFont: 0,
    selectedBrush: 0,
    selectedPen: 0,
    textColor: 0x000000,   // black
    bkColor: 0xFFFFFF,     // white
    bkMode: 2,             // OPAQUE
    textAlign: 0,
    penPos: { x: 0, y: 0 },
    palette: null,
  });
}

// ── CreateCompatibleBitmap ────────────────────────────────────────
export function CreateCompatibleBitmap(hdc, w, h) {
  if (w <= 0 || h <= 0) return 0;
  const canvas = makeCanvas(w, h);
  const ctx = makeCtx(canvas);
  return allocHandle({ type: 'BITMAP', canvas, ctx, width: w, height: h });
}

// ── CreateDIBSection ──────────────────────────────────────────────
// Creates a bitmap from BITMAPINFO, returns handle + pixel buffer pointer.
// bmi points to BITMAPINFOHEADER in _MEM:
//   +0: biSize(4), +4: biWidth(4), +8: biHeight(4), +12: biPlanes(2),
//   +14: biBitCount(2), +16: biCompression(4)
export function CreateDIBSection(hdc, bmi, usage, ppvBits, hSection, offset) {
  if (bmi === 0) return 0;
  const w = Math.abs(s32(bmi, 4));
  const h = Math.abs(s32(bmi, 8));
  const bpp = u16(bmi, 14);
  if (w <= 0 || h <= 0) return 0;

  const canvas = makeCanvas(w, h);
  const ctx = makeCtx(canvas);

  // Allocate pixel buffer in _MEM for the binary to read/write
  // Stride = ((w * bpp + 31) / 32) * 4 (DWORD-aligned)
  const stride = (((w * bpp + 31) >>> 5) << 2);
  const bufSize = stride * h;

  // Use the heap allocator (GlobalAlloc pattern: bump from end of _MEM)
  const pixelPtr = G._MEM.length - 300000 - nextHandle * 1024; // simple bump allocator
  // Safety: clamp to valid range
  const safePtr = Math.max(0, Math.min(pixelPtr, G._MEM.length - bufSize));

  // Write pixel buffer pointer to ppvBits if provided
  if (ppvBits !== 0) {
    w32(ppvBits, 0, safePtr);
  }

  return allocHandle({
    type: 'BITMAP', canvas, ctx,
    width: w, height: h,
    bpp, stride, pixelPtr: safePtr, bufSize,
    palette: bpp <= 8 ? new Uint32Array(256) : null,
  });
}

// ── SelectObject ──────────────────────────────────────────────────
// Selects a GDI object into a DC, returns the previously selected object.
export function SelectObject(hdc, hObj) {
  const dc = getHandle(hdc);
  const obj = getHandle(hObj);
  if (!dc || dc.type !== 'DC') return 0;
  if (!obj) return 0;

  let prev = 0;
  if (obj.type === 'BITMAP') {
    prev = dc.selectedBitmap;
    dc.selectedBitmap = hObj;
    // Resize DC canvas to match bitmap
    if (isBrowser && obj.canvas) {
      dc.canvas = obj.canvas;
      dc.ctx = obj.ctx;
    }
  } else if (obj.type === 'FONT') {
    prev = dc.selectedFont;
    dc.selectedFont = hObj;
    if (dc.ctx) dc.ctx.font = obj.cssFont;
  } else if (obj.type === 'BRUSH') {
    prev = dc.selectedBrush;
    dc.selectedBrush = hObj;
  } else if (obj.type === 'PEN') {
    prev = dc.selectedPen;
    dc.selectedPen = hObj;
  } else if (obj.type === 'PALETTE') {
    prev = dc.palette ? dc.palette._handle : 0;
    dc.palette = obj;
  }
  return prev;
}

// ── DeleteObject ──────────────────────────────────────────────────
export function DeleteObject(hObj) {
  freeHandle(hObj);
  return 1;
}

// ── DeleteDC ──────────────────────────────────────────────────────
export function DeleteDC(hdc) {
  freeHandle(hdc);
  return 1;
}

// ── GetDC ─────────────────────────────────────────────────────────
// Returns a handle to the device context for a window.
// hwnd=0 → screen DC (our main canvas)
export function GetDC(hwnd) {
  if (mainCanvas) {
    return allocHandle({
      type: 'DC',
      canvas: mainCanvas,
      ctx: mainCtx,
      selectedBitmap: 0, selectedFont: 0, selectedBrush: 0, selectedPen: 0,
      textColor: 0, bkColor: 0xFFFFFF, bkMode: 2, textAlign: 0,
      penPos: { x: 0, y: 0 }, palette: null,
    });
  }
  // Headless: return a dummy DC
  return CreateCompatibleDC(0);
}

// ── ReleaseDC ─────────────────────────────────────────────────────
export function ReleaseDC(hwnd, hdc) {
  // Don't delete the main canvas DC, just release the handle
  freeHandle(hdc);
  return 1;
}

// ── BitBlt ────────────────────────────────────────────────────────
// Copy pixels from source DC to destination DC.
// ROP codes:
//   0x00CC0020 = SRCCOPY (direct copy)
//   0x00000042 = BLACKNESS (fill black)
//   0x00FF0062 = WHITENESS (fill white)
//   0x00660046 = SRCINVERT (XOR)
//   0x008800C6 = SRCAND (AND)
export function BitBlt(hdcDest, x, y, w, h, hdcSrc, sx, sy, rop) {
  if (!isBrowser) return 1;
  const dest = getHandle(hdcDest);
  const src = getHandle(hdcSrc);
  if (!dest || !dest.ctx) return 0;

  const ROP = rop >>> 0;

  if (ROP === 0x00CC0020 || ROP === 0xCC0020) {
    // SRCCOPY — direct pixel copy
    if (src && src.ctx && src.canvas) {
      try {
        dest.ctx.drawImage(src.canvas, sx, sy, w, h, x, y, w, h);
      } catch(e) { /* source canvas may be invalid */ }
    }
  } else if (ROP === 0x00000042 || ROP === 0x42) {
    // BLACKNESS
    dest.ctx.fillStyle = '#000';
    dest.ctx.fillRect(x, y, w, h);
  } else if (ROP === 0x00FF0062 || ROP === 0xFF0062) {
    // WHITENESS
    dest.ctx.fillStyle = '#fff';
    dest.ctx.fillRect(x, y, w, h);
  } else if (ROP === 0x00660046 || ROP === 0x660046) {
    // SRCINVERT (XOR) — used for sprite masking
    if (src && src.ctx) {
      const prevOp = dest.ctx.globalCompositeOperation;
      dest.ctx.globalCompositeOperation = 'xor';
      try { dest.ctx.drawImage(src.canvas, sx, sy, w, h, x, y, w, h); } catch(e) {}
      dest.ctx.globalCompositeOperation = prevOp;
    }
  } else if (ROP === 0x008800C6 || ROP === 0x8800C6) {
    // SRCAND — used for sprite masking
    if (src && src.ctx) {
      const prevOp = dest.ctx.globalCompositeOperation;
      dest.ctx.globalCompositeOperation = 'multiply';
      try { dest.ctx.drawImage(src.canvas, sx, sy, w, h, x, y, w, h); } catch(e) {}
      dest.ctx.globalCompositeOperation = prevOp;
    }
  }
  // Other ROPs: silently ignore (no-op)
  return 1;
}

// ── StretchBlt ────────────────────────────────────────────────────
export function StretchBlt(hdcDest, x, y, w, h, hdcSrc, sx, sy, sw, sh, rop) {
  if (!isBrowser) return 1;
  const dest = getHandle(hdcDest);
  const src = getHandle(hdcSrc);
  if (!dest || !dest.ctx) return 0;

  const ROP = rop >>> 0;
  if ((ROP === 0x00CC0020 || ROP === 0xCC0020) && src && src.ctx) {
    try { dest.ctx.drawImage(src.canvas, sx, sy, sw, sh, x, y, w, h); } catch(e) {}
  }
  return 1;
}

// ═══════════════════════════════════════════════════════════════════
// PHASE 1 support: Drawing basics
// ═══════════════════════════════════════════════════════════════════

export function SetBkMode(hdc, mode) {
  const dc = getHandle(hdc);
  if (dc) { const prev = dc.bkMode; dc.bkMode = mode; return prev; }
  return 0;
}

export function SetBkColor(hdc, color) {
  const dc = getHandle(hdc);
  if (dc) { const prev = dc.bkColor; dc.bkColor = color; return prev; }
  return 0;
}

export function SetTextColor(hdc, color) {
  const dc = getHandle(hdc);
  if (dc) { const prev = dc.textColor; dc.textColor = color; return prev; }
  return 0;
}

export function SetTextAlign(hdc, align) {
  const dc = getHandle(hdc);
  if (dc) { const prev = dc.textAlign; dc.textAlign = align; return prev; }
  return 0;
}

export function GetTextAlign(hdc) {
  const dc = getHandle(hdc);
  return dc ? dc.textAlign : 0;
}

// ── CreateSolidBrush ──────────────────────────────────────────────
export function CreateSolidBrush(color) {
  return allocHandle({ type: 'BRUSH', color, css: colorrefToCSS(color) });
}

// ── CreatePen ─────────────────────────────────────────────────────
export function CreatePen(style, width, color) {
  return allocHandle({ type: 'PEN', style, width: width || 1, color, css: colorrefToCSS(color) });
}

// ── FillRect ──────────────────────────────────────────────────────
export function FillRect(hdc, lprc, hBrush) {
  if (!isBrowser) return 1;
  const dc = getHandle(hdc);
  const brush = getHandle(hBrush);
  if (!dc || !dc.ctx || !lprc) return 0;
  const l = s32(lprc, 0), t = s32(lprc, 4), r = s32(lprc, 8), b = s32(lprc, 12);
  dc.ctx.fillStyle = brush ? brush.css : '#000';
  dc.ctx.fillRect(l, t, r - l, b - t);
  return 1;
}

// ── FrameRect ─────────────────────────────────────────────────────
export function FrameRect(hdc, lprc, hBrush) {
  if (!isBrowser) return 1;
  const dc = getHandle(hdc);
  const brush = getHandle(hBrush);
  if (!dc || !dc.ctx || !lprc) return 0;
  const l = s32(lprc, 0), t = s32(lprc, 4), r = s32(lprc, 8), b = s32(lprc, 12);
  dc.ctx.strokeStyle = brush ? brush.css : '#000';
  dc.ctx.strokeRect(l + 0.5, t + 0.5, r - l - 1, b - t - 1);
  return 1;
}

// ── Line drawing ──────────────────────────────────────────────────
export function MoveToEx(hdc, x, y, lpPrev) {
  const dc = getHandle(hdc);
  if (!dc) return 0;
  if (lpPrev) { w32(lpPrev, 0, dc.penPos.x); w32(lpPrev, 4, dc.penPos.y); }
  dc.penPos.x = x;
  dc.penPos.y = y;
  return 1;
}

export function LineTo(hdc, x, y) {
  if (!isBrowser) return 1;
  const dc = getHandle(hdc);
  if (!dc || !dc.ctx) return 0;
  const pen = getHandle(dc.selectedPen);
  dc.ctx.strokeStyle = pen ? pen.css : '#000';
  dc.ctx.lineWidth = pen ? pen.width : 1;
  dc.ctx.beginPath();
  dc.ctx.moveTo(dc.penPos.x, dc.penPos.y);
  dc.ctx.lineTo(x, y);
  dc.ctx.stroke();
  dc.penPos.x = x;
  dc.penPos.y = y;
  return 1;
}

// ── Pixel operations ──────────────────────────────────────────────
export function SetPixel(hdc, x, y, color) {
  if (!isBrowser) return color;
  const dc = getHandle(hdc);
  if (!dc || !dc.ctx) return -1;
  dc.ctx.fillStyle = colorrefToCSS(color);
  dc.ctx.fillRect(x, y, 1, 1);
  return color;
}

export function GetPixel(hdc, x, y) {
  if (!isBrowser) return 0;
  const dc = getHandle(hdc);
  if (!dc || !dc.ctx) return -1;
  try {
    const d = dc.ctx.getImageData(x, y, 1, 1).data;
    return d[0] | (d[1] << 8) | (d[2] << 16); // COLORREF is BGR
  } catch(e) { return -1; }
}

// ── Text rendering ────────────────────────────────────────────────
export function CreateFontIndirectA(lpLogFont) {
  if (lpLogFont === 0) return 0;
  const height = Math.abs(s32(lpLogFont, 0));
  const weight = s32(lpLogFont, 16);
  const italic = _MEM[lpLogFont + 20];
  const size = height || 14;
  const bold = weight >= 700 ? 'bold ' : '';
  const ital = italic ? 'italic ' : '';
  const cssFont = `${ital}${bold}${size}px sans-serif`;
  return allocHandle({ type: 'FONT', cssFont, size, weight, italic });
}

export function DrawTextA(hdc, lpStr, nCount, lprc, format) {
  if (!isBrowser) return 0;
  const dc = getHandle(hdc);
  if (!dc || !dc.ctx || !lpStr || !lprc) return 0;

  // Read string from _MEM
  let text = '';
  const len = nCount < 0 ? 255 : nCount;
  for (let i = 0; i < len; i++) {
    const ch = _MEM[lpStr + i];
    if (ch === 0) break;
    text += String.fromCharCode(ch);
  }

  const l = s32(lprc, 0), t = s32(lprc, 4), r = s32(lprc, 8), b = s32(lprc, 12);
  const DT_CALCRECT = 0x400;

  if (format & DT_CALCRECT) {
    // Measure only, don't draw
    const m = dc.ctx.measureText(text);
    const h = dc.ctx.font.match(/(\d+)px/) ? parseInt(dc.ctx.font.match(/(\d+)px/)[1]) : 14;
    w32(lprc, 8, l + Math.ceil(m.width));
    w32(lprc, 12, t + h);
    return h;
  }

  dc.ctx.fillStyle = colorrefToCSS(dc.textColor);
  const font = getHandle(dc.selectedFont);
  if (font) dc.ctx.font = font.cssFont;

  const DT_CENTER = 0x01;
  const DT_RIGHT = 0x02;
  let tx = l;
  if (format & DT_CENTER) { dc.ctx.textAlign = 'center'; tx = (l + r) / 2; }
  else if (format & DT_RIGHT) { dc.ctx.textAlign = 'right'; tx = r; }
  else dc.ctx.textAlign = 'left';

  dc.ctx.textBaseline = 'top';
  dc.ctx.fillText(text, tx, t);
  dc.ctx.textAlign = 'left'; // reset

  const h = dc.ctx.font.match(/(\d+)px/) ? parseInt(dc.ctx.font.match(/(\d+)px/)[1]) : 14;
  return h;
}

export function GetTextExtentPointA(hdc, lpStr, count, lpSize) {
  const dc = getHandle(hdc);
  let text = '';
  for (let i = 0; i < count; i++) { const ch = _MEM[lpStr + i]; if (!ch) break; text += String.fromCharCode(ch); }
  const w = dc && dc.ctx ? Math.ceil(dc.ctx.measureText(text).width) : count * 8;
  const h = 14;
  if (lpSize) { w32(lpSize, 0, w); w32(lpSize, 4, h); }
  return 1;
}

export function GetTextMetricsA(hdc, lptm) {
  const dc = getHandle(hdc);
  const h = dc && dc.ctx && dc.ctx.font ? parseInt(dc.ctx.font) || 14 : 14;
  if (lptm) { w32(lptm, 0, h); /* tmHeight */ }
  return 1;
}

// ── Palette ───────────────────────────────────────────────────────
export function CreatePalette(lpLogPalette) {
  const numEntries = lpLogPalette ? u16(lpLogPalette, 2) : 256;
  const entries = new Uint32Array(numEntries);
  if (lpLogPalette) {
    for (let i = 0; i < numEntries; i++) {
      const off = lpLogPalette + 4 + i * 4;
      entries[i] = _MEM[off] | (_MEM[off+1] << 8) | (_MEM[off+2] << 16) | 0xFF000000;
    }
  }
  return allocHandle({ type: 'PALETTE', entries, numEntries });
}

export function SelectPalette(hdc, hPal, bForce) {
  const dc = getHandle(hdc);
  const pal = getHandle(hPal);
  const prev = dc && dc.palette ? dc.palette._handle : 0;
  if (dc && pal) dc.palette = pal;
  return prev;
}

export function RealizePalette(hdc) { return 0; }
export function AnimatePalette(hPal, start, count, entries) { return 1; }

export function SetDIBColorTable(hdc, start, count, colors) {
  const dc = getHandle(hdc);
  const bmp = dc ? getHandle(dc.selectedBitmap) : null;
  if (bmp && bmp.palette && colors) {
    for (let i = 0; i < count; i++) {
      const off = colors + i * 4;
      // RGBQUAD: blue, green, red, reserved
      bmp.palette[start + i] = _MEM[off+2] | (_MEM[off+1] << 8) | (_MEM[off] << 16) | 0xFF000000;
    }
  }
  return count;
}

export function GetDIBColorTable(hdc, start, count, colors) {
  const dc = getHandle(hdc);
  const bmp = dc ? getHandle(dc.selectedBitmap) : null;
  if (bmp && bmp.palette && colors) {
    for (let i = 0; i < count; i++) {
      const rgba = bmp.palette[start + i] || 0;
      const off = colors + i * 4;
      _MEM[off] = (rgba >> 16) & 0xFF;     // blue
      _MEM[off+1] = (rgba >> 8) & 0xFF;    // green
      _MEM[off+2] = rgba & 0xFF;            // red
      _MEM[off+3] = 0;                       // reserved
    }
  }
  return count;
}

// ── Stock objects ─────────────────────────────────────────────────
const stockObjects = new Map();
function initStockObjects() {
  stockObjects.set(0, allocHandle({ type: 'BRUSH', color: 0xFFFFFF, css: '#fff' })); // WHITE_BRUSH
  stockObjects.set(1, allocHandle({ type: 'BRUSH', color: 0xC0C0C0, css: '#c0c0c0' })); // LTGRAY_BRUSH
  stockObjects.set(2, allocHandle({ type: 'BRUSH', color: 0x808080, css: '#808080' })); // GRAY_BRUSH
  stockObjects.set(3, allocHandle({ type: 'BRUSH', color: 0x404040, css: '#404040' })); // DKGRAY_BRUSH
  stockObjects.set(4, allocHandle({ type: 'BRUSH', color: 0x000000, css: '#000' })); // BLACK_BRUSH
  stockObjects.set(5, allocHandle({ type: 'BRUSH', color: 0, css: 'transparent' })); // NULL_BRUSH
  stockObjects.set(6, allocHandle({ type: 'PEN', style: 0, width: 1, color: 0xFFFFFF, css: '#fff' })); // WHITE_PEN
  stockObjects.set(7, allocHandle({ type: 'PEN', style: 0, width: 1, color: 0x000000, css: '#000' })); // BLACK_PEN
  stockObjects.set(8, allocHandle({ type: 'PEN', style: 5, width: 0, color: 0, css: 'transparent' })); // NULL_PEN
  stockObjects.set(13, allocHandle({ type: 'FONT', cssFont: '16px sans-serif', size: 16, weight: 400, italic: 0 })); // SYSTEM_FONT
  stockObjects.set(17, allocHandle({ type: 'FONT', cssFont: '14px sans-serif', size: 14, weight: 400, italic: 0 })); // DEFAULT_GUI_FONT
}
initStockObjects();

export function GetStockObject(index) {
  return stockObjects.get(index) || 0;
}

// ── Device caps ───────────────────────────────────────────────────
export function GetDeviceCaps(hdc, index) {
  // Common indices the binary checks
  switch (index) {
    case 8: return 1024;    // HORZRES (screen width)
    case 10: return 768;    // VERTRES (screen height)
    case 12: return 8;      // BITSPIXEL
    case 14: return 1;      // PLANES
    case 88: return 96;     // LOGPIXELSX
    case 90: return 96;     // LOGPIXELSY
    case 104: return 256;   // SIZEPALETTE
    default: return 0;
  }
}

// ── Misc stubs that need specific return values ───────────────────
export function GetClientRect(hwnd, lprc) {
  if (!lprc) return 0;
  const w = mainCanvas ? mainCanvas.width : 1024;
  const h = mainCanvas ? mainCanvas.height : 768;
  SetRect(lprc, 0, 0, w, h);
  return 1;
}

export function GetBitmapDimensionEx(hBitmap, lpSize) {
  const bmp = getHandle(hBitmap);
  if (bmp && lpSize) { w32(lpSize, 0, bmp.width || 0); w32(lpSize, 4, bmp.height || 0); }
  return bmp ? 1 : 0;
}

export function InvalidateRect(hwnd, lprc, erase) { return 1; }
export function ValidateRect(hwnd, lprc) { return 1; }
export function UpdateWindow(hwnd) { return 1; }
export function BeginPaint(hwnd, lpPaint) { return GetDC(hwnd); }
export function EndPaint(hwnd, lpPaint) { return 1; }
export function GdiFlush() { return 1; }
