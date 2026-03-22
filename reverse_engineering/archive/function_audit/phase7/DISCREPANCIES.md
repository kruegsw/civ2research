# Phase 7: Discrepancies Found

All mismatches between binary decompiled C and JS engine code.
Each entry includes the fix applied.

## Running Count: 27 discrepancies found, 5 fixed, 22 reported (6 enhancement-tier, 11 from block_00440000, 4 from block_00460000, 5 from block_00480000)

---

### D1: Missing railroad +50% food bonus
- **Block**: 004E0000
- **Function**: FUN_004e868f (calc_tile_resource, 1533 bytes)
- **Binary**: Railroad tiles get `food = food + food / 2` (+50% food, rounded down), applied after irrigation/harbor, before despotism penalty
- **JS before fix**: `calcTileFood()` in production.js had NO railroad food bonus. `calcTileShields()` had the +50% shield bonus correctly. This was an oversight where shields were ported but food was missed.
- **Fix**: Added `hasRailroad` parameter to `calcTileFood()` (default false for backward compatibility). Updated `getTileYields()` to compute hasRailroad (from `imp.railroad` OR center tile + Railroad tech 67) and pass it. Also updated `citydialog.js` `_calcTileFood()` with the same logic.
- **Impact**: All cities with railroad tiles were producing less food than they should. Most noticeable in late-game cities with extensive railroad networks. A grassland tile with irrigation + railroad was producing 3 food instead of 4 (33% less on that tile).
- **Files**: `engine/production.js`, `public/js/citydialog.js`
- **Regression**: 200-turn sim seeds 42/99/7 all pass

---

### D2: Missing treaty/diplomatic cleanup when civ is killed
- **Block**: 004E0000
- **Function**: FUN_004e1763 (kill_or_retire_civ, 3942 bytes)
- **Binary**: Step 3 explicitly clears all treaty flags and attitude entries for the dead civ against every other civ. This prevents stale diplomatic data from persisting (critical when civ slots are recycled via respawn).
- **JS before fix**: `killCiv()` in diplomacy.js cleared alive bitmask, killed units, destroyed spaceship, cleared visibility, and checked victory — but never cleaned up `state.treatyFlags` or `state.treaties` entries involving the dead civ.
- **Fix**: Added treaty cleanup loop in `killCiv()` that deletes all `treatyFlags` entries for `civSlot-*` and `*-civSlot`, and all `treaties` entries involving the dead civ.
- **Impact**: Stale treaty data remained for killed civs. If a civ slot was recycled (respawn after 50+ turns), the new civ would inherit treaty relationships from the dead civ.
- **Files**: `engine/diplomacy.js`
- **Regression**: 200-turn sim seeds 42/99/7 all pass

---

### D3: Missing Marco Polo's Embassy contact-setting on wonder completion
- **Block**: 004E0000
- **Function**: FUN_004e7270 (acquire_wonder, 486 bytes)
- **Binary**: When Marco Polo's Embassy (wonder 9) is completed, the binary calls `set_contact(owner, civ)` for every alive civ — establishing diplomatic contact with all civilizations.
- **JS before fix**: `processCityProduction()` in cityturn.js had no handler for wonder 9. Contact was only established passively through AI strategy evaluation, meaning Marco Polo had no immediate effect on completion.
- **Fix**: Added wonder 9 handler in cityturn.js wonder completion section: loops civs 1-7, skips self and dead civs, calls `addTreatyFlag(state, activeCiv, ci, TF.CONTACT)` for each. Also added imports for `addTreatyFlag` and `TF` from diplomacy.js.
- **Impact**: Building Marco Polo's Embassy had no immediate diplomatic effect. Contact with unknown civs was delayed until AI evaluation happened to trigger it.
- **Files**: `engine/cityturn.js`
- **Regression**: 200-turn sim seeds 42/99/7 all pass

---

### D4: Specialist auto-fill on growth + wrong removal priority on famine
- **Block**: 004E0000
- **Function**: FUN_004e9719 (adjust_specialist_count, 149 bytes)
- **Binary**: (1) When workers + specialists < expected after growth, unassigned citizens become entertainers. (2) On famine/shrink, specialists removed in priority order: scientist first, then taxman, then entertainer.
- **JS before fix**: (1) No specialist auto-fill — if autoAssignWorker found no tile, the new citizen was "lost" (not tracked as worker or specialist). (2) Famine removed the last element of specialists array regardless of type (`newSpecs.slice(0, -1)`).
- **Fix**: (1) Added deficit check after growth: if `workedTiles.length + specialists.length < newSize - 1`, add entertainers to fill gap. (2) Changed famine specialist removal to search for scientist first (lastIndexOf), then taxman, then pop last.
- **Impact**: (1) Cities with no available tiles would silently lose citizens on growth. (2) Famine could remove an entertainer before a scientist, causing unexpected unhappiness spikes.
- **Files**: `engine/cityturn.js`
- **Regression**: 200-turn sim seeds 42/99/7 all pass

---

### D5: cancel_goto_if_blocked not ported (enhancement)
- **Block**: 00420000
- **Function**: FUN_0042738c (cancel_goto_if_blocked, 90 bytes)
- **Binary**: When a unit on goto (orders 0x0B) encounters a newly-visible enemy, cancel the goto (set orders 0xFF) unless the unit is an air unit (domain 7).
- **JS**: No equivalent. Goto orders are never cancelled based on enemy sighting.
- **Status**: NOT FIXED — enhancement-tier. Goto cancellation on enemy sighting improves gameplay UX but is not a formula/balance bug.
- **Recommended fix**: In the unit movement reducer or post-move hook, check if any unit on goto can now see an enemy unit. If so, and the unit is not air, cancel the goto order.

---

### D6: cancel_goto_for_stack not ported (enhancement)
- **Block**: 00420000
- **Function**: FUN_004273e6 (cancel_goto_for_stack, 192 bytes)
- **Binary**: Walk all units in a stack; for any unit with sentry orders (0x03), cancel if the unit's domain is not LAND or the tile is water. This wakes sentries when enemies appear.
- **JS**: No equivalent wake-sentry-on-enemy logic.
- **Status**: NOT FIXED — enhancement-tier. Sentry wake on enemy sighting is a convenience feature.
- **Recommended fix**: Add sentry wake logic when an enemy unit becomes visible within the sentry's vision range.

---

### D7: process_unit_move_visibility missing sub-features (enhancement)
- **Block**: 00420000
- **Function**: FUN_004274a6 (process_unit_move_visibility, 4250 bytes)
- **Binary**: Master post-move handler with extensive side-effects: civ tile memory updates (per-civ fog-of-war snapshot), discovery flag types, treaty violation diplomatic incidents from proximity, extended visibility for attacker/air units (tiles 8-24 in city spiral), barbarian terrain recording, goto cancellation for encountered enemies.
- **JS**: `updateVisibility()` handles basic tile reveal. Move-unit reducer handles some encounter logic. Missing: goto cancellation, per-civ tile memory, discovery flags, proximity-based treaty violations, extended attacker visibility radius, barbarian terrain recording.
- **Status**: NOT FIXED — enhancement-tier. The most impactful missing features: (1) extended visibility radius for attacker/air units, (2) goto cancellation when enemies spotted, (3) proximity-based treaty violation diplomatic incidents.
- **Recommended fix**: Port features incrementally in priority order.

---

## Block 00440000 — Trade Routes, City Deletion, Wonder Production

### D8: Trade revenue split incorrect — binary adds full to BOTH treasury AND research
- **Block**: 00440000
- **Function**: FUN_00440750 (caravan delivery, 3144 bytes)
- **Binary**: Lines 330-332: Adds full `iVar6` to civ treasury (`DAT_0064c6a2 + iVar4 * 0x594`), then separately adds full `iVar6` to research total (`DAT_0064c6a8 + iVar4 * 0x594`). Both fields receive the FULL revenue amount.
- **JS**: `reducer.js` lines 615-616: `goldShare = floor(revenue/2)`, `sciShare = revenue - goldShare` — splits 50/50. Players get half the expected gold and half the expected research.
- **Status**: NOT FIXED — HIGH severity. Both treasury and research should receive the full trade revenue amount, not a 50/50 split.
- **Files**: `engine/reducer.js` ~line 615

---

### D9: Trade diplomatic effect only applies one direction instead of both
- **Block**: 00440000
- **Function**: FUN_00440750 (caravan delivery, 3144 bytes)
- **Binary**: Line 321-322: Calls `thunk_FUN_00456f20(destOwner, homeOwner, -10)` AND `thunk_FUN_00456f20(homeOwner, destOwner, -10)` — adjusts attitudes in BOTH directions by -10.
- **JS**: `reducer.js` lines 650-665: Only adjusts dest owner's attitude toward home owner; does not adjust home owner's attitude toward dest owner.
- **Status**: NOT FIXED — Medium severity.
- **Files**: `engine/reducer.js` ~line 650

---

### D10: Missing difficulty modifier on caravan trade distance
- **Block**: 00440000
- **Function**: FUN_00440750 (caravan delivery, 3144 bytes)
- **Binary**: Difficulty flags `DAT_00655af0`: if `& 4` (easier), `distance = distance * 4 / 5`; if `& 8` (harder), `distance = distance * 5 / 4`
- **JS**: No difficulty modifier on trade distance.
- **Status**: NOT FIXED — Low severity.
- **Files**: `engine/reducer.js` ~line 508

---

### D11: Trade route road/railroad distance bonus uses wrong formula
- **Block**: 00440000
- **Function**: FUN_00440750 (caravan delivery, 3144 bytes)
- **Binary**: Checks both cities for Railroad flag (0x20) and Airport flag (0x19). Railroad: if both cities have railroad and same continent, +1 to distance factor; different continent, +2. Airport: adds +1 each. Total factor applied: `revenue += factor * revenue >> 1`.
- **JS**: `production.js` line 619 approximates with flat +50% if civ has Railroad tech — not per-city, not dependent on actual road connections.
- **Status**: NOT FIXED — Medium severity.
- **Files**: `engine/production.js` ~line 619, `engine/reducer.js`

---

### D12: Pre-200AD trade revenue doubling not implemented
- **Block**: 00440000
- **Function**: FUN_00440750 (caravan delivery, 3144 bytes)
- **Binary**: If game year (DAT_00655af8) < 200 AND civ lacks both Alphabet (tech 0x26=38) and Writing (tech 0x39=57), revenue is doubled.
- **JS**: Not implemented.
- **Status**: NOT FIXED — Low severity (early-game only).
- **Files**: `engine/reducer.js`

---

### D13: Communism tech -33% penalty on trade revenue not implemented
- **Block**: 00440000
- **Function**: FUN_00440750 (caravan delivery, 3144 bytes)
- **Binary**: If civ has Communism (tech 0x43=67), `revenue -= revenue / 3`
- **JS**: Not implemented.
- **Status**: NOT FIXED — Medium severity.
- **Files**: `engine/reducer.js`

---

### D14: Democracy tech -33% penalty on trade revenue not implemented
- **Block**: 00440000
- **Function**: FUN_00440750 (caravan delivery, 3144 bytes)
- **Binary**: If civ has Democracy (tech 0x1e=30), `revenue -= revenue / 3`
- **JS**: Not implemented.
- **Status**: NOT FIXED — Medium severity.
- **Files**: `engine/reducer.js`

---

### D15: City deletion kills homeless units instead of reassigning them
- **Block**: 00440000
- **Function**: delete_city @ 0x004413D1 (1704 bytes)
- **Binary**: When a city is deleted, all units homed to that city are reassigned to the nearest valid city of the same owner (with special handling for sea units requiring a port city). Only if no valid city exists are units disbanded.
- **JS**: Units homed to a deleted city are killed.
- **Status**: NOT FIXED — Medium severity (affects gameplay significantly when cities are captured/destroyed).
- **Files**: `engine/reducer.js`

---

### D16: Trade route replacement value formula simplified
- **Block**: 00440000
- **Function**: FUN_00440453 (trade route add/replace, 765 bytes)
- **Binary**: Route value comparison uses city trade revenue weighted by distance, with continent modifier (same-continent halved) and owner modifier (same-owner halved), plus Railroad connectivity bonus.
- **JS**: `reducer.js` lines 586-596: Route value is simply `distance + (foreignTrade ? 10 : 0)`.
- **Status**: NOT FIXED — Low severity (only affects which route gets replaced at the 3-route limit).
- **Files**: `engine/reducer.js` ~line 590

---

### D17: Wonder-group completion bonus not implemented
- **Block**: 00440000
- **Function**: FUN_00441b11 (change production, 2572 bytes)
- **Binary**: When a wonder is completed and all alive civs have completed all wonders in the same group, bonus shields are awarded based on difficulty level.
- **JS**: Not implemented.
- **Status**: NOT FIXED — Low severity (rare edge case).
- **Files**: `engine/cityturn.js` or `engine/reducer.js`

---

### D18: Demand slot match formula has owner-dependent variant
- **Block**: 00440000
- **Function**: FUN_00440750 (caravan delivery, 3144 bytes)
- **Binary**: When commodity matches a demand slot, the formula depends on whether the commodity owner matches the unit's home city owner: if same owner, `revenue = revenue * 2 + commodityBonus`; if different, `revenue = (revenue + commodityBonus) * 2`.
- **JS**: `reducer.js` line 552: Always uses `revenue = revenue * 2 + commodityBonus` regardless of owner.
- **Status**: NOT FIXED — Low severity.
- **Files**: `engine/reducer.js` ~line 551

---

### D19: addTreatyFlag cascade clears wrong bits on peace/ceasefire
- **Block**: 00460000
- **Function**: FUN_00467825 (addTreatyFlag, 223 bytes)
- **Binary**: When setting CEASEFIRE/PEACE/ALLIANCE (any of 0x0e), clears 0x2a60 = INTRUDER(0x20) + HOSTILITY(0x40) + bit9(0x200) + WAR_STARTED(0x800) + WAR(0x2000)
- **JS**: Clears `PEACE_CLEARS = 0x3840` = HOSTILITY(0x40) + WAR_STARTED(0x800) + CAPTURE_VENDETTA(0x1000) + WAR(0x2000). Misses INTRUDER(0x20) and bit9(0x200); incorrectly includes CAPTURE_VENDETTA(0x1000).
- **Status**: NOT FIXED — Minor severity.
- **Files**: `engine/diplomacy.js` ~line 148

---

### D20: Attitude clamped to [-100, 100] instead of [0, 100]
- **Block**: 00460000
- **Function**: FUN_00467933 (setAttitude, 120 bytes)
- **Binary**: Attitude values clamped to [0, 100]. Minimum attitude is 0.
- **JS**: `adjustAttitude()` clamps to [-100, 100], allowing negative attitudes the binary never does.
- **Status**: NOT FIXED — Moderate severity (attitude < 0 should not be possible).
- **Files**: `engine/diplomacy.js` ~line 335

---

### D21: Alliance break does not relocate units from former ally's cities
- **Block**: 00460000
- **Function**: FUN_00467baf (withdrawUnitsOnAllianceBreak, 835 bytes)
- **Binary**: When an alliance breaks, units of each civ inside the former ally's cities are relocated to the nearest friendly city.
- **JS**: `wakeUnitsNearEnemy()` only wakes sleeping units. Does not relocate units from inside former ally's cities.
- **Status**: NOT FIXED — Moderate severity (units stranded in enemy cities).
- **Files**: `engine/diplomacy.js`

---

### D22: Provocation threshold function not implemented
- **Block**: 00460000
- **Function**: FUN_00467af0 (shouldProvoke, 191 bytes)
- **Binary**: AI helper that returns true if attitude > 49 AND in contact-only status (no peace/alliance), or if ceasefire expiring.
- **JS**: No equivalent function. AI uses different logic.
- **Status**: NOT FIXED — Enhancement-tier (AI behavior).
- **Files**: N/A

---

### D23: Year table not difficulty-dependent
- **Block**: 00480000
- **Function**: FUN_00484fec (turn-to-year conversion, 540 bytes)
- **Binary**: Uses a piecewise-linear year table at DAT_0062c490 with per-difficulty entries (6 periods x 12 bytes x 6 difficulty levels, stride 0x48). Also supports scenario flags (bit 2 = -1, bit 3 = +1 to difficulty index) and scenario calendar mode with custom start year + years-per-turn.
- **JS**: Uses a single hardcoded SCHEDULE array in year.js that matches Prince-level table. No difficulty variation, no scenario calendar mode.
- **Status**: NOT FIXED — Enhancement-tier (year display differs slightly on non-Prince difficulties; game mechanics use turn numbers internally).
- **Files**: `engine/year.js`

---

### D24: Missing continent matching for city-based barbarian spawning
- **Block**: 00480000
- **Function**: FUN_00485c15 (barbarian spawning, 3297 bytes)
- **Binary**: City-based barbarian spawning verifies that the spawn tile is on the same continent as the triggering city (via thunk_FUN_005b8a81 continent comparison).
- **JS**: `spawnBarbarians()` in reduce/barbarians.js does not verify continent matching — barbarians could theoretically spawn on a different continent than the triggering city.
- **Status**: NOT FIXED — Minor (barbarians might occasionally spawn on wrong continent near coastal cities).
- **Files**: `engine/reduce/barbarians.js`

---

### D25: Power-graph war trigger uses city count instead of militarism rating
- **Block**: 00480000
- **Function**: FUN_004853e7 (power graph + alpha-strike diplomacy, 2094 bytes)
- **Binary**: Alpha-strike war declaration checks `vendettaCount * 3 + 3 < attacker.militarism` — based on the AI's accumulated vendetta/militarism score from the diplomacy system.
- **JS**: War trigger at end-turn.js:783 checks `aiCities * 3 + 3 > humanCities` — based on relative city counts rather than the militarism rating.
- **Status**: NOT FIXED — Minor (war declaration probability is slightly different; binary trigger is based on aggressive posture, not city count).
- **Files**: `engine/reduce/end-turn.js`

---

### D26: Global warming missing severe degradation branch
- **Block**: 00480000
- **Function**: FUN_004868fb (terrain degradation, 819 bytes)
- **Binary**: Two degradation branches: (1) for tiles with few land neighbors (< 7 - warmingCount): hash-based tile selection, mild degradation. (2) for tiles with many land neighbors (>= 7 - warmingCount): always degrades to swamp/desert, clears road and fortress improvements. Branch 2 affects heavily-developed inland areas.
- **JS**: Only implements branch 1 (hash-based selection). Tiles with many land neighbors that should get severe degradation are not affected. Road and fortress improvements are not cleared by global warming.
- **Status**: NOT FIXED — Minor but impacts late-game balance (warming effects are milder than binary, especially in developed inland areas).
- **Files**: `engine/reduce/end-turn.js` (lines 223-254)

---

### D27: Missing near-city healing bonus for ground units
- **Block**: 00480000
- **Function**: FUN_00488cef (heal_units, 1438 bytes)
- **Binary**: Ground units within distance 3 of an own city (but not ON the city tile) get a healing bonus: `healBase += 1` (or +2 with barracks). This is in addition to the field heal rate.
- **JS**: Healing code at end-turn.js:469-540 only gives the city healing bonus when the unit is ON the city tile (same gx/gy). Units 1-3 tiles away heal at field rate.
- **Status**: NOT FIXED — Minor (ground units adjacent to cities heal slightly slower than in the original game).
- **Files**: `engine/reduce/end-turn.js` (lines 505-531)
