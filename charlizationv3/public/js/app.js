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
import { GOVERNMENT_NAMES, LEADERS_TXT_NAMES, CIV_COLORS, UNIT_NAMES, TERRAIN_BASE } from '../engine/defs.js';
import { createTransport } from '../net/transport.js';
import { createAccessors, reconstructMapData } from '../engine/state.js';
import { NUMPAD_DIR, getDirection } from '../engine/movement.js';
import { getValidActions } from '../engine/rules.js';
import { MOVE_UNIT, BUILD_CITY, SET_WORKERS } from '../engine/actions.js';

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
let gameEnteredFrom = 'menu'; // 'menu' (Load a Game) or 'lobby' (multiplayer)
function setScene(scene) {
  document.getElementById('menu-scene').style.display = scene === 'menu' ? 'flex' : 'none';
  document.getElementById('lobby-scene').style.display = scene === 'lobby' ? 'flex' : 'none';
  document.getElementById('game-scene').style.display = scene === 'game' ? '' : 'none';
  currentScene = scene;
  if (scene === 'game') {
    updateGameBackBtn();
    resizeViewport();
    if (vp.offW > 0) drawViewport();
  }
  // Menu music: play when on menu (if unmuted), stop when leaving
  if (typeof menuLoop !== 'undefined') {
    if (scene === 'menu' && !menuMuted) {
      menuLoop.play().catch(() => {});
    } else if (!menuLoop.paused) {
      menuLoop.pause();
      menuLoop.currentTime = 0;
    }
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
    gameEnteredFrom = 'menu';
    currentMapData = null; // force re-parse of new .sav
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
  invalidateFowCanvases();
  updateGameInfo(currentMapData, cachedFowCiv);
  drawViewport();
});

// ── FOW civ selector population ──
// forceCiv: if set, select this civ slot regardless of previous value
function populateFowCivSelector(mapData, forceCiv) {
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
  if (forceCiv != null) {
    fowSelect.value = String(forceCiv);
  } else if (previousValue !== '' && [...fowSelect.options].some(o => o.value === previousValue)) {
    fowSelect.value = previousValue;
  } else {
    fowSelect.value = mapData.playerCiv;
  }
  // Sync cachedFowCiv with the final selected value
  cachedFowCiv = parseInt(fowSelect.value);
  cachedLosData = null;
  fowSelect.disabled = false;
}

// ── Main render flow ──
let rendering = false;
async function doRender(options = {}) {
  if (rendering) return;
  rendering = true;
  const overlay = document.getElementById('loading-overlay');
  const msg = document.getElementById('loading-msg');
  if (!options.silent) overlay.style.display = 'flex';

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
    populateFowCivSelector(mapData);

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
    invalidateFowCanvases();
    gridCanvas = null;
    minimapCanvas = null;
    cachedFowCiv = fowCiv;
    cachedLosData = null;

    msg.textContent = 'Rendering map...';
    await new Promise(r => setTimeout(r, 10));
    const newBase = document.createElement('canvas');

    // Collect player unit positions for terrain patch capture (blink animation)
    const blinkUnitTiles = [];
    if (mpCivSlot != null && mpGameState) {
      for (const u of (mpGameState.units || [])) {
        if (u.owner === mpCivSlot && u.gx >= 0) {
          blinkUnitTiles.push({ gx: u.gx, gy: u.gy });
        }
      }
    }

    const result = await Civ2Renderer.render(newBase, mapData, sprites, null,
      { fowEnabled: false, gridEnabled: false, blinkUnitTiles, selectedUnitIndex: mpSelectedUnit });
    mapCanvasBase = newBase;

    // Store blink data: terrain patches + unit overlay
    blinkPatches = result.terrainPatches;
    blinkUnitOverlay = result.blinkUnitOverlay;

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

    if (!options.silent) overlay.style.display = 'none';

    // 7. Pre-render remaining canvases in background
    deferredRenderQueue(mapData, sprites, fowCiv);

  } catch (err) {
    console.error(err);
    if (!options.silent) {
      alert('Error: ' + err.message);
      overlay.style.display = 'none';
    }
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

function invalidateFowCanvases() {
  mapCanvasLos = null;
  mapCanvasFow = null;
  mapCanvasFowLos = null;
  minimapCanvasLos = null;
  minimapCanvasFow = null;
  minimapCanvasFowLos = null;
  _losRendering = null;
  _fowRendering = null;
  _fowLosRendering = null;
}

let _losRendering = null;
async function ensureLosCanvas(mapData, sprites) {
  if (mapCanvasLos) return;
  if (_losRendering) return _losRendering;
  _losRendering = (async () => {
    const losData = ensureLosData(mapData, cachedFowCiv);
    const c = document.createElement('canvas');
    await Civ2Renderer.render(c, mapData, sprites, null,
      { fowEnabled: false, gridEnabled: false, losData, selectedUnitIndex: mpSelectedUnit });
    mapCanvasLos = c;
    _losRendering = null;
  })();
  return _losRendering;
}

function ensureMinimapLosCanvas(mapData) {
  if (minimapCanvasLos) return;
  const losData = ensureLosData(mapData, cachedFowCiv);
  minimapCanvasLos = document.createElement('canvas');
  Civ2Minimap.render(minimapCanvasLos, mapData, { fowEnabled: false, losData });
}

let _fowRendering = null;
async function ensureFowCanvas(mapData, sprites) {
  if (mapCanvasFow) return;
  if (_fowRendering) return _fowRendering;
  _fowRendering = (async () => {
    const c = document.createElement('canvas');
    await Civ2Renderer.render(c, mapData, sprites, null,
      { fowEnabled: true, fowCiv: cachedFowCiv, gridEnabled: false, selectedUnitIndex: mpSelectedUnit });
    mapCanvasFow = c;
    _fowRendering = null;
  })();
  return _fowRendering;
}

let _fowLosRendering = null;
async function ensureFowLosCanvas(mapData, sprites) {
  if (mapCanvasFowLos) return;
  if (_fowLosRendering) return _fowLosRendering;
  _fowLosRendering = (async () => {
    const losData = ensureLosData(mapData, cachedFowCiv);
    const c = document.createElement('canvas');
    await Civ2Renderer.render(c, mapData, sprites, null,
      { fowEnabled: true, fowCiv: cachedFowCiv, gridEnabled: false, losData, selectedUnitIndex: mpSelectedUnit });
    mapCanvasFowLos = c;
    _fowLosRendering = null;
  })();
  return _fowLosRendering;
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

// Cached region under unit overlay (for restoring during blink-off)
let blinkUnderlay = null; // { imageData, vpX, vpY } — viewport-space coords

function drawViewport() {
  if (vp.offW === 0 || vp.offH === 0) return;
  const md = currentMapData;
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
    if (fowOn && losOn) { ensureMinimapFowLosCanvas(md); source = minimapCanvasFowLos; }
    else if (fowOn) { ensureMinimapFowCanvas(md); source = minimapCanvasFow; }
    else if (losOn) { ensureMinimapLosCanvas(md); source = minimapCanvasLos; }
    else { ensureMinimapCanvas(md); source = minimapCanvas; }
  } else {
    if (fowOn && losOn) {
      source = mapCanvasFowLos;
      if (!source) { ensureFowLosCanvas(md, mapSprites).then(() => drawViewport()); return; }
    } else if (fowOn) {
      source = mapCanvasFow;
      if (!source) { ensureFowCanvas(md, mapSprites).then(() => drawViewport()); return; }
    } else if (losOn) {
      source = mapCanvasLos;
      if (!source) { ensureLosCanvas(md, mapSprites).then(() => drawViewport()); return; }
    } else {
      source = mapCanvasBase;
    }
  }
  if (!source) return;

  vCtx.clearRect(0, 0, viewportCanvas.width, viewportCanvas.height);
  blitToViewport(source);

  // Composite grid overlay on top (if enabled and not minimap)
  if (gridOn && !minimapOn) {
    ensureGridCanvas(md);
    blitToViewport(gridCanvas);
  }

  // Save the region under the unit overlay (small area, not full viewport)
  blinkUnderlay = null;
  if (mpSelectedUnit != null && blinkUnitOverlay && !minimapOn) {
    const region = getOverlayViewportRect(blinkUnitOverlay);
    if (region) {
      blinkUnderlay = {
        imageData: vCtx.getImageData(region.x, region.y, region.w, region.h),
        vpX: region.x, vpY: region.y,
      };
    }
    // Draw unit overlay if blink is on
    if (blinkOn) {
      blitPatchToViewport(blinkUnitOverlay.canvas, blinkUnitOverlay.x, blinkUnitOverlay.y);
    }
  }
}

// Get the viewport-pixel rectangle for a map-space overlay patch
function getOverlayViewportRect(overlay) {
  const dpr = window.devicePixelRatio || 1;
  const pxPerMap = vp.scale * dpr;
  let vpX, vpY;
  if (vp.wraps) {
    const x1 = ((vp.x % vp.wrapW) + vp.wrapW) % vp.wrapW;
    vpX = (overlay.x - x1) * pxPerMap;
    // Handle wrapping — find the visible copy
    const visW = vp.logicalW / vp.scale;
    for (let wrap = -1; wrap <= 1; wrap++) {
      const px = overlay.x + wrap * vp.wrapW;
      const rx = (px - x1) * pxPerMap;
      if (rx + overlay.canvas.width * pxPerMap >= 0 && rx < viewportCanvas.width) {
        vpX = rx;
        break;
      }
    }
  } else {
    vpX = (overlay.x - vp.x) * pxPerMap;
  }
  vpY = (overlay.y - vp.y) * pxPerMap;
  const w = Math.ceil(overlay.canvas.width * pxPerMap);
  const h = Math.ceil(overlay.canvas.height * pxPerMap);
  // Clamp to viewport bounds
  const x0 = Math.max(0, Math.floor(vpX));
  const y0 = Math.max(0, Math.floor(vpY));
  const x1 = Math.min(viewportCanvas.width, Math.ceil(vpX + w));
  const y1 = Math.min(viewportCanvas.height, Math.ceil(vpY + h));
  if (x1 <= x0 || y1 <= y0) return null;
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

// Blit a small patch canvas to the viewport at the correct offscreen position
function blitPatchToViewport(patchCanvas, offX, offY) {
  const dpr = window.devicePixelRatio || 1;
  const pxPerMap = vp.scale * dpr;
  const pw = patchCanvas.width, ph = patchCanvas.height;

  if (vp.wraps) {
    const x1 = ((vp.x % vp.wrapW) + vp.wrapW) % vp.wrapW;
    const visW = vp.logicalW / vp.scale;
    // The patch might appear at one or two positions (wrapping)
    for (let wrap = -1; wrap <= 1; wrap++) {
      const patchX = offX + wrap * vp.wrapW;
      const relX = patchX - x1;
      if (relX + pw < 0 || relX > visW) continue;
      const vpX = relX * pxPerMap;
      const vpY = (offY - vp.y) * pxPerMap;
      vCtx.drawImage(patchCanvas, 0, 0, pw, ph, vpX, vpY, pw * pxPerMap, ph * pxPerMap);
    }
  } else {
    const vpX = (offX - vp.x) * pxPerMap;
    const vpY = (offY - vp.y) * pxPerMap;
    vCtx.drawImage(patchCanvas, 0, 0, pw, ph, vpX, vpY, pw * pxPerMap, ph * pxPerMap);
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

async function handleMapClick(e, isLongPress = false) {
  const tile = findTileAt(e.clientX, e.clientY);
  if (!tile) return;

  const isMyTurn = mpGameState && mpCivSlot != null && mpGameState.activeCiv === mpCivSlot;
  const activeUnit = mpSelectedUnit != null ? mpGameState?.units[mpSelectedUnit] : null;
  const activeUnitOnTile = activeUnit && activeUnit.gx === tile.gx && activeUnit.gy === tile.gy;
  const cityHit = findCityAt(tile.gx, tile.gy);

  // City tile without our active unit on it — open city dialog
  if (cityHit && !activeUnitOnTile) {
    openCityDialog(cityHit.city, cityHit.index);
    return;
  }

  if (isMyTurn) {
    // Gather own movable units on this tile
    const tileUnits = [];
    mpGameState.units.forEach((u, idx) => {
      if (u.gx === tile.gx && u.gy === tile.gy && u.owner === mpCivSlot && u.movesLeft > 0) {
        tileUnits.push(idx);
      }
    });

    // Long press with active unit on a DIFFERENT tile — show move action only
    if (isLongPress && mpSelectedUnit != null) {
      const validActions = getValidActions(mpGameState, mpMapBase, mpSelectedUnit, tile);
      if (validActions.length > 0) {
        const menuItems = validActions.map(va => actionToMenuItem(va, mpSelectedUnit));
        showUnitMenu(e.clientX, e.clientY, menuItems);
        return;
      }
    }

    // Click on tile with own movable units — build unified menu
    if (tileUnits.length > 0) {
      const menuItems = [];

      // Section header + unit selection entries (with sprite thumbnails)
      menuItems.push({ header: 'Select Unit' });
      for (const idx of tileUnits) {
        const u = mpGameState.units[idx];
        const name = UNIT_NAMES[u.type] || `Unit ${u.type}`;
        const sprite = mapSprites?.unitColored?.[u.type + '-' + u.owner] || null;
        const selected = idx === mpSelectedUnit;
        menuItems.push({
          label: name,
          sprite,
          selected,
          action: () => selectUnit(idx),
        });
      }

      // Valid actions for the active unit only
      const actionItems = [];
      if (mpSelectedUnit != null && tileUnits.includes(mpSelectedUnit)) {
        const actions = getValidActions(mpGameState, mpMapBase, mpSelectedUnit, tile);
        for (const va of actions) {
          const item = actionToMenuItem(va, mpSelectedUnit);
          const u = mpGameState.units[mpSelectedUnit];
          item.sprite = mapSprites?.unitColored?.[u.type + '-' + u.owner] || null;
          actionItems.push(item);
        }
      }
      if (actionItems.length > 0) {
        menuItems.push({ separator: true });
        menuItems.push({ header: 'Select Order' });
        menuItems.push(...actionItems);
      }

      // Single unit, no extra actions — just select directly
      if (tileUnits.length === 1 && menuItems.length === 1) {
        selectUnit(tileUnits[0]);
        return;
      }

      showUnitMenu(e.clientX, e.clientY, menuItems);
      return;
    }
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
  } else if (result && (result.action === 'toggleTile' || result.action === 'citizenToSpec' || result.action === 'cycleSpec')) {
    if (!mpGameState || !mpMapBase || mpCivSlot == null || cdCity.owner !== mpCivSlot) return;
    handleWorkerChange(result);
  }
}

function handleWorkerChange(result) {
  const city = cdCity;
  const cityIndex = cdCityIndex;
  let workedTiles = city.workedTiles ? [...city.workedTiles] : [];
  let specialists = city.specialists ? [...city.specialists] : [];

  if (result.action === 'toggleTile') {
    const i = result.tileIndex;
    // Check if tile is valid (not ocean, in bounds)
    const wgx = mpMapBase.wraps
      ? ((result.tileGx % mpMapBase.mw) + mpMapBase.mw) % mpMapBase.mw
      : result.tileGx;
    if (result.tileGy < 0 || result.tileGy >= mpMapBase.mh || wgx < 0 || wgx >= mpMapBase.mw) return;
    const ter = mpMapBase.getTerrain(wgx, result.tileGy);
    if (ter === 10) return; // can't work ocean

    const idx = workedTiles.indexOf(i);
    if (idx >= 0) {
      // Tile was worked — remove worker, add entertainer
      workedTiles.splice(idx, 1);
      specialists.push('entertainer');
    } else {
      // Tile was unworked — add worker, remove last specialist
      if (specialists.length === 0) return; // can't add worker without removing specialist
      specialists.pop();
      workedTiles.push(i);
    }
  } else if (result.action === 'citizenToSpec') {
    // Click on a worker face — remove the worst-scoring worker tile and add an entertainer
    if (workedTiles.length === 0) return;

    // Find worst tile by yield score
    let worstIdx = -1, worstScore = Infinity;
    for (const ti of workedTiles) {
      const [ddx, ddy] = Civ2CityDialog.CITY_RADIUS_DOUBLED[ti];
      const parC = city.gy & 1;
      const parT = ((city.gy + ddy) % 2 + 2) % 2;
      const tgx = city.gx + ((parC + ddx - parT) >> 1);
      const tgy = city.gy + ddy;
      const wgx = mpMapBase.wraps ? ((tgx % mpMapBase.mw) + mpMapBase.mw) % mpMapBase.mw : tgx;
      if (tgy < 0 || tgy >= mpMapBase.mh) continue;
      const ter = mpMapBase.getTerrain(wgx, tgy);
      if (ter < 0 || ter > 10 || ter === 10) continue;
      const base = TERRAIN_BASE[ter];
      const score = base[0] * 10 + base[1];
      if (score < worstScore) { worstScore = score; worstIdx = ti; }
    }
    if (worstIdx < 0) return;

    // Remove worst worker, add entertainer
    workedTiles.splice(workedTiles.indexOf(worstIdx), 1);
    specialists.push('entertainer');
  } else if (result.action === 'cycleSpec') {
    // Click on a specialist face — cycle: entertainer → taxman → scientist → remove (add best worker)
    const specIdx = result.citizenSlot - workedTiles.length;
    if (specIdx < 0 || specIdx >= specialists.length) return;

    const current = specialists[specIdx];
    if (current === 'entertainer') {
      specialists[specIdx] = 'taxman';
    } else if (current === 'taxman') {
      specialists[specIdx] = 'scientist';
    } else {
      // Scientist → remove specialist, add best available worker tile
      const bestTile = findBestUnworkedTile(city, workedTiles);
      if (bestTile != null) {
        specialists.splice(specIdx, 1);
        workedTiles.push(bestTile);
      } else {
        // No valid tile — cycle back to entertainer instead
        specialists[specIdx] = 'entertainer';
        return;
      }
    }
  }

  // Send the action
  transport.sendRaw({
    type: 'ACTION',
    action: {
      type: SET_WORKERS,
      cityIndex,
      workedTiles,
      specialists,
    },
  });
}

// Helper: find best unworked tile (by food*10 + shields)
function findBestUnworkedTile(city, workedTiles) {
  const worked = new Set(workedTiles);
  const parC = city.gy & 1;
  let bestIdx = -1, bestScore = -1;
  for (let i = 0; i < 20; i++) {
    if (worked.has(i)) continue;

    const [ddx, ddy] = Civ2CityDialog.CITY_RADIUS_DOUBLED[i];
    const parT = ((city.gy + ddy) % 2 + 2) % 2;
    const tgx = city.gx + ((parC + ddx - parT) >> 1);
    const tgy = city.gy + ddy;
    const wgx = mpMapBase.wraps ? ((tgx % mpMapBase.mw) + mpMapBase.mw) % mpMapBase.mw : tgx;
    if (tgy < 0 || tgy >= mpMapBase.mh || wgx < 0 || wgx >= mpMapBase.mw) continue;
    const ter = mpMapBase.getTerrain(wgx, tgy);
    if (ter < 0 || ter > 10 || ter === 10) continue; // skip ocean/invalid

    const base = TERRAIN_BASE[ter];
    const score = base[0] * 10 + base[1];
    if (score > bestScore) { bestScore = score; bestIdx = i; }
  }
  return bestIdx >= 0 ? bestIdx : null;
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

// Menu audio
const menuLoop = new Audio('assets/sounds/MENULOOP.WAV');
const menuOk = new Audio('assets/sounds/MENUOK.WAV');
const menuEnd = new Audio('assets/sounds/MENUEND.WAV');
const sfxBuildCity = new Audio('assets/sounds/BLDCITY.WAV');
menuLoop.loop = true;
let menuMuted = false;

// First click: reveal menu dialog, start music, shrink seal (FLIP animation)
function revealMenu() {
  const layout = document.getElementById('menu-layout');
  const seal = document.getElementById('menu-seal');
  const dialog = document.getElementById('menu-dialog');
  if (layout.classList.contains('menu-open')) return;
  document.removeEventListener('click', revealMenu);
  document.removeEventListener('keydown', revealMenu);

  // FLIP: capture seal's current position/size
  const first = seal.getBoundingClientRect();

  // Apply final state
  layout.classList.add('menu-open');

  // Force layout so we can read final position
  const last = seal.getBoundingClientRect();

  // Calculate the transform to go from final → first (invert)
  const dx = first.left + first.width / 2 - (last.left + last.width / 2);
  const dy = first.top + first.height / 2 - (last.top + last.height / 2);
  const s = last.width > 0 ? Math.max(first.width / last.width, first.height / last.height) : 1;

  // Animate seal from old position/size to new (uniform scale to preserve aspect ratio)
  if (isFinite(s) && isFinite(dx) && isFinite(dy)) {
    seal.animate([
      { transform: `translate(${dx}px, ${dy}px) scale(${s})` },
      { transform: 'translate(0, 0) scale(1)' }
    ], { duration: 700, easing: 'ease-in-out' });
  }

  // Fade in dialog after seal animation completes
  dialog.animate([
    { opacity: 0, transform: 'translateY(15px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 400, delay: 700, easing: 'ease-out', fill: 'backwards' });

  if (currentScene === 'menu' && menuLoop.paused) {
    menuLoop.play().catch(() => {});
  }
}

// Try autoplay immediately; if blocked, music starts on first click along with menu reveal
menuLoop.play().then(() => {
  // Autoplay worked — still need click to reveal menu
  document.addEventListener('click', revealMenu);
  document.addEventListener('keydown', revealMenu);
}).catch(() => {
  // Both music and menu reveal on first interaction
  document.addEventListener('click', revealMenu);
  document.addEventListener('keydown', revealMenu);
});

document.getElementById('menu-ok-btn').addEventListener('click', () => {
  menuLoop.pause();
  menuLoop.currentTime = 0;
  if (!menuMuted) menuOk.play().catch(() => {});
  const selected = document.querySelector('input[name="menu-choice"]:checked');
  if (!selected) return;
  switch (selected.value) {
    case 'load':
      if (files.sav && files.t1 && files.t2) {
        gameEnteredFrom = 'menu';
        currentMapData = null; // clear multiplayer state so doRender() re-parses .sav
        // Restore single-player controls (may have been hidden by multiplayer)
        document.getElementById('sav-btn').style.display = '';
        document.getElementById('render-btn').style.display = '';
        document.getElementById('status').style.display = '';
        setScene('game');
        doRender();
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

// Enter key triggers OK
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && currentScene === 'menu' && document.getElementById('menu-layout').classList.contains('menu-open')) {
    document.getElementById('menu-ok-btn').click();
  }
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

// Active games: array of { roomId, sessionId, name }
// Migrate from old single-room storage
let activeGames = JSON.parse(localStorage.getItem('civ2.activeGames') || '[]');
if (!activeGames.length) {
  const oldRoom = localStorage.getItem('civ2.activeRoomId');
  const oldSess = localStorage.getItem('civ2.sessionId');
  if (oldRoom && oldSess) {
    activeGames = [{ roomId: oldRoom, sessionId: oldSess, name: 'Game' }];
    localStorage.setItem('civ2.activeGames', JSON.stringify(activeGames));
  }
}
localStorage.removeItem('civ2.activeRoomId');

// Multiplayer game state
let mpCivSlot = null;      // my civ slot in the current game
let mpSeatCivMap = null;   // seat index → civ slot mapping
let mpMapBase = null;      // reconstructed map accessors (from server data)
let mpGameState = null;    // latest game state from server
let mpSelectedUnit = null; // index of currently selected unit

// Unit blink state
let blinkOn = true;        // true = unit visible, false = hidden
let blinkInterval = null;  // setInterval handle
let blinkPatches = null;   // { 'gx,gy': { canvas, x, y } } terrain patches from renderer
let blinkUnitOverlay = null; // { canvas, x, y } selected unit + terrain composite for blink-on
let pendingSlide = null;   // { unitIndex, oldGx, oldGy } — set before sending MOVE_UNIT
let slideAnimating = false; // true during slide animation

function saveActiveGame() {
  if (!wsRoomId || !wsSessionId) return;
  const existing = activeGames.find(g => g.roomId === wsRoomId);
  if (existing) {
    existing.sessionId = wsSessionId;
    existing.name = wsRoomName || existing.name;
  } else {
    activeGames.push({ roomId: wsRoomId, sessionId: wsSessionId, name: wsRoomName });
  }
  localStorage.setItem('civ2.activeGames', JSON.stringify(activeGames));
}
function removeActiveGame(roomId) {
  activeGames = activeGames.filter(g => g.roomId !== roomId);
  localStorage.setItem('civ2.activeGames', JSON.stringify(activeGames));
}
function getActiveGameSession(roomId) {
  const g = activeGames.find(g => g.roomId === roomId);
  return g ? g.sessionId : null;
}

function updateGameBackBtn() {
  const btn = document.getElementById('game-back-btn');
  btn.innerHTML = gameEnteredFrom === 'lobby' ? '&larr; Lobby' : '&larr; Menu';
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
        // Clean up active games that no longer exist on server
        const serverRoomIds = new Set(wsRooms.map(r => r.roomId));
        const stale = activeGames.filter(g => !serverRoomIds.has(g.roomId));
        if (stale.length) {
          stale.forEach(g => removeActiveGame(g.roomId));
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
          // Update active game entry with new sessionId
          const ag = activeGames.find(g => g.roomId === msg.roomId);
          if (ag) {
            ag.sessionId = msg.sessionId;
            localStorage.setItem('civ2.activeGames', JSON.stringify(activeGames));
          }
        }
        console.log(`[ws] Joined room ${msg.roomId} as seat ${msg.playerIndex ?? 'spectator'}`);
        break;

      case 'ROOM':
        wsLastRoom = msg;
        wsRoomName = msg.name || msg.roomId;
        wsGameStarted = msg.started;
        if (msg.started) saveActiveGame();
        updateGameBackBtn();
        updateGamePlayers();
        // Skip room detail view for started games — GAME_START will switch to game scene
        if (msg.started && wsPlayerIndex != null) {
          updateBanner();
        } else {
          renderRoomDetail(msg);
          updateBanner();
        }
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
        mpGameState = deserializeState(msg.state);

        // Play transition sound and stop menu music
        menuLoop.pause();
        menuLoop.currentTime = 0;
        menuEnd.play().catch(() => {});

        // Enable FOW + LOS for multiplayer
        document.getElementById('fow-toggle').checked = true;
        document.getElementById('los-toggle').checked = true;
        cachedFowCiv = mpCivSlot;
        cachedLosData = null;

        // Switch to game scene first so viewport has real dimensions for centering
        gameEnteredFrom = 'lobby';
        setScene('game');

        // Hide single-player controls in multiplayer
        document.getElementById('sav-btn').style.display = 'none';
        document.getElementById('render-btn').style.display = 'none';
        document.getElementById('status').style.display = 'none';

        // Build mapData object compatible with existing renderer
        // populateFowCivSelector is called inside with forceCiv to ensure correct civ
        doRenderFromState({ silent: false, forceCiv: mpCivSlot });
        break;
      }

      case 'STATE': {
        const prevUnits = mpGameState?.units;
        mpGameState = deserializeState(msg.state);

        // Stash visibility update — applied after slide animation (or immediately if no slide)
        const pendingVisibility = (msg.tileVisibility && mpMapBase?.tileData) ? msg.tileVisibility : null;

        // Check if a unit we moved has slid to a new position
        if (pendingSlide && prevUnits) {
          const { unitIndex, oldGx, oldGy } = pendingSlide;
          const newUnit = msg.state.units[unitIndex];
          if (newUnit && (newUnit.gx !== oldGx || newUnit.gy !== oldGy) && newUnit.gx >= 0) {
            pendingSlide = null;
            // Slide first, then apply visibility + full re-render when done
            animateUnitSlide(unitIndex, oldGx, oldGy, newUnit.gx, newUnit.gy, pendingVisibility);
            return;
          }
        }
        pendingSlide = null;

        // No slide — apply visibility immediately
        applyVisibilityUpdate(pendingVisibility);
        doRenderFromState({ skipCenter: true });

        // Refresh city dialog if open (e.g. after SET_WORKERS)
        if (cdCity && mpGameState?.cities?.[cdCityIndex]
            && document.getElementById('citydialog-overlay').style.display === 'flex') {
          cdCity = mpGameState.cities[cdCityIndex];
          cdRerender();
        }
        break;
      }

      case 'ERROR':
        console.warn(`[ws] Server error: ${msg.message}`);
        // Room gone (server restart) — clean up and return to lobby
        if (msg.message && msg.message.includes('not found')) {
          const match = msg.message.match(/Room (\S+)/);
          const deadRoom = match ? match[1] : wsRoomId;
          if (deadRoom) removeActiveGame(deadRoom);
          if (deadRoom === wsRoomId || deadRoom === transport.getRoomId()) {
            transport.setRoomId(null);
            wsRoomId = null;
            wsPlayerIndex = null;
            wsGameStarted = false;
            mpGameState = null;
            mpMapBase = null;
            mpCivSlot = null;
            setScene('lobby');
            updateBanner();
          }
        }
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
// Always start at the menu — player can choose "Load a Game" or "Multiplayer Game"
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
    const isMyRoom = r.roomId === wsRoomId || activeGames.some(g => g.roomId === r.roomId);
    const btnText = r.started ? (isMyRoom ? 'Resume' : 'Watch') : 'Join';
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
      if (roomId === wsRoomId && wsGameStarted && mpGameState && mpMapBase) {
        // Already connected with game state — go straight to map, refresh turn UI
        gameEnteredFrom = 'lobby';
        document.getElementById('sav-btn').style.display = 'none';
        document.getElementById('render-btn').style.display = 'none';
        document.getElementById('status').style.display = 'none';
        setScene('game');
        doRenderFromState({ skipCenter: false, silent: true, forceCiv: mpCivSlot });
        return;
      }
      if (roomId === wsRoomId && wsLastRoom && !wsGameStarted) {
        // Pre-game room — show detail view
        document.getElementById('lobby-rooms-view').style.display = 'none';
        document.getElementById('lobby-room-view').style.display = 'block';
        renderRoomDetail(wsLastRoom);
      } else {
        // Use saved sessionId if resuming an active game
        const savedSession = getActiveGameSession(roomId);
        if (savedSession) {
          transport.setSessionId(savedSession);
          wsSessionId = savedSession;
        }
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
  } else if (currentScene === 'lobby' && roomsView.style.display !== 'none') {
    // First ROOM message after joining — switch to detail view
    roomsView.style.display = 'none';
    roomView.style.display = 'block';
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
  if (activeGames.length > 0) {
    const names = activeGames.map(g => `"${g.name}"`).join(', ');
    bannerText.textContent = activeGames.length === 1
      ? `Active game: ${names}`
      : `Active games: ${names}`;
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

// Resume: go directly to game if we have state, otherwise rejoin
document.getElementById('lobby-banner-resume').addEventListener('click', () => {
  if (wsRoomId && wsGameStarted && mpGameState && mpMapBase) {
    // We have game state — go straight to the map, refresh turn UI
    gameEnteredFrom = 'lobby';
    document.getElementById('sav-btn').style.display = 'none';
    document.getElementById('render-btn').style.display = 'none';
    document.getElementById('status').style.display = 'none';
    setScene('game');
    doRenderFromState({ skipCenter: false, silent: true, forceCiv: mpCivSlot });
    return;
  }
  if (wsRoomId && wsGameStarted && wsLastRoom) {
    // Connected but no game state yet — room detail will transition via GAME_START
    document.getElementById('lobby-rooms-view').style.display = 'none';
    document.getElementById('lobby-room-view').style.display = 'block';
    renderRoomDetail(wsLastRoom);
  } else if (activeGames.length > 0) {
    // Rejoin most recent active game
    const game = activeGames[activeGames.length - 1];
    transport.setSessionId(game.sessionId);
    wsSessionId = game.sessionId;
    transport.joinRoom(game.roomId);
  }
});

// Leave room (pre-game only) → back to room list
document.getElementById('room-leave-btn').addEventListener('click', () => {
  if (wsRoomId) removeActiveGame(wsRoomId);
  transport.leaveRoom();
  wsRoomId = null;
  wsPlayerIndex = null;
  wsGameStarted = false;
  wsLastRoom = null;
  transport.setRoomId(null);
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
  if (gameEnteredFrom === 'lobby') {
    setScene('lobby');
    // Always show room list so player can browse/join other games
    document.getElementById('lobby-room-view').style.display = 'none';
    document.getElementById('lobby-rooms-view').style.display = 'block';
    updateBanner();
  } else {
    setScene('menu');
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

// Reconstruct non-JSON types (arrays → Sets) after WebSocket deserialization
function deserializeState(state) {
  if (state.cities) {
    for (const c of state.cities) {
      if (Array.isArray(c.buildings)) c.buildings = new Set(c.buildings);
    }
  }
  return state;
}

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
    civTechs: state.civTechs ? state.civTechs.map(t => Array.isArray(t) ? new Set(t) : t) : null,
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

async function doRenderFromState(opts = {}) {
  const mapData = buildMapDataFromState();
  if (!mapData) return;
  currentMapData = mapData;

  populateFowCivSelector(mapData, opts.forceCiv);
  updateTurnUI();

  // Auto-select first movable unit (only on our turn)
  if (mpGameState.activeCiv === mpCivSlot) {
    const next = findNextMovableUnit(-1);
    mpSelectedUnit = next;
  } else {
    mpSelectedUnit = null;
  }

  // Render new frame atomically — build everything offscreen, then swap
  if (mapSprites) {
    stopBlink();
    await renderAtomicSwap(mapData, opts);
  } else if (files.t1 && files.t2) {
    // First render (no sprites yet) — use full doRender with loading overlay
    await doRender({ silent: opts.silent !== false });
    if (mpSelectedUnit != null) startBlink(); else stopBlink();
  }

  // Center on active unit (or first own unit) when loading/resuming
  if (!opts.skipCenter) {
    const centerUnit = mpSelectedUnit != null
      ? mpGameState.units[mpSelectedUnit]
      : findFirstOwnUnit();
    if (centerUnit) centerOnUnit(centerUnit);
  }
}

// Double-buffered render: build base + FOW canvas offscreen, then swap all at once.
// The viewport keeps showing the old frame until the new one is fully ready.
async function renderAtomicSwap(mapData, opts = {}) {
  const fowOn = document.getElementById('fow-toggle').checked;
  const losOn = document.getElementById('los-toggle').checked;
  const fowCiv = cachedFowCiv;

  // 1. Render base canvas (all tiles, units, cities — no FOW)
  const blinkUnitTiles = [];
  if (mpCivSlot != null && mpGameState) {
    for (const u of (mpGameState.units || [])) {
      if (u.owner === mpCivSlot && u.gx >= 0) {
        blinkUnitTiles.push({ gx: u.gx, gy: u.gy });
      }
    }
  }
  const newBase = document.createElement('canvas');
  const result = await Civ2Renderer.render(newBase, mapData, mapSprites, null,
    { fowEnabled: false, gridEnabled: false, blinkUnitTiles, selectedUnitIndex: mpSelectedUnit });

  // 2. Render FOW/LOS canvas if needed (still all offscreen)
  let newFow = null, newFowLos = null, newLos = null;
  if (fowOn && losOn) {
    const losData = computeLOS(mapData, fowCiv);
    newFowLos = document.createElement('canvas');
    await Civ2Renderer.render(newFowLos, mapData, mapSprites, null,
      { fowEnabled: true, fowCiv, gridEnabled: false, losData, selectedUnitIndex: mpSelectedUnit });
    cachedLosData = losData;
  } else if (fowOn) {
    newFow = document.createElement('canvas');
    await Civ2Renderer.render(newFow, mapData, mapSprites, null,
      { fowEnabled: true, fowCiv, gridEnabled: false, selectedUnitIndex: mpSelectedUnit });
  } else if (losOn) {
    const losData = computeLOS(mapData, fowCiv);
    newLos = document.createElement('canvas');
    await Civ2Renderer.render(newLos, mapData, mapSprites, null,
      { fowEnabled: false, gridEnabled: false, losData, selectedUnitIndex: mpSelectedUnit });
    cachedLosData = losData;
  }

  // 3. Atomic swap — assign all canvases at once, then draw
  mapCanvasBase = newBase;
  blinkPatches = result.terrainPatches;
  blinkUnitOverlay = result.blinkUnitOverlay;
  vp.offW = newBase.width;
  vp.offH = newBase.height;
  vp.wraps = (mapData.mapShape === 0);
  vp.wrapW = result.wrapW || vp.offW;

  // Swap FOW canvases (null out the ones we didn't render — they'll be lazy-built if toggled)
  mapCanvasFow = newFow;
  mapCanvasFowLos = newFowLos;
  mapCanvasLos = newLos;
  minimapCanvasLos = null;
  minimapCanvasFow = null;
  minimapCanvasFowLos = null;
  _losRendering = null;
  _fowRendering = null;
  _fowLosRendering = null;

  // 4. Single drawViewport — frame is complete, no flash
  drawViewport();

  // Start blink after the new frame is on screen
  if (mpSelectedUnit != null) {
    startBlink();
  } else {
    stopBlink();
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

// Show connected players/spectators in the controls bar
function updateGamePlayers() {
  const el = document.getElementById('game-players');
  if (!wsLastRoom) { el.textContent = ''; return; }
  const parts = [];
  for (const c of wsLastRoom.clients) {
    if (!c.occupied) continue;
    const name = c.name || `Seat ${c.seat}`;
    const cls = c.wsOpen ? 'gp-player' : 'gp-offline';
    const status = c.wsOpen ? '' : ' (off)';
    parts.push(`<span class="${cls}">${name}[S${c.seat}]${status}</span>`);
  }
  for (const s of (wsLastRoom.spectators || [])) {
    const name = s.name || 'Spectator';
    const cls = s.wsOpen ? 'gp-spectator' : 'gp-offline';
    parts.push(`<span class="${cls}">${name}[watch]</span>`);
  }
  el.innerHTML = parts.join('<span class="gp-sep"> · </span>');
}

// End Turn button
document.getElementById('end-turn-btn').addEventListener('click', () => {
  if (!mpGameState || mpGameState.activeCiv !== mpCivSlot) return;
  transport.sendRaw({ type: 'ACTION', action: { type: 'END_TURN' } });
});

// ── Multiplayer keyboard input ──
window.addEventListener('keydown', e => {
  if (!mpGameState || mpGameState.activeCiv !== mpCivSlot) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
  if (currentScene !== 'game') return;

  // Tab: cycle to next movable unit
  if (e.key === 'Tab') {
    e.preventDefault();
    const next = findNextMovableUnit(mpSelectedUnit ?? -1);
    if (next != null) {
      selectUnit(next);
      centerOnUnit(mpGameState.units[next]);
    }
    return;
  }

  // Enter: end turn if no movable units remain
  if (e.key === 'Enter') {
    e.preventDefault();
    if (findNextMovableUnit(-1) == null) {
      transport.sendRaw({ type: 'ACTION', action: { type: 'END_TURN' } });
    }
    return;
  }

  // B: build city (settler only)
  if (e.key === 'b' || e.key === 'B') {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      const u = mpGameState.units[mpSelectedUnit];
      if (u && u.type === 0) { // Settlers
        sfxBuildCity.currentTime = 0;
        sfxBuildCity.play().catch(() => {});
        transport.sendRaw({
          type: 'ACTION',
          action: { type: 'BUILD_CITY', unitIndex: mpSelectedUnit },
        });
      }
    }
    return;
  }

  // Numpad movement
  const dir = NUMPAD_DIR[e.key];
  if (!dir) return;
  e.preventDefault();

  // Auto-select first movable unit if none selected
  if (mpSelectedUnit == null) {
    selectUnit(findNextMovableUnit(-1));
  }
  if (mpSelectedUnit == null) return;

  // Set pending slide for animation
  const u = mpGameState.units[mpSelectedUnit];
  if (u) {
    pendingSlide = { unitIndex: mpSelectedUnit, oldGx: u.gx, oldGy: u.gy };
  }

  transport.sendRaw({
    type: 'ACTION',
    action: { type: 'MOVE_UNIT', unitIndex: mpSelectedUnit, dir },
  });
});

function findFirstOwnUnit() {
  if (!mpGameState) return null;
  for (const u of mpGameState.units) {
    if (u.owner === mpCivSlot && u.gx >= 0) return u;
  }
  return null;
}

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
  vp.x = px - vp.logicalW / vp.scale / 2;
  vp.y = py - vp.logicalH / vp.scale / 2;
  clampViewport();
  drawViewport();
}

function selectUnit(idx) {
  mpSelectedUnit = idx;
  stopBlink();
  // Re-render map atomically — blink starts after swap completes
  quickRerender();
}

// Lightweight re-render: atomic swap (no sprite re-extraction)
async function quickRerender() {
  if (!mapSprites || !currentMapData) return;
  await renderAtomicSwap(currentMapData);
}

function startBlink() {
  stopBlink();
  blinkOn = true;
  blinkInterval = setInterval(() => {
    blinkOn = !blinkOn;
    toggleBlinkOverlay();
  }, 400);
}

function stopBlink() {
  if (blinkInterval) {
    clearInterval(blinkInterval);
    blinkInterval = null;
  }
  blinkOn = true;
}

// Lightweight blink toggle: restore small region, then optionally overlay unit
function toggleBlinkOverlay() {
  if (!blinkUnderlay || !blinkUnitOverlay) return;
  if (document.getElementById('minimap-toggle').checked) return;
  // Restore base viewport region (no unit)
  vCtx.putImageData(blinkUnderlay.imageData, blinkUnderlay.vpX, blinkUnderlay.vpY);
  // If blink-on, composite unit overlay on top
  if (blinkOn) {
    blitPatchToViewport(blinkUnitOverlay.canvas, blinkUnitOverlay.x, blinkUnitOverlay.y);
  }
}

function applyVisibilityUpdate(tileVisibility) {
  if (!tileVisibility || !mpMapBase?.tileData) return;
  for (let i = 0; i < tileVisibility.length; i++) {
    mpMapBase.tileData[i][4] = tileVisibility[i];
  }
  cachedLosData = null;
  invalidateFowCanvases();
}

// ── Unit slide animation ──
function animateUnitSlide(unitIndex, oldGx, oldGy, newGx, newGy, deferredVisibility) {
  const TW = 64, TH = 32;
  const fromX = oldGx * TW + ((oldGy % 2) ? (TW >> 1) : 0);
  const fromY = oldGy * (TH >> 1) - 16;
  const toX = newGx * TW + ((newGy % 2) ? (TW >> 1) : 0);
  const toY = newGy * (TH >> 1) - 16;

  // Handle wrapping: pick shortest path
  let dx = toX - fromX;
  if (vp.wraps && vp.wrapW > 0) {
    if (dx > vp.wrapW / 2) dx -= vp.wrapW;
    if (dx < -vp.wrapW / 2) dx += vp.wrapW;
  }
  const dy = toY - fromY;

  const u = mpGameState.units[unitIndex];
  if (!u || !mapSprites) {
    applyVisibilityUpdate(deferredVisibility);
    doRenderFromState({ skipCenter: true });
    return;
  }
  const cacheKey = u.type + '-' + u.owner;
  const unitSprite = mapSprites.unitColored[cacheKey];
  if (!unitSprite) {
    applyVisibilityUpdate(deferredVisibility);
    doRenderFromState({ skipCenter: true });
    return;
  }

  // Stop blink during slide
  stopBlink();
  slideAnimating = true;

  // Snapshot current viewport as static background for the animation
  // (unit is already excluded from all canvases via selectedUnitIndex)
  const bgSnapshot = vCtx.getImageData(0, 0, viewportCanvas.width, viewportCanvas.height);

  const duration = 150;
  const startTime = performance.now();
  const dpr = window.devicePixelRatio || 1;
  const pxPerMap = vp.scale * dpr;

  function frame(now) {
    const t = Math.min(1, (now - startTime) / duration);
    const ease = t * (2 - t); // ease-out quadratic

    // Restore frozen background (no clearRect + async re-render)
    vCtx.putImageData(bgSnapshot, 0, 0);

    // Draw unit at interpolated position
    const curX = fromX + dx * ease;
    const curY = fromY + dy * ease;

    if (vp.wraps) {
      const x1 = ((vp.x % vp.wrapW) + vp.wrapW) % vp.wrapW;
      const relX = ((curX - x1) % vp.wrapW + vp.wrapW) % vp.wrapW;
      vCtx.drawImage(unitSprite, relX * pxPerMap, (curY - vp.y) * pxPerMap,
        unitSprite.width * pxPerMap, unitSprite.height * pxPerMap);
    } else {
      vCtx.drawImage(unitSprite, (curX - vp.x) * pxPerMap, (curY - vp.y) * pxPerMap,
        unitSprite.width * pxPerMap, unitSprite.height * pxPerMap);
    }

    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      slideAnimating = false;
      applyVisibilityUpdate(deferredVisibility);
      doRenderFromState({ skipCenter: true });
    }
  }

  requestAnimationFrame(frame);
}

// ── Unit context menu ──
const unitMenu = document.getElementById('unit-menu');

let unitMenuShowTime = 0; // timestamp when menu was last shown

// Convert a validated action from getValidActions() into a menu item { label, action }
function actionToMenuItem(va, unitIdx) {
  const u = mpGameState.units[unitIdx];
  const name = UNIT_NAMES[u.type] || `Unit ${u.type}`;

  switch (va.type) {
    case MOVE_UNIT:
      return {
        label: `Move ${name}`,
        action: () => {
          pendingSlide = { unitIndex: unitIdx, oldGx: u.gx, oldGy: u.gy };
          transport.sendRaw({
            type: 'ACTION',
            action: { type: MOVE_UNIT, unitIndex: unitIdx, dir: va.dir },
          });
        },
      };
    case BUILD_CITY:
      return {
        label: 'Build City',
        action: () => {
          sfxBuildCity.currentTime = 0;
          sfxBuildCity.play().catch(() => {});
          transport.sendRaw({
            type: 'ACTION',
            action: { type: BUILD_CITY, unitIndex: unitIdx },
          });
        },
      };
    default:
      return { label: va.type, action: () => {} };
  }
}

function showUnitMenu(clientX, clientY, items) {
  unitMenu.innerHTML = '';
  unitMenu.classList.remove('visible');
  if (items.length === 0) return;

  for (const item of items) {
    if (item.separator) {
      const hr = document.createElement('div');
      hr.className = 'unit-menu-separator';
      unitMenu.appendChild(hr);
      continue;
    }
    if (item.header) {
      const hdr = document.createElement('div');
      hdr.className = 'unit-menu-header';
      hdr.textContent = item.header;
      unitMenu.appendChild(hdr);
      continue;
    }
    const btn = document.createElement('button');
    btn.className = 'unit-menu-item' + (item.selected ? ' unit-menu-selected' : '');
    if (item.sprite) {
      const img = document.createElement('canvas');
      const scale = 2;
      img.width = item.sprite.width * scale;
      img.height = item.sprite.height * scale;
      img.className = 'unit-menu-sprite';
      const ctx = img.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(item.sprite, 0, 0, img.width, img.height);
      btn.appendChild(img);
    }
    const span = document.createElement('span');
    span.textContent = item.label;
    btn.appendChild(span);
    btn.addEventListener('pointerup', e => {
      e.stopPropagation();
      hideUnitMenu();
      item.action();
    });
    unitMenu.appendChild(btn);
  }

  // Position: keep menu within viewport bounds
  unitMenu.style.left = '0px';
  unitMenu.style.top = '0px';
  unitMenu.classList.add('visible');
  unitMenuShowTime = Date.now();
  const rect = unitMenu.getBoundingClientRect();
  const mx = Math.min(clientX, window.innerWidth - rect.width - 4);
  const my = Math.min(clientY, window.innerHeight - rect.height - 4);
  unitMenu.style.left = Math.max(0, mx) + 'px';
  unitMenu.style.top = Math.max(0, my) + 'px';
}

function hideUnitMenu() {
  unitMenu.classList.remove('visible');
  unitMenu.innerHTML = '';
}

// Dismiss on click/touch outside or Escape
// Guard against synthesized mouse events on mobile by ignoring dismissal
// within 300ms of showing the menu.
window.addEventListener('pointerdown', e => {
  if (!unitMenu.classList.contains('visible')) return;
  if (unitMenu.contains(e.target)) return;
  if (Date.now() - unitMenuShowTime < 300) return;
  hideUnitMenu();
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && unitMenu.classList.contains('visible')) {
    hideUnitMenu();
  }
});

// ── Initialize event handlers ──
initEvents(viewportCanvas, vp, {
  clampViewport, drawViewport, resizeViewport,
  handleMapClick, closeCityDialog, closeCityView,
  getMapData: () => currentMapData,
  SCROLL_STEP, getMinScale, VP_MAX_SCALE,
});
