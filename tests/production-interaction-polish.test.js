const fs = require('fs');
const assert = require('assert');

const source = fs.readFileSync('js/entities.js', 'utf8');

assert(source.includes('function createProductionDecorKit'), 'Production cells should include voxel environmental dressing');
assert(source.includes('detailKit.blockedSign'), 'Machines should expose a clear blocked-output warning');
assert(source.includes("getMachineStatusTexture('OUTPUT_BLOCKED', 'CIKIS DOLU'"), 'Blocked state should use a readable warning sign');
assert(source.includes('detailKit.completionBurst'), 'Completed products should trigger a reusable voxel burst');
assert(source.includes('detailKit.lastOutputCount'), 'Completion effects should trigger only for newly produced items');
assert(source.includes('distanceTo(machine.group.position)'), 'Machine emphasis should respond to player proximity');
assert(source.includes('const isNearby = playerDistance < 4.2'), 'Proximity work should be bounded to a small radius');
assert(source.includes('detailKit.recipeBoard.scale.setScalar'), 'Nearby recipe information should become more readable');
assert(source.includes('floorKit.userData.inputArrow'), 'The production floor should expose its input direction');
assert(source.includes('floorKit.userData.outputArrow'), 'The production floor should expose its output direction');
assert(source.includes('carriedTypes.has(inputType)'), 'Input guidance should react to carried recipe ingredients');
assert(source.includes('const blocked = outputCount >= outputCapacity'), 'Full output capacity should stop and warn the player');
assert(source.includes('visualUpdateAccumulator'), 'Expensive proximity visuals should use a throttled update path');

for (const label of ['GUVENLI ALAN', 'HAMMADDE', 'MAMUL CIKIS']) {
  assert(source.includes(label), `Production decoration should include ${label}`);
}

console.log('Production interaction polish tests passed.');
