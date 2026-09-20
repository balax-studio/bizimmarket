const assert = require('assert');
const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.resolve(__dirname, '..', 'style.css'), 'utf8');
const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');

// 1. Breakpoint coverage for 768px, 600px, 480px, 420px
assert.match(css, /@media \(max-width: 768px\)/, '768px tablet breakpoint must be defined');
assert.match(css, /@media \(max-width: 600px\)/, '600px standard mobile breakpoint must be defined');
assert.match(css, /@media \(max-width: 480px\)/, '480px narrow mobile breakpoint must be defined');
assert.match(css, /@media \(max-width: 420px\)/, '420px compact mobile breakpoint must be defined');

// 2. Modal header & close buttons touch accessibility
assert.match(css, /\.upgrade-close-btn,[\s\S]*#procurement-close-btn[\s\S]*min-width:\s*40px/, 'Modal close buttons should have min 40px touch hit box on mobile');
assert.match(css, /\.upgrade-close-btn,[\s\S]*#procurement-close-btn[\s\S]*min-height:\s*40px/, 'Modal close buttons should have min 40px touch height on mobile');

// 3. Modal scroll and containment
assert.match(css, /\.wiki-content,[\s\S]*\.upgrade-content[\s\S]*overscroll-behavior:\s*contain/, 'Modal content should prevent page dragging with overscroll contain');
assert.match(css, /\.upgrade-tabs,[\s\S]*\.wiki-tabs[\s\S]*overflow-x:\s*auto/, 'Modal tabs should be horizontally scrollable on small screens');

// 4. Button ergonomics on narrow screens
assert.match(css, /\.upgrade-buy-btn[\s\S]*min-height:\s*42px/, 'Upgrade buy button should have accessible touch height');
assert.match(css, /\.wholesale-order-btn[\s\S]*min-height:\s*42px/, 'Wholesale order button should have accessible touch height');
assert.match(css, /\.building-buy-btn[\s\S]*min-height:\s*42px/, 'Building buy button should have accessible touch height');
assert.match(css, /\.veresiye-btn-accept,[\s\S]*\.veresiye-btn-decline[\s\S]*min-height:\s*44px/, 'Veresiye action buttons should have minimum 44px touch height');

// 5. HTML structural checks
assert.match(html, /<div id="veresiye-prompt" class="veresiye-prompt hidden">[\s\S]*<\/div>\s*<\/div>\s*<!-- Retro CRT Office Terminal HUD Prompt -->/, 'Veresiye prompt should have properly closed markup structure');

console.log('Small screen popups and buttons tests passed successfully.');
