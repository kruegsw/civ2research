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
| govTransitionByte (civ+0x15) | 1 at init, 2 on Palace | (missing → now 1) | FIXED |
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

Sets bit 0x08 under complex conditions involving govTransitionByte,
turn-mod-4, FUN_00453e51, and AI/human branching. Also rolls senate-
override toggle. Responsible for the civ-7-specific bit 0x08 flip on
turn 1 of a fresh game.

Fix: port FUN_00560084 as a per-civ per-turn step.

### 3. civ+0x15 govTransitionByte not saved

The byte at civ+0x15 is in the "prefix" region of civ_struct that
`sav-from-mem.js` doesn't copy to the synthesized .sav (only the
0xA0..end portion gets saved). The parser therefore can't restore it
from a snapshot.

Options:
- Extend sav-from-mem to include the prefix
- Or: keep it in v3 state as a computed/tracked field, not round-
  tripped through save
