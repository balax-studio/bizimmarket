const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const game = fs.readFileSync(path.join(root, 'js', 'game.js'), 'utf8');

assert.match(html, /id="hud-menu-toggle"/, 'HUD utility buttons should be tucked behind a compact menu toggle');
assert.match(html, /class="top-actions"/, 'Top action buttons need a dedicated popover instead of crowding the HUD');
assert.doesNotMatch(html, /id="wiki-btn"[^>]*style=/, 'Wiki button should use stylesheet classes instead of inline layout');
assert.doesNotMatch(html, /id="debug-btn"[^>]*style=/, 'Debug button should use stylesheet classes instead of inline layout');

const guidanceStart = game.indexOf('updateGuidanceAndObjective(time)');
const guidanceEnd = game.indexOf('  // Floating Capacity Bubble', guidanceStart);
assert(guidanceStart > -1 && guidanceEnd > guidanceStart, 'Guidance function should exist for target arrows');
const guidanceBody = game.slice(guidanceStart, guidanceEnd);
assert.doesNotMatch(guidanceBody, /bottomObjectiveTitle\.textContent/, 'Guidance arrows must not overwrite the progression task card');
assert.doesNotMatch(guidanceBody, /objectiveText\.innerHTML/, 'Guidance arrows must not overwrite the top progression summary');

assert.match(css, /\.hud-menu-toggle/, 'Compact HUD menu toggle needs explicit styling');
assert.match(css, /\.top-actions\.open/, 'HUD utility menu needs an open state');
assert.match(css, /grid-template-columns:\s*minmax\(140px,\s*auto\)\s*minmax\(190px,\s*1fr\)\s*auto\s*auto\s*auto/, 'Desktop HUD should use stable compact grid columns');

console.log('hud ui tests passed');
