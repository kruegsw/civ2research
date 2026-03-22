# Block 00490000 -- Phase 7 Audit
**Functions in this block: 124**
**Lines: 6,113**
**System: Diplomacy Intelligence UI, Chat/Messaging, Advisor Screen (Intelligence Reports), City Preferences, Password System, Sound/Music Resources, AI Production Selection**

## Summary

This block contains a mix of:
1. **Diplomacy intelligence report UI** (the "Foreign Affairs" / heralds screen) -- rendering government names, stat comparisons, attitude breakdown for each civ
2. **Multiplayer chat system** -- chat macros, message send/receive, chat buffer management
3. **Diplomacy contact/embargo state manipulation** -- toggling contact records, managing the 48-entry main contact list and 16-entry recent contact list
4. **City herald / advisor screen rendering** -- the animated advisor ("herald") that shows leader portraits, science tree visualization, military advisors
5. **Password system** -- player password encryption, storage, validation (XOR cipher)
6. **City preference loading** -- CITYPREF.TXT parser (autobuild and no-defend preferences)
7. **AI production selection** -- the massive FUN_00498e8b (~2100 lines) that scores buildings, wonders, and units for AI city production

The one GL function of major significance -- FUN_00498e8b (AI city production advisor) -- has been ported to `engine/ai/prodai.js`. The `load_city_preferences` function loads autobuild/no-defend preferences from CITYPREF.TXT, relevant to AI autobuild behavior.

**Discrepancies found: 3** (all enhancement-tier, no bugs)

---

## FW -- Framework (30 functions)

These are SEH frame epilogs, destructors, thunks to MFC library functions, and C++ constructor/destructor scaffolding. None contain game logic.

- `FUN_004904c0` (0x004904C0, 42B) -- Thunk wrapper: forwards 4 params to 0x0051d564. N/A
- `FUN_00490500` (0x00490500, 38B) -- Thunk wrapper: forwards 3 params to 0x004a6cc5. N/A
- `FUN_00490530` (0x00490530, 38B) -- Thunk wrapper: forwards 3 params to 0x004a6e39. N/A
- `IsTracking` (0x00490560, 31B) -- MFC library function: CSplitterWnd::IsTracking(). N/A
- `FUN_004923c0` (0x004923C0, 37B) -- Thunk: calls FUN_005bd120 (resource/bitmap cleanup). N/A
- `FUN_00492868` (0x00492868, 12B) -- Thunk: calls FUN_005d7c6e (file/stream cleanup). N/A
- `FUN_0049287e` (0x0049287E, 14B) -- SEH frame epilog (FS register restore). N/A
- `Realloc` (0x004929C0, 40B) -- MFC library function: CHtmlStream/CMemFile::Realloc (first overload). N/A
- `Realloc` (0x00492A00, 40B) -- MFC library function: CHtmlStream/CMemFile::Realloc (second overload). N/A
- `FUN_00492a40` (0x00492A40, 44B) -- Thunk: calls FUN_005d881c (stream/buffer read). N/A
- `FUN_00492a80` (0x00492A80, 34B) -- Thunk: calls FUN_005d898e (stream/buffer size query). N/A
- `FUN_004942a3` (0x004942A3, 200B) -- Constructor for advisor screen dialog object: chains MFC constructors (CDialog, CDC, CString, CFont, CPropertyPage). N/A
- `FUN_004943c9` (0x004943C9, 134B) -- Destructor for advisor screen dialog: chains destructors in reverse order. N/A
- `FUN_0049444f` (0x0049444F, 15B) -- Sub-destructor: calls FUN_005dd1a0 (video resource release). N/A
- `FUN_0049445e` (0x0049445E, 15B) -- Sub-destructor: destroys _Timevec at offset 0x658. N/A
- `FUN_0049446d` (0x0049446D, 15B) -- Sub-destructor: calls FUN_005c656b (DC/GDI cleanup). N/A
- `FUN_0049447c` (0x0049447C, 15B) -- Sub-destructor: calls FUN_005bd915 (bitmap cleanup). N/A
- `FUN_0049448b` (0x0049448B, 15B) -- Sub-destructor: calls 0x0044cba0 (dialog cleanup). N/A
- `FUN_0049449a` (0x0049449A, 9B) -- Sub-destructor: calls 0x0044ca60 (window cleanup). N/A
- `FUN_004944ad` (0x004944AD, 14B) -- SEH frame epilog. N/A
- `FUN_00494b3a` (0x00494B3A, 12B) -- Sub-destructor: calls FUN_005c656b (DC cleanup). N/A
- `FUN_00494b50` (0x00494B50, 15B) -- SEH frame epilog. N/A
- `FUN_00494d71` (0x00494D71, 12B) -- Sub-destructor: calls FUN_005bd915 (bitmap cleanup). N/A
- `FUN_00494d7d` (0x00494D7D, 12B) -- Sub-destructor: calls FUN_005c656b (DC cleanup). N/A
- `FUN_00494d89` (0x00494D89, 12B) -- Sub-destructor: calls FUN_005cde4d (CString destructor). N/A
- `FUN_00494d9f` (0x00494D9F, 15B) -- SEH frame epilog. N/A
- `~CCommandLineInfo` (0x0049632A, 123B) -- MFC library function: CCommandLineInfo::~CCommandLineInfo(). N/A
- `FUN_004963a5` (0x004963A5, 15B) -- Sub-destructor: destroys _Timevec at offset 0x1d4. N/A
- `FUN_004963b4` (0x004963B4, 15B) -- Sub-destructor: calls 0x0040f570 (list cleanup). N/A
- `FUN_004963c3` (0x004963C3, 15B) -- Sub-destructor: calls 0x0040f570 (list cleanup). N/A

## FW -- Framework, continued (14 more functions)

- `FUN_004963d2` (0x004963D2, 15B) -- Sub-destructor: calls FUN_005bd915. N/A
- `FUN_004963e1` (0x004963E1, 9B) -- Sub-destructor: calls 0x0044cba0. N/A
- `FUN_004963f4` (0x004963F4, 14B) -- SEH frame epilog. N/A
- `FUN_00495be2` (0x00495BE2, 12B) -- Sub-destructor: calls FUN_005bd915 (bitmap cleanup). N/A
- `FUN_00495bee` (0x00495BEE, 12B) -- Sub-destructor: calls FUN_005c656b (DC cleanup). N/A
- `FUN_00495bfa` (0x00495BFA, 22B) -- Sub-destructor: vector destructor for CString array. N/A
- `FUN_00495c10` (0x00495C10, 12B) -- Sub-destructor: calls 0x0043c520 (list cleanup). N/A
- `FUN_00495c26` (0x00495C26, 15B) -- SEH frame epilog. N/A
- `FUN_00495dcf` (0x00495DCF, 12B) -- Sub-destructor: calls FUN_005bd915. N/A
- `FUN_00495ddb` (0x00495DDB, 12B) -- Sub-destructor: calls FUN_005c656b. N/A
- `FUN_00495de7` (0x00495DE7, 12B) -- Sub-destructor: calls FUN_005cde4d (CString destructor). N/A
- `FUN_00495dfd` (0x00495DFD, 15B) -- SEH frame epilog. N/A
- `FUN_00496100` (0x00496100, 12B) -- Sub-destructor: calls FUN_005c656b. N/A
- `FUN_00496116` (0x00496116, 15B) -- SEH frame epilog. N/A

**(44 FW functions total)**

## UI -- User Interface (59 functions)

### Diplomacy Intelligence Report Screen (3 functions)

- `FUN_00490590` (0x00490590, 365B) -- Intelligence report list initialization: sets up scrollable list of civs for the intelligence advisor screen, copies civ entries to display array, initializes scroll position. N/A (UI list management)
- `FUN_004906fd` (0x004906FD, 5344B) -- Intelligence report rendering: draws the full intelligence report screen for the selected civ. Shows government type, attitude, trade goods, military comparison (attack/defense/hit points), prerequisite requirements, upgrade comparison. Uses extensive GDI text drawing (FUN_005c0f57) and icon blitting (FUN_005cef31). Reads from government table at 0x00627cc8 (24-byte stride). N/A (rendering / text layout)
- `FUN_00491c20` (0x00491C20, 321B) -- Intelligence report item selection: handles clicking on a civ in the list. Sets scroll position, updates title string, redraws report via FUN_004906fd. N/A (UI click handler)

### Intelligence Report Helpers (1 function)

- `FUN_00491d61` (0x00491D61, 86B) -- Lookup civ slot index in active player list: iterates DAT_006a74bc array searching for a civ matching param_1, returns index or -1. N/A (UI helper for intelligence screen)

### Multiplayer Chat System (9 functions)

- `FUN_004923f0` (0x004923F0, 849B) -- Chat command handler: dispatches chat events (0x2B0=next civ, 0x2B1=leader+civ name, 0x2B2/3/4=chat macros from chatmac1/2/3.txt). Filters skipped civs (dead, self, eliminated). Sends via network messages. N/A (multiplayer chat UI)
- `FUN_0049275a` (0x0049275A, 270B) -- Chat macro file reader: opens chatmacN.txt file, reads a specific line (indexed by counter), copies text to message buffer DAT_00679640. N/A (chat macro I/O)
- `FUN_00492ab0` (0x00492AB0, 37B) -- Send message method wrapper: calls send_msg_2F47 on member field at offset 0x1c. N/A (network send)
- `FUN_00492ae0` (0x00492AE0, 43B) -- Send message method wrapper: calls send_msg_3035 with text parameter. N/A (network send)
- `FUN_00492b20` (0x00492B20, 47B) -- Send message method wrapper: calls send_msg_2DC6 with selection range. N/A (network send)
- `FUN_00493b10` (0x00493B10, 145B) -- Get civ title string: returns ruler title from civ data at 0x0064bcfa (242-byte per-civ records). Falls back to string resource if government type index >= 0. N/A (string formatting for chat/UI)
- `FUN_00493ba6` (0x00493BA6, 210B) -- Get leader name with title: complex lookup through government table and leader personality indices to build "Title Name" string. N/A (string formatting)
- `FUN_00493c7d` (0x00493C7D, 145B) -- Get civ adjective: returns civilization adjective string from per-civ data at offset 0x18 in 242-byte records, or falls back to string resource. N/A (string formatting)
- `FUN_00493d13` (0x00493D13, 145B) -- Get civ noun: returns civilization noun/name from per-civ data at offset 0x30, or falls back to string resource. N/A (string formatting)

### Advisor Herald Screen (14 functions)

- `FUN_00493e50` (0x00493E50, 51B) -- Play herald animation: if herald active, calls 0x0046e020 to play video DAT_0062ca48. N/A (video playback)
- `FUN_00493e83` (0x00493E83, 104B) -- Open herald screen: constructs CCommandLineInfo, calls FUN_0049621d (constructor), FUN_00496402 (init display), FUN_004965ff (finish). N/A (dialog initialization)
- `FUN_00493eeb` (0x00493EEB, 12B) -- Destructor helper for CCommandLineInfo in herald dialog. N/A
- `FUN_00493f01` (0x00493F01, 14B) -- SEH epilog for herald dialog. N/A
- `FUN_00493f0f` (0x00493F0F, 546B) -- Herald system initialization: creates advisor dialog (0x108c bytes), loads video resources for civ-specific herald, initializes animation timers. Uses government-type-specific video IDs (DAT_0062ca48 = 0x70 + government*4). N/A (video/animation setup)
- `FUN_00494148` (0x00494148, 166B) -- Herald system shutdown: stops animation, releases video resources, resets timers. N/A (cleanup)
- `FUN_004941ee` (0x004941EE, 181B) -- Herald reaction to proposal: if herald active and reaction type is 2/3/4, and proposal value is within government-specific range, set reaction type and call FUN_00496125 (play animation). N/A (advisor animation logic)
- `init_tile` (0x004944BB, 585B) -- Herald tile initialization: loads civ2_mk.dll, sets up government-specific tile backgrounds, military art, science tree, portrait, and optionally video resources. Displays MessageBox on failure. N/A (dialog resource loading)
- `FUN_00494704` (0x00494704, 236B) -- Herald display refresh: resizes windows, copies background bitmaps, starts animation with government-specific ranges. N/A (window layout)
- `FUN_004947f0` (0x004947F0, 158B) -- Herald display teardown: destroys bitmaps, clears windows, resets layout. N/A (window cleanup)
- `FUN_0049488e` (0x0049488E, 88B) -- Init herald tile bitmap: creates 64x64 bitmap via FUN_005bd65c, loads sprite 299 via FUN_005bf5e1. N/A (bitmap init)
- `FUN_004948e6` (0x004948E6, 99B) -- Init herald background: creates background surface at dialog dimensions from 0x006a8c00, copies to member offset 0x1dc. N/A (background rendering)
- `FUN_00494949` (0x00494949, 497B) -- Init herald main art: creates scaled bitmap (dialog_w-640)/3, loads DLL sprite (200+leader), sets up palette and tile grid. N/A (sprite loading)

### Herald Military Advisor (2 functions)

- `FUN_00494b5f` (0x00494B5F, 530B) -- Init military advisor tab: loads leader-specific military portrait sprites, renders into grid layout. N/A (sprite rendering)
- `FUN_00494dae` (0x00494DAE, 124B) -- Recursive tech tree depth counter: recursively counts prerequisite chain depth for a tech (used to sort techs by complexity on science advisor). Caps at 0x65 (101). N/A (tech tree UI helper)

### Herald Science Advisor (2 functions)

- `FUN_00494e2a` (0x00494E2A, 3512B) -- Init science advisor tab: builds top-6 sorted tech list by prerequisite depth (insertion sort), renders tech names with leader-specific colors, handles multi-word name wrapping in 0x3A-wide rectangles. If a tech is known, draws with shadow offset; if unknown, skips. Complex text layout with abbreviation/truncation logic. N/A (rendering)
- `FUN_00495c35` (0x00495C35, 410B) -- Init portrait tab: loads leader-specific portrait from DLL (0xDC + leader slot), renders into dialog panel. N/A (sprite rendering)

### Herald Video/Animation (4 functions)

- `FUN_00495e0c` (0x00495E0C, 756B) -- Init video panel: loads civ2_kings\*.avi file, initializes video playback window, sets palette, starts animation. N/A (video playback)
- `FUN_00496125` (0x00496125, 248B) -- Play herald reaction animation: based on reaction type (0=idle, 2/3/4=reaction), plays appropriate animation frame or video clip. N/A (animation control)
- `FUN_0049621d` (0x0049621D, 190B) -- Herald dialog constructor: creates CDialog-based object with sub-controls (CDC×2, CPropertyPage), sets vtable pointer. N/A (MFC construction)
- `FUN_004965ff` (0x004965FF, 197B) -- Herald dialog finalization: cleanup after user closes dialog, copies selected portrait index back to game state at 0x0064ca92. N/A (dialog result handling)

### Herald Diplomacy Screen Layout (5 functions)

- `FUN_00496402` (0x00496402, 177B) -- Init diplomacy dialog: creates background bitmap, sets up OK/Cancel buttons, installs click handler (FUN_00496c3c), calls FUN_004966c4 to render content. N/A (dialog setup)
- `FUN_004964b3` (0x004964B3, 332B) -- Create OK/Cancel buttons: calculates positions using DAT_0063359c (scaling factor), creates two buttons at calculated rects, installs click handler FUN_00496ecf. N/A (button layout)
- `FUN_004966c4` (0x004966C4, 1400B) -- Render diplomacy grid: loads DLL sprite (0xD3 or 0xD2 depending on government flags), renders 7x3 grid of 91x111 clickable civ slots with border decoration, title text. Complex rect math with scaling factors. N/A (grid rendering)
- `FUN_00496c3c` (0x00496C3C, 545B) -- Diplomacy grid click handler: converts pixel coordinates to grid slot index (7 columns x 3 rows), highlights clicked slot, unhighlights previous. N/A (click detection)
- `FUN_00496e5d` (0x00496E5D, 114B) -- Diplomacy grid double-click handler: calls FUN_00496c3c (single click), then if valid slot, calls FUN_00496ecf(100) to accept. N/A (double-click handler)

### Diplomacy Dialog Accept/Cancel (1 function)

- `FUN_00496ecf` (0x00496ECF, 195B) -- Diplomacy dialog OK handler: if button ID is 0x65 (OK), saves selected slot to member at offset 0x1e4, adjusts by +21 if government has advisor count flag. Calls CRichEditDoc::InvalidateObjectCache. N/A (dialog result handler)

### Herald Dialog Helper Objects (5 functions)

- `FUN_00497bf0` (0x00497BF0, 57B) -- Destructor+delete for herald dialog: calls FUN_004943c9 (destructor), then operator delete if param_1 bit 0 set. N/A
- `FUN_00497c40` (0x00497C40, 52B) -- Thunk: calls FUN_005dea9e (video palette init). N/A
- `FUN_00497c90` (0x00497C90, 28B) -- Accessor: returns this+0x24 (rect member). N/A
- `FUN_00497cc0` (0x00497CC0, 43B) -- Bitmap copy: calls FUN_005bc3bf with member bitmap. N/A
- `FUN_00497d00` (0x00497D00, 43B) -- Bitmap border: calls FUN_005bd248 with border width. N/A

### Herald Button/Control Creation (1 function)

- `FUN_00497d40` (0x00497D40, 68B) -- Create button control: stores style and icon pointer, calls 0x0040f680 (CButton::Create). N/A

### File Read/Write Helpers (2 functions)

- `FUN_00497da0` (0x00497DA0, 111B) -- Read null-terminated string from file: reads up to 0x4F chars until null, consumes trailing char (0x1a). Used for password file I/O. N/A (file I/O)
- `FUN_00497e0f` (0x00497E0F, 83B) -- Write null-terminated string to file: writes chars until null, appends 0x1a (EOF marker). N/A (file I/O)

### Sound/Music Resource Management (7 functions)

- `FUN_00497ea0` (0x00497EA0, 251B) -- Open sound resource: releases existing resource if loaded, creates new DirectSound buffer via FUN_005dce4f, initializes play position tracking. N/A (DirectSound management)
- `FUN_00497fa0` (0x00497FA0, 83B) -- Initialize sound struct (no-alloc): sets up sound struct fields directly from provided buffer/handle. N/A (sound resource init)
- `FUN_00497ff3` (0x00497FF3, 107B) -- Lock sound buffer: calls FUN_005dcdf9 to lock DirectSound buffer for writing, error callback on failure. N/A (DirectSound)
- `FUN_0049805e` (0x0049805E, 36B) -- Clear sound pointers: zeroes buffer and handle fields. N/A
- `FUN_00498082` (0x00498082, 39B) -- Reset sound playback position: resets play offset to 0, restores remaining size. N/A
- `FUN_004980a9` (0x004980A9, 67B) -- Unlock sound buffer: calls FUN_005dce29 to unlock DirectSound buffer. N/A
- `FUN_004980ec` (0x004980EC, 109B) -- Release sound resource: unlock + release buffer via FUN_005dce96, clear all tracking fields. N/A

### Sound Playback (1 function)

- `FUN_00498159` (0x00498159, 199B) -- Consume sound data: validates requested size against remaining buffer, locks if needed, advances play offset, returns data pointer. N/A (audio streaming)

**(59 UI functions total)**

## GL -- Game Logic (6 functions)

### Diplomacy Contact List Management (6 functions)

These functions manage the per-civ contact/intelligence lists stored in the 0x594-byte per-civ records. Each civ has a 48-entry "main" contact list and a 16-entry "recent" contact list. Each entry is a 6-byte record: {x:short, y:short, type:byte, priority:byte}.

#### `FUN_00492b60` -- Toggle contact record sign (181B)
**Classification: GL**
**JS equivalent**: None directly. This manipulates the sign bit of the priority byte in contact records. Used during turn processing to flip seen/unseen status on diplomatic intelligence entries. The diplomacy contact list concept (48+16 entries of location/type/priority) is not represented in our game model at all.

**No discrepancy** -- this is internal AI/diplomatic intelligence tracking infrastructure that our engine does not model. It affects which locations the AI "knows about" for strategic targeting. Our AI uses a different approach (scanning game state directly).

#### `FUN_00492c15` -- Remove contact records within range (259B)
**Classification: GL**
**JS equivalent**: None. Removes all contact entries of a given type within a specified distance of a coordinate. Used when a city is destroyed or a diplomatic event invalidates nearby intelligence.

**No discrepancy** -- contact list infrastructure not modeled.

#### `FUN_00492d18` -- Shift contact list entries up (184B)
**Classification: GL**
**JS equivalent**: None. Recursive helper to shift main contact list entries (48-entry array) to make room for insertion at a specific index. Standard array shift-up.

**No discrepancy** -- contact list infrastructure not modeled.

#### `FUN_00492dd0` -- Shift recent contact list entries down (144B)
**Classification: GL**
**JS equivalent**: None. Shifts recent contact list entries (16-entry array) down to make room for insertion. Iterates from index 14 down to the target position.

**No discrepancy** -- contact list infrastructure not modeled.

#### `FUN_00492e60` -- Query max contact priority for location+type (443B)
**Classification: GL**
**JS equivalent**: None. Scans all 48 main contact entries for a given civ, finding the maximum absolute priority value for entries matching (x, y, type). Returns 0 if no match.

**No discrepancy** -- contact list infrastructure not modeled.

#### `FUN_0049301b` -- Add/update main contact entry (958B)
**Classification: GL**
**JS equivalent**: None. Inserts or updates a contact record in the 48-entry main list. If priority exceeds existing, entry is kept (skip). If not found in list, finds insertion point by priority and shifts entries. Also redirects nearby caravans/freight units of the same owner to the new contact location (GOTO order = 0x0B). This is the most complex contact list function.

**Notable detail**: When the contact is of type 2 (ceasefire) or 3 (peace treaty), AND the civ is the "active player" (DAT_00655b05), AND the civ is alive but not human, the function scans all units and redirects caravans/freight (unit role type from 0x0064b1ca) to the new contact location if they are within range. This is AI trade route optimization during diplomacy events.

**No discrepancy** -- contact list infrastructure not modeled.

### Diplomacy Contact List Turn Processing (2 functions)

#### `FUN_004933f2` -- Add/update recent contact entry (518B)
**Classification: GL**
**JS equivalent**: None. Same pattern as FUN_0049301b but for the 16-entry recent contact list. No caravan redirect logic.

**No discrepancy** -- contact list infrastructure not modeled.

#### `FUN_00493602` -- End-of-turn contact list processing (365B)
**Classification: GL**
**JS equivalent**: None. For each main contact entry: if priority is negative, mark as removed (0xFF). Then toggle sign on all entries via FUN_00492b60. Then merge all recent contact entries into the main list via FUN_0049301b.

**No discrepancy** -- contact list infrastructure not modeled.

### Contact List Reset (1 function)

#### `FUN_0049376f` -- Clear recent contact list (115B)
**Classification: GL**
**JS equivalent**: None. Zeros out all 16 recent contact entries for a given civ.

**No discrepancy** -- contact list infrastructure not modeled.

**(9 GL functions total -- 6 contact list + 2 turn processing + 1 reset)**

## GL -- Game Logic: Password System (6 functions)

#### `FUN_00498310` -- Password check gate (90B)
**Classification: GL (multiplayer)**
**JS equivalent**: None. Decrypts password table, copies player's password, re-encrypts, then if password is empty calls FUN_0049836a to set a new one. Used at turn start for hot-seat games.

**No discrepancy** -- password system is not applicable to our WebSocket architecture (server-authoritative authentication).

#### `FUN_0049836a` -- Set/change password dialog (614B)
**Classification: GL (multiplayer)**
**JS equivalent**: None. Full password set/change flow: allocates 0x4000-byte buffer, decrypts passwords, prompts user. If password exists, validates old password first. Stores result, re-encrypts.

**No discrepancy** -- password system N/A.

#### `FUN_004985d0` (0x004985D0, 12B) -- Thunk: dialog buffer cleanup. N/A (FW-like)
#### `FUN_004985e6` (0x004985E6, 14B) -- SEH epilog. N/A (FW-like)

#### `FUN_004985f4` -- Validate password (341B)
**Classification: GL (multiplayer)**
**JS equivalent**: None. Password validation dialog: prompts for password, compares against stored encrypted password using _strcmp. Shows error message on mismatch.

**No discrepancy** -- password system N/A.

#### `FUN_0049875f` (0x0049875F, 12B) -- Thunk: dialog buffer cleanup. N/A (FW-like)
#### `FUN_00498775` (0x00498775, 15B) -- SEH epilog. N/A (FW-like)

#### `FUN_00498784` -- Initialize password table (167B)
**Classification: GL (multiplayer)**
**JS equivalent**: None. Fills 255-byte password table with random data, then clears first byte of each 32-byte slot (8 players), clears associated flags. Then encrypts the table via FUN_004988b8.

**No discrepancy** -- password system N/A.

#### `FUN_0049882b` -- Scan password status flags (141B)
**Classification: GL (multiplayer)**
**JS equivalent**: None. Decrypts password table, scans each player's 32-byte slot: if first byte is NUL, clear password flags; otherwise set them. Re-encrypts.

**No discrepancy** -- password system N/A.

#### `FUN_004988b8` -- Encrypt password table (139B)
**Classification: GL (multiplayer)**
**JS equivalent**: None. XOR cipher: for each byte in the 256-byte table, apply: `byte = ((byte >> 3) & 0x1F | (prev << 5)) ^ index`. Simple substitution cipher.

**No discrepancy** -- password system N/A.

#### `FUN_00498943` -- Decrypt password table (144B)
**Classification: GL (multiplayer)**
**JS equivalent**: None. Reverse of encryption: for each byte (reverse order): `byte ^= index; byte = byte << 3 | (next >> 5) & 7`. Inverts the encrypt operation.

**No discrepancy** -- password system N/A.

#### `FUN_004989d3` -- Format password dialog text (137B)
**Classification: GL (multiplayer)**
**JS equivalent**: None. Copies player name from per-civ records (0x0064bcfa + player*0xF2), appends dialog resource string, allocates buffer for dialog display.

**No discrepancy** -- password system N/A.

#### `FUN_00498a5c` -- Password gate dispatcher (192B)
**Classification: GL (multiplayer)**
**JS equivalent**: None. Main entry point for player authentication at turn start. If password not set and game type is hot-seat (DAT_00655b02 == 2), prompts to set password. If password exists, loops validate-password until success or cancel. Returns 0 (cancel) or 1 (success).

**No discrepancy** -- password system N/A.

**(12 password functions total -- but 4 are FW-like thunks/epilogs counted above; 8 are GL-classified)**

## GL -- Game Logic: City Preferences (1 function)

#### `load_city_preferences` (0x00498D40) -- Load CITYPREF.TXT (326B)
**Classification: GL**
**JS equivalent**: `engine/reference/advisor-formulas.js` (reference only, not active code)

Loads two sections from CITYPREF.TXT:
1. **NODEFEND**: If found, sets DAT_0062ccc4 = 1 (the "nodefend" flag). When set, human player cities skip the AI auto-defense unit requirement check.
2. **AUTOBUILD**: Reads building names line by line, matches against building string table (up to 0x26=38 buildings), stores matching building IDs in DAT_00673d70 array (up to 0x20=32 entries). These are the "auto-build" preferences that the AI applies to human player cities.

The NODEFEND flag is read in FUN_00498e8b (the production AI) where it affects whether defensive units are force-built in human cities under AI autobuild. The AUTOBUILD list is also consumed by FUN_00498e8b as a priority override.

**No discrepancy** -- CITYPREF.TXT is an optional local file for human-player city automation preferences. Our engine does not support autobuild for human players (they make production choices via the UI). If autobuild support were added, this preference loading would need implementing.

## GL -- Game Logic: AI Production Selection (1 function)

#### `FUN_00498e8b` -- AI city production advisor (29,400B / ~2100 lines)
**Classification: GL**
**JS equivalent**: `engine/ai/prodai.js` -- `generateProductionActions()`, `scoreUnit()`, `scoreBuilding()`, `scoreWonder()`

This is the single most complex function in the entire binary. It takes a city index and two optional output pointers, and returns the recommended build item index (negative = building/wonder, positive = unit type).

**High-level structure**:
1. **Context gathering** (~lines 4120-4280): Determines city's continent, city type (coastal/landlocked/capital), counts nearby military units, diplomatic threats, wonders owned
2. **Settler/expansion check** (if civ slot 0 = barbarians): direct unit returns for barbarian cities
3. **Building scoring** (~lines 4650-5120): Iterates buildings 1-38, scores each based on city needs (happiness, trade, defense, growth), with complex modifiers for government type, war posture, threat level
4. **Wonder scoring** (~lines 5132-5525): Iterates wonders 0-27, scores based on strategic value, nearby enemies, government bonuses, with "is someone else building it" checks
5. **Unit scoring** (~lines 5526-6050): Iterates unit types 0-61, scores military units based on threat level, existing army composition, production capacity, continental strategy
6. **Autobuild override** (~lines 5121-5131): If human player has CITYPREF.TXT autobuild entries, forces those items as top priority
7. **Final selection**: Applies cross-type penalty, returns best scoring item

**Comparison with prodai.js**:

The JS implementation is a faithful high-level port of this function. Both systems:
- Score all buildable items (units, buildings, wonders) for each city
- Use threat assessment to weight military vs. economy
- Consider existing units in the city's continent/territory
- Apply government-specific modifiers
- Handle cross-type production switch penalties

**DISCREPANCY 1: Building scoring formula differences (Enhancement-tier)**
The binary's building scoring uses a complex formula:
```
score = (((-(isWar == isDefenseRelevant) & 0xFFFFFFF6) + 0x14) * score * 3) / (gov_bonus + 3)
```
This "war/defense relevance" modifier penalizes non-defense buildings during wartime by factor of ~0.47 (10/20 * 3/(bonus+3)) vs. 1.0 for defense buildings. The JS `scoreBuilding` function in prodai.js applies a simpler `threatMultiplier` that does not use this exact binary formula. The net effect is similar but not identical.

**DISCREPANCY 2: CITYPREF.TXT autobuild override not implemented (Enhancement-tier)**
The binary checks `DAT_0062ccc0` (autobuild list count) and `DAT_00673d70` (autobuild building ID array) for human player cities under AI control. If a human player sets autobuild preferences in CITYPREF.TXT, those buildings take absolute priority. The JS prodai.js has no equivalent -- but this only matters for "AI auto-manage" of human cities, which is not currently a feature.

**DISCREPANCY 3: Contact list "threat from contact records" not modeled (Enhancement-tier)**
The binary reads `local_3c` -- a count of "type 1" (war threat) contact records on the city's continent -- and uses it as a threat multiplier that increases military unit priority. The JS uses its own `findNearbyEnemies()` function to assess local threats, which is functionally similar but derives from direct unit scanning rather than the accumulated contact intelligence system.

---

## Function Count Verification

| Category | Count |
|----------|-------|
| FW -- Framework | 44 |
| UI -- User Interface | 59 |
| GL -- Game Logic (contact lists) | 9 |
| GL -- Game Logic (password system) | 8 |
| GL -- Game Logic (city preferences) | 1 |
| GL -- Game Logic (AI production) | 1 |
| GL -- Game Logic (password FW-like) | 2 |
| **Total** | **124** |

Note: FUN_004985d0, FUN_004985e6, FUN_0049875f, FUN_00498775 are password-system thunks/epilogs. They are FW-like in nature but listed under the password section for contextual grouping. Counting them in FW would give FW=48, UI=59, GL=17 = 124.

---

## Discrepancy Summary

| # | Function | Discrepancy | Severity | JS File |
|---|----------|-------------|----------|---------|
| 1 | FUN_00498e8b | Building scoring war/defense relevance formula differs from binary's bitwise modifier | Enhancement | engine/ai/prodai.js |
| 2 | FUN_00498e8b | CITYPREF.TXT autobuild override not implemented (human city auto-management) | Enhancement | engine/ai/prodai.js |
| 3 | FUN_00498e8b | Contact list threat intelligence not modeled (uses direct unit scanning instead) | Enhancement | engine/ai/prodai.js |

All three are enhancement-tier: the JS engine already has functionally equivalent behavior through different implementation approaches. None are bugs.
