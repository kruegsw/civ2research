// ═══════════════════════════════════════════════════════════════════
// events.js — Scenario events parser + dispatcher (shared: server + client)
//
// Phase J.1: Implements the Civ2 @EVENTS system for scenario scripts.
//
// Ported from decompiled functions:
//   FUN_004fc516  — parse_events_file (12813B)
//   FUN_004fc3ae  — event_dispatch_actions (360B)
//   FUN_004fba0c  — event_check_turn_trigger (144B)
//   FUN_004fba9c  — event_check_interval_trigger (147B)
//   FUN_004fbb2f  — event_check_random_trigger (174B)
//   FUN_004fbbdd  — event_check_tech_trigger (334B)
//   FUN_004fbd9d  — event_check_unit_killed (231B)
//   FUN_004fc2bb  — event_check_city_taken (243B)
//   FUN_004fbe84  — event_check_negotiation (900B)
//   FUN_004fc20d  — event_check_no_schism (169B)
//   FUN_004fbd2b  — event_check_scenario_loaded (114B)
// ═══════════════════════════════════════════════════════════════════

import { UNIT_NAMES, TERRAIN_NAMES, ADVANCE_NAMES } from './defs.js';
import { updateVisibility } from './visibility.js';
import { grantAdvance } from './research.js';

// ═══════════════════════════════════════════════════════════════════
// Trigger type constants (from decompiled event node +0x00)
// ═══════════════════════════════════════════════════════════════════

export const EVENT_UNIT_KILLED       = 0x01;  // trigger when specific unit type killed
export const EVENT_CITY_TAKEN        = 0x02;  // trigger when city captured
export const EVENT_TURN              = 0x04;  // trigger on specific turn number
export const EVENT_TURN_INTERVAL     = 0x08;  // trigger every N turns
export const EVENT_NEGOTIATION       = 0x10;  // trigger during diplomacy
export const EVENT_SCENARIO_LOADED   = 0x20;  // trigger on scenario load
export const EVENT_RANDOM_TURN       = 0x40;  // trigger with probability each turn
export const EVENT_NO_SCHISM         = 0x80;  // prevent civil war for a civ
export const EVENT_RECEIVED_TECH     = 0x100; // trigger when tech received
export const EVENT_NO_CITIES         = 0x200; // trigger when civ has no cities
export const EVENT_CITY_PRODUCTION   = 0x400; // trigger when city completes item

// ═══════════════════════════════════════════════════════════════════
// Action flag constants (from decompiled event node +0x04 bitflags)
// ═══════════════════════════════════════════════════════════════════

export const ACTION_TEXT             = 0x0001; // display message
export const ACTION_MOVE_UNIT        = 0x0002; // teleport unit(s)
export const ACTION_CREATE_UNIT      = 0x0004; // spawn unit at location
export const ACTION_CHANGE_MONEY     = 0x0008; // add/subtract gold
export const ACTION_PLAY_WAVE        = 0x0010; // play sound (no-op in our engine)
export const ACTION_MAKE_AGGRESSION  = 0x0020; // declare war
export const ACTION_JUST_ONCE        = 0x0040; // fire only once
export const ACTION_PLAY_CD          = 0x0080; // play CD track (no-op)
export const ACTION_DONT_PLAY_WONDERS = 0x0100; // suppress wonder movies
export const ACTION_CHANGE_TERRAIN   = 0x0200; // modify terrain
export const ACTION_DESTROY_CIV      = 0x0400; // destroy a civilization
export const ACTION_GIVE_TECH        = 0x0800; // grant technology
export const ACTION_TRANSPORT        = 0x1000; // prevent negotiation / transport
export const ACTION_FLAG_FIRED       = 0x2000; // internal: already fired marker

// ═══════════════════════════════════════════════════════════════════
// Wildcard constant for "any civ"
// ═══════════════════════════════════════════════════════════════════

const ANYBODY = -2;

// ═══════════════════════════════════════════════════════════════════
// ScenarioEvent data structure
// ═══════════════════════════════════════════════════════════════════

/**
 * A single scenario event with trigger conditions and actions.
 *
 * @param {number} triggerType - one of EVENT_* constants
 * @param {object} conditions - trigger-specific fields
 * @param {object[]} actions - action descriptors to execute when triggered
 */
export class ScenarioEvent {
  constructor(triggerType, conditions, actions) {
    /** @type {number} One of EVENT_* trigger type constants */
    this.triggerType = triggerType;

    /** @type {object} Trigger-specific conditions */
    this.conditions = conditions || {};

    /** @type {object[]} Array of action descriptors */
    this.actions = actions || [];

    /** @type {number} Action bitflags (from parsing) */
    this.actionFlags = 0;

    /** @type {boolean} If true, fire only once */
    this.justOnce = false;

    /** @type {boolean} Internal: has this event already fired */
    this.fired = false;
  }
}

// ═══════════════════════════════════════════════════════════════════
// Parsing helpers
// ═══════════════════════════════════════════════════════════════════

/**
 * Resolve a civ name to a slot index.
 * Supports: "ANYBODY", civ names, or numeric indices.
 */
function resolveCivName(name, civNames) {
  if (!name) return ANYBODY;
  const upper = name.trim().toUpperCase();
  if (upper === 'ANYBODY') return ANYBODY;
  if (upper === 'TRIGGERATTACKER' || upper === 'TRIGGERDEFENDER' ||
      upper === 'TRIGGERRECEIVER') return -3; // placeholder resolved at dispatch
  const num = parseInt(upper, 10);
  if (!isNaN(num) && num >= 0 && num <= 7) return num;
  // Match against civ names
  if (civNames) {
    for (let i = 0; i < civNames.length; i++) {
      if (civNames[i] && civNames[i].toUpperCase() === upper) return i;
    }
  }
  return ANYBODY;
}

/**
 * Resolve a unit type name to index.
 */
function resolveUnitName(name) {
  if (!name) return -1;
  const upper = name.trim().toUpperCase();
  for (let i = 0; i < UNIT_NAMES.length; i++) {
    if (UNIT_NAMES[i].toUpperCase() === upper) return i;
  }
  const num = parseInt(upper, 10);
  if (!isNaN(num) && num >= 0) return num;
  return -1;
}

/**
 * Resolve a terrain type name to index.
 */
function resolveTerrainName(name) {
  if (!name) return -1;
  const upper = name.trim().toUpperCase();
  for (let i = 0; i < TERRAIN_NAMES.length; i++) {
    if (TERRAIN_NAMES[i].toUpperCase() === upper) return i;
  }
  const num = parseInt(upper, 10);
  if (!isNaN(num) && num >= 0 && num <= 10) return num;
  return -1;
}

/**
 * Resolve a technology name to ID.
 */
function resolveTechName(name) {
  if (!name) return -1;
  const upper = name.trim().toUpperCase();
  for (let i = 0; i < ADVANCE_NAMES.length; i++) {
    if (ADVANCE_NAMES[i] && ADVANCE_NAMES[i].toUpperCase() === upper) return i;
  }
  const num = parseInt(upper, 10);
  if (!isNaN(num) && num >= 0) return num;
  return -1;
}

/**
 * Parse a "key=value" line, returning { key, value } or null.
 */
function parseKeyValue(line) {
  const eq = line.indexOf('=');
  if (eq < 0) return null;
  return {
    key: line.slice(0, eq).trim().toLowerCase(),
    value: line.slice(eq + 1).trim(),
  };
}

// ═══════════════════════════════════════════════════════════════════
// parseEvents — Parse @EVENTS text format into ScenarioEvent array
//
// Civ2 events format:
//   @IF
//   <trigger type>
//   <condition lines: key=value>
//   @THEN
//   <action type>
//   <action params>
//   @ENDIF
//
// Ported from FUN_004fc516 (parse_events_file, 12813B)
// ═══════════════════════════════════════════════════════════════════

/**
 * Parse Civ2 @EVENTS text into an array of ScenarioEvent objects.
 *
 * @param {string} eventsText - raw text of the @EVENTS section
 * @param {string[]} [civNames] - civ name array for resolving civ references
 * @returns {ScenarioEvent[]} parsed scenario events
 */
export function parseEvents(eventsText, civNames) {
  if (!eventsText) return [];

  const events = [];
  const lines = eventsText.split(/\r?\n/);

  let state = 0; // 0=outside, 2=IF/trigger, 3=THEN/actions
  let currentEvent = null;
  let currentAction = null;
  let textLines = [];
  let inText = false;
  let inLocations = false;
  let locations = [];

  for (let li = 0; li < lines.length; li++) {
    let line = lines[li].trim();
    if (!line || line.startsWith(';')) continue; // skip blank and comment lines

    // Check for @-directives
    if (line.startsWith('@')) {
      const directive = line.slice(1).trim().toUpperCase();

      if (directive === 'IF') {
        // Start new event
        currentEvent = new ScenarioEvent(0, {}, []);
        currentAction = null;
        state = 2;
        continue;
      }

      if (directive === 'THEN') {
        state = 3;
        continue;
      }

      if (directive === 'ENDIF') {
        if (currentEvent) {
          events.push(currentEvent);
        }
        currentEvent = null;
        currentAction = null;
        state = 0;
        continue;
      }

      if (directive === 'ENDEVENTS') {
        break;
      }

      if (directive === 'DEBUG') {
        continue;
      }
    }

    if (!currentEvent) continue;

    // ── IF block: parse trigger type and conditions ──
    if (state === 2) {
      const upper = line.toUpperCase();

      if (upper === 'UNITKILLED') {
        currentEvent.triggerType = EVENT_UNIT_KILLED;
      } else if (upper === 'CITYTAKEN') {
        currentEvent.triggerType = EVENT_CITY_TAKEN;
      } else if (upper === 'TURN') {
        currentEvent.triggerType = EVENT_TURN;
      } else if (upper === 'TURNINTERVAL') {
        currentEvent.triggerType = EVENT_TURN_INTERVAL;
      } else if (upper === 'NEGOTIATION') {
        currentEvent.triggerType = EVENT_NEGOTIATION;
      } else if (upper === 'SCENARIOLOADED') {
        currentEvent.triggerType = EVENT_SCENARIO_LOADED;
      } else if (upper === 'RANDOMTURN') {
        currentEvent.triggerType = EVENT_RANDOM_TURN;
      } else if (upper === 'NOSCHISM') {
        currentEvent.triggerType = EVENT_NO_SCHISM;
      } else if (upper === 'RECEIVEDTECHNOLOGY') {
        currentEvent.triggerType = EVENT_RECEIVED_TECH;
      } else if (upper === 'NOCITIES') {
        currentEvent.triggerType = EVENT_NO_CITIES;
      } else if (upper === 'CITYPRODUCTION') {
        currentEvent.triggerType = EVENT_CITY_PRODUCTION;
      } else {
        // Parse condition key=value pairs
        const kv = parseKeyValue(line);
        if (kv) {
          switch (kv.key) {
            case 'unit':
              currentEvent.conditions.unitType = resolveUnitName(kv.value);
              break;
            case 'attacker':
              currentEvent.conditions.attacker = resolveCivName(kv.value, civNames);
              break;
            case 'defender':
              currentEvent.conditions.defender = resolveCivName(kv.value, civNames);
              break;
            case 'city':
              currentEvent.conditions.cityName = kv.value;
              break;
            case 'turn':
              currentEvent.conditions.turn = kv.value.toUpperCase() === 'EVERY' ? -1 : parseInt(kv.value, 10);
              break;
            case 'interval':
              currentEvent.conditions.interval = parseInt(kv.value, 10);
              break;
            case 'denominator':
              currentEvent.conditions.denominator = parseInt(kv.value, 10);
              break;
            case 'receiver':
              currentEvent.conditions.receiver = resolveCivName(kv.value, civNames);
              break;
            case 'technology':
              currentEvent.conditions.techId = resolveTechName(kv.value);
              break;
            case 'talker':
              currentEvent.conditions.talker = resolveCivName(kv.value, civNames);
              break;
            case 'listener':
              currentEvent.conditions.listener = resolveCivName(kv.value, civNames);
              break;
            case 'talkertype':
              currentEvent.conditions.talkerType = kv.value.toUpperCase();
              break;
            case 'listenertype':
              currentEvent.conditions.listenerType = kv.value.toUpperCase();
              break;
            // J.4: Additional condition keys for NOCITIES and CITYPRODUCTION
            case 'builder':
              currentEvent.conditions.builder = resolveCivName(kv.value, civNames);
              break;
            case 'item':
            case 'production':
              // Parse item for CITYPRODUCTION: can be unit name, improvement name, or wonder name
              currentEvent.conditions.productionItem = kv.value;
              break;
            // J.4: HAS_TECH condition — check if civ has specific tech
            case 'hastech':
              currentEvent.conditions.hasTech = resolveTechName(kv.value);
              break;
          }
        }
      }
      continue;
    }

    // ── THEN block: parse actions ──
    if (state === 3) {
      const upper = line.toUpperCase();

      // Handle multi-line TEXT blocks
      if (inText) {
        if (upper === 'ENDTEXT') {
          if (currentAction) {
            currentAction.textLines = [...textLines];
          }
          textLines = [];
          inText = false;
        } else {
          textLines.push(line);
        }
        continue;
      }

      // Handle LOCATIONS blocks for CREATEUNIT
      if (inLocations) {
        if (upper === 'ENDLOCATIONS') {
          if (currentAction) {
            currentAction.locations = [...locations];
          }
          locations = [];
          inLocations = false;
        } else {
          // Parse coordinate pairs: x, y
          const parts = line.split(',').map(s => parseInt(s.trim(), 10));
          if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            locations.push({ x: parts[0], y: parts[1] });
          }
        }
        continue;
      }

      // Parse action types
      if (upper === 'TEXT') {
        currentAction = { type: 'text', textLines: [] };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_TEXT;
        inText = true;
        continue;
      }

      if (upper === 'CREATEUNIT') {
        currentAction = { type: 'createUnit', owner: ANYBODY, unitType: -1, veteran: false, locations: [], homeCity: '' };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_CREATE_UNIT;
        continue;
      }

      if (upper === 'MOVEUNIT') {
        currentAction = { type: 'moveUnit', owner: ANYBODY, unitType: -1, mapRect: [], moveTo: null, numberToMove: 'ALL' };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_MOVE_UNIT;
        continue;
      }

      if (upper === 'CHANGETERRAIN') {
        currentAction = { type: 'changeTerrain', terrainType: -1, mapRect: [] };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_CHANGE_TERRAIN;
        continue;
      }

      if (upper === 'MAKEAGGRESSION') {
        currentAction = { type: 'makeAggression', who: ANYBODY, whom: ANYBODY };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_MAKE_AGGRESSION;
        continue;
      }

      if (upper === 'CHANGEMONEY') {
        currentAction = { type: 'changeMoney', receiver: ANYBODY, amount: 0 };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_CHANGE_MONEY;
        continue;
      }

      if (upper === 'DESTROYACIVILIZATION') {
        currentAction = { type: 'destroyCiv', whom: ANYBODY };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_DESTROY_CIV;
        continue;
      }

      if (upper === 'GIVETECHNOLOGY') {
        currentAction = { type: 'giveTech', receiver: ANYBODY, techId: -1 };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_GIVE_TECH;
        continue;
      }

      if (upper === 'PLAYWAVEFILE') {
        currentAction = { type: 'playWave', filename: '' };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_PLAY_WAVE;
        continue;
      }

      if (upper === 'PLAYCDTRACK') {
        currentAction = { type: 'playCd', track: 0 };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_PLAY_CD;
        continue;
      }

      if (upper === 'JUSTONCE') {
        currentEvent.justOnce = true;
        currentEvent.actionFlags |= ACTION_JUST_ONCE;
        continue;
      }

      if (upper === 'DONTPLAYWONDERS') {
        // J.5: Parse DONTPLAYWONDERS as a no-op action (we don't play wonder movies)
        currentAction = { type: 'dontPlayWonders' };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_DONT_PLAY_WONDERS;
        continue;
      }

      if (upper === 'TRANSPORT') {
        // J.5: TRANSPORT action — block negotiation with specific civs
        currentAction = { type: 'transport', who: ANYBODY, whom: ANYBODY };
        currentEvent.actions.push(currentAction);
        currentEvent.actionFlags |= ACTION_TRANSPORT;
        continue;
      }

      if (upper === 'LOCATIONS') {
        inLocations = true;
        locations = [];
        continue;
      }

      // Parse action parameter key=value
      if (currentAction) {
        const kv = parseKeyValue(line);
        if (kv) {
          switch (kv.key) {
            case 'unit':
              currentAction.unitType = resolveUnitName(kv.value);
              break;
            case 'owner':
              currentAction.owner = resolveCivName(kv.value, civNames);
              break;
            case 'veteran':
              currentAction.veteran = kv.value.toUpperCase() === 'YES';
              break;
            case 'homecity':
              currentAction.homeCity = kv.value;
              break;
            case 'who':
              currentAction.who = resolveCivName(kv.value, civNames);
              break;
            case 'whom':
              currentAction.whom = resolveCivName(kv.value, civNames);
              break;
            case 'receiver':
              currentAction.receiver = resolveCivName(kv.value, civNames);
              break;
            case 'amount':
              currentAction.amount = parseInt(kv.value, 10);
              break;
            case 'technology':
              currentAction.techId = resolveTechName(kv.value);
              break;
            case 'terraintype':
              currentAction.terrainType = resolveTerrainName(kv.value);
              break;
            case 'numbertomove':
              currentAction.numberToMove = kv.value.toUpperCase() === 'ALL' ? 'ALL' : parseInt(kv.value, 10);
              break;
            case 'moveto': {
              // J.5: Support both coordinate pairs (x,y) and city name variant
              const parts = kv.value.split(',').map(s => s.trim());
              const nums = parts.map(s => parseInt(s, 10));
              if (parts.length >= 2 && !isNaN(nums[0]) && !isNaN(nums[1])) {
                currentAction.moveTo = { x: nums[0], y: nums[1] };
              } else {
                // City name variant: moveto=CityName
                currentAction.moveToCityName = kv.value.trim();
              }
              break;
            }
            case 'maprect': {
              const parts = kv.value.split(',').map(s => parseInt(s.trim(), 10));
              if (parts.length >= 4) {
                currentAction.mapRect = [
                  { x: parts[0], y: parts[1] },
                  { x: parts[2], y: parts[3] },
                ];
              }
              break;
            }
            case 'filename':
              currentAction.filename = kv.value;
              break;
            case 'track':
              currentAction.track = parseInt(kv.value, 10);
              break;
          }
        }
      }
    }
  }

  return events;
}

// ═══════════════════════════════════════════════════════════════════
// Trigger matching functions
// Ported from individual event_check_* decompiled functions
// ═══════════════════════════════════════════════════════════════════

/**
 * Check if an event's trigger matches the given context.
 *
 * @param {ScenarioEvent} evt - the event to check
 * @param {string} triggerType - one of the EVENT_* trigger constants
 * @param {object} ctx - trigger context
 * @returns {boolean} true if the event should fire
 */
function triggerMatches(evt, triggerType, ctx, rng) {
  if (evt.triggerType !== triggerType) return false;
  if (evt.justOnce && evt.fired) return false;

  const c = evt.conditions;

  // J.4: Universal HAS_TECH condition — applies to any trigger type
  if (c.hasTech != null && c.hasTech >= 0) {
    const checkCiv = c.receiver ?? c.attacker ?? c.defender ?? ctx.civSlot;
    const resolvedCiv = (checkCiv != null && checkCiv !== ANYBODY) ? checkCiv : ctx.civSlot;
    if (resolvedCiv != null && resolvedCiv >= 0 && ctx.gameState?.civTechs?.[resolvedCiv]) {
      if (!ctx.gameState.civTechs[resolvedCiv].has(c.hasTech)) return false;
    }
  }

  switch (triggerType) {
    case EVENT_TURN:
      // Turn trigger: fire if turn matches or -1 (EVERY)
      return c.turn === -1 || c.turn === ctx.turn;

    case EVENT_TURN_INTERVAL:
      // Interval trigger: fire every N turns
      if (!c.interval || c.interval <= 0) return true;
      return ctx.turn % c.interval === 0;

    case EVENT_RANDOM_TURN: {
      // Random trigger: 1/denominator chance
      const denom = c.denominator || 1;
      if (denom < 2) return true;
      return (rng ? rng.nextInt(denom) : Math.floor(Math.random() * denom)) + 1 === denom;
    }

    case EVENT_UNIT_KILLED:
      // Unit killed: match unit type, attacker, defender
      if (c.unitType != null && c.unitType >= 0 && c.unitType !== ctx.unitType) return false;
      if (c.attacker != null && c.attacker !== ANYBODY && c.attacker !== ctx.attacker) return false;
      if (c.defender != null && c.defender !== ANYBODY && c.defender !== ctx.defender) return false;
      return true;

    case EVENT_CITY_TAKEN:
      // City taken: match city name, attacker, defender
      if (c.cityName && ctx.cityName &&
          c.cityName.toLowerCase() !== ctx.cityName.toLowerCase()) return false;
      if (c.attacker != null && c.attacker !== ANYBODY && c.attacker !== ctx.attacker) return false;
      if (c.defender != null && c.defender !== ANYBODY && c.defender !== ctx.defender) return false;
      return true;

    case EVENT_RECEIVED_TECH:
      // Tech received: match receiver and tech ID
      if (c.techId != null && c.techId >= 0 && c.techId !== ctx.techId) return false;
      if (c.receiver != null && c.receiver !== ANYBODY && c.receiver !== ctx.civSlot) return false;
      return true;

    case EVENT_NEGOTIATION:
      // Negotiation: match talker and listener
      if (c.talker != null && c.talker !== ANYBODY && c.talker !== ctx.talker) return false;
      if (c.listener != null && c.listener !== ANYBODY && c.listener !== ctx.listener) return false;
      // J.4: Match talkerType/listenerType if specified (HUMAN/COMPUTER/HUMANORCOMPUTER)
      if (c.talkerType && c.talkerType !== 'HUMANORCOMPUTER') {
        if (c.talkerType === 'HUMAN' && !ctx.talkerIsHuman) return false;
        if (c.talkerType === 'COMPUTER' && ctx.talkerIsHuman) return false;
      }
      if (c.listenerType && c.listenerType !== 'HUMANORCOMPUTER') {
        if (c.listenerType === 'HUMAN' && !ctx.listenerIsHuman) return false;
        if (c.listenerType === 'COMPUTER' && ctx.listenerIsHuman) return false;
      }
      return true;

    case EVENT_SCENARIO_LOADED:
      return true;

    case EVENT_NO_SCHISM:
      if (c.defender != null && c.defender !== ANYBODY && c.defender !== ctx.civSlot) return false;
      return true;

    case EVENT_NO_CITIES: {
      // J.4: Check if specific civ has 0 cities
      if (c.defender != null && c.defender !== ANYBODY && c.defender !== ctx.civSlot) return false;
      // Must verify the civ actually has no cities in the game state
      const checkCiv = (c.defender != null && c.defender !== ANYBODY) ? c.defender : ctx.civSlot;
      if (checkCiv == null || checkCiv < 0) return false;
      if (ctx.gameState && ctx.gameState.cities) {
        const hasCities = ctx.gameState.cities.some(city =>
          city.owner === checkCiv && city.size > 0
        );
        if (hasCities) return false;
      }
      return true;
    }

    case EVENT_CITY_PRODUCTION: {
      // J.4: Check if city is producing specific item
      if (c.builder != null && c.builder !== ANYBODY && c.builder !== ctx.civSlot) return false;
      if (c.productionItem && ctx.productionName) {
        if (c.productionItem.toLowerCase() !== ctx.productionName.toLowerCase()) return false;
      }
      if (c.cityName && ctx.cityName) {
        if (c.cityName.toLowerCase() !== ctx.cityName.toLowerCase()) return false;
      }
      return true;
    }

    default:
      return false;
  }
}

/**
 * Resolve ANYBODY wildcards in event conditions to actual civ values from context.
 */
function resolveWildcards(evt, ctx) {
  const c = evt.conditions;
  if (c.attacker === ANYBODY && ctx.attacker != null) c.attacker = ctx.attacker;
  if (c.defender === ANYBODY && ctx.defender != null) c.defender = ctx.defender;
  if (c.receiver === ANYBODY && ctx.civSlot != null) c.receiver = ctx.civSlot;
}

// ═══════════════════════════════════════════════════════════════════
// executeEventAction — Perform a single event action
//
// Ported from event_dispatch_actions (FUN_004fc3ae) and its callees.
// ═══════════════════════════════════════════════════════════════════

/**
 * Execute a single event action on the game state.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {object} action - action descriptor from ScenarioEvent.actions
 * @param {object} ctx - trigger context (for resolving TRIGGERATTACKER etc.)
 * @returns {object|null} event descriptor for turnEvents, or null
 */
export function executeEventAction(state, mapBase, action, ctx) {
  switch (action.type) {
    case 'text': {
      // Display message text — store in turnEvents for client to show
      // J.4: %STRING substitution — replace %STRING0..%STRING9 with context values
      const rawLines = action.textLines || [];
      const substituted = rawLines.map(line => substituteEventText(line, ctx, state));
      return {
        type: 'scenarioText',
        textLines: substituted,
      };
    }

    case 'createUnit': {
      // Spawn unit(s) at specified location(s)
      const owner = resolveActionCiv(action.owner, ctx);
      if (owner < 0 || owner > 7) return null;
      if (action.unitType < 0) return null;

      const locs = action.locations && action.locations.length > 0
        ? action.locations
        : (ctx.gx != null ? [{ x: ctx.gx, y: ctx.gy }] : []);

      if (locs.length === 0) return null;

      // Pick a random location from the list
      const loc = locs[state.rng ? state.rng.nextInt(locs.length) : Math.floor(Math.random() * locs.length)];

      // Convert doubled-X to iso coordinates
      const gx = Math.floor((loc.x - (loc.y % 2)) / 2);
      const gy = loc.y;

      if (gy < 0 || gy >= mapBase.mh) return null;
      const wgx = mapBase.wraps ? ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw : gx;
      if (wgx < 0 || wgx >= mapBase.mw) return null;

      state.units = [...state.units];
      const newUnit = {
        type: action.unitType, owner, gx: wgx, gy,
        x: wgx * 2 + (gy % 2), y: gy,
        veteran: action.veteran ? 1 : 0, movesRemain: 0, orders: 'none',
        movesMade: 0, movesLeft: 0,
        homeCityId: 0xFFFF,
        goToX: -1, goToY: -1, hpLost: 0xFF,
        commodityCarried: -1, workTurns: 0, fuelRemaining: -1,
        prevInStack: -1, nextInStack: -1,
      };

      // Resolve home city by name
      if (action.homeCity && state.cities) {
        const hc = state.cities.findIndex(c =>
          c.owner === owner && c.size > 0 &&
          c.name.toLowerCase() === action.homeCity.toLowerCase()
        );
        if (hc >= 0) newUnit.homeCityId = hc;
      }

      state.units.push(newUnit);

      // Update visibility
      if (mapBase.tileData) {
        updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, owner, wgx, gy, mapBase.wraps);
      }

      return {
        type: 'scenarioCreateUnit',
        unitType: action.unitType,
        owner,
        gx: wgx, gy,
      };
    }

    case 'moveUnit': {
      // Teleport matching units within mapRect to moveTo destination
      const owner = resolveActionCiv(action.owner, ctx);

      // J.5: Resolve destination — either coordinates or city name
      let destGx, destGy, wDestGx;
      if (action.moveTo) {
        destGx = Math.floor((action.moveTo.x - (action.moveTo.y % 2)) / 2);
        destGy = action.moveTo.y;
        wDestGx = mapBase.wraps ? ((destGx % mapBase.mw) + mapBase.mw) % mapBase.mw : destGx;
      } else if (action.moveToCityName && state.cities) {
        // City-name variant: find city by name and use its coordinates
        const targetCity = state.cities.find(c =>
          c.size > 0 && c.name && c.name.toLowerCase() === action.moveToCityName.toLowerCase()
        );
        if (!targetCity) return null;
        destGx = targetCity.gx;
        destGy = targetCity.gy;
        wDestGx = destGx;
      } else {
        return null;
      }

      let moved = 0;
      const maxMove = action.numberToMove === 'ALL' ? Infinity : (action.numberToMove || 1);

      state.units = [...state.units];
      for (let i = 0; i < state.units.length && moved < maxMove; i++) {
        const u = state.units[i];
        if (u.gx < 0) continue;
        if (action.unitType >= 0 && u.type !== action.unitType) continue;
        if (owner >= 0 && u.owner !== owner) continue;

        // Check if unit is within mapRect
        if (action.mapRect && action.mapRect.length >= 2) {
          const ux = u.gx * 2 + (u.gy % 2);
          const minX = Math.min(action.mapRect[0].x, action.mapRect[1].x);
          const maxX = Math.max(action.mapRect[0].x, action.mapRect[1].x);
          const minY = Math.min(action.mapRect[0].y, action.mapRect[1].y);
          const maxY = Math.max(action.mapRect[0].y, action.mapRect[1].y);
          if (ux < minX || ux > maxX || u.gy < minY || u.gy > maxY) continue;
        }

        state.units[i] = {
          ...u,
          gx: wDestGx, gy: destGy,
          x: wDestGx * 2 + (destGy % 2), y: destGy,
          orders: 'none',
        };
        moved++;

        if (mapBase.tileData) {
          updateVisibility(mapBase.tileData, mapBase.mw, mapBase.mh, u.owner, wDestGx, destGy, mapBase.wraps);
        }
      }

      return moved > 0 ? { type: 'scenarioMoveUnit', moved } : null;
    }

    case 'changeTerrain': {
      // Change terrain within mapRect
      if (action.terrainType < 0 || action.terrainType > 10) return null;
      if (!action.mapRect || action.mapRect.length < 2) return null;

      const minX = Math.min(action.mapRect[0].x, action.mapRect[1].x);
      const maxX = Math.max(action.mapRect[0].x, action.mapRect[1].x);
      const minY = Math.min(action.mapRect[0].y, action.mapRect[1].y);
      const maxY = Math.max(action.mapRect[0].y, action.mapRect[1].y);

      let changed = 0;
      for (let y = minY; y <= maxY; y++) {
        for (let dx = minX; dx <= maxX; dx++) {
          // Convert doubled-X to iso
          const gx = Math.floor((dx - (y % 2)) / 2);
          const wgx = mapBase.wraps ? ((gx % mapBase.mw) + mapBase.mw) % mapBase.mw : gx;
          if (y < 0 || y >= mapBase.mh || wgx < 0 || wgx >= mapBase.mw) continue;
          const idx = y * mapBase.mw + wgx;
          const tile = mapBase.tileData?.[idx];
          if (tile) {
            tile.terrain = action.terrainType;
            changed++;
          }
        }
      }

      return changed > 0 ? { type: 'scenarioChangeTerrain', terrainType: action.terrainType, changed } : null;
    }

    case 'makeAggression': {
      // Declare war between two civs
      const who = resolveActionCiv(action.who, ctx);
      const whom = resolveActionCiv(action.whom, ctx);
      if (who < 0 || who > 7 || whom < 0 || whom > 7 || who === whom) return null;

      // Set treaty to war
      if (!state.treaties) state.treaties = {};
      const key = who < whom ? `${who}-${whom}` : `${whom}-${who}`;
      state.treaties = { ...state.treaties, [key]: 'war' };

      return { type: 'scenarioAggression', who, whom };
    }

    case 'changeMoney': {
      // Add/subtract gold
      const receiver = resolveActionCiv(action.receiver, ctx);
      if (receiver < 0 || receiver > 7) return null;
      if (!state.civs?.[receiver]) return null;

      state.civs = [...state.civs];
      const civ = { ...state.civs[receiver] };
      civ.treasury = Math.max(0, (civ.treasury || 0) + (action.amount || 0));
      state.civs[receiver] = civ;

      return { type: 'scenarioChangeMoney', receiver, amount: action.amount };
    }

    case 'destroyCiv': {
      // Destroy a civilization — kill all units and cities
      const whom = resolveActionCiv(action.whom, ctx);
      if (whom < 1 || whom > 7) return null;

      state.units = [...state.units];
      for (let i = 0; i < state.units.length; i++) {
        const u = state.units[i];
        if (u.owner === whom && u.gx >= 0) {
          state.units[i] = { ...u, gx: -1, gy: -1, x: -1, y: -1, movesLeft: 0 };
        }
      }

      if (state.cities) {
        state.cities = [...state.cities];
        for (let i = 0; i < state.cities.length; i++) {
          if (state.cities[i].owner === whom && state.cities[i].size > 0) {
            state.cities[i] = { ...state.cities[i], size: 0 };
          }
        }
      }

      state.civsAlive &= ~(1 << whom);

      return { type: 'scenarioDestroyCiv', whom };
    }

    case 'giveTech': {
      // Grant technology to a civ
      const receiver = resolveActionCiv(action.receiver, ctx);
      if (receiver < 0 || receiver > 7) return null;
      if (action.techId < 0) return null;

      grantAdvance(state, receiver, action.techId);

      return { type: 'scenarioGiveTech', receiver, techId: action.techId };
    }

    case 'playWave':
    case 'playCd':
      // Audio actions are no-ops in the multiplayer engine
      return null;

    case 'dontPlayWonders':
      // J.5: No-op — we don't play wonder movies
      return null;

    case 'transport': {
      // J.5: TRANSPORT action — block negotiation with specific civs
      // Set a flag on state so negotiation checks can respect it
      const who = resolveActionCiv(action.who, ctx);
      const whom = resolveActionCiv(action.whom, ctx);
      if (!state.negotiationBlocks) state.negotiationBlocks = [];
      state.negotiationBlocks = [...state.negotiationBlocks, { who, whom }];
      return { type: 'scenarioTransport', who, whom };
    }

    default:
      return null;
  }
}

/**
 * J.4: Substitute %STRING0..%STRING9 and %NUMBER0..%NUMBER9 placeholders in event text.
 *
 * Standard Civ2 substitutions:
 *   %STRING0 = attacker/talker civ name
 *   %STRING1 = defender/listener civ name
 *   %STRING2 = city name
 *   %STRING3 = unit name
 *   %STRING4 = tech name
 *
 * @param {string} line - text line with potential placeholders
 * @param {object} ctx - trigger context
 * @param {object} state - game state
 * @returns {string} substituted text
 */
function substituteEventText(line, ctx, state) {
  if (!line || !line.includes('%')) return line;

  // Build substitution arrays
  const civNames = state.civs ? state.civs.map(c => c?.name || c?.tribeName || '') : [];
  const strings = [
    // %STRING0 = attacker/talker civ name
    civNames[ctx.attacker ?? ctx.talker ?? ctx.civSlot ?? 0] || '',
    // %STRING1 = defender/listener civ name
    civNames[ctx.defender ?? ctx.listener ?? 0] || '',
    // %STRING2 = city name
    ctx.cityName || '',
    // %STRING3 = unit name
    (ctx.unitType != null && ctx.unitType >= 0 && UNIT_NAMES[ctx.unitType]) || '',
    // %STRING4 = tech name
    (ctx.techId != null && ctx.techId >= 0 && ADVANCE_NAMES[ctx.techId]) || '',
    // %STRING5..9 = empty (reserved)
    '', '', '', '', '',
  ];

  let result = line;
  // Replace %STRING0 through %STRING9
  for (let i = 0; i <= 9; i++) {
    const placeholder = `%STRING${i}`;
    if (result.includes(placeholder)) {
      result = result.split(placeholder).join(strings[i] || '');
    }
  }
  // Replace %NUMBER0 through %NUMBER9 (used less commonly)
  const numbers = [
    ctx.turn ?? state.turn?.number ?? 0,
    ctx.civSlot ?? 0,
  ];
  for (let i = 0; i <= 9; i++) {
    const placeholder = `%NUMBER${i}`;
    if (result.includes(placeholder)) {
      result = result.split(placeholder).join(String(numbers[i] || 0));
    }
  }

  return result;
}

/**
 * Resolve an action's civ reference, handling TRIGGERATTACKER/TRIGGERDEFENDER.
 */
function resolveActionCiv(civRef, ctx) {
  if (civRef === -3) {
    // Placeholder — try attacker then defender from context
    return ctx.attacker ?? ctx.defender ?? ctx.civSlot ?? -1;
  }
  if (civRef === ANYBODY) {
    return ctx.civSlot ?? ctx.attacker ?? -1;
  }
  return civRef;
}

// ═══════════════════════════════════════════════════════════════════
// dispatchEvents — Check all events and fire matching ones
//
// Ported from event_check_* family + event_dispatch_actions
// ═══════════════════════════════════════════════════════════════════

/**
 * Check all scenario events for a given trigger type and context.
 * Executes matching event actions on the state.
 *
 * @param {object} state - mutable game state
 * @param {object} mapBase - map data + accessors
 * @param {number} triggerType - one of EVENT_* constants
 * @param {object} ctx - trigger context { civSlot, cityName, unitType, techId, attacker, defender, turn, talker, listener, gx, gy }
 * @returns {object[]} array of event result descriptors
 */
export function dispatchEvents(state, mapBase, triggerType, ctx) {
  const scenarioEvents = state.scenarioEvents;
  if (!scenarioEvents || scenarioEvents.length === 0) return [];

  const results = [];

  for (const evt of scenarioEvents) {
    if (!triggerMatches(evt, triggerType, ctx, state.rng)) continue;

    // Resolve wildcards for this firing
    resolveWildcards(evt, ctx);

    // Execute all actions
    for (const action of evt.actions) {
      const result = executeEventAction(state, mapBase, action, ctx);
      if (result) {
        results.push(result);
        // Also push to turnEvents for client notification
        if (!state.turnEvents) state.turnEvents = [];
        state.turnEvents.push(result);
      }
    }

    // Mark JUSTONCE events as fired
    if (evt.justOnce) {
      evt.fired = true;
    }
  }

  // Special: for NEGOTIATION triggers, return whether negotiation is blocked
  if (triggerType === EVENT_NEGOTIATION) {
    for (const evt of scenarioEvents) {
      if (evt.triggerType !== EVENT_NEGOTIATION) continue;
      if (evt.justOnce && evt.fired) continue;
      if (evt.actionFlags & ACTION_TRANSPORT) {
        // PREVENT_NEGOTIATION flag
        const c = evt.conditions;
        const talkerMatch = (c.talker == null || c.talker === ANYBODY || c.talker === ctx.talker);
        const listenerMatch = (c.listener == null || c.listener === ANYBODY || c.listener === ctx.listener);
        if (talkerMatch && listenerMatch) {
          results.push({ type: 'negotiationBlocked' });
        }
      }
    }
  }

  return results;
}

/**
 * Check if civil war/schism is blocked for a given civ by a NOSCHISM event.
 *
 * @param {object} state - game state
 * @param {number} civSlot - civ to check
 * @returns {boolean} true if schism is blocked
 */
export function isSchismBlocked(state, civSlot) {
  const scenarioEvents = state.scenarioEvents;
  if (!scenarioEvents) return false;

  for (const evt of scenarioEvents) {
    if (evt.triggerType !== EVENT_NO_SCHISM) continue;
    if (evt.justOnce && evt.fired) continue;
    const c = evt.conditions;
    if (c.defender == null || c.defender === ANYBODY || c.defender === civSlot) {
      return true;
    }
  }
  return false;
}
