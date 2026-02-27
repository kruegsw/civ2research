// ═══════════════════════════════════════════════════════════════════
// app.js — Glue: file loading, render trigger, tooltip, controls
// ═══════════════════════════════════════════════════════════════════

const files = { sav: null, t1: null, t2: null };
let currentMapData = null;

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

function checkReady() {
  const ready = files.sav && files.t1 && files.t2;
  document.getElementById('render-btn').disabled = !ready;
  if (ready) document.getElementById('status').textContent = 'Ready — click Render Map.';
}

document.getElementById('render-btn').addEventListener('click', doRender);

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

    // 3. Load sprite sheets
    msg.textContent = 'Loading sprite sheets...';
    const [t1Img, t2Img] = await Promise.all([
      Civ2Renderer.loadImage(files.t1),
      Civ2Renderer.loadImage(files.t2)
    ]);

    // 4. Extract sprites
    msg.textContent = 'Extracting sprites...';
    await new Promise(r => setTimeout(r, 10));
    const t1Ctx = Civ2Renderer.imgToCtx(t1Img);
    const t2Ctx = Civ2Renderer.imgToCtx(t2Img);
    const sprites = Civ2Renderer.extractAllSprites(t1Ctx, t2Ctx);

    // 5. Render to canvas
    const canvas = document.getElementById('map-canvas');
    const result = await Civ2Renderer.render(canvas, mapData, sprites, m => { msg.textContent = m; });

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
        info += `\n${c.name} (size ${c.size}, owner ${c.owner})`;
        break;
      }
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
