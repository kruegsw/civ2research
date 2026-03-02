/*
 * IAT (Import Address Table) hooking for GDI32 and USER32 functions.
 *
 * When our DLL loads, we patch civ2.exe's import table so that calls
 * to BitBlt, StretchBlt, etc. go through our logging wrappers first.
 */
#include "ddraw_proxy.h"

/* ---- IAT patching machinery ---- */

static BOOL PatchIAT(HMODULE hModule, const char *targetDll,
                     void *originalFunc, void *hookFunc) {
    if (!hModule || !originalFunc || !hookFunc) return FALSE;

    BYTE *base = (BYTE*)hModule;
    IMAGE_DOS_HEADER *dos = (IMAGE_DOS_HEADER*)base;
    if (dos->e_magic != IMAGE_DOS_SIGNATURE) return FALSE;

    IMAGE_NT_HEADERS *nt = (IMAGE_NT_HEADERS*)(base + dos->e_lfanew);
    if (nt->Signature != IMAGE_NT_SIGNATURE) return FALSE;

    IMAGE_IMPORT_DESCRIPTOR *imports = (IMAGE_IMPORT_DESCRIPTOR*)
        (base + nt->OptionalHeader.DataDirectory[IMAGE_DIRECTORY_ENTRY_IMPORT].VirtualAddress);

    for (; imports->Name; imports++) {
        const char *dllName = (const char*)(base + imports->Name);
        if (_stricmp(dllName, targetDll) != 0) continue;

        IMAGE_THUNK_DATA *thunk = (IMAGE_THUNK_DATA*)(base + imports->FirstThunk);
        for (; thunk->u1.Function; thunk++) {
            if ((void*)(uintptr_t)thunk->u1.Function == originalFunc) {
                DWORD oldProtect;
                VirtualProtect(&thunk->u1.Function, sizeof(void*),
                              PAGE_EXECUTE_READWRITE, &oldProtect);
                thunk->u1.Function = (DWORD)(uintptr_t)hookFunc;
                VirtualProtect(&thunk->u1.Function, sizeof(void*),
                              oldProtect, &oldProtect);
                return TRUE;
            }
        }
    }
    return FALSE;
}

/* ---- Original function pointers ---- */

/* GDI32 */
typedef BOOL (WINAPI *PFN_BitBlt)(HDC, int, int, int, int, HDC, int, int, DWORD);
typedef BOOL (WINAPI *PFN_StretchBlt)(HDC, int, int, int, int, HDC, int, int, int, int, DWORD);
typedef BOOL (WINAPI *PFN_PatBlt)(HDC, int, int, int, int, DWORD);
typedef HBITMAP (WINAPI *PFN_CreateCompatibleBitmap)(HDC, int, int);
typedef HDC (WINAPI *PFN_CreateCompatibleDC)(HDC);
typedef BOOL (WINAPI *PFN_DeleteDC)(HDC);
typedef HGDIOBJ (WINAPI *PFN_SelectObject)(HDC, HGDIOBJ);
typedef HBITMAP (WINAPI *PFN_CreateDIBSection)(HDC, const BITMAPINFO*, UINT, void**, HANDLE, DWORD);
typedef HBITMAP (WINAPI *PFN_CreateBitmap)(int, int, UINT, UINT, const void*);
typedef int (WINAPI *PFN_SetDIBColorTable)(HDC, UINT, UINT, const RGBQUAD*);
typedef int (WINAPI *PFN_GetDIBColorTable)(HDC, UINT, UINT, RGBQUAD*);
typedef COLORREF (WINAPI *PFN_SetPixel)(HDC, int, int, COLORREF);
typedef int (WINAPI *PFN_SetBkMode)(HDC, int);
typedef COLORREF (WINAPI *PFN_SetTextColor)(HDC, COLORREF);
typedef COLORREF (WINAPI *PFN_SetBkColor)(HDC, COLORREF);
typedef BOOL (WINAPI *PFN_TextOutA)(HDC, int, int, LPCSTR, int);
typedef BOOL (WINAPI *PFN_ExtTextOutA)(HDC, int, int, UINT, const RECT*, LPCSTR, UINT, const INT*);
typedef UINT (WINAPI *PFN_SetTextAlign)(HDC, UINT);
typedef UINT (WINAPI *PFN_GetTextAlign)(HDC);
typedef BOOL (WINAPI *PFN_GetTextExtentPointA)(HDC, LPCSTR, int, LPSIZE);
typedef BOOL (WINAPI *PFN_MoveToEx)(HDC, int, int, LPPOINT);
typedef BOOL (WINAPI *PFN_LineTo)(HDC, int, int);
typedef HFONT (WINAPI *PFN_CreateFontIndirectA)(const LOGFONTA*);
typedef HPEN (WINAPI *PFN_CreatePen)(int, int, COLORREF);
typedef HBRUSH (WINAPI *PFN_CreateSolidBrush)(COLORREF);
typedef UINT (WINAPI *PFN_RealizePalette)(HDC);
typedef HPALETTE (WINAPI *PFN_SelectPalette)(HDC, HPALETTE, BOOL);
typedef HPALETTE (WINAPI *PFN_CreatePalette)(const LOGPALETTE*);
typedef UINT (WINAPI *PFN_SetPaletteEntries)(HPALETTE, UINT, UINT, const PALETTEENTRY*);
typedef UINT (WINAPI *PFN_GetPaletteEntries)(HPALETTE, UINT, UINT, PALETTEENTRY*);
typedef BOOL (WINAPI *PFN_AnimatePalette)(HPALETTE, UINT, UINT, const PALETTEENTRY*);
typedef UINT (WINAPI *PFN_GetSystemPaletteEntries)(HDC, UINT, UINT, PALETTEENTRY*);
typedef BOOL (WINAPI *PFN_GdiFlush)(void);

/* USER32 */
typedef HDC (WINAPI *PFN_GetDC)(HWND);
typedef int (WINAPI *PFN_ReleaseDC)(HWND, HDC);
typedef BOOL (WINAPI *PFN_InvalidateRect)(HWND, const RECT*, BOOL);
typedef HDC (WINAPI *PFN_BeginPaint)(HWND, LPPAINTSTRUCT);
typedef BOOL (WINAPI *PFN_EndPaint)(HWND, const PAINTSTRUCT*);
typedef BOOL (WINAPI *PFN_ShowWindow)(HWND, int);
typedef BOOL (WINAPI *PFN_MoveWindow)(HWND, int, int, int, int, BOOL);
typedef BOOL (WINAPI *PFN_SetWindowPos)(HWND, HWND, int, int, int, int, UINT);
typedef int (WINAPI *PFN_DrawTextA)(HDC, LPCSTR, int, LPRECT, UINT);
typedef int (WINAPI *PFN_FillRect)(HDC, const RECT*, HBRUSH);
typedef int (WINAPI *PFN_FrameRect)(HDC, const RECT*, HBRUSH);

/* GDI32 originals */
static PFN_BitBlt                   orig_BitBlt;
static PFN_StretchBlt               orig_StretchBlt;
static PFN_PatBlt                   orig_PatBlt;
static PFN_CreateCompatibleBitmap   orig_CreateCompatibleBitmap;
static PFN_CreateCompatibleDC       orig_CreateCompatibleDC;
static PFN_DeleteDC                 orig_DeleteDC;
static PFN_SelectObject             orig_SelectObject;
static PFN_CreateDIBSection         orig_CreateDIBSection;
static PFN_CreateBitmap             orig_CreateBitmap;
static PFN_SetDIBColorTable         orig_SetDIBColorTable;
static PFN_GetDIBColorTable         orig_GetDIBColorTable;
static PFN_SetPixel                 orig_SetPixel;
static PFN_SetBkMode                orig_SetBkMode;
static PFN_SetTextColor             orig_SetTextColor;
static PFN_SetBkColor               orig_SetBkColor;
static PFN_TextOutA                 orig_TextOutA;
static PFN_ExtTextOutA              orig_ExtTextOutA;
static PFN_SetTextAlign             orig_SetTextAlign;
static PFN_GetTextExtentPointA      orig_GetTextExtentPointA;
static PFN_MoveToEx                 orig_MoveToEx;
static PFN_LineTo                   orig_LineTo;
static PFN_CreateFontIndirectA      orig_CreateFontIndirectA;
static PFN_CreatePen                orig_CreatePen;
static PFN_CreateSolidBrush         orig_CreateSolidBrush;
static PFN_RealizePalette           orig_RealizePalette;
static PFN_SelectPalette            orig_SelectPalette;
static PFN_CreatePalette            orig_CreatePalette;
static PFN_SetPaletteEntries        orig_SetPaletteEntries;
static PFN_GetPaletteEntries        orig_GetPaletteEntries;
static PFN_AnimatePalette           orig_AnimatePalette;
static PFN_GetSystemPaletteEntries  orig_GetSystemPaletteEntries;
static PFN_GdiFlush                 orig_GdiFlush;

/* USER32 originals */
static PFN_GetDC                    orig_GetDC;
static PFN_ReleaseDC                orig_ReleaseDC;
static PFN_InvalidateRect           orig_InvalidateRect;
static PFN_BeginPaint               orig_BeginPaint;
static PFN_EndPaint                 orig_EndPaint;
static PFN_ShowWindow               orig_ShowWindow;
static PFN_MoveWindow               orig_MoveWindow;
static PFN_SetWindowPos             orig_SetWindowPos;
static PFN_DrawTextA                orig_DrawTextA;
static PFN_FillRect                 orig_FillRect;
static PFN_FrameRect                orig_FrameRect;

/* ---- DC tracking ---- */

#define MAX_DCS 256
typedef struct {
    HDC hdc;
    char tag[80];
} DCInfo;
static DCInfo g_dcs[MAX_DCS];
static int g_dcCount = 0;

static void TrackDC(HDC hdc, const char *tag) {
    for (int i = 0; i < g_dcCount; i++) {
        if (g_dcs[i].hdc == hdc) {
            strncpy(g_dcs[i].tag, tag, sizeof(g_dcs[i].tag) - 1);
            return;
        }
    }
    if (g_dcCount < MAX_DCS) {
        g_dcs[g_dcCount].hdc = hdc;
        strncpy(g_dcs[g_dcCount].tag, tag, sizeof(g_dcs[g_dcCount].tag) - 1);
        g_dcCount++;
    }
}

static const char* DCTag(HDC hdc) {
    for (int i = 0; i < g_dcCount; i++) {
        if (g_dcs[i].hdc == hdc) return g_dcs[i].tag;
    }
    return "?";
}

/* ---- Window class name helper ---- */

static const char* GetWindowTag(HWND hwnd) {
    static char buf[128];
    if (!hwnd) return "NULL";
    char cls[64] = {0};
    GetClassNameA(hwnd, cls, sizeof(cls));
    /* Also get window rect for size info */
    RECT wr;
    GetWindowRect(hwnd, &wr);
    snprintf(buf, sizeof(buf), "%s(%dx%d)", cls,
             wr.right - wr.left, wr.bottom - wr.top);
    return buf;
}

/* ---- ROP code name helper ---- */

static const char* RopName(DWORD rop) {
    switch (rop) {
        case 0x00CC0020: return "SRCCOPY";
        case 0x008800C6: return "SRCAND";
        case 0x00660046: return "SRCINVERT";
        case 0x00EE0086: return "SRCPAINT";
        case 0x00BB0226: return "MERGEPAINT";
        case 0x001100A6: return "NOTSRCERASE";
        case 0x00440328: return "SRCERASE";
        case 0x00330008: return "NOTSRCCOPY";
        case 0x00AA0029: return "DSTINVERT";
        case 0x005A0049: return "PATINVERT";
        case 0x00FB0A09: return "PATPAINT";
        case 0x00C000CA: return "MERGECOPY";
        case 0x00F00021: return "PATCOPY";
        case 0x00000042: return "BLACKNESS";
        case 0x00FF0062: return "WHITENESS";
        default: return NULL;
    }
}

/* ---- DIB Section tracking for frame dump ---- */

#define MAX_TRACKED_DIBS 32
typedef struct {
    HBITMAP hbmp;
    void   *bits;
    int     width;
    int     height;       /* positive = bottom-up (standard BMP order) */
    int     bpp;
    HDC     currentDC;    /* DC this bitmap is currently selected into */
    RGBQUAD palette[256];
    BOOL    hasPalette;
} TrackedDIB;

static TrackedDIB g_trackedDibs[MAX_TRACKED_DIBS];
static int g_trackedDibCount = 0;
static DWORD g_dumpCounter = 0;

/* Minimum blit width to trigger a dump (filters out button/icon blits) */
#define DIB_DUMP_MIN_WIDTH 600

static TrackedDIB* FindDIBByBitmap(HBITMAP hbmp) {
    for (int i = 0; i < g_trackedDibCount; i++)
        if (g_trackedDibs[i].hbmp == hbmp) return &g_trackedDibs[i];
    return NULL;
}

static TrackedDIB* FindDIBByDC(HDC hdc) {
    for (int i = 0; i < g_trackedDibCount; i++)
        if (g_trackedDibs[i].currentDC == hdc) return &g_trackedDibs[i];
    return NULL;
}

static void DumpDIBToBMP(TrackedDIB *dib, int bltW, int bltH) {
    if (!dib || !dib->bits || !dib->hasPalette || dib->bpp != 8) return;

    CreateDirectoryA("ddraw_dumps", NULL);

    char filename[128];
    snprintf(filename, sizeof(filename), "ddraw_dumps/frame_%04lu_%dx%d.bmp",
             g_dumpCounter++, dib->width, dib->height);

    FILE *f = fopen(filename, "wb");
    if (!f) {
        LogWrite("DIB_DUMP: FAILED to open %s", filename);
        return;
    }

    int absHeight = dib->height < 0 ? -dib->height : dib->height;
    int stride = ((dib->width + 3) & ~3);   /* 8bpp: row bytes, 4-byte aligned */
    int paletteSize = 256 * (int)sizeof(RGBQUAD);
    int pixelDataSize = stride * absHeight;
    int dataOffset = 14 + 40 + paletteSize;
    int fileSize = dataOffset + pixelDataSize;

    /* BITMAPFILEHEADER (14 bytes, packed manually to avoid struct padding) */
    BYTE bfh[14] = {0};
    bfh[0] = 'B'; bfh[1] = 'M';
    *(DWORD*)(bfh + 2) = (DWORD)fileSize;
    *(DWORD*)(bfh + 10) = (DWORD)dataOffset;
    fwrite(bfh, 1, 14, f);

    /* BITMAPINFOHEADER */
    BITMAPINFOHEADER bih;
    memset(&bih, 0, sizeof(bih));
    bih.biSize = sizeof(BITMAPINFOHEADER);
    bih.biWidth = dib->width;
    bih.biHeight = absHeight;  /* positive = bottom-up (standard BMP) */
    bih.biPlanes = 1;
    bih.biBitCount = 8;
    bih.biCompression = BI_RGB;
    bih.biSizeImage = (DWORD)pixelDataSize;
    fwrite(&bih, 1, sizeof(bih), f);

    /* Color table (RGBQUAD × 256) */
    fwrite(dib->palette, 1, (size_t)paletteSize, f);

    /* Pixel data — DIB section memory is already in bottom-up order for
       positive biHeight, which matches BMP format directly.
       For negative biHeight (top-down), we need to flip rows. */
    if (dib->height >= 0) {
        /* Bottom-up DIB → write directly */
        fwrite(dib->bits, 1, (size_t)pixelDataSize, f);
    } else {
        /* Top-down DIB → reverse row order for BMP */
        BYTE *src = (BYTE*)dib->bits;
        for (int row = absHeight - 1; row >= 0; row--)
            fwrite(src + row * stride, 1, (size_t)stride, f);
    }

    fclose(f);
    LogWrite("DIB_DUMP: Saved %s (%dx%d 8bpp, blt=%dx%d)",
             filename, dib->width, absHeight, bltW, bltH);
}

/* ---- Counters ---- */
static DWORD g_bltCount = 0;

/* ======== GDI HOOK IMPLEMENTATIONS ======== */

static BOOL WINAPI Hook_BitBlt(HDC dst, int dx, int dy, int w, int h,
                                HDC src, int sx, int sy, DWORD rop) {
    g_bltCount++;
    const char *ropStr = RopName(rop);
    if (ropStr)
        LogWrite("GDI::BitBlt #%lu dst=%s(%p) pos=(%d,%d) size=%dx%d src=%s(%p) srcPos=(%d,%d) %s",
                 g_bltCount, DCTag(dst), dst, dx, dy, w, h, DCTag(src), src, sx, sy, ropStr);
    else
        LogWrite("GDI::BitBlt #%lu dst=%s(%p) pos=(%d,%d) size=%dx%d src=%s(%p) srcPos=(%d,%d) rop=0x%08lX",
                 g_bltCount, DCTag(dst), dst, dx, dy, w, h, DCTag(src), src, sx, sy, rop);

    /* DIB frame dump: on large SRCCOPY from a tracked DIB to a window/paint DC */
    if (rop == 0x00CC0020 && w >= DIB_DUMP_MIN_WIDTH) { /* SRCCOPY */
        const char *dstTag = DCTag(dst);
        if (strncmp(dstTag, "winDC_", 6) == 0 || strncmp(dstTag, "paintDC_", 8) == 0) {
            TrackedDIB *dib = FindDIBByDC(src);
            if (dib && dib->hasPalette)
                DumpDIBToBMP(dib, w, h);
        }
    }

    return orig_BitBlt(dst, dx, dy, w, h, src, sx, sy, rop);
}

static BOOL WINAPI Hook_StretchBlt(HDC dst, int dx, int dy, int dw, int dh,
                                    HDC src, int sx, int sy, int sw, int sh, DWORD rop) {
    const char *ropStr = RopName(rop);
    LogWrite("GDI::StretchBlt dst=%s(%p) dstRect=(%d,%d %dx%d) src=%s(%p) srcRect=(%d,%d %dx%d) %s",
             DCTag(dst), dst, dx, dy, dw, dh, DCTag(src), src, sx, sy, sw, sh,
             ropStr ? ropStr : "rop=?");
    return orig_StretchBlt(dst, dx, dy, dw, dh, src, sx, sy, sw, sh, rop);
}

static BOOL WINAPI Hook_PatBlt(HDC hdc, int x, int y, int w, int h, DWORD rop) {
    const char *ropStr = RopName(rop);
    LogWrite("GDI::PatBlt dc=%s(%p) pos=(%d,%d) size=%dx%d %s",
             DCTag(hdc), hdc, x, y, w, h, ropStr ? ropStr : "rop=?");
    return orig_PatBlt(hdc, x, y, w, h, rop);
}

static HBITMAP WINAPI Hook_CreateCompatibleBitmap(HDC hdc, int w, int h) {
    HBITMAP bmp = orig_CreateCompatibleBitmap(hdc, w, h);
    LogWrite("GDI::CreateCompatibleBitmap dc=%s(%p) %dx%d -> bmp=%p",
             DCTag(hdc), hdc, w, h, bmp);
    return bmp;
}

static HDC WINAPI Hook_CreateCompatibleDC(HDC hdc) {
    HDC newdc = orig_CreateCompatibleDC(hdc);
    char tag[80];
    snprintf(tag, sizeof(tag), "compatDC_%p(from_%s)", newdc, DCTag(hdc));
    TrackDC(newdc, tag);
    LogWrite("GDI::CreateCompatibleDC src=%s(%p) -> %s(%p)", DCTag(hdc), hdc, tag, newdc);
    return newdc;
}

static BOOL WINAPI Hook_DeleteDC(HDC hdc) {
    LogWrite("GDI::DeleteDC %s(%p)", DCTag(hdc), hdc);
    return orig_DeleteDC(hdc);
}

static HGDIOBJ WINAPI Hook_SelectObject(HDC hdc, HGDIOBJ obj) {
    DWORD objType = GetObjectType(obj);
    if (objType == OBJ_BITMAP) {
        BITMAP bm;
        if (GetObject(obj, sizeof(bm), &bm)) {
            LogWrite("GDI::SelectObject dc=%s(%p) BITMAP %p (%ldx%ld %dbpp)",
                     DCTag(hdc), hdc, obj, bm.bmWidth, bm.bmHeight, bm.bmBitsPixel);
        } else {
            LogWrite("GDI::SelectObject dc=%s(%p) BITMAP %p", DCTag(hdc), hdc, obj);
        }
        /* Update DIB tracking: associate this bitmap with the DC */
        TrackedDIB *dib = FindDIBByBitmap((HBITMAP)obj);
        if (dib) dib->currentDC = hdc;
    } else if (objType == OBJ_FONT) {
        LOGFONTA lf;
        if (GetObjectA(obj, sizeof(lf), &lf)) {
            LogWrite("GDI::SelectObject dc=%s(%p) FONT %p \"%s\" h=%ld w=%ld wt=%ld",
                     DCTag(hdc), hdc, obj, lf.lfFaceName, lf.lfHeight, lf.lfWidth, lf.lfWeight);
        }
    } else if (objType == OBJ_PEN) {
        LOGPEN lp;
        if (GetObject(obj, sizeof(lp), &lp)) {
            LogWrite("GDI::SelectObject dc=%s(%p) PEN %p style=%u width=%ld color=0x%06lX",
                     DCTag(hdc), hdc, obj, lp.lopnStyle, lp.lopnWidth.x, lp.lopnColor);
        }
    } else if (objType == OBJ_BRUSH) {
        LOGBRUSH lb;
        if (GetObject(obj, sizeof(lb), &lb)) {
            LogWrite("GDI::SelectObject dc=%s(%p) BRUSH %p style=%u color=0x%06lX",
                     DCTag(hdc), hdc, obj, lb.lbStyle, lb.lbColor);
        }
    }
    return orig_SelectObject(hdc, obj);
}

static HBITMAP WINAPI Hook_CreateDIBSection(HDC hdc, const BITMAPINFO *bmi,
                                             UINT usage, void **bits,
                                             HANDLE hSection, DWORD offset) {
    HBITMAP bmp = orig_CreateDIBSection(hdc, bmi, usage, bits, hSection, offset);
    if (bmi) {
        LogWrite("GDI::CreateDIBSection dc=%s(%p) %ldx%ld %dbpp usage=%u -> bmp=%p bits=%p",
                 DCTag(hdc), hdc,
                 bmi->bmiHeader.biWidth, bmi->bmiHeader.biHeight,
                 bmi->bmiHeader.biBitCount, usage, bmp, bits ? *bits : NULL);

        /* Track DIB sections for frame dumping — only large ones worth dumping */
        if (bmp && bits && *bits && bmi->bmiHeader.biBitCount == 8
            && bmi->bmiHeader.biWidth >= DIB_DUMP_MIN_WIDTH
            && g_trackedDibCount < MAX_TRACKED_DIBS) {
            TrackedDIB *dib = &g_trackedDibs[g_trackedDibCount++];
            dib->hbmp = bmp;
            dib->bits = *bits;
            dib->width = bmi->bmiHeader.biWidth;
            dib->height = bmi->bmiHeader.biHeight;
            dib->bpp = bmi->bmiHeader.biBitCount;
            dib->currentDC = NULL;
            dib->hasPalette = FALSE;
            LogWrite("  DIB_TRACK: Registered DIB #%d (%dx%d 8bpp bits=%p)",
                     g_trackedDibCount - 1, dib->width, dib->height, dib->bits);
        }
    }
    return bmp;
}

static HBITMAP WINAPI Hook_CreateBitmap(int w, int h, UINT planes, UINT bpp, const void *bits) {
    HBITMAP bmp = orig_CreateBitmap(w, h, planes, bpp, bits);
    LogWrite("GDI::CreateBitmap %dx%d planes=%u bpp=%u bits=%p -> bmp=%p",
             w, h, planes, bpp, bits, bmp);
    return bmp;
}

static int WINAPI Hook_SetDIBColorTable(HDC hdc, UINT start, UINT count,
                                         const RGBQUAD *colors) {
    LogWrite("GDI::SetDIBColorTable dc=%s(%p) start=%u count=%u", DCTag(hdc), hdc, start, count);
    /* Dump full palette when 256 entries are set */
    if (colors && count == 256 && start == 0) {
        LogWrite("  === FULL 256-COLOR PALETTE ===");
        for (UINT i = 0; i < 256; i += 8) {
            LogWrite("  [%3u] (%3d,%3d,%3d) (%3d,%3d,%3d) (%3d,%3d,%3d) (%3d,%3d,%3d) (%3d,%3d,%3d) (%3d,%3d,%3d) (%3d,%3d,%3d) (%3d,%3d,%3d)",
                     i,
                     colors[i].rgbRed, colors[i].rgbGreen, colors[i].rgbBlue,
                     colors[i+1].rgbRed, colors[i+1].rgbGreen, colors[i+1].rgbBlue,
                     colors[i+2].rgbRed, colors[i+2].rgbGreen, colors[i+2].rgbBlue,
                     colors[i+3].rgbRed, colors[i+3].rgbGreen, colors[i+3].rgbBlue,
                     colors[i+4].rgbRed, colors[i+4].rgbGreen, colors[i+4].rgbBlue,
                     colors[i+5].rgbRed, colors[i+5].rgbGreen, colors[i+5].rgbBlue,
                     colors[i+6].rgbRed, colors[i+6].rgbGreen, colors[i+6].rgbBlue,
                     colors[i+7].rgbRed, colors[i+7].rgbGreen, colors[i+7].rgbBlue);
        }
        LogWrite("  === END PALETTE ===");
    } else if (colors && count >= 4) {
        LogWrite("  colors[%u..%u]: (%d,%d,%d) (%d,%d,%d) (%d,%d,%d) (%d,%d,%d)",
                 start, start + 3,
                 colors[0].rgbRed, colors[0].rgbGreen, colors[0].rgbBlue,
                 colors[1].rgbRed, colors[1].rgbGreen, colors[1].rgbBlue,
                 colors[2].rgbRed, colors[2].rgbGreen, colors[2].rgbBlue,
                 colors[3].rgbRed, colors[3].rgbGreen, colors[3].rgbBlue);
    }
    int result = orig_SetDIBColorTable(hdc, start, count, colors);

    /* Capture palette for tracked DIB sections */
    if (colors && count == 256 && start == 0) {
        TrackedDIB *dib = FindDIBByDC(hdc);
        if (dib) {
            memcpy(dib->palette, colors, 256 * sizeof(RGBQUAD));
            dib->hasPalette = TRUE;
            LogWrite("  DIB_TRACK: Captured palette for DIB %dx%d on dc=%p",
                     dib->width, dib->height, hdc);
        }
    }

    return result;
}

static int WINAPI Hook_GetDIBColorTable(HDC hdc, UINT start, UINT count, RGBQUAD *colors) {
    int result = orig_GetDIBColorTable(hdc, start, count, colors);
    LogWrite("GDI::GetDIBColorTable dc=%s(%p) start=%u count=%u -> %d entries",
             DCTag(hdc), hdc, start, count, result);
    return result;
}

static COLORREF WINAPI Hook_SetPixel(HDC hdc, int x, int y, COLORREF color) {
    static DWORD s_setPixelCount = 0;
    s_setPixelCount++;
    if ((s_setPixelCount & 0xFF) == 1) {
        LogWrite("GDI::SetPixel dc=%s(%p) (%d,%d) color=0x%06lX (sample, count=%lu)",
                 DCTag(hdc), hdc, x, y, color, s_setPixelCount);
    }
    return orig_SetPixel(hdc, x, y, color);
}

/* ---- TEXT OUTPUT (the key missing hooks) ---- */

static BOOL WINAPI Hook_TextOutA(HDC hdc, int x, int y, LPCSTR text, int count) {
    char preview[128];
    int len = (count > 0 && count < 120) ? count : 0;
    if (text && len > 0) {
        memcpy(preview, text, len);
        preview[len] = '\0';
    } else if (text) {
        strncpy(preview, text, 120);
        preview[120] = '\0';
    } else {
        preview[0] = '\0';
    }
    LogWrite("GDI::TextOutA dc=%s(%p) pos=(%d,%d) len=%d \"%s\"",
             DCTag(hdc), hdc, x, y, count, preview);
    return orig_TextOutA(hdc, x, y, text, count);
}

static BOOL WINAPI Hook_ExtTextOutA(HDC hdc, int x, int y, UINT options,
                                     const RECT *clipRect, LPCSTR text, UINT count,
                                     const INT *dx) {
    char preview[128];
    UINT len = (count > 0 && count < 120) ? count : 0;
    if (text && len > 0) {
        memcpy(preview, text, len);
        preview[len] = '\0';
    } else if (text && count == 0) {
        /* count=0 might mean null-terminated */
        strncpy(preview, text, 120);
        preview[120] = '\0';
    } else {
        preview[0] = '\0';
    }
    LogWrite("GDI::ExtTextOutA dc=%s(%p) pos=(%d,%d) opts=0x%X len=%u \"%s\"",
             DCTag(hdc), hdc, x, y, options, count, preview);
    if (clipRect) LogRect("clipRect", clipRect);
    return orig_ExtTextOutA(hdc, x, y, options, clipRect, text, count, dx);
}

static int WINAPI Hook_DrawTextA(HDC hdc, LPCSTR text, int count,
                                  LPRECT rect, UINT format) {
    char preview[128];
    int len = (count > 0 && count < 120) ? count : (text ? (int)strlen(text) : 0);
    if (len > 120) len = 120;
    if (text && len > 0) {
        memcpy(preview, text, len);
        preview[len] = '\0';
    } else {
        preview[0] = '\0';
    }
    LogWrite("GDI::DrawTextA dc=%s(%p) format=0x%X \"%s\"", DCTag(hdc), hdc, format, preview);
    if (rect) LogRect("rect", rect);
    return orig_DrawTextA(hdc, text, count, rect, format);
}

static UINT WINAPI Hook_SetTextAlign(HDC hdc, UINT align) {
    const char *h = (align & TA_CENTER) ? "CENTER" : (align & TA_RIGHT) ? "RIGHT" : "LEFT";
    const char *v = (align & TA_BOTTOM) ? "BOTTOM" : (align & TA_BASELINE) ? "BASELINE" : "TOP";
    LogWrite("GDI::SetTextAlign dc=%s(%p) %s|%s (0x%X)", DCTag(hdc), hdc, h, v, align);
    return orig_SetTextAlign(hdc, align);
}

static BOOL WINAPI Hook_GetTextExtentPointA(HDC hdc, LPCSTR text, int count, LPSIZE size) {
    BOOL result = orig_GetTextExtentPointA(hdc, text, count, size);
    char preview[64];
    int len = (count > 0 && count < 60) ? count : 0;
    if (text && len > 0) {
        memcpy(preview, text, len);
        preview[len] = '\0';
    } else {
        preview[0] = '\0';
    }
    if (result && size) {
        LogWrite("GDI::GetTextExtentPointA dc=%s(%p) \"%s\" -> %ldx%ld",
                 DCTag(hdc), hdc, preview, size->cx, size->cy);
    }
    return result;
}

/* ---- DRAWING PRIMITIVES ---- */

static BOOL WINAPI Hook_MoveToEx(HDC hdc, int x, int y, LPPOINT prev) {
    LogWrite("GDI::MoveToEx dc=%s(%p) (%d,%d)", DCTag(hdc), hdc, x, y);
    return orig_MoveToEx(hdc, x, y, prev);
}

static BOOL WINAPI Hook_LineTo(HDC hdc, int x, int y) {
    LogWrite("GDI::LineTo dc=%s(%p) (%d,%d)", DCTag(hdc), hdc, x, y);
    return orig_LineTo(hdc, x, y);
}

static HPEN WINAPI Hook_CreatePen(int style, int width, COLORREF color) {
    HPEN pen = orig_CreatePen(style, width, color);
    const char *styleName =
        style == PS_SOLID ? "SOLID" :
        style == PS_DASH ? "DASH" :
        style == PS_DOT ? "DOT" :
        style == PS_NULL ? "NULL" : "?";
    LogWrite("GDI::CreatePen style=%s width=%d color=0x%06lX -> %p",
             styleName, width, color, pen);
    return pen;
}

static HBRUSH WINAPI Hook_CreateSolidBrush(COLORREF color) {
    HBRUSH brush = orig_CreateSolidBrush(color);
    LogWrite("GDI::CreateSolidBrush color=0x%06lX -> %p", color, brush);
    return brush;
}

static HFONT WINAPI Hook_CreateFontIndirectA(const LOGFONTA *lf) {
    HFONT font = orig_CreateFontIndirectA(lf);
    if (lf) {
        LogWrite("GDI::CreateFontIndirectA \"%s\" h=%ld w=%ld weight=%ld italic=%d charset=%d -> %p",
                 lf->lfFaceName, lf->lfHeight, lf->lfWidth, lf->lfWeight,
                 lf->lfItalic, lf->lfCharSet, font);
    }
    return font;
}

/* ---- FILL / STYLE ---- */

static int WINAPI Hook_SetBkMode(HDC hdc, int mode) {
    LogWrite("GDI::SetBkMode dc=%s(%p) mode=%s", DCTag(hdc), hdc,
             mode == TRANSPARENT ? "TRANSPARENT" : mode == OPAQUE ? "OPAQUE" : "?");
    return orig_SetBkMode(hdc, mode);
}

static COLORREF WINAPI Hook_SetTextColor(HDC hdc, COLORREF color) {
    LogWrite("GDI::SetTextColor dc=%s(%p) color=0x%06lX", DCTag(hdc), hdc, color);
    return orig_SetTextColor(hdc, color);
}

static COLORREF WINAPI Hook_SetBkColor(HDC hdc, COLORREF color) {
    LogWrite("GDI::SetBkColor dc=%s(%p) color=0x%06lX", DCTag(hdc), hdc, color);
    return orig_SetBkColor(hdc, color);
}

static int WINAPI Hook_FillRect(HDC hdc, const RECT *rect, HBRUSH brush) {
    LogWrite("GDI::FillRect dc=%s(%p) brush=%p", DCTag(hdc), hdc, brush);
    if (rect) LogRect("rect", rect);
    return orig_FillRect(hdc, rect, brush);
}

static int WINAPI Hook_FrameRect(HDC hdc, const RECT *rect, HBRUSH brush) {
    LogWrite("GDI::FrameRect dc=%s(%p) brush=%p", DCTag(hdc), hdc, brush);
    if (rect) LogRect("rect", rect);
    return orig_FrameRect(hdc, rect, brush);
}

/* ---- PALETTE ---- */

static HPALETTE WINAPI Hook_CreatePalette(const LOGPALETTE *lp) {
    HPALETTE pal = orig_CreatePalette(lp);
    if (lp) {
        LogWrite("GDI::CreatePalette version=%u numEntries=%u -> %p",
                 lp->palVersion, lp->palNumEntries, pal);
        /* Dump all entries */
        if (lp->palNumEntries > 0) {
            LogWrite("  === PALETTE ENTRIES ===");
            for (WORD i = 0; i < lp->palNumEntries && i < 256; i += 8) {
                int n = lp->palNumEntries - i;
                if (n > 8) n = 8;
                char line[256];
                int pos = snprintf(line, sizeof(line), "  [%3u]", i);
                for (int j = 0; j < n; j++) {
                    pos += snprintf(line + pos, sizeof(line) - pos, " (%3d,%3d,%3d)",
                                    lp->palPalEntry[i+j].peRed,
                                    lp->palPalEntry[i+j].peGreen,
                                    lp->palPalEntry[i+j].peBlue);
                }
                LogWrite("%s", line);
            }
            LogWrite("  === END PALETTE ===");
        }
    }
    return pal;
}

static UINT WINAPI Hook_RealizePalette(HDC hdc) {
    UINT result = orig_RealizePalette(hdc);
    LogWrite("GDI::RealizePalette dc=%s(%p) -> %u entries changed", DCTag(hdc), hdc, result);
    return result;
}

static HPALETTE WINAPI Hook_SelectPalette(HDC hdc, HPALETTE pal, BOOL forceBackground) {
    LogWrite("GDI::SelectPalette dc=%s(%p) palette=%p forceBg=%d", DCTag(hdc), hdc, pal, forceBackground);
    return orig_SelectPalette(hdc, pal, forceBackground);
}

static UINT WINAPI Hook_SetPaletteEntries(HPALETTE pal, UINT start, UINT count,
                                           const PALETTEENTRY *entries) {
    LogWrite("GDI::SetPaletteEntries palette=%p start=%u count=%u", pal, start, count);
    if (entries && count > 0) {
        UINT show = count < 8 ? count : 8;
        for (UINT i = 0; i < show; i++) {
            LogWrite("  [%u] = (%d,%d,%d) flags=0x%02X",
                     start + i, entries[i].peRed, entries[i].peGreen, entries[i].peBlue, entries[i].peFlags);
        }
        if (count > 8) LogWrite("  ... (%u more entries)", count - 8);
    }
    return orig_SetPaletteEntries(pal, start, count, entries);
}

static UINT WINAPI Hook_GetPaletteEntries(HPALETTE pal, UINT start, UINT count,
                                           PALETTEENTRY *entries) {
    UINT result = orig_GetPaletteEntries(pal, start, count, entries);
    LogWrite("GDI::GetPaletteEntries palette=%p start=%u count=%u -> %u", pal, start, count, result);
    return result;
}

static BOOL WINAPI Hook_AnimatePalette(HPALETTE pal, UINT start, UINT count,
                                        const PALETTEENTRY *entries) {
    LogWrite("GDI::AnimatePalette palette=%p start=%u count=%u", pal, start, count);
    if (entries && count > 0) {
        UINT show = count < 4 ? count : 4;
        for (UINT i = 0; i < show; i++) {
            LogWrite("  [%u] = (%d,%d,%d)", start + i,
                     entries[i].peRed, entries[i].peGreen, entries[i].peBlue);
        }
    }
    return orig_AnimatePalette(pal, start, count, entries);
}

static UINT WINAPI Hook_GetSystemPaletteEntries(HDC hdc, UINT start, UINT count,
                                                  PALETTEENTRY *entries) {
    UINT result = orig_GetSystemPaletteEntries(hdc, start, count, entries);
    LogWrite("GDI::GetSystemPaletteEntries dc=%s(%p) start=%u count=%u -> %u",
             DCTag(hdc), hdc, start, count, result);
    return result;
}

static BOOL WINAPI Hook_GdiFlush(void) {
    /* Suppress - called 700K+ times per session, pure noise */
    return orig_GdiFlush();
}

/* ======== USER32 HOOK IMPLEMENTATIONS ======== */

static HDC WINAPI Hook_GetDC(HWND hwnd) {
    HDC hdc = orig_GetDC(hwnd);
    /* Suppress the extremely noisy GetDC(NULL) calls used for font measurement */
    if (hwnd == NULL) return hdc;
    char tag[80];
    const char *wndTag = GetWindowTag(hwnd);
    snprintf(tag, sizeof(tag), "winDC_%p(%s)", hdc, wndTag);
    TrackDC(hdc, tag);
    LogWrite("USER::GetDC hwnd=%p [%s] -> %s", hwnd, wndTag, tag);
    return hdc;
}

static int WINAPI Hook_ReleaseDC(HWND hwnd, HDC hdc) {
    /* Suppress matching NULL-hwnd noise */
    if (hwnd != NULL) {
        LogWrite("USER::ReleaseDC hwnd=%p dc=%s(%p)", hwnd, DCTag(hdc), hdc);
    }
    return orig_ReleaseDC(hwnd, hdc);
}

static BOOL WINAPI Hook_InvalidateRect(HWND hwnd, const RECT *rect, BOOL erase) {
    LogWrite("USER::InvalidateRect hwnd=%p [%s] erase=%d",
             hwnd, GetWindowTag(hwnd), erase);
    if (rect) LogRect("rect", rect);
    return orig_InvalidateRect(hwnd, rect, erase);
}

static HDC WINAPI Hook_BeginPaint(HWND hwnd, LPPAINTSTRUCT ps) {
    HDC hdc = orig_BeginPaint(hwnd, ps);
    const char *wndTag = GetWindowTag(hwnd);
    char tag[80];
    snprintf(tag, sizeof(tag), "paintDC_%p(%s)", hdc, wndTag);
    TrackDC(hdc, tag);
    LogWrite("USER::BeginPaint hwnd=%p [%s] -> %s", hwnd, wndTag, tag);
    if (ps) LogRect("paintRect", &ps->rcPaint);
    return hdc;
}

static BOOL WINAPI Hook_EndPaint(HWND hwnd, const PAINTSTRUCT *ps) {
    LogWrite("USER::EndPaint hwnd=%p", hwnd);
    return orig_EndPaint(hwnd, ps);
}

static BOOL WINAPI Hook_ShowWindow(HWND hwnd, int cmdShow) {
    const char *cmdName =
        cmdShow == SW_HIDE ? "HIDE" :
        cmdShow == SW_SHOW ? "SHOW" :
        cmdShow == SW_SHOWMAXIMIZED ? "MAXIMIZE" :
        cmdShow == SW_SHOWMINIMIZED ? "MINIMIZE" :
        cmdShow == SW_RESTORE ? "RESTORE" : "?";
    LogWrite("USER::ShowWindow hwnd=%p [%s] cmd=%s(%d)",
             hwnd, GetWindowTag(hwnd), cmdName, cmdShow);
    return orig_ShowWindow(hwnd, cmdShow);
}

static BOOL WINAPI Hook_MoveWindow(HWND hwnd, int x, int y, int w, int h, BOOL repaint) {
    LogWrite("USER::MoveWindow hwnd=%p [%s] pos=(%d,%d) size=%dx%d repaint=%d",
             hwnd, GetWindowTag(hwnd), x, y, w, h, repaint);
    return orig_MoveWindow(hwnd, x, y, w, h, repaint);
}

static BOOL WINAPI Hook_SetWindowPos(HWND hwnd, HWND after, int x, int y, int cx, int cy, UINT flags) {
    LogWrite("USER::SetWindowPos hwnd=%p [%s] pos=(%d,%d) size=%dx%d flags=0x%X",
             hwnd, GetWindowTag(hwnd), x, y, cx, cy, flags);
    return orig_SetWindowPos(hwnd, after, x, y, cx, cy, flags);
}

/* ---- Install all hooks ---- */

void InstallGDIHooks(void) {
    HMODULE exe = GetModuleHandleA(NULL);
    HMODULE gdi = GetModuleHandleA("GDI32.dll");
    HMODULE user = GetModuleHandleA("USER32.dll");

    if (!exe || !gdi || !user) {
        LogWrite("ERROR: Cannot get module handles for hooking");
        return;
    }

    LogWrite("Installing GDI/USER32 IAT hooks on civ2.exe...");

    #define HOOK_GDI(fn) do { \
        orig_##fn = (PFN_##fn)GetProcAddress(gdi, #fn); \
        if (orig_##fn) { \
            if (PatchIAT(exe, "GDI32.dll", orig_##fn, Hook_##fn)) \
                LogWrite("  Hooked GDI32::" #fn); \
            else \
                LogWrite("  FAILED to hook GDI32::" #fn); \
        } else { \
            LogWrite("  NOT FOUND: GDI32::" #fn); \
        } \
    } while(0)

    #define HOOK_USER(fn) do { \
        orig_##fn = (PFN_##fn)GetProcAddress(user, #fn); \
        if (orig_##fn) { \
            if (PatchIAT(exe, "USER32.dll", orig_##fn, Hook_##fn)) \
                LogWrite("  Hooked USER32::" #fn); \
            else \
                LogWrite("  FAILED to hook USER32::" #fn); \
        } else { \
            LogWrite("  NOT FOUND: USER32::" #fn); \
        } \
    } while(0)

    /* Blitting */
    HOOK_GDI(BitBlt);
    HOOK_GDI(StretchBlt);
    HOOK_GDI(PatBlt);

    /* Bitmaps & DCs */
    HOOK_GDI(CreateCompatibleBitmap);
    HOOK_GDI(CreateCompatibleDC);
    HOOK_GDI(DeleteDC);
    HOOK_GDI(SelectObject);
    HOOK_GDI(CreateDIBSection);
    HOOK_GDI(CreateBitmap);

    /* Palette */
    HOOK_GDI(SetDIBColorTable);
    HOOK_GDI(GetDIBColorTable);
    HOOK_GDI(CreatePalette);
    HOOK_GDI(SetPaletteEntries);
    HOOK_GDI(GetPaletteEntries);
    HOOK_GDI(RealizePalette);
    HOOK_GDI(SelectPalette);
    HOOK_GDI(AnimatePalette);
    HOOK_GDI(GetSystemPaletteEntries);

    /* Pixels */
    HOOK_GDI(SetPixel);

    /* Text output — note: TextOutA/ExtTextOutA are NOT imported by civ2.exe
       DrawTextA is imported from USER32, not GDI32 */
    HOOK_GDI(SetTextAlign);
    HOOK_GDI(GetTextExtentPointA);

    /* Text style */
    HOOK_GDI(SetBkMode);
    HOOK_GDI(SetTextColor);
    HOOK_GDI(SetBkColor);
    HOOK_GDI(CreateFontIndirectA);

    /* Drawing primitives */
    HOOK_GDI(MoveToEx);
    HOOK_GDI(LineTo);
    HOOK_GDI(CreatePen);
    HOOK_GDI(CreateSolidBrush);

    /* Misc */
    HOOK_GDI(GdiFlush);

    /* Text/drawing from USER32 (not GDI32!) */
    HOOK_USER(DrawTextA);
    HOOK_USER(FillRect);
    HOOK_USER(FrameRect);

    /* Window management */
    HOOK_USER(GetDC);
    HOOK_USER(ReleaseDC);
    HOOK_USER(InvalidateRect);
    HOOK_USER(BeginPaint);
    HOOK_USER(EndPaint);
    HOOK_USER(ShowWindow);
    HOOK_USER(MoveWindow);
    HOOK_USER(SetWindowPos);

    #undef HOOK_GDI
    #undef HOOK_USER

    LogWrite("Hook installation complete");
}
