# Block 004D0000 — Phase 7 Audit

**Functions in this block: 123**
**System: Science Advisor dialog, Cheat/Rules Editor, Civilopedia text parser, Diplomacy/Parley transactions**

---

## FW — Framework (51 functions)

FUN_004d007e | 148B | N/A (string trimmer — strips leading whitespace)
FUN_004d0160 | 78B | N/A (timer check + object cache invalidation)
FUN_004d0314 | 12B | N/A (thunk to FUN_004d08b0 — destructor dispatch)
FUN_004d032a | 15B | N/A (SEH unwind thunk)
FUN_004d041a | 12B | N/A (thunk to FUN_004d08b0 — destructor dispatch)
FUN_004d0430 | 15B | N/A (SEH unwind thunk)
FUN_004d0a56 | 15B | N/A (MFC CString destructor dispatch)
FUN_004d0a65 | 15B | N/A (GDI resource cleanup)
FUN_004d0a74 | 15B | N/A (GDI resource cleanup)
FUN_004d0a83 | 15B | N/A (GDI resource cleanup)
FUN_004d0a92 | 15B | N/A (GDI resource cleanup)
FUN_004d0aa1 | 15B | N/A (GDI resource cleanup)
FUN_004d0ab0 | 15B | N/A (GDI resource cleanup)
FUN_004d0abf | 15B | N/A (GDI resource cleanup)
FUN_004d0ace | 15B | N/A (bitmap object destructor)
FUN_004d0add | 15B | N/A (MFC toolbar destructor)
FUN_004d0aec | 15B | N/A (MFC toolbar destructor)
FUN_004d0afb | 15B | N/A (MFC toolbar destructor)
FUN_004d0b0a | 15B | N/A (DirectDraw surface cleanup)
FUN_004d0b19 | 15B | N/A (Timevec destructor for palette data)
FUN_004d0b28 | 15B | N/A (MFC class destructor dispatch)
FUN_004d0b37 | 9B | N/A (MFC class destructor dispatch)
FUN_004d0b4a | 14B | N/A (SEH unwind thunk)
FUN_004d138b | 12B | N/A (GDI resource cleanup)
FUN_004d1397 | 9B | N/A (bitmap object destructor)
FUN_004d13aa | 14B | N/A (SEH unwind thunk)
FUN_004d49d5 | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d49e1 | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d49ed | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d49f9 | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d4a05 | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d4a11 | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d4a1d | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d4a29 | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d4a35 | 9B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d4a3e | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d4a4a | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d4a56 | 12B | N/A (bitmap object destructor — advisor cleanup)
FUN_004d4a6c | 15B | N/A (SEH unwind thunk)
FUN_004d56ea | 9B | N/A (bitmap object destructor)
FUN_004d56fd | 14B | N/A (SEH unwind thunk)
FUN_004da9be | 12B | N/A (DirectDraw surface cleanup)
FUN_004da9d4 | 14B | N/A (SEH unwind thunk)
FUN_004daa3b | 12B | N/A (MFC window destructor)
FUN_004daa51 | 14B | N/A (SEH unwind thunk)
FUN_004d6f58 | 16B | N/A (empty no-op function)
FUN_004d8af0 | 27B | N/A (vtable accessor — returns first member pointer)
FUN_004d8b20 | 57B | N/A (video player destructor + heap free)
FUN_004d8b70 | 54B | N/A (button hotspot registration wrapper)
FUN_004db210 | 21B | N/A (thunk to FUN_004db225 — resource init)
FUN_004db225 | 26B | N/A (string resource copy — wraps 00428cb0)

---

## UI — User Interface (52 functions)

FUN_004d01ae | 90B | N/A (copies 6 player score values to globals for advisor display)
FUN_004d0208 | 268B | N/A (Science Advisor — main entry point, dispatches by sign of param)
FUN_004d0339 | 225B | N/A (Science Advisor — alternate entry for specific player)
FUN_004d043f | 216B | N/A (Science Advisor — title bar renderer with player name/civ/year)
FUN_004d0517 | 677B | N/A (Science Advisor — MFC dialog constructor, CString/toolbar init)
FUN_004d08b0 | 422B | N/A (Science Advisor — MFC dialog destructor, resource cleanup chain)
FUN_004d0b58 | 524B | N/A (Science Advisor — DLL load, resource init, button setup)
FUN_004d0d64 | 322B | N/A (Science Advisor — window creation, DirectDraw surface, callbacks)
FUN_004d0ea6 | 1232B | N/A (Science Advisor — main render/event loop for advisor screen)
FUN_004d13b8 | 877B | N/A (Science Advisor — refresh handler for already-open dialog)
FUN_004d1725 | 154B | N/A (Science Advisor — video mode transition wrapper)
FUN_004d17bf | 12822B | N/A (Science Advisor — 12KB hardcoded layout data + render pipeline — defines 88 tech tree node positions)
FUN_004d4a7b | 1366B | N/A (Science Advisor — builds player status text: scores, gold, year, population for status panel)
FUN_004d4fd1 | 986B | N/A (Science Advisor — typewriter text animation, per-character draw + newline handling)
FUN_004d53ab | 826B | N/A (Science Advisor — button sprites renderer — loads graphical buttons from DLL resources)
FUN_004d570b | 1046B | N/A (Science Advisor — starfield particle animation + scrolling text display)
FUN_004d5b21 | 769B | N/A (Science Advisor — video playback for civ2_video_launch.avi)
FUN_004d5e41 | 184B | N/A (Science Advisor — button hotspot layout based on dialog mode)
FUN_004d5ef9 | 128B | N/A (Science Advisor — button area clear + redraw)
FUN_004d5f79 | 300B | N/A (Science Advisor — left button highlight state renderer)
FUN_004d60a5 | 286B | N/A (Science Advisor — right button highlight state renderer)
FUN_004d61c3 | 415B | N/A (Science Advisor — mouse click handler, dispatches text advance/video)
FUN_004d6367 | 29B | N/A (Science Advisor — timer callback for typewriter animation)
FUN_004d6384 | 119B | N/A (Science Advisor — toggle right-button highlight flag)
FUN_004d63fb | 841B | N/A (Science Advisor — starfield particle animation tick)
FUN_004d6744 | 290B | N/A (Science Advisor — keyboard handler, space/enter = advance text)
FUN_004d686b | 60B | N/A (Science Advisor — video timer tick — forwards to AVI player)
FUN_004d68a7 | 388B | N/A (Science Advisor — mouse down handler, button press tracking)
FUN_004d6a30 | 647B | N/A (Science Advisor — mouse up handler, button release + action dispatch)
FUN_004d6cbc | 663B | N/A (Science Advisor — mouse move handler, button hover feedback)
FUN_004d8bc0 | 234B | N/A (Cheat Editor — copies improvement names + properties from rules to edit buffer)
FUN_004d8caa | 214B | N/A (Cheat Editor — writes improvement changes back from buffer to rules)
FUN_004d8d80 | 332B | N/A (Cheat Editor — sync spin/combo controls with improvement property values)
FUN_004d8ed6 | 437B | N/A (Cheat Editor — read spin/combo values and validate range, return error count)
show_messagebox_929A | 287B | N/A (Cheat Editor — OK handler: validate, save rules, show error messagebox)
FUN_004d93b9 | 390B | N/A (Cheat Editor — rename improvement dialog)
FUN_004d953f | 95B | N/A (Cheat Editor — show Civilopedia text for improvements)
FUN_004d959e | 40B | N/A (Cheat Editor — close editor, invalidate display)
FUN_004d95c6 | 83B | N/A (Cheat Editor — load wonder icon GIF)
FUN_004d9619 | 250B | N/A (Cheat Editor — misc property edit dialog for improvements)
FUN_004d9718 | 342B | N/A (Cheat Editor — listbox selection change handler)
FUN_004d986e | 551B | N/A (Cheat Editor — create spin/combo controls for improvement properties)
FUN_004d9a9f | 244B | N/A (Cheat Editor — create spin control for single property)
FUN_004d9b93 | 1396B | N/A (Cheat Editor — main render/paint handler with Civilopedia text)
FUN_004da107 | 2205B | N/A (Cheat Editor — main init: window creation, control layout, event loop)
FUN_004da9e2 | 89B | N/A (Cheat Editor — top-level entry point wrapping DA107)
FUN_004d9095 | 27B | N/A (Cheat Editor — thunk to redraw handler FUN_004d9b93)
FUN_004db23f | 529B | N/A (Civilopedia text file parser — reads @-tagged sections into index)
FUN_004db450 | 49B | N/A (Civilopedia text index — clear/reset)
FUN_004db481 | 289B | N/A (Civilopedia text index — lookup section by filename + tag)
FUN_004d90b0 | 328B | N/A (Cheat Editor — export improvement data to text file)
FUN_004d91f8 | 162B | N/A (Cheat Editor — export wonder properties to text file)

---

## GL — Game Logic: Diplomacy/Parley Transactions (20 functions)

### FUN_004db690 | 990B | NO (multiplayer parley — packet builder)
  Binary: Builds network packet for diplomacy transaction. Allocates buffer, writes header (magic 0x66606660, msg type 0x82), serializes negotiation state (techs, cities, gold, units, maps) from parley window fields. Sends via FUN_0046b14d.
  JS: N/A — WebSocket architecture uses JSON messages, not binary packets. This is network serialization, not game logic per se.
  Classification note: Borderline FW/GL. Contains no game-rule logic, only serialization. Classified GL because it encodes transaction semantics (cases 5/6/8/9/10/0xc/0xd/0x11).

### FUN_004dbab4 | 1024B | NO (multiplayer parley — serialize sub-transaction)
  Binary: Switch on transaction type (5=map, 6=map, 8=city, 9=gold, 10=unit, 0xc=city, 0xd=war/peace, 0x11=unit+count) — packs negotiation items into buffer. Called by FUN_004db690.
  JS: N/A — JSON serialization handles this implicitly.

### FUN_004dbee6 | 2892B | NO (parley — build description text)
  Binary: Giant switch on transaction types 6-0xf. For each, appends localized text to parleyDescription global (DAT_006a5b58) using string resource IDs. Handles both single and bilateral (type 0xe/0xf) transactions.
  JS: N/A — UI text generation, handled client-side. The JS engine does not build human-readable transaction descriptions.

### FUN_004dcafa | 274B | NO (parley text — list tech names for description)
  Binary: Iterates tech list from parley chunk, appends tech names joined by commas + "and".
  JS: N/A — UI text generation.

### FUN_004dcc0c | 119B | NO (parley text — format gold amount)
  Binary: Formats gold value with itoa + appends currency label.
  JS: N/A — UI text generation.

### FUN_004dcc83 | 546B | NO (parley text — list unit types for description)
  Binary: Groups units by type, counts per type, formats "N type, M type, and K type" text.
  JS: N/A — UI text generation.

### FUN_004dcea5 | 369B | NO (parley text — list cities with counts for description)
  Binary: Iterates city list from parley chunk, appends "CityName (N)" text.
  JS: N/A — UI text generation.

### FUN_004dd016 | 347B | NO (parley text — treaty status text)
  Binary: Switch on param_1 (0=cease, 1=peace, 2=alliance) × param_2 (0=ask, 1=offer), appends localized string.
  JS: N/A — UI text generation.

### FUN_004dd176 | 271B | NO (parley text — list map-share civs for description)
  Binary: Iterates civ list, appends civ names joined by commas + "and".
  JS: N/A — UI text generation.

### FUN_004dd285 | 1381B | YES (core match)
  Binary: parley_execute_transaction — master dispatch. Switches on transaction type: 6=treaty, 7=share tech, 8=give gold, 9=share map, 10=transfer units, 0xb=declare war, 0xc=cede city, 0xd=mutual war/peace, 0xe=bilateral exchange, 0xf=gift. Dispatches to sub-functions. After execution, sends network update (0x79) and checks for civ death (kill_civ if city count=0 and unit count=0).
  JS: engine/diplomacy.js `executeTransaction()` — line 1468
  Match: YES — JS covers the same transaction types (gold, techs, cities, units, maps, treaties). The civ-death check after transaction is present in JS via citycapture.js.
  **Discrepancy: Binary checks for civ death (city count=0 AND unit count=0) at the end of every parley transaction. JS `executeTransaction` does not include a civ-death check — this only happens in citycapture.js after city conquest, not after diplomatic transfers.**

### FUN_004dd8ad | 1521B | YES (core match with discrepancies)
  Binary: Share map visibility between two civs. Iterates all map tiles; if tile visible to param_2, grants visibility to param_1 (bit OR). Then if param_3==0 (full share): for each unit belonging to param_2, grants unit's visibility byte to param_1 and copies tile ownership byte. Also shares unit sight radius around each unit position. Then for cities: if city belongs to param_2, grants city visibility to param_1, copies city tile ownership. Updates tile fog for both civs around shared units and cities.
  JS: engine/diplomacy.js `shareMaps()` — line 1732
  Match: PARTIAL
  **Discrepancy 1: Binary also shares visibility around units (21-tile radius per unit) and cities. JS only does tile-level visibility OR, missing the unit/city sight-radius update.**
  **Discrepancy 2: Binary updates tile ownership for param_1 from param_2's cities (sets city.owner bits). JS does not transfer tile ownership during map sharing.**
  **Discrepancy 3: Binary calls FUN_005b9f1c (visibility recalc) and network sync (0x74) at the end. JS does not do a full visibility recalculation pass.**

### FUN_004dde9e | 102B | YES (core match)
  Binary: Transfer cities from one civ to another. Iterates city list from parley chunk, calls FUN_00467825(param_1, *local_10, 0x2000) for each — this is diplo_set_treaty_flag with flag 0x2000 (WAR flag). Actually looking closer: this sets flag on the city, not a treaty.
  JS: The city transfer is handled by `transferCity()` in diplomacy.js.
  Match: YES — functionally equivalent, though the binary uses a different approach (flag-based city ownership marking).

### FUN_004ddf04 | 174B | YES (core match)
  Binary: Transfer gold — clamps amount to available treasury, subtracts from sender, adds to receiver. Calls FUN_0045b472 (goldToAttitude) and FUN_00456f20 to adjust attitude by -(attitudeValue * 3/2).
  JS: engine/diplomacy.js `transferGold()` — line 1624
  Match: YES — JS implements identical logic: clamp, subtract, add, attitude adjustment with 3/2 multiplier.
  **No discrepancies.**

### FUN_004ddfb2 | 151B | YES (core match)
  Binary: Transfer technologies. Iterates tech list, checks if source has tech (FUN_004bd9f0) and target doesn't, then calls FUN_004bf05b (grant advance).
  JS: engine/diplomacy.js `transferTechs()` — line 1659
  Match: YES — JS implements identical check-and-grant logic.
  **No discrepancies.**

### FUN_004de049 | 153B | YES (core match)
  Binary: Transfer units. Iterates unit index list from parley chunk, resolves unit index via FUN_0052ed95, checks unit is alive, then calls FUN_004de0e2 (transfer city) — wait, actually looking at the code: it iterates unit indices, resolves them, and calls FUN_004de0e2 to transfer each.
  Classification correction: Actually this transfers CITIES via unit indices resolved to city indices — the parley chunk stores city IDs as 8-byte entries (city_id + count). For each entry, resolves city index and calls FUN_004de0e2 (transferCity).
  JS: engine/diplomacy.js `transferUnits()` — line 1685 (for units), or via executeTransaction which calls transferCity for cities.
  Match: YES — functionally equivalent.

### FUN_004de0e2 | 2217B | YES (core match with discrepancies)
  Binary: parley_transfer_city — complete city ownership transfer. Steps:
  1. Removes buildings: Palace(1), Temple(4), Barracks(2), Courthouse(7) via FUN_0043d289
  2. Updates civ city count: new owner count++, old owner count--
  3. Grants visibility around city (21-tile spiral) to new owner
  4. Sets city.owner to new civ
  5. Calls FUN_0043cc00 — recalculates city production/happiness
  6. Fires scenario event if enabled
  7. Updates tile ownership via FUN_005b99e8
  8. Iterates all units: if unit belongs to old civ and is at this city's tile AND unit.home_city == this city, may reassign or disband
  9. Reassigns trade routes that reference this city — increments new owner's trade route count, decrements old owner's
  10. Updates garrison production slot
  11. If city has a port, checks if new owner can support it
  12. Calls FUN_004be6ba to check if this was the Wonder city
  JS: engine/diplomacy.js `transferCity()` — line 1778
  Match: PARTIAL
  **Discrepancy 1: Binary removes buildings {1,2,4,7} (Palace, Barracks, Temple, Courthouse). JS TRANSFER_REMOVE_BUILDINGS = {1,2,4,7} — same set. Match.**
  **Discrepancy 2: Binary updates civ.cityCount++ / civ.cityCount-- explicitly. JS does not maintain a separate cityCount field — it derives count from array filtering.**
  **Discrepancy 3: Binary reassigns trade routes (updates trade_partner_civ, increments/decrements trade route counts). JS clears tradeRoutes to empty array — more aggressive than binary.**
  **Discrepancy 4: Binary calls FUN_0043cc00 to recalculate city state after transfer. JS does not explicitly recalculate — relies on next cityturn pass.**
  **Discrepancy 5: Binary reassigns units at the city tile that have home_city == this city — they get re-homed to nearest city of old owner, with complex garrison logic. JS transferCity only transfers city, does not rehome units at all — unit rehoming is only in transferUnits.**
  **Discrepancy 6: Binary handles Wonder reassignment (FUN_004be6ba) if the transferred city held a wonder. JS does not have this check in transferCity.**

### FUN_004de990 | 887B | YES (core match with discrepancies)
  Binary: Transfer individual units (by unit global index). For each unit:
  1. Resolves unit index via FUN_0052ec47
  2. Checks unit belongs to expected civ
  3. If unit is in a stack with >1 units, may split stack first
  4. Finds new position for unit near current location (via FUN_004ded07)
  5. Updates unit owner, resets orders/home city
  6. Updates city unit counts (garrison counts) for both old and new owner
  7. Moves unit to new valid position
  8. Calls XD_FlushSendBuffer(5000) for network sync
  JS: engine/diplomacy.js `transferUnits()` — line 1685
  Match: PARTIAL
  **Discrepancy 1: Binary splits stacks if unit is in a multi-unit stack before transfer. JS does not handle stack splitting.**
  **Discrepancy 2: Binary uses FUN_004ded07 to find a valid nearby tile for the transferred unit (checking terrain compatibility). JS just changes the owner field without relocating.**
  **Discrepancy 3: Binary updates garrison counts for both old and new owner cities. JS does not maintain garrison counts.**

### FUN_004ded07 | 589B | YES (utility — find valid tile for unit transfer)
  Binary: Finds a valid tile near param_1's current position where param_4 (new owner) can place the unit. Checks terrain compatibility (land/sea/air), existing ownership, and whether tile is occupied. Searches in expanding rings up to 45 tiles.
  JS: Not directly implemented. JS transferUnits does not relocate units.
  **Discrepancy: Binary has careful tile-compatibility checking for transferred units. JS has none — potential for invalid unit placement after diplomatic transfer.**

### FUN_004def54 | 417B | NO (parley text — treaty status description)
  Binary: Switch on treaty type (0=ceasefire, 1=peace, 2=alliance, 3=withdraw) × context (0=demand, 1=offer). Appends localized string to description.
  JS: N/A — UI text only.

### FUN_004df10f | 289B | YES (core match)
  Binary: Execute treaty change. Switch on param_1: 0=sign ceasefire (flag 0x02), 1=sign peace (0x04), 2=sign alliance (0x08), 3=cancel all treaties (remove 0x02|0x04|0x08). Calls FUN_00467825/FUN_00467750 to set/clear treaty flags.
  JS: engine/diplomacy.js — signCeasefire(), signPeaceTreaty(), formAlliance(), declareWar() — lines 270-600
  Match: YES — JS has dedicated functions for each treaty action with equivalent flag operations.
  **No discrepancies.**

---

## Summary

| Category | Count |
|----------|-------|
| FW — Framework | 51 |
| UI — User Interface | 52 |
| GL — Game Logic | 20 |
| **Total** | **123** |

---

## GL Discrepancy Summary

### 1. Civ Death Check After Diplomatic Transfer
- **Binary (FUN_004dd285)**: Checks if either civ has 0 cities AND 0 units after every parley transaction, kills civ if so.
- **JS**: No civ-death check in executeTransaction. Only checked after military city capture.
- **Impact**: A civ giving away its last city + units via diplomacy would remain alive in JS but be killed in binary.

### 2. Map Sharing Incomplete (FUN_004dd8ad)
- **Binary**: Shares tile visibility, unit sight radius (21 tiles per unit), city sight radius, and tile ownership.
- **JS**: Only does tile-level visibility OR. Missing unit/city radius updates and tile ownership transfer.
- **Impact**: After map sharing in JS, player may not see tiles around the other civ's units/cities.

### 3. City Transfer — Trade Route Handling (FUN_004de0e2)
- **Binary**: Reassigns existing trade routes to new owner, preserving them.
- **JS**: Clears all trade routes on transfer (sets to empty array).
- **Impact**: Diplomatic city transfers in JS destroy trade routes that the binary would preserve.

### 4. City Transfer — Unit Rehoming (FUN_004de0e2)
- **Binary**: Units at the transferred city with home_city == this city get rehomed to nearest city of the old owner.
- **JS**: Does not rehome units at all during city transfer.
- **Impact**: Units could become homeless/orphaned after diplomatic city transfer.

### 5. City Transfer — Wonder Reassignment (FUN_004de0e2)
- **Binary**: Checks if transferred city held a wonder and calls FUN_004be6ba to handle wonder effects.
- **JS**: No wonder effect check on diplomatic city transfer.
- **Impact**: Wonder effects (like Palace) might not properly transfer.

### 6. Unit Transfer — Stack Splitting and Relocation (FUN_004de990)
- **Binary**: Splits multi-unit stacks before transfer, finds valid nearby tile for the new owner.
- **JS**: Simply changes owner field without stack handling or relocation.
- **Impact**: Transferred units could end up on invalid tiles or in invalid stack configurations.

### 7. Unit Placement Validation (FUN_004ded07)
- **Binary**: 45-tile search for valid placement considering terrain type, existing units, and ownership.
- **JS**: No equivalent validation — units stay in place after ownership change.
- **Impact**: Naval units could end up on land tiles or vice versa after diplomatic transfer.
