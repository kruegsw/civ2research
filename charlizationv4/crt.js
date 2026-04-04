// ═══════════════════════════════════════════════════════════════════
// crt.js — C Runtime Library implementations for flat memory model
//
// These functions operate on G._MEM (the flat byte array) the same
// way the C runtime operates on the process's memory space.
//
// Game logic depends on these working correctly: _rand for combat
// and AI decisions, _strlen/_strcmp for string operations, _memset
// for zeroing structures, etc.
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';
import { s8, s32, w32, _MEM } from './mem.js';
import { GlobalAlloc } from './extern-stubs.js';

// ── Random number generator (MSVC-compatible) ──
// Binary uses MSVC's rand(): seed = seed * 214013 + 2531011
// Returns (seed >> 16) & 0x7FFF (range 0-32767)
let _randSeed = 0;

export function _srand(seed) {
  _randSeed = seed >>> 0;
}

export function _rand() {
  _randSeed = (Math.imul(_randSeed, 214013) + 2531011) >>> 0;
  return (_randSeed >>> 16) & 0x7FFF;
}

// ── Memory operations ──
// These operate on G._MEM — the shared flat memory buffer

export function _memset(dest, val, count) {
  if (dest == null) return dest;
  const v = val & 0xFF;
  if (typeof dest === 'number') {
    // dest is an offset into flat memory (_MEM)
    for (let i = 0; i < count; i++) _MEM[dest + i] = v;
  } else {
    // dest is a Uint8Array
    for (let i = 0; i < count; i++) dest[i] = v;
  }
  return dest;
}

export function _memcpy(dest, src, count) {
  if (dest == null || src == null) return dest;
  const dNum = typeof dest === 'number';
  const sNum = typeof src === 'number';
  for (let i = 0; i < count; i++) {
    const val = sNum ? _MEM[src + i] : src[i];
    if (dNum) _MEM[dest + i] = val;
    else dest[i] = val;
  }
  return dest;
}

export function memcmp(a, b, count) {
  if (!a || !b) return 0;
  for (let i = 0; i < count; i++) {
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
  }
  return 0;
}

// ── String operations ──
// Strings in the binary are null-terminated byte arrays in G._MEM

export function _strlen(str) {
  if (!str || typeof str === 'number') return 0;
  let len = 0;
  while (str[len] !== 0 && len < 65536) len++;
  return len;
}

export function _strcmp(a, b) {
  if (!a || !b) return 0;
  let i = 0;
  while (a[i] !== 0 && b[i] !== 0 && i < 65536) {
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
    i++;
  }
  if (a[i] === 0 && b[i] === 0) return 0;
  return a[i] === 0 ? -1 : 1;
}

export function _strncmp(a, b, n) {
  if (!a || !b) return 0;
  for (let i = 0; i < n; i++) {
    if (a[i] === 0 && b[i] === 0) return 0;
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
    if (a[i] === 0) return -1;
    if (b[i] === 0) return 1;
  }
  return 0;
}

export function _strcpy(dest, src) {
  if (!dest || !src) return dest;
  let i = 0;
  while (src[i] !== 0 && i < 65536) {
    dest[i] = src[i];
    i++;
  }
  dest[i] = 0;
  return dest;
}

export function _strncpy(dest, src, n) {
  if (!dest || !src) return dest;
  let i = 0;
  while (i < n && src[i] !== 0) {
    dest[i] = src[i];
    i++;
  }
  while (i < n) { dest[i] = 0; i++; }
  return dest;
}

export function _strcat(dest, src) {
  if (!dest || !src) return dest;
  let dLen = _strlen(dest);
  let i = 0;
  while (src[i] !== 0 && i < 65536) {
    dest[dLen + i] = src[i];
    i++;
  }
  dest[dLen + i] = 0;
  return dest;
}

export function _strncat(dest, src, n) {
  if (!dest || !src) return dest;
  let dLen = _strlen(dest);
  let i = 0;
  while (i < n && src[i] !== 0) {
    dest[dLen + i] = src[i];
    i++;
  }
  dest[dLen + i] = 0;
  return dest;
}

export function _strchr(str, ch) {
  if (!str) return 0;
  const c = ch & 0xFF;
  let i = 0;
  while (str[i] !== 0 && i < 65536) {
    if (str[i] === c) return str.subarray(i);
    i++;
  }
  if (c === 0) return str.subarray(i);
  return 0;
}

export function _strrchr(str, ch) {
  if (!str) return 0;
  const c = ch & 0xFF;
  let last = -1;
  let i = 0;
  while (str[i] !== 0 && i < 65536) {
    if (str[i] === c) last = i;
    i++;
  }
  if (c === 0) return str.subarray(i);
  return last >= 0 ? str.subarray(last) : 0;
}

export function _strstr(haystack, needle) {
  if (!haystack || !needle) return 0;
  const nLen = _strlen(needle);
  if (nLen === 0) return haystack;
  const hLen = _strlen(haystack);
  for (let i = 0; i <= hLen - nLen; i++) {
    let match = true;
    for (let j = 0; j < nLen; j++) {
      if (haystack[i + j] !== needle[j]) { match = false; break; }
    }
    if (match) return haystack.subarray(i);
  }
  return 0;
}

// ── Numeric conversions ──

export function _atoi(str) {
  if (!str || typeof str === 'number') return 0;
  let i = 0;
  while (str[i] === 32 || str[i] === 9) i++; // skip whitespace
  let sign = 1;
  if (str[i] === 45) { sign = -1; i++; } // '-'
  else if (str[i] === 43) { i++; } // '+'
  let result = 0;
  while (str[i] >= 48 && str[i] <= 57) { // '0'-'9'
    result = result * 10 + (str[i] - 48);
    i++;
  }
  return sign * result;
}

export function _atol(str) { return _atoi(str); }

// ── Character operations ──

export function _tolower(ch) {
  if (ch >= 65 && ch <= 90) return ch + 32; // A-Z → a-z
  return ch;
}

export function __toupper_lk(ch) {
  if (ch >= 97 && ch <= 122) return ch - 32; // a-z → A-Z
  return ch;
}

export function _isalpha(ch) {
  return ((ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122)) ? 1 : 0;
}

export function _isdigit(ch) {
  return (ch >= 48 && ch <= 57) ? 1 : 0;
}

// ── I/O stubs (log but don't crash) ──
// File I/O in the binary reads RULES.TXT, saves, etc.
// We handle these through the loader, so these are safe no-ops.

export function _fopen() { return 0; }
export function _fclose() { return 0; }
export function _fread() { return 0; }
export function _fwrite() { return 0; }
export function _fgets() { return 0; }
export function _fputc() { return 0; }
export function _fputs() { return 0; }
export function _fseek() { return 0; }
export function _ftell() { return 0; }
export function _fflush() { return 0; }
export function _fprintf() { return 0; }
export function _rewind() {}
export function _remove() { return 0; }
export function _printf() { return 0; }
export function _sprintf() { return 0; }
export function __snprintf() { return 0; }

// ── Misc ──
export function _time() { return Math.floor(Date.now() / 1000); }
export function _abort() { throw new Error('C runtime: abort() called'); }
export function _exit() {}
export function _atexit() {}
export function __chdir() { return 0; }
export function __getcwd() { return 0; }
export function _malloc(size) {
  return GlobalAlloc(0, size || 65536);
}
export function _wcslen() { return 0; }
export function _wcstombs() { return 0; }
export function _wctomb() { return 0; }
export function _setvbuf() { return 0; }

// ── Win32 API stubs (UI operations — log and return safe defaults) ──
export function SetRect(rect, l, t, r, b) {
  if (rect && typeof rect !== 'number' && typeof rect !== 'string' && rect.length >= 16) {
    w32(rect, 0, l); w32(rect, 4, t); w32(rect, 8, r); w32(rect, 12, b);
  }
  return 1;
}

export function GetSystemMetrics(idx) {
  // Return reasonable defaults for common metrics
  if (idx === 0) return 1024;  // SM_CXSCREEN
  if (idx === 1) return 768;   // SM_CYSCREEN
  if (idx === 2) return 16;    // SM_CXVSCROLL
  return 0;
}

export function GetTickCount() { return Date.now() & 0x7FFFFFFF; }


// ── C++ memory management ──
export function operator_new(size) { return GlobalAlloc(0, size || 1024); }
export function operator_delete() {}
export function __nh_malloc(size) { return GlobalAlloc(0, size || 1024); }
export function __nh_malloc_dbg(size) { return GlobalAlloc(0, size || 1024); }
export function __nh_malloc_base(size) { return GlobalAlloc(0, size || 1024); }
export function __malloc_dbg(size) { return GlobalAlloc(0, size || 1024); }
export function __malloc_base(size) { return GlobalAlloc(0, size || 1024); }
export function __calloc_dbg(num, size) { return GlobalAlloc(0, (num * size) || 1024); }
export function __heap_alloc_dbg(size) { return GlobalAlloc(0, size || 1024); }
export function __heap_alloc_base(size) { return GlobalAlloc(0, size || 1024); }
export function __realloc_dbg(ptr, size) { return GlobalAlloc(0, size || 1024); }
export function __realloc_base(ptr, size) { return GlobalAlloc(0, size || 1024); }
export function __free_dbg() {}
export function __free_base() {}
export function __expand() { return 0; }
export function __expand_dbg() { return 0; }
export function __expand_base() { return 0; }
export function __msize() { return 1024; }
export function __msize_dbg() { return 1024; }

// ── Windows message pump (headless: no messages) ──
export function PeekMessageA() { return 0; }
export function TranslateMessage() { return 0; }
export function DispatchMessageA() { return 0; }
export function GetMessageA() { return 0; }
export function PostMessageA() { return 0; }
export function SendMessageA() { return 0; }


// ── GDI message pump functions (headless: all no-ops) ──
export function GdiFlush() { return 1; }
export function gdi_BA4F() {
  // Called from FUN_0040ef50 (message pump) inside rendering loops.
  // in_ECX is now a numeric offset into _MEM (not a Uint8Array).
  // w32(in_ECX, 0x8c, 1) writes to _MEM[in_ECX + 0x8c].
  // We clear those same locations so rendering loops exit.
  const ecx = globalThis.in_ECX;
  if (typeof ecx === 'number' && globalThis.G) {
    const m = globalThis.G._MEM;
    m[ecx + 0x8c] = 0; m[ecx + 0x8d] = 0; m[ecx + 0x8e] = 0; m[ecx + 0x8f] = 0;
    m[ecx + 0x3d] |= 4;
  }
  return 0;
}
export function gdi_BB76() { return 0; }
