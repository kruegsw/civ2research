# Dialog Rendering — Source Code Cross-Reference

Cross-reference between observed visual design (`dialog_visual_design.md`) and
decompiled C source in `reverse_engineering/decompiled/`.

---

## Key Functions

| Function | Address | File | Role |
|----------|---------|------|------|
| `draw_text_9740` | 0x005C9740 | block_005C0000.c | Primary button/control renderer (5302 bytes) |
| `FUN_005ccf5d` | 0x005CCD5D | block_005C0000.c | Alternate button state rendering |
| `draw_text_9B86` | 0x005D9B86 | block_005D0000.c | Radio button / label renderer |
| `FUN_005ed710` | 0x005ED710 | block_005E0000.c | Sprite/icon rendering with chroma key transparency |
| `FUN_005e0d58` | 0x005E0D58 | block_005E0000.c | FillRect utility wrapper |
| `FUN_005e0ae8` | 0x005E0AE8 | block_005E0000.c | Extensive text rendering |
| `invalidate_96CC` | 0x005C96CC | block_005C0000.c | Force repaint (GetClientRect + InvalidateRect + UpdateWindow) |

---

## 3D Bevel / Button Borders

**Source:** `draw_text_9740` @ `block_005C0000.c` lines 6878–6914

```c
h_01 = CreatePen(0, 1, 0xffffff);  // white pen → top/left highlight
h_02 = CreatePen(0, 1, 0x808080);  // gray pen  → bottom/right shadow

// White highlight pass (top + left edges):
MoveToEx(local_164, local_150.left,  local_150.bottom, (LPPOINT)0x0);
LineTo  (local_164, local_150.left,  local_150.top);
LineTo  (local_164, local_150.right, local_150.top);

// Gray shadow pass (bottom + right edges):
SelectObject(local_164, h_02);
MoveToEx(local_164, local_150.left+1,  local_150.bottom-1, (LPPOINT)0x0);
LineTo  (local_164, local_150.right-1, local_150.bottom-1);
LineTo  (local_164, local_150.right-1, local_150.top);
```

**Maps to:** The raised 3D bevel on all buttons (Custom, OK, Cancel, Random) and
the dialog outer frame. White top-left + gray bottom-right = classic Win95 raised look.

---

## Text Colors

**Source:** `draw_text_9740` @ `block_005C0000.c` and `draw_text_9B86` @ `block_005D0000.c`

```c
SetTextColor(local_164, 0xffffff);  // white  — selected/highlighted state
SetTextColor(local_164, 0x808080);  // gray   — disabled text
SetTextColor(local_d0,  0x404040);  // dark gray — normal label text
SetTextColor(...,       0x000000);  // black  — button labels
```

**Maps to:**
- Radio button labels (~rgb(64,64,64) dark grey, not pure black) → `0x404040`
- Button text (black) → `0x000000`
- Disabled options (grey) → `0x808080`
- Selected/focused (white) → `0xffffff`

---

## Text Rendering (DrawTextA)

**Source:** `draw_text_9740` @ lines 6923, 6934, 6954, 6966, etc. (15+ calls)

All text is drawn via `DrawTextA` — NOT `TextOutA` or `ExtTextOutA`.
Multiple passes per string: typically a shadow/outline pass then the main pass,
consistent with the shadow text technique documented in `GDI_Rendering_Pipeline.md`.

Keyboard shortcut underline drawing (for button labels with `&` prefix):
```c
// draw_text_9B86 @ block_005D0000.c lines 6705-6708
MoveToEx(local_d0, local_c0, local_138.bottom - 3, (LPPOINT)0x0);
LineTo  (local_d0, local_cc, local_138.bottom - 3);
```

---

## FillRect Calls (Background Fills)

**Source:** Multiple functions

```c
// draw_text_9740 @ block_005C0000.c line 6891
FillRect(local_164, &local_150, (HBRUSH)local_18);

// FUN_005e0d58 @ block_005E0000.c line 3322-3324
hbr = CreateSolidBrush(CONCAT12(param_5, CONCAT11(param_4, param_3)));
FillRect(*(HDC *)(param_1 + 4), param_2, hbr);
```

**Maps to:** Dialog body fill and button strip fill — different brushes for each area.

---

## Sprite / Icon Rendering with Chroma Key

**Source:** `FUN_005ed710` @ `block_005E0000.c` (full function):

```c
void FUN_005ed710(HDC param_1, HGDIOBJ param_2, int x, int y, int w, int h,
                  int src_x, int src_y)
{
    hdc    = CreateCompatibleDC(param_1);
    SelectObject(hdc, param_2);          // source bitmap
    hdc_00 = CreateCompatibleDC(param_1);
    hdc_01 = CreateCompatibleDC(param_1);
    h_00   = CreateCompatibleBitmap(param_1, w, h);
    SelectObject(hdc_01, h_00);
    h_02   = CreateBitmap(w, h, 1, 1, (void *)0x0);  // 1bpp mask
    SelectObject(hdc_00, h_02);

    SetBkColor  (hdc_01, 0xffffff);  // white bg for mask
    SetTextColor(hdc_01, 0);         // black fg
    SetBkColor  (hdc,    0x808000);  // OLIVE = chroma key / transparency color

    // 6-step masked blit (AND/XOR compositing):
    BitBlt(hdc_00, 0,0,w,h, hdc,    src_x,src_y, 0xcc0020);  // copy source → mask
    BitBlt(hdc_01, 0,0,w,h, param_1, x,y,        0xcc0020);  // copy dest bg
    BitBlt(hdc_01, 0,0,w,h, hdc,    src_x,src_y, 0x660046);  // AND
    BitBlt(hdc_01, 0,0,w,h, hdc_00, 0,0,         0x8800c6);  // XOR mask
    BitBlt(hdc_01, 0,0,w,h, hdc,    src_x,src_y, 0x660046);  // AND source
    BitBlt(param_1, x,y,    w,h,    hdc_01, 0,0, 0xcc0020);  // write result
}
```

**Maps to:**
- City style icons in "Select Your City Style" dialog (small isometric city sprites)
- Leader portrait icon in right-panel Status area
- Unit sprites in right-panel Moving Units area
- All use `0x808000` (olive) as the transparent color — confirms chroma key documented in
  `findings/assets/sprite_sheets.md`

**Called from:**
- `block_005C0000.c` lines 6871, 8274 (button/control icon rendering)
- `block_005D0000.c` line 6607 (radio button icon rendering)

---

## WM_PAINT Handler Pattern

All three renderer functions follow identical structure:

```c
// param_2 is the Windows message
if (param_2 == 0xf) {  // WM_PAINT
    BeginPaint(hwnd, &ps);
    // ... all drawing code ...
    EndPaint(hwnd, &ps);
}
```

Three separate WndProcs handle painting:
1. `draw_text_9740` — buttons (handles `param_2 < 0x10` check at line 8230)
2. `FUN_005ccf5d` — alternate button states
3. `draw_text_9B86` — radio buttons and labels (check at line 6569)

Force-repaint utility:
```c
// invalidate_96CC @ 0x005C96CC
void invalidate_96CC(HWND hwnd) {
    tagRECT rc;
    GetClientRect(hwnd, &rc);
    InvalidateRect(hwnd, &rc, 1);  // erase background
    UpdateWindow(hwnd);
}
```

---

## Stock GDI Objects Used

```c
GetStockObject(1)  // WHITE_BRUSH  — inner button face fill
GetStockObject(3)  // BLACK_PEN    — focus indicator, underlines
```

---

## Color Constants Summary

| Hex value | RGB | Usage |
|-----------|-----|-------|
| 0xffffff | 255,255,255 | White — highlight bevel edge, selected text |
| 0x808080 | 128,128,128 | Mid gray — shadow bevel edge, disabled text |
| 0x404040 | 64,64,64 | Dark gray — normal radio label text |
| 0x000000 | 0,0,0 | Black — button label text, pen |
| 0x808000 | 128,128,0 | Olive — chroma key for sprite transparency |

---

## Open Questions — TODO

### Stippled dialog body texture
**TODO: Search decompiled source for this.**
The fine noise/crosshatch background texture on the radio button area is NOT yet
located in source. Candidates:
- `CreateHatchBrush(HS_DIAGCROSS, rgb)` — Windows hatched brush
- `CreatePatternBrush(hbm)` — custom 8×8 pattern bitmap
- `PatBlt` with a patterned brush
Search for `CreateHatchBrush`, `CreatePatternBrush`, and `PatBlt` in
`block_005C0000.c` / `block_005D0000.c`.

### Orange/amber artwork banner frame
**TODO: Search decompiled source for this.**
The distinctive orange border around the photo banners during new game setup is not
yet located in source. Likely in setup screen rendering code separate from dialog
rendering, possibly in `block_004x0000.c` or `block_005x0000.c`.
Search for orange BGR color values (warm orange ~0x0060C8 or similar) and any
FrameRect/Rectangle calls near 606×279 dimensions.
