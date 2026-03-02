/*
 * DirectDraw Proxy DLL for Civ2 MGE reverse engineering
 *
 * Drop the compiled ddraw.dll into the Civ2 game folder.
 * It intercepts all DirectDraw calls, logs them to ddraw_log.txt,
 * and forwards to the real system ddraw.dll.
 */
#ifndef DDRAW_PROXY_H
#define DDRAW_PROXY_H

#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <ddraw.h>
#include <stdio.h>

/* ---- Logging ---- */

extern FILE *g_logFile;
extern DWORD g_frameCount;
extern DWORD g_startTick;

void LogInit(void);
void LogClose(void);
void LogWrite(const char *fmt, ...);
void LogRect(const char *label, const RECT *r);
void LogDDBltFx(const DDBLTFX *fx);

/* ---- Real DirectDraw loader ---- */

typedef HRESULT (WINAPI *PFN_DirectDrawCreate)(GUID*, LPDIRECTDRAW*, IUnknown*);
typedef HRESULT (WINAPI *PFN_DirectDrawEnumerateA)(LPDDENUMCALLBACKA, LPVOID);
typedef HRESULT (WINAPI *PFN_DirectDrawEnumerateW)(LPDDENUMCALLBACKW, LPVOID);

extern HMODULE g_realDDrawDLL;
extern PFN_DirectDrawCreate g_realDirectDrawCreate;

BOOL LoadRealDDraw(void);

/* ---- Surface name helper ---- */

const char* SurfaceTag(IDirectDrawSurface *surf);
void RegisterSurface(IDirectDrawSurface *surf, DWORD caps, int width, int height);
void UnregisterSurface(IDirectDrawSurface *surf);

/* ---- GDI IAT hooks ---- */

void InstallGDIHooks(void);

#endif /* DDRAW_PROXY_H */
