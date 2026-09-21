const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const threeCode = fs.readFileSync(path.join(root, 'js', 'three.min.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(threeCode, sandbox);
const THREE = sandbox.THREE || sandbox.window.THREE;

const mechanics = require(path.join(root, 'js', 'mechanics.js'));
const gameSource = fs.readFileSync(path.join(root, 'js', 'game.js'), 'utf8');
const entitiesSource = fs.readFileSync(path.join(root, 'js', 'entities.js'), 'utf8');

// 1. Verify SpatialOccupancyManager Integration in Source Code
assert(gameSource.includes('SpatialOccupancyManager'), 'game.js must instantiate SpatialOccupancyManager');
assert(entitiesSource.includes('findClearPlacement'), 'entities.js must use findClearPlacement for dynamic clearance');
assert(gameSource.includes("this.spatial.reserve('checkout_1'"), 'game.js must reserve Checkout 1 in spatial registry');
assert(gameSource.includes("this.spatial.reserve('cashier_1'"), 'game.js must reserve Cashier 1 in spatial registry');

// 2. Verify SpatialOccupancyManager AABB Collision Logic
const spatial = new mechanics.SpatialOccupancyManager();
assert(spatial.protectedZones.some(z => z.id === 'ZONE_CHECKOUT_CONCOURSE'), 'Protected checkout concourse zone must exist');

// Foreign DECOR inside checkout concourse must be rejected
const decorConflict = spatial.testAABB(7.0, 9.0, -19.5, -18.0, 'DECOR');
assert(!decorConflict.allowed, 'Unapproved DECOR inside checkout concourse must be rejected');

// Authorized CHECKOUT and CASHIER inside concourse must be permitted
const checkoutAllowed = spatial.testAABB(3.0, 4.0, -19.5, -18.5, 'CHECKOUT');
assert(checkoutAllowed.allowed, 'CHECKOUT must be permitted in checkout concourse');

const cashierAllowed = spatial.testAABB(3.2, 3.8, -20.45, -19.85, 'CASHIER');
assert(cashierAllowed.allowed, 'CASHIER must be permitted in checkout concourse');

// 3. Verify Dynamic Clearance Placement
const gourmetClear = spatial.findClearPlacement(5.8, 0.86, 9.75, -20.5, 'DECOR', ['EAST', 'WEST']);
assert(gourmetClear.adjusted, 'Gourmet island must adjust position away from checkout concourse');
assert(gourmetClear.x > 14.5 || gourmetClear.x < 1.5, 'Gourmet island must place outside checkout concourse bounds');

const freezerClear = spatial.findClearPlacement(1.8, 2.8, 7.0, -17.7, 'DECOR', ['EAST', 'WEST', 'SOUTH', 'NORTH']);
assert(freezerClear.adjusted, 'Island freezer must adjust position away from checkout queues');

const pad2Clear = spatial.findClearPlacement(2.6, 2.6, 7.5, -15.5, 'UNLOCK_PAD', ['SOUTH', 'WEST', 'EAST', 'NORTH']);
assert(pad2Clear.adjusted, 'Progression Pad 2 must adjust position away from checkout queue corridor');

// 4. Verify Full 3D Box3 Physical Collision-Free Guarantee for Checkout Concourse
const checkouts = [
  { name: 'Checkout_1', x: 3.5, z: -19.5 },
  { name: 'Checkout_2', x: 7.5, z: -19.5 },
  { name: 'Checkout_3', x: 11.5, z: -19.5 }
];

const cashiers = [
  { name: 'Cashier_1', x: 3.5, z: -20.15 },
  { name: 'Cashier_2', x: 7.5, z: -20.15 },
  { name: 'Cashier_3', x: 11.5, z: -20.15 }
];

function makeBox(sx, sy, sz, px, py, pz) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), new THREE.MeshBasicMaterial());
  mesh.position.set(px, py, pz);
  return mesh;
}

const checkoutBoxes = [];
checkouts.forEach(c => {
  const grp = new THREE.Group();
  grp.position.set(c.x, 0, c.z);
  grp.add(makeBox(2.6, 0.94, 0.88, 0, 0.47, 0));
  grp.updateMatrixWorld(true);
  checkoutBoxes.push({ name: c.name, box: new THREE.Box3().setFromObject(grp) });
});

const cashierBoxes = [];
cashiers.forEach(c => {
  const grp = new THREE.Group();
  grp.position.set(c.x, 0, c.z);
  grp.add(makeBox(0.56, 1.4, 0.52, 0, 0.7, 0));
  grp.updateMatrixWorld(true);
  cashierBoxes.push({ name: c.name, box: new THREE.Box3().setFromObject(grp) });
});

// Create dynamic Gourmet Island
const gourmetGrp = new THREE.Group();
gourmetGrp.position.set(gourmetClear.x, 0.035, gourmetClear.z);
gourmetGrp.add(makeBox(5.8, 0.72, 0.86, 0, 0.36, -0.12));
gourmetGrp.updateMatrixWorld(true);
const gourmetBox = new THREE.Box3().setFromObject(gourmetGrp);

// Create dynamic Freezer
const freezerGrp = new THREE.Group();
freezerGrp.position.set(freezerClear.x, 0, freezerClear.z);
freezerGrp.add(makeBox(1.6, 0.92, 2.6, 0, 0.46, 0));
freezerGrp.updateMatrixWorld(true);
const freezerBox = new THREE.Box3().setFromObject(freezerGrp);

// Create dynamic Pad 2
const pad2Grp = new THREE.Group();
pad2Grp.position.set(pad2Clear.x, 0.035, pad2Clear.z);
pad2Grp.add(makeBox(2.6, 0.04, 2.6, 0, 0.02, 0));
pad2Grp.updateMatrixWorld(true);
const pad2Box = new THREE.Box3().setFromObject(pad2Grp);

// Verify Gourmet Island does NOT intersect any Cashier
cashierBoxes.forEach(cashier => {
  const intersects = gourmetBox.intersectsBox(cashier.box);
  assert(!intersects, `Gourmet island must not intersect ${cashier.name}`);
});

// Verify Island Freezer does NOT intersect any Checkout counter
checkoutBoxes.forEach(chk => {
  const intersects = freezerBox.intersectsBox(chk.box);
  assert(!intersects, `Island freezer must not intersect ${chk.name}`);
});

console.log('SpatialOccupancyManager collision tests: 100% PASSED');
