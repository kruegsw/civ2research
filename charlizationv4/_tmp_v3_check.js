// Captured input state for the city, then run v3's processCityTurn
// on the same input and dump the result. Compare to binary's captured
// output bytes (decoded from state_out).
import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { initFromSav } from '../charlizationv3/engine/init.js';
import { assignInitialWorkers } from '../charlizationv3/engine/reduce/helpers.js';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { buildSav } from './sav-from-mem.js';

const SNAP = 'snapshots/game_20260425_222957/turn_0001_80x50_deity.bin';
loadSnapshotIntoMem(SNAP);
const parsed = Civ2Parser.parse(buildSav(), SNAP);
const seatList = [];
for (let i = 0; i < 7; i++) seatList.push({ seatIndex: i, name: `Civ${i+1}`, ai: i !== 4 });
const init = initFromSav(parsed, seatList);
const state = init.gameState;
const mapBase = init.mapBase;

// Actual city location: cx=3, cy=41, owner=5, cityIdx=3 (per CITY_FOUNDED)
const cx = 3, cy = 41, owner = 5;
const gx = cx >> 1, gy = cy;
console.log(`City at cx=${cx} cy=${cy} → gx=${gx} gy=${gy}`);
console.log(`Map dims: ${mapBase.mw} x ${mapBase.mh}`);

// Show terrain in city radius (radius 2)
const RADIUS_2 = [
  [0,0], [-1,-1], [1,-1], [1,1], [-1,1], [0,-2], [0,2], [2,0], [-2,0],
  [-1,-3], [1,-3], [-2,-2], [2,-2], [-3,-1], [3,-1],
  [-3,1], [3,1], [-2,2], [2,2], [-1,3], [1,3]
];
const TERRAIN = ['Desert','Plains','Grassland','Forest','Hills','Mountains',
                 'Tundra','Glacier','Swamp','Jungle','Ocean'];

const inRadius = [];
for (let i = 0; i < RADIUS_2.length; i++) {
  const [dx, dy] = RADIUS_2[i];
  const tx = gx + dx, ty = gy + dy;
  if (tx < 0 || tx >= mapBase.mw || ty < 0 || ty >= mapBase.mh) continue;
  const tile = mapBase.tileData[ty * mapBase.mw + tx];
  if (!tile) continue;
  const t = tile.terrain;
  inRadius.push({ idx: i, dx, dy, tx, ty, t, name: TERRAIN[t] ?? `T${t}`, river: !!tile.river });
}
console.log('\nTerrain in radius:');
for (const r of inRadius) {
  console.log(`  [${r.idx}] (${r.dx},${r.dy}) gx=${r.tx},gy=${r.ty}  ${r.name}${r.river?' RIVER':''}`);
}

// Inject city
const newCity = {
  name: '', owner, originalOwner: owner, size: 1,
  cx, cy, gx, gy, x: cx, y: cy,
  flags: 0, civilDisorder: false, weLoveKingDay: false,
  foodInBox: 0, shieldsInBox: 0, netBaseTrade: 0,
  buildings: new Set([1]), workedTiles: [], specialists: [],
  itemInProduction: { type: 'unit', id: 2 },
  hasPalace: true, homeCity: 0xFF,
};
state.cities = [...(state.cities || []), newCity];
const cityIdx = state.cities.length - 1;

// Mark center tile as city (binary does this on founding)
const centerTileIdx = gy * mapBase.mw + gx;
if (mapBase.tileData[centerTileIdx]) {
  mapBase.tileData[centerTileIdx].improvements = {
    ...mapBase.tileData[centerTileIdx].improvements,
    city: true, road: true,
  };
  mapBase.tileData[centerTileIdx].tileOwnership = owner;
}

newCity.workedTiles = assignInitialWorkers(gx, gy, 1, newCity, cityIdx, state, mapBase);
console.log('\nv3 worked tiles:', newCity.workedTiles);
for (const wi of newCity.workedTiles) {
  const r = inRadius.find(x => x.idx === wi);
  console.log(`  → idx ${wi} = ${r?.name ?? '?'} at (${r?.tx},${r?.ty})`);
}

// Compute trade using v3's calcGrossTrade directly (since netBaseTrade
// is only written by end-turn post-processing pass, not per-city tick).
import { calcGrossTrade, calcGrossFood, calcShieldProduction } from '../charlizationv3/engine/production.js';

const grossFood = calcGrossFood(newCity, cityIdx, state, mapBase);
const { grossShields } = calcShieldProduction(newCity, cityIdx, state, mapBase, state.units);
const grossTrade = calcGrossTrade(newCity, cityIdx, state, mapBase);
console.log('\nv3 calc directly (without END_TURN, includes center+worked tiles):');
console.log('  grossFood:', grossFood);
console.log('  grossShields:', grossShields);
console.log('  grossTrade:', grossTrade);

console.log('\nBinary captured (FUN_004ea8e4 only):');
console.log('  netBaseTrade: 3, workedTilesFood: 2, workedTilesShield: 1, workedTilesTrade: 3');
console.log('  contentCitizens: 4, happyCitizens: 2');
