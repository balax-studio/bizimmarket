const assert = require('assert');
const mechanics = require('../js/mechanics');

const saturday = new Date(2026, 8, 19, 12);
const monday = new Date(2026, 8, 21, 12);
assert.deepStrictEqual(mechanics.getCalendarKeys(saturday), {
  day: '2026-09-19',
  week: '2026-09-14'
});

assert.deepStrictEqual(mechanics.calculateOfflineIncome(null, saturday.getTime(), 2), { minutes: 0, amount: 0 });
assert.deepStrictEqual(mechanics.calculateOfflineIncome(saturday.getTime() - 4 * 60_000, saturday.getTime(), 2), { minutes: 0, amount: 0 });
assert.deepStrictEqual(mechanics.calculateOfflineIncome(saturday.getTime() - 10 * 60_000, saturday.getTime(), 2), { minutes: 10, amount: 40 });
assert.deepStrictEqual(mechanics.calculateOfflineIncome(saturday.getTime() - 24 * 60 * 60_000, saturday.getTime(), 2), { minutes: 120, amount: 480 });
assert.deepStrictEqual(mechanics.calculateOfflineIncome(saturday.getTime() + 60_000, saturday.getTime(), 2), { minutes: 0, amount: 0 });

let retention = mechanics.createRetentionState({}, saturday);
const daily = mechanics.getDailyQuestInfo(retention);
assert.ok(['sale', 'harvest', 'stock'].includes(daily.eventType));
let result = mechanics.recordRetentionEvent(retention, { type: daily.eventType, amount: daily.target, itemType: 'TOMATO' }, saturday);
retention = result.state;
assert.strictEqual(retention.daily.claimed, true);
assert.strictEqual(result.rewards[0].type, 'daily');
assert.strictEqual(mechanics.recordRetentionEvent(retention, { type: daily.eventType, amount: 10 }, saturday).rewards.length, 0);

result = mechanics.recordRetentionEvent(retention, { type: 'sale', amount: 40, itemType: 'BREAD' }, saturday);
retention = result.state;
assert.strictEqual(retention.weekly.claimed, true);
assert.strictEqual(result.rewards[0].type, 'weeklyCosmetic');
assert.strictEqual(mechanics.recordRetentionEvent(retention, { type: 'sale', amount: 1 }, saturday).rewards.length, 0);

const nextWeek = mechanics.createRetentionState(retention, monday);
assert.strictEqual(nextWeek.weekly.progress, 0);
assert.strictEqual(nextWeek.weekly.claimed, false);
assert.strictEqual(nextWeek.daily.progress, 0);
assert.strictEqual(nextWeek.daily.claimed, false);

const nextDay = mechanics.createRetentionState(retention, new Date(2026, 8, 20, 12));
assert.strictEqual(nextDay.weekly.claimed, true);
assert.strictEqual(nextDay.daily.claimed, false);
assert.strictEqual(mechanics.grantProgressionXp(mechanics.createProgressionState({ xp: 35 }), 20).marketLevel, 2);

console.log('retention tests passed');
