# Phase 7: Complete Binary Function Audit — COMPLETE

## Summary
All **5,149 functions** across **34 decompiled C block files** audited against the JS engine code.
- **34 audit MD files** produced (10,669 total lines)
- **~35 JS fixes applied** across 8 engine files
- **200-turn regression tests pass** on all 3 seeds (42, 99, 7)

## Key Metrics
- **Started**: 2026-03-19
- **Functions audited**: 5,149 / 5,149 (100%)
- **Blocks completed**: 34 / 34
- **Game logic (GL) functions found**: ~250 across all blocks
- **Framework/CRT/MFC (FW)**: ~2,500 functions (no game logic)
- **UI/Rendering (UI)**: ~2,100 functions (no game logic)
- **AI (standalone)**: ~50 functions
- **Discrepancies found**: ~55 total
- **JS fixes applied**: ~35 (formula bugs, missing features, combat fixes)
- **Enhancement-tier (deferred)**: ~20 (AI behavior tuning, scenario edge cases)

## JS Files Modified
- `engine/production.js` — Oil supply global flag, continent modifiers, anyoneHasTech helper
- `engine/diplomacy.js` — Patience threshold, gold-to-attitude, tech pricing, gift formulas, PEACE_CLEARS mask, attitude range [0,100], shouldProvoke, vendetta flag on govt change, map sharing enhanced
- `engine/reducer.js` — Trade revenue (full to both treasury+research), bidirectional attitude, difficulty distance, railroad/airport bonus, tech penalties, demand variant, route value formula, sell building full refund
- `engine/reduce/move-unit.js` — Goto cancellation + sentry wake on enemy sighting
- `engine/reduce/end-turn.js` — Near-city healing bonus, severe warming degradation, treasury cap [0,30000]
- `engine/spaceship.js` — Wonder score ×20, late-game science bonus, pollution formula
- `engine/init.js` — Difficulty-scaled attitude initialization
- `engine/combat.js` — Submarine defender selection (air domain, not sea)
- `engine/espionage.js` — Bribe cost checks target's government, not spy's

## All 34 Blocks
| # | Block | Functions | System | Fixes |
|---|-------|-----------|--------|-------|
| 1 | 0x0040 | 154 | Map rendering, mapgen, tax rate | 0 |
| 2 | 0x0041 | 204 | Rules.txt parsing, advisor screens | 0 |
| 3 | 0x0042 | 157 | MP networking, visibility/movement | 0 |
| 4 | 0x0043 | 114 | Advisor dialogs, trade commodities | 2 |
| 5 | 0x0044 | 355 | Trade routes, city deletion | 11 |
| 6 | 0x0045 | 136 | Diplomacy system | 5 |
| 7 | 0x0046 | 107 | Treaty flags, attitude scoring | 3 |
| 8 | 0x0047 | 139 | Victory screens, save/load | 0 |
| 9 | 0x0048 | 61 | Turn processing, healing, warming | 2 |
| 10 | 0x0049 | 124 | Intelligence, AI production | 0 |
| 11 | 0x004A | 117 | Scoring, pathfinding, civ init | 3 |
| 12 | 0x004B | 164 | Continent mapping, tech effects | 0 |
| 13 | 0x004C | 92 | Build checks, espionage, research | 1 |
| 14 | 0x004D | 123 | Diplomacy transactions | 1 |
| 15 | 0x004E | 76 | City turn pipeline | 4 |
| 16 | 0x004F | 107 | Building upkeep, scenario events | 1 |
| 17 | 0x0050 | 123 | City dialog (sell building) | 1 |
| 18 | 0x0051 | 162 | MP events, advisor council | 0 |
| 19 | 0x0052 | 51 | MP setup, diplomacy window | 0 |
| 20 | 0x0053 | 23 | AI brain (14.6KB per-turn) | 0 |
| 21 | 0x0054 | 37 | Scenario event editor | 0 |
| 22 | 0x0055 | 152 | Government, AI diplomacy | 1 |
| 23 | 0x0056 | 131 | AI attitude, alliance | 0 |
| 24 | 0x0057 | 122 | Combat resolution | 1 |
| 25 | 0x0058 | 91 | Goody huts, unit orders | 0 |
| 26 | 0x0059 | 157 | Move unit (17KB), spaceship | 0 |
| 27 | 0x005A | 111 | Map utilities, game loops | 0 |
| 28 | 0x005B | 242 | Unit/map data layer | 0 |
| 29 | 0x005C | 339 | SMEDS32 graphics engine | 0 |
| 30 | 0x005D | 370 | SMEDS multimedia framework | 0 |
| 31 | 0x005E | 357 | SMEDS sprite/video engine | 0 |
| 32 | 0x005F | 346 | MFC/DDControl + CRT library | 0 |
| 33 | 0x0060 | 103 | CRT library (VS1998 Debug) | 0 |
| 34 | 0x0061 | 2 | Legacy sprite primitives | 0 |

## Phase 6 Suspicious Blocks — All Cleared
All 4 blocks flagged in Phase 6 (0x0041, 0x0048, 0x004A, 0x0051) were false alarms:
- 0x0041: Init-phase writes (rules parsing), not game mechanics
- 0x0048: Multiplayer session management, not game mechanics
- 0x004A: Scoring/pathfinding — real discrepancies found and fixed (wonder ×20, science bonus)
- 0x0051: UI notifications + network transport, not game mechanics
