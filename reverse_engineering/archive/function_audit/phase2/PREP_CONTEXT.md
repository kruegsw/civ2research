# Phase 2 Preparation Context

Generated automatically by scanning FUNCTION_INDEX.txt, Function_Catalog.md,
rename_map.json, and charlizationv3/engine/**/*.js.

## Summary Statistics

- Total functions in FUNCTION_INDEX: 5149
- Total functions in Function_Catalog: 4822
- Missing from catalog (in index only): 369
- UNKNOWN category (authoritative from catalog Section 2): 742
- JS FUN_ references: 74 unique addresses
- JS exported functions: 75
- Rename map entries: 2612

## Functions Per Block

| Block | In Index | In Catalog | Missing | Unknown-like |
|-------|----------|------------|---------|--------------|
| 00400000 | 154 | 154 | 0 | 63 |
| 00410000 | 204 | 185 | 19 | 27 |
| 00420000 | 157 | 157 | 0 | 50 |
| 00430000 | 114 | 114 | 0 | 38 |
| 00440000 | 355 | 126 | 229 | 44 |
| 00450000 | 136 | 138 | 0 | 60 |
| 00460000 | 107 | 105 | 0 | 26 |
| 00470000 | 139 | 139 | 0 | 67 |
| 00480000 | 61 | 61 | 0 | 11 |
| 00490000 | 124 | 124 | 0 | 58 |
| 004a0000 | 117 | 117 | 0 | 54 |
| 004b0000 | 164 | 164 | 0 | 20 |
| 004c0000 | 92 | 93 | 0 | 25 |
| 004d0000 | 123 | 110 | 12 | 39 |
| 004e0000 | 76 | 76 | 0 | 1 |
| 004f0000 | 107 | 90 | 17 | 29 |
| 00500000 | 123 | 123 | 0 | 3 |
| 00510000 | 162 | 162 | 0 | 31 |
| 00520000 | 51 | 51 | 0 | 4 |
| 00530000 | 23 | 23 | 0 | 8 |
| 00540000 | 37 | 37 | 0 | 9 |
| 00550000 | 152 | 152 | 0 | 22 |
| 00560000 | 131 | 131 | 0 | 20 |
| 00570000 | 122 | 122 | 0 | 46 |
| 00580000 | 91 | 93 | 0 | 16 |
| 00590000 | 157 | 147 | 8 | 55 |
| 005a0000 | 111 | 111 | 0 | 35 |
| 005b0000 | 242 | 244 | 0 | 43 |
| 005c0000 | 339 | 337 | 0 | 143 |
| 005d0000 | 370 | 328 | 84 | 74 |
| 005e0000 | 357 | 357 | 0 | 156 |
| 005f0000 | 346 | 346 | 0 | 300 |
| 00600000 | 103 | 103 | 0 | 0 |
| 00610000 | 2 | 2 | 0 | 0 |

## Category Statistics (Authoritative from Function_Catalog Section 2)

| Category | Count | % |
|----------|-------|---|
| FRAMEWORK | 1312 | 27.2% |
| RENDERING | 894 | 18.5% |
| UI | 788 | 16.3% |
| UNKNOWN | 742 | 15.4% |
| GAME_LOGIC | 513 | 10.6% |
| NETWORK | 279 | 5.8% |
| SOUND | 130 | 2.7% |
| FILE_IO | 90 | 1.9% |
| AI | 74 | 1.5% |
| **TOTAL** | **4822** | **100%** |

## JS Cross-References (FUN_ addresses referenced in engine JS)

74 unique FUN_ addresses referenced across engine JS files.

| FUN_ Address | JS File | Context (first reference) |
|-------------|---------|--------------------------|
| FUN_004087c0 | engine/ai/cityai.js | *   (a) Tile must be in bounds             [FUN_004087c0 != 0] |
| FUN_00408d33 | engine/mapgen.js | // 9-phase pipeline reverse-engineered from FUN_00408d33: |
| FUN_0040a572 | engine/mapgen.js | // Place one continent (FUN_0040a572) |
| FUN_0040a824 | engine/mapgen.js | // Binary (FUN_0040a824): wrapping maps check xMin/xMax to create ocean seam; |
| FUN_0040a892 | engine/mapgen.js | // Mark 3-tile triangular blob (FUN_0040a892) |
| FUN_0040a8db | engine/mapgen.js | // Snap x to valid parity — binary's FUN_0040a8db calls get_tile_ptr which does x & ~1 |
| FUN_0040ab41 | engine/mapgen.js | // FUN_0040ab41: inland sea — if all 4 cardinal neighbors are land, convert to ocean |
| FUN_0040ac5a | engine/mapgen.js | // ── Phase 6: River generation (FUN_0040ac5a, lines 2480-2626) ── |
| FUN_0043d07a | engine/ai/prodai.js | * Ported from FUN_0043d07a (called at line 4197 of FUN_00498e8b) |
| FUN_0043d20a | engine/ai/strategyai.js | /** Check if a city has a building. Equivalent to FUN_0043d20a. */ |
| FUN_00453da0 | engine/ai/prodai.js | // Decompiled: local_9c = thunk_FUN_00453da0(wonderIndex) — is wonder already obsolete? |
| FUN_00453e18 | engine/ai/econai.js | * Port of FUN_00453e18. |
| FUN_00453e51 | engine/ai/data.js | * Equivalent to decompiled FUN_00453e51. |
| FUN_00453e51 | engine/ai/econai.js | * Port of FUN_00453e51: looks up wonder's city index, checks if that |
| FUN_0045705e | engine/ai/diplomai.js | //   FUN_0045705e — diplomacy evaluation (tribute, attitude, tech desire) |
| FUN_00467825 | engine/ai/diplomai.js | // not set), establish initial ceasefire via FUN_00467825 with flags |
| FUN_00467904 | engine/ai/unitai.js | // uVar9 = FUN_00467904(uVar8, cityOwner, 0, 100) → diplomatic score 0-200 |
| FUN_00467af0 | engine/ai/cityai.js | * Ported from FUN_00467af0 (should_declare_war): |
| FUN_00492c15 | engine/ai/unitai.js | *         - Set AI activity: FUN_00492c15 with flag 0x15 |
| FUN_00492e60 | engine/ai/unitai.js | // FUN_00492e60 equivalent — check if we have units on rally point |
| FUN_0049301b | engine/ai/unitai.js | *         - If no adjacent city: build a garrison unit (FUN_0049301b) |
| FUN_00498e8b | engine/ai/cityai.js | // Ported priority from FUN_00498e8b: binary's AI irrigates before roads |
| FUN_00498e8b | engine/ai/prodai.js | // Ported from Civ2 FUN_00498e8b. Comprehensive scoring system that |
| FUN_004bc480 | engine/ai/strategyai.js | //   FUN_004bc480 → assessMilitaryPosture (returns 1-7) |
| FUN_004bc8aa | engine/ai/strategyai.js | //   FUN_004bc8aa → assessCityDefense     (returns 1-7) |
| FUN_004bcb9b | engine/ai/strategyai.js | //   FUN_004bcb9b → assessEconomy         (returns 1-7) |
| FUN_004bcfcf | engine/ai/strategyai.js | //   FUN_004bcfcf → assessDiplomacy       (returns 1-7) |
| FUN_004bd2a3 | engine/ai/econai.js | //   - FUN_004bd2a3 (balanceRates / rate assessment) |
| FUN_004bd2a3 | engine/ai/strategyai.js | //   FUN_004bd2a3 → assessTaxRate         (returns 1-6) |
| FUN_004bd9f0 | engine/ai/econai.js | * Port of FUN_004bd9f0 (simplified — we don't need the bitmask walk, |
| FUN_004bd9f0 | engine/ai/strategyai.js | /** Check if a civ has a specific tech. Equivalent to FUN_004bd9f0. */ |
| FUN_004bdaa5 | engine/ai/econai.js | //   - FUN_004bdaa5 (isPrereqOf — recursive prereq walk) |
| FUN_004bdb2c | engine/ai/econai.js | //   - FUN_004bdb2c (calcTechValue) |
| FUN_004bfdbe | engine/ai/econai.js | //   - FUN_004bfdbe (canResearch — immediate availability check) |
| FUN_004c09b0 | engine/ai/econai.js | //   - FUN_004c09b0 (pickResearchGoal) |
| FUN_004c2788 | engine/research.js | * scenario flags, etc.). Based on FUN_004c2788. |
| FUN_004e989a | engine/production.js | * Trade corruption (FUN_004e989a). Distance-to-capital formula. |
| FUN_004e9c14 | engine/production.js | * Shield waste from distance to capital (FUN_004e9c14). |
| FUN_004ea1f6 | engine/production.js | * Distribute net trade into luxury, tax, and science (FUN_004ea1f6). |
| FUN_004ea1f6 | engine/ai/strategyai.js | // Original code calls FUN_004ea1f6 to recalc happiness — we skip that. |
| FUN_004ea8e4 | engine/happiness.js | // Port of FUN_004ea8e4 from Civ2 binary. Computes happy/unhappy |
| FUN_004eb4ed | engine/ai/strategyai.js | // calls FUN_004eb4ed for deity+ difficulty. We skip that side-effect. |
| FUN_004f00f0 | engine/ai/strategyai.js | * Simplified port of FUN_004f00f0. |
| FUN_005312e4 | engine/ai/cityai.js | * Bonus for neighbor tiles near an enemy city (from Civ2 AI FUN_005312e4). |
| FUN_00531607 | engine/ai/unitai.js | // Otherwise, set goto order toward best city (FUN_00531607 with 0x53). |
| FUN_005351aa | engine/ai/barbarian.js | // Ported from Civ2 FUN_005351aa (barbarian AI master function). |
| FUN_00538a29 | engine/ai/unitai.js | // Ported from Civ2 FUN_00538a29 (unit AI master function). |
| FUN_0055c277 | engine/ai/econai.js | //   - FUN_0055c277 (canUseGovernment — govt tech prereq check) |
| FUN_0055cbd5 | engine/ai/diplomai.js | //   FUN_0055cbd5 — war declaration evaluation (per-continent strength) |
| FUN_0055d1e2 | engine/ai/diplomai.js | //   FUN_0055d1e2 — tech/peace negotiation between two AI civs |
| FUN_0055d685 | engine/ai/diplomai.js | //   FUN_0055d685 — third-party "join war" requests |
| FUN_0055d8d8 | engine/reducer.js | // First contact: establish ceasefire (matching Civ2 FUN_0055d8d8 behavior) |
| FUN_0055d8d8 | engine/ai/diplomai.js | //   FUN_0055d8d8 — main diplomacy encounter orchestrator |
| FUN_0055f5a3 | engine/ai/econai.js | //   - FUN_0055f5a3 (chooseGovernment) |
| FUN_0057e6e2 | engine/reducer.js | * Compute effective defense score for defender selection (matches FUN_0057e6e2). |
| FUN_0057e6e2 | engine/ai/unitai.js | // Ported from: local_54 = thunk_FUN_0057e6e2(local_54, local_168) |
| FUN_00580341 | engine/combat.js | // Special unit interactions ported from decompiled FUN_00580341: |
| FUN_00580341 | engine/ai/unitai.js | // ── Combat scoring (ported from FUN_00580341 logic) ── |
| FUN_0058be56 | engine/rules.js | * Per decompiled FUN_0058be56, Civ2 only checks the 8 immediately |
| FUN_0058f040 | engine/reducer.js | // Faithful to decompiled FUN_0058f040 (process_goody_hut) |
| FUN_0059062c | engine/reducer.js | // Probabilistic movement check (from Civ2 binary FUN_0059062c lines 712-729): |
| FUN_00596b00 | engine/ai/prodai.js | // Decompiled FUN_00596b00: for fuel/propulsion (param_2==1 or 2), |
| FUN_00597d6f | engine/ai/prodai.js | * Ported from Civ2 FUN_00597d6f (spaceship component selection AI) |
| FUN_00598197 | engine/ai/prodai.js | * and FUN_00598197 (component category selection within each phase). |
| FUN_00598d45 | engine/ai/unitai.js | //   local_24 = hasEmbassy (FUN_00598d45) — we approximate as having contact |
| FUN_005adfa0 | engine/ai/prodai.js | * Clamp a value between min and max (mirrors Civ2 FUN_005adfa0). |
| FUN_005adfa0 | engine/ai/unitai.js | // local_cc = FUN_005adfa0(uVar9) → absolute value |
| FUN_005ae006 | engine/ai/data.js | * Equivalent to decompiled FUN_005ae006. |
| FUN_005ae006 | engine/ai/strategyai.js | * Equivalent to FUN_005ae006. |
| FUN_005ae052 | engine/ai/unitai.js | // Binary: iVar11 = FUN_005ae052(dx[local_60] * 4 + local_d4) |
| FUN_005ae296 | engine/production.js | * Civ2 isometric distance (FUN_005ae296 + FUN_005ae31d). |
| FUN_005ae31d | engine/production.js | * Civ2 isometric distance (FUN_005ae296 + FUN_005ae31d). |
| FUN_005ae31d | engine/ai/unitai.js | // ── Distance computation (FUN_005ae31d) ── |
| FUN_005b4b66 | engine/ai/unitai.js | *      (FUN_005b4b66 == 0) → those units should board for transport |
| FUN_005b4c63 | engine/ai/unitai.js | *   divisor = 3 if enemies nearby (FUN_005b4c63 != 0), else 4 |
| FUN_005b50ad | engine/ai/unitai.js | //     (binary: thunk_FUN_005b50ad(local_54,2) < 2 OR has city OR has fortress) |
| FUN_005b53b6 | engine/ai/prodai.js | // Decompiled: local_22c = FUN_005b53b6(unitStackHead, 2) + FUN_005b53b6(...,4)/2 |
| FUN_005b53b6 | engine/ai/unitai.js | * Ported from FUN_005b53b6(unitIdx, roleFilter). |
| FUN_005b6042 | engine/ai/unitai.js | // Ported from line 2914: thunk_FUN_005b6042(local_168, 1) = disband |
| FUN_005b89e4 | engine/ai/cityai.js | *   (b) Tile must be land (not ocean)      [FUN_005b89e4 == 0] |
| FUN_005b89e4 | engine/ai/unitai.js | *         - Check if we're NOT in a city (FUN_005b89e4 == 0) |
| FUN_005b8a81 | engine/ai/cityai.js | // (FUN_005b8a81 / get_tile_continent). Prefer tiles on the same |
| FUN_005b8c42 | engine/ai/cityai.js | * Ported from FUN_005b8c42 (get_tile_effective_owner): |
| FUN_005b8ca6 | engine/ai/cityai.js | * Ported from FUN_005b8ca6 (get_city_owner_at): returns civ slot of |
| FUN_005b8ca6 | engine/ai/unitai.js | *      has a city belonging to target civ (FUN_005b8ca6 >= 0): |
| FUN_005b8d62 | engine/ai/cityai.js | * Ported from FUN_005b8d62 (get_unit_owner_at): returns owner if any |
| FUN_005b8d62 | engine/ai/unitai.js | *           city (FUN_005b8d62 >= 0) — if found, set local_c4 = 1 |
| FUN_005b8ffa | engine/ai/unitai.js | // Ported: thunk_FUN_005b8ffa returns nonzero if goody hut present → +20 |
| FUN_005b94d5 | engine/ai/unitai.js | // Check if the tile is our city (binary: thunk_FUN_005b94d5 returns city flag) |

## JS Engine API (exported functions)

75 exported functions across engine/**/*.js.

| Function | File |
|----------|------|
| applyAction | engine/reducer.js |
| assessCityDefense | engine/ai/strategyai.js |
| assessDiplomacy | engine/ai/strategyai.js |
| assessEconomy | engine/ai/strategyai.js |
| assessMilitaryPosture | engine/ai/strategyai.js |
| assessStrategy | engine/ai/strategyai.js |
| assessTaxRate | engine/ai/strategyai.js |
| balanceRates | engine/ai/econai.js |
| calcBribeCost | engine/rules.js |
| calcBuildingMaintenance | engine/production.js |
| calcCityTrade | engine/production.js |
| calcFoodSurplus | engine/production.js |
| calcGrossFood | engine/production.js |
| calcGrossShields | engine/production.js |
| calcGrossTrade | engine/production.js |
| calcHappiness | engine/happiness.js |
| calcInciteCost | engine/rules.js |
| calcResearchCost | engine/research.js |
| calcRushBuyCost | engine/happiness.js |
| calcSettlerFoodSupport | engine/production.js |
| calcShieldProduction | engine/production.js |
| calcShieldWaste | engine/production.js |
| calcTileFood | engine/production.js |
| calcTileShields | engine/production.js |
| calcTileTrade | engine/production.js |
| calcTradeCorruption | engine/production.js |
| calcTradeDistribution | engine/production.js |
| calcUnitShieldSupport | engine/production.js |
| chooseResearch | engine/ai/econai.js |
| cityHasActiveWonder | engine/utils.js |
| cityHasBuilding | engine/utils.js |
| cityHasWonder | engine/utils.js |
| civHasWonder | engine/utils.js |
| computeAiData | engine/ai/data.js |
| computeLOS | engine/visibility.js |
| considerRevolution | engine/ai/econai.js |
| createAccessors | engine/state.js |
| filterStateForCiv | engine/visibility.js |
| findPath | engine/pathfinding.js |
| foodToGrow | engine/production.js |
| generateBarbarianActions | engine/ai/barbarian.js |
| generateCleanupActions | engine/ai/unitai.js |
| generateDiplomacyActions | engine/ai/diplomai.js |
| generateEconActions | engine/ai/econai.js |
| generateMap | engine/mapgen.js |
| generateMilitaryActions | engine/ai/unitai.js |
| generateProductionActions | engine/ai/prodai.js |
| generateRushBuyActions | engine/ai/prodai.js |
| generateSettlerActions | engine/ai/cityai.js |
| getAvailableResearch | engine/research.js |
| getDirection | engine/movement.js |
| getGameYear | engine/year.js |
| getGameYearFromMap | engine/year.js |
| getGovernment | engine/utils.js |
| getProductionCost | engine/production.js |
| getTileYields | engine/production.js |
| getValidActions | engine/rules.js |
| grantAdvance | engine/research.js |
| hasWonderEffect | engine/ai/data.js |
| improvementFromByte | engine/defs.js |
| initFromSav | engine/init.js |
| initNewGame | engine/init.js |
| initialStateFromSav | engine/state.js |
| isZOCBlocked | engine/movement.js |
| moveCost | engine/movement.js |
| reconstructMapData | engine/state.js |
| resolveCombat | engine/combat.js |
| resolveDirection | engine/movement.js |
| runAiTurn | engine/ai/index.js |
| tileFromBytes | engine/state.js |
| tileToBytes | engine/state.js |
| updateVisibility | engine/visibility.js |
| validateAction | engine/rules.js |
| wonderObsolete | engine/utils.js |
| wrapGx | engine/utils.js |

## Missing Functions (in FUNCTION_INDEX but not in Function_Catalog)

Total: 369 functions not yet cataloged.

### Block 0x00410000 (19 missing)

- 0x0041851f (15 bytes) `FUN_0041851f`
- 0x0041852e (15 bytes) `FUN_0041852e`
- 0x0041853d (15 bytes) `FUN_0041853d`
- 0x0041854c (15 bytes) `FUN_0041854c`
- 0x0041855b (15 bytes) `FUN_0041855b`
- 0x0041856a (15 bytes) `FUN_0041856a`
- 0x00418579 (15 bytes) `FUN_00418579`
- 0x00418588 (15 bytes) `FUN_00418588`
- 0x00418597 (15 bytes) `FUN_00418597`
- 0x004185a6 (15 bytes) `FUN_004185a6`
- 0x004185b5 (15 bytes) `FUN_004185b5`
- 0x004185c4 (15 bytes) `FUN_004185c4`
- 0x004185d3 (15 bytes) `FUN_004185d3`
- 0x004185e2 (15 bytes) `FUN_004185e2`
- 0x004185f1 (15 bytes) `FUN_004185f1`
- ... and 4 more

### Block 0x00440000 (229 missing)

- 0x0044733a (40 bytes) `FUN_0044733a`
- 0x00447362 (29 bytes) `FUN_00447362`
- 0x0044737f (35 bytes) `FUN_0044737f`
- 0x004473bc (40 bytes) `FUN_004473bc`
- 0x004473e4 (29 bytes) `FUN_004473e4`
- 0x00447401 (35 bytes) `FUN_00447401`
- 0x0044743e (40 bytes) `FUN_0044743e`
- 0x00447466 (29 bytes) `FUN_00447466`
- 0x00447483 (35 bytes) `FUN_00447483`
- 0x004474c0 (40 bytes) `FUN_004474c0`
- 0x004474e8 (29 bytes) `FUN_004474e8`
- 0x00447505 (35 bytes) `FUN_00447505`
- 0x00447542 (40 bytes) `FUN_00447542`
- 0x0044756a (29 bytes) `FUN_0044756a`
- 0x00447587 (35 bytes) `FUN_00447587`
- ... and 214 more

### Block 0x004d0000 (12 missing)

- 0x004d49d5 (12 bytes) `FUN_004d49d5`
- 0x004d49e1 (12 bytes) `FUN_004d49e1`
- 0x004d49ed (12 bytes) `FUN_004d49ed`
- 0x004d49f9 (12 bytes) `FUN_004d49f9`
- 0x004d4a05 (12 bytes) `FUN_004d4a05`
- 0x004d4a11 (12 bytes) `FUN_004d4a11`
- 0x004d4a1d (12 bytes) `FUN_004d4a1d`
- 0x004d4a29 (12 bytes) `FUN_004d4a29`
- 0x004d4a35 (9 bytes) `FUN_004d4a35`
- 0x004d4a3e (12 bytes) `FUN_004d4a3e`
- 0x004d4a4a (12 bytes) `FUN_004d4a4a`
- 0x004d4a56 (12 bytes) `FUN_004d4a56`

### Block 0x004f0000 (17 missing)

- 0x004f4673 (15 bytes) `FUN_004f4673`
- 0x004f4682 (15 bytes) `FUN_004f4682`
- 0x004f4691 (15 bytes) `FUN_004f4691`
- 0x004f46a0 (15 bytes) `FUN_004f46a0`
- 0x004f46af (15 bytes) `FUN_004f46af`
- 0x004f46be (15 bytes) `FUN_004f46be`
- 0x004f46cd (15 bytes) `FUN_004f46cd`
- 0x004f46dc (15 bytes) `FUN_004f46dc`
- 0x004f46eb (15 bytes) `FUN_004f46eb`
- 0x004f46fa (15 bytes) `FUN_004f46fa`
- 0x004f4709 (15 bytes) `FUN_004f4709`
- 0x004f4718 (15 bytes) `FUN_004f4718`
- 0x004f4727 (15 bytes) `FUN_004f4727`
- 0x004f4736 (15 bytes) `FUN_004f4736`
- 0x004f4745 (15 bytes) `FUN_004f4745`
- ... and 2 more

### Block 0x00590000 (8 missing)

- 0x0059eb68 (36 bytes) `EnableStackedTabs`
- 0x0059eb8c (36 bytes) `EnableStackedTabs`
- 0x0059ebb0 (36 bytes) `EnableStackedTabs`
- 0x0059ebd4 (36 bytes) `EnableStackedTabs`
- 0x0059ebf8 (36 bytes) `EnableStackedTabs`
- 0x0059ec1c (36 bytes) `EnableStackedTabs`
- 0x0059ec40 (36 bytes) `EnableStackedTabs`
- 0x0059ec64 (36 bytes) `EnableStackedTabs`

### Block 0x005d0000 (84 missing)

- 0x005d47d0 (142 bytes) `FUN_005d47d0`
- 0x005d4870 (41 bytes) `FUN_005d4870`
- 0x005d4899 (55 bytes) `FUN_005d4899`
- 0x005d48d0 (21 bytes) `FUN_005d48d0`
- 0x005d48f0 (117 bytes) `FUN_005d48f0`
- 0x005d4965 (62 bytes) `FUN_005d4965`
- 0x005d49a3 (105 bytes) `show_messagebox_49A3`
- 0x005d4bcb (77 bytes) `FUN_005d4bcb`
- 0x005d4c18 (71 bytes) `show_messagebox_4C18`
- 0x005d5643 (190 bytes) `FUN_005d5643`
- 0x005d5706 (166 bytes) `FUN_005d5706`
- 0x005d57b1 (983 bytes) `FUN_005d57b1`
- 0x005d5b88 (95 bytes) `FUN_005d5b88`
- 0x005d5bec (293 bytes) `FUN_005d5bec`
- 0x005d6222 (97 bytes) `FUN_005d6222`
- ... and 69 more

## Unknown-Category Functions (no clear category signal in description)

Total: 1577 functions with descriptions that don't match
any recognized category keyword. The authoritative Section 2 count is 742 UNKNOWN.
The difference reflects functions with minimal descriptions that partially match other categories.

### By Block

| Block | Unknown-like Count |
|-------|--------------------|
| 00400000 | 63 |
| 00410000 | 27 |
| 00420000 | 50 |
| 00430000 | 38 |
| 00440000 | 44 |
| 00450000 | 60 |
| 00460000 | 26 |
| 00470000 | 67 |
| 00480000 | 11 |
| 00490000 | 58 |
| 004a0000 | 54 |
| 004b0000 | 20 |
| 004c0000 | 25 |
| 004d0000 | 39 |
| 004e0000 | 1 |
| 004f0000 | 29 |
| 00500000 | 3 |
| 00510000 | 31 |
| 00520000 | 4 |
| 00530000 | 8 |
| 00540000 | 9 |
| 00550000 | 22 |
| 00560000 | 20 |
| 00570000 | 46 |
| 00580000 | 16 |
| 00590000 | 55 |
| 005a0000 | 35 |
| 005b0000 | 43 |
| 005c0000 | 143 |
| 005d0000 | 74 |
| 005e0000 | 156 |
| 005f0000 | 300 |

### Sample (first 50)

| Address | Proposed Name | Size | Block | Description (truncated) |
|---------|--------------|------|-------|------------------------|
| 00407980 | status_panel_invalidate_2 | stub | 00400000 | Identical to FUN_0040795a. Duplicate entry or alternate call path. |
| 00407f90 | rect_get_width | stub | 00400000 | Returns `rect[2] - rect[0]` (right - left). |
| 00407fc0 | rect_get_height | stub | 00400000 | Returns `*(rect+0xC) - *(rect+4)` (bottom - top). |
| 00408050 | window_invalidate | stub | 00400000 | Calls invalidate_CE5F on `this->hwnd` with given flag. |
| 004080c0 | window_get_client_width | stub | 00400000 | Calls FUN_005bc933 on `this->hwnd`. |
| 004080f0 | window_update_rect | stub | 00400000 | Calls FUN_005bcb85 on `this->hwnd` with rect. |
| 00408130 | set_paint_handler | stub | 00400000 | Swaps `this->offset_0x0C` with new handler, returns old. |
| 00408170 | set_timer_handler | stub | 00400000 | Swaps `this->offset_0x18` with new handler, returns old. |
| 00408230 | set_handler_0x30 | stub | 00400000 | Swaps `this+0x30` event handler. |
| 00408270 | set_handler_0x34 | stub | 00400000 | Swaps `this+0x34` event handler. |
| 004082b0 | set_handler_0x38 | stub | 00400000 | Swaps `this+0x38` event handler. |
| 004082f0 | set_handler_0x40 | stub | 00400000 | Swaps `this+0x40` event handler. |
| 00408330 | set_handler_0x44 | stub | 00400000 | Swaps `this+0x44` event handler. |
| 004083f0 | window_post_cleanup | stub | 00400000 | Calls FUN_005bd65c(0,0). |
| 00408490 | invalidate_region | small | 00400000 | If rect_ptr==0, uses `this+0x24` as dirty rect and `this+0x48` as surface. Calls FUN_005c0979 + thun |
| 00408580 | window_update_client | stub | 00400000 | Calls FUN_005bc6bb on `this->hwnd` with rect. |
| 00408680 | set_rect_abs | stub | 00400000 | Wrapper for Win32 `SetRect(r, l, t, r2, b)`. |
| 004086c0 | set_rect_wh | stub | 00400000 | Wrapper for `SetRect(r, x, y, x+w, y+h)`. Width/height form. |
| 00408700 | surface_fill_rect_color | stub | 00400000 | Fills rect on surface DAT_00635c64 via thunk_FUN_005a98e4. Rect coords adjusted by -1. |
| 004087c0 | is_tile_valid | small | 00400000 | Returns 1 if 0 <= y < DAT_006d1162 and 0 <= x < DAT_006d1160, else 0. Tile bounds check. |
| 00408830 | map_fill_byte_layer | stub | 00400000 | Fills one byte layer across all DAT_006d1164 tiles: sets `base[i*6] = value` for i in 0..total_tiles |
| 00408873 | map_fill_rect_byte_layer | small | 00400000 | Fills a rectangular region of one byte layer. Computes start offset = (width*starty + startx)*6, the |
| 00408903 | map_copy_byte_layer | stub | 00400000 | Copies one byte layer from src to dst across all tiles: `dst[i*6] = src[i*6]`. |
| 0040a54e | mapgen_seh_cleanup | stub | 00400000 | SEH cleanup: calls thunk_FUN_0059df8a. |
| 0040a564 | mapgen_seh_restore | stub | 00400000 | SEH epilog: restores FS:[0]. |
| 0040a763 | place_land_small | small | 00400000 | Places a small continent. Random size 1-64 tiles, halved if tile already has land. Walks in random c |
| 0040a892 | mark_land_3tiles | stub | 00400000 | Marks 3 adjacent tiles as land: (x,y), (x+1,y-1), (x+1,y+1). Calls mark_land_1tile for each. Creates |
| 0040a8db | mark_land_1tile | stub | 00400000 | Marks a single tile's byte 5 (fertility/ownership) = 1 if within bounds. Wraps x via FUN_005ae052. |
| 0040a92f | place_land_large | medium | 00400000 | Places a large continent (up to 48 tiles). Similar to place_land_small but with 25% chance of extra  |
| 0040aaa4 | place_land_island | small | 00400000 | Places a small island (1-16 tiles). Random walk marking single tiles via mark_land_1tile. |
| 0040bc10 | text_add_label_id | stub | 00400000 | Adds a label by ID (from LABELS.TXT) to the text buffer. |
| 0040bdac | balance_tax_rates | small | 00400000 | Ensures tax + lux + sci == 10. Increments/decrements unlocked sliders respecting max rate from civ[] |
| 0040beec | taxrate_set_tax | medium | 00400000 | Sets tax rate slider. Clamps to [0, max_rate], rebalances other sliders via balance_tax_rates, updat |
| 0040c07f | taxrate_set_luxury | medium | 00400000 | Sets luxury rate slider. Same logic as taxrate_set_tax but for luxury (+0x2E8). |
| 0040c212 | taxrate_set_science | medium | 00400000 | Sets science rate slider. Same logic for science (+0x2E4). |
| 0040ddb6 | taxdlg_seh_restore | stub | 00400000 | SEH epilog. |
| 0040debe | show_taxdlg_seh_restore | stub | 00400000 | SEH epilog. |
| 0040e38d | findcity_seh_cleanup | stub | 00400000 | SEH cleanup. |
| 0040e3a3 | findcity_seh_restore | stub | 00400000 | SEH epilog. |
| 0040ef70 | ctrl_get_height | stub | 00400000 | Returns `this+4` (control height). |
| 0040efd0 | ctrl_measure_text | stub | 00400000 | Measures text width via measure_text_858E using font from `*this`. |
| 0040f010 | ctrl_destructor_and_free | stub | 00400000 | Calls FUN_005bd915 (destructor), conditionally frees memory. Scalar deleting destructor pattern. |
| 0040f26e | dtor_checkbox_array | stub | 00400000 | Vector destructor for 3 checkbox controls at offset +0x418, size 0x3C each. |
| 0040f2c6 | dtor_seh_restore | stub | 00400000 | SEH epilog. |
| 0040f480 | init_base_ctrl | small | 00400000 | Zeroes out a control structure: type=0, hwnd=0, rect=(0,0,0,0), flags=0, id=-1. |
| 0040f5c3 | ctrl_destroy_chain_1 | stub | 00400000 | Calls thunk_FUN_0040f510. |
| 0040f5d6 | ctrl_destroy_seh_restore | stub | 00400000 | SEH epilog. |
| 0040f730 | ctrl_init_params | small | 00400000 | Initializes control parameters: parent, type, id, copies rect. Clears callback/selection fields. Cal |
| 0040f880 | ctrl_set_value | stub | 00400000 | Sets `this+0x30` = value. Current value of slider/checkbox. |
| 0040f8b0 | init_checkbox_ctrl | stub | 00400000 | Checkbox control constructor. Calls init_base_ctrl. SEH frame. |
