const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const game = fs.readFileSync(path.join(root, 'js', 'game.js'), 'utf8');

assert.match(html, /class="management-tabs"[^>]*role="tablist"/, 'Management panel should expose a tablist');
['overview', 'quests', 'ops', 'style'].forEach(tab => {
  assert.match(html, new RegExp(`data-management-tab="${tab}"`), `Missing management tab: ${tab}`);
  assert.match(html, new RegExp(`id="management-panel-${tab}"`), `Missing management panel: ${tab}`);
});
assert.doesNotMatch(html, /<details id="side-quest-details"/, 'Side quests should be a tab panel, not a stacked details block');
assert.doesNotMatch(html, /<details id="pricing-details"/, 'Pricing should be inside the ops tab, not a stacked details block');

assert.match(css, /\.management-tabs/, 'Management tabs need explicit styling');
assert.match(css, /\.management-tab\.active/, 'Active management tab should have a distinct state');
assert.match(css, /\.management-panel\.active/, 'Active management panel should be controlled by class');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.management-tabs[\s\S]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/, 'Mobile tabs should fit four compact columns');

assert.match(game, /initManagementTabs\(\)/, 'Game should initialize management tab behavior');
assert.match(game, /setManagementTab\(/, 'Game should expose a tab switching helper');
assert.match(game, /data-management-tab/, 'Tab behavior should be bound through data-management-tab');

console.log('management ui tests passed');
