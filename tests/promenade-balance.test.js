const fs = require('fs');
const assert = require('assert');

const source = fs.readFileSync('js/entities.js', 'utf8');
const start = source.indexOf('class EnvironmentAndDecorations');
const end = source.indexOf('\nclass ', start + 1);
const environment = source.slice(start, end >= 0 ? end : undefined);

assert(environment.includes('const promenadePalette ='), 'The promenade should use a restrained named palette');
assert(environment.includes('warmIvory: 0xf4e7c5'), 'The dominant floor should return to a warm light tone');
assert(environment.includes('borderInk: 0x2f3640'), 'Neo-brutalist contrast should live mainly on the border');
assert(environment.includes('[8.8, 20.2].forEach'), 'Only two high-signal direction chevrons should remain');
assert(environment.includes('new THREE.BoxGeometry(1.72, 0.07, 0.52)'), 'Department stamps should be compact');
assert(environment.includes('new THREE.BoxGeometry(7.4, 0.055, 0.10)'), 'Branch colors should be slim guide rails');
assert(!environment.includes('new THREE.BoxGeometry(3.15, 0.045, 25.0)'), 'The heavy dark road slab should be removed');
assert(!environment.includes('emissiveIntensity: 0.08'), 'The walkway should avoid glowing decorative accents');

console.log('Promenade balance tests passed.');
