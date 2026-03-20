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
- `reverse_engineering/decompiled/` — 34 Ghidra decompiled .c files (225K lines, ground truth)
- `reverse_engineering/function_docs/` — Phase 8: per-function documentation (5,149 entries, 2.6MB)
- `reverse_engineering/call_graphs/` — 7 call graph trees + graph_data.json (see SUMMARY.md)
- `reverse_engineering/function_audit/` — Phase 2 pseudocode + Phase 7 audit results

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
