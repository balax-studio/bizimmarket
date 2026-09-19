const assert = require('assert');
const mechanics = require('../js/mechanics.js');

const stack = [{ type: 'TOMATO' }, { type: 'CHEESE' }];
const removed = mechanics.removeItemByType(stack, 'TOMATO');
assert.strictEqual(removed.type, 'TOMATO');
assert.deepStrictEqual(stack, [{ type: 'CHEESE' }]);

assert.deepStrictEqual(
  mechanics.getAvailableItemPool({ tomato: true, bakery: true, cheese: false }),
  ['TOMATO', 'BREAD']
);

assert.strictEqual(mechanics.applyRushHourBonus(100, true), 150);
assert.strictEqual(mechanics.applyRushHourBonus(100, false), 100);

assert.strictEqual(
  mechanics.calculateCheckoutTotal({
    baseTotal: 100,
    comboMultiplier: 2,
    isRushHour: true
  }),
  300
);

assert.strictEqual(
  mechanics.calculateCheckoutTotal({
    baseTotal: 100,
    vipMultiplier: 2.5,
    vipTip: 150,
    comboMultiplier: 1,
    isRushHour: true
  }),
  600
);

const unlockState = mechanics.applyUnlockPayment({ money: 13, remainingCost: 30, maxChunk: 20 });
assert.deepStrictEqual(unlockState, {
  paid: 13,
  money: 0,
  remainingCost: 17,
  didUnlock: false
});

const finalUnlockState = mechanics.applyUnlockPayment({ money: 99, remainingCost: 17, maxChunk: 20 });
assert.deepStrictEqual(finalUnlockState, {
  paid: 17,
  money: 82,
  remainingCost: 0,
  didUnlock: true
});

assert.deepStrictEqual(
  mechanics.normalizeSaveData({
    money: 42,
    unlockedFeatures: { bakery: true },
    upgrades: { playerSpeed: 2 },
    unlockPadCosts: [0, 7],
    neighborhoodBuildings: { built: ['bus_stop'] },
    residentOrders: { orders: { ayse_BREAD: { residentId: 'ayse', itemType: 'BREAD', targetQty: 4, rewardMoney: 132, progress: 2 } } }
  }).state,
  {
    money: 42,
    unlockedFeatures: { bakery: true },
    upgrades: { playerSpeed: 2 },
    unlockPadCosts: [0, 7],
    meta: {},
    stats: {},
    quests: {},
    dayState: {},
    dailyDemand: null,
    specialization: {},
    pricing: {},
    retention: {},
    cosmetics: {},
    branches: {},
    storage: {},
    staffSettings: {},
    lastSavedAt: null,
    neighborhood: {},
    residentOrders: { orders: { ayse_BREAD: { residentId: 'ayse', itemType: 'BREAD', targetQty: 4, rewardMoney: 132, progress: 2 } } },
    brands: {},
    dayChoice: null,
    neighborhoodBuildings: { built: ['bus_stop'] }
  }
);

let progression = mechanics.createProgressionState();
assert.strictEqual(progression.tutorial.currentStep, 'harvest_tomato');
assert.strictEqual(progression.marketLevel, 1);

progression = mechanics.recordProgressEvent(progression, { type: 'harvest', itemType: 'TOMATO', amount: 1 });
assert.strictEqual(progression.tutorial.currentStep, 'stock_tomato');
assert.strictEqual(progression.tutorial.steps.harvest_tomato.completed, true);

progression = mechanics.recordProgressEvent(progression, { type: 'stock', itemType: 'TOMATO', amount: 1 });
assert.strictEqual(progression.tutorial.currentStep, 'first_sale');

progression = mechanics.recordProgressEvent(progression, { type: 'sale', itemType: 'TOMATO', amount: 10 });
assert.strictEqual(progression.quests.main.sell_tomatoes.progress, 10);
assert.strictEqual(progression.quests.main.sell_tomatoes.claimed, true);
assert.strictEqual(progression.xp, 40);
assert.strictEqual(progression.marketLevel, 2);

let dayState = mechanics.createDayState();
dayState = mechanics.advanceDayClock(dayState, 301);
assert.strictEqual(dayState.day, 2);
assert.strictEqual(dayState.elapsedSeconds, 1);
assert.deepStrictEqual(dayState.lastSummary, {
  day: 1,
  salesRevenue: 0,
  customersServed: 0,
  topItem: 'Yok',
  completedQuests: 0
});

dayState = mechanics.recordDayEvent(dayState, { type: 'sale', itemType: 'TOMATO', amount: 2, revenue: 30 });
dayState = mechanics.recordDayEvent(dayState, { type: 'sale', itemType: 'BREAD', amount: 1, revenue: 35 });
dayState = mechanics.advanceDayClock(dayState, 300);
assert.strictEqual(dayState.lastSummary.salesRevenue, 65);
assert.strictEqual(dayState.lastSummary.customersServed, 3);
assert.strictEqual(dayState.lastSummary.topItem, 'TOMATO');

const demand = mechanics.createDailyDemandEvent(3, ['TOMATO', 'BREAD', 'CHEESE']);
assert.deepStrictEqual(demand, {
  day: 3,
  itemType: 'CHEESE',
  label: 'Peynir Günü',
  demandMultiplier: 2,
  bulkOrder: { itemType: 'CHEESE', target: 6, reward: 162, progress: 0, claimed: false }
});

assert.deepStrictEqual(
  mechanics.applyDemandToShoppingPool(['TOMATO', 'BREAD', 'CHEESE'], demand).slice(0, 3),
  ['CHEESE', 'CHEESE', 'TOMATO']
);

let demandProgress = mechanics.recordDemandSale(demand, { itemType: 'CHEESE', amount: 6 });
assert.strictEqual(demandProgress.bulkOrder.claimed, true);
assert.strictEqual(demandProgress.rewardReady, 162);

let specialization = mechanics.createSpecializationState();
assert.strictEqual(specialization.active, 'general');

specialization = mechanics.setSpecialization(specialization, 'bakery');
assert.strictEqual(specialization.active, 'bakery');
assert.strictEqual(mechanics.getSpecializedPrice(100, 'BREAD', specialization), 115);
assert.strictEqual(mechanics.getSpecializedPrice(100, 'TOMATO', specialization), 100);

specialization = mechanics.setSpecialization(specialization, 'greengrocer');
assert.strictEqual(mechanics.getSpecializedPrice(100, 'CARROT', specialization), 115);

specialization = mechanics.setSpecialization(specialization, 'gourmet');
assert.strictEqual(mechanics.getSpecializedPrice(100, 'SALAD_BOWL', specialization), 115);

let pricing = mechanics.createPricingState();
assert.strictEqual(mechanics.getProductPricingMode(pricing, 'TOMATO'), 'standard');
pricing = mechanics.setProductPricingMode(pricing, 'TOMATO', 'economy');
pricing = mechanics.setProductPricingMode(pricing, 'BREAD', 'premium');
assert.strictEqual(mechanics.getPricedAmount(100, 'TOMATO', pricing), 90);
assert.strictEqual(mechanics.getProductPricingMultiplier(pricing, 'TOMATO'), 0.9);
assert.strictEqual(mechanics.getPricedAmount(100, 'BREAD', pricing), 125);
assert.strictEqual(mechanics.getPricedAmount(100, 'CHEESE', pricing), 100);
assert.strictEqual(mechanics.getProductPricingMode(mechanics.createPricingState(pricing), 'BREAD'), 'premium');
assert.strictEqual(mechanics.getProductPricingMode(mechanics.setProductPricingMode(pricing, 'BREAD', 'invalid'), 'BREAD'), 'premium');
assert.deepStrictEqual(mechanics.pickShoppingItems(['TOMATO', 'BREAD'], pricing, 2, () => 0), ['TOMATO', 'BREAD']);
assert.deepStrictEqual(mechanics.pickShoppingItems(['TOMATO', 'BREAD'], pricing, 1, () => 0.8), ['BREAD']);
assert.deepStrictEqual(mechanics.pickShoppingItems(['TOMATO', 'TOMATO', 'BREAD'], pricing, 2, () => 0), ['TOMATO', 'BREAD']);

let staff = mechanics.setStaffPriority(mechanics.createStaffSettings(), 2, 'stocking');
assert.strictEqual(mechanics.getStaffPriority(staff, 2), 'stocking');
assert.strictEqual(mechanics.getStaffJobBonus(staff, 2, 'COLLECT_FACTORY'), 35);
assert.strictEqual(mechanics.getStaffJobBonus(staff, 2, 'HARVEST'), 0);
assert.strictEqual(mechanics.getStaffPriority(mechanics.createStaffSettings(staff), 2), 'stocking');

let stockTargets = mechanics.setStockTarget(mechanics.createStockTargets(), 'TOMATO', 8);
assert.strictEqual(mechanics.getStockTarget(stockTargets, 'TOMATO', 16), 8);
assert.strictEqual(mechanics.getStockTarget(stockTargets, 'BREAD', 16), 16);
assert.strictEqual(mechanics.getStockTarget(mechanics.setStockTarget(stockTargets, 'TOMATO', 99), 'TOMATO', 16), 8);

// --- Tests for Faz 1: Mahalle Sakinleri ---
let nState = mechanics.createNeighborhoodState();
assert.strictEqual(mechanics.getResidentAffinity(nState, 'ayse'), 0);
let ayseProfile = mechanics.getResidentProfile(nState, 'ayse');
assert.strictEqual(ayseProfile.loyaltyLabel, 'YENİ KOMŞU');
assert.strictEqual(ayseProfile.basketMultiplier, 1);
assert.strictEqual(ayseProfile.visitsUntilNextAffinity, 3);
nState = mechanics.recordResidentVisit(nState, 'ayse', 1);
nState = mechanics.recordResidentVisit(nState, 'ayse', 1);
nState = mechanics.recordResidentVisit(nState, 'ayse', 1); // 3 visits -> 1 star
assert.strictEqual(mechanics.getResidentAffinity(nState, 'ayse'), 1);
ayseProfile = mechanics.getResidentProfile(nState, 'ayse', {
  veresiyeState: mechanics.issueVeresiye(mechanics.createVeresiyeState(), 'ayse', 45),
  dayTime: 'morning'
});
assert.strictEqual(ayseProfile.hasDebt, true);
assert.strictEqual(ayseProfile.debt, 45);
assert.strictEqual(ayseProfile.isRoutineNow, true);
assert.strictEqual(ayseProfile.preferenceSummary, 'BREAD, CHEESE');
const ayseStories = mechanics.getUnlockedStories('ayse', 1);
assert.strictEqual(ayseStories.length, 1);
let loyalState = mechanics.createNeighborhoodState();
for (let i = 0; i < 25; i++) loyalState = mechanics.recordResidentVisit(loyalState, 'ayse', 1);
const loyalProfile = mechanics.getResidentProfile(loyalState, 'ayse');
assert.strictEqual(loyalProfile.basketMultiplier, 2);
assert.strictEqual(loyalProfile.tipMultiplier, 1.15);
assert.strictEqual(mechanics.getResidentProfiles(loyalState).length, mechanics.NEIGHBORHOOD_RESIDENTS.length);
let orderState = mechanics.createNeighborhoodState();
for (let i = 0; i < 8; i++) orderState = mechanics.recordResidentVisit(orderState, 'ayse', 1);
const orderProfile = mechanics.getResidentProfile(orderState, 'ayse', { availableItems: ['TOMATO', 'BREAD'] });
assert.deepStrictEqual(orderProfile.specialOrder, {
  residentId: 'ayse',
  itemType: 'BREAD',
  targetQty: 4,
  rewardMoney: 132,
  label: 'Ayşe Teyze özel siparişi: 4x BREAD'
});
const orderProgress = mechanics.recordResidentSpecialOrderSale(orderProfile.specialOrder, { itemType: 'BREAD', amount: 4 });
assert.strictEqual(orderProgress.claimed, true);
assert.strictEqual(orderProgress.rewardReady, 132);
let orderBook = mechanics.createResidentOrderState();
orderBook = mechanics.updateResidentOrderState(orderBook, orderProfile.specialOrder, { itemType: 'BREAD', amount: 2 });
assert.strictEqual(orderBook.orders.ayse_BREAD.progress, 2);
assert.strictEqual(orderBook.rewards.length, 0);
orderBook = mechanics.updateResidentOrderState(orderBook, orderProfile.specialOrder, { itemType: 'BREAD', amount: 2 });
assert.strictEqual(orderBook.orders.ayse_BREAD.claimed, true);
assert.deepStrictEqual(orderBook.rewards, [{ residentId: 'ayse', itemType: 'BREAD', amount: 132 }]);
orderBook = mechanics.updateResidentOrderState(orderBook, orderProfile.specialOrder, { itemType: 'BREAD', amount: 2 });
assert.strictEqual(orderBook.rewards.length, 1);
assert.strictEqual(mechanics.getResidentDayTime(50, 300), 'morning');
assert.strictEqual(mechanics.getResidentDayTime(150, 300), 'afternoon');
assert.strictEqual(mechanics.getResidentDayTime(250, 300), 'evening');
const residentCandidate = mechanics.getResidentSpawnCandidate(nState, 'morning', ['BREAD', 'CHEESE']);
assert.ok(residentCandidate && (residentCandidate.id === 'ayse' || residentCandidate.id === 'mehmet'));

// --- Tests for Faz 2: Tazelik ve Değerlendirme ---
const freshTomato = mechanics.getItemFreshness('TOMATO', 100);
assert.strictEqual(freshTomato.state, 'FRESH');
assert.strictEqual(mechanics.getFreshnessPriceMultiplier(freshTomato.state), 1.2);

const normalTomato = mechanics.getItemFreshness('TOMATO', 700);
assert.strictEqual(normalTomato.state, 'NORMAL');
assert.strictEqual(mechanics.getFreshnessPriceMultiplier(normalTomato.state), 1.0);

const staleTomato = mechanics.getItemFreshness('TOMATO', 1000);
assert.strictEqual(staleTomato.state, 'STALE');
assert.strictEqual(staleTomato.canTransform, true);
assert.strictEqual(staleTomato.transformsInto, 'SALAD_BOWL');
assert.strictEqual(mechanics.getFreshnessPriceMultiplier(staleTomato.state), 0.6);
const freshItem = mechanics.createFreshItem('BREAD', 1000);
assert.deepStrictEqual(freshItem, { type: 'BREAD', createdAt: 1000 });
assert.strictEqual(mechanics.getItemType(freshItem), 'BREAD');
assert.strictEqual(mechanics.getItemAgeSeconds(freshItem, 1120), 120);
assert.strictEqual(mechanics.getItemFreshnessState(freshItem, 1120).state, 'FRESH');
assert.strictEqual(mechanics.getFreshItemPricedAmount(100, freshItem, 1120), 120);
assert.strictEqual(mechanics.getFreshItemPricedAmount(100, freshItem, 2000), 60);

// --- Tests for Faz 3: Kendi Markanı Yaratma ---
let brandState = mechanics.createBrandState();
brandState = mechanics.createOrUpdateBrand(brandState, 'BREAD', { name: 'Mis Ekmek', colorHex: '#FFA502', quality: 'artisan' });
assert.strictEqual(brandState.brands.BREAD.name, 'Mis Ekmek');
assert.strictEqual(brandState.brands.BREAD.quality, 'artisan');
assert.strictEqual(mechanics.getBrandPriceBonus(brandState, 'BREAD'), 1.15);
brandState = mechanics.recordBrandSale(brandState, 'BREAD', 35);
assert.strictEqual(brandState.brands.BREAD.reputation, 4);
assert.strictEqual(mechanics.getBrandPriceBonus(brandState, 'BREAD'), 1.30); // 1.15 + (4-1)*0.05
let premiumBrandState = mechanics.createOrUpdateBrand(brandState, 'PIZZA', { name: 'Usta Pizza', colorHex: '#FF5252', quality: 'premium' });
premiumBrandState = mechanics.recordBrandSale(premiumBrandState, 'PIZZA', 50);
const brandSummary = mechanics.getBrandPrestigeSummary(premiumBrandState);
assert.strictEqual(brandSummary.activeBrands, 2);
assert.strictEqual(brandSummary.averageReputation, 4.5);
assert.strictEqual(brandSummary.premiumBrands, 1);
assert.strictEqual(brandSummary.prestigeBonus, 9);
const brandedPrestige = mechanics.calculateStorePrestige({ activeFloor: 'mosaic' }, 95, premiumBrandState);
assert.strictEqual(brandedPrestige.brandReputationAverage, 4.5);
assert.ok(brandedPrestige.score > mechanics.calculateStorePrestige({ activeFloor: 'mosaic' }, 95).score);
const brandLevelInfo = mechanics.getBrandLevelUpInfo(brandState, mechanics.recordBrandSale(brandState, 'BREAD', 15), 'BREAD');
assert.deepStrictEqual(brandLevelInfo, {
  didLevelUp: true,
  previousReputation: 4,
  nextReputation: 5,
  brandName: 'Mis Ekmek'
});
assert.strictEqual(mechanics.getBrandLevelUpInfo(brandState, brandState, 'BREAD').didLevelUp, false);

// --- Tests for Faz 4: Gün Başında Ticari Seçim ---
const dayChoices = mechanics.generateDayChoices(1, ['TOMATO', 'BREAD']);
assert.strictEqual(dayChoices.length, 3);
assert.strictEqual(dayChoices[0].name, dayChoices[0].label);
assert.ok(dayChoices[0].theme, 'Day choices must expose theme for UI cards');
assert.ok(dayChoices[0].priceMultipliers, 'Day choices must expose priceMultipliers for sale pricing');
assert.strictEqual(mechanics.generateDayChoices(1, 2).length, 2, 'Numeric second arg should control choice count');
const choiceApplied = mechanics.applyDayChoice(dayChoices[0].id);
assert.strictEqual(choiceApplied.eventId, dayChoices[0].id);
assert.strictEqual(choiceApplied.name, dayChoices[0].label);
assert.ok(choiceApplied.multiplier > 1);
assert.ok(choiceApplied.boosted.length > 0);
assert.strictEqual(choiceApplied.priceMultipliers[choiceApplied.boosted[0]], choiceApplied.multiplier);
assert.deepStrictEqual(
  mechanics.applyDayChoiceToShoppingPool(['TOMATO', 'BREAD', 'CHEESE'], choiceApplied).slice(0, 3),
  ['BREAD', 'BREAD', 'TOMATO']
);
const dayChoiceEffects = mechanics.getDayChoiceEffects(choiceApplied);
assert.strictEqual(dayChoiceEffects.customerSpawnRateBoost, 0.15);
assert.strictEqual(dayChoiceEffects.specialCustomer, choiceApplied.specialCustomer);

// --- Tests for Faz 5: Görünür Mahalle Gelişimi ---
let buildState = mechanics.createNeighborhoodBuildingState();
assert.strictEqual(mechanics.canBuildNeighborhood(buildState, 'bus_stop', 400, 2), false); // not enough money
assert.strictEqual(mechanics.canBuildNeighborhood(buildState, 'bus_stop', 500, 1), false); // not enough level
assert.strictEqual(mechanics.canBuildNeighborhood(buildState, 'bus_stop', 500, 2), true);
buildState = mechanics.purchaseNeighborhoodBuilding(buildState, 'bus_stop');
assert.strictEqual(mechanics.canBuildNeighborhood(buildState, 'bus_stop', 1000, 3), false); // already built
const effects = mechanics.getActiveNeighborhoodEffects(buildState);
assert.strictEqual(effects.morningRush, true);
assert.strictEqual(effects.morningRushHour, true);
assert.strictEqual(effects.extraCustomers, 2);
assert.strictEqual(effects.extraCustomerCapacity, 2);
assert.ok(effects.customerSpawnRateBoost > 0);
const buildProgress = mechanics.getNeighborhoodBuildingProgress(buildState, 1200, 3);
assert.strictEqual(buildProgress.builtCount, 1);
assert.strictEqual(buildProgress.totalCount, mechanics.NEIGHBORHOOD_BUILDINGS.length);
assert.strictEqual(buildProgress.completionPercent, 20);
assert.strictEqual(buildProgress.nextAvailable.id, 'park');
assert.strictEqual(buildProgress.lockedCount, 1);
assert.ok(buildProgress.activeEffectLabels.includes('+2 müşteri kapasitesi'));

console.log('mechanics tests passed');
