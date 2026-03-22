# Phase 1 Analysis: block_005E0000 (0x005E0000 - 0x005EFFFF)

## Block Summary

**357 functions, ~11,824 lines of decompiled C code.**

This block is **100% framework code** — no game-specific DAT_ globals (city/unit/civ/map arrays, COSMIC constants, game state) are accessed anywhere. The entire block implements the **MicroProse SMEDS (Smart Media Engine / DirectDraw Shell)** multimedia framework library used by Civ2's engine. It covers:

1. **AVI Video Playback** (ICM/VFW decompression, frame stepping, audio sync)
2. **DIB Surface Management** (8/16/24/32-bit CreateDIBSection wrappers, pixel buffer operations)
3. **Pixel Copy/Fill Primitives** (the low-level blit inner loops for the sprite pipeline)
4. **GIF/BMP/CvPic Resource Loading** (LZW decompression, palette extraction)
5. **GDI Text Drawing** (font selection, DrawText with alignment/clipping)
6. **Menu Construction** (recursive menu parser from format strings, dynamic item insertion)
7. **Window Procedure Shells** (WndProc message dispatchers for 3 window types)
8. **DirectDraw Interface** (vtable calls for cooperative level, display mode, surface creation)
9. **Input Dispatch** (mouse/keyboard callback routing via function pointer tables)
10. **Scrollbar/Focus Management** (Tab-order navigation, scroll message handling)
11. **MIDI/MCI Audio** (waveform playback wrappers)

### Key Previously-Documented Functions in This Block

| Address | Known Name | Role |
|---------|-----------|------|
| 0x005E154A | `show_popup_menu` | TrackPopupMenu wrapper |
| 0x005E395A | `check_topdown` | Returns true if DIB surface is top-down (height field == 1) |
| 0x005E518E | `pixel_copy` | 16-param sprite copy inner loop (normal blit) |
| 0x005E52BF | `pixel_fill` | 17-param sprite fill inner loop (dimmed blit, p17=fill color 0x1a) |
| 0x005E6188 | `lock_surface` | Lock DIB surface, returns pixel buffer pointer |

---

## Function Table

### Cluster A: Rich Edit Dialog / Message Box Infrastructure (0x005E00BB - 0x005E0AB3)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E00BB | 79 | FUN_005e00bb | dialog_button_handler | int(buttonId) | void | Handles OK(0x65)/Cancel(0x66) button clicks; invalidates cache, sets result to -1 on cancel | HIGH |
| 0x005E010A | 24 | FUN_005e010a | set_dialog_result | u4,u4(value) | void | Sets DAT_006e5018 = param_2 (dialog return value) | HIGH |
| 0x005E0122 | 38 | FUN_005e0122 | set_dialog_result_and_invalidate | u4,u4(value) | void | Sets result + invalidates object cache | HIGH |
| 0x005E0148 | 205 | FUN_005e0148 | measure_multiline_text | char*,int* | int | Splits text on '_' delimiters, measures max line width, returns line count | HIGH |
| 0x005E0215 | 51 | FUN_005e0215 | calc_text_line_count | u4(text),int(width) | int | Measures text width / available width + 1 = line count | HIGH |
| 0x005E0248 | 34 | FUN_005e0248 | show_text_dialog | u4,u4 | void | Wrapper: calls show_text_dialog_ex with param_3=0 | HIGH |
| 0x005E026A | 1402 | FUN_005e026a | show_text_dialog_ex | int,int,int | void | Complex dialog builder: text panel + listbox + OK/Cancel buttons, supports modal & positioned modes | HIGH |
| 0x005E0802 | 12 | FUN_005e0802 | dtor_thunk_1 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E080E | 12 | FUN_005e080e | dtor_thunk_2 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E081A | 12 | FUN_005e081a | dtor_thunk_3 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E0826 | 12 | FUN_005e0826 | dtor_thunk_4 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E0832 | 12 | FUN_005e0832 | dtor_thunk_5 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E083E | 12 | FUN_005e083e | dtor_thunk_6 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E0854 | 15 | FUN_005e0854 | seh_epilog_1 | void | void | FRAMEWORK: SEH chain restore epilog | LOW |
| 0x005E0863 | 442 | FUN_005e0863 | show_simple_dialog | void | void | Simpler dialog builder with OK/Cancel, no text panel | MEDIUM |
| 0x005E0A31 | 9 | FUN_005e0a31 | dtor_thunk_7 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E0A3A | 12 | FUN_005e0a3a | dtor_thunk_8 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E0A46 | 12 | FUN_005e0a46 | dtor_thunk_9 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E0A52 | 12 | FUN_005e0a52 | dtor_thunk_10 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E0A5E | 12 | FUN_005e0a5e | dtor_thunk_11 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E0A6A | 12 | FUN_005e0a6a | dtor_thunk_12 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005E0A80 | 15 | FUN_005e0a80 | seh_epilog_2 | void | void | FRAMEWORK: SEH chain restore epilog | LOW |
| 0x005E0A8F | 36 | FUN_005e0a8f | msgbox_wrapper_1 | u4,u4,u4 | void | Wrapper for show_messagebox_EEB0 | LOW |
| 0x005E0AB3 | 40 | FUN_005e0ab3 | msgbox_wrapper_2 | u4,u4,u4,u4 | void | Wrapper for show_messagebox_F0B9 | LOW |

### Cluster B: Utility Functions (0x005E0ADB - 0x005E0CC0)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E0ADB | 28 | FUN_005e0adb | fw_call_5bbb5a | u4 | void | FRAMEWORK: forwarding thunk | LOW |
| 0x005E0AF7 | 84 | FUN_005e0af7 | point_in_rect | int*(rect),int(x),int(y) | u4 | Returns 1 if (x,y) inside rect[4], 0 otherwise | HIGH |
| 0x005E0B50 | 37 | FUN_005e0b50 | rand_range | int(max) | int | Returns random int in [0, max) via rand()*max/32768 | HIGH |
| 0x005E0B80 | 27 | FUN_005e0b80 | swap_bytes_16 | u2 | u2 | Swaps high/low bytes of a 16-bit value (endian swap) | HIGH |
| 0x005E0BA0 | 28 | FUN_005e0ba0 | get_object_field_38 | void(ECX=this) | u4 | Returns this->field_0x38 (member accessor) | LOW |
| 0x005E0BC0 | 194 | FUN_005e0bc0 | create_listbox_control | u4,u4,u4,u4,u4 | void | Creates a listbox child window control with scrollbar | MEDIUM |
| 0x005E0C90 | 37 | FUN_005e0c90 | render_surface_to | u4 | void | Calls get_surface then render to target | LOW |
| 0x005E0CC0 | 27 | FUN_005e0cc0 | get_surface_ptr | void(ECX=this) | u4 | Returns *this (first field = surface pointer) | LOW |

### Cluster C: Menu Management (0x005E0CE0 - 0x005E17DB)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E0CE0 | 586 | FUN_005e0ce0 | parse_menu_string_recursive | HMENU,char* | char* | Recursive menu builder from format string: `{` = submenu, `_` = separator, `!` = disabled, `*` = checked; returns position after `}` | HIGH |
| 0x005E0F2A | 376 | FUN_005e0f2a | build_menu_from_string | char* | HMENU | Top-level menu builder: creates MenuBar, calls parse_menu_string_recursive for each `{...}` block | HIGH |
| 0x005E10A2 | 37 | FUN_005e10a2 | load_menu_resource | uint(resourceId) | void | FRAMEWORK: LoadMenuA from DAT_006e4ff0 (hInstance) | LOW |
| 0x005E10C7 | 36 | FUN_005e10c7 | destroy_menu_safe | HMENU | void | FRAMEWORK: DestroyMenu if non-null | LOW |
| 0x005E10EB | 16 | FUN_005e10eb | noop_1 | void | void | FRAMEWORK: empty function (stub) | LOW |
| 0x005E10FB | 29 | FUN_005e10fb | draw_menu_bar | int(wndObj) | void | FRAMEWORK: DrawMenuBar on wndObj->hwnd | LOW |
| 0x005E1118 | 166 | FUN_005e1118 | enable_menu_item | HMENU,int,int,char | void | Enable/disable menu item by position (1-based), supports submenu | MEDIUM |
| 0x005E11BE | 104 | FUN_005e11be | check_menu_item | HMENU,int,int,char | void | Check/uncheck menu item by position (1-based) | MEDIUM |
| 0x005E1226 | 102 | FUN_005e1226 | delete_menu_item | HMENU,int,int | void | Delete/remove menu item by position; -1 = remove entire submenu | MEDIUM |
| 0x005E128C | 293 | build_menu_128C | build_menu_128C | HMENU,int,int,LPCSTR | void | Insert menu item with auto-column-break at 22 items | MEDIUM |
| 0x005E13B1 | 279 | build_menu_13B1 | build_menu_13B1 | HMENU,int,int,LPCSTR,UINT_PTR | void | Insert menu item with explicit command ID + auto-column-break | MEDIUM |
| 0x005E14C8 | 130 | FUN_005e14c8 | modify_menu_item | HMENU,int,int,LPCSTR | void | Modify existing menu item text | MEDIUM |
| 0x005E154A | 79 | show_popup_menu_154A | show_popup_menu | HMENU,int(wndObj),int(x),int(y) | void | ClientToScreen + TrackPopupMenu (already named) | HIGH |
| 0x005E1599 | 48 | FUN_005e1599 | get_submenu | HMENU,int(pos) | HMENU | GetSubMenu wrapper (1-based position) | MEDIUM |
| 0x005E15CE | 75 | FUN_005e15ce | enable_menu_item_by_id | HMENU,UINT,char | void | Enable/disable by command ID | MEDIUM |
| 0x005E1619 | 75 | FUN_005e1619 | check_menu_item_by_id | HMENU,UINT,char | void | Check/uncheck by command ID | MEDIUM |
| 0x005E1664 | 42 | FUN_005e1664 | delete_menu_item_by_id | HMENU,UINT | void | DeleteMenu by command ID | MEDIUM |
| 0x005E168E | 50 | FUN_005e168e | rename_menu_item_by_id | HMENU,UINT,LPCSTR | void | ModifyMenu to change item text by ID | MEDIUM |
| 0x005E16C0 | 16 | FUN_005e16c0 | noop_2 | void | void | FRAMEWORK: empty stub | LOW |
| 0x005E16D0 | 16 | FUN_005e16d0 | noop_3 | void | void | FRAMEWORK: empty stub | LOW |
| 0x005E16E0 | 136 | build_menu_16E0 | build_menu_16E0 | HMENU,int,LPCSTR,UINT_PTR | void | Append to submenu with column break at 22 items | MEDIUM |
| 0x005E1768 | 115 | build_menu_1768 | build_menu_1768 | HMENU,LPCSTR,UINT_PTR | void | Append to top-level menu with column break | MEDIUM |
| 0x005E17DB | 42 | FUN_005e17db | delete_menu_item_by_id_2 | HMENU,UINT | void | Same as 005e1664, duplicate | MEDIUM |
| 0x005E1805 | 111 | build_menu_1805 | append_menu_separator | HMENU | void | Append separator (MF_SEPARATOR) with column break at 22 | MEDIUM |

### Cluster D: Window Procedures & Timer (0x005E1880 - 0x005E18FF)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E1880 | 55 | FUN_005e1880 | set_window_data_and_wndproc | LONG,int(wndObj) | void | SetWindowLong: stores data at GWL+12, sets wndproc to 0x5e18ff | MEDIUM |
| 0x005E18B7 | 39 | FUN_005e18b7 | set_timer | int(wndObj),UINT_PTR,UINT | void | FRAMEWORK: SetTimer wrapper | LOW |
| 0x005E18DE | 33 | FUN_005e18de | kill_timer | int(wndObj),UINT_PTR | void | FRAMEWORK: KillTimer wrapper | LOW |
| 0x005E18FF | 861 | FUN_005e18ff | avi_window_wndproc | HWND,int,u4,uint | u4 | WndProc for AVI player window: handles WM_DESTROY, WM_SIZE, WM_PAINT (StretchBlt of video frame) | HIGH |

### Cluster E: AVI Video Playback System (0x005E1C70 - 0x005E3580)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E1C70 | 30 | FUN_005e1c70 | avi_render_current | void | void | Calls avi_render_frame on DAT_00638dd4 (current AVI context) | MEDIUM |
| 0x005E1C8E | 1631 | FUN_005e1c8e | avi_open_file | CCheckListBox*,u4(filename) | int | Opens AVI file: AVIFileOpenA, gets video/audio streams, ICLocate decompressor, allocates frame buffer, sets palette, begins decompression | HIGH |
| 0x005E22ED | 543 | FUN_005e22ed | avi_play | int(ctx) | void | Starts AVI playback: sets compression modes, begins decompression, starts timer/audio sync | HIGH |
| 0x005E250C | 119 | FUN_005e250c | ic_decompress_begin | 14 params | void | ICSendMessage(0x403c = ICM_DECOMPRESS_BEGIN) wrapper | HIGH |
| 0x005E2583 | 119 | FUN_005e2583 | ic_decompress_query | 14 params | void | ICSendMessage(0x403d = ICM_DECOMPRESS_QUERY) wrapper | HIGH |
| 0x005E25FA | 123 | FUN_005e25fa | avi_play_range | int,u4(start),u4(end) | void | Sets play range and starts playback | MEDIUM |
| 0x005E2675 | 129 | FUN_005e2675 | avi_stop | int(ctx) | void | Stops AVI playback, clears playing flag | HIGH |
| 0x005E26F6 | 163 | FUN_005e26f6 | avi_rewind | int(ctx) | void | Resets to first frame (AVIStreamStart) | MEDIUM |
| 0x005E2799 | 308 | FUN_005e2799 | avi_close | int(ctx) | void | Closes AVI: ICClose, AVIStreamRelease ×2, AVIFileRelease, AVIFileExit, frees frame buffer | HIGH |
| 0x005E28CD | 202 | FUN_005e28cd | avi_seek_frame | int,uint(frame),int(render) | void | Seeks to keyframe via AVIStreamFindSample, decompresses intermediate frames | HIGH |
| 0x005E2997 | 702 | show_messagebox_2997 | avi_decode_frame | int,int(flags) | int | Decodes one frame: AVIStreamRead + ICDecompressEx; handles loop/end/error | HIGH |
| 0x005E2C5A | 119 | FUN_005e2c5a | ic_decompress_ex | 14 params | void | ICSendMessage(0x403e = ICM_DECOMPRESS) wrapper | HIGH |
| 0x005E2CD1 | 976 | FUN_005e2cd1 | avi_render_frame | int(ctx) | void | Main render loop: time-syncs frames, skips to keyframes when behind, displays current frame | HIGH |
| 0x005E30A1 | 529 | FUN_005e30a1 | avi_update_palette | int(ctx) | void | Updates palette: reads DIB color table, sends ICM_DECOMPRESS_BEGIN | MEDIUM |
| 0x005E32B2 | 666 | FUN_005e32b2 | avi_set_display_mode | CRichEditCntrItem*,int(mode) | void | Configures display: sets compression flags (ICMF_COMPRESSFRAMES), resizes output, blits positioning rect | MEDIUM |
| 0x005E3550 | 47 | FUN_005e3550 | avi_call_end_callback | void(ECX=this) | void | Calls function pointer at this+0x114 if non-null (end-of-playback callback) | MEDIUM |
| 0x005E3580 | 47 | FUN_005e3580 | avi_call_frame_callback | void(ECX=this) | void | Calls function pointer at this+0x118 if non-null (frame-reached callback) | MEDIUM |

### Cluster F: DIB Surface Creation (0x005E35B0 - 0x005E45B5)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E35B0 | 706 | create_dib_35B0 | create_dib_8bit | int*(rect) | u4* | Creates 8-bit paletted DIBSection; returns 10-field surface struct [hMem,hDC,hOldBmp,hBmp,hOldObj,topdown,w,h,stride,pixbuf] | HIGH |
| 0x005E3877 | 24 | FUN_005e3877 | set_dib_orientation | u4 | void | Sets DAT_00638e18: -1=bottom-up, 1=top-down, 0=auto | HIGH |
| 0x005E388F | 155 | FUN_005e388f | destroy_dib_surface | u4*(surface) | u4 | Destroys DIB: SelectObject restore, DeleteObject bitmap, DeleteDC, free memory | HIGH |
| 0x005E392A | 48 | FUN_005e392a | get_surface_stride | int(surface) | u4 | Returns surface+0x20 (stride field) if non-null | MEDIUM |
| 0x005E395A | 41 | FUN_005e395a | check_topdown | int(surface) | bool | Returns (surface+0x14 == 1) — checks if top-down orientation (already named) | HIGH |
| 0x005E3988 | 249 | FUN_005e3988 | flip_surface_vertical | int(surface) | void | Flips DIB pixel data vertically (swaps rows from top/bottom toward middle) | HIGH |
| 0x005E3A81 | 39 | FUN_005e3a81 | get_pixel_buffer | int(surface) | u4 | Returns surface+0x24 (pixel data pointer) if non-null | HIGH |
| 0x005E3AA8 | 35 | FUN_005e3aa8 | return_zero | void | u4 | Always returns 0 (stub) | LOW |
| 0x005E3ACB | 129 | handle_colortable_3ACB | read_dib_colortable | int,u4,UINT,UINT | void | GetDIBColorTable then stores via FUN_005c6b93 per-entry | MEDIUM |
| 0x005E3B4C | 144 | handle_colortable_3B4C | write_dib_colortable | int,u4,UINT,UINT | void | Reads palette via thunk_FUN_00497c40, writes via SetDIBColorTable | MEDIUM |
| 0x005E3BDC | 39 | FUN_005e3bdc | write_full_colortable | u4,u4 | void | Wrapper: write_dib_colortable(0, 256) — full palette sync | MEDIUM |
| 0x005E3C03 | 177 | handle_colortable_3C03 | set_dib_palette_from_hpal | int,HPALETTE | void | Converts HPALETTE entries (R/G/B order swap) to RGBQUAD, sets via SetDIBColorTable | HIGH |
| 0x005E3CB4 | 534 | FUN_005e3cb4 | draw_string_palette | int,int,char*,int,int,RECT*,byte | void | Draws text on DIB surface using palette color (index DAT_00637e78), with alignment flags (1=left,2=right,4=bottom,8=top) | HIGH |
| 0x005E3ECA | 289 | handle_colortable_3ECA | draw_string_in_rect_palette | int,int,char*,LPRECT,uint | void | DrawText in clipping rect, palette color, alignment (0=center,2=right,8=top) | HIGH |
| 0x005E3FEB | 272 | handle_colortable_3FEB | draw_text_wrapped_palette | int,int,char*,LPRECT,uint | void | DrawText with DT_WORDBREAK|DT_SINGLELINE, palette color | MEDIUM |
| 0x005E40FB | 191 | handle_colortable_40FB | draw_line_palette | int,int,int,int,int | void | Draws line using palette color via CreatePen + LineTo | MEDIUM |
| 0x005E41BA | 518 | create_dib_41BA | create_dib_16bit | int*(rect) | u4* | Creates 16-bit (5-5-5) DIBSection with BI_BITFIELDS compression | HIGH |
| 0x005E43C5 | 491 | create_dib_43C5 | create_dib_24bit | int*(rect) | u4* | Creates 24-bit DIBSection | HIGH |
| 0x005E45B5 | 491 | create_dib_45B5 | create_dib_32bit | int*(rect) | u4* | Creates 32-bit DIBSection | HIGH |

### Cluster G: GDI Text Drawing with RGB Colors (0x005E47A5 - 0x005E4CC8)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E47A5 | 507 | FUN_005e47a5 | draw_string_rgb | int,int,char*,int,int,RECT*,byte,u1(r),u1(g),u1(b) | void | Same as draw_string_palette but with explicit RGB color | HIGH |
| 0x005E49A0 | 262 | FUN_005e49a0 | draw_string_in_rect_rgb | int,int,char*,LPRECT,uint,u1,u1,u1 | void | DrawText in rect with explicit RGB, alignment flags | HIGH |
| 0x005E4AA6 | 245 | FUN_005e4aa6 | draw_text_wrapped_rgb | int,int,char*,LPRECT,uint,u1,u1,u1 | void | DrawText wrapped with RGB color | MEDIUM |
| 0x005E4B9B | 164 | FUN_005e4b9b | draw_line_rgb | int,int,int,int,int,u1,u1,u1 | void | Draws line with explicit RGB via CreatePen + LineTo | MEDIUM |
| 0x005E4C3F | 137 | FUN_005e4c3f | fill_rect_rgb | int,RECT*,u1,u1,u1 | void | FillRect with explicit RGB via CreateSolidBrush | MEDIUM |
| 0x005E4CC8 | 141 | FUN_005e4cc8 | test_pixel_bit | int,uint*,byte,u1,u1,u1 | uint | Reads pixel at (0,0) after set, tests bit — color-to-index probe | MEDIUM |

### Cluster H: LZW/GIF Decompression (0x005E4D60 - 0x005E53F3)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E4D60 | 250 | FUN_005e4d60 | decompress_lzw | u4,byte,u4,u4,u4,u4,u4 | u4 | Allocates 0x6000-byte LZW decode table (3 × 0x1000 entries), calls lzw_decode_core, frees table | HIGH |
| 0x005E53F3 | 1142 | FUN_005e53f3 | lzw_decode_core | byte*,u1*,int,short,ushort,ushort,short | void | Full GIF LZW decoder: variable code size, clear/end codes, dictionary chain traversal; outputs decompressed pixel data | HIGH |

### Cluster I: Raw Pixel Operations (0x005E4E60 - 0x005E5D4F)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E4E60 | 152 | FUN_005e4e60 | fill_rect_8bit | int,uint,int,int,uint,int,int,int | void | Fills rectangular region of 8-bit surface with solid color byte | MEDIUM |
| 0x005E4EF8 | 163 | FUN_005e4ef8 | fill_rect_16bit | int,byte(r),byte(g),byte(b),int,int,int,int,int,int | void | Fills 16-bit surface rect with RGB555 color | MEDIUM |
| 0x005E4F9B | 187 | FUN_005e4f9b | copy_rect_8bit | int(src),int(dst),int,int,int,int,uint,int,int,int,int,int | void | Copies rectangular block between 8-bit surfaces (memcpy per row) | MEDIUM |
| 0x005E5056 | 198 | FUN_005e5056 | copy_rect_16bit | int,int,int,int,int,int,int,int,int,int,int,int | void | Copies rectangular block between 16-bit surfaces | MEDIUM |
| 0x005E511C | 114 | FUN_005e511c | transpose_pixels | int,int,int,int,int,int,int,int,u4,u4,int,int | void | Transposes pixel data (rotates 90°): copies column-wise from src to dst | MEDIUM |
| 0x005E518E | 305 | FUN_005e518e | pixel_copy | 16 params | void | Core sprite blit inner loop: copies non-transparent pixels from scaled source to dest using lookup tables; param_4=transparent color index (already named) | HIGH |
| 0x005E52BF | 308 | FUN_005e52bf | pixel_fill | 17 params | void | Core sprite dimmed blit: replaces non-transparent pixels with param_17 (fill color, typically 0x1a=dark gray); same structure as pixel_copy (already named) | HIGH |
| 0x005E5869 | 126 | FUN_005e5869 | fill_scanline_8bit | int,u1,uint,int,int,int,int | void | Fills a single horizontal scanline with solid byte, handles top-down/bottom-up | LOW |
| 0x005E58E7 | 83 | FUN_005e58e7 | fill_column_8bit | int,u1,int,int,int,int,int | void | Fills a vertical column with solid byte | LOW |
| 0x005E593A | 121 | FUN_005e593a | copy_with_brightness_topdown | int*,int*,uint,int,int,char | void | Copies pixel block adding brightness offset (char param_6 added to each byte), top-down | MEDIUM |
| 0x005E59B3 | 134 | FUN_005e59b3 | copy_with_brightness_bottomup | int*,int,uint,int,int,char | void | Same as above but bottom-up (starts from last row) | MEDIUM |
| 0x005E5A39 | 229 | FUN_005e5a39 | rle_decode_with_brightness_td | int*,int*,int,int,int,char | void | RLE-compressed pixel copy with brightness, top-down; negative count=literal run, positive=repeat run | HIGH |
| 0x005E5B1E | 242 | FUN_005e5b1e | rle_decode_with_brightness_bu | int*,int,int,int,int,char | void | Same RLE decode but bottom-up output | HIGH |
| 0x005E5C10 | 319 | FUN_005e5c10 | rle16_decode_with_brightness_td | ushort*,int*,u4,u4,int,u1 | void | 16-bit RLE decode with brightness, top-down; skip/run/literal packets | HIGH |
| 0x005E5D4F | 332 | FUN_005e5d4f | rle16_decode_with_brightness_bu | ushort*,int,u4,int,int,u1 | void | 16-bit RLE decode with brightness, bottom-up | HIGH |

### Cluster J: Surface Object (OOP Wrapper) (0x005E5EA0 - 0x005E6BC5)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E5EA0 | 64 | FUN_005e5ea0 | surface_init | void(ECX=this) | u4* | Constructor: zeroes fields, calls set_dimensions(0) | MEDIUM |
| 0x005E5EE0 | 22 | FUN_005e5ee0 | surface_dtor_empty | void | void | FRAMEWORK: empty destructor | LOW |
| 0x005E5EF6 | 130 | FUN_005e5ef6 | surface_release | void(ECX=this) | void | Releases surface: calls destroy if owned, frees row pointer array | MEDIUM |
| 0x005E5F78 | 60 | FUN_005e5f78 | surface_create_wh | int(w),int(h) | void | Creates surface from width/height (wraps to rect then create) | MEDIUM |
| 0x005E5FB4 | 38 | FUN_005e5fb4 | surface_create_rect | u4(rect) | void | Creates surface from rect pointer | MEDIUM |
| 0x005E5FDA | 62 | FUN_005e5fda | surface_create_wh_ex | int,int,u4 | void | Creates surface with extra param (color depth?) | MEDIUM |
| 0x005E6018 | 368 | FUN_005e6018 | surface_allocate | int(rect),u4(param) | u4 | Core surface allocation: creates DIB via FUN_005e8fb7, calculates stride, builds row pointer LUT | HIGH |
| 0x005E6188 | 97 | FUN_005e6188 | lock_surface | void(ECX=this) | int | Locks surface for pixel access: checks if already locked (FUN_005e924e), handles shared surfaces (FUN_005ea5c5 → FUN_005e61e9) (already named) | HIGH |
| 0x005E61E9 | 92 | FUN_005e61e9 | surface_wait_lock | void(ECX=this) | void | Waits for surface lock: if shared, recurses; if owned, calls FUN_005e9091 + notify callback | MEDIUM |
| 0x005E6245 | 39 | FUN_005e6245 | rgb_to_565 | u1,byte,byte | short | Converts RGB to 16-bit RGB565 format | HIGH |
| 0x005E626C | 43 | FUN_005e626c | rgb_to_555 | byte,byte,byte | short | Converts RGB to 16-bit RGB555 format | HIGH |
| 0x005E6297 | 200 | FUN_005e6297 | surface_attach | u4,u4 | bool | Attaches to existing surface (shared/external), sets dimensions | MEDIUM |
| 0x005E635F | 241 | FUN_005e635f | surface_wrap_external | int,u4,int | void | Wraps external pixel buffer as surface (no ownership) | MEDIUM |
| 0x005E6450 | 278 | FUN_005e6450 | surface_set_dimensions | int*(rect) | void | Sets width/height/clipping rects from rect, frees scale table if any | MEDIUM |
| 0x005E6566 | 36 | FUN_005e6566 | surface_create_wrapper | u4 | void | Wrapper for surface_create_rect | LOW |
| 0x005E658A | 103 | FUN_005e658a | surface_get_pixel | u4(x),u4(y) | u1 | Gets pixel value at (x,y) from locked surface | MEDIUM |
| 0x005E65F1 | 96 | FUN_005e65f1 | surface_set_pixel | u4(x),u4(y),u1(val) | void | Sets pixel value at (x,y) on locked surface | MEDIUM |

### Cluster K: Resource Image Loading (0x005E6651 - 0x005E6F96)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E6651 | 578 | FUN_005e6651 | load_bitmap_resource | u4(resId),int,int,int | u4 | Loads BMP resource: validates 8bpp uncompressed, copies palette, copies pixel data bottom-up to surface | HIGH |
| 0x005E6893 | 818 | FUN_005e6893 | load_gif_resource | u4(resId),int,uint,int | u4 | Loads GIF resource: validates "GIF" header, extracts global color table, finds image block, LZW decompresses to surface | HIGH |
| 0x005E6BC5 | 391 | FUN_005e6bc5 | load_cvpic_resource | u4,u4,u4,int | u4 | Loads CvPic (custom "CvPc" tagged) resource: proprietary image format with LZW decompression | HIGH |
| 0x005E6D4C | 453 | FUN_005e6d4c | load_bitmap_resource_16bit | u4(resId) | u4 | Loads BMP resource to 16-bit surface (supports 16/24/32bpp source) | MEDIUM |
| 0x005E6F25 | 50 | FUN_005e6f25 | surface_get_width | void(ECX=this) | int | Returns this->field_8 (width) | LOW |
| 0x005E6F57 | 63 | FUN_005e6f57 | surface_get_clip_rect | void(ECX=this) | void | Copies clipping rect (this+0x20) to output | LOW |
| 0x005E6F96 | 91 | FUN_005e6f96 | surface_set_clip_rect | int*,int(x),int(y),int(w),int(h) | void | Sets clipping rect within surface bounds | LOW |

### Cluster L: Surface Blit/Copy Operations (0x005E6FF1 - 0x005E7E90)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E6FF1 | 55 | FUN_005e6ff1 | surface_get_height | void(ECX) | int | Returns this->field_4 (height) | LOW |
| 0x005E7028 | 42 | FUN_005e7028 | surface_get_row_ptr | u4(x),u4(y),int(lockData) | int | Returns pixel address: lockData+row_offset+x | MEDIUM |
| 0x005E7052 | 133 | FUN_005e7052 | surface_calc_blit_params | int(srcRect) | void | Calculates clipped blit rectangle parameters | LOW |
| 0x005E70D7 | 43 | FUN_005e70d7 | surface_get_field_34 | void(ECX) | u4 | Returns this->field_0x34 | LOW |
| 0x005E7102 | 308 | FUN_005e7102 | surface_blit_to_dc | int(wndObj),int*,int* | void | BitBlt from surface DC to window DC | MEDIUM |
| 0x005E7257 | 51 | FUN_005e7257 | surface_set_callback | code*(fn) | void | Sets this->field_0x10 = callback function pointer | LOW |
| 0x005E728A | 198 | FUN_005e728a | surface_stretchblit_to_dc | int(wndObj),int*,int* | void | StretchBlt from surface DC to window DC | MEDIUM |
| 0x005E7355 | 290 | FUN_005e7355 | surface_copy_rect | u4(srcSurf),int*(srcRect),int*(dstRect) | void | Copies rectangular region between surfaces (8-bit, raw pixel copy) | MEDIUM |
| 0x005E747C | 76 | FUN_005e747c | surface_fill_rect_idx | int*(rect),u1(color) | void | Fills rectangle on surface with palette index color | MEDIUM |
| 0x005E74C8 | 198 | FUN_005e74c8 | surface_copy_rect_16bit | u4,int*,int* | void | Copies rectangular region between 16-bit surfaces | MEDIUM |
| 0x005E7593 | 76 | FUN_005e7593 | surface_fill_rect_rgb16 | int*,byte,byte,byte | void | Fills rectangle with RGB on 16-bit surface | MEDIUM |
| 0x005E75DF | 254 | FUN_005e75df | surface_blit_rle | u4,int*,int*,char | void | Blits RLE-compressed source to 8-bit surface with brightness | MEDIUM |
| 0x005E76DD | 272 | FUN_005e76dd | surface_blit_rle_16bit | u4,int*,int*,char | void | Blits RLE-compressed source to 16-bit surface with brightness | MEDIUM |
| 0x005E77ED | 217 | FUN_005e77ed | surface_copy_with_brightness | u4,int*,int*,char | void | Copies pixel block between 8-bit surfaces with brightness offset | MEDIUM |
| 0x005E78C6 | 235 | FUN_005e78c6 | surface_copy_brightness_16bit | u4,int*,int*,char | void | Same for 16-bit surfaces | MEDIUM |
| 0x005E79B1 | 127 | FUN_005e79b1 | surface_fill_scanline | int*(rect),u1(color) | void | Fills one scanline on surface | LOW |
| 0x005E7A30 | 94 | FUN_005e7a30 | surface_fill_column | int*(rect),u1(color) | void | Fills one column on surface | LOW |
| 0x005E7A8E | 266 | FUN_005e7a8e | surface_scale_blit | int*,int*(srcRect),int*(dstRect) | void | Scaled blit using scale lookup table | MEDIUM |
| 0x005E7B98 | 284 | FUN_005e7b98 | surface_blit_to_dc_scaled | int(wndObj),int*,int* | void | BitBlt with scaling from surface to window DC | LOW |
| 0x005E7CB4 | 229 | FUN_005e7cb4 | surface_blit_to_dc_2 | int,int*,int* | void | Another BitBlt variant (different param handling) | LOW |
| 0x005E7D99 | 247 | FUN_005e7d99 | surface_stretchblit_to_dc_2 | int,int*,int* | void | Another StretchBlt variant | LOW |
| 0x005E7E90 | 139 | FUN_005e7e90 | surface_save_to_clipboard | int*(rect) | void | Copies surface region to clipboard via BitBlt | LOW |

### Cluster M: Higher-Level Drawing on HDC (0x005E7F1B - 0x005E8216)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E7F1B | 106 | FUN_005e7f1b | dc_draw_string_palette | int*,int,char*,int,int,RECT*,byte | void | Draws text to HDC-backed object using palette color (same interface as draw_string_palette but gets DC via vtable) | MEDIUM |
| 0x005E7F85 | 232 | FUN_005e7f85 | dc_draw_string_rgb_full | int*,int,char*,int,int,RECT*,byte | u4 | Draws text to DC using DAT_006e5224-6 color globals | MEDIUM |
| 0x005E806D | 181 | FUN_005e806d | dc_draw_string_in_rect_rgb | int*,int,char*,LPRECT,uint | void | DrawText to DC with DAT_006e5224-6 colors | MEDIUM |
| 0x005E8122 | 244 | FUN_005e8122 | dc_draw_text_wrapped | int*,int,char*,LPRECT,uint | void | DrawText wrapped to DC with DAT_006e5224-6 | MEDIUM |
| 0x005E8216 | 229 | FUN_005e8216 | dc_draw_line_rgb | int*,int,int,int,int | void | Draws line to DC with DAT_006e5224-6 colors | MEDIUM |

### Cluster N: MFC/OLE Stubs & Surface Internals (0x005E82FB - 0x005E9783)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E82FB | 64 | CReObject | CReObject_ctor | void | void | FRAMEWORK: CReObject constructor | LOW |
| 0x005E833B | 141 | FUN_005e833b | obj_load_bitmap | u4 | void | FRAMEWORK: loads bitmap into object field | LOW |
| 0x005E83C8 | 57 | FUN_005e83c8 | obj_destroy | void | void | FRAMEWORK: destroys object bitmap | LOW |
| 0x005E8401 | 619 | FUN_005e8401 | obj_blit_bitmap | int,int,int*,int*,byte | void | FRAMEWORK: blits object bitmap to target with alignment | LOW |
| 0x005E866C | 134 | FUN_005e866c | measure_text_multiline | int,char*,int*,int* | void | Measures multi-line text ('_' delimited), returns max width and total height | MEDIUM |
| 0x005E86F2 | 71 | FUN_005e86f2 | surface_palette_sync | u4,uint,uint | void | Syncs palette range to surface DIB color table | LOW |
| 0x005E8739 | 105 | FUN_005e8739 | surface_palette_from_hpal | u4,HPALETTE | void | Sets surface palette from HPALETTE | LOW |
| 0x005E87A2 | 484 | FUN_005e87a2 | surface_save_bmp | char*,int,int | int | Saves surface to BMP file (8-bit, with palette) | MEDIUM |
| 0x005E8990 | 50 | FUN_005e8990 | palette_set_range | int,int,u1* | void | FRAMEWORK: palette set for range of entries | LOW |
| 0x005E89D0 | 308 | register_wndclass_89D0 | register_wndclass | void | void | FRAMEWORK: RegisterClass for child window with custom WndProc | LOW |
| 0x005E8B04 | 80 | FUN_005e8b04 | child_window_create | u4,int*,int | void | FRAMEWORK: Creates child window | LOW |
| 0x005E8B54 | 213 | FUN_005e8b54 | child_window_wndproc | HWND,uint,uint,uint | u4 | FRAMEWORK: WndProc for child windows (WM_PAINT, WM_SIZE) | LOW |
| 0x005E8C29 | 43 | FUN_005e8c29 | child_window_close | void | void | FRAMEWORK: Destroys child window | LOW |
| 0x005E8C54 | 260 | FUN_005e8c54 | surface_create_from_hwnd | HWND,int*,u4 | u4 | Creates surface from HWND bounds | LOW |
| 0x005E8D58 | 174 | FUN_005e8d58 | surface_blit_to_hwnd | int(wndObj),int*,int* | void | BitBlt surface to HWND DC | LOW |
| 0x005E8E06 | 73 | FUN_005e8e06 | surface_create_compat | int* | u4 | Creates surface compatible with rect | LOW |
| 0x005E8E4F | 97 | FUN_005e8e4f | surface_destroy_compat | u4 | u4 | Destroys compatible surface | LOW |
| 0x005E8EB0 | 155 | FUN_005e8eb0 | surface_alloc_ddraw | u4(param) | int | Allocates DirectDraw surface or falls back to DIB | MEDIUM |
| 0x005E8F4B | 108 | FUN_005e8f4b | surface_try_ddraw | u4 | int | Attempts DirectDraw surface creation via vtable call | LOW |
| 0x005E8FB7 | 180 | FUN_005e8fb7 | surface_alloc_from_rect | int*(rect),u4 | int | Allocates surface from rect: tries DirectDraw first, falls back to create_dib_8bit | MEDIUM |
| 0x005E906B | 38 | FUN_005e906b | surface_destroy | int | void | Destroys surface (DirectDraw or DIB) | LOW |
| 0x005E9091 | 122 | FUN_005e9091 | surface_lock_ddraw | int | int | Locks DirectDraw surface or returns DIB pixel buffer | MEDIUM |
| 0x005E910B | 69 | FUN_005e910b | surface_get_stride_val | int | int | Returns stride from DirectDraw lock or DIB info | MEDIUM |
| 0x005E9150 | 249 | FUN_005e9150 | surface_get_colordepth | int | int | Returns color depth: 1 for 8-bit DIB, 2 for 16-bit, etc. | MEDIUM |
| 0x005E924E | 123 | FUN_005e924e | surface_try_lock | int | int | Attempts to lock surface; returns lock data or 0 on failure | MEDIUM |
| 0x005E92C9 | 52 | FUN_005e92c9 | surface_unlock | int | void | Unlocks DirectDraw surface | LOW |
| 0x005E92FD | 52 | FUN_005e92fd | surface_unlock_2 | int | void | Alternate unlock path | LOW |
| 0x005E9331 | 292 | FUN_005e9331 | surface_blit_gdi | int*,int,int*,int*,int*,int,u4 | void | GDI BitBlt between surface DCs | LOW |
| 0x005E9455 | 167 | FUN_005e9455 | surface_stretchblit_gdi | int*,int,int*,int*,int*,int,u4 | void | GDI StretchBlt between surface DCs | LOW |
| 0x005E9506 | 148 | FUN_005e9506 | surface_blit_gdi_2 | int*,int,int*,int,int | void | Another GDI blit variant | LOW |
| 0x005E95A4 | 174 | FUN_005e95a4 | surface_stretchblit_gdi_2 | int*,int,int*,int*,int*,u4 | void | Another StretchBlt variant | LOW |
| 0x005E965C | 152 | FUN_005e965c | surface_blit_gdi_3 | int*,int,int*,int,int | void | GDI blit variant 3 | LOW |
| 0x005E96FE | 123 | FUN_005e96fe | surface_blit_transparent_gdi | int*,int,int*,int*,COLORREF | void | GDI TransparentBlt | LOW |
| 0x005E9783 | 171 | FUN_005e9783 | surface_set_palette | int,int*,u4 | void | Sets surface palette from palette object | LOW |

### Cluster O: Standard GDI Blit Wrappers (0x005E9838 - 0x005E9E87)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005E9838 | 130 | blit_9838 | blit_dc_to_dc | int*,int*... | void | FRAMEWORK: BitBlt wrapper (already named) | LOW |
| 0x005E98BA | 138 | stretch_blit_98BA | stretch_blit_dc_to_dc | int*,int*... | void | FRAMEWORK: StretchBlt wrapper (already named) | LOW |
| 0x005E9944 | 56 | FUN_005e9944 | render_surface_blit | u4,u4 | void | FRAMEWORK: render one surface to another | LOW |
| 0x005E997C | 598 | FUN_005e997c | surface_blit_complex | many params | void | FRAMEWORK: complex multi-surface blit with clipping | LOW |
| 0x005E9BD7 | 341 | FUN_005e9bd7 | surface_stretchblit_complex | many params | void | FRAMEWORK: complex stretch blit | LOW |
| 0x005E9D31 | 337 | FUN_005e9d31 | surface_blit_complex_2 | many params | void | FRAMEWORK: another complex blit variant | LOW |
| 0x005E9E87 | 254 | FUN_005e9e87 | surface_stretchblit_complex_2 | many params | void | FRAMEWORK: another complex stretch blit | LOW |
| 0x005E9F8A | 590 | FUN_005e9f8a | surface_blit_with_colortable | many params | void | FRAMEWORK: blit with color table transformation | LOW |
| 0x005EA1DD | 333 | FUN_005ea1dd | surface_blit_transformed | many params | void | FRAMEWORK: transformed blit | LOW |
| 0x005EA32F | 329 | FUN_005ea32f | surface_blit_transformed_2 | many params | void | FRAMEWORK: transformed blit variant | LOW |
| 0x005EA47D | 246 | FUN_005ea47d | surface_blit_masked | many params | void | FRAMEWORK: masked blit | LOW |

### Cluster P: DirectDraw Interface (0x005EA578 - 0x005EA8D3)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005EA578 | 72 | FUN_005ea578 | ddraw_create_surface | u4,u4,u4 | u4 | Creates DirectDraw surface via DAT_006394c0 vtable+0x14 | MEDIUM |
| 0x005EA5C5 | 70 | FUN_005ea5c5 | ddraw_check_surface_lost | int* | u4 | Checks if DD surface is lost via vtable+0x60 | MEDIUM |
| 0x005EA610 | 103 | FUN_005ea610 | ddraw_flip_surface | char | void | Flips DD surface (vtable+0x58): 0=no wait, 1=wait | MEDIUM |
| 0x005EA677 | 77 | FUN_005ea677 | ddraw_get_scan_line | void | uint | Gets current scan line via vtable+0x44 | LOW |
| 0x005EA6C4 | 77 | FUN_005ea6c4 | ddraw_get_surface_desc | void | u4 | Gets surface desc via vtable+0x40 | LOW |
| 0x005EA711 | 104 | FUN_005ea711 | ddraw_get_monitor_freq | void | u4 | Gets monitor frequency via vtable+0x3c | LOW |
| 0x005EA779 | 34 | FUN_005ea779 | noop_dd | void | void | FRAMEWORK: empty stub | LOW |
| 0x005EA7A0 | 55 | FUN_005ea7a0 | set_dialog_wndproc | LONG,int | void | Sets GWL_USERDATA=param_1, GWL_WNDPROC=0x5eacc0 | MEDIUM |
| 0x005EA7D7 | 78 | FUN_005ea7d7 | find_control_by_type | int,int(controlList) | int | Walks linked list of controls to find one matching type | LOW |
| 0x005EA825 | 87 | FUN_005ea825 | get_next_window | HWND | HWND | GetWindow(GW_HWNDNEXT), wrapping to GW_HWNDFIRST | MEDIUM |
| 0x005EA87C | 87 | FUN_005ea87c | get_prev_window | HWND | HWND | GetWindow(GW_HWNDPREV), wrapping to GW_HWNDLAST | MEDIUM |
| 0x005EA8D3 | 756 | FUN_005ea8d3 | tab_navigate | int,HWND,int(dir) | void | Tab-order focus navigation: walks child windows, checks visibility/tab-stop, calls SetFocus | HIGH |

### Cluster Q: Dialog Window Procedures (0x005EABCC - 0x005EC317)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005EABCC | 161 | FUN_005eabcc | tab_key_handler | u4 | void | Handles Tab key: determines direction, calls tab_navigate | MEDIUM |
| 0x005EAC6D | 83 | FUN_005eac6d | find_scrollbar_control | int(controlList) | u4 | Walks control list to find scrollbar (type 0xb) | LOW |
| 0x005EACC0 | 1566 | FUN_005eacc0 | dialog_wndproc | HWND,uint,uint,HWND | LRESULT | Main dialog WndProc: handles WM_DESTROY, WM_SIZE, Tab navigation, Enter/Escape, mouse/keyboard dispatch, scrollbar messages | HIGH |
| 0x005EB2F0 | 51 | FUN_005eb2f0 | dd_blt_wrapper | u4,u4,u4 | void | FRAMEWORK: DirectDraw Blt wrapper | LOW |
| 0x005EB330 | 51 | FUN_005eb330 | dd_bltfast_wrapper | u4,u4,u4 | void | FRAMEWORK: DirectDraw BltFast wrapper | LOW |
| 0x005EB370 | 35 | FUN_005eb370 | dd_getdc_wrapper | u4 | void | FRAMEWORK: DirectDraw GetDC wrapper | LOW |
| 0x005EB393 | 55 | FUN_005eb393 | dd_releasedc_wrapper | u4,u4 | void | FRAMEWORK: DirectDraw ReleaseDC wrapper | LOW |
| 0x005EB3CA | 35 | FUN_005eb3ca | dd_getpixelformat | u4 | void | FRAMEWORK: GetPixelFormat wrapper | LOW |
| 0x005EB3ED | 90 | FUN_005eb3ed | translate_vkey | uint(vk),int | u4 | Translates Windows virtual key code to internal key code (GetAsyncKeyState for modifiers) | MEDIUM |
| 0x005EB447 | 3277 | FUN_005eb447 | child_dialog_wndproc | HWND,uint,uint,uint | LRESULT | Complex child dialog WndProc: handles WM_PAINT (palette/realize), WM_SIZE, WM_ACTIVATE, mouse/keyboard, scroll, MCI notify, minimize/restore | HIGH |
| 0x005EC1A1 | 153 | FUN_005ec1a1 | handle_menu_command | HWND,u4(cmdId) | void | Processes menu command: translates to menu position via FUN_005ec23a | MEDIUM |
| 0x005EC23A | 221 | FUN_005ec23a | find_menu_item_position | HMENU,UINT(cmdId) | uint | Recursively searches menu tree for command ID; returns packed (position<<16 | depth) | MEDIUM |
| 0x005EC317 | 2883 | FUN_005ec317 | scrollable_wndproc | HWND,uint,uint,uint | u4 | WndProc for scrollable panel: handles WM_HSCROLL/WM_VSCROLL (6 scroll types each), mouse events, GETMINMAXINFO, WM_SYSCOMMAND (minimize/restore), MCI notify | HIGH |

### Cluster R: Input Event Dispatch Callbacks (0x005ECEDA - 0x005ED580)

All 33 functions in this cluster are **small callback dispatchers** (31-54 bytes each) that invoke function pointers stored at fixed offsets in an event handler object. They form the input event system.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005ECEDA | 16 | FUN_005eceda | noop_event | void | void | FRAMEWORK: empty event stub | LOW |
| 0x005ECEF0 | 48 | FUN_005ecef0 | is_shift_pressed | void | bool | GetKeyState(VK_SHIFT) & 0x8000 | HIGH |
| 0x005ECF20 | 48 | FUN_005ecf20 | is_ctrl_pressed | void | bool | GetKeyState(VK_CONTROL) & 0x8000 | HIGH |
| 0x005ECF50 | 52 | FUN_005ecf50 | dispatch_mouse_move | u4(x),u4(y) | void | Calls handler[0](x,y) if non-null | MEDIUM |
| 0x005ECF90 | 54 | FUN_005ecf90 | dispatch_lbutton_down | u4,u4 | void | Calls handler[1](x,y) | MEDIUM |
| 0x005ECFD0 | 54 | FUN_005ecfd0 | dispatch_lbutton_up | u4,u4 | void | Calls handler[2](x,y) | MEDIUM |
| 0x005ED010 | 54 | FUN_005ed010 | dispatch_lclick | u4,u4 | void | Calls handler[3](x,y) — click (down+up matched) | MEDIUM |
| 0x005ED050 | 54 | FUN_005ed050 | dispatch_rbutton_down | u4,u4 | void | Calls handler[4](x,y) | MEDIUM |
| 0x005ED090 | 54 | FUN_005ed090 | dispatch_rbutton_up | u4,u4 | void | Calls handler[5](x,y) | MEDIUM |
| 0x005ED0D0 | 54 | FUN_005ed0d0 | dispatch_rclick | u4,u4 | void | Calls handler[6](x,y) | MEDIUM |
| 0x005ED110 | 54 | FUN_005ed110 | dispatch_ldblclick | u4,u4 | void | Calls handler[7](x,y) | MEDIUM |
| 0x005ED150 | 50 | FUN_005ed150 | dispatch_key_down | u4(key) | void | Calls handler[8](key) | MEDIUM |
| 0x005ED190 | 50 | FUN_005ed190 | dispatch_key_up | u4(key) | void | Calls handler[9](key) | MEDIUM |
| 0x005ED1D0 | 50 | FUN_005ed1d0 | dispatch_key_repeat | u4(key) | void | Calls handler[10](key) | MEDIUM |
| 0x005ED210 | 50 | FUN_005ed210 | dispatch_char | u4(char) | void | Calls handler[11](char) | MEDIUM |
| 0x005ED250 | 48 | FUN_005ed250 | dispatch_close | void | int | Calls handler[12]() — returns nonzero to cancel close | MEDIUM |
| 0x005ED290 | 41 | FUN_005ed290 | dispatch_minimize | void | void | Calls handler[13]() | MEDIUM |
| 0x005ED2C0 | 41 | FUN_005ed2c0 | dispatch_restore | void | void | Calls handler[14]() | MEDIUM |
| 0x005ED2F0 | 41 | FUN_005ed2f0 | dispatch_move | void | void | Calls handler[15]() | MEDIUM |
| 0x005ED320 | 50 | FUN_005ed320 | dispatch_activate | u4 | void | Calls handler[16](active) | MEDIUM |
| 0x005ED360 | 54 | FUN_005ed360 | dispatch_scroll_move | u4,u4 | void | Calls handler[17](x,y) | MEDIUM |
| 0x005ED3A0 | 50 | FUN_005ed3a0 | dispatch_notify | u4 | void | Calls handler[18](data) | MEDIUM |
| 0x005ED3E0 | 50 | FUN_005ed3e0 | dispatch_hscroll | u4 | void | Calls handler[19](pos) | MEDIUM |
| 0x005ED420 | 50 | FUN_005ed420 | dispatch_hscroll_track | u4 | void | Calls handler[20](pos) | MEDIUM |
| 0x005ED460 | 50 | FUN_005ed460 | dispatch_vscroll | u4 | void | Calls handler[21](pos) | MEDIUM |
| 0x005ED4A0 | 50 | FUN_005ed4a0 | dispatch_vscroll_track | u4 | void | Calls handler[22](pos) | MEDIUM |
| 0x005ED4E0 | 50 | FUN_005ed4e0 | dispatch_idle | u4 | void | Calls handler[23](data) | MEDIUM |
| 0x005ED520 | 41 | FUN_005ed520 | dispatch_resize | void | void | Calls handler[24]() | MEDIUM |
| 0x005ED550 | 41 | FUN_005ed550 | dispatch_event_25 | void | void | Calls handler[25]() | LOW |
| 0x005ED580 | 24 | FUN_005ed580 | get_event_handler_base | void(ECX) | void | Returns event handler base pointer | LOW |

### Cluster S: Hotkey / Accelerator System (0x005ED5A0 - 0x005ED6E0)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005ED5A0 | 69 | FUN_005ed5a0 | hotkey_register | u4,u4 | void | Registers hotkey mapping (key → menu position) | MEDIUM |
| 0x005ED5F0 | 65 | FUN_005ed5f0 | hotkey_lookup | u4 | char | Looks up registered hotkey, returns found status | MEDIUM |
| 0x005ED640 | 31 | IsTracking (1) | isTracking_scrollbar_h | void(ECX) | int | FRAMEWORK: Returns scroll position value (Ghidra FID misid as IsTracking) | LOW |
| 0x005ED660 | 31 | IsTracking (2) | isTracking_scrollbar_v | void(ECX) | int | FRAMEWORK: Returns scroll position value | LOW |
| 0x005ED680 | 31 | IsTracking (3) | isTracking_page_h | void(ECX) | int | FRAMEWORK: Returns page size value | LOW |
| 0x005ED6A0 | 31 | IsTracking (4) | isTracking_page_v | void(ECX) | int | FRAMEWORK: Returns page size value | LOW |
| 0x005ED6C0 | 31 | IsTracking (5) | isTracking_scroll_range | void(ECX) | int | FRAMEWORK: Returns scroll range value | LOW |
| 0x005ED6E0 | 47 | FUN_005ed6e0 | scrollbar_init | void(ECX) | void | Initializes scrollbar with default range/page/pos | LOW |

### Cluster T: Scrollbar & MCI Audio (0x005ED710 - 0x005EEBD6)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005ED710 | 517 | FUN_005ed710 | scrollbar_setup | many params | void | Full scrollbar initialization: SetScrollRange, SetScrollPos, ShowScrollBar | MEDIUM |
| 0x005ED920 | 325 | FUN_005ed920 | mci_open_waveform | u4(filename) | int | Opens MCI waveform device for audio playback | MEDIUM |
| 0x005EDA65 | 176 | FUN_005eda65 | mci_play | void(ECX) | void | Starts MCI playback with MCI_NOTIFY | MEDIUM |
| 0x005EDB15 | 157 | FUN_005edb15 | mci_play_range | u4(from),u4(to) | void | MCI play with from/to position | MEDIUM |
| 0x005EDBB2 | 39 | FUN_005edbb2 | mci_stop | void(ECX) | void | MCI_STOP command | MEDIUM |
| 0x005EDC6C | 64 | FUN_005edc6c | mci_close | void(ECX) | void | MCI_CLOSE command + cleanup | MEDIUM |
| 0x005EDCAC | 80 | FUN_005edcac | mci_set_window | HWND | void | Associates MCI device with window for notifications | MEDIUM |
| 0x005EDD00 | 43 | show_messagebox_DD00 | mci_pause | void(ECX) | void | MCI_PAUSE command (Ghidra misnamed as messagebox) | MEDIUM |
| 0x005EDD2B | 127 | FUN_005edd2b | mci_resume | void(ECX) | void | MCI_RESUME / re-play from current position | MEDIUM |
| 0x005EDDAA | 33 | FUN_005eddaa | mci_get_position | void(ECX) | void | MCI_STATUS_POSITION query | LOW |
| 0x005EDDD0 | 107 | FUN_005eddd0 | mci_seek | u4(position) | void | MCI_SEEK to position | LOW |
| 0x005EDE3B | 89 | FUN_005ede3b | mci_get_length | void(ECX) | void | MCI_STATUS_LENGTH query | LOW |
| 0x005EDE94 | 43 | FUN_005ede94 | mci_check_mode | void(ECX) | void | MCI_STATUS_MODE query | LOW |
| 0x005EDEBF | 270 | FUN_005edebf | mci_open_midi | u4(filename) | int | Opens MCI MIDI sequencer device | MEDIUM |
| 0x005EDFCD | 53 | FUN_005edfcd | midi_set_tempo | void(ECX) | void | Sets MIDI tempo via MCI_SET | LOW |
| 0x005EE002 | 74 | FUN_005ee002 | midi_play_ex | u4(from),u4(to) | void | MIDI play with range (delegates to mci_play_range) | LOW |
| 0x005EE04C | 60 | FUN_005ee04c | midi_stop | void(ECX) | void | Stops + seeks to start | LOW |
| 0x005EE088 | 41 | FUN_005ee088 | midi_close | void(ECX) | void | Closes MIDI device (delegates to mci_close) | LOW |
| 0x005EE0B1 | 927 | FUN_005ee0b1 | cdaudio_open_and_play | void(ECX) | void | Opens CD audio MCI device, reads TOC, plays track; complex error handling | MEDIUM |
| 0x005EE450 | 74 | FUN_005ee450 | cdaudio_play_track | u4(track) | void | Plays specific CD audio track | LOW |
| 0x005EE49A | 99 | FUN_005ee49a | cdaudio_stop | void(ECX) | void | Stops CD audio playback | LOW |
| 0x005EE4FD | 43 | FUN_005ee4fd | cdaudio_close | void(ECX) | void | Closes CD audio device | LOW |
| 0x005EE528 | 49 | FUN_005ee528 | cdaudio_get_status | void(ECX) | void | Gets CD audio playback status | LOW |
| 0x005EE559 | 56 | FUN_005ee559 | cdaudio_get_track_count | void(ECX) | void | Gets number of CD audio tracks | LOW |
| 0x005EE591 | 288 | FUN_005ee591 | cdaudio_play_range | u4,u4 | void | CD audio play with range (from/to tracks) | LOW |
| 0x005EE6B1 | 50 | FUN_005ee6b1 | cdaudio_get_position | void(ECX) | void | Gets CD audio current position | LOW |
| 0x005EE6E3 | 116 | FUN_005ee6e3 | mixer_set_volume | int(vol) | void | Sets audio mixer volume (waveOutSetVolume) | LOW |
| 0x005EE757 | 90 | FUN_005ee757 | mixer_get_volume | void | int | Gets audio mixer volume | LOW |
| 0x005EE7B1 | 116 | FUN_005ee7b1 | mixer_set_cd_volume | int | void | Sets CD audio volume | LOW |
| 0x005EE825 | 90 | FUN_005ee825 | mixer_get_cd_volume | void | int | Gets CD audio volume | LOW |
| 0x005EE87F | 71 | FUN_005ee87f | mixer_set_midi_volume | int | void | Sets MIDI volume via midiOutSetVolume | LOW |
| 0x005EE8C6 | 43 | FUN_005ee8c6 | timer_callback_1 | void | void | FRAMEWORK: timer callback wrapper | LOW |
| 0x005EE8F1 | 43 | FUN_005ee8f1 | timer_callback_2 | void | void | FRAMEWORK: timer callback wrapper | LOW |
| 0x005EE91C | 47 | FUN_005ee91c | timer_callback_3 | void | void | FRAMEWORK: timer callback wrapper | LOW |
| 0x005EE94B | 70 | FUN_005ee94b | timer_set_callback | int,u4,code* | void | Sets up multimedia timer callback | LOW |
| 0x005EE991 | 43 | FUN_005ee991 | timer_kill_1 | void | void | FRAMEWORK: kills timer 1 | LOW |
| 0x005EE9BC | 43 | FUN_005ee9bc | timer_kill_2 | void | void | FRAMEWORK: kills timer 2 | LOW |
| 0x005EE9E7 | 43 | FUN_005ee9e7 | timer_kill_3 | void | void | FRAMEWORK: kills timer 3 | LOW |
| 0x005EEA12 | 40 | FUN_005eea12 | get_tick_count | void | void | FRAMEWORK: timeGetTime wrapper | LOW |
| 0x005EEA3A | 163 | FUN_005eea3a | joystick_read | u4 | void | Reads joystick position via joyGetPos | LOW |
| 0x005EEADD | 52 | FUN_005eeadd | joystick_get_x | void(ECX) | int | Returns joystick X position | LOW |
| 0x005EEB11 | 52 | FUN_005eeb11 | joystick_get_y | void(ECX) | int | Returns joystick Y position | LOW |
| 0x005EEB45 | 57 | FUN_005eeb45 | joystick_get_button | void(ECX) | int | Returns joystick button state | LOW |
| 0x005EEB7E | 36 | FUN_005eeb7e | joystick_check_present | void | int | joyGetNumDevs > 0 check | LOW |
| 0x005EEBA2 | 52 | FUN_005eeba2 | joystick_get_z | void(ECX) | int | Returns joystick Z axis | LOW |
| 0x005EEBD6 | 159 | FUN_005eebd6 | joystick_read_ex | u4 | void | Extended joystick read via joyGetPosEx | LOW |

### Cluster U: Audio Wrappers (0x005EEC80 - 0x005EEED6)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005EEC80 | 31 | IsTracking (6) | audio_get_field | void(ECX) | int | Returns audio object field (Ghidra FID misid) | LOW |
| 0x005EECA0 | 35 | FUN_005eeca0 | audio_init | void(ECX) | void | Initializes audio state fields | LOW |
| 0x005EECC3 | 88 | FUN_005eecc3 | audio_open_device | void(ECX) | int | Opens waveOut audio device | LOW |
| 0x005EED1B | 40 | FUN_005eed1b | audio_close_device | void(ECX) | void | Closes waveOut device | LOW |
| 0x005EED43 | 51 | FUN_005eed43 | audio_check_playing | void(ECX) | int | Checks if audio is still playing | LOW |
| 0x005EED76 | 91 | FUN_005eed76 | audio_prepare_header | int(stream) | int | Prepares wave header for playback | LOW |
| 0x005EEDD1 | 27 | FUN_005eedd1 | audio_get_position | void | void | Gets audio playback position | LOW |
| 0x005EEDEC | 99 | FUN_005eedec | audio_start_playback | u4,u4 | int | Starts audio playback with range | LOW |
| 0x005EEE4F | 30 | FUN_005eee4f | audio_reset | void | u2 | Resets audio device | LOW |
| 0x005EEE6D | 25 | FUN_005eee6d | audio_stub_1 | void | u2 | Returns 0 (audio stub) | LOW |
| 0x005EEE86 | 22 | FUN_005eee86 | audio_stub_2 | void | void | Empty audio stub | LOW |

### Cluster V: MessageBox Wrappers (0x005EEEB0 - 0x005EF0B9)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005EEEB0 | 402 | show_messagebox_EEB0 | show_msgbox_titled | LPCSTR,u4(icon),u4(buttons) | u4 | MessageBoxA with "Potentially fatal error" title, icon/button mapping (already named) | HIGH |
| 0x005EF0B9 | 401 | show_messagebox_F0B9 | show_msgbox_custom_title | LPCSTR(title),LPCSTR(text),u4,u4 | u4 | MessageBoxA with custom title, same icon/button mapping (already named) | HIGH |

### Cluster W: DirectDraw Window Management (0x005EF320 - 0x005EFFEC)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x005EF320 | 54 | FUN_005ef320 | ddwin_set_class_data | LONG,int | void | SetClassLong for wndproc + user data | LOW |
| 0x005EF356 | 200 | FUN_005ef356 | ddwin_create | LPCSTR,u4,int,int | u4* | Creates DirectDraw window (hidden "MSDirectWindow" class), returns window struct | MEDIUM |
| 0x005EF41E | 192 | FUN_005ef41e | ddraw_set_coop_level | int,int(mode) | uint | Sets DirectDraw cooperative level (0=normal, 1=fullscreen, 2=exclusive) | MEDIUM |
| 0x005EF4E3 | 171 | FUN_005ef4e3 | ddraw_set_display_mode | int,u4,u4,u4 | u4 | Sets display mode (resolution+bpp) via DirectDraw | MEDIUM |
| 0x005EF58E | 77 | FUN_005ef58e | ddraw_restore_mode | void | uint | Restores original display mode | LOW |
| 0x005EF5DB | 127 | FUN_005ef5db | ddwin_destroy | u4* | u4 | Destroys DirectDraw window: ShowWindow(SW_HIDE), DestroyWindow, free memory | MEDIUM |
| 0x005EF65A | 63 | FUN_005ef65a | ddwin_show | int | bool | ShowWindow(SW_SHOW) + UpdateWindow | LOW |
| 0x005EF699 | 50 | FUN_005ef699 | ddwin_hide | int | bool | ShowWindow(SW_HIDE) | LOW |
| 0x005EF6CB | 1456 | FUN_005ef6cb | ddwin_wndproc | HWND,uint,uint,uint | LRESULT | WndProc for DirectDraw window: handles WM_DESTROY, WM_SIZE, WM_CLOSE, mouse (WM_LBUTTONDOWN/UP/DBLCLK, WM_RBUTTONDOWN/UP), keyboard (WM_KEYDOWN/UP/CHAR), joystick (0x4C8), WM_ACTIVATEAPP | HIGH |
| 0x005EFCA3 | 59 | FUN_005efca3 | ddraw_enum_callback | int,code* | u4 | DirectDraw enumeration callback: calls param_2(width,height,bpp) | LOW |
| 0x005EFCDE | 133 | FUN_005efcde | ddraw_enum_modes | int,int(callback) | void | Enumerates display modes via DirectDraw vtable+0x20 | LOW |
| 0x005EFD70 | 56 | FUN_005efd70 | ddwin_call_activate_cb | u4 | void | Calls activate callback at this+0xbc if non-null | LOW |
| 0x005EFDC0 | 194 | FUN_005efdc0 | ddwin_obj_ctor | void(ECX) | int | Constructor for DDraw window object: init surface, CString, handler table | MEDIUM |
| 0x005EFEB0 | 123 | FUN_005efeb0 | ddwin_obj_dtor | void(ECX) | void | Destructor: destroy window, cleanup handlers | MEDIUM |
| 0x005EFF2B | 15 | FUN_005eff2b | ddwin_dtor_thunk_1 | void | void | FRAMEWORK: destructor thunk | LOW |
| 0x005EFF3A | 40 | FUN_005eff3a | ddwin_dtor_thunk_2 | void | void | FRAMEWORK: destructor thunk + CString cleanup | LOW |
| 0x005EFF62 | 9 | FUN_005eff62 | ddwin_dtor_thunk_3 | void | void | FRAMEWORK: calls surface_dtor_empty | LOW |
| 0x005EFF75 | 14 | FUN_005eff75 | seh_epilog_3 | void | void | FRAMEWORK: SEH chain restore | LOW |
| 0x005EFF83 | 105 | FUN_005eff83 | ddwin_create_named | u4,u4,u4,u4,u4,u4 | u4 | Creates named DirectDraw window, sets class data, mode | MEDIUM |
| 0x005EFFEC | 106 | FUN_005effec | ddwin_create_default | u4,u4,u4,u4,u4 | u4 | Creates DirectDraw window with default title "MSDirectWindow" | MEDIUM |

---

## Summary Statistics

| Category | Count | % |
|----------|-------|---|
| DIB Surface Management | 65 | 18% |
| Window Procedures (WndProc) | 12 | 3% |
| Menu Management | 22 | 6% |
| AVI Video Playback | 18 | 5% |
| Pixel Copy/Fill Primitives | 20 | 6% |
| GDI Text/Drawing | 16 | 4% |
| Input Event Dispatch | 33 | 9% |
| DirectDraw Interface | 20 | 6% |
| MCI/MIDI/CD Audio | 35 | 10% |
| GIF/BMP/LZW Loading | 8 | 2% |
| Scrollbar/Focus/Navigation | 10 | 3% |
| Boilerplate (stubs, thunks, SEH) | 30 | 8% |
| Misc Utility | 10 | 3% |
| **Total** | **357** | **100%** |

## Game-Specific Functions: NONE

This entire block contains **zero game-specific logic**. No references to:
- Game state globals (DAT_00655xxx, DAT_006d1da0)
- City/Unit/Civ arrays (DAT_0064f340, DAT_006560f0, DAT_0064c6a0)
- COSMIC constants (DAT_0064bcc8)
- Map/terrain data
- Tech/improvement/wonder tables
- Calculation registers (DAT_006a65xx)

The block implements the **SMEDS32** middleware library (source path visible in error strings: `D:\Ss\Smeds32\dd.cpp`) — MicroProse's cross-game multimedia engine used in Civ2, Colonization, etc.

## Key Architectural Insights

1. **SMEDS32 is the foundation**: All rendering surfaces, input handling, AVI playback, and DirectDraw management flow through this library. Game code at higher addresses calls into these functions.

2. **Surface struct layout** (10 dwords at 0x00-0x24):
   - [0]=hMem, [1]=hDC, [2]=hOldBmp, [3]=hBitmap, [4]=hOldObj
   - [5]=isTopDown, [6]=width, [7]=height, [8]=stride, [9]=pixelBuffer

3. **Three WndProc variants**: avi_window_wndproc (0x5E18FF), dialog_wndproc (0x5EACC0), scrollable_wndproc (0x5EC317) — each handles the same message set differently.

4. **pixel_copy (0x5E518E) and pixel_fill (0x5E52BF)** are the innermost loops of the sprite blit pipeline. All higher-level blit dispatchers (FUN_005d056c, FUN_005d10cd, etc.) ultimately call one of these two.

5. **DAT_006394c0** = DirectDraw interface pointer (IDirectDraw vtable). All DD operations go through vtable calls on this global.

6. **DAT_006e5020/DAT_006e5018** = dialog context/result globals for the text dialog system.

7. **DAT_00638b40** = current palette object, passed to surface_set_palette throughout.
