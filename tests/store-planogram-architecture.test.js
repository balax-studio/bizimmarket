const assert = require('assert');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const mechanics = require(path.join(root, 'js', 'mechanics.js'));
const gameSource = fs.readFileSync(path.join(root, 'js', 'game.js'), 'utf8');
const entitiesSource = fs.readFileSync(path.join(root, 'js', 'entities.js'), 'utf8');

// 1. Verify STORE_PLANOGRAM Contract & Zones
assert(mechanics.STORE_PLANOGRAM, 'GameMechanics must export STORE_PLANOGRAM');
const { ZONES, FIXTURES } = mechanics.STORE_PLANOGRAM;

assert(ZONES.DECOMPRESSION, 'Planogram must include DECOMPRESSION zone');
assert(ZONES.CHECKOUT_CONCOURSE, 'Planogram must include CHECKOUT_CONCOURSE zone');
assert(ZONES.FRESH_PRODUCE, 'Planogram must include FRESH_PRODUCE zone');
assert(ZONES.GROCERY_GRID, 'Planogram must include GROCERY_GRID zone');
assert(ZONES.EAST_PROMENADE, 'Planogram must include EAST_PROMENADE zone');
assert(ZONES.PRODUCTION_HALL, 'Planogram must include PRODUCTION_HALL zone');

// 2. Verify Fixture Inventory & Priorities
assert(Array.isArray(FIXTURES) && FIXTURES.length >= 20, 'Planogram must contain comprehensive fixture catalog');

const p1 = FIXTURES.filter(f => f.priority === 1);
const p2 = FIXTURES.filter(f => f.priority === 2);
const p3 = FIXTURES.filter(f => f.priority === 3);
const p4 = FIXTURES.filter(f => f.priority === 4);

assert(p1.some(f => f.id === 'checkout_1'), 'Checkout 1 must be Priority 1');
assert(p1.some(f => f.id === 'cashier_1'), 'Cashier 1 must be Priority 1');
assert(p2.some(f => f.id === 'dept_manav'), 'Produce department must be Priority 2');
assert(p2.some(f => f.id === 'dept_gurme'), 'Gourmet department must be Priority 2');
assert(p3.some(f => f.id === 'pad_2_cashier_speed'), 'Cashier speed pad must be Priority 3');
assert(p4.some(f => f.id === 'decor_freezer'), 'Island freezer must be Priority 4');

// 3. Verify Sequential Placement Pipeline & Zero Collisions
const spatial = new mechanics.SpatialOccupancyManager();
assert(typeof spatial.placePlanogramFixture === 'function', 'SpatialOccupancyManager must implement placePlanogramFixture');

// Sequentially place all fixtures in priority order
const sortedFixtures = [...FIXTURES].sort((a, b) => a.priority - b.priority);
const placedResults = [];

sortedFixtures.forEach(fix => {
  const res = spatial.placePlanogramFixture(fix.id);
  assert(res, `Fixture ${fix.id} must be successfully placed`);
  placedResults.push(res);
});

// Verify all reservations are collision-valid
const invalidReservations = spatial.reservations.filter(r => !r.valid);
assert.strictEqual(invalidReservations.length, 0, 'All planogram fixture reservations must be collision-valid');

// 4. Verify Code Integration
assert(gameSource.includes('placePlanogramFixture'), 'game.js must utilize placePlanogramFixture');
assert(entitiesSource.includes('placePlanogramFixture'), 'entities.js must utilize placePlanogramFixture');
assert(gameSource.includes("placePlanogramFixture('checkout_1')"), 'Checkout 1 must be placed via planogram pipeline');

console.log('STORE_PLANOGRAM Architecture tests: 100% PASSED');
