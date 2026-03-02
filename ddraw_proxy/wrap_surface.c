/*
 * IDirectDrawSurface wrapper - this is where all the rendering action happens.
 * Every Blt, BltFast, Lock/Unlock, GetDC/ReleaseDC call is logged here.
 */
#include "ddraw_proxy.h"

/* Forward declare our vtable */
static IDirectDrawSurfaceVtbl g_wrappedSurfaceVtbl;

typedef struct {
    IDirectDrawSurfaceVtbl *lpVtbl;
    IDirectDrawSurface *real;
    LONG refCount;
} WrappedSurface;

static WrappedSurface* Unwrap(IDirectDrawSurface *s) {
    return (WrappedSurface*)s;
}

/* --- IUnknown --- */

static HRESULT WINAPI WS_QueryInterface(IDirectDrawSurface *this, REFIID riid, void **ppv) {
    return IDirectDrawSurface_QueryInterface(Unwrap(this)->real, riid, ppv);
}

static ULONG WINAPI WS_AddRef(IDirectDrawSurface *this) {
    Unwrap(this)->refCount++;
    return IDirectDrawSurface_AddRef(Unwrap(this)->real);
}

static ULONG WINAPI WS_Release(IDirectDrawSurface *this) {
    WrappedSurface *ws = Unwrap(this);
    ULONG ref = IDirectDrawSurface_Release(ws->real);
    ws->refCount--;
    if (ref == 0) {
        LogWrite("Surface::Release %s -> destroyed", SurfaceTag(this));
        UnregisterSurface(this);
        HeapFree(GetProcessHeap(), 0, ws);
    }
    return ref;
}

/* --- IDirectDrawSurface methods --- */

static HRESULT WINAPI WS_AddAttachedSurface(IDirectDrawSurface *this, IDirectDrawSurface *s) {
    LogWrite("Surface::AddAttachedSurface %s", SurfaceTag(this));
    /* Pass real surface if it's wrapped, otherwise pass as-is */
    return IDirectDrawSurface_AddAttachedSurface(Unwrap(this)->real,
        s ? Unwrap(s)->real : NULL);
}

static HRESULT WINAPI WS_AddOverlayDirtyRect(IDirectDrawSurface *this, LPRECT r) {
    return IDirectDrawSurface_AddOverlayDirtyRect(Unwrap(this)->real, r);
}

static HRESULT WINAPI WS_Blt(IDirectDrawSurface *this, LPRECT dstRect,
                              IDirectDrawSurface *src, LPRECT srcRect,
                              DWORD flags, LPDDBLTFX fx) {
    const char *dstTag = SurfaceTag(this);
    const char *srcTag = src ? SurfaceTag((IDirectDrawSurface*)src) : "NULL";

    LogWrite("Surface::Blt dst=%s src=%s flags=0x%08lX", dstTag, srcTag, flags);
    LogRect("dstRect", dstRect);
    LogRect("srcRect", srcRect);
    if (flags & DDBLT_COLORFILL && fx)
        LogWrite("  COLORFILL=0x%08lX", fx->dwFillColor);
    if (flags & DDBLT_KEYSRC)
        LogWrite("  KEYSRC (color key transparency)");
    if (flags & DDBLT_ROP && fx)
        LogWrite("  ROP=0x%08lX", fx->dwROP);

    IDirectDrawSurface *realSrc = src ? Unwrap(src)->real : NULL;
    return IDirectDrawSurface_Blt(Unwrap(this)->real, dstRect, realSrc, srcRect, flags, fx);
}

static HRESULT WINAPI WS_BltBatch(IDirectDrawSurface *this, LPDDBLTBATCH b, DWORD c, DWORD f) {
    LogWrite("Surface::BltBatch count=%lu flags=0x%08lX", c, f);
    return IDirectDrawSurface_BltBatch(Unwrap(this)->real, b, c, f);
}

static HRESULT WINAPI WS_BltFast(IDirectDrawSurface *this, DWORD x, DWORD y,
                                   IDirectDrawSurface *src, LPRECT srcRect, DWORD flags) {
    const char *dstTag = SurfaceTag(this);
    const char *srcTag = src ? SurfaceTag((IDirectDrawSurface*)src) : "NULL";

    LogWrite("Surface::BltFast dst=%s x=%lu y=%lu src=%s flags=0x%08lX",
             dstTag, x, y, srcTag, flags);
    LogRect("srcRect", srcRect);
    if (flags & DDBLTFAST_SRCCOLORKEY)
        LogWrite("  SRCCOLORKEY (transparent blit)");
    if (flags & DDBLTFAST_DESTCOLORKEY)
        LogWrite("  DESTCOLORKEY");

    IDirectDrawSurface *realSrc = src ? Unwrap(src)->real : NULL;
    return IDirectDrawSurface_BltFast(Unwrap(this)->real, x, y, realSrc, srcRect, flags);
}

static HRESULT WINAPI WS_DeleteAttachedSurface(IDirectDrawSurface *this, DWORD f, IDirectDrawSurface *s) {
    return IDirectDrawSurface_DeleteAttachedSurface(Unwrap(this)->real, f,
        s ? Unwrap(s)->real : NULL);
}

static HRESULT WINAPI WS_EnumAttachedSurfaces(IDirectDrawSurface *this, LPVOID ctx, LPDDENUMSURFACESCALLBACK cb) {
    return IDirectDrawSurface_EnumAttachedSurfaces(Unwrap(this)->real, ctx, cb);
}

static HRESULT WINAPI WS_EnumOverlayZOrders(IDirectDrawSurface *this, DWORD f, LPVOID ctx, LPDDENUMSURFACESCALLBACK cb) {
    return IDirectDrawSurface_EnumOverlayZOrders(Unwrap(this)->real, f, ctx, cb);
}

static HRESULT WINAPI WS_Flip(IDirectDrawSurface *this, IDirectDrawSurface *override, DWORD flags) {
    g_frameCount++;
    LogWrite("Surface::Flip %s frame=%lu flags=0x%08lX", SurfaceTag(this), g_frameCount, flags);
    IDirectDrawSurface *realOverride = override ? Unwrap(override)->real : NULL;
    return IDirectDrawSurface_Flip(Unwrap(this)->real, realOverride, flags);
}

static HRESULT WINAPI WS_GetAttachedSurface(IDirectDrawSurface *this, LPDDSCAPS caps, IDirectDrawSurface **out) {
    HRESULT hr = IDirectDrawSurface_GetAttachedSurface(Unwrap(this)->real, caps, out);
    if (SUCCEEDED(hr) && out && *out) {
        LogWrite("Surface::GetAttachedSurface %s caps=0x%08lX -> got surface",
                 SurfaceTag(this), caps->dwCaps);
        /* Wrap the returned surface */
        WrappedSurface *ws = HeapAlloc(GetProcessHeap(), HEAP_ZERO_MEMORY, sizeof(WrappedSurface));
        ws->lpVtbl = &g_wrappedSurfaceVtbl;
        ws->real = *out;
        ws->refCount = 1;

        DDSURFACEDESC desc;
        memset(&desc, 0, sizeof(desc));
        desc.dwSize = sizeof(desc);
        IDirectDrawSurface_GetSurfaceDesc(*out, &desc);
        RegisterSurface((IDirectDrawSurface*)ws, caps->dwCaps, desc.dwWidth, desc.dwHeight);

        *out = (IDirectDrawSurface*)ws;
    }
    return hr;
}

static HRESULT WINAPI WS_GetBltStatus(IDirectDrawSurface *this, DWORD f) {
    return IDirectDrawSurface_GetBltStatus(Unwrap(this)->real, f);
}

static HRESULT WINAPI WS_GetCaps(IDirectDrawSurface *this, LPDDSCAPS caps) {
    return IDirectDrawSurface_GetCaps(Unwrap(this)->real, caps);
}

static HRESULT WINAPI WS_GetClipper(IDirectDrawSurface *this, IDirectDrawClipper **out) {
    return IDirectDrawSurface_GetClipper(Unwrap(this)->real, out);
}

static HRESULT WINAPI WS_GetColorKey(IDirectDrawSurface *this, DWORD flags, LPDDCOLORKEY ck) {
    HRESULT hr = IDirectDrawSurface_GetColorKey(Unwrap(this)->real, flags, ck);
    if (SUCCEEDED(hr) && ck) {
        LogWrite("Surface::GetColorKey %s flags=0x%lX low=0x%08lX high=0x%08lX",
                 SurfaceTag(this), flags, ck->dwColorSpaceLowValue, ck->dwColorSpaceHighValue);
    }
    return hr;
}

static HRESULT WINAPI WS_GetDC(IDirectDrawSurface *this, HDC *hdc) {
    LogWrite("Surface::GetDC %s", SurfaceTag(this));
    return IDirectDrawSurface_GetDC(Unwrap(this)->real, hdc);
}

static HRESULT WINAPI WS_GetFlipStatus(IDirectDrawSurface *this, DWORD f) {
    return IDirectDrawSurface_GetFlipStatus(Unwrap(this)->real, f);
}

static HRESULT WINAPI WS_GetOverlayPosition(IDirectDrawSurface *this, LPLONG x, LPLONG y) {
    return IDirectDrawSurface_GetOverlayPosition(Unwrap(this)->real, x, y);
}

static HRESULT WINAPI WS_GetPalette(IDirectDrawSurface *this, IDirectDrawPalette **out) {
    return IDirectDrawSurface_GetPalette(Unwrap(this)->real, out);
}

static HRESULT WINAPI WS_GetPixelFormat(IDirectDrawSurface *this, LPDDPIXELFORMAT pf) {
    return IDirectDrawSurface_GetPixelFormat(Unwrap(this)->real, pf);
}

static HRESULT WINAPI WS_GetSurfaceDesc(IDirectDrawSurface *this, LPDDSURFACEDESC desc) {
    return IDirectDrawSurface_GetSurfaceDesc(Unwrap(this)->real, desc);
}

static HRESULT WINAPI WS_Initialize(IDirectDrawSurface *this, IDirectDraw *dd, LPDDSURFACEDESC desc) {
    return IDirectDrawSurface_Initialize(Unwrap(this)->real, dd, desc);
}

static HRESULT WINAPI WS_IsLost(IDirectDrawSurface *this) {
    return IDirectDrawSurface_IsLost(Unwrap(this)->real);
}

static HRESULT WINAPI WS_Lock(IDirectDrawSurface *this, LPRECT r, LPDDSURFACEDESC desc,
                                DWORD flags, HANDLE event) {
    LogWrite("Surface::Lock %s flags=0x%08lX", SurfaceTag(this), flags);
    LogRect("lockRect", r);
    return IDirectDrawSurface_Lock(Unwrap(this)->real, r, desc, flags, event);
}

static HRESULT WINAPI WS_ReleaseDC(IDirectDrawSurface *this, HDC hdc) {
    LogWrite("Surface::ReleaseDC %s", SurfaceTag(this));
    return IDirectDrawSurface_ReleaseDC(Unwrap(this)->real, hdc);
}

static HRESULT WINAPI WS_Restore(IDirectDrawSurface *this) {
    LogWrite("Surface::Restore %s", SurfaceTag(this));
    return IDirectDrawSurface_Restore(Unwrap(this)->real);
}

static HRESULT WINAPI WS_SetClipper(IDirectDrawSurface *this, IDirectDrawClipper *clip) {
    LogWrite("Surface::SetClipper %s clipper=%p", SurfaceTag(this), clip);
    return IDirectDrawSurface_SetClipper(Unwrap(this)->real, clip);
}

static HRESULT WINAPI WS_SetColorKey(IDirectDrawSurface *this, DWORD flags, LPDDCOLORKEY ck) {
    if (ck) {
        LogWrite("Surface::SetColorKey %s flags=0x%lX low=0x%08lX high=0x%08lX",
                 SurfaceTag(this), flags, ck->dwColorSpaceLowValue, ck->dwColorSpaceHighValue);
    } else {
        LogWrite("Surface::SetColorKey %s flags=0x%lX ck=NULL", SurfaceTag(this), flags);
    }
    return IDirectDrawSurface_SetColorKey(Unwrap(this)->real, flags, ck);
}

static HRESULT WINAPI WS_SetOverlayPosition(IDirectDrawSurface *this, LONG x, LONG y) {
    return IDirectDrawSurface_SetOverlayPosition(Unwrap(this)->real, x, y);
}

static HRESULT WINAPI WS_SetPalette(IDirectDrawSurface *this, IDirectDrawPalette *pal) {
    LogWrite("Surface::SetPalette %s palette=%p", SurfaceTag(this), pal);
    return IDirectDrawSurface_SetPalette(Unwrap(this)->real, pal);
}

static HRESULT WINAPI WS_Unlock(IDirectDrawSurface *this, LPVOID ptr) {
    LogWrite("Surface::Unlock %s", SurfaceTag(this));
    return IDirectDrawSurface_Unlock(Unwrap(this)->real, ptr);
}

static HRESULT WINAPI WS_UpdateOverlay(IDirectDrawSurface *this, LPRECT src,
                                         IDirectDrawSurface *dst, LPRECT dstR,
                                         DWORD flags, LPDDOVERLAYFX fx) {
    return IDirectDrawSurface_UpdateOverlay(Unwrap(this)->real, src,
        dst ? Unwrap(dst)->real : NULL, dstR, flags, fx);
}

static HRESULT WINAPI WS_UpdateOverlayDisplay(IDirectDrawSurface *this, DWORD f) {
    return IDirectDrawSurface_UpdateOverlayDisplay(Unwrap(this)->real, f);
}

static HRESULT WINAPI WS_UpdateOverlayZOrder(IDirectDrawSurface *this, DWORD f, IDirectDrawSurface *ref) {
    return IDirectDrawSurface_UpdateOverlayZOrder(Unwrap(this)->real, f,
        ref ? Unwrap(ref)->real : NULL);
}

/* --- vtable --- */

static IDirectDrawSurfaceVtbl g_wrappedSurfaceVtbl = {
    WS_QueryInterface,
    WS_AddRef,
    WS_Release,
    WS_AddAttachedSurface,
    WS_AddOverlayDirtyRect,
    WS_Blt,
    WS_BltBatch,
    WS_BltFast,
    WS_DeleteAttachedSurface,
    WS_EnumAttachedSurfaces,
    WS_EnumOverlayZOrders,
    WS_Flip,
    WS_GetAttachedSurface,
    WS_GetBltStatus,
    WS_GetCaps,
    WS_GetClipper,
    WS_GetColorKey,
    WS_GetDC,
    WS_GetFlipStatus,
    WS_GetOverlayPosition,
    WS_GetPalette,
    WS_GetPixelFormat,
    WS_GetSurfaceDesc,
    WS_Initialize,
    WS_IsLost,
    WS_Lock,
    WS_ReleaseDC,
    WS_Restore,
    WS_SetClipper,
    WS_SetColorKey,
    WS_SetOverlayPosition,
    WS_SetPalette,
    WS_Unlock,
    WS_UpdateOverlay,
    WS_UpdateOverlayDisplay,
    WS_UpdateOverlayZOrder
};

/* Public: wrap a real surface */
IDirectDrawSurface* WrapSurface(IDirectDrawSurface *real, DWORD caps, int width, int height) {
    WrappedSurface *ws = HeapAlloc(GetProcessHeap(), HEAP_ZERO_MEMORY, sizeof(WrappedSurface));
    ws->lpVtbl = &g_wrappedSurfaceVtbl;
    ws->real = real;
    ws->refCount = 1;
    RegisterSurface((IDirectDrawSurface*)ws, caps, width, height);
    return (IDirectDrawSurface*)ws;
}
