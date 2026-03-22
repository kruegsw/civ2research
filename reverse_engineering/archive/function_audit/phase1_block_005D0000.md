# Phase 1 Analysis: block_005D0000 (0x005D0000 - 0x005DFFFF)

## Overview
This block is **100% SMEDS framework** (Sid Meier's Entertainment Development System) -- the middleware library used by Civilization II. It contains zero game logic functions. The block covers the sprite blit dispatch pipeline (6 already-documented dispatchers), sprite composition, coordinate scaling, a multimedia timer system (using `timerdll.dll`), debug logging, custom Win32 control classes (MSEditBoxClass, MSComboBoxClass, MSListBoxClass), wave audio playback (22kHz 8-bit mono with double-buffering), file I/O wrappers, MIDI/CD audio via MCI, global memory management (GlobalAlloc wrappers), resource DLL loading, the main SMEDS window system (5 window classes: MSWindowClass, MSMovieClass, MSControlClass, MSMrTimerClass, MSMMWindow), palette management for 8-bit color, GIF resource parsing, RLL (Run Length Limited) codec, and visual transition effects.

Source file paths embedded in strings confirm the SMEDS origin: `D:\Ss\Smeds32\Pctimer.cpp` and `D:\Ss\Smeds32\Pcmem.cpp`.

---

### Cluster: Sprite Blit Dispatchers (already documented)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D056C | 673 | FUN_005d056c | dispatch_oleitem_normal | int* out_rect, COleClientItem* surface, int transp, int x, int y | int* | Dispatches normal (non-dimmed) sprite blit via OLE surface. Scales source rect using DAT_006e47c8 lookup table and DAT_00637f98/DAT_00637f9c zoom. Calls FUN_005e518e (pixel_copy). Clips to surface bounds via IntersectRect | HIGH |
| 0x005D080D | 671 | FUN_005d080d | dispatch_timevec_normal | int* out_rect, _Timevec* surface, int transp, int x, int y | int* | Same as dispatch_oleitem_normal but locks _Timevec surface via FUN_005e6188. Calls ~_Timevec destructor after blit | HIGH |
| 0x005D0AAC | 787 | FUN_005d0aac | dispatch_oleitem_aniso | int* out_rect, COleClientItem* surface, int transp, int x, int y | int* | Anisotropic blit variant using separate x/y zoom params (DAT_00637fa0/fa4/fa8/fac) and separate lookup tables (DAT_006e47c0/c4). Calls FUN_005d1e00 (scale_coords_aniso) instead of FUN_005d1d00 | HIGH |
| 0x005D0DBF | 782 | FUN_005d0dbf | dispatch_timevec_aniso | int* out_rect, _Timevec* surface, int transp, int x, int y | int* | Anisotropic + _Timevec surface variant. Combines aniso scaling with locked surface access | HIGH |
| 0x005D10CD | 677 | FUN_005d10cd | dispatch_oleitem_dimmed | int* out_rect, COleClientItem* surface, int transp, int x, int y, int fill_color | int* | Dimmed (sentry) blit variant. Calls FUN_005e52bf (pixel_fill) instead of FUN_005e518e. Extra param_6 = fill color (typically 0x1a = dark gray) | HIGH |
| 0x005D1372 | 672 | FUN_005d1372 | dispatch_timevec_dimmed | int* out_rect, _Timevec* surface, int transp, int x, int y, int fill_color | int* | Dimmed + _Timevec surface variant. Locks surface, fills pixels with solid color | HIGH |

### Cluster: Sprite Composition & Record Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D1612 | 1297 | FUN_005d1612 | sprite_compose_overlay | int* src_sprite, LPRECT dst_record, int transp, int x_off, int y_off | void | Complex sprite overlay/composition with per-pixel transparency merging. First call initializes dst_record from src_sprite with offsets. Subsequent calls merge scanlines using 4-case switch: 0=empty, 1=dst-only, 2=src-only (offset by x), 3=both (per-pixel merge with transparency check against param_1[0xc]). Allocates merged scanline buffer via hmem_alloc | HIGH |
| 0x005D1B38 | 128 | FUN_005d1b38 | sprite_init_record | void (this=LPRECT) | void | Initializes sprite record: sets two rects to (0,0,0,0), scale to (1,1), transparency byte to 0, data pointers to 0 | MEDIUM |
| 0x005D1BB8 | 239 | FUN_005d1bb8 | sprite_get_pixel | int x, int y | byte | Returns pixel value at (x,y) from sprite scanline data. Bounds-checks against rect at +0x14..+0x1c, walks scanline linked list (offset+0x38) to find row, then reads pixel at column offset. Returns transparency color (offset+0x30) if out of bounds | HIGH |
| 0x005D1CB0 | 19 | FUN_005d1cb0 | identity_return | int val | int | Returns param_1 unchanged. Trivial passthrough | FRAMEWORK |
| 0x005D1CD0 | 44 | FUN_005d1cd0 | copy_4_dwords | int* src, int* dst | void | Copies 4 consecutive dwords from src to dst. Used for RECT copies | FRAMEWORK |

### Cluster: Coordinate Scaling & Transform

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D1D00 | 254 | FUN_005d1d00 | scale_coords | int value, int base, int round_up | int | Already named. Scales pixel coordinates using DAT_006e47c8 lookup table with DAT_00637f98/DAT_00637f9c zoom ratio. Handles negative values (abs, scale, re-negate). round_up=1 rounds up, 0 rounds down | HIGH |
| 0x005D1E00 | 234 | FUN_005d1e00 | scale_coords_aniso | int value, int base, int round_up, int zoom_num, int zoom_den, int table | int | 6-param version of scale_coords with explicit zoom numerator/denominator and lookup table pointer. Used by anisotropic blit dispatchers | HIGH |
| 0x005D1EF0 | 33 | FUN_005d1ef0 | offset_add | int delta | int | Returns this->offset_0xc + delta. Simple coordinate offset | FRAMEWORK |
| 0x005D1F20 | 33 | FUN_005d1f20 | offset_subtract | int delta | int | Returns delta - this->offset_0xc. Inverse of offset_add | FRAMEWORK |

### Cluster: Timer System (SMEDS Pctimer.cpp)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D1F50 | 157 | FUN_005d1f50 | timer_start | callback, int interval_ms, int repeat | void | Allocates timer manager singleton at DAT_00637ef4 (0x90 bytes) if not already created, then adds timer slot via timer_add_slot | HIGH |
| 0x005D2004 | 62 | FUN_005d2004 | timer_stop | int slot_id | void | Removes timer slot. Logs error if timer manager not initialized ("Error: MrTimer not initialized") | HIGH |
| 0x005D2042 | 159 | FUN_005d2042 | timer_add_slot | callback, int interval, int user_data | int (slot_id) | Finds first free slot in 16-slot array (0x11 max), calls FUN_005d44be to set timer ID, stores callback at [slot+1] and user_data at [slot+0x12]. Returns slot index or 0 on failure | HIGH |
| 0x005D20E6 | 56 | FUN_005d20e6 | timer_remove_slot | int slot_id | void | Clears callback at [slot+1] and kills timer via FUN_005d4664 | MEDIUM |
| 0x005D211E | 100 | FUN_005d211e | timer_manager_init | void | ptr | Initializes timer manager: zeros all 16 callback and user_data slots, creates timer window via create_window_423C, stores HWND at [0] | HIGH |
| 0x005D2182 | 95 | FUN_005d2182 | timer_manager_destroy | void | void | Destroys all active timers, then destroys timer window via manage_window_447C | MEDIUM |
| 0x005D21F0 | 26 | FID_conflict___E31 | crt_static_init | void | void | CRT static initializer stub (VS 1998 debug). Calls debug system init and registers atexit handler | FRAMEWORK |
| 0x005D220A | 26 | FUN_005d220a | debug_system_init | void | void | Calls FUN_005d246f to initialize debug timestamp | FRAMEWORK |
| 0x005D2224 | 29 | FUN_005d2224 | debug_register_atexit | void | void | Registers FUN_005d2241 via _atexit for cleanup at exit | FRAMEWORK |
| 0x005D2241 | 26 | FUN_005d2241 | debug_atexit_handler | void | void | Calls FUN_005d2498 to shut down debug system | FRAMEWORK |
| 0x005D423C | 571 | create_window_423C | timer_create_window | LONG param | HWND | Loads "timerdll.dll", gets 5 proc addresses (TimerCallBack, SetTimerID, GetTimerID, GetTimerIndex, ResetTimerNotified). Creates MSMrTimerClass window. Falls back to Win32 SetTimer if DLL unavailable. String: `D:\Ss\Smeds32\Pctimer.cpp` | HIGH |
| 0x005D447C | 66 | manage_window_447C | timer_destroy_window | void | void | Frees timerdll.dll, kills multimedia timer, destroys timer window | MEDIUM |

### Cluster: Timer Window Procedure & Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D44BE | 424 | FUN_005d44be | timer_dll_set_timer | HWND hwnd, int interval, int slot | int | Sets timer using timerdll.dll (timeSetEvent with 5ms resolution) or falls back to Win32 SetTimer. Stores timer ID via SetTimerID proc | MEDIUM |
| 0x005D4664 | 155 | FUN_005d4664 | timer_dll_kill_timer | HWND hwnd, int slot | void | Kills timer using timerdll.dll (timeKillEvent) or Win32 KillTimer. Gets timer ID via GetTimerID proc | MEDIUM |
| 0x005D4700 | 302 | FUN_005d4700 | timer_wndproc | HWND, UINT msg, WPARAM, LPARAM | LRESULT | WndProc for MSMrTimerClass. Handles WM_TIMER (0x113): gets slot index via GetTimerIndex, resets notification via ResetTimerNotified, calls stored callback with user_data. Also handles WM_DESTROY | MEDIUM |

### Cluster: Debug Logging (SMEDS)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D225B | 30 | debug_log | debug_log | char* msg | void | Already named. Delegates to FUN_005d24b3 (core log function) | HIGH |
| 0x005D2279 | 62 | FUN_005d2279 | debug_log_fmt1 | char* fmt, arg1 | void | sprintf with 1 arg into 1024-byte buffer, then calls core log | FRAMEWORK |
| 0x005D22B7 | 66 | FUN_005d22b7 | debug_log_fmt2 | char* fmt, arg1, arg2 | void | sprintf with 2 args, then calls core log | FRAMEWORK |
| 0x005D22F9 | 70 | FUN_005d22f9 | debug_log_fmt3 | char* fmt, arg1, arg2, arg3 | void | sprintf with 3 args, then calls core log | FRAMEWORK |
| 0x005D233F | 62 | FUN_005d233f | debug_log_fmt1b | char* fmt, arg1 | void | Duplicate of debug_log_fmt1 (identical pattern) | FRAMEWORK |
| 0x005D237D | 62 | FUN_005d237d | debug_log_fmt1c | char* fmt, arg1 | void | Duplicate of debug_log_fmt1 (identical pattern) | FRAMEWORK |
| 0x005D23BB | 66 | FUN_005d23bb | debug_log_fmt2b | char* fmt, arg1, arg2 | void | Duplicate of debug_log_fmt2 | FRAMEWORK |
| 0x005D23FD | 66 | FUN_005d23fd | debug_log_fmt2c | char* fmt, arg1, arg2 | void | Duplicate of debug_log_fmt2 | FRAMEWORK |
| 0x005D243F | 24 | FUN_005d243f | debug_set_log_to_file | byte flag | void | Sets DAT_00638304 (log-to-file flag) | FRAMEWORK |
| 0x005D2457 | 24 | FUN_005d2457 | debug_set_log_to_debug | byte flag | void | Sets DAT_00638308 (log-to-debugger flag) | FRAMEWORK |
| 0x005D246F | 41 | FUN_005d246f | debug_init_timestamp | void | DWORD* | Initializes debug system: calls FUN_005ed920 (file open?), stores GetTickCount() as baseline for `[%5d]` prefix | MEDIUM |
| 0x005D2498 | 27 | FUN_005d2498 | debug_shutdown | void | void | Calls FUN_005eda65 to close debug output | MEDIUM |
| 0x005D24B3 | 155 | FUN_005d24b3 | debug_log_core | char* msg | int(1) | Core log function: computes elapsed seconds via `(GetTickCount()-baseline)/1000`, formats `"[%5d]"` prefix, outputs to debugger (DAT_00638308) and/or file (DAT_00638304) | HIGH |

### Cluster: Custom Control Setup (MSEditBoxClass / MSComboBoxClass / MSListBoxClass)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D2550 | 24 | FUN_005d2550 | set_control_flag_e90 | byte val | void | Sets DAT_00637e90 | FRAMEWORK |
| 0x005D2568 | 40 | FUN_005d2568 | set_control_rgb_e94 | byte r, byte g, byte b | void | Sets DAT_00637e94/e98/e9c (likely background color) | FRAMEWORK |
| 0x005D2590 | 24 | FUN_005d2590 | set_control_flag_ea0 | byte val | void | Sets DAT_00637ea0 | FRAMEWORK |
| 0x005D25A8 | 24 | FUN_005d25a8 | set_control_font_ptr | ptr | void | Sets PTR_DAT_00637e68 (font pointer) | FRAMEWORK |
| 0x005D25C0 | 101 | FUN_005d25c0 | editbox_create_simple | parent, id, int x, int y, int w, style | void | Creates edit box at (x,y) with width w, height 0x1e. Sets font from PTR_DAT_00637e6c | FRAMEWORK |
| 0x005D2625 | 105 | FUN_005d2625 | editbox_create_with_text | parent, id, int x, int y, int w, style, text | void | Creates edit box and sets initial text via send_msg_2D7F | FRAMEWORK |
| 0x005D268E | 24 | FUN_005d268e | set_editbox_font | ptr | void | Sets PTR_DAT_00637e6c (edit box font pointer) | FRAMEWORK |
| 0x005D26B0 | 132 | FUN_005d26b0 | editbox_create_with_callback | parent, id, rect, style, callback | void | Creates edit box with validation callback at +0x34. Destroys previous control if exists | FRAMEWORK |
| 0x005D2740 | 705 | register_wndclass_2740 | editbox_register_and_create | int* rect, int parent, uint flags, int callback | HWND | Registers "MSEditBoxClass" by subclassing standard EDIT control. Gets original wndproc (DAT_006e47dc), creates custom class with extra window bytes, sets subclass wndproc to send_msg_2A01. Uses DAT_006e4ff0 (app hInstance) | HIGH |
| 0x005D2A01 | 778 | send_msg_2A01 | editbox_wndproc | HWND, UINT msg, WPARAM, LPARAM | LRESULT | Subclassed wndproc for MSEditBoxClass. Handles: WM_KEYDOWN (forwards Tab/Enter/Esc to parent), WM_KEYUP (checks VK range 0x2b0-0x2b4), WM_CHAR (validation callback at +0x34), WM_SETFOCUS (selects all text unless +0x38 set), WM_LBUTTONDOWN/WM_RBUTTONDOWN (activates parent window), WM_DESTROY (cleanup) | HIGH |
| 0x005D3130 | 480 | register_wndclass_3130 | combobox_register_and_create | int* rect, LONG parent, int visible | HWND | Registers "MSComboBoxClass" by subclassing COMBOBOX. Same pattern as editbox: custom class, extra window bytes, subclass wndproc at send_msg_3310 | HIGH |
| 0x005D3310 | 591 | send_msg_3310 | combobox_wndproc | HWND, uint msg, uint wparam, LPARAM | LRESULT | Subclassed wndproc for MSComboBoxClass. Handles WM_KEYDOWN (Tab/Enter/Esc to parent), WM_DESTROY, WM_LBUTTONDOWN/WM_RBUTTONDOWN (parent activation), custom msg 0x4C8 (hi-word 1 = selection change, 2 = edit change callbacks) | HIGH |
| 0x005D37A0 | 578 | register_wndclass_37A0 | listbox_register_and_create | int* rect, LONG parent, int visible, int sorted | HWND | Registers "MSListBoxClass" by subclassing LISTBOX. Style includes LBS_SORT (0x800) if sorted=1. Subclass wndproc at send_msg_39E2 | HIGH |
| 0x005D39E2 | 591 | send_msg_39E2 | listbox_wndproc | HWND, uint msg, uint wparam, LPARAM | LRESULT | Subclassed wndproc for MSListBoxClass. Near-identical structure to combobox_wndproc. Custom msg 0x4C8 dispatches to selection/edit callbacks | HIGH |

### Cluster: Edit Box Message Wrappers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D2D15 | 40 | FUN_005d2d15 | control_enable | HWND, BOOL enable | void | EnableWindow wrapper with null check | FRAMEWORK |
| 0x005D2D3D | 16 | FUN_005d2d3d | noop_edit | void | void | Empty function (no-op) | FRAMEWORK |
| 0x005D2D4D | 50 | send_msg_2D4D | edit_append_text | HWND, LPARAM buf | void | Gets text length (EM_GETLIMITTEXT 0xE), then gets text (WM_GETTEXT 0xD) | FRAMEWORK |
| 0x005D2D7F | 34 | send_msg_2D7F | edit_set_text | HWND, LPARAM text | void | WM_SETTEXT (0xC) | FRAMEWORK |
| 0x005D2DA1 | 37 | send_msg_2DA1 | edit_set_limit | HWND, WPARAM limit | void | EM_SETLIMITTEXT (0xC5) | FRAMEWORK |
| 0x005D2DC6 | 39 | send_msg_2DC6 | edit_set_sel | HWND, WPARAM start, LPARAM end | void | EM_SETSEL (0xB1) | FRAMEWORK |
| 0x005D2DED | 68 | send_msg_2DED | edit_get_line | HWND, WPARAM line, short* buf, short max_len | LRESULT | EM_GETLINE (0xC4) with buffer size prefix | FRAMEWORK |
| 0x005D2E31 | 35 | send_msg_2E31 | edit_get_line_count | HWND | void | EM_GETLINECOUNT (0xBA) | FRAMEWORK |
| 0x005D2E54 | 35 | send_msg_2E54 | edit_scroll_caret | HWND | void | EM_SCROLLCARET (0xCE, new in Win95) | FRAMEWORK |
| 0x005D2E77 | 37 | send_msg_2E77 | edit_line_from_char | HWND, WPARAM char_idx | void | EM_LINEFROMCHAR (0xC9) | FRAMEWORK |
| 0x005D2E9C | 37 | send_msg_2E9C | edit_line_index | HWND, WPARAM line | void | EM_LINEINDEX (0xBB) | FRAMEWORK |
| 0x005D2EC1 | 37 | send_msg_2EC1 | edit_line_length | HWND, WPARAM char_idx | void | EM_LINELENGTH (0xC1) | FRAMEWORK |
| 0x005D2EE6 | 39 | send_msg_2EE6 | edit_replace_sel | HWND, LPARAM text, WPARAM can_undo | void | EM_REPLACESEL (0xB6) | FRAMEWORK |
| 0x005D2F0D | 58 | send_msg_2F0D | edit_set_caret_pos | HWND, WPARAM pos | void | EM_SETSEL(pos,pos) + EM_SCROLLCARET(0xB7) | FRAMEWORK |
| 0x005D2F47 | 55 | send_msg_2F47 | edit_get_sel_end | HWND | uint | EM_GETSEL (0xB0), returns high word (end of selection) | FRAMEWORK |
| 0x005D2F7E | 76 | FUN_005d2f7e | edit_get_end_offset | HWND | int | Gets last line index + last line length = total char count | FRAMEWORK |
| 0x005D2FCA | 107 | FUN_005d2fca | edit_move_caret_to_end | HWND | void | Moves caret to end: get sel end -> line from char -> line index -> line length -> set caret | FRAMEWORK |
| 0x005D3035 | 37 | send_msg_3035 | edit_insert_text | HWND, LPARAM text | void | EM_REPLACESEL (0xC2, no undo) | FRAMEWORK |
| 0x005D305A | 118 | FUN_005d305a | edit_is_at_end | HWND | bool | Returns true if cursor is at end of text | FRAMEWORK |
| 0x005D30E0 | 67 | FUN_005d30e0 | edit_call_validator | int char_code | int | Calls validation callback at +0x34 if set, otherwise returns 1 (accept) | FRAMEWORK |

### Cluster: Combo Box Message Wrappers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D356E | 16 | FUN_005d356e | noop_combo | void | void | Empty function | FRAMEWORK |
| 0x005D357E | 37 | send_msg_357E | combo_add_string | HWND, LPARAM text | void | CB_ADDSTRING (0x143) | FRAMEWORK |
| 0x005D35A3 | 37 | send_msg_35A3 | combo_set_cursel | HWND, WPARAM index | void | CB_SETCURSEL (0x144) | FRAMEWORK |
| 0x005D35C8 | 66 | send_msg_35C8 | combo_set_font | HWND, HFONT font_handle | void | WM_SETFONT (0x30) via hmem_lock/unlock | FRAMEWORK |
| 0x005D360A | 35 | send_msg_360A | combo_reset_content | HWND | void | CB_RESETCONTENT (0x14B) | FRAMEWORK |
| 0x005D362D | 39 | send_msg_362D | combo_get_lbtext | HWND, WPARAM index, LPARAM buf | void | CB_GETLBTEXT (0x148) | FRAMEWORK |
| 0x005D3654 | 93 | send_msg_3654 | combo_get_selected_text | HWND, char* buf | void | Gets CB_GETCURSEL (0x147), then CB_GETLBTEXT. If -1, copies empty string | FRAMEWORK |
| 0x005D36B1 | 64 | send_msg_36B1 | combo_get_cursel | HWND | LRESULT | CB_GETCURSEL (0x147), returns -1 if none | FRAMEWORK |
| 0x005D36F6 | 37 | send_msg_36F6 | combo_set_cursel_2 | HWND, WPARAM index | void | CB_SETCURSEL (0x14E) | FRAMEWORK |
| 0x005D3720 | 51 | FUN_005d3720 | combo_call_change_callback | void | void | Calls callback at +0x30 with +0x04 param if set | FRAMEWORK |
| 0x005D3760 | 51 | FUN_005d3760 | combo_call_edit_callback | void | void | Calls callback at +0x34 with +0x04 param if set | FRAMEWORK |

### Cluster: List Box Message Wrappers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D3C40 | 16 | FUN_005d3c40 | noop_listbox | void | void | Empty function | FRAMEWORK |
| 0x005D3C50 | 37 | send_msg_3C50 | listbox_add_string | HWND, LPARAM text | void | LB_ADDSTRING (0x180) | FRAMEWORK |
| 0x005D3C75 | 37 | send_msg_3C75 | listbox_delete_string | HWND, WPARAM index | void | LB_DELETESTRING (0x182) | FRAMEWORK |
| 0x005D3C9A | 66 | send_msg_3C9A | listbox_set_font | HWND, HFONT font_handle | void | WM_SETFONT (0x30) via hmem_lock/unlock | FRAMEWORK |
| 0x005D3CDC | 35 | send_msg_3CDC | listbox_reset_content | HWND | void | LB_RESETCONTENT (0x184) | FRAMEWORK |
| 0x005D3CFF | 39 | send_msg_3CFF | listbox_get_text | HWND, WPARAM index, LPARAM buf | void | LB_GETTEXT (0x189) | FRAMEWORK |
| 0x005D3D26 | 60 | send_msg_3D26 | listbox_set_text | HWND, WPARAM index, LPARAM text | void | LB_DELETESTRING (0x182) + LB_INSERTSTRING (0x181) | FRAMEWORK |
| 0x005D3D62 | 93 | send_msg_3D62 | listbox_get_selected_text | HWND, char* buf | void | Gets LB_GETCURSEL (0x188), then LB_GETTEXT. If -1, copies empty string | FRAMEWORK |
| 0x005D3DBF | 64 | send_msg_3DBF | listbox_get_cursel | HWND | LRESULT | LB_GETCURSEL (0x188), returns -1 if none | FRAMEWORK |
| 0x005D3E04 | 64 | send_msg_3E04 | listbox_get_count | HWND | LRESULT | LB_GETCOUNT (0x190=400 decimal) | FRAMEWORK |
| 0x005D3E49 | 68 | send_msg_3E49 | listbox_find_string | HWND, LPARAM text, WPARAM start | LRESULT | LB_FINDSTRINGEXACT (0x191) | FRAMEWORK |
| 0x005D3E92 | 37 | send_msg_3E92 | listbox_set_cursel | HWND, WPARAM index | void | LB_SETCURSEL (0x186) | FRAMEWORK |
| 0x005D3EB7 | 39 | send_msg_3EB7 | listbox_insert_string | HWND, WPARAM index, LPARAM text | void | LB_INSERTSTRING (0x183) | FRAMEWORK |
| 0x005D3EDE | 39 | send_msg_3EDE | listbox_insert_string_at | HWND, LPARAM text, WPARAM index | void | LB_INSERTSTRING (0x183) with swapped param order | FRAMEWORK |
| 0x005D3F05 | 40 | send_msg_3F05 | listbox_set_item_data | HWND, LPARAM data, char index | void | LB_SETITEMDATA (0x185) | FRAMEWORK |
| 0x005D3F30 | 51 | FUN_005d3f30 | listbox_call_change_callback | void | void | Calls callback at +0x30 with +0x04 param if set | FRAMEWORK |
| 0x005D3F70 | 51 | FUN_005d3f70 | listbox_call_edit_callback | void | void | Calls callback at +0x34 with +0x04 param if set | FRAMEWORK |

### Cluster: Window Management Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D3FB0 | 100 | FUN_005d3fb0 | window_find_by_id | int id | bool | Searches array at +0x48 (stride 0xA4) for entry matching id. Returns 1 if found, 0 if not | FRAMEWORK |
| 0x005D4014 | 115 | FUN_005d4014 | window_invalidate_all | void | void | Iterates array at +0x48 (count at +0x38), calls manage_window_8B2D + invalidate_8B00 on each | FRAMEWORK |
| 0x005D4087 | 86 | FUN_005d4087 | window_show_all | void | void | Iterates array, calls manage_window_8B58 on each | FRAMEWORK |
| 0x005D40DD | 69 | FUN_005d40dd | window_iter_method1 | void | void | Iterates array, calls thunk_FUN_00447210 on each | FRAMEWORK |
| 0x005D4122 | 69 | FUN_005d4122 | window_iter_method2 | void | void | Iterates array, calls thunk_FUN_00421ca0 on each | FRAMEWORK |
| 0x005D4167 | 24 | FUN_005d4167 | set_global_ptr_e64 | ptr | void | Sets PTR_DAT_00637e64 | FRAMEWORK |
| 0x005D417F | 24 | FUN_005d417f | set_global_flag_e7c | byte val | void | Sets DAT_00637e7c | FRAMEWORK |
| 0x005D4197 | 24 | FUN_005d4197 | set_global_flag_e8c | byte val | void | Sets DAT_00637e8c | FRAMEWORK |
| 0x005D41AF | 40 | FUN_005d41af | set_global_rgb_e80 | byte r, byte g, byte b | void | Sets DAT_00637e80/e84/e88 | FRAMEWORK |

### Cluster: Timing Utilities

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D41E0 | 36 | FUN_005d41e0 | get_tick_60fps | void | uint | Returns `(GetTickCount() * 6) / 100` -- converts milliseconds to ~60fps frame ticks | MEDIUM |
| 0x005D4204 | 56 | FUN_005d4204 | delay_ticks | int count | void | Busy-waits until `count` ticks (at 60fps) have elapsed. Calls thunk_FUN_00407ff0 (message pump) in loop | MEDIUM |

### Cluster: Wave Audio System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D4A11 | 437 | FUN_005d4a11 | wave_out_open | void | int | Opens waveOut device. Searches for 22050Hz 8-bit mono support via waveOutGetNumDevs/waveOutGetDevCapsA. Stores handle at DAT_00638578 | HIGH |
| 0x005D4BBE | 161 | FUN_005d4bbe | wave_out_close | void | void | Closes waveOut device via waveOutClose, zeros DAT_00638578 | MEDIUM |
| 0x005D4C5F | 779 | FUN_005d4c5f | wave_load_file | char* filename, int* out | int | Loads WAV file via mmioOpen. Parses RIFF/WAVE/fmt/data chunks. Validates 22050Hz 8-bit mono format. Allocates 0xBC-byte sound node, copies PCM data | HIGH |
| 0x005D4F6A | 824 | FUN_005d4f6a | wave_load_file_streamed | char* filename, int* out | int | Same as wave_load_file but uses memory-mapped I/O (MMIO_ALLOCBUF flag). For larger files | HIGH |
| 0x005D52A2 | 929 | FUN_005d52a2 | wave_load_avi_stream | int avi_stream | int | Loads audio from AVI stream via AVIStreamInfo/AVIStreamReadFormat/AVIStreamRead. Validates 22050Hz PCM format | HIGH |
| 0x005D5660 | 172 | FUN_005d5660 | wave_node_free | int node | void | Frees sound node: releases HGLOBAL data buffer, frees node memory | MEDIUM |
| 0x005D570C | 30 | FUN_005d570c | wave_node_get_length | int node | int | Returns sample count from node+0x8C | FRAMEWORK |
| 0x005D572A | 46 | FUN_005d572a | wave_node_set_volume | int node, int volume | void | Stores volume (clamped 0-100) at node+0x70 | FRAMEWORK |
| 0x005D5758 | 46 | FUN_005d5758 | wave_node_set_pan | int node, int pan | void | Stores pan value at node+0x74 | FRAMEWORK |
| 0x005D5786 | 59 | FUN_005d5786 | wave_node_set_loop | int node, int start, int end | void | Sets loop start (node+0x78) and loop end (node+0x7c, or sample length if 0) | FRAMEWORK |
| 0x005D57C1 | 30 | FUN_005d57c1 | wave_node_get_flags | int node | short | Returns flags at node+0x88 | FRAMEWORK |
| 0x005D57DF | 41 | FUN_005d57df | wave_node_set_flag | int node, short flag | void | ORs flag into node+0x88 | FRAMEWORK |
| 0x005D5808 | 41 | FUN_005d5808 | wave_node_clear_flag | int node, short flag | void | ANDs ~flag into node+0x88 | FRAMEWORK |
| 0x005D5831 | 109 | FUN_005d5831 | wave_node_set_position | int node, int pos | void | Sets playback position (node+0x84) clamped to [0, sample_length-1] | FRAMEWORK |
| 0x005D589E | 30 | FUN_005d589e | wave_node_get_position | int node | int | Returns position at node+0x84 | FRAMEWORK |
| 0x005D58BC | 48 | FUN_005d58bc | wave_node_is_playing | int node | int | Returns 1 if flags (node+0x88) bit 2 is set (playing) | FRAMEWORK |
| 0x005D58EC | 48 | FUN_005d58ec | wave_node_is_looping | int node | int | Returns 1 if flags bit 1 is set (looping) | FRAMEWORK |
| 0x005D591C | 28 | FUN_005d591c | wave_get_active_count | void | int | Returns DAT_0063858c (active sound count) | FRAMEWORK |
| 0x005D5938 | 124 | FUN_005d5938 | wave_node_stop | int node | void | Stops playback: clears playing flag (bit 2), decrements DAT_0063858c | MEDIUM |
| 0x005D59B4 | 74 | FUN_005d59b4 | wave_node_start | int node | void | Sets playing flag (bit 2), increments DAT_0063858c | MEDIUM |
| 0x005D59FE | 139 | FUN_005d59fe | wave_list_add | int node | void | Adds node to linked list (DAT_006385d0 head, next at node+0x2e). Inserts at head | MEDIUM |
| 0x005D5A89 | 197 | FUN_005d5a89 | wave_list_remove | int node | void | Removes node from linked list. Handles head removal and mid-list removal | MEDIUM |
| 0x005D5B4E | 92 | FUN_005d5b4e | wave_list_find | int node | int | Searches linked list for node, returns 1 if found | FRAMEWORK |
| 0x005D5BAA | 54 | FUN_005d5baa | wave_stop_all_nodes | void | void | Iterates linked list, stops all playing nodes | MEDIUM |
| 0x005D5BE0 | 163 | FUN_005d5be0 | wave_setup_mix_buffers | void | int | Allocates mix buffers: DAT_006385c0 (buffer list), DAT_006385c8 (current buffer), DAT_00638584 (buffer count). Each buffer is 0x420 bytes (waveOutPrepareHeader) | MEDIUM |
| 0x005D5C83 | 162 | FUN_005d5c83 | wave_teardown_mix_buffers | void | void | Unprepares and frees all mix buffers via waveOutUnprepareHeader + hmem_free | MEDIUM |
| 0x005D5D11 | 640 | FUN_005d5d11 | wave_play_range | int node, int start, int end | void | Sets up playback range via AVIStreamTimeToSample, configures double-buffered output | HIGH |
| 0x005D5F91 | 167 | FUN_005d5f91 | wave_play_from_position | int node | void | Starts playback from current position (node+0x84). Triggers buffer callback | MEDIUM |
| 0x005D6038 | 371 | FUN_005d6038 | wave_play_sound | int node, int one_shot | void | Plays a sound: enforces max 5 concurrent sounds (DAT_0063858c). Opens waveOut if needed. Sets up mix buffers. Starts playback | HIGH |
| 0x005D61AB | 281 | FUN_005d61ab | wave_stop_sound | int node | void | Stops a playing sound. If no more active sounds, tears down mix buffers and closes waveOut | MEDIUM |
| 0x005D62C4 | 162 | FUN_005d62c4 | wave_pause_resume | int pause | void | Pauses (waveOutPause) or resumes (waveOutRestart) wave output | MEDIUM |
| 0x005D6366 | 155 | FUN_005d6366 | wave_set_volume_global | int volume | void | Sets global volume (0-100) at DAT_00638590 via waveOutSetVolume. Converts 0-100 to 0-0xFFFF | MEDIUM |
| 0x005D6401 | 104 | FUN_005d6401 | wave_get_volume_global | void | int | Gets global volume from waveOutGetVolume, converts 0-0xFFFF to 0-100 | MEDIUM |
| 0x005D6469 | 284 | FUN_005d6469 | wave_mix_buffer_add | int count | void | Adds mix buffers to active pool. Allocates more buffer nodes, prepares headers | MEDIUM |
| 0x005D6585 | 256 | FUN_005d6585 | wave_mix_buffer_release | void | void | Releases inactive mix buffers back to free pool | MEDIUM |
| 0x005D6685 | 181 | FUN_005d6685 | wave_buffer_grow | int count | void | Grows active buffer pool by allocating and preparing additional buffers | MEDIUM |
| 0x005D673A | 321 | FUN_005d673a | wave_buffer_shrink | int count | void | Shrinks active buffer pool by unpreparing and freeing excess buffers | MEDIUM |
| 0x005D687B | 204 | FUN_005d687b | wave_set_buffer_count | uint count | void | Sets desired buffer count (clamped to [2, DAT_00638584]). Grows or shrinks as needed | MEDIUM |
| 0x005D6947 | 229 | FUN_005d6947 | wave_submit_buffers | int* header_list | int | Submits prepared wave buffers to waveOut. XORs each sample byte with 0x80 (unsigned-to-signed conversion) before waveOutWrite | HIGH |
| 0x005D6A2E | 347 | FUN_005d6a2e | wave_mix_samples | int* dst_buf | void | Mixes all active sound nodes into output buffer. Per-sample: reads source, applies volume/pan, sums with clipping to [0,255]. Advances playback positions, handles loop and end-of-sound | HIGH |
| 0x005D6B89 | 272 | FUN_005d6b89 | wave_cleanup_all | void | void | Full cleanup: waveOutReset, unprepare all headers, free all buffers and nodes | HIGH |
| 0x005D6C99 | 1254 | FUN_005d6c99 | wave_buffer_callback | HWND hwnd, UINT msg, WPARAM, LPARAM header | void | Double-buffer completion callback. On WOM_DONE (0x3BD): refills completed buffer by calling wave_mix_samples, resubmits via waveOutWrite. Handles buffer recycling and end-of-playback detection | HIGH |

### Cluster: File I/O Wrappers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D7C00 | 110 | FUN_005d7c00 | fileio_init | void | void* | Initializes file I/O object: zeros handle, sets position to 0, size to 0 | FRAMEWORK |
| 0x005D7C6E | 73 | FUN_005d7c6e | fileio_close | void | void | Closes file handle if open, zeros struct | FRAMEWORK |
| 0x005D7CB7 | 91 | FUN_005d7cb7 | fileio_open_read | char* filename | int | Opens file for reading via OpenFile | FRAMEWORK |
| 0x005D7D12 | 195 | FUN_005d7d12 | fileio_read_block | void* buf, int size | int | Reads block from file, returns bytes read | FRAMEWORK |
| 0x005D7DD5 | 37 | FUN_005d7dd5 | fileio_get_size | void | int | Returns file size from struct | FRAMEWORK |
| 0x005D7DFA | 97 | FUN_005d7dfa | fileio_open_write | char* filename | int | Opens/creates file for writing | FRAMEWORK |
| 0x005D7E5B | 85 | FUN_005d7e5b | fileio_write_block | void* buf, int size | int | Writes block to file | FRAMEWORK |
| 0x005D7EB0 | 52 | FUN_005d7eb0 | fileio_seek | int offset, int origin | int | Seeks in file via SetFilePointer | FRAMEWORK |
| 0x005D7EE4 | 45 | FUN_005d7ee4 | fileio_get_position | void | int | Returns current file position | FRAMEWORK |
| 0x005D8270 | 321 | FUN_005d8270 | file_open | char* filename | int | Opens file with OpenFile: tries read-write (OF_READWRITE), falls back to read-only (OF_READ). Returns handle or logs error | MEDIUM |
| 0x005D83B4 | 34 | FUN_005d83b4 | file_open_readonly | char* filename | int | Opens file with OF_READ only | FRAMEWORK |
| 0x005D83D6 | 155 | FUN_005d83d6 | file_create | char* filename | HANDLE | CreateFileA with GENERIC_READ|GENERIC_WRITE, CREATE_ALWAYS | MEDIUM |
| 0x005D8476 | 123 | FUN_005d8476 | file_close | HANDLE handle | void | FlushFileBuffers + CloseHandle with error logging | MEDIUM |
| 0x005D84F1 | 81 | FUN_005d84f1 | file_read | void* buf, int size | int | ReadFile wrapper using handle at param+4 | FRAMEWORK |
| 0x005D8542 | 56 | FUN_005d8542 | file_write | void* buf, int size | int | WriteFile wrapper | FRAMEWORK |
| 0x005D857A | 49 | FUN_005d857a | file_seek | int offset, int origin | int | SetFilePointer wrapper | FRAMEWORK |
| 0x005D85AB | 30 | FUN_005d85ab | file_get_size | HANDLE handle | int | GetFileSize wrapper | FRAMEWORK |
| 0x005D85C9 | 63 | FUN_005d85c9 | file_seek_and_read | int offset, void* buf, int size | int | Seek then read in one call | FRAMEWORK |
| 0x005D8608 | 63 | FUN_005d8608 | file_seek_and_write | int offset, void* buf, int size | int | Seek then write in one call | FRAMEWORK |

### Cluster: Scrollbar

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DB0D0 | 112 | FUN_005db0d0 | set_scrollbar | HWND, int min, int max, int pos, int page | void | Already referenced in reference. Sets scrollbar range, page size, and position via SetScrollInfo | HIGH |

### Cluster: Error Handling (SMEDS Pcmem.cpp)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DAE6B | 70 | FUN_005dae6b | fatal_error | int code, char* msg, char* file, int line | void | Formats "FATAL ERROR" + "Error: %s File: %s Line: %d", shows MessageBox titled "SMEDS Application Error" | HIGH |
| 0x005DAEB1 | 70 | FUN_005daeb1 | warning_log | int code, char* msg, char* file, int line | void | Formats "WARNING" + same pattern, outputs via debug_log | HIGH |

### Cluster: Resource Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DB140 | 155 | FUN_005db140 | load_resource_dll | char* dll_name | HMODULE | LoadLibraryExA, stores handle in DAT_006e4f60 array, increments DAT_006387cc (count). Max 36 DLLs | HIGH |
| 0x005DB1FA | 249 | FUN_005db1fa | find_resource_bitmap | char* name | HGLOBAL | FindResourceA for type 0x02 (RT_BITMAP) across main exe + loaded DLLs. Returns LoadResource result | MEDIUM |
| 0x005DB2F8 | 205 | FUN_005db2f8 | find_resource_bitmap_alt | char* name | HGLOBAL | Same as find_resource_bitmap but separate implementation (identical logic) | MEDIUM |
| 0x005DB3CA | 354 | FUN_005db3ca | find_resource_named | CHAR* type_str, char* name | HGLOBAL | Sanitizes name (spaces/dots/apostrophes -> underscore), then FindResourceA with custom type across exe + DLLs | HIGH |
| 0x005DB531 | 26 | FUN_005db531 | lock_resource | HGLOBAL res | void | LockResource wrapper | FRAMEWORK |
| 0x005DB54B | 16 | FUN_005db54b | noop_resource | void | void | Empty function (FreeResource is a no-op in Win32) | FRAMEWORK |
| 0x005DB55B | 142 | FUN_005db55b | unload_resource_dll | HMODULE module | void | Finds module in DAT_006e4f60 array, shifts remaining entries down, decrements count, FreeLibrary | MEDIUM |
| 0x005DB5E9 | 28 | FUN_005db5e9 | hmem_get_size_wrapper | HGLOBAL handle | void | Wrapper for FUN_005dcef7 (GlobalSize) | FRAMEWORK |

### Cluster: Surface/Window Creation Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DB610 | 64 | FUN_005db610 | surface_record_init | void | ptr | Zeros 4 dwords of this-pointer struct (surface handle, width, height, flags) | FRAMEWORK |
| 0x005DB650 | 43 | FUN_005db650 | surface_destroy | void | void | Destroys surface at +8 via manage_window_C0AB | FRAMEWORK |
| 0x005DB67B | 137 | FUN_005db67b | surface_create_and_show | parent, id, int x, int y, int w, int h, int flags | void | Creates surface via create_window_BC10, binds to struct, calls show callback | FRAMEWORK |
| 0x005DB704 | 142 | FUN_005db704 | surface_create_and_setup | parent, id, int x, int y, int w, int h | void | Creates surface, binds, calls FUN_005bc019 with 0x10 flag | FRAMEWORK |
| 0x005DB792 | 125 | FUN_005db792 | surface_create_movie | parent, id, int x, int y, int w, int h | void | Creates movie surface via FUN_005ee0b1 | FRAMEWORK |
| 0x005DB80F | 132 | FUN_005db80f | surface_create_movie_child | parent, id, int x, int y, int w, int h | void | Creates child movie surface (gets parent via thunk_FUN_00414d10) | FRAMEWORK |
| 0x005DB893 | 144 | FUN_005db893 | surface_create_child_and_show | parent, id, int x, int y, int w, int h, flags | void | Creates child surface and shows via callback | FRAMEWORK |
| 0x005DB923 | 149 | FUN_005db923 | surface_create_child_and_setup | parent, id, int x, int y, int w, int h | void | Creates child surface with 0x10 flag | FRAMEWORK |
| 0x005DB9B8 | 88 | FUN_005db9b8 | show_dialog_modal | char param_1, int x, int y | void | Shows dialog: if param_1==0 uses standalone, else creates as child | FRAMEWORK |
| 0x005DBA15 | 88 | FUN_005dba15 | show_dialog_modeless | char param_1, int x, int y | void | Same pattern but with modeless flag (0 vs 1 second param to FUN_005bd298) | FRAMEWORK |
| 0x005DBA72 | 35 | FUN_005dba72 | send_gdi_resize_400 | void | void | Calls gdi_D39E(0x400) | FRAMEWORK |
| 0x005DBA95 | 35 | FUN_005dba95 | send_gdi_resize_100 | void | void | Calls gdi_D39E(0x100) | FRAMEWORK |
| 0x005DBAB8 | 35 | FUN_005dbab8 | send_gdi_resize_200 | void | void | Calls gdi_D39E(0x200) | FRAMEWORK |
| 0x005DBADB | 27 | FUN_005dbadb | flush_display_1 | void | void | Calls FUN_005bd4cd | FRAMEWORK |
| 0x005DBAF6 | 27 | FUN_005dbaf6 | flush_display_2 | void | void | Calls FUN_005bd500 | FRAMEWORK |

### Cluster: SMEDS Application Init/Shutdown

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DBB20 | 47 | FUN_005dbb20 | smeds_init | HINSTANCE hInst, int flags | int(1) | Stores hInstance at DAT_006e4ff0, flags at DAT_006e4fec. Calls subsystem inits | HIGH |
| 0x005DBB4F | 100 | FUN_005dbb4f | smeds_shutdown | void | int(1) | Shutdown sequence: cleanup, logs "SMEDS> Terminated Normally.", destroys timer manager, GdiFlush | HIGH |
| 0x005DBBB3 | 35 | FUN_005dbbb3 | smeds_init_gdi | void | void | Initializes GDI subsystem (thunk_FUN_00417ef0 + FUN_005cd6e0) | FRAMEWORK |
| 0x005DBBD6 | 69 | FUN_005dbbd6 | smeds_init_subsystems | void | void | Registers window classes, initializes PRNG with time(), calls InitCommonControls | HIGH |
| 0x005DBC1B | 31 | FUN_005dbc1b | smeds_cleanup | void | void | Calls window cleanup, audio cleanup, class unregistration | FRAMEWORK |
| 0x005DBC3A | 16 | FUN_005dbc3a | smeds_hook_init | void | void | Empty virtual hook (overridable by game) | FRAMEWORK |
| 0x005DBC4A | 16 | FUN_005dbc4a | smeds_hook_cleanup | void | void | Empty virtual hook | FRAMEWORK |

### Cluster: SMEDS Window System

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DBC5A | 352 | register_wndclass_BC5A | register_smeds_window_classes | void | void | Registers 4 SMEDS window classes: MSWindowClass (wndproc=fill_rect_BE88), MSMovieClass (wndproc=FUN_005ec317), MSControlClass (wndproc=send_msg_9307), MSMrTimerClass (wndproc=FUN_005d4700) | HIGH |
| 0x005DBDBA | 206 | FUN_005dbdba | unregister_smeds_classes | void | void | Unregisters all 5 SMEDS classes: MSAppWindow, MSWindowClass, MSMovieClass, MSControlClass, MSMrTimerClass. Logs errors on failure | HIGH |
| 0x005DBE88 | 3076 | fill_rect_BE88 | mswindow_wndproc | HWND, uint msg, WPARAM, uint lparam | LRESULT | Main wndproc for MSWindowClass. Handles: WM_PAINT (icon drawing when minimized, tiled background bitmap, centered overlay bitmap), WM_DESTROY (menu removal, parent notification), WM_MOVE (re-acquires DC), WM_SIZE (invalidates if overlay present, re-acquires DC), WM_SETFOCUS/WM_KILLFOCUS (forwards activation to child), WM_NCHITTEST (custom resize handles with configurable border width at +0x3c, caption drag area at +0x38), WM_WINDOWPOSCHANGING (z-order enforcement for +0x200 style), WM_MOUSEACTIVATE (0x22, child activation), WM_SYSCOMMAND (blocks Alt+Space if +0x48 flag 0x20 clear), WM_LBUTTONDOWN/WM_RBUTTONDOWN (focus+raise for child mode) | HIGH |

### Cluster: Timer Manager Destructor

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DCAC0 | 57 | FUN_005dcac0 | timer_manager_dtor | byte flags | void* | Destroys timer manager: calls timer_manager_destroy, conditionally deletes self if bit 0 set | FRAMEWORK |

### Cluster: Memory Management Wrappers (Thunks + Core)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DCB00 | 28 | FUN_005dcb00 | thunk_hmem_duplicate | HGLOBAL handle | void | Thunk to FUN_005dcd70 | FRAMEWORK |
| 0x005DCB1C | 28 | FUN_005dcb1c | thunk_hmem_lock | HGLOBAL handle | void | Thunk to FUN_005dcdf9 | FRAMEWORK |
| 0x005DCB38 | 28 | FUN_005dcb38 | thunk_hmem_unlock | HGLOBAL handle | void | Thunk to FUN_005dce29 | FRAMEWORK |
| 0x005DCB54 | 28 | FUN_005dcb54 | thunk_hmem_alloc | SIZE_T size | void | Thunk to FUN_005dce4f | FRAMEWORK |
| 0x005DCB70 | 28 | FUN_005dcb70 | thunk_hmem_free | HGLOBAL handle | void | Thunk to FUN_005dce96 | FRAMEWORK |
| 0x005DCB8C | 36 | FUN_005dcb8c | thunk_hmem_copy | src, dst, size | void | Thunk to FUN_005dced3 | FRAMEWORK |
| 0x005DCBB0 | 28 | FUN_005dcbb0 | thunk_hmem_get_size | HGLOBAL handle | void | Thunk to FUN_005dcef7 | FRAMEWORK |
| 0x005DCBCC | 32 | FUN_005dcbcc | thunk_hmem_realloc | handle, new_size | void | Thunk to FUN_005dcf11 | FRAMEWORK |
| 0x005DCBEC | 21 | FUN_005dcbec | thunk_hmem_max_alloc | void | int | Thunk to FUN_005dcfb5 | FRAMEWORK |
| 0x005DCC10 | 34 | FUN_005dcc10 | timevec_init | void | ptr | Zeros this[0], returns this | FRAMEWORK |
| 0x005DCC32 | 36 | ~_Timevec | ~_Timevec | void | void | Library destructor for _Timevec (VS 1998 Debug). Calls FUN_005e10c7 | FRAMEWORK |
| 0x005DCC56 | 63 | FUN_005dcc56 | menu_add_item_resolved | int id, text, cmd, data | void | Resolves string via FUN_005dcd40, then calls build_menu_16E0 | FRAMEWORK |
| 0x005DCC95 | 44 | FUN_005dcc95 | menu_add_item_direct | text, data, cmd | void | Calls build_menu_1768 directly | FRAMEWORK |
| 0x005DCCC1 | 40 | Realloc | Realloc | ptr, size | void | MFC library Realloc (CHtmlStream/CMemFile). Delegates to FUN_005e17db | FRAMEWORK |
| 0x005DCCE9 | 51 | FUN_005dcce9 | menu_remove_item | int id | void | Resolves string, calls build_menu_1805 to remove | FRAMEWORK |
| 0x005DCD1C | 36 | FUN_005dcd1c | menu_remove_direct | int id | void | Calls build_menu_1805 directly | FRAMEWORK |
| 0x005DCD40 | 42 | FUN_005dcd40 | string_resolve | int id | void | Resolves string ID via FUN_005e1599 using this[0] base | FRAMEWORK |
| 0x005DCD70 | 137 | FUN_005dcd70 | hmem_duplicate | HGLOBAL* handle_ptr | void | GlobalSize -> alloc -> lock -> memcpy -> unlock. Replaces *handle_ptr with copy | HIGH |
| 0x005DCDF9 | 43 | FUN_005dcdf9 | hmem_lock | HGLOBAL handle | LPVOID | GlobalLock wrapper with null check | HIGH |
| 0x005DCE29 | 38 | FUN_005dce29 | hmem_unlock | HGLOBAL handle | int(0) | GlobalUnlock wrapper with null check | HIGH |
| 0x005DCE4F | 71 | FUN_005dce4f | hmem_alloc | SIZE_T size | HGLOBAL | GlobalAlloc(0x42=GMEM_MOVEABLE|GMEM_ZEROINIT, size). Fatal error on failure (Pcmem.cpp line 0x4c) | HIGH |
| 0x005DCE96 | 56 | FUN_005dce96 | hmem_free | HGLOBAL handle | HGLOBAL | GlobalFree with null error log ("Error: Tried to dispose of NULL HMEM") | HIGH |
| 0x005DCED3 | 36 | FUN_005dced3 | hmem_copy | void* src, void* dst, size_t size | void | memcpy wrapper (note: src/dst order swapped from C convention) | HIGH |
| 0x005DCEF7 | 26 | FUN_005dcef7 | hmem_get_size | HGLOBAL handle | SIZE_T | GlobalSize wrapper | FRAMEWORK |
| 0x005DCF11 | 164 | FUN_005dcf11 | hmem_realloc | HGLOBAL* handle_ptr, int new_size | void | Alloc new -> lock both -> copy min(old,new) -> free old -> replace ptr | HIGH |
| 0x005DCFB5 | 21 | FUN_005dcfb5 | hmem_max_alloc_size | void | int(0x100000) | Returns 1MB constant (max single allocation size) | FRAMEWORK |
| 0x005DCFCA | 58 | FUN_005dcfca | hmem_would_exceed_max | int size_kb | bool | Returns true if size_kb * 1024 > 0x100000 | FRAMEWORK |

### Cluster: Audio/Video Object Construction & Playback

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DD010 | 336 | FUN_005dd010 | av_manager_ctor | void | ptr | Constructs audio/video manager object: initializes subsystems (FUN_005eeca0, FUN_005c64da, FUN_005bd630), sets vtable PTR_FUN_0061d718, zeros many fields (0x45, 0x168-0x16d, 0x284-0x289). Stores self at _DAT_006389d0 | MEDIUM |
| 0x005DD1A0 | 144 | FUN_005dd1a0 | av_manager_dtor | void | void | Destroys audio/video manager: shuts down subsystems in reverse order, zeros _DAT_006389d0 | MEDIUM |
| 0x005DD230 | 15 | FUN_005dd230 | av_dtor_step1 | void | void | Calls FUN_005bd915 | FRAMEWORK |
| 0x005DD23F | 15 | FUN_005dd23f | av_dtor_step2 | void | void | Calls FUN_005c656b | FRAMEWORK |
| 0x005DD24E | 15 | FUN_005dd24e | av_dtor_step3 | void | void | Calls FUN_005eed1b | FRAMEWORK |
| 0x005DD25D | 9 | FUN_005dd25d | av_dtor_step4 | void | void | Calls thunk_FUN_0044cba0 | FRAMEWORK |
| 0x005DD270 | 14 | FUN_005dd270 | seh_unwind | void | void | SEH frame unwinder (restores FS:[0]) | FRAMEWORK |
| 0x005DD27E | 101 | FUN_005dd27e | av_init_standalone | parent, id, int x, int y | void | Initializes A/V with 320x240 (0x140 x 0xf0) window, sets surface at +0x124 | MEDIUM |
| 0x005DD2E3 | 148 | FUN_005dd2e3 | av_init_child | parent, id, int x, int y, int owner | void | Initializes A/V as child window (stores owner+0x48 for parent relationship) | MEDIUM |
| 0x005DD377 | 75 | FUN_005dd377 | av_play_file | char* filename | int | Plays audio/video file via FUN_005e1c8e. Returns 0 on failure | MEDIUM |
| 0x005DD3C2 | 47 | FUN_005dd3c2 | av_stop | void | void | Stops playback: zeros +0xa24, calls FUN_005e22ed | MEDIUM |
| 0x005DD3F1 | 108 | FUN_005dd3f1 | av_play_range | int start, int end | void | Plays range [start,end]: sets +0xa10/+0xa14 bounds, starts playback | MEDIUM |
| 0x005DD45D | 42 | FUN_005dd45d | av_reset | void | void | Calls FUN_005e28cd (reset to beginning) | FRAMEWORK |
| 0x005DD487 | 59 | FUN_005dd487 | av_play_continuous | void | void | Sets +0xa24=1 (looping), starts playback | MEDIUM |
| 0x005DD4C2 | 91 | FUN_005dd4c2 | av_play_range_loop | int start, int end | void | Sets range and loops: +0xa10=start, +0xa14=end, +0xa24=1 | MEDIUM |
| 0x005DD51D | 34 | FUN_005dd51d | av_pause | void | void | Calls FUN_005e2675 (pause) | FRAMEWORK |
| 0x005DD53F | 34 | FUN_005dd53f | av_resume | void | void | Calls FUN_005e26f6 (resume) | FRAMEWORK |
| 0x005DD561 | 67 | FUN_005dd561 | av_set_surface | int surface | void | Sets rendering surface and display callback | FRAMEWORK |
| 0x005DD5A4 | 168 | FUN_005dd5a4 | av_resize_to_fit | COleClientItem* surface | void | Resizes A/V display to fit surface dimensions. Calls show_messagebox_2997 for layout | FRAMEWORK |
| 0x005DD64C | 210 | FUN_005dd64c | av_set_position | COleClientItem* surface, int x, int y | void | Positions A/V display at (x,y) within surface bounds | FRAMEWORK |
| 0x005DD71E | 67 | FUN_005dd71e | av_double_size | void | void | Doubles display size (width*2, height*2), sets +0x5a0=1 flag | FRAMEWORK |
| 0x005DD761 | 125 | FUN_005dd761 | av_set_stretch | int enable | void | Enables/disables stretch mode at +0x5a4, calls FUN_005e32b2 to update | FRAMEWORK |
| 0x005DD7DE | 159 | FUN_005dd7de | av_repaint | void | void | Repaints A/V at stored position (+0x5b8, +0x5bc) to parent surface (+0x5b4) | FRAMEWORK |
| 0x005DD87D | 16 | FUN_005dd87d | noop_av | void | void | Empty function | FRAMEWORK |

### Cluster: MIDI / CD Audio (MCI Interface)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DD8A0 | 159 | register_wndclass_D8A0 | register_mm_window | void | void | Registers "MSMMWindow" class (for MCI notifications), creates hidden window at DAT_006e4ff8. Opens cdaudio device via FUN_005ddd4e | HIGH |
| 0x005DD93F | 149 | FUN_005dd93f | mm_wndproc | HWND, UINT msg, WPARAM, uint lparam | LRESULT | WndProc for MSMMWindow. Handles MM_MCINOTIFY (0x3B9): if MCI_NOTIFY_SUCCESSFUL and device matches DAT_006389d4 (MIDI), calls MIDI done callback; if matches DAT_006389d8 (CD), calls CD done callback | HIGH |
| 0x005DD9D9 | 28 | FUN_005dd9d9 | snd_play_async | char* filename | void | sndPlaySoundA(filename, SND_ASYNC=1) | FRAMEWORK |
| 0x005DD9F5 | 28 | FUN_005dd9f5 | snd_play_loop | char* filename | void | sndPlaySoundA(filename, SND_ASYNC|SND_LOOP=9) | FRAMEWORK |
| 0x005DDA11 | 26 | FUN_005dda11 | snd_stop | void | void | sndPlaySoundA(NULL, SND_ASYNC) -- stops current sound | FRAMEWORK |
| 0x005DDA2B | 16 | FUN_005dda2b | noop_snd | void | void | Empty function | FRAMEWORK |
| 0x005DDA3B | 24 | FUN_005dda3b | snd_beep | void | void | MessageBeep(0xFFFFFFFF) -- default system beep | FRAMEWORK |
| 0x005DDA53 | 372 | show_messagebox_DA53 | midi_play | char* filename | MCIERROR | Opens MIDI via mciSendCommand MCI_OPEN "sequencer", checks for MIDI Mapper availability (MessageBox if not), starts MCI_PLAY with notification to DAT_006e4ff8. Stores device ID at DAT_006389d4 | HIGH |
| 0x005DDBC7 | 326 | FUN_005ddbc7 | cdaudio_play_track | byte track_num | int | Plays CD track: MCI_SEEK to track, MCI_PLAY with from/to range. Opens device if needed. Handles last track specially (MCI_PLAY without MCI_TO). Returns 1 on success | HIGH |
| 0x005DDD12 | 60 | FUN_005ddd12 | midi_stop | void | void | Stops MIDI: mciSendCommand MCI_STOP + MCI_CLOSE, zeros DAT_006389d4 | HIGH |
| 0x005DDD4E | 265 | FUN_005ddd4e | cdaudio_open | void | void | Opens "cdaudio" device, sets time format to MCI_FORMAT_TMSF (format 3=tracks), gets total track count at DAT_006389e0 via MCI_STATUS | HIGH |
| 0x005DDE57 | 70 | FUN_005dde57 | cdaudio_close | void | void | Closes cdaudio device: MCI_CLOSE, zeros DAT_006389d8 and DAT_006389e0 | MEDIUM |
| 0x005DDE9D | 50 | FUN_005dde9d | cdaudio_stop | void | void | Stops CD playback: mciSendCommand MCI_STOP on DAT_006389d8 | MEDIUM |
| 0x005DDECF | 48 | manage_window_DECF | audio_shutdown_all | void | void | Stops all audio: snd_stop, cdaudio_stop, cdaudio_close, midi_stop, destroys MM window | HIGH |
| 0x005DDEFF | 270 | FUN_005ddeff | cdaudio_get_track_count | void | int | Opens cdaudio if needed, queries total tracks via MCI_STATUS MCI_FORMAT_TMSF. Returns track count or -1 | MEDIUM |
| 0x005DE00D | 168 | FUN_005de00d | cdaudio_eject | void | void | Ejects CD tray: MCI_SET with MCI_SET_DOOR_OPEN (0x100) | MEDIUM |
| 0x005DE0B5 | 232 | FUN_005de0b5 | cdaudio_close_tray | void | void | Closes CD tray: MCI_SET with MCI_SET_DOOR_CLOSED (0x200) via stored DAT_006389dc device | MEDIUM |
| 0x005DE19D | 179 | FUN_005de19d | cdaudio_pause_resume | void | void | Toggles pause: checks MCI_STATUS_MODE, if 0x20D (playing) pauses, if stopped resumes | MEDIUM |
| 0x005DE250 | 192 | FUN_005de250 | cdaudio_pause_resume_2 | void | void | Similar toggle: if 0x20D plays, if 0x211 (paused) resumes | MEDIUM |
| 0x005DE310 | 270 | FUN_005de310 | cdaudio_play_next | void | void | Plays next CD track: queries current track via MCI_STATUS, increments (wraps to 1 if at end) | MEDIUM |
| 0x005DE41E | 267 | FUN_005de41e | cdaudio_play_prev | void | void | Plays previous CD track: queries current, decrements (stays at 1 if already first) | MEDIUM |
| 0x005DE529 | 231 | FUN_005de529 | cdaudio_get_position | uint* minutes, uint* seconds, uint* frames | int | Gets current CD position via MCI_STATUS MCI_FORMAT_MSF, extracts minutes/seconds/frames from packed format | MEDIUM |

### Cluster: Audio Thunks (Public API Layer)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DE620 | 28 | FUN_005de620 | api_snd_play_async | char* filename | void | Thunk to snd_play_async | FRAMEWORK |
| 0x005DE63C | 28 | FUN_005de63c | api_snd_play_loop | char* filename | void | Thunk to snd_play_loop | FRAMEWORK |
| 0x005DE658 | 28 | FUN_005de658 | api_snd_noop | char* filename | void | Thunk to noop_snd | FRAMEWORK |
| 0x005DE674 | 21 | FUN_005de674 | api_snd_beep | void | void | Thunk to snd_beep | FRAMEWORK |
| 0x005DE689 | 28 | FUN_005de689 | api_midi_play | char* filename | void | Thunk to midi_play | FRAMEWORK |
| 0x005DE6A5 | 24 | FUN_005de6a5 | set_midi_done_callback | code* callback | void | Sets DAT_006e5004 (MIDI completion callback) | FRAMEWORK |
| 0x005DE6BD | 35 | FUN_005de6bd | midi_done_notify | void | void | Calls MIDI completion callback if set | FRAMEWORK |
| 0x005DE6E0 | 28 | FUN_005de6e0 | api_cdaudio_play | byte track | void | Thunk to cdaudio_play_track | FRAMEWORK |
| 0x005DE6FC | 24 | FUN_005de6fc | set_cdaudio_done_callback | code* callback | void | Sets DAT_006e5000 (CD completion callback) | FRAMEWORK |
| 0x005DE714 | 35 | FUN_005de714 | cdaudio_done_notify | void | void | Calls CD completion callback if set | FRAMEWORK |
| 0x005DE737 | 21 | FUN_005de737 | api_midi_stop | void | void | Thunk to midi_stop | FRAMEWORK |
| 0x005DE74C | 21 | FUN_005de74c | api_snd_stop | void | void | Thunk to snd_stop | FRAMEWORK |
| 0x005DE761 | 21 | FUN_005de761 | api_cdaudio_stop | void | void | Thunk to cdaudio_stop | FRAMEWORK |

### Cluster: Palette Management (8-bit Color)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DE780 | 516 | gdi_E780 | palette_init_system | short* logpalette | void | Initializes 256-entry LOGPALETTE from system palette via GetSystemPaletteEntries. Marks first/last DAT_006e500c entries as fixed (flag 0), middle as animatable (flag 4). If no hardware palette support (DAT_00638b48==0), fills 10+10 static colors from DAT_00638b50 table | HIGH |
| 0x005DE984 | 92 | FUN_005de984 | palette_mark_animatable | int* palette, int start, int count | void | Sets flag byte to 1 (PC_RESERVED) for entries [start, start+count) | FRAMEWORK |
| 0x005DE9E0 | 130 | FUN_005de9e0 | palette_copy_range | int* palette, int start, int count | void | Copies RGB values from source range to destination range | FRAMEWORK |
| 0x005DEA62 | 60 | update_palette_EA62 | palette_animate | int* palette, HPALETTE hpal, UINT start, UINT count | void | AnimatePalette wrapper (only if DAT_00638b48==1, hardware palette mode) | MEDIUM |
| 0x005DEA9E | 61 | FUN_005dea9e | palette_get_entry | int* palette, int index, byte* r, byte* g, byte* b | void | Reads RGB from palette entry at index*4+4 | FRAMEWORK |
| 0x005DEADB | 55 | FUN_005deadb | palette_set_entry_simple | int* palette, int index, byte r, byte g, byte b | void | Sets RGB at palette entry (no flag update) | FRAMEWORK |
| 0x005DEB12 | 316 | FUN_005deb12 | palette_set_entry | int* palette, int index, char r, char g, char b | void | Sets RGB at entry, sets flag to PC_NOCOLLAPSE (4). Checks if color matches any static entry (first or last DAT_006e500c entries); if so sets flag to PC_RESERVED (1) instead | MEDIUM |
| 0x005DEC4E | 60 | FUN_005dec4e | palette_create | LOGPALETTE* logpal | HPALETTE | CreatePalette wrapper (only if DAT_00638b48==1) | FRAMEWORK |
| 0x005DEC8A | 39 | FUN_005dec8a | palette_delete | HGDIOBJ hpal | void | DeleteObject wrapper (only if DAT_00638b48==1) | FRAMEWORK |
| 0x005DECB1 | 60 | FUN_005decb1 | palette_set_entries | int* palette, HPALETTE hpal, UINT start, UINT count | void | SetPaletteEntries wrapper (only if DAT_00638b48==1) | FRAMEWORK |
| 0x005DECED | 37 | FUN_005deced | palette_copy_full | void* src, void* dst | void | memcpy 0x404 bytes (full LOGPALETTE: 4-byte header + 256*4 entries) | FRAMEWORK |
| 0x005DED12 | 123 | FUN_005ded12 | palette_export_rgb | int* palette, int* buf, int start, int count | void | Exports palette range as packed RGB triplets (3 bytes per entry) | FRAMEWORK |

### Cluster: Splash Screen / Text Display

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DED90 | 152 | FUN_005ded90 | splash_on_timer | void | void | Timer callback for splash screen: calls multiple thunks, sets DAT_00638bac = current_time + 0xe10 (3600 ticks = 60 sec timeout) | MEDIUM |
| 0x005DEE28 | 794 | FUN_005dee28 | text_display_show | char* text_key, int surface, int auto_close | void | Creates text display window: loads "TEXT" resource, renders text with shadow, creates 0x114-byte surface object, draws 3D frame borders (FUN_005dfa4d with palette indices 0xFF/0xF8), enters message loop. Used for credits/about screens | MEDIUM |
| 0x005DF166 | 151 | FUN_005df166 | text_display_timer_check | void | void | Timer check for text display: if memory allows (FUN_005dcfca) and retry count < 3 and timeout elapsed, shows text display | MEDIUM |
| 0x005DF1FD | 131 | FUN_005df1fd | text_display_schedule | int mem_req, int interval_sec, char* text_key, int surface, int auto_close | void | Schedules timed text display: creates timer with interval_sec*1000 ms, stores display parameters in globals DAT_00638b90-b9c | MEDIUM |
| 0x005DF280 | 53 | FUN_005df280 | text_display_cancel | void | void | Cancels scheduled text display: kills timer at DAT_00638ba0 | MEDIUM |

### Cluster: GIF Resource Loading

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DF2B5 | 966 | FUN_005df2b5 | load_gif_resource | char* resource_name, int* output | void | Loads GIF from embedded resource. Validates "GIF" magic header, extracts global color table (1<<(packed_byte&7)+1 entries), locates image descriptor block (skips '!' extension blocks), reads dimensions and LZW min code size. Emits structured output: 6-byte header (width, height, min_code_size, color_count-1) + color table + compressed pixel data. Warns on local color tables | HIGH |
| 0x005DF67B | 12 | FUN_005df67b | gif_cleanup_1 | void | void | SEH cleanup: calls FUN_005d7c6e (fileio_close) | FRAMEWORK |
| 0x005DF687 | 12 | FUN_005df687 | gif_cleanup_2 | void | void | SEH cleanup: calls FUN_005d7c6e | FRAMEWORK |
| 0x005DF69D | 14 | FUN_005df69d | gif_seh_unwind | void | void | SEH frame unwinder | FRAMEWORK |

### Cluster: Visual Transition Effects

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DF6AB | 54 | FUN_005df6ab | transition_effect_no_wait | ptr1, ptr2, rect*, int x, int y, int surface, int step | void | Wrapper for transition_effect with wait_surface=0 | MEDIUM |
| 0x005DF6E1 | 592 | FUN_005df6e1 | transition_effect | ptr1, ptr2, rect*, int x, int y, int surface, int step, int wait_surface | void | Progressive screen reveal using Fisher-Yates shuffle. Allocates row + column index arrays, shuffles rows randomly via FUN_005e0b50. Iterates rows in shuffled order, blitting `step` rows at a time. Calls thunk_FUN_00408490 to flush after each batch. If wait_surface is set, calls FUN_005cbeb0 for synchronization | HIGH |

### Cluster: 3D Frame Drawing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DF931 | 284 | FUN_005df931 | draw_3d_frame_gdi | surface, LPRECT rect, int depth, int light, int dark, int dc | void | Draws 3D beveled frame using GDI line calls (FUN_005e7f85). If depth<0 swaps light/dark colors (sunken vs raised). Draws right+bottom in one color, left+top in other, then InflateRect(-1,-1) and repeats for depth iterations | MEDIUM |
| 0x005DFA4D | 276 | FUN_005dfa4d | draw_3d_frame_palette | surface, LPRECT rect, int depth, int light_idx, int dark_idx | void | Same 3D frame but using palette-indexed line drawing (FUN_005c19ad + FUN_005c11b2). Used for offscreen/8-bit surfaces | MEDIUM |

### Cluster: RLL (Run Length Limited) Codec

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005DFB61 | 558 | FUN_005dfb61 | rll_decode | void** data_ptr | size_t | Run-length decodes data in place. Bytes <0x80: run of (byte) copies of next value. Bytes >=0x80: literal copy of (byte-0x80) bytes. Expands buffer via __expand(), returns decoded size. Logs "RLLDecode could not allocate" on failure | HIGH |
| 0x005DFD8F | 777 | FUN_005dfd8f | rll_encode | void** data_ptr, int data_size | uint | Run-length encodes data. Detects runs (3+ identical bytes) and literals. Max run length 0x7F. Returns encoded size, or -1 if encoded >= original size (compression failed). Replaces *data_ptr with encoded data | HIGH |

### Cluster: File Dialog (Open/Save)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005D8C0C | 250 | show_open_dialog_8C0C | show_file_dialog | LPSTR buf, LPCSTR filter, LPCSTR initial_dir, char multiselect, char save_mode, int parent | int | GetOpenFileNameA / GetSaveFileNameA wrapper. Title "Select a File". Flags: OFN_FILEMUSTEXIST | OFN_HIDEREADONLY | OFN_EXPLORER. Returns 1 on success | HIGH |

---

## SUMMARY

### Total Functions: 185

| Category | Count | Notes |
|----------|-------|-------|
| FRAMEWORK (SMEDS middleware) | 185 | 100% of block |
| Game Logic | 0 | No Civ2-specific functions |

### Breakdown by Cluster

| Cluster | Count |
|---------|-------|
| Sprite Blit Dispatchers (already documented) | 6 |
| Sprite Composition & Record | 5 |
| Coordinate Scaling | 4 |
| Timer System | 12 |
| Debug Logging | 13 |
| Custom Controls (Edit/Combo/Listbox) | 7 |
| Edit Box Message Wrappers | 18 |
| Combo Box Message Wrappers | 11 |
| List Box Message Wrappers | 17 |
| Window Management Helpers | 9 |
| Timing Utilities | 2 |
| Wave Audio System | 35 |
| File I/O Wrappers | 18 |
| Error Handling | 2 |
| Resource Management | 7 |
| Surface/Window Creation | 14 |
| SMEDS Init/Shutdown | 7 |
| SMEDS Window System | 3 |
| Memory Management | 21 |
| Audio/Video Object | 21 |
| MIDI/CD Audio (MCI) | 16 |
| Audio Thunks | 13 |
| Palette Management | 12 |
| Splash/Text Display | 5 |
| GIF Resource Loading | 4 |
| Visual Effects | 2 |
| 3D Frame Drawing | 2 |
| RLL Codec | 2 |
| File Dialog | 1 |
| Timer Manager Dtor | 1 |

### Top 5 Most Interesting Undocumented Functions

1. **FUN_005d1612 (sprite_compose_overlay, 1297B)** -- Per-pixel sprite merging with transparency, used by the sprite pipeline to combine overlays. The 4-case scanline merge logic is the core of how multi-layer sprites (unit + shield + fortify) are composed.

2. **fill_rect_BE88 (mswindow_wndproc, 3076B)** -- The main SMEDS window procedure. Handles all basic window management including tiled/centered background painting, custom resize handles, caption drag areas, and child window activation. Understanding this explains the game's window behavior.

3. **FUN_005d6c99 (wave_buffer_callback, 1254B)** -- The double-buffer audio completion callback. Handles real-time mixing of up to 5 concurrent sounds with volume/pan, unsigned-to-signed conversion (XOR 0x80), and buffer recycling. This is the core of the game's sound engine.

4. **FUN_005df2b5 (load_gif_resource, 966B)** -- Parses GIF resources from embedded DLL resources. Validates header, extracts global color table, and emits structured data for the LZW decoder. This is how all game art (TERRAIN1, CITIES, UNITS) is loaded from resource DLLs.

5. **FUN_005df6e1 (transition_effect, 592B)** -- Fisher-Yates shuffle-based screen transition. Creates the "progressive reveal" effect seen between game screens by blitting rows in random order. Explains the distinctive visual transitions in Civ2.

### New DAT_ Globals Identified

| Address | Proposed Name | Type | Description |
|---------|--------------|------|-------------|
| DAT_00637ef4 | timer_manager_singleton | ptr | Pointer to 0x90-byte timer manager object (16 slots) |
| DAT_006385d0 | wave_sound_list_head | ptr | Head of linked list of active sound nodes (stride 0xBC, next at +0x2e) |
| DAT_006385c0 | wave_buffer_list | ptr | Allocated mix buffer list for waveOut |
| DAT_006385c8 | wave_buffer_current | ptr | Current active mix buffer |
| DAT_00638578 | wave_out_handle | HWAVEOUT | waveOut device handle |
| DAT_00638584 | wave_buffer_max | int | Maximum buffer pool size |
| DAT_00638588 | wave_buffer_active | int | Currently active buffer count |
| DAT_0063858c | wave_sound_active_count | int | Number of currently playing sounds (max 5) |
| DAT_00638590 | wave_global_volume | int | Global volume level (0-100) |
| DAT_006389d0 | av_manager_instance | ptr | Singleton audio/video manager object |
| DAT_006389d4 | midi_device_id | MCIDEVICEID | MCI device ID for MIDI sequencer |
| DAT_006389d8 | cdaudio_device_id | MCIDEVICEID | MCI device ID for cdaudio |
| DAT_006389dc | cdaudio_eject_device | MCIDEVICEID | Temporary device ID for eject/close operations |
| DAT_006389e0 | cdaudio_total_tracks | int | Total CD tracks from MCI_STATUS |
| DAT_006387cc | resource_dll_count | uint | Number of loaded resource DLLs |
| DAT_006e4f60 | resource_dll_array | HMODULE[36] | Array of loaded resource DLL handles |
| DAT_006e4ff0 | app_hinstance | HINSTANCE | Application instance handle |
| DAT_006e4fec | app_init_flags | int | Initialization flags (0 = register window classes) |
| DAT_006e4ff8 | mm_notify_window | HWND | Hidden window for MCI notifications (MSMMWindow) |
| DAT_00638b48 | palette_hardware_flag | int | 1 = hardware palette support (RC_PALETTE), 0 = no palette |
| DAT_006e500c | palette_static_count | int | Number of static (reserved) palette entries per end |
| DAT_00638304 | debug_log_to_file | byte | Flag: output debug log to file |
| DAT_00638308 | debug_log_to_debugger | byte | Flag: output debug log to OutputDebugString |
| DAT_00638314 | editbox_class_registered | int | 1 = MSEditBoxClass already registered |
| DAT_00638348 | combobox_class_registered | int | 1 = MSComboBoxClass already registered |
| DAT_00638384 | listbox_class_registered | int | 1 = MSListBoxClass already registered |
| DAT_006e47dc | editbox_orig_wndproc | WNDPROC | Original EDIT class wndproc (before subclassing) |
| DAT_006e47d8 | editbox_extra_bytes_offset | DWORD | Offset for extra window bytes in MSEditBoxClass |
| DAT_006e47ec | combobox_orig_wndproc | WNDPROC | Original COMBOBOX class wndproc |
| DAT_006e47e4 | combobox_extra_bytes_offset | DWORD | Offset for extra window bytes in MSComboBoxClass |
| DAT_006e47f0 | listbox_orig_wndproc | WNDPROC | Original LISTBOX class wndproc |
| DAT_006e47f4 | listbox_extra_bytes_offset | DWORD | Offset for extra window bytes in MSListBoxClass |
| DAT_006e4804 | timerdll_handle | HMODULE | Handle to timerdll.dll |
| DAT_006e4808 | timerdll_TimerCallBack | FARPROC | TimerCallBack proc from timerdll.dll |
| DAT_006e4810 | timerdll_SetTimerID | FARPROC | SetTimerID proc from timerdll.dll |
| DAT_006e47fc | timerdll_GetTimerID | FARPROC | GetTimerID proc from timerdll.dll |
| DAT_006e4800 | timerdll_GetTimerIndex | FARPROC | GetTimerIndex proc from timerdll.dll |
| DAT_006e480c | timerdll_ResetTimerNotified | FARPROC | ResetTimerNotified proc from timerdll.dll |
| DAT_006e5004 | midi_done_callback | code* | Function pointer called when MIDI playback completes |
| DAT_006e5000 | cdaudio_done_callback | code* | Function pointer called when CD track playback completes |
