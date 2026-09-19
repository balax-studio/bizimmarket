const assert = require('assert');
const mechanics = require('../js/mechanics.js');

console.log('Running branches and prestige tests...');

// 1. Test 4-Pillar Prestige Calculation
const decState = { activeFloor: 'wood', unlockedFloors: ['classic', 'wood'] };
const hygiene = 95;
const brandState = mechanics.createBrandState();
mechanics.createOrUpdateBrand(brandState, 'TOMATO', { name: 'Eko Domates', quality: 'premium' });
mechanics.recordBrandSale(brandState, 'TOMATO', 50);

const neighborhoodState = mechanics.createNeighborhoodState();
mechanics.recordResidentVisit(neighborhoodState, 'nigar');
mechanics.recordResidentVisit(neighborhoodState, 'nigar');
mechanics.recordResidentVisit(neighborhoodState, 'muhtar');

const prestige = mechanics.calculateStorePrestige(decState, hygiene, brandState, neighborhoodState);

assert(prestige.score >= 50, `Prestige score (${prestige.score}) should reflect all 4 pillars`);
assert(prestige.stars >= 3, `Prestige stars (${prestige.stars}) should be at least 3`);
assert(prestige.breakdown, 'Prestige must contain breakdown object');
assert(prestige.breakdown.decoration > 0, 'Decoration points included');
assert(prestige.breakdown.hygiene > 0, 'Hygiene points included');
assert(prestige.breakdown.brand > 0, 'Brand points included');
assert(prestige.breakdown.affinity > 0, 'Affinity points included');
assert.strictEqual(prestige.isVIPEligible, true, 'VIP eligible at 3+ stars');

// 2. Test Prestige Perks & VIP Basket Config
const perksP3 = mechanics.getPrestigePerks(3);
assert.strictEqual(perksP3.stars, 3);
assert.strictEqual(perksP3.isVIPEligible, true);
assert(perksP3.basketMultiplier >= 1.1);

const perksP5 = mechanics.getPrestigePerks(5);
assert.strictEqual(perksP5.stars, 5);
assert(perksP5.basketMultiplier >= 1.3);

const vipBasket = mechanics.getVipBasketConfig(4);
assert.strictEqual(vipBasket.maxItems, 4);
assert(vipBasket.tipBonusMultiplier > 1.2);

// 3. Test End-of-Day Summary with Prestige Diagnostics
const dayState = {
  day: 3,
  stats: {
    salesRevenue: 600,
    customersServed: 14,
    completedQuests: 1,
    itemSales: { TOMATO: 10, BREAD: 4 }
  }
};
const context = {
  decorationState: decState,
  hygieneScore: hygiene,
  brandState: brandState,
  neighborhoodState: neighborhoodState,
  previousPrestigeScore: 50
};

const summary = mechanics.summarizeDayWithPrestige(dayState, context);
assert.strictEqual(summary.day, 3);
assert.strictEqual(summary.salesRevenue, 600);
assert(summary.prestigeReport !== undefined, 'Summary must include prestigeReport');
assert(Array.isArray(summary.prestigeReport.drivers), 'Prestige drivers must be an array');
assert(summary.prestigeReport.drivers.length > 0, 'Must provide explanation drivers for prestige');
assert(typeof summary.prestigeReport.advice === 'string', 'Prestige advice must be a string');

// 4. Test Satellite Branch System (2. Şube - Çarşı Şubesi)
let branchState = mechanics.createBranchState();
assert.strictEqual(branchState.branches.branch_1.unlocked, true, 'Merkez Şube must be unlocked by default');
assert.strictEqual(branchState.branches.branch_2.unlocked, false, 'Çarşı Şubesi locked initially');

// Test unlock prerequisites check
const lockedCheck = mechanics.canUnlockBranch(branchState, 'branch_2', 1000, 2, 2);
assert.strictEqual(lockedCheck.allowed, false, 'Should deny unlock without enough money/prestige');
assert(lockedCheck.reason.length > 0, 'Reason provided');

const eligibleCheck = mechanics.canUnlockBranch(branchState, 'branch_2', 4000, 3, 4);
assert.strictEqual(eligibleCheck.allowed, true, 'Should allow unlock when conditions met');

// Unlock branch
branchState = mechanics.unlockBranch(branchState, 'branch_2', 3500);
assert.strictEqual(branchState.branches.branch_2.unlocked, true, 'Branch 2 should be unlocked');

// Transfer stock
branchState = mechanics.transferStockToBranch(branchState, 'branch_2', 'TOMATO', 20);
branchState = mechanics.transferStockToBranch(branchState, 'branch_2', 'BREAD', 10);
assert.strictEqual(branchState.branches.branch_2.stock.TOMATO, 20);
assert.strictEqual(branchState.branches.branch_2.stock.BREAD, 10);

// Assign staff
branchState = mechanics.assignBranchStaff(branchState, 'branch_2', 'manager', true);
assert.strictEqual(branchState.branches.branch_2.staff.manager, true);

// Simulate operations with neighborhood effects
const neighborhoodEffects = {
  boostedItems: ['TOMATO', 'BREAD'],
  extraCustomerCapacity: 2,
  customerSpawnRateBoost: 0.15
};

const simResult = mechanics.simulateBranchDailyOperations(branchState, neighborhoodEffects, null);
assert(simResult.state.branches.branch_2.dailyRevenue > 0, 'Branch must generate revenue');
assert(simResult.state.branches.branch_2.uncollectedRevenue > 0, 'Uncollected revenue must be positive');
assert(simResult.state.branches.branch_2.stock.TOMATO < 20, 'Stock must decrease as items sell');

// Collect revenue
const collectRes = mechanics.collectBranchRevenue(simResult.state, 'branch_2');
assert.strictEqual(collectRes.collectedAmount, simResult.state.branches.branch_2.uncollectedRevenue);
assert.strictEqual(collectRes.state.branches.branch_2.uncollectedRevenue, 0);

// Normalize save data test with branch state
const normalized = mechanics.normalizeSaveData({ branches: branchState.branches });
assert.strictEqual(normalized.state.branches.branch_2.unlocked, true);

console.log('branches and prestige tests passed successfully.');
