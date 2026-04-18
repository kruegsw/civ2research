# Architecture Map

*Short reference for navigating the hybrid v3/v4 structure. Maintained when layout changes.*

---

## The three layers

```
┌───────────────────────────────────────────────────────────────┐
│ REAL CIV2 (source of truth)                                   │
│   civ2gamefolder/civ2.exe running on Windows                  │
│   Sniffer tools read its memory live via ReadProcessMemory    │
└───────────────────────────────────────────────────────────────┘
                         │
                         │ observed via
                         ▼
┌───────────────────────────────────────────────────────────────┐
│ v4/ — reverse-engineering workshop + game server              │
│                                                                │
│   server.js         Game server (HTTP + WS)                   │
│                     (Currently serves v3's public/* client)   │
│                     Imports game logic from charlizationv3/   │
│                     Uses v4-bridge.js for end-turn yields     │
│                                                                │
│   sniff-game.py     Sniffer — attaches to civ2.exe,           │
│                     dumps memory to CIV2SNAP binary snapshots │
│                                                                │
│   blocks/*.js       Transpiled-from-Ghidra C as JS            │
│   v4-bridge.js      Wraps specific binary functions as oracle │
│                                                                │
│   Fidelity pipeline:                                          │
│     dump-server-state.js     .sav → JSON (v4 side)            │
│     snapshot-to-state-json.py CIV2SNAP → JSON (real side)     │
│     state-diff.py             JSON ↔ JSON field diff          │
│     fidelity_gaps/            Output directory                │
└───────────────────────────────────────────────────────────────┘
                         │
                         │ imports game engine from
                         ▼
┌───────────────────────────────────────────────────────────────┐
│ v3/ — game engine + client assets                             │
│                                                                │
│   engine/           Hand-written JS game logic                │
│     parser.js       .sav file parser                          │
│     reducer.js      Action reducer                            │
│     init.js         initFromSav / initNewGame                 │
│     combat.js, happiness.js, research.js, …                   │
│     ai/*.js         AI subsystems                             │
│                                                                │
│   public/           Browser client (canvas renderer)          │
│     js/renderer.js  8-pass sprite compositor                  │
│     js/citydialog.js City screen (3653 lines)                 │
│     css/, assets/                                             │
│                                                                │
│   server/server.js  OLDER server — not currently running.     │
│                     v4's server.js has superseded it.         │
└───────────────────────────────────────────────────────────────┘
```

## How you run it

The playable game:
```bash
cd charlizationv4 && node server.js
```
v4's server serves v3's client (`charlizationv3/public/*`) and imports
v3's engine (`charlizationv3/engine/*`) for game logic. When processing
end-turn, it calls into `v4-bridge.js` to get binary-faithful yields
from the transpiled code in `charlizationv4/blocks/`.

## What lives where

| Concern | Location |
|---|---|
| Playable game server | `charlizationv4/server.js` |
| Playable game engine (turn logic, AI, combat) | `charlizationv3/engine/*` |
| Playable game client (browser UI, canvas) | `charlizationv3/public/*` |
| Real Civ2 binary + installation | `civ2gamefolder/` |
| Ghidra decompiled C (source of truth) | `reverse_engineering/decompiled/` |
| Transpiled-from-C JS (binary-on-JS-rails) | `charlizationv4/blocks/` |
| Sniffer (reads real Civ2 memory) | `charlizationv4/sniff-*.py` |
| Sniffer output | `charlizationv4/snapshots/game_*/` |
| Fidelity diff pipeline | `charlizationv4/{dump-server-state,snapshot-to-state-json,state-diff}.{js,py}` |
| Fidelity diff outputs | `charlizationv4/fidelity_gaps/` |

## What's inactive / legacy

- `charlizationv3/server/server.js` — older standalone server. Not used by the current play flow.
- `charlizationv4/charlizationv4/` — nested directory with a `blocks-regex-backup`. Backup from a prior transpiler refactor. Safe to archive.
- `charlizationv4/_tmp_verify.py` — scratch file.

## Why this hybrid exists (short version)

The transpiled binary code is accurate but tightly coupled to GDI /
Windows dialogs. A fully headless binary replica proved hard to
debug because you can't see what it's doing. So the compromise is:
use v3's hand-written engine as the running game (it's observable
and debuggable), and delegate specific calculations to the transpiled
binary where faithfulness matters most (currently: end-turn yields
via `v4-bridge.js`). Real Civ2 (via sniffer) is the ground truth.

See `PHASE6_FIDELITY_PLAN.md` for the ~120 known behavioral gaps
between v3's hand-written engine and the binary.

## Fidelity work — how to do a state diff

See `charlizationv4/fidelity_gaps/README.md` for the pipeline.

Quick reference:
```bash
# Side B (v4 server's interpretation of a .sav)
node charlizationv4/dump-server-state.js path/to/your.sav > v4.json

# Side A (real Civ2's actual memory, via sniffer snapshot)
python charlizationv4/snapshot-to-state-json.py \
    charlizationv4/snapshots/game_XXXX/turn_NNNN_*.bin > real.json

# Diff
python charlizationv4/state-diff.py v4.json real.json
```

For this to be meaningful, both sides must represent the *same* game
state. Easiest recipe: open Civ2, save the game, *then* sniff (so the
sniffer's turn-start dump corresponds to the saved state).
