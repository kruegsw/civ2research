/**
 * civilopedia.js — Rich Civilopedia (in-game encyclopedia) dialog.
 *
 * Features:
 *   - 6 category tabs: Units, Buildings, Wonders, Advances, Terrain, Governments
 *   - Left panel: scrollable list of all items in current category
 *   - Right panel: detail view with full stats and cross-references
 *   - Clickable prereq techs / unlocked items navigate to that item
 *
 * Entry point: showCivilopedia(category, itemId)
 */

import { createCiv2Dialog } from './dialogs.js';
import {
  UNIT_NAMES, UNIT_ATK, UNIT_DEF, UNIT_MOVE_POINTS, UNIT_HP, UNIT_FP,
  UNIT_COSTS, UNIT_DOMAIN, UNIT_PREREQS, UNIT_OBSOLETE,
  IMPROVE_NAMES, IMPROVE_COSTS, IMPROVE_MAINTENANCE, IMPROVE_PREREQS,
  WONDER_NAMES, WONDER_COSTS, WONDER_PREREQS, WONDER_OBSOLETE,
  ADVANCE_NAMES, ADVANCE_PREREQS,
  TERRAIN_NAMES, TERRAIN_BASE, TERRAIN_DEFENSE, TERRAIN_MOVE_COST,
  GOVERNMENT_NAMES, GOVERNMENT_KEYS, GOVT_TECH_PREREQS,
  GOVT_MAX_RATE, GOVT_MAX_SCIENCE, GOVT_CORRUPTION_DIVISOR,
} from '../engine/defs.js';

// ── Constants ──

const CATEGORIES = [
  { id: 'units',       label: 'Units' },
  { id: 'buildings',   label: 'Buildings' },
  { id: 'wonders',     label: 'Wonders' },
  { id: 'advances',    label: 'Advances' },
  { id: 'terrain',     label: 'Terrain' },
  { id: 'governments', label: 'Governments' },
];

const DOMAIN_LABELS = ['Land', 'Air', 'Sea'];

const EPOCH_NAMES = ['Ancient', 'Renaissance', 'Industrial', 'Modern'];

// ── Reverse-lookup builders (computed once on first use) ──

let _unlockCache = null;

/** Build reverse lookup: tech ID -> { units, buildings, wonders, governments } it unlocks. */
function getUnlockCache() {
  if (_unlockCache) return _unlockCache;
  _unlockCache = {};
  for (let i = 0; i < ADVANCE_NAMES.length; i++) _unlockCache[i] = { units: [], buildings: [], wonders: [], governments: [] };

  // Units
  for (let i = 0; i < UNIT_NAMES.length; i++) {
    const prereq = UNIT_PREREQS[i];
    if (prereq >= 0 && prereq < ADVANCE_NAMES.length) {
      _unlockCache[prereq].units.push(i);
    }
  }
  // Buildings
  for (let id = 1; id <= 38; id++) {
    const prereq = IMPROVE_PREREQS[id];
    if (prereq >= 0 && prereq < ADVANCE_NAMES.length) {
      _unlockCache[prereq].buildings.push(id);
    }
  }
  // Wonders
  for (let i = 0; i < WONDER_NAMES.length; i++) {
    const prereq = WONDER_PREREQS[i];
    if (prereq >= 0 && prereq < ADVANCE_NAMES.length) {
      _unlockCache[prereq].wonders.push(i);
    }
  }
  // Governments
  for (const key of GOVERNMENT_KEYS) {
    const prereq = GOVT_TECH_PREREQS[key];
    if (prereq >= 0 && prereq < ADVANCE_NAMES.length) {
      _unlockCache[prereq].governments.push(key);
    }
  }
  return _unlockCache;
}

// ── Helpers ──

function makeLink(text, onClick) {
  const a = document.createElement('a');
  a.textContent = text;
  a.href = '#';
  a.style.cssText = 'color:#1a5276;text-decoration:underline;cursor:pointer';
  a.addEventListener('click', e => { e.preventDefault(); onClick(); });
  return a;
}

function makeStat(label, value) {
  const row = document.createElement('div');
  row.className = 'civpedia-stat';
  const lbl = document.createElement('span');
  lbl.className = 'civpedia-stat-label';
  lbl.textContent = label;
  row.appendChild(lbl);
  if (typeof value === 'string' || typeof value === 'number') {
    const val = document.createElement('span');
    val.className = 'civpedia-stat-value';
    val.textContent = String(value);
    row.appendChild(val);
  } else {
    // value is a DOM element (e.g., link)
    const val = document.createElement('span');
    val.className = 'civpedia-stat-value';
    val.appendChild(value);
    row.appendChild(val);
  }
  return row;
}

function makeStatWithLinks(label, links) {
  const row = document.createElement('div');
  row.className = 'civpedia-stat';
  const lbl = document.createElement('span');
  lbl.className = 'civpedia-stat-label';
  lbl.textContent = label;
  row.appendChild(lbl);
  const val = document.createElement('span');
  val.className = 'civpedia-stat-value';
  links.forEach((link, i) => {
    if (i > 0) val.appendChild(document.createTextNode(', '));
    val.appendChild(link);
  });
  row.appendChild(val);
  return row;
}

function techEpoch(techId) {
  // Simple epoch assignment based on tech tree depth
  const depths = new Map();
  function getDepth(id) {
    if (id < 0 || id >= ADVANCE_NAMES.length) return 0;
    if (depths.has(id)) return depths.get(id);
    depths.set(id, 0); // prevent infinite recursion
    const [p1, p2] = ADVANCE_PREREQS[id] || [-1, -1];
    const d = 1 + Math.max(p1 >= 0 ? getDepth(p1) : 0, p2 >= 0 ? getDepth(p2) : 0);
    depths.set(id, d);
    return d;
  }
  const depth = getDepth(techId);
  if (depth <= 3) return 'Ancient';
  if (depth <= 7) return 'Renaissance';
  if (depth <= 11) return 'Industrial';
  return 'Modern';
}

// ── Item lists per category ──

function getItemList(category) {
  switch (category) {
    case 'units':
      return UNIT_NAMES.map((name, i) => name ? { id: i, name } : null).filter(Boolean);
    case 'buildings':
      return Object.entries(IMPROVE_NAMES)
        .map(([id, name]) => ({ id: +id, name }))
        .filter(e => e.id >= 1 && e.id <= 34) // exclude SS parts and Capitalization
        .sort((a, b) => a.name.localeCompare(b.name));
    case 'wonders':
      return WONDER_NAMES.map((name, i) => ({ id: i, name }));
    case 'advances':
      return ADVANCE_NAMES.map((name, i) => name ? { id: i, name } : null)
        .filter(Boolean)
        .sort((a, b) => a.name.localeCompare(b.name));
    case 'terrain':
      return TERRAIN_NAMES.map((name, i) => ({ id: i, name }));
    case 'governments':
      return GOVERNMENT_NAMES.map((name, i) => ({ id: i, name }));
    default:
      return [];
  }
}

// ── Detail builders ──

function buildUnitDetail(container, itemId, navigate) {
  const name = UNIT_NAMES[itemId];
  if (!name) return;

  const title = document.createElement('h3');
  title.textContent = name;
  title.style.cssText = 'margin:0 0 8px;font:bold 16px "Times New Roman",Georgia,serif;color:#333';
  container.appendChild(title);

  container.appendChild(makeStat('Attack', UNIT_ATK[itemId] ?? 0));
  container.appendChild(makeStat('Defense', UNIT_DEF[itemId] ?? 0));
  container.appendChild(makeStat('Hit Points', UNIT_HP[itemId] ?? 1));
  container.appendChild(makeStat('Firepower', UNIT_FP[itemId] ?? 1));
  container.appendChild(makeStat('Movement', UNIT_MOVE_POINTS[itemId] ?? 1));
  container.appendChild(makeStat('Cost', (UNIT_COSTS[itemId] ?? 10) / 10 + ' shields'));
  container.appendChild(makeStat('Domain', DOMAIN_LABELS[UNIT_DOMAIN[itemId] ?? 0]));

  // Prereq tech
  const prereq = UNIT_PREREQS[itemId];
  if (prereq >= 0 && ADVANCE_NAMES[prereq]) {
    container.appendChild(makeStat('Requires',
      makeLink(ADVANCE_NAMES[prereq], () => navigate('advances', prereq))));
  } else if (prereq === -1) {
    container.appendChild(makeStat('Requires', 'None'));
  }

  // Obsolete tech
  const obs = UNIT_OBSOLETE[itemId];
  if (obs >= 0 && ADVANCE_NAMES[obs]) {
    container.appendChild(makeStat('Obsolete by',
      makeLink(ADVANCE_NAMES[obs], () => navigate('advances', obs))));
  }
}

function buildBuildingDetail(container, itemId, navigate) {
  const name = IMPROVE_NAMES[itemId];
  if (!name) return;

  const title = document.createElement('h3');
  title.textContent = name;
  title.style.cssText = 'margin:0 0 8px;font:bold 16px "Times New Roman",Georgia,serif;color:#333';
  container.appendChild(title);

  container.appendChild(makeStat('Cost', (IMPROVE_COSTS[itemId] ?? 0) / 10 + ' shields'));
  container.appendChild(makeStat('Maintenance', (IMPROVE_MAINTENANCE[itemId] ?? 0) + ' gold/turn'));

  // Prereq tech
  const prereq = IMPROVE_PREREQS[itemId];
  if (prereq >= 0 && ADVANCE_NAMES[prereq]) {
    container.appendChild(makeStat('Requires',
      makeLink(ADVANCE_NAMES[prereq], () => navigate('advances', prereq))));
  } else {
    container.appendChild(makeStat('Requires', 'None'));
  }
}

function buildWonderDetail(container, itemId, navigate) {
  const name = WONDER_NAMES[itemId];
  if (!name) return;

  const title = document.createElement('h3');
  title.textContent = name;
  title.style.cssText = 'margin:0 0 8px;font:bold 16px "Times New Roman",Georgia,serif;color:#333';
  container.appendChild(title);

  container.appendChild(makeStat('Cost', (WONDER_COSTS[itemId] ?? 0) / 10 + ' shields'));

  // Prereq tech
  const prereq = WONDER_PREREQS[itemId];
  if (prereq >= 0 && ADVANCE_NAMES[prereq]) {
    container.appendChild(makeStat('Requires',
      makeLink(ADVANCE_NAMES[prereq], () => navigate('advances', prereq))));
  }

  // Obsolete tech
  const obs = WONDER_OBSOLETE[itemId];
  if (obs >= 0 && ADVANCE_NAMES[obs]) {
    container.appendChild(makeStat('Obsolete by',
      makeLink(ADVANCE_NAMES[obs], () => navigate('advances', obs))));
  }
}

function buildAdvanceDetail(container, itemId, navigate) {
  const name = ADVANCE_NAMES[itemId];
  if (!name) return;

  const title = document.createElement('h3');
  title.textContent = name;
  title.style.cssText = 'margin:0 0 8px;font:bold 16px "Times New Roman",Georgia,serif;color:#333';
  container.appendChild(title);

  // Epoch
  container.appendChild(makeStat('Epoch', techEpoch(itemId)));

  // Prereq techs
  const [p1, p2] = ADVANCE_PREREQS[itemId] || [-1, -1];
  const prereqLinks = [];
  if (p1 >= 0 && ADVANCE_NAMES[p1]) prereqLinks.push(makeLink(ADVANCE_NAMES[p1], () => navigate('advances', p1)));
  if (p2 >= 0 && ADVANCE_NAMES[p2]) prereqLinks.push(makeLink(ADVANCE_NAMES[p2], () => navigate('advances', p2)));
  if (prereqLinks.length > 0) {
    container.appendChild(makeStatWithLinks('Requires', prereqLinks));
  } else {
    container.appendChild(makeStat('Requires', 'None'));
  }

  // What it unlocks
  const unlocks = getUnlockCache()[itemId];
  if (unlocks) {
    if (unlocks.units.length > 0) {
      const links = unlocks.units.map(uid =>
        makeLink(UNIT_NAMES[uid], () => navigate('units', uid)));
      container.appendChild(makeStatWithLinks('Enables units', links));
    }
    if (unlocks.buildings.length > 0) {
      const links = unlocks.buildings.map(bid =>
        makeLink(IMPROVE_NAMES[bid], () => navigate('buildings', bid)));
      container.appendChild(makeStatWithLinks('Enables buildings', links));
    }
    if (unlocks.wonders.length > 0) {
      const links = unlocks.wonders.map(wid =>
        makeLink(WONDER_NAMES[wid], () => navigate('wonders', wid)));
      container.appendChild(makeStatWithLinks('Enables wonders', links));
    }
    if (unlocks.governments.length > 0) {
      const links = unlocks.governments.map(gkey => {
        const gi = GOVERNMENT_KEYS.indexOf(gkey);
        const gname = GOVERNMENT_NAMES[gi] || gkey;
        return makeLink(gname, () => navigate('governments', gi));
      });
      container.appendChild(makeStatWithLinks('Enables governments', links));
    }
  }

  // Leads to (techs that require this one)
  const leadsTo = [];
  for (let i = 0; i < ADVANCE_NAMES.length; i++) {
    if (!ADVANCE_NAMES[i]) continue;
    const [r1, r2] = ADVANCE_PREREQS[i] || [-1, -1];
    if (r1 === itemId || r2 === itemId) leadsTo.push(i);
  }
  if (leadsTo.length > 0) {
    const links = leadsTo.map(tid =>
      makeLink(ADVANCE_NAMES[tid], () => navigate('advances', tid)));
    container.appendChild(makeStatWithLinks('Leads to', links));
  }
}

function buildTerrainDetail(container, itemId) {
  const name = TERRAIN_NAMES[itemId];
  if (!name) return;

  const title = document.createElement('h3');
  title.textContent = name;
  title.style.cssText = 'margin:0 0 8px;font:bold 16px "Times New Roman",Georgia,serif;color:#333';
  container.appendChild(title);

  const base = TERRAIN_BASE[itemId];
  if (base) {
    container.appendChild(makeStat('Food', base[0]));
    container.appendChild(makeStat('Shields', base[1]));
    container.appendChild(makeStat('Trade', base[2]));
  }

  const def = TERRAIN_DEFENSE[itemId];
  if (def != null) {
    container.appendChild(makeStat('Defense bonus', (def * 50) + '%'));
  }

  const move = TERRAIN_MOVE_COST[itemId];
  if (move != null) {
    container.appendChild(makeStat('Movement cost', move));
  }
}

function buildGovernmentDetail(container, itemId, navigate) {
  const name = GOVERNMENT_NAMES[itemId];
  if (!name) return;

  const key = GOVERNMENT_KEYS[itemId] || name.toLowerCase();

  const title = document.createElement('h3');
  title.textContent = name;
  title.style.cssText = 'margin:0 0 8px;font:bold 16px "Times New Roman",Georgia,serif;color:#333';
  container.appendChild(title);

  // Max rates
  const maxRate = GOVT_MAX_RATE[key];
  if (maxRate != null) {
    container.appendChild(makeStat('Max tax/luxury rate', (maxRate * 10) + '%'));
  }
  const maxSci = GOVT_MAX_SCIENCE[key];
  if (maxSci != null) {
    container.appendChild(makeStat('Max science rate', (maxSci * 10) + '%'));
  }

  // Corruption
  const corrDiv = GOVT_CORRUPTION_DIVISOR[key];
  if (corrDiv != null) {
    const corrLevel = corrDiv <= 1 ? 'Catastrophic' : corrDiv <= 2 ? 'High' : corrDiv <= 3 ? 'Moderate' : 'Low';
    container.appendChild(makeStat('Corruption', corrLevel));
  }

  // Prereq tech
  const prereq = GOVT_TECH_PREREQS[key];
  if (prereq >= 0 && ADVANCE_NAMES[prereq]) {
    container.appendChild(makeStat('Requires',
      makeLink(ADVANCE_NAMES[prereq], () => navigate('advances', prereq))));
  } else {
    container.appendChild(makeStat('Requires', 'None'));
  }
}

// ── Detail dispatcher ──

function buildDetail(container, category, itemId, navigate) {
  container.innerHTML = '';
  switch (category) {
    case 'units':       buildUnitDetail(container, itemId, navigate); break;
    case 'buildings':   buildBuildingDetail(container, itemId, navigate); break;
    case 'wonders':     buildWonderDetail(container, itemId, navigate); break;
    case 'advances':    buildAdvanceDetail(container, itemId, navigate); break;
    case 'terrain':     buildTerrainDetail(container, itemId); break;
    case 'governments': buildGovernmentDetail(container, itemId, navigate); break;
  }
}

// ── Main entry point ──

/**
 * Show the Civilopedia dialog.
 *
 * @param {string} [category='units'] - Category tab to open
 * @param {number} [itemId] - Specific item to show in the detail panel
 */
export function showCivilopedia(category, itemId) {
  // Remove any existing dialog
  const existing = document.getElementById('civilopedia-dialog');
  if (existing) existing.remove();

  let currentCategory = category || 'units';
  let currentItemId = itemId;

  // State references for in-dialog navigation
  let tabBar, listPanel, detailPanel;
  let listButtons = {}; // category -> Map(itemId -> button)

  function navigate(cat, id) {
    currentCategory = cat;
    currentItemId = id;
    activateTab(cat);
    populateList(cat);
    selectItem(cat, id);
    buildDetail(detailPanel, cat, id, navigate);
  }

  function activateTab(cat) {
    tabBar.querySelectorAll('.civpedia-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === cat);
    });
  }

  function populateList(cat) {
    listPanel.innerHTML = '';
    const items = getItemList(cat);
    const btnMap = new Map();
    for (const item of items) {
      const btn = document.createElement('button');
      btn.textContent = item.name;
      btn.dataset.itemId = item.id;
      btn.style.cssText = 'display:block;width:100%;text-align:left;padding:4px 8px;margin:0;font:13px "Times New Roman",Georgia,serif;cursor:pointer;border:none;background:none;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis';
      btn.addEventListener('mouseenter', () => {
        if (!btn.classList.contains('civpedia-list-active')) btn.style.background = '#c4a876';
      });
      btn.addEventListener('mouseleave', () => {
        if (!btn.classList.contains('civpedia-list-active')) btn.style.background = 'none';
      });
      btn.addEventListener('click', () => {
        currentItemId = item.id;
        selectItem(cat, item.id);
        buildDetail(detailPanel, cat, item.id, navigate);
      });
      listPanel.appendChild(btn);
      btnMap.set(item.id, btn);
    }
    listButtons[cat] = btnMap;
  }

  function selectItem(cat, id) {
    const btnMap = listButtons[cat];
    if (!btnMap) return;
    for (const [, btn] of btnMap) {
      btn.classList.remove('civpedia-list-active');
      btn.style.background = 'none';
      btn.style.fontWeight = 'normal';
    }
    const active = btnMap.get(id);
    if (active) {
      active.classList.add('civpedia-list-active');
      active.style.background = '#b89c6a';
      active.style.fontWeight = 'bold';
      // Scroll into view
      active.scrollIntoView({ block: 'nearest' });
    }
  }

  createCiv2Dialog('civilopedia-dialog', 'Civilopedia', panel => {
    panel.style.cssText = 'display:flex;flex-direction:column;min-width:580px;max-width:700px;max-height:65vh;overflow:hidden';

    // Tab bar
    tabBar = document.createElement('div');
    tabBar.className = 'civpedia-tabs';
    for (const cat of CATEGORIES) {
      const btn = document.createElement('button');
      btn.className = 'civpedia-tab' + (cat.id === currentCategory ? ' active' : '');
      btn.textContent = cat.label;
      btn.dataset.tab = cat.id;
      btn.addEventListener('click', () => {
        currentCategory = cat.id;
        activateTab(cat.id);
        populateList(cat.id);
        // Auto-select first item
        const items = getItemList(cat.id);
        if (items.length > 0) {
          currentItemId = items[0].id;
          selectItem(cat.id, currentItemId);
          buildDetail(detailPanel, cat.id, currentItemId, navigate);
        } else {
          detailPanel.innerHTML = '';
        }
      });
      tabBar.appendChild(btn);
    }
    panel.appendChild(tabBar);

    // Body: left list + right detail
    const body = document.createElement('div');
    body.style.cssText = 'display:flex;flex:1;overflow:hidden;border-top:1px solid #c8b494';

    // Left panel (item list)
    listPanel = document.createElement('div');
    listPanel.style.cssText = 'width:180px;min-width:140px;overflow-y:auto;border-right:2px solid #a08060;padding:4px 0';
    body.appendChild(listPanel);

    // Right panel (detail view)
    detailPanel = document.createElement('div');
    detailPanel.style.cssText = 'flex:1;overflow-y:auto;padding:8px 12px';
    body.appendChild(detailPanel);

    panel.appendChild(body);

    // Initialize
    populateList(currentCategory);
    const items = getItemList(currentCategory);
    if (currentItemId == null && items.length > 0) {
      currentItemId = items[0].id;
    }
    if (currentItemId != null) {
      selectItem(currentCategory, currentItemId);
      buildDetail(detailPanel, currentCategory, currentItemId, navigate);
    }
  }, [{ label: 'Close' }]);
}
