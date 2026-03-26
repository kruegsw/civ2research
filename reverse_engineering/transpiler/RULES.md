# Transpiler Rules: C → JS (1:1 Line Mapping)

Source: `reverse_engineering/decompiled/block_XXXXXXXX.c` (Ghidra output)
Output: `reverse_engineering/transpiler/output/block_XXXXXXXX.js`

## Core Principle

Every C line produces exactly one JS line at the same line number.
Helper functions (goto, etc.) are appended at the end of the file.
Verification is a side-by-side diff.

---

## Standard Conversions (98% of all lines)

### Function signatures
```
C:   void FUN_004e0140(int param_1, int param_2)
JS:  export function FUN_004e0140(param_1, param_2) {
```
Drop return type and parameter types. Add `export`.

### Variable declarations
```
C:   int iVar1;
JS:  let iVar1;
```
Drop type. `int` / `uint` / `char` / `byte` / `short` / `ushort` all become `let`.

### Function calls
```
C:   thunk_FUN_004e015a(param_1, 0x32);
JS:  FUN_004e015a(param_1, 0x32);
```
Drop `thunk_` prefix.

### Byte array read
```
C:   (&DAT_0064c6be)[param_1 * 0x594]
JS:  DAT_0064c6be[param_1 * 0x594]
```
Drop `(&` and `)`. Direct byte array access.

### Signed byte read (char cast)
```
C:   (char)(&DAT_0064c6be)[param_1 * 0x594]
JS:  s8(DAT_0064c6be[param_1 * 0x594])
```

### Unsigned byte read (byte cast)
```
C:   (byte)(&DAT_0064c6be)[param_1 * 0x594]
JS:  u8(DAT_0064c6be[param_1 * 0x594])
```

### Unsigned byte from nested cast
```
C:   (uint)(byte)(&DAT_0064c6be)[param_1 * 0x594]
JS:  u8(DAT_0064c6be[param_1 * 0x594])
```
Outer `(uint)` is a no-op after `u8()`.

### 16-bit signed read (short pointer)
```
C:   *(short *)(&DAT_0064c708 + param_1 * 0x594)
JS:  s16(DAT_0064c708, param_1 * 0x594)
```

### 16-bit unsigned read (ushort pointer)
```
C:   *(ushort *)(&DAT_0064c70e + param_1 * 0x594)
JS:  u16(DAT_0064c70e, param_1 * 0x594)
```

### 32-bit signed read (int pointer)
```
C:   *(int *)(&DAT_0064c6a2 + param_1 * 0x594)
JS:  s32(DAT_0064c6a2, param_1 * 0x594)
```

### 32-bit unsigned read (uint pointer)
```
C:   *(uint *)(&DAT_0064c6c0 + param_1 * 4 + param_2 * 0x594)
JS:  u32(DAT_0064c6c0, param_1 * 4 + param_2 * 0x594)
```

### 32-bit read (undefined4 pointer)
```
C:   *(undefined4 *)(&DAT_0064b9c0 + iVar1 * 4)
JS:  s32(DAT_0064b9c0, iVar1 * 4)
```

### 16-bit write
```
C:   *(ushort *)(&DAT_0064c6a0 + param_1 * 0x594) = val;
JS:  w16(DAT_0064c6a0, param_1 * 0x594, val);
```

### 32-bit write
```
C:   *(uint *)(&DAT_0064c6c0 + expr) = val;
JS:  w32(DAT_0064c6c0, expr, val);
```

### 32-bit read-modify-write
```
C:   *(uint *)(&DAT + expr) = *(uint *)(&DAT + expr) | 0x100;
JS:  w32(DAT, expr, u32(DAT, expr) | 0x100);
```

### Byte write (array assignment)
```
C:   (&DAT_0064c6be)[param_1 * 0x594] = val;
JS:  DAT_0064c6be[param_1 * 0x594] = val;
```

### Equality operators
```
C:   ==    !=
JS:  ===   !==
```

### Type casts (drop most)
```
C:   (int)expr          →  expr            (no-op in JS)
C:   (uint)expr         →  (expr) >>> 0    (only when unsigned matters)
C:   (short)expr        →  ((expr) << 16 >> 16)   (sign-extend 16-bit)
C:   (bool)expr         →  (expr) ? 1 : 0
```

### String constants
```
C:   s_GREETINGS_00626a3c
JS:  s_GREETINGS_00626a3c
```
Keep as-is. These are string label references.

### SEH (Structured Exception Handling)
```
C:   *unaff_FS_OFFSET = &uStack_10;
JS:  // DEVIATION: SEH setup
```

```
C:   *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
JS:  // DEVIATION: SEH epilog
```

### Return
```
C:   return;
JS:  return;
```
For void functions, can also just close with `}`.

---

## Edge Cases

### Register parameters (in_ECX, in_EAX)
```
C:   void FUN_XXX(int param_1) { int in_ECX; ... }
JS:  export function FUN_XXX(in_ECX, param_1) { ... }
```
Treat as additional parameter, listed first.

### Callee-saved registers (unaff_ESI, unaff_EDI)
Same as register parameters — add as function parameter.

### Sub-field read (._N_M_)
```
C:   DAT_00655aea._1_1_          (byte at offset 1 of a 4-byte value)
JS:  ((DAT_00655aea >> 8) & 0xFF)
```
`._N_M_` means: offset N bytes, read M bytes. Convert to shift + mask.

### Sub-field write (._N_M_ as lvalue)
```
C:   local_8._0_1_ = 4;
JS:  local_8 = (local_8 & 0xFFFFFF00) | 4;
```
Mask out the target bytes, OR in the new value.

### CONCAT (byte merging)
```
C:   CONCAT31(local_8._1_3_, 1)
JS:  ((local_8 & 0xFFFFFF00) | 1)
```
`CONCAT31` = combine 3 high bytes with 1 low byte.

### Sign bit extraction
```
C:   x >> 0x1f
JS:  x >> 31
```
Identical — extracts sign bit for signed division rounding.

### Comma operator in conditions
```
C:   if ((cond1) && (DAT_X = 0, cond2))
JS:  if (cond1) { DAT_X = 0; }
     if (cond1 && cond2)
```
Split the side-effect into a separate statement. Two JS lines for one C line
(the only 1:1 exception — mark with `// COMMA` comment).

### bRam (direct memory byte)
```
C:   bRam0064e854
JS:  DAT_0064e854
```
A named byte at a fixed address. Same as a DAT_ global.

### Switch with goto labels (switchD_ / caseD_)
Handled by the goto helper approach (see below).

---

## Goto Handling

### Design Principles
1. `goto LAB_X` → `LAB_X_helper(params); return;` (one line, 1:1)
2. Code at the label site **stays in place** for 1:1 auditing — it is NOT removed
3. The same code is **also duplicated** in a helper function appended at end of file
4. On the fall-through path, the in-place code executes normally
5. On the goto path, the helper executes (in-place code is dead but kept for audit)
6. In-place code at the label is marked: `// LAB_X: (code below also in LAB_X_helper, kept for 1:1 audit)`

### Forward goto
```
C:                                        JS:
  goto LAB_X;                               LAB_X_helper(p1, p2); return;
  ...more code...                           ...more code...
LAB_X:                                    // LAB_X: (code below also in LAB_X_helper, kept for 1:1 audit)
  cleanup;                                  cleanup;
  return;                                   return;
```
Helper appended at end of file:
```js
function LAB_X_helper(p1, p2) {
  cleanup;
  return;
}
```
The fall-through path reaches `cleanup; return;` in-place. The goto path
calls `LAB_X_helper()` which runs the same code. Both are correct.
The in-place code is "dead" on the goto path but stays for line-by-line auditability.

### Backward goto (recursive helper)
```
C:                                        JS:
LAB_X:                                    // LAB_X: (code below also in LAB_X_helper, kept for 1:1 audit)
  show_menu;                                show_menu;
  if (retry) goto LAB_X;                   if (retry) { LAB_X_helper(p1); return; }
  done;                                     done;
```
Helper calls itself recursively (safe — these are menu retries, not tight loops):
```js
function LAB_X_helper(p1) {
  show_menu;
  if (retry) { LAB_X_helper(p1); return; }
  done;
}
```
Statistics: 75 functions have backward gotos. All are menu retry / conditional
retry patterns (the decompiler already converted tight loops to `do-while`).
Maximum recursion depth is bounded by user interaction count.

### Variable passing
Pass all variables used by the labeled block as arguments to the helper.
Since the caller always does `helper(); return;` immediately, write-back
of modified locals is not needed — the caller returns right after the call.

### Statistics
- 4,277 functions (97%): no goto — fully mechanical 1:1
- 74 functions (2%): forward goto only — helper + in-place code
- 75 functions (2%): backward goto — recursive helper + in-place code

---

## Address-of-Local (`&local_XX`) — 1,696 instances

JS primitives are pass-by-value. C passes locals by reference with `&`.
Solution: declare referenced locals as single-element arrays from the start.

### Transpiler detection
Scan each function body for `&local_XX`. Any local that has `&` taken
gets declared as an array. Scan function signatures for `TYPE *param_N` —
those parameters receive arrays.

### Declaration
```
C:   int local_14;                    // has &local_14 somewhere below
JS:  let local_14 = [0];
```

### Read/write
```
C:   local_14 = 5;                   JS:  local_14[0] = 5;
C:   x = local_14 + 1;              JS:  x = local_14[0] + 1;
```

### Call site (drop the `&`)
```
C:   FUN_005adfd9(&local_14, &local_2c);
JS:  FUN_005adfd9(local_14, local_2c);
```
The array IS the reference. No `&` needed.

### Callee (pointer params)
```
C:   void FUN_XXX(int *param_3, int *param_4) {
       *param_3 = value;             // simple deref (1,160 instances)
       x = param_3[2];              // indexed access (555 instances)
     }
JS:  export function FUN_XXX(param_3, param_4) {
       param_3[0] = value;
       x = param_3[2];              // same syntax — already works!
     }
```
`*param_N` → `param_N[0]`. `param_N[i]` is unchanged.

### Why this works
- Arrays are pass-by-reference in JS — callee modifications are visible to caller
- `param[0]` maps to `*param` (simple deref)
- `param[i]` maps to `param[i]` (indexed access — identical syntax)
- Caller does `helper(); return;` or reads locals after call — both work
- Verified: ALL 1,715 pointer parameter usages are either simple deref or indexed access

---

## Double Pointer Dereference — 163 instances — ALL DEVIATION

All 163 instances are MFC/framework patterns: C++ vtable chains, linked list
prev/next updates, MFC object member traversal. None access game state.
Handled as DEVIATION stubs — no special transpiler rule needed.

## 64-bit Arithmetic (longlong) — 69 instances

61 are in framework blocks (DEVIATION stubs). The 8 in game logic are all
the same pattern: widening a division to avoid 32-bit overflow.

```
C:   (int)(0x708 / (longlong)(expr))
JS:  (0x708 / (expr)) | 0
```

JS 64-bit floats have 53 bits of integer precision — more than enough for
these divisions. `| 0` truncates to 32-bit, matching the C `(int)` cast.
Mechanical rule.

## Function Pointer Calls — 5 instances

158 total, 153 in framework (DEVIATION). Of the 5 in game logic:
- 3 are MFC virtual calls via `in_ECX` — DEVIATION stubs
- 2 are global callbacks — mechanical rule:

```
C:   if (DAT_006ac888 != (code *)0x0) { (*DAT_006ac888)(); }
JS:  if (DAT_006ac888 !== null) { DAT_006ac888(); }
```

`(*DAT_XXX)(args)` → `DAT_XXX(args)`. `(code *)0x0` → `null`.
All 5 solved mechanically. Zero manual work.

---

## All Edge Cases — Final Status

| Edge case | Count | Status |
|-----------|-------|--------|
| No goto | 4,277 funcs | Mechanical 1:1 |
| Forward goto | 74 funcs | Helper function (solved) |
| Backward goto | 75 funcs | Recursive helper (solved) |
| `in_ECX/EAX` register params | 8,428 | Extra function parameter (solved) |
| `&local_XX` address of local | 1,696 | Array `[0]` convention (solved) |
| `unaff_ESI/EDI` | 727 | Extra function parameter (solved) |
| `._N_M_` bitfield write | 573 | Mask + shift (solved) |
| `._N_M_` sub-field read | 58 | Shift + mask (solved) |
| `>> 0x1f` sign bit | 268 | `>> 31` — identical (solved) |
| `CONCAT` byte merge | 233 | Bit shift + OR (solved) |
| `switchD_/caseD_` labels | 165 | Goto helper (solved) |
| Double pointer deref | 163 | All DEVIATION (solved) |
| `longlong` 64-bit | 69 | `(expr) \| 0` — JS floats sufficient (solved) |
| Nested casts | 42 | Simplify to innermost (solved) |
| Comma in condition | 14 | Split to separate statement (solved) |
| `va_list` | 11 | Framework only — stub (solved) |
| Function pointer calls | 5 | 3 DEVIATION + 2 global callback rule (solved) |
| `bRam` | 3 | `DAT_XXX` direct (solved) |

---

## Memory Helpers (imported from mem.js)

| Helper | Reads | Bytes | Signed |
|--------|-------|-------|--------|
| `s8(val)` | value | 1 | yes |
| `u8(val)` | value | 1 | no |
| `s16(arr, off)` | array+offset | 2 | yes |
| `u16(arr, off)` | array+offset | 2 | no |
| `s32(arr, off)` | array+offset | 4 | yes |
| `u32(arr, off)` | array+offset | 4 | no |
| `w16(arr, off, val)` | write | 2 | — |
| `w32(arr, off, val)` | write | 4 | — |

All arrays are `Uint8Array`. Offsets are always byte offsets matching the C.
No typed arrays with element size > 1 — this eliminates the stride bug class entirely.
