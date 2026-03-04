// ═══════════════════════════════════════════════════════════════════
// app.js — Glue: file loading, render trigger, tooltip, controls,
//          interactive scrolling viewport
// ═══════════════════════════════════════════════════════════════════

const files = { sav: null, t1: null, t2: null, cities: null, units: null, icons: null, people: null, cityGif: null };
const cvFiles = {};   // cv_res*.gif files for city view (keyed by resource ID)
let cvSprites = null; // lazily extracted city view sprites
let cvBackgrounds = null; // Map of resourceId → Image
let currentMapData = null;
let cdSprites = null;
let mapSprites = null;

// ── Viewport state ──
let vpX = 0, vpY = 0;         // top-left of viewport in offscreen coords
let offW = 0, offH = 0;       // offscreen canvas dimensions
let wrapW = 0;                 // tile-aligned wrap width (mw * TW, excludes stagger)
let wraps = false;             // true for round earth maps (east-west wrap)
const SCROLL_STEP = 64;       // pixels per arrow key press

// ── Auto-detect files in same directory ──
// Requires serving via HTTP (e.g. python3 -m http.server). Silently skipped on file://.
(async function autoDetect() {
  if (location.protocol === 'file:') return;

  // Known GIF files
  const known = [
    { name: 'TERRAIN1.GIF', key: 't1',     btnId: 't1-btn',     label: 'TERRAIN1 \u2713 ' },
    { name: 'TERRAIN2.GIF', key: 't2',     btnId: 't2-btn',     label: 'TERRAIN2 \u2713 ' },
    { name: 'CITIES.GIF',   key: 'cities', btnId: 'cities-btn', label: 'CITIES \u2713 ' },
    { name: 'UNITS.GIF',    key: 'units',  btnId: 'units-btn',  label: 'UNITS \u2713 ' },
    { name: 'ICONS.GIF',    key: 'icons',  btnId: 'icons-btn',  label: 'ICONS \u2713 ' },
    { name: 'PEOPLE.GIF',   key: 'people', btnId: 'people-btn', label: 'PEOPLE \u2713 ' },
    { name: 'CITY.GIF',    key: 'cityGif', btnId: 'city-btn',  label: 'CITY \u2713 ' },
  ];
  await Promise.all(known.map(async ({ name, key, btnId, label }) => {
    try {
      const resp = await fetch(name);
      if (!resp.ok) return;
      const blob = await resp.blob();
      files[key] = new File([blob], name, { type: blob.type });
      document.getElementById(btnId).classList.add('loaded');
      document.getElementById(btnId).childNodes[0].textContent = label;
    } catch (_) {}
  }));

  // City view GIFs (optional, silent)
  const cvKnown = [
    { name: 'cv_res300.gif', id: 300 }, { name: 'cv_res305.gif', id: 305 },
    { name: 'cv_res310.gif', id: 310 },
    { name: 'cv_res340.gif', id: 340 }, { name: 'cv_res341.gif', id: 341 },
    { name: 'cv_res342.gif', id: 342 }, { name: 'cv_res343.gif', id: 343 },
    { name: 'cv_res345.gif', id: 345 }, { name: 'cv_res346.gif', id: 346 },
    { name: 'cv_res347.gif', id: 347 }, { name: 'cv_res348.gif', id: 348 },
    { name: 'cv_res350.gif', id: 350 }, { name: 'cv_res351.gif', id: 351 },
    { name: 'cv_res352.gif', id: 352 }, { name: 'cv_res353.gif', id: 353 },
  ];
  await Promise.all(cvKnown.map(async ({ name, id }) => {
    try {
      const resp = await fetch(name);
      if (!resp.ok) return;
      const blob = await resp.blob();
      cvFiles[id] = new File([blob], name, { type: blob.type });
    } catch (_) {}
  }));

  // Find first .sav/.scn/.net via directory listing
  try {
    const resp = await fetch('./');
    if (resp.ok) {
      const html = await resp.text();
      const re = /href="([^"]+\.(?:sav|SAV|scn|SCN|net|NET))"/g;
      const match = re.exec(html);
      if (match) {
        const savName = match[1];
        const savResp = await fetch(savName);
        if (savResp.ok) {
          const blob = await savResp.blob();
          files.sav = new File([blob], savName, { type: 'application/octet-stream' });
          document.getElementById('sav-btn').classList.add('loaded');
          document.getElementById('sav-btn').childNodes[0].textContent = savName + ' ';
        }
      }
    }
  } catch (_) {}

  checkReady();
})();

// ── File input handlers ──
document.getElementById('sav-input').addEventListener('change', e => {
  files.sav = e.target.files[0];
  document.getElementById('sav-btn').classList.add('loaded');
  document.getElementById('sav-btn').childNodes[0].textContent = files.sav.name + ' ';
  checkReady();
});
document.getElementById('t1-input').addEventListener('change', e => {
  files.t1 = e.target.files[0];
  document.getElementById('t1-btn').classList.add('loaded');
  document.getElementById('t1-btn').childNodes[0].textContent = 'TERRAIN1 ✓ ';
  checkReady();
});
document.getElementById('t2-input').addEventListener('change', e => {
  files.t2 = e.target.files[0];
  document.getElementById('t2-btn').classList.add('loaded');
  document.getElementById('t2-btn').childNodes[0].textContent = 'TERRAIN2 ✓ ';
  checkReady();
});
document.getElementById('cities-input').addEventListener('change', e => {
  files.cities = e.target.files[0];
  document.getElementById('cities-btn').classList.add('loaded');
  document.getElementById('cities-btn').childNodes[0].textContent = 'CITIES ✓ ';
  checkReady();
});
document.getElementById('units-input').addEventListener('change', e => {
  files.units = e.target.files[0];
  document.getElementById('units-btn').classList.add('loaded');
  document.getElementById('units-btn').childNodes[0].textContent = 'UNITS ✓ ';
  checkReady();
});
document.getElementById('icons-input').addEventListener('change', e => {
  files.icons = e.target.files[0];
  document.getElementById('icons-btn').classList.add('loaded');
  document.getElementById('icons-btn').childNodes[0].textContent = 'ICONS ✓ ';
  checkReady();
});
document.getElementById('people-input').addEventListener('change', e => {
  files.people = e.target.files[0];
  document.getElementById('people-btn').classList.add('loaded');
  document.getElementById('people-btn').childNodes[0].textContent = 'PEOPLE ✓ ';
  checkReady();
});
document.getElementById('city-input').addEventListener('change', e => {
  files.cityGif = e.target.files[0];
  document.getElementById('city-btn').classList.add('loaded');
  document.getElementById('city-btn').childNodes[0].textContent = 'CITY ✓ ';
  checkReady();
});

function checkReady() {
  const ready = files.sav && files.t1 && files.t2;
  document.getElementById('render-btn').disabled = !ready;
  if (ready) {
    const optionalNote = [
      !files.cities && 'CITIES.GIF',
      !files.units && 'UNITS.GIF'
    ].filter(Boolean).join(', ');
    const suffix = optionalNote ? ` (${optionalNote} optional)` : '';
    document.getElementById('status').textContent = 'Ready — click Render Map.' + suffix;
  }
}

document.getElementById('render-btn').addEventListener('click', doRender);

// FOW toggle/civ change/grid toggle → auto re-render if map already loaded
document.getElementById('fow-toggle').addEventListener('change', () => { if (currentMapData) doRender(); });
document.getElementById('fow-civ').addEventListener('change', () => { if (currentMapData) doRender(); });
document.getElementById('grid-toggle').addEventListener('change', () => { if (currentMapData) doRender(); });

// ── Main render flow ──
let rendering = false;
async function doRender() {
  if (rendering) return;
  rendering = true;
  const overlay = document.getElementById('loading-overlay');
  const msg = document.getElementById('loading-msg');
  overlay.style.display = 'flex';

  try {
    // 1. Load binary save data
    msg.textContent = 'Loading save file...';
    const savBuf = new Uint8Array(await files.sav.arrayBuffer());

    // 2. Parse it
    msg.textContent = 'Parsing save file...';
    await new Promise(r => setTimeout(r, 10));
    const mapData = Civ2Parser.parse(savBuf, files.sav.name);
    currentMapData = mapData;

    // Populate FOW civ selector
    const fowSelect = document.getElementById('fow-civ');
    const previousValue = fowSelect.value;  // save user's selection BEFORE clearing
    fowSelect.innerHTML = '';
    // Resolve civ names: save-file tribeName > LEADERS.TXT by rulesCivNumber > slot label
    const LEADERS_TXT_NAMES = [
      'Romans','Babylonians','Germans','Egyptians','Americans','Greeks','Indians','Russians',
      'Zulus','French','Aztecs','Chinese','English','Mongols','Celts','Japanese','Vikings',
      'Spanish','Persians','Carthaginians','Sioux'
    ];
    const civNames = {};
    for (let i = 0; i < 8; i++) {
      const nb = mapData.civNameBlocks && mapData.civNameBlocks[i];
      const cd = mapData.civData && mapData.civData[i];
      const tribeName = nb && nb.tribeName;
      const rulesName = cd && cd.rulesCivNumber != null && LEADERS_TXT_NAMES[cd.rulesCivNumber];
      civNames[i] = i === 0 ? 'Barbarians' : (tribeName || rulesName || `Civ ${i}`);
    }
    mapData.civNames = civNames;
    for (let i = 0; i < 8; i++) {
      if (!(mapData.civsAlive & (1 << i))) continue;
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = civNames[i];
      fowSelect.appendChild(opt);
    }
    // Restore previous selection if valid, otherwise default to playerCiv
    if (previousValue !== '' && [...fowSelect.options].some(o => o.value === previousValue)) {
      fowSelect.value = previousValue;
    } else {
      fowSelect.value = mapData.playerCiv;
    }
    fowSelect.disabled = false;

    cdSprites = null;

    // 3. Load sprite sheets
    msg.textContent = 'Loading sprite sheets...';
    const imgPromises = [
      Civ2Renderer.loadImage(files.t1),
      Civ2Renderer.loadImage(files.t2)
    ];
    if (files.cities) imgPromises.push(Civ2Renderer.loadImage(files.cities));
    if (files.units) imgPromises.push(Civ2Renderer.loadImage(files.units));
    const imgs = await Promise.all(imgPromises);
    const t1Img = imgs[0], t2Img = imgs[1];
    let idx = 2;
    const citiesImg = files.cities ? imgs[idx++] : null;
    const unitsImg = files.units ? imgs[idx++] : null;

    // 4. Extract sprites
    msg.textContent = 'Extracting sprites...';
    await new Promise(r => setTimeout(r, 10));
    const t1Ctx = Civ2Renderer.imgToCtx(t1Img);
    const t2Ctx = Civ2Renderer.imgToCtx(t2Img);
    const citiesCtx = citiesImg ? Civ2Renderer.imgToCtx(citiesImg) : null;
    const unitsCtx = unitsImg ? Civ2Renderer.imgToCtx(unitsImg) : null;
    const sprites = Civ2Renderer.extractAllSprites(t1Ctx, t2Ctx, citiesCtx, unitsCtx);
    mapSprites = sprites;

    // 5. Render to offscreen canvas (#map-canvas, hidden)
    const canvas = document.getElementById('map-canvas');
    const fowEnabled = document.getElementById('fow-toggle').checked;
    const fowCivVal = document.getElementById('fow-civ').value;
    const gridEnabled = document.getElementById('grid-toggle').checked;
    const renderOptions = {
      fowEnabled,
      fowCiv: fowCivVal !== '' ? parseInt(fowCivVal) : mapData.playerCiv,
      gridEnabled
    };
    const result = await Civ2Renderer.render(canvas, mapData, sprites, m => { msg.textContent = m; }, renderOptions);

    // 6. Set up viewport
    offW = canvas.width;
    offH = canvas.height;
    wraps = (mapData.mapShape === 0);  // 0 = round earth (wraps), 1 = flat
    wrapW = result.wrapW || offW;     // tile-aligned wrap width from renderer
    resizeViewport();
    drawViewport();

    // 7. Done
    document.getElementById('status').textContent =
      `${mapData.mw}×${mapData.mh} tiles | ${mapData.cities.length} cities | ` +
      `${mapData.units.length} units | ${result.displayW || result.canvasW}×${result.canvasH}px | ` +
      `Ocean: ${mapData.oceanPct}%`;

    setTimeout(() => { overlay.style.display = 'none'; }, 200);

  } catch (err) {
    console.error(err);
    alert('Error: ' + err.message);
    overlay.style.display = 'none';
  } finally {
    rendering = false;
  }
}

// ═══════════════════════════════════════════════════════════════════
// VIEWPORT — blit a window from the offscreen canvas
// ═══════════════════════════════════════════════════════════════════
const viewportCanvas = document.getElementById('viewport-canvas');
const vCtx = viewportCanvas.getContext('2d', { colorSpace: 'srgb' });

function resizeViewport() {
  const container = document.getElementById('map-container');
  const vpW = container.clientWidth;
  const vpH = container.clientHeight;
  viewportCanvas.width = vpW;
  viewportCanvas.height = vpH;
  clampViewport();
}

function clampViewport() {
  const vpW = viewportCanvas.width;
  const vpH = viewportCanvas.height;
  // Vertical: always clamp to map bounds
  vpY = Math.max(0, Math.min(vpY, offH - vpH));
  // Horizontal: wrap for round earth, clamp for flat
  if (wraps && wrapW > 0) {
    vpX = ((vpX % wrapW) + wrapW) % wrapW;
  } else {
    vpX = Math.max(0, Math.min(vpX, offW - vpW));
  }
}

function drawViewport() {
  if (offW === 0 || offH === 0) return;
  const offscreen = document.getElementById('map-canvas');
  const vpW = viewportCanvas.width;
  const vpH = viewportCanvas.height;

  vCtx.clearRect(0, 0, vpW, vpH);

  if (wraps) {
    const x1 = ((vpX % wrapW) + wrapW) % wrapW;
    const rightChunk = Math.min(vpW, wrapW - x1);
    vCtx.drawImage(offscreen, x1, vpY, rightChunk, vpH, 0, 0, rightChunk, vpH);
    let drawn = rightChunk;
    while (drawn < vpW) {
      const chunk = Math.min(vpW - drawn, wrapW);
      vCtx.drawImage(offscreen, 0, vpY, chunk, vpH, drawn, 0, chunk, vpH);
      drawn += chunk;
    }
  } else {
    vCtx.drawImage(offscreen, vpX, vpY, vpW, vpH, 0, 0, vpW, vpH);
  }
}

// ── Mouse drag panning ──
let dragging = false;
let dragLastX = 0, dragLastY = 0;
let dragStartX = 0, dragStartY = 0;  // for click vs drag detection

viewportCanvas.addEventListener('mousedown', e => {
  if (e.button !== 0) return;  // left click only
  dragging = true;
  dragLastX = dragStartX = e.clientX;
  dragLastY = dragStartY = e.clientY;
  viewportCanvas.classList.add('dragging');
});

window.addEventListener('mousemove', e => {
  if (!dragging) return;
  const dx = e.clientX - dragLastX;
  const dy = e.clientY - dragLastY;
  dragLastX = e.clientX;
  dragLastY = e.clientY;
  vpX -= dx;
  vpY -= dy;
  clampViewport();
  drawViewport();
});

window.addEventListener('mouseup', e => {
  if (!dragging) return;
  dragging = false;
  viewportCanvas.classList.remove('dragging');
  // Click detection: if drag distance < 5px, treat as click
  const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
  if (dist < 5) handleMapClick(e);
});

// ── Keyboard panning ──
const keysDown = new Set();
let keyScrollRAF = null;

window.addEventListener('keydown', e => {
  // Escape closes city dialog first, then city view overlay
  if (e.key === 'Escape') {
    if (document.getElementById('citydialog-overlay').style.display === 'flex')
      closeCityDialog();
    else
      closeCityView();
    return;
  }
  if (offW === 0) return;
  const key = e.key;
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(key)) {
    // Don't scroll if user is typing in an input/select
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
    e.preventDefault();
    keysDown.add(key);
    if (!keyScrollRAF) keyScrollLoop();
  }
});

window.addEventListener('keyup', e => {
  keysDown.delete(e.key);
  if (keysDown.size === 0 && keyScrollRAF) {
    cancelAnimationFrame(keyScrollRAF);
    keyScrollRAF = null;
  }
});

function keyScrollLoop() {
  let dx = 0, dy = 0;
  if (keysDown.has('ArrowLeft')  || keysDown.has('a')) dx -= SCROLL_STEP;
  if (keysDown.has('ArrowRight') || keysDown.has('d')) dx += SCROLL_STEP;
  if (keysDown.has('ArrowUp')    || keysDown.has('w')) dy -= SCROLL_STEP;
  if (keysDown.has('ArrowDown')  || keysDown.has('s')) dy += SCROLL_STEP;
  if (dx || dy) {
    vpX += dx;
    vpY += dy;
    clampViewport();
    drawViewport();
  }
  keyScrollRAF = requestAnimationFrame(keyScrollLoop);
}

// ── Window resize ──
window.addEventListener('resize', () => {
  resizeViewport();
  drawViewport();
});

// ═══════════════════════════════════════════════════════════════════
// TOOLTIP — hover over map to see tile info
// ═══════════════════════════════════════════════════════════════════
const tooltip = document.getElementById('tooltip');

viewportCanvas.addEventListener('mousemove', e => {
  if (dragging) { tooltip.style.display = 'none'; return; }
  if (!currentMapData) return;

  const rect = viewportCanvas.getBoundingClientRect();
  // Viewport canvas pixels are 1:1 with CSS size (no scaling)
  const localX = e.clientX - rect.left;
  const localY = e.clientY - rect.top;
  // Translate to offscreen (full map) coordinates
  let mx = localX + vpX;
  let my = localY + vpY;
  // Handle wrapping
  if (wraps && wrapW > 0) mx = ((mx % wrapW) + wrapW) % wrapW;

  const md = currentMapData;
  const TW = Civ2Renderer.TW, TH = Civ2Renderer.TH;

  // FOW state for tooltip filtering
  const fowEnabled = document.getElementById('fow-toggle').checked && !md.mapRevealed;
  const fowCivVal = document.getElementById('fow-civ').value;
  const fowCiv = fowCivVal !== '' ? parseInt(fowCivVal) : null;
  const fowBit = (fowEnabled && fowCiv != null) ? (1 << fowCiv) : 0;

  // Find which tile the mouse is over
  const approxGy = Math.floor(my / (TH >> 1));
  let found = null;

  for (let gy = Math.max(0, approxGy - 1); gy <= Math.min(md.mh - 1, approxGy + 1); gy++) {
    for (let gx = 0; gx < md.mw; gx++) {
      const px = gx * TW + ((gy % 2) ? (TW >> 1) : 0);
      const py = gy * (TH >> 1);
      if (mx >= px && mx < px + TW && my >= py && my < py + TH) {
        const dx = mx - px - TW / 2;
        const dy = my - py - TH / 2;
        if (Math.abs(dx) / (TW / 2) + Math.abs(dy) / (TH / 2) <= 1) {
          found = { gx, gy };
        }
      }
    }
  }

  if (found) {
    const { gx, gy } = found;

    // FOW visibility check — unexplored tiles show minimal info
    if (fowEnabled && fowBit) {
      const vis = md.getVisibility(gx, gy);
      const known = md.getKnownImprovements(gx, gy, fowCiv);
      if (!vis && !known) {
        tooltip.textContent = `(${gx * 2 + (gy % 2)}, ${gy})  Unexplored`;
        tooltip.style.display = 'block';
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top = (e.clientY + 14) + 'px';
        return;
      }
    }

    const ter = md.getTerrain(gx, gy);
    const vis = md.getVisibility(gx, gy);
    const river = md.hasRiver(gx, gy);
    const res = md.getResource(gx, gy);
    // Use known improvements on dimmed tiles when FOW is active
    const tileVisible = !fowBit || (vis & fowBit);
    const imp = (fowEnabled && fowBit && !tileVisible)
      ? md.getKnownImprovements(gx, gy, fowCiv)
      : md.getImprovements(gx, gy);

    const RESOURCE_NAMES = [
      ['Oasis','Desert Oil'],['Buffalo','Wheat'],['Grassland Shield','Grassland Resource'],
      ['Pheasant','Silk'],['Coal','Wine'],['Gold','Iron'],['Game','Furs'],['Ivory','Oil'],
      ['Peat','Spice'],['Gems','Fruit'],['Fish','Whales']
    ];
    const GOVERNMENT_NAMES = ['Anarchy','Despotism','Monarchy','Communism','Fundamentalism','Republic','Democracy'];
    const COMMODITY_NAMES = ['Hides','Wool','Beads','Cloth','Salt','Coal','Copper','Dye',
      'Wine','Silk','Silver','Spice','Gems','Gold','Oil','Uranium'];
    const terName = Civ2Renderer.TERRAIN_NAMES[ter] || '?';
    let info = `(${gx * 2 + (gy % 2)}, ${gy})  ${terName}`;
    if (river) info += ' + River';
    if (res === 1) info += ` [${(RESOURCE_NAMES[ter] || [])[0] || 'Resource 1'}]`;
    if (res === 2) info += ` [${(RESOURCE_NAMES[ter] || [])[1] || 'Resource 2'}]`;
    if (md.hasGoodyHut && md.hasGoodyHut(gx, gy)) info += ' [Goody Hut]';

    const impParts = [];
    if ((imp & 0x0C) === 0x0C) impParts.push('Farmland');
    else { if (imp & 0x04) impParts.push('Irrigation'); if (imp & 0x08) impParts.push('Mining'); }
    if (imp & 0x10) impParts.push('Road');
    if (imp & 0x20) impParts.push('Railroad');
    if ((imp & 0x42) === 0x42 && !md.cities.some(c => c.gx === gx && c.gy === gy)) impParts.push('Airbase');
    else if (imp & 0x40) impParts.push('Fortress');
    if (imp & 0x80) impParts.push('Pollution');
    if (impParts.length) info += '\n' + impParts.join(', ');

    // Check for city at this location
    for (const c of md.cities) {
      if (c.gx === gx && c.gy === gy) {
        // FOW: skip cities the selected civ doesn't know about
        if (fowEnabled && fowBit) {
          const cityKnown = (c.knownToTribes != null) ? !!(c.knownToTribes & fowBit) : !!(imp & 0x02);
          if (!cityKnown) continue;
        }
        const displaySize = (fowEnabled && fowBit && !tileVisible)
          ? c.believedSize[fowCiv] : c.size;
        const epoch = md.civTechs ? Civ2Renderer._getEpoch(md.civTechs[c.owner]) : 0;
        const epochNames = ['Ancient','Renaissance','Industrial','Modern'];
        const styleNames = ['Bronze','Classical','Far East','Medieval'];
        const cityOwner = (md.civNames && md.civNames[c.owner]) || `Civ ${c.owner}`;
        const govName = (md.civData && md.civData[c.owner]) ? GOVERNMENT_NAMES[md.civData[c.owner].government] || '' : '';
        info += `\n${c.name} (${cityOwner}, size ${displaySize}, ${epochNames[epoch]}${govName ? ', ' + govName : ''}${c.hasWalls ? ', walled' : ''}${c.hasPalace ? ', capital' : ''}`;
        if (c.isOccupied) {
          const origOwner = (md.civNames && md.civNames[c.originalOwner]) || `Civ ${c.originalOwner}`;
          info += `, occupied (was ${origOwner})`;
        }
        if (c.civilDisorder) info += ', DISORDER';
        if (c.weLoveKingDay) info += ', WLTKD';
        info += ')';
        break;
      }
    }

    // Check for units at this location — skip invisible units when FOW active
    for (const u of md.units) {
      if (u.gx !== gx || u.gy !== gy) continue;
      if (fowEnabled && fowBit) {
        if (!(vis & fowBit)) continue;  // tile not currently visible
        if (u.owner !== fowCiv && u.visFlag != null && !(u.visFlag & fowBit)) continue;  // unit not visible to civ (own units always visible)
      }
      const ORDER_NAMES = {0:'',1:'Fortifying',2:'Fortified',3:'Sleep',4:'Build Fortress',
        5:'Build Road',6:'Build Irrigation',7:'Build Mine',8:'Transform',9:'Clean Pollution',
        10:'Build Airbase',11:'GoTo',255:''};
      const name = Civ2Renderer.UNIT_NAMES[u.type] || `Unit#${u.type}`;
      const owner = (md.civNames && md.civNames[u.owner]) || `Civ ${u.owner}`;
      const vetStr = u.veteran ? ' Vet' : '';
      const ordStr = ORDER_NAMES[u.orders] || `orders:${u.orders}`;
      const dmgStr = u.hpLost > 0 ? `, dmg ${u.hpLost}` : '';
      const cargoStr = (u.type === 48 || u.type === 49) && u.cargoWorkFuel >= 0 && u.cargoWorkFuel <= 15
        ? `, cargo: ${COMMODITY_NAMES[u.cargoWorkFuel]}` : '';
      info += `\n[Unit] ${name}${vetStr} (${owner}${dmgStr}${cargoStr}${ordStr ? ', ' + ordStr : ''})`;
    }

    tooltip.textContent = info;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top = (e.clientY + 14) + 'px';
  } else {
    tooltip.style.display = 'none';
  }
});

viewportCanvas.addEventListener('mouseleave', () => {
  tooltip.style.display = 'none';
});

// ═══════════════════════════════════════════════════════════════════
// CITY VIEW — click on city to open panoramic view overlay
// ═══════════════════════════════════════════════════════════════════

function findTileAt(clientX, clientY) {
  if (!currentMapData) return null;
  const rect = viewportCanvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  let mx = localX + vpX;
  let my = localY + vpY;
  if (wraps && wrapW > 0) mx = ((mx % wrapW) + wrapW) % wrapW;

  const md = currentMapData;
  const TW = Civ2Renderer.TW, TH = Civ2Renderer.TH;
  const approxGy = Math.floor(my / (TH >> 1));

  for (let gy = Math.max(0, approxGy - 1); gy <= Math.min(md.mh - 1, approxGy + 1); gy++) {
    for (let gx = 0; gx < md.mw; gx++) {
      const px = gx * TW + ((gy % 2) ? (TW >> 1) : 0);
      const py = gy * (TH >> 1);
      if (mx >= px && mx < px + TW && my >= py && my < py + TH) {
        const dx = mx - px - TW / 2;
        const dy = my - py - TH / 2;
        if (Math.abs(dx) / (TW / 2) + Math.abs(dy) / (TH / 2) <= 1) {
          return { gx, gy };
        }
      }
    }
  }
  return null;
}

function findCityAt(gx, gy) {
  if (!currentMapData) return null;
  for (let i = 0; i < currentMapData.cities.length; i++) {
    const c = currentMapData.cities[i];
    if (c.gx === gx && c.gy === gy) return { city: c, index: i };
  }
  return null;
}

async function ensureCvSprites() {
  if (cvSprites) return true;
  // Need all three sprite sheets
  if (!cvFiles[300] || !cvFiles[305] || !cvFiles[310]) return false;

  const [improvImg, wondersImg, altImg] = await Promise.all([
    Civ2Renderer.loadImage(cvFiles[300]),
    Civ2Renderer.loadImage(cvFiles[305]),
    Civ2Renderer.loadImage(cvFiles[310]),
  ]);
  cvSprites = Civ2CityView.extractSprites(
    Civ2Renderer.imgToCtx(improvImg),
    Civ2Renderer.imgToCtx(wondersImg),
    Civ2Renderer.imgToCtx(altImg)
  );

  // Load backgrounds
  cvBackgrounds = new Map();
  const bgIds = [340,341,342,343,345,346,347,348,350,351,352,353];
  await Promise.all(bgIds.map(async id => {
    if (!cvFiles[id]) return;
    const img = await Civ2Renderer.loadImage(cvFiles[id]);
    cvBackgrounds.set(id, img);
  }));

  return true;
}

async function ensureCdSprites() {
  if (cdSprites) return true;
  if (!files.icons || !files.people) return false;
  const imgPromises = [
    Civ2Renderer.loadImage(files.icons),
    Civ2Renderer.loadImage(files.people),
  ];
  if (files.cityGif) imgPromises.push(Civ2Renderer.loadImage(files.cityGif));
  const imgs = await Promise.all(imgPromises);
  const iconsCtx = Civ2Renderer.imgToCtx(imgs[0]);
  const peopleCtx = Civ2Renderer.imgToCtx(imgs[1]);
  const cityGifCtx = files.cityGif ? Civ2Renderer.imgToCtx(imgs[2]) : null;
  cdSprites = Civ2CityDialog.extractSprites(iconsCtx, peopleCtx, cityGifCtx);
  return true;
}

async function handleMapClick(e) {
  const tile = findTileAt(e.clientX, e.clientY);
  if (!tile) return;
  const hit = findCityAt(tile.gx, tile.gy);
  if (!hit) return;
  openCityDialog(hit.city, hit.index);
}

async function openCityDialog(city, cityIndex) {
  const ready = await ensureCdSprites();
  if (!ready) {
    alert('City dialog requires ICONS.GIF and PEOPLE.GIF. Load them and try again.');
    return;
  }
  const canvas = document.getElementById('citydialog-canvas');
  const regions = Civ2CityDialog.render(canvas, city, cityIndex, currentMapData, cdSprites, mapSprites);
  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const sx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const sy = (e.clientY - rect.top) * (canvas.height / rect.height);
    const result = Civ2CityDialog.handleClick(sx, sy, regions);
    if (result && result.action === 'exit') {
      closeCityDialog();
    } else if (result && result.action === 'info') {
      // Re-render to show new info panel mode
      Civ2CityDialog.render(canvas, city, cityIndex, currentMapData, cdSprites, mapSprites);
    } else if (result && result.action === 'panorama') {
      closeCityDialog();
      ensureCvSprites().then(ok => {
        if (!ok) return;
        const cvCanvas = document.getElementById('cityview-canvas');
        Civ2CityView.render(cvCanvas, city, cityIndex, currentMapData, cvSprites, cvBackgrounds);
        document.getElementById('cityview-overlay').style.display = 'flex';
      });
    }
  };
  document.getElementById('citydialog-overlay').style.display = 'flex';
}

function closeCityDialog() {
  document.getElementById('citydialog-overlay').style.display = 'none';
}

function closeCityView() {
  document.getElementById('cityview-overlay').style.display = 'none';
}

document.getElementById('citydialog-backdrop').addEventListener('click', closeCityDialog);
document.getElementById('citydialog-close').addEventListener('click', closeCityDialog);
document.getElementById('cityview-backdrop').addEventListener('click', closeCityView);
document.getElementById('cityview-close').addEventListener('click', closeCityView);
