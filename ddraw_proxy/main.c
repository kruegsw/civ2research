/*
 * DirectDraw Proxy DLL - main entry point
 *
 * Exports DirectDrawCreate (and others) so Civ2 loads this instead
 * of the system ddraw.dll. We log everything and forward to the real one.
 */
#include "ddraw_proxy.h"

/* Defined in wrap_ddraw.c */
IDirectDraw* WrapDDraw(IDirectDraw *real);

/* ---- DLL Entry Point ---- */

BOOL WINAPI DllMain(HINSTANCE hInst, DWORD reason, LPVOID reserved) {
    switch (reason) {
    case DLL_PROCESS_ATTACH:
        DisableThreadLibraryCalls(hInst);
        LogInit();
        LogWrite("DllMain: DLL_PROCESS_ATTACH");
        if (!LoadRealDDraw()) {
            LogWrite("FATAL: Could not load real ddraw.dll");
            return FALSE;
        }
        LogWrite("DirectDraw proxy loaded successfully");
        InstallGDIHooks();
        break;

    case DLL_PROCESS_DETACH:
        LogWrite("DllMain: DLL_PROCESS_DETACH");
        LogClose();
        if (g_realDDrawDLL) {
            FreeLibrary(g_realDDrawDLL);
            g_realDDrawDLL = NULL;
        }
        break;
    }
    return TRUE;
}

/* ---- Exported Functions ---- */

__declspec(dllexport)
HRESULT WINAPI DirectDrawCreate(GUID *guid, LPDIRECTDRAW *lplpDD, IUnknown *outer) {
    LogWrite("DirectDrawCreate called (guid=%p)", guid);

    IDirectDraw *realDD = NULL;
    HRESULT hr = g_realDirectDrawCreate(guid, &realDD, outer);

    if (FAILED(hr)) {
        LogWrite("  -> real DirectDrawCreate FAILED hr=0x%08lX", hr);
        return hr;
    }

    LogWrite("  -> real IDirectDraw created at %p", realDD);
    *lplpDD = WrapDDraw(realDD);
    return hr;
}

/*
 * Civ2 only imports DirectDrawCreate, but we export the other standard
 * ddraw.dll exports too for completeness. If these are called, they
 * pass through to the real dll.
 */

__declspec(dllexport)
HRESULT WINAPI DirectDrawEnumerateA(LPDDENUMCALLBACKA cb, LPVOID ctx) {
    LogWrite("DirectDrawEnumerateA called");
    PFN_DirectDrawEnumerateA fn = (PFN_DirectDrawEnumerateA)
        GetProcAddress(g_realDDrawDLL, "DirectDrawEnumerateA");
    return fn ? fn(cb, ctx) : DDERR_GENERIC;
}

__declspec(dllexport)
HRESULT WINAPI DirectDrawEnumerateW(LPDDENUMCALLBACKW cb, LPVOID ctx) {
    LogWrite("DirectDrawEnumerateW called");
    PFN_DirectDrawEnumerateW fn = (PFN_DirectDrawEnumerateW)
        GetProcAddress(g_realDDrawDLL, "DirectDrawEnumerateW");
    return fn ? fn(cb, ctx) : DDERR_GENERIC;
}
