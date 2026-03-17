// ═══════════════════════════════════════════════════════════════════
// minimap.js — Simplified 2D map renderer (LOD fallback)
//
// Renders the full map as colored diamonds to an offscreen canvas,
// using the same coordinate space as the iso renderer so viewport
// pan/zoom/wrap logic works identically.
// ═══════════════════════════════════════════════════════════════════

const TW = 64;
const TH = 32;

// ── Minimap animation timing ──
// Binary ref: Civ2-clone MinimapPanel.cs
const MINIMAP_GLOBE_ROTATION_STEP_MS = 1000; // _globeRotation_dt = 1000ms

// ═══════════════════════════════════════════════════════════════════
// Binary-extracted minimap layout constants
// Source: engine/reference/viewport.js (FUN_00406b4c, FUN_0040785b, FUN_00406e61)
// ═══════════════════════════════════════════════════════════════════

/**
 * Minimap panel dimensions — determined at startup based on screen resolution.
 * @ FUN_0040785b (block_00400000.c:555):
 *   if (screenWidth + sidePanel > 1000): use large (240x150)
 *   else: use base (160x100)
 */
export const MINIMAP_PANEL = {
  resolutionThreshold: 1000,
  base:  { width: 160, height: 100 },  // default for <=1000px
  large: { width: 240, height: 150 },  // used for >1000px
};

/**
 * Minimap tile palette colors (FUN_00406e61 @ 0x00406E61).
 * Returns palette index per tile based on visibility/ownership.
 */
export const MINIMAP_TILE_COLORS = {
  fogOfWar:       10,    // not visible -> palette 10 (black/dark)
  cursorTile:     0x29,  // 41 — white/highlight on cursor position
  land:           0x30,  // 48 — terrain green for visible land
  ocean:          0x5d,  // 93 — ocean blue for visible ocean
  cityOwnerStride: 0x10, // 16 bytes per civ in palette color table
};

/**
 * Minimap viewport outline (FUN_0040701e @ 0x0040701E).
 * The rectangle showing the main viewport's visible area.
 */
export const MINIMAP_VIEWPORT_OUTLINE_COLOR = 0x29;  // palette 41 (white)

/**
 * Minimap refresh threshold — only update minimap if change count > 2.
 * @ 0x0047cb50: if (DAT_00655b02 > 2) refresh minimap
 */
export const MINIMAP_REFRESH_THRESHOLD = 2;

// Terrain type → flat color for minimap rendering
const TERRAIN_COLORS = [
  [200, 180, 100],  //  0 Desert     — sand
  [155, 123,  23],  //  1 Plains     — tan
  [ 55, 123,  23],  //  2 Grassland  — green
  [ 20,  90,  20],  //  3 Forest     — dark green
  [100,  80,  40],  //  4 Hills      — brown
  [130, 110,  90],  //  5 Mountains  — gray-brown
  [160, 160, 140],  //  6 Tundra     — gray-green
  [220, 220, 230],  //  7 Glacier    — white
  [ 40,  80,  50],  //  8 Swamp      — murky green
  [ 10,  70,  10],  //  9 Jungle     — deep green
  [  0,   0,  95],  // 10 Ocean      — dark blue
];

// Civ owner → minimap city dot color (matches CIV_COLORS)
const CIV_DOT_COLORS = [
  '#c80000', '#ffffff', '#00b400', '#3250dc',
  '#f0dc00', '#00c8c8', '#f08c00', '#b400c8',
];

export const Civ2Minimap = {

  // ── Render simplified map to offscreen canvas ──
  // Uses same coordinate space as Civ2Renderer.render() so viewport
  // blit/wrap math is identical.
  render(canvas, mapData, options) {
    options = options || {};
    const { mw, mh, getTerrain, isLand, hasRiver } = mapData;

    // FOW state — byte 4 is persistent "has explored" flag per civ
    const fowEnabled = options.fowEnabled && options.fowCiv != null && !mapData.mapRevealed;
    const fowCiv = options.fowCiv;
    const fowBit = fowEnabled ? (1 << fowCiv) : 0;
    const losData = options.losData || null;

    function isUnexplored(gx, gy) {
      if (!fowEnabled) return false;
      return !(mapData.getVisibility(gx, gy) & fowBit);
    }
    function isDimmed(gx, gy) {
      if (!losData) return false;
      if (fowEnabled && !(mapData.getVisibility(gx, gy) & fowBit)) return false;
      return !losData[gy * mw + gx];
    }

    const wraps = mapData.mapShape === 0;
    const xExtra = wraps ? 4 : 0;
    const xMax = mw + xExtra;
    const canvasW = xMax * TW + (TW >> 1);
    const displayW = mw * TW + (TW >> 1);
    const canvasH = (mh - 1) * (TH >> 1) + TH;
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

    // Background: black when FOW (matches iso unexplored), dark navy otherwise
    ctx.fillStyle = fowEnabled ? '#000000' : '#142850';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Draw terrain diamonds
    for (let gy = 0; gy < mh; gy++) {
      for (let gxRaw = 0; gxRaw < xMax; gxRaw++) {
        const gx = wraps ? (gxRaw % mw) : gxRaw;
        if (!wraps && gx >= mw) continue;
        const px = gxRaw * TW + ((gy % 2) ? (TW >> 1) : 0);
        const py = gy * (TH >> 1);

        // Unexplored: leave as background (black/dark)
        if (isUnexplored(gx, gy)) continue;

        const ter = getTerrain(gx, gy);
        const rgb = TERRAIN_COLORS[ter] || TERRAIN_COLORS[10];

        // River tint: slightly bluer
        let r = rgb[0], g = rgb[1], b = rgb[2];
        if (hasRiver && hasRiver(gx, gy)) {
          r = Math.max(0, r - 30);
          g = Math.max(0, g - 10);
          b = Math.min(255, b + 40);
        }

        // Dimmed: explored but not in current LOS
        if (isDimmed(gx, gy)) {
          r = (r * 0.55) | 0;
          g = (g * 0.55) | 0;
          b = (b * 0.55) | 0;
        }

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.moveTo(px + TW / 2, py);
        ctx.lineTo(px + TW, py + TH / 2);
        ctx.lineTo(px + TW / 2, py + TH);
        ctx.lineTo(px, py + TH / 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Draw city dots on top
    if (mapData.cities) {
      for (const c of mapData.cities) {
        // FOW: skip cities on tiles this civ hasn't explored
        if (fowEnabled && !(mapData.getVisibility(c.gx, c.gy) & fowBit)) continue;

        const px = c.gx * TW + ((c.gy % 2) ? (TW >> 1) : 0);
        const py = c.gy * (TH >> 1);
        const cx = px + TW / 2;
        const cy = py + TH / 2;
        const dotSize = 5;

        ctx.fillStyle = CIV_DOT_COLORS[c.owner] || '#fff';
        ctx.fillRect(cx - dotSize, cy - dotSize, dotSize * 2, dotSize * 2);

        // Wrapping copies
        if (wraps) {
          for (let copy = 1; copy <= Math.ceil(xExtra / mw); copy++) {
            const cpx = (c.gx + mw * copy) * TW + ((c.gy % 2) ? (TW >> 1) : 0);
            const ccx = cpx + TW / 2;
            ctx.fillRect(ccx - dotSize, cy - dotSize, dotSize * 2, dotSize * 2);
          }
        }
      }
    }

    // Mirror wrap seam (same as iso renderer)
    if (wraps) {
      ctx.drawImage(canvas, mw * TW, 0, 32, canvasH, 0, 0, 32, canvasH);
    }

    return { canvasW: canvas.width, canvasH, displayW, wrapW: wraps ? mw * TW : 0 };
  },
};
