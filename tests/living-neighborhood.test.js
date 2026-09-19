const assert = require('assert');
const fs = require('fs');
const path = require('path');

const mechanics = require('../js/mechanics.js');

// 1. Verify HTML Structure for Phase 1, 2, 3 Living Neighborhood Elements
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

assert(html.includes('id="wholesale-btn"'), 'Wholesale button must exist in index.html');
assert(html.includes('id="wholesale-modal"'), 'Wholesale modal must exist in index.html');
assert(html.includes('id="hygiene-badge"'), 'Hygiene badge must exist in index.html');
assert(html.includes('id="prestige-badge"'), 'Prestige badge must exist in index.html');
assert(html.includes('id="veresiye-prompt"'), 'Veresiye checkout prompt must exist in index.html');
assert(html.includes('data-tab="decoration"'), 'Decoration tab must exist in upgrade modal');
assert(html.includes('data-neighborhood-tab="veresiye"'), 'Veresiye tab must exist in neighborhood modal');

// 2. Strict Emoji Rule: No platform emojis in wholesale modal or veresiye prompt
const standardEmojiPattern = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const wholesaleModalSection = html.slice(html.indexOf('id="wholesale-modal"'), html.indexOf('<!-- Cashier Veresiye') || undefined);
assert(!standardEmojiPattern.test(wholesaleModalSection), 'Wholesale modal must not contain standard platform emojis');
const veresiyePromptSection = html.slice(html.indexOf('id="veresiye-prompt"'), html.indexOf('</body') || undefined);
assert(!standardEmojiPattern.test(veresiyePromptSection), 'Veresiye prompt must not contain standard platform emojis');

// 3. Verify CSS Classes for Living Neighborhood
const css = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf8');
assert(css.includes('.wholesale-modal'), 'CSS must define .wholesale-modal');
assert(css.includes('.wholesale-card'), 'CSS must define .wholesale-card');
assert(css.includes('.veresiye-prompt'), 'CSS must define .veresiye-prompt');
assert(css.includes('.veresiye-card'), 'CSS must define .veresiye-card');
assert(css.includes('.hygiene-badge'), 'CSS must define .hygiene-badge');
assert(css.includes('.prestige-badge'), 'CSS must define .prestige-badge');
assert(css.includes('.decoration-card'), 'CSS must define .decoration-card');
assert(css.includes('.staff-fatigue-container'), 'CSS must define .staff-fatigue-container');

// 4. Pure Mechanics Verification: Phase 1 - Veresiye Defteri
let vState = mechanics.createVeresiyeState();
assert.strictEqual(mechanics.getVeresiyeTotal(vState), 0, 'Initial veresiye debt should be 0');

vState = mechanics.issueVeresiye(vState, 'ayse', 45);
assert.strictEqual(mechanics.getVeresiyeTotal(vState), 45, 'Veresiye total should be 45 after issuing to ayse');
vState = mechanics.issueVeresiye(vState, 'kemal', 30);
assert.strictEqual(mechanics.getVeresiyeTotal(vState), 75, 'Veresiye total should accumulate across residents');

const collectResult = mechanics.collectVeresiye(vState, 'ayse');
assert.strictEqual(collectResult.paid, 45, 'Collected debt must match outstanding amount');
assert(collectResult.giftName, 'Settling veresiye debt must award a gift');
assert.strictEqual(mechanics.getVeresiyeTotal(collectResult.state), 30, 'Remaining open debt should be 30');
assert.strictEqual(collectResult.state.totalCollected, 45, 'Total collected should record 45');

// 5. Pure Mechanics Verification: Phase 1 - Dükkan Hijyeni & Paspas
assert.strictEqual(mechanics.calculateHygieneScore(0), 100, '0 trash items should yield 100% hygiene');
assert.strictEqual(mechanics.calculateHygieneScore(3), 70, '3 trash items should yield 70% hygiene');
assert.strictEqual(mechanics.calculateHygieneScore(6), 40, '6 trash items should yield 40% hygiene');

const cleanEffects = mechanics.getHygieneEffects(90);
assert.strictEqual(cleanEffects.tipBonus, 0.15, 'Hygiene >= 80% must give +15% tip bonus');
assert.strictEqual(cleanEffects.patienceMultiplier, 1.25, 'Hygiene >= 80% must give customer patience boost');

const dirtyEffects = mechanics.getHygieneEffects(30);
assert.strictEqual(dirtyEffects.tipBonus, 0, 'Low hygiene must not give tips');
assert.strictEqual(dirtyEffects.patienceMultiplier, 0.50, 'Hygiene < 40% must cut customer patience in half');

// 6. Pure Mechanics Verification: Phase 1 - Bekçi Köpeği & Güvenlik
let dogState = mechanics.createSecurityDogState();
assert.strictEqual(dogState.state, 'GUARDING', 'Initial dog state should be GUARDING');

dogState = mechanics.triggerSecurityAlarm(dogState);
assert.strictEqual(dogState.state, 'CHASING', 'Alarm trigger should switch dog state to CHASING');
assert.strictEqual(dogState.alarmTriggered, true, 'Alarm flag should be true');

// 7. Pure Mechanics Verification: Phase 2 - Toptancı Kamyonu & Koli
assert(mechanics.WHOLESALE_CATALOG.FLOUR, 'Wholesale catalog must include FLOUR');
assert(mechanics.WHOLESALE_CATALOG.MILK, 'Wholesale catalog must include MILK');
assert(mechanics.WHOLESALE_CATALOG.CHEESE, 'Wholesale catalog must include CHEESE');

let wState = mechanics.createWholesaleState();
assert.strictEqual(wState.totalCratesOrdered, 0, 'Initial crates ordered should be 0');

wState = mechanics.orderWholesaleCrate(wState, 'FLOUR', 72);
assert.strictEqual(wState.totalCratesOrdered, 1, 'Total crates ordered should be 1');
assert.strictEqual(wState.pendingDeliveries.length, 1, 'Pending deliveries should have 1 item');
assert.strictEqual(wState.pendingDeliveries[0].itemType, 'FLOUR');

// 8. Pure Mechanics Verification: Phase 2 - Personel Stamina & Çay Ocağı
let fatigueState = mechanics.createStaffFatigueState();
assert.strictEqual(fatigueState[1].stamina, 100, 'Initial stamina should be 100');

// Drain stamina by working 50 seconds
fatigueState = mechanics.drainStaffStamina(fatigueState, 1, 50);
assert(fatigueState[1].stamina < 100, 'Working must drain stamina');
assert.strictEqual(fatigueState[1].isTired, true, 'Stamina below 60% must set isTired flag');

// Drain to exhaustion
fatigueState = mechanics.drainStaffStamina(fatigueState, 1, 60);
assert.strictEqual(fatigueState[1].isExhausted, true, 'Stamina below 20% must set isExhausted flag');

// Refill stamina at tea station
fatigueState = mechanics.refillStaffStamina(fatigueState, 1, 50);
assert(fatigueState[1].stamina > 50, 'Tea break must refill stamina');
assert.strictEqual(fatigueState[1].isExhausted, false, 'Refilling stamina must clear isExhausted flag');

// 9. Pure Mechanics Verification: Phase 3 - Dekorasyon & Prestij
let decState = mechanics.createDecorationState();
assert.strictEqual(decState.activeFloor, 'classic');

const p1 = mechanics.calculateStorePrestige(decState, 100);
assert(p1.stars >= 1, 'Base store should have at least 1 star');
assert.strictEqual(p1.floorName, 'Klasik Karo', 'Prestige output must expose the active floor name for UI cards');
assert.strictEqual(p1.hygieneScore, 100, 'Prestige output must expose the hygiene score for UI cards');
assert.strictEqual(mechanics.DECORATION_TIERS.classic.colorHex, '#E0E0E0', 'Decoration tiers must expose colorHex for UI previews');

// Upgrade floor to marble and high hygiene
decState.activeFloor = 'marble';
const p5 = mechanics.calculateStorePrestige(decState, 95);
assert(p5.stars >= 4, 'Marble floor with high hygiene should yield high prestige');
assert.strictEqual(p5.isVIPEligible, true, 'High prestige must make store eligible for VIP customers');

// 10. Verify 3D Voxel Classes and VRAM Dispose Cleanup in entities.js
const busStopDef = mechanics.NEIGHBORHOOD_BUILDINGS.find(b => b.id === 'bus_stop');
assert.strictEqual(busStopDef.requiredLevel, busStopDef.unlockLevel, 'Neighborhood building UI must have requiredLevel alias');
assert(busStopDef.effectDesc, 'Neighborhood building UI must have effectDesc text');

const entitiesCode = fs.readFileSync(path.join(__dirname, '../js/entities.js'), 'utf8');
assert(entitiesCode.includes('class MopStation'), 'entities.js must define class MopStation');
assert(entitiesCode.includes('class TrashItem'), 'entities.js must define class TrashItem');
assert(entitiesCode.includes('class SecurityGate'), 'entities.js must define class SecurityGate');
assert(entitiesCode.includes('class KarabashDog'), 'entities.js must define class KarabashDog');
assert(entitiesCode.includes('class WholesaleBay'), 'entities.js must define class WholesaleBay');
assert(entitiesCode.includes('class VoxelCrate'), 'entities.js must define class VoxelCrate');
assert(entitiesCode.includes('class WholesaleTruck'), 'entities.js must define class WholesaleTruck');
assert(entitiesCode.includes('class TeaStation'), 'entities.js must define class TeaStation');
assert(entitiesCode.includes('class VoxelRadio'), 'entities.js must define class VoxelRadio');
assert(entitiesCode.includes('class VoxelNeonSign'), 'entities.js must define class VoxelNeonSign');

// Verify memory disposal in new classes
assert(entitiesCode.includes('child.geometry.dispose()'), 'Voxel entities destroy must dispose geometries');
assert(entitiesCode.includes('child.material.dispose()') || entitiesCode.includes('m.dispose()'), 'Voxel entities destroy must dispose materials');

// 11. Verify Escape Key closes Wholesale Modal in game.js
const gameCode = fs.readFileSync(path.join(__dirname, '../js/game.js'), 'utf8');
assert(gameCode.includes('this.closeWholesaleModal()'), 'game.js must handle Escape key for closing wholesale modal');
assert(gameCode.includes('this.confirmVeresiyeCheckout()'), 'game.js must handle KeyE for veresiye checkout confirmation');
assert(gameCode.includes('getResidentProfiles'), 'Residents tab must render from normalized resident profiles');
assert(!gameCode.includes('res.dialogues.length'), 'Residents tab must not depend on missing dialogue arrays');
assert(gameCode.includes('ÖZEL SİPARİŞ'), 'Residents tab must surface special order text');
assert(gameCode.includes('PRESTİJ ETKİSİ'), 'Brand tab must surface brand prestige contribution');
assert(gameCode.includes('calculateStorePrestige(this.decorationState, this.hygieneScore, this.brandState)'), 'Prestige display must include brand state');
assert(!gameCode.includes('this.cash || 0'), 'Brand tier upgrades must use the game money balance');
assert(!gameCode.includes('this.updateCashUI()'), 'Brand tier upgrades must refresh money UI, not a missing cash UI');
assert(gameCode.includes('MARKA SEVİYE ATLADI'), 'Brand sales must surface level-up feedback');
assert(gameCode.includes('spawnGoldenSparkles'), 'Brand level-up feedback should include a visual celebration');
assert(gameCode.includes('getDayChoiceEffects(this.activeDayChoice)'), 'Active day choice must drive live customer effects');
assert(gameCode.includes('totalSpawnBoost'), 'Day choice customer boost must be folded into spawn timing');
assert(gameCode.includes('dayChoiceEffects.specialCustomer'), 'Day choice special customer must affect resident spawning');
assert(entitiesCode.includes('applyDayChoiceToShoppingPool'), 'Customer shopping lists must favor active day choice products');
assert(gameCode.includes('getNeighborhoodBuildingProgress'), 'Buildings tab must render visible neighborhood progress');
assert(gameCode.includes('building-progress-panel'), 'Buildings tab must include a progress panel before investment cards');
assert(css.includes('.building-progress-panel'), 'CSS must style the neighborhood progress panel');

const residentProfile = mechanics.getResidentProfile(
  mechanics.recordResidentVisit(mechanics.recordResidentVisit(mechanics.recordResidentVisit(mechanics.createNeighborhoodState(), 'ayse'), 'ayse'), 'ayse'),
  'ayse',
  { veresiyeState: mechanics.issueVeresiye(mechanics.createVeresiyeState(), 'ayse', 25), dayTime: 'morning' }
);
assert.strictEqual(residentProfile.loyaltyLabel, 'TANIŞ ESNAF', 'Resident profile must expose loyalty labels for UI');
assert.strictEqual(residentProfile.hasDebt, true, 'Resident profile must expose veresiye debt for UI');
let specialOrderState = mechanics.createNeighborhoodState();
for (let i = 0; i < 8; i++) specialOrderState = mechanics.recordResidentVisit(specialOrderState, 'ayse');
assert(mechanics.getResidentProfile(specialOrderState, 'ayse', { availableItems: ['BREAD'] }).specialOrder, 'Loyal residents must expose special orders when preferred products are available');

console.log('Living Neighborhood unit and integration tests passed successfully.');
