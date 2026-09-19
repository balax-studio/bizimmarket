const fs = require('fs');
const assert = require('assert');

const source = fs.readFileSync('js/entities.js', 'utf8');

assert(source.includes('function updateProductionVisualDensity'), 'Production labels should share one density controller');
assert(source.includes('const showRecipe = isNearby || blocked'), 'Recipe boards should only appear when relevant');
assert(source.includes('const showStatus = playerDistance < 10 || blocked'), 'Machine status signs should disappear at long range');
assert(source.includes('const showSafetySigns = playerDistance < 7'), 'Decorative safety signs should use a tighter visibility range');
assert(source.includes('detailKit.decor.userData.safetySigns'), 'Decor signs should be independently hideable');
assert(source.includes('detailKit.recipeBoard.position.y = blocked ? 2.34 : 2.02'), 'Recipe and blocked warnings should use separate vertical lanes');
assert(source.includes('detailKit.blockedSign.position.y = 2.82'), 'Blocked warnings should retain the highest visual priority');
assert(source.includes('detailKit.completionBurst.visible = detailKit.isNearby'), 'Completion particles should not add distant visual noise');
assert(!source.includes('detailKit.recipeBoard.visible = detailKit.isNearby || active || blocked'), 'Active distant machines should not expose recipe cards');

console.log('Production visual density tests passed.');
