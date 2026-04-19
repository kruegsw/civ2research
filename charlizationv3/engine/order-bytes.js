// Canonical mapping between the `orders` string (used by v3's
// reducer for semantic state) and the `order` byte (+0x0F on the
// unit struct, written to the .sav file and read by the sniffer).
//
// Both sides of the fidelity diff read `unit.order` (byte). Any code
// path that changes `unit.orders` MUST also set `unit.order` to the
// matching byte via this table, otherwise the byte stays stale from
// the previous state and the diff reports false mismatches.

export const ORDER_BYTES = {
  'none':        0xFF,
  'fortifying':  1,
  'fortified':   2,
  'sleep':       3,
  'fortress':    4,   'buildFortress':    4,
  'road':        5,   'buildRoad':        5,
  'irrigation':  6,   'buildIrrigation':  6,
  'mine':        7,   'buildMine':        7,
  'transform':   8,
  'pollution':   9,   'cleanPollution':   9,
  'airbase':     10,  'buildAirbase':     10,
  'railroad':    11,
  'goto':        11,
  'goto_ai':     27,
};

// Reverse lookup: byte → canonical orders string. Used when replaying
// sniffer UNIT_ORDER events (which carry the raw byte) to keep the
// string in sync. Collisions are resolved by picking the primary
// string: 'buildFortress'/'fortress' share byte 4, we emit
// 'buildFortress' as that's what end-turn.js increments workTurns on.
export const BYTE_TO_ORDERS = {
  0:    'none',
  0xFF: 'none',
  1:    'fortifying',
  2:    'fortified',
  3:    'sleep',
  4:    'buildFortress',
  5:    'buildRoad',
  6:    'buildIrrigation',
  7:    'buildMine',
  8:    'transform',
  9:    'cleanPollution',
  10:   'buildAirbase',
  11:   'railroad',
  27:   'goto_ai',
};

export function syncOrderByte(unit) {
  const byte = ORDER_BYTES[unit.orders];
  if (byte != null) unit.order = byte;
  return unit;
}
