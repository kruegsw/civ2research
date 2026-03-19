# Block 005C0000 -- Phase 7 Audit

**Functions in this block: 339**
**System: SMEDS32 graphics framework -- Port/DIB bitmap abstraction, image loaders (TGA/BMP/GIF/CvPc), sprite extraction/RLE encoding, color palette management, font/text rendering, custom Win32 UI controls (buttons, checkboxes, scrollbars, bitmap regions), scaling tables, CString constructor**

**GL functions: 0 | AI functions: 0 | UI functions: 99 | FW functions: 240**
**Discrepancies: 0** (no game logic in this block)

---

## FW -- Framework: Port (Offscreen Bitmap Surface) Core (48 functions)

FUN_005c000d | 12B | FW | SEH destructor thunk -- calls FUN_005d7c6e
FUN_005c0023 | 17B | FW | SEH epilog -- restores FS:[0]
FUN_005c0034 | 63B | FW | Port::SetRect -- sets clip rect from member offsets +0x24..+0x30
FUN_005c0073 | 91B | FW | Port::SetClipRect -- sets clip rect from param, intersects with bounds
FUN_005c00ce | 55B | FW | Port::GetClipRect -- copies clip rect to output param
FUN_005c0105 | 131B | FW | Port::AllocateSurface -- switch on type (1-4) dispatches to DIB creation
FUN_005c019d | 36B | FW | Port::AllocateSurface1 -- wrapper, calls FUN_005bd696 for type 1
FUN_005c01c1 | 287B | FW | Port::Lock -- locks pixel buffer, computes row pointer table (+0x34/+0x38)
FUN_005c02e0 | 83B | FW | Port::Unlock -- unlocks pixel buffer, frees row pointer table
FUN_005c0333 | 236B | FW | Port::FillRect -- fills rectangle with current color on locked surface
FUN_005c041f | 43B | FW | Port::FillAll -- fills entire port with given color
FUN_005c044a | 47B | FW | Port::ChangeColor -- wrapper for color remapping on port bounds
FUN_005c0479 | 282B | FW | Port::ChangeColorInRect -- remaps one palette index to another in a rect
FUN_005c0593 | 443B | FW | Port::CopyFromPort -- blits source port rect to dest port rect (8-bit)
FUN_005c0753 | 540B | FW | Port::CopyFromDIB -- blits from DIB/DirectDraw surface to port
FUN_005c0979 | 220B | FW | Port::CopyToScreen -- copies port rect to screen via GDI
FUN_005c0a55 | 215B | FW | Port::CopyToScreenScaled -- copies port rect to screen with stretch
FUN_005c0b2c | 198B | FW | Port::CopyToScreenFromPort -- copies between ports via GDI stretch blit
FUN_005c0bf2 | 107B | FW | Port::GetPixel -- returns pixel value at (x,y) with bounds check
FUN_005c0c5d | 104B | FW | Port::SetPixel -- sets pixel value at (x,y) with bounds check
FUN_005c0cc5 | 77B | FW | Port::SetPalette -- updates palette on underlying surface
FUN_005c0d12 | 87B | FW | Port::SetPaletteIfChanged -- conditional palette update (null-safe)
FUN_005c0d69 | 238B | FW | Port::DrawText -- draws text with optional drop shadow (flag 0x10)
FUN_005c0e57 | 256B | FW | Port::DrawTextInRect -- draws text in rect with optional drop shadow
FUN_005c0f57 | 201B | FW | Port::DrawTextWithFont -- draws text using explicit font handle
FUN_005c1020 | 219B | FW | Port::DrawTextInRectWithFont -- draws text in rect using explicit font
FUN_005c10fb | 108B | FW | Port::MeasureText -- measures text width with current font
FUN_005c1167 | 75B | FW | Port::MeasureTextWithFont -- measures text width with explicit font
FUN_005c11b2 | 683B | FW | Port::DrawLine -- draws horizontal/vertical/general line with clipping
FUN_005c145d | 182B | FW | Port::DrawRect -- draws rectangle outline using 4 lines
FUN_005c1513 | 559B | FW | Port::DrawRaisedRect -- draws 3D raised rectangle (light top-left, dark bottom-right)
FUN_005c1742 | 560B | FW | Port::DrawSunkenRect -- draws 3D sunken rectangle (dark top-left, light bottom-right)
FUN_005c1972 | 38B | FW | SetCurrentPort -- sets global current port (DAT_00637e58), returns previous
FUN_005c1998 | 21B | FW | GetCurrentPort -- returns global current port (DAT_00637e58)
FUN_005c19ad | 38B | FW | SetCurrentColor -- sets global draw color (DAT_00637e78), returns previous
FUN_005c19d3 | 45B | FW | Port::GetPixelAddress -- computes pixel address from (x,y) via row table
FUN_005c1a00 | 93B | FW | Port::PointInClipRect -- returns 1 if (x,y) inside clip rect
FUN_005c1a62 | 171B | FW | Port::RemapPixels -- remaps all pixels through a lookup table
FUN_005c1b0d | 58B | FW | Port::CreateDIB_SetSize -- creates 8-bit DIB of given width/height
FUN_005c1b47 | 338B | FW | Port::CreateDIB_8bit -- allocates type-2 (8-bit) DIB surface from rect
FUN_005c1c99 | 36B | FW | Port::CreateDIB_8bit_wrapper -- wrapper for CreateDIB_8bit
FUN_005c1cbd | 58B | FW | Port::CreateDIB16_SetSize -- creates 16-bit DIB of given width/height
FUN_005c1cf7 | 338B | FW | Port::CreateDIB_16bit -- allocates type-3 (16-bit) DIB surface from rect
FUN_005c1e49 | 36B | FW | Port::CreateDIB_16bit_wrapper -- wrapper for CreateDIB_16bit
FUN_005c1e6d | 58B | FW | Port::CreateDIB24_SetSize -- creates 24-bit DIB of given width/height
FUN_005c1ea7 | 338B | FW | Port::CreateDIB_24bit -- allocates type-4 (24-bit) DIB surface from rect
FUN_005c1ff9 | 36B | FW | Port::CreateDIB_24bit_wrapper -- wrapper for CreateDIB_24bit
FUN_005c201d | 43B | FW | RGB_to_15bit -- converts (R,G,B) to 15-bit RGB555 packed pixel
FUN_005c55a0 | 34B | FW | AlignTo4 -- rounds width up to next multiple of 4 (DWORD alignment)

---

## FW -- Framework: Image Loaders -- TGA/BMP/GIF/CvPc 16-bit (16 functions)

FUN_005c2048 | 782B | FW | Port::LoadTGA_Resource_16bit -- loads TGA from resource into 16-bit port
FUN_005c2360 | 1052B | FW | Port::LoadTGA_File_16bit -- loads TGA from file into 16-bit port
FUN_005c2786 | 12B | FW | SEH destructor thunk
FUN_005c279c | 17B | FW | SEH epilog
FUN_005c27ad | 699B | FW | Port::LoadBMP_Resource_16bit -- loads BMP from resource into 16-bit port
FUN_005c2a77 | 945B | FW | Port::LoadBMP_File_16bit -- loads BMP from file into 16-bit port
FUN_005c2e37 | 12B | FW | SEH destructor thunk
FUN_005c2e4d | 17B | FW | SEH epilog
FUN_005c2e5e | 1205B | FW | Port::LoadGIF_Resource_16bit -- loads GIF from resource into 16-bit port (LZW decode)
FUN_005c3313 | 1338B | FW | Port::LoadGIF_File_16bit -- loads GIF from file into 16-bit port
FUN_005c384d | 12B | FW | SEH destructor thunk
FUN_005c3863 | 17B | FW | SEH epilog
FUN_005c3874 | 774B | FW | Port::LoadCvPc_Resource_16bit -- loads CvPc format from resource into 16-bit port
FUN_005c3b7a | 859B | FW | Port::LoadCvPc_File_16bit -- loads CvPc format from file into 16-bit port
FUN_005c3ed5 | 12B | FW | SEH destructor thunk
FUN_005c3eeb | 17B | FW | SEH epilog

---

## FW -- Framework: Image Loaders -- BMP/TGA/GIF/CvPc 24-bit (16 functions)

FUN_005c3efc | 432B | FW | Port::LoadBMP_Resource_24bit -- loads BMP from resource into 24-bit port
FUN_005c40b6 | 654B | FW | Port::LoadBMP_File_24bit -- loads BMP from file into 24-bit port
FUN_005c434e | 12B | FW | SEH destructor thunk
FUN_005c4364 | 17B | FW | SEH epilog
FUN_005c4375 | 704B | FW | Port::LoadTGA_Resource_24bit -- loads TGA from resource into 24-bit port
FUN_005c463f | 951B | FW | Port::LoadTGA_File_24bit -- loads TGA from file into 24-bit port
FUN_005c4a00 | 12B | FW | SEH destructor thunk
FUN_005c4a16 | 17B | FW | SEH epilog

---

## FW -- Framework: Port 24-bit Drawing/Copy Operations (11 functions)

FUN_005c4a27 | 293B | FW | Port::FillRect_24bit -- fills rect with RGB color on 24-bit surface
FUN_005c4b4c | 51B | FW | Port::FillAll_24bit -- fills entire port with RGB color (24-bit)
FUN_005c4b7f | 194B | FW | Port::CopyFromPort_24bit -- blits between 24-bit port surfaces
FUN_005c4c46 | 194B | FW | Port::CopyFromDIB_24bit -- blits from DIB to 24-bit port
FUN_005c4d0d | 198B | FW | Port::CopyToScreen_24bit -- copies 24-bit port to screen via stretch blit
FUN_005c4dd3 | 227B | FW | Port::DrawText_24bit -- draws text with shadow on 24-bit surface
FUN_005c4eb6 | 233B | FW | Port::DrawTextInRect_24bit -- draws text in rect on 24-bit surface
FUN_005c4f9f | 190B | FW | Port::DrawTextWithFont_24bit -- draws text with font on 24-bit surface
FUN_005c505d | 208B | FW | Port::DrawTextInRectWithFont_24bit -- draws text in rect with font (24-bit)
FUN_005c512d | 120B | FW | Port::MeasureText_24bit -- measures text with current font (24-bit)
FUN_005c51a5 | 87B | FW | Port::MeasureTextWithFont_24bit -- measures text with explicit font (24-bit)

---

## FW -- Framework: Port 24-bit Line/Rect Drawing (5 functions)

FUN_005c51fc | 225B | FW | Port::DrawLine_24bit -- draws line with RGB color on 24-bit surface
FUN_005c52dd | 230B | FW | Port::DrawRect_24bit -- draws rectangle outline with RGB (4 lines)
FUN_005c53c3 | 74B | FW | Port::SetPaletteData -- sets palette data on underlying surface

---

## FW -- Framework: Port Accessor/Utility Functions (14 functions)

FUN_005c5410 | 24B | FW | SwapBytes16 -- byte-swaps a 16-bit value (big/little endian)
FUN_005c5430 | 58B | FW | SwapBytes32 -- byte-swaps a 32-bit value
FUN_005c5470 | 38B | FW | File::MapMemory -- maps file content to memory (wrapper for FUN_005d89e8)
FUN_005c54a0 | 34B | FW | File::UnmapMemory -- unmaps file from memory (wrapper for FUN_005d8ab8)
FUN_005c54d0 | 19B | FW | Identity16 -- identity/no-op passthrough for 16-bit value
FUN_005c54f0 | 44B | FW | Port::IsLocked -- returns true if pixel buffer is locked (+0x34 != 0)
FUN_005c5520 | 28B | FW | Resource::Unload -- unloads a resource handle
FUN_005c5540 | 32B | FW | Resource::Find -- finds resource by type tag and ID
FUN_005c5560 | 28B | FW | Resource::Lock -- locks resource handle, returns data pointer
FUN_005c5580 | 28B | FW | Resource::Unlock -- unlocks resource handle
FUN_005c55d0 | 28B | FW | Port::GetStride -- returns row stride (+0xC)
GetCheckStyle | 28B | FW | MFC CCheckListBox::GetCheckStyle -- returns surface handle (+0x40)
FUN_005c5610 | 33B | FW | Port::NextRow -- advances pointer by stride (+0x10)
FUN_005c5640 | 28B | FW | Port::GetPixelData -- returns locked pixel data pointer (+0x34)
FUN_005c5660 | 28B | FW | Port::GetWidth -- returns width (+0x4)
FUN_005c5680 | 28B | FW | Port::GetHeight -- returns height (+0x8)
FUN_005c56a0 | 28B | FW | Port::GetBytesPerRow -- returns bytes per row (+0xC)
~_Timevec | 36B | FW | MFC _Timevec destructor -- frees timer vector
IsTracking@005C56F0 | 31B | FW | MFC CSplitterWnd::IsTracking -- returns tracking state (+0x408)
FUN_005c5710 | 33B | FW | Port::PrevRow -- backs pointer by stride (-0x10)
FUN_005c5740 | 27B | FW | DIB::GetBits -- returns surface bits pointer (*this)

---

## UI -- User Interface: Window/Region System (32 functions)

FUN_005c5760 | 81B | UI | Region::Create -- creates rendering region with 7 params
FUN_005c57b1 | 72B | UI | Region::CreateWithCallback -- create region + set callback
FUN_005c57f9 | 85B | UI | Region::Create8 -- creates region with 8 params
FUN_005c584e | 76B | UI | Region::Create8WithCallback -- create region (8 params) + callback
FUN_005c589a | 77B | UI | Region::CreateSmall -- creates small region with 6 params
FUN_005c58e7 | 68B | UI | Region::CreateSmallWithCallback -- small region + callback
FUN_005c592b | 81B | UI | Region::Create7 -- creates region with 7 params (different base)
FUN_005c597c | 72B | UI | Region::Create7WithCallback -- region (7 params) + callback
FUN_005c59c4 | 99B | UI | Window::AddChild -- appends child region to linked list at +0xB8
FUN_005c5a27 | 191B | UI | Window::RemoveChild -- removes child region by ID from linked list
FUN_005c5aeb | 75B | UI | Window::RemoveAllChildren -- iterates and removes all children
FUN_005c5b36 | 73B | UI | Window::InvalidateAllChildren -- invalidates all child HWNDs
FUN_005c5b7f | 174B | UI | Window::FindFocusChild -- finds first focusable child, calls animation callback
FUN_005c5c2d | 89B | UI | Window::GetFocusChild -- returns focused child or 0
FUN_005c5c86 | 460B | UI | Window::ActivateByKey -- activates child region matching keyboard shortcut char
FUN_005c5e60 | 27B | UI | Region::GetType -- returns region type (*this)
FUN_005c5e80 | 28B | UI | Region::GetNext -- returns next sibling (+0x20)
FUN_005c5ea0 | 28B | UI | Region::GetVisible -- returns visibility flag (+0x24)
FUN_005c5ec0 | 28B | UI | Region::GetEnabled -- returns enabled state (+0x34)
FUN_005c5ee0 | 28B | UI | Region::GetData -- returns data pointer (+0x48)
FUN_005c5f00 | 28B | UI | Region::GetItemCount -- returns item count (+0x38)
FUN_005c5f20 | 92B | UI | Region::CreateAndRegister -- creates region, registers with parent window
FUN_005c5f7c | 72B | UI | Region::CreateAndRegisterWithCallback -- region + register + callback
FUN_005c5fc4 | 96B | UI | Region::CreateAndRegister8 -- creates 8-param region, registers
FUN_005c6024 | 76B | UI | Region::CreateAndRegister8WithCallback -- 8-param region + register + callback
FUN_005c6070 | 88B | UI | Region::CreateAndRegisterSmall -- small region + register
FUN_005c60c8 | 68B | UI | Region::CreateAndRegisterSmallWithCallback -- small + register + callback
FUN_005c610c | 92B | UI | Region::CreateAndRegister7 -- 7-param region + register
FUN_005c6168 | 72B | UI | Region::CreateAndRegister7WithCallback -- 7-param + register + callback

---

## UI -- User Interface: Modal Dialog Loop (5 functions)

FUN_005c61b0 | 283B | UI | Window::RunModal -- modal dialog event loop; pushes to 16-level dialog stack, pumps messages until +0x8C cleared
InvalidateObjectCache | 35B | UI | CRichEditDoc::InvalidateObjectCache -- clears modal flag (+0x8C = 0)
FUN_005c62ee | 21B | UI | GetCurrentDialog -- returns global current dialog (DAT_00637ea4)
FUN_005c6303 | 38B | UI | SetCurrentDialog -- sets global current dialog, returns previous
FUN_005c63af | 65B | UI | Window::CallAction -- calls action callback at +0xA0 if non-null

---

## UI -- User Interface: Scroll Position (4 functions)

FUN_005c6329 | 67B | UI | Window::SetScrollX -- sets horizontal scroll position (+0x90) with bounds check
FUN_005c636c | 67B | UI | Window::SetScrollY -- sets vertical scroll position (+0x94) with bounds check
FUN_005c6400 | 51B | UI | Window::GetScrollRangeX -- gets horizontal scroll range
FUN_005c6440 | 51B | UI | Window::GetScrollRangeY -- gets vertical scroll range

---

## FW -- Framework: Color Palette Manager (25 functions)

FUN_005c6480 | 90B | FW | Palette::Update -- updates system palette (calls FUN_005decb1 + randomize seed)
FUN_005c64da | 145B | FW | Palette::Init -- initializes palette manager; creates GDI palette, zeroes RGB accumulators
FUN_005c656b | 142B | FW | Palette::Destroy -- destroys palette; frees 3 memory blocks (+0x428/42C/430)
FUN_005c65f9 | 192B | FW | Palette::LoadFromResource -- loads palette from CTAB resource by ID
FUN_005c66b9 | 158B | FW | Palette::LoadFromResourceRange -- loads palette from CTAB resource with start/count
FUN_005c6757 | 36B | FW | Palette::LoadFromFile -- loads palette from binary file
FUN_005c677b | 43B | FW | Palette::SaveToFile -- saves full palette (0-255) to file
FUN_005c67a6 | 292B | FW | Palette::SaveRangeToFile -- saves palette range [start, start+count) to file
FUN_005c68ca | 12B | FW | SEH destructor thunk
FUN_005c68e0 | 16B | FW | SEH epilog
FUN_005c68f0 | 300B | FW | Palette::LoadFromBinaryFile -- reads palette from binary file with header
FUN_005c6a1c | 12B | FW | SEH destructor thunk
FUN_005c6a32 | 16B | FW | SEH epilog
FUN_005c6a42 | 75B | FW | Palette::RandomizeSeed -- generates random non-zero seed in +0x408
FUN_005c6a8d | 60B | FW | Palette::UpdateHardware -- updates hardware palette (calls FUN_005de984)
FUN_005c6ac9 | 60B | FW | Palette::UpdateSoftware -- updates software palette (calls FUN_005de9e0)
FUN_005c6b05 | 54B | FW | Palette::Realize -- realizes palette to display (calls update_palette_EA62)
Realloc | 40B | FW | MFC CHtmlStream::Realloc / CMemFile::Realloc -- memory reallocation wrapper
FUN_005c6b63 | 48B | FW | Palette::ReadRGB -- reads RGB values from palette entries
FUN_005c6b93 | 66B | FW | Palette::SetEntry -- sets single palette entry with RGB
FUN_005c6bd5 | 467B | FW | Palette::RotateRange -- rotates palette entries in a range by offset (positive or negative)
FUN_005c6da8 | 142B | FW | Palette::SetRange -- sets multiple palette entries from RGB array
FUN_005c6e36 | 166B | FW | Palette::StartFade -- begins palette fade animation; saves original palette, sets target
FUN_005c6edc | 80B | FW | Palette::StartFadeToColor -- begins fade to solid color (R,G,B)
FUN_005c6f2c | 151B | FW | Palette::RestoreFade -- restores palette from saved fade state
FUN_005c6fc3 | 89B | FW | Palette::CopyFadeBuffer -- copies fade buffer to output
FUN_005c701c | 471B | FW | Palette::ApplyFadeStep -- applies one fade interpolation step (factor/scale)
FUN_005c71f3 | 261B | FW | Palette::StartCrossFade -- begins cross-fade between two palettes
FUN_005c72f8 | 150B | FW | Palette::RestoreCrossFade -- restores palette from cross-fade state
FUN_005c738e | 491B | FW | Palette::ApplyCrossFadeStep -- applies one cross-fade interpolation step
FUN_005c7579 | 363B | FW | Palette::MapToNearest -- maps palette colors to nearest match in color tree
FUN_005c76e4 | 12B | FW | SEH destructor thunk (color tree cleanup)
FUN_005c76fa | 16B | FW | SEH epilog
FUN_005c770a | 361B | FW | Palette::MapToNearestWithRange -- maps palette subset to nearest match
FUN_005c7873 | 12B | FW | SEH destructor thunk
FUN_005c7889 | 16B | FW | SEH epilog
FUN_005c7899 | 255B | FW | Palette::FindNearest -- finds nearest palette index for given RGB
FUN_005c7998 | 12B | FW | SEH destructor thunk
FUN_005c79ae | 17B | FW | SEH epilog
FUN_005c79bf | 113B | FW | ColorTree::Init -- initializes KD-tree structure for color matching
FUN_005c7a30 | 86B | FW | ColorTree::Destroy -- frees KD-tree memory
FUN_005c7a86 | 501B | FW | ColorTree::Build -- builds KD-tree from palette for nearest-color lookup
FUN_005c7c7b | 395B | FW | ColorTree::Insert -- inserts color node into KD-tree
FUN_005c7e06 | 754B | FW | ColorTree::Search -- searches KD-tree for nearest color match to (R,G,B)
FUN_005c80fd | 245B | FW | ColorTree::FindMedian -- finds palette entry closest to (128,128,128) midpoint

---

## FW -- Framework: Font Management (11 functions)

create_font_8200 | 380B | FW | Font::Create -- creates GDI font (Times/Arial/System/Courier, size, style flags)
FUN_005c8391 | 140B | FW | Font::GetGlyph -- gets glyph handle from font family at index
FUN_005c841d | 98B | FW | Font::Delete -- deletes GDI font object, frees memory
gdi_847F | 149B | FW | Font::GetHeight -- returns font height via GetTextMetricsA
gdi_8514 | 122B | FW | Font::GetLineHeight -- returns height + external leading
measure_text_858E | 142B | FW | Font::MeasureString -- measures pixel width of string via GetTextExtentPointA
FUN_005c861c | 160B | FW | Font::LoadFromFile -- loads font from .FON file via AddFontResourceA
create_font_86BC | 122B | FW | Font::EnumCallback -- EnumFontFamilies callback; creates matching fonts
gdi_8736 | 91B | FW | Font::EnumFamilies -- enumerates all font families on system
FUN_005c8791 | 163B | FW | Font::UnloadFile -- unloads font file, deletes all cached glyphs
render_text_8834 | 212B | FW | Font::RenderToRect -- renders text into rect, returns bounding rect
create_font_8908 | 124B | FW | Font::CreateFromLogFont -- creates font from LOGFONTA struct
FUN_005c8984 | 105B | FW | Font::Destroy -- destroys font handle, deletes GDI object
send_msg_89ED | 152B | FW | Font::InstallSystem -- installs font resource system-wide (AddFontResourceA + WM_FONTCHANGE)
send_msg_8A85 | 111B | FW | Font::UninstallSystem -- removes font resource (RemoveFontResourceA + WM_FONTCHANGE)

---

## UI -- User Interface: Custom Button Control (26 functions)

invalidate_8B00 | 45B | UI | Control::Invalidate -- invalidates entire window rect
manage_window_8B2D | 43B | UI | Control::Show -- shows window (ShowWindow SW_SHOW)
manage_window_8B58 | 43B | UI | Control::Hide -- hides window (ShowWindow SW_HIDE)
FUN_005c8b83 | 94B | UI | Control::Move -- moves window to (x,y), preserving size
create_window_8BE1 | 162B | UI | Control::CreateRegion -- creates MSControlClass child window for region control
FUN_005c8c83 | 44B | UI | Control::DisposeNullCheck -- error log if trying to dispose NULL
FUN_005c8caf | 647B | UI | Control::WndProc_Region -- window proc for region control; handles WM_MOUSEMOVE, WM_LBUTTONDOWN/UP, WM_LBUTTONDBLCLK with mouse tracking and callbacks
FUN_005c8f50 | 28B | UI | Control::GetBoundsPtr -- returns pointer to bounds rect (+0xC)
FUN_005c8f70 | 50B | UI | Control::OnMouseEnter -- calls enter callback at +0x2C
FUN_005c8fb0 | 50B | UI | Control::OnMouseLeave -- calls leave callback at +0x30
FUN_005c8ff0 | 50B | UI | Control::OnClick -- calls click callback at +0x34
FUN_005c9030 | 50B | UI | Control::OnMouseDown -- calls mousedown callback at +0x38
FUN_005c9070 | 50B | UI | Control::OnDoubleClick -- calls double-click callback at +0x3C
FUN_005c90b0 | 26B | UI | Control::SetFocus -- calls Win32 SetFocus
update_palette_90CA | 344B | UI | Control::PaintBackground -- paints control background using parent's offscreen bitmap (BitBlt)
FUN_005c9222 | 224B | UI | Control::ParseHotkey -- parses '~' hotkey marker from label string, stores index
send_msg_9307 | 319B | UI | Control::DefWndProc -- default window proc for MSControlClass; handles WM_PAINT, WM_DESTROY, keyboard forwarding
manage_window_944B | 78B | UI | Control::DestroyIfNeeded -- destroys window unless type 3
FUN_005c9499 | 202B | UI | Control::InitData -- allocates and initializes per-control data struct (0x30 bytes)
FUN_005c9563 | 45B | UI | Control::GetData -- retrieves per-control data via GetWindowLongA(hwnd, 0)
FUN_005c9595 | 311B | UI | Control::FreeData -- frees per-control data, deletes GDI objects, restores default wndproc
invalidate_96CC | 59B | UI | Control::ForceRepaint -- invalidates + UpdateWindow for immediate repaint
delbuf | 33B | FW | MFC ios::delbuf -- sets stream delete-buffer flag (+0x1C = param)

---

## UI -- User Interface: Button Control (draw_text_9740 + blit_ACD4) (6 functions)

draw_text_9740 | 5302B | UI | Button::Create -- creates 3-state button (normal/hover/disabled) with pre-rendered bitmaps; draws 3D borders, centered text with hotkey underline
FUN_005cabf6 | 44B | UI | Button::DisposeNullCheck -- error log for NULL button dispose
FUN_005cac22 | 178B | UI | Button::Activate -- activates button via keyboard; flashes pressed state, fires click callback
blit_ACD4 | 1600B | UI | Button::WndProc -- window proc for 3-state bitmap button; handles WM_PAINT (selects normal/hover/disabled bitmap), WM_LBUTTONDOWN/UP (press tracking), WM_KEYDOWN (Space key), focus drawing
FUN_005cbeb0 | 28B | UI | Cursor::Set -- sets cursor shape (wrapper for FUN_005d4204)

---

## UI -- User Interface: Bitmap Button Control (create_window_B319 + blit_B6EB) (9 functions)

create_window_B319 | 744B | UI | BitmapButton::Create -- creates bitmap button from port surfaces; renders normal and pressed states by blitting from source port with offset
create_window_B601 | 218B | UI | BitmapButton::CreateSimple -- creates simple bitmap button (no pre-render)
FUN_005cb6db | 16B | UI | BitmapButton::NoOp -- empty stub (no-op)
blit_B6EB | 1700B | UI | BitmapButton::WndProc -- window proc for bitmap button; handles WM_PAINT (BitBlt from port), WM_KEYDOWN (Space), mouse tracking; supports right-click (WM_RBUTTONDOWN/UP)
IsTracking@005CBDB0 | 31B | UI | MFC CSplitterWnd::IsTracking (duplicate) -- returns palette handle (+0x404)
FUN_005cbdd0 | 31B | UI | Window::GetKeyboardEnabled -- returns keyboard-enabled flag (+0xC4)
FUN_005cbdf0 | 50B | UI | BitmapButton::OnClick -- calls click callback at +0x30
FUN_005cbe30 | 50B | UI | BitmapButton::OnLeftClick -- calls left-click callback at +0x2C
FUN_005cbe70 | 50B | UI | BitmapButton::OnRightClick -- calls right-click callback at +0x30

---

## FW -- Framework: MFC/CRT Library Functions (4 functions)

FID_conflict:_$E31 | 26B | FW | CRT static initializer -- calls CFont ctor + registers atexit handler
FUN_005cbeea | 26B | FW | CRT static init helper -- calls thunk_FUN_0043c690 (CFont ctor)
FUN_005cbf04 | 29B | FW | CRT atexit registration -- registers FUN_005cbf21 via _atexit
FUN_005cbf21 | 26B | FW | CRT static destructor -- calls thunk_FUN_0043c520 (CFont dtor)

---

## UI -- User Interface: Checkbox Control (7 functions)

measure_text_BF40 | 245B | UI | Checkbox::MeasureLabel -- measures checkbox label text size with font
gdi_C035 | 187B | UI | Checkbox::MeasureNoText -- measures checkbox size without text
create_window_C0F0 | 344B | UI | Checkbox::Create -- creates checkbox with label; loads check/uncheck/disabled bitmaps from resources
FUN_005cc248 | 44B | UI | Checkbox::DisposeNullCheck -- error log for NULL checkbox dispose
invalidate_C274 | 172B | UI | Checkbox::Toggle -- toggles checkbox state on click; calls callback with new value
draw_text_C320 | 2746B | UI | Checkbox::WndProc -- window proc for checkbox control; handles WM_PAINT (draws check bitmap + label), WM_LBUTTONDOWN (toggle), WM_KEYDOWN (Space/Tab), focus drawing; supports enabled/disabled text colors
FUN_005ccddf | 47B | UI | Checkbox::SetEnabledColor -- sets enabled text color (R,G,B)
FUN_005cce0e | 47B | UI | Checkbox::SetDisabledColor -- sets disabled text color (R,G,B)
FUN_005cce40 | 54B | UI | Checkbox::OnToggle -- calls toggle callback at +0x2C with (param1, param2)

---

## UI -- User Interface: Scrollbar Control (14 functions)

FUN_005cce80 | 146B | UI | Scrollbar::SubclassWndProc -- subclassed wndproc for scrollbar; handles WM_DESTROY cleanup
register_wndclass_CF17 | 546B | UI | Scrollbar::Create -- creates custom scrollbar (MSScrollBarClass); subclasses SCROLLBAR, registers custom wndclass
FUN_005cd139 | 16B | UI | Scrollbar::NoOp -- empty stub
gdi_D149 | 815B | UI | Scrollbar::HandleMessage -- handles SB_LINEUP/DOWN/PAGEUP/DOWN/THUMBTRACK/THUMBPOSITION messages; updates scroll position, calls callback
FUN_005cd49f | 40B | UI | Scrollbar::Enable -- enables/disables scrollbar window
FUN_005cd4c7 | 54B | UI | Scrollbar::SetRange -- sets scrollbar range and initial position
FUN_005cd4fd | 56B | UI | Scrollbar::SetRangeEx -- sets scrollbar range with repaint option
FUN_005cd535 | 36B | UI | Scrollbar::GetRange -- gets scrollbar min/max range
FUN_005cd559 | 39B | UI | Scrollbar::SetPosition -- sets scrollbar thumb position
FUN_005cd580 | 67B | UI | Scrollbar::SetRangeOnWindow -- sets scroll range on main window scrollbar
FUN_005cd5c3 | 45B | UI | Scrollbar::GetRangeFromWindow -- gets scroll range from main window
FUN_005cd5f0 | 43B | UI | Scrollbar::SetPositionOnWindow -- sets scroll position on main window
FUN_005cd620 | 28B | UI | Scrollbar::GetCurrentPos -- returns current position (+0x3C)
FUN_005cd640 | 50B | UI | Scrollbar::OnScroll -- calls scroll callback at +0x2C
FUN_005cd680 | 50B | UI | Scrollbar::OnThumbTrack -- calls thumb-track callback at +0x30
FUN_005cd6c0 | 28B | UI | Scrollbar::GetPageSize -- returns page size (+0x34)

---

## FW -- Framework: Scaling/Coordinate Tables (4 functions)

FUN_005cd6e0 | 149B | FW | ScaleTable::Init -- initializes 16-entry scaling table cache; sets default 1:1 mapping
FUN_005cd775 | 657B | FW | ScaleTable::Build -- builds scaling lookup table for ratio (param_1:param_2) using Bresenham-like DDA; caches in 16 LRU slots
FUN_005cda06 | 36B | FW | ScaleTable::GetRatio -- returns current scale ratio (DAT_00637f98/9c)
FUN_005cda2a | 684B | FW | ScaleTable::BuildPair -- builds 2 scaling tables (horizontal + vertical) with independent ratios
FUN_005cdcdb | 337B | FW | ScaleTable::Compute -- computes one scaling lookup table (1024 entries) via DDA algorithm

---

## FW -- Framework: CString / Sprite Memory (5 functions)

CString | 33B | FW | MFC CString::CString -- default constructor (calls FUN_005d1b38)
FUN_005cde4d | 84B | FW | Sprite::FreeMemory -- frees sprite memory handle (+0x34) and unlocks (+0x38)
FUN_005cdea1 | 140B | FW | Sprite::CreateBlank -- creates blank sprite of given dimensions with solid fill
FUN_005cdf2d | 9B | FW | SEH cleanup (calls FUN_005bd915)
FUN_005cdf40 | 16B | FW | SEH epilog

---

## FW -- Framework: Sprite Resource Loading (20 functions)

FUN_005cdf50 | 98B | FW | Sprite::Reset -- resets sprite state; unlocks/frees memory, reinits string
FUN_005cdfb2 | 16B | FW | Sprite::DecodeRows -- no-op stub (overridden in subclass)
FUN_005cdfc2 | 428B | FW | Sprite::LoadFromResource -- loads SPRT resource; copies header fields, decodes RLE data, sets palette
FUN_005ce16e | 44B | FW | Sprite::SaveToResource -- saves sprite to resource (default palette range)
FUN_005ce19a | 526B | FW | Sprite::SaveToResourceWithRange -- saves sprite to resource with custom palette range
FUN_005ce3a8 | 36B | FW | Sprite::LoadFromFile_wrapper -- wrapper, calls FUN_005ce9ef
FUN_005ce3cc | 457B | FW | Sprite::SaveToFile -- saves sprite to binary file with palette
FUN_005ce595 | 12B | FW | SEH destructor thunk
FUN_005ce5ab | 16B | FW | SEH epilog
FUN_005ce5bb | 322B | FW | Sprite::SaveToFileNopalette -- saves sprite to binary file without palette
FUN_005ce6fd | 12B | FW | SEH destructor thunk
FUN_005ce713 | 16B | FW | SEH epilog
FUN_005ce723 | 44B | FW | Sprite::LoadFromFileWithPalette -- loads sprite from file with palette (default range)
FUN_005ce74f | 634B | FW | Sprite::LoadFromFileWithPaletteRange -- loads sprite from file with custom palette range
FUN_005ce9c9 | 12B | FW | SEH destructor thunk
FUN_005ce9df | 16B | FW | SEH epilog
FUN_005ce9ef | 415B | FW | Sprite::LoadFromFile -- loads sprite from binary file (no palette)
FUN_005ceb8e | 12B | FW | SEH destructor thunk
FUN_005ceba4 | 16B | FW | SEH epilog

---

## FW -- Framework: Sprite Extraction from Port (20 functions)

FUN_005cebb4 | 56B | FW | Sprite::ExtractFromPort -- extracts sprite from port rect (auto-detect transparent color)
FUN_005cebec | 88B | FW | Sprite::ExtractFromPortXYWH -- extracts sprite from port at (x,y,w,h)
FUN_005cec44 | 60B | FW | Sprite::ExtractFromPortWithKey -- extracts with explicit chroma key
FUN_005cec80 | 301B | FW | Sprite::ExtractFromPortFloodBounds -- extracts sprite by flood-filling to find non-key bounds
FUN_005cedad | 92B | FW | Sprite::ExtractFromPortWithKeyXYWH -- extracts with key at (x,y,w,h)
FUN_005cee09 | 56B | FW | Sprite::ExtractFromDIB -- extracts sprite from DIB (auto-detect key)
FUN_005cee41 | 88B | FW | Sprite::ExtractFromDIBXYWH -- extracts from DIB at (x,y,w,h)
FUN_005cee99 | 60B | FW | Sprite::ExtractFromDIBWithKey -- extracts from DIB with explicit key
FUN_005ceed5 | 92B | FW | Sprite::ExtractFromDIBWithKeyXYWH -- extracts from DIB with key at (x,y,w,h)

---

## FW -- Framework: Sprite Rendering Dispatchers (16 functions)

FUN_005cef31 | 53B | FW | Sprite::Draw -- draws sprite (auto-key, params 1-4)
FUN_005cef66 | 57B | FW | Sprite::DrawWithKey -- draws sprite with explicit key
FUN_005cef9f | 53B | FW | Sprite::DrawScaled -- draws sprite scaled (auto-key)
FUN_005cefd4 | 57B | FW | Sprite::DrawScaledWithKey -- draws sprite scaled with explicit key
FUN_005cf00d | 53B | FW | Sprite::DrawFlipped -- draws sprite flipped (auto-key)
FUN_005cf042 | 57B | FW | Sprite::DrawFlippedWithKey -- draws sprite flipped with explicit key
FUN_005cf07b | 53B | FW | Sprite::DrawRotated -- draws sprite rotated (auto-key)
FUN_005cf0b0 | 57B | FW | Sprite::DrawRotatedWithKey -- draws sprite rotated with explicit key
FUN_005cf0e9 | 61B | FW | Sprite::DrawRemapped -- draws sprite with palette remap + explicit key
FUN_005cf126 | 57B | FW | Sprite::DrawRemappedAutoKey -- draws sprite with palette remap (auto-key)
FUN_005cf15f | 61B | FW | Sprite::DrawMasked -- draws sprite with mask + explicit key
FUN_005cf19c | 57B | FW | Sprite::DrawMaskedAutoKey -- draws sprite with mask (auto-key)
FUN_005cf1d5 | 53B | FW | Sprite::DrawSolid -- draws sprite as solid color block (key=-2)
FUN_005cf20a | 53B | FW | Sprite::DrawSolidScaled -- draws sprite as solid block, scaled (key=-2)

---

## FW -- Framework: Sprite Blit Operations (8 functions)

FUN_005cf23f | 46B | FW | Sprite::BlitToPort -- blits sprite to port at (0,0) without offset
FUN_005cf26d | 50B | FW | Sprite::BlitToPortOffset -- blits sprite to port at (x,y) offset
FUN_005cf29f | 46B | FW | Sprite::BlitToPortFlipped -- blits sprite to port flipped
FUN_005cf2cd | 50B | FW | Sprite::BlitToPortFlippedOffset -- blits sprite to port flipped at (x,y)
FUN_005cf2ff | 56B | FW | Sprite::EnsureLocked -- ensures sprite data handle is locked (lazy lock)
FUN_005cf337 | 56B | FW | Sprite::EnsureUnlocked -- ensures sprite data handle is unlocked
FUN_005cf36f | 44B | FW | Sprite::IsLocked -- returns true if sprite data is locked (+0x38 != 0)
FUN_005cf39b | 42B | FW | Sprite::SetHotspot -- sets sprite hotspot offset (+0x20, +0x24)
FUN_005cf3c5 | 46B | FW | Sprite::GetHotspot -- gets sprite hotspot offset
FUN_005cf3f3 | 70B | FW | Sprite::SetScale -- sets sprite scale factors (+0x28, +0x2C), min 1
FUN_005cf439 | 46B | FW | Sprite::GetScale -- gets sprite scale factors

---

## FW -- Framework: Sprite Pixel Manipulation (2 functions)

FUN_005cf467 | 218B | FW | Sprite::ChangeColor -- remaps one color index to another in all sprite RLE data
FUN_005cf541 | 267B | FW | Sprite::RemapColors -- remaps all sprite pixels through a lookup table

---

## FW -- Framework: Sprite Extraction Core (2 functions)

FUN_005cf64c | 1951B | FW | Sprite::Extract_8bit -- core sprite extraction from 8-bit port surface; scans for non-transparent pixels, builds RLE-compressed scanline data with offset/length pairs
FUN_005cfdeb | 1921B | FW | Sprite::Extract_DIB -- core sprite extraction from DIB surface; same algorithm as Extract_8bit but reads from DirectDraw/DIB surface

---

## Summary

| Category | Count |
|----------|-------|
| FW (Framework) | 240 |
| UI (User Interface) | 99 |
| GL (Game Logic) | 0 |
| AI (Artificial Intelligence) | 0 |
| **Total** | **339** |

**Discrepancies with JS engine: 0**

This entire block is the SMEDS32 (Sid Meier's Engine for DirectDraw/Sprites) graphics framework layer. It implements:
- Port (offscreen bitmap) abstraction with 8/16/24-bit surfaces
- Image format loaders (TGA, BMP, GIF, CvPc/proprietary)
- Sprite extraction, RLE compression, and rendering pipeline
- Color palette management with fade/cross-fade animation
- KD-tree nearest-color matching for palette mapping
- Font management via Win32 GDI
- Custom Win32 UI controls (buttons, checkboxes, scrollbars, region controls)
- Scaling coordinate tables (Bresenham DDA)
- Modal dialog event loop

No game logic whatsoever resides in this block. All functions are either platform-specific rendering infrastructure (FW) or Win32 UI widget implementations (UI), neither of which has any correspondence to the JS engine files.
