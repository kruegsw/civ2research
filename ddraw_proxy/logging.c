/*
 * Logging subsystem for DirectDraw proxy
 */
#include "ddraw_proxy.h"
#include <stdarg.h>

FILE *g_logFile = NULL;
DWORD g_frameCount = 0;
DWORD g_startTick = 0;

void LogInit(void) {
    g_logFile = fopen("ddraw_log.txt", "w");
    g_startTick = GetTickCount();
    g_frameCount = 0;
    if (g_logFile) {
        fprintf(g_logFile, "=== DirectDraw Proxy Log ===\n");
        fprintf(g_logFile, "Timestamp is ms since DLL load\n\n");
        fflush(g_logFile);
    }
}

void LogClose(void) {
    if (g_logFile) {
        fprintf(g_logFile, "\n=== END LOG (frames: %lu) ===\n", g_frameCount);
        fclose(g_logFile);
        g_logFile = NULL;
    }
}

void LogWrite(const char *fmt, ...) {
    if (!g_logFile) return;
    DWORD elapsed = GetTickCount() - g_startTick;
    fprintf(g_logFile, "[%8lu] ", elapsed);
    va_list args;
    va_start(args, fmt);
    vfprintf(g_logFile, fmt, args);
    va_end(args);
    fprintf(g_logFile, "\n");
    fflush(g_logFile);
}

void LogRect(const char *label, const RECT *r) {
    if (!r) {
        LogWrite("  %s: NULL", label);
    } else {
        LogWrite("  %s: (%ld,%ld)-(%ld,%ld) [%ldx%ld]",
                 label, r->left, r->top, r->right, r->bottom,
                 r->right - r->left, r->bottom - r->top);
    }
}

void LogDDBltFx(const DDBLTFX *fx) {
    if (!fx) return;
    if (fx->dwFillColor)
        LogWrite("  DDBLTFX fillColor=0x%08lX", fx->dwFillColor);
    if (fx->dwROP)
        LogWrite("  DDBLTFX ROP=0x%08lX", fx->dwROP);
}

/* ---- Surface tagging ---- */

#define MAX_SURFACES 256

typedef struct {
    IDirectDrawSurface *ptr;
    DWORD caps;
    int width;
    int height;
    char tag[64];
} SurfaceInfo;

static SurfaceInfo g_surfaces[MAX_SURFACES];
static int g_surfaceCount = 0;

void RegisterSurface(IDirectDrawSurface *surf, DWORD caps, int width, int height) {
    if (g_surfaceCount >= MAX_SURFACES) return;
    SurfaceInfo *si = &g_surfaces[g_surfaceCount++];
    si->ptr = surf;
    si->caps = caps;
    si->width = width;
    si->height = height;

    const char *type = "offscreen";
    if (caps & DDSCAPS_PRIMARYSURFACE) type = "PRIMARY";
    else if (caps & DDSCAPS_BACKBUFFER) type = "backbuf";
    else if (caps & DDSCAPS_OVERLAY) type = "overlay";

    snprintf(si->tag, sizeof(si->tag), "%s_%dx%d_#%d",
             type, width, height, g_surfaceCount - 1);
}

void UnregisterSurface(IDirectDrawSurface *surf) {
    for (int i = 0; i < g_surfaceCount; i++) {
        if (g_surfaces[i].ptr == surf) {
            g_surfaces[i] = g_surfaces[--g_surfaceCount];
            return;
        }
    }
}

const char* SurfaceTag(IDirectDrawSurface *surf) {
    for (int i = 0; i < g_surfaceCount; i++) {
        if (g_surfaces[i].ptr == surf)
            return g_surfaces[i].tag;
    }
    return "unknown";
}
