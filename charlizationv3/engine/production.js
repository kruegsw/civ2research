// ═══════════════════════════════════════════════════════════════════
// production.js — City yield calculations (shared: server + client)
//
// Pure functions that compute per-tile and per-city food, shields,
// and trade. Extracted from citydialog.js display code into engine
// so the reducer can process cities on END_TURN.
// ═══════════════════════════════════════════════════════════════════

import {
  TERRAIN_BASE, IRRIGATION_BONUS, MINING_BONUS, SPECIAL_TOTAL,
  CITY_RADIUS_DOUBLED, SETTLER_TYPES, SUPPORT_EXEMPT_TYPES,
  SETTLER_FOOD_COST, FOOD_BOX_MULTIPLIER, FANATIC_TYPES,
  COSMIC_FREE_SUPPORT, UNIT_COSTS, IMPROVE_COSTS, WONDER_COSTS,
  IMPROVE_MAINTENANCE,
  GOVT_FACTOR, GOVT_CORRUPTION_DIVISOR, GOVT_WLTKD_BUMP,
  COSMIC_FUNDAMENTALISM_SCIENCE_PENALTY,
} from './defs.js';
import { cityHasBuilding, civHasWonder, cityHasWonder, hasWonderEffect, getGovernment } from './utils.js';

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

export function calcTileFood(ter, imp, hasSpecial, specialIdx, isCenter, city, government) {
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

  // Colossus (wonder 2): +1 trade if trade > 0, in wonder city
  if (trade > 0 && cityHasWonder(gameState, cityIndex, 2)) trade += 1;

  // Despotism/Anarchy penalty
  const government = getGovernment(city, gameState);
  if ((government === 'anarchy' || government === 'despotism') && trade > 2 && !city.weLoveKingDay)
    trade -= 1;

  // Republic/Democracy: +1 trade if trade > 0
  if ((government === 'republic' || government === 'democracy') && trade > 0) trade += 1;

  // D.2: WLTKD bonus — +1 trade on every tile that produces trade > 0
  if (city.weLoveKingDay && trade > 0) trade += 1;

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

  const food = calcTileFood(ter, imp, hasSpecial, specialIdx, isCenter, city, government);
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
  if (!capital) return 0;

  const mw2 = (mapBase.mw || 0) * 2;
  const mapShape = mapBase.mapShape || 0;
  const distance = capitalDistance(city.cx, city.cy, capital.cx, capital.cy, mw2, mapShape);

  const effGovt = city.weLoveKingDay ? GOVT_WLTKD_BUMP[govt] : govt;
  const gf = GOVT_FACTOR[effGovt] || 4;

  const available = grossShields - support;
  if (available <= 0) return 0;

  const distVal = (govt === 'communism') ? 3 : Math.min(distance, 16);
  let baseWaste = Math.trunc((distVal * available * 3) / (gf * 20));
  baseWaste = Math.max(0, Math.min(baseWaste, available));

  if (cityHasBuilding(city, 7) || cityHasBuilding(city, 1)) baseWaste >>= 1;

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
 * Trade corruption (FUN_004e989a). Distance-to-capital formula.
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
    distance = capitalDistance(city.cx, city.cy, capital.cx, capital.cy, mw2, mapShape);
  }

  const effGovt = city.weLoveKingDay ? GOVT_WLTKD_BUMP[govt] : govt;
  const gf = GOVT_FACTOR[effGovt] || 4;
  const distVal = (govt === 'communism') ? 3 : distance; // no cap (unlike shields)
  let corruption = Math.trunc((distVal * grossTrade * 3) / (gf * 20));
  corruption = Math.max(0, Math.min(corruption, grossTrade));

  if (cityHasBuilding(city, 7) || cityHasBuilding(city, 1)) corruption >>= 1;
  return corruption;
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

  // Fundamentalism science penalty (Raw C FUN_004ea1f6 line 3900):
  // science -= (DAT_0064bcd9 * science) / 100
  // Applied AFTER all specialist/building/wonder multipliers.
  if (govt === 'fundamentalism') {
    sci -= Math.trunc((COSMIC_FUNDAMENTALISM_SCIENCE_PENALTY * sci) / 100);
  }

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

    // Binary ref: base = (city1.tradeRevenue + city2.tradeRevenue + 4) >> 3
    // Uses constant 4, not distance between cities
    let income = (myGross + destGross + 4) >> 3;

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
export function calcCityTrade(city, cityIndex, gameState, mapBase) {
  const grossTrade = calcGrossTrade(city, cityIndex, gameState, mapBase);
  const tradeRouteIncome = calcTradeRouteIncome(city, cityIndex, gameState, mapBase);
  const totalGross = grossTrade + tradeRouteIncome;
  const corruption = calcTradeCorruption(city, totalGross, gameState, mapBase);
  const netTrade = totalGross - corruption;
  const { lux, tax, sci } = calcTradeDistribution(netTrade, city, cityIndex, gameState);
  const maintenance = calcBuildingMaintenance(city, gameState);
  return { grossTrade: totalGross, corruption, netTrade, lux, tax, sci, maintenance, tradeRouteIncome };
}
