/*
 * IDirectDraw wrapper - intercepts SetDisplayMode, CreateSurface,
 * CreatePalette, and other top-level DirectDraw operations.
 */
#include "ddraw_proxy.h"

/* Defined in wrap_surface.c */
IDirectDrawSurface* WrapSurface(IDirectDrawSurface *real, DWORD caps, int width, int height);

/* Forward declare vtable */
static IDirectDrawVtbl g_wrappedDDrawVtbl;

typedef struct {
    IDirectDrawVtbl *lpVtbl;
    IDirectDraw *real;
    LONG refCount;
} WrappedDDraw;

static WrappedDDraw* Unwrap(IDirectDraw *dd) {
    return (WrappedDDraw*)dd;
}

/* --- IUnknown --- */

static HRESULT WINAPI WD_QueryInterface(IDirectDraw *this, REFIID riid, void **ppv) {
    LogWrite("DDraw::QueryInterface");
    return IDirectDraw_QueryInterface(Unwrap(this)->real, riid, ppv);
}

static ULONG WINAPI WD_AddRef(IDirectDraw *this) {
    Unwrap(this)->refCount++;
    return IDirectDraw_AddRef(Unwrap(this)->real);
}

static ULONG WINAPI WD_Release(IDirectDraw *this) {
    WrappedDDraw *wd = Unwrap(this);
    ULONG ref = IDirectDraw_Release(wd->real);
    wd->refCount--;
    if (ref == 0) {
        LogWrite("DDraw::Release -> destroyed");
        HeapFree(GetProcessHeap(), 0, wd);
    }
    return ref;
}

/* --- IDirectDraw methods --- */

static HRESULT WINAPI WD_Compact(IDirectDraw *this) {
    return IDirectDraw_Compact(Unwrap(this)->real);
}

static HRESULT WINAPI WD_CreateClipper(IDirectDraw *this, DWORD flags,
                                        IDirectDrawClipper **out, IUnknown *outer) {
    LogWrite("DDraw::CreateClipper flags=0x%lX", flags);
    return IDirectDraw_CreateClipper(Unwrap(this)->real, flags, out, outer);
}

static HRESULT WINAPI WD_CreatePalette(IDirectDraw *this, DWORD flags,
                                        LPPALETTEENTRY entries,
                                        IDirectDrawPalette **out, IUnknown *outer) {
    LogWrite("DDraw::CreatePalette flags=0x%08lX", flags);
    if (entries) {
        /* Log first few palette entries for reference */
        LogWrite("  Palette[0..3]: (%d,%d,%d) (%d,%d,%d) (%d,%d,%d) (%d,%d,%d)",
                 entries[0].peRed, entries[0].peGreen, entries[0].peBlue,
                 entries[1].peRed, entries[1].peGreen, entries[1].peBlue,
                 entries[2].peRed, entries[2].peGreen, entries[2].peBlue,
                 entries[3].peRed, entries[3].peGreen, entries[3].peBlue);
    }
    return IDirectDraw_CreatePalette(Unwrap(this)->real, flags, entries, out, outer);
}

static HRESULT WINAPI WD_CreateSurface(IDirectDraw *this, LPDDSURFACEDESC desc,
                                         IDirectDrawSurface **out, IUnknown *outer) {
    DWORD caps = 0;
    int w = 0, h = 0;

    if (desc) {
        caps = desc->ddsCaps.dwCaps;
        if (desc->dwFlags & DDSD_WIDTH) w = desc->dwWidth;
        if (desc->dwFlags & DDSD_HEIGHT) h = desc->dwHeight;

        LogWrite("DDraw::CreateSurface flags=0x%08lX caps=0x%08lX %dx%d",
                 desc->dwFlags, caps, w, h);

        if (caps & DDSCAPS_PRIMARYSURFACE) LogWrite("  -> PRIMARY SURFACE");
        if (caps & DDSCAPS_BACKBUFFER) LogWrite("  -> BACK BUFFER");
        if (caps & DDSCAPS_FLIP) LogWrite("  -> FLIPPABLE");
        if (caps & DDSCAPS_OFFSCREENPLAIN) LogWrite("  -> OFFSCREEN PLAIN");
        if (caps & DDSCAPS_SYSTEMMEMORY) LogWrite("  -> SYSTEM MEMORY");
        if (caps & DDSCAPS_VIDEOMEMORY) LogWrite("  -> VIDEO MEMORY");
        if (desc->dwFlags & DDSD_BACKBUFFERCOUNT)
            LogWrite("  -> backBufferCount=%lu", desc->dwBackBufferCount);
    }

    HRESULT hr = IDirectDraw_CreateSurface(Unwrap(this)->real, desc, out, outer);

    if (SUCCEEDED(hr) && out && *out) {
        /* If we didn't get dimensions from desc, query the surface */
        if (w == 0 || h == 0) {
            DDSURFACEDESC sdesc;
            memset(&sdesc, 0, sizeof(sdesc));
            sdesc.dwSize = sizeof(sdesc);
            IDirectDrawSurface_GetSurfaceDesc(*out, &sdesc);
            w = sdesc.dwWidth;
            h = sdesc.dwHeight;
        }
        *out = WrapSurface(*out, caps, w, h);
        LogWrite("  -> created as %s", SurfaceTag(*out));
    } else if (FAILED(hr)) {
        LogWrite("  -> FAILED hr=0x%08lX", hr);
    }

    return hr;
}

static HRESULT WINAPI WD_DuplicateSurface(IDirectDraw *this, IDirectDrawSurface *src,
                                            IDirectDrawSurface **out) {
    LogWrite("DDraw::DuplicateSurface");
    return IDirectDraw_DuplicateSurface(Unwrap(this)->real, src, out);
}

static HRESULT WINAPI WD_EnumDisplayModes(IDirectDraw *this, DWORD flags,
                                            LPDDSURFACEDESC desc, LPVOID ctx,
                                            LPDDENUMMODESCALLBACK cb) {
    LogWrite("DDraw::EnumDisplayModes");
    return IDirectDraw_EnumDisplayModes(Unwrap(this)->real, flags, desc, ctx, cb);
}

static HRESULT WINAPI WD_EnumSurfaces(IDirectDraw *this, DWORD flags,
                                        LPDDSURFACEDESC desc, LPVOID ctx,
                                        LPDDENUMSURFACESCALLBACK cb) {
    return IDirectDraw_EnumSurfaces(Unwrap(this)->real, flags, desc, ctx, cb);
}

static HRESULT WINAPI WD_FlipToGDISurface(IDirectDraw *this) {
    LogWrite("DDraw::FlipToGDISurface");
    return IDirectDraw_FlipToGDISurface(Unwrap(this)->real);
}

static HRESULT WINAPI WD_GetCaps(IDirectDraw *this, LPDDCAPS halCaps, LPDDCAPS helCaps) {
    return IDirectDraw_GetCaps(Unwrap(this)->real, halCaps, helCaps);
}

static HRESULT WINAPI WD_GetDisplayMode(IDirectDraw *this, LPDDSURFACEDESC desc) {
    return IDirectDraw_GetDisplayMode(Unwrap(this)->real, desc);
}

static HRESULT WINAPI WD_GetFourCCCodes(IDirectDraw *this, LPDWORD num, LPDWORD codes) {
    return IDirectDraw_GetFourCCCodes(Unwrap(this)->real, num, codes);
}

static HRESULT WINAPI WD_GetGDISurface(IDirectDraw *this, IDirectDrawSurface **out) {
    return IDirectDraw_GetGDISurface(Unwrap(this)->real, out);
}

static HRESULT WINAPI WD_GetMonitorFrequency(IDirectDraw *this, LPDWORD freq) {
    return IDirectDraw_GetMonitorFrequency(Unwrap(this)->real, freq);
}

static HRESULT WINAPI WS_GetScanLine(IDirectDraw *this, LPDWORD scanline) {
    return IDirectDraw_GetScanLine(Unwrap(this)->real, scanline);
}

static HRESULT WINAPI WD_GetVerticalBlankStatus(IDirectDraw *this, LPBOOL status) {
    return IDirectDraw_GetVerticalBlankStatus(Unwrap(this)->real, status);
}

static HRESULT WINAPI WD_Initialize(IDirectDraw *this, GUID *guid) {
    return IDirectDraw_Initialize(Unwrap(this)->real, guid);
}

static HRESULT WINAPI WD_RestoreDisplayMode(IDirectDraw *this) {
    LogWrite("DDraw::RestoreDisplayMode");
    return IDirectDraw_RestoreDisplayMode(Unwrap(this)->real);
}

static HRESULT WINAPI WD_SetCooperativeLevel(IDirectDraw *this, HWND hwnd, DWORD flags) {
    LogWrite("DDraw::SetCooperativeLevel hwnd=%p flags=0x%08lX", hwnd, flags);
    if (flags & DDSCL_FULLSCREEN) LogWrite("  -> FULLSCREEN");
    if (flags & DDSCL_EXCLUSIVE) LogWrite("  -> EXCLUSIVE");
    if (flags & DDSCL_NORMAL) LogWrite("  -> NORMAL");
    return IDirectDraw_SetCooperativeLevel(Unwrap(this)->real, hwnd, flags);
}

static HRESULT WINAPI WD_SetDisplayMode(IDirectDraw *this, DWORD w, DWORD h, DWORD bpp) {
    LogWrite("DDraw::SetDisplayMode %lux%lu %lu-bit", w, h, bpp);
    return IDirectDraw_SetDisplayMode(Unwrap(this)->real, w, h, bpp);
}

static HRESULT WINAPI WD_WaitForVerticalBlank(IDirectDraw *this, DWORD flags, HANDLE event) {
    /* Don't log this - it's called very frequently */
    return IDirectDraw_WaitForVerticalBlank(Unwrap(this)->real, flags, event);
}

/* --- vtable --- */

static IDirectDrawVtbl g_wrappedDDrawVtbl = {
    WD_QueryInterface,
    WD_AddRef,
    WD_Release,
    WD_Compact,
    WD_CreateClipper,
    WD_CreatePalette,
    WD_CreateSurface,
    WD_DuplicateSurface,
    WD_EnumDisplayModes,
    WD_EnumSurfaces,
    WD_FlipToGDISurface,
    WD_GetCaps,
    WD_GetDisplayMode,
    WD_GetFourCCCodes,
    WD_GetGDISurface,
    WD_GetMonitorFrequency,
    WS_GetScanLine,
    WD_GetVerticalBlankStatus,
    WD_Initialize,
    WD_RestoreDisplayMode,
    WD_SetCooperativeLevel,
    WD_SetDisplayMode,
    WD_WaitForVerticalBlank
};

/* Public: wrap a real IDirectDraw */
IDirectDraw* WrapDDraw(IDirectDraw *real) {
    WrappedDDraw *wd = HeapAlloc(GetProcessHeap(), HEAP_ZERO_MEMORY, sizeof(WrappedDDraw));
    wd->lpVtbl = &g_wrappedDDrawVtbl;
    wd->real = real;
    wd->refCount = 1;
    LogWrite("Wrapped IDirectDraw %p -> %p", real, wd);
    return (IDirectDraw*)wd;
}
