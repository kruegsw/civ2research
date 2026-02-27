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
  extractAllSprites(t1Ctx, t2Ctx) {
    // TERRAIN1 chroma: Cyan (0,255,255) palette index 248
    const T1 = [[0, 255, 255]];
    // TERRAIN1 for resources: also remove Magenta text labels
    const T1R = [[0, 255, 255], [255, 0, 255]];
    // TERRAIN2 chroma: Magenta (255,0,255) idx 253 + gray corners (~132,132,132) idx 255
    const T2 = [[255, 0, 255], [132, 132, 132]];

    const sprites = {};

    // Base terrain: rows 0-10, 65×33 grid (64×32 + 1px border)
    sprites.terrain = [];
    sprites.terrainAlt = [];
    for (let tid = 0; tid < 11; tid++) {
      sprites.terrain[tid]    = this.extractSprite(t1Ctx, 0*65+1, tid*33+1, 64, 32, T1, false);
      sprites.terrainAlt[tid] = this.extractSprite(t1Ctx, 1*65+1, tid*33+1, 64, 32, T1, false);
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
      sprites.rivers[i] = this.extractSprite(t2Ctx, (i%8)*65+1, (Math.floor(i/8)+2)*33+1, 64, 32, T2, false);
    }

    // River mouths: row 10, cols 0-3 (NE, SE, SW, NW)
    sprites.mouths = [];
    for (let col = 0; col < 4; col++) {
      sprites.mouths[col] = this.extractSprite(t2Ctx, col*65+1, 10*33+1, 64, 32, T2, false);
    }

    // Forest overlays: rows 4-5 (16 variants)
    sprites.forest = [];
    for (let i = 0; i < 16; i++) {
      sprites.forest[i] = this.extractSprite(t2Ctx, (i%8)*65+1, (Math.floor(i/8)+4)*33+1, 64, 32, T2, false);
    }

    // Mountain overlays: rows 6-7
    sprites.mountains = [];
    for (let i = 0; i < 16; i++) {
      sprites.mountains[i] = this.extractSprite(t2Ctx, (i%8)*65+1, (Math.floor(i/8)+6)*33+1, 64, 32, T2, false);
    }

    // Hill overlays: rows 8-9
    sprites.hills = [];
    for (let i = 0; i < 16; i++) {
      sprites.hills[i] = this.extractSprite(t2Ctx, (i%8)*65+1, (Math.floor(i/8)+8)*33+1, 64, 32, T2, false);
    }

    // Resources: TERRAIN1 col 2 = special 1, col 3 = special 2 per terrain row
    sprites.resources = {};
    for (let tid = 0; tid < 11; tid++) {
      sprites.resources[tid * 2 + 1] = this.extractSprite(t1Ctx, 2*65+1, tid*33+1, 64, 32, T1R, false);
      sprites.resources[tid * 2 + 2] = this.extractSprite(t1Ctx, 3*65+1, tid*33+1, 64, 32, T1R, false);
    }

    // Dither mask: row 14 col 0, bottom 16 rows of diamond
    // Black pixels (< 10 in all channels) = dither holes
    const ditherData = t1Ctx.getImageData(1, 14*33+1, 64, 16).data;
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
  async render(canvas, mapData, sprites, onProgress) {
    const { mw, mh, getTerrain, isLand, hasRiver, getResource, getNeighbors } = mapData;
    const { terrain, terrainAlt, coast, rivers, mouths, forest, mountains, hills,
            resources, ditherMask } = sprites;
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
        const spr = ((gx + gy) % 2 === 0) ? terrain[ter] : terrainAlt[ter];
        ctx.drawImage(spr, px, py);
      }
    }

    // ────────────────────────────────────────
    // PASS 2: Dither blending between terrain types
    // ────────────────────────────────────────
    if (onProgress) onProgress('Applying dither blending...');
    await this._yield();

    const imgData = ctx.getImageData(0, 0, canvasW, canvasH);
    const pix = imgData.data;

    // Pre-cache terrain sprite pixel data for dithering
    const terrainPixData = [];
    for (let tid = 0; tid < 11; tid++) {
      const tc = terrain[tid].getContext('2d');
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
        if (ter === 3) { // Forest
          ctx.drawImage(forest[((gx * 13 + gy * 7) % 16 + 16) % 16], px, py);
        } else if (ter === 5) { // Mountains
          ctx.drawImage(mountains[((gx * 13 + gy * 7) % 16 + 16) % 16], px, py);
        } else if (ter === 4) { // Hills
          ctx.drawImage(hills[((gx * 13 + gy * 7) % 16 + 16) % 16], px, py);
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

      // City marker square
      ctx.fillStyle = '#000';
      ctx.fillRect(cx - 7, cy - 7, 14, 14);
      ctx.fillStyle = color;
      ctx.fillRect(cx - 6, cy - 6, 12, 12);

      // Size number
      ctx.fillStyle = '#000';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(String(c.size), cx, cy - 5);

      // Name label
      ctx.font = '9px sans-serif';
      const tw = ctx.measureText(c.name).width;
      const tx = cx - tw / 2, ty = cy - 19;
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(tx - 3, ty - 1, tw + 6, 13);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(c.name, cx, ty);
    }

    // ── Legend ──
    this._drawLegend(ctx, canvasW, canvasH, mapData);

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

  // Yield to event loop for UI updates
  _yield() { return new Promise(r => setTimeout(r, 5)); }
};
