// ═══════════════════════════════════════════════════════════════════
// renderer.js — Civilization II Canvas Map Renderer
// Sprite extraction and multi-pass rendering pipeline
// ═══════════════════════════════════════════════════════════════════

const Civ2Renderer = {

  TW: 64,  // Tile width in pixels
  TH: 32,  // Tile height in pixels

  TERRAIN_NAMES: ['Desert','Plains','Grassland','Forest','Hills','Mountains',
                  'Tundra','Glacier','Swamp','Jungle','Ocean'],

  CIV_COLORS: ['#c80000','#ffffff','#00b400','#3250dc','#f0dc00','#00c8c8','#f08c00','#b400c8'],

  // Clean (text-free) column indices per terrain type in TERRAIN1.GIF
  // Only cols 0 and 1 are consistently free of baked-in text labels
  CLEAN_VARIANTS: [
    [0, 1],  // 0 Desert
    [0, 1],  // 1 Plains
    [0, 1],  // 2 Grassland
    [0, 1],  // 3 Forest
    [0, 1],  // 4 Hills
    [0, 1],  // 5 Mountains
    [0, 1],  // 6 Tundra
    [0, 1],  // 7 Glacier
    [0, 1],  // 8 Swamp
    [0, 1],  // 9 Jungle
    [0, 1],  // 10 Ocean
  ],

  // Standard Civ2 MGE max HP per unit type (RULES.TXT @UNITS field 7)
  UNIT_MAX_HP: [
    10,20,10,10,10,10,10,20,20,20,20,30,20,20,30,10,  // 0-15
    10,10,10,10,20,20,30,10,10,10,10,10,10,10,10,20,  // 16-31
    20,30,30,30,30,40,30,40,30,10,10,20,20,20,20,20,  // 32-47
    10,10,20,30                                         // 48-51
  ],

  // ── Load image from File ──
  loadImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Failed to load ' + file.name)); };
      img.src = url;
    });
  },

  // ── Get a 2D context from an image (for sprite extraction) ──
  imgToCtx(img) {
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return ctx;
  },

  // ── Extract a sprite region, applying chroma key transparency ──
  // chromaColors: array of [r,g,b] colors to make transparent (fuzzy match ±15)
  // killGreen: also remove bright green grid lines
  extractSprite(sheetCtx, sx, sy, w, h, chromaColors, killGreen) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');

    // Clamp to source bounds
    const aw = Math.min(w, sheetCtx.canvas.width - sx);
    const ah = Math.min(h, sheetCtx.canvas.height - sy);
    if (aw <= 0 || ah <= 0) return c;

    const srcData = sheetCtx.getImageData(sx, sy, aw, ah);
    const d = srcData.data;

    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i+1], b = d[i+2];
      // Check each chroma color
      let transparent = false;
      for (const [cr, cg, cb] of chromaColors) {
        if (Math.abs(r - cr) < 15 && Math.abs(g - cg) < 15 && Math.abs(b - cb) < 15) {
          transparent = true; break;
        }
      }
      // Kill bright green grid lines
      if (!transparent && killGreen && g > 200 && r < 100 && b < 100) {
        transparent = true;
      }
      if (transparent) d[i + 3] = 0;
    }

    ctx.putImageData(srcData, 0, 0);
    return c;
  },

  // ═══════════════════════════════════════════════════════════
  // Extract all sprites from the two terrain sheets
  // ═══════════════════════════════════════════════════════════
  extractAllSprites(t1Ctx, t2Ctx, citiesCtx, unitsCtx) {
    // TERRAIN1 chroma: Magenta (255,0,255) idx 253 + Cyan (0,255,255) idx 248 + Gray (135,135,135) idx 255
    const T1 = [[255, 0, 255], [0, 255, 255], [135, 135, 135]];
    // TERRAIN1 for resources: also remove Magenta text labels
    const T1R = [[0, 255, 255], [255, 0, 255], [135, 135, 135]];
    // TERRAIN2 chroma: Magenta (255,0,255) idx 253 + gray corners (~132,132,132) idx 255
    const T2 = [[255, 0, 255], [132, 132, 132]];

    const sprites = {};

    // Base terrain: rows 0-10, extract all clean (text-free) variant columns
    // sprites.terrain[tid][variantIndex] — up to 6 variants per terrain type
    sprites.terrain = [];
    for (let tid = 0; tid < 11; tid++) {
      sprites.terrain[tid] = this.CLEAN_VARIANTS[tid].map(col =>
        this.extractSprite(t1Ctx, col * 65 + 1, tid * 33 + 1, 64, 32, T1, false)
      );
    }

    // Coastline: 8 groups × 4 quadrant pieces (32×16 each)
    // Piece 0=TOP, 1=BOTTOM, 2=LEFT, 3=RIGHT
    sprites.coast = {};
    for (let g = 0; g < 8; g++) {
      sprites.coast[g * 4 + 0] = this.extractSprite(t2Ctx, g*2*33+1,     429, 32, 16, T2, true);
      sprites.coast[g * 4 + 1] = this.extractSprite(t2Ctx, g*2*33+1,     446, 32, 16, T2, true);
      sprites.coast[g * 4 + 2] = this.extractSprite(t2Ctx, g*2*33+1,     463, 32, 16, T2, true);
      sprites.coast[g * 4 + 3] = this.extractSprite(t2Ctx, (g*2+1)*33+1, 463, 32, 16, T2, true);
    }

    // Rivers: rows 2-3, 16 directional masks (4-bit: NE=1 SE=2 SW=4 NW=8)
    sprites.rivers = [];
    for (let i = 0; i < 16; i++) {
      sprites.rivers[i] = this.extractSprite(t2Ctx, (i%8)*65+1, (Math.floor(i/8)+2)*33+1, 64, 32, T2, true);
    }

    // River mouths: row 10, cols 0-3 (NE, SE, SW, NW)
    sprites.mouths = [];
    for (let col = 0; col < 4; col++) {
      sprites.mouths[col] = this.extractSprite(t2Ctx, col*65+1, 10*33+1, 64, 32, T2, true);
    }

    // Forest overlays: rows 4-5 (16 variants)
    sprites.forest = [];
    for (let i = 0; i < 16; i++) {
      sprites.forest[i] = this.extractSprite(t2Ctx, (i%8)*65+1, (Math.floor(i/8)+4)*33+1, 64, 32, T2, true);
    }

    // Mountain overlays: rows 6-7
    sprites.mountains = [];
    for (let i = 0; i < 16; i++) {
      sprites.mountains[i] = this.extractSprite(t2Ctx, (i%8)*65+1, (Math.floor(i/8)+6)*33+1, 64, 32, T2, true);
    }

    // Hill overlays: rows 8-9
    sprites.hills = [];
    for (let i = 0; i < 16; i++) {
      sprites.hills[i] = this.extractSprite(t2Ctx, (i%8)*65+1, (Math.floor(i/8)+8)*33+1, 64, 32, T2, true);
    }

    // Resources: TERRAIN1 col 2 = special 1, col 3 = special 2 per terrain row
    sprites.resources = {};
    for (let tid = 0; tid < 11; tid++) {
      sprites.resources[tid * 2 + 1] = this.extractSprite(t1Ctx, 2*65+1, tid*33+1, 64, 32, T1R, false);
      sprites.resources[tid * 2 + 2] = this.extractSprite(t1Ctx, 3*65+1, tid*33+1, 64, 32, T1R, false);
    }

    // Roads: TERRAIN1 row 11, cols 1-8 (8 directional segments)
    // Direction: 0=NE, 1=E, 2=SE, 3=S, 4=SW, 5=W, 6=NW, 7=N
    sprites.roads = [];
    for (let i = 0; i < 8; i++) {
      sprites.roads[i] = this.extractSprite(t1Ctx, (i+1)*65+1, 11*33+1, 64, 32, T1, true);
    }

    // Railroads: TERRAIN1 row 12, cols 1-8
    sprites.railroads = [];
    for (let i = 0; i < 8; i++) {
      sprites.railroads[i] = this.extractSprite(t1Ctx, (i+1)*65+1, 12*33+1, 64, 32, T1, true);
    }

    // Improvements from TERRAIN1 col 7: irrigation, farmland, mining, pollution
    // (col 9 is text labels; col 7 at x=456 has the actual sprites — confirmed via Civ2-clone)
    sprites.irrigation = this.extractSprite(t1Ctx, 7*65+1, 3*33+1, 64, 32, T1, true);
    sprites.farmland   = this.extractSprite(t1Ctx, 7*65+1, 4*33+1, 64, 32, T1, true);
    sprites.mining     = this.extractSprite(t1Ctx, 7*65+1, 5*33+1, 64, 32, T1, true);
    sprites.pollution  = this.extractSprite(t1Ctx, 7*65+1, 6*33+1, 64, 32, T1, true);

    // Fortress, Airbase, and Fortify from CITIES.GIF y=423 row (64×48 city-sized)
    if (citiesCtx) {
      const CC = [[255, 0, 255], [0, 255, 255], [135, 135, 135]];
      sprites.fortify  = this.extractSprite(citiesCtx, 143, 423, 64, 48, CC, true);
      sprites.fortress = this.extractSprite(citiesCtx, 208, 423, 64, 48, CC, true);
      sprites.airbase  = this.extractSprite(citiesCtx, 273, 423, 64, 48, CC, true);
    }

    // City sprites from CITIES.GIF: 65×49 grid (64×48 sprite + 1px border)
    // 38px header row, then 49px per era row
    // sprites.city[walled][style][era] — walled: 0/1, style: 0-3, era: 0-6
    // Chroma: Magenta (255,0,255) + Cyan (0,255,255) + Gray (135,135,135), killGreen=true
    // Cyan is transparent in CITIES.GIF (palette indices 236-252 per docs)
    sprites.city = [[], []]; // [open, walled]
    if (citiesCtx) {
      const CC = [[255, 0, 255], [0, 255, 255], [135, 135, 135]];
      for (let w = 0; w < 2; w++) {
        for (let s = 0; s < 4; s++) {
          sprites.city[w][s] = [];
          for (let era = 0; era < 7; era++) {
            const cx = (w * 334) + s * 65 + 1;
            const cy = 39 + era * 49;
            sprites.city[w][s][era] = this.extractSprite(citiesCtx, cx, cy, 64, 48, CC, true);
          }
        }
      }
    }

    // Unit template sprites from UNITS.GIF: 65×49 grid (64×48 sprite + 1px border)
    // 10 cols × 7 rows = 70 unit types
    // Chroma: Magenta (255,0,255) idx 253 + Purplish-gray (135,83,135) idx 255
    // NOTE: UNITS.GIF palette idx 255 is (135,83,135), NOT (135,135,135) like TERRAIN GIFs
    // Civ-color placeholders (idx 251-252) are red (127,0,0)/(255,0,0), kept for recoloring
    sprites.unitTemplates = [];
    sprites.unitColored = {};
    sprites.shieldOffsets = [];
    if (unitsCtx) {
      const UC = [[255, 0, 255], [135, 83, 135]];
      for (let id = 0; id < 70; id++) {
        const col = id % 10, row = Math.floor(id / 10);
        const cellX = col * 65, cellY = row * 49;
        sprites.unitTemplates[id] = this.extractSprite(unitsCtx, cellX + 1, cellY + 1, 64, 48, UC, true);

        // Find blue marker pixel (idx 250 = 0,0,255) in cell border for shield position
        // Scan top border row for X, left border column for Y
        let sx = -1, sy = -1;
        const imgW = unitsCtx.canvas.width;
        // Scan top border (y = cellY, x from cellX to cellX+65)
        if (cellY < unitsCtx.canvas.height) {
          const topRow = unitsCtx.getImageData(cellX, cellY, Math.min(65, imgW - cellX), 1).data;
          for (let x = 0; x < Math.min(65, imgW - cellX); x++) {
            const i = x * 4;
            if (topRow[i] < 15 && topRow[i+1] < 15 && topRow[i+2] > 240) { sx = x; break; }
          }
        }
        // Scan left border (x = cellX, y from cellY to cellY+49)
        if (cellX < imgW) {
          const leftCol = unitsCtx.getImageData(cellX, cellY, 1, Math.min(49, unitsCtx.canvas.height - cellY)).data;
          for (let y = 0; y < Math.min(49, unitsCtx.canvas.height - cellY); y++) {
            const i = y * 4;
            if (leftCol[i] < 15 && leftCol[i+1] < 15 && leftCol[i+2] > 240) { sy = y; break; }
          }
        }
        sprites.shieldOffsets[id] = (sx >= 0 && sy >= 0) ? { x: sx, y: sy } : null;
      }

      // Extract shield template from UNITS.GIF right edge area (x≈599, y≈1)
      // The shield is a small sprite (~15×20) with civ-color placeholders
      // Try extracting from rows 13-14 area or right edge
      sprites.shieldTemplate = this._extractShieldTemplate(unitsCtx);
      sprites.shieldColored = {};
    }

    // Dither mask: bottom 16 rows of the 64x32 dither tile at y=447
    // (tile spans y=447-478; we use the bottom half at y=463 and flip for top half)
    // Black pixels (< 10 in all channels) = dither holes
    const ditherData = t1Ctx.getImageData(1, 463, 64, 16).data;
    sprites.ditherMask = new Uint8Array(64 * 16);
    for (let i = 0; i < 64 * 16; i++) {
      const r = ditherData[i*4], g = ditherData[i*4+1], b = ditherData[i*4+2];
      sprites.ditherMask[i] = (r < 10 && g < 10 && b < 10) ? 1 : 0;
    }

    return sprites;
  },

  // ═══════════════════════════════════════════════════════════
  // Multi-pass rendering pipeline
  // ═══════════════════════════════════════════════════════════
  async render(canvas, mapData, sprites, onProgress, options) {
    options = options || {};
    const { mw, mh, getTerrain, isLand, hasRiver, getImprovements, getResource, getNeighbors } = mapData;
    const { terrain, coast, rivers, mouths, forest, mountains, hills,
            roads, railroads, resources, ditherMask, city: citySprites } = sprites;
    const TW = this.TW, TH = this.TH;

    const canvasW = mw * TW + (TW >> 1);
    const canvasH = (mh - 1) * (TH >> 1) + TH;
    canvas.width = canvasW;
    canvas.height = canvasH;
    const ctx = canvas.getContext('2d');

    // Dark ocean background
    ctx.fillStyle = '#142850';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Coastline quadrant placement offsets
    // piece 0=TOP(16,0), 1=BOTTOM(16,16), 2=LEFT(0,8), 3=RIGHT(32,8)
    const COX = [16, 16, 0, 32];
    const COY = [0, 16, 8, 8];

    // Helper: pixel position for a tile
    function tilePos(gx, gy) {
      return [gx * TW + ((gy % 2) ? (TW >> 1) : 0), gy * (TH >> 1)];
    }

    // ────────────────────────────────────────
    // PASS 1: Base terrain
    // ────────────────────────────────────────
    if (onProgress) onProgress('Rendering base terrain...');
    await this._yield();

    for (let gy = 0; gy < mh; gy++) {
      for (let gx = 0; gx < mw; gx++) {
        const [px, py] = tilePos(gx, gy);
        const ter = getTerrain(gx, gy);
        const variants = terrain[ter];
        const vi = ((gx * 13 + gy * 7) & 0x7FFFFFFF) % variants.length;
        ctx.drawImage(variants[vi], px, py);
      }
    }

    // ────────────────────────────────────────
    // PASS 2: Dither blending between terrain types
    // ────────────────────────────────────────
    if (onProgress) onProgress('Applying dither blending...');
    await this._yield();

    const imgData = ctx.getImageData(0, 0, canvasW, canvasH);
    const pix = imgData.data;

    // Pre-cache terrain sprite pixel data for dithering (use first variant per type)
    const terrainPixData = [];
    for (let tid = 0; tid < 11; tid++) {
      const tc = terrain[tid][0].getContext('2d');
      terrainPixData[tid] = tc.getImageData(0, 0, 64, 32).data;
    }

    for (let gy = 0; gy < mh; gy++) {
      for (let gx = 0; gx < mw; gx++) {
        const ter = getTerrain(gx, gy);
        if (ter === 10) continue; // skip ocean
        const [px, py] = tilePos(gx, gy);
        const nb = getNeighbors(gx, gy);

        for (const dir of ['NE', 'SE', 'SW', 'NW']) {
          const [nx, ny] = nb[dir];
          const nter = getTerrain(nx, ny);
          if (nter === ter || nter === 10) continue;

          const nData = terrainPixData[nter];
          this._applyDither(pix, canvasW, canvasH, px, py, nData, ditherMask, dir);
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // ────────────────────────────────────────
    // PASS 3: Coastlines, rivers, overlays, resources
    // ────────────────────────────────────────
    if (onProgress) onProgress('Rendering coastlines, rivers, overlays...');
    await this._yield();

    for (let gy = 0; gy < mh; gy++) {
      for (let gx = 0; gx < mw; gx++) {
        const [px, py] = tilePos(gx, gy);
        const ter = getTerrain(gx, gy);
        const nb = getNeighbors(gx, gy);

        // ── Coastline (ocean tiles) — 4-quadrant system ──
        if (ter === 10) {
          const L = {};
          for (const d of ['N','NE','E','SE','S','SW','W','NW']) {
            L[d] = isLand(nb[d][0], nb[d][1]);
          }
          const topG   = (L.NW?1:0) | (L.N?2:0)  | (L.NE?4:0);
          const rightG = (L.NE?1:0) | (L.E?2:0)  | (L.SE?4:0);
          const botG   = (L.SE?1:0) | (L.S?2:0)  | (L.SW?4:0);
          const leftG  = (L.SW?1:0) | (L.W?2:0)  | (L.NW?4:0);

          ctx.drawImage(coast[topG   * 4 + 0], px + COX[0], py + COY[0]);
          ctx.drawImage(coast[botG   * 4 + 1], px + COX[1], py + COY[1]);
          ctx.drawImage(coast[leftG  * 4 + 2], px + COX[2], py + COY[2]);
          ctx.drawImage(coast[rightG * 4 + 3], px + COX[3], py + COY[3]);

          // River mouths on ocean tiles
          for (let i = 0; i < 4; i++) {
            const d = ['NE','SE','SW','NW'][i];
            const [nx, ny] = nb[d];
            if (isLand(nx, ny) && hasRiver(nx, ny)) {
              ctx.drawImage(mouths[i], px, py);
            }
          }
        }

        // ── Rivers (land tiles) — ocean neighbors count as connections ──
        if (hasRiver(gx, gy)) {
          let rm = 0;
          if (hasRiver(nb.NE[0], nb.NE[1]) || getTerrain(nb.NE[0], nb.NE[1]) === 10) rm |= 1;
          if (hasRiver(nb.SE[0], nb.SE[1]) || getTerrain(nb.SE[0], nb.SE[1]) === 10) rm |= 2;
          if (hasRiver(nb.SW[0], nb.SW[1]) || getTerrain(nb.SW[0], nb.SW[1]) === 10) rm |= 4;
          if (hasRiver(nb.NW[0], nb.NW[1]) || getTerrain(nb.NW[0], nb.NW[1]) === 10) rm |= 8;
          ctx.drawImage(rivers[rm], px, py);
        }

        // ── Terrain overlays (forest/mountains/hills) ──
        // Variant index is a 4-bit neighbor connectivity bitmask:
        // NE=1, SE=2, SW=4, NW=8 — bit set when diagonal neighbor is same terrain
        if (ter === 3 || ter === 4 || ter === 5) {
          let ovi = 0;
          if (getTerrain(nb.NE[0], nb.NE[1]) === ter) ovi |= 1;
          if (getTerrain(nb.SE[0], nb.SE[1]) === ter) ovi |= 2;
          if (getTerrain(nb.SW[0], nb.SW[1]) === ter) ovi |= 4;
          if (getTerrain(nb.NW[0], nb.NW[1]) === ter) ovi |= 8;
          if (ter === 3) ctx.drawImage(forest[ovi], px, py);
          else if (ter === 5) ctx.drawImage(mountains[ovi], px, py);
          else ctx.drawImage(hills[ovi], px, py);
        }

        // ── Roads & Railroads — 8 directional segments ──
        // Direction order: NE=0, E=1, SE=2, S=3, SW=4, W=5, NW=6, N=7
        const imp = getImprovements(gx, gy);
        if (imp & 0x30) { // has road (0x10) or railroad (0x20)
          const DIR_KEYS = ['NE','E','SE','S','SW','W','NW','N'];
          for (let di = 0; di < 8; di++) {
            const [nx, ny] = nb[DIR_KEYS[di]];
            const nimp = getImprovements(nx, ny);
            if ((imp & 0x10) && (nimp & 0x10)) ctx.drawImage(roads[di], px, py);
            if ((imp & 0x20) && (nimp & 0x20)) ctx.drawImage(railroads[di], px, py);
          }
        }

        // ── Tile improvements: irrigation/farmland/mining/pollution ──
        if (imp & 0x8C) { // irrigation(0x04), mining(0x08), pollution(0x80)
          if ((imp & 0x04) && (imp & 0x08)) ctx.drawImage(sprites.farmland, px, py);
          else if (imp & 0x04) ctx.drawImage(sprites.irrigation, px, py);
          else if (imp & 0x08) ctx.drawImage(sprites.mining, px, py);
          if (imp & 0x80) ctx.drawImage(sprites.pollution, px, py);
        }

        // ── Resources (seed-based) ──
        const res = getResource(gx, gy);
        if (res > 0 && ter <= 10) {
          const key = ter * 2 + res;
          if (resources[key]) ctx.drawImage(resources[key], px, py);
        }
      }
    }

    // ────────────────────────────────────────
    // PASS 4: Cities
    // ────────────────────────────────────────
    if (onProgress) onProgress('Drawing cities...');
    await this._yield();

    ctx.textBaseline = 'top';

    for (const c of mapData.cities) {
      const [tpx, tpy] = tilePos(c.gx, c.gy);
      const cx = tpx + (TW >> 1);
      const cy = tpy + (TH >> 1);
      const color = this.CIV_COLORS[c.owner] || '#ccc';

      // City sprite — era based on owning civ's tech count
      const era = mapData.civTechCounts
        ? this._getEra(mapData.civTechCounts[c.owner] || 0)
        : 3;
      const walled = c.hasWalls ? 1 : 0;
      const style = c.style || 0;
      if (citySprites[walled] && citySprites[walled][style] && citySprites[walled][style][era]) {
        // Sprites are 64×48: 16px taller than a tile, so draw 16px above tile top
        ctx.drawImage(citySprites[walled][style][era], tpx, tpy - 16);
      } else {
        // Fallback: colored square if CITIES.GIF not loaded
        ctx.fillStyle = '#000';
        ctx.fillRect(cx - 7, cy - 7, 14, 14);
        ctx.fillStyle = color;
        ctx.fillRect(cx - 6, cy - 6, 12, 12);
      }

      // Name label (drawn first, above the shield)
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const tw = ctx.measureText(c.name).width;
      const tx = cx - tw / 2, ty = cy - 19;
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(tx - 3, ty - 1, tw + 6, 13);
      ctx.fillStyle = '#fff';
      ctx.fillText(c.name, cx, ty);

      // City size shield — colored rectangle with white number
      const sizeStr = String(c.size);
      ctx.font = 'bold 9px monospace';
      const sw = Math.max(ctx.measureText(sizeStr).width + 4, 10);
      const sh = 11;
      const ssx = cx - sw / 2, ssy = cy - 5;
      ctx.fillStyle = '#000';
      ctx.fillRect(ssx - 1, ssy - 1, sw + 2, sh + 2);
      ctx.fillStyle = color;
      ctx.fillRect(ssx, ssy, sw, sh);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(sizeStr, cx, ssy + 1);
    }

    // ────────────────────────────────────────
    // PASS 5: Units
    // ────────────────────────────────────────
    if (sprites.unitTemplates.length > 0) {
      if (onProgress) onProgress('Drawing units...');
      await this._yield();

      // Build set of city tiles so we don't draw garrisoned units over cities
      const cityTiles = new Set();
      for (const c of mapData.cities) cityTiles.add(c.gx + ',' + c.gy);

      // Pre-build unit counts per tile (for stacked unit badge)
      const unitCounts = {};
      for (const u of mapData.units) {
        const tileKey = u.gx + ',' + u.gy;
        if (cityTiles.has(tileKey)) continue;
        unitCounts[tileKey] = (unitCounts[tileKey] || 0) + 1;
      }

      const drawnTiles = new Set();
      for (const u of mapData.units) {
        const tileKey = u.gx + ',' + u.gy;
        if (drawnTiles.has(tileKey)) continue; // one unit per tile
        if (cityTiles.has(tileKey)) continue;  // skip garrisoned units
        drawnTiles.add(tileKey);

        const template = sprites.unitTemplates[u.type];
        if (!template) continue;

        const cacheKey = u.type + '-' + u.owner;
        if (!sprites.unitColored[cacheKey]) {
          const color = this.CIV_COLORS[u.owner] || '#cccccc';
          sprites.unitColored[cacheKey] = this._recolorUnit(template, color);
        }

        const [tpx, tpy] = tilePos(u.gx, u.gy);
        ctx.drawImage(sprites.unitColored[cacheKey], tpx, tpy - 16);

        // Shield (nationality indicator)
        let shieldX = tpx, shieldY = tpy - 16;
        if (sprites.shieldTemplate && sprites.shieldOffsets[u.type]) {
          const so = sprites.shieldOffsets[u.type];
          const shieldKey = 'shield-' + u.owner;
          if (!sprites.shieldColored[shieldKey]) {
            const color = this.CIV_COLORS[u.owner] || '#cccccc';
            sprites.shieldColored[shieldKey] = this._recolorUnit(sprites.shieldTemplate, color);
          }
          shieldX = tpx + so.x - 1;
          shieldY = tpy - 16 + so.y - 1;
          ctx.drawImage(sprites.shieldColored[shieldKey], shieldX, shieldY);
        }

        // HP bar — only shown when unit has taken damage
        if (u.hpLost > 0) {
          const maxHp = this.UNIT_MAX_HP[u.type] || 10;
          const curHp = Math.max(0, maxHp - u.hpLost);
          const barW = 15, barH = 3;
          const barX = shieldX, barY = shieldY + (sprites.shieldTemplate ? sprites.shieldTemplate.height : 20) + 1;
          const greenW = Math.round((curHp / maxHp) * barW);
          ctx.fillStyle = '#000';
          ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
          ctx.fillStyle = '#00c800';
          ctx.fillRect(barX, barY, greenW, barH);
          ctx.fillStyle = '#c80000';
          ctx.fillRect(barX + greenW, barY, barW - greenW, barH);
        }

        // Fortification overlay
        if (sprites.fortify && (u.orders === 0x01 || u.orders === 0x02)) {
          ctx.drawImage(sprites.fortify, tpx, tpy - 16);
        }

        // Stacked unit count badge
        const count = unitCounts[tileKey] || 1;
        if (count > 1) {
          const badgeStr = String(count);
          ctx.font = 'bold 9px monospace';
          const bw = ctx.measureText(badgeStr).width + 4;
          const bh = 11;
          const bx = tpx + TW - bw - 2, by = tpy - 16 + 48 - bh - 2;
          ctx.fillStyle = '#000';
          ctx.fillRect(bx, by, bw, bh);
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(badgeStr, bx + bw / 2, by + 1);
        }
      }
    }

    // ────────────────────────────────────────
    // PASS 6: Fortress/Airbase (drawn over units)
    // ────────────────────────────────────────
    if (sprites.fortress || sprites.airbase) {
      for (let gy = 0; gy < mh; gy++) {
        for (let gx = 0; gx < mw; gx++) {
          const imp = getImprovements(gx, gy);
          if (!(imp & 0x40)) continue;
          const [px, py] = tilePos(gx, gy);
          if ((imp & 0x02) && sprites.airbase) ctx.drawImage(sprites.airbase, px, py - 16);
          else if (sprites.fortress) ctx.drawImage(sprites.fortress, px, py - 16);
        }
      }
    }

    // ── Legend ──
    this._drawLegend(ctx, canvasW, canvasH, mapData);

    // ────────────────────────────────────────
    // PASS 7: Fog of War (optional)
    // ────────────────────────────────────────
    if (options.fowEnabled && options.fowCiv != null) {
      if (onProgress) onProgress('Applying fog of war...');
      await this._yield();

      const fowBit = 1 << options.fowCiv;
      let fogCount = 0, visCount = 0;
      ctx.fillStyle = '#000';
      for (let gy = 0; gy < mh; gy++) {
        for (let gx = 0; gx < mw; gx++) {
          if (mapData.getVisibility(gx, gy) & fowBit) { visCount++; continue; } // visible
          fogCount++;
          const [px, py] = tilePos(gx, gy);
          // Fill diamond with black
          ctx.beginPath();
          ctx.moveTo(px + TW / 2, py);
          ctx.lineTo(px + TW, py + TH / 2);
          ctx.lineTo(px + TW / 2, py + TH);
          ctx.lineTo(px, py + TH / 2);
          ctx.closePath();
          ctx.fill();
        }
      }
      console.log(`FOW: civ=${options.fowCiv}, bit=${fowBit}, fogged=${fogCount}, visible=${visCount}`);
    }

    return { canvasW, canvasH };
  },

  // ── Dither pixel manipulation (direction-aware) ──
  _applyDither(pixels, cw, ch, px, py, neighborData, mask, dir) {
    if (dir === 'SE') {
      for (let dy = 0; dy < 16; dy++) for (let dx = 0; dx < 64; dx++) {
        if (!mask[dy * 64 + dx]) continue;
        const si = ((16 + dy) * 64 + dx) * 4;
        if (neighborData[si + 3] === 0) continue;
        const cx = px + dx, cy = py + 16 + dy;
        if (cx < 0 || cx >= cw || cy < 0 || cy >= ch) continue;
        const di = (cy * cw + cx) * 4;
        pixels[di] = neighborData[si]; pixels[di+1] = neighborData[si+1]; pixels[di+2] = neighborData[si+2];
      }
    } else if (dir === 'SW') {
      for (let dy = 0; dy < 16; dy++) for (let dx = 0; dx < 64; dx++) {
        if (!mask[dy * 64 + (63 - dx)]) continue;
        const si = ((16 + dy) * 64 + dx) * 4;
        if (neighborData[si + 3] === 0) continue;
        const cx = px + dx, cy = py + 16 + dy;
        if (cx < 0 || cx >= cw || cy < 0 || cy >= ch) continue;
        const di = (cy * cw + cx) * 4;
        pixels[di] = neighborData[si]; pixels[di+1] = neighborData[si+1]; pixels[di+2] = neighborData[si+2];
      }
    } else if (dir === 'NE') {
      for (let dy = 0; dy < 16; dy++) for (let dx = 0; dx < 64; dx++) {
        if (!mask[(15 - dy) * 64 + dx]) continue;
        const si = (dy * 64 + dx) * 4;
        if (neighborData[si + 3] === 0) continue;
        const cx = px + dx, cy = py + dy;
        if (cx < 0 || cx >= cw || cy < 0 || cy >= ch) continue;
        const di = (cy * cw + cx) * 4;
        pixels[di] = neighborData[si]; pixels[di+1] = neighborData[si+1]; pixels[di+2] = neighborData[si+2];
      }
    } else if (dir === 'NW') {
      for (let dy = 0; dy < 16; dy++) for (let dx = 0; dx < 64; dx++) {
        if (!mask[(15 - dy) * 64 + (63 - dx)]) continue;
        const si = (dy * 64 + dx) * 4;
        if (neighborData[si + 3] === 0) continue;
        const cx = px + dx, cy = py + dy;
        if (cx < 0 || cx >= cw || cy < 0 || cy >= ch) continue;
        const di = (cy * cw + cx) * 4;
        pixels[di] = neighborData[si]; pixels[di+1] = neighborData[si+1]; pixels[di+2] = neighborData[si+2];
      }
    }
  },

  // ── Legend overlay ──
  _drawLegend(ctx, canvasW, canvasH, mapData) {
    // Determine civ names from city names
    const civNames = this._identifyCivs(mapData.cities);
    const entries = Object.entries(civNames).sort((a, b) => a[0] - b[0]);

    const lx = 10, ly = canvasH - 20 - entries.length * 15 - 20;
    const lw = 180, lh = entries.length * 15 + 25;

    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(lx, ly, lw, lh);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Civilizations:', lx + 5, ly + 5);

    entries.forEach(([cid, name], idx) => {
      const yy = ly + 22 + idx * 15;
      ctx.fillStyle = this.CIV_COLORS[cid] || '#ccc';
      ctx.fillRect(lx + 5, yy, 10, 10);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(lx + 5, yy, 10, 10);
      ctx.fillStyle = '#fff';
      ctx.font = '9px sans-serif';
      ctx.fillText(name, lx + 20, yy);
    });
  },

  // ── Identify civilizations from their city names ──
  _identifyCivs(cities) {
    // Known Civ2 city → civilization mappings from LEADERS.TXT / CITY.TXT
    const cityToCiv = {
      'Rome':'Romans','Veii':'Romans','Cumae':'Romans','Naples':'Romans',
      'Washington':'Americans','New York':'Americans','Boston':'Americans','Philadelphia':'Americans',
      'Atlanta':'Americans','Chicago':'Americans','San Francisco':'Americans','Los Angeles':'Americans',
      'Detroit':'Americans','Dallas':'Americans','Denver':'Americans','Seattle':'Americans',
      'Portland':'Americans','Baltimore':'Americans','Cincinnati':'Americans','Buffalo':'Americans',
      'New Orleans':'Americans','Minneapolis':'Americans','Kansas City':'Americans','San Diego':'Americans',
      'St. Louis':'Americans','Richmond':'Americans','Las Vegas':'Americans','Phoenix':'Americans',
      'Albuquerque':'Americans',
      'Zimbabwe':'Zulus','Ulundi':'Zulus','Isandhlwana':'Zulus','Bapedi':'Zulus','Intombe':'Zulus',
      'Hlobane':'Zulus','Ngome':'Zulus','Mpondo':'Zulus',
      'Kaupang':'Vikings','Trondheim':'Vikings','Uppsala':'Vikings','Hladir':'Vikings','Aarhus':'Vikings',
      'Cardiff':'Celts','Armagh':'Celts','Carmarthen':'Celts','Kells':'Celts',
      'Berlin':'Germans','Hamburg':'Germans',
      'Thebes':'Egyptians','Memphis':'Egyptians',
      'London':'English','York':'English','Nottingham':'English',
      'Paris':'French','Orleans':'French','Lyons':'French',
      'Moscow':'Russians','Delhi':'Indians','Beijing':'Chinese',
      'Kyoto':'Japanese','Madrid':'Spanish','Athens':'Greeks',
    };

    const ownerCivCounts = {};
    for (const c of cities) {
      const civ = cityToCiv[c.name];
      if (!civ) continue;
      if (!ownerCivCounts[c.owner]) ownerCivCounts[c.owner] = {};
      ownerCivCounts[c.owner][civ] = (ownerCivCounts[c.owner][civ] || 0) + 1;
    }

    const result = {};
    for (const [owner, civCounts] of Object.entries(ownerCivCounts)) {
      // Pick the civ with the most cities for this owner
      let best = '', bestCount = 0;
      for (const [civ, count] of Object.entries(civCounts)) {
        if (count > bestCount) { best = civ; bestCount = count; }
      }
      result[owner] = best;
    }
    return result;
  },

  // ── Recolor unit template: replace civ-color placeholder pixels ──
  // Palette idx 252 = (255,0,0) light civ-color, idx 251 = (127,0,0) dark civ-color
  _recolorUnit(templateCanvas, hexColor) {
    const w = templateCanvas.width, h = templateCanvas.height;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(templateCanvas, 0, 0);
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    // Parse hex color → light shade; derive dark shade at 50% brightness
    const cr = parseInt(hexColor.slice(1, 3), 16);
    const cg = parseInt(hexColor.slice(3, 5), 16);
    const cb = parseInt(hexColor.slice(5, 7), 16);
    const dr = cr >> 1, dg = cg >> 1, db = cb >> 1;

    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue; // skip transparent
      const r = d[i], g = d[i+1], b = d[i+2];
      // Light civ-color: idx 252 = (255,0,0) — pure red
      if (Math.abs(r - 255) < 15 && g < 15 && b < 15) {
        d[i] = cr; d[i+1] = cg; d[i+2] = cb;
      }
      // Dark civ-color: idx 251 = (127,0,0) — dark red
      else if (Math.abs(r - 127) < 15 && g < 15 && b < 15) {
        d[i] = dr; d[i+1] = dg; d[i+2] = db;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return c;
  },

  // Extract shield/flag template from UNITS.GIF
  // The shield is stored in the right portion of the sprite sheet, around x≈599, y≈1
  // It uses civ-color placeholders (idx 251/252: dark red/light red) like unit sprites
  _extractShieldTemplate(unitsCtx) {
    // The shield template is typically at the very end of the first row,
    // in the border/margin area after the 10 unit cells
    // 10 cols × 65px = 650, but image is 640px wide, so look in the rightmost area
    // Try a 15×20 region at x=600, y=1 (within the border strip of col 9)
    const candidates = [
      { x: 599, y: 1, w: 15, h: 20 },
      { x: 601, y: 1, w: 14, h: 20 },
      { x: 597, y: 1, w: 16, h: 20 },
    ];
    const UC = [[255, 0, 255], [135, 83, 135]];

    for (const c of candidates) {
      if (c.x + c.w > unitsCtx.canvas.width || c.y + c.h > unitsCtx.canvas.height) continue;
      const testData = unitsCtx.getImageData(c.x, c.y, c.w, c.h).data;
      // Check if this region has any civ-color pixels (red placeholders)
      let hasColor = false;
      for (let i = 0; i < testData.length; i += 4) {
        const r = testData[i], g = testData[i+1], b = testData[i+2];
        if ((Math.abs(r - 255) < 15 && g < 15 && b < 15) ||
            (Math.abs(r - 127) < 15 && g < 15 && b < 15)) {
          hasColor = true; break;
        }
      }
      if (hasColor) {
        return this.extractSprite(unitsCtx, c.x, c.y, c.w, c.h, UC, true);
      }
    }

    // Fallback: generate a simple colored rectangle shield (15×20)
    const c = document.createElement('canvas');
    c.width = 15; c.height = 20;
    const ctx = c.getContext('2d');
    // Draw a shield shape with civ-color placeholders (pure red)
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(1, 1, 13, 16);
    ctx.fillStyle = '#7f0000';
    ctx.fillRect(1, 1, 13, 2);
    ctx.fillRect(1, 1, 2, 16);
    ctx.fillRect(12, 1, 2, 16);
    // Bottom triangle
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(1, 17);
    ctx.lineTo(7, 19);
    ctx.lineTo(14, 17);
    ctx.closePath();
    ctx.fill();
    return c;
  },

  // Map tech count to era row index for city sprites
  _getEra(techCount) {
    if (techCount <= 5) return 0;   // Ancient
    if (techCount <= 15) return 1;  // Classical
    if (techCount <= 25) return 2;  // Renaissance
    if (techCount <= 40) return 3;  // Medieval
    if (techCount <= 60) return 4;  // Industrial
    if (techCount <= 75) return 5;  // Modern
    return 6;                       // Modern Alt
  },

  // Yield to event loop for UI updates
  _yield() { return new Promise(r => setTimeout(r, 5)); }
};
