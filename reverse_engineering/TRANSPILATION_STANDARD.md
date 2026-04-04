# Transpilation Standard: Decompiled C → JavaScript

This document defines what "100% faithful transpilation" means for translating
`reverse_engineering/decompiled/block_XXXXXXXX.c` → `reverse_engineering/binary_js/block_XXXXXXXX.js`.

Any deviation from these rules MUST be marked with `// DEVIATION: <reason>` in the JS output.
An accountability agent can verify compliance by checking every rule programmatically.

---

## 1. COMPLETENESS

### 1.1 Every C function produces a JS function
For every `void FUN_XXXXXXXX(...)` or `TYPE FUN_XXXXXXXX(...)` in the C source,
there MUST be a corresponding `export function FUN_XXXXXXXX(...)` in the JS output.

**Violation:** A JS function with an empty body `{ }` when the C function has code.
**Check:** Count functions in C, count non-empty functions in JS. They must match.

### 1.2 No empty bodies
If the C function has any statements (assignments, calls, returns, loops, conditionals),
the JS function MUST have corresponding statements.

**The ONLY acceptable empty JS body** is when the C function body is literally:
```c
void FUN_XXXXXXXX(void) { return; }
```
(i.e., the C body itself is empty or just a return with no side effects).

### 1.3 No "simplified" or "stub" comments as substitutes for code
The following patterns are FORBIDDEN in JS output:
- `// Simplified`
- `// simplified`
- `// stub`
- `// Stub`
- `return 0; // Simplified`
- `return; // stub`
- A comment describing what the function does WITHOUT actual code implementing it

If you cannot translate a line, mark it with `// DEVIATION:` and include the original C.

---

## 2. STRUCTURAL FIDELITY

### 2.1 Every function call in C appears in JS
If the C function calls `thunk_FUN_XXXXXXXX(a, b, c)`, the JS MUST contain
`FUN_XXXXXXXX(a, b, c)`. No calls may be omitted.

**Check:** Extract all `thunk_FUN_` and `FUN_` calls from C, verify each appears in JS.

### 2.2 Every DAT_ read/write in C appears in JS
If the C function reads `DAT_XXXXXXXX` or writes `DAT_XXXXXXXX = value`,
the JS MUST contain the corresponding `G.DAT_XXXXXXXX` access.

**Check:** Extract all `DAT_` references from C function, verify each appears in JS function.

### 2.3 Every branch (if/else/switch) in C appears in JS
If the C has an `if` statement, the JS has an `if` statement with the same condition
(translated to JS syntax). No branches may be collapsed or removed.

### 2.4 Every loop in C appears in JS
`for`, `while`, `do...while` loops in C become equivalent JS loops.
Loop bounds and conditions must match.

### 2.5 Every return value in C appears in JS
If the C function returns a value (`return expr;`), the JS must return the
equivalent expression. Void functions need not have explicit returns.

---

## 3. TRANSLATION RULES

These are the ONLY transformations allowed from C to JS:

### 3.1 Function calls
```
C:  thunk_FUN_XXXXXXXX(args)
JS: FUN_XXXXXXXX(args)

C:  FUN_XXXXXXXX(args)
JS: FUN_XXXXXXXX(args)
```

### 3.2 Global variable access
```
C:  DAT_XXXXXXXX
JS: G.DAT_XXXXXXXX

C:  &DAT_XXXXXXXX
JS: G.DAT_XXXXXXXX  (address-of becomes the array itself)
```

### 3.3 Pointer/array reads
```
C:  *(byte *)(ptr + N)           →  JS: arr[N]  or  tileRead(ptr, N)
C:  *(char *)(ptr + N)           →  JS: s8(arr[N])
C:  *(short *)(&DAT_XXX + off)   →  JS: s16(G.DAT_XXX, off)
C:  *(ushort *)(&DAT_XXX + off)  →  JS: u16(G.DAT_XXX, off)
C:  *(int *)(&DAT_XXX + off)     →  JS: s32(G.DAT_XXX, off)
C:  *(uint *)(&DAT_XXX + off)    →  JS: u32(G.DAT_XXX, off)
C:  (byte)(&DAT_XXX)[off]        →  JS: G.DAT_XXX[off]
C:  (char)(&DAT_XXX)[off]        →  JS: s8(G.DAT_XXX[off])
```

### 3.4 Pointer/array writes
```
C:  *(byte *)(ptr + N) = val          →  JS: arr[N] = val
C:  *(short *)(&DAT_XXX + off) = val  →  JS: w16(G.DAT_XXX, off, val)
C:  *(int *)(&DAT_XXX + off) = val    →  JS: w32(G.DAT_XXX, off, val)
C:  (&DAT_XXX)[off] = val             →  JS: G.DAT_XXX[off] = val
```

### 3.5 Type casts
```
C:  (char)expr      →  JS: s8(expr)
C:  (byte)expr      →  JS: u8(expr)   or  (expr & 0xFF)
C:  (short)expr     →  JS: (expr << 16 >> 16)  or  s16 equivalent
C:  (ushort)expr    →  JS: (expr & 0xFFFF)
C:  (uint)expr      →  JS: (expr >>> 0)
```

### 3.6 String operations
```
C:  FUN_005f22d0(dest, src)    →  JS: FUN_005f22d0(dest, src)  (string copy — call it)
C:  _strlen(s)                 →  JS: _strlen(s)  or equivalent
C:  _sprintf(buf, fmt, args)   →  JS: // DEVIATION: _sprintf — store result in buf
C:  _strcmp(a, b)               →  JS: _strcmp(a, b)  or equivalent
```

### 3.7 C runtime / Win32 API
```
C:  _rand()                    →  JS: _rand()  (local PRNG stub)
C:  SendMessageA(...)          →  JS: // DEVIATION: Win32 API (SendMessageA)
C:  CreateWindowExA(...)       →  JS: // DEVIATION: Win32 API (CreateWindowExA)
C:  InvalidateRect(...)        →  JS: // DEVIATION: Win32 API (InvalidateRect)
C:  GetDlgItem(...)            →  JS: // DEVIATION: Win32 API (GetDlgItem)
C:  SetRect(...)               →  JS: // DEVIATION: Win32 API (SetRect)
```
For Win32/MFC calls: keep ALL surrounding game-state code intact.
Only the specific API call line gets the DEVIATION marker.
Do NOT stub the entire function just because it contains one Win32 call.

### 3.8 Variables
```
C:  int local_8;               →  JS: let local_8;
C:  char cVar1;                →  JS: let cVar1;
C:  undefined4 uVar3;          →  JS: let uVar3;
C:  bool bVar1;                →  JS: let bVar1;
```
Preserve original Ghidra variable names (param_1, local_8, iVar1, etc.).

### 3.9 Goto statements
C goto statements must be restructured into equivalent JS control flow:
- Simple forward gotos → use `if/else` or labeled blocks with `break`
- Backward gotos → use `while` loops with flags
- Complex goto networks → use a `switch` inside a `while(true)` loop

The resulting JS MUST execute the same code paths as the C for all inputs.

### 3.10 Struct/class method calls (MFC `this` pointer)
```
C:  in_ECX  (implicit this pointer in __thiscall)
JS: // DEVIATION: MFC this pointer (in_ECX) — pass as explicit parameter or no-op
```

---

## 4. DEVIATION MARKERS

When a line cannot be translated with 100% fidelity, mark it:
```javascript
// DEVIATION: <category> (<specific API or reason>)
```

Categories:
- `Win32 API` — Windows system call (SendMessageA, CreateWindowExA, etc.)
- `MFC class` — MFC framework method (CSplitterWnd, CPropertySheet, etc.)
- `C runtime` — C library function that needs JS equivalent (_sprintf, _itoa, etc.)
- `GDI` — Graphics device interface (BitBlt, StretchBlt, SelectObject, etc.)
- `File I/O` — File system operations (_fopen, _fread, _fwrite, etc.)
- `SEH` — Structured exception handling (FS_OFFSET, unwind frames)
- `Memory` — Memory allocation (GlobalAlloc, GlobalLock, malloc, free)
- `Pointer arithmetic` — Complex pointer math that doesn't map to JS arrays
- `Assembly` — Inline assembly or CPU-specific operations

Each DEVIATION line MUST include the original C expression in the comment:
```javascript
// DEVIATION: Win32 API (SendMessageA(hWnd, 0x111, param_3, 0))
```

---

## 5. VERIFICATION CHECKLIST

For each function, an auditor can verify:

- [ ] JS function exists with same name as C function
- [ ] JS function has non-empty body (unless C body is empty)
- [ ] Every `thunk_FUN_` / `FUN_` call in C appears in JS
- [ ] Every `DAT_` reference in C appears as `G.DAT_` in JS
- [ ] Every `if`/`else` branch in C has a corresponding JS branch
- [ ] Every loop in C has a corresponding JS loop
- [ ] Every `return expr` in C has a corresponding JS return
- [ ] No `// Simplified`, `// stub`, or comment-only bodies
- [ ] All Win32/MFC/GDI calls marked with `// DEVIATION:`
- [ ] Original Ghidra variable names preserved (param_1, local_8, etc.)

---

## 6. FILE ORGANIZATION

Source: `reverse_engineering/decompiled/block_XXXXXXXX.c`
Output: `reverse_engineering/binary_js/block_XXXXXXXX.js`

The JS file header:
```javascript
// ═══════════════════════════════════════════════════════════════════
// block_XXXXXXXX.js — Mechanical transpilation of block_XXXXXXXX.c
//
// Source: reverse_engineering/decompiled/block_XXXXXXXX.c
// Standard: reverse_engineering/TRANSPILATION_STANDARD.md
// ═══════════════════════════════════════════════════════════════════
```

Each function:
```javascript
// Source: decompiled/block_XXXXXXXX.c FUN_XXXXXXXX (SIZE bytes)
export function FUN_XXXXXXXX(param_1, param_2) {
  // ... line-by-line translation ...
}
```

---

## 7. WHAT THIS STANDARD DOES NOT COVER

- How `charlizationv4/` transforms binary_js files (that's the transform pipeline's job)
- Runtime correctness (that's verified by testing against real Civ2)
- Performance (faithfulness to C takes priority over JS idioms)
- Code style (match the C structure, not JS conventions)
