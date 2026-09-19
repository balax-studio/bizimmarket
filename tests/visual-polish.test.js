const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const game = fs.readFileSync(path.join(root, 'js', 'game.js'), 'utf8');
const entities = fs.readFileSync(path.join(root, 'js', 'entities.js'), 'utf8');

assert.match(game, /createDepartmentFloorZones\(\)/, 'Environment should create department floor zones');
assert.match(game, /createDepartmentZone\(/, 'Department zone helper should exist');
assert.match(game, /MANAV|FIRIN|SOĞUK|GURME/, 'Department signage should use visible Turkish labels');

assert.match(game, /createPlayerGroundRing\(\)/, 'Player should get a ground-ring affordance');
assert.match(game, /updatePlayerGroundRing\(/, 'Player ground-ring should be animated in the update loop');

assert.match(entities, /createShelfStockHud\(\)/, 'Shelves should expose a visual stock HUD');
assert.match(entities, /updateShelfStockHud\(/, 'Shelf stock HUD should update as stock changes');
assert.match(entities, /stockFill\.scale\.x/, 'Shelf stock HUD should visibly encode stock amount');
assert.match(entities, /0xff4757|0xffe600|0x2ed573/, 'Shelf stock states should use semantic red/yellow/green colors');

console.log('visual polish tests passed');
