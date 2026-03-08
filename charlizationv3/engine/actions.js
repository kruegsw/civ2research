// ═══════════════════════════════════════════════════════════════════
// actions.js — Action type definitions (shared: server + client)
//
// Actions are the ONLY way to mutate game state. The client sends
// actions to the server; the server validates and applies them via
// the reducer. This is the same pattern as Trevdor but with
// Civ2-specific action types.
// ═══════════════════════════════════════════════════════════════════

// ── Action type constants ──
// Each action the client can request. The server's reducer.js
// validates and applies these against the authoritative state.

// export const MOVE_UNIT       = 'MOVE_UNIT';
//   { type: 'MOVE_UNIT', unitId, toGx, toGy }
//   Move a unit to an adjacent tile. Reducer checks movement points,
//   terrain cost, ZOC, embark/disembark rules, and triggers combat
//   if an enemy unit is on the target tile.

// export const FORTIFY_UNIT    = 'FORTIFY_UNIT';
//   { type: 'FORTIFY_UNIT', unitId }

// export const DISBAND_UNIT    = 'DISBAND_UNIT';
//   { type: 'DISBAND_UNIT', unitId }

// export const BUILD_CITY      = 'BUILD_CITY';
//   { type: 'BUILD_CITY', unitId, name }
//   Settler founds a city. Reducer checks tile eligibility (not ocean,
//   not adjacent to existing city, etc.), creates city record, removes settler.

// export const CHANGE_PRODUCTION = 'CHANGE_PRODUCTION';
//   { type: 'CHANGE_PRODUCTION', cityId, itemType, itemId }
//   itemType: 'unit' | 'improvement' | 'wonder'

// export const BUY_PRODUCTION  = 'BUY_PRODUCTION';
//   { type: 'BUY_PRODUCTION', cityId }

// export const SET_WORKERS     = 'SET_WORKERS';
//   { type: 'SET_WORKERS', cityId, workers }
//   Reassign citizen tiles in a city.

// export const SET_RATES       = 'SET_RATES';
//   { type: 'SET_RATES', taxRate, luxRate, sciRate }
//   Must sum to 10. Government limits apply.

// export const SET_RESEARCH    = 'SET_RESEARCH';
//   { type: 'SET_RESEARCH', techId }

// export const END_TURN        = 'END_TURN';
//   { type: 'END_TURN' }
//   Advance to next civ's turn. Triggers production, growth,
//   tech discovery, unit support, etc.

// export const NEGOTIATE       = 'NEGOTIATE';
//   { type: 'NEGOTIATE', withCiv, proposal }
//   Placeholder for diplomacy. Proposal format TBD.
