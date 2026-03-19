// ═══════════════════════════════════════════════════════════════════
// year.js — Game year calculation (shared: server + client)
//
// Gap 84: Difficulty-dependent year progression tables.
// Binary FUN_00484fec uses a piecewise-linear table at DAT_0062c490
// with per-difficulty entries (stride 0x48, clamped to 4 tables).
// Difficulty mapping: 0,1→table 0; 2→table 1; 3→table 2; 4,5→table 3.
// ═══════════════════════════════════════════════════════════════════

// Per-difficulty year schedule tables.
// Each entry: { until: cumulative turn threshold, perTurn: years advanced per turn }
// Table index: 0=Chieftain/Warlord, 1=Prince, 2=King, 3=Emperor/Deity
const SCHEDULES = [
  // Table 0: Chieftain / Warlord — slower, more turns per era
  [
    { until: 250, perTurn: 20 },   // turns 1-250: 20 years/turn
    { until: 300, perTurn: 10 },   // turns 251-300: 10 years/turn
    { until: 350, perTurn: 5 },    // turns 301-350: 5 years/turn
    { until: 400, perTurn: 2 },    // turns 351-400: 2 years/turn
    { until: Infinity, perTurn: 1 }, // turns 401+: 1 year/turn
  ],
  // Table 1: Prince — standard schedule
  [
    { until: 250, perTurn: 20 },
    { until: 300, perTurn: 10 },
    { until: 350, perTurn: 5 },
    { until: 400, perTurn: 2 },
    { until: Infinity, perTurn: 1 },
  ],
  // Table 2: King — slightly faster
  [
    { until: 200, perTurn: 20 },
    { until: 250, perTurn: 10 },
    { until: 300, perTurn: 5 },
    { until: 350, perTurn: 2 },
    { until: Infinity, perTurn: 1 },
  ],
  // Table 3: Emperor / Deity — fastest
  [
    { until: 150, perTurn: 20 },
    { until: 200, perTurn: 10 },
    { until: 250, perTurn: 5 },
    { until: 300, perTurn: 2 },
    { until: Infinity, perTurn: 1 },
  ],
];

// Legacy alias for backward compatibility
const SCHEDULE = SCHEDULES[1]; // Prince-level (default)

/**
 * Get the year schedule table index for a given difficulty.
 * Binary: clamp(difficultyIndex - 1, 0, 3)
 * @param {string|number} difficulty - difficulty key or index
 * @returns {number} table index 0-3
 */
function getScheduleIndex(difficulty) {
  let diffIdx;
  if (typeof difficulty === 'number') {
    diffIdx = difficulty;
  } else {
    diffIdx = ['chieftain','warlord','prince','king','emperor','deity'].indexOf(difficulty || 'prince');
    if (diffIdx < 0) diffIdx = 2; // default to Prince
  }
  // Binary: clamp(diffIdx - 1, 0, 3)
  return Math.max(0, Math.min(3, diffIdx - 1));
}

/**
 * Convert turnsPassed to a display year string.
 * @param {number} turnsPassed - number of turns elapsed
 * @param {string} [difficulty] - difficulty key (default: 'prince')
 * @returns {string} e.g. "4000 B.C.", "A.D. 1", "A.D. 1994"
 */
export function getGameYear(turnsPassed, difficulty) {
  // Binary: if (param_1 != 0) param_1-- before walking table
  const turn = Math.max(0, (turnsPassed || 0) - 1);
  const schedule = SCHEDULES[getScheduleIndex(difficulty)];
  let year = -4000, t = 0;
  for (const seg of schedule) {
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
 * Convert turnsPassed to a numeric year (negative = BC, positive = AD).
 * @param {number} turnsPassed
 * @param {string} [difficulty] - difficulty key (default: 'prince')
 * @returns {number}
 */
export function getNumericYear(turnsPassed, difficulty) {
  const turn = turnsPassed || 0;
  const schedule = SCHEDULES[getScheduleIndex(difficulty)];
  let year = -4000, t = 0;
  for (const seg of schedule) {
    const turnsInSeg = Math.min(turn, seg.until) - t;
    if (turnsInSeg <= 0) break;
    year += turnsInSeg * seg.perTurn;
    t += turnsInSeg;
    if (t >= turn) break;
  }
  return year;
}

/**
 * Convenience: extract turnsPassed from a mapData object.
 * @param {object} mapData - parsed save data with gameState
 * @returns {string} year string
 */
export function getGameYearFromMap(mapData) {
  const gs = mapData && mapData.gameState;
  if (!gs) return '';
  return getGameYear(gs.turnsPassed, gs.difficulty);
}
