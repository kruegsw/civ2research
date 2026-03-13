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
import { getGameYear, getGameYearFromMap } from '../engine/year.js';
import { CIV_COLORS, UNIT_NAMES, TERRAIN_NAMES, TERRAIN_BASE, IMPROVE_NAMES, WONDER_NAMES, UNIT_COSTS, IMPROVE_COSTS, WONDER_COSTS, UNIT_PREREQS, UNIT_OBSOLETE, IMPROVE_PREREQS, WONDER_PREREQS, WONDER_OBSOLETE, IMPROVE_MAINTENANCE, SHIELD_BOX_FACTOR, ADVANCE_NAMES, ADVANCE_PREREQS, ORDER_KEYS, ORDER_NAMES, GOVERNMENT_NAMES, GOVERNMENT_KEYS, GOVT_TECH_PREREQS, GOVT_MAX_RATE, GOVT_MAX_SCIENCE, UNIT_DOMAIN, UNIT_ATK, UNIT_DEF, UNIT_MOVE_POINTS, UNIT_HP, TERRAIN_TRANSFORM, TRANSFORM_TURNS, UNIT_CARRY_CAP, CIV_CITY_NAMES } from '../engine/defs.js';
import { createTransport } from '../net/transport.js';
import { createAccessors, reconstructMapData } from '../engine/state.js';
import { NUMPAD_DIR, getDirection } from '../engine/movement.js';
import { getValidActions, validateAction, calcBribeCost, calcInciteCost } from '../engine/rules.js';
import { MOVE_UNIT, BUILD_CITY, SET_WORKERS, CHANGE_PRODUCTION, RUSH_BUY, SELL_BUILDING, CHANGE_RATES, SET_RESEARCH, UNIT_ORDER, WORKER_ORDER, REVOLUTION, PILLAGE, DESTROY_CITY, PROPOSE_TREATY, RESPOND_TREATY, DECLARE_WAR, ESTABLISH_TRADE, RENAME_CITY, BRIBE_UNIT, STEAL_TECH, SABOTAGE_CITY, INCITE_REVOLT, DEMAND_TRIBUTE, RESPOND_DEMAND, SHARE_MAP, BOMBARD, REBASE, GOTO, TRANSFORM_TERRAIN } from '../engine/actions.js';
import { findPath } from '../engine/pathfinding.js';
import { calcRushBuyCost } from '../engine/happiness.js';
import { getProductionCost, calcCityTrade, calcFoodSurplus, calcShieldProduction } from '../engine/production.js';
import { getAvailableResearch, calcResearchCost } from '../engine/research.js';
import { wrapGx } from '../engine/utils.js';

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
let _researchIconCache = null; // { icons: canvas[], stoneTile: dataURL }
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
  const cd = mapData.civs && mapData.civs[pc];
  const year = getGameYearFromMap(mapData);
  const gold = cd ? cd.treasury : 0;
  const govt = cd && cd.government ? cd.government.charAt(0).toUpperCase() + cd.government.slice(1) : '';
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
    `<span class="gi-gold" style="cursor:pointer" title="Shift+T: Tax Rates">${gold.toLocaleString()} Gold</span> ${sep} ` +
    `<span class="gi-pop">${pop.toLocaleString()} People</span>`;
  // Make gold display clickable to open rate sliders
  const goldEl = el.querySelector('.gi-gold');
  if (goldEl && mpGameState) {
    goldEl.addEventListener('click', () => showRateSliders());
  }
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
    mpGameState = null;
    mpCivSlot = null;
    updateTurnUI();
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
  if (!mapData.civNames && mapData.civs) {
    const civNames = {};
    for (let i = 0; i < 8; i++) civNames[i] = mapData.civs[i]?.name || `Civ ${i}`;
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
  return Civ2Renderer.findTileAtMap(mx, my, currentMapData.mw, currentMapData.mh);
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

  // Go-to mode: click sets path target
  if (gotoMode) { handleGotoClick(tile.gx, tile.gy); return; }
  // Rebase mode: click sets rebase target
  if (rebaseMode) { handleRebaseClick(tile.gx, tile.gy); return; }

  const isMyTurn = mpGameState && mpCivSlot != null && mpGameState.turn.activeCiv === mpCivSlot;
  const activeUnit = mpSelectedUnit != null ? mpGameState?.units[mpSelectedUnit] : null;
  const activeUnitOnTile = activeUnit && activeUnit.gx === tile.gx && activeUnit.gy === tile.gy;
  const cityHit = findCityAt(tile.gx, tile.gy);

  // City tile without our active unit on it
  if (cityHit && !activeUnitOnTile) {
    // Long press: if active unit can move here, show move menu instead
    if (isLongPress && isMyTurn && mpSelectedUnit != null) {
      const validActions = getValidActions(mpGameState, mpMapBase, mpSelectedUnit, tile);
      if (validActions.length > 0) {
        const menuItems = validActions.map(va => actionToMenuItem(va, mpSelectedUnit));
        showUnitMenu(e.clientX, e.clientY, menuItems);
        return;
      }
    }
    // Short click (or long press with no actions): open city dialog
    openCityDialog(cityHit.city, cityHit.index);
    return;
  }

  if (isMyTurn) {
    // Gather own units on this tile (movable OR with active orders)
    const tileUnits = [];
    mpGameState.units.forEach((u, idx) => {
      if (u.gx === tile.gx && u.gy === tile.gy && u.owner === mpCivSlot && u.gx >= 0) {
        tileUnits.push(idx);
      }
    });

    const activeOnThisTile = mpSelectedUnit != null && tileUnits.includes(mpSelectedUnit);

    // ── Clicking a DIFFERENT tile (active unit is elsewhere) ──
    if (tileUnits.length > 0 && !activeOnThisTile) {
      const topUnit = tileUnits[0];
      const topU = mpGameState.units[topUnit];

      if (!isLongPress) {
        // Short click: select top unit (only if it has no active orders)
        if (!topU.orders || topU.orders === 'none') {
          selectUnit(topUnit);
        }
        return;
      }

      // Long press: show combined menu (move active unit here + resident unit orders)
      const menuItems = [];

      // Move action for the currently active unit (if valid)
      if (mpSelectedUnit != null) {
        const moveActions = getValidActions(mpGameState, mpMapBase, mpSelectedUnit, tile);
        for (const va of moveActions) {
          menuItems.push(actionToMenuItem(va, mpSelectedUnit));
        }
      }

      // "Open City" option if on a city tile
      if (cityHit) {
        if (menuItems.length > 0) menuItems.push({ separator: true });
        menuItems.push({
          label: 'Open City',
          action: () => openCityDialog(cityHit.city, cityHit.index),
        });
      }

      // Unit selection entries (with full shield thumbnails)
      if (menuItems.length > 0) menuItems.push({ separator: true });
      menuItems.push({ header: 'Select Unit' });
      for (const idx of tileUnits) {
        const u = mpGameState.units[idx];
        let baseName = UNIT_NAMES[u.type] || `Unit ${u.type}`;
        if (UNIT_CARRY_CAP[u.type]) {
          const loaded = mpGameState.units.filter(lu => lu.gx === u.gx && lu.gy === u.gy && lu.owner === u.owner && (UNIT_DOMAIN[lu.type] ?? 0) === 0 && lu !== u && lu.gx >= 0).length;
          baseName += ` (${loaded}/${UNIT_CARRY_CAP[u.type]})`;
        }
        const orderDesc = (u.orders && u.orders !== 'none') ? ORDER_NAMES[u.orders] || u.orders : '';
        const label = orderDesc ? `${baseName} (${orderDesc}) — Wake` : baseName;
        const sprite = renderUnitThumbnail(u);
        menuItems.push({
          label,
          sprite,
          selected: false,
          action: () => {
            selectUnit(idx);
            if (u.orders && u.orders !== 'none') {
              transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: idx, order: 'wake' } });
            }
          },
        });
      }

      // Orders for top resident unit (wake, fortify, worker orders, etc.)
      const orderItems = buildOrderMenuItems(topUnit);
      // Add Wake option at top if unit has active orders
      if (topU.orders && topU.orders !== 'none') {
        orderItems.unshift({
          label: 'Wake Up',
          action: () => {
            selectUnit(topUnit);
            transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: topUnit, order: 'wake' } });
          },
        });
      }
      if (orderItems.length > 0) {
        menuItems.push({ separator: true });
        menuItems.push({ header: 'Orders' });
        menuItems.push(...orderItems);
      }

      showUnitMenu(e.clientX, e.clientY, menuItems);
      return;
    }

    // ── Clicking on empty neighboring tile with active unit — show move menu (long press) ──
    if (isLongPress && mpSelectedUnit != null && tileUnits.length === 0) {
      const validActions = getValidActions(mpGameState, mpMapBase, mpSelectedUnit, tile);
      const menuItems = validActions.map(va => actionToMenuItem(va, mpSelectedUnit));
      // Bombardment option for air/naval units targeting enemy tiles
      const selU = mpGameState.units[mpSelectedUnit];
      if (selU) {
        const bErr = validateAction(mpGameState, mpMapBase,
          { type: BOMBARD, unitIndex: mpSelectedUnit, targetGx: tile.gx, targetGy: tile.gy }, mpCivSlot);
        if (!bErr) {
          menuItems.push({ label: `Bombard (${UNIT_NAMES[selU.type]})`, action: () => doBombard(mpSelectedUnit, tile.gx, tile.gy) });
        }
      }
      if (menuItems.length > 0) {
        showUnitMenu(e.clientX, e.clientY, menuItems);
        return;
      }

      // Non-adjacent tile: offer Go To as a menu option
      if (selU && selU.movesLeft > 0) {
        const gotoItems = [];
        const capturedUnit = mpSelectedUnit;
        gotoItems.push({
          label: 'Go To \u2192',
          action: () => {
            const u = mpGameState.units[capturedUnit];
            if (!u || u.gx < 0) return;
            const path = findPath(u.type, u.gx, u.gy, tile.gx, tile.gy, mpMapBase, u.owner, mpGameState.units, mpGameState.cities);
            if (path && path.length > 0) {
              transport.sendRaw({
                type: 'ACTION',
                action: { type: GOTO, unitIndex: capturedUnit, targetGx: tile.gx, targetGy: tile.gy, path },
              });
              pendingAutoAdvanceFrom = capturedUnit;
            } else {
              showOverlayMessage('No path found');
            }
          },
        });
        showUnitMenu(e.clientX, e.clientY, gotoItems);
        return;
      }
    }

    // ── Clicking on OWN tile (active unit is here) ──
    if (tileUnits.length > 0 && activeOnThisTile) {
      const menuItems = [];

      // "Open City" option if on a city tile
      if (cityHit) {
        menuItems.push({
          label: 'Open City',
          action: () => openCityDialog(cityHit.city, cityHit.index),
        });
        menuItems.push({ separator: true });
      }

      // Section header + unit selection entries (with full shield thumbnails)
      if (tileUnits.length > 1) {
        menuItems.push({ header: 'Select Unit' });
        for (const idx of tileUnits) {
          const u = mpGameState.units[idx];
          let baseName = UNIT_NAMES[u.type] || `Unit ${u.type}`;
          if (UNIT_CARRY_CAP[u.type]) {
            const loaded = mpGameState.units.filter(lu => lu.gx === u.gx && lu.gy === u.gy && lu.owner === u.owner && (UNIT_DOMAIN[lu.type] ?? 0) === 0 && lu !== u && lu.gx >= 0).length;
            baseName += ` (${loaded}/${UNIT_CARRY_CAP[u.type]})`;
          }
          const orderDesc = (u.orders && u.orders !== 'none') ? ORDER_NAMES[u.orders] || u.orders : '';
          const label = orderDesc ? `${baseName} (${orderDesc}) — Wake` : baseName;
          const sprite = renderUnitThumbnail(u);
          const selected = idx === mpSelectedUnit;
          menuItems.push({
            label,
            sprite,
            selected,
            action: () => {
              selectUnit(idx);
              if (u.orders && u.orders !== 'none') {
                transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: idx, order: 'wake' } });
              }
            },
          });
        }
      }

      // Orders for the active unit (same-tile actions + unit/worker orders)
      const selIdx = mpSelectedUnit;
      const orderItems = [];

      // Tile actions (Build City) from getValidActions
      const tileActions = getValidActions(mpGameState, mpMapBase, selIdx, tile);
      for (const va of tileActions) {
        orderItems.push(actionToMenuItem(va, selIdx));
      }

      // Unit orders + worker orders
      orderItems.push(...buildOrderMenuItems(selIdx));

      if (orderItems.length > 0) {
        if (menuItems.length > 0 && !menuItems[menuItems.length - 1].separator) {
          menuItems.push({ separator: true });
        }
        menuItems.push({ header: 'Orders' });
        menuItems.push(...orderItems);
      }

      // Single unit on tile, no city, no orders — just select directly
      if (tileUnits.length === 1 && !cityHit && orderItems.length === 0) {
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
  } else if (result && result.action === 'change') {
    if (!mpGameState || !mpMapBase || mpCivSlot == null || cdCity.owner !== mpCivSlot) return;
    showProductionPicker(cdCity, cdCityIndex);
  } else if (result && result.action === 'buy') {
    if (!mpGameState || !mpMapBase || mpCivSlot == null || cdCity.owner !== mpCivSlot) return;
    handleRushBuy(cdCity, cdCityIndex);
  } else if (result && result.action === 'sell') {
    if (!mpGameState || !mpMapBase || mpCivSlot == null || cdCity.owner !== mpCivSlot) return;
    if (result.buildingId != null) {
      // Direct sell from improvement list sell icon
      const name = IMPROVE_NAMES[result.buildingId] || 'Building';
      const refund = IMPROVE_COSTS[result.buildingId] || 0;
      showConfirmDialog(`Sell ${name} for ${refund} gold?`, () => {
        sfx('SELL');
        transport.sendRaw({
          type: 'ACTION',
          action: { type: SELL_BUILDING, cityIndex: cdCityIndex, buildingId: result.buildingId },
        });
      });
    } else {
      showSellBuildingPicker(cdCity, cdCityIndex);
    }
  } else if (result && result.action === 'rename') {
    if (!mpGameState || !mpMapBase || mpCivSlot == null || cdCity.owner !== mpCivSlot) return;
    createCiv2Dialog('rename-dialog', 'Rename City', panel => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = cdCity.name;
      input.maxLength = 24;
      input.style.cssText = 'width:200px;font:14px "Times New Roman",serif;padding:4px';
      panel.appendChild(input);
      setTimeout(() => { input.focus(); input.select(); }, 100);
    }, [
      { label: 'OK', action: () => {
        const input = document.querySelector('#rename-dialog input');
        const newName = input?.value?.trim();
        if (newName && newName.length > 0 && newName !== cdCity.name) {
          transport.sendRaw({ type: 'ACTION', action: { type: RENAME_CITY, cityIndex: cdCityIndex, name: newName } });
        }
      }},
      { label: 'Cancel' },
    ]);
  } else if (result && result.action === 'unitPresent') {
    if (!mpGameState || !mpMapBase || mpCivSlot == null) return;
    showUnitPresentDialog(result.unitIndex);
  } else if (result && result.action === 'unitSupported') {
    if (!mpGameState || !mpMapBase || mpCivSlot == null) return;
    showUnitSupportedDialog(result.unitIndex);
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
    // Check if tile is in bounds
    const wgx = mpMapBase.wraps ? wrapGx(result.tileGx, mpMapBase.mw) : result.tileGx;
    if (result.tileGy < 0 || result.tileGy >= mpMapBase.mh || wgx < 0 || wgx >= mpMapBase.mw) return;

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
      const wgx = mpMapBase.wraps ? wrapGx(tgx, mpMapBase.mw) : tgx;
      if (tgy < 0 || tgy >= mpMapBase.mh) continue;
      const ter = mpMapBase.getTerrain(wgx, tgy);
      if (ter < 0 || ter > 10) continue;
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
    const wgx = mpMapBase.wraps ? wrapGx(tgx, mpMapBase.mw) : tgx;
    if (tgy < 0 || tgy >= mpMapBase.mh || wgx < 0 || wgx >= mpMapBase.mw) continue;
    const ter = mpMapBase.getTerrain(wgx, tgy);
    if (ter < 0 || ter > 10) continue; // skip invalid

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

// ── Production picker ──

function showProductionPicker(city, cityIndex, onDismiss) {
  // Remove any existing picker
  const existing = document.getElementById('production-picker');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'production-picker';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5)';

  const panel = document.createElement('div');
  panel.style.cssText = 'background:#d4b896;border:3px outset #a08060;max-height:70vh;overflow-y:auto;padding:8px;min-width:280px;font:14px "Times New Roman",serif;color:#333';

  const title = document.createElement('div');
  title.textContent = `${city.name} — Change Production`;
  title.style.cssText = 'font-weight:bold;font-size:16px;margin-bottom:6px;text-align:center';
  panel.appendChild(title);

  const hasBuilding = id => city.buildings && city.buildings.has(id);
  const civTechs = mpGameState.civTechs?.[city.owner];
  const hasTech = (id) => id < 0 || (civTechs ? civTechs.has(id) : id === -1);
  console.log('[prodpicker] city.owner=', city.owner, 'civTechs=', civTechs, 'isSet=', civTechs instanceof Set, 'techs=', civTechs ? [...civTechs] : null);

  // Build list of available items
  const items = [];

  // Units — filtered by tech prerequisites and obsolescence
  for (let id = 0; id < UNIT_NAMES.length; id++) {
    if (!UNIT_NAMES[id] || UNIT_COSTS[id] == null) continue;
    const prereq = UNIT_PREREQS[id] ?? -1;
    const obsolete = UNIT_OBSOLETE[id] ?? -1;
    if (prereq === -2 || obsolete === -2) continue; // unbuildable
    if (prereq >= 0 && !hasTech(prereq)) continue;
    if (obsolete >= 0 && hasTech(obsolete)) continue;
    items.push({ type: 'unit', id, name: UNIT_NAMES[id], cost: UNIT_COSTS[id] });
  }

  // Buildings — filtered by prereqs, skip Palace=1, skip already-built
  for (let id = 2; id <= 38; id++) {
    if (!IMPROVE_NAMES[id] || IMPROVE_COSTS[id] == null) continue;
    if (hasBuilding(id)) continue;
    const prereq = IMPROVE_PREREQS[id] ?? -1;
    if (prereq >= 0 && !hasTech(prereq)) continue;
    items.push({ type: 'building', id, name: IMPROVE_NAMES[id], cost: IMPROVE_COSTS[id] });
  }

  // Wonders — filtered by prereqs, skip already-built globally
  for (let i = 0; i < WONDER_NAMES.length; i++) {
    const wid = i + 39;
    if (!WONDER_NAMES[i] || WONDER_COSTS[i] == null) continue;
    // Check if wonder already built by anyone
    if (mpGameState.wonders && mpGameState.wonders[i] &&
        mpGameState.wonders[i].cityIndex != null) continue;
    const prereq = WONDER_PREREQS[i] ?? -1;
    if (prereq >= 0 && !hasTech(prereq)) continue;
    items.push({ type: 'wonder', id: wid, name: WONDER_NAMES[i], cost: WONDER_COSTS[i] });
  }

  const rows = [];
  for (const item of items) {
    const row = document.createElement('div');
    row.style.cssText = 'padding:3px 6px;cursor:pointer;display:flex;justify-content:space-between';
    row.onmouseenter = () => { if (!row.classList.contains('pp-highlight')) row.style.background = '#c0a070'; };
    row.onmouseleave = () => { if (!row.classList.contains('pp-highlight')) row.style.background = ''; };

    const label = document.createElement('span');
    label.textContent = item.name;
    const costLabel = document.createElement('span');
    costLabel.textContent = `${item.cost / 10} shields`;
    costLabel.style.color = '#666';
    row.appendChild(label);
    row.appendChild(costLabel);

    row.addEventListener('click', () => {
      window.removeEventListener('keydown', ppKeyHandler, true);
      transport.sendRaw({
        type: 'ACTION',
        action: {
          type: CHANGE_PRODUCTION,
          cityIndex,
          item: { type: item.type, id: item.id },
        },
      });
      overlay.remove();
      if (onDismiss) onDismiss();
    });
    panel.appendChild(row);
    rows.push(row);
  }

  // Cancel button
  const cancel = document.createElement('div');
  cancel.textContent = 'Cancel';
  cancel.style.cssText = 'text-align:center;padding:6px;margin-top:6px;cursor:pointer;font-weight:bold;border-top:1px solid #a08060';
  cancel.addEventListener('click', () => { window.removeEventListener('keydown', ppKeyHandler, true); overlay.remove(); if (onDismiss) onDismiss(); });
  panel.appendChild(cancel);

  // Arrow key navigation
  let ppHighlight = -1;
  function ppSetHighlight(idx) {
    if (ppHighlight >= 0 && ppHighlight < rows.length) {
      rows[ppHighlight].style.background = '';
      rows[ppHighlight].classList.remove('pp-highlight');
    }
    ppHighlight = idx;
    if (ppHighlight >= 0 && ppHighlight < rows.length) {
      rows[ppHighlight].style.background = '#c0a070';
      rows[ppHighlight].classList.add('pp-highlight');
      rows[ppHighlight].scrollIntoView({ block: 'nearest' });
    }
  }
  const ppKeyHandler = e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault(); e.stopPropagation();
      ppSetHighlight(Math.min(rows.length - 1, ppHighlight + 1));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault(); e.stopPropagation();
      ppSetHighlight(Math.max(0, ppHighlight - 1));
    } else if (e.key === 'Enter' && ppHighlight >= 0) {
      e.preventDefault(); e.stopPropagation();
      rows[ppHighlight].click();
    } else if (e.key === 'Escape') {
      e.preventDefault(); e.stopPropagation();
      window.removeEventListener('keydown', ppKeyHandler, true);
      overlay.remove();
      if (onDismiss) onDismiss();
    }
  };
  window.addEventListener('keydown', ppKeyHandler, true);

  overlay.appendChild(panel);
  overlay.addEventListener('click', e => { if (e.target === overlay) { window.removeEventListener('keydown', ppKeyHandler, true); overlay.remove(); if (onDismiss) onDismiss(); } });
  document.body.appendChild(overlay);
}

function handleRushBuy(city, cityIndex) {
  const item = city.itemInProduction;
  if (!item) return;
  if (item.type === 'building' && item.id === 38) return; // Can't buy Capitalization
  const totalCost = getProductionCost(item);
  const buyCost = calcRushBuyCost(item.type, totalCost, city.shieldsInBox || 0);
  const treasury = mpGameState.civs?.[mpCivSlot]?.treasury || 0;

  const itemName = item.type === 'unit' ? UNIT_NAMES[item.id]
    : item.type === 'building' ? IMPROVE_NAMES[item.id]
    : WONDER_NAMES[item.id - 39] || 'Unknown';

  if (buyCost > treasury) {
    showOverlayMessage(`Cannot afford ${itemName} — costs ${buyCost} gold (have ${treasury})`);
    return;
  }
  if (city.shieldsInBox >= totalCost) {
    showOverlayMessage(`${itemName} is already complete`);
    return;
  }

  showConfirmDialog(`Buy ${itemName} for ${buyCost} gold?`, () => {
    sfx('SELL');
    transport.sendRaw({ type: 'ACTION', action: { type: RUSH_BUY, cityIndex } });
  });
}

function showSellBuildingPicker(city, cityIndex) {
  if (!city.buildings || city.buildings.size === 0) return;

  const existing = document.getElementById('production-picker');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'production-picker';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5)';

  const panel = document.createElement('div');
  panel.style.cssText = 'background:#d4b896;border:3px outset #a08060;max-height:70vh;overflow-y:auto;padding:8px;min-width:280px;font:14px "Times New Roman",serif;color:#333';

  const title = document.createElement('div');
  title.textContent = `${city.name} — Sell Building`;
  title.style.cssText = 'font-weight:bold;font-size:16px;margin-bottom:6px;text-align:center';
  panel.appendChild(title);

  const sbRows = [];
  if (city.soldThisTurn) {
    const msg = document.createElement('div');
    msg.textContent = 'Already sold a building this turn.';
    msg.style.cssText = 'text-align:center;color:#800;padding:8px';
    panel.appendChild(msg);
  } else {
    for (const id of city.buildings) {
      if (id === 1) continue; // Can't sell Palace
      if (id >= 35 && id <= 37) continue; // Can't sell SS parts
      const name = IMPROVE_NAMES[id];
      if (!name) continue;
      const refund = IMPROVE_COSTS[id] || 0;

      const row = document.createElement('div');
      row.style.cssText = 'padding:3px 6px;cursor:pointer;display:flex;justify-content:space-between';
      row.onmouseenter = () => { if (!row.classList.contains('pp-highlight')) row.style.background = '#c0a070'; };
      row.onmouseleave = () => { if (!row.classList.contains('pp-highlight')) row.style.background = ''; };

      const label = document.createElement('span');
      label.textContent = name;
      const refundLabel = document.createElement('span');
      refundLabel.textContent = `+${refund} gold`;
      refundLabel.style.color = '#060';
      row.appendChild(label);
      row.appendChild(refundLabel);

      row.addEventListener('click', () => {
        window.removeEventListener('keydown', sbKeyHandler, true);
        overlay.remove();
        showConfirmDialog(`Sell ${name} for ${refund} gold?`, () => {
          sfx('SELL');
          transport.sendRaw({
            type: 'ACTION',
            action: { type: SELL_BUILDING, cityIndex, buildingId: id },
          });
        });
      });
      panel.appendChild(row);
      sbRows.push(row);
    }
  }

  const cancel = document.createElement('div');
  cancel.textContent = 'Cancel';
  cancel.style.cssText = 'text-align:center;padding:6px;margin-top:6px;cursor:pointer;font-weight:bold;border-top:1px solid #a08060';
  cancel.addEventListener('click', () => { window.removeEventListener('keydown', sbKeyHandler, true); overlay.remove(); });
  panel.appendChild(cancel);

  // Arrow key navigation
  let sbHighlight = -1;
  function sbSetHighlight(idx) {
    if (sbHighlight >= 0 && sbHighlight < sbRows.length) {
      sbRows[sbHighlight].style.background = '';
      sbRows[sbHighlight].classList.remove('pp-highlight');
    }
    sbHighlight = idx;
    if (sbHighlight >= 0 && sbHighlight < sbRows.length) {
      sbRows[sbHighlight].style.background = '#c0a070';
      sbRows[sbHighlight].classList.add('pp-highlight');
      sbRows[sbHighlight].scrollIntoView({ block: 'nearest' });
    }
  }
  const sbKeyHandler = e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault(); e.stopPropagation();
      sbSetHighlight(Math.min(sbRows.length - 1, sbHighlight + 1));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault(); e.stopPropagation();
      sbSetHighlight(Math.max(0, sbHighlight - 1));
    } else if (e.key === 'Enter' && sbHighlight >= 0) {
      e.preventDefault(); e.stopPropagation();
      sbRows[sbHighlight].click();
    } else if (e.key === 'Escape') {
      e.preventDefault(); e.stopPropagation();
      window.removeEventListener('keydown', sbKeyHandler, true);
      overlay.remove();
    }
  };
  window.addEventListener('keydown', sbKeyHandler, true);

  overlay.appendChild(panel);
  overlay.addEventListener('click', e => { if (e.target === overlay) { window.removeEventListener('keydown', sbKeyHandler, true); overlay.remove(); } });
  document.body.appendChild(overlay);
}

function showOverlayMessage(msg) {
  const existing = document.getElementById('overlay-msg');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'overlay-msg';
  el.style.cssText = 'position:fixed;top:20%;left:50%;transform:translateX(-50%);z-index:9999;background:#d4b896;border:3px outset #a08060;padding:12px 24px;font:16px "Times New Roman",serif;color:#333;text-align:center';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

function showConfirmDialog(msg, onConfirm) {
  const existing = document.getElementById('confirm-dialog');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'confirm-dialog';
  overlay.className = 'civ2-dialog-overlay';

  const frame = document.createElement('div');
  frame.className = 'civ2-dialog-frame';

  const titlebar = document.createElement('div');
  titlebar.className = 'civ2-dialog-titlebar';
  const titleSpan = document.createElement('span');
  titleSpan.className = 'civ2-dialog-title';
  titleSpan.textContent = 'Confirm';
  titlebar.appendChild(titleSpan);
  frame.appendChild(titlebar);

  const panel = document.createElement('div');
  panel.className = 'civ2-dialog-panel';
  panel.style.cssText += ';text-align:center;padding:12px 16px;font:16px "Times New Roman",serif;color:#333';

  const text = document.createElement('div');
  text.textContent = msg;
  text.style.cssText = 'text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
  panel.appendChild(text);
  frame.appendChild(panel);

  const btnRow = document.createElement('div');
  btnRow.className = 'civ2-dialog-btn-row';

  const yesBtn = document.createElement('button');
  yesBtn.textContent = 'Yes';
  yesBtn.className = 'civ2-btn';
  yesBtn.addEventListener('click', () => { overlay.remove(); window.removeEventListener('keydown', keyHandler, true); onConfirm(); });

  const noBtn = document.createElement('button');
  noBtn.textContent = 'No';
  noBtn.className = 'civ2-btn';
  const dismiss = () => { overlay.remove(); window.removeEventListener('keydown', keyHandler, true); };
  noBtn.addEventListener('click', dismiss);

  btnRow.appendChild(yesBtn);
  btnRow.appendChild(noBtn);
  frame.appendChild(btnRow);
  overlay.appendChild(frame);
  overlay.addEventListener('click', e => { if (e.target === overlay) dismiss(); });

  const keyHandler = e => {
    if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); yesBtn.click(); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); dismiss(); }
  };
  window.addEventListener('keydown', keyHandler, true);

  document.body.appendChild(overlay);
}

function showUnitPresentDialog(unitIndex) {
  const existing = document.getElementById('unit-present-dialog');
  if (existing) existing.remove();

  const unit = mpGameState?.units[unitIndex];
  if (!unit || unit.gx < 0) return;
  const isOwner = unit.owner === mpCivSlot;
  const unitName = UNIT_NAMES[unit.type] || `Unit ${unit.type}`;
  const orderDesc = (unit.orders && unit.orders !== 'none') ? (ORDER_NAMES[unit.orders] || unit.orders) : '';

  const overlay = document.createElement('div');
  overlay.id = 'unit-present-dialog';
  overlay.className = 'civ2-dialog-overlay';

  const frame = document.createElement('div');
  frame.className = 'civ2-dialog-frame';

  // Title bar
  const titlebar = document.createElement('div');
  titlebar.className = 'civ2-dialog-titlebar';
  const titleSpan = document.createElement('span');
  titleSpan.className = 'civ2-dialog-title';
  titleSpan.textContent = 'Unit Information';
  titlebar.appendChild(titleSpan);
  frame.appendChild(titlebar);

  // Panel with unit info header + radio options
  const panel = document.createElement('div');
  panel.className = 'civ2-dialog-panel';

  // Unit header: sprite on left, name on right
  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;gap:10px;padding:6px 4px;margin-bottom:4px;border-bottom:1px solid rgba(0,0,0,0.15)';

  const thumb = renderUnitThumbnail(unit);
  if (thumb) {
    thumb.style.cssText = 'width:64px;height:48px;image-rendering:pixelated';
    header.appendChild(thumb);
  }

  const civName = mpGameState.civNames?.[unit.owner] || `Civ ${unit.owner}`;
  const homeCity = (unit.homeCityId != null && unit.homeCityId !== 0xFFFF && unit.homeCityId !== 0x00FF)
    ? mpGameState.cities?.[unit.homeCityId] : null;
  const infoDiv = document.createElement('div');
  infoDiv.style.cssText = 'font-family:"Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
  const line1 = document.createElement('div');
  line1.style.fontSize = '18px';
  line1.textContent = `${civName} ${unitName}`;
  infoDiv.appendChild(line1);
  const line2 = document.createElement('div');
  line2.style.cssText = 'font-size:14px;margin-top:2px';
  line2.textContent = homeCity ? `Home City: ${homeCity.name}` : 'Home City: NONE';
  infoDiv.appendChild(line2);
  header.appendChild(infoDiv);

  panel.appendChild(header);

  const items = document.createElement('div');
  items.className = 'civ2-dialog-items';

  const options = [
    { id: 'nochange', label: 'No Changes', enabled: true },
    { id: 'wake', label: 'Clear Orders', enabled: isOwner && unit.orders && unit.orders !== 'none' },
    { id: 'sentry', label: 'Sleep', enabled: isOwner },
    { id: 'disband', label: 'Disband', enabled: isOwner },
    { id: 'activate', label: 'Activate Unit', enabled: isOwner },
  ];

  let selected = 'nochange';

  for (const opt of options) {
    const row = document.createElement('label');
    row.className = 'civ2-dialog-radio' + (opt.enabled ? '' : ' disabled');

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'unit-present-action';
    radio.value = opt.id;
    if (opt.id === 'nochange') radio.checked = true;
    radio.addEventListener('change', () => {
      if (!opt.enabled) { radio.checked = false; return; }
      if (radio.checked) selected = opt.id;
    });

    const span = document.createElement('span');
    span.textContent = opt.label;

    row.appendChild(radio);
    row.appendChild(span);
    items.appendChild(row);
  }

  panel.appendChild(items);
  frame.appendChild(panel);

  // Button row
  const btnRow = document.createElement('div');
  btnRow.className = 'civ2-dialog-btn-row';

  const okBtn = document.createElement('button');
  okBtn.textContent = 'OK';
  okBtn.className = 'civ2-btn';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'civ2-btn';

  const dismiss = () => { overlay.remove(); window.removeEventListener('keydown', keyHandler, true); };

  okBtn.addEventListener('click', () => {
    dismiss();
    if (selected === 'nochange') return;
    if (selected === 'wake') {
      transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'wake' } });
    } else if (selected === 'sentry') {
      transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'sentry' } });
    } else if (selected === 'disband') {
      showConfirmDialog(`Disband ${unitName}?`, () => {
        transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'disband' } });
      });
    } else if (selected === 'activate') {
      closeCityDialog();
      selectUnit(unitIndex);
      if (unit.orders && unit.orders !== 'none') {
        transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'wake' } });
      }
    }
  });

  cancelBtn.addEventListener('click', dismiss);

  btnRow.appendChild(okBtn);
  btnRow.appendChild(cancelBtn);
  frame.appendChild(btnRow);
  overlay.appendChild(frame);
  overlay.addEventListener('click', e => { if (e.target === overlay) dismiss(); });

  const keyHandler = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      okBtn.click();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      dismiss();
    }
  };
  window.addEventListener('keydown', keyHandler, true);

  document.body.appendChild(overlay);
}

function showUnitSupportedDialog(unitIndex) {
  const existing = document.getElementById('unit-supported-dialog');
  if (existing) existing.remove();

  const unit = mpGameState?.units[unitIndex];
  if (!unit || unit.gx < 0) return;
  const isOwner = unit.owner === mpCivSlot;
  const unitName = UNIT_NAMES[unit.type] || `Unit ${unit.type}`;
  const civName = mpGameState.civNames?.[unit.owner] || `Civ ${unit.owner}`;
  const displayX = unit.gx * 2 + (unit.gy % 2);
  const displayY = unit.gy;

  // Find city at unit location, or nearest city
  let locationStr;
  const cityAtUnit = mpGameState.cities?.find(c => c.gx === unit.gx && c.gy === unit.gy);
  if (cityAtUnit) {
    locationStr = `Location: ${cityAtUnit.name} (${displayX}, ${displayY})`;
  } else {
    let nearestCity = null;
    let nearestDist = Infinity;
    const mw = currentMapData?.mw || 1;
    for (const c of (mpGameState.cities || [])) {
      if (c.gx < 0) continue;
      let dx = Math.abs(c.gx - unit.gx);
      if (vp.wraps) dx = Math.min(dx, mw - dx);
      const dy = Math.abs(c.gy - unit.gy);
      const dist = dx * dx + dy * dy;
      if (dist < nearestDist) { nearestDist = dist; nearestCity = c; }
    }
    locationStr = nearestCity
      ? `Location: (${displayX}, ${displayY}) (Near ${nearestCity.name})`
      : `Location: (${displayX}, ${displayY})`;
  }

  const overlay = document.createElement('div');
  overlay.id = 'unit-supported-dialog';
  overlay.className = 'civ2-dialog-overlay';

  const frame = document.createElement('div');
  frame.className = 'civ2-dialog-frame';

  // Title bar
  const titlebar = document.createElement('div');
  titlebar.className = 'civ2-dialog-titlebar';
  const titleSpan = document.createElement('span');
  titleSpan.className = 'civ2-dialog-title';
  titleSpan.textContent = 'Unit Information';
  titlebar.appendChild(titleSpan);
  frame.appendChild(titlebar);

  // Panel
  const panel = document.createElement('div');
  panel.className = 'civ2-dialog-panel';

  // Unit header: sprite on left, info on right
  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;gap:10px;padding:6px 4px;margin-bottom:4px;border-bottom:1px solid rgba(0,0,0,0.15)';

  const thumb = renderUnitThumbnail(unit);
  if (thumb) {
    thumb.style.cssText = 'width:64px;height:48px;image-rendering:pixelated';
    header.appendChild(thumb);
  }

  const infoDiv = document.createElement('div');
  infoDiv.style.cssText = 'font-family:"Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
  const line1 = document.createElement('div');
  line1.style.fontSize = '18px';
  line1.textContent = `${civName} ${unitName}`;
  infoDiv.appendChild(line1);
  const line2 = document.createElement('div');
  line2.style.cssText = 'font-size:14px;margin-top:2px';
  line2.textContent = locationStr;
  infoDiv.appendChild(line2);
  header.appendChild(infoDiv);
  panel.appendChild(header);

  // Radio options
  const items = document.createElement('div');
  items.className = 'civ2-dialog-items';

  const options = [
    { id: 'nochange', label: 'No Changes', enabled: true },
    { id: 'center', label: 'Center map on unit', enabled: true },
    { id: 'disband', label: 'Disband Unit', enabled: isOwner },
  ];

  let selected = 'nochange';

  for (const opt of options) {
    const row = document.createElement('label');
    row.className = 'civ2-dialog-radio' + (opt.enabled ? '' : ' disabled');

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'unit-supported-action';
    radio.value = opt.id;
    if (opt.id === 'nochange') radio.checked = true;
    radio.addEventListener('change', () => {
      if (!opt.enabled) { radio.checked = false; return; }
      if (radio.checked) selected = opt.id;
    });

    const span = document.createElement('span');
    span.textContent = opt.label;

    row.appendChild(radio);
    row.appendChild(span);
    items.appendChild(row);
  }

  panel.appendChild(items);
  frame.appendChild(panel);

  // Button row
  const btnRow = document.createElement('div');
  btnRow.className = 'civ2-dialog-btn-row';

  const okBtn = document.createElement('button');
  okBtn.textContent = 'OK';
  okBtn.className = 'civ2-btn';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'civ2-btn';

  const dismiss = () => { overlay.remove(); window.removeEventListener('keydown', keyHandler, true); };

  okBtn.addEventListener('click', () => {
    dismiss();
    if (selected === 'nochange') return;
    if (selected === 'center') {
      closeCityDialog();
      centerOnTile(unit.gx, unit.gy);
    } else if (selected === 'disband') {
      showConfirmDialog(`Disband ${unitName}?`, () => {
        transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'disband' } });
      });
    }
  });

  cancelBtn.addEventListener('click', dismiss);

  btnRow.appendChild(okBtn);
  btnRow.appendChild(cancelBtn);
  frame.appendChild(btnRow);
  overlay.appendChild(frame);
  overlay.addEventListener('click', e => { if (e.target === overlay) dismiss(); });

  const keyHandler = e => {
    if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); okBtn.click(); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); dismiss(); }
  };
  window.addEventListener('keydown', keyHandler, true);

  document.body.appendChild(overlay);
}

/**
 * Compute the next available city name for a civ (client-side mirror of getCityName in reducer).
 */
function getNextCityName(owner) {
  if (!mpGameState) return 'City';
  const rulesNum = mpGameState.civs?.[owner]?.rulesCivNumber ?? 0;
  const nameList = CIV_CITY_NAMES[rulesNum] || CIV_CITY_NAMES[0];
  const ownedNames = new Set(mpGameState.cities.filter(c => c.owner === owner).map(c => c.name));
  for (const name of nameList) {
    if (!ownedNames.has(name)) return name;
  }
  return `City ${mpGameState.cities.filter(c => c.owner === owner).length + 1}`;
}

/**
 * Show "What Shall We Name This City?" dialog before building.
 * On OK: sends BUILD_CITY with chosen name, which triggers showCityFoundedDialog via STATE.
 * On Cancel: does nothing.
 */
function showNameCityDialog(unitIndex) {
  const u = mpGameState.units[unitIndex];
  const defaultName = getNextCityName(u.owner);

  const { overlay, dismiss } = createCiv2Dialog('name-city-dialog', 'What Shall We Name This City?', panel => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:12px 20px;font:16px "Times New Roman",Georgia,serif;color:#333';

    const label = document.createElement('span');
    label.textContent = 'City Name:';
    row.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.value = defaultName;
    input.maxLength = 24;
    input.id = 'name-city-input';
    input.style.cssText = 'flex:1;font:16px "Times New Roman",Georgia,serif;padding:4px 6px;background:#fff;border:2px inset #a08060;color:#333';
    row.appendChild(input);

    panel.appendChild(row);

    // Focus and select input text after dialog is appended
    setTimeout(() => { input.focus(); input.select(); }, 0);
  }, [
    { label: 'Cancel' },
    { label: 'OK', action: () => {
      sfx('BLDCITY');
      transport.sendRaw({
        type: 'ACTION',
        action: { type: BUILD_CITY, unitIndex, name: chosenName || defaultName },
      });
    }},
  ]);

  // Track input value via closure so it survives dialog dismiss
  let chosenName = defaultName;
  const inputEl = document.getElementById('name-city-input');
  if (inputEl) {
    inputEl.addEventListener('input', () => { chosenName = inputEl.value.trim(); });
  }
}

/**
 * Show "Found New City" dialog after city is created (from STATE).
 * Displays farmer/cow artwork and "<City Name> Founded <Date>".
 */
function showCityFoundedDialog(cityName, year, onDismiss) {
  createCiv2Dialog('city-founded-dialog', 'Found New City', panel => {
    const content = document.createElement('div');
    content.style.cssText = 'display:flex;align-items:center;gap:16px;padding:12px 20px';

    // Artwork on the left
    const img = document.createElement('img');
    img.src = 'assets/menu/city-founded.gif';
    img.alt = 'City Founded';
    img.style.cssText = 'width:200px;height:auto;border:2px inset #a08060;flex-shrink:0';
    content.appendChild(img);

    // Text on the right
    const textDiv = document.createElement('div');
    textDiv.style.cssText = 'font-family:"Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
    const nameEl = document.createElement('div');
    nameEl.style.cssText = 'font-size:20px;font-weight:bold;margin-bottom:4px';
    nameEl.textContent = `${cityName} Founded`;
    textDiv.appendChild(nameEl);
    const dateEl = document.createElement('div');
    dateEl.style.cssText = 'font-size:16px';
    dateEl.textContent = year;
    textDiv.appendChild(dateEl);
    content.appendChild(textDiv);

    panel.appendChild(content);
  }, [{ label: 'OK', action: onDismiss }]);
}

/**
 * Create a reusable Civ2-styled dialog.
 * @param {string} id - unique DOM id
 * @param {string} title - titlebar text
 * @param {function} buildContent - (panel) => void, populates the panel
 * @param {Array<{label:string, action:function}>} buttons - button definitions
 * @returns {{ overlay, dismiss }} - DOM element and dismiss function
 */
function createCiv2Dialog(id, title, buildContent, buttons = [{ label: 'OK' }]) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = id;
  overlay.className = 'civ2-dialog-overlay';

  const frame = document.createElement('div');
  frame.className = 'civ2-dialog-frame';

  const titlebar = document.createElement('div');
  titlebar.className = 'civ2-dialog-titlebar';
  const titleSpan = document.createElement('span');
  titleSpan.className = 'civ2-dialog-title';
  titleSpan.textContent = title;
  titlebar.appendChild(titleSpan);
  frame.appendChild(titlebar);

  const panel = document.createElement('div');
  panel.className = 'civ2-dialog-panel';
  buildContent(panel);
  frame.appendChild(panel);

  const dismiss = () => { overlay.remove(); window.removeEventListener('keydown', keyHandler, true); };

  const btnRow = document.createElement('div');
  btnRow.className = 'civ2-dialog-btn-row';
  for (const b of buttons) {
    const btn = document.createElement('button');
    btn.textContent = b.label;
    btn.className = 'civ2-btn';
    btn.addEventListener('click', () => { dismiss(); if (b.action) b.action(); });
    btnRow.appendChild(btn);
  }
  frame.appendChild(btnRow);

  overlay.appendChild(frame);
  overlay.addEventListener('click', e => { if (e.target === overlay) { dismiss(); if (buttons[0]?.action) buttons[0].action(); } });

  const keyHandler = e => {
    if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); dismiss(); if (buttons[buttons.length - 1]?.action) buttons[buttons.length - 1].action(); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); dismiss(); if (buttons[0]?.action) buttons[0].action(); }
    else if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const items = panel.querySelectorAll('[data-selectable]');
      if (items.length === 0) return;
      e.preventDefault(); e.stopPropagation();
      const delta = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1;
      let cur = -1;
      items.forEach((el, i) => { if (el.classList.contains('civ2-selected')) cur = i; });
      const next = Math.max(0, Math.min(items.length - 1, cur + delta));
      if (next !== cur) {
        items.forEach(el => el.classList.remove('civ2-selected'));
        items[next].classList.add('civ2-selected');
        items[next].click();
        items[next].scrollIntoView({ block: 'nearest' });
      }
    }
  };
  window.addEventListener('keydown', keyHandler, true);

  document.body.appendChild(overlay);
  return { overlay, dismiss };
}

/**
 * Show turn events sequentially as Civ2-styled dialogs.
 * Events: cityGrowth, famine, needsAqueduct, needsSewer, productionComplete
 */
function showTurnEvents(events) {
  let i = 0;
  function showNext() {
    if (i >= events.length) return;
    const ev = events[i++];
    switch (ev.type) {
      case 'cityGrowth':
        sfx('CHEERS3');
        createCiv2Dialog('turn-event-dialog', 'City Growth', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `${ev.cityName} has grown to size ${ev.newSize}.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;

      case 'famine':
        sfx('CIVDISOR');
        createCiv2Dialog('turn-event-dialog', 'Famine!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `Famine in ${ev.cityName}! Population shrinks to ${ev.newSize}.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;

      case 'needsAqueduct':
        sfx('AQUEDUCT');
        createCiv2Dialog('turn-event-dialog', 'Aqueduct Needed', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `${ev.cityName} needs an Aqueduct to grow beyond size 8.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;

      case 'needsSewer':
        sfx('AQUEDUCT');
        createCiv2Dialog('turn-event-dialog', 'Sewer System Needed', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `${ev.cityName} needs a Sewer System to grow beyond size 12.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;

      case 'productionComplete': {
        const item = ev.item;
        let itemName;
        if (item.type === 'unit') { itemName = UNIT_NAMES[item.id] || 'Unit'; sfx('BARRACKS'); }
        else if (item.type === 'building') { itemName = IMPROVE_NAMES[item.id] || 'Building'; sfx('CATHEDRL'); }
        else if (item.type === 'wonder') { itemName = WONDER_NAMES[item.id - 39] || 'Wonder'; sfx('NEWONDER'); }
        else itemName = 'Item';

        createCiv2Dialog('turn-event-dialog', 'Production Complete', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `${ev.cityName} has finished ${itemName}.`;
          panel.appendChild(msg);
        }, [{ label: 'Change', action: () => {
          // Open production picker for this city
          const city = mpGameState?.cities?.[ev.cityIndex];
          if (city && city.owner === mpCivSlot) {
            showProductionPicker(city, ev.cityIndex, showNext);
          } else {
            showNext();
          }
        }}, { label: 'OK', action: showNext }]);
        break;
      }

      case 'anarchyEnded': {
        sfx('NEWGOVT');
        const govtName = (ev.government || 'despotism').charAt(0).toUpperCase() + (ev.government || 'despotism').slice(1);
        createCiv2Dialog('turn-event-dialog', 'Order Restored', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `Order has been restored. Your government is now ${govtName}.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'unitCrashed': {
        sfx(getDeathSfx(ev.unitType));
        const uName = UNIT_NAMES[ev.unitType] || 'Unit';
        createCiv2Dialog('turn-event-dialog', 'Unit Lost', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `Your ${uName} has run out of fuel and crashed!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'freeAdvance': {
        sfx('FANFARE1');
        const advName = ADVANCE_NAMES[ev.advanceId] || `Advance ${ev.advanceId}`;
        createCiv2Dialog('turn-event-dialog', ev.source || 'Free Advance', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `You have discovered the secret of ${advName}!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'warDeclared': {
        sfx('NEG1');
        const aggrName = mpGameState?.civNames?.[ev.aggressor] || `Civ ${ev.aggressor}`;
        const targName = mpGameState?.civNames?.[ev.target] || `Civ ${ev.target}`;
        createCiv2Dialog('turn-event-dialog', 'War!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `${aggrName} has declared war on ${targName}!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'treatyAccepted': {
        sfx('POS1');
        const civAName = mpGameState?.civNames?.[ev.civA] || `Civ ${ev.civA}`;
        const civBName = mpGameState?.civNames?.[ev.civB] || `Civ ${ev.civB}`;
        const treatyName = ev.treaty === 'peace' ? 'Peace Treaty' : 'Ceasefire';
        createCiv2Dialog('turn-event-dialog', treatyName, panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `${civAName} and ${civBName} have signed a ${treatyName}.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'tradeEstablished': {
        sfx('MRKTPLCE');
        createCiv2Dialog('turn-event-dialog', 'Trade Route', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.innerHTML = `Trade route: ${ev.homeCityName} → ${ev.destCityName}<br>` +
            `Revenue: ${ev.income} gold/turn<br>Bonus: ${ev.bonus} gold`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'civEliminated': {
        sfx('GUILLOTN');
        const civName = mpGameState?.civNames?.[ev.civSlot] || `Civilization ${ev.civSlot}`;
        const isMe = ev.civSlot === mpCivSlot;
        const title = isMe ? 'Defeat!' : 'Civilization Destroyed';
        const text = isMe
          ? 'Your civilization has been destroyed!'
          : `The ${civName} have been destroyed!`;
        createCiv2Dialog('turn-event-dialog', title, panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = text;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'unitBribed': {
        sfx('SPYSOUND');
        const uName = UNIT_NAMES[ev.unitType] || 'Unit';
        createCiv2Dialog('turn-event-dialog', 'Bribery', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `${uName} bribed for ${ev.cost} gold.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'techStolen': {
        sfx('SPYSOUND');
        const advName = ADVANCE_NAMES[ev.advanceId] || `Advance ${ev.advanceId}`;
        const fromName = mpGameState?.civNames?.[ev.from] || `Civ ${ev.from}`;
        createCiv2Dialog('turn-event-dialog', 'Espionage', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `Stole ${advName} from the ${fromName}!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'citySabotaged': {
        sfx('SPYSOUND');
        const detail = ev.buildingId != null
          ? `Building destroyed in ${ev.cityName}!`
          : `Production sabotaged in ${ev.cityName}!`;
        createCiv2Dialog('turn-event-dialog', 'Sabotage', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = detail;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'cityIncited': {
        sfx('CIVDISOR');
        const fromName = mpGameState?.civNames?.[ev.from] || `Civ ${ev.from}`;
        createCiv2Dialog('turn-event-dialog', 'Revolt!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `${ev.cityName} revolts against the ${fromName}!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'tributePaid': {
        sfx('SELL');
        const payerName = mpGameState?.civNames?.[ev.from] || `Civ ${ev.from}`;
        const receiverName = mpGameState?.civNames?.[ev.to] || `Civ ${ev.to}`;
        createCiv2Dialog('turn-event-dialog', 'Tribute', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `${payerName} paid ${ev.amount} gold in tribute to ${receiverName}.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'mapShared': {
        sfx('POS1');
        const shareName = mpGameState?.civNames?.[ev.targetCiv] || `Civ ${ev.targetCiv}`;
        createCiv2Dialog('turn-event-dialog', 'Map Exchange', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `Maps exchanged with the ${shareName}.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'unitDisbanded': {
        sfx('SMALLEXP');
        const uName = UNIT_NAMES[ev.unitType] || 'Unit';
        createCiv2Dialog('turn-event-dialog', 'Unit Disbanded', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `${uName} from ${ev.cityName} disbanded due to insufficient support.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      default:
        showNext();
    }
  }
  // Delay slightly so the re-render finishes first
  setTimeout(showNext, 200);
}

function showRateSliders() {
  const existing = document.getElementById('rate-sliders');
  if (existing) existing.remove();

  if (!mpGameState || !mpCivSlot) return;
  const civ = mpGameState.civs?.[mpCivSlot];
  if (!civ) return;

  const govt = civ.government || 'despotism';
  const maxRate = GOVT_MAX_RATE[govt] ?? 10;
  const maxSci = GOVT_MAX_SCIENCE[govt] ?? 10;

  let sciRate = Math.min(civ.scienceRate ?? 5, maxSci);
  let taxRate = Math.min(civ.taxRate ?? 5, maxRate);
  if (sciRate + taxRate > 10) taxRate = 10 - sciRate;
  let luxRate = 10 - sciRate - taxRate;

  const overlay = document.createElement('div');
  overlay.id = 'rate-sliders';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5)';

  const panel = document.createElement('div');
  panel.style.cssText = 'background:#d4b896;border:3px outset #a08060;padding:16px 24px;font:14px "Times New Roman",serif;color:#333;min-width:300px';

  const title = document.createElement('div');
  title.textContent = 'Tax Rates';
  title.style.cssText = 'font-weight:bold;font-size:16px;margin-bottom:8px;text-align:center';
  panel.appendChild(title);

  const updateLabels = () => {
    sciSlider.value = sciRate;
    taxSlider.value = taxRate;
    luxSlider.value = luxRate;
    sciLabel.textContent = `Science: ${sciRate * 10}%`;
    taxLabel.textContent = `Tax: ${taxRate * 10}%`;
    luxLabel.textContent = `Luxury: ${luxRate * 10}%`;
  };

  const makeRow = (label, value, cap, onChange) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:8px;margin:4px 0';
    const lbl = document.createElement('span');
    lbl.style.width = '100px';
    const sliderWrap = document.createElement('div');
    sliderWrap.style.cssText = 'flex:1;position:relative';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0; slider.max = 10; slider.step = 1;
    slider.value = value;
    slider.style.cssText = 'width:100%;position:relative;z-index:1';
    if (cap < 10) {
      const pct = cap * 10;
      slider.style.background = `linear-gradient(to right, #b8a070 0%, #b8a070 ${pct}%, #888 ${pct}%, #888 100%)`;
    }
    slider.addEventListener('input', () => {
      let v = parseInt(slider.value);
      if (v > cap) { v = cap; slider.value = v; }
      onChange(v);
    });
    sliderWrap.appendChild(slider);
    row.appendChild(lbl);
    row.appendChild(sliderWrap);
    panel.appendChild(row);
    return { label: lbl, slider };
  };

  // When one slider moves, adjust the other two so total = 10.
  // Priority: shrink the "next" slider first, then the third.
  // If freeing points (slider lowered), grow the "next" slider first.
  const reconcile = (moved) => {
    const total = sciRate + taxRate + luxRate;
    if (total === 10) return;
    const diff = total - 10; // positive = over, negative = under
    // Order of adjustment: cycle sci→tax→lux→sci
    const order = moved === 'sci' ? ['tax', 'lux'] :
                  moved === 'tax' ? ['lux', 'sci'] : ['sci', 'tax'];
    const caps = { sci: maxSci, tax: maxRate, lux: maxRate };
    const get = k => k === 'sci' ? sciRate : k === 'tax' ? taxRate : luxRate;
    const set = (k, v) => { if (k === 'sci') sciRate = v; else if (k === 'tax') taxRate = v; else luxRate = v; };
    let rem = diff;
    for (const k of order) {
      if (rem === 0) break;
      const cur = get(k);
      if (rem > 0) {
        // Over 10 — shrink this slider
        const shrink = Math.min(rem, cur);
        set(k, cur - shrink);
        rem -= shrink;
      } else {
        // Under 10 — grow this slider (up to its cap)
        const grow = Math.min(-rem, caps[k] - cur);
        set(k, cur + grow);
        rem += grow;
      }
    }
  };

  const sci = makeRow('Science', sciRate, maxSci, v => {
    sciRate = v;
    reconcile('sci');
    updateLabels();
  });
  const sciLabel = sci.label;
  const sciSlider = sci.slider;

  const tax = makeRow('Tax', taxRate, maxRate, v => {
    taxRate = v;
    reconcile('tax');
    updateLabels();
  });
  const taxLabel = tax.label;
  const taxSlider = tax.slider;

  const lux = makeRow('Luxury', luxRate, maxRate, v => {
    luxRate = v;
    reconcile('lux');
    updateLabels();
  });
  const luxLabel = lux.label;
  const luxSlider = lux.slider;

  updateLabels();

  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:12px;justify-content:center;margin-top:8px';

  const okBtn = document.createElement('button');
  okBtn.textContent = 'OK';
  okBtn.className = 'civ2-btn';
  okBtn.style.cssText = 'padding:4px 16px;cursor:pointer';
  okBtn.addEventListener('click', () => {
    overlay.remove();
    transport.sendRaw({
      type: 'ACTION',
      action: { type: CHANGE_RATES, scienceRate: sciRate, taxRate: taxRate },
    });
  });

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'civ2-btn';
  cancelBtn.style.cssText = 'padding:4px 16px;cursor:pointer';
  cancelBtn.addEventListener('click', () => overlay.remove());

  btnRow.appendChild(okBtn);
  btnRow.appendChild(cancelBtn);
  panel.appendChild(btnRow);
  overlay.appendChild(panel);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ── Tech tree viewer (F6) ──
function showTechTree() {
  if (!mpGameState || mpCivSlot == null) return;
  const civTechs = mpGameState.civTechs?.[mpCivSlot] || new Set();

  // Group advances into eras by counting prerequisites depth
  const eraCache = {};
  function getEra(id) {
    if (eraCache[id] != null) return eraCache[id];
    const [p1, p2] = ADVANCE_PREREQS[id];
    if (p1 < 0 && p2 < 0) return (eraCache[id] = 0);
    let d = 0;
    if (p1 >= 0) d = Math.max(d, getEra(p1) + 1);
    if (p2 >= 0) d = Math.max(d, getEra(p2) + 1);
    return (eraCache[id] = d);
  }

  // Cache era values
  const eras = [];
  for (let i = 0; i < ADVANCE_NAMES.length; i++) {
    const [p1, p2] = ADVANCE_PREREQS[i];
    if (p1 === -2 || p2 === -2) continue; // unresearchable
    eras.push({ id: i, name: ADVANCE_NAMES[i], era: getEra(i) });
  }

  // Group by era
  const eraGroups = {};
  for (const a of eras) {
    if (!eraGroups[a.era]) eraGroups[a.era] = [];
    eraGroups[a.era].push(a);
  }
  const eraNames = ['Ancient', 'Classical', 'Medieval', 'Renaissance', 'Industrial', 'Modern', 'Future'];

  createCiv2Dialog('tech-tree', 'Technology Tree', panel => {
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '320px';

    const sortedEras = Object.keys(eraGroups).map(Number).sort((a, b) => a - b);
    for (const eraNum of sortedEras) {
      const group = eraGroups[eraNum];
      const eraLabel = eraNames[Math.min(eraNum, eraNames.length - 1)] || `Era ${eraNum}`;

      const header = document.createElement('div');
      header.className = 'tech-tree-era';
      header.textContent = eraLabel;
      panel.appendChild(header);

      for (const a of group.sort((x, y) => x.name.localeCompare(y.name))) {
        const row = document.createElement('div');
        row.className = 'tech-tree-row';
        const has = civTechs.has(a.id);
        if (has) row.classList.add('researched');

        const marker = document.createElement('span');
        marker.className = 'tech-tree-marker';
        marker.textContent = has ? '\u2713' : '\u00B7';
        row.appendChild(marker);

        const name = document.createElement('span');
        name.className = 'tech-tree-name';
        name.textContent = a.name;
        row.appendChild(name);

        // Show prereqs on hover
        const [p1, p2] = ADVANCE_PREREQS[a.id];
        const prereqs = [];
        if (p1 >= 0) prereqs.push(ADVANCE_NAMES[p1]);
        if (p2 >= 0) prereqs.push(ADVANCE_NAMES[p2]);
        if (prereqs.length > 0) {
          row.title = `Requires: ${prereqs.join(', ')}`;
        }

        panel.appendChild(row);
      }
    }
  }, [{ label: 'Close' }]);
}

// ── Revolution dialog (Shift+G) ──
function showRevolutionDialog() {
  if (!mpGameState || mpCivSlot == null) return;
  const civ = mpGameState.civs?.[mpCivSlot];
  if (!civ) return;
  if (civ.government === 'anarchy') {
    showOverlayMessage('Revolution already in progress');
    return;
  }

  const civTechs = mpGameState.civTechs?.[mpCivSlot] || new Set();
  const currentGovt = civ.government || 'despotism';

  // Build list of available governments
  const available = GOVERNMENT_KEYS.filter(g => {
    if (g === 'anarchy') return false;
    if (g === currentGovt) return false;
    const prereq = GOVT_TECH_PREREQS[g] ?? -1;
    return prereq < 0 || civTechs.has(prereq);
  });

  if (available.length === 0) {
    showOverlayMessage('No other government forms available');
    return;
  }

  let selectedGovt = available[0];

  createCiv2Dialog('revolution-dialog', 'Revolution!', panel => {
    panel.style.minWidth = '280px';

    const desc = document.createElement('div');
    desc.style.cssText = 'margin-bottom: 10px; font-size: 13px;';
    desc.textContent = `Current: ${currentGovt.charAt(0).toUpperCase() + currentGovt.slice(1)}. Choose new government:`;
    panel.appendChild(desc);

    for (const g of available) {
      const row = document.createElement('label');
      row.style.cssText = 'display: block; padding: 3px 0; cursor: pointer; font-size: 14px;';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'revolution-govt';
      radio.value = g;
      if (g === selectedGovt) radio.checked = true;
      radio.addEventListener('change', () => { selectedGovt = g; });
      row.appendChild(radio);
      row.append(' ' + g.charAt(0).toUpperCase() + g.slice(1));
      panel.appendChild(row);
    }

    const warn = document.createElement('div');
    warn.style.cssText = 'margin-top: 10px; font-size: 11px; color: #883;';
    warn.textContent = 'Your civilization will enter 1-4 turns of anarchy.';
    panel.appendChild(warn);
  }, [
    { label: 'Cancel' },
    { label: 'Revolt!', action: () => {
      sfx('GUILLOTN');
      transport.sendRaw({
        type: 'ACTION',
        action: { type: REVOLUTION, government: selectedGovt },
      });
    }},
  ]);
}

// ── Diplomacy panel ──
function showDiplomacyPanel() {
  if (!mpGameState || mpCivSlot == null) return;

  createCiv2Dialog('diplomacy-dialog', 'Foreign Affairs', panel => {
    panel.style.minWidth = '320px';
    for (let c = 1; c < 8; c++) {
      if (c === mpCivSlot || !(mpGameState.civsAlive & (1 << c))) continue;
      const name = mpGameState.civNames?.[c] || `Civ ${c}`;
      const key = mpCivSlot < c ? `${mpCivSlot}-${c}` : `${c}-${mpCivSlot}`;
      const treaty = mpGameState.treaties?.[key] || 'war';

      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:4px 0;border-bottom:1px solid #c4a876;font:13px "Times New Roman",serif';

      const label = document.createElement('span');
      label.textContent = `${name}: ${treaty.charAt(0).toUpperCase() + treaty.slice(1)}`;
      label.style.color = treaty === 'war' ? '#a33' : '#3a3';
      row.appendChild(label);

      const btnGroup = document.createElement('span');
      btnGroup.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap';
      if (treaty === 'war') {
        const btn = document.createElement('button');
        btn.textContent = 'Propose Peace';
        btn.className = 'civ2-btn';
        btn.style.cssText = 'font-size:11px;padding:2px 8px';
        btn.onclick = () => {
          transport.sendRaw({ type: 'ACTION', action: { type: PROPOSE_TREATY, targetCiv: c, treaty: 'peace' } });
          document.getElementById('diplomacy-dialog')?.remove();
          showOverlayMessage(`Peace proposal sent to ${name}`);
        };
        btnGroup.appendChild(btn);
      } else {
        const warBtn = document.createElement('button');
        warBtn.textContent = 'Declare War';
        warBtn.className = 'civ2-btn';
        warBtn.style.cssText = 'font-size:11px;padding:2px 8px';
        warBtn.onclick = () => {
          transport.sendRaw({ type: 'ACTION', action: { type: DECLARE_WAR, targetCiv: c } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        btnGroup.appendChild(warBtn);
        // Share Map (only at peace)
        const mapBtn = document.createElement('button');
        mapBtn.textContent = 'Share Map';
        mapBtn.className = 'civ2-btn';
        mapBtn.style.cssText = 'font-size:11px;padding:2px 8px';
        mapBtn.onclick = () => {
          transport.sendRaw({ type: 'ACTION', action: { type: SHARE_MAP, targetCiv: c } });
          document.getElementById('diplomacy-dialog')?.remove();
          showOverlayMessage(`Maps exchanged with ${name}`);
        };
        btnGroup.appendChild(mapBtn);
      }
      // Demand Tribute (always available)
      const demandBtn = document.createElement('button');
      demandBtn.textContent = 'Demand Tribute';
      demandBtn.className = 'civ2-btn';
      demandBtn.style.cssText = 'font-size:11px;padding:2px 8px';
      demandBtn.onclick = () => {
        document.getElementById('diplomacy-dialog')?.remove();
        showTributeDemandInput(c, name);
      };
      btnGroup.appendChild(demandBtn);
      row.appendChild(btnGroup);
      panel.appendChild(row);
    }

    // Show pending proposals TO us
    const proposals = mpGameState.treatyProposals || [];
    const pending = proposals.filter((p, i) => p.to === mpCivSlot && !p.resolved);
    if (pending.length > 0) {
      const hdr = document.createElement('div');
      hdr.style.cssText = 'margin-top:12px;font-weight:bold;font-size:14px;color:#333';
      hdr.textContent = 'Pending Proposals:';
      panel.appendChild(hdr);
      for (const p of pending) {
        const pi = proposals.indexOf(p);
        const fromName = mpGameState.civNames?.[p.from] || `Civ ${p.from}`;
        const pRow = document.createElement('div');
        pRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:4px 0;font:13px "Times New Roman",serif';
        pRow.innerHTML = `<span>${fromName} offers ${p.treaty}</span>`;
        const btns = document.createElement('span');
        const accBtn = document.createElement('button');
        accBtn.textContent = 'Accept';
        accBtn.className = 'civ2-btn';
        accBtn.style.cssText = 'font-size:11px;padding:2px 8px;margin-right:4px';
        accBtn.onclick = () => {
          sfx('POS1');
          transport.sendRaw({ type: 'ACTION', action: { type: RESPOND_TREATY, proposalIndex: pi, accept: true } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        const rejBtn = document.createElement('button');
        rejBtn.textContent = 'Reject';
        rejBtn.className = 'civ2-btn';
        rejBtn.style.cssText = 'font-size:11px;padding:2px 8px';
        rejBtn.onclick = () => {
          sfx('NEG1');
          transport.sendRaw({ type: 'ACTION', action: { type: RESPOND_TREATY, proposalIndex: pi, accept: false } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        btns.appendChild(accBtn);
        btns.appendChild(rejBtn);
        pRow.appendChild(btns);
        panel.appendChild(pRow);
      }
    }

    // Show pending tribute demands TO us
    const demands = mpGameState.tributeDemands || [];
    const pendingDemands = demands.filter(d => d.to === mpCivSlot && !d.resolved);
    if (pendingDemands.length > 0) {
      const hdr = document.createElement('div');
      hdr.style.cssText = 'margin-top:12px;font-weight:bold;font-size:14px;color:#333';
      hdr.textContent = 'Tribute Demands:';
      panel.appendChild(hdr);
      for (const d of pendingDemands) {
        const di = demands.indexOf(d);
        const fromName = mpGameState.civNames?.[d.from] || `Civ ${d.from}`;
        const dRow = document.createElement('div');
        dRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:4px 0;font:13px "Times New Roman",serif';
        dRow.innerHTML = `<span>${fromName} demands ${d.amount} gold</span>`;
        const btns = document.createElement('span');
        const payBtn = document.createElement('button');
        payBtn.textContent = 'Pay';
        payBtn.className = 'civ2-btn';
        payBtn.style.cssText = 'font-size:11px;padding:2px 8px;margin-right:4px';
        payBtn.onclick = () => {
          transport.sendRaw({ type: 'ACTION', action: { type: RESPOND_DEMAND, demandIndex: di, accept: true } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        const refBtn = document.createElement('button');
        refBtn.textContent = 'Refuse';
        refBtn.className = 'civ2-btn';
        refBtn.style.cssText = 'font-size:11px;padding:2px 8px';
        refBtn.onclick = () => {
          transport.sendRaw({ type: 'ACTION', action: { type: RESPOND_DEMAND, demandIndex: di, accept: false } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        btns.appendChild(payBtn);
        btns.appendChild(refBtn);
        dRow.appendChild(btns);
        panel.appendChild(dRow);
      }
    }
  }, [{ label: 'Close' }]);
}

/** Prompt for tribute amount to demand. */
function showTributeDemandInput(targetCiv, targetName) {
  createCiv2Dialog('tribute-dialog', 'Demand Tribute', panel => {
    const msg = document.createElement('div');
    msg.textContent = `How much gold to demand from ${targetName}?`;
    panel.appendChild(msg);
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = '1000';
    input.value = '50';
    input.style.cssText = 'width:80px;margin:8px 0;font:14px "Times New Roman",serif;padding:4px';
    panel.appendChild(input);
  }, [
    { label: 'Demand', action: () => {
      const el = document.querySelector('#tribute-dialog input');
      const amount = parseInt(el?.value) || 50;
      transport.sendRaw({ type: 'ACTION', action: { type: DEMAND_TRIBUTE, targetCiv, amount: Math.min(1000, Math.max(1, amount)) } });
      showOverlayMessage(`Tribute demand sent to ${targetName}`);
    }},
    { label: 'Cancel' },
  ]);
}

// ── Research picker ──

// Lazily extract advance category icons and stone tile from ICONS.GIF
async function _ensureResearchIcons() {
  if (_researchIconCache) return _researchIconCache;
  if (!files.icons) return null;
  const img = await Civ2Renderer.loadImage(files.icons);
  const ctx = Civ2Renderer.imgToCtx(img);
  const CK = [[255, 0, 255, 15], [255, 159, 163, 15]];

  // Extract 20 advance category icons (36x20 each, 5 rows x 4 cols at (343,211))
  const icons = [];
  for (let idx = 0; idx < 20; idx++) {
    const sx = 343 + 37 * (idx % 4);
    const sy = 211 + 21 * Math.floor(idx / 4);
    icons.push(Civ2Renderer.extractSprite(ctx, sx, sy, 36, 20, CK, false));
  }

  // Extract stone tile (64x32 at (199,322)) and convert to data URL for CSS tiling
  const stoneTile = Civ2Renderer.extractSprite(ctx, 199, 322, 64, 32, [], false);
  const stoneDataUrl = stoneTile.toDataURL();

  _researchIconCache = { icons, stoneDataUrl };
  return _researchIconCache;
}

function showResearchPicker(discovered) {
  if (!mpGameState || mpCivSlot == null) return;
  const available = getAvailableResearch(mpGameState, mpCivSlot);
  if (available.length === 0) {
    showOverlayMessage('No technologies available to research');
    return;
  }

  available.sort((a, b) => ADVANCE_NAMES[a].localeCompare(ADVANCE_NAMES[b]));
  let selected = available[0];

  const title = 'What discovery shall our wise men pursue?';

  createCiv2Dialog('research-picker', title, panel => {
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '340px';
    panel.style.background = '#c0c0c0';

    // Show discovery message if a tech was just discovered
    if (discovered != null) {
      const disc = document.createElement('div');
      disc.style.cssText = 'text-align:center;padding:6px 12px 8px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);border-bottom:1px solid rgba(0,0,0,0.15);margin-bottom:6px';
      disc.textContent = `You have discovered ${ADVANCE_NAMES[discovered]}!`;
      panel.appendChild(disc);
    }

    // Container for tech rows
    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:2px';

    // Load icons asynchronously if available
    _ensureResearchIcons().then(cache => {
      if (!cache) return;

      // Insert icon canvases into rows
      const rows = list.querySelectorAll('.rp-row');
      rows.forEach((row, i) => {
        const advId = parseInt(row.dataset.advId);
        const iconIdx = advId % 20;
        const iconCanvas = cache.icons[iconIdx];
        const img = document.createElement('canvas');
        img.width = 36; img.height = 20;
        img.getContext('2d').drawImage(iconCanvas, 0, 0);
        img.style.cssText = 'flex-shrink:0;image-rendering:pixelated';
        // Insert icon before the text span
        const placeholder = row.querySelector('.rp-icon-slot');
        if (placeholder) placeholder.replaceWith(img);
      });
    });

    available.forEach((advId, i) => {
      const row = document.createElement('div');
      row.className = 'rp-row';
      row.dataset.advId = advId;
      row.dataset.selectable = '1';
      const isOdd = i % 2 === 1;
      row.style.cssText = `display:flex;align-items:center;gap:8px;padding:4px 8px;cursor:pointer;border-radius:2px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);margin-left:${isOdd ? '44px' : '0'}`;

      // Placeholder for icon (replaced once icons load)
      const iconSlot = document.createElement('div');
      iconSlot.className = 'rp-icon-slot';
      iconSlot.style.cssText = 'width:36px;height:20px;flex-shrink:0';
      row.appendChild(iconSlot);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = ADVANCE_NAMES[advId];
      row.appendChild(nameSpan);

      // Highlight selected
      if (advId === selected) {
        row.style.background = 'rgba(0,0,80,0.25)';
        row.classList.add('civ2-selected');
      }

      row.addEventListener('click', () => {
        selected = advId;
        // Update highlights
        list.querySelectorAll('.rp-row').forEach(r => {
          const isSel = parseInt(r.dataset.advId) === selected;
          r.style.background = isSel ? 'rgba(0,0,80,0.25)' : '';
          r.classList.toggle('civ2-selected', isSel);
        });
      });

      row.addEventListener('mouseenter', () => {
        if (parseInt(row.dataset.advId) !== selected) {
          row.style.background = 'rgba(255,255,255,0.12)';
        }
      });
      row.addEventListener('mouseleave', () => {
        row.style.background = parseInt(row.dataset.advId) === selected
          ? 'rgba(0,0,80,0.25)' : '';
      });

      list.appendChild(row);
    });

    panel.appendChild(list);
  }, [
    { label: 'Help', action: () => showTechTree() },
    { label: 'Goal', action: () => showGoalPicker() },
    { label: 'OK', action: () => {
      transport.sendRaw({ type: 'ACTION', action: { type: SET_RESEARCH, advanceId: selected } });
    }},
  ]);
}

// ═══════════════════════════════════════════════════════════════════
// Tech prerequisite path — BFS from goal back through ADVANCE_PREREQS
// Returns ordered array of advance IDs the civ still needs to reach goalId
// ═══════════════════════════════════════════════════════════════════
function getPrereqPath(goalId, civTechs) {
  if (civTechs.has(goalId)) return [];
  // Collect all missing prereqs via DFS
  const needed = new Set();
  const visited = new Set();
  function walk(id) {
    if (id < 0 || visited.has(id)) return;
    visited.add(id);
    if (civTechs.has(id)) return; // already known
    const [p1, p2] = ADVANCE_PREREQS[id] || [-1, -1];
    if (p1 === -2 || p2 === -2) return; // unresearchable
    if (p1 >= 0) walk(p1);
    if (p2 >= 0) walk(p2);
    needed.add(id);
  }
  walk(goalId);
  // Topological sort: techs whose prereqs are all met come first
  const sorted = [];
  const remaining = new Set(needed);
  while (remaining.size > 0) {
    let progress = false;
    for (const id of remaining) {
      const [p1, p2] = ADVANCE_PREREQS[id] || [-1, -1];
      const p1ok = p1 < 0 || civTechs.has(p1) || sorted.includes(p1);
      const p2ok = p2 < 0 || civTechs.has(p2) || sorted.includes(p2);
      if (p1ok && p2ok) {
        sorted.push(id);
        remaining.delete(id);
        progress = true;
      }
    }
    if (!progress) { // cycle guard — shouldn't happen with valid data
      for (const id of remaining) sorted.push(id);
      break;
    }
  }
  return sorted;
}

// ═══════════════════════════════════════════════════════════════════
// GOAL PICKER — select a goal tech, show prerequisite path
// ═══════════════════════════════════════════════════════════════════
function showGoalPicker() {
  if (!mpGameState || mpCivSlot == null) return;
  const civTechs = mpGameState.civTechs?.[mpCivSlot] || new Set();

  // All techs that are NOT yet discovered and ARE reachable
  const allGoals = [];
  for (let i = 0; i < ADVANCE_NAMES.length; i++) {
    if (civTechs.has(i)) continue;
    const [p1, p2] = ADVANCE_PREREQS[i] || [-1, -1];
    if (p1 === -2 || p2 === -2) continue;
    allGoals.push(i);
  }
  allGoals.sort((a, b) => ADVANCE_NAMES[a].localeCompare(ADVANCE_NAMES[b]));

  let goalSelected = allGoals[0];

  createCiv2Dialog('goal-picker', 'Select a Goal Technology', panel => {
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '340px';
    panel.style.background = '#c0c0c0';

    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:2px';

    allGoals.forEach((advId, i) => {
      const row = document.createElement('div');
      row.dataset.selectable = '1';
      row.dataset.advId = advId;
      const isOdd = i % 2 === 1;
      row.style.cssText = `display:flex;align-items:center;gap:8px;padding:4px 8px;cursor:pointer;border-radius:2px;font:16px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);margin-left:${isOdd ? '44px' : '0'}`;

      const nameSpan = document.createElement('span');
      nameSpan.textContent = ADVANCE_NAMES[advId];
      row.appendChild(nameSpan);

      // Show step count
      const path = getPrereqPath(advId, civTechs);
      const steps = document.createElement('span');
      steps.style.cssText = 'margin-left:auto;font-size:13px;color:#666';
      steps.textContent = path.length === 1 ? '(1 step)' : `(${path.length} steps)`;
      row.appendChild(steps);

      if (advId === goalSelected) {
        row.style.background = 'rgba(0,0,80,0.25)';
        row.classList.add('civ2-selected');
      }

      row.addEventListener('click', () => {
        goalSelected = advId;
        list.querySelectorAll('[data-selectable]').forEach(r => {
          const isSel = parseInt(r.dataset.advId) === goalSelected;
          r.style.background = isSel ? 'rgba(0,0,80,0.25)' : '';
          r.classList.toggle('civ2-selected', isSel);
        });
      });
      row.addEventListener('mouseenter', () => {
        if (parseInt(row.dataset.advId) !== goalSelected)
          row.style.background = 'rgba(255,255,255,0.12)';
      });
      row.addEventListener('mouseleave', () => {
        row.style.background = parseInt(row.dataset.advId) === goalSelected
          ? 'rgba(0,0,80,0.25)' : '';
      });

      list.appendChild(row);
    });

    panel.appendChild(list);
  }, [
    { label: 'Cancel' },
    { label: 'OK', action: () => showGoalPath(goalSelected) },
  ]);
}

function showGoalPath(goalId) {
  if (!mpGameState || mpCivSlot == null) return;
  const civTechs = mpGameState.civTechs?.[mpCivSlot] || new Set();
  const path = getPrereqPath(goalId, civTechs);

  if (path.length === 0) {
    showOverlayMessage('You already have all prerequisites!');
    showResearchPicker();
    return;
  }

  createCiv2Dialog('goal-path', `Path to ${ADVANCE_NAMES[goalId]}`, panel => {
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '340px';
    panel.style.background = '#c0c0c0';

    const intro = document.createElement('div');
    intro.style.cssText = 'text-align:center;padding:6px 12px 8px;font:16px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);border-bottom:1px solid rgba(0,0,0,0.15);margin-bottom:6px';
    intro.textContent = `${path.length} advance${path.length > 1 ? 's' : ''} needed:`;
    panel.appendChild(intro);

    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:2px';

    path.forEach((advId, i) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 8px;font:16px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';

      const num = document.createElement('span');
      num.style.cssText = 'min-width:24px;text-align:right;font-weight:bold;color:#555';
      num.textContent = `${i + 1}.`;
      row.appendChild(num);

      const name = document.createElement('span');
      name.textContent = ADVANCE_NAMES[advId];
      // Highlight the goal tech
      if (advId === goalId) name.style.fontWeight = 'bold';
      row.appendChild(name);

      // Show prereqs in parentheses
      const [p1, p2] = ADVANCE_PREREQS[advId] || [-1, -1];
      const prereqNames = [];
      if (p1 >= 0) prereqNames.push(ADVANCE_NAMES[p1]);
      if (p2 >= 0) prereqNames.push(ADVANCE_NAMES[p2]);
      if (prereqNames.length > 0) {
        const pSpan = document.createElement('span');
        pSpan.style.cssText = 'margin-left:auto;font-size:12px;color:#666';
        pSpan.textContent = `(${prereqNames.join(', ')})`;
        row.appendChild(pSpan);
      }

      list.appendChild(row);
    });

    panel.appendChild(list);
  }, [
    { label: 'Back', action: () => showGoalPicker() },
    { label: 'Research', action: () => {
      // Set research to the first tech in the path
      transport.sendRaw({ type: 'ACTION', action: { type: SET_RESEARCH, advanceId: path[0] } });
    }},
  ]);
}

// ═══════════════════════════════════════════════════════════════════
// TECH TREE DIALOG — full tech tree with clickable entries
// ═══════════════════════════════════════════════════════════════════
function showTechTree() {
  if (!mpGameState || mpCivSlot == null) return;
  const civTechs = mpGameState.civTechs?.[mpCivSlot] || new Set();

  // Build reverse lookup: tech → what it enables
  const techEnablesUnits = {};
  const techEnablesBuildings = {};
  const techEnablesWonders = {};
  const techEnablesGovts = {};
  const techObsoletesUnits = {};
  const techObsoletesWonders = {};

  for (let i = 0; i < UNIT_PREREQS.length; i++) {
    const t = UNIT_PREREQS[i];
    if (t >= 0) { (techEnablesUnits[t] = techEnablesUnits[t] || []).push(i); }
  }
  for (let i = 0; i < IMPROVE_PREREQS.length; i++) {
    const t = IMPROVE_PREREQS[i];
    if (t >= 0) { (techEnablesBuildings[t] = techEnablesBuildings[t] || []).push(i); }
  }
  for (let i = 0; i < WONDER_PREREQS.length; i++) {
    const t = WONDER_PREREQS[i];
    if (t >= 0) { (techEnablesWonders[t] = techEnablesWonders[t] || []).push(i); }
  }
  for (const [govt, techId] of Object.entries(GOVT_TECH_PREREQS)) {
    if (techId >= 0) { (techEnablesGovts[techId] = techEnablesGovts[techId] || []).push(govt); }
  }
  for (let i = 0; i < (UNIT_OBSOLETE?.length || 0); i++) {
    const t = UNIT_OBSOLETE[i];
    if (t >= 0) { (techObsoletesUnits[t] = techObsoletesUnits[t] || []).push(i); }
  }
  for (let i = 0; i < (WONDER_OBSOLETE?.length || 0); i++) {
    const t = WONDER_OBSOLETE[i];
    if (t >= 0) { (techObsoletesWonders[t] = techObsoletesWonders[t] || []).push(i); }
  }

  // Sort techs alphabetically
  const allTechs = [];
  for (let i = 0; i < ADVANCE_NAMES.length; i++) {
    const [p1, p2] = ADVANCE_PREREQS[i] || [-1, -1];
    if (p1 === -2 && p2 === -2) continue; // skip unresearchable
    allTechs.push(i);
  }
  allTechs.sort((a, b) => ADVANCE_NAMES[a].localeCompare(ADVANCE_NAMES[b]));

  createCiv2Dialog('tech-tree', 'Technology Advisor', panel => {
    panel.style.maxHeight = '70vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '420px';
    panel.style.maxWidth = '600px';
    panel.style.background = '#c0c0c0';

    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:1px';

    allTechs.forEach(advId => {
      const known = civTechs.has(advId);
      const row = document.createElement('div');
      row.dataset.selectable = '1';
      row.dataset.advId = advId;
      row.style.cssText = `padding:5px 10px;cursor:pointer;border-radius:2px;font:15px "Times New Roman",Georgia,serif;color:${known ? '#1a5c1a' : '#333'};text-shadow:1px 1px 0 rgba(191,191,191,0.4)`;

      const nameSpan = document.createElement('span');
      nameSpan.style.fontWeight = 'bold';
      nameSpan.textContent = ADVANCE_NAMES[advId];
      if (known) nameSpan.textContent += ' \u2713';
      row.appendChild(nameSpan);

      row.addEventListener('click', () => showTechDetail(advId, civTechs, techEnablesUnits, techEnablesBuildings, techEnablesWonders, techEnablesGovts, techObsoletesUnits, techObsoletesWonders));
      row.addEventListener('mouseenter', () => { row.style.background = 'rgba(0,0,80,0.12)'; });
      row.addEventListener('mouseleave', () => { row.style.background = ''; });

      list.appendChild(row);
    });

    panel.appendChild(list);
  }, [
    { label: 'OK' },
  ]);
}

function showTechDetail(advId, civTechs, techEnablesUnits, techEnablesBuildings, techEnablesWonders, techEnablesGovts, techObsoletesUnits, techObsoletesWonders) {
  const known = civTechs.has(advId);
  const [p1, p2] = ADVANCE_PREREQS[advId] || [-1, -1];

  createCiv2Dialog('tech-detail', ADVANCE_NAMES[advId], panel => {
    panel.style.minWidth = '360px';
    panel.style.maxWidth = '500px';
    panel.style.background = '#c0c0c0';

    const style = 'font:15px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);padding:3px 10px';

    // Status
    const status = document.createElement('div');
    status.style.cssText = style + ';font-weight:bold;text-align:center;padding-bottom:6px;border-bottom:1px solid rgba(0,0,0,0.15);margin-bottom:6px';
    status.textContent = known ? 'Discovered' : 'Not yet discovered';
    status.style.color = known ? '#1a5c1a' : '#8b0000';
    panel.appendChild(status);

    // Prerequisites
    if (p1 >= 0 || p2 >= 0) {
      const sec = document.createElement('div');
      sec.style.cssText = style;
      const header = document.createElement('div');
      header.style.cssText = 'font-weight:bold;margin-bottom:2px';
      header.textContent = 'Requires:';
      sec.appendChild(header);
      if (p1 >= 0) appendTechLine(sec, p1, civTechs);
      if (p2 >= 0) appendTechLine(sec, p2, civTechs);
      panel.appendChild(sec);
    } else {
      const sec = document.createElement('div');
      sec.style.cssText = style + ';font-style:italic';
      sec.textContent = 'No prerequisites (starting technology)';
      panel.appendChild(sec);
    }

    // Leads to
    const leadsTo = [];
    for (let i = 0; i < ADVANCE_PREREQS.length; i++) {
      const [a, b] = ADVANCE_PREREQS[i] || [-1, -1];
      if (a === advId || b === advId) leadsTo.push(i);
    }
    if (leadsTo.length > 0) {
      const sec = document.createElement('div');
      sec.style.cssText = style + ';margin-top:6px';
      const header = document.createElement('div');
      header.style.cssText = 'font-weight:bold;margin-bottom:2px';
      header.textContent = 'Leads to:';
      sec.appendChild(header);
      leadsTo.sort((a, b) => ADVANCE_NAMES[a].localeCompare(ADVANCE_NAMES[b]));
      for (const tid of leadsTo) appendTechLine(sec, tid, civTechs);
      panel.appendChild(sec);
    }

    // Enables section
    const enables = [];
    const units = techEnablesUnits[advId] || [];
    const buildings = techEnablesBuildings[advId] || [];
    const wonders = techEnablesWonders[advId] || [];
    const govts = techEnablesGovts[advId] || [];

    if (units.length > 0) enables.push({ header: 'Units', items: units.map(i => UNIT_NAMES[i]) });
    if (buildings.length > 0) enables.push({ header: 'Buildings', items: buildings.map(i => IMPROVE_NAMES[i]).filter(Boolean) });
    if (wonders.length > 0) enables.push({ header: 'Wonders', items: wonders.map(i => WONDER_NAMES[i]) });
    if (govts.length > 0) enables.push({ header: 'Governments', items: govts.map(g => g.charAt(0).toUpperCase() + g.slice(1)) });

    if (enables.length > 0) {
      const sec = document.createElement('div');
      sec.style.cssText = style + ';margin-top:6px';
      const header = document.createElement('div');
      header.style.cssText = 'font-weight:bold;margin-bottom:2px';
      header.textContent = 'Enables:';
      sec.appendChild(header);
      for (const group of enables) {
        const line = document.createElement('div');
        line.style.cssText = 'padding-left:12px;margin-bottom:1px';
        line.innerHTML = `<span style="color:#555;font-size:13px">${group.header}:</span> ${group.items.join(', ')}`;
        sec.appendChild(line);
      }
      panel.appendChild(sec);
    }

    // Obsoletes section
    const obsoletes = [];
    const obsUnits = techObsoletesUnits[advId] || [];
    const obsWonders = techObsoletesWonders[advId] || [];
    if (obsUnits.length > 0) obsoletes.push({ header: 'Obsoletes Units', items: obsUnits.map(i => UNIT_NAMES[i]) });
    if (obsWonders.length > 0) obsoletes.push({ header: 'Obsoletes Wonders', items: obsWonders.map(i => WONDER_NAMES[i]) });

    if (obsoletes.length > 0) {
      const sec = document.createElement('div');
      sec.style.cssText = style + ';margin-top:6px';
      for (const group of obsoletes) {
        const line = document.createElement('div');
        line.style.cssText = 'padding-left:0;margin-bottom:1px';
        line.innerHTML = `<span style="font-weight:bold;color:#8b0000">${group.header}:</span> ${group.items.join(', ')}`;
        sec.appendChild(line);
      }
      panel.appendChild(sec);
    }

    // Path to this tech (if not known)
    if (!known) {
      const path = getPrereqPath(advId, civTechs);
      if (path.length > 0) {
        const sec = document.createElement('div');
        sec.style.cssText = style + ';margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,0.15)';
        const header = document.createElement('div');
        header.style.cssText = 'font-weight:bold;margin-bottom:2px';
        header.textContent = `Research path (${path.length} step${path.length > 1 ? 's' : ''}):`;
        sec.appendChild(header);
        path.forEach((tid, i) => {
          const line = document.createElement('div');
          line.style.cssText = 'padding-left:12px;margin-bottom:1px';
          line.textContent = `${i + 1}. ${ADVANCE_NAMES[tid]}`;
          if (tid === advId) line.style.fontWeight = 'bold';
          sec.appendChild(line);
        });
        panel.appendChild(sec);
      }
    }
  }, [
    { label: 'Back', action: () => showTechTree() },
    { label: 'OK' },
  ]);
}

function appendTechLine(container, techId, civTechs) {
  const line = document.createElement('div');
  line.style.cssText = 'padding-left:12px;margin-bottom:1px';
  const known = civTechs.has(techId);
  line.textContent = ADVANCE_NAMES[techId] + (known ? ' \u2713' : '');
  line.style.color = known ? '#1a5c1a' : '#333';
  container.appendChild(line);
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

// ── Sound system ──
// Preload all WAV files; play() resets currentTime for overlapping calls
const SFX = {};
function sfxLoad(name) {
  const a = new Audio(`assets/sounds/${name}.WAV`);
  SFX[name] = a;
  return a;
}
function sfx(name) {
  const a = SFX[name];
  if (!a) return;
  a.currentTime = 0;
  a.play().catch(() => {});
}

// Menu sounds
const menuLoop = sfxLoad('MENULOOP');
sfxLoad('MENUOK');
sfxLoad('MENUEND');
menuLoop.loop = true;
let menuMuted = false;

// Gameplay sounds
sfxLoad('MOVPIECE');    // unit move
sfxLoad('ENDOTURN');    // end turn
sfxLoad('BLDCITY');     // city founded
sfxLoad('SELL');         // sell building / rush buy
sfxLoad('NEWONDER');    // wonder completed
sfxLoad('NEWGOVT');     // government changed
sfxLoad('GUILLOTN');    // revolution (anarchy)
sfxLoad('FANFARE1');    // tech discovered
sfxLoad('SPYSOUND');    // espionage actions
sfxLoad('CIVDISOR');    // civil disorder
sfxLoad('POMPCIRC');    // We Love the King Day
sfxLoad('AQUEDUCT');    // aqueduct/sewer needed
sfxLoad('LETTER');       // diplomacy received
sfxLoad('POS1');         // diplomacy accepted
sfxLoad('NEG1');         // diplomacy rejected
sfxLoad('CRWDBUGL');    // city captured
sfxLoad('NUKEXPLO');    // nuke
sfxLoad('FEEDBK04');    // UI click feedback
sfxLoad('CATHEDRL');    // building complete
sfxLoad('MRKTPLCE');    // trade route
sfxLoad('CHEERS1');     // goody hut positive
sfxLoad('CHEERS2');     // goody hut positive alt
sfxLoad('NEWBANK');     // goody hut gold
sfxLoad('BARRACKS');    // unit produced

// Combat attack sounds — per-unit-type mapping
sfxLoad('SWORDFGT');    // Warriors, Phalanx, Legion, Pikemen, Musketeers, Fanatics, Partisans, Riflemen
sfxLoad('INFANTRY');    // Marines, Paratroopers, Mech. Inf., Alpine Troops
sfxLoad('CAVALRY');     // Horsemen, Knights, Dragoons, Cavalry
sfxLoad('ELEPHANT');    // Elephant
sfxLoad('SWRDHORS');    // Chariot, Crusaders
sfxLoad('CATAPULT');    // Catapult, Cannon, Artillery
sfxLoad('BIGGUN');      // Howitzer, Battleship, Cruiser
sfxLoad('MCHNGUNS');    // Armor
sfxLoad('FIRE---');     // Frigate
sfxLoad('AIRCOMBT');    // Fighter, Stealth Fighter
sfxLoad('DIVEBOMB');    // Bomber, Stealth Bomber
sfxLoad('JETBOMB');     // Cruise Missile
sfxLoad('HELISHOT');    // Helicopter
sfxLoad('NAVBTTLE');    // Ironclad, Destroyer, AEGIS Cruiser
sfxLoad('TORPEDOS');    // Submarine
sfxLoad('MISSILE');     // Nuclear Missile
sfxLoad('MEDGUN');      // Archers, Explorer
sfxLoad('DIESEL');      // Transport, Carrier
sfxLoad('ENGNSPUT');    // Trireme, Caravel, Galleon
// Death/explosion sounds
sfxLoad('SMALLEXP');    // land unit killed
sfxLoad('MEDEXPL');     // modern unit killed
sfxLoad('LARGEXPL');    // artillery/armor killed
sfxLoad('BOATSINK');    // naval unit killed
sfxLoad('JETCRASH');    // air unit killed
sfxLoad('DIVCRASH');    // helicopter killed

// Unit type → attack sound name
// Indices: 0=Settlers 1=Engineers 2=Warriors 3=Phalanx 4=Archers 5=Legion
//   6=Pikemen 7=Musketeers 8=Fanatics 9=Partisans 10=Alpine 11=Riflemen
//   12=Marines 13=Paratroopers 14=Mech.Inf 15=Horsemen 16=Chariot 17=Elephant
//   18=Crusaders 19=Knights 20=Dragoons 21=Cavalry 22=Armor 23=Catapult
//   24=Cannon 25=Artillery 26=Howitzer 27=Fighter 28=Bomber 29=Helicopter
//   30=StealthFighter 31=StealthBomber 32=Trireme 33=Caravel 34=Galleon
//   35=Frigate 36=Ironclad 37=Destroyer 38=Cruiser 39=AEGIS 40=Battleship
//   41=Submarine 42=Carrier 43=Transport 44=CruiseMsl 45=NuclearMsl
//   46=Diplomat 47=Spy 48=Caravan 49=Freight 50=Explorer 51=ExtraLand
const UNIT_ATK_SFX = [
  null,       null,       'SWORDFGT','SWORDFGT','MEDGUN',  'SWORDFGT', // 0-5
  'SWORDFGT','SWORDFGT','SWORDFGT','SWORDFGT','INFANTRY','SWORDFGT', // 6-11
  'INFANTRY','INFANTRY','INFANTRY','CAVALRY', 'SWRDHORS','ELEPHANT', // 12-17
  'SWRDHORS','CAVALRY', 'CAVALRY', 'CAVALRY', 'MCHNGUNS','CATAPULT', // 18-23
  'CATAPULT','CATAPULT','BIGGUN',  'AIRCOMBT','DIVEBOMB','HELISHOT', // 24-29
  'AIRCOMBT','DIVEBOMB','ENGNSPUT','ENGNSPUT','ENGNSPUT','FIRE---',  // 30-35
  'NAVBTTLE','NAVBTTLE','BIGGUN',  'NAVBTTLE','BIGGUN',  'TORPEDOS', // 36-41
  'DIESEL',  'DIESEL',  'JETBOMB', 'MISSILE', 'SPYSOUND','SPYSOUND', // 42-47
  null,       null,       'MEDGUN',  null,                             // 48-51
];

// Unit type → death sound (based on domain and era)
const UNIT_DOMAIN_IMPORTED = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   // 0-14 land
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,             // 15-26 land
  2, 2, 2, 2, 2,                                     // 27-31 air
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,               // 32-43 sea
  2, 2,                                               // 44-45 air (missiles)
  0, 0, 0, 0, 0, 0,                                   // 46-51 land
];
function getDeathSfx(unitType) {
  const domain = UNIT_DOMAIN_IMPORTED[unitType] ?? 0;
  if (domain === 1) return 'BOATSINK';
  if (domain === 2) return unitType === 29 ? 'DIVCRASH' : 'JETCRASH'; // helicopter vs jet
  // Land: modern units get bigger explosions
  if (unitType >= 22 && unitType <= 26) return 'LARGEXPL'; // armor, artillery
  if (unitType >= 10 && unitType <= 14) return 'MEDEXPL';  // modern infantry
  return 'SMALLEXP';
}

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
  if (!menuMuted) sfx('MENUOK');
  const selected = document.querySelector('input[name="menu-choice"]:checked');
  if (!selected) return;
  switch (selected.value) {
    case 'load':
      if (files.sav && files.t1 && files.t2) {
        gameEnteredFrom = 'menu';
        currentMapData = null; // clear multiplayer state so doRender() re-parses .sav
        mpGameState = null;
        mpCivSlot = null;
        updateTurnUI();
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
let pendingMoveUnit = null; // unitIndex that last sent MOVE_UNIT — for detecting successful move
let pendingAutoAdvanceFrom = null; // unitIndex that triggered the action — consumed in STATE handler
let mercenaryQueue = []; // unit indices from goody hut mercenaries — selected before findNextMovableUnit

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

        // Play transition sound only on initial game start (not reconnect)
        if (currentScene === 'lobby') {
          menuLoop.pause();
          menuLoop.currentTime = 0;
          sfx('MENUEND');
        }

        // Enable FOW + LOS for multiplayer
        document.getElementById('fow-toggle').checked = true;
        document.getElementById('los-toggle').checked = true;
        cachedFowCiv = mpCivSlot;
        cachedLosData = null;

        // Switch to game scene first so viewport has real dimensions for centering
        gameEnteredFrom = 'lobby';
        setScene('game');

        // Hide single-player controls, show restart controls in multiplayer
        document.getElementById('sav-btn').style.display = 'none';
        document.getElementById('render-btn').style.display = 'none';
        document.getElementById('status').style.display = 'none';
        document.getElementById('restart-controls').style.display = '';

        // Show chat panel
        showChatPanel();

        // Build mapData object compatible with existing renderer
        // populateFowCivSelector is called inside with forceCiv to ensure correct civ
        doRenderFromState({ silent: false, forceCiv: mpCivSlot });
        break;
      }

      case 'STATE': {
        const prevUnits = mpGameState?.units;
        mpGameState = deserializeState(msg.state);

        // Capture and consume auto-advance state
        const autoAdvFrom = pendingAutoAdvanceFrom;
        pendingAutoAdvanceFrom = null;

        // Stash visibility update — applied after slide animation (or immediately if no slide)
        const pendingVisibility = (msg.tileVisibility && mpMapBase?.tileData) ? msg.tileVisibility : null;

        // Apply tile updates immediately (improvements, terrain, goody huts from worker orders)
        applyImprovementsUpdate(msg.tileImprovements);
        applyTerrainUpdate(msg.tileTerrains);
        applyGoodyHutUpdate(msg.tileGoodyHuts);

        // Queue mercenary/nomad units from goody huts so they're selected next
        const hutRes = msg.state.goodyHutResult;
        if (hutRes && hutRes.civSlot === mpCivSlot && hutRes.mercenaryIndices) {
          mercenaryQueue.push(...hutRes.mercenaryIndices);
        }

        // Process notifications (combat, goody hut, city founded, turn events, etc.)
        const statePayload = msg.state;
        const processNotifications = () => {
          // Refresh city dialog if open (e.g. after SET_WORKERS)
          if (cdCity && mpGameState?.cities?.[cdCityIndex]
              && document.getElementById('citydialog-overlay').style.display === 'flex') {
            cdCity = mpGameState.cities[cdCityIndex];
            cdRerender();
          }

          // Combat result notification
          if (statePayload.combatResult) {
            const cr = statePayload.combatResult;
            if (cr.type === 'capture') {
              sfx('CRWDBUGL');
              showOverlayMessage(`${cr.cityName} captured!`);
            } else {
              // Play attacker's attack sound
              const atkSfx = UNIT_ATK_SFX[cr.attacker];
              if (atkSfx) sfx(atkSfx);
              // Play loser's death sound after a short delay
              const loser = cr.type === 'atkWin' ? cr.defender : cr.attacker;
              setTimeout(() => sfx(getDeathSfx(loser)), 300);
              const atkName = UNIT_NAMES[cr.attacker] || 'Unit';
              const defName = UNIT_NAMES[cr.defender] || 'Unit';
              if (cr.type === 'atkWin') {
                showOverlayMessage(`${atkName} defeated ${defName}`);
              } else {
                showOverlayMessage(`${defName} repelled ${atkName}`);
              }
            }
          }

          // Tech discovery notification — auto-show research picker
          if (statePayload.discoveredAdvance && statePayload.discoveredAdvance.civSlot === mpCivSlot) {
            sfx('FANFARE1');
            const da = statePayload.discoveredAdvance;
            const ct = mpGameState.civTechs?.[da.civSlot];
            console.log('[tech] Discovered advance', da.advanceId, ADVANCE_NAMES[da.advanceId],
              'civTechs now=', ct ? [...ct] : null, 'has it=', ct?.has(da.advanceId));
            setTimeout(() => showResearchPicker(statePayload.discoveredAdvance.advanceId), 300);
          }

          // Goody hut result notification (exact Civ2 GAME.TXT messages)
          if (statePayload.goodyHutResult && statePayload.goodyHutResult.civSlot === mpCivSlot) {
            const hr = statePayload.goodyHutResult;
            let hutText = '';
            let hutSfx = null;
            let hutPostAction = null;
            switch (hr.type) {
              case 'gold':
                hutSfx = 'NEWBANK';
                hutText = `You have discovered valuable metal deposits worth ${hr.amount} gold.`;
                break;
              case 'tech':
                hutSfx = 'FANFARE1';
                hutText = `You have discovered scrolls of ancient wisdom.\n\n${hr.advanceName}`;
                hutPostAction = () => {
                  setTimeout(() => {
                    const civ = mpGameState.civs?.[mpCivSlot];
                    if (civ && (civ.techBeingResearched == null || civ.techBeingResearched === 0xFF)) {
                      showResearchPicker(hr.advanceId);
                    }
                  }, 300);
                };
                break;
              case 'unit':
                hutSfx = 'CHEERS1';
                hutText = 'You have discovered a friendly tribe of skilled mercenaries.';
                break;
              case 'nomads':
                hutSfx = 'CHEERS2';
                hutText = 'You discover a band of wandering nomads.\nThey agree to join your tribe.';
                break;
              case 'barbarians':
                hutSfx = 'DRUMAY';
                hutText = 'You have unleashed a horde of barbarians!';
                break;
              case 'nothing':
                hutText = 'Weeds grow in empty ruins. This village has long\nbeen abandoned.';
                break;
            }
            if (hutSfx) sfx(hutSfx);
            createCiv2Dialog('hut-dialog', 'Village', panel => {
              const content = document.createElement('div');
              content.style.cssText = 'display:flex;align-items:center;gap:16px;padding:12px 20px';

              const img = document.createElement('img');
              img.src = 'assets/menu/seal.gif';
              img.alt = 'Village';
              img.style.cssText = 'width:120px;height:auto;border:2px inset #a08060;flex-shrink:0';
              content.appendChild(img);

              const textDiv = document.createElement('div');
              textDiv.style.cssText = 'font-family:"Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);font-size:16px;white-space:pre-line';
              textDiv.textContent = hutText;
              content.appendChild(textDiv);

              panel.appendChild(content);
            }, [{ label: 'OK', action: hutPostAction || undefined }]);
          }

          // City founded notification — show popup, then open city dialog
          if (statePayload.cityFounded && statePayload.cityFounded.civSlot === mpCivSlot) {
            const cf = statePayload.cityFounded;
            const year = getGameYear(mpGameState.turn?.number || 0);
            showCityFoundedDialog(cf.name, year, () => {
              const city = mpGameState.cities[cf.cityIndex];
              if (city) openCityDialog(city, cf.cityIndex);
            });
          }

          // Turn events: city growth, famine, production complete, civ eliminated
          if (statePayload.turnEvents) {
            const GLOBAL_EVENTS = new Set(['civEliminated', 'warDeclared', 'treatyAccepted', 'tributePaid', 'mapShared', 'cityIncited']);
            const myEvents = statePayload.turnEvents.filter(e =>
              e.civSlot === mpCivSlot || GLOBAL_EVENTS.has(e.type));
            if (myEvents.length > 0) {
              showTurnEvents(myEvents);
            }
          }

          // Auto-show diplomacy panel when there are pending proposals/demands for us
          if (mpGameState.treatyProposals?.some(p => p.to === mpCivSlot && !p.resolved) ||
              mpGameState.tributeDemands?.some(d => d.to === mpCivSlot && !d.resolved)) {
            sfx('LETTER');
            setTimeout(() => showDiplomacyPanel(), 400);
          }

          // Prompt to pick research at start of turn if nothing selected and science > 0
          if (mpGameState.turn.activeCiv === mpCivSlot && !statePayload.discoveredAdvance) {
            const civ = mpGameState.civs?.[mpCivSlot];
            if (civ && (civ.techBeingResearched == null || civ.techBeingResearched === 0xFF)
                && civ.researchProgress > 0) {
              setTimeout(() => showResearchPicker(), 300);
            }
          }
        };

        // Continuation after optional combat animation — render + notifications
        const afterCombatAnim = () => {
          // Play move sound if unit successfully moved to a new position
          if (pendingMoveUnit != null && prevUnits) {
            const prevU = prevUnits[pendingMoveUnit];
            const newU = msg.state.units[pendingMoveUnit];
            if (prevU && newU && (newU.gx !== prevU.gx || newU.gy !== prevU.gy) && newU.gx >= 0) {
              sfx('MOVPIECE');
            }
            pendingMoveUnit = null;
          }

          applyVisibilityUpdate(pendingVisibility);
          doRenderFromState({ skipCenter: true, autoAdvanceFrom: autoAdvFrom });
          processNotifications();
        };

        // If combat occurred, play flash animation before slide/render
        const cr = statePayload.combatResult;
        if (cr && cr.gx != null && cr.type !== 'capture' && mapSprites) {
          animateCombatFlash(cr, afterCombatAnim);
        } else {
          afterCombatAnim();
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

      case 'MSG':
        handleChatMessage(msg);
        break;

      case 'CHAT_HISTORY':
        if (msg.messages) msg.messages.forEach(m => handleChatMessage(m, true));
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
        document.getElementById('restart-controls').style.display = '';
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
    document.getElementById('restart-controls').style.display = '';
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
  if (state.civTechs) {
    state.civTechs = state.civTechs.map(t => Array.isArray(t) ? new Set(t) : t);
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
    civs: state.civs,
    civTechCounts: state.civTechCounts || new Array(8).fill(0),
    civTechs: state.civTechs ? state.civTechs.map(t => Array.isArray(t) ? new Set(t) : t) : null,
    civsAlive: state.civsAlive ?? 0xFF,
    playerCiv: mpCivSlot ?? state.playerCiv ?? 1,
    mapRevealed: state.mapRevealed ?? false,
    unitBySaveIndex: state.unitBySaveIndex,
    allUnits: state.allUnits,
    tail: state.tail,
    header: state.header,
    gameState: state.gameState || { turnsPassed: state.turn?.number || 0, playerCiv: mpCivSlot ?? 1 },
    validation: state.validation,
    civNames: state.civNames,
    wonders: state.wonders,
  };
}

async function doRenderFromState(opts = {}) {
  const mapData = buildMapDataFromState();
  if (!mapData) return;
  currentMapData = mapData;

  populateFowCivSelector(mapData, opts.forceCiv);
  updateTurnUI();
  updateGameInfo(currentMapData, mpCivSlot);

  // Auto-select unit (only on our turn)
  const prevSelected = mpSelectedUnit;
  if (mpGameState.turn.activeCiv === mpCivSlot) {
    const advFrom = opts.autoAdvanceFrom;
    if (advFrom != null) {
      // After a move/order: stay on same unit if it still has moves, else advance
      const movedUnit = mpGameState.units[advFrom];
      if (movedUnit && movedUnit.owner === mpCivSlot && movedUnit.movesLeft > 0
          && movedUnit.gx >= 0 && !BUSY_ORDERS.has(movedUnit.orders)) {
        mpSelectedUnit = advFrom;
      } else {
        // Check mercenary queue before general search
        mpSelectedUnit = shiftMercenaryQueue() ?? findNextMovableUnit(advFrom);
      }
    } else {
      mpSelectedUnit = shiftMercenaryQueue() ?? findNextMovableUnit(-1);
    }
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

  // Center on newly selected unit if it changed (auto-advance), or on load
  if (opts.skipCenter && mpSelectedUnit !== prevSelected && mpSelectedUnit != null) {
    centerOnUnit(mpGameState.units[mpSelectedUnit]);
  } else if (!opts.skipCenter) {
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
  if (!mpGameState) {
    turnUI.style.display = 'none';
    return;
  }
  turnUI.style.display = '';

  const isSpectator = mpCivSlot == null;
  const isMyTurn = !isSpectator && mpGameState.turn.activeCiv === mpCivSlot;
  const civName = mpGameState.civNames?.[mpGameState.turn.activeCiv] || `Civ ${mpGameState.turn.activeCiv}`;
  const civColor = CIV_COLORS[mpGameState.turn.activeCiv] || '#e0e0e0';

  document.getElementById('turn-civ-name').textContent = civName;
  document.getElementById('turn-civ-name').style.color = civColor;
  document.getElementById('turn-number').textContent = `Turn ${mpGameState.turn.number || 0}`;

  // ── Research progress ──
  const resEl = document.getElementById('research-info');
  if (isSpectator) {
    resEl.textContent = 'Spectating';
  } else {
    const civ = mpGameState.civs?.[mpCivSlot];
    if (civ && resEl) {
      const techId = civ.techBeingResearched;
      if (techId != null && techId !== 0xFF && techId >= 0 && techId < ADVANCE_NAMES.length) {
        const current = civ.researchProgress || 0;
        const cost = calcResearchCost(mpGameState, mpCivSlot);
        let sciPerTurn = 0;
        if (mpMapBase) {
          for (let ci = 0; ci < mpGameState.cities.length; ci++) {
            const city = mpGameState.cities[ci];
            if (city.owner === mpCivSlot && city.size > 0) {
              const { sci } = calcCityTrade(city, ci, mpGameState, mpMapBase);
              sciPerTurn += sci;
            }
          }
        }
        const remaining = cost - current;
        const turnsLeft = sciPerTurn > 0 ? Math.ceil(remaining / sciPerTurn) : '?';
        resEl.textContent = `${ADVANCE_NAMES[techId]}: ${current}/${cost} (${turnsLeft} Turns)`;
      } else {
        resEl.textContent = 'No research';
      }
    }
  }

  const endBtn = document.getElementById('end-turn-btn');
  const waitMsg = document.getElementById('turn-waiting');
  if (isSpectator) {
    endBtn.style.display = 'none';
    endBtn.classList.remove('flash');
    waitMsg.style.display = '';
    waitMsg.textContent = `${civName}'s turn`;
  } else if (isMyTurn) {
    endBtn.style.display = '';
    waitMsg.style.display = 'none';
    if (findNextMovableUnit(-1) == null) {
      endBtn.classList.add('flash');
    } else {
      endBtn.classList.remove('flash');
    }
  } else {
    endBtn.style.display = 'none';
    endBtn.classList.remove('flash');
    waitMsg.style.display = '';
    waitMsg.textContent = 'Waiting for opponent...';
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
  if (!mpGameState || mpGameState.turn.activeCiv !== mpCivSlot) return;
  sfx('ENDOTURN');
  transport.sendRaw({ type: 'ACTION', action: { type: 'END_TURN' } });
});

// Restart button — show map size picker dialog
document.getElementById('restart-btn').addEventListener('click', () => {
  showMapSizePicker();
});

function showMapSizePicker() {
  const MIN_DIM = 20;
  const MAX_DIM = 300;
  const presets = [
    { label: 'Small (40 × 50)', w: 40, h: 50 },
    { label: 'Medium (50 × 80)', w: 50, h: 80 },
    { label: 'Large (75 × 120)', w: 75, h: 120 },
  ];
  let selected = 1; // default: Medium
  let customW = 50, customH = 80;
  let okBtn = null;

  function validateCustom() {
    const wOk = customW >= MIN_DIM && customW <= MAX_DIM;
    const hOk = customH >= MIN_DIM && customH <= MAX_DIM;
    if (wInput) wInput.style.color = wOk ? '' : '#c00';
    if (hInput) hInput.style.color = hOk ? '' : '#c00';
    if (errorMsg) {
      if (selected === -1 && (!wOk || !hOk)) {
        errorMsg.textContent = `Minimum ${MIN_DIM} × ${MIN_DIM}, maximum ${MAX_DIM} × ${MAX_DIM}`;
        errorMsg.style.display = '';
      } else {
        errorMsg.style.display = 'none';
      }
    }
    if (okBtn) okBtn.disabled = (selected === -1 && (!wOk || !hOk));
  }

  let wInput, hInput, errorMsg;

  createCiv2Dialog('mapsize-dialog', 'Select Map Size', panel => {
    panel.style.minWidth = '280px';

    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:2px;margin-bottom:8px';

    const rows = [];
    presets.forEach((p, i) => {
      const row = document.createElement('div');
      row.dataset.selectable = '1';
      row.style.cssText = 'padding:6px 12px;cursor:pointer;border-radius:2px;font:17px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
      row.textContent = p.label;
      if (i === selected) {
        row.style.background = 'rgba(0,0,80,0.25)';
        row.classList.add('civ2-selected');
      }
      row.addEventListener('click', () => {
        selected = i;
        rows.forEach((r, j) => {
          const isSel = j === selected;
          r.style.background = isSel ? 'rgba(0,0,80,0.25)' : '';
          r.classList.toggle('civ2-selected', isSel);
        });
        customRow.style.background = '';
        customRow.classList.remove('civ2-selected');
        validateCustom();
      });
      row.addEventListener('mouseenter', () => { if (selected !== i) row.style.background = 'rgba(255,255,255,0.12)'; });
      row.addEventListener('mouseleave', () => { row.style.background = selected === i ? 'rgba(0,0,80,0.25)' : ''; });
      list.appendChild(row);
      rows.push(row);
    });

    // Custom size row
    const customRow = document.createElement('div');
    customRow.dataset.selectable = '1';
    customRow.style.cssText = 'padding:6px 12px;cursor:pointer;border-radius:2px;font:17px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);display:flex;align-items:center;gap:6px';
    const customLabel = document.createElement('span');
    customLabel.textContent = 'Custom:';
    wInput = document.createElement('input');
    wInput.type = 'number'; wInput.min = String(MIN_DIM); wInput.max = String(MAX_DIM); wInput.value = customW;
    wInput.style.cssText = 'width:50px;font:14px "Times New Roman",serif;padding:2px 4px;text-align:center';
    const xLabel = document.createElement('span');
    xLabel.textContent = '×';
    hInput = document.createElement('input');
    hInput.type = 'number'; hInput.min = String(MIN_DIM); hInput.max = String(MAX_DIM); hInput.value = customH;
    hInput.style.cssText = 'width:50px;font:14px "Times New Roman",serif;padding:2px 4px;text-align:center';
    customRow.appendChild(customLabel);
    customRow.appendChild(wInput);
    customRow.appendChild(xLabel);
    customRow.appendChild(hInput);

    const selectCustom = () => {
      selected = -1;
      rows.forEach(r => { r.style.background = ''; r.classList.remove('civ2-selected'); });
      customRow.style.background = 'rgba(0,0,80,0.25)';
      customRow.classList.add('civ2-selected');
      validateCustom();
    };
    customRow.addEventListener('click', selectCustom);
    wInput.addEventListener('focus', selectCustom);
    hInput.addEventListener('focus', selectCustom);
    wInput.addEventListener('input', () => { customW = parseInt(wInput.value) || 0; validateCustom(); });
    hInput.addEventListener('input', () => { customH = parseInt(hInput.value) || 0; validateCustom(); });

    list.appendChild(customRow);
    rows.push(customRow);

    // Error message
    errorMsg = document.createElement('div');
    errorMsg.style.cssText = 'color:#c00;font:13px "Times New Roman",serif;text-align:center;padding:2px 0;display:none';
    list.appendChild(errorMsg);

    panel.appendChild(list);
  }, [
    { label: 'Cancel' },
    { label: 'OK', action: () => {
      let mapSize;
      if (selected >= 0) {
        mapSize = `${presets[selected].w}x${presets[selected].h}`;
      } else {
        if (customW < MIN_DIM || customH < MIN_DIM || customW > MAX_DIM || customH > MAX_DIM) return;
        mapSize = `${customW}x${customH}`;
      }
      transport.sendRaw({ type: 'RESTART_GAME', mapSize });
    }},
  ]);

  // Grab OK button ref for disabling
  const btns = document.querySelectorAll('#mapsize-dialog .civ2-btn');
  okBtn = btns[btns.length - 1];
}

// Research info click → open research picker
document.getElementById('research-info').addEventListener('click', () => {
  if (!mpGameState || mpCivSlot == null) return;
  if (mpGameState.turn.activeCiv !== mpCivSlot) return;
  showResearchPicker();
});

// ── Multiplayer keyboard input ──
window.addEventListener('keydown', e => {
  if (!mpGameState || mpGameState.turn.activeCiv !== mpCivSlot) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
  if (currentScene !== 'game') return;
  // Don't process game keys when unit menu is open (menu has its own handlers)
  if (unitMenu.classList.contains('visible')) return;

  // Tab: cycle to next movable unit (mercenary queue takes priority)
  if (e.key === 'Tab') {
    e.preventDefault();
    const next = shiftMercenaryQueue() ?? findNextMovableUnit(mpSelectedUnit ?? -1);
    if (next != null) {
      selectUnit(next);
      centerOnUnit(mpGameState.units[next]);
    }
    return;
  }

  // W: wait — skip to next unit, come back to this one later
  if ((e.key === 'w' || e.key === 'W') && !e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      const next = findNextMovableUnit(mpSelectedUnit);
      if (next != null && next !== mpSelectedUnit) {
        selectUnit(next);
        centerOnUnit(mpGameState.units[next]);
      }
    }
    return;
  }

  // Enter: open city dialog if selected unit is on a city, else end turn if no movable units
  if (e.key === 'Enter') {
    e.preventDefault();
    if (document.getElementById('citydialog-overlay')?.style.display === 'flex') return;
    if (document.getElementById('city-founded-dialog')) return;
    if (document.getElementById('confirm-dialog')) return;
    if (document.getElementById('research-picker')) return;
    if (document.getElementById('rate-sliders')) return;
    // If selected unit is on a city, open city dialog
    if (mpSelectedUnit != null) {
      const u = mpGameState.units[mpSelectedUnit];
      if (u) {
        const cityIdx = mpGameState.cities.findIndex(c =>
          c.size > 0 && c.owner === mpCivSlot && c.gx === u.gx && c.gy === u.gy);
        if (cityIdx >= 0) {
          openCityDialog(mpGameState.cities[cityIdx], cityIdx);
          return;
        }
      }
    }
    if (findNextMovableUnit(-1) == null) {
      sfx('ENDOTURN');
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
        showNameCityDialog(mpSelectedUnit);
      }
    }
    return;
  }

  // F: fortify unit
  if (e.key === 'f' && !e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      pendingAutoAdvanceFrom = mpSelectedUnit;
      transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: mpSelectedUnit, order: 'fortify' } });
    }
    return;
  }

  // S: sentry
  if (e.key === 's' && !e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      pendingAutoAdvanceFrom = mpSelectedUnit;
      transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: mpSelectedUnit, order: 'sentry' } });
    }
    return;
  }

  // Space: skip turn for this unit
  if (e.key === ' ') {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      pendingAutoAdvanceFrom = mpSelectedUnit;
      transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: mpSelectedUnit, order: 'skip' } });
    }
    return;
  }

  // Shift+D: disband unit
  if (e.key === 'D' && e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      const u = mpGameState.units[mpSelectedUnit];
      if (u) {
        const idx = mpSelectedUnit;
        showConfirmDialog(`Disband ${UNIT_NAMES[u.type]}?`, () => {
          pendingAutoAdvanceFrom = idx;
          transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: idx, order: 'disband' } });
        });
      }
    }
    return;
  }

  // R: build road (settler/engineer)
  if (e.key === 'r' && !e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      const u = mpGameState.units[mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        pendingAutoAdvanceFrom = mpSelectedUnit;
        transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: mpSelectedUnit, order: 'road' } });
      }
    }
    return;
  }

  // I: build irrigation (settler/engineer)
  if (e.key === 'i' && !e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      const u = mpGameState.units[mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        pendingAutoAdvanceFrom = mpSelectedUnit;
        transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: mpSelectedUnit, order: 'irrigation' } });
      }
    }
    return;
  }

  // M: build mine (settler/engineer)
  if (e.key === 'm' && !e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      const u = mpGameState.units[mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        pendingAutoAdvanceFrom = mpSelectedUnit;
        transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: mpSelectedUnit, order: 'mine' } });
      }
    }
    return;
  }

  // O: build fortress (settler/engineer)
  if (e.key === 'o' && !e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      const u = mpGameState.units[mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        pendingAutoAdvanceFrom = mpSelectedUnit;
        transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: mpSelectedUnit, order: 'fortress' } });
      }
    }
    return;
  }

  // P: clean pollution (settler/engineer)
  if (e.key === 'p' && !e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      const u = mpGameState.units[mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        pendingAutoAdvanceFrom = mpSelectedUnit;
        transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: mpSelectedUnit, order: 'pollution' } });
      }
    }
    return;
  }

  // Shift+T: open tax rate sliders
  if ((e.key === 't' || e.key === 'T') && e.shiftKey) {
    e.preventDefault();
    showRateSliders();
    return;
  }

  // Shift+G: revolution (change government)
  if (e.key === 'G' && e.shiftKey) {
    e.preventDefault();
    showRevolutionDialog();
    return;
  }

  // F6: tech tree viewer
  if (e.key === 'F6') {
    e.preventDefault();
    showTechTree();
    return;
  }

  // Shift+D: diplomacy panel
  if (e.key === 'D' && e.shiftKey) {
    e.preventDefault();
    showDiplomacyPanel();
    return;
  }

  // Shift+P: pillage
  if (e.key === 'P' && e.shiftKey && mpSelectedUnit != null) {
    e.preventDefault();
    const err = validateAction(mpGameState, mpMapBase, { type: PILLAGE, unitIndex: mpSelectedUnit }, mpCivSlot);
    if (!err) {
      pendingAutoAdvanceFrom = mpSelectedUnit;
      transport.sendRaw({ type: 'ACTION', action: { type: PILLAGE, unitIndex: mpSelectedUnit } });
    }
    return;
  }

  // Numpad movement (e.key for digits, e.code fallback for Numpad1-9)
  const NUMPAD_CODE_DIR = {
    'Numpad1': 'SW', 'Numpad2': 'S', 'Numpad3': 'SE',
    'Numpad4': 'W',                  'Numpad6': 'E',
    'Numpad7': 'NW', 'Numpad8': 'N', 'Numpad9': 'NE',
  };
  const dir = NUMPAD_DIR[e.key] || NUMPAD_CODE_DIR[e.code];
  if (!dir) return;
  e.preventDefault();

  // Auto-select first movable unit if none selected
  if (mpSelectedUnit == null) {
    selectUnit(findNextMovableUnit(-1));
  }
  if (mpSelectedUnit == null) return;

  pendingMoveUnit = mpSelectedUnit;
  pendingAutoAdvanceFrom = mpSelectedUnit;

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

const BUSY_ORDERS = new Set([
  'fortifying', 'fortified', 'sentry', 'sleep',
  'road', 'railroad', 'irrigation', 'mine', 'fortress', 'airbase', 'pollution',
]);

/** Shift the first valid (alive + has moves) unit from the mercenary queue, or return null. */
function shiftMercenaryQueue() {
  while (mercenaryQueue.length > 0) {
    const idx = mercenaryQueue.shift();
    if (!mpGameState) return null;
    const u = mpGameState.units[idx];
    if (u && u.owner === mpCivSlot && u.movesLeft > 0 && u.gx >= 0 && !BUSY_ORDERS.has(u.orders)) return idx;
  }
  return null;
}

function findNextMovableUnit(afterIndex) {
  if (!mpGameState) return null;
  const units = mpGameState.units;
  for (let i = 0; i < units.length; i++) {
    const idx = (afterIndex + 1 + i) % units.length;
    const u = units[idx];
    if (u.owner === mpCivSlot && u.movesLeft > 0 && u.gx >= 0 && !BUSY_ORDERS.has(u.orders)) return idx;
  }
  return null;
}

function centerOnTile(gx, gy) {
  if (!currentMapData) return;
  const TW = 64, TH = 32;
  const px = gx * TW + ((gy % 2) ? (TW >> 1) : 0) + TW / 2;
  const py = gy * (TH >> 1) + TH / 2;
  vp.x = px - vp.logicalW / vp.scale / 2;
  vp.y = py - vp.logicalH / vp.scale / 2;
  clampViewport();
  drawViewport();
}

function centerOnUnit(unit) {
  if (!unit) return;
  centerOnTile(unit.gx, unit.gy);
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
  // Don't blink units with no movement points remaining
  if (mpSelectedUnit != null && mpGameState) {
    const u = mpGameState.units[mpSelectedUnit];
    if (u && u.movesLeft <= 0) return;
  }
  blinkOn = true;
  blinkInterval = setInterval(() => {
    blinkOn = !blinkOn;
    toggleBlinkOverlay();
  }, 200);
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
    mpMapBase.tileData[i].visibility = tileVisibility[i];
  }
  cachedLosData = null;
  invalidateFowCanvases();
}

function applyGoodyHutUpdate(tileGoodyHuts) {
  if (!tileGoodyHuts || !mpMapBase?.tileData) return;
  for (let i = 0; i < tileGoodyHuts.length && i < mpMapBase.tileData.length; i++) {
    mpMapBase.tileData[i].goodyHut = !!tileGoodyHuts[i];
  }
}

function applyTerrainUpdate(tileTerrains) {
  if (!tileTerrains || !mpMapBase?.tileData) return;
  for (let i = 0; i < tileTerrains.length && i < mpMapBase.tileData.length; i++) {
    mpMapBase.tileData[i].terrain = tileTerrains[i];
  }
}

function applyImprovementsUpdate(tileImprovements) {
  if (!tileImprovements || !mpMapBase?.tileData) return;
  // Lazy import — improvementFromByte already available via defs
  for (let i = 0; i < tileImprovements.length && i < mpMapBase.tileData.length; i++) {
    const b = tileImprovements[i];
    const irr = !!(b & 0x04);
    const mine = !!(b & 0x08);
    const city = !!(b & 0x02);
    const fort = !!(b & 0x40);
    mpMapBase.tileData[i].improvements = {
      city,
      irrigation: irr,
      mining: mine,
      road: !!(b & 0x10),
      railroad: !!(b & 0x20),
      fortress: fort,
      pollution: !!(b & 0x80),
      farmland: irr && mine,
      airbase: city && fort,
    };
  }
}

// ── Combat flash animation ──
// Alternately flashes attacker and defender unit sprites at the combat tile,
// similar to the Civ2 battle flicker. Calls onComplete when finished.
function animateCombatFlash(cr, onComplete) {
  const TW = 64, TH = 32;
  const gx = cr.gx, gy = cr.gy;

  // Map-space position of the combat tile (top-left of unit sprite = tile minus 16px for unit height)
  const tileX = gx * TW + ((gy % 2) ? (TW >> 1) : 0);
  const tileY = gy * (TH >> 1) - 16;

  // Get both unit sprites
  const atkSprite = mapSprites?.unitColored?.[cr.attacker + '-' + cr.atkOwner];
  const defSprite = mapSprites?.unitColored?.[cr.defender + '-' + cr.defOwner];
  if (!atkSprite || !defSprite) {
    if (onComplete) onComplete();
    return;
  }

  stopBlink();
  // combat flash animating

  // Snapshot viewport for restoration between frames
  const bgSnapshot = vCtx.getImageData(0, 0, viewportCanvas.width, viewportCanvas.height);

  const dpr = window.devicePixelRatio || 1;
  const pxPerMap = vp.scale * dpr;
  const totalFlashes = 8;   // 4 pairs (atk, def, atk, def, ...)
  const flashInterval = 80;  // ms per flash frame
  let flashCount = 0;

  function drawSpriteAt(sprite) {
    if (vp.wraps && vp.wrapW > 0) {
      const x1 = ((vp.x % vp.wrapW) + vp.wrapW) % vp.wrapW;
      const relX = ((tileX - x1) % vp.wrapW + vp.wrapW) % vp.wrapW;
      vCtx.drawImage(sprite, relX * pxPerMap, (tileY - vp.y) * pxPerMap,
        sprite.width * pxPerMap, sprite.height * pxPerMap);
    } else {
      vCtx.drawImage(sprite, (tileX - vp.x) * pxPerMap, (tileY - vp.y) * pxPerMap,
        sprite.width * pxPerMap, sprite.height * pxPerMap);
    }
  }

  function flashFrame() {
    if (flashCount >= totalFlashes) {
      // combat flash done
      if (onComplete) onComplete();
      return;
    }

    // Restore background
    vCtx.putImageData(bgSnapshot, 0, 0);

    // Alternate between attacker and defender sprite
    const sprite = (flashCount % 2 === 0) ? atkSprite : defSprite;
    drawSpriteAt(sprite);

    flashCount++;
    setTimeout(flashFrame, flashInterval);
  }

  flashFrame();
}

// ── Unit context menu ──
const unitMenu = document.getElementById('unit-menu');

let unitMenuShowTime = 0; // timestamp when menu was last shown

/**
 * Render a unit sprite with its shield (HP bar + order letter) onto a canvas.
 * Returns the canvas element suitable for use as a menu sprite thumbnail.
 */
function renderUnitThumbnail(unit) {
  if (!mapSprites) return null;
  const unitSprite = mapSprites.unitColored?.[unit.type + '-' + unit.owner];
  if (!unitSprite) return null;

  const scale = 2;
  const w = 64, h = 48;
  const c = document.createElement('canvas');
  c.width = w * scale;
  c.height = h * scale;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.scale(scale, scale);

  // Draw unit sprite
  ctx.drawImage(unitSprite, 0, 0);

  // Draw shield
  const so = mapSprites.shieldOffsets?.[unit.type];
  const shieldFront = mapSprites.shieldFrontColored?.['shieldFront-' + unit.owner];
  if (so && shieldFront) {
    const sx = so.x - 1, sy = so.y - 1;

    // Shadow
    const shadowDX = (so.x < 32) ? -1 : 1;
    if (mapSprites.shieldShadow) {
      ctx.drawImage(mapSprites.shieldShadow, sx + shadowDX, sy + 1);
    }

    // Shield front
    ctx.drawImage(shieldFront, sx, sy);

    // HP bar
    const maxHp = Civ2Renderer.UNIT_MAX_HP[unit.type] || 10;
    const curHp = Math.max(0, maxHp - (unit.hpLost || 0));
    const barW = 12, barH = 3;
    const greenW = Math.floor((curHp / maxHp) * barW);
    if (greenW > 8) ctx.fillStyle = 'rgb(87,171,39)';
    else if (greenW > 3) ctx.fillStyle = 'rgb(255,223,79)';
    else ctx.fillStyle = 'rgb(243,0,0)';
    ctx.fillRect(sx, sy + 2, greenW, barH);

    // Order letter
    const orderLetter = ORDER_KEYS[unit.orders] || '-';
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#000';
    ctx.fillText(orderLetter, sx + shieldFront.width / 2, sy + 7);
  }

  return c;
}

// Convert a validated action from getValidActions() into a menu item { label, action }
function actionToMenuItem(va, unitIdx) {
  const u = mpGameState.units[unitIdx];
  const name = UNIT_NAMES[u.type] || `Unit ${u.type}`;

  switch (va.type) {
    case MOVE_UNIT:
      return {
        label: `Move ${name}`,
        isDefault: true,
        action: () => {
          pendingMoveUnit = unitIdx;
          pendingAutoAdvanceFrom = unitIdx;
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
          showNameCityDialog(unitIdx);
        },
      };
    default:
      return { label: va.type, action: () => {} };
  }
}

/**
 * Build order menu items for a unit on its own tile.
 * Validates each possible order and only includes valid ones.
 */
function buildOrderMenuItems(unitIdx) {
  const u = mpGameState.units[unitIdx];
  if (!u || u.gx < 0) return [];
  const items = [];
  const civSlot = u.owner;

  // Wake Up (only if unit has active orders)
  if (u.orders && u.orders !== 'none') {
    const err = validateAction(mpGameState, mpMapBase, { type: UNIT_ORDER, unitIndex: unitIdx, order: 'wake' }, civSlot);
    if (!err) items.push({ label: 'Wake Up', action: () => transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: unitIdx, order: 'wake' } }) });
  }

  // Unit orders
  const unitOrders = [
    { order: 'fortify', label: 'Fortify' },
    { order: 'sentry', label: 'Sentry' },
    { order: 'skip', label: 'Skip Turn' },
  ];
  for (const { order, label } of unitOrders) {
    const err = validateAction(mpGameState, mpMapBase, { type: UNIT_ORDER, unitIndex: unitIdx, order }, civSlot);
    if (!err) items.push({ label, action: () => transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: unitIdx, order } }) });
  }

  // Worker orders (settlers/engineers only)
  if (u.type === 0 || u.type === 1) {
    const workerOrders = [
      { order: 'road', label: 'Build Road' },
      { order: 'railroad', label: 'Build Railroad' },
      { order: 'irrigation', label: 'Build Irrigation' },
      { order: 'mine', label: 'Build Mine' },
      { order: 'fortress', label: 'Build Fortress' },
      { order: 'pollution', label: 'Clean Pollution' },
    ];
    const validWorker = [];
    for (const { order, label } of workerOrders) {
      const err = validateAction(mpGameState, mpMapBase, { type: WORKER_ORDER, unitIndex: unitIdx, order }, civSlot);
      if (!err) validWorker.push({ label, action: () => transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: unitIdx, order } }) });
    }
    if (validWorker.length > 0) {
      items.push({ separator: true });
      items.push(...validWorker);
    }
  }

  // Pillage
  {
    const err = validateAction(mpGameState, mpMapBase, { type: PILLAGE, unitIndex: unitIdx }, civSlot);
    if (!err) items.push({ label: 'Pillage', action: () => {
      showConfirmDialog('Pillage improvement?', () => {
        transport.sendRaw({ type: 'ACTION', action: { type: PILLAGE, unitIndex: unitIdx } });
      });
    }});
  }

  // Establish Trade Route (Caravan/Freight in a foreign or distant city)
  if (u.type === 48 || u.type === 49) {
    // Find city at unit's tile
    const ci = mpGameState.cities.findIndex(c => c.gx === u.gx && c.gy === u.gy && c.size > 0);
    if (ci >= 0) {
      const err = validateAction(mpGameState, mpMapBase, { type: ESTABLISH_TRADE, unitIndex: unitIdx, cityIndex: ci }, civSlot);
      if (!err) items.push({ label: 'Establish Trade Route', action: () => {
        transport.sendRaw({ type: 'ACTION', action: { type: ESTABLISH_TRADE, unitIndex: unitIdx, cityIndex: ci } });
      }});
    }
  }

  // Diplomat/Spy actions
  if (u.type === 46 || u.type === 47) {
    const spyItems = [];
    // City actions: steal tech, sabotage, incite revolt (when on enemy city)
    const spyCity = mpGameState.cities.find(c => c.gx === u.gx && c.gy === u.gy && c.size > 0 && c.owner !== civSlot);
    if (spyCity) {
      const stealErr = validateAction(mpGameState, mpMapBase, { type: STEAL_TECH, unitIndex: unitIdx }, civSlot);
      if (!stealErr) spyItems.push({ label: 'Steal Technology', action: () => {
        transport.sendRaw({ type: 'ACTION', action: { type: STEAL_TECH, unitIndex: unitIdx } });
      }});
      const sabErr = validateAction(mpGameState, mpMapBase, { type: SABOTAGE_CITY, unitIndex: unitIdx }, civSlot);
      if (!sabErr) spyItems.push({ label: 'Sabotage City', action: () => {
        transport.sendRaw({ type: 'ACTION', action: { type: SABOTAGE_CITY, unitIndex: unitIdx } });
      }});
      const incErr = validateAction(mpGameState, mpMapBase, { type: INCITE_REVOLT, unitIndex: unitIdx }, civSlot);
      if (!incErr) {
        const cost = calcInciteCost(mpGameState, spyCity, mpMapBase);
        spyItems.push({ label: `Incite Revolt (${cost}g)`, action: () => {
          showConfirmDialog(`Incite revolt in ${spyCity.name} for ${cost} gold?`, () => {
            transport.sendRaw({ type: 'ACTION', action: { type: INCITE_REVOLT, unitIndex: unitIdx } });
          });
        }});
      }
    }
    // Bribe adjacent enemy unit
    for (let ti = 0; ti < mpGameState.units.length; ti++) {
      const t = mpGameState.units[ti];
      if (t.owner === civSlot || t.gx < 0) continue;
      const bErr = validateAction(mpGameState, mpMapBase, { type: BRIBE_UNIT, unitIndex: unitIdx, targetIndex: ti }, civSlot);
      if (!bErr) {
        const cost = calcBribeCost(mpGameState, t, mpMapBase);
        const tName = UNIT_NAMES[t.type] || 'Unit';
        spyItems.push({ label: `Bribe ${tName} (${cost}g)`, action: () => {
          showConfirmDialog(`Bribe ${tName} for ${cost} gold?`, () => {
            transport.sendRaw({ type: 'ACTION', action: { type: BRIBE_UNIT, unitIndex: unitIdx, targetIndex: ti } });
          });
        }});
      }
    }
    if (spyItems.length > 0) {
      items.push({ separator: true });
      items.push(...spyItems);
    }
  }

  // Go-to (all units with moves)
  if (u.movesLeft > 0) {
    items.push({ label: 'Go To (G)', action: () => { selectUnit(unitIdx); enterGotoMode(); } });
  }

  // Transform terrain (engineers only)
  if (u.type === 1) {
    const tfErr = validateAction(mpGameState, mpMapBase, { type: TRANSFORM_TERRAIN, unitIndex: unitIdx }, civSlot);
    if (!tfErr) {
      const terrain = mpMapBase.getTerrain(u.gx, u.gy);
      const targetT = TERRAIN_TRANSFORM[terrain];
      const label = targetT >= 0 ? `Transform to ${TERRAIN_NAMES[targetT]}` : 'Transform';
      items.push({ label, action: () => doTransformTerrain() });
    }
  }

  // Rebase (air units only)
  if ((UNIT_DOMAIN[u.type] ?? 0) === 2 && u.movesLeft > 0) {
    items.push({ label: 'Rebase (L)', action: () => { selectUnit(unitIdx); enterRebaseMode(); } });
  }

  // Airbase (settler/engineer)
  if (u.type === 0 || u.type === 1) {
    const abErr = validateAction(mpGameState, mpMapBase, { type: WORKER_ORDER, unitIndex: unitIdx, order: 'airbase' }, civSlot);
    if (!abErr) items.push({ label: 'Build Airbase', action: () => {
      pendingAutoAdvanceFrom = unitIdx;
      transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: unitIdx, order: 'airbase' } });
    }});
  }

  // Disband (always available for live units)
  items.push({ separator: true });
  items.push({
    label: 'Disband',
    action: () => {
      showConfirmDialog(`Disband ${UNIT_NAMES[u.type]}?`, () => {
        transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: unitIdx, order: 'disband' } });
      });
    },
  });

  return items;
}

let unitMenuDefaultAction = null; // the default action (Enter key triggers this)
let unitMenuHighlightIdx = -1;   // index of highlighted button (for keyboard nav)
let unitMenuButtons = [];        // all actionable buttons in current menu

function showUnitMenu(clientX, clientY, items) {
  unitMenu.innerHTML = '';
  unitMenu.classList.remove('visible');
  unitMenuDefaultAction = null;
  unitMenuHighlightIdx = -1;
  unitMenuButtons = [];
  if (items.length === 0) return;

  let firstDefault = null;

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
      const img = item.sprite;
      img.className = 'unit-menu-sprite';
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
    unitMenuButtons.push({ btn, action: item.action });

    // Mark isDefault items (e.g. Move) or use the first actionable item
    if (item.isDefault && !firstDefault) {
      firstDefault = { btn, action: item.action, idx: unitMenuButtons.length - 1 };
    }
  }

  // Highlight the default item (or first item if none marked)
  const def = firstDefault || (unitMenuButtons.length > 0 ? { ...unitMenuButtons[0], idx: 0 } : null);
  if (def) {
    unitMenuDefaultAction = def.action;
    unitMenuHighlightIdx = def.idx;
    def.btn.classList.add('unit-menu-highlight');
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
  unitMenuDefaultAction = null;
  unitMenuHighlightIdx = -1;
  unitMenuButtons = [];
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
  if (!unitMenu.classList.contains('visible')) return;
  if (e.key === 'Escape') { hideUnitMenu(); e.preventDefault(); return; }

  // Enter: execute highlighted/default item
  if (e.key === 'Enter' && unitMenuDefaultAction) {
    e.preventDefault();
    const action = unitMenuDefaultAction;
    hideUnitMenu();
    action();
    return;
  }

  // Arrow Up/Down: navigate menu items
  if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && unitMenuButtons.length > 0) {
    e.preventDefault();
    // Remove old highlight
    if (unitMenuHighlightIdx >= 0) unitMenuButtons[unitMenuHighlightIdx].btn.classList.remove('unit-menu-highlight');
    // Move index
    if (e.key === 'ArrowDown') {
      unitMenuHighlightIdx = (unitMenuHighlightIdx + 1) % unitMenuButtons.length;
    } else {
      unitMenuHighlightIdx = (unitMenuHighlightIdx - 1 + unitMenuButtons.length) % unitMenuButtons.length;
    }
    // Apply new highlight
    unitMenuButtons[unitMenuHighlightIdx].btn.classList.add('unit-menu-highlight');
    unitMenuDefaultAction = unitMenuButtons[unitMenuHighlightIdx].action;
    unitMenuButtons[unitMenuHighlightIdx].btn.scrollIntoView({ block: 'nearest' });
    return;
  }
});

// ═══════════════════════════════════════════════════════════════════
// CHAT / EVENT LOG — Trevdor-style toast + message panel
// ═══════════════════════════════════════════════════════════════════
const chatPanel = document.getElementById('chatPanel');
const chatBox = document.getElementById('chatBox');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatBadge = document.getElementById('chatBadge');
const chatToastStack = document.getElementById('chatToastStack');
let chatOpen = false;
let chatUnread = 0;

function showChatPanel() {
  chatPanel.classList.remove('hidden');
}

function handleChatMessage(msg, isHistory) {
  // Ensure chat panel is visible in game scene
  if (currentScene === 'game') showChatPanel();

  // Build message element
  const el = document.createElement('div');
  el.className = 'chatMsg' + (msg.isEvent ? ' event' : '');
  if (msg.name && !msg.isEvent) {
    const sender = document.createElement('span');
    sender.className = 'chatSender';
    sender.textContent = msg.name;
    if (msg.seat != null) {
      const civSlot = mpSeatCivMap?.[msg.seat];
      if (civSlot != null) sender.style.color = CIV_COLORS[civSlot] || '#fff';
    }
    el.appendChild(sender);
    el.appendChild(document.createTextNode(' '));
  }
  const textEl = document.createElement('span');
  textEl.textContent = msg.text;
  el.appendChild(textEl);
  chatMessages.appendChild(el);

  // Auto-scroll
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Toast + badge (skip for history replay)
  if (!isHistory) {
    if (!chatOpen) {
      chatUnread++;
      chatBadge.textContent = chatUnread;
      chatBadge.classList.remove('hidden');
      // Toast
      const toast = document.createElement('div');
      toast.className = 'chatToast' + (msg.isEvent ? ' event' : '');
      toast.textContent = msg.isEvent ? msg.text : `${msg.name || '?'}: ${msg.text}`;
      chatToastStack.appendChild(toast);
      setTimeout(() => toast.remove(), 5000);
    }
  }
}

function toggleChat() {
  chatOpen = !chatOpen;
  chatBox.classList.toggle('hidden', !chatOpen);
  if (chatOpen) {
    chatUnread = 0;
    chatBadge.classList.add('hidden');
    chatMessages.scrollTop = chatMessages.scrollHeight;
    chatInput.focus();
  }
}

function sendChat() {
  const text = chatInput.value.trim();
  if (!text) return;
  transport.sendRaw({ type: 'SAY', text });
  chatInput.value = '';
}

chatToggleBtn.addEventListener('click', toggleChat);
chatSendBtn.addEventListener('click', sendChat);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); sendChat(); }
  e.stopPropagation(); // don't trigger game keybinds
});

// ═══════════════════════════════════════════════════════════════════
// CIVILOPEDIA — tabbed dialog with unit/building/wonder/tech/terrain/govt pages
// ═══════════════════════════════════════════════════════════════════
function showCivpedia(initialTab) {
  if (document.getElementById('civpedia-dialog')) return;

  const tabs = [
    { id: 'units', label: 'Units' },
    { id: 'buildings', label: 'Buildings' },
    { id: 'wonders', label: 'Wonders' },
    { id: 'advances', label: 'Advances' },
    { id: 'terrain', label: 'Terrain' },
    { id: 'govts', label: 'Governments' },
  ];

  createCiv2Dialog('civpedia-dialog', 'Civilopedia', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:380px';

    // Tab bar
    const tabBar = document.createElement('div');
    tabBar.className = 'civpedia-tabs';
    tabs.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'civpedia-tab' + (t.id === (initialTab || 'units') ? ' active' : '');
      btn.textContent = t.label;
      btn.dataset.tab = t.id;
      btn.addEventListener('click', () => {
        tabBar.querySelectorAll('.civpedia-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panel.querySelectorAll('.civpedia-page').forEach(p => p.classList.remove('active'));
        panel.querySelector(`[data-page="${t.id}"]`).classList.add('active');
      });
      tabBar.appendChild(btn);
    });
    panel.appendChild(tabBar);

    const content = document.createElement('div');
    content.style.cssText = 'overflow-y:auto;flex:1';
    panel.appendChild(content);

    // Build pages
    tabs.forEach(t => {
      const page = document.createElement('div');
      page.className = 'civpedia-page' + (t.id === (initialTab || 'units') ? ' active' : '');
      page.dataset.page = t.id;

      if (t.id === 'units') {
        UNIT_NAMES.forEach((name, i) => {
          if (!name) return;
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Attack</span><span class="civpedia-stat-value">${UNIT_ATK[i] ?? 0}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Defense</span><span class="civpedia-stat-value">${UNIT_DEF[i] ?? 0}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Moves</span><span class="civpedia-stat-value">${UNIT_MOVE_POINTS[i] ?? 1}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">HP</span><span class="civpedia-stat-value">${UNIT_HP[i] ?? 10}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Cost</span><span class="civpedia-stat-value">${UNIT_COSTS[i] / 10}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Domain</span><span class="civpedia-stat-value">${['Land','Sea','Air'][UNIT_DOMAIN[i] ?? 0]}</span></div>`;
          page.appendChild(entry);
        });
      } else if (t.id === 'buildings') {
        for (let id = 1; id <= 38; id++) {
          const name = IMPROVE_NAMES[id];
          if (!name) continue;
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Cost</span><span class="civpedia-stat-value">${IMPROVE_COSTS[id] / 10}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Maintenance</span><span class="civpedia-stat-value">${IMPROVE_MAINTENANCE[id]} gold/turn</span></div>`;
          page.appendChild(entry);
        }
      } else if (t.id === 'wonders') {
        WONDER_NAMES.forEach((name, i) => {
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Cost</span><span class="civpedia-stat-value">${WONDER_COSTS[i] / 10}</span></div>`;
          page.appendChild(entry);
        });
      } else if (t.id === 'advances') {
        ADVANCE_NAMES.forEach((name, i) => {
          if (!name) return;
          const [p1, p2] = ADVANCE_PREREQS[i] || [-1, -1];
          const prereqs = [];
          if (p1 >= 0 && ADVANCE_NAMES[p1]) prereqs.push(ADVANCE_NAMES[p1]);
          if (p2 >= 0 && ADVANCE_NAMES[p2]) prereqs.push(ADVANCE_NAMES[p2]);
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            (prereqs.length ? `<div class="civpedia-stat"><span class="civpedia-stat-label">Requires</span><span class="civpedia-stat-value">${prereqs.join(', ')}</span></div>` : '');
          page.appendChild(entry);
        });
      } else if (t.id === 'terrain') {
        TERRAIN_NAMES.forEach((name, i) => {
          const base = TERRAIN_BASE[i];
          if (!base) return;
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Food</span><span class="civpedia-stat-value">${base[0]}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Shields</span><span class="civpedia-stat-value">${base[1]}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Trade</span><span class="civpedia-stat-value">${base[2]}</span></div>` +
            (TERRAIN_TRANSFORM[i] >= 0 ? `<div class="civpedia-stat"><span class="civpedia-stat-label">Transforms to</span><span class="civpedia-stat-value">${TERRAIN_NAMES[TERRAIN_TRANSFORM[i]]}</span></div>` : '');
          page.appendChild(entry);
        });
      } else if (t.id === 'govts') {
        GOVERNMENT_NAMES.forEach((name, i) => {
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Max Rate</span><span class="civpedia-stat-value">${(GOVT_MAX_RATE[name.toLowerCase()] ?? 10) * 10}%</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Max Science</span><span class="civpedia-stat-value">${(GOVT_MAX_SCIENCE[name.toLowerCase()] ?? 10) * 10}%</span></div>`;
          page.appendChild(entry);
        });
      }

      content.appendChild(page);
    });
  });
}

// ═══════════════════════════════════════════════════════════════════
// DEMOGRAPHICS — population, GNP, military, land area
// ═══════════════════════════════════════════════════════════════════
function showDemographics() {
  if (!mpGameState || mpCivSlot == null) return;
  if (document.getElementById('demographics-dialog')) return;

  const gs = mpGameState;
  const civSlot = mpCivSlot;

  // Population: sum of city sizes × base (each pop = ~10,000)
  const myCities = gs.cities.filter(c => c.owner === civSlot && c.size > 0);
  let pop = 0;
  for (const c of myCities) pop += c.size * 10000;

  // GNP: sum of trade across cities
  let gnp = 0;
  if (mpMapBase) {
    for (const c of myCities) {
      const tradeData = calcCityTrade(c, gs, mpMapBase);
      if (tradeData) gnp += tradeData.totalTrade || 0;
    }
  }

  // Military: count live military units
  const myUnits = gs.units.filter(u => u.owner === civSlot && u.gx >= 0);
  const militaryUnits = myUnits.filter(u => (UNIT_ATK[u.type] || 0) > 0 || (UNIT_DEF[u.type] || 0) > 0);
  let milStrength = 0;
  for (const u of militaryUnits) milStrength += (UNIT_ATK[u.type] || 0) + (UNIT_DEF[u.type] || 0);

  // Land area: count explored tiles owned
  let landArea = 0;
  if (mpMapBase?.tileData) {
    for (const tile of mpMapBase.tileData) {
      if (tile && tile.tileOwnership === civSlot) landArea++;
    }
  }

  // Treasury
  const treasury = gs.civs?.[civSlot]?.treasury || 0;

  createCiv2Dialog('demographics-dialog', 'Demographics', panel => {
    panel.innerHTML = `<table class="demo-table">
      <tr><th>Category</th><th>Value</th></tr>
      <tr><td>Population</td><td>${pop.toLocaleString()}</td></tr>
      <tr><td>Cities</td><td>${myCities.length}</td></tr>
      <tr><td>GNP (trade)</td><td>${gnp}</td></tr>
      <tr><td>Treasury</td><td>${treasury} gold</td></tr>
      <tr><td>Military Units</td><td>${militaryUnits.length}</td></tr>
      <tr><td>Military Strength</td><td>${milStrength}</td></tr>
      <tr><td>Total Units</td><td>${myUnits.length}</td></tr>
      <tr><td>Land Area</td><td>${landArea} tiles</td></tr>
    </table>`;
  });
}

// ═══════════════════════════════════════════════════════════════════
// CITY LIST (F4) — sortable table of all your cities
// ═══════════════════════════════════════════════════════════════════
function showCityList() {
  if (!mpGameState || mpCivSlot == null) return;
  if (document.getElementById('citylist-dialog')) return;

  const gs = mpGameState;
  const civSlot = mpCivSlot;
  const myCities = [];
  for (let ci = 0; ci < gs.cities.length; ci++) {
    const c = gs.cities[ci];
    if (c.owner === civSlot && c.size > 0) myCities.push({ city: c, index: ci });
  }

  if (myCities.length === 0) {
    showOverlayMessage('No cities');
    return;
  }

  // Compute city data
  const rows = myCities.map(({ city, index }) => {
    let foodSurplus = 0, shieldProd = 0, trade = 0;
    if (mpMapBase) {
      const fs = calcFoodSurplus(city, index, gs, mpMapBase, gs.units);
      foodSurplus = fs?.surplus ?? 0;
      const sp = calcShieldProduction(city, index, gs, mpMapBase, gs.units);
      shieldProd = sp?.netShields ?? 0;
      const td = calcCityTrade(city, index, gs, mpMapBase);
      trade = td?.netTrade ?? 0;
    }
    const buildingCount = city.buildings ? (city.buildings.size || 0) : 0;
    return { city, index, name: city.name, size: city.size, foodSurplus, shieldProd, trade, buildingCount };
  });

  let sortCol = 'name';
  let sortAsc = true;

  const { overlay, dismiss } = createCiv2Dialog('citylist-dialog', 'City Advisor', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:420px';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow-y:auto;flex:1';
    panel.appendChild(wrapper);

    function renderTable() {
      const cols = [
        { key: 'name', label: 'City' },
        { key: 'size', label: 'Size', numeric: true },
        { key: 'foodSurplus', label: 'Food', numeric: true },
        { key: 'shieldProd', label: 'Shields', numeric: true },
        { key: 'trade', label: 'Trade', numeric: true },
        { key: 'buildingCount', label: 'Buildings', numeric: true },
      ];

      const sorted = [...rows].sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol];
        let cmp = 0;
        if (typeof av === 'string') cmp = av.localeCompare(bv);
        else cmp = av - bv;
        return sortAsc ? cmp : -cmp;
      });

      let html = '<table class="advisor-table"><thead><tr>';
      for (const col of cols) {
        const arrow = sortCol === col.key ? (sortAsc ? ' \u25B2' : ' \u25BC') : '';
        html += `<th data-col="${col.key}">${col.label}<span class="sort-arrow">${arrow}</span></th>`;
      }
      html += '</tr></thead><tbody>';
      for (const r of sorted) {
        html += `<tr class="clickable" data-ci="${r.index}">`;
        html += `<td>${r.name}</td>`;
        html += `<td class="num">${r.size}</td>`;
        html += `<td class="num">${r.foodSurplus}</td>`;
        html += `<td class="num">${r.shieldProd}</td>`;
        html += `<td class="num">${r.trade}</td>`;
        html += `<td class="num">${r.buildingCount}</td>`;
        html += '</tr>';
      }
      html += '</tbody></table>';
      wrapper.innerHTML = html;

      // Attach sort handlers
      wrapper.querySelectorAll('th[data-col]').forEach(th => {
        th.addEventListener('click', () => {
          const col = th.dataset.col;
          if (sortCol === col) sortAsc = !sortAsc;
          else { sortCol = col; sortAsc = true; }
          renderTable();
        });
      });

      // Attach row click handlers
      wrapper.querySelectorAll('tr[data-ci]').forEach(tr => {
        tr.addEventListener('click', () => {
          const ci = parseInt(tr.dataset.ci);
          const city = gs.cities[ci];
          if (city) { dismiss(); openCityDialog(city, ci); }
        });
      });
    }

    renderTable();
  });
}

// ═══════════════════════════════════════════════════════════════════
// MILITARY ADVISOR (F2) — unit breakdown by type
// ═══════════════════════════════════════════════════════════════════
function showMilitaryAdvisor() {
  if (!mpGameState || mpCivSlot == null) return;
  if (document.getElementById('military-dialog')) return;

  const gs = mpGameState;
  const civSlot = mpCivSlot;
  const myUnits = gs.units.filter(u => u.owner === civSlot && u.gx >= 0);

  // Group by type
  const byType = {};
  for (const u of myUnits) {
    if (!byType[u.type]) byType[u.type] = { count: 0, totalAtk: 0, totalDef: 0 };
    byType[u.type].count++;
    byType[u.type].totalAtk += UNIT_ATK[u.type] || 0;
    byType[u.type].totalDef += UNIT_DEF[u.type] || 0;
  }

  const typeIds = Object.keys(byType).map(Number).sort((a, b) => a - b);
  let totalUnits = 0, totalAtk = 0, totalDef = 0;
  for (const tid of typeIds) {
    totalUnits += byType[tid].count;
    totalAtk += byType[tid].totalAtk;
    totalDef += byType[tid].totalDef;
  }

  createCiv2Dialog('military-dialog', 'Military Advisor', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:360px';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow-y:auto;flex:1';

    let html = '<table class="advisor-table"><thead><tr>';
    html += '<th>Unit Type</th><th>Count</th><th>Attack</th><th>Defense</th>';
    html += '</tr></thead><tbody>';
    for (const tid of typeIds) {
      const d = byType[tid];
      const name = UNIT_NAMES[tid] || `Unit ${tid}`;
      html += `<tr><td>${name}</td><td class="num">${d.count}</td><td class="num">${d.totalAtk}</td><td class="num">${d.totalDef}</td></tr>`;
    }
    html += '</tbody></table>';
    wrapper.innerHTML = html;
    panel.appendChild(wrapper);

    const summary = document.createElement('div');
    summary.className = 'advisor-summary';
    summary.textContent = `Total: ${totalUnits} units, ${totalAtk} attack, ${totalDef} defense`;
    panel.appendChild(summary);
  });
}

// ═══════════════════════════════════════════════════════════════════
// TRADE ADVISOR (F3) — income, expenses, net income, city breakdown
// ═══════════════════════════════════════════════════════════════════
function showTradeAdvisor() {
  if (!mpGameState || mpCivSlot == null) return;
  if (document.getElementById('trade-dialog')) return;

  const gs = mpGameState;
  const civSlot = mpCivSlot;
  const myCities = [];
  for (let ci = 0; ci < gs.cities.length; ci++) {
    const c = gs.cities[ci];
    if (c.owner === civSlot && c.size > 0) myCities.push({ city: c, index: ci });
  }

  let totalTax = 0, totalMaintenance = 0;
  const cityRows = [];
  for (const { city, index } of myCities) {
    let tax = 0, maintenance = 0, trade = 0;
    if (mpMapBase) {
      const td = calcCityTrade(city, index, gs, mpMapBase);
      if (td) {
        tax = td.tax || 0;
        trade = td.netTrade || 0;
        maintenance = td.maintenance || 0;
      }
    }
    totalTax += tax;
    totalMaintenance += maintenance;
    cityRows.push({ name: city.name, trade, tax, maintenance });
  }

  // Sort cities by trade descending
  cityRows.sort((a, b) => b.trade - a.trade);
  const netIncome = totalTax - totalMaintenance;

  createCiv2Dialog('trade-dialog', 'Trade Advisor', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:360px';

    // Summary section
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'advisor-summary';
    summaryDiv.style.marginTop = '0';
    summaryDiv.style.marginBottom = '8px';
    summaryDiv.innerHTML = `Total Income: ${totalTax} gold &middot; Expenses: ${totalMaintenance} gold &middot; ` +
      `Net: <span style="color:${netIncome >= 0 ? '#060' : '#a00'}">${netIncome >= 0 ? '+' : ''}${netIncome}</span> gold`;
    panel.appendChild(summaryDiv);

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow-y:auto;flex:1';

    let html = '<table class="advisor-table"><thead><tr>';
    html += '<th>City</th><th>Trade</th><th>Tax</th><th>Maint.</th>';
    html += '</tr></thead><tbody>';
    for (const r of cityRows) {
      html += `<tr><td>${r.name}</td><td class="num">${r.trade}</td><td class="num">${r.tax}</td><td class="num">${r.maintenance}</td></tr>`;
    }
    html += '</tbody></table>';
    wrapper.innerHTML = html;
    panel.appendChild(wrapper);
  });
}

// ═══════════════════════════════════════════════════════════════════
// SCIENCE ADVISOR (F5) — research progress, per-turn science, tech list
// ═══════════════════════════════════════════════════════════════════
function showScienceAdvisor() {
  if (!mpGameState || mpCivSlot == null) return;
  if (document.getElementById('science-dialog')) return;

  const gs = mpGameState;
  const civSlot = mpCivSlot;
  const civ = gs.civs?.[civSlot];
  const civTechs = gs.civTechs?.[civSlot] || new Set();

  // Current research
  const techId = civ?.techBeingResearched;
  const hasTarget = techId != null && techId !== 0xFF && techId >= 0 && techId < ADVANCE_NAMES.length;
  const current = civ?.researchProgress || 0;
  const cost = calcResearchCost(gs, civSlot);

  // Science per turn
  let sciPerTurn = 0;
  if (mpMapBase) {
    for (let ci = 0; ci < gs.cities.length; ci++) {
      const city = gs.cities[ci];
      if (city.owner === civSlot && city.size > 0) {
        const td = calcCityTrade(city, ci, gs, mpMapBase);
        if (td) sciPerTurn += td.sci || 0;
      }
    }
  }

  const turnsLeft = hasTarget && sciPerTurn > 0 ? Math.ceil((cost - current) / sciPerTurn) : '?';
  const available = getAvailableResearch(gs, civSlot);
  const isMyTurn = gs.turn.activeCiv === civSlot;

  const { overlay, dismiss } = createCiv2Dialog('science-dialog', 'Science Advisor', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:380px';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow-y:auto;flex:1';

    // Research status
    const statusDiv = document.createElement('div');
    statusDiv.className = 'advisor-summary';
    statusDiv.style.marginTop = '0';
    statusDiv.style.marginBottom = '8px';
    if (hasTarget) {
      statusDiv.innerHTML = `Researching: <strong>${ADVANCE_NAMES[techId]}</strong> &mdash; ${current}/${cost} (${turnsLeft} turns)<br>` +
        `Science per turn: ${sciPerTurn}`;
    } else {
      statusDiv.innerHTML = `No research target<br>Science per turn: ${sciPerTurn}`;
    }
    wrapper.appendChild(statusDiv);

    // Researched technologies
    const researchedLabel = document.createElement('div');
    researchedLabel.style.cssText = 'font:bold 13px "Times New Roman",Georgia,serif;color:#654;padding:4px 0 2px;border-bottom:1px solid #b8a88c;margin-bottom:4px';
    researchedLabel.textContent = `Known Technologies (${civTechs.size})`;
    wrapper.appendChild(researchedLabel);

    const researchedList = document.createElement('div');
    researchedList.className = 'tech-list';
    const sortedKnown = [...civTechs].sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));
    for (const id of sortedKnown) {
      const chip = document.createElement('span');
      chip.className = 'tech-chip';
      chip.textContent = ADVANCE_NAMES[id] || `Tech ${id}`;
      researchedList.appendChild(chip);
    }
    wrapper.appendChild(researchedList);

    // Available technologies
    if (available.length > 0) {
      const availLabel = document.createElement('div');
      availLabel.style.cssText = 'font:bold 13px "Times New Roman",Georgia,serif;color:#654;padding:8px 0 2px;border-bottom:1px solid #b8a88c;margin-bottom:4px';
      availLabel.textContent = `Available to Research (${available.length})`;
      wrapper.appendChild(availLabel);

      const availList = document.createElement('div');
      availList.className = 'tech-list';
      const sortedAvail = [...available].sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));
      for (const id of sortedAvail) {
        const chip = document.createElement('span');
        chip.className = 'tech-chip available';
        chip.textContent = ADVANCE_NAMES[id] || `Tech ${id}`;
        chip.title = 'Click to research';
        if (isMyTurn) {
          chip.addEventListener('click', () => {
            dismiss();
            transport.sendRaw({ type: 'ACTION', action: { type: SET_RESEARCH, advanceId: id } });
          });
        }
        availList.appendChild(chip);
      }
      wrapper.appendChild(availList);
    }

    panel.appendChild(wrapper);
  });
}

// ═══════════════════════════════════════════════════════════════════
// GO-TO MODE — click to set A* path, auto-move each turn
// ═══════════════════════════════════════════════════════════════════
let gotoMode = false;

function enterGotoMode() {
  if (mpSelectedUnit == null || !mpGameState || !mpMapBase) return;
  gotoMode = true;
  document.getElementById('map-container').style.cursor = 'crosshair';
}

function exitGotoMode() {
  gotoMode = false;
  document.getElementById('map-container').style.cursor = '';
}

function handleGotoClick(tileGx, tileGy) {
  if (!gotoMode || mpSelectedUnit == null) { exitGotoMode(); return; }
  const u = mpGameState.units[mpSelectedUnit];
  if (!u || u.gx < 0) { exitGotoMode(); return; }

  const path = findPath(u.type, u.gx, u.gy, tileGx, tileGy, mpMapBase, u.owner, mpGameState.units, mpGameState.cities);
  if (!path || path.length === 0) {
    showOverlayMessage('No path found');
    exitGotoMode();
    return;
  }

  transport.sendRaw({
    type: 'ACTION',
    action: { type: GOTO, unitIndex: mpSelectedUnit, targetGx: tileGx, targetGy: tileGy, path },
  });
  pendingAutoAdvanceFrom = mpSelectedUnit;
  exitGotoMode();
}

// ═══════════════════════════════════════════════════════════════════
// BOMBARDMENT — air/naval ranged attack
// ═══════════════════════════════════════════════════════════════════
function doBombard(unitIndex, targetGx, targetGy) {
  transport.sendRaw({
    type: 'ACTION',
    action: { type: BOMBARD, unitIndex, targetGx, targetGy },
  });
}

// ═══════════════════════════════════════════════════════════════════
// AIR REBASE — transfer air unit to friendly city/carrier/airbase
// ═══════════════════════════════════════════════════════════════════
let rebaseMode = false;

function enterRebaseMode() {
  if (mpSelectedUnit == null || !mpGameState) return;
  const u = mpGameState.units[mpSelectedUnit];
  if (!u || (UNIT_DOMAIN[u.type] ?? 0) !== 2) return;
  rebaseMode = true;
  document.getElementById('map-container').style.cursor = 'crosshair';
}

function exitRebaseMode() {
  rebaseMode = false;
  document.getElementById('map-container').style.cursor = '';
}

function handleRebaseClick(tileGx, tileGy) {
  if (!rebaseMode || mpSelectedUnit == null) { exitRebaseMode(); return; }
  transport.sendRaw({
    type: 'ACTION',
    action: { type: REBASE, unitIndex: mpSelectedUnit, targetGx: tileGx, targetGy: tileGy },
  });
  pendingAutoAdvanceFrom = mpSelectedUnit;
  exitRebaseMode();
}

// ═══════════════════════════════════════════════════════════════════
// TERRAIN TRANSFORM — engineer transforms terrain
// ═══════════════════════════════════════════════════════════════════
function doTransformTerrain() {
  if (mpSelectedUnit == null || !mpGameState) return;
  const u = mpGameState.units[mpSelectedUnit];
  if (!u || u.type !== 1) return; // Engineers only
  transport.sendRaw({
    type: 'ACTION',
    action: { type: TRANSFORM_TERRAIN, unitIndex: mpSelectedUnit },
  });
  pendingAutoAdvanceFrom = mpSelectedUnit;
}

// ═══════════════════════════════════════════════════════════════════
// ADDITIONAL KEYBINDINGS (game scene, non-turn-restricted)
// ═══════════════════════════════════════════════════════════════════
window.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
  if (currentScene !== 'game') return;

  // Escape: cancel goto/rebase mode
  if (e.key === 'Escape' && (gotoMode || rebaseMode)) {
    e.preventDefault();
    exitGotoMode();
    exitRebaseMode();
    return;
  }

  // F1: Civilopedia (available anytime)
  if (e.key === 'F1') { e.preventDefault(); showCivpedia(); return; }
  // F2: Military Advisor
  if (e.key === 'F2') { e.preventDefault(); showMilitaryAdvisor(); return; }
  // F3: Trade Advisor
  if (e.key === 'F3') { e.preventDefault(); showTradeAdvisor(); return; }
  // F4: City List
  if (e.key === 'F4') { e.preventDefault(); showCityList(); return; }
  // F5: Science Advisor
  if (e.key === 'F5') { e.preventDefault(); showScienceAdvisor(); return; }
  // F11: Demographics (available anytime with game state)
  if (e.key === 'F11') { e.preventDefault(); showDemographics(); return; }
});

// Additional turn-restricted keybindings
window.addEventListener('keydown', e => {
  if (!mpGameState || mpGameState.turn.activeCiv !== mpCivSlot) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
  if (currentScene !== 'game') return;
  if (unitMenu.classList.contains('visible')) return;

  // G: enter Go-To mode
  if (e.key === 'g' && !e.shiftKey) {
    e.preventDefault();
    enterGotoMode();
    return;
  }

  // L: rebase air unit
  if (e.key === 'l' && !e.shiftKey) {
    e.preventDefault();
    enterRebaseMode();
    return;
  }

  // Shift+O: transform terrain (engineers)
  if (e.key === 'O' && e.shiftKey) {
    e.preventDefault();
    doTransformTerrain();
    return;
  }

  // Shift+A: airbase (settler/engineer)
  if (e.key === 'A' && e.shiftKey) {
    e.preventDefault();
    if (mpSelectedUnit != null) {
      const u = mpGameState.units[mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        pendingAutoAdvanceFrom = mpSelectedUnit;
        transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: mpSelectedUnit, order: 'airbase' } });
      }
    }
    return;
  }
});

// ── Initialize event handlers ──
initEvents(viewportCanvas, vp, {
  clampViewport, drawViewport, resizeViewport,
  handleMapClick, closeCityDialog, closeCityView,
  getMapData: () => currentMapData,
  SCROLL_STEP, getMinScale, VP_MAX_SCALE,
});
