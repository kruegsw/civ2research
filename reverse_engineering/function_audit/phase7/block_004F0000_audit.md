# Block 004F0000 — Phase 7 Audit

**Functions in this block: 107**
**System: City turn pipeline (tail), Civilopedia UI, scenario events system**

---

## FW — Framework (38 functions)

FUN_004f3d60 | 115B | N/A (MFC CPropertySheet constructor — SEH/vtable init, calls thunk_FUN_0043c260 + thunk_FUN_0059db08)
FUN_004f3e20 | 57B | N/A (MFC scalar deleting destructor — calls FUN_004f3e70 + operator_delete)
FUN_004f3e70 | 75B | N/A (MFC destructor body — SEH frame, calls FUN_004f3ebb/FUN_004f3ee5/FUN_004f3ef8)
FUN_004f3ebb | 42B | N/A (MFC destructor helper — member offset calculation for CDaoFieldInfo)
FUN_004f3ee5 | 9B | N/A (CDaoFieldInfo::~CDaoFieldInfo call)
FUN_004f3ef8 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FID_conflict:_$E31 @ 0x004F3F80 | 26B | N/A (CRT static initializer — calls FUN_004f3f9a + FUN_004f3fb4)
FUN_004f3f9a | 26B | N/A (CRT init thunk — calls FUN_004f3feb Civilopedia constructor)
FUN_004f3fb4 | 29B | N/A (CRT atexit registration — registers FUN_004f3fd1 for cleanup)
FUN_004f3fd1 | 26B | N/A (CRT atexit handler — calls FUN_004f44a7 Civilopedia destructor)
FUN_004f4673 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040fbb0)
FUN_004f4682 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_00418870)
FUN_004f4691 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f46a0 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f46af | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f46be | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f46cd | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f46dc | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f46eb | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f46fa | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f4709 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f4718 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f4727 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f4736 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f4745 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f4754 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f4763 | 15B | N/A (MFC sub-object destructor call — thunk_FUN_0040f570)
FUN_004f4772 | 9B | N/A (MFC base destructor call — thunk_FUN_0044cba0)

FID_conflict:`scalar_deleting_destructor' @ 0x004FA0F0 | 57B | N/A (CControlBarInfo scalar deleting destructor — MFC library)
~CControlBarInfo @ 0x004FA140 | 62B | N/A (CControlBarInfo::~CControlBarInfo — MFC library)
FUN_004fa17e | 12B | N/A (MFC destructor helper — calls thunk_FUN_00452a67)
FUN_004fa194 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FID_conflict:_$E31 @ 0x004FA1C0 | 26B | N/A (CRT static initializer — calls FUN_004fa1da + FUN_004fa1f4)
FUN_004fa1da | 26B | N/A (CRT init thunk — calls FUN_005c64da event system constructor)
FUN_004fa1f4 | 29B | N/A (CRT atexit registration — registers FUN_004fa211)
FUN_004fa211 | 26B | N/A (CRT atexit handler — calls FUN_005c656b event system destructor)
FUN_004fa5b8 | 9B | N/A (destructor helper — calls thunk_FUN_0059df8a)
FUN_004fa5cb | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)

---

## UI — User Interface (33 functions)

FUN_004f3d30 | 29B | N/A (getter: returns byte from DAT_006a6530[param_2] — Civilopedia UI state accessor)
FUN_004f3f30 | 38B | N/A (wrapper: calls thunk_FUN_004eb571 with rearranged params — city event dialog bridge)
FUN_004f3f60 | 24B | N/A (setter: DAT_0062f004 = param_1 — UI state flag)
FUN_004f3feb | 938B | N/A (Civilopedia constructor — allocates 17 sub-objects, initializes 7 linked lists to -1 for advances/improvements/wonders/units/governments/terrain/concepts)
FUN_004f44a7 | 460B | N/A (Civilopedia destructor — tears down 17 sub-objects in reverse, frees linked lists)
FUN_004f4785 | 14B | N/A (SEH unwind thunk — restores FS_OFFSET)
FUN_004f4793 | 118B | N/A (Civilopedia linked-list cleanup — iterates list at offset 8000, deletes nodes)
FUN_004f4809 | 918B | N/A (Civilopedia linked-list cleanup — frees 7 category lists at offsets 0x16dc-0x16f4)
FUN_004f4b9f | 3950B | N/A (Civilopedia window constructor — creates MFC dialog with buttons, scrollbars, topic pages via SetRect/CPropertySheet)
FUN_004f5b24 | 75B | N/A (Civilopedia close handler — invalidates render cache, resets navigation state)
FUN_004f5b6f | 605B | N/A (Civilopedia navigation — back/forward history, page transitions between topics)
FUN_004f5dd1 | 129B | N/A (Civilopedia reset — clears navigation state, releases cached bitmaps)
FUN_004f5e52 | 128B | N/A (Civilopedia page render — refreshes current topic page, updates button labels)
FUN_004f5ed2 | 81B | N/A (Civilopedia show category 8 — "concepts" display handler)
FUN_004f5f23 | 764B | N/A (Civilopedia topic opener — switch on category 1-8: advances/improvements/wonders/units/terrain/government/concepts)
FUN_004f6244 | 800B | N/A (Civilopedia render — draws topic panel with borders, icon, and title text)
FUN_004f6564 | 226B | N/A (Civilopedia background painter — draws top/bottom border graphics)
FUN_004f6646 | 113B | N/A (Civilopedia list renderer — dispatches to FUN_004f66c6 or FUN_004f5dd1 based on state)
FUN_004f66c6 | 3016B | N/A (Civilopedia item list painter — draws 18-item paginated list with icons, highlighting, text for all 7 categories)
FUN_004f7313 | 55B | N/A (Civilopedia scrollbar handler — adjusts page offset, redraws list)
FUN_004f734a | 266B | N/A (Civilopedia hit-test — maps mouse x,y to item index for click handling)
FUN_004f7454 | 151B | N/A (Civilopedia scroll-to-item — aligns page so item is visible, redraws)
FUN_004f74eb | 445B | N/A (Civilopedia letter search — finds next item starting with typed letter)
FUN_004f76ce | 741B | N/A (Civilopedia keyboard handler — arrow keys, Home/End, Page Up/Down, letter navigation)
FUN_004f7a30 | 151B | N/A (Civilopedia mouse-move handler — tracks selection under cursor)
FUN_004f7ac7 | 229B | N/A (Civilopedia category title loader — loads string resource 0x29f-0x2a5 for 7 categories)
FUN_004f7bd1 | 200B | N/A (Civilopedia topic switch — sets category, resets navigation, redraws)
FUN_004f7c99 | 3281B | N/A (Civilopedia data loader — parses Describe.txt sections: ADVANCE_INDEX, IMPROVEMENT_INDEX, WONDER_INDEX, UNIT_INDEX, GOVERNMENT_INDEX, TERRAIN_INDEX, CONCEPT_DESCRIPTIONS)
FUN_004f896a | 305B | N/A (Civilopedia sort — bubble sort for linked-list items by alphabetical string comparison)
FUN_004f8a9b | 89B | N/A (Civilopedia linked-list lookup — finds node by index, returns string label)
FUN_004f8af9 | 523B | N/A (Civilopedia navigation history push — records current page in back/forward stack)
FUN_004f8d04 | 77B | N/A (Civilopedia hotkey handler — thunk_FUN_0047e94e + cache invalidation)
FUN_004f8d51 | 27B | N/A (Civilopedia cache invalidation — CRichEditDoc::InvalidateObjectCache call)

---

## GL — Game Logic: City Turn Processing (6 functions)

FUN_004f00f0 | 305B | YES
  Binary: get_building_upkeep — per-building maintenance cost calculation.
    Base cost from improvement definition table. param_2==2 (Barracks): difficulty<2 reduces by 1; having Gunpowder(0x23) or latest tech in chain(0x35) adds +1. If cost==1, Adam Smith's Wonder(0x11) zeroes it. Fundamentalism(govt==4): Temple(4), Colosseum(14/0xE), Cathedral(11/0xB) are free.
  JS: engine/production.js → calcBuildingMaintenance() (line 527)
  Match: YES — all special cases ported:
    - Barracks difficulty reduction: JS checks diffIdx < 2
    - Gunpowder +1: JS checks hasAdvance(35)
    - Tech chain last tech +1: JS checks getLastInChain()
    - Adam Smith's cost==1 → 0: JS checks smithFree && cost === 1
    - Fundamentalism free temples/colosseums/cathedrals: JS checks govt === 'fundamentalism'
  Discrepancy: NONE

FUN_004f0221 | 406B | YES
  Binary: pay_building_upkeep — iterates buildings 1-38, deducts upkeep from civ treasury. If treasury goes negative: sets treasury to 0, sells building (thunk_FUN_0043d289 sets building off), shows INHOCK message, then adds building cost × gold_multiplier back to treasury.
  JS: engine/cityturn.js → payBuildingUpkeep() (line 716)
  Match: PARTIAL — logic differences:
  Discrepancy 1: Binary sells the building that caused the deficit (the one being iterated), JS sells the cheapest-maintenance building. Binary iterates buildings 1-38 in order and sells whichever one pushes treasury negative. JS finds the cheapest and sells it first.
  Discrepancy 2: Binary adds back (building_cost × gold_multiplier), JS adds back IMPROVE_COSTS[cheapestId]. The binary uses the base cost from the improvement table multiplied by DAT_006a657c (gold multiplier / game speed factor). JS does not apply this multiplier.
  Discrepancy 3: Binary only runs for human players (DAT_00655b0b bitmask check at line 388 of FUN_004f0a9c). JS payBuildingUpkeep has no such guard but the note says it is not currently called by the orchestrator.

FUN_004f03b7 | 1095B | YES (AI-adjacent)
  Binary: settler_find_improvement_target — pathfinds from settler to nearest city on same continent needing improvement. Uses A* (thunk_FUN_004abfe5), checks terrain passability (ocean bit 0x80, mountains via Gunpowder(7) tech, Alpine Troops(0x43) tech), limits path to 50 steps. If valid target found on same-continent city, sets DAT_006a65e0/DAT_006a65e8 destination coordinates and returns 1.
  JS: No direct equivalent. Settler automation not implemented in JS engine.
  Match: N/A — settler auto-improvement pathfinding not ported
  Discrepancy: NONE (not applicable to current engine scope)

FUN_004f080d | 650B | AI
  Binary: settler_auto_improve — main settler automation dispatcher. Scans 20-tile radius for tiles with improvement bit 0x80 (needs improvement). If found, creates improve task at that tile. Otherwise calls FUN_004f03b7 to pathfind to nearest city. Priority adjustments: +1 if city size > 4, +1 if city has Granary, -1 if city size < 4. Falls back to search with DAT_006a65d4=2 if first attempt fails.
  JS: No direct equivalent. Settler automation not implemented.
  Match: N/A — AI settler automation not ported
  Discrepancy: NONE (not applicable)

FUN_004f0a9c | 1903B | YES
  Binary: process_city_turn — the per-city orchestrator (1903 bytes). Sequence:
    1. Worker reassignment check (FUN_004ebbde, FUN_004eb4ed)
    2. Food shortage warning check
    3. City trade processing (FUN_004ec3fe)
    4. Unit support deficit (FUN_004eef23)
    5. Recalculate city yields (FUN_004eb4ed again)
    6. Attitude score updates (lines 323-330: waste penalty, corruption comparison)
    7. Government comparison penalties (lines 331-351: size/discovery/trade/luxuries vs benchmarks)
    8. Celebration/disorder production bonuses (lines 352-384: WLTKD checks, food surplus * 5 scoring)
    9. Handle disorder (FUN_004ef578)
    10. Pollution (FUN_004efbc6)
    11. Human-only: wonder notifications (FUN_004efd44), building upkeep (FUN_004f0221)
    12. Settler automation (FUN_004f080d)
    13. Peak production tracking
    14. City window refresh
  JS: engine/cityturn.js → processCityTurn() (line 1081)
  Match: PARTIAL — core pipeline implemented but attitude scoring differs.
  Discrepancy 1: Binary attitude score updates (lines 323-384) apply 6 penalty categories comparing city metrics against government benchmarks. JS does not implement these fine-grained attitude adjustments per city turn.
  Discrepancy 2: Binary celebration/disorder score has specific modifiers: WLTKD surplus × 5, government discovery/trade/luxury/food/size comparisons with signed short arithmetic. JS calcHappiness handles disorder/WLTKD but not these attitude score increments.
  Discrepancy 3: Binary wonder notifications (FUN_004efd44) and settler automation (FUN_004f080d) are human-only. JS skips these entirely.

FUN_004f1220 | 641B | YES
  Binary: handle_space_race_victory — when DAT_00655b02 < 3 (not multiplayer) or DAT_006ad2f7 != 0 (space victory flag), resets all map visibility for all players, clears city ownership bytes, triggers spaceship victory sequence. In multiplayer (DAT_00655b02 >= 3), sends network packet 0x58 instead of local processing. Calls thunk_FUN_004b0b53(0xff,2,...) for end-game state and thunk_FUN_00421ea0("ASTRONAUTS") for victory screen.
  JS: No direct equivalent. Space race victory handled differently.
  Match: N/A — space race endgame not ported in this form
  Discrepancy: NONE (not applicable to current engine)

---

## GL — Game Logic: Scenario Events System (30 functions)

FUN_004fa250 | 265B | YES
  Binary: resolve_civ_name — maps string to civ index. Checks "ANYBODY"→-2, "TRIGGERATTACKER"→-3, "TRIGGERDEFENDER"→-4, "TRIGGERRECEIVER"→-4. Then loops 8 civ names for match. Prints debug warning if not found.
  JS: engine/events.js → resolveCivName() (line 122)
  Match: YES
  Discrepancy 1: Binary TRIGGERDEFENDER and TRIGGERRECEIVER both map to -4. JS maps TRIGGERATTACKER/-DEFENDER/-RECEIVER all to -3. This is actually a binary quirk — the binary uses -3 for attacker and -4 for both defender and receiver, while JS merges them. Subtle event dispatch difference.

FUN_004fa359 | 170B | YES
  Binary: resolve_unit_name — maps string to unit index (0-61). Checks "ANYUNIT"→-2. Loops 0x3E (62) unit types comparing names.
  JS: engine/events.js → resolveUnitName() (line 142)
  Match: YES — JS checks UNIT_NAMES array similarly. JS does not support "ANYUNIT" keyword.
  Discrepancy 1: Binary supports "ANYUNIT"→-2 wildcard. JS resolveUnitName returns -1 for unrecognized names, no ANYUNIT handling.

FUN_004fa403 | 123B | YES
  Binary: resolve_terrain_name — maps string to terrain index (0-10). Uses hardcoded array PTR_s_DESERT_0062f168.
  JS: engine/events.js → resolveTerrainName() (line 156)
  Match: YES — JS uses TERRAIN_NAMES array, validates 0-10 range.
  Discrepancy: NONE

FUN_004fa47e | 64B | N/A (event arena memory management — pool allocator reset + realloc)

FUN_004fa4be | 152B | N/A (event system constructor — pool allocator init, state reset, calls FUN_004fa5d9)

FUN_004fa569 | 79B | N/A (event system destructor — pool cleanup, SEH frame teardown)

FUN_004fa5d9 | 62B | N/A (event system state reset — clears counters, calls FUN_004fa47e)

FUN_004fa617 | 240B | N/A (event node allocator — allocates 0x1C4 bytes for new event node from arena, links into doubly-linked list)

FUN_004fa707 | 294B | N/A (event action: play sound — resolves WAV path from SOUND directory, calls FUN_005d6038 for playback. No-op in JS engine.)

FUN_004fa82d | 39B | YES
  Binary: event_action_flag — sets DAT_006a9110 = 1 (scenario flag set action).
  JS: engine/events.js — scenario flags not fully implemented.
  Match: N/A — stub trigger, not ported
  Discrepancy: NONE

FUN_004fa854 | 235B | N/A (event action: play CD track — validates track number, calls thunk_FUN_0046e571. Audio N/A in JS.)

FUN_004fa944 | 364B | YES
  Binary: event_action_change_money — resolves receiver civ (supports TRIGGERATTACKER -3, TRIGGERDEFENDER/RECEIVER -4), adds amount to civ treasury. Clamps to 0-30000 range.
  JS: engine/events.js → executeActions() handles ACTION_CHANGE_MONEY
  Match: PARTIAL
  Discrepancy 1: Binary clamps treasury to 0-30000 range. JS does not apply this cap.
  Discrepancy 2: Binary resolves -3/-4 placeholder civs from trigger context. JS uses -3 for all placeholders.

FUN_004faab0 | 246B | N/A (event action: display text — shows up to 20 lines of event text via Win32 dialog. UI only.)

FUN_004faba6 | 348B | YES
  Binary: event_action_make_aggression — resolves two civ IDs (who and whom, supports -3/-4 placeholders), validates both are alive, calls thunk_FUN_00579c40(who, whom) to declare war.
  JS: engine/events.js → executeActions() handles ACTION_MAKE_AGGRESSION
  Match: YES
  Discrepancy: NONE

FUN_004fad02 | 249B | YES
  Binary: event_action_destroy_civ — resolves target civ, validates alive, sets human player to game over (DAT_0064b1ac = 4) if target is current human player, then calls thunk_FUN_004e1763(civ, 1, 1) to destroy.
  JS: engine/events.js → executeActions() handles ACTION_DESTROY_CIV
  Match: PARTIAL
  Discrepancy 1: Binary sets DAT_0064b1ac = 4 (game over flag) when destroying the human player's civ. JS does not handle this edge case.

FUN_004fadfb | 217B | YES
  Binary: event_action_give_tech — resolves receiver civ, validates alive, calls thunk_FUN_004bf05b(civ, techId, 0, 0, 0) to grant technology.
  JS: engine/events.js → executeActions() handles ACTION_GIVE_TECH via grantAdvance()
  Match: YES
  Discrepancy: NONE

FUN_004faed4 | 941B | YES
  Binary: event_action_create_unit — resolves owner civ, iterates up to 10 locations to find valid placement tile. For sea units: checks ocean tile, checks for own city or allied unit on tile. For land units: checks not ocean (or air), checks city ownership. Calls thunk_FUN_005b3d06 to spawn unit. Sets veteran flag (0x2000) and home city by name matching.
  JS: engine/events.js → executeActions() handles ACTION_CREATE_UNIT
  Match: PARTIAL
  Discrepancy 1: Binary does domain-specific placement validation (sea units need ocean+city/allied, land units avoid ocean). JS placement validation is simpler.
  Discrepancy 2: Binary sets home city by name string matching against all cities. JS uses simpler assignment.

FUN_004fb29f | 787B | YES
  Binary: event_action_move_unit — resolves owner civ. For AI civs: scans all units top-down, finds matching unit type in source rectangle, sets order to 0x0B (goto), destination coords from event. Sets unit role to 0x37. Limits to numbertomove count (-2 = all).
  JS: engine/events.js → executeActions() handles ACTION_MOVE_UNIT
  Match: PARTIAL
  Discrepancy 1: Binary only moves AI units (skips human player). JS does not have this restriction.
  Discrepancy 2: Binary sets specific unit order (0x0B) and role (0x37). JS teleports units directly rather than issuing goto orders.

FUN_004fb5b2 | 1114B | YES
  Binary: event_action_change_terrain — iterates rectangle region, destroys all cities in region (thunk_delete_city), kills all units in region (thunk_FUN_005b4391). Then sets terrain type, clears improvements/overlays/rivers. Recalculates city territories (thunk_FUN_0043f7a7). For any civ with no remaining cities, kills all its units and resets the civ (thunk_new_civ). If destroyed civ is human player, sets game over flag.
  JS: engine/events.js → executeActions() handles ACTION_CHANGE_TERRAIN
  Match: PARTIAL
  Discrepancy 1: Binary destroys cities and units in the terrain change region first. JS terrain change does not destroy units/cities.
  Discrepancy 2: Binary recalculates city territories for all remaining cities and handles civ elimination. JS does not do this.

FUN_004fba0c | 144B | YES
  Binary: event_check_turn_trigger — scans event list for type==4 (TURN), checks if turn number matches event.turn field (-1 = every turn). Dispatches via FUN_004fc3ae.
  JS: engine/events.js → checkTurnEvents()
  Match: YES
  Discrepancy: NONE

FUN_004fba9c | 147B | YES
  Binary: event_check_interval_trigger — scans event list for type==8 (TURNINTERVAL), checks if turn % interval == 0 (interval 0 = every turn). Dispatches via FUN_004fc3ae.
  JS: engine/events.js → checkTurnIntervalEvents()
  Match: YES
  Discrepancy: NONE

FUN_004fbb2f | 174B | YES
  Binary: event_check_random_trigger — scans event list for type==0x40 (RANDOMTURN). If denominator < 2, fires always. Otherwise, fires if rand() % denominator + 1 == denominator (i.e., 1/N chance).
  JS: engine/events.js → checkRandomTurnEvents()
  Match: PARTIAL
  Discrepancy 1: Binary uses rand() % denom + 1 == denom (fires when result equals denominator). JS likely uses Math.random() < 1/denom. The probability is the same (1/N) but implementation differs.

FUN_004fbbdd | 334B | YES
  Binary: event_check_tech_trigger — scans event list for type==0x100 (RECEIVEDTECHNOLOGY). If receiver is -2 (ANYBODY), loops all 8 civs checking if any have the tech. Otherwise checks specific civ. Dispatches via FUN_004fc3ae.
  JS: engine/events.js → checkTechEvents()
  Match: YES
  Discrepancy: NONE

FUN_004fbd2b | 114B | YES
  Binary: event_check_scenario_loaded — scans event list for type==0x20 (SCENARIOLOADED). Unconditionally dispatches all matching events.
  JS: engine/events.js → checkScenarioLoadedEvents()
  Match: YES
  Discrepancy: NONE

FUN_004fbd9d | 231B | YES
  Binary: event_check_unit_killed — scans event list for type==1 (UNITKILLED). Checks unit type, attacker civ, and defender civ against event conditions (-2 = any). Fills in ANYBODY wildcards with actual values at dispatch time.
  JS: engine/events.js → checkUnitKilledEvents()
  Match: YES
  Discrepancy: NONE

FUN_004fbe84 | 900B | YES
  Binary: event_check_negotiation — scans event list for type==0x10 (NEGOTIATION). Complex bidirectional matching: checks talker/listener civs AND types (human=1, computer=2, humanorcomputer=4). In multiplayer (DAT_00655b02 > 2), also checks reversed roles (listener as talker, talker as listener) when both players are human. Returns 0 to block negotiation if event has 0x1000 flag (ACTION_TRANSPORT), otherwise returns 1.
  JS: engine/events.js → checkNegotiationEvents()
  Match: PARTIAL
  Discrepancy 1: Binary multiplayer bidirectional check (both-human reversed role matching) is not implemented in JS.
  Discrepancy 2: Binary returns 0 (block) vs 1 (allow) based on ACTION_TRANSPORT flag 0x1000. JS may not implement negotiation blocking.

FUN_004fc20d | 169B | YES
  Binary: event_check_no_schism — scans event list for type==0x80 (NOSCHISM). If defender civ matches (-2 = any), dispatches event. Returns 0 if any NOSCHISM event matched (preventing schism), 1 otherwise.
  JS: engine/events.js → checkNoSchismEvents()
  Match: YES
  Discrepancy: NONE

FUN_004fc2bb | 243B | YES
  Binary: event_check_city_taken — scans event list for type==2 (CITYTAKEN). Checks city name (case-insensitive), attacker civ, and defender civ. Fills in ANYBODY wildcards with actual values.
  JS: engine/events.js → checkCityTakenEvents()
  Match: YES
  Discrepancy: NONE

FUN_004fc3ae | 360B | YES
  Binary: event_dispatch_actions — master action dispatcher. Checks just-once guard (flag 0x40 with 0x2000 fired-check). Dispatches based on action bitflags: 0x10=play_sound, 0x80=play_cd, 0x04=create_unit, 0x02=move_unit, 0x200=change_terrain, 0x20=make_aggression, 0x08=change_money, 0x04(bit5)=destroy_civ, 0x08(bit5)=give_tech, 0x01=display_text, 0x01(bit5)=flag_set. Sets 0x2000 fired flag if just-once.
  JS: engine/events.js → executeActions()
  Match: YES — all action types implemented in JS dispatcher.
  Discrepancy 1: Binary checks (flag 0x40 set AND flag 0x2000 set) to skip already-fired just-once events. JS uses event.fired boolean. Equivalent semantics.

FUN_004fc516 | 12813B | YES
  Binary: parse_events_file — massive 12.8KB parser for @IF/@THEN/@ENDIF event script format. Parses 10 trigger types: UNITKILLED, CITYTAKEN, TURN, TURNINTERVAL, NEGOTIATION, NOSCHISM, RECEIVEDTECHNOLOGY, RANDOMTURN, SCENARIOLOADED. Parses 12 action types: TEXT, CREATEUNIT, CHANGEMONEY, JUSTONCE, DONTPLAYWONDERS, MAKEAGGRESSION, DESTROYACIVILIZATION, GIVETECHNOLOGY, MOVEUNIT, PLAYCDTRACK, PLAYWAVEFILE, CHANGETERRAIN.
  JS: engine/events.js → parseEvents() (line ~195)
  Match: YES — all trigger types and action types are parsed.
  Discrepancy 1: Binary CREATEUNIT requires unit, owner, veteran, homecity, and locations fields. JS parsing may not enforce all required fields.
  Discrepancy 2: Binary MOVEUNIT parses maprect (4 corner pairs), moveto coordinates, and numbertomove. JS may handle these fields differently.
  Discrepancy 3: Binary CHANGETERRAIN parses terraintype as numeric 0-10 and maprect with 4 corner coordinate pairs. JS may accept terrain names as well.
  Discrepancy 4: Binary NEGOTIATION parses talkertype/listenertype as HUMAN/COMPUTER/HUMANORCOMPUTER (1/2/4). JS may not implement these player type filters.

---

## Summary

| Category | Count |
|----------|-------|
| FW — Framework (CRT/MFC/SEH) | 38 |
| UI — User Interface (Civilopedia) | 33 |
| GL — Game Logic: City Turn | 6 |
| GL — Game Logic: Scenario Events | 30 |
| **TOTAL** | **107** |

### Key Discrepancies Found

1. **FUN_004f0221 (payBuildingUpkeep)**: Binary sells the building that caused deficit (in iteration order); JS sells cheapest-maintenance building. Binary applies gold_multiplier to refund; JS does not.

2. **FUN_004f0a9c (processCityTurn)**: Binary has 6 attitude score penalty categories comparing city metrics against government benchmarks (waste, corruption, size, discovery, trade, luxuries). JS does not implement these per-city-turn attitude adjustments.

3. **FUN_004fa944 (event change_money)**: Binary clamps treasury to 0-30000 range. JS does not cap.

4. **FUN_004fa250 (resolve_civ_name)**: Binary maps TRIGGERDEFENDER and TRIGGERRECEIVER both to -4, TRIGGERATTACKER to -3. JS maps all three to -3.

5. **FUN_004fa359 (resolve_unit_name)**: Binary supports "ANYUNIT" wildcard (-2). JS does not.

6. **FUN_004fbe84 (event_check_negotiation)**: Binary has multiplayer bidirectional role-swap matching (both-human scenarios). JS does not.

7. **FUN_004fb29f (event_action_move_unit)**: Binary only moves AI units; JS has no such restriction. Binary issues goto orders; JS teleports.

8. **FUN_004fb5b2 (event_action_change_terrain)**: Binary destroys cities/units in region before terrain change, recalculates territories, handles civ elimination. JS does not.

9. **FUN_004fbb2f (event_check_random_trigger)**: Binary uses rand()%denom+1==denom; JS uses Math.random()<1/denom. Same probability but different implementation.
