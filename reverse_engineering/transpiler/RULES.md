# Transpiler Rules: C → JS (1:1 Line Mapping)

Source: `reverse_engineering/decompiled/block_XXXXXXXX.c` (Ghidra output)
Output: `reverse_engineering/transpiler/output/block_XXXXXXXX.js`

---

## Principles

**1. The transpiler is the only thing that writes JS output.**
No human, no agent, no Claude instance ever hand-edits `transpiler/output/`.
If the output is wrong, fix the rule in `transpile.cjs` and re-run.

**2. Re-run and diff is the only definition of "done."**
No claiming "fully audited" or "verified." Run the transpiler, diff against
previous output. Zero diff = nothing changed. Non-zero diff = review the
changed lines. The diff IS the audit.

**3. One rule, one place.**
Every conversion rule lives in `transpile.cjs`. If a pattern is handled
wrong, the fix is exactly one code change in the transpiler. Never patch
the output.

**4. When a rule is missing or wrong: flag it.**
If the transpiler encounters a C pattern it doesn't recognize, it emits:
`/* UNKNOWN_RULE: <original C expression> */`
The original C is preserved in the comment. `grep -r UNKNOWN_RULE output/`
shows all unhandled patterns. Design the rule, add to RULES.md, implement
in `transpile.cjs`, re-run. UNKNOWN_RULE count hitting zero = transpilation
complete.

**5. Test on known block first.**
Every rule change gets tested on block_004E0000 (city yields, well-understood)
before running on all 34 blocks.

**6. The C source is read-only.**
`reverse_engineering/decompiled/` is never modified.

**7. Every C line produces exactly one JS line at the same line number.**
Lines 1 through N of the JS correspond 1:1 with lines 1 through N of the C.
Goto helper functions are appended AFTER line N — they are bonus lines with
no C equivalent. An auditor only checks lines 1-N against the C source. The
helpers are duplicates of code already visible in the main body.

---

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
Drop type. `int` / `uint` / `char` / `byte` / `short` / `ushort` / `undefined` /
`undefined2` / `undefined4` / `bool` / `long` / `ulong` / `code` all become `let`.

### Function calls
```
C:   thunk_FUN_004e015a(param_1, 0x32);
JS:  FUN_004e015a(param_1, 0x32);
```
Drop `thunk_` prefix. Also drop `FID_conflict_` prefix (C runtime name conflicts).

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

### Typed pointer reads — general rule
`*(TYPE *)(base + offset)` → helper function. Works with ANY base expression:
`&DAT_XXXXXXXX`, `param_N`, `local_N`, `in_ECX`, `iVarN`, or any computed address.

| C type | Read helper |
|--------|-------------|
| `*(short *)(base + off)` | `s16(base, off)` |
| `*(ushort *)(base + off)` | `u16(base, off)` |
| `*(int *)(base + off)` | `s32(base, off)` |
| `*(uint *)(base + off)` | `u32(base, off)` |
| `*(undefined4 *)(base + off)` | `s32(base, off)` |
| `*(undefined2 *)(base + off)` | `s16(base, off)` |

For `&DAT_` bases, drop the `&`: `*(int *)(&DAT_XXX + off)` → `s32(DAT_XXX, off)`.
For other bases, pass through: `*(int *)(param_1 + 0xc)` → `s32(param_1, 0xc)`.

### Typed pointer writes — general rule
Same pattern, any base. Signedness doesn't matter for writes.

| C type | Write helper |
|--------|--------------|
| `*(short *)(base + off) = val` | `w16(base, off, val)` |
| `*(ushort *)(base + off) = val` | `w16(base, off, val)` |
| `*(int *)(base + off) = val` | `w32(base, off, val)` |
| `*(uint *)(base + off) = val` | `w32(base, off, val)` |
| `*(undefined4 *)(base + off) = val` | `w32(base, off, val)` |
| `*(undefined2 *)(base + off) = val` | `w16(base, off, val)` |

### Read-modify-write
```
C:   *(uint *)(base + expr) = *(uint *)(base + expr) | 0x100;
JS:  w32(base, expr, u32(base, expr) | 0x100);
```

### Byte write (array assignment)
```
C:   (&DAT_0064c6be)[param_1 * 0x594] = val;
JS:  DAT_0064c6be[param_1 * 0x594] = val;
```

### Byte write with cast on lvalue
```
C:   (char)(&DAT_XXX)[offset] = val;
JS:  DAT_XXX[offset] = val;
```
Cast on the target is dropped — writing to a byte array truncates automatically.

### Byte write with cast on RHS
```
C:   (&DAT_XXX)[offset] = (byte)expr;
JS:  DAT_XXX[offset] = u8(expr);
```
Keep `u8()` for explicitness — the byte array truncates anyway, but `u8()`
makes the intent visible for auditing.

### Equality operators
```
C:   ==    !=
JS:  ===   !==
```

### Standard control flow
`if`, `else`, `for`, `while`, `do { } while`, `switch`, `case`, `default`,
`break`, `continue` — all pass through unchanged. Only conversion within
these is `==` → `===` and `!=` → `!==`.

### Type casts
```
C:   (int)expr          →  expr            (no-op — drop, preserve parens)
C:   (uint)expr         →  (expr) >>> 0    (always — see note)
C:   (char)expr         →  s8(expr)        (sign-extend to signed byte)
C:   (byte)expr         →  u8(expr)        (mask to unsigned byte)
C:   (short)expr        →  ((expr) << 16 >> 16)   (sign-extend 16-bit)
C:   (ushort)expr       →  (expr) & 0xFFFF (mask to unsigned 16-bit)
C:   (bool)expr         →  (expr) ? 1 : 0
```

**`(uint)` always emits `>>> 0`** — EXCEPT after an unsigned helper (`u8()`,
`u16()`, `u32()`), where it's a no-op (already unsigned). So:
- `(uint)(byte)expr` → `u8(expr)` (no `>>> 0`)
- `(uint)expr` (no unsigned helper) → `(expr) >>> 0`

**`(int)` is a no-op** — EXCEPT after `>>> 0`. If the expression contains
`>>> 0` (from a `(uint)` cast), `(int)` restores signed interpretation:
- `(int)(uint)expr` → `(expr) | 0` (not `(expr) >>> 0`)
- `(int)expr` (no `>>> 0` involved) → `expr` (drop)
- `(int)(longlong_expr)` → `| 0` (covered by longlong rule)

**`(char)` and `(byte)` work on any expression** — whether from a memory
read or a computed value. `s8()` and `u8()` are value-based helpers that
sign/zero-extend any input.

**Ghidra `undefined` type casts:**
```
C:   (undefined1)expr    →  u8(expr)       (same as byte)
C:   (undefined2)expr    →  (expr) & 0xFFFF  (same as ushort)
C:   (undefined4)expr    →  expr           (no-op, like int)
```

**Operator precedence after cast removal:** When dropping `(int)`,
preserve parentheses around the operand if it's part of a binary expression.
`(int)a * b` → `(a) * b`. Ghidra output is already heavily parenthesized,
so this rarely matters in practice.

### Ternary operator
```
C:   cond ? a : b
JS:  cond ? a : b
```
Passes through unchanged.

### Negative hex constants
```
C:   param_1 * -0x1c
JS:  param_1 * -0x1c
```
Passes through unchanged. JS accepts this syntax.

### Null pointer checks
```
C:   expr != (TYPE *)0x0       (any type: code *, int *, undefined4 *, etc.)
JS:  expr !== null
```
`(TYPE *)0x0` → `null` for any pointer type.

### Character literals
```
C:   '\0'         →  0
C:   '\x05'       →  0x5
C:   '\a'         →  7         (bell = 7)
C:   '\n'         →  0xa
C:   '\x01'       →  1
```
Strip quotes, convert to numeric value.

### Unsigned integer suffix
```
C:   0x1fU        →  0x1f
C:   3U           →  3
C:   0xfffffffeU  →  0xfffffffe
```
Strip the `U`. JS numbers handle the full unsigned 32-bit range.

### String and pointer constants
```
C:   s_GREETINGS_00626a3c      →  s_GREETINGS_00626a3c
C:   PTR_s_CIV2_DAT_0062cec8  →  PTR_s_CIV2_DAT_0062cec8
C:   PTR_FUN_00410070          →  PTR_FUN_00410070
```
Keep as-is. These are string and pointer label references.

### SEH (Structured Exception Handling)
```
C:   *unaff_FS_OFFSET = &uStack_10;
JS:  // DEVIATION: SEH setup
```

```
C:   *unaff_FS_OFFSET = *(undefined4 *)(unaff_EBP + -0xc);
JS:  // DEVIATION: SEH epilog
```

### DEVIATION stub bodies
Functions that are entirely Win32/MFC/framework get empty bodies:
```js
export function FUN_XXXXXXXX(param_1, param_2) {
  // DEVIATION: Win32 API — <brief description from C>
}
```
If the C function returns a value, add `return 0;`.

**How the transpiler identifies DEVIATION functions:** It does NOT pre-classify.
The transpiler attempts to transpile every function mechanically. Win32 API
calls (`SendMessageA`, `BitBlt`, `CreateWindowExA`, etc.) and MFC patterns
(`CRichEditDoc::`, `_Timevec::`) will hit `UNKNOWN_RULE` flags naturally.
Functions where most/all lines are `UNKNOWN_RULE` are then classified as
DEVIATION in a second pass, and their bodies are replaced with the stub
format above.

### Empty C functions
Some Ghidra functions have truly empty bodies (just `{ return; }`).
Transpile normally — emit an empty exported function.

### Return with value
```
C:   return local_c;
JS:  return local_c;
```
Pass through as-is. If `local_c` has `&` taken, it becomes `return local_c[0];`.

### Return
```
C:   return;
JS:  return;
```
For void functions, can also just close with `}`.

### Composability (inside-out rule)
When a line contains multiple patterns, resolve from innermost to outermost.
The output of an inner rule becomes input to the outer rule.
```
C:   *(int *)(&DAT_0064c6a2 + (byte)(&DAT_0064c6be)[param_1 * 0x594] * 0x594)
     1. innermost: (&DAT_0064c6be)[param_1 * 0x594]  →  DAT_0064c6be[param_1 * 0x594]
     2. cast:      (byte)(...)                         →  u8(...)
     3. outermost: *(int *)(&DAT + offset)             →  s32(DAT, offset)
JS:  s32(DAT_0064c6a2, u8(DAT_0064c6be[param_1 * 0x594]) * 0x594)
```

### Output flags
Only two flags appear in the output:
- `// DEVIATION: <reason>` — Win32/MFC/SEH code that has no JS equivalent
- `/* UNKNOWN_RULE: <original C> */` — pattern the transpiler doesn't recognize

---

## Edge Cases

### Register parameters (in_ECX, in_EAX) and callee-saved (unaff_ESI, unaff_EDI)
```
C:   void FUN_XXX(int param_1) { int in_ECX; ... }
JS:  export function FUN_XXX(in_ECX, param_1) { ... }
```
Treat as additional parameters. Canonical ordering when multiple are present:
`in_EAX, in_ECX, in_EDX, unaff_ESI, unaff_EDI, param_1, param_2, ...`

The original `int in_ECX;` declaration line in the C body becomes a comment
to preserve line numbering:
```
C:   int in_ECX;
JS:  // in_ECX → promoted to parameter
```

### Sub-field read (._N_M_)
```
C:   DAT_00655aea._1_1_          (byte at offset 1 of a 4-byte value)
JS:  ((DAT_00655aea >> 8) & 0xFF)
```
General formula: `._N_M_` = offset N bytes, read M bytes.
- Shift right by `N * 8` bits
- Mask with `(1 << (M * 8)) - 1`

Examples:
```
._0_1_  →  (val) & 0xFF              (low byte)
._1_1_  →  (val >> 8) & 0xFF         (second byte)
._2_1_  →  (val >> 16) & 0xFF        (third byte)
._0_2_  →  (val) & 0xFFFF            (low 2 bytes)
._2_2_  →  (val >> 16) & 0xFFFF      (high 2 bytes)
._1_3_  →  (val >> 8) & 0xFFFFFF     (upper 3 bytes)
```

### Sub-field write (._N_M_ as lvalue)
```
C:   local_8._0_1_ = 4;
JS:  local_8 = (local_8 & 0xFFFFFF00) | 4;
```
General formula: clear the target bytes with a mask, OR in the new value
shifted into position.
- Mask = `~(((1 << (M * 8)) - 1) << (N * 8))`
- New value shifted = `(newVal & ((1 << (M * 8)) - 1)) << (N * 8)`

### CONCAT (byte merging)
```
C:   CONCAT31(local_8._1_3_, 1)
JS:  ((local_8 & 0xFFFFFF00) | 1)
```
General formula: `CONCATNM(high, low)` = `(high << (M * 8)) | low`
where N = high byte count, M = low byte count.

Examples:
```
CONCAT11(hi, lo)  →  (hi << 8) | lo       (1 high byte + 1 low byte = 16-bit)
CONCAT12(hi, lo)  →  (hi << 16) | lo      (1 high byte + 2 low bytes)
CONCAT13(hi, lo)  →  (hi << 24) | lo      (1 high byte + 3 low bytes)
CONCAT22(hi, lo)  →  (hi << 16) | lo      (2 high bytes + 2 low bytes)
CONCAT31(hi, lo)  →  (hi << 8) | lo       (3 high bytes + 1 low byte)
CONCAT44(hi, lo)  →  BigInt or paired ops  (8-byte merge — rare, see longlong)
```

### Sign bit extraction
```
C:   x >> 0x1f
JS:  x >> 31
```
Identical — extracts sign bit for signed division rounding.

### Comma operator in conditions
```
C:   if ((cond1) && (DAT_X = 0, cond2))
JS:  if ((cond1) && (DAT_X = 0, cond2))
```
JS supports the comma operator with identical semantics to C. Pass through
unchanged. No 1:1 exception needed.

### bRam (direct memory byte)
```
C:   bRam0064e854
JS:  DAT_0064e854
```
A named byte at a fixed address. Same as a DAT_ global.

### Switch with goto labels (switchD_ / caseD_)
Ghidra generates labels like `switchD_004197af_caseD_4` inside switch statements.
These follow the same goto helper pattern:
```
C:   goto switchD_004197af_caseD_4;
JS:  switchD_004197af_caseD_4_helper(params); return;
```
The switch statement itself passes through as a normal `switch/case`.

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
Pass all variables that are **read or written** in the labeled block as
arguments to the helper. This includes variables set *before* the goto but
used *in* the labeled block.

Since the caller always does `helper(); return;` immediately, write-back
of modified locals is not needed — the caller returns right after the call.

**Globals and arrays:** Global `DAT_` variables are shared — modifications in
the helper are visible everywhere. Locals declared as `[0]` arrays (due to
`&local_XX`) are pass-by-reference — modifications in the helper are visible
to the caller, though the caller returns immediately anyway.

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

### Critical: ALL access uses `[0]` after declaration
Once a local is declared as `[0]`, every read and write for the rest of the
function uses `[0]`. No exceptions — including return statements.
```
C:   local_14 = 5;                   JS:  local_14[0] = 5;
C:   x = local_14 + 1;              JS:  x = local_14[0] + 1;
C:   if (local_14 < 10)             JS:  if (local_14[0] < 10)
C:   return local_14;               JS:  return local_14[0];
```

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
| Nested casts | 42 | Composability — inside-out rules (solved) |
| Comma in condition | 14 | JS supports comma operator — pass through (solved) |
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

**Note on `s8` / `u8` asymmetry:** These take a single value (already read from
the array), not an array+offset. This is because byte reads are direct array
access (`arr[offset]`), so the value is already extracted. Multi-byte reads
(`s16`, `s32`, etc.) need the array+offset to read consecutive bytes.

**`(short)` cast vs `s16()` helper:** If Ghidra emits `(short)(*(ushort *)(&DAT + off))`,
the composability rule produces `((u16(DAT, off)) << 16 >> 16)`. This is
equivalent to `s16(DAT, off)`. The transpiler MAY optimize to `s16()` but
the verbose form is also correct.

---

## Imports, Exports, and Cross-Block Wiring

The transpiler outputs each block as a standalone file with `export function`
declarations. It does NOT resolve cross-block references.

**What the transpiler handles:**
- Function signatures → `export function FUN_XXXXXXXX(...) {`
- `import { s8, u8, s16, u16, s32, u32, w16, w32 } from './mem.js';` (prelude)

**What a separate wiring step handles (not part of the transpiler):**
- Cross-block function calls (`FUN_XXXXXXXX` defined in another block)
- Global `DAT_XXXXXXXX` declarations and sharing across blocks
- Stub declarations for undefined references

This matches the existing v4 pipeline architecture (`transform.cjs` → `wire.cjs`
→ `fix-blocks.cjs`). The transpiler replaces `transform.cjs` only.
