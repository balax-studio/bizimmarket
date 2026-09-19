const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const game = fs.readFileSync(path.join(root, 'js', 'game.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

const bubbleStart = game.indexOf('updateCustomerBubble(c)');
const bubbleEnd = game.indexOf('  // Helper Staff AI', bubbleStart);
assert(bubbleStart > -1 && bubbleEnd > bubbleStart, 'updateCustomerBubble should exist before staff badge rendering');
const bubbleBody = game.slice(bubbleStart, bubbleEnd);

assert.match(bubbleBody, /maxBubbleDistance/, 'Customer bubbles should hide when far from the player');
assert.match(bubbleBody, /distanceTo\(this\.player\.group\.position\)/, 'Bubble visibility should be based on player distance');
assert.match(bubbleBody, /getCompactItemLabel\(/, 'Product bubbles should use compact localized item labels');
assert.doesNotMatch(bubbleBody, /desiredType}\$\{qtyStr\}/, 'Bubble labels should not expose raw product codes');
assert.doesNotMatch(bubbleBody, /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u, 'Customer bubble text should not include platform emoji');
assert.match(bubbleBody, /bubbleClass \+= ' far'/, 'Distant bubbles need a CSS state');

assert.match(game, /getCompactItemLabel\(itemType\)/, 'Compact item label helper should exist');
assert.match(css, /\.customer-bubble\.far/, 'Distant bubble CSS state should exist');
assert.match(css, /\.customer-bubble \.brutal-icon/, 'Bubble icons should be explicitly downsized');
assert.match(css, /max-width:\s*150px/, 'Bubble text should have a compact max width');

console.log('world bubble tests passed');
