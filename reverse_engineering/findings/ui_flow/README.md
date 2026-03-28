# UI Flow

Documents the sequence of dialogs and screens during game startup and play.
Each step links to the relevant dialog doc.

## New Game Flow

| # | Dialog Title | HWND | Size | Position | Doc |
|---|---|---|---|---|---|
| 1 | Title Screen | 0x00050B48 | 1936×1048 | fullscreen | `dialogs/title_screen.md` |
| 2 | Select Size of World | 0x000A09F8 | 506×184 | bottom-center (710,824) | `dialogs/new_game_01_select_size_of_world.md` |
| 3 | Select Difficulty Level | 0x000B09F8 | 506×280 | bottom-left (161,728) | `dialogs/new_game_02_select_difficulty_level.md` |
| 4 | Select Level Of Competition | 0x000C09F8 | 506×248 | bottom-right (1258,760) | `dialogs/new_game_03_select_level_of_competition.md` |
| 5 | Select Level Of Barbarian Activity | 0x000D09F8 | 506×216 | bottom-left (161,792) | `dialogs/new_game_04_select_level_of_barbarian_activity.md` |
| 6 | Select Game Rules | 0x000E09F8 | 506×152 | bottom-right (1258,856) | `dialogs/new_game_05_select_game_rules.md` |
| 7 | Select Gender | 0x000F09F8 | 506×152 | bottom-center (710,856) | `dialogs/new_game_06_select_gender.md` |
| 8 | Select Your Tribe | 0x001009F8 | 926×312 | (500,696) | `dialogs/new_game_07_select_your_tribe.md` |
| 9 | Please Enter Your Name | 0x001109F8 | 686×126 | bottom-center (620,882) | `dialogs/new_game_08_please_enter_your_name.md` |
| 10 | Select Your City Style | 0x001209F8 | 506×292 | bottom-right (1258,716) | `dialogs/new_game_09_select_your_city_style.md` |
| 11 | In the Beginning . . . | 0x001005AE | 750×172 | bottom-center (588,867) | `dialogs/new_game_10_in_the_beginning.md` |
| 12 | Main Game Window (Turn 1) | 0x00050B48 | 1936×1048 | fullscreen | `dialogs/main_game_window.md` |

### Dialog Sequence Notes

- Dialogs 2–10 each replace a 606×279 artwork banner child window (cycles position: center→right→left→right→left→center→center→center→left)
- Dialog 8 (Select Your Tribe) is the widest setup dialog at 926px — 3 columns of 7 civs
- Dialog 9 (Enter Name) is the only one with an `MSEditBoxClass` text input; all others use `MSControlClass`
- Dialog 10 (City Style) is the only one where radio buttons render inline artwork (city icons, 276×48)
- Dialog 11 (In the Beginning) has no Cancel — game setup is committed at this point
- HWND pattern for setup dialogs: `0x000X09F8` (X=A..F for dialogs 2–7), `0x001009F8` (tribe), `0x001109F8` (name), `0x001209F8` (city style)
- World generation fires between dialog 10 OK and dialog 11 appearing (~4.3ms burst of memory writes)

### World Generation Event

Fires between "Select Your City Style" OK and "In the Beginning" dialog (~4.3ms burst).
Full analysis: `memory_map/init_sequence.md`

Key facts:
- Player = **Civ 5 (HUMAN / Americans)**
- Player starts with **2 Settlers** at (39,9) — Deity difficulty
- Map: **80×50**
- Turn order: Civ 0 → Civ 4 → Civ 5 (human)

### Artwork Banner Rotation (dialogs 2–10)

| Dialog | Image | X Position |
|--------|-------|------------|
| Select Size of World | Aerial city panorama | 660 (center) |
| Select Difficulty Level | Stone idol / Olmec head | 1160 (right) |
| Select Level of Competition | Classical figures procession | 161 (left) |
| Select Barbarian Activity | Barbarian raid / cavalry | 1160 (right) |
| Select Game Rules | Naval battle scene | 161 (left) |
| Select Gender | Ottoman/Middle Eastern figures | 660 (center) |
| Select Your Tribe | Diverse indigenous figures | 660 (center) |
| Please Enter Your Name | (same as tribe — no change) | 660 (center) |
| Select Your City Style | Chinese imperial building | 161 (left) |

## Notes

- Dialogs are Win32 top-level popups (class `MSWindowClass` / `MSControlClass`)
- Button/label text is NOT exposed via GetWindowTextW — drawn by Civ2 via DrawTextA
- No ctrlIDs anywhere — controls identified by z-order and position only
- Use `sniff-windows.py` to snapshot window state at any point
- Use `sniff-game.py` for continuous memory polling (~4500 Hz)
