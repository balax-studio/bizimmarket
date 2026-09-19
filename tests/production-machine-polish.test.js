const fs = require('fs');
const assert = require('assert');

const source = fs.readFileSync('js/entities.js', 'utf8');

assert(source.includes('function createProductionMachineDetails'), 'Machines should share voxel industrial details');
assert(source.includes('function updateProductionMachineDetails'), 'Machine details should have one animation controller');
assert(source.includes('detailKit.controlLights'), 'The shared kit should expose status lights');
assert(source.includes('detailKit.conveyorRollers'), 'The shared kit should expose moving conveyor rollers');
assert(source.includes('detailKit.ventFlaps'), 'The shared kit should expose ventilation motion');
assert(source.includes('ready ? 0x2ed573'), 'Ready products should use a clear green machine signal');
assert(source.includes('active ? 0x00cec9'), 'Active production should use a clear cyan machine signal');

const machines = [
  'FlourMill',
  'BakeryOven',
  'CheeseProcessor',
  'PopcornMaker',
  'Juicer',
  'IceCreamMachine',
  'SaladPrepBar'
];

for (const className of machines) {
  const start = source.indexOf(`class ${className}`);
  const next = source.indexOf('\nclass ', start + 1);
  const body = source.slice(start, next >= 0 ? next : undefined);
  assert(body.includes('createProductionMachineDetails(this.group'), `${className} should receive industrial details`);
  assert(body.includes('updateProductionMachineDetails(this'), `${className} should animate from its real production state`);
}

console.log('Production machine polish tests passed.');
