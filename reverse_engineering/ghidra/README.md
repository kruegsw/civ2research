# Ghidra API Transpiler — C → JS via AST

## Why This Approach

The regex transpiler (`transpiler/transpile.cjs`) processes C text with pattern matching.
It can't understand types, operator precedence, or pointer widths. This led to 1500+
silent bugs discovered during manual audit (integer division, byte vs int pointer derefs,
signed vs unsigned comparisons, cast precedence loss).

A tree-sitter AST parser was attempted but still had 107 parse errors because Ghidra's
decompiled C output is not standard C (uses C++ class syntax, custom types, etc.).

**Ghidra API scripting skips the C text entirely.** Ghidra already has the full AST with
complete type information. The script walks the decompiler's internal representation and
emits JS directly — zero parsing, zero guessing.

## What It Gives Us

- `DataType` on every variable, parameter, and global (know `byte *` vs `int *`)
- Function signatures with return types
- Operator nodes with operand types (know when `/` is integer division)
- Global variable sizes and addresses
- No parse errors (nothing to parse)

## Prerequisites

1. **Java JDK 17+** — Ghidra 11+ requires it
2. **Ghidra 12.0.3** — the version used to generate `decompiled/*.c`
3. **civ2.exe** — the Civilization II MGE binary
4. **Ghidra project** — with civ2.exe loaded and auto-analyzed

## Files

```
reverse_engineering/ghidra/
  README.md                ← This file
  export-js.py             ← Ghidra Jython script (TODO: create)
  run.sh                   ← Headless runner (TODO: create)
```

## How It Will Work

1. `run.sh` invokes Ghidra's `analyzeHeadless` with `export-js.py`
2. The script iterates functions in each address block (0x400000-0x610000)
3. For each function, it calls the Decompiler API to get the `HighFunction`
4. It walks the `PcodeOpAST` tree, emitting JS for each node
5. Output goes to `transpiler/output/block_XXXXXXXX.js` (same format)

## Key Ghidra API Classes

- `DecompInterface` — decompiles a function to high-level AST
- `HighFunction` — the decompiled function representation
- `PcodeOpAST` — individual operation nodes in the AST
- `Varnode` — variables/values with `DataType` attached
- `HighVariable` — merged variable with type info
- `DataType` — `IntegerDataType`, `PointerDataType`, `CharDataType`, etc.

## Conversion Rules (same as transpiler/RULES.md)

The JS emission rules are identical — the difference is that type information
comes from the AST instead of regex inference:

| AST pattern | JS output |
|-------------|-----------|
| `INT_DIV(a, b)` where both int | `(a / b \| 0)` |
| `LOAD(ptr)` where ptr is `byte *` | `_MEM[addr]` |
| `LOAD(ptr)` where ptr is `short *` | `s16(base, offset)` |
| `LOAD(ptr)` where ptr is `int *` | `s32(base, offset)` |
| `STORE(ptr, val)` where ptr is `byte *` | `_MEM[addr] = val` |
| `CAST(char, expr)` | `s8(expr)` |
| `CAST(byte, expr)` on DAT_ global | `s8(_MEM[DAT_xxx])` |
| `==` / `!=` | `===` / `!==` |
| Read global `DAT_xxx` | `v(DAT_xxx)` |
| Write global `DAT_xxx = val` | `wv(DAT_xxx, val)` |

## Status

- [ ] Find Ghidra installation (may be on another machine)
- [ ] Verify civ2.exe Ghidra project exists
- [ ] Write export-js.py skeleton
- [ ] Test on one function (FUN_004e868f — known good, manually audited)
- [ ] Expand to full block (block_004E0000)
- [ ] Run on all 34 blocks
- [ ] Verify output against regex transpiler output for regressions
