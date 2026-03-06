# Phase 1 Analysis: block_004C0000 (0x004C0000 - 0x004CFFFF)

## Function Analysis

### Cluster: Wonder/Improvement Build Prerequisites

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004C02D8 | small | FUN_004c02d8 | can_build_wonder | (civPtr, wonderIdx) | bool | Checks if a wonder (idx >= 0x27 = 39, i.e., improvement offset) can be built. Checks game flags bit 0x80 (scenario), DAT_0064bc60 bit 4, god mode, wonder slot availability (DAT_00655be6), and tech prereq via thunk_FUN_004bd9f0 (has_tech). Improvement prereq from DAT_0064c48e[(id+0x27)*8] = improvement table. | MEDIUM |
| 004C03AE | xlarge | FUN_004c03ae | can_build_improvement | (civPtr, cityIdx, improvementIdx) | bool | Master eligibility check for building an improvement in a city. For idx >= 0x27 delegates to can_build_wonder. Otherwise checks: has_tech prereq, has_building already (thunk_FUN_0043d20a), coastal requirements (city flags bit 0x80 for Harbor/Port), nuclear plant exclusions (0x13/0x14/0x1d power plant mutual exclusion), city walls prerequisites, SDI defense, and scenario/multiplayer restrictions. Deeply nested boolean logic. | HIGH |

### Cluster: Technology Research / Science

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004C09B0 | medium | FUN_004c09b0 | ai_pick_research_goal | (civId) | techId | AI selects which tech to research. Loops through 100 techs, checks availability via thunk_FUN_004bd9f0 and tech prereq chain (DAT_0062768e/f != -2). Uses thunk_FUN_004bdb2c (get tech priority/weight). For human players uses rand()%3 + weight-1; for AI uses rand()%weight. Returns tech with highest score. Difficulty-aware (DAT_00655b08) skip on chieftain for human civs. | MEDIUM |
| 004C0B51 | small | FUN_004c0b51 | blit_tech_icon_normal | (p1, surface, p3, flags, x, y, height) | 0 | Blits a tech icon at position. If flags bit 0 set, adds 0x26 (38) to x offset. Centers vertically: offset = (0x14 - height)/2. Calls FUN_005cef31 (blit_normal). | MEDIUM |
| 004C0BE8 | small | FUN_004c0be8 | blit_tech_icon_scaled | (p1, surface, p3, flags, x, y, height) | 0 | Same as above but with scaling. Uses thunk_FUN_00472cf0 (scale_sprite) with factor 0xfffffffe (-2 = zoom out). Calls thunk_FUN_0047df20/0047df50 around blit (set/restore zoom context). | MEDIUM |
| 004C0C83 | small | FUN_004c0c83 | blit_tech_icon_normal2 | (p1, surface, p3, flags, x, y, height) | 0 | Identical structure to FUN_004c0b51 -- a second normal blit variant for tech icons. | LOW |
| 004C0CF7 | xlarge | FUN_004c0cf7 | show_research_goal_dialog | (civId, excludeCurrent, stealMode) | void | Displays the "RESEARCHGOAL" dialog for choosing a research goal. Three tabs: techs (mode 0, "RESEARCHGOAL"), unit prereqs (mode 1, "HELPON"), improvements (mode 2, "HELPON"). Iterates 100 techs, 62 unit types, 67 improvements to build selection list. For tech 0x59 (89 = Future Tech), appends tech count. "HELPON" mode shows Civilopedia-style help. Shows "RESEARCHNONE"/"STEALNONE" if nothing available, "RESEARCHTHESE"/"STEALTHESE" for prereq chain. Calls thunk_FUN_00566584 for Civilopedia help and thunk_FUN_005ad998/0059a2e6 for unit/improvement help. | HIGH |
| 004C193A | stub | FUN_004c193a | cleanup_research_goal_1 | () | void | SEH cleanup stub for show_research_goal_dialog. Calls thunk_FUN_0059df8a (destructor). | LOW |
| 004C1950 | stub | FUN_004c1950 | cleanup_research_goal_2 | () | void | SEH/FS chain restore for show_research_goal_dialog. | LOW |
| 004C195E | xlarge | FUN_004c195e | choose_research_tech | (civId, forceChoice) | void | Main research selection UI. Calls ai_pick_research_goal for AI suggestion. For human players on turn > 0, displays "RESEARCH" dialog with available techs. Handles Civilopedia sidebar ("SCIENCE" string), shows tech tree dependencies (units/improvements that require each tech). If player selects "Research Goal" (local_524==2), delegates to show_research_goal_dialog. Stores chosen tech in civ[civId].researching_tech (+0x0A offset in civ struct via DAT_0064c6aa). | HIGH |
| 004C217C | stub | FUN_004c217c | cleanup_choose_research_1 | () | void | SEH cleanup. | LOW |
| 004C2188 | stub | FUN_004c2188 | cleanup_choose_research_2 | () | void | SEH cleanup. | LOW |
| 004C219E | stub | FUN_004c219e | cleanup_choose_research_3 | () | void | SEH/FS restore. | LOW |
| 004C21AD | stub | FUN_004c21ad | choose_research_wrapper | (civId) | void | Wrapper: calls choose_research_tech(civId, 0). | LOW |
| 004C21D5 | xlarge | FUN_004c21d5 | complete_research | (civId, giftFlag) | void | Called when a civ completes researching a tech. Gets current researching tech from civ+0x0A. If none, calls choose_research_wrapper. Grants tech via thunk_FUN_004bf05b. For human player: shows "CIVADVANCE" dialog, Civilopedia icon, triggers notifications for new capabilities ("NEWXFORM", "NEWFORTRESS", "NEWAIRLIFT", "NEWRAILROAD", "NEWFARMLAND", "NEWPARADROP"). Tech 0x3c (60) + flag 0x20 triggers spaceship event (thunk_FUN_004bee56). Tech 0x12 (18 = Construction) enables fortress. Tech 0x43 (67 = Railroad) enables railroads. Calls choose_research_wrapper to pick next tech. For AI: updates city production via thunk_FUN_004eb4ed. | HIGH |
| 004C2763 | stub | FUN_004c2763 | cleanup_complete_research_1 | () | void | SEH cleanup. | LOW |
| 004C2779 | stub | FUN_004c2779 | cleanup_complete_research_2 | () | void | SEH/FS restore. | LOW |
| 004C2788 | large | FUN_004c2788 | calc_tech_cost | (civId) | int | Calculates the science cost to research a tech. Uses civ tech_count_a + tech_count_b (DAT_0064c6b0, DAT_0064c6b2). Adjusts for difficulty (DAT_00655b08): AI gets 14-difficulty, human gets difficulty*2+6. Compares tech count to current AI leader (DAT_00655c20). Bonus/penalty based on tech count > 0x13 (19) and game turn. Multiplied by DAT_0064bcd3/DAT_0064bcb2 (scenario tech cost multiplier). Applies game flags: bit 4 = *5/4, bit 8 = *4/5. Minimum floor for human: 11-techCount. Clamps final to [1, 32000]. | HIGH |
| 004C2B73 | medium | FUN_004c2b73 | add_research_beakers | (civId, beakers) | void | Adds beakers to a civ's research accumulator (civ+0x08). If researching tech is set (civ+0x0A >= 0), checks if accumulated >= calc_tech_cost; if so, calls complete_research. If civ+0x0A < 0 with beakers, shows "FIRSTCIV" tutorial and calls choose_research_wrapper. Flag 0x20 in civ+0x00 triggers immediate completion. | HIGH |

### Cluster: Unit Orders / Worker Actions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004C4210 | stub | FUN_004c4210 | set_paradrop_range | (slot, range) | void | Stores param_2 at DAT_0063cc30 + slot*4. Used by NEWPARADROP notification to set paradrop range from DAT_0064bcdb (COSMIC paradrop range). | MEDIUM |
| 004C4240 | stub | FUN_004c4240 | show_advisor_message | (msg, p2, p3) | void | Wrapper: calls thunk_FUN_004a6b80 with advisor dialog (DAT_006359d4). | LOW |
| 004C4280 | stub | FUN_004c4280 | refresh_map_display | () | void | Calls thunk_FUN_0041f8d9 (map refresh). | LOW |
| 004C42A0 | xlarge | FUN_004c42a0 | execute_worker_order | (unitIdx, orderType) | void | Executes a settler/engineer work order (irrigation, road, mine, fortress, etc.). orderType: 4=road, 5=railroad, 6=irrigation, 7=mining, 8=transform, 9=clean pollution, 10=airbase/fortress. Calculates work duration from terrain table (DAT_00627cc8 stride 0x18). Handles work accumulation across turns via unit+0x0D (work progress). Checks for existing same-type workers to merge progress. On completion: modifies tile improvements via thunk_FUN_005b94fc (set_tile_flag). Road builds road; railroad checks Railroad tech (0x43). Irrigation can upgrade to farmland. Transform changes terrain type via thunk_FUN_005b9646. Pollution cleanup decrements DAT_00655b12. Updates visibility and redraws. | HIGH |
| 004C4ADA | medium | FUN_004c4ada | unit_order_fortify | (unitIdx) | void | Sets unit order to fortify (0x02). For AI units with home city, checks if tile has a city (thunk_FUN_0043cf76) and assigns home city. If no city on tile, finds nearest city with size > 2 via thunk_FUN_0043d07a. Updates visibility via thunk_FUN_0047cea6. | MEDIUM |
| 004C4D1E | medium | FUN_004c4d1e | unit_order_found_city | (unitIdx, cityIdx, name) | void | Founds a city with an engineer/settler unit. Calls thunk_create_city if cityIdx < 0. Copies name if provided (param_3 != 0). Kills the unit via thunk_FUN_005b4391. Clears tile improvements (0x7c mask). Updates visibility for all civs 1-7. | HIGH |
| 004C4E6D | medium | FUN_004c4e6d | unit_order_goto | (unitIdx) | void | Initiates or continues GOTO order for a unit. Sets DAT_0062d044 to owner for pathfinding. Calls thunk_FUN_004adafc (find_goto_path). If at destination or path fails, clears order. For air units at destination that ran out of fuel, recycles as settlers (role 4 units get fuel set to turn&7). Diplomat/spy flag 0x10 sets DAT_0062d044 to -1 (neutral pathfinding). | MEDIUM |
| 004C50D0 | large | FUN_004c50d0 | unit_pillage | (unitIdx, improvementType) | void | Unit pillages tile improvements. Checks city ownership and peace treaty (thunk_FUN_00579ed0 with flag 0x0E). Cycles through improvement bits to remove: priority order is road (0x10), railroad (0x20), fortress (0x40/0x42), irrigation (0x04), mining (0x08). If param_2 > 0, removes specific improvement. Updates visibility, triggers diplomatic contact (thunk_FUN_00467825 flag 0x2000), and recalculates tile yields. | MEDIUM |
| 004C5408 | small | FUN_004c5408 | execute_unit_order | (unitIdx) | bool | Dispatches unit order execution based on unit+0x0F (orders byte). Case 1: fortify (unit_order_fortify). Cases 4-10: worker actions (execute_worker_order). Cases 0x0B/0x1B: goto (unit_order_goto). Returns 1 if order executed, 0 otherwise. | HIGH |
| 004C54DA | large | FUN_004c54da | ai_find_nearest_city_or_transport | (unitIdx) | void | AI pathfinding: finds nearest friendly city or transport for a unit. Iterates all cities owned by unit's civ; for sea domain units, additionally scans for transport ships with hold capacity (utype flags 0x80 or 0x10+0x08). Picks closest target by distance (thunk_FUN_005ae1b0). For land units, checks continent ID match. If target found and within move range, sets GOTO order (0x0B) with destination coords. Checks move_rate (utype+0x0B) vs remaining moves. | MEDIUM |

### Cluster: Espionage / Diplomatic Incidents

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004C59F0 | xlarge | handle_incident_terror | handle_incident_terror | (attackerCiv, victimCiv) | void | Handles diplomatic incident when espionage/terrorism occurs. Checks treaty flags (0x20 = hatred, 0x0E = contact). Human player gets "PRETEXT"/"PRETEXTALLIED" war declaration dialog. AI responds based on alliance status: if allied and attacker is weaker, shows "WIMPOUT". Otherwise "INCIDENTWAR"/"INCIDENTALLIED" + declare war (thunk_FUN_0045ac71). For Fundamentalist attacker (govt 4): sets flag 0x10, uses "INCIDENTTERROR". Senate scandal check for Republic/Democracy (govt 5/6): random 50% chance, shows "SENATESCANDAL", triggers revolution (thunk_FUN_0055c69d). | HIGH |
| 004C5FAE | xlarge | FUN_004c5fae | spy_diplomat_action | (unitIdx, moveResult, targetCiv) | bool | Handles spy/diplomat unit actions on enemy territory. Unit type '/' (0x2F = 47 = Spy). Calculates spy survival odds (2-4 base, modified by veteran status 0x2000, move result). Random survival roll. If spy survives (local_1c != 0): relocates to nearest friendly city via thunk_FUN_005b36df. Shows "BOND007" (survived) or veteran "BONDGLORY" (all attempts survived). Updates net protocol. If fails: spy dies (thunk_FUN_005b6042). Calls handle_incident_terror for diplomatic consequences. | HIGH |
| 004C64AA | small | FUN_004c64aa | spy_caught_check | (unitIdx, targetCiv) | bool | Wrapper for spy_diplomat_action with moveResult=-1 (no movement). If spy survives (returns 0), shows "NAILED" message and returns 0. If caught, returns 1. Used repeatedly in espionage missions for cumulative failure chances. | MEDIUM |
| 004C654D | small | FUN_004c654d | check_incident_permission | (attackerCiv, victimCiv) | bool | Checks if human attacker should be warned about espionage incident. Returns false if attacker is AI or no diplomatic contact (treaty & 0x0E == 0). Otherwise shows "INCIDENT" confirmation dialog. Returns true if player cancels (chose to abort). | MEDIUM |
| 004C65D2 | small | FUN_004c65d2 | calc_city_revolt_distance | (civId, x, y) | int | Calculates distance metric from (x,y) to nearest city of civId with barracks (building 1). Returns minimum distance (capped at 0x10=16). Used by incite revolt cost calculation. | MEDIUM |
| 004C66BA | xlarge | FUN_004c66ba | execute_civil_war | (cityIdx, newOwnerCiv, param3) | void | Transfers a city and nearby units to a new civ (civil war / revolt). Grants visibility in city radius to new civ. Shows "CIVILWAR" message. Iterates all units: those owned by original city owner within distance < 2 of city get transferred to new owner. Updates unit counts per type per civ (DAT_0064c778). Clears unit orders. Calls thunk_FUN_0057b5df for diplomatic effects. | HIGH |
| 004C6BF5 | xlarge | FUN_004c6bf5 | spy_enters_city | (unitIdx, cityIdx) | void | Master espionage handler when spy/diplomat enters an enemy city. Unit type 0x2F = spy, otherwise diplomat. Displays "SPYMENU"/"SPYOPTIONS" menu for human player. AI selects action automatically based on treaty status, difficulty, and city defenses. Switch on action (0-7): **Case 0**: Establish embassy (flag 0x80, "ENEMYEMBASSY"). **Case 1**: Investigate city (show city dialog, "ENEMYINVESTIGATE"). **Case 2**: Steal technology (random available tech, "STEAL"/"STEALSPECIFIC"/"STEALHARD"/"NOSTEAL", calls spy_caught_check multiple times). **Case 3**: Industrial sabotage (random or targeted building, "SABOTAGE"/"SABOTAGEONE"/"SABOTAGETWO"/"SABOTAGEHARD"). **Case 4**: Poison water supply (reduce city size, "WATERSUPPLY"). **Case 5**: Plant nuclear device (thunk_FUN_0057f9e3, "PLANTEDNUKE"/"MAJORINCIDENT", all civs declare war if caught). **Case 6**: Incite revolt ("DISSIDENTS"/"DISSIDENTOPTIONS", cost based on city size, gold, distance, govt type; communism caps at 10; Democracy immune "NOREVOLT"). **Case 7**: Counter-espionage (set veteran spy as counter-spy, "CHATSPYSTART", treaty flag 0x1000000). | HIGH |
| 004C9504 | stub | FUN_004c9504 | cleanup_spy_city_1 | () | void | SEH cleanup. | LOW |
| 004C951A | stub | FUN_004c951a | cleanup_spy_city_2 | () | void | SEH/FS restore. | LOW |

### Cluster: Unit Bribery / Subversion

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004C9528 | xlarge | pick_up_unit | pick_up_unit | (unitIdx, buyerCiv) | void | Bribery/subversion of an enemy unit. Checks thunk_FUN_005b50ad (ZOC check, limit 2). Democracy immune ("INCORRUPTIBLE", govt 6). AI requires buyerCiv to have tech DAT_0064b563. Calculates bribe cost: unit_cost * (gold+750) / (distance+2). Settlers (role 5) cost double. Non-settlers cost half. Missiles (role 7) can't be bribed by AI. Human player sees "DESERT" dialog with cost; accepts or rejects. Multiplayer uses network protocol (thunk_FUN_0046b14d opcode 99). Transfers unit: changes owner, clears home city, resets orders/moves. Updates unit counts per type (DAT_0064c778). Shows "DESERTED" to original owner. | HIGH |
| 004C9EBD | large | FUN_004c9ebd | spy_sabotage_unit | (spyUnitIdx, targetUnitIdx, buyerCiv) | bool | Spy sabotage of an enemy unit. If target is spy (type '/'), offers "SABOTAGEOPTIONS" menu (bribe or sabotage). Bribe delegates to pick_up_unit. Sabotage: shows "BLEWITUP" message, triggers explosion animation (thunk_FUN_0057ed3f), damages target unit (HP halved via thunk_FUN_005b29d7). Spy consumed by spy_diplomat_action. Returns 1 if sabotage executed, 0 if bribed. | HIGH |

### Cluster: Airlift / Paradrop

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004CA1CD | medium | FUN_004ca1cd | execute_airlift | (unitIdx, srcCityIdx, dstCityIdx, interceptCount, ownerCiv) | void | Airlifts a unit between two cities. Sets flag 0x10000 on both cities (airlift used this turn). Clears unit orders, moves unit to destination via thunk_FUN_005b36df. Interception check: for each interceptCount, 1/6 chance of "SHOTDOWN" and unit death. Shows "AIRLIFT" message on success. | HIGH |
| 004CA39E | xlarge | FUN_004ca39e | execute_paradrop | (unitIdx, targetX, targetY) | void | Executes paradrop landing. Sets paradrop range from DAT_0064bcdb (COSMIC). Checks: target not city (thunk_FUN_005b89e4), distance within paradrop range (thunk_FUN_005ae1b0), landing zone not enemy city. Handles diplomatic incidents if landing on enemy-controlled territory. Calculates scatter direction for landing (8 compass directions, prefers empty tiles). Shows "PARADROP"/"PARADROPTARGET"/"PARADROPTARGET1"/"PARADROPTARGET2" messages. Moves unit via thunk_FUN_005b3ae0, animates via thunk_FUN_0056c705. Triggers combat if landing near enemy. Multiplayer: broadcasts to all visible civs. | HIGH |

### Cluster: Advisor Dialog / UI Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004CC870 | stub | FUN_004cc870 | show_advisor_popup | (msg, icon, flags) | void | Wrapper: calls thunk_FUN_004a6bdc with advisor window (DAT_006359d4). | LOW |
| 004CC8B0 | stub | FUN_004cc8b0 | show_advisor_choice | (msg, count, unitIdx) | int | Wrapper: calls thunk_FUN_004a6e39 with advisor window (DAT_006359d4). Returns player choice. | LOW |

### Cluster: MFC/CRT Framework Boilerplate

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004CC8F0 | stub | FID_conflict___E31 | static_init_1 | () | void | FRAMEWORK -- Static initializer calling FUN_004cc90a + FUN_004cc924. VS98 CRT init. | HIGH |
| 004CC90A | stub | FUN_004cc90a | static_construct_1 | () | void | FRAMEWORK -- Calls thunk_FUN_0055339f (construct static object). | LOW |
| 004CC924 | stub | FUN_004cc924 | static_register_dtor_1 | () | void | FRAMEWORK -- Registers FUN_004cc941 via _atexit for static destructor. | LOW |
| 004CC941 | stub | FUN_004cc941 | static_dtor_1 | () | void | FRAMEWORK -- Destroys COleCntrFrameWnd at DAT_006a18c0. | LOW |
| 004CC95B | stub | FID_conflict___E31 | static_init_2 | () | void | FRAMEWORK -- Static initializer calling FUN_004cc975 + FUN_004cc98f. | LOW |
| 004CC975 | stub | FUN_004cc975 | static_construct_2 | () | void | FRAMEWORK -- Calls thunk_FUN_004187a0. | LOW |
| 004CC98F | stub | FUN_004cc98f | static_register_dtor_2 | () | void | FRAMEWORK -- Registers FUN_004cc9ac via _atexit. | LOW |
| 004CC9AC | stub | FUN_004cc9ac | static_dtor_2 | () | void | FRAMEWORK -- Calls thunk_FUN_00418870 (destructor). | LOW |
| 004CC9C6 | stub | FID_conflict___E51 | static_init_3 | () | void | FRAMEWORK -- Static initializer for dialog template. Calls FUN_004cc9e0 + FUN_004cc9fe. | LOW |
| 004CC9E0 | stub | FUN_004cc9e0 | static_construct_3 | () | void | FRAMEWORK -- Calls thunk_FUN_0043c460(0, 0x10). | LOW |
| 004CC9FE | stub | FUN_004cc9fe | static_register_dtor_3 | () | void | FRAMEWORK -- Registers FUN_004cca1b via _atexit. | LOW |
| 004CCA1B | stub | FUN_004cca1b | static_dtor_3 | () | void | FRAMEWORK -- Calls thunk_FUN_0043c520 (destructor). | LOW |
| 004CCA35 | small | show_messagebox_CA35 | show_messagebox_or_alloc | (obj, size) | result | FRAMEWORK -- If requested size exceeds obj capacity, shows MessageBox with error from DAT_00628420+0x8D0/0x8E8. Otherwise delegates to thunk_FUN_00498159 (memory alloc). | MEDIUM |

### Cluster: RULES.TXT / CITY.TXT File Editor

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004CCAB9 | stub | FUN_004ccab9 | init_rules_editor_sections | (sectionName, callback) | void | Initializes the first entry in DAT_006a1880 array (section name + callback function pointer). Sets entries 2-3 to 0. Array holds up to 7 entries for rules file sections to modify. | MEDIUM |
| 004CCAED | small | FUN_004ccaed | add_rules_editor_section | (sectionName, callback) | void | Appends a new section entry to the rules editor array at DAT_006a1880. Finds first empty slot (up to 7 entries). | MEDIUM |
| 004CCB6A | medium | FUN_004ccb6a | draw_border_frame | (surface, x, y, w, h, borderWidth) | void | Draws a decorative border frame around a rectangle. Uses thunk_FUN_005a9b5d to draw 4 border sides and thunk_FUN_005a99fc for corner pieces. Border artwork from DAT_00647f18. Pattern IDs 0x25 and 0x12 for corners, 0x12 and 0x25 for sides. | MEDIUM |
| 004CCDB6 | stub | FUN_004ccdb6 | append_number_to_buffer | (value) | void | Sprintf's value via DAT_0062e020 format string, appends to DAT_00679640 text buffer. | LOW |
| 004CCDEF | medium | FUN_004ccdef | append_tech_name_to_buffer | (techId, showFlag) | void | Appends tech name to DAT_00679640 buffer. Special cases: -2 = "None"/"none", -1 = "yes"/"no", 0-99 = tech name from DAT_00627680 (tech_table, stride 0x10), 100+ = future tech. If showFlag, appends suffix. Pads short names to 3 chars via thunk_FUN_004190a0. | MEDIUM |
| 004CCF2D | xlarge | show_messagebox_CF2D | save_rules_txt | () | result | Saves modifications to RULES.TXT file. Opens "RULES." + extension (DAT_0062cd24). Creates backup as RULES.BAK. For each registered section (DAT_006a1880 array, up to 7 entries): finds "@SECTIONNAME" in source file, calls registered callback to write modified data, skips original data until blank line. Copies remaining file content. Uses _fgets/_fputs for line-by-line processing. Shows "Warning: Saving changes in file RULES.BAK" MessageBox. | HIGH |
| 004CD3D7 | xlarge | FUN_004cd3d7 | save_city_txt_entry | (sectionName, searchKey, replaceLine) | bool | Modifies a specific line in CITY.TXT (city name file). Opens CITY.TXT, creates CITY.TMP backup. Finds @sectionName, then searches for line starting with searchKey, replaces with replaceLine. | HIGH |
| 004CD8A6 | xlarge | FUN_004cd8a6 | update_city_txt_civ_names | () | bool | Updates CITY.TXT to match current civ-to-leader assignments. Iterates 21 civ styles, finds corresponding civ assignment (civ+0x06 = leader_graphic_id via DAT_0064c6a6). Replaces section headers with current civ names from DAT_006a1d88. Uses DAT_00655504 (leader_portrait_table) for mapping. | MEDIUM |

### Cluster: Cheat Menu / Debug Settings

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004CDCF6 | stub | FUN_004cdcf6 | is_numeric_char | (p1, charCode) | bool | Returns true if charCode is '0'-'9' (0x30-0x39), '-' (0x2D), or 0xD6 (accented O, likely numpad minus). Input validation for numeric text fields. | HIGH |
| 004CDD3D | medium | FUN_004cdd3d | show_cheat_checkbox_dialog | (title, content, bitmask, flags) | void | Displays a multi-checkbox dialog. Uses thunk_FUN_005a632a for dialog creation. Initializes checkboxes from bitmask param_3 and stored state DAT_00631ed8. Reads back checkbox states into DAT_00631ed8 bitmask. DAT_00631edc stores dialog result. | MEDIUM |
| 004CDF26 | stub | FUN_004cdf26 | cleanup_checkbox_1 | () | void | SEH cleanup. | LOW |
| 004CDF3C | stub | FUN_004cdf3c | cleanup_checkbox_2 | () | void | SEH/FS restore. | LOW |
| 004CDF4B | stub | FUN_004cdf4b | clamp_with_flag | (val, min, max) | clamped | Clamps val to [min, max]. Sets DAT_0062e014 = 1 if clamping occurred. | LOW |
| 004CDFA4 | medium | FUN_004cdfa4 | create_popup_dialog | (title, flags, x, y, w, h, helpTopic, scrollH, scrollV) | void | Creates a popup dialog window with configurable position, size, and scrollbars. If title is NULL, uses DAT_0062e1d4 default. Sets up DAT_006a19xx dialog state variables. Flags: bit 1 = centered, bit 2 = use stored coords, bit 3 = 0x800 style. Creates scrollbar (DAT_006a19d8) and help topic (DAT_006a19e0). Calls FUN_005bb4ae (window create), thunk_FUN_00497d00 (scrollbar), thunk_FUN_004cff70 (help), thunk_FUN_00552ed2 (show). | MEDIUM |

### Cluster: Civilopedia / Help System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004CE196 | medium | FUN_004ce196 | load_civilopedia_pages | () | void | Loads Civilopedia page content. Reads up to 20 pages via thunk_FUN_004cffb0 (read page text). Allocates string memory via thunk_show_messagebox_CA35. Stores page pointers in DAT_006a1d78 array. Sets DAT_006a4f98 = 1, DAT_006a4f9c = 0. Calls CRichEditDoc::InvalidateObjectCache to refresh display. Calls thunk_FUN_004cef35 for page loading. | MEDIUM |
| 004CE2F3 | stub | FUN_004ce2f3 | clear_civilopedia_state | () | void | Resets DAT_006a4f98 = 0, DAT_006a4f9c = 0. Invalidates cache. | LOW |
| 004CE322 | small | FUN_004ce322 | paint_civilopedia_header | () | void | Paints the Civilopedia header area. Calls begin_paint (thunk_FUN_00552112), set text style, set font info, set text style (0x29, 0x12), then end_paint. Uses DAT_006a18c0 surface and DAT_006a1b7c text params. | MEDIUM |
| 004CE38A | large | FUN_004ce38a | show_civilopedia_viewer | (pageData, title) | void | Shows the Civilopedia text viewer dialog. Sets DAT_006a4f9c = 1, creates popup via create_popup_dialog with flags 0x0D. Constructs rich text edit control (thunk_FUN_004bb620 with style 0xC9). Loops through page data array, adding text via thunk_FUN_00492ae0. Creates OK/Cancel buttons. Enters message loop (while DAT_006a4f9c != 0). | MEDIUM |
| 004CE6ED | stub | FUN_004ce6ed | cleanup_civilopedia_1 | () | void | Calls thunk_FUN_0040f570 (cleanup). | LOW |
| 004CE6F9 | stub | FUN_004ce6f9 | cleanup_civilopedia_2 | () | void | Calls thunk_FUN_0040f570 (cleanup). | LOW |
| 004CE70C | stub | FUN_004ce70c | cleanup_civilopedia_3 | () | void | SEH/FS restore. | LOW |
| 004CE71B | medium | FUN_004ce71b | check_city_name_available | (name) | bool | Checks if a city name is available (not already in use). First tries thunk_FUN_004a2379 with DAT_0062e1dc list; if found, iterates with thunk_FUN_004a23fc matching by prefix. Otherwise shows "NOCITY" messagebox for confirmation. Returns true if name is available. | MEDIUM |
| 004CE83D | small | FUN_004ce83d | send_tab_refresh_messages | () | void | Sends WM message 0x14F (custom) to dialog controls in a loop. Used to refresh tab/list controls. | LOW |

### Cluster: INI File / Settings Persistence

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004CE8A4 | small | FUN_004ce8a4 | read_ini_long | (section, key, defaultVal, outPtr) | result | Reads a long integer value from INI/registry. Converts defaultVal to string via __itoa, calls thunk_FUN_0051d63b to read, converts result via _atol. Stores in *outPtr. | MEDIUM |
| 004CE903 | small | FUN_004ce903 | alloc_and_copy_string | (src, heapObj, minSize) | char* | Allocates memory for a string copy. Size = max(strlen(src)+1, minSize). Allocates via thunk_FUN_00498159 from heapObj+0x2F4. Copies string. Returns pointer. Error: calls thunk_FUN_00589ef8 on alloc fail. | LOW |

### Cluster: Scenario Event System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004CE98E | xlarge | FUN_004ce98e | clone_event_data | (destObj, srcObj) | void | Deep-copies scenario event data from srcObj to destObj. Iterates linked list at +0x30C. Each event node is 0x1BC bytes. Copies node via memcpy, then deep-copies all string fields at known offsets (+0x08, +0x10, +0x14, +0x20, +0x38[20], +0x88, +0x90, +0xC4, +0xCC, +0xD4, +0xDC, +0x13C, +0x140, +0x148, +0x174, +0x184). String alloc sizes: 0x0F (15) for names, 0x18 (24) for descriptions, 0x01 for flags. Event node structure is ~444 bytes with 16+ string fields. | MEDIUM |
| 004CEF35 | small | FUN_004cef35 | reload_event_data | () | void | Reloads event data by double-swapping: copies DAT_0064b690 to local buffer, then back (50000-byte allocation each via thunk_FUN_004fa4be/004fa5d9). Effectively refreshes event pointers. | LOW |
| 004CEFC5 | stub | FUN_004cefc5 | cleanup_event_1 | () | void | Calls thunk_FUN_004fa569 (free event buffer). | LOW |
| 004CEFDB | stub | FUN_004cefdb | cleanup_event_2 | () | void | SEH/FS restore. | LOW |
| 004CEFE9 | medium | FUN_004cefe9 | rename_city_in_events | (oldName, newName) | int | Renames a city across all scenario events. Iterates linked list at DAT_0064b99c. Checks event fields at +0x08, +0x90, +0xDC, +0x148 (city name references, 15-char max). Returns count of replacements. | MEDIUM |
| 004CF144 | medium | FUN_004cf144 | rename_text_in_events | (oldText, newText) | int | Renames text strings across all scenario events. Checks fields at +0x14, +0x20, +0x88, +0xC4, +0xCC, +0xD4, +0x140, +0x174 (description fields, 24-char max). Returns count. | MEDIUM |
| 004CF3BA | small | FUN_004cf3ba | rename_unit_in_events | (oldName, newName) | int | Renames unit type names in scenario events. Checks fields at +0x10, +0x13C (unit type references, 24-char max). Returns count. | MEDIUM |

### Cluster: Popup Dialog Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004CFF70 | stub | FUN_004cff70 | set_dialog_help_topic | (topic) | void | Sets help topic for current dialog. Uses ECX (this pointer) + 8 for surface, calls FUN_005bd270. | LOW |
| 004CFFB0 | stub | FUN_004cffb0 | get_page_text | (pageIdx, buf, bufSize) | void | Reads page text for Civilopedia. Uses ECX+0x1C, calls send_msg_2DED. | LOW |
| 004CFFF0 | small | FUN_004cfff0 | trim_trailing_whitespace | (str) | void | Removes trailing spaces and tabs from a string by setting null terminators. Standard string utility. | HIGH |

### Cluster: String/File Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 004D007E | -- | FUN_004d007e | (referenced, not in block) | -- | -- | Called from save_rules_txt -- likely comment stripper or line normalizer. Outside this block's range. | -- |

## SUMMARY

### 1. Function Counts

**Total functions analyzed: 67**

| Category | Count | Functions |
|----------|-------|-----------|
| Technology/Research | 14 | can_build_wonder, can_build_improvement, ai_pick_research_goal, 3x blit_tech_icon, show_research_goal_dialog, choose_research_tech, complete_research, choose_research_wrapper, calc_tech_cost, add_research_beakers, + 4 SEH stubs |
| Unit Orders/Workers | 8 | set_paradrop_range, refresh_map_display, execute_worker_order, unit_order_fortify, unit_order_found_city, unit_order_goto, unit_pillage, execute_unit_order, ai_find_nearest_city |
| Espionage/Diplomacy | 9 | handle_incident_terror, spy_diplomat_action, spy_caught_check, check_incident_permission, calc_city_revolt_distance, execute_civil_war, spy_enters_city, pick_up_unit, spy_sabotage_unit |
| Military Actions | 2 | execute_airlift, execute_paradrop |
| Rules/City File I/O | 7 | init/add_rules_editor_sections, save_rules_txt, save_city_txt_entry, update_city_txt_civ_names, + helpers |
| Scenario Events | 5 | clone_event_data, reload_event_data, rename_city/text/unit_in_events |
| UI/Dialog | 10 | show_advisor_message/popup/choice, draw_border_frame, create_popup_dialog, civilopedia viewer/header/pages, check_city_name_available, show_cheat_checkbox_dialog |
| Utility | 5 | is_numeric_char, clamp_with_flag, append_number/tech_name, trim_trailing_whitespace |
| Framework (CRT/MFC) | 13 | 12 static init/construct/dtor stubs + show_messagebox_or_alloc |
| SEH Cleanup Stubs | ~10 | Various cleanup/FS restore functions |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_004c6bf5 (spy_enters_city)** -- 10,469 bytes. The complete espionage action system: embassy, investigation, tech theft, sabotage, poison water, plant nuke, incite revolt, counter-espionage. Central to the spy/diplomat game mechanic.

2. **FUN_004c42a0 (execute_worker_order)** -- 2,035 bytes. Full settler/engineer work order execution: road, railroad, irrigation, mining, transform terrain, clean pollution, build fortress/airbase. Calculates work durations from terrain tables and handles all tile modification.

3. **FUN_004c2788 (calc_tech_cost)** -- 1,003 bytes. The tech cost formula with difficulty scaling, leader comparison, era adjustment, scenario multipliers, and game option flags. Critical for understanding research pacing.

4. **FUN_004c03ae (can_build_improvement)** -- 1,383 bytes. Master eligibility gate for all city improvements and wonders. Encodes all prerequisite chains, mutual exclusions (power plants), and special requirements.

5. **FUN_004ca39e (execute_paradrop)** -- 2,572 bytes. Complete paradrop implementation including range check, scatter landing, diplomatic incident handling, combat initiation, and multiplayer synchronization.

### 3. New DAT_ Globals Identified

| Address | Proposed Name | Evidence | Confidence |
|---------|--------------|----------|------------|
| DAT_00655be6 | wonder_built_by[28] | short array, -1 = unbuilt, indexed by wonder ID. Checked in can_build_wonder. | HIGH |
| DAT_0064bcd3 | scenario_tech_cost_mult | Multiplier for tech cost, normally 10 (=1.0x). Checked when scenario flag is clear. | HIGH |
| DAT_0064bcb2 | scenario_tech_cost_mult_alt | Alternate tech cost mult used when scenario flag (0x80) is set. | MEDIUM |
| DAT_0064bcb4 | scenario_ai_tech_override | If nonzero when scenario flag set, bypasses AI tech leader comparison. | MEDIUM |
| DAT_0063cc30 | paradrop_range_table[N] | Per-slot paradrop range storage, set by set_paradrop_range. | MEDIUM |
| DAT_006a1880 | rules_editor_sections[7*2] | Array of {sectionName, callback} pairs for RULES.TXT editing. 8 bytes per entry, 7 max. | HIGH |
| DAT_006a4f98 | civilopedia_loaded | Flag: 1 = Civilopedia pages loaded and ready. | MEDIUM |
| DAT_006a4f9c | civilopedia_active | Flag: 1 = Civilopedia viewer is open (message loop control). | MEDIUM |
| DAT_006a1d78 | civilopedia_page_ptrs[20] | Array of 20 string pointers for Civilopedia page text content. | MEDIUM |
| DAT_0062804c | worker_action_pending | Set to 0 before worker/fortify/goto actions. Purpose: flag for pending tile update. | LOW |
| DAT_0063f660 | nearest_city_distance | Temp variable for nearest-city search in ai_find_nearest_city. | LOW |
| DAT_0062d044 | pathfind_owner_override | Set to civ ID for pathfinding context, -1 for neutral. Used by GOTO. | MEDIUM |
| DAT_0064b563 | bribery_prereq_tech | Tech ID required for AI to attempt unit bribery. | MEDIUM |
| DAT_0062dcf4 | last_spy_action | Stores the last selected espionage action type (0-7). | LOW |
| DAT_0062e014 | clamp_occurred_flag | Set to 1 when clamp_with_flag actually clamped a value. | LOW |
| DAT_00655b12 | pollution_count | Global pollution counter, decremented when settlers clean pollution. | MEDIUM |
| DAT_006a19d4-DC | popup_dialog_state | Block of variables controlling popup dialog position, flags, scroll settings. | LOW |
| DAT_00631ed8 | checkbox_state_bitmask | Persistent state for multi-checkbox dialogs (cheat menu). | LOW |
| DAT_00631edc | checkbox_dialog_result | Result value from checkbox dialog. | LOW |
| DAT_0064b99c | event_list_head | Head pointer of linked list for scenario events (node size 0x1BC). | MEDIUM |
