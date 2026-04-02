# Ghidra P-code Transpiler — Binary → JavaScript

## Architecture

The transpiler uses **two layers** from Ghidra's decompiler:

1. **ClangNode tree** — for structure (function signatures, control flow, variable declarations)
2. **P-code operation graph** — for expressions (the actual computation)

The P-code graph is a proper expression tree: each operation (LOAD, INT_ADD, CALL, etc.)
has typed inputs that are outputs of other operations. We walk it recursively to build
JS expressions. No text parsing, no flat token scanning, no type guessing.

### Why P-code, not the ClangNode token tree?

The ClangNode tree is **flat inside statements** — a statement like
`iVar2 = (int)(char)(&DAT_0064f348)[param_1 * 0x58]` is 37 tokens in a flat list
with no expression nesting. Trying to reconstruct expressions from flat tokens is
just regex transpiling with extra steps.

The P-code graph for the same expression is a proper tree:
```
INT_SEXT ← LOAD ← PTRADD(PTRSUB(DAT_0064f348), INT_MULT(param_1, 0x58))
```
Walking this tree produces `s8(DAT_0064f348[param_1 * 0x58])` — correctly, mechanically.

## Results (2026-04-02)

**5,149 functions across 34 blocks — zero decompilation failures.**

| Metric | Count |
|--------|-------|
| Total JS lines | 182,613 |
| Typed memory ops (s8/s16/s32/u8/w16/w32...) | 18,812 |
| Integer divisions wrapped (`\| 0`) | 897 |
| Function calls (FUN_xxx) | 32,791 |
| Depth-limit fallbacks | 47 (0.03%) |

## What It Handles

| Pattern | P-code Op | JS Output |
|---------|-----------|-----------|
| Signed byte read | LOAD(1) + INT_SEXT | `s8(DAT_xxx[offset])` |
| Unsigned byte read | LOAD(1) + INT_ZEXT | `u8(expr)` |
| Signed short read | LOAD(2) | `s16(base, offset)` |
| Signed int read | LOAD(4) | `s32(base, offset)` |
| Byte array access | LOAD(1) via PTRADD | `DAT_xxx[offset]` |
| 16-bit write | STORE(2) | `w16(base, offset, val)` |
| 32-bit write | STORE(4) | `w32(base, offset, val)` |
| Integer division | INT_DIV / INT_SDIV | `(a / b \| 0)` |
| Comparisons | INT_EQUAL etc. | `===`, `!==`, `<`, `<=` |
| Bitwise ops | INT_AND/OR/XOR/LEFT/RIGHT | `&`, `\|`, `^`, `<<`, `>>` |
| Function calls | CALL | `FUN_xxx(arg1, arg2)` |
| Type casts | INT_SEXT/INT_ZEXT | `s8()`, `u8()`, shift+mask |
| Byte extraction | SUBPIECE | `(val >> N) & mask` |
| Pointer arithmetic | PTRADD/PTRSUB | base + offset, symbol names |
| Variable boundaries | HighVariable names | No re-expansion of assigned vars |

## Known Limitations

1. **Compound conditions with side effects** — `if ((a == 0) && (x = call(), x != 0))`
   produces leaked tokens from the comma-operator side effects. ~14 instances per RULES.md.

2. **Depth-limit fallbacks** — 47 deeply-nested expressions hit the 40-level depth limit.
   Could be raised, but these are likely MFC/framework code anyway.

3. **for-loop structure** — Loop init/condition/update not fully structured yet.

4. **Goto helpers** — Not implemented. Would need to match the RULES.md goto convention.

5. **&local_XX arrays** — Address-taken locals not yet detected.

## Prerequisites

- **Python 3.11+** with `pyghidra` installed (bundled wheels in Ghidra)
- **Ghidra 12.0.3** at `C:\tmp\ghidra_12.0.3_PUBLIC`
- **JDK 21** at `C:\tmp\jdk-21.0.10+7`
- **Ghidra project** at `C:\tmp\ghidra_projects\civ2_project.gpr`

## Files

```
reverse_engineering/ghidra/
  README.md              ← This file
  export-js.py           ← P-code transpiler (Python 3, runs via PyGhidra)
  run_pyghidra.py        ← Launcher (handles Ghidra/JDK/project paths)
  run.sh                 ← Legacy bash runner (doesn't work with Ghidra 12)
```

## Usage

```bash
python run_pyghidra.py                          # all 34 blocks (~3 min)
python run_pyghidra.py --dump FUN_004e868f      # dump AST + P-code for one function
python run_pyghidra.py --func FUN_004e868f      # transpile + print one function
python run_pyghidra.py --block 0x004E0000       # transpile one block
```

Output: `reverse_engineering/transpiler/output-ghidra/block_XXXXXXXX.js`
