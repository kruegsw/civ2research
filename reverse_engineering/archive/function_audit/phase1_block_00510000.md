# Phase 1 Audit: block_00510000.c (0x00511320 - 0x0051F19C+)

## Overview
Address range 0x00511320 - ~0x00521817. Contains 162 functions across 6831 lines.
Primary domains: **Multiplayer event dispatch**, **advisor council video playback**, **terrain/rules editor**, **new game setup dialogs**, **network message queue**, **civ selection UI**.

---

### Cluster: Drawing/Layout Utilities (0x00511320 - 0x005116F0)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00511320 | stub | FUN_00511320 | get_member_offset4 | void (this) | int | Returns `*(this+4)` -- simple accessor | LOW |
| 0x00511350 | stub | FUN_00511350 | clamp_to_range | int lo, int hi, int val | int | Clamps val between lo and hi; if lo<=val<hi returns endpoints | MEDIUM |
| 0x005113B0 | stub | FUN_005113b0 | draw_line | x1, y1, x2, y2 | void | Forwards to thunk_FUN_005a97cc with DAT_00635c64 surface. Already named in reference as draw_line | HIGH |
| 0x005113F0 | stub | FUN_005113f0 | draw_3d_frame | p1, p2, p3 | void | Forwards to thunk_FUN_005a99fc with DAT_00635c64. Already named in reference as draw_3d_frame | HIGH |
| 0x00511430 | stub | FUN_00511430 | init_text_buffer | void | void | Calls thunk_FUN_004af09e on DAT_00679640 (text buffer) | MEDIUM |
| 0x00511460 | small | FUN_00511460 | invalidate_rect_region | p1, p2, RECT* | void | Extracts RECT fields and calls thunk_FUN_0046ace7 (width=r-l, height=b-t) | MEDIUM |
| 0x005114D0 | stub | FUN_005114d0 | blit_sprite_8param | 8 params | void | Forwards to thunk_FUN_00548c78 with DAT_00635c64 surface. Related to calc_icon_spacing | MEDIUM |
| 0x00511520 | stub | FUN_00511520 | show_popup_3param | p1, p2, p3 | void | Calls thunk_FUN_004a6cc5 with DAT_006359d4 | LOW |
| 0x00511560 | stub | FUN_00511560 | scalar_deleting_destructor_a | byte flags | void* | Destructor pattern: calls dtor then conditionally delete | FRAMEWORK |
| 0x005115B0 | small | FUN_005115b0 | destructor_chain_a | void (this) | void | SEH destructor chain; deletes *(this+0x1c) via FUN_005cb6db; calls sub-dtors | FRAMEWORK |
| 0x00511624 | stub | FUN_00511624 | dtor_helper_a1 | void | void | Calls FUN_005bd915 (CString dtor) | FRAMEWORK |
| 0x00511630 | stub | FUN_00511630 | dtor_helper_a2 | void | void | Calls FUN_005bd915 (CString dtor) | FRAMEWORK |
| 0x0051163C | stub | FUN_0051163c | dtor_helper_a3 | void | void | Calls thunk_FUN_0040f510 (base class dtor) | FRAMEWORK |
| 0x0051164F | stub | FUN_0051164f | seh_epilog_a | void | void | SEH frame epilog: restores FS:[0] | FRAMEWORK |
| 0x00511690 | small | FUN_00511690 | scale_universal | int val | int | Scales val by `*(this+0x15d4)/2` factor. Already named in reference as scale_universal | HIGH |
| 0x005116F0 | stub | FUN_005116f0 | format_string_to_buf | p1 | void | Calls thunk_FUN_0043ce5a with DAT_00679640 text buffer | MEDIUM |

### Cluster: Window/Dialog Constructor Helpers (0x00511720 - 0x00511850)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00511720 | small | FUN_00511720 | construct_window_base | void (this) | this | SEH constructor: inits base classes, sets *(this+200)=0 | FRAMEWORK |
| 0x005117F0 | stub | FUN_005117f0 | set_member_2c | p1 | void | Sets *(this+0x2c) = p1 | LOW |
| 0x00511820 | stub | EnableStackedTabs@1 | enable_stacked_tabs_1 | this, int | void | MFC CPropertySheet::EnableStackedTabs. Sets *(this+0x2cc). Used as generic "set member" | FRAMEWORK |
| 0x00511850 | stub | EnableStackedTabs@2 | enable_stacked_tabs_2 | this, int | void | Same MFC function, sets *(this+0x2d0). Different vtable offset | FRAMEWORK |

### Cluster: Multiplayer Event Queue & Dispatch (0x00511880 - 0x005139B3)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00511880 | large | FUN_00511880 | enqueue_mp_event | p1, p2, numStrings, numInts, p5, p6 | void | Packs string params (from DAT_0063cc48, stride 0x104) and int params (from DAT_0063cc30) into a buffer, calls thunk_FUN_0046b14d(0x6a,...). Only if save_format_version > 2 (multiplayer) | HIGH |
| 0x00511A0E | medium | FUN_00511a0e | mp_event_list_append | p1-p5, data, size | void | Allocates node (size+0x1c), stores 5 params + data blob. Linked list with head=DAT_00631130, tail=DAT_00631134 | MEDIUM |
| 0x00511ACF | small | FUN_00511acf | mp_event_list_clear | void | void | Walks DAT_00631130 linked list, deletes all nodes, clears tail | MEDIUM |
| 0x00511B2D | small | FUN_00511b2d | mp_check_invalidate | void | void | Calls thunk_FUN_0047e94e(1,0); if conditions met (not AI, not timer elapsed <0x4b1), returns early. Otherwise sets dirty flag 0x400 and invalidates | MEDIUM |
| 0x00511BA2 | xlarge | FUN_00511ba2 | dispatch_mp_event | void | void | **CORE**: 7252 bytes, massive switch on event type (cases 0x00-0x65). Dequeues from DAT_00631130, dispatches to handlers by string key: RETIREDIE, BARBARIANS, GLOBALWARMING, EAGLEHASLANDED, SCENARIOENDS, CARAVAN, STARTWONDER, PARADROP, PARLEYREQUEST, etc. Handles ~100 distinct multiplayer game events | HIGH |
| 0x0051399D | stub | FUN_0051399d | dtor_dispatch_cleanup | void | void | Calls thunk_FUN_0059df8a (CDialog dtor) | FRAMEWORK |
| 0x005139B3 | stub | FUN_005139b3 | seh_epilog_dispatch | void | void | SEH epilog | FRAMEWORK |

### Cluster: Network Message Queue (0x00514220 - 0x005149D6)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00514220 | small | FUN_00514220 | netmsg_queue_construct | void (this) | this | Zeroes 24000 bytes, calls netmsg_queue_reset | HIGH |
| 0x00514254 | stub | FUN_00514254 | netmsg_queue_init | void (this) | void | Calls netmsg_queue_reset | MEDIUM |
| 0x00514272 | medium | FUN_00514272 | netmsg_queue_reset | void (this) | void | Iterates 2000 slots (12 bytes each), frees data pointers. Sets head=400, tail=400, counts=0. Two-tier queue: primary (slots 400-1999) and alpha (slots 0-399) | HIGH |
| 0x0051435F | stub | FUN_0051435f | is_alpha_message | int msgType | bool | Returns 1 if msgType in range [0x2A, 0x66], else 0. Distinguishes priority (alpha) from normal messages | HIGH |
| 0x0051438F | xlarge | FUN_0051438f | netmsg_enqueue | int sender, void* data, uint size | bool | 1602 bytes. Enqueues message into two-tier circular queue. Primary: 1600 slots (400-1999), Alpha: 400 slots (0-399). Contains string "D:\\Ss\\Franklinton\\NetMessageQueu" path. Tracks max watermarks in DAT_006ad690/DAT_006ad694 | HIGH |
| 0x005149D6 | large | FUN_005149d6 | netmsg_dequeue | out_sender, out_data, out_size, int waitFlag | bool | Dequeues from alpha queue (priority) first, then primary. Circular buffer management | HIGH |

### Cluster: CRT/MFC Static Init (0x00514E10 - 0x00514E7B)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00514E10 | stub | FID_conflict___E31 | static_init_e31 | void | void | Static initializer, calls two sub-inits | FRAMEWORK |
| 0x00514E2A | stub | FUN_00514e2a | static_init_e31a | void | void | CString constructor (FUN_005bd630) | FRAMEWORK |
| 0x00514E44 | stub | FUN_00514e44 | static_init_e31b | void | void | Registers atexit handler for static dtor | FRAMEWORK |
| 0x00514E61 | stub | FUN_00514e61 | static_dtor_e31 | void | void | CString destructor (FUN_005bd915) | FRAMEWORK |

### Cluster: Advisor Council Video Dialog (0x00514E7B - 0x00518F00)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00514E7B | small | FUN_00514e7b | show_council_dialog | uint civId | void | Entry point: constructs council dialog, calls council_init then council_play_video | MEDIUM |
| 0x00514EF2 | stub | FUN_00514ef2 | council_dtor_helper | void | void | Calls council destructor chain | FRAMEWORK |
| 0x00514F08 | stub | FUN_00514f08 | seh_epilog_council | void | void | SEH epilog | FRAMEWORK |
| 0x00514F16 | large | FUN_00514f16 | council_construct | void (this) | this | 295 bytes. Constructs council dialog: CWnd, surface, CString members at +0x64C/+0x688. Sets DAT_00631a98=this. SetRect for panel at (0xD0,0x39,0x1B1,0x14C). Loads "civ2_mk.dll" | HIGH |
| 0x005150B9 | medium | FUN_005150b9 | council_destruct | void (this) | void | Reverse-order destruction of council dialog members. Clears DAT_00631a98 | MEDIUM |
| 0x0051516A | stub | FUN_0051516a | council_dtor_1 | void | void | Calls thunk_FUN_0043c520 | FRAMEWORK |
| 0x00515179 | stub | FUN_00515179 | council_dtor_2 | void | void | Calls FUN_005cde4d (surface dtor) | FRAMEWORK |
| 0x00515188 | stub | FUN_00515188 | council_dtor_3 | void | void | Calls FUN_005cde4d | FRAMEWORK |
| 0x00515197 | stub | FUN_00515197 | council_dtor_4 | void | void | _Timevec::~_Timevec at *(this+0x648) | FRAMEWORK |
| 0x005151A6 | stub | FUN_005151a6 | council_dtor_5 | void | void | FUN_005bd915 (CString dtor) | FRAMEWORK |
| 0x005151B5 | stub | FUN_005151b5 | council_dtor_6 | void | void | thunk_FUN_0044cba0 | FRAMEWORK |
| 0x005151C4 | stub | FUN_005151c4 | council_dtor_7 | void | void | FUN_005c656b (surface cleanup) | FRAMEWORK |
| 0x005151D3 | stub | FUN_005151d3 | council_dtor_8 | void | void | thunk_FUN_0044ca60 | FRAMEWORK |
| 0x005151E6 | stub | FUN_005151e6 | seh_epilog_council2 | void | void | SEH epilog | FRAMEWORK |
| 0x005151F4 | xlarge | FUN_005151f4 | council_init | uint civId | bool | 802 bytes. Loads "civ2_mk.dll", creates render surfaces (640x480), creates render context at +0x600 (297x173). Searches DAT_00655142 array for matching civ style byte. Calls council_draw_label, council_scroll_panel. Returns 0 on DLL load failure | HIGH |
| 0x00515516 | xlarge | FUN_00515516 | council_play_video | void (this) | void | 1122 bytes. Main council video loop: iterates 12 advisor slots, plays music (0x53+offset), waits 7000ms per advisor with message pump. Scrolls panels up/down. Reads advisor text from file. Handles multiplayer sync. Uses timeGetTime for timing | HIGH |
| 0x00515978 | stub | FUN_00515978 | council_video_dtor1 | void | void | thunk_FUN_0043c520 | FRAMEWORK |
| 0x0051598B | stub | FUN_0051598b | seh_epilog_council3 | void | void | SEH epilog | FRAMEWORK |
| 0x00515999 | large | FUN_00515999 | council_draw_label | int advisorIdx | void | 636 bytes. Draws advisor name/title from DAT_0065515a (stride 0x18). Two modes: initial (shadow text only) vs. active (with government name + advisor name). Uses FUN_005c19ad for text color (0x21=shadow, 0x10=normal) | HIGH |
| 0x00515C15 | large | FUN_00515c15 | council_load_advisor_bg | int advisorIdx | void | 385 bytes. Loads advisor background sprite from DAT_0065514e palette offset. Creates render context (42x64). Blits to panel surface | MEDIUM |
| 0x00515D96 | stub | FUN_00515d96 | council_bg_dtor1 | void | void | FUN_005c656b | FRAMEWORK |
| 0x00515DA2 | stub | FUN_00515da2 | council_bg_dtor2 | void | void | FUN_005bd915 | FRAMEWORK |
| 0x00515DB8 | stub | FUN_00515db8 | seh_epilog_council4 | void | void | SEH epilog | FRAMEWORK |
| 0x00515DC8 | large | FUN_00515dc8 | council_scroll_panel | int deltaY | void | 372 bytes. Scrolls advisor council panel by deltaY pixels. Updates RECT at +0x6CC. Blits background, handles clipping. OffsetRect for scroll animation | HIGH |
| 0x00515F3C | medium | FUN_00515f3c | council_scroll_down_anim | void | void | Animated scroll: plays sound 0x6F, scrolls panel down by 15px increments until +0x6FC >= 0x133. 22ms delay between frames via timeGetTime | HIGH |
| 0x00516005 | small | FUN_00516005 | council_scroll_up_anim | void | void | Scrolls panel up by -4px increments while +0x6FC > -0xAD. Message pump between frames | HIGH |
| 0x00516042 | stub | FUN_00516042 | council_invalidate | void | void | Invalidates DAT_00631a98+0x534 (council dialog window) | MEDIUM |
| 0x00516063 | small | FUN_00516063 | council_check_button | int buttonId | void | If buttonId in range (0xCF, 0xD3), invalidates council window | MEDIUM |

### Cluster: Government Council Video (Full System) (0x00516570 - 0x00518F00)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00516570 | small | FUN_00516570 | show_govt_council | p1, p2 | void | Entry: constructs council video object, calls council_video_init + council_video_run | MEDIUM |
| 0x005165F6 | stub | FUN_005165f6 | govt_council_dtor1 | void | void | Calls FUN_005167d9 | FRAMEWORK |
| 0x0051660C | stub | FUN_0051660c | seh_epilog_govt | void | void | SEH epilog | FRAMEWORK |
| 0x0051661A | large | FUN_0051661a | govt_council_construct | void (this) | this | 293 bytes. Constructs video council object: CWnd, CDialog, _Timevec, 6x thunk_FUN_0040f3e0 (button inits). Sets vtable PTR_FUN_0061d6d8, +0x46B=0xB0. DAT_00631acc=this | HIGH |
| 0x005167D9 | medium | FUN_005167d9 | govt_council_destruct | void (this) | void | 198 bytes. Reverse destruction: 8 sub-destructors, clears DAT_00631acc | MEDIUM |
| 0x0051689F | stub | FUN_0051689f | govt_dtor_btn1 | void | void | thunk_FUN_0040f570 (button dtor) | FRAMEWORK |
| 0x005168AE | stub | FUN_005168ae | govt_dtor_btn2 | void | void | thunk_FUN_0040f570 | FRAMEWORK |
| 0x005168BD | stub | FUN_005168bd | govt_dtor_btn3 | void | void | thunk_FUN_0040f570 | FRAMEWORK |
| 0x005168CC | stub | FUN_005168cc | govt_dtor_btn4 | void | void | thunk_FUN_0040f570 | FRAMEWORK |
| 0x005168DB | stub | FUN_005168db | govt_dtor_btn5 | void | void | thunk_FUN_0040f570 | FRAMEWORK |
| 0x005168EA | stub | FUN_005168ea | govt_dtor_btn6 | void | void | thunk_FUN_0040f570 | FRAMEWORK |
| 0x005168F9 | stub | FUN_005168f9 | govt_dtor_timevec | void | void | _Timevec::~_Timevec at *(this+0xe30) | FRAMEWORK |
| 0x00516908 | stub | FUN_00516908 | govt_dtor_dialog | void | void | thunk_FUN_0059df8a (CDialog dtor) | FRAMEWORK |
| 0x00516917 | stub | FUN_00516917 | govt_dtor_video | void | void | FUN_005dd1a0 (video player dtor) | FRAMEWORK |
| 0x00516926 | stub | FUN_00516926 | govt_dtor_base | void | void | thunk_FUN_0044cba0 (CWnd dtor) | FRAMEWORK |
| 0x00516939 | stub | FUN_00516939 | seh_epilog_govt2 | void | void | SEH epilog | FRAMEWORK |
| 0x00516947 | xlarge | FUN_00516947 | council_video_init | uint civId, int cheatMode | bool | 1672 bytes. Initializes council video: creates window, draws panel frames, gets advisor recommendations. String keys: COUNCILCHEAT0/1/2. Checks govt type at civ+0x15. Loads video file from "civ2_video\" + advisor name + ".avi". Handles VFWNOTREGISTERED error. 5 advisor slots (+0xE58) | HIGH |
| 0x00516FD4 | large | FUN_00516fd4 | council_video_run | void | void | 388 bytes. Plays council video: locks surface, sets palette, handles anarchy mode panel, multiplayer sync, restores surfaces | MEDIUM |
| 0x00517158 | xlarge | FUN_00517158 | council_draw_panels | void (this) | void | 1307 bytes. Draws 5 advisor panel frames with 3D borders, title text (shadow+normal). Uses DAT_00633598/DAT_0063359c for panel dimensions. InflateRect for frame insets. Draws civ leader name via FUN_00410070 | HIGH |
| 0x00517673 | xlarge | FUN_00517673 | council_create_buttons | void (this) | void | 816 bytes. Creates 5 advisor column buttons + 1 close button (id=0xCA). Each button gets label from DAT_00628420 improvement name table. Uses thunk_FUN_00497d40 for button creation | HIGH |
| 0x005179A3 | xlarge | FUN_005179a3 | council_parse_advisor_script | int advisorIdx | bool | 907 bytes. Parses advisor script file. Letter codes: M=military(0), S=science(1), T=trade(2), F=foreign(3), A=attitude(4), E=end(-1), R=random check. Stores speech text at +0xEA8 (3 slots x 255 bytes). Returns 1 on success | HIGH |
| 0x00517DD3 | large | FUN_00517dd3 | council_render_speech | int mode | void | 529 bytes. Renders advisor speech text with shadow (color 0x25 shadow, 0x0A normal). Handles word wrap. Mode: -1=clear, 0=first line, 1=next line. Creates font size 14 | MEDIUM |
| 0x00517FE4 | stub | FUN_00517fe4 | council_speech_dtor | void | void | thunk_FUN_0043c520 | FRAMEWORK |
| 0x00517FF7 | stub | FUN_00517ff7 | seh_epilog_speech | void | void | SEH epilog | FRAMEWORK |
| 0x00518007 | large | FUN_00518007 | council_load_all_videos | void (this) | void | 420 bytes. Loads video for each advisor: iterates 5 panels, opens script file, positions video at panel coords. Anarchy mode loads single video | HIGH |
| 0x005181AB | stub | FUN_005181ab | council_vid_dtor1 | void | void | FUN_005cde4d | FRAMEWORK |
| 0x005181B4 | stub | FUN_005181b4 | council_vid_dtor2 | void | void | FUN_005bd915 | FRAMEWORK |
| 0x005181CA | stub | FUN_005181ca | seh_epilog_vid | void | void | SEH epilog | FRAMEWORK |
| 0x005181D8 | large | FUN_005181d8 | council_handle_button | int buttonId | void | 362 bytes. Handles advisor button click. id=0xCA: close. id<5: select advisor panel, parse script, play video frame-by-frame. Uses DAT_00631acc (council object) | HIGH |
| 0x00518342 | small | FUN_00518342 | council_position_video | int panelIdx | void | If panelIdx<5, positions video at panel column: x=(width+0x5A)*idx+width+1 | MEDIUM |
| 0x00518392 | small | FUN_00518392 | parse_advisor_letter | byte* str | int | Maps first char to advisor index: M/m=0, S/s=1, T/t=2, F/f=3, A/a=4, default=-1 | HIGH |
| 0x00518471 | large | FUN_00518471 | council_auto_advance | void | void | 273 bytes. Auto-advances through advisor speeches: checks +0x11A8 < 3 and valid advisor index at +0xE84. Plays video and renders speech sequentially | MEDIUM |
| 0x00518582 | medium | FUN_00518582 | get_advisor_recommendation | uint civId, int advisorType | int | 177 bytes. Gets advisor's government recommendation. Switch on type: 0=military(FUN_004bc480), 1=science(FUN_004bc8aa), 2=trade(FUN_004bcb9b), 3=foreign(FUN_004bcfcf), 4=attitude(FUN_004bd2a3). Uses DAT_00631acc+0xE54 | HIGH |
| 0x00518E80 | stub | FUN_00518e80 | video_set_position | x, y | void | Calls FUN_005bc4a1(*(this+8), x, y) -- sets video playback position | MEDIUM |
| 0x00518EC0 | stub | FUN_00518ec0 | show_input_dialog_int | title, p2, out_value | void | Calls thunk_FUN_0051d75d with DAT_006359d4 | MEDIUM |
| 0x00518F00 | large | FUN_00518f00 | init_scrollbar_list | void (this) | void | 365 bytes. Initializes scrollable list: validates +0x120 index, copies +0xD90 count to +0x1B34, copies item array from +0xDB0 to +0x1B38. Sets scrollbar range (0, count/9). Modulo-9 alignment for grid display | MEDIUM |

### Cluster: CRT Static Initializers (0x005190D0 - 0x00519140)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005190D0 | stub | FUN_005190d0 | static_init_dialog_obj | void | void | Calls constructor + atexit registration | FRAMEWORK |
| 0x005190EA | stub | FUN_005190ea | static_init_dialog_ctor | void | void | thunk_FUN_0059db08(0x4000) - CDialog constructor | FRAMEWORK |
| 0x00519109 | stub | FUN_00519109 | static_init_dialog_atexit | void | void | _atexit(cleanup_func) | FRAMEWORK |
| 0x00519126 | stub | FUN_00519126 | static_dtor_dialog | void | void | thunk_FUN_0059df8a - CDialog destructor | FRAMEWORK |
| 0x00519140 | stub | FUN_00519140 | close_active_popup | void | void | If DAT_00631b78!=0, closes dialog and resets | MEDIUM |

### Cluster: Terrain/Rules Editor (0x00519171 - 0x0051C6A4)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00519171 | small | FUN_00519171 | show_popup_labeled | p1 | void | Shows labeled popup message box (style 8) | MEDIUM |
| 0x00519200 | large | FUN_00519200 | load_terrain_rules_to_editor | void | void | 493 bytes. Loads all 33 (0x21) terrain types from DAT_00627cc4 (stride 0x18) into editor arrays DAT_006a1d88 (name, stride 0x28) and DAT_006a2d28 (properties, stride 0x58). Copies food/shield/trade values, irrigation/mining bonuses for terrain types < 11 | HIGH |
| 0x005193ED | large | FUN_005193ed | save_terrain_rules_from_editor | void | void | 471 bytes. Reverse of load: copies editor arrays back to terrain rule tables. Writes names (max 15 chars), movement costs, defense bonuses, resource yields | HIGH |
| 0x005195C4 | stub | FUN_005195c4 | adjust_combo_index_down | int idx | int | Adjusts combo box index: skips positions 13 and 24 (special terrain types). Decrements if >12 or >23 | MEDIUM |
| 0x005195F1 | stub | FUN_005195f1 | adjust_combo_index_up | int idx | int | Reverse adjustment: increments if >12 or >23 | MEDIUM |
| 0x0051961E | large | FUN_0051961e | editor_populate_controls | void | void | 391 bytes. Populates terrain editor dialog controls. For type 9 (edit box): formats with sprintf. For type 12 (combo): adjusts index with special cases for positions 0, 6, 10, 14 | MEDIUM |
| 0x005197AF | large | FUN_005197af | editor_read_controls | void | int | 496 bytes. Reads modified values from dialog controls back to editor arrays. Clamps values via FUN_005adfa0 (clamp). Returns count of clamped fields | MEDIUM |
| 0x005199A9 | stub | FUN_005199a9 | editor_refresh_display | void | void | Calls thunk_FUN_0051b2b6 (terrain editor paint) | MEDIUM |
| 0x005199C4 | medium | FUN_005199c4 | format_terrain_type_name | int terrType, int showSuffix | void | Appends terrain type name from DAT_00627cc0 (stride 0x18) to text buffer. Special cases: -1, -2, >=11 have custom labels | HIGH |
| 0x00519AB0 | xlarge | FUN_00519ab0 | export_terrain_rules_to_file | FILE* fp | bool | 695 bytes. Writes formatted terrain rules to file via fputs. Columns: name, movement, defense, yields, irrigation/mining data. Handles 33 terrain types + 11 resource types | HIGH |
| 0x00519D67 | large | show_messagebox_9D67 | editor_apply_terrain_changes | void | void | 269 bytes. String "TERRAIN": applies terrain editor changes, saves to RULES.TXT, shows error dialog on file I/O failure. Calls editor_read_controls, save_terrain_rules_from_editor, recalculates city production | HIGH |
| 0x00519E74 | xlarge | FUN_00519e74 | editor_rename_terrain | void | void | 881 bytes. "TERRNAME" dialog: renames terrain type. Reads current name, shows input dialog, updates all RULES.TXT references. Repopulates combo boxes | HIGH |
| 0x0051A1E5 | small | FUN_0051a1e5 | editor_show_terrain_help | void | void | Shows help text for "TERRAIN" section in editor | MEDIUM |
| 0x0051A244 | stub | FUN_0051a244 | editor_cancel_changes | void | void | Sets DAT_006a1d7c=0, invalidates editor window | MEDIUM |
| 0x0051A26C | xlarge | FUN_0051a26c | editor_select_terrain_sprite | void | void | 1036 bytes. Selects terrain sprite for forest/hills/mountains (types 3/4/5). Shows list dialog with "FOREST"/"HILLS"/"MOUNTAINS" keys. Maps selection to sprite data addresses (DAT_006461d8/DAT_006447b0/DAT_00647388). Handles overlay sprites for types >= 11 (special resources) | HIGH |
| 0x0051A678 | large | FUN_0051a678 | editor_select_river_sprite | void | void | 287 bytes. "RIVER" dialog: selects river sprite. Maps selection to DAT_0063f858 (base rivers) or DAT_0063fd18 (extended) | HIGH |
| 0x0051A797 | large | FUN_0051a797 | editor_select_coast_sprite | void | void | 288 bytes. "COAST" dialog: selects coastline sprite. Complex address calculation for 4-quadrant coastal tiles (mod 4 and div 4 indexing) | HIGH |
| 0x0051A8B7 | large | FUN_0051a8b7 | editor_select_misc_sprite | void | void | 407 bytes. "TERRMISC" dialog: selects misc terrain sprites (irrigation/mining/pollution/roads etc). Maps to various sprite data addresses by index | HIGH |
| 0x0051AA4E | xlarge | FUN_0051aa4e | editor_toggle_resource_visibility | void | void | 644 bytes. Toggles resource icon visibility in terrain editor. For types < 11: reads 2 combo selections to determine which resources to show/hide. For types >= 11: iterates resource slots 5-8 and 1-5 | MEDIUM |
| 0x0051ACDC | large | FUN_0051acdc | editor_handle_command | int cmdId | void | 289 bytes. Handles terrain editor commands: 0xC9=apply, 0xCF/0xD3=toggle resources. Shows "NOTICE" on validation errors | MEDIUM |
| 0x0051ADFD | xlarge | FUN_0051adfd | editor_create_control | int panelIdx | void | 931 bytes. Creates dialog control for terrain editor. Switch by panel: 0=terrain names list, 1/3=movement/food combos, 2/4=government/defense combos, 5=special resources. Uses thunk_FUN_00418bf0/FUN_00418910 for control creation | MEDIUM |
| 0x0051B1C2 | medium | FUN_0051b1c2 | editor_create_edit_field | int fieldIdx | void | 244 bytes. Creates edit field at position from DAT_00631bb0 layout table. Uses thunk_FUN_00418910 for text input | MEDIUM |
| 0x0051B2B6 | xlarge | FUN_0051b2b6 | editor_paint | void (this) | void | 2283 bytes. Main paint handler for terrain editor. Draws: background image (EDITORPT.GIF), terrain tile preview, overlay sprites, panel frames, 12+ labeled text fields at layout positions (DAT_00631bb0-DAT_00631be8). Extensive use of thunk_FUN_005bb024 for text rendering | HIGH |
| 0x0051BBA1 | xlarge | FUN_0051bba1 | terrain_editor_main | void (this) | void | 2646 bytes. **Main terrain editor entry point**. Creates editor window (560x380), loads EDITORPT.GIF background, creates all controls (15 panels), preview button, 4 action buttons. Main event loop: `while(DAT_006a1d7c != 0)`. String "EDITORPT_GIF". Initializes terrain rule arrays | HIGH |
| 0x0051C611 | stub | FUN_0051c611 | editor_main_dtor1 | void | void | FUN_005c656b | FRAMEWORK |
| 0x0051C627 | stub | FUN_0051c627 | seh_epilog_editor | void | void | SEH epilog | FRAMEWORK |
| 0x0051C635 | small | FUN_0051c635 | launch_terrain_editor | void | void | Wrapper: saves state, calls terrain_editor_main, restores | MEDIUM |
| 0x0051C68E | stub | FUN_0051c68e | editor_launch_dtor | void | void | thunk_FUN_004183d0 | FRAMEWORK |
| 0x0051C6A4 | stub | FUN_0051c6a4 | seh_epilog_launch | void | void | SEH epilog | FRAMEWORK |

### Cluster: Dialog Helpers (0x0051D3E0 - 0x0051D950)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0051D3E0 | large | FUN_0051d3e0 | show_dialog_with_checkboxes | p1-p7 | void | 351 bytes. Shows dialog via thunk_FUN_005a632a. If checkboxes enabled (bit 4 in flags byte), saves/restores checkbox state to/from DAT_00631ed8 bitmask. Sets DAT_00631edc = dialog result | HIGH |
| 0x0051D53F | stub | FUN_0051d53f | dialog_checkbox_dtor | void | void | thunk_FUN_0059df8a | FRAMEWORK |
| 0x0051D555 | stub | FUN_0051d555 | seh_epilog_checkbox | void | void | SEH epilog | FRAMEWORK |
| 0x0051D564 | medium | FUN_0051d564 | show_dialog_with_image | uint imgId, int type, char* title, p4, int p5 | void | 178 bytes. Shows dialog with image (CSocket::Create for layout, thunk_FUN_0059ec88 for image display). Sets DAT_00631edc | MEDIUM |
| 0x0051D616 | stub | FUN_0051d616 | dialog_image_dtor | void | void | thunk_FUN_0059df8a | FRAMEWORK |
| 0x0051D62C | stub | FUN_0051d62c | seh_epilog_image | void | void | SEH epilog | FRAMEWORK |
| 0x0051D63B | large | FUN_0051d63b | show_input_dialog | p1, p2, maxLen, defaultVal, char* outBuf | int | 253 bytes. Shows text input dialog. Strips leading spaces/tabs (replaces with '_'). Returns result code. Uses thunk_FUN_005a632a and thunk_FUN_005a5f34 | HIGH |
| 0x0051D738 | stub | FUN_0051d738 | input_dialog_dtor | void | void | thunk_FUN_0059df8a | FRAMEWORK |
| 0x0051D74E | stub | FUN_0051d74e | seh_epilog_input | void | void | SEH epilog | FRAMEWORK |
| 0x0051D75D | medium | FUN_0051d75d | show_numeric_input_dialog | p1, p2, int default, long* outVal | int | Converts default to string via itoa, shows input dialog, converts result via atol | HIGH |
| 0x0051D7BC | stub | FUN_0051d7bc | clear_checkbox_flags | void | void | Sets DAT_00631ed8 = 0 | HIGH |
| 0x0051D7D6 | small | FUN_0051d7d6 | set_checkbox_flag | byte idx, int state | void | Sets or clears bit `idx` in DAT_00631ed8 | HIGH |
| 0x0051D817 | stub | FUN_0051d817 | get_checkbox_flag | byte idx | uint | Returns bit `idx` from DAT_00631ed8 | HIGH |
| 0x0051D950 | small | FUN_0051d950 | to_uppercase | byte ch | int | Converts lowercase a-z (0x61-0x7A) to uppercase A-Z (subtract 0x20) | HIGH |

### Cluster: Multiplayer Setup (0x0051D9A0 - 0x0051EA0C)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0051D9A0 | xlarge | FUN_0051d9a0 | mp_startup_config | void | void | 952 bytes. Reads CIV.INI settings: "Civilization Gold" section, NetTimeOut (default 30), Adapter (default 0), MaxPlayers (4-7, default 7). Initializes multiplayer: resets save format, active civs. Switch on connection type: 0=IPX, 1=new TCP, 2=load TCP, 3=serial. Uses GetPrivateProfileIntA / WritePrivateProfileStringA. String "MULTITYPE2" | HIGH |
| 0x0051DD72 | stub | FUN_0051dd72 | mp_startup_dtor | void | void | thunk_FUN_0059df8a | FRAMEWORK |
| 0x0051DD88 | stub | FUN_0051dd88 | seh_epilog_mp_startup | void | void | SEH epilog | FRAMEWORK |
| 0x0051DD97 | xlarge | FUN_0051dd97 | new_game_setup | int param_1, int param_2 | void | 3152 bytes. **New game setup dialog sequence**. Shows difficulty selection ("DIFFICULTY"), number of enemies ("ENEMIES2"), barbarian activity ("BARBARITY"), custom rules ("RULES"/"ADVANCED"), accelerated start ("ACCELERATED"), multiplayer-specific rules ("ADVANCEDMP"). Manages game flags in DAT_00655ae8. Handles random enemy count. Sets DAT_00655b08=difficulty, DAT_00655b0d=num_ai, DAT_00655b09=barbarian level | HIGH |
| 0x0051E9E7 | stub | FUN_0051e9e7 | new_game_dtor | void | void | thunk_FUN_0059df8a | FRAMEWORK |
| 0x0051E9FD | stub | FUN_0051e9fd | seh_epilog_newgame | void | void | SEH epilog | FRAMEWORK |
| 0x0051EA0C | small | FUN_0051ea0c | mp_check_invalidate_2 | void | void | Similar to 0x00511b2d but with 0x961 timeout threshold and additional DAT_006ad66c/DAT_006ad670 checks. For turn timer | MEDIUM |

### Cluster: Turn Timer / Game Timer Dialog (0x0051EA8E - 0x0051F19C)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0051EA8E | xlarge | FUN_0051ea8e | game_timer_dialog | int isServer | void | 1579 bytes. "GAMETIMER" dialog: configures turn timer. Presets: 0=none, 1=30s, 2=60s, 3=120s, 4=180s, 5=300s, 6=custom (10-3600s). "CUSTOMGAMETIMER" for custom input. Server mode: sends timer to clients via enqueue_mp_event. Formats MM:SS display. DAT_00654b70 stores timer in milliseconds | HIGH |
| 0x0051F0F5 | stub | FUN_0051f0f5 | timer_dialog_dtor | void | void | thunk_FUN_0059df8a | FRAMEWORK |
| 0x0051F10B | stub | FUN_0051f10b | seh_epilog_timer | void | void | SEH epilog | FRAMEWORK |
| 0x0051F11A | small | FUN_0051f11a | mp_check_invalidate_3 | void | void | Checks DAT_006c9088/DAT_006c900c flags, sets dirty bit 0x400 if non-zero | MEDIUM |
| 0x0051F17E | stub | FUN_0051f17e | mp_process_messages | void | void | Calls thunk_FUN_0047e94e(1,0) -- process pending multiplayer messages | MEDIUM |

### Cluster: Civ Selection / Tribe Customization (0x0051F19C - end)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x0051F19C | xlarge | FUN_0051f19c | civ_selection_dialog | int playerNum, int gameMode, int isScenario | void | 9815 bytes. **MASSIVE**: Full civilization selection for new/multiplayer games. "GENDER" dialog for selecting civ from 21 options. Handles: tribe name entry ("CUSTOMTRIBE"), city style selection ("CUSTOMCITY" with 4 style images), email address for PBEM ("EMAILADDRESS"), leader names, city names. Manages DAT_00655b03=active_civ, DAT_00655b0b=human_civs_bitmask. Handles multiplayer: LOSTSERVER/SERVERQUIT detection, connection timeouts, ALREADYCHOSEN, lobby sync via thunk_FUN_0046b14d(0x30/0x31). Complex leader data at DAT_006554fe (stride 0x30) | HIGH |

---

## SUMMARY

### 1. Function Breakdown

**Total functions: 162**

| Category | Count | Description |
|----------|-------|-------------|
| Game Logic | 6 | Event dispatch, advisor recommendations, terrain rules I/O |
| UI/Dialog | 28 | Council video, terrain editor, new game setup, timer, civ selection |
| Network/MP | 10 | Message queue, event enqueue/dispatch, MP config |
| Drawing/Layout | 8 | Scale, draw line, frame, blit, text |
| Framework (MFC/CRT) | 68 | SEH epilogs, destructors, static inits, atexit handlers |
| Helpers/Utility | 10 | Clamp, uppercase, checkbox flags, index adjustment |
| Editor-specific | 32 | Terrain editor controls, paint, sprite selection |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_00511ba2 (dispatch_mp_event)** @ 0x00511BA2 -- 7252 bytes. The central multiplayer event dispatcher with ~100 event types covering every game notification (city capture, wonders, combat, diplomacy, space race, government change, espionage). This is the multiplayer equivalent of the main game event loop.

2. **FUN_0051f19c (civ_selection_dialog)** @ 0x0051F19C -- 9815 bytes. Complete civilization selection flow for all game modes, including tribe customization, leader naming, city style, and PBEM email setup. Controls critical global state (active_civ, human_civs_bitmask).

3. **FUN_0051dd97 (new_game_setup)** @ 0x0051DD97 -- 3152 bytes. The new game configuration dialog chain (difficulty, enemies, barbarians, custom rules, accelerated start). Sets all game initialization parameters.

4. **FUN_0051438f (netmsg_enqueue)** @ 0x0051438F -- 1602 bytes. Two-tier network message queue with priority (alpha) messages. Source path "D:\\Ss\\Franklinton\\NetMessageQueu" reveals developer name/location. Critical for multiplayer message ordering.

5. **FUN_00516947 (council_video_init)** @ 0x00516947 -- 1672 bytes. Advisor council initialization with video playback, 5 advisor recommendation system, cheat mode, and government change UI. Connects to AI advisor recommendation functions (FUN_004bc480 etc.).

### 3. New DAT_ Globals Identified with High Confidence

| Global | Type | Description | Confidence |
|--------|------|-------------|------------|
| DAT_00631130 | int* | MP event linked list head pointer | HIGH |
| DAT_00631134 | int* | MP event linked list tail pointer | HIGH |
| DAT_00631a98 | int | Advisor council dialog object pointer | HIGH |
| DAT_00631a9c | int | Advisor council display mode (0=initial, 1=active) | HIGH |
| DAT_00631acc | int | Government council video object pointer | HIGH |
| DAT_00631ad0 | int | Council video active flag | HIGH |
| DAT_00631ed8 | uint | Dialog checkbox bitmask (per-bit flags for multi-checkbox dialogs) | HIGH |
| DAT_00631edc | int | Dialog result code (shared across multiple dialog functions) | HIGH |
| DAT_006a1d7c | int | Terrain editor active flag (0=closed, 1=open) | HIGH |
| DAT_006a1d80 | int | Terrain editor control ID counter (starts at 0xC9) | HIGH |
| DAT_006a4f88 | int | Terrain editor window/dialog object pointer | HIGH |
| DAT_006a1d88 | char[33*0x28] | Terrain editor name array (33 terrain types, 40 chars each) | HIGH |
| DAT_006a2d28 | int[33*0x58/4] | Terrain editor properties array (33 types, 88 bytes each) | HIGH |
| DAT_006ad690 | int | Max network message queue watermark (primary) | HIGH |
| DAT_006ad694 | int | Max network message queue watermark (alpha/priority) | HIGH |
| DAT_006ad8b8 | uint | Multiplayer NetTimeOut setting (default 30, from CIV.INI) | HIGH |
| DAT_006c3164 | uint | MaxPlayers setting (4-7, default 7, from CIV.INI) | HIGH |
| DAT_006ad2fc | uint | Network adapter index (from CIV.INI) | HIGH |
| DAT_006c8fbc | uint | Network adapter secondary config | HIGH |
| DAT_00654b70 | int | Turn timer value in milliseconds (0=disabled, 30000-300000) | HIGH |
| DAT_00655142 | byte[12] | Advisor civ style byte array (maps advisor slot to civ style) | MEDIUM |
| DAT_0065514e | byte[12] | Advisor palette offset array (per-advisor music/palette index) | MEDIUM |
| DAT_0065515a | char[12*0x18] | Advisor name/title strings (stride 0x18 = 24 bytes each) | MEDIUM |
| DAT_00631b78 | int | Active popup dialog flag | MEDIUM |
| DAT_00631ee4 | int | Custom game flag: simplified map | MEDIUM |
| DAT_00631ee8 | int | Custom game flag: accelerated start turn count | MEDIUM |
| DAT_0062e018 | int | Terrain editor background image surface pointer | MEDIUM |
