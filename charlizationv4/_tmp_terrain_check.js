import { Civ2Parser } from '../charlizationv3/engine/parser.js';
import { initFromSav } from '../charlizationv3/engine/init.js';
import { loadSnapshotIntoMem } from './load-snapshot.js';
import { buildSav } from './sav-from-mem.js';

const SNAP = 'snapshots/game_20260425_222957/turn_0001_80x50_deity.bin';
loadSnapshotIntoMem(SNAP);
const parsed = Civ2Parser.parse(buildSav(), SNAP);
const seatList = [];
for (let i = 0; i < 7; i++) seatList.push({ seatIndex: i, name: `Civ${i+1}`, ai: i !== 4 });
const init = initFromSav(parsed, seatList);
const mapBase = init.mapBase;

// Washington at (cx=54, cy=40) → gx = 27, gy = 40
const cgx = 27, cgy = 40;
console.log(`Washington at gx=${cgx}, gy=${cgy} (cx=${cgx*2}, cy=${cgy})`);
console.log(`Map dims: ${mapBase.mw} x ${mapBase.mh}`);

// City radius-2 has 21 tiles. Show terrain for each.
const RADIUS_2 = [
  [0,0], [-1,-1], [1,-1], [1,1], [-1,1], [0,-2], [0,2], [2,0], [-2,0],
  [-1,-3], [1,-3], [-2,-2], [2,-2], [-3,-1], [3,-1],
  [-3,1], [3,1], [-2,2], [2,2], [-1,3], [1,3]
];

const TERRAIN_NAMES = ['Desert','Plains','Grassland','Forest','Hills','Mountains',
                       'Tundra','Glacier','Swamp','Jungle','Ocean'];

for (let i = 0; i < RADIUS_2.length; i++) {
  const [dx, dy] = RADIUS_2[i];
  const tx = cgx + dx, ty = cgy + dy;
  if (tx < 0 || tx >= mapBase.mw || ty < 0 || ty >= mapBase.mh) {
    console.log(`  [${i}] (${dx},${dy}) → off-map`);
    continue;
  }
  const tile = mapBase.tileData[ty * mapBase.mw + tx];
  if (!tile) {
    console.log(`  [${i}] (${dx},${dy}) → no tile data`);
    continue;
  }
  const t = tile.terrain;
  const name = TERRAIN_NAMES[t] ?? `T${t}`;
  const river = tile.river ? ' RIVER' : '';
  const special = tile.specialResource ? ' SPECIAL' : '';
  console.log(`  [${i}] (${dx},${dy}) gx=${tx},gy=${ty}  ${name}${river}${special}  improvements: ${JSON.stringify(tile.improvements ?? {})}`);
}
