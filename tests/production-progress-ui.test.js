const fs = require('fs');
const assert = require('assert');

const source = fs.readFileSync('js/entities.js', 'utf8');

assert(source.includes('function getProductionRecipeTexture'), 'Production recipes should use a shared readable texture');
assert(source.includes('detailKit.recipeBoard'), 'Each machine should expose a recipe board');
assert(source.includes('detailKit.progressFill'), 'Each machine should expose a physical progress bar');
assert(source.includes('Math.max(0, Math.min(1, progress))'), 'Progress should be safely clamped between zero and one');
assert(source.includes("recipeLabel = 'HAMMADDE > URUN'"), 'Recipe UI should have a safe fallback label');

const recipes = [
  'BUGDAY > UN',
  'UN > EKMEK',
  'SUT > PEYNIR',
  'MISIR > PATLAMIS MISIR',
  'ELMA > ELMA SUYU',
  'SUT + YUMURTA + CILEK > DONDURMA',
  'DOMATES + MISIR + PEYNIR > SALATA'
];

for (const recipe of recipes) {
  assert(source.includes(`'${recipe}'`), `Recipe board should include ${recipe}`);
}

const progressBindings = [
  'this.grindTimer / this.grindDuration',
  'this.bakeTimer / this.bakeDuration',
  'this.churnTimer / this.churnDuration',
  'this.popTimer / this.popDuration',
  'this.juiceTimer / this.juiceDuration',
  'this.churnTimer / this.churnDuration',
  'this.prepTimer / this.prepDuration'
];

for (const binding of progressBindings) {
  assert(source.includes(binding), `Progress UI should read the real timer: ${binding}`);
}

console.log('Production recipe and progress UI tests passed.');
