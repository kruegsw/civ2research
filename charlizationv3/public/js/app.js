// ═══════════════════════════════════════════════════════════════════
// app.js — Thin entry point: wires modules, DOM init, file loading,
//          render trigger, controls, keyboard dispatchers
// ═══════════════════════════════════════════════════════════════════

import { S, SCROLL_STEP, getMinScale, VP_MAX_SCALE } from './state.js';
import { sfx, menuLoop } from './sound.js';
import { showOverlayMessage, showConfirmDialog, showNameCityDialog, showRateSliders, showUnitPresentDialog, showUnitSupportedDialog, registerDialogDeps } from './dialogs.js';
import { resizeViewport, clampViewport, drawViewport, invalidateFowCanvases, deferredRenderQueue } from './viewport.js';
import {
  findNextMovableUnit, shiftMercenaryQueue,
  centerOnTile, centerOnUnit, isTileInViewport, selectUnit,
  renderUnitThumbnail,
  actionToMenuItem, buildOrderMenuItems, showUnitMenu, hideUnitMenu,
  enterGotoMode, exitGotoMode, handleGotoClick,
  doBombard, enterRebaseMode, exitRebaseMode, handleRebaseClick,
  doTransformTerrain, registerUnitUiDeps,
} from './unit-ui.js';
import {
  showTechTree, showRevolutionDialog, showDiplomacyPanel,
  showResearchPicker, showMapSizePicker,
  showCivpedia, showDemographics, showCityList,
  showMilitaryAdvisor, showTradeAdvisor, showScienceAdvisor,
  registerAdvisorDeps,
} from './advisors.js';
import {
  openCityDialog, closeCityDialog, closeCityView,
  showProductionPicker,
  getCdState, setCdCity, registerCityUiDeps,
} from './city-ui.js';
import {
  renderAtomicSwap, updateTurnUI, updateUnitInfoStrip,
  initNetwork, toggleChat,
} from './network.js';

import { Civ2Parser } from '../engine/parser.js';
import { Civ2Renderer } from './renderer.js';
import { initEvents } from './events.js';
import { CIV_COLORS, UNIT_NAMES, UNIT_CARRY_CAP, UNIT_DOMAIN, ORDER_NAMES } from '../engine/defs.js';
import { getGameYearFromMap } from '../engine/year.js';
import { NUMPAD_DIR } from '../engine/movement.js';
import { getValidActions, validateAction } from '../engine/rules.js';
import { UNIT_ORDER, WORKER_ORDER, PILLAGE, GOTO, BOMBARD, BUILD_CITY } from '../engine/actions.js';
import { findPath } from '../engine/pathfinding.js';

// ═══════════════════════════════════════════════════════════════════
// DOM element initialization
// ═══════════════════════════════════════════════════════════════════
S.viewportCanvas = document.getElementById('viewport-canvas');
S.vCtx = S.viewportCanvas.getContext('2d', { colorSpace: 'srgb' });
S.unitMenu = document.getElementById('unit-menu');

// ═══════════════════════════════════════════════════════════════════
// Scene management
// ═══════════════════════════════════════════════════════════════════
function setScene(scene) {
  document.getElementById('menu-scene').style.display = scene === 'menu' ? 'flex' : 'none';
  document.getElementById('lobby-scene').style.display = scene === 'lobby' ? 'flex' : 'none';
  document.getElementById('game-scene').style.display = scene === 'game' ? '' : 'none';
  S.currentScene = scene;
  if (scene === 'game') {
    // Multiplayer: hide viewer controls, show status bar.  Viewer: show controls, hide status bar.
    const isMultiplayer = !!S.mpGameState;
    document.getElementById('controls').style.display = isMultiplayer ? 'none' : '';
    document.getElementById('status-bar').style.display = isMultiplayer ? '' : 'none';
    document.getElementById('hamburger-menu').classList.add('hidden');
    updateGameBackBtn();
    resizeViewport();
    if (S.vp.offW > 0) drawViewport();
  }
  if (scene === 'menu' && !S.menuMuted) {
    menuLoop.play().catch(() => {});
  } else if (!menuLoop.paused) {
    menuLoop.pause();
    menuLoop.currentTime = 0;
  }
}

// ═══════════════════════════════════════════════════════════════════
// Status bar game info
// ═══════════════════════════════════════════════════════════════════
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
  const goldEl = el.querySelector('.gi-gold');
  if (goldEl && S.mpGameState) {
    goldEl.addEventListener('click', () => showRateSliders());
  }
}

function updateGameBackBtn() {
  const btn = document.getElementById('game-back-btn');
  btn.innerHTML = S.gameEnteredFrom === 'lobby' ? '&larr; Lobby' : '&larr; Menu';
}

// ═══════════════════════════════════════════════════════════════════
// Auto-detect files in same directory
// ═══════════════════════════════════════════════════════════════════
(async function autoDetect() {
  if (location.protocol === 'file:') return;

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
      S.files[key] = new File([blob], name, { type: blob.type });
    } catch (_) {}
  }));

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
      S.cvFiles[id] = new File([blob], name, { type: blob.type });
    } catch (_) {}
  }));

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
          S.files.sav = new File([blob], savName, { type: 'application/octet-stream' });
          document.getElementById('sav-btn').classList.add('loaded');
          document.getElementById('sav-btn').textContent = savName;
        }
      }
    }
  } catch (_) {}

  checkReady();
})();

// ═══════════════════════════════════════════════════════════════════
// File input handlers + toggle controls
// ═══════════════════════════════════════════════════════════════════
document.getElementById('sav-input').addEventListener('change', e => {
  if (!e.target.files[0]) return;
  S.files.sav = e.target.files[0];
  document.getElementById('sav-btn').classList.add('loaded');
  document.getElementById('sav-btn').textContent = S.files.sav.name;
  checkReady();
  if (S.files.t1 && S.files.t2) {
    S.gameEnteredFrom = 'menu';
    S.currentMapData = null;
    S.mpGameState = null;
    S.mpCivSlot = null;
    updateTurnUI();
    setScene('game');
    doRender();
  }
});

function checkReady() {
  const ready = S.files.sav && S.files.t1 && S.files.t2;
  document.getElementById('render-btn').disabled = !ready;
  if (ready) {
    document.getElementById('status').textContent = 'Ready \u2014 click Render.';
  }
}

document.getElementById('render-btn').addEventListener('click', doRender);

document.getElementById('fow-toggle').addEventListener('change', () => { if (S.currentMapData) drawViewport(); });
document.getElementById('grid-toggle').addEventListener('change', () => { if (S.currentMapData) drawViewport(); });
document.getElementById('minimap-toggle').addEventListener('change', () => { if (S.currentMapData) drawViewport(); });
document.getElementById('los-toggle').addEventListener('change', () => { if (S.currentMapData) drawViewport(); });
document.getElementById('fow-civ').addEventListener('change', () => {
  if (!S.currentMapData) return;
  const val = document.getElementById('fow-civ').value;
  S.cachedFowCiv = val !== '' ? parseInt(val) : S.currentMapData.playerCiv;
  S.cachedLosData = null;
  invalidateFowCanvases();
  updateGameInfo(S.currentMapData, S.cachedFowCiv);
  drawViewport();
});

// ═══════════════════════════════════════════════════════════════════
// FOW civ selector
// ═══════════════════════════════════════════════════════════════════
function populateFowCivSelector(mapData, forceCiv) {
  const fowSelect = document.getElementById('fow-civ');
  const previousValue = fowSelect.value;
  fowSelect.innerHTML = '';
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
  S.cachedFowCiv = parseInt(fowSelect.value);
  S.cachedLosData = null;
  fowSelect.disabled = false;
}

// ═══════════════════════════════════════════════════════════════════
// Main single-player render flow
// ═══════════════════════════════════════════════════════════════════
async function doRender(options = {}) {
  if (S.rendering) return;
  S.rendering = true;
  const overlay = document.getElementById('loading-overlay');
  const msg = document.getElementById('loading-msg');
  if (!options.silent) overlay.style.display = 'flex';

  try {
    const mapData = S.currentMapData || await (async () => {
      msg.textContent = 'Loading save file...';
      const savBuf = new Uint8Array(await S.files.sav.arrayBuffer());
      msg.textContent = 'Parsing save file...';
      await new Promise(r => setTimeout(r, 10));
      const md = Civ2Parser.parse(savBuf, S.files.sav.name);
      S.currentMapData = md;
      return md;
    })();

    populateFowCivSelector(mapData);
    S.cdSprites = null;

    msg.textContent = 'Loading sprite sheets...';
    const imgPromises = [
      Civ2Renderer.loadImage(S.files.t1),
      Civ2Renderer.loadImage(S.files.t2)
    ];
    if (S.files.cities) imgPromises.push(Civ2Renderer.loadImage(S.files.cities));
    if (S.files.units) imgPromises.push(Civ2Renderer.loadImage(S.files.units));
    if (S.files.icons) imgPromises.push(Civ2Renderer.loadImage(S.files.icons));
    const imgs = await Promise.all(imgPromises);
    const t1Img = imgs[0], t2Img = imgs[1];
    let idx = 2;
    const citiesImg = S.files.cities ? imgs[idx++] : null;
    const unitsImg = S.files.units ? imgs[idx++] : null;
    const iconsImg = S.files.icons ? imgs[idx++] : null;

    msg.textContent = 'Extracting sprites...';
    await new Promise(r => setTimeout(r, 10));
    const t1Ctx = Civ2Renderer.imgToCtx(t1Img);
    const t2Ctx = Civ2Renderer.imgToCtx(t2Img);
    const citiesCtx = citiesImg ? Civ2Renderer.imgToCtx(citiesImg) : null;
    const unitsCtx = unitsImg ? Civ2Renderer.imgToCtx(unitsImg) : null;
    const iconsCtx = iconsImg ? Civ2Renderer.imgToCtx(iconsImg) : null;
    const sprites = Civ2Renderer.extractAllSprites(t1Ctx, t2Ctx, citiesCtx, unitsCtx, iconsCtx);
    Civ2Renderer.prerecolorUnits(sprites, mapData.units);
    S.mapSprites = sprites;

    const fowCivVal = document.getElementById('fow-civ').value;
    const fowCiv = fowCivVal !== '' ? parseInt(fowCivVal) : mapData.playerCiv;

    invalidateFowCanvases();
    S.gridCanvas = null;
    S.minimapCanvas = null;
    S.cachedFowCiv = fowCiv;
    S.cachedLosData = null;

    msg.textContent = 'Rendering map...';
    await new Promise(r => setTimeout(r, 10));
    const newBase = document.createElement('canvas');

    const blinkUnitTiles = [];
    if (S.mpCivSlot != null && S.mpGameState) {
      for (const u of (S.mpGameState.units || [])) {
        if (u.owner === S.mpCivSlot && u.gx >= 0) {
          blinkUnitTiles.push({ gx: u.gx, gy: u.gy });
        }
      }
    }

    const result = await Civ2Renderer.render(newBase, mapData, sprites, null,
      { fowEnabled: false, gridEnabled: false, blinkUnitTiles, selectedUnitIndex: S.mpSelectedUnit });
    S.mapCanvasBase = newBase;
    S.blinkPatches = result.terrainPatches;
    S.blinkUnitOverlay = result.blinkUnitOverlay;

    S.vp.offW = S.mapCanvasBase.width;
    S.vp.offH = S.mapCanvasBase.height;
    S.vp.wraps = (mapData.mapShape === 0);
    S.vp.wrapW = result.wrapW || S.vp.offW;
    resizeViewport();
    drawViewport();

    document.getElementById('status').textContent =
      `${mapData.mw}\u00d7${mapData.mh} | ${mapData.cities.length} cities | ` +
      `${mapData.units.length} units`;
    updateGameInfo(mapData);

    if (!options.silent) overlay.style.display = 'none';
    deferredRenderQueue(mapData, sprites, fowCiv);

  } catch (err) {
    console.error(err);
    if (!options.silent) {
      alert('Error: ' + err.message);
      overlay.style.display = 'none';
    }
  } finally {
    S.rendering = false;
  }
}

// ═══════════════════════════════════════════════════════════════════
// Map click handler (findTileAt, findCityAt, handleMapClick)
// ═══════════════════════════════════════════════════════════════════
function findTileAt(clientX, clientY) {
  if (!S.currentMapData) return null;
  const rect = S.viewportCanvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  let mx = localX / S.vp.scale + S.vp.x;
  let my = localY / S.vp.scale + S.vp.y;
  if (S.vp.wraps && S.vp.wrapW > 0) mx = ((mx % S.vp.wrapW) + S.vp.wrapW) % S.vp.wrapW;
  return Civ2Renderer.findTileAtMap(mx, my, S.currentMapData.mw, S.currentMapData.mh);
}

function findCityAt(gx, gy) {
  if (!S.currentMapData) return null;
  for (let i = 0; i < S.currentMapData.cities.length; i++) {
    const c = S.currentMapData.cities[i];
    if (c.gx === gx && c.gy === gy) return { city: c, index: i };
  }
  return null;
}

async function handleMapClick(e, isLongPress = false) {
  const tile = findTileAt(e.clientX, e.clientY);
  if (!tile) return;

  if (S.gotoMode) { handleGotoClick(tile.gx, tile.gy); return; }
  if (S.rebaseMode) { handleRebaseClick(tile.gx, tile.gy); return; }

  const isMyTurn = S.mpGameState && S.mpCivSlot != null && S.mpGameState.turn.activeCiv === S.mpCivSlot;
  const activeUnit = S.mpSelectedUnit != null ? S.mpGameState?.units[S.mpSelectedUnit] : null;
  const activeUnitOnTile = activeUnit && activeUnit.gx === tile.gx && activeUnit.gy === tile.gy;
  const cityHit = findCityAt(tile.gx, tile.gy);

  if (cityHit && !activeUnitOnTile) {
    if (isLongPress && isMyTurn && S.mpSelectedUnit != null) {
      const validActions = getValidActions(S.mpGameState, S.mpMapBase, S.mpSelectedUnit, tile);
      if (validActions.length > 0) {
        const menuItems = validActions.map(va => actionToMenuItem(va, S.mpSelectedUnit));
        showUnitMenu(e.clientX, e.clientY, menuItems);
        return;
      }
    }
    openCityDialog(cityHit.city, cityHit.index);
    return;
  }

  if (isMyTurn) {
    const tileUnits = [];
    S.mpGameState.units.forEach((u, idx) => {
      if (u.gx === tile.gx && u.gy === tile.gy && u.owner === S.mpCivSlot && u.gx >= 0) {
        tileUnits.push(idx);
      }
    });

    const activeOnThisTile = S.mpSelectedUnit != null && tileUnits.includes(S.mpSelectedUnit);

    if (tileUnits.length > 0 && !activeOnThisTile) {
      const topUnit = tileUnits[0];
      const topU = S.mpGameState.units[topUnit];

      if (!isLongPress) {
        selectUnit(topUnit);
        // If the unit has an active order, clear it so the unit becomes movable
        if (topU.orders && topU.orders !== 'none') {
          S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: topUnit, order: 'wake' } });
        }
        return;
      }

      const menuItems = [];
      if (S.mpSelectedUnit != null) {
        const moveActions = getValidActions(S.mpGameState, S.mpMapBase, S.mpSelectedUnit, tile);
        for (const va of moveActions) {
          menuItems.push(actionToMenuItem(va, S.mpSelectedUnit));
        }
      }

      if (cityHit) {
        if (menuItems.length > 0) menuItems.push({ separator: true });
        menuItems.push({
          label: 'Open City',
          action: () => openCityDialog(cityHit.city, cityHit.index),
        });
      }

      if (menuItems.length > 0) menuItems.push({ separator: true });
      menuItems.push({ header: 'Select Unit' });
      for (const idx of tileUnits) {
        const u = S.mpGameState.units[idx];
        let baseName = UNIT_NAMES[u.type] || `Unit ${u.type}`;
        if (UNIT_CARRY_CAP[u.type]) {
          const loaded = S.mpGameState.units.filter(lu => lu.gx === u.gx && lu.gy === u.gy && lu.owner === u.owner && (UNIT_DOMAIN[lu.type] ?? 0) === 0 && lu !== u && lu.gx >= 0).length;
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
              S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: idx, order: 'wake' } });
            }
          },
        });
      }

      const orderItems = buildOrderMenuItems(topUnit);
      if (topU.orders === 'sentry') {
        orderItems.unshift({
          label: 'Wake Up',
          action: () => {
            selectUnit(topUnit);
            S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: topUnit, order: 'wake' } });
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

    if (isLongPress && S.mpSelectedUnit != null && tileUnits.length === 0) {
      const validActions = getValidActions(S.mpGameState, S.mpMapBase, S.mpSelectedUnit, tile);
      const menuItems = validActions.map(va => actionToMenuItem(va, S.mpSelectedUnit));
      const selU = S.mpGameState.units[S.mpSelectedUnit];
      if (selU) {
        const bErr = validateAction(S.mpGameState, S.mpMapBase,
          { type: BOMBARD, unitIndex: S.mpSelectedUnit, targetGx: tile.gx, targetGy: tile.gy }, S.mpCivSlot);
        if (!bErr) {
          menuItems.push({ label: `Bombard (${UNIT_NAMES[selU.type]})`, action: () => doBombard(S.mpSelectedUnit, tile.gx, tile.gy) });
        }
      }
      if (menuItems.length > 0) {
        showUnitMenu(e.clientX, e.clientY, menuItems);
        return;
      }

      if (selU && selU.movesLeft > 0) {
        const gotoItems = [];
        const capturedUnit = S.mpSelectedUnit;
        gotoItems.push({
          label: 'Go To \u2192',
          action: () => {
            const u = S.mpGameState.units[capturedUnit];
            if (!u || u.gx < 0) return;
            const path = findPath(u.type, u.gx, u.gy, tile.gx, tile.gy, S.mpMapBase, u.owner, S.mpGameState.units, S.mpGameState.cities);
            if (path && path.length > 0) {
              S.transport.sendRaw({
                type: 'ACTION',
                action: { type: GOTO, unitIndex: capturedUnit, targetGx: tile.gx, targetGy: tile.gy, path },
              });
              S.pendingAutoAdvanceFrom = capturedUnit;
            } else {
              showOverlayMessage('No path found');
            }
          },
        });
        showUnitMenu(e.clientX, e.clientY, gotoItems);
        return;
      }
    }

    if (tileUnits.length > 0 && activeOnThisTile) {
      const menuItems = [];

      if (cityHit) {
        menuItems.push({
          label: 'Open City',
          action: () => openCityDialog(cityHit.city, cityHit.index),
        });
        menuItems.push({ separator: true });
      }

      if (tileUnits.length > 1) {
        menuItems.push({ header: 'Select Unit' });
        for (const idx of tileUnits) {
          const u = S.mpGameState.units[idx];
          let baseName = UNIT_NAMES[u.type] || `Unit ${u.type}`;
          if (UNIT_CARRY_CAP[u.type]) {
            const loaded = S.mpGameState.units.filter(lu => lu.gx === u.gx && lu.gy === u.gy && lu.owner === u.owner && (UNIT_DOMAIN[lu.type] ?? 0) === 0 && lu !== u && lu.gx >= 0).length;
            baseName += ` (${loaded}/${UNIT_CARRY_CAP[u.type]})`;
          }
          const orderDesc = (u.orders && u.orders !== 'none') ? ORDER_NAMES[u.orders] || u.orders : '';
          const label = orderDesc ? `${baseName} (${orderDesc}) — Wake` : baseName;
          const sprite = renderUnitThumbnail(u);
          const selected = idx === S.mpSelectedUnit;
          menuItems.push({
            label,
            sprite,
            selected,
            action: () => {
              selectUnit(idx);
              if (u.orders && u.orders !== 'none') {
                S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: idx, order: 'wake' } });
              }
            },
          });
        }
      }

      const selIdx = S.mpSelectedUnit;
      const orderItems = [];
      const tileActions = getValidActions(S.mpGameState, S.mpMapBase, selIdx, tile);
      for (const va of tileActions) {
        orderItems.push(actionToMenuItem(va, selIdx));
      }
      const selU = S.mpGameState.units[selIdx];
      if (selU && selU.orders === 'sentry') {
        orderItems.push({ label: 'Wake Up', action: () => {
          S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: selIdx, order: 'wake' } });
        }});
      }
      orderItems.push(...buildOrderMenuItems(selIdx));

      if (orderItems.length > 0) {
        if (menuItems.length > 0 && !menuItems[menuItems.length - 1].separator) {
          menuItems.push({ separator: true });
        }
        menuItems.push({ header: 'Orders' });
        menuItems.push(...orderItems);
      }

      if (tileUnits.length === 1 && !cityHit && orderItems.length === 0) {
        selectUnit(tileUnits[0]);
        return;
      }

      showUnitMenu(e.clientX, e.clientY, menuItems);
      return;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════
// Menu reveal + OK handler
// ═══════════════════════════════════════════════════════════════════
function revealMenu() {
  const layout = document.getElementById('menu-layout');
  const seal = document.getElementById('menu-seal');
  const dialog = document.getElementById('menu-dialog');
  if (layout.classList.contains('menu-open')) return;
  document.removeEventListener('click', revealMenu);
  document.removeEventListener('keydown', revealMenu);

  const first = seal.getBoundingClientRect();
  layout.classList.add('menu-open');
  const last = seal.getBoundingClientRect();
  const dx = first.left + first.width / 2 - (last.left + last.width / 2);
  const dy = first.top + first.height / 2 - (last.top + last.height / 2);
  const s = last.width > 0 ? Math.max(first.width / last.width, first.height / last.height) : 1;

  if (isFinite(s) && isFinite(dx) && isFinite(dy)) {
    seal.animate([
      { transform: `translate(${dx}px, ${dy}px) scale(${s})` },
      { transform: 'translate(0, 0) scale(1)' }
    ], { duration: 700, easing: 'ease-in-out' });
  }

  dialog.animate([
    { opacity: 0, transform: 'translateY(15px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 400, delay: 700, easing: 'ease-out', fill: 'backwards' });

  if (S.currentScene === 'menu' && menuLoop.paused) {
    menuLoop.play().catch(() => {});
  }
}

menuLoop.play().then(() => {
  document.addEventListener('click', revealMenu);
  document.addEventListener('keydown', revealMenu);
}).catch(() => {
  document.addEventListener('click', revealMenu);
  document.addEventListener('keydown', revealMenu);
});

document.getElementById('menu-ok-btn').addEventListener('click', () => {
  menuLoop.pause();
  menuLoop.currentTime = 0;
  if (!S.menuMuted) sfx('MENUOK');
  const selected = document.querySelector('input[name="menu-choice"]:checked');
  if (!selected) return;
  switch (selected.value) {
    case 'load':
      if (S.files.sav && S.files.t1 && S.files.t2) {
        S.gameEnteredFrom = 'menu';
        S.currentMapData = null;
        S.mpGameState = null;
        S.mpCivSlot = null;
        updateTurnUI();
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

document.querySelectorAll('.menu-radio:not(.disabled)').forEach(label => {
  label.addEventListener('dblclick', () => {
    document.getElementById('menu-ok-btn').click();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && S.currentScene === 'menu' && document.getElementById('menu-layout').classList.contains('menu-open')) {
    document.getElementById('menu-ok-btn').click();
  }
});

// ═══════════════════════════════════════════════════════════════════
// Lobby button handlers
// ═══════════════════════════════════════════════════════════════════
document.getElementById('restart-btn').addEventListener('click', () => {
  showMapSizePicker();
});

// ═══════════════════════════════════════════════════════════════════
// Status bar click handlers (gold → tax rates, research → picker)
// ═══════════════════════════════════════════════════════════════════
document.getElementById('status-gold').addEventListener('click', () => {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  showRateSliders();
});

document.getElementById('status-research').addEventListener('click', () => {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  showResearchPicker();
});

// ═══════════════════════════════════════════════════════════════════
// Hamburger menu
// ═══════════════════════════════════════════════════════════════════
const hamburgerBtn = document.getElementById('hamburger-btn');
const hamburgerMenu = document.getElementById('hamburger-menu');

function closeHamburgerMenu() {
  hamburgerMenu.classList.add('hidden');
}

function updateHamburgerChecks() {
  const gridCk = document.getElementById('menu-grid-check');
  const fowCk = document.getElementById('menu-fow-check');
  const losCk = document.getElementById('menu-los-check');
  const mmCk = document.getElementById('menu-minimap-check');
  if (gridCk) gridCk.classList.toggle('checked', document.getElementById('grid-toggle').checked);
  if (fowCk) fowCk.classList.toggle('checked', document.getElementById('fow-toggle').checked);
  if (losCk) losCk.classList.toggle('checked', document.getElementById('los-toggle').checked);
  if (mmCk) mmCk.classList.toggle('checked', document.getElementById('minimap-toggle').checked);
}

hamburgerBtn.addEventListener('click', () => {
  const isHidden = hamburgerMenu.classList.contains('hidden');
  if (isHidden) {
    updateHamburgerChecks();
    hamburgerMenu.classList.remove('hidden');
  } else {
    closeHamburgerMenu();
  }
});

// Close menu when clicking outside
document.addEventListener('pointerdown', e => {
  if (!hamburgerMenu.classList.contains('hidden')
      && !hamburgerMenu.contains(e.target)
      && e.target !== hamburgerBtn) {
    closeHamburgerMenu();
  }
});

// Hamburger menu action dispatcher
const HAMBURGER_ACTIONS = {
  'back': () => {
    document.getElementById('game-back-btn').click();
  },
  'new-map': () => showMapSizePicker(),
  'advisor-civilopedia': () => showCivpedia(),
  'advisor-military': () => showMilitaryAdvisor(),
  'advisor-trade': () => showTradeAdvisor(),
  'advisor-city': () => showCityList(),
  'advisor-science': () => showScienceAdvisor(),
  'advisor-demographics': () => showDemographics(),
  'advisor-taxrates': () => showRateSliders(),
  'view-techtree': () => showTechTree(),
  'view-diplomacy': () => showDiplomacyPanel(),
  'toggle-grid': () => {
    const el = document.getElementById('grid-toggle');
    el.checked = !el.checked;
    el.dispatchEvent(new Event('change'));
    updateHamburgerChecks();
    return true; // don't close menu
  },
  'toggle-fow': () => {
    const el = document.getElementById('fow-toggle');
    el.checked = !el.checked;
    el.dispatchEvent(new Event('change'));
    updateHamburgerChecks();
    return true; // don't close menu
  },
  'toggle-los': () => {
    const el = document.getElementById('los-toggle');
    el.checked = !el.checked;
    el.dispatchEvent(new Event('change'));
    updateHamburgerChecks();
    return true; // don't close menu
  },
  'toggle-minimap': () => {
    const el = document.getElementById('minimap-toggle');
    el.checked = !el.checked;
    el.dispatchEvent(new Event('change'));
    updateHamburgerChecks();
    return true; // don't close menu
  },
};

for (const item of hamburgerMenu.querySelectorAll('.menu-item')) {
  item.addEventListener('click', () => {
    const action = item.dataset.action;
    const fn = HAMBURGER_ACTIONS[action];
    if (fn) {
      const keepOpen = fn();
      if (!keepOpen) closeHamburgerMenu();
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// Keyboard handlers
// ═══════════════════════════════════════════════════════════════════

// Dialog guard: true if any modal dialog is open (game keys should not fire)
function isDialogOpen() {
  return document.querySelector('.civ2-dialog-overlay')
    || document.getElementById('citydialog-overlay')?.style.display === 'flex'
    || document.getElementById('rate-sliders')
    || document.getElementById('production-picker');
}

// Text-input guard: true only for elements that accept typed text (not checkboxes/radios/buttons)
function isTextInput(el) {
  if (el.tagName === 'TEXTAREA' || el.isContentEditable) return true;
  if (el.tagName === 'SELECT') return true;
  if (el.tagName === 'INPUT') {
    const t = el.type;
    return t === 'text' || t === 'password' || t === 'search' || t === 'email'
        || t === 'url' || t === 'tel' || t === 'number';
  }
  return false;
}

// Blur buttons/checkboxes in game UI after click so they don't steal keyboard focus
for (const container of [document.getElementById('controls'), document.getElementById('status-bar')]) {
  if (container) {
    container.addEventListener('mouseup', () => {
      const ae = document.activeElement;
      if (ae && ae !== document.body && !isTextInput(ae)) ae.blur();
    });
  }
}

// ── Turn-restricted keys ──
window.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey) return; // let browser shortcuts (Ctrl+R, Ctrl+Shift+R, etc.) pass through
  if (!S.mpGameState || S.mpGameState.turn.activeCiv !== S.mpCivSlot) return;
  if (isTextInput(e.target)) return;
  if (S.currentScene !== 'game') return;
  // Unit context menu: Enter accepts, Escape cancels, arrows navigate
  if (S.unitMenu.classList.contains('visible')) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopImmediatePropagation(); // prevent non-restricted handler from opening city dialog
      if (S.unitMenuDefaultAction) {
        const action = S.unitMenuDefaultAction;
        hideUnitMenu();
        action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hideUnitMenu();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const btns = S.unitMenuButtons;
      if (btns.length > 0) {
        if (S.unitMenuHighlightIdx >= 0) btns[S.unitMenuHighlightIdx].btn.classList.remove('unit-menu-highlight');
        const delta = e.key === 'ArrowUp' ? -1 : 1;
        S.unitMenuHighlightIdx = (S.unitMenuHighlightIdx + delta + btns.length) % btns.length;
        btns[S.unitMenuHighlightIdx].btn.classList.add('unit-menu-highlight');
        S.unitMenuDefaultAction = btns[S.unitMenuHighlightIdx].action;
      }
    }
    return;
  }
  if (isDialogOpen()) return;

  // Tab: cycle to next movable unit
  if (e.key === 'Tab') {
    e.preventDefault();
    const next = shiftMercenaryQueue() ?? findNextMovableUnit(S.mpSelectedUnit ?? -1);
    if (next != null) {
      selectUnit(next);
      const u = S.mpGameState.units[next];
      if (u && !isTileInViewport(u.gx, u.gy)) centerOnUnit(u);
    }
    return;
  }

  // W: wait — skip to next unit, come back later
  if ((e.key === 'w' || e.key === 'W') && !e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const next = findNextMovableUnit(S.mpSelectedUnit);
      if (next != null && next !== S.mpSelectedUnit) {
        selectUnit(next);
        const u = S.mpGameState.units[next];
        if (u && !isTileInViewport(u.gx, u.gy)) centerOnUnit(u);
      }
    }
    return;
  }

  // Enter: end turn if no movable units (city dialog part moved to non-restricted handler)
  if (e.key === 'Enter') {
    e.preventDefault();
    if (findNextMovableUnit(-1) == null) {
      sfx('ENDOTURN');
      S.transport.sendRaw({ type: 'ACTION', action: { type: 'END_TURN' } });
      e.stopImmediatePropagation(); // prevent non-restricted handler from also opening city dialog
    }
    return;
  }

  // B: build city (settlers)
  if (e.key === 'b' || e.key === 'B') {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u && u.type === 0) {
        const err = validateAction(S.mpGameState, S.mpMapBase, { type: BUILD_CITY, unitIndex: S.mpSelectedUnit }, S.mpCivSlot);
        if (err) return;
        showNameCityDialog(S.mpSelectedUnit);
      }
    }
    return;
  }

  // E: build airbase (settlers/engineers)
  if (e.key === 'e' && !e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
        S.transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: S.mpSelectedUnit, order: 'airbase' } });
      }
    }
    return;
  }

  // F: fortify unit
  if (e.key === 'f' && !e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
      S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: S.mpSelectedUnit, order: 'fortify' } });
    }
    return;
  }

  // G: enter go-to mode
  if (e.key === 'g' && !e.shiftKey) {
    e.preventDefault();
    enterGotoMode();
    return;
  }

  // I: build irrigation (settlers/engineers)
  if (e.key === 'i' && !e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
        S.transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: S.mpSelectedUnit, order: 'irrigation' } });
      }
    }
    return;
  }

  // L: rebase air unit
  if (e.key === 'l' && !e.shiftKey) {
    e.preventDefault();
    enterRebaseMode();
    return;
  }

  // M: build mine (settlers/engineers)
  if (e.key === 'm' && !e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
        S.transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: S.mpSelectedUnit, order: 'mine' } });
      }
    }
    return;
  }

  // O: build fortress (settlers/engineers)
  if (e.key === 'o' && !e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
        S.transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: S.mpSelectedUnit, order: 'fortress' } });
      }
    }
    return;
  }

  // P (lowercase): pillage (any unit)
  if (e.key === 'p' && !e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const err = validateAction(S.mpGameState, S.mpMapBase, { type: PILLAGE, unitIndex: S.mpSelectedUnit }, S.mpCivSlot);
      if (!err) {
        S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
        S.transport.sendRaw({ type: 'ACTION', action: { type: PILLAGE, unitIndex: S.mpSelectedUnit } });
      }
    }
    return;
  }

  // R: build road (settlers/engineers)
  if (e.key === 'r' && !e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
        S.transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: S.mpSelectedUnit, order: 'road' } });
      }
    }
    return;
  }

  // S: sentry
  if (e.key === 's' && !e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
      S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: S.mpSelectedUnit, order: 'sentry' } });
    }
    return;
  }

  // Space: skip turn for this unit
  if (e.key === ' ') {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
      S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: S.mpSelectedUnit, order: 'skip' } });
    }
    return;
  }

  // Shift+D: disband unit (with confirm) — diplomacy panel moved to non-restricted handler
  if (e.key === 'D' && e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u) {
        const idx = S.mpSelectedUnit;
        showConfirmDialog(`Disband ${UNIT_NAMES[u.type]}?`, () => {
          S.pendingAutoAdvanceFrom = idx;
          S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: idx, order: 'disband' } });
        }, 'Disband Unit?');
        return;
      }
    }
    return;
  }

  // Shift+O: transform terrain (engineers)
  if (e.key === 'O' && e.shiftKey) {
    e.preventDefault();
    doTransformTerrain();
    return;
  }

  // Shift+P: clean pollution (settlers/engineers)
  if (e.key === 'P' && e.shiftKey) {
    e.preventDefault();
    if (S.mpSelectedUnit != null) {
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u && (u.type === 0 || u.type === 1)) {
        S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
        S.transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: S.mpSelectedUnit, order: 'pollution' } });
      }
    }
    return;
  }

  // Shift+R: revolution (change government)
  if (e.key === 'R' && e.shiftKey) {
    e.preventDefault();
    showRevolutionDialog();
    return;
  }

  // Numpad movement
  const NUMPAD_CODE_DIR = {
    'Numpad1': 'SW', 'Numpad2': 'S', 'Numpad3': 'SE',
    'Numpad4': 'W',                  'Numpad6': 'E',
    'Numpad7': 'NW', 'Numpad8': 'N', 'Numpad9': 'NE',
  };
  const dir = NUMPAD_DIR[e.key] || NUMPAD_CODE_DIR[e.code];
  if (!dir) return;
  e.preventDefault();

  if (S.mpSelectedUnit == null) {
    selectUnit(findNextMovableUnit(-1));
  }
  if (S.mpSelectedUnit == null) return;

  S.pendingMoveUnit = S.mpSelectedUnit;
  S.pendingAutoAdvanceFrom = S.mpSelectedUnit;

  S.transport.sendRaw({
    type: 'ACTION',
    action: { type: 'MOVE_UNIT', unitIndex: S.mpSelectedUnit, dir },
  });
});

// ── Non-turn-restricted keys (advisors, escape) ──
window.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey) return; // let browser shortcuts pass through
  if (isTextInput(e.target)) return;
  if (S.currentScene !== 'game') return;

  // Escape: close hamburger menu if open
  if (e.key === 'Escape' && !document.getElementById('hamburger-menu').classList.contains('hidden')) {
    e.preventDefault();
    document.getElementById('hamburger-menu').classList.add('hidden');
    return;
  }

  // Escape: cancel goto/rebase mode
  if (e.key === 'Escape' && (S.gotoMode || S.rebaseMode)) {
    e.preventDefault();
    exitGotoMode();
    exitRebaseMode();
    return;
  }

  // Escape: close chat panel if open
  if (e.key === 'Escape' && S.chatOpen) {
    e.preventDefault();
    toggleChat();
    return;
  }

  // Enter/Escape: close city dialog if open
  if ((e.key === 'Enter' || e.key === 'Escape') && document.getElementById('citydialog-overlay')?.style.display === 'flex') {
    e.preventDefault();
    closeCityDialog();
    return;
  }

  // Enter: open city dialog if unit is on a city (view-only, no turn check needed)
  // Skip if unit menu is open — Enter should accept the menu action, not open city
  if (e.key === 'Enter' && S.mpGameState && S.mpSelectedUnit != null && !S.unitMenu.classList.contains('visible')) {
    const u = S.mpGameState.units[S.mpSelectedUnit];
    if (u) {
      const cityIdx = S.mpGameState.cities.findIndex(c =>
        c.size > 0 && c.owner === S.mpCivSlot && c.gx === u.gx && c.gy === u.gy);
      if (cityIdx >= 0) {
        e.preventDefault();
        openCityDialog(S.mpGameState.cities[cityIdx], cityIdx);
        return;
      }
    }
  }

  if (isDialogOpen()) return;

  // C: center on active unit (view-only, no turn check needed)
  if (e.key === 'c' && !e.shiftKey) {
    if (S.mpSelectedUnit != null && S.mpGameState) {
      e.preventDefault();
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u) centerOnUnit(u);
    }
    return;
  }

  // F6: tech tree viewer (view-only)
  if (e.key === 'F6') { e.preventDefault(); showTechTree(); return; }

  // Shift+D (no unit selected): open diplomacy panel (view-only)
  if (e.key === 'D' && e.shiftKey) {
    if (!S.mpSelectedUnit && S.mpGameState) {
      e.preventDefault();
      showDiplomacyPanel();
      return;
    }
  }

  // Shift+T: tax rate sliders (allowed anytime)
  if ((e.key === 't' || e.key === 'T') && e.shiftKey) {
    e.preventDefault();
    showRateSliders();
    return;
  }

  if (e.key === 'F1') { e.preventDefault(); showCivpedia(); return; }
  if (e.key === 'F2') { e.preventDefault(); showMilitaryAdvisor(); return; }
  if (e.key === 'F3') { e.preventDefault(); showTradeAdvisor(); return; }
  if (e.key === 'F4') { e.preventDefault(); showCityList(); return; }
  if (e.key === 'F5') { e.preventDefault(); showScienceAdvisor(); return; }
  if (e.key === 'F11') { e.preventDefault(); showDemographics(); return; }
});

// ═══════════════════════════════════════════════════════════════════
// Late-bound dependency registration
// ═══════════════════════════════════════════════════════════════════
registerDialogDeps({
  renderUnitThumbnail,
  openCityDialog,
  closeCityDialog,
  centerOnTile,
  selectUnit,
  showProductionPicker,
});

registerUnitUiDeps({ renderAtomicSwap, updateUnitInfoStrip });
registerAdvisorDeps({ openCityDialog, selectUnit, centerOnUnit, renderUnitThumbnail });
registerCityUiDeps({ showUnitPresentDialog, showUnitSupportedDialog });

// ═══════════════════════════════════════════════════════════════════
// Network initialization
// ═══════════════════════════════════════════════════════════════════
initNetwork({
  doRender,
  populateFowCivSelector,
  updateGameInfo,
  setScene,
  updateGameBackBtn,
  getCdState,
  setCdCity,
});

// ═══════════════════════════════════════════════════════════════════
// Initialize event handlers (viewport pan/zoom/click)
// ═══════════════════════════════════════════════════════════════════
initEvents(S.viewportCanvas, S.vp, {
  clampViewport, drawViewport, resizeViewport,
  handleMapClick, closeCityDialog, closeCityView,
  getMapData: () => S.currentMapData,
  SCROLL_STEP, getMinScale, VP_MAX_SCALE,
});
