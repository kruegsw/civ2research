// ═══════════════════════════════════════════════════════════════════
// mapgen.js — Map generation (shared: server + client)
//
// Placeholder: generates a trivial map (grassland interior, ocean border).
// Real generation (flood-fill islands, terrain distribution, rivers)
// will be built incrementally. The rest of the pipeline works the
// same regardless of map source.
// ═══════════════════════════════════════════════════════════════════

import { EMPTY_IMP } from './defs.js';

/**
 * Generate a map.
 *
 * @param {object} settings
 * @param {number} settings.width  - map width (half-columns), default 40
 * @param {number} settings.height - map height (rows), default 50
 * @param {number} [settings.seed] - resource seed, default random
 * @param {number} [settings.mapShape] - 0=cylinder (wrapping), 1=flat. Default 0
 * @returns {object} { mw, mh, mapShape, mapSeed, tileData }
 */
export function generateMap(settings = {}) {
  const mw = settings.width || 40;
  const mh = settings.height || 50;
  const mapSeed = settings.seed ?? Math.floor(Math.random() * 65536);
  const mapShape = settings.mapShape ?? 0;

  const tileData = new Array(mw * mh);

  for (let gy = 0; gy < mh; gy++) {
    for (let gx = 0; gx < mw; gx++) {
      const idx = gy * mw + gx;
      const isEdge = gy <= 1 || gy >= mh - 2 || (!mapShape && false) || (mapShape && (gx <= 0 || gx >= mw - 1));
      tileData[idx] = {
        terrain: isEdge ? 10 : 2,
        river: false, goodyHut: false, resourceSuppressed: false,
        improvements: EMPTY_IMP,
        cityRadiusOwner: 0, bodyId: 0, visibility: 0,
        tileOwnership: 0, fertility: 0,
      };
    }
  }

  return { mw, mh, mapShape, mapSeed, tileData };
}
