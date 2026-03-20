// ═══════════════════════════════════════════════════════════════════
// viewport.js — Viewport rendering, canvas management, FOW/LOS/grid/minimap
// ═══════════════════════════════════════════════════════════════════

import { S, getMinScale, VP_MAX_SCALE } from './state.js';
import { Civ2Renderer } from './renderer.js';
import { Civ2Minimap } from './minimap.js';
import { computeLOS } from '../engine/visibility.js';
import { CIV_COLORS } from '../engine/defs.js';

function resizeViewport() {
  const dpr = window.devicePixelRatio || 1;
  S.vp.logicalW = window.innerWidth;
  S.vp.logicalH = window.innerHeight;
  S.viewportCanvas.width = S.vp.logicalW * dpr;
  S.viewportCanvas.height = S.vp.logicalH * dpr;
  S.viewportCanvas.style.width = S.vp.logicalW + 'px';
  S.viewportCanvas.style.height = S.vp.logicalH + 'px';
  S.vCtx.imageSmoothingEnabled = false;
  S.vp.scale = Math.max(getMinScale(), Math.min(VP_MAX_SCALE, S.vp.scale));
  clampViewport();
}

function clampViewport() {
  const visW = S.vp.logicalW / S.vp.scale;
  const visH = S.vp.logicalH / S.vp.scale;
  // Allow over-scroll so any map edge can be scrolled into view
  // (when viewport is larger than map, both edges are reachable)
  const yMin = Math.min(0, S.vp.offH - visH);
  const yMax = Math.max(0, S.vp.offH - visH);
  S.vp.y = Math.max(yMin, Math.min(S.vp.y, yMax));
  if (S.vp.wraps && S.vp.wrapW > 0) {
    S.vp.x = ((S.vp.x % S.vp.wrapW) + S.vp.wrapW) % S.vp.wrapW;
  } else {
    const xMin = Math.min(0, S.vp.offW - visW);
    const xMax = Math.max(0, S.vp.offW - visW);
    S.vp.x = Math.max(xMin, Math.min(S.vp.x, xMax));
  }
}

// ── Deferred canvas rendering ──
// Renders remaining canvas variants in background after initial map is shown.
// If a toggle is clicked before background rendering completes, the needed
// canvas is rendered on-demand (one-time cost).

function ensureLosData(mapData, fowCiv) {
  if (!S.cachedLosData) S.cachedLosData = computeLOS(mapData, fowCiv);
  return S.cachedLosData;
}

function ensureGridCanvas(mapData) {
  if (S.gridCanvas) return;
  S.gridCanvas = document.createElement('canvas');
  S.gridCanvas.width = S.mapCanvasBase.width;
  S.gridCanvas.height = S.mapCanvasBase.height;
  const ctx = S.gridCanvas.getContext('2d', { colorSpace: 'srgb' });
  const TW = Civ2Renderer.TW, TH = Civ2Renderer.TH;
  const wraps = mapData.mapShape === 0;
  const xExtra = wraps ? 4 : 0;
  const xMax = mapData.mw + xExtra;
  ctx.strokeStyle = 'rgb(0,168,0)';
  ctx.lineWidth = 1;
  for (let gy = 0; gy < mapData.mh; gy++) {
    for (let gx = 0; gx < xMax; gx++) {
      const px = gx * TW + ((gy % 2) ? (TW >> 1) : 0);
      const py = gy * (TH >> 1);
      ctx.beginPath();
      ctx.moveTo(px + TW / 2, py);
      ctx.lineTo(px + TW, py + TH / 2);
      ctx.lineTo(px + TW / 2, py + TH);
      ctx.lineTo(px, py + TH / 2);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

function ensureMinimapCanvas(mapData) {
  if (S.minimapCanvas) return;
  S.minimapCanvas = document.createElement('canvas');
  Civ2Minimap.render(S.minimapCanvas, mapData, { fowEnabled: false });
}

function invalidateFowCanvases() {
  S.mapCanvasLos = null;
  S.mapCanvasFow = null;
  S.mapCanvasFowLos = null;
  S.minimapCanvasLos = null;
  S.minimapCanvasFow = null;
  S.minimapCanvasFowLos = null;
  S._losRendering = null;
  S._fowRendering = null;
  S._fowLosRendering = null;
}

async function ensureLosCanvas(mapData, sprites) {
  if (S.mapCanvasLos) return;
  if (S._losRendering) return S._losRendering;
  S._losRendering = (async () => {
    const losData = ensureLosData(mapData, S.cachedFowCiv);
    const c = document.createElement('canvas');
    await Civ2Renderer.render(c, mapData, sprites, null,
      { fowEnabled: false, gridEnabled: false, losData, selectedUnitIndex: S.mpSelectedUnit });
    S.mapCanvasLos = c;
    S._losRendering = null;
  })();
  return S._losRendering;
}

function ensureMinimapLosCanvas(mapData) {
  if (S.minimapCanvasLos) return;
  const losData = ensureLosData(mapData, S.cachedFowCiv);
  S.minimapCanvasLos = document.createElement('canvas');
  Civ2Minimap.render(S.minimapCanvasLos, mapData, { fowEnabled: false, losData });
}

async function ensureFowCanvas(mapData, sprites) {
  if (S.mapCanvasFow) return;
  if (S._fowRendering) return S._fowRendering;
  S._fowRendering = (async () => {
    const c = document.createElement('canvas');
    await Civ2Renderer.render(c, mapData, sprites, null,
      { fowEnabled: true, fowCiv: S.cachedFowCiv, gridEnabled: false, selectedUnitIndex: S.mpSelectedUnit });
    S.mapCanvasFow = c;
    S._fowRendering = null;
  })();
  return S._fowRendering;
}

async function ensureFowLosCanvas(mapData, sprites) {
  if (S.mapCanvasFowLos) return;
  if (S._fowLosRendering) return S._fowLosRendering;
  S._fowLosRendering = (async () => {
    const losData = ensureLosData(mapData, S.cachedFowCiv);
    const c = document.createElement('canvas');
    await Civ2Renderer.render(c, mapData, sprites, null,
      { fowEnabled: true, fowCiv: S.cachedFowCiv, gridEnabled: false, losData, selectedUnitIndex: S.mpSelectedUnit });
    S.mapCanvasFowLos = c;
    S._fowLosRendering = null;
  })();
  return S._fowLosRendering;
}

function ensureMinimapFowCanvas(mapData) {
  if (S.minimapCanvasFow) return;
  S.minimapCanvasFow = document.createElement('canvas');
  Civ2Minimap.render(S.minimapCanvasFow, mapData, { fowEnabled: true, fowCiv: S.cachedFowCiv });
}

function ensureMinimapFowLosCanvas(mapData) {
  if (S.minimapCanvasFowLos) return;
  const losData = ensureLosData(mapData, S.cachedFowCiv);
  S.minimapCanvasFowLos = document.createElement('canvas');
  Civ2Minimap.render(S.minimapCanvasFowLos, mapData, { fowEnabled: true, fowCiv: S.cachedFowCiv, losData });
}

// Queue background rendering of deferred canvases
function deferredRenderQueue(mapData, sprites, fowCiv) {
  const steps = [
    () => ensureGridCanvas(mapData),
    () => ensureMinimapCanvas(mapData),
    async () => ensureLosCanvas(mapData, sprites),
    () => ensureMinimapLosCanvas(mapData),
    async () => ensureFowCanvas(mapData, sprites),
    () => ensureMinimapFowCanvas(mapData),
    async () => ensureFowLosCanvas(mapData, sprites),
    () => ensureMinimapFowLosCanvas(mapData),
  ];
  let i = 0;
  async function next() {
    if (i >= steps.length) return;
    await steps[i++]();
    setTimeout(next, 0);
  }
  setTimeout(next, 0);
}

// Blit a source canvas to the viewport, handling wrapping
function blitToViewport(source) {
  const dpr = window.devicePixelRatio || 1;
  const bw = S.viewportCanvas.width, bh = S.viewportCanvas.height;
  const visW = S.vp.logicalW / S.vp.scale;
  const visH = S.vp.logicalH / S.vp.scale;
  const pxPerMap = S.vp.scale * dpr;

  // Ensure nearest-neighbor scaling for crisp pixel art (canvas resize resets this)
  S.vCtx.imageSmoothingEnabled = false;

  if (S.vp.wraps) {
    const x1 = ((S.vp.x % S.vp.wrapW) + S.vp.wrapW) % S.vp.wrapW;
    const rightChunk = Math.min(visW, S.vp.wrapW - x1);
    S.vCtx.drawImage(source, x1, S.vp.y, rightChunk, visH,
                   0, 0, rightChunk * pxPerMap, bh);
    let drawn = rightChunk;
    while (drawn < visW) {
      const chunk = Math.min(visW - drawn, S.vp.wrapW);
      S.vCtx.drawImage(source, 0, S.vp.y, chunk, visH,
                     drawn * pxPerMap, 0, chunk * pxPerMap, bh);
      drawn += chunk;
    }
  } else {
    S.vCtx.drawImage(source, S.vp.x, S.vp.y, visW, visH,
                   0, 0, S.viewportCanvas.width, S.viewportCanvas.height);
  }
}

function drawViewport() {
  if (S.vp.offW === 0 || S.vp.offH === 0) return;
  const md = S.currentMapData;
  if (!md) return;
  const minimapOn = document.getElementById('minimap-toggle').checked;
  const fowOn = document.getElementById('fow-toggle').checked;
  const losOn = document.getElementById('los-toggle').checked;
  const gridOn = document.getElementById('grid-toggle').checked;

  // Pick the correct canvas for current toggle state.
  // If the ideal canvas isn't ready yet, keep the current viewport (don't redraw)
  // and schedule a redraw once the async render completes.
  let source;
  if (minimapOn) {
    if (fowOn && losOn) { ensureMinimapFowLosCanvas(md); source = S.minimapCanvasFowLos; }
    else if (fowOn) { ensureMinimapFowCanvas(md); source = S.minimapCanvasFow; }
    else if (losOn) { ensureMinimapLosCanvas(md); source = S.minimapCanvasLos; }
    else { ensureMinimapCanvas(md); source = S.minimapCanvas; }
  } else {
    if (fowOn && losOn) {
      source = S.mapCanvasFowLos;
      if (!source) { ensureFowLosCanvas(md, S.mapSprites).then(() => drawViewport()); return; }
    } else if (fowOn) {
      source = S.mapCanvasFow;
      if (!source) { ensureFowCanvas(md, S.mapSprites).then(() => drawViewport()); return; }
    } else if (losOn) {
      source = S.mapCanvasLos;
      if (!source) { ensureLosCanvas(md, S.mapSprites).then(() => drawViewport()); return; }
    } else {
      source = S.mapCanvasBase;
    }
  }
  if (!source) return;

  S.vCtx.clearRect(0, 0, S.viewportCanvas.width, S.viewportCanvas.height);
  blitToViewport(source);

  // Composite grid overlay on top (if enabled and not minimap)
  if (gridOn && !minimapOn) {
    ensureGridCanvas(md);
    blitToViewport(S.gridCanvas);
  }

  // Territory overlay: semi-transparent civ colors on owned tiles
  const territoryOn = document.getElementById('territory-toggle')?.checked;
  if (territoryOn && !minimapOn && md.getTileOwnership) {
    const dpr = window.devicePixelRatio || 1;
    const pxPerMap = S.vp.scale * dpr;
    const TW = 64, TH = 32;
    const vw = S.viewportCanvas.width / pxPerMap;
    const vh = S.viewportCanvas.height / pxPerMap;
    const startGx = Math.floor(S.vp.x / TW) - 1;
    const startGy = Math.floor(S.vp.y / (TH / 2)) - 1;
    const endGx = Math.ceil((S.vp.x + vw) / TW) + 1;
    const endGy = Math.ceil((S.vp.y + vh) / (TH / 2)) + 1;

    S.vCtx.save();
    S.vCtx.globalAlpha = 0.3;
    for (let gy = Math.max(0, startGy); gy < Math.min(md.mh, endGy); gy++) {
      const xMax = S.vp.wraps ? md.mw : Math.min(md.mw, endGx);
      for (let gx = Math.max(0, startGx); gx < xMax; gx++) {
        const wgx = S.vp.wraps ? ((gx % md.mw) + md.mw) % md.mw : gx;
        const owner = md.getTileOwnership(wgx, gy);
        if (owner == null || owner <= 0 || owner > 7) continue;
        const color = CIV_COLORS[owner] || '#888';
        const px = (gx * TW + ((gy % 2) ? (TW >> 1) : 0) - S.vp.x) * pxPerMap;
        const py = (gy * (TH >> 1) - S.vp.y) * pxPerMap;

        S.vCtx.fillStyle = color;
        S.vCtx.beginPath();
        S.vCtx.moveTo(px + TW * pxPerMap / 2, py);
        S.vCtx.lineTo(px + TW * pxPerMap, py + TH * pxPerMap / 2);
        S.vCtx.lineTo(px + TW * pxPerMap / 2, py + TH * pxPerMap);
        S.vCtx.lineTo(px, py + TH * pxPerMap / 2);
        S.vCtx.closePath();
        S.vCtx.fill();
      }
    }
    S.vCtx.restore();
  }

  // Save the region under the unit overlay (small area, not full viewport)
  S.blinkUnderlay = null;
  if (S.mpSelectedUnit != null && S.blinkUnitOverlay && !minimapOn) {
    const region = getOverlayViewportRect(S.blinkUnitOverlay);
    if (region) {
      S.blinkUnderlay = {
        imageData: S.vCtx.getImageData(region.x, region.y, region.w, region.h),
        vpX: region.x, vpY: region.y,
      };
    }
    // Draw unit overlay if blink is on
    if (S.blinkOn) {
      blitPatchToViewport(S.blinkUnitOverlay.canvas, S.blinkUnitOverlay.x, S.blinkUnitOverlay.y);
    }
  }
}

// Get the viewport-pixel rectangle for a map-space overlay patch
function getOverlayViewportRect(overlay) {
  const dpr = window.devicePixelRatio || 1;
  const pxPerMap = S.vp.scale * dpr;
  let vpX, vpY;
  if (S.vp.wraps) {
    const x1 = ((S.vp.x % S.vp.wrapW) + S.vp.wrapW) % S.vp.wrapW;
    vpX = (overlay.x - x1) * pxPerMap;
    // Handle wrapping — find the visible copy
    const visW = S.vp.logicalW / S.vp.scale;
    for (let wrap = -1; wrap <= 1; wrap++) {
      const px = overlay.x + wrap * S.vp.wrapW;
      const rx = (px - x1) * pxPerMap;
      if (rx + overlay.canvas.width * pxPerMap >= 0 && rx < S.viewportCanvas.width) {
        vpX = rx;
        break;
      }
    }
  } else {
    vpX = (overlay.x - S.vp.x) * pxPerMap;
  }
  vpY = (overlay.y - S.vp.y) * pxPerMap;
  const w = Math.ceil(overlay.canvas.width * pxPerMap);
  const h = Math.ceil(overlay.canvas.height * pxPerMap);
  // Clamp to viewport bounds
  const x0 = Math.max(0, Math.floor(vpX));
  const y0 = Math.max(0, Math.floor(vpY));
  const x1 = Math.min(S.viewportCanvas.width, Math.ceil(vpX + w));
  const y1 = Math.min(S.viewportCanvas.height, Math.ceil(vpY + h));
  if (x1 <= x0 || y1 <= y0) return null;
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

// Blit a small patch canvas to the viewport at the correct offscreen position
function blitPatchToViewport(patchCanvas, offX, offY) {
  const dpr = window.devicePixelRatio || 1;
  const pxPerMap = S.vp.scale * dpr;
  const pw = patchCanvas.width, ph = patchCanvas.height;

  if (S.vp.wraps) {
    const x1 = ((S.vp.x % S.vp.wrapW) + S.vp.wrapW) % S.vp.wrapW;
    const visW = S.vp.logicalW / S.vp.scale;
    // The patch might appear at one or two positions (wrapping)
    for (let wrap = -1; wrap <= 1; wrap++) {
      const patchX = offX + wrap * S.vp.wrapW;
      const relX = patchX - x1;
      if (relX + pw < 0 || relX > visW) continue;
      const vpX = relX * pxPerMap;
      const vpY = (offY - S.vp.y) * pxPerMap;
      S.vCtx.drawImage(patchCanvas, 0, 0, pw, ph, vpX, vpY, pw * pxPerMap, ph * pxPerMap);
    }
  } else {
    const vpX = (offX - S.vp.x) * pxPerMap;
    const vpY = (offY - S.vp.y) * pxPerMap;
    S.vCtx.drawImage(patchCanvas, 0, 0, pw, ph, vpX, vpY, pw * pxPerMap, ph * pxPerMap);
  }
}

export {
  resizeViewport,
  clampViewport,
  drawViewport,
  blitPatchToViewport,
  invalidateFowCanvases,
  deferredRenderQueue,
  ensureFowCanvas,
  ensureFowLosCanvas,
  ensureLosCanvas,
  ensureGridCanvas,
  ensureMinimapCanvas,
  ensureLosData,
  getOverlayViewportRect,
  blitToViewport,
};
