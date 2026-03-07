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
let vpScale = 1;              // zoom factor (1 = 1:1, >1 = zoomed in)
const VP_MIN_SCALE = 0.25;
const VP_MAX_SCALE = 4;

// ── Auto-detect files in same directory ──
// Requires serving via HTTP (e.g. python3 -m http.server). Silently skipped on file://.
(async function autoDetect() {
  if (location.protocol === 'file:') return;

  // Known GIF files
  const known = [
    { name: 'assets/sprites/TERRAIN1.GIF', key: 't1',     btnId: 't1-btn',     label: 'TERRAIN1 \u2713 ' },
    { name: 'assets/sprites/TERRAIN2.GIF', key: 't2',     btnId: 't2-btn',     label: 'TERRAIN2 \u2713 ' },
    { name: 'assets/sprites/CITIES.GIF',   key: 'cities', btnId: 'cities-btn', label: 'CITIES \u2713 ' },
    { name: 'assets/sprites/UNITS.GIF',    key: 'units',  btnId: 'units-btn',  label: 'UNITS \u2713 ' },
    { name: 'assets/sprites/ICONS.GIF',    key: 'icons',  btnId: 'icons-btn',  label: 'ICONS \u2713 ' },
    { name: 'assets/sprites/PEOPLE.GIF',   key: 'people', btnId: 'people-btn', label: 'PEOPLE \u2713 ' },
    { name: 'assets/sprites/CITY.GIF',    key: 'cityGif', btnId: 'city-btn',  label: 'CITY \u2713 ' },
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
    { name: 'assets/cityview/cv_res300.gif', id: 300 }, { name: 'assets/cityview/cv_res305.gif', id: 305 },
    { name: 'assets/cityview/cv_res310.gif', id: 310 },
    { name: 'assets/cityview/cv_res340.gif', id: 340 }, { name: 'assets/cityview/cv_res341.gif', id: 341 },
    { name: 'assets/cityview/cv_res342.gif', id: 342 }, { name: 'assets/cityview/cv_res343.gif', id: 343 },
    { name: 'assets/cityview/cv_res345.gif', id: 345 }, { name: 'assets/cityview/cv_res346.gif', id: 346 },
    { name: 'assets/cityview/cv_res347.gif', id: 347 }, { name: 'assets/cityview/cv_res348.gif', id: 348 },
    { name: 'assets/cityview/cv_res350.gif', id: 350 }, { name: 'assets/cityview/cv_res351.gif', id: 351 },
    { name: 'assets/cityview/cv_res352.gif', id: 352 }, { name: 'assets/cityview/cv_res353.gif', id: 353 },
  ];
  await Promise.all(cvKnown.map(async ({ name, id }) => {
    try {
      const resp = await fetch(name);
      if (!resp.ok) return;
      const blob = await resp.blob();
      cvFiles[id] = new File([blob], name, { type: blob.type });
    } catch (_) {}
  }));

  // Find first .sav/.scn/.net via directory listing in saves/
  try {
    const resp = await fetch('saves/');
    if (resp.ok) {
      const html = await resp.text();
      const re = /href="([^"]+\.(?:sav|SAV|scn|SCN|net|NET))"/g;
      const match = re.exec(html);
      if (match) {
        const savName = 'saves/' + match[1];
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
let vpLogicalW = 0, vpLogicalH = 0;  // CSS/logical dimensions (for viewport math)

function resizeViewport() {
  const container = document.getElementById('map-container');
  const dpr = window.devicePixelRatio || 1;
  vpLogicalW = container.clientWidth;
  vpLogicalH = container.clientHeight;
  viewportCanvas.width = vpLogicalW * dpr;
  viewportCanvas.height = vpLogicalH * dpr;
  viewportCanvas.style.width = vpLogicalW + 'px';
  viewportCanvas.style.height = vpLogicalH + 'px';
  vCtx.imageSmoothingEnabled = false;
  clampViewport();
}

function clampViewport() {
  const visW = vpLogicalW / vpScale;
  const visH = vpLogicalH / vpScale;
  // Vertical: always clamp to map bounds
  vpY = Math.max(0, Math.min(vpY, offH - visH));
  // Horizontal: wrap for round earth, clamp for flat
  if (wraps && wrapW > 0) {
    vpX = ((vpX % wrapW) + wrapW) % wrapW;
  } else {
    vpX = Math.max(0, Math.min(vpX, offW - visW));
  }
}

function drawViewport() {
  if (offW === 0 || offH === 0) return;
  const offscreen = document.getElementById('map-canvas');
  const dpr = window.devicePixelRatio || 1;
  const bw = viewportCanvas.width, bh = viewportCanvas.height;
  const visW = vpLogicalW / vpScale;   // visible map width in map pixels
  const visH = vpLogicalH / vpScale;   // visible map height in map pixels
  const pxPerMap = vpScale * dpr;       // dest pixels per map pixel

  vCtx.clearRect(0, 0, bw, bh);

  if (wraps) {
    const x1 = ((vpX % wrapW) + wrapW) % wrapW;
    const rightChunk = Math.min(visW, wrapW - x1);
    vCtx.drawImage(offscreen, x1, vpY, rightChunk, visH,
                   0, 0, rightChunk * pxPerMap, bh);
    let drawn = rightChunk;
    while (drawn < visW) {
      const chunk = Math.min(visW - drawn, wrapW);
      vCtx.drawImage(offscreen, 0, vpY, chunk, visH,
                     drawn * pxPerMap, 0, chunk * pxPerMap, bh);
      drawn += chunk;
    }
  } else {
    vCtx.drawImage(offscreen, vpX, vpY, visW, visH, 0, 0, bw, bh);
  }
}

// ═══════════════════════════════════════════════════════════════════
// CITY VIEW — click on city to open panoramic view overlay
// ═══════════════════════════════════════════════════════════════════

function findTileAt(clientX, clientY) {
  if (!currentMapData) return null;
  const rect = viewportCanvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  let mx = localX / vpScale + vpX;
  let my = localY / vpScale + vpY;
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
    const dpr = window.devicePixelRatio || 1;
    const sx = (e.clientX - rect.left) * (canvas.width / rect.width) / dpr;
    const sy = (e.clientY - rect.top) * (canvas.height / rect.height) / dpr;
    const F = Civ2CityDialog.FRAME;
    const cx = sx - F.contentX;
    const cy = sy - F.contentY;
    const result = Civ2CityDialog.handleClick(cx, cy, regions);
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
