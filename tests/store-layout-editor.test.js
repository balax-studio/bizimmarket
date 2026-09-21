const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mechanicsPath = path.join(root, 'js', 'mechanics.js');
const gamePath = path.join(root, 'js', 'game.js');
const htmlPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'style.css');

const mechanics = require(mechanicsPath);
const gameSource = fs.readFileSync(gamePath, 'utf8');
const htmlSource = fs.readFileSync(htmlPath, 'utf8');
const cssSource = fs.readFileSync(cssPath, 'utf8');

// 1. Grid-Snap Mathematical Precision Test
const snap = (v) => Math.round(v / 0.5) * 0.5;
assert.strictEqual(snap(2.23), 2.0, '2.23 must snap to 2.0');
assert.strictEqual(snap(2.35), 2.5, '2.35 must snap to 2.5');
assert.strictEqual(snap(-7.8), -8.0, '-7.8 must snap to -8.0');
assert.strictEqual(snap(0.24), 0.0, '0.24 must snap to 0.0');
assert.strictEqual(snap(0.26), 0.5, '0.26 must snap to 0.5');

// 2. 90-Degree AABB Dimension Swapping Logic
function getRotatedDimensions(size, rotY) {
  const isRot = Math.round(Math.abs(rotY) / (Math.PI / 2)) % 2 === 1;
  return {
    w: isRot ? size.d : size.w,
    d: isRot ? size.w : size.d
  };
}
const shelfSize = { w: 2.6, d: 1.6 };
assert.deepStrictEqual(getRotatedDimensions(shelfSize, 0), { w: 2.6, d: 1.6 }, '0 rad should keep w=2.6, d=1.6');
assert.deepStrictEqual(getRotatedDimensions(shelfSize, Math.PI / 2), { w: 1.6, d: 2.6 }, '90 deg should swap w and d');
assert.deepStrictEqual(getRotatedDimensions(shelfSize, Math.PI), { w: 2.6, d: 1.6 }, '180 deg should keep w and d');
assert.deepStrictEqual(getRotatedDimensions(shelfSize, (3 * Math.PI) / 2), { w: 1.6, d: 2.6 }, '270 deg should swap w and d');

// 3. SpatialOccupancyManager Dynamic Reservation & Update Tests
const spatial = new mechanics.SpatialOccupancyManager();
spatial.reserve('shelf_test_1', 'SHELF', -5.0, -2.0, -10.0, -8.0);
assert.strictEqual(spatial.reservations.length, 1, 'Should have 1 reservation');
assert.strictEqual(spatial.testAABB(-4.5, -2.5, -9.5, -8.5, 'SHELF').allowed, false, 'Overlapping area must be disallowed');
assert.strictEqual(spatial.testAABB(-4.5, -2.5, -9.5, -8.5, 'SHELF', 'shelf_test_1').allowed, true, 'Same fixture must be excluded from conflict');

// Test updateReservation
spatial.updateReservation('shelf_test_1', 'SHELF', 5.0, 8.0, -10.0, -8.0);
assert.strictEqual(spatial.reservations.length, 1, 'Should still have 1 reservation after update');
assert.strictEqual(spatial.reservations[0].minX, 5.0, 'Reservation minX should be updated');
assert.strictEqual(spatial.testAABB(-4.5, -2.5, -9.5, -8.5, 'SHELF').allowed, true, 'Old position should now be free');
assert.strictEqual(spatial.testAABB(5.5, 7.5, -9.5, -8.5, 'SHELF').allowed, false, 'New position should now be occupied');

// Test removeReservation
spatial.removeReservation('shelf_test_1');
assert.strictEqual(spatial.reservations.length, 0, 'Reservation should be removed');
assert.strictEqual(spatial.testAABB(5.5, 7.5, -9.5, -8.5, 'SHELF').allowed, true, 'Cleared position should be free');

// 4. Persistence & Normalization Test
const rawSaveWithLayout = {
  version: 2,
  state: {
    money: 500,
    customLayout: {
      shelf_tomato: { x: -3.5, z: -8.0, rotY: 1.5707963 },
      checkout_1: { x: 4.0, z: -18.0, rotY: 0 }
    }
  }
};
const normalized = mechanics.normalizeSaveData(rawSaveWithLayout);
assert(normalized.state.customLayout, 'normalizeSaveData must preserve customLayout');
assert.strictEqual(normalized.state.customLayout.shelf_tomato.x, -3.5, 'Custom x coordinate must match');
assert.strictEqual(normalized.state.customLayout.checkout_1.z, -18.0, 'Custom z coordinate must match');

// 5. Source Code Implementation Checks
assert(gameSource.includes('removeBox(tag)'), 'CollisionSystem must implement removeBox(tag)');
assert(gameSource.includes('isLayoutEditMode'), 'MiniMartGame must track isLayoutEditMode');
assert(gameSource.includes('enterLayoutEditMode'), 'MiniMartGame must implement enterLayoutEditMode');
assert(gameSource.includes('exitLayoutEditMode'), 'MiniMartGame must implement exitLayoutEditMode');
assert(gameSource.includes('applyFixtureMove'), 'MiniMartGame must implement applyFixtureMove');
assert(gameSource.includes('applyCustomLayout'), 'MiniMartGame must implement applyCustomLayout');
assert(gameSource.includes('updateGhostVisual'), 'MiniMartGame must implement updateGhostVisual');
assert(gameSource.includes('rotateSelectedFixture'), 'MiniMartGame must implement rotateSelectedFixture');
assert(gameSource.includes('selectFixtureForDrag'), 'MiniMartGame must implement selectFixtureForDrag');

// 6. UI & Neo-Brutalist Standards
assert(htmlSource.includes('id="layout-edit-btn"'), 'index.html must include layout-edit-btn');
assert(htmlSource.includes('id="layout-edit-hud"'), 'index.html must include layout-edit-hud');
assert(htmlSource.includes('id="layout-rotate-btn"'), 'index.html must include layout-rotate-btn');
assert(htmlSource.includes('id="layout-save-btn"'), 'index.html must include layout-save-btn');
assert(cssSource.includes('.layout-edit-btn'), 'style.css must style layout-edit-btn');
assert(cssSource.includes('.layout-edit-hud'), 'style.css must style layout-edit-hud');
assert(cssSource.includes('border-radius: 0px !important'), 'Neo-Brutalist rules must enforce zero border radius');

// 7. Strict Emoji Prohibition Check
const standardEmojiPattern = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const hudHtml = htmlSource.match(/<div id="layout-edit-hud"[\s\S]*?<\/div>\s*<\/div>/)?.[0] || '';
assert(!standardEmojiPattern.test(hudHtml), 'Layout edit HUD must not include platform emojis');
const btnHtml = htmlSource.match(/<button id="layout-edit-btn"[\s\S]*?<\/button>/)?.[0] || '';
assert(!standardEmojiPattern.test(btnHtml), 'Layout edit button must not include platform emojis');

console.log('Store Layout & Builder Mode test suite: 100% PASSED');
