# AI Fidelity Slice Log

One entry per wired slice. Each entry captures what was wired, the
transpiled function(s) called, before/after fidelity numbers, and any
transpiler bugs or RNG issues found. See `ai_fidelity_plan.md` for the
overall plan and per-slice workflow.

---

## Slice 1 — research target selection

**Started**: 2026-04-18
**Status**: scaffolding + standalone validation complete. Not yet
integrated into v3 reducer.

**Transpiled function used:** `FUN_004c09b0` (address 0x004C09B0,
block_004C0000.js). Pure scoring algorithm — returns tech ID or -1.
Calls `FUN_004bfdbe` (eligibility) and `FUN_004bdb2c` (per-tech score).
The UI dialog wrapper `FUN_004c195e` is bypassed — we want the
headless AI path, not the player-prompt path.

**Adapter**: `charlizationv3/engine/binary-ai.js` (new file).
Exports `pickResearch(state, civSlot) → techId`.
Imports from `charlizationv4/blocks/block_004C0000.js` (the runnable
copy; `reverse_engineering/transpiler/output/` is source-of-truth for
audit-against-C but has no runtime imports).

**Standalone test**: `charlizationv4/test-pickresearch.js`.
Loads a snapshot into _MEM, loads RULES.TXT, then prints each civ's
current research target alongside what the transpiled AI would pick.

**Validation run** (turn 3 snapshot, game_20260418_185545):
| Civ | Current | AI pick |
|-----|---------|---------|
| 4 (Aztec, AI)   | Bronze Working   | Horseback Riding   |
| 5 (Amer, human) | Alphabet         | Alphabet  ✓ match  |
| 6 (Carth, AI)   | (none)           | Horseback Riding   |

Civ 5 match is reassuring — scoring deterministic for the current
state. Civ 4 mismatch is expected because the function is being
called on turn 3 state (civ already has a target, 2 beakers invested)
rather than game-init state (when the real pick was made). Can't
truly validate initial picks without a turn 0 snapshot. Adding that
to the capture protocol is TODO.

**Known issues to address before integrating into reducer**:

1. ~~**RNG divergence**~~ **RESOLVED** (2026-04-18). MSVC LCG was
   already implemented in `charlizationv4/crt.js` with the correct
   multiplier (214013) and increment (2531011), but used a
   module-local `_randSeed` variable. Rewired to read/write
   `_MEM[0x00639e50]` — civ2.exe's actual `holdrand` address per
   `block_005F0000.c:2494`. Also added `rand_seed` region to
   `sniff-game.py` SNAPSHOT_REGIONS and wired it into
   `load-snapshot.js`. After sniffer restart + a captured turn,
   loading the snapshot auto-syncs our RNG to civ2.exe's. Mechanics
   fidelity still 179/179 after the rewire — no regression.

2. **State → _MEM sync for live calls** — the test uses
   `loadSnapshotIntoMem` (full binary copy). For v3's reducer flow,
   we need a targeted `syncCivToMem(state, civSlot)` that updates
   just the civ record (flags, tech list at civ+0x74, personality
   lookup). Can extend `v4-bridge.syncStateToMem` or write a focused
   variant.

3. **Trigger points** — real Civ2 calls the picker only in specific
   states:
   - Game init (new_civ): initial tech target
   - Post-TECH_DISCOVERED: next target
   - Possibly strategic shifts
   We need to match these trigger points, not call the picker every
   END_TURN.

**Next steps for this slice**:
- Extend syncStateToMem to sync civ tech list (civ+0x74, 93 bytes).
- Wire `pickResearch` into v3's END_TURN just after TECH_DISCOVERED.
- Add `--skip-replay-event RESEARCH_PICKED` flag to dump-server-state
  so the harness can A/B test: with vs without replaying the event.
- Compare v3's emitted RESEARCH_PICKED to actual events. Flag RNG-
  induced diffs vs algorithm-induced diffs.

**End state for slice 1**: v3 emits correct RESEARCH_PICKED events
without needing the sniffer to replay them. Fidelity harness still
shows 179/179 with RESEARCH_PICKED filtered out of replay.

---

### Trigger decoding (FUN_004c21d5) — done 2026-04-18

The gatekeeper for AI research pick. Signature: `void FUN_004c21d5(int
civ, 0)`. Calls `FUN_004c21ad(civ)` (which wraps `FUN_004c195e` →
`FUN_004c09b0`) under four simultaneous conditions:

1. `*(short*)(&DAT_0064c6aa + civ*0x594) < 0` — current research ID is
   `0xFFFF` (the "no target" sentinel, read as signed short).
2. Player is AI — `(1 << civ) & DAT_00655b0b != 0`.
3. Game is active — `DAT_00655af8 != 0`.
4. No dialog blocking — `DAT_00654fa8 == 0`.

Three call sites inside FUN_004c21d5 that invoke the picker:

- **Line 821** (entry guard): if target is 0xFFFF when the civ enters
  this function, pick one immediately.
- **Line 885** (post tech-discovery popup): after the tech-discovery
  dialog is resolved for an AI civ.
- **Line 1066** (turn-loop gate, in FUN_004c2b73): when research points
  have accumulated (`DAT_0064c6a8 > 0`) AND target is 0xFFFF. This
  explains why civ 4 (Aztec) currently shows `researchingTech=0xFFFF`
  and `researchProgress=0` and the picker is NOT firing — the turn-loop
  gate needs points > 0.

External callers of FUN_004c21d5: `new_civ` in block_004A0000.c,
tech-discovery handler in block_004E0000.c, turn-loop via
FUN_00554423. Matching these triggers in v3 is part of the integration
step (not required to test the picker itself).

### Scorer decoding (FUN_004bdb2c) — done 2026-04-18

Summary of axes:
- **Base**: `cost × personality[0] + base_constant`. Dominant factor.
- **Personality[0]** at `DAT_006554fa + leader*0x30`, offset 0x00.
- **Civ archetype bumps** (0-20 index at civ+0xA6): each archetype
  has 2-5 favored tech IDs boosted +1 to +3, plus 0-2 disfavored
  techs penalized -1 to -2.
- **Wonder-prereq chains**: +0 to +5 if this tech leads to a wonder
  the civ values.
- **Diplomatic demand**: 0-6 points based on how many other civs
  want this tech (doubled in multiplayer).
- **First-to-discover rarity**: +1 if `DAT_00655b82[tech] == 0`.

Rough early-game ordering (no wonders, default personality):
Alphabet > Bronze Working ≈ Horseback Riding > Pottery. Matches
what our picker returned — reassuring.

---

### Fortify/moveSpent timing gets more nuanced (2026-04-18, turn 6→7)

Fresh divergence on turn 6→7: user manually fortified the American
Warrior during their turn 6. Real Civ2 promoted fortifying→fortified
at turn 6→7 boundary (one-turn delay). Earlier auto-fortified Aztec
and Carthaginian warriors took TWO-turn delay because they were
created+fortified in the same END_TURN.

**Fix** (multiple files):
- `reduce/end-turn.js`: promotion gate now uses post-increment turn
  (`postWrapTurn = turnNumber + 1`). Covers both cases uniformly.
- `cityturn.js`: auto-fortify on creation stores
  `fortifyIssuedTurn = createdTurn + 1` so the first cycle-wrap after
  creation does NOT promote (the unit effectively gets one idle turn
  before being eligible). Also added `createdTurn` to new units.
- `reducer.js`: UNIT_ORDER 'fortify' action detects if the unit was
  just created this turn (`createdTurn === currentTurn`) and uses the
  `+1` rule — otherwise treats as manual fortify (no delay).
- `reduce/end-turn.js`: `movesLeft` now `0` for idle units (previously
  set to `mp` which made `activeUnit` logic think they had moves
  available).

Scoped `resetCivs` now walks from `next` through humanCiv (inclusive)
on cycle wrap, matching the observed "civs 0..H have turn-start
processed at snapshot time, civs H+1..7 haven't" invariant.

**Result**: turn 5→6 re-verified 179/179 (no regression). Turn 4→5
passes except the pre-existing `civs[5].flags` timing from
captured-events-before-sniffer-fix. Turn 6→7: 178/179 — one stubborn
`units[3].moveSpent` case.

**Open gap**: the American Warrior (civ 5, slot 3) ends turn 7 with
`moveSpent=3` in v3 but `moveSpent=0` in real Civ2. v3's rule "idle
units have moveSpent=max after reset" gives 3. Comparison across
captured snapshots:

| Unit | Turn observed | Order | moveSpent |
|------|---------------|-------|-----------|
| Aztec Warrior (civ 4)       | 4→ | fortifying→fortified | **3** |
| Carthaginian Warrior (civ 6)| 5→ | fortifying→fortified | **0** |
| American Settler (civ 5)    | 4→ | irrigation           | **3** |
| American Warrior (civ 5)    | 7  | fortified            | **0** |

No clean rule separates the 3-group from the 0-group by unit type,
civ ID, or order-age. Open question — likely needs deeper binary
inspection (specifically: which function actually writes
`+0x08` (moveSpent) at turn start).

### Post-cycle-wrap raw replay for AI unit actions (2026-04-18, turn 8→9)

Turns 8→9 and 9→onward surface the next big class of divergence: AI
civs that process AFTER the cycle wrap (civs 0..H in the new turn)
take actions — unit moves, new unit creations, order changes — that
v3's harness wasn't replaying because it broke out at cycle boundary.

First attempt was to let v3 run another full END_TURN for civ 4 at
turn N+1, but that triggered v3's quirk where END_TURN processes the
NEXT civ's (civ 5, human) cities — resulting in double-counting
Washington's food/shields. Bad.

Fix taken: keep break at cycle boundary, add a **post-cycle-wrap
raw-state replay** that scans events tagged with the new turn and
applies unit-level effects directly (no reducer, no trade/treasury
processing). Initial handling:
- `UNIT_MOVED`: write x/y/cx/cy/gx/gy and also gotoX/gotoY (the
  sniffer-schema field matched the destination for goto_ai orders).
- `UNIT_ORDER`: write the raw order byte.

Turn 8→9 fidelity went from 195/205 → **202/205** (10 → 3
mismatches). Turn 5→6 regression-checked at 179/179.

Remaining 3 mismatches (all `moveSpent` nuances):
- `units[0].moveSpent: 3 vs 6` — Aztec Warrior moved one tile via
  goto_ai but snapshot shows moveSpent=6, which is *2× the unit's
  1-MP max × 3 multiplier*. Unexplained by simple move cost.
- `units[3].moveSpent: 3 vs 0` — American Warrior (ongoing gap from
  earlier slice, idle-but-moveSpent=0 case).
- `units[5].moveSpent: 0 vs 3` — Aztec Phalanx (just created +
  auto-fortified, moveSpent=3 observed). Inverse of the American
  Warrior puzzle.

These form a `moveSpent` cluster that doesn't follow a simple
"idle → moveSpent=max" rule, and isn't deducible from observation
alone. Pending deeper binary inspection of which function writes
unit +0x08 at turn start.

Also still present:
- Turn 7→8: UNIT_CREATED event tagged turn 7 places the Carthage
  warrior at (66,22), but v3's production creates it at the city
  tile (65,23). Need UNIT_CREATED position override in the replay
  pipeline — TODO.
- Settler irrigation completion timing (turn 7→8 slot 1 order
  diverges).

### Terrain-driven fidelity (2026-04-18 session)

Parsing the snapshot's `tiles` region (already captured, just needed
decoding) cracked the remaining moveSpent cluster:

**Findings from real tile terrain:**
- Settler at (54,42) = **Plains** with `imp=irrigation,road` at turn 9.
  Irrigation completed. Plains IRRIGATION_TURNS=5.
- Aztec Warrior moved (11,3 Plains) → (13,3) = **Forest**. Forest move
  cost = 2 MP. In 3-per-MP units, moveSpent=6 — explains the "moveSpent
  exceeds max" mystery. Not combat (agent hypothesis), just terrain cost.
- Carthage city (65,23) = Plains. Warrior spawned at (66,22) = Hills.
- Carthage warrior moved to (68,22) = also Hills.

**moveSpent rules (verified):**
1. Creation: moveSpent = 0, **unless** unit is auto-fortified AND
   owner processes turn-start before human in the cycle, in which
   case moveSpent = unitMP (max). Pre-applied in cityturn.js to
   account for v3's production-after-reset ordering.
2. Owner turn-start reset (idle units):
   - AI civs: moveSpent = mp (max).
   - Human civs: moveSpent UNCHANGED (leave 0 as 0, 3 as 3).
3. Unit move: moveSpent = destination_terrain_move_cost × 3
   (overrides prior). Not clamped at unit's max MP.

**Irrigation counting:** WORKER_ORDER now starts workTurns at 1 (not
0) to match the observed "mid-turn order set counts as first tick of
progress" — derived from Settler's workTurns=2 at the first turn
snapshot after the order event.

**activeUnit logic:** the dumper's "unit with available moves" check
was falsely flagging idle units with movesLeft=0 as active (due to an
`Infinity` fallback for 0 maxMoves). Now skips units with active
non-actionable orders (fortified, sleep, work orders, goto_ai).

**Results:**
- turn 5→6: 179/179 (unchanged).
- turn 6→7: **179/179** 🎯 (was 178/179).
- turn 7→8: 187/192 (was 185/192). Remaining: Carthage warrior
  spawn position (still at city tile in v3).
- turn 8→9: **204/205** (was 195/205). Remaining: Carthage warrior
  moveSpent=6 vs 0 after a post-wrap move.

**Open gaps after this session:**
- Carthage warrior UNIT_CREATED at (66,22) not city tile — unknown
  Civ2 spawn logic (maybe AI immediately moves new unit one tile).
- Post-wrap moved warrior showing moveSpent=0 (Carthage) while our
  replay computes 6 from terrain cost. Suggests real Civ2 clears
  moveSpent at some point in the post-move processing for AI civs
  after the human.

### Refined approach (2026-04-18)

User preference (per conversation): rather than rigidly "finish one
slice then move to the next," continue using the per-turn fidelity
diff as the driver. Whichever event type diverges next becomes the
focus. For this session the focus stays on RESEARCH_PICKED until it
fires in the capture — might take several turns of play before an AI
civ accumulates research, gets a target, and eventually discovers a
tech that triggers a re-pick.

The slice-by-slice structure stays in the plan doc for reference but
execution is now "fix what the diff shows."
