/*
 * Loads the real system ddraw.dll and resolves function pointers
 */
#include "ddraw_proxy.h"

HMODULE g_realDDrawDLL = NULL;
PFN_DirectDrawCreate g_realDirectDrawCreate = NULL;

BOOL LoadRealDDraw(void) {
    /* Get system directory to load the REAL ddraw.dll, not ourselves */
    char sysDir[MAX_PATH];
    GetSystemDirectoryA(sysDir, MAX_PATH);
    strcat(sysDir, "\\ddraw.dll");

    g_realDDrawDLL = LoadLibraryA(sysDir);
    if (!g_realDDrawDLL) {
        LogWrite("FATAL: Cannot load real ddraw.dll from %s (error %lu)",
                 sysDir, GetLastError());
        return FALSE;
    }

    g_realDirectDrawCreate = (PFN_DirectDrawCreate)
        GetProcAddress(g_realDDrawDLL, "DirectDrawCreate");
    if (!g_realDirectDrawCreate) {
        LogWrite("FATAL: Cannot find DirectDrawCreate in real ddraw.dll");
        return FALSE;
    }

    LogWrite("Loaded real ddraw.dll from %s", sysDir);
    return TRUE;
}
