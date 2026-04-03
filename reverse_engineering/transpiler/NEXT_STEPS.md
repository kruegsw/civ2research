# Next Steps: Hybrid Transpiler — Regex for Structure, P-code for Verification

## Summary

We have two transpilers. Neither is complete alone. The plan is to combine their strengths.

| | Regex transpiler | P-code transpiler |
|---|---|---|
| **Output** | `transpiler/output/` | `transpiler/output-ghidra/` |
| **Script** | `transpiler/transpile.cjs` | `ghidra/export-js.py` |
| **Syntax valid** | 34/34 blocks pass | 1/34 blocks pass |
| **Goto handling** | 357 helper functions | ✗ (commented out) |
| **Switch/case** | Full support | ✗ (commented out) |
| **&local_XX arrays** | 1,696 instances | ✗ |
| **Type accuracy** | Guesses from C text | Authoritative from P-code |
| **Integer division** | Heuristic (mostly right) | Always correct |
| **Memory read width** | Inferred from cast text | Known from LOAD output size |
| **Sign/unsigned** | Inferred from cast text | Known from SEXT/ZEXT ops |

**Decision: Use the regex transpiler as the production output. Use P-code output as a verification oracle to find and fix remaining type bugs.**

## Steps

### Step 1: Build `verify-types.cjs`

A diff script that compares both outputs function-by-function.

```
node verify-types.cjs
```

For each function:
- Match by name (both use `FUN_XXXXXXXX`)
- Extract statement expressions from both outputs
- Normalize (strip parens, whitespace, `v()` wrapping)
- Report divergences by category:
  - Division: one has `| 0`, other doesn't
  - Width: one uses `s32`, other uses `s16`
  - Sign: one uses `u8`, other uses `s8`
  - Global read: one uses `v(DAT_xxx)`, other doesn't

### Step 2: Fix regex transpiler rules

For each systematic divergence, fix the rule in `transpile.cjs`.
The 4 known bug classes were already partially fixed:
- Integer division: 987 instances (line ~884-961 in transpile.cjs)
- s8/u8 on DAT_ globals: 508 instances (line ~411-414)
- Negative byte comparisons: fixed
- Cast precedence: fixed

The verifier will find any remaining instances.

### Step 3: Regenerate + wire + deploy

```bash
cd reverse_engineering/transpiler
node transpile.cjs                    # regenerate all 34 blocks
cd ../../charlizationv4
node wire.cjs                         # wire cross-block imports
```

Syntax check: `for f in blocks/block_*.js; do node --check "$f"; done`

### Step 4: Runtime test

```bash
cd charlizationv4
node run.js --sav ../20260301_early-game-data/20260301_research_02_early\ game\ few\ cities.sav
```

This loads a save file into flat memory and calls transpiled functions.

## Key Files

| File | Purpose |
|------|---------|
| `transpiler/transpile.cjs` | Production transpiler — fix rules here |
| `transpiler/output/` | Regex output (production baseline, all syntax valid) |
| `transpiler/output-ghidra/` | P-code output (verification reference) |
| `transpiler/RULES.md` | Conversion rules documentation |
| `ghidra/export-js.py` | P-code transpiler (run via `ghidra/run_pyghidra.py`) |
| `charlizationv4/wire.cjs` | Wires cross-block imports |
| `charlizationv4/blocks/` | Runtime blocks (deploy target) |
| `charlizationv4/mem.js` | Memory helpers (s8, s16, s32, w16, w32, v, wv) |
| `charlizationv4/run.js` | Test runner with save file loading |
| `charlizationv4/globals-init.js` | Sets up DAT_ globals as offsets into _MEM |

## How to run the P-code transpiler (if needed)

```bash
# Requires: pyghidra installed, Ghidra 12.0.3, JDK 21
# See ghidra/README.md for setup
python reverse_engineering/ghidra/run_pyghidra.py              # all blocks
python reverse_engineering/ghidra/run_pyghidra.py --func FUN_004e868f  # one function
python reverse_engineering/ghidra/run_pyghidra.py --dump FUN_004e868f  # AST dump
```

## Why not fix the P-code transpiler instead?

The P-code transpiler can't handle 410 goto statements, switch labels, C++ `this`, or cast parentheses in conditions. Fixing these would mean reimplementing all the structural handling that `transpile.cjs` already has (goto helper functions, switch case labels, address-of-local arrays, multi-line joining, etc.). That's months of edge-case work for identical structural output. The P-code transpiler's real value is TYPE INFORMATION, which we extract via the verifier.
