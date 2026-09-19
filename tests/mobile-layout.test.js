const assert = require('assert');
const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.resolve(__dirname, '..', 'style.css'), 'utf8');

assert.match(css, /--mobile-control-zone:/, 'Mobile layout should reserve a shared bottom control zone');
assert.match(css, /--mobile-top-zone:/, 'Mobile layout should reserve top HUD space');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*grid-template-columns:\s*minmax\(90px,\s*auto\)\s*minmax\(0,\s*1fr\)\s*auto/, 'Mobile top bar should keep objective flexible between money and controls');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.objective-badge[\s\S]*grid-column:\s*1 \/ -1/, 'Mobile objective should move to its own row');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.delivery-widget[\s\S]*top:\s*calc\(118px \+ env\(safe-area-inset-top\)\)/, 'Delivery widget should sit below HUD, not over the objective row');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.specialization-panel[\s\S]*bottom:\s*calc\(var\(--mobile-control-zone\) \+ 84px \+ env\(safe-area-inset-bottom\)\)/, 'Management drawer should stay above joystick/sprint controls');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.bottom-objective-card[\s\S]*left:\s*calc\(112px \+ env\(safe-area-inset-left\)\)/, 'Bottom objective should avoid the joystick');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.bottom-objective-card[\s\S]*right:\s*calc\(98px \+ env\(safe-area-inset-right\)\)/, 'Bottom objective should avoid the sprint button');
assert.match(css, /@media \(max-width: 600px\)[\s\S]*\.controls-guide[\s\S]*display:\s*none/, 'Keyboard guide should not consume mobile space');
assert.match(css, /@media \(max-width: 420px\)/, 'Very small phones need a tighter breakpoint');

console.log('mobile layout tests passed');
