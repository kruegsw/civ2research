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
- `reverse_engineering/transpiler/` — automated C→JS transpiler (1:1 line mapping, see RULES.md)
- `reverse_engineering/transpiler/output/` — generated JS (never hand-edit, always re-generable)
- `reverse_engineering/archive/` — superseded work (binary_js, function_docs, function_audit, call_graphs, decompiled_raw)

## Binary Fidelity Reference (reverse_engineering/)
The **source of truth** for game logic is the decompiled C code in `reverse_engineering/decompiled/`.
These are the raw Ghidra output files from the civ2.exe binary — they contain the exact logic
the game uses, expressed in C with raw memory addresses and stride arithmetic.

`reverse_engineering/transpiler/` contains an automated C→JS transpiler that produces output
with strict 1:1 line correspondence to the C source. Every C line maps to the same JS line number.
Verification is a mechanical diff. See `transpiler/RULES.md` for conversion rules.

`reverse_engineering/archive/binary_js/` contains the old manual transpilation (5,149 functions,
84K lines). Archived because it had no verifiable line mapping, systematic bugs kept appearing
in "audited" code, and session handoffs lost audit context. See `archive/binary_js_README.md`.

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
