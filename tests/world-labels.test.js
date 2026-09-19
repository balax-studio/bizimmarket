const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const game = fs.readFileSync(path.join(root, 'js', 'game.js'), 'utf8');
const entities = fs.readFileSync(path.join(root, 'js', 'entities.js'), 'utf8');

const standardEmojiPattern = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;

const debugText = html.match(/<div class="debug-content">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/)?.[0] || '';
assert(!standardEmojiPattern.test(debugText), 'Debug UI should use text/SVG styling, not platform emoji');
assert(!/style=/.test(debugText), 'Debug UI buttons should not rely on inline color patches');

const floatingTextLiterals = [...game.matchAll(/showFloatingText\((`[^`]*`|'[^']*'|"[^"]*")/g)]
  .map(match => match[1]);
assert(floatingTextLiterals.every(text => !standardEmojiPattern.test(text)), 'Floating text should not include platform emoji');
assert(floatingTextLiterals.every(text => !/\b[A-Z]+_[A-Z_]+\b/.test(text)), 'Floating text should use Turkish product names instead of raw item codes');

const machineTextureCalls = [...entities.matchAll(/getMachineStatusTexture\(([^;]+)\)/g)]
  .map(match => match[1]);
assert(machineTextureCalls.every(call => !standardEmojiPattern.test(call)), 'Machine status signs should not include platform emoji');

assert.match(entities, /function getItemDisplayName/, 'World labels need a shared item display-name helper');
assert.match(game, /getItemDisplayName\(type\)/, 'Debug item grants should render localized product names');

console.log('world label tests passed');
