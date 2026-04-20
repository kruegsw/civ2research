# Civ2 init sequence fidelity audit (v3 vs binary)

## Binary init phases (from FUN_004a7ce9 / FUN_004aa9c0 / FUN_004a9785)

1. **Pre-game setup** (FUN_00441b11): turn=0, game-flags=0, diplomacy arrays zeroed
2. **Map selection & generation** (FUN_0041d417): 5 rand() calls for climate bias,
   then thunk_FUN_0051dd97 for map gen
3. **Civ selection dialogs**: user picks civs, 1 rand()%3 per AI civ, stored in
   DAT_0062ced0[civ]
4. **Diplomacy attitudes** (FUN_0055c69d per civ): government assigned, sets
   stateFlags bit 0x08 via FUN_0055c066
5. **Per-civ new_civ** (FUN_004a7ce9): attitudes (RNG), production/history
   arrays zeroed, settler placement (RNG), tech grants (gated by turn>0 so
   zero at game start)
6. **Human-player setup** (FUN_00555a8b): DAT_00655b0b = (1 << humanCiv)
7. **Starting units**: thunk_FUN_004bf05b places settlers
8. **Global finalization**: DAT_00654fb0 = 0, etc.
9. **Turn 0→1 transition** (FUN_00487371): turn++, year recalc, rand()%40+20
   for AI timing, thunk_FUN_0048710a for per-player turn logic

## Current v3 init (init.js)

| Field/Step | Binary | v3 | Status |
|---|---|---|---|
| stateFlags (civ+0x00) | 0x08 (via FUN_0055c69d) | 0x08 (createNewCiv) | MATCH |
| government_type (civ+0x15) | 1=Despotism at init | government='despotism' | MATCH |
| Sci/tax/lux rates | 4/4/1 (0x04/0x04/0x01) | 4/4/1 | MATCH |
| Treasury at init | 0 | 0 | MATCH |
| Chieftain +50 gold | FUN_004a9785 | initNewGame | MATCH |
| Starting tech grants | Gated by turn>0 → 0 techs | Same gate → 0 techs | MATCH |
| Attitudes | rand()%80+10, human scaled | rand()%80+10, human scaled | MATCH |
| Settler placement | RNG + pathfind | assignInitialSettlerPositions | MATCH (structure differs, state same) |
| Per-civ iteration order | 1..7 linear | 1..7 linear | MATCH |
| Government side-effects | FUN_0055c69d handler | Hardcoded rates | STRUCTURAL MISMATCH |

## Known structural gaps

### 1. Government side-effect handler missing

Binary calls `FUN_0055c69d(civ, govType)` whenever government is
assigned. The handler:
- Sets stateFlags bit 0x08
- Recalculates sci/tax/luxury rates based on gov type
- Touches other flags (unit movement status, city production)

v3 bypasses the handler and writes the final rates directly. At init
this matches (despotism IS 4/4/1). At mid-game revolution/gov-change,
the side effects are missed.

Fix: port FUN_0055c69d as `applyGovernment(civ, govType)` in
`charlizationv3/engine/diplomacy.js` or similar, call it from both
createNewCiv and REVOLUTION reducer.

### 2. FUN_00560084 per-turn processor not ported

Sets bit 0x08 under complex conditions involving government==Anarchy,
turn-mod-4, FUN_00453e51, and AI/human branching. Also rolls senate-
override toggle. Responsible for the civ-7-specific bit 0x08 flip on
turn 1 of a fresh game.

Fix: port FUN_00560084 as a per-civ per-turn step. Partial port already
in `engine/reduce/start-turn.js` — only the `stateFlags &= 0xffb7`
clear is implemented. Gov-reassignment and senate-override require
RNG-order audit (task #49) first.

### 3. civ+0x15 government_type read-back from snapshot

The byte at civ+0x15 (government_type) is in the "prefix" region of
civ_struct that `sav-from-mem.js` doesn't copy to the synthesized .sav.
The parser sees government as the first non-prefix byte at save offset
0x15 (memory +0xB5), which is the SAME logical byte because the save
format elides the 0xA0 header. The sniffer `civs` region DOES read the
prefix from memory, so `government` is available for diffing.
