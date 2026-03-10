// ═══════════════════════════════════════════════════════════════════
// reducer.js — Authoritative state transitions (shared: server + client)
//
// The ONLY code that mutates game state. The server calls
// applyAction(gameState, mapBase, action) for every validated action.
// Returns a new state object if valid, or the same reference if rejected.
//
// Never mutates the input state directly — clones first.
// ═══════════════════════════════════════════════════════════════════

import { validateAction } from './rules.js';
import { MOVE_UNIT, END_TURN, BUILD_CITY, SET_WORKERS } from './actions.js';
import { MOVEMENT_MULTIPLIER, UNIT_MOVE_POINTS, CITY_RADIUS_DOUBLED, TERRAIN_BASE, IRRIGATION_BONUS } from './defs.js';
import { resolveDirection, moveCost } from './movement.js';
import { updateVisibility } from './visibility.js';

// City name lists indexed by rulesCivNumber (LEADERS.TXT order)
// rulesCivNumber 0 = Romans, 1 = Babylonians, ... (barbarians use slot 0, not rulesCivNumber)
const CIV_CITY_NAMES = [
  /* 0 Romans */         ['Rome','Caesarea','Carthago','Nicopolis','Byzantium','Brundisium','Syracuse','Antioch','Londinium','Tarrentum','Lutetia','Hispalis','Ravenna','Artaxata','Palmyra','Cyrene'],
  /* 1 Babylonians */    ['Babylon','Sumer','Ur','Nineveh','Ashur','Ellipi','Akkad','Eridu','Kish','Lagash','Nippur','Shuruppak','Umma','Sippar'],
  /* 2 Germans */        ['Berlin','Hamburg','Munich','Cologne','Frankfurt','Essen','Dortmund','Stuttgart','Düsseldorf','Bremen','Hannover','Leipzig','Dresden','Bonn','Nuremberg'],
  /* 3 Egyptians */      ['Thebes','Memphis','Oryx','Heliopolis','Gaza','Alexandria','Byblos','Cairo','Coptos','Edfu','Pithom','Busirus','Athribis','Mendes','Tanis'],
  /* 4 Americans */      ['Washington','New York','Boston','Philadelphia','Atlanta','Chicago','Buffalo','St. Louis','Detroit','New Orleans','Baltimore','Denver','Cincinnati','Dallas','Los Angeles'],
  /* 5 Greeks */         ['Athens','Sparta','Corinth','Delphi','Eretria','Pharsalos','Argos','Mycenae','Herakleia','Antioch','Ephesus','Rhodes','Knossos','Troy'],
  /* 6 Indians */        ['Delhi','Bombay','Madras','Bangalore','Calcutta','Lahore','Karachi','Kolhapur','Jaipur','Hyderabad','Bengal','Chittagong','Punjab','Dacca'],
  /* 7 Russians */       ['Moscow','St. Petersburg','Kiev','Minsk','Smolensk','Odessa','Sevastopol','Tiflis','Yakutsk','Vladivostok','Novosibirsk','Krasnoyarsk','Irkutsk'],
  /* 8 Zulus */          ['Zimbabwe','Ulundi','Bapedi','Hlobane','Isandhlwana','Intombe','Mpande','Mgungundlovu','Ondini','Nobamba','Bulawayo','KwaDukuza'],
  /* 9 French */         ['Paris','Lyon','Marseille','Tours','Chartres','Avignon','Rouen','Grenoble','Dijon','Amiens','Toulouse','Cherbourg','Poitiers','Bordeaux','Strasbourg'],
  /* 10 Aztecs */        ['Tenochtitlan','Tlatelolco','Texcoco','Tlaxcala','Calixtlahuaca','Xochicalco','Tlacopan','Atzcapotzalco','Tzintzuntzan','Malinalco','Tula','Tamuin'],
  /* 11 Chinese */       ['Peking','Shanghai','Canton','Nanking','Tsingtao','Hangchow','Tientsin','Tatung','Macao','Anyang','Shantung','Chinan','Kaifeng','Suchow'],
  /* 12 English */       ['London','Coventry','Birmingham','Dover','Nottingham','York','Liverpool','Brighton','Oxford','Cambridge','Hastings','Canterbury','Newcastle','Warwick'],
  /* 13 Mongols */       ['Samarkand','Bokhara','Nishapur','Karakorum','Kashgar','Tabriz','Aleppo','Kabul','Ormuz','Basra','Khanbalik','Merv'],
  /* 14 Celts */         ['Entremont','Bibracte','Alesia','Numantia','Camulodunum','Gergovia','Lugdunum','Burdigala','Avaricum','Cenabum','Tolosa','Lemonum'],
  /* 15 Japanese */      ['Tokyo','Kyoto','Osaka','Nagoya','Yokohama','Sapporo','Kobe','Sendai','Nara','Nagasaki','Hiroshima','Fukuoka'],
  /* 16 Vikings */       ['Trondheim','Reykjavik','Bergen','Oslo','Stockholm','Uppsala','Helsinki','Nidaros','Roskilde','Hedeby','Birka','Jorvik'],
  /* 17 Spanish */       ['Madrid','Barcelona','Seville','Cordoba','Toledo','Salamanca','Cadiz','Pamplona','Burgos','Murcia','Valencia','Leon','Granada','Bilbao'],
  /* 18 Persians */      ['Persepolis','Pasargadae','Susa','Ecbatana','Tarsus','Gordium','Bactra','Sardis','Ergili','Dariush-Kabir','Ghulaman','Zohak'],
  /* 19 Carthaginians */ ['Carthage','Leptis Magna','Hadrumetum','Thapsus','Cirta','Utica','Hippo Regius','Gades','Panormus','Lilybaeum'],
  /* 20 Sioux */         ['Oglala','Minneconjou','Brulé','Hunkpapa','Sans Arc','Two Kettle','Blackfeet','Santee','Sisseton','Wahpeton'],
];
const BARBARIAN_CITY_NAMES = ['Camp'];

function getCityName(owner, cities, civData) {
  if (owner === 0) {
    return BARBARIAN_CITY_NAMES[0];
  }
  const rulesNum = civData?.[owner]?.rulesCivNumber ?? 0;
  const nameList = CIV_CITY_NAMES[rulesNum] || CIV_CITY_NAMES[0];
  const ownedNames = new Set(cities.filter(c => c.owner === owner).map(c => c.name));
  for (const name of nameList) {
    if (!ownedNames.has(name)) return name;
  }
  return `City ${cities.filter(c => c.owner === owner).length + 1}`;
}

/**
 * Assign initial workers for a new city. Evaluates all 21 radius tiles
 * and picks the best N tiles (by food, then shields) for workers.
 * Returns workedTiles: number[] (tile indices 0-19).
 */
function assignInitialWorkers(gx, gy, size, mapBase) {
  const parC = gy & 1;
  const scores = [];
  for (let i = 0; i < 20; i++) { // indices 0-19 (not 20=center, always worked)
    const [ddx, ddy] = CITY_RADIUS_DOUBLED[i];
    const parT = ((gy + ddy) % 2 + 2) % 2;
    const tgx = gx + ((parC + ddx - parT) >> 1);
    const tgy = gy + ddy;
    const wgx = mapBase.wraps ? ((tgx % mapBase.mw) + mapBase.mw) % mapBase.mw : tgx;
    if (tgy < 0 || tgy >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;
    const ter = mapBase.getTerrain(tgx, tgy);
    if (ter < 0 || ter > 10 || ter === 10) continue; // skip ocean
    const base = TERRAIN_BASE[ter];
    const food = base[0];
    const shields = base[1];
    scores.push({ i, score: food * 10 + shields });
  }
  scores.sort((a, b) => b.score - a.score);

  const toPlace = Math.min(size, scores.length);
  return scores.slice(0, toPlace).map(s => s.i);
}

/**
 * Apply an action to the game state.
 *
 * @param {object} prev - current authoritative game state (never mutated)
 * @param {object} mapBase - immutable map data + accessor functions
 * @param {object} action - { type, ...params }
 * @param {number} civSlot - civ slot of the acting player
 * @returns {object} new state if valid, same reference if rejected
 */
export function applyAction(prev, mapBase, action, civSlot) {
  // Validate
  const error = validateAction(prev, mapBase, action, civSlot);
  if (error) return prev;

  // Clone mutable state (shallow clone units array, deep clone moved unit)
  const state = { ...prev, units: [...prev.units] };

  switch (action.type) {
    case MOVE_UNIT: {
      const { unitIndex, dir } = action;
      const unit = { ...state.units[unitIndex] };
      const dest = resolveDirection(unit.gx, unit.gy, dir, mapBase);

      // Calculate cost
      const cost = moveCost(unit.type, mapBase, unit.gx, unit.gy, dest.gx, dest.gy);

      // Update position
      unit.gx = dest.gx;
      unit.gy = dest.gy;
      unit.x = dest.gx * 2 + (dest.gy % 2);
      unit.y = dest.gy;

      // Deduct movement (minimum 1 third spent, even on railroad)
      unit.movesLeft = Math.max(0, unit.movesLeft - Math.max(cost, 1));

      // Wake from sleep/fortify
      if (unit.orders === 2 || unit.orders === 3) unit.orders = 0;

      state.units[unitIndex] = unit;

      // Update visibility for this civ around new position
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, dest.gx, dest.gy, mapBase.wraps);

      break;
    }

    case BUILD_CITY: {
      const { unitIndex } = action;
      const unit = state.units[unitIndex];

      // Compute initial worker placement for size-1 city
      const workedTiles = assignInitialWorkers(unit.gx, unit.gy, 1, mapBase);

      // Create city at settler's position
      const isFirstCity = prev.cities.filter(c => c.owner === unit.owner).length === 0;
      const buildings = new Set();
      if (isFirstCity) buildings.add(1); // Palace
      const newCity = {
        name: getCityName(unit.owner, prev.cities, prev.civData),
        owner: unit.owner,
        originalOwner: unit.owner,
        size: 1,
        gx: unit.gx, gy: unit.gy,
        cx: unit.gx * 2 + (unit.gy % 2), cy: unit.gy,
        hasWalls: false, hasPalace: isFirstCity,
        civilDisorder: false, weLoveKingDay: false, isOccupied: false,
        workedTiles,
        specialists: [],
        buildings,
        foodInBox: 0, shieldsInBox: 0,
      };
      state.cities = [...prev.cities, newCity];

      // Remove settler (mark as dead)
      state.units[unitIndex] = { ...unit, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };

      // Update visibility with city radius (cities have radius 2)
      updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, civSlot, newCity.gx, newCity.gy, mapBase.wraps, 2);

      break;
    }

    case SET_WORKERS: {
      const { cityIndex, workedTiles, specialists } = action;
      state.cities = [...prev.cities];
      state.cities[cityIndex] = {
        ...state.cities[cityIndex],
        workedTiles: [...workedTiles],
        specialists: [...specialists],
      };
      break;
    }

    case END_TURN: {
      // Find next alive civ
      let next = state.activeCiv;
      let turnNumber = state.turnNumber;
      for (let i = 0; i < 7; i++) {
        next = (next % 7) + 1; // cycle 1→2→3→...→7→1
        if (state.civsAlive & (1 << next)) break;
      }
      // If we wrapped back to first alive civ, increment turn
      const firstAlive = findFirstAliveCiv(state.civsAlive);
      if (next <= state.activeCiv || next === firstAlive) {
        turnNumber++;
      }

      state.activeCiv = next;
      state.turnNumber = turnNumber;

      // Reset movement for the next civ's units
      state.units = state.units.map(u => {
        if (u.owner !== next) return u;
        return { ...u, movesLeft: UNIT_MOVE_POINTS[u.type] * MOVEMENT_MULTIPLIER };
      });

      break;
    }

    default:
      return prev;
  }

  state.version = (prev.version || 0) + 1;
  return state;
}

function findFirstAliveCiv(civsAlive) {
  for (let i = 1; i < 8; i++) {
    if (civsAlive & (1 << i)) return i;
  }
  return 1;
}
