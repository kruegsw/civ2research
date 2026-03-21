/**
 * diplomacy-ui.js — Civ2-styled diplomacy negotiation dialog.
 *
 * Multi-screen flow matching the real Civ2 Game.txt diplomacy sequence:
 *   Screen 1: Emissary Arrival (accept/refuse audience)
 *   Screen 2: Greeting + Main Menu (attitude-based greeting, then @DIPLOMACYMENU)
 *   Screen 3: Sub-menus for proposals, gifts, demands
 *   Screen 4: AI response screens (accept/reject/counter)
 *   Screen 5: Dismissal (@OUTAHERE / @OUTAHEREALLY)
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
  LEADER_TITLES, LEADER_TITLES_FEMALE,
} from '../engine/defs.js';
import { showCivilopedia } from './civilopedia.js';
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

// Game.txt @GREETINGS — hostile (attitude 0-3) and friendly (4-8) variants
const HOSTILE_GREETINGS = [
  'O most untrustworthy leader of the infidels, hear now the words of %LEADER, %TITLE of the %CIV...',
  'O treacherous one, hear now the words of %LEADER, ruler and %TITLE of the %CIV...',
  'Treacherous %PLAYER! Prepare yourself for a message from our most wise %TITLE: %LEADER of the %CIV...',
  'Beware, most untrustworthy %PLAYER. I speak for %PRONOUN who makes mortals tremble: %TITLE %LEADER of the %CIV...',
];
const FRIENDLY_GREETINGS = [
  'Greetings from the most exalted %LEADER: %TITLE of the %CIV...',
  'I bring tidings from %LEADER, ruler and %TITLE of the %CIV...',
  'I bear a message from our most wise %TITLE: %LEADER of the %CIV...',
  'I speak for %PRONOUN who makes mortals tremble: %TITLE %LEADER of the %CIV...',
];
// Game.txt @WELCOME/@WELCOMEPEACE/@WELCOMEALLY — treaty-based greetings
const TREATY_GREETINGS = {
  war: 'Our warriors are sharpening their blades. Speak quickly!',
  ceasefire: 'We appreciate this period of understanding between our two peoples.',
  peace: 'We welcome the friendship of the %CIV people and their most wise leader: %TITLE %PLAYER.',
  alliance: 'We celebrate our eternal alliance with the %CIV people and their most wise and munificent leader: %TITLE %PLAYER.',
};

// Game.txt @DIPLOMACYMENU options
const DIPLO_MENU_ITEMS = {
  done: 'Consider this discussion complete.',
  alliance: 'Suggest a permanent strategic alliance.',
  peace: 'Suggest a permanent peace treaty.',
  requestGift: 'Request a gift from you, our gracious allies.',
  demandTribute: 'Demand tribute for our patience.',
  withdrawTroops: 'Insist that you withdraw your troops.',
  cancelAlliance: 'Cancel this worthless alliance.',
  propose: 'Have a proposal to make...',
  offerGift: 'Wish to offer you a gift...',
};

// Game.txt @OUTAHERE / @OUTAHEREALLY
const DISMISSALS = {
  hostile: 'You have wasted enough of our valuable time. Now begone!',
  allied: 'Pressing matters of state prevent us from granting an audience.',
};

// AI response text (Game.txt @ACCEPT / @REJECT style)
const AI_ACCEPT_TEXTS = [
  'We accept your proposal. Let there be peace between our peoples.',
  'Very well. We agree to your terms.',
  'Your offer is acceptable.',
];
const AI_REJECT_HOSTILE = [
  'Your weak civilization has nothing to offer us. Begone!',
  'We would sooner feed our dogs than accept your pathetic proposal!',
  'Do not waste our time with such foolishness.',
];
const AI_REJECT_NEUTRAL = [
  'We are not interested in your proposal at this time.',
  'Perhaps another time. We must decline.',
  'Your terms are unacceptable.',
];

// Throne room styled dialog
const STYLE_MSG = 'text-align:center;padding:12px 20px;font:16px "Times New Roman",Georgia,serif;color:#f0e8d0;text-shadow:1px 1px 2px rgba(0,0,0,0.8)';
const STYLE_ITEM = 'display:block;width:100%;text-align:left;padding:6px 12px;margin:3px 0;font:14px "Times New Roman",Georgia,serif;cursor:pointer;border:none;background:none;color:#f0e8d0';
const THRONE_BG = 'background:linear-gradient(180deg, #2a1a0a 0%, #3d2815 20%, #4a3020 50%, #3d2815 80%, #2a1a0a 100%);border:3px solid #8b6914;box-shadow:inset 0 0 30px rgba(0,0,0,0.5)';
const STYLE_ITEM_HOVER = 'background:rgba(139,105,20,0.4)';

const DIALOG_ID = 'diplo-main-dialog';

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

function getLeaderTitle(state, civSlot) {
  const civ = state.civs?.[civSlot];
  const govt = civ?.government || 'despotism';
  const isFemale = civ?.gender && civ.gender !== 0;
  const titles = isFemale ? LEADER_TITLES_FEMALE : LEADER_TITLES;
  return titles[govt] || 'Leader';
}

function getLeaderPronoun(state, civSlot) {
  const civ = state.civs?.[civSlot];
  const isFemale = civ?.gender && civ.gender !== 0;
  return isFemale ? 'her' : 'him';
}

function getLeaderPronounSubject(state, civSlot) {
  const civ = state.civs?.[civSlot];
  const isFemale = civ?.gender && civ.gender !== 0;
  return isFemale ? 'she' : 'he';
}

function getTreatyStatus(state, myCiv, targetCiv) {
  if (!state.treaties) return 'war';
  const k = myCiv < targetCiv ? `${myCiv}-${targetCiv}` : `${targetCiv}-${myCiv}`;
  return state.treaties[k] || 'war';
}

function getRawAttitude(state, targetCiv, myCiv) {
  return state.civs?.[targetCiv]?.attitudes?.[myCiv] ?? 50;
}

/** Substitute Game.txt placeholders in greeting strings. */
function substGreeting(text, state, myCiv, targetCiv) {
  const leaderName = getLeaderName(state, targetCiv);
  const title = getLeaderTitle(state, targetCiv);
  const civName = getTargetName(state, targetCiv);
  const myLeader = getLeaderName(state, myCiv);
  const myTitle = getLeaderTitle(state, myCiv);
  const pronoun = getLeaderPronounSubject(state, targetCiv);
  return text
    .replace(/%LEADER/g, leaderName)
    .replace(/%TITLE/g, title)
    .replace(/%CIV/g, civName)
    .replace(/%PLAYER/g, myLeader)
    .replace(/%PRONOUN/g, pronoun);
}

/** Create a styled menu button for the diplomacy menu. */
function makeMenuBtn(label, onClick) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.style.cssText = STYLE_ITEM;
  btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(139,105,20,0.4)'; });
  btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; });
  btn.addEventListener('click', onClick);
  return btn;
}

/** Pick a random element from an array. */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Diplomacy Session ─────────────────────────────────────────────
// Manages the multi-screen flow as a sequence of screen replacements
// within a single dialog overlay.

class DiplomacySession {
  constructor(state, mapBase, myCiv, targetCiv, sendAction) {
    this.state = state;
    this.mapBase = mapBase;
    this.myCiv = myCiv;
    this.targetCiv = targetCiv;
    this.sendAction = sendAction;

    this.civName = getTargetName(state, targetCiv);
    this.leaderName = getLeaderName(state, targetCiv);
    this.title = getLeaderTitle(state, targetCiv);
    this.treaty = getTreatyStatus(state, myCiv, targetCiv);
    this.rawAtt = getRawAttitude(state, targetCiv, myCiv);
    this.attLevel = getAttitudeLevel(this.rawAtt);
    this.pronoun = getLeaderPronoun(state, targetCiv);

    this.overlay = null;
    this.frame = null;
    this.panel = null;
    this.btnRow = null;
    this.titleSpan = null;
    this.keyHandler = null;
  }

  /** Create the persistent dialog container (called once). */
  createContainer() {
    const existing = document.getElementById(DIALOG_ID);
    if (existing) existing.remove();

    this.overlay = document.createElement('div');
    this.overlay.id = DIALOG_ID;
    this.overlay.className = 'civ2-dialog-overlay';

    this.frame = document.createElement('div');
    this.frame.className = 'civ2-dialog-frame';

    // Titlebar
    const titlebar = document.createElement('div');
    titlebar.className = 'civ2-dialog-titlebar';
    titlebar.style.position = 'relative';
    this.titleSpan = document.createElement('span');
    this.titleSpan.className = 'civ2-dialog-title';
    this.titleSpan.textContent = `${this.civName} Emissary`;
    titlebar.appendChild(this.titleSpan);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'civ2-dialog-close';
    closeBtn.textContent = '\u2715';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('click', () => this.dismiss());
    titlebar.appendChild(closeBtn);

    this.frame.appendChild(titlebar);

    // Panel (content area — replaced on each screen)
    this.panel = document.createElement('div');
    this.panel.className = 'civ2-dialog-panel';
    this.panel.style.cssText = `min-width:380px;max-width:520px;${THRONE_BG}`;
    this.frame.appendChild(this.panel);

    // Button row (replaced on each screen)
    this.btnRow = document.createElement('div');
    this.btnRow.className = 'civ2-dialog-btn-row';
    this.frame.appendChild(this.btnRow);

    this.overlay.appendChild(this.frame);
    this.overlay.addEventListener('click', e => { if (e.target === this.overlay) this.dismiss(); });

    // Keyboard handler
    this.keyHandler = e => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this.dismiss(); }
    };
    window.addEventListener('keydown', this.keyHandler, true);

    document.body.appendChild(this.overlay);
  }

  dismiss() {
    if (this.overlay) this.overlay.remove();
    if (this.keyHandler) window.removeEventListener('keydown', this.keyHandler, true);
    this.overlay = null;
  }

  /** Replace the panel content and buttons for a new screen. */
  setScreen(titleText, buildContent, buttons) {
    if (!this.overlay) return;
    this.titleSpan.textContent = titleText;

    // Clear panel
    this.panel.innerHTML = '';
    buildContent(this.panel);

    // Clear and rebuild buttons
    this.btnRow.innerHTML = '';
    for (const b of buttons) {
      const btn = document.createElement('button');
      btn.textContent = b.label;
      btn.className = 'civ2-btn';
      btn.addEventListener('click', () => { if (b.action) b.action(); else this.dismiss(); });
      this.btnRow.appendChild(btn);
    }
  }

  // ── Screen 1: Emissary Arrival ──────────────────────────────────

  showEmissaryArrival() {
    const pronounObj = this.pronoun; // "him" or "her"

    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = STYLE_MSG + ';line-height:1.6;padding:20px 24px';
      msg.textContent = `An emissary from ${this.leaderName} ${this.title} of the ${this.civName} wishes to speak with you. Will you receive ${pronounObj}?`;
      panel.appendChild(msg);
    }, [
      { label: `No. Send ${pronounObj} away.`, action: () => {
        // AI may force audience (hostile AI with low attitude)
        if (this.attLevel <= 2 && Math.random() < 0.6) {
          this.showForcedAudience();
        } else {
          this.dismiss();
        }
      }},
      { label: 'Yes. I will grant an audience.', action: () => {
        this.showGreetingAndMenu();
      }},
    ]);
  }

  /** AI forces audience after player refuses. */
  showForcedAudience() {
    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = STYLE_MSG + ';line-height:1.6;padding:20px 24px';
      msg.textContent = `The ${this.civName} emissary has nonetheless demanded an audience!`;
      panel.appendChild(msg);
    }, [
      { label: 'Very well...', action: () => {
        this.showGreetingAndMenu();
      }},
    ]);
  }

  // ── Screen 2: Greeting + Main Menu ──────────────────────────────

  showGreetingAndMenu() {
    // Refresh treaty/attitude in case state changed
    this.treaty = getTreatyStatus(this.state, this.myCiv, this.targetCiv);
    this.rawAtt = getRawAttitude(this.state, this.targetCiv, this.myCiv);
    this.attLevel = getAttitudeLevel(this.rawAtt);

    const treaty = this.treaty;
    const attLevel = this.attLevel;

    // Pick greeting based on attitude and treaty (Game.txt style)
    let greeting;
    if (treaty !== 'war' && TREATY_GREETINGS[treaty]) {
      greeting = TREATY_GREETINGS[treaty];
    } else if (attLevel <= 3) {
      greeting = HOSTILE_GREETINGS[attLevel % HOSTILE_GREETINGS.length];
    } else {
      greeting = FRIENDLY_GREETINGS[(attLevel - 4) % FRIENDLY_GREETINGS.length];
    }
    greeting = substGreeting(greeting, this.state, this.myCiv, this.targetCiv);

    this.setScreen(`${this.civName} Emissary`, panel => {
      // Greeting text
      const greetEl = document.createElement('div');
      greetEl.style.cssText = 'font:italic 15px "Times New Roman",Georgia,serif;color:#e0d8c0;padding:16px 20px;text-align:center;line-height:1.5;border-bottom:1px solid rgba(139,105,20,0.4)';
      greetEl.textContent = `\u201C${greeting}\u201D`;
      panel.appendChild(greetEl);

      // Attitude + Treaty status bar
      const attName = ATTITUDE_LEVEL_NAMES[attLevel] || 'Unknown';
      const treatyLabel = treaty.charAt(0).toUpperCase() + treaty.slice(1);
      const attColor = attLevel <= 2 ? '#e55' : attLevel >= 6 ? '#5e5' : '#c8b080';
      const statusBar = document.createElement('div');
      statusBar.style.cssText = 'font:12px "Times New Roman",Georgia,serif;color:#a09070;padding:4px 20px;text-align:center;border-bottom:1px solid rgba(139,105,20,0.3)';
      statusBar.innerHTML = `<span style="color:${attColor};font-weight:bold">${attName}</span> &nbsp;\u2022&nbsp; ${treatyLabel}`;
      panel.appendChild(statusBar);

      // Menu section — Game.txt @DIPLOMACYMENU
      const menu = document.createElement('div');
      menu.style.cssText = 'padding:8px 8px 4px';

      const menuLabel = document.createElement('div');
      menuLabel.style.cssText = 'font:13px "Times New Roman",Georgia,serif;color:#a09070;text-align:center;padding:4px 0 6px;font-style:italic';
      menuLabel.textContent = 'We...';
      menu.appendChild(menuLabel);

      // 1. Done
      menu.appendChild(makeMenuBtn(DIPLO_MENU_ITEMS.done, () => {
        this.showDismissal();
      }));

      // 2. Suggest alliance (only if peace or ceasefire — not when already allied or at war)
      if (treaty === 'peace' || treaty === 'ceasefire') {
        menu.appendChild(makeMenuBtn(DIPLO_MENU_ITEMS.alliance, () => {
          sfx('POS1');
          this.sendAction({
            type: 'ACTION',
            action: { type: PROPOSE_TREATY, targetCiv: this.targetCiv, treaty: 'alliance' },
          });
          this.showAIResponse('alliance');
        }));
      }

      // 3. Suggest peace (only if war or ceasefire — not when already at peace/allied)
      if (treaty === 'war' || treaty === 'ceasefire') {
        menu.appendChild(makeMenuBtn(DIPLO_MENU_ITEMS.peace, () => {
          sfx('POS1');
          this.sendAction({
            type: 'ACTION',
            action: { type: PROPOSE_TREATY, targetCiv: this.targetCiv, treaty: 'peace' },
          });
          this.showAIResponse('peace');
        }));
      }

      // 4. Request gift (only if allied)
      if (treaty === 'alliance') {
        menu.appendChild(makeMenuBtn(DIPLO_MENU_ITEMS.requestGift, () => {
          this.showRequestGiftSubMenu();
        }));
      }

      // 5. Demand tribute (only if not allied)
      if (treaty !== 'alliance') {
        menu.appendChild(makeMenuBtn(DIPLO_MENU_ITEMS.demandTribute, () => {
          this.showDemandTributeInline();
        }));
      }

      // 6. Withdraw troops (not when allied)
      if (treaty !== 'alliance') {
        menu.appendChild(makeMenuBtn(DIPLO_MENU_ITEMS.withdrawTroops, () => {
          this.showAIResponse('withdraw');
        }));
      }

      // 7. Cancel alliance (only if allied)
      if (treaty === 'alliance') {
        const cancelBtn = makeMenuBtn(DIPLO_MENU_ITEMS.cancelAlliance, () => {
          sfx('NEG1');
          // Cancel alliance = declare war (breaks treaty)
          this.sendAction({
            type: 'ACTION',
            action: { type: DECLARE_WAR, targetCiv: this.targetCiv },
          });
          this.showAllianceCancelled();
        });
        cancelBtn.style.color = '#d88';
        menu.appendChild(cancelBtn);
      }

      // 8. Proposal sub-menu
      menu.appendChild(makeMenuBtn(DIPLO_MENU_ITEMS.propose, () => {
        this.showProposalSubMenu();
      }));

      // 9. Offer gift
      menu.appendChild(makeMenuBtn(DIPLO_MENU_ITEMS.offerGift, () => {
        this.showGiftSubMenu();
      }));

      panel.appendChild(menu);
    }, []); // No bottom buttons — menu items serve as buttons
  }

  // ── AI Response Screens ─────────────────────────────────────────

  showAIResponse(proposalType) {
    // Wait briefly for server to process the action, then check results
    setTimeout(() => {
      const newState = S.mpGameState;
      const newTreaty = getTreatyStatus(newState, this.myCiv, this.targetCiv);
      const treatyChanged = newTreaty !== this.treaty;

      let accepted, responseText;

      switch (proposalType) {
        case 'tribute':
        case 'requestGold':
          // Tribute demands — server handles via RESPOND_DEMAND
          // Check if treasury changed (gold was transferred)
          accepted = this.attLevel >= 3;
          responseText = accepted ? pick(AI_ACCEPT_TEXTS) : pick(this.attLevel <= 2 ? AI_REJECT_HOSTILE : AI_REJECT_NEUTRAL);
          break;

        case 'requestTech':
        case 'techExchange':
          // Tech trades — EXECUTE_TRADE processes immediately on server
          // These are always "accepted" since the action was already applied
          accepted = true;
          responseText = 'We accept this exchange of knowledge.';
          break;

        case 'withdraw':
          accepted = this.attLevel >= 6;
          responseText = accepted ? 'Very well. Our troops shall be withdrawn.' : pick(AI_REJECT_NEUTRAL);
          break;

        case 'maps':
          // Map sharing — always succeeds if not at war (validated server-side)
          accepted = true;
          responseText = 'We shall share our maps with you.';
          break;

        case 'ceasefire':
        case 'peace':
        case 'alliance':
          // Treaty proposals — check if server actually changed the treaty
          accepted = treatyChanged;
          if (accepted) {
            responseText = pick(AI_ACCEPT_TEXTS);
            this.treaty = newTreaty;
          } else {
            responseText = this.attLevel <= 2 ? pick(AI_REJECT_HOSTILE) : pick(AI_REJECT_NEUTRAL);
          }
          break;

        default:
          accepted = treatyChanged || this.attLevel >= 4;
          responseText = accepted ? pick(AI_ACCEPT_TEXTS) : pick(AI_REJECT_NEUTRAL);
      }

      const statusText = accepted ? 'Proposal Accepted' : 'Proposal Rejected';

      this.setScreen(`${this.civName} Emissary`, panel => {
        const statusEl = document.createElement('div');
        statusEl.style.cssText = `font:bold 16px "Times New Roman",Georgia,serif;text-align:center;padding:12px 20px 4px;color:${accepted ? '#8d8' : '#d88'}`;
        statusEl.textContent = statusText;
        panel.appendChild(statusEl);

        const msg = document.createElement('div');
        msg.style.cssText = 'font:italic 15px "Times New Roman",Georgia,serif;color:#e0d8c0;padding:12px 20px;text-align:center;line-height:1.5';
        msg.textContent = `\u201C${responseText}\u201D`;
        panel.appendChild(msg);
      }, [
        { label: 'Continue', action: () => {
          this.showGreetingAndMenu();
        }},
      ]);
    }, 500); // wait for server STATE response
  }

  showAllianceCancelled() {
    this.treaty = 'war';
    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = 'font:15px "Times New Roman",Georgia,serif;color:#d88;padding:20px 24px;text-align:center;line-height:1.5';
      msg.textContent = `The alliance with the ${this.civName} has been cancelled!`;
      panel.appendChild(msg);
    }, [
      { label: 'Continue', action: () => {
        this.showGreetingAndMenu();
      }},
    ]);
  }

  // ── Dismissal Screens ───────────────────────────────────────────

  showDismissal() {
    const isAllied = this.treaty === 'alliance';
    const dismissText = isAllied ? DISMISSALS.allied : DISMISSALS.hostile;

    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = 'font:italic 15px "Times New Roman",Georgia,serif;color:#e0d8c0;padding:24px 20px;text-align:center;line-height:1.5';
      msg.textContent = `\u201C${dismissText}\u201D`;
      panel.appendChild(msg);
    }, [
      { label: 'Farewell', action: () => {
        this.dismiss();
      }},
    ]);
  }

  // ── Sub-Menus (replace panel content in-place) ──────────────────

  /** @DIPLOMACYMENU option 8: "Have a proposal to make..." */
  showProposalSubMenu() {
    const treaty = this.treaty;

    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = STYLE_MSG;
      msg.textContent = 'What do you propose?';
      panel.appendChild(msg);

      const menu = document.createElement('div');
      menu.style.cssText = 'padding:4px 8px 8px';

      // Treaty proposals
      if (treaty === 'war') {
        menu.appendChild(makeMenuBtn('Propose Ceasefire', () => {
          sfx('POS1');
          this.sendAction({
            type: 'ACTION',
            action: { type: PROPOSE_TREATY, targetCiv: this.targetCiv, treaty: 'ceasefire' },
          });
          this.showAIResponse('ceasefire');
        }));
        menu.appendChild(makeMenuBtn('Propose Peace Treaty', () => {
          sfx('POS1');
          this.sendAction({
            type: 'ACTION',
            action: { type: PROPOSE_TREATY, targetCiv: this.targetCiv, treaty: 'peace' },
          });
          this.showAIResponse('peace');
        }));
      } else if (treaty === 'ceasefire') {
        menu.appendChild(makeMenuBtn('Propose Peace Treaty', () => {
          sfx('POS1');
          this.sendAction({
            type: 'ACTION',
            action: { type: PROPOSE_TREATY, targetCiv: this.targetCiv, treaty: 'peace' },
          });
          this.showAIResponse('peace');
        }));
        menu.appendChild(makeMenuBtn('Propose Alliance', () => {
          sfx('POS1');
          this.sendAction({
            type: 'ACTION',
            action: { type: PROPOSE_TREATY, targetCiv: this.targetCiv, treaty: 'alliance' },
          });
          this.showAIResponse('alliance');
        }));
      } else if (treaty === 'peace') {
        menu.appendChild(makeMenuBtn('Propose Alliance', () => {
          sfx('POS1');
          this.sendAction({
            type: 'ACTION',
            action: { type: PROPOSE_TREATY, targetCiv: this.targetCiv, treaty: 'alliance' },
          });
          this.showAIResponse('alliance');
        }));
      }

      // Exchange knowledge / tech trade (not at war)
      if (treaty !== 'war') {
        menu.appendChild(makeMenuBtn('Exchange Knowledge', () => {
          this.showTechExchangeInline();
        }));
      }

      // Share maps (not at war)
      if (treaty !== 'war') {
        menu.appendChild(makeMenuBtn('Exchange Maps', () => {
          sfx('POS1');
          this.sendAction({
            type: 'ACTION',
            action: { type: SHARE_MAP, targetCiv: this.targetCiv },
          });
          this.showAIResponse('maps');
        }));
      }

      // Declare war (not if already at war)
      if (treaty !== 'war') {
        const warBtn = makeMenuBtn('Declare War!', () => {
          this.showDeclareWarConfirm();
        });
        warBtn.style.color = '#d88';
        menu.appendChild(warBtn);
      }

      panel.appendChild(menu);
    }, [
      { label: 'Back', action: () => {
        this.showGreetingAndMenu();
      }},
    ]);
  }

  /** @FAVORMENU option 2: "Ask to exchange knowledge." */
  showTechExchangeInline() {
    const myTechs = this.state.civTechs?.[this.myCiv];
    const theirTechs = this.state.civTechs?.[this.targetCiv];

    // Find techs we can offer (we have, they don't)
    const canOffer = [];
    if (myTechs) {
      for (const t of myTechs) {
        if (!theirTechs || !theirTechs.has(t)) canOffer.push(t);
      }
    }
    // Find techs we can request (they have, we don't)
    const canRequest = [];
    if (theirTechs) {
      for (const t of theirTechs) {
        if (!myTechs || !myTechs.has(t)) canRequest.push(t);
      }
    }
    canOffer.sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));
    canRequest.sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));

    this.setScreen(`${this.civName} Emissary`, panel => {
      if (canOffer.length === 0 && canRequest.length === 0) {
        const msg = document.createElement('div');
        msg.style.cssText = STYLE_MSG;
        msg.textContent = 'Neither civilization has knowledge the other lacks.';
        panel.appendChild(msg);
      } else {
        const msg = document.createElement('div');
        msg.style.cssText = STYLE_MSG;
        msg.textContent = 'Select a technology to offer in exchange:';
        panel.appendChild(msg);

        const list = document.createElement('div');
        list.style.cssText = 'padding:4px 8px 8px;max-height:200px;overflow-y:auto';

        for (const techId of canOffer) {
          const name = ADVANCE_NAMES[techId] || `Advance ${techId}`;
          list.appendChild(makeMenuBtn(`Offer: ${name}`, () => {
            // After selecting what to offer, pick what to request
            this.showTechExchangeRequest(techId, canRequest);
          }));
        }
        panel.appendChild(list);
      }
    }, [
      { label: 'Back', action: () => { this.showProposalSubMenu(); }},
    ]);
  }

  showTechExchangeRequest(offerTechId, canRequest) {
    const offerName = ADVANCE_NAMES[offerTechId] || `Advance ${offerTechId}`;

    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = STYLE_MSG;
      msg.textContent = `Offering ${offerName}. What do you want in return?`;
      panel.appendChild(msg);

      if (canRequest.length === 0) {
        const noTech = document.createElement('div');
        noTech.style.cssText = 'font:14px "Times New Roman",serif;color:#a09070;text-align:center;padding:8px';
        noTech.textContent = `The ${this.civName} have no technologies you lack.`;
        panel.appendChild(noTech);
      } else {
        const list = document.createElement('div');
        list.style.cssText = 'padding:4px 8px 8px;max-height:200px;overflow-y:auto';
        for (const techId of canRequest) {
          const name = ADVANCE_NAMES[techId] || `Advance ${techId}`;
          list.appendChild(makeMenuBtn(`Request: ${name}`, () => {
            sfx('POS1');
            // Two one-way transactions: give our tech, receive their tech
            this.sendAction({
              type: 'ACTION',
              action: {
                type: EXECUTE_TRADE,
                transaction: { from: this.myCiv, to: this.targetCiv, techs: [offerTechId] },
              },
            });
            this.sendAction({
              type: 'ACTION',
              action: {
                type: EXECUTE_TRADE,
                transaction: { from: this.targetCiv, to: this.myCiv, techs: [techId] },
              },
            });
            this.showAIResponse('techExchange');
          }));
        }
        panel.appendChild(list);
      }
    }, [
      { label: 'Back', action: () => { this.showTechExchangeInline(); }},
    ]);
  }

  /** Declare war confirmation within the session. */
  showDeclareWarConfirm() {
    const treaty = this.treaty;
    let warningText = `Declare war on the ${this.civName}?`;
    if (treaty === 'alliance') {
      warningText = `Break your ALLIANCE and declare war on the ${this.civName}? This will severely damage your reputation!`;
    } else if (treaty === 'peace') {
      warningText = `Break the peace treaty and declare war on the ${this.civName}? This will damage your reputation.`;
    } else if (treaty === 'ceasefire') {
      warningText = `Break the ceasefire and declare war on the ${this.civName}? This will damage your reputation.`;
    }

    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = 'font:15px "Times New Roman",Georgia,serif;color:#d88;padding:20px 24px;text-align:center;line-height:1.5';
      msg.textContent = warningText;
      panel.appendChild(msg);
    }, [
      { label: 'No, reconsider', action: () => {
        this.showGreetingAndMenu();
      }},
      { label: 'Declare War!', action: () => {
        sfx('NEG1');
        this.sendAction({
          type: 'ACTION',
          action: { type: DECLARE_WAR, targetCiv: this.targetCiv },
        });
        showOverlayMessage(`War declared on ${this.civName}!`);
        this.dismiss();
      }},
    ]);
  }

  /** @DIPLOMACYMENU option 5: "Demand tribute for our patience." */
  showDemandTributeInline() {
    const suggestedTribute = calcTributeDemand(this.state, this.myCiv, this.targetCiv, 16);
    const defaultAmount = Math.max(50, suggestedTribute || 50);

    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = STYLE_MSG;
      msg.textContent = `Demand gold tribute from the ${this.civName}:`;
      panel.appendChild(msg);

      const inputRow = document.createElement('div');
      inputRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 16px;justify-content:center';
      const label = document.createElement('span');
      label.textContent = 'Amount:';
      label.style.cssText = 'font:14px "Times New Roman",serif;color:#e0d8c0';
      inputRow.appendChild(label);
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '1';
      input.max = '10000';
      input.value = String(defaultAmount);
      input.style.cssText = 'width:80px;font:14px "Times New Roman",serif;padding:4px 6px;border:2px inset #8b6914;background:#3d2815;color:#f0e8d0';
      inputRow.appendChild(input);
      panel.appendChild(inputRow);

      // Store reference for the button handler
      panel._tributeInput = input;
      setTimeout(() => { input.focus(); input.select(); }, 0);
    }, [
      { label: 'Back', action: () => {
        this.showGreetingAndMenu();
      }},
      { label: 'Demand!', action: () => {
        const input = this.panel._tributeInput;
        const amount = Math.max(1, Math.min(10000, parseInt(input?.value) || defaultAmount));
        sfx('NEG1');
        this.sendAction({
          type: 'ACTION',
          action: { type: DEMAND_TRIBUTE, targetCiv: this.targetCiv, amount },
        });
        this.showAIResponse('tribute');
      }},
    ]);
  }

  /** @DIPLOMACYMENU option 4: "Request a gift from you, our gracious allies." */
  showRequestGiftSubMenu() {
    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = STYLE_MSG;
      msg.textContent = `What gift do you request from the ${this.civName}?`;
      panel.appendChild(msg);

      const menu = document.createElement('div');
      menu.style.cssText = 'padding:4px 8px 8px';

      menu.appendChild(makeMenuBtn('Request Gold', () => {
        this.showRequestGoldInline();
      }));
      menu.appendChild(makeMenuBtn('Request Technology', () => {
        this.showRequestTechInline();
      }));

      panel.appendChild(menu);
    }, [
      { label: 'Back', action: () => {
        this.showGreetingAndMenu();
      }},
    ]);
  }

  showRequestGoldInline() {
    const suggestedAmount = Math.max(50, calcTributeDemand(this.state, this.myCiv, this.targetCiv, 16) || 50);

    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = STYLE_MSG;
      msg.textContent = `Request gold from our allies the ${this.civName}:`;
      panel.appendChild(msg);

      const inputRow = document.createElement('div');
      inputRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 16px;justify-content:center';
      const label = document.createElement('span');
      label.textContent = 'Amount:';
      label.style.cssText = 'font:14px "Times New Roman",serif;color:#e0d8c0';
      inputRow.appendChild(label);
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '1';
      input.max = '10000';
      input.value = String(suggestedAmount);
      input.style.cssText = 'width:80px;font:14px "Times New Roman",serif;padding:4px 6px;border:2px inset #8b6914;background:#3d2815;color:#f0e8d0';
      inputRow.appendChild(input);
      panel.appendChild(inputRow);

      panel._requestGoldInput = input;
      setTimeout(() => { input.focus(); input.select(); }, 0);
    }, [
      { label: 'Back', action: () => {
        this.showRequestGiftSubMenu();
      }},
      { label: 'Request', action: () => {
        const input = this.panel._requestGoldInput;
        const amount = Math.max(1, Math.min(10000, parseInt(input?.value) || suggestedAmount));
        sfx('POS1');
        this.sendAction({
          type: 'ACTION',
          action: { type: DEMAND_TRIBUTE, targetCiv: this.targetCiv, amount },
        });
        this.showAIResponse('requestGold');
      }},
    ]);
  }

  showRequestTechInline() {
    const myTechs = this.state.civTechs?.[this.myCiv];
    const theirTechs = this.state.civTechs?.[this.targetCiv];

    // Find techs they have that we don't
    const requestable = [];
    if (theirTechs) {
      for (const techId of theirTechs) {
        if (!myTechs || !myTechs.has(techId)) {
          requestable.push(techId);
        }
      }
    }
    requestable.sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));

    this.setScreen(`${this.civName} Emissary`, panel => {
      if (requestable.length === 0) {
        const msg = document.createElement('div');
        msg.style.cssText = STYLE_MSG;
        msg.textContent = `The ${this.civName} have no technologies you lack.`;
        panel.appendChild(msg);
      } else {
        const msg = document.createElement('div');
        msg.style.cssText = STYLE_MSG;
        msg.textContent = `Select a technology to request from the ${this.civName}:`;
        panel.appendChild(msg);

        const list = document.createElement('div');
        list.style.cssText = 'padding:4px 8px 8px;max-height:250px;overflow-y:auto';

        for (const techId of requestable) {
          const name = ADVANCE_NAMES[techId] || `Advance ${techId}`;
          const row = document.createElement('div');
          row.style.cssText = 'display:flex;align-items:center;gap:4px';
          row.appendChild(makeMenuBtn(name, () => {
            sfx('POS1');
            this.sendAction({
              type: 'ACTION',
              action: {
                type: EXECUTE_TRADE,
                fromCiv: this.targetCiv,
                toCiv: this.myCiv,
                transaction: { from: this.targetCiv, to: this.myCiv, techs: [techId] },
              },
            });
            this.showAIResponse('requestTech');
          }));
          const infoBtn = document.createElement('button');
          infoBtn.textContent = '?';
          infoBtn.title = 'View in Civilopedia';
          infoBtn.style.cssText = 'font:bold 11px serif;width:18px;height:18px;padding:0;border:1px solid #8b6914;background:#4a3020;cursor:pointer;border-radius:2px;color:#c8b080;flex-shrink:0';
          infoBtn.addEventListener('click', e => { e.stopPropagation(); showCivilopedia('advances', techId); });
          row.appendChild(infoBtn);
          list.appendChild(row);
        }

        panel.appendChild(list);
      }
    }, [
      { label: 'Back', action: () => {
        this.showRequestGiftSubMenu();
      }},
    ]);
  }

  /** @DIPLOMACYMENU option 9: "Wish to offer you a gift..." */
  showGiftSubMenu() {
    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = STYLE_MSG;
      msg.textContent = `What gift would you like to offer the ${this.civName}?`;
      panel.appendChild(msg);

      const menu = document.createElement('div');
      menu.style.cssText = 'padding:4px 8px 8px';

      menu.appendChild(makeMenuBtn('Give Gold', () => {
        this.showGiveGoldInline();
      }));
      menu.appendChild(makeMenuBtn('Give Technology', () => {
        this.showGiveTechInline();
      }));

      panel.appendChild(menu);
    }, [
      { label: 'Back', action: () => {
        this.showGreetingAndMenu();
      }},
    ]);
  }

  showGiveGoldInline() {
    const treasury = this.state.civs?.[this.myCiv]?.treasury || 0;

    if (treasury <= 0) {
      this.setScreen(`${this.civName} Emissary`, panel => {
        const msg = document.createElement('div');
        msg.style.cssText = STYLE_MSG;
        msg.textContent = 'You have no gold to give.';
        panel.appendChild(msg);
      }, [
        { label: 'Back', action: () => { this.showGiftSubMenu(); }},
      ]);
      return;
    }

    // Offer preset amounts: 25%, 50%, 75%, 100% of treasury, rounded to nearest 50
    const presets = [0.25, 0.5, 0.75, 1.0]
      .map(pct => Math.max(50, Math.round(treasury * pct / 50) * 50))
      .filter((v, i, a) => a.indexOf(v) === i); // dedupe

    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = STYLE_MSG;
      msg.textContent = `Give gold to the ${this.civName} (Treasury: ${treasury})`;
      panel.appendChild(msg);

      const menu = document.createElement('div');
      menu.style.cssText = 'padding:4px 8px 8px';

      for (const amount of presets) {
        const attGain = calcGoldToAttitude(amount);
        menu.appendChild(makeMenuBtn(`${amount} gold (attitude +${attGain})`, () => {
          sfx('SELL');
          this.sendAction({
            type: 'ACTION',
            action: {
              type: EXECUTE_TRADE,
              fromCiv: this.myCiv,
              toCiv: this.targetCiv,
              transaction: { from: this.myCiv, to: this.targetCiv, gold: amount },
            },
          });
          this.showGiftConfirmation(`Gave ${amount} gold to the ${this.civName}.`);
        }));
      }

      // Custom amount input
      const customRow = document.createElement('div');
      customRow.style.cssText = 'display:flex;align-items:center;gap:8px;padding:6px 12px;margin-top:4px';
      const label = document.createElement('span');
      label.textContent = 'Custom:';
      label.style.cssText = 'font:14px "Times New Roman",serif;color:#e0d8c0';
      customRow.appendChild(label);
      const input = document.createElement('input');
      input.type = 'number';
      input.min = '1';
      input.max = String(treasury);
      input.value = String(Math.min(100, treasury));
      input.style.cssText = 'width:80px;font:14px "Times New Roman",serif;padding:3px 6px;border:2px inset #8b6914;background:#3d2815;color:#f0e8d0';
      customRow.appendChild(input);
      const sendBtn = document.createElement('button');
      sendBtn.textContent = 'Give';
      sendBtn.className = 'civ2-btn';
      sendBtn.style.cssText = 'font-size:12px;padding:3px 10px';
      sendBtn.addEventListener('click', () => {
        const amt = Math.max(1, Math.min(treasury, parseInt(input.value) || 0));
        sfx('SELL');
        this.sendAction({
          type: 'ACTION',
          action: {
            type: EXECUTE_TRADE,
            fromCiv: this.myCiv,
            toCiv: this.targetCiv,
            transaction: { from: this.myCiv, to: this.targetCiv, gold: amt },
          },
        });
        this.showGiftConfirmation(`Gave ${amt} gold to the ${this.civName}.`);
      });
      customRow.appendChild(sendBtn);
      panel.appendChild(customRow);
    }, [
      { label: 'Back', action: () => { this.showGiftSubMenu(); }},
    ]);
  }

  showGiveTechInline() {
    const myTechs = this.state.civTechs?.[this.myCiv];
    const theirTechs = this.state.civTechs?.[this.targetCiv];

    // Find techs we have that they don't
    const giveableTechs = [];
    if (myTechs) {
      for (const techId of myTechs) {
        if (!theirTechs || !theirTechs.has(techId)) {
          giveableTechs.push(techId);
        }
      }
    }
    giveableTechs.sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));

    this.setScreen(`${this.civName} Emissary`, panel => {
      if (giveableTechs.length === 0) {
        const msg = document.createElement('div');
        msg.style.cssText = STYLE_MSG;
        msg.textContent = `The ${this.civName} already know all your technologies.`;
        panel.appendChild(msg);
      } else {
        const msg = document.createElement('div');
        msg.style.cssText = STYLE_MSG;
        msg.textContent = `Select a technology to give to the ${this.civName}:`;
        panel.appendChild(msg);

        const list = document.createElement('div');
        list.style.cssText = 'padding:4px 8px 8px;max-height:250px;overflow-y:auto';

        for (const techId of giveableTechs) {
          const name = ADVANCE_NAMES[techId] || `Advance ${techId}`;
          const row = document.createElement('div');
          row.style.cssText = 'display:flex;align-items:center;gap:4px';
          row.appendChild(makeMenuBtn(name, () => {
            sfx('POS1');
            this.sendAction({
              type: 'ACTION',
              action: {
                type: EXECUTE_TRADE,
                fromCiv: this.myCiv,
                toCiv: this.targetCiv,
                transaction: { from: this.myCiv, to: this.targetCiv, techs: [techId] },
              },
            });
            this.showGiftConfirmation(`Gave ${name} to the ${this.civName}.`);
          }));
          const infoBtn = document.createElement('button');
          infoBtn.textContent = '?';
          infoBtn.title = 'View in Civilopedia';
          infoBtn.style.cssText = 'font:bold 11px serif;width:18px;height:18px;padding:0;border:1px solid #8b6914;background:#4a3020;cursor:pointer;border-radius:2px;color:#c8b080;flex-shrink:0';
          infoBtn.addEventListener('click', e => { e.stopPropagation(); showCivilopedia('advances', techId); });
          row.appendChild(infoBtn);
          list.appendChild(row);
        }

        panel.appendChild(list);
      }
    }, [
      { label: 'Back', action: () => { this.showGiftSubMenu(); }},
    ]);
  }

  /** Confirmation screen after a gift is given. */
  showGiftConfirmation(text) {
    this.setScreen(`${this.civName} Emissary`, panel => {
      const msg = document.createElement('div');
      msg.style.cssText = 'font:15px "Times New Roman",Georgia,serif;color:#8d8;padding:20px 24px;text-align:center;line-height:1.5';
      msg.textContent = text;
      panel.appendChild(msg);

      // AI thanks (attitude-based)
      const thanks = this.attLevel >= 4
        ? `\u201CYour generosity is most appreciated, wise ${getLeaderTitle(this.state, this.myCiv)} of the ${getTargetName(this.state, this.myCiv)}.\u201D`
        : `\u201CWe accept your tribute.\u201D`;
      const thanksEl = document.createElement('div');
      thanksEl.style.cssText = 'font:italic 14px "Times New Roman",Georgia,serif;color:#e0d8c0;padding:8px 20px;text-align:center;line-height:1.4';
      thanksEl.textContent = thanks;
      panel.appendChild(thanksEl);
    }, [
      { label: 'Continue', action: () => {
        this.showGreetingAndMenu();
      }},
    ]);
  }
}

// ── Main Entry Point ───────────────────────────────────────────────

/**
 * Open the main diplomacy negotiation dialog with a target civ.
 * Follows the real Civ2 multi-screen flow:
 *   1. Emissary arrival (accept/refuse)
 *   2. Greeting + main menu
 *   3. Sub-menus for proposals/gifts/demands
 *   4. AI responses
 *   5. Dismissal
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

  sfx('FANFARE1');

  const session = new DiplomacySession(state, mapBase, myCiv, targetCiv, sendAction);
  session.createContainer();
  session.showEmissaryArrival();
}

// ── Civ Picker (used from the keyboard shortcut / menu) ────────────

/**
 * Show a civ-selection dialog that opens the full negotiation dialog
 * for the chosen civ. This is the entry point from the hamburger menu
 * and keyboard shortcut.
 */
/**
 * Human-to-human async diplomacy menu.
 * Sends proposals/demands via WebSocket. The other player responds
 * asynchronously (no later than end of their next turn).
 */
export function showHumanDiplomacyMenu(state, myCiv, targetCiv, sendAction) {
  const civName = getTargetName(state, targetCiv);
  const treaty = getTreatyStatus(state, myCiv, targetCiv);

  createCiv2Dialog('diplo-human-dialog', `Message to ${civName}`, panel => {
    panel.style.cssText += `;min-width:320px;${THRONE_BG}`;
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = `Send a diplomatic proposal to ${civName}. They will respond by the end of their next turn.`;
    panel.appendChild(msg);

    const menu = document.createElement('div');
    menu.style.cssText = 'padding:8px 8px 4px';

    // Treaty proposals (based on current treaty status)
    if (treaty === 'war') {
      menu.appendChild(makeMenuBtn('Propose Ceasefire', () => {
        sendAction({ type: 'ACTION', action: { type: PROPOSE_TREATY, targetCiv, treaty: 'ceasefire' } });
        document.getElementById('diplo-human-dialog')?.remove();
        showOverlayMessage(`Ceasefire proposal sent to ${civName}`);
      }));
      menu.appendChild(makeMenuBtn('Propose Peace Treaty', () => {
        sendAction({ type: 'ACTION', action: { type: PROPOSE_TREATY, targetCiv, treaty: 'peace' } });
        document.getElementById('diplo-human-dialog')?.remove();
        showOverlayMessage(`Peace proposal sent to ${civName}`);
      }));
    } else if (treaty === 'ceasefire') {
      menu.appendChild(makeMenuBtn('Propose Peace Treaty', () => {
        sendAction({ type: 'ACTION', action: { type: PROPOSE_TREATY, targetCiv, treaty: 'peace' } });
        document.getElementById('diplo-human-dialog')?.remove();
        showOverlayMessage(`Peace proposal sent to ${civName}`);
      }));
      menu.appendChild(makeMenuBtn('Propose Alliance', () => {
        sendAction({ type: 'ACTION', action: { type: PROPOSE_TREATY, targetCiv, treaty: 'alliance' } });
        document.getElementById('diplo-human-dialog')?.remove();
        showOverlayMessage(`Alliance proposal sent to ${civName}`);
      }));
    } else if (treaty === 'peace') {
      menu.appendChild(makeMenuBtn('Propose Alliance', () => {
        sendAction({ type: 'ACTION', action: { type: PROPOSE_TREATY, targetCiv, treaty: 'alliance' } });
        document.getElementById('diplo-human-dialog')?.remove();
        showOverlayMessage(`Alliance proposal sent to ${civName}`);
      }));
    }

    // Share maps (not at war)
    if (treaty !== 'war') {
      menu.appendChild(makeMenuBtn('Exchange Maps', () => {
        sendAction({ type: 'ACTION', action: { type: SHARE_MAP, targetCiv } });
        document.getElementById('diplo-human-dialog')?.remove();
        showOverlayMessage(`Maps exchanged with ${civName}`);
      }));
    }

    // Give gold (not at war)
    if (treaty !== 'war') {
      menu.appendChild(makeMenuBtn('Give Gold', () => {
        document.getElementById('diplo-human-dialog')?.remove();
        const treasury = state.civs?.[myCiv]?.treasury || 0;
        const amount = prompt(`Give how much gold to ${civName}? (Treasury: ${treasury})`, '50');
        if (amount && parseInt(amount) > 0 && parseInt(amount) <= treasury) {
          sendAction({ type: 'ACTION', action: { type: EXECUTE_TRADE, transaction: { from: myCiv, to: targetCiv, gold: parseInt(amount) } } });
          showOverlayMessage(`Gave ${amount} gold to ${civName}`);
        }
      }));
    }

    // Give technology (not at war)
    if (treaty !== 'war') {
      const myTechs = state.civTechs?.[myCiv];
      const theirTechs = state.civTechs?.[targetCiv];
      const canGive = [];
      if (myTechs) {
        for (const t of myTechs) {
          if (!theirTechs || !theirTechs.has(t)) canGive.push(t);
        }
      }
      if (canGive.length > 0) {
        menu.appendChild(makeMenuBtn('Give Technology', () => {
          document.getElementById('diplo-human-dialog')?.remove();
          canGive.sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));
          createCiv2Dialog('diplo-human-tech', `Give Technology to ${civName}`, techPanel => {
            techPanel.style.cssText += `;min-width:300px;max-height:60vh;overflow-y:auto;${THRONE_BG}`;
            for (const techId of canGive) {
              const name = ADVANCE_NAMES[techId] || `Advance ${techId}`;
              techPanel.appendChild(makeMenuBtn(name, () => {
                document.getElementById('diplo-human-tech')?.remove();
                sendAction({ type: 'ACTION', action: { type: EXECUTE_TRADE, transaction: { from: myCiv, to: targetCiv, techs: [techId] } } });
                showOverlayMessage(`Gave ${name} to ${civName}`);
              }));
            }
          }, [{ label: 'Cancel' }]);
        }));
      }
    }

    // Exchange knowledge (not at war)
    if (treaty !== 'war') {
      const myTechs2 = state.civTechs?.[myCiv];
      const theirTechs2 = state.civTechs?.[targetCiv];
      const canOffer = [];
      const canRequest = [];
      if (myTechs2) for (const t of myTechs2) { if (!theirTechs2 || !theirTechs2.has(t)) canOffer.push(t); }
      if (theirTechs2) for (const t of theirTechs2) { if (!myTechs2 || !myTechs2.has(t)) canRequest.push(t); }
      if (canOffer.length > 0 && canRequest.length > 0) {
        menu.appendChild(makeMenuBtn('Exchange Knowledge', () => {
          document.getElementById('diplo-human-dialog')?.remove();
          canOffer.sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));
          canRequest.sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));
          // Step 1: pick tech to offer
          createCiv2Dialog('diplo-human-exchange1', 'Exchange Knowledge — Offer', offerPanel => {
            offerPanel.style.cssText += `;min-width:300px;max-height:60vh;overflow-y:auto;${THRONE_BG}`;
            const hdr = document.createElement('div');
            hdr.style.cssText = STYLE_MSG;
            hdr.textContent = 'Select a technology to offer:';
            offerPanel.appendChild(hdr);
            for (const techId of canOffer) {
              const name = ADVANCE_NAMES[techId] || `Advance ${techId}`;
              offerPanel.appendChild(makeMenuBtn(name, () => {
                document.getElementById('diplo-human-exchange1')?.remove();
                // Step 2: pick tech to request
                createCiv2Dialog('diplo-human-exchange2', 'Exchange Knowledge — Request', reqPanel => {
                  reqPanel.style.cssText += `;min-width:300px;max-height:60vh;overflow-y:auto;${THRONE_BG}`;
                  const hdr2 = document.createElement('div');
                  hdr2.style.cssText = STYLE_MSG;
                  hdr2.textContent = `Offering ${name}. Select what you want in return:`;
                  reqPanel.appendChild(hdr2);
                  for (const reqId of canRequest) {
                    const reqName = ADVANCE_NAMES[reqId] || `Advance ${reqId}`;
                    reqPanel.appendChild(makeMenuBtn(reqName, () => {
                      document.getElementById('diplo-human-exchange2')?.remove();
                      sendAction({ type: 'ACTION', action: { type: EXECUTE_TRADE, transaction: { from: myCiv, to: targetCiv, techs: [techId] } } });
                      sendAction({ type: 'ACTION', action: { type: EXECUTE_TRADE, transaction: { from: targetCiv, to: myCiv, techs: [reqId] } } });
                      showOverlayMessage(`Exchanged ${name} for ${reqName} with ${civName}`);
                    }));
                  }
                }, [{ label: 'Cancel' }]);
              }));
            }
          }, [{ label: 'Cancel' }]);
        }));
      }
    }

    // Demand tribute (always available)
    menu.appendChild(makeMenuBtn('Demand Tribute', () => {
      document.getElementById('diplo-human-dialog')?.remove();
      const amount = prompt(`Demand how much gold from ${civName}?`, '100');
      if (amount && parseInt(amount) > 0) {
        sendAction({ type: 'ACTION', action: { type: DEMAND_TRIBUTE, targetCiv, amount: parseInt(amount) } });
        showOverlayMessage(`Tribute demand of ${amount} gold sent to ${civName}`);
      }
    }));

    // Declare war (not if already at war)
    if (treaty !== 'war') {
      const warBtn = makeMenuBtn('Declare War!', () => {
        document.getElementById('diplo-human-dialog')?.remove();
        sfx('NEG1');
        sendAction({ type: 'ACTION', action: { type: DECLARE_WAR, targetCiv } });
        showOverlayMessage(`War declared on ${civName}!`);
      });
      warBtn.style.color = '#d88';
      menu.appendChild(warBtn);
    }

    panel.appendChild(menu);
  }, [{ label: 'Cancel' }]);
}

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

  const humanMask = state.humanPlayers || 0;

  createCiv2Dialog('diplo-picker-dialog', 'Diplomacy', panel => {
    panel.style.cssText += ';min-width:340px;' + THRONE_BG;
    const msg = document.createElement('div');
    msg.style.cssText = STYLE_MSG;
    msg.textContent = 'Which civilization would you like to contact?';
    panel.appendChild(msg);

    for (const c of targets) {
      const civName = getTargetName(state, c);
      const civColor = CIV_COLORS[c] || '#c8a040';
      const treaty = getTreatyStatus(state, myCiv, c);
      const treatyLabel = treaty.charAt(0).toUpperCase() + treaty.slice(1);
      const isHuman = !!(humanMask & (1 << c));
      const typeLabel = isHuman ? 'Human' : 'AI';

      const btn = document.createElement('button');
      btn.style.cssText = STYLE_ITEM + ';display:flex;align-items:center;justify-content:space-between';
      btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(139,105,20,0.4)'; });
      btn.addEventListener('mouseleave', () => { btn.style.background = 'none'; });

      const nameSpan = document.createElement('span');
      nameSpan.style.cssText = `color:${civColor};font-weight:bold;text-shadow:1px 1px 2px rgba(0,0,0,0.5)`;
      nameSpan.textContent = civName;
      btn.appendChild(nameSpan);

      const infoSpan = document.createElement('span');
      const treatyColor = treaty === 'war' ? '#e55' : '#5e5';
      infoSpan.style.cssText = 'font-size:12px;color:#a09070';
      infoSpan.innerHTML = `<span style="color:${treatyColor}">${treatyLabel}</span> \u2022 ${typeLabel}`;
      btn.appendChild(infoSpan);

      btn.addEventListener('click', () => {
        document.getElementById('diplo-picker-dialog')?.remove();
        if (isHuman) {
          // Human player — show async proposal menu
          showHumanDiplomacyMenu(state, myCiv, c, sendAction);
        } else {
          // AI player — open full throne room dialog
          openDiplomacyDialog(state, S.mpMapBase, myCiv, c, sendAction);
        }
      });

      panel.appendChild(btn);
    }
  }, [{ label: 'Cancel' }]);
}
