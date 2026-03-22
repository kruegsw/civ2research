// ═══════════════════════════════════════════════════════════════════
// stubs.js — Win32 API and UI function stubs
//
// Binary game logic calls UI/Win32 functions inline. These are
// stubbed as no-ops for headless operation.
// ═══════════════════════════════════════════════════════════════════

export function stub(name) {
  return function (...args) {
    // Uncomment for debugging:
    // console.warn(`STUB: ${name}(${args.join(', ')})`);
    return 0;
  };
}
