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
import { openDiplomacyDialog } from './diplomacy-ui.js';

// Late-bound dependencies (e.g. openCityDialog from app.js)
let _deps = {};
export function registerAdvisorDeps(deps) { _deps = deps; }

// ── Tech category row assignments (0=Military, 1=Economic/Naval, 2=Government/Social, 3=Science/Academic) ──
// Indexed by advance ID (0-88). ID 63 (Plumbing) is unresearchable and excluded.
const TECH_ROW = [
  0,  //  0: Advanced Flight     — Military (advanced combat aircraft)
  3,  //  1: Alphabet            — Science (knowledge)
  0,  //  2: Amphibious Warfare  — Military (combat doctrine)
  3,  //  3: Astronomy           — Science (discovery)
  3,  //  4: Atomic Theory       — Science (physics research)
  1,  //  5: Automobile          — Economic (infrastructure/industry)
  1,  //  6: Banking             — Economic (trade/finance)
  1,  //  7: Bridge Building     — Economic (construction/infrastructure)
  0,  //  8: Bronze Working      — Military (weapons)
  2,  //  9: Ceremonial Burial   — Government/Social (religion)
  3,  // 10: Chemistry           — Science (research)
  0,  // 11: Chivalry            — Military (combat units)
  2,  // 12: Code of Laws        — Government/Social (law)
  0,  // 13: Combined Arms       — Military (combat doctrine)
  1,  // 14: Combustion          — Economic (industrial tech)
  2,  // 15: Communism           — Government/Social (government)
  3,  // 16: Computers           — Science (research)
  0,  // 17: Conscription        — Military (military doctrine)
  1,  // 18: Construction        — Economic (infrastructure)
  1,  // 19: The Corporation     — Economic (trade/industry)
  1,  // 20: Currency            — Economic (trade/finance)
  2,  // 21: Democracy           — Government/Social (government)
  1,  // 22: Economics           — Economic (trade)
  3,  // 23: Electricity         — Science (discovery)
  3,  // 24: Electronics         — Science (research)
  1,  // 25: Engineering         — Economic (construction)
  2,  // 26: Environmentalism    — Government/Social (social policy)
  0,  // 27: Espionage           — Military (intelligence)
  0,  // 28: Explosives          — Military (weapons)
  2,  // 29: Feudalism           — Government/Social (social structure)
  0,  // 30: Flight              — Military (combat aircraft)
  2,  // 31: Fundamentalism      — Government/Social (government)
  3,  // 32: Fusion Power        — Science (research)
  3,  // 33: Genetic Engineering  — Science (research)
  0,  // 34: Guerrilla Warfare   — Military (combat doctrine)
  0,  // 35: Gunpowder           — Military (weapons)
  0,  // 36: Horseback Riding    — Military (combat units)
  1,  // 37: Industrialization   — Economic (industry)
  3,  // 38: Invention           — Science (discovery)
  0,  // 39: Iron Working        — Military (weapons)
  2,  // 40: Labor Union         — Government/Social (social policy)
  3,  // 41: The Laser           — Science (research)
  0,  // 42: Leadership          — Military (tactics)
  3,  // 43: Literacy            — Science (knowledge)
  0,  // 44: Machine Tools       — Military (weapons/industry)
  1,  // 45: Magnetism           — Economic/Naval (navigation)
  1,  // 46: Map Making          — Economic/Naval (naval)
  1,  // 47: Masonry             — Economic (construction)
  1,  // 48: Mass Production     — Economic (industry)
  3,  // 49: Mathematics         — Science (knowledge)
  3,  // 50: Medicine            — Science (knowledge)
  0,  // 51: Metallurgy          — Military (weapons)
  3,  // 52: Miniaturization     — Science (research)
  0,  // 53: Mobile Warfare      — Military (combat doctrine)
  2,  // 54: Monarchy            — Government/Social (government)
  2,  // 55: Monotheism          — Government/Social (religion)
  2,  // 56: Mysticism           — Government/Social (religion)
  1,  // 57: Navigation          — Economic/Naval (naval)
  3,  // 58: Nuclear Fission     — Science (research)
  3,  // 59: Nuclear Power       — Science (research)
  3,  // 60: Philosophy          — Science (knowledge)
  3,  // 61: Physics             — Science (research)
  1,  // 62: Plastics            — Economic (industry)
  3,  // 63: Plumbing            — (unresearchable, unused)
  2,  // 64: Polytheism          — Government/Social (religion)
  1,  // 65: Pottery             — Economic (trade)
  0,  // 66: Radio               — Military (communications)
  1,  // 67: Railroad            — Economic (infrastructure)
  2,  // 68: Recycling           — Government/Social (social policy)
  1,  // 69: Refining            — Economic (industry)
  1,  // 70: Refrigeration       — Economic (infrastructure)
  2,  // 71: The Republic        — Government/Social (government)
  0,  // 72: Robotics            — Military (combat units)
  0,  // 73: Rocketry            — Military (weapons)
  1,  // 74: Sanitation          — Economic (infrastructure)
  1,  // 75: Seafaring           — Economic/Naval (naval)
  3,  // 76: Space Flight        — Science (research)
  0,  // 77: Stealth             — Military (combat aircraft)
  1,  // 78: Steam Engine        — Economic (industry)
  0,  // 79: Steel               — Military (weapons)
  3,  // 80: Superconductor      — Science (research)
  0,  // 81: Tactics             — Military (tactics)
  2,  // 82: Theology            — Government/Social (religion)
  3,  // 83: Theory of Gravity   — Science (research)
  1,  // 84: Trade               — Economic (trade)
  3,  // 85: University          — Science (knowledge)
  0,  // 86: Warrior Code        — Military (combat)
  1,  // 87: The Wheel           — Economic (infrastructure)
  3,  // 88: Writing             — Science (knowledge)
];

const TECH_ROW_LABELS = ['Military', 'Economic', 'Government', 'Science'];
const TECH_ROW_COLORS = [
  'rgba(180,60,60,0.15)',     // Military — red
  'rgba(60,160,160,0.15)',    // Economic — teal
  'rgba(180,160,60,0.15)',    // Government — gold
  'rgba(60,80,180,0.15)',     // Science — blue
];

// ── Tech tree viewer (F6) — category-banded layout with prerequisite graph ──
export function showTechTree() {
  if (!S.mpGameState || S.mpCivSlot == null) return;
  const civTechs = S.mpGameState.civTechs?.[S.mpCivSlot] || new Set();
  const availableSet = new Set(getAvailableResearch(S.mpGameState, S.mpCivSlot));

  // ── 1. Build tech list, compute column = longest path from any root ──
  const depthCache = {};
  function getDepth(id) {
    if (depthCache[id] != null) return depthCache[id];
    depthCache[id] = -1; // cycle guard
    const [p1, p2] = ADVANCE_PREREQS[id];
    if (p1 < 0 && p2 < 0) return (depthCache[id] = 0);
    let d = 0;
    if (p1 >= 0) d = Math.max(d, getDepth(p1) + 1);
    if (p2 >= 0) d = Math.max(d, getDepth(p2) + 1);
    return (depthCache[id] = d);
  }

  const techs = [];
  for (let i = 0; i < ADVANCE_NAMES.length; i++) {
    const [p1, p2] = ADVANCE_PREREQS[i];
    if (p1 === -2 || p2 === -2) continue; // unresearchable (e.g. Plumbing)
    techs.push({ id: i, name: ADVANCE_NAMES[i], col: getDepth(i), row: TECH_ROW[i] ?? 3 });
  }

  let maxCol = 0;
  for (const t of techs) { if (t.col > maxCol) maxCol = t.col; }

  // ── 2. Group by (column, row) and compute sub-row stacking ──
  const NODE_W = 130, NODE_H = 34;
  const COL_SPACING = 150;
  const ROW_BAND_H = 120;
  const SUB_ROW_SPACING = 38;
  const PAD_X = 70;  // leave room for row labels on the left
  const PAD_Y = 40;  // leave room for era headers at the top
  const NUM_ROWS = 4;

  // Collect techs per (col, row) cell
  const cellMap = new Map(); // key "col-row" -> tech[]
  for (const t of techs) {
    const key = `${t.col}-${t.row}`;
    if (!cellMap.has(key)) cellMap.set(key, []);
    cellMap.get(key).push(t);
  }
  // Sort within each cell alphabetically for determinism
  for (const [, arr] of cellMap) arr.sort((a, b) => a.name.localeCompare(b.name));

  // Compute pixel positions
  const nodePos = new Map(); // advId -> { x, y }

  for (const [key, arr] of cellMap) {
    const [colStr, rowStr] = key.split('-');
    const col = parseInt(colStr), row = parseInt(rowStr);
    const cellCount = arr.length;
    // Center the sub-rows vertically within the row band
    const bandTop = PAD_Y + row * ROW_BAND_H;
    const bandCenter = bandTop + ROW_BAND_H / 2;
    const blockH = (cellCount - 1) * SUB_ROW_SPACING;
    const startY = bandCenter - blockH / 2 - NODE_H / 2;

    for (let s = 0; s < arr.length; s++) {
      const x = PAD_X + col * COL_SPACING;
      const y = startY + s * SUB_ROW_SPACING;
      nodePos.set(arr[s].id, { x, y });
    }
  }

  const totalW = PAD_X + (maxCol + 1) * COL_SPACING + 30;
  const totalH = PAD_Y + NUM_ROWS * ROW_BAND_H + 20;

  // ── 3. Era headers: group columns into eras ──
  // Approximate era boundaries based on column depth
  const ERA_NAMES = ['Ancient', 'Classical', 'Medieval', 'Renaissance', 'Industrial', 'Modern'];
  function getEra(col) {
    if (col <= 1) return 0;       // Ancient
    if (col <= 3) return 1;       // Classical
    if (col <= 5) return 2;       // Medieval
    if (col <= 7) return 3;       // Renaissance
    if (col <= 9) return 4;       // Industrial
    return 5;                     // Modern
  }

  // Find era spans (first and last column per era)
  const eraSpans = [];
  let prevEra = -1;
  for (let c = 0; c <= maxCol; c++) {
    const era = getEra(c);
    if (era !== prevEra) {
      eraSpans.push({ era, startCol: c, endCol: c });
      prevEra = era;
    } else {
      eraSpans[eraSpans.length - 1].endCol = c;
    }
  }

  // ── 4. Collect all transitive upstream prereqs for a given tech ──
  function getUpstreamPrereqs(advId) {
    const result = new Set();
    const stack = [advId];
    while (stack.length) {
      const cur = stack.pop();
      const [p1, p2] = ADVANCE_PREREQS[cur] || [-1, -1];
      for (const pid of [p1, p2]) {
        if (pid >= 0 && !result.has(pid)) {
          result.add(pid);
          stack.push(pid);
        }
      }
    }
    return result;
  }

  // ── 5. Collect edges on the upstream path (prereq→child pairs within the chain) ──
  function getUpstreamEdges(advId) {
    const prereqSet = getUpstreamPrereqs(advId);
    prereqSet.add(advId); // include the selected node itself
    const edges = new Set();
    for (const id of prereqSet) {
      const [p1, p2] = ADVANCE_PREREQS[id] || [-1, -1];
      if (p1 >= 0 && prereqSet.has(p1)) edges.add(`${p1}-${id}`);
      if (p2 >= 0 && prereqSet.has(p2)) edges.add(`${p2}-${id}`);
    }
    return edges;
  }

  // ── 6. Build the dialog ──
  let selectedAdvId = null;

  createCiv2Dialog('tech-tree', 'Civilization Advances', panel => {
    panel.style.cssText = 'position:relative;overflow:auto;padding:0;background:#2a2a3a';
    panel.style.width = '90vw';
    panel.style.maxWidth = '1800px';
    panel.style.height = '72vh';

    const container = document.createElement('div');
    container.className = 'tt-container';
    container.style.cssText = `position:relative;width:${totalW}px;height:${totalH}px;min-width:100%;min-height:100%`;

    // ── Row band backgrounds ──
    for (let r = 0; r < NUM_ROWS; r++) {
      const band = document.createElement('div');
      band.className = 'tt-row-band';
      const bandTop = PAD_Y + r * ROW_BAND_H;
      band.style.cssText = `position:absolute;left:0;top:${bandTop}px;width:${totalW}px;height:${ROW_BAND_H}px;background:${TECH_ROW_COLORS[r]};z-index:0;pointer-events:none`;
      // Bottom border between bands
      if (r < NUM_ROWS - 1) band.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
      container.appendChild(band);
    }

    // ── Row labels (left side, vertical text) ──
    for (let r = 0; r < NUM_ROWS; r++) {
      const lbl = document.createElement('div');
      lbl.className = 'tt-row-label';
      const bandTop = PAD_Y + r * ROW_BAND_H;
      lbl.style.cssText = `position:absolute;left:4px;top:${bandTop}px;width:${PAD_X - 8}px;height:${ROW_BAND_H}px;display:flex;align-items:center;justify-content:center;z-index:3`;
      const inner = document.createElement('span');
      inner.textContent = TECH_ROW_LABELS[r];
      inner.style.cssText = 'writing-mode:vertical-lr;transform:rotate(180deg);font:bold 12px "Times New Roman",Georgia,serif;color:rgba(255,255,255,0.55);letter-spacing:1px;text-transform:uppercase';
      lbl.appendChild(inner);
      container.appendChild(lbl);
    }

    // ── Era headers (top) ──
    for (const span of eraSpans) {
      const x1 = PAD_X + span.startCol * COL_SPACING;
      const x2 = PAD_X + span.endCol * COL_SPACING + NODE_W;
      const hdr = document.createElement('div');
      hdr.className = 'tt-era-header';
      hdr.style.cssText = `position:absolute;left:${x1}px;top:6px;width:${x2 - x1}px;height:${PAD_Y - 10}px;display:flex;align-items:center;justify-content:center;z-index:3;border-bottom:1px solid rgba(255,255,255,0.12)`;
      hdr.textContent = ERA_NAMES[span.era];
      container.appendChild(hdr);
    }

    // ── SVG layer for prerequisite edges ──
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', totalW);
    svg.setAttribute('height', totalH);
    svg.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;z-index:1';

    // Draw prerequisite edges as bezier curves (with data attrs for selection)
    for (const t of techs) {
      const [p1, p2] = ADVANCE_PREREQS[t.id];
      const dst = nodePos.get(t.id);
      if (!dst) continue;
      for (const pid of [p1, p2]) {
        if (pid < 0 || !nodePos.has(pid)) continue;
        const src = nodePos.get(pid);

        let color;
        if (civTechs.has(t.id)) color = 'rgba(40,160,40,0.5)';
        else if (availableSet.has(t.id)) color = 'rgba(80,140,220,0.6)';
        else color = 'rgba(140,140,140,0.35)';

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const sx = src.x + NODE_W, sy = src.y + NODE_H / 2;
        const dx = dst.x, dy = dst.y + NODE_H / 2;
        const cx = (sx + dx) / 2;
        path.setAttribute('d', `M${sx},${sy} C${cx},${sy} ${cx},${dy} ${dx},${dy}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', '1.5');
        path.dataset.from = pid;
        path.dataset.to = t.id;
        path.dataset.baseColor = color;
        svg.appendChild(path);
      }
    }
    container.appendChild(svg);

    // ── Tech nodes ──
    const nodeLayer = document.createElement('div');
    nodeLayer.style.cssText = `position:absolute;top:0;left:0;width:${totalW}px;height:${totalH}px;z-index:2;pointer-events:none`;

    // ── Selection highlighting ──
    function applySelection(advId) {
      selectedAdvId = advId;
      const upstreamSet = advId != null ? getUpstreamPrereqs(advId) : new Set();
      const edgeSet = advId != null ? getUpstreamEdges(advId) : new Set();
      const hasSelection = advId != null;

      // Update nodes
      const allNodes = nodeLayer.querySelectorAll('.tt-node');
      allNodes.forEach(el => {
        const id = parseInt(el.dataset.advId);
        el.classList.remove('tt-selected', 'tt-prereq-of-selected', 'tt-dimmed');
        if (!hasSelection) return;
        if (id === advId) el.classList.add('tt-selected');
        else if (upstreamSet.has(id)) el.classList.add('tt-prereq-of-selected');
        else el.classList.add('tt-dimmed');
      });

      // Update SVG edges
      const allPaths = svg.querySelectorAll('path');
      allPaths.forEach(p => {
        const edgeKey = `${p.dataset.from}-${p.dataset.to}`;
        if (!hasSelection) {
          // Restore default colors
          p.setAttribute('stroke', p.dataset.baseColor);
          p.setAttribute('stroke-width', '1.5');
          p.setAttribute('opacity', '1');
        } else if (edgeSet.has(edgeKey)) {
          // Upstream edge: golden highlight
          p.setAttribute('stroke', '#f0c040');
          p.setAttribute('stroke-width', '2.5');
          p.setAttribute('opacity', '1');
        } else {
          // Unrelated edge: dim
          p.setAttribute('stroke', p.dataset.baseColor);
          p.setAttribute('stroke-width', '1');
          p.setAttribute('opacity', '0.2');
        }
      });
    }

    for (const t of techs) {
      const p = nodePos.get(t.id);
      if (!p) continue;
      const has = civTechs.has(t.id);
      const avail = availableSet.has(t.id);

      const node = document.createElement('div');
      node.className = 'tt-node' + (has ? ' tt-known' : avail ? ' tt-available' : ' tt-locked');
      node.style.cssText = `position:absolute;left:${p.x}px;top:${p.y}px;width:${NODE_W}px;height:${NODE_H}px;pointer-events:auto`;
      node.dataset.advId = t.id;

      // Icon placeholder (replaced async when icons load)
      const iconSlot = document.createElement('div');
      iconSlot.className = 'tt-icon-slot';
      iconSlot.style.cssText = 'width:24px;height:14px;flex-shrink:0';
      node.appendChild(iconSlot);

      // Name label
      const nameSpan = document.createElement('span');
      nameSpan.className = 'tt-node-name';
      nameSpan.textContent = t.name;
      node.appendChild(nameSpan);

      // Tooltip with prereqs and status
      const prereqNames = [];
      const [rp1, rp2] = ADVANCE_PREREQS[t.id];
      if (rp1 >= 0) prereqNames.push(ADVANCE_NAMES[rp1]);
      if (rp2 >= 0) prereqNames.push(ADVANCE_NAMES[rp2]);
      let tip = t.name;
      if (prereqNames.length) tip += '\nRequires: ' + prereqNames.join(', ');
      if (has) tip += '\n(Known)';
      else if (avail) tip += '\n(Available to research)';
      node.title = tip;

      // Click → select + show detail (tech tree stays open behind)
      node.addEventListener('click', (e) => {
        e.stopPropagation();
        const clickedId = t.id;
        if (selectedAdvId === clickedId) {
          // Clicking same node again: deselect
          applySelection(null);
        } else {
          applySelection(clickedId);
          // Show tech detail dialog on top — tech tree stays visible underneath
          // Pass null as returnTo so closing detail doesn't destroy the tree
          _showGoalDetail(clickedId, null);
        }
      });

      nodeLayer.appendChild(node);
    }

    // Click on empty space in the container → deselect
    container.addEventListener('click', (e) => {
      if (e.target === container || e.target.classList.contains('tt-row-band')) {
        applySelection(null);
      }
    });

    // Load icons asynchronously and insert into nodes
    _ensureResearchIcons().then(cache => {
      if (!cache) return;
      const nodeEls = nodeLayer.querySelectorAll('.tt-node');
      nodeEls.forEach(el => {
        const advId = parseInt(el.dataset.advId);
        const iconIdx = ADVANCE_ICON[advId] ?? 0;
        const iconCanvas = cache.icons[iconIdx];
        if (!iconCanvas) return;
        const ic = document.createElement('canvas');
        ic.width = 24; ic.height = 14;
        ic.className = 'tt-node-icon';
        const ictx = ic.getContext('2d');
        ictx.imageSmoothingEnabled = false;
        ictx.drawImage(iconCanvas, 0, 0, 36, 20, 0, 0, 24, 14);
        const slot = el.querySelector('.tt-icon-slot');
        if (slot) slot.replaceWith(ic);
      });
    });

    container.appendChild(nodeLayer);
    panel.appendChild(container);
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
      // Full negotiation dialog
      const negoBtn = document.createElement('button');
      negoBtn.textContent = 'Negotiate...';
      negoBtn.className = 'civ2-btn';
      negoBtn.style.cssText = 'font-size:11px;padding:2px 8px';
      negoBtn.onclick = () => {
        document.getElementById('diplomacy-dialog')?.remove();
        const sendAction = (msg) => S.transport.sendRaw(msg);
        openDiplomacyDialog(S.mpGameState, S.mpMapBase, S.mpCivSlot, c, sendAction);
      };
      btnGroup.appendChild(negoBtn);
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
  ], { showClose: false });
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
  const DOMAIN_LABELS = ['Land', 'Air', 'Sea'];

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
          const mockUnit = { type: uid, owner: S.mpCivSlot ?? 1, movesRemain: 0, orders: 'none' };
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
            `<div class="civpedia-stat"><span class="civpedia-stat-label">Domain</span><span class="civpedia-stat-value">${['Land','Air','Sea'][UNIT_DOMAIN[i] ?? 0]}</span></div>`;
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
