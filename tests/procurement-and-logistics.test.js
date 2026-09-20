const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mechanics = require(path.join(root, 'js', 'mechanics.js'));

console.log('Running Procurement and Logistics unit tests...');

// 1. FMCG Wholesale Catalog Integrity
const catalog = mechanics.WHOLESALE_CATALOG;
assert(catalog, 'WHOLESALE_CATALOG must be defined');

// Beverages
assert(catalog.WATER_PACK, 'WATER_PACK must be in catalog');
assert.strictEqual(catalog.WATER_PACK.category, 'BEVERAGES');
assert.strictEqual(catalog.WATER_PACK.count, 6);
assert.strictEqual(catalog.WATER_PACK.cost, 4);

assert(catalog.PREMIUM_WATER, 'PREMIUM_WATER must be in catalog');
assert.strictEqual(catalog.PREMIUM_WATER.cost, 12);

assert(catalog.SODA_CAN, 'SODA_CAN must be in catalog');
assert.strictEqual(catalog.SODA_CAN.category, 'BEVERAGES');
assert.strictEqual(catalog.SODA_CAN.count, 24);
assert.strictEqual(catalog.SODA_CAN.cost, 18);

assert(catalog.MINERAL_WATER, 'MINERAL_WATER must be in catalog');
assert.strictEqual(catalog.MINERAL_WATER.count, 12);
assert.strictEqual(catalog.MINERAL_WATER.cost, 8);

// Cleaning & Chemicals
assert(catalog.LIQUID_DETERGENT, 'LIQUID_DETERGENT must be in catalog');
assert.strictEqual(catalog.LIQUID_DETERGENT.category, 'CLEANING');
assert.strictEqual(catalog.LIQUID_DETERGENT.count, 4);
assert.strictEqual(catalog.LIQUID_DETERGENT.cost, 24);

assert(catalog.SURFACE_CLEANER, 'SURFACE_CLEANER must be in catalog');
assert.strictEqual(catalog.SURFACE_CLEANER.category, 'CLEANING');
assert.strictEqual(catalog.SURFACE_CLEANER.count, 8);
assert.strictEqual(catalog.SURFACE_CLEANER.cost, 16);

assert(catalog.DISH_SOAP, 'DISH_SOAP must be in catalog');
assert.strictEqual(catalog.DISH_SOAP.count, 6);
assert.strictEqual(catalog.DISH_SOAP.cost, 20);

// Personal Care
assert(catalog.SHAMPOO, 'SHAMPOO must be in catalog');
assert.strictEqual(catalog.SHAMPOO.category, 'PERSONAL_CARE');
assert.strictEqual(catalog.SHAMPOO.count, 12);
assert.strictEqual(catalog.SHAMPOO.cost, 30);

assert(catalog.BAR_SOAP, 'BAR_SOAP must be in catalog');
assert.strictEqual(catalog.BAR_SOAP.count, 24);
assert.strictEqual(catalog.BAR_SOAP.cost, 12);

// 2. Bulk & Volume Discounts
assert.strictEqual(mechanics.calculateBulkDiscount(1), 0.0);
assert.strictEqual(mechanics.calculateBulkDiscount(4), 0.0);
assert.strictEqual(mechanics.calculateBulkDiscount(5), 0.10);
assert.strictEqual(mechanics.calculateBulkDiscount(9), 0.10);
assert.strictEqual(mechanics.calculateBulkDiscount(10), 0.20);
assert.strictEqual(mechanics.calculateBulkDiscount(25), 0.20);

// 3. Margin Calculation: ((retail - cost) / retail) * 100
const margin50 = mechanics.calculateMargin(2.0, 4.0);
assert.strictEqual(Math.round(margin50), 50);

const marginZero = mechanics.calculateMargin(5.0, 5.0);
assert.strictEqual(marginZero, 0);

const marginInvalid = mechanics.calculateMargin(5.0, 0);
assert.strictEqual(marginInvalid, 0);

// 4. Price Elasticity Engine
// Bargain (< 90% MSRP)
const bargain = mechanics.applyPriceElasticity('SODA_CAN', 1.50, 1.75);
assert.strictEqual(bargain.appeal, 'BARGAIN');
assert.strictEqual(bargain.bubbleTag, '[FIRSAT ÜRÜNÜ]');
assert(bargain.prestigeBonus === true);

// Fair (91% - 115% MSRP)
const fair = mechanics.applyPriceElasticity('SODA_CAN', 1.75, 1.75);
assert.strictEqual(fair.appeal, 'FAIR');
assert.strictEqual(fair.dropoutChance, 0);

// Expensive (116% - 130% MSRP, > 20% over MSRP)
const expensive = mechanics.applyPriceElasticity('SODA_CAN', 2.20, 1.75);
assert.strictEqual(expensive.appeal, 'EXPENSIVE');
assert.strictEqual(expensive.dropoutChance, 0.35);
assert.strictEqual(expensive.bubbleTag, '[PAHALI!]');

// Gouging (> 130% MSRP, > 40% over MSRP)
const gouge = mechanics.applyPriceElasticity('SODA_CAN', 2.60, 1.75);
assert.strictEqual(gouge.appeal, 'GOUGE');
assert(gouge.dropoutChance >= 0.50);
assert.strictEqual(gouge.theftRiskIncrease, 0.50);

// 5. Market Trends / Shocks
const trendDay1 = mechanics.getDailyMarketTrend(1);
assert(trendDay1 && trendDay1.id, 'Market trend must return an object with id');
assert(typeof trendDay1.title === 'string', 'Market trend must have title');
assert(typeof trendDay1.description === 'string', 'Market trend must have description');

// 6. 3D Fixtures & Entity Classes in entities.js
const entitiesCode = fs.readFileSync(path.join(root, 'js', 'entities.js'), 'utf8');
assert(entitiesCode.includes('WATER_PACK:'), 'ITEM_TYPES must contain WATER_PACK');
assert(entitiesCode.includes('LIQUID_DETERGENT:'), 'ITEM_TYPES must contain LIQUID_DETERGENT');

assert(entitiesCode.includes('class BeverageChillerShelf'), 'BeverageChillerShelf class must be defined');
assert(entitiesCode.includes('class CleaningShelfUnit'), 'CleaningShelfUnit class must be defined');
assert(entitiesCode.includes('class WholesaleTruck'), 'WholesaleTruck class must be defined');
assert(entitiesCode.includes('class WholesaleTruck3D') || entitiesCode.includes('WholesaleTruck3D = WholesaleTruck'), 'WholesaleTruck3D must be defined');

// 7. Audio Reversing Beep in audio.js
const audioCode = fs.readFileSync(path.join(root, 'js', 'audio.js'), 'utf8');
assert(audioCode.includes('playReverseBeep()'), 'SoundEngine must implement playReverseBeep');

// 8. Terminal UI Elements in index.html & style.css
const htmlCode = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(htmlCode.includes('id="office-terminal-prompt"'), 'HTML must contain office terminal HUD prompt');
assert(htmlCode.includes('id="procurement-modal"'), 'HTML must contain procurement terminal modal');
assert(htmlCode.includes('data-proc-tab="orders"'), 'HTML must contain orders tab');
assert(htmlCode.includes('data-proc-tab="pricing"'), 'HTML must contain pricing tab');
assert(htmlCode.includes('data-proc-tab="trends"'), 'HTML must contain trends tab');
assert(htmlCode.includes('data-proc-tab="inventory"'), 'HTML must contain inventory tab');

const cssCode = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
assert(cssCode.includes('.crt-monitor-bezel'), 'CSS must style CRT bezel');
assert(cssCode.includes('.crt-scanlines'), 'CSS must style CRT scanlines');
assert(cssCode.includes('.crt-table'), 'CSS must style CRT table');

// 9. Game Logic Integration in game.js
const gameCode = fs.readFileSync(path.join(root, 'js', 'game.js'), 'utf8');
assert(gameCode.includes('initProcurementUI()'), 'MiniMartGame must implement initProcurementUI');
assert(gameCode.includes('openProcurementTerminal()'), 'MiniMartGame must implement openProcurementTerminal');
assert(gameCode.includes('closeProcurementTerminal()'), 'MiniMartGame must implement closeProcurementTerminal');
assert(gameCode.includes('renderProcurementOrdersTab()'), 'MiniMartGame must implement renderProcurementOrdersTab');
assert(gameCode.includes('renderProcurementPricingTab()'), 'MiniMartGame must implement renderProcurementPricingTab');
assert(gameCode.includes('renderProcurementTrendsTab()'), 'MiniMartGame must implement renderProcurementTrendsTab');
assert(gameCode.includes('renderProcurementInventoryTab()'), 'MiniMartGame must implement renderProcurementInventoryTab');
assert(gameCode.includes('submitWholesaleOrder('), 'MiniMartGame must implement submitWholesaleOrder');
assert(gameCode.includes('spawnWholesaleDeliveryTruck('), 'MiniMartGame must implement spawnWholesaleDeliveryTruck');
assert(gameCode.includes('this.beverageChiller = new BeverageChillerShelf'), 'BeverageChillerShelf must be instantiated');
assert(gameCode.includes('this.cleaningShelf = new CleaningShelfUnit'), 'CleaningShelfUnit must be instantiated');

// 11. Camera Angle Switch & Restoration Integrity
assert(htmlCode.includes('id="camera-btn"'), 'HTML must contain camera angle switch button');
assert(gameCode.includes('toggleCameraAngle()'), 'MiniMartGame must implement toggleCameraAngle');
assert(gameCode.includes('targetY = 24.0'), 'updateCamera must restore isometric height targetY 24.0');
assert(gameCode.includes('this.cameraMode'), 'MiniMartGame must track cameraMode');
assert(gameCode.includes('this.cameraPresets = ['), 'MiniMartGame must define camera angle presets');
assert(gameCode.includes('offsetX'), 'Camera presets must support horizontal angle changes');
assert(gameCode.includes('% this.cameraPresets.length'), 'Camera toggle must cycle through every configured preset');

console.log('Procurement and logistics tests passed successfully!');
