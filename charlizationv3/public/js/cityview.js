import { Civ2Renderer } from './renderer.js';
import { getGameYearFromMap } from '/engine/year.js';

// ═══════════════════════════════════════════════════════════════════
// cityview.js — Civilization II City View Panoramic Renderer
// Static visualization of the city screen (buildings on landscape)
//
// Primary sources (authoritative — the goal is to match these):
//   cv.dll GIF resources — building sprites (#300), wonder sprites (#305),
//     landscape backgrounds (#340-353), vegetation (#310)
//   Real Civ2 MGE screenshots — visual verification
//
// Decoding aids (used to understand the primary sources, not copied):
//   Civ2-clone (axx0) — github.com/axx0/Civ2-clone
//     CityViewWindow.cs: building slot placement table,
//     alternative tile rects, rendering order, background selection
// ═══════════════════════════════════════════════════════════════════

const Civ2CityView = {

  // Chroma key for cv.dll sprites: magenta + gray (same as CITIES.GIF CC def)
  CHROMA: [[255, 0, 255], [0, 255, 255], [135, 135, 135]],

  // Background resource ID mapping: [ocean, river, inland] × epoch
  // Epoch: 0=Ancient, 1=Renaissance, 2=Industrial, 3=Modern
  BG_RESOURCE_IDS: {
    ocean:  [340, 341, 342, 343],
    river:  [345, 346, 347, 348],
    inland: [350, 351, 352, 353],
  },

  // Alternative tile source rects from cv_res310.gif (27 entries)
  // IDs 0-11: 158×114, IDs 12-26: 123×82
  ALT_TILES: [
    { x: 1,   y: 1,   w: 158, h: 114 },  // 0
    { x: 160, y: 1,   w: 158, h: 114 },  // 1
    { x: 319, y: 1,   w: 158, h: 114 },  // 2
    { x: 478, y: 1,   w: 158, h: 114 },  // 3
    { x: 1,   y: 116, w: 158, h: 114 },  // 4
    { x: 160, y: 116, w: 158, h: 114 },  // 5
    { x: 319, y: 116, w: 158, h: 114 },  // 6
    { x: 478, y: 116, w: 158, h: 114 },  // 7
    { x: 1,   y: 231, w: 158, h: 114 },  // 8
    { x: 160, y: 231, w: 158, h: 114 },  // 9
    { x: 319, y: 231, w: 158, h: 114 },  // 10
    { x: 478, y: 231, w: 158, h: 114 },  // 11
    { x: 1,   y: 346, w: 123, h: 82 },   // 12
    { x: 125, y: 346, w: 123, h: 82 },   // 13
    { x: 249, y: 346, w: 123, h: 82 },   // 14
    { x: 373, y: 346, w: 123, h: 82 },   // 15
    { x: 497, y: 346, w: 123, h: 82 },   // 16
    { x: 1,   y: 429, w: 123, h: 82 },   // 17
    { x: 125, y: 429, w: 123, h: 82 },   // 18
    { x: 249, y: 429, w: 123, h: 82 },   // 19
    { x: 373, y: 429, w: 123, h: 82 },   // 20
    { x: 497, y: 429, w: 123, h: 82 },   // 21
    { x: 1,   y: 512, w: 123, h: 82 },   // 22
    { x: 125, y: 512, w: 123, h: 82 },   // 23
    { x: 249, y: 512, w: 123, h: 82 },   // 24
    { x: 373, y: 512, w: 123, h: 82 },   // 25
    { x: 497, y: 512, w: 123, h: 82 },   // 26
  ],

  // 68 building slots: { id, type, sheet, src: {x,y,w,h}, dx, dy, alt }
  // type: 0=Nothing (scenery only), 1-38=improvement, 39-66=wonder
  // sheet: 'i'=improvements, 'w'=wonders
  // Slots 0-55: standard, 56-67: special overlays
  BUILDING_SLOTS: [
    // Slot 0-9
    { id:0,  type:62, sheet:'w', src:{x:160,y:116,w:158,h:114}, dx:4,    dy:0,   alt:2  },  // Manhattan Project
    { id:1,  type:24, sheet:'i', src:{x:497,y:84, w:123,h:82},  dx:165,  dy:47,  alt:15 },  // Supermarket
    { id:2,  type:9,  sheet:'i', src:{x:1,  y:1,  w:123,h:82},  dx:267,  dy:10,  alt:2  },  // Aqueduct
    { id:3,  type:49, sheet:'w', src:{x:319,y:116,w:158,h:114}, dx:401,  dy:10,  alt:5  },  // Michelangelo's Chapel
    { id:4,  type:5,  sheet:'i', src:{x:125,y:84, w:123,h:82},  dx:556,  dy:5,   alt:15 },  // Marketplace
    { id:5,  type:26, sheet:'i', src:{x:373,y:84, w:123,h:82},  dx:653,  dy:1,   alt:14 },  // Research Lab
    { id:6,  type:50, sheet:'w', src:{x:478,y:231,w:158,h:114}, dx:728,  dy:9,   alt:2  },  // Copernicus' Observatory
    { id:7,  type:54, sheet:'w', src:{x:319,y:346,w:158,h:114}, dx:850,  dy:9,   alt:2  },  // J.S. Bach's Cathedral
    { id:8,  type:7,  sheet:'i', src:{x:125,y:1,  w:123,h:82},  dx:980,  dy:7,   alt:1  },  // Courthouse
    { id:9,  type:32, sheet:'i', src:{x:1,  y:167,w:123,h:82},  dx:1116, dy:7,   alt:0  },  // Airport
    // Slot 10-19
    { id:10, type:16, sheet:'i', src:{x:1,  y:84, w:123,h:82},  dx:60,   dy:110, alt:13 },  // Mfg. Plant
    { id:11, type:18, sheet:'i', src:{x:1,  y:416,w:123,h:82},  dx:170,  dy:100, alt:12 },  // Recycling Centre
    { id:12, type:17, sheet:'i', src:{x:497,y:167,w:123,h:82},  dx:268,  dy:100, alt:15 },  // SDI Defense
    { id:13, type:27, sheet:'i', src:{x:125,y:250,w:123,h:82},  dx:370,  dy:100, alt:13 },  // SAM Battery
    { id:14, type:3,  sheet:'i', src:{x:373,y:1,  w:123,h:82},  dx:514,  dy:63,  alt:18 },  // Granary
    { id:15, type:4,  sheet:'i', src:{x:1,  y:333,w:123,h:82},  dx:620,  dy:67,  alt:15 },  // Temple
    { id:16, type:39, sheet:'w', src:{x:1,  y:576,w:158,h:114}, dx:460,  dy:120, alt:20 },  // Pyramids
    { id:17, type:56, sheet:'w', src:{x:160,y:576,w:158,h:114}, dx:586,  dy:100, alt:15 },  // Trading Company
    { id:18, type:1,  sheet:'i', src:{x:373,y:333,w:123,h:82},  dx:676,  dy:114, alt:14 },  // Palace
    { id:19, type:11, sheet:'i', src:{x:373,y:250,w:123,h:82},  dx:775,  dy:105, alt:12 },  // Cathedral
    // Slot 20-29
    { id:20, type:14, sheet:'i', src:{x:249,y:167,w:123,h:82},  dx:870,  dy:100, alt:13 },  // Colosseum
    { id:21, type:21, sheet:'i', src:{x:249,y:84, w:123,h:82},  dx:960,  dy:114, alt:15 },  // Nuclear Plant
    { id:22, type:66, sheet:'w', src:{x:478,y:576,w:158,h:114}, dx:1062, dy:105, alt:14 },  // Cure for Cancer
    { id:23, type:40, sheet:'w', src:{x:1,  y:116,w:158,h:114}, dx:1162, dy:100, alt:12 },  // Hanging Gardens
    { id:24, type:53, sheet:'w', src:{x:1,  y:461,w:158,h:114}, dx:95,   dy:150, alt:15 },  // Leonardo's Workshop
    { id:25, type:57, sheet:'w', src:{x:1,  y:346,w:158,h:114}, dx:192,  dy:150, alt:15 },  // Darwin's Voyage
    { id:26, type:10, sheet:'i', src:{x:125,y:167,w:123,h:82},  dx:290,  dy:150, alt:14 },  // Bank
    { id:27, type:2,  sheet:'i', src:{x:249,y:250,w:123,h:82},  dx:537,  dy:153, alt:19 },  // Barracks
    { id:28, type:12, sheet:'i', src:{x:373,y:167,w:123,h:82},  dx:533,  dy:200, alt:19 },  // University
    { id:29, type:47, sheet:'w', src:{x:478,y:461,w:158,h:114}, dx:658,  dy:156, alt:4  },  // King Richard's Crusade
    // Slot 30-39
    { id:30, type:60, sheet:'w', src:{x:319,y:1,  w:158,h:114}, dx:780,  dy:156, alt:2  },  // Hoover Dam
    { id:31, type:15, sheet:'i', src:{x:249,y:1,  w:123,h:82},  dx:916,  dy:167, alt:15 },  // Factory
    { id:32, type:61, sheet:'w', src:{x:160,y:1,  w:158,h:114}, dx:1036, dy:175, alt:0  },  // Women's Suffrage
    { id:33, type:28, sheet:'i', src:{x:1,  y:250,w:123,h:82},  dx:1160, dy:213, alt:14 },  // Coastal Fortress
    { id:34, type:22, sheet:'i', src:{x:125,y:416,w:123,h:82},  dx:0,    dy:213, alt:2  },  // Stock Exchange
    { id:35, type:23, sheet:'i', src:{x:497,y:250,w:123,h:82},  dx:110,  dy:260, alt:14 },  // Sewer System
    { id:36, type:29, sheet:'i', src:{x:1,  y:618,w:123,h:82},  dx:210,  dy:226, alt:3  },  // Solar Plant
    { id:37, type:43, sheet:'w', src:{x:478,y:1,  w:158,h:114}, dx:332,  dy:226, alt:2  },  // Great Library
    { id:38, type:44, sheet:'w', src:{x:478,y:116,w:158,h:114}, dx:450,  dy:256, alt:7  },  // Oracle
    { id:39, type:52, sheet:'w', src:{x:1,  y:231,w:158,h:114}, dx:572,  dy:256, alt:7  },  // Shakespeare's Theatre
    // Slot 40-49
    { id:40, type:6,  sheet:'i', src:{x:497,y:1,  w:123,h:82},  dx:735,  dy:250, alt:20 },  // Library
    { id:41, type:13, sheet:'i', src:{x:125,y:618,w:123,h:82},  dx:845,  dy:259, alt:15 },  // Mass Transit
    { id:42, type:59, sheet:'w', src:{x:319,y:576,w:158,h:114}, dx:10,   dy:295, alt:3  },  // Eiffel Tower
    { id:43, type:19, sheet:'i', src:{x:125,y:333,w:123,h:82},  dx:167,  dy:287, alt:3  },  // Power Plant
    { id:44, type:20, sheet:'i', src:{x:249,y:333,w:123,h:82},  dx:293,  dy:287, alt:1  },  // Hydro Plant
    { id:45, type:55, sheet:'w', src:{x:160,y:346,w:158,h:114}, dx:0,    dy:364, alt:2  },  // Isaac Newton's College
    { id:46, type:63, sheet:'w', src:{x:160,y:231,w:158,h:114}, dx:129,  dy:356, alt:1  },  // United Nations
    { id:47, type:51, sheet:'w', src:{x:478,y:346,w:158,h:114}, dx:250,  dy:356, alt:2  },  // Magellan's Expedition
    { id:48, type:48, sheet:'w', src:{x:319,y:461,w:158,h:114}, dx:411,  dy:324, alt:4  },  // Marco Polo's Embassy
    { id:49, type:64, sheet:'w', src:{x:1,  y:1,  w:158,h:114}, dx:533,  dy:324, alt:1  },  // Apollo Program
    // Slot 50-55 (SETI + scenery-only)
    { id:50, type:65, sheet:'w', src:{x:319,y:231,w:158,h:114}, dx:680,  dy:284, alt:3  },  // SETI Program
    { id:51, type:0,  sheet:'w', src:{x:0,  y:0,  w:0,  h:0},  dx:928,  dy:273, alt:12 },  // Nothing (scenery)
    { id:52, type:0,  sheet:'w', src:{x:0,  y:0,  w:0,  h:0},  dx:1020, dy:256, alt:0  },  // Nothing (scenery)
    { id:53, type:0,  sheet:'w', src:{x:0,  y:0,  w:0,  h:0},  dx:1156, dy:286, alt:15 },  // Nothing (scenery)
    { id:54, type:0,  sheet:'w', src:{x:0,  y:0,  w:0,  h:0},  dx:1043, dy:328, alt:2  },  // Nothing (scenery)
    { id:55, type:0,  sheet:'w', src:{x:0,  y:0,  w:0,  h:0},  dx:1155, dy:396, alt:13 },  // Nothing (scenery)
    // Slot 56-67: special overlays
    { id:56, type:8,  sheet:'i', src:{x:249,y:416,w:357,h:78},  dx:368,  dy:390, alt:0  },  // City Walls
    { id:57, type:31, sheet:'i', src:{x:590,y:499,w:105,h:105}, dx:926,  dy:366, alt:0  },  // Offshore Platform
    { id:58, type:30, sheet:'i', src:{x:1,  y:499,w:220,h:100}, dx:907,  dy:274, alt:0  },  // Harbour
    { id:59, type:34, sheet:'i', src:{x:222,y:499,w:367,h:118}, dx:907,  dy:296, alt:0  },  // Port Facility
    { id:60, type:41, sheet:'w', src:{x:407,y:852,w:94, h:160}, dx:1070, dy:319, alt:0  },  // Colossus (ocean)
    { id:61, type:41, sheet:'w', src:{x:502,y:852,w:94, h:160}, dx:1070, dy:319, alt:0  },  // Colossus (river)
    { id:62, type:42, sheet:'w', src:{x:253,y:852,w:76, h:133}, dx:1184, dy:305, alt:0  },  // Lighthouse (ocean)
    { id:63, type:42, sheet:'w', src:{x:330,y:852,w:76, h:133}, dx:1184, dy:305, alt:0  },  // Lighthouse (river)
    { id:64, type:45, sheet:'w', src:{x:1,  y:691,w:304,h:160}, dx:0,    dy:0,   alt:0  },  // Great Wall var 1
    { id:65, type:45, sheet:'w', src:{x:306,y:691,w:304,h:160}, dx:0,    dy:0,   alt:0  },  // Great Wall var 2
    { id:66, type:58, sheet:'w', src:{x:1,  y:852,w:125,h:253}, dx:0,    dy:227, alt:0  },  // Statue of Liberty var 1
    { id:67, type:58, sheet:'w', src:{x:127,y:852,w:125,h:253}, dx:0,    dy:227, alt:0  },  // Statue of Liberty var 2
  ],

  // ── Check if a city has a specific improvement type ──
  // type: 0=Nothing, 1-38=city improvements, 39-66=wonders
  cityHasImprovement(city, cityIndex, mapData, improvType) {
    if (improvType === 0) return false;
    // City improvements: bits in buildings (uint32, types 1-31) and buildingsV (uint8, types 32-38)
    if (improvType <= 31) return !!(city.buildings & (1 << improvType));
    if (improvType <= 38) return !!(city.buildingsV & (1 << (improvType - 32)));
    // Wonders (types 39-66): check wonderCityIds
    const wonderIdx = improvType - 39;
    const wonderCityIds = mapData.gameState && mapData.gameState.wonderCityIds;
    if (!wonderCityIds) return false;
    return wonderCityIds[wonderIdx] === cityIndex;
  },

  // ── Determine background terrain type ──
  // Returns 'ocean', 'river', or 'inland'
  _getTerrainType(city) {
    if (city.canBuildCoastal) return 'ocean';
    if (city.canBuildHydro)   return 'river';
    return 'inland';
  },

  // ── Get background resource ID for a city ──
  getBackgroundId(city, epoch, hasSuperHighways) {
    const terrain = this._getTerrainType(city);
    const effectiveEpoch = hasSuperHighways ? 3 : epoch;
    return this.BG_RESOURCE_IDS[terrain][effectiveEpoch];
  },

  // ── Extract sprites from the three cv.dll sprite sheets ──
  // Returns { improvements: Map, wonders: Map, alternatives: [] }
  // Each Map key is "x,y,w,h" → canvas
  extractSprites(improvCtx, wondersCtx, altCtx) {
    const CK = this.CHROMA;
    const cache = { i: new Map(), w: new Map() };

    // Extract all unique sprites from building slots
    for (const slot of this.BUILDING_SLOTS) {
      if (slot.src.w === 0 || slot.src.h === 0) continue;
      const s = slot.src;
      const key = `${s.x},${s.y},${s.w},${s.h}`;
      const sheetCtx = slot.sheet === 'i' ? improvCtx : wondersCtx;
      if (!cache[slot.sheet].has(key)) {
        cache[slot.sheet].set(key, Civ2Renderer.extractSprite(sheetCtx, s.x, s.y, s.w, s.h, CK, false));
      }
    }

    // Extract alternative tiles
    const alternatives = this.ALT_TILES.map(t =>
      Civ2Renderer.extractSprite(altCtx, t.x, t.y, t.w, t.h, CK, false)
    );

    return { i: cache.i, w: cache.w, alternatives };
  },

  // ── Get the extracted sprite canvas for a building slot ──
  _getSlotSprite(slot, sprites) {
    if (slot.src.w === 0 || slot.src.h === 0) return null;
    const s = slot.src;
    const key = `${s.x},${s.y},${s.w},${s.h}`;
    return sprites[slot.sheet].get(key) || null;
  },

  // ── Calculate game year from turnsPassed + turnsForYear ──
  // ── Main render function ──
  // canvas: target canvas element (will be set to 1280×480)
  // city: city object from parser
  // cityIndex: index in mapData.cities array
  // mapData: full parsed save data
  // sprites: from extractSprites()
  // backgrounds: Map of resourceId → Image/Canvas
  render(canvas, city, cityIndex, mapData, sprites, backgrounds) {
    canvas.width = 1280;
    canvas.height = 480;
    const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

    // 1. Determine epoch
    const epoch = mapData.civTechs
      ? Civ2Renderer._getEpoch(mapData.civTechs[city.owner])
      : 0;

    // Check for Superhighways (improvement bit 25)
    const hasSuperHighways = !!(city.buildings & (1 << 25));

    // 2. Draw background
    const bgId = this.getBackgroundId(city, epoch, hasSuperHighways);
    const bgImg = backgrounds.get(bgId);
    if (bgImg) {
      ctx.drawImage(bgImg, 0, 0);
    } else {
      // Fallback: solid dark green
      ctx.fillStyle = '#1a3a1a';
      ctx.fillRect(0, 0, 1280, 480);
    }

    const terrainType = this._getTerrainType(city);
    const isOcean = terrainType === 'ocean';
    const isRiver = terrainType === 'river';

    // 3. Draw standard slots 0-55
    for (let i = 0; i <= 55; i++) {
      const slot = this.BUILDING_SLOTS[i];

      // Skip coastal-only positions for ocean cities
      if (isOcean && i > 49) continue;
      // Skip river positions for river cities
      if (isRiver && i >= 50 && i <= 53) continue;

      const hasIt = this.cityHasImprovement(city, cityIndex, mapData, slot.type);

      if (hasIt) {
        const sprite = this._getSlotSprite(slot, sprites);
        if (sprite) ctx.drawImage(sprite, slot.dx, slot.dy);
      } else {
        // Draw alternative scenery tile
        const altCanvas = sprites.alternatives[slot.alt];
        if (altCanvas) ctx.drawImage(altCanvas, slot.dx, slot.dy);
      }
    }

    // 4. Special overlays (slots 56-67)

    // City Walls (slot 56, type 8)
    if (this.cityHasImprovement(city, cityIndex, mapData, 8)) {
      const slot = this.BUILDING_SLOTS[56];
      const sprite = this._getSlotSprite(slot, sprites);
      if (sprite) ctx.drawImage(sprite, slot.dx, slot.dy);
    }

    // Offshore Platform (slot 57, type 31) — only for ocean cities
    if (isOcean && this.cityHasImprovement(city, cityIndex, mapData, 31)) {
      const slot = this.BUILDING_SLOTS[57];
      const sprite = this._getSlotSprite(slot, sprites);
      if (sprite) ctx.drawImage(sprite, slot.dx, slot.dy);
    }

    // Port Facility (type 34) takes priority over Harbour (type 30)
    if (this.cityHasImprovement(city, cityIndex, mapData, 34)) {
      const slot = this.BUILDING_SLOTS[59]; // Port Facility
      const sprite = this._getSlotSprite(slot, sprites);
      if (sprite) ctx.drawImage(sprite, slot.dx, slot.dy);
    } else if (this.cityHasImprovement(city, cityIndex, mapData, 30)) {
      const slot = this.BUILDING_SLOTS[58]; // Harbour
      const sprite = this._getSlotSprite(slot, sprites);
      if (sprite) ctx.drawImage(sprite, slot.dx, slot.dy);
    }

    // Colossus (type 41) — river variant (slot 61) vs ocean variant (slot 60)
    if (this.cityHasImprovement(city, cityIndex, mapData, 41)) {
      const slot = this.BUILDING_SLOTS[isRiver ? 61 : 60];
      const sprite = this._getSlotSprite(slot, sprites);
      if (sprite) ctx.drawImage(sprite, slot.dx, slot.dy);
    }

    // Lighthouse (type 42) — river variant (slot 63) vs ocean variant (slot 62)
    if (this.cityHasImprovement(city, cityIndex, mapData, 42)) {
      const slot = this.BUILDING_SLOTS[isRiver ? 63 : 62];
      const sprite = this._getSlotSprite(slot, sprites);
      if (sprite) ctx.drawImage(sprite, slot.dx, slot.dy);
    }

    // Great Wall (type 45) — slot 64
    if (this.cityHasImprovement(city, cityIndex, mapData, 45)) {
      const slot = this.BUILDING_SLOTS[64];
      const sprite = this._getSlotSprite(slot, sprites);
      if (sprite) ctx.drawImage(sprite, slot.dx, slot.dy);
    }

    // Statue of Liberty (type 58) — slot 66
    if (this.cityHasImprovement(city, cityIndex, mapData, 58)) {
      const slot = this.BUILDING_SLOTS[66];
      const sprite = this._getSlotSprite(slot, sprites);
      if (sprite) ctx.drawImage(sprite, slot.dx, slot.dy);
    }

    // 5. City title: "CityName: GameYear"
    // GDI pipeline: shadow at (+1,+1) offset, 0x000000 shadow → 0x878787 foreground
    const year = getGameYearFromMap(mapData);
    const title = year ? `${city.name}: ${year}` : city.name;
    ctx.font = 'bold 26px "Times New Roman", serif';
    // Shadow at (+1,+1)
    ctx.fillStyle = '#000';
    ctx.fillText(title, 791, 36);
    // Foreground (GDI-verified: 0x878787)
    ctx.fillStyle = 'rgb(135,135,135)';
    ctx.fillText(title, 790, 35);
  },
};

export { Civ2CityView };
