# Block 0x005F Audit (0x005F0000–0x005FFFFF)

**Total functions: 346**
**Classification: FW=81, UI=0, GL=0, NET=0, LIB=265**

Legend: FW=Framework/MFC, UI=User Interface/Dialog, GL=Game Logic, NET=Network, LIB=Library/CRT stub

## Summary

This is the largest block by line count (13,962 lines) but contains **zero game logic**. The block is split into two distinct regions:

1. **MFC/DirectDraw UI control framework** (functions 1–81, addresses 0x005F0056–0x005F1A40): A custom DDControl (DirectDraw Control) class implementation from the "Smeds32" library (`D:\Ss\Smeds32\ddcntrl.cpp`). This provides a reusable UI control framework for embedding interactive DirectDraw surfaces inside MFC windows. Features include:
   - Linked list management for child controls (add, remove, iterate, find)
   - Mouse event dispatching (WM_LBUTTONDOWN, WM_RBUTTONDOWN, WM_MOUSEMOVE, WM_LBUTTONDBLCLK, etc.)
   - Keyboard event handling (WM_KEYDOWN, WM_CHAR)
   - Hit testing with bounding rectangles
   - Focus/hover tracking with enter/leave notifications
   - Parent window traversal (GetParentGameWin)
   - DirectDraw surface refresh/invalidation (SetRect, bitmap painting)
   - Virtual function table dispatch for control callbacks
   - Uses MFC classes: CDataBoundProperty, CSplitterWnd, CTestCmdUI, ios

2. **C Runtime Library** (functions 82–346, addresses 0x005F1B50–0x005FFFE0): Visual Studio 1998 Debug CRT. Includes:
   - Exception handling (SEH, C++ EH frame handlers, catch/unwind)
   - Memory management (malloc, free, realloc, debug heap, small-block heap)
   - String operations (strlen, strcmp, strcpy, sprintf, atoi, etc.)
   - File I/O (fopen, fclose, fread, fwrite, fseek, ftell, printf)
   - Character classification (isalpha, isdigit, isspace, etc.)
   - Multibyte string support (ismbb*, mbctoupper, mbschr)
   - Locale/codepage (LCMapString wrappers, setmbcp, CPtoLCID)
   - FP formatting (cftoe, cftof, cfltcvt)
   - Process startup (entry, _cinit, _exit, setargv, setenvp)
   - Debug CRT (CrtCheckMemory, CrtDbgReport, CrtDumpMemoryLeaks)

**GL functions: 0** — No game logic discrepancies to report.

## Function Classifications

### Section 1: MFC/DirectDraw Control Framework (0x005F0056–0x005F1B50)

| # | Address | Name | Size | Class | Description |
|---|---------|------|------|-------|-------------|
| 1 | 0x005F0056 | FUN_005f0056 | 98 | FW | DDControl surface invalidation — calls FUN_005ef65a on surface, conditionally refreshes via FUN_005e8e06 |
| 2 | 0x005F00B8 | FUN_005f00b8 | 177 | FW | DDControl surface resize+refresh — SetRect, invalidate surface, conditionally refresh, then iterate children via FUN_005f02f3 |
| 3 | 0x005F0169 | FUN_005f0169 | 68 | FW | DDControl delegate paint — forwards to surface at offset+0xB0, then calls FUN_005f00b8 |
| 4 | 0x005F01AD | FUN_005f01ad | 102 | FW | DDControl set data source — stores param at offset+0xAC, conditionally refreshes surface |
| 5 | 0x005F0213 | FUN_005f0213 | 83 | FW | DDControl blit helper — SetRect(0,0,w,h), calls surface blit functions |
| 6 | 0x005F0266 | FUN_005f0266 | 56 | FW | DDControl add child to front — calls FUN_005f05b0 (reset head) + FUN_005f05f0 (insert) |
| 7 | 0x005F029E | FUN_005f029e | 85 | FW | DDControl clear all children — iterate list calling FUN_005f0c69 (remove) |
| 8 | 0x005F02F3 | FUN_005f02f3 | 79 | FW | DDControl iterate children (paint) — calls FUN_005f15f2 on each child |
| 9 | 0x005F0342 | FUN_005f0342 | 79 | FW | DDControl iterate children (hide) — calls FUN_005f1683 on each child |
| 10 | 0x005F0391 | FUN_005f0391 | 291 | FW | DDControl dispatch mouse event — checks hover tracking, dispatches WM_MOUSEMOVE to children, tracks active control |
| 11 | 0x005F04C0 | FUN_005f04c0 | 62 | FW | DDControl destructor wrapper — SEH frame, calls FUN_005f04fe + FUN_005f0511 |
| 12 | 0x005F04FE | FUN_005f04fe | 9 | FW | DDControl destructor inner — thunk to FUN_005f0724 (clear all) |
| 13 | 0x005F0511 | FUN_005f0511 | 14 | FW | SEH epilogue — restores FS:[0] exception handler chain |
| 14 | 0x005F0520 | FUN_005f0520 | 83 | FW | Linked list constructor — SEH frame, calls FUN_005f06ee (init 3-field struct to zeros) |
| 15 | 0x005F0590 | FUN_005f0590 | 30 | FW | Linked list get first — thunk to FUN_005f0770 |
| 16 | 0x005F05B0 | FUN_005f05b0 | 30 | FW | Linked list reset to tail — thunk to FUN_005f07b3 |
| 17 | 0x005F05D0 | FUN_005f05d0 | 30 | FW | Linked list get next — thunk to FUN_005f0833 |
| 18 | 0x005F05F0 | FUN_005f05f0 | 36 | FW | Linked list insert — thunk to FUN_005f08fb |
| 19 | 0x005F0620 | lockptr | 28 | FW | ios::lockptr — returns pointer to CRT critical section (MFC library, VS1998) |
| 20 | 0x005F0640 | FUN_005f0640 | 54 | FW | Linked list node constructor — zeroes 3-field struct (data, next, prev) |
| 21 | 0x005F0676 | ~CDataBoundProperty | 22 | FW | CDataBoundProperty destructor — empty body (MFC library, VS1998) |
| 22 | 0x005F068C | FUN_005f068c | 33 | FW | Linked list node set-next — stores param at offset+4 |
| 23 | 0x005F06AD | FUN_005f06ad | 33 | FW | Linked list node set-prev — stores param at offset+8 |
| 24 | 0x005F06CE | FUN_005f06ce | 32 | FW | Linked list node set-data — stores param at offset+0 |
| 25 | 0x005F06EE | FUN_005f06ee | 54 | FW | Linked list node init — zeroes all 3 fields |
| 26 | 0x005F0724 | FUN_005f0724 | 30 | FW | Linked list clear — thunk to FUN_005f0e13 (destroy all nodes) |
| 27 | 0x005F0742 | FUN_005f0742 | 46 | FW | Linked list is-empty — returns (*this == 0) |
| 28 | 0x005F0770 | FUN_005f0770 | 62 | FW | Linked list get-first — sets cursor to head, returns data via FUN_005f0e50 |
| 29 | 0x005F07B3 | FUN_005f07b3 | 65 | FW | Linked list get-last — sets cursor to tail, returns data |
| 30 | 0x005F07F9 | length | 53 | FW | pDNameNode::length — virtual method, returns cursor data or 0 (MFC library, VS1998) |
| 31 | 0x005F0833 | FUN_005f0833 | 90 | FW | Linked list advance-next — moves cursor to next node via FUN_005f0e70 |
| 32 | 0x005F0897 | FUN_005f0897 | 90 | FW | Linked list advance-prev — moves cursor to prev node via FUN_005f0e90 |
| 33 | 0x005F08FB | FUN_005f08fb | 242 | FW | Linked list insert-after-cursor — allocates new node, links into list |
| 34 | 0x005F0A04 | FUN_005f0a04 | 422 | FW | Linked list insert-before-cursor — allocates new node, handles head/tail/middle cases |
| 35 | 0x005F0BCE | FUN_005f0bce | 83 | FW | Linked list find — searches for matching data pointer |
| 36 | 0x005F0C21 | FUN_005f0c21 | 72 | FW | Linked list count — iterates all nodes, returns count |
| 37 | 0x005F0C69 | FUN_005f0c69 | 426 | FW | Linked list remove-at-cursor — unlinks node, calls scalar_deleting_destructor, fixes head/tail |
| 38 | 0x005F0E13 | FUN_005f0e13 | 56 | FW | Linked list destroy-all — iterates removing each node |
| 39 | 0x005F0E50 | FUN_005f0e50 | 27 | FW | Linked list node get-data — returns offset+0 |
| 40 | 0x005F0E70 | FUN_005f0e70 | 28 | FW | Linked list node get-next — returns offset+4 |
| 41 | 0x005F0E90 | FUN_005f0e90 | 28 | FW | Linked list node get-prev — returns offset+8 |
| 42 | 0x005F0EB0 | `scalar_deleting_destructor' | 57 | FW | CDataBoundProperty scalar deleting destructor — calls ~CDataBoundProperty, optionally frees memory (MFC library, VS1998) |
| 43 | 0x005F0EF0 | FUN_005f0ef0 | 21 | FW | DDControl get global — returns DAT_00639dc8 (active control pointer) |
| 44 | 0x005F0F05 | FUN_005f0f05 | 24 | FW | DDControl set global — sets DAT_00639dc8 (active control pointer) |
| 45 | 0x005F0F1D | FUN_005f0f1d | 182 | FW | DDControl constructor (default) — SEH frame, inits vtable ptr (PTR_FUN_0061d720), zeros 10+ fields |
| 46 | 0x005F0FE9 | FUN_005f0fe9 | 183 | FW | DDControl constructor (with parent) — same as above but sets parent param at offset+8 |
| 47 | 0x005F10B6 | FUN_005f10b6 | 183 | FW | DDControl constructor (with data) — same as above but sets data param at offset+0xC |
| 48 | 0x005F1183 | FUN_005f1183 | 79 | FW | DDControl destructor — sets vtable, calls FUN_005f195a (destroy children), then SEH cleanup |
| 49 | 0x005F11D2 | FUN_005f11d2 | 12 | FW | DDControl destructor inner — thunk to FUN_005f04c0 (list destructor) |
| 50 | 0x005F11E8 | FUN_005f11e8 | 14 | FW | SEH epilogue — restores FS:[0] exception handler chain |
| 51 | 0x005F11F6 | FUN_005f11f6 | 43 | FW | DDControl set rect flag — stores param at offset+8, clears offset+0xC |
| 52 | 0x005F1221 | Enable | 43 | FW | CTestCmdUI::Enable — sets enabled flag at offset+0xC, clears offset+8 (MFC library, VS1998) |
| 53 | 0x005F124C | FUN_005f124c | 195 | FW | DDControl init — sets parent, copies 4-int RECT, resolves parent game window, asserts non-null, adds self to parent or control list |
| 54 | 0x005F130F | FUN_005f130f | 478 | FW | DDControl dispatch event — main event dispatcher: WM_KEYDOWN(0x100), WM_CHAR(0x102), WM_MOUSEMOVE(0x200), WM_LBUTTONDOWN(0x201), WM_LBUTTONUP(0x202), WM_LBUTTONDBLCLK(0x203), WM_RBUTTONDOWN(0x204), WM_RBUTTONUP(0x205), custom 0xFFF0. Hit-tests against bounding rect. |
| 55 | 0x005F1514 | FUN_005f1514 | 89 | FW | DDControl resolve parent — recursively finds parent game window handle |
| 56 | 0x005F156D | FUN_005f156d | 60 | FW | DDControl check tracking — resolves parent, calls CSplitterWnd::IsTracking |
| 57 | 0x005F15A9 | FUN_005f15a9 | 73 | FW | DDControl assert parent — resolves parent, asserts "GetParentGameWin()" non-null |
| 58 | 0x005F15F2 | FUN_005f15f2 | 48 | FW | DDControl child paint — calls virtual paint method (vtable+0x28) with RECT, then FUN_005f19ef |
| 59 | 0x005F1622 | FUN_005f1622 | 97 | FW | DDControl show — if hidden, iterate children (hide all), set visible flag, call virtual show callback (vtable+0x20) |
| 60 | 0x005F1683 | FUN_005f1683 | 65 | FW | DDControl hide — if visible, iterate children (hide all), clear visible flag, call virtual hide callback |
| 61 | 0x005F16C4 | FUN_005f16c4 | 33 | FW | DDControl set callback: offset+0x20 (show/hide) |
| 62 | 0x005F16E5 | FUN_005f16e5 | 33 | FW | DDControl set callback: offset+0x24 (mouse move) |
| 63 | 0x005F1706 | FUN_005f1706 | 33 | FW | DDControl set callback: offset+0x28 (paint) |
| 64 | 0x005F1727 | FUN_005f1727 | 33 | FW | DDControl set callback: offset+0x2C (left click) |
| 65 | 0x005F1748 | FUN_005f1748 | 33 | FW | DDControl set callback: offset+0x30 (right click) |
| 66 | 0x005F1769 | FUN_005f1769 | 51 | FW | DDControl invoke show/hide callback — calls function pointer at offset+0x20 with control ID |
| 67 | 0x005F179C | FUN_005f179c | 32 | FW | DDControl show wrapper — thunk to FUN_005f1622 |
| 68 | 0x005F17BC | FUN_005f17bc | 24 | FW | DDControl empty virtual — no-op stub |
| 69 | 0x005F17D4 | FUN_005f17d4 | 61 | FW | DDControl invoke left-click callback — calls function pointer at offset+0x28 with (id, x, y) |
| 70 | 0x005F1811 | FUN_005f1811 | 61 | FW | DDControl invoke left-click-2 callback — calls function pointer at offset+0x2C with (id, x, y) |
| 71 | 0x005F184E | FUN_005f184e | 61 | FW | DDControl invoke mouse-move callback — calls function pointer at offset+0x24 with (id, x, y) |
| 72 | 0x005F188B | FUN_005f188b | 61 | FW | DDControl invoke right-click callback — calls function pointer at offset+0x30 with (id, x, y) |
| 73 | 0x005F18C8 | FUN_005f18c8 | 24 | FW | DDControl empty virtual — no-op stub |
| 74 | 0x005F18E0 | FUN_005f18e0 | 24 | FW | DDControl empty virtual — no-op stub |
| 75 | 0x005F18F8 | FUN_005f18f8 | 24 | FW | DDControl empty virtual — no-op stub |
| 76 | 0x005F1910 | FUN_005f1910 | 24 | FW | DDControl empty virtual — no-op stub |
| 77 | 0x005F1928 | FUN_005f1928 | 50 | FW | DDControl add to control list — calls FUN_005f05b0 (reset) + FUN_005f05f0 (insert) |
| 78 | 0x005F195A | FUN_005f195a | 76 | FW | DDControl destroy children — iterate list calling FUN_005f0c69 (remove node) |
| 79 | 0x005F19A6 | FUN_005f19a6 | 73 | FW | DDControl hide all children — iterate list calling FUN_005f1683 (hide) |
| 80 | 0x005F19EF | FUN_005f19ef | 73 | FW | DDControl paint all children — iterate list calling FUN_005f15f2 (paint) |
| 81 | 0x005F1A40 | FUN_005f1a40 | 270 | FW | DDControl dispatch mouse (variant) — same as FUN_005f0391 but uses offset+0x1C for hover tracking instead of 0xCC |

### Section 2: MFC Library (single function)

| # | Address | Name | Size | Class | Description |
|---|---------|------|------|-------|-------------|
| 82 | 0x005F1B50 | IsTracking | 31 | LIB | CSplitterWnd::IsTracking — returns tracking flag at offset+0xAC (MFC library, VS1998) |

### Section 3: C Runtime Library (0x005F1B80–0x005FFFE0)

| # | Address | Name | Size | Class | Description |
|---|---------|------|------|-------|-------------|
| 83 | 0x005F1B80 | __onexit | 181 | LIB | CRT onexit — register atexit callback |
| 84 | 0x005F1C40 | _atexit | 48 | LIB | CRT atexit — wrapper around __onexit |
| 85 | 0x005F1C70 | ___onexitinit | 85 | LIB | CRT atexit table initialization |
| 86 | 0x005F1CC8 | __global_unwind2 | 32 | LIB | CRT SEH global unwind (RtlUnwind wrapper) |
| 87 | 0x005F1D0A | __local_unwind2 | 104 | LIB | CRT SEH local unwind — walks exception frame chain |
| 88 | 0x005F1D72 | __abnormal_termination | 35 | LIB | CRT SEH abnormal termination check |
| 89 | 0x005F1D95 | FUN_005f1d95 | 9 | LIB | CRT tiny helper — single instruction thunk |
| 90 | 0x005F1D9E | FUN_005f1d9e | 24 | LIB | CRT exception helper |
| 91 | 0x005F1DC0 | _JumpToContinuation | 47 | LIB | CRT C++ EH — jump to continuation address |
| 92 | 0x005F1E00 | _CallMemberFunction0 | 7 | LIB | CRT C++ EH — call member function (0 args) |
| 93 | 0x005F1E10 | FID_conflict:_CallMemberFunction1 | 7 | LIB | CRT C++ EH — call member function (1 arg, variant 1) |
| 94 | 0x005F1E20 | FID_conflict:_CallMemberFunction1 | 7 | LIB | CRT C++ EH — call member function (1 arg, variant 2) |
| 95 | 0x005F1E30 | _UnwindNestedFrames | 81 | LIB | CRT C++ EH — unwind nested exception frames |
| 96 | 0x005F1E90 | ___CxxFrameHandler | 60 | LIB | CRT C++ EH — frame-based exception handler entry |
| 97 | 0x005F1ED0 | ___CxxLongjmpUnwind@4 | 49 | LIB | CRT C++ EH — longjmp unwind |
| 98 | 0x005F1F10 | _CallCatchBlock2 | 102 | LIB | CRT C++ EH — call catch block |
| 99 | 0x005F1F80 | CatchGuardHandler | 62 | LIB | CRT C++ EH — catch guard exception filter |
| 100 | 0x005F1FC0 | _CallSETranslator | 209 | LIB | CRT C++ EH — call SE translator function |
| 101 | 0x005F20A0 | TranslatorGuardHandler | 98 | LIB | CRT C++ EH — translator guard handler |
| 102 | 0x005F2110 | FID_conflict:_memcpy | 285 | LIB | CRT memcpy (variant 1) |
| 103 | 0x005F2260 | FUN_005f2260 | 19 | LIB | CRT helper — small data accessor |
| 104 | 0x005F2280 | _rand | 65 | LIB | CRT rand — standard PRNG |
| 105 | 0x005F22D0 | FUN_005f22d0 | 7 | LIB | CRT strcpy thunk |
| 106 | 0x005F22E0 | FUN_005f22e0 | 224 | LIB | CRT strcat thunk |
| 107 | 0x005F23C0 | operator_delete | 162 | LIB | CRT operator delete (debug) |
| 108 | 0x005F2470 | operator_new | 30 | LIB | CRT operator new |
| 109 | 0x005F2490 | `eh_vector_destructor_iterator' | 148 | LIB | CRT C++ array destructor iterator |
| 110 | 0x005F2540 | __ArrayUnwind | 108 | LIB | CRT C++ array unwind on exception |
| 111 | 0x005F25D0 | FID_conflict:ArrayUnwindFilter | 65 | LIB | CRT C++ array unwind exception filter (variant 1) |
| 112 | 0x005F2620 | `eh_vector_constructor_iterator' | 152 | LIB | CRT C++ array constructor iterator |
| 113 | 0x005F26E0 | FUN_005f26e0 | 22 | LIB | CRT locale helper |
| 114 | 0x005F2700 | FID_conflict:__toupper_lk | 313 | LIB | CRT toupper with locale lock |
| 115 | 0x005F2840 | _isalpha | 74 | LIB | CRT isalpha — alphabetic char test |
| 116 | 0x005F2890 | _isupper | 68 | LIB | CRT isupper — uppercase char test |
| 117 | 0x005F28E0 | _islower | 68 | LIB | CRT islower — lowercase char test |
| 118 | 0x005F2930 | _isdigit | 68 | LIB | CRT isdigit — digit char test |
| 119 | 0x005F2980 | _isxdigit | 74 | LIB | CRT isxdigit — hex digit test |
| 120 | 0x005F29D0 | _isspace | 68 | LIB | CRT isspace — whitespace test |
| 121 | 0x005F2A20 | _ispunct | 68 | LIB | CRT ispunct — punctuation test |
| 122 | 0x005F2A70 | _isalnum | 74 | LIB | CRT isalnum — alphanumeric test |
| 123 | 0x005F2AC0 | _isprint | 74 | LIB | CRT isprint — printable char test |
| 124 | 0x005F2B10 | _isgraph | 74 | LIB | CRT isgraph — graphical char test |
| 125 | 0x005F2B60 | _iscntrl | 68 | LIB | CRT iscntrl — control char test |
| 126 | 0x005F2BB0 | ___isascii | 41 | LIB | CRT isascii — ASCII range test |
| 127 | 0x005F2BE0 | FUN_005f2be0 | 22 | LIB | CRT char classification helper |
| 128 | 0x005F2C00 | ___iscsymf | 113 | LIB | CRT iscsymf — valid C identifier first char test |
| 129 | 0x005F2C80 | ___iscsym | 113 | LIB | CRT iscsym — valid C identifier char test |
| 130 | 0x005F2D00 | __fsopen | 258 | LIB | CRT fsopen — shared file open |
| 131 | 0x005F2E10 | _fopen | 34 | LIB | CRT fopen — file open |
| 132 | 0x005F2E40 | _fclose | 237 | LIB | CRT fclose — file close |
| 133 | 0x005F2F30 | _strncpy | 254 | LIB | CRT strncpy — bounded string copy |
| 134 | 0x005F3030 | _sprintf | 236 | LIB | CRT sprintf — formatted string output |
| 135 | 0x005F3120 | _atol | 282 | LIB | CRT atol — string to long |
| 136 | 0x005F3240 | _atoi | 28 | LIB | CRT atoi — string to int |
| 137 | 0x005F3260 | __atoi64 | 324 | LIB | CRT atoi64 — string to 64-bit int |
| 138 | 0x005F33B0 | _fputs | 202 | LIB | CRT fputs — write string to file |
| 139 | 0x005F3480 | _strlen | 123 | LIB | CRT strlen — string length |
| 140 | 0x005F3500 | _memset | 88 | LIB | CRT memset — fill memory |
| 141 | 0x005F3560 | _strcmp | 129 | LIB | CRT strcmp — string compare |
| 142 | 0x005F35F0 | FUN_005f35f0 | 47 | LIB | CRT string helper |
| 143 | 0x005F3630 | _strchr | 193 | LIB | CRT strchr — find char in string |
| 144 | 0x005F36F0 | _strncmp | 56 | LIB | CRT strncmp — bounded string compare |
| 145 | 0x005F3730 | _fread | 456 | LIB | CRT fread — read from file |
| 146 | 0x005F3900 | _fwrite | 536 | LIB | CRT fwrite — write to file |
| 147 | 0x005F3B20 | __chdir | 226 | LIB | CRT chdir — change directory |
| 148 | 0x005F3C10 | _strrchr | 39 | LIB | CRT strrchr — find last char in string |
| 149 | 0x005F3C40 | _fgets | 301 | LIB | CRT fgets — read line from file |
| 150 | 0x005F3D70 | __filbuf | 479 | LIB | CRT internal file buffer fill |
| 151 | 0x005F3F50 | _fputc | 146 | LIB | CRT fputc — write char to file |
| 152 | 0x005F3FF0 | _putc | 32 | LIB | CRT putc — write char macro/function |
| 153 | 0x005F4010 | _fgetc | 126 | LIB | CRT fgetc — read char from file |
| 154 | 0x005F4090 | _getc | 28 | LIB | CRT getc — read char macro/function |
| 155 | 0x005F40B0 | __strnicmp | 173 | LIB | CRT strnicmp — case-insensitive bounded string compare |
| 156 | 0x005F4160 | __cinit | 66 | LIB | CRT C runtime initialization |
| 157 | 0x005F41B0 | _exit | 27 | LIB | CRT exit — terminate process |
| 158 | 0x005F41D0 | __exit | 27 | LIB | CRT _exit — terminate without cleanup |
| 159 | 0x005F41F0 | __cexit | 25 | LIB | CRT cexit — cleanup without terminate |
| 160 | 0x005F4210 | __c_exit | 25 | LIB | CRT c_exit — minimal cleanup |
| 161 | 0x005F4230 | doexit | 251 | LIB | CRT internal exit — runs atexit callbacks, flushes streams |
| 162 | 0x005F4330 | __initterm | 49 | LIB | CRT init term — calls array of init function pointers |
| 163 | 0x005F4370 | _strstr | 128 | LIB | CRT strstr — find substring |
| 164 | 0x005F43F0 | _malloc | 40 | LIB | CRT malloc — allocate memory |
| 165 | 0x005F4420 | __malloc_dbg | 46 | LIB | CRT malloc debug wrapper |
| 166 | 0x005F4450 | __nh_malloc | 38 | LIB | CRT malloc with new handler |
| 167 | 0x005F4480 | __nh_malloc_dbg | 101 | LIB | CRT malloc debug with new handler |
| 168 | 0x005F44F0 | __heap_alloc | 34 | LIB | CRT heap allocation |
| 169 | 0x005F4520 | __heap_alloc_dbg | 818 | LIB | CRT heap allocation debug — adds guard bytes, tracking headers |
| 170 | 0x005F4860 | _calloc | 38 | LIB | CRT calloc — allocate zeroed memory |
| 171 | 0x005F4890 | __calloc_dbg | 110 | LIB | CRT calloc debug wrapper |
| 172 | 0x005F4900 | FID_conflict:__expand | 38 | LIB | CRT expand — resize block in place (variant 1) |
| 173 | 0x005F4930 | __realloc_dbg | 55 | LIB | CRT realloc debug wrapper |
| 174 | 0x005F4970 | realloc_help | 1409 | LIB | CRT realloc internal — handles resize, copy, debug tracking |
| 175 | 0x005F4F00 | FID_conflict:__expand | 38 | LIB | CRT expand (variant 2) |
| 176 | 0x005F4F30 | __expand_dbg | 55 | LIB | CRT expand debug wrapper |
| 177 | 0x005F4F70 | FUN_005f4f70 | 25 | LIB | CRT heap helper |
| 178 | 0x005F4F90 | __free_dbg | 1057 | LIB | CRT free debug — validates guards, updates tracking, calls base free |
| 179 | 0x005F53C0 | __msize | 30 | LIB | CRT msize — get allocation size |
| 180 | 0x005F53E0 | __msize_dbg | 358 | LIB | CRT msize debug — returns user-requested size from debug header |
| 181 | 0x005F5550 | FUN_005f5550 | 38 | LIB | CRT debug heap helper |
| 182 | 0x005F5580 | __CrtSetDbgBlockType | 160 | LIB | CRT debug — set block type for allocation |
| 183 | 0x005F5620 | FUN_005f5620 | 38 | LIB | CRT debug heap helper |
| 184 | 0x005F5650 | _CheckBytes | 140 | LIB | CRT debug — check guard byte integrity |
| 185 | 0x005F56E0 | __CrtCheckMemory | 873 | LIB | CRT debug — full heap integrity check |
| 186 | 0x005F5A60 | __CrtSetDbgFlag | 48 | LIB | CRT debug — set debug flags |
| 187 | 0x005F5A90 | __CrtDoForAllClientObjects | 105 | LIB | CRT debug — iterate all client allocations |
| 188 | 0x005F5B00 | __CrtIsValidPointer | 92 | LIB | CRT debug — validate pointer range |
| 189 | 0x005F5B60 | __CrtIsValidHeapPointer | 182 | LIB | CRT debug — validate heap pointer |
| 190 | 0x005F5C30 | __CrtIsMemoryBlock | 255 | LIB | CRT debug — check if pointer is valid debug block |
| 191 | 0x005F5D30 | FUN_005f5d30 | 38 | LIB | CRT debug helper |
| 192 | 0x005F5D60 | __CrtMemCheckpoint | 316 | LIB | CRT debug — save heap state snapshot |
| 193 | 0x005F5EA0 | __CrtMemDifference | 312 | LIB | CRT debug — compare two heap snapshots |
| 194 | 0x005F5FE0 | __CrtMemDumpAllObjectsSince | 704 | LIB | CRT debug — dump all allocations since checkpoint |
| 195 | 0x005F62A0 | __printMemBlockData | 252 | LIB | CRT debug — print memory block details |
| 196 | 0x005F63A0 | __CrtDumpMemoryLeaks | 132 | LIB | CRT debug — dump memory leak report |
| 197 | 0x005F6430 | __CrtMemDumpStatistics | 199 | LIB | CRT debug — dump heap statistics |
| 198 | 0x005F6500 | FID_conflict:_memcpy | 285 | LIB | CRT memcpy (variant 2) |
| 199 | 0x005F6650 | FID_conflict:__wrename | 96 | LIB | CRT rename — rename file |
| 200 | 0x005F66B0 | FID_conflict:_remove | 92 | LIB | CRT remove — delete file |
| 201 | 0x005F6710 | FID_conflict:__unlink | 28 | LIB | CRT unlink — wrapper for remove |
| 202 | 0x005F6730 | _rewind | 192 | LIB | CRT rewind — reset file position |
| 203 | 0x005F67F0 | _fseek | 304 | LIB | CRT fseek — set file position |
| 204 | 0x005F6920 | _ftell | 674 | LIB | CRT ftell — get file position |
| 205 | 0x005F6BD0 | _printf | 141 | LIB | CRT printf — formatted console output |
| 206 | 0x005F6C60 | __ftol | 39 | LIB | CRT ftol — float to long conversion |
| 207 | 0x005F6C90 | __fpmath | 38 | LIB | CRT FP math initialization |
| 208 | 0x005F6CC0 | FUN_005f6cc0 | 16 | LIB | CRT FP helper |
| 209 | 0x005F6CD0 | __cfltcvt_init | 71 | LIB | CRT float conversion init — sets function pointers for cfltcvt |
| 210 | 0x005F6D20 | FUN_005f6d20 | 38 | LIB | CRT FP helper |
| 211 | 0x005F6D50 | _memcmp | 172 | LIB | CRT memcmp — compare memory blocks |
| 212 | 0x005F6E00 | __strcmpi | 140 | LIB | CRT strcmpi — case-insensitive string compare |
| 213 | 0x005F6E90 | entry | 494 | LIB | CRT entry point — process startup (GetVersion, heap init, cinit, WinMain call, exit) |
| 214 | 0x005F70E0 | __amsg_exit | 55 | LIB | CRT fatal runtime error — write message and exit |
| 215 | 0x005F7120 | FUN_005f7120 | 24 | LIB | CRT startup helper |
| 216 | 0x005F7140 | __getcwd | 43 | LIB | CRT getcwd — get current working directory |
| 217 | 0x005F7170 | __getdcwd | 312 | LIB | CRT getdcwd — get current directory for specified drive |
| 218 | 0x005F72B0 | __validdrive | 105 | LIB | CRT validdrive — test if drive letter is valid |
| 219 | 0x005F7320 | _time | 390 | LIB | CRT time — get current time (GetSystemTime → time_t) |
| 220 | 0x005F74B0 | _strncat | 291 | LIB | CRT strncat — bounded string concatenation |
| 221 | 0x005F75E0 | __assert | 951 | LIB | CRT assert — assertion failure handler (displays dialog, abort/retry/ignore) |
| 222 | 0x005F79A0 | ___InternalCxxFrameHandler | 263 | LIB | CRT C++ EH — internal frame handler dispatch |
| 223 | 0x005F7AC0 | FindHandler | 675 | LIB | CRT C++ EH — search for matching exception handler |
| 224 | 0x005F7D70 | FindHandlerForForeignException | 288 | LIB | CRT C++ EH — handle non-C++ exceptions |
| 225 | 0x005F7E90 | GetRangeOfTrysToCheck | 230 | LIB | CRT C++ EH — determine try-block range for current state |
| 226 | 0x005F7F80 | TypeMatch | 195 | LIB | CRT C++ EH — RTTI type matching for catch clauses |
| 227 | 0x005F8050 | ___FrameUnwindToState | 234 | LIB | CRT C++ EH — unwind frame to target state |
| 228 | 0x005F8160 | FID_conflict:ArrayUnwindFilter | 65 | LIB | CRT C++ array unwind filter (variant 2) |
| 229 | 0x005F81B0 | CatchIt | 209 | LIB | CRT C++ EH — execute catch block |
| 230 | 0x005F8290 | CallCatchBlock | 260 | LIB | CRT C++ EH — call catch block with frame setup |
| 231 | 0x005F83F0 | ExFilterRethrow | 96 | LIB | CRT C++ EH — exception filter for rethrow |
| 232 | 0x005F8460 | BuildCatchObject | 699 | LIB | CRT C++ EH — construct catch handler parameter object |
| 233 | 0x005F8740 | DestructExceptionObject | 124 | LIB | CRT C++ EH — destroy exception object |
| 234 | 0x005F87E0 | AdjustPointer | 79 | LIB | CRT C++ EH — adjust pointer for virtual base class |
| 235 | 0x005F8830 | __CallSettingFrame@12 | 72 | LIB | CRT C++ EH — call function with exception frame setup |
| 236 | 0x005F8880 | terminate | 105 | LIB | CRT terminate — C++ unhandled exception handler |
| 237 | 0x005F8920 | unexpected | 40 | LIB | CRT unexpected — C++ unexpected exception handler |
| 238 | 0x005F8950 | _inconsistency | 106 | LIB | CRT inconsistency — EH table corruption handler |
| 239 | 0x005F89F0 | __CrtDbgBreak | 17 | LIB | CRT debug break — triggers debugger breakpoint |
| 240 | 0x005F8A10 | __CrtSetReportMode | 126 | LIB | CRT debug — set report output mode |
| 241 | 0x005F8A90 | __CrtSetReportFile | 169 | LIB | CRT debug — set report output file |
| 242 | 0x005F8B40 | FUN_005f8b40 | 38 | LIB | CRT debug report helper |
| 243 | 0x005F8B70 | __CrtDbgReport | 998 | LIB | CRT debug — generate debug report (assert/warning/error) |
| 244 | 0x005F8F60 | _CrtMessageWindow | 813 | LIB | CRT debug — display debug message in dialog box |
| 245 | 0x005F9355 | FUN_005f9355 | 27 | LIB | CRT locale helper |
| 246 | 0x005F9370 | ___crtLCMapStringW | 760 | LIB | CRT Unicode locale string mapping wrapper |
| 247 | 0x005F9670 | wcsncnt | 108 | LIB | CRT wide string bounded count |
| 248 | 0x005F96E0 | ___crtLCMapStringA | 791 | LIB | CRT ANSI locale string mapping wrapper |
| 249 | 0x005F9A00 | _strncnt | 100 | LIB | CRT bounded string character count |
| 250 | 0x005F9A70 | __isctype | 182 | LIB | CRT isctype — character type test with locale |
| 251 | 0x005F9B30 | __openfile | 831 | LIB | CRT internal file open — handles mode parsing, creates FILE struct |
| 252 | 0x005F9EF0 | __getstream | 274 | LIB | CRT internal — find free FILE slot |
| 253 | 0x005FA010 | __close | 267 | LIB | CRT internal close — close fd, release handle |
| 254 | 0x005FA120 | __freebuf | 138 | LIB | CRT internal — free file buffer |
| 255 | 0x005FA1B0 | _fflush | 126 | LIB | CRT fflush — flush file buffer |
| 256 | 0x005FA230 | __flush | 186 | LIB | CRT internal flush — write buffer to file |
| 257 | 0x005FA2F0 | __flushall | 26 | LIB | CRT flushall — flush all streams |
| 258 | 0x005FA310 | flsall | 247 | LIB | CRT internal — flush all streams implementation |
| 259 | 0x005FA410 | __flsbuf | 660 | LIB | CRT internal — flush single char to buffer, allocate buffer if needed |
| 260 | 0x005FA6B0 | __output | 3177 | LIB | CRT internal — printf core formatting engine |
| 261 | 0x005FB440 | write_char | 117 | LIB | CRT internal — write single char to output |
| 262 | 0x005FB4C0 | write_multi_char | 75 | LIB | CRT internal — write repeated char to output |
| 263 | 0x005FB510 | write_string | 87 | LIB | CRT internal — write string to output |
| 264 | 0x005FB570 | get_int_arg | 30 | LIB | CRT internal — get int argument from va_list |
| 265 | 0x005FB590 | get_int64_arg | 35 | LIB | CRT internal — get 64-bit int argument from va_list |
| 266 | 0x005FB5C0 | get_short_arg | 31 | LIB | CRT internal — get short argument from va_list |
| 267 | 0x005FB5E0 | __allmul | 52 | LIB | CRT signed 64-bit multiplication |
| 268 | 0x005FB620 | __stbuf | 330 | LIB | CRT internal — set up temporary buffer for unbuffered stream |
| 269 | 0x005FB770 | __ftbuf | 182 | LIB | CRT internal — flush and release temporary buffer |
| 270 | 0x005FB830 | __read | 1156 | LIB | CRT internal read — read from fd, handles text/binary translation |
| 271 | 0x005FBCD0 | __write | 744 | LIB | CRT internal write — write to fd, handles text/binary translation |
| 272 | 0x005FBFD0 | __dosmaperr | 177 | LIB | CRT internal — map Win32 error codes to errno |
| 273 | 0x005FC090 | __mbctoupper | 188 | LIB | CRT multibyte char to uppercase |
| 274 | 0x005FC160 | __ioinit | 808 | LIB | CRT I/O initialization — sets up file handle table |
| 275 | 0x005FC490 | __ioterm | 104 | LIB | CRT I/O termination — frees file handle table |
| 276 | 0x005FC500 | __getbuf | 188 | LIB | CRT internal — allocate file buffer |
| 277 | 0x005FC5C0 | FUN_005fc5c0 | 22 | LIB | CRT helper — small accessor |
| 278 | 0x005FC5E0 | _tolower | 313 | LIB | CRT tolower — convert char to lowercase |
| 279 | 0x005FC720 | FUN_005fc720 | 38 | LIB | CRT helper |
| 280 | 0x005FC750 | FUN_005fc750 | 21 | LIB | CRT helper |
| 281 | 0x005FC770 | __callnewh | 62 | LIB | CRT call new handler — invoked when operator new fails |
| 282 | 0x005FC7B0 | __malloc_base | 34 | LIB | CRT malloc base — non-debug allocation |
| 283 | 0x005FC7E0 | __nh_malloc_base | 150 | LIB | CRT malloc base with new handler |
| 284 | 0x005FC880 | __heap_alloc_base | 99 | LIB | CRT heap allocation base — HeapAlloc wrapper |
| 285 | 0x005FC8F0 | FUN_005fc8f0 | 21 | LIB | CRT heap helper |
| 286 | 0x005FC910 | __expand_base | 195 | LIB | CRT expand base — HeapReAlloc in-place |
| 287 | 0x005FC9E0 | __realloc_base | 518 | LIB | CRT realloc base — HeapReAlloc wrapper |
| 288 | 0x005FCBF0 | __free_base | 105 | LIB | CRT free base — HeapFree wrapper |
| 289 | 0x005FCC60 | __heapchk | 120 | LIB | CRT heapchk — HeapValidate wrapper |
| 290 | 0x005FCCE0 | __heapset | 21 | LIB | CRT heapset — stub (returns OK) |
| 291 | 0x005FCD00 | __heap_init | 93 | LIB | CRT heap init — HeapCreate |
| 292 | 0x005FCD60 | __heap_term | 93 | LIB | CRT heap term — HeapDestroy |
| 293 | 0x005FCDC0 | FUN_005fcdc0 | 21 | LIB | CRT heap helper |
| 294 | 0x005FCDE0 | __set_sbh_threshold | 61 | LIB | CRT set small-block heap threshold |
| 295 | 0x005FCE30 | ___sbh_new_region | 508 | LIB | CRT SBH — allocate new region |
| 296 | 0x005FD040 | ___sbh_release_region | 132 | LIB | CRT SBH — release region |
| 297 | 0x005FD0D0 | ___sbh_decommit_pages | 376 | LIB | CRT SBH — decommit unused pages |
| 298 | 0x005FD250 | ___sbh_find_block | 162 | LIB | CRT SBH — find block containing address |
| 299 | 0x005FD300 | ___sbh_free_block | 136 | LIB | CRT SBH — free block within region |
| 300 | 0x005FD390 | ___sbh_alloc_block | 1207 | LIB | CRT SBH — allocate block from any region |
| 301 | 0x005FD860 | ___sbh_alloc_block_from_page | 763 | LIB | CRT SBH — allocate block from specific page |
| 302 | 0x005FDB60 | ___sbh_resize_block | 439 | LIB | CRT SBH — resize block in place |
| 303 | 0x005FDD20 | ___sbh_heap_check | 617 | LIB | CRT SBH — validate heap integrity |
| 304 | 0x005FDF90 | __lseek | 285 | LIB | CRT lseek — set file position (SetFilePointer wrapper) |
| 305 | 0x005FE0B0 | ___initstdio | 338 | LIB | CRT stdio initialization — sets up stdin/stdout/stderr |
| 306 | 0x005FE210 | ___endstdio | 36 | LIB | CRT stdio termination |
| 307 | 0x005FE240 | __setdefaultprecision | 29 | LIB | CRT set default FP precision |
| 308 | 0x005FE260 | __ms_p5_test_fdiv | 94 | LIB | CRT Pentium FDIV bug test |
| 309 | 0x005FE2C0 | __ms_p5_mp_test_fdiv | 86 | LIB | CRT Pentium FDIV bug test (MP variant) |
| 310 | 0x005FE320 | __forcdecpt | 179 | LIB | CRT float format — force decimal point |
| 311 | 0x005FE3E0 | __cropzeros | 223 | LIB | CRT float format — remove trailing zeros |
| 312 | 0x005FE4C0 | __positive | 50 | LIB | CRT float format — check if positive |
| 313 | 0x005FE500 | __fassign | 83 | LIB | CRT float format — assign float/double from string |
| 314 | 0x005FE560 | __cftoe | 458 | LIB | CRT float format — scientific notation (e.g. 1.23e+04) |
| 315 | 0x005FE730 | __cftof | 393 | LIB | CRT float format — fixed notation (e.g. 12300.0) |
| 316 | 0x005FE8C0 | __cftog | 281 | LIB | CRT float format — general notation (shortest of e/f) |
| 317 | 0x005FE9E0 | __cftoe_g | 63 | LIB | CRT float format — scientific for %g |
| 318 | 0x005FEA20 | __cftof_g | 59 | LIB | CRT float format — fixed for %g |
| 319 | 0x005FEA60 | __cfltcvt | 119 | LIB | CRT float format — dispatch to e/f/g formatter |
| 320 | 0x005FEAE0 | __shift | 54 | LIB | CRT float format — shift mantissa |
| 321 | 0x005FEB20 | __XcptFilter | 500 | LIB | CRT exception filter — maps Win32 exceptions to C signals |
| 322 | 0x005FED20 | xcptlookup | 97 | LIB | CRT internal exception table lookup |
| 323 | 0x005FED90 | __ismbbkalnum | 32 | LIB | CRT multibyte katakana alphanumeric test |
| 324 | 0x005FEDB0 | __ismbbkprint | 32 | LIB | CRT multibyte katakana printable test |
| 325 | 0x005FEDD0 | __ismbbkpunct | 32 | LIB | CRT multibyte katakana punctuation test |
| 326 | 0x005FEDF0 | __ismbbalnum | 35 | LIB | CRT multibyte alphanumeric test |
| 327 | 0x005FEE20 | __ismbbalpha | 35 | LIB | CRT multibyte alphabetic test |
| 328 | 0x005FEE50 | __ismbbgraph | 35 | LIB | CRT multibyte graphical test |
| 329 | 0x005FEE80 | __ismbbprint | 35 | LIB | CRT multibyte printable test |
| 330 | 0x005FEEB0 | __ismbbpunct | 32 | LIB | CRT multibyte punctuation test |
| 331 | 0x005FEED0 | __ismbblead | 32 | LIB | CRT multibyte lead byte test |
| 332 | 0x005FEEF0 | __ismbbtrail | 32 | LIB | CRT multibyte trail byte test |
| 333 | 0x005FEF10 | __ismbbkana | 68 | LIB | CRT multibyte katakana test |
| 334 | 0x005FEF60 | x_ismbbtype | 110 | LIB | CRT multibyte char type internal test |
| 335 | 0x005FEFD0 | __setenvp | 318 | LIB | CRT startup — parse environment strings into _environ |
| 336 | 0x005FF110 | __setargv | 204 | LIB | CRT startup — parse command line into argv |
| 337 | 0x005FF1E0 | parse_cmdline | 958 | LIB | CRT startup — command line tokenizer (handles quoting) |
| 338 | 0x005FF5A0 | ___crtGetEnvironmentStringsW | 689 | LIB | CRT get environment strings (Unicode) |
| 339 | 0x005FF860 | ___crtGetEnvironmentStringsA | 602 | LIB | CRT get environment strings (ANSI) |
| 340 | 0x005FFAC0 | __setmbcp | 815 | LIB | CRT set multibyte codepage |
| 341 | 0x005FFDF0 | getSystemCP | 121 | LIB | CRT get system codepage (ANSI/OEM) |
| 342 | 0x005FFE80 | _CPtoLCID | 107 | LIB | CRT codepage to LCID conversion |
| 343 | 0x005FFF20 | setSBCS | 120 | LIB | CRT set single-byte character set tables |
| 344 | 0x005FFFA0 | FUN_005fffa0 | 21 | LIB | CRT multibyte helper |
| 345 | 0x005FFFC0 | ___initmbctable | 21 | LIB | CRT multibyte character table initialization |
| 346 | 0x005FFFE0 | __FF_MSGBANNER | 95 | LIB | CRT fatal error banner — writes "Microsoft Visual C++ Runtime Library" header |

## Discrepancies

**GL functions: 0** — No game logic exists in this block. No discrepancies to report.
