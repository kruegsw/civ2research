// ═══════════════════════════════════════════════════════════════════
// year.js — Game year calculation (shared: server + client)
//
// Standard Civ2 MGE turn→year schedule.
// Previously duplicated in app.js, citydialog.js, cityview.js.
// ═══════════════════════════════════════════════════════════════════

const SCHEDULE = [
  { until: 250, perTurn: 20 },   // 4000 BC → 1000 BC: 20 years/turn
  { until: 300, perTurn: 10 },   // 1000 BC → 500 BC
  { until: 350, perTurn: 5 },    // 500 BC → 250 BC (approx)
  { until: 400, perTurn: 2 },
  { until: Infinity, perTurn: 1 }, // 1750 AD onward: 1 year/turn
];

/**
 * Convert turnsPassed to a display year string.
 * @param {number} turnsPassed - number of turns elapsed
 * @returns {string} e.g. "4000 B.C.", "A.D. 1", "A.D. 1994"
 */
export function getGameYear(turnsPassed) {
  const turn = turnsPassed || 0;
  let year = -4000, t = 0;
  for (const seg of SCHEDULE) {
    const turnsInSeg = Math.min(turn, seg.until) - t;
    if (turnsInSeg <= 0) break;
    year += turnsInSeg * seg.perTurn;
    t += turnsInSeg;
    if (t >= turn) break;
  }
  if (year < 0) return `${-year} B.C.`;
  if (year === 0) return 'A.D. 1';
  return `A.D. ${year}`;
}

/**
 * Convenience: extract turnsPassed from a mapData object.
 * @param {object} mapData - parsed save data with gameState
 * @returns {string} year string
 */
export function getGameYearFromMap(mapData) {
  const gs = mapData && mapData.gameState;
  if (!gs) return '';
  return getGameYear(gs.turnsPassed);
}
