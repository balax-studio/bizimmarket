const assert = require('assert');
const mechanics = require('../js/mechanics');

let state = mechanics.createProgressionState();
const sideCards = mechanics.getSideQuestCards(state);
assert.strictEqual(sideCards.length, 3);
assert.strictEqual(sideCards[0].progress, 0);

state = mechanics.recordProgressEvent(state, { type: 'harvest', itemType: 'TOMATO', amount: 20 });
assert.strictEqual(state.quests.side.harvest_20.claimed, true);
assert.strictEqual(state.rewards.filter(reward => reward.key === 'harvest_20').length, 1);
assert.strictEqual(state.rewards.find(reward => reward.key === 'harvest_20').cosmetic, 'coral');
const xpAfterClaim = state.xp;
state = mechanics.recordProgressEvent(state, { type: 'harvest', itemType: 'TOMATO', amount: 2 });
assert.strictEqual(state.xp, xpAfterClaim);

state = mechanics.recordProgressEvent(state, { type: 'stock', itemType: 'BREAD', amount: 25 });
assert.strictEqual(state.rewards.find(reward => reward.key === 'stock_25').cosmetic, 'violet');
state = mechanics.recordProgressEvent(state, { type: 'sale', itemType: 'BREAD', amount: 30 });
assert.strictEqual(state.rewards.find(reward => reward.key === 'sell_30').cosmetic, 'sparkleSign');
assert.strictEqual(state.marketLevel, 4);
assert.strictEqual(mechanics.getSideQuestCards(state).every(card => card.claimed), true);

assert.strictEqual(mechanics.getRequiredMarketLevel(0), 1);
assert.strictEqual(mechanics.getRequiredMarketLevel(8), 2);
assert.strictEqual(mechanics.getRequiredMarketLevel(15), 3);
assert.strictEqual(mechanics.getRequiredMarketLevel(18), 4);
assert.strictEqual(mechanics.canPayUnlockPad(15, 2), false);
assert.strictEqual(mechanics.canPayUnlockPad(15, 3), true);

const restored = mechanics.createProgressionState(JSON.parse(JSON.stringify(state)));
assert.strictEqual(restored.quests.side.sell_30.claimed, true);
assert.strictEqual(mechanics.createProgressionState({ xp: 40 }).quests.side.harvest_20.progress, 0);

console.log('expanded progression tests passed');
