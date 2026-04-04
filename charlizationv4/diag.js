#!/usr/bin/env node
// Quick diagnostic: dump raw unit/city/civ state after loading a .sav
import './globals-init.js';
import { G } from './globals.js';
import { s8, u8, s16, u16, s32, u32, v, wv, w16, w32 } from './mem.js';
import { loadSav } from './sav-loader.js';
import { loadRules, initBinaryConstants } from './rules-loader.js';
import { readFileSync } from 'fs';

const savPath = process.argv[2] || '../20260301_early-game-data/20260301_research_02_early game few cities.sav';
initBinaryConstants();
loadRules(readFileSync('/home/kruegsw/Games/Civilization II Multiplayer Gold Edition/RULES.TXT', 'utf8'));
const info = loadSav(new Uint8Array(readFileSync(savPath)));

const totalUnits = s16(DAT_00655b16, 0);
const totalCities = s16(DAT_00655b18, 0);

console.log(`=== ${totalUnits} UNITS (raw memory) ===`);
for (let i = 0; i < totalUnits; i++) {
  const b = i * 0x20;
  const x = s16(DAT_006560f0, b), y = s16(DAT_006560f0, b + 2);
  const type = G._MEM[DAT_006560f0 + b + 6], owner = G._MEM[DAT_006560f0 + b + 7];
  const movesLeft = G._MEM[DAT_006560f0 + b + 8], dmg = G._MEM[DAT_006560f0 + b + 10];
  const order = G._MEM[DAT_006560f0 + b + 15];
  const home = u16(DAT_006560f0, b + 16);
  const id = u32(DAT_006560f0, b + 26);
  console.log(`  [${i}] type=${type} owner=${owner} pos=(${x},${y}) moves=${movesLeft} dmg=${dmg} order=${order} home=${home} id=${id} ${id===0?'DEAD':''}`);
}

console.log(`\n=== ${totalCities} CITIES ===`);
for (let i = 0; i < totalCities; i++) {
  const b = i * 0x58;
  const owner = G._MEM[DAT_0064f340 + b + 8], size = G._MEM[DAT_0064f340 + b + 9];
  const producing = G._MEM[DAT_0064f340 + b + 10], prodType = G._MEM[DAT_0064f340 + b + 11];
  const food = s16(DAT_0064f340, b + 26), shields = s16(DAT_0064f340, b + 28);
  let name = ''; for (let j = 0; j < 16; j++) { const c = G._MEM[DAT_0064f340 + b + 32 + j]; if(!c)break; name += String.fromCharCode(c); }
  console.log(`  [${i}] "${name}" owner=${owner} size=${size} prod=${producing}(type${prodType}) food=${food} shields=${shields}`);
}

console.log(`\n=== 8 CIVS ===`);
for (let c = 0; c < 8; c++) {
  const off = c * 0x594;
  const treasury = s32(DAT_0064c600, off + 0xA2);
  const resProg = u16(DAT_0064c600, off + 0xA8), resTech = G._MEM[DAT_0064c600 + off + 0xAA];
  const taxRate = G._MEM[DAT_0064c600 + off + 0xB3], sciRate = G._MEM[DAT_0064c600 + off + 0xB4];
  const gov = G._MEM[DAT_0064c600 + off + 0xB5];
  const unitCt = s16(DAT_0064c600, off + 0x10C), cityCt = s16(DAT_0064c600, off + 0x112);
  console.log(`  Civ ${c}: treas=${treasury}g gov=${gov} tax=${taxRate*10}% sci=${sciRate*10}% res=${resProg}/tech${resTech} units=${unitCt} cities=${cityCt}`);
}

// Now run 10 turns and show state again
const { FUN_00489553 } = await import('./blocks/block_00480000.js');
const { FUN_00543cd6 } = await import('./blocks/block_00540000.js');
const { loopReset } = await import('./mem.js');

console.log('\n=== Running 10 turns ===');
for (let t = 0; t < 10; t++) {
  for (let civ = 1; civ < 8; civ++) {
    if (!(info.civsAlive & (1 << civ))) continue;
    loopReset();
    try {
      wv(DAT_00655b05, civ);
      wv(DAT_006d1da0, civ);
      FUN_00489553(civ);
      if (((1 << (civ & 0x1f)) & v(DAT_00655b0b)) === 0) {
        FUN_00543cd6();
      }
    } catch (e) { /* ignore loop guards */ }
  }
  wv(DAT_00655af8, s16(DAT_00655af8, 0) + 1);
}

console.log(`\n=== AFTER 10 TURNS ===`);
const newTotalUnits = s16(DAT_00655b16, 0);
console.log(`Total units now: ${newTotalUnits} (was ${totalUnits})`);
for (let i = 0; i < Math.max(newTotalUnits, totalUnits); i++) {
  const b = i * 0x20;
  const id = u32(DAT_006560f0, b + 26);
  if (id === 0) continue;
  const x = s16(DAT_006560f0, b), y = s16(DAT_006560f0, b + 2);
  const type = G._MEM[DAT_006560f0 + b + 6], owner = G._MEM[DAT_006560f0 + b + 7];
  const movesLeft = G._MEM[DAT_006560f0 + b + 8], order = G._MEM[DAT_006560f0 + b + 15];
  const home = u16(DAT_006560f0, b + 16);
  console.log(`  [${i}] type=${type} owner=${owner} pos=(${x},${y}) moves=${movesLeft} order=${order} home=${home} id=${id}`);
}

console.log(`\n=== CITIES AFTER 10 TURNS ===`);
const newTotalCities = s16(DAT_00655b18, 0);
console.log(`Total cities now: ${newTotalCities} (was ${totalCities})`);
for (let i = 0; i < newTotalCities; i++) {
  const b = i * 0x58;
  const owner = G._MEM[DAT_0064f340 + b + 8], size = G._MEM[DAT_0064f340 + b + 9];
  const producing = G._MEM[DAT_0064f340 + b + 10], prodType = G._MEM[DAT_0064f340 + b + 11];
  const food = s16(DAT_0064f340, b + 26), shields = s16(DAT_0064f340, b + 28);
  let name = ''; for (let j = 0; j < 16; j++) { const c = G._MEM[DAT_0064f340 + b + 32 + j]; if(!c)break; name += String.fromCharCode(c); }
  console.log(`  [${i}] "${name}" owner=${owner} size=${size} prod=${producing}(type${prodType}) food=${food} shields=${shields}`);
}

console.log(`\n=== CIVS AFTER 10 TURNS ===`);
for (let c = 0; c < 8; c++) {
  const off = c * 0x594;
  const treasury = s32(DAT_0064c600, off + 0xA2);
  const resProg = u16(DAT_0064c600, off + 0xA8), resTech = G._MEM[DAT_0064c600 + off + 0xAA];
  const taxRate = G._MEM[DAT_0064c600 + off + 0xB3], sciRate = G._MEM[DAT_0064c600 + off + 0xB4];
  const gov = G._MEM[DAT_0064c600 + off + 0xB5];
  const unitCt = s16(DAT_0064c600, off + 0x10C), cityCt = s16(DAT_0064c600, off + 0x112);
  console.log(`  Civ ${c}: treas=${treasury}g gov=${gov} tax=${taxRate*10}% sci=${sciRate*10}% res=${resProg}/tech${resTech} units=${unitCt} cities=${cityCt}`);
}
