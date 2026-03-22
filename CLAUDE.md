# Civ2 Research Project

Civilization II MGE reimplementation — save file parser, HTML5 Canvas renderer, multiplayer game engine.

## Tech Stack
- Vanilla JS, ES modules, no frameworks
- `ws` is the only npm dependency
- Server-authoritative WebSocket architecture, immutable reducer pattern

## Project Structure (charlizationv3/)
- `engine/` — shared server+client game logic (parser, defs, rules, combat, production, happiness, research, ai/, etc.)
- `server/server.js` — HTTP + WebSocket server (rooms, seats, sessions, lobby)
- `public/` — client: js/, css/, net/transport.js, assets/, saves/
- `public/engine` — **symlink → ../engine** (required for reverse proxy, do not break)
- `engine/reference/` — 13 JS reference files extracted from binary (29K lines, read-only reference)
- `reverse_engineering/decompiled/` — 34 Ghidra decompiled .c files (225K lines, **source of truth**)
- `reverse_engineering/binary_js/` — mechanical JS transpilation of civ2.exe (84K lines, **next-best reference** — see below)
- `reverse_engineering/archive/` — superseded work (function_docs, function_audit, call_graphs, decompiled_raw)

## Binary Fidelity Reference (reverse_engineering/)
The **source of truth** for game logic is the decompiled C code in `reverse_engineering/decompiled/`.
These are the raw Ghidra output files from the civ2.exe binary — they contain the exact logic
the game uses, expressed in C with raw memory addresses and stride arithmetic.

`reverse_engineering/binary_js/` contains a **mechanical JS transpilation** of all 34 decompiled
C blocks (5,149 functions, 84K lines). This is the **next-best reference** — a line-by-line
translation that preserves original variable names (`param_1`, `local_8`, `iVar1`), function
labels (`FUN_XXXXXXXX`), and memory access patterns (`DAT_XXXXXXXX[index]`). It is more readable
than the C but may contain translation errors. When in doubt, always verify against the
decompiled C source.

Key files in `reverse_engineering/binary_js/`:
- `mem.js` — flat memory regions mirroring binary layout (unit types, terrain, civs, cities, units)
- `fn_utils.js` — 11 core utility functions (tile access, tech checks, ZOC, water source)
- `block_XXXXXXXX.js` — one file per decompiled block, matching `reverse_engineering/decompiled/`

**WARNING**: Inferred function names in comments are best guesses and may be wrong. Do not trust
them blindly. If behavior seems incorrect, go back to the decompiled C and re-examine.

## Key Files
- `engine/defs.js` — all game constants, unit/building/tech/terrain definitions
- `engine/parser.js` — binary .sav file parser
- `engine/reducer.js` — game state reducer (all game actions)
- `Civ2_Master_Reference.md` — early-project snapshot reference (not authoritative)

## Rules
- **Never push to remote** — I handle all git pushes myself.
- **Never use `isolation: "worktree"`** for background agents — it causes issues in this repo.
- Keep code vanilla JS. No TypeScript, no frameworks, no build tools.
- Prefer editing existing files over creating new ones.

## Running
```bash
cd charlizationv3 && node server/server.js   # default port 3000
PORT=9999 node server/server.js               # custom port
```

## Testing
```bash
cd charlizationv3 && node tools/sim.js        # simulation runner
```
