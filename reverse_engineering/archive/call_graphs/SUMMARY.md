# Call Graph Summary

## What This Is

Complete call graph analysis of Civ2.exe (5,149 functions). Traces every reachable function from 7 major entry point groups, producing navigable tree documents showing what happens when each game event fires.

## Quick Start for Future Claude Instances

1. **To understand a game behavior**: Find the relevant tree file below, search for the function name
2. **To check if something is implemented in JS**: Find it in the tree, then grep `charlizationv3/engine/` for the equivalent
3. **To find all state mutations for a system**: Each tree ends with a flat table of all state-mutating functions
4. **To look up a specific function**: `graph_data.json` has calls, names, categories, summaries, mutations for all 4,930 parsed functions
5. **For detailed function documentation**: `reverse_engineering/function_docs/block_XXXXXXXX.md` — one entry per function with full Detail section

## Files

| File | Size | Contents |
|------|------|---------|
| `graph_data.json` | 1.8MB | Parsed graph: calls, called_by, names, categories, summaries, mutations, sizes for all functions. Rebuilt with thunk name resolution + C source edge extraction (17,135 edges). |
| `tree_game_loop.md` | 598KB | Game loop entry points |
| `tree_turn_pipeline.md` | 519KB | Turn processing chain |
| `tree_player_input.md` | 1.0MB | All player input handlers |
| `tree_network.md` | 401KB | Multiplayer message dispatch |
| `tree_ai.md` | 241KB | AI decision trees |
| `tree_dialogs.md` | 843KB | Dialog/screen entry points |
| `tree_game_setup.md` | 1.2MB | Game init, map gen, save/load, rules parsing |
| `tree_uncovered.md` | 571KB | Functions not reachable from any tree (with classification) |

## Entry Points Per Tree

| Tree | Entry Points | Description |
|------|-------------|-------------|
| game_loop | `game_loop_singleplayer` (0048B340), `game_loop_mp_client` (0048BFEC), `game_loop_mp_server` (0048C9F3), `human_turn_main_loop` (0048A416) | Main game loops |
| turn_pipeline | `process_end_of_turn` (00487371), `process_civ_turn` (00487A41), `process_city_turn` (004F0A9C), `process_city_production` (004EC3FE) | Turn processing |
| player_input | `map_window_click` (00410F77), `map_key` (004125C6), `map_ascii` (00411F91), `map_double_click` (00411705), `minimap_left_click` (004074DC), `minimap_right_click` (00407658), `main_menu_command_dispatch` (004E2803) | Player actions |
| network | `network_poll` (0047E94E) | 160+ multiplayer message types |
| ai | `ai_process_civ_turn` (0053184D), `ai_unit_turn_master` (00538A29), `ai_choose_city_production` (00498E8B), `ai_barbarian_unit_turn` (005351AA) | AI decisions |
| dialogs | 30 entry points including city window, 6 advisors, diplomacy, tax rate, revolution, tech discovery, civilopedia | UI screens |
| game_setup | `singleplayer_main_menu` (0041EEEB), `new_game_setup_flow` (0041BA52), `load_full_game` (00475666), `generate_world_map` (00408D33), `init_new_game` (004AA9C0), `new_civ` (004A7CE9), `load_all_rules` (0041B00E), `save_game` (0047758C), `parse_events_file` (004FC516), `multiplayer_main_loop` (0041F8D9) | Game setup |

## Coverage (Final)

Graph rebuilt 3 times with progressive edge resolution:
1. Doc-based parsing: 14,375 edges
2. + Thunk name resolution: 14,620 edges
3. + Direct C source scanning: 17,135 edges

**Final reachability** (depth unlimited):
- **Total functions in graph**: 4,930
- **Reached by 7 trees**: 2,541 (52%)
- **Not reached**: 2,389
  - FW: ~1,450 (CRT/MFC/SMEDS — not game-relevant)
  - UI: ~830 (dialog internals, rendering helpers)
  - **GL/MIXED/AI: 109** — all classified, see below

### The 109 Unreached GL/MIXED/AI Functions

**44 have known callers** — the call edge exists in the C source but the caller is a large dispatch function (`move_unit`, `network_poll`, `calc_city_production`, etc.) whose internal branching our parser captured. These ARE reachable at runtime; the graph just can't prove it statically.

**65 have NO callers in any C source** — registered as callbacks at runtime:

| Registration Method | Count | Examples |
|---|---|---|
| DDCtrl/SMEDS runtime callbacks | 20 | Tax sliders, parley buttons, MP ready checks, timer tick, end-turn button |
| Utility functions (inlined/optimized) | 27 | Stack helpers, distance calcs, visibility utils, trade queries |
| Win32 message handlers | 5 | Quit game, resign, diplomacy timeout, retirement score |
| Editor/cheat menu dispatch | 5 | Events editor, cosmic editor, reveal map |
| MFC dialog callbacks | 4 | Editor messageboxes |
| DirectPlay callbacks | 2 | Network receive/poll |
| PBEM flow | 2 | Email setup |

**Static analysis cannot resolve these further.** They're called via function pointers stored at runtime (`(**(code **)(obj + offset))()`). All 109 are fully documented in Phase 8 function docs and classified in `tree_uncovered.md`.

**100% of GL/MIXED/AI functions are either in a call tree or classified with known registration mechanism.**

## Most Connected Functions

Functions appearing in 5+ trees (critical shared infrastructure):

| Function | Trees | Category |
|----------|-------|----------|
| network_poll | 6 | MIXED |
| net_send_message / net_send_to_player / net_broadcast | 5 | GL |
| create_unit / delete_unit / put_down_unit / relocate_unit | 5 | GL |
| process_unit_move_visibility | 5 | GL |
| handle_tech_discovery | 5 | GL |
| set_tile_improvement_bits / set_tile_visibility_bits / set_tile_owner | 5 | GL |
| set_civ_tile_data / begin_map_batch / end_map_batch / queue_map_update | 5 | GL |
| diff_engine_scan_and_send + serialize variants | 5 | GL |
| diplomacy (declare_war, sign_ceasefire, form_alliance, etc.) | 5 | GL |
| calc_tile_resource / calc_city_production / distribute_trade | 5 | GL |
| event_dispatch_actions / event_check_negotiation | 5 | GL |

## How to Use These Trees

1. **Find a behavior to implement**: e.g., "what happens at end of turn?"
2. **Open the relevant tree**: tree_turn_pipeline.md → process_end_of_turn
3. **Walk the branches**: each child is a consequence, annotated with category and mutation status
4. **Check JS implementation**: for each GL/MIXED node, verify `charlizationv3/engine/` does the same thing
5. **Fill gaps**: any branch missing from JS = a bug or missing feature

Trees are organized by **causality** — "when X happens, it triggers Y, which triggers Z."

## Related Resources

- **Phase 8 function docs**: `reverse_engineering/function_docs/block_XXXXXXXX.md` — 34 files, one ### entry per function with Name, Category, Calls, Globals, Summary, State mutations, Detail
- **Phase 7 audit**: `reverse_engineering/function_audit/phase7/` — block-by-block discrepancy audit
- **Decompiled source**: `reverse_engineering/decompiled/block_XXXXXXXX.c` — 34 files, 225K lines of Ghidra output (ground truth)
- **Rename map**: `reverse_engineering/rename_map.json` — 2,612 function name mappings
