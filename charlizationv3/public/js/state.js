// ═══════════════════════════════════════════════════════════════════
// state.js — Shared mutable state container + constants
// ═══════════════════════════════════════════════════════════════════

export { BUSY_ORDERS } from '../engine/defs.js';

export const SCROLL_STEP = 64;
export const VP_MAX_SCALE = 4;

export function getMinScale() {
  if (S.vp.offW === 0 || S.vp.offH === 0) return 0.25;
  if (S.vp.wraps) return S.vp.logicalW / S.vp.wrapW;
  return Math.max(S.vp.logicalW / S.vp.offW, S.vp.logicalH / S.vp.offH);
}

export const S = {
  // ── Game data ──
  mpGameState: null,
  mpMapBase: null,
  mpCivSlot: null,
  mpSeatCivMap: null,
  currentMapData: null,

  // ── Assets ──
  files: { sav: null, t1: null, t2: null, cities: null, units: null, icons: null, people: null, cityGif: null },
  mapSprites: null,
  cdSprites: null,
  cvSprites: null,
  cvBackgrounds: null,
  cvFiles: {},
  _researchIconCache: null,
  _explosionFrames: null,

  // ── Viewport ──
  vp: {
    x: 0, y: 0,
    scale: 1,
    offW: 0, offH: 0,
    wrapW: 0, wraps: false,
    logicalW: 0, logicalH: 0,
  },
  viewportCanvas: null,
  vCtx: null,
  mapCanvasBase: null,
  mapCanvasFow: null,
  mapCanvasLos: null,
  mapCanvasFowLos: null,
  gridCanvas: null,
  minimapCanvas: null,
  minimapCanvasLos: null,
  minimapCanvasFow: null,
  minimapCanvasFowLos: null,
  cachedFowCiv: 0,
  cachedLosData: null,
  _losRendering: null,
  _fowRendering: null,
  _fowLosRendering: null,

  // ── Selection / blink ──
  mpSelectedUnit: null,
  blinkOn: true,
  blinkInterval: null,
  blinkPatches: null,
  blinkUnitOverlay: null,
  blinkUnderlay: null,

  // ── Pending actions ──
  pendingMoveUnit: null,
  pendingAutoAdvanceFrom: null,
  mercenaryQueue: [],

  // ── WebSocket / lobby ──
  wsClientId: null,
  wsSessionId: null,
  wsRoomId: null,
  wsPlayerIndex: null,
  wsRooms: [],
  wsLastRoom: null,
  wsGameStarted: false,
  wsRoomName: '',
  activeGames: [],

  // ── Scene ──
  currentScene: 'menu',
  gameEnteredFrom: 'menu',
  rendering: false,
  menuMuted: false,

  // ── Modes ──
  gotoMode: false,
  rebaseMode: false,

  // ── Unit menu ──
  unitMenu: null,
  unitMenuButtons: [],
  unitMenuDefaultAction: null,
  unitMenuHighlightIdx: -1,
  unitMenuShowTime: 0,

  // ── Chat ──
  chatOpen: false,
  chatUnread: 0,
  chatShowGameLog: true,
  chatPinned: false,

  // ── Transport ──
  transport: null,
};
