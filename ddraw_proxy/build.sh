#!/bin/bash
# Build the DirectDraw proxy DLL (32-bit) for Civ2 MGE
# Run from the ddraw_proxy directory

CC=/c/msys64/mingw32/bin/gcc.exe
export PATH="/c/msys64/mingw32/bin:$PATH"

echo "Building DirectDraw proxy DLL..."

$CC -shared -o ddraw.dll \
    main.c \
    logging.c \
    real_ddraw.c \
    wrap_ddraw.c \
    wrap_surface.c \
    iat_hook.c \
    ddraw.def \
    -lddraw \
    -lgdi32 \
    -luser32 \
    -Wall -O2 \
    -Wl,--enable-stdcall-fixup \
    -static-libgcc

if [ $? -eq 0 ]; then
    echo "SUCCESS: ddraw.dll built"
    file ddraw.dll
    echo ""
    echo "To use: copy ddraw.dll into your Civ2 game folder"
    echo "Log output will appear in ddraw_log.txt in the game folder"
    echo ""
    echo "To remove: delete ddraw.dll from the game folder"
else
    echo "BUILD FAILED"
    exit 1
fi
