import * as THREE from 'three';
import { createBrutalistMaterial, attachToonOutline, createHazardTexture } from './Materials.js';
import { ITEMS } from '../domain/catalog.js';

export class WorldScene {
  constructor(scene) {
    this.scene = scene;
    this.interactiveObjects = []; // Shelves, machines, farms, checkout
    this.obstacles = []; // Physical obstacle collision boxes for player & agents
    this.shelves = [];
    this.machines = [];
    this.customers = [];

    // State
    this.unlockedParcels = new Set(['A0']);

    this.initEnvironment();
    this.initShopParcelA0();
  }

  addObstacleBox(minX, maxX, minZ, maxZ, id = null) {
    const obs = {
      type: 'box',
      id: id,
      min: { x: minX, z: minZ },
      max: { x: maxX, z: maxZ }
    };
    this.obstacles.push(obs);
    return obs;
  }

  removeObstacleById(id) {
    this.obstacles = this.obstacles.filter((o) => o.id !== id);
  }

  initEnvironment() {
    // 1. Massive Ground Plane (Dark Asphalt Parking + Pavement)
    const groundGeo = new THREE.PlaneGeometry(80, 80);
    const groundMat = createBrutalistMaterial(0x1a1c20);
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);

    // 2. Parking Lot Markings (Yellow lines)
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    for (let x = -20; x <= -6; x += 3.5) {
      const lineGeo = new THREE.PlaneGeometry(0.15, 4.5);
      const lineMesh = new THREE.Mesh(lineGeo, lineMat);
      lineMesh.rotation.x = -Math.PI / 2;
      lineMesh.position.set(x, 0.01, 10);
      this.scene.add(lineMesh);
    }

    // 3. Low-Poly Cars in Parking Lot
    this.spawnCar(new THREE.Vector3(-18, 0, 10), 0x00d4ff);
    this.spawnCar(new THREE.Vector3(-14.5, 0, 10), 0xff5500);
    this.spawnCar(new THREE.Vector3(-11, 0, 10), 0xffee00);

    // 4. Street Lamps
    this.spawnLamp(new THREE.Vector3(-6, 0, 6));
    this.spawnLamp(new THREE.Vector3(6, 0, 6));
  }

  spawnCar(pos, color) {
    const carGroup = new THREE.Group();
    carGroup.position.copy(pos);

    // Chassis
    const chassisGeo = new THREE.BoxGeometry(2.4, 0.8, 1.4);
    const chassisMat = createBrutalistMaterial(color);
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    chassis.position.y = 0.5;
    chassis.castShadow = true;
    attachToonOutline(chassis, 0.04);
    carGroup.add(chassis);

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(1.4, 0.6, 1.2);
    const cabinMat = createBrutalistMaterial(0x1a1c20);
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(-0.2, 1.1, 0);
    cabin.castShadow = true;
    attachToonOutline(cabin, 0.04);
    carGroup.add(cabin);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.25, 8);
    const wheelMat = createBrutalistMaterial(0x111111);
    const wheelPositions = [
      [-0.8, 0.3, 0.75],
      [-0.8, 0.3, -0.75],
      [0.8, 0.3, 0.75],
      [0.8, 0.3, -0.75]
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, y, z);
      carGroup.add(wheel);
    });

    carGroup.rotation.y = Math.PI / 2;
    this.scene.add(carGroup);

    // Car obstacle
    this.addObstacleBox(pos.x - 0.9, pos.x + 0.9, pos.z - 1.4, pos.z + 1.4);
  }

  spawnLamp(pos) {
    const lampGroup = new THREE.Group();
    lampGroup.position.copy(pos);

    const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.0, 6);
    const poleMat = createBrutalistMaterial(0x33373d);
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 2.0;
    lampGroup.add(pole);

    const headGeo = new THREE.BoxGeometry(0.6, 0.2, 0.4);
    const headMat = createBrutalistMaterial(0x0a0a0c);
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, 4.0, 0);
    lampGroup.add(head);

    this.scene.add(lampGroup);
  }

  initShopParcelA0() {
    // Concrete Market Floor (16x16m initial shop)
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = createBrutalistMaterial(0x282b30);
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0.02, -6);
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Perimeter Walls around Parcel A0 with physical collision
    this.createWall(new THREE.Vector3(0, 1.5, -14), 16, 3, 0.4, false, 'wall_north');
    this.createWall(new THREE.Vector3(-8, 1.5, -6), 0.4, 3, 16, false, 'wall_west');

    // East Partition Wall (Separates Parcel A0 from locked Parcel A1)
    this.partitionWallA1 = this.createWall(new THREE.Vector3(8, 1.5, -6), 0.4, 3, 16, true, 'wall_east_partition');

    // Front Wall with entrance gap
    this.createWall(new THREE.Vector3(-5, 1.5, 2), 6, 3, 0.4, false, 'wall_south_left');
    this.createWall(new THREE.Vector3(5, 1.5, 2), 6, 3, 0.4, false, 'wall_south_right');

    // Neon Market Header Sign
    const signGroup = new THREE.Group();
    signGroup.position.set(0, 3.8, 2.1);
    const signBox = new THREE.Mesh(
      new THREE.BoxGeometry(7, 1.2, 0.3),
      createBrutalistMaterial(0x181a1f)
    );
    attachToonOutline(signBox, 0.04);
    signGroup.add(signBox);
    this.scene.add(signGroup);

    // Initial Farm Plot: Tomato Garden (Left side of shop)
    this.initTomatoFarm(new THREE.Vector3(-4.5, 0, -5));

    // Initial Shelf: Tomato Display Shelf (Right side)
    this.spawnShelf('shelf_tomato', new THREE.Vector3(3.5, 0, -6), 0);

    // Initial Checkout Counter (Near entrance, right side aisle)
    this.initCheckoutCounter(new THREE.Vector3(3.0, 0, 0));
  }

  createWall(pos, w, h, d, isDestructible = false, id = null) {
    const wallGeo = new THREE.BoxGeometry(w, h, d);
    const wallMat = createBrutalistMaterial(isDestructible ? 0x3d424a : 0x22252a);
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);
    wallMesh.position.copy(pos);
    wallMesh.castShadow = true;
    wallMesh.receiveShadow = true;
    attachToonOutline(wallMesh, 0.04);

    if (isDestructible) {
      const hazardDecal = new THREE.Mesh(
        new THREE.PlaneGeometry(d > w ? d * 0.8 : w * 0.8, 0.6),
        new THREE.MeshBasicMaterial({ map: createHazardTexture() })
      );
      hazardDecal.position.set(0, 0, d > w ? 0.22 : 0.22);
      if (d > w) hazardDecal.rotation.y = Math.PI / 2;
      wallMesh.add(hazardDecal);
    }

    this.scene.add(wallMesh);

    // Add physical AABB obstacle
    this.addObstacleBox(pos.x - w / 2, pos.x + w / 2, pos.z - d / 2, pos.z + d / 2, id);

    return wallMesh;
  }

  unlockParcel(parcelId) {
    if (this.unlockedParcels.has(parcelId)) return false;

    this.unlockedParcels.add(parcelId);

    if (parcelId === 'A1') {
      // Demolish East Wall
      if (this.partitionWallA1) {
        this.scene.remove(this.partitionWallA1);
        this.partitionWallA1.geometry.dispose();
        this.removeObstacleById('wall_east_partition');
      }

      // Add East Wing Concrete Floor (16x16m)
      const floorA1 = new THREE.Mesh(
        new THREE.PlaneGeometry(16, 16),
        createBrutalistMaterial(0x2d3036)
      );
      floorA1.rotation.x = -Math.PI / 2;
      floorA1.position.set(16, 0.02, -6);
      floorA1.receiveShadow = true;
      this.scene.add(floorA1);

      // New East Outer Walls
      this.createWall(new THREE.Vector3(24, 1.5, -6), 0.4, 3, 16, false, 'wall_east_outer');
      this.createWall(new THREE.Vector3(16, 1.5, -14), 16, 3, 0.4, false, 'wall_north_outer_a1');
      this.createWall(new THREE.Vector3(16, 1.5, 2), 16, 3, 0.4, false, 'wall_south_outer_a1');
      return true;
    }

    return false;
  }

  initTomatoFarm(pos) {
    const farmGroup = new THREE.Group();
    farmGroup.position.copy(pos);

    // Soil Patch
    const soilGeo = new THREE.BoxGeometry(4.0, 0.15, 4.0);
    const soilMat = createBrutalistMaterial(0x3e2723); // Fertile dark soil
    const soilMesh = new THREE.Mesh(soilGeo, soilMat);
    soilMesh.position.y = 0.08;
    attachToonOutline(soilMesh, 0.04);
    farmGroup.add(soilMesh);

    // Wooden Border
    const borderMat = createBrutalistMaterial(0x5d4037);
    const borderBox = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.3, 4.2), borderMat);
    borderBox.position.y = 0.15;
    farmGroup.add(borderBox);

    // 4 Plant Mounds & Ripe Tomatoes
    this.tomatoPlants = [];
    const moundOffsets = [
      [-1.0, -1.0],
      [1.0, -1.0],
      [-1.0, 1.0],
      [1.0, 1.0]
    ];

    moundOffsets.forEach(([ox, oz]) => {
      const bushGeo = new THREE.SphereGeometry(0.45, 6, 6);
      const bushMat = createBrutalistMaterial(0x2e7d32);
      const bushMesh = new THREE.Mesh(bushGeo, bushMat);
      bushMesh.position.set(ox, 0.45, oz);
      attachToonOutline(bushMesh, 0.04);
      farmGroup.add(bushMesh);

      // Ripe Tomato on top
      const tomatoGeo = new THREE.SphereGeometry(0.22, 6, 6);
      const tomatoMat = createBrutalistMaterial(0xff3b30);
      const tomatoMesh = new THREE.Mesh(tomatoGeo, tomatoMat);
      tomatoMesh.position.set(ox, 0.85, oz);
      attachToonOutline(tomatoMesh, 0.03);
      farmGroup.add(tomatoMesh);

      this.tomatoPlants.push({
        bush: bushMesh,
        fruit: tomatoMesh,
        isRipe: true,
        growTimer: 0
      });
    });

    this.farmData = {
      type: 'farm',
      produceType: 'tomato',
      position: pos,
      radius: 2.6,
      plants: this.tomatoPlants
    };

    this.interactiveObjects.push(this.farmData);
    this.scene.add(farmGroup);
  }

  spawnShelf(shelfType, pos, rotY = 0) {
    const shelfGroup = new THREE.Group();
    shelfGroup.position.copy(pos);
    shelfGroup.rotation.y = rotY;

    // Shelf Frame (Brutalist Metal & Wood)
    const frameGeo = new THREE.BoxGeometry(2.4, 1.4, 1.2);
    const frameMat = createBrutalistMaterial(0x31353e);
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.position.y = 0.7;
    frameMesh.castShadow = true;
    attachToonOutline(frameMesh, 0.04);
    shelfGroup.add(frameMesh);

    // Top Sign Banner
    const bannerColor = shelfType === 'shelf_paste' ? 0xff5500 : 0x00ff66;
    const bannerGeo = new THREE.BoxGeometry(2.4, 0.35, 0.1);
    const bannerMat = createBrutalistMaterial(bannerColor);
    const bannerMesh = new THREE.Mesh(bannerGeo, bannerMat);
    bannerMesh.position.set(0, 1.5, 0.55);
    shelfGroup.add(bannerMesh);

    // Product Slots Visual Container
    const itemsGroup = new THREE.Group();
    itemsGroup.position.set(0, 0.75, 0);
    shelfGroup.add(itemsGroup);

    const shelfData = {
      type: 'shelf',
      shelfType: shelfType,
      itemType: shelfType === 'shelf_paste' ? 'paste' : 'tomato',
      position: pos,
      radius: 2.0,
      itemCount: 4, // Initial starting stock
      maxCapacity: 20,
      group: shelfGroup,
      itemsGroup: itemsGroup
    };

    this.shelves.push(shelfData);
    this.interactiveObjects.push(shelfData);
    this.scene.add(shelfGroup);

    // Physical obstacle for shelf
    this.addObstacleBox(pos.x - 1.2, pos.x + 1.2, pos.z - 0.6, pos.z + 0.6);

    this.updateShelfVisuals(shelfData);
    return shelfGroup;
  }

  updateShelfVisuals(shelf) {
    while (shelf.itemsGroup.children.length > 0) {
      const child = shelf.itemsGroup.children[0];
      shelf.itemsGroup.remove(child);
      if (child.geometry) child.geometry.dispose();
    }

    const itemInfo = ITEMS[shelf.itemType] || { color: 0xff3b30 };
    const maxRows = Math.min(shelf.itemCount, 8);

    for (let i = 0; i < maxRows; i++) {
      const boxGeo = new THREE.BoxGeometry(0.35, 0.25, 0.35);
      const boxMat = createBrutalistMaterial(itemInfo.color);
      const box = new THREE.Mesh(boxGeo, boxMat);
      const ox = (i % 4) * 0.45 - 0.7;
      const oy = Math.floor(i / 4) * 0.3;
      box.position.set(ox, oy, 0.2);
      shelf.itemsGroup.add(box);
    }
  }

  spawnMachine(machineType, pos, rotY = 0) {
    const machineGroup = new THREE.Group();
    machineGroup.position.copy(pos);
    machineGroup.rotation.y = rotY;

    // Heavy Boiler Base
    const baseGeo = new THREE.CylinderGeometry(1.0, 1.1, 1.6, 10);
    const baseMat = createBrutalistMaterial(0x3a3d44);
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.8;
    baseMesh.castShadow = true;
    attachToonOutline(baseMesh, 0.04);
    machineGroup.add(baseMesh);

    // Steam Chimney Pipe
    const pipeGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.2, 6);
    const pipeMat = createBrutalistMaterial(0x1a1c20);
    const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
    pipeMesh.position.set(0.4, 2.0, -0.3);
    machineGroup.add(pipeMesh);

    // 3D Progress Bar Billboard
    const barBackGeo = new THREE.PlaneGeometry(1.4, 0.22);
    const barBackMat = new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.DoubleSide });
    const barBack = new THREE.Mesh(barBackGeo, barBackMat);
    barBack.position.set(0, 2.5, 0);
    machineGroup.add(barBack);

    const barFillGeo = new THREE.PlaneGeometry(1.36, 0.18);
    const barFillMat = new THREE.MeshBasicMaterial({ color: 0xff5500, side: THREE.DoubleSide });
    const barFill = new THREE.Mesh(barFillGeo, barFillMat);
    barFill.position.set(0, 2.5, 0.01);
    barFill.scale.set(0.001, 1, 1);
    machineGroup.add(barFill);

    const machineData = {
      type: 'machine',
      machineType: machineType,
      inputItem: 'tomato',
      outputItem: 'paste',
      inputCount: 0,
      inputNeeded: 2,
      outputCount: 0,
      maxOutput: 6,
      cookDuration: 3.5,
      cookTimer: 0,
      isCooking: false,
      position: pos,
      radius: 2.2,
      group: machineGroup,
      barFill: barFill
    };

    this.machines.push(machineData);
    this.interactiveObjects.push(machineData);
    this.scene.add(machineGroup);

    // Physical obstacle for machine
    this.addObstacleBox(pos.x - 1.1, pos.x + 1.1, pos.z - 1.1, pos.z + 1.1);
    return machineGroup;
  }

  initCheckoutCounter(pos) {
    const counterGroup = new THREE.Group();
    counterGroup.position.copy(pos);

    // Counter Desk
    const deskGeo = new THREE.BoxGeometry(2.6, 1.0, 1.2);
    const deskMat = createBrutalistMaterial(0x00d4ff); // Neon cyan checkout
    const deskMesh = new THREE.Mesh(deskGeo, deskMat);
    deskMesh.position.y = 0.5;
    deskMesh.castShadow = true;
    attachToonOutline(deskMesh, 0.04);
    counterGroup.add(deskMesh);

    // Cash Register POS Screen
    const posGeo = new THREE.BoxGeometry(0.4, 0.3, 0.4);
    const posMat = createBrutalistMaterial(0x121316);
    const posMesh = new THREE.Mesh(posGeo, posMat);
    posMesh.position.set(-0.6, 1.15, 0);
    attachToonOutline(posMesh, 0.03);
    counterGroup.add(posMesh);

    // Money Plate Table
    const plateGeo = new THREE.BoxGeometry(0.8, 0.08, 0.8);
    const plateMat = createBrutalistMaterial(0x00ff66);
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.set(0.6, 1.04, 0);
    counterGroup.add(plateMesh);

    this.cashPlateGroup = new THREE.Group();
    this.cashPlateGroup.position.set(0.6, 1.08, 0);
    counterGroup.add(this.cashPlateGroup);

    this.checkoutData = {
      type: 'checkout',
      position: pos,
      radius: 2.2,
      counterGroup: counterGroup,
      cashPlateGroup: this.cashPlateGroup,
      cashBalanceOnDesk: 0
    };

    this.interactiveObjects.push(this.checkoutData);
    this.scene.add(counterGroup);

    // Physical obstacle for counter
    this.addObstacleBox(pos.x - 1.3, pos.x + 1.3, pos.z - 0.6, pos.z + 0.6);
  }

  addCashToDesk(amount) {
    this.checkoutData.cashBalanceOnDesk += amount;
    this.updateCashVisuals();
  }

  collectCashFromDesk() {
    const collected = this.checkoutData.cashBalanceOnDesk;
    this.checkoutData.cashBalanceOnDesk = 0;
    this.updateCashVisuals();
    return collected;
  }

  updateCashVisuals() {
    const group = this.checkoutData.cashPlateGroup;
    while (group.children.length > 0) {
      const c = group.children[0];
      group.remove(c);
      if (c.geometry) c.geometry.dispose();
    }

    const billsCount = Math.min(12, Math.floor(this.checkoutData.cashBalanceOnDesk / 6));
    for (let i = 0; i < billsCount; i++) {
      const billGeo = new THREE.BoxGeometry(0.4, 0.06, 0.25);
      const billMat = createBrutalistMaterial(0x00ff66);
      const bill = new THREE.Mesh(billGeo, billMat);
      bill.position.set(0, i * 0.07, 0);
      bill.rotation.y = (Math.random() - 0.5) * 0.3;
      group.add(bill);
    }
  }

  findShelfWithItem(itemType) {
    return this.shelves.find((s) => s.itemType === itemType);
  }

  getCheckoutPos() {
    return this.checkoutData.position;
  }

  getQueueIndex(customer) {
    const queue = this.customers.filter((c) => c.state === 'TO_CHECKOUT' || c.state === 'WAITING_PAYMENT');
    const index = queue.indexOf(customer);
    return Math.max(0, index);
  }

  update(dt) {
    // Farm growth loop
    if (this.farmData && this.farmData.plants) {
      this.farmData.plants.forEach((p) => {
        if (!p.isRipe) {
          p.growTimer += dt;
          if (p.growTimer >= 2.5) {
            p.isRipe = true;
            p.fruit.visible = true;
            p.fruit.scale.set(0.1, 0.1, 0.1);
          }
        } else if (p.fruit.scale.x < 1.0) {
          p.fruit.scale.addScalar(dt * 3.0);
          if (p.fruit.scale.x > 1.0) p.fruit.scale.set(1, 1, 1);
        }
      });
    }

    // Machine Cooking Loops
    this.machines.forEach((m) => {
      if (m.isCooking) {
        m.cookTimer += dt;
        const progress = Math.min(1.0, m.cookTimer / m.cookDuration);
        m.barFill.scale.x = Math.max(0.001, progress);

        if (m.cookTimer >= m.cookDuration) {
          m.isCooking = false;
          m.cookTimer = 0;
          m.barFill.scale.x = 0.001;
          m.outputCount++;
        }
      } else if (m.inputCount >= m.inputNeeded && m.outputCount < m.maxOutput) {
        m.inputCount -= m.inputNeeded;
        m.isCooking = true;
        m.cookTimer = 0;
      }
    });
  }
}
