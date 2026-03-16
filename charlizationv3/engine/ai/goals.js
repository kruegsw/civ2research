// ═══════════════════════════════════════════════════════════════════
// ai/goals.js — Goal list for AI tactical & strategic planning
//
// Ported from Civ2's goal system (DAT_0064c9f2 continent goals,
// DAT_006a6xxx tactical goals). The binary uses a flat array of
// 48 tactical + 16 strategic goal slots, each with type, priority,
// target coordinates, assigned unit, and age (2-turn decay).
//
// Goal types mirror the binary's goal IDs:
//   0 = NONE, 1 = ATTACK_CITY, 2 = DEFEND_CITY, 3 = EXPLORE,
//   4 = BUILD_ROAD, 5 = ESCORT, 6 = TRANSPORT, 7 = NAVAL_ASSAULT,
//   8 = AIR_STRIKE, 9 = REINFORCE
// ═══════════════════════════════════════════════════════════════════

// ── Goal type enum ────────────────────────────────────────────────
export const GOAL_NONE          = 0;
export const GOAL_ATTACK_CITY   = 1;
export const GOAL_DEFEND_CITY   = 2;
export const GOAL_EXPLORE       = 3;
export const GOAL_BUILD_ROAD    = 4;
export const GOAL_ESCORT        = 5;
export const GOAL_TRANSPORT     = 6;
export const GOAL_NAVAL_ASSAULT = 7;
export const GOAL_AIR_STRIKE    = 8;
export const GOAL_REINFORCE     = 9;

const MAX_TACTICAL  = 48;
const MAX_STRATEGIC = 16;
const MAX_AGE       = 2;  // goals decay after 2 turns without refresh

/**
 * A single goal slot.
 * @typedef {object} Goal
 * @property {number} goalType   - GOAL_* constant
 * @property {number} priority   - 0-255 (higher = more urgent)
 * @property {number} targetGx   - target tile X
 * @property {number} targetGy   - target tile Y
 * @property {number} assignedUnit - unit index or -1
 * @property {number} age        - turns since created/refreshed (0-2)
 */

/**
 * Create an empty goal slot.
 */
function emptyGoal() {
  return {
    goalType: GOAL_NONE,
    priority: 0,
    targetGx: -1,
    targetGy: -1,
    assignedUnit: -1,
    age: 0,
  };
}

// ═══════════════════════════════════════════════════════════════════
// GoalList — Fixed-size goal array with priority sorting
// ═══════════════════════════════════════════════════════════════════

export class GoalList {
  /**
   * @param {number} [tacticalSlots=48]
   * @param {number} [strategicSlots=16]
   */
  constructor(tacticalSlots = MAX_TACTICAL, strategicSlots = MAX_STRATEGIC) {
    this._tacticalSlots = tacticalSlots;
    this._strategicSlots = strategicSlots;

    /** @type {Goal[]} */
    this.tactical = [];
    for (let i = 0; i < tacticalSlots; i++) this.tactical.push(emptyGoal());

    /** @type {Goal[]} */
    this.strategic = [];
    for (let i = 0; i < strategicSlots; i++) this.strategic.push(emptyGoal());
  }

  // ── Add a goal ────────────────────────────────────────────────

  /**
   * Add a tactical goal. If all slots are full, evicts the lowest-priority
   * goal (only if new goal has higher priority).
   *
   * @param {number} goalType   - GOAL_* constant
   * @param {number} priority   - 0-255
   * @param {number} targetGx
   * @param {number} targetGy
   * @returns {boolean} true if goal was added
   */
  addTacticalGoal(goalType, priority, targetGx, targetGy) {
    return this._addGoal(this.tactical, goalType, priority, targetGx, targetGy);
  }

  /**
   * Add a strategic goal (same interface as tactical).
   */
  addStrategicGoal(goalType, priority, targetGx, targetGy) {
    return this._addGoal(this.strategic, goalType, priority, targetGx, targetGy);
  }

  /**
   * @private
   */
  _addGoal(slots, goalType, priority, targetGx, targetGy) {
    // Check for duplicate (same type + location) — refresh instead of adding
    for (let i = 0; i < slots.length; i++) {
      const g = slots[i];
      if (g.goalType === goalType && g.targetGx === targetGx && g.targetGy === targetGy) {
        // Refresh: update priority (keep higher), reset age
        g.priority = Math.max(g.priority, priority);
        g.age = 0;
        return true;
      }
    }

    // Find an empty slot
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].goalType === GOAL_NONE) {
        slots[i] = {
          goalType,
          priority: Math.min(255, Math.max(0, priority)),
          targetGx,
          targetGy,
          assignedUnit: -1,
          age: 0,
        };
        return true;
      }
    }

    // All slots full — evict lowest priority if new goal is better
    let minIdx = 0;
    let minPri = slots[0].priority;
    for (let i = 1; i < slots.length; i++) {
      if (slots[i].priority < minPri) {
        minPri = slots[i].priority;
        minIdx = i;
      }
    }

    if (priority > minPri) {
      slots[minIdx] = {
        goalType,
        priority: Math.min(255, Math.max(0, priority)),
        targetGx,
        targetGy,
        assignedUnit: -1,
        age: 0,
      };
      return true;
    }

    return false; // all slots occupied by higher-priority goals
  }

  // ── Remove a goal ─────────────────────────────────────────────

  /**
   * Remove a goal by index from tactical list.
   * @param {number} index
   */
  removeTactical(index) {
    if (index >= 0 && index < this.tactical.length) {
      this.tactical[index] = emptyGoal();
    }
  }

  /**
   * Remove a goal by index from strategic list.
   * @param {number} index
   */
  removeStrategic(index) {
    if (index >= 0 && index < this.strategic.length) {
      this.strategic[index] = emptyGoal();
    }
  }

  /**
   * Remove all goals targeting a specific location.
   * @param {number} gx
   * @param {number} gy
   */
  removeGoalsAt(gx, gy) {
    for (let i = 0; i < this.tactical.length; i++) {
      if (this.tactical[i].targetGx === gx && this.tactical[i].targetGy === gy) {
        this.tactical[i] = emptyGoal();
      }
    }
    for (let i = 0; i < this.strategic.length; i++) {
      if (this.strategic[i].targetGx === gx && this.strategic[i].targetGy === gy) {
        this.strategic[i] = emptyGoal();
      }
    }
  }

  /**
   * Remove all goals assigned to a specific unit.
   * @param {number} unitIndex
   */
  removeGoalsForUnit(unitIndex) {
    for (const g of this.tactical) {
      if (g.assignedUnit === unitIndex) g.assignedUnit = -1;
    }
    for (const g of this.strategic) {
      if (g.assignedUnit === unitIndex) g.assignedUnit = -1;
    }
  }

  // ── Find goals ────────────────────────────────────────────────

  /**
   * Find goals by type across both tactical and strategic lists.
   * Returns array of { goal, index, list: 'tactical'|'strategic' }.
   *
   * @param {number} goalType - GOAL_* constant
   * @returns {Array<{goal: Goal, index: number, list: string}>}
   */
  findGoals(goalType) {
    const results = [];
    for (let i = 0; i < this.tactical.length; i++) {
      if (this.tactical[i].goalType === goalType) {
        results.push({ goal: this.tactical[i], index: i, list: 'tactical' });
      }
    }
    for (let i = 0; i < this.strategic.length; i++) {
      if (this.strategic[i].goalType === goalType) {
        results.push({ goal: this.strategic[i], index: i, list: 'strategic' });
      }
    }
    return results;
  }

  /**
   * Find the highest-priority unassigned goal matching the given type(s).
   * If types is null/undefined, matches any type.
   *
   * @param {Set<number>|null} [types=null] - set of GOAL_* types to match, or null for any
   * @returns {{ goal: Goal, index: number, list: string }|null}
   */
  findBestUnassigned(types = null) {
    let best = null;
    let bestPri = -1;

    const search = (slots, listName) => {
      for (let i = 0; i < slots.length; i++) {
        const g = slots[i];
        if (g.goalType === GOAL_NONE) continue;
        if (g.assignedUnit >= 0) continue;
        if (types && !types.has(g.goalType)) continue;
        if (g.priority > bestPri) {
          bestPri = g.priority;
          best = { goal: g, index: i, list: listName };
        }
      }
    };

    search(this.tactical, 'tactical');
    search(this.strategic, 'strategic');
    return best;
  }

  /**
   * Get all unassigned goals, sorted by priority descending.
   * @returns {Array<{goal: Goal, index: number, list: string}>}
   */
  getUnassignedGoals() {
    const results = [];
    for (let i = 0; i < this.tactical.length; i++) {
      const g = this.tactical[i];
      if (g.goalType !== GOAL_NONE && g.assignedUnit < 0) {
        results.push({ goal: g, index: i, list: 'tactical' });
      }
    }
    for (let i = 0; i < this.strategic.length; i++) {
      const g = this.strategic[i];
      if (g.goalType !== GOAL_NONE && g.assignedUnit < 0) {
        results.push({ goal: g, index: i, list: 'strategic' });
      }
    }
    results.sort((a, b) => b.goal.priority - a.goal.priority);
    return results;
  }

  // ── Assign a unit to a goal ───────────────────────────────────

  /**
   * Assign a unit to a goal. Removes the unit from any previous goal first.
   *
   * @param {number} unitIndex
   * @param {string} list - 'tactical' or 'strategic'
   * @param {number} goalIndex
   */
  assignUnit(unitIndex, list, goalIndex) {
    // Remove from any existing assignment
    this.removeGoalsForUnit(unitIndex);

    const slots = list === 'strategic' ? this.strategic : this.tactical;
    if (goalIndex >= 0 && goalIndex < slots.length) {
      slots[goalIndex].assignedUnit = unitIndex;
    }
  }

  /**
   * Get the goal assigned to a specific unit, if any.
   * Searches both tactical and strategic lists.
   *
   * @param {number} unitIndex
   * @returns {Goal|null}
   */
  getGoalForUnit(unitIndex) {
    for (const g of this.tactical) {
      if (g.goalType !== GOAL_NONE && g.assignedUnit === unitIndex) return g;
    }
    for (const g of this.strategic) {
      if (g.goalType !== GOAL_NONE && g.assignedUnit === unitIndex) return g;
    }
    return null;
  }

  // ── Age / decay ───────────────────────────────────────────────

  /**
   * Age all goals by 1 turn. Goals older than MAX_AGE are removed.
   * During decay, strategic (List B) goals that have aged out are merged
   * into the tactical (List A) list — promoting long-term strategic goals
   * into tactical execution. This mirrors the binary's behavior where
   * continent-level goals get pushed to the tactical queue.
   * Call once at the start of each AI turn.
   */
  decayGoals() {
    // First: age and collect strategic goals that are expiring (for merge into tactical)
    const expiring = [];
    for (let i = 0; i < this.strategic.length; i++) {
      if (this.strategic[i].goalType === GOAL_NONE) continue;
      this.strategic[i].age++;
      if (this.strategic[i].age > MAX_AGE) {
        // Merge into tactical before removing: carry the goal forward
        // with reduced priority (decay penalty) so it doesn't dominate
        const g = this.strategic[i];
        expiring.push({
          goalType: g.goalType,
          priority: Math.max(1, g.priority - 20), // decay penalty
          targetGx: g.targetGx,
          targetGy: g.targetGy,
        });
        this.strategic[i] = emptyGoal();
      }
    }

    // Merge expiring strategic goals into tactical list
    for (const eg of expiring) {
      this._addGoal(this.tactical, eg.goalType, eg.priority, eg.targetGx, eg.targetGy);
    }

    // Then: age tactical goals normally
    for (let i = 0; i < this.tactical.length; i++) {
      if (this.tactical[i].goalType === GOAL_NONE) continue;
      this.tactical[i].age++;
      if (this.tactical[i].age > MAX_AGE) {
        this.tactical[i] = emptyGoal();
      }
    }
  }

  // ── Negate / area remove / find max / clear strategic ──────────

  /**
   * Negate the priority of a goal matching (type, gx, gy).
   * This effectively cancels the goal without removing it from the slot,
   * preventing the same goal from being re-added at high priority.
   * Equivalent to the binary's "cancel without remove" behavior.
   *
   * @param {number} goalType - GOAL_* constant
   * @param {number} gx - target X
   * @param {number} gy - target Y
   * @returns {boolean} true if a goal was negated
   */
  negateGoalPriority(goalType, gx, gy) {
    const negate = (slots) => {
      for (let i = 0; i < slots.length; i++) {
        const g = slots[i];
        if (g.goalType === goalType && g.targetGx === gx && g.targetGy === gy) {
          g.priority = -Math.abs(g.priority);
          return true;
        }
      }
      return false;
    };
    return negate(this.tactical) || negate(this.strategic);
  }

  /**
   * Remove all goals within a given distance of (gx, gy).
   * Uses Chebyshev distance (max of |dx|, |dy|).
   *
   * @param {number} gx - center X
   * @param {number} gy - center Y
   * @param {number} distance - radius (inclusive)
   */
  removeGoalsNear(gx, gy, distance) {
    const removeNear = (slots) => {
      for (let i = 0; i < slots.length; i++) {
        const g = slots[i];
        if (g.goalType === GOAL_NONE) continue;
        if (g.targetGx < 0 && g.targetGy < 0) continue; // skip abstract goals
        const dx = Math.abs(g.targetGx - gx);
        const dy = Math.abs(g.targetGy - gy);
        if (Math.max(dx, dy) <= distance) {
          slots[i] = emptyGoal();
        }
      }
    };
    removeNear(this.tactical);
    removeNear(this.strategic);
  }

  /**
   * Find the highest-priority goal matching a criteria function.
   * Returns the matching entry or null.
   *
   * @param {function(Goal):boolean} criteria - predicate function
   * @returns {{ goal: Goal, index: number, list: string }|null}
   */
  findMaxGoalPriority(criteria) {
    let best = null;
    let bestPri = -Infinity;

    const search = (slots, listName) => {
      for (let i = 0; i < slots.length; i++) {
        const g = slots[i];
        if (g.goalType === GOAL_NONE) continue;
        if (!criteria(g)) continue;
        if (g.priority > bestPri) {
          bestPri = g.priority;
          best = { goal: g, index: i, list: listName };
        }
      }
    };

    search(this.tactical, 'tactical');
    search(this.strategic, 'strategic');
    return best;
  }

  /**
   * Clear all strategic (List B) goals.
   * Used when a civ needs to completely reset its strategic posture
   * (e.g., after a major diplomatic shift).
   */
  clearStrategicGoals() {
    for (let i = 0; i < this.strategic.length; i++) {
      this.strategic[i] = emptyGoal();
    }
  }

  // ── Cleanup ───────────────────────────────────────────────────

  /**
   * Remove goals whose assigned unit is dead or no longer ours.
   * @param {object} gameState
   * @param {number} civSlot
   */
  cleanupDeadUnits(gameState, civSlot) {
    const clean = (slots) => {
      for (let i = 0; i < slots.length; i++) {
        const g = slots[i];
        if (g.assignedUnit < 0) continue;
        const unit = gameState.units[g.assignedUnit];
        if (!unit || unit.gx < 0 || unit.owner !== civSlot) {
          g.assignedUnit = -1;
        }
      }
    };
    clean(this.tactical);
    clean(this.strategic);
  }

  /**
   * Remove goals targeting cities we now own or that no longer exist.
   * @param {object} gameState
   * @param {number} civSlot
   */
  cleanupCapturedCities(gameState, civSlot) {
    const clean = (slots) => {
      for (let i = 0; i < slots.length; i++) {
        const g = slots[i];
        if (g.goalType === GOAL_NONE) continue;
        if (g.goalType !== GOAL_ATTACK_CITY && g.goalType !== GOAL_NAVAL_ASSAULT &&
            g.goalType !== GOAL_AIR_STRIKE) continue;

        // Check if any enemy city still exists at this target
        const enemyCityHere = gameState.cities.some(c =>
          c && c.size > 0 && c.gx === g.targetGx && c.gy === g.targetGy &&
          c.owner !== civSlot
        );
        if (!enemyCityHere) {
          slots[i] = emptyGoal();
        }
      }
    };
    clean(this.tactical);
    clean(this.strategic);
  }

  // ── Statistics ─────────────────────────────────────────────────

  /**
   * Count active goals (non-NONE).
   * @returns {{ tactical: number, strategic: number, total: number }}
   */
  countActive() {
    let t = 0, s = 0;
    for (const g of this.tactical) if (g.goalType !== GOAL_NONE) t++;
    for (const g of this.strategic) if (g.goalType !== GOAL_NONE) s++;
    return { tactical: t, strategic: s, total: t + s };
  }

  /**
   * Count goals of a specific type.
   * @param {number} goalType
   * @returns {number}
   */
  countType(goalType) {
    let n = 0;
    for (const g of this.tactical) if (g.goalType === goalType) n++;
    for (const g of this.strategic) if (g.goalType === goalType) n++;
    return n;
  }

  // ── Serialization (for debug/logging) ─────────────────────────

  /**
   * Produce a compact debug summary of active goals.
   * @returns {string}
   */
  debugSummary() {
    const NAMES = [
      'NONE','ATTACK_CITY','DEFEND_CITY','EXPLORE','BUILD_ROAD',
      'ESCORT','TRANSPORT','NAVAL_ASSAULT','AIR_STRIKE','REINFORCE'
    ];
    const active = [];
    const summarize = (slots, label) => {
      for (let i = 0; i < slots.length; i++) {
        const g = slots[i];
        if (g.goalType === GOAL_NONE) continue;
        const name = NAMES[g.goalType] || `?${g.goalType}`;
        const unitStr = g.assignedUnit >= 0 ? `u#${g.assignedUnit}` : 'unassigned';
        active.push(`${label}[${i}] ${name} p=${g.priority} (${g.targetGx},${g.targetGy}) ${unitStr} age=${g.age}`);
      }
    };
    summarize(this.tactical, 'T');
    summarize(this.strategic, 'S');
    return active.length > 0 ? active.join('; ') : '(no goals)';
  }
}
