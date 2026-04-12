// ═══════════════════════════════════════════════════════════════════
// year.js — Game year calculation (shared: server + client)
//
// Gap 84: Difficulty-dependent year progression tables.
// Binary FUN_00484fec uses a piecewise-linear table at DAT_0062c490
// with per-difficulty entries (stride 0x48, clamped to 4 tables).
// Difficulty mapping: 0,1→table 0; 2→table 1; 3→table 2; 4,5→table 3.
// ═══════════════════════════════════════════════════════════════════

// Per-difficulty year schedule tables (from binary DAT_0062c490).
// Each segment: { startYear, turns, perTurn }
// Table index: 0=Chieftain/Warlord, 1=Prince, 2=King, 3=Emperor/Deity
// Spec sections 4.4-4.5, binary FUN_00484fec lines 881-900
const SCHEDULES = [
  // Table 0: Chieftain / Warlord — simpler 5-segment table
  [
    { startYear: -4000, turns: 250, perTurn: 20 },  // -4000 to 1000
    { startYear:  1000, turns:  50, perTurn: 10 },   // 1000 to 1500
    { startYear:  1500, turns:  50, perTurn:  5 },   // 1500 to 1750
    { startYear:  1750, turns:  50, perTurn:  2 },   // 1750 to 1850
    { startYear:  1850, turns:   0, perTurn:  1 },   // 1850+ at 1yr/turn
  ],
  // Table 1: Prince — 6-segment table with 50/25yr early segments
  [
    { startYear: -4000, turns:  60, perTurn: 50 },   // -4000 to -1000
    { startYear: -1000, turns:  40, perTurn: 25 },   // -1000 to 0
    { startYear:     0, turns: 150, perTurn: 10 },   // AD 1 to 1500
    { startYear:  1500, turns:  50, perTurn:  5 },   // 1500 to 1750
    { startYear:  1750, turns:  50, perTurn:  2 },   // 1750 to 1850
    { startYear:  1850, turns:   0, perTurn:  1 },   // 1850+ at 1yr/turn
  ],
  // Table 2: King — 6-segment table
  [
    { startYear: -4000, turns:  60, perTurn: 50 },   // -4000 to -1000
    { startYear: -1000, turns:  40, perTurn: 25 },   // -1000 to 0
    { startYear:     0, turns:  50, perTurn: 20 },   // AD 1 to 1000
    { startYear:  1000, turns:  50, perTurn: 10 },   // 1000 to 1500
    { startYear:  1500, turns:  50, perTurn:  5 },   // 1500 to 1750
    { startYear:  1750, turns:  50, perTurn:  2 },   // 1750 to 1850
  ],
  // Table 3: Emperor / Deity — 6-segment table
  [
    { startYear: -4000, turns:  60, perTurn: 50 },   // -4000 to -1000
    { startYear: -1000, turns:  40, perTurn: 25 },   // -1000 to 0
    { startYear:     0, turns:  75, perTurn: 20 },   // AD 1 to 1500
    { startYear:  1500, turns:  25, perTurn: 10 },   // 1500 to 1750
    { startYear:  1750, turns:  50, perTurn:  2 },   // 1750 to 1850
    { startYear:  1850, turns:   0, perTurn:  1 },   // 1850+ at 1yr/turn
  ],
];

// Maximum segments per table (binary has 6 segments per table)
const MAX_SEGMENTS = 6;

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
 * Compute numeric year from turn number using the binary's piecewise-linear table.
 * Faithful to FUN_00484fec (block_00480000.c:855-912), spec section 4.4.
 *
 * Algorithm (lines 882-900):
 *   if param_1 != 0: param_1 -= 1
 *   Walk segments: subtract each segment's turn_count from remaining turns.
 *   When remaining turns fit within a segment, year = startYear + perTurn * remaining.
 *   Past all segments: 1 year per turn from last segment's end.
 *   If year == 0: year = 1 (skip year 0, no 0 AD).
 *
 * @param {number} turn - turn number (param_1 in binary)
 * @param {number} tableIdx - schedule table index (0-3)
 * @returns {number} year (negative = BC, positive = AD)
 */
function computeYear(turn, tableIdx) {
  const schedule = SCHEDULES[tableIdx];
  // Binary: if (param_1 != 0) param_1-- before walking table (line 882)
  let remaining = turn > 0 ? turn - 1 : 0;

  for (let seg = 0; seg < schedule.length; seg++) {
    const entry = schedule[seg];
    // If turns == 0, this is the overflow segment (1yr/turn past last real segment)
    if (entry.turns === 0 || remaining < entry.turns) {
      // Remaining turns fit within this segment
      let year = entry.startYear + entry.perTurn * remaining;
      if (year === 0) year = 1; // skip year 0 (line 899)
      return year;
    }
    remaining -= entry.turns;
  }

  // Past all segments: 1 year per turn from end of last segment
  const lastSeg = schedule[schedule.length - 1];
  const lastEnd = lastSeg.startYear + lastSeg.perTurn * lastSeg.turns;
  let year = lastEnd + remaining;
  if (year === 0) year = 1;
  return year;
}

/**
 * Convert turnsPassed to a display year string.
 * @param {number} turnsPassed - number of turns elapsed
 * @param {string} [difficulty] - difficulty key (default: 'prince')
 * @returns {string} e.g. "4000 B.C.", "A.D. 1", "A.D. 1994"
 */
export function getGameYear(turnsPassed, difficulty) {
  const year = computeYear(turnsPassed || 0, getScheduleIndex(difficulty));
  if (year < 0) return `${-year} B.C.`;
  if (year === 0) return 'A.D. 1'; // shouldn't happen (computeYear skips 0)
  return `A.D. ${year}`;
}

/**
 * Convert turnsPassed to a numeric year (negative = BC, positive = AD).
 * @param {number} turnsPassed
 * @param {string} [difficulty] - difficulty key (default: 'prince')
 * @returns {number}
 */
export function getNumericYear(turnsPassed, difficulty) {
  return computeYear(turnsPassed || 0, getScheduleIndex(difficulty));
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
