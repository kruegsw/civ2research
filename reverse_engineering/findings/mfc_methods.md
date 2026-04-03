# MFC Method Analysis — 26 C++ Class Methods in Decompiled C

Each method operates on a Windows UI object through a `this` pointer (`in_ECX`).
These objects (CPropertySheet, CRichEditDoc, etc.) are created by Win32 APIs
that don't exist in JS. The objects themselves don't exist in flat memory.

Source: decompiled C source (Ghidra Library Function annotations)

## Category A: Void methods, no game state (safe no-op)

| Method | Calls | What it does | Impact |
|--------|-------|-------------|--------|
| `CPropertySheet::EnableStackedTabs` | 199 | `*(int*)(this + 0x6c) = param_1` — sets UI tab style | None |
| `CRichEditDoc::InvalidateObjectCache` | 107 | `*(int*)(this + 0xf) |= 0x400` — marks doc dirty | None |
| `CDialog::SetHelpID` | 16 | `*(int*)(this + 0x6c) = param_1` — sets help topic | None |
| `COleControlSite::SetDlgCtrlID` | 17 | `*(int*)(this + 8) = param_1` — sets control ID | None |
| `CArchive::SetObjectSchema` | 3 | `*(int*)(this + 0x14) = param_1` — serialization schema | None |
| `CHtmlStream::Reset` | 3 | Resets stream position to 0 | None |
| `CMiniDockFrameWnd::OnClose` | 3 | Window close handler | None |
| `CTestCmdUI::Enable` | 2 | `*(int*)(this + 4) = param_1` — enable/disable UI item | None |
| `CReObject::CReObject` | 2 | Constructor — zeroes object memory | None |
| `CDataBoundProperty::_scalar_deleting_destructor_` | 5 | Destructor — frees memory | None |
| `ios_base::precision` | 3 | Sets stream floating point precision | None |
| `ios::delbuf` | 12 | Sets stream buffer deletion flag | None |
| `ios::tie` | 3 | Ties output stream to input stream | None |

**Fix: Replace `true /* DEVIATION: MFC */` with `0` or nothing. No game state affected.**

## Category B: Methods that return values used in game logic

| Method | Calls | Return uses | What it returns | Correct stub |
|--------|-------|-------------|-----------------|-------------|
| `CSplitterWnd::IsTracking` | 184 | 158 | `*(int*)(this + 0x34)` — pane resize state | `return 0` (not tracking) |
| `CCheckListBox::GetCheckStyle` | 48 | 44 | `*(uint*)(this + 0x160)` — checkbox state bitmask | `return 0` (unchecked) |
| `COleClientItem::GetActiveView` | 46 | 42 | `*(CView**)(this + 0xa0)` — active window pointer | `return 0` (null) |
| `CRichEditCntrItem::GetActiveView` | 74 | 70 | Same as COleClientItem (calls parent) | `return 0` (null) |
| `ios::width` | 13 | 11 | `*(int*)(this + 0xc)` — stream format width | `return 0` |
| `streambuf::egptr` | 13 | 9 | `*(char**)(this + 0x14)` — buffer end pointer | `return 0` (null) |
| `CSocket::Create` | 31 | 9 | Success/failure of socket creation | `return 0` (failure) |
| `ios::lockptr` | 4 | 2 | `*(void**)(this + 0x40)` — thread lock | `return 0` (null) |
| `CString::CString` | 105 | 1 | Constructor — allocates string buffer | `return 0` |
| `ios_base::width` | 3 | 0 | `*(int*)(this + 0xc)` — stream width | `return 0` |

**Fix: Stub functions that return the "null/zero/false" default.**

### Critical: CSplitterWnd::IsTracking

158 uses of return value. Pattern:
```c
iVar6 = CSplitterWnd::IsTracking(&DAT_006a91b8);
DAT_0062ee00 = (uint)(iVar6 == param_1);
```

`DAT_0062ee00` controls whether the city window refreshes during turn processing.
When `IsTracking` returns 0 (not tracking), `iVar6 == param_1` is false → `DAT_0062ee00 = 0`.
This means city window updates are SKIPPED — which is correct for headless.

**Returning 0 is the correct headless behavior.**

## Category C: Memory management (needs allocation stubs)

| Method | Calls | What it does |
|--------|-------|-------------|
| `CHtmlStream::Realloc` | 5 | `realloc(param_1, param_2)` — resize buffer |
| `CMemFile::Realloc` | 5 | `realloc(param_1, param_2)` — resize buffer |
| `pDNameNode::length` | 2 | Returns string length |
| `streambuf::egptr` | 13 | Returns end-of-buffer pointer |

**Fix: Return 0/null. These only matter for file I/O serialization.**

## Summary

- 13 void no-ops: safe to replace with nothing
- 10 return-value stubs: return 0/null (documented correct defaults)
- 3 memory management: return 0/null
- Total: 26 methods, all with known correct stub behavior
