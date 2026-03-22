# Block 0x0061 Audit (0x00610000–0x0061FFFF)

**Total functions: 2**
**Classification: FW=2, UI=0, GL=0, NET=0, LIB=0**

Legend: FW=Framework/MFC, UI=User Interface/Dialog, GL=Game Logic, NET=Network, LIB=Library/CRT stub

## Function Classifications

| # | Address | Name | Size | Class | Description |
|---|---------|------|------|-------|-------------|
| 1 | 0x0061A000 | FUN_0061a000 | 326 | FW | 16-bit segment-addressed pixel copy — reads tile from source bitmap via segment:offset math, compares against filter value, writes to destination. Uses nested row/column loops. Legacy 16-bit rendering helper (real-mode segmented memory). |
| 2 | 0x0061A759 | FUN_0061a759 | 423 | FW | 16-bit segment-addressed sprite blitter — RLE-compressed sprite decoder with transparency key. Reads sprite header (offset, width), skips transparent runs, copies opaque pixels while checking against chroma key. Legacy 16-bit rendering helper (real-mode segmented memory). |

## Summary

Both functions in this block are 16-bit legacy rendering helpers that use segmented memory addressing (segment:offset via `in_SS`, `unaff_FS_OFFSET`). They perform low-level bitmap/sprite operations: FUN_0061a000 does a filtered pixel copy between bitmaps, and FUN_0061a759 decodes RLE-compressed sprites with transparency. These are framework-level graphics primitives with no game logic.

**GL functions: 0** — No game logic discrepancies to report.
