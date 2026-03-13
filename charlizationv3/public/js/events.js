// ═══════════════════════════════════════════════════════════════════
// events.js — Viewport interaction: mouse, touch, keyboard, wheel,
//             pinch-to-zoom, tooltip, window resize
//
// Called from app.js via initEvents(). No circular imports.
// ═══════════════════════════════════════════════════════════════════
import { Civ2Renderer } from './renderer.js';
import { RESOURCE_NAMES, COMMODITY_NAMES, ORDER_NAMES, UNIT_NAMES, UNIT_CARRY_CAP, UNIT_DOMAIN } from '../engine/defs.js';

export function initEvents(canvas, vp, fns) {
  const {
    clampViewport, drawViewport, resizeViewport,
    handleMapClick, closeCityDialog, closeCityView,
    getMapData,
    SCROLL_STEP, getMinScale, VP_MAX_SCALE,
  } = fns;

  // ── Shared drag state ──
  let dragging = false;
  let dragLastX = 0, dragLastY = 0;
  let dragStartX = 0, dragStartY = 0;
  let dragStartTime = 0;
  const LONG_PRESS_MS = 300;

  // ── Mouse drag panning ──
  canvas.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    dragging = true;
    dragLastX = dragStartX = e.clientX;
    dragLastY = dragStartY = e.clientY;
    dragStartTime = Date.now();
    canvas.classList.add('dragging');
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - dragLastX;
    const dy = e.clientY - dragLastY;
    dragLastX = e.clientX;
    dragLastY = e.clientY;
    vp.x -= dx / vp.scale;
    vp.y -= dy / vp.scale;
    clampViewport();
    drawViewport();
  });

  window.addEventListener('mouseup', e => {
    if (!dragging) return;
    dragging = false;
    canvas.classList.remove('dragging');
    const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
    if (dist < 5) {
      const isLongPress = (Date.now() - dragStartTime) >= LONG_PRESS_MS;
      handleMapClick(e, isLongPress);
    }
  });

  // ── Touch drag panning + pinch-to-zoom ──
  let touchMode = 'none';  // 'none' | 'drag' | 'pinch'
  let pinchStartDist = 0;
  let pinchStartScale = 1;
  let pinchLastCX = 0, pinchLastCY = 0;

  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      touchMode = 'pinch';
      dragging = false;
      canvas.classList.remove('dragging');
      const t0 = e.touches[0], t1 = e.touches[1];
      pinchStartDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      pinchStartScale = vp.scale;
      pinchLastCX = (t0.clientX + t1.clientX) / 2;
      pinchLastCY = (t0.clientY + t1.clientY) / 2;
    } else if (e.touches.length === 1 && touchMode !== 'pinch') {
      touchMode = 'drag';
      dragging = true;
      dragLastX = dragStartX = e.touches[0].clientX;
      dragLastY = dragStartY = e.touches[0].clientY;
      canvas.classList.add('dragging');
    }
  }, { passive: true });

  canvas.addEventListener('touchmove', e => {
    if (touchMode === 'pinch' && e.touches.length === 2) {
      const t0 = e.touches[0], t1 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
      const cx = (t0.clientX + t1.clientX) / 2;
      const cy = (t0.clientY + t1.clientY) / 2;
      const rect = canvas.getBoundingClientRect();

      const prevLocalX = pinchLastCX - rect.left;
      const prevLocalY = pinchLastCY - rect.top;
      const mapX = vp.x + prevLocalX / vp.scale;
      const mapY = vp.y + prevLocalY / vp.scale;

      vp.scale = Math.max(getMinScale(), Math.min(VP_MAX_SCALE,
        pinchStartScale * dist / pinchStartDist));

      const newLocalX = cx - rect.left;
      const newLocalY = cy - rect.top;
      vp.x = mapX - newLocalX / vp.scale;
      vp.y = mapY - newLocalY / vp.scale;

      pinchLastCX = cx;
      pinchLastCY = cy;
      clampViewport();
      drawViewport();
    } else if (touchMode === 'drag' && e.touches.length === 1) {
      const dx = e.touches[0].clientX - dragLastX;
      const dy = e.touches[0].clientY - dragLastY;
      dragLastX = e.touches[0].clientX;
      dragLastY = e.touches[0].clientY;
      vp.x -= dx / vp.scale;
      vp.y -= dy / vp.scale;
      clampViewport();
      drawViewport();
    }
  }, { passive: true });

  canvas.addEventListener('touchend', e => {
    if (e.touches.length === 0) {
      if (touchMode === 'drag') {
        dragging = false;
        canvas.classList.remove('dragging');
        const dist = Math.hypot(dragLastX - dragStartX, dragLastY - dragStartY);
        if (dist < 10) {
          const isLongPress = (Date.now() - dragStartTime) >= LONG_PRESS_MS;
          handleMapClick({ clientX: dragLastX, clientY: dragLastY, target: canvas }, isLongPress);
        }
      }
      touchMode = 'none';
    } else if (e.touches.length === 1 && touchMode === 'pinch') {
      touchMode = 'none';
    }
  }, { passive: true });

  // ── Trackpad / mouse wheel: pan + zoom ──
  // ctrlKey = trackpad pinch, deltaX===0 = mouse scroll wheel → both zoom
  // Two-finger trackpad swipe (deltaX !== 0, no ctrlKey) → pan
  canvas.addEventListener('wheel', e => {
    if (vp.offW === 0) return;
    e.preventDefault();
    if (e.ctrlKey || e.deltaX === 0) {
      // Zoom anchored at cursor position
      const rect = canvas.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      const mapX = vp.x + localX / vp.scale;
      const mapY = vp.y + localY / vp.scale;

      const zoomFactor = e.ctrlKey ? (1 - e.deltaY * 0.01) : (1 - e.deltaY * 0.002);
      vp.scale = Math.max(getMinScale(), Math.min(VP_MAX_SCALE, vp.scale * zoomFactor));

      vp.x = mapX - localX / vp.scale;
      vp.y = mapY - localY / vp.scale;
    } else {
      // Two-finger trackpad swipe = pan
      vp.x += e.deltaX / vp.scale;
      vp.y += e.deltaY / vp.scale;
    }
    clampViewport();
    drawViewport();
  }, { passive: false });

  // ── Keyboard panning ──
  const keysDown = new Set();
  let keyScrollRAF = null;

  function keyScrollLoop() {
    let dx = 0, dy = 0;
    if (keysDown.has('ArrowLeft')  || keysDown.has('a')) dx -= SCROLL_STEP;
    if (keysDown.has('ArrowRight') || keysDown.has('d')) dx += SCROLL_STEP;
    if (keysDown.has('ArrowUp')    || keysDown.has('w')) dy -= SCROLL_STEP;
    if (keysDown.has('ArrowDown')  || keysDown.has('s')) dy += SCROLL_STEP;
    if (dx || dy) {
      vp.x += dx / vp.scale;
      vp.y += dy / vp.scale;
      clampViewport();
      drawViewport();
    }
    keyScrollRAF = requestAnimationFrame(keyScrollLoop);
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (document.getElementById('citydialog-overlay').style.display === 'flex')
        closeCityDialog();
      else
        closeCityView();
      return;
    }
    if (vp.offW === 0) return;
    const key = e.key;
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(key)) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
      if (e.defaultPrevented) return; // already handled by game input (e.g. sentry)
      e.preventDefault();
      keysDown.add(key);
      if (!keyScrollRAF) keyScrollLoop();
    }
  });

  window.addEventListener('keyup', e => {
    keysDown.delete(e.key);
    if (keysDown.size === 0 && keyScrollRAF) {
      cancelAnimationFrame(keyScrollRAF);
      keyScrollRAF = null;
    }
  });

  // ── Window resize ──
  window.addEventListener('resize', () => {
    resizeViewport();
    drawViewport();
  });

  // ═══════════════════════════════════════════════════════════════════
  // TOOLTIP — hover over map to see tile info
  // ═══════════════════════════════════════════════════════════════════
  const tooltip = document.getElementById('tooltip');

  canvas.addEventListener('mousemove', e => {
    if (dragging) { tooltip.style.display = 'none'; return; }
    const md = getMapData();
    if (!md) return;

    const rect = canvas.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    let mx = localX / vp.scale + vp.x;
    let my = localY / vp.scale + vp.y;
    if (vp.wraps && vp.wrapW > 0) mx = ((mx % vp.wrapW) + vp.wrapW) % vp.wrapW;

    const fowEnabled = document.getElementById('fow-toggle').checked && !md.mapRevealed;
    const fowCivVal = document.getElementById('fow-civ').value;
    const fowCiv = fowCivVal !== '' ? parseInt(fowCivVal) : null;
    const fowBit = (fowEnabled && fowCiv != null) ? (1 << fowCiv) : 0;

    const found = Civ2Renderer.findTileAtMap(mx, my, md.mw, md.mh);

    if (found) {
      const { gx, gy } = found;

      if (fowEnabled && fowBit) {
        const vis = md.getVisibility(gx, gy);
        if (!(vis & fowBit)) {
          tooltip.textContent = `(${gx * 2 + (gy % 2)}, ${gy})  Unexplored`;
          tooltip.style.display = 'block';
          tooltip.style.left = (e.clientX + 14) + 'px';
          tooltip.style.top = (e.clientY + 14) + 'px';
          return;
        }
      }

      const ter = md.getTerrain(gx, gy);
      const vis = md.getVisibility(gx, gy);
      const river = md.hasRiver(gx, gy);
      const res = md.getResource(gx, gy);
      const tileVisible = !fowBit || (vis & fowBit);
      const imp = (fowEnabled && fowBit && !tileVisible)
        ? md.getKnownImprovements(gx, gy, fowCiv)
        : md.getImprovements(gx, gy);

      const terName = Civ2Renderer.TERRAIN_NAMES[ter] || '?';
      let info = `(${gx * 2 + (gy % 2)}, ${gy})  ${terName}`;
      if (river) info += ' + River';
      if (res === 1) info += ` [${(RESOURCE_NAMES[ter] || [])[0] || 'Resource 1'}]`;
      if (res === 2) info += ` [${(RESOURCE_NAMES[ter] || [])[1] || 'Resource 2'}]`;
      if (md.hasGoodyHut && md.hasGoodyHut(gx, gy)) info += ' [Goody Hut]';

      const impParts = [];
      if (imp.farmland) impParts.push('Farmland');
      else { if (imp.irrigation) impParts.push('Irrigation'); if (imp.mining) impParts.push('Mining'); }
      if (imp.road) impParts.push('Road');
      if (imp.railroad) impParts.push('Railroad');
      if (imp.airbase && !md.cities.some(c => c.gx === gx && c.gy === gy)) impParts.push('Airbase');
      else if (imp.fortress) impParts.push('Fortress');
      if (imp.pollution) impParts.push('Pollution');
      if (impParts.length) info += '\n' + impParts.join(', ');

      for (const c of md.cities) {
        if (c.gx === gx && c.gy === gy) {
          if (fowEnabled && fowBit && !(md.getVisibility(c.gx, c.gy) & fowBit)) continue;
          const displaySize = (fowEnabled && fowBit && !tileVisible)
            ? c.believedSize[fowCiv] : c.size;
          const epoch = md.civTechs ? Civ2Renderer._getEpoch(md.civTechs[c.owner]) : 0;
          const epochNames = ['Ancient','Renaissance','Industrial','Modern'];
          const cityOwner = (md.civNames && md.civNames[c.owner]) || `Civ ${c.owner}`;
          const govStr = (md.civs && md.civs[c.owner]) ? md.civs[c.owner].government : '';
          const govName = govStr ? govStr.charAt(0).toUpperCase() + govStr.slice(1) : '';
          info += `\n${c.name} (${cityOwner}, size ${displaySize}, ${epochNames[epoch]}${govName ? ', ' + govName : ''}${c.hasWalls ? ', walled' : ''}${c.hasPalace ? ', capital' : ''}`;
          if (c.isOccupied) {
            const origOwner = (md.civNames && md.civNames[c.originalOwner]) || `Civ ${c.originalOwner}`;
            info += `, occupied (was ${origOwner})`;
          }
          if (c.civilDisorder) info += ', DISORDER';
          if (c.weLoveKingDay) info += ', WLTKD';
          info += ')';
          break;
        }
      }

      // Collect tile units for cargo counting
      const tileUnits = md.units.filter(u => u.gx === gx && u.gy === gy && u.gx >= 0);
      for (const u of tileUnits) {
        if (fowEnabled && fowBit) {
          if (!(vis & fowBit)) continue;
          if (u.owner !== fowCiv && u.visFlag != null && !(u.visFlag & fowBit)) continue;
        }
        let name = UNIT_NAMES[u.type] || `Unit#${u.type}`;
        // Show cargo count for transports/carriers
        if (UNIT_CARRY_CAP[u.type]) {
          const carryDomain = (UNIT_DOMAIN[u.type] ?? 0) === 1 ? 0 : 0; // sea transports carry land (domain 0)
          const loaded = tileUnits.filter(lu => lu.owner === u.owner && (UNIT_DOMAIN[lu.type] ?? 0) === carryDomain && lu !== u).length;
          name += ` (${loaded}/${UNIT_CARRY_CAP[u.type]} units)`;
        }
        const owner = (md.civNames && md.civNames[u.owner]) || `Civ ${u.owner}`;
        const vetStr = u.veteran ? ' Vet' : '';
        const ordStr = ORDER_NAMES[u.orders] || '';
        const dmgStr = u.hpLost > 0 ? `, dmg ${u.hpLost}` : '';
        const cargoStr = (u.type === 48 || u.type === 49) && u.commodityCarried >= 0 && u.commodityCarried <= 15
          ? `, cargo: ${COMMODITY_NAMES[u.commodityCarried]}` : '';
        info += `\n[Unit] ${name}${vetStr} (${owner}${dmgStr}${cargoStr}${ordStr ? ', ' + ordStr : ''})`;
      }

      tooltip.textContent = info;
      tooltip.style.display = 'block';
      tooltip.style.left = (e.clientX + 14) + 'px';
      tooltip.style.top = (e.clientY + 14) + 'px';
    } else {
      tooltip.style.display = 'none';
    }
  });

  canvas.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
}
