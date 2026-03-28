# Civ Tutorial Dialog

Appears only at **Chieftain** difficulty, after clicking OK on "In the Beginning" dialog.
Small popup at the top of the screen with tutorial text and a dismiss button.

Captured during Chieftain game, Turn 1 (2026-03-28).

---

## Window Hierarchy

```
HWND 0x001F0852 | visible | "Civ Tutorial"
  class:   MSWindowClass
  window:  634×184 @ (646, 5)
  client:  628×178 (border: 6w 6h)
  style:   WS_POPUP | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_CAPTION | WS_DLGFRAME
  exstyle: WS_EX_WINDOWEDGE
  owner:   0x001809F8 (main game window, disabled while dialog is open)

  HWND 0x00840B78 | visible | (button)
    class:   MSControlClass
    window:  616×36 @ (655, 147)
    client:  614×34 (border: 2w 2h)
    style:   WS_CHILD | WS_VISIBLE | WS_CAPTION | WS_BORDER | WS_MAXIMIZEBOX
```

---

## Layout

- **Title bar:** "Civ Tutorial"
- **Body:** Tutorial text (rendered by GDI, not a child control)
- **Button:** Single dismiss button, 616×36, near bottom of dialog
- **Position:** Top of screen (y=5), right of center (x=646)

---

## Screenshot

`screenshots/20260328_110225/top_0x001F0852_Civ_Tutorial.bmp`

---

## Notes

- Only appears at Chieftain difficulty
- Main game window is **disabled** while this dialog is open (modal behavior)
- The hidden dialog behind it (`0x001C05AE`, 646×405) contains a reusable
  MSEditBoxClass (620×314, Times New Roman h=-21) with scrollbar — this is
  likely the shared text-display dialog template used for Civilopedia entries
  and other scrollable text popups
