// ═══════════════════════════════════════════════════════════════════
// city-ui.js — City dialog UI: viewport, click handling, production
//              picker, rush-buy, sell building, worker management
// ═══════════════════════════════════════════════════════════════════

import { S } from './state.js';
import { createCiv2Dialog, showConfirmDialog, showOverlayMessage } from './dialogs.js';
import { sfx } from './sound.js';
import { Civ2Renderer } from './renderer.js';
import { Civ2CityView } from './cityview.js';
import { Civ2CityDialog } from './citydialog.js';
import { UNIT_NAMES, IMPROVE_NAMES, IMPROVE_COSTS, WONDER_NAMES, WONDER_COSTS, UNIT_COSTS, UNIT_PREREQS, UNIT_OBSOLETE, IMPROVE_PREREQS, WONDER_PREREQS, WONDER_OBSOLETE, TERRAIN_BASE } from '../engine/defs.js';
import { SET_WORKERS, CHANGE_PRODUCTION, RUSH_BUY, SELL_BUILDING, RENAME_CITY } from '../engine/actions.js';
import { getProductionCost } from '../engine/production.js';
import { calcRushBuyCost } from '../engine/happiness.js';
import { wrapGx } from '../engine/utils.js';

// ── Module-private state (NOT in S) ──
const cdVp = { x: 0, y: 0, scale: 1 };
const cdViewport = document.getElementById('citydialog-viewport');
const cdVpCtx = cdViewport.getContext('2d', { colorSpace: 'srgb' });
let cdCity = null, cdCityIndex = 0, cdRegions = null;

// ── Late-bound deps ──
let _deps = {};
export function registerCityUiDeps(deps) { _deps = deps; }

// ═══════════════════════════════════════════════════════════════════
// Sprite loading
// ═══════════════════════════════════════════════════════════════════

async function ensureCvSprites() {
  if (S.cvSprites) return true;
  if (!S.cvFiles[300] || !S.cvFiles[305] || !S.cvFiles[310]) return false;

  const [improvImg, wondersImg, altImg] = await Promise.all([
    Civ2Renderer.loadImage(S.cvFiles[300]),
    Civ2Renderer.loadImage(S.cvFiles[305]),
    Civ2Renderer.loadImage(S.cvFiles[310]),
  ]);
  S.cvSprites = Civ2CityView.extractSprites(
    Civ2Renderer.imgToCtx(improvImg),
    Civ2Renderer.imgToCtx(wondersImg),
    Civ2Renderer.imgToCtx(altImg)
  );

  S.cvBackgrounds = new Map();
  const bgIds = [340,341,342,343,345,346,347,348,350,351,352,353];
  await Promise.all(bgIds.map(async id => {
    if (!S.cvFiles[id]) return;
    const img = await Civ2Renderer.loadImage(S.cvFiles[id]);
    S.cvBackgrounds.set(id, img);
  }));

  return true;
}

async function ensureCdSprites() {
  if (S.cdSprites) return true;
  if (!S.files.icons || !S.files.people) return false;
  const imgPromises = [
    Civ2Renderer.loadImage(S.files.icons),
    Civ2Renderer.loadImage(S.files.people),
  ];
  if (S.files.cityGif) imgPromises.push(Civ2Renderer.loadImage(S.files.cityGif));
  const imgs = await Promise.all(imgPromises);
  const iconsCtx = Civ2Renderer.imgToCtx(imgs[0]);
  const peopleCtx = Civ2Renderer.imgToCtx(imgs[1]);
  const cityGifCtx = S.files.cityGif ? Civ2Renderer.imgToCtx(imgs[2]) : null;
  S.cdSprites = Civ2CityDialog.extractSprites(iconsCtx, peopleCtx, cityGifCtx);
  return true;
}

// ═══════════════════════════════════════════════════════════════════
// City dialog viewport helpers
// ═══════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════
// City dialog click handling
// ═══════════════════════════════════════════════════════════════════

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
      Civ2CityView.render(cvCanvas, cdCity, cdCityIndex, S.currentMapData, S.cvSprites, S.cvBackgrounds);
      document.getElementById('cityview-overlay').style.display = 'flex';
    });
  } else if (result && result.action === 'change') {
    if (!S.mpGameState || !S.mpMapBase || S.mpCivSlot == null || cdCity.owner !== S.mpCivSlot) return;
    showProductionPicker(cdCity, cdCityIndex);
  } else if (result && result.action === 'buy') {
    if (!S.mpGameState || !S.mpMapBase || S.mpCivSlot == null || cdCity.owner !== S.mpCivSlot) return;
    if (S.mpGameState.turn.activeCiv !== S.mpCivSlot) { showOverlayMessage('Cannot rush-buy — not your turn'); return; }
    handleRushBuy(cdCity, cdCityIndex);
  } else if (result && result.action === 'sell') {
    if (!S.mpGameState || !S.mpMapBase || S.mpCivSlot == null || cdCity.owner !== S.mpCivSlot) return;
    if (S.mpGameState.turn.activeCiv !== S.mpCivSlot) { showOverlayMessage('Cannot sell buildings — not your turn'); return; }
    if (result.buildingId != null) {
      // Direct sell from improvement list sell icon
      const name = IMPROVE_NAMES[result.buildingId] || 'Building';
      const refund = IMPROVE_COSTS[result.buildingId] || 0;
      showConfirmDialog(`Sell ${name} for ${refund} gold?`, () => {
        sfx('SELL');
        S.transport.sendRaw({
          type: 'ACTION',
          action: { type: SELL_BUILDING, cityIndex: cdCityIndex, buildingId: result.buildingId },
        });
      }, 'Sell Building?');
    } else {
      showSellBuildingPicker(cdCity, cdCityIndex);
    }
  } else if (result && result.action === 'rename') {
    if (!S.mpGameState || !S.mpMapBase || S.mpCivSlot == null || cdCity.owner !== S.mpCivSlot) return;
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
          S.transport.sendRaw({ type: 'ACTION', action: { type: RENAME_CITY, cityIndex: cdCityIndex, name: newName } });
        }
      }},
      { label: 'Cancel' },
    ]);
  } else if (result && result.action === 'unitPresent') {
    if (!S.mpGameState || !S.mpMapBase || S.mpCivSlot == null) return;
    _deps.showUnitPresentDialog(result.unitIndex);
  } else if (result && result.action === 'unitSupported') {
    if (!S.mpGameState || !S.mpMapBase || S.mpCivSlot == null) return;
    _deps.showUnitSupportedDialog(result.unitIndex);
  } else if (result && (result.action === 'toggleTile' || result.action === 'citizenToSpec' || result.action === 'cycleSpec')) {
    if (!S.mpGameState || !S.mpMapBase || S.mpCivSlot == null || cdCity.owner !== S.mpCivSlot) return;
    handleWorkerChange(result);
  }
}

// ═══════════════════════════════════════════════════════════════════
// Worker / specialist management
// ═══════════════════════════════════════════════════════════════════

function handleWorkerChange(result) {
  const city = cdCity;
  const cityIndex = cdCityIndex;
  let workedTiles = city.workedTiles ? [...city.workedTiles] : [];
  let specialists = city.specialists ? [...city.specialists] : [];

  if (result.action === 'toggleTile') {
    const i = result.tileIndex;
    // Check if tile is in bounds
    const wgx = S.mpMapBase.wraps ? wrapGx(result.tileGx, S.mpMapBase.mw) : result.tileGx;
    if (result.tileGy < 0 || result.tileGy >= S.mpMapBase.mh || wgx < 0 || wgx >= S.mpMapBase.mw) return;

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
      const wgx = S.mpMapBase.wraps ? wrapGx(tgx, S.mpMapBase.mw) : tgx;
      if (tgy < 0 || tgy >= S.mpMapBase.mh) continue;
      const ter = S.mpMapBase.getTerrain(wgx, tgy);
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
      const bestTile = findBestUnworkedTile(city, workedTiles, cityIndex);
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
  S.transport.sendRaw({
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
// Skips tiles already worked by other cities
function findBestUnworkedTile(city, workedTiles, cityIndex) {
  const worked = new Set(workedTiles);
  const parC = city.gy & 1;

  // Build set of world-coordinate tiles worked by other cities
  const otherWorked = new Set();
  if (S.mpGameState?.cities) {
    for (let ci = 0; ci < S.mpGameState.cities.length; ci++) {
      if (ci === cityIndex) continue;
      const oc = S.mpGameState.cities[ci];
      if (!oc || oc.size <= 0 || !oc.workedTiles) continue;
      const ocParC = oc.gy & 1;
      for (const oi of oc.workedTiles) {
        const [oddx, oddy] = Civ2CityDialog.CITY_RADIUS_DOUBLED[oi];
        const oParT = ((oc.gy + oddy) % 2 + 2) % 2;
        const otgx = oc.gx + ((ocParC + oddx - oParT) >> 1);
        const otgy = oc.gy + oddy;
        const owgx = S.mpMapBase.wraps ? wrapGx(otgx, S.mpMapBase.mw) : otgx;
        otherWorked.add(`${owgx},${otgy}`);
      }
    }
  }

  let bestIdx = -1, bestScore = -1;
  for (let i = 0; i < 20; i++) {
    if (worked.has(i)) continue;

    const [ddx, ddy] = Civ2CityDialog.CITY_RADIUS_DOUBLED[i];
    const parT = ((city.gy + ddy) % 2 + 2) % 2;
    const tgx = city.gx + ((parC + ddx - parT) >> 1);
    const tgy = city.gy + ddy;
    const wgx = S.mpMapBase.wraps ? wrapGx(tgx, S.mpMapBase.mw) : tgx;
    if (tgy < 0 || tgy >= S.mpMapBase.mh || wgx < 0 || wgx >= S.mpMapBase.mw) continue;
    if (otherWorked.has(`${wgx},${tgy}`)) continue; // skip tiles worked by other cities
    const ter = S.mpMapBase.getTerrain(wgx, tgy);
    if (ter < 0 || ter > 10) continue; // skip invalid

    const base = TERRAIN_BASE[ter];
    const score = base[0] * 10 + base[1];
    if (score > bestScore) { bestScore = score; bestIdx = i; }
  }
  return bestIdx >= 0 ? bestIdx : null;
}

// ═══════════════════════════════════════════════════════════════════
// Re-render city dialog
// ═══════════════════════════════════════════════════════════════════

function cdRerender() {
  if (!cdCity) return;
  const canvas = document.getElementById('citydialog-canvas');
  cdRegions = Civ2CityDialog.render(canvas, cdCity, cdCityIndex, S.currentMapData, S.cdSprites, S.mapSprites);
  cdDrawViewport();
}

// ═══════════════════════════════════════════════════════════════════
// Production picker
// ═══════════════════════════════════════════════════════════════════

function showProductionPicker(city, cityIndex, onDismiss) {
  const hasBuilding = id => city.buildings && city.buildings.has(id);
  const civTechs = S.mpGameState.civTechs?.[city.owner];
  const hasTech = (id) => id < 0 || (civTechs ? civTechs.has(id) : id === -1);
  console.log('[prodpicker] city.owner=', city.owner, 'civTechs=', civTechs, 'isSet=', civTechs instanceof Set, 'techs=', civTechs ? [...civTechs] : null);

  // Build list of available items by category
  const unitItems = [];
  for (let id = 0; id < UNIT_NAMES.length; id++) {
    if (!UNIT_NAMES[id] || UNIT_COSTS[id] == null) continue;
    const prereq = UNIT_PREREQS[id] ?? -1;
    const obsolete = UNIT_OBSOLETE[id] ?? -1;
    if (prereq === -2 || obsolete === -2) continue;
    if (prereq >= 0 && !hasTech(prereq)) continue;
    if (obsolete >= 0 && hasTech(obsolete)) continue;
    unitItems.push({ type: 'unit', id, name: UNIT_NAMES[id], cost: UNIT_COSTS[id] });
  }

  const buildingItems = [];
  for (let id = 2; id <= 38; id++) {
    if (!IMPROVE_NAMES[id] || IMPROVE_COSTS[id] == null) continue;
    if (hasBuilding(id)) continue;
    const prereq = IMPROVE_PREREQS[id] ?? -1;
    if (prereq >= 0 && !hasTech(prereq)) continue;
    buildingItems.push({ type: 'building', id, name: IMPROVE_NAMES[id], cost: IMPROVE_COSTS[id] });
  }

  const wonderItems = [];
  for (let i = 0; i < WONDER_NAMES.length; i++) {
    const wid = i + 39;
    if (!WONDER_NAMES[i] || WONDER_COSTS[i] == null) continue;
    if (S.mpGameState.wonders && S.mpGameState.wonders[i] &&
        S.mpGameState.wonders[i].cityIndex != null) continue;
    const prereq = WONDER_PREREQS[i] ?? -1;
    if (prereq >= 0 && !hasTech(prereq)) continue;
    wonderItems.push({ type: 'wonder', id: wid, name: WONDER_NAMES[i], cost: WONDER_COSTS[i] });
  }

  const rows = [];
  let ppHighlight = -1;

  function ppSetHighlight(idx) {
    if (ppHighlight >= 0 && ppHighlight < rows.length) {
      rows[ppHighlight].style.background = '';
      rows[ppHighlight].style.color = '#333';
      rows[ppHighlight].classList.remove('pp-highlight');
    }
    ppHighlight = idx;
    if (ppHighlight >= 0 && ppHighlight < rows.length) {
      rows[ppHighlight].style.background = '#0a246a';
      rows[ppHighlight].style.color = '#fff';
      rows[ppHighlight].classList.add('pp-highlight');
      rows[ppHighlight].scrollIntoView({ block: 'nearest' });
    }
  }

  const { dismiss } = createCiv2Dialog('production-picker', `${city.name} \u2014 Change Production`, panel => {
    panel.style.cssText += ';max-height:60vh;overflow-y:auto;min-width:280px;font:14px "Times New Roman",serif;color:#333';

    const addCategory = (catLabel, catItems) => {
      if (catItems.length === 0) return;
      const header = document.createElement('div');
      header.className = 'pp-category-header';
      header.textContent = catLabel;
      panel.appendChild(header);

      for (const item of catItems) {
        const row = document.createElement('div');
        row.style.cssText = 'padding:3px 6px;cursor:pointer;display:flex;justify-content:space-between;color:#333';
        row.onmouseenter = () => { if (!row.classList.contains('pp-highlight')) { row.style.background = '#0a246a'; row.style.color = '#fff'; } };
        row.onmouseleave = () => { if (!row.classList.contains('pp-highlight')) { row.style.background = ''; row.style.color = '#333'; } };

        const labelEl = document.createElement('span');
        labelEl.textContent = item.name;
        const costLabel = document.createElement('span');
        costLabel.textContent = `${item.cost / 10} shields`;
        costLabel.style.cssText = 'opacity:0.7';
        row.appendChild(labelEl);
        row.appendChild(costLabel);

        row.addEventListener('click', () => {
          window.removeEventListener('keydown', ppKeyHandler, true);
          S.transport.sendRaw({
            type: 'ACTION',
            action: {
              type: CHANGE_PRODUCTION,
              cityIndex,
              item: { type: item.type, id: item.id },
            },
          });
          dismiss();
          if (onDismiss) onDismiss();
        });
        panel.appendChild(row);
        rows.push(row);
      }
    };

    addCategory('Units', unitItems);
    addCategory('Buildings', buildingItems);
    addCategory('Wonders', wonderItems);
  }, [
    { label: 'Cancel', action: onDismiss || undefined },
  ]);

  // Auto-highlight first row so Enter works immediately
  if (rows.length > 0) ppSetHighlight(0);

  // Arrow key navigation
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
    }
  };
  window.addEventListener('keydown', ppKeyHandler, true);
  // Clean up key handler when dialog is dismissed
  const observer = new MutationObserver(() => {
    if (!document.getElementById('production-picker')) {
      window.removeEventListener('keydown', ppKeyHandler, true);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true });
}

// ═══════════════════════════════════════════════════════════════════
// Rush buy
// ═══════════════════════════════════════════════════════════════════

function handleRushBuy(city, cityIndex) {
  const item = city.itemInProduction;
  if (!item) return;
  if (item.type === 'building' && item.id === 38) return; // Can't buy Capitalization
  const totalCost = getProductionCost(item);
  const buyCost = calcRushBuyCost(item.type, totalCost, city.shieldsInBox || 0);
  const treasury = S.mpGameState.civs?.[S.mpCivSlot]?.treasury || 0;

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
    S.transport.sendRaw({ type: 'ACTION', action: { type: RUSH_BUY, cityIndex } });
  }, 'Rush Buy?');
}

// ═══════════════════════════════════════════════════════════════════
// Sell building picker
// ═══════════════════════════════════════════════════════════════════

function showSellBuildingPicker(city, cityIndex) {
  if (!city.buildings || city.buildings.size === 0) return;

  const sbRows = [];
  let sbHighlight = -1;

  function sbSetHighlight(idx) {
    if (sbHighlight >= 0 && sbHighlight < sbRows.length) {
      sbRows[sbHighlight].style.background = '';
      sbRows[sbHighlight].style.color = '#333';
      sbRows[sbHighlight].classList.remove('pp-highlight');
    }
    sbHighlight = idx;
    if (sbHighlight >= 0 && sbHighlight < sbRows.length) {
      sbRows[sbHighlight].style.background = '#0a246a';
      sbRows[sbHighlight].style.color = '#fff';
      sbRows[sbHighlight].classList.add('pp-highlight');
      sbRows[sbHighlight].scrollIntoView({ block: 'nearest' });
    }
  }

  const { dismiss } = createCiv2Dialog('sell-building-picker', `${city.name} \u2014 Sell Building`, panel => {
    panel.style.cssText += ';max-height:60vh;overflow-y:auto;min-width:280px;font:14px "Times New Roman",serif;color:#333';

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
        row.style.cssText = 'padding:3px 6px;cursor:pointer;display:flex;justify-content:space-between;color:#333';
        row.onmouseenter = () => { if (!row.classList.contains('pp-highlight')) { row.style.background = '#0a246a'; row.style.color = '#fff'; } };
        row.onmouseleave = () => { if (!row.classList.contains('pp-highlight')) { row.style.background = ''; row.style.color = '#333'; } };

        const labelEl = document.createElement('span');
        labelEl.textContent = name;
        const refundLabel = document.createElement('span');
        refundLabel.textContent = `+${refund} gold`;
        refundLabel.style.cssText = 'color:#060';
        row.appendChild(labelEl);
        row.appendChild(refundLabel);

        row.addEventListener('click', () => {
          window.removeEventListener('keydown', sbKeyHandler, true);
          dismiss();
          showConfirmDialog(`Sell ${name} for ${refund} gold?`, () => {
            sfx('SELL');
            S.transport.sendRaw({
              type: 'ACTION',
              action: { type: SELL_BUILDING, cityIndex, buildingId: id },
            });
          }, 'Sell Building?');
        });
        panel.appendChild(row);
        sbRows.push(row);
      }
    }
  }, [
    { label: 'Cancel' },
  ]);

  // Arrow key navigation
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
    }
  };
  window.addEventListener('keydown', sbKeyHandler, true);
  // Clean up key handler when dialog is dismissed
  const observer = new MutationObserver(() => {
    if (!document.getElementById('sell-building-picker')) {
      window.removeEventListener('keydown', sbKeyHandler, true);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true });
}

// ═══════════════════════════════════════════════════════════════════
// Open / close city dialog & city view
// ═══════════════════════════════════════════════════════════════════

async function openCityDialog(city, cityIndex) {
  const ready = await ensureCdSprites();
  if (!ready) {
    alert('City dialog requires ICONS.GIF and PEOPLE.GIF. Load them and try again.');
    return;
  }
  cdCity = city;
  cdCityIndex = cityIndex;
  const canvas = document.getElementById('citydialog-canvas');
  cdRegions = Civ2CityDialog.render(canvas, city, cityIndex, S.currentMapData, S.cdSprites, S.mapSprites);
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

// ═══════════════════════════════════════════════════════════════════
// City dialog pan/zoom events (runs at module load)
// ═══════════════════════════════════════════════════════════════════

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

// Backdrop/close button listeners
document.getElementById('citydialog-backdrop').addEventListener('click', closeCityDialog);
document.getElementById('citydialog-close').addEventListener('click', closeCityDialog);
document.getElementById('cityview-backdrop').addEventListener('click', closeCityView);
document.getElementById('cityview-close').addEventListener('click', closeCityView);

// ═══════════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════════

function getCdState() { return { cdCity, cdCityIndex }; }
function setCdCity(city) { cdCity = city; }

export {
  openCityDialog,
  closeCityDialog,
  closeCityView,
  showProductionPicker,
  cdRerender,
  ensureCvSprites,
  ensureCdSprites,
  getCdState,
  setCdCity,
};
