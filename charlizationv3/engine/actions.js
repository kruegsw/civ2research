// ═══════════════════════════════════════════════════════════════════
// actions.js — Action type definitions (shared: server + client)
//
// Actions are the ONLY way to mutate game state. The client sends
// actions to the server; the server validates and applies them via
// the reducer.
// ═══════════════════════════════════════════════════════════════════

export const MOVE_UNIT = 'MOVE_UNIT';
//   { type: 'MOVE_UNIT', unitIndex, dir }
//   Move a unit in the given direction (N/NE/E/SE/S/SW/W/NW).
//   Reducer checks movement points, terrain cost, domain.

export const END_TURN = 'END_TURN';
//   { type: 'END_TURN' }
//   Advance to next civ's turn. Resets movement for next civ's units.

export const BUILD_CITY = 'BUILD_CITY';
//   { type: 'BUILD_CITY', unitIndex }
//   Settler builds a city at its current position. Settler is consumed.

export const SET_WORKERS = 'SET_WORKERS';
//   { type: 'SET_WORKERS', cityIndex, workersInner, workersOuterA, workersOuterB, specialistBytes }
//   Reassign workers and specialists for a city. Total workers + specialists must equal city size.

// ── Future action types (not yet implemented) ──
// export const FORTIFY_UNIT    = 'FORTIFY_UNIT';
// export const DISBAND_UNIT    = 'DISBAND_UNIT';
// export const CHANGE_PRODUCTION = 'CHANGE_PRODUCTION';
// export const BUY_PRODUCTION  = 'BUY_PRODUCTION';
// export const SET_RATES       = 'SET_RATES';
// export const SET_RESEARCH    = 'SET_RESEARCH';
// export const NEGOTIATE       = 'NEGOTIATE';
