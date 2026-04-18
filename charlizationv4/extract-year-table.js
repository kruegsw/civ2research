// Extract the year_table region from a snapshot that has it,
// and save it as a standalone file for use with older snapshots.
import { readFileSync, writeFileSync } from 'fs';
import { parseSnapshot } from './load-snapshot.js';

const src = process.argv[2];
const out = process.argv[3] || 'year_table.bin';
const regions = parseSnapshot(src);
if (!regions.has('year_table')) {
  console.error(`Snapshot ${src} has no year_table region — take a new one with the updated sniffer/snap-now.`);
  process.exit(1);
}
const { addr, bytes } = regions.get('year_table');
writeFileSync(out, bytes);
console.log(`Wrote ${bytes.length} bytes of year_table (addr=0x${addr.toString(16)}) to ${out}`);
