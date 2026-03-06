# Phase 1 Audit: Block 0x00600000 - 0x0060FFFF

## Overview

This block is **100% C Runtime Library (CRT)** code from the **Visual Studio 1998 Debug** MSVCRT. Every function except two trivial unnamed stubs was auto-identified by Ghidra's Function ID (FID) matching. There is **zero game logic** in this block.

- **DAT_ globals referenced**: All in the 0x006e and 0x0063a-0x0063b ranges -- CRT internal state (file handle tables, timezone data, locale settings, FPU state). None overlap with game globals documented in phase0_reference_context.md.
- **Cross-references to game functions**: Zero. The only `FUN_005fXXXX` calls are to CRT string utilities (FUN_005f22d0 = strcpy variant, FUN_005f22e0 = strcat variant, FUN_005f35f0 = CRT internal).
- **String literals**: All CRT diagnostic strings ("Runtime Error!", "Microsoft Visual C++ Runtime Library", source file names like "fprintf.c", "setvbuf.c", "osfinfo.c", "setenv.c", etc.).

---

### Cluster: CRT Error Handling & Signals

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00600040 | medium | __NMSG_WRITE | __NMSG_WRITE | int msgnum | void | FRAMEWORK: Writes CRT runtime error message to stderr/messagebox | HIGH |
| 0x00600260 | small | __GET_RTERRMSG | __GET_RTERRMSG | int msgnum | wchar_t* | FRAMEWORK: Returns pointer to runtime error message string | HIGH |
| 0x00600400 | stub | _abort | _abort | void | void | FRAMEWORK: CRT abort() implementation | HIGH |
| 0x00600430 | medium | _signal | _signal | int signum | void | FRAMEWORK: CRT signal() -- installs signal handler | HIGH |
| 0x00600610 | small | ctrlevent_capture | ctrlevent_capture | int event | undefined4 | FRAMEWORK: Windows console control event handler (Ctrl+C etc.) | HIGH |
| 0x006006A0 | medium | _raise | _raise | int signum | int | FRAMEWORK: CRT raise() -- raises a signal | HIGH |
| 0x006008C0 | small | siglookup | siglookup | int signum | undefined4* | FRAMEWORK: Looks up signal handler in signal table | HIGH |
| 0x00600930 | small | ___crtMessageBoxA | ___crtMessageBoxA | LPCSTR text, LPCSTR caption, UINT type | int | FRAMEWORK: CRT wrapper for MessageBoxA (lazy-loads user32.dll) | HIGH |
| 0x00600FA0 | small | __CxxUnhandledExceptionFilter | __CxxUnhandledExceptionFilter | _EXCEPTION_POINTERS* | long | FRAMEWORK: C++ unhandled exception filter | HIGH |
| 0x00601040 | stub | FUN_00601040 | crt_restore_exception_filter | void | void | FRAMEWORK: Restores original unhandled exception filter from DAT_006e55ac | HIGH |

### Cluster: CRT Integer/String Conversion

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00600A10 | small | __itoa | __itoa | int val, char* dest, int radix | char* | FRAMEWORK: Integer to ASCII string | HIGH |
| 0x00600A70 | small | xtoa | xtoa | uint val, char* buf, uint radix, int issigned | void | FRAMEWORK: Core unsigned-to-ASCII helper | HIGH |
| 0x00600B30 | small | __ltoa | __ltoa | long val, char* dest, int radix | char* | FRAMEWORK: Long to ASCII string | HIGH |
| 0x00600B90 | stub | __ultoa | __ultoa | ulong val, char* dest, int radix | char* | FRAMEWORK: Unsigned long to ASCII | HIGH |
| 0x00600BC0 | small | __i64toa | __i64toa | longlong val, char* buf, int radix | char* | FRAMEWORK: 64-bit integer to ASCII | HIGH |
| 0x00600C30 | small | x64toa | x64toa | uint lo, uint hi, char* buf, uint radix, int issigned | void | FRAMEWORK: Core 64-bit unsigned-to-ASCII helper | HIGH |
| 0x00600D10 | stub | __ui64toa | __ui64toa | ulonglong val, char* buf, int radix | char* | FRAMEWORK: Unsigned 64-bit integer to ASCII | HIGH |

### Cluster: CRT Formatted I/O

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00600D40 | small | _fprintf | _fprintf | FILE*, char* fmt, ... | int | FRAMEWORK: CRT fprintf() | HIGH |
| 0x00600DF0 | medium | _setvbuf | _setvbuf | FILE*, char* buf, int mode, size_t size | int | FRAMEWORK: CRT setvbuf() -- set stream buffering | HIGH |
| 0x00601120 | small | __snprintf | __snprintf | char* dest, size_t count, char* fmt, ... | int | FRAMEWORK: CRT _snprintf() | HIGH |
| 0x00601210 | small | __vsnprintf | __vsnprintf | char* dest, size_t count, char* fmt, va_list args | int | FRAMEWORK: CRT _vsnprintf() | HIGH |

### Cluster: CRT C++ Exception/Atexit

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00600F50 | stub | $E2 | crt_atexit_E2 | void | void | FRAMEWORK: CRT atexit handler (calls _E1) | HIGH |
| 0x00600F70 | stub | $E1 | crt_atexit_E1 | void | void | FRAMEWORK: CRT atexit handler (installs unhandled exception filter) | HIGH |

### Cluster: CRT Validation

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00601060 | small | _ValidateRead | _ValidateRead | void* ptr, uint size | int | FRAMEWORK: Debug CRT read pointer validation (IsBadReadPtr) | HIGH |
| 0x006010A0 | small | _ValidateWrite | _ValidateWrite | void* ptr, uint size | int | FRAMEWORK: Debug CRT write pointer validation (IsBadWritePtr) | HIGH |
| 0x006010E0 | small | _ValidateExecute | _ValidateExecute | func* ptr | int | FRAMEWORK: Debug CRT function pointer validation (IsBadCodePtr) | HIGH |

### Cluster: CRT Unicode/MBCS String Type Helpers

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00601300 | medium | ___crtGetStringTypeW | ___crtGetStringTypeW | DWORD, LPCWSTR, int, LPWORD, UINT, LCID | void | FRAMEWORK: CRT wrapper for GetStringTypeW with MBCS fallback | HIGH |
| 0x00601560 | medium | ___crtGetStringTypeA | ___crtGetStringTypeA | _locale_t, DWORD, LPCSTR, int, LPWORD, int, BOOL | BOOL | FRAMEWORK: CRT wrapper for GetStringTypeA with wide fallback | HIGH |
| 0x00606330 | medium | ___crtCompareStringW | ___crtCompareStringW | LPCWSTR, DWORD, LPCWSTR, int, LPCWSTR, int | int | FRAMEWORK: CRT wrapper for CompareStringW with MBCS fallback | HIGH |
| 0x00606690 | large | ___crtCompareStringA | ___crtCompareStringA | multiple | int | FRAMEWORK: CRT wrapper for CompareStringA with wide fallback | HIGH |

### Cluster: CRT File Handle Management (lowio)

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00601700 | stub | __open | __open | char* filename, int flags, ... | int | FRAMEWORK: CRT _open() -- forwards to _sopen | HIGH |
| 0x00601750 | xlarge | __sopen | __sopen | char* filename, int flags, int shareflags, ... | int | FRAMEWORK: CRT _sopen() -- opens file with sharing mode (CreateFileA) | HIGH |
| 0x00601CF0 | small | __alloc_osfhnd | __alloc_osfhnd | void | int | FRAMEWORK: Allocates CRT file descriptor for OS handle | HIGH |
| 0x00601E40 | small | __set_osfhnd | __set_osfhnd | int fd, intptr_t handle | int | FRAMEWORK: Associates OS handle with CRT file descriptor | HIGH |
| 0x00601F40 | small | __free_osfhnd | __free_osfhnd | int fd | int | FRAMEWORK: Releases OS handle from CRT file descriptor | HIGH |
| 0x00602060 | small | __get_osfhandle | __get_osfhandle | int fd | intptr_t | FRAMEWORK: Gets OS handle from CRT file descriptor | HIGH |
| 0x006020E0 | small | __open_osfhandle | __open_osfhandle | intptr_t handle, int flags | int | FRAMEWORK: Creates CRT fd from existing OS handle | HIGH |
| 0x006021E0 | small | __commit | __commit | int fd | int | FRAMEWORK: CRT _commit() -- flushes file buffers (FlushFileBuffers) | HIGH |
| 0x006022C0 | stub | __isatty | __isatty | int fd | int | FRAMEWORK: CRT _isatty() -- checks if fd is a console device | HIGH |
| 0x006024D0 | small | __fcloseall | __fcloseall | void | int | FRAMEWORK: CRT _fcloseall() -- closes all open streams | HIGH |
| 0x00605BA0 | small | __setmode | __setmode | int fd, int mode | int | FRAMEWORK: CRT _setmode() -- sets file translation mode (text/binary) | HIGH |
| 0x00603F30 | medium | __chsize | __chsize | int fd, long size | int | FRAMEWORK: CRT _chsize() -- truncates/extends file | HIGH |
| 0x006075E0 | small | __filelength | __filelength | int fd | long | FRAMEWORK: CRT _filelength() -- gets file size | HIGH |

### Cluster: CRT Character Conversion

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00602310 | small | _wctomb | _wctomb | char* mbch, wchar_t wch | int | FRAMEWORK: CRT wctomb() -- wide char to multibyte | HIGH |
| 0x006056E0 | medium | _wcstombs | _wcstombs | char* dest, wchar_t* src, size_t maxcount | size_t | FRAMEWORK: CRT wcstombs() -- wide string to multibyte | HIGH |
| 0x00605A40 | stub | wcsncnt | wcsncnt | short* str, int maxlen | int | FRAMEWORK: Counts wide characters up to maxlen | HIGH |
| 0x00606620 | stub | wcsncnt | wcsncnt | short* str, int maxlen | int | FRAMEWORK: Duplicate of wcsncnt (different call site) | HIGH |
| 0x006035D0 | stub | _wcslen | _wcslen | wchar_t* str | size_t | FRAMEWORK: CRT wcslen() | HIGH |
| 0x00606260 | small | ___wtomb_environ | ___wtomb_environ | void | int | FRAMEWORK: Converts wide environment strings to multibyte | HIGH |

### Cluster: CRT 64-bit Arithmetic

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x006023E0 | small | __aulldiv | __aulldiv | uint lo1, uint hi1, uint lo2, uint hi2 | undefined8 | FRAMEWORK: Unsigned 64-bit division (compiler helper) | HIGH |
| 0x00602450 | small | __aullrem | __aullrem | uint lo1, uint hi1, uint lo2, uint hi2 | undefined8 | FRAMEWORK: Unsigned 64-bit remainder (compiler helper) | HIGH |

### Cluster: CRT Floating Point Control

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00602590 | stub | __statusfp | __statusfp | void | uint | FRAMEWORK: Gets FPU status word | HIGH |
| 0x006025C0 | stub | __clearfp | __clearfp | void | uint | FRAMEWORK: Clears FPU exceptions, returns old status | HIGH |
| 0x006025F0 | stub | __control87 | __control87 | uint newval, uint mask | uint | FRAMEWORK: Gets/sets FPU control word | HIGH |
| 0x00602640 | stub | __controlfp | __controlfp | uint newval, uint mask | uint | FRAMEWORK: Gets/sets FPU control word (portable) | HIGH |
| 0x00602670 | small | __fpreset | __fpreset | void | void | FRAMEWORK: Resets FPU to default state | HIGH |
| 0x006026D0 | small | __abstract_cw | __abstract_cw | uint hwcw | uint | FRAMEWORK: Converts hardware FPU control word to abstract form | HIGH |
| 0x00602820 | small | __hw_cw | __hw_cw | uint abstractcw | undefined4 | FRAMEWORK: Converts abstract FPU control word to hardware form | HIGH |
| 0x006029F0 | small | __abstract_sw | __abstract_sw | byte hwsw | uint | FRAMEWORK: Converts hardware FPU status word to abstract form | HIGH |
| 0x00602A70 | stub | __fptrap | __fptrap | void | void | FRAMEWORK: Raises FP exception signal (SIGFPE) | HIGH |

### Cluster: CRT Long Double Mantissa Arithmetic

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00602A90 | small | __ZeroTail | __ZeroTail | int man, int pos | undefined4 | FRAMEWORK: Checks if mantissa tail is zero from position | HIGH |
| 0x00602B30 | small | __IncMan | __IncMan | int man, int pos | int | FRAMEWORK: Increments mantissa at position | HIGH |
| 0x00602BF0 | small | __RoundMan | __RoundMan | int man, int pos | undefined4 | FRAMEWORK: Rounds mantissa at position | HIGH |
| 0x00602CD0 | stub | __CopyMan | __CopyMan | undefined4* dst, undefined4* src | void | FRAMEWORK: Copies mantissa | HIGH |
| 0x00602D20 | stub | __FillZeroMan | __FillZeroMan | int man | void | FRAMEWORK: Zeros out mantissa | HIGH |
| 0x00602D60 | stub | __IsZeroMan | __IsZeroMan | int man | undefined4 | FRAMEWORK: Tests if mantissa is zero | HIGH |
| 0x00602DB0 | small | __ShrMan | __ShrMan | int man, int count | void | FRAMEWORK: Right-shifts mantissa by count bits | HIGH |

### Cluster: CRT Long Double Conversion

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00602EA0 | large | __ld12cvt | __ld12cvt | ushort* src, uint* dst, int* rounddir | undefined4 | FRAMEWORK: Converts 12-byte long double to target format | HIGH |
| 0x00603110 | stub | FID_conflict:__ld12tod | __ld12tod_a | _LDBL12*, _CRT_DOUBLE* | INTRNCVT_STATUS | FRAMEWORK: 12-byte long double to double (variant A) | HIGH |
| 0x00603140 | stub | FID_conflict:__ld12tod | __ld12tod_b | _LDBL12*, _CRT_DOUBLE* | INTRNCVT_STATUS | FRAMEWORK: 12-byte long double to double (variant B) | HIGH |
| 0x00603170 | small | __ld12told | __ld12told | _LDBL12*, _LDOUBLE* | INTRNCVT_STATUS | FRAMEWORK: 12-byte long double to 10-byte long double | HIGH |
| 0x00603240 | stub | FID_conflict:__atodbl | __atodbl_a | _CRT_FLOAT*, char* | int | FRAMEWORK: ASCII to double (variant A) | HIGH |
| 0x00603280 | stub | __atoldbl | __atoldbl | _LDOUBLE*, char* | int | FRAMEWORK: ASCII to long double | HIGH |
| 0x006032C0 | stub | FID_conflict:__atodbl | __atodbl_b | _CRT_FLOAT*, char* | int | FRAMEWORK: ASCII to double (variant B) | HIGH |
| 0x00603300 | small | __fptostr | __fptostr | char* buf, size_t size, int digits, STRFLT ptflt | errno_t | FRAMEWORK: Floating point to string | HIGH |
| 0x006033E0 | small | __fltout | __fltout | void | undefined* | FRAMEWORK: Float output helper (calls _I10_OUTPUT) | HIGH |
| 0x00603450 | small | ___dtold | ___dtold | uint* dst, uint* src | void | FRAMEWORK: Double to long double conversion | HIGH |

### Cluster: CRT String-to-Long-Double Parsing

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x006043E0 | small | ___mtold12 | ___mtold12 | char* mantissa, int expn, uint* ld12 | void | FRAMEWORK: Mantissa string to 12-byte long double | HIGH |
| 0x00604520 | xlarge | ___strgtold12 | ___strgtold12 | _LDBL12*, char**, char*, int, int, int, int | uint | FRAMEWORK: Master string-to-long-double parser (2795 bytes) | HIGH |
| 0x00605140 | small | ___STRINGTOLD | ___STRINGTOLD | _LDOUBLE*, char**, char*, int | uint | FRAMEWORK: Public string-to-long-double wrapper | HIGH |
| 0x006051A0 | large | $I10_OUTPUT | _I10_OUTPUT | int, uint, ushort, int, byte, short* | undefined4 | FRAMEWORK: Internal float-to-decimal output (1335 bytes) | HIGH |
| 0x00605CE0 | large | ___ld12mul | ___ld12mul | int* a, int* b | void | FRAMEWORK: 12-byte long double multiplication | HIGH |
| 0x00606110 | small | ___multtenpow12 | ___multtenpow12 | undefined2* ld12, uint power, int sign | void | FRAMEWORK: Multiplies 12-byte long double by 10^power | HIGH |
| 0x006041E0 | stub | ___addl | ___addl | uint a, uint b, uint* result | undefined4 | FRAMEWORK: 32-bit add with carry | HIGH |
| 0x00604230 | small | ___add_12 | ___add_12 | undefined4* dst, undefined4* src | void | FRAMEWORK: 12-byte addition | HIGH |
| 0x006042E0 | small | ___shl_12 | ___shl_12 | int* ld12 | void | FRAMEWORK: 12-byte left shift by 1 | HIGH |
| 0x00604360 | small | ___shr_12 | ___shr_12 | uint* ld12 | void | FRAMEWORK: 12-byte right shift by 1 | HIGH |

### Cluster: CRT Time/Timezone

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x006002E0 | small | ___loctotime_t | ___loctotime_t | int yr, int mo, int dy, int hr, int mn, int sc, int dst | int | FRAMEWORK: Converts local time components to time_t | HIGH |
| 0x00603620 | stub | ___tzset | ___tzset | void | void | FRAMEWORK: Internal timezone set (one-time init) | HIGH |
| 0x00603650 | large | __tzset | __tzset | void | void | FRAMEWORK: CRT _tzset() -- reads TZ env var, sets timezone globals | HIGH |
| 0x006039B0 | large | __isindst | __isindst | tm* time | int | FRAMEWORK: Checks if time falls in DST period | HIGH |
| 0x00603D20 | medium | cvtdate | cvtdate | int, int, uint, int, int, int, int, int, int, int, int | void | FRAMEWORK: Converts timezone transition date to day-of-year | HIGH |

### Cluster: CRT Environment

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x00605AB0 | small | _getenv | _getenv | char* varname | char* | FRAMEWORK: CRT getenv() | HIGH |
| 0x00606B60 | large | ___crtsetenv | ___crtsetenv | char** option, int primary | int | FRAMEWORK: CRT internal setenv implementation | HIGH |
| 0x00606ED0 | small | findenv | findenv | uchar* name, size_t namelen | int | FRAMEWORK: Searches environment for variable | HIGH |
| 0x00606F70 | small | copy_environ | copy_environ | int* environ | int* | FRAMEWORK: Copies environment block | HIGH |

### Cluster: CRT Multibyte String

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x006061F0 | small | __mbsnbicoll | __mbsnbicoll | uchar* s1, uchar* s2, size_t maxcount | int | FRAMEWORK: Case-insensitive MBCS string collation | HIGH |
| 0x00607070 | small | __mbschr | __mbschr | uchar* str, uint ch | uchar* | FRAMEWORK: Finds character in MBCS string | HIGH |
| 0x00606AF0 | small | _strncnt | _strncnt | char* str, size_t maxcount | size_t | FRAMEWORK: Counts chars up to maxcount | HIGH |

### Cluster: CRT String Case Conversion

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x006076C0 | small | __strupr | __strupr | char* str | char* | FRAMEWORK: CRT _strupr() -- uppercase string in-place | HIGH |
| 0x006077F0 | small | __strlwr | __strlwr | char* str | char* | FRAMEWORK: CRT _strlwr() -- lowercase string in-place | HIGH |

### Cluster: CRT Miscellaneous

| Address | Size | Current Name | Proposed Name | Params | Returns | Description | Confidence |
|---------|------|-------------|---------------|--------|---------|-------------|------------|
| 0x006076A0 | stub | FUN_006076a0 | crt_get_struct_field_0x10 | int ptr | undefined4 | FRAMEWORK: Trivial accessor -- returns *(ptr+0x10). Likely CRT internal struct field getter | LOW |
| 0x00607920 | small | FID_conflict:__mkdir | __mkdir | char* path | int | FRAMEWORK: CRT _mkdir() -- creates directory | HIGH |

---

## SUMMARY

### 1. Total Functions: 93

| Category | Count | Percentage |
|----------|-------|------------|
| CRT Error Handling & Signals | 10 | 10.8% |
| CRT Integer/String Conversion | 7 | 7.5% |
| CRT Formatted I/O | 4 | 4.3% |
| CRT C++ Exception/Atexit | 2 | 2.2% |
| CRT Validation | 3 | 3.2% |
| CRT Unicode/MBCS String Type | 4 | 4.3% |
| CRT File Handle Management | 13 | 14.0% |
| CRT Character Conversion | 6 | 6.5% |
| CRT 64-bit Arithmetic | 2 | 2.2% |
| CRT Floating Point Control | 9 | 9.7% |
| CRT Long Double Mantissa | 7 | 7.5% |
| CRT Long Double Conversion | 10 | 10.8% |
| CRT String-to-Long-Double | 10 | 10.8% |
| CRT Time/Timezone | 5 | 5.4% |
| CRT Environment | 4 | 4.3% |
| CRT Multibyte String | 3 | 3.2% |
| CRT String Case Conversion | 2 | 2.2% |
| CRT Miscellaneous | 2 | 2.2% |
| **Total** | **93** | **100%** |

**Breakdown by size:**
- stub (<=20 lines): 24
- small (21-50 lines): 39
- medium (51-100 lines): 11
- large (101-300 lines): 7
- xlarge (>300 lines): 2

**All 93 functions are FRAMEWORK (CRT).** Zero game logic functions exist in this block.

### 2. Top 5 Most Important Undocumented Functions

**None.** This block contains no game logic whatsoever. The only two functions without Ghidra FID matches are:

1. **FUN_00601040** (0x00601040, 28 bytes) -- Trivially restores the unhandled exception filter saved in DAT_006e55ac. Pure CRT cleanup.
2. **FUN_006076a0** (0x006076A0, 22 bytes) -- Returns `*(param_1 + 0x10)`. A trivial struct field accessor, almost certainly CRT-internal (sits between CRT string functions __filelength and __strupr).

### 3. New DAT_ Globals Identified

No game-relevant globals. All DAT_ references in this block are CRT internal state:

| Global | Purpose | Confidence |
|--------|---------|------------|
| DAT_006e69f0 | CRT file handle table (ioinfo array of arrays) | HIGH |
| DAT_006e6b2c | CRT max file handle count | HIGH |
| DAT_006e55ac | Saved unhandled exception filter pointer | HIGH |
| DAT_006e5694 | CRT FILE* stream table | HIGH |
| DAT_006e69e0 | CRT max stream count | HIGH |
| DAT_006e55e0 | Timezone initialization flag | HIGH |
| DAT_006e55e8 | TIME_ZONE_INFORMATION struct | HIGH |
| DAT_0063b260 | Lazy-loaded MessageBoxA proc address | HIGH |
| DAT_0063b264 | Lazy-loaded GetActiveWindow proc address | HIGH |
| DAT_0063b268 | Lazy-loaded GetLastActivePopup proc address | HIGH |
| DAT_0063b26c | GetStringTypeW availability flag (W variant) | HIGH |
| DAT_0063b270 | GetStringTypeA availability flag (A variant) | HIGH |
| DAT_0063b69c | CompareStringW availability flag | HIGH |
| DAT_0063b2b0 | CRT _timezone global | HIGH |
| DAT_0063b2b8 | CRT _dstbias global | HIGH |
| DAT_0063a078 | CRT __lc_codepage (ANSI code page) | HIGH |
| DAT_0063a088 | CRT __lc_codepage (OEM code page) | HIGH |
| DAT_00639f3c | CRT environment pointer (__p__environ) | HIGH |
| DAT_00639f44 | CRT wide environment pointer (__p__wenviron) | HIGH |

**Recommendation:** This block can be skipped entirely in future analysis phases. It provides no insight into Civ2 game mechanics.
