# Block 0x0060 Audit (0x00600000–0x0060FFFF)

**Total functions: 103**
**Classification: FW=0, UI=0, GL=0, NET=0, LIB=103**

Legend: FW=Framework/MFC, UI=User Interface/Dialog, GL=Game Logic, NET=Network, LIB=Library/CRT stub

## Summary

All 103 functions in this block are Visual Studio 1998 C Runtime Library (CRT) functions. Every function is either explicitly tagged as "Library Function" by Ghidra's FID matcher or is an obvious CRT helper (e.g., FUN_00601040 restores an unhandled exception filter, FUN_006076a0 reads an internal CRT field). No game logic exists in this block.

Categories of CRT functions present:
- **Runtime error handling** (8): __NMSG_WRITE, __GET_RTERRMSG, _abort, _signal, ctrlevent_capture, _raise, siglookup, ___crtMessageBoxA
- **Integer/string conversion** (8): __itoa, xtoa, __ltoa, __ultoa, __i64toa, x64toa, __ui64toa, __fptostr
- **File I/O** (15): _fprintf, _setvbuf, __open, __sopen, __commit, __isatty, __fcloseall, __chsize, __filelength, __setmode, __alloc_osfhnd, __set_osfhnd, __free_osfhnd, __get_osfhandle, __open_osfhandle
- **C++ exception handling** (5): __CxxUnhandledExceptionFilter, $E1, $E2, FUN_00601040, FID_conflict:__mkdir
- **Validation** (3): _ValidateRead, _ValidateWrite, _ValidateExecute
- **String formatting** (2): __snprintf, __vsnprintf
- **Unicode/locale/string** (15): ___crtGetStringTypeW, ___crtGetStringTypeA, _wctomb, _wcslen, _wcstombs, wcsncnt (x2), ___crtCompareStringW, ___crtCompareStringA, _strncnt (x2), __strupr, __strlwr, __mbsnbicoll, __mbschr
- **Math/FP** (20): __aulldiv, __aullrem, __statusfp, __clearfp, __control87, __controlfp, __fpreset, __abstract_cw, __hw_cw, __abstract_sw, __fptrap, __ZeroTail, __IncMan, __RoundMan, __CopyMan, __FillZeroMan, __IsZeroMan, __ShrMan, __ld12cvt, __fltout
- **Long double conversion** (9): FID_conflict:__ld12tod (x2), __ld12told, FID_conflict:__atodbl (x2), __atoldbl, ___dtold, ___ld12mul, ___multtenpow12
- **Time/date** (4): ___loctotime_t, ___tzset, __tzset, __isindst, cvtdate
- **Arbitrary precision** (5): ___addl, ___add_12, ___shl_12, ___shr_12, ___mtold12
- **String-to-number** (3): ___strgtold12, ___STRINGTOLD, $I10_OUTPUT
- **Environment** (5): _getenv, ___wtomb_environ, ___crtsetenv, findenv, copy_environ

## Function Classifications

| # | Address | Name | Size | Class | Description |
|---|---------|------|------|-------|-------------|
| 1 | 0x00600040 | __NMSG_WRITE | 537 | LIB | CRT runtime error message writer — outputs error to stderr or MessageBox |
| 2 | 0x00600260 | __GET_RTERRMSG | 109 | LIB | CRT runtime error message lookup |
| 3 | 0x006002E0 | ___loctotime_t | 274 | LIB | CRT local time to time_t conversion |
| 4 | 0x00600400 | _abort | 41 | LIB | CRT abort() — writes message, raises SIGABRT, exits |
| 5 | 0x00600430 | _signal | 432 | LIB | CRT signal() — installs signal handler |
| 6 | 0x00600610 | ctrlevent_capture | 136 | LIB | CRT console control event handler (Ctrl+C/Break) |
| 7 | 0x006006A0 | _raise | 475 | LIB | CRT raise() — dispatches signal to installed handler |
| 8 | 0x006008C0 | siglookup | 99 | LIB | CRT signal handler table lookup |
| 9 | 0x00600930 | ___crtMessageBoxA | 223 | LIB | CRT MessageBox wrapper — loads user32.dll dynamically |
| 10 | 0x00600A10 | __itoa | 88 | LIB | CRT itoa — integer to ASCII string |
| 11 | 0x00600A70 | xtoa | 181 | LIB | CRT internal int-to-string conversion |
| 12 | 0x00600B30 | __ltoa | 85 | LIB | CRT ltoa — long to ASCII string |
| 13 | 0x00600B90 | __ultoa | 41 | LIB | CRT ultoa — unsigned long to ASCII |
| 14 | 0x00600BC0 | __i64toa | 102 | LIB | CRT i64toa — 64-bit int to ASCII |
| 15 | 0x00600C30 | x64toa | 216 | LIB | CRT internal 64-bit int-to-string conversion |
| 16 | 0x00600D10 | __ui64toa | 42 | LIB | CRT ui64toa — unsigned 64-bit int to ASCII |
| 17 | 0x00600D40 | _fprintf | 176 | LIB | CRT fprintf — formatted output to file |
| 18 | 0x00600DF0 | _setvbuf | 347 | LIB | CRT setvbuf — set stream buffering mode |
| 19 | 0x00600F50 | $E2 | 21 | LIB | CRT static initializer — calls $E1 |
| 20 | 0x00600F70 | $E1 | 45 | LIB | CRT static initializer — registers unhandled exception filter |
| 21 | 0x00600FA0 | __CxxUnhandledExceptionFilter | 135 | LIB | CRT C++ unhandled exception filter — calls terminate() for C++ exceptions |
| 22 | 0x00601040 | FUN_00601040 | 28 | LIB | CRT atexit callback — restores previous unhandled exception filter |
| 23 | 0x00601060 | _ValidateRead | 58 | LIB | CRT pointer validation — IsBadReadPtr wrapper |
| 24 | 0x006010A0 | _ValidateWrite | 58 | LIB | CRT pointer validation — IsBadWritePtr wrapper |
| 25 | 0x006010E0 | _ValidateExecute | 54 | LIB | CRT function pointer validation — IsBadCodePtr wrapper |
| 26 | 0x00601120 | __snprintf | 235 | LIB | CRT snprintf — bounded formatted output to buffer |
| 27 | 0x00601210 | __vsnprintf | 229 | LIB | CRT vsnprintf — bounded formatted output with va_list |
| 28 | 0x00601300 | ___crtGetStringTypeW | 607 | LIB | CRT Unicode string type query wrapper |
| 29 | 0x00601560 | ___crtGetStringTypeA | 406 | LIB | CRT ANSI string type query wrapper |
| 30 | 0x00601700 | __open | 67 | LIB | CRT open — file open (calls __sopen) |
| 31 | 0x00601750 | __sopen | 1355 | LIB | CRT sopen — shared file open with full mode/permission handling |
| 32 | 0x00601CF0 | __alloc_osfhnd | 333 | LIB | CRT OS file handle allocation |
| 33 | 0x00601E40 | __set_osfhnd | 234 | LIB | CRT set OS file handle in internal table |
| 34 | 0x00601F40 | __free_osfhnd | 263 | LIB | CRT free OS file handle from internal table |
| 35 | 0x00602060 | __get_osfhandle | 118 | LIB | CRT get OS file handle from fd |
| 36 | 0x006020E0 | __open_osfhandle | 256 | LIB | CRT associate OS handle with CRT fd |
| 37 | 0x006021E0 | __commit | 217 | LIB | CRT commit — flush file to disk (FlushFileBuffers) |
| 38 | 0x006022C0 | __isatty | 66 | LIB | CRT isatty — check if fd is a terminal |
| 39 | 0x00602310 | _wctomb | 198 | LIB | CRT wctomb — wide char to multibyte |
| 40 | 0x006023E0 | __aulldiv | 104 | LIB | CRT unsigned 64-bit division |
| 41 | 0x00602450 | __aullrem | 117 | LIB | CRT unsigned 64-bit remainder |
| 42 | 0x006024D0 | __fcloseall | 187 | LIB | CRT fcloseall — close all open streams |
| 43 | 0x00602590 | __statusfp | 35 | LIB | CRT FP status word read |
| 44 | 0x006025C0 | __clearfp | 36 | LIB | CRT clear FP exception flags |
| 45 | 0x006025F0 | __control87 | 79 | LIB | CRT FP control word set/get |
| 46 | 0x00602640 | __controlfp | 37 | LIB | CRT FP control word wrapper |
| 47 | 0x00602670 | __fpreset | 89 | LIB | CRT reset FP unit |
| 48 | 0x006026D0 | __abstract_cw | 308 | LIB | CRT abstract FP control word conversion |
| 49 | 0x00602820 | __hw_cw | 431 | LIB | CRT hardware FP control word conversion |
| 50 | 0x006029F0 | __abstract_sw | 116 | LIB | CRT abstract FP status word conversion |
| 51 | 0x00602A70 | __fptrap | 21 | LIB | CRT FP trap handler |
| 52 | 0x00602A90 | __ZeroTail | 153 | LIB | CRT FP mantissa zero-tail check |
| 53 | 0x00602B30 | __IncMan | 179 | LIB | CRT FP mantissa increment |
| 54 | 0x00602BF0 | __RoundMan | 220 | LIB | CRT FP mantissa rounding |
| 55 | 0x00602CD0 | __CopyMan | 74 | LIB | CRT FP mantissa copy |
| 56 | 0x00602D20 | __FillZeroMan | 57 | LIB | CRT FP mantissa zero fill |
| 57 | 0x00602D60 | __IsZeroMan | 77 | LIB | CRT FP mantissa zero check |
| 58 | 0x00602DB0 | __ShrMan | 235 | LIB | CRT FP mantissa shift right |
| 59 | 0x00602EA0 | __ld12cvt | 616 | LIB | CRT long double 12-byte conversion |
| 60 | 0x00603110 | FID_conflict:__ld12tod | 37 | LIB | CRT long double to double conversion (variant 1) |
| 61 | 0x00603140 | FID_conflict:__ld12tod | 37 | LIB | CRT long double to double conversion (variant 2) |
| 62 | 0x00603170 | __ld12told | 201 | LIB | CRT 12-byte to 10-byte long double conversion |
| 63 | 0x00603240 | FID_conflict:__atodbl | 58 | LIB | CRT string to double conversion (variant 1) |
| 64 | 0x00603280 | __atoldbl | 58 | LIB | CRT string to long double conversion |
| 65 | 0x006032C0 | FID_conflict:__atodbl | 58 | LIB | CRT string to double conversion (variant 2) |
| 66 | 0x00603300 | __fptostr | 215 | LIB | CRT FP to string internal conversion |
| 67 | 0x006033E0 | __fltout | 111 | LIB | CRT float output formatting |
| 68 | 0x00603450 | ___dtold | 375 | LIB | CRT double to long double conversion |
| 69 | 0x006035D0 | _wcslen | 66 | LIB | CRT wcslen — wide string length |
| 70 | 0x00603620 | ___tzset | 35 | LIB | CRT timezone set (public wrapper) |
| 71 | 0x00603650 | __tzset | 861 | LIB | CRT timezone set (internal — parses TZ env variable) |
| 72 | 0x006039B0 | __isindst | 859 | LIB | CRT DST check — is time in daylight savings |
| 73 | 0x00603D20 | cvtdate | 515 | LIB | CRT internal date conversion for DST rules |
| 74 | 0x00603F30 | __chsize | 675 | LIB | CRT chsize — change file size |
| 75 | 0x006041E0 | ___addl | 73 | LIB | CRT internal long addition |
| 76 | 0x00604230 | ___add_12 | 171 | LIB | CRT internal 12-byte addition |
| 77 | 0x006042E0 | ___shl_12 | 118 | LIB | CRT internal 12-byte left shift |
| 78 | 0x00604360 | ___shr_12 | 119 | LIB | CRT internal 12-byte right shift |
| 79 | 0x006043E0 | ___mtold12 | 312 | LIB | CRT mantissa to long double 12-byte |
| 80 | 0x00604520 | ___strgtold12 | 2795 | LIB | CRT string to long double 12-byte conversion |
| 81 | 0x00605140 | ___STRINGTOLD | 88 | LIB | CRT string to long double wrapper |
| 82 | 0x006051A0 | $I10_OUTPUT | 1335 | LIB | CRT internal decimal output formatting |
| 83 | 0x006056E0 | _wcstombs | 829 | LIB | CRT wcstombs — wide string to multibyte |
| 84 | 0x00605A40 | wcsncnt | 110 | LIB | CRT wide string bounded count (instance 1) |
| 85 | 0x00605AB0 | _getenv | 227 | LIB | CRT getenv — get environment variable |
| 86 | 0x00605BA0 | __setmode | 308 | LIB | CRT setmode — set file translation mode (text/binary) |
| 87 | 0x00605CE0 | ___ld12mul | 1063 | LIB | CRT internal 12-byte long double multiply |
| 88 | 0x00606110 | ___multtenpow12 | 216 | LIB | CRT multiply by power of 10 (12-byte) |
| 89 | 0x006061F0 | __mbsnbicoll | 103 | LIB | CRT multibyte string case-insensitive collation |
| 90 | 0x00606260 | ___wtomb_environ | 205 | LIB | CRT wide-to-multibyte environment string conversion |
| 91 | 0x00606330 | ___crtCompareStringW | 746 | LIB | CRT Unicode string comparison wrapper |
| 92 | 0x00606620 | wcsncnt | 108 | LIB | CRT wide string bounded count (instance 2) |
| 93 | 0x00606690 | ___crtCompareStringA | 1107 | LIB | CRT ANSI string comparison wrapper |
| 94 | 0x00606AF0 | _strncnt | 100 | LIB | CRT bounded string character count |
| 95 | 0x00606B60 | ___crtsetenv | 867 | LIB | CRT internal setenv — set environment variable |
| 96 | 0x00606ED0 | findenv | 155 | LIB | CRT internal environment variable search |
| 97 | 0x00606F70 | copy_environ | 255 | LIB | CRT copy environment block |
| 98 | 0x00607070 | __mbschr | 229 | LIB | CRT mbschr — multibyte string character search |
| 99 | 0x006075E0 | __filelength | 190 | LIB | CRT filelength — get file size via lseek |
| 100 | 0x006076A0 | FUN_006076a0 | 22 | LIB | CRT internal field accessor — reads offset+0x10 from CRT structure |
| 101 | 0x006076C0 | __strupr | 293 | LIB | CRT strupr — convert string to uppercase |
| 102 | 0x006077F0 | __strlwr | 293 | LIB | CRT strlwr — convert string to lowercase |
| 103 | 0x00607920 | FID_conflict:__mkdir | 94 | LIB | CRT mkdir — create directory (CreateDirectoryA wrapper) |

## Discrepancies

**GL functions: 0** — No game logic exists in this block. No discrepancies to report.
