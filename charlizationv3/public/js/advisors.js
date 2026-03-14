// ═══════════════════════════════════════════════════════════════════
// advisors.js — Advisor / tech / research / diplomacy dialogs
// Extracted from app.js
// ═══════════════════════════════════════════════════════════════════

import { S } from './state.js';
import { createCiv2Dialog, showOverlayMessage, showConfirmDialog } from './dialogs.js';
import { sfx } from './sound.js';
import { ADVANCE_NAMES, ADVANCE_PREREQS, ADVANCE_ICON, UNIT_NAMES, UNIT_PREREQS, UNIT_OBSOLETE, IMPROVE_NAMES, IMPROVE_PREREQS, IMPROVE_COSTS, IMPROVE_MAINTENANCE, WONDER_NAMES, WONDER_PREREQS, WONDER_OBSOLETE, WONDER_COSTS, GOVERNMENT_NAMES, GOVERNMENT_KEYS, GOVT_TECH_PREREQS, GOVT_MAX_RATE, GOVT_MAX_SCIENCE, UNIT_ATK, UNIT_DEF, UNIT_MOVE_POINTS, UNIT_HP, UNIT_COSTS, UNIT_DOMAIN, TERRAIN_NAMES, TERRAIN_BASE, TERRAIN_TRANSFORM } from '../engine/defs.js';
import { Civ2Renderer } from './renderer.js';
import { getAvailableResearch, calcResearchCost } from '../engine/research.js';
import { calcCityTrade, calcFoodSurplus, calcShieldProduction, getProductionCost } from '../engine/production.js';
import { validateAction } from '../engine/rules.js';
import { REVOLUTION, PROPOSE_TREATY, RESPOND_TREATY, DECLARE_WAR, DEMAND_TRIBUTE, RESPOND_DEMAND, SHARE_MAP, SET_RESEARCH } from '../engine/actions.js';

// Late-bound dependencies (e.g. openCityDialog from app.js)
let _deps = {};
export function registerAdvisorDeps(deps) { _deps = deps; }

// ── Tech tree viewer (F6) ──
export function showTechTree() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  const civTechs = S.mpGameState.civTechs?.[S.mpCivSlot] || new Set();

  // Group advances into eras by counting prerequisites depth
  const eraCache = {};
  function getEra(id) {
    if (eraCache[id] != null) return eraCache[id];
    const [p1, p2] = ADVANCE_PREREQS[id];
    if (p1 < 0 && p2 < 0) return (eraCache[id] = 0);
    let d = 0;
    if (p1 >= 0) d = Math.max(d, getEra(p1) + 1);
    if (p2 >= 0) d = Math.max(d, getEra(p2) + 1);
    return (eraCache[id] = d);
  }

  // Cache era values
  const eras = [];
  for (let i = 0; i < ADVANCE_NAMES.length; i++) {
    const [p1, p2] = ADVANCE_PREREQS[i];
    if (p1 === -2 || p2 === -2) continue; // unresearchable
    eras.push({ id: i, name: ADVANCE_NAMES[i], era: getEra(i) });
  }

  // Group by era
  const eraGroups = {};
  for (const a of eras) {
    if (!eraGroups[a.era]) eraGroups[a.era] = [];
    eraGroups[a.era].push(a);
  }
  const eraNames = ['Ancient', 'Classical', 'Medieval', 'Renaissance', 'Industrial', 'Modern', 'Future'];

  createCiv2Dialog('tech-tree', 'Technology Tree', panel => {
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '320px';

    const sortedEras = Object.keys(eraGroups).map(Number).sort((a, b) => a - b);
    for (const eraNum of sortedEras) {
      const group = eraGroups[eraNum];
      const eraLabel = eraNames[Math.min(eraNum, eraNames.length - 1)] || `Era ${eraNum}`;

      const header = document.createElement('div');
      header.className = 'tech-tree-era';
      header.textContent = eraLabel;
      panel.appendChild(header);

      for (const a of group.sort((x, y) => x.name.localeCompare(y.name))) {
        const row = document.createElement('div');
        row.className = 'tech-tree-row';
        const has = civTechs.has(a.id);
        if (has) row.classList.add('researched');

        const marker = document.createElement('span');
        marker.className = 'tech-tree-marker';
        marker.textContent = has ? '\u2713' : '\u00B7';
        row.appendChild(marker);

        const name = document.createElement('span');
        name.className = 'tech-tree-name';
        name.textContent = a.name;
        row.appendChild(name);

        // Show prereqs on hover
        const [p1, p2] = ADVANCE_PREREQS[a.id];
        const prereqs = [];
        if (p1 >= 0) prereqs.push(ADVANCE_NAMES[p1]);
        if (p2 >= 0) prereqs.push(ADVANCE_NAMES[p2]);
        if (prereqs.length > 0) {
          row.title = `Requires: ${prereqs.join(', ')}`;
        }

        panel.appendChild(row);
      }
    }
  }, [{ label: 'Close' }]);
}

// ── Revolution dialog (Shift+G) ──
export function showRevolutionDialog() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  const civ = S.mpGameState.civs?.[S.mpCivSlot];
  if (!civ) return;
  if (civ.government === 'anarchy') {
    showOverlayMessage('Revolution already in progress');
    return;
  }

  const civTechs = S.mpGameState.civTechs?.[S.mpCivSlot] || new Set();
  const currentGovt = civ.government || 'despotism';

  // Build list of available governments
  const available = GOVERNMENT_KEYS.filter(g => {
    if (g === 'anarchy') return false;
    if (g === currentGovt) return false;
    const prereq = GOVT_TECH_PREREQS[g] ?? -1;
    return prereq < 0 || civTechs.has(prereq);
  });

  if (available.length === 0) {
    showOverlayMessage('No other government forms available');
    return;
  }

  let selectedGovt = available[0];

  createCiv2Dialog('revolution-dialog', 'Revolution!', panel => {
    panel.style.minWidth = '280px';

    const desc = document.createElement('div');
    desc.style.cssText = 'margin-bottom: 10px; font-size: 13px;';
    desc.textContent = `Current: ${currentGovt.charAt(0).toUpperCase() + currentGovt.slice(1)}. Choose new government:`;
    panel.appendChild(desc);

    for (const g of available) {
      const row = document.createElement('label');
      row.style.cssText = 'display: block; padding: 3px 0; cursor: pointer; font-size: 14px;';
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'revolution-govt';
      radio.value = g;
      if (g === selectedGovt) radio.checked = true;
      radio.addEventListener('change', () => { selectedGovt = g; });
      row.appendChild(radio);
      row.append(' ' + g.charAt(0).toUpperCase() + g.slice(1));
      panel.appendChild(row);
    }

    const warn = document.createElement('div');
    warn.style.cssText = 'margin-top: 10px; font-size: 11px; color: #883;';
    warn.textContent = 'Your civilization will enter 1-4 turns of anarchy.';
    panel.appendChild(warn);
  }, [
    { label: 'Cancel' },
    { label: 'Revolt!', action: () => {
      sfx('GUILLOTN');
      S.transport.sendRaw({
        type: 'ACTION',
        action: { type: REVOLUTION, government: selectedGovt },
      });
    }},
  ]);
}

// ── Diplomacy panel ──
export function showDiplomacyPanel() {
  if (!S.mpGameState || S.mpCivSlot == null) return;

  createCiv2Dialog('diplomacy-dialog', 'Foreign Affairs', panel => {
    panel.style.minWidth = '320px';
    for (let c = 1; c < 8; c++) {
      if (c === S.mpCivSlot || !(S.mpGameState.civsAlive & (1 << c))) continue;
      const name = S.mpGameState.civNames?.[c] || `Civ ${c}`;
      const key = S.mpCivSlot < c ? `${S.mpCivSlot}-${c}` : `${c}-${S.mpCivSlot}`;
      const treaty = S.mpGameState.treaties?.[key] || 'war';

      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:4px 0;border-bottom:1px solid #c4a876;font:13px "Times New Roman",serif';

      const label = document.createElement('span');
      label.textContent = `${name}: ${treaty.charAt(0).toUpperCase() + treaty.slice(1)}`;
      label.style.color = treaty === 'war' ? '#a33' : '#3a3';
      row.appendChild(label);

      const btnGroup = document.createElement('span');
      btnGroup.style.cssText = 'display:flex;gap:4px;flex-wrap:wrap';
      if (treaty === 'war') {
        const btn = document.createElement('button');
        btn.textContent = 'Propose Peace';
        btn.className = 'civ2-btn';
        btn.style.cssText = 'font-size:11px;padding:2px 8px';
        btn.onclick = () => {
          S.transport.sendRaw({ type: 'ACTION', action: { type: PROPOSE_TREATY, targetCiv: c, treaty: 'peace' } });
          document.getElementById('diplomacy-dialog')?.remove();
          showOverlayMessage(`Peace proposal sent to ${name}`);
        };
        btnGroup.appendChild(btn);
      } else {
        const warBtn = document.createElement('button');
        warBtn.textContent = 'Declare War';
        warBtn.className = 'civ2-btn';
        warBtn.style.cssText = 'font-size:11px;padding:2px 8px';
        warBtn.onclick = () => {
          S.transport.sendRaw({ type: 'ACTION', action: { type: DECLARE_WAR, targetCiv: c } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        btnGroup.appendChild(warBtn);
        // Share Map (only at peace)
        const mapBtn = document.createElement('button');
        mapBtn.textContent = 'Share Map';
        mapBtn.className = 'civ2-btn';
        mapBtn.style.cssText = 'font-size:11px;padding:2px 8px';
        mapBtn.onclick = () => {
          S.transport.sendRaw({ type: 'ACTION', action: { type: SHARE_MAP, targetCiv: c } });
          document.getElementById('diplomacy-dialog')?.remove();
          showOverlayMessage(`Maps exchanged with ${name}`);
        };
        btnGroup.appendChild(mapBtn);
      }
      // Demand Tribute (always available)
      const demandBtn = document.createElement('button');
      demandBtn.textContent = 'Demand Tribute';
      demandBtn.className = 'civ2-btn';
      demandBtn.style.cssText = 'font-size:11px;padding:2px 8px';
      demandBtn.onclick = () => {
        document.getElementById('diplomacy-dialog')?.remove();
        showTributeDemandInput(c, name);
      };
      btnGroup.appendChild(demandBtn);
      row.appendChild(btnGroup);
      panel.appendChild(row);
    }

    // Show pending proposals TO us
    const proposals = S.mpGameState.treatyProposals || [];
    const pending = proposals.filter((p, i) => p.to === S.mpCivSlot && !p.resolved);
    if (pending.length > 0) {
      const hdr = document.createElement('div');
      hdr.style.cssText = 'margin-top:12px;font-weight:bold;font-size:14px;color:#333';
      hdr.textContent = 'Pending Proposals:';
      panel.appendChild(hdr);
      for (const p of pending) {
        const pi = proposals.indexOf(p);
        const fromName = S.mpGameState.civNames?.[p.from] || `Civ ${p.from}`;
        const pRow = document.createElement('div');
        pRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:4px 0;font:13px "Times New Roman",serif';
        pRow.innerHTML = `<span>${fromName} offers ${p.treaty}</span>`;
        const btns = document.createElement('span');
        const accBtn = document.createElement('button');
        accBtn.textContent = 'Accept';
        accBtn.className = 'civ2-btn';
        accBtn.style.cssText = 'font-size:11px;padding:2px 8px;margin-right:4px';
        accBtn.onclick = () => {
          sfx('POS1');
          S.transport.sendRaw({ type: 'ACTION', action: { type: RESPOND_TREATY, proposalIndex: pi, accept: true } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        const rejBtn = document.createElement('button');
        rejBtn.textContent = 'Reject';
        rejBtn.className = 'civ2-btn';
        rejBtn.style.cssText = 'font-size:11px;padding:2px 8px';
        rejBtn.onclick = () => {
          sfx('NEG1');
          S.transport.sendRaw({ type: 'ACTION', action: { type: RESPOND_TREATY, proposalIndex: pi, accept: false } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        btns.appendChild(accBtn);
        btns.appendChild(rejBtn);
        pRow.appendChild(btns);
        panel.appendChild(pRow);
      }
    }

    // Show pending tribute demands TO us
    const demands = S.mpGameState.tributeDemands || [];
    const pendingDemands = demands.filter(d => d.to === S.mpCivSlot && !d.resolved);
    if (pendingDemands.length > 0) {
      const hdr = document.createElement('div');
      hdr.style.cssText = 'margin-top:12px;font-weight:bold;font-size:14px;color:#333';
      hdr.textContent = 'Tribute Demands:';
      panel.appendChild(hdr);
      for (const d of pendingDemands) {
        const di = demands.indexOf(d);
        const fromName = S.mpGameState.civNames?.[d.from] || `Civ ${d.from}`;
        const dRow = document.createElement('div');
        dRow.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:4px 0;font:13px "Times New Roman",serif';
        dRow.innerHTML = `<span>${fromName} demands ${d.amount} gold</span>`;
        const btns = document.createElement('span');
        const payBtn = document.createElement('button');
        payBtn.textContent = 'Pay';
        payBtn.className = 'civ2-btn';
        payBtn.style.cssText = 'font-size:11px;padding:2px 8px;margin-right:4px';
        payBtn.onclick = () => {
          S.transport.sendRaw({ type: 'ACTION', action: { type: RESPOND_DEMAND, demandIndex: di, accept: true } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        const refBtn = document.createElement('button');
        refBtn.textContent = 'Refuse';
        refBtn.className = 'civ2-btn';
        refBtn.style.cssText = 'font-size:11px;padding:2px 8px';
        refBtn.onclick = () => {
          S.transport.sendRaw({ type: 'ACTION', action: { type: RESPOND_DEMAND, demandIndex: di, accept: false } });
          document.getElementById('diplomacy-dialog')?.remove();
        };
        btns.appendChild(payBtn);
        btns.appendChild(refBtn);
        dRow.appendChild(btns);
        panel.appendChild(dRow);
      }
    }
  }, [{ label: 'Close' }]);
}

/** Prompt for tribute amount to demand. */
export function showTributeDemandInput(targetCiv, targetName) {
  createCiv2Dialog('tribute-dialog', 'Demand Tribute', panel => {
    const msg = document.createElement('div');
    msg.textContent = `How much gold to demand from ${targetName}?`;
    panel.appendChild(msg);
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = '1000';
    input.value = '50';
    input.style.cssText = 'width:80px;margin:8px 0;font:14px "Times New Roman",serif;padding:4px';
    panel.appendChild(input);
  }, [
    { label: 'Demand', action: () => {
      const el = document.querySelector('#tribute-dialog input');
      const amount = parseInt(el?.value) || 50;
      S.transport.sendRaw({ type: 'ACTION', action: { type: DEMAND_TRIBUTE, targetCiv, amount: Math.min(1000, Math.max(1, amount)) } });
      showOverlayMessage(`Tribute demand sent to ${targetName}`);
    }},
    { label: 'Cancel' },
  ]);
}

// ── Research picker ──

// Lazily extract advance category icons and stone tile from ICONS.GIF
export async function _ensureResearchIcons() {
  if (S._researchIconCache) return S._researchIconCache;
  if (!S.files.icons) return null;
  const img = await Civ2Renderer.loadImage(S.files.icons);
  const ctx = Civ2Renderer.imgToCtx(img);
  const CK = [[255, 0, 255, 15], [255, 159, 163, 15]];

  // Extract 20 advance category icons (36x20 each, 4 rows x 5 cols at (343,211))
  // Grid: columns = category (0-4), rows = epoch (0-3)
  const icons = [];
  for (let idx = 0; idx < 20; idx++) {
    const sx = 343 + 37 * (idx % 5);
    const sy = 211 + 21 * Math.floor(idx / 5);
    icons.push(Civ2Renderer.extractSprite(ctx, sx, sy, 36, 20, CK, false));
  }

  // Extract stone tile (64x32 at (199,322)) and convert to data URL for CSS tiling
  const stoneTile = Civ2Renderer.extractSprite(ctx, 199, 322, 64, 32, [], false);
  const stoneDataUrl = stoneTile.toDataURL();

  S._researchIconCache = { icons, stoneDataUrl };
  return S._researchIconCache;
}

export function showResearchPicker(discovered) {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  const available = getAvailableResearch(S.mpGameState, S.mpCivSlot);
  if (available.length === 0) {
    showOverlayMessage('No technologies available to research');
    return;
  }

  available.sort((a, b) => ADVANCE_NAMES[a].localeCompare(ADVANCE_NAMES[b]));

  // Default to current research if it's in the available list, otherwise first in list
  const currentResearch = S.mpGameState.civs?.[S.mpCivSlot]?.techBeingResearched;
  let selected = (currentResearch != null && available.includes(currentResearch))
    ? currentResearch : available[0];

  // Ensure a research target is always set (close/escape sends the selection)
  const commitSelection = () => {
    S.transport.sendRaw({ type: 'ACTION', action: { type: SET_RESEARCH, advanceId: selected } });
  };

  const title = 'What discovery shall our wise men pursue?';

  createCiv2Dialog('research-picker', title, panel => {
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '340px';
    panel.style.background = '#c0c0c0';

    // Show discovery message if a tech was just discovered
    if (discovered != null) {
      const disc = document.createElement('div');
      disc.style.cssText = 'text-align:center;padding:6px 12px 8px;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);border-bottom:1px solid rgba(0,0,0,0.15);margin-bottom:6px';
      disc.textContent = `You have discovered ${ADVANCE_NAMES[discovered]}!`;
      panel.appendChild(disc);
    }

    // Container for tech rows
    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:2px';

    // Load icons asynchronously if available
    _ensureResearchIcons().then(cache => {
      if (!cache) return;

      // Insert icon canvases into rows
      const rows = list.querySelectorAll('.rp-row');
      rows.forEach((row, i) => {
        const advId = parseInt(row.dataset.advId);
        const iconIdx = ADVANCE_ICON[advId] ?? 0;
        const iconCanvas = cache.icons[iconIdx];
        const img = document.createElement('canvas');
        img.width = 36; img.height = 20;
        img.getContext('2d').drawImage(iconCanvas, 0, 0);
        img.style.cssText = 'flex-shrink:0;image-rendering:pixelated';
        // Insert icon before the text span
        const placeholder = row.querySelector('.rp-icon-slot');
        if (placeholder) placeholder.replaceWith(img);
      });
    });

    available.forEach((advId, i) => {
      const row = document.createElement('div');
      row.className = 'rp-row';
      row.dataset.advId = advId;
      row.dataset.selectable = '1';
      row.style.cssText = `display:flex;align-items:center;gap:8px;padding:4px 8px;cursor:pointer;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)`;

      // Placeholder for icon (replaced once icons load)
      const iconSlot = document.createElement('div');
      iconSlot.className = 'rp-icon-slot';
      iconSlot.style.cssText = 'width:36px;height:20px;flex-shrink:0';
      row.appendChild(iconSlot);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = ADVANCE_NAMES[advId];
      row.appendChild(nameSpan);

      // Highlight selected
      if (advId === selected) {
        row.style.background = '#0a246a';
        row.style.color = '#fff';
        row.classList.add('civ2-selected');
      }

      row.addEventListener('click', () => {
        selected = advId;
        // Update highlights
        list.querySelectorAll('.rp-row').forEach(r => {
          const isSel = parseInt(r.dataset.advId) === selected;
          r.style.background = isSel ? '#0a246a' : '';
          r.style.color = isSel ? '#fff' : '#333';
          r.classList.toggle('civ2-selected', isSel);
        });
      });

      row.addEventListener('mouseenter', () => {
        if (parseInt(row.dataset.advId) !== selected) {
          row.style.background = '#0a246a';
          row.style.color = '#fff';
        }
      });
      row.addEventListener('mouseleave', () => {
        const isSel = parseInt(row.dataset.advId) === selected;
        row.style.background = isSel ? '#0a246a' : '';
        row.style.color = isSel ? '#fff' : '#333';
      });

      list.appendChild(row);
    });

    panel.appendChild(list);

    // Scroll initially selected row into view
    const selRow = list.querySelector('.civ2-selected');
    if (selRow) requestAnimationFrame(() => selRow.scrollIntoView({ block: 'nearest' }));
  }, [
    { label: 'Help', action: () => _showGoalDetail(selected, showResearchPicker) },
    { label: 'Goal', action: () => showGoalPicker() },
    { label: 'OK', action: commitSelection },
    { label: 'Cancel' },
  ]);
}

// ═══════════════════════════════════════════════════════════════════
// Tech prerequisite path — BFS from goal back through ADVANCE_PREREQS
// Returns ordered array of advance IDs the civ still needs to reach goalId
// ═══════════════════════════════════════════════════════════════════
export function getPrereqPath(goalId, civTechs) {
  if (civTechs.has(goalId)) return [];
  // Collect all missing prereqs via DFS
  const needed = new Set();
  const visited = new Set();
  function walk(id) {
    if (id < 0 || visited.has(id)) return;
    visited.add(id);
    if (civTechs.has(id)) return; // already known
    const [p1, p2] = ADVANCE_PREREQS[id] || [-1, -1];
    if (p1 === -2 || p2 === -2) return; // unresearchable
    if (p1 >= 0) walk(p1);
    if (p2 >= 0) walk(p2);
    needed.add(id);
  }
  walk(goalId);
  // Topological sort: techs whose prereqs are all met come first
  const sorted = [];
  const remaining = new Set(needed);
  while (remaining.size > 0) {
    let progress = false;
    for (const id of remaining) {
      const [p1, p2] = ADVANCE_PREREQS[id] || [-1, -1];
      const p1ok = p1 < 0 || civTechs.has(p1) || sorted.includes(p1);
      const p2ok = p2 < 0 || civTechs.has(p2) || sorted.includes(p2);
      if (p1ok && p2ok) {
        sorted.push(id);
        remaining.delete(id);
        progress = true;
      }
    }
    if (!progress) { // cycle guard — shouldn't happen with valid data
      for (const id of remaining) sorted.push(id);
      break;
    }
  }
  return sorted;
}

// ═══════════════════════════════════════════════════════════════════
// GOAL PICKER — select a goal tech, show prerequisite path
// ═══════════════════════════════════════════════════════════════════
export function showGoalPicker() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  const civTechs = S.mpGameState.civTechs?.[S.mpCivSlot] || new Set();

  // All techs that are NOT yet discovered and ARE reachable (skip prereq -2)
  const allGoals = [];
  for (let i = 0; i < ADVANCE_NAMES.length; i++) {
    if (civTechs.has(i)) continue;
    const [p1, p2] = ADVANCE_PREREQS[i] || [-1, -1];
    if (p1 === -2 || p2 === -2) continue;
    allGoals.push(i);
  }
  allGoals.sort((a, b) => ADVANCE_NAMES[a].localeCompare(ADVANCE_NAMES[b]));

  if (allGoals.length === 0) {
    showOverlayMessage('No undiscovered technologies remain');
    return;
  }

  let goalSelected = allGoals[0];

  // Type-to-select state
  let searchStr = '';
  let searchTimer = null;

  const selectAdvId = (advId, list, panel) => {
    goalSelected = advId;
    list.querySelectorAll('.gp-row').forEach(r => {
      const isSel = parseInt(r.dataset.advId) === goalSelected;
      r.style.background = isSel ? '#0a246a' : '';
      r.style.color = isSel ? '#fff' : '#333';
      r.classList.toggle('civ2-selected', isSel);
    });
    // Scroll selected row into view
    const selRow = list.querySelector('.civ2-selected');
    if (selRow) selRow.scrollIntoView({ block: 'nearest' });
  };

  const { overlay, dismiss } = createCiv2Dialog('goal-picker', 'Which advance are you trying to discover?', panel => {
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '340px';
    panel.style.background = '#c0c0c0';

    const list = document.createElement('div');
    list.id = 'goal-picker-list';
    list.style.cssText = 'display:flex;flex-direction:column;gap:2px';

    // Load icons asynchronously (same pattern as showResearchPicker)
    _ensureResearchIcons().then(cache => {
      if (!cache) return;
      const rows = list.querySelectorAll('.gp-row');
      rows.forEach(row => {
        const advId = parseInt(row.dataset.advId);
        const iconIdx = ADVANCE_ICON[advId] ?? 0;
        const iconCanvas = cache.icons[iconIdx];
        const img = document.createElement('canvas');
        img.width = 36; img.height = 20;
        img.getContext('2d').drawImage(iconCanvas, 0, 0);
        img.style.cssText = 'flex-shrink:0;image-rendering:pixelated';
        const placeholder = row.querySelector('.gp-icon-slot');
        if (placeholder) placeholder.replaceWith(img);
      });
    });

    allGoals.forEach(advId => {
      const row = document.createElement('div');
      row.className = 'gp-row';
      row.dataset.selectable = '1';
      row.dataset.advId = advId;
      row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 8px;cursor:pointer;font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';

      // Icon placeholder (replaced once icons load)
      const iconSlot = document.createElement('div');
      iconSlot.className = 'gp-icon-slot';
      iconSlot.style.cssText = 'width:36px;height:20px;flex-shrink:0';
      row.appendChild(iconSlot);

      const nameSpan = document.createElement('span');
      nameSpan.textContent = ADVANCE_NAMES[advId];
      row.appendChild(nameSpan);

      if (advId === goalSelected) {
        row.style.background = '#0a246a';
        row.style.color = '#fff';
        row.classList.add('civ2-selected');
      }

      row.addEventListener('click', () => selectAdvId(advId, list, panel));

      list.appendChild(row);
    });

    panel.appendChild(list);
  }, [
    { label: 'Help', action: () => _showGoalDetail(goalSelected, showGoalPicker) },
    { label: 'OK', action: () => _showGoalResearch(goalSelected) },
    { label: 'Cancel', action: () => showResearchPicker() },
  ]);

  // Type-to-select keydown handler
  const typeHandler = e => {
    // Only handle when this dialog is still open
    if (!document.getElementById('goal-picker')) {
      window.removeEventListener('keydown', typeHandler, true);
      return;
    }
    // Only handle single printable characters (letters, digits)
    if (e.key.length !== 1 || e.ctrlKey || e.altKey || e.metaKey) return;

    e.preventDefault();
    e.stopPropagation();

    // Accumulate search string
    searchStr += e.key;
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { searchStr = ''; }, 2000);

    // Find first tech whose name starts with the search string
    const match = allGoals.find(id =>
      ADVANCE_NAMES[id].toLowerCase().startsWith(searchStr.toLowerCase())
    );
    if (match != null) {
      const list = document.getElementById('goal-picker-list');
      if (list) selectAdvId(match, list, null);
    }
  };
  window.addEventListener('keydown', typeHandler, true);
}

/** Show a Civilopedia-style detail dialog for a technology advance. */
function _showGoalDetail(advId, returnTo) {
  const techName = ADVANCE_NAMES[advId] || `Advance ${advId}`;
  const DOMAIN_LABELS = ['Land', 'Sea', 'Air'];

  // ── Build reverse-lookup data ──

  // Prerequisites of this tech
  const [p1, p2] = ADVANCE_PREREQS[advId] || [-1, -1];
  const prereqs = [];
  if (p1 >= 0 && ADVANCE_NAMES[p1]) prereqs.push({ id: p1, name: ADVANCE_NAMES[p1] });
  if (p2 >= 0 && ADVANCE_NAMES[p2]) prereqs.push({ id: p2, name: ADVANCE_NAMES[p2] });

  // Leads to: techs that require this advance
  const leadsTo = [];
  for (let i = 0; i < ADVANCE_PREREQS.length; i++) {
    if (!ADVANCE_NAMES[i]) continue;
    const [a, b] = ADVANCE_PREREQS[i] || [-1, -1];
    if (a === advId || b === advId) leadsTo.push({ id: i, name: ADVANCE_NAMES[i] });
  }

  // Enables: units
  const enabledUnits = [];
  for (let i = 0; i < UNIT_PREREQS.length; i++) {
    if (UNIT_PREREQS[i] === advId && UNIT_NAMES[i]) {
      enabledUnits.push(i);
    }
  }

  // Enables: buildings (1-indexed)
  const enabledBuildings = [];
  for (let id = 1; id < IMPROVE_PREREQS.length; id++) {
    if (IMPROVE_PREREQS[id] === advId && IMPROVE_NAMES[id]) {
      enabledBuildings.push(id);
    }
  }

  // Enables: wonders
  const enabledWonders = [];
  for (let i = 0; i < WONDER_PREREQS.length; i++) {
    if (WONDER_PREREQS[i] === advId && WONDER_NAMES[i]) {
      enabledWonders.push(i);
    }
  }

  // Enables: governments
  const enabledGovts = [];
  for (const [govt, techId] of Object.entries(GOVT_TECH_PREREQS)) {
    if (techId === advId) {
      enabledGovts.push(govt.charAt(0).toUpperCase() + govt.slice(1));
    }
  }

  // Obsoletes: units
  const obsoletedUnits = [];
  for (let i = 0; i < UNIT_OBSOLETE.length; i++) {
    if (UNIT_OBSOLETE[i] === advId && UNIT_NAMES[i]) {
      obsoletedUnits.push(i);
    }
  }

  // Obsoletes: wonders
  const obsoletedWonders = [];
  for (let i = 0; i < WONDER_OBSOLETE.length; i++) {
    if (WONDER_OBSOLETE[i] === advId && WONDER_NAMES[i]) {
      obsoletedWonders.push(i);
    }
  }

  const hasEnables = enabledUnits.length || enabledBuildings.length || enabledWonders.length || enabledGovts.length;
  const hasObsoletes = obsoletedUnits.length || obsoletedWonders.length;

  // ── Styling constants ──
  const FONT = '"Times New Roman", Georgia, serif';
  const SECTION_HEADER_CSS = `font:bold 16px ${FONT};color:#222;margin:10px 0 4px;text-shadow:1px 1px 0 rgba(191,191,191,0.4)`;
  const ITEM_CSS = `font:15px ${FONT};color:#333;padding:2px 0 2px 12px;text-shadow:1px 1px 0 rgba(191,191,191,0.4)`;
  const STAT_CSS = `font:13px ${FONT};color:#555;margin-left:6px`;
  const SEPARATOR_CSS = 'border:none;border-top:1px solid rgba(0,0,0,0.12);margin:8px 0';

  createCiv2Dialog('goal-detail', techName, panel => {
    panel.style.cssText += `;min-width:340px;max-height:70vh;overflow-y:auto;padding:12px 16px;background:#c0c0c0`;

    // ── Tech icon + name header ──
    const header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;gap:10px;padding-bottom:8px;border-bottom:1px solid rgba(0,0,0,0.15);margin-bottom:6px';

    // Icon placeholder (replaced async)
    const iconSlot = document.createElement('div');
    iconSlot.className = 'gd-icon-slot';
    iconSlot.style.cssText = 'width:72px;height:40px;flex-shrink:0;image-rendering:pixelated';
    header.appendChild(iconSlot);

    const titleDiv = document.createElement('div');
    titleDiv.style.cssText = `font:bold 20px ${FONT};color:#222;text-shadow:1px 1px 0 rgba(191,191,191,0.4)`;
    titleDiv.textContent = techName;
    header.appendChild(titleDiv);
    panel.appendChild(header);

    // Load and display tech icon
    _ensureResearchIcons().then(cache => {
      if (!cache) return;
      const iconIdx = ADVANCE_ICON[advId] ?? 0;
      const iconCanvas = cache.icons[iconIdx];
      if (!iconCanvas) return;
      const img = document.createElement('canvas');
      img.width = 72; img.height = 40;
      const ctx = img.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(iconCanvas, 0, 0, 36, 20, 0, 0, 72, 40);
      img.style.cssText = 'flex-shrink:0;image-rendering:pixelated';
      const slot = panel.querySelector('.gd-icon-slot');
      if (slot) slot.replaceWith(img);
    });

    // ── Prerequisites ──
    if (prereqs.length > 0) {
      const sec = document.createElement('div');
      const h = document.createElement('div');
      h.style.cssText = SECTION_HEADER_CSS;
      h.textContent = 'Requires:';
      sec.appendChild(h);
      for (const p of prereqs) {
        const item = document.createElement('div');
        item.style.cssText = ITEM_CSS;
        item.textContent = p.name;
        sec.appendChild(item);
      }
      panel.appendChild(sec);
    } else {
      const sec = document.createElement('div');
      const h = document.createElement('div');
      h.style.cssText = SECTION_HEADER_CSS;
      h.textContent = 'Requires:';
      sec.appendChild(h);
      const item = document.createElement('div');
      item.style.cssText = ITEM_CSS;
      item.textContent = 'No prerequisites';
      sec.appendChild(item);
      panel.appendChild(sec);
    }

    // ── Leads To ──
    if (leadsTo.length > 0) {
      { const hr = document.createElement('hr'); hr.style.cssText = SEPARATOR_CSS; panel.appendChild(hr); }
      const sec = document.createElement('div');
      const h = document.createElement('div');
      h.style.cssText = SECTION_HEADER_CSS;
      h.textContent = 'Leads To:';
      sec.appendChild(h);
      for (const t of leadsTo) {
        const item = document.createElement('div');
        item.style.cssText = ITEM_CSS;
        item.textContent = t.name;
        sec.appendChild(item);
      }
      panel.appendChild(sec);
    }

    // ── Enables ──
    if (hasEnables) {
      { const hr = document.createElement('hr'); hr.style.cssText = SEPARATOR_CSS; panel.appendChild(hr); }
      const sec = document.createElement('div');
      const h = document.createElement('div');
      h.style.cssText = SECTION_HEADER_CSS;
      h.textContent = 'Enables:';
      sec.appendChild(h);

      // Units
      for (const uid of enabledUnits) {
        const row = document.createElement('div');
        row.style.cssText = `${ITEM_CSS};display:flex;align-items:center;gap:8px`;

        // Unit thumbnail via late-bound dep
        if (_deps.renderUnitThumbnail) {
          const mockUnit = { type: uid, owner: S.mpCivSlot ?? 1, hpLost: 0, orders: 'none' };
          const thumb = _deps.renderUnitThumbnail(mockUnit);
          if (thumb) {
            thumb.style.cssText = 'width:64px;height:48px;image-rendering:pixelated;flex-shrink:0';
            row.appendChild(thumb);
          }
        }

        const info = document.createElement('div');
        const nameEl = document.createElement('div');
        nameEl.style.cssText = `font:15px ${FONT};color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)`;
        nameEl.textContent = UNIT_NAMES[uid];
        info.appendChild(nameEl);

        const stats = document.createElement('div');
        stats.style.cssText = STAT_CSS;
        const domain = DOMAIN_LABELS[UNIT_DOMAIN[uid] ?? 0];
        stats.textContent = `ATK ${UNIT_ATK[uid] ?? 0} / DEF ${UNIT_DEF[uid] ?? 0} / Move ${UNIT_MOVE_POINTS[uid] ?? 1} / Cost ${UNIT_COSTS[uid] / 10} (${domain})`;
        info.appendChild(stats);

        row.appendChild(info);
        sec.appendChild(row);
      }

      // Buildings
      for (const bid of enabledBuildings) {
        const item = document.createElement('div');
        item.style.cssText = ITEM_CSS;
        const maint = IMPROVE_MAINTENANCE[bid] ?? 0;
        item.textContent = `${IMPROVE_NAMES[bid]} — Cost ${IMPROVE_COSTS[bid] / 10}, Maintenance ${maint} gold/turn`;
        sec.appendChild(item);
      }

      // Wonders
      for (const wid of enabledWonders) {
        const item = document.createElement('div');
        item.style.cssText = ITEM_CSS;
        item.textContent = `${WONDER_NAMES[wid]} (Wonder) — Cost ${WONDER_COSTS[wid] / 10}`;
        sec.appendChild(item);
      }

      // Governments
      for (const gname of enabledGovts) {
        const item = document.createElement('div');
        item.style.cssText = ITEM_CSS;
        item.textContent = `${gname} (Government)`;
        sec.appendChild(item);
      }

      panel.appendChild(sec);
    }

    // ── Obsoletes ──
    if (hasObsoletes) {
      { const hr = document.createElement('hr'); hr.style.cssText = SEPARATOR_CSS; panel.appendChild(hr); }
      const sec = document.createElement('div');
      const h = document.createElement('div');
      h.style.cssText = SECTION_HEADER_CSS;
      h.textContent = 'Obsoletes:';
      sec.appendChild(h);

      for (const uid of obsoletedUnits) {
        const item = document.createElement('div');
        item.style.cssText = ITEM_CSS;
        item.textContent = `${UNIT_NAMES[uid]} (Unit)`;
        sec.appendChild(item);
      }

      for (const wid of obsoletedWonders) {
        const item = document.createElement('div');
        item.style.cssText = ITEM_CSS;
        item.textContent = `${WONDER_NAMES[wid]} (Wonder)`;
        sec.appendChild(item);
      }

      panel.appendChild(sec);
    }
  }, [
    { label: 'Close', action: returnTo },
  ]);
}

/** Show "Science Advisor" dialog listing researchable techs on the path to a goal. */
function _showGoalResearch(goalId) {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  const civTechs = S.mpGameState.civTechs?.[S.mpCivSlot] || new Set();
  const path = getPrereqPath(goalId, civTechs);
  const goalName = ADVANCE_NAMES[goalId] || `Advance ${goalId}`;

  // Find techs on the path that are currently researchable
  const available = getAvailableResearch(S.mpGameState, S.mpCivSlot);
  const availSet = new Set(available);
  const pathSet = new Set(path);
  const researchable = available.filter(id => pathSet.has(id));
  researchable.sort((a, b) => ADVANCE_NAMES[a].localeCompare(ADVANCE_NAMES[b]));

  createCiv2Dialog('goal-research', 'Science Advisor', panel => {
    panel.style.minWidth = '340px';
    panel.style.background = '#c0c0c0';
    panel.style.padding = '12px 16px';

    const msg = document.createElement('div');
    msg.style.cssText = 'font:18px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);text-align:center;padding:8px 0';

    if (researchable.length === 0) {
      msg.textContent = `No discoveries are available that lead to ${goalName}.`;
    } else {
      const names = researchable.map(id => ADVANCE_NAMES[id]);
      const joined = names.length === 1
        ? names[0]
        : names.slice(0, -1).join(', ') + ' or ' + names[names.length - 1];
      msg.textContent = `Then we should research ${joined}.`;
    }
    panel.appendChild(msg);
  }, [
    { label: 'OK', action: () => showResearchPicker() },
  ]);
}

export function showGoalPath(goalId) {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  const civTechs = S.mpGameState.civTechs?.[S.mpCivSlot] || new Set();
  const path = getPrereqPath(goalId, civTechs);

  if (path.length === 0) {
    showOverlayMessage('You already have all prerequisites!');
    showResearchPicker();
    return;
  }

  createCiv2Dialog('goal-path', `Path to ${ADVANCE_NAMES[goalId]}`, panel => {
    panel.style.maxHeight = '60vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '340px';
    panel.style.background = '#c0c0c0';

    const intro = document.createElement('div');
    intro.style.cssText = 'text-align:center;padding:6px 12px 8px;font:16px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);border-bottom:1px solid rgba(0,0,0,0.15);margin-bottom:6px';
    intro.textContent = `${path.length} advance${path.length > 1 ? 's' : ''} needed:`;
    panel.appendChild(intro);

    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:2px';

    path.forEach((advId, i) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 8px;font:16px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';

      const num = document.createElement('span');
      num.style.cssText = 'min-width:24px;text-align:right;font-weight:bold;color:#555';
      num.textContent = `${i + 1}.`;
      row.appendChild(num);

      const name = document.createElement('span');
      name.textContent = ADVANCE_NAMES[advId];
      // Highlight the goal tech
      if (advId === goalId) name.style.fontWeight = 'bold';
      row.appendChild(name);

      // Show prereqs in parentheses
      const [p1, p2] = ADVANCE_PREREQS[advId] || [-1, -1];
      const prereqNames = [];
      if (p1 >= 0) prereqNames.push(ADVANCE_NAMES[p1]);
      if (p2 >= 0) prereqNames.push(ADVANCE_NAMES[p2]);
      if (prereqNames.length > 0) {
        const pSpan = document.createElement('span');
        pSpan.style.cssText = 'margin-left:auto;font-size:12px;color:#666';
        pSpan.textContent = `(${prereqNames.join(', ')})`;
        row.appendChild(pSpan);
      }

      list.appendChild(row);
    });

    panel.appendChild(list);
  }, [
    { label: 'Back', action: () => showGoalPicker() },
    { label: 'Research', action: () => {
      // Set research to the first tech in the path
      S.transport.sendRaw({ type: 'ACTION', action: { type: SET_RESEARCH, advanceId: path[0] } });
    }},
  ]);
}

// ═══════════════════════════════════════════════════════════════════
// TECH TREE DIALOG — full tech tree with clickable entries
// ═══════════════════════════════════════════════════════════════════
export function showTechAdvisor() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  const civTechs = S.mpGameState.civTechs?.[S.mpCivSlot] || new Set();

  // Build reverse lookup: tech → what it enables
  const techEnablesUnits = {};
  const techEnablesBuildings = {};
  const techEnablesWonders = {};
  const techEnablesGovts = {};
  const techObsoletesUnits = {};
  const techObsoletesWonders = {};

  for (let i = 0; i < UNIT_PREREQS.length; i++) {
    const t = UNIT_PREREQS[i];
    if (t >= 0) { (techEnablesUnits[t] = techEnablesUnits[t] || []).push(i); }
  }
  for (let i = 0; i < IMPROVE_PREREQS.length; i++) {
    const t = IMPROVE_PREREQS[i];
    if (t >= 0) { (techEnablesBuildings[t] = techEnablesBuildings[t] || []).push(i); }
  }
  for (let i = 0; i < WONDER_PREREQS.length; i++) {
    const t = WONDER_PREREQS[i];
    if (t >= 0) { (techEnablesWonders[t] = techEnablesWonders[t] || []).push(i); }
  }
  for (const [govt, techId] of Object.entries(GOVT_TECH_PREREQS)) {
    if (techId >= 0) { (techEnablesGovts[techId] = techEnablesGovts[techId] || []).push(govt); }
  }
  for (let i = 0; i < (UNIT_OBSOLETE?.length || 0); i++) {
    const t = UNIT_OBSOLETE[i];
    if (t >= 0) { (techObsoletesUnits[t] = techObsoletesUnits[t] || []).push(i); }
  }
  for (let i = 0; i < (WONDER_OBSOLETE?.length || 0); i++) {
    const t = WONDER_OBSOLETE[i];
    if (t >= 0) { (techObsoletesWonders[t] = techObsoletesWonders[t] || []).push(i); }
  }

  // Sort techs alphabetically
  const allTechs = [];
  for (let i = 0; i < ADVANCE_NAMES.length; i++) {
    const [p1, p2] = ADVANCE_PREREQS[i] || [-1, -1];
    if (p1 === -2 && p2 === -2) continue; // skip unresearchable
    allTechs.push(i);
  }
  allTechs.sort((a, b) => ADVANCE_NAMES[a].localeCompare(ADVANCE_NAMES[b]));

  createCiv2Dialog('tech-tree', 'Technology Advisor', panel => {
    panel.style.maxHeight = '70vh';
    panel.style.overflowY = 'auto';
    panel.style.minWidth = '420px';
    panel.style.maxWidth = '600px';
    panel.style.background = '#c0c0c0';

    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:1px';

    allTechs.forEach(advId => {
      const known = civTechs.has(advId);
      const row = document.createElement('div');
      row.dataset.selectable = '1';
      row.dataset.advId = advId;
      const origColor = known ? '#1a5c1a' : '#333';
      row.style.cssText = `padding:5px 10px;cursor:pointer;font:15px "Times New Roman",Georgia,serif;color:${origColor};text-shadow:1px 1px 0 rgba(191,191,191,0.4)`;

      const nameSpan = document.createElement('span');
      nameSpan.style.fontWeight = 'bold';
      nameSpan.textContent = ADVANCE_NAMES[advId];
      if (known) nameSpan.textContent += ' \u2713';
      row.appendChild(nameSpan);

      row.addEventListener('click', () => showTechDetail(advId, civTechs, techEnablesUnits, techEnablesBuildings, techEnablesWonders, techEnablesGovts, techObsoletesUnits, techObsoletesWonders));
      row.addEventListener('mouseenter', () => { row.style.background = '#0a246a'; row.style.color = '#fff'; });
      row.addEventListener('mouseleave', () => { row.style.background = ''; row.style.color = origColor; });

      list.appendChild(row);
    });

    panel.appendChild(list);
  }, [
    { label: 'OK' },
  ]);
}

export function showTechDetail(advId, civTechs, techEnablesUnits, techEnablesBuildings, techEnablesWonders, techEnablesGovts, techObsoletesUnits, techObsoletesWonders) {
  const known = civTechs.has(advId);
  const [p1, p2] = ADVANCE_PREREQS[advId] || [-1, -1];

  createCiv2Dialog('tech-detail', ADVANCE_NAMES[advId], panel => {
    panel.style.minWidth = '360px';
    panel.style.maxWidth = '500px';
    panel.style.background = '#c0c0c0';

    const style = 'font:15px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);padding:3px 10px';

    // Status
    const status = document.createElement('div');
    status.style.cssText = style + ';font-weight:bold;text-align:center;padding-bottom:6px;border-bottom:1px solid rgba(0,0,0,0.15);margin-bottom:6px';
    status.textContent = known ? 'Discovered' : 'Not yet discovered';
    status.style.color = known ? '#1a5c1a' : '#8b0000';
    panel.appendChild(status);

    // Prerequisites
    if (p1 >= 0 || p2 >= 0) {
      const sec = document.createElement('div');
      sec.style.cssText = style;
      const header = document.createElement('div');
      header.style.cssText = 'font-weight:bold;margin-bottom:2px';
      header.textContent = 'Requires:';
      sec.appendChild(header);
      if (p1 >= 0) appendTechLine(sec, p1, civTechs);
      if (p2 >= 0) appendTechLine(sec, p2, civTechs);
      panel.appendChild(sec);
    } else {
      const sec = document.createElement('div');
      sec.style.cssText = style + ';font-style:italic';
      sec.textContent = 'No prerequisites (starting technology)';
      panel.appendChild(sec);
    }

    // Leads to
    const leadsTo = [];
    for (let i = 0; i < ADVANCE_PREREQS.length; i++) {
      const [a, b] = ADVANCE_PREREQS[i] || [-1, -1];
      if (a === advId || b === advId) leadsTo.push(i);
    }
    if (leadsTo.length > 0) {
      const sec = document.createElement('div');
      sec.style.cssText = style + ';margin-top:6px';
      const header = document.createElement('div');
      header.style.cssText = 'font-weight:bold;margin-bottom:2px';
      header.textContent = 'Leads to:';
      sec.appendChild(header);
      leadsTo.sort((a, b) => ADVANCE_NAMES[a].localeCompare(ADVANCE_NAMES[b]));
      for (const tid of leadsTo) appendTechLine(sec, tid, civTechs);
      panel.appendChild(sec);
    }

    // Enables section
    const enables = [];
    const units = techEnablesUnits[advId] || [];
    const buildings = techEnablesBuildings[advId] || [];
    const wonders = techEnablesWonders[advId] || [];
    const govts = techEnablesGovts[advId] || [];

    if (units.length > 0) enables.push({ header: 'Units', items: units.map(i => UNIT_NAMES[i]) });
    if (buildings.length > 0) enables.push({ header: 'Buildings', items: buildings.map(i => IMPROVE_NAMES[i]).filter(Boolean) });
    if (wonders.length > 0) enables.push({ header: 'Wonders', items: wonders.map(i => WONDER_NAMES[i]) });
    if (govts.length > 0) enables.push({ header: 'Governments', items: govts.map(g => g.charAt(0).toUpperCase() + g.slice(1)) });

    if (enables.length > 0) {
      const sec = document.createElement('div');
      sec.style.cssText = style + ';margin-top:6px';
      const header = document.createElement('div');
      header.style.cssText = 'font-weight:bold;margin-bottom:2px';
      header.textContent = 'Enables:';
      sec.appendChild(header);
      for (const group of enables) {
        const line = document.createElement('div');
        line.style.cssText = 'padding-left:12px;margin-bottom:1px';
        line.innerHTML = `<span style="color:#555;font-size:13px">${group.header}:</span> ${group.items.join(', ')}`;
        sec.appendChild(line);
      }
      panel.appendChild(sec);
    }

    // Obsoletes section
    const obsoletes = [];
    const obsUnits = techObsoletesUnits[advId] || [];
    const obsWonders = techObsoletesWonders[advId] || [];
    if (obsUnits.length > 0) obsoletes.push({ header: 'Obsoletes Units', items: obsUnits.map(i => UNIT_NAMES[i]) });
    if (obsWonders.length > 0) obsoletes.push({ header: 'Obsoletes Wonders', items: obsWonders.map(i => WONDER_NAMES[i]) });

    if (obsoletes.length > 0) {
      const sec = document.createElement('div');
      sec.style.cssText = style + ';margin-top:6px';
      for (const group of obsoletes) {
        const line = document.createElement('div');
        line.style.cssText = 'padding-left:0;margin-bottom:1px';
        line.innerHTML = `<span style="font-weight:bold;color:#8b0000">${group.header}:</span> ${group.items.join(', ')}`;
        sec.appendChild(line);
      }
      panel.appendChild(sec);
    }

    // Path to this tech (if not known)
    if (!known) {
      const path = getPrereqPath(advId, civTechs);
      if (path.length > 0) {
        const sec = document.createElement('div');
        sec.style.cssText = style + ';margin-top:8px;padding-top:6px;border-top:1px solid rgba(0,0,0,0.15)';
        const header = document.createElement('div');
        header.style.cssText = 'font-weight:bold;margin-bottom:2px';
        header.textContent = `Research path (${path.length} step${path.length > 1 ? 's' : ''}):`;
        sec.appendChild(header);
        path.forEach((tid, i) => {
          const line = document.createElement('div');
          line.style.cssText = 'padding-left:12px;margin-bottom:1px';
          line.textContent = `${i + 1}. ${ADVANCE_NAMES[tid]}`;
          if (tid === advId) line.style.fontWeight = 'bold';
          sec.appendChild(line);
        });
        panel.appendChild(sec);
      }
    }
  }, [
    { label: 'Back', action: () => showTechAdvisor() },
    { label: 'OK' },
  ]);
}

export function appendTechLine(container, techId, civTechs) {
  const line = document.createElement('div');
  line.style.cssText = 'padding-left:12px;margin-bottom:1px';
  const known = civTechs.has(techId);
  line.textContent = ADVANCE_NAMES[techId] + (known ? ' \u2713' : '');
  line.style.color = known ? '#1a5c1a' : '#333';
  container.appendChild(line);
}

export function showMapSizePicker() {
  const MIN_DIM = 20;
  const MAX_DIM = 300;
  const presets = [
    { label: 'Small (40 \u00D7 50)', w: 40, h: 50 },
    { label: 'Medium (50 \u00D7 80)', w: 50, h: 80 },
    { label: 'Large (75 \u00D7 120)', w: 75, h: 120 },
  ];
  let selected = 1; // default: Medium
  let customW = 50, customH = 80;
  let okBtn = null;

  function validateCustom() {
    const wOk = customW >= MIN_DIM && customW <= MAX_DIM;
    const hOk = customH >= MIN_DIM && customH <= MAX_DIM;
    if (wInput) wInput.style.color = wOk ? '' : '#c00';
    if (hInput) hInput.style.color = hOk ? '' : '#c00';
    if (errorMsg) {
      if (selected === -1 && (!wOk || !hOk)) {
        errorMsg.textContent = `Minimum ${MIN_DIM} \u00D7 ${MIN_DIM}, maximum ${MAX_DIM} \u00D7 ${MAX_DIM}`;
        errorMsg.style.display = '';
      } else {
        errorMsg.style.display = 'none';
      }
    }
    if (okBtn) okBtn.disabled = (selected === -1 && (!wOk || !hOk));
  }

  let wInput, hInput, errorMsg;

  createCiv2Dialog('mapsize-dialog', 'Select Map Size', panel => {
    panel.style.minWidth = '280px';

    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:2px;margin-bottom:8px';

    const rows = [];
    presets.forEach((p, i) => {
      const row = document.createElement('div');
      row.dataset.selectable = '1';
      row.style.cssText = 'padding:6px 12px;cursor:pointer;font:17px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4)';
      row.textContent = p.label;
      if (i === selected) {
        row.style.background = '#0a246a';
        row.style.color = '#fff';
        row.classList.add('civ2-selected');
      }
      row.addEventListener('click', () => {
        selected = i;
        rows.forEach((r, j) => {
          const isSel = j === selected;
          r.style.background = isSel ? '#0a246a' : '';
          r.style.color = isSel ? '#fff' : '#333';
          r.classList.toggle('civ2-selected', isSel);
        });
        customRow.style.background = '';
        customRow.style.color = '#333';
        customRow.classList.remove('civ2-selected');
        validateCustom();
      });
      row.addEventListener('mouseenter', () => { if (selected !== i) { row.style.background = '#0a246a'; row.style.color = '#fff'; } });
      row.addEventListener('mouseleave', () => { row.style.background = selected === i ? '#0a246a' : ''; row.style.color = selected === i ? '#fff' : '#333'; });
      list.appendChild(row);
      rows.push(row);
    });

    // Custom size row
    const customRow = document.createElement('div');
    customRow.dataset.selectable = '1';
    customRow.style.cssText = 'padding:6px 12px;cursor:pointer;font:17px "Times New Roman",Georgia,serif;color:#333;text-shadow:1px 1px 0 rgba(191,191,191,0.4);display:flex;align-items:center;gap:6px';
    const customLabel = document.createElement('span');
    customLabel.textContent = 'Custom:';
    wInput = document.createElement('input');
    wInput.type = 'number'; wInput.min = String(MIN_DIM); wInput.max = String(MAX_DIM); wInput.value = customW;
    wInput.style.cssText = 'width:50px;font:14px "Times New Roman",serif;padding:2px 4px;text-align:center';
    const xLabel = document.createElement('span');
    xLabel.textContent = '\u00D7';
    hInput = document.createElement('input');
    hInput.type = 'number'; hInput.min = String(MIN_DIM); hInput.max = String(MAX_DIM); hInput.value = customH;
    hInput.style.cssText = 'width:50px;font:14px "Times New Roman",serif;padding:2px 4px;text-align:center';
    customRow.appendChild(customLabel);
    customRow.appendChild(wInput);
    customRow.appendChild(xLabel);
    customRow.appendChild(hInput);

    const selectCustom = () => {
      selected = -1;
      rows.forEach(r => { r.style.background = ''; r.style.color = '#333'; r.classList.remove('civ2-selected'); });
      customRow.style.background = '#0a246a';
      customRow.style.color = '#fff';
      customRow.classList.add('civ2-selected');
      validateCustom();
    };
    customRow.addEventListener('click', selectCustom);
    wInput.addEventListener('focus', selectCustom);
    hInput.addEventListener('focus', selectCustom);
    wInput.addEventListener('input', () => { customW = parseInt(wInput.value) || 0; validateCustom(); });
    hInput.addEventListener('input', () => { customH = parseInt(hInput.value) || 0; validateCustom(); });

    list.appendChild(customRow);
    rows.push(customRow);

    // Error message
    errorMsg = document.createElement('div');
    errorMsg.style.cssText = 'color:#c00;font:13px "Times New Roman",serif;text-align:center;padding:2px 0;display:none';
    list.appendChild(errorMsg);

    panel.appendChild(list);
  }, [
    { label: 'Cancel' },
    { label: 'OK', action: () => {
      let mapSize;
      if (selected >= 0) {
        mapSize = `${presets[selected].w}x${presets[selected].h}`;
      } else {
        if (customW < MIN_DIM || customH < MIN_DIM || customW > MAX_DIM || customH > MAX_DIM) return;
        mapSize = `${customW}x${customH}`;
      }
      S.transport.sendRaw({ type: 'RESTART_GAME', mapSize });
    }},
  ]);

  // Grab OK button ref for disabling
  const btns = document.querySelectorAll('#mapsize-dialog .civ2-btn');
  okBtn = btns[btns.length - 1];
}

export function showCivpedia(initialTab) {
  if (document.getElementById('civpedia-dialog')) return;

  const tabs = [
    { id: 'units', label: 'Units' },
    { id: 'buildings', label: 'Buildings' },
    { id: 'wonders', label: 'Wonders' },
    { id: 'advances', label: 'Advances' },
    { id: 'terrain', label: 'Terrain' },
    { id: 'govts', label: 'Governments' },
  ];

  createCiv2Dialog('civpedia-dialog', 'Civilopedia', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:380px';

    // Tab bar
    const tabBar = document.createElement('div');
    tabBar.className = 'civpedia-tabs';
    tabs.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'civpedia-tab' + (t.id === (initialTab || 'units') ? ' active' : '');
      btn.textContent = t.label;
      btn.dataset.tab = t.id;
      btn.addEventListener('click', () => {
        tabBar.querySelectorAll('.civpedia-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panel.querySelectorAll('.civpedia-page').forEach(p => p.classList.remove('active'));
        panel.querySelector(`[data-page="${t.id}"]`).classList.add('active');
      });
      tabBar.appendChild(btn);
    });
    panel.appendChild(tabBar);

    const content = document.createElement('div');
    content.style.cssText = 'overflow-y:auto;flex:1';
    panel.appendChild(content);

    // Build pages
    tabs.forEach(t => {
      const page = document.createElement('div');
      page.className = 'civpedia-page' + (t.id === (initialTab || 'units') ? ' active' : '');
      page.dataset.page = t.id;

      if (t.id === 'units') {
        UNIT_NAMES.forEach((name, i) => {
          if (!name) return;
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Attack</span><span class="civpedia-stat-value">${UNIT_ATK[i] ?? 0}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Defense</span><span class="civpedia-stat-value">${UNIT_DEF[i] ?? 0}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Moves</span><span class="civpedia-stat-value">${UNIT_MOVE_POINTS[i] ?? 1}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">HP</span><span class="civpedia-stat-value">${UNIT_HP[i] ?? 10}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Cost</span><span class="civpedia-stat-value">${UNIT_COSTS[i] / 10}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Domain</span><span class="civpedia-stat-value">${['Land','Sea','Air'][UNIT_DOMAIN[i] ?? 0]}</span></div>`;
          page.appendChild(entry);
        });
      } else if (t.id === 'buildings') {
        for (let id = 1; id <= 38; id++) {
          const name = IMPROVE_NAMES[id];
          if (!name) continue;
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Cost</span><span class="civpedia-stat-value">${IMPROVE_COSTS[id] / 10}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Maintenance</span><span class="civpedia-stat-value">${IMPROVE_MAINTENANCE[id]} gold/turn</span></div>`;
          page.appendChild(entry);
        }
      } else if (t.id === 'wonders') {
        WONDER_NAMES.forEach((name, i) => {
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Cost</span><span class="civpedia-stat-value">${WONDER_COSTS[i] / 10}</span></div>`;
          page.appendChild(entry);
        });
      } else if (t.id === 'advances') {
        ADVANCE_NAMES.forEach((name, i) => {
          if (!name) return;
          const [p1, p2] = ADVANCE_PREREQS[i] || [-1, -1];
          const prereqs = [];
          if (p1 >= 0 && ADVANCE_NAMES[p1]) prereqs.push(ADVANCE_NAMES[p1]);
          if (p2 >= 0 && ADVANCE_NAMES[p2]) prereqs.push(ADVANCE_NAMES[p2]);
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            (prereqs.length ? `<div class="civpedia-stat"><span class="civpedia-stat-label">Requires</span><span class="civpedia-stat-value">${prereqs.join(', ')}</span></div>` : '');
          page.appendChild(entry);
        });
      } else if (t.id === 'terrain') {
        TERRAIN_NAMES.forEach((name, i) => {
          const base = TERRAIN_BASE[i];
          if (!base) return;
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Food</span><span class="civpedia-stat-value">${base[0]}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Shields</span><span class="civpedia-stat-value">${base[1]}</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Trade</span><span class="civpedia-stat-value">${base[2]}</span></div>` +
            (TERRAIN_TRANSFORM[i] >= 0 ? `<div class="civpedia-stat"><span class="civpedia-stat-label">Transforms to</span><span class="civpedia-stat-value">${TERRAIN_NAMES[TERRAIN_TRANSFORM[i]]}</span></div>` : '');
          page.appendChild(entry);
        });
      } else if (t.id === 'govts') {
        GOVERNMENT_NAMES.forEach((name, i) => {
          const entry = document.createElement('div');
          entry.className = 'civpedia-entry';
          entry.innerHTML = `<strong>${name}</strong>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Max Rate</span><span class="civpedia-stat-value">${(GOVT_MAX_RATE[name.toLowerCase()] ?? 10) * 10}%</span></div>` +
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Max Science</span><span class="civpedia-stat-value">${(GOVT_MAX_SCIENCE[name.toLowerCase()] ?? 10) * 10}%</span></div>`;
          page.appendChild(entry);
        });
      }

      content.appendChild(page);
    });
  });
}

// ═══════════════════════════════════════════════════════════════════
// DEMOGRAPHICS — population, GNP, military, land area
// ═══════════════════════════════════════════════════════════════════
export function showDemographics() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  if (document.getElementById('demographics-dialog')) return;

  const gs = S.mpGameState;
  const civSlot = S.mpCivSlot;

  // Population: sum of city sizes × base (each pop = ~10,000)
  const myCities = gs.cities.filter(c => c.owner === civSlot && c.size > 0);
  let pop = 0;
  for (const c of myCities) pop += c.size * 10000;

  // GNP: sum of trade across cities
  let gnp = 0;
  if (S.mpMapBase) {
    for (const c of myCities) {
      const tradeData = calcCityTrade(c, gs, S.mpMapBase);
      if (tradeData) gnp += tradeData.totalTrade || 0;
    }
  }

  // Military: count live military units
  const myUnits = gs.units.filter(u => u.owner === civSlot && u.gx >= 0);
  const militaryUnits = myUnits.filter(u => (UNIT_ATK[u.type] || 0) > 0 || (UNIT_DEF[u.type] || 0) > 0);
  let milStrength = 0;
  for (const u of militaryUnits) milStrength += (UNIT_ATK[u.type] || 0) + (UNIT_DEF[u.type] || 0);

  // Land area: count explored tiles owned
  let landArea = 0;
  if (S.mpMapBase?.tileData) {
    for (const tile of S.mpMapBase.tileData) {
      if (tile && tile.tileOwnership === civSlot) landArea++;
    }
  }

  // Treasury
  const treasury = gs.civs?.[civSlot]?.treasury || 0;

  createCiv2Dialog('demographics-dialog', 'Demographics', panel => {
    panel.innerHTML = `<table class="demo-table">
      <tr><th>Category</th><th>Value</th></tr>
      <tr><td>Population</td><td>${pop.toLocaleString()}</td></tr>
      <tr><td>Cities</td><td>${myCities.length}</td></tr>
      <tr><td>GNP (trade)</td><td>${gnp}</td></tr>
      <tr><td>Treasury</td><td>${treasury} gold</td></tr>
      <tr><td>Military Units</td><td>${militaryUnits.length}</td></tr>
      <tr><td>Military Strength</td><td>${milStrength}</td></tr>
      <tr><td>Total Units</td><td>${myUnits.length}</td></tr>
      <tr><td>Land Area</td><td>${landArea} tiles</td></tr>
    </table>`;
  });
}

// ═══════════════════════════════════════════════════════════════════
// CITY LIST (F4) — sortable table of all your cities
// ═══════════════════════════════════════════════════════════════════
export function showCityList() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  if (document.getElementById('citylist-dialog')) return;

  const gs = S.mpGameState;
  const civSlot = S.mpCivSlot;
  const myCities = [];
  for (let ci = 0; ci < gs.cities.length; ci++) {
    const c = gs.cities[ci];
    if (c.owner === civSlot && c.size > 0) myCities.push({ city: c, index: ci });
  }

  if (myCities.length === 0) {
    showOverlayMessage('No cities');
    return;
  }

  // Compute city data
  const rows = myCities.map(({ city, index }) => {
    let foodSurplus = 0, shieldProd = 0, trade = 0;
    if (S.mpMapBase) {
      const fs = calcFoodSurplus(city, index, gs, S.mpMapBase, gs.units);
      foodSurplus = fs?.surplus ?? 0;
      const sp = calcShieldProduction(city, index, gs, S.mpMapBase, gs.units);
      shieldProd = sp?.netShields ?? 0;
      const td = calcCityTrade(city, index, gs, S.mpMapBase);
      trade = td?.netTrade ?? 0;
    }
    const buildingCount = city.buildings ? (city.buildings.size || 0) : 0;
    return { city, index, name: city.name, size: city.size, foodSurplus, shieldProd, trade, buildingCount };
  });

  let sortCol = 'name';
  let sortAsc = true;

  const { overlay, dismiss } = createCiv2Dialog('citylist-dialog', 'City Advisor', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:420px';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow-y:auto;flex:1';
    panel.appendChild(wrapper);

    function renderTable() {
      const cols = [
        { key: 'name', label: 'City' },
        { key: 'size', label: 'Size', numeric: true },
        { key: 'foodSurplus', label: 'Food', numeric: true },
        { key: 'shieldProd', label: 'Shields', numeric: true },
        { key: 'trade', label: 'Trade', numeric: true },
        { key: 'buildingCount', label: 'Buildings', numeric: true },
      ];

      const sorted = [...rows].sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol];
        let cmp = 0;
        if (typeof av === 'string') cmp = av.localeCompare(bv);
        else cmp = av - bv;
        return sortAsc ? cmp : -cmp;
      });

      let html = '<table class="advisor-table"><thead><tr>';
      for (const col of cols) {
        const arrow = sortCol === col.key ? (sortAsc ? ' \u25B2' : ' \u25BC') : '';
        html += `<th data-col="${col.key}">${col.label}<span class="sort-arrow">${arrow}</span></th>`;
      }
      html += '</tr></thead><tbody>';
      for (const r of sorted) {
        html += `<tr class="clickable" data-ci="${r.index}">`;
        html += `<td>${r.name}</td>`;
        html += `<td class="num">${r.size}</td>`;
        html += `<td class="num">${r.foodSurplus}</td>`;
        html += `<td class="num">${r.shieldProd}</td>`;
        html += `<td class="num">${r.trade}</td>`;
        html += `<td class="num">${r.buildingCount}</td>`;
        html += '</tr>';
      }
      html += '</tbody></table>';
      wrapper.innerHTML = html;

      // Attach sort handlers
      wrapper.querySelectorAll('th[data-col]').forEach(th => {
        th.addEventListener('click', () => {
          const col = th.dataset.col;
          if (sortCol === col) sortAsc = !sortAsc;
          else { sortCol = col; sortAsc = true; }
          renderTable();
        });
      });

      // Attach row click handlers
      wrapper.querySelectorAll('tr[data-ci]').forEach(tr => {
        tr.addEventListener('click', () => {
          const ci = parseInt(tr.dataset.ci);
          const city = gs.cities[ci];
          if (city) { dismiss(); _deps.openCityDialog(city, ci); }
        });
      });
    }

    renderTable();
  });
}

// ═══════════════════════════════════════════════════════════════════
// MILITARY ADVISOR (F2) — unit breakdown by type
// ═══════════════════════════════════════════════════════════════════
export function showMilitaryAdvisor() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  if (document.getElementById('military-dialog')) return;

  const gs = S.mpGameState;
  const civSlot = S.mpCivSlot;
  const myUnits = gs.units.filter(u => u.owner === civSlot && u.gx >= 0);

  // Group by type
  const byType = {};
  for (const u of myUnits) {
    if (!byType[u.type]) byType[u.type] = { count: 0, totalAtk: 0, totalDef: 0 };
    byType[u.type].count++;
    byType[u.type].totalAtk += UNIT_ATK[u.type] || 0;
    byType[u.type].totalDef += UNIT_DEF[u.type] || 0;
  }

  const typeIds = Object.keys(byType).map(Number).sort((a, b) => a - b);
  let totalUnits = 0, totalAtk = 0, totalDef = 0;
  for (const tid of typeIds) {
    totalUnits += byType[tid].count;
    totalAtk += byType[tid].totalAtk;
    totalDef += byType[tid].totalDef;
  }

  createCiv2Dialog('military-dialog', 'Military Advisor', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:360px';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow-y:auto;flex:1';

    let html = '<table class="advisor-table"><thead><tr>';
    html += '<th>Unit Type</th><th>Count</th><th>Attack</th><th>Defense</th>';
    html += '</tr></thead><tbody>';
    for (const tid of typeIds) {
      const d = byType[tid];
      const name = UNIT_NAMES[tid] || `Unit ${tid}`;
      html += `<tr><td>${name}</td><td class="num">${d.count}</td><td class="num">${d.totalAtk}</td><td class="num">${d.totalDef}</td></tr>`;
    }
    html += '</tbody></table>';
    wrapper.innerHTML = html;
    panel.appendChild(wrapper);

    const summary = document.createElement('div');
    summary.className = 'advisor-summary';
    summary.textContent = `Total: ${totalUnits} units, ${totalAtk} attack, ${totalDef} defense`;
    panel.appendChild(summary);
  });
}

// ═══════════════════════════════════════════════════════════════════
// TRADE ADVISOR (F3) — income, expenses, net income, city breakdown
// ═══════════════════════════════════════════════════════════════════
export function showTradeAdvisor() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  if (document.getElementById('trade-dialog')) return;

  const gs = S.mpGameState;
  const civSlot = S.mpCivSlot;
  const myCities = [];
  for (let ci = 0; ci < gs.cities.length; ci++) {
    const c = gs.cities[ci];
    if (c.owner === civSlot && c.size > 0) myCities.push({ city: c, index: ci });
  }

  let totalTax = 0, totalMaintenance = 0;
  const cityRows = [];
  for (const { city, index } of myCities) {
    let tax = 0, maintenance = 0, trade = 0;
    if (S.mpMapBase) {
      const td = calcCityTrade(city, index, gs, S.mpMapBase);
      if (td) {
        tax = td.tax || 0;
        trade = td.netTrade || 0;
        maintenance = td.maintenance || 0;
      }
    }
    totalTax += tax;
    totalMaintenance += maintenance;
    cityRows.push({ name: city.name, trade, tax, maintenance });
  }

  // Sort cities by trade descending
  cityRows.sort((a, b) => b.trade - a.trade);
  const netIncome = totalTax - totalMaintenance;

  createCiv2Dialog('trade-dialog', 'Trade Advisor', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:360px';

    // Summary section
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'advisor-summary';
    summaryDiv.style.marginTop = '0';
    summaryDiv.style.marginBottom = '8px';
    summaryDiv.innerHTML = `Total Income: ${totalTax} gold &middot; Expenses: ${totalMaintenance} gold &middot; ` +
      `Net: <span style="color:${netIncome >= 0 ? '#060' : '#a00'}">${netIncome >= 0 ? '+' : ''}${netIncome}</span> gold`;
    panel.appendChild(summaryDiv);

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow-y:auto;flex:1';

    let html = '<table class="advisor-table"><thead><tr>';
    html += '<th>City</th><th>Trade</th><th>Tax</th><th>Maint.</th>';
    html += '</tr></thead><tbody>';
    for (const r of cityRows) {
      html += `<tr><td>${r.name}</td><td class="num">${r.trade}</td><td class="num">${r.tax}</td><td class="num">${r.maintenance}</td></tr>`;
    }
    html += '</tbody></table>';
    wrapper.innerHTML = html;
    panel.appendChild(wrapper);
  });
}

// ═══════════════════════════════════════════════════════════════════
// SCIENCE ADVISOR (F5) — research progress, per-turn science, tech list
// ═══════════════════════════════════════════════════════════════════
export function showScienceAdvisor() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  if (document.getElementById('science-dialog')) return;

  const gs = S.mpGameState;
  const civSlot = S.mpCivSlot;
  const civ = gs.civs?.[civSlot];
  const civTechs = gs.civTechs?.[civSlot] || new Set();

  // Current research
  const techId = civ?.techBeingResearched;
  const hasTarget = techId != null && techId !== 0xFF && techId >= 0 && techId < ADVANCE_NAMES.length;
  const current = civ?.researchProgress || 0;
  const cost = calcResearchCost(gs, civSlot);

  // Science per turn
  let sciPerTurn = 0;
  if (S.mpMapBase) {
    for (let ci = 0; ci < gs.cities.length; ci++) {
      const city = gs.cities[ci];
      if (city.owner === civSlot && city.size > 0) {
        const td = calcCityTrade(city, ci, gs, S.mpMapBase);
        if (td) sciPerTurn += td.sci || 0;
      }
    }
  }

  const turnsLeft = hasTarget && sciPerTurn > 0 ? Math.ceil((cost - current) / sciPerTurn) : '?';
  const available = getAvailableResearch(gs, civSlot);
  const { overlay, dismiss } = createCiv2Dialog('science-dialog', 'Science Advisor', panel => {
    panel.style.cssText = 'max-height:60vh;overflow:hidden;display:flex;flex-direction:column;min-width:380px';

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow-y:auto;flex:1';

    // Research status
    const statusDiv = document.createElement('div');
    statusDiv.className = 'advisor-summary';
    statusDiv.style.marginTop = '0';
    statusDiv.style.marginBottom = '8px';
    if (hasTarget) {
      statusDiv.innerHTML = `Researching: <strong>${ADVANCE_NAMES[techId]}</strong> &mdash; ${current}/${cost} (${turnsLeft} turns)<br>` +
        `Science per turn: ${sciPerTurn}`;
    } else {
      statusDiv.innerHTML = `No research target<br>Science per turn: ${sciPerTurn}`;
    }
    wrapper.appendChild(statusDiv);

    // Researched technologies
    const researchedLabel = document.createElement('div');
    researchedLabel.style.cssText = 'font:bold 13px "Times New Roman",Georgia,serif;color:#654;padding:4px 0 2px;border-bottom:1px solid #b8a88c;margin-bottom:4px';
    researchedLabel.textContent = `Known Technologies (${civTechs.size})`;
    wrapper.appendChild(researchedLabel);

    const researchedList = document.createElement('div');
    researchedList.className = 'tech-list';
    const sortedKnown = [...civTechs].sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));
    for (const id of sortedKnown) {
      const chip = document.createElement('span');
      chip.className = 'tech-chip';
      chip.textContent = ADVANCE_NAMES[id] || `Tech ${id}`;
      researchedList.appendChild(chip);
    }
    wrapper.appendChild(researchedList);

    // Available technologies
    if (available.length > 0) {
      const availLabel = document.createElement('div');
      availLabel.style.cssText = 'font:bold 13px "Times New Roman",Georgia,serif;color:#654;padding:8px 0 2px;border-bottom:1px solid #b8a88c;margin-bottom:4px';
      availLabel.textContent = `Available to Research (${available.length})`;
      wrapper.appendChild(availLabel);

      const availList = document.createElement('div');
      availList.className = 'tech-list';
      const sortedAvail = [...available].sort((a, b) => (ADVANCE_NAMES[a] || '').localeCompare(ADVANCE_NAMES[b] || ''));
      for (const id of sortedAvail) {
        const chip = document.createElement('span');
        chip.className = 'tech-chip available';
        chip.textContent = ADVANCE_NAMES[id] || `Tech ${id}`;
        chip.title = 'Click to research';
        chip.addEventListener('click', () => {
          dismiss();
          S.transport.sendRaw({ type: 'ACTION', action: { type: SET_RESEARCH, advanceId: id } });
        });
        availList.appendChild(chip);
      }
      wrapper.appendChild(availList);
    }

    panel.appendChild(wrapper);
  });
}
