# Block 00450000 — Phase 7 Audit
**Functions in this block: 136**
**System: Diplomacy — Civilopedia/Help UI, diplomacy advisor UI, treaty negotiation logic (attitude scoring, tech exchange, alliance/peace/ceasefire offers, war declarations, gift menus, mercenary requests, map sharing), registry I/O**

## FW — Framework (18 functions)

- `FUN_004502b0` (0x004502B0, 34B) — MFC CString init (zero ECX). N/A
- `FUN_004502e0` (0x004502E0, 67B) — MFC CString assignment (free+alloc). N/A
- `FUN_00450340` (0x00450340, 57B) — MFC CString destructor (free+zero). N/A
- `SetHelpID` (0x00451A90, 33B) — CDialog::SetHelpID library function. N/A
- `FUN_00452ac1` (0x00452AC1, 9B) — Thunk to 0040f510 (CWnd cleanup). N/A
- `FUN_00452ad4` (0x00452AD4, 14B) — SEH frame epilog (FS restore). N/A
- `FUN_00453af0` (0x00453AF0, 21B) — Thunk to 005bbb0a (cleanup). N/A
- `FUN_00453bfa` (0x00453BFA, 9B) — Thunk to 0040f510 (CWnd cleanup). N/A
- `FUN_00453c0d` (0x00453C0D, 14B) — SEH frame epilog (FS restore). N/A
- `SetHelpID` (0x00453D70, 33B) — CDialog::SetHelpID library function (duplicate). N/A
- `tie` (0x00456EE0, 45B) — ios::tie library function. N/A
- `FUN_00454888` (0x00454888, 9B) — Thunk to 0044ca60 (destructor chain). N/A
- `FUN_0045489b` (0x0045489B, 14B) — SEH frame epilog. N/A
- `FUN_00454e8b` (0x00454E8B, 12B) — CString destructor thunk. N/A
- `FUN_00454ea1` (0x00454EA1, 17B) — SEH frame epilog. N/A
- `FUN_0045a510` (0x0045A510, 12B) — Thunk to 0059df8a (dialog cleanup). N/A
- `FUN_0045a526` (0x0045A526, 15B) — SEH frame epilog. N/A
- `FUN_0045fd59` (0x0045FD59, 14B) — SEH frame epilog. N/A

## UI — User Interface (86 functions)

### Civilopedia/Help Dialog UI (30 functions)
- `FUN_00450390` (0x00450390, 45B) — Set bitmap handle + redraw. N/A
- `FUN_004503d0` (0x004503D0, 37B) — Manage window via handle. N/A
- `FUN_00450400` (0x00450400, 41B) — GDI clear via handle. N/A
- `FUN_00450440` (0x00450440, 49B) — Set bitmap from param offset 0x404. N/A
- `FUN_00450480` (0x00450480, 1602B) — Civilopedia list box populate (tech check, list items, scrollbar). N/A
- `FUN_00450ae6` (0x00450AE6, 30B) — Scroll callback (index 0). N/A
- `FUN_00450b04` (0x00450B04, 30B) — Scroll callback (index 1). N/A
- `FUN_00450b22` (0x00450B22, 97B) — Set scroll position + redraw list. N/A
- `FUN_00450b83` (0x00450B83, 627B) — List click handler (selection, shift/ctrl multi-select). N/A
- `FUN_00450df6` (0x00450DF6, 277B) — Hit-test: mouse-coord to list item index. N/A
- `FUN_00450f0b` (0x00450F0B, 1333B) — Paint Civilopedia list (items, scrollbar, highlights, text). N/A
- `FUN_00451830` (0x00451830, 37B) — Get list item width. N/A
- `FUN_00451860` (0x00451860, 37B) — Get list item height. N/A
- `FUN_00451890` (0x00451890, 49B) — Convert screen point. N/A
- `FUN_004518d0` (0x004518D0, 38B) — Get DC + lock. N/A
- `FUN_00451900` (0x00451900, 37B) — Get DC from handle. N/A
- `FUN_00451930` (0x00451930, 83B) — CWnd constructor wrapper. N/A
- `FUN_004519b0` (0x004519B0, 139B) — CWnd create subwindow. N/A
- `FUN_00451a60` (0x00451A60, 33B) — Set callback handler. N/A
- `FUN_00451ac0` (0x00451AC0, 33B) — Set scroll range handler. N/A
- `FUN_00451af0` (0x00451AF0, 256B) — Draw advisor panel (SetRect, text rendering). N/A
- `FUN_00451bf0` (0x00451BF0, 1391B) — Build Civilopedia page layout (buttons, tabs, scrollbar). N/A
- `FUN_00452188` (0x00452188, 356B) — Civilopedia page dispatch (switch 0-8: techs, wonders, units, etc). N/A
- `FUN_00452315` (0x00452315, 1059B) — Load Civilopedia text from PEDIA.TXT. N/A
- `FUN_00452768` (0x00452768, 593B) — Civilopedia link click handler (navigate to describe/ files). N/A
- `register_wndclass_29DF` (0x004529DF, 136B) — RegisterClassA for "MSHyperTextClass". N/A
- `FUN_00452a67` (0x00452A67, 90B) — Hypertext window destructor. N/A
- `FUN_00452ae2` (0x00452AE2, 167B) — CreateWindowExA for hypertext control. N/A
- `FUN_00452b89` (0x00452B89, 139B) — Hypertext subwindow create. N/A
- `FUN_00452c14` (0x00452C14, 1361B) — Hypertext link rendering (multiline, color, truncation). N/A

### Hypertext Link Click Handlers (5 functions)
- `FUN_004531b8` (0x004531B8, 130B) — Link click handler: set mode=1 (tech detail). N/A
- `FUN_0045323a` (0x0045323A, 130B) — Link click handler: set mode=2 (unit detail). N/A
- `FUN_004532bc` (0x004532BC, 130B) — Link click handler: set mode=3 (building detail). N/A
- `FUN_0045333e` (0x0045333E, 130B) — Link click handler: set mode=4 (wonder detail). N/A
- `FUN_004533c0` (0x004533C0, 130B) — Link click handler: set mode=5 (terrain detail). N/A

### Hypertext/List Helpers (7 functions)
- `FUN_00453aa0` (0x00453AA0, 57B) — Destructor (free + optional operator_delete). N/A
- `FUN_00453b10` (0x00453B10, 86B) — CWnd constructor wrapper (for hypertext node). N/A
- `FUN_00453ba0` (0x00453BA0, 90B) — Window destructor (destroy HWND). N/A
- `FUN_00453c40` (0x00453C40, 47B) — Clear text + invalidate. N/A
- `FUN_00453c80` (0x00453C80, 47B) — Set text mode + invalidate. N/A
- `FUN_00453cc0` (0x00453CC0, 83B) — CWnd constructor wrapper. N/A
- `FUN_00453d40` (0x00453D40, 33B) — Set callback handler. N/A

### Registry I/O (2 functions)
- `FUN_0045406c` (0x0045406C, 146B) — RegCreateKeyExA + RegSetValueExA (write registry). N/A
- `FUN_00454103` (0x00454103, 199B) — RegOpenKeyExA + RegQueryValueExA (read registry). N/A

### Diplomacy Advisor Dialog UI (34 functions)
- `FUN_00453f90` (0x00453F90, 220B) — Read "DefaultLanguage" from registry. N/A
- `FUN_00454260` (0x00454260, 205B) — Open diplomacy advisor dialog (allocate, init, show). N/A
- `FUN_00454344` (0x00454344, 16B) — Empty stub (no-op). N/A
- `FUN_00454354` (0x00454354, 578B) — Diplomacy advisor constructor (init strings, tables, SetRect). N/A
- `FUN_00454699` (0x00454699, 255B) — Diplomacy advisor destructor (destroy vectors, strings). N/A
- `FUN_00454798` (0x00454798, 15B) — Destructor helper thunk (0043c520). N/A
- `FUN_004547a7` (0x004547A7, 15B) — Destructor helper thunk (005bd915). N/A
- `FUN_004547b6` (0x004547B6, 24B) — Vector destructor (offset 0x18ac). N/A
- `FUN_004547ce` (0x004547CE, 24B) — Vector destructor (offset 0x17bc). N/A
- `FUN_004547e6` (0x004547E6, 24B) — Vector destructor (offset 0x16cc). N/A
- `FUN_004547fe` (0x004547FE, 24B) — Vector destructor (offset 0x15dc). N/A
- `FUN_00454816` (0x00454816, 24B) — Vector destructor (offset 0x6dc, 0x3c elements). N/A
- `FUN_0045482e` (0x0045482E, 15B) — Timevec destructor (offset 0x6d8). N/A
- `FUN_0045483d` (0x0045483D, 15B) — CString destructor thunk. N/A
- `FUN_0045484c` (0x0045484C, 15B) — CString destructor thunk. N/A
- `FUN_0045485b` (0x0045485B, 15B) — CString destructor thunk. N/A
- `FUN_0045486a` (0x0045486A, 15B) — CString destructor thunk. N/A
- `FUN_00454879` (0x00454879, 15B) — Timer destructor thunk (0043cba0). N/A
- `FUN_004548a9` (0x004548A9, 1506B) — Diplomacy advisor setup (load DLL, create bitmaps, assign sprite areas). N/A
- `FUN_00454eb2` (0x00454EB2, 209B) — Diplomacy advisor show (attach bitmaps, property sheet, tabs). N/A
- `FUN_00454f83` (0x00454F83, 414B) — Diplomacy advisor determine meeting type (at-sea/coastal/land → sprite selection). N/A
- `FUN_0045512b` (0x0045512B, 88B) — Load diplomat flag sprite (32x32). N/A
- `FUN_00455183` (0x00455183, 401B) — Build advisor layout (header, attitude display, title bar). N/A
- `FUN_00455314` (0x00455314, 1694B) — Place advisor sprite elements (thrones, decorations, terrain-dependent). N/A
- `FUN_00455add` (0x00455ADD, 177B) — Render selected sprites on advisor canvas. N/A
- `FUN_00455b8e` (0x00455B8E, 207B) — Random-pick from lower advisor sprite pool. N/A
- `FUN_00455c5d` (0x00455C5D, 219B) — Random-pick from upper advisor sprite pool. N/A
- `FUN_00455d38` (0x00455D38, 197B) — Place upper advisor element at coordinates. N/A
- `FUN_00455dfd` (0x00455DFD, 193B) — Place lower advisor element at coordinates. N/A
- `FUN_00455ebe` (0x00455EBE, 112B) — Assign advisor sprite (variant A, with patience counter). N/A
- `FUN_00455f2e` (0x00455F2E, 112B) — Assign advisor sprite (variant B, with patience counter). N/A
- `FUN_00455f9e` (0x00455F9E, 103B) — Assign advisor sprite (variant C, no patience counter). N/A
- `FUN_00456005` (0x00456005, 103B) — Assign advisor sprite (variant D, no patience counter). N/A
- `FUN_0045606c` (0x0045606C, 140B) — Blit advisor canvas + render title bar. N/A

### Advisor Display Helpers (8 functions)
- `FUN_004560f8` (0x004560F8, 225B) — Render advisor name bar (font setup, shadow text). N/A
- `FUN_004561d9` (0x004561D9, 79B) — Auto-scroll advisor panel based on mouse X position. N/A
- `FUN_00456228` (0x00456228, 64B) — Keyboard handler (0xD2 = advisor button press). N/A
- `FUN_0045626d` (0x0045626D, 46B) — Invalidate advisor cache. N/A
- `FUN_0045638b` (0x0045638B, 285B) — Scroll advisor panel right (keyboard/cursor tracking loop). N/A
- `FUN_004564a8` (0x004564A8, 274B) — Scroll advisor panel left (keyboard/cursor tracking loop). N/A
- `FUN_0045629b` (0x0045629B, 164B) — Keyboard dispatch (arrow keys, advisor page buttons). N/A
- `FUN_00456e90` (0x00456E90, 57B) — Advisor destructor (cleanup + optional free). N/A

## GL — Game Logic: Diplomacy (34 functions)

### GL-01: `FUN_00453da0` — Tech known by any civ (0x00453DA0, 120B)
**Classification:** GL — Helper
**Purpose:** Checks if any civ (1-7) knows a given tech, given a tech-to-advance mapping table.
**JS Equivalent:** No direct single function; this pattern is used inline in various diplomacy functions.
**Verdict:** NOT PORTED (minor utility — used only by other diplomacy UI functions in this block)

### GL-02: `FUN_00453e18` — Get advance index for a given tech (0x00453E18, 57B)
**Classification:** GL — Helper
**Purpose:** Maps a tech/advance parameter to an advance index via lookup table `DAT_00655be6`. Returns -1 if known by any civ.
**Verdict:** NOT PORTED (lookup helper used by `FUN_00453e51`)

### GL-03: `FUN_00453e51` — Check if civ has wonder effect (0x00453E51, 142B)
**Classification:** GL — Helper
**Purpose:** `hasWonderEffect(civSlot, wonderId)`: checks if a civ has a wonder that provides a specific effect. Special case: wonderId=0x14 (Statue of Liberty) with scenario flag bypass.
**JS Equivalent:** `hasWonderEffect()` in `engine/utils.js`
**Verdict:** YES — `hasWonderEffect()` covers the same logic. The scenario flag bypass for wonder 0x14 is not relevant in the JS engine (no scenarios).

### GL-04: `FUN_00453edf` — Get wonder owner civ (0x00453EDF, 73B)
**Classification:** GL — Helper
**Purpose:** Returns the owner civ of a given wonder (via advance index mapping).
**JS Equivalent:** `civHasWonder()` in `engine/utils.js`
**Verdict:** YES — Covered by existing wonder lookup utilities.

### GL-05: `FUN_00456f20` — Adjust attitude score (0x00456F20, 107B)
**Classification:** GL — Core diplomacy
**Purpose:** `adjust_attitude(param_1, param_2, param_3)`: Adds `param_3` to the attitude value between `param_1` and `param_2`. Also updates the global "current player" attitude tracker if both match the active diplomacy session.
**JS Equivalent:** `adjustAttitude()` in `engine/diplomacy.js`
**Verdict:** YES — The core attitude adjustment logic matches. The global tracker update is UI-specific and N/A.

### GL-06: `FUN_00456f8b` — Calculate patience threshold (0x00456F8B, 211B)
**Classification:** GL — Core diplomacy
**Purpose:** Calculates the "patience threshold" for a civ pair. Base = 2, modified by attitude (< 25 → +1, > 60 → -1), Statue of Liberty (+1), war between them (+1), alliance (+2), and reduced to 2 if "vendetta" (0x20 flag) is set.
**JS Equivalent:** No direct equivalent function. The patience system is simplified in `engine/diplomacy.js`.
**Verdict:** PARTIAL — The JS patience system exists but uses simplified increment/decay rather than this per-pair threshold formula. The formula itself (base 2, attitude-dependent modifiers, wonder effects) is not ported.
**Discrepancy:** Binary formula: base=2, attitude<25→+1, attitude>60→-1, SOL→+1, war→+1, alliance→+2, vendetta→reset to 2. JS: flat increment/decay only.

### GL-07: `FUN_0045705e` — Full diplomacy evaluation (0x0045705E, 6616B)
**Classification:** GL — Core AI diplomacy
**Purpose:** The master diplomacy evaluation function — computes all AI diplomacy variables for a civ pair: `DAT_0064b0ec` (tribute demand), `DAT_0064b0f8` (war desire), `DAT_0064b114` (attitude score), `DAT_0064b118` (tech desire), `DAT_0064b11c` (dominant civ flag), `DAT_0064b12c` (relative power), `DAT_0064b130` (threat flag), `DAT_0064b134` (unit threat count), `DAT_0064b13c` (war desire final), `DAT_0064b140` (alliance opposition score), `DAT_0064b148` (negotiation willingness).

Key formula elements:
- Military unit border proximity doubling of tech desire
- Treasury-based tribute, scaled by difficulty and epoch
- Tech desire from unit advantage ratios with difficulty multiplier
- Nuclear parity detection
- Alliance obligations and third-party ally scanning
- Personality-based aggression from `DAT_006554f8` leader tables
- Vendetta escalation from broken treaties
- Power ranking comparisons for war/peace thresholds
- Clamping: attitude in [1..99] for normal, [26..99] for vendetta, special caps for allied/warring

**JS Equivalent:** `calcAttitudeScore()` in `engine/diplomacy.js` + `ai_evaluate_diplomacy_toward_human()` in `engine/ai/diplomai.js`
**Verdict:** PARTIAL — The JS `calcAttitudeScore()` implements a subset of this function's logic (about 25-30%). The binary function computes ~15 separate output variables in a single pass; the JS splits this across multiple simplified functions. Major missing elements:
- **Tech desire calculation** (military unit advantage per-civ with epoch scaling)
- **Tribute demand** (multi-stage scaling by treasury, difficulty, epoch, per-personality)
- **Unit-on-border threat detection** (iterates units near target territory)
- **Nuclear threat evaluation** (atom bomb parity detection)
- **Alliance opposition scoring** (multi-factor third-party alliance/war scanning)
- **Attitude clamping ranges** (different caps for vendetta vs normal vs allied states)
- **WAR desire flags** (0x0064b0f8) driven by multiple cascading conditions

**Discrepancy:** This is the most complex function in the block. The JS covers power ranking, personality modifiers, and wonder effects but lacks the full tribute/tech-desire/war-desire evaluation pipeline.

### GL-08: `FUN_00458a3b` — Set diplomacy display attitude (0x00458A3B, 118B)
**Classification:** UI (with minor GL data read)
**Purpose:** Renders the attitude-colored name in the diplomacy dialog. Reads `DAT_0064b114` (attitude) and converts via `getAttitudeLevel()`.
**Verdict:** N/A (UI rendering)

### GL-09: `FUN_00458ab1` — Show diplomacy greeting (0x00458AB1, 804B)
**Classification:** UI (reads GL state)
**Purpose:** Displays the initial diplomacy greeting dialog. Reads nuclear status, government type, attitude; constructs dialog text with localized strings.
**Verdict:** N/A (UI dialog)

### GL-10: `FUN_00458dd5` (0x00458DD5, 12B) — Dialog cleanup thunk. N/A
### GL-11: `FUN_00458deb` (0x00458DEB, 14B) — SEH frame epilog. N/A (FW)

### GL-12: `FUN_00458df9` — Show emissary menu / first contact (0x00458DF9, 880B)
**Classification:** UI (with minor GL state reads)
**Purpose:** Shows the emissary/first-contact diplomacy dialog. Calls `FUN_0045705e` for evaluation, sets up UI menus. Handles nuclear deterrent display.
**Verdict:** N/A (UI)

### GL-13: `FUN_00459169` (0x00459169, 12B) — Dialog cleanup thunk. N/A
### GL-14: `FUN_0045917f` (0x0045917F, 15B) — SEH frame epilog. N/A (FW)

### GL-15: `FUN_0045918e` — Reset diplomacy session globals (0x0045918E, 61B)
**Classification:** GL — Session management
**Purpose:** Clears all global diplomacy session variables: `DAT_00626a24`, `DAT_00626a30`, `DAT_00626a34`, `DAT_00626a1c`.
**Verdict:** NOT PORTED — The JS uses a different diplomacy session model (WebSocket request/response). No equivalent globals needed.

### GL-16: `FUN_004591cb` — Sell tech for gold (0x004591CB, 832B)
**Classification:** GL — Diplomacy transaction
**Purpose:** AI offers to sell a tech (`DAT_0064b144`) for gold. Calculates price based on tech value (`FUN_004bdb2c`), attitude, difficulty, treasury, military parity. Price formula: `value * 20`, adjusted for city count thresholds (>1500 gold: *1.5, >3000: *1.5 again), alliance discount (x0.75 or x0.5), capped at 100 minimum. Deducts gold and grants tech on acceptance.
**JS Equivalent:** `executeTransaction()` + `transferTechs()` in `engine/diplomacy.js`
**Verdict:** PARTIAL — The JS has tech transfer mechanics but lacks the binary's pricing formula (per-tech value * 20 with cascading multipliers for treasury, alliance status, military parity).
**Discrepancy:** Binary price formula: `techValue * 20`, then `/iVar2` (city count divisor), `*10`, treasury thresholds (*1.5 twice), alliance discount. JS: no per-tech pricing — tech gifts are free or handled by the action layer.

### GL-17: `handle_exchange_gift` — Tech exchange negotiation (0x0045950B, 4096B)
**Classification:** GL — Core AI diplomacy
**Purpose:** Handles the AI's tech-exchange logic:
1. Scans techs each civ has that the other doesn't
2. Selects best/2nd-best techs to trade
3. Evaluates wonder-blocking (refuses to trade if target has unconstructed wonder)
4. Handles difficulty-gated sell-tech option
5. Handles gift-only mode (for allied gifts)
6. Main exchange: swaps top techs, adjusts attitude by `-tech_value * 2`
7. Offers secondary tech choice if available

**JS Equivalent:** `executeTransaction()` with techs in `engine/diplomacy.js`
**Verdict:** PARTIAL — JS has basic tech transfer but lacks the binary's sophisticated exchange evaluation (wonder-blocking, comparative tech value, secondary-tech choice, attitude-to-tech-value ratio).
**Discrepancy:** The binary evaluates wonder-blocking conditions (refuses tech if target has an unbuilt wonder requiring that tech), which the JS does not implement.

### GL-18: `FUN_0045a535` — Form alliance (0x0045A535, 374B)
**Classification:** GL — Treaty state mutation
**Purpose:** `diplo_form_alliance(param_1, param_2)`: Adjusts attitude by -25 (= +25 goodwill), calls `setTreatyFlags(WAR, 8)` to establish alliance, sets flag bits 0x100 (nuke awareness), records treaty turn (`DAT_00655af8`), sets "in diplomacy" flags on both civs.
**JS Equivalent:** `formAlliance()` in `engine/diplomacy.js` (line 1121)
**Verdict:** YES — The JS function correctly implements:
- Attitude adjustment (+25 goodwill)
- Treaty state setting
- Nuke awareness flag (TF.NUKE_AWARENESS = 0x100)
- Treaty turn recording
- Alliance cascade (alliance shared visibility, embassy auto-establishment)

### GL-19: `FUN_0045a6ab` — Sign peace treaty (0x0045A6AB, 253B)
**Classification:** GL — Treaty state mutation
**Purpose:** `diplo_sign_peace_treaty(param_1, param_2)`: Sets treaty flags `0x4004` (RECENT_CONTACT + PEACE), clamps attitude to [0, 50], resets patience counter, records treaty turn.
**JS Equivalent:** `signPeaceTreaty()` in `engine/diplomacy.js` (line 1068)
**Verdict:** YES — The JS correctly implements treaty flag setting, attitude clamping, patience reset, and treaty turn recording.

### GL-20: `FUN_0045a7a8` — Sign ceasefire (0x0045A7A8, 315B)
**Classification:** GL — Treaty state mutation
**Purpose:** `diplo_sign_ceasefire(param_1, param_2)`: Sets treaty flags `0x4002` (RECENT_CONTACT + CEASEFIRE), calls `FUN_00467750` to set 0x40000 (TRIBUTE_DEMANDED), clamps attitude, records treaty turn. Clears `WAR_STARTED` flag (0x800) for all civs toward param_1.
**JS Equivalent:** `signCeasefire()` in `engine/diplomacy.js` (line 1006)
**Verdict:** YES — The JS correctly implements the core logic. The WAR_STARTED clearing loop matches the binary's loop.

### GL-21: `FUN_0045a8e3` — Activate alliance wars cascade (0x0045A8E3, 910B)
**Classification:** GL — Treaty cascade
**Purpose:** `diplo_activate_alliance_wars(civA, civB)`: When civA goes to war with civB, iterates all civs c (1-7) that are allied with civA. If c is at war with civB and has contact, declares war. Handles human-vs-AI messaging, sets WAR_STARTED + PERIODIC_FLAG_19 bits (0x80800), records treaty turn.
**JS Equivalent:** `activateAllianceWars()` in `engine/diplomacy.js` (line 1359)
**Verdict:** YES — The JS implements the same cascade logic with loop prevention via `processed` Set. The binary uses the flag-check `(0x2008 == 0)` as the guard (no existing war or ceasefire), which the JS mirrors with `existingTreaty === 'war' || existingTreaty === 'ceasefire'` skip.

### GL-22: `FUN_0045ac71` — Declare war (0x0045AC71, 1125B)
**Classification:** GL — Treaty state mutation
**Purpose:** `diplo_declare_war(param_1, param_2, param_3)`: Full war declaration with reputation tracking. Key behaviors:
1. Increments violation counter against `param_3` (third party)
2. Handles 3 treaty levels: alliance (double increment + bigger rep hit), peace/ceasefire (medium), none (single increment)
3. Sets VENDETTA (0x10) if human player
4. Calls `setTreatyFlags(WAR, 0x2000)` + sets `WAR_STARTED + PERIODIC_FLAG_19` (0x80800)
5. Activates alliance cascade for the target

**JS Equivalent:** `declareWar()` in `engine/diplomacy.js` (line 741) + `declareWar()` in `engine/ai/diplomai.js`
**Verdict:** PARTIAL — The JS implements the core logic (treaty transition, reputation penalty, alliance cascade, vendetta flags) but the reputation damage amounts differ:
**Discrepancy:** Binary uses incrementPatience (counter-based) with 1-3 increments depending on prior treaty level. JS uses `adjustReputation()` with fixed penalty amounts (-60 for alliance, -30 for peace, -15 for ceasefire). The binary's patience system is a counter that feeds into the per-pair threshold formula (GL-06), while the JS uses a global reputation score.

### GL-23: `FUN_0045b0d6` — Handle ally's war request (0x0045B0D6, 919B)
**Classification:** GL — AI diplomacy
**Purpose:** When an ally is at war, evaluates whether the player should help. Calculates tribute amount based on unit advantage. Handles:
- Gold demand acceptance/rejection
- Alliance war cascade on acceptance
- Attitude penalty on refusal
**Verdict:** NOT PORTED — This is a UI-driven interaction for human player response. The AI side is handled differently in the JS engine.

### GL-24: `FUN_0045b472` — Gold to attitude conversion (0x0045B472, 104B)
**Classification:** GL — Formula
**Purpose:** Converts a gold amount to an attitude delta using diminishing returns:
```
while gold > 0:
  batch = clamp(gold, 0, threshold)  // threshold starts at 50, then 100
  result += batch / divisor            // divisor starts at 10, then increments by 5
  gold -= threshold
```
This means first 50 gold → 5 attitude, next 100 → 6.67, next 100 → 5, etc.
**JS Equivalent:** No equivalent — gold gifts use flat `adjustAttitude()`.
**Verdict:** NOT PORTED
**Discrepancy:** Binary uses diminishing returns formula for gold-to-attitude conversion; JS uses flat ratio or no conversion at all.

### GL-25: `FUN_0045b4da` — AI negotiate treaty response (0x0045B4DA, 10271B)
**Classification:** GL — Core AI diplomacy
**Purpose:** The monster function: handles all AI responses to player diplomacy requests. Case 1 = alliance request, Case 2 = peace treaty request, Cases 3-5 = military encounter responses, Case 6 = cancel alliance. Key behaviors include:
- Multi-factor alliance acceptance scoring (power, epoch, allies, reputation, betrayal history)
- Tech-for-treaty demands (offer tech/gold to sweeten deal)
- Third-party war declaration demands (join war against mutual enemy)
- Ceasefire/peace acceptance with gold/tech bribes
- Unit withdrawal demands for peace treaties
- War provocation mechanic (refuse → declare war)

**JS Equivalent:** Partially covered by `ai_evaluate_diplomacy_toward_human()` in `engine/ai/diplomai.js` + various treaty functions
**Verdict:** PARTIAL — The JS has simplified treaty acceptance/rejection logic but lacks the full multi-factor scoring with bribe mechanics, third-party war demands, and graduated response system.

### GL-26: `FUN_0045dd7f` — AI favor menu response (0x0045DD7F, 4878B)
**Classification:** GL — AI diplomacy
**Purpose:** Handles the AI's response to player "favor" requests: tech exchange, target-a-civ request, map sharing. The target-a-civ request involves:
- Gold calculation for mercenary wars
- Map sharing logic (tile visibility exchange, unit visibility)
- Alliance-based pricing adjustments
**JS Equivalent:** Not ported — this is a complex UI-driven negotiation flow.
**Verdict:** NOT PORTED

### GL-27: `FUN_0045f08d` (0x0045F08D, 12B) — Dialog cleanup thunk. N/A (FW)
### GL-28: `FUN_0045f0a3` (0x0045F0A3, 14B) — SEH frame epilog. N/A (FW)

### GL-29: `show_gift_menu` — Gift menu handler (0x0045F0B1, 3218B)
**Classification:** GL — AI diplomacy
**Purpose:** Handles the gift menu responses: tech gifts (with attitude adjustment proportional to tech value), gold gifts (with diminishing-returns attitude via `FUN_0045b472`), military unit gifts (transfer ownership, tech breakthrough chance). Key formulas:
- Tech gift attitude: `-techValue * 4` (best tech) or `-techValue * 2` (2nd tech)
- Gold gift attitude: `-goldToAttitude(amount) * 3 / 2`
- Unit gift attitude: `-unitCost * 3` (halved if target has unit's prerequisite tech)
- 50% chance of tech breakthrough after unit gift

**JS Equivalent:** `executeTransaction()` in `engine/diplomacy.js` handles tech/gold/unit transfers but lacks attitude feedback formulas.
**Verdict:** PARTIAL — Transfer mechanics exist but attitude-impact formulas are missing.
**Discrepancy:** Binary attitude adjustments for gifts are formula-driven (tech value, diminishing returns for gold, unit cost scaling); JS uses flat adjustments or none.

### GL-30: `FUN_0045fd43` (0x0045FD43, 12B) — Dialog cleanup thunk. N/A (FW)

### GL-31: `FUN_0045fd67` — Announce continued hostility (0x0045FD67, 178B)
**Classification:** GL/UI hybrid
**Purpose:** If aggression score > 4 and not scenario-locked, displays "hawks demand continued war" or "UN demands cease" message.
**Verdict:** NOT PORTED (UI notification — the aggression tracking itself is partially covered)

### GL-32: `FUN_0045fe19` — Main diplomacy menu (0x0045FE19, 747B)
**Classification:** UI (menu construction)
**Purpose:** Builds the main diplomacy action menu: items include exchange, peace, alliance, ceasefire, share maps, declare war, end meeting. Uses treaty state to enable/disable menu items.
**Verdict:** N/A (UI menu construction — treaty state checks are implemented in JS action validation)

## Summary

| Verdict | Count |
|---------|-------|
| N/A (FW/UI/design) | 115 |
| YES (match) | 7 |
| PARTIAL (functional) | 7 |
| NO → FIXED | 0 |
| NOT PORTED | 7 |
| **Total** | **136** |

## Discrepancies Found: 5

### 1. Patience threshold formula not ported (GL-06: FUN_00456f8b)
**Binary:** Per-pair patience threshold with formula: base=2, attitude<25→+1, attitude>60→-1, Statue of Liberty→+1, war→+1, alliance→+2, vendetta→reset to 2.
**JS:** Flat increment/decay system (patience++ on violation, -1 every 3 turns).
**Impact:** Medium — affects AI willingness to negotiate. The binary's formula makes the AI more contextually aware of relationship quality.

### 2. Full diplomacy evaluation pipeline not ported (GL-07: FUN_0045705e)
**Binary:** 6,616-byte function computing 15+ output variables: tribute amount, tech desire, war desire, unit border threats, nuclear parity, alliance opposition score, negotiation willingness, all in a single pass with cascading conditionals.
**JS:** `calcAttitudeScore()` covers ~25-30% of this — mainly power rankings, personality modifiers, and wonder effects. Missing: tribute calculation, tech desire with epoch scaling, unit-on-border threat detection, nuclear threat evaluation, alliance opposition multi-factor score.
**Impact:** High — this is the central AI diplomacy evaluation function. Without it, AI negotiation behavior is significantly simplified.

### 3. Tech sell pricing formula not ported (GL-16: FUN_004591cb)
**Binary:** `techValue * 20`, divided by city count divisor, `*10`, with treasury thresholds (>1500: *1.5, >3000: *1.5 again), alliance discount (x0.75 or x0.5), minimum 100 gold.
**JS:** No tech pricing — techs are transferred freely or through action-layer validation.
**Impact:** Medium — affects economic balance of tech trading.

### 4. Gold-to-attitude diminishing returns not ported (GL-24: FUN_0045b472)
**Binary:** First 50 gold → 5 attitude, next 100 → 6.67, next 100 → 5, etc. (divisor starts at 10, increments by 5; threshold starts at 50, then 100).
**JS:** No equivalent — gold gifts use flat `adjustAttitude()` or no conversion.
**Impact:** Medium — large gold gifts have disproportionate impact in the JS vs. binary.

### 5. Gift attitude formulas not ported (GL-29: show_gift_menu)
**Binary:** Tech gift attitude: `-techValue * 4` (best) / `-techValue * 2` (2nd); Gold attitude: `-goldToAttitude() * 3/2`; Unit gift: `-unitCost * 3` (halved with tech).
**JS:** Flat adjustments or none for gift transfers.
**Impact:** Medium — affects diplomatic effectiveness of gifts.

## Functions audited: 136
