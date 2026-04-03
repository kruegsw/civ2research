// ═══════════════════════════════════════════════════════════════════
// devlog.js — Observable logging for neutered code
//
// Two kinds of neutered code call into this:
//   1. DEVIATION lines — C code with no JS equivalent (MFC, SEH, structs)
//   2. External stubs  — Win32 API, C runtime, MFC functions
//
// Every call is recorded so we can see what the binary "wanted" to do.
// ═══════════════════════════════════════════════════════════════════

const _log = [];
const _counts = {};

// Called when a DEVIATION line is reached at runtime
export function devLog(category, description) {
  const key = `DEV:${category}`;
  _counts[key] = (_counts[key] || 0) + 1;
  if (_counts[key] <= 3) {
    _log.push({ type: 'deviation', category, description });
  }
  return 0; // safe return value for expressions
}

// Called when an external stub function is invoked
export function stubCall(name, args) {
  const key = `STUB:${name}`;
  _counts[key] = (_counts[key] || 0) + 1;
  if (_counts[key] <= 3) {
    _log.push({ type: 'stub', name, args: args.slice(0, 4) });
  }
  return 0; // Default return for all stubs — "nothing/false/null"
  return 0;
}

// Print summary of what fired
export function printLog() {
  if (_log.length === 0) {
    console.log('  (no devlog entries)');
    return;
  }

  // Deviations
  const devs = {};
  const stubs = {};
  for (const [key, count] of Object.entries(_counts)) {
    if (key.startsWith('DEV:')) {
      const cat = key.substring(4);
      devs[cat] = (devs[cat] || 0) + count;
    } else if (key.startsWith('STUB:')) {
      const name = key.substring(5);
      stubs[name] = count;
    }
  }

  const devTotal = Object.values(devs).reduce((a, b) => a + b, 0);
  const stubTotal = Object.values(stubs).reduce((a, b) => a + b, 0);

  console.log(`  DEVIATION lines hit: ${devTotal}`);
  for (const [cat, count] of Object.entries(devs).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${cat}: ${count}`);
  }

  console.log(`  External stubs called: ${stubTotal}`);
  const topStubs = Object.entries(stubs).sort((a, b) => b[1] - a[1]).slice(0, 20);
  for (const [name, count] of topStubs) {
    console.log(`    ${name}: ${count}`);
  }
  if (Object.keys(stubs).length > 20) {
    console.log(`    ... and ${Object.keys(stubs).length - 20} more`);
  }
}

// Reset between turns
export function resetLog() {
  _log.length = 0;
  for (const key of Object.keys(_counts)) delete _counts[key];
}
