/**
 * dialogs.js — Civ2-styled dialog functions extracted from app.js.
 *
 * Late-bound deps (registered via registerDialogDeps):
 *   renderUnitThumbnail, openCityDialog, closeCityDialog, centerOnTile,
 *   selectUnit, showProductionPicker
 */

import { S } from './state.js';
import { sfx, getDeathSfx, playSoundForEvent, getProductionSound, playCityStatusSound, playTurnEventSound, playRandomCheers, SOUND_ID_MAP } from './sound.js';
import {
  UNIT_NAMES, IMPROVE_NAMES, WONDER_NAMES, ADVANCE_NAMES,
  ORDER_NAMES, UNIT_CARRY_CAP, UNIT_DOMAIN, CIV_CITY_NAMES,
  GOVERNMENT_NAMES, GOVT_MAX_RATE, GOVT_MAX_SCIENCE, CIV_COLORS,
  DIFFICULTY_KEYS, COMMODITY_NAMES,
} from '../engine/defs.js';
import { getGameYear } from '../engine/year.js';
import {
  UNIT_ORDER, BUILD_CITY, CHANGE_RATES, LAUNCH_SPACESHIP,
} from '../engine/actions.js';
import { calcCivScore, calcRetirementScore, calcFinalScore } from '../engine/spaceship.js';

// ── Preloaded images ──
const _cityFoundedImg = new Image();
_cityFoundedImg.src = 'assets/menu/city-founded.gif';

// ── Late-bound dependencies ──
const _deps = {};

export function registerDialogDeps(deps) {
  Object.assign(_deps, deps);
}

// ── Overlay / confirm ──

export function showOverlayMessage(msg) {
  const existing = document.getElementById('overlay-msg');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'overlay-msg';
  el.style.cssText = 'position:fixed;top:20%;left:50%;transform:translateX(-50%);z-index:9999;background:#d4b896;border:3px outset #a08060;padding:12px 24px;font:14px monospace;color:#333;text-align:left;white-space:pre-line;line-height:1.4';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

export function showConfirmDialog(msg, onConfirm, title = 'Confirm') {
  createCiv2Dialog('confirm-dialog', title, panel => {
    panel.style.cssText += ';text-align:center;padding:12px 16px;font:16px "Times New Roman",serif;color:#333';
    const text = document.createElement('div');
    text.textContent = msg;
    text.style.cssText = 'text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
    panel.appendChild(text);
  }, [
    { label: 'No' },
    { label: 'Yes', action: onConfirm },
  ]);
}

// ── Unit dialogs ──

export function showUnitPresentDialog(unitIndex) {
  const unit = S.mpGameState?.units[unitIndex];
  if (!unit || unit.gx < 0) return;
  const isOwner = unit.owner === S.mpCivSlot;
  const unitName = UNIT_NAMES[unit.type] || `Unit ${unit.type}`;

  let selected = 'nochange';

  const options = [
    { id: 'nochange', label: 'No Changes', enabled: true },
    { id: 'wake', label: 'Clear Orders', enabled: isOwner && unit.orders && unit.orders !== 'none' },
    { id: 'fortify', label: 'Fortify', enabled: isOwner && unit.orders !== 'fortified' && unit.orders !== 'fortifying' },
    { id: 'sentry', label: 'Sleep', enabled: isOwner },
    { id: 'disband', label: 'Disband', enabled: isOwner },
    { id: 'activate', label: 'Activate Unit', enabled: isOwner },
  ];

  createCiv2Dialog('unit-present-dialog', 'Unit Information', panel => {
    // Unit header: sprite on left, name on right
    const header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;gap:10px;padding:6px 4px;margin-bottom:4px;border-bottom:1px solid rgba(0,0,0,0.15)';

    const thumb = _deps.renderUnitThumbnail(unit);
    if (thumb) {
      thumb.style.cssText = 'width:64px;height:48px;image-rendering:pixelated';
      header.appendChild(thumb);
    }

    const civName = S.mpGameState.civNames?.[unit.owner] || `Civ ${unit.owner}`;
    const homeCity = (unit.homeCityId != null && unit.homeCityId !== 0xFFFF && unit.homeCityId !== 0x00FF)
      ? S.mpGameState.cities?.[unit.homeCityId] : null;
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
  }, [
    { label: 'Cancel' },
    { label: 'OK', action: () => {
      if (selected === 'nochange') return;
      if (selected === 'wake') {
        S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'wake' } });
      } else if (selected === 'fortify') {
        S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'fortify' } });
      } else if (selected === 'sentry') {
        S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'sentry' } });
      } else if (selected === 'disband') {
        showConfirmDialog(`Disband ${unitName}?`, () => {
          S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'disband' } });
        }, 'Disband Unit?');
      } else if (selected === 'activate') {
        _deps.closeCityDialog();
        _deps.selectUnit(unitIndex);
        if (unit.orders && unit.orders !== 'none') {
          S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'wake' } });
        }
      }
    }},
  ]);
}

export function showUnitSupportedDialog(unitIndex) {
  const unit = S.mpGameState?.units[unitIndex];
  if (!unit || unit.gx < 0) return;
  const isOwner = unit.owner === S.mpCivSlot;
  const unitName = UNIT_NAMES[unit.type] || `Unit ${unit.type}`;
  const civName = S.mpGameState.civNames?.[unit.owner] || `Civ ${unit.owner}`;
  const displayX = unit.gx * 2 + (unit.gy % 2);
  const displayY = unit.gy;

  // Find city at unit location, or nearest city
  // Skip destroyed cities (size=0/owner=0xFF after razing).
  let locationStr;
  const cityAtUnit = S.mpGameState.cities?.find(c =>
    c.gx === unit.gx && c.gy === unit.gy && c.size > 0 && c.owner !== 0xFF);
  if (cityAtUnit) {
    locationStr = `Location: ${cityAtUnit.name} (${displayX}, ${displayY})`;
  } else {
    let nearestCity = null;
    let nearestDist = Infinity;
    const mw = S.currentMapData?.mw || 1;
    for (const c of (S.mpGameState.cities || [])) {
      if (c.gx < 0) continue;
      let dx = Math.abs(c.gx - unit.gx);
      if (S.vp.wraps) dx = Math.min(dx, mw - dx);
      const dy = Math.abs(c.gy - unit.gy);
      const dist = dx * dx + dy * dy;
      if (dist < nearestDist) { nearestDist = dist; nearestCity = c; }
    }
    locationStr = nearestCity
      ? `Location: (${displayX}, ${displayY}) (Near ${nearestCity.name})`
      : `Location: (${displayX}, ${displayY})`;
  }

  let selected = 'nochange';

  const options = [
    { id: 'nochange', label: 'No Changes', enabled: true },
    { id: 'center', label: 'Center map on unit', enabled: true },
    { id: 'disband', label: 'Disband Unit', enabled: isOwner },
  ];

  createCiv2Dialog('unit-supported-dialog', 'Unit Information', panel => {
    // Unit header: sprite on left, info on right
    const header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;gap:10px;padding:6px 4px;margin-bottom:4px;border-bottom:1px solid rgba(0,0,0,0.15)';

    const thumb = _deps.renderUnitThumbnail(unit);
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
  }, [
    { label: 'Cancel' },
    { label: 'OK', action: () => {
      if (selected === 'nochange') return;
      if (selected === 'center') {
        _deps.closeCityDialog();
        _deps.centerOnTile(unit.gx, unit.gy);
      } else if (selected === 'disband') {
        showConfirmDialog(`Disband ${unitName}?`, () => {
          S.transport.sendRaw({ type: 'ACTION', action: { type: UNIT_ORDER, unitIndex, order: 'disband' } });
        }, 'Disband Unit?');
      }
    }},
  ]);
}

// ── City naming ──

/**
 * Compute the next available city name for a civ (client-side mirror of getCityName in reducer).
 */
export function getNextCityName(owner) {
  if (!S.mpGameState) return 'City';
  const rulesNum = S.mpGameState.civs?.[owner]?.rulesCivNumber ?? 0;
  const nameList = CIV_CITY_NAMES[rulesNum] || CIV_CITY_NAMES[0];
  const ownedNames = new Set(S.mpGameState.cities.filter(c => c.owner === owner).map(c => c.name));
  for (const name of nameList) {
    if (!ownedNames.has(name)) return name;
  }
  return `City ${S.mpGameState.cities.filter(c => c.owner === owner).length + 1}`;
}

/**
 * Show "What Shall We Name This City?" dialog before building.
 * On OK: sends BUILD_CITY with chosen name, which triggers showCityFoundedDialog via STATE.
 * On Cancel: does nothing.
 */
export function showNameCityDialog(unitIndex) {
  const u = S.mpGameState.units[unitIndex];
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
      S.transport.sendRaw({
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
export function showCityFoundedDialog(cityName, year, onDismiss) {
  createCiv2Dialog('city-founded-dialog', 'Found New City', panel => {
    const content = document.createElement('div');
    content.style.cssText = 'display:flex;align-items:center;gap:16px;padding:12px 20px';

    // Artwork on the left (uses preloaded image)
    const img = document.createElement('img');
    img.src = _cityFoundedImg.src;
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

// ── Reusable Civ2-styled dialog ──

/**
 * Create a reusable Civ2-styled dialog.
 * @param {string} id - unique DOM id
 * @param {string} title - titlebar text
 * @param {function} buildContent - (panel) => void, populates the panel
 * @param {Array<{label:string, action:function}>} buttons - button definitions
 * @returns {{ overlay, dismiss }} - DOM element and dismiss function
 */
/**
 * Close every open Civ2 dialog (modal, turn-event queue, etc.).
 * Call when leaving a game to avoid leaking dialogs/sounds across sessions.
 */
export function closeAllCiv2Dialogs() {
  const overlays = document.querySelectorAll('.civ2-dialog-overlay');
  overlays.forEach(o => o.remove());
}

export function createCiv2Dialog(id, title, buildContent, buttons = [{ label: 'OK' }], opts = {}) {
  const { showClose = true, suppressKeyboard = false } = opts;
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = id;
  overlay.className = 'civ2-dialog-overlay';

  const frame = document.createElement('div');
  frame.className = 'civ2-dialog-frame';

  const titlebar = document.createElement('div');
  titlebar.className = 'civ2-dialog-titlebar';
  titlebar.style.position = 'relative';
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

  // Find the OK/accept button and cancel button by label
  const okBtn = buttons.find(b => /^(ok|close)$/i.test(b.label)) || buttons[buttons.length - 1];
  const cancelBtn = buttons.find(b => /^cancel$/i.test(b.label));

  // Close (X) button in title bar
  if (showClose) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'civ2-dialog-close';
    closeBtn.textContent = '\u2715';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', () => { dismiss(); });
    titlebar.appendChild(closeBtn);
  }

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
  overlay.addEventListener('click', e => { if (e.target === overlay) dismiss(); });

  const keyHandler = e => {
    if (suppressKeyboard && e.key !== 'Escape') return; // let custom handler deal with it
    if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); dismiss(); if (okBtn?.action) okBtn.action(); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); dismiss(); if (cancelBtn?.action) cancelBtn.action(); }
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

// ── Turn events ──

/**
 * Show turn events sequentially as Civ2-styled dialogs.
 * Events: cityGrowth, famine, needsAqueduct, needsSewer, productionComplete
 */
export function showTurnEvents(events) {
  // Suppress 'warDeclared' events when the target is being destroyed in the
  // same batch. Otherwise the user sees "X declared war" right before
  // "X civilization destroyed", which is confusing — the war was just a
  // brief technicality before the conquest. The destruction event is the
  // meaningful one to show.
  const destroyedCivs = new Set();
  for (const e of events) {
    if (e.type === 'civDestroyed' || e.type === 'civEliminated') {
      if (e.civSlot != null) destroyedCivs.add(e.civSlot);
    }
  }
  events = events.filter(e => {
    if (e.type !== 'warDeclared') return true;
    return !(destroyedCivs.has(e.target) || destroyedCivs.has(e.aggressor));
  });

  let i = 0;
  function showNext() {
    if (i >= events.length) return;
    const ev = events[i++];
    switch (ev.type) {
      case 'cityGrowth':
        // Skip population increase announcements — just play sound and continue
        playSoundForEvent('cityGrowth');
        showNext();
        break;

      case 'famine':
        playSoundForEvent('famine');
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
        if (item.type === 'unit') { itemName = UNIT_NAMES[item.id] || 'Unit'; }
        else if (item.type === 'building') { itemName = IMPROVE_NAMES[item.id] || 'Building'; }
        else if (item.type === 'wonder') { itemName = WONDER_NAMES[item.id - 39] || 'Wonder'; }
        else itemName = 'Item';
        const prodSnd = getProductionSound(item.type, item.type === 'wonder' ? item.id - 39 : item.id);
        if (prodSnd) sfx(prodSnd);

        createCiv2Dialog('turn-event-dialog', 'Production Complete', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `${ev.cityName} has finished ${itemName}.`;
          panel.appendChild(msg);
        }, [{ label: 'Change', action: () => {
          // Open production picker for this city
          const city = S.mpGameState?.cities?.[ev.cityIndex];
          if (city && city.owner === S.mpCivSlot) {
            _deps.showProductionPicker(city, ev.cityIndex, showNext);
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

      case 'unitCrashed':
      case 'unitLost': {
        if (ev.type === 'unitLost' && ev.reason !== 'fuel') {
          // Non-fuel unitLost events (e.g., triremeSinking) — skip silently for now
          showNext();
          break;
        }
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
        playSoundForEvent('techDiscovered');
        if (_deps.showTechDetail) {
          _deps.showTechDetail(ev.advanceId, showNext);
        } else {
          showNext();
        }
        break;
      }

      case 'warDeclared': {
        sfx('NEG1');
        const aggrName = S.mpGameState?.civNames?.[ev.aggressor] || `Civ ${ev.aggressor}`;
        const targName = S.mpGameState?.civNames?.[ev.target] || `Civ ${ev.target}`;
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
        const civAName = S.mpGameState?.civNames?.[ev.civA] || `Civ ${ev.civA}`;
        const civBName = S.mpGameState?.civNames?.[ev.civB] || `Civ ${ev.civB}`;
        // The previous code had `ev.treaty === 'peace' ? 'Peace Treaty' : 'Ceasefire'`
        // which mislabeled an alliance as a ceasefire because alliance fell
        // through the ternary's else branch.
        const treatyName = ev.treaty === 'alliance' ? 'Alliance' :
                           ev.treaty === 'peace'    ? 'Peace Treaty' :
                                                      'Ceasefire';
        createCiv2Dialog('turn-event-dialog', treatyName, panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `${civAName} and ${civBName} have signed an ${treatyName}.`
            .replace('signed an Peace', 'signed a Peace')
            .replace('signed an Ceasefire', 'signed a Ceasefire');
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'allianceBroken': {
        // Binary @CANCELALLIANCE0 (Game.txt:2113-2119) — fired by FUN_00467ef2
        // (block_00460000.c:1711). The binary uses a SINGLE dialog that
        // explains both the cancellation and the unit recall (FUN_00467baf
        // is called for both directions before the dialog at line 1718-1722).
        //
        //   Title: Defense Minister
        //   Body:  Our alliance with the %STRING1 has been cancelled.
        //          All of our units in %STRING2 territory have been
        //          relocated to our nearest cities; %STRING2 units in
        //          our territory have been similarly relocated.
        //
        // Only show this dialog to the player who is involved in the
        // alliance (one of civA / civB). Other observers see @CANCELALLIANCE1
        // ("The X and Y have cancelled their alliance.") which we skip
        // since it's a notification of unrelated civs' diplomacy.
        const me = S.mpCivSlot;
        const involved = ev.civA === me || ev.civB === me;
        if (!involved) {
          showNext();
          break;
        }
        sfx('NEG1');
        const otherCiv = ev.civA === me ? ev.civB : ev.civA;
        const otherName = S.mpGameState?.civNames?.[otherCiv] || `Civ ${otherCiv}`;
        const myRecalled = ev.civA === me ? ev.unitsRecalledA : ev.unitsRecalledB;
        const theirRecalled = ev.civA === me ? ev.unitsRecalledB : ev.unitsRecalledA;
        createCiv2Dialog('turn-event-dialog', 'Defense Minister', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);line-height:1.5';
          let text = `Our alliance with the ${otherName} has been cancelled.`;
          if (myRecalled > 0 || theirRecalled > 0) {
            text += `\n\nAll of our units in ${otherName} territory have been relocated to our nearest cities; ${otherName} units in our territory have been similarly relocated.`;
          }
          msg.textContent = text;
          msg.style.whiteSpace = 'pre-line';
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'wonderStarted': {
        sfx('NEWONDER');
        const wsName = ev.wonderName || WONDER_NAMES[ev.wonderId - 39] || 'A wonder';
        createCiv2Dialog('turn-event-dialog', 'Wonder Construction', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `Construction of ${wsName} has begun in ${ev.cityName}!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'wonderAbandoned': {
        sfx('NEG1');
        const waName = ev.wonderName || WONDER_NAMES[ev.wonderId - 39] || 'A wonder';
        createCiv2Dialog('turn-event-dialog', 'Wonder Abandoned', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `Construction of ${waName} has been abandoned.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'wonderSwitched': {
        sfx('NEWONDER');
        const oldWName = ev.oldWonderName || 'a wonder';
        const newWName = ev.newWonderName || 'a wonder';
        createCiv2Dialog('turn-event-dialog', 'Wonder Switch', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = `${ev.cityName} switches from ${oldWName} to ${newWName}.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'tradeEstablished': {
        sfx('MRKTPLCE');
        const commodityName = (ev.commodity != null && ev.commodity >= 0)
          ? (COMMODITY_NAMES[ev.commodity] || `Commodity ${ev.commodity}`)
          : 'goods';
        createCiv2Dialog('turn-event-dialog', 'Trade Route', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          if (ev.foodDelivered) {
            msg.innerHTML = `Trade route: ${ev.homeCityName} → ${ev.destCityName}<br>`
              + `Delivered: ${commodityName}<br>`
              + `Food delivered: ${ev.foodDelivered}`;
          } else {
            const goldAmt = ev.goldShare ?? ev.bonus ?? 0;
            const sciAmt = ev.sciShare ?? 0;
            msg.innerHTML = `Trade route: ${ev.homeCityName} → ${ev.destCityName}<br>`
              + `Delivered: ${commodityName}<br>`
              + `Revenue: ${goldAmt} gold + ${sciAmt} research`;
          }
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      // Both event types use the binary's @DESTROYED dialog from Game.txt:1233
      //   @DESTROYED
      //   @title=Defense Minister
      //   %STRING0 civilization destroyed by %STRING1.
      //
      // The binary fires this from kill_civ (FUN_004AA378) when the civ
      // loses its last city. JS emits 'civDestroyed' from killCiv (when a
      // civ is killed via city capture) and 'civEliminated' from
      // checkCivElimination (when the elimination is detected from another
      // path). Both should show the same dialog.
      case 'civEliminated':
      case 'civDestroyed': {
        sfx('GUILLOTN');
        const civName = S.mpGameState?.civNames?.[ev.civSlot] || `Civilization ${ev.civSlot}`;
        const killerName = ev.killerCiv != null
          ? (S.mpGameState?.civNames?.[ev.killerCiv] || `Civ ${ev.killerCiv}`)
          : null;
        const isMe = ev.civSlot === S.mpCivSlot;
        if (ev._debug) console.log(`[${ev.type}] civ=${ev.civSlot} ${ev._debug}`);

        if (isMe) {
          // Binary FUN_0048b165 case 4 → FUN_004702e0 (death sequence): when
          // the local player loses their last city, show a prominent DEFEAT
          // dialog. Real Civ2 plays a death cinematic; we show a final
          // "your civilization has been destroyed" screen.
          const flavor = killerName
            ? `Conquered by the ${killerName}, the ${civName} civilization is no more.`
            : `The ${civName} civilization is no more.`;
          createCiv2Dialog('defeat-dialog', 'DEFEAT', panel => {
            const msg = document.createElement('div');
            msg.style.cssText = 'text-align:center;padding:24px 28px;font:bold 20px "Times New Roman",Georgia,serif;color:#660000;text-shadow:1px 1px 0 rgba(191,191,191,0.5);max-width:380px';
            msg.innerHTML =
              `Your civilization has fallen.<br><br>` +
              `<span style="font:16px \\'Times New Roman\\',Georgia,serif;color:#333">${flavor}</span>`;
            panel.appendChild(msg);
          }, [{ label: 'OK', action: showNext }], { showClose: false });
        } else {
          const title = 'Defense Minister';
          const text = killerName
            ? `${civName} civilization destroyed by ${killerName}.`
            : `The ${civName} civilization has been destroyed.`;
          createCiv2Dialog('turn-event-dialog', title, panel => {
            const msg = document.createElement('div');
            msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
            msg.textContent = text;
            panel.appendChild(msg);
          }, [{ label: 'OK', action: showNext }]);
        }
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
        const fromName = S.mpGameState?.civNames?.[ev.from] || `Civ ${ev.from}`;
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
        const fromName = S.mpGameState?.civNames?.[ev.from] || `Civ ${ev.from}`;
        createCiv2Dialog('turn-event-dialog', 'Revolt!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `${ev.cityName} revolts against the ${fromName}!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'tributeDebug': {
        console.warn(`[tributeDebug] ${ev._debug}`);
        showNext();
        break;
      }

      case 'tributePaid': {
        sfx('SELL');
        const payerName = S.mpGameState?.civNames?.[ev.from] || `Civ ${ev.from}`;
        const receiverName = S.mpGameState?.civNames?.[ev.to] || `Civ ${ev.to}`;
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
        const shareName = S.mpGameState?.civNames?.[ev.targetCiv] || `Civ ${ev.targetCiv}`;
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

      case 'civilDisorder': {
        playCityStatusSound('civilDisorder');
        createCiv2Dialog('turn-event-dialog', 'Civil Disorder!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
          msg.textContent = ev.ongoing
            ? `Civil disorder continues in ${ev.cityName}! Production has ceased.`
            : `Civil disorder in ${ev.cityName}! Citizens are rioting in the streets.`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'weLoveKingDay': {
        playCityStatusSound('weLoveKingDay');
        createCiv2Dialog('turn-event-dialog', 'Celebration!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `${ev.cityName} celebrates We Love the King Day!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'revolution': {
        playCityStatusSound('revolution');
        createCiv2Dialog('turn-event-dialog', 'Revolution!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = ev.message || 'Revolution! Government overthrown!';
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'nuclearMeltdown': {
        playSoundForEvent('nukeExplosion');
        createCiv2Dialog('turn-event-dialog', 'Nuclear Meltdown!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `Nuclear meltdown in ${ev.cityName}!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'pollutionWarning': {
        playTurnEventSound(4);
        createCiv2Dialog('turn-event-dialog', 'Pollution!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = ev.message || 'Pollution detected near your cities!';
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'casualtyReport': {
        // Binary FUN_0048b340 lines 3438-3454 (game loop): casualty dialog
        // shows units lost since last turn. Sound effect 0x30 from
        // FUN_0046e020 (table at 0x0062AF70). Strings: CASUALTY (singular) /
        // CASUALTIES (plural). Only show for the local player.
        if (ev.civSlot !== S.mpCivSlot) { showNext(); break; }
        const sndName = SOUND_ID_MAP?.[0x30];
        if (sndName) sfx(sndName);
        const civName = S.mpGameState?.civNames?.[ev.civSlot] || 'your';
        const title = 'Defense Minister';
        const msgText = ev.count === 1
          ? `My ${civName} leader, we have lost a unit since last turn.`
          : `My ${civName} leader, we have lost ${ev.count} units since last turn.`;
        createCiv2Dialog('turn-event-dialog', title, panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = msgText;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'globalWarming': {
        playTurnEventSound(3);
        createCiv2Dialog('turn-event-dialog', 'Global Warming!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = ev.message || 'Global warming is altering the terrain!';
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'firstContact': {
        const otherCiv = ev.civA === S.mpCivSlot ? ev.civB : ev.civA;
        const isAI = !(S.mpGameState.humanPlayers & (1 << otherCiv));
        const otherName = S.mpGameState?.civNames?.[otherCiv] || `Civ ${otherCiv}`;
        const leaderName = S.mpGameState?.civs?.[otherCiv]?.leaderName || 'their leader';

        if (isAI && _deps.openDiplomacyDialog) {
          // AI — open full throne room dialog
          _deps.openDiplomacyDialog(
            S.mpGameState, S.mpMapBase, S.mpCivSlot, otherCiv,
            (msg) => S.transport?.sendRaw(msg),
          );
          showNext();
        } else {
          // Human — show announcement, then open human diplomacy menu
          sfx('FANFARE1');
          createCiv2Dialog('turn-event-dialog', 'First Contact!', panel => {
            const msg = document.createElement('div');
            msg.style.cssText = 'text-align:center;padding:16px 24px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);line-height:1.6';
            msg.textContent = `Our scouts have encountered the ${otherName}, led by ${leaderName}! A ceasefire has been established. Would you like to open diplomatic communications?`;
            panel.appendChild(msg);
          }, [
            { label: 'Not now', action: showNext },
            { label: 'Open Diplomacy', action: () => {
              if (_deps.openHumanDiplomacyMenu) {
                _deps.openHumanDiplomacyMenu(
                  S.mpGameState, S.mpCivSlot, otherCiv,
                  (msg) => S.transport?.sendRaw(msg),
                );
              }
              showNext();
            }},
          ]);
        }
        break;
      }

      case 'cityCapture': {
        // Binary @CITYCAPTURE (Game.txt:1801): "%STRING1 %STRING3 %STRING0.
        // %NUMBER0 gold pieces plundered." — title "Defense Minister".
        // %STRING1 = capturer civ, %STRING3 = verb, %STRING0 = city name.
        // Verb is "captured" / "recaptured" depending on wasOurs flag.
        // For destroyed cities the binary uses the same dialog but the
        // city visually disappears; we append a razing notice for clarity.
        if (ev.destroyed) {
          sfx('LARGEXPL');
        } else {
          playSoundForEvent('combatVictoryFanfare');
        }
        const capName = ev.cityName || 'City';
        const capturerName = S.mpGameState?.civNames?.[ev.to] || `Civ ${ev.to}`;
        const verb = ev.wasOurs ? 'recaptured' : 'captured';
        const title = ev.destroyed ? 'City Razed!' : 'Defense Minister';
        createCiv2Dialog('turn-event-dialog', title, panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          let text = `${capturerName} ${verb} ${capName}.`;
          if (ev.plunder > 0) {
            text += `  ${ev.plunder} gold pieces plundered.`;
          }
          if (ev.destroyed) {
            text += `\n\nThe city has been razed to the ground.`;
          }
          msg.textContent = text;
          msg.style.whiteSpace = 'pre-line';
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'wonderBuilt': {
        sfx('NEWONDER');
        const wName = ev.wonderName || WONDER_NAMES[ev.wonderId] || 'A wonder';
        const builderName = S.mpGameState?.civNames?.[ev.civSlot] || `Civ ${ev.civSlot}`;
        createCiv2Dialog('turn-event-dialog', 'Wonder Built!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `${builderName} has completed ${wName}!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'councilMeeting': {
        playSoundForEvent('cheers');
        createCiv2Dialog('turn-event-dialog', 'Council Meeting', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = ev.message || 'Your advisors request a meeting.';
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'techDiscovered': {
        playSoundForEvent('techDiscovered');
        const advName = ADVANCE_NAMES[ev.advanceId] || `Advance ${ev.advanceId}`;
        createCiv2Dialog('turn-event-dialog', 'Discovery!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = `You have discovered the secret of ${advName}!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'spaceshipLaunched': {
        playTurnEventSound(6);
        const launchCivName = S.mpGameState?.civNames?.[ev.civSlot] || `Civ ${ev.civSlot}`;
        createCiv2Dialog('turn-event-dialog', 'Spaceship Launched!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.innerHTML = `The ${launchCivName} have launched their spaceship!<br>`
            + `<span style="font-size:14px;color:#666">Success probability: ${ev.successProb}% &mdash; ETA: ${ev.flightTurns} turns</span>`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'spaceshipLost': {
        sfx('BIGEXP');
        const lostCivName = S.mpGameState?.civNames?.[ev.civSlot] || `Civ ${ev.civSlot}`;
        createCiv2Dialog('turn-event-dialog', 'Spaceship Lost!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#990000';
          msg.textContent = `The ${lostCivName}'s spaceship has been lost in space!`;
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'year2000Warning': {
        playTurnEventSound(9);
        createCiv2Dialog('turn-event-dialog', 'Plan Your Retirement!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = ev.message || 'The year 2000 approaches! You may retire now or continue until 2020 AD.';
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'scenarioEndWarning': {
        playTurnEventSound(9);
        createCiv2Dialog('turn-event-dialog', 'Scenario Ending!', panel => {
          const msg = document.createElement('div');
          msg.style.cssText = 'text-align:center;padding:12px 20px;font:18px "Times New Roman",Georgia,serif;color:#333';
          msg.textContent = ev.message || 'The scenario is about to end!';
          panel.appendChild(msg);
        }, [{ label: 'OK', action: showNext }]);
        break;
      }

      case 'treasuryWarning': {
        sfx('NEG1');
        showTaxAdvisoryDialog(ev.treasury ?? 0, ev.netIncome ?? 0, showNext);
        break;
      }

      default:
        showNext();
    }
  }
  // Delay slightly so the re-render finishes first
  setTimeout(showNext, 200);
}

// ── Rate sliders ──

export function showRateSliders() {
  if (!S.mpGameState || !S.mpCivSlot) return;
  const civ = S.mpGameState.civs?.[S.mpCivSlot];
  if (!civ) return;

  const govt = civ.government || 'despotism';
  const maxRate = GOVT_MAX_RATE[govt] ?? 10;
  const maxSci = GOVT_MAX_SCIENCE[govt] ?? 10;

  let sciRate = Math.min(civ.scienceRate ?? 5, maxSci);
  let taxRate = Math.min(civ.taxRate ?? 5, maxRate);
  if (sciRate + taxRate > 10) taxRate = 10 - sciRate;
  let luxRate = 10 - sciRate - taxRate;

  let sciSlider, taxSlider, luxSlider, sciLabel, taxLabel, luxLabel;

  const updateLabels = () => {
    sciSlider.value = sciRate;
    taxSlider.value = taxRate;
    luxSlider.value = luxRate;
    sciLabel.textContent = `Science: ${sciRate * 10}%`;
    taxLabel.textContent = `Tax: ${taxRate * 10}%`;
    luxLabel.textContent = `Luxury: ${luxRate * 10}%`;
  };

  // When one slider moves, adjust the other two so total = 10.
  const reconcile = (moved) => {
    const total = sciRate + taxRate + luxRate;
    if (total === 10) return;
    const diff = total - 10;
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
        const shrink = Math.min(rem, cur);
        set(k, cur - shrink);
        rem -= shrink;
      } else {
        const grow = Math.min(-rem, caps[k] - cur);
        set(k, cur + grow);
        rem += grow;
      }
    }
  };

  const makeRow = (parentPanel, label, value, cap, onChange) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:8px;margin:6px 0';
    const lbl = document.createElement('span');
    lbl.style.cssText = 'width:100px;font:14px "Times New Roman",serif;color:#333';
    const sliderWrap = document.createElement('div');
    sliderWrap.style.cssText = 'flex:1;position:relative';
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0; slider.max = 10; slider.step = 1;
    slider.value = value;
    slider.className = 'civ2-slider';
    slider.addEventListener('input', () => {
      let v = parseInt(slider.value);
      if (v > cap) { v = cap; slider.value = v; }
      onChange(v);
    });
    sliderWrap.appendChild(slider);
    row.appendChild(lbl);
    row.appendChild(sliderWrap);
    parentPanel.appendChild(row);
    return { label: lbl, slider };
  };

  createCiv2Dialog('rate-sliders', 'Tax Rate', panel => {
    panel.style.cssText += ';min-width:320px;padding:12px 16px';

    const sci = makeRow(panel, 'Science', sciRate, maxSci, v => {
      sciRate = v;
      reconcile('sci');
      updateLabels();
    });
    sciLabel = sci.label;
    sciSlider = sci.slider;

    const tax = makeRow(panel, 'Tax', taxRate, maxRate, v => {
      taxRate = v;
      reconcile('tax');
      updateLabels();
    });
    taxLabel = tax.label;
    taxSlider = tax.slider;

    const lux = makeRow(panel, 'Luxury', luxRate, maxRate, v => {
      luxRate = v;
      reconcile('lux');
      updateLabels();
    });
    luxLabel = lux.label;
    luxSlider = lux.slider;

    updateLabels();
  }, [
    { label: 'Cancel' },
    { label: 'OK', action: () => {
      S.transport.sendRaw({
        type: 'ACTION',
        action: { type: CHANGE_RATES, scienceRate: sciRate, taxRate: taxRate },
      });
    }},
  ]);
}

// ── Tax Advisory dialog ──

/**
 * Show a warning dialog when the player's treasury is declining.
 * Offers a direct shortcut to the tax rate sliders.
 *
 * @param {number} treasury - current treasury
 * @param {number} netIncome - net gold per turn (negative = declining)
 * @param {function} [onDismiss] - optional callback when dialog closes
 */
export function showTaxAdvisoryDialog(treasury, netIncome, onDismiss) {
  if (document.getElementById('tax-advisory-dialog')) return;

  createCiv2Dialog('tax-advisory-dialog', 'Treasury Warning', panel => {
    panel.style.cssText += ';min-width:300px;max-width:400px;text-align:center';

    const icon = document.createElement('div');
    icon.style.cssText = 'font-size:36px;margin-bottom:8px';
    icon.textContent = '\u26A0'; // warning triangle
    panel.appendChild(icon);

    const msg = document.createElement('div');
    msg.style.cssText = 'font:16px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);margin-bottom:12px';
    msg.textContent = 'Your treasury is declining!';
    panel.appendChild(msg);

    const details = document.createElement('div');
    details.style.cssText = 'font:14px "Times New Roman",Georgia,serif;color:#555;margin-bottom:12px';
    details.innerHTML = `Current treasury: <strong>${treasury.toLocaleString()}</strong> gold<br>`
      + `Net income: <strong style="color:#a00">${netIncome >= 0 ? '+' : ''}${netIncome}</strong> gold/turn`;
    panel.appendChild(details);

    if (treasury + netIncome <= 0) {
      const urgentMsg = document.createElement('div');
      urgentMsg.style.cssText = 'font:bold 13px "Times New Roman",Georgia,serif;color:#900;margin-bottom:8px';
      urgentMsg.textContent = 'Warning: Treasury will be empty next turn! Units may be disbanded.';
      panel.appendChild(urgentMsg);
    }
  }, [
    { label: 'Adjust Tax Rates', action: () => {
      if (onDismiss) onDismiss();
      showRateSliders();
    }},
    { label: 'OK', action: onDismiss },
  ]);
}

// ── Game Over dialog ──

/**
 * Show a victory/defeat dialog when the game ends.
 * @param {number} winnerCivSlot - civ slot (1-7) of the winner
 * @param {object} gameState - current game state (for civ names)
 */
export function showGameOverDialog(winnerCivSlot, gameState) {
  const winnerName = gameState.civNames?.[winnerCivSlot] || `Civ ${winnerCivSlot}`;
  const isWinner = winnerCivSlot === S.mpCivSlot;
  const title = isWinner ? 'Victory!' : 'Defeat';
  const color = CIV_COLORS[winnerCivSlot] || '#fff';

  sfx(isWinner ? 'FANFARE1' : 'FUNERAL');

  createCiv2Dialog('game-over-dialog', title, panel => {
    const content = document.createElement('div');
    content.style.cssText = 'text-align:center;padding:16px 24px';

    const headline = document.createElement('div');
    headline.style.cssText = `font:bold 22px "Times New Roman",Georgia,serif;color:${color};text-shadow:1px 1px 2px rgba(0,0,0,0.5);margin-bottom:10px`;
    headline.textContent = isWinner
      ? 'Your civilization stands triumphant!'
      : `The ${winnerName} have conquered the world!`;
    content.appendChild(headline);

    const detail = document.createElement('div');
    detail.style.cssText = 'font:16px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
    detail.textContent = isWinner
      ? 'All rival civilizations have been vanquished. You are the supreme ruler!'
      : 'Your civilization has fallen. The world belongs to another.';
    content.appendChild(detail);

    panel.appendChild(content);
  }, [{ label: 'OK' }]);
}

// ── Retirement rank names (from binary, 0-23) ──
const RETIREMENT_RANKS = [
  'Chieftain',       // 0: Dan Quayle
  'Warlord',         // 1
  'Prince',          // 2
  'King',            // 3
  'Emperor',         // 4
  'Deity',           // 5
  'Settler',         // 6
  'Minister',        // 7
  'Consul',          // 8
  'Magistrate',      // 9
  'Ruler',           // 10
  'Caesar',          // 11
  'Augustus Caesar', // 12
  'Hammurabi',       // 13
  'Frederick the Great', // 14
  'Alexander the Great', // 15
  'Napoleon',        // 16
  'Bismarck',        // 17
  'Lincoln',         // 18
  'Gandhi',          // 19
  'Genghis Khan',    // 20
  'Solomon',         // 21
  'Charlemagne',     // 22
  'Gilgamesh',       // 23
];

// ── Score / Endgame dialogs ──

/**
 * Show the score breakdown screen for a civilization.
 * @param {object} state - game state
 * @param {number} civSlot - civ slot (1-7)
 */
export function showScoreScreen(state, civSlot) {
  const finalResult = calcFinalScore(state, civSlot);
  const retResult = calcRetirementScore(state, civSlot);
  const b = finalResult.breakdown;
  const civName = state.civNames?.[civSlot] || `Civ ${civSlot}`;
  const diffName = (state.difficulty || 'chieftain').charAt(0).toUpperCase()
    + (state.difficulty || 'chieftain').slice(1);
  const turnNum = state.turn?.number || 0;
  const yearStr = getGameYear(turnNum);
  const rankName = RETIREMENT_RANKS[retResult.rank] || `Rank ${retResult.rank}`;

  // Check spaceship arrival
  const ss = state.spaceships?.[civSlot];
  const ssArrived = ss && ss.launched && ss.arrivalTurn <= turnNum && !ss.destroyed;

  const textStyle = 'font:15px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
  const headStyle = 'font:bold 16px "Times New Roman",Georgia,serif;color:#1a1a6b;margin-top:8px;margin-bottom:4px';
  const rowStyle = 'display:flex;justify-content:space-between;padding:1px 0';

  createCiv2Dialog('score-screen', `${civName} — Score`, panel => {
    panel.style.cssText += ';min-width:360px;max-width:440px;padding:12px 20px';

    // Header: year and difficulty
    const header = document.createElement('div');
    header.style.cssText = 'text-align:center;margin-bottom:8px;border-bottom:1px solid rgba(0,0,0,0.15);padding-bottom:6px';
    header.innerHTML = `<div style="${textStyle};font-size:16px"><b>${yearStr}</b> &mdash; ${diffName} Level</div>`;
    panel.appendChild(header);

    // Score breakdown section
    const secTitle = document.createElement('div');
    secTitle.style.cssText = headStyle;
    secTitle.textContent = 'Score Breakdown';
    panel.appendChild(secTitle);

    const rows = [
      ['Population', b.population],
      ['Territory (Map)', b.mapBonus],
      ['Wonders', b.wonders],
      ['Future Techs', b.futureTech],
      ['Technology', b.technology],
      ['Peace Bonus', b.peace],
    ];
    if (b.spaceship > 0) rows.push(['Spaceship', b.spaceship]);

    for (const [label, val] of rows) {
      const row = document.createElement('div');
      row.style.cssText = rowStyle;
      row.innerHTML = `<span style="${textStyle}">${label}</span><span style="${textStyle}">${val}</span>`;
      panel.appendChild(row);
    }

    // Separator
    const sep = document.createElement('div');
    sep.style.cssText = 'border-top:1px solid rgba(0,0,0,0.2);margin:6px 0';
    panel.appendChild(sep);

    // Base score
    const baseRow = document.createElement('div');
    baseRow.style.cssText = rowStyle;
    baseRow.innerHTML = `<span style="${textStyle};font-weight:bold">Base Score</span><span style="${textStyle};font-weight:bold">${finalResult.baseScore}</span>`;
    panel.appendChild(baseRow);

    // Difficulty multiplier
    const diffRow = document.createElement('div');
    diffRow.style.cssText = rowStyle;
    diffRow.innerHTML = `<span style="${textStyle}">Difficulty Multiplier (${finalResult.difficultyPct}%)</span><span style="${textStyle}">&times;${(finalResult.difficultyPct / 100).toFixed(2)}</span>`;
    panel.appendChild(diffRow);

    // Alpha Centauri bonus
    if (finalResult.acBonus > 0) {
      const acRow = document.createElement('div');
      acRow.style.cssText = rowStyle;
      acRow.innerHTML = `<span style="${textStyle};color:#006600">Alpha Centauri Bonus</span><span style="${textStyle};color:#006600">+${finalResult.acBonus}</span>`;
      panel.appendChild(acRow);
    }

    // Final score separator
    const sep2 = document.createElement('div');
    sep2.style.cssText = 'border-top:2px solid rgba(0,0,0,0.3);margin:6px 0';
    panel.appendChild(sep2);

    // Final score
    const finalRow = document.createElement('div');
    finalRow.style.cssText = rowStyle;
    finalRow.innerHTML = `<span style="font:bold 18px 'Times New Roman',Georgia,serif;color:#1a1a6b">Final Score</span><span style="font:bold 18px 'Times New Roman',Georgia,serif;color:#1a1a6b">${finalResult.finalScore}</span>`;
    panel.appendChild(finalRow);

    // Retirement rank section
    const rankSec = document.createElement('div');
    rankSec.style.cssText = headStyle + ';margin-top:12px';
    rankSec.textContent = 'Retirement';
    panel.appendChild(rankSec);

    const rankRow = document.createElement('div');
    rankRow.style.cssText = 'text-align:center;padding:4px 0';
    rankRow.innerHTML = `<div style="${textStyle};font-size:17px">You will be remembered as <b>${rankName}</b></div>`
      + `<div style="${textStyle};font-size:13px;color:#666;margin-top:2px">Retirement Score: ${retResult.rawScore} (Rank ${retResult.rank}/23)</div>`;
    panel.appendChild(rankRow);

    // Alpha Centauri section
    if (ssArrived) {
      const acSec = document.createElement('div');
      acSec.style.cssText = 'text-align:center;padding:8px 0;margin-top:6px;border-top:1px solid rgba(0,0,0,0.15)';
      acSec.innerHTML = `<div style="font:bold 16px 'Times New Roman',Georgia,serif;color:#006600">Spaceship Arrived at Alpha Centauri!</div>`
        + `<div style="${textStyle};font-size:13px;color:#006600;margin-top:2px">+${finalResult.acBonus} bonus points from ${ss.structural || 0} structurals, ${(ss.fuel || 0) + (ss.propulsion || 0)} components, ${(ss.habitation || 0) + (ss.lifeSupport || 0) + (ss.solarPanel || 0)} modules</div>`;
      panel.appendChild(acSec);
    }

  }, [{ label: 'Close' }]);
}

/**
 * Show the retirement/game-end dialog.
 * @param {object} state - game state
 * @param {number} civSlot - the player's civ slot
 * @param {string} reason - 'conquest', 'spaceship', 'retirement', 'scenarioEnd', 'extinction'
 * @param {number} winnerCivSlot - the winning civ slot
 */
export function showRetirementDialog(state, civSlot, reason, winnerCivSlot) {
  const civName = state.civNames?.[civSlot] || `Civ ${civSlot}`;
  const winnerName = state.civNames?.[winnerCivSlot] || `Civ ${winnerCivSlot}`;
  const isWinner = winnerCivSlot === civSlot;
  const yearStr = getGameYear(state.turn?.number || 0);

  // Title and message depend on reason
  let title, headline, detail;
  switch (reason) {
    case 'conquest':
      if (isWinner) {
        title = 'Victory!';
        headline = 'Your civilization stands triumphant!';
        detail = `All rival civilizations have been vanquished by ${yearStr}.`;
      } else {
        title = 'Defeat';
        headline = `The ${winnerName} have conquered the world!`;
        detail = 'Your civilization has fallen.';
      }
      break;
    case 'spaceship':
      if (isWinner) {
        title = 'Alpha Centauri!';
        headline = 'Your spaceship has reached Alpha Centauri!';
        detail = `A new era of space colonization begins in ${yearStr}.`;
      } else {
        title = 'Space Race Lost';
        headline = `The ${winnerName} have reached Alpha Centauri!`;
        detail = 'Their spaceship has arrived safely.';
      }
      break;
    case 'retirement':
      title = 'Retirement';
      if (isWinner) {
        headline = `You retire as the world's greatest leader!`;
        detail = `In ${yearStr}, the time has come to step down.`;
      } else {
        headline = `The ${winnerName} have achieved the highest score.`;
        detail = `The year ${yearStr} marks the end of your reign.`;
      }
      break;
    case 'scenarioEnd':
      title = 'Scenario Complete';
      headline = isWinner ? 'You have won the scenario!' : `The ${winnerName} have won the scenario.`;
      detail = `The scenario has ended in ${yearStr}.`;
      break;
    case 'extinction':
      title = 'Extinction';
      headline = 'All civilizations have been destroyed!';
      detail = 'The world has returned to the barbarians.';
      break;
    default:
      title = 'Game Over';
      headline = 'The game has ended.';
      detail = '';
  }

  const color = CIV_COLORS[winnerCivSlot] || '#fff';

  sfx(isWinner ? 'FANFARE1' : 'FUNERAL');

  const retResult = calcRetirementScore(state, civSlot);
  const finalResult = calcFinalScore(state, civSlot);
  const rankName = RETIREMENT_RANKS[retResult.rank] || `Rank ${retResult.rank}`;

  // Can continue playing? Only if not forced retirement (year 2020) and not extinction
  const canContinue = reason !== 'retirement' && reason !== 'extinction' && reason !== 'scenarioEnd';

  const buttons = [];
  buttons.push({ label: 'View Score', action: () => showScoreScreen(state, civSlot) });
  if (canContinue) {
    buttons.push({ label: 'Continue Playing' });
  } else {
    buttons.push({ label: 'OK' });
  }

  createCiv2Dialog('retirement-dialog', title, panel => {
    panel.style.cssText += ';min-width:380px;max-width:460px;padding:16px 24px';

    const content = document.createElement('div');
    content.style.cssText = 'text-align:center';

    const headEl = document.createElement('div');
    headEl.style.cssText = `font:bold 20px "Times New Roman",Georgia,serif;color:${color};text-shadow:1px 1px 2px rgba(0,0,0,0.5);margin-bottom:8px`;
    headEl.textContent = headline;
    content.appendChild(headEl);

    if (detail) {
      const detailEl = document.createElement('div');
      detailEl.style.cssText = 'font:16px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);margin-bottom:12px';
      detailEl.textContent = detail;
      content.appendChild(detailEl);
    }

    // Score summary
    const scoreSec = document.createElement('div');
    scoreSec.style.cssText = 'border-top:1px solid rgba(0,0,0,0.15);padding-top:10px;margin-top:6px';

    const scoreRow = document.createElement('div');
    scoreRow.style.cssText = 'font:17px "Times New Roman",Georgia,serif;color:#1a1a6b;margin-bottom:4px';
    scoreRow.textContent = `Final Score: ${finalResult.finalScore}`;
    scoreSec.appendChild(scoreRow);

    const rankRow = document.createElement('div');
    rankRow.style.cssText = 'font:15px "Times New Roman",Georgia,serif;color:#333';
    rankRow.textContent = `Rank: ${rankName}`;
    scoreSec.appendChild(rankRow);

    if (finalResult.acBonus > 0) {
      const acRow = document.createElement('div');
      acRow.style.cssText = 'font:14px "Times New Roman",Georgia,serif;color:#006600;margin-top:4px';
      acRow.textContent = `Alpha Centauri Bonus: +${finalResult.acBonus}`;
      scoreSec.appendChild(acRow);
    }

    content.appendChild(scoreSec);
    panel.appendChild(content);
  }, buttons);
}

/**
 * Show the spaceship construction status dialog.
 * @param {object} state - game state
 * @param {number} civSlot - civ slot (1-7)
 */
export function showSpaceshipDialog(state, civSlot) {
  // Read existing spaceship stats (already computed by end-turn processing)
  const ss = state.spaceships?.[civSlot] || {
    structural: 0, fuel: 0, propulsion: 0, habitation: 0, lifeSupport: 0, solarPanel: 0,
    mass: 0, successProb: 0, flightTurns: 0, arrivalTurn: 0,
    launched: false, launchTurn: -1, canLaunch: false, hasNuclearPower: false,
  };
  const civName = state.civNames?.[civSlot] || `Civ ${civSlot}`;
  const yearStr = getGameYear(state.turn?.number || 0);

  const textStyle = 'font:15px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
  const rowStyle = 'display:flex;justify-content:space-between;padding:2px 0';
  const headStyle = 'font:bold 16px "Times New Roman",Georgia,serif;color:#1a1a6b;margin-top:8px;margin-bottom:4px';

  const canLaunch = ss.canLaunch;
  const buttons = [];
  if (canLaunch) {
    buttons.push({
      label: 'Launch!',
      action: () => {
        S.transport.sendRaw({ type: 'ACTION', action: { type: LAUNCH_SPACESHIP } });
      },
    });
  }
  buttons.push({ label: 'Close' });

  createCiv2Dialog('spaceship-dialog', `${civName} Spaceship`, panel => {
    panel.style.cssText += ';min-width:340px;max-width:420px;padding:12px 20px';

    // Status header
    const header = document.createElement('div');
    header.style.cssText = 'text-align:center;margin-bottom:8px;border-bottom:1px solid rgba(0,0,0,0.15);padding-bottom:6px';
    if (ss.launched) {
      header.innerHTML = `<div style="${textStyle};color:#006600;font-size:16px"><b>Launched!</b> In flight...</div>`;
    } else if (ss.destroyed) {
      header.innerHTML = `<div style="${textStyle};color:#990000;font-size:16px"><b>Ship Lost!</b> The spaceship was destroyed.</div>`;
    } else if ((ss.structural || 0) === 0 && (ss.fuel || 0) === 0 && (ss.propulsion || 0) === 0
               && (ss.habitation || 0) === 0 && (ss.lifeSupport || 0) === 0 && (ss.solarPanel || 0) === 0) {
      header.innerHTML = `<div style="${textStyle};font-size:16px">No spaceship parts built yet.</div>`;
    } else {
      header.innerHTML = `<div style="${textStyle};font-size:16px">Under construction &mdash; ${yearStr}</div>`;
    }
    panel.appendChild(header);

    // Parts section
    const partsSec = document.createElement('div');
    partsSec.style.cssText = headStyle;
    partsSec.textContent = 'Components';
    panel.appendChild(partsSec);

    const partRows = [
      ['Structural', ss.structural || 0, 'mass 1'],
      ['Fuel', ss.fuel || 0, 'mass 4'],
      ['Propulsion', ss.propulsion || 0, 'mass 4'],
      ['Habitation', ss.habitation || 0, 'mass 16'],
      ['Life Support', ss.lifeSupport || 0, 'mass 16'],
      ['Solar Panel', ss.solarPanel || 0, 'mass 16'],
    ];
    for (const [label, count, weight] of partRows) {
      const row = document.createElement('div');
      row.style.cssText = rowStyle;
      const countStyle = count > 0 ? 'color:#006600;font-weight:bold' : 'color:#666';
      row.innerHTML = `<span style="${textStyle}">${label}</span><span style="${textStyle};${countStyle}">${count} <span style="font-size:12px;color:#888">(${weight})</span></span>`;
      panel.appendChild(row);
    }

    // Stats section
    const statsSec = document.createElement('div');
    statsSec.style.cssText = headStyle;
    statsSec.textContent = 'Ship Statistics';
    panel.appendChild(statsSec);

    const statRows = [
      ['Total Mass', `${ss.mass.toLocaleString()} tons`],
      ['Success Rate', `${ss.successProb}%`],
      ['Flight Time', `${ss.flightTurns} turn${ss.flightTurns !== 1 ? 's' : ''}`],
    ];

    if (ss.launched) {
      const turnsLeft = Math.max(0, ss.arrivalTurn - (state.turn?.number || 0));
      statRows.push(['Arrival In', `${turnsLeft} turn${turnsLeft !== 1 ? 's' : ''}`]);
    }

    if (ss.hasNuclearPower) {
      statRows.push(['Fusion Power', 'Flight time reduced 25%']);
    }

    for (const [label, val] of statRows) {
      const row = document.createElement('div');
      row.style.cssText = rowStyle;
      row.innerHTML = `<span style="${textStyle}">${label}</span><span style="${textStyle}">${val}</span>`;
      panel.appendChild(row);
    }

    // Success rate bar
    const barWrap = document.createElement('div');
    barWrap.style.cssText = 'margin-top:8px;background:#ccc;border:1px inset #a08060;height:16px;position:relative;border-radius:2px;overflow:hidden';
    const barFill = document.createElement('div');
    const barColor = ss.successProb >= 80 ? '#006600' : ss.successProb >= 50 ? '#cc8800' : '#990000';
    barFill.style.cssText = `height:100%;width:${ss.successProb}%;background:${barColor};transition:width 0.3s`;
    barWrap.appendChild(barFill);
    const barLabel = document.createElement('div');
    barLabel.style.cssText = 'position:absolute;top:0;left:0;right:0;text-align:center;font:bold 12px "Times New Roman",serif;color:#fff;line-height:16px;text-shadow:0 0 2px rgba(0,0,0,0.7)';
    barLabel.textContent = `${ss.successProb}% Success`;
    barWrap.appendChild(barLabel);
    panel.appendChild(barWrap);

    // Launch requirements
    if (!ss.launched && !ss.destroyed) {
      const reqSec = document.createElement('div');
      reqSec.style.cssText = 'margin-top:10px;border-top:1px solid rgba(0,0,0,0.15);padding-top:6px';
      const reqTitle = document.createElement('div');
      reqTitle.style.cssText = headStyle + ';margin-top:4px';
      reqTitle.textContent = 'Launch Requirements';
      reqSec.appendChild(reqTitle);

      const reqs = [
        [(ss.structural || 0) >= 1, 'At least 1 Structural'],
        [(ss.fuel || 0) >= 1 || (ss.propulsion || 0) >= 1, 'At least 1 Component (Fuel or Propulsion)'],
        [(ss.habitation || 0) >= 1 || (ss.lifeSupport || 0) >= 1 || (ss.solarPanel || 0) >= 1, 'At least 1 Module (Hab/Life/Solar)'],
      ];
      for (const [met, desc] of reqs) {
        const reqRow = document.createElement('div');
        reqRow.style.cssText = `${textStyle};font-size:14px;padding:1px 0;color:${met ? '#006600' : '#990000'}`;
        reqRow.textContent = `${met ? '\u2713' : '\u2717'} ${desc}`;
        reqSec.appendChild(reqRow);
      }
      panel.appendChild(reqSec);
    }

  }, buttons);
}
