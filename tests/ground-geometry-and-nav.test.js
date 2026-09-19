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

console.log('Ground geometry, walkways, and navigation safety tests passed.');
