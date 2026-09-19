const fs = require('fs');
const assert = require('assert');

const entities = fs.readFileSync('js/entities.js', 'utf8');

assert(
  entities.includes('function createProductionFloorKit'),
  'Production machines should share one consistent floor treatment'
);
assert(
  entities.includes("floorKit.userData.productionZone = true"),
  'Production floor visuals should be identifiable without becoming collision geometry'
);
assert(
  entities.includes('createProductionFlowArrow'),
  'Production cells should make the input-to-output direction readable'
);
assert(
  entities.includes('hazardStripe'),
  'Production cells should have high-contrast safety markings'
);

const supportedMachines = [
  'FlourMill',
  'BakeryOven',
  'CheeseProcessor',
  'PopcornMaker',
  'Juicer',
  'IceCreamMachine',
  'SaladPrepBar'
];

for (const className of supportedMachines) {
  const classStart = entities.indexOf(`class ${className}`);
  assert(classStart >= 0, `${className} should exist`);
  const nextClass = entities.indexOf('\nclass ', classStart + 1);
  const classSource = entities.slice(classStart, nextClass >= 0 ? nextClass : undefined);
  assert(
    classSource.includes('createProductionFloorKit(this.group'),
    `${className} should use the shared production floor kit`
  );
}

assert(
  !entities.includes('new THREE.CylinderGeometry'),
  'Production polish should preserve the voxel BoxGeometry art direction'
);

console.log('Production area visual tests passed.');
