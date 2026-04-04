// ═══════════════════════════════════════════════════════════════════
// sprite-loader.js — Load GIF sprite sheets into MSBitmap structs
//
// The binary expects sprite sheets as MSBitmap structs (0x28 bytes)
// stored at specific DAT_ globals. Each struct has:
//   +0x00: hMem (GlobalAlloc handle)
//   +0x04: hdc (GDI device context handle)
//   +0x0C: hBitmap (GDI bitmap handle)
//   +0x18: width
//   +0x1C: height
//   +0x20: stride
//   +0x24: pixelData pointer
//
// We load GIFs into Canvas elements, create GDI handles via gdi.js,
// allocate MSBitmap structs in _MEM, and write the DAT_ globals.
// ═══════════════════════════════════════════════════════════════════

import { G } from './globals.js';
import { w32, s32, _MEM } from './mem.js';
import {
  CreateCompatibleDC, CreateCompatibleBitmap, SelectObject,
} from './gdi.js';

// Allocate a region in _MEM for a struct. Simple bump allocator.
let _structPtr = 1800000; // start well below _MEM.length
function allocStruct(size) {
  const ptr = _structPtr;
  _structPtr += size;
  // Zero the region
  for (let i = 0; i < size; i++) _MEM[ptr + i] = 0;
  return ptr;
}

/**
 * Load a GIF image from a URL into an MSBitmap struct in _MEM.
 * Returns the _MEM pointer to the struct.
 */
async function loadSpriteSheet(url) {
  // Load image in browser
  const img = new Image();
  img.crossOrigin = 'anonymous';
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = () => reject(new Error('Failed to load: ' + url));
    img.src = url;
  });

  const w = img.naturalWidth;
  const h = img.naturalHeight;

  // Create GDI objects
  const hdc = CreateCompatibleDC(0);
  const hBitmap = CreateCompatibleBitmap(0, w, h);
  SelectObject(hdc, hBitmap);

  // Draw the GIF onto the GDI bitmap's canvas
  // Access the canvas through the handle table
  const { getHandleForSprite } = await import('./gdi.js');
  const dc = getHandleForSprite(hdc);
  if (dc && dc.ctx) {
    dc.ctx.drawImage(img, 0, 0);
  }

  // Allocate MSBitmap struct (0x28 = 40 bytes)
  const ptr = allocStruct(0x28);
  w32(ptr, 0x00, 0);          // hMem (not needed)
  w32(ptr, 0x04, hdc);        // HDC handle — blit_CC8D reads this
  w32(ptr, 0x08, 0);          // hPalette
  w32(ptr, 0x0C, hBitmap);    // HBITMAP handle
  w32(ptr, 0x10, 0);          // hOldBitmap
  w32(ptr, 0x14, 0);          // isTopDown
  w32(ptr, 0x18, w);          // width
  w32(ptr, 0x1C, h);          // height
  w32(ptr, 0x20, w);          // stride (1 byte per pixel for 8bpp, but we use RGBA canvas)
  w32(ptr, 0x24, 0);          // pixelData (not used — we blit from canvas)

  console.log(`Loaded ${url}: ${w}x${h} → struct at ${ptr}, hdc=${hdc}`);
  return ptr;
}

/**
 * Load all Civ2 sprite sheets and wire them into the DAT_ globals
 * the binary's rendering functions expect.
 */
export async function loadAllSprites(assetBase) {
  const sprites = {};

  // Load each sprite sheet
  try { sprites.terrain1 = await loadSpriteSheet(assetBase + '/TERRAIN1.GIF'); } catch(e) { console.warn(e.message); }
  try { sprites.terrain2 = await loadSpriteSheet(assetBase + '/TERRAIN2.GIF'); } catch(e) { console.warn(e.message); }
  try { sprites.cities    = await loadSpriteSheet(assetBase + '/CITIES.GIF'); } catch(e) { console.warn(e.message); }
  try { sprites.units     = await loadSpriteSheet(assetBase + '/UNITS.GIF'); } catch(e) { console.warn(e.message); }
  try { sprites.icons     = await loadSpriteSheet(assetBase + '/ICONS.GIF'); } catch(e) { console.warn(e.message); }
  try { sprites.people    = await loadSpriteSheet(assetBase + '/PEOPLE.GIF'); } catch(e) { console.warn(e.message); }

  // Wire sprite structs into the globals the binary reads
  // DAT_0063e4f8 — main sprite reference (used by FUN_005cef31)
  if (sprites.terrain1 && typeof DAT_0063e4f8 !== 'undefined') {
    w32(DAT_0063e4f8, 0, sprites.terrain1);
  }

  // DAT_006a8c00 — working sprite buffer
  if (sprites.terrain1 && typeof DAT_006a8c00 !== 'undefined') {
    w32(DAT_006a8c00, 0, sprites.terrain1);
  }

  // Also create a main display MSBitmap for the output canvas
  const displayDC = CreateCompatibleDC(0);
  const displayBmp = CreateCompatibleBitmap(0, 1024, 768);
  SelectObject(displayDC, displayBmp);
  const displayPtr = allocStruct(0x28);
  w32(displayPtr, 0x04, displayDC);
  w32(displayPtr, 0x0C, displayBmp);
  w32(displayPtr, 0x18, 1024);
  w32(displayPtr, 0x1C, 768);
  sprites.display = displayPtr;

  // Fix FUN_005c61b0 loop: ensure the queue depth counter starts at 0
  if (typeof DAT_00637ea8 !== 'undefined') {
    w32(DAT_00637ea8, 0, 0);
  }

  console.log('Sprite loading complete:', Object.keys(sprites).filter(k => sprites[k]).length, 'sheets loaded');
  return sprites;
}
