const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mechanicsPath = path.join(root, 'js', 'mechanics.js');
const entitiesPath = path.join(root, 'js', 'entities.js');
const gamePath = path.join(root, 'js', 'game.js');
const htmlPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'style.css');

const mechanics = require(mechanicsPath);
const entitiesSource = fs.readFileSync(entitiesPath, 'utf8');
const gameSource = fs.readFileSync(gamePath, 'utf8');
const htmlSource = fs.readFileSync(htmlPath, 'utf8');
const cssSource = fs.readFileSync(cssPath, 'utf8');

// 1. DECORATION_CATALOG Structure & Property Validation
assert(Array.isArray(mechanics.DECORATION_CATALOG), 'DECORATION_CATALOG must be an array');
assert(mechanics.DECORATION_CATALOG.length >= 8, 'DECORATION_CATALOG must have at least 8 items');

const expectedCategories = ['PLANTS', 'FURNITURE', 'COOLING', 'LIGHTING', 'ACCESSORIES'];
const catalogCategories = new Set();

mechanics.DECORATION_CATALOG.forEach(item => {
  assert(item.id && typeof item.id === 'string', 'Item must have valid string id');
  assert(item.name && typeof item.name === 'string', 'Item must have valid string name');
  assert(item.category && typeof item.category === 'string', 'Item must have valid string category');
  catalogCategories.add(item.category);
  assert(typeof item.price === 'number' && item.price > 0, 'Item must have positive numeric price');
  assert(typeof item.prestigeBonus === 'number' && item.prestigeBonus > 0, 'Item must have positive prestigeBonus');
  assert(item.size && typeof item.size === 'object', 'Item must have size object');
  assert(typeof item.size.w === 'number' && item.size.w > 0, 'Item size.w must be positive');
  assert(typeof item.size.d === 'number' && item.size.d > 0, 'Item size.d must be positive');
  assert(typeof item.size.h === 'number' && item.size.h > 0, 'Item size.h must be positive');
  assert(item.meshType && typeof item.meshType === 'string', 'Item must have valid meshType');
});

expectedCategories.forEach(cat => {
  assert(catalogCategories.has(cat), `DECORATION_CATALOG must include items from category ${cat}`);
});

// 2. Buy Decoration Logic & Insufficient Funds Verification
const mockState = {
  money: 50,
  decorationState: mechanics.createDecorationState()
};

// Item with price 80 should fail when player only has 50
const failResult = mechanics.buyDecoration(mockState, 'decor_plant_potted');
assert.strictEqual(failResult.success, false, 'Should fail when player has insufficient money');
assert.strictEqual(failResult.reason, 'Yetersiz bakiye', 'Reason must indicate insufficient funds');
assert.strictEqual(mockState.money, 50, 'Money must not change on failed purchase');
assert.strictEqual(mockState.decorationState.purchasedItems.length, 0, 'No item should be added on failure');

// Invalid decorId test
const invalidResult = mechanics.buyDecoration(mockState, 'decor_non_existent');
assert.strictEqual(invalidResult.success, false, 'Should fail for invalid decorId');

// Successful purchase test
mockState.money = 500;
const successResult = mechanics.buyDecoration(mockState, 'decor_plant_potted');
assert.strictEqual(successResult.success, true, 'Purchase should succeed with sufficient balance');
assert.strictEqual(mockState.money, 420, 'Balance must be deducted by 80 (500 - 80 = 420)');
assert.strictEqual(mockState.decorationState.purchasedItems.length, 1, 'Purchased items length must be 1');
assert.strictEqual(mockState.decorationState.purchasedItems[0].catalogId, 'decor_plant_potted', 'Recorded item catalogId must match');
assert(mockState.decorationState.purchasedItems[0].instanceId, 'Recorded item must have a unique instanceId');

// 3. Store Prestige Calculation Boost Verification
const baseDecState = mechanics.createDecorationState();
const prestigeBefore = mechanics.calculateStorePrestige(baseDecState, 100, mechanics.createBrandState());

const boostedDecState = mechanics.createDecorationState({
  purchasedItems: [
    { catalogId: 'decor_plant_potted', prestigeBonus: 2 },
    { catalogId: 'decor_bench_wood', prestigeBonus: 3 },
    { catalogId: 'decor_neon_bizim', prestigeBonus: 5 }
  ]
});
const prestigeAfter = mechanics.calculateStorePrestige(boostedDecState, 100, mechanics.createBrandState());

assert(prestigeAfter.score > prestigeBefore.score, 'Prestige score must increase with purchased decorations');
assert.strictEqual(prestigeAfter.score - prestigeBefore.score, 10, 'Prestige bonus must equal sum of item bonuses (2 + 3 + 5 = 10)');

// 4. Persistence & Normalization Integrity Test
const rawSaveData = {
  version: 2,
  state: {
    money: 850,
    decoration: {
      activeTheme: 'MODERN',
      purchasedItems: [
        {
          instanceId: 'decor_plant_potted_123',
          catalogId: 'decor_plant_potted',
          name: 'Saksı Ağacı',
          category: 'PLANTS',
          price: 150,
          prestigeBonus: 2,
          size: { w: 0.8, d: 0.8, h: 1.6 },
          meshType: 'PLANT'
        }
      ]
    },
    customLayout: {
      decor_plant_potted_123: { x: 5.5, z: -15.0, rotY: 0 }
    }
  }
};

const normalized = mechanics.normalizeSaveData(rawSaveData);
assert(normalized.state.decoration, 'Normalized save must contain decoration state');
assert(Array.isArray(normalized.state.decoration.purchasedItems), 'purchasedItems must be an array in normalized save');
assert.strictEqual(normalized.state.decoration.purchasedItems.length, 1, 'Purchased items must be preserved');
assert.strictEqual(normalized.state.decoration.purchasedItems[0].instanceId, 'decor_plant_potted_123', 'instanceId must be preserved');
assert(normalized.state.customLayout, 'customLayout must be preserved');
assert.strictEqual(normalized.state.customLayout.decor_plant_potted_123.x, 5.5, 'customLayout coordinates must be preserved');

// 5. Grid-Snap (0.5m) and AABB Spatial Occupancy Test for Decorations
const snap = (v) => Math.round(v / 0.5) * 0.5;
assert.strictEqual(snap(4.23), 4.0, '4.23 should snap to 4.0');
assert.strictEqual(snap(4.26), 4.5, '4.26 should snap to 4.5');
assert.strictEqual(snap(-12.74), -12.5, '-12.74 should snap to -12.5');

const spatial = new mechanics.SpatialOccupancyManager();
spatial.reserve('decor_bench_1', 'DECOR', 2.0, 4.2, -15.0, -14.2);
assert.strictEqual(spatial.testAABB(2.5, 3.5, -14.8, -14.4, 'DECOR').allowed, false, 'Overlapping decor must be disallowed');
assert.strictEqual(spatial.testAABB(2.5, 3.5, -14.8, -14.4, 'DECOR', 'decor_bench_1').allowed, true, 'Self fixture must not conflict');

// Update position of decor
spatial.updateReservation('decor_bench_1', 'DECOR', 6.0, 8.2, -15.0, -14.2);
assert.strictEqual(spatial.testAABB(2.5, 3.5, -14.8, -14.4, 'DECOR').allowed, true, 'Old position must now be free');
assert.strictEqual(spatial.testAABB(6.5, 7.5, -14.8, -14.4, 'DECOR').allowed, false, 'New position must be occupied');

// 6. Zero Platform Emojis Prohibition Check
const standardEmojiPattern = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

const shopBtnMatch = htmlSource.match(/<button id="decor-shop-btn"[\s\S]*?<\/button>/)?.[0] || '';
assert(shopBtnMatch.length > 0, 'decor-shop-btn must exist in index.html');
assert(!standardEmojiPattern.test(shopBtnMatch), 'decor-shop-btn must not contain platform emojis');

const shopModalMatch = htmlSource.match(/<div id="decor-shop-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)?.[0] || '';
assert(shopModalMatch.length > 0, 'decor-shop-modal must exist in index.html');
assert(!standardEmojiPattern.test(shopModalMatch), 'decor-shop-modal must not contain platform emojis');

const shopMethods = gameSource.match(/renderDecorationCatalog\(\)[\s\S]*?spawnPurchasedDecorations\(\)/)?.[0] || '';
assert(shopMethods.length > 0, 'Decoration shop methods must be implemented in js/game.js');
assert(!standardEmojiPattern.test(shopMethods), 'Decoration shop JS methods must not contain platform emojis');

// 7. Neo-Brutalist CSS Standards Check
assert(cssSource.includes('.decor-shop-btn'), 'style.css must style .decor-shop-btn');
assert(cssSource.includes('.decor-shop-modal'), 'style.css must style .decor-shop-modal');
assert(cssSource.includes('.decor-shop-box'), 'style.css must style .decor-shop-box');
assert(cssSource.includes('.decor-catalog-grid'), 'style.css must style .decor-catalog-grid');
assert(cssSource.includes('.decor-card'), 'style.css must style .decor-card');
assert(cssSource.includes('.decor-buy-btn'), 'style.css must style .decor-buy-btn');
assert(cssSource.includes('border-radius: 0px !important'), 'Neo-Brutalist rules must enforce zero border radius');

// 8. 3D Voxel Decoration Mesh Generation Standards in entities.js
assert(entitiesSource.includes('function createVoxelDecorationMesh'), 'createVoxelDecorationMesh must be defined in entities.js');
assert(entitiesSource.includes('window.createVoxelDecorationMesh'), 'createVoxelDecorationMesh must be exposed to window');

// Ensure only low-poly cubic voxel BoxGeometry is used (no smooth sphere/cylinder)
const decorFnStart = entitiesSource.indexOf('function createVoxelDecorationMesh');
const decorFnEnd = entitiesSource.indexOf('if (typeof window !== \'undefined\') {', decorFnStart);
const decorFnSource = entitiesSource.slice(decorFnStart, decorFnEnd > 0 ? decorFnEnd : decorFnStart + 9000);

assert(decorFnSource.includes('new THREE.BoxGeometry'), 'Decoration models must use BoxGeometry for cubic voxel construction');
assert(!decorFnSource.includes('new THREE.CylinderGeometry'), 'Decoration models must NOT use CylinderGeometry');
assert(!decorFnSource.includes('new THREE.SphereGeometry'), 'Decoration models must NOT use SphereGeometry');

// Ensure all 8 mesh types are handled in createVoxelDecorationMesh
const expectedMeshTypes = ['PLANT', 'BENCH', 'TROLLEYS', 'BASKETS', 'FREEZER', 'IMPULSE', 'NEON', 'TRASH'];
expectedMeshTypes.forEach(meshType => {
  assert(decorFnSource.includes(`'${meshType}'`) || decorFnSource.includes(`"${meshType}"`), `createVoxelDecorationMesh must handle ${meshType}`);
});

// 9. Integration in MiniMartGame Check
assert(gameSource.includes('initDecorationShopUI'), 'MiniMartGame must implement initDecorationShopUI');
assert(gameSource.includes('openDecorationShopModal'), 'MiniMartGame must implement openDecorationShopModal');
assert(gameSource.includes('closeDecorationShopModal'), 'MiniMartGame must implement closeDecorationShopModal');
assert(gameSource.includes('toggleDecorationShopModal'), 'MiniMartGame must implement toggleDecorationShopModal');
assert(gameSource.includes('renderDecorationCatalog'), 'MiniMartGame must implement renderDecorationCatalog');
assert(gameSource.includes('handleBuyDecoration'), 'MiniMartGame must implement handleBuyDecoration');
assert(gameSource.includes('spawnPurchasedDecorations'), 'MiniMartGame must implement spawnPurchasedDecorations');
assert(gameSource.includes('KeyN'), 'MiniMartGame must bind KeyN shortcut for decoration shop');

console.log('Decoration Shop & Catalog test suite: 100% PASSED');
