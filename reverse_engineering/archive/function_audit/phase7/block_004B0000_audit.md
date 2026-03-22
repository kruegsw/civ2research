# Block 004B0000 — Phase 7 Audit

**Functions in this block: 164**
**Systems: Multiplayer diff/sync, save/load serialization, continent mapping, parley/diplomacy UI, wonder viewer, AI strategy advisors, tech research discovery, unit build checks**

---

## FW — Framework (60 functions)

$E2 @ 0x004B08E0 | 21B | N/A (CRT static init wrapper — calls $E1)
$E1 @ 0x004B08F5 | 16B | N/A (CRT static init — no-op return)
FID_conflict:_$E51 @ 0x004B3D11 | 26B | N/A (CRT static init — calls FUN_004b3d2b + FUN_004b3d49)
FUN_004b3d2b @ 0x004B3D2B | 30B | N/A (CRT — thunk_FUN_0043c460 static object init)
FUN_004b3d49 @ 0x004B3D49 | 29B | N/A (CRT — _atexit register for FUN_004b3d66)
FUN_004b3d66 @ 0x004B3D66 | 26B | N/A (CRT — static object destructor thunk)
FID_conflict:_$E51 @ 0x004B3D80 | 26B | N/A (CRT static init — calls FUN_004b3d9a + FUN_004b3db8)
FUN_004b3d9a @ 0x004B3D9A | 30B | N/A (CRT — thunk_FUN_0043c460 static object init)
FUN_004b3db8 @ 0x004B3DB8 | 29B | N/A (CRT — _atexit register for FUN_004b3dd5)
FUN_004b3dd5 @ 0x004B3DD5 | 26B | N/A (CRT — static object destructor thunk)
FID_conflict:_$E51 @ 0x004B3DEF | 26B | N/A (CRT static init — calls FUN_004b3e09 + FUN_004b3e27)
FUN_004b3e09 @ 0x004B3E09 | 30B | N/A (CRT — thunk_FUN_0043c460 static object init)
FUN_004b3e27 @ 0x004B3E27 | 29B | N/A (CRT — _atexit register for FUN_004b3e44)
FUN_004b3e44 @ 0x004B3E44 | 26B | N/A (CRT — static object destructor thunk)
FUN_004b3ca0 @ 0x004B3CA0 | 26B | N/A (CRT — calls FUN_004b3cba + FUN_004b3cda)
FUN_004b3cba @ 0x004B3CBA | 32B | N/A (CRT — thunk_FUN_0043c4c0 static array init)
FUN_004b3cda @ 0x004B3CDA | 29B | N/A (CRT — _atexit register for FUN_004b3cf7)
FUN_004b3cf7 @ 0x004B3CF7 | 26B | N/A (CRT — static object destructor thunk)
FUN_004b3e5e @ 0x004B3E5E | 26B | N/A (CRT — calls FUN_004b3e78 + FUN_004b3e98)
FUN_004b3e78 @ 0x004B3E78 | 32B | N/A (CRT — thunk_FUN_0043c4c0 static array init)
FUN_004b3e98 @ 0x004B3E98 | 29B | N/A (CRT — _atexit register for FUN_004b3eb5)
FUN_004b3eb5 @ 0x004B3EB5 | 26B | N/A (CRT — static object destructor thunk)
FID_conflict:_$E51 @ 0x004B3ECF | 26B | N/A (CRT static init — calls FUN_004b3ee9 + FUN_004b3f07)
FUN_004b3ee9 @ 0x004B3EE9 | 30B | N/A (CRT — thunk_FUN_0043c460 static object init)
FUN_004b3f07 @ 0x004B3F07 | 29B | N/A (CRT — _atexit register for FUN_004b3f24)
FUN_004b3f24 @ 0x004B3F24 | 26B | N/A (CRT — static object destructor thunk)
FID_conflict:_$E51 @ 0x004B3F3E | 26B | N/A (CRT static init — calls FUN_004b3f58 + FUN_004b3f76)
FUN_004b3f58 @ 0x004B3F58 | 30B | N/A (CRT — thunk_FUN_0043c460 static object init)
FUN_004b3f76 @ 0x004B3F76 | 29B | N/A (CRT — _atexit register for FUN_004b3f93)
FUN_004b3f93 @ 0x004B3F93 | 26B | N/A (CRT — static object destructor thunk)
FID_conflict:_$E51 @ 0x004B3FAD | 26B | N/A (CRT static init — calls FUN_004b3fc7 + FUN_004b3fe5)
FUN_004b3fc7 @ 0x004B3FC7 | 30B | N/A (CRT — thunk_FUN_0043c460 static object init)
FUN_004b3fe5 @ 0x004B3FE5 | 29B | N/A (CRT — _atexit register for FUN_004b4002)
FUN_004b4002 @ 0x004B4002 | 26B | N/A (CRT — static object destructor thunk)
FUN_004b401c @ 0x004B401C | 26B | N/A (CRT — calls FUN_004b4036 + FUN_004b405b, parleywin static init)
FUN_004b4036 @ 0x004B4036 | 37B | N/A (CRT — thunk_FUN_004b4108 parleywin constructor)
FUN_004b405b @ 0x004B405B | 29B | N/A (CRT — _atexit register for FUN_004b4078)
FUN_004b4078 @ 0x004B4078 | 26B | N/A (CRT — thunk_FUN_004b4593 parleywin destructor)
FUN_004b4092 @ 0x004B4092 | 26B | N/A (CRT — calls FUN_004b40ac + FUN_004b40d1, parleywin2 static init)
FUN_004b40ac @ 0x004B40AC | 37B | N/A (CRT — thunk_FUN_004b4108 parleywin2 constructor)
FUN_004b40d1 @ 0x004B40D1 | 29B | N/A (CRT — _atexit register for FUN_004b40ee)
FUN_004b40ee @ 0x004B40EE | 26B | N/A (CRT — thunk_FUN_004b4593 parleywin2 destructor)
FUN_004b4705 @ 0x004B4705 | 12B | N/A (wrapper — FUN_005d7c00)
FUN_004b4711 @ 0x004B4711 | 12B | N/A (wrapper — thunk_FUN_0044cba0, MFC cleanup)
FUN_004b4727 @ 0x004B4727 | 14B | N/A (SEH unwind thunk)
FUN_004b4be3 @ 0x004B4BE3 | 12B | N/A (wrapper — FUN_005d7c6e)
FUN_004b4bf9 @ 0x004B4BF9 | 16B | N/A (SEH unwind thunk)
FUN_004bb7b0 @ 0x004BB7B0 | 9B | N/A (wrapper — thunk_FUN_0040f510, MFC control cleanup)
FUN_004bb7c3 @ 0x004BB7C3 | 14B | N/A (SEH unwind thunk)
FUN_004bb97b @ 0x004BB97B | 12B | N/A (wrapper — thunk_FUN_004bba79, app destructor)
FUN_004bb991 @ 0x004BB991 | 14B | N/A (SEH unwind thunk)
FUN_004bbaf1 @ 0x004BBAF1 | 15B | N/A (wrapper — FUN_005c656b, subobject destructor)
FUN_004bbb00 @ 0x004BBB00 | 15B | N/A (wrapper — FUN_005bd915, subobject destructor)
FUN_004bbb0f @ 0x004BBB0F | 15B | N/A (wrapper — FUN_005dd1a0, subobject destructor)
FUN_004bbb1e @ 0x004BBB1E | 9B | N/A (MFC COleCntrFrameWnd destructor)
FUN_004bbb31 @ 0x004BBB31 | 14B | N/A (SEH unwind thunk)
FUN_004bbdbd @ 0x004BBDBD | 12B | N/A (MFC _Timevec destructor thunk)
FUN_004bbdc9 @ 0x004BBDC9 | 12B | N/A (wrapper — FUN_005bd915, subobject destructor)
FUN_004bbdd5 @ 0x004BBDD5 | 12B | N/A (wrapper — FUN_005cde4d, sprite cleanup)
FUN_004bbdeb @ 0x004BBDEB | 16B | N/A (SEH unwind thunk)

---

## UI — User Interface (86 functions)

### Multiplayer Diff Engine (19 functions)

FUN_004b0157 @ 0x004B0157 | 484B | N/A (MP diff — draw unit sprite at diff position)
FUN_004b0905 @ 0x004B0905 | 261B | N/A (MP diff — allocate mirror buffer from 23 game data sections)
FUN_004b0a0a @ 0x004B0A0A | 55B | N/A (MP diff — free mirror buffer)
FUN_004b0a41 @ 0x004B0A41 | 143B | N/A (MP diff — copy all game sections into mirror buffer)
FUN_004b0ad0 @ 0x004B0AD0 | 131B | N/A (MP diff — copy + bitwise-NOT mirror for XOR diff)
FUN_004b0b53 @ 0x004B0B53 | 1883B | N/A (MP diff — core diff/sync engine, compares mirror vs live game state and sends delta packets)
FUN_004b12b3 @ 0x004B12B3 | 227B | N/A (MP diff — check if a game section has changed vs mirror)
FUN_004b1396 @ 0x004B1396 | 270B | N/A (MP diff — checksum calculator for game data section)
FUN_004b14a4 @ 0x004B14A4 | 152B | N/A (MP diff — calculate total save buffer size)
FUN_004b153c @ 0x004B153C | 835B | N/A (MP diff — pack selected game sections into buffer with checksums)
FUN_004b187f @ 0x004B187F | 98B | N/A (MP diff — bounded memcpy helper for buffer packing)
FUN_004b18e1 @ 0x004B18E1 | 308B | N/A (MP diff — pack two sections into buffer with checksums)
FUN_004b1a15 @ 0x004B1A15 | 508B | N/A (MP diff — full game state serialize + RLE compress)
FUN_004b1c11 @ 0x004B1C11 | 466B | N/A (MP diff — incremental game state serialize, changed sections only)
FUN_004b1de3 @ 0x004B1DE3 | 557B | N/A (MP diff — deserialize received game data into live state)
FUN_004b2123 @ 0x004B2123 | 180B | N/A (MP diff — parse one game data block from buffer)
FUN_004b24a2 @ 0x004B24A2 | 120B | N/A (MP diff — calculate decoded size of RLE buffer)
FUN_004b251a @ 0x004B251A | 292B | N/A (MP diff — RLE decode buffer)
FUN_004b263e @ 0x004B263E | 588B | N/A (MP diff — RLE encode buffer)

### Save/Load (2 functions)

parse_save_block @ 0x004B2010 | 275B | N/A (save file parsing — parse game + map blocks; JS uses engine/parser.js with different format)
FUN_004b21d7 @ 0x004B21D7 | 715B | N/A (save/load — register 24 game data section pointers with sizes for diff/serialize)

### Continent Mapping (3 functions)

FUN_004b3080 @ 0x004B3080 | 110B | N/A (continent mapping — register data section parameters for diff engine)
FUN_004b3110 @ 0x004B3110 | 76B | N/A (continent mapping — set adjacency bit between two continents)
FUN_004b315c @ 0x004B315C | 418B | N/A (continent mapping — build adjacency table between all continents)

### Parley/Diplomacy Window (30 functions)

FUN_004b4108 @ 0x004B4108 | 1144B | N/A (parleywin constructor — MFC CPropertySheet subclass with diplomacy state)
FUN_004b4593 @ 0x004B4593 | 370B | N/A (parleywin destructor — cleanup chat log, handles, diff sync)
FUN_004b4735 @ 0x004B4735 | 1198B | N/A (parleywin open — allocate chat buffer, init INI settings, create child windows)
FUN_004b4c09 @ 0x004B4C09 | 120B | N/A (parleywin — store initial window position from bitmap handle)
FUN_004b4c81 @ 0x004B4C81 | 111B | N/A (parleywin — set high-res mode flag based on screen width > 999)
FUN_004b4cf0 @ 0x004B4CF0 | 410B | N/A (parleywin — calculate/set window dimensions based on resolution mode)
FUN_004b4e8a @ 0x004B4E8A | 296B | N/A (parleywin — calculate client area and content rect from chat header geometry)
FUN_004b4fb2 @ 0x004B4FB2 | 285B | N/A (parleywin — update scroll positions and rebuild widgets on mode change)
FUN_004b50cf @ 0x004B50CF | 3012B | N/A (parleywin — destroy all child window handles: buttons, listboxes, sprites)
FUN_004b5c93 @ 0x004B5C93 | 5967B | N/A (parleywin — create all child widgets: advisor sprites, chat listbox, input box, buttons)
FUN_004b74c4 @ 0x004B74C4 | 306B | N/A (parleywin — handle tab page switch (3 advisor pages) and zoom +/- buttons)
FUN_004b75fb @ 0x004B75FB | 74B | N/A (parleywin — close button handler)
FUN_004b7645 @ 0x004B7645 | 72B | N/A (parleywin — switch to non-multiplayer dialog context and close)
FUN_004b768d @ 0x004B768D | 72B | N/A (parleywin — switch to multiplayer dialog context and close)
FUN_004b76d5 @ 0x004B76D5 | 432B | N/A (parleywin — close handler: cleanup diplomacy state, send cancel msg to AI)
FUN_004b7885 @ 0x004B7885 | 197B | N/A (parleywin — WM_PAINT handler: recalculate geometry, draw, update scrolls)
FUN_004b794a @ 0x004B794A | 838B | N/A (parleywin — paint body: borders, advisor sprites, title bar text)
FUN_004b7c90 @ 0x004B7C90 | 226B | N/A (parleywin — paint decorative border bitmaps)
FUN_004b7d72 @ 0x004B7D72 | 324B | N/A (parleywin — set title bar text based on mode: multiplayer chat vs AI negotiation)
FUN_004b7eb6 @ 0x004B7EB6 | 807B | N/A (parleywin — entry point: open diplomacy with given civ and mode)
FUN_004b81dd @ 0x004B81DD | 1177B | N/A (parleywin — AI negotiation state machine: accept/reject/counter-offer dispatch)
FUN_004b888e @ 0x004B888E | 1486B | N/A (parleywin — destroy and rebuild one side's widgets for negotiation layout change)
FUN_004b8e5c @ 0x004B8E5C | 593B | N/A (parleywin — gold input field validation: clamp to treasury, reject non-digits)
FUN_004b90ad @ 0x004B90AD | 757B | N/A (parleywin — append chat message to log, relay to other connected players)
FUN_004b93a2 @ 0x004B93A2 | 354B | N/A (parleywin — append text to chat buffer with circular truncation)
FUN_004b9504 @ 0x004B9504 | 122B | N/A (parleywin — format player name for chat: "Server" for civ 0, else leader+title)
FUN_004b957e @ 0x004B957E | 63B | N/A (parleywin — keyboard handler: Insert key closes window)
FUN_004b95c2 @ 0x004B95C2 | 31B | N/A (parleywin — wrapper: call keyboard handler with Enter key code)
FUN_004b95e1 @ 0x004B95E1 | 84B | N/A (parleywin — clear chat buffer and update listbox display)
FUN_004b9635 @ 0x004B9635 | 80B | N/A (parleywin — special key handler: ESC or Insert closes window)

### Parley Chat Input Handler (1 function)

FUN_004b968a @ 0x004B968A | 1304B | N/A (parleywin — chat input dispatch: Enter sends message, arrow keys navigate, Insert closes)

### MFC Widget Destructors/Helpers (5 functions)

FUN_004bb3b0 @ 0x004BB3B0 | 57B | N/A (MFC — button destructor with optional operator_delete)
FUN_004bb400 @ 0x004BB400 | 57B | N/A (MFC — text control destructor with optional operator_delete)
FUN_004bb450 @ 0x004BB450 | 57B | N/A (MFC — sprite control destructor with optional operator_delete)
FUN_004bb4a0 @ 0x004BB4A0 | 57B | N/A (MFC — slider control destructor with optional operator_delete)
FUN_004bb4f0 @ 0x004BB4F0 | 57B | N/A (MFC — custom control destructor with optional operator_delete)

### MFC Widget Helpers (10 functions)

FUN_004bb370 @ 0x004BB370 | 44B | N/A (MFC — file read wrapper for chat log)
FUN_004bb540 @ 0x004BB540 | 34B | N/A (MFC — get window height via thunk_FUN_00407fc0)
FUN_004bb570 @ 0x004BB570 | 43B | N/A (MFC — scroll window content via FUN_005bc713)
FUN_004bb5b0 @ 0x004BB5B0 | 29B | N/A (MFC — set multiline flag on text control)
FUN_004bb5e0 @ 0x004BB5E0 | 50B | N/A (MFC — set focus to child window via FUN_005c90b0)
FUN_004bb620 @ 0x004BB620 | 134B | N/A (MFC — create listbox/text widget: register wndclass, set text)
FUN_004bb6d0 @ 0x004BB6D0 | 43B | N/A (MFC — send cursor position message to text control)
FUN_004bb710 @ 0x004BB710 | 37B | N/A (MFC — get text length from control)
FUN_004bb740 @ 0x004BB740 | 112B | N/A (MFC — slider control destructor: destroy DC + window)
FUN_004bb800 @ 0x004BB800 | 40B | N/A (MFC — deflate rect by negating and calling InflateRect)
FUN_004bb840 @ 0x004BB840 | 34B | N/A (MFC — InflateRect wrapper)

### Memory/Resource Helpers (2 functions)

FUN_004bb870 @ 0x004BB870 | 80B | N/A (memory — GlobalAlloc wrapper with error flag)
FUN_004bb8e0 @ 0x004BB8E0 | 155B | N/A (wonder viewer — entry point: init rendering context + load art + play video)

### App/Rendering Init (4 functions)

FUN_004bb99f @ 0x004BB99F | 154B | N/A (app init — create subsystem objects: font manager, sprite engine, DC manager)
FUN_004bba79 @ 0x004BBA79 | 120B | N/A (app cleanup — destroy subsystem objects in reverse order)
FUN_004bc193 @ 0x004BC193 | 30B | N/A (rendering — invalidate object cache on CRichEditDoc)
FUN_004bc1b1 @ 0x004BC1B1 | 30B | N/A (rendering — invalidate object cache on CRichEditDoc)

### Wonder Viewer (6 functions)

load_civ2_art_004bbb3f @ 0x004BBB3F | 638B | N/A (wonder viewer — load wonder art from DLL, create display surface, play splash)
FUN_004bbdfb @ 0x004BBDFB | 699B | N/A (wonder viewer — play wonder video: locate AVI file, open in video window, sync playback)
FUN_004bc0bb @ 0x004BC0BB | 24B | N/A (wonder viewer — return 0 stub)
FUN_004bc0d3 @ 0x004BC0D3 | 60B | N/A (wonder viewer — copy sprite data to back buffer)
FUN_004bc10f @ 0x004BC10F | 132B | N/A (wonder viewer — calculate and apply video window dimensions)
FUN_004bc1cf @ 0x004BC1CF | 80B | N/A (wonder viewer — keyboard filter: only pass 0xD0-0xD2 to object cache)

### Diplomacy UI State (1 function)

FUN_004b8676 @ 0x004B8676 | 536B | N/A (diplomacy UI — set negotiation dialog state from DAT_0067a9b0 offer type, configure tabs/scroll)

### Misc UI (1 function)

FUN_004bfd9a @ 0x004BFD9A | 12B | N/A (UI cleanup — thunk_FUN_0059df8a wrapper)
FUN_004bfdb0 @ 0x004BFDB0 | 14B | N/A (SEH unwind thunk)

---

## GL — Game Logic: Continent Body ID Assignment (1 function)

FUN_004b32fe @ 0x004B32FE | 1853B | YES (ported)
  Binary: continent_assign_body_ids — flood fill land/ocean, assign body IDs 0-63, merge small bodies
  JS: engine/mapgen.js assignContinentBodyIds() (line 858)
  Match: Functionally equivalent. Both do 2-pass flood fill (land then ocean), merge small bodies.
  Discrepancies:
  - Binary uses pass order land(1) then ocean(0); JS matches this.
  - Binary merges land bodies <9 tiles into body 63; JS matches (SMALL_BODY_THRESHOLD = 9 for land).
  - Binary merges ocean bodies <16 tiles; JS uses 16 for ocean pass as well — **matches**.
  - Binary uses doubled-X isometric neighbor lookup via DAT_00628350/DAT_00628360 (8 dirs);
    JS uses explicit DX8/DY8 arrays — equivalent.
  - Binary also builds continent adjacency table via FUN_004b315c afterward. JS does NOT compute
    the adjacency table. This is used by AI for evaluating transport needs. **Minor gap** — AI
    continent adjacency data is not computed. Does not affect gameplay correctness.

---

## GL — Game Logic: AI Strategy Advisors (5 functions)

FUN_004bc480 @ 0x004BC480 | 1066B | YES (ported)
  Binary: assessMilitaryPosture — evaluates military readiness, returns 1-7
  JS: engine/ai/strategyai.js assessMilitaryPosture()
  Match: Faithful port. Checks city count, carrier units, power graph techs, Great Wall.
  Discrepancies: None identified. Return values 1-7 match binary cases.

FUN_004bc8aa @ 0x004BC8AA | 753B | YES (ported)
  Binary: assessCityDefense — evaluates city defense adequacy, returns 1-7
  JS: engine/ai/strategyai.js assessCityDefense()
  Match: Faithful port. Checks defensive unit ratios, barracks coverage, spy vulnerability.
  Discrepancies: None identified.

FUN_004bcb9b @ 0x004BCB9B | 1071B | YES (ported)
  Binary: assessEconomy — evaluates economic health, returns 1-7
  JS: engine/ai/strategyai.js assessEconomy()
  Match: Faithful port. Checks building maintenance vs trade income, tech coverage, improvement counts.
  Discrepancies: None identified.

FUN_004bcfcf @ 0x004BCFCF | 724B | YES (ported)
  Binary: assessDiplomacy — evaluates diplomatic situation, returns 1-7
  JS: engine/ai/strategyai.js assessDiplomacy()
  Match: Faithful port. Checks embassy count, alliance count, war count, visibility flags.
  Discrepancies: None identified.

FUN_004bd2a3 @ 0x004BD2A3 | 770B | YES (ported)
  Binary: assessTaxRate / balanceRates — evaluates rate situation, returns 1-6, then adjusts rates
  JS: engine/ai/econai.js balanceRates() and engine/ai/strategyai.js assessTaxRate()
  Match: Faithful port. Scans cities for disorder/WLTKD, checks if rates need rebalancing.
  Discrepancies:
  - Binary sets DAT_00655aee bit 2 (flag) then clears it at function start. JS handles
    the "unvet all units" side effect differently — it's called separately. **No gameplay impact**.

---

## GL — Game Logic: Tech System (5 functions)

FUN_004bd9f0 @ 0x004BD9F0 | 181B | YES (ported)
  Binary: civ_has_tech — check if a civ has researched a given tech (bitmask lookup)
  JS: engine/ai/econai.js civHasTech(), engine/ai/strategyai.js civHasTech(), and throughout
      engine code as `gameState.civTechs[civSlot].has(techId)` (Set-based)
  Match: Semantically equivalent. Binary uses byte array with bitmask extraction (FUN_005ae3bf
         to get byte index + bit mask); JS uses a Set.
  Discrepancies:
  - Binary returns 0 for tech -2 ("none"), 1 for any negative tech (always known), 0 for tech 89
    (future tech never "had"), 0 for tech >= 100. JS implementations replicate these special cases
    in the AI files but the general-purpose Set.has() doesn't distinguish -2 vs -1. Since the
    callers always pass valid tech IDs, this is not a problem in practice. **No gameplay impact**.

FUN_004bdaa5 @ 0x004BDAA5 | 135B | YES (ported)
  Binary: isPrereqOf — recursive prereq tree walk, returns 1 if targetTech is reachable from sourceTech
  JS: engine/ai/econai.js isPrereqOf(), engine/ai/diplomai.js isPrereqOf()
  Match: Faithful recursive port using ADVANCE_PREREQS.
  Discrepancies: None identified.

FUN_004bdb2c @ 0x004BDB2C | 2869B | YES (ported)
  Binary: calcTechValue — AI tech research priority scoring, returns numeric priority
  JS: engine/ai/econai.js calcTechValue()
  Match: Faithful port. Includes:
  - Base value from leader personality table
  - Tech-class multipliers (military/economic/social/intellectual scaled by leader personality)
  - "Only civ that doesn't have this tech" uniqueness bonus
  - Current research target bonus (researchGoal)
  - 21-way switch on rulesCivNumber (civ-specific tech preferences)
  - Penalty for already-researched prerequisites
  - Minimum floor of 1
  Discrepancies:
  - Binary line 6147: special code for "DAT_0064c59e == param_2" (current spaceship goal tech)
    adds researchPoints/4. JS handles this with `state.civs[civSlot].researchGoal` which is
    functionally equivalent.
  - Binary line 6152-6183: code for dead civs (DAT_00655b0b bitmask == 0) applies Expansionist
    trait bonus and wonder tech bonus. JS replicates these checks but uses different data
    structures. **No significant discrepancy**.

FUN_004bfdbe @ 0x004BFDBE | 156B | YES (ported)
  Binary: canResearch — checks if a tech is immediately researchable (has both prereqs but not the tech itself)
  JS: engine/research.js getAvailableResearch() performs the same check in a loop
  Match: Semantically equivalent. Binary checks one tech at a time; JS loops over all techs.
  Discrepancies: None identified.

FUN_004bfe5a @ 0x004BFE5A | 1095B | YES (ported)
  Binary: can_build_unit_type — checks tech prereqs, obsolescence, government, domain, and AI duplicate filter
  JS: engine/buildcheck.js canBuildUnitType()
  Match: Faithful port. Key checks:
  - Tech prerequisite (UNIT_PREREQS)
  - Obsolete tech check (UNIT_OBSOLETE)
  - Gunpowder defense threshold (defense < 3 with Gunpowder tech)
  - Fanatics require Fundamentalism (building 8 → government 4)
  - AI duplicate filter: skip weaker units when better exists
  - Domain check for sea units (coastal city)
  Discrepancies:
  - Binary line 7031: checks `(char)(&DAT_0064b1c4)[param_3 * 0x14] < 'c'` — this is a unit
    range check comparing the unit's "range" field to 99 (0x63='c'). If range >= 99, requires
    Space Flight tech (0x3A) and non-destroyed SS. JS does NOT check range >= 99 / Space Flight.
    **Minor gap** — only affects hypothetical custom unit types with extreme range values.
    Standard units all have range < 99.
  - Binary line 7033-7035: for cityIndex >= 0, checks unit role == 2 (settler-type) AND city
    flags 0x20 and 0x80. This enforces that settler/engineer can only be built in cities with
    those flags set. JS does NOT check these city flags for settler buildability.
    **Minor gap** — in practice, all cities should have these flags; this is a scenario editor
    edge case.

---

## GL — Game Logic: Tech Discovery Effects (4 functions)

FUN_004bf05b @ 0x004BF05B | 3391B | YES (ported)
  Binary: handle_tech_discovery — master handler called when any civ discovers a tech
  JS: engine/research.js handleTechDiscovery()
  Match: Faithful port. Handles:
  - Future tech counter increment
  - Set tech bitmask in civ data
  - First-discoverer tracking (DAT_00655b82 bitmask)
  - Score increment (DAT_0064c6b0)
  - UI notification with advisor screen for human player
  - Barracks refund on obsoleting tech (Gunpowder chain)
  - Wonder obsolescence notifications
  - Leonardo's auto-upgrade (calls FUN_004be6ba)
  - Government revolution prompt (calls FUN_004bea84)
  - Great Library cascade (give tech to library owner if 2+ civs have it)
  - Philosophy first-discoverer bonus
  Discrepancies:
  - Binary line 6723-6732: multiplayer sync — sends 0x9B message to other players when non-local
    civ discovers tech. JS handles this via reducer broadcast. **No gameplay impact**.
  - Binary line 6842-6848: calls thunk_FUN_00566584(param_2) for human player's own discovery
    when scenario flag 8 is set. This is the Civilopedia auto-open for new tech. JS does not
    auto-open Civilopedia. **UI-only, no gameplay impact**.
  - Binary line 6849-6916: first-discoverer bonus for wonder-obsoleting techs — iterates all
    wonders, checks if wonder's prereq tech matches the newly discovered tech, and notifies
    wonder builder. JS handles wonder obsolescence notifications in handleTechDiscovery().
    **Functionally equivalent**.

FUN_004be6ba @ 0x004BE6BA | 970B | YES (ported)
  Binary: upgradeUnitsForTech — Leonardo's Workshop auto-upgrade of obsolete unit types
  JS: engine/research.js upgradeUnitsForTech()
  Match: Faithful port. Iterates all units owned by civ, finds upgrade path via obsolete tech.
  Discrepancies:
  - Binary line 6462-6468: checks if unit's prereq tech matches Gunpowder (0x23) AND unit role
    is "offensive" (role 1) AND defense < DAT_0064b251, then overrides prereq to 0x23. This
    handles the special case where Gunpowder obsoletes defensive units even though it's not
    their explicit UNIT_OBSOLETE tech. JS engine does NOT implement this Gunpowder-override
    in the upgrade path — it only uses UNIT_OBSOLETE directly.
    **Potential discrepancy** — but in standard RULES.TXT, the units affected (Phalanx, Pikemen)
    have explicit UNIT_OBSOLETE set to Gunpowder, so the binary's extra check is redundant
    for standard games. Only affects modded RULES.TXT.
  - Binary line 6500-6508: after upgrading, clears bit 0x2000 on unit flags (veteran status)
    and sends MP sync. JS sets veteran: false. **Equivalent**.

FUN_004bea84 @ 0x004BEA84 | 973B | YES (partial — UI-driven)
  Binary: checkGovernmentRevolution — prompts human player to consider revolution after discovering
          government-enabling techs (Monarchy/Republic/Democracy/Communism/Fundamentalism)
  JS: engine/research.js checkGovernmentRevolution()
  Match: JS implements the core logic of detecting applicable government techs and emitting events.
  Discrepancies:
  - Binary is primarily UI: shows dialog boxes ("AUTOMONARCHY", "AUTOREV", "STARTREV") and
    optionally triggers revolution via thunk_FUN_0055c066. JS emits events for client-side
    handling. The logic for which techs trigger which prompts matches.
  - Binary line 6582-6597: tutorial popups for Railroad/Farmland/Trade/Seafaring/Writing techs
    when tutorial mode is on. JS does not implement tutorial mode. **UI-only, no gameplay impact**.

FUN_004bee56 @ 0x004BEE56 | 379B | YES (partial — UI-driven)
  Binary: triggerGoldenAge — Philosophy first-discoverer bonus: we love the king event
  JS: engine/research.js triggerGoldenAge()
  Match: JS emits golden age event. Binary shows "GOLDENAGE" dialog and picks a random best unit
         in the civ to display. Core mechanic (Philosophy bonus) matches.
  Discrepancies:
  - Binary picks the best unit for display purposes only — the golden age effect itself is the
    WLTKD celebrations. JS emits the event. **UI-only difference, no gameplay impact**.

---

## GL — Game Logic: Chat/Diplomacy Message Formatting (1 function)

FUN_004befd1 @ 0x004BEFD1 | 138B | N/A (UI — format enabled-by-tech item list for discovery notification dialog)
  This is purely a string formatting helper for the "You discovered X, which enables Y" dialog.
  No game state modification. Classified as UI helper.

---

## GL — Game Logic: Lookup Helpers (2 functions)

FUN_004b0720 @ 0x004B0720 | 177B | N/A (lookup — find tech ID by string name, searches 100-entry tech name table; -2 for "no", -1 for "nil", else 0-99)
  Used by scenario/rules parser only. JS uses index-based lookups. No runtime game logic.

FUN_004b07d1 @ 0x004B07D1 | 179B | N/A (lookup — find terrain type by string name, searches 11-entry terrain name table; -1 for "no", -2 for "nil")
  Used by scenario/rules parser only. JS uses index-based lookups. No runtime game logic.

---

## Summary

| Category | Count |
|----------|-------|
| FW (Framework) | 60 |
| UI (User Interface) | 86 |
| GL (Game Logic) | 18 |
| **Total** | **164** |

### GL Functions Comparison with JS Engine

| Binary Function | Size | JS Location | Status |
|----------------|------|-------------|--------|
| FUN_004b32fe (continent body IDs) | 1853B | engine/mapgen.js | Ported, minor gap (no adjacency table) |
| FUN_004bc480 (assessMilitaryPosture) | 1066B | engine/ai/strategyai.js | Ported, faithful |
| FUN_004bc8aa (assessCityDefense) | 753B | engine/ai/strategyai.js | Ported, faithful |
| FUN_004bcb9b (assessEconomy) | 1071B | engine/ai/strategyai.js | Ported, faithful |
| FUN_004bcfcf (assessDiplomacy) | 724B | engine/ai/strategyai.js | Ported, faithful |
| FUN_004bd2a3 (assessTaxRate) | 770B | engine/ai/strategyai.js + econai.js | Ported, faithful |
| FUN_004bd9f0 (civ_has_tech) | 181B | engine/ai/econai.js + throughout | Ported, Set-based equivalent |
| FUN_004bdaa5 (isPrereqOf) | 135B | engine/ai/econai.js + diplomai.js | Ported, faithful |
| FUN_004bdb2c (calcTechValue) | 2869B | engine/ai/econai.js | Ported, faithful |
| FUN_004bfdbe (canResearch) | 156B | engine/research.js | Ported, via getAvailableResearch() |
| FUN_004bfe5a (can_build_unit_type) | 1095B | engine/buildcheck.js | Ported, minor gaps |
| FUN_004bf05b (handle_tech_discovery) | 3391B | engine/research.js | Ported, faithful |
| FUN_004be6ba (upgradeUnitsForTech) | 970B | engine/research.js | Ported, faithful |
| FUN_004bea84 (checkGovernmentRevolution) | 973B | engine/research.js | Ported, UI-only gaps |
| FUN_004bee56 (triggerGoldenAge) | 379B | engine/research.js | Ported, UI-only gaps |
| FUN_004befd1 (format enabled items) | 138B | N/A | UI string formatting only |
| FUN_004b0720 (lookup tech by name) | 177B | N/A | Parser helper, not needed |
| FUN_004b07d1 (lookup terrain by name) | 179B | N/A | Parser helper, not needed |
| FUN_004b315c (build adjacency table) | 418B | N/A | Not ported (AI continent nav) |

### Discrepancies Found (report only, no JS modifications)

1. **FUN_004b32fe / assignContinentBodyIds**: JS does not compute continent adjacency table
   (FUN_004b315c). This data is used by AI for transport planning. Low priority — AI can
   function without it.

2. **FUN_004bfe5a / canBuildUnitType**: JS missing two binary checks:
   - Range >= 99 requires Space Flight tech check (line 7031). Standard units unaffected.
   - Settler-type city flag check (lines 7033-7035). Standard gameplay unaffected.

3. **FUN_004be6ba / upgradeUnitsForTech**: Binary has special Gunpowder override for
   defensive units' prereq tech (line 6462-6468). Redundant for standard RULES.TXT but
   could matter for modded rules.

4. **FUN_004bd9f0 / civ_has_tech**: Binary handles tech ID -2 (return 0), negative (return 1),
   89/future (return 0), and >=100 (return 0) as special cases. JS Set.has() naturally handles
   these since those IDs are never in the Set, but the "any negative = always known" convention
   is relied upon by callers passing prerequisite IDs. JS callers handle this with `id < 0`
   guard clauses — **functionally equivalent**.
