// ═══════════════════════════════════════════════════════════════════
// unit-ui.js — Unit selection, blink, combat, context menu, and modes
// ═══════════════════════════════════════════════════════════════════

import { S, BUSY_ORDERS } from './state.js';
import { clampViewport, drawViewport, blitPatchToViewport, invalidateFowCanvases } from './viewport.js';
import { sfx, UNIT_ATK_SFX, getCombatAttackSound } from './sound.js';
import { showOverlayMessage, showConfirmDialog, showNameCityDialog } from './dialogs.js';
import { Civ2Renderer } from './renderer.js';
import { UNIT_NAMES, ORDER_KEYS, ORDER_NAMES, UNIT_DOMAIN, UNIT_ATK, UNIT_DEF, UNIT_CARRY_CAP, UNIT_MOVE_POINTS, TERRAIN_NAMES, TERRAIN_TRANSFORM } from '../engine/defs.js';
import { getValidActions, validateAction, calcBribeCost, calcInciteCost } from '../engine/rules.js';
import { MOVE_UNIT, BUILD_CITY, UNIT_ORDER, WORKER_ORDER, PILLAGE, ESTABLISH_TRADE, BRIBE_UNIT, STEAL_TECH, SABOTAGE_CITY, INCITE_REVOLT, BOMBARD, REBASE, GOTO, TRANSFORM_TERRAIN } from '../engine/actions.js';
import { findPath } from '../engine/pathfinding.js';

// ── Late-bound dependencies ──
let _deps = {};
export function registerUnitUiDeps(deps) { _deps = deps; }

// ═══════════════════════════════════════════════════════════════════
// SELECTION
// ═══════════════════════════════════════════════════════════════════

export function findFirstOwnUnit() {
  if (!S.mpGameState) return null;
  for (const u of S.mpGameState.units) {
    if (u.owner === S.mpCivSlot && u.gx >= 0) return u;
  }
  return null;
}

/** Shift the first valid (alive + has moves) unit from the mercenary queue, or return null. */
export function shiftMercenaryQueue() {
  while (S.mercenaryQueue.length > 0) {
    const idx = S.mercenaryQueue.shift();
    if (!S.mpGameState) return null;
    const u = S.mpGameState.units[idx];
    if (u && u.owner === S.mpCivSlot && u.movesLeft > 0 && u.gx >= 0 && !BUSY_ORDERS.has(u.orders)) return idx;
  }
  return null;
}

export function findNextMovableUnit(afterIndex) {
  if (!S.mpGameState) return null;
  const units = S.mpGameState.units;

  // Binary FUN_005b6512: distance-based priority from current unit position.
  // Find the nearest movable unit to the last active unit's position.
  // Falls back to round-robin if no position reference.
  const refUnit = (afterIndex >= 0 && afterIndex < units.length) ? units[afterIndex] : null;
  const refGx = refUnit?.gx ?? 0;
  const refGy = refUnit?.gy ?? 0;
  const mapW = S.currentMapData?.mw || 80;
  const wraps = S.currentMapData?.wraps ?? true;

  let bestIdx = -1;
  let bestDist = Infinity;

  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    if (u.owner !== S.mpCivSlot || u.movesLeft <= 0 || u.gx < 0 || BUSY_ORDERS.has(u.orders)) continue;
    if (i === afterIndex) continue; // skip current unit
    let dx = Math.abs(u.gx - refGx);
    if (wraps) dx = Math.min(dx, mapW - dx);
    const dy = Math.abs(u.gy - refGy);
    const dist = dx + dy;
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  }
  return bestIdx >= 0 ? bestIdx : null;
}

export function centerOnTile(gx, gy) {
  if (!S.currentMapData) return;
  const TW = 64, TH = 32;
  const px = gx * TW + ((gy % 2) ? (TW >> 1) : 0) + TW / 2;
  const py = gy * (TH >> 1) + TH / 2;
  S.vp.x = px - S.vp.logicalW / S.vp.scale / 2;
  S.vp.y = py - S.vp.logicalH / S.vp.scale / 2;
  clampViewport();
  drawViewport();
}

export function centerOnUnit(unit) {
  if (!unit) return;
  centerOnTile(unit.gx, unit.gy);
}

/** Check if a tile is currently visible within the viewport. */
export function isTileInViewport(gx, gy) {
  const TW = 64, TH = 32;
  const px = gx * TW + ((gy % 2) ? (TW >> 1) : 0) + TW / 2;
  const py = gy * (TH >> 1) + TH / 2;
  const viewW = S.vp.logicalW / S.vp.scale;
  const viewH = S.vp.logicalH / S.vp.scale;
  // Add margin so we recenter if the unit is near the edge
  const margin = TW;
  return px > S.vp.x + margin && px < S.vp.x + viewW - margin
      && py > S.vp.y + margin && py < S.vp.y + viewH - margin;
}

export function selectUnit(idx) {
  S.mpSelectedUnit = idx;
  stopBlink();
  // Re-render map atomically — blink starts after swap completes
  quickRerender();
  // Update unit info strip (if available)
  if (_deps.updateUnitInfoStrip) _deps.updateUnitInfoStrip();
}

// Lightweight re-render: atomic swap (no sprite re-extraction)
export async function quickRerender() {
  if (!S.mapSprites || !S.currentMapData) return;
  await _deps.renderAtomicSwap(S.currentMapData);
}

// ═══════════════════════════════════════════════════════════════════
// BLINK
// Binary ref: Civ2-clone UnitReadyView.cs / WaitingView.cs
// ═══════════════════════════════════════════════════════════════════

// Blink / timer intervals from binary (@ 0x00413717, block_00410000.c:2047-2048)
const CURSOR_BLINK_UNIT_READY_MS = 150;    // @ 0x00413717: 0x96 = 150ms — cursor blink / unit flash
const CURSOR_BLINK_WAITING_VIEW_MS = 200;  // Civ2-clone WaitingView.cs — "view piece" cursor blink
export const GAME_TICK_INTERVAL_MS = 500;  // @ 0x00413717: 500ms — game tick / auto-advance timer

export function startBlink() {
  stopBlink();
  // Don't blink units with no movement points remaining
  if (S.mpSelectedUnit != null && S.mpGameState) {
    const u = S.mpGameState.units[S.mpSelectedUnit];
    if (u && u.movesLeft <= 0) return;
  }
  S.blinkOn = true;
  S.blinkInterval = setInterval(() => {
    S.blinkOn = !S.blinkOn;
    toggleBlinkOverlay();
  }, CURSOR_BLINK_UNIT_READY_MS);
}

export function stopBlink() {
  if (S.blinkInterval) {
    clearInterval(S.blinkInterval);
    S.blinkInterval = null;
  }
  S.blinkOn = true;
}

// Lightweight blink toggle: restore small region, then optionally overlay unit
export function toggleBlinkOverlay() {
  if (!S.blinkUnderlay || !S.blinkUnitOverlay) return;
  if (document.getElementById('minimap-toggle').checked) return;
  // Restore base viewport region (no unit)
  S.vCtx.putImageData(S.blinkUnderlay.imageData, S.blinkUnderlay.vpX, S.blinkUnderlay.vpY);
  // If blink-on, composite unit overlay on top
  if (S.blinkOn) {
    blitPatchToViewport(S.blinkUnitOverlay.canvas, S.blinkUnitOverlay.x, S.blinkUnitOverlay.y);
  }
}

// ═══════════════════════════════════════════════════════════════════
// TILE UPDATES
// ═══════════════════════════════════════════════════════════════════

export function applyVisibilityUpdate(tileVisibility) {
  if (!tileVisibility || !S.mpMapBase?.tileData) return;
  for (let i = 0; i < tileVisibility.length; i++) {
    S.mpMapBase.tileData[i].visibility = tileVisibility[i];
  }
  S.cachedLosData = null;
  invalidateFowCanvases();
}

export function applyGoodyHutUpdate(tileGoodyHuts) {
  if (!tileGoodyHuts || !S.mpMapBase?.tileData) return;
  for (let i = 0; i < tileGoodyHuts.length && i < S.mpMapBase.tileData.length; i++) {
    S.mpMapBase.tileData[i].goodyHut = !!tileGoodyHuts[i];
  }
}

export function applyTerrainUpdate(tileTerrains) {
  if (!tileTerrains || !S.mpMapBase?.tileData) return;
  for (let i = 0; i < tileTerrains.length && i < S.mpMapBase.tileData.length; i++) {
    S.mpMapBase.tileData[i].terrain = tileTerrains[i];
  }
}

export function applyOwnershipUpdate(tileOwnership) {
  if (!tileOwnership || !S.mpMapBase?.tileData) return;
  for (let i = 0; i < tileOwnership.length && i < S.mpMapBase.tileData.length; i++) {
    S.mpMapBase.tileData[i].tileOwnership = tileOwnership[i];
  }
}

export function applyImprovementsUpdate(tileImprovements) {
  if (!tileImprovements || !S.mpMapBase?.tileData) return;
  // Lazy import — improvementFromByte already available via defs
  for (let i = 0; i < tileImprovements.length && i < S.mpMapBase.tileData.length; i++) {
    const b = tileImprovements[i];
    const irr = !!(b & 0x04);
    const mine = !!(b & 0x08);
    const city = !!(b & 0x02);
    const fort = !!(b & 0x40);
    S.mpMapBase.tileData[i].improvements = {
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

// ═══════════════════════════════════════════════════════════════════
// COMBAT ANIMATION
// Binary ref: FUN_0057ed3f (combat movement), FUN_00580341 (battle),
//             Civ2-clone AttackAnimation.cs, MoveAnimation.cs
// ═══════════════════════════════════════════════════════════════════

// ── Combat movement animation (moving units during combat) ──
// Binary ref: FUN_0057ed3f @ block_00570000.c
// Binary FUN_0057ed3f: 8 slide frames × 64ms = 512ms attacker slide-in
const COMBAT_MOVE_FRAMES = 8;
const COMBAT_MOVE_MS_PER_FRAME = 64;
const COMBAT_POST_ANIM_DELAY = 10;   // play_delay_animation(10) @ 0x0057f5e6

// ── Battle explosion animation ──
// Binary ref: FUN_00580341 @ block_00580000.c (combat orchestration),
//             FUN_0057ed3f @ block_00570000.c (8-frame explosion sprite).
// Each explosion: 8 frames × 64ms (COMBAT_MOVE_MS_PER_FRAME) = 512ms,
// followed by FUN_0046e287(10) ≈ 167ms post-delay.
// Ancient era: both units with move < 30 → framesPerHpTick halved (5 vs 10).
const ANCIENT_ERA_MOVE_THRESHOLD = 30; // 0x1E from binary FUN_00580341:740-745

// ── Unit movement animation ──
// Binary ref: FUN_0057ed3f, Civ2-clone MoveAnimation.cs
const MOVEMENT_FRAMES_PER_TILE = 8;   // outer loop count, MoveAnimation noFramesForOneMove
const MOVEMENT_MS_PER_FRAME = 30;     // Civ2-clone: MoveAnimation interval = 30ms
const MOVEMENT_TOTAL_MS = 240;        // 8 × 30ms per tile traversal
const MOVEMENT_CITY_ENTRY_FRAMES = 7; // noFramesForOneMove - 1 for city entry (last blank)

// ── Nuke explosion animation ──
// Binary ref: FUN_0057f657 @ block_00570000.c
const NUKE_TOTAL_FRAMES = 11;         // loop: local_34 < 0xb @ 0x0057f897
const NUKE_MS_PER_FRAME = 100;        // timeGetTime comparison: < 100 @ 0x0057f8be
const NUKE_TOTAL_MS = 1100;           // 11 × 100ms
const NUKE_SPRITE_WIDTH = 0x5B;       // 91px at zoom 0 — scale_sprite(0x5B) @ 0x0057f880
const NUKE_SPRITE_HEIGHT = 0x48;      // 72px at zoom 0 — scale_sprite(0x48) @ 0x0057f886
const NUKE_SPRITE_SOURCE = 'Tiles.dll #85'; // DLL resource for mushroom cloud frames
const NUKE_SOUND_ID = 0x32;           // play_sound(0x32) = nuke explosion @ 0x0057f867
const NUKE_PRE_DELAY_MS = 5500;       // wait loop < 0x157c when detailed anim enabled @ 0x0057f878

// ── Explosion sprites from ICONS.GIF ──
export async function _ensureExplosionFrames() {
  if (S._explosionFrames) return S._explosionFrames;
  if (!S.files.icons) return null;
  const img = await Civ2Renderer.loadImage(S.files.icons);
  const ctx = Civ2Renderer.imgToCtx(img);
  const CK = [[255, 0, 255, 15], [255, 159, 163, 15]];
  S._explosionFrames = [];
  for (let i = 0; i < 8; i++) {
    S._explosionFrames.push(Civ2Renderer.extractSprite(ctx, 1 + 33 * i, 356, 32, 32, CK, false));
  }
  return S._explosionFrames;
}

// ── Combat animation — binary-faithful port of FUN_00580341 + FUN_0057ed3f ──
//
// The Civ2 binary's combat animation is much simpler than typical fan-made
// reimplementations. The key facts (verified line-by-line in
// reverse_engineering/decompiled/block_00580000.c and block_00570000.c):
//
//   * NO unit slide phase. Both units stay at their original map tiles
//     for the entire battle. There is no Phase 1 "slide attacker toward
//     defender" — that's a JS invention.
//
//   * NO hit-flash overlay. Damage is communicated via explosion sprites,
//     not red flashing on units.
//
//   * HP bars ARE visible during combat — they're part of each unit's
//     normal "shield" rendering on the map. The combat loop applies damage
//     to the unit struct (line 807, 841), then after each in-combat
//     explosion calls FUN_005802fd → FUN_0047ce1e → FUN_0047cbb4 (line 819,
//     853) which is the per-tile redraw function. The redraw shows the
//     unit with its NEW damage value, including the updated HP bar.
//
//   * Per-round dice + damage accumulation, with a "frame boundary" check:
//       local_2c = 10 >> bothAncient   (ancient = both unit move < 0x1E)
//       if (accum_damage / local_2c) crossed an integer boundary →
//         play an 8-frame explosion at the LOSER's tile
//     Where "loser" of a round = the unit that took damage that round.
//     For an attacker hit: explosion plays at the DEFENDER's tile.
//     For a defender hit: explosion plays at the ATTACKER's tile.
//
//   * Each explosion (FUN_0057ed3f, lines 5576-5708): 8 frames × 64ms each
//     = 512ms, plus a 167ms post-delay (FUN_0046e287(10)). Total ~680ms.
//
//   * Post-combat: if zero in-combat explosions fired (`!bVar4` at line 921),
//     play one final explosion at the loser's tile so the user sees the death.
//     Otherwise the in-combat explosions already conveyed the death and no
//     additional death animation is shown.
//
//   * NO survivor advance animation. The loser's sprite is removed (state
//     change), the next render shows the new map state.
//
// Damage scale: maxHp is stored as UNIT_HP * 10. atkFp/defFp are raw
// firepower (typically 1). Each round of damage subtracts firepower from
// HP. So a 10-HP Warrior takes 10 rounds to die.
//
// Sprite positioning for the explosion: a 32×32 sprite at the tile's screen
// origin (FUN_0047a6b0 returns the tile pixel coords; FUN_004086c0 sets up a
// 0x20×0x20 = 32×32 rect). We center on the tile for the JS sprite system.
export function animateCombat(cr, onComplete) {
  const TW = 64, TH = 32;
  const defGx = cr.gx, defGy = cr.gy;

  // Map-space positions
  const defTileX = defGx * TW + ((defGy % 2) ? (TW >> 1) : 0);
  const defTileY = defGy * (TH >> 1) - 16;
  const atkGx = cr.atkGx ?? defGx;
  const atkGy = cr.atkGy ?? defGy;
  const atkTileX = atkGx * TW + ((atkGy % 2) ? (TW >> 1) : 0);
  const atkTileY = atkGy * (TH >> 1) - 16;

  // Get unit sprites — create on-demand if not pre-cached. Without this
  // newly spawned units (e.g. barbarian uprising) would silently skip
  // animation when they enter combat before the cache is populated.
  function ensureUnitSprite(unitType, owner) {
    const cacheKey = unitType + '-' + owner;
    if (S.mapSprites?.unitColored?.[cacheKey]) {
      return S.mapSprites.unitColored[cacheKey];
    }
    const template = S.mapSprites?.unitTemplates?.[unitType];
    if (!template || !Civ2Renderer.CIV_COLORS) return null;
    const color = Civ2Renderer.CIV_COLORS[owner] || '#cccccc';
    const sprite = Civ2Renderer._recolorUnit(template, color);
    if (S.mapSprites.unitColored) S.mapSprites.unitColored[cacheKey] = sprite;
    return sprite;
  }
  const atkSprite = ensureUnitSprite(cr.attacker, cr.atkOwner);
  const defSprite = ensureUnitSprite(cr.defender, cr.defOwner);
  if (!atkSprite || !defSprite) {
    if (onComplete) onComplete();
    return;
  }

  stopBlink();

  // Snapshot the post-combat map state (units have been resolved on the
  // server; the loser is already gone from the snapshot). We'll draw
  // both units back on top of this snapshot for the duration of the
  // animation, then let the next render show the post-combat state.
  const bgSnapshot = S.vCtx.getImageData(0, 0, S.viewportCanvas.width, S.viewportCanvas.height);
  const dpr = window.devicePixelRatio || 1;
  const pxPerMap = S.vp.scale * dpr;

  function screenX(mx) {
    if (S.vp.wraps && S.vp.wrapW > 0) {
      const x1 = ((S.vp.x % S.vp.wrapW) + S.vp.wrapW) % S.vp.wrapW;
      return ((mx - x1) % S.vp.wrapW + S.vp.wrapW) % S.vp.wrapW * pxPerMap;
    }
    return (mx - S.vp.x) * pxPerMap;
  }
  function screenY(my) { return (my - S.vp.y) * pxPerMap; }

  function drawSpriteAt(sprite, mx, my) {
    S.vCtx.drawImage(sprite, screenX(mx), screenY(my),
      sprite.width * pxPerMap, sprite.height * pxPerMap);
  }

  // Update a unit's existing HP bar in place. Mirrors the renderer's main
  // unit-draw HP bar logic (renderer.js:1371-1379) EXACTLY — draws ONLY
  // the colored portion (no separate black background) so it overwrites
  // the snapshot's existing bar without adding any new visual element.
  // The shield underneath (civ-colored background, drawn into bgSnapshot
  // by the main renderer) shows through where the bar ends.
  //
  // This works because the animation always goes from MORE HP → LESS HP,
  // so the per-event bar is always at least as wide as the snapshot's
  // final-state bar — drawing the new colored portion completely covers
  // the snapshot's bar.
  function updateHpBarAt(unitType, mx, my, curHp, maxHp) {
    const sprites = S.mapSprites;
    const so = sprites?.shieldOffsets?.[unitType];
    if (!so) return; // no shield position known — skip
    const shieldX = mx + so.x - 1;
    const shieldY = my - 16 + so.y - 1;
    const barWmap = 12;
    const barHmap = 3;
    const barX = shieldX;
    const barY = shieldY + 2;
    const ratio = Math.max(0, Math.min(1, curHp / Math.max(1, maxHp)));
    const greenWmap = Math.floor(ratio * barWmap);
    if (greenWmap <= 0) return;

    // Same color thresholds as the main renderer (renderer.js:1376-1378)
    if (greenWmap > 8) S.vCtx.fillStyle = 'rgb(87,171,39)';      // green
    else if (greenWmap > 3) S.vCtx.fillStyle = 'rgb(255,223,79)'; // yellow
    else S.vCtx.fillStyle = 'rgb(243,0,0)';                       // red

    // Draw only the colored portion, matching renderer.js:1379:
    //   ctx.fillRect(barX, barY, greenW, barH)
    S.vCtx.fillRect(
      screenX(barX),
      screenY(barY),
      greenWmap * pxPerMap,
      barHmap * pxPerMap
    );
  }

  const rounds = cr.rounds;
  if (!rounds || rounds.length === 0) {
    if (onComplete) onComplete();
    return;
  }

  // HP tracking — pre-compute the visual events from the rounds array.
  // Binary FUN_00580341:806-810 / 840-844: each round accumulates damage,
  // and a visual update fires only when (accum_damage / framesPerHpTick)
  // crosses an integer boundary.
  const atkFp = cr.atkFp || 1;
  const defFp = cr.defFp || 1;
  const attackerWins = cr.type === 'atkWin';
  const atkMaxHp = cr.atkMaxHp || 10;
  const defMaxHp = cr.defMaxHp || 10;
  // The combat may not have started at full HP (e.g. previously damaged units).
  const atkStartHp = cr.atkStartHp ?? atkMaxHp;
  const defStartHp = cr.defStartHp ?? defMaxHp;

  // Binary: local_2c = 10 >> bothAncient (5 if both ancient, else 10)
  const atkMove = (UNIT_MOVE_POINTS[cr.attacker] || 1) * 3;
  const defMove = (UNIT_MOVE_POINTS[cr.defender] || 1) * 3;
  const bothAncient = atkMove < ANCIENT_ERA_MOVE_THRESHOLD && defMove < ANCIENT_ERA_MOVE_THRESHOLD;
  const framesPerHpTick = bothAncient ? 5 : 10;

  // Each visual event = an explosion at one of the two tiles, with the
  // running HP values AFTER this round's damage is applied.
  //   atTile: 'def' (attacker hit defender) or 'atk' (defender hit attacker)
  //   atkHp / defHp: HP values to show on the bars at this point
  const visualEvents = [];
  {
    let atkD = 0, defD = 0;
    for (const atkWon of rounds) {
      const prevAF = Math.floor(atkD / framesPerHpTick);
      const prevDF = Math.floor(defD / framesPerHpTick);
      if (atkWon) defD += atkFp;
      else atkD += defFp;
      const newAF = Math.floor(atkD / framesPerHpTick);
      const newDF = Math.floor(defD / framesPerHpTick);
      if (newAF !== prevAF || newDF !== prevDF) {
        visualEvents.push({
          atTile: atkWon ? 'def' : 'atk',
          atkHp: Math.max(0, atkStartHp - atkD),
          defHp: Math.max(0, defStartHp - defD),
        });
      }
    }
  }
  // Binary line 921: if (!bVar4) play one final explosion at the loser's tile.
  // bVar4 is set whenever ANY in-combat boundary fired. If zero events fired,
  // the user wouldn't see the death, so the binary plays one explosion to
  // make the loser visible before it disappears. In that case the loser's
  // HP is 0 (they died from < framesPerHpTick damage).
  if (visualEvents.length === 0) {
    visualEvents.push({
      atTile: attackerWins ? 'def' : 'atk',
      atkHp: attackerWins ? atkStartHp : 0,
      defHp: attackerWins ? 0 : defStartHp,
    });
  }

  // Restore the snapshot and draw BOTH units at their original tiles WITH
  // HP bars showing the given hp values. This is the "between explosion
  // frames" baseline — what the binary shows after each tile redraw.
  function drawCombatScene(atkHp, defHp) {
    S.vCtx.putImageData(bgSnapshot, 0, 0);
    drawSpriteAt(atkSprite, atkTileX, atkTileY);
    drawSpriteAt(defSprite, defTileX, defTileY);
    updateHpBarAt(cr.attacker, atkTileX, atkTileY, atkHp, atkMaxHp);
    updateHpBarAt(cr.defender, defTileX, defTileY, defHp, defMaxHp);
  }

  // Play attack sound — binary dispatch from FUN_00580341:581-679
  const atkDom = UNIT_DOMAIN[cr.attacker] ?? 0;
  const defDom = UNIT_DOMAIN[cr.defender] ?? 0;
  const isMissile = !!(cr.attacker >= 44 && cr.attacker <= 45); // flags_hi & 0x10 proxy
  const atkAtk = UNIT_ATK[cr.attacker] || 0;
  const atkRange = 0;
  const hasCarryAir = false;
  const combatSound = getCombatAttackSound(cr.attacker, atkDom, defDom, isMissile, atkAtk, atkRange, hasCarryAir);
  if (combatSound.sound) sfx(combatSound.sound);

  _ensureExplosionFrames().then(expFrames => {
    if (!expFrames || expFrames.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    // ── Initial draw: both units at their tiles with full HP bars ──
    let prevAtkHp = atkStartHp;
    let prevDefHp = defStartHp;
    drawCombatScene(prevAtkHp, prevDefHp);

    // ── Play visual events sequentially ──
    // Binary FUN_00580341:805-870: each frame-boundary crossing plays an
    // explosion at the loser's tile (8 frames × 64ms + 167ms), then the
    // tiles are redrawn via FUN_005802fd to update the HP bars.
    let evIdx = 0;
    function playNextEvent() {
      if (evIdx >= visualEvents.length) {
        // All events done. Restore snapshot (which already shows the
        // post-combat state with the loser removed) and complete.
        S.vCtx.putImageData(bgSnapshot, 0, 0);
        // Draw the survivor at its original tile (with full survivor HP).
        // The bgSnapshot is the post-combat render, so it already shows
        // the survivor; this explicit draw is just to be safe.
        if (attackerWins) {
          drawSpriteAt(atkSprite, atkTileX, atkTileY);
          updateHpBarAt(cr.attacker, atkTileX, atkTileY, prevAtkHp, atkMaxHp);
        } else {
          drawSpriteAt(defSprite, defTileX, defTileY);
          updateHpBarAt(cr.defender, defTileX, defTileY, prevDefHp, defMaxHp);
        }
        // Brief settling delay before triggering the next render
        setTimeout(() => { if (onComplete) onComplete(); }, 100);
        return;
      }
      const ev = visualEvents[evIdx++];
      const tx = ev.atTile === 'def' ? defTileX : atkTileX;
      const ty = ev.atTile === 'def' ? defTileY : atkTileY;
      // Capture the new HP values for this event — these will be applied
      // AFTER the explosion finishes (matching the binary's redraw-after-
      // explosion ordering at FUN_00580341:819).
      const newAtkHp = ev.atkHp;
      const newDefHp = ev.defHp;
      playExplosion(tx, ty, prevAtkHp, prevDefHp, () => {
        // After the explosion: redraw with NEW HP values
        prevAtkHp = newAtkHp;
        prevDefHp = newDefHp;
        drawCombatScene(prevAtkHp, prevDefHp);
        // Brief delay between events so the user sees the HP bar change
        setTimeout(playNextEvent, 100);
      });
    }

    // FUN_0057ed3f: 8-frame explosion at a single tile, 64ms per frame,
    // followed by a ~167ms post-delay (FUN_0046e287(10)).
    // The explosion plays OVER a baseline scene showing the OLD HP values
    // (the binary's saved background contains the pre-update state, since
    // the redraw happens AFTER the explosion).
    function playExplosion(tx, ty, bgAtkHp, bgDefHp, done) {
      let fi = 0;
      function frame() {
        if (fi >= 8) {
          // Post-delay matching FUN_0046e287(10) → ~167ms
          setTimeout(done, COMBAT_POST_ANIM_DELAY * 50 / 3);
          return;
        }
        // Each frame: redraw baseline (with OLD HP), then explosion sprite on top
        drawCombatScene(bgAtkHp, bgDefHp);
        // Center the 32×32 explosion on the unit sprite (~+16, +8 within
        // the 64×48 unit cell — this matches the existing JS offset which
        // visually centers on the unit).
        drawSpriteAt(expFrames[fi], tx + 16, ty + 8);
        fi++;
        setTimeout(frame, COMBAT_MOVE_MS_PER_FRAME);
      }
      frame();
    }

    // Start
    setTimeout(playNextEvent, 50);
  });
}

// ═══════════════════════════════════════════════════════════════════
// UNIT CONTEXT MENU
// ═══════════════════════════════════════════════════════════════════

/**
 * Render a unit sprite with its shield (HP bar + order letter) onto a canvas.
 * Returns the canvas element suitable for use as a menu sprite thumbnail.
 */
export function renderUnitThumbnail(unit) {
  if (!S.mapSprites) return null;
  const unitSprite = S.mapSprites.unitColored?.[unit.type + '-' + unit.owner];
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
  const so = S.mapSprites.shieldOffsets?.[unit.type];
  const shieldFront = S.mapSprites.shieldFrontColored?.['shieldFront-' + unit.owner];
  if (so && shieldFront) {
    const sx = so.x - 1, sy = so.y - 1;

    // Shadow
    const shadowDX = (so.x < 32) ? -1 : 1;
    if (S.mapSprites.shieldShadow) {
      ctx.drawImage(S.mapSprites.shieldShadow, sx + shadowDX, sy + 1);
    }

    // Shield front
    ctx.drawImage(shieldFront, sx, sy);

    // HP bar
    const maxHp = Civ2Renderer.UNIT_MAX_HP[unit.type] || 10;
    const curHp = Math.max(0, maxHp - (unit.movesRemain || 0));
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
export function actionToMenuItem(va, unitIdx) {
  const u = S.mpGameState.units[unitIdx];
  const name = UNIT_NAMES[u.type] || `Unit ${u.type}`;

  switch (va.type) {
    case MOVE_UNIT:
      return {
        label: `Move ${name}`,
        isDefault: true,
        action: () => {
          S.pendingMoveUnit = unitIdx;
          S.pendingAutoAdvanceFrom = unitIdx;
          S.transport.sendRaw({
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
export function buildOrderMenuItems(unitIdx) {
  const u = S.mpGameState.units[unitIdx];
  if (!u || u.gx < 0) return [];
  const items = [];
  const civSlot = u.owner;

  // Note: "Wake Up" is added by the caller (app.js) when contextually appropriate,
  // so we don't add it here to avoid duplicates.

  // Open City (if unit is on a city tile)
  if (S.mpGameState?.cities) {
    const cityIdx = S.mpGameState.cities.findIndex(c => c.gx === u.gx && c.gy === u.gy && c.size > 0 && c.owner === civSlot);
    if (cityIdx >= 0) {
      const city = S.mpGameState.cities[cityIdx];
      items.push({ label: `Open ${city.name}`, action: () => {
        // Lazy import to avoid circular dep
        import('./city-ui.js').then(mod => mod.openCityDialog(city, cityIdx));
      }});
    }
  }

  // Unit orders
  const unitOrders = [
    { order: 'fortify', label: 'Fortify' },
    { order: 'sentry', label: 'Sentry' },
    { order: 'skip', label: 'Skip Turn' },
  ];
  for (const { order, label } of unitOrders) {
    const err = validateAction(S.mpGameState, S.mpMapBase, { type: UNIT_ORDER, unitIndex: unitIdx, order }, civSlot);
    if (!err) items.push({ label, action: () => S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: unitIdx, order } }) });
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
      const err = validateAction(S.mpGameState, S.mpMapBase, { type: WORKER_ORDER, unitIndex: unitIdx, order }, civSlot);
      if (!err) validWorker.push({ label, action: () => S.transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: unitIdx, order } }) });
    }
    if (validWorker.length > 0) {
      items.push({ separator: true });
      items.push(...validWorker);
    }
  }

  // Pillage
  {
    const err = validateAction(S.mpGameState, S.mpMapBase, { type: PILLAGE, unitIndex: unitIdx }, civSlot);
    if (!err) items.push({ label: 'Pillage', action: () => {
      showConfirmDialog('Pillage improvement?', () => {
        S.transport.sendRaw({ type: 'ACTION', action: { type: PILLAGE, unitIndex: unitIdx } });
      }, 'Pillage?');
    }});
  }

  // Establish Trade Route (Caravan/Freight in a foreign or distant city)
  if (u.type === 48 || u.type === 49) {
    // Find city at unit's tile
    const ci = S.mpGameState.cities.findIndex(c => c.gx === u.gx && c.gy === u.gy && c.size > 0);
    if (ci >= 0) {
      const err = validateAction(S.mpGameState, S.mpMapBase, { type: ESTABLISH_TRADE, unitIndex: unitIdx, cityIndex: ci }, civSlot);
      if (!err) items.push({ label: 'Establish Trade Route', action: () => {
        S.transport.sendRaw({ type: 'ACTION', action: { type: ESTABLISH_TRADE, unitIndex: unitIdx, cityIndex: ci } });
      }});
    }
  }

  // Diplomat/Spy actions
  if (u.type === 46 || u.type === 47) {
    const spyItems = [];
    // City actions: steal tech, sabotage, incite revolt (when on enemy city)
    const spyCity = S.mpGameState.cities.find(c => c.gx === u.gx && c.gy === u.gy && c.size > 0 && c.owner !== civSlot);
    if (spyCity) {
      const stealErr = validateAction(S.mpGameState, S.mpMapBase, { type: STEAL_TECH, unitIndex: unitIdx }, civSlot);
      if (!stealErr) spyItems.push({ label: 'Steal Technology', action: () => {
        S.transport.sendRaw({ type: 'ACTION', action: { type: STEAL_TECH, unitIndex: unitIdx } });
      }});
      const sabErr = validateAction(S.mpGameState, S.mpMapBase, { type: SABOTAGE_CITY, unitIndex: unitIdx }, civSlot);
      if (!sabErr) spyItems.push({ label: 'Sabotage City', action: () => {
        S.transport.sendRaw({ type: 'ACTION', action: { type: SABOTAGE_CITY, unitIndex: unitIdx } });
      }});
      const incErr = validateAction(S.mpGameState, S.mpMapBase, { type: INCITE_REVOLT, unitIndex: unitIdx }, civSlot);
      if (!incErr) {
        const cost = calcInciteCost(S.mpGameState, spyCity, S.mpMapBase);
        spyItems.push({ label: `Incite Revolt (${cost}g)`, action: () => {
          showConfirmDialog(`Incite revolt in ${spyCity.name} for ${cost} gold?`, () => {
            S.transport.sendRaw({ type: 'ACTION', action: { type: INCITE_REVOLT, unitIndex: unitIdx } });
          }, 'Incite Revolt?');
        }});
      }
    }
    // Bribe adjacent enemy unit
    for (let ti = 0; ti < S.mpGameState.units.length; ti++) {
      const t = S.mpGameState.units[ti];
      if (t.owner === civSlot || t.gx < 0) continue;
      const bErr = validateAction(S.mpGameState, S.mpMapBase, { type: BRIBE_UNIT, unitIndex: unitIdx, targetIndex: ti }, civSlot);
      if (!bErr) {
        const cost = calcBribeCost(S.mpGameState, t, S.mpMapBase, civSlot);
        const tName = UNIT_NAMES[t.type] || 'Unit';
        spyItems.push({ label: `Bribe ${tName} (${cost}g)`, action: () => {
          showConfirmDialog(`Bribe ${tName} for ${cost} gold?`, () => {
            S.transport.sendRaw({ type: 'ACTION', action: { type: BRIBE_UNIT, unitIndex: unitIdx, targetIndex: ti } });
          }, 'Bribe Unit?');
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
    const tfErr = validateAction(S.mpGameState, S.mpMapBase, { type: TRANSFORM_TERRAIN, unitIndex: unitIdx }, civSlot);
    if (!tfErr) {
      const terrain = S.mpMapBase.getTerrain(u.gx, u.gy);
      const targetT = TERRAIN_TRANSFORM[terrain];
      const label = targetT >= 0 ? `Transform to ${TERRAIN_NAMES[targetT]}` : 'Transform';
      items.push({ label, action: () => doTransformTerrain() });
    }
  }

  // Rebase (air units only)
  if ((UNIT_DOMAIN[u.type] ?? 0) === 1 && u.movesLeft > 0) {
    items.push({ label: 'Rebase (L)', action: () => { selectUnit(unitIdx); enterRebaseMode(); } });
  }

  // Airbase (settler/engineer)
  if (u.type === 0 || u.type === 1) {
    const abErr = validateAction(S.mpGameState, S.mpMapBase, { type: WORKER_ORDER, unitIndex: unitIdx, order: 'airbase' }, civSlot);
    if (!abErr) items.push({ label: 'Build Airbase', action: () => {
      S.pendingAutoAdvanceFrom = unitIdx;
      S.transport.sendRaw({ type: 'ACTION', action: { type: WORKER_ORDER, unitIndex: unitIdx, order: 'airbase' } });
    }});
  }

  // Disband (always available for live units)
  items.push({ separator: true });
  items.push({
    label: 'Disband',
    action: () => {
      showConfirmDialog(`Disband ${UNIT_NAMES[u.type]}?`, () => {
        S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex: unitIdx, order: 'disband' } });
      }, 'Disband Unit?');
    },
  });

  return items;
}

export function showUnitMenu(clientX, clientY, items) {
  S.unitMenu.innerHTML = '';
  S.unitMenu.classList.remove('visible');
  S.unitMenuDefaultAction = null;
  S.unitMenuHighlightIdx = -1;
  S.unitMenuButtons = [];
  if (items.length === 0) return;

  let firstDefault = null;

  for (const item of items) {
    if (item.separator) {
      const hr = document.createElement('div');
      hr.className = 'unit-menu-separator';
      S.unitMenu.appendChild(hr);
      continue;
    }
    if (item.header) {
      const hdr = document.createElement('div');
      hdr.className = 'unit-menu-header';
      hdr.textContent = item.header;
      S.unitMenu.appendChild(hdr);
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
    S.unitMenu.appendChild(btn);
    S.unitMenuButtons.push({ btn, action: item.action });

    // Mark isDefault items (e.g. Move) or use the first actionable item
    if (item.isDefault && !firstDefault) {
      firstDefault = { btn, action: item.action, idx: S.unitMenuButtons.length - 1 };
    }
  }

  // Highlight the default item (or first item if none marked)
  const def = firstDefault || (S.unitMenuButtons.length > 0 ? { ...S.unitMenuButtons[0], idx: 0 } : null);
  if (def) {
    S.unitMenuDefaultAction = def.action;
    S.unitMenuHighlightIdx = def.idx;
    def.btn.classList.add('unit-menu-highlight');
  }

  // Position: keep menu within viewport bounds
  S.unitMenu.style.left = '0px';
  S.unitMenu.style.top = '0px';
  S.unitMenu.classList.add('visible');
  S.unitMenuShowTime = Date.now();
  const rect = S.unitMenu.getBoundingClientRect();
  const mx = Math.min(clientX, window.innerWidth - rect.width - 4);
  const my = Math.min(clientY, window.innerHeight - rect.height - 4);
  S.unitMenu.style.left = Math.max(0, mx) + 'px';
  S.unitMenu.style.top = Math.max(0, my) + 'px';

  // Click-away listener: dismiss menu when clicking outside it
  const clickAway = e => {
    if (!S.unitMenu.contains(e.target)) {
      hideUnitMenu();
    }
  };
  // Delay to avoid the same click that opened the menu from closing it
  requestAnimationFrame(() => window.addEventListener('pointerdown', clickAway, { once: true, capture: true }));
  S._unitMenuClickAway = clickAway;
}

export function hideUnitMenu() {
  if (S._unitMenuClickAway) {
    window.removeEventListener('pointerdown', S._unitMenuClickAway, { capture: true });
    S._unitMenuClickAway = null;
  }
  S.unitMenu.classList.remove('visible');
  S.unitMenu.innerHTML = '';
  S.unitMenuDefaultAction = null;
  S.unitMenuHighlightIdx = -1;
  S.unitMenuButtons = [];
}

// ═══════════════════════════════════════════════════════════════════
// MODES — Go-to, Rebase, Transform
// ═══════════════════════════════════════════════════════════════════

export function enterGotoMode() {
  if (S.mpSelectedUnit == null || !S.mpGameState || !S.mpMapBase) return;
  S.gotoMode = true;
  document.getElementById('map-container').style.cursor = 'crosshair';
}

export function exitGotoMode() {
  S.gotoMode = false;
  document.getElementById('map-container').style.cursor = '';
}

export function handleGotoClick(tileGx, tileGy) {
  if (!S.gotoMode || S.mpSelectedUnit == null) { exitGotoMode(); return; }
  const u = S.mpGameState.units[S.mpSelectedUnit];
  if (!u || u.gx < 0) { exitGotoMode(); return; }

  const path = findPath(u.type, u.gx, u.gy, tileGx, tileGy, S.mpMapBase, u.owner, S.mpGameState.units, S.mpGameState.cities);
  if (!path || path.length === 0) {
    showOverlayMessage('No path found');
    exitGotoMode();
    return;
  }

  S.transport.sendRaw({
    type: 'ACTION',
    action: { type: GOTO, unitIndex: S.mpSelectedUnit, targetGx: tileGx, targetGy: tileGy, path },
  });
  S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
  exitGotoMode();
}

export function doBombard(unitIndex, targetGx, targetGy) {
  S.transport.sendRaw({
    type: 'ACTION',
    action: { type: BOMBARD, unitIndex, targetGx, targetGy },
  });
}

export function enterRebaseMode() {
  if (S.mpSelectedUnit == null || !S.mpGameState) return;
  const u = S.mpGameState.units[S.mpSelectedUnit];
  if (!u || (UNIT_DOMAIN[u.type] ?? 0) !== 1) return;
  S.rebaseMode = true;
  document.getElementById('map-container').style.cursor = 'crosshair';
}

export function exitRebaseMode() {
  S.rebaseMode = false;
  document.getElementById('map-container').style.cursor = '';
}

export function handleRebaseClick(tileGx, tileGy) {
  if (!S.rebaseMode || S.mpSelectedUnit == null) { exitRebaseMode(); return; }
  S.transport.sendRaw({
    type: 'ACTION',
    action: { type: REBASE, unitIndex: S.mpSelectedUnit, targetGx: tileGx, targetGy: tileGy },
  });
  S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
  exitRebaseMode();
}

export function doTransformTerrain() {
  if (S.mpSelectedUnit == null || !S.mpGameState) return;
  const u = S.mpGameState.units[S.mpSelectedUnit];
  if (!u || u.type !== 1) return; // Engineers only
  S.transport.sendRaw({
    type: 'ACTION',
    action: { type: TRANSFORM_TERRAIN, unitIndex: S.mpSelectedUnit },
  });
  S.pendingAutoAdvanceFrom = S.mpSelectedUnit;
}
