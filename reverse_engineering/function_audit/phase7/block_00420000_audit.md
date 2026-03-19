# Block 00420000 — Phase 7 Audit

**Functions in this block: 157**
**System: Multiplayer networking, advisor screens (Science/Trade/City/Happiness/Military/Diplomatic), credits/splash, city name editor, string pool, tile visibility/unit movement**

---

## FW — Framework (65 functions)

FUN_004201ef | 12B | N/A (thunk to FUN_005d7c6e)
FUN_004201fb | 12B | N/A (thunk to stream destructor FUN_005c656b)
FUN_00420207 | 12B | N/A (thunk to MFC destructor FUN_0059df8a)
FUN_0042021d | 14B | N/A (SEH unwind handler — restores FS:[0])
FUN_00421bb0 | 21B | N/A (thunk to GetTickCount wrapper FUN_005d41e0)
FUN_00421bd0 | 21B | N/A (thunk to FUN_005bb9c0)
Realloc | 40B | N/A (MFC CHtmlStream/CMemFile::Realloc — library function)
FUN_00421c30 | 34B | N/A (thunk to FUN_005d8476)
FUN_00421c60 | 44B | N/A (thunk to FUN_005d8721)
FUN_00424101 | 12B | N/A (thunk to stream destructor FUN_005c656b — MP cleanup)
FUN_0042410d | 12B | N/A (thunk to MFC destructor FUN_0059df8a — MP cleanup)
FUN_00424129 | 12B | N/A (thunk to stream destructor FUN_005c656b — MP cleanup 2)
FUN_00424135 | 12B | N/A (thunk to MFC destructor FUN_0059df8a — MP cleanup 2)
FUN_0042414b | 17B | N/A (SEH unwind handler — restores FS:[0])
FUN_00429e53 | 12B | N/A (thunk to stream destructor — city name editor)
FUN_00429e69 | 14B | N/A (SEH unwind handler — city name editor)
FUN_00429ed0 | 12B | N/A (thunk to FUN_004183d0 — font cleanup)
FUN_00429ee6 | 14B | N/A (SEH unwind handler — city name editor 2)
FUN_0042ab9b | 12B | N/A (thunk to stream destructor — credits)
FUN_0042abb1 | 16B | N/A (SEH unwind handler — credits)
FUN_0042bc22 | 12B | N/A (thunk to MFC destructor — trade supply cleanup)
FUN_0042bc38 | 15B | N/A (SEH unwind handler — trade supply)
FUN_0042bd6b | 12B | N/A (thunk to MFC destructor — trade search cleanup)
FUN_0042bd81 | 14B | N/A (SEH unwind handler — trade search)
FUN_0042a380 | 26B | N/A (CRT static init — font size 24 pair)
FUN_0042a39a | 32B | N/A (CRT static init — font size 24 create)
FUN_0042a3ba | 29B | N/A (CRT static init — font size 24 atexit registration)
FUN_0042a3d7 | 26B | N/A (CRT static init — font size 24 cleanup)
FID_conflict:_$E51 (0x0042A3F1) | 26B | N/A (CRT static init — font size 18 pair)
FUN_0042a40b | 30B | N/A (CRT static init — font size 18 create)
FUN_0042a429 | 29B | N/A (CRT static init — font size 18 atexit registration)
FUN_0042a446 | 26B | N/A (CRT static init — font size 18 cleanup)
FUN_0042a460 | 26B | N/A (CRT static init — font size 16 pair)
FUN_0042a47a | 32B | N/A (CRT static init — font size 16 create)
FUN_0042a49a | 29B | N/A (CRT static init — font size 16 atexit registration)
FUN_0042a4b7 | 26B | N/A (CRT static init — font size 16 cleanup)
FUN_0042a4d1 | 26B | N/A (CRT static init — font size 14 pair)
FUN_0042a4eb | 32B | N/A (CRT static init — font size 14 create)
FUN_0042a50b | 29B | N/A (CRT static init — font size 14 atexit registration)
FUN_0042a528 | 26B | N/A (CRT static init — font size 14 cleanup)
FUN_0042a542 | 26B | N/A (CRT static init — font size 12 pair)
FUN_0042a55c | 32B | N/A (CRT static init — font size 12 create)
FUN_0042a57c | 29B | N/A (CRT static init — font size 12 atexit registration)
FUN_0042a599 | 26B | N/A (CRT static init — font size 12 cleanup)
FID_conflict:_$E51 (0x0042A5B3) | 26B | N/A (CRT static init — font 16b pair)
FUN_0042a5cd | 30B | N/A (CRT static init — font 16b create)
FUN_0042a5eb | 29B | N/A (CRT static init — font 16b atexit registration)
FUN_0042a608 | 26B | N/A (CRT static init — font 16b cleanup)
FID_conflict:_$E31 (0x0042A622) | 26B | N/A (CRT static init — CDaoFieldInfo 1 pair)
FUN_0042a63c | 26B | N/A (CRT static init — CDaoFieldInfo 1 create)
FUN_0042a656 | 29B | N/A (CRT static init — CDaoFieldInfo 1 atexit registration)
FUN_0042a673 | 26B | N/A (CRT static init — CDaoFieldInfo 1 cleanup destructor)
FID_conflict:_$E31 (0x0042A68D) | 26B | N/A (CRT static init — CDaoFieldInfo 2 pair)
FUN_0042a6a7 | 26B | N/A (CRT static init — CDaoFieldInfo 2 create)
FUN_0042a6c1 | 29B | N/A (CRT static init — CDaoFieldInfo 2 atexit registration)
FUN_0042a6de | 26B | N/A (CRT static init — CDaoFieldInfo 2 cleanup destructor)
FUN_0042a6f8 | 26B | N/A (CRT static init — TILES.DLL resource pair)
FUN_0042a712 | 31B | N/A (CRT static init — TILES.DLL load)
FUN_0042a731 | 29B | N/A (CRT static init — TILES.DLL atexit registration)
FUN_0042a74e | 26B | N/A (CRT static init — TILES.DLL cleanup destructor)
FUN_00426f30 | 57B | N/A (MFC destructor with conditional delete — MP object)
FUN_00428cb0 | 54B | N/A (MFC constructor — initializes object fields to 0)
FUN_004289e0 | 21B | N/A (string pool constructor wrapper — calls FUN_004289f5)
FUN_004289f5 | 26B | N/A (string pool constructor — calls FUN_00428cb0)
FUN_00428a78 | 29B | N/A (string pool destructor — frees arena allocation)

---

## UI — User Interface (84 functions)

### UI — Multiplayer Networking (31 functions)

FUN_00421ca0 | 108B | N/A (MP list control — invalidate item for repaint)
FUN_00421d30 | 29B | N/A (MP UI — append text separator to buffer)
FUN_00421d60 | 46B | N/A (MP UI — set string control: strcpy to dialog strings array)
FUN_00421da0 | 29B | N/A (MP UI — set number control: store int to dialog numbers array)
FUN_00421dd0 | 38B | N/A (MP UI — clear window rect)
Create (CSocket) | 46B | N/A (MFC CSocket::Create — WinSock wrapper)
FUN_00421e40 | 32B | N/A (MP — store two global connection params)
FUN_00421e70 | 37B | N/A (MP — call dialog open with connection params)
FUN_00421ea0 | 33B | N/A (MP — call dialog close with param)
FUN_00421ed0 | 45B | N/A (MP — call dialog function with 4 params)
FUN_00421f10 | 33B | N/A (MP — call string formatter with param)
FUN_00421f40 | 31B | N/A (MP — read byte from object offset 0x1ef)
FUN_00421f70 | 61B | N/A (MP — initialize connection object fields)
FUN_00421fad | 32B | N/A (MP — call init function)
FUN_00421fcd | 8475B | N/A (MP — master connection/join flow: lobby browse, version check, handshake, game load, seat assignment — entirely Win32/MFC networking)
FUN_0042415c | 30B | N/A (MP — call enter critical section)
FUN_0042417a | 126B | N/A (MP — enter critical section + check network status flags, invalidate window if disconnected)
FUN_004241f8 | 324B | N/A (MP — heartbeat timer: animate connection indicator arrow if no data received)
FUN_0042433c | 96B | N/A (MP — enter critical section + invalidate on network data/disconnect)
FUN_0042439c | 83B | N/A (MP — enter critical section + invalidate on sync/disconnect)
FUN_004243ef | 96B | N/A (MP — enter critical section + invalidate on error/disconnect)
FUN_0042444f | 145B | N/A (MP — enter critical section + timeout check: invalidate on lobby timeout or DAT_006ad300 active)
FUN_004244e0 | 424B | N/A (MP — server list UI: calculate selected item scroll position)
FUN_00424688 | 157B | N/A (MP — find server in linked list by name/description match, return list node)
FUN_0042472a | 136B | N/A (MP — populate server name/description from linked list into UI controls)
FUN_004247b2 | 189B | N/A (MP — resolve linked list node to server name/description for UI display)
FUN_0042486f | 634B | N/A (MP — create 9 static text labels for server info display panel)
FUN_00424ae9 | 2305B | N/A (MP — populate server info panel: name, version, description, map size, difficulty, turn limit, timer, player counts)
FUN_004253ef | 185B | N/A (MP — cleanup server list: free linked list nodes and reset UI state)
FUN_004254a8 | 351B | N/A (MP — add entry to server list: allocate node, copy name, set flags)
FUN_00425607 | 73B | N/A (MP — start keepalive timer with 50ms interval)
FUN_00425650 | 69B | N/A (MP — stop keepalive timer)
FUN_00425695 | 119B | N/A (MP — send keepalive packet + restart server cleanup timer at 250ms)
FUN_0042570c | 242B | N/A (MP — prune stale servers from list: remove entries older than DAT_006ad8b8 * 60 ticks)
FUN_004257fe | 424B | N/A (MP — rebuild server list UI: clear, repopulate from linked list, mark full/in-progress entries, update scroll/display)
FUN_004259a6 | 1423B | N/A (MP — game profile dialog: populate map/rules/player settings for host screen)
FUN_00426f80 | 37B | N/A (MP — manage window for connection)
FUN_00426fb0 | 45B | N/A (MP — call modal dialog with params)
FUN_00426ff0 | 504B | N/A (MP — string template processor: %STRING0..%NUMBER0..%HEX0 substitution for MP dialog labels)
FUN_004271e8 | 41B | N/A (MP/UI — set string control from localized string ID)
FUN_00427211 | 41B | N/A (MP/UI — set string control from resource index table)

### UI — String Pool / Label System (5 functions)

FUN_00428a0f | 105B | N/A (string pool — init or reinit arena allocator for label strings)
FUN_00428a95 | 119B | N/A (string pool — add null-terminated string to arena, return index)
FUN_00428b0c | 92B | N/A (string pool — lookup string by index: walk past N null terminators)
FUN_00428b68 | 177B | N/A (string pool — add string with minimum buffer size, pad with zeros)
FUN_0042e1e8 | 56B | N/A (advisor UI — append separator + string label to text buffer)

### UI — City Name Editor (12 functions)

FUN_00428d00 | 27B | N/A (city name editor — repaint wrapper, calls FUN_004293a8)
FUN_00428d1b | 45B | N/A (city name editor — reset state and invalidate window)
FUN_00428d48 | 95B | N/A (city name editor — open/parse CITIES section from rules file)
FUN_00428da7 | 40B | N/A (city name editor — reset and invalidate)
FUN_00428dcf | 129B | N/A (city name editor — commit edited name to data structure)
FUN_00428e50 | 349B | N/A (city name editor — debug/scenario misc editor dialog dispatch: switch on item type 0-11)
FUN_00428fd2 | 108B | N/A (city name editor — read 3 scroll positions from dialog controls)
FUN_0042903e | 864B | N/A (city name editor — create radio button groups for 3 categories with 4-6 items each)
FUN_004293a8 | 713B | N/A (city name editor — main paint: draw sprite, labels, 3 button rows)
FUN_00429671 | 2002B | N/A (city name editor — main dialog: create window, buttons, scrollbars, event loop, cleanup)
FUN_00429e77 | 89B | N/A (city name editor — outer wrapper: init font, call main dialog, cleanup)

### UI — Credits/Splash (7 functions)

FUN_0042a768 | 84B | N/A (credits — stop animation: cancel timer, restore window state)
show_credits | 986B | N/A (credits — display credits/splash screen with GIF animation and scrolling)
FUN_0042abc1 | 87B | N/A (credits — blit DirectDraw surface to window)
FUN_0042ac18 | 54B | N/A (credits — blit with stored dimensions)
FUN_0042ac4e | 98B | N/A (credits — timer callback: stop animation or invalidate for next frame)
FUN_0042acb0 | 223B | N/A (advisor — create main OK button for advisor screens, positioned at bottom)

### UI — Advisor: Intelligence/Foreign (5 functions)

FUN_0042f293 | 4042B | N/A (diplomatic intelligence report — paint: civ header, government, attitude, treaties, tech grid with scroll)
FUN_0042f079 | 538B | N/A (diplomatic intelligence — main dialog: create window, buttons, scrollbar, event loop)
FUN_0042f000 | 121B | N/A (diplomatic intelligence — toggle domestic/foreign view mode)
FUN_0042efe3 | 29B | N/A (diplomatic intelligence — scrollbar handler: set offset, repaint)
FUN_0042e220 | 3523B | N/A (diplomatic intelligence — paint: unit type list with stats, build counts per civ)

### UI — Advisor: Military/Defense (7 functions)

FUN_0042e185 | 99B | N/A (defense advisor — main dialog wrapper: create window, event loop)
FUN_0042e09c | 228B | N/A (defense advisor — click handler: find clicked city by scroll offset, open city screen)
FUN_0042e07f | 29B | N/A (defense advisor — scrollbar handler: set offset, repaint)
FUN_0042da1d | 1634B | N/A (defense advisor — paint: civ header, city list with unit sprites showing happiness)
FUN_0042d781 | 668B | N/A (defense advisor — draw citizen icons for one city row: happy/content/unhappy/specialist)
FUN_0042d71e | 99B | N/A (defense advisor — main dialog wrapper: create window, event loop)
FUN_0042d635 | 228B | N/A (defense advisor — click handler: find clicked city, open city screen)

### UI — Advisor: Trade (8 functions)

FUN_0042d618 | 29B | N/A (trade advisor — scrollbar handler: set offset, repaint)
FUN_0042ced6 | 1858B | N/A (trade advisor — paint: civ header, city list with food/trade/shield icons, costs)
FUN_0042cd2f | 423B | N/A (trade advisor — main dialog: create window, buttons, scrollbar, event loop)
FUN_0042cd11 | 30B | N/A (trade advisor — search supply chain from trade advisor)
FUN_0042ccf4 | 29B | N/A (trade advisor — scrollbar handler: set offset, repaint)
FUN_0042bd8f | 3931B | N/A (trade advisor — paint: city list with supply demand, upkeep totals, science costs)
FUN_0042bc47 | 292B | N/A (trade advisor — supply chain search dialog: loop through 16 resources, pick one)
FUN_0042b824 | 1022B | N/A (trade advisor — supply chain detail: show cities producing/demanding a specific resource)

### UI — Advisor: Science/City Status (6 functions)

FUN_0042b67d | 423B | N/A (science advisor — main dialog: create window, buttons, scrollbar, event loop)
FUN_0042b65b | 34B | N/A (science advisor — open tech tree display)
FUN_0042b563 | 243B | N/A (science advisor — click handler: find clicked tech by grid position, open tech detail)
FUN_0042b540 | 35B | N/A (science advisor — scrollbar handler: set offset, repaint)
FUN_0042ad8f | 1969B | N/A (science advisor — paint: civ header, current research, tech grid with completion bars)

### Note on shared functions

Note: FUN_0042e1e8, FUN_0042d781, and FUN_0042acb0 are shared across multiple advisor screens. They are counted once above in their primary listing.

---

## GL — Game Logic: Visibility & Movement (4 functions)

FUN_004272d0 | 188B | PARTIAL
  Binary: reveal_tile_for_civ(x, y, civIdx) — sets per-civ exploration bit via set_tile_visibility(), updates tile known state via update_tile_known(), checks for city at tile (reveal_city_to_civ) or unit at tile (reveal_unit_to_civ), bracketed by lock/unlock_tile_data().
  JS: engine/visibility.js `updateVisibility()` — sets visibility bitmask on tiles in a radius pattern. Does not separately handle city/unit reveal or tile data locking (N/A in JS).
  Match: PARTIAL — JS sets visibility bits equivalently but does not have separate city-reveal or unit-reveal sub-calls. The tile exploration bitmask logic matches. The city/unit reveal side-effects are handled elsewhere in the JS reducer (move-unit.js handles first contact, city capture, etc.).

FUN_0042738c | 90B | NOT PORTED
  Binary: cancel_goto_if_blocked(unitIdx) — if unit has goto order (orders & 0xF == 0xB) and unit type domain is not AIR (domain != 7), cancel goto by setting orders = 0xFF.
  JS: No equivalent function found. The JS engine does not currently cancel goto orders when an enemy unit is encountered or when movement is blocked by newly-visible units.
  Match: NOT PORTED — This is a minor AI/automation feature. When a unit on goto encounters a newly visible enemy, its goto should be cancelled (except for air units). The JS engine does not implement this behavior.

FUN_004273e6 | 192B | NOT PORTED
  Binary: cancel_goto_for_stack(unitIdx) — walks through entire unit stack; for any unit with orders == 0x03 (sentry), cancels if the unit type has domain != LAND or the tile is water (calls is_tile_water check). Sets orders = 0xFF.
  JS: No equivalent function found. The JS engine does not walk unit stacks to cancel sentry/sleep orders when newly visible enemies appear.
  Match: NOT PORTED — Similar to FUN_0042738c, this is an automation feature that wakes sentries when enemies are first spotted. Not currently implemented.

FUN_004274a6 | 4250B | PARTIAL
  Binary: process_unit_move_visibility(unitIdx, doCombat) — MASTER post-move handler, 4250 bytes. Every unit movement triggers this. Does three phases:
    Phase 1: Reveal tiles in 25-tile city spiral pattern. For non-barbarian civs, updates civ's tile memory. Checks for terrain discovery (discoveryFlags 5 for adjacent, 10 for extended range). Attacker/air units get extended range (tiles 8-24).
    Phase 2: Check 8 adjacent tiles for encounters. Discovers cities (reveal_city_to_civ), encounters units (mutual visibility, cancel blocked gotos). Triggers first contact diplomacy if no treaty exists. Treaty violations (entering tiles near enemy without war declared) trigger diplomatic incidents via trigger_diplomatic_incident().
    Phase 3: Extended range encounters (tiles 8-24 excluding center). Handles attacker units seeing distant enemies, cancels gotos, triggers diplomatic incidents for naval/air zone violations.
    Phase 4 (epilogue): If multiplayer, sends network events for tile reveals and contact. Updates active player's map focus.
  JS: engine/visibility.js `updateVisibility()` handles Phase 1 (tile reveal bitmask). engine/reduce/move-unit.js handles some Phase 2 logic (first contact, combat initiation). engine/diplomacy.js handles treaty state. However, the JS engine is missing:
    - Goto cancellation on enemy sighting (calls cancel_goto_if_blocked, cancel_goto_for_stack)
    - Civ tile memory updates (update_civ_tile_memory per-civ fog-of-war snapshot)
    - Discovery flags computation (terrain discovery types 5/10)
    - Treaty violation diplomatic incidents from unit proximity
    - Extended range visibility for attacker/air units (tiles 8-24)
    - Barbarian terrain recording (owner==0 visibility |= tile.byte4)
  Match: PARTIAL — Core tile visibility works. Most of the encounter/diplomacy/goto-cancellation side-effects are not ported. The binary function is essentially the "nervous system" connecting movement to diplomacy, AI, and fog-of-war subsystems. The JS handles the basics but lacks many nuanced interactions.

---

## Summary

| Verdict | Count |
|---------|-------|
| N/A (FW/UI/design) | 153 |
| YES (match) | 0 |
| PARTIAL (functional) | 2 |
| NO → FIXED | 0 |
| NOT PORTED | 2 |
| **Total** | **157** |

## Discrepancies Found: 3

### 1. cancel_goto_if_blocked not ported (FUN_0042738c)
- **Binary**: When a unit on goto (orders 0x0B) encounters a newly-visible enemy, cancel the goto (set orders 0xFF) unless the unit is an air unit (domain 7).
- **JS**: No equivalent. Goto orders are never cancelled based on enemy sighting.
- **Recommended fix**: In the unit movement reducer or a post-move hook, check if any unit on goto can now see an enemy unit. If so, and the unit is not an air unit, cancel the goto order.

### 2. cancel_goto_for_stack not ported (FUN_004273e6)
- **Binary**: Walk all units in a stack; for any unit with sentry orders (0x03), cancel if the unit's domain is not LAND or the tile is water. This wakes sentries when enemies appear.
- **JS**: No equivalent wake-sentry-on-enemy logic.
- **Recommended fix**: Add sentry wake logic when an enemy unit becomes visible within the sentry's vision range.

### 3. process_unit_move_visibility missing several sub-features (FUN_004274a6)
- **Binary**: 4250-byte master function with extensive post-move side-effects including: civ tile memory updates, discovery flag types, treaty violation diplomatic incidents from proximity, extended visibility for attackers/air units (tiles 8-24), barbarian terrain recording, goto cancellation for encountered enemies.
- **JS**: `updateVisibility()` handles basic tile reveal. Move-unit reducer handles some encounter logic. Missing: goto cancellation, per-civ tile memory, discovery flags, proximity-based treaty violations, extended attacker visibility radius, barbarian terrain recording.
- **Recommended fix**: These are enhancement-tier items rather than bugs. The most impactful missing features to port would be:
  1. Extended visibility radius for attacker/air units (currently all units get the same radius)
  2. Goto cancellation when enemies are spotted
  3. Proximity-based treaty violation diplomatic incidents

## Functions audited: 157
