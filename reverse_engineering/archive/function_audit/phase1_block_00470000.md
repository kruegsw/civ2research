# Phase 1 Audit: block_00470000.c (0x004702E0 - 0x00482327)

## Overview
Address range: 0x00470000 - 0x0047FFFF (plus tail into 0x0048xxxx)
Source file: `block_00470000.c` (6909 lines)
Major domains: **Video/cutscene playback**, **Save/Load game**, **Map viewport rendering**, **Network multiplayer polling**

---

### Cluster: Defeat/Victory Cutscene — Loser AVI Player (0x004702E0 - 0x00470C1C)

These functions manage the "loser" cutscene (AVI playback when a civ is defeated). They allocate a 0x137C-byte object, load `civ2art.dll` and `loser.avi`, display text from ARCHAEOLOGISTS sections, and handle cleanup.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004702E0 | medium | FUN_004702e0 | play_loser_video | param_1: civ_id | void | Allocates cutscene object (0x137C bytes), calls load_civ2_art, shows ARCHAEOLOGISTS text, then cleans up | HIGH |
| 0x004703D4 | small | FUN_004703d4 | ctor_cutscene_object | (this=ECX) | this | Constructor: initializes 5 sub-objects, sets +0xF18=0. Identical pattern to FUN_00471362 | MEDIUM |
| 0x004704EC | small | FUN_004704ec | dtor_cutscene_object | (this=ECX) | void | Destructor: tears down 5 sub-objects in reverse order | MEDIUM |
| 0x0047056B | stub | FUN_0047056b | dtor_sub5 | void | void | Calls FUN_005bd915 (GDI bitmap destructor) | LOW |
| 0x0047057A | stub | FUN_0047057a | dtor_sub4 | void | void | Calls thunk_FUN_0043c520 (string destructor) | LOW |
| 0x00470589 | stub | FUN_00470589 | dtor_sub3_timevec | void | void | Destroys _Timevec at +0xF14 | LOW |
| 0x00470598 | stub | FUN_00470598 | dtor_sub2 | void | void | Calls FUN_005dd1a0 | LOW |
| 0x004705A7 | stub | FUN_004705a7 | dtor_sub1 | void | void | Calls FUN_005c656b | LOW |
| 0x004705B6 | stub | FUN_004705b6 | dtor_sub0 | void | void | Calls thunk_FUN_0044ca60 | LOW |
| 0x004705C9 | stub | FUN_004705c9 | seh_cleanup_loser | void | void | SEH frame restoration | LOW |
| 0x004705D7 | large | load_civ2_art_004705d7 | load_loser_art | param_1: civ_id | bool | Opens "loser.avi" and "civ2art.dll" via OpenFile, creates video surface (640x480 area), sets up rect(40,100,600,480). String "VFWNOTREGISTERED" on error. | HIGH |
| 0x004708DB | large | FUN_004708db | show_loser_text | (this=ECX) | void | Displays ARCHAEOLOGISTS text sections (3 pages) with shadow text rendering, uses DAT_00655b02 (save format version). References tech table via DAT_00627684 | HIGH |
| 0x00470C0C | stub | FUN_00470c0c | noop_loser_callback | void | void | Empty function (return only) — virtual callback placeholder | LOW |
| 0x00470C1C | large | FUN_00470c1c | show_loser_text_page3 | void | void | Displays ARCHAEOLOGISTS3 text page with CharUpperA, positioned at (0xE5,0x4C,200,0x85). Uses DAT_0062b804 (loser cutscene object) | HIGH |
| 0x00471020 | small | FUN_00471020 | scalar_deleting_dtor_loser | param_1: flags | this | Calls destructor, optionally frees memory | MEDIUM |

### Cluster: Defeat/Victory Cutscene — Winner/Centauri (0x004710D0 - 0x004728C0)

These functions manage the "winner" cutscene — the Alpha Centauri arrival sequence and the scenario defeat screen. Same 0x137C-byte object pattern.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00471070 | stub | GetActiveView (MFC) | FRAMEWORK | — | — | MFC library: CRichEditCntrItem::GetActiveView | HIGH |
| 0x004710A0 | stub | GetActiveView (MFC) | FRAMEWORK | — | — | MFC library: duplicate of above | HIGH |
| 0x004710D0 | large | FUN_004710d0 | play_winner_video | param_1: civ_id | void | Allocates winner cutscene object. If param<0 calls load_civ2_art_00471dd8 (beaten path). Otherwise loads CENTAURI sections, formats "0,000" score, shows text | HIGH |
| 0x0047132E | stub | FUN_0047132e | close_dialog_winner | void | void | Calls thunk_FUN_0059df8a | LOW |
| 0x00471354 | stub | FUN_00471354 | seh_cleanup_winner | void | void | SEH frame restoration | LOW |
| 0x00471362 | small | FUN_00471362 | ctor_cutscene_object_2 | (this=ECX) | this | Same constructor pattern as FUN_004703d4 | MEDIUM |
| 0x0047147A | small | FUN_0047147a | dtor_cutscene_object_2 | (this=ECX) | void | Same destructor pattern as FUN_004704ec | MEDIUM |
| 0x004714F9 | stub | FUN_004714f9 | dtor2_sub5 | void | void | GDI bitmap destructor | LOW |
| 0x00471508 | stub | FUN_00471508 | dtor2_sub4 | void | void | String destructor | LOW |
| 0x00471517 | stub | FUN_00471517 | dtor2_sub3_timevec | void | void | _Timevec destructor at +0xF14 | LOW |
| 0x00471526 | stub | FUN_00471526 | dtor2_sub2 | void | void | Calls FUN_005dd1a0 | LOW |
| 0x00471535 | stub | FUN_00471535 | dtor2_sub1 | void | void | Calls FUN_005c656b | LOW |
| 0x00471544 | stub | FUN_00471544 | dtor2_sub0 | void | void | Calls thunk_FUN_0044ca60 | LOW |
| 0x00471557 | stub | FUN_00471557 | seh_cleanup_winner2 | void | void | SEH frame restoration | LOW |
| 0x00471565 | large | load_civ2_art_00471565 | load_winner_art | param_1: civ_id | bool | Opens "civ2_video\winwin.avi" and "civ2\civ2art.dll" via thunk_FUN_00564713 (CD-ROM search). Creates video surface, sets rect(2,100,0x27E,0x1E0). String "VFWNOTREGISTERED" on error | HIGH |
| 0x00471856 | large | FUN_00471856 | show_winner_text | (this=ECX) | void | Displays CENTAURI text (5 pages for civ info: leader graphic, score "0,000", nation name). Shadow text at color 0xF1 (gold). 3 text-page loop from CENTAURI sections | HIGH |
| 0x00471BFE | stub | FUN_00471bfe | noop_winner_callback1 | void | void | Empty function — virtual placeholder | LOW |
| 0x00471C14 | stub | FUN_00471c14 | noop_winner_callback2 | void | void | Empty function — virtual placeholder | LOW |
| 0x00471C2A | large | FUN_00471c2a | show_centauri_scrolltext | void | void | Renders CENTAURI3 scrolling text with set_text_style, measures text width, draws line-by-line with auto-scroll. Uses DAT_0062b87c (winner object) | HIGH |
| 0x00471DB7 | stub | FUN_00471db7 | invalidate_winner_cache | void | void | InvalidateObjectCache on winner+0x534 | LOW |
| 0x00471DD8 | xlarge | load_civ2_art_00471dd8 | show_beaten_cutscene | param_1: civ_id | void | "Beaten" path: creates offscreen surface (640x240), loads "civ2\civ2art.dll", shows CENTAURI_BEATEN text (5 pages). Standalone — includes own ctor/dtor chain | HIGH |
| 0x00472393 | stub | FUN_00472393 | beaten_dtor_sub4 | void | void | String destructor | LOW |
| 0x0047239F | stub | FUN_0047239f | beaten_dtor_sub3 | void | void | GDI bitmap destructor | LOW |
| 0x004723AB | stub | FUN_004723ab | beaten_dtor_sub2 | void | void | Surface destructor | LOW |
| 0x004723B7 | stub | FUN_004723b7 | beaten_dtor_sub1 | void | void | Calls thunk_FUN_0044ca60 | LOW |
| 0x004723C3 | stub | FUN_004723c3 | beaten_dtor_sub0_timevec | void | void | _Timevec destructor at EBP-0x4D4 | LOW |
| 0x004723CF | stub | FUN_004723cf | beaten_dtor_base | void | void | Calls thunk_FUN_0044cba0 | LOW |
| 0x004723E5 | stub | FUN_004723e5 | seh_cleanup_beaten | void | void | SEH frame restoration | LOW |
| 0x004728C0 | small | FUN_004728c0 | scalar_deleting_dtor_winner | param_1: flags | this | Calls destructor, optionally frees | MEDIUM |

### Cluster: Map Drawing Helpers (0x00472910 - 0x00472E5C)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00472910 | small | FUN_00472910 | set_callback_pointers | param_1, param_2 | void | Sets ECX+0x118 = param_1, ECX+0xA20 = param_2 (callback table entries in map window object) | LOW |
| 0x00472950 | small | FUN_00472950 | append_extension_if_missing | param_1: filename, param_2: ext | void | If no '.' found, appends "." + extension. Then __strupr. Uses FUN_005f22e0 (strcat) | HIGH |
| 0x004729AB | small | FUN_004729ab | replace_extension | param_1: dest, param_2: src, param_3: ext | void | Copies src→dest, strips extension at '.', appends "." + new_ext, __strupr | HIGH |
| 0x00472A60 | small | FUN_00472a60 | show_danger_popup | param_1-4: format args | void | Formats text and shows "DANGER" popup via thunk_FUN_00444270 | HIGH |
| 0x00472AB5 | small | FUN_00472ab5 | show_dangerhex_popup | param_1-4: format args | void | Formats text and shows "DANGERHEX" popup | HIGH |
| 0x00472B0A | large | FUN_00472b0a | draw_number_on_map | param_1: x, param_2: y, param_3: value, param_4: color | void | Checks tile visibility via FUN_0047c3e0, converts int→string with __itoa, draws 3-layer text (shadow, outline, colored) on map surface DAT_0066cae0 | MEDIUM |
| 0x00472CF0 | stub | FUN_00472cf0 | scale_sprite | param_1: base_size, param_2: zoom_level | int | `(zoom+8)*base / 8` — zoom-aware sprite scaling. Already named in reference as scale_sprite | HIGH |
| 0x00472D20 | small | FUN_00472d20 | init_unit_move_data | param_1: unit_x, param_2: unit_y | 0x800 | Initializes DAT_006660F0-0x00666108 block: sets coords to 0xFFCE (-50), clears flags, returns 0x800 (unit slot ID) | MEDIUM |
| 0x00472E1D | small | FUN_00472e1d | init_and_place_unit | param_1: x, param_2: y, param_3, param_4 | 0x800 | Calls init_unit_move_data then thunk_FUN_005b345f (place unit) | MEDIUM |
| 0x00472E5C | small | FUN_00472e5c | stop_unit_animation | void | void | If DAT_006660f7 >= 0, calls thunk_FUN_005b4391(0x800,1) to stop unit, sets flag to -1 | MEDIUM |

### Cluster: CRT Static Init / Global Arrays (0x00472F10 - 0x00479DF9)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00472F10 | stub | FID_conflict:_$E31 | FRAMEWORK | — | — | CRT static initializer: constructs global + registers atexit | HIGH |
| 0x00472F2A | stub | FUN_00472f2a | init_global_gdi_obj | void | void | Constructs FUN_005bd630 (GDI bitmap object) | LOW |
| 0x00472F44 | stub | FUN_00472f44 | register_gdi_atexit | void | void | _atexit(FUN_00472f61) | LOW |
| 0x00472F61 | stub | FUN_00472f61 | destroy_global_gdi_obj | void | void | GDI bitmap destructor at exit | LOW |
| 0x00472F7B | medium | FUN_00472f7b | pack_viewport_state | void | void | Copies DAT_00655280 (viewport data) → DAT_0066c600 via FUN_0047314e (int32→int16 rect conversion). Loops 8 civs. Packs for save file | MEDIUM |
| 0x00473064 | medium | FUN_00473064 | unpack_viewport_state | void | void | Reverse of above: DAT_0066c600 → DAT_00655280 via FUN_00473190 (int16→int32). Unpacks from save file | MEDIUM |
| 0x0047314E | small | FUN_0047314e | rect_int32_to_int16 | param_1: src_int32[4], param_2: dest_int16[4] | void | Converts 4 int32 rect fields → 4 int16 fields | MEDIUM |
| 0x00473190 | small | FUN_00473190 | rect_int16_to_int32 | param_1: src_int16[4], param_2: dest_int32[4] | void | Converts 4 int16 rect fields → 4 int32 fields | MEDIUM |

### Cluster: File Dialog & Save Format (0x004731D2 - 0x00473FF2)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004731D2 | medium | show_open_dialog_31D2 | show_open_dialog | param_1-7: hwnd_flag, title, filename, filter, defExt, overwrite, is_save | bool | Wrapper for GetOpenFileNameA / GetSaveFileNameA with OPENFILENAME struct. Flags 0x80E / 0x180E | HIGH |
| 0x004732A6 | large | FUN_004732a6 | load_units_and_cities | param_1: version, param_2: FILE* | bool | Reads unit array (stride 0x20) and city array (stride 0x58) from save file. Handles format versions: <0x29 (old 0x1A/0x54), 0x29 (transitional 0x1E/0x58), >=0x2A (current 0x20/0x58). Assigns sequential alive_flag IDs via DAT_00627fd8/DAT_00627fdc | HIGH |
| 0x00473660 | xlarge | load_game_file | load_game_file | param_1: version, param_2: FILE* | bool | **Already named.** Reads game state header (0x14A or split), COSMIC rules (0x790), civ data (0x2CA0 or per-civ chunks). Handles v<0x28 (old) vs >=0x28 (current). String: "load_gpk: Fixing up game enemies" | HIGH |
| 0x00473C12 | small | FUN_00473c12 | write_null_terminated_string | param_1: string, param_2: FILE* | int | fputs + fputc(0) — writes null-terminated string to file | HIGH |
| 0x00473C68 | medium | FUN_00473c68 | read_null_terminated_string | param_1: FILE* | char* | Reads chars until NUL or EOF, allocates via DAT_0064b984 heap, copies string | HIGH |
| 0x00473D5E | medium | FUN_00473d5e | set_save_extension | param_1: is_scenario | void | Sets DAT_0066c4e8 to file extension based on DAT_00655b02 (format version). Version mapping: 0→.sav(old), 1→.sav(v1), 2→.sav(v2), 3-6→.net | HIGH |
| 0x00473E55 | large | FUN_00473e55 | build_file_filter | param_1: include_all, param_2: is_scenario, param_3: is_mp | char* | Builds file dialog filter string in DAT_0066c4f8. Scenario: ".scn". MP: ".mp". Otherwise chains .sav/.net/.hot via FUN_00473ff2 | HIGH |
| 0x00473FF2 | large | FUN_00473ff2 | append_file_type_filter | param_1: type(0-6), param_2: buffer | char* | Appends filter pair by type: 0=".sav", 1=".hot", 2=".eml", 3-6=".net". Returns end-of-buffer pointer | HIGH |

### Cluster: Save Game (0x004741BE - 0x0047758C)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x004741BE | xlarge | FUN_004741be | write_save_file | param_1: filename, param_2: is_scenario | int | Master save writer. Writes "CIVILIZE" magic, version 0x2C, game state (0x14A), COSMIC (0x790), civ data (0x2CA0), map data, units (0x20*N), cities (0x58*N), leader portraits, viewport state, events. Handles scenario flags (0x40/0x80). Writes tech bitmask for scenario civs | HIGH |
| 0x0047543C | medium | FUN_0047543c | quick_load_check | param_1: filename | int | Opens file, checks "CIVILIZE" magic, reads version. Returns: 0=ok, 1=not_save, 2=old_version, 3=load_error, 4=too_new | HIGH |
| 0x00475666 | xlarge | FUN_00475666 | load_full_game | param_1: filename | int | **Master load function.** Opens file, validates "CIVILIZE" magic, rejects version>0x2C or <0x26. Reads all save sections (game state, map, units, cities, leaders, viewport, events). Handles scenario flags, leader portrait negation for fog-of-war, reconstructs per-civ unit type counts. Loads EVENTS.TXT if present. Returns 0=success, 1-4=error codes. Strings: "LOADOK", "LOADNOTSAVE", "LOADOLDSAVE", "LOADBADSAVE", "LOADNEWSAVE" | HIGH |
| 0x0047758C | xlarge | save_game | save_game | param_1: is_scenario | void | **Already named.** UI-level save: builds filename from civ name + turn/date, shows file dialog, calls write_save_file, displays result messages. Handles .eml (email) format with timestamps. Strings: "SAVEOK", "SCENOK", "SAVEERROR", "EMAILSAVED" | HIGH |

### Cluster: Load/Verify & Game Init (0x00477D8C - 0x0047870E)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00477D8C | xlarge | load_verify_units | load_verify_units | param_1: is_scenario, param_2: unused, param_3: show_title | void | **Already named.** Full load+verify pipeline: shows file dialog, handles ALT scenario files (random selection via FindFirstFile), loads game, initializes events, loads TITLE.GIF, verifies stacked units. Strings: "LOADOK", "Stacked Unit in save", "EVENTS", "BEGINEVENTS", "TITLE.GIF" | HIGH |
| 0x004786F8 | stub | FUN_004786f8 | dtor_load_surface | void | void | Surface destructor (FUN_005c656b) | LOW |
| 0x0047870E | stub | FUN_0047870e | seh_cleanup_load | void | void | SEH frame restoration | LOW |

### Cluster: Multiplayer Data Arrays Init (0x00479D20 - 0x00479E64)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00479D20 | stub | FUN_00479d20 | init_mp_civ_arrays | void | void | CRT static init: constructs 8 × 0x3F0 byte objects at DAT_0066c7a8 + registers atexit | MEDIUM |
| 0x00479D3A | small | FUN_00479d3a | construct_civ_array | void | void | _eh_vector_constructor_iterator_ for 8 entries at stride 0x3F0 | MEDIUM |
| 0x00479D65 | stub | FUN_00479d65 | register_civ_array_atexit | void | void | _atexit(FUN_00479d82) | LOW |
| 0x00479D82 | stub | FUN_00479d82 | destroy_civ_array | void | void | _eh_vector_destructor_iterator_ for 8 entries | LOW |
| 0x00479DA8 | stub | FID_conflict:_$E31 | FRAMEWORK | — | — | CRT static initializer | HIGH |
| 0x00479DC2 | stub | FUN_00479dc2 | init_mp_global1 | void | void | Calls thunk_FUN_0040fb00 | LOW |
| 0x00479DDC | stub | FUN_00479ddc | register_mp_atexit1 | void | void | _atexit | LOW |
| 0x00479DF9 | stub | FUN_00479df9 | destroy_mp_global1 | void | void | Calls thunk_FUN_0040fbb0 | LOW |
| 0x00479E13 | stub | FID_conflict:_$E31 | FRAMEWORK | — | — | CRT static initializer | HIGH |
| 0x00479E2D | stub | FUN_00479e2d | init_mp_global2 | void | void | Calls thunk_FUN_0040fb00 | LOW |
| 0x00479E47 | stub | FUN_00479e47 | register_mp_atexit2 | void | void | _atexit | LOW |
| 0x00479E64 | stub | FUN_00479e64 | destroy_mp_global2 | void | void | Calls thunk_FUN_0040fbb0 | LOW |

### Cluster: Map Viewport — Camera & Coordinate Transform (0x00479E7E - 0x0047A6B0)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00479E7E | small | FUN_00479e7e | scroll_map_to_y | param_1: y | void | Calls thunk_FUN_00410402 with (param_1, ECX+0x2E2) — scrolls map to given y while keeping x | MEDIUM |
| 0x00479EAE | small | FUN_00479eae | scroll_map_to_x | param_1: x | void | Calls thunk_FUN_00410402 with (ECX+0x2E0, param_1) — scrolls map to given x while keeping y | MEDIUM |
| 0x00479EDE | medium | FUN_00479ede | init_map_viewport | param_1: mode | void | Sets map window mode (+0x2D8), cursor position to map center (DAT_006d1160/2, DAT_006d1162/2), ensures even alignment, initializes scroll state (+0x358=-1, +0x35C=0xFFFFFC19) | MEDIUM |
| 0x00479FBE | xlarge | FUN_00479fbe | recalc_viewport_geometry | (this=ECX) | void | **Core viewport recalculation.** Computes tile sizes via scale_sprite(0x40,zoom) and scale_sprite(0x20,zoom), derives half-tile, quarter-tile, viewport row/col counts, clamp to map dimensions (DAT_006d1160/DAT_006d1162), applies wrapping. Rebuilds font sizes at 3/5 and 1/4 of tile height. Calls FUN_005cef31 (blit) to redraw cursors | HIGH |
| 0x0047A540 | large | FUN_0047a540 | screen_to_tile | param_1: out_x, param_2: out_y, param_3: screen_x, param_4: screen_y | bool(0=ok) | Converts screen pixel coordinates to isometric tile coordinates. Subtracts viewport offset, divides by tile size, applies diamond-quadrant correction via FUN_005c0bf2 and lookup tables DAT_0062833B/DAT_00628343. Uses wrap function (thunk_FUN_005ae052) | HIGH |
| 0x0047A6B0 | medium | FUN_0047a6b0 | tile_to_screen | param_1: out_px, param_2: out_py, param_3: tile_x, param_4: tile_y | void | Converts tile coordinates to screen pixel coordinates. Applies viewport origin offset, half-tile multipliers, adds client area offset (+0x124, +0x128) | HIGH |

### Cluster: Map Terrain Rendering (0x0047A747 - 0x0047BA1D)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0047A747 | large | FUN_0047a747 | calc_coast_quadrants | param_1: x, param_2: y | int | Calculates coastline quadrant bitmask for ocean tiles. Checks 8 neighbors, builds DAT_0066c720[4] quadrant flags (bits 1=side, 2=diagonal, 4=corner). Returns neighbor count. Uses terrain check at DAT_00628350/60 offsets | HIGH |
| 0x0047A8C9 | xlarge | FUN_0047a8c9 | render_tile | param_1: surface, param_2-3: px/py, param_4-5: tile_x/y, param_6: civ, param_7: zoom, param_8: city_radius_idx | void | **Master tile renderer.** Handles: ocean coastlines (4 quadrants), dither blending with neighbors, terrain overlays (forest=3, mountains=5, hills=4), farmland (0xC bits), rivers (bit 0x80), irrigation variants, roads/railroads (8-directional), mining, pollution, goody huts, resource specials, fortress/airbase sprites. ~4400 bytes, the largest terrain drawing function | HIGH |
| 0x0047BA1D | large | FUN_0047ba1d | render_city_on_map | param_1: surface, param_2: py, param_3: tile_x, param_4: tile_y | void | Renders city sprite at tile position. Checks visibility (DAT_0064f34c bitmask, DAT_0064f34d pop knowledge), handles god mode (DAT_00655b07), calls thunk_FUN_0056d289 (city sprite draw with owner color) | HIGH |

### Cluster: Unit Rendering on Map (0x0047BBA5 - 0x0047BE63)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0047BBA5 | small | FUN_0047bba5 | draw_unit_simple | (args via thiscall) | void | Thin wrapper calling draw_unit (thunk_FUN_0056baff) | MEDIUM |
| 0x0047BBEA | small | FUN_0047bbea | draw_unit_if_visible | (args via thiscall) | void | Calls draw_unit only if DAT_0062804c=0 OR DAT_00628054=0 OR DAT_006d1da8!=1 (not in multiplayer hidden mode) | MEDIUM |
| 0x0047BC59 | medium | FUN_0047bc59 | draw_unit_at_position | param_1: unit_idx | void | Gets unit coords, converts tile→screen via FUN_0047a6b0, draws unit with mode 5 (full decorations) | MEDIUM |
| 0x0047BD04 | large | FUN_0047bd04 | draw_unit_with_stacking | param_1: unit_idx, param_2: surface, param_3: py | void | Handles active unit blinking (DAT_00633e48/DAT_00633e54), checks if same tile as current active unit, draws with appropriate mode (4=other, blink for active) | MEDIUM |
| 0x0047BE63 | large | FUN_0047be63 | draw_units_at_tile | param_1: surface, param_2: py, param_3: tile_x, param_4: tile_y | void | Finds first unit at tile via FUN_005b2e69, resolves active/secondary unit, checks visibility and ownership, handles sentry orders (0x01/0x02 skip), delegates to draw_unit_with_stacking | MEDIUM |

### Cluster: Map Tile Composition & City Labels (0x0047C103 - 0x0047CF9E)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0047C103 | medium | FUN_0047c103 | draw_complete_tile | param_1: tile_x, param_2: tile_y, param_3: civ_id | void | Composes full tile: terrain (render_tile), city overlay, units, fog of war grid. Checks if within city radius for resource overlay (flag 0x20 in DAT_00655aea) | HIGH |
| 0x0047C2F2 | medium | FUN_0047c2f2 | is_x_in_range | param_1: x, param_2: range_start, param_3: range_size | bool | Checks if x coordinate is within [range_start, range_start+range_size), handling map wrapping (DAT_00655ae8 bit 0x8000 = flat earth, DAT_006d1160 = map width) | MEDIUM |
| 0x0047C37F | small | FUN_0047c37f | is_tile_in_viewport_rect | param_1: x, param_2: y, param_3-6: rect x/y/w/h | bool | 2D range check: is_x_in_range AND y in [param_4, param_4+param_6) | MEDIUM |
| 0x0047C3E0 | small | FUN_0047c3e0 | is_tile_visible | param_1: x, param_2: y | bool | Checks if tile is within current viewport using viewport bounds at ECX+0x2E8..0x304 | MEDIUM |
| 0x0047C443 | large | FUN_0047c443 | draw_city_labels | param_1: center_x, param_2: center_y, param_3: radius | void | Iterates all cities (DAT_00655b18), draws names below city sprite using set_text_style with civ color. Checks visibility and ownership. Positions name at 3/4 tile height below center | HIGH |
| 0x0047C7AA | medium | FUN_0047c7aa | calc_tile_group_rect | param_1: x, param_2: y, param_3: radius, param_4: out_rect | void | Computes screen rectangle for a group of tiles centered on (x,y) with given radius | MEDIUM |
| 0x0047C869 | large | FUN_0047c869 | redraw_tile_area | param_1: x, param_2: y, param_3: radius, param_4: civ_id | void | Redraws all visible tiles within diamond radius: iterates in proper isometric order (outer→inner), draws each tile via draw_complete_tile, then draws city labels | HIGH |
| 0x0047C9D4 | medium | FUN_0047c9d4 | redraw_full_viewport | param_1: civ_id | void | Redraws entire visible viewport: iterates all viewport rows/cols, calls draw_complete_tile for each, then draw_city_labels for all | HIGH |
| 0x0047CAEA | small | FUN_0047caea | invalidate_tile_area | param_1: x, param_2: y, param_3: radius | void | Calculates tile group rect and invalidates it for repaint | MEDIUM |
| 0x0047CB26 | small | FUN_0047cb26 | invalidate_single_tile | param_1: x, param_2: y | void | Invalidates radius-0 area around single tile | MEDIUM |
| 0x0047CB50 | small | FUN_0047cb50 | begin_end_paint_cycle | void | void | Calls begin_paint/end_paint + multiplayer status bar (FUN_0047e94e if version>2) twice | MEDIUM |
| 0x0047CBB4 | large | FUN_0047cbb4 | update_map_area | param_1: x, param_2: y, param_3: radius, param_4: civ_id, param_5: invalidate | void | High-level map update: if map visible (DAT_00628044), redraws tile area with cursor overlay. Checks DAT_006d1da8 (multiplayer) for cursor blit. Handles god mode | HIGH |
| 0x0047CCED | small | FUN_0047cced | update_map_tile | param_1: x, param_2: y | void | Calls update_map_area with radius=0, civ=current_player, invalidate=1 | MEDIUM |
| 0x0047CD1F | small | FUN_0047cd1f | update_map_radius1 | param_1: x, param_2: y | void | Calls update_map_area with radius=1, civ=current_player, invalidate=1 | MEDIUM |
| 0x0047CD51 | medium | FUN_0047cd51 | redraw_entire_map | param_1: civ_id, param_2: rebuild_ui | void | Full map refresh: calls recalc_viewport_geometry, begin_paint, redraw_full_viewport, optional paint cycle + status bar update | HIGH |
| 0x0047CE1E | medium | FUN_0047ce1e | update_map_area_all_players | param_1-5: x, y, radius, civ, invalidate | void | Loops 8 players, calls update_map_area for each active player (checks DAT_0066ca84 MP status) | MEDIUM |
| 0x0047CEA6 | medium | FUN_0047cea6 | update_tile_all_players | param_1: x, param_2: y | void | Loops 8 players, calls update_map_tile for each active player | MEDIUM |
| 0x0047CF22 | medium | FUN_0047cf22 | update_radius1_all_players | param_1: x, param_2: y | void | Loops 8 players, calls update_map_radius1 for each active player | MEDIUM |
| 0x0047CF9E | medium | FUN_0047cf9e | redraw_map_all_players | param_1: civ_id, param_2: flag | void | Loops 8 players, calls redraw_entire_map for each active player | MEDIUM |

### Cluster: Map Window Object — Constructor/Destructor (0x0047DCE0 - 0x0047DED1)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0047DCE0 | medium | FUN_0047dce0 | ctor_map_window | (this=ECX) | this | Constructor for map window object. Calls thunk_FUN_0055339f (CFrameWnd ctor), initializes 2 string + 2 bitmap sub-objects, sets vtable to PTR_FUN_0061d1e4 | MEDIUM |
| 0x0047DE10 | medium | ~CBitmapButton (MFC) | FRAMEWORK | — | — | MFC library: CBitmapButton destructor | HIGH |
| 0x0047DE82 | stub | FUN_0047de82 | mapwin_dtor_sub3 | void | void | GDI bitmap destructor | LOW |
| 0x0047DE91 | stub | FUN_0047de91 | mapwin_dtor_sub2 | void | void | GDI bitmap destructor | LOW |
| 0x0047DEA0 | stub | FUN_0047dea0 | mapwin_dtor_sub1 | void | void | String destructor | LOW |
| 0x0047DEAF | stub | FUN_0047deaf | mapwin_dtor_sub0 | void | void | String destructor | LOW |
| 0x0047DEBE | stub | FUN_0047debe | mapwin_dtor_base | void | void | COleCntrFrameWnd destructor | LOW |
| 0x0047DED1 | stub | FUN_0047ded1 | seh_cleanup_mapwin | void | void | SEH frame restoration | LOW |

### Cluster: Zoom/Sprite Helpers (0x0047DF20 - 0x0047DFF0)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0047DF20 | stub | FUN_0047df20 | set_sprite_scale | param_1: zoom_level | void | Calls FUN_005cd775(zoom+8, 8) — sets rendering scale factor | MEDIUM |
| 0x0047DF50 | stub | FUN_0047df50 | reset_sprite_scale | void | void | Calls FUN_005cd775(1, 1) — resets to 1:1 scale | MEDIUM |
| 0x0047DF80 | stub | FUN_0047df80 | intersect_clip_rect | param_1: out_rect, param_2: rect1, param_3: rect2 | void | Wrapper for Win32 IntersectRect | LOW |
| 0x0047DFB0 | small | FUN_0047dfb0 | scale_at_current_zoom | param_1: base_size | int | Calls scale_sprite(param_1, current_zoom) where zoom = ECX+0x2E4 | MEDIUM |
| 0x0047DFF0 | small | FUN_0047dff0 | set_current_zoom_scale | void | void | Calls set_sprite_scale(current_zoom) | MEDIUM |

### Cluster: Visibility & Map Status (0x0047E030 - 0x0047E2B3)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0047E030 | medium | FUN_0047e030 | is_tile_visible_to_any_player | param_1: x, param_2: y | bool | Returns 1 if tile is visible to current player AND within any active player's viewport | MEDIUM |
| 0x0047E0E5 | large | FUN_0047e0e5 | enqueue_stacked_draw | param_1: msg_type, param_2: data_ptr, param_3: extra_data | int | Adds draw command to circular queue (DAT_006ad920, 100-entry ring buffer, stride 0x40). Handles queue overflow by flushing. Types: 0x70=move, 0x71=visibility, 0x72=redraw_tile, etc. String: "STACKED DRAW stack full, Flushing" | HIGH |
| 0x0047E2B3 | xlarge | FUN_0047e2b3 | dequeue_stacked_draw | void | int | Processes one queued draw command. Switch on type: 0x70=unit move+combat, 0x71=visibility update, 0x72=redraw tiles, 0x73=animation, 0x74=full redraw, 0x75/0x76=area redraw, 0x7C/0x7D=special effects, 0xA3=counter. Manipulates unit linked lists and tile bits | HIGH |

### Cluster: Multiplayer Network Polling (0x0047E94E)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0047E94E | xlarge | FUN_0047e94e | network_poll | param_1: max_iterations, param_2: blocking_mode | void | **The main multiplayer network message processor.** ~14000 bytes (largest function in block). Checks 20+ pending operation slots, processes XD_ network buffer. Giant switch on message type (0x00-0xA8): handles unit moves (0x70), visibility sync (0x71), city operations (0x87-0x8A), combat (0x78-0x79), diplomacy (0xA4-0xA8), game sync (0x15), player join/leave (0x2E-0x32), and ~100 other network opcodes. Calls map_window_click, map_key, city_mouse, city_button_buy/change/view/rename. References: "Poll: Unstacking XD_FlushSendBuffer", "D:\Ss\Franklinton\NetMgr\Poll.cpp", "Hold on", "Hold off", "WAITONGAMEXMIT", "PRETEXT", "PRETEXTALLIED" | HIGH |

---

## SUMMARY

### 1. Totals and Breakdown

**Total functions: 101**

| Category | Count | Description |
|----------|-------|-------------|
| Save/Load I/O | 13 | File reading/writing of game state, units, cities, events |
| Cutscene/Video | 28 | Loser/winner/beaten AVI playback, text display, ctor/dtor chains |
| Map Rendering | 23 | Tile composition, terrain, coastlines, cities, units, labels |
| Map Viewport | 11 | Camera transforms, scroll, zoom, coordinate conversion |
| Network/Multiplayer | 5 | Message polling, draw queue, MP sync |
| File Dialog/Format | 8 | File filters, extensions, open/save dialogs |
| Framework (CRT/MFC) | 8 | Static initializers, atexit handlers, MFC GetActiveView |
| Stub/Wrapper | 5 | SEH cleanup, forwarding wrappers |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_0047a8c9 (render_tile)** — 4431 bytes. The master terrain tile renderer. Handles all terrain types, coastlines, overlays, roads, improvements, resources. Critical for understanding the complete rendering pipeline.

2. **FUN_00475666 (load_full_game)** — 7734 bytes. The master game-load function. Reads every section of the save file, handles version differences, reconstructs derived state, loads events. Essential for save format understanding.

3. **FUN_0047e94e (network_poll)** — 14034 bytes. The multiplayer network message processor with ~100 opcodes. Documents the complete multiplayer protocol including unit operations, diplomacy, city management, and synchronization.

4. **FUN_00479fbe (recalc_viewport_geometry)** — 1410 bytes. Core viewport math that computes tile sizes, row/col counts, camera bounds, and font sizes from zoom level. Needed for accurate map display.

5. **FUN_0047e0e5 / FUN_0047e2b3 (enqueue/dequeue_stacked_draw)** — The draw command queue system (100-entry ring buffer). Documents how deferred rendering works for animations, unit movement, and map updates.

### 3. New DAT_ Globals Identified

| Global | Type | Confidence | Description |
|--------|------|------------|-------------|
| DAT_0062b804 | ptr (obj) | HIGH | Loser cutscene object pointer |
| DAT_0062b87c | ptr (obj) | HIGH | Winner cutscene object pointer |
| DAT_0066c600 | byte[0x6A] | HIGH | Packed viewport state (16-bit rects) for save file |
| DAT_0066c4e8 | char[8] | HIGH | Current save file extension string (e.g., ".sav") |
| DAT_0066c4f8 | char[260] | HIGH | File dialog filter string buffer |
| DAT_006660F0-0x00666108 | struct | MEDIUM | Unit move animation state block (coords, flags) |
| DAT_006ad908 | int | MEDIUM | Map redraw in-progress flag (prevents recursion) |
| DAT_006ad90c | uint | HIGH | Stacked draw queue count |
| DAT_006ad910 | int | HIGH | Stacked draw queue head index (ring buffer) |
| DAT_006ad914 | int | HIGH | Stacked draw queue tail index (ring buffer) |
| DAT_006ad918 | int | MEDIUM | Stacked draw queue mode flag (controls overflow behavior) |
| DAT_006ad920 | struct[100] | HIGH | Stacked draw queue entries (stride 0x40, type+7 params+0x20 extra) |
| DAT_0062bcd8 | byte | MEDIUM | Map rendering mode flag (0=normal, nonzero=suppress overlays) |
| DAT_0066c720 | byte[4] | HIGH | Coastline quadrant bitmask array (NE/SE/SW/NW) |
| DAT_00628044 | byte | MEDIUM | Map window visible flag |
| DAT_0062bcec | byte | MEDIUM | Network poll unstacking guard flag |
| DAT_006ad6ac | short | HIGH | Load/save mode indicator (0=none, 1=load, 2=scenario) |
| DAT_006ad6ae | char[260] | MEDIUM | Current filename being loaded (just basename) |
| DAT_006ad7b2 | char[260] | MEDIUM | Current scenario subdirectory path |
| DAT_006ad2f7 | byte | MEDIUM | Server flag (nonzero = this instance is server in MP) |
