const fs = require('fs');
const assert = require('assert');

const source = fs.readFileSync('js/entities.js', 'utf8');
const start = source.indexOf('class EnvironmentAndDecorations');
const end = source.indexOf('\nclass ', start + 1);
const environment = source.slice(start, end >= 0 ? end : undefined);

assert(source.includes('function getWayfindingFloorTexture'), 'Floor navigation labels should use a shared texture');
assert(environment.includes('promenadeWayfinding'), 'The central promenade should expose its visual navigation layer');
assert(environment.includes('MARKET GIRISI'), 'The entrance should have a clear floor stamp');
assert(environment.includes('MANAV'), 'The promenade should direct players toward produce');
assert(environment.includes('FIRIN'), 'The promenade should direct players toward bakery production');
assert(environment.includes('URETIM'), 'The promenade should direct players toward production');
assert(environment.includes('createPromenadeChevron'), 'The main route should use chunky directional chevrons');
assert(environment.includes('intersectionColors'), 'Crossroads should use consistent department color coding');
assert(environment.includes('wearPattern'), 'Floor wear should be deliberate instead of random confetti');
assert(!environment.includes('Math.random() * stoneMats.length'), 'Promenade tiles should have a deterministic visual rhythm');
assert(!environment.includes('for (let i = 0; i < 24; i++)'), 'Random confetti-like flower scatter should be reduced');

console.log('Creative promenade floor tests passed.');
