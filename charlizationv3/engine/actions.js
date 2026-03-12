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
//   { type: 'SET_WORKERS', cityIndex, workedTiles, specialists }
//   Reassign workers and specialists for a city.
//   workedTiles: number[] (tile indices 0-19), specialists: string[] ('entertainer'|'taxman'|'scientist')
//   Invariant: workedTiles.length + specialists.length === city.size

export const CHANGE_PRODUCTION = 'CHANGE_PRODUCTION';
//   { type: 'CHANGE_PRODUCTION', cityIndex, item: { type: 'unit'|'building'|'wonder', id } }
//   Change what a city is producing. Cross-type switch applies 50% shield penalty.

export const RUSH_BUY = 'RUSH_BUY';
//   { type: 'RUSH_BUY', cityIndex }
//   Pay gold to instantly complete production in a city.

export const SELL_BUILDING = 'SELL_BUILDING';
//   { type: 'SELL_BUILDING', cityIndex, buildingId }
//   Sell a building for gold refund. One sale per city per turn.

export const CHANGE_RATES = 'CHANGE_RATES';
//   { type: 'CHANGE_RATES', scienceRate, taxRate }
//   Change civ's tax/luxury/science rate sliders. luxuryRate = 10 - scienceRate - taxRate.

export const SET_RESEARCH = 'SET_RESEARCH';
//   { type: 'SET_RESEARCH', advanceId }
//   Choose which tech to research. advanceId = 0-88, or -1 to clear.

export const UNIT_ORDER = 'UNIT_ORDER';
//   { type: 'UNIT_ORDER', unitIndex, order: 'fortify'|'sentry'|'sleep'|'skip'|'disband' }
//   Set a unit's standing order.

export const WORKER_ORDER = 'WORKER_ORDER';
//   { type: 'WORKER_ORDER', unitIndex, order: 'road'|'railroad'|'irrigation'|'mine'|'fortress'|'airbase'|'pollution' }
//   Settler/Engineer begins building an improvement. Progress tracked in workTurns.

export const REVOLUTION = 'REVOLUTION';
//   { type: 'REVOLUTION', government: 'monarchy'|'republic'|'democracy'|etc. }
//   Start a revolution. Civ enters anarchy for 1-4 turns, then switches to chosen government.

export const PILLAGE = 'PILLAGE';
//   { type: 'PILLAGE', unitIndex }
//   Destroy the highest-value improvement on the unit's tile.

export const DESTROY_CITY = 'DESTROY_CITY';
//   { type: 'DESTROY_CITY', cityIndex }
//   Raze a city. Cannot destroy capital.

export const PROPOSE_TREATY = 'PROPOSE_TREATY';
//   { type: 'PROPOSE_TREATY', targetCiv, treaty: 'peace'|'ceasefire' }
//   Propose a diplomatic treaty to another civ.

export const RESPOND_TREATY = 'RESPOND_TREATY';
//   { type: 'RESPOND_TREATY', proposalIndex, accept: boolean }
//   Accept or reject an incoming treaty proposal.

export const DECLARE_WAR = 'DECLARE_WAR';
//   { type: 'DECLARE_WAR', targetCiv }
//   Declare war on a civ you are at peace with.

export const ESTABLISH_TRADE = 'ESTABLISH_TRADE';
//   { type: 'ESTABLISH_TRADE', unitIndex, cityIndex }
//   Caravan/Freight establishes a trade route with the target city.
