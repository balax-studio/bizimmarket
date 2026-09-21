const fs = require('fs');
const assert = require('assert');

const game = fs.readFileSync('js/game.js', 'utf8');
const entities = fs.readFileSync('js/entities.js', 'utf8');

assert(game.includes('const MARKET_LAYOUT = Object.freeze'), 'Market expansion needs a shared layout contract');
assert(game.includes('width: 48') && game.includes('depth: 49'), 'Market floor should be roughly doubled and include the production hall');
assert(game.includes('new THREE.PlaneGeometry(MARKET_LAYOUT.width, MARKET_LAYOUT.depth)'), 'Store floor should use the expanded layout dimensions');
assert(game.includes('storeFloor.position.set(MARKET_LAYOUT.centerX, 0.00, MARKET_LAYOUT.centerZ)'), 'Store floor should be centered from layout constants');
assert(game.includes("this.collision.addBox(-19.5, -3.5, -24.5, -23.6, 'north_wall_left')") && game.includes("this.collision.addBox(3.5, MARKET_LAYOUT.maxX - 0.5, -24.5, -23.6, 'north_wall_right')"), 'North wall collider should span the expanded store but leave the entrance open');
assert(game.includes("this.collision.addBox(MARKET_LAYOUT.minX - 0.5, MARKET_LAYOUT.maxX + 0.5, MARKET_LAYOUT.maxZ - 0.5, MARKET_LAYOUT.maxZ + 0.5, 'store_south_wall')"), 'South wall collider should protect the expanded production end');
assert(game.includes('this.supermarketVisuals = new SupermarketVisualSystem(this.scene, this.collision);'), 'Architectural decorations should register colliders when they occupy walking space');

assert(entities.includes('class SupermarketVisualSystem'), 'Architectural visual system should still exist');
assert(entities.includes('constructor(scene, collision = null)'), 'Architecture system should receive the collision system');
assert(entities.includes('addDecorCollider'), 'Decor with physical footprint should use shared collider registration');
assert(entities.includes("bulkStation.position.set(-17.0, 0, -20.5)"), 'Bulk dispensers should move off the carrot shelf and wall footprints');
assert(!entities.includes("bulkStation.position.set(-12.5, 0, -20.5)"), 'Bulk dispensers must not overlap the carrot shelf anchor');
assert(entities.includes("const serviceDecor = new THREE.Group();"), 'Expanded market should add normal supermarket service/backroom decor');
assert(entities.includes("serviceDecor.position.set(21.5, 0, 18.5)"), 'Service decor should sit on the rear east wall away from production machines');
assert(game.includes("label: 'ARKA DEPO'"), 'Expanded market should visually zone the rear backroom');

assert(game.includes('const eastWallX = MARKET_LAYOUT.maxX - 0.8'), 'East architectural wall should be derived from expanded layout instead of the old 19.2m line');
assert(!game.includes('rightWall.position.set(19.2'), 'Right wall must not cut through the expanded sales floor at the old 19.2m boundary');
assert(!game.includes('[19.2, -18.0]'), 'East side structural pillars must move to the expanded outer wall');
assert(!game.includes("this.collision.addBox(18.8, 19.8, -24.2, -0.8, 'wall_right')"), 'Old right wall collider creates an invisible barrier inside the expanded market');
assert(game.includes("this.collision.addBox(3.5, MARKET_LAYOUT.maxX - 0.5, -1.4, -0.6, 'front_wall_right')"), 'Right service partition collider should match the expanded visual wall');
assert(game.includes("'store_west_service_wall'"), 'Expanded west boundary should leave the warehouse wing open and only protect the rear service edge');
assert(!game.includes("MARKET_LAYOUT.minZ - 0.5, MARKET_LAYOUT.maxZ + 0.5, 'store_west_wall'"), 'Full-depth west store wall overlaps the attached warehouse wing');

assert(game.includes('const westFenceX = MARKET_LAYOUT.minX'), 'Outdoor fence should use the expanded west boundary');
assert(game.includes('const eastFenceX = MARKET_LAYOUT.maxX'), 'Outdoor fence should use the expanded east boundary');
assert(!game.includes('p.position.set(-19.5, 0.475, fz)'), 'Old west fence line blocks the expanded rear area');
assert(!game.includes('p.position.set(19.5, 0.475, fz)'), 'Old east fence line blocks the expanded rear area');
assert(!game.includes('for (let fx = -19.5; fx <= 19.5; fx += 2.6)'), 'Back fence should span the expanded store width');
assert(!game.includes("this.collision.addBox(-20.0, -19.0, -0.8, 25.5, 'fence_left')"), 'Old west fence collider blocks the expanded plan');
assert(!game.includes("this.collision.addBox(19.0, 20.0, -0.8, 25.5, 'fence_right')"), 'Old east fence collider blocks the expanded plan');
assert(!game.includes("this.collision.addBox(-20.0, 20.0, 24.6, 25.4, 'fence_back')"), 'Back fence collider should match expanded store width');

assert(game.includes('this.beverageChiller = new BeverageChillerShelf(this.scene, 22.2, -16.0'), 'Interactive beverage chiller should move to the expanded east wall bay');
assert(game.includes("this.collision.addBox(21.4, 23.0, -17.3, -14.7, 'shelf_beverage_chiller')"), 'Beverage chiller collider should follow the moved fixture');
assert(entities.includes('const eastWallFixtureX = 22.6'), 'Decorative refrigeration should share a moved east wall anchor');
assert(!entities.includes('chiller.position.set(18.2, 0, -21.0)'), 'Decorative dairy chiller must not remain on the old east wall line');
assert(!entities.includes('cooler.position.set(18.2, 0, -15.5)'), 'Decorative beverage cooler must not overlap the interactive chiller on the old east wall line');

console.log('Market architecture expansion tests passed.');
