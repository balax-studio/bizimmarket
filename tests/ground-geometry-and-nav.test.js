const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const gameSource = fs.readFileSync(path.join(root, 'js', 'game.js'), 'utf8');
const entitiesSource = fs.readFileSync(path.join(root, 'js', 'entities.js'), 'utf8');

// 1. Verify Ground Y-Elevation Hierarchy (Eliminates Z-Fighting)
assert(gameSource.includes('baseTerrain.position.set(0, -0.02, 0)'), 'Base terrain must be at Y = -0.02');
assert(gameSource.includes('innerLawn.position.set(0, -0.01, 0)'), 'Inner lawn must be at Y = -0.01');
assert(gameSource.includes('storeFloor.position.set(0, 0.00, -12.5)'), 'Store floor must be at Y = 0.00');
assert(gameSource.includes('mainPath.position.set(0, 0.015, 11.5)'), 'Main path must be at Y = 0.015');
assert(entitiesSource.includes('tile.position.set(-1.62 + col * 1.08, 0.030,'), 'Production floor tiles must sit at Y = 0.030 above ground walkways');
assert(entitiesSource.includes('this.group.position.set(x, 0.035, z)'), 'UnlockPad group must be at Y = 0.035');

// 2. Verify Lateral Walkways are in Corridors (Not Cutting Through Machines/Plots)
assert(gameSource.includes('latPath1.position.set(0, 0.015, 3.5)'), 'Corridor 1 walkway must be at Z = 3.5');
assert(gameSource.includes('latPath2.position.set(0, 0.015, 9.5)'), 'Corridor 2 walkway must be at Z = 9.5');
assert(gameSource.includes('latPath3.position.set(0, 0.015, 15.5)'), 'Corridor 3 walkway must be at Z = 15.5');
assert(gameSource.includes('latPath4.position.set(0, 0.015, 21.5)'), 'Corridor 4 walkway must be at Z = 21.5');
assert(!gameSource.includes('latPath1.position.set(0, 0.012, 6.5)'), 'Walkway must not intersect Row 1 machines');

// 3. Verify SupermarketNavGraph A* Corridor Nodes
assert(entitiesSource.includes('const farmZ = [1.8, 3.5, 9.5, 15.5, 21.5];'), 'NavGraph farmZ must use open walking corridors');
assert(entitiesSource.includes('const farmX = [-15.5, -9.0, 0.0, 9.0, 15.5];'), 'NavGraph farmX must use open walking corridors');
assert(!entitiesSource.includes('const farmZ = [1.8, 6.5, 9.5, 12.5, 15.5, 18.5];'), 'NavGraph must not route directly through solid machines at 6.5, 12.5, 18.5');

// 4. Verify Symmetrical Department Floor Zones for All Shelf Rows
assert(gameSource.includes("label: 'MANAV'"), 'Row 1 west department must be MANAV');
assert(gameSource.includes("label: 'ŞARKÜTERİ'"), 'Row 1 east department must be ŞARKÜTERİ');
assert(gameSource.includes("label: 'FIRIN'"), 'Row 2 west department must be FIRIN');
assert(gameSource.includes("label: 'BÜFE & PİZZA'"), 'Row 2 east department must be BÜFE & PİZZA');
assert(gameSource.includes("label: 'ORGANİK'"), 'Row 3 west department must be ORGANİK');
assert(gameSource.includes("label: 'GURME & DELİ'"), 'Row 3 east department must be GURME & DELİ');

// 5. Verify Neighborhood Buildings Spawn in Safe Zone (North of Highway Traffic)
assert(gameSource.includes("new VoxelGym(this.scene, 0.0, -39.5)"), 'Gym must be safely placed at Z = -39.5');
assert(gameSource.includes("new VoxelSchool(this.scene, 24.0, -39.5)"), 'School must be safely placed at Z = -39.5');
assert(gameSource.includes("new VoxelPark(this.scene, -24.0, -39.5)"), 'Park must be safely placed at Z = -39.5');

// 6. Verify Entrance/Exit Doorway Dual-Lane Separation & Obstacle Clearance
assert(entitiesSource.includes("this.addNode('N_OUT_ENTRY', -1.2, -25.5);"), 'Inbound outdoor portal must be separated on West lane X = -1.2');
assert(entitiesSource.includes("this.addNode('N_OUT_EXIT', 1.2, -25.5);"), 'Outbound outdoor portal must be separated on East lane X = 1.2');
assert(entitiesSource.includes("this.addNode('N_IN_ENTRY', -1.2, -22.5);"), 'Inbound lobby portal must be on West lane X = -1.2');
assert(entitiesSource.includes("this.addNode('N_IN_EXIT', 1.2, -22.5);"), 'Outbound lobby portal must be on East lane X = 1.2');
assert(gameSource.includes("this.mopStation = new MopStation(this.scene, -4.5, -23.5);"), 'Mop station must be placed in safe zone on West wall');
assert(gameSource.includes("this.collision.addBox(-5.3, -3.7, -24.5, -22.5, 'mop_station');"), 'Mop station collider must not block entrance opening');

// 7. Verify Customer Physical Movement Watchdog, Lateral Flocking Curl & Shelf Slots
assert(entitiesSource.includes("const distMoved = pos.distanceTo(this.lastPos);"), 'Customer must track physical displacement to prevent deadlock');
assert(entitiesSource.includes("const latX = -pushDirZ * 0.45;"), 'Customer flocking must apply lateral curl to break collinear head-on deadlock');
assert(entitiesSource.includes("this.shelfSlotOffset = (Math.random() - 0.5) * 1.4;"), 'Customers must distribute across shelf width to prevent pileups');
assert(entitiesSource.includes("let exitTarget = new THREE.Vector3(1.2, 0, -25.5);"), 'Departing customers must steer strictly to East exit portal');

// 8. Verify Supermarket Architectural Redesign, Visual Rigging & Logistics Warehouse
assert(entitiesSource.includes('class SupermarketVisualSystem'), 'entities.js must define SupermarketVisualSystem');
assert(entitiesSource.includes('class WarehouseZone'), 'entities.js must define WarehouseZone');
assert(gameSource.includes('this.supermarketVisuals = new SupermarketVisualSystem(this.scene);'), 'game.js must instantiate SupermarketVisualSystem');
assert(gameSource.includes('this.warehouseZone = new WarehouseZone(this.scene);'), 'game.js must instantiate WarehouseZone');

// Visual Elements Verification (Ceiling, Refrigeration, Welcome, Checkout, Merchandising, Safety)
assert(entitiesSource.includes('[1. REYON: TEMEL GIDA & MANAV]'), 'Overhead category banner 1 must be present');
assert(entitiesSource.includes('[2. REYON: ŞARKÜTERİ & SÜT]'), 'Overhead category banner 2 must be present');
assert(entitiesSource.includes('[3. REYON: ORGANİK & FIRIN]'), 'Overhead category banner 3 must be present');
assert(entitiesSource.includes('[KASA 1: AÇIK]'), 'Checkout overhead indicator light must be present');
assert(entitiesSource.includes('[SEPETLER]'), 'Hand basket stack must be present');
assert(entitiesSource.includes('[ARABALAR]'), 'Shopping trolley corral must be present');
assert(entitiesSource.includes('[TERAZİ]'), 'Produce weighing scale must be present');
assert(entitiesSource.includes('[GÜNÜN FIRSATI]'), 'End-cap promotional header must be present');
assert(entitiesSource.includes('[FİYAT GÖR]'), 'Price checker kiosk must be present');
assert(entitiesSource.includes('[DİKKAT]'), 'Wet floor cone must be present');
assert(entitiesSource.includes('[YANGIN TÜPÜ]'), 'Fire extinguisher station must be present');
assert(entitiesSource.includes('[DEPO - YALNIZCA PERSONEL]'), 'Warehouse double-swing doors must have personnel sign');

// Logistics Warehouse Navigation & Player Geometry Verification
assert(entitiesSource.includes("this.addNode('W_IN_DOOR', -19.2, -12.2);"), 'NavGraph must include W_IN_DOOR threshold node');
assert(entitiesSource.includes("this.addNode('W_CENTER', -22.5, -12.2);"), 'NavGraph must include W_CENTER node');
assert(entitiesSource.includes("this.addNode('W_DOCK', -24.0, -10.0);"), 'NavGraph must include W_DOCK loading bay node');
assert(entitiesSource.includes("this.addEdge('M_Z2_X0', 'W_IN_DOOR');"), 'NavGraph must link store concourse to warehouse door');
assert(gameSource.includes('this.player.group.position.x = THREE.MathUtils.clamp(this.player.group.position.x, -27.5, 19.5);'), 'Player movement bounds must allow walking into warehouse');

console.log('Ground geometry, walkways, and navigation safety tests passed.');
