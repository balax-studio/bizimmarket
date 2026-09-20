const assert = require('assert');
const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.resolve(__dirname, '..', 'style.css'), 'utf8');
const game = fs.readFileSync(path.resolve(__dirname, '..', 'js', 'game.js'), 'utf8');

assert.match(css, /--mobile-control-zone:/, 'Mobile layout should reserve a shared bottom control zone');
assert.match(css, /--mobile-top-zone:/, 'Mobile layout should reserve top HUD space');
assert.match(css, /#game-container[\s\S]*height:\s*100dvh/, 'Game shell should use dynamic viewport height on mobile browsers');
assert.match(css, /overscroll-behavior:\s*none/, 'Page-level overscroll should be disabled so the game does not feel like a webpage');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*grid-template-columns:\s*minmax\(90px,\s*auto\)\s*minmax\(0,\s*1fr\)\s*auto/, 'Mobile top bar should keep objective flexible between money and controls');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.objective-badge[\s\S]*grid-column:\s*1 \/ -1/, 'Mobile objective should move to its own row');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.delivery-widget[\s\S]*top:\s*calc\(118px \+ env\(safe-area-inset-top\)\)/, 'Delivery widget should sit below HUD, not over the objective row');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.specialization-panel[\s\S]*left:\s*8px[\s\S]*right:\s*8px[\s\S]*width:\s*auto/, 'Management drawer should become a mobile bottom sheet, not a desktop sidebar');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.specialization-panel[\s\S]*transform:\s*translateY\(calc\(100% - 52px\)\)/, 'Collapsed management sheet should leave only a compact handle visible');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.specialization-panel\.open[\s\S]*transform:\s*translateY\(0\)/, 'Open management sheet should slide into view without page scroll');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.specialization-panel:not\(\.open\) #management-content[\s\S]*display:\s*none/, 'Closed management sheet should show only the handle');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.specialization-panel\.open #management-content[\s\S]*display:\s*block/, 'Open management sheet should reveal its content');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*#management-content[\s\S]*overscroll-behavior:\s*contain/, 'Management sheet content should scroll internally without dragging the page');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.bottom-objective-card[\s\S]*left:\s*calc\(112px \+ env\(safe-area-inset-left\)\)/, 'Bottom objective should avoid the joystick');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.bottom-objective-card[\s\S]*right:\s*calc\(98px \+ env\(safe-area-inset-right\)\)/, 'Bottom objective should avoid the sprint button');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.controls-guide[\s\S]*display:\s*none/, 'Keyboard guide should not consume mobile space');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.wiki-box,[\s\S]*\.upgrade-box,[\s\S]*\.debug-box,[\s\S]*\.neighborhood-box,[\s\S]*\.day-choice-box,[\s\S]*\.wholesale-box,[\s\S]*\.crt-monitor-bezel[\s\S]*max-height:\s*calc\(100dvh - 22px\)/, 'Mobile popups should fit the viewport as game sheets');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.floating-popup[\s\S]*max-width:\s*42vw/, 'Floating popups should be clamped on narrow screens');
assert.match(css, /@media \(max-width: 420px\)/, 'Very small phones need a tighter breakpoint');
assert.match(game, /closeTransientMobileOverlays\(\)/, 'Opening modal surfaces should first close transient mobile HUD popups');
assert.match(game, /prepareModalSurface\(/, 'Game should route modal openings through a single surface-prep helper');

console.log('mobile layout tests passed');
