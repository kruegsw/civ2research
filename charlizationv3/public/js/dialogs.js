/**
 * dialogs.js — Civ2-styled dialog functions extracted from app.js.
 *
 * Late-bound deps (registered via registerDialogDeps):
 *   renderUnitThumbnail, openCityDialog, closeCityDialog, centerOnTile,
 *   selectUnit, showProductionPicker
 */

import { S } from './state.js';
import { sfx, getDeathSfx } from './sound.js';
import {
  UNIT_NAMES, IMPROVE_NAMES, WONDER_NAMES, ADVANCE_NAMES,
  ORDER_NAMES, UNIT_CARRY_CAP, UNIT_DOMAIN, CIV_CITY_NAMES,
  GOVERNMENT_NAMES, GOVT_MAX_RATE, GOVT_MAX_SCIENCE,
} from '../engine/defs.js';
import { getGameYear } from '../engine/year.js';
import {
  UNIT_ORDER, BUILD_CITY, CHANGE_RATES,
} from '../engine/actions.js';

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
  el.style.cssText = 'position:fixed;top:20%;left:50%;transform:translateX(-50%);z-index:9999;background:#d4b896;border:3px outset #a08060;padding:12px 24px;font:16px "Times New Roman",serif;color:#333;text-align:center';
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
  let locationStr;
  const cityAtUnit = S.mpGameState.cities?.find(c => c.gx === unit.gx && c.gy === unit.gy);
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

// ── Reusable Civ2-styled dialog ──

/**
 * Create a reusable Civ2-styled dialog.
 * @param {string} id - unique DOM id
 * @param {string} title - titlebar text
 * @param {function} buildContent - (panel) => void, populates the panel
 * @param {Array<{label:string, action:function}>} buttons - button definitions
 * @returns {{ overlay, dismiss }} - DOM element and dismiss function
 */
export function createCiv2Dialog(id, title, buildContent, buttons = [{ label: 'OK' }], opts = {}) {
  const { showClose = true } = opts;
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

  // Close (X) button in title bar
  if (showClose) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'civ2-dialog-close';
    closeBtn.textContent = '\u2715';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', () => { dismiss(); if (buttons[0]?.action) buttons[0].action(); });
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

// ── Turn events ──

/**
 * Show turn events sequentially as Civ2-styled dialogs.
 * Events: cityGrowth, famine, needsAqueduct, needsSewer, productionComplete
 */
export function showTurnEvents(events) {
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
        const civName = S.mpGameState?.civNames?.[ev.civSlot] || `Civilization ${ev.civSlot}`;
        const isMe = ev.civSlot === S.mpCivSlot;
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
    // Tick marks
    const ticks = document.createElement('div');
    ticks.style.cssText = 'display:flex;justify-content:space-between;margin-top:1px;font-size:9px;color:#666;user-select:none';
    for (let t = 0; t <= 10; t++) {
      const tick = document.createElement('span');
      tick.textContent = (t * 10) + '';
      ticks.appendChild(tick);
    }
    sliderWrap.appendChild(slider);
    sliderWrap.appendChild(ticks);
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
