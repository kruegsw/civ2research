// ═══════════════════════════════════════════════════════════════════
// sound.js — Sound system: sfx preloading, playback, combat sounds
// ═══════════════════════════════════════════════════════════════════

const SFX = {};

export function sfxLoad(name) {
  const a = new Audio(`assets/sounds/${name}.WAV`);
  SFX[name] = a;
  return a;
}

export function sfx(name) {
  const a = SFX[name];
  if (!a) return;
  a.currentTime = 0;
  a.play().catch(() => {});
}

// Menu loop
export const menuLoop = sfxLoad('MENULOOP');
sfxLoad('MENUOK');
sfxLoad('MENUEND');
menuLoop.loop = true;

// Gameplay sounds
sfxLoad('MOVPIECE');
sfxLoad('ENDOTURN');
sfxLoad('BLDCITY');
sfxLoad('SELL');
sfxLoad('NEWONDER');
sfxLoad('NEWGOVT');
sfxLoad('GUILLOTN');
sfxLoad('FANFARE1');
sfxLoad('SPYSOUND');
sfxLoad('CIVDISOR');
sfxLoad('POMPCIRC');
sfxLoad('AQUEDUCT');
sfxLoad('LETTER');
sfxLoad('POS1');
sfxLoad('NEG1');
sfxLoad('CRWDBUGL');
sfxLoad('NUKEXPLO');
sfxLoad('FEEDBK04');
sfxLoad('CATHEDRL');
sfxLoad('MRKTPLCE');
sfxLoad('CHEERS1');
sfxLoad('CHEERS2');
sfxLoad('CHEERS3');
sfxLoad('NEWBANK');
sfxLoad('BARRACKS');
sfxLoad('SMALLEXP');
sfxLoad('MEDEXPL');
sfxLoad('LARGEXPL');
sfxLoad('BOATSINK');
sfxLoad('JETCRASH');
sfxLoad('DIVCRASH');

// Combat attack sounds
sfxLoad('SWORDFGT');
sfxLoad('INFANTRY');
sfxLoad('CAVALRY');
sfxLoad('ELEPHANT');
sfxLoad('SWRDHORS');
sfxLoad('CATAPULT');
sfxLoad('BIGGUN');
sfxLoad('MCHNGUNS');
sfxLoad('FIRE---');
sfxLoad('AIRCOMBT');
sfxLoad('DIVEBOMB');
sfxLoad('JETBOMB');
sfxLoad('HELISHOT');
sfxLoad('NAVBTTLE');
sfxLoad('TORPEDOS');
sfxLoad('MISSILE');
sfxLoad('MEDGUN');
sfxLoad('DIESEL');
sfxLoad('ENGNSPUT');

// Unit type → attack sound name
export const UNIT_ATK_SFX = [
  null,       null,       'SWORDFGT','SWORDFGT','MEDGUN',  'SWORDFGT', // 0-5
  'SWORDFGT','SWORDFGT','SWORDFGT','SWORDFGT','INFANTRY','SWORDFGT', // 6-11
  'INFANTRY','INFANTRY','INFANTRY','CAVALRY', 'SWRDHORS','ELEPHANT', // 12-17
  'SWRDHORS','CAVALRY', 'CAVALRY', 'CAVALRY', 'MCHNGUNS','CATAPULT', // 18-23
  'CATAPULT','CATAPULT','BIGGUN',  'AIRCOMBT','DIVEBOMB','HELISHOT', // 24-29
  'AIRCOMBT','DIVEBOMB','ENGNSPUT','ENGNSPUT','ENGNSPUT','FIRE---',  // 30-35
  'NAVBTTLE','NAVBTTLE','BIGGUN',  'NAVBTTLE','BIGGUN',  'TORPEDOS', // 36-41
  'DIESEL',  'DIESEL',  'JETBOMB', 'MISSILE', 'SPYSOUND','SPYSOUND', // 42-47
  null,       null,       'MEDGUN',  null,                             // 48-51
];

// Unit type → death sound
const UNIT_DOMAIN_IMPORTED = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   // 0-14 land
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,             // 15-26 land
  2, 2, 2, 2, 2,                                     // 27-31 air
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,               // 32-43 sea
  2, 2,                                               // 44-45 air (missiles)
  0, 0, 0, 0, 0, 0,                                   // 46-51 land
];

export function getDeathSfx(unitType) {
  const domain = UNIT_DOMAIN_IMPORTED[unitType] ?? 0;
  if (domain === 1) return 'BOATSINK';
  if (domain === 2) return unitType === 29 ? 'DIVCRASH' : 'JETCRASH';
  if (unitType >= 22 && unitType <= 26) return 'LARGEXPL';
  if (unitType >= 10 && unitType <= 14) return 'MEDEXPL';
  return 'SMALLEXP';
}
