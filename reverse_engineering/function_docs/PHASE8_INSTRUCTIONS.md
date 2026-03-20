# Phase 8: Line-by-Line Binary Documentation — Agent Instructions

## Your Task

Read every function in your assigned block .c file(s) and produce detailed documentation. Every function gets a full entry — no skipping, no "N/A" entries.

## Source Files
- `reverse_engineering/decompiled/block_XXXXXXXX.c` — the decompiled C code (ground truth)
- `reverse_engineering/rename_map.json` — ~2,600 known function name mappings
- `reverse_engineering/decompiled/FUNCTION_INDEX.txt` — address/size/name index

## Output Format

Write one markdown file per block: `reverse_engineering/function_docs/block_XXXXXXXX.md`

### File Header
```
# Block XXXXXXXX — Function Documentation
**Functions documented**: N
**State-mutating functions**: N (list addresses)
```

### Per-Function Entry
```
### FUN_XXXXXXXX (0xXXXXXXXX, N bytes)
**Name**: [from rename_map.json or inferred, or "unknown"]
**Category**: FW | UI | GL | AI | MIXED
**Calls**: [list of functions called]
**Called by**: [if known from cross-references in the same block]
**Globals read**: [DAT_XXXXXXXX, ...]
**Globals written**: [DAT_XXXXXXXX, ...]
**Summary**: [1-3 sentences: what this function does]
**State mutations**: NONE | [list of game state changes with addresses]
**Detail**:
[Line-by-line description of the logic, formulas, branches, loop bounds]
```

## Category Definitions
- **FW** — Framework: CRT init, SEH handlers, MFC/library wrappers, destructors, memory management
- **UI** — User Interface: dialogs, drawing, message handlers, window management, GDI calls
- **GL** — Game Logic: combat, production, research, movement, AI decisions, diplomacy logic, city management
- **AI** — AI-specific: AI decision making, strategy, evaluation
- **MIXED** — Functions that are primarily UI but contain game state writes (most important to find!)

## Global Address Ranges — Game State Detection

These address ranges indicate game state. ANY write to these = state mutation:

| Range | Contents |
|-------|----------|
| 0x0063XXXX | Trade routes, supply/demand tables |
| 0x0064XXXX | Per-civ data (base 0x0064c600, stride 0x594), city data, unit data, treaty flags |
| 0x0065XXXX | Global game state: difficulty, turn number, flags, wonders, technologies |
| 0x0066XXXX | Unit type tables: attack, defense, movement, cost, flags |
| 0x0067XXXX | Score, power, ranking data |
| 0x006AXXXX | Map tile data, city pointers |
| 0x006CXXXX | Pathfinding/BFS scratch buffers |

Writes to 0x0062XXXX and below are typically framework/UI state (window handles, GDI objects, etc.) — not game state mutations.

## Anti-Shortcut Rules

1. **Every function gets a full entry** with a Detail section — no exceptions
2. **No category-based skipping** — FW/UI functions still get documented
3. **Every DAT_ address must be listed** in globals read/written
4. **The function body must be read** — don't infer from name or size alone
5. **thunk_ calls**: note the target function they redirect to
6. **Tiny functions** (< 30 bytes): still document fully, just briefly

## How to Work

1. Read the entire block .c file
2. Read the relevant entries from rename_map.json for function names in that address range
3. Process each function sequentially:
   - Read its full body
   - List all DAT_ references, classifying as read or write
   - Determine if any writes target game state addresses (0x0063-0x006C)
   - Document the logic, formulas, and control flow
4. Write the output .md file
5. Report: total functions documented, count of state-mutating functions found
