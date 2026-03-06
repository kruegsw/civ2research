# Block 005C0000 Analysis

Address range: 0x005C0000 - 0x005CFFFF
Total functions: 339

This block is the **SMEDS32 graphics framework** — the custom MicroProse multimedia engine layer. It implements:
- Surface/port management (pixel buffer locking, stride, clipping)
- Image loading (BMP, TGA, GIF decoders)
- Palette management (8-bit color table operations, fading, cycling)
- Font management (GDI font creation, measurement, rendering)
- Sprite system (extraction from surfaces, RLE-like compressed storage, blit dispatch wrappers)
- Custom UI controls (buttons, checkboxes, scrollbars — "MSControlClass" windows)
- Scale lookup table generation for zoom

Source path references in strings: `D:\Ss\Smeds32\Port.cpp`

---

### Cluster: SEH Thunks / Destructors

Small SEH (Structured Exception Handling) cleanup stubs and FS-chain restore functions.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C000D | stub | FUN_005c000d | seh_destructor_thunk_000d | 0 | void | Calls FUN_005d7c6e (SEH destructor) | FRAMEWORK |
| 005C0023 | stub | FUN_005c0023 | seh_restore_fs_0023 | 0 | void | Restores FS chain from EBP-0xC | FRAMEWORK |

---

### Cluster: Port/Surface Operations (SMEDS32 Port.cpp)

These implement the software rendering "port" — a clipped pixel buffer for drawing operations. The `in_ECX` this-pointer accesses a port struct with fields: +0x14=clip_rect, +0x40=pixel_buffer_handle, +0x44=bits_per_pixel_shift.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C0034 | small | FUN_005c0034 | port_set_rect_from_self | 0 (thiscall) | void | SetRect(this+0x14) from this+0x24..0x30 | HIGH |
| 005C0073 | small | FUN_005c0073 | port_set_rect | 1 (int*) | void | SetRect(this+0x14) from param RECT | HIGH |
| 005C00CE | small | FUN_005c00ce | port_set_clip_rect | 1 (int*) | void | Sets clip rect, validates against bounds | MEDIUM |
| 005C0105 | small | FUN_005c0105 | port_get_clip_rect | 1 (int*) | void | Gets clip rect into output param | MEDIUM |
| 005C019D | stub | FUN_005c019d | port_init_buffer | 0 | void | Initializes port buffer pointer | MEDIUM |
| 005C01C1 | medium | FUN_005c01c1 | port_lock | 0 (thiscall) | void | Locks port surface for pixel access. Warns "Port not locked" | HIGH |
| 005C02E0 | medium | FUN_005c02e0 | port_unlock | 0 (thiscall) | void | Unlocks port surface | MEDIUM |
| 005C0333 | medium | FUN_005c0333 | port_fill_rect | 4 | void | Fills rectangle with color. Warns "Port not locked in Fill" | HIGH |
| 005C041F | stub | FUN_005c041f | port_set_color | 1 | void | Sets current drawing color | MEDIUM |
| 005C044A | stub | FUN_005c044a | port_set_text_color | 1 | void | Sets text drawing color | MEDIUM |
| 005C0479 | medium | FUN_005c0479 | port_copy_rect | 6 | void | Copies rect between ports. Warns "Source/Destination Port not locked" | HIGH |
| 005C0593 | large | FUN_005c0593 | port_blit_stretch | multi | void | Stretched blit between ports. Source/dest port locking | HIGH |
| 005C0753 | large | FUN_005c0753 | port_copy_to_screen | multi | void | Copies port to screen DC. "CopyToScreen" in error string | HIGH |
| 005C0979 | medium | FUN_005c0979 | port_copy_to_screen_clipped | multi | void | Clipped version of copy to screen | MEDIUM |
| 005C0A55 | medium | FUN_005c0a55 | port_copy_to_screen_rect | multi | void | Another copy-to-screen variant | MEDIUM |
| 005C0B2C | medium | FUN_005c0b2c | port_get_pixel | 2 (x,y) | int | Gets pixel at (x,y). "GetPixel out of clip rect" warning | HIGH |
| 005C0BF2 | small | FUN_005c0bf2 | port_set_pixel | 3 (x,y,color) | void | Sets pixel at (x,y). "SetPixel out of clip rect" warning | HIGH |
| 005C0C5D | small | FUN_005c0c5d | port_draw_text_at | multi | void | Draws text at position. "No current font selected" error | HIGH |
| 005C0CC5 | medium | FUN_005c0cc5 | port_draw_text_rect | multi | void | Draws text in rect. "No current font selected" error | HIGH |
| 005C0D12 | small | FUN_005c0d12 | port_select_palette | 1 | void | Selects palette for port | MEDIUM |
| 005C0D69 | medium | FUN_005c0d69 | port_draw_text_styled | multi | void | Draws styled text (shadow, bold). "No current font selected" | HIGH |
| 005C0E57 | medium | FUN_005c0e57 | port_draw_text_measure | multi | void | Draws text and measures bounds | MEDIUM |
| 005C0F57 | medium | FUN_005c0f57 | port_fill_rect_pattern | multi | void | Pattern fill in port surface | MEDIUM |
| 005C1020 | medium | FUN_005c1020 | port_measure_text | multi | int | Measures text width in port context | MEDIUM |
| 005C10FB | small | FUN_005c10fb | port_set_font | 1 | void | Sets current font for port text operations | MEDIUM |
| 005C1167 | stub | FUN_005c1167 | port_get_font | 0 | ptr | Returns current font pointer | MEDIUM |

---

### Cluster: Port Allocation / Image Loading

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C11B2 | large | FUN_005c11b2 | port_alloc | 3 | void | Allocates port buffer. "ERR_PORTALLOCFAILED" on failure. Source: Port.cpp | HIGH |
| 005C145D | stub | FUN_005c145d | port_load_picture_resource | 1 | void | Loads picture from resource. "Picture resource not found" | HIGH |
| 005C1513 | medium | FUN_005c1513 | port_load_tga | 1 | int | Loads TGA file into port. "Targa Compression Not Implemented" | HIGH |
| 005C1742 | medium | FUN_005c1742 | port_load_bmp_resource | 1 | void | Loads BMP from resource. "Bitmap resource not found" | HIGH |
| 005C1972 | stub | FUN_005c1972 | port_set_palette_index | 1 | void | Sets a palette index value | LOW |
| 005C1998 | stub | FUN_005c1998 | port_get_palette_entry | 0 | int | Returns palette entry | LOW |
| 005C19AD | small | FUN_005c19ad | port_push_color_byte | 1 (byte) | void | Pushes a color byte for palette operations | LOW |
| 005C19D3 | stub | FUN_005c19d3 | port_get_pixel_ptr | 2 (x,y) | char* | Returns pointer to pixel at (x,y) in locked port | MEDIUM |
| 005C1A00 | small | FUN_005c1a00 | port_alloc_variant_b | 3 | void | Second port allocation variant ("ERR_PORTALLOCFAILED") | HIGH |
| 005C1A62 | medium | FUN_005c1a62 | port_load_tga_file | 1 | int | Load TGA from file (not resource). "Targa File not found" | HIGH |
| 005C1B0D | stub | FUN_005c1b0d | port_alloc_variant_c | 3 | void | Third port allocation variant | MEDIUM |

---

### Cluster: GIF Decoder

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C1B47 | large | FUN_005c1b47 | port_load_gif_resource | 1 | void | Loads GIF from embedded resource. Checks "GIF" header, global color table. "GIF resource not found", "Resource is not a GIF", "GIF contains no global color table", "Skipping local color table" | HIGH |
| 005C1C99 | stub | FUN_005c1c99 | port_load_gif_resource_wrapper | 1 | void | Wrapper for GIF resource loading | MEDIUM |
| 005C1CBD | small | FUN_005c1cbd | port_load_gif_file | 1 | void | Loads GIF from file. Same error strings as above | HIGH |
| 005C1CF7 | medium | FUN_005c1cf7 | gif_decode_lzw | multi | void | GIF LZW decompression core | MEDIUM |
| 005C1E49 | stub | FUN_005c1e49 | gif_resource_wrapper_2 | 1 | void | Another GIF resource wrapper | LOW |
| 005C1E6D | small | FUN_005c1e6d | gif_file_wrapper | 1 | void | Another GIF file wrapper | LOW |

---

### Cluster: BMP / TGA / Picture Loaders (continued)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C1EA7 | medium | FUN_005c1ea7 | port_load_picture_file | 1 | void | Loads picture from file (BMP/TGA). "Picture resource not found" | HIGH |
| 005C1FF9 | stub | FUN_005c1ff9 | port_load_picture_wrapper | 1 | void | Picture loading wrapper | LOW |
| 005C201D | stub | FUN_005c201d | port_load_bitmap_file | 1 | void | Bitmap file loading wrapper | LOW |
| 005C2048 | large | FUN_005c2048 | tga_decode_rle | multi | int | TGA RLE decode. "Targa Compression Not Implemented", "Why The hell would anyone want their pictures upside down" | HIGH |
| 005C2360 | large | FUN_005c2360 | tga_load_from_file | 1 | void | TGA file loader. "Error: Targa File not found" | HIGH |
| 005C2786 | stub | FUN_005c2786 | seh_cleanup_2786 | 0 | void | SEH cleanup (calls FUN_005d7c6e) | FRAMEWORK |
| 005C279C | stub | FUN_005c279c | seh_restore_fs_279c | 0 | void | SEH FS restore | FRAMEWORK |
| 005C27AD | large | FUN_005c27ad | bmp_load_from_resource | 1 | void | BMP resource loader. "Bitmap resource not found" | HIGH |
| 005C2A77 | large | FUN_005c2a77 | bmp_load_from_file | 1 | void | BMP file loader. "Bitmap file not found" | HIGH |
| 005C2E37 | stub | FUN_005c2e37 | seh_cleanup_2e37 | 0 | void | SEH cleanup | FRAMEWORK |
| 005C2E4D | stub | FUN_005c2e4d | seh_restore_fs_2e4d | 0 | void | SEH FS restore | FRAMEWORK |
| 005C2E5E | xlarge | FUN_005c2e5e | gif_decode_resource | multi | void | Full GIF resource decode (header+LZW). "GIF resource not found" + all GIF error strings | HIGH |
| 005C3313 | xlarge | FUN_005c3313 | gif_decode_file | multi | void | Full GIF file decode. Same error strings | HIGH |
| 005C384D | stub | FUN_005c384d | seh_cleanup_384d | 0 | void | SEH cleanup | FRAMEWORK |
| 005C3863 | stub | FUN_005c3863 | seh_restore_fs_3863 | 0 | void | SEH FS restore | FRAMEWORK |
| 005C3874 | large | FUN_005c3874 | picture_load_resource_dispatch | 1 | void | Dispatches to BMP/TGA/GIF loader based on resource type. "Picture resource not found" | HIGH |
| 005C3B7A | large | FUN_005c3b7a | picture_load_file_dispatch | 1 | void | Dispatches to BMP/TGA/GIF file loader. "Picture resource not found" | HIGH |
| 005C3ED5 | stub | FUN_005c3ed5 | seh_cleanup_3ed5 | 0 | void | SEH cleanup | FRAMEWORK |
| 005C3EEB | stub | FUN_005c3eeb | seh_restore_fs_3eeb | 0 | void | SEH FS restore | FRAMEWORK |
| 005C3EFC | large | FUN_005c3efc | bmp_load_resource_ex | 1 | void | Extended BMP resource loader. "Bitmap resource not found" | HIGH |
| 005C40B6 | large | FUN_005c40b6 | bmp_load_file_ex | 1 | void | Extended BMP file loader. "Bitmap file not found" | HIGH |
| 005C434E | stub | FUN_005c434e | seh_cleanup_434e | 0 | void | SEH cleanup | FRAMEWORK |
| 005C4364 | stub | FUN_005c4364 | seh_restore_fs_4364 | 0 | void | SEH FS restore | FRAMEWORK |
| 005C4375 | large | FUN_005c4375 | tga_load_resource_full | 1 | void | Full TGA resource loader. "Picture resource not found" + TGA error strings | HIGH |
| 005C463F | large | FUN_005c463f | tga_load_file_full | 1 | void | Full TGA file loader. "Error: Targa File not found" | HIGH |
| 005C4A00 | stub | FUN_005c4a00 | seh_cleanup_4a00 | 0 | void | SEH cleanup | FRAMEWORK |
| 005C4A16 | stub | FUN_005c4a16 | seh_restore_fs_4a16 | 0 | void | SEH FS restore | FRAMEWORK |

---

### Cluster: Port Drawing Primitives (SMEDS32 - continued)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C4A27 | medium | FUN_005c4a27 | port_fill_rect_clipped | 4 | void | Fills clipped rect. "Port not locked in Fill" warning | HIGH |
| 005C4B4C | stub | FUN_005c4b4c | port_copy_scanline | multi | void | Copies scanline data between ports | MEDIUM |
| 005C4B7F | medium | FUN_005c4b7f | port_copy_rect_clipped | multi | void | Clipped rect copy. "Port not locked in Copy" warning | HIGH |
| 005C4C46 | medium | FUN_005c4c46 | port_draw_text_shadow | multi | void | Draws text with shadow. "No current font selected" error | HIGH |
| 005C4D0D | medium | FUN_005c4d0d | port_draw_text_in_rect_shadow | multi | void | Draws text in rect with shadow | MEDIUM |

---

### Cluster: Text Rendering with Shadow

Font-aware text drawing that checks `PTR_DAT_00637e5c` (current font ptr) and draws with optional shadow offset (param_4 bit 0x10 = shadow).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C4DD3 | medium | FUN_005c4dd3 | text_draw_with_shadow | 7 | void | Draws text at x,y with optional shadow. Uses gdi_847F for offset | HIGH |
| 005C4EB6 | medium | FUN_005c4eb6 | text_draw_in_rect_with_shadow | 3 | void | Draws text in RECT with optional shadow. Calls handle_colortable_3ECA | HIGH |
| 005C4F9F | medium | FUN_005c4f9f | text_draw_with_font_shadow | 8 | void | Same as text_draw_with_shadow but takes explicit font param | MEDIUM |
| 005C505D | medium | FUN_005c505d | text_draw_in_rect_with_font_shadow | 7 | void | Same as text_draw_in_rect_with_shadow but takes explicit font | MEDIUM |
| 005C512D | small | FUN_005c512d | text_measure_string | 6 | void | Measures string extent. "No current font selected" error | HIGH |
| 005C51A5 | small | FUN_005c51a5 | text_measure_string_with_font | 7 | void | Measures string extent with explicit font param | MEDIUM |

---

### Cluster: Port Drawing Lines/Rects

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C51FC | medium | FUN_005c51fc | port_draw_line_clipped | 7 | void | Draws line with clip rect check (this+0x14..0x20) | MEDIUM |
| 005C52DD | medium | FUN_005c52dd | port_draw_rect_outline | 4 | void | Draws rect outline using 4 calls to port_draw_line_clipped | MEDIUM |
| 005C53C3 | small | FUN_005c53c3 | port_draw_ellipse | 3 | void | Draws ellipse using bits_per_pixel shift (this+0x44) | LOW |

---

### Cluster: Resource System & Surface Accessors

Low-level resource/surface handle operations — creating, locking, seeking within resource bundles.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C5410 | stub | FUN_005c5410 | byte_swap_16 | 1 | uint16 | Swaps bytes of 16-bit value (big-endian conversion) | MEDIUM |
| 005C5430 | small | FUN_005c5430 | byte_swap_32 | 1 (uint) | uint | Full 32-bit byte swap (big-endian conversion) | HIGH |
| 005C5470 | stub | FUN_005c5470 | resource_open | 0 | ptr | Opens resource (wrapper for FUN_005d89e8) | LOW |
| 005C54A0 | stub | FUN_005c54a0 | resource_close | 0 | void | Closes resource (wrapper for FUN_005d8ab8) | LOW |
| 005C54D0 | stub | FUN_005c54d0 | identity_return | 1 | same | Returns param unchanged — may be endian-NOP for little-endian | LOW |
| 005C54F0 | stub | FUN_005c54f0 | surface_is_locked | 0 (thiscall) | bool | Returns this+0x34 != 0 (whether surface pixel buffer is locked) | MEDIUM |
| 005C5520 | stub | FUN_005c5520 | resource_seek_end | 1 | void | Seeks to end of resource chunk | LOW |
| 005C5540 | stub | FUN_005c5540 | resource_find_chunk | 2 (tag,id) | int | Finds chunk by 4-byte tag + id in resource | MEDIUM |
| 005C5560 | stub | FUN_005c5560 | resource_get_data_ptr | 1 | ptr | Gets data pointer from resource handle | LOW |
| 005C5580 | stub | FUN_005c5580 | resource_release_data | 1 | void | Releases resource data pointer | LOW |
| 005C55A0 | stub | FUN_005c55a0 | align_to_4 | 1 (int) | int | Aligns value up to next 4-byte boundary: ((n+3)/4)*4 | HIGH |
| 005C55D0 | stub | FUN_005c55d0 (get_stride) | get_stride | 0 (thiscall) | int | Returns this+0xC (surface stride in bytes) — **already named** | HIGH |
| 005C55F0 | stub | GetCheckStyle | get_surface_buffer_handle | 0 (thiscall) | uint | Returns this+0x40. Ghidra FID misidentifies as CCheckListBox::GetCheckStyle | HIGH |
| 005C5610 | stub | FUN_005c5610 | pixel_ptr_next_row | 1 (offset) | int | Advances pointer by stride: this+0x10 + param. Used to walk scanlines | MEDIUM |
| 005C5640 | stub | FUN_005c5640 (get_pixel_buffer) | get_pixel_buffer | 0 (thiscall) | ptr | Returns this+0x34 (locked pixel buffer ptr) — **already named** | HIGH |
| 005C5660 | stub | FUN_005c5660 (get_surface_height) | get_surface_height | 0 (thiscall) | int | Returns this+0x04 (height) — **already named** | HIGH |
| 005C5680 | stub | FUN_005c5680 | get_surface_width | 0 (thiscall) | int | Returns this+0x08 (width) | MEDIUM |
| 005C56A0 | stub | FUN_005c56a0 (get_stride_alt) | get_stride_alt | 0 (thiscall) | int | Returns this+0x0C (stride, alternate accessor) — **already named** | HIGH |
| 005C56C0 | stub | ~_Timevec | timevec_destructor | 0 (thiscall) | void | _Timevec destructor — MFC library match. Actually surface_unlock | HIGH |
| 005C56F0 | stub | IsTracking (1st) | csplitterwnd_is_tracking | 0 (thiscall) | int | CSplitterWnd::IsTracking — returns this+0x408. Ghidra FID match | FRAMEWORK |
| 005C5710 | stub | FUN_005c5710 | pixel_ptr_prev_row | 1 (offset) | int | Subtracts stride: param - this+0x10. Walk scanlines backward | MEDIUM |
| 005C5740 | stub | FUN_005c5740 | get_vtable | 0 (thiscall) | ptr | Returns *this (vtable pointer) | FRAMEWORK |

---

### Cluster: Surface Creation with Palette

Functions that create drawing surfaces and register palette info, calling into FUN_005db67b..FUN_005db923 (surface constructors) and FUN_005eb393 (palette registration). Each has a variant with an extra "name" param (calling thunk_FUN_00579b40).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C5760 | small | FUN_005c5760 | surface_create_7param | 7 | void | Creates surface w/ 7 params + palette reg | MEDIUM |
| 005C57B1 | small | FUN_005c57b1 | surface_create_7param_named | 8 | void | Above + name param | MEDIUM |
| 005C57F9 | small | FUN_005c57f9 | surface_create_8param | 8 | void | Creates surface w/ 8 params + palette reg | MEDIUM |
| 005C584E | small | FUN_005c584e | surface_create_8param_named | 9 | void | Above + name param | MEDIUM |
| 005C589A | small | FUN_005c589a | surface_create_6param | 6 | void | Creates surface w/ 6 params + palette reg | MEDIUM |
| 005C58E7 | small | FUN_005c58e7 | surface_create_6param_named | 7 | void | Above + name param | MEDIUM |
| 005C592B | small | FUN_005c592b | surface_create_7param_alt | 7 | void | Alt 7-param surface creation | MEDIUM |
| 005C597C | small | FUN_005c597c | surface_create_7param_alt_named | 8 | void | Above + name param | MEDIUM |

---

### Cluster: Surface Linked List Management

Manages a linked list of child surfaces at this+0xB8, with next-pointer at node+0x20.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C59C4 | small | FUN_005c59c4 | surface_list_append | 1 | void | Appends surface to linked list at this+0xB8 | MEDIUM |
| 005C5A27 | medium | FUN_005c5a27 | surface_list_remove | 1 (id) | void | Removes surface by id from linked list | MEDIUM |
| 005C5AEB | small | FUN_005c5aeb | surface_list_clear | 0 | void | Clears all surfaces from linked list | MEDIUM |
| 005C5B36 | small | FUN_005c5b36 | surface_list_invalidate_all | 0 | void | Invalidates all surfaces in list (calls invalidate_8B00) | MEDIUM |
| 005C5B7F | medium | FUN_005c5b7f | surface_list_find_dirty | 0 | void | Finds first dirty surface, calls FUN_005eabcc to repaint | MEDIUM |
| 005C5C2D | small | FUN_005c5c2d | surface_list_find_active | 0 | int | Finds first active surface in list, returns ptr or 0 | MEDIUM |
| 005C5C86 | medium | FUN_005c5c86 | surface_list_find_by_name | 1 (name) | int | Finds surface by name (case-insensitive), handles type 3/6/2 | MEDIUM |

---

### Cluster: Surface Node Accessors

Simple field accessors for surface list nodes.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C5E60 | stub | FUN_005c5e60 | node_get_type | 0 (thiscall) | int | Returns *this (node type field) | LOW |
| 005C5E80 | stub | FUN_005c5e80 | node_get_next | 0 (thiscall) | ptr | Returns this+0x20 (next pointer) | MEDIUM |
| 005C5EA0 | stub | FUN_005c5ea0 | node_get_dirty | 0 (thiscall) | byte | Returns this+0x24 (dirty flag) | LOW |
| 005C5EC0 | stub | FUN_005c5ec0 | node_get_data | 0 (thiscall) | ptr | Returns this+0x34 (data pointer) | LOW |
| 005C5EE0 | stub | FUN_005c5ee0 | node_get_items | 0 (thiscall) | ptr | Returns this+0x48 (items array) | LOW |
| 005C5F00 | stub | FUN_005c5f00 | node_get_count | 0 (thiscall) | int | Returns this+0x38 (item count) | LOW |

---

### Cluster: Surface Init/Destroy (Low-level constructors)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C5F20 | small | FUN_005c5f20 | surface_init_7 | 7 | void | Surface init variant (FUN_005db67b + palette) | MEDIUM |
| 005C5F7C | small | FUN_005c5f7c | surface_init_7_named | 8 | void | Above + name | MEDIUM |
| 005C5FC4 | small | FUN_005c5fc4 | surface_init_8 | 8 | void | Surface init variant (FUN_005db893) | MEDIUM |
| 005C6024 | small | FUN_005c6024 | surface_init_8_named | 9 | void | Above + name | MEDIUM |
| 005C6070 | small | FUN_005c6070 | surface_init_6 | 6 | void | Surface init variant (FUN_005db704) | MEDIUM |
| 005C60C8 | small | FUN_005c60c8 | surface_init_6_named | 7 | void | Above + name | MEDIUM |
| 005C610C | small | FUN_005c610c | surface_init_7_alt | 7 | void | Alt surface init (FUN_005db923) | MEDIUM |
| 005C6168 | small | FUN_005c6168 | surface_init_7_alt_named | 8 | void | Above + name | MEDIUM |

---

### Cluster: Modal Dialog System

Manages a stack of modal dialogs via `DAT_00637ea8` (stack depth, max 0xF) and `DAT_00637eb0` (stack array).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C61B0 | medium | FUN_005c61b0 | modal_dialog_run | 0 (thiscall) | void | Pushes dialog on stack, pumps messages until this+0x8C cleared. DAT_00637ea8=stack depth | HIGH |
| 005C62CB | stub | InvalidateObjectCache | modal_dialog_close | 0 (thiscall) | void | Sets this+0x8C=0, causing modal_dialog_run to exit. Ghidra FID misidentifies as CRichEditDoc | HIGH |
| 005C62EE | stub | FUN_005c62ee | get_active_control | 0 | int | Returns DAT_00637ea4 (active control handle) | MEDIUM |
| 005C6303 | small | FUN_005c6303 | set_active_control | 1 | int | Sets DAT_00637ea4, returns old value | MEDIUM |
| 005C6329 | small | FUN_005c6329 | dialog_set_scroll_x | 1 | void | Sets this+0x90 horizontal scroll position | LOW |
| 005C636C | small | FUN_005c636c | dialog_set_scroll_y | 1 | void | Sets this+0x94 vertical scroll position | LOW |
| 005C63AF | small | FUN_005c63af | dialog_invoke_callback | 1 | bool | Invokes callback at this+0xA0 if set | LOW |

---

### Cluster: Scrollbar Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C6400 | small | FUN_005c6400 | dialog_get_scroll_range_h | 2 (min*,max*) | void | Gets horizontal scroll range via FUN_005cd5c3 | LOW |
| 005C6440 | small | FUN_005c6440 | dialog_get_scroll_range_v | 2 (min*,max*) | void | Gets vertical scroll range | LOW |

---

### Cluster: Palette Management

8-bit palette operations: setting entries, fading, cycling, color table save/restore.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C6480 | small | FUN_005c6480 | palette_apply | 2 (start,count) | void | Applies palette changes via FUN_005decb1 + palette_generate_random_id | MEDIUM |
| 005C64DA | medium | FUN_005c64da | palette_init | 0 (thiscall) | int | Initializes palette manager. Zeroes fields at +0x424..+0x430, generates random ID at +0x408 | MEDIUM |
| 005C656B | medium | FUN_005c656b | palette_destroy | 0 (thiscall) | void | Destroys palette, frees buffers at +0x428/+0x42C/+0x430 | MEDIUM |
| 005C65F9 | medium | FUN_005c65f9 | palette_load_ctab_resource | 1 (id) | void | Loads color table from CTAB resource. "Error: Color resource not found" | HIGH |
| 005C66B9 | medium | FUN_005c66b9 | palette_load_ctab_partial | 3 | void | Loads partial color table from CTAB resource. "Color resource not found" | HIGH |
| 005C6757 | stub | FUN_005c6757 | palette_load_from_file | 1 | void | Loads palette from file (wraps FUN_005c68f0) | MEDIUM |
| 005C677B | stub | FUN_005c677b | palette_save_to_file_full | 1 | void | Saves full palette (0..255) to file | MEDIUM |
| 005C67A6 | medium | FUN_005c67a6 | palette_save_to_file | 3 (file,start,count) | void | Saves palette range to file. Writes start+count+RGB data | MEDIUM |
| 005C68CA | stub | FUN_005c68ca | seh_cleanup_68ca | 0 | void | SEH cleanup | FRAMEWORK |
| 005C68E0 | stub | FUN_005c68e0 | seh_restore_fs_68e0 | 0 | void | SEH FS restore | FRAMEWORK |
| 005C68F0 | medium | FUN_005c68f0 | palette_load_from_file_impl | 1 | void | Reads palette file: count+RGB data, calls palette_set_entries | MEDIUM |
| 005C6A1C | stub | FUN_005c6a1c | seh_cleanup_6a1c | 0 | void | SEH cleanup | FRAMEWORK |
| 005C6A32 | stub | FUN_005c6a32 | seh_restore_fs_6a32 | 0 | void | SEH FS restore | FRAMEWORK |
| 005C6A42 | small | FUN_005c6a42 | palette_generate_random_id | 0 (thiscall) | void | Generates random non-zero ID at this+0x408: rand()&0x7FFF | MEDIUM |
| 005C6A8D | small | FUN_005c6a8d | palette_apply_standard | 2 | void | Apply palette via standard pathway (FUN_005de984) | LOW |
| 005C6AC9 | small | FUN_005c6ac9 | palette_apply_alternate | 2 | void | Apply palette via alternate pathway (FUN_005de9e0) | LOW |
| 005C6B05 | stub | FUN_005c6b05 | palette_update | 0 | void | Calls update_palette_EA62 | MEDIUM |
| 005C6B3B | stub | Realloc | file_open | 2 | int | Opens file for reading. Ghidra FID misidentifies as CMemFile::Realloc | HIGH |
| 005C6B63 | stub | FUN_005c6b63 | palette_read_entries | multi | void | Reads palette entries from hardware/surface | LOW |
| 005C6B93 | small | FUN_005c6b93 | palette_set_single_entry | 1 | void | Sets single palette entry via FUN_005deb12 | LOW |
| 005C6BD5 | medium | FUN_005c6bd5 | palette_cycle_entries | 3 (start,count,dir) | void | Rotates palette entries. Positive=forward, negative=backward. Calls update_palette | MEDIUM |
| 005C6DA8 | medium | FUN_005c6da8 | palette_set_entries | 3 (start,count,data) | void | Sets range of palette entries from RGB byte array. Clamps to 256 | HIGH |
| 005C6E36 | medium | FUN_005c6e36 | palette_setup_fade_to_color | 3 (start,count,scale) | void | Sets up palette fade: saves original colors at +0x430 | MEDIUM |
| 005C6EDC | small | FUN_005c6edc | palette_setup_fade_to_rgb | 6 (start,count,scale,r,g,b) | void | Sets fade target color (this+0x424..0x426) then calls palette_setup_fade_to_color | MEDIUM |
| 005C6F2C | medium | FUN_005c6f2c | palette_restore_from_fade | 0 | void | Restores original palette from saved data at +0x430 | MEDIUM |
| 005C6FC3 | small | FUN_005c6fc3 | palette_get_saved_data | 2 (offset,dest) | void | Copies saved palette data to output buffer | LOW |
| 005C701C | large | FUN_005c701c | palette_fade_step | 1 (factor) | void | Interpolates palette between saved and target color. "Color Scale factor out of range" | HIGH |
| 005C71F3 | medium | FUN_005c71f3 | palette_setup_crossfade | 3 (start,count,scale) | void | Sets up crossfade between two palettes. Saves both at +0x428/+0x42C | MEDIUM |
| 005C72F8 | medium | FUN_005c72f8 | palette_restore_from_crossfade | 0 | void | Restores palette from crossfade data, frees buffers | MEDIUM |
| 005C738E | large | FUN_005c738e | palette_crossfade_step | 1 (factor) | void | Interpolates between two saved palettes. "Color Scale factor out of range" | HIGH |

---

### Cluster: Palette Color Matching (KD-tree)

A 3D KD-tree for RGB nearest-neighbor palette color lookup. Used for color quantization.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C7579 | large | FUN_005c7579 | palette_build_lookup_table | 4 (dest,start,count,unused) | void | Builds palette→index lookup table using KD-tree color matching | MEDIUM |
| 005C76E4 | stub | FUN_005c76e4 | kdtree_cleanup_76e4 | 0 | void | KD-tree cleanup wrapper | FRAMEWORK |
| 005C76FA | stub | FUN_005c76fa | seh_restore_fs_76fa | 0 | void | SEH FS restore | FRAMEWORK |
| 005C770A | large | FUN_005c770a | palette_build_lookup_table_ex | 6 | void | Extended lookup table builder with separate source/dest palettes | MEDIUM |
| 005C7873 | stub | FUN_005c7873 | kdtree_cleanup_7873 | 0 | void | KD-tree cleanup wrapper | FRAMEWORK |
| 005C7889 | stub | FUN_005c7889 | seh_restore_fs_7889 | 0 | void | SEH FS restore | FRAMEWORK |
| 005C7899 | medium | FUN_005c7899 | palette_find_nearest_color | 3 (r,g,b) | int | Finds nearest palette index for RGB using KD-tree | MEDIUM |
| 005C7998 | stub | FUN_005c7998 | kdtree_cleanup_7998 | 0 | void | KD-tree cleanup wrapper | FRAMEWORK |
| 005C79AE | stub | FUN_005c79ae | seh_restore_fs_79ae | 0 | void | SEH FS restore | FRAMEWORK |
| 005C79BF | small | FUN_005c79bf | kdtree_init | 0 (thiscall) | ptr | Initializes KD-tree structure (zeroes fields) | MEDIUM |
| 005C7A30 | small | FUN_005c7a30 | kdtree_destroy | 0 (thiscall) | void | Destroys KD-tree, frees memory | MEDIUM |
| 005C7A86 | large | FUN_005c7a86 | kdtree_build | 3 (data,start,count) | void | Builds balanced KD-tree from RGB palette data. Inserts from median outward | MEDIUM |
| 005C7C7B | medium | FUN_005c7c7b | kdtree_insert | 2 (node,id) | void | Inserts node into KD-tree, cycling through R/G/B axes (mod 3) | MEDIUM |
| 005C7E06 | xlarge | FUN_005c7e06 | kdtree_find_nearest | 4 (r,g,b,tolerance) | int | KD-tree nearest-neighbor search. Returns palette index. Tolerance param=0x20 | HIGH |
| 005C80FD | medium | FUN_005c80fd | palette_find_middle_gray | 1 (data) | int | Finds palette entry closest to (128,128,128). Starting point for KD-tree build | MEDIUM |

---

### Cluster: GDI Font Management

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C8200 | medium | create_font_8200 | create_font_by_name | 3 (family,size,style) | handle | Creates font. Family: 0=Times New Roman, 1=Arial, 2=System, 3=Courier. Style: bit0=bold, bit1=italic, bit2=underline, bit3=strikeout | HIGH |
| 005C8391 | medium | FUN_005c8391 | get_font_variant | 2 (collection,index) | handle | Gets font variant from font collection (at data+0x108+index*4) | MEDIUM |
| 005C841D | small | FUN_005c841d | delete_font | 1 (handle) | void | Deletes font handle (DeleteObject if owner flag set) | MEDIUM |
| 005C847F | medium | gdi_847F | get_font_height | 1 (handle) | int | Gets font height via GetTextMetricsA. **Already named** | HIGH |
| 005C8514 | medium | gdi_8514 | get_font_line_height | 1 (handle) | int | Returns tmHeight + tmExternalLeading (total line height) | MEDIUM |
| 005C858E | medium | measure_text_858E | measure_text_width | 2 (handle,text) | int | Measures text width via GetTextExtentPointA. **Already named** | HIGH |
| 005C861C | medium | FUN_005c861c | load_font_resource | 1 (filename) | handle | AddFontResourceA + enumerate font faces, store handles. Returns collection handle | MEDIUM |
| 005C86BC | medium | create_font_86BC | enum_font_callback | 4 (LOGFONT*,...) | int | EnumFontFamiliesA callback. Compares first 3 chars of font name, creates matching fonts | HIGH |
| 005C8736 | small | gdi_8736 | enumerate_font_faces | 1 (data) | int | Enumerates all system font faces via EnumFontFamiliesA | MEDIUM |
| 005C8791 | medium | FUN_005c8791 | unload_font_resource | 1 (handle) | void | RemoveFontResourceA + DeleteObject for all cached font handles | MEDIUM |
| 005C8834 | medium | render_text_8834 | measure_text_wrapped | 4 (rect*,font,text,width) | RECT* | Measures wrapped text via DrawTextA with DT_CALCRECT. **Already named** | HIGH |
| 005C8908 | medium | create_font_8908 | create_font_from_logfont | 1 (LOGFONT*) | handle | CreateFontIndirectA + wrap in handle struct | MEDIUM |
| 005C8984 | small | FUN_005c8984 | delete_font_handle | 1 (handle) | void | DeleteObject + free handle (alternative cleanup path) | MEDIUM |

---

### Cluster: Custom Control System ("MSControlClass")

Implements MicroProse custom Windows controls: buttons, checkboxes, labels, scrollbars. Uses `CreateWindowExA` with class names "MSControlClass", "MSScrollBarClass", etc. Controls store per-instance data via GetWindowLongA/SetWindowLongA.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C89ED | medium | send_msg_89ED | control_add_font_resource | 1 (filename) | handle | AddFontResourceA, wraps in handle. For control text rendering | MEDIUM |
| 005C8A85 | stub | send_msg_8A85 | control_remove_font_resource | 1 (handle) | void | RemoveFontResourceA + free handle | MEDIUM |
| 005C8B00 | stub | invalidate_8B00 | control_invalidate | 1 (hwnd) | void | InvalidateRect wrapper | FRAMEWORK |
| 005C8B2D | stub | manage_window_8B2D | control_show | 1 (hwnd) | void | ShowWindow wrapper | FRAMEWORK |
| 005C8B58 | stub | manage_window_8B58 | control_hide | 1 (hwnd) | void | ShowWindow(SW_HIDE) | FRAMEWORK |
| 005C8B83 | small | FUN_005c8b83 | control_destroy | 1 (hwnd) | void | DestroyWindow wrapper with cleanup | MEDIUM |
| 005C8BE1 | medium | create_window_8BE1 | control_create_label | multi | HWND | Creates MSControlClass label control | MEDIUM |
| 005C8C83 | stub | FUN_005c8c83 | control_move | multi | void | MoveWindow wrapper for control repositioning | MEDIUM |
| 005C8CAF | large | FUN_005c8caf | control_init_checkbox | multi | HWND | Initializes checkbox control with bitmap states | MEDIUM |
| 005C8F50 | stub | FUN_005c8f50 | control_get_rect | 0 (thiscall) | int* | Returns pointer to control rect | LOW |
| 005C8F70 | stub | FUN_005c8f70 | control_set_callback_a | 1 | void | Sets callback function pointer A | LOW |
| 005C8FB0 | stub | FUN_005c8fb0 | control_set_callback_b | 1 | void | Sets callback function pointer B | LOW |
| 005C8FF0 | stub | FUN_005c8ff0 | control_set_callback_c | 1 | void | Sets callback function pointer C | LOW |
| 005C9030 | stub | FUN_005c9030 | control_set_callback_d | 1 | void | Sets callback function pointer D | LOW |
| 005C9070 | stub | FUN_005c9070 | control_set_callback_e | 1 | void | Sets callback function pointer E | LOW |
| 005C90B0 | stub | FUN_005c90b0 | control_get_enabled | 0 (thiscall) | bool | Returns whether control is enabled | LOW |
| 005C90CA | medium | update_palette_90CA | control_paint_with_palette | 2 (PAINTSTRUCT*,hwnd) | void | Paints control surface with palette realization. **Already named** | MEDIUM |
| 005C9222 | medium | FUN_005c9222 | control_parse_hotkey | 2 (ctrl,text) | void | Parses '~' hotkey marker from text, stores at ctrl+0x28. Converts to lowercase | HIGH |
| 005C9307 | medium | send_msg_9307 | control_wndproc_base | 4 (hwnd,msg,wp,lp) | LRESULT | Base WndProc for MSControlClass. Handles WM_PAINT, WM_DESTROY, WM_SETFOCUS, WM_KILLFOCUS | HIGH |
| 005C944B | small | manage_window_944B | control_register_instance | multi | void | Registers per-control instance data via SetWindowLongA | MEDIUM |
| 005C9499 | medium | FUN_005c9499 | control_alloc_instance | 2 (hwnd,parent) | int | Allocates per-instance control data, stores via extra window bytes | MEDIUM |
| 005C9563 | small | FUN_005c9563 | control_get_instance | 1 (hwnd) | int | Retrieves per-instance data from window extra bytes | MEDIUM |
| 005C9595 | medium | FUN_005c9595 | control_free_instance | 1 (hwnd) | void | Frees per-instance control data. "Tried to dispose NULL control" | HIGH |
| 005C96CC | small | invalidate_96CC | control_invalidate_client | 1 (hwnd) | void | InvalidateRect(hwnd, client_rect, FALSE). **Already named** | MEDIUM |
| 005C9710 | stub | delbuf | control_cleanup_delbuf | 1 (thiscall) | void | ios::delbuf cleanup. Ghidra library match | FRAMEWORK |

---

### Cluster: Button Control ("draw_text_9740")

The large button creation function that draws 3 button states (normal, hover, disabled) into off-screen bitmaps.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005C9740 | xlarge | draw_text_9740 | control_create_button | 4 (rect*,ctrl,text,visible) | HWND | Creates 3-state button control. Draws normal/hover/disabled bitmaps with 3D border, centered text, hotkey underline. Sets WndProc to blit_ACD4 | HIGH |
| 005CABF6 | stub | FUN_005cabf6 | control_check_null | 1 | void | Logs "Error: Tried to dispose NULL Button" if param is 0 | HIGH |
| 005CAC22 | medium | FUN_005cac22 | control_activate_button | 1 (hwnd) | void | Activates button: SetFocus, flash pressed state, invoke callback | MEDIUM |

---

### Cluster: Button WndProc

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CACD4 | xlarge | blit_ACD4 | button_wndproc | 4 (hwnd,msg,wp,lp) | LRESULT | WndProc for 3-state buttons. Handles WM_PAINT (BitBlt from correct state bitmap), WM_LBUTTONDOWN (capture+press), WM_LBUTTONUP (release+activate), WM_KEYDOWN (space=click), WM_MOUSEMOVE (hover tracking), WM_SETFOCUS (draw focus rect) | HIGH |

---

### Cluster: Image Button Control

Similar to button but uses sprite images instead of text.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CB319 | xlarge | create_window_B319 | control_create_image_button | 8 (x,y,sprites,img1,img2,...) | HWND | Creates image button with sprite-based up/down states. Uses port_blit_stretch, sets WndProc to blit_B6EB | HIGH |
| 005CB601 | medium | create_window_B601 | control_create_panel | 6 (x,y,w,h,data,visible) | HWND | Creates simple panel/frame control (no bitmap states). WndProc=blit_B6EB | MEDIUM |
| 005CB6DB | stub | FUN_005cb6db | noop_b6db | 0 | void | Empty function (noop) | FRAMEWORK |
| 005CB6EB | xlarge | blit_B6EB | image_button_wndproc | 4 (hwnd,msg,wp,lp) | LRESULT | WndProc for image buttons. Handles WM_PAINT (BitBlt from surface), WM_LBUTTONDOWN, WM_LBUTTONUP, WM_KEYDOWN(space), WM_MOUSEMOVE, WM_SETFOCUS, WM_KILLFOCUS | HIGH |

---

### Cluster: Scrollbar/Tracking Controls

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CBDB0 | stub | IsTracking (2nd) | tracking_is_active | 0 (thiscall) | int | Returns this+0x408. Duplicate of earlier IsTracking | FRAMEWORK |
| 005CBDD0 | stub | FUN_005cbdd0 | control_is_focusable | 0 | bool | Returns whether current control accepts focus | LOW |
| 005CBDF0 | stub | FUN_005cbdf0 | control_invoke_activate | 1 | void | Invokes control activation callback | LOW |
| 005CBE30 | stub | FUN_005cbe30 | control_set_state_a | 1 | void | Sets control state field A | LOW |
| 005CBE70 | stub | FUN_005cbe70 | control_set_state_b | 1 | void | Sets control state field B | LOW |
| 005CBEB0 | stub | FUN_005cbeb0 | control_set_state_c | 1 | void | Sets control state field C | LOW |
| 005CBED0 | stub | FID_conflict:_$E31 | fid_conflict_e31 | 0 | void | FID conflict stub | FRAMEWORK |
| 005CBEEA | stub | FUN_005cbeea | control_get_state_a | 0 | int | Gets control state field A | LOW |
| 005CBF04 | stub | FUN_005cbf04 | control_get_state_b | 0 | int | Gets control state field B | LOW |
| 005CBF21 | stub | FUN_005cbf21 | control_get_state_c | 0 | int | Gets control state field C | LOW |

---

### Cluster: Checkbox Control

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CBF40 | medium | measure_text_BF40 | checkbox_measure_text | multi | int | Measures text for checkbox layout. **Already named** | MEDIUM |
| 005CC035 | medium | gdi_C035 | checkbox_paint | multi | void | Paints checkbox state (checked/unchecked + text) | MEDIUM |
| 005CC0F0 | large | create_window_C0F0 | control_create_checkbox | multi | HWND | Creates checkbox control. "MSControlClass" window | HIGH |
| 005CC248 | stub | FUN_005cc248 | checkbox_dispose_check | 1 | void | "Tried to dispose NULL Checkbox" warning | HIGH |
| 005CC274 | medium | invalidate_C274 | checkbox_toggle | 1 (hwnd) | void | Toggles checkbox state and invalidates | MEDIUM |

---

### Cluster: Text Display Control

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CC320 | xlarge | draw_text_C320 | control_create_text_display | multi | HWND | Creates multi-line text display control. Handles word wrap, line breaks, scrolling | HIGH |

---

### Cluster: Color/Style Globals

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CCDDF | small | FUN_005ccddf | set_control_color_a | 3 (r,g,b) | void | Sets DAT_00637f00..02 color + flag DAT_00637f03=1 | MEDIUM |
| 005CCE0E | small | FUN_005cce0e | set_control_color_b | 3 (r,g,b) | void | Sets DAT_00637f04..06 color + flag DAT_00637f07=1 | MEDIUM |
| 005CCE40 | small | FUN_005cce40 | control_invoke_draw_callback | 2 | void | Invokes draw callback at this+0x2C | LOW |
| 005CCE80 | medium | FUN_005cce80 | control_subclass_wndproc | 4 (hwnd,msg,wp,lp) | void | Subclassed WndProc. On WM_DESTROY: calls ios::delbuf. Routes to original WndProc | HIGH |

---

### Cluster: Scrollbar Control

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CCF17 | xlarge | register_wndclass_CF17 | control_create_scrollbar | 4 (rect*,callback,style,visible) | HWND | Creates custom scrollbar. Registers "MSScrollBarClass" if not yet done. Subclasses SCROLLBAR, adds extra window bytes | HIGH |
| 005CD139 | stub | FUN_005cd139 | scrollbar_noop | 0 | void | Empty function (placeholder) | FRAMEWORK |
| 005CD149 | xlarge | gdi_D149 | scrollbar_wndproc | 4 (hwnd,msg,wp,lp) | void | Scrollbar message handler. Processes WM_COMMAND(0x7F=direct set), WM_HSCROLL/WM_VSCROLL (line up/down, page up/down, thumb track/position). Calls callback on value change | HIGH |
| 005CD49F | stub | FUN_005cd49f | control_enable | 2 (hwnd,enable) | void | EnableWindow wrapper (null-safe) | MEDIUM |
| 005CD4C7 | small | FUN_005cd4c7 | scrollbar_set_range | 3 (hwnd,min,max) | void | SetScrollRange + sets initial position to min | MEDIUM |
| 005CD4FD | small | FUN_005cd4fd | scrollbar_set_range_ex | 4 (hwnd,min,max,redraw) | void | SetScrollRange with redraw flag + set position | MEDIUM |
| 005CD535 | stub | FUN_005cd535 | scrollbar_get_range | 3 (hwnd,min*,max*) | void | GetScrollRange wrapper | MEDIUM |
| 005CD559 | stub | FUN_005cd559 | scrollbar_set_pos | 2 (hwnd,pos) | void | Sets position via gdi_D149 with 0x7F command | MEDIUM |
| 005CD580 | small | FUN_005cd580 | scrollbar_set_range_native | 4 (wnd,min,max,vert) | void | Native scrollbar range (uses HWND at wnd+4) | MEDIUM |
| 005CD5C3 | small | FUN_005cd5c3 | scrollbar_get_range_native | 4 (wnd,min*,max*,vert) | void | Native scrollbar range getter | MEDIUM |
| 005CD5F0 | small | FUN_005cd5f0 | scrollbar_set_pos_native | 3 (wnd,pos,vert) | void | Native scrollbar position setter | MEDIUM |
| 005CD620 | stub | FUN_005cd620 | scrollbar_get_pos | 0 (thiscall) | int | Returns this+0x3C (current scroll position) | MEDIUM |
| 005CD640 | small | FUN_005cd640 | scrollbar_invoke_change_callback | 1 (value) | void | Invokes callback at this+0x2C on value change | MEDIUM |
| 005CD680 | small | FUN_005cd680 | scrollbar_invoke_track_callback | 1 (value) | void | Invokes callback at this+0x30 during tracking | MEDIUM |
| 005CD6C0 | stub | FUN_005cd6c0 | scrollbar_get_page_size | 0 (thiscall) | int | Returns this+0x34 (page size for page-up/down) | MEDIUM |

---

### Cluster: Scale Lookup Table System

Builds lookup tables for zoom/stretch operations. Uses 16-slot LRU cache at DAT_006d4700 (stride 0x100C = 4108 bytes per slot: 2 ints for params + 1 int timestamp + 1024 int lookup entries).

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CD6E0 | medium | FUN_005cd6e0 | scale_table_init_all | 0 | void | Initializes all 16 scale table cache slots to zero. Then creates 1:1 tables | MEDIUM |
| 005CD775 | xlarge | FUN_005cd775 | scale_table_build_primary | 2 (src,dst) | void | Builds primary scale lookup table. Sets DAT_00637f98/9c (zoom_current/threshold). DAT_006e47c8 = pointer to active table | HIGH |
| 005CDA06 | stub | FUN_005cda06 | scale_table_get_current | 2 (src*,dst*) | void | Returns DAT_00637f98 and DAT_00637f9c (current zoom params) | HIGH |
| 005CDA2A | xlarge | FUN_005cda2a | scale_table_build_pair | 4 (src1,dst1,src2,dst2) | void | Builds two scale tables (primary + secondary). Sets DAT_006e47c0/c4 as active table pointers | HIGH |
| 005CDCDB | medium | FUN_005cdcdb | scale_table_fill_slot | 3 (slot,src,dst) | void | Fills one cache slot with Bresenham-style scale mapping for 1024 entries | HIGH |

---

### Cluster: CRT/MFC Library Functions

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CDE2C | stub | CString | cstring_ctor | 0 (thiscall) | CString* | CString::CString() — MFC library match | FRAMEWORK |

---

### Cluster: Sprite System

Sprite management: extraction from surfaces, loading from resources/files, locking pixel data, palette remapping, RLE-like compressed sprite storage. The sprite struct has: +0x00..0x0F=source_rect, +0x10..0x1F=content_rect, +0x20=width, +0x24=height, +0x28..0x2B=draw_offset, +0x30=transparent_color, +0x34=data_handle, +0x38=locked_data_ptr.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CDE4D | small | FUN_005cde4d | sprite_free_data | 0 (thiscall) | void | Frees sprite pixel data (+0x34/+0x38) | MEDIUM |
| 005CDEA1 | medium | FUN_005cdea1 | sprite_init_empty | 3 (w,h,bpp) | void | Creates empty sprite with given dimensions | MEDIUM |
| 005CDF2D | stub | FUN_005cdf2d | sprite_init_cleanup | 0 | void | Cleanup for sprite init | FRAMEWORK |
| 005CDF40 | stub | FUN_005cdf40 | seh_restore_fs_df40 | 0 | void | SEH FS restore | FRAMEWORK |
| 005CDF50 | small | FUN_005cdf50 | sprite_reset | 0 (thiscall) | void | Resets sprite: unlocks data, frees handle, reinits | MEDIUM |
| 005CDFB2 | stub | FUN_005cdfb2 | sprite_decompress_noop | 0 | void | Empty decompress callback (noop) | FRAMEWORK |
| 005CDFC2 | medium | FUN_005cdfc2 | sprite_load_from_resource | 1 (id) | void | Loads sprite from SPRT resource. "Error: SPRT resource not found" | HIGH |
| 005CE16E | stub | FUN_005ce16e | sprite_save_to_resource_auto | 2 | void | Saves sprite to resource with auto palette range (-1,-1) | LOW |
| 005CE19A | xlarge | FUN_005ce19a | sprite_save_to_resource | 3 (id,pal_start,pal_count) | void | Saves sprite to SPRT resource with palette data. "SPRT resource not found" | HIGH |
| 005CE3A8 | stub | FUN_005ce3a8 | sprite_load_from_file_wrapper | 1 | void | Wraps sprite_load_from_file (FUN_005ce9ef) | LOW |
| 005CE3CC | large | FUN_005ce3cc | sprite_save_to_file | 3 (file,pal_start,pal_count) | void | Saves sprite to file with header+data+palette. Uses Realloc for file handle | MEDIUM |
| 005CE595 | stub | FUN_005ce595 | seh_cleanup_e595 | 0 | void | SEH cleanup | FRAMEWORK |
| 005CE5AB | stub | FUN_005ce5ab | seh_restore_fs_e5ab | 0 | void | SEH FS restore | FRAMEWORK |
| 005CE5BB | medium | FUN_005ce5bb | sprite_save_to_file_nopal | 1 (file) | void | Saves sprite to file without palette data | MEDIUM |
| 005CE6FD | stub | FUN_005ce6fd | seh_cleanup_e6fd | 0 | void | SEH cleanup | FRAMEWORK |
| 005CE713 | stub | FUN_005ce713 | seh_restore_fs_e713 | 0 | void | SEH FS restore | FRAMEWORK |
| 005CE723 | stub | FUN_005ce723 | sprite_load_from_file_auto | 2 | void | Loads sprite from file with auto palette range | LOW |
| 005CE74F | xlarge | FUN_005ce74f | sprite_load_from_file | 3 (file,pal_start,pal_count) | void | Loads sprite from file with palette. Reads header, allocates data buffer, loads palette | MEDIUM |
| 005CE9C9 | stub | FUN_005ce9c9 | seh_cleanup_e9c9 | 0 | void | SEH cleanup | FRAMEWORK |
| 005CE9DF | stub | FUN_005ce9df | seh_restore_fs_e9df | 0 | void | SEH FS restore | FRAMEWORK |
| 005CE9EF | large | FUN_005ce9ef | sprite_load_from_file_impl | 1 (file) | void | Implementation: reads sprite header+data from binary file | MEDIUM |
| 005CEB8E | stub | FUN_005ceb8e | seh_cleanup_eb8e | 0 | void | SEH cleanup | FRAMEWORK |
| 005CEBA4 | stub | FUN_005ceba4 | seh_restore_fs_eba4 | 0 | void | SEH FS restore | FRAMEWORK |

---

### Cluster: Sprite Extraction from Surface

These extract sprite data from a locked port/surface, creating compressed scan-line data.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CEBB4 | small | FUN_005cebb4 | sprite_extract_from_port | 2 (bpp,rect*) | void | Extracts sprite from port surface using auto-detect transparent color | MEDIUM |
| 005CEBEC | small | FUN_005cebec (create_render_ctx) | sprite_extract_rect | 5 (bpp,x,y,w,h) | void | Extracts sprite from port at given rect. **Already named as create_render_ctx** | HIGH |
| 005CEC44 | small | FUN_005cec44 | sprite_extract_with_transp | 3 (bpp,transp,rect*) | void | Extracts sprite with explicit transparent color | MEDIUM |
| 005CEC80 | medium | FUN_005cec80 | sprite_extract_by_boundary | 5 (bpp,boundary_char,x,y) | void | Extracts sprite by scanning for boundary character in surface data. Finds left/right/top/bottom edges | MEDIUM |
| 005CEDAD | small | FUN_005cedad (create_render_ctx) | sprite_extract_rect_with_transp | 6 (bpp,transp,x,y,w,h) | void | Extracts sprite from rect with explicit transparent color. **Already named** | HIGH |
| 005CEE09 | small | FUN_005cee09 | sprite_extract_timevec | 2 (bpp,rect*) | void | Extracts sprite from _Timevec surface (locked via FUN_005e6188) | MEDIUM |
| 005CEE41 | small | FUN_005cee41 | sprite_extract_timevec_rect | 5 (bpp,x,y,w,h) | void | Extracts sprite from _Timevec surface at given rect | MEDIUM |
| 005CEE99 | small | FUN_005cee99 | sprite_extract_timevec_with_transp | 3 (bpp,transp,rect*) | void | _Timevec sprite extraction with explicit transparent color | MEDIUM |
| 005CEED5 | small | FUN_005ceed5 | sprite_extract_timevec_rect_transp | 6 (bpp,transp,x,y,w,h) | void | _Timevec sprite extraction from rect with transparent color | MEDIUM |

---

### Cluster: Blit Dispatch Wrappers

Thin wrappers around the 6 blit dispatchers (005D0xxx). These are the API entry points. **All already documented in reference context.**

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CEF31 | stub | FUN_005cef31 (blit_normal) | blit_normal | 4 | ptr | Calls dispatch_oleitem_normal with transp=0xFF. **Already named** | HIGH |
| 005CEF66 | stub | FUN_005cef66 (blit_normal_custom_transp) | blit_normal_custom_transp | 5 | ptr | Calls dispatch_oleitem_normal with custom transp. **Already named** | HIGH |
| 005CEF9F | stub | FUN_005cef9f (blit_normal_timevec) | blit_normal_timevec | 4 | ptr | Calls dispatch_timevec_normal with transp=0xFF. **Already named** | HIGH |
| 005CEFD4 | stub | FUN_005cefd4 (blit_normal_timevec_transp) | blit_normal_timevec_transp | 5 | ptr | Calls dispatch_timevec_normal with custom transp. **Already named** | HIGH |
| 005CF00D | stub | FUN_005cf00d (blit_aniso) | blit_aniso | 4 | ptr | Calls dispatch_oleitem_aniso with transp=0xFF. **Already named** | HIGH |
| 005CF042 | stub | FUN_005cf042 (blit_aniso_transp) | blit_aniso_transp | 5 | ptr | Calls dispatch_oleitem_aniso with custom transp. **Already named** | HIGH |
| 005CF07B | stub | FUN_005cf07b (blit_aniso_timevec) | blit_aniso_timevec | 4 | ptr | Calls dispatch_timevec_aniso with transp=0xFF. **Already named** | HIGH |
| 005CF0B0 | stub | FUN_005cf0b0 (blit_aniso_timevec_transp) | blit_aniso_timevec_transp | 5 | ptr | Calls dispatch_timevec_aniso with custom transp. **Already named** | HIGH |
| 005CF0E9 | stub | FUN_005cf0e9 (blit_dimmed_explicit_transp) | blit_dimmed_explicit_transp | 6 | ptr | Calls dispatch_oleitem_dimmed with explicit transp+fill. **Already named** | HIGH |
| 005CF126 | stub | FUN_005cf126 (blit_dimmed) | blit_dimmed | 5 | ptr | Calls dispatch_oleitem_dimmed with transp=0xFF. **Already named** | HIGH |
| 005CF15F | stub | FUN_005cf15f | blit_dimmed_timevec_explicit_transp | 6 | ptr | Calls dispatch_timevec_dimmed with explicit transp+fill | HIGH |
| 005CF19C | stub | FUN_005cf19c | blit_dimmed_timevec | 5 | ptr | Calls dispatch_timevec_dimmed with transp=0xFF | HIGH |
| 005CF1D5 | stub | FUN_005cf1d5 | blit_normal_no_transp | 4 | ptr | Calls dispatch_oleitem_normal with transp=0xFE (no transparency) | MEDIUM |
| 005CF20A | stub | FUN_005cf20a | blit_normal_timevec_no_transp | 4 | ptr | Calls dispatch_timevec_normal with transp=0xFE | MEDIUM |

---

### Cluster: Sprite Drawing (Fill/Recolor)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CF23F | small | FUN_005cf23f | sprite_fill_solid | 1 (dest) | void | Fills sprite with solid color (no offset) | LOW |
| 005CF26D | small | FUN_005cf26d | sprite_fill_solid_offset | 3 (dest,dx,dy) | void | Fills sprite with solid color at offset | LOW |
| 005CF29F | small | FUN_005cf29f | sprite_fill_pattern | 1 (dest) | void | Fills sprite with pattern (mode=1) | LOW |
| 005CF2CD | small | FUN_005cf2cd | sprite_fill_pattern_offset | 3 (dest,dx,dy) | void | Fills sprite with pattern at offset | LOW |

---

### Cluster: Sprite Data Locking

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CF2FF | small | FUN_005cf2ff | sprite_lock_data | 0 (thiscall) | void | Locks sprite data: if +0x38==0, gets ptr from +0x34 handle | MEDIUM |
| 005CF337 | small | FUN_005cf337 | sprite_unlock_data | 0 (thiscall) | void | Unlocks sprite data: releases handle at +0x34, zeroes +0x38 | MEDIUM |
| 005CF36F | stub | FUN_005cf36f | sprite_is_locked | 0 (thiscall) | bool | Returns this+0x38 != 0 (whether sprite data is locked) | MEDIUM |

---

### Cluster: Sprite Accessors

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CF39B | small | FUN_005cf39b | sprite_set_dimensions | 2 (w,h) | void | Sets this+0x20=w, this+0x24=h | MEDIUM |
| 005CF3C5 | small | FUN_005cf3c5 | sprite_get_dimensions | 2 (w*,h*) | void | Gets this+0x20 and this+0x24 | MEDIUM |
| 005CF3F3 | small | FUN_005cf3f3 | sprite_set_scale | 2 (sx,sy) | void | Sets scale factors at +0x28/+0x2C (min=1) | MEDIUM |
| 005CF439 | small | FUN_005cf439 | sprite_get_scale | 2 (sx*,sy*) | void | Gets scale factors from +0x28/+0x2C | MEDIUM |

---

### Cluster: Sprite Pixel Manipulation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CF467 | medium | FUN_005cf467 | sprite_replace_color | 2 (from,to) | void | Replaces all occurrences of one palette index with another in sprite data. "Warning: Sprite not locked in ChangeColor" | HIGH |
| 005CF541 | medium | FUN_005cf541 | sprite_remap_palette | 2 (remap_table,offset) | void | Remaps all pixel values through a lookup table. "Warning: Sprite not locked in ChangePalette" | HIGH |

---

### Cluster: Sprite Extraction Core (from OleItem Surface)

The two large sprite extraction implementations — one from port/OleItem surfaces, one from _Timevec surfaces.

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 005CF64C | xlarge | FUN_005cf64c | sprite_extract_from_oleitem | 3 (surface,transp,rect*) | handle | Core sprite extraction from OleItem surface. Scans for transparent color, builds RLE scan-line data (offset+run pairs). "Warning: Port not locked on Sprite Extract", "Sprite Extract Illegal Pixel", "Unable to allocate scan line", "Couldn't allocate memory" | HIGH |
| 005CFDEB | xlarge | FUN_005cfdeb | sprite_extract_from_timevec | 3 (surface,transp,rect*) | handle | Core sprite extraction from _Timevec surface. Same algorithm as above but uses FUN_005e6188 (lock_surface) and FUN_005e7028/005d1ef0/005d1f20 for pixel access | HIGH |

---

## SUMMARY

### 1. Totals and Breakdown

**Total functions: 339**

| Category | Count | Description |
|----------|-------|-------------|
| Port/Surface Ops | 45 | Pixel buffer management, fill, copy, draw primitives |
| Image Loading | 30 | BMP, TGA, GIF decoders (resource + file variants) |
| Palette Management | 30 | 8-bit color table ops, fading, cycling, KD-tree matching |
| Font/Text | 18 | GDI font creation, measurement, text rendering |
| Sprite System | 38 | Extraction, loading, saving, locking, recoloring, blit wrappers |
| Custom Controls | 45 | Buttons, checkboxes, scrollbars, text displays (MSControlClass) |
| Scale Tables | 5 | Zoom lookup table generation/caching |
| SEH/Framework | 50+ | SEH cleanup stubs, FS-chain restores, MFC library matches |
| Surface Mgmt | 25 | Surface creation, linked list, accessors |
| Modal Dialog | 8 | Dialog stack management |
| Already Named | ~25 | Previously identified in reference context |

### 2. Top 5 Most Important Undocumented Functions

1. **FUN_005cf64c (sprite_extract_from_oleitem)** — The core sprite extraction algorithm. Creates compressed scan-line sprite data from a surface rectangle. This is the function called by `create_render_ctx` (005CEDAD) that our JS renderer reimplements. Understanding its exact transparent-color handling and RLE format is critical.

2. **FUN_005c7e06 (kdtree_find_nearest)** — 3D KD-tree nearest-neighbor color search with tolerance window (param_4=0x20). Used for palette color quantization. Returns palette index for closest RGB match.

3. **FUN_005cd775 / FUN_005cda2a (scale_table_build)** — Builds the zoom lookup tables cached at DAT_006e47c0/c4. Sets DAT_00637f98/9c (zoom_current/threshold). The Bresenham-style fill in FUN_005cdcdb generates source→destination pixel coordinate mappings used by all scaled blits.

4. **FUN_005c61b0 (modal_dialog_run)** — The core modal dialog loop. Pushes dialog on stack (DAT_00637ea8), pumps messages until dismissed. Understanding this explains how city dialog, diplomacy screens, etc. block the main game loop.

5. **FUN_005cf467 (sprite_replace_color)** — Direct palette index replacement in sprite data. This is the mechanism behind civ-color recoloring of unit sprites (replacing one palette index with another throughout all scanlines of the compressed sprite).

### 3. New DAT_ Globals Identified with High Confidence

| Address | Proposed Name | Evidence |
|---------|--------------|----------|
| DAT_00637ea4 | active_control_handle | Get/set in 005C62EE/005C6303, used as control focus tracker |
| DAT_00637ea8 | modal_dialog_stack_depth | Incremented/decremented in modal_dialog_run, max 0xF |
| DAT_00637eb0 | modal_dialog_stack[16] | Array of dialog pointers, indexed by stack_depth |
| DAT_00637e5c (PTR_DAT) | current_font_ptr | Checked for NULL in all text drawing functions: "No current font selected" |
| DAT_00637f00..03 | control_color_a (r,g,b,flag) | Set by FUN_005ccddf |
| DAT_00637f04..07 | control_color_b (r,g,b,flag) | Set by FUN_005cce0e |
| DAT_00637f58 | scrollbar_class_registered | Guard for one-time RegisterClassA("MSScrollBarClass") |
| DAT_006d46f4 | scrollbar_extra_bytes_offset | GetClassLongA(-0x12) result, used for per-instance storage |
| DAT_006d46f8 | scrollbar_original_wndproc | Saved original SCROLLBAR WndProc before subclassing |
| DAT_006d4700 | scale_cache[16] (stride 0x100C) | LRU cache of scale lookup tables: [+0]=src, [+4]=dst, [+8]=timestamp, [+0xC..]=1024 entries |
| DAT_006e47c0 | scale_table_primary_ptr | Pointer to active primary scale table |
| DAT_006e47c4 | scale_table_secondary_ptr | Pointer to active secondary scale table |
| DAT_00638b40 | default_button_color | Used in create_window_B319 for button background |
| DAT_00638b48 | palette_mode_8bit | 1 = 8-bit palette mode (triggers SelectPalette/RealizePalette) |
| DAT_006e4ff0 | app_hinstance | HINSTANCE used in all CreateWindowExA calls |
