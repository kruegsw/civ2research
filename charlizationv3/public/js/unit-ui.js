// ═══════════════════════════════════════════════════════════════════
// unit-ui.js — Unit selection, blink, combat, context menu, and modes
// ═══════════════════════════════════════════════════════════════════

import { S, BUSY_ORDERS } from './state.js';
import { clampViewport, drawViewport, blitPatchToViewport, invalidateFowCanvases } from './viewport.js';
import { sfx, getDeathSfx, UNIT_ATK_SFX } from './sound.js';
import { showOverlayMessage, showConfirmDialog, showNameCityDialog } from './dialogs.js';
import { Civ2Renderer } from './renderer.js';
import { UNIT_NAMES, ORDER_KEYS, ORDER_NAMES, UNIT_DOMAIN, UNIT_ATK, UNIT_DEF, UNIT_CARRY_CAP, TERRAIN_NAMES, TERRAIN_TRANSFORM } from '../engine/defs.js';
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
  for (let i = 0; i < units.length; i++) {
    const idx = (afterIndex + 1 + i) % units.length;
    const u = units[idx];
    if (u.owner === S.mpCivSlot && u.movesLeft > 0 && u.gx >= 0 && !BUSY_ORDERS.has(u.orders)) return idx;
  }
  return null;
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
// ═══════════════════════════════════════════════════════════════════

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
  }, 130);
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
// ═══════════════════════════════════════════════════════════════════

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

// ── Combat animation ──
// Round-by-round animation with HP bars and explosion on death.
export function animateCombat(cr, onComplete) {
  const TW = 64, TH = 32;
  const gx = cr.gx, gy = cr.gy;

  // Map-space position of the combat tile
  const tileX = gx * TW + ((gy % 2) ? (TW >> 1) : 0);
  const tileY = gy * (TH >> 1) - 16;

  // Get both unit sprites
  const atkSprite = S.mapSprites?.unitColored?.[cr.attacker + '-' + cr.atkOwner];
  const defSprite = S.mapSprites?.unitColored?.[cr.defender + '-' + cr.defOwner];
  if (!atkSprite || !defSprite) {
    if (onComplete) onComplete();
    return;
  }

  stopBlink();

  // Snapshot viewport for restoration between frames
  const bgSnapshot = S.vCtx.getImageData(0, 0, S.viewportCanvas.width, S.viewportCanvas.height);

  const dpr = window.devicePixelRatio || 1;
  const pxPerMap = S.vp.scale * dpr;

  // Map-space to screen-space helper
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

  // HP bar rendering (same 3-color logic as renderUnitThumbnail)
  function drawHpBar(sx, sy, curHp, maxHp) {
    const barW = 14 * pxPerMap;
    const barH = 3 * pxPerMap;
    const greenW = Math.max(0, Math.floor((curHp / maxHp) * barW));
    // Background (black)
    S.vCtx.fillStyle = '#000';
    S.vCtx.fillRect(sx, sy, barW, barH);
    // HP fill
    if (greenW > 0) {
      const pxThresh = barW;
      if (greenW > pxThresh * 0.67) S.vCtx.fillStyle = 'rgb(87,171,39)';
      else if (greenW > pxThresh * 0.25) S.vCtx.fillStyle = 'rgb(255,223,79)';
      else S.vCtx.fillStyle = 'rgb(243,0,0)';
      S.vCtx.fillRect(sx, sy, greenW, barH);
    }
  }

  // Round data (fall back to old flash if no rounds)
  const rounds = cr.rounds;
  if (!rounds || rounds.length === 0) {
    // Legacy flash fallback
    let flashCount = 0;
    const totalFlashes = 8;
    function flashFrame() {
      if (flashCount >= totalFlashes) { if (onComplete) onComplete(); return; }
      S.vCtx.putImageData(bgSnapshot, 0, 0);
      drawSpriteAt(flashCount % 2 === 0 ? atkSprite : defSprite, tileX, tileY);
      flashCount++;
      setTimeout(flashFrame, 80);
    }
    flashFrame();
    return;
  }

  // ── Civ2-faithful animation: batch rounds into groups of 5 ──
  // Real Civ2 shows one 8-frame explosion per 5 combat rounds.
  // HP bars update per group (accumulated damage), not per individual round.
  const ROUNDS_PER_EXPLOSION = 5;
  const FRAME_MS = 70; // Real Civ2 uses 70ms per explosion frame

  // HP tracking in internal units (×10)
  let atkHp = cr.atkStartHp;
  let defHp = cr.defStartHp;
  const atkMaxHp = cr.atkMaxHp;
  const defMaxHp = cr.defMaxHp;
  const atkFp = cr.atkFp;
  const defFp = cr.defFp;

  // Pre-group rounds into batches of 5 (last group may be smaller)
  const groups = [];
  for (let i = 0; i < rounds.length; i += ROUNDS_PER_EXPLOSION) {
    groups.push(rounds.slice(i, i + ROUNDS_PER_EXPLOSION));
  }
  // Ensure at least 1 group (the final death explosion)
  if (groups.length === 0) groups.push([]);

  // Bar positions: attacker bar on left of tile, defender on right
  const barY = screenY(tileY) - 6 * pxPerMap;
  const atkBarX = screenX(tileX) - 2 * pxPerMap;
  const defBarX = screenX(tileX) + 52 * pxPerMap;

  // Center explosion on tile (32×32 sprite centered on 64×32 tile)
  const expX = tileX + 16;
  const expY = tileY + 8;

  // Play attack sound on first frame
  const atkSfx = UNIT_ATK_SFX[cr.attacker];
  if (atkSfx) sfx(atkSfx);

  // Pre-load explosion frames
  _ensureExplosionFrames().then(expFrames => {
    let groupIdx = 0;

    function playNextGroup() {
      if (groupIdx >= groups.length) {
        // All groups done — play final death explosion
        playDeathExplosion(expFrames);
        return;
      }

      const group = groups[groupIdx];

      // Apply all damage in this group at once
      for (const atkWon of group) {
        if (atkWon) {
          defHp -= atkFp * 10;
        } else {
          atkHp -= defFp * 10;
        }
      }
      if (atkHp < 0) atkHp = 0;
      if (defHp < 0) defHp = 0;

      // Play 8-frame explosion for this group
      let fi = 0;
      function explosionFrame() {
        if (fi >= 8) {
          // Group done, move to next
          groupIdx++;
          playNextGroup();
          return;
        }

        S.vCtx.putImageData(bgSnapshot, 0, 0);

        // Draw both units during combat
        drawSpriteAt(atkSprite, tileX, tileY);
        drawSpriteAt(defSprite, tileX, tileY);

        // Draw HP bars (updated for this group's accumulated damage)
        drawHpBar(atkBarX, barY, atkHp, atkMaxHp);
        drawHpBar(defBarX, barY, defHp, defMaxHp);

        // Draw explosion frame on the tile
        if (expFrames && expFrames[fi]) {
          drawSpriteAt(expFrames[fi], expX, expY);
        }

        fi++;
        setTimeout(explosionFrame, FRAME_MS);
      }
      explosionFrame();
    }

    playNextGroup();
  });

  // Final death explosion on loser
  function playDeathExplosion(expFrames) {
    const loser = cr.type === 'atkWin' ? cr.defender : cr.attacker;
    sfx(getDeathSfx(loser));

    if (!expFrames || expFrames.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    let fi = 0;
    function deathFrame() {
      if (fi >= 8) {
        if (onComplete) onComplete();
        return;
      }

      S.vCtx.putImageData(bgSnapshot, 0, 0);

      // Draw surviving unit only
      const survivor = cr.type === 'atkWin' ? atkSprite : defSprite;
      drawSpriteAt(survivor, tileX, tileY);

      // Draw HP bars (final state)
      drawHpBar(atkBarX, barY, atkHp, atkMaxHp);
      drawHpBar(defBarX, barY, defHp, defMaxHp);

      // Draw explosion frame over loser position
      if (expFrames[fi]) {
        drawSpriteAt(expFrames[fi], expX, expY);
      }

      fi++;
      setTimeout(deathFrame, FRAME_MS);
    }
    deathFrame();
  }
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
