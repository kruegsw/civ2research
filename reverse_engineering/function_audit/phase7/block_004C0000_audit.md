# Block 004C0000 — Phase 7 Audit

**Functions in this block: 92**
**Lines: 5,119**
**Systems: Build checks (improvement/wonder), research (cost/selection/discovery UI), settler/worker orders, espionage (spy missions, bribe, incite, sabotage, terror incidents, civil war), paradrop, RULES.TXT/CITY.TXT editing, Civilopedia, scenario editor UI**

---

## FW — Framework (21 functions)

FUN_004c193a @ 0x004C193A | 12B | N/A (wrapper — thunk_FUN_0059df8a, heap cleanup for FUN_004c0cf7)
FUN_004c1950 @ 0x004C1950 | 14B | N/A (SEH unwind thunk for FUN_004c0cf7)
FUN_004c217c @ 0x004C217C | 12B | N/A (wrapper — thunk_FUN_0059df8a, heap cleanup for FUN_004c195e)
FUN_004c2188 @ 0x004C2188 | 12B | N/A (wrapper — thunk_FUN_0059df8a, heap cleanup for FUN_004c195e)
FUN_004c219e @ 0x004C219E | 15B | N/A (SEH unwind thunk for FUN_004c195e)
FUN_004c2763 @ 0x004C2763 | 12B | N/A (wrapper — thunk_FUN_0059df8a, heap cleanup for FUN_004c21d5)
FUN_004c2779 @ 0x004C2779 | 15B | N/A (SEH unwind thunk for FUN_004c21d5)
FUN_004c9504 @ 0x004C9504 | 12B | N/A (wrapper — thunk_FUN_0059df8a, heap cleanup for FUN_004c6bf5)
FUN_004c951a @ 0x004C951A | 14B | N/A (SEH unwind thunk for FUN_004c6bf5)
FID_conflict:_$E31 @ 0x004CC8F0 | 26B | N/A (CRT static init — calls FUN_004cc90a + FUN_004cc924)
FUN_004cc90a @ 0x004CC90A | 26B | N/A (CRT — thunk_FUN_0055339f, static object init)
FUN_004cc924 @ 0x004CC924 | 29B | N/A (CRT — _atexit register for FUN_004cc941)
FUN_004cc941 @ 0x004CC941 | 26B | N/A (CRT — COleCntrFrameWnd destructor for DAT_006a18c0)
FID_conflict:_$E31 @ 0x004CC95B | 26B | N/A (CRT static init — calls FUN_004cc975 + FUN_004cc98f)
FUN_004cc975 @ 0x004CC975 | 26B | N/A (CRT — thunk_FUN_004187a0, static object init)
FUN_004cc98f @ 0x004CC98F | 29B | N/A (CRT — _atexit register for FUN_004cc9ac)
FUN_004cc9ac @ 0x004CC9AC | 26B | N/A (CRT — thunk_FUN_00418870, static object destructor)
FID_conflict:_$E51 @ 0x004CC9C6 | 26B | N/A (CRT static init — calls FUN_004cc9e0 + FUN_004cc9fe)
FUN_004cc9e0 @ 0x004CC9E0 | 30B | N/A (CRT — thunk_FUN_0043c460(0,0x10), static dialog init)
FUN_004cc9fe @ 0x004CC9FE | 29B | N/A (CRT — _atexit register for FUN_004cca1b)
FUN_004cca1b @ 0x004CCA1B | 26B | N/A (CRT — thunk_FUN_0043c520, static object destructor)

---

## UI — User Interface (30 functions)

### Research UI (6 functions)

FUN_004c0b51 @ 0x004C0B51 | 151B | N/A (research goal dialog helper — draw text with column offset, calls FUN_005cef31)
FUN_004c0be8 @ 0x004C0BE8 | 155B | N/A (research goal dialog helper — draw text with custom font height, calls thunk_FUN_0047df20/50)
FUN_004c0c83 @ 0x004C0C83 | 116B | N/A (research goal dialog helper — draw text centered, same as 004c0b51)
FUN_004c0cf7 @ 0x004C0CF7 | 3119B | N/A (research goal picker UI — 3-tab dialog: Advances/Unit Types/Improvements, with Civilopedia help links, CPropertySheet)
FUN_004c195e @ 0x004C195E | 2078B | N/A (research chooser dialog — shows available techs, Civilopedia links, handles tab switching, calls FUN_004c09b0 for AI pick and FUN_004c0cf7 for sub-menus)
FUN_004c21ad @ 0x004C21AD | 40B | N/A (wrapper — thunk_FUN_004c195e(param_1, 0), opens research chooser for non-steal mode)

### Tech Discovery UI (1 function)

FUN_004c21d5 @ 0x004C21D5 | 1422B | N/A (tech discovery announcement — shows "CIVADVANCE" dialog with icons/Civilopedia, handles new-worker-skill popups like NEWXFORM/NEWFORTRESS/NEWRAILROAD/NEWFARMLAND/NEWPARADROP/NEWAIRLIFT, triggers next research pick for AI civs, updates advisor windows)

### Espionage UI (4 functions)

FUN_004cc870 @ 0x004CC870 | 43B | N/A (wrapper — thunk_FUN_004a6bdc, show espionage message box with icon)
FUN_004cc8b0 @ 0x004CC8B0 | 41B | N/A (wrapper — thunk_FUN_004a6e39, show espionage option selection dialog)
FUN_004c654d @ 0x004C654D | 133B | N/A (incident check dialog — prompts human player "INCIDENT" yes/no if war status with target, returns whether to abort spy action)
show_messagebox_CA35 @ 0x004CCA35 | 132B | N/A (Civilopedia page count guard — if requested page > max, shows MessageBoxA error; else delegates to thunk_FUN_00498159)

### Civilopedia / Scenario Editor / RULES.TXT-CITY.TXT File Editing (17 functions)

FUN_004ccab9 @ 0x004CCAB9 | 52B | N/A (init RULES.TXT section editor — sets first section callback pair at DAT_006a1880)
FUN_004ccaed @ 0x004CCAED | 125B | N/A (register RULES.TXT section — appends section name+callback to array at DAT_006a1880, max 7 entries)
FUN_004ccb6a @ 0x004CCB6A | 588B | N/A (draw 3D border frame — decorative beveled rectangle for dialogs, calls thunk_FUN_005a9b5d/005a99fc)
FUN_004ccdb6 @ 0x004CCDB6 | 57B | N/A (helper — sprintf integer into global string buffer DAT_00679640)
FUN_004ccdef @ 0x004CCDEF | 318B | N/A (helper — append tech name to buffer; handles -2=none, -1=none, 0-99=tech name, >=100=future tech)
show_messagebox_CF2D @ 0x004CCF2D | 1149B | N/A (save RULES.TXT — reads old file, writes modified sections via callback array, creates .BAK backup, handles scenario vs. standard path logic)
FUN_004cd3d7 @ 0x004CD3D7 | 1171B | N/A (save CITY.TXT line modification — reads CITY.TXT, finds section/line by prefix match, replaces single line, creates .TMP/.BAK backups)
FUN_004cd8a6 @ 0x004CD8A6 | 1069B | N/A (save CITY.TXT civ name updates — renames all @CITY_xxx sections to match current civ names from game state)
FUN_004cdcf6 @ 0x004CDCF6 | 71B | N/A (char filter — returns 1 if char is digit 0-9, '-', or 0xD6; used for numeric input validation)
FUN_004cdd3d @ 0x004CDD3D | 489B | N/A (checkbox dialog — shows dialog with per-civ checkbox flags, reads/writes DAT_00631ed8 bitmask)
FUN_004cdf26 @ 0x004CDF26 | 12B | N/A (wrapper — thunk_FUN_0059df8a, heap cleanup for FUN_004cdd3d)
FUN_004cdf3c @ 0x004CDF3C | 15B | N/A (SEH unwind thunk for FUN_004cdd3d)
FUN_004cdf4b @ 0x004CDF4B | 79B | N/A (clamp helper — clamp value between min/max, sets DAT_0062e014=1 if clamped)
FUN_004cdfa4 @ 0x004CDFA4 | 498B | N/A (create scenario editor dialog window — sets up frame, title, dimensions, scrollbar, toolbar, calls FUN_005bb4ae)
FUN_004ce196 @ 0x004CE196 | 349B | N/A (load Civilopedia text — reads 20 text entries from file via FUN_004cffb0, stores into DAT_006a1d78 array, calls FUN_004cef35 to load scenario variant)
FUN_004ce2f3 @ 0x004CE2F3 | 47B | N/A (reset Civilopedia state — clears DAT_006a4f98/9c, invalidates CRichEditDoc cache)
FUN_004ce322 @ 0x004CE322 | 104B | N/A (init Civilopedia window — calls thunk_FUN_00552112, sets up control bounds, tab grid 0x29×0x12)

### Civilopedia Window UI (2 functions)

FUN_004ce38a @ 0x004CE38A | 867B | N/A (show Civilopedia entry — creates dialog with text/buttons, runs modal event loop until DAT_006a4f9c==0, displays formatted paragraphs and OK/Previous buttons)
FUN_004ce71b @ 0x004CE71B | 290B | N/A (validate city name — checks vs. Civilopedia civ name list, prompts "NOCITY" if conflict)

---

## GL — Game Logic (36 functions)

### Build Checks (2 functions)

FUN_004c02d8 @ 0x004C02D8 | 199B | **canBuildWonder** → `engine/buildcheck.js:canBuildWonder()`
- Binary: Checks wonder prereq tech via thunk_FUN_004bd9f0, slot not already built (DAT_00655be6 == -1), scenario flags (DAT_00655af0 & 0x80, DAT_0064bc60 & 4), special-case wonder 0x17.
- JS: Checks prereq tech, slot availability (w.cityIndex != null), destroyed flag, obsolescence tech.
- **DISCREPANCY**: Binary has scenario override flags (DAT_00655af0 bit 7 suppresses normal checks; DAT_0064bc60 bit 2 further qualifies; DAT_00655b07 cheatmode bypasses). JS does not handle scenario override flags. **Minor** — scenario editor concern only.
- **DISCREPANCY**: Binary special-cases wonder index 0x17 (wonder 23 = SETI Program) with additional condition on param_2==0x17 to allow building when scenario flag is set. JS doesn't have this special case. **Minor**.

FUN_004c03ae @ 0x004C03AE | 1383B | **canBuildImprovement** → `engine/buildcheck.js:canBuildImprovement()`
- Binary: Complex nested conditions checking: tech prereq (thunk_FUN_004bd9f0), city already has building (thunk_FUN_0043d20a), port/coastal check (DAT_0064f344 bit 0x80), building chains (Granary→Supermarket requires factory, etc.), mutual exclusion for power plants, spaceship parts require Apollo, government-specific buildings.
- JS: Handles tech prereq, already built, building chains via IMPROVE_REQUIRES_BUILDING, coastal, power plant mutual exclusion, palace unique, spaceship parts.
- **DISCREPANCY**: Binary building #3 (Marketplace) checks `thunk_FUN_00453e51(param_1,0)` (wonder effect check — Lighthouse/Colossus check?) to block building if certain wonder is present. Building #11 (Aqueduct) checks `thunk_FUN_00453e51(param_1,10)`. Building #7 (Courthouse) checks existing building #1 (Palace). These specific wonder-blocks-improvement checks are not in JS. **Minor** — edge case restrictions.
- **DISCREPANCY**: Binary checks buildings 0x1e-0x1f (30-31) require `DAT_0064f344 bit 0x80` (coastal). Binary checks buildings 0x22 (34) and 0x1c (28) require both bit 0x20 of DAT_0064f346 AND bit 0x80 of DAT_0064f344. JS uses a simpler COASTAL_BUILDINGS set. The compound bit checks may represent "has river" or "has port" requirements. **Minor** — terrain qualification differences.
- **DISCREPANCY**: Binary has extensive checks for spaceship parts (buildings >= 0x23=35): scenario flags, Apollo wonder (0x80 on DAT_00655ae8), spaceship launched (DAT_00655c18), required number of prior parts, and calls thunk_FUN_004a7577. JS checks Apollo wonder and launch status but doesn't validate part sequence. **Minor** — spaceship build order not enforced in JS.

### Research System (4 functions)

FUN_004c09b0 @ 0x004C09B0 | 417B | **pickResearchGoal (AI)** → `engine/ai/econai.js:pickResearchGoal()`
- Binary: Iterates 100 techs, calls thunk_FUN_004bfdbe (canResearch) for each, uses randomized scoring via thunk_FUN_004bdb2c (tech value lookup) with difficulty-based randomness. AI civs (checked via DAT_00655b0b bitmask) use `rand() % 3 + value - 1` scoring; human civs use `rand() % value`. Special-case skip every 3rd tech for AI when DAT_00655b08 (difficulty) != 0.
- JS: Similar logic — iterates available techs, uses getAvailableResearch + random scoring weighted by tech value. AI difficulty weighting implemented.
- **MATCH**: Core logic matches. JS uses different random seeding but same scoring structure.

FUN_004c2788 @ 0x004C2788 | 1003B | **calcResearchCost** → `engine/research.js:calcResearchCost()`
- Binary: Base cost = diffIdx*2+6 for AI, 14-diffIdx for human. Leading civ comparison, behind bonus (-1, and -1 more at deity+150 turns), ahead penalty. Late-game penalty (totalTechs > 19). Scenario multiplier (DAT_0064bcd3/DAT_0064bcb2). Progressive 75% adder (scaled if totalTechs < 20). City count scaling (67 cap = 0x43). Raging hordes. Bloodlust. Human minimum floor (11-totalTechs). Final cost = baseCost * totalTechs, capped at 32000.
- JS: Implements all the same steps: base cost, leading civ comparison, behind/ahead adjustments, deity super-behind, late penalty, COSMIC_TECH_MULTIPLIER, progressive modifier, city count scaling, raging hordes, human floor. AI scaling at end.
- **DISCREPANCY**: Binary has two separate scenario multipliers: `DAT_0064bcd3` for normal game, `DAT_0064bcb2` for scenario (DAT_00655af0 & 0x80). JS uses only `COSMIC_TECH_MULTIPLIER`. **Minor** — scenario tech rate override not implemented.
- **DISCREPANCY**: Binary has "bloodlust" check `(DAT_00655af0 & 8)` which scales cost by 4/5. JS checks `gameState.barbarianActivity === 'raging'` for the raging flag `(DAT_00655af0 & 4)` but does not implement the bloodlust `(DAT_00655af0 & 8)` flag as a separate modifier. **Minor** — bloodlust is an uncommon scenario flag.
- **DISCREPANCY**: Binary AI base cost formula is `(14 - difficultyLevel)` for human, and `difficultyLevel*2+6` for AI. JS applies AI scaling as a post-multiplier `cost * (14 - diffIdx) / 10` rather than using a separate base cost formula for AI. The net effect differs slightly. **Medium** — AI research speed may diverge from binary.

FUN_004c2b73 @ 0x004C2B73 | 458B | **addResearchBeakers** → `engine/reduce/end-turn.js` (inline in end-turn processing)
- Binary: Adds beakers to player's research accumulator (DAT_0064c6a8). If researchTarget >= 0, compares accumulated beakers to cost from FUN_004c2788. If enough, calls FUN_004c21d5 to grant tech. Also checks "revolution pending" flag (DAT_0064c6a0 bit 0x20) and forces a new tech grant if set. If no research target chosen (< 0), triggers tutorial message for first-time AI civs, then calls FUN_004c21ad to pick research.
- JS: End-turn processing adds science beakers and checks threshold. grantAdvance and handleTechDiscovery are called. Revolution-pending bit not implemented.
- **DISCREPANCY**: Binary checks `DAT_0064c6a0 bit 0x20` ("revolution pending" or "Darwin's Voyage" trigger) which forces an immediate second tech grant. JS does not implement this flag. **Medium** — Darwin's Voyage free-tech-on-revolution may not trigger properly.

FUN_004c21d5 (already classified as UI above) — the actual tech-grant logic is `thunk_FUN_004bf05b(param_1,local_30c,param_2,0,0)` called from within this UI function. The GL portion (grantAdvance, handleTechDiscovery) is ported in `engine/research.js`.

### Settler/Worker Actions (8 functions)

FUN_004c4210 @ 0x004C4210 | 31B | N/A (set paradrop range — writes value to DAT_0063cc30 array)
- Binary: `DAT_0063cc30[param_1 * 4] = (uint)param_2`. Stores per-civ paradrop range.
- Not directly ported but referenced in `engine/movement.js` as hardcoded range=10.
- **DISCREPANCY**: Binary allows per-civ paradrop range via this setter (param_2 comes from RULES.TXT DAT_0064bcdb). JS hardcodes `paradropRange = 10`. **Minor** — scenario-modded ranges won't work.

FUN_004c4240 @ 0x004C4240 | 43B | N/A (wrapper — thunk_FUN_004a6b80, show unit order message box)

FUN_004c4280 @ 0x004C4280 | 21B | N/A (wrapper — thunk_FUN_0041f8d9, unknown accessor)

FUN_004c42a0 @ 0x004C42A0 | 2035B | **executeWorkerOrder** → `engine/reduce/end-turn.js:completeWorkerOrder()` + `engine/reduce/helpers.js`
- Binary: Large switch on order type (4=road, 5=railroad, 6=irrigation, 7=mine, 8=transform, 9=fortress, 10=airbase). Calculates turns-to-complete based on terrain work values (DAT_00627cc8). Adds progress (DAT_006560fd). When complete, modifies terrain improvements via thunk_FUN_005b94fc. Road: sets bit 0x40, clears bit 0x02. Railroad: toggles bit 0x10/0x30 based on existing roads and Railroad tech (0x43). Irrigation: handles terrain type change vs. improvement bit. Mine: similar terrain change vs. bit. Transform: changes terrain type. Fortress: clears pollution bit 0x80, sets bit 0x80. Airbase: sets bits 0x42.
- JS: completeWorkerOrder handles road/railroad/irrigation/mine/fortress/airbase/pollution. Turn counting is in end-turn.js inline.
- **DISCREPANCY**: Binary has specific terrain transformation logic (case 6/7): if terrain has negative work value, it changes the terrain type rather than adding an improvement. E.g., irrigating a particular terrain may convert it to another terrain type via `thunk_FUN_005b9646(x,y,terrainType,1)`. JS implements terrain improvements but may not handle all terrain-type-change cases. **Medium** — terrain transformation (e.g., irrigating plains→grassland) may differ.
- **DISCREPANCY**: Binary handles Farmland creation (irrigation on already-irrigated tile that has roads): checks `(bVar4 & 0x10)` (road) and existing improvements to upgrade. Binary also handles the case where Railroad tech (0x43) is known to upgrade roads to railroads during the build. JS handles basic irrigation but may not implement farmland-from-re-irrigation. **Medium** — Farmland creation may not work correctly.
- **DISCREPANCY**: Binary case 9 (fortress) decrements global `DAT_00655b12` (fortress count) when clearing pollution bit 0x80 from a polluted tile before building. JS does not track global fortress count. **Minor** — pollution interaction edge case.

FUN_004c4ada @ 0x004C4ADA | 580B | **settlerBuildCity** (goto-to-city-site) → partially in `engine/reduce/end-turn.js`
- Binary: Sets unit order to 2 (goto), finds nearest city belonging to owner via thunk_FUN_0043cf76. If no city found, searches for empty buildable tile via thunk_FUN_0043d07a with city size check > 2. Assigns unit home city (DAT_00656100). Updates city window.
- JS: Settler "build city" is an explicit action in reducer, not an auto-assignment system.
- **No direct JS equivalent** — this is AI/auto settler management.

FUN_004c4d1e @ 0x004C4D1E | 335B | **settlerFoundCity** → `engine/reducer.js` BUILD_CITY action
- Binary: Gets unit coordinates. If observer mode or unit owner matches current player, calls thunk_FUN_004105f8 (reveal map). Calls thunk_create_city to found city. If city name provided (param_3), copies it. Disbands settler (thunk_FUN_005b4391). Clears tile improvements (thunk_FUN_005b94fc bits 0x7c=all). Reveals map for all civs 1-7 (thunk_FUN_005b8b1a). Updates map display.
- JS: BUILD_CITY action in reducer creates city, removes unit, handles naming.
- **DISCREPANCY**: Binary clears tile improvement bits 0x7c (road/railroad/irrigation/mine/fortress/airbase/pollution) when founding a city. JS may not clear all these bits. **Minor** — cosmetic, cities override tile improvements.
- **DISCREPANCY**: Binary calls `thunk_FUN_005b8b1a(x,y,playerIndex)` for players 1-7 to reveal the city tile to all civs. JS handles visibility differently through its own fog-of-war system. **Minor** — visibility propagation timing.

FUN_004c4e6d @ 0x004C4E6D | 611B | **executeGotoOrder** → `engine/movement.js` (movement system)
- Binary: Handles unit goto/patrol order execution. Sets unit status flags. Calls thunk_FUN_004adafc for pathfinding. If destination reached (same tile as goto target) and not patrol mode: clears order, sets flag 0x80 (sleep/done). For AI settlers (checked by domain type '\x02'), if role is settler/worker, assigns to nearest city.
- JS: Movement system handles goto via pathfinding module.
- **DISCREPANCY**: Binary has special handling for settler-class units (role '\x04') at destination: sets turn counter to `(byte)DAT_00655af8 & 7` (turn timer for auto-worker). JS does not implement this auto-worker timer at destination. **Minor**.

FUN_004c50d0 @ 0x004C50D0 | 824B | **pillageTileImprovement** → `engine/rules.js` (pillag logic)
- Binary: Gets unit at tile. Checks ownership/war status. Determines which improvement to remove in priority order: Airbase (if settler and road exists) → Railroad → Irrigation/Farmland → Fortress → Airbase → Road/Mine. For specific param_2 > 0, removes that specific improvement. After removing, if foreign city exists, triggers visibility/diplomacy updates and "looting" sound (0x2000).
- JS: Pillage handling exists but may differ in priority order.
- **DISCREPANCY**: Binary pillageable improvement priority differs from typical Civ2 documentation. Binary checks settler-type units specially for the airbase case. JS may use a simpler priority. **Minor** — pillage order edge cases.

FUN_004c5408 @ 0x004C5408 | 158B | **dispatchWorkerAction** → inline in `engine/reduce/end-turn.js`
- Binary: Switch on unit order byte: case 1 → FUN_004c4ada (goto-build-city), cases 4-10 → FUN_004c42a0 (worker improvement), cases 0xb/0x1b → FUN_004c4e6d (goto/patrol). Returns 1 if action executed, 0 if no valid order.
- JS: End-turn processing has inline order dispatch.
- **MATCH**: Structural match — same order codes routed to same handlers.

### Espionage System (10 functions)

handle_incident_terror @ 0x004C59F0 | 1465B | **handleIncidentTerror** → `engine/espionage.js` + `engine/reduce/espionage-actions.js`
- Binary: Complex diplomatic incident handler. Checks sneak attack flags (DAT_0064c6c1 bit 0x20 = truce, DAT_0064c6c0 bits 0xe = war status). If no diplomatic contact, applies reputation penalty via thunk_FUN_00456f20. For human players: shows pretext/allied dialog, handles war declaration. For AI-AI: sends multiplayer message. Checks senate scandal possibility: government >= Republic, random check, forces revolution via thunk_FUN_0055c69d if scandal triggered.
- JS: handleIncidentTerror in espionage.js handles terror incident flagging, reputation effects, and war declaration.
- **DISCREPANCY**: Binary has senate scandal mechanic: if government is Republic (5) or Democracy (6), random chance causes forced revolution to Anarchy. Communism (`DAT_0064c6b5 == '\x04'`) blocks the scandal. JS may not implement the senate scandal / forced revolution on espionage incident. **Medium** — senate scandal missing.
- **DISCREPANCY**: Binary checks `(DAT_00655af0 & 0x80) == 0 || (DAT_0064bc60 & 1) == 0` for senate scandal — scenario flags that can disable senate. JS does not implement scenario senate override. **Minor**.

FUN_004c5fae @ 0x004C5FAE | 1271B | **spyDiplomatAction (survive/die)** → `engine/espionage.js:checkSpySurvival()`
- Binary: Handles spy/diplomat post-action processing. Diplomats (unit type 0x2F=47 in decimal, but '/' = 0x2F = Diplomat) are checked: survival odds = (param_2<0 ? 1:0)+2, doubled if veteran (0x2000 flag), halved if hard mission (param_2>0), coin flip bonus if odds<2. If survives (rand()%odds != 0), spy moved to owner's nearest city. If caught, spy killed. Triggers handle_incident_terror if applicable.
- JS: checkSpySurvival() implements the same survival formula.
- **DISCREPANCY**: Binary identifies Diplomat by checking `(&DAT_006560f6)[param_1 * 0x20] == '/'` (unit type byte 0x2F = 47). The JS comment says "type 46" for diplomats. Standard Civ2: Diplomat=unit type 46 (0x2E), Spy=47 (0x2F). **Potential bug** — the binary checks '/' which is 0x2F = 47 decimal. If unit type 46 is Diplomat and 47 is Spy, then the binary is checking if the unit is a Spy (type 47/'/'=0x2F), not a Diplomat. Need to verify unit type numbering vs. character representation. The key logic is: if the unit is NOT a Spy (type 47), it always dies (no survival check). This matches the Civ2 rule that Diplomats always die and Spies have survival chance. **MATCH** after careful reading.
- **DISCREPANCY**: Binary has a "picked up gold" mechanic: `(&DAT_006560f8)[param_1 * 0x20] += DAT_0064bcc8` (adds movement cost worth of gold when successfully completing espionage action). JS does not implement this gold-gain-on-spy-action. **Minor**.

FUN_004c64aa @ 0x004C64AA | 163B | **spyCaughtCheck** → `engine/espionage.js:spyCaughtCheck()`
- Binary: Wrapper around FUN_004c5fae with param_2=-1 (caught scenario). If spy survives, returns 0 (not caught). If spy dies, shows "NAILED" dialog for human, returns 1 (caught).
- JS: spyCaughtCheck calls checkSpySurvival with successLevel=-1.
- **MATCH**: Logic matches.

FUN_004c65d2 @ 0x004C65D2 | 232B | **calcCityRevoltDistance** → `engine/espionage.js:calcCityRevoltDistance()`
- Binary: Iterates all cities (DAT_00655b18 count). For cities owned by param_1 with Palace (building 1, via thunk_FUN_0043d20a(local_c,1)), calculates distance via thunk_FUN_005ae31d. Returns minimum distance, default 0x10 (16).
- JS: Iterates state.cities, checks owner + building 1 (Palace), computes tileDist, caps at 16.
- **MATCH**: Logic matches.

FUN_004c66ba @ 0x004C66BA | 1339B | **executeCivilWar** → `engine/citycapture.js:handleCivilWar()`
- Binary: City revolt / civil war execution. Reveals captured city area (21-tile radius) to new owner via thunk_FUN_005b976d. Updates map visibility. Shows "CIVILWAR" dialog. Transfers nearby units (within distance < 2, or distance == 1 if not in another city) from old owner to new owner: decrements/increments unit counts, changes owner, resets home city, clears movement, resets orders. Calls thunk_FUN_0057b5df (full civil war with city transfer).
- JS: handleCivilWar in citycapture.js splits civ, transfers cities and nearby units.
- **DISCREPANCY**: Binary unit transfer check: units within Manhattan distance < 2, but excludes units in another city (distance == 0 with city present → included, distance == 1 without city → included, distance == 1 with city → excluded). JS may not have this exact distance + city-presence check for unit transfer. **Minor** — edge case in unit transfer radius.
- **DISCREPANCY**: Binary clears order/status for transferred units: if order is not 1 (goto-build) and not 2 (goto-city), order is set to 0xFF (none). JS resets orders differently. **Minor**.

FUN_004c6bf5 @ 0x004C6BF5 | 10469B | **spyEntersCity** → `engine/reduce/espionage-actions.js` + `engine/espionage.js`
- Binary: Massive function (10KB). Handles all spy/diplomat actions when entering a city. For human players: shows "SPYMENU" dialog with 8 options (embassy, investigate, steal tech, sabotage, poison water, plant nuke, incite revolt, counter-intelligence). For AI: selects action based on diplomatic status and difficulty level. Then executes the chosen action via switch:
  - Case 0: Establish embassy — sets embassy bit 0x80, updates map view.
  - Case 1: Investigate city — shows city dialog, sets city flag 0x400000.
  - Case 2: Steal tech — random tech selection from target's known techs, spy survival check.
  - Case 3: Sabotage building — random or specific building destruction, spy survival check.
  - Case 4: Poison water — reduces city population by 1 (or clears food box if size < 2).
  - Case 5: Plant nuke — multiple spy caught checks, triggers nuclear explosion, potential global reputation hit.
  - Case 6: Incite revolt — cost calculation (see calcInciteCostEnhanced), treasury deduction, civil war trigger.
  - Case 7: Counter-intelligence — sets spy status bits (flag 0x02), counter-spy strength based on difficulty.
- JS: espionage-actions.js handles these actions through reducer dispatch.
- **DISCREPANCY**: Binary case 7 (counter-intelligence): calculates counter-spy strength as `base + difficultyBonus[difficulty] + rand()%6`, where base is 5 (diplomat) or 10 (spy), with veteran bonus +2. Uses a lookup table `local_3f0[9..14]` for difficulty bonus. JS may not implement counter-intelligence with this formula. **Medium** — counter-intelligence strength calculation.
- **DISCREPANCY**: Binary case 5 (plant nuke): checks if government is NOT Democracy (DAT_0064c6b5 != '\x04'), and if so, 50% chance of global reputation hit (all civs get -100 reputation and war declared). JS may not implement the "global outrage" mechanic for non-democracy nuclear plantings. **Medium** — nuke reputation consequences.
- **DISCREPANCY**: Binary case 6 (incite revolt): Communism/Republic distance cap (dist > 9 → dist=10) is checked on the TARGET civ's government, not the spy's. Courthouse (building 7) halves distance. Cost = `citySize * (treasury+1000) / (dist+3)`. Capital halves cost. No defenders halves cost. Original owner match halves cost. JS calcInciteCostEnhanced matches these checks.
- **MATCH (case 6 cost formula)**: JS correctly implements all binary cost factors.
- **DISCREPANCY**: Binary AI action selection is complex: default to steal (2), but switches to embassy (0) if peaceful, sabotage (3) if city has city walls and no embassy, incite (6) if difficulty >= 3 and treasury allows and diplomatic tension. JS AI espionage selection may differ. **Medium** — AI espionage behavior.

pick_up_unit_004c9528 @ 0x004C9528 | 2453B | **bribeUnit** → `engine/espionage.js:calcBribeCostEnhanced()` + `engine/reduce/espionage-actions.js`
- Binary: Bribe unit logic. Checks: unit not already at max bribe attempts (thunk_FUN_005b50ad returns >= 2 → abort). Democracy government blocks bribery entirely. Tech prerequisite (DAT_0064b563 = Espionage tech) required for AI bribers. Cost formula: `unit_cost * (treasury + 750) / (distance_to_palace + 2)`. Non-settler units halved. Communism caps distance at 10 (checked on TARGET owner, not briber). For human: shows DESERT dialog with cost, waits for confirmation. For multiplayer: sends bribe request via network protocol (0x63).
- JS: calcBribeCostEnhanced implements cost formula.
- **DISCREPANCY**: Binary bribe cost formula uses `(int)(char)(&DAT_0064b1c8)[(unit_type) * 0x14]` which is the raw unit shield cost from the unit type table. JS uses `UNIT_COSTS[target.type] / 10`. If UNIT_COSTS stores ×10 values, the division is correct, but need to verify the cost source matches. **Minor** — verify unit cost scaling.
- **DISCREPANCY**: Binary checks Communism cap on the TARGET owner's government via `(&DAT_0064c6b5)[param_2 * 0x594]` which indexes by param_2 (the briber civ). Wait — re-reading: `param_2` is the briber, and `iVar2` is the target owner. The `calcCityRevoltDistance` call uses `iVar2` (target owner) for distance. The Democracy check `(&DAT_0064c6b5)[iVar2 * 0x594] == '\x06'` blocks bribe if TARGET is Democracy. JS checks spy's government for Communism cap instead of target's. **Medium** — government check is on wrong civ for Communism distance cap.
- **DISCREPANCY**: Binary has "settler role cost" check: `if ((&DAT_0064b1ca)[(unit_type) * 0x14] != '\x05') cost /= 2` — non-settler units get halved cost. JS checks `target.type !== 0 && target.type !== 1` (not Settler/Engineer types). The binary uses the role field from unit type definition, not a hardcoded type ID. **Minor** — role-based vs. type-based check.

FUN_004c9ebd @ 0x004C9EBD | 784B | **spySabotageUnit** → `engine/reduce/espionage-actions.js`
- Binary: Spy sabotage of a unit. Checks bribe attempts < 2. If target is Spy (type '/') and scenario flag (DAT_00655ae8 & 0x10): shows "SABOTAGEOPTIONS" dialog (bribe or sabotage). For sabotage: triggers explosion animation (0x7c), deals half max HP damage. For bribe: delegates to pick_up_unit_004c9528. Shows "BLEWITUP" message. Spy survival check via FUN_004c5fae.
- JS: espionage-actions.js SABOTAGE_UNIT action.
- **DISCREPANCY**: Binary damage is half the target's max HP (`iVar4 / 2`). JS may use a different damage formula. **Minor** — verify damage amount.

FUN_004ca1cd @ 0x004CA1CD | 460B | **airliftUnit** → `engine/reducer.js` AIRLIFT action (if implemented)
- Binary: Sets airlift flag (city bit 0x10000) on both source and destination cities. Moves unit to destination city tile. Random 1/6 chance per flight segment of being shot down (destroyed). Shows "SHOTDOWN" or "AIRLIFT" message.
- JS: Airlift may not be fully implemented.
- **DISCREPANCY**: Binary has shot-down mechanic: for each `param_4` segments, `rand() % 6 == 0` → unit killed. JS likely does not implement this risk. **Medium** — airlift shot-down risk missing.

FUN_004ca39e @ 0x004CA39E | 2572B | **paradropUnit** → `engine/movement.js:validateParadrop()` + scatter logic
- Binary: Validates paradrop: range check (DAT_0064bcdb = paradrop range), target tile must be land (thunk_FUN_005b89e4 == 0), not enemy-occupied (unless own territory or unowned). Peace treaty check via thunk_FUN_00579ed0. Landing scatter: for each of 8 adjacent tiles, scores by emptiness (unowned = +200, random 0-5, diagonal bonus +3). Unit lands at best-scoring adjacent tile facing toward the city/target. Updates all players' visibility. Sets flag 0x10 (has-paradropped). If landing on enemy city, triggers city capture (thunk_FUN_0057b5df).
- JS: validateParadrop() checks range, terrain, peace treaty. resolveParadropScatter() implements landing scatter.
- **DISCREPANCY**: Binary paradrop range is from `DAT_0064bcdb` (RULES.TXT cosmic value), used via FUN_004c4210 setter. JS hardcodes `paradropRange = 10`. **Minor** — already noted above.
- **MATCH**: Core paradrop validation and scatter logic match between binary and JS.

### Unit Management (1 function)

FUN_004c54da @ 0x004C54DA | 1297B | **unitAutoGoto** (find nearest transport/city) → AI unit management
- Binary: Finds nearest friendly city or transport for a unit (by Manhattan distance). For sea units (domain 1), searches all units of same owner for carriers/transports with 0x80 flag or 0x10 flag. If found and not at destination, sets goto order (0x0b) to that location. Checks unit remaining movement against distance. For human units at a port with no goto needed, just wakes unit.
- JS: No direct equivalent — AI unit goto is handled through AI subsystem.
- **No JS equivalent** — AI/automation logic not ported as standalone function.

### Civilopedia/Editor Infrastructure (5 functions)

FUN_004ce83d @ 0x004CE83D | 103B | N/A (clear Civilopedia list control — sends LB_RESETCONTENT (0x14F) to all items in list box)
FUN_004ce8a4 @ 0x004CE8A4 | 95B | N/A (read INI integer — reads key from .INI file section via thunk_FUN_0051d63b, converts to long via _atol)
FUN_004ce903 @ 0x004CE903 | 139B | N/A (allocate and copy string — heap-allocates string with given min size, copies param_1, used for Civilopedia node strings)
FUN_004ce98e @ 0x004CE98E | 1367B | N/A (deep-copy Civilopedia tree — walks linked list at offset 0x1bc, copies all node data and string fields at various offsets)
FUN_004cef35 @ 0x004CEF35 | 144B | N/A (load scenario Civilopedia — allocates 50KB, copies Civilopedia data from scenario overlay, copies back)

### Civilopedia Data Management (7 functions)

FUN_004cefc5 @ 0x004CEFC5 | 12B | N/A (wrapper — thunk_FUN_004fa569, heap cleanup for FUN_004cef35)
FUN_004cefdb @ 0x004CEFDB | 14B | N/A (SEH unwind thunk for FUN_004cef35)
FUN_004cefe9 @ 0x004CEFE9 | 347B | N/A (rename leader in Civilopedia — walks linked list, replaces all occurrences of leader name at offsets 0x08, 0x90, 0xDC, 0x148)
FUN_004cf144 @ 0x004CF144 | 630B | N/A (rename title in Civilopedia — walks linked list, replaces title strings at offsets 0x14, 0x20, 0x88, 0xC4, 0xCC, 0xD4, 0x140, 0x174)
FUN_004cf3ba @ 0x004CF3BA | 201B | N/A (rename advisor in Civilopedia — walks linked list, replaces advisor name at offsets 0x10, 0x13C)
FUN_004ce6ed @ 0x004CE6ED | 12B | N/A (wrapper — thunk_FUN_0040f570, dialog cleanup for FUN_004ce38a)
FUN_004ce6f9 @ 0x004CE6F9 | 9B | N/A (wrapper — thunk_FUN_0040f570, dialog cleanup for FUN_004ce38a)
FUN_004ce70c @ 0x004CE70C | 15B | N/A (SEH unwind thunk for FUN_004ce38a)
FUN_004cff70 @ 0x004CFF70 | 43B | N/A (Civilopedia — calls FUN_005bd270 on internal ECX object, draw helper)
FUN_004cffb0 @ 0x004CFFB0 | 51B | N/A (Civilopedia — calls send_msg_2DED, reads text content from internal object)
FUN_004cfff0 @ 0x004CFFF0 | 142B | N/A (trim trailing whitespace — removes trailing spaces and tabs from string, used by RULES.TXT parser)

---

## AI — Artificial Intelligence (0 standalone functions)

All AI-relevant functions in this block are classified under GL or UI:
- FUN_004c09b0 (GL/Research — pickResearchGoal, called for both AI and human paths)
- FUN_004c4ada (GL/Settler — settlerBuildCity auto-assignment for AI settlers)
- FUN_004c54da (GL/Unit Management — unitAutoGoto, AI unit transport/city-seeking)
- FUN_004c4e6d (GL/Settler — executeGotoOrder, handles AI settler auto-worker at destination)
- FUN_004c4280 (UI — thunk wrapper)

---

## Summary

| Category | Count |
|----------|-------|
| FW (Framework) | 21 |
| UI (User Interface) | 30 |
| GL (Game Logic) | 41 |
| AI (Artificial Intelligence) | 0 |
| **Total** | **92** |

---

## Discrepancies Summary

### Medium Priority

1. **calcResearchCost (FUN_004c2788)**: Binary uses separate base cost formulas for human vs. AI (`14-diff` vs `diff*2+6`). JS applies AI scaling as a post-multiplier instead. Net research speed for AI civs may diverge.

2. **addResearchBeakers (FUN_004c2b73)**: Binary checks "revolution pending" flag (bit 0x20 on DAT_0064c6a0) to force an immediate second tech grant (Darwin's Voyage). JS does not implement this flag.

3. **executeWorkerOrder (FUN_004c42a0)**: Binary has terrain-type-change logic when irrigating/mining certain terrains (negative work values trigger type transformation). JS may not handle all terrain transformation cases. Also, farmland creation from re-irrigation not fully implemented.

4. **handle_incident_terror (FUN_004c59f0)**: Binary has senate scandal mechanic — Republic/Democracy governments face random forced revolution to Anarchy on espionage incidents. JS does not implement senate scandal.

5. **spyEntersCity/counter-intelligence (FUN_004c6bf5 case 7)**: Counter-intelligence strength formula uses difficulty-based lookup table. JS may use a simpler formula.

6. **spyEntersCity/plant nuke (FUN_004c6bf5 case 5)**: Non-democracy nuke planting has 50% chance of global outrage (all civs declare war). JS may not implement this.

7. **bribeUnit (FUN_004c9528)**: Binary checks Communism distance cap on TARGET owner, while JS espionage.js checks on the SPY's owner. Government check is on wrong civ.

8. **airliftUnit (FUN_004ca1cd)**: Binary has 1/6 per-segment shot-down risk. JS likely does not implement airlift risk.

### Minor Priority

9. **canBuildWonder (FUN_004c02d8)**: Scenario override flags and SETI special case not in JS.

10. **canBuildImprovement (FUN_004c03ae)**: Wonder-blocks-improvement checks, compound coastal/river terrain checks, spaceship part build order not enforced.

11. **calcResearchCost (FUN_004c2788)**: Scenario tech rate multiplier (separate from cosmic), bloodlust flag scaling (4/5 multiplier) not implemented.

12. **paradrop range (FUN_004c4210)**: Per-civ paradrop range from RULES.TXT not used; JS hardcodes 10.

13. **executeWorkerOrder fortress (FUN_004c42a0)**: Fortress decrementing global pollution count not tracked.

14. **settlerFoundCity (FUN_004c4d1e)**: City founding does not clear all tile improvement bits.

15. **spyDiplomatAction (FUN_004c5fae)**: Gold-on-spy-action bonus not implemented.

16. **bribeUnit (FUN_004c9528)**: Role-based vs type-based settler cost check.

17. **civil war unit transfer (FUN_004c66ba)**: Distance + city-presence radius check for unit transfer may differ.
