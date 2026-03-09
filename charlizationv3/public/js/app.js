// ═══════════════════════════════════════════════════════════════════
// app.js — Entry point: file loading, render trigger, controls,
//          interactive scrolling viewport
// ═══════════════════════════════════════════════════════════════════
import { Civ2Parser } from '../engine/parser.js';
import { Civ2Renderer } from './renderer.js';
import { Civ2CityView } from './cityview.js';
import { Civ2CityDialog } from './citydialog.js';
import { initEvents } from './events.js';
import { Civ2Minimap } from './minimap.js';
import { computeLOS } from '../engine/visibility.js';
import { getGameYearFromMap } from '../engine/year.js';
import { GOVERNMENT_NAMES, LEADERS_TXT_NAMES, CIV_COLORS } from '../engine/defs.js';
import { createTransport } from '../net/transport.js';
import { createAccessors, reconstructMapData } from '../engine/state.js';
import { NUMPAD_DIR } from '../engine/movement.js';

const files = { sav: null, t1: null, t2: null, cities: null, units: null, icons: null, people: null, cityGif: null };
// Pre-rendered offscreen canvases for instant toggle switching
let mapCanvasBase = null;     // iso map: no FOW, no LOS
let mapCanvasLos = null;      // iso map: LOS only (no FOW)
let mapCanvasFow = null;      // iso map: FOW on, no LOS
let mapCanvasFowLos = null;   // iso map: FOW on + LOS
let gridCanvas = null;        // transparent overlay: grid diamonds only
let minimapCanvas = null;     // simplified 2D map
let minimapCanvasLos = null;  // simplified 2D map with LOS only
let minimapCanvasFow = null;  // simplified 2D map with FOW
let minimapCanvasFowLos = null; // simplified 2D map with FOW + LOS
const cvFiles = {};   // cv_res*.gif files for city view (keyed by resource ID)
let cvSprites = null; // lazily extracted city view sprites
let cvBackgrounds = null; // Map of resourceId → Image
let currentMapData = null;
let cdSprites = null;
let mapSprites = null;
let cachedFowCiv = 0;
let cachedLosData = null;

// ── Viewport state (shared with events.js via reference) ──
const vp = {
  x: 0, y: 0,            // top-left of viewport in offscreen coords
  scale: 1,               // zoom factor (1 = 1:1, >1 = zoomed in)
  offW: 0, offH: 0,       // offscreen canvas dimensions
  wrapW: 0, wraps: false,  // wrapping state
  logicalW: 0, logicalH: 0, // CSS/logical viewport dimensions
};
const SCROLL_STEP = 64;
const VP_MAX_SCALE = 4;
// Dynamic min scale: don't zoom out further than the full map is visible.
// Wrapping maps: fit the full globe width (height may extend off-screen).
// Non-wrapping maps: fit both axes so no empty space is shown.
function getMinScale() {
  if (vp.offW === 0 || vp.offH === 0) return 0.25;
  if (vp.wraps) return vp.logicalW / vp.wrapW;
  return Math.max(vp.logicalW / vp.offW, vp.logicalH / vp.offH);
}

// ── Scene management ──
let currentScene = 'menu';
function setScene(scene) {
  document.getElementById('menu-scene').style.display = scene === 'menu' ? 'flex' : 'none';
  document.getElementById('lobby-scene').style.display = scene === 'lobby' ? 'flex' : 'none';
  document.getElementById('game-scene').style.display = scene === 'game' ? '' : 'none';
  currentScene = scene;
  if (scene === 'game' && vp.offW > 0) {
    resizeViewport();
    drawViewport();
  }
}

// ── Status bar game info ──
function updateGameInfo(mapData, civOverride) {
  const el = document.getElementById('game-info');
  if (!mapData || !mapData.gameState) { el.innerHTML = ''; return; }
  const gs = mapData.gameState;
  const pc = civOverride != null ? civOverride : gs.playerCiv;
  const civName = mapData.civNames ? mapData.civNames[pc] : `Civ ${pc}`;
  const civColor = CIV_COLORS[pc] || '#e0e0e0';
  const cd = mapData.civData && mapData.civData[pc];
  const year = getGameYearFromMap(mapData);
  const gold = cd ? cd.treasury : 0;
  const govt = cd ? (GOVERNMENT_NAMES[cd.government] || '?') : '';
  let pop = 0;
  if (mapData.cities) {
    for (const c of mapData.cities) {
      if (c.owner === pc) pop += c.size;
    }
  }
  pop *= 10000;
  const sep = '<span class="gi-sep">│</span>';
  el.innerHTML =
    `<span class="gi-player" style="color:${civColor}">${civName}</span> ${sep} ` +
    `<span class="gi-govt">${govt}</span> ${sep} ` +
    `<span class="gi-year">${year}</span> ${sep} ` +
    `<span class="gi-gold">${gold.toLocaleString()} Gold</span> ${sep} ` +
    `<span class="gi-pop">${pop.toLocaleString()} People</span>`;
}

// ── Auto-detect files in same directory ──
(async function autoDetect() {
  if (location.protocol === 'file:') return;

  // Known GIF files (always co-located with app)
  const known = [
    { name: 'assets/sprites/TERRAIN1.GIF', key: 't1' },
    { name: 'assets/sprites/TERRAIN2.GIF', key: 't2' },
    { name: 'assets/sprites/CITIES.GIF',   key: 'cities' },
    { name: 'assets/sprites/UNITS.GIF',    key: 'units' },
    { name: 'assets/sprites/ICONS.GIF',    key: 'icons' },
    { name: 'assets/sprites/PEOPLE.GIF',   key: 'people' },
    { name: 'assets/sprites/CITY.GIF',     key: 'cityGif' },
  ];
  await Promise.all(known.map(async ({ name, key }) => {
    try {
      const resp = await fetch(name);
      if (!resp.ok) return;
      const blob = await resp.blob();
      files[key] = new File([blob], name, { type: blob.type });
    } catch (_) {}
  }));

  // City view GIFs (optional, silent)
  const cvKnown = [
    { name: 'assets/cityview/cv_res300.gif', id: 300 }, { name: 'assets/cityview/cv_res305.gif', id: 305 },
    { name: 'assets/cityview/cv_res310.gif', id: 310 },
    { name: 'assets/cityview/cv_res340.gif', id: 340 }, { name: 'assets/cityview/cv_res341.gif', id: 341 },
    { name: 'assets/cityview/cv_res342.gif', id: 342 }, { name: 'assets/cityview/cv_res343.gif', id: 343 },
    { name: 'assets/cityview/cv_res345.gif', id: 345 }, { name: 'assets/cityview/cv_res346.gif', id: 346 },
    { name: 'assets/cityview/cv_res347.gif', id: 347 }, { name: 'assets/cityview/cv_res348.gif', id: 348 },
    { name: 'assets/cityview/cv_res350.gif', id: 350 }, { name: 'assets/cityview/cv_res351.gif', id: 351 },
    { name: 'assets/cityview/cv_res352.gif', id: 352 }, { name: 'assets/cityview/cv_res353.gif', id: 353 },
  ];
  await Promise.all(cvKnown.map(async ({ name, id }) => {
    try {
      const resp = await fetch(name);
      if (!resp.ok) return;
      const blob = await resp.blob();
      cvFiles[id] = new File([blob], name, { type: blob.type });
    } catch (_) {}
  }));

  // Find save files via JSON API (Node server) or HTML directory listing (fallback)
  try {
    const resp = await fetch('saves/');
    if (resp.ok) {
      const contentType = resp.headers.get('content-type') || '';
      let savFiles;
      if (contentType.includes('application/json')) {
        savFiles = await resp.json();
      } else {
        const html = await resp.text();
        const re = /href="([^"]+\.(?:sav|SAV|scn|SCN|net|NET))"/g;
        savFiles = [];
        let m;
        while ((m = re.exec(html))) savFiles.push(m[1]);
      }
      if (savFiles.length > 0) {
        const savName = 'saves/' + savFiles[0];
        const savResp = await fetch(savName);
        if (savResp.ok) {
          const blob = await savResp.blob();
          files.sav = new File([blob], savName, { type: 'application/octet-stream' });
          document.getElementById('sav-btn').classList.add('loaded');
          document.getElementById('sav-btn').textContent = savName;
        }
      }
    }
  } catch (_) {}

  checkReady();
})();

// ── File input handlers ──
document.getElementById('sav-input').addEventListener('change', e => {
  if (!e.target.files[0]) return;
  files.sav = e.target.files[0];
  document.getElementById('sav-btn').classList.add('loaded');
  document.getElementById('sav-btn').textContent = files.sav.name;
  checkReady();
  // Auto-switch to game scene and render if sprites are ready
  if (files.t1 && files.t2) {
    setScene('game');
    doRender();
  }
});
function checkReady() {
  const ready = files.sav && files.t1 && files.t2;
  document.getElementById('render-btn').disabled = !ready;
  if (ready) {
    document.getElementById('status').textContent = 'Ready \u2014 click Render.';
  }
}

document.getElementById('render-btn').addEventListener('click', doRender);

// Toggle controls → instant viewport swap (no re-render needed)
document.getElementById('fow-toggle').addEventListener('change', () => { if (currentMapData) drawViewport(); });
document.getElementById('grid-toggle').addEventListener('change', () => { if (currentMapData) drawViewport(); });
document.getElementById('minimap-toggle').addEventListener('change', () => { if (currentMapData) drawViewport(); });
document.getElementById('los-toggle').addEventListener('change', () => { if (currentMapData) drawViewport(); });
// Civ selector changes which civ's FOW/LOS data → invalidate FOW canvases and redraw
document.getElementById('fow-civ').addEventListener('change', () => {
  if (!currentMapData) return;
  const val = document.getElementById('fow-civ').value;
  cachedFowCiv = val !== '' ? parseInt(val) : currentMapData.playerCiv;
  cachedLosData = null;
  mapCanvasLos = null;
  mapCanvasFow = null;
  mapCanvasFowLos = null;
  minimapCanvasLos = null;
  minimapCanvasFow = null;
  minimapCanvasFowLos = null;
  updateGameInfo(currentMapData, cachedFowCiv);
  drawViewport();
});

// ── Main render flow ──
let rendering = false;
async function doRender() {
  if (rendering) return;
  rendering = true;
  const overlay = document.getElementById('loading-overlay');
  const msg = document.getElementById('loading-msg');
  overlay.style.display = 'flex';

  try {
    // 1. Load and parse save data (skip if currentMapData already set from server)
    const mapData = currentMapData || await (async () => {
      msg.textContent = 'Loading save file...';
      const savBuf = new Uint8Array(await files.sav.arrayBuffer());
      msg.textContent = 'Parsing save file...';
      await new Promise(r => setTimeout(r, 10));
      const md = Civ2Parser.parse(savBuf, files.sav.name);
      currentMapData = md;
      return md;
    })();

    // Populate FOW civ selector
    const fowSelect = document.getElementById('fow-civ');
    const previousValue = fowSelect.value;
    fowSelect.innerHTML = '';
    // Resolve civ display names if not already set
    if (!mapData.civNames) {
      const civNames = {};
      for (let i = 0; i < 8; i++) {
        const nb = mapData.civNameBlocks && mapData.civNameBlocks[i];
        const cd = mapData.civData && mapData.civData[i];
        const tribeName = nb && nb.tribeName;
        const rulesName = cd && cd.rulesCivNumber != null && LEADERS_TXT_NAMES[cd.rulesCivNumber];
        civNames[i] = i === 0 ? 'Barbarians' : (tribeName || rulesName || `Civ ${i}`);
      }
      mapData.civNames = civNames;
    }
    for (let i = 0; i < 8; i++) {
      if (!(mapData.civsAlive & (1 << i))) continue;
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = mapData.civNames[i] || `Civ ${i}`;
      fowSelect.appendChild(opt);
    }
    if (previousValue !== '' && [...fowSelect.options].some(o => o.value === previousValue)) {
      fowSelect.value = previousValue;
    } else {
      fowSelect.value = mapData.playerCiv;
    }
    fowSelect.disabled = false;

    cdSprites = null;

    // 3. Load sprite sheets
    msg.textContent = 'Loading sprite sheets...';
    const imgPromises = [
      Civ2Renderer.loadImage(files.t1),
      Civ2Renderer.loadImage(files.t2)
    ];
    if (files.cities) imgPromises.push(Civ2Renderer.loadImage(files.cities));
    if (files.units) imgPromises.push(Civ2Renderer.loadImage(files.units));
    if (files.icons) imgPromises.push(Civ2Renderer.loadImage(files.icons));
    const imgs = await Promise.all(imgPromises);
    const t1Img = imgs[0], t2Img = imgs[1];
    let idx = 2;
    const citiesImg = files.cities ? imgs[idx++] : null;
    const unitsImg = files.units ? imgs[idx++] : null;
    const iconsImg = files.icons ? imgs[idx++] : null;

    // 4. Extract sprites
    msg.textContent = 'Extracting sprites...';
    await new Promise(r => setTimeout(r, 10));
    const t1Ctx = Civ2Renderer.imgToCtx(t1Img);
    const t2Ctx = Civ2Renderer.imgToCtx(t2Img);
    const citiesCtx = citiesImg ? Civ2Renderer.imgToCtx(citiesImg) : null;
    const unitsCtx = unitsImg ? Civ2Renderer.imgToCtx(unitsImg) : null;
    const iconsCtx = iconsImg ? Civ2Renderer.imgToCtx(iconsImg) : null;
    const sprites = Civ2Renderer.extractAllSprites(t1Ctx, t2Ctx, citiesCtx, unitsCtx, iconsCtx);
    Civ2Renderer.prerecolorUnits(sprites, mapData.units);
    mapSprites = sprites;

    // 5. Render base map only — show immediately, defer the rest
    const fowCivVal = document.getElementById('fow-civ').value;
    const fowCiv = fowCivVal !== '' ? parseInt(fowCivVal) : mapData.playerCiv;

    // Clear deferred canvases (will be rendered lazily)
    mapCanvasLos = null;
    mapCanvasFow = null;
    mapCanvasFowLos = null;
    gridCanvas = null;
    minimapCanvas = null;
    minimapCanvasLos = null;
    minimapCanvasFow = null;
    minimapCanvasFowLos = null;
    cachedFowCiv = fowCiv;
    cachedLosData = null;

    msg.textContent = 'Rendering map...';
    await new Promise(r => setTimeout(r, 10));
    mapCanvasBase = document.createElement('canvas');
    const result = await Civ2Renderer.render(mapCanvasBase, mapData, sprites, null,
      { fowEnabled: false, gridEnabled: false });

    // 6. Set up viewport and show map immediately
    vp.offW = mapCanvasBase.width;
    vp.offH = mapCanvasBase.height;
    vp.wraps = (mapData.mapShape === 0);
    vp.wrapW = result.wrapW || vp.offW;
    resizeViewport();
    drawViewport();

    document.getElementById('status').textContent =
      `${mapData.mw}\u00d7${mapData.mh} | ${mapData.cities.length} cities | ` +
      `${mapData.units.length} units`;
    updateGameInfo(mapData);

    overlay.style.display = 'none';

    // 7. Pre-render remaining canvases in background
    deferredRenderQueue(mapData, sprites, fowCiv);

  } catch (err) {
    console.error(err);
    alert('Error: ' + err.message);
    overlay.style.display = 'none';
  } finally {
    rendering = false;
  }
}

// ═══════════════════════════════════════════════════════════════════
// VIEWPORT — blit a window from the offscreen canvas
// ═══════════════════════════════════════════════════════════════════
const viewportCanvas = document.getElementById('viewport-canvas');
const vCtx = viewportCanvas.getContext('2d', { colorSpace: 'srgb' });

function resizeViewport() {
  const dpr = window.devicePixelRatio || 1;
  vp.logicalW = window.innerWidth;
  vp.logicalH = window.innerHeight;
  viewportCanvas.width = vp.logicalW * dpr;
  viewportCanvas.height = vp.logicalH * dpr;
  viewportCanvas.style.width = vp.logicalW + 'px';
  viewportCanvas.style.height = vp.logicalH + 'px';
  vCtx.imageSmoothingEnabled = false;
  vp.scale = Math.max(getMinScale(), Math.min(VP_MAX_SCALE, vp.scale));
  clampViewport();
}

function clampViewport() {
  const visW = vp.logicalW / vp.scale;
  const visH = vp.logicalH / vp.scale;
  // Allow over-scroll so any map edge can be scrolled into view
  // (when viewport is larger than map, both edges are reachable)
  const yMin = Math.min(0, vp.offH - visH);
  const yMax = Math.max(0, vp.offH - visH);
  vp.y = Math.max(yMin, Math.min(vp.y, yMax));
  if (vp.wraps && vp.wrapW > 0) {
    vp.x = ((vp.x % vp.wrapW) + vp.wrapW) % vp.wrapW;
  } else {
    const xMin = Math.min(0, vp.offW - visW);
    const xMax = Math.max(0, vp.offW - visW);
    vp.x = Math.max(xMin, Math.min(vp.x, xMax));
  }
}

// ── Deferred canvas rendering ──
// Renders remaining canvas variants in background after initial map is shown.
// If a toggle is clicked before background rendering completes, the needed
// canvas is rendered on-demand (one-time cost).

function ensureLosData(mapData, fowCiv) {
  if (!cachedLosData) cachedLosData = computeLOS(mapData, fowCiv);
  return cachedLosData;
}

function ensureGridCanvas(mapData) {
  if (gridCanvas) return;
  gridCanvas = document.createElement('canvas');
  gridCanvas.width = mapCanvasBase.width;
  gridCanvas.height = mapCanvasBase.height;
  const ctx = gridCanvas.getContext('2d', { colorSpace: 'srgb' });
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
  if (minimapCanvas) return;
  minimapCanvas = document.createElement('canvas');
  Civ2Minimap.render(minimapCanvas, mapData, { fowEnabled: false });
}

async function ensureLosCanvas(mapData, sprites) {
  if (mapCanvasLos) return;
  const losData = ensureLosData(mapData, cachedFowCiv);
  mapCanvasLos = document.createElement('canvas');
  await Civ2Renderer.render(mapCanvasLos, mapData, sprites, null,
    { fowEnabled: false, gridEnabled: false, losData });
}

function ensureMinimapLosCanvas(mapData) {
  if (minimapCanvasLos) return;
  const losData = ensureLosData(mapData, cachedFowCiv);
  minimapCanvasLos = document.createElement('canvas');
  Civ2Minimap.render(minimapCanvasLos, mapData, { fowEnabled: false, losData });
}

async function ensureFowCanvas(mapData, sprites) {
  if (mapCanvasFow) return;
  mapCanvasFow = document.createElement('canvas');
  await Civ2Renderer.render(mapCanvasFow, mapData, sprites, null,
    { fowEnabled: true, fowCiv: cachedFowCiv, gridEnabled: false });
}

async function ensureFowLosCanvas(mapData, sprites) {
  if (mapCanvasFowLos) return;
  const losData = ensureLosData(mapData, cachedFowCiv);
  mapCanvasFowLos = document.createElement('canvas');
  await Civ2Renderer.render(mapCanvasFowLos, mapData, sprites, null,
    { fowEnabled: true, fowCiv: cachedFowCiv, gridEnabled: false, losData });
}

function ensureMinimapFowCanvas(mapData) {
  if (minimapCanvasFow) return;
  minimapCanvasFow = document.createElement('canvas');
  Civ2Minimap.render(minimapCanvasFow, mapData, { fowEnabled: true, fowCiv: cachedFowCiv });
}

function ensureMinimapFowLosCanvas(mapData) {
  if (minimapCanvasFowLos) return;
  const losData = ensureLosData(mapData, cachedFowCiv);
  minimapCanvasFowLos = document.createElement('canvas');
  Civ2Minimap.render(minimapCanvasFowLos, mapData, { fowEnabled: true, fowCiv: cachedFowCiv, losData });
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
  const bw = viewportCanvas.width, bh = viewportCanvas.height;
  const visW = vp.logicalW / vp.scale;
  const visH = vp.logicalH / vp.scale;
  const pxPerMap = vp.scale * dpr;

  if (vp.wraps) {
    const x1 = ((vp.x % vp.wrapW) + vp.wrapW) % vp.wrapW;
    const rightChunk = Math.min(visW, vp.wrapW - x1);
    vCtx.drawImage(source, x1, vp.y, rightChunk, visH,
                   0, 0, rightChunk * pxPerMap, bh);
    let drawn = rightChunk;
    while (drawn < visW) {
      const chunk = Math.min(visW - drawn, vp.wrapW);
      vCtx.drawImage(source, 0, vp.y, chunk, visH,
                     drawn * pxPerMap, 0, chunk * pxPerMap, bh);
      drawn += chunk;
    }
  } else {
    vCtx.drawImage(source, vp.x, vp.y, visW, visH,
                   0, 0, viewportCanvas.width, viewportCanvas.height);
  }
}

async function drawViewport() {
  if (vp.offW === 0 || vp.offH === 0) return;
  const md = currentMapData;
  if (!md) return;
  const minimapOn = document.getElementById('minimap-toggle').checked;
  const fowOn = document.getElementById('fow-toggle').checked;
  const losOn = document.getElementById('los-toggle').checked;
  const gridOn = document.getElementById('grid-toggle').checked;

  // Ensure needed canvases exist (renders on-demand if background hasn't finished)
  let source;
  if (minimapOn) {
    if (fowOn && losOn) { ensureMinimapFowLosCanvas(md); source = minimapCanvasFowLos; }
    else if (fowOn) { ensureMinimapFowCanvas(md); source = minimapCanvasFow; }
    else if (losOn) { ensureMinimapLosCanvas(md); source = minimapCanvasLos; }
    else { ensureMinimapCanvas(md); source = minimapCanvas; }
  } else {
    if (fowOn && losOn) { await ensureFowLosCanvas(md, mapSprites); source = mapCanvasFowLos; }
    else if (fowOn) { await ensureFowCanvas(md, mapSprites); source = mapCanvasFow; }
    else if (losOn) { await ensureLosCanvas(md, mapSprites); source = mapCanvasLos; }
    else { source = mapCanvasBase; }
  }
  if (!source) return;

  vCtx.clearRect(0, 0, viewportCanvas.width, viewportCanvas.height);
  blitToViewport(source);

  // Composite grid overlay on top (if enabled and not minimap)
  if (gridOn && !minimapOn) {
    ensureGridCanvas(md);
    blitToViewport(gridCanvas);
  }
}

// ═══════════════════════════════════════════════════════════════════
// CITY VIEW — click on city to open panoramic view overlay
// ═══════════════════════════════════════════════════════════════════

function findTileAt(clientX, clientY) {
  if (!currentMapData) return null;
  const rect = viewportCanvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  let mx = localX / vp.scale + vp.x;
  let my = localY / vp.scale + vp.y;
  if (vp.wraps && vp.wrapW > 0) mx = ((mx % vp.wrapW) + vp.wrapW) % vp.wrapW;

  const md = currentMapData;
  const TW = Civ2Renderer.TW, TH = Civ2Renderer.TH;
  const approxGy = Math.floor(my / (TH >> 1));

  for (let gy = Math.max(0, approxGy - 1); gy <= Math.min(md.mh - 1, approxGy + 1); gy++) {
    for (let gx = 0; gx < md.mw; gx++) {
      const px = gx * TW + ((gy % 2) ? (TW >> 1) : 0);
      const py = gy * (TH >> 1);
      if (mx >= px && mx < px + TW && my >= py && my < py + TH) {
        const dx = mx - px - TW / 2;
        const dy = my - py - TH / 2;
        if (Math.abs(dx) / (TW / 2) + Math.abs(dy) / (TH / 2) <= 1) {
          return { gx, gy };
        }
      }
    }
  }
  return null;
}

function findCityAt(gx, gy) {
  if (!currentMapData) return null;
  for (let i = 0; i < currentMapData.cities.length; i++) {
    const c = currentMapData.cities[i];
    if (c.gx === gx && c.gy === gy) return { city: c, index: i };
  }
  return null;
}

async function ensureCvSprites() {
  if (cvSprites) return true;
  if (!cvFiles[300] || !cvFiles[305] || !cvFiles[310]) return false;

  const [improvImg, wondersImg, altImg] = await Promise.all([
    Civ2Renderer.loadImage(cvFiles[300]),
    Civ2Renderer.loadImage(cvFiles[305]),
    Civ2Renderer.loadImage(cvFiles[310]),
  ]);
  cvSprites = Civ2CityView.extractSprites(
    Civ2Renderer.imgToCtx(improvImg),
    Civ2Renderer.imgToCtx(wondersImg),
    Civ2Renderer.imgToCtx(altImg)
  );

  cvBackgrounds = new Map();
  const bgIds = [340,341,342,343,345,346,347,348,350,351,352,353];
  await Promise.all(bgIds.map(async id => {
    if (!cvFiles[id]) return;
    const img = await Civ2Renderer.loadImage(cvFiles[id]);
    cvBackgrounds.set(id, img);
  }));

  return true;
}

async function ensureCdSprites() {
  if (cdSprites) return true;
  if (!files.icons || !files.people) return false;
  const imgPromises = [
    Civ2Renderer.loadImage(files.icons),
    Civ2Renderer.loadImage(files.people),
  ];
  if (files.cityGif) imgPromises.push(Civ2Renderer.loadImage(files.cityGif));
  const imgs = await Promise.all(imgPromises);
  const iconsCtx = Civ2Renderer.imgToCtx(imgs[0]);
  const peopleCtx = Civ2Renderer.imgToCtx(imgs[1]);
  const cityGifCtx = files.cityGif ? Civ2Renderer.imgToCtx(imgs[2]) : null;
  cdSprites = Civ2CityDialog.extractSprites(iconsCtx, peopleCtx, cityGifCtx);
  return true;
}

async function handleMapClick(e) {
  const tile = findTileAt(e.clientX, e.clientY);
  if (!tile) return;
  const hit = findCityAt(tile.gx, tile.gy);
  if (hit) {
    openCityDialog(hit.city, hit.index);
  }
}

// ── City dialog viewport state ──
const cdVp = { x: 0, y: 0, scale: 1 };
const cdViewport = document.getElementById('citydialog-viewport');
const cdVpCtx = cdViewport.getContext('2d', { colorSpace: 'srgb' });
let cdCity = null, cdCityIndex = 0, cdRegions = null;

function cdResizeViewport() {
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  cdViewport.width = w * dpr;
  cdViewport.height = h * dpr;
  cdViewport.style.width = w + 'px';
  cdViewport.style.height = h + 'px';
  cdVpCtx.imageSmoothingEnabled = false;
}

function cdClampViewport() {
  const src = document.getElementById('citydialog-canvas');
  const dpr = window.devicePixelRatio || 1;
  const srcW = src.width / dpr, srcH = src.height / dpr;
  const visW = cdViewport.width / dpr / cdVp.scale;
  const visH = cdViewport.height / dpr / cdVp.scale;
  const yMin = Math.min(0, srcH - visH);
  const yMax = Math.max(0, srcH - visH);
  cdVp.y = Math.max(yMin, Math.min(cdVp.y, yMax));
  const xMin = Math.min(0, srcW - visW);
  const xMax = Math.max(0, srcW - visW);
  cdVp.x = Math.max(xMin, Math.min(cdVp.x, xMax));
}

function cdDrawViewport() {
  const src = document.getElementById('citydialog-canvas');
  const dpr = window.devicePixelRatio || 1;
  const bw = cdViewport.width, bh = cdViewport.height;
  const visW = bw / dpr / cdVp.scale;
  const visH = bh / dpr / cdVp.scale;

  cdVpCtx.clearRect(0, 0, bw, bh);
  cdVpCtx.drawImage(src, cdVp.x * dpr, cdVp.y * dpr, visW * dpr, visH * dpr, 0, 0, bw, bh);
}

function cdCenterDialog() {
  const src = document.getElementById('citydialog-canvas');
  const dpr = window.devicePixelRatio || 1;
  const srcW = src.width / dpr, srcH = src.height / dpr;
  const screenW = window.innerWidth, screenH = window.innerHeight;
  // Scale to fit screen with some padding
  const fitScale = Math.min(screenW / srcW, screenH / srcH, 2);
  cdVp.scale = fitScale;
  // Center
  const visW = screenW / cdVp.scale;
  const visH = screenH / cdVp.scale;
  cdVp.x = (srcW - visW) / 2;
  cdVp.y = (srcH - visH) / 2;
}

function cdScreenToSrc(clientX, clientY) {
  const rect = cdViewport.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  return {
    x: localX / cdVp.scale + cdVp.x,
    y: localY / cdVp.scale + cdVp.y,
  };
}

function cdHandleClick(clientX, clientY) {
  if (!cdRegions) return;
  const pt = cdScreenToSrc(clientX, clientY);
  const sx = pt.x;
  const sy = pt.y;
  const F = Civ2CityDialog.FRAME;
  const cx = sx - F.contentX;
  const cy = sy - F.contentY;
  const result = Civ2CityDialog.handleClick(cx, cy, cdRegions);
  if (result && result.action === 'exit') {
    closeCityDialog();
  } else if (result && result.action === 'info') {
    cdRerender();
  } else if (result && result.action === 'panorama') {
    closeCityDialog();
    ensureCvSprites().then(ok => {
      if (!ok) return;
      const cvCanvas = document.getElementById('cityview-canvas');
      Civ2CityView.render(cvCanvas, cdCity, cdCityIndex, currentMapData, cvSprites, cvBackgrounds);
      document.getElementById('cityview-overlay').style.display = 'flex';
    });
  }
}

function cdRerender() {
  if (!cdCity) return;
  const canvas = document.getElementById('citydialog-canvas');
  cdRegions = Civ2CityDialog.render(canvas, cdCity, cdCityIndex, currentMapData, cdSprites, mapSprites);
  cdDrawViewport();
}

// City dialog pan/zoom events
(function initCdEvents() {
  let dragging = false;
  let dragLastX = 0, dragLastY = 0;
  let dragStartX = 0, dragStartY = 0;
  let touchMode = 'none';
  let pinchStartDist = 0, pinchStartScale = 1;
  let pinchLastCX = 0, pinchLastCY = 0;
  const MIN_SCALE = 0.25, MAX_SCALE = 4;

  cdViewport.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    dragging = true;
    dragLastX = dragStartX = e.clientX;
    dragLastY = dragStartY = e.clientY;
    cdViewport.classList.add('dragging');
  });
  window.addEventListener('mousemove', e => {
    if (!dragging || document.getElementById('citydialog-overlay').style.display !== 'flex') return;
    cdVp.x -= (e.clientX - dragLastX) / cdVp.scale;
    cdVp.y -= (e.clientY - dragLastY) / cdVp.scale;
    dragLastX = e.clientX; dragLastY = e.clientY;
    cdClampViewport(); cdDrawViewport();
  });
  window.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    cdViewport.classList.remove('dragging');
    if (Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY) < 5) {
      cdHandleClick(e.clientX, e.clientY);
    }
  });

  cdViewport.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      touchMode = 'pinch'; dragging = false;
      const t0 = e.touches[0], t1 = e.touches[1];
      pinchStartDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      pinchStartScale = cdVp.scale;
      pinchLastCX = (t0.clientX + t1.clientX) / 2;
      pinchLastCY = (t0.clientY + t1.clientY) / 2;
    } else if (e.touches.length === 1 && touchMode !== 'pinch') {
      touchMode = 'drag'; dragging = true;
      dragLastX = dragStartX = e.touches[0].clientX;
      dragLastY = dragStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  cdViewport.addEventListener('touchmove', e => {
    if (touchMode === 'pinch' && e.touches.length === 2) {
      const t0 = e.touches[0], t1 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      const cx = (t0.clientX + t1.clientX) / 2;
      const cy = (t0.clientY + t1.clientY) / 2;
      const rect = cdViewport.getBoundingClientRect();
      const prevLX = pinchLastCX - rect.left, prevLY = pinchLastCY - rect.top;
      const mapX = cdVp.x + prevLX / cdVp.scale;
      const mapY = cdVp.y + prevLY / cdVp.scale;
      cdVp.scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, pinchStartScale * dist / pinchStartDist));
      cdVp.x = mapX - (cx - rect.left) / cdVp.scale;
      cdVp.y = mapY - (cy - rect.top) / cdVp.scale;
      pinchLastCX = cx; pinchLastCY = cy;
      cdClampViewport(); cdDrawViewport();
    } else if (touchMode === 'drag' && e.touches.length === 1) {
      cdVp.x -= (e.touches[0].clientX - dragLastX) / cdVp.scale;
      cdVp.y -= (e.touches[0].clientY - dragLastY) / cdVp.scale;
      dragLastX = e.touches[0].clientX; dragLastY = e.touches[0].clientY;
      cdClampViewport(); cdDrawViewport();
    }
  }, { passive: true });

  cdViewport.addEventListener('touchend', e => {
    if (e.touches.length === 0) {
      if (touchMode === 'drag') {
        dragging = false;
        if (Math.hypot(dragLastX - dragStartX, dragLastY - dragStartY) < 10) {
          cdHandleClick(dragLastX, dragLastY);
        }
      }
      touchMode = 'none';
    } else if (e.touches.length === 1 && touchMode === 'pinch') {
      touchMode = 'none';
    }
  }, { passive: true });

  cdViewport.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = cdViewport.getBoundingClientRect();
    const localX = e.clientX - rect.left, localY = e.clientY - rect.top;
    const mapX = cdVp.x + localX / cdVp.scale;
    const mapY = cdVp.y + localY / cdVp.scale;
    const factor = e.ctrlKey ? (1 - e.deltaY * 0.01) : (1 - e.deltaY * 0.002);
    cdVp.scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, cdVp.scale * factor));
    cdVp.x = mapX - localX / cdVp.scale;
    cdVp.y = mapY - localY / cdVp.scale;
    cdClampViewport(); cdDrawViewport();
  }, { passive: false });
})();

async function openCityDialog(city, cityIndex) {
  const ready = await ensureCdSprites();
  if (!ready) {
    alert('City dialog requires ICONS.GIF and PEOPLE.GIF. Load them and try again.');
    return;
  }
  cdCity = city;
  cdCityIndex = cityIndex;
  const canvas = document.getElementById('citydialog-canvas');
  cdRegions = Civ2CityDialog.render(canvas, city, cityIndex, currentMapData, cdSprites, mapSprites);
  cdResizeViewport();
  cdCenterDialog();
  cdClampViewport();
  cdDrawViewport();
  document.getElementById('citydialog-overlay').style.display = 'flex';
}

function closeCityDialog() {
  document.getElementById('citydialog-overlay').style.display = 'none';
}

function closeCityView() {
  document.getElementById('cityview-overlay').style.display = 'none';
}

document.getElementById('citydialog-backdrop').addEventListener('click', closeCityDialog);
document.getElementById('citydialog-close').addEventListener('click', closeCityDialog);
document.getElementById('cityview-backdrop').addEventListener('click', closeCityView);
document.getElementById('cityview-close').addEventListener('click', closeCityView);

// ═══════════════════════════════════════════════════════════════════
// MAIN MENU — radio-button + OK pattern
// ═══════════════════════════════════════════════════════════════════

document.getElementById('menu-ok-btn').addEventListener('click', () => {
  const selected = document.querySelector('input[name="menu-choice"]:checked');
  if (!selected) return;
  switch (selected.value) {
    case 'load':
      if (files.sav && files.t1 && files.t2) {
        setScene('game');
        if (!currentMapData) doRender();
      } else {
        document.getElementById('sav-input').click();
      }
      break;
    case 'multiplayer':
      setScene('lobby');
      break;
  }
});

// Double-click a radio item to activate immediately
document.querySelectorAll('.menu-radio:not(.disabled)').forEach(label => {
  label.addEventListener('dblclick', () => {
    document.getElementById('menu-ok-btn').click();
  });
});

// ═══════════════════════════════════════════════════════════════════
// WEBSOCKET — connection, lobby, room management
// ═══════════════════════════════════════════════════════════════════

const wsStatusEl = document.getElementById('ws-status');
const wsLabelEl = wsStatusEl.querySelector('.ws-label');

let wsClientId = null;
let wsSessionId = localStorage.getItem('civ2.sessionId') || null;
let wsRoomId = null;
let wsPlayerIndex = null;
let wsRooms = [];
let wsLastRoom = null;     // last ROOM message for this room (for refresh)
let wsGameStarted = false; // has this room's game started?
let wsRoomName = '';       // name of current room (for banner)
const savedActiveRoom = localStorage.getItem('civ2.activeRoomId') || null;

// Multiplayer game state
let mpCivSlot = null;      // my civ slot in the current game
let mpSeatCivMap = null;   // seat index → civ slot mapping
let mpMapBase = null;      // reconstructed map accessors (from server data)
let mpGameState = null;    // latest game state from server
let mpSelectedUnit = null; // index of currently selected unit

function saveActiveGame() {
  if (wsRoomId && wsSessionId) {
    localStorage.setItem('civ2.activeRoomId', wsRoomId);
    localStorage.setItem('civ2.sessionId', wsSessionId);
  }
}
function clearActiveGame() {
  localStorage.removeItem('civ2.activeRoomId');
  localStorage.removeItem('civ2.sessionId');
}

function updateGameBackBtn() {
  const btn = document.getElementById('game-back-btn');
  if (wsRoomId && wsGameStarted) {
    btn.textContent = 'Resume';
  } else {
    btn.innerHTML = '&larr; Lobby';
  }
}

function setWsStatus(state, label) {
  wsStatusEl.className = state;
  wsLabelEl.textContent = label;
  wsStatusEl.title = `WebSocket ${label}`;
}

function getWsUrl() {
  const loc = window.location;
  if (loc.hostname === 'localhost' || loc.hostname === '127.0.0.1') {
    return `ws://${loc.hostname}:8788`;
  }
  const proto = loc.protocol === 'https:' ? 'wss:' : 'ws:';
  const base = loc.pathname.replace(/\/$/, '');  // "/civ2" from "/civ2/"
  return `${proto}//${loc.host}${base}/ws`;
}

// Player name persistence
const lobbyNameInput = document.getElementById('lobby-name-input');
const savedName = localStorage.getItem('civ2.playerName') || '';
if (savedName) lobbyNameInput.value = savedName;
lobbyNameInput.addEventListener('input', () => {
  const name = lobbyNameInput.value.trim();
  localStorage.setItem('civ2.playerName', name);
  transport.setName(name || 'Player');
  transport.send('IDENTIFY', { name: name || 'Player' });
});

// ── Activity PING heartbeat ──
const IDLE_THRESHOLD = 60000;  // 60s → gold dot
const PING_INTERVAL = 15000;   // throttle pings to 15s
let lastPingSent = 0;

function reportActivity() {
  const now = Date.now();
  const elapsed = now - lastPingSent;
  const throttle = elapsed > IDLE_THRESHOLD ? 0 : PING_INTERVAL;
  if (elapsed > throttle) {
    lastPingSent = now;
    transport.send('PING');
  }
}
document.addEventListener('mousemove', reportActivity);
document.addEventListener('click', reportActivity);
document.addEventListener('touchstart', reportActivity);

// ── Activity dot color ──
function activityColor(slot) {
  if (!slot.occupied) return '#444';
  if (!slot.wsOpen) return '#e53935';
  const age = slot.lastActivity ? (Date.now() - slot.lastActivity) : 0;
  return age > IDLE_THRESHOLD ? '#ffd700' : '#4caf50';
}

const transport = createTransport({
  url: getWsUrl(),
  name: savedName || 'Player',
  sessionId: wsSessionId,
  onOpen() {
    setWsStatus('ws-on', 'Online');
    const playerName = lobbyNameInput.value.trim() || 'Player';
    transport.send('IDENTIFY', { name: playerName });
    console.log('[ws] Connected');
  },
  onClose() {
    setWsStatus('ws-connecting', 'Reconnecting...');
    console.log('[ws] Disconnected, reconnecting...');
  },
  onError() {
    setWsStatus('ws-off', 'Error');
  },
  onMessage(msg) {
    if (!msg || !msg.type) return;
    switch (msg.type) {
      case 'ROOM_LIST':
        wsRooms = msg.rooms || [];
        if (msg.yourClientId) wsClientId = msg.yourClientId;
        if (msg.sessionId) {
          wsSessionId = msg.sessionId;
          transport.setSessionId(msg.sessionId);
          localStorage.setItem('civ2.sessionId', msg.sessionId);
        }
        // If saved active room no longer exists, clear it
        if (savedActiveRoom && !wsRoomId && !wsRooms.some(r => r.roomId === savedActiveRoom)) {
          clearActiveGame();
        }
        renderRoomList();
        updateBanner();
        break;

      case 'WELCOME':
        wsRoomId = msg.roomId;
        wsClientId = msg.clientId;
        wsPlayerIndex = msg.playerIndex;
        transport.setRoomId(msg.roomId);
        if (msg.sessionId) {
          wsSessionId = msg.sessionId;
          transport.setSessionId(msg.sessionId);
          localStorage.setItem('civ2.sessionId', msg.sessionId);
        }
        console.log(`[ws] Joined room ${msg.roomId} as seat ${msg.playerIndex ?? 'spectator'}`);
        break;

      case 'ROOM':
        wsLastRoom = msg;
        wsRoomName = msg.name || msg.roomId;
        wsGameStarted = msg.started;
        if (msg.started) saveActiveGame();
        updateGameBackBtn();
        renderRoomDetail(msg);
        updateBanner();
        break;

      case 'GAME_START': {
        console.log('[ws] GAME_START received', msg.myCivSlot);
        mpCivSlot = msg.myCivSlot;
        mpSeatCivMap = msg.seatCivMap;
        wsGameStarted = true;
        saveActiveGame();

        // Reconstruct map accessors from serialized data
        mpMapBase = createAccessors(
          msg.mapBase.mw, msg.mapBase.mh, msg.mapBase.mapShape, msg.mapBase.mapSeed,
          msg.mapBase.tileData, msg.mapBase.knownImprovements,
        );
        mpGameState = msg.state;

        // Build mapData object compatible with existing renderer
        doRenderFromState();
        setScene('game');
        break;
      }

      case 'STATE': {
        mpGameState = msg.state;
        // Re-render with updated state
        doRenderFromState();
        break;
      }

      case 'ERROR':
        console.warn(`[ws] Server error: ${msg.message}`);
        break;

      case 'REJECTED':
        console.warn(`[ws] Rejected: ${msg.reason}`);
        break;

      default:
        console.log(`[ws] ${msg.type}`, msg);
    }
  },
});

setWsStatus('ws-connecting', 'Connecting...');
// If player had an active game, seed transport so it auto-rejoins on connect
if (savedActiveRoom) {
  transport.setRoomId(savedActiveRoom);
  setScene('lobby');  // skip menu, go straight to lobby
}
transport.connect();

// ═══════════════════════════════════════════════════════════════════
// LOBBY — room list + room detail rendering
// ═══════════════════════════════════════════════════════════════════

function renderRoomList() {
  const grid = document.getElementById('lobby-room-grid');
  let html = `<div class="lobby-create-tile" id="lobby-create-tile">
    <span class="create-plus">+</span>
    <span class="create-label">New Game</span>
  </div>`;

  for (const r of wsRooms) {
    const seats = r.seatCount || 0;
    const specs = r.spectatorCount || 0;
    const cls = r.started ? 'lobby-room-tile started' : 'lobby-room-tile';
    const statusCls = r.started ? 'tile-status in-progress' : 'tile-status';
    const statusText = r.started ? 'In Progress' : `${seats}/8 Players`;
    const isMyRoom = r.roomId === wsRoomId || r.roomId === savedActiveRoom;
    const btnText = r.started ? (isMyRoom && wsPlayerIndex != null ? 'Resume' : 'Watch') : 'Join';
    html += `<div class="${cls}" data-room-id="${r.roomId}">
      <div class="tile-top">
        <span class="tile-name">${r.name}</span>
        <span class="${statusCls}">${statusText}</span>
      </div>
      <div class="tile-info">${seats} seated${specs ? ` · ${specs} watching` : ''}</div>
      <button class="tile-join-btn">${btnText}</button>
    </div>`;
  }

  grid.innerHTML = html;

  // Create game handler
  document.getElementById('lobby-create-tile').addEventListener('click', () => {
    const name = lobbyNameInput.value.trim() || 'Player';
    transport.send('CREATE_ROOM', { name: `${name}'s Game`, playerName: name });
  });

  // Join/Resume/Watch handlers
  grid.querySelectorAll('.lobby-room-tile').forEach(el => {
    const roomId = el.dataset.roomId;
    const go = () => {
      if (roomId === wsRoomId && wsLastRoom) {
        // Already in this room — just switch to detail view
        document.getElementById('lobby-rooms-view').style.display = 'none';
        document.getElementById('lobby-room-view').style.display = 'block';
        renderRoomDetail(wsLastRoom);
      } else {
        transport.joinRoom(roomId);
      }
    };
    el.querySelector('.tile-join-btn').addEventListener('click', e => { e.stopPropagation(); go(); });
    el.addEventListener('click', go);
  });
}

function renderRoomDetail(msg) {
  wsRoomId = msg.roomId;

  // Only render detail view if lobby scene is showing room view (not browsing rooms)
  const roomView = document.getElementById('lobby-room-view');
  const roomsView = document.getElementById('lobby-rooms-view');
  if (currentScene === 'lobby' && roomView.style.display !== 'none') {
    // We're viewing this room — update it
  } else if (currentScene === 'lobby' && roomsView.style.display !== 'none' && !wsGameStarted) {
    // First ROOM message after joining — switch to detail view
    roomsView.style.display = 'none';
    roomView.style.display = 'block';
  } else if (currentScene === 'lobby' && roomsView.style.display !== 'none' && wsGameStarted) {
    // Game started, player is browsing rooms — just update banner, don't switch view
    return;
  }

  // Show room detail
  document.getElementById('lobby-rooms-view').style.display = 'none';
  document.getElementById('lobby-room-view').style.display = 'block';
  document.getElementById('room-name').textContent = msg.name || msg.roomId;

  // Seats with activity dots
  const seatsEl = document.getElementById('room-seats');
  let html = '';
  for (const s of msg.clients) {
    const cls = s.occupied ? 'occupied' : 'empty';
    const label = s.occupied ? (s.name || 'Player') : 'Open';
    const you = s.clientId === wsClientId ? ' (you)' : '';
    const dotColor = activityColor(s);
    const readyMark = (s.occupied && msg.ready && msg.ready[s.seat]) ? ' <span style="color:#4caf50">&#10003;</span>' : '';
    html += `<div class="room-seat ${cls}">
      <span class="activity-dot" style="background:${dotColor}"></span>
      <span class="seat-num">${s.seat}</span>
      <span class="seat-name">${label}${you}${readyMark}</span>
    </div>`;
  }
  if (msg.spectators && msg.spectators.length) {
    html += `<div class="room-spectators">Spectators: ${msg.spectators.map(s => s.name).join(', ')}</div>`;
  }
  seatsEl.innerHTML = html;

  // Ready button + status text
  const readyBtn = document.getElementById('room-ready-btn');
  const statusText = document.getElementById('room-status-text');
  const backBtn = document.getElementById('room-back-btn');
  const leaveBtn = document.getElementById('room-leave-btn');

  if (msg.started) {
    // Game started
    statusText.textContent = 'Game has started';
    statusText.className = 'started';
    readyBtn.style.display = 'none';
    leaveBtn.style.display = 'none';
    backBtn.style.display = '';
  } else {
    // Pre-game: show ready state
    const occupied = msg.clients.filter(s => s.occupied);
    const readyCount = occupied.filter((s, i) => msg.ready && msg.ready[s.seat]).length;
    if (occupied.length < 2) {
      statusText.textContent = `Waiting for players... (need at least 2)`;
    } else {
      statusText.textContent = `${readyCount} / ${occupied.length} ready`;
    }
    statusText.className = '';

    // Show ready button only if seated
    if (wsPlayerIndex != null) {
      const amReady = msg.ready && msg.ready[wsPlayerIndex];
      readyBtn.textContent = amReady ? 'Not Ready' : 'Ready';
      readyBtn.className = amReady ? 'civ2-btn room-ready-btn is-ready' : 'civ2-btn room-ready-btn';
      readyBtn.style.display = '';
    } else {
      readyBtn.style.display = 'none';
    }

    leaveBtn.style.display = '';
    backBtn.style.display = 'none';
  }
}

// ── Active game banner ──
function updateBanner() {
  const banner = document.getElementById('lobby-banner');
  const bannerText = document.getElementById('lobby-banner-text');
  if (wsRoomId && wsGameStarted) {
    bannerText.textContent = `You are in "${wsRoomName}"`;
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

// Resume: go back to room detail from room list
document.getElementById('lobby-banner-resume').addEventListener('click', () => {
  document.getElementById('lobby-rooms-view').style.display = 'none';
  document.getElementById('lobby-room-view').style.display = 'block';
  if (wsLastRoom) renderRoomDetail(wsLastRoom);
});

// Leave room (pre-game only) → back to room list
document.getElementById('room-leave-btn').addEventListener('click', () => {
  transport.leaveRoom();
  wsRoomId = null;
  wsPlayerIndex = null;
  wsGameStarted = false;
  wsLastRoom = null;
  transport.setRoomId(null);
  clearActiveGame();
  updateGameBackBtn();
  document.getElementById('lobby-room-view').style.display = 'none';
  document.getElementById('lobby-rooms-view').style.display = 'block';
  updateBanner();
});

// Back to rooms (started game) → show room list with banner
document.getElementById('room-back-btn').addEventListener('click', () => {
  document.getElementById('lobby-room-view').style.display = 'none';
  document.getElementById('lobby-rooms-view').style.display = 'block';
  updateBanner();
});

// Ready button
document.getElementById('room-ready-btn').addEventListener('click', () => {
  transport.send('READY');
});

// Lobby ← → Menu navigation
document.getElementById('lobby-back-btn').addEventListener('click', () => setScene('menu'));
document.getElementById('game-back-btn').addEventListener('click', () => {
  setScene('lobby');
  // If in an active game, show room detail directly
  if (wsRoomId && wsGameStarted && wsLastRoom) {
    document.getElementById('lobby-rooms-view').style.display = 'none';
    document.getElementById('lobby-room-view').style.display = 'block';
    renderRoomDetail(wsLastRoom);
  }
});

// ── Periodic refresh for activity dot transitions (idle → gold) ──
setInterval(() => {
  if (currentScene === 'lobby' && wsLastRoom && document.getElementById('lobby-room-view').style.display !== 'none') {
    renderRoomDetail(wsLastRoom);
  }
}, 15000);

// ═══════════════════════════════════════════════════════════════════
// MULTIPLAYER GAME — render from server state, turn UI, input
// ═══════════════════════════════════════════════════════════════════

function buildMapDataFromState() {
  if (!mpMapBase || !mpGameState) return null;
  const state = mpGameState;
  return {
    mw: mpMapBase.mw, mh: mpMapBase.mh,
    mw2: mpMapBase.mw * 2,
    ms: mpMapBase.mapShape,
    mapSeed: mpMapBase.mapSeed,
    mapShape: mpMapBase.mapShape,
    tileData: mpMapBase.tileData,
    getTerrain: mpMapBase.getTerrain,
    isLand: mpMapBase.isLand,
    hasRiver: mpMapBase.hasRiver,
    getImprovements: mpMapBase.getImprovements,
    getVisibility: mpMapBase.getVisibility,
    getResource: mpMapBase.getResource,
    getNeighbors: mpMapBase.getNeighbors,
    wrap: mpMapBase.wrap,
    hasGoodyHut: mpMapBase.hasGoodyHut,
    hasShield: mpMapBase.hasShield,
    getCityRadiusOwner: mpMapBase.getCityRadiusOwner,
    getBodyId: mpMapBase.getBodyId,
    getTileOwnership: mpMapBase.getTileOwnership,
    getTileFertility: mpMapBase.getTileFertility,
    getKnownImprovements: mpMapBase.getKnownImprovements,
    knownImprovements: mpMapBase.knownImprovements,
    units: state.units || [],
    cities: state.cities || [],
    civData: state.civData,
    civNameBlocks: state.civNameBlocks,
    civStyles: state.civStyles,
    civTechCounts: state.civTechCounts || new Array(8).fill(0),
    civTechs: state.civTechs,
    civsAlive: state.civsAlive ?? 0xFF,
    playerCiv: mpCivSlot ?? state.playerCiv ?? 1,
    mapRevealed: state.mapRevealed ?? false,
    unitBySaveIndex: state.unitBySaveIndex,
    allUnits: state.allUnits,
    tail: state.tail,
    header: state.header,
    gameState: state.gameState || { turnsPassed: state.turnNumber || 0, playerCiv: mpCivSlot ?? 1 },
    validation: state.validation,
    civNames: state.civNames,
  };
}

function doRenderFromState() {
  const mapData = buildMapDataFromState();
  if (!mapData) return;
  currentMapData = mapData;

  // Re-render if sprites are loaded
  if (files.t1 && files.t2) {
    doRender();
  }

  updateTurnUI();

  // Auto-select first movable unit and center on it
  if (mpGameState.activeCiv === mpCivSlot) {
    mpSelectedUnit = findNextMovableUnit(-1);
    if (mpSelectedUnit != null) centerOnUnit(mpGameState.units[mpSelectedUnit]);
  }
}

// ── Turn UI ──
function updateTurnUI() {
  const turnUI = document.getElementById('turn-ui');
  if (!mpGameState || !mpCivSlot) {
    turnUI.style.display = 'none';
    return;
  }
  turnUI.style.display = '';

  const isMyTurn = mpGameState.activeCiv === mpCivSlot;
  const civName = mpGameState.civNames?.[mpGameState.activeCiv] || `Civ ${mpGameState.activeCiv}`;
  const civColor = CIV_COLORS[mpGameState.activeCiv] || '#e0e0e0';

  document.getElementById('turn-civ-name').textContent = civName;
  document.getElementById('turn-civ-name').style.color = civColor;
  document.getElementById('turn-number').textContent = `Turn ${mpGameState.turnNumber || 0}`;

  const endBtn = document.getElementById('end-turn-btn');
  const waitMsg = document.getElementById('turn-waiting');
  if (isMyTurn) {
    endBtn.style.display = '';
    waitMsg.style.display = 'none';
  } else {
    endBtn.style.display = 'none';
    waitMsg.style.display = '';
  }
}

// End Turn button
document.getElementById('end-turn-btn').addEventListener('click', () => {
  if (!mpGameState || mpGameState.activeCiv !== mpCivSlot) return;
  transport.sendRaw({ type: 'ACTION', action: { type: 'END_TURN' } });
});

// ── Numpad movement ──
window.addEventListener('keydown', e => {
  if (!mpGameState || mpGameState.activeCiv !== mpCivSlot) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

  const dir = NUMPAD_DIR[e.key];
  if (!dir) return;
  e.preventDefault();

  // Auto-select first movable unit if none selected
  if (mpSelectedUnit == null) {
    mpSelectedUnit = findNextMovableUnit(-1);
  }
  if (mpSelectedUnit == null) return;

  transport.sendRaw({
    type: 'ACTION',
    action: { type: 'MOVE_UNIT', unitIndex: mpSelectedUnit, dir },
  });
});

// Tab key: cycle to next movable unit
window.addEventListener('keydown', e => {
  if (!mpGameState || mpGameState.activeCiv !== mpCivSlot) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
  if (e.key !== 'Tab') return;
  e.preventDefault();

  const next = findNextMovableUnit(mpSelectedUnit ?? -1);
  if (next != null) {
    mpSelectedUnit = next;
    // Center viewport on selected unit
    centerOnUnit(mpGameState.units[next]);
  }
});

function findNextMovableUnit(afterIndex) {
  if (!mpGameState) return null;
  const units = mpGameState.units;
  for (let i = 0; i < units.length; i++) {
    const idx = (afterIndex + 1 + i) % units.length;
    const u = units[idx];
    if (u.owner === mpCivSlot && u.movesLeft > 0 && u.gx >= 0) return idx;
  }
  return null;
}

function centerOnUnit(unit) {
  if (!unit || !currentMapData) return;
  const TW = 64, TH = 32;
  const px = unit.gx * TW + ((unit.gy % 2) ? (TW >> 1) : 0) + TW / 2;
  const py = unit.gy * (TH >> 1) + TH / 2;
  vp.x = px - vp.offW / vp.scale / 2;
  vp.y = py - vp.offH / vp.scale / 2;
  clampViewport();
  drawViewport();
}

// ── Initialize event handlers ──
initEvents(viewportCanvas, vp, {
  clampViewport, drawViewport, resizeViewport,
  handleMapClick, closeCityDialog, closeCityView,
  getMapData: () => currentMapData,
  SCROLL_STEP, getMinScale, VP_MAX_SCALE,
});
