/**
 * diplomacy-ui.js — Civ2-styled diplomacy negotiation dialog.
 *
 * Provides a rich negotiation interface with sub-menus for treaties,
 * gifts, demands, and war declarations. Replaces the simpler inline
 * buttons in advisors.js showDiplomacyPanel.
 *
 * Entry point: openDiplomacyDialog(state, mapBase, myCiv, targetCiv, sendAction)
 */

import { S } from './state.js';
import { sfx } from './sound.js';
import {
  createCiv2Dialog, showOverlayMessage, showConfirmDialog,
} from './dialogs.js';
import {
  CIV_COLORS, ADVANCE_NAMES, LEADERS_TXT_NAMES,
} from '../engine/defs.js';
import {
  getAttitudeLevel, calcTributeDemand, calcTechPrice, calcGoldToAttitude,
} from '../engine/diplomacy.js';
import {
  PROPOSE_TREATY, DECLARE_WAR, DEMAND_TRIBUTE, SHARE_MAP, EXECUTE_TRADE,
} from '../engine/actions.js';

// ── Constants ──────────────────────────────────────────────────────

const ATTITUDE_LEVEL_NAMES = [
  'Enraged', 'Furious', 'Annoyed', 'Uncooperative',
  'Neutral', 'Cordial', 'Polite', 'Enthusiastic', 'Worshipful',
];

const ATTITUDE_GREETINGS = [
  // 0 Enraged
  'Our warriors are sharpening their blades. Speak quickly!',
  // 1 Furious
  'We are not pleased to see you. State your business!',
  // 2 Annoyed
  'What do you want? Make it quick.',
  // 3 Uncooperative
  'We are listening... reluctantly.',
  // 4 Neutral
  'Greetings. What brings you here today?',
  // 5 Cordial
  'Welcome, friend. How may we be of service?',
  // 6 Polite
  'It is always a pleasure to receive your emissary.',
  // 7 Enthusiastic
  'Our people celebrate your visit! What can we do for you?',
  // 8 Worshipful
  'We are honored beyond words by your presence!',
];

const STYLE_MSG = 'text-align:center;padding:12px 20px;font:16px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
const STYLE_ITEM = 'display:block;width:100%;text-align:left;padding:6px 12px;margin:3px 0;font:14px "Times New Roman",Georgia,serif;cursor:pointer;border:none;background:none;color:#333';

// ── Helpers ────────────────────────────────────────────────────────

function getTargetName(state, civSlot) {
  return state.civNames?.[civSlot] || `Civ ${civSlot}`;
}

function getLeaderName(state, civSlot) {
  const civ = state.civs?.[civSlot];
  if (civ?.leaderName) return civ.leaderName;
  // Fall back to rulesCivNumber → LEADERS_TXT_NAMES
  const rulesNum = civ?.rulesCivNumber ?? civSlot;
  return LEADERS_TXT_NAMES[rulesNum] || `Leader ${civSlot}`;
}

function getTreatyStatus(state, myCiv, targetCiv) {
  if (!state.treaties) return 'war';
  const k = myCiv < targetCiv ? `${myCiv}-${targetCiv}` : `${targetCiv}-${myCiv}`;
  return state.treaties[k] || 'war';
}

function getRawAttitude(state, targetCiv, myCiv) {
  return state.civs?.[targetCiv]?.attitudes?.[myCiv] ?? 50;
}

/** Create a styled menu button for the diplomacy menu. */
function makeMenuBtn(label, onClick) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.style.cssText = STYLE_ITEM;
  btn.addEventListener('mouseenter', () => { btn.style.background = '#c4a876'; });
  btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; });
  btn.addEventListener('click', onClick);
  return btn;
}

/** Build a header section for the diplomacy dialog. */
function buildHeader(panel, state, myCiv, targetCiv) {
  const civName = getTargetName(state, targetCiv);
  const leaderName = getLeaderName(state, targetCiv);
  const civColor = CIV_COLORS[targetCiv] || '#fff';
  const rawAtt = getRawAttitude(state, targetCiv, myCiv);
  const attLevel = getAttitudeLevel(rawAtt);
  const attName = ATTITUDE_LEVEL_NAMES[attLevel] || 'Unknown';
  const treaty = getTreatyStatus(state, myCiv, targetCiv);
  const treatyLabel = treaty.charAt(0).toUpperCase() + treaty.slice(1);
  const greeting = ATTITUDE_GREETINGS[attLevel] || 'Greetings.';

  const header = document.createElement('div');
  header.style.cssText = 'padding:8px 16px;border-bottom:2px solid #a08060';

  const nameRow = document.createElement('div');
  nameRow.style.cssText = `font:bold 18px "Times New Roman",Georgia,serif;color:${civColor};text-shadow:1px 1px 2px rgba(0,0,0,0.5)`;
  nameRow.textContent = `${civName} — ${leaderName}`;
  header.appendChild(nameRow);

  const attRow = document.createElement('div');
  attRow.style.cssText = 'font:13px "Times New Roman",Georgia,serif;color:#555;margin-top:2px';
  const attColor = attLevel <= 2 ? '#a33' : attLevel >= 6 ? '#3a3' : '#666';
  attRow.innerHTML = `Attitude: <span style="color:${attColor};font-weight:bold">${attName}</span> &nbsp;|&nbsp; Treaty: <span style="font-weight:bold">${treatyLabel}</span>`;
  header.appendChild(attRow);

  const greetEl = document.createElement('div');
  greetEl.style.cssText = 'font:italic 14px "Times New Roman",Georgia,serif;color:#444;margin-top:6px';
  greetEl.textContent = `"${greeting}"`;
  header.appendChild(greetEl);

  panel.appendChild(header);
}

// ── Sub-Dialogs ────────────────────────────────────────────────────

function showTreatySubMenu(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);
  const treaty = getTreatyStatus(state, myCiv, targetCiv);

  const options = [];
  if (treaty === 'war') {
    options.push({ label: 'Propose Ceasefire', treaty: 'ceasefire' });
    options.push({ label: 'Propose Peace Treaty', treaty: 'peace' });
  } else if (treaty === 'ceasefire') {
    options.push({ label: 'Propose Peace Treaty', treaty: 'peace' });
  } else if (treaty === 'peace') {
    options.push({ label: 'Propose Alliance', treaty: 'alliance' });
  }
  // alliance: nothing higher to propose

  if (options.length === 0) {
    showOverlayMessage(treaty === 'alliance'
      ? `Already allied with ${civName}`
      : `No treaties available with ${civName}`);
    return;
  }

  createCiv2Dialog('diplo-treaty-dialog', 'Propose Treaty', panel => {
    panel.style.minWidth = '280px';
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = `Select a treaty to propose to ${civName}:`;
    panel.appendChild(msg);

    for (const opt of options) {
      panel.appendChild(makeMenuBtn(opt.label, () => {
        document.getElementById('diplo-treaty-dialog')?.remove();
        sfx('POS1');
        sendAction({
          type: 'ACTION',
          action: { type: PROPOSE_TREATY, targetCiv, treaty: opt.treaty },
        });
        showOverlayMessage(`${opt.label} sent to ${civName}`);
      }));
    }
  }, [{ label: 'Cancel' }]);
}

function showGiveGoldDialog(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);
  const treasury = state.civs?.[myCiv]?.treasury || 0;

  if (treasury <= 0) {
    showOverlayMessage('You have no gold to give.');
    return;
  }

  // Offer preset amounts: 25%, 50%, 75%, 100% of treasury, rounded to nearest 50
  const presets = [0.25, 0.5, 0.75, 1.0]
    .map(pct => Math.max(50, Math.round(treasury * pct / 50) * 50))
    .filter((v, i, a) => a.indexOf(v) === i); // dedupe

  createCiv2Dialog('diplo-gold-dialog', 'Give Gold', panel => {
    panel.style.minWidth = '280px';
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = `Give gold to ${civName} (Treasury: ${treasury})`;
    panel.appendChild(msg);

    for (const amount of presets) {
      const attGain = calcGoldToAttitude(amount);
      panel.appendChild(makeMenuBtn(`${amount} gold (attitude +${attGain})`, () => {
        document.getElementById('diplo-gold-dialog')?.remove();
        sfx('SELL');
        sendAction({
          type: 'ACTION',
          action: {
            type: EXECUTE_TRADE,
            fromCiv: myCiv,
            toCiv: targetCiv,
            transaction: { from: myCiv, to: targetCiv, gold: amount },
          },
        });
        showOverlayMessage(`Gave ${amount} gold to ${civName}`);
      }));
    }

    // Custom amount input
    const customRow = document.createElement('div');
    customRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 12px;margin-top:4px';
    const label = document.createElement('span');
    label.textContent = 'Custom:';
    label.style.cssText = 'font:14px "Times New Roman",serif;color:#333';
    customRow.appendChild(label);
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = String(treasury);
    input.value = String(Math.min(100, treasury));
    input.style.cssText = 'width:80px;font:14px "Times New Roman",serif;padding:3px 6px;border:2px inset #a08060';
    customRow.appendChild(input);
    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Give';
    sendBtn.className = 'civ2-btn';
    sendBtn.style.cssText = 'font-size:12px;padding:3px 10px';
    sendBtn.addEventListener('click', () => {
      const amt = Math.max(1, Math.min(treasury, parseInt(input.value) || 0));
      document.getElementById('diplo-gold-dialog')?.remove();
      sfx('SELL');
      sendAction({
        type: 'ACTION',
        action: {
          type: EXECUTE_TRADE,
          fromCiv: myCiv,
          toCiv: targetCiv,
          transaction: { from: myCiv, to: targetCiv, gold: amt },
        },
      });
      showOverlayMessage(`Gave ${amt} gold to ${civName}`);
    });
    customRow.appendChild(sendBtn);
    panel.appendChild(customRow);
  }, [{ label: 'Cancel' }]);
}

function showGiveTechDialog(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);
  const myTechs = state.civTechs?.[myCiv];
  const theirTechs = state.civTechs?.[targetCiv];

  if (!myTechs) {
    showOverlayMessage('No technology data available.');
    return;
  }

  // Find techs we have that they don't
  const giveableTechs = [];
  for (const techId of myTechs) {
    if (!theirTechs || !theirTechs.has(techId)) {
      giveableTechs.push(techId);
    }
  }

  if (giveableTechs.length === 0) {
    showOverlayMessage(`${civName} already knows all your technologies.`);
    return;
  }

  // Sort by name
  giveableTechs.sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));

  createCiv2Dialog('diplo-tech-dialog', 'Give Technology', panel => {
    panel.style.cssText += ';min-width:300px;max-height:400px;overflow-y:auto';
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = `Select a technology to give to ${civName}:`;
    panel.appendChild(msg);

    for (const techId of giveableTechs) {
      const name = ADVANCE_NAMES[techId] || `Advance ${techId}`;
      panel.appendChild(makeMenuBtn(name, () => {
        document.getElementById('diplo-tech-dialog')?.remove();
        sfx('POS1');
        sendAction({
          type: 'ACTION',
          action: {
            type: EXECUTE_TRADE,
            fromCiv: myCiv,
            toCiv: targetCiv,
            transaction: { from: myCiv, to: targetCiv, techs: [techId] },
          },
        });
        showOverlayMessage(`Gave ${name} to ${civName}`);
      }));
    }
  }, [{ label: 'Cancel' }]);
}

function showShareMapDialog(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);
  const treaty = getTreatyStatus(state, myCiv, targetCiv);

  if (treaty === 'war') {
    showOverlayMessage(`Cannot share maps while at war with ${civName}.`);
    return;
  }

  showConfirmDialog(
    `Exchange maps with ${civName}? Both civilizations will share their explored territory.`,
    () => {
      sfx('POS1');
      sendAction({
        type: 'ACTION',
        action: { type: SHARE_MAP, targetCiv },
      });
      showOverlayMessage(`Maps exchanged with ${civName}`);
    },
    'Share Map',
  );
}

function showDemandTributeDialog(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);

  // Calculate suggested tribute amount
  const suggestedTribute = calcTributeDemand(state, myCiv, targetCiv, 16);
  const defaultAmount = Math.max(50, suggestedTribute || 50);

  createCiv2Dialog('diplo-tribute-dialog', 'Demand Tribute', panel => {
    panel.style.minWidth = '280px';
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = `Demand gold tribute from ${civName}:`;
    panel.appendChild(msg);

    const inputRow = document.createElement('div');
    inputRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 16px;justify-content:center';
    const label = document.createElement('span');
    label.textContent = 'Amount:';
    label.style.cssText = 'font:14px "Times New Roman",serif;color:#333';
    inputRow.appendChild(label);
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = '10000';
    input.value = String(defaultAmount);
    input.id = 'diplo-tribute-amount';
    input.style.cssText = 'width:80px;font:14px "Times New Roman",serif;padding:4px 6px;border:2px inset #a08060';
    inputRow.appendChild(input);
    panel.appendChild(inputRow);

    setTimeout(() => { input.focus(); input.select(); }, 0);
  }, [
    { label: 'Cancel' },
    { label: 'Demand', action: () => {
      const el = document.getElementById('diplo-tribute-amount');
      const amount = Math.max(1, Math.min(10000, parseInt(el?.value) || defaultAmount));
      sfx('NEG1');
      sendAction({
        type: 'ACTION',
        action: { type: DEMAND_TRIBUTE, targetCiv, amount },
      });
      showOverlayMessage(`Demanded ${amount} gold from ${civName}`);
    }},
  ]);
}

function showRequestTechDialog(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);
  const myTechs = state.civTechs?.[myCiv];
  const theirTechs = state.civTechs?.[targetCiv];

  if (!theirTechs) {
    showOverlayMessage('No technology data available for target.');
    return;
  }

  // Find techs they have that we don't
  const requestable = [];
  for (const techId of theirTechs) {
    if (!myTechs || !myTechs.has(techId)) {
      requestable.push(techId);
    }
  }

  if (requestable.length === 0) {
    showOverlayMessage(`${civName} has no technologies you lack.`);
    return;
  }

  // Sort by name
  requestable.sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));

  createCiv2Dialog('diplo-reqtech-dialog', 'Request Technology', panel => {
    panel.style.cssText += ';min-width:300px;max-height:400px;overflow-y:auto';
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = `Request a technology from ${civName}:`;
    panel.appendChild(msg);

    const note = document.createElement('div');
    note.style.cssText = 'font:12px "Times New Roman",serif;color:#888;text-align:center;padding:0 16px 6px';
    note.textContent = '(This is a gift request — the AI may refuse based on attitude.)';
    panel.appendChild(note);

    for (const techId of requestable) {
      const name = ADVANCE_NAMES[techId] || `Advance ${techId}`;
      const price = calcTechPrice(state, targetCiv, myCiv, techId);
      panel.appendChild(makeMenuBtn(`${name} (value: ${price}g)`, () => {
        document.getElementById('diplo-reqtech-dialog')?.remove();
        sfx('POS1');
        // Request tech: use EXECUTE_TRADE from them to us (AI will evaluate)
        sendAction({
          type: 'ACTION',
          action: {
            type: EXECUTE_TRADE,
            fromCiv: targetCiv,
            toCiv: myCiv,
            transaction: { from: targetCiv, to: myCiv, techs: [techId] },
          },
        });
        showOverlayMessage(`Requested ${name} from ${civName}`);
      }));
    }
  }, [{ label: 'Cancel' }]);
}

function showDeclareWarDialog(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);
  const treaty = getTreatyStatus(state, myCiv, targetCiv);

  if (treaty === 'war') {
    showOverlayMessage(`Already at war with ${civName}.`);
    return;
  }

  let warningText = `Declare war on ${civName}?`;
  if (treaty === 'alliance') {
    warningText = `Break your ALLIANCE and declare war on ${civName}? This will severely damage your reputation!`;
  } else if (treaty === 'peace') {
    warningText = `Break the peace treaty and declare war on ${civName}? This will damage your reputation.`;
  } else if (treaty === 'ceasefire') {
    warningText = `Break the ceasefire and declare war on ${civName}? This will damage your reputation.`;
  }

  showConfirmDialog(warningText, () => {
    sfx('NEG1');
    sendAction({
      type: 'ACTION',
      action: { type: DECLARE_WAR, targetCiv },
    });
    showOverlayMessage(`War declared on ${civName}!`);
  }, 'Declare War?');
}

// ── Gift Sub-Menu ──────────────────────────────────────────────────

function showGiftSubMenu(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);

  createCiv2Dialog('diplo-gift-dialog', 'Give Gift', panel => {
    panel.style.minWidth = '260px';
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = `What would you like to give ${civName}?`;
    panel.appendChild(msg);

    panel.appendChild(makeMenuBtn('Give Gold', () => {
      document.getElementById('diplo-gift-dialog')?.remove();
      showGiveGoldDialog(state, myCiv, targetCiv, sendAction);
    }));
    panel.appendChild(makeMenuBtn('Give Technology', () => {
      document.getElementById('diplo-gift-dialog')?.remove();
      showGiveTechDialog(state, myCiv, targetCiv, sendAction);
    }));
    panel.appendChild(makeMenuBtn('Share Map', () => {
      document.getElementById('diplo-gift-dialog')?.remove();
      showShareMapDialog(state, myCiv, targetCiv, sendAction);
    }));
  }, [{ label: 'Cancel' }]);
}

// ── Favor Sub-Menu ─────────────────────────────────────────────────

function showFavorSubMenu(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);

  createCiv2Dialog('diplo-favor-dialog', 'Ask Favor', panel => {
    panel.style.minWidth = '260px';
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = `What would you like to ask of ${civName}?`;
    panel.appendChild(msg);

    panel.appendChild(makeMenuBtn('Demand Tribute', () => {
      document.getElementById('diplo-favor-dialog')?.remove();
      showDemandTributeDialog(state, myCiv, targetCiv, sendAction);
    }));
    panel.appendChild(makeMenuBtn('Request Technology', () => {
      document.getElementById('diplo-favor-dialog')?.remove();
      showRequestTechDialog(state, myCiv, targetCiv, sendAction);
    }));
    panel.appendChild(makeMenuBtn('Request Map', () => {
      document.getElementById('diplo-favor-dialog')?.remove();
      showShareMapDialog(state, myCiv, targetCiv, sendAction);
    }));
  }, [{ label: 'Cancel' }]);
}

// ── Main Entry Point ───────────────────────────────────────────────

/**
 * Open the main diplomacy negotiation dialog with a target civ.
 *
 * @param {object} state    - current game state (S.mpGameState)
 * @param {object} mapBase  - map terrain base data (S.mpMapBase)
 * @param {number} myCiv    - player's civ slot (1-7)
 * @param {number} targetCiv - target civ slot (1-7)
 * @param {function} sendAction - callback: sendAction({ type: 'ACTION', action: {...} })
 */
export function openDiplomacyDialog(state, mapBase, myCiv, targetCiv, sendAction) {
  if (!state || !state.civs?.[targetCiv]) return;
  if (!(state.civsAlive & (1 << targetCiv))) {
    showOverlayMessage('That civilization no longer exists.');
    return;
  }

  const civName = getTargetName(state, targetCiv);
  const treaty = getTreatyStatus(state, myCiv, targetCiv);

  createCiv2Dialog('diplo-main-dialog', `Audience with ${civName}`, panel => {
    panel.style.minWidth = '340px';

    // Build header with attitude, greeting, etc.
    buildHeader(panel, state, myCiv, targetCiv);

    // Menu section
    const menu = document.createElement('div');
    menu.style.cssText = 'padding:8px 4px';

    // Propose Treaty
    menu.appendChild(makeMenuBtn('Propose Treaty', () => {
      document.getElementById('diplo-main-dialog')?.remove();
      showTreatySubMenu(state, myCiv, targetCiv, sendAction);
    }));

    // Give Gift (only if not at war, or allow anyway for goodwill)
    menu.appendChild(makeMenuBtn('Give Gift', () => {
      document.getElementById('diplo-main-dialog')?.remove();
      showGiftSubMenu(state, myCiv, targetCiv, sendAction);
    }));

    // Ask Favor
    menu.appendChild(makeMenuBtn('Ask Favor', () => {
      document.getElementById('diplo-main-dialog')?.remove();
      showFavorSubMenu(state, myCiv, targetCiv, sendAction);
    }));

    // Declare War (only if not already at war)
    if (treaty !== 'war') {
      const warBtn = makeMenuBtn('Declare War', () => {
        document.getElementById('diplo-main-dialog')?.remove();
        showDeclareWarDialog(state, myCiv, targetCiv, sendAction);
      });
      warBtn.style.color = '#a33';
      menu.appendChild(warBtn);
    }

    panel.appendChild(menu);
  }, [{ label: 'Leave' }]);
}

// ── Civ Picker (used from the keyboard shortcut / menu) ────────────

/**
 * Show a civ-selection dialog that opens the full negotiation dialog
 * for the chosen civ. This is the entry point from the hamburger menu
 * and keyboard shortcut.
 */
export function showDiplomacyNegotiationPicker() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  const state = S.mpGameState;
  const myCiv = S.mpCivSlot;

  // Collect alive civs that are not us
  const targets = [];
  for (let c = 1; c < 8; c++) {
    if (c === myCiv || !(state.civsAlive & (1 << c))) continue;
    targets.push(c);
  }

  if (targets.length === 0) {
    showOverlayMessage('No other civilizations to negotiate with.');
    return;
  }

  const sendAction = (msg) => S.transport.sendRaw(msg);

  createCiv2Dialog('diplo-picker-dialog', 'Foreign Minister', panel => {
    panel.style.minWidth = '300px';
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = 'Which civilization would you like to contact?';
    panel.appendChild(msg);

    for (const c of targets) {
      const civName = getTargetName(state, c);
      const civColor = CIV_COLORS[c] || '#fff';
      const treaty = getTreatyStatus(state, myCiv, c);
      const treatyLabel = treaty.charAt(0).toUpperCase() + treaty.slice(1);
      const rawAtt = getRawAttitude(state, c, myCiv);
      const attLevel = getAttitudeLevel(rawAtt);
      const attName = ATTITUDE_LEVEL_NAMES[attLevel] || 'Unknown';

      const btn = document.createElement('button');
      btn.style.cssText = STYLE_ITEM + ';display:flex;align-items:center;justify-content:space-between';
      btn.addEventListener('mouseenter', () => { btn.style.background = '#c4a876'; });
      btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; });

      const nameSpan = document.createElement('span');
      nameSpan.style.cssText = `color:${civColor};font-weight:bold;text-shadow:1px 1px 1px rgba(0,0,0,0.4)`;
      nameSpan.textContent = civName;
      btn.appendChild(nameSpan);

      const infoSpan = document.createElement('span');
      const attColor = attLevel <= 2 ? '#a33' : attLevel >= 6 ? '#3a3' : '#666';
      const treatyColor = treaty === 'war' ? '#a33' : '#3a3';
      infoSpan.style.cssText = 'font-size:12px;color:#555';
      infoSpan.innerHTML = `<span style="color:${treatyColor}">${treatyLabel}</span> | <span style="color:${attColor}">${attName}</span>`;
      btn.appendChild(infoSpan);

      btn.addEventListener('click', () => {
        document.getElementById('diplo-picker-dialog')?.remove();
        openDiplomacyDialog(state, S.mpMapBase, myCiv, c, sendAction);
      });

      panel.appendChild(btn);
    }
  }, [{ label: 'Cancel' }]);
}
