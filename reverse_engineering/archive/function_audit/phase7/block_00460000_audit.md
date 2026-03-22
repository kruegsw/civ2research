# Block 00460000 — Phase 7 Audit
**Functions in this block: 107**
**System: AI diplomacy negotiation, treaty flag operations, attitude scoring, networking/multiplayer protocol, resource loading (labels, palettes, bitmaps, art/video), sound/music playback, list-box UI**

## FW — Framework (27 functions)

- `FUN_00460104` (0x00460104, 12B) — Thunk to 0059df8a (dialog cleanup). N/A
- `FUN_0046011a` (0x0046011A, 15B) — SEH frame epilog (FS restore). N/A
- `FUN_004675b0` (0x004675B0, 26B) — Calls FUN_004675ca + FUN_004675e9 (COM init + atexit). N/A
- `FUN_004675ca` (0x004675CA, 31B) — COM init: thunk to 004fa4be(50000). N/A
- `FUN_004675e9` (0x004675E9, 29B) — Register atexit handler (FUN_00467606). N/A
- `FUN_00467606` (0x00467606, 26B) — atexit destructor: thunk to 004fa569. N/A
- `FID_conflict:_$E31` (0x00467620, 26B) — VS98 library init: calls FUN_0046763a + FUN_00467654. N/A
- `FUN_0046763a` (0x0046763A, 26B) — Thunk to 0044c730 (CString init). N/A
- `FUN_00467654` (0x00467654, 29B) — Register atexit handler (FUN_00467671). N/A
- `FUN_00467671` (0x00467671, 26B) — atexit destructor: thunk to 0044ca60. N/A
- `FID_conflict:_$E31` (0x0046768B, 26B) — VS98 library init: calls FUN_004676a5 + FUN_004676bf. N/A
- `FUN_004676a5` (0x004676A5, 26B) — Calls FUN_005dcc10 (static init). N/A
- `FUN_004676bf` (0x004676BF, 29B) — Register atexit handler (FUN_004676dc). N/A
- `FUN_004676dc` (0x004676DC, 26B) — atexit destructor: _Timevec destructor. N/A
- `FUN_0046ab30` (0x0046AB30, 25B) — Identity: returns ECX (noop accessor). N/A
- `FUN_0046ab49` (0x0046AB49, 22B) — Empty function (noop). N/A
- `InvalidateObjectCache` (0x0046AB5F, 35B) — CRichEditDoc::InvalidateObjectCache library function. N/A
- `FUN_0046ab82` (0x0046AB82, 107B) — Remove entry from object cache array (memmove-style shift). N/A
- `FUN_0046abed` (0x0046ABED, 151B) — Search object cache for (param2, param1) and remove match. N/A
- `FUN_0046ac89` (0x0046AC89, 94B) — Remove all object cache entries matching param1. N/A
- `FUN_0046ace7` (0x0046ACE7, 153B) — Add entry to object cache (rect + IDs), max 200 entries. N/A
- `FUN_0046ad85` (0x0046AD85, 259B) — Hit-test object cache: find entry containing (x,y), return IDs. N/A
- `FUN_0046dd98` (0x0046DD98, 12B) — _Timevec destructor (stack frame cleanup). N/A
- `FUN_0046dda4` (0x0046DDA4, 12B) — Calls FUN_005c656b (destructor). N/A
- `FUN_0046ddb0` (0x0046DDB0, 12B) — Thunk to 0044ca60 (CString destructor). N/A
- `FUN_0046ddbc` (0x0046DDBC, 12B) — Calls FUN_005dd1a0 (video cleanup). N/A
- `FUN_0046ddd2` (0x0046DDD2, 14B) — SEH frame epilog (FS restore). N/A

## UI — User Interface (33 functions)

### Diplomacy Negotiation Dialog (1 function — massive)
- `FUN_00460129` (0x00460129, 16263B) — **Main AI diplomacy negotiation handler**. Manages entire diplomatic meeting flow: war provocation, tribute demands, tech exchange, cease-fire proposals, peace treaty offers, alliance formation, gift menus, senate override logic, reputation updates. Primarily UI-driven (message box popups, dialog strings like OUTAHERE, TRIBUTE, TAKECIV, PROPOSEALLIANCE, etc.). Contains embedded game logic for AI decision-making (attitude thresholds, power comparisons, gold transfer, tech transfer). **Too intertwined with UI to meaningfully compare against JS engine**; the JS `diplomacy.js` implements the underlying state mutations (declare war, sign treaty, etc.) as pure functions called by the reducer, while this function handles the player-facing interactive dialog. N/A

### List Box / Selection UI (14 functions)
- `FUN_004683f0` (0x004683F0, 899B) — Create scrollable list-box panel (CWnd, scrollbar, tabs). N/A
- `FUN_00468797` (0x00468797, 30B) — Wrapper: calls FUN_004687d3(0, param1) — update list pane 0. N/A
- `FUN_004687b5` (0x004687B5, 30B) — Wrapper: calls FUN_004687d3(1, param1) — update list pane 1. N/A
- `FUN_004687d3` (0x004687D3, 97B) — Update list-box scroll offset + repaint. N/A
- `FUN_00468834` (0x00468834, 627B) — List-box mouse click handler (Ctrl/Shift selection, toggle, range). N/A
- `FUN_00468aa7` (0x00468AA7, 274B) — Hit-test: convert mouse coords to list item index. N/A
- `FUN_00468bb9` (0x00468BB9, 1841B) — Paint list-box contents (unit sprites, text, scrollbar, highlights). N/A
- `FUN_004692ea` (0x004692EA, 219B) — "Stacked Tab" button handler #1 (update list + repaint). N/A
- `FUN_004693c5` (0x004693C5, 242B) — "Stacked Tab" button handler #2 (update list + repaint). N/A
- `FUN_004694b7` (0x004694B7, 144B) — Show unit info popup (dialog box with unit details). N/A
- `FUN_00469547` (0x00469547, 26B) — Sort list pane 0 ascending: calls FUN_0046957b(0). N/A
- `FUN_00469561` (0x00469561, 26B) — Sort list pane 1 ascending: calls FUN_0046957b(1). N/A
- `FUN_004695e9` (0x004695E9, 26B) — Sort list pane 0 by name: calls FUN_0046961d(0). N/A
- `FUN_00469603` (0x00469603, 26B) — Sort list pane 1 by name: calls FUN_0046961d(1). N/A

### List Box Sort/Build (4 functions)
- `FUN_0046957b` (0x0046957B, 110B) — Sort list pane ascending + repaint. N/A
- `FUN_0046961d` (0x0046961D, 110B) — Sort list pane by name + repaint. N/A
- `FUN_0046968b` (0x0046968B, 639B) — Sort list items by player label name (selection sort, swap data+checked arrays). N/A
- `FUN_0046990a` (0x0046990A, 722B) — Sort list items by unit name (selection sort using unit name strings). N/A

### List Content Population (1 function)
- `FUN_00469bdc` (0x00469BDC, 1102B) — Populate list-box with units visible to current player (adjacency checks, unit name labels). N/A

### Sound/Music (10 functions)
- `FUN_0046e020` (0x0046E020, 601B) — Play sound effect (WAV file from sound/ directory, sndPlaySoundA). N/A
- `FUN_0046e287` (0x0046E287, 109B) — Timed delay loop (process messages while waiting, animation timing). N/A
- `FUN_0046e2f4` (0x0046E2F4, 44B) — Resume music playback. N/A
- `FUN_0046e320` (0x0046E320, 388B) — Select random music track (CD audio); calls FUN_005ddbc7 to play. N/A
- `FUN_0046e4a9` (0x0046E4A9, 190B) — CD audio status check + play state update. N/A
- `FUN_0046e571` (0x0046E571, 312B) — Play specific music track (CD audio); stop current if different. N/A
- `FUN_0046e6a9` (0x0046E6A9, 31B) — Stop music playback. N/A
- `FUN_0046e6c8` (0x0046E6C8, 85B) — Music state machine: if stopped, start random; if playing, keep playing. N/A
- `FID_conflict:_$E31` (0x0046E9D0, 26B) — VS98 library init: calls FUN_0046e9ea + FUN_0046ea04. N/A
- `FUN_0046e9ea` (0x0046E9EA, 26B) — Calls FUN_005c64da (static init). N/A

### Art/Video Loading (3 functions)
- `FUN_0046ea04` (0x0046EA04, 29B) — Register atexit handler (FUN_0046ea21). N/A
- `FUN_0046ea21` (0x0046EA21, 26B) — atexit destructor: calls FUN_005c656b. N/A
- `load_civ2_art_0046da40` (0x0046DA40, 851B) — Load civ2art.dll and play opening.avi video. N/A

## GL — Game Logic (19 functions)

### GL.1: Treaty Flag Operations (2 functions)

- `FUN_00467750` (0x00467750, 213B) — **clearTreatyFlag**: Clear flag bits from civ pair (symmetric, cascade-aware).
  - **JS**: `clearTreatyFlag()` in `engine/diplomacy.js`
  - **Binary cascade**:
    - Clearing PEACE (0x04) also clears ALLIANCE (0x08)
    - Clearing WAR (0x2000) also clears 0x1800 (WAR_STARTED 0x800 + CAPTURE_VENDETTA 0x1000)
    - Clearing CONTACT (0x01) also clears WAR (0x2000)
  - **JS cascade**:
    - Clearing PEACE also clears ALLIANCE — **MATCH**
    - Clearing WAR also clears WAR_STARTED + CAPTURE_VENDETTA — **MATCH**
    - Clearing CONTACT clears everything (all flags to 0) — **differs but equivalent or stricter**
  - **Verdict**: MATCH (JS is slightly stricter on CONTACT clear — resets all flags, binary recursively clears WAR then does `&= ~CONTACT`; net effect is the same since CONTACT=0x01 implies all other flags are meaningless).

- `FUN_00467825` (0x00467825, 223B) — **addTreatyFlag**: Set flag bits for civ pair (symmetric, cascade-aware).
  - **JS**: `addTreatyFlag()` in `engine/diplomacy.js`
  - **Binary cascade**:
    - Setting ALLIANCE (0x08) also sets PEACE (0x04)
    - Setting any of CEASEFIRE|PEACE|ALLIANCE (0x0e) clears 0x2a60 = WAR(0x2000) + WAR_STARTED(0x800) + 0x200 + HOSTILITY(0x40) + INTRUDER(0x20)
    - Setting WAR (0x2000) clears CEASEFIRE|PEACE|ALLIANCE (0x0e) and adds WAR_TRACKING (0x200000)
  - **JS cascade**:
    - Setting ALLIANCE also sets PEACE + CONTACT — PEACE matches, CONTACT is extra (harmless)
    - Setting CEASEFIRE/PEACE clears `PEACE_CLEARS = WAR(0x2000) | WAR_STARTED(0x800) | CAPTURE_VENDETTA(0x1000) | HOSTILITY(0x40)` = 0x3840
    - Setting WAR clears CEASEFIRE|PEACE|ALLIANCE, adds WAR_TRACKING — **MATCH**
  - **DISCREPANCY**: When setting CEASEFIRE/PEACE/ALLIANCE, the cleared flags differ:
    - Binary clears 0x2a60 = bits {5,6,9,11,13} = INTRUDER(0x20) + HOSTILITY(0x40) + bit9(0x200) + WAR_STARTED(0x800) + WAR(0x2000)
    - JS clears 0x3840 = bits {6,11,12,13} = HOSTILITY(0x40) + WAR_STARTED(0x800) + CAPTURE_VENDETTA(0x1000) + WAR(0x2000)
    - JS misses: INTRUDER(0x20) and bit9(0x200)
    - JS extra: CAPTURE_VENDETTA(0x1000)
  - **Impact**: Minor. INTRUDER flag (shared intel) and bit9 should be cleared on peace; CAPTURE_VENDETTA clearing is premature but harmless.

### GL.2: Diplomacy Utility Functions (5 functions)

- `FUN_00467580` (0x00467580, 29B) — **setDisplayGold**: Write a gold amount to a display array `DAT_0063cc30[param_1*4]`. UI helper for showing gold in diplomacy dialogs. No JS equivalent needed (client-side rendering handles this). N/A

- `FUN_00467904` (0x00467904, 47B) — **getAttitude**: Read raw attitude score `DAT_0064c6e0[param_1 * 0x594 + param_2]` — civ param_1's attitude toward civ param_2.
  - **JS**: `state.civs[civSlot].attitudes[targetCiv]` in `engine/diplomacy.js`
  - **Verdict**: MATCH (direct data access)

- `FUN_00467933` (0x00467933, 120B) — **setAttitude**: Write a clamped attitude score. Clamps value to [0, 100] via FUN_005adfa0. Skips write if multiplayer mode byte is 1 AND the civ is human AND not the local player.
  - **JS**: `adjustAttitude()` in `engine/diplomacy.js` clamps to [-100, 100]
  - **DISCREPANCY**: Binary clamps to [0, 100], JS clamps to [-100, 100]. The binary's minimum attitude is 0, not -100. This means JS allows negative attitudes that the binary never does.
  - **Impact**: Moderate. Any logic checking `attitude < 0` would behave differently. In the binary, "enraged" is attitude 0-0 (level 0), not negative.

- `FUN_004679ab` (0x004679AB, 178B) — **getAttitudeLevel**: Convert raw attitude score to discrete level 0-8.
  - **JS**: `getAttitudeLevel()` in `engine/diplomacy.js`
  - **Binary thresholds**: <0→0, <11→1, <26→2, <39→3, <62→4, <75→5, <90→6, <100→7, >=100→8
  - **JS thresholds**: <0→0, <=10→1, <=25→2, <=38→3, <=61→4, <=74→5, <=89→6, <=99→7, >=100→8
  - **Verdict**: MATCH (< 11 is equivalent to <= 10, etc.)

- `FUN_00467a5d` (0x00467A5D, 41B) — **getAttitudeLevelByPair**: Wrapper that calls getAttitude then getAttitudeLevel. No separate JS function needed; JS callers compose these directly. N/A

### GL.3: Attitude Check Functions (2 functions)

- `FUN_00467a86` (0x00467A86, 53B) — **isHostile**: Returns true if attitude level < 4 (Neutral threshold).
  - **JS**: `isHostile(level)` in `engine/diplomacy.js`
  - **Verdict**: MATCH

- `FUN_00467abb` (0x00467ABB, 53B) — **isFriendly**: Returns true if attitude level > 4.
  - **JS**: `isFriendly(level)` in `engine/diplomacy.js`
  - **Verdict**: MATCH

### GL.4: War Provocation Check (1 function)

- `FUN_00467af0` (0x00467AF0, 191B) — **shouldProvoke**: Returns true if civ should consider provoking (war-readiness check).
  - Logic: If ceasefire active (bit 0x20 of upper byte) → true. If alliance (bit 0x08) → false. If only contact (flags & 5 == 1, i.e. CONTACT without PEACE) and attitude > 49 (0x31) → true. Otherwise false.
  - **JS**: No direct equivalent function. The JS diplomacy AI doesn't implement this specific provocation decision tree.
  - **Impact**: AI behavior difference — the binary has a specific threshold (attitude > 49) for provocation when in contact-only status. Not critical since this is an AI decision helper, not core game logic.

### GL.5: Alliance War Cascade — Withdraw Units (1 function)

- `FUN_00467baf` (0x00467BAF, 835B) — **withdrawUnitsOnAllianceBreak**: When an alliance breaks, units of civ param_1 that are in cities owned by param_2 get relocated to the nearest friendly city.
  - Iterates all units, checks if unit belongs to param_1 and is in a city belonging to param_2. Finds nearest city that can accept the unit and teleports it there.
  - **JS**: `wakeUnitsNearEnemy()` in `engine/diplomacy.js` wakes up sleeping units near enemy territory but does NOT relocate units from inside allied cities.
  - **DISCREPANCY**: Binary physically relocates units out of allied cities on alliance break. JS only wakes units. Units left inside former ally's cities would be stranded in enemy territory.
  - **Impact**: Moderate. After alliance breaks, units inside former ally's cities should be expelled/relocated, not just woken up.

### GL.6: Alliance Break Notification (1 function)

- `FUN_00467ef2` (0x00467EF2, 632B) — **breakAlliance**: Full alliance break handler. Calls clearTreatyFlag to remove ALLIANCE (0x08), calls withdrawUnitsOnAllianceBreak for both sides, updates visibility, shows notification dialog.
  - **JS**: `diplo_declare_war()` in `engine/diplomacy.js` handles war declaration which also breaks alliances, but does not have the specific unit withdrawal step.
  - **Verdict**: Partially matched; the unit withdrawal discrepancy is covered in GL.5 above.

### GL.7: Treaty Evaluation Helpers (2 functions)

- `FUN_0046d980` (0x0046D980, 148B) — **showDiplomacyPopup**: Display a text popup with a specific label from LABELS.TXT. Purely UI. N/A

- `FUN_0046e8f0` (0x0046E8F0, 173B) — **hexStringToInt**: Parse a hex string (e.g., "FF") to integer. Utility for parsing palette/color data. N/A (rendering utility)

### GL.8: Resource Loading (5 functions)

- `FUN_0046a740` (0x0046A740, 77B) — **unloadLabels**: Free LABELS.TXT memory + reset globals. N/A (resource management)
- `load_labels_txt` (0x0046A78D, 589B) — **loadLabels**: Load LABELS.TXT string table into memory array at DAT_00628420. Handles both base and scenario label files. N/A (resource loading)
- `FUN_0046aaa0` (0x0046AAA0, 28B) — Memory free wrapper (FUN_005dce96). N/A
- `FUN_0046aad0` (0x0046AAD0, 28B) — Memory lock wrapper (FUN_005dcdf9). N/A
- `FUN_0046ab00` (0x0046AB00, 28B) — Memory unlock wrapper (FUN_005dce29). N/A

## NET — Networking (4 functions)

- `FUN_0046af70` (0x0046AF70, 305B) — **sendToConnection**: Send multiplayer message to specific player via XD_SendSecureData. N/A (binary network protocol, project uses WebSocket)
- `FUN_0046b0a1` (0x0046B0A1, 124B) — **sendBroadcast**: Send multiplayer message to all players via XD_SendBroadcastData. N/A
- `FUN_0046b11d` (0x0046B11D, 48B) — **sendSimpleMessage**: Wrapper to send a simple message type with text. N/A
- `FUN_0046b14d` (0x0046B14D, 6649B) — **sendNetworkMessage**: Giant switch on message type (0x01-0xa8). Marshals game state into network packets (units, cities, map, diplomacy, tech, combat results, etc.). Covers ~170 message types. N/A (binary network protocol)

## NET — Network Message Builders (14 functions)

- `FUN_0046d5a0` (0x0046D5A0, 55B) — Init message header (magic 0x66606660, type, size=16). N/A
- `FUN_0046d5f0` (0x0046D5F0, 141B) — Build "login" message (type, player name, host name). N/A
- `FUN_0046d6a0` (0x0046D6A0, 94B) — Build basic message with host name field. N/A
- `FUN_0046d720` (0x0046D720, 65B) — Build "session info" message (type 2, save state copy). N/A
- `FUN_0046d780` (0x0046D780, 169B) — Build "join" message (type 0x2f, player info + path). N/A
- `FUN_0046d860` (0x0046D860, 45B) — Build "map data" message (type 4, size 0x280). N/A
- `FUN_0046d8a0` (0x0046D8A0, 45B) — Build "player info" message (type 6, size 0x21c). N/A
- `FUN_0046d8e0` (0x0046D8E0, 60B) — Build "save state" message (type 0x13, size 0x134). N/A
- `FUN_0046d930` (0x0046D930, 56B) — Build "action" message (type 0x69, param + size 0x14). N/A
- `FUN_0046dde0` (0x0046DDE0, 69B) — Video frame callback: invalidate cache + play sound 0x6b. N/A
- `FUN_0046de25` (0x0046DE25, 119B) — Display mode change callback (resolution 0xcf-0xd2). N/A
- `FUN_0046dea1` (0x0046DEA1, 43B) — Video paint callback: invalidate object cache. N/A
- `EnableStackedTabs` (0x0046DFF0, 36B) — CPropertySheet::EnableStackedTabs library function. N/A
- `FUN_0046f440` (0x0046F440, 25B) — Identity accessor (return ECX). N/A

## GFX — Graphics/Palette (9 functions)

- `handle_palette` (0x0046EA3B, 970B) — Load and apply 32-color palette (CreatePalette, GetNearestPaletteIndex). N/A
- `FUN_0046ee1e` (0x0046EE1E, 48B) — Free palette memory. N/A
- `FUN_0046ee4e` (0x0046EE4E, 241B) — Apply palette to all player color surfaces + system surfaces. N/A
- `FUN_0046ef3f` (0x0046EF3F, 151B) — Refresh all player color sprites. N/A
- `FUN_0046efd6` (0x0046EFD6, 153B) — Fade-out transition (palette interpolation, 10 steps). N/A
- `FUN_0046f06f` (0x0046F06F, 153B) — Fade-in transition (palette interpolation, 10 steps). N/A
- `FUN_0046f108` (0x0046F108, 135B) — Reset palette to identity mapping (set all flags to 4). N/A
- `FUN_0046f18f` (0x0046F18F, 151B) — Refresh all player color palettes + system surfaces. N/A
- `load_bitmap` (0x0046F460, 1929B) — Load 640x480x256-color BMP file (uncompressed + RLE1). N/A
- `write_bitmap_data` (0x0046FBF3, 1027B) — Write 640x480x256-color BMP file. N/A

---

## Classification Summary

| Category | Count |
|----------|-------|
| FW (Framework) | 27 |
| UI (Win32/MFC) | 33 |
| GL (Game Logic) | 19 |
| NET (Networking) | 18 |
| GFX (Graphics) | 10 |
| **Total** | **107** |

---

## Discrepancies Found: 4

### D-0046-1: addTreatyFlag cascade clears wrong bits on peace/ceasefire
- **Function**: FUN_00467825 (addTreatyFlag, 223B)
- **Binary**: When setting CEASEFIRE/PEACE/ALLIANCE (any of 0x0e), clears 0x2a60 = INTRUDER(0x20) + HOSTILITY(0x40) + bit9(0x200) + WAR_STARTED(0x800) + WAR(0x2000)
- **JS**: Clears `PEACE_CLEARS = 0x3840` = HOSTILITY(0x40) + WAR_STARTED(0x800) + CAPTURE_VENDETTA(0x1000) + WAR(0x2000)
- **Difference**:
  - JS misses: INTRUDER(0x20), bit9(0x200) — these should be cleared on peace
  - JS extra: CAPTURE_VENDETTA(0x1000) — binary does NOT clear this on peace
- **File**: `engine/diplomacy.js` line ~148 (`const PEACE_CLEARS`)
- **Impact**: Minor. INTRUDER flag remaining set after peace could cause minor AI behavior differences. Bit 0x200 purpose is unclear.
- **Fix**: Change `PEACE_CLEARS` to `TF.WAR | TF.WAR_STARTED | TF.HOSTILITY | TF.INTRUDER | 0x200` (= 0x2a60), removing CAPTURE_VENDETTA from the mask.

### D-0046-2: Attitude clamped to [-100, 100] instead of [0, 100]
- **Function**: FUN_00467933 (setAttitude, 120B)
- **Binary**: Attitude values are clamped to [0, 100] via FUN_005adfa0 (clamp function). The minimum possible attitude is 0.
- **JS**: `adjustAttitude()` in `engine/diplomacy.js` clamps to [-100, 100], allowing negative attitudes.
- **File**: `engine/diplomacy.js` line ~335
- **Impact**: Moderate. If any code path produces a negative attitude delta that would push below 0, the JS allows attitude < 0 while the binary would clamp at 0. The `getAttitudeLevel()` function handles negative values (returns level 0 for < 0), so the behavioral impact is limited to exact attitude comparisons, not level-based checks.
- **Fix**: Change `Math.max(-100, ...)` to `Math.max(0, ...)` in `adjustAttitude()`.

### D-0046-3: Alliance break does not relocate units from former ally's cities
- **Function**: FUN_00467baf (withdrawUnitsOnAllianceBreak, 835B)
- **Binary**: When an alliance breaks, the binary iterates all units belonging to civ A. For each unit located in a city belonging to civ B, it finds the nearest friendly city that can accept the unit and teleports it there. This prevents units from being stranded inside enemy cities after alliance dissolution.
- **JS**: `wakeUnitsNearEnemy()` in `engine/diplomacy.js` only wakes sleeping units near enemy territory. It does NOT relocate units that are physically inside former ally's cities.
- **File**: `engine/diplomacy.js`
- **Impact**: Moderate. After an alliance breaks, units inside the former ally's cities should be ejected/relocated. Without this, units remain in enemy territory, which could lead to impossible game states (enemy units garrisoning your city, or your units trapped in hostile cities).
- **Fix**: Add a `relocateUnitsOnAllianceBreak(state, civA, civB)` function that iterates units of civA in cities owned by civB and moves them to the nearest friendly city.

### D-0046-4: provocation threshold function not implemented
- **Function**: FUN_00467af0 (shouldProvoke, 191B)
- **Binary**: Returns true if: (1) ceasefire is expiring (bit 0x20 in upper byte), or (2) no alliance AND only contact status (flags & 5 == 1) AND attitude > 49. This is used by the AI to decide whether to provoke a war.
- **JS**: No equivalent function exists. AI diplomacy decisions in `ai/diplomai.js` use different logic.
- **File**: N/A (missing implementation)
- **Impact**: Low. This is an AI decision helper, not core game state logic. The AI's war-readiness calculations may produce different results, but this is expected given the JS AI is not a 1:1 port.
- **Fix**: Enhancement-tier — implement `shouldProvoke()` if AI diplomacy fidelity is a goal.
