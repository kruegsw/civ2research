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

## Foundational Sources of Truth
Three complementary sources define the game. Everything downstream derives from these:

1. **Decompiled C** (`reverse_engineering/decompiled/`) — 34 Ghidra-decompiled .c files (225K lines).
   The **logic**: what the game does — algorithms, control flow, function behavior.
   Raw memory addresses and stride arithmetic; meaningless without the byte analysis below.

2. **Byte Analysis** (`reverse_engineering/findings/`) — memory layout and data structures.
   The **data**: what the game is — struct layouts, field meanings, access formulas.
   - `byte_verification_plan.md` — master index, 100% byte-mapped for all major objects
   - `Civ2_City_Struct.md` (in `reverse_engineering/`) — full 88-byte city struct
   - `Data_Structures.md` (in `reverse_engineering/`) — Civ, Unit, Building, Unit Type, Globals
   - `findings/memory_map/` — per-topic deep dives (tiles, unit types, cosmic params, etc.)

3. **RULES.TXT** (`/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT`) —
   The game's own configuration: units, buildings, techs, terrain, costs, prerequisites.
   Parsed at runtime by both the original binary and the reimplementation.

## Transpiler (reverse_engineering/transpiler/)
Automated C→JS transpiler producing output with strict 1:1 line correspondence to the
decompiled C source. Every C line maps to the same JS line number. Verification is a
mechanical diff. See `transpiler/RULES.md` for conversion rules.

`reverse_engineering/transpiler/output/` — generated JS (never hand-edit, always re-generable).

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

## Blanket Permissions
These actions are pre-approved — do not prompt for confirmation:
- **Read/search decompiled C** — Grep, Read, Glob, and Explore agents on `reverse_engineering/decompiled/` and `reverse_engineering/findings/`
- **Read Civ2 process memory** — Python scripts using `ctypes.windll.kernel32.ReadProcessMemory` to read from civ2.exe (read-only, never write to process memory)
- **Edit `charlizationv4/sniff-game.py`** — the sniffer is actively developed, edits are expected
- **Edit `.md` docs** in `reverse_engineering/`, `reverse_engineering/findings/`, and `.claude/` memory files
- **Spawn agents** for searching code, verifying data, and running analysis scripts

## Running
```bash
cd charlizationv3 && node server/server.js   # default port 3000
PORT=9999 node server/server.js               # custom port
```

## Testing
```bash
cd charlizationv3 && node tools/sim.js        # simulation runner
```
