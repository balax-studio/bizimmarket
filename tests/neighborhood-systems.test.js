const assert = require('assert');
const fs = require('fs');
const path = require('path');

const mechanics = require('../js/mechanics.js');

// 1. Verify HTML Structure for Modals & HUD Buttons
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

assert(html.includes('id="neighborhood-btn"'), 'Neighborhood button must exist in index.html');
assert(html.includes('id="neighborhood-modal"'), 'Neighborhood modal must exist in index.html');
assert(html.includes('id="day-choice-modal"'), 'Day choice modal must exist in index.html');
assert(html.includes('data-neighborhood-tab="residents"'), 'Residents tab must exist in neighborhood modal');
assert(html.includes('data-neighborhood-tab="brands"'), 'Brands tab must exist in neighborhood modal');
assert(html.includes('data-neighborhood-tab="buildings"'), 'Buildings tab must exist in neighborhood modal');

// 2. Strict Emoji Rule Verification: No platform emojis in index.html modals
const standardEmojiPattern = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const neighborhoodModalSection = html.slice(html.indexOf('id="neighborhood-modal"'), html.indexOf('<!-- Day Start Choice') || undefined);
assert(!standardEmojiPattern.test(neighborhoodModalSection), 'Neighborhood modal must not contain standard platform emojis');

// 3. Verify CSS Classes for Modals and Tabs
const css = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf8');
assert(css.includes('.neighborhood-modal'), 'CSS must define .neighborhood-modal');
assert(css.includes('.day-choice-modal'), 'CSS must define .day-choice-modal');
assert(css.includes('.resident-card'), 'CSS must define .resident-card');
assert(css.includes('.brand-card'), 'CSS must define .brand-card');
assert(css.includes('.building-card'), 'CSS must define .building-card');
assert(css.includes('.day-choice-card'), 'CSS must define .day-choice-card');

// 4. Pure Mechanics Verification: Faz 1 - Neighborhood Residents
assert(Array.isArray(mechanics.NEIGHBORHOOD_RESIDENTS), 'NEIGHBORHOOD_RESIDENTS must be an array');
assert.strictEqual(mechanics.NEIGHBORHOOD_RESIDENTS.length, 6, 'Must have 6 neighborhood residents');

let nState = mechanics.createNeighborhoodState();
assert.strictEqual(mechanics.getResidentAffinity(nState, 'ayse'), 0);
for (let i = 0; i < 3; i++) {
  nState = mechanics.recordResidentVisit(nState, 'ayse');
}
assert.strictEqual(mechanics.getResidentAffinity(nState, 'ayse'), 1);

// Visit 40 times -> Affinity 5
for (let i = 0; i < 37; i++) {
  nState = mechanics.recordResidentVisit(nState, 'ayse');
}
assert.strictEqual(mechanics.getResidentAffinity(nState, 'ayse'), 5);

const stories = mechanics.getUnlockedStories(nState, 'ayse');
assert(stories.length >= 2, 'Must unlock stories at affinity 5');

// Day time candidate sampling
assert.strictEqual(mechanics.getResidentDayTime(50), 'morning');
assert.strictEqual(mechanics.getResidentDayTime(150), 'afternoon');
assert.strictEqual(mechanics.getResidentDayTime(250), 'evening');

const morningCandidate = mechanics.getResidentSpawnCandidate(nState, 'morning');
assert(morningCandidate !== null, 'Must be able to sample a morning resident candidate');

// 5. Pure Mechanics Verification: Faz 2 - Freshness & Transformation
assert.strictEqual(mechanics.getItemFreshness('BREAD', 100).state, 'FRESH');
assert.strictEqual(mechanics.getItemFreshness('BREAD', 500).state, 'NORMAL');
assert.strictEqual(mechanics.getItemFreshness('BREAD', 800).state, 'STALE');
assert.strictEqual(mechanics.getItemFreshness('BREAD', 800).canTransform, true);
assert.strictEqual(mechanics.getItemFreshness('BREAD', 800).transformsInto, 'TOAST');

assert.strictEqual(mechanics.getFreshnessPriceMultiplier('FRESH'), 1.2);
assert.strictEqual(mechanics.getFreshnessPriceMultiplier('NORMAL'), 1.0);
assert.strictEqual(mechanics.getFreshnessPriceMultiplier('STALE'), 0.6);

// 6. Pure Mechanics Verification: Faz 3 - Player Brand
let bState = mechanics.createBrandState();
bState = mechanics.createOrUpdateBrand(bState, 'BREAD', {
  name: 'Altın Ekmek',
  color: '#ff793f',
  quality: 'artisan'
});
assert.strictEqual(bState.brands.BREAD.name, 'Altın Ekmek');
assert.strictEqual(bState.brands.BREAD.quality, 'artisan');
assert.strictEqual(mechanics.getBrandPriceBonus(bState, 'BREAD'), 1.15);

bState = mechanics.recordBrandSale(bState, 'BREAD', 10);
assert.strictEqual(bState.brands.BREAD.salesCount, 10);
assert.strictEqual(bState.brands.BREAD.reputation, 2, 'Brand reputation should be 2 after 10 sales');
assert.strictEqual(mechanics.getBrandPriceBonus(bState, 'BREAD'), 1.20, 'Reputation 2 should give 1.20 price bonus');

// 7. Pure Mechanics Verification: Faz 4 - Day Choices
const choices = mechanics.generateDayChoices(1, 3);
assert.strictEqual(choices.length, 3, 'Must generate 3 day choices');
const appliedChoice = mechanics.applyDayChoice(choices[0]);
assert(appliedChoice.appliedAt > 0, 'Choice must record appliedAt timestamp');

// 8. Pure Mechanics Verification: Faz 5 - Neighborhood Buildings
let nbState = mechanics.createNeighborhoodBuildingState();
assert.strictEqual(mechanics.canBuildNeighborhood(nbState, 'bus_stop', 200, 1), false, 'Cannot build bus stop at level 1');
assert.strictEqual(mechanics.canBuildNeighborhood(nbState, 'bus_stop', 300, 2), false, 'Cannot build bus stop with only $300');
assert.strictEqual(mechanics.canBuildNeighborhood(nbState, 'bus_stop', 500, 2), true, 'Can build bus stop with $500 at level 2');

nbState = mechanics.purchaseNeighborhoodBuilding(nbState, 'bus_stop');
assert(nbState.built.includes('bus_stop'), 'bus_stop should be built');

const effects = mechanics.getActiveNeighborhoodEffects(nbState);
assert.strictEqual(effects.extraCustomers, 2, 'Bus stop should grant +2 extraCustomers');
// 9. Brand Color Fallback & Tier Upgrade Rules (Exploit Prevention)
bState = mechanics.createOrUpdateBrand(bState, 'JUICE', {
  name: 'Doğa Meyve',
  color: '#0984e3',
  quality: 'economy'
});
assert.strictEqual(bState.brands.JUICE.colorHex, '#0984e3', 'color property must map to colorHex');
assert.strictEqual(bState.brands.JUICE.quality, 'economy');

// Cannot jump to premium without sales and coins
const failCheck1 = mechanics.canUpgradeBrandTier('economy', 'premium', 2, 100);
assert.strictEqual(failCheck1.canUpgrade, false, 'Cannot upgrade to premium with only 2 sales');

const failCheck2 = mechanics.canUpgradeBrandTier('economy', 'premium', 20, 200);
assert.strictEqual(failCheck2.canUpgrade, false, 'Cannot upgrade to premium with only 200 coins');

const passCheck = mechanics.canUpgradeBrandTier('economy', 'premium', 20, 600);
assert.strictEqual(passCheck.canUpgrade, true, 'Can upgrade to premium with 20 sales and 600 coins');
assert.strictEqual(passCheck.cost, 500, 'Premium upgrade cost must be 500 coins');

// 10. Verify Input Key Isolation and Escape in js/game.js
const gameCode = fs.readFileSync(path.join(__dirname, '../js/game.js'), 'utf8');
assert(gameCode.includes("e.target.tagName === 'INPUT'"), 'game.js must guard keydown when typing in INPUT');
assert(gameCode.includes("e.code === 'Escape'"), 'game.js must handle Escape key for closing modals');

// 11. Verify Resource Cleanup in Character3D and CustomerAI
const entitiesCode = fs.readFileSync(path.join(__dirname, '../js/entities.js'), 'utf8');
assert(entitiesCode.includes('obj.geometry.dispose()'), 'Character3D.destroy must dispose geometry');
assert(entitiesCode.includes('obj.material.dispose()') || entitiesCode.includes('m.dispose()'), 'Character3D.destroy must dispose material');
assert(entitiesCode.includes('clearInterval(popInterval)'), 'addItem must guard popInterval against parent detachment');

console.log('Neighborhood Systems unit tests passed successfully.');
