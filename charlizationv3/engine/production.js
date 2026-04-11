// ═══════════════════════════════════════════════════════════════════
// production.js — City yield calculations (shared: server + client)
//
// Pure functions that compute per-tile and per-city food, shields,
// and trade. Extracted from citydialog.js display code into engine
// so the reducer can process cities on END_TURN.
// ═══════════════════════════════════════════════════════════════════

import {
  TERRAIN_BASE, IRRIGATION_BONUS, MINING_BONUS, SPECIAL_TOTAL,
  CITY_RADIUS_DOUBLED, CITY_RADIUS_EXTENDED, SETTLER_TYPES, SUPPORT_EXEMPT_TYPES,
  SETTLER_FOOD_COST, FOOD_BOX_MULTIPLIER, FANATIC_TYPES,
  COSMIC_FREE_SUPPORT, UNIT_COSTS, IMPROVE_COSTS, WONDER_COSTS,
  IMPROVE_MAINTENANCE, COMMODITY_NAMES, UNIT_ATK,
  GOVT_FACTOR, GOVT_CORRUPTION_DIVISOR, GOVT_WLTKD_BUMP,
  COSMIC_FUNDAMENTALISM_SCIENCE_PENALTY, GOVT_INDEX,
} from './defs.js';
import { cityHasBuilding, civHasWonder, cityHasWonder, hasWonderEffect, getGovernment } from './utils.js';

// (#110) Wonder-based corruption reduction flags
// Adam Smith's Trading Co. (wonder 17): halves corruption/waste in all cities
// Women's Suffrage (wonder 21): halves corruption/waste in all cities
// These stack with Courthouse/Palace halving.

// ── Per-tile yield functions ──

function getTileResource(ter, gx, gy, mapBase) {
  if (ter === 2 && mapBase.hasShield && mapBase.hasShield(gx, gy)) {
    return { hasSpecial: false, specialIdx: 0, grasslandShield: true };
  }
  const res = mapBase.getResource(gx, gy);
  if (res > 0 && res <= 2 && SPECIAL_TOTAL[ter] && SPECIAL_TOTAL[ter][res - 1]) {
    return { hasSpecial: true, specialIdx: res, grasslandShield: false };
  }
  return { hasSpecial: false, specialIdx: 0, grasslandShield: false };
}

export function calcTileFood(ter, imp, hasSpecial, specialIdx, isCenter, city, government, hasRailroad = false) {
  let food = hasSpecial ? SPECIAL_TOTAL[ter][specialIdx - 1][0] : TERRAIN_BASE[ter][0];

  // Irrigation / Farmland (non-ocean); city center counts as irrigated
  if (ter !== 10 && (imp.irrigation || isCenter)) {
    food += IRRIGATION_BONUS[ter];
    // Supermarket (24) + Farmland (irrigation+mining both set): +50%
    if ((imp.mining || isCenter) && cityHasBuilding(city, 24))
      food = food + Math.floor(food / 2);
  }

  // Harbor (30): +1 food on ocean
  if (ter === 10 && cityHasBuilding(city, 30)) food += 1;

  // Despotism/Anarchy penalty: -1 if food > 2 (unless WLTKD)
  if ((government === 'anarchy' || government === 'despotism') && food > 2 && !city.weLoveKingDay)
    food -= 1;

  // Pollution: halve
  if (imp.pollution) food = (food + 1) >> 1;

  return food;
}

export function calcTileShields(gx, gy, ter, imp, hasSpecial, specialIdx, grasslandShield,
                                 isCenter, city, cityIndex, gameState, mapBase) {
  let shields = hasSpecial ? SPECIAL_TOTAL[ter][specialIdx - 1][1] : TERRAIN_BASE[ter][1];

  // Grassland shield
  if (grasslandShield) shields += 1;

  // Mining (without irrigation)
  if (imp.mining && !imp.irrigation) shields += MINING_BONUS[ter];

  // City center: minimum 1 shield
  if (isCenter && shields === 0) shields = 1;

  // King Richard's Crusade (wonder 8): +1 shield in wonder city
  if (cityHasWonder(gameState, cityIndex, 8)) shields += 1;

  // Offshore Platform (31): +1 shield on ocean tiles
  if (ter === 10 && cityHasBuilding(city, 31)) shields += 1;

  // Railroad: +50%
  const hasRailroad = imp.railroad ||
    (isCenter && gameState.civTechs && gameState.civTechs[city.owner] &&
     gameState.civTechs[city.owner].has(67));
  if (hasRailroad) shields = shields + Math.floor(shields / 2);

  // Despotism/Anarchy penalty
  const government = getGovernment(city, gameState);
  if ((government === 'anarchy' || government === 'despotism') && shields > 2 && !city.weLoveKingDay)
    shields -= 1;

  // Pollution: halve
  if (imp.pollution) shields = (shields + 1) >> 1;

  return shields;
}

export function calcTileTrade(ter, imp, hasSpecial, specialIdx, hasRiver,
                               isCenter, city, cityIndex, gameState) {
  let trade = hasSpecial ? SPECIAL_TOTAL[ter][specialIdx - 1][2] : TERRAIN_BASE[ter][2];

  // River: +1 trade
  if (hasRiver) trade += 1;

  // Road/Railroad: +1 trade if terrain < 3 OR trade > 0
  const hasRoad = imp.road || imp.railroad || isCenter;
  if (hasRoad && (ter < 3 || trade > 0)) trade += 1;

  // Ocean Colossus bonus (FUN_004e868f:3114): ocean tiles get +1 trade in Colossus city
  if (ter === 10 && cityHasWonder(gameState, cityIndex, 2)) trade += 1;

  // Colossus (wonder 2): +1 trade if trade > 0, in wonder city (FUN_004e868f:3162)
  if (trade > 0 && cityHasWonder(gameState, cityIndex, 2)) trade += 1;

  // Despotism/Anarchy penalty
  const government = getGovernment(city, gameState);
  if ((government === 'anarchy' || government === 'despotism') && trade > 2 && !city.weLoveKingDay)
    trade -= 1;

  // Republic/Democracy: +1 trade if trade > 0
  // Per FUN_004e868f:3189-3197, when WLtKD is active the threshold drops from
  // govt >= 5 (Republic/Democracy) to govt >= 2 (Monarchy through Democracy),
  // granting the +1 trade bonus to Monarchy, Communism, and Fundamentalism too.
  if (trade > 0) {
    const govtIdx = GOVT_INDEX[government] ?? 0;
    const threshold = city.weLoveKingDay ? 2 : 5;
    if (govtIdx >= threshold) trade += 1;
  }

  // Superhighways (25) + road: +50%
  if (hasRoad && cityHasBuilding(city, 25))
    trade = trade + Math.floor(trade / 2);

  // Pollution: halve
  if (imp.pollution) trade = (trade + 1) >> 1;

  return trade;
}

// ── Per-city aggregate functions ──

/**
 * Get [food, shields, trade] for a single tile in a city's radius.
 */
export function getTileYields(gx, gy, isCenter, city, cityIndex, gameState, mapBase) {
  const ter = mapBase.getTerrain(gx, gy);
  if (ter < 0 || ter > 10) return [0, 0, 0];

  const imp = mapBase.getImprovements(gx, gy);
  const hasRiver = mapBase.hasRiver && mapBase.hasRiver(gx, gy);
  const { hasSpecial, specialIdx, grasslandShield } = getTileResource(ter, gx, gy, mapBase);
  const government = getGovernment(city, gameState);

  const hasRailroad = imp.railroad ||
    (isCenter && gameState.civTechs && gameState.civTechs[city.owner] &&
     gameState.civTechs[city.owner].has(67));
  const food = calcTileFood(ter, imp, hasSpecial, specialIdx, isCenter, city, government, hasRailroad);
  const shields = calcTileShields(gx, gy, ter, imp, hasSpecial, specialIdx, grasslandShield,
                                   isCenter, city, cityIndex, gameState, mapBase);
  const trade = calcTileTrade(ter, imp, hasSpecial, specialIdx, hasRiver,
                               isCenter, city, cityIndex, gameState);

  return [food, shields, trade];
}

/**
 * Resolve a city radius tile index (0-20) to map coordinates.
 */
function radiusTileToGx(city, i, mapBase) {
  const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
  const parC = city.gy & 1;
  const parT = ((city.gy + ddy) % 2 + 2) % 2;
  const tgx = city.gx + ((parC + ddx - parT) >> 1);
  const tgy = city.gy + ddy;
  const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
  if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) return null;
  return { gx: wgx, gy: tgy };
}

/**
 * Compute gross food for a city (sum of all worked tiles).
 */
export function calcGrossFood(city, cityIndex, gameState, mapBase) {
  const worked = new Set(city.workedTiles);
  worked.add(20); // center always worked
  let gross = 0;
  for (const i of worked) {
    const pos = radiusTileToGx(city, i, mapBase);
    if (!pos) continue;
    const [food] = getTileYields(pos.gx, pos.gy, i === 20, city, cityIndex, gameState, mapBase);
    gross += food;
  }
  return gross;
}

/**
 * Compute gross shields for a city (sum of all worked tiles + factory/power multipliers).
 */
export function calcGrossShields(city, cityIndex, gameState, mapBase) {
  const worked = new Set(city.workedTiles);
  worked.add(20);
  let base = 0;
  for (const i of worked) {
    const pos = radiusTileToGx(city, i, mapBase);
    if (!pos) continue;
    const [, shields] = getTileYields(pos.gx, pos.gy, i === 20, city, cityIndex, gameState, mapBase);
    base += shields;
  }

  // Factory (15) and Mfg. Plant (16)
  let factoryMult = 0;
  if (cityHasBuilding(city, 15)) factoryMult += 2;
  if (cityHasBuilding(city, 16)) factoryMult += 2;

  // Power: Power Plant (19), Hydro (20), Nuclear (21), Solar (29), Hoover Dam (wonder 22)
  let powerMult = 0;
  if (cityHasBuilding(city, 19) || cityHasBuilding(city, 20) ||
      cityHasBuilding(city, 21) || cityHasBuilding(city, 29)) {
    powerMult = 2;
  } else if (civHasWonder(gameState, city.owner, 22)) {
    powerMult = 2; // Hoover Dam
  }
  if (powerMult > factoryMult) powerMult = factoryMult;

  return base + ((base * factoryMult) >> 2) + ((base * powerMult) >> 2);
}

/**
 * Compute gross trade for a city (sum of all worked tiles).
 */
export function calcGrossTrade(city, cityIndex, gameState, mapBase) {
  const worked = new Set(city.workedTiles);
  worked.add(20);
  let gross = 0;
  for (const i of worked) {
    const pos = radiusTileToGx(city, i, mapBase);
    if (!pos) continue;
    const [,, trade] = getTileYields(pos.gx, pos.gy, i === 20, city, cityIndex, gameState, mapBase);
    gross += trade;
  }
  return gross;
}

/**
 * Compute settler food support cost for a city's supported units.
 */
export function calcSettlerFoodSupport(city, units, gameState) {
  const government = getGovernment(city, gameState);
  let support = 0;
  for (const u of units) {
    if (u.owner !== city.owner || u.gx < 0) continue;
    if (u.homeCityId === undefined) continue; // no home city tracking
    if (SUPPORT_EXEMPT_TYPES.has(u.type)) continue;
    if (SETTLER_TYPES.has(u.type)) {
      support += SETTLER_FOOD_COST[government] || 1;
    }
  }
  return support;
}

/**
 * Compute net food surplus for a city.
 * Returns { grossFood, consumed, settlerSupport, surplus }
 */
export function calcFoodSurplus(city, cityIndex, gameState, mapBase, units) {
  const grossFood = calcGrossFood(city, cityIndex, gameState, mapBase);
  const consumed = city.size * 2;
  // Settler support: count settlers homed to this city
  const government = getGovernment(city, gameState);
  let settlerSupport = 0;
  for (const u of units) {
    if (u.owner !== city.owner || u.gx < 0) continue;
    if (SUPPORT_EXEMPT_TYPES.has(u.type)) continue;
    if (SETTLER_TYPES.has(u.type) && u.homeCityId === cityIndex) {
      settlerSupport += SETTLER_FOOD_COST[government] || 1;
    }
  }
  return {
    grossFood,
    consumed,
    settlerSupport,
    surplus: grossFood - consumed - settlerSupport,
  };
}

/**
 * Food needed to grow to next size.
 */
export function foodToGrow(citySize) {
  return (citySize + 1) * FOOD_BOX_MULTIPLIER;
}

// ── Shield support & waste ──

/**
 * Civ2 isometric distance (FUN_005ae296 + FUN_005ae31d).
 * Uses doubled cx/cy coordinates.
 */
function capitalDistance(cx1, cy1, cx2, cy2, mw2, mapShape) {
  let dx = Math.abs(cx1 - cx2);
  if (!(mapShape & 0x8000) && mw2 > 0 && dx > (mw2 >> 1)) dx = mw2 - dx;
  const dy = Math.abs(cy1 - cy2);
  const avg = (dx + dy) >> 1;
  if (dy < dx) return dx - ((avg - dy + 1) >> 1);
  return dy - ((avg - dx + 1) >> 1);
}

/**
 * Count shield support cost for units homed to a city.
 * Returns number of shields consumed by unit support.
 */
export function calcUnitShieldSupport(city, cityIndex, units, gameState) {
  const government = getGovernment(city, gameState);
  let unitCounter = 0;
  let shieldCost = 0;

  // A.2: AI uses difficulty-scaled free support; human uses cosmic constants
  const humanPlayers = gameState?.humanPlayers || 0xFF;
  const isAI = !((1 << city.owner) & humanPlayers);
  let freeSupport;
  if (government === 'anarchy' || government === 'despotism') {
    freeSupport = city.size; // same for AI and human
  } else if (government === 'republic' || government === 'democracy') {
    freeSupport = 0; // every unit costs
  } else if (isAI) {
    // AI formula: base = 0x0D - difficulty, bonuses at low difficulty
    const diffIdx = gameState?.difficulty
      ? ['chieftain','warlord','prince','king','emperor','deity'].indexOf(gameState.difficulty)
      : 0;
    let base = 13 - diffIdx;
    if (diffIdx < 3) base += 1;
    if (diffIdx === 0) base += 1;
    freeSupport = base;
  } else {
    // Human: use cosmic constants
    freeSupport = COSMIC_FREE_SUPPORT[government] || 0;
  }

  for (const u of units) {
    if (u.owner !== city.owner || u.gx < 0) continue;
    if (u.homeCityId !== cityIndex) continue;
    if (SUPPORT_EXEMPT_TYPES.has(u.type)) continue;

    unitCounter++;
    if (government === 'republic' || government === 'democracy') {
      shieldCost++; // every unit costs
    } else if (government === 'fundamentalism' && FANATIC_TYPES.has(u.type)) {
      continue; // fanatics are always free under fundamentalism
    } else if (unitCounter > freeSupport) {
      shieldCost++;
    }
  }
  return shieldCost;
}

/**
 * Shield waste from distance to capital (FUN_004e9c14).
 */
export function calcShieldWaste(city, grossShields, support, gameState, mapBase) {
  const govt = getGovernment(city, gameState);
  if (govt === 'fundamentalism' || govt === 'democracy' || city.owner === 0) return 0;
  if (city.hasPalace) return 0;
  const capital = gameState.cities.find(c => c.owner === city.owner && c.hasPalace);
  let distance = 32; // default when no capital (maximum waste)
  if (capital) {
    const mw2 = (mapBase.mw || 0) * 2;
    const mapShape = mapBase.mapShape || 0;
    distance = capitalDistance(city.cx, city.cy, capital.cx, capital.cy, mw2, mapShape);
  }

  const effGovt = city.weLoveKingDay ? GOVT_WLTKD_BUMP[govt] : govt;
  const gf = GOVT_FACTOR[effGovt] || 4;

  const available = grossShields - support;
  if (available <= 0) return 0;

  const distVal = (govt === 'communism') ? 0 : Math.min(distance, 16);
  let baseWaste = Math.trunc((distVal * available * 3) / (gf * 20));
  baseWaste = Math.max(0, Math.min(baseWaste, available));

  if (cityHasBuilding(city, 7) || cityHasBuilding(city, 1)) baseWaste >>= 1;

  // (#110) Wonder-based waste counters
  // Adam Smith's Trading Co. (wonder 17): halves waste
  if (hasWonderEffect(gameState, city.owner, 17)) baseWaste >>= 1;
  // Women's Suffrage (wonder 21): halves waste
  if (hasWonderEffect(gameState, city.owner, 21)) baseWaste >>= 1;

  const govtDiv = GOVT_CORRUPTION_DIVISOR[govt] || 1;
  let waste = Math.trunc(baseWaste / govtDiv);

  // Cap: ensure at least 1 shield after support + waste
  const cap = grossShields - support - 1;
  if (waste > cap) waste = cap;
  if (waste < 0) waste = 0;
  return waste;
}

/**
 * Compute net shield production for a city.
 * Returns { grossShields, support, waste, netShields }
 */
export function calcShieldProduction(city, cityIndex, gameState, mapBase, units) {
  const grossShields = calcGrossShields(city, cityIndex, gameState, mapBase);
  const support = calcUnitShieldSupport(city, cityIndex, units, gameState);
  const waste = calcShieldWaste(city, grossShields, support, gameState, mapBase);
  return {
    grossShields,
    support,
    waste,
    netShields: Math.max(0, grossShields - support - waste),
  };
}

/**
 * Get the shield cost of the item being produced.
 */
export function getProductionCost(item) {
  if (!item) return Infinity;
  switch (item.type) {
    case 'unit':     return UNIT_COSTS[item.id] ?? Infinity;
    case 'building': return IMPROVE_COSTS[item.id] ?? Infinity;
    case 'wonder':   return WONDER_COSTS[item.id - 39] ?? Infinity;
    default:         return Infinity;
  }
}

// ── Trade, corruption & distribution ──

/**
 * (#102) Trade corruption (FUN_004e989a). Distance-to-capital formula.
 * When capital and city share the same continent (bodyId), use road-network
 * distance instead of raw isometric distance.
 */
export function calcTradeCorruption(city, grossTrade, gameState, mapBase) {
  const govt = getGovernment(city, gameState);
  if (govt === 'fundamentalism' || govt === 'democracy') return 0;
  if (city.hasPalace) return 0;
  if (grossTrade <= 0) return 0;

  const capital = gameState.cities.find(c => c.owner === city.owner && c.hasPalace);
  let distance = 32; // default when no capital
  if (capital) {
    const mw2 = (mapBase.mw || 0) * 2;
    const mapShape = mapBase.mapShape || 0;

    // (#102) Check if capital and city share continent for road-network distance
    let sameContinent = false;
    if (mapBase.getBodyId) {
      const cityBody = mapBase.getBodyId(city.gx, city.gy);
      const capBody = mapBase.getBodyId(capital.gx, capital.gy);
      sameContinent = (cityBody === capBody && cityBody >= 0);
    }

    if (sameContinent && mapBase.tileData) {
      // Use road-network distance: BFS along road/railroad tiles
      const roadDist = _roadNetworkDistance(city.gx, city.gy, capital.gx, capital.gy, mapBase);
      if (roadDist >= 0) {
        distance = roadDist;
      } else {
        // No road connection — fall back to raw isometric distance
        distance = capitalDistance(city.cx, city.cy, capital.cx, capital.cy, mw2, mapShape);
      }
    } else {
      distance = capitalDistance(city.cx, city.cy, capital.cx, capital.cy, mw2, mapShape);
    }
  }

  const effGovt = city.weLoveKingDay ? GOVT_WLTKD_BUMP[govt] : govt;
  const gf = GOVT_FACTOR[effGovt] || 4;
  // Binary FUN_004e989a (calc_corruption) lines 3635-3641: communism uses a
  // flat "equivalent distance" (COSMIC param 16, DAT_0064bcd8, default 10)
  // instead of real capital distance. This gives communism uniform corruption
  // across all cities regardless of distance. The previous JS used 0, making
  // communism have ZERO corruption — that was wrong.
  const COSMIC_COMMUNISM_EQUIV_DISTANCE = 10; // DAT_0064bcd8 default
  const distVal = (govt === 'communism') ? COSMIC_COMMUNISM_EQUIV_DISTANCE : distance;
  let corruption = Math.trunc((distVal * grossTrade * 3) / (gf * 20));
  corruption = Math.max(0, Math.min(corruption, grossTrade));

  if (cityHasBuilding(city, 7) || cityHasBuilding(city, 1)) corruption >>= 1;

  // (#110) Wonder-based corruption counters
  if (hasWonderEffect(gameState, city.owner, 17)) corruption >>= 1; // Adam Smith's
  if (hasWonderEffect(gameState, city.owner, 21)) corruption >>= 1; // Women's Suffrage

  return corruption;
}

/**
 * (#102) BFS road-network distance between two tiles.
 * Only follows tiles with road or railroad improvements.
 * Returns hop count, or -1 if no road connection exists.
 */
function _roadNetworkDistance(gx1, gy1, gx2, gy2, mapBase) {
  const { mw, mh, tileData, wraps } = mapBase;
  if (!tileData) return -1;

  // Quick exit if same tile
  if (gx1 === gx2 && gy1 === gy2) return 0;

  // BFS with cap at 64 hops to avoid runaway on large maps
  const MAX_DIST = 64;
  const visited = new Set();
  const key = (gx, gy) => `${gx},${gy}`;
  const queue = [{ gx: gx1, gy: gy1, dist: 0 }];
  visited.add(key(gx1, gy1));

  // 8 neighbor offsets in doubled-X isometric coordinates
  const ADJ = [[-1,-1],[1,-1],[1,1],[-1,1],[0,-2],[0,2],[2,0],[-2,0]];

  while (queue.length > 0) {
    const { gx, gy, dist } = queue.shift();
    if (dist >= MAX_DIST) continue;

    const dx = gx * 2 + (gy % 2);
    const mw2 = mw * 2;
    for (const [odx, ody] of ADJ) {
      let ndx = dx + odx;
      const ndy = gy + ody;
      if (ndy < 0 || ndy >= mh) continue;
      if (wraps) {
        ndx = ((ndx % mw2) + mw2) % mw2;
      } else if (ndx < 0 || ndx >= mw2) {
        continue;
      }
      const ngx = ndx >> 1;
      const k = key(ngx, ndy);
      if (visited.has(k)) continue;

      const idx = ndy * mw + ngx;
      const tile = tileData[idx];
      if (!tile) continue;
      const imp = tile.improvements || tile;
      if (!(imp.road || imp.railroad)) continue;

      if (ngx === gx2 && ndy === gy2) return dist + 1;
      visited.add(k);
      queue.push({ gx: ngx, gy: ndy, dist: dist + 1 });
    }
  }
  return -1;
}

/**
 * Distribute net trade into luxury, tax, and science (FUN_004ea1f6).
 * Returns { lux, tax, sci }
 */
export function calcTradeDistribution(netTrade, city, cityIndex, gameState) {
  const civData = gameState.civs?.[city.owner];
  let sciRate = civData ? (civData.scienceRate || 0) : 0;   // 0-10 tenths
  const taxRate = civData ? (civData.taxRate || 0) : 0;
  const govt = getGovernment(city, gameState);

  // Fundamentalism caps science rate at 5 (DAT_0064BCDD default=5)
  if (govt === 'fundamentalism' && sciRate > 5) sciRate = 5;

  const luxRate = 10 - sciRate - taxRate;

  let lux = netTrade > 0 && luxRate > 0
    ? Math.min(netTrade, Math.floor((netTrade * luxRate + 4) / 10)) : 0;
  let sci = netTrade > 0 && sciRate > 0
    ? Math.min(netTrade - lux, Math.floor((netTrade * sciRate + 4) / 10)) : 0;
  let tax = netTrade - (sci + lux);

  // A.5: AI Fundamentalism gold→science conversion
  // Binary: applied BEFORE specialist bonuses and building multipliers
  const humanPlayers = gameState.humanPlayers || 0xFF;
  const isAI = !((1 << city.owner) & humanPlayers);
  if (isAI && govt === 'fundamentalism') {
    sci += tax;
    tax = 0;
  }

  // Specialist bonuses (before building multipliers)
  // Binary ref: entertainer(status1)=2 luxury, taxman(status2)=3 gold, scientist(status3)=3 science
  // DAT_006a65fc is LUXURY output (not gold), DAT_006a6554 is GOLD output (not luxury)
  const specs = countSpecialists(city);
  lux += specs.entertainer * 2;
  tax += specs.taxman * 3;
  sci += specs.scientist * 3;

  // Fundamentalism science penalty (FUN_004ea1f6:3899-3901):
  // Applied AFTER specialist bonuses but BEFORE building multipliers.
  // science -= (DAT_0064bcd9 * science) / 100
  if (govt === 'fundamentalism') {
    sci -= Math.trunc((COSMIC_FUNDAMENTALISM_SCIENCE_PENALTY * sci) / 100);
  }

  // Marketplace(5)/Bank(10)/Stock Exchange(22): each +50% to lux and tax
  let lgMult = 0;
  if (cityHasBuilding(city, 5)) lgMult++;
  if (cityHasBuilding(city, 10)) lgMult++;
  if (cityHasBuilding(city, 22)) lgMult++;
  lux += (lux * lgMult) >> 1;
  tax += (tax * lgMult) >> 1;

  // Library(6)/University(12)/Research Lab(26) or SETI(wonder 26): each +50% to sci
  let sciMult = 0;
  if (cityHasBuilding(city, 6)) sciMult++;
  if (cityHasBuilding(city, 12)) sciMult++;
  if (cityHasBuilding(city, 26) || civHasWonder(gameState, city.owner, 26)) sciMult++;

  // Isaac Newton's College (wonder 16): doubles science building effect in wonder city
  let sciBonus = sci * sciMult;
  if (!cityHasWonder(gameState, cityIndex, 16)) sciBonus >>= 1;
  sci += sciBonus;

  // Copernicus' Observatory (wonder 11): doubles science in wonder city
  if (cityHasWonder(gameState, cityIndex, 11)) sci <<= 1;

  return { lux, tax, sci };
}

function countSpecialists(city) {
  const specs = { entertainer: 0, taxman: 0, scientist: 0 };
  if (!city.specialists) return specs;
  for (const s of city.specialists) {
    if (specs[s] != null) specs[s]++;
  }
  return specs;
}

/**
 * Total building maintenance for a city (gold per turn).
 * Port of FUN_004f00f0 (per-building upkeep) with special cases:
 * - Barracks(2): Chieftain reduces cost by 1; Gunpowder(35) adds +1
 * - Adam Smith's(wonder 17): eliminates upkeep for buildings with cost == 1 (not <= 1)
 * - Fundamentalism: Temple(4), Colosseum(14), Cathedral(11) are free
 */
export function calcBuildingMaintenance(city, gameState) {
  let total = 0;
  const smithFree = gameState && hasWonderEffect(gameState, city.owner, 17);
  const govt = getGovernment(city, gameState);
  const diffIdx = gameState?.difficulty
    ? ['chieftain','warlord','prince','king','emperor','deity'].indexOf(gameState.difficulty)
    : 0;
  const civTechs = gameState?.civTechs?.[city.owner];
  const hasGunpowder = civTechs ? civTechs.has(35) : false;

  if (city.buildings) {
    for (const id of city.buildings) {
      let cost = IMPROVE_MAINTENANCE[id] || 0;

      // Barracks (building 2) special scaling
      if (id === 2) {
        if (diffIdx < 2 && cost !== 0) cost -= 1;
        if (hasGunpowder) cost += 1;
      }

      // Adam Smith's Trading Co. (wonder 17): free upkeep for buildings with cost == 1
      if (smithFree && cost === 1) cost = 0;

      // Fundamentalism: Temple(4), Colosseum(14), Cathedral(11) are maintenance-free
      if (cost !== 0 && govt === 'fundamentalism' && (id === 4 || id === 14 || id === 11)) {
        cost = 0;
      }

      total += cost;
    }
  }
  return total;
}

/**
 * D.5: Calculate ongoing trade route income for a city.
 *
 * Each active trade route contributes:
 *   base = (cityA.tradeBase + cityB.tradeBase + distance) / 8
 *
 * Where tradeBase = grossTrade for each city. Modifiers:
 *   - Railroad connection between cities: +50%
 *   - Same continent (same landmass body ID): halved
 *   - Foreign civ (different owner): +50%
 *   - Demand bonus: +50% if commodity matches partner city's demand
 *
 * @param {object} city - the city with trade routes
 * @param {number} cityIndex
 * @param {object} gameState
 * @param {object} mapBase
 * @returns {number} total ongoing trade route gold per turn
 */
export function calcTradeRouteIncome(city, cityIndex, gameState, mapBase) {
  if (!city.tradeRoutes || city.tradeRoutes.length === 0) return 0;

  const myGross = calcGrossTrade(city, cityIndex, gameState, mapBase);
  let total = 0;

  for (const route of city.tradeRoutes) {
    const dest = gameState.cities[route.destCityIndex];
    if (!dest || dest.size <= 0) continue;

    const destGross = calcGrossTrade(dest, route.destCityIndex, gameState, mapBase);

    // Binary FUN_00440750 lines 175-176:
    // income = (city1.tradeBase + city2.tradeBase) * (distance + 10) / 24
    let dx = Math.abs(city.gx - dest.gx);
    if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
    const dy = Math.abs(city.gy - dest.gy);
    const dist = dx + dy;
    let income = Math.floor((myGross + destGross) * (dist + 10) / 24);

    // Same continent: halved
    if (mapBase.getBodyId) {
      const myBody = mapBase.getBodyId(city.gx, city.gy);
      const destBody = mapBase.getBodyId(dest.gx, dest.gy);
      if (myBody === destBody && myBody >= 0) {
        income = Math.floor(income / 2);
      }
    }

    // Foreign civ: +50%
    if (city.owner !== dest.owner) {
      income = income + Math.floor(income / 2);
    }

    // Demand bonus: if commodity matches destination city's demand list, +50%
    if (route.commodity != null && dest.demandList) {
      if (dest.demandList.includes(route.commodity)) {
        income = income + Math.floor(income / 2);
      }
    }

    // Railroad connection: +50% (check if road path with railroad exists)
    // Approximation: if both cities have railroads (via their center tiles having
    // tech 67 Railroad), grant the bonus
    if (gameState.civTechs?.[city.owner]?.has(67)) {
      income = income + Math.floor(income / 2);
    }

    // Minimum 1 gold per active route
    total += Math.max(1, income);
  }

  return total;
}

/**
 * Compute full trade output for a city.
 * Returns { grossTrade, corruption, netTrade, lux, tax, sci, maintenance, tradeRouteIncome }
 */
/**
 * (#111) Compute full trade output for a city.
 * Post-trade corruption: corruption is recalculated on the total gross
 * (tile trade + trade route income), matching binary FUN_004e989a behavior.
 */
export function calcCityTrade(city, cityIndex, gameState, mapBase) {
  const grossTrade = calcGrossTrade(city, cityIndex, gameState, mapBase);
  const tradeRouteIncome = calcTradeRouteIncome(city, cityIndex, gameState, mapBase);
  // (#111) Binary recalculates corruption on total including trade routes
  const totalGross = grossTrade + tradeRouteIncome;
  const corruption = calcTradeCorruption(city, totalGross, gameState, mapBase);
  const netTrade = totalGross - corruption;
  const { lux, tax, sci } = calcTradeDistribution(netTrade, city, cityIndex, gameState);
  const maintenance = calcBuildingMaintenance(city, gameState);
  return { grossTrade: totalGross, corruption, netTrade, lux, tax, sci, maintenance, tradeRouteIncome };
}

// ═══════════════════════════════════════════════════════════════════
// D.5: Trade commodity supply/demand calculation
// Port of FUN_0043d400 (calc_city_trade_desirability, 8227 bytes)
//
// Computes supply and demand values for 16 trade commodities per city.
// Used to assign commodities to Caravans/Freight and determine trade
// route profitability. Factors in: terrain in city radius, tech,
// buildings, city size, map position, continent, and science rate.
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate supply and demand arrays for 16 trade commodities.
 * Port of FUN_0043d400 (calc_city_trade_desirability).
 *
 * @param {object} city - city object
 * @param {number} cityIndex - index in state.cities
 * @param {object} state - game state
 * @param {object} mapBase - map accessor
 * @returns {{ supply: number[], demand: number[] }} 16-element arrays
 */
export function calcSupplyDemand(city, cityIndex, state, mapBase) {
  const supply = new Array(16).fill(0);
  const demand = new Array(16).fill(0);

  // Size tier: (city.size + 2) / 5 (integer division)
  const sizeTier = Math.trunc((city.size + 2) / 5);

  // Science rate (0-100 scale; binary uses tenths so we convert)
  const civData = state.civs?.[city.owner];
  const scienceRate = civData ? (civData.scienceRate || 0) * 10 : 0;

  // Tech helper
  const hasTech = (techId) => !!(state.civTechs?.[city.owner]?.has(techId));

  // Global tech helper: true if ANY alive civ has the tech (binary uses global flags)
  const anyoneHasTech = (techId) => {
    if (!state.civTechs) return false;
    for (let c = 1; c < 8; c++) {
      if (!(state.civsAlive & (1 << c))) continue;
      if (state.civTechs[c]?.has(techId)) return true;
    }
    return false;
  };

  // Count terrain types in city radius (21 tiles)
  const terrainCount = new Array(11).fill(0);
  let riverCount = 0;
  let roadCount = 0;
  for (let i = 0; i < 21; i++) {
    const pos = _radiusTileToGxForSupply(city, i, mapBase);
    if (!pos) continue;
    const ter = mapBase.getTerrain(pos.gx, pos.gy);
    if (ter >= 0 && ter <= 10) {
      terrainCount[ter]++;
      // River tiles add 3 to their terrain type count
      if (mapBase.hasRiver && mapBase.hasRiver(pos.gx, pos.gy)) {
        terrainCount[ter] += 3;
        riverCount++;
      }
    }
    // Count road tiles
    const imp = mapBase.getImprovements(pos.gx, pos.gy);
    if (imp.road || imp.railroad) roadCount++;
  }

  // Merge jungle into tundra (as per binary: terrainCount[6] += terrainCount[7]; terrainCount[7] = 0)
  // NOTE: in binary terrain indices, tundra=6, glacier=7 — these map to our indices 6,7
  // Actually the binary merges jungle(9) into tundra(6) differently. Checking reference:
  // "jungleMerge: 'terrainCount[6] += terrainCount[7]; terrainCount[7] = 0'"
  // This is tundra absorbing glacier count, then glacier count zeroed
  terrainCount[6] += terrainCount[7];
  terrainCount[7] = 0;

  // Map position metrics
  const distX = Math.abs(city.gx - (mapBase.mw >> 1));
  const distY = Math.abs(city.gy - (mapBase.mh >> 1));
  const mapH = mapBase.mh || 50;
  const mapW = mapBase.mw || 80;

  // Continent (body) ID
  const continent = mapBase.getBodyId ? mapBase.getBodyId(city.gx, city.gy) : 0;

  const t = terrainCount;

  // ── Supply formulas (from TRADE_DESIRABILITY.supplyFormulas) ──

  // [0] Hides: t[9]*3 + t[6]*6 + t[3]*4 + riverCount*3
  supply[0] = t[9] * 3 + t[6] * 6 + t[3] * 4 + riverCount * 3;
  if (scienceRate < 16) supply[0] *= 2;
  if (scienceRate < 24) supply[0] *= 2;
  if (scienceRate < 49 && city.size < 3) supply[0] *= 2;
  else if (scienceRate >= 49) supply[0] = supply[0] >> 1;
  if (city.size > 7) supply[0] = supply[0] >> 1;

  // [1] Wool: (riverCount/2 + t[4]*2 + t[2]) * coastalBonus
  {
    let coastalBonus = t[6] + 2;
    if (distY > Math.trunc(mapH / 3)) coastalBonus = t[6] + 3;
    supply[1] = (Math.trunc(riverCount / 2) + t[4] * 2 + t[2]) * coastalBonus;
  }

  // [2] Beads: t[10]*8 - distY
  supply[2] = t[10] * 8 - distY;
  if (city.size > 9) supply[2] = supply[2] >> 1;
  if (scienceRate > 32) supply[2] = supply[2] >> 1;

  // [3] Cloth: (t[1]*3 + t[0] - riverCount) * clamp(scienceRate/10, 1, 2)
  {
    const clampedSci = Math.max(1, Math.min(2, Math.trunc(scienceRate / 10)));
    supply[3] = (t[1] * 3 + t[0] - riverCount) * clampedSci;
    if (hasTech(37)) supply[3] = Math.trunc(supply[3] * 3 / 2); // Industrialization: *3/2
    if (scienceRate < 8) supply[3] = supply[3] >> 1;
    if (scienceRate < 16) supply[3] = supply[3] >> 1;
  }

  // [4] Gems (supply): (t[10]*3 + t[0]*4 + t[8]*2) - scienceRate/6
  supply[4] = t[10] * 3 + t[0] * 4 + t[8] * 2 - Math.trunc(scienceRate / 6);
  if (!hasTech(65)) supply[4] = Math.trunc(supply[4] / 3); // no Pottery: /3
  if (cityHasBuilding(city, 9)) supply[4] = Math.trunc(supply[4] * 3 / 2); // Aqueduct: +50%
  if ((continent & 1) && continent < 6) supply[4] = Math.trunc(supply[4] * 3 / 2); // odd continent <6: +50%

  // [5] Salt: (t[9]+t[1]+t[3]+t[8]+1) * t[4] * 5
  {
    supply[5] = (t[9] + t[1] + t[3] + t[8] + 1) * t[4] * 5;
    const clampedTier = Math.max(1, Math.min(2, Math.trunc(sizeTier / 2)));
    supply[5] = Math.trunc(supply[5] * clampedTier / 2);
    if ((continent & 1) && continent > 1) supply[5] = Math.trunc(supply[5] * 3 / 2); // odd cont >1: +50%
    if (scienceRate < 20) supply[5] = supply[5] >> 1;
  }

  // [6] Coal: t[5]*5 + t[4]*5
  supply[6] = t[5] * 5 + t[4] * 5;
  if (continent !== 0 && (continent & 1) === 0) supply[6] *= 2; // even non-zero continent: doubled

  // [7] Copper/Wine: (t[2]*5 - t[1] + riverCount) * 2
  supply[7] = (t[2] * 5 - t[1] + riverCount) * 2;
  if (continent !== 0 && (continent & 3) === 0) supply[7] *= 4; // continent divisible by 4: *4

  // [8] Dye/Spice: complex river/terrain formula + map position
  {
    const rv5 = riverCount * 5;
    const t2v = t[2];
    supply[8] = Math.max(rv5, t2v) + Math.trunc((Math.trunc(mapW / 2) - distX) / 2);
    if (city.gy > Math.trunc(mapH / 2)) supply[8] = supply[8] >> 1; // southern hemisphere: halved
    if (((continent - 2) & 3) === 0) supply[8] = Math.trunc(supply[8] * 3 / 2); // (cont-2)%4==0: +50%
    // French (civStyle 9) or Fundamentalism bonus
    const civStyle = state.civs?.[city.owner]?.rulesCivNumber;
    if (civStyle === 9) supply[8] *= 2;
    if (city.size > 10) supply[8] = supply[8] >> 1;
  }

  // [9] Gold: (t[3]*2 + t[9] + 1) * (t[4] + 1)
  supply[9] = (t[3] * 2 + t[9] + 1) * (t[4] + 1);
  if (supply[9] > 0) supply[9] += distX * 2;
  if (continent % 5 === 0) supply[9] *= 2;
  {
    const civStyle = state.civs?.[city.owner]?.rulesCivNumber;
    if (civStyle === 11) supply[9] *= 2; // Chinese: doubled
    if (civStyle === 10) supply[9] *= 2; // Aztecs: doubled
  }

  // [10] Spice: t[5]*8
  supply[10] = t[5] * 8;
  if (supply[10] > 0) supply[10] += t[4] + distX;
  if (!hasTech(39)) supply[10] = supply[10] >> 1; // no Iron Working: halved
  if (continent > 8) supply[10] = Math.trunc(supply[10] * 3 / 2); // continent >8: +50%
  if (city.size < 5) supply[10] = supply[10] >> 1;

  // [11] Silver/Ivory: (t[9]*3+t[8]*2+t[0]*2) * ((t[10]+riverCount)/2)
  supply[11] = (t[9] * 3 + t[8] * 2 + t[0] * 2) * Math.trunc((t[10] + riverCount) / 2);
  if (supply[11] > 0 && distY < 10) supply[11] *= 2;
  if (supply[11] > 0) supply[11] -= distY;
  if (continent === 1) supply[11] = supply[11] >> 1;

  // [12] Silk/Gold: (t[5]+1)*(t[8]+1)*(t[0]+1) + t[1]
  supply[12] = (t[5] + 1) * (t[8] + 1) * (t[0] + 1) + t[1];
  if (supply[12] > 0) {
    const clampedTier = Math.max(1, Math.min(4, sizeTier));
    supply[12] = Math.trunc(clampedTier * supply[12] / 2);
  }
  if (continent === 7) supply[12] = Math.trunc(supply[12] * 3 / 2); // continent 7: +50%

  // [13] Gems/Dye: (t[5] + t[4]/2 + 1) * (riverCount + 2)
  supply[13] = (t[5] + Math.trunc(t[4] / 2) + 1) * (riverCount + 2);
  if (t[5] > 2) supply[13] *= 2;
  if (city.size > 4) supply[13] *= 2;
  if (city.size > 9) supply[13] *= 2;

  // [14] Oil: t[6]*8 + t[0]*10 + t[8]*6 + t[7]*12
  supply[14] = t[6] * 8 + t[0] * 10 + t[8] * 6 + t[7] * 12;
  if (!anyoneHasTech(58)) supply[14] = supply[14] >> 3; // no Nuclear Fission globally: /8
  if (supply[14] === 0) supply[14] = -1;
  if (supply[14] !== -1) {
    // D14: continent modifiers from binary
    if (continent === 17) {
      supply[14] = supply[14] * 3;                        // continent 17: ×3
    } else if (continent > 1 && ((continent - 1) & 7) === 0) {
      supply[14] = supply[14] + (supply[14] >> 1);        // (continent-1)%8==0: +50%
    }
    const clampedTier2 = Math.max(1, Math.min(2, Math.trunc(sizeTier / 2) - 2));
    supply[14] = supply[14] * Math.max(1, clampedTier2);
  }

  // [15] Uranium-II: (t[6]+t[0]+1) * (t[4]+riverCount+1) * (t[5]+1)
  if (hasTech(24)) { // has Electronics
    supply[15] = (t[6] + t[0] + 1) * (t[4] + riverCount + 1) * (t[5] + 1);
    if (continent % 10 === 0) supply[15] = Math.trunc(supply[15] * 3 / 2);
    const capTier = Math.min(6, sizeTier);
    supply[15] = Math.trunc(supply[15] * capTier / 6);
  } else {
    supply[15] = -1;
  }

  // ── Demand formulas (from TRADE_DESIRABILITY.demandFormulas) ──

  // [0] Hides: (t[6]+t[7])*5 + distY*3/2 + t[5]*2 + t[3]
  demand[0] = (t[6] + t[7]) * 5 + Math.trunc(distY * 3 / 2) + t[5] * 2 + t[3];
  if (city.size < 3) demand[0] *= 2;
  if (hasTech(37)) demand[0] = Math.trunc(demand[0] / 3); // Industrialization: /3
  if (hasTech(48)) demand[0] = 1; // Mass Production: set to 1
  if (scienceRate < 10) demand[0] *= 2;
  if (scienceRate < 20) demand[0] *= 2;
  if (scienceRate > 47) demand[0] = demand[0] >> 1;

  // [1] Wool: abs(mapH/4 - distY)*2 + t[1]*2 + t[3]
  demand[1] = Math.abs(Math.trunc(mapH / 4) - distY) * 2 + t[1] * 2 + t[3];
  if (hasTech(37)) demand[1] *= 2; // Industrialization: doubled

  // [2] Beads: distY + (21 - t[10])*3/2
  demand[2] = distY + Math.trunc((21 - t[10]) * 3 / 2);
  if (city.size < 4) demand[2] = Math.trunc(demand[2] * 3 / 2); // +50%
  if (city.size > 11) demand[2] = demand[2] >> 1;
  if (scienceRate > 47) demand[2] = demand[2] >> 1;

  // [3] Cloth demand: t[4]*4 + t[3]*4 + (scienceRate/10 * demand[0]) / 8
  demand[3] = t[4] * 4 + t[3] * 4 + Math.trunc((Math.trunc(scienceRate / 10) * demand[0]) / 8);

  // [4] Salt demand: decaying weight loop
  {
    let weight = 8;
    let remaining = city.size;
    let saltDemand = 0;
    for (let step = 0; step < 5 && weight > 0; step++) {
      const portion = Math.max(0, Math.min(remaining, 5));
      saltDemand += portion * weight;
      remaining -= portion;
      weight = weight >> 1;
    }
    demand[4] = saltDemand - Math.trunc(scienceRate / 2);
  }

  // [5] Coal: (distY + 10) * sizeTier + scienceRate
  demand[5] = (distY + 10) * sizeTier + scienceRate;
  if (city.size < 5) demand[5] = 0;
  else if (city.size < 8) demand[5] = demand[5] >> 1;
  if (hasTech(37)) demand[5] *= 2; // Industrialization: doubled
  if (hasTech(23)) demand[5] *= 2; // Electricity: doubled
  if (cityHasBuilding(city, 19)) demand[5] *= 2; // Power Plant: doubles
  if (cityHasBuilding(city, 20) || cityHasBuilding(city, 21) || cityHasBuilding(city, 29)) {
    demand[5] = Math.trunc(demand[5] / 8); // Hydro/Nuclear/Solar: /8
  }

  // [6] Wine: (riverCount + roadCount + 1) * sizeTier
  demand[6] = (riverCount + roadCount + 1) * sizeTier;
  if (demand[6] <= supply[6]) demand[6] = demand[6] >> 1;
  if (cityHasBuilding(city, 5)) demand[6] = Math.trunc(demand[6] * 3 / 2); // Marketplace: +50%
  if (cityHasBuilding(city, 10)) demand[6] = Math.trunc(demand[6] * 3 / 2); // Bank: +50%
  if (hasTech(23)) demand[6] = Math.trunc(demand[6] * 3 / 2); // Electricity: +50%
  if (hasTech(16)) demand[6] = Math.trunc(demand[6] / 4); // Computers: /4
  if (city.size < 5) demand[6] = demand[6] >> 1;

  // [7] Cloth demand: supply[3] + roadCount
  demand[7] = supply[3] + roadCount;
  if (hasTech(10)) demand[7] = demand[7] >> 1; // Chemistry (tech 10) — halved
  if (hasTech(48)) demand[7] = demand[7] >> 1; // Mass Production (tech 48) — halved

  // [8] demand: sizeTier*4 + 4 + abs(city.gx - city.gy)
  demand[8] = sizeTier * 4 + 4 + Math.abs(city.gx - city.gy);

  // [9] demand: map-position + terrain formula
  demand[9] = (Math.trunc(mapH / 2) - distY) * 2 - distX + Math.trunc(mapW / 2)
            + t[9] * 4 + Math.trunc(t[1] / 2) + t[8] * 2 + t[0] * 4;
  {
    const shift = Math.max(-1, Math.min(1, sizeTier - 1));
    if (shift > 0) demand[9] = demand[9] << shift;
    else if (shift < 0) demand[9] = demand[9] >> (-shift);
  }
  if (city.size < 7) demand[9] = demand[9] >> 1;

  // [10-12] Special commodity demand: selected by (x+y) % 3
  {
    const slotPick = (city.gx + city.gy) % 3;
    const targetSlot = slotPick === 0 ? 10 : slotPick === 1 ? 12 : 13;
    const baseDemand = city.size * 8;
    let val = baseDemand;
    if (cityHasBuilding(city, 11)) val = Math.trunc(val * 3 / 2); // Cathedral: +50%
    if (cityHasBuilding(city, 10)) val = Math.trunc(val * 3 / 2); // Bank: +50%
    if (hasTech(22)) val = val >> 1; // Economics: halved
    if (hasTech(16)) val = val >> 1; // Computers: halved
    const civStyle = state.civs?.[city.owner]?.rulesCivNumber;
    if (civStyle === 17) val *= 2; // Spanish: doubled
    demand[targetSlot] = val;
  }

  // [11] Spice demand: continent_pop / 10 - max(scienceRate - 12, 0)
  {
    // Approximate continent population (sum of city sizes on same continent)
    let contPop = 0;
    if (mapBase.getBodyId) {
      const myBody = mapBase.getBodyId(city.gx, city.gy);
      for (const c of state.cities) {
        if (c.size > 0 && mapBase.getBodyId(c.gx, c.gy) === myBody) contPop += c.size;
      }
    }
    demand[11] = Math.trunc(contPop / 10) - Math.max(scienceRate - 12, 0);
    if (city.size < 4) demand[11] = demand[11] >> 1;
    if (contPop > 400 && city.size > 7) demand[11] *= 2;
    if (hasTech(70)) demand[11] = demand[11] >> 1; // Refrigeration: halved
  }

  // [14] Oil demand: requires Industrialization (tech 37)
  if (hasTech(37)) {
    demand[14] = Math.trunc(scienceRate / 3) * (sizeTier + 2);
    if (demand[14] <= supply[14]) demand[14] = demand[14] >> 1;
    if (cityHasBuilding(city, 15)) demand[14] = Math.trunc(demand[14] * 3 / 2); // Factory: +50%
    if (!cityHasBuilding(city, 15)) {
      if (city.size < 5) demand[14] = demand[14] >> 1;
      if (city.size < 10) demand[14] = demand[14] >> 1;
      if (city.size < 20) demand[14] = demand[14] >> 1;
    }
    if (hasTech(5)) demand[14] *= 3; // Automobile: *3
    if (cityHasBuilding(city, 25)) demand[14] *= 2; // Superhighways: doubled
    if (cityHasBuilding(city, 13)) demand[14] = demand[14] >> 1; // Mass Transit: halved
    if (cityHasBuilding(city, 18)) demand[14] = demand[14] >> 1; // Recycling Center: halved
  } else {
    demand[14] = -1;
  }

  // [15] Uranium demand: requires Electronics (tech 24)
  if (hasTech(24)) {
    demand[15] = scienceRate * scienceRate;
    const shift = Math.max(-3, Math.min(0, sizeTier - 3));
    if (shift < 0) demand[15] = demand[15] >> (-shift);
    if (cityHasBuilding(city, 21) || cityHasBuilding(city, 17)) demand[15] *= 2; // Nuclear Plant or SDI: doubled
  } else {
    demand[15] = -1;
  }

  // Clamp all values to >= -1
  for (let i = 0; i < 16; i++) {
    if (supply[i] < -1) supply[i] = -1;
    if (demand[i] < -1) demand[i] = -1;
  }

  // (#103) Demand slots 6/7 swap: binary swaps Wine(6) and Copper(7) demand
  // after calculation (FUN_0043d400 line ~5200)
  const tmp67 = demand[6];
  demand[6] = demand[7];
  demand[7] = tmp67;

  // (#103) Conflict resolution: if a commodity has both high supply and high demand,
  // suppress the lower one. Then select top-3 supply and top-3 demand.
  for (let i = 0; i < 16; i++) {
    if (supply[i] > 0 && demand[i] > 0) {
      // Binary conflict resolution: keep whichever is higher, zero the other
      if (supply[i] >= demand[i]) {
        demand[i] = 0;
      } else {
        supply[i] = 0;
      }
    }
  }

  // (#103) Top-3 selection with sort: pick 3 highest supply and 3 highest demand slots
  const supplyRanked = [];
  const demandRanked = [];
  for (let i = 0; i < 16; i++) {
    if (supply[i] > 0) supplyRanked.push({ idx: i, val: supply[i] });
    if (demand[i] > 0) demandRanked.push({ idx: i, val: demand[i] });
  }
  supplyRanked.sort((a, b) => b.val - a.val);
  demandRanked.sort((a, b) => b.val - a.val);

  // Zero out non-top-3 supply
  const topSupply = new Set(supplyRanked.slice(0, 3).map(e => e.idx));
  for (let i = 0; i < 16; i++) {
    if (supply[i] > 0 && !topSupply.has(i)) supply[i] = 0;
  }
  // Zero out non-top-3 demand
  const topDemand = new Set(demandRanked.slice(0, 3).map(e => e.idx));
  for (let i = 0; i < 16; i++) {
    if (demand[i] > 0 && !topDemand.has(i)) demand[i] = 0;
  }

  return { supply, demand };
}

/**
 * Resolve a city radius tile index to map coordinates (for supply/demand).
 * Same logic as radiusTileToGx but accessible to calcSupplyDemand.
 */
function _radiusTileToGxForSupply(city, i, mapBase) {
  const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
  const parC = city.gy & 1;
  const parT = ((city.gy + ddy) % 2 + 2) % 2;
  const tgx = city.gx + ((parC + ddx - parT) >> 1);
  const tgy = city.gy + ddy;
  const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
  if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) return null;
  return { gx: wgx, gy: tgy };
}

// ═══════════════════════════════════════════════════════════════════
// SURROUNDING_TILE_ANALYSIS — port of FUN_004e7641 (653 bytes)
//
// Scans 25 tiles around a city (21 city radius + 4 extended outer)
// and computes per-tile threat/ownership flags for AI use.
// ═══════════════════════════════════════════════════════════════════

/**
 * Resolve an extended radius tile index (0-24) to map coordinates.
 * Uses CITY_RADIUS_EXTENDED (21 standard + 4 extra outer tiles).
 */
function _extendedTileToGx(cityGx, cityGy, i, mapBase) {
  const [ddx, ddy] = CITY_RADIUS_EXTENDED[i];
  const parC = cityGy & 1;
  const parT = ((cityGy + ddy) % 2 + 2) % 2;
  const tgx = cityGx + ((parC + ddx - parT) >> 1);
  const tgy = cityGy + ddy;
  const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
  if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) return null;
  return { gx: wgx, gy: tgy };
}

/**
 * Analyze surrounding tiles around a city for threat assessment.
 * Port of FUN_004e7641 (SURROUNDING_TILE_ANALYSIS).
 *
 * Scans 25 tiles (city radius + 4 extended outer tiles).
 * For each tile, computes flags:
 *   0x01: invalid/off-map/not visible to city owner
 *   0x04: enemy military unit present
 *   0x08: foreign city present on tile
 *   0x10: tile claimed by nearby rival city (within distance 3)
 *   0x20: enemy unit belongs to civ at war with us
 *
 * @param {object} state - game state
 * @param {object} mapBase - map accessor
 * @param {number} cityGx - city gx coordinate
 * @param {number} cityGy - city gy coordinate
 * @param {number} ownerCiv - civ slot of the city owner
 * @returns {number[]} array of 25 flag values
 */
export function analyzeSurroundingTiles(state, mapBase, cityGx, cityGy, ownerCiv) {
  const flags = new Array(25).fill(0);
  const fowBit = 1 << ownerCiv;

  for (let i = 0; i < 25; i++) {
    const pos = _extendedTileToGx(cityGx, cityGy, i, mapBase);
    if (!pos) {
      flags[i] = 0x01; // off-map
      continue;
    }

    const { gx, gy } = pos;

    // Check visibility
    if (mapBase.tileData) {
      const tileIdx = gy * mapBase.mw + gx;
      const tile = mapBase.tileData[tileIdx];
      if (!tile || !(tile.visibility & fowBit)) {
        flags[i] = 0x01; // not visible to this civ
        continue;
      }
    }

    // Check for enemy military units
    for (const u of state.units) {
      if (u.gx !== gx || u.gy !== gy || u.gx < 0) continue;
      if (u.owner === ownerCiv) continue;
      if ((UNIT_ATK[u.type] || 0) <= 0) continue; // non-combat unit

      flags[i] |= 0x04; // enemy military unit present

      // Check if this enemy is at war with us
      const a = Math.min(ownerCiv, u.owner);
      const b = Math.max(ownerCiv, u.owner);
      const treatyStatus = state.treaties?.[`${a}-${b}`];
      if (treatyStatus === 'war') {
        flags[i] |= 0x20; // at war
      }
      break; // one enemy unit is enough to set flags
    }

    // Check for foreign city
    for (const c of state.cities) {
      if (c.gx === gx && c.gy === gy && c.size > 0 && c.owner !== ownerCiv) {
        flags[i] |= 0x08; // foreign city present
        break;
      }
    }

    // Check if tile is claimed by a nearby rival city (within distance 3)
    for (const c of state.cities) {
      if (c.size <= 0 || c.owner === ownerCiv) continue;
      let dx = Math.abs(c.gx - gx);
      if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
      const dy = Math.abs(c.gy - gy);
      // Manhattan distance in gx/gy space
      if (dx + dy <= 3) {
        flags[i] |= 0x10; // claimed by rival city
        break;
      }
    }
  }

  return flags;
}

// ═══════════════════════════════════════════════════════════════════
// GARRISON_PROXIMITY — port of FUN_004e7967 (1048 bytes)
//
// Finds the nearest city owned by a civ that has a military garrison.
// Returns Manhattan distance. Default 32 if no garrison found.
// Used in espionage cost calculations and AI decision-making.
// ═══════════════════════════════════════════════════════════════════

/**
 * Calculate distance to nearest garrisoned city for a given civ.
 * Port of FUN_004e7967 (GARRISON_PROXIMITY).
 *
 * A "garrison" is any military unit (attack > 0) stationed at a city.
 *
 * @param {object} state - game state (needs cities, units)
 * @param {object} mapBase - map accessor (needs mw, wraps)
 * @param {number} gx - reference tile gx coordinate
 * @param {number} gy - reference tile gy coordinate
 * @param {number} civSlot - civ slot to check for garrisons
 * @returns {number} distance to nearest garrisoned city (default 32)
 */
export function calcGarrisonProximity(state, mapBase, gx, gy, civSlot) {
  const DEFAULT_DISTANCE = 32;
  if (!state.cities) return DEFAULT_DISTANCE;

  let bestDist = DEFAULT_DISTANCE;
  for (const city of state.cities) {
    if (city.owner !== civSlot || city.size <= 0) continue;
    // Binary FUN_004e7967: check building 1 (Palace) as garrison indicator
    if (!city.buildings?.has(1)) {
      // Check for any military unit at this city
      const hasGarrison = state.units?.some(u =>
        u.gx === city.gx && u.gy === city.gy && u.owner === civSlot &&
        u.gx >= 0 && (UNIT_ATK[u.type] || 0) > 0);
      if (!hasGarrison) continue;
    }
    let dx = Math.abs(gx - city.gx);
    if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
    const dy = Math.abs(gy - city.gy);
    const dist = dx + dy;
    if (dist < bestDist) bestDist = dist;
  }
  return bestDist;
}

// ═══════════════════════════════════════════════════════════════════
// expandCityTerritory — Claim the best unowned tile in city radius
// Port of FUN_004a0000 block territory expansion logic.
// Called after city growth and after founding a city.
// ═══════════════════════════════════════════════════════════════════

// Terrain desirability scores for territory expansion (from binary)
const TERRITORY_TERRAIN_SCORE = [
  1, // 0 Desert
  4, // 1 Plains
  3, // 2 Grassland (base; +2 with shield → 5)
  3, // 3 Forest
  3, // 4 Hills
  1, // 5 Mountains
  1, // 6 Tundra
  0, // 7 Glacier
  2, // 8 Swamp
  2, // 9 Jungle
  0, // 10 Ocean
];

/**
 * Expand a city's territory by claiming the single best-scoring unowned tile
 * in the city's 20-tile radius (excluding center).
 *
 * Scoring: terrain base score + inner ring bonus (+1 for tiles 0-7) + river bonus (+3).
 * Only unowned tiles are eligible (tileOwnership === 0 or 0x0F or undefined).
 *
 * @param {object} state - game state (for city lookup)
 * @param {object} mapBase - map data + accessors
 * @param {number} cityIndex - index into state.cities
 * @returns {{ gx: number, gy: number }|null} the claimed tile, or null if none available
 */
export function expandCityTerritory(state, mapBase, cityIndex) {
  const city = state.cities[cityIndex];
  if (!city || city.size <= 0) return null;

  const { mw, mh, tileData, wraps } = mapBase;
  const cityGx = city.gx;
  const cityGy = city.gy;
  const parC = cityGy & 1;

  // Binary FUN_004f080d: TWO-PASS expansion.
  // Pass 1: Prioritize unowned tiles with special resources.
  // Pass 2: If no resource tile found, pick best tile by terrain score.

  // Helper to get radius tile coordinates
  const getRadiusTile = (ri) => {
    const [ddx, ddy] = CITY_RADIUS_DOUBLED[ri];
    const parT = ((cityGy + ddy) % 2 + 2) % 2;
    const tgx = cityGx + ((parC + ddx - parT) >> 1);
    const tgy = cityGy + ddy;
    const wgx = wraps ? ((tgx % mw) + mw) % mw : tgx;
    if (tgy < 0 || tgy >= mh || wgx < 0 || wgx >= mw) return null;
    return { wgx, tgy };
  };

  const isUnowned = (tile) => {
    const o = tile.tileOwnership;
    return o === 0 || o === 0x0F || o === undefined || o === null;
  };

  // Pass 1: Resource-first claiming (binary lines 200-210)
  for (let ri = 0; ri < 20; ri++) {
    const pos = getRadiusTile(ri);
    if (!pos) continue;
    const tile = tileData[pos.tgy * mw + pos.wgx];
    if (!tile || !isUnowned(tile)) continue;
    const ter = tile.terrain;
    if (ter < 0 || ter > 10) continue;
    // Check for special resource
    if (mapBase.getResource) {
      const res = mapBase.getResource(pos.wgx, pos.tgy);
      if (res > 0) {
        tile.tileOwnership = city.owner;
        return { gx: pos.wgx, gy: pos.tgy };
      }
    }
  }

  // Pass 2: Best terrain score (binary fallback via FUN_004f03b7)
  let bestScore = -1;
  let bestGx = -1;
  let bestGy = -1;

  for (let ri = 0; ri < 20; ri++) {
    const pos = getRadiusTile(ri);
    if (!pos) continue;
    const { wgx, tgy } = pos;

    const tileIdx = tgy * mw + wgx;
    const tile = tileData[tileIdx];
    if (!tile || !isUnowned(tile)) continue;

    const ter = tile.terrain;
    if (ter < 0 || ter > 10) continue;

    let score = TERRITORY_TERRAIN_SCORE[ter];

    // Grassland with shield bonus
    if (ter === 2 && mapBase.hasShield && mapBase.hasShield(wgx, tgy)) {
      score += 2;
    }

    // Inner ring bonus (tiles 0-7)
    if (ri < 8) score += 1;

    // River bonus
    if (tile.river) score += 3;

    if (score > bestScore) {
      bestScore = score;
      bestGx = wgx;
      bestGy = tgy;
    }
  }

  if (bestGx < 0) return null;

  // Claim the tile
  tileData[bestGy * mw + bestGx].tileOwnership = city.owner;
  return { gx: bestGx, gy: bestGy };
}

export function calcGarrisonDistance(state, mapBase, gx, gy, civSlot) {
  const DEFAULT_DISTANCE = 32;
  let minDist = DEFAULT_DISTANCE;

  // Build a set of city locations that have military garrisons
  const garrisonedCities = new Set();
  for (const u of state.units) {
    if (u.owner !== civSlot || u.gx < 0) continue;
    if ((UNIT_ATK[u.type] || 0) <= 0) continue; // non-combat
    // Check if this unit is in one of our cities
    for (const c of state.cities) {
      if (c.owner === civSlot && c.size > 0 && c.gx === u.gx && c.gy === u.gy) {
        garrisonedCities.add(c);
        break;
      }
    }
  }

  // Find shortest Manhattan distance to any garrisoned city
  for (const c of garrisonedCities) {
    let dx = Math.abs(c.gx - gx);
    if (mapBase.wraps) dx = Math.min(dx, mapBase.mw - dx);
    const dy = Math.abs(c.gy - gy);
    const dist = dx + dy;
    if (dist < minDist) minDist = dist;
  }

  return minDist;
}
