// ═══════════════════════════════════════════════════════════════════
// network.js — WebSocket/lobby/state deserialization/multiplayer render
// ═══════════════════════════════════════════════════════════════════

import { S, BUSY_ORDERS } from './state.js';
import { resizeViewport, clampViewport, drawViewport, invalidateFowCanvases, deferredRenderQueue, ensureFowCanvas, ensureFowLosCanvas, ensureLosCanvas } from './viewport.js';
import { sfx, menuLoop, getDeathSfx, UNIT_ATK_SFX } from './sound.js';
import { showOverlayMessage, showTurnEvents, showCityFoundedDialog, showRateSliders, createCiv2Dialog, showGameOverDialog } from './dialogs.js';
import { showResearchPicker, showDiplomacyPanel, showMapSizePicker } from './advisors.js';
import { openCityDialog, closeCityDialog, cdRerender, showProductionPicker } from './city-ui.js';
import { findFirstOwnUnit, findNextMovableUnit, shiftMercenaryQueue, centerOnUnit, isTileInViewport, selectUnit, startBlink, stopBlink, animateCombat, applyVisibilityUpdate, applyImprovementsUpdate, applyTerrainUpdate, applyGoodyHutUpdate, applyOwnershipUpdate, renderUnitThumbnail } from './unit-ui.js';
import { Civ2Renderer } from './renderer.js';
import { Civ2Parser } from '../engine/parser.js';
import { Civ2Minimap } from './minimap.js';
import { CIV_COLORS, UNIT_NAMES, ADVANCE_NAMES, IMPROVE_NAMES, WONDER_NAMES, TERRAIN_NAMES, ORDER_NAMES, UNIT_DOMAIN, DIFFICULTY_KEYS } from '../engine/defs.js';
import { createTransport } from '../net/transport.js';
import { createAccessors } from '../engine/state.js';
import { computeLOS } from '../engine/visibility.js';
import { getGameYear } from '../engine/year.js';
import { calcCityTrade } from '../engine/production.js';
import { calcResearchCost } from '../engine/research.js';

// ── Module-level DOM elements ──
const wsStatusEl = document.getElementById('ws-status');
const wsLabelEl = wsStatusEl.querySelector('.ws-label');
const lobbyNameInput = document.getElementById('lobby-name-input');

// ── Chat DOM elements ──
const chatPanel = document.getElementById('chatPanel');
const chatBox = document.getElementById('chatBox');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatBadge = document.getElementById('chatBadge');
const chatToastStack = document.getElementById('chatToastStack');

// ── Activity PING heartbeat ──
const IDLE_THRESHOLD = 60000;  // 60s → gold dot
const PING_INTERVAL = 15000;   // throttle pings to 15s
let lastPingSent = 0;

// ── Module-level transport ref (assigned in initNetwork) ──
let transport = null;

// ── App callbacks (assigned in initNetwork) ──
let doRender = null;
let populateFowCivSelector = null;
let updateGameInfo = null;
let setScene = null;
let updateGameBackBtn = null;
let getCdState = null;
let setCdCity = null;

// ═══════════════════════════════════════════════════════════════════
// Active game persistence
// ═══════════════════════════════════════════════════════════════════

function saveActiveGame() {
  if (!S.wsRoomId || !S.wsSessionId) return;
  const existing = S.activeGames.find(g => g.roomId === S.wsRoomId);
  if (existing) {
    existing.sessionId = S.wsSessionId;
    existing.name = S.wsRoomName || existing.name;
  } else {
    S.activeGames.push({ roomId: S.wsRoomId, sessionId: S.wsSessionId, name: S.wsRoomName });
  }
  localStorage.setItem('civ2.activeGames', JSON.stringify(S.activeGames));
}

function removeActiveGame(roomId) {
  S.activeGames = S.activeGames.filter(g => g.roomId !== roomId);
  localStorage.setItem('civ2.activeGames', JSON.stringify(S.activeGames));
}

function getActiveGameSession(roomId) {
  const g = S.activeGames.find(g => g.roomId === roomId);
  return g ? g.sessionId : null;
}

// ═══════════════════════════════════════════════════════════════════
// WebSocket status + URL
// ═══════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════
// Activity PING
// ═══════════════════════════════════════════════════════════════════

function reportActivity() {
  const now = Date.now();
  const elapsed = now - lastPingSent;
  const throttle = elapsed > IDLE_THRESHOLD ? 0 : PING_INTERVAL;
  if (elapsed > throttle) {
    lastPingSent = now;
    transport.send('PING');
  }
}

// ── Activity dot color ──
function activityColor(slot) {
  if (!slot.occupied) return '#444';
  if (!slot.wsOpen) return '#e53935';
  const age = slot.lastActivity ? (Date.now() - slot.lastActivity) : 0;
  return age > IDLE_THRESHOLD ? '#ffd700' : '#4caf50';
}

// ═══════════════════════════════════════════════════════════════════
// LOBBY — room list + room detail rendering
// ═══════════════════════════════════════════════════════════════════

function renderRoomList() {
  const grid = document.getElementById('lobby-room-grid');
  let html = `<div class="lobby-create-tile" id="lobby-create-tile">
    <span class="create-plus">+</span>
    <span class="create-label">New Game</span>
  </div>`;

  for (const r of S.wsRooms) {
    const seats = r.seatCount || 0;
    const specs = r.spectatorCount || 0;
    const cls = r.started ? 'lobby-room-tile started' : 'lobby-room-tile';
    const statusCls = r.started ? 'tile-status in-progress' : 'tile-status';
    const statusText = r.started ? 'In Progress' : `${seats}/8 Players`;
    const isMyRoom = r.roomId === S.wsRoomId || S.activeGames.some(g => g.roomId === r.roomId);
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
      if (roomId === S.wsRoomId && S.wsGameStarted && S.mpGameState && S.mpMapBase) {
        // Already connected with game state — go straight to map, refresh turn UI
        S.gameEnteredFrom = 'lobby';
        setScene('game');
        doRenderFromState({ skipCenter: false, silent: true, forceCiv: S.mpCivSlot });
        return;
      }
      if (roomId === S.wsRoomId && S.wsLastRoom && !S.wsGameStarted) {
        // Pre-game room — show detail view
        document.getElementById('lobby-rooms-view').style.display = 'none';
        document.getElementById('lobby-room-view').style.display = 'block';
        renderRoomDetail(S.wsLastRoom);
      } else {
        // Use saved sessionId if resuming an active game
        const savedSession = getActiveGameSession(roomId);
        if (savedSession) {
          transport.setSessionId(savedSession);
          S.wsSessionId = savedSession;
        }
        transport.joinRoom(roomId);
      }
    };
    el.querySelector('.tile-join-btn').addEventListener('click', e => { e.stopPropagation(); go(); });
    el.addEventListener('click', go);
  });
}

function renderRoomDetail(msg) {
  S.wsRoomId = msg.roomId;

  // Only render detail view if lobby scene is showing room view (not browsing rooms)
  const roomView = document.getElementById('lobby-room-view');
  const roomsView = document.getElementById('lobby-rooms-view');
  if (S.currentScene === 'lobby' && roomView.style.display !== 'none') {
    // We're viewing this room — update it
  } else if (S.currentScene === 'lobby' && roomsView.style.display !== 'none') {
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
  const isCreator = S.wsPlayerIndex === 0;
  const isPreGame = !msg.started;
  let html = '';
  for (const s of msg.clients) {
    if (s.ai) {
      // AI seat
      const removeBtnHtml = (isCreator && isPreGame)
        ? ` <button class="seat-remove-ai" data-seat="${s.seat}" title="Remove AI">x</button>`
        : '';
      const currentDiff = s.difficulty || 'prince';
      let diffHtml = '';
      if (isCreator && isPreGame) {
        const opts = DIFFICULTY_KEYS.map(k => {
          const sel = k === currentDiff ? ' selected' : '';
          return `<option value="${k}"${sel}>${k.charAt(0).toUpperCase() + k.slice(1)}</option>`;
        }).join('');
        diffHtml = ` <select class="seat-difficulty" data-seat="${s.seat}">${opts}</select>`;
      } else {
        diffHtml = ` <span class="seat-difficulty-label">${currentDiff.charAt(0).toUpperCase() + currentDiff.slice(1)}</span>`;
      }
      html += `<div class="room-seat ai occupied">
        <span class="seat-num">${s.seat}</span>
        <span class="seat-name"><span class="seat-ai-tag">[AI]</span> ${s.name || 'Computer'}${diffHtml}${removeBtnHtml}</span>
      </div>`;
    } else if (s.occupied) {
      // Human seat
      const you = s.clientId === S.wsClientId ? ' (you)' : '';
      const dotColor = activityColor(s);
      const readyMark = (msg.ready && msg.ready[s.seat]) ? ' <span style="color:#4caf50">&#10003;</span>' : '';
      html += `<div class="room-seat occupied">
        <span class="activity-dot" style="background:${dotColor}"></span>
        <span class="seat-num">${s.seat}</span>
        <span class="seat-name">${s.name || 'Player'}${you}${readyMark}</span>
      </div>`;
    } else {
      // Empty seat
      const addAiBtnHtml = (isCreator && isPreGame)
        ? ` <button class="seat-add-ai" data-seat="${s.seat}">+ AI</button>`
        : '';
      html += `<div class="room-seat empty">
        <span class="activity-dot" style="background:#444"></span>
        <span class="seat-num">${s.seat}</span>
        <span class="seat-name">Open${addAiBtnHtml}</span>
      </div>`;
    }
  }
  if (msg.spectators && msg.spectators.length) {
    html += `<div class="room-spectators">Spectators: ${msg.spectators.map(s => s.name).join(', ')}</div>`;
  }
  seatsEl.innerHTML = html;

  // Wire up Add AI / Remove AI buttons
  seatsEl.querySelectorAll('.seat-add-ai').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      transport.send('ADD_AI', { seat: Number(btn.dataset.seat) });
    });
  });
  seatsEl.querySelectorAll('.seat-remove-ai').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      transport.send('REMOVE_AI', { seat: Number(btn.dataset.seat) });
    });
  });
  seatsEl.querySelectorAll('.seat-difficulty').forEach(sel => {
    sel.addEventListener('change', (e) => {
      e.stopPropagation();
      transport.send('SET_AI_DIFFICULTY', { seatIndex: Number(sel.dataset.seat), difficulty: sel.value });
    });
  });

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
    // Pre-game: show ready state (AI seats are always ready)
    const occupied = msg.clients.filter(s => s.occupied);
    const humanOccupied = occupied.filter(s => !s.ai);
    const readyCount = occupied.filter(s => s.ai || (msg.ready && msg.ready[s.seat])).length;
    if (occupied.length < 2) {
      statusText.textContent = `Waiting for players... (need at least 2)`;
    } else if (humanOccupied.length < 1) {
      statusText.textContent = `Need at least 1 human player`;
    } else {
      statusText.textContent = `${readyCount} / ${occupied.length} ready`;
    }
    statusText.className = '';

    // Show ready button only if seated (and human)
    if (S.wsPlayerIndex != null) {
      const amReady = msg.ready && msg.ready[S.wsPlayerIndex];
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
  if (S.activeGames.length > 0) {
    const names = S.activeGames.map(g => `"${g.name}"`).join(', ');
    bannerText.textContent = S.activeGames.length === 1
      ? `Active game: ${names}`
      : `Active games: ${names}`;
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

// ═══════════════════════════════════════════════════════════════════
// MULTIPLAYER GAME — state deserialization + render from server state
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
  if (!S.mpMapBase || !S.mpGameState) return null;
  const state = S.mpGameState;
  return {
    mw: S.mpMapBase.mw, mh: S.mpMapBase.mh,
    mw2: S.mpMapBase.mw * 2,
    ms: S.mpMapBase.mapShape,
    mapSeed: S.mpMapBase.mapSeed,
    mapShape: S.mpMapBase.mapShape,
    tileData: S.mpMapBase.tileData,
    getTerrain: S.mpMapBase.getTerrain,
    isLand: S.mpMapBase.isLand,
    hasRiver: S.mpMapBase.hasRiver,
    getImprovements: S.mpMapBase.getImprovements,
    getVisibility: S.mpMapBase.getVisibility,
    getResource: S.mpMapBase.getResource,
    getNeighbors: S.mpMapBase.getNeighbors,
    wrap: S.mpMapBase.wrap,
    hasGoodyHut: S.mpMapBase.hasGoodyHut,
    hasShield: S.mpMapBase.hasShield,
    getCityRadiusOwner: S.mpMapBase.getCityRadiusOwner,
    getBodyId: S.mpMapBase.getBodyId,
    getTileOwnership: S.mpMapBase.getTileOwnership,
    getTileFertility: S.mpMapBase.getTileFertility,
    getKnownImprovements: S.mpMapBase.getKnownImprovements,
    knownImprovements: S.mpMapBase.knownImprovements,
    units: state.units || [],
    cities: state.cities || [],
    civs: state.civs,
    civTechCounts: state.civTechCounts || new Array(8).fill(0),
    civTechs: state.civTechs ? state.civTechs.map(t => Array.isArray(t) ? new Set(t) : t) : null,
    civsAlive: state.civsAlive ?? 0xFF,
    playerCiv: S.mpCivSlot ?? state.playerCiv ?? 1,
    mapRevealed: state.mapRevealed ?? false,
    unitBySaveIndex: state.unitBySaveIndex,
    allUnits: state.allUnits,
    tail: state.tail,
    header: state.header,
    gameState: state.gameState || { turnsPassed: state.turn?.number || 0, playerCiv: S.mpCivSlot ?? 1 },
    validation: state.validation,
    civNames: state.civNames,
    wonders: state.wonders,
  };
}

async function doRenderFromState(opts = {}) {
  const mapData = buildMapDataFromState();
  if (!mapData) return;
  S.currentMapData = mapData;

  populateFowCivSelector(mapData, opts.forceCiv);
  updateTurnUI();
  updateGameInfo(S.currentMapData, S.mpCivSlot);

  // Auto-select unit (only on our turn)
  const prevSelected = S.mpSelectedUnit;
  if (opts.deferAutoAdvance) {
    // Keep current selection — auto-advance will happen after delay
  } else if (S.mpGameState.turn.activeCiv === S.mpCivSlot) {
    const advFrom = opts.autoAdvanceFrom;
    if (advFrom != null) {
      // After a move/order: stay on same unit if it still has moves, else advance
      const movedUnit = S.mpGameState.units[advFrom];
      if (movedUnit && movedUnit.owner === S.mpCivSlot && movedUnit.movesLeft > 0
          && movedUnit.gx >= 0 && !BUSY_ORDERS.has(movedUnit.orders)) {
        S.mpSelectedUnit = advFrom;
      } else {
        // Check mercenary queue before general search
        S.mpSelectedUnit = shiftMercenaryQueue() ?? findNextMovableUnit(advFrom);
      }
    } else {
      S.mpSelectedUnit = shiftMercenaryQueue() ?? findNextMovableUnit(-1);
    }
  } else {
    S.mpSelectedUnit = null;
  }

  // Render new frame atomically — build everything offscreen, then swap
  if (S.mapSprites) {
    stopBlink();
    await renderAtomicSwap(mapData, opts);
  } else if (S.files.t1 && S.files.t2) {
    // First render (no sprites yet) — use full doRender with loading overlay
    await doRender({ silent: opts.silent !== false });
    if (S.mpSelectedUnit != null) startBlink(); else stopBlink();
  }

  // Center on selected unit — always on turn start, otherwise only if off-screen
  if (opts.skipCenter) {
    if (S.mpSelectedUnit !== prevSelected && S.mpSelectedUnit != null) {
      const u = S.mpGameState.units[S.mpSelectedUnit];
      if (u && !isTileInViewport(u.gx, u.gy)) centerOnUnit(u);
    }
  } else {
    const u = S.mpSelectedUnit != null
      ? S.mpGameState.units[S.mpSelectedUnit]
      : findFirstOwnUnit();
    if (u) centerOnUnit(u);
  }
}

// Double-buffered render: build base + FOW canvas offscreen, then swap all at once.
// The viewport keeps showing the old frame until the new one is fully ready.
async function renderAtomicSwap(mapData, opts = {}) {
  const fowOn = document.getElementById('fow-toggle').checked;
  const losOn = document.getElementById('los-toggle').checked;
  const fowCiv = S.cachedFowCiv;

  // 1. Render base canvas (all tiles, units, cities — no FOW)
  const blinkUnitTiles = [];
  if (S.mpCivSlot != null && S.mpGameState) {
    for (const u of (S.mpGameState.units || [])) {
      if (u.owner === S.mpCivSlot && u.gx >= 0) {
        blinkUnitTiles.push({ gx: u.gx, gy: u.gy });
      }
    }
  }
  const newBase = document.createElement('canvas');
  const result = await Civ2Renderer.render(newBase, mapData, S.mapSprites, null,
    { fowEnabled: false, gridEnabled: false, blinkUnitTiles, selectedUnitIndex: S.mpSelectedUnit });

  // 2. Render FOW/LOS canvas if needed (still all offscreen)
  let newFow = null, newFowLos = null, newLos = null;
  if (fowOn && losOn) {
    const losData = computeLOS(mapData, fowCiv);
    newFowLos = document.createElement('canvas');
    await Civ2Renderer.render(newFowLos, mapData, S.mapSprites, null,
      { fowEnabled: true, fowCiv, gridEnabled: false, losData, selectedUnitIndex: S.mpSelectedUnit });
    S.cachedLosData = losData;
  } else if (fowOn) {
    newFow = document.createElement('canvas');
    await Civ2Renderer.render(newFow, mapData, S.mapSprites, null,
      { fowEnabled: true, fowCiv, gridEnabled: false, selectedUnitIndex: S.mpSelectedUnit });
  } else if (losOn) {
    const losData = computeLOS(mapData, fowCiv);
    newLos = document.createElement('canvas');
    await Civ2Renderer.render(newLos, mapData, S.mapSprites, null,
      { fowEnabled: false, gridEnabled: false, losData, selectedUnitIndex: S.mpSelectedUnit });
    S.cachedLosData = losData;
  }

  // 3. Atomic swap — assign all canvases at once, then draw
  S.mapCanvasBase = newBase;
  S.blinkPatches = result.terrainPatches;
  S.blinkUnitOverlay = result.blinkUnitOverlay;
  S.vp.offW = newBase.width;
  S.vp.offH = newBase.height;
  S.vp.wraps = (mapData.mapShape === 0);
  S.vp.wrapW = result.wrapW || S.vp.offW;

  // Swap FOW canvases (null out the ones we didn't render — they'll be lazy-built if toggled)
  S.mapCanvasFow = newFow;
  S.mapCanvasFowLos = newFowLos;
  S.mapCanvasLos = newLos;
  S.minimapCanvasLos = null;
  S.minimapCanvasFow = null;
  S.minimapCanvasFowLos = null;
  S._losRendering = null;
  S._fowRendering = null;
  S._fowLosRendering = null;

  // 4. Single drawViewport — frame is complete, no flash
  drawViewport();

  // Start blink after the new frame is on screen
  if (S.mpSelectedUnit != null) {
    startBlink();
  } else {
    stopBlink();
  }
}

// ═══════════════════════════════════════════════════════════════════
// Turn UI
// ═══════════════════════════════════════════════════════════════════

function updateStatusBarColor(civSlot) {
  const bar = document.getElementById('status-bar');
  if (!bar) return;
  const color = CIV_COLORS[civSlot];
  if (color) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    bar.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.35)`;
    bar.style.borderBottomColor = color;
  } else {
    bar.style.backgroundColor = 'rgba(22, 33, 62, 0.92)';
    bar.style.borderBottomColor = 'rgba(255,255,255,0.1)';
  }
}

function updateTurnUI() {
  const statusBar = document.getElementById('status-bar');
  if (!S.mpGameState) {
    statusBar.style.display = 'none';
    return;
  }
  statusBar.style.display = '';

  const isSpectator = S.mpCivSlot == null;
  const isMyTurn = !isSpectator && S.mpGameState.turn.activeCiv === S.mpCivSlot;
  const civName = S.mpGameState.civNames?.[S.mpGameState.turn.activeCiv] || `Civ ${S.mpGameState.turn.activeCiv}`;

  // ── Civ-colored status bar tint ──
  updateStatusBarColor(isSpectator ? S.mpGameState.turn.activeCiv : S.mpCivSlot);

  // ── Gold display ──
  const goldEl = document.getElementById('status-gold');
  if (goldEl) {
    if (isSpectator) {
      goldEl.textContent = 'Spectating';
      goldEl.style.color = '#aaa';
    } else {
      const civ = S.mpGameState.civs?.[S.mpCivSlot];
      const gold = civ ? civ.treasury : 0;
      goldEl.textContent = `${gold}g`;
      goldEl.style.color = '#ffd700';
    }
  }

  // ── Research progress ──
  const resNameEl = document.getElementById('status-research-name');
  const resFillEl = document.getElementById('status-research-fill');
  if (isSpectator) {
    if (resNameEl) resNameEl.textContent = `${civName}'s turn`;
    if (resFillEl) resFillEl.style.width = '0%';
  } else {
    const civ = S.mpGameState.civs?.[S.mpCivSlot];
    if (civ) {
      const techId = civ.techBeingResearched;
      if (techId != null && techId !== 0xFF && techId >= 0 && techId < ADVANCE_NAMES.length) {
        const current = civ.researchProgress || 0;
        const cost = calcResearchCost(S.mpGameState, S.mpCivSlot);
        let sciPerTurn = 0;
        if (S.mpMapBase) {
          for (let ci = 0; ci < S.mpGameState.cities.length; ci++) {
            const city = S.mpGameState.cities[ci];
            if (city.owner === S.mpCivSlot && city.size > 0) {
              const { sci } = calcCityTrade(city, ci, S.mpGameState, S.mpMapBase);
              sciPerTurn += sci;
            }
          }
        }
        const remaining = cost - current;
        const turnsLeft = sciPerTurn > 0 ? Math.ceil(remaining / sciPerTurn) : '?';
        if (resNameEl) resNameEl.textContent = `${ADVANCE_NAMES[techId]} (${turnsLeft}t)`;
        if (resFillEl) resFillEl.style.width = cost > 0 ? `${Math.min(100, (current / cost) * 100)}%` : '0%';
      } else {
        if (resNameEl) resNameEl.textContent = 'No research';
        if (resFillEl) resFillEl.style.width = '0%';
      }
    }
  }

  // ── End Turn / Waiting ──
  const endBtn = document.getElementById('end-turn-btn');
  const waitMsg = document.getElementById('status-waiting');
  if (isSpectator) {
    endBtn.style.display = 'none';
    endBtn.classList.remove('flash');
    waitMsg.classList.remove('hidden');
    waitMsg.textContent = `${civName}'s turn`;
  } else if (isMyTurn) {
    endBtn.style.display = '';
    waitMsg.classList.add('hidden');
    if (findNextMovableUnit(-1) == null) {
      endBtn.classList.add('flash');
    } else {
      endBtn.classList.remove('flash');
    }
  } else {
    endBtn.style.display = 'none';
    endBtn.classList.remove('flash');
    waitMsg.classList.remove('hidden');
    waitMsg.textContent = 'Waiting...';
  }

  // ── Update unit info strip ──
  updateUnitInfoStrip();
}

// ── Unit info strip ──
function updateUnitInfoStrip() {
  const strip = document.getElementById('unit-info-strip');
  if (!strip) return;

  if (S.mpSelectedUnit == null || !S.mpGameState) {
    strip.classList.add('hidden');
    return;
  }
  const u = S.mpGameState.units[S.mpSelectedUnit];
  if (!u || u.gx < 0) {
    strip.classList.add('hidden');
    return;
  }

  const name = UNIT_NAMES[u.type] || `Unit ${u.type}`;
  const maxHp = Civ2Renderer.UNIT_MAX_HP?.[u.type] || 10;
  const curHp = Math.max(0, maxHp - (u.movesRemain || 0));
  const hpPct = maxHp > 0 ? (curHp / maxHp) * 100 : 0;
  let hpColor;
  if (hpPct > 67) hpColor = 'rgb(87,171,39)';
  else if (hpPct > 25) hpColor = 'rgb(255,223,79)';
  else hpColor = 'rgb(243,0,0)';

  // Movement: stored in thirds (MOVEMENT_MULTIPLIER=3)
  const movesLeft = u.movesLeft || 0;
  const maxMoves = u.maxMoves || 3;
  function fmtMoves(v) {
    const whole = Math.floor(v / 3);
    const rem = v % 3;
    if (rem === 0) return `${whole}`;
    if (rem === 1) return `${whole}\u2153`;  // 1/3
    return `${whole}\u2154`;  // 2/3
  }
  const movesStr = `${fmtMoves(movesLeft)}/${fmtMoves(maxMoves)}`;

  // Terrain
  const terrain = S.mpMapBase?.getTerrain?.(u.gx, u.gy);
  const terrainName = terrain != null && TERRAIN_NAMES[terrain] ? TERRAIN_NAMES[terrain] : '';

  // Orders
  const orderName = u.orders && u.orders !== 'none' ? ORDER_NAMES[u.orders] || u.orders : '';

  // Domain indicator
  const domain = UNIT_DOMAIN[u.type] ?? 0;
  const domainIcon = domain === 1 ? ' [Air]' : domain === 2 ? ' [Sea]' : '';

  let html =
    `<span class="unit-strip-name">${name}${domainIcon}</span>` +
    `<span class="unit-strip-sep">|</span>` +
    `<span class="unit-strip-moves">Moves: ${movesStr}</span>` +
    `<span class="unit-strip-sep">|</span>` +
    `<span class="unit-strip-hp"><span class="unit-strip-hp-fill" style="width:${hpPct}%;background:${hpColor}"></span></span>`;

  if (terrainName) {
    html += `<span class="unit-strip-sep">|</span><span class="unit-strip-terrain">${terrainName}</span>`;
  }
  if (orderName) {
    html += `<span class="unit-strip-sep">|</span><span class="unit-strip-orders">${orderName}</span>`;
  }

  strip.innerHTML = html;
  strip.classList.remove('hidden');
}

// Show connected players/spectators in the controls bar
function updateGamePlayers() {
  const el = document.getElementById('game-players');
  if (!S.wsLastRoom) { el.textContent = ''; return; }
  const parts = [];
  for (const c of S.wsLastRoom.clients) {
    if (!c.occupied) continue;
    const name = c.name || `Seat ${c.seat}`;
    const cls = c.wsOpen ? 'gp-player' : 'gp-offline';
    const status = c.wsOpen ? '' : ' (off)';
    parts.push(`<span class="${cls}">${name}[S${c.seat}]${status}</span>`);
  }
  for (const s of (S.wsLastRoom.spectators || [])) {
    const name = s.name || 'Spectator';
    const cls = s.wsOpen ? 'gp-spectator' : 'gp-offline';
    parts.push(`<span class="${cls}">${name}[watch]</span>`);
  }
  el.innerHTML = parts.join('<span class="gp-sep"> · </span>');
}

// ═══════════════════════════════════════════════════════════════════
// Chat
// ═══════════════════════════════════════════════════════════════════

function showChatPanel() {
  chatPanel.classList.remove('hidden');
}

function handleChatMessage(msg, isHistory) {
  // Ensure chat panel is visible in game scene
  if (S.currentScene === 'game') showChatPanel();

  // Build message element
  const el = document.createElement('div');
  el.className = 'chatMsg' + (msg.isEvent ? ' event' : '');
  if (msg.name && !msg.isEvent) {
    const sender = document.createElement('span');
    sender.className = 'chatSender';
    sender.textContent = msg.name;
    if (msg.seat != null) {
      const civSlot = S.mpSeatCivMap?.[msg.seat];
      if (civSlot != null) sender.style.color = CIV_COLORS[civSlot] || '#fff';
    } else {
      // Spectator — gray italic
      sender.style.color = '#999';
      sender.style.fontStyle = 'italic';
    }
    el.appendChild(sender);
    el.appendChild(document.createTextNode(' '));
  }
  const textEl = document.createElement('span');
  textEl.textContent = msg.text;
  if (msg.seat == null && !msg.isEvent) textEl.style.fontStyle = 'italic';
  el.appendChild(textEl);
  chatMessages.appendChild(el);

  // Auto-scroll
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Toast + badge (skip for history replay)
  if (!isHistory) {
    if (!S.chatOpen) {
      S.chatUnread++;
      chatBadge.textContent = S.chatUnread;
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

function toggleChat(forceClose) {
  if (!forceClose && S.chatPinned && S.chatOpen) return; // pinned — don't close
  S.chatOpen = !S.chatOpen;
  chatBox.classList.toggle('hidden', !S.chatOpen);
  if (S.chatOpen) {
    S.chatUnread = 0;
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

// ═══════════════════════════════════════════════════════════════════
// Game Log
// ═══════════════════════════════════════════════════════════════════

const GAME_LOG_COLORS = {
  combat:    '#e74c3c',
  city:      '#f39c12',
  tech:      '#3498db',
  diplomacy: '#e67e22',
  general:   '#95a5a6',
};

function handleGameLogMessage(msg, isHistory) {
  if (S.currentScene === 'game') showChatPanel();

  const el = document.createElement('div');
  el.className = 'chatMsg game-log-msg game-log-' + (msg.category || 'general');
  const color = GAME_LOG_COLORS[msg.category] || GAME_LOG_COLORS.general;
  el.style.color = color;

  // Hide if game log is toggled off (but still add to DOM)
  if (!S.chatShowGameLog) el.style.display = 'none';

  const prefix = document.createElement('span');
  prefix.className = 'game-log-turn';
  prefix.textContent = `[${getGameYear(msg.turn || 0)}] `;
  el.appendChild(prefix);

  const textEl = document.createElement('span');
  textEl.textContent = msg.text;
  el.appendChild(textEl);

  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Toast + badge (skip for history replay)
  if (!isHistory) {
    if (!S.chatOpen && S.chatShowGameLog) {
      S.chatUnread++;
      chatBadge.textContent = S.chatUnread;
      chatBadge.classList.remove('hidden');
      // Subtler toast for game log (shorter duration)
      const toast = document.createElement('div');
      toast.className = 'chatToast event';
      toast.style.color = color;
      toast.textContent = msg.text.length > 80 ? msg.text.slice(0, 77) + '...' : msg.text;
      chatToastStack.appendChild(toast);
      setTimeout(() => toast.remove(), 3500);
    }
  }
}

function toggleGameLog() {
  S.chatShowGameLog = !S.chatShowGameLog;
  const els = chatMessages.querySelectorAll('.game-log-msg');
  for (const el of els) {
    el.style.display = S.chatShowGameLog ? '' : 'none';
  }
  if (S.chatShowGameLog) chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ═══════════════════════════════════════════════════════════════════
// Debug Log
// ═══════════════════════════════════════════════════════════════════

function handleDebugLogMessage(msg) {
  const el = document.createElement('div');
  el.className = 'chatMsg debug-log-msg';

  const catSpan = document.createElement('span');
  catSpan.className = 'debug-log-category';
  catSpan.textContent = `[${msg.category || 'debug'}]`;
  el.appendChild(catSpan);

  const textNode = document.createTextNode(' ' + (msg.text || ''));
  el.appendChild(textNode);

  if (!S.chatShowDebugLog) el.style.display = 'none';

  chatMessages.appendChild(el);
  if (S.chatShowDebugLog) chatMessages.scrollTop = chatMessages.scrollHeight;

  // Prune: if debug messages exceed 500, remove the oldest 250
  const debugMsgs = chatMessages.querySelectorAll('.debug-log-msg');
  if (debugMsgs.length > 500) {
    for (let i = 0; i < 250; i++) debugMsgs[i].remove();
  }
}

function toggleDebugLog() {
  S.chatShowDebugLog = !S.chatShowDebugLog;
  const els = chatMessages.querySelectorAll('.debug-log-msg');
  for (const el of els) {
    el.style.display = S.chatShowDebugLog ? '' : 'none';
  }
  if (transport) {
    transport.sendRaw({ type: 'SET_DEBUG', enabled: S.chatShowDebugLog });
  }
  if (S.chatShowDebugLog) chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ═══════════════════════════════════════════════════════════════════
// Countdown display (all-ready → game start)
// ═══════════════════════════════════════════════════════════════════

let countdownSoundPlayed = false;

function handleCountdown(seconds) {
  const actionsEl = document.getElementById('room-actions');
  if (!actionsEl) return;

  // Play sound on the first countdown message (seconds=5)
  if (!countdownSoundPlayed) {
    sfx('POMPCIRC');
    countdownSoundPlayed = true;
  }

  // Find or create countdown display element
  let cdEl = document.getElementById('room-countdown');
  if (!cdEl) {
    cdEl = document.createElement('div');
    cdEl.id = 'room-countdown';
    cdEl.style.cssText = 'font-size:28px;font-weight:bold;color:#ffd700;text-align:center;' +
      'padding:16px 0;font-family:"Times New Roman",Georgia,serif;text-shadow:2px 2px 4px rgba(0,0,0,0.5)';
    actionsEl.insertBefore(cdEl, actionsEl.firstChild);
  }

  if (seconds > 0) {
    cdEl.textContent = `Game starts in ${seconds}...`;
    cdEl.style.display = '';
    // Hide the ready button during countdown
    const readyBtn = document.getElementById('room-ready-btn');
    if (readyBtn) readyBtn.style.display = 'none';
    // Update status text
    const statusText = document.getElementById('room-status-text');
    if (statusText) statusText.textContent = 'All players ready!';
  } else {
    cdEl.textContent = 'Launching game!';
    // Game start will follow immediately via GAME_START message
  }
}

function handleCountdownCancel() {
  countdownSoundPlayed = false;
  const cdEl = document.getElementById('room-countdown');
  if (cdEl) cdEl.remove();
  // Ready button visibility will be restored by renderRoomDetail on next ROOM message
}

// ═══════════════════════════════════════════════════════════════════
// initNetwork — create transport, wire up all lobby/game listeners
// ═══════════════════════════════════════════════════════════════════

/**
 * @param {Object} appCallbacks
 * @param {Function} appCallbacks.doRender — full render pipeline (from app.js)
 * @param {Function} appCallbacks.populateFowCivSelector — populates FOW civ dropdown
 * @param {Function} appCallbacks.updateGameInfo — updates status bar
 * @param {Function} appCallbacks.setScene — scene switcher ('menu'|'lobby'|'game')
 * @param {Function} appCallbacks.updateGameBackBtn — updates back button label
 * @param {Function} appCallbacks.getCdState — returns { cdCity, cdCityIndex } for city dialog refresh
 * @param {Function} appCallbacks.setCdCity — sets cdCity for city dialog refresh
 * @returns {Object} transport
 */
function initNetwork(appCallbacks) {
  doRender = appCallbacks.doRender;
  populateFowCivSelector = appCallbacks.populateFowCivSelector;
  updateGameInfo = appCallbacks.updateGameInfo;
  setScene = appCallbacks.setScene;
  updateGameBackBtn = appCallbacks.updateGameBackBtn;
  getCdState = appCallbacks.getCdState;
  setCdCity = appCallbacks.setCdCity;

  // ── Player name persistence ──
  const savedName = localStorage.getItem('civ2.playerName') || '';
  if (savedName) lobbyNameInput.value = savedName;

  // ── Active games: migrate from old single-room storage ──
  S.activeGames = JSON.parse(localStorage.getItem('civ2.activeGames') || '[]');
  if (!S.activeGames.length) {
    const oldRoom = localStorage.getItem('civ2.activeRoomId');
    const oldSess = localStorage.getItem('civ2.sessionId');
    if (oldRoom && oldSess) {
      S.activeGames = [{ roomId: oldRoom, sessionId: oldSess, name: 'Game' }];
      localStorage.setItem('civ2.activeGames', JSON.stringify(S.activeGames));
    }
  }
  localStorage.removeItem('civ2.activeRoomId');

  S.wsSessionId = localStorage.getItem('civ2.sessionId') || null;

  // ── Create transport ──
  transport = createTransport({
    url: getWsUrl(),
    name: savedName || 'Player',
    sessionId: S.wsSessionId,
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
          S.wsRooms = msg.rooms || [];
          if (msg.yourClientId) S.wsClientId = msg.yourClientId;
          if (msg.sessionId) {
            S.wsSessionId = msg.sessionId;
            transport.setSessionId(msg.sessionId);
            localStorage.setItem('civ2.sessionId', msg.sessionId);
          }
          // Clean up active games that no longer exist on server
          {
            const serverRoomIds = new Set(S.wsRooms.map(r => r.roomId));
            const stale = S.activeGames.filter(g => !serverRoomIds.has(g.roomId));
            if (stale.length) {
              stale.forEach(g => removeActiveGame(g.roomId));
            }
          }
          renderRoomList();
          updateBanner();
          break;

        case 'WELCOME':
          S.wsRoomId = msg.roomId;
          S.wsClientId = msg.clientId;
          S.wsPlayerIndex = msg.playerIndex;
          transport.setRoomId(msg.roomId);
          if (msg.sessionId) {
            S.wsSessionId = msg.sessionId;
            transport.setSessionId(msg.sessionId);
            localStorage.setItem('civ2.sessionId', msg.sessionId);
            // Update active game entry with new sessionId
            const ag = S.activeGames.find(g => g.roomId === msg.roomId);
            if (ag) {
              ag.sessionId = msg.sessionId;
              localStorage.setItem('civ2.activeGames', JSON.stringify(S.activeGames));
            }
          }
          console.log(`[ws] Joined room ${msg.roomId} as seat ${msg.playerIndex ?? 'spectator'}`);
          break;

        case 'ROOM':
          S.wsLastRoom = msg;
          S.wsRoomName = msg.name || msg.roomId;
          S.wsGameStarted = msg.started;
          if (msg.started) saveActiveGame();
          updateGameBackBtn();
          updateGamePlayers();
          // Skip room detail view for started games — GAME_START will switch to game scene
          if (msg.started && S.wsPlayerIndex != null) {
            updateBanner();
          } else {
            renderRoomDetail(msg);
            updateBanner();
          }
          break;

        case 'GAME_START': {
          console.log('[ws] GAME_START received', msg.myCivSlot);
          // Reset countdown state
          countdownSoundPlayed = false;
          const cdEl = document.getElementById('room-countdown');
          if (cdEl) cdEl.remove();
          S.mpCivSlot = msg.myCivSlot;
          S.mpSeatCivMap = msg.seatCivMap;
          S.mpHumanPlayers = msg.humanPlayers ?? 0xFF;
          S.wsGameStarted = true;
          saveActiveGame();

          // Reconstruct map accessors from serialized data
          S.mpMapBase = createAccessors(
            msg.mapBase.mw, msg.mapBase.mh, msg.mapBase.mapShape, msg.mapBase.mapSeed,
            msg.mapBase.tileData, msg.mapBase.knownImprovements,
          );
          S.mpGameState = deserializeState(msg.state);

          // Play transition sound only on initial game start (not reconnect)
          if (S.currentScene === 'lobby') {
            menuLoop.pause();
            menuLoop.currentTime = 0;
            sfx('MENUEND');
          }

          // Enable FOW + LOS for multiplayer
          document.getElementById('fow-toggle').checked = true;
          document.getElementById('los-toggle').checked = true;
          S.cachedFowCiv = S.mpCivSlot;
          S.cachedLosData = null;

          // Switch to game scene first so viewport has real dimensions for centering
          S.gameEnteredFrom = 'lobby';
          setScene('game');

          // Show chat panel
          showChatPanel();

          // Build mapData object compatible with existing renderer
          // populateFowCivSelector is called inside with forceCiv to ensure correct civ
          doRenderFromState({ silent: false, forceCiv: S.mpCivSlot });
          break;
        }

        case 'STATE': {
          const prevUnits = S.mpGameState?.units;
          S.mpGameState = deserializeState(msg.state);

          // Capture and consume auto-advance state
          const autoAdvFrom = S.pendingAutoAdvanceFrom;
          S.pendingAutoAdvanceFrom = null;

          // Stash visibility update — applied after slide animation (or immediately if no slide)
          const pendingVisibility = (msg.tileVisibility && S.mpMapBase?.tileData) ? msg.tileVisibility : null;

          // Apply tile updates immediately (improvements, terrain, goody huts, ownership)
          applyImprovementsUpdate(msg.tileImprovements);
          applyTerrainUpdate(msg.tileTerrains);
          applyGoodyHutUpdate(msg.tileGoodyHuts);
          applyOwnershipUpdate(msg.tileOwnership);

          // Queue mercenary/nomad units from goody huts so they're selected next
          const hutRes = msg.state.goodyHutResult;
          if (hutRes && hutRes.civSlot === S.mpCivSlot && hutRes.mercenaryIndices) {
            S.mercenaryQueue.push(...hutRes.mercenaryIndices);
          }

          // Process notifications (combat, goody hut, city founded, turn events, etc.)
          const statePayload = msg.state;
          const processNotifications = () => {
            // Refresh city dialog if open (e.g. after SET_WORKERS)
            const cdState = getCdState();
            if (cdState.cdCity && S.mpGameState?.cities?.[cdState.cdCityIndex]
                && document.getElementById('citydialog-overlay').style.display === 'flex') {
              setCdCity(S.mpGameState.cities[cdState.cdCityIndex]);
              cdRerender();
            }

            // Combat result notification (attack/death sounds handled separately)
            if (statePayload.combatResult) {
              const cr = statePayload.combatResult;
              if (cr.type === 'capture') {
                sfx('CRWDBUGL');
                showOverlayMessage(`${cr.cityName} captured!`);
              } else {
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
            if (statePayload.discoveredAdvance && statePayload.discoveredAdvance.civSlot === S.mpCivSlot) {
              sfx('FANFARE1');
              const da = statePayload.discoveredAdvance;
              const ct = S.mpGameState.civTechs?.[da.civSlot];
              console.log('[tech] Discovered advance', da.advanceId, ADVANCE_NAMES[da.advanceId],
                'civTechs now=', ct ? [...ct] : null, 'has it=', ct?.has(da.advanceId));
              setTimeout(() => showResearchPicker(statePayload.discoveredAdvance.advanceId), 300);
            }

            // Goody hut result notification (exact Civ2 GAME.TXT messages)
            if (statePayload.goodyHutResult && statePayload.goodyHutResult.civSlot === S.mpCivSlot) {
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
                      const civ = S.mpGameState.civs?.[S.mpCivSlot];
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
                content.style.cssText = 'padding:12px 20px';

                const textDiv = document.createElement('div');
                textDiv.style.cssText = 'font-family:"Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);font-size:16px;white-space:pre-line';
                textDiv.textContent = hutText;
                content.appendChild(textDiv);

                panel.appendChild(content);
              }, [{ label: 'OK', action: hutPostAction || undefined }]);
            }

            // City founded notification — show popup, then open city dialog
            if (statePayload.cityFounded && statePayload.cityFounded.civSlot === S.mpCivSlot) {
              const cf = statePayload.cityFounded;
              const year = getGameYear(S.mpGameState.turn?.number || 0);
              showCityFoundedDialog(cf.name, year, () => {
                const city = S.mpGameState.cities[cf.cityIndex];
                if (city) openCityDialog(city, cf.cityIndex);
              });
            }

            // Turn events: city growth, famine, production complete, civ eliminated
            if (statePayload.turnEvents) {
              const GLOBAL_EVENTS = new Set(['civEliminated', 'warDeclared', 'treatyAccepted', 'tributePaid', 'mapShared', 'cityIncited']);
              const myEvents = statePayload.turnEvents.filter(e =>
                e.civSlot === S.mpCivSlot || GLOBAL_EVENTS.has(e.type));
              if (myEvents.length > 0) {
                showTurnEvents(myEvents);
              }
            }

            // Game over: show victory/defeat dialog (do NOT close WebSocket)
            if (statePayload.gameOver) {
              setTimeout(() => showGameOverDialog(statePayload.gameOver.winner, S.mpGameState), 600);
            }

            // Auto-show diplomacy panel when there are pending proposals/demands for us
            if (S.mpGameState.treatyProposals?.some(p => p.to === S.mpCivSlot && !p.resolved) ||
                S.mpGameState.tributeDemands?.some(d => d.to === S.mpCivSlot && !d.resolved)) {
              sfx('LETTER');
              setTimeout(() => showDiplomacyPanel(), 400);
            }

            // Prompt to pick research at start of turn if nothing selected and science > 0
            if (S.mpGameState.turn.activeCiv === S.mpCivSlot && !statePayload.discoveredAdvance) {
              const civ = S.mpGameState.civs?.[S.mpCivSlot];
              if (civ && (civ.techBeingResearched == null || civ.techBeingResearched === 0xFF)
                  && civ.researchProgress > 0) {
                setTimeout(() => showResearchPicker(), 300);
              }
            }
          };

          // Continuation after optional combat animation — render + notifications
          const afterCombatAnim = () => {
            // Play move sound if unit successfully moved to a new position
            let unitMoved = false;
            if (S.pendingMoveUnit != null && prevUnits) {
              const prevU = prevUnits[S.pendingMoveUnit];
              const newU = msg.state.units[S.pendingMoveUnit];
              if (prevU && newU && (newU.gx !== prevU.gx || newU.gy !== prevU.gy) && newU.gx >= 0) {
                sfx('MOVPIECE');
                unitMoved = true;
              }
              S.pendingMoveUnit = null;
            }

            applyVisibilityUpdate(pendingVisibility);

            if (unitMoved) {
              // First render: show unit at new position, keep camera where it is
              doRenderFromState({ skipCenter: true, deferAutoAdvance: true });
              processNotifications();
              // Wait so user can see newly revealed terrain, then advance to next unit
              setTimeout(() => {
                doRenderFromState({ skipCenter: true, autoAdvanceFrom: autoAdvFrom });
              }, 500);
            } else {
              doRenderFromState({ skipCenter: true, autoAdvanceFrom: autoAdvFrom });
              processNotifications();
            }
          };

          // If combat occurred, play sounds and animation before slide/render
          const cr = statePayload.combatResult;
          if (cr && cr.gx != null && cr.type !== 'capture') {
            if (S.mapSprites) {
              // Full sprite animation — animateCombat handles its own sounds
              animateCombat(cr, afterCombatAnim);
            } else {
              // No sprites: play attack + death sounds, brief delay so user
              // hears sounds before the dead unit vanishes from the re-render
              const atkSfx = UNIT_ATK_SFX[cr.attacker];
              if (atkSfx) sfx(atkSfx);
              const loser = cr.type === 'atkWin' ? cr.defender : cr.attacker;
              sfx(getDeathSfx(loser));
              setTimeout(afterCombatAnim, 400);
            }
          } else {
            afterCombatAnim();
          }
          break;
        }

        case 'ERROR':
          console.warn(`[ws] Server error: ${msg.message}`);
          if (msg.message) showOverlayMessage(msg.message);
          // Room gone (server restart) — clean up and return to lobby
          if (msg.message && msg.message.includes('not found')) {
            const match = msg.message.match(/Room (\S+)/);
            const deadRoom = match ? match[1] : S.wsRoomId;
            if (deadRoom) removeActiveGame(deadRoom);
            if (deadRoom === S.wsRoomId || deadRoom === transport.getRoomId()) {
              transport.setRoomId(null);
              S.wsRoomId = null;
              S.wsPlayerIndex = null;
              S.wsGameStarted = false;
              S.mpGameState = null;
              S.mpMapBase = null;
              S.mpCivSlot = null;
              setScene('lobby');
              updateBanner();
            }
          }
          break;

        case 'REJECTED':
          console.warn(`[ws] Rejected: ${msg.reason}`);
          break;

        case 'COUNTDOWN':
          handleCountdown(msg.seconds);
          break;

        case 'COUNTDOWN_CANCEL':
          handleCountdownCancel();
          break;

        case 'MSG':
          handleChatMessage(msg);
          break;

        case 'GAME_LOG':
          handleGameLogMessage(msg);
          break;

        case 'DEBUG_LOG':
          handleDebugLogMessage(msg);
          break;

        case 'CHAT_HISTORY':
          if (msg.messages) {
            msg.messages.forEach(m => {
              if (m.type === 'GAME_LOG') handleGameLogMessage(m, true);
              else handleChatMessage(m, true);
            });
          }
          break;

        default:
          console.log(`[ws] ${msg.type}`, msg);
      }
    },
  });

  S.transport = transport;

  // ── Player name input listener ──
  lobbyNameInput.addEventListener('input', () => {
    const name = lobbyNameInput.value.trim();
    localStorage.setItem('civ2.playerName', name);
    transport.setName(name || 'Player');
    transport.send('IDENTIFY', { name: name || 'Player' });
  });

  // ── Activity PING heartbeat ──
  document.addEventListener('mousemove', reportActivity);
  document.addEventListener('click', reportActivity);
  document.addEventListener('touchstart', reportActivity);

  // ── Lobby banner resume ──
  document.getElementById('lobby-banner-resume').addEventListener('click', () => {
    if (S.wsRoomId && S.wsGameStarted && S.mpGameState && S.mpMapBase) {
      // We have game state — go straight to the map, refresh turn UI
      S.gameEnteredFrom = 'lobby';
      setScene('game');
      doRenderFromState({ skipCenter: false, silent: true, forceCiv: S.mpCivSlot });
      return;
    }
    if (S.wsRoomId && S.wsGameStarted && S.wsLastRoom) {
      // Connected but no game state yet — room detail will transition via GAME_START
      document.getElementById('lobby-rooms-view').style.display = 'none';
      document.getElementById('lobby-room-view').style.display = 'block';
      renderRoomDetail(S.wsLastRoom);
    } else if (S.activeGames.length > 0) {
      // Rejoin most recent active game
      const game = S.activeGames[S.activeGames.length - 1];
      transport.setSessionId(game.sessionId);
      S.wsSessionId = game.sessionId;
      transport.joinRoom(game.roomId);
    }
  });

  // ── Leave room (pre-game only) → back to room list ──
  document.getElementById('room-leave-btn').addEventListener('click', () => {
    if (S.wsRoomId) removeActiveGame(S.wsRoomId);
    transport.leaveRoom();
    S.wsRoomId = null;
    S.wsPlayerIndex = null;
    S.wsGameStarted = false;
    S.wsLastRoom = null;
    transport.setRoomId(null);
    updateGameBackBtn();
    document.getElementById('lobby-room-view').style.display = 'none';
    document.getElementById('lobby-rooms-view').style.display = 'block';
    updateBanner();
  });

  // ── Back to rooms (started game) → show room list with banner ──
  document.getElementById('room-back-btn').addEventListener('click', () => {
    document.getElementById('lobby-room-view').style.display = 'none';
    document.getElementById('lobby-rooms-view').style.display = 'block';
    updateBanner();
  });

  // ── Ready button ──
  document.getElementById('room-ready-btn').addEventListener('click', () => {
    transport.send('READY');
  });

  // ── Enter key toggles Ready in lobby ──
  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (S.currentScene !== 'lobby') return;
    if (S.wsPlayerIndex == null) return;  // not seated
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    // Only when room detail view is showing (not browsing room list)
    if (document.getElementById('lobby-room-view').style.display === 'none') return;
    e.preventDefault();
    transport.send('READY');
  });

  // ── Lobby ← → Menu navigation ──
  document.getElementById('lobby-back-btn').addEventListener('click', () => setScene('menu'));
  document.getElementById('game-back-btn').addEventListener('click', () => {
    if (S.gameEnteredFrom === 'lobby') {
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
    if (S.currentScene === 'lobby' && S.wsLastRoom && document.getElementById('lobby-room-view').style.display !== 'none') {
      renderRoomDetail(S.wsLastRoom);
    }
  }, 15000);

  // ── End Turn button ──
  document.getElementById('end-turn-btn').addEventListener('click', () => {
    if (!S.mpGameState || S.mpGameState.turn.activeCiv !== S.mpCivSlot) return;
    sfx('ENDOTURN');
    transport.sendRaw({ type: 'ACTION', action: { type: 'END_TURN' } });
  });

  // ── Chat event listeners ──
  chatToggleBtn.addEventListener('click', toggleChat);
  chatSendBtn.addEventListener('click', sendChat);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); sendChat(); }
    if (e.key === 'Escape' && !S.chatPinned) { e.preventDefault(); toggleChat(); }
    e.stopPropagation(); // don't trigger game keybinds
  });
  chatToastStack.addEventListener('click', () => {
    if (!S.chatOpen) toggleChat();
  });
  // Game log toggle
  const gameLogToggle = document.getElementById('gameLogToggle');
  if (gameLogToggle) gameLogToggle.addEventListener('change', toggleGameLog);
  // Debug log toggle
  const debugLogToggle = document.getElementById('debugLogToggle');
  if (debugLogToggle) debugLogToggle.addEventListener('change', toggleDebugLog);
  // Pin toggle — keep chat open
  const chatPinToggle = document.getElementById('chatPinToggle');
  if (chatPinToggle) chatPinToggle.addEventListener('change', () => {
    S.chatPinned = chatPinToggle.checked;
    if (S.chatPinned && !S.chatOpen) toggleChat();
  });
  // Close chat when clicking outside chatPanel (unless pinned)
  document.addEventListener('pointerdown', e => {
    if (S.chatOpen && !S.chatPinned && !chatPanel.contains(e.target)) toggleChat();
  });

  // ── Connect ──
  setWsStatus('ws-connecting', 'Connecting...');
  transport.connect();

  return transport;
}

// ═══════════════════════════════════════════════════════════════════
// Exports
// ═══════════════════════════════════════════════════════════════════

export {
  renderAtomicSwap,
  doRenderFromState,
  updateTurnUI,
  updateUnitInfoStrip,
  deserializeState,
  buildMapDataFromState,
  updateGamePlayers,
  initNetwork,
  renderRoomList,
  renderRoomDetail,
  updateBanner,
  setWsStatus,
  getWsUrl,
  saveActiveGame,
  removeActiveGame,
  getActiveGameSession,
  showChatPanel,
  handleChatMessage,
  toggleChat,
  sendChat,
  activityColor,
  reportActivity,
};
