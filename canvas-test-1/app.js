// ═══════════════════════════════════════════════════════════════════
// app.js — Glue: file loading, render trigger, tooltip, controls
// ═══════════════════════════════════════════════════════════════════

const files = { sav: null, t1: null, t2: null, cities: null, units: null };
let currentMapData = null;

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

// FOW toggle/civ change → auto re-render if map already loaded
document.getElementById('fow-toggle').addEventListener('change', () => { if (currentMapData) doRender(); });
document.getElementById('fow-civ').addEventListener('change', () => { if (currentMapData) doRender(); });

// ── Main render flow ──
async function doRender() {
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
    fowSelect.innerHTML = '';
    const civNames = Civ2Renderer._identifyCivs(mapData.cities);
    mapData.civNames = civNames;
    for (let i = 0; i < 8; i++) {
      if (!(mapData.civsAlive & (1 << i))) continue;
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = civNames[i] || `Civ ${i}`;
      fowSelect.appendChild(opt);
    }
    fowSelect.value = mapData.playerCiv;
    fowSelect.disabled = false;

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

    // 5. Render to canvas
    const canvas = document.getElementById('map-canvas');
    const fowEnabled = document.getElementById('fow-toggle').checked;
    const fowCivVal = document.getElementById('fow-civ').value;
    const renderOptions = {
      fowEnabled,
      fowCiv: fowCivVal !== '' ? parseInt(fowCivVal) : mapData.playerCiv
    };
    const result = await Civ2Renderer.render(canvas, mapData, sprites, m => { msg.textContent = m; }, renderOptions);

    // 6. Done
    document.getElementById('status').textContent =
      `${mapData.mw}×${mapData.mh} tiles | ${mapData.cities.length} cities | ` +
      `${mapData.units.length} units | ${result.canvasW}×${result.canvasH}px | ` +
      `Ocean: ${mapData.oceanPct}%`;

    setTimeout(() => { overlay.style.display = 'none'; }, 200);

  } catch (err) {
    console.error(err);
    alert('Error: ' + err.message);
    overlay.style.display = 'none';
  }
}

// ═══════════════════════════════════════════════════════════════════
// TOOLTIP — hover over map to see tile info
// ═══════════════════════════════════════════════════════════════════
const tooltip = document.getElementById('tooltip');
const mapCanvas = document.getElementById('map-canvas');

mapCanvas.addEventListener('mousemove', e => {
  if (!currentMapData) return;

  const rect = mapCanvas.getBoundingClientRect();
  const scaleX = mapCanvas.width / rect.width;
  const scaleY = mapCanvas.height / rect.height;
  const mx = (e.clientX - rect.left) * scaleX;
  const my = (e.clientY - rect.top) * scaleY;

  const md = currentMapData;
  const TW = Civ2Renderer.TW, TH = Civ2Renderer.TH;

  // Find which tile the mouse is over
  // Approximate: gy from py, then gx from px adjusted for stagger
  const approxGy = Math.floor(my / (TH >> 1));
  let found = null;

  // Check a few nearby rows for the best match
  for (let gy = Math.max(0, approxGy - 1); gy <= Math.min(md.mh - 1, approxGy + 1); gy++) {
    for (let gx = 0; gx < md.mw; gx++) {
      const px = gx * TW + ((gy % 2) ? (TW >> 1) : 0);
      const py = gy * (TH >> 1);
      // Check if mouse is within this tile's bounding box
      if (mx >= px && mx < px + TW && my >= py && my < py + TH) {
        // Rough diamond check
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
    const ter = md.getTerrain(gx, gy);
    const imp = md.getImprovements(gx, gy);
    const vis = md.getVisibility(gx, gy);
    const river = md.hasRiver(gx, gy);
    const res = md.getResource(gx, gy);

    const terName = Civ2Renderer.TERRAIN_NAMES[ter] || '?';
    let info = `(${gx * 2 + (gy % 2)}, ${gy})  ${terName}`;
    if (river) info += ' + River';
    if (res === 1) info += ' [Resource 1]';
    if (res === 2) info += ' [Resource 2]';

    const impParts = [];
    if (imp & 0x02) impParts.push('City');
    if (imp & 0x04) impParts.push('Irrigation');
    if (imp & 0x08) impParts.push('Mining');
    if (imp & 0x10) impParts.push('Road');
    if (imp & 0x20) impParts.push('Railroad');
    if (imp & 0x40) impParts.push('Fortress');
    if (imp & 0x80) impParts.push('Pollution');
    if (impParts.length) info += '\n' + impParts.join(', ');

    // Check for city at this location
    for (const c of md.cities) {
      if (c.gx === gx && c.gy === gy) {
        info += `\n${c.name} (size ${c.size}, owner ${c.owner}, style ${c.style}${c.hasWalls ? ', walled' : ''})`;
        break;
      }
    }

    // Check for units at this location
    for (const u of md.units) {
      if (u.gx !== gx || u.gy !== gy) continue;
      const name = Civ2Renderer.UNIT_NAMES[u.type] || `Unit#${u.type}`;
      const owner = (md.civNames && md.civNames[u.owner]) || `Civ ${u.owner}`;
      info += `\n[Unit] ${name} (id ${u.type}, ${owner}, hp-${u.hpLost}, orders ${u.orders})`;
    }

    tooltip.textContent = info;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top = (e.clientY + 14) + 'px';
  } else {
    tooltip.style.display = 'none';
  }
});

mapCanvas.addEventListener('mouseleave', () => {
  tooltip.style.display = 'none';
});
