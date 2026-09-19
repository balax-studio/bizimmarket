// 3D Procedural Entities & Game Objects for My Mini Mart
// Low Poly Cubic / Voxel Art Direction (Crossy Road / Minecraft blocky aesthetic)
// ponytail: all 3D geometries are generated with Three.js BoxGeometry primitives to eliminate external 3D asset downloads.

const ITEM_TYPES = {
  TOMATO: { name: 'Domates', color: 0xff4757, price: 5 },
  EGG: { name: 'Yumurta', color: 0xf5f6fa, price: 12 },
  WHEAT: { name: 'Buğday', color: 0xf1c40f, price: 8 },
  FLOUR: { name: 'Un', color: 0xfffdf5, price: 16 },
  BREAD: { name: 'Ekmek', color: 0xd35400, price: 28 },
  MILK: { name: 'Süt', color: 0xffffff, price: 36 },
  CHEESE: { name: 'Peynir', color: 0xffe600, price: 54 },
  CORN: { name: 'Mısır', color: 0xffe600, price: 10 },
  POPCORN: { name: 'Patlamış Mısır', color: 0xff7675, price: 45 },
  APPLE: { name: 'Elma', color: 0xd63031, price: 14 },
  APPLE_JUICE: { name: 'Elma Suyu', color: 0xf39c12, price: 38 },
  APPLE_PIE: { name: 'Elmalı Turta', color: 0xe67e22, price: 75 },
  STRAWBERRY: { name: 'Çilek', color: 0xff2a55, price: 12 },
  CARROT: { name: 'Havuç', color: 0xe67e22, price: 10 },
  STRAWBERRY_JAM: { name: 'Çilek Reçeli', color: 0xd63031, price: 48 },
  PIZZA: { name: 'Gurme Pizza', color: 0xe74c3c, price: 120 },
  ICE_CREAM: { name: 'Kremalı Dondurma', color: 0xff7675, price: 95 },
  SALAD_BOWL: { name: 'Akdeniz Salatası', color: 0x2ed573, price: 70 },
  TOAST: { name: 'Kızarmış Tost', color: 0xcd853f, price: 34 }
};

function getItemDisplayName(itemType) {
  return (ITEM_TYPES[itemType] && ITEM_TYPES[itemType].name) || String(itemType || '').replace(/_/g, ' ');
}

const _wayfindingFloorTextureCache = {};

function getWayfindingFloorTexture(label, background = '#FFE600') {
  const key = `${label}-${background}`;
  if (_wayfindingFloorTextureCache[key]) return _wayfindingFloorTextureCache[key];
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 18;
  ctx.strokeRect(9, 9, canvas.width - 18, canvas.height - 18);
  ctx.fillStyle = '#111111';
  ctx.font = label.length > 12 ? '900 48px Arial Black, sans-serif' : '900 58px Arial Black, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, canvas.width / 2, canvas.height / 2, canvas.width - 42);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  _wayfindingFloorTextureCache[key] = texture;
  return texture;
}

const _residentBadgeTextureCache = {};

function getResidentBadgeTexture(name, affinity = 0) {
  const label = affinity > 0 ? `[LV${affinity}] ${name}` : name;
  const key = `${name}-${affinity}`;
  if (_residentBadgeTextureCache[key]) return _residentBadgeTextureCache[key];
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFE600';
  ctx.fillRect(0, 0, 384, 96);
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(5, 5, 374, 86);
  ctx.font = '900 32px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#111111';
  ctx.fillText(label, 192, 48, 360);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  _residentBadgeTextureCache[key] = tex;
  return tex;
}

// Visual-only factory cell. It lives inside each machine group and never registers
// collision geometry, so existing navigation and interaction pads stay unchanged.
function createProductionFlowArrow(parent, x, direction, color) {
  const arrow = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.65 });
  const stem = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.025, 0.13), material);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.025, 0.34), material);
  const tip = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.025, 0.16), material);
  stem.position.x = -0.12 * direction;
  head.position.x = 0.13 * direction;
  tip.position.x = 0.28 * direction;
  tip.rotation.y = Math.PI / 4;
  arrow.position.set(x, 0.052, 0);
  arrow.scale.x = direction;
  arrow.add(stem, head, tip);
  parent.add(arrow);
  return arrow;
}

function createProductionFloorKit(machineGroup, accentColor = 0xffe600) {
  const floorKit = new THREE.Group();
  floorKit.userData.productionZone = true;

  const darkTile = new THREE.MeshStandardMaterial({ color: 0x5d6670, roughness: 0.95 });
  const lightTile = new THREE.MeshStandardMaterial({ color: 0x747f8b, roughness: 0.95 });
  floorKit.userData.tileMaterials = [darkTile, lightTile];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(1.08, 0.025, 1.08),
        (row + col) % 2 === 0 ? darkTile : lightTile
      );
      tile.position.set(-1.62 + col * 1.08, 0.012, -1.08 + row * 1.08);
      tile.receiveShadow = true;
      floorKit.add(tile);
    }
  }

  const hazardStripe = new THREE.Group();
  const yellow = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.7 });
  const black = new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.8 });
  const addStripeRow = (z) => {
    for (let i = 0; i < 12; i++) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.035, 0.18), i % 2 === 0 ? yellow : black);
      stripe.position.set(-1.98 + i * 0.36, 0.035, z);
      hazardStripe.add(stripe);
    }
  };
  addStripeRow(-1.72);
  addStripeRow(1.72);
  floorKit.add(hazardStripe);

  floorKit.userData.inputArrow = createProductionFlowArrow(floorKit, -1.95, 1, accentColor);
  floorKit.userData.outputArrow = createProductionFlowArrow(floorKit, 1.95, 1, 0x2ed573);
  floorKit.userData.inputArrow.userData.material = floorKit.userData.inputArrow.children[0].material;
  floorKit.userData.outputArrow.userData.material = floorKit.userData.outputArrow.children[0].material;
  machineGroup.add(floorKit);
  return floorKit;
}

const _productionSafetyTextureCache = {};

function getProductionSafetyTexture(label, color) {
  const key = `${label}-${color}`;
  if (_productionSafetyTextureCache[key]) return _productionSafetyTextureCache[key];
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
  ctx.fillStyle = '#000000';
  ctx.font = '900 30px Arial Black, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, canvas.width / 2, canvas.height / 2, canvas.width - 24);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 2;
  texture.needsUpdate = true;
  _productionSafetyTextureCache[key] = texture;
  return texture;
}

function createProductionDecorKit(machineGroup, accentColor) {
  const decor = new THREE.Group();
  decor.userData.visualOnly = true;
  const wood = new THREE.MeshStandardMaterial({ color: 0x9c6b30, roughness: 0.85 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.75 });
  const crateMat = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.7 });

  for (let i = 0; i < 3; i++) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.08, 0.16), wood);
    slat.position.set(1.86, 0.06, 0.82 + i * 0.22);
    decor.add(slat);
  }
  const crate = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.46, 0.58), crateMat);
  crate.position.set(1.86, 0.34, 1.03);
  decor.add(crate);
  const crateBandA = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.08, 0.12), dark);
  crateBandA.position.set(1.86, 0.34, 1.34);
  const crateBandB = crateBandA.clone();
  crateBandB.position.y = 0.18;
  decor.add(crateBandA, crateBandB);

  const cableChannel = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.05, 0.13), dark);
  cableChannel.position.set(0, 0.045, -1.48);
  decor.add(cableChannel);

  const labels = [
    ['GUVENLI ALAN', '#FFE600', 0],
    ['HAMMADDE', '#FF7675', -1.48],
    ['MAMUL CIKIS', '#2ED573', 1.48]
  ];
  decor.userData.safetySigns = new THREE.Group();
  labels.forEach(([label, color, x]) => {
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(label === 'GUVENLI ALAN' ? 1.2 : 0.9, 0.26, 0.06),
      new THREE.MeshStandardMaterial({ map: getProductionSafetyTexture(label, color), roughness: 0.5 })
    );
    sign.position.set(x, label === 'GUVENLI ALAN' ? 1.48 : 0.28, -1.5);
    decor.userData.safetySigns.add(sign);
  });
  decor.add(decor.userData.safetySigns);
  decor.userData.safetySigns.visible = false;

  machineGroup.add(decor);
  return decor;
}

const _productionRecipeTextureCache = {};

function getProductionRecipeTexture(recipeLabel) {
  if (_productionRecipeTextureCache[recipeLabel]) return _productionRecipeTextureCache[recipeLabel];
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFDF5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FFE600';
  ctx.fillRect(0, 0, canvas.width, 34);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);
  ctx.fillStyle = '#000000';
  ctx.font = '900 22px Arial Black, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('URETIM RECETESI', canvas.width / 2, 21);
  ctx.font = recipeLabel.length > 28 ? '900 25px Arial Black, sans-serif' : '900 31px Arial Black, sans-serif';
  ctx.fillText(recipeLabel, canvas.width / 2, 82, canvas.width - 34);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  _productionRecipeTextureCache[recipeLabel] = texture;
  return texture;
}

function createProductionMachineDetails(machineGroup, accentColor = 0xffe600, recipeLabel = 'HAMMADDE > URUN', inputTypes = []) {
  const detailKit = new THREE.Group();
  detailKit.inputTypes = inputTypes;
  detailKit.lastOutputCount = 0;
  detailKit.visualUpdateAccumulator = 0;
  const steel = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.45, metalness: 0.25 });
  const paleSteel = new THREE.MeshStandardMaterial({ color: 0xdfe4ea, roughness: 0.4, metalness: 0.2 });
  const accent = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.45 });

  const consoleBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.34), steel);
  consoleBody.position.set(0, 0.68, -1.2);
  const consoleFace = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.36, 0.05), accent);
  consoleFace.position.set(0, 0.76, -1.39);
  detailKit.add(consoleBody, consoleFace);

  detailKit.controlLights = [];
  [0xff4757, 0xffe600, 0x2ed573].forEach((color, index) => {
    const material = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.15 });
    const light = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.06), material);
    light.position.set(-0.18 + index * 0.18, 0.82, -1.43);
    detailKit.controlLights.push(light);
    detailKit.add(light);
  });

  const pipeTop = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.25, 0.18), paleSteel);
  pipeTop.position.set(0.92, 1.05, -0.72);
  const pipeElbow = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.18, 0.18), paleSteel);
  pipeElbow.position.set(0.68, 1.62, -0.72);
  detailKit.add(pipeTop, pipeElbow);

  detailKit.conveyorRollers = [];
  for (let i = 0; i < 4; i++) {
    const roller = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.13, 0.92), i % 2 === 0 ? steel : paleSteel);
    roller.position.set(1.15 + i * 0.26, 0.12, 0);
    detailKit.conveyorRollers.push(roller);
    detailKit.add(roller);
  }

  detailKit.ventFlaps = [];
  for (let i = 0; i < 3; i++) {
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.07, 0.18), steel);
    flap.position.set(-0.34 + i * 0.34, 1.14, -1.42);
    detailKit.ventFlaps.push(flap);
    detailKit.add(flap);
  }

  detailKit.recipeBoard = new THREE.Group();
  detailKit.recipeBoard.position.set(0, 2.02, -0.76);
  const recipePanel = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.48, 0.08),
    new THREE.MeshStandardMaterial({ map: getProductionRecipeTexture(recipeLabel), roughness: 0.35 })
  );
  detailKit.recipeBoard.add(recipePanel);

  const progressFrame = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.18, 0.09), steel);
  progressFrame.position.set(0, -0.36, 0);
  detailKit.recipeBoard.add(progressFrame);
  detailKit.progressFill = new THREE.Mesh(
    new THREE.BoxGeometry(1.36, 0.10, 0.11),
    new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 0.25 })
  );
  detailKit.progressFill.position.set(-0.68, -0.36, 0.01);
  detailKit.progressFill.scale.x = 0.001;
  detailKit.recipeBoard.add(detailKit.progressFill);
  detailKit.recipeBoard.visible = false;
  detailKit.add(detailKit.recipeBoard);

  detailKit.blockedSign = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 0.42, 0.10),
    new THREE.MeshStandardMaterial({
      map: getMachineStatusTexture('OUTPUT_BLOCKED', 'CIKIS DOLU', 'URUNLERI TOPLA', '#FF7A00', '#000000'),
      roughness: 0.35
    })
  );
  detailKit.blockedSign.position.set(0, 2.82, -0.76);
  detailKit.blockedSign.visible = false;
  detailKit.add(detailKit.blockedSign);

  detailKit.completionBurst = new THREE.Group();
  detailKit.completionBurst.position.set(1.45, 1.35, 0);
  detailKit.completionBurst.visible = false;
  const burstColors = [0xffe600, 0x2ed573, accentColor];
  for (let i = 0; i < 8; i++) {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.12, 0.12),
      new THREE.MeshStandardMaterial({ color: burstColors[i % burstColors.length], roughness: 0.4 })
    );
    const angle = (Math.PI * 2 * i) / 8;
    cube.userData.burstDirection = new THREE.Vector3(Math.cos(angle), 0.65 + (i % 2) * 0.25, Math.sin(angle));
    detailKit.completionBurst.add(cube);
  }
  detailKit.add(detailKit.completionBurst);

  detailKit.decor = createProductionDecorKit(machineGroup, accentColor);

  machineGroup.add(detailKit);
  return detailKit;
}

function updateProductionVisualDensity(machine, detailKit, playerDistance, isNearby, blocked) {
  const showRecipe = isNearby || blocked;
  const showStatus = playerDistance < 10 || blocked;
  const showSafetySigns = playerDistance < 7;

  detailKit.recipeBoard.visible = showRecipe;
  detailKit.recipeBoard.position.y = blocked ? 2.34 : 2.02;
  detailKit.blockedSign.position.y = 2.82;
  if (machine.statusGroup) machine.statusGroup.visible = showStatus;
  if (detailKit.decor && detailKit.decor.userData.safetySigns) {
    detailKit.decor.userData.safetySigns.visible = showSafetySigns;
  }
}

function updateProductionMachineDetails(machine, delta, time, active, outputCount, progress = 0, outputCapacity = 6) {
  const detailKit = machine.productionDetails;
  if (!detailKit) return;
  const ready = outputCount > 0;
  const blocked = outputCount >= outputCapacity;

  detailKit.conveyorRollers.forEach((roller, index) => {
    roller.rotation.x += delta * (active ? 6 : 0.6) * (index % 2 === 0 ? 1 : -1);
  });
  detailKit.ventFlaps.forEach((flap, index) => {
    flap.rotation.x = active ? Math.sin(time * 7 + index * 0.65) * 0.32 : 0;
  });

  const signalColor = blocked ? 0xff7a00 : ready ? 0x2ed573 : active ? 0x00cec9 : 0xff4757;
  const controlColors = [0xff4757, blocked ? 0xff7a00 : 0xffe600, 0x2ed573];
  detailKit.controlLights.forEach((light, index) => {
    const isSelected = index === (blocked ? 1 : ready ? 2 : active ? 1 : 0);
    light.material.color.setHex(controlColors[index]);
    light.material.emissive.setHex(controlColors[index]);
    light.material.emissiveIntensity = isSelected ? 1.2 : 0.08;
    light.scale.setScalar(isSelected ? 1 + Math.sin(time * 6) * 0.12 : 1);
  });
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const displayedProgress = active ? clampedProgress : ready ? 1 : 0;
  detailKit.progressFill.scale.x = Math.max(0.001, displayedProgress);
  detailKit.progressFill.position.x = -0.68 + displayedProgress * 0.68;
  detailKit.progressFill.material.emissiveIntensity = active ? 0.75 : 0.25;
  const cam = window.gameInstance && window.gameInstance.camera;
  if (cam && detailKit.recipeBoard) {
    detailKit.recipeBoard.quaternion.copy(machine.group.quaternion).invert().multiply(cam.quaternion);
    detailKit.blockedSign.quaternion.copy(machine.group.quaternion).invert().multiply(cam.quaternion);
  }
  detailKit.blockedSign.visible = blocked;

  if (outputCount > detailKit.lastOutputCount) {
    detailKit.burstLife = 0.8;
    detailKit.completionBurst.visible = detailKit.isNearby;
    detailKit.completionBurst.children.forEach(cube => cube.position.set(0, 0, 0));
  }
  detailKit.lastOutputCount = outputCount;
  if (detailKit.burstLife > 0) {
    detailKit.burstLife -= delta;
    const burstProgress = 1 - Math.max(0, detailKit.burstLife) / 0.8;
    detailKit.completionBurst.children.forEach((cube, index) => {
      cube.position.copy(cube.userData.burstDirection).multiplyScalar(burstProgress * 0.72);
      cube.rotation.x += delta * (5 + index);
      cube.rotation.y += delta * 6;
      cube.scale.setScalar(Math.max(0.05, 1 - burstProgress));
    });
    if (detailKit.burstLife <= 0) detailKit.completionBurst.visible = false;
  }

  detailKit.visualUpdateAccumulator += delta;
  if (detailKit.visualUpdateAccumulator >= 0.1) {
    detailKit.visualUpdateAccumulator = 0;
    const game = window.gameInstance;
    const player = game && game.player;
    const playerDistance = player ? player.group.position.distanceTo(machine.group.position) : Infinity;
    const isNearby = playerDistance < 4.2;
    const carriedTypes = new Set((player && player.stack ? player.stack : []).map(item => item.type));
    const canSupply = detailKit.inputTypes.some(inputType => carriedTypes.has(inputType));
    detailKit.isNearby = isNearby;
    detailKit.canSupply = canSupply;
    updateProductionVisualDensity(machine, detailKit, playerDistance, isNearby, blocked);
    if (machine.productionFloor) {
      const floorKit = machine.productionFloor;
      floorKit.userData.tileMaterials.forEach(material => {
        material.emissive.setHex(isNearby ? 0xffe600 : 0x000000);
        material.emissiveIntensity = isNearby ? 0.18 : 0;
      });
      floorKit.userData.inputArrow.userData.material.emissive.setHex(canSupply ? 0x2ed573 : 0x000000);
      floorKit.userData.inputArrow.userData.material.emissiveIntensity = canSupply ? 0.9 : 0;
      floorKit.userData.outputArrow.userData.material.emissive.setHex(ready ? 0x2ed573 : 0x000000);
      floorKit.userData.outputArrow.userData.material.emissiveIntensity = ready ? 1 : 0;
    }
  }
  detailKit.recipeBoard.scale.setScalar(detailKit.isNearby ? 1.14 : 0.9);
  detailKit.userData.signalColor = signalColor;
}

// --- High-Performance Procedural Neo-Brutalist Canvas Signboard & Dynamic Alert Engine ---
const _shelfSignTextureCache = {};
const _shelfAlertTextureCache = {};
const _machineSignTextureCache = {};
const _comicBurstTextureCache = {};

function getComicBurstTexture(text = '💥 ÇAT!') {
  if (_comicBurstTextureCache[text]) return _comicBurstTextureCache[text];
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  // Comic multi-pointed explosion starburst
  const cx = 192, cy = 192, outerR = 175, innerR = 85, points = 16;
  ctx.save();
  ctx.translate(cx, cy);

  // Hard black offset drop shadow
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i * Math.PI) / points;
    const x = Math.cos(a) * r + 10;
    const y = Math.sin(a) * r + 10;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = '#000000';
  ctx.fill();

  // Vibrant red background starburst
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i * Math.PI) / points;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = '#FF4757';
  ctx.fill();
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#000000';
  ctx.stroke();

  // Inner yellow starburst
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = (i % 2 === 0 ? outerR : innerR) * 0.78;
    const a = (i * Math.PI) / points + 0.1;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = '#FFE600';
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#000000';
  ctx.stroke();

  // Bold Comic Text
  ctx.rotate(-0.08);
  ctx.font = '900 60px "Impact", "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000000';
  ctx.fillText(text, 5, 5);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(text, 0, 0);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#000000';
  ctx.strokeText(text, 0, 0);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  _comicBurstTextureCache[text] = texture;
  return texture;
}

function getShelfSignTexture(itemType) {
  if (_shelfSignTextureCache[itemType]) {
    return _shelfSignTextureCache[itemType];
  }
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 144;
  const ctx = canvas.getContext('2d');

  const meta = {
    TOMATO: { name: 'DOMATES', category: 'TAZE MANAV', bg: '#FF4757', text: '#FFFFFF', subBg: '#1E272E', price: '₺5' },
    EGG: { name: 'YUMURTA', category: 'KÖY ÇİFTLİĞİ', bg: '#F5F6FA', text: '#1E272E', subBg: '#FF4757', price: '₺12' },
    WHEAT: { name: 'BUĞDAY', category: 'DOĞAL HASAT', bg: '#F1C40F', text: '#1E272E', subBg: '#D35400', price: '₺8' },
    FLOUR: { name: 'UN', category: 'TAŞ DEĞİRMEN', bg: '#FFFDF5', text: '#1E272E', subBg: '#E67E22', price: '₺16' },
    BREAD: { name: 'EKMEK', category: 'FIRINDAN TAZE', bg: '#D35400', text: '#FFFFFF', subBg: '#2C3E50', price: '₺28' },
    MILK: { name: 'SÜT', category: 'GÜNLÜK SÜT', bg: '#0984E3', text: '#FFFFFF', subBg: '#111111', price: '₺36' },
    CHEESE: { name: 'PEYNİR', category: 'ŞARKÜTERİ', bg: '#FFE600', text: '#1E272E', subBg: '#D35400', price: '₺54' },
    CORN: { name: 'MISIR', category: 'TATLI MISIR', bg: '#F1C40F', text: '#1E272E', subBg: '#27AE60', price: '₺10' },
    POPCORN: { name: 'PATLAMIŞ MISIR', category: 'SICAK SNACK', bg: '#E74C3C', text: '#FFFFFF', subBg: '#F1C40F', subText: '#000', price: '₺45' },
    APPLE: { name: 'ELMA', category: 'MEYVE BAHÇESİ', bg: '#D63031', text: '#FFFFFF', subBg: '#27AE60', price: '₺14' },
    APPLE_JUICE: { name: 'ELMA SUYU', category: 'SOĞUK SIKIM', bg: '#F39C12', text: '#FFFFFF', subBg: '#2C3E50', price: '₺38' },
    APPLE_PIE: { name: 'ELMALI TURTA', category: 'GURME FIRIN', bg: '#E67E22', text: '#FFFFFF', subBg: '#8E44AD', price: '₺75' },
    STRAWBERRY: { name: 'ÇİLEK', category: 'SERA ÇİLEĞİ', bg: '#FF2A55', text: '#FFFFFF', subBg: '#2ED573', price: '₺12' },
    CARROT: { name: 'HAVUÇ', category: 'ORGANİK MANAV', bg: '#FF793F', text: '#FFFFFF', subBg: '#2ED573', price: '₺10' },
    STRAWBERRY_JAM: { name: 'ÇİLEK REÇELİ', category: 'EV YAPIMI', bg: '#D63031', text: '#FFFFFF', subBg: '#FF2A55', price: '₺48' },
    PIZZA: { name: 'GURME PİZZA', category: 'ODUN FIRINI', bg: '#D35400', text: '#FFFFFF', subBg: '#27AE60', price: '₺120' },
    ICE_CREAM: { name: 'DONDURMA', category: 'İTALYAN GELATO', bg: '#00CEC9', text: '#1E272E', subBg: '#FF7675', subText: '#FFF', price: '₺95' },
    SALAD_BOWL: { name: 'AKDENİZ SALATA', category: 'SAĞLIKLI KASE', bg: '#2ECC71', text: '#FFFFFF', subBg: '#1E272E', price: '₺70' }
  }[itemType] || { name: itemType, category: 'SÜPERMARKET', bg: '#74B9FF', text: '#FFFFFF', subBg: '#1E272E', price: '₺10' };

  // 1. Background Fill
  ctx.fillStyle = meta.bg;
  ctx.fillRect(0, 0, 512, 144);

  // 2. Thick Neo-Brutalist Black Border
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(6, 6, 500, 132);

  // 3. Category Tag Pill at Top Left
  ctx.fillStyle = meta.subBg;
  ctx.fillRect(16, 14, 250, 34);
  ctx.strokeRect(16, 14, 250, 34);
  ctx.fillStyle = meta.subText || '#FFFFFF';
  ctx.font = '900 18px "Courier New", monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`★ ${meta.category} ★`, 141, 31);

  // 4. Price Badge on Top Right
  ctx.fillStyle = '#111111';
  ctx.fillRect(366, 14, 130, 34);
  ctx.strokeRect(366, 14, 130, 34);
  ctx.fillStyle = '#FFE600';
  ctx.font = '900 22px "Impact", "Arial Black", sans-serif';
  ctx.fillText(meta.price, 431, 31);

  // 5. Main Product Turkish Title (Centered, Extra Bold, Black Outline for 100% Readability)
  ctx.font = '900 50px "Impact", "Arial Black", "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 8;
  ctx.strokeText(meta.name, 256, 92);
  ctx.fillStyle = meta.text || '#FFFFFF';
  ctx.fillText(meta.name, 256, 92);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  _shelfSignTextureCache[itemType] = texture;
  return texture;
}

function getEmptyAlertTexture(itemType) {
  if (_shelfAlertTextureCache[itemType]) {
    return _shelfAlertTextureCache[itemType];
  }
  const canvas = document.createElement('canvas');
  canvas.width = 440;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');

  // Vibrant alert yellow
  ctx.fillStyle = '#FFE600';
  ctx.fillRect(0, 0, 440, 140);

  // Hazard striped warning bars
  ctx.fillStyle = '#FF4757';
  ctx.fillRect(0, 0, 440, 22);
  ctx.fillRect(0, 118, 440, 22);

  // Black diagonal stripes
  ctx.fillStyle = '#111111';
  for (let x = -20; x < 460; x += 36) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 18, 0);
    ctx.lineTo(x + 8, 22);
    ctx.lineTo(x - 10, 22);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x, 118);
    ctx.lineTo(x + 18, 118);
    ctx.lineTo(x + 8, 140);
    ctx.lineTo(x - 10, 140);
    ctx.closePath();
    ctx.fill();
  }

  // Thick black border
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(5, 5, 430, 130);

  // Main Alert Text
  ctx.font = '900 42px "Impact", "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 7;
  ctx.strokeText('STOK BİTTİ', 220, 56);
  ctx.fillStyle = '#FF4757';
  ctx.fillText('STOK BİTTİ', 220, 56);

  ctx.font = '900 24px "Courier New", monospace, sans-serif';
  ctx.fillStyle = '#111111';
  ctx.fillText('STOK BEKLİYOR (0/16)', 220, 94);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  _shelfAlertTextureCache[itemType] = texture;
  return texture;
}

function getMachineStatusTexture(key, title, subtext, bgColor = '#F1C40F', textColor = '#111111') {
  const cacheKey = `${key}_${title}_${subtext}_${bgColor}`;
  if (_machineSignTextureCache[cacheKey]) {
    return _machineSignTextureCache[cacheKey];
  }
  const canvas = document.createElement('canvas');
  canvas.width = 460;
  canvas.height = 144;
  const ctx = canvas.getContext('2d');

  // Background Fill
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 460, 144);

  // Black Neo-Brutalist border
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#000000';
  ctx.strokeRect(5, 5, 450, 134);

  // Top Title
  ctx.font = '900 32px "Impact", "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 6;
  ctx.strokeText(title, 230, 46);
  ctx.fillStyle = textColor;
  ctx.fillText(title, 230, 46);

  // Bottom Subtext Pill
  ctx.fillStyle = '#111111';
  ctx.fillRect(20, 84, 420, 40);
  ctx.strokeRect(20, 84, 420, 40);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 20px "Courier New", monospace, sans-serif';
  ctx.fillText(subtext, 230, 104);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  _machineSignTextureCache[cacheKey] = texture;
  return texture;
}

function createVoxelProductLogo(itemType) {
  const group = new THREE.Group();
  if (itemType === 'TOMATO') {
    const bCube = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.34, 0.34),
      new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.25 })
    );
    bCube.castShadow = true;
    const stemCube = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.12, 0.12),
      new THREE.MeshBasicMaterial({ color: 0x25d366 })
    );
    stemCube.position.y = 0.20;
    const starL1 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.08), new THREE.MeshBasicMaterial({ color: 0x2ed573 }));
    starL1.position.y = 0.18;
    const starL2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.28), new THREE.MeshBasicMaterial({ color: 0x2ed573 }));
    starL2.position.y = 0.18;
    group.add(bCube, stemCube, starL1, starL2);
  } else if (itemType === 'EGG') {
    const egg = new THREE.Mesh(
      new THREE.BoxGeometry(0.30, 0.40, 0.30),
      new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.3 })
    );
    egg.castShadow = true;
    const spot = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.12, 0.32),
      new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 })
    );
    group.add(egg, spot);
  } else if (itemType === 'BREAD') {
    const loaf = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.24, 0.30),
      new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.45 })
    );
    loaf.castShadow = true;
    const score1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.18), new THREE.MeshBasicMaterial({ color: 0xffeedb }));
    score1.position.set(-0.09, 0.13, 0);
    const score2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.18), new THREE.MeshBasicMaterial({ color: 0xffeedb }));
    score2.position.set(0.09, 0.13, 0);
    group.add(loaf, score1, score2);
  } else if (itemType === 'CHEESE') {
    const bCheese = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.24, 0.30),
      new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 })
    );
    bCheese.castShadow = true;
    const bRind = new THREE.Mesh(
      new THREE.BoxGeometry(0.39, 0.25, 0.06),
      new THREE.MeshStandardMaterial({ color: 0xe67e22 })
    );
    bRind.position.z = -0.14;
    group.add(bCheese, bRind);
  } else if (itemType === 'MILK') {
    const b = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.38, 0.28),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    );
    b.castShadow = true;
    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.06, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x0984e3 })
    );
    cap.position.y = 0.21;
    const label = new THREE.Mesh(
      new THREE.BoxGeometry(0.29, 0.16, 0.29),
      new THREE.MeshStandardMaterial({ color: 0x74b9ff })
    );
    group.add(b, cap, label);
  } else if (itemType === 'FLOUR') {
    const sack = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.32, 0.30),
      new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.4 })
    );
    sack.castShadow = true;
    const knot = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.09, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
    );
    knot.position.y = 0.19;
    group.add(sack, knot);
  } else if (itemType === 'CORN') {
    const cob = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.40, 0.26), new THREE.MeshStandardMaterial({ color: 0xffe600 }));
    cob.castShadow = true;
    const husk = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.28, 0.30), new THREE.MeshStandardMaterial({ color: 0x2ed573 }));
    husk.position.set(-0.13, -0.06, 0);
    group.add(cob, husk);
  } else if (itemType === 'POPCORN') {
    const cup = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.30, 0.32), new THREE.MeshStandardMaterial({ color: 0xff4757 }));
    cup.castShadow = true;
    const pop = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.14, 0.36), new THREE.MeshStandardMaterial({ color: 0xfffa65 }));
    pop.position.y = 0.19;
    group.add(cup, pop);
  } else if (itemType === 'APPLE') {
    const apple = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.34), new THREE.MeshStandardMaterial({ color: 0xd63031 }));
    apple.castShadow = true;
    const stem = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.08), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
    stem.position.y = 0.21;
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.08), new THREE.MeshBasicMaterial({ color: 0x2ecc71 }));
    leaf.position.set(0.08, 0.21, 0);
    group.add(apple, stem, leaf);
  } else if (itemType === 'APPLE_JUICE') {
    const bot = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.34, 0.26), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 }));
    bot.castShadow = true;
    const jCore = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.26, 0.21), new THREE.MeshStandardMaterial({ color: 0xf39c12 }));
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.14), new THREE.MeshStandardMaterial({ color: 0x2ed573 }));
    cap.position.y = 0.20;
    group.add(bot, jCore, cap);
  } else if (itemType === 'APPLE_PIE') {
    const pan = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.10, 0.40), new THREE.MeshStandardMaterial({ color: 0xbdc3c7 }));
    pan.castShadow = true;
    const lattice = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.08, 0.38), new THREE.MeshStandardMaterial({ color: 0xe67e22 }));
    lattice.position.y = 0.08;
    group.add(pan, lattice);
  } else if (itemType === 'STRAWBERRY') {
    const berry = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.34, 0.32), new THREE.MeshStandardMaterial({ color: 0xff2a55 }));
    berry.castShadow = true;
    const calyx = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.06, 0.34), new THREE.MeshBasicMaterial({ color: 0x25d366 }));
    calyx.position.y = 0.18;
    group.add(berry, calyx);
  } else if (itemType === 'CARROT') {
    const root = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.36, 0.26), new THREE.MeshStandardMaterial({ color: 0xe67e22 }));
    root.castShadow = true;
    const sprig = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.16, 0.10), new THREE.MeshBasicMaterial({ color: 0x2ecc71 }));
    sprig.position.y = 0.23;
    group.add(root, sprig);
  } else if (itemType === 'STRAWBERRY_JAM') {
    const jar = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.32, 0.28), new THREE.MeshStandardMaterial({ color: 0xd63031 }));
    jar.castShadow = true;
    const lid = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.08, 0.30), new THREE.MeshStandardMaterial({ color: 0xff4757 }));
    lid.position.y = 0.18;
    group.add(jar, lid);
  } else if (itemType === 'PIZZA') {
    const pBox = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.10, 0.42), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    pBox.castShadow = true;
    const crust = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.05, 0.36), new THREE.MeshStandardMaterial({ color: 0xd35400 }));
    crust.position.y = 0.06;
    const cheese = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.03, 0.28), new THREE.MeshStandardMaterial({ color: 0xffe600 }));
    cheese.position.y = 0.09;
    group.add(pBox, crust, cheese);
  } else if (itemType === 'ICE_CREAM') {
    const cup = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.20, 0.28), new THREE.MeshStandardMaterial({ color: 0x00d2d3 }));
    cup.castShadow = true;
    const swirl = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.20, 0.30), new THREE.MeshStandardMaterial({ color: 0xff7675 }));
    swirl.position.y = 0.18;
    group.add(cup, swirl);
  } else if (itemType === 'SALAD_BOWL') {
    const bowl = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.16, 0.36), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
    bowl.castShadow = true;
    const greens = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.10, 0.32), new THREE.MeshStandardMaterial({ color: 0x2ed573 }));
    greens.position.y = 0.10;
    group.add(bowl, greens);
  } else {
    const wheat = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.32), new THREE.MeshStandardMaterial({ color: 0xffe600 }));
    wheat.castShadow = true;
    group.add(wheat);
  }
  return group;
}

// --- Generative Art Voxel Particle & Shader VFX Engine ---
// High-performance instanced & pooled cubic particle systems for dusty footsteps,
// golden VIP sparkles, cash fountains, and water ripple explosions!
class VoxelParticleFX {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.boxGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    this.billGeo = new THREE.BoxGeometry(0.24, 0.04, 0.14);
    this.starGeo = new THREE.BoxGeometry(0.18, 0.18, 0.08);

    // Pre-cached shared materials
    this.materials = {
      dust: new THREE.MeshBasicMaterial({ color: 0xdcdde1, transparent: true, opacity: 0.8 }),
      gold: new THREE.MeshBasicMaterial({ color: 0xffe600 }),
      cash: new THREE.MeshBasicMaterial({ color: 0x25d366 }),
      water: new THREE.MeshBasicMaterial({ color: 0x00d2d3, transparent: true, opacity: 0.85 }),
      smoke: new THREE.MeshBasicMaterial({ color: 0x2d3436, transparent: true, opacity: 0.7 }),
      spark: new THREE.MeshBasicMaterial({ color: 0xff4757 })
    };
  }

  // Dust puff on footsteps and sprint dashes
  spawnDustPuff(pos, count = 3, colorHex = null) {
    for (let i = 0; i < count; i++) {
      const mat = colorHex ? new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.7 }) : this.materials.dust.clone();
      const mesh = new THREE.Mesh(this.boxGeo, mat);
      mesh.position.set(
        pos.x + (Math.random() - 0.5) * 0.3,
        0.08 + Math.random() * 0.1,
        pos.z + (Math.random() - 0.5) * 0.3
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const scale = 0.6 + Math.random() * 0.6;
      mesh.scale.set(scale, scale, scale);

      this.scene.add(mesh);
      this.particles.push({
        mesh,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 1.2,
          0.8 + Math.random() * 1.0,
          (Math.random() - 0.5) * 1.2
        ),
        rotVel: new THREE.Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, 0),
        life: 0,
        maxLife: 0.45 + Math.random() * 0.25,
        shrink: true,
        gravity: 2.2
      });
    }
  }

  // Golden star sparkles for VIP arrivals, level ups, and combos
  spawnGoldenSparkles(pos, count = 6) {
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(this.starGeo, this.materials.gold);
      mesh.position.set(
        pos.x + (Math.random() - 0.5) * 0.6,
        pos.y + 0.5 + (Math.random() - 0.5) * 0.5,
        pos.z + (Math.random() - 0.5) * 0.6
      );
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 2.2,
          1.8 + Math.random() * 2.2,
          (Math.random() - 0.5) * 2.2
        ),
        rotVel: new THREE.Vector3(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        life: 0,
        maxLife: 0.7 + Math.random() * 0.3,
        shrink: true,
        gravity: 1.5
      });
    }
  }

  // Cash explosion fountain on high-combo checkout
  spawnCashExplosion(pos, count = 8) {
    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(this.billGeo, this.materials.cash);
      mesh.position.set(
        pos.x + (Math.random() - 0.5) * 0.4,
        pos.y + 0.8,
        pos.z + (Math.random() - 0.5) * 0.4
      );
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 3.5,
          3.5 + Math.random() * 2.5,
          (Math.random() - 0.5) * 3.5
        ),
        rotVel: new THREE.Vector3(Math.random() * 8, Math.random() * 8, Math.random() * 8),
        life: 0,
        maxLife: 0.9 + Math.random() * 0.4,
        shrink: true,
        gravity: 4.8
      });
    }
  }

  // Generic burst emitter for effects & interactions
  spawnTransfer(from, to, colorHex, cash = false) {
    if (this.particles.length >= 256) return;
    const material = new THREE.MeshBasicMaterial({ color: colorHex });
    const mesh = new THREE.Mesh(cash ? this.billGeo : this.starGeo, material);
    const start = from.clone();
    const end = to.clone();
    start.y += 1.1;
    end.y += 1.1;
    mesh.position.copy(start);
    this.scene.add(mesh);
    this.particles.push({ mesh, start, end, transfer: true, life: 0, maxLife: 0.42, ownsMaterial: true });
  }

  emitBurst(pos, colorHex = 0xffe600, count = 8) {
    this.spawnDustPuff(pos, count, colorHex);
  }

  // Expanding generative water ripple on cleaning spills
  spawnWaterRipple(pos, colorHex = 0x00d2d3) {
    const ringGroup = new THREE.Group();
    ringGroup.position.set(pos.x, 0.03, pos.z);

    const count = 8;
    const radius = 0.4;
    const ringMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.9 });

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.12), ringMat);
      b.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      ringGroup.add(b);
    }
    this.scene.add(ringGroup);

    this.particles.push({
      group: ringGroup,
      expandVel: 3.5,
      life: 0,
      maxLife: 0.5,
      isRing: true
    });
  }

  // Smoke trail for running thief
  spawnSmokeTrail(pos) {
    const mesh = new THREE.Mesh(this.boxGeo, this.materials.smoke.clone());
    mesh.position.set(pos.x, 0.4, pos.z);
    this.scene.add(mesh);
    this.particles.push({
      mesh,
      vel: new THREE.Vector3((Math.random() - 0.5) * 0.4, 0.6, (Math.random() - 0.5) * 0.4),
      rotVel: new THREE.Vector3(1, 1, 0),
      life: 0,
      maxLife: 0.5,
      shrink: true,
      gravity: -0.2
    });
  }

  update(delta) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += delta;
      const progress = p.life / p.maxLife;

      if (p.transfer) {
        const t = Math.min(1, progress);
        p.mesh.position.lerpVectors(p.start, p.end, t);
        p.mesh.position.y += Math.sin(t * Math.PI) * 0.8;
        p.mesh.rotation.y = t * Math.PI;
      } else if (p.isRing) {
        const scale = 1.0 + progress * p.expandVel;
        p.group.scale.set(scale, 1, scale);
        p.group.children.forEach(c => {
          if (c.material) c.material.opacity = Math.max(0, 0.9 * (1 - progress));
        });
      } else if (p.mesh) {
        p.mesh.position.addScaledVector(p.vel, delta);
        if (p.gravity) p.vel.y -= p.gravity * delta;
        if (p.rotVel) {
          p.mesh.rotation.x += p.rotVel.x * delta;
          p.mesh.rotation.y += p.rotVel.y * delta;
          p.mesh.rotation.z += p.rotVel.z * delta;
        }
        if (p.shrink) {
          const s = Math.max(0.01, 1 - progress);
          p.mesh.scale.set(s, s, s);
        }
        if (p.mesh.material && p.mesh.material.transparent) {
          p.mesh.material.opacity = Math.max(0, (1 - progress));
        }
      }

      if (p.life >= p.maxLife) {
        if (p.isRing) {
          this.scene.remove(p.group);
        } else if (p.mesh) {
          this.scene.remove(p.mesh);
          if (p.ownsMaterial) p.mesh.material.dispose();
        }
        this.particles.splice(i, 1);
      }
    }
  }
}

// --- Interactive Floor Soda Spill Entity ---
// Low-Poly Voxel Puddle + Crushed Soda Can (Cleanable mini-mechanic)
class SodaSpill {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.isCleaned = false;

    this.group = new THREE.Group();
    this.group.position.set(x, 0.015, z);

    // Random colorful beverage puddle (Cherry Red, Fizzy Lime, Citrus Orange, Bubblegum Cyan)
    const puddleColors = [0xff4757, 0x2ed573, 0xff793f, 0x00d2d3, 0x6c5ce7];
    this.colorHex = puddleColors[Math.floor(Math.random() * puddleColors.length)];

    const puddleMat = new THREE.MeshStandardMaterial({
      color: this.colorHex,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85
    });

    // Main splat shape (chunky overlapping low-poly boxes)
    const mainSplat = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.02, 1.0), puddleMat);
    const subSplat1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.02, 0.8), puddleMat);
    subSplat1.position.set(0.35, 0, 0.25);
    const subSplat2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.02, 0.6), puddleMat);
    subSplat2.position.set(-0.35, 0, -0.2);

    this.group.add(mainSplat, subSplat1, subSplat2);

    // Crushed Low-Poly Aluminum Soda Can
    const canMat = new THREE.MeshStandardMaterial({ color: 0xff5252, metalness: 0.6, roughness: 0.2 });
    const can = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.18), canMat);
    can.position.set(0.1, 0.07, 0.05);
    can.rotation.set(0.15, 0.4, 0.2);
    can.castShadow = true;
    this.group.add(can);

    this.scene.add(this.group);
  }

  update(delta) {
    // Optional gentle bubbling or ripple animation
  }

  clean() {
    if (this.isCleaned) return 0;
    this.isCleaned = true;
    this.scene.remove(this.group);
    return 50; // $50 Cleanliness Bonus
  }
}

// --- Low Poly Cubic Character Controller (Stickman / Voxel Person) ---
class Character3D {
  constructor(scene, color = 0x2ecc71, isPlayer = false, hasCart = false) {
    this.scene = scene;
    this.isPlayer = isPlayer;
    this.hasCart = hasCart;
    this.color = isPlayer ? 0x2ecc71 : color;

    this.group = new THREE.Group();
    this.velocity = new THREE.Vector3();
    this.facingAngle = 0;
    this.lastFacingAngle = 0;
    this.angularVelocity = 0;
    this.walkCycle = 0;
    this.speed = 0;
    this.stepDustCooldown = 0;

    // Backpack stacking items (for player/helpers)
    this.stack = []; 
    this.maxStack = 10;

    // Cart items & wheel elements (for customers pushing shopping carts)
    this.cartItems = [];
    this.cartWheels = [];

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    const shirtColor = this.isPlayer ? 0x2ecc71 : this.color;
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffeedb, roughness: 0.5 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.4 });
    const shortsMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.5 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const soleMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });

    // Root model container
    this.model = new THREE.Group();

    // 1. Torso: Upper Shirt Box + Lower Shorts Box
    const upperTorsoGeo = new THREE.BoxGeometry(0.56, 0.48, 0.38);
    this.upperTorso = new THREE.Mesh(upperTorsoGeo, shirtMat);
    this.upperTorso.position.y = 1.0;
    this.upperTorso.castShadow = true;
    this.model.add(this.upperTorso);

    const lowerTorsoGeo = new THREE.BoxGeometry(0.54, 0.28, 0.36);
    this.lowerTorso = new THREE.Mesh(lowerTorsoGeo, shortsMat);
    this.lowerTorso.position.y = 0.64;
    this.lowerTorso.castShadow = true;
    this.model.add(this.lowerTorso);

    // 2. Cubic Head
    const headGeo = new THREE.BoxGeometry(0.52, 0.52, 0.52);
    this.head = new THREE.Mesh(headGeo, skinMat);
    this.head.position.y = 1.46;
    this.head.castShadow = true;
    this.model.add(this.head);

    // Chunky Cubic Eyes
    const eyeGeo = new THREE.BoxGeometry(0.08, 0.12, 0.04);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.14, 1.48, 0.27);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.14, 1.48, 0.27);
    this.model.add(leftEye, rightEye);

    // 3. Hats & Accessories (All Cubic)
    if (this.isPlayer) {
      // Iconic Red Voxel Visor Cap for Player
      const capMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 });
      
      // Cap Crown Box
      const capCrown = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.20, 0.56), capMat);
      capCrown.position.y = 1.62;
      this.model.add(capCrown);

      // Rectangular Brim protruding forward
      const brim = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.06, 0.26), capMat);
      brim.position.set(0, 1.54, 0.38);
      this.model.add(brim);

      // Cap Top Button
      const btn = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.08, 0.10), shortsMat);
      btn.position.y = 1.74;
      this.model.add(btn);
    } else if (this.hasCart) {
      // Customer voxel hats
      const hatType = Math.floor(Math.random() * 3);
      if (hatType === 0) {
        // Voxel Top hat
        const hatMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4 });
        const brim = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.06, 0.68), hatMat);
        brim.position.y = 1.74;
        const crown = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.42, 0.44), hatMat);
        crown.position.y = 1.96;
        this.model.add(brim, crown);
      } else if (hatType === 1) {
        // Voxel Pink Bow
        const bowMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 });
        const centerKnot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), bowMat);
        centerKnot.position.set(0, 1.76, 0.1);
        const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.08), bowMat);
        wingL.position.set(-0.14, 1.76, 0.1);
        const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.08), bowMat);
        wingR.position.set(0.14, 1.76, 0.1);
        this.model.add(centerKnot, wingL, wingR);
      } else {
        // Voxel Knit Beanie
        const beanieMat = new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.6 });
        const beanieBox = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.22, 0.56), beanieMat);
        beanieBox.position.y = 1.62;
        const pompom = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), beanieMat);
        pompom.position.y = 1.78;
        this.model.add(beanieBox, pompom);
      }
    }

    // 4. Rectangular Legs & Block Sneakers
    const legGeo = new THREE.BoxGeometry(0.18, 0.54, 0.18);
    legGeo.translate(0, -0.27, 0);

    const shoeUpperGeo = new THREE.BoxGeometry(0.24, 0.14, 0.34);
    shoeUpperGeo.translate(0, -0.52, 0.06);

    const soleGeo = new THREE.BoxGeometry(0.25, 0.04, 0.36);
    soleGeo.translate(0, -0.59, 0.06);

    // Left Leg assembly
    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.16, 0.58, 0);
    const leftLegMesh = new THREE.Mesh(legGeo, skinMat);
    leftLegMesh.castShadow = true;
    const leftShoeMesh = new THREE.Mesh(shoeUpperGeo, shoeMat);
    leftShoeMesh.castShadow = true;
    const leftSoleMesh = new THREE.Mesh(soleGeo, soleMat);
    leftSoleMesh.castShadow = true;
    this.leftLeg.add(leftLegMesh, leftShoeMesh, leftSoleMesh);
    this.model.add(this.leftLeg);

    // Right Leg assembly
    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.16, 0.58, 0);
    const rightLegMesh = new THREE.Mesh(legGeo, skinMat);
    rightLegMesh.castShadow = true;
    const rightShoeMesh = new THREE.Mesh(shoeUpperGeo, shoeMat);
    rightShoeMesh.castShadow = true;
    const rightSoleMesh = new THREE.Mesh(soleGeo, soleMat);
    rightSoleMesh.castShadow = true;
    this.rightLeg.add(rightLegMesh, rightShoeMesh, rightSoleMesh);
    this.model.add(this.rightLeg);

    // 5. Rectangular Arms
    const armGeo = new THREE.BoxGeometry(0.16, 0.52, 0.16);
    armGeo.translate(0, -0.24, 0);

    this.leftArm = new THREE.Mesh(armGeo, shirtMat);
    this.leftArm.position.set(-0.38, 1.15, 0);
    this.leftArm.castShadow = true;
    this.model.add(this.leftArm);

    this.rightArm = new THREE.Mesh(armGeo, shirtMat);
    this.rightArm.position.set(0.38, 1.15, 0);
    this.rightArm.castShadow = true;
    this.model.add(this.rightArm);

    // Neo-Brutalist Wooden Baseball Bat / Swat Club (Slapstick Thief Swatting)
    this.batMesh = new THREE.Group();
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.6 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.4 });
    const bandMat = new THREE.MeshBasicMaterial({ color: 0xffe600 });

    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 0.08), handleMat);
    handle.position.set(0, -0.22, 0.12);
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.48, 0.12), woodMat);
    barrel.position.set(0, -0.48, 0.16);
    barrel.castShadow = true;
    const rim = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.14), bandMat);
    rim.position.set(0, -0.38, 0.16);

    this.batMesh.add(handle, barrel, rim);
    this.batMesh.rotation.x = 0.6;
    this.batMesh.visible = false;
    this.rightArm.add(this.batMesh);

    this.isSwatting = false;
    this.swatTimer = 0;

    // 6. Backpack Attachment Bone (for carried tower items)
    this.backpackBone = new THREE.Group();
    this.backpackBone.position.set(0, 0.70, -0.32);
    this.model.add(this.backpackBone);

    // 7. Shopping Cart Attachment (for customers)
    if (this.hasCart) {
      this.initShoppingCart();
    }

    this.group.add(this.model);
  }

  // Trigger forceful slapstick bat swing attack
  triggerSwatAttack() {
    this.isSwatting = true;
    this.swatTimer = 0.38;
    if (this.batMesh) this.batMesh.visible = true;
    window.Sound.playPop();
  }

  // Build the iconic miniature supermarket shopping cart (Voxel / Cubic edition)
  initShoppingCart() {
    this.cartGroup = new THREE.Group();
    this.cartGroup.position.set(0, 0, 0.75);
    this.cartWheels = [];

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0xdcdde1,
      metalness: 0.8,
      roughness: 0.3
    });
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xff5252, // Neo-Brutalist Coral Red push handle
      roughness: 0.3
    });
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.8
    });

    // Wireframe Basket Walls (Built with chunky block bars)
    const basketBottom = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.05, 0.78), metalMat);
    basketBottom.position.y = 0.45;
    basketBottom.castShadow = true;
    this.cartGroup.add(basketBottom);

    const wallThickness = 0.04;
    const basketHeight = 0.42;

    // Front wall
    const fWall = new THREE.Mesh(new THREE.BoxGeometry(0.68, basketHeight, wallThickness), metalMat);
    fWall.position.set(0, 0.45 + basketHeight / 2, 0.37);
    fWall.castShadow = true;
    // Back wall
    const bWall = new THREE.Mesh(new THREE.BoxGeometry(0.68, basketHeight, wallThickness), metalMat);
    bWall.position.set(0, 0.45 + basketHeight / 2, -0.37);
    bWall.castShadow = true;
    // Left wall
    const lWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, basketHeight, 0.78), metalMat);
    lWall.position.set(-0.32, 0.45 + basketHeight / 2, 0);
    lWall.castShadow = true;
    // Right wall
    const rWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, basketHeight, 0.78), metalMat);
    rWall.position.set(0.32, 0.45 + basketHeight / 2, 0);
    rWall.castShadow = true;

    this.cartGroup.add(fWall, bWall, lWall, rWall);

    // Push Handle Posts & Grip Bar (Cubic)
    const postGeo = new THREE.BoxGeometry(0.04, 0.36, 0.04);
    const leftPost = new THREE.Mesh(postGeo, metalMat);
    leftPost.position.set(-0.28, 0.95, -0.38);
    leftPost.rotation.x = -0.2;
    const rightPost = new THREE.Mesh(postGeo, metalMat);
    rightPost.position.set(0.28, 0.95, -0.38);
    rightPost.rotation.x = -0.2;
    this.cartGroup.add(leftPost, rightPost);

    const handleGrip = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.06, 0.06), handleMat);
    handleGrip.position.set(0, 1.10, -0.42);
    this.cartGroup.add(handleGrip);

    // 4 Chunky Voxel Caster Wheels
    const wheelGeo = new THREE.BoxGeometry(0.12, 0.12, 0.08);
    const wheelOffsets = [
      [-0.28, 0.06, 0.3],
      [0.28, 0.06, 0.3],
      [-0.28, 0.06, -0.3],
      [0.28, 0.06, -0.3]
    ];
    wheelOffsets.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(wx, wy, wz);
      wheel.castShadow = true;
      this.cartGroup.add(wheel);
      this.cartWheels.push(wheel);
    });

    // Cart Items Mount Group
    this.cartItemsMount = new THREE.Group();
    this.cartItemsMount.position.set(0, 0.48, 0);
    this.cartGroup.add(this.cartItemsMount);

    this.model.add(this.cartGroup);

    // Pose arms forward holding the cart handle
    this.leftArm.rotation.x = -0.55;
    this.leftArm.rotation.z = -0.15;
  }

  // Helper to create a chunky cubic item mesh
  createCubicItemMesh(type, scale = 1.0) {
    const itemData = ITEM_TYPES[type] || ITEM_TYPES.TOMATO;
    let mesh;

    if (type === 'TOMATO') {
      mesh = new THREE.Group();
      // Red Cube Body
      const bodyMat = new THREE.MeshStandardMaterial({
        color: itemData.color,
        roughness: 0.25
      });
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.30 * scale, 0.30 * scale, 0.30 * scale), bodyMat);
      body.castShadow = true;
      mesh.add(body);

      // Green Cube Stem
      const stemMat = new THREE.MeshBasicMaterial({ color: 0x25d366 });
      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.08 * scale, 0.10 * scale, 0.08 * scale), stemMat);
      stem.position.y = 0.18 * scale;
      mesh.add(stem);
    } else if (type === 'EGG') {
      // Crisp Cubic White Egg Block
      const eggMat = new THREE.MeshStandardMaterial({
        color: 0xfafafa,
        roughness: 0.3
      });
      mesh = new THREE.Mesh(new THREE.BoxGeometry(0.26 * scale, 0.34 * scale, 0.26 * scale), eggMat);
      mesh.castShadow = true;
    } else if (type === 'WHEAT') {
      // Golden Wheat Bushel Box with cross binding
      mesh = new THREE.Group();
      const wheatMat = new THREE.MeshStandardMaterial({
        color: 0xf1c40f,
        roughness: 0.6
      });
      const sheaf = new THREE.Mesh(new THREE.BoxGeometry(0.28 * scale, 0.34 * scale, 0.28 * scale), wheatMat);
      sheaf.castShadow = true;
      const bandMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.7 });
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.30 * scale, 0.08 * scale, 0.30 * scale), bandMat);
      mesh.add(sheaf, band);
    } else if (type === 'FLOUR') {
      // Packed Cubic Flour Bag
      mesh = new THREE.Group();
      const sackMat = new THREE.MeshStandardMaterial({
        color: 0xfffdf5,
        roughness: 0.4
      });
      const sack = new THREE.Mesh(new THREE.BoxGeometry(0.30 * scale, 0.28 * scale, 0.26 * scale), sackMat);
      sack.castShadow = true;
      const tie = new THREE.Mesh(new THREE.BoxGeometry(0.12 * scale, 0.08 * scale, 0.10 * scale), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
      tie.position.y = 0.17 * scale;
      mesh.add(sack, tie);
    } else if (type === 'BREAD') {
      // Golden Baked Loaf of Bread with score marks
      mesh = new THREE.Group();
      const crustMat = new THREE.MeshStandardMaterial({
        color: 0xd35400,
        roughness: 0.45
      });
      const loaf = new THREE.Mesh(new THREE.BoxGeometry(0.34 * scale, 0.20 * scale, 0.24 * scale), crustMat);
      loaf.castShadow = true;
      const scoreMat = new THREE.MeshBasicMaterial({ color: 0xffeedb });
      const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.04 * scale, 0.02 * scale, 0.14 * scale), scoreMat);
      s1.position.set(-0.07 * scale, 0.11 * scale, 0);
      const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.04 * scale, 0.02 * scale, 0.14 * scale), scoreMat);
      s2.position.set(0.07 * scale, 0.11 * scale, 0);
      mesh.add(loaf, s1, s2);
    } else if (type === 'MILK') {
      // Glass Milk Bottle with White Milk Liquid and Red Cap
      mesh = new THREE.Group();
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      const bottleBody = new THREE.Mesh(new THREE.BoxGeometry(0.22 * scale, 0.28 * scale, 0.22 * scale), glassMat);
      bottleBody.castShadow = true;
      const milkCore = new THREE.Mesh(
        new THREE.BoxGeometry(0.18 * scale, 0.22 * scale, 0.18 * scale),
        new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.3 })
      );
      milkCore.position.y = -0.02 * scale;
      const neck = new THREE.Mesh(new THREE.BoxGeometry(0.12 * scale, 0.10 * scale, 0.12 * scale), glassMat);
      neck.position.y = 0.18 * scale;
      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(0.14 * scale, 0.05 * scale, 0.14 * scale),
        new THREE.MeshStandardMaterial({ color: 0xff5252, roughness: 0.3 })
      );
      cap.position.y = 0.24 * scale;
      mesh.add(bottleBody, milkCore, neck, cap);
    } else if (type === 'CHEESE') {
      // Golden Swiss Cheese Wedge with Holes
      mesh = new THREE.Group();
      const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 });
      const wedge = new THREE.Mesh(new THREE.BoxGeometry(0.32 * scale, 0.18 * scale, 0.26 * scale), cheeseMat);
      wedge.castShadow = true;
      const holeMat = new THREE.MeshStandardMaterial({ color: 0xd4ac0d, roughness: 0.8 });
      const h1 = new THREE.Mesh(new THREE.BoxGeometry(0.06 * scale, 0.06 * scale, 0.02 * scale), holeMat);
      h1.position.set(-0.08 * scale, 0.04 * scale, 0.131 * scale);
      const h2 = new THREE.Mesh(new THREE.BoxGeometry(0.08 * scale, 0.08 * scale, 0.02 * scale), holeMat);
      h2.position.set(0.06 * scale, -0.02 * scale, 0.131 * scale);
      const rind = new THREE.Mesh(new THREE.BoxGeometry(0.33 * scale, 0.19 * scale, 0.04 * scale), new THREE.MeshStandardMaterial({ color: 0xe67e22 }));
      rind.position.set(0, 0, -0.12 * scale);
      mesh.add(wedge, h1, h2, rind);
    } else if (type === 'CORN') {
      // Golden Corn Cob with Green Husk Leaves
      mesh = new THREE.Group();
      const cobMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 });
      const cob = new THREE.Mesh(new THREE.BoxGeometry(0.22 * scale, 0.34 * scale, 0.22 * scale), cobMat);
      cob.castShadow = true;
      const huskMat = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.6 });
      const hLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06 * scale, 0.24 * scale, 0.24 * scale), huskMat);
      hLeft.position.set(-0.11 * scale, -0.06 * scale, 0);
      const hRight = new THREE.Mesh(new THREE.BoxGeometry(0.06 * scale, 0.24 * scale, 0.24 * scale), huskMat);
      hRight.position.set(0.11 * scale, -0.06 * scale, 0);
      mesh.add(cob, hLeft, hRight);
    } else if (type === 'POPCORN') {
      // Red & White Striped Voxel Popcorn Bucket with Puffy Buttery Popcorn Top
      mesh = new THREE.Group();
      const bucketMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.4 });
      const bucket = new THREE.Mesh(new THREE.BoxGeometry(0.28 * scale, 0.24 * scale, 0.28 * scale), bucketMat);
      bucket.castShadow = true;
      const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.05 * scale, 0.242 * scale, 0.284 * scale), stripeMat);
      const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.284 * scale, 0.242 * scale, 0.05 * scale), stripeMat);
      // Puffy Butter Popcorn Voxel Cubes on Top
      const popMat = new THREE.MeshStandardMaterial({ color: 0xfffa65, roughness: 0.8 });
      const popTop = new THREE.Mesh(new THREE.BoxGeometry(0.30 * scale, 0.12 * scale, 0.30 * scale), popMat);
      popTop.position.y = 0.16 * scale;
      const pKern1 = new THREE.Mesh(new THREE.BoxGeometry(0.10 * scale, 0.10 * scale, 0.10 * scale), popMat);
      pKern1.position.set(-0.06 * scale, 0.22 * scale, 0.04 * scale);
      const pKern2 = new THREE.Mesh(new THREE.BoxGeometry(0.10 * scale, 0.10 * scale, 0.10 * scale), popMat);
      pKern2.position.set(0.06 * scale, 0.23 * scale, -0.04 * scale);
      mesh.add(bucket, s1, s2, popTop, pKern1, pKern2);
    } else if (type === 'APPLE') {
      // Crisp Ruby Red Voxel Apple with Stem & Leaf
      mesh = new THREE.Group();
      const appleMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.25 });
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.28 * scale, 0.28 * scale, 0.28 * scale), appleMat);
      body.castShadow = true;
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.7 });
      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.06 * scale, 0.10 * scale, 0.06 * scale), stemMat);
      stem.position.y = 0.17 * scale;
      const leafMat = new THREE.MeshBasicMaterial({ color: 0x2ed573 });
      const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.08 * scale, 0.04 * scale, 0.08 * scale), leafMat);
      leaf.position.set(0.06 * scale, 0.19 * scale, 0);
      mesh.add(body, stem, leaf);
    } else if (type === 'APPLE_JUICE') {
      // Glass Apple Juice Bottle with Amber Liquid and Lime Cap
      mesh = new THREE.Group();
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85
      });
      const bottle = new THREE.Mesh(new THREE.BoxGeometry(0.22 * scale, 0.28 * scale, 0.22 * scale), glassMat);
      bottle.castShadow = true;
      const juiceCore = new THREE.Mesh(
        new THREE.BoxGeometry(0.18 * scale, 0.22 * scale, 0.18 * scale),
        new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.2 })
      );
      juiceCore.position.y = -0.02 * scale;
      const neck = new THREE.Mesh(new THREE.BoxGeometry(0.12 * scale, 0.10 * scale, 0.12 * scale), glassMat);
      neck.position.y = 0.18 * scale;
      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(0.14 * scale, 0.05 * scale, 0.14 * scale),
        new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.3 })
      );
      cap.position.y = 0.24 * scale;
      mesh.add(bottle, juiceCore, neck, cap);
    } else if (type === 'APPLE_PIE') {
      // Golden Baked Apple Pie in Pan with Lattice Top
      mesh = new THREE.Group();
      const panMat = new THREE.MeshStandardMaterial({ color: 0xbdc3c7, roughness: 0.3, metalness: 0.2 });
      const pan = new THREE.Mesh(new THREE.BoxGeometry(0.36 * scale, 0.10 * scale, 0.36 * scale), panMat);
      pan.castShadow = true;
      const fillingMat = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.4 });
      const fill = new THREE.Mesh(new THREE.BoxGeometry(0.32 * scale, 0.12 * scale, 0.32 * scale), fillingMat);
      fill.position.y = 0.03 * scale;
      const crustMat = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.5 });
      // Lattice strips
      const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.06 * scale, 0.04 * scale, 0.34 * scale), crustMat);
      s1.position.set(-0.08 * scale, 0.10 * scale, 0);
      const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.06 * scale, 0.04 * scale, 0.34 * scale), crustMat);
      s2.position.set(0.08 * scale, 0.10 * scale, 0);
      const s3 = new THREE.Mesh(new THREE.BoxGeometry(0.34 * scale, 0.04 * scale, 0.06 * scale), crustMat);
      s3.position.set(0, 0.10 * scale, -0.08 * scale);
      const s4 = new THREE.Mesh(new THREE.BoxGeometry(0.34 * scale, 0.04 * scale, 0.06 * scale), crustMat);
      s4.position.set(0, 0.10 * scale, 0.08 * scale);
      mesh.add(pan, fill, s1, s2, s3, s4);
    } else if (type === 'STRAWBERRY') {
      // Voxel Ruby Strawberry with Calyx & Seeds
      mesh = new THREE.Group();
      const berryMat = new THREE.MeshStandardMaterial({ color: 0xff2a55, roughness: 0.25 });
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.24 * scale, 0.28 * scale, 0.24 * scale), berryMat);
      body.castShadow = true;
      const calyxMat = new THREE.MeshBasicMaterial({ color: 0x25d366 });
      const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.30 * scale, 0.04 * scale, 0.08 * scale), calyxMat);
      c1.position.y = 0.15 * scale;
      const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.08 * scale, 0.04 * scale, 0.30 * scale), calyxMat);
      c2.position.y = 0.15 * scale;
      mesh.add(body, c1, c2);
    } else if (type === 'CARROT') {
      // Tapered Voxel Orange Carrot with Green Tops
      mesh = new THREE.Group();
      const carrotMat = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.4 });
      const root1 = new THREE.Mesh(new THREE.BoxGeometry(0.20 * scale, 0.24 * scale, 0.20 * scale), carrotMat);
      root1.castShadow = true;
      const root2 = new THREE.Mesh(new THREE.BoxGeometry(0.12 * scale, 0.16 * scale, 0.12 * scale), carrotMat);
      root2.position.y = -0.16 * scale;
      root2.castShadow = true;
      const greenMat = new THREE.MeshBasicMaterial({ color: 0x2ecc71 });
      const sprig = new THREE.Mesh(new THREE.BoxGeometry(0.08 * scale, 0.18 * scale, 0.08 * scale), greenMat);
      sprig.position.y = 0.18 * scale;
      mesh.add(root1, root2, sprig);
    } else if (type === 'STRAWBERRY_JAM') {
      // Glass Jar with Sweet Jam & Gingham Checkered Lid
      mesh = new THREE.Group();
      const jarMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, roughness: 0.1 });
      const jar = new THREE.Mesh(new THREE.BoxGeometry(0.24 * scale, 0.26 * scale, 0.24 * scale), jarMat);
      jar.castShadow = true;
      const jamCore = new THREE.Mesh(
        new THREE.BoxGeometry(0.20 * scale, 0.20 * scale, 0.20 * scale),
        new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.3 })
      );
      jamCore.position.y = -0.02 * scale;
      const lid = new THREE.Mesh(
        new THREE.BoxGeometry(0.26 * scale, 0.06 * scale, 0.26 * scale),
        new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 })
      );
      lid.position.y = 0.14 * scale;
      mesh.add(jar, jamCore, lid);
    } else if (type === 'PIZZA') {
      // Hot Artisan Pizza in Box with Cheese, Sauce & Toppings
      mesh = new THREE.Group();
      const boxMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
      const pBox = new THREE.Mesh(new THREE.BoxGeometry(0.38 * scale, 0.08 * scale, 0.38 * scale), boxMat);
      pBox.castShadow = true;
      const crustMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.5 });
      const crust = new THREE.Mesh(new THREE.BoxGeometry(0.32 * scale, 0.04 * scale, 0.32 * scale), crustMat);
      crust.position.y = 0.05 * scale;
      const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 });
      const cheese = new THREE.Mesh(new THREE.BoxGeometry(0.26 * scale, 0.02 * scale, 0.26 * scale), cheeseMat);
      cheese.position.y = 0.08 * scale;
      // Salami / Pepperoni cubes
      const pepMat = new THREE.MeshStandardMaterial({ color: 0xc0392b });
      const pep1 = new THREE.Mesh(new THREE.BoxGeometry(0.06 * scale, 0.02 * scale, 0.06 * scale), pepMat);
      pep1.position.set(-0.06 * scale, 0.10 * scale, 0.04 * scale);
      const pep2 = new THREE.Mesh(new THREE.BoxGeometry(0.06 * scale, 0.02 * scale, 0.06 * scale), pepMat);
      pep2.position.set(0.06 * scale, 0.10 * scale, -0.05 * scale);
      mesh.add(pBox, crust, cheese, pep1, pep2);
    } else if (type === 'ICE_CREAM') {
      // Soft-serve Ice Cream Cup with Swirl & Wafer
      mesh = new THREE.Group();
      const cupMat = new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.3 });
      const cup = new THREE.Mesh(new THREE.BoxGeometry(0.24 * scale, 0.18 * scale, 0.24 * scale), cupMat);
      cup.castShadow = true;
      const creamMat = new THREE.MeshStandardMaterial({ color: 0xff7675, roughness: 0.35 });
      const swirl1 = new THREE.Mesh(new THREE.BoxGeometry(0.26 * scale, 0.14 * scale, 0.26 * scale), creamMat);
      swirl1.position.y = 0.14 * scale;
      const swirl2 = new THREE.Mesh(new THREE.BoxGeometry(0.18 * scale, 0.12 * scale, 0.18 * scale), creamMat);
      swirl2.position.y = 0.25 * scale;
      const waferMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.6 });
      const wafer = new THREE.Mesh(new THREE.BoxGeometry(0.06 * scale, 0.20 * scale, 0.04 * scale), waferMat);
      wafer.position.set(0.08 * scale, 0.28 * scale, 0);
      wafer.rotation.z = -0.3;
      mesh.add(cup, swirl1, swirl2, wafer);
    } else if (type === 'SALAD_BOWL') {
      // Mediterranean Fresh Salad Bowl with Lettuce, Tomato, Corn & Feta
      mesh = new THREE.Group();
      const bowlMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.6 });
      const bowl = new THREE.Mesh(new THREE.BoxGeometry(0.32 * scale, 0.14 * scale, 0.32 * scale), bowlMat);
      bowl.castShadow = true;
      const lettuceMat = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.5 });
      const lettuce = new THREE.Mesh(new THREE.BoxGeometry(0.28 * scale, 0.10 * scale, 0.28 * scale), lettuceMat);
      lettuce.position.y = 0.08 * scale;
      const tomMat = new THREE.MeshStandardMaterial({ color: 0xff4757 });
      const tBit = new THREE.Mesh(new THREE.BoxGeometry(0.07 * scale, 0.07 * scale, 0.07 * scale), tomMat);
      tBit.position.set(-0.06 * scale, 0.15 * scale, 0.04 * scale);
      const cheeseBit = new THREE.Mesh(new THREE.BoxGeometry(0.07 * scale, 0.07 * scale, 0.07 * scale), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      cheeseBit.position.set(0.06 * scale, 0.15 * scale, -0.04 * scale);
      mesh.add(bowl, lettuce, tBit, cheeseBit);
    } else {
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.28 * scale, 0.28 * scale, 0.28 * scale),
        new THREE.MeshStandardMaterial({ color: itemData.color })
      );
    }

    return mesh;
  }

  // Add item into shopping cart basket (for customers)
  addItemToCart(type = 'TOMATO') {
    if (this.cartItems.length >= 6) return false;

    const mesh = this.createCubicItemMesh(type, 0.85);

    // Position neatly in a 2x3 grid inside the cart
    const idx = this.cartItems.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    mesh.position.set(-0.14 + col * 0.28, 0.14, -0.22 + row * 0.22);

    this.cartItemsMount.add(mesh);
    this.cartItems.push({ mesh, type });
    return true;
  }

  // Remove one item from cart
  removeItemFromCart() {
    if (this.cartItems.length === 0) return null;
    const item = this.cartItems.pop();
    if (item && item.mesh) {
      this.cartItemsMount.remove(item.mesh);
      item.mesh.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m && m.dispose && m.dispose());
          else if (obj.material.dispose) obj.material.dispose();
        }
      });
    }
    return item ? item.type : null;
  }

  // Add an item to the character's back stack
  addItem(type = 'TOMATO') {
    if (this.hasCart) {
      return this.addItemToCart(type);
    }

    if (this.stack.length >= this.maxStack) return false;

    const mesh = this.createCubicItemMesh(type, 1.0);

    // Calculate vertical stack position
    const stackHeight = this.stack.length * 0.34;
    mesh.position.set(0, stackHeight, 0);

    this.backpackBone.add(mesh);
    this.stack.push({ mesh, type, baseY: stackHeight });

    // Little pop scale animation with parent detachment guard
    mesh.scale.set(0.1, 0.1, 0.1);
    let scaleProg = 0.1;
    const popInterval = setInterval(() => {
      if (!mesh.parent) {
        clearInterval(popInterval);
        return;
      }
      scaleProg += 0.2;
      if (scaleProg >= 1.2) {
        mesh.scale.set(1, 1, 1);
        clearInterval(popInterval);
      } else {
        mesh.scale.set(scaleProg, scaleProg, scaleProg);
      }
    }, 16);

    return true;
  }

  // Remove item from the stack (top item by default, or specific index)
  removeItem(index = -1) {
    if (this.hasCart) {
      return this.removeItemFromCart();
    }
    if (this.stack.length === 0) return null;
    let item;
    if (index >= 0 && index < this.stack.length) {
      item = this.stack.splice(index, 1)[0];
    } else {
      item = this.stack.pop();
    }
    if (item && item.mesh) {
      this.backpackBone.remove(item.mesh);
      item.mesh.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m && m.dispose && m.dispose());
          else if (obj.material.dispose) obj.material.dispose();
        }
      });
    }
    // Re-adjust heights of remaining items in stack
    for (let i = 0; i < this.stack.length; i++) {
      const h = i * 0.34;
      this.stack[i].baseY = h;
      this.stack[i].mesh.position.y = h;
    }
    return item ? item.type : null;
  }

  update(delta) {
    // Movement and rotation
    this.speed = this.velocity.length();

    if (this.speed > 0.01) {
      this.facingAngle = Math.atan2(this.velocity.x, this.velocity.z);

      // Angular velocity & turning banking tilt
      let diffAngle = this.facingAngle - this.lastFacingAngle;
      while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;
      while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;
      this.angularVelocity = THREE.MathUtils.lerp(this.angularVelocity || 0, diffAngle / Math.max(delta, 0.001), 0.18);
      this.lastFacingAngle = this.facingAngle;

      this.group.rotation.y = this.facingAngle;

      // Dynamic banking/roll into turn & forward acceleration pitch
      const targetRoll = THREE.MathUtils.clamp(-this.angularVelocity * 0.035, -0.22, 0.22);
      const targetPitch = THREE.MathUtils.clamp(this.speed * 0.022, 0, 0.16);
      this.model.rotation.x = THREE.MathUtils.lerp(this.model.rotation.x, targetPitch, 0.2);

      // Speed-synchronized walk cycle progression (caps comfortably at high sprint)
      const strideFreq = 8.8;
      this.walkCycle += delta * Math.min(this.speed * strideFreq, 22.0);

      // Dynamic stride amplitude scaling with speed (eliminates slow-motion foot sliding)
      const speedRatio = Math.min(this.speed / 4.5, 1.0);
      const swingAmplitude = THREE.MathUtils.lerp(0.18, 0.62, speedRatio);
      const swing = Math.sin(this.walkCycle) * swingAmplitude;

      this.leftLeg.rotation.x = swing;
      this.rightLeg.rotation.x = -swing;

      // Subtle hip weight sway & torso yaw for natural organic feel
      const hipSway = Math.cos(this.walkCycle) * 0.035 * speedRatio;
      this.model.rotation.z = THREE.MathUtils.lerp(this.model.rotation.z, targetRoll + hipSway, 0.2);
      const torsoYaw = Math.sin(this.walkCycle) * 0.05 * speedRatio;
      this.model.rotation.y = THREE.MathUtils.lerp(this.model.rotation.y, torsoYaw, 0.2);

      // Harmonized Step Bobbing & Ground Impact Squash/Stretch
      // stepPhase peaks when foot passes midpoint, reaches 0 on footfall
      const stepPhase = Math.abs(Math.sin(this.walkCycle));
      const bobHeight = stepPhase * 0.05 * speedRatio;
      this.model.position.y = bobHeight;

      const squashFactor = (1.0 - stepPhase) * 0.04 * speedRatio;
      this.model.scale.y = 1.0 - squashFactor;
      this.model.scale.x = 1.0 + squashFactor * 0.5;
      this.model.scale.z = 1.0 + squashFactor * 0.5;

      // Footstep dust puff generator
      this.stepDustCooldown -= delta;
      if (this.stepDustCooldown <= 0 && this.speed > 3.0) {
        if (window.gameInstance && window.gameInstance.particleFX) {
          window.gameInstance.particleFX.spawnDustPuff(this.group.position, this.speed > 8.0 ? 3 : 1);
        }
        this.stepDustCooldown = this.speed > 8.0 ? 0.12 : 0.28;
      }

      if (!this.hasCart) {
        this.leftArm.rotation.x = -swing * 0.75;
        this.rightArm.rotation.x = swing * 0.75;
      } else {
        // Holding cart handle: gentle vibration & cart rolling
        this.leftArm.rotation.x = -0.55 + Math.sin(this.walkCycle * 2) * (0.02 * speedRatio);
        this.rightArm.rotation.x = -0.55 + Math.sin(this.walkCycle * 2) * (0.02 * speedRatio);
        if (this.cartWheels && this.cartWheels.length > 0) {
          const wheelDist = this.speed * delta * 8.0;
          this.cartWheels.forEach(w => { w.rotation.x += wheelDist; });
        }
        if (this.cartGroup) {
          this.cartGroup.position.y = stepPhase * 0.015 * speedRatio;
        }
      }
    } else {
      // Delta-time based smooth exponential dampening to idle stance
      const dampFactor = 1 - Math.exp(-14 * delta);
      this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, 0, dampFactor);
      this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, 0, dampFactor);
      if (!this.hasCart) {
        this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, 0, dampFactor);
        this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, 0, dampFactor);
      }
      this.model.position.y = THREE.MathUtils.lerp(this.model.position.y, 0, dampFactor);
      this.model.rotation.z = THREE.MathUtils.lerp(this.model.rotation.z, 0, dampFactor);
      this.model.rotation.x = THREE.MathUtils.lerp(this.model.rotation.x, 0, dampFactor);
      this.model.rotation.y = THREE.MathUtils.lerp(this.model.rotation.y, 0, dampFactor);
      this.model.scale.set(
        THREE.MathUtils.lerp(this.model.scale.x, 1.0, dampFactor),
        THREE.MathUtils.lerp(this.model.scale.y, 1.0, dampFactor),
        THREE.MathUtils.lerp(this.model.scale.z, 1.0, dampFactor)
      );
    }

    // Slapstick Bat Swing Kinematics
    if (this.isSwatting) {
      this.swatTimer -= delta;
      const t = 1.0 - Math.max(0, this.swatTimer / 0.38);
      if (t < 0.22) {
        const p = t / 0.22;
        this.rightArm.rotation.x = -0.4 - p * 1.5;
        this.rightArm.rotation.y = -p * 0.5;
        this.rightArm.rotation.z = p * 0.4;
      } else if (t < 0.65) {
        const p = (t - 0.22) / 0.43;
        this.rightArm.rotation.x = -1.9 + p * 2.9;
        this.rightArm.rotation.y = -0.5 + p * 1.1;
        this.rightArm.rotation.z = 0.4 - p * 0.8;
      } else {
        const p = (t - 0.65) / 0.35;
        this.rightArm.rotation.x = 1.0 - p * 1.0;
        this.rightArm.rotation.y = 0.6 - p * 0.6;
        this.rightArm.rotation.z = -0.4 + p * 0.4;
      }
      if (this.swatTimer <= 0) {
        this.isSwatting = false;
        if (this.batMesh) this.batMesh.visible = false;
      }
    }

    // Dynamic spring-damper backpack tower sway physics! (The iconic My Mini Mart wobble)
    if (!this.hasCart && this.stack.length > 0) {
      const turnSway = -(this.angularVelocity || 0) * 0.035;
      const speedLean = (this.speed * 0.03);

      this.stack.forEach((item, index) => {
        const heightMultiplier = (index + 1) * 0.12;
        const targetX = (Math.sin(this.walkCycle + index * 0.45) * 0.08 * (this.speed > 0.1 ? 1 : 0) + turnSway) * heightMultiplier;
        const targetZ = speedLean * heightMultiplier;

        item.mesh.position.x = THREE.MathUtils.lerp(item.mesh.position.x, targetX, 0.25);
        item.mesh.position.z = THREE.MathUtils.lerp(item.mesh.position.z, targetZ, 0.25);
        item.mesh.rotation.z = THREE.MathUtils.lerp(item.mesh.rotation.z, -targetX * 2.2, 0.25);
        item.mesh.rotation.x = THREE.MathUtils.lerp(item.mesh.rotation.x, targetZ * 1.8, 0.25);
      });
    }
  }

  destroy() {
    if (this.group) {
      this.group.traverse(obj => {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m && m.dispose && m.dispose());
          } else if (obj.material.dispose) {
            obj.material.dispose();
          }
        }
      });
      if (this.scene) {
        this.scene.remove(this.group);
      }
    }
  }
}

// --- Produce Garden Plot (Farming Area - Voxel Planter Edition) ---
class GardenPlot {
  constructor(scene, x, z, type = 'TOMATO') {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.type = type;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.plantSlots = [];
    this.maxPlants = 6;
    this.growthTime = 3.5; // seconds to regrow

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    // Chunky Soil Bed Slab
    const soilGeo = new THREE.BoxGeometry(3.6, 0.25, 2.6);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x4a2e18,
      roughness: 0.95
    });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = 0.125;
    soil.receiveShadow = true;
    this.group.add(soil);

    // Thick Cobalt Blue, Amber Orange, Emerald Green, Pink, or Terracotta Planter Trough Walls
    const borderColor = (this.type === 'TOMATO') ? 0x0984e3 : (this.type === 'WHEAT' ? 0xe67e22 : (this.type === 'CORN' ? 0x27ae60 : (this.type === 'STRAWBERRY' ? 0xff2a55 : (this.type === 'CARROT' ? 0xd35400 : 0x8b5a2b))));
    const borderMat = new THREE.MeshStandardMaterial({ color: borderColor, roughness: 0.35 });
    const bHeight = 0.55;
    const bY = bHeight / 2;

    const b1 = new THREE.Mesh(new THREE.BoxGeometry(3.8, bHeight, 0.22), borderMat);
    b1.position.set(0, bY, 1.3);
    const b2 = new THREE.Mesh(new THREE.BoxGeometry(3.8, bHeight, 0.22), borderMat);
    b2.position.set(0, bY, -1.3);
    const b3 = new THREE.Mesh(new THREE.BoxGeometry(0.22, bHeight, 2.6), borderMat);
    b3.position.set(1.9, bY, 0);
    const b4 = new THREE.Mesh(new THREE.BoxGeometry(0.22, bHeight, 2.6), borderMat);
    b4.position.set(-1.9, bY, 0);
    this.group.add(b1, b2, b3, b4);

    // Rim accent cap blocks on top of trough
    const rimColor = (this.type === 'TOMATO') ? 0xffffff : (this.type === 'CORN' ? 0x2ed573 : (this.type === 'STRAWBERRY' ? 0xffe600 : (this.type === 'CARROT' ? 0x2ecc71 : 0xffe600)));
    const rimMat = new THREE.MeshStandardMaterial({ color: rimColor, roughness: 0.3 });
    const r1 = new THREE.Mesh(new THREE.BoxGeometry(3.88, 0.08, 0.26), rimMat);
    r1.position.set(0, bHeight + 0.04, 1.3);
    const r2 = new THREE.Mesh(new THREE.BoxGeometry(3.88, 0.08, 0.26), rimMat);
    r2.position.set(0, bHeight + 0.04, -1.3);
    const r3 = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 2.6), rimMat);
    r3.position.set(1.9, bHeight + 0.04, 0);
    const r4 = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 2.6), rimMat);
    r4.position.set(-1.9, bHeight + 0.04, 0);
    this.group.add(r1, r2, r3, r4);

    // Spawn 6 plant positions
    const offsets = [
      { x: -1.0, z: -0.6 }, { x: 0, z: -0.6 }, { x: 1.0, z: -0.6 },
      { x: -1.0, z: 0.6 },  { x: 0, z: 0.6 },  { x: 1.0, z: 0.6 }
    ];

    offsets.forEach((pos) => {
      const plant = new Plant(this.group, pos.x, pos.z, this.type);
      this.plantSlots.push(plant);
    });
  }

  update(delta, time = 0) {
    const rate = delta * (this.growthMultiplier || 1.0);
    this.plantSlots.forEach(plant => plant.update(rate, time || (Date.now() * 0.001)));
  }

  // Harvest all ripe plants within range
  harvestAvailable() {
    const harvested = [];
    this.plantSlots.forEach(plant => {
      if (plant.isRipe) {
        plant.harvest();
        harvested.push(this.type);
      }
    });
    return harvested;
  }
}

// Single plant inside a garden plot (Voxel Cube Bush & Fruit, Wheat Stalks, Corn, Strawberry or Carrot)
class Plant {
  constructor(parentGroup, x, z, type) {
    this.parentGroup = parentGroup;
    this.type = type;
    this.x = x;
    this.z = z;
    this.growthProgress = 1.0; // 0 (harvested) to 1.0 (ripe)
    this.isRipe = true;

    this.group = new THREE.Group();
    this.group.position.set(x, 0.25, z);

    if (this.type === 'WHEAT') {
      // Golden Wheat Stalks Clustered in Voxel Bed
      this.bushGroup = new THREE.Group();
      const stalkMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.6 });
      const earMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 });

      const offsets = [
        [-0.14, -0.14], [0.14, -0.14], [-0.14, 0.14], [0.14, 0.14], [0, 0]
      ];
      offsets.forEach(([ox, oz]) => {
        const stalk = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.55, 0.06), stalkMat);
        stalk.position.set(ox, 0.28, oz);
        stalk.castShadow = true;
        const ear = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.24, 0.12), earMat);
        ear.position.set(ox, 0.56, oz);
        ear.castShadow = true;
        this.bushGroup.add(stalk, ear);
      });
      this.group.add(this.bushGroup);

      this.fruitGroup = new THREE.Group();
      this.group.add(this.fruitGroup);
    } else if (this.type === 'CORN') {
      // Tall Voxel Corn Stalk with Broad Leaves & Golden Cobs
      this.bushGroup = new THREE.Group();
      const stalkMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.5 });
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.6 });

      const mainStalk = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.95, 0.08), stalkMat);
      mainStalk.position.y = 0.48;
      mainStalk.castShadow = true;
      this.bushGroup.add(mainStalk);

      const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.04, 0.12), leafMat);
      l1.position.set(-0.12, 0.35, 0);
      l1.rotation.z = 0.3;
      const l2 = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.04, 0.12), leafMat);
      l2.position.set(0.12, 0.50, 0);
      l2.rotation.z = -0.3;
      const l3 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.26), leafMat);
      l3.position.set(0, 0.65, 0.12);
      l3.rotation.x = 0.3;
      this.bushGroup.add(l1, l2, l3);

      this.group.add(this.bushGroup);

      // Ripe Golden Corn Cobs in husks
      this.fruitGroup = new THREE.Group();
      this.fruitGroup.position.set(0, 0.45, 0);

      const cobMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 });
      const huskMat = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.6 });

      const cob1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.28, 0.14), cobMat);
      cob1.position.set(-0.10, 0.05, 0.06);
      cob1.castShadow = true;
      const husk1 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.20, 0.16), huskMat);
      husk1.position.set(-0.14, 0.02, 0.06);

      const cob2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.28, 0.14), cobMat);
      cob2.position.set(0.10, 0.18, -0.06);
      cob2.castShadow = true;
      const husk2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.20, 0.16), huskMat);
      husk2.position.set(0.14, 0.15, -0.06);

      this.fruitGroup.add(cob1, husk1, cob2, husk2);
      this.group.add(this.fruitGroup);
    } else if (this.type === 'STRAWBERRY') {
      // Low Lush Strawberry Foliage & Ruby Red Berries
      this.bushGroup = new THREE.Group();
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x10ac84, roughness: 0.6 });
      const mainLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.24, 0.50), leafMat);
      mainLeaf.position.y = 0.12;
      mainLeaf.castShadow = true;
      this.bushGroup.add(mainLeaf);

      const topLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.34), leafMat);
      topLeaf.position.y = 0.26;
      this.bushGroup.add(topLeaf);
      this.group.add(this.bushGroup);

      // 3 Ripe Ruby Strawberries
      this.fruitGroup = new THREE.Group();
      this.fruitGroup.position.set(0, 0.32, 0);

      const berryMat = new THREE.MeshStandardMaterial({ color: 0xff2a55, roughness: 0.25 });
      const calyxMat = new THREE.MeshBasicMaterial({ color: 0x25d366 });

      const berryOffsets = [
        [-0.14, 0, 0.12],
        [0.14, 0, 0.10],
        [0, 0.08, -0.14]
      ];

      berryOffsets.forEach(([bx, by, bz]) => {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.18, 0.16), berryMat);
        b.position.set(bx, by, bz);
        b.castShadow = true;
        const c = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.06), calyxMat);
        c.position.set(bx, by + 0.10, bz);
        this.fruitGroup.add(b, c);
      });

      this.group.add(this.fruitGroup);
    } else if (this.type === 'CARROT') {
      // Soil Bed Mound with Feathered Green Tops & Orange Crown
      this.bushGroup = new THREE.Group();
      const dirtMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.95 });
      const mound = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.18, 0.44), dirtMat);
      mound.position.y = 0.09;
      this.bushGroup.add(mound);

      const fernMat = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.6 });
      const f1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.08), fernMat);
      f1.position.set(-0.06, 0.30, 0);
      f1.rotation.z = 0.2;
      const f2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.08), fernMat);
      f2.position.set(0.06, 0.30, 0);
      f2.rotation.z = -0.2;
      this.bushGroup.add(f1, f2);
      this.group.add(this.bushGroup);

      // Carrot Orange Crown peeking out
      this.fruitGroup = new THREE.Group();
      this.fruitGroup.position.set(0, 0.18, 0);

      const carrotMat = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.35 });
      const crown = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.18, 0.20), carrotMat);
      crown.castShadow = true;
      this.fruitGroup.add(crown);
      this.group.add(this.fruitGroup);
    } else {
      // Crossy Road / Minecraft Style Voxel Foliage (Clustered Cubes)
      this.bushGroup = new THREE.Group();
      const bushMat = new THREE.MeshStandardMaterial({
        color: 0x25d366, // Vibrant Neo-Brutalist Mint Green
        roughness: 0.7
      });
      const mainBush = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.44, 0.48), bushMat);
      mainBush.position.y = 0.22;
      mainBush.castShadow = true;
      this.bushGroup.add(mainBush);

      const topBush = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.32), bushMat);
      topBush.position.y = 0.48;
      this.bushGroup.add(topBush);

      this.group.add(this.bushGroup);

      // Ripe Voxel Fruit (Chunky Red Cube with green stem cube)
      this.fruitGroup = new THREE.Group();
      this.fruitGroup.position.set(0, 0.54, 0);

      const fruitColor = (type === 'TOMATO') ? 0xff4757 : 0xffe600;
      const fruitMat = new THREE.MeshStandardMaterial({
        color: fruitColor,
        roughness: 0.3
      });
      const fruitCube = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 0.26), fruitMat);
      fruitCube.castShadow = true;
      this.fruitGroup.add(fruitCube);

      const stemMat = new THREE.MeshBasicMaterial({ color: 0x00b894 });
      const stemCube = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), stemMat);
      stemCube.position.y = 0.16;
      this.fruitGroup.add(stemCube);

      this.group.add(this.fruitGroup);
    }

    this.parentGroup.add(this.group);
  }

  harvest() {
    this.isRipe = false;
    this.growthProgress = 0;
    this.fruitGroup.visible = false;
    const baseScale = (this.type === 'WHEAT' || this.type === 'CORN' || this.type === 'CARROT') ? 0.15 : 0.4;
    this.bushGroup.scale.set(baseScale, baseScale, baseScale);
  }

  update(delta, time = Date.now() * 0.001) {
    // Procedural wind sway for crops (sinusoidal tip displacement)
    if (this.bushGroup) {
      const worldX = this.parentGroup ? this.parentGroup.position.x + this.x : this.x;
      const worldZ = this.parentGroup ? this.parentGroup.position.z + this.z : this.z;
      const sway = Math.sin(time * 3.2 + worldX * 1.8 + worldZ * 1.2) * 0.08;
      const swayPitch = Math.cos(time * 2.4 + worldZ * 2.0) * 0.05;
      this.bushGroup.rotation.z = sway;
      this.bushGroup.rotation.x = swayPitch;
    }

    if (!this.isRipe) {
      this.growthProgress += delta / 3.0;
      const baseScale = (this.type === 'WHEAT' || this.type === 'CORN' || this.type === 'CARROT') ? 0.15 : 0.4;
      const curScale = baseScale + this.growthProgress * (1.0 - baseScale);
      this.bushGroup.scale.set(curScale, curScale, curScale);

      if (this.growthProgress >= 1.0) {
        this.growthProgress = 1.0;
        this.isRipe = true;
        this.fruitGroup.visible = true;
        this.fruitGroup.scale.set(1, 1, 1);
        this.bushGroup.scale.set(1, 1, 1);
      }
    } else if (this.fruitGroup && this.fruitGroup.visible) {
      // Subtle organic breathing pulsation when ripe
      const pulse = 1.0 + Math.sin(time * 4.0 + this.x) * 0.03;
      this.fruitGroup.scale.set(pulse, pulse, pulse);
    }
  }
}

// --- Chicken Coop & Egg Production System (Low Poly Cubic Hen & Farm) ---
// Feed tomatoes on yellow square pad, collect eggs on brown square pad.
class ChickenCoop {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.feedCapacity = 5;
    this.currentFeed = 0;
    this.eggCapacity = 6;
    this.eggs = [];
    this.eggTimer = 0;
    this.henPeckTimer = 0;

    // Interactive square pad positions
    this.feedPadPos = new THREE.Vector3(x - 1.5, 0, z);
    this.eggPadPos = new THREE.Vector3(x + 1.5, 0, z);

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    // Stepped Square Dirt / Straw Bed Slab
    const bedGeo = new THREE.BoxGeometry(5.2, 0.12, 5.2);
    const bedMat = new THREE.MeshStandardMaterial({ color: 0x6e4e32, roughness: 0.95 });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.y = 0.06;
    bed.receiveShadow = true;
    this.group.add(bed);

    // Chunky Square Wooden Fence Enclosure
    const fenceMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.7 });
    const postGeo = new THREE.BoxGeometry(0.16, 0.70, 0.16);

    // Perimeter posts along back, left, right (open front)
    const postPositions = [
      [-2.4, -2.4], [-1.2, -2.4], [0, -2.4], [1.2, -2.4], [2.4, -2.4],
      [-2.4, -1.2], [-2.4, 0], [-2.4, 1.2], [-2.4, 2.4],
      [2.4, -1.2], [2.4, 0], [2.4, 1.2], [2.4, 2.4]
    ];

    postPositions.forEach(([px, pz]) => {
      const post = new THREE.Mesh(postGeo, fenceMat);
      post.position.set(px, 0.35, pz);
      post.castShadow = true;
      this.group.add(post);
    });

    // Horizontal rails connecting posts
    const backRail = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.08, 0.08), fenceMat);
    backRail.position.set(0, 0.48, -2.4);
    const leftRail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 4.8), fenceMat);
    leftRail.position.set(-2.4, 0.48, 0);
    const rightRail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 4.8), fenceMat);
    rightRail.position.set(2.4, 0.48, 0);
    this.group.add(backRail, leftRail, rightRail);

    // --- Interactive Floor Pads (Neo-Brutalist Square Blocks) ---
    // 1. Yellow Square Feed Pad
    const feedPadGeo = new THREE.BoxGeometry(1.6, 0.04, 1.6);
    const feedPadMat = new THREE.MeshStandardMaterial({
      color: 0xffe600, // Neo-Brutalist Canary Yellow
      roughness: 0.4
    });
    const feedPad = new THREE.Mesh(feedPadGeo, feedPadMat);
    feedPad.position.set(-1.5, 0.08, 0);
    this.group.add(feedPad);

    // Voxel Tomato Badge floating above feed pad
    this.feedBadge = new THREE.Group();
    this.feedBadge.position.set(-1.5, 0.85, 0);
    const feedCube = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.32, 0.32),
      new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 })
    );
    const feedStem = new THREE.Mesh(
      new THREE.BoxGeometry(0.10, 0.12, 0.10),
      new THREE.MeshBasicMaterial({ color: 0x25d366 })
    );
    feedStem.position.y = 0.20;
    feedCube.add(feedStem);
    this.feedBadge.add(feedCube);
    this.group.add(this.feedBadge);

    // 2. Terracotta Square Egg Pad (Where hen lays eggs)
    const eggPadGeo = new THREE.BoxGeometry(1.6, 0.04, 1.6);
    const eggPadMat = new THREE.MeshStandardMaterial({
      color: 0xd35400,
      roughness: 0.4
    });
    const eggPad = new THREE.Mesh(eggPadGeo, eggPadMat);
    eggPad.position.set(1.5, 0.08, 0);
    this.group.add(eggPad);

    // Egg Mount Group for fresh laid eggs
    this.eggMount = new THREE.Group();
    this.eggMount.position.set(1.5, 0.12, 0);
    this.group.add(this.eggMount);

    // --- 3D Voxel / Cubic Hen Model ---
    this.hen = new THREE.Group();
    this.hen.position.set(0, 0.18, 0);

    const whiteFeatherMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const redCombMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 });
    const yellowBeakMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 });
    const darkEyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });

    // Chunky Hen Body Box
    const bodyGeo = new THREE.BoxGeometry(0.70, 0.65, 0.85);
    const body = new THREE.Mesh(bodyGeo, whiteFeatherMat);
    body.position.y = 0.45;
    body.castShadow = true;
    this.hen.add(body);

    // Hen Head Group & Neck
    this.henHead = new THREE.Group();
    this.henHead.position.set(0, 0.75, 0.35);

    const headGeo = new THREE.BoxGeometry(0.38, 0.45, 0.38);
    const head = new THREE.Mesh(headGeo, whiteFeatherMat);
    head.castShadow = true;
    this.henHead.add(head);

    // Beak Box
    const beakGeo = new THREE.BoxGeometry(0.14, 0.12, 0.18);
    const beak = new THREE.Mesh(beakGeo, yellowBeakMat);
    beak.position.set(0, -0.04, 0.26);
    this.henHead.add(beak);

    // Red Comb Box
    const combGeo = new THREE.BoxGeometry(0.10, 0.22, 0.26);
    const comb = new THREE.Mesh(combGeo, redCombMat);
    comb.position.set(0, 0.30, 0);
    this.henHead.add(comb);

    // Red Wattle Box
    const wattleGeo = new THREE.BoxGeometry(0.08, 0.14, 0.08);
    const wattle = new THREE.Mesh(wattleGeo, redCombMat);
    wattle.position.set(0, -0.16, 0.18);
    this.henHead.add(wattle);

    // Black Hen Eyes
    const hEyeGeo = new THREE.BoxGeometry(0.04, 0.06, 0.04);
    const hEyeL = new THREE.Mesh(hEyeGeo, darkEyeMat);
    hEyeL.position.set(-0.20, 0.05, 0.12);
    const hEyeR = new THREE.Mesh(hEyeGeo, darkEyeMat);
    hEyeR.position.set(0.20, 0.05, 0.12);
    this.henHead.add(hEyeL, hEyeR);

    this.hen.add(this.henHead);

    // Voxel Tail Feathers (Tiered White Cubes)
    const tailGeo = new THREE.BoxGeometry(0.28, 0.38, 0.28);
    const tail = new THREE.Mesh(tailGeo, whiteFeatherMat);
    tail.position.set(0, 0.65, -0.42);
    tail.rotation.x = -0.35;
    this.hen.add(tail);

    // Chunky Yellow Legs
    const legGeo = new THREE.BoxGeometry(0.08, 0.24, 0.08);
    const legL = new THREE.Mesh(legGeo, yellowBeakMat);
    legL.position.set(-0.16, 0.12, 0);
    const legR = new THREE.Mesh(legGeo, yellowBeakMat);
    legR.position.set(0.16, 0.12, 0);
    this.hen.add(legL, legR);

    this.group.add(this.hen);
  }

  // Feed tomatoes to the chicken
  feedTomato() {
    if (this.currentFeed >= this.feedCapacity) return false;
    this.currentFeed++;
    return true;
  }

  // Lay one egg onto the egg pad (Cubic Egg)
  spawnEgg() {
    if (this.eggs.length >= this.eggCapacity) return;
    const eggGeo = new THREE.BoxGeometry(0.24, 0.28, 0.24);
    const eggMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.3 });
    const eggMesh = new THREE.Mesh(eggGeo, eggMat);
    eggMesh.castShadow = true;

    // Arrange eggs neatly in a 2x3 grid
    const idx = this.eggs.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    eggMesh.position.set(-0.25 + col * 0.5, 0.14, -0.35 + row * 0.35);

    // Pop scale animation
    eggMesh.scale.set(0.1, 0.1, 0.1);
    let s = 0.1;
    const pop = setInterval(() => {
      s += 0.25;
      if (s >= 1.0) {
        eggMesh.scale.set(1, 1, 1);
        clearInterval(pop);
      } else {
        eggMesh.scale.set(s, s, s);
      }
    }, 20);

    this.eggMount.add(eggMesh);
    this.eggs.push(eggMesh);
  }

  // Super-feed with Corn: boosts feed and lays 2 fresh eggs immediately!
  feedCorn() {
    this.currentFeed = Math.min(this.feedCapacity, this.currentFeed + 2);
    this.spawnEgg();
    if (this.eggs.length < this.eggCapacity) {
      this.spawnEgg();
    }
    return true;
  }

  collectOneEgg() {
    if (this.eggs.length === 0) return false;
    const e = this.eggs.pop();
    this.eggMount.remove(e);
    return true;
  }

  update(delta, time) {
    // Floating feed badge animation
    this.feedBadge.position.y = 0.85 + Math.sin(time * 3) * 0.08;
    this.feedBadge.rotation.y = time * 2;

    // Hen pecking animation
    if (this.currentFeed > 0) {
      this.henPeckTimer += delta * 6;
      this.henHead.rotation.x = Math.max(0, Math.sin(this.henPeckTimer) * 0.6);
      this.hen.position.y = 0.18 + Math.abs(Math.sin(this.henPeckTimer * 0.5)) * 0.04;

      // Egg laying timer
      this.eggTimer += delta;
      if (this.eggTimer >= 2.0) {
        this.eggTimer = 0;
        if (this.eggs.length < this.eggCapacity) {
          this.currentFeed--;
          this.spawnEgg();
          window.Sound.playPop();
        }
      }
    } else {
      // Idle gentle head bob
      this.henHead.rotation.x = Math.sin(time * 2) * 0.15;
    }
  }
}

// --- Flour Mill / Windmill Processing Station ---
class FlourMill {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.wheatCapacity = 6;
    this.currentWheat = 0;
    this.flourCapacity = 6;
    this.flourSacks = []; // visual meshes of produced flour
    this.grindTimer = 0;
    this.grindDuration = 2.6; // seconds per sack

    // Interactive square pads
    this.inputPadPos = new THREE.Vector3(x - 1.5, 0, z); // drop wheat
    this.outputPadPos = new THREE.Vector3(x + 1.5, 0, z); // collect flour

    this.initMesh();
    this.productionFloor = createProductionFloorKit(this.group, 0xf1c40f);
    this.productionDetails = createProductionMachineDetails(this.group, 0xf1c40f, 'BUGDAY > UN', ['WHEAT']);
    this.scene.add(this.group);
  }

  initMesh() {
    // 1. Stone Foundation Slab
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x7f8c8d, roughness: 0.9 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 2.4), baseMat);
    base.position.y = 0.175;
    base.castShadow = true;
    base.receiveShadow = true;
    this.group.add(base);

    // 2. Timber Tower House
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb87333, roughness: 0.6 });
    const tower = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.0, 1.8), woodMat);
    tower.position.y = 1.35;
    tower.castShadow = true;
    this.group.add(tower);

    // 3. Terracotta Cubic Roof
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xc0392b, roughness: 0.5 });
    const roof1 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.35, 2.1), roofMat);
    roof1.position.y = 2.45;
    const roof2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.35, 1.5), roofMat);
    roof2.position.y = 2.75;
    const roof3 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.8), roofMat);
    roof3.position.y = 3.05;
    this.group.add(roof1, roof2, roof3);

    // 4. Rotating Windmill Sail Hub & 4 Voxel Blades
    this.sailsHub = new THREE.Group();
    this.sailsHub.position.set(0, 2.0, 1.02); // protruding forward
    const hubBox = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.25), new THREE.MeshStandardMaterial({ color: 0x2c3e50 }));
    this.sailsHub.add(hubBox);

    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.4 });
    const bladeFrameMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.7 });

    for (let i = 0; i < 4; i++) {
      const armGroup = new THREE.Group();
      armGroup.rotation.z = (Math.PI / 2) * i;

      // Timber Spar
      const spar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.8, 0.08), bladeFrameMat);
      spar.position.y = 0.9;
      // White Sail Cloth Block
      const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.38, 1.3, 0.04), bladeMat);
      cloth.position.set(0.18, 1.0, 0.02);
      cloth.castShadow = true;

      armGroup.add(spar, cloth);
      this.sailsHub.add(armGroup);
    }
    this.group.add(this.sailsHub);

    // 5. Input Hopper (for wheat)
    const hopperMat = new THREE.MeshStandardMaterial({ color: 0xcd853f });
    const hopper = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.7), hopperMat);
    hopper.position.set(-1.0, 0.6, 0);
    this.group.add(hopper);

    // 6. Interactive Ground Square Pads
    // Input Pad (Amber Gold for Wheat)
    const inPadGeo = new THREE.BoxGeometry(1.2, 0.04, 1.2);
    const inPadMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 });
    const inPad = new THREE.Mesh(inPadGeo, inPadMat);
    inPad.position.set(-1.5, 0.02, 0);
    this.group.add(inPad);

    // Output Pad (Crisp White for Flour)
    const outPadGeo = new THREE.BoxGeometry(1.2, 0.04, 1.2);
    const outPadMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.3 });
    const outPad = new THREE.Mesh(outPadGeo, outPadMat);
    outPad.position.set(1.5, 0.02, 0);
    this.group.add(outPad);

    // Container groups for visual stacked wheat and produced flour
    this.hopperWheatGroup = new THREE.Group();
    this.hopperWheatGroup.position.set(-1.0, 0.85, 0);
    this.group.add(this.hopperWheatGroup);

    this.flourOutputGroup = new THREE.Group();
    this.flourOutputGroup.position.set(1.5, 0.05, 0);
    this.group.add(this.flourOutputGroup);

    // 7. Dynamic Neo-Brutalist Input Requirement Billboard & 3D Voxel Icon
    this.statusGroup = new THREE.Group();
    this.statusGroup.position.set(-1.5, 2.3, 0);

    // Floating 3D Wheat Sheaf
    this.statusIcon = createVoxelProductLogo('WHEAT');
    this.statusIcon.position.set(0, 0.46, 0);
    this.statusGroup.add(this.statusIcon);

    // Double-Sided Neo-Brutalist Billboard
    const bbGeo = new THREE.BoxGeometry(1.5, 0.44, 0.08);
    this.statusBillboardMat = new THREE.MeshStandardMaterial({
      map: getMachineStatusTexture('MILL_EMPTY', 'BUĞDAY GEREKLİ', 'DEĞİRMEN (0/6)', '#F1C40F'),
      roughness: 0.25
    });
    this.statusBillboard = new THREE.Mesh(bbGeo, this.statusBillboardMat);
    this.statusGroup.add(this.statusBillboard);

    // Blinking / Glowing Beacon Lamp
    this.beaconMat = new THREE.MeshStandardMaterial({
      color: 0xffe600,
      emissive: 0xffe600,
      emissiveIntensity: 0.85
    });
    this.beaconLamp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), this.beaconMat);
    this.beaconLamp.position.set(0.68, 0.22, 0.05);
    this.statusGroup.add(this.beaconLamp);

    this.group.add(this.statusGroup);
  }

  depositWheat() {
    if (this.currentWheat >= this.wheatCapacity) return false;
    this.currentWheat++;
    this.refreshHopperMesh();
    return true;
  }

  collectOneFlour() {
    if (this.flourSacks.length === 0) return false;
    const mesh = this.flourSacks.pop();
    this.flourOutputGroup.remove(mesh);
    return true;
  }

  refreshHopperMesh() {
    while (this.hopperWheatGroup.children.length > 0) {
      this.hopperWheatGroup.remove(this.hopperWheatGroup.children[0]);
    }
    const count = Math.min(this.currentWheat, 4);
    const wheatMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f });
    for (let i = 0; i < count; i++) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.24), wheatMat);
      box.position.set((i % 2 - 0.5) * 0.26, i * 0.14, (Math.floor(i / 2) - 0.5) * 0.26);
      this.hopperWheatGroup.add(box);
    }
  }

  spawnFlour() {
    const sackGroup = new THREE.Group();
    const sackMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.4 });
    const sack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.26), sackMat);
    sack.castShadow = true;
    const knot = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.10), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
    knot.position.y = 0.17;
    sackGroup.add(sack, knot);

    const idx = this.flourSacks.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    sackGroup.position.set((col - 0.5) * 0.42, 0.14, (row - 1) * 0.36);

    this.flourOutputGroup.add(sackGroup);
    this.flourSacks.push(sackGroup);
  }

  update(delta, time = Date.now() * 0.001) {
    const isGrinding = this.currentWheat > 0 && this.flourSacks.length < this.flourCapacity;
    updateProductionMachineDetails(this, delta, time, isGrinding, this.flourSacks.length, this.grindTimer / this.grindDuration, this.flourCapacity);
    const spinSpeed = isGrinding ? 3.0 : 0.8;
    this.sailsHub.rotation.z -= delta * spinSpeed;

    if (isGrinding) {
      this.grindTimer += delta * (this.speedMultiplier || 1.0);
      if (this.grindTimer >= this.grindDuration) {
        this.grindTimer = 0;
        this.currentWheat--;
        this.refreshHopperMesh();
        this.spawnFlour();
        window.Sound.playPop();
      }
    } else {
      this.grindTimer = 0;
    }

    // Dynamic Billboard & 3D Voxel Icon Animation
    if (this.statusGroup) {
      const cam = (window.gameInstance && window.gameInstance.camera);
      if (cam) {
        this.statusGroup.quaternion.copy(this.group.quaternion).invert().multiply(cam.quaternion);
      }
      if (this.statusIcon) {
        this.statusIcon.rotation.y += delta * 1.5;
        this.statusIcon.position.y = 0.46 + Math.sin(time * 3.0) * 0.06;
      }
      if (this.currentWheat === 0) {
        this.statusBillboardMat.map = getMachineStatusTexture('MILL_EMPTY', 'BUĞDAY GEREKLİ', `DEĞİRMEN (0/${this.wheatCapacity})`, '#F1C40F');
        const bounce = 1.0 + Math.sin(time * 5.0) * 0.06;
        this.statusGroup.scale.set(bounce, bounce, bounce);
        const flash = Math.sin(time * 7.0) > 0;
        this.beaconMat.color.setHex(flash ? 0xffe600 : 0xd35400);
        this.beaconMat.emissive.setHex(flash ? 0xffe600 : 0xd35400);
      } else {
        this.statusBillboardMat.map = getMachineStatusTexture('MILL_RUNNING', 'ÖĞÜTÜLÜYOR...', `STOK (${this.currentWheat}/${this.wheatCapacity})`, '#2ECC71', '#FFFFFF');
        this.statusGroup.scale.set(1, 1, 1);
        this.beaconMat.color.setHex(0x2ed573);
        this.beaconMat.emissive.setHex(0x2ed573);
      }
    }
  }
}

// --- Bakery Oven Processing Station (Low Poly Cubic Stone Oven) ---
class BakeryOven {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.flourCapacity = 6;
    this.currentFlour = 0;
    this.appleCapacity = 6;
    this.currentApples = 0;
    this.tomatoCapacity = 6;
    this.currentTomatoes = 0;
    this.cheeseCapacity = 6;
    this.currentCheese = 0;
    this.breadCapacity = 6;
    this.breadLoaves = []; // visual meshes of baked items (bread / pie / pizza)
    this.bakeTimer = 0;
    this.bakeDuration = 3.0; // seconds per loaf/pie/pizza

    this.smokeParticles = [];

    // Interactive square pads
    this.inputPadPos = new THREE.Vector3(x - 1.5, 0, z); // drop ingredients
    this.outputPadPos = new THREE.Vector3(x + 1.5, 0, z); // collect baked goods

    this.initMesh();
    this.productionFloor = createProductionFloorKit(this.group, 0xe67e22);
    this.productionDetails = createProductionMachineDetails(this.group, 0xe67e22, 'UN > EKMEK', ['FLOUR', 'APPLE', 'TOMATO', 'CHEESE']);
    this.scene.add(this.group);
  }

  initMesh() {
    // 1. Stone Hearth Plinth
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0x4b4b4b, roughness: 0.9 });
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 2.2), plinthMat);
    plinth.position.y = 0.175;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    this.group.add(plinth);

    // 2. Terracotta Oven Dome / Body
    const ovenMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.6 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 1.8), ovenMat);
    body.position.y = 1.05;
    body.castShadow = true;
    this.group.add(body);

    // 3. Arched Hearth Fire Opening & Glowing Embers
    const hearthFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.75, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x2d3436 })
    );
    hearthFrame.position.set(0, 0.8, 0.95);
    this.group.add(hearthFrame);

    this.emberMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.5, 0.2),
      new THREE.MeshBasicMaterial({ color: 0xff793f })
    );
    this.emberMesh.position.set(0, 0.75, 0.92);
    this.group.add(this.emberMesh);

    // 4. Tall Stone Chimney
    const chimney = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 1.6, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x576574, roughness: 0.8 })
    );
    chimney.position.set(-0.6, 2.2, -0.4);
    chimney.castShadow = true;
    this.group.add(chimney);

    const chimneyCap = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 0.12, 0.68),
      new THREE.MeshStandardMaterial({ color: 0x2c3e50 })
    );
    chimneyCap.position.set(-0.6, 3.05, -0.4);
    this.group.add(chimneyCap);

    // 5. Interactive Ground Pads
    // Input Pad (White for Flour / Ingredients)
    const inPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.3 })
    );
    inPad.position.set(-1.5, 0.02, 0);
    this.group.add(inPad);

    // Output Pad (Golden Brown for Baked Items)
    const outPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.3 })
    );
    outPad.position.set(1.5, 0.02, 0);
    this.group.add(outPad);

    // Storage display mounts
    this.flourInputGroup = new THREE.Group();
    this.flourInputGroup.position.set(-1.5, 0.05, 0);
    this.group.add(this.flourInputGroup);

    this.breadOutputGroup = new THREE.Group();
    this.breadOutputGroup.position.set(1.5, 0.05, 0);
    this.group.add(this.breadOutputGroup);

    // Chimney Smoke Particles
    this.smokeGroup = new THREE.Group();
    this.smokeGroup.position.set(-0.6, 3.15, -0.4);
    this.group.add(this.smokeGroup);

    const smokeGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
    const smokeMat = new THREE.MeshStandardMaterial({
      color: 0xf5f6fa,
      transparent: true,
      opacity: 0.6
    });

    for (let i = 0; i < 5; i++) {
      const p = new THREE.Mesh(smokeGeo, smokeMat.clone());
      p.position.set(
        (Math.random() - 0.5) * 0.2,
        i * 0.3,
        (Math.random() - 0.5) * 0.2
      );
      this.smokeGroup.add(p);
      this.smokeParticles.push({
        mesh: p,
        speed: 0.8 + Math.random() * 0.5
      });
    }

    // 6. Dynamic Neo-Brutalist Input Requirement Billboard & 3D Voxel Icon
    this.statusGroup = new THREE.Group();
    this.statusGroup.position.set(-1.5, 2.3, 0);

    this.statusIcon = createVoxelProductLogo('FLOUR');
    this.statusIcon.position.set(0, 0.46, 0);
    this.statusGroup.add(this.statusIcon);

    const bbGeo = new THREE.BoxGeometry(1.6, 0.44, 0.08);
    this.statusBillboardMat = new THREE.MeshStandardMaterial({
      map: getMachineStatusTexture('OVEN_EMPTY', 'UN / HAMMADDE GEREKLİ', 'FIRIN (0/6)', '#E67E22', '#FFFFFF'),
      roughness: 0.25
    });
    this.statusBillboard = new THREE.Mesh(bbGeo, this.statusBillboardMat);
    this.statusGroup.add(this.statusBillboard);

    this.beaconMat = new THREE.MeshStandardMaterial({
      color: 0xd35400,
      emissive: 0xd35400,
      emissiveIntensity: 0.85
    });
    this.beaconLamp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), this.beaconMat);
    this.beaconLamp.position.set(0.72, 0.22, 0.05);
    this.statusGroup.add(this.beaconLamp);

    this.group.add(this.statusGroup);
  }

  depositFlour() {
    if (this.currentFlour >= this.flourCapacity) return false;
    this.currentFlour++;
    this.refreshFlourMesh();
    return true;
  }

  depositApple() {
    if (this.currentApples >= this.appleCapacity) return false;
    this.currentApples++;
    this.refreshFlourMesh();
    return true;
  }

  depositTomato() {
    if (this.currentTomatoes >= this.tomatoCapacity) return false;
    this.currentTomatoes++;
    this.refreshFlourMesh();
    return true;
  }

  depositCheese() {
    if (this.currentCheese >= this.cheeseCapacity) return false;
    this.currentCheese++;
    this.refreshFlourMesh();
    return true;
  }

  collectOneBread() {
    if (this.breadLoaves.length === 0) return false;
    const mesh = this.breadLoaves.pop();
    this.breadOutputGroup.remove(mesh);
    return mesh.itemType || 'BREAD';
  }

  refreshFlourMesh() {
    while (this.flourInputGroup.children.length > 0) {
      this.flourInputGroup.remove(this.flourInputGroup.children[0]);
    }
    const count = Math.min(this.currentFlour, 3);
    const sackMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5 });
    for (let i = 0; i < count; i++) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 0.22), sackMat);
      box.position.set((i % 2 - 0.5) * 0.30, 0.11, (Math.floor(i / 2) - 0.5) * 0.30);
      this.flourInputGroup.add(box);
    }
    const aCount = Math.min(this.currentApples, 2);
    const appleMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.3 });
    for (let i = 0; i < aCount; i++) {
      const apple = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), appleMat);
      apple.position.set((i % 2 - 0.5) * 0.22, 0.26, 0.15);
      this.flourInputGroup.add(apple);
    }
    const tCount = Math.min(this.currentTomatoes, 2);
    const tomMat = new THREE.MeshStandardMaterial({ color: 0xff4757 });
    for (let i = 0; i < tCount; i++) {
      const tom = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), tomMat);
      tom.position.set(-0.15 + i * 0.24, 0.26, -0.15);
      this.flourInputGroup.add(tom);
    }
    const cCount = Math.min(this.currentCheese, 2);
    const chMat = new THREE.MeshStandardMaterial({ color: 0xffe600 });
    for (let i = 0; i < cCount; i++) {
      const ch = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.14), chMat);
      ch.position.set(0, 0.28 + i * 0.12, 0);
      this.flourInputGroup.add(ch);
    }
  }

  spawnBread() {
    const loafGroup = new THREE.Group();
    loafGroup.itemType = 'BREAD';
    const crustMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.45 });
    const loaf = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.20, 0.24), crustMat);
    loaf.castShadow = true;
    const scoreMat = new THREE.MeshBasicMaterial({ color: 0xffeedb });
    const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.14), scoreMat);
    s1.position.set(-0.07, 0.11, 0);
    const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 0.14), scoreMat);
    s2.position.set(0.07, 0.11, 0);
    loafGroup.add(loaf, s1, s2);

    const idx = this.breadLoaves.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    loafGroup.position.set((col - 0.5) * 0.42, 0.12, (row - 1) * 0.34);

    this.breadOutputGroup.add(loafGroup);
    this.breadLoaves.push(loafGroup);
  }

  spawnApplePie() {
    const pieGroup = new THREE.Group();
    pieGroup.itemType = 'APPLE_PIE';
    const panMat = new THREE.MeshStandardMaterial({ color: 0xbdc3c7, roughness: 0.3 });
    const pan = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.10, 0.32), panMat);
    pan.castShadow = true;
    const filling = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.12, 0.28), new THREE.MeshStandardMaterial({ color: 0xc0392b }));
    filling.position.y = 0.03;
    const crust = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.04, 0.30), new THREE.MeshStandardMaterial({ color: 0xe67e22 }));
    crust.position.y = 0.09;
    pieGroup.add(pan, filling, crust);

    const idx = this.breadLoaves.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    pieGroup.position.set((col - 0.5) * 0.42, 0.12, (row - 1) * 0.34);

    this.breadOutputGroup.add(pieGroup);
    this.breadLoaves.push(pieGroup);
  }

  spawnPizza() {
    const pizzaGroup = new THREE.Group();
    pizzaGroup.itemType = 'PIZZA';
    const boxMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const pBox = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 0.36), boxMat);
    pBox.castShadow = true;
    const crust = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.04, 0.30), new THREE.MeshStandardMaterial({ color: 0xd35400 }));
    crust.position.y = 0.05;
    const cheese = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.24), new THREE.MeshStandardMaterial({ color: 0xffe600 }));
    cheese.position.y = 0.08;
    const pep = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.06), new THREE.MeshStandardMaterial({ color: 0xc0392b }));
    pep.position.set(0, 0.10, 0);
    pizzaGroup.add(pBox, crust, cheese, pep);

    const idx = this.breadLoaves.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    pizzaGroup.position.set((col - 0.5) * 0.42, 0.12, (row - 1) * 0.34);

    this.breadOutputGroup.add(pizzaGroup);
    this.breadLoaves.push(pizzaGroup);
  }

  update(delta, time = Date.now() * 0.001) {
    const canBakePizza = this.currentFlour > 0 && this.currentTomatoes > 0 && this.currentCheese > 0 && this.breadLoaves.length < this.breadCapacity;
    const canBakePie = this.currentFlour > 0 && this.currentApples > 0 && this.breadLoaves.length < this.breadCapacity;
    const canBakeBread = this.currentFlour > 0 && this.breadLoaves.length < this.breadCapacity;
    const isBaking = canBakePizza || canBakePie || canBakeBread;
    updateProductionMachineDetails(this, delta, time, isBaking, this.breadLoaves.length, this.bakeTimer / this.bakeDuration, this.breadCapacity);

    if (isBaking) {
      const glow = 0.8 + Math.sin(time * 6) * 0.2;
      this.emberMesh.material.color.setRGB(1.0 * glow, 0.45 * glow, 0.15 * glow);
      this.bakeTimer += delta * (this.speedMultiplier || 1.0);
      if (this.bakeTimer >= this.bakeDuration) {
        this.bakeTimer = 0;
        if (canBakePizza) {
          this.currentFlour--;
          this.currentTomatoes--;
          this.currentCheese--;
          this.refreshFlourMesh();
          this.spawnPizza();
        } else if (canBakePie) {
          this.currentFlour--;
          this.currentApples--;
          this.refreshFlourMesh();
          this.spawnApplePie();
        } else {
          this.currentFlour--;
          this.refreshFlourMesh();
          this.spawnBread();
        }
        window.Sound.playPop();
      }
    } else {
      this.emberMesh.material.color.setHex(0x994411);
      this.bakeTimer = 0;
    }

    this.smokeParticles.forEach(sp => {
      sp.mesh.position.y += delta * (isBaking ? sp.speed * 1.5 : sp.speed * 0.5);
      const prog = sp.mesh.position.y / 1.5;
      sp.mesh.scale.set(1 + prog * 1.5, 1 + prog * 1.5, 1 + prog * 1.5);
      sp.mesh.material.opacity = Math.max(0, 0.6 * (1 - prog));

      if (sp.mesh.position.y > 1.5) {
        sp.mesh.position.y = 0;
        sp.mesh.position.x = (Math.random() - 0.5) * 0.15;
        sp.mesh.position.z = (Math.random() - 0.5) * 0.15;
        sp.mesh.scale.set(1, 1, 1);
        sp.mesh.material.opacity = 0.6;
      }
    });

    // Dynamic Billboard & 3D Voxel Icon Animation
    if (this.statusGroup) {
      const cam = (window.gameInstance && window.gameInstance.camera);
      if (cam) {
        this.statusGroup.quaternion.copy(this.group.quaternion).invert().multiply(cam.quaternion);
      }
      if (this.statusIcon) {
        this.statusIcon.rotation.y += delta * 1.5;
        this.statusIcon.position.y = 0.46 + Math.sin(time * 3.0) * 0.06;
      }
      if (this.currentFlour === 0) {
        this.statusBillboardMat.map = getMachineStatusTexture('OVEN_EMPTY', 'UN BEKLİYOR', `FIRIN (0/${this.flourCapacity})`, '#E67E22', '#FFFFFF');
        const bounce = 1.0 + Math.sin(time * 5.0) * 0.06;
        this.statusGroup.scale.set(bounce, bounce, bounce);
        const flash = Math.sin(time * 7.0) > 0;
        this.beaconMat.color.setHex(flash ? 0xff4757 : 0xe67e22);
        this.beaconMat.emissive.setHex(flash ? 0xff4757 : 0xe67e22);
      } else {
        const title = isBaking ? 'PİŞİRİLİYOR...' : 'HAZIR';
        this.statusBillboardMat.map = getMachineStatusTexture('OVEN_ACTIVE', title, `UN STOK: ${this.currentFlour}/${this.flourCapacity}`, '#2ECC71', '#FFFFFF');
        this.statusGroup.scale.set(1, 1, 1);
        this.beaconMat.color.setHex(0x2ed573);
        this.beaconMat.emissive.setHex(0x2ed573);
      }
    }
  }
}

// --- Ambient Voxel Butterflies fluttering over gardens ---
class VoxelButterflies {
  constructor(scene) {
    this.scene = scene;
    this.butterflies = [];

    const wingColors = [0xffe600, 0x00d2d3, 0xff5252, 0xa29bfe];
    const spawnCenters = [
      { x: 5.5, z: 7.5 },  // Tomato plot
      { x: 5.5, z: 3.8 },  // Wheat plot
      { x: -5.5, z: 7.5 }, // Chicken coop
      { x: 0, z: 5.5 }     // Center garden path
    ];

    spawnCenters.forEach((center, idx) => {
      const bGroup = new THREE.Group();

      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.18), bodyMat);
      bGroup.add(body);

      const wingMat = new THREE.MeshStandardMaterial({
        color: wingColors[idx % wingColors.length],
        roughness: 0.3
      });

      const wingL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.14), wingMat);
      wingL.position.x = -0.10;
      const wingR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.14), wingMat);
      wingR.position.x = 0.10;

      bGroup.add(wingL, wingR);
      bGroup.position.set(center.x, 1.2, center.z);
      this.scene.add(bGroup);

      this.butterflies.push({
        group: bGroup,
        wingL,
        wingR,
        center,
        phase: idx * 1.5,
        orbitRadius: 1.2 + Math.random() * 0.8
      });
    });
  }

  update(delta, time) {
    this.butterflies.forEach(b => {
      const t = time * 1.5 + b.phase;
      b.group.position.x = b.center.x + Math.sin(t * 0.8) * b.orbitRadius;
      b.group.position.z = b.center.z + Math.cos(t * 0.8) * b.orbitRadius;
      b.group.position.y = 1.0 + Math.sin(t * 2.5) * 0.3;
      b.group.rotation.y = -t * 0.8 + Math.PI / 2;

      const flap = Math.sin(time * 22 + b.phase) * 0.75;
      b.wingL.rotation.z = flap;
      b.wingR.rotation.z = -flap;
    });
  }
}

// --- Low Poly Voxel Clouds Drifting across the Skybox ---
class VoxelCloudSystem {
  constructor(scene) {
    this.scene = scene;
    this.clouds = [];
    this.cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      transparent: true,
      opacity: 0.55
    });

    for (let i = 0; i < 6; i++) {
      const cloud = this.createCloudMesh();
      cloud.position.set(
        -32 + (i / 6) * 64 + (Math.random() - 0.5) * 6,
        34 + Math.random() * 4,
        -10 + Math.random() * 35
      );
      cloud.speed = 0.5 + Math.random() * 0.4;
      this.scene.add(cloud);
      this.clouds.push(cloud);
    }
  }

  createCloudMesh() {
    const group = new THREE.Group();
    const boxCount = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < boxCount; i++) {
      const w = 1.6 + Math.random() * 1.8;
      const h = 0.5 + Math.random() * 0.5;
      const d = 1.4 + Math.random() * 1.6;
      const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), this.cloudMat);
      box.position.set(
        (i - boxCount / 2) * 1.1 + (Math.random() - 0.5) * 0.4,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.8
      );
      group.add(box);
    }
    return group;
  }

  update(delta) {
    this.clouds.forEach(cloud => {
      cloud.position.x += cloud.speed * delta;
      if (cloud.position.x > 26) {
        cloud.position.x = -26;
        cloud.position.z = -15 + Math.random() * 30;
        cloud.position.y = 17 + Math.random() * 4;
      }
    });
  }
}

// --- 3D Dynamic Guidance Chevron Arrow (Stepped Voxel Chevron) ---
class GuidanceArrow {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(0, 0.06, 0);

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    const arrowMat = new THREE.MeshBasicMaterial({
      color: 0x25d366, // Electric Mint
      transparent: true,
      opacity: 0.95
    });
    const blackOutlineMat = new THREE.MeshBasicMaterial({
      color: 0x000000
    });

    const chevronOffsets = [0, 0.45, 0.9];
    this.chevrons = [];

    chevronOffsets.forEach((offsetZ, i) => {
      const segGroup = new THREE.Group();
      segGroup.position.z = offsetZ;

      // Left wing block with black base
      const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.52), arrowMat);
      leftWing.position.set(-0.2, 0.02, 0);
      leftWing.rotation.y = Math.PI / 4;

      const leftOutline = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.56), blackOutlineMat);
      leftOutline.position.set(-0.2, 0, 0);
      leftOutline.rotation.y = Math.PI / 4;

      // Right wing block with black base
      const rightWing = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.52), arrowMat);
      rightWing.position.set(0.2, 0.02, 0);
      rightWing.rotation.y = -Math.PI / 4;

      const rightOutline = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.56), blackOutlineMat);
      rightOutline.position.set(0.2, 0, 0);
      rightOutline.rotation.y = -Math.PI / 4;

      segGroup.add(leftOutline, leftWing, rightOutline, rightWing);
      this.group.add(segGroup);
      this.chevrons.push(segGroup);
    });
  }

  update(time, playerPos, targetPos) {
    if (!targetPos) {
      this.group.visible = false;
      return;
    }

    this.group.visible = true;

    const dir = targetPos.clone().sub(playerPos);
    dir.y = 0;
    const dist = dir.length();

    if (dist < 0.9) {
      this.group.position.set(targetPos.x, 0.08, targetPos.z);
    } else {
      dir.normalize();
      const arrowPos = playerPos.clone().addScaledVector(dir, 1.4);
      arrowPos.y = 0.06;
      this.group.position.copy(arrowPos);

      const angle = Math.atan2(dir.x, dir.z);
      this.group.rotation.y = angle;
    }

    this.chevrons.forEach((chev, idx) => {
      const pulse = ((time * 3 + idx * 0.35) % 1);
      chev.position.z = (idx * 0.4) + pulse * 0.15;
    });
  }
}

// --- Supermarket Shelf Unit (Voxel / Neo-Brutalist Block Stand) ---
class ShelfUnit {
  constructor(scene, x, z, rotationY = 0, itemType = 'TOMATO') {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.itemType = itemType;
    this.maxCapacity = 16;
    this.items = []; // visual meshes on shelf

    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);
    this.group.rotation.y = rotationY;

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    // 1. Stand Floor Mat with Category-Specific Thematic Tone
    let matColor = 0x576574;
    if (['TOMATO', 'CARROT', 'APPLE', 'CORN', 'STRAWBERRY'].includes(this.itemType)) {
      matColor = 0x10ac84; // Fresh Farm emerald green
    } else if (['BREAD', 'APPLE_PIE', 'FLOUR'].includes(this.itemType)) {
      matColor = 0xd35400; // Warm terracotta bakery
    } else if (['MILK', 'CHEESE', 'ICE_CREAM', 'EGG'].includes(this.itemType)) {
      matColor = 0x0984e3; // Ice chiller blue
    } else if (['POPCORN', 'PIZZA', 'SALAD_BOWL'].includes(this.itemType)) {
      matColor = 0xc0392b; // Hot deli red
    } else if (['STRAWBERRY_JAM', 'APPLE_JUICE'].includes(this.itemType)) {
      matColor = 0x8e44ad; // Gourmet boutique purple
    }

    const matGeo = new THREE.PlaneGeometry(2.8, 2.0);
    matGeo.rotateX(-Math.PI / 2);
    const matMat = new THREE.MeshStandardMaterial({ color: matColor, roughness: 0.8 });
    const mat = new THREE.Mesh(matGeo, matMat);
    mat.position.y = 0.005;
    mat.receiveShadow = true;
    this.group.add(mat);

    // 2. Custom Product-Specific 3D Voxel Architecture
    if (['TOMATO', 'CARROT', 'APPLE', 'CORN', 'STRAWBERRY'].includes(this.itemType)) {
      this.initProduceStand();
    } else if (['BREAD', 'APPLE_PIE', 'FLOUR'].includes(this.itemType)) {
      this.initBakeryCounter();
    } else if (['MILK', 'CHEESE', 'ICE_CREAM', 'EGG'].includes(this.itemType)) {
      this.initChillerCabinet();
    } else if (['POPCORN', 'PIZZA', 'SALAD_BOWL'].includes(this.itemType)) {
      this.initHotDeliWarmer();
    } else {
      this.initGourmetBoutiqueStand();
    }

    // 3. Overhead Directional Signboard & 3D Voxel Badge
    this.initOverheadSignAndBadge();
    this.createShelfStockHud();

    // 4. Standardized Item Slot Positions (2 tiers of 8 slots = 16 capacity)
    this.slotPositions = [];
    const tiers = [0.67, 1.30];
    tiers.forEach(tierY => {
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 4; c++) {
          this.slotPositions.push(new THREE.Vector3(
            -0.75 + c * 0.5,
            tierY + 0.12,
            -0.25 + r * 0.35
          ));
        }
      }
    });
  }

  createShelfStockHud() {
    this.stockHudGroup = new THREE.Group();
    this.stockHudGroup.position.set(0, 0.12, 0.72);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.55 });
    const bgMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.35 });
    this.stockFillMat = new THREE.MeshStandardMaterial({
      color: 0xff4757,
      emissive: 0xff4757,
      emissiveIntensity: 0.25,
      roughness: 0.35
    });

    const frame = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.16, 0.08), frameMat);
    const bg = new THREE.Mesh(new THREE.BoxGeometry(2.04, 0.08, 0.09), bgMat);
    bg.position.z = 0.01;
    this.stockFill = new THREE.Mesh(new THREE.BoxGeometry(1.96, 0.10, 0.10), this.stockFillMat);
    this.stockFill.position.set(-0.98, 0, 0.03);
    this.stockFill.scale.x = 0.001;

    this.stockHudGroup.add(frame, bg, this.stockFill);
    this.group.add(this.stockHudGroup);
    this.updateShelfStockHud();
  }

  updateShelfStockHud() {
    if (!this.stockFill || !this.stockFillMat) return;
    const ratio = Math.max(0, Math.min(1, this.items.length / this.maxCapacity));
    this.stockFill.scale.x = Math.max(0.001, ratio);
    this.stockFill.position.x = -0.98 + (1.96 * ratio) / 2;

    let color = 0xff4757;
    if (ratio >= 0.75) color = 0x2ed573;
    else if (ratio >= 0.35) color = 0xffe600;
    this.stockFillMat.color.setHex(color);
    this.stockFillMat.emissive.setHex(color);
  }

  // --- THEME 1: Rustic Wooden Farm Produce Stand ---
  initProduceStand() {
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.75 });
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.85 });
    const slatMat = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.65 });
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.5 });

    // Timber Plinth Base
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 1.2), woodMat);
    base.position.y = 0.125;
    base.castShadow = true;
    base.receiveShadow = true;

    // Rustic Backboard with Vertical Slats
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 0.16), darkWoodMat);
    back.position.set(0, 1.0, -0.5);
    back.castShadow = true;

    // 2 Angled Wooden Crate Shelf Trays
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.10, 0.9), slatMat);
    t1.position.set(0, 0.62, -0.05);
    t1.castShadow = true;
    const t1FrontLip = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 0.06), woodMat);
    t1FrontLip.position.set(0, 0.68, 0.40);

    const t2 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.10, 0.9), slatMat);
    t2.position.set(0, 1.25, -0.05);
    t2.castShadow = true;
    const t2FrontLip = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.12, 0.06), woodMat);
    t2FrontLip.position.set(0, 1.31, 0.40);

    // Decorative Corner Posts with Vine/Leaf Tufts
    [-1.15, 1.15].forEach(px => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.0, 0.12), darkWoodMat);
      post.position.set(px, 1.0, -0.5);
      post.castShadow = true;
      this.group.add(post);

      const leaf1 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.18), vineMat);
      leaf1.position.set(px, 1.85, -0.45);
      const leaf2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.14), vineMat);
      leaf2.position.set(px, 1.20, -0.45);
      this.group.add(leaf1, leaf2);
    });

    this.group.add(base, back, t1, t1FrontLip, t2, t2FrontLip);
  }

  // --- THEME 2: Artisan Parisian/Italian Bakery & Warm Pastry Showcase ---
  initBakeryCounter() {
    const mahoganyMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.5 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.2, metalness: 0.7 });
    const warmShelfMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.4 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x81ecec, transparent: true, opacity: 0.45, roughness: 0.1 });
    const awningRedMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.4 });
    const awningWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

    // Mahogany Cabinet Base with Brass Trim
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 1.2), mahoganyMat);
    base.position.y = 0.125;
    base.castShadow = true;
    const baseBrass = new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.05, 1.22), brassMat);
    baseBrass.position.y = 0.24;

    // Rich Wood Backboard
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 0.16), mahoganyMat);
    back.position.set(0, 1.0, -0.5);
    back.castShadow = true;

    // 2 Warm Terracotta Display Shelves with Brass Guard Rails
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.10, 0.9), warmShelfMat);
    t1.position.set(0, 0.62, -0.05);
    const t1Rail = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.04, 0.04), brassMat);
    t1Rail.position.set(0, 0.68, 0.40);

    const t2 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.10, 0.9), warmShelfMat);
    t2.position.set(0, 1.25, -0.05);
    const t2Rail = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.04, 0.04), brassMat);
    t2Rail.position.set(0, 1.31, 0.40);

    // Front Sneeze-Guard Glass Shield
    const glassShield = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.75, 0.06), glassMat);
    glassShield.position.set(0, 0.95, 0.42);

    // Iconic Red & White Striped Bakery Voxel Fabric Awning on Top
    const awningGroup = new THREE.Group();
    awningGroup.position.set(0, 2.05, 0.05);
    for (let c = 0; c < 8; c++) {
      const aMat = (c % 2 === 0) ? awningRedMat : awningWhiteMat;
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.14, 1.05), aMat);
      stripe.position.set(-1.05 + c * 0.30, 0, 0);
      stripe.rotation.x = 0.18; // slight forward slant
      stripe.castShadow = true;
      awningGroup.add(stripe);
    }

    this.group.add(base, baseBrass, back, t1, t1Rail, t2, t2Rail, glassShield, awningGroup);
  }

  // --- THEME 3: Commercial Chiller & Refrigerated Ice Cabinet ---
  initChillerCabinet() {
    const steelMat = new THREE.MeshStandardMaterial({ color: 0xced6e0, roughness: 0.3, metalness: 0.6 });
    const cyanFrameMat = new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.25 });
    const iceShelfMat = new THREE.MeshStandardMaterial({ color: 0x74b9ff, roughness: 0.2, metalness: 0.2 });
    const ventMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.8 });
    const cyanLEDMat = new THREE.MeshStandardMaterial({ color: 0x00cec9, emissive: 0x00cec9, emissiveIntensity: 0.8 });
    const glassDoorMat = new THREE.MeshStandardMaterial({ color: 0x81ecec, transparent: true, opacity: 0.40, roughness: 0.05 });

    // Stainless Steel Base with Bottom Air Ventilation Louver Grille
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.28, 1.2), steelMat);
    base.position.y = 0.14;
    base.castShadow = true;

    for (let v = 0; v < 3; v++) {
      const vent = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.03, 0.04), ventMat);
      vent.position.set(0, 0.07 + v * 0.06, 0.61);
      this.group.add(vent);
    }

    // Heavy Chiller Insulated Back & Side Walls
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 0.16), cyanFrameMat);
    back.position.set(0, 1.0, -0.5);
    back.castShadow = true;

    [-1.15, 1.15].forEach(sx => {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.8, 1.1), cyanFrameMat);
      side.position.set(sx, 1.15, 0.05);
      side.castShadow = true;
      this.group.add(side);
    });

    // 2 Chilled Frosted Blue Display Shelves
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.08, 0.9), iceShelfMat);
    t1.position.set(0, 0.62, -0.05);
    const t2 = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.08, 0.9), iceShelfMat);
    t2.position.set(0, 1.25, -0.05);

    // Overhead Cyan Cold LED Light Bar
    const ledBar = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.06, 0.12), cyanLEDMat);
    ledBar.position.set(0, 1.95, -0.3);

    // Front Sliding Glass Panel
    const glassDoor = new THREE.Mesh(new THREE.BoxGeometry(2.18, 1.45, 0.04), glassDoorMat);
    glassDoor.position.set(0, 1.0, 0.42);

    this.group.add(base, back, t1, t2, ledBar, glassDoor);
  }

  // --- THEME 4: Hot Delicatessen & Fast Food Heated Warmer Counter ---
  initHotDeliWarmer() {
    const redChassisMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.35 });
    const yellowTrimMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 });
    const heatLampMat = new THREE.MeshStandardMaterial({ color: 0xff9f43, emissive: 0xff9f43, emissiveIntensity: 0.85 });
    const steelTrayMat = new THREE.MeshStandardMaterial({ color: 0xdfe6e9, roughness: 0.15, metalness: 0.8 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xffeedb, transparent: true, opacity: 0.35, roughness: 0.1 });

    // Bold Food-Court Red Base with Yellow Accent Band
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 1.2), redChassisMat);
    base.position.y = 0.125;
    base.castShadow = true;

    const yellowBand = new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.05, 1.22), yellowTrimMat);
    yellowBand.position.y = 0.23;

    // Dark Enclosure Back Wall
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 0.16), redChassisMat);
    back.position.set(0, 1.0, -0.5);
    back.castShadow = true;

    // 2 Polished Stainless Steel Heating Trays
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.10, 0.9), steelTrayMat);
    t1.position.set(0, 0.62, -0.05);
    const t2 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.10, 0.9), steelTrayMat);
    t2.position.set(0, 1.25, -0.05);

    // Overhead Industrial Heated Lamp Hood & Radiant Bulbs
    const hood = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.18, 0.85), redChassisMat);
    hood.position.set(0, 2.0, 0.0);
    hood.castShadow = true;

    [-0.7, 0, 0.7].forEach(lx => {
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.24), heatLampMat);
      lamp.position.set(lx, 1.88, 0.0);
      this.group.add(lamp);
    });

    // Angled Clear Food Sneeze Guard
    const sneezeGuard = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.65, 0.05), glassMat);
    sneezeGuard.position.set(0, 0.95, 0.40);

    this.group.add(base, yellowBand, back, t1, t2, hood, sneezeGuard);
  }

  // --- THEME 5: Gourmet Preserves & Specialty Beverage Boutique Showcase ---
  initGourmetBoutiqueStand() {
    const lacquerMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.2 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.2, metalness: 0.75 });
    const purpleTrimMat = new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.4 });
    const crystalShelfMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, transparent: true, opacity: 0.85 });

    // Polished Obsidian Lacquer Base with Gold Pinstripe
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 1.2), lacquerMat);
    base.position.y = 0.125;
    base.castShadow = true;

    const goldPinstripe = new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.04, 1.22), goldMat);
    goldPinstripe.position.y = 0.23;

    // Back Panel with Royal Velvet Inset
    const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.0, 0.16), lacquerMat);
    back.position.set(0, 1.0, -0.5);
    back.castShadow = true;

    const velvetInset = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.7, 0.04), purpleTrimMat);
    velvetInset.position.set(0, 1.0, -0.40);

    // 2 Crystal Stepped Shelves with Gold Support Brackets
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 0.9), crystalShelfMat);
    t1.position.set(0, 0.62, -0.05);
    const t2 = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 0.9), crystalShelfMat);
    t2.position.set(0, 1.25, -0.05);

    // Gold Corner Pillars & Arch Crown
    [-1.15, 1.15].forEach(cx => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.10, 2.0, 0.10), goldMat);
      col.position.set(cx, 1.0, -0.45);
      col.castShadow = true;
      this.group.add(col);
    });

    const topArch = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 0.4), goldMat);
    topArch.position.set(0, 2.05, -0.45);

    this.group.add(base, goldPinstripe, back, velvetInset, t1, t2, topArch);
  }

  // --- Overhead Department Directional Sign & 3D Voxel Rotating Logo ---
  initOverheadSignAndBadge() {
    const postMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.72, 0.08), postMat);
    leftPost.position.set(-0.9, 2.15, -0.5);
    const rightPost = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.72, 0.08), postMat);
    rightPost.position.set(0.9, 2.15, -0.5);
    this.group.add(leftPost, rightPost);

    // Dedicated 3D Billboard Group (dynamically aligns with camera sightline for 100% legibility)
    this.billboardGroup = new THREE.Group();
    this.billboardGroup.position.set(0, 2.40, -0.5);

    // Signboard Plaque with Neo-Brutalist Black Border Frame
    const signFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.02, 0.68, 0.10),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 })
    );

    const signTexture = getShelfSignTexture(this.itemType);
    const signMat = new THREE.MeshStandardMaterial({ map: signTexture, roughness: 0.2 });
    const sideMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 });
    const signBoardMaterials = [sideMat, sideMat, sideMat, sideMat, signMat, signMat];
    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(1.94, 0.60, 0.12),
      signBoardMaterials
    );
    signBoard.castShadow = true;
    this.billboardGroup.add(signFrame, signBoard);

    // Dynamic Blinking Status Lamp on Signboard Top-Right Corner
    this.statusLampMat = new THREE.MeshStandardMaterial({
      color: 0xff4757,
      emissive: 0xff4757,
      emissiveIntensity: 0.85
    });
    this.statusLamp = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.16, 0.16),
      this.statusLampMat
    );
    this.statusLamp.position.set(0.88, 0.26, 0.06);
    this.billboardGroup.add(this.statusLamp);

    // 3D Voxel Floating & Rotating Product Logo
    this.floatingLogo = createVoxelProductLogo(this.itemType);
    this.floatingLogo.position.set(0, 0.60, 0);
    this.billboardGroup.add(this.floatingLogo);

    // Dynamic "⚠️ TÜKENDİ (0/16)" Neo-Brutalist Empty Alert Plaque
    this.emptyAlertGroup = new THREE.Group();
    this.emptyAlertGroup.position.set(0, 1.05, 0.02);

    const alertFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.62, 0.52, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    const alertTex = getEmptyAlertTexture(this.itemType);
    const alertMat = new THREE.MeshStandardMaterial({ map: alertTex, roughness: 0.2 });
    const alertMaterials = [sideMat, sideMat, sideMat, sideMat, alertMat, alertMat];
    const alertFace = new THREE.Mesh(
      new THREE.BoxGeometry(1.54, 0.44, 0.10),
      alertMaterials
    );
    this.emptyAlertGroup.add(alertFrame, alertFace);
    this.emptyAlertGroup.visible = this.items.length === 0;
    this.billboardGroup.add(this.emptyAlertGroup);

    this.group.add(this.billboardGroup);
  }

  isFull() {
    return this.items.length >= this.maxCapacity;
  }

  hasItems() {
    return this.items.length > 0;
  }

  // Stock an item onto the shelf (Clean Voxel Cubes)
  stockItem(type) {
    if (this.isFull() || type !== this.itemType) return false;

    const index = this.items.length;
    const pos = this.slotPositions[index];

    let mesh;
    if (type === 'TOMATO') {
      mesh = new THREE.Group();
      const b = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.24, 0.24),
        new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.25 })
      );
      b.castShadow = true;
      const s = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.08, 0.06),
        new THREE.MeshBasicMaterial({ color: 0x25d366 })
      );
      s.position.y = 0.14;
      mesh.add(b, s);
    } else if (type === 'EGG') {
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.28, 0.22),
        new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.35 })
      );
      mesh.castShadow = true;
    } else if (type === 'BREAD') {
      mesh = new THREE.Group();
      const loaf = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.18, 0.22),
        new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.45 })
      );
      loaf.castShadow = true;
      const score = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.02, 0.12),
        new THREE.MeshBasicMaterial({ color: 0xffeedb })
      );
      score.position.y = 0.10;
      mesh.add(loaf, score);
    } else if (type === 'CHEESE') {
      mesh = new THREE.Group();
      const cheese = new THREE.Mesh(
        new THREE.BoxGeometry(0.30, 0.16, 0.24),
        new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 })
      );
      cheese.castShadow = true;
      const rind = new THREE.Mesh(
        new THREE.BoxGeometry(0.31, 0.17, 0.04),
        new THREE.MeshStandardMaterial({ color: 0xe67e22 })
      );
      rind.position.z = -0.11;
      mesh.add(cheese, rind);
    } else if (type === 'MILK') {
      mesh = new THREE.Group();
      const b = new THREE.Mesh(
        new THREE.BoxGeometry(0.20, 0.26, 0.20),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
      );
      b.castShadow = true;
      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.04, 0.12),
        new THREE.MeshStandardMaterial({ color: 0xff5252 })
      );
      cap.position.y = 0.15;
      mesh.add(b, cap);
    } else if (type === 'FLOUR') {
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.26, 0.24, 0.22),
        new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.4 })
      );
      mesh.castShadow = true;
    } else if (type === 'CORN') {
      mesh = new THREE.Group();
      const cob = new THREE.Mesh(
        new THREE.BoxGeometry(0.20, 0.30, 0.20),
        new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 })
      );
      cob.castShadow = true;
      const husk = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.22), new THREE.MeshStandardMaterial({ color: 0x2ed573 }));
      husk.position.set(-0.09, -0.04, 0);
      mesh.add(cob, husk);
    } else if (type === 'POPCORN') {
      mesh = new THREE.Group();
      const cup = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.22, 0.24),
        new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.4 })
      );
      cup.castShadow = true;
      const pop = new THREE.Mesh(
        new THREE.BoxGeometry(0.26, 0.10, 0.26),
        new THREE.MeshStandardMaterial({ color: 0xfffa65, roughness: 0.8 })
      );
      pop.position.y = 0.14;
      mesh.add(cup, pop);
    } else if (type === 'APPLE') {
      mesh = new THREE.Group();
      const apple = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.24, 0.24),
        new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.25 })
      );
      apple.castShadow = true;
      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.05), new THREE.MeshStandardMaterial({ color: 0x5d4037 }));
      stem.position.y = 0.15;
      mesh.add(apple, stem);
    } else if (type === 'APPLE_JUICE') {
      mesh = new THREE.Group();
      const bot = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.24, 0.18),
        new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
      );
      bot.castShadow = true;
      const jCore = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.18, 0.15), new THREE.MeshStandardMaterial({ color: 0xf39c12 }));
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.04, 0.10), new THREE.MeshStandardMaterial({ color: 0x2ed573 }));
      cap.position.y = 0.13;
      mesh.add(bot, jCore, cap);
    } else if (type === 'APPLE_PIE') {
      mesh = new THREE.Group();
      const pan = new THREE.Mesh(
        new THREE.BoxGeometry(0.30, 0.08, 0.30),
        new THREE.MeshStandardMaterial({ color: 0xbdc3c7, roughness: 0.3 })
      );
      pan.castShadow = true;
      const crust = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.28), new THREE.MeshStandardMaterial({ color: 0xe67e22 }));
      crust.position.y = 0.06;
      mesh.add(pan, crust);
    } else if (type === 'STRAWBERRY') {
      mesh = new THREE.Group();
      const berry = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.24, 0.22),
        new THREE.MeshStandardMaterial({ color: 0xff2a55, roughness: 0.25 })
      );
      berry.castShadow = true;
      const calyx = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.24), new THREE.MeshBasicMaterial({ color: 0x25d366 }));
      calyx.position.y = 0.13;
      mesh.add(berry, calyx);
    } else if (type === 'CARROT') {
      mesh = new THREE.Group();
      const r = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.26, 0.18),
        new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.35 })
      );
      r.castShadow = true;
      const g = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.10, 0.08), new THREE.MeshBasicMaterial({ color: 0x2ecc71 }));
      g.position.y = 0.16;
      mesh.add(r, g);
    } else if (type === 'STRAWBERRY_JAM') {
      mesh = new THREE.Group();
      const jar = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.24, 0.22),
        new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.3 })
      );
      jar.castShadow = true;
      const lid = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.24), new THREE.MeshStandardMaterial({ color: 0xff4757 }));
      lid.position.y = 0.13;
      mesh.add(jar, lid);
    } else if (type === 'PIZZA') {
      mesh = new THREE.Group();
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.07, 0.34),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
      );
      box.castShadow = true;
      const crust = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.03, 0.28), new THREE.MeshStandardMaterial({ color: 0xd35400 }));
      crust.position.y = 0.04;
      const cheese = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.02, 0.22), new THREE.MeshStandardMaterial({ color: 0xffe600 }));
      cheese.position.y = 0.06;
      mesh.add(box, crust, cheese);
    } else if (type === 'ICE_CREAM') {
      mesh = new THREE.Group();
      const cup = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.16, 0.22),
        new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.3 })
      );
      cup.castShadow = true;
      const swirl = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.24), new THREE.MeshStandardMaterial({ color: 0xff7675 }));
      swirl.position.y = 0.13;
      mesh.add(cup, swirl);
    } else if (type === 'SALAD_BOWL') {
      mesh = new THREE.Group();
      const bowl = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.12, 0.28),
        new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.6 })
      );
      bowl.castShadow = true;
      const greens = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.24), new THREE.MeshStandardMaterial({ color: 0x2ed573 }));
      greens.position.y = 0.07;
      mesh.add(bowl, greens);
    } else if (type === 'TOAST') {
      mesh = new THREE.Group();
      const crust = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.22, 0.10),
        new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.5 })
      );
      crust.castShadow = true;
      const crumb = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.18, 0.11),
        new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.4 })
      );
      mesh.add(crust, crumb);
    } else {
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.20, 0.24),
        new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.5 })
      );
      mesh.castShadow = true;
    }

    // Apply player brand packaging color if registered
    const brand = window.gameInstance?.brandState?.brands?.[type];
    if (brand && brand.colorHex && mesh) {
      const col = parseInt(brand.colorHex.replace('#', '0x'), 16);
      if (!isNaN(col)) {
        mesh.traverse(c => {
          if (c.isMesh && c.material && c.material.color) {
            c.material = c.material.clone();
            c.material.color.setHex(col);
          }
        });
      }
    }

    mesh.userData = { spawnedAt: Date.now() };
    mesh.position.copy(pos);
    this.group.add(mesh);
    this.items.push(mesh);
    this.updateShelfStockHud();
    return true;
  }

  // Customer takes one item
  takeItem() {
    if (!this.hasItems()) return null;
    const mesh = this.items.pop();
    this.group.remove(mesh);
    this.updateShelfStockHud();
    return this.itemType;
  }

  // Per-frame animation for billboard camera alignment, logo floating/rotation and dynamic alert bouncing
  update(delta, time = Date.now() * 0.001, camera = null) {
    const cam = camera || (window.gameInstance && window.gameInstance.camera);
    if (cam && this.billboardGroup) {
      // Calculate local rotation so billboardGroup matches camera.quaternion exactly in world space
      this.billboardGroup.quaternion.copy(this.group.quaternion).invert().multiply(cam.quaternion);
    }

    if (this.floatingLogo) {
      this.floatingLogo.rotation.y += delta * 1.5;
      this.floatingLogo.position.y = 0.60 + Math.sin(time * 2.8) * 0.05;
    }

    const isEmpty = (this.items.length === 0);
    const isFull = this.isFull();
    this.updateShelfStockHud();
    if (this.emptyAlertGroup) {
      if (isEmpty) {
        this.emptyAlertGroup.visible = true;
        const bounce = 1.0 + Math.sin(time * 6.0) * 0.08;
        this.emptyAlertGroup.scale.set(bounce, bounce, bounce);
        this.emptyAlertGroup.position.y = 1.05 + Math.sin(time * 6.0) * 0.04;

        // Pulse warning lamp
        const isYellow = Math.sin(time * 8.0) > 0;
        this.statusLampMat.color.setHex(isYellow ? 0xffe600 : 0xff4757);
        this.statusLampMat.emissive.setHex(isYellow ? 0xffe600 : 0xff4757);
        this.statusLampMat.emissiveIntensity = 0.95;
      } else {
        this.emptyAlertGroup.visible = false;
        if (isFull) {
          this.statusLampMat.color.setHex(0x2ed573);
          this.statusLampMat.emissive.setHex(0x2ed573);
          this.statusLampMat.emissiveIntensity = 0.6;
        } else {
          this.statusLampMat.color.setHex(0xffe600);
          this.statusLampMat.emissive.setHex(0xffe600);
          this.statusLampMat.emissiveIntensity = 0.7;
        }
      }
    }
  }
}

// --- Checkout Register Counter (Stepped Cubic Coral Desk) ---
class CheckoutCounter {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.cashOnCounter = 0;
    this.cashMeshes = [];
    this.hasCashier = false;

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    // Coral / Soft Red U-Shaped Counter Desk
    const coralDeskMat = new THREE.MeshStandardMaterial({ color: 0xff5252, roughness: 0.35 });
    const darkConveyorMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3 });
    const whiteTrimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });

    // 1. Front Desk Counter Block
    const frontDesk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.0, 0.65), coralDeskMat);
    frontDesk.position.set(0, 0.5, -0.45);
    frontDesk.castShadow = true;
    frontDesk.receiveShadow = true;
    this.group.add(frontDesk);

    // 2. Left Side Wing Block
    const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.58, 1.0, 1.1), coralDeskMat);
    leftWing.position.set(-0.91, 0.5, 0.1);
    leftWing.castShadow = true;
    this.group.add(leftWing);

    // 3. Right Side Wing Block
    const rightWing = new THREE.Mesh(new THREE.BoxGeometry(0.58, 1.0, 1.1), coralDeskMat);
    rightWing.position.set(0.91, 0.5, 0.1);
    rightWing.castShadow = true;
    this.group.add(rightWing);

    // White Protective Rim along top edge
    const rimFront = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.08, 0.06), whiteTrimMat);
    rimFront.position.set(0, 1.04, -0.76);
    this.group.add(rimFront);

    // Charcoal Black Conveyor Belt slab
    const conveyor = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.55), darkConveyorMat);
    conveyor.position.set(-0.25, 1.03, -0.45);
    conveyor.castShadow = true;
    this.group.add(conveyor);

    // Register Terminal & Screen
    const regBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.18, 0.28),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    regBase.position.set(-0.25, 1.12, -0.32);
    regBase.castShadow = true;

    const regScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.24, 0.06),
      new THREE.MeshBasicMaterial({ color: 0x25d366 })
    );
    regScreen.position.set(-0.25, 1.30, -0.24);
    regScreen.rotation.x = -0.25;
    this.group.add(regBase, regScreen);

    // Cash Money Tray on right side wing
    const trayMat = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.6 });
    const cashTray = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.08, 0.52), trayMat);
    cashTray.position.set(0.91, 1.04, -0.15);
    cashTray.castShadow = true;
    this.group.add(cashTray);

    // Cash pile mount point
    this.cashMount = new THREE.Group();
    this.cashMount.position.set(0.91, 1.09, -0.15);
    this.group.add(this.cashMount);

    // 3D Neo-Brutalist Checkout Progress Bar on top of register
    this.progressGroup = new THREE.Group();
    this.progressGroup.position.set(-0.25, 1.72, -0.25);

    // Black frame
    const barFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.24, 0.20, 0.10),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    // Dark slot background
    const barBg = new THREE.Mesh(
      new THREE.BoxGeometry(1.16, 0.14, 0.11),
      new THREE.MeshBasicMaterial({ color: 0x222222 })
    );
    // Dynamic green fill bar (anchored to left)
    const fillGeo = new THREE.BoxGeometry(1.14, 0.12, 0.12);
    fillGeo.translate(0.57, 0, 0); // anchor left
    this.progressBarFill = new THREE.Mesh(
      fillGeo,
      new THREE.MeshBasicMaterial({ color: 0x2ecc71 })
    );
    this.progressBarFill.position.set(-0.57, 0, 0);
    this.progressBarFill.scale.set(0.001, 1, 1);

    this.progressGroup.add(barFrame, barBg, this.progressBarFill);
    this.progressGroup.visible = false;
    this.group.add(this.progressGroup);
  }

  // Show checkout processing progress
  showProgress(ratio, isFastBonus = false) {
    this.progressGroup.visible = true;
    const cam = (window.gameInstance && window.gameInstance.camera);
    if (cam) {
      this.progressGroup.quaternion.copy(this.group.quaternion).invert().multiply(cam.quaternion);
    }
    const clamped = Math.max(0.001, Math.min(1.0, ratio));
    this.progressBarFill.scale.x = clamped;
    this.progressBarFill.material.color.setHex(isFastBonus ? 0x00d2d3 : 0x2ecc71);
  }

  hideProgress() {
    this.progressGroup.visible = false;
    this.progressBarFill.scale.x = 0.001;
  }

  // Add dollar bills to the counter
  addCash(amount) {
    this.cashOnCounter += amount;
    this.updateCashVisuals();
  }

  updateCashVisuals() {
    while (this.cashMeshes.length > 0) {
      const mesh = this.cashMeshes.pop();
      this.cashMount.remove(mesh);
    }

    const billCount = Math.min(Math.floor(this.cashOnCounter / 5) + 1, 18);
    const billGeo = new THREE.BoxGeometry(0.36, 0.045, 0.22);
    const billMat = new THREE.MeshStandardMaterial({ color: 0x25d366, roughness: 0.3 });

    for (let i = 0; i < billCount; i++) {
      const bill = new THREE.Mesh(billGeo, billMat);
      bill.position.set(0, i * 0.048, 0);
      bill.rotation.y = (Math.random() - 0.5) * 0.15;
      this.cashMount.add(bill);
      this.cashMeshes.push(bill);
    }
  }

  // Collect cash when player steps onto register cash area
  collectCash() {
    const collected = this.cashOnCounter;
    this.cashOnCounter = 0;
    this.updateCashVisuals();
    return collected;
  }
}

// --- Dashed Corner Bracket Unlock Pad with 3D Voxel Dollar Bill ---
class UnlockPad {
  constructor(scene, x, z, targetCost, title, onUnlock) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.targetCost = targetCost;
    this.remainingCost = targetCost;
    this.requiredLevel = 1;
    this.currentMarketLevel = 1;
    this.title = title;
    this.onUnlock = onUnlock;
    this.isUnlocked = false;

    this.group = new THREE.Group();
    this.group.position.set(x, 0.02, z);

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    // 1. Chunky 3D Corner Brackets [ ] Decal on Floor
    this.bracketGroup = new THREE.Group();
    const bracketMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const size = 1.3;
    const armLength = 0.45;
    const thickness = 0.10;

    const corners = [
      [-size, -size, 1, 1],
      [size, -size, -1, 1],
      [-size, size, 1, -1],
      [size, size, -1, -1]
    ];

    corners.forEach(([cx, cz, dx, dz]) => {
      // Horizontal segment bar
      const hBar = new THREE.Mesh(new THREE.BoxGeometry(armLength, 0.03, thickness), bracketMat);
      hBar.position.set(cx + dx * (armLength / 2), 0.015, cz);
      // Vertical segment bar
      const vBar = new THREE.Mesh(new THREE.BoxGeometry(thickness, 0.03, armLength), bracketMat);
      vBar.position.set(cx, 0.015, cz + dz * (armLength / 2));

      this.bracketGroup.add(hBar, vBar);
    });
    this.group.add(this.bracketGroup);

    // Glowing center pad (Electric Mint)
    const centerPad = new THREE.Mesh(
      new THREE.PlaneGeometry(size * 1.9, size * 1.9),
      new THREE.MeshBasicMaterial({
        color: 0x25d366,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide
      })
    );
    centerPad.rotateX(-Math.PI / 2);
    centerPad.position.y = 0.005;
    this.group.add(centerPad);

    // 2. Floating 3D Voxel Dollar Bill Block
    this.floatingIcon = new THREE.Group();
    this.floatingIcon.position.y = 0.9;

    const billGeo = new THREE.BoxGeometry(0.44, 0.08, 0.26);
    const billMat = new THREE.MeshStandardMaterial({
      color: 0x25d366,
      roughness: 0.3
    });
    const billMesh = new THREE.Mesh(billGeo, billMat);
    billMesh.castShadow = true;

    // White dollar sign border
    const whiteBorder = new THREE.Mesh(
      new THREE.BoxGeometry(0.36, 0.09, 0.18),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    );
    this.floatingIcon.add(billMesh, whiteBorder);
    this.group.add(this.floatingIcon);

    // 3. Dynamic Canvas Text Label (Title & Price) with Neo-Brutalist typography
    this.canvas = document.createElement('canvas');
    this.canvas.width = 256;
    this.canvas.height = 128;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);

    const labelGeo = new THREE.PlaneGeometry(1.6, 0.8);
    labelGeo.rotateX(-Math.PI / 2);
    const labelMat = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true
    });
    this.labelMesh = new THREE.Mesh(labelGeo, labelMat);
    this.labelMesh.position.y = 0.03;
    this.group.add(this.labelMesh);

    this.updateLabel();
  }

  updateLabel() {
    this.ctx.clearRect(0, 0, 256, 128);

    // Title in bold white with black stroke
    this.ctx.font = '900 24px "Space Grotesk", sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 5;
    this.ctx.strokeText(this.title, 128, 44);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText(this.title, 128, 44);

    // Price in vibrant yellow with thick black stroke
    this.ctx.font = '900 40px "Space Grotesk", sans-serif';
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 6;
    const locked = this.currentMarketLevel < this.requiredLevel;
    const status = locked ? `SEVİYE ${this.requiredLevel}` : `$${this.remainingCost}`;
    this.ctx.strokeText(status, 128, 96);
    this.ctx.fillStyle = locked ? '#FF5252' : '#FFE600';
    this.ctx.fillText(status, 128, 96);

    this.texture.needsUpdate = true;
  }

  // Feed money into the pad
  pay(amount) {
    if (this.isUnlocked) return 0;
    const payment = Math.min(amount, this.remainingCost);
    this.remainingCost -= payment;
    this.updateLabel();

    if (this.remainingCost <= 0) {
      this.isUnlocked = true;
      this.destroy();
      if (this.onUnlock) this.onUnlock();
    }
    return payment;
  }

  update(time) {
    if (this.isUnlocked) return;
    // Floating bill bobbing and rotating
    this.floatingIcon.position.y = 0.9 + Math.sin(time * 3) * 0.08;
    this.floatingIcon.rotation.y = time * 1.5;

    // Gentle pulse on corner brackets
    const pulse = 1 + Math.sin(time * 4) * 0.03;
    this.bracketGroup.scale.set(pulse, 1, pulse);
  }

  destroy() {
    this.scene.remove(this.group);
  }
}

// --- Low Poly Cubic Voxel Vehicle & Transport Simulator ---
class VoxelVehicle {
  constructor(scene, type = 'CAR', colorHex = null) {
    this.scene = scene;
    this.type = type; // 'CAR', 'SCOOTER', 'BICYCLE', 'TRUCK', 'VIP'
    this.group = new THREE.Group();
    this.velocity = new THREE.Vector3();
    this.speed = 0;
    this.wheels = [];
    this.smokeTimer = 0;
    this.isParked = false;

    const carColors = [0xe74c3c, 0x0984e3, 0xf1c40f, 0x9b59b6, 0x00cec9, 0x2ecc71, 0xff7675, 0xffffff, 0x34495e];
    this.color = colorHex || (type === 'VIP' ? 0xffe600 : carColors[Math.floor(Math.random() * carColors.length)]);

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.2, metalness: 0.6 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x222f3e, roughness: 0.1 });
    const headlampMat = new THREE.MeshBasicMaterial({ color: 0xfffa65 });
    const taillampMat = new THREE.MeshBasicMaterial({ color: 0xff3838 });
    const bodyMat = new THREE.MeshStandardMaterial({ color: this.color, roughness: 0.35 });

    if (this.type === 'CAR' || this.type === 'VIP') {
      // Lower Chassis
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 2.8), bodyMat);
      chassis.position.y = 0.40;
      chassis.castShadow = true;
      chassis.receiveShadow = true;
      this.group.add(chassis);

      // Cabin / Roof
      const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.48, 1.5), bodyMat);
      cabin.position.set(0, 0.82, -0.15);
      cabin.castShadow = true;
      this.group.add(cabin);

      // Windshield & Windows
      const fGlass = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.38, 0.08), glassMat);
      fGlass.position.set(0, 0.78, 0.62);
      const bGlass = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.38, 0.08), glassMat);
      bGlass.position.set(0, 0.78, -0.92);
      const sGlassL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 1.3), glassMat);
      sGlassL.position.set(-0.68, 0.78, -0.15);
      const sGlassR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 1.3), glassMat);
      sGlassR.position.set(0.68, 0.78, -0.15);
      this.group.add(fGlass, bGlass, sGlassL, sGlassR);

      // Headlights & Taillights
      const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.14, 0.08), headlampMat);
      hlL.position.set(-0.55, 0.42, 1.41);
      const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.14, 0.08), headlampMat);
      hlR.position.set(0.55, 0.42, 1.41);
      const tlL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.08), taillampMat);
      tlL.position.set(-0.55, 0.44, -1.41);
      const tlR = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.08), taillampMat);
      tlR.position.set(0.55, 0.44, -1.41);
      this.group.add(hlL, hlR, tlL, tlR);

      // 4 Wheels
      const wheelOffsets = [
        [-0.82, 0.22, 0.85],
        [0.82, 0.22, 0.85],
        [-0.82, 0.22, -0.85],
        [0.82, 0.22, -0.85]
      ];
      wheelOffsets.forEach(([wx, wy, wz]) => {
        const w = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.42, 0.42), blackMat);
        w.position.set(wx, wy, wz);
        w.castShadow = true;
        this.group.add(w);
        this.wheels.push(w);
      });

      // VIP Golden Trim & Crown Emblem
      if (this.type === 'VIP') {
        const vipTrim = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.08, 2.84), new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 0.1, metalness: 0.9 }));
        vipTrim.position.y = 0.62;
        this.group.add(vipTrim);
      }
    } else if (this.type === 'SCOOTER') {
      // Vespa-style Voxel Scooter
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.30, 1.3), bodyMat);
      frame.position.y = 0.32;
      frame.castShadow = true;
      this.group.add(frame);

      const shield = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.55, 0.10), bodyMat);
      shield.position.set(0, 0.62, 0.55);
      shield.rotation.x = -0.15;
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.06, 0.06), chromeMat);
      bar.position.set(0, 0.92, 0.48);
      const headlamp = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.08), headlampMat);
      headlamp.position.set(0, 0.88, 0.54);
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.12, 0.55), blackMat);
      seat.position.set(0, 0.52, -0.15);
      const taillight = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.10, 0.06), taillampMat);
      taillight.position.set(0, 0.40, -0.66);
      this.group.add(shield, bar, headlamp, seat, taillight);

      // 2 Wheels
      [0.55, -0.55].forEach(wz => {
        const w = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.34, 0.34), blackMat);
        w.position.set(0, 0.17, wz);
        w.castShadow = true;
        this.group.add(w);
        this.wheels.push(w);
      });
    } else if (this.type === 'BICYCLE') {
      // Classic Voxel Bicycle
      const bar1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.8), bodyMat);
      bar1.position.set(0, 0.50, 0);
      const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), bodyMat);
      bar2.position.set(0, 0.40, 0.35);
      bar2.rotation.x = -0.2;
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.05, 0.05), chromeMat);
      handle.position.set(0, 0.72, 0.32);
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.22), blackMat);
      seat.position.set(0, 0.56, -0.20);
      this.group.add(bar1, bar2, handle, seat);

      // 2 Wheels
      [0.45, -0.45].forEach(wz => {
        const w = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.42, 0.42), blackMat);
        w.position.set(0, 0.21, wz);
        w.castShadow = true;
        this.group.add(w);
        this.wheels.push(w);
      });
    } else if (this.type === 'TRUCK') {
      // Heavy Transit Box Truck
      const cab = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.4), bodyMat);
      cab.position.set(0, 0.85, 1.1);
      cab.castShadow = true;
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.85, 1.4, 2.6), new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.4 }));
      box.position.set(0, 0.95, -0.8);
      box.castShadow = true;
      const fGlass = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.45, 0.08), glassMat);
      fGlass.position.set(0, 1.05, 1.81);
      const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.08), headlampMat);
      hlL.position.set(-0.65, 0.45, 1.81);
      const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.08), headlampMat);
      hlR.position.set(0.65, 0.45, 1.81);
      this.group.add(cab, box, fGlass, hlL, hlR);

      // 6 Wheels
      const wOffsets = [
        [-0.95, 0.28, 1.1], [0.95, 0.28, 1.1],
        [-0.95, 0.28, -0.4], [0.95, 0.28, -0.4],
        [-0.95, 0.28, -1.3], [0.95, 0.28, -1.3]
      ];
      wOffsets.forEach(([wx, wy, wz]) => {
        const w = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.55, 0.55), blackMat);
        w.position.set(wx, wy, wz);
        w.castShadow = true;
        this.group.add(w);
        this.wheels.push(w);
      });
    }
  }

  update(delta) {
    if (this.speed > 0.01) {
      const rotDelta = (this.speed * delta) / 0.25;
      this.wheels.forEach(w => {
        w.rotation.x += rotDelta;
      });

      this.smokeTimer -= delta;
      if (this.smokeTimer <= 0 && this.type !== 'BICYCLE') {
        if (window.gameInstance && window.gameInstance.particleFX) {
          const exhaustPos = this.group.position.clone();
          exhaustPos.y += 0.25;
          window.gameInstance.particleFX.spawnDustPuff(exhaustPos, 1, 0x7f8c8d);
        }
        this.smokeTimer = 0.22;
      }
    }
  }

  destroy() {
    this.scene.remove(this.group);
  }
}

// --- North Parking Lot Manager & Multi-Modal Bay Dispatcher ---
class ParkingLotManager {
  constructor(scene) {
    this.scene = scene;
    this.spots = [
      { id: 0, x: -12.5, z: -28.5, type: 'CAR', occupied: false, vehicle: null },
      { id: 1, x: -7.5, z: -28.5, type: 'CAR', occupied: false, vehicle: null },
      { id: 2, x: -2.5, z: -28.5, type: 'CAR', occupied: false, vehicle: null },
      { id: 3, x: 2.5, z: -28.5, type: 'CAR', occupied: false, vehicle: null },
      { id: 4, x: 7.5, z: -28.5, type: 'CAR', occupied: false, vehicle: null },
      { id: 5, x: 12.5, z: -28.5, type: 'CAR', occupied: false, vehicle: null },
      { id: 6, x: -16.5, z: -28.0, type: 'SCOOTER', occupied: false, vehicle: null },
      { id: 7, x: -18.0, z: -28.0, type: 'SCOOTER', occupied: false, vehicle: null },
      { id: 8, x: 16.5, z: -28.0, type: 'BICYCLE', occupied: false, vehicle: null },
      { id: 9, x: 18.0, z: -28.0, type: 'BICYCLE', occupied: false, vehicle: null }
    ];
    this.departingVehicles = [];
  }

  reserveSpot(type = 'CAR') {
    const available = this.spots.filter(s => s.type === type && !s.occupied);
    if (available.length === 0) return null;
    const spot = available[Math.floor(Math.random() * available.length)];
    spot.occupied = true;
    return spot;
  }

  releaseSpot(spot) {
    if (!spot) return;
    const found = this.spots.find(s => s.id === spot.id);
    if (found) {
      found.occupied = false;
      found.vehicle = null;
    }
  }

  departVehicle(vehicle, spot) {
    if (!vehicle) return;
    this.releaseSpot(spot);
    this.departingVehicles.push({
      vehicle,
      phase: 'BACKING_OUT',
      speed: 4.5,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }

  update(delta) {
    for (let i = this.departingVehicles.length - 1; i >= 0; i--) {
      const dep = this.departingVehicles[i];
      const v = dep.vehicle;
      v.speed = dep.speed;
      v.update(delta);

      if (dep.phase === 'BACKING_OUT') {
        const targetZ = -33.0;
        v.group.position.z -= dep.speed * delta;
        v.group.rotation.y = 0;
        if (v.group.position.z <= targetZ) {
          v.group.position.z = targetZ;
          dep.phase = 'DRIVING_AWAY';
          v.group.rotation.y = dep.direction > 0 ? Math.PI / 2 : -Math.PI / 2;
          dep.speed = 8.5;
        }
      } else if (dep.phase === 'DRIVING_AWAY') {
        v.group.position.x += dep.direction * dep.speed * delta;
        if (Math.abs(v.group.position.x) > 36.0) {
          v.destroy();
          this.departingVehicles.splice(i, 1);
        }
      }
    }
  }
}

// --- Background Transit Road Traffic Simulator ---
class TransitTrafficSystem {
  constructor(scene) {
    this.scene = scene;
    this.vehicles = [];
    this.spawnTimer = 1.5;
  }

  update(delta) {
    this.spawnTimer -= delta;
    if (this.spawnTimer <= 0) {
      this.spawnTransitVehicle();
      this.spawnTimer = 3.0 + Math.random() * 3.5;
    }

    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const vObj = this.vehicles[i];
      const v = vObj.vehicle;
      v.speed = vObj.speed;
      v.update(delta);

      v.group.position.x += vObj.dir * vObj.speed * delta;

      if (Math.abs(v.group.position.x) > 38.0) {
        v.destroy();
        this.vehicles.splice(i, 1);
      }
    }
  }

  spawnTransitVehicle() {
    if (this.vehicles.length >= 4) return;
    const dir = Math.random() > 0.5 ? 1 : -1;
    const z = dir > 0 ? -35.0 : -33.0;
    const x = dir > 0 ? -36.0 : 36.0;

    const types = ['CAR', 'CAR', 'TRUCK', 'SCOOTER'];
    const type = types[Math.floor(Math.random() * types.length)];

    const vehicle = new VoxelVehicle(this.scene, type);
    vehicle.group.position.set(x, 0, z);
    vehicle.group.rotation.y = dir > 0 ? Math.PI / 2 : -Math.PI / 2;

    this.vehicles.push({
      vehicle,
      dir,
      speed: 8.5 + Math.random() * 4.0
    });
  }
}

// --- Complete Deterministic Safe Waypoint Graph (SupermarketNavGraph) ---
// Guarantees 100% collision-free navigation for Customers, Staff Helpers, and Shoplifters across
// North Parking Lot, Sidewalk Plaza, Supermarket Aisles & Concourses, Executive Office, and Outdoor Farm!
class SupermarketNavGraph {
  constructor() {
    this.nodes = new Map();
    this.initNodes();
    this.initEdges();
  }

  addNode(id, x, z) {
    this.nodes.set(id, { id, x, z, neighbors: [] });
  }

  addEdge(idA, idB) {
    const a = this.nodes.get(idA);
    const b = this.nodes.get(idB);
    if (!a || !b) return;
    if (!a.neighbors.includes(idB)) a.neighbors.push(idB);
    if (!b.neighbors.includes(idA)) b.neighbors.push(idA);
  }

  initNodes() {
    // 1. North Outside World (Road, Parking, Sidewalk, Portals)
    this.addNode('N_ROAD_W', -25.0, -25.5);
    this.addNode('N_ROAD_E', 25.0, -25.5);
    this.addNode('N_SIDEWALK_W', -12.0, -25.5);
    this.addNode('N_SIDEWALK_E', 12.0, -25.5);
    this.addNode('N_PARK_W', -12.0, -30.0);
    this.addNode('N_PARK_E', 12.0, -30.0);
    this.addNode('N_OUT_ENTRY', -0.8, -25.5);
    this.addNode('N_OUT_EXIT', 0.8, -25.5);

    // 2. North Doorway Portal Transitions (Passing through North Wall Z = -24.0)
    this.addNode('N_IN_ENTRY', -0.8, -22.8);
    this.addNode('N_IN_EXIT', 0.8, -22.8);

    // 3. Supermarket Interior Grid
    // Z0 = -22.8 (North Concourse)
    this.addNode('M_Z0_X0', -14.5, -22.8);
    this.addNode('M_Z0_X1', -8.5, -22.8);
    this.addNode('M_Z0_X2', 0.0, -22.8);
    this.addNode('M_Z0_X3', 7.0, -22.8);
    this.addNode('M_Z0_X4', 12.75, -22.8);
    this.addNode('M_Z0_X5', 17.5, -22.8);

    // Z1 = -17.7 (Mid-North Crossway)
    this.addNode('M_Z1_X0', -14.5, -17.7);
    this.addNode('M_Z1_X1', -8.5, -17.7);
    this.addNode('M_Z1_X2', 0.0, -17.7);
    this.addNode('M_Z1_X3', 7.0, -17.7);
    this.addNode('M_Z1_X4', 12.75, -17.7);
    this.addNode('M_Z1_X5', 17.5, -17.7);

    // Z2 = -12.2 (Mid-South Crossway)
    this.addNode('M_Z2_X0', -14.5, -12.2);
    this.addNode('M_Z2_X1', -8.5, -12.2);
    this.addNode('M_Z2_X2', 0.0, -12.2);
    this.addNode('M_Z2_X3', 7.0, -12.2);
    this.addNode('M_Z2_X4', 12.75, -12.2);
    this.addNode('M_Z2_X5', 17.5, -12.2);

    // Z3 = -6.2 (South Concourse / Checkout Plaza)
    this.addNode('M_Z3_X1', -8.5, -6.2);
    this.addNode('M_Z3_X2', 0.0, -6.2);
    this.addNode('M_Z3_X3', 7.0, -6.2);
    this.addNode('M_Z3_X4', 12.75, -6.2);
    this.addNode('M_Z3_X5', 17.5, -6.2);

    // 4. Executive Office Passage
    this.addNode('OFFICE_APPROACH', -8.5, -4.2);
    this.addNode('OFFICE_OUTSIDE', -11.6, -4.2);
    this.addNode('OFFICE_THRESHOLD', -12.5, -4.2);
    this.addNode('OFFICE_INSIDE', -14.2, -4.2);
    this.addNode('OFFICE_BUFFER', -16.5, -3.2);
    this.addNode('OFFICE_DESK', -15.5, -5.2);

    // 5. South Door & Outdoor Farm
    this.addNode('S_IN_DOOR', 0.0, -2.2);

    const farmZ = [1.8, 6.5, 9.5, 12.5, 15.5, 18.5];
    const farmX = [-12.5, -5.5, 0.0, 5.5, 12.5];

    for (let zi = 0; zi < farmZ.length; zi++) {
      for (let xi = 0; xi < farmX.length; xi++) {
        this.addNode(`F_Z${zi}_X${xi}`, farmX[xi], farmZ[zi]);
      }
    }
  }

  initEdges() {
    // North Outdoor connections
    this.addEdge('N_ROAD_W', 'N_SIDEWALK_W');
    this.addEdge('N_SIDEWALK_W', 'N_PARK_W');
    this.addEdge('N_SIDEWALK_W', 'N_OUT_ENTRY');
    this.addEdge('N_OUT_ENTRY', 'N_OUT_EXIT');
    this.addEdge('N_OUT_EXIT', 'N_SIDEWALK_E');
    this.addEdge('N_SIDEWALK_E', 'N_PARK_E');
    this.addEdge('N_SIDEWALK_E', 'N_ROAD_E');

    // North Entrance Door Transitions
    this.addEdge('N_OUT_ENTRY', 'N_IN_ENTRY');
    this.addEdge('N_OUT_EXIT', 'N_IN_EXIT');

    // North Concourse (Z0 = -22.8) Horizontal Connections
    this.addEdge('M_Z0_X0', 'M_Z0_X1');
    this.addEdge('M_Z0_X1', 'N_IN_ENTRY');
    this.addEdge('N_IN_ENTRY', 'M_Z0_X2');
    this.addEdge('M_Z0_X2', 'N_IN_EXIT');
    this.addEdge('N_IN_EXIT', 'M_Z0_X3');
    this.addEdge('M_Z0_X3', 'M_Z0_X4');
    this.addEdge('M_Z0_X4', 'M_Z0_X5');

    // Mid-North Crossway (Z1 = -17.7) Horizontal Connections
    this.addEdge('M_Z1_X0', 'M_Z1_X1');
    this.addEdge('M_Z1_X1', 'M_Z1_X2');
    this.addEdge('M_Z1_X2', 'M_Z1_X3');
    this.addEdge('M_Z1_X3', 'M_Z1_X4');
    this.addEdge('M_Z1_X4', 'M_Z1_X5');

    // Mid-South Crossway (Z2 = -12.2) Horizontal Connections
    this.addEdge('M_Z2_X0', 'M_Z2_X1');
    this.addEdge('M_Z2_X1', 'M_Z2_X2');
    this.addEdge('M_Z2_X2', 'M_Z2_X3');
    this.addEdge('M_Z2_X3', 'M_Z2_X4');
    this.addEdge('M_Z2_X4', 'M_Z2_X5');

    // South Concourse (Z3 = -6.2) Horizontal Connections
    this.addEdge('M_Z3_X1', 'M_Z3_X2');
    this.addEdge('M_Z3_X2', 'M_Z3_X3');
    this.addEdge('M_Z3_X3', 'M_Z3_X4');
    this.addEdge('M_Z3_X4', 'M_Z3_X5');

    // Supermarket Vertical Aisle Connections
    // Aisle X0 (-14.5)
    this.addEdge('M_Z0_X0', 'M_Z1_X0');
    this.addEdge('M_Z1_X0', 'M_Z2_X0');

    // Aisle X1 (-8.5)
    this.addEdge('M_Z0_X1', 'M_Z1_X1');
    this.addEdge('M_Z1_X1', 'M_Z2_X1');
    this.addEdge('M_Z2_X1', 'M_Z3_X1');

    // Aisle X2 (0.0)
    this.addEdge('M_Z0_X2', 'M_Z1_X2');
    this.addEdge('M_Z1_X2', 'M_Z2_X2');
    this.addEdge('M_Z2_X2', 'M_Z3_X2');
    this.addEdge('M_Z3_X2', 'S_IN_DOOR');

    // Aisle X3 (7.0)
    this.addEdge('M_Z0_X3', 'M_Z1_X3');
    this.addEdge('M_Z1_X3', 'M_Z2_X3');
    this.addEdge('M_Z2_X3', 'M_Z3_X3');

    // Aisle X4 (12.75)
    this.addEdge('M_Z0_X4', 'M_Z1_X4');
    this.addEdge('M_Z1_X4', 'M_Z2_X4');
    this.addEdge('M_Z2_X4', 'M_Z3_X4');

    // Aisle X5 (17.5)
    this.addEdge('M_Z0_X5', 'M_Z1_X5');
    this.addEdge('M_Z1_X5', 'M_Z2_X5');
    this.addEdge('M_Z2_X5', 'M_Z3_X5');

    // Executive Office Connections
    this.addEdge('M_Z3_X1', 'OFFICE_APPROACH');
    this.addEdge('OFFICE_APPROACH', 'OFFICE_OUTSIDE');
    this.addEdge('OFFICE_OUTSIDE', 'OFFICE_THRESHOLD');
    this.addEdge('OFFICE_THRESHOLD', 'OFFICE_INSIDE');
    this.addEdge('OFFICE_INSIDE', 'OFFICE_BUFFER');
    this.addEdge('OFFICE_INSIDE', 'OFFICE_DESK');

    // South Door Transit to Farm
    this.addEdge('S_IN_DOOR', 'F_Z0_X2');

    // Farm Grid Connections
    const farmZCount = 6;
    const farmXCount = 5;
    for (let zi = 0; zi < farmZCount; zi++) {
      for (let xi = 0; xi < farmXCount; xi++) {
        if (xi < farmXCount - 1) {
          this.addEdge(`F_Z${zi}_X${xi}`, `F_Z${zi}_X${xi + 1}`);
        }
        if (zi < farmZCount - 1) {
          this.addEdge(`F_Z${zi}_X${xi}`, `F_Z${zi + 1}_X${xi}`);
        }
      }
    }
  }

  getNearestNode(pos, filterZone = null) {
    let bestNode = null;
    let minDistSq = Infinity;

    for (const [id, node] of this.nodes) {
      if (filterZone) {
        if (filterZone === 'OUTSIDE_NORTH' && (node.z > -23.5 || id.startsWith('F_') || id.startsWith('OFFICE_'))) continue;
        if (filterZone === 'STORE' && (node.z < -23.5 || node.z > -1.0 || id.startsWith('F_'))) continue;
        if (filterZone === 'FARM' && !id.startsWith('F_')) continue;
        if (filterZone === 'OFFICE' && !id.startsWith('OFFICE_')) continue;
      }

      const dx = pos.x - node.x;
      const dz = pos.z - node.z;
      const distSq = dx * dx + dz * dz;

      if (distSq < minDistSq) {
        minDistSq = distSq;
        bestNode = node;
      }
    }
    return bestNode;
  }

  getZone(pos) {
    if (pos.z < -24.0) return 'OUTSIDE_NORTH';
    if (pos.z > 0.0) return 'FARM';
    if (pos.x < -12.5 && pos.z > -8.0 && pos.z < -1.0) return 'OFFICE';
    return 'STORE';
  }

  findPath(startPos, goalPos) {
    const startZone = this.getZone(startPos);
    const goalZone = this.getZone(goalPos);

    if (Math.hypot(startPos.x - goalPos.x, startPos.z - goalPos.z) <= 0.35) {
      return [new THREE.Vector3(goalPos.x, 0, goalPos.z)];
    }

    const startNode = this.getNearestNode(startPos, startZone);
    const goalNode = this.getNearestNode(goalPos, goalZone);

    if (!startNode || !goalNode) {
      return [new THREE.Vector3(goalPos.x, 0, goalPos.z)];
    }

    if (startNode.id === goalNode.id) {
      return [
        new THREE.Vector3(startNode.x, 0, startNode.z),
        new THREE.Vector3(goalPos.x, 0, goalPos.z)
      ];
    }

    const openSet = [startNode.id];
    const cameFrom = new Map();

    const gScore = new Map();
    gScore.set(startNode.id, 0);

    const fScore = new Map();
    const startH = Math.hypot(startNode.x - goalNode.x, startNode.z - goalNode.z);
    fScore.set(startNode.id, startH);

    while (openSet.length > 0) {
      let lowestIdx = 0;
      let lowestF = fScore.get(openSet[0]) ?? Infinity;
      for (let i = 1; i < openSet.length; i++) {
        const score = fScore.get(openSet[i]) ?? Infinity;
        if (score < lowestF) {
          lowestF = score;
          lowestIdx = i;
        }
      }

      const currentId = openSet.splice(lowestIdx, 1)[0];

      if (currentId === goalNode.id) {
        const path = [];
        let curr = currentId;
        while (curr) {
          const n = this.nodes.get(curr);
          path.unshift(new THREE.Vector3(n.x, 0, n.z));
          curr = cameFrom.get(curr);
        }
        path.push(new THREE.Vector3(goalPos.x, 0, goalPos.z));
        return path;
      }

      const currentNode = this.nodes.get(currentId);
      const currentG = gScore.get(currentId) ?? Infinity;

      for (const neighborId of currentNode.neighbors) {
        const neighbor = this.nodes.get(neighborId);
        if (!neighbor) continue;

        const edgeDist = Math.hypot(currentNode.x - neighbor.x, currentNode.z - neighbor.z);
        const tentativeG = currentG + edgeDist;

        if (tentativeG < (gScore.get(neighborId) ?? Infinity)) {
          cameFrom.set(neighborId, currentId);
          gScore.set(neighborId, tentativeG);
          const h = Math.hypot(neighbor.x - goalNode.x, neighbor.z - goalNode.z);
          fScore.set(neighborId, tentativeG + h);

          if (!openSet.includes(neighborId)) {
            openSet.push(neighborId);
          }
        }
      }
    }

    return [
      new THREE.Vector3(startNode.x, 0, startNode.z),
      new THREE.Vector3(goalNode.x, 0, goalNode.z),
      new THREE.Vector3(goalPos.x, 0, goalPos.z)
    ];
  }
}

window.navGraph = new SupermarketNavGraph();

// Continuous physical box collision resolver against all supermarket shelves
function resolveShelfCollisions(pos, radius = 0.35) {
  if (!window.gameInstance || !window.gameInstance.shelves) return;
  const shelves = window.gameInstance.shelves;
  const halfW = 1.35 + radius;
  const halfD = 0.75 + radius;

  for (let i = 0; i < shelves.length; i++) {
    const s = shelves[i];
    if (!s) continue;
    const dx = pos.x - s.x;
    const dz = pos.z - s.z;

    if (Math.abs(dx) < halfW && Math.abs(dz) < halfD) {
      const penX = halfW - Math.abs(dx);
      const penZ = halfD - Math.abs(dz);

      if (penX < penZ) {
        pos.x = s.x + (dx > 0 ? halfW : -halfW);
      } else {
        pos.z = s.z + (dz > 0 ? halfD : -halfD);
      }
    }
  }
}

function moveWithDoorWaypoints(pos, target, speed, delta, agentStateOrLane = null) {
  let navState = null;
  if (typeof agentStateOrLane === 'object' && agentStateOrLane !== null) {
    navState = agentStateOrLane;
  }

  if (navState) {
    const targetKey = `${target.x.toFixed(1)},${target.z.toFixed(1)}`;
    if (!navState.path || navState.targetKey !== targetKey || navState.pathIndex >= navState.path.length) {
      navState.path = window.navGraph.findPath(pos, target);
      navState.targetKey = targetKey;
      navState.pathIndex = 0;
    }

    if (navState.path && navState.path.length > 0) {
      const currentWp = navState.path[navState.pathIndex];
      const dir = currentWp.clone().sub(pos);
      dir.y = 0;
      const dist = dir.length();
      const isFinal = navState.pathIndex === navState.path.length - 1;
      const threshold = isFinal ? 0.35 : 0.55;

      if (dist <= threshold) {
        navState.pathIndex++;
        if (navState.pathIndex >= navState.path.length) {
          resolveShelfCollisions(pos);
          return { arrived: true, velocity: new THREE.Vector3(0, 0, 0), subTarget: target };
        }
      }

      const activeWp = navState.path[navState.pathIndex];
      const activeDir = activeWp.clone().sub(pos);
      activeDir.y = 0;
      if (activeDir.lengthSq() > 0.001) {
        activeDir.normalize();
        const vel = activeDir.multiplyScalar(speed);
        pos.addScaledVector(vel, delta);
        resolveShelfCollisions(pos);
        return { arrived: false, velocity: vel, subTarget: activeWp };
      }
    }
  }

  // Fallback direct movement
  const dir = target.clone().sub(pos);
  dir.y = 0;
  const dist = dir.length();

  if (dist > 0.15) {
    dir.normalize();
    const vel = dir.multiplyScalar(speed);
    pos.addScaledVector(vel, delta);
    resolveShelfCollisions(pos);
    return { arrived: false, velocity: vel, subTarget: target };
  } else {
    resolveShelfCollisions(pos);
    return { arrived: true, velocity: new THREE.Vector3(0, 0, 0), subTarget: target };
  }
}

// --- Customer AI Entity with Multi-Modal Vehicle Arrival & Shopping Cart ---
class CustomerAI {
  constructor(scene, spawnPos, shelves, checkout, archetype = null, transportMode = 'WALK', parkingSpot = null, vehicle = null, residentData = null) {
    this.scene = scene;
    this.shelves = shelves;
    this.checkout = checkout;
    this.targetShelf = null;
    this.transportMode = transportMode;
    this.parkingSpot = parkingSpot;
    this.vehicle = vehicle;
    this.residentData = residentData;
    this.walkExitX = Math.random() > 0.5 ? 30.0 : -30.0;

    // 5 Distinct Customer Archetypes with custom accessories & palettes
    const archetypes = ['REGULAR', 'FITNESS', 'KID_FAMILY', 'CHEF_GOURMET'];
    this.archetype = (residentData && residentData.archetype) || archetype || archetypes[Math.floor(Math.random() * archetypes.length)];

    let charColor = 0x00d2d3;
    if (residentData && residentData.charColor) charColor = residentData.charColor;
    else if (this.archetype === 'FITNESS') charColor = 0x2ed573;
    else if (this.archetype === 'KID_FAMILY') charColor = 0xff4757;
    else if (this.archetype === 'CHEF_GOURMET') charColor = 0xfffdf5;
    else charColor = [0x0984e3, 0xa29bfe, 0xff7675, 0xfdcb6e, 0x6c5ce7][Math.floor(Math.random() * 5)];

    // Spawn character with 3D Voxel Shopping Cart
    this.char = new Character3D(scene, charColor, false, true);
    this.char.group.position.copy(spawnPos);

    // Add Archetype-specific Voxel Accessories
    this.initArchetypeAccessories();

    // Goal-Oriented Multi-Item Shopping List & Budgeting
    this.initShoppingList();

    this.state = 'WALKING_TO_SHELF';
    this.itemsBought = 0;
    this.isFinished = false;
    this.waitingTimer = 0;
    this.patience = 2.4;
    this.inspectTimer = 0;
    this.hopTimer = 0;
    this.startleTimer = 0;
    this.stuckTimer = 0;
    this.checkoutProgress = 0;
    this.checkoutDuration = 1.4;
    this.scanBeepTimer = 0;
    this.isFastCheckout = false;
    this.isCashierWaiting = false;
    this.navState = { path: null, pathIndex: 0, targetKey: '' };

    this.pickTargetShelf(false);
  }

  startCheckoutProcess(isFastBonus = false) {
    if (this.state === 'PROCESSING_PAYMENT') return;
    this.state = 'PROCESSING_PAYMENT';
    const totalItems = (this.char.cartItems ? this.char.cartItems.length : 0) + (this.char.stack ? this.char.stack.length : 0);
    this.checkoutDuration = Math.max(1.2, 0.9 + totalItems * 0.35);
    this.checkoutProgress = 0;
    this.scanBeepTimer = 0.25;
    this.isFastCheckout = isFastBonus;
    this.isCashierWaiting = false;
  }

  initArchetypeAccessories() {
    if (this.residentData) {
      const affinity = (window.gameInstance && window.gameInstance.neighborhoodState && window.GameMechanics)
        ? window.GameMechanics.getResidentAffinity(window.gameInstance.neighborhoodState, this.residentData.id)
        : 0;
      const badgeMat = new THREE.MeshStandardMaterial({
        map: getResidentBadgeTexture(this.residentData.name, affinity),
        roughness: 0.25
      });
      const badge = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.32, 0.08), badgeMat);
      badge.position.set(0, 2.25, 0);
      badge.rotation.x = -0.28;
      this.char.group.add(badge);
    }

    if (this.archetype === 'FITNESS') {
      const bandMat = new THREE.MeshBasicMaterial({ color: 0x2ed573 });
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.10, 0.56), bandMat);
      band.position.y = 1.62;
      this.char.model.add(band);
    } else if (this.archetype === 'KID_FAMILY') {
      const capMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.4 });
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.16, 0.56), capMat);
      cap.position.y = 1.72;
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.04, 0.28), capMat);
      visor.position.set(0, 1.64, -0.38);
      this.char.model.add(cap, visor);
    } else if (this.archetype === 'CHEF_GOURMET') {
      const toqueMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.48), toqueMat);
      base.position.y = 1.72;
      const top = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.35, 0.58), toqueMat);
      top.position.y = 1.95;
      this.char.model.add(base, top);
    }
  }

  initShoppingList() {
    this.shoppingList = [];
    // Only pick from shelves that are present and active in the store
    const unlockedTypes = [...new Set((this.shelves || []).filter(s => s && s.items !== undefined).map(s => s.itemType))];
    const availablePool = unlockedTypes.length > 0 ? unlockedTypes : ['TOMATO'];

    let preferredPool = availablePool;
    if (this.residentData && Array.isArray(this.residentData.preferredItems)) {
      const resPref = this.residentData.preferredItems.filter(t => availablePool.includes(t));
      if (resPref.length > 0) preferredPool = resPref;
    } else if (this.archetype === 'FITNESS') {
      const candidates = ['SALAD_BOWL', 'CARROT', 'APPLE_JUICE', 'TOMATO'].filter(t => availablePool.includes(t));
      if (candidates.length > 0) preferredPool = candidates;
    } else if (this.archetype === 'KID_FAMILY') {
      const candidates = ['ICE_CREAM', 'POPCORN', 'STRAWBERRY_JAM', 'APPLE_PIE', 'TOMATO'].filter(t => availablePool.includes(t));
      if (candidates.length > 0) preferredPool = candidates;
    } else if (this.archetype === 'CHEF_GOURMET') {
      const candidates = ['PIZZA', 'CHEESE', 'BREAD', 'TOMATO'].filter(t => availablePool.includes(t));
      if (candidates.length > 0) preferredPool = candidates;
    } else if (this.archetype === 'VIP' || this.isVIP) {
      const candidates = ['PIZZA', 'ICE_CREAM', 'SALAD_BOWL', 'STRAWBERRY_JAM', 'APPLE_PIE', 'CHEESE', 'BREAD', 'EGG', 'TOMATO'].filter(t => availablePool.includes(t));
      if (candidates.length > 0) preferredPool = candidates;
    }

    preferredPool = window.GameMechanics && window.gameInstance
      ? window.GameMechanics.applyDemandToShoppingPool(preferredPool, window.gameInstance.dailyDemand)
      : preferredPool;

    const count = Math.min(new Set(preferredPool).size, this.isVIP ? 3 : (this.archetype === 'CHEF_GOURMET' ? 2 : (Math.random() > 0.5 ? 2 : 1)));
    const chosenItems = window.GameMechanics.pickShoppingItems(preferredPool, window.gameInstance?.pricing, count);

    for (let i = 0; i < count; i++) {
      const type = chosenItems[i];
      const qty = (this.archetype === 'KID_FAMILY' || this.isVIP) ? (Math.random() > 0.5 ? 2 : 1) : 1;
      this.shoppingList.push({
        type,
        requiredQty: qty,
        currentQty: 0
      });
    }

    this.targetItemsCount = this.shoppingList.reduce((acc, item) => acc + item.requiredQty, 0);
  }

  optimizeRoute() {
    if (!this.shoppingList || this.shoppingList.length <= 1) return;
    const pos = this.char.group.position;
    const remaining = this.shoppingList.filter(item => item.currentQty < item.requiredQty);

    remaining.sort((a, b) => {
      const shelfA = this.shelves.find(s => s && s.itemType === a.type && s.hasItems()) || this.shelves.find(s => s && s.itemType === a.type);
      const shelfB = this.shelves.find(s => s && s.itemType === b.type && s.hasItems()) || this.shelves.find(s => s && s.itemType === b.type);
      const distA = shelfA ? pos.distanceTo(new THREE.Vector3(shelfA.x, 0, shelfA.z)) : 999;
      const distB = shelfB ? pos.distanceTo(new THREE.Vector3(shelfB.x, 0, shelfB.z)) : 999;
      return distA - distB;
    });

    const completed = this.shoppingList.filter(item => item.currentQty >= item.requiredQty);
    this.shoppingList = [...completed, ...remaining];
  }

  pickTargetShelf(excludeCurrent = false) {
    if (!this.shelves || this.shelves.length === 0) {
      this.targetShelf = null;
      return false;
    }

    this.optimizeRoute();
    const activeItem = this.shoppingList ? this.shoppingList.find(item => item.currentQty < item.requiredQty) : null;

    if (!activeItem) {
      this.targetShelf = null;
      return false;
    }

    // 1. Try to find a stocked shelf for active requested item
    let candidateShelves = this.shelves.filter(s =>
      s && s.itemType === activeItem.type &&
      s.hasItems() &&
      (!excludeCurrent || s !== this.targetShelf)
    );

    // 2. If active item has no stock, look for any other item in customer's shopping list that is stocked
    if (candidateShelves.length === 0) {
      const otherListTypes = this.shoppingList
        .filter(item => item !== activeItem && item.currentQty < item.requiredQty)
        .map(item => item.type);

      candidateShelves = this.shelves.filter(s =>
        s && otherListTypes.includes(s.itemType) &&
        s.hasItems() &&
        (!excludeCurrent || s !== this.targetShelf)
      );
    }

    // 3. Smart Substitute Buying: If waiting patience expired or preferred item out of stock,
    // pick ANY other unlocked supermarket shelf that has available stock!
    if (candidateShelves.length === 0 && excludeCurrent) {
      const stockedShelves = this.shelves.filter(s => s && s.hasItems() && s !== this.targetShelf);
      if (stockedShelves.length > 0) {
        const impulseShelf = stockedShelves[Math.floor(Math.random() * stockedShelves.length)];
        let existing = this.shoppingList.find(i => i.type === impulseShelf.itemType);
        if (!existing) {
          this.shoppingList.push({ type: impulseShelf.itemType, requiredQty: 1, currentQty: 0 });
        }
        candidateShelves = [impulseShelf];
        this.isSubstitutePurchase = true;
      }
    }

    // 4. If no stocked shelves for any items on the list, find the actual shelf for activeItem (even if empty) to wait
    if (candidateShelves.length === 0) {
      candidateShelves = this.shelves.filter(s =>
        s && s.itemType === activeItem.type &&
        (!excludeCurrent || s !== this.targetShelf)
      );
    }

    if (candidateShelves.length > 0) {
      this.targetShelf = candidateShelves[Math.floor(Math.random() * candidateShelves.length)];
      this.desiredType = this.targetShelf ? this.targetShelf.itemType : activeItem.type;
      this.waitingTimer = 0;
      return true;
    }

    this.targetShelf = null;
    return false;
  }

  getSpeechInfo() {
    const activeItem = this.shoppingList ? this.shoppingList.find(i => i.currentQty < i.requiredQty) : null;
    const completedCount = this.shoppingList ? this.shoppingList.filter(i => i.currentQty >= i.requiredQty).length : 0;
    const totalCount = this.shoppingList ? this.shoppingList.length : 1;

    return {
      desiredType: activeItem ? activeItem.type : (this.desiredType || 'TOMATO'),
      activeQty: activeItem ? `${activeItem.currentQty}/${activeItem.requiredQty}` : '',
      listProgress: `${completedCount}/${totalCount}`,
      state: this.state,
      hasStock: this.targetShelf ? this.targetShelf.hasItems() : false,
      itemsBought: this.itemsBought,
      isVIP: this.isVIP || false,
      isStartled: this.startleTimer > 0,
      isDisappointed: this.isDisappointed || false,
      isSubstitute: this.isSubstitutePurchase || false,
      isCashierWaiting: this.isCashierWaiting || false,
      checkoutProgressPct: Math.min(100, Math.floor((this.checkoutProgress || 0) * 100))
    };
  }

  triggerStartle() {
    this.startleTimer = 1.0;
  }

  update(delta, allCustomers = []) {
    if (this.isFinished) return;

    const pos = this.char.group.position;

    // Anti-Stuck Jitter & Separation Physics
    if (this.char.velocity.lengthSq() < 0.04 && this.state !== 'IN_CHECKOUT_LINE') {
      this.stuckTimer += delta;
      if (this.stuckTimer >= 1.5) {
        pos.x += (Math.random() - 0.5) * 0.4;
        pos.z += (Math.random() - 0.5) * 0.4;
        this.stuckTimer = 0;
      }
    } else {
      this.stuckTimer = 0;
    }

    // Flocking / Soft Mutual Repulsion & Lateral Corridor Steering
    if (allCustomers && allCustomers.length > 1) {
      for (let i = 0; i < allCustomers.length; i++) {
        const other = allCustomers[i];
        if (other === this || !other.char) continue;
        const d = pos.distanceTo(other.char.group.position);
        if (d < 1.30 && d > 0.05) {
          const push = (1.30 - d) * 2.0 * delta;
          const pushDirX = (pos.x - other.char.group.position.x) / d;
          const pushDirZ = (pos.z - other.char.group.position.z) / d;
          pos.x += pushDirX * push;
          pos.z += pushDirZ * push;
        }
      }
    }

    // Startle Reaction (when thief flees nearby)
    if (this.startleTimer > 0) {
      this.startleTimer -= delta;
      this.char.velocity.set(0, 0, 0);
      this.char.leftArm.rotation.x = -1.1;
      this.char.rightArm.rotation.x = -1.1;
      this.char.update(delta);
      return;
    }

    // Joyful hop animation
    if (this.hopTimer > 0) {
      this.hopTimer -= delta;
      const hopProgress = (0.35 - this.hopTimer) / 0.35;
      this.char.model.position.y += Math.sin(hopProgress * Math.PI) * 0.22;
    }

    if (this.state === 'WALKING_TO_SHELF') {
      if (!this.targetShelf) {
        const found = this.pickTargetShelf(false);
        if (!found) {
          if (this.itemsBought > 0) {
            this.state = 'WALKING_TO_CHECKOUT';
            return;
          } else {
            this.state = 'LEAVING';
            this.isDisappointed = true;
            if (window.gameInstance && window.gameInstance.particleFX) {
              window.gameInstance.particleFX.spawnDustPuff(pos, 2, 0xff4757);
            }
            return;
          }
        }
      }

      const shelfTarget = new THREE.Vector3(this.targetShelf.x, 0, this.targetShelf.z + 1.3);
      const res = moveWithDoorWaypoints(pos, shelfTarget, 4.2, delta, this.navState);
      this.char.velocity.copy(res.velocity);

      if (res.velocity.lengthSq() > 0.01) {
        this.char.group.rotation.y = Math.atan2(res.velocity.x, res.velocity.z);
      }

      const distToShelf = pos.distanceTo(shelfTarget);
      if (distToShelf <= 1.1) {
        this.char.velocity.set(0, 0, 0);
        this.char.group.rotation.y = Math.PI;

        this.inspectTimer += delta;
        this.char.head.rotation.z = Math.sin(this.inspectTimer * 6) * 0.16;
        this.char.head.rotation.x = Math.abs(Math.sin(this.inspectTimer * 8)) * 0.12;

        if (this.targetShelf && this.targetShelf.hasItems()) {
          const item = this.targetShelf.takeItem();
          if (item) {
            const added = this.char.addItemToCart(item.itemType || item);
            if (!added) this.char.addItem(item);
            this.itemsBought++;
            this.hopTimer = 0.35;
            this.waitingTimer = 0;
            window.Sound.playPop();

            const listItem = this.shoppingList ? this.shoppingList.find(li => li.type === this.targetShelf.itemType && li.currentQty < li.requiredQty) : null;
            if (listItem) {
              listItem.currentQty++;
            }

            if (window.gameInstance && window.gameInstance.particleFX) {
              window.gameInstance.particleFX.spawnDustPuff(this.char.group.position, 2, 0x25d366);
            }
          }

          const hasRemaining = this.shoppingList ? this.shoppingList.some(li => li.currentQty < li.requiredQty) : false;
          if (!hasRemaining || this.itemsBought >= this.targetItemsCount) {
            this.char.head.rotation.set(0, 0, 0);
            this.state = 'WALKING_TO_CHECKOUT';
          } else {
            const foundNext = this.pickTargetShelf(false);
            if (!foundNext) {
              this.char.head.rotation.set(0, 0, 0);
              this.state = 'WALKING_TO_CHECKOUT';
            }
          }
        } else {
          // Shelf is empty; wait up to patience duration (2.2s)
          this.waitingTimer += delta;
          if (this.waitingTimer >= this.patience) {
            this.waitingTimer = 0;
            this.char.head.rotation.set(0, 0, 0);

            const foundAlt = this.pickTargetShelf(true);
            if (foundAlt) {
              this.state = 'WALKING_TO_SHELF';
            } else {
              if (this.itemsBought > 0) {
                this.state = 'WALKING_TO_CHECKOUT';
              } else {
                this.state = 'LEAVING';
                this.isDisappointed = true;
                if (window.gameInstance && window.gameInstance.particleFX) {
                  window.gameInstance.particleFX.spawnDustPuff(pos, 2, 0xff4757);
                }
              }
            }
          }
        }
      } else {
        this.inspectTimer = 0;
        this.char.head.rotation.set(0, 0, 0);
      }
    } else if (this.state === 'WALKING_TO_CHECKOUT') {
      let queueIdx = 0;
      if (allCustomers) {
        for (const other of allCustomers) {
          if (other === this) break;
          if (other.state === 'WALKING_TO_CHECKOUT' || other.state === 'IN_CHECKOUT_LINE') {
            queueIdx++;
          }
        }
      }

      // Discrete reserved queue slots with 1.35m spacing
      const checkoutTarget = new THREE.Vector3(
        this.checkout.x - 1.2,
        0,
        this.checkout.z - 0.9 - queueIdx * 1.35
      );
      const res = moveWithDoorWaypoints(pos, checkoutTarget, 4.5, delta, this.navState);
      this.char.velocity.copy(res.velocity);

      if (res.velocity.lengthSq() > 0.01) {
        this.char.group.rotation.y = Math.atan2(res.velocity.x, res.velocity.z);
      }

      if (pos.distanceTo(checkoutTarget) <= 0.95) {
        this.char.velocity.set(0, 0, 0);
        this.char.group.rotation.y = 0;
        this.state = 'IN_CHECKOUT_LINE';
      }
    } else if (this.state === 'IN_CHECKOUT_LINE') {
      let queueIdx = 0;
      if (allCustomers) {
        for (const other of allCustomers) {
          if (other === this) break;
          if (other.state === 'IN_CHECKOUT_LINE' || other.state === 'PROCESSING_PAYMENT') {
            queueIdx++;
          }
        }
      }
      const linePos = new THREE.Vector3(this.checkout.x - 1.2, 0, this.checkout.z - 0.9 - queueIdx * 1.35);
      if (pos.distanceTo(linePos) > 0.25) {
        const dir = linePos.clone().sub(pos).normalize();
        pos.addScaledVector(dir, 3.2 * delta);
        this.char.group.rotation.y = 0;
      } else {
        this.char.velocity.set(0, 0, 0);
      }
    } else if (this.state === 'PROCESSING_PAYMENT') {
      this.char.velocity.set(0, 0, 0);
      this.char.group.rotation.y = 0;

      if (!this.isCashierWaiting) {
        const speedMult = this.isFastCheckout ? 1.6 : 1.0;
        this.checkoutProgress += (delta * speedMult) / this.checkoutDuration;

        this.scanBeepTimer -= delta;
        if (this.scanBeepTimer <= 0) {
          window.Sound.playPop();
          this.scanBeepTimer = 0.38;
        }

        if (this.checkout && this.checkout.showProgress) {
          this.checkout.showProgress(this.checkoutProgress, this.isFastCheckout);
        }

        if (this.checkoutProgress >= 1.0) {
          if (this.checkout && this.checkout.hideProgress) {
            this.checkout.hideProgress();
          }
          this.processPayment();
        }
      } else {
        if (this.checkout && this.checkout.showProgress) {
          this.checkout.showProgress(this.checkoutProgress, false);
        }
      }
    } else if (this.state === 'LEAVING') {
      let exitTarget = new THREE.Vector3(0.0, 0, -25.5);

      if (pos.z <= -25.0) {
        if (this.parkingSpot && this.vehicle) {
          exitTarget = new THREE.Vector3(this.parkingSpot.x + 0.8, 0, this.parkingSpot.z + 0.4);
          if (pos.distanceTo(exitTarget) <= 0.9) {
            this.isFinished = true;
            this.char.destroy();
            if (window.gameInstance && window.gameInstance.parkingLot) {
              window.gameInstance.parkingLot.departVehicle(this.vehicle, this.parkingSpot);
            }
            return;
          }
        } else {
          exitTarget = new THREE.Vector3(this.walkExitX, 0, -25.5);
          if (Math.abs(pos.x) >= 28.0) {
            this.isFinished = true;
            this.char.destroy();
            return;
          }
        }
      }

      const res = moveWithDoorWaypoints(pos, exitTarget, 5.0, delta, this.navState);
      this.char.velocity.copy(res.velocity);

      if (res.velocity.lengthSq() > 0.01) {
        this.char.group.rotation.y = Math.atan2(res.velocity.x, res.velocity.z);
      }
    }

    this.char.update(delta);
  }

  processPayment() {
    if (this.state !== 'IN_CHECKOUT_LINE' && this.state !== 'PROCESSING_PAYMENT') return;
    let totalCash = 0;

    // Process all items in shopping cart
    while (this.char.cartItems.length > 0) {
      const type = this.char.removeItemFromCart();
      const basePrice = (ITEM_TYPES[type] || ITEM_TYPES.TOMATO).price;
      let price = window.gameInstance && window.gameInstance.getSalePrice
        ? window.gameInstance.getSalePrice(type, basePrice)
        : basePrice;

      if (this.residentData && window.gameInstance?.neighborhoodState && window.GameMechanics) {
        const aff = window.GameMechanics.getResidentAffinity(window.gameInstance.neighborhoodState, this.residentData.id);
        if (aff >= 5) price = Math.round(price * 1.25);
        else if (aff >= 3) price = Math.round(price * 1.15);
      }

      totalCash += price;
      if (window.gameInstance && window.gameInstance.recordProgressEvent) {
        window.gameInstance.recordProgressEvent({ type: 'sale', itemType: type, amount: 1 });
      }
      if (window.gameInstance && window.gameInstance.recordDayEvent) {
        window.gameInstance.recordDayEvent({ type: 'sale', itemType: type, amount: 1, revenue: price });
      }
      if (window.gameInstance && window.gameInstance.recordBrandSale) {
        window.gameInstance.recordBrandSale(type, 1);
      }
    }
    // Process items on stack
    while (this.char.stack.length > 0) {
      const type = this.char.removeItem();
      const basePrice = (ITEM_TYPES[type] || ITEM_TYPES.TOMATO).price;
      let price = window.gameInstance && window.gameInstance.getSalePrice
        ? window.gameInstance.getSalePrice(type, basePrice)
        : basePrice;

      if (this.residentData && window.gameInstance?.neighborhoodState && window.GameMechanics) {
        const aff = window.GameMechanics.getResidentAffinity(window.gameInstance.neighborhoodState, this.residentData.id);
        if (aff >= 5) price = Math.round(price * 1.25);
        else if (aff >= 3) price = Math.round(price * 1.15);
      }

      totalCash += price;
      if (window.gameInstance && window.gameInstance.recordProgressEvent) {
        window.gameInstance.recordProgressEvent({ type: 'sale', itemType: type, amount: 1 });
      }
      if (window.gameInstance && window.gameInstance.recordDayEvent) {
        window.gameInstance.recordDayEvent({ type: 'sale', itemType: type, amount: 1, revenue: price });
      }
      if (window.gameInstance && window.gameInstance.recordBrandSale) {
        window.gameInstance.recordBrandSale(type, 1);
      }
    }

    if (this.residentData && window.gameInstance) {
      if (window.gameInstance.recordResidentVisit) {
        window.gameInstance.recordResidentVisit(this.residentData.id);
      }
      const phrase = this.residentData.checkoutPhrase || this.residentData.greeting;
      if (phrase && window.gameInstance.showFloatingText) {
        window.gameInstance.showFloatingText(`${this.residentData.name}: "${phrase}"`, this.char.group.position, '#FFE600');
      }
    }

    if (totalCash > 0) {
      if (window.gameInstance) {
        window.gameInstance.registerCheckoutCombo();
        totalCash = window.GameMechanics.calculateCheckoutTotal({
          baseTotal: totalCash,
          comboMultiplier: window.gameInstance.comboMultiplier,
          isRushHour: window.gameInstance.isRushHour
        });
      }
      this.checkout.addCash(totalCash);
      window.Sound.playCashRegister();
      if (window.gameInstance && window.gameInstance.particleFX) {
        window.gameInstance.particleFX.spawnCashExplosion(this.char.group.position, 6);
      }
    }
    this.state = 'LEAVING';
  }

  destroy() {
    this.isFinished = true;
    if (this.bubbleEl && this.bubbleEl.parentNode) {
      this.bubbleEl.parentNode.removeChild(this.bubbleEl);
      this.bubbleEl = null;
    }
    if (this.char && this.char.destroy) {
      this.char.destroy();
    }
  }
}

// --- Voxel Holstein Cow & Pasture Pen ---
class CowPen {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.feedCapacity = 4;
    this.currentFeed = 0;
    this.milkCapacity = 6;
    this.milkBottles = [];
    this.milkTimer = 0;
    this.milkDuration = 2.4; // seconds per milk bottle

    this.inputPadPos = new THREE.Vector3(x - 1.6, 0, z); // wheat feeding pad
    this.outputPadPos = new THREE.Vector3(x + 1.6, 0, z); // milk bottles pad
    this.feedPadPos = this.inputPadPos;
    this.milkPadPos = this.outputPadPos;

    this.initMesh();
    this.cowGroup = this.cow;
    this.scene.add(this.group);
  }

  initMesh() {
    // 1. Mud / Pasture Base Slab
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.9 });
    const ground = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.22, 3.2), groundMat);
    ground.position.y = 0.11;
    ground.receiveShadow = true;
    this.group.add(ground);

    // 2. Wooden Fence Enclosure
    const fenceMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63, roughness: 0.7 });
    const railGeoH = new THREE.BoxGeometry(3.6, 0.08, 0.06);
    const railGeoV = new THREE.BoxGeometry(0.06, 0.08, 3.2);

    const backRail = new THREE.Mesh(railGeoH, fenceMat);
    backRail.position.set(0, 0.5, -1.55);
    const leftRail = new THREE.Mesh(railGeoV, fenceMat);
    leftRail.position.set(-1.75, 0.5, 0);
    const rightRail = new THREE.Mesh(railGeoV, fenceMat);
    rightRail.position.set(1.75, 0.5, 0);
    this.group.add(backRail, leftRail, rightRail);

    // 3. Voxel Holstein Cow Model (White with black patches)
    this.cow = new THREE.Group();
    this.cow.position.set(0, 0.22, 0);

    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.5 });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.5 });
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xffb8b8, roughness: 0.3 });
    const hornMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3 });

    // Chunky Cow Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.8), whiteMat);
    body.position.y = 0.85;
    body.castShadow = true;
    this.cow.add(body);

    // Black Spots on Body
    const spot1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.55), blackMat);
    spot1.position.set(0.45, 0.95, -0.2);
    const spot2 = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.50, 0.60), blackMat);
    spot2.position.set(-0.45, 0.85, 0.3);
    this.cow.add(spot1, spot2);

    // 4 Blocky Legs
    const legGeo = new THREE.BoxGeometry(0.22, 0.50, 0.22);
    const legOffsets = [
      [-0.45, 0.25, -0.65],
      [0.45, 0.25, -0.65],
      [-0.45, 0.25, 0.65],
      [0.45, 0.25, 0.65]
    ];
    legOffsets.forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(legGeo, whiteMat);
      leg.position.set(lx, ly, lz);
      leg.castShadow = true;
      this.cow.add(leg);
    });

    // Animated Cow Head
    this.cowHead = new THREE.Group();
    this.cowHead.position.set(0, 1.25, 0.95);

    const headBox = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.60), whiteMat);
    headBox.castShadow = true;
    const spotHead = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.32), blackMat);
    spotHead.position.set(0.15, 0.15, 0.05);

    // Pink Snout & Nostrils
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.24, 0.26), pinkMat);
    snout.position.set(0, -0.15, 0.35);
    const nos1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), blackMat);
    nos1.position.set(-0.11, -0.14, 0.49);
    const nos2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), blackMat);
    nos2.position.set(0.11, -0.14, 0.49);

    // Cow Horns
    const hornL = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.18, 0.10), hornMat);
    hornL.position.set(-0.25, 0.34, -0.05);
    hornL.rotation.z = 0.25;
    const hornR = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.18, 0.10), hornMat);
    hornR.position.set(0.25, 0.34, -0.05);
    hornR.rotation.z = -0.25;

    // Ears
    const earL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.10, 0.08), whiteMat);
    earL.position.set(-0.36, 0.18, -0.1);
    const earR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.10, 0.08), blackMat);
    earR.position.set(0.36, 0.18, -0.1);

    this.cowHead.add(headBox, spotHead, snout, nos1, nos2, hornL, hornR, earL, earR);
    this.cow.add(this.cowHead);
    this.group.add(this.cow);

    // 4. Input Feed Trough & Pad (Yellow)
    const troughMat = new THREE.MeshStandardMaterial({ color: 0xa0522d });
    const trough = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.6), troughMat);
    trough.position.set(-1.1, 0.4, 0);
    this.group.add(trough);

    const inPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 })
    );
    inPad.position.set(-1.6, 0.02, 0);
    this.group.add(inPad);

    // 5. Output Milk Pad (White)
    const outPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    outPad.position.set(1.6, 0.02, 0);
    this.group.add(outPad);

    this.milkMount = new THREE.Group();
    this.milkMount.position.set(1.6, 0.04, 0);
    this.group.add(this.milkMount);
  }

  feedWheat() {
    if (this.currentFeed >= this.feedCapacity) return false;
    this.currentFeed++;
    return true;
  }

  // Super-feed with Corn: immediately produces fresh milk bottles!
  feedCorn() {
    this.currentFeed = Math.min(this.feedCapacity, this.currentFeed + 2);
    this.spawnMilk();
    if (this.milkBottles.length < this.milkCapacity) {
      this.spawnMilk();
    }
    return true;
  }

  spawnMilk() {
    if (this.milkBottles.length >= this.milkCapacity) return;
    const bottle = new THREE.Group();
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.28, 0.22), glassMat);
    body.castShadow = true;
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.14), new THREE.MeshStandardMaterial({ color: 0xff5252 }));
    cap.position.y = 0.17;
    bottle.add(body, cap);

    const idx = this.milkBottles.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    bottle.position.set(-0.25 + col * 0.5, 0.14, -0.35 + row * 0.35);

    this.milkMount.add(bottle);
    this.milkBottles.push(bottle);
  }

  collectOneMilk() {
    if (this.milkBottles.length === 0) return false;
    const b = this.milkBottles.pop();
    this.milkMount.remove(b);
    return true;
  }

  update(delta, time) {
    if (this.currentFeed > 0) {
      this.cowHead.rotation.x = Math.sin(time * 6) * 0.18;
      this.cowHead.rotation.y = Math.sin(time * 3) * 0.12;

      this.milkTimer += delta * (this.speedMultiplier || 1.0);
      if (this.milkTimer >= this.milkDuration) {
        this.milkTimer = 0;
        if (this.milkBottles.length < this.milkCapacity) {
          this.currentFeed--;
          this.spawnMilk();
          window.Sound.playPop();
        }
      }
    } else {
      this.cowHead.rotation.x = Math.sin(time * 1.8) * 0.06;
      this.cowHead.rotation.y = 0;
      this.milkTimer = 0;
    }
  }
}

// --- Cheese Fermenter & Dairy Vat Machine ---
class CheeseProcessor {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.milkCapacity = 6;
    this.currentMilk = 0;
    this.cheeseCapacity = 6;
    this.cheeseWedges = [];
    this.cheeseWheels = this.cheeseWedges;
    this.churnTimer = 0;
    this.churnDuration = 2.8;

    this.inputPadPos = new THREE.Vector3(x - 1.5, 0, z); // drop milk
    this.outputPadPos = new THREE.Vector3(x + 1.5, 0, z); // collect cheese

    this.initMesh();
    this.productionFloor = createProductionFloorKit(this.group, 0x0984e3);
    this.productionDetails = createProductionMachineDetails(this.group, 0x0984e3, 'SUT > PEYNIR', ['MILK']);
    this.scene.add(this.group);
  }

  initMesh() {
    // 1. Steel / Azure Blue Vat Base
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.35 });
    const vat = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 2.0), baseMat);
    vat.position.y = 0.7;
    vat.castShadow = true;
    this.group.add(vat);

    const rimMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.2 });
    const rim = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.15, 2.2), rimMat);
    rim.position.y = 1.45;
    this.group.add(rim);

    this.liquid = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.1, 1.8),
      new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.2 })
    );
    this.liquid.position.y = 1.35;
    this.group.add(this.liquid);

    // Rotary Agitator / Churn Blades
    this.agitator = new THREE.Group();
    this.agitator.position.y = 1.6;
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.1), rimMat);
    const blade1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 0.08), rimMat);
    const blade2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 1.2), rimMat);
    this.agitator.add(shaft, blade1, blade2);
    this.group.add(this.agitator);

    // Interactive Ground Square Pads
    const inPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    inPad.position.set(-1.5, 0.02, 0);
    this.group.add(inPad);

    const outPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 })
    );
    outPad.position.set(1.5, 0.02, 0);
    this.group.add(outPad);

    this.cheeseMount = new THREE.Group();
    this.cheeseMount.position.set(1.5, 0.04, 0);
    this.group.add(this.cheeseMount);

    // Dynamic Input Requirement Billboard & 3D Voxel Milk Icon
    this.statusGroup = new THREE.Group();
    this.statusGroup.position.set(-1.5, 2.3, 0);

    this.statusIcon = createVoxelProductLogo('MILK');
    this.statusIcon.position.set(0, 0.46, 0);
    this.statusGroup.add(this.statusIcon);

    const bbGeo = new THREE.BoxGeometry(1.5, 0.44, 0.08);
    this.statusBillboardMat = new THREE.MeshStandardMaterial({
      map: getMachineStatusTexture('CHEESE_EMPTY', 'SÜT BEKLİYOR', 'KAZAN (0/6)', '#0984E3', '#FFFFFF'),
      roughness: 0.25
    });
    this.statusBillboard = new THREE.Mesh(bbGeo, this.statusBillboardMat);
    this.statusGroup.add(this.statusBillboard);

    this.beaconMat = new THREE.MeshStandardMaterial({
      color: 0x0984e3,
      emissive: 0x0984e3,
      emissiveIntensity: 0.85
    });
    this.beaconLamp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), this.beaconMat);
    this.beaconLamp.position.set(0.68, 0.22, 0.05);
    this.statusGroup.add(this.beaconLamp);

    this.group.add(this.statusGroup);
  }

  depositMilk() {
    if (this.currentMilk >= this.milkCapacity) return false;
    this.currentMilk++;
    return true;
  }

  spawnCheese() {
    const cheese = new THREE.Group();
    const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 });
    const wedge = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.18, 0.24), cheeseMat);
    wedge.castShadow = true;
    const rind = new THREE.Mesh(new THREE.BoxGeometry(0.31, 0.19, 0.04), new THREE.MeshStandardMaterial({ color: 0xe67e22 }));
    rind.position.z = -0.11;
    cheese.add(wedge, rind);

    const idx = this.cheeseWedges.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    cheese.position.set(-0.25 + col * 0.5, 0.12, -0.35 + row * 0.35);

    this.cheeseMount.add(cheese);
    this.cheeseWedges.push(cheese);
  }

  collectOneCheese() {
    if (this.cheeseWedges.length === 0) return false;
    const c = this.cheeseWedges.pop();
    this.cheeseMount.remove(c);
    return true;
  }

  update(delta, time = Date.now() * 0.001) {
    const isChurning = this.currentMilk > 0 && this.cheeseWedges.length < this.cheeseCapacity;
    updateProductionMachineDetails(this, delta, time, isChurning, this.cheeseWedges.length, this.churnTimer / this.churnDuration, this.cheeseCapacity);
    if (isChurning) {
      this.agitator.rotation.y += delta * 4.5;
      this.liquid.material.color.setHex(0xfffa65);

      this.churnTimer += delta * (this.speedMultiplier || 1.0);
      if (this.churnTimer >= this.churnDuration) {
        this.churnTimer = 0;
        this.currentMilk--;
        this.spawnCheese();
        window.Sound.playPop();
      }
    } else {
      this.agitator.rotation.y += delta * 0.8;
      this.liquid.material.color.setHex(0xfffdf5);
      this.churnTimer = 0;
    }

    // Dynamic Billboard & 3D Voxel Icon Animation
    if (this.statusGroup) {
      const cam = (window.gameInstance && window.gameInstance.camera);
      if (cam) {
        this.statusGroup.quaternion.copy(this.group.quaternion).invert().multiply(cam.quaternion);
      }
      if (this.statusIcon) {
        this.statusIcon.rotation.y += delta * 1.5;
        this.statusIcon.position.y = 0.46 + Math.sin(time * 3.0) * 0.06;
      }
      if (this.currentMilk === 0) {
        this.statusBillboardMat.map = getMachineStatusTexture('CHEESE_EMPTY', 'SÜT BEKLİYOR', `KAZAN (0/${this.milkCapacity})`, '#0984E3', '#FFFFFF');
        const bounce = 1.0 + Math.sin(time * 5.0) * 0.06;
        this.statusGroup.scale.set(bounce, bounce, bounce);
        const flash = Math.sin(time * 7.0) > 0;
        this.beaconMat.color.setHex(flash ? 0x0984e3 : 0xffe600);
        this.beaconMat.emissive.setHex(flash ? 0x0984e3 : 0xffe600);
      } else {
        this.statusBillboardMat.map = getMachineStatusTexture('CHEESE_ACTIVE', 'FERMENTE OLUYOR...', `STOK (${this.currentMilk}/${this.milkCapacity})`, '#2ECC71', '#FFFFFF');
        this.statusGroup.scale.set(1, 1, 1);
        this.beaconMat.color.setHex(0x2ed573);
        this.beaconMat.emissive.setHex(0x2ed573);
      }
    }
  }
}

// --- Low Poly Cubic Apple Orchard Tree Unit (Crossy Road / Voxel Art Direction) ---
class VoxelAppleTree {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.apples = [];
    this.maxApples = 6;
    this.isRipe = true;
    this.growthProgress = 1.0;
    this.regrowthDuration = 3.5; // seconds
    this.growthMultiplier = 1.0;

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    // 1. Soil & Mulch Earth Bed
    const bedGeo = new THREE.BoxGeometry(3.6, 0.25, 2.6);
    const bedMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.95 });
    const bed = new THREE.Mesh(bedGeo, bedMat);
    bed.position.y = 0.125;
    bed.receiveShadow = true;
    this.group.add(bed);

    // Forest Green border frame
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1b8b4b, roughness: 0.4 });
    const bHeight = 0.45;
    const b1 = new THREE.Mesh(new THREE.BoxGeometry(3.8, bHeight, 0.2), frameMat);
    b1.position.set(0, bHeight / 2, 1.3);
    const b2 = new THREE.Mesh(new THREE.BoxGeometry(3.8, bHeight, 0.2), frameMat);
    b2.position.set(0, bHeight / 2, -1.3);
    const b3 = new THREE.Mesh(new THREE.BoxGeometry(0.2, bHeight, 2.6), frameMat);
    b3.position.set(1.9, bHeight / 2, 0);
    const b4 = new THREE.Mesh(new THREE.BoxGeometry(0.2, bHeight, 2.6), frameMat);
    b4.position.set(-1.9, bHeight / 2, 0);
    this.group.add(b1, b2, b3, b4);

    // 2 Voxel Apple Trees in the bed (at X = -0.95 and X = +0.95)
    const treePositions = [-0.95, 0.95];
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5d4037, roughness: 0.8 });
    const foliageMat1 = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.7 });
    const foliageMat2 = new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0.6 });

    this.treeCanopies = [];
    this.appleMeshes = [];

    treePositions.forEach((tx) => {
      const treeGrp = new THREE.Group();
      treeGrp.position.set(tx, 0.25, 0);

      // Sturdy cubic tree trunk
      const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.8, 0.42), trunkMat);
      trunk.position.y = 0.9;
      trunk.castShadow = true;
      treeGrp.add(trunk);

      // Layered Stepped Voxel Leaves Canopy
      const canopy = new THREE.Group();
      canopy.position.y = 1.6;

      const layer1 = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.75, 1.7), foliageMat1);
      layer1.position.y = 0.35;
      layer1.castShadow = true;

      const layer2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.65, 1.3), foliageMat2);
      layer2.position.y = 0.95;
      layer2.castShadow = true;

      const crown = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.45, 0.75), foliageMat1);
      crown.position.y = 1.45;
      crown.castShadow = true;

      canopy.add(layer1, layer2, crown);
      treeGrp.add(canopy);
      this.treeCanopies.push(canopy);

      // 3 Ruby Apples hanging per tree
      const appleOffsets = [
        [-0.55, 0.15, -0.45],
        [0.55, 0.15, 0.45],
        [0.0, 0.10, -0.65]
      ];

      const appleMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.25 });
      const stemMat = new THREE.MeshBasicMaterial({ color: 0x2ed573 });

      appleOffsets.forEach(([ax, ay, az]) => {
        const appleNode = new THREE.Group();
        appleNode.position.set(ax, ay, az);

        const aCube = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), appleMat);
        aCube.castShadow = true;
        const stem = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.05), stemMat);
        stem.position.y = 0.14;

        appleNode.add(aCube, stem);
        canopy.add(appleNode);
        this.appleMeshes.push(appleNode);
      });

      this.group.add(treeGrp);
    });
  }

  harvestAvailable() {
    if (!this.isRipe) return [];
    this.isRipe = false;
    this.growthProgress = 0;
    this.appleMeshes.forEach(a => { a.visible = false; });

    const harvested = [];
    for (let i = 0; i < this.maxApples; i++) {
      harvested.push('APPLE');
    }
    return harvested;
  }

  update(delta, time = 0) {
    if (!this.isRipe) {
      this.growthProgress += (delta * (this.growthMultiplier || 1.0)) / this.regrowthDuration;
      if (this.growthProgress >= 1.0) {
        this.growthProgress = 1.0;
        this.isRipe = true;
        this.appleMeshes.forEach(a => {
          a.visible = true;
          a.scale.set(1, 1, 1);
        });
      } else {
        const s = this.growthProgress;
        this.appleMeshes.forEach(a => {
          a.visible = true;
          a.scale.set(s, s, s);
        });
      }
    } else {
      // Gentle breeze leaf sway
      if (time) {
        this.treeCanopies.forEach((c, idx) => {
          c.rotation.z = Math.sin(time * 2 + idx) * 0.03;
        });
      }
    }
  }
}

// --- Neo-Brutalist Popcorn Machine (Low Poly Cubic Art Direction) ---
class PopcornMaker {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.cornCapacity = 6;
    this.currentCorn = 0;
    this.popcornCapacity = 6;
    this.popcornBuckets = [];
    this.popcornBoxes = this.popcornBuckets;
    this.popTimer = 0;
    this.popDuration = 2.6; // seconds per bucket
    this.speedMultiplier = 1.0;

    this.inputPadPos = new THREE.Vector3(x - 1.5, 0, z); // drop corn
    this.outputPadPos = new THREE.Vector3(x + 1.5, 0, z); // collect popcorn

    this.initMesh();
    this.productionFloor = createProductionFloorKit(this.group, 0xff4757);
    this.productionDetails = createProductionMachineDetails(this.group, 0xff4757, 'MISIR > PATLAMIS MISIR', ['CORN']);
    this.scene.add(this.group);
  }

  initMesh() {
    // 1. Red & White Striped Base Stand Cabinet
    const standMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.35 });
    const stand = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 1.4), standMat);
    stand.position.y = 0.45;
    stand.castShadow = true;
    stand.receiveShadow = true;
    this.group.add(stand);

    // 2. Clear Acrylic Glass Popping Chamber
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      transparent: true,
      opacity: 0.5
    });
    const chamber = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.1, 1.2), glassMat);
    chamber.position.y = 1.45;
    this.group.add(chamber);

    // 3. Popping Kettle Cup inside
    const kettleMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.3, metalness: 0.3 });
    this.kettle = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.5), kettleMat);
    this.kettle.position.set(0, 1.55, 0);
    this.group.add(this.kettle);

    // Popping Popcorn kernels (jitter when active)
    this.popKernels = [];
    const kernMat = new THREE.MeshStandardMaterial({ color: 0xfffa65, roughness: 0.8 });
    for (let i = 0; i < 5; i++) {
      const k = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), kernMat);
      k.position.set((Math.random() - 0.5) * 0.4, 1.35, (Math.random() - 0.5) * 0.4);
      this.group.add(k);
      this.popKernels.push(k);
    }

    // 4. Red Canopy Roof
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.3 });
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.25, 1.5), roofMat);
    roof.position.y = 2.05;
    roof.castShadow = true;
    this.group.add(roof);

    // 5. Interactive Ground Pads
    // Input Pad (Yellow for Corn)
    const inPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 })
    );
    inPad.position.set(-1.5, 0.02, 0);
    this.group.add(inPad);

    // Output Pad (Red/White for Popcorn)
    const outPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 })
    );
    outPad.position.set(1.5, 0.02, 0);
    this.group.add(outPad);

    this.outputGroup = new THREE.Group();
    this.outputGroup.position.set(1.5, 0.04, 0);
    this.group.add(this.outputGroup);

    // Dynamic Input Requirement Billboard & 3D Voxel Corn Icon
    this.statusGroup = new THREE.Group();
    this.statusGroup.position.set(-1.5, 2.3, 0);

    this.statusIcon = createVoxelProductLogo('CORN');
    this.statusIcon.position.set(0, 0.46, 0);
    this.statusGroup.add(this.statusIcon);

    const bbGeo = new THREE.BoxGeometry(1.5, 0.44, 0.08);
    this.statusBillboardMat = new THREE.MeshStandardMaterial({
      map: getMachineStatusTexture('POPCORN_EMPTY', 'MISIR GEREKLİ', 'MAKİNE (0/6)', '#F1C40F'),
      roughness: 0.25
    });
    this.statusBillboard = new THREE.Mesh(bbGeo, this.statusBillboardMat);
    this.statusGroup.add(this.statusBillboard);

    this.beaconMat = new THREE.MeshStandardMaterial({
      color: 0xffe600,
      emissive: 0xffe600,
      emissiveIntensity: 0.85
    });
    this.beaconLamp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), this.beaconMat);
    this.beaconLamp.position.set(0.68, 0.22, 0.05);
    this.statusGroup.add(this.beaconLamp);

    this.group.add(this.statusGroup);
  }

  depositCorn() {
    if (this.currentCorn >= this.cornCapacity) return false;
    this.currentCorn++;
    return true;
  }

  spawnPopcorn() {
    const bucket = new THREE.Group();
    const bucketMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.4 });
    const bMesh = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.28), bucketMat);
    bMesh.castShadow = true;
    const popMat = new THREE.MeshStandardMaterial({ color: 0xfffa65, roughness: 0.8 });
    const pTop = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.12, 0.30), popMat);
    pTop.position.y = 0.15;
    bucket.add(bMesh, pTop);

    const idx = this.popcornBuckets.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    bucket.position.set(-0.25 + col * 0.5, 0.12, -0.35 + row * 0.35);

    this.outputGroup.add(bucket);
    this.popcornBuckets.push(bucket);
  }

  collectOnePopcorn() {
    if (this.popcornBuckets.length === 0) return false;
    const p = this.popcornBuckets.pop();
    this.outputGroup.remove(p);
    return true;
  }

  update(delta, time = Date.now() * 0.001) {
    const isPopping = this.currentCorn > 0 && this.popcornBuckets.length < this.popcornCapacity;
    updateProductionMachineDetails(this, delta, time, isPopping, this.popcornBuckets.length, this.popTimer / this.popDuration, this.popcornCapacity);
    if (isPopping) {
      this.popKernels.forEach((k, idx) => {
        k.position.y = 1.35 + Math.abs(Math.sin(time * 12 + idx * 2)) * 0.35;
        k.position.x = (Math.sin(time * 8 + idx) * 0.25);
      });
      this.kettle.rotation.z = Math.sin(time * 14) * 0.08;

      this.popTimer += delta * (this.speedMultiplier || 1.0);
      if (this.popTimer >= this.popDuration) {
        this.popTimer = 0;
        this.currentCorn--;
        this.spawnPopcorn();
        window.Sound.playPop();
      }
    } else {
      this.popTimer = 0;
      this.kettle.rotation.z = 0;
      this.popKernels.forEach(k => { k.position.y = 1.35; });
    }

    // Dynamic Billboard & 3D Voxel Icon Animation
    if (this.statusGroup) {
      const cam = (window.gameInstance && window.gameInstance.camera);
      if (cam) {
        this.statusGroup.quaternion.copy(this.group.quaternion).invert().multiply(cam.quaternion);
      }
      if (this.statusIcon) {
        this.statusIcon.rotation.y += delta * 1.5;
        this.statusIcon.position.y = 0.46 + Math.sin(time * 3.0) * 0.06;
      }
      if (this.currentCorn === 0) {
        this.statusBillboardMat.map = getMachineStatusTexture('POPCORN_EMPTY', 'MISIR GEREKLİ', `MAKİNE (0/${this.cornCapacity})`, '#F1C40F');
        const bounce = 1.0 + Math.sin(time * 5.0) * 0.06;
        this.statusGroup.scale.set(bounce, bounce, bounce);
        const flash = Math.sin(time * 7.0) > 0;
        this.beaconMat.color.setHex(flash ? 0xff4757 : 0xffe600);
        this.beaconMat.emissive.setHex(flash ? 0xff4757 : 0xffe600);
      } else {
        this.statusBillboardMat.map = getMachineStatusTexture('POPCORN_ACTIVE', 'PATLATILIYOR...', `MISIR (${this.currentCorn}/${this.cornCapacity})`, '#2ECC71', '#FFFFFF');
        this.statusGroup.scale.set(1, 1, 1);
        this.beaconMat.color.setHex(0x2ed573);
        this.beaconMat.emissive.setHex(0x2ed573);
      }
    }
  }
}

// --- Cold-Press Fruit Juicer Unit (Low Poly Voxel Art Direction) ---
class Juicer {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.appleCapacity = 6;
    this.currentApples = 0;
    this.juiceCapacity = 6;
    this.juiceBottles = [];
    this.juiceTimer = 0;
    this.juiceDuration = 2.5; // seconds per juice bottle
    this.speedMultiplier = 1.0;

    this.inputPadPos = new THREE.Vector3(x - 1.5, 0, z); // drop apples
    this.outputPadPos = new THREE.Vector3(x + 1.5, 0, z); // collect juice

    this.initMesh();
    this.productionFloor = createProductionFloorKit(this.group, 0x00cec9);
    this.productionDetails = createProductionMachineDetails(this.group, 0x00cec9, 'ELMA > ELMA SUYU', ['APPLE']);
    this.scene.add(this.group);
  }

  initMesh() {
    // 1. Stainless Steel & Mint Housing
    const housingMat = new THREE.MeshStandardMaterial({ color: 0x00cec9, roughness: 0.35 });
    const housing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.95, 1.4), housingMat);
    housing.position.y = 0.475;
    housing.castShadow = true;
    this.group.add(housing);

    // 2. Clear Cylinder / Box Juice Reservoir
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      transparent: true,
      opacity: 0.55
    });
    const tank = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.8), glassMat);
    tank.position.set(0.3, 1.45, 0);
    this.group.add(tank);

    // Amber Apple Juice inside tank
    this.juiceLevel = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.6, 0.72),
      new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.2 })
    );
    this.juiceLevel.position.set(0.3, 1.25, 0);
    this.group.add(this.juiceLevel);

    // 3. Apple Infeed Chute & Stamping Plunger on Left
    const chuteMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.3, metalness: 0.2 });
    const chute = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.6, 0.65), chuteMat);
    chute.position.set(-0.4, 1.25, 0);
    chute.castShadow = true;
    this.group.add(chute);

    this.plunger = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.45, 0.55), housingMat);
    this.plunger.position.set(-0.4, 1.65, 0);
    this.plunger.castShadow = true;
    this.group.add(this.plunger);

    // 4. Interactive Ground Pads
    // Input Pad (Crimson for Apples)
    const inPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.3 })
    );
    inPad.position.set(-1.5, 0.02, 0);
    this.group.add(inPad);

    // Output Pad (Amber Orange for Juice)
    const outPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.3 })
    );
    outPad.position.set(1.5, 0.02, 0);
    this.group.add(outPad);

    this.outputGroup = new THREE.Group();
    this.outputGroup.position.set(1.5, 0.04, 0);
    this.group.add(this.outputGroup);

    // Dynamic Input Requirement Billboard & 3D Voxel Apple Icon
    this.statusGroup = new THREE.Group();
    this.statusGroup.position.set(-1.5, 2.3, 0);

    this.statusIcon = createVoxelProductLogo('APPLE');
    this.statusIcon.position.set(0, 0.46, 0);
    this.statusGroup.add(this.statusIcon);

    const bbGeo = new THREE.BoxGeometry(1.5, 0.44, 0.08);
    this.statusBillboardMat = new THREE.MeshStandardMaterial({
      map: getMachineStatusTexture('JUICE_EMPTY', 'ELMA GEREKLİ', 'SIKACAK (0/6)', '#E74C3C', '#FFFFFF'),
      roughness: 0.25
    });
    this.statusBillboard = new THREE.Mesh(bbGeo, this.statusBillboardMat);
    this.statusGroup.add(this.statusBillboard);

    this.beaconMat = new THREE.MeshStandardMaterial({
      color: 0xe74c3c,
      emissive: 0xe74c3c,
      emissiveIntensity: 0.85
    });
    this.beaconLamp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), this.beaconMat);
    this.beaconLamp.position.set(0.68, 0.22, 0.05);
    this.statusGroup.add(this.beaconLamp);

    this.group.add(this.statusGroup);
  }

  depositApple() {
    if (this.currentApples >= this.appleCapacity) return false;
    this.currentApples++;
    return true;
  }

  spawnJuice() {
    const bottle = new THREE.Group();
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    const bMesh = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.28, 0.20), glassMat);
    bMesh.castShadow = true;
    const juice = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.22, 0.16),
      new THREE.MeshStandardMaterial({ color: 0xf39c12, roughness: 0.2 })
    );
    juice.position.y = -0.02;
    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.05, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.3 })
    );
    cap.position.y = 0.16;
    bottle.add(bMesh, juice, cap);

    const idx = this.juiceBottles.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    bottle.position.set(-0.25 + col * 0.5, 0.14, -0.35 + row * 0.35);

    this.outputGroup.add(bottle);
    this.juiceBottles.push(bottle);
  }

  collectOneJuice() {
    if (this.juiceBottles.length === 0) return false;
    const b = this.juiceBottles.pop();
    this.outputGroup.remove(b);
    return true;
  }

  update(delta, time = Date.now() * 0.001) {
    const isJuicing = this.currentApples > 0 && this.juiceBottles.length < this.juiceCapacity;
    updateProductionMachineDetails(this, delta, time, isJuicing, this.juiceBottles.length, this.juiceTimer / this.juiceDuration, this.juiceCapacity);
    if (isJuicing) {
      this.plunger.position.y = 1.45 + Math.abs(Math.sin(time * 6)) * 0.35;

      this.juiceTimer += delta * (this.speedMultiplier || 1.0);
      if (this.juiceTimer >= this.juiceDuration) {
        this.juiceTimer = 0;
        this.currentApples--;
        this.spawnJuice();
        window.Sound.playPop();
      }
    } else {
      this.juiceTimer = 0;
      this.plunger.position.y = 1.65;
    }

    // Dynamic Billboard & 3D Voxel Icon Animation
    if (this.statusGroup) {
      const cam = (window.gameInstance && window.gameInstance.camera);
      if (cam) {
        this.statusGroup.quaternion.copy(this.group.quaternion).invert().multiply(cam.quaternion);
      }
      if (this.statusIcon) {
        this.statusIcon.rotation.y += delta * 1.5;
        this.statusIcon.position.y = 0.46 + Math.sin(time * 3.0) * 0.06;
      }
      if (this.currentApples === 0) {
        this.statusBillboardMat.map = getMachineStatusTexture('JUICE_EMPTY', 'ELMA GEREKLİ', `SIKACAK (0/${this.appleCapacity})`, '#E74C3C', '#FFFFFF');
        const bounce = 1.0 + Math.sin(time * 5.0) * 0.06;
        this.statusGroup.scale.set(bounce, bounce, bounce);
        const flash = Math.sin(time * 7.0) > 0;
        this.beaconMat.color.setHex(flash ? 0xe74c3c : 0xf39c12);
        this.beaconMat.emissive.setHex(flash ? 0xe74c3c : 0xf39c12);
      } else {
        this.statusBillboardMat.map = getMachineStatusTexture('JUICE_ACTIVE', 'MEYVE SIKILIYOR', `ELMA (${this.currentApples}/${this.appleCapacity})`, '#2ECC71', '#FFFFFF');
        this.statusGroup.scale.set(1, 1, 1);
        this.beaconMat.color.setHex(0x2ed573);
        this.beaconMat.emissive.setHex(0x2ed573);
      }
    }
  }
}

// --- Bağımsız Yönetim Ofisi Mimarisi (Executive Management Office) & Living World Hub ---
class ExecutiveOffice {
  constructor(scene, x = -15.8, z = -4.8) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(0, 0, 0);

    this.triggerPadPos = new THREE.Vector3(-15.8, 0, -3.8);
    this.spawnPoint = new THREE.Vector3(-15.8, 0, -4.8);

    this.waterBubbles = [];
    this.telemetryBars = [];

    this.initOfficeArchitecture();
    this.initFurnishings();
    this.initMicroDetails();

    this.scene.add(this.group);
  }

  initOfficeArchitecture() {
    // 1. Polished Parquet Flooring Slab (X: -19.0 to -12.5, Z: -7.8 to -1.2)
    const floorGeo = new THREE.BoxGeometry(6.5, 0.02, 6.6);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b,
      roughness: 0.4,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.set(-15.75, 0.012, -4.5);
    floor.receiveShadow = true;
    this.group.add(floor);

    // Decorative alternating parquet planks
    const plankMatLight = new THREE.MeshStandardMaterial({ color: 0x9e6938, roughness: 0.45 });
    for (let pz = -7.5; pz <= -1.5; pz += 0.8) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(6.3, 0.005, 0.38), plankMatLight);
      plank.position.set(-15.75, 0.024, pz);
      this.group.add(plank);
    }

    // 2. North Wall (Z = -7.8, X: -19.0 to -12.5)
    // Dark Anthracite Brick Base + Acrylic Glass Window + Frame
    const wallBrickMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.8 });
    const wallBaseNorth = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.85, 0.28), wallBrickMat);
    wallBaseNorth.position.set(-15.75, 0.425, -7.8);
    wallBaseNorth.castShadow = true;
    this.group.add(wallBaseNorth);

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x74b9ff,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.42
    });
    const glassNorth = new THREE.Mesh(new THREE.BoxGeometry(6.3, 1.25, 0.08), glassMat);
    glassNorth.position.set(-15.75, 1.475, -7.8);
    this.group.add(glassNorth);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    const frameNorthTop = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.15, 0.30), frameMat);
    frameNorthTop.position.set(-15.75, 2.175, -7.8);
    this.group.add(frameNorthTop);

    // 3. East Wall (X = -12.5, Z: -7.8 to -1.2)
    // North Segment (Z: -7.8 to -5.0)
    const eastNorthBase = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.85, 2.8), wallBrickMat);
    eastNorthBase.position.set(-12.5, 0.425, -6.4);
    eastNorthBase.castShadow = true;
    const eastNorthGlass = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.25, 2.6), glassMat);
    eastNorthGlass.position.set(-12.5, 1.475, -6.4);
    const eastNorthTop = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.15, 2.8), frameMat);
    eastNorthTop.position.set(-12.5, 2.175, -6.4);
    this.group.add(eastNorthBase, eastNorthGlass, eastNorthTop);

    // South Segment (Z: -3.4 to -1.2)
    const eastSouthBase = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.85, 2.2), wallBrickMat);
    eastSouthBase.position.set(-12.5, 0.425, -2.3);
    eastSouthBase.castShadow = true;
    const eastSouthGlass = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.25, 2.0), glassMat);
    eastSouthGlass.position.set(-12.5, 1.475, -2.3);
    const eastSouthTop = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.15, 2.2), frameMat);
    eastSouthTop.position.set(-12.5, 2.175, -2.3);
    this.group.add(eastSouthBase, eastSouthGlass, eastSouthTop);

    // 4. Open Doorway Arch (X = -12.5, Z: -5.0 to -3.4, Width: 1.6m)
    const doorWoodMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.6 });
    const postNorth = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.2, 0.20), doorWoodMat);
    postNorth.position.set(-12.5, 1.1, -5.0);
    const postSouth = new THREE.Mesh(new THREE.BoxGeometry(0.32, 2.2, 0.20), doorWoodMat);
    postSouth.position.set(-12.5, 1.1, -3.4);
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.25, 1.8), doorWoodMat);
    lintel.position.set(-12.5, 2.1, -4.2);
    this.group.add(postNorth, postSouth, lintel);

    // Overhead Neo-Brutalist Arch Sign: [ YÖNETİM & İK ]
    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.42, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    signBoard.position.set(-12.5, 2.45, -4.2);
    const signFace = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.32, 1.4),
      new THREE.MeshBasicMaterial({ color: 0x00d2d3 })
    );
    signFace.position.set(-12.5, 2.45, -4.2);
    this.group.add(signBoard, signFace);
  }

  initFurnishings() {
    // 1. Executive Dark Walnut Desk (X = -15.8, Z = -4.8)
    const walnutMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.45 });
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 1.05), walnutMat);
    deskTop.position.set(-15.8, 0.84, -4.8);
    deskTop.castShadow = true;

    const deskLegL = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.80, 0.95), walnutMat);
    deskLegL.position.set(-16.55, 0.40, -4.8);
    deskLegL.castShadow = true;

    const deskLegR = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.80, 0.95), walnutMat);
    deskLegR.position.set(-15.05, 0.40, -4.8);
    deskLegR.castShadow = true;

    const deskModesty = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.50, 0.05), walnutMat);
    deskModesty.position.set(-15.8, 0.55, -4.35);

    // Brass drawer handles
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.8, roughness: 0.2 });
    const handleL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.16), brassMat);
    handleL.position.set(-16.55, 0.55, -4.3);
    const handleR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.16), brassMat);
    handleR.position.set(-15.05, 0.55, -4.3);

    this.group.add(deskTop, deskLegL, deskLegR, deskModesty, handleL, handleR);

    // 2. Dual-Terminal LCD Monitors
    const compMat = new THREE.MeshStandardMaterial({ color: 0x222f3e, roughness: 0.3 });
    const dualStand = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.14), compMat);
    dualStand.position.set(-15.8, 1.0, -5.1);

    // Left Monitor (Angled +14 deg)
    const monL = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.06), compMat);
    monL.position.set(-16.15, 1.25, -5.05);
    monL.rotation.y = 0.24;
    const screenL = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.38, 0.02), new THREE.MeshBasicMaterial({ color: 0x00cec9 }));
    screenL.position.set(-16.15, 1.25, -5.01);
    screenL.rotation.y = 0.24;

    // Right Monitor (Angled -14 deg)
    const monR = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.45, 0.06), compMat);
    monR.position.set(-15.45, 1.25, -5.05);
    monR.rotation.y = -0.24;
    const screenR = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.38, 0.02), new THREE.MeshBasicMaterial({ color: 0x2ecc71 }));
    screenR.position.set(-15.45, 1.25, -5.01);
    screenR.rotation.y = -0.24;

    // Keyboard & Desk Mat
    const deskMatMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.015, 0.45), new THREE.MeshStandardMaterial({ color: 0x1e272e }));
    deskMatMesh.position.set(-15.8, 0.89, -4.65);
    const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.025, 0.18), new THREE.MeshStandardMaterial({ color: 0xdfe4ea }));
    keyboard.position.set(-15.8, 0.91, -4.65);
    const mouse = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.025, 0.12), new THREE.MeshStandardMaterial({ color: 0xff4757 }));
    mouse.position.set(-15.35, 0.91, -4.65);

    this.group.add(dualStand, monL, screenL, monR, screenR, deskMatMesh, keyboard, mouse);

    // 3. Classic Banker's Green Desk Lamp
    const lampArm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.32, 0.06), brassMat);
    lampArm.position.set(-16.45, 1.04, -4.95);
    const lampShade = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.12, 0.14),
      new THREE.MeshStandardMaterial({ color: 0x10ac84, roughness: 0.2, emissive: 0x054d38 })
    );
    lampShade.position.set(-16.45, 1.22, -4.95);
    this.group.add(lampArm, lampShade);

    // 4. Executive Swivel Chair (X = -15.8, Z = -5.8)
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.5 });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
    const chairBase = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.12, 0.48), frameMat);
    chairBase.position.set(-15.8, 0.15, -5.75);
    const chairPillar = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.35, 0.10), frameMat);
    chairPillar.position.set(-15.8, 0.35, -5.75);
    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 0.60), chairMat);
    chairSeat.position.set(-15.8, 0.55, -5.75);
    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.75, 0.12), chairMat);
    chairBack.position.set(-15.8, 0.95, -6.02);
    chairBack.rotation.x = -0.10;
    this.group.add(chairBase, chairPillar, chairSeat, chairBack);

    // 5. Interactive Ground Trigger Pad (Electric Mint Green)
    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.04, 1.3),
      new THREE.MeshBasicMaterial({ color: 0x25d366, transparent: true, opacity: 0.38 })
    );
    pad.position.set(-15.8, 0.03, -3.8);
    this.group.add(pad);

    // Floating Golden Star & Upgrade Icon
    this.starIcon = new THREE.Group();
    this.starIcon.position.set(-15.8, 2.0, -3.8);
    const starMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.2 });
    const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.40, 0.12), starMat);
    s1.rotation.z = Math.PI / 4;
    const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.40, 0.12), starMat);
    this.starIcon.add(s1, s2);
    this.group.add(this.starIcon);
  }

  initMicroDetails() {
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, metalness: 0.8, roughness: 0.2 });

    // 1. Wall-Mounted Telemetry & Analytics LED Board (North Wall: X = -15.8, Y = 1.45, Z = -7.66)
    const boardFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 1.1, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    boardFrame.position.set(-15.8, 1.45, -7.66);

    const boardScreen = new THREE.Mesh(
      new THREE.BoxGeometry(2.05, 0.95, 0.02),
      new THREE.MeshBasicMaterial({ color: 0x1e272e })
    );
    boardScreen.position.set(-15.8, 1.45, -7.62);
    this.group.add(boardFrame, boardScreen);

    // Animated Bar Chart Blocks on Telemetry Board
    const barColors = [0x2ecc71, 0x00cec9, 0xf1c40f, 0xff7675];
    for (let i = 0; i < 4; i++) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.35 + i * 0.12, 0.04),
        new THREE.MeshBasicMaterial({ color: barColors[i] })
      );
      bar.position.set(-16.45 + i * 0.42, 1.25 + (0.35 + i * 0.12) / 2, -7.60);
      this.group.add(bar);
      this.telemetryBars.push(bar);
    }

    // 2. Framed Business License & Accreditation Plaque (X = -13.5, Y = 1.45, Z = -7.66)
    const certFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.65, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xf39c12, metalness: 0.8, roughness: 0.2 })
    );
    certFrame.position.set(-13.5, 1.45, -7.66);
    const certPaper = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.52, 0.02),
      new THREE.MeshStandardMaterial({ color: 0xfffdf5 })
    );
    certPaper.position.set(-13.5, 1.45, -7.63);
    const certSeal = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.14, 0.03),
      new THREE.MeshBasicMaterial({ color: 0xd63031 })
    );
    certSeal.position.set(-13.5, 1.30, -7.61);
    this.group.add(certFrame, certPaper, certSeal);

    // 3. Water Cooler Dispenser with Bubble Animation (X = -18.2, Z = -2.0)
    const coolerBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.85, 0.48),
      new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.3 })
    );
    coolerBase.position.set(-18.2, 0.425, -2.0);
    coolerBase.castShadow = true;

    const coolerBottle = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.50, 0.38),
      new THREE.MeshStandardMaterial({ color: 0x00d2d3, transparent: true, opacity: 0.65, roughness: 0.1 })
    );
    coolerBottle.position.set(-18.2, 1.15, -2.0);

    // Rising Air Bubbles inside Water Bottle
    const bubbleGeo = new THREE.BoxGeometry(0.06, 0.06, 0.06);
    const bubbleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let b = 0; b < 3; b++) {
      const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
      bubble.position.set(-18.2 + (Math.random() - 0.5) * 0.15, 0.95 + b * 0.15, -2.0 + (Math.random() - 0.5) * 0.15);
      this.group.add(bubble);
      this.waterBubbles.push({ mesh: bubble, speed: 0.25 + Math.random() * 0.2, minY: 0.95, maxY: 1.35 });
    }
    this.group.add(coolerBase, coolerBottle);

    // 4. Espresso Coffee Machine Counter (X = -18.2, Z = -3.5)
    const coffeeCredenza = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.85, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.5 })
    );
    coffeeCredenza.position.set(-18.2, 0.425, -3.5);
    coffeeCredenza.castShadow = true;

    const coffeeMachine = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.38, 0.32),
      new THREE.MeshStandardMaterial({ color: 0xd63031, metalness: 0.6, roughness: 0.3 })
    );
    coffeeMachine.position.set(-18.2, 1.04, -3.5);

    const coffeeCup = new THREE.Mesh(
      new THREE.BoxGeometry(0.10, 0.10, 0.10),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    coffeeCup.position.set(-18.2, 0.90, -3.30);
    this.group.add(coffeeCredenza, coffeeMachine, coffeeCup);

    // 5. 3-Tier Steel Filing Archive Cabinet (X = -18.2, Z = -6.4)
    const cabinet = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 1.45, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x576574, roughness: 0.6 })
    );
    cabinet.position.set(-18.2, 0.725, -6.4);
    cabinet.castShadow = true;

    // Drawer trims
    for (let d = 0; d < 3; d++) {
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.22), brassMat);
      handle.position.set(-17.91, 0.35 + d * 0.42, -6.4);
      this.group.add(handle);
    }
    this.group.add(cabinet);

    // 6. Corner Side Table with Potted Voxel Cactus (X = -13.2, Z = -7.0)
    const table = new THREE.Mesh(
      new THREE.BoxGeometry(0.50, 0.65, 0.50),
      new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.5 })
    );
    table.position.set(-13.2, 0.325, -7.0);

    const pot = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.24, 0.32),
      new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.8 })
    );
    pot.position.set(-13.2, 0.77, -7.0);

    const cactus = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.42, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.7 })
    );
    cactus.position.set(-13.2, 1.10, -7.0);

    const cactusFlower = new THREE.Mesh(
      new THREE.BoxGeometry(0.10, 0.10, 0.10),
      new THREE.MeshBasicMaterial({ color: 0xff4757 })
    );
    cactusFlower.position.set(-13.2, 1.34, -7.0);
    this.group.add(table, pot, cactus, cactusFlower);
  }

  update(time) {
    // 1. Star icon levitation & rotation
    if (this.starIcon) {
      this.starIcon.position.y = 2.0 + Math.sin(time * 3.0) * 0.12;
      this.starIcon.rotation.y = time * 2.0;
    }

    // 2. Rising water cooler bubbles
    this.waterBubbles.forEach(b => {
      b.mesh.position.y += 0.008 * b.speed;
      if (b.mesh.position.y > b.maxY) {
        b.mesh.position.y = b.minY;
      }
    });

    // 3. Dynamic Telemetry Bar Chart levels
    this.telemetryBars.forEach((bar, idx) => {
      const h = 0.25 + Math.abs(Math.sin(time * 2.0 + idx * 1.2)) * 0.45;
      bar.scale.y = h;
      bar.position.y = 1.25 + (h * 0.35) / 2;
    });
  }
}

// Backwards compatibility alias
class UpgradeDesk extends ExecutiveOffice {}

// --- 3D Voxel Living World Ecosystem, Environment & Landscaping Engine ---
// Features: Animated Windmill, Dual Silos, Cobblestone Avenues, Nature Forest Belt, Street Lamps, Benches, and Tree Wind Sway
class EnvironmentAndDecorations {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(0, 0, 0);

    this.swayTrees = [];
    this.windmillRotor = null;

    this.initCobblestoneGround();
    this.initVoxelWindmill();
    this.initVoxelSilos();
    this.initToolShedAndFarmProps();
    this.initNatureBeltAndTrees();
    this.initHorizonLandscape();

    this.scene.add(this.group);
  }

  initCobblestoneGround() {
    this.promenadeWayfinding = new THREE.Group();
    const promenadePalette = {
      warmIvory: 0xf4e7c5,
      softCream: 0xfff6df,
      paleStone: 0xdfe6e9,
      borderInk: 0x2f3640,
      pathSand: 0xe8c477
    };
    const stoneMats = [
      new THREE.MeshStandardMaterial({ color: promenadePalette.softCream, roughness: 0.88 }),
      new THREE.MeshStandardMaterial({ color: promenadePalette.warmIvory, roughness: 0.9 }),
      new THREE.MeshStandardMaterial({ color: promenadePalette.paleStone, roughness: 0.9 })
    ];
    const curbMat = new THREE.MeshStandardMaterial({ color: promenadePalette.borderInk, roughness: 0.78 });
    const crossPathMat = new THREE.MeshStandardMaterial({ color: promenadePalette.pathSand, roughness: 0.92 });

    // Calm warm base; neo-brutalist contrast is reserved for the thin outline.
    const mainAvenue = new THREE.Mesh(
      new THREE.BoxGeometry(3.05, 0.045, 25.0),
      new THREE.MeshStandardMaterial({ color: promenadePalette.warmIvory, roughness: 0.92 })
    );
    mainAvenue.position.set(0, 0.025, 12.5);
    mainAvenue.receiveShadow = true;
    this.promenadeWayfinding.add(mainAvenue);

    // Staggered large pavers replace the repetitive three-column checkerboard.
    for (let index = 0; index < 16; index++) {
      const z = 1.25 + index * 1.5;
      [-0.76, 0.76].forEach((x, lane) => {
        const slab = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.055, 1.28), stoneMats[(index + lane) % stoneMats.length]);
        slab.position.set(x, 0.055, z + (lane === 0 ? -0.08 : 0.08));
        slab.receiveShadow = true;
        this.promenadeWayfinding.add(slab);
      });
    }

    [-1.58, 1.58].forEach(cx => {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.07, 25.0), curbMat);
      curb.position.set(cx, 0.045, 12.5);
      this.promenadeWayfinding.add(curb);
    });

    const createPromenadeChevron = (z, color = 0xffe600) => {
      const chevron = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.58 });
      const left = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.065, 0.64), mat);
      const right = left.clone();
      left.rotation.y = -Math.PI / 4;
      right.rotation.y = Math.PI / 4;
      left.position.set(-0.20, 0.07, 0);
      right.position.set(0.20, 0.07, 0);
      chevron.position.set(0, 0, z);
      chevron.add(left, right);
      this.promenadeWayfinding.add(chevron);
    };
    [8.8, 20.2].forEach(z => createPromenadeChevron(z));

    const entranceStamp = new THREE.Mesh(
      new THREE.BoxGeometry(1.95, 0.07, 0.58),
      new THREE.MeshStandardMaterial({ map: getWayfindingFloorTexture('MARKET GIRISI', '#FFE600'), roughness: 0.45 })
    );
    entranceStamp.position.set(0, 0.075, 1.35);
    this.promenadeWayfinding.add(entranceStamp);

    const intersectionColors = [
      { z: 6.5, color: 0x10ac84, label: 'MANAV' },
      { z: 12.5, color: 0xe67e22, label: 'FIRIN' },
      { z: 18.5, color: 0x00cec9, label: 'URETIM' }
    ];
    intersectionColors.forEach(({ z, color, label }) => {
      const crossPath = new THREE.Mesh(new THREE.BoxGeometry(28.0, 0.035, 1.8), crossPathMat);
      crossPath.position.set(0, 0.02, z);
      crossPath.receiveShadow = true;
      this.promenadeWayfinding.add(crossPath);

      const branchMat = new THREE.MeshStandardMaterial({ color, roughness: 0.62 });
      [-5.4, 5.4].forEach(x => {
        const branchStripe = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.055, 0.10), branchMat);
        branchStripe.position.set(x, 0.052, z);
        this.promenadeWayfinding.add(branchStripe);
      });

      const hub = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.06, 0.78), curbMat);
      hub.position.set(0, 0.052, z);
      const hubLabel = new THREE.Mesh(
        new THREE.BoxGeometry(1.72, 0.07, 0.52),
        new THREE.MeshStandardMaterial({ map: getWayfindingFloorTexture(label, `#${color.toString(16).padStart(6, '0')}`), roughness: 0.45 })
      );
      hubLabel.position.set(0, 0.082, z);
      this.promenadeWayfinding.add(hub, hubLabel);
    });

    // Intentional wear blocks make the route feel used without random confetti.
    const wearPattern = [
      [-1.1, 4.4, 0.28, 0.14], [1.12, 10.7, 0.24, 0.16],
      [-1.08, 16.3, 0.26, 0.14], [1.1, 22.6, 0.22, 0.16]
    ];
    const wearMat = new THREE.MeshStandardMaterial({ color: 0xc5b58f, roughness: 1 });
    wearPattern.forEach(([x, z, width, depth]) => {
      const wear = new THREE.Mesh(new THREE.BoxGeometry(width, 0.07, depth), wearMat);
      wear.position.set(x, 0.085, z);
      this.promenadeWayfinding.add(wear);
    });

    // Small, deterministic edge markers replace the former random flower scatter.
    const markerColors = [0xff4757, 0x2ed573];
    [4.2, 10.2, 16.2, 22.2].forEach((z, index) => {
      const marker = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.12, 0.32),
        new THREE.MeshStandardMaterial({ color: markerColors[index % markerColors.length], roughness: 0.55 })
      );
      marker.position.set(index % 2 === 0 ? -1.92 : 1.92, 0.06, z);
      this.promenadeWayfinding.add(marker);
    });

    this.group.add(this.promenadeWayfinding);
  }

  initVoxelWindmill() {
    const wmGroup = new THREE.Group();
    wmGroup.position.set(0, 0, 24.8);

    const brickMat = new THREE.MeshStandardMaterial({ color: 0xb33927, roughness: 0.85 });
    const woodPlankMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.65 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.5 });
    const sailMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.3 });
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.7 });

    // Tier 1: Heavy Octagonal Brick Base
    const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 3.2), brickMat);
    base.position.y = 1.1;
    base.castShadow = true;
    base.receiveShadow = true;

    // Wooden Door & Arch
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.1), woodPlankMat);
    door.position.set(0, 0.8, -1.61);

    // Tier 2: Tapered Timber Upper Body
    const midBody = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.4, 2.6), woodPlankMat);
    midBody.position.y = 3.3;
    midBody.castShadow = true;

    // Balcony & Railing
    const balcony = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.15, 3.0), beamMat);
    balcony.position.y = 2.2;

    // Tier 3: Roof Cap
    const cap = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 2.2), roofMat);
    cap.position.y = 5.0;
    cap.castShadow = true;

    // Windmill Rotor Shaft Hub
    const hub = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.7), beamMat);
    hub.position.set(0, 4.8, -1.35);

    // 4-Blade Rotating Sails
    this.windmillRotor = new THREE.Group();
    this.windmillRotor.position.set(0, 4.8, -1.65);

    for (let i = 0; i < 4; i++) {
      const bladeArm = new THREE.Group();
      bladeArm.rotation.z = (i * Math.PI) / 2;

      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.10, 3.4, 0.08), beamMat);
      spoke.position.set(0, 1.7, 0);

      const sail = new THREE.Mesh(new THREE.BoxGeometry(0.70, 2.6, 0.04), sailMat);
      sail.position.set(0.38, 1.9, 0.02);

      bladeArm.add(spoke, sail);
      this.windmillRotor.add(bladeArm);
    }

    wmGroup.add(base, door, midBody, balcony, cap, hub, this.windmillRotor);
    this.group.add(wmGroup);
  }

  initVoxelSilos() {
    const siloMats = [
      new THREE.MeshStandardMaterial({ color: 0xced6e0, metalness: 0.6, roughness: 0.35 }),
      new THREE.MeshStandardMaterial({ color: 0x747d8c, metalness: 0.7, roughness: 0.3 })
    ];
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x2f3542, roughness: 0.4 });
    const ladderMat = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.5 });

    // Dual Silo Complex at South-West (X = -11.5, Z = 24.5 & X = -8.5, Z = 24.5)
    [-11.5, -8.5].forEach((sx, idx) => {
      const siloGroup = new THREE.Group();
      siloGroup.position.set(sx, 0, 24.5);

      // Stepped Voxel Cylinder Body
      const body1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.8, 2.4), siloMats[idx % 2]);
      body1.position.y = 2.4;
      body1.castShadow = true;

      const body2 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 4.85, 2.6), siloMats[idx % 2]);
      body2.position.y = 2.4;

      // Conical Cap
      const cap1 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.6, 2.2), roofMat);
      cap1.position.y = 5.1;
      const cap2 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, 1.4), roofMat);
      cap2.position.y = 5.5;

      // External Ladder
      const ladder = new THREE.Mesh(new THREE.BoxGeometry(0.35, 4.6, 0.08), ladderMat);
      ladder.position.set(0, 2.4, -1.25);

      // Connecting Grain Pipeline to Mill
      if (idx === 0) {
        const pipe = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.22, 0.22), siloMats[1]);
        pipe.position.set(1.5, 4.2, 0);
        siloGroup.add(pipe);
      }

      siloGroup.add(body1, body2, cap1, cap2, ladder);
      this.group.add(siloGroup);
    });
  }

  initToolShedAndFarmProps() {
    const shedGroup = new THREE.Group();
    shedGroup.position.set(10.5, 0, 24.5);

    const woodPlankMat = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.65 });
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.75 });
    const roofShingleMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.4 });
    const strawMat = new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.85 });

    // Workshop Barn Shed
    const shedWalls = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.6, 2.8), woodPlankMat);
    shedWalls.position.y = 1.3;
    shedWalls.castShadow = true;

    const shedRoof = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.4, 3.2), roofShingleMat);
    shedRoof.position.y = 2.7;
    shedRoof.castShadow = true;

    const shedDoor = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 0.1), darkWoodMat);
    shedDoor.position.set(0, 0.9, -1.41);

    shedGroup.add(shedWalls, shedRoof, shedDoor);
    this.group.add(shedGroup);

    // Hay Bales Stack near Shed
    [[-14.5, 18.5], [14.5, 18.5], [14.5, 7.5], [10.5, 21.5]].forEach(([hx, hz]) => {
      const bale1 = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.65, 0.70), strawMat);
      bale1.position.set(hx, 0.325, hz);
      bale1.castShadow = true;

      const bale2 = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 0.65), strawMat);
      bale2.position.set(hx + 0.15, 0.85, hz);
      bale2.rotation.y = 0.25;
      bale2.castShadow = true;

      this.group.add(bale1, bale2);
    });

    // Produce Crates at Junctions
    const produceMatTomato = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 });
    const produceMatCarrot = new THREE.MeshStandardMaterial({ color: 0xe67e22, roughness: 0.4 });
    [[-8.5, 6.5], [8.5, 6.5], [2.5, 18.5], [-2.5, 18.5]].forEach(([cx, cz]) => {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.45, 0.55), woodPlankMat);
      crate.position.set(cx, 0.225, cz);
      const produce = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.12, 0.35), produceMatTomato);
      produce.position.set(cx, 0.45, cz);
      this.group.add(crate, produce);
    });
  }

  initNatureBeltAndTrees() {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.85 });
    const pineMats = [
      new THREE.MeshStandardMaterial({ color: 0x10ac84, roughness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0x1dd1a1, roughness: 0.65 }),
      new THREE.MeshStandardMaterial({ color: 0x006266, roughness: 0.7 })
    ];
    const oakMats = [
      new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.5 }),
      new THREE.MeshStandardMaterial({ color: 0x7bed9f, roughness: 0.55 }),
      new THREE.MeshStandardMaterial({ color: 0x26de81, roughness: 0.6 })
    ];
    const appleMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.3 });
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x747d8c, roughness: 0.85 });

    // Comprehensive Tree Placement Map (75+ Trees covering all quadrants of 160x160 terrain)
    const treePositions = [
      // 1. West Forest Grove (X in [-58, -22], Z in [-28, 48])
      { x: -23.0, z: -10.0, type: 'PINE', scale: 1.15 },
      { x: -27.0, z: -4.0, type: 'OAK', scale: 1.25 },
      { x: -34.0, z: -8.0, type: 'PINE', scale: 1.4 },
      { x: -42.0, z: -12.0, type: 'PINE', scale: 1.2 },
      { x: -50.0, z: -6.0, type: 'OAK', scale: 1.3 },
      { x: -24.0, z: 2.0, type: 'PINE', scale: 0.95 },
      { x: -31.0, z: 5.0, type: 'OAK', scale: 1.1 },
      { x: -38.0, z: 0.0, type: 'PINE', scale: 1.35 },
      { x: -46.0, z: 4.0, type: 'OAK', scale: 1.2 },
      { x: -54.0, z: 10.0, type: 'PINE', scale: 1.45 },
      { x: -26.5, z: 12.0, type: 'PINE', scale: 1.3 },
      { x: -33.0, z: 15.0, type: 'PINE', scale: 1.1 },
      { x: -42.0, z: 16.0, type: 'OAK', scale: 1.3 },
      { x: -52.0, z: 18.0, type: 'PINE', scale: 1.25 },
      { x: -24.5, z: 20.0, type: 'OAK', scale: 1.05 },
      { x: -32.0, z: 24.0, type: 'OAK', scale: 1.2 },
      { x: -40.0, z: 26.0, type: 'PINE', scale: 1.4 },
      { x: -48.0, z: 28.0, type: 'OAK', scale: 1.15 },
      { x: -56.0, z: 32.0, type: 'PINE', scale: 1.35 },
      { x: -28.0, z: 34.0, type: 'PINE', scale: 1.2 },
      { x: -36.0, z: 38.0, type: 'OAK', scale: 1.3 },
      { x: -44.0, z: 42.0, type: 'PINE', scale: 1.45 },
      { x: -52.0, z: 46.0, type: 'OAK', scale: 1.25 },

      // 2. East Forest Grove (X in [22, 58], Z in [-28, 48])
      { x: 23.0, z: -10.0, type: 'OAK', scale: 1.15 },
      { x: 27.0, z: -4.0, type: 'PINE', scale: 1.3 },
      { x: 34.0, z: -8.0, type: 'OAK', scale: 1.35 },
      { x: 42.0, z: -12.0, type: 'PINE', scale: 1.2 },
      { x: 50.0, z: -6.0, type: 'PINE', scale: 1.4 },
      { x: 24.0, z: 2.0, type: 'OAK', scale: 0.95 },
      { x: 31.0, z: 5.0, type: 'PINE', scale: 1.15 },
      { x: 38.0, z: 0.0, type: 'OAK', scale: 1.4 },
      { x: 46.0, z: 4.0, type: 'PINE', scale: 1.25 },
      { x: 54.0, z: 10.0, type: 'OAK', scale: 1.3 },
      { x: 26.5, z: 12.0, type: 'PINE', scale: 1.25 },
      { x: 33.0, z: 15.0, type: 'OAK', scale: 1.1 },
      { x: 42.0, z: 16.0, type: 'PINE', scale: 1.35 },
      { x: 52.0, z: 18.0, type: 'OAK', scale: 1.2 },
      { x: 24.5, z: 20.0, type: 'PINE', scale: 1.3 },
      { x: 32.0, z: 24.0, type: 'PINE', scale: 1.15 },
      { x: 40.0, z: 26.0, type: 'OAK', scale: 1.45 },
      { x: 48.0, z: 28.0, type: 'PINE', scale: 1.2 },
      { x: 56.0, z: 32.0, type: 'OAK', scale: 1.4 },
      { x: 28.0, z: 34.0, type: 'OAK', scale: 1.2 },
      { x: 36.0, z: 38.0, type: 'PINE', scale: 1.35 },
      { x: 44.0, z: 42.0, type: 'OAK', scale: 1.25 },
      { x: 52.0, z: 46.0, type: 'PINE', scale: 1.5 },

      // 3. South Deep Woodlands (Z in [28, 62], X in [-55, 55])
      { x: -20.0, z: 29.0, type: 'PINE', scale: 1.25 },
      { x: -14.0, z: 31.0, type: 'OAK', scale: 1.15 },
      { x: -7.0, z: 30.0, type: 'PINE', scale: 1.35 },
      { x: 0.0, z: 32.0, type: 'PINE', scale: 1.45 },
      { x: 7.0, z: 30.0, type: 'OAK', scale: 1.2 },
      { x: 14.0, z: 31.0, type: 'PINE', scale: 1.3 },
      { x: 20.0, z: 29.0, type: 'OAK', scale: 1.25 },
      { x: -24.0, z: 38.0, type: 'OAK', scale: 1.3 },
      { x: -15.0, z: 40.0, type: 'PINE', scale: 1.4 },
      { x: -5.0, z: 39.0, type: 'OAK', scale: 1.2 },
      { x: 5.0, z: 41.0, type: 'PINE', scale: 1.35 },
      { x: 15.0, z: 39.0, type: 'OAK', scale: 1.3 },
      { x: 24.0, z: 40.0, type: 'PINE', scale: 1.45 },
      { x: -20.0, z: 48.0, type: 'PINE', scale: 1.5 },
      { x: -10.0, z: 50.0, type: 'OAK', scale: 1.35 },
      { x: 0.0, z: 49.0, type: 'PINE', scale: 1.4 },
      { x: 10.0, z: 51.0, type: 'PINE', scale: 1.45 },
      { x: 20.0, z: 48.0, type: 'OAK', scale: 1.3 },
      { x: -30.0, z: 56.0, type: 'PINE', scale: 1.55 },
      { x: -15.0, z: 58.0, type: 'OAK', scale: 1.4 },
      { x: 0.0, z: 60.0, type: 'PINE', scale: 1.6 },
      { x: 15.0, z: 58.0, type: 'PINE', scale: 1.5 },
      { x: 30.0, z: 56.0, type: 'OAK', scale: 1.45 },

      // 4. North Far Forest (Beyond Highway, Z in [-45, -60], X in [-65, 65])
      { x: -55.0, z: -46.0, type: 'PINE', scale: 1.4 },
      { x: -42.0, z: -48.0, type: 'OAK', scale: 1.3 },
      { x: -30.0, z: -45.0, type: 'PINE', scale: 1.5 },
      { x: -18.0, z: -47.0, type: 'OAK', scale: 1.25 },
      { x: -6.0, z: -46.0, type: 'PINE', scale: 1.35 },
      { x: 6.0, z: -46.0, type: 'OAK', scale: 1.3 },
      { x: 18.0, z: -47.0, type: 'PINE', scale: 1.45 },
      { x: 30.0, z: -45.0, type: 'OAK', scale: 1.35 },
      { x: 42.0, z: -48.0, type: 'PINE', scale: 1.5 },
      { x: 55.0, z: -46.0, type: 'OAK', scale: 1.4 },
      { x: -48.0, z: -55.0, type: 'PINE', scale: 1.6 },
      { x: -24.0, z: -56.0, type: 'OAK', scale: 1.45 },
      { x: 0.0, z: -57.0, type: 'PINE', scale: 1.6 },
      { x: 24.0, z: -56.0, type: 'PINE', scale: 1.5 },
      { x: 48.0, z: -55.0, type: 'OAK', scale: 1.55 }
    ];

    treePositions.forEach((tp, idx) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tp.x, 0, tp.z);
      const s = tp.scale || 1.0;

      // Trunk
      const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.38 * s, 1.6 * s, 0.38 * s), trunkMat);
      trunk.position.y = (1.6 * s) / 2;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Canopy Group for Wind Sway Animation
      const canopyGroup = new THREE.Group();
      canopyGroup.position.y = 1.4 * s;

      if (tp.type === 'PINE') {
        const mat = pineMats[idx % pineMats.length];
        // 3-Tiered Pyramid Boxes
        const tier1 = new THREE.Mesh(new THREE.BoxGeometry(2.4 * s, 0.9 * s, 2.4 * s), mat);
        tier1.position.y = 0.45 * s;
        tier1.castShadow = true;

        const tier2 = new THREE.Mesh(new THREE.BoxGeometry(1.8 * s, 0.8 * s, 1.8 * s), mat);
        tier2.position.y = 1.15 * s;
        tier2.castShadow = true;

        const tier3 = new THREE.Mesh(new THREE.BoxGeometry(1.1 * s, 0.9 * s, 1.1 * s), mat);
        tier3.position.y = 1.85 * s;
        tier3.castShadow = true;

        canopyGroup.add(tier1, tier2, tier3);
      } else {
        const mat = oakMats[idx % oakMats.length];
        // Chunky Cubic Oak Canopy
        const mainCanopy = new THREE.Mesh(new THREE.BoxGeometry(2.2 * s, 2.0 * s, 2.2 * s), mat);
        mainCanopy.position.y = 1.0 * s;
        mainCanopy.castShadow = true;

        const subCanopy = new THREE.Mesh(new THREE.BoxGeometry(2.6 * s, 1.2 * s, 1.8 * s), mat);
        subCanopy.position.y = 0.9 * s;

        // Red Apple Accents
        const apple1 = new THREE.Mesh(new THREE.BoxGeometry(0.2 * s, 0.2 * s, 0.2 * s), appleMat);
        apple1.position.set(0.9 * s, 0.6 * s, 1.12 * s);
        const apple2 = new THREE.Mesh(new THREE.BoxGeometry(0.2 * s, 0.2 * s, 0.2 * s), appleMat);
        apple2.position.set(-0.8 * s, 1.2 * s, 1.12 * s);

        canopyGroup.add(mainCanopy, subCanopy, apple1, apple2);
      }

      treeGroup.add(canopyGroup);
      this.group.add(treeGroup);

      this.swayTrees.push({
        canopy: canopyGroup,
        seed: idx * 1.37
      });
    });

    // Decorative Natural Boulders along Perimeters
    const boulderCoords = [
      [-20.0, 6.0], [20.0, 18.0], [-16.0, 26.0], [16.0, 26.0],
      [-35.0, -5.0], [35.0, -5.0], [-45.0, 15.0], [45.0, 15.0],
      [-28.0, 42.0], [28.0, 42.0], [-52.0, 30.0], [52.0, 30.0],
      [-38.0, -48.0], [38.0, -48.0], [-15.0, -46.0], [15.0, -46.0]
    ];
    boulderCoords.forEach(([bx, bz]) => {
      const rock = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 1.0), rockMat);
      rock.position.set(bx, 0.35, bz);
      rock.rotation.set(0.2, 0.4, 0.1);
      rock.castShadow = true;
      this.group.add(rock);
    });

    // Wild Floral & Shrub Clusters in Open Clearings
    const flowerMat1 = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.4 });
    const flowerMat2 = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.4 });
    const flowerMat3 = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.6 });
    const wildFlowerCoords = [
      [-26, -16], [-38, -18], [-48, 8], [-34, 32], [-46, 36],
      [26, -16], [38, -18], [48, 8], [34, 32], [46, 36],
      [-8, 36], [8, 36], [-22, 52], [22, 52], [0, 54]
    ];
    wildFlowerCoords.forEach(([fx, fz], idx) => {
      const fMat = idx % 3 === 0 ? flowerMat1 : (idx % 3 === 1 ? flowerMat2 : flowerMat3);
      const clump = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.6), fMat);
      clump.position.set(fx, 0.175, fz);
      this.group.add(clump);
    });
  }

  // --- Distant Low-Poly Horizon Hills & Mountain Mounds ---
  initHorizonLandscape() {
    const mountainBaseMat = new THREE.MeshStandardMaterial({ color: 0x16a085, roughness: 0.95 });
    const mountainMidMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.9 });
    const mountainHighMat = new THREE.MeshStandardMaterial({ color: 0x34495e, roughness: 0.85 });
    const snowCapMat = new THREE.MeshStandardMaterial({ color: 0xf5f6fa, roughness: 0.6 });

    // 8 Stepped Horizon Mountain Formations on Far Edge
    const mountainRanges = [
      // North Horizon (Behind Far Forest)
      { x: -50, z: -72, w: 32, d: 24, h: 18, snow: true },
      { x: 0, z: -76, w: 38, d: 26, h: 22, snow: true },
      { x: 50, z: -72, w: 32, d: 24, h: 18, snow: true },

      // South Horizon (Behind Deep Forest)
      { x: -45, z: 72, w: 30, d: 22, h: 16, snow: false },
      { x: 0, z: 76, w: 36, d: 26, h: 20, snow: true },
      { x: 45, z: 72, w: 30, d: 22, h: 16, snow: false },

      // West & East Horizon Ridges
      { x: -74, z: 0, w: 22, d: 45, h: 17, snow: false },
      { x: 74, z: 0, w: 22, d: 45, h: 17, snow: false }
    ];

    mountainRanges.forEach((m) => {
      const mGroup = new THREE.Group();
      mGroup.position.set(m.x, 0, m.z);

      // Base Mound (Wide Low Tier)
      const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(m.w, m.h * 0.45, m.d), mountainBaseMat);
      baseMesh.position.y = (m.h * 0.45) / 2;
      mGroup.add(baseMesh);

      // Mid Tier
      const midMesh = new THREE.Mesh(new THREE.BoxGeometry(m.w * 0.72, m.h * 0.35, m.d * 0.72), mountainMidMat);
      midMesh.position.y = m.h * 0.45 + (m.h * 0.35) / 2;
      mGroup.add(midMesh);

      // Peak Tier
      const peakMesh = new THREE.Mesh(new THREE.BoxGeometry(m.w * 0.42, m.h * 0.20, m.d * 0.42), mountainHighMat);
      peakMesh.position.y = m.h * 0.80 + (m.h * 0.20) / 2;
      mGroup.add(peakMesh);

      // Optional Snow Cap on Tallest Peaks
      if (m.snow) {
        const snowCap = new THREE.Mesh(new THREE.BoxGeometry(m.w * 0.24, m.h * 0.10, m.d * 0.24), snowCapMat);
        snowCap.position.y = m.h + (m.h * 0.10) / 2;
        mGroup.add(snowCap);
      }

      this.group.add(mGroup);
    });
  }

  update(delta, time = 0) {
    // 1. Continuous Rotation on Windmill Rotor
    if (this.windmillRotor) {
      this.windmillRotor.rotation.z += (delta || 0.016) * 1.5;
    }

    // 2. Trigonometric Wind Sway on Nature Tree Canopies
    if (this.swayTrees && this.swayTrees.length > 0) {
      this.swayTrees.forEach(t => {
        t.canopy.rotation.z = Math.sin(time * 1.8 + t.seed) * 0.04;
        t.canopy.rotation.x = Math.cos(time * 1.3 + t.seed) * 0.03;
      });
    }
  }
}

// Backwards compatibility alias
class AgriculturalDecorations extends EnvironmentAndDecorations {}

// --- Centralized AI Task Dispatcher & Utility Job Board ---
// Multi-Criteria Utility AI Scoring Engine: evaluates store inventory deficits,
// customer wait queues, factory raw material bottlenecks, spill hazards, and thief threats.
class AITaskDispatcher {
  constructor(game) {
    this.game = game;
    this.claims = {}; // key -> { helperId, timestamp }
  }

  update(delta) {
    const now = Date.now();
    for (const key in this.claims) {
      if (now - this.claims[key].timestamp > 4000) {
        delete this.claims[key];
      }
    }
  }

  isClaimed(key, helperId, maxConcurrent = 1) {
    const claim = this.claims[key];
    if (!claim) return false;
    if (claim.helperId === helperId) return false;
    if (Date.now() - claim.timestamp > 4000) {
      delete this.claims[key];
      return false;
    }
    return maxConcurrent <= 1;
  }

  claim(key, helperId) {
    this.claims[key] = { helperId, timestamp: Date.now() };
  }

  release(key, helperId) {
    if (this.claims[key] && this.claims[key].helperId === helperId) {
      delete this.claims[key];
    }
  }

  // Calculate real supermarket shelf demand with customer waiting multipliers
  getShelfDemand(itemType) {
    const shelves = this.game.shelves || [];
    const customers = this.game.customers || [];
    let totalDeficit = 0;
    let waitingBonus = 0;

    for (const s of shelves) {
      if (!s) continue;
      if (s.itemType === itemType || (itemType === 'STRAWBERRY' && s.itemType === 'STRAWBERRY_JAM')) {
        const capacity = s.maxCapacity || 16;
        const target = window.GameMechanics.getStockTarget(this.game.storage, s.itemType, capacity);
        const current = (s.items ? s.items.length : 0);
        if (current < target) {
          totalDeficit += (target - current);
        }
        // Heavily boost priority if customers are actively waiting at this shelf!
        const waitingCount = customers.filter(c => c && c.targetShelf === s && (c.state === 'WALKING_TO_SHELF' || (c.waitingTimer && c.waitingTimer > 0))).length;
        waitingBonus += waitingCount * 30;
      }
    }
    return totalDeficit + waitingBonus;
  }

  // Calculate machine input raw material deficit
  getFactoryInputDemand(itemType) {
    let deficit = 0;
    const g = this.game;
    if (itemType === 'WHEAT') {
      if (g.flourMill) deficit += Math.max(0, g.flourMill.wheatCapacity - g.flourMill.currentWheat);
      if (g.cowPen) deficit += Math.max(0, g.cowPen.feedCapacity - g.cowPen.currentFeed);
    } else if (itemType === 'FLOUR') {
      if (g.bakeryOven) deficit += Math.max(0, g.bakeryOven.flourCapacity - g.bakeryOven.currentFlour);
    } else if (itemType === 'MILK') {
      if (g.cheeseProcessor) deficit += Math.max(0, g.cheeseProcessor.milkCapacity - g.cheeseProcessor.currentMilk);
      if (g.iceCreamMachine) deficit += Math.max(0, g.iceCreamMachine.milkCapacity - g.iceCreamMachine.currentMilk);
    } else if (itemType === 'CORN') {
      if (g.popcornMaker) deficit += Math.max(0, g.popcornMaker.cornCapacity - g.popcornMaker.currentCorn);
      if (g.saladPrepBar || g.saladBar) {
        const sb = g.saladPrepBar || g.saladBar;
        deficit += Math.max(0, (sb.cornCapacity || 6) - (sb.currentCorn || 0));
      }
    } else if (itemType === 'APPLE') {
      if (g.juicer) deficit += Math.max(0, g.juicer.appleCapacity - g.juicer.currentApples);
      if (g.bakeryOven && g.bakeryOven.appleCapacity) deficit += Math.max(0, g.bakeryOven.appleCapacity - g.bakeryOven.currentApples);
    } else if (itemType === 'STRAWBERRY') {
      if (g.iceCreamMachine) deficit += Math.max(0, g.iceCreamMachine.strawberryCapacity - g.iceCreamMachine.currentStrawberries);
    } else if (itemType === 'TOMATO') {
      if (g.saladPrepBar || g.saladBar) {
        const sb = g.saladPrepBar || g.saladBar;
        deficit += Math.max(0, (sb.tomatoCapacity || 6) - (sb.currentTomatoes || 0));
      }
    } else if (itemType === 'CHEESE') {
      if (g.saladPrepBar || g.saladBar) {
        const sb = g.saladPrepBar || g.saladBar;
        deficit += Math.max(0, (sb.cheeseCapacity || 6) - (sb.currentCheese || 0));
      }
    }
    return deficit;
  }

  // Returns true if either supermarket shelves or processing machines need this item
  hasAnyDemand(itemType) {
    return (this.getShelfDemand(itemType) > 0) || (this.getFactoryInputDemand(itemType) > 0);
  }

  // Utility AI: Score all candidate jobs and select highest global value
  getBestJobForHelper(helper) {
    const g = this.game;
    const hPos = helper.char.group.position;
    const candidates = [];

    // Job Type 1: Apprehend Active Thief (Top Security Priority)
    const activeThief = (g.customers || []).find(c => c instanceof ShoplifterAI && !c.isCaught && !c.isFinished);
    if (activeThief && !this.isClaimed('tackle_thief', helper.id)) {
      const tPos = activeThief.char.group.position;
      const d = hPos.distanceTo(tPos);
      const isSecurityRole = helper.role === 'SUPER_LOGISTICS' || helper.id === 4 || helper.role === 'STOCKER';
      candidates.push({
        type: 'TACKLE_THIEF',
        label: 'HIRSIZ YAKALA',
        key: 'tackle_thief',
        priority: 105 + (isSecurityRole ? 25 : 0) - d * 0.4,
        targetPos: tPos,
        execute: () => {
          if (helper.cooldown <= 0 && hPos.distanceTo(tPos) < 1.6) {
            const bounty = activeThief.catchThief();
            if (bounty && g.money !== undefined) {
              g.money += bounty;
              g.updateMoneyUI();
            }
            window.Sound.playPop();
            if (g.showFloatingText) {
              g.showFloatingText(`PERSONEL HIRSIZI YAKALADI! +$${bounty}`, tPos, '#2ECC71');
            }
            helper.cooldown = 0.5;
          }
        }
      });
    }

    // Job Type 2: Soda Spill Cleanup (Hazard Mitigation)
    const spills = (g.spills || []).filter(s => s && !s.isCleaned);
    if (spills.length > 0 && !this.isClaimed('clean_spill', helper.id)) {
      let nearest = null;
      let minDist = 999;
      for (const s of spills) {
        const d = hPos.distanceTo(s.group.position);
        if (d < minDist) { minDist = d; nearest = s; }
      }
      if (nearest) {
        candidates.push({
          type: 'CLEAN_SPILL',
          label: 'TEMİZLİK',
          key: 'clean_spill',
          priority: 92 - minDist * 0.5,
          targetPos: nearest.group.position,
          execute: () => {
            if (helper.cooldown <= 0) {
              nearest.clean();
              if (g.money !== undefined) {
                g.money += 50;
                g.updateMoneyUI();
              }
              window.Sound.playPop();
              if (g.showFloatingText) g.showFloatingText('PERSONEL TEMİZLİK! +$50', nearest.group.position, '#00CEC9');
              helper.cooldown = 0.35;
            }
          }
        });
      }
    }

    // Job Type 3: Cashier Backup (When checkout queue >= 2 and register unstaffed)
    const checkoutLineCustomers = (g.customers || []).filter(c => c.state === 'IN_CHECKOUT_LINE');
    const isPlayerAtRegister = g.player && g.checkout && g.player.group.position.distanceTo(new THREE.Vector3(g.checkout.x, 0, g.checkout.z + 0.5)) < 1.4;
    const needsCashierHelp = g.checkout && !g.checkout.hasCashier && !isPlayerAtRegister && checkoutLineCustomers.length >= 2;
    if (needsCashierHelp && helper.char.stack.length === 0 && !this.isClaimed('cashier_support', helper.id)) {
      const cashierSpot = new THREE.Vector3(g.checkout.x, 0, g.checkout.z + 0.5);
      candidates.push({
        type: 'CASHIER',
        label: 'KASA DESTEK',
        key: 'cashier_support',
        priority: 98 + checkoutLineCustomers.length * 5,
        targetPos: cashierSpot,
        execute: () => {
          helper.char.group.rotation.y = 0;
          if (helper.cooldown <= 0 && checkoutLineCustomers.length > 0) {
            checkoutLineCustomers[0].processPayment();
            helper.cooldown = 0.40;
          }
        }
      });
    }

    // Job Type 4: Collect Finished Goods from Factories to Stock Supermarket Shelves
    const factorySources = [
      { key: 'oven_out', item: 'BREAD', obj: g.bakeryOven, pad: g.bakeryOven?.outputPadPos, hasItems: () => g.bakeryOven?.breadLoaves?.length > 0, collect: () => g.bakeryOven.collectOneBread() },
      { key: 'cheese_out', item: 'CHEESE', obj: g.cheeseProcessor, pad: g.cheeseProcessor?.outputPadPos, hasItems: () => g.cheeseProcessor?.cheeseWedges?.length > 0, collect: () => g.cheeseProcessor.collectOneCheese() ? 'CHEESE' : null },
      { key: 'popcorn_out', item: 'POPCORN', obj: g.popcornMaker, pad: g.popcornMaker?.outputPadPos, hasItems: () => g.popcornMaker?.popcornBoxes?.length > 0, collect: () => g.popcornMaker.collectOnePopcorn() ? 'POPCORN' : null },
      { key: 'juicer_out', item: 'APPLE_JUICE', obj: g.juicer, pad: g.juicer?.outputPadPos, hasItems: () => g.juicer?.juiceBottles?.length > 0, collect: () => g.juicer.collectOneJuice() ? 'APPLE_JUICE' : null },
      { key: 'icecream_out', item: 'ICE_CREAM', obj: g.iceCreamMachine, pad: g.iceCreamMachine?.outputPadPos, hasItems: () => g.iceCreamMachine?.iceCreamCups?.length > 0, collect: () => g.iceCreamMachine.collectOneIceCream() ? 'ICE_CREAM' : null },
      { key: 'salad_out', item: 'SALAD_BOWL', obj: (g.saladPrepBar || g.saladBar), pad: (g.saladPrepBar || g.saladBar)?.outputPadPos, hasItems: () => ((g.saladPrepBar && g.saladPrepBar.saladBowls?.length > 0) || (g.saladBar && g.saladBar.saladBowls?.length > 0)), collect: () => (g.saladPrepBar || g.saladBar).collectOneSalad() ? 'SALAD_BOWL' : null },
      { key: 'coop_out', item: 'EGG', obj: g.chickenCoop, pad: g.chickenCoop?.eggPadPos, hasItems: () => g.chickenCoop?.eggs?.length > 0, collect: () => g.chickenCoop.collectOneEgg() ? 'EGG' : null },
      { key: 'cow_out', item: 'MILK', obj: g.cowPen, pad: g.cowPen?.outputPadPos, hasItems: () => g.cowPen?.milkBottles?.length > 0, collect: () => g.cowPen.collectOneMilk() ? 'MILK' : null },
      { key: 'mill_out', item: 'FLOUR', obj: g.flourMill, pad: g.flourMill?.outputPadPos, hasItems: () => g.flourMill?.flourSacks?.length > 0, collect: () => g.flourMill.collectOneFlour() ? 'FLOUR' : null }
    ];

    for (const fs of factorySources) {
      if (fs.obj && fs.pad && fs.hasItems() && !this.isClaimed(fs.key, helper.id)) {
        const demand = this.getShelfDemand(fs.item) + this.getFactoryInputDemand(fs.item);
        if (demand > 0) {
          const d = hPos.distanceTo(fs.pad);
          let roleBonus = (helper.role === 'LOGISTICS' || helper.role === 'STOCKER' || helper.id === 2) ? 25 : 0;
          candidates.push({
            type: 'COLLECT_FACTORY',
            label: `${ITEM_TYPES[fs.item]?.name || fs.item} TOPLA`,
            key: fs.key,
            priority: 75 + roleBonus + Math.min(demand * 2, 20) - d * 0.4,
            targetPos: fs.pad,
            execute: () => {
              if (helper.cooldown <= 0) {
                // Batch harvest up to maxStack capacity
                while (helper.char.stack.length < helper.char.maxStack && fs.hasItems()) {
                  const item = fs.collect();
                  if (item) {
                    helper.char.addItem(item);
                  } else {
                    break;
                  }
                }
                window.Sound.playPop();
                helper.cooldown = 0.20;
              }
            }
          });
        }
      }
    }

    // Job Type 5: Supply Hungry Processing Machines with Raw Farm Inputs
    if (g.flourMill && g.flourMill.currentWheat < g.flourMill.wheatCapacity && g.wheatPlot && g.wheatPlot.plantSlots.some(s => s.isRipe) && !this.isClaimed('feed_mill', helper.id)) {
      const target = new THREE.Vector3(g.wheatPlot.x, 0, g.wheatPlot.z + 1.2);
      const d = hPos.distanceTo(target);
      candidates.push({
        type: 'SUPPLY_INPUT',
        label: 'BUĞDAY HASAT (DEĞİRMEN)',
        key: 'feed_mill',
        priority: 80 + (helper.role === 'FARMER' ? 20 : 0) - d * 0.4,
        targetPos: target,
        execute: () => {
          if (helper.cooldown <= 0) {
            const h = g.wheatPlot.harvestAvailable();
            h.forEach(i => helper.char.addItem(i));
            window.Sound.playPop();
            helper.cooldown = 0.22;
          }
        }
      });
    }

    if (g.cowPen && g.cowPen.currentFeed < g.cowPen.feedCapacity && g.wheatPlot && g.wheatPlot.plantSlots.some(s => s.isRipe) && !this.isClaimed('feed_cow', helper.id)) {
      const target = new THREE.Vector3(g.wheatPlot.x, 0, g.wheatPlot.z + 1.2);
      const d = hPos.distanceTo(target);
      candidates.push({
        type: 'SUPPLY_INPUT',
        label: 'BUĞDAY HASAT (İNEK)',
        key: 'feed_cow',
        priority: 78 + (helper.role === 'FARMER' ? 20 : 0) - d * 0.4,
        targetPos: target,
        execute: () => {
          if (helper.cooldown <= 0) {
            const h = g.wheatPlot.harvestAvailable();
            h.forEach(i => helper.char.addItem(i));
            window.Sound.playPop();
            helper.cooldown = 0.22;
          }
        }
      });
    }

    // Job Type 6: Demand-Driven Farm Harvesting (Vegetables & Fruits)
    const farmPlots = [
      { plot: g.tomatoPlot, type: 'TOMATO', key: 'harvest_tomato' },
      { plot: g.wheatPlot, type: 'WHEAT', key: 'harvest_wheat' },
      { plot: g.cornPlot, type: 'CORN', key: 'harvest_corn' },
      { plot: g.strawberryPlot, type: 'STRAWBERRY', key: 'harvest_strawberry' },
      { plot: g.carrotPlot, type: 'CARROT', key: 'harvest_carrot' },
      { plot: g.appleTree, type: 'APPLE', key: 'harvest_apple' }
    ];

    for (const fp of farmPlots) {
      if (fp.plot && !this.isClaimed(fp.key, helper.id)) {
        const isRipe = (fp.plot.plantSlots && fp.plot.plantSlots.some(s => s.isRipe)) || (fp.plot.apples && fp.plot.apples.length > 0) || (fp.plot.isRipe);
        const demand = this.getShelfDemand(fp.type) + this.getFactoryInputDemand(fp.type);
        if (isRipe && demand > 0) {
          const target = new THREE.Vector3(fp.plot.x, 0, fp.plot.z + 1.2);
          const d = hPos.distanceTo(target);
          let roleBonus = (helper.role === 'FARMER' || helper.id === 1 || helper.id === 3) ? 25 : 0;
          candidates.push({
            type: 'HARVEST',
            label: `${ITEM_TYPES[fp.type]?.name || fp.type} HASAT`,
            key: fp.key,
            priority: 72 + roleBonus + Math.min(demand * 2, 25) - d * 0.4,
            targetPos: target,
            execute: () => {
              if (helper.cooldown <= 0) {
                const harvested = fp.plot.harvestAvailable();
                harvested.forEach(i => helper.char.addItem(i));
                window.Sound.playPop();
                helper.cooldown = 0.22;
              }
            }
          });
        }
      }
    }

    // Sort candidate jobs by highest utility priority score
    candidates.forEach(candidate => {
      candidate.priority += window.GameMechanics.getStaffJobBonus(g.staffSettings, helper.id, candidate.type);
    });
    candidates.sort((a, b) => b.priority - a.priority);
    if (candidates.length > 0) {
      const best = candidates[0];
      this.claim(best.key, helper.id);
      return best;
    }

    return null;
  }
}

// --- Goal-Oriented Staff Helper AI & Smart Task Dispatcher ---
class StaffHelperAI {
  static nextId = 1;

  constructor(scene, gameOrPlots, roleOrShelves = 'FARMER', uniformColor = null) {
    this.scene = scene;
    this.id = StaffHelperAI.nextId++;
    if (gameOrPlots && (gameOrPlots.plots || gameOrPlots.shelves || gameOrPlots.taskDispatcher)) {
      this.game = gameOrPlots;
      this.role = typeof roleOrShelves === 'string' ? roleOrShelves : 'FARMER';
    } else if (Array.isArray(gameOrPlots)) {
      this.game = { plots: gameOrPlots, shelves: Array.isArray(roleOrShelves) ? roleOrShelves : [] };
      this.role = typeof roleOrShelves === 'string' ? roleOrShelves : (typeof uniformColor === 'string' ? uniformColor : 'FARMER');
    } else {
      this.game = gameOrPlots || { plots: [], shelves: [] };
      this.role = typeof roleOrShelves === 'string' ? roleOrShelves : 'FARMER';
    }

    const defaultColors = {
      FARMER: 0x27ae60,          // Emerald Green uniform for farming & feeding
      LOGISTICS: 0x0984e3,       // Cobalt Blue uniform for factories & processing
      STOCKER: 0xe67e22,         // Warm Orange uniform for shelf stocking
      SUPER_LOGISTICS: 0x9b59b6  // Purple uniform for multi-tasking & security
    };
    const col = uniformColor || defaultColors[this.role] || 0xe67e22;

    this.char = new Character3D(scene, col, false);
    this.char.group.position.set(-15.8, 0, -4.8); // Spawn in Executive Office
    this.char.maxStack = 6;
    this.baseSpeed = 3.8;
    this.speedMultiplier = 1.0;
    this.cooldown = 0;
    this.stuckTimer = 0;
    this.currentTask = 'IDLE';
    this.currentTaskLabel = 'HAZIRDA';
    this.taskTargetKey = null;
    this.laneOffset = (this.id % 4) * 0.45; // Dedicated parallel walking track
    this.navState = { path: null, pathIndex: 0, targetKey: '' };
  }

  setSpeedMultiplier(m) {
    this.speedMultiplier = m;
  }

  setMaxStack(c) {
    this.char.maxStack = c;
  }

  moveTo(target, speed, delta) {
    const pos = this.char.group.position;
    const res = moveWithDoorWaypoints(pos, target, speed, delta, this.navState);
    this.char.velocity.copy(res.velocity);
    if (res.velocity.lengthSq() > 0.01) {
      this.char.group.rotation.y = Math.atan2(res.velocity.x, res.velocity.z);
    }
    return pos.distanceTo(target) <= 0.95;
  }

  getStatusInfo() {
    return {
      task: this.currentTask,
      label: this.currentTaskLabel,
      role: this.role,
      stackCount: this.char.stack.length,
      maxStack: this.char.maxStack
    };
  }

  // Try depositing raw input items into hungry processing machines
  tryDepositFactory(topItem, speed, delta) {
    const g = this.game;
    if (topItem === 'WHEAT' && g.flourMill && g.flourMill.currentWheat < g.flourMill.wheatCapacity) {
      this.currentTask = 'SUPPLY_FACTORY';
      this.currentTaskLabel = 'DEĞİRMEN BESLE';
      if (this.moveTo(g.flourMill.inputPadPos, speed, delta)) {
        if (this.cooldown <= 0) {
          this.char.removeItem();
          g.flourMill.depositWheat();
          window.Sound.playPop();
          this.cooldown = 0.18;
        }
      }
      return true;
    } else if (topItem === 'WHEAT' && g.cowPen && g.cowPen.currentFeed < g.cowPen.feedCapacity) {
      this.currentTask = 'SUPPLY_FACTORY';
      this.currentTaskLabel = 'İNEK YEMLE';
      if (this.moveTo(g.cowPen.inputPadPos, speed, delta)) {
        if (this.cooldown <= 0) {
          this.char.removeItem();
          g.cowPen.feedWheat();
          window.Sound.playPop();
          this.cooldown = 0.18;
        }
      }
      return true;
    } else if (topItem === 'FLOUR' && g.bakeryOven && g.bakeryOven.currentFlour < g.bakeryOven.flourCapacity) {
      this.currentTask = 'SUPPLY_FACTORY';
      this.currentTaskLabel = 'FIRIN UN BESLE';
      if (this.moveTo(g.bakeryOven.inputPadPos, speed, delta)) {
        if (this.cooldown <= 0) {
          this.char.removeItem();
          g.bakeryOven.depositFlour();
          window.Sound.playPop();
          this.cooldown = 0.18;
        }
      }
      return true;
    } else if (topItem === 'MILK' && g.cheeseProcessor && g.cheeseProcessor.currentMilk < g.cheeseProcessor.milkCapacity) {
      this.currentTask = 'SUPPLY_FACTORY';
      this.currentTaskLabel = 'PEYNİR MAYALA';
      if (this.moveTo(g.cheeseProcessor.inputPadPos, speed, delta)) {
        if (this.cooldown <= 0) {
          this.char.removeItem();
          g.cheeseProcessor.depositMilk();
          window.Sound.playPop();
          this.cooldown = 0.18;
        }
      }
      return true;
    } else if (topItem === 'MILK' && g.iceCreamMachine && g.iceCreamMachine.currentMilk < g.iceCreamMachine.milkCapacity) {
      this.currentTask = 'SUPPLY_FACTORY';
      this.currentTaskLabel = 'DONDURMA SÜT';
      if (this.moveTo(g.iceCreamMachine.inputPadPos, speed, delta)) {
        if (this.cooldown <= 0) {
          this.char.removeItem();
          g.iceCreamMachine.depositMilk();
          window.Sound.playPop();
          this.cooldown = 0.18;
        }
      }
      return true;
    } else if (topItem === 'CORN' && g.popcornMaker && g.popcornMaker.currentCorn < g.popcornMaker.cornCapacity) {
      this.currentTask = 'SUPPLY_FACTORY';
      this.currentTaskLabel = 'MISIR PATLAT';
      if (this.moveTo(g.popcornMaker.inputPadPos, speed, delta)) {
        if (this.cooldown <= 0) {
          this.char.removeItem();
          g.popcornMaker.depositCorn();
          window.Sound.playPop();
          this.cooldown = 0.18;
        }
      }
      return true;
    } else if (topItem === 'APPLE' && g.juicer && g.juicer.currentApples < g.juicer.appleCapacity) {
      this.currentTask = 'SUPPLY_FACTORY';
      this.currentTaskLabel = 'ELMA SUYU SIK';
      if (this.moveTo(g.juicer.inputPadPos, speed, delta)) {
        if (this.cooldown <= 0) {
          this.char.removeItem();
          g.juicer.depositApple();
          window.Sound.playPop();
          this.cooldown = 0.18;
        }
      }
      return true;
    } else if (topItem === 'STRAWBERRY' && g.iceCreamMachine && g.iceCreamMachine.currentStrawberries < g.iceCreamMachine.strawberryCapacity) {
      this.currentTask = 'SUPPLY_FACTORY';
      this.currentTaskLabel = 'ÇİLEKLİ DONDURMA';
      if (this.moveTo(g.iceCreamMachine.inputPadPos, speed, delta)) {
        if (this.cooldown <= 0) {
          this.char.removeItem();
          g.iceCreamMachine.depositStrawberry();
          window.Sound.playPop();
          this.cooldown = 0.18;
        }
      }
      return true;
    }
    return false;
  }

  update(delta) {
    this.cooldown -= delta;
    const speed = this.baseSpeed * this.speedMultiplier;
    const pos = this.char.group.position;

    // 1. Anti-Stuck Jitter Physics
    if (this.char.velocity.lengthSq() < 0.04 && this.cooldown <= 0) {
      this.stuckTimer += delta;
      if (this.stuckTimer >= 1.5) {
        pos.x += (Math.random() - 0.5) * 0.5;
        pos.z += (Math.random() - 0.5) * 0.5;
        this.stuckTimer = 0;
      }
    } else {
      this.stuckTimer = 0;
    }

    // 2. Soft Mutual Repulsion with Customers & Other Staff
    const allCharacters = [];
    if (this.game.customers) allCharacters.push(...this.game.customers);
    if (this.game.helpers) allCharacters.push(...this.game.helpers);
    for (let i = 0; i < allCharacters.length; i++) {
      const other = allCharacters[i];
      if (!other || other === this || !other.char) continue;
      const d = pos.distanceTo(other.char.group.position);
      if (d < 1.30 && d > 0.05) {
        const push = (1.30 - d) * 2.2 * delta;
        const pushDirX = (pos.x - other.char.group.position.x) / d;
        const pushDirZ = (pos.z - other.char.group.position.z) / d;
        pos.x += pushDirX * push;
        pos.z += pushDirZ * push;
      }
    }

    // 3. Carried Items Delivery (Deadlock-Free Restock, Factory Supply, or Surplus Buffer)
    if (this.char.stack.length > 0) {
      const topItem = this.char.stack[this.char.stack.length - 1].type;

      // 3A. First try supplying hungry machines
      if (this.tryDepositFactory(topItem, speed, delta)) {
        this.char.update(delta);
        return;
      }

      // 3B. Check matching supermarket shelves
      const shelves = this.game.shelves || [];
      const matchingShelves = shelves.filter(s => s && (s.itemType === topItem || (topItem === 'STRAWBERRY' && s.itemType === 'STRAWBERRY_JAM')));
      const availableShelf = matchingShelves.find(s =>
        !s.isFull() && s.items.length < window.GameMechanics.getStockTarget(this.game.storage, s.itemType, s.maxCapacity || 16)
      );

      if (availableShelf) {
        this.currentTask = 'RESTOCK';
        this.currentTaskLabel = 'REYON DOLDUR';
        const target = new THREE.Vector3(availableShelf.x, 0, availableShelf.z + 1.2);
        if (this.moveTo(target, speed, delta)) {
          if (this.cooldown <= 0) {
            const item = this.char.removeItem();
            availableShelf.stockItem(item);
            this.game.playTransferEffect?.(this.char.group.position, availableShelf.group.position, topItem);
            window.Sound.playStock();
            this.cooldown = 0.12;
          }
        }
        this.char.update(delta);
        return;
      }

      // 3C. DEADLOCK PREVENTION: If all matching shelves and factories are completely full,
      // deposit surplus items into Executive Office buffer/wholesale clearance so helper is immediately freed!
      this.currentTask = 'EXCESS_BUFFER';
      this.currentTaskLabel = 'YEDEK DEPO';
      const bufferTarget = new THREE.Vector3(-14.8, 0, -4.6);
      if (this.moveTo(bufferTarget, speed, delta)) {
        if (this.cooldown <= 0) {
          const dumped = this.char.removeItem();
          const val = Math.round(((ITEM_TYPES[dumped]?.price || 10) * 0.6));
          if (this.game.money !== undefined) {
            this.game.money += val;
            this.game.updateMoneyUI();
          }
          window.Sound.playPop();
          if (this.game.showFloatingText) {
            this.game.showFloatingText(`YEDEK DEPO! +$${val}`, bufferTarget, '#FFE600');
          }
          this.cooldown = 0.22;
        }
      }
      this.char.update(delta);
      return;
    }

    // 4. Centralized Utility Job Dispatcher Query
    const dispatcher = this.game.taskDispatcher;
    const job = dispatcher ? dispatcher.getBestJobForHelper(this) : null;

    if (job) {
      this.currentTask = job.type;
      this.currentTaskLabel = job.label;
      if (this.moveTo(job.targetPos, speed, delta)) {
        job.execute();
      }
      this.char.update(delta);
      return;
    }

    // IDLE: Rest at distinct role-based home stations (Prevents dogpiling / clustering)
    this.currentTask = 'IDLE';
    this.currentTaskLabel = 'HAZIRDA';

    let homeTarget;
    if (this.role === 'STOCKER' || this.id === 1) {
      homeTarget = new THREE.Vector3(-3.5, 0, -6.5); // Market Entrance Aisle
    } else if (this.role === 'LOGISTICS' || this.id === 2) {
      homeTarget = new THREE.Vector3(-10.0, 0, 14.5); // Mill / Bakery Logistics Bay
    } else if (this.role === 'FARMER' || this.id === 3) {
      homeTarget = new THREE.Vector3(2.5, 0, 7.5); // Farm Tool Gate
    } else if (this.role === 'SUPER_LOGISTICS' || this.id === 4) {
      homeTarget = new THREE.Vector3(11.0, 0, -4.5); // Service / Delivery Wing
    } else {
      homeTarget = new THREE.Vector3(-15.0 + (this.id % 3) * 1.2, 0, -4.8); // Executive Office
    }

    if (pos.distanceTo(homeTarget) > 1.2) {
      this.moveTo(homeTarget, speed * 0.5, delta);
    } else {
      this.char.velocity.set(0, 0, 0);
    }

    this.char.update(delta);
  }
}

// --- Soft-Serve Ice Cream Churner Machine (Low Poly Voxel Machine) ---
// Synergistic Recipe: 1 Milk + 1 Egg + 1 Strawberry -> Creamy Ice Cream ($95)
class IceCreamMachine {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.milkCapacity = 6;
    this.currentMilk = 0;
    this.eggCapacity = 6;
    this.currentEggs = 0;
    this.strawberryCapacity = 6;
    this.currentStrawberries = 0;
    this.iceCreamCapacity = 6;
    this.iceCreamCups = [];
    this.churnTimer = 0;
    this.churnDuration = 2.6; // seconds per cup
    this.speedMultiplier = 1.0;

    this.inputPadPos = new THREE.Vector3(x - 1.5, 0, z); // drop milk/egg/strawberry
    this.outputPadPos = new THREE.Vector3(x + 1.5, 0, z); // collect ice cream

    this.initMesh();
    this.productionFloor = createProductionFloorKit(this.group, 0xff7675);
    this.productionDetails = createProductionMachineDetails(this.group, 0xff7675, 'SUT + YUMURTA + CILEK > DONDURMA', ['MILK', 'EGG', 'STRAWBERRY']);
    this.scene.add(this.group);
  }

  get iceCreams() {
    return this.iceCreamCups;
  }

  get capacity() {
    return this.milkCapacity;
  }

  get currentStrawberry() {
    return this.currentStrawberries;
  }

  initMesh() {
    // 1. Chilled Sky Blue & Silver Cabinet
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.3 });
    const cabinet = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.4), bodyMat);
    cabinet.position.y = 0.6;
    cabinet.castShadow = true;
    cabinet.receiveShadow = true;
    this.group.add(cabinet);

    // 2. Freezing Chrome Chamber & Clear Vat
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.1, metalness: 0.7 });
    const dispenserHead = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 0.6), chromeMat);
    dispenserHead.position.set(0, 1.4, 0.3);
    dispenserHead.castShadow = true;
    this.group.add(dispenserHead);

    // 3 Triple Spouts
    for (let i = -1; i <= 1; i++) {
      const spout = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.12), chromeMat);
      spout.position.set(i * 0.32, 1.15, 0.48);
      this.group.add(spout);
    }

    // 3. Rotating Soft-Serve Swirl Topper
    this.swirlTopper = new THREE.Group();
    this.swirlTopper.position.set(0, 1.75, 0);
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xff7675, roughness: 0.4 });
    const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.22, 0.44), pinkMat);
    const t2 = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.20, 0.30), pinkMat);
    t2.position.y = 0.18;
    const t3 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), pinkMat);
    t3.position.y = 0.32;
    this.swirlTopper.add(t1, t2, t3);
    this.group.add(this.swirlTopper);

    // 4. Ground Interactive Pads
    const inPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    inPad.position.set(-1.5, 0.02, 0);
    this.group.add(inPad);

    const outPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.3 })
    );
    outPad.position.set(1.5, 0.02, 0);
    this.group.add(outPad);

    this.inputGroup = new THREE.Group();
    this.inputGroup.position.set(-1.5, 0.04, 0);
    this.group.add(this.inputGroup);

    this.outputGroup = new THREE.Group();
    this.outputGroup.position.set(1.5, 0.04, 0);
    this.group.add(this.outputGroup);

    // Dynamic Input Requirement Billboard & 3D Voxel Strawberry Icon
    this.statusGroup = new THREE.Group();
    this.statusGroup.position.set(-1.5, 2.3, 0);

    this.statusIcon = createVoxelProductLogo('STRAWBERRY');
    this.statusIcon.position.set(0, 0.46, 0);
    this.statusGroup.add(this.statusIcon);

    const bbGeo = new THREE.BoxGeometry(1.6, 0.44, 0.08);
    this.statusBillboardMat = new THREE.MeshStandardMaterial({
      map: getMachineStatusTexture('ICE_EMPTY', 'SÜT & ÇİLEK GEREKLİ', 'DONDURMA (0/6)', '#00CEC9'),
      roughness: 0.25
    });
    this.statusBillboard = new THREE.Mesh(bbGeo, this.statusBillboardMat);
    this.statusGroup.add(this.statusBillboard);

    this.beaconMat = new THREE.MeshStandardMaterial({
      color: 0x00cec9,
      emissive: 0x00cec9,
      emissiveIntensity: 0.85
    });
    this.beaconLamp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), this.beaconMat);
    this.beaconLamp.position.set(0.72, 0.22, 0.05);
    this.statusGroup.add(this.beaconLamp);

    this.group.add(this.statusGroup);
  }

  depositMilk() {
    if (this.currentMilk >= this.milkCapacity) return false;
    this.currentMilk++;
    this.refreshInputs();
    return true;
  }

  depositEgg() {
    if (this.currentEggs >= this.eggCapacity) return false;
    this.currentEggs++;
    this.refreshInputs();
    return true;
  }

  depositStrawberry() {
    if (this.currentStrawberries >= this.strawberryCapacity) return false;
    this.currentStrawberries++;
    this.refreshInputs();
    return true;
  }

  refreshInputs() {
    while (this.inputGroup.children.length > 0) {
      this.inputGroup.remove(this.inputGroup.children[0]);
    }
    if (this.currentMilk > 0) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.18), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      b.position.set(-0.2, 0.11, 0);
      this.inputGroup.add(b);
    }
    if (this.currentEggs > 0) {
      const e = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.18), new THREE.MeshStandardMaterial({ color: 0xf5f6fa }));
      e.position.set(0.2, 0.11, 0);
      this.inputGroup.add(e);
    }
    if (this.currentStrawberries > 0) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.20, 0.18), new THREE.MeshStandardMaterial({ color: 0xff2a55 }));
      s.position.set(0, 0.25, 0);
      this.inputGroup.add(s);
    }
  }

  spawnIceCream() {
    const cupGroup = new THREE.Group();
    const cup = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.18, 0.26), new THREE.MeshStandardMaterial({ color: 0x00d2d3 }));
    cup.castShadow = true;
    const swirl = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.16, 0.28), new THREE.MeshStandardMaterial({ color: 0xff7675 }));
    swirl.position.y = 0.14;
    cupGroup.add(cup, swirl);

    const idx = this.iceCreamCups.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    cupGroup.position.set(-0.25 + col * 0.5, 0.12, -0.35 + row * 0.35);

    this.outputGroup.add(cupGroup);
    this.iceCreamCups.push(cupGroup);
  }

  collectOneIceCream() {
    if (this.iceCreamCups.length === 0) return false;
    const c = this.iceCreamCups.pop();
    this.outputGroup.remove(c);
    return true;
  }

  update(delta, time = Date.now() * 0.001) {
    this.swirlTopper.rotation.y = time * 2;
    const canMake = this.currentMilk > 0 && this.currentEggs > 0 && this.currentStrawberries > 0 && this.iceCreamCups.length < this.iceCreamCapacity;
    updateProductionMachineDetails(this, delta, time, canMake, this.iceCreamCups.length, this.churnTimer / this.churnDuration, this.iceCreamCapacity);

    if (canMake) {
      this.churnTimer += delta * (this.speedMultiplier || 1.0);
      if (this.churnTimer >= this.churnDuration) {
        this.churnTimer = 0;
        this.currentMilk--;
        this.currentEggs--;
        this.currentStrawberries--;
        this.refreshInputs();
        this.spawnIceCream();
        window.Sound.playPop();
      }
    } else {
      this.churnTimer = 0;
    }

    // Dynamic Billboard & 3D Voxel Icon Animation
    if (this.statusGroup) {
      const cam = (window.gameInstance && window.gameInstance.camera);
      if (cam) {
        this.statusGroup.quaternion.copy(this.group.quaternion).invert().multiply(cam.quaternion);
      }
      if (this.statusIcon) {
        this.statusIcon.rotation.y += delta * 1.5;
        this.statusIcon.position.y = 0.46 + Math.sin(time * 3.0) * 0.06;
      }
      const hasInputs = (this.currentMilk > 0 || this.currentStrawberries > 0);
      if (!hasInputs) {
        this.statusBillboardMat.map = getMachineStatusTexture('ICE_EMPTY', 'SÜT & ÇİLEK GEREKLİ', 'MALZEME BEKLİYOR', '#00CEC9');
        const bounce = 1.0 + Math.sin(time * 5.0) * 0.06;
        this.statusGroup.scale.set(bounce, bounce, bounce);
        const flash = Math.sin(time * 7.0) > 0;
        this.beaconMat.color.setHex(flash ? 0x00cec9 : 0xff7675);
        this.beaconMat.emissive.setHex(flash ? 0x00cec9 : 0xff7675);
      } else {
        this.statusBillboardMat.map = getMachineStatusTexture('ICE_ACTIVE', 'DONDURULUYOR...', `SÜT:${this.currentMilk} ÇİLEK:${this.currentStrawberries}`, '#2ECC71', '#FFFFFF');
        this.statusGroup.scale.set(1, 1, 1);
        this.beaconMat.color.setHex(0x2ed573);
        this.beaconMat.emissive.setHex(0x2ed573);
      }
    }
  }
}

// --- Salad Prep & Gourmet Deli Counter (Low Poly Voxel Station) ---
// Synergistic Recipe: 1 Tomato + 1 Corn + 1 Cheese -> Mediterranean Salad Bowl ($70)
class SaladPrepBar {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.tomatoCapacity = 6;
    this.currentTomatoes = 0;
    this.cornCapacity = 6;
    this.currentCorn = 0;
    this.cheeseCapacity = 6;
    this.currentCheese = 0;
    this.saladCapacity = 6;
    this.saladBowls = [];
    this.prepTimer = 0;
    this.prepDuration = 2.4; // seconds per salad bowl
    this.speedMultiplier = 1.0;

    this.inputPadPos = new THREE.Vector3(x - 1.5, 0, z); // drop tomato/corn/cheese
    this.outputPadPos = new THREE.Vector3(x + 1.5, 0, z); // collect salad bowl

    this.initMesh();
    this.productionFloor = createProductionFloorKit(this.group, 0x2ecc71);
    this.productionDetails = createProductionMachineDetails(this.group, 0x2ecc71, 'DOMATES + MISIR + PEYNIR > SALATA', ['TOMATO', 'CORN', 'CHEESE']);
    this.scene.add(this.group);
  }

  get currentTomato() {
    return this.currentTomatoes;
  }

  get capacity() {
    return this.tomatoCapacity;
  }

  initMesh() {
    // 1. Emerald Green & Wood Deli Table
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x27ae60, roughness: 0.4 });
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.95, 1.4), tableMat);
    table.position.y = 0.475;
    table.castShadow = true;
    table.receiveShadow = true;
    this.group.add(table);

    // 2. Stainless Steel Salad Trough with Acrylic Glass Sneeze Guard
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.2, metalness: 0.5 });
    const trough = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 0.9), metalMat);
    trough.position.set(0, 1.05, -0.1);
    trough.castShadow = true;
    this.group.add(trough);

    // Sneeze Guard
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 });
    const guard = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.55, 0.05), glassMat);
    guard.position.set(0, 1.45, 0.4);
    guard.rotation.x = -0.25;
    this.group.add(guard);

    // 3. Ground Interactive Pads
    const inPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 })
    );
    inPad.position.set(-1.5, 0.02, 0);
    this.group.add(inPad);

    const outPad = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.3 })
    );
    outPad.position.set(1.5, 0.02, 0);
    this.group.add(outPad);

    this.inputGroup = new THREE.Group();
    this.inputGroup.position.set(-1.5, 0.04, 0);
    this.group.add(this.inputGroup);

    this.outputGroup = new THREE.Group();
    this.outputGroup.position.set(1.5, 0.04, 0);
    this.group.add(this.outputGroup);

    // Dynamic Input Requirement Billboard & 3D Voxel Tomato Icon
    this.statusGroup = new THREE.Group();
    this.statusGroup.position.set(-1.5, 2.3, 0);

    this.statusIcon = createVoxelProductLogo('TOMATO');
    this.statusIcon.position.set(0, 0.46, 0);
    this.statusGroup.add(this.statusIcon);

    const bbGeo = new THREE.BoxGeometry(1.6, 0.44, 0.08);
    this.statusBillboardMat = new THREE.MeshStandardMaterial({
      map: getMachineStatusTexture('SALAD_EMPTY', 'SEBZE & PEYNİR GEREKLİ', 'SALATA BARI (0/6)', '#27AE60'),
      roughness: 0.25
    });
    this.statusBillboard = new THREE.Mesh(bbGeo, this.statusBillboardMat);
    this.statusGroup.add(this.statusBillboard);

    this.beaconMat = new THREE.MeshStandardMaterial({
      color: 0x27ae60,
      emissive: 0x27ae60,
      emissiveIntensity: 0.85
    });
    this.beaconLamp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), this.beaconMat);
    this.beaconLamp.position.set(0.72, 0.22, 0.05);
    this.statusGroup.add(this.beaconLamp);

    this.group.add(this.statusGroup);
  }

  depositTomato() {
    if (this.currentTomatoes >= this.tomatoCapacity) return false;
    this.currentTomatoes++;
    this.refreshInputs();
    return true;
  }

  depositCorn() {
    if (this.currentCorn >= this.cornCapacity) return false;
    this.currentCorn++;
    this.refreshInputs();
    return true;
  }

  depositCheese() {
    if (this.currentCheese >= this.cheeseCapacity) return false;
    this.currentCheese++;
    this.refreshInputs();
    return true;
  }

  refreshInputs() {
    while (this.inputGroup.children.length > 0) {
      this.inputGroup.remove(this.inputGroup.children[0]);
    }
    if (this.currentTomatoes > 0) {
      const t = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), new THREE.MeshStandardMaterial({ color: 0xff4757 }));
      t.position.set(-0.2, 0.11, 0);
      this.inputGroup.add(t);
    }
    if (this.currentCorn > 0) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.18), new THREE.MeshStandardMaterial({ color: 0xffe600 }));
      c.position.set(0.2, 0.11, 0);
      this.inputGroup.add(c);
    }
    if (this.currentCheese > 0) {
      const ch = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.14, 0.16), new THREE.MeshStandardMaterial({ color: 0xffe600 }));
      ch.position.set(0, 0.26, 0);
      this.inputGroup.add(ch);
    }
  }

  spawnSalad() {
    const salad = new THREE.Group();
    const bowl = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.12, 0.30), new THREE.MeshStandardMaterial({ color: 0x8b5a2b }));
    bowl.castShadow = true;
    const greens = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.08, 0.26), new THREE.MeshStandardMaterial({ color: 0x2ed573 }));
    greens.position.y = 0.08;
    salad.add(bowl, greens);

    const idx = this.saladBowls.length;
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    salad.position.set(-0.25 + col * 0.5, 0.12, -0.35 + row * 0.35);

    this.outputGroup.add(salad);
    this.saladBowls.push(salad);
  }

  collectOneSalad() {
    if (this.saladBowls.length === 0) return false;
    const s = this.saladBowls.pop();
    this.outputGroup.remove(s);
    return true;
  }

  update(delta, time = Date.now() * 0.001) {
    const canMake = this.currentTomatoes > 0 && this.currentCorn > 0 && this.currentCheese > 0 && this.saladBowls.length < this.saladCapacity;
    updateProductionMachineDetails(this, delta, time, canMake, this.saladBowls.length, this.prepTimer / this.prepDuration, this.saladCapacity);
    if (canMake) {
      this.prepTimer += delta * (this.speedMultiplier || 1.0);
      if (this.prepTimer >= this.prepDuration) {
        this.prepTimer = 0;
        this.currentTomatoes--;
        this.currentCorn--;
        this.currentCheese--;
        this.refreshInputs();
        this.spawnSalad();
        window.Sound.playPop();
      }
    } else {
      this.prepTimer = 0;
    }

    // Dynamic Billboard & 3D Voxel Icon Animation
    if (this.statusGroup) {
      const cam = (window.gameInstance && window.gameInstance.camera);
      if (cam) {
        this.statusGroup.quaternion.copy(this.group.quaternion).invert().multiply(cam.quaternion);
      }
      if (this.statusIcon) {
        this.statusIcon.rotation.y += delta * 1.5;
        this.statusIcon.position.y = 0.46 + Math.sin(time * 3.0) * 0.06;
      }
      const hasInputs = (this.currentTomatoes > 0 || this.currentCorn > 0 || this.currentCheese > 0);
      if (!hasInputs) {
        this.statusBillboardMat.map = getMachineStatusTexture('SALAD_EMPTY', 'SEBZE & PEYNİR GEREKLİ', 'MALZEME BEKLİYOR', '#27AE60');
        const bounce = 1.0 + Math.sin(time * 5.0) * 0.06;
        this.statusGroup.scale.set(bounce, bounce, bounce);
        const flash = Math.sin(time * 7.0) > 0;
        this.beaconMat.color.setHex(flash ? 0x27ae60 : 0xff7675);
        this.beaconMat.emissive.setHex(flash ? 0x27ae60 : 0xff7675);
      } else {
        this.statusBillboardMat.map = getMachineStatusTexture('SALAD_ACTIVE', 'SALATA HAZIRLANIYOR...', `DOM:${this.currentTomatoes} MIS:${this.currentCorn} PEY:${this.currentCheese}`, '#2ECC71', '#FFFFFF');
        this.statusGroup.scale.set(1, 1, 1);
        this.beaconMat.color.setHex(0x2ed573);
        this.beaconMat.emissive.setHex(0x2ed573);
      }
    }
  }
}

// --- Low-Poly Voxel Express Courier AI Entity ---
// Arrives on yellow scooter, parks outside, walks into the store via SupermarketNavGraph,
// WAITS patiently at the DeliveryDesk until the order is fulfilled by the player,
// then picks up the sealed parcel, thanks the player, returns outside to the scooter, and drives off!
class ExpressCourierAI {
  constructor(scene, rewardAmount, onDelivered) {
    this.scene = scene;
    this.rewardAmount = rewardAmount;
    this.onDelivered = onDelivered;
    this.speed = 4.8;
    this.state = 'WALKING_INTO_STORE'; // 'WALKING_INTO_STORE', 'WAITING_FOR_PARCEL', 'PICKING_UP', 'WALKING_OUT_STORE', 'DRIVING_AWAY', 'FINISHED'
    this.isFinished = false;
    this.timer = 0;
    this.navState = { path: null, pathIndex: 0, targetKey: '' };

    // Outside scooter parked location (Parking Stall 6: X = 12.5, Z = -27.5)
    this.scooterPos = new THREE.Vector3(12.5, 0, -27.5);
    this.deskPos = new THREE.Vector3(14.0, 0, -4.2);
    this.driveSpeed = 0;

    // 1. Create Courier Character (Canary Yellow Jacket, Black Helmet/Cap)
    this.char = new Character3D(scene, 0xffe600, false, false);
    this.char.group.position.set(12.5, 0, -28.0);

    // Courier Helmet / Cap with Visor
    const helmetMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.3 });
    const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.28, 0.58), helmetMat);
    helmet.position.y = 1.66;
    const visorMat = new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.1, emissive: 0x00d2d3, emissiveIntensity: 0.4 });
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.14, 0.08), visorMat);
    visor.position.set(0, 1.56, 0.30);
    this.char.model.add(helmet, visor);

    // Courier Thermal Delivery Backpack
    const bagMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.4 });
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.58, 0.32), bagMat);
    bag.position.set(0, 1.0, -0.34);
    bag.castShadow = true;
    const bagLogo = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.04), new THREE.MeshStandardMaterial({ color: 0xff4757 }));
    bagLogo.position.set(0, 1.0, -0.51);
    this.char.model.add(bag, bagLogo);

    // 2. Create Parcel held in hands (visible after pickup)
    this.heldParcel = new THREE.Group();
    const boxMat = new THREE.MeshStandardMaterial({ color: 0xc89666, roughness: 0.6 });
    const tapeMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 });
    const pBox = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.36, 0.46), boxMat);
    const pTape = new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.04, 0.14), tapeMat);
    pTape.position.y = 0.18;
    this.heldParcel.add(pBox, pTape);
    this.heldParcel.position.set(0, 0.95, 0.45);
    this.heldParcel.visible = false;
    this.char.model.add(this.heldParcel);

    // 3. Create Outside Parked Scooter
    this.scooter = this.createScooterMesh();
    this.scooter.position.copy(this.scooterPos);
    this.scene.add(this.scooter);
  }

  getSpeechInfo() {
    let cur = 0;
    let total = 1;
    const desk = window.gameInstance && window.gameInstance.deliveryDesk;
    if (desk && desk.currentOrder) {
      total = desk.currentOrder.totalItems || 1;
      cur = Object.values(desk.orderProgress || {}).reduce((a, b) => a + b, 0);
    }
    return {
      desiredType: 'COURIER',
      state: this.state,
      hasStock: true,
      itemsBought: cur,
      totalReq: total,
      isVIP: false,
      isStartled: false
    };
  }

  createScooterMesh() {
    const group = new THREE.Group();
    const scooterMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.35 });
    const blackTrimMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.8 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdfe6e9, roughness: 0.2, metalness: 0.7 });

    const footboard = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.12, 1.15), blackTrimMat);
    footboard.position.set(0, 0.22, 0);
    footboard.castShadow = true;

    const frontBody = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.58, 0.36), scooterMat);
    frontBody.position.set(0, 0.52, -0.45);
    frontBody.castShadow = true;

    const headlight = new THREE.Mesh(
      new THREE.BoxGeometry(0.20, 0.16, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x00d2d3, emissiveIntensity: 0.8 })
    );
    headlight.position.set(0, 0.65, -0.64);

    const fork = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.40, 0.08), chromeMat);
    fork.position.set(0, 0.80, -0.45);
    const bars = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.06, 0.06), chromeMat);
    bars.position.set(0, 0.98, -0.45);

    const wheelGeo = new THREE.BoxGeometry(0.14, 0.38, 0.38);
    const frontWheel = new THREE.Mesh(wheelGeo, blackTrimMat);
    frontWheel.position.set(0, 0.19, -0.48);
    frontWheel.castShadow = true;
    const rearWheel = new THREE.Mesh(wheelGeo, blackTrimMat);
    rearWheel.position.set(0, 0.19, 0.42);
    rearWheel.castShadow = true;

    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.14, 0.48), blackTrimMat);
    seat.position.set(0, 0.46, 0.05);
    seat.castShadow = true;

    const rearCargoBox = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.58, 0.54), scooterMat);
    rearCargoBox.position.set(0, 0.72, 0.45);
    rearCargoBox.castShadow = true;
    const cargoLid = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.08, 0.58), blackTrimMat);
    cargoLid.position.set(0, 1.02, 0.45);

    group.add(footboard, frontBody, headlight, fork, bars, frontWheel, rearWheel, seat, rearCargoBox, cargoLid);
    return group;
  }

  update(delta, elapsedTime) {
    if (this.isFinished) return;

    if (this.state === 'WALKING_INTO_STORE') {
      const res = moveWithDoorWaypoints(this.char.group.position, this.deskPos, this.speed, delta, this.navState);
      this.char.velocity.copy(res.velocity);
      this.char.update(delta);

      if (res.arrived || this.char.group.position.distanceTo(this.deskPos) < 0.85) {
        this.state = 'WAITING_FOR_PARCEL';
        this.char.velocity.set(0, 0, 0);
        this.char.group.rotation.y = -Math.PI / 2; // Face delivery desk
      }
    } else if (this.state === 'WAITING_FOR_PARCEL') {
      this.char.velocity.set(0, 0, 0);
      this.char.group.rotation.y = -Math.PI / 2;
      this.char.update(delta);

      // Impatient / waiting idle bobbing
      this.char.model.position.y = Math.sin(elapsedTime * 5.0) * 0.02;
      this.char.head.rotation.y = Math.sin(elapsedTime * 2.2) * 0.20;

      const desk = window.gameInstance && window.gameInstance.deliveryDesk;
      if (desk && (desk.isOrderCompleted || desk.isAwaitingCourier)) {
        this.state = 'PICKING_UP';
        this.timer = 0.8;
        this.char.velocity.set(0, 0, 0);
        window.Sound.playPop();
        if (window.gameInstance) {
          window.gameInstance.showFloatingText('PAKET ALINDI, YOLDAYIM!', this.char.group.position, '#2ECC71');
          desk.clearDeskParcels();
        }
        this.heldParcel.visible = true;
      }
    } else if (this.state === 'PICKING_UP') {
      this.timer -= delta;
      this.char.velocity.set(0, 0, 0);
      this.char.update(delta);
      if (this.timer <= 0) {
        this.state = 'WALKING_OUT_STORE';
        this.navState = { path: null, pathIndex: 0, targetKey: '' };
      }
    } else if (this.state === 'WALKING_OUT_STORE') {
      const res = moveWithDoorWaypoints(this.char.group.position, this.scooterPos, this.speed, delta, this.navState);
      this.char.velocity.copy(res.velocity);
      this.char.update(delta);

      if (res.arrived || this.char.group.position.distanceTo(this.scooterPos) < 1.2) {
        this.state = 'DRIVING_AWAY';
        this.timer = 0;
        this.driveSpeed = 4.0;
        // Mount character onto scooter
        this.char.group.position.set(0, 0.15, -0.05);
        this.scooter.add(this.char.group);
        this.heldParcel.visible = false;
        window.Sound.playCoin();
        if (window.gameInstance) {
          window.gameInstance.money += this.rewardAmount;
          window.gameInstance.updateMoneyUI();
          if (window.gameInstance.particleFX) {
            window.gameInstance.particleFX.emitBurst(this.scooter.position, 0xffe600, 20);
            window.gameInstance.particleFX.emitBurst(this.scooter.position, 0x2ecc71, 14);
          }
          window.gameInstance.showFloatingText(`EXPRESS KURYE YOLA ÇIKTI! +$${this.rewardAmount}`, this.scooter.position, '#FFE600');
        }
      }
    } else if (this.state === 'DRIVING_AWAY') {
      this.driveSpeed += delta * 12.0; // Accelerate smoothly
      this.scooter.position.z -= delta * 6.0; // Pull onto road
      if (this.scooter.position.z < -34.0) {
        this.scooter.position.z = -34.0;
        this.scooter.position.x += delta * this.driveSpeed; // Drive east along the highway!
        this.scooter.rotation.y = -Math.PI / 2;
      }
      // Vibrate scooter
      this.scooter.position.y = 0.02 + Math.sin(elapsedTime * 24.0) * 0.015;

      if (this.scooter.position.x > 50.0) {
        this.isFinished = true;
        this.scene.remove(this.scooter);
        if (this.onDelivered) this.onDelivered();
      }
    }
  }

  destroy() {
    this.isFinished = true;
    if (this.scooter && this.scooter.parent) {
      this.scene.remove(this.scooter);
    }
    if (this.char && this.char.group && this.char.group.parent) {
      this.char.group.parent.remove(this.char.group);
    }
  }
}

// --- Courier Delivery Order Dispatch Desk ---
// Generates lucrative timed customer delivery packages with Dynamic Parcels and External Courier Pickup
class DeliveryDesk {
  constructor(scene, x, z, onOrderComplete) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.onOrderComplete = onOrderComplete;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.currentOrder = null;
    this.orderProgress = {};
    this.cooldown = 0;
    this.isAwaitingCourier = false;
    this.triggerPadPos = new THREE.Vector3(x, 0, z + 0.9);

    this.parcelBoxes = [];
    this.padMesh = null;
    this.dispatchLamp = null;

    this.initMesh();
    this.scene.add(this.group);
    this.generateNewOrder();
  }

  getAvailableItemPool() {
    const features = (window.gameInstance && window.gameInstance.unlockedFeatures) || {};
    return window.GameMechanics.getAvailableItemPool(features);
  }

  initMesh() {
    // 1. Heavy Wooden Dispatch Table (X: -0.2, Z: 0)
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.6 });
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.4), woodMat);
    tableTop.position.set(-0.2, 0.9, 0);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    this.group.add(tableTop);

    // Legs and Counter Skirt
    const tableBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.84, 1.2), new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.8 }));
    tableBase.position.set(-0.2, 0.42, 0);
    tableBase.castShadow = true;
    tableBase.receiveShadow = true;
    this.group.add(tableBase);

    // 2. Dispatch Terminal / Monitor & Clipboard on Desk
    const monBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.4), new THREE.MeshStandardMaterial({ color: 0x222222 }));
    monBase.position.set(-0.8, 0.98, -0.2);
    const monScreen = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.36, 0.08), new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.2 }));
    monScreen.position.set(-0.8, 1.20, -0.25);
    monScreen.castShadow = true;
    this.group.add(monBase, monScreen);

    // Dispatch Lamp (Blinks Green when ready, Yellow when waiting for courier, Red during Cooldown)
    this.dispatchLamp = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.12, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x2ecc71, emissive: 0x2ecc71, emissiveIntensity: 0.8 })
    );
    this.dispatchLamp.position.set(-0.8, 1.44, -0.25);
    this.group.add(this.dispatchLamp);

    // Order Clipboard & Service Bell
    const clip = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 0.45), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }));
    clip.position.set(-0.3, 0.98, 0.2);
    const bell = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 0.14), new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.2, metalness: 0.7 }));
    bell.position.set(-0.3, 1.04, -0.2);
    this.group.add(clip, bell);

    // 3. Dynamic Parcel Stack on Desk (Right half of table)
    const boxGeo = new THREE.BoxGeometry(0.42, 0.32, 0.42);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0xc89666, roughness: 0.6 });
    const tapeMat = new THREE.MeshStandardMaterial({ color: 0xff4757, roughness: 0.3 });

    const parcelOffsets = [
      { x: 0.45, y: 1.12, z: -0.25 },
      { x: 0.45, y: 1.12, z: 0.25 },
      { x: 0.0, y: 1.12, z: 0.0 },
      { x: 0.45, y: 1.44, z: 0.0 }
    ];

    this.parcelBoxes = [];
    parcelOffsets.forEach(pos => {
      const pGrp = new THREE.Group();
      pGrp.position.set(pos.x, pos.y, pos.z);
      const bMesh = new THREE.Mesh(boxGeo, boxMat);
      bMesh.castShadow = true;
      const tape = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.04, 0.12), tapeMat);
      tape.position.y = 0.16;
      pGrp.add(bMesh, tape);
      pGrp.visible = false;
      this.group.add(pGrp);
      this.parcelBoxes.push(pGrp);
    });

    // 4. Interactive Ground Trigger Pad (Vibrant Acid Yellow with Black Border Trim)
    const padGrp = new THREE.Group();
    padGrp.position.set(0, 0.02, 0.9);

    this.padMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.03, 1.4),
      new THREE.MeshStandardMaterial({
        color: 0xffe600,
        emissive: 0xffe600,
        emissiveIntensity: 0.35,
        roughness: 0.2
      })
    );
    this.padMesh.receiveShadow = true;

    // Corner Guide Markers (Neo-Brutalist Sharp Corner Accents)
    const cornerMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const c1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.06), cornerMat);
    c1.position.set(0.78, 0.01, 0.65);
    const c2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.06), cornerMat);
    c2.position.set(-0.78, 0.01, 0.65);
    const c3 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.06), cornerMat);
    c3.position.set(0.78, 0.01, -0.65);
    const c4 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.06), cornerMat);
    c4.position.set(-0.78, 0.01, -0.65);

    padGrp.add(this.padMesh, c1, c2, c3, c4);
    this.group.add(padGrp);
  }

  generateNewOrder() {
    this.isAwaitingCourier = false;
    this.isOrderCompleted = false;
    const pool = this.getAvailableItemPool();
    const distinctTypesCount = (pool.length > 1 && Math.random() > 0.4) ? 2 : 1;

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const reqs = {};
    let totalItems = 0;
    let totalBaseValue = 0;

    for (let i = 0; i < distinctTypesCount; i++) {
      const type = shuffled[i];
      const qty = (type === 'TOMATO') ? (1 + Math.floor(Math.random() * 3)) : (1 + Math.floor(Math.random() * 2));
      reqs[type] = qty;
      totalItems += qty;
      const unitPrice = (ITEM_TYPES[type] && ITEM_TYPES[type].price) ? ITEM_TYPES[type].price : 25;
      totalBaseValue += unitPrice * qty;
    }

    const rewardCash = Math.round(totalBaseValue * 1.8 + 75);
    this.currentOrder = {
      reqs,
      totalItems,
      rewardCash
    };
    this.orderProgress = {};
    this.updateParcelVisuals();
    if (this.dispatchLamp) {
      this.dispatchLamp.material.color.setHex(0xffe600);
      this.dispatchLamp.material.emissive.setHex(0xffe600);
    }
    // Dispatch express courier to wait at desk for this order!
    if (window.gameInstance && !window.gameInstance.activeCourier) {
      window.gameInstance.spawnExpressCourier(rewardCash);
    }
  }

  updateParcelVisuals() {
    let totalDelivered = 0;
    for (const count of Object.values(this.orderProgress)) {
      totalDelivered += count;
    }
    const maxBoxes = this.parcelBoxes.length;
    for (let i = 0; i < maxBoxes; i++) {
      this.parcelBoxes[i].visible = (i < totalDelivered);
    }
  }

  clearDeskParcels() {
    for (let i = 0; i < this.parcelBoxes.length; i++) {
      this.parcelBoxes[i].visible = false;
    }
  }

  needsItem(type) {
    if (this.cooldown > 0 || this.isOrderCompleted || !this.currentOrder || !this.currentOrder.reqs[type]) return false;
    const required = this.currentOrder.reqs[type];
    const current = this.orderProgress[type] || 0;
    return current < required;
  }

  depositItem(type) {
    if (!this.needsItem(type)) return false;
    this.orderProgress[type] = (this.orderProgress[type] || 0) + 1;
    this.updateParcelVisuals();
    this.checkCompletion();
    return true;
  }

  checkCompletion() {
    if (!this.currentOrder || this.isOrderCompleted) return;
    let complete = true;
    for (const [type, reqQty] of Object.entries(this.currentOrder.reqs)) {
      if ((this.orderProgress[type] || 0) < reqQty) {
        complete = false;
        break;
      }
    }
    if (complete) {
      this.isOrderCompleted = true;
      this.isAwaitingCourier = true;
      const reward = this.currentOrder.rewardCash;
      if (this.dispatchLamp) {
        this.dispatchLamp.material.color.setHex(0x2ecc71);
        this.dispatchLamp.material.emissive.setHex(0x2ecc71);
      }
      if (window.gameInstance) {
        window.gameInstance.showFloatingText('SİPARİŞ HAZIR! KURYE ALIYOR!', this.group.position, '#2ECC71');
        if (!window.gameInstance.activeCourier) {
          window.gameInstance.spawnExpressCourier(reward);
        }
      }
    }
  }

  onCourierFinished() {
    this.isAwaitingCourier = false;
    this.isOrderCompleted = false;
    this.cooldown = 8.0;
    this.currentOrder = null;
    this.orderProgress = {};
    this.clearDeskParcels();
    if (this.dispatchLamp) {
      this.dispatchLamp.material.color.setHex(0xff5252);
      this.dispatchLamp.material.emissive.setHex(0xff5252);
    }
  }

  get hasActiveOrder() {
    return this.currentOrder !== null && this.cooldown <= 0 && !this.isAwaitingCourier;
  }

  get activeOrder() {
    if (!this.currentOrder || !this.currentOrder.reqs) return null;
    return {
      reqs: this.currentOrder.reqs,
      progress: this.orderProgress,
      totalItems: this.currentOrder.totalItems,
      reward: this.currentOrder.rewardCash,
      isAwaitingCourier: this.isAwaitingCourier
    };
  }

  claimReward() {
    return this.currentOrder ? this.currentOrder.rewardCash : 0;
  }

  update(delta, elapsedTime) {
    if (this.cooldown > 0) {
      this.cooldown -= delta;
      if (this.cooldown <= 0) {
        this.cooldown = 0;
        this.generateNewOrder();
      }
    }

    // Interactive Pulse on Trigger Pad
    if (this.padMesh) {
      const pulse = 1.0 + 0.04 * Math.sin(elapsedTime * 4.0);
      this.padMesh.scale.set(pulse, 1.0, pulse);
    }
  }
}

// --- VIP Gourmet Customer AI Entity ---
// Has golden top crown, royal purple cape, arrives in luxury gold/purple VIP car, purchases luxury items at 2.5X value + $150 tip!
class VIPCustomerAI extends CustomerAI {
  constructor(scene, spawnPos, shelves, checkout, transportMode = 'VIP', parkingSpot = null, vehicle = null) {
    super(scene, spawnPos, shelves, checkout, 'VIP', transportMode, parkingSpot, vehicle);
    this.isVIP = true;
    this.targetItemsCount = 3;
    this.sparkleCooldown = 0;

    // Golden Sparkling Crown
    const crownMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.1, metalness: 0.85 });
    const crown = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.28, 0.52), crownMat);
    crown.position.y = 1.82;
    const spike1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.12), crownMat);
    spike1.position.set(-0.18, 0.18, 0);
    const spike2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.12), crownMat);
    spike2.position.set(0, 0.21, 0);
    const spike3 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.12), crownMat);
    spike3.position.set(0.18, 0.18, 0);
    crown.add(spike1, spike2, spike3);

    // Royal Purple Cape
    const capeMat = new THREE.MeshStandardMaterial({ color: 0x6c5ce7, roughness: 0.5 });
    const cape = new THREE.Mesh(new THREE.BoxGeometry(0.64, 1.10, 0.08), capeMat);
    cape.position.set(0, 0.70, -0.32);
    cape.rotation.x = -0.12;

    this.char.model.add(crown, cape);

    // Re-initialize shopping list with VIP pool filter
    this.initShoppingList();
    this.pickTargetShelf(false);
  }

  pickTargetShelf(excludeCurrent = false) {
    return super.pickTargetShelf(excludeCurrent);
  }

  getSpeechInfo() {
    const info = super.getSpeechInfo();
    info.isVIP = true;
    return info;
  }

  update(delta, allCustomers = []) {
    super.update(delta, allCustomers);

    // Shimmering Golden Particle Trail
    this.sparkleCooldown -= delta;
    if (this.sparkleCooldown <= 0 && this.char.speed > 0.5) {
      if (window.gameInstance && window.gameInstance.particleFX) {
        window.gameInstance.particleFX.spawnGoldenSparkles(this.char.group.position, 2);
      }
      this.sparkleCooldown = 0.35;
    }
  }

  processPayment() {
    if (this.state !== 'IN_CHECKOUT_LINE' && this.state !== 'PROCESSING_PAYMENT') return;
    let totalCash = 0;

    while (this.char.cartItems.length > 0) {
      const type = this.char.removeItemFromCart();
      const basePrice = (ITEM_TYPES[type] || ITEM_TYPES.TOMATO).price;
      const price = window.gameInstance && window.gameInstance.getSalePrice
        ? window.gameInstance.getSalePrice(type, basePrice)
        : basePrice;
      totalCash += price;
      if (window.gameInstance && window.gameInstance.recordProgressEvent) {
        window.gameInstance.recordProgressEvent({ type: 'sale', itemType: type, amount: 1 });
      }
      if (window.gameInstance && window.gameInstance.recordDayEvent) {
        window.gameInstance.recordDayEvent({ type: 'sale', itemType: type, amount: 1, revenue: Math.round(price * 2.5) });
      }
    }
    while (this.char.stack.length > 0) {
      const type = this.char.removeItem();
      const basePrice = (ITEM_TYPES[type] || ITEM_TYPES.TOMATO).price;
      const price = window.gameInstance && window.gameInstance.getSalePrice
        ? window.gameInstance.getSalePrice(type, basePrice)
        : basePrice;
      totalCash += price;
      if (window.gameInstance && window.gameInstance.recordProgressEvent) {
        window.gameInstance.recordProgressEvent({ type: 'sale', itemType: type, amount: 1 });
      }
      if (window.gameInstance && window.gameInstance.recordDayEvent) {
        window.gameInstance.recordDayEvent({ type: 'sale', itemType: type, amount: 1, revenue: Math.round(price * 2.5) });
      }
    }

    if (window.gameInstance) {
      window.gameInstance.registerCheckoutCombo();
      totalCash = window.GameMechanics.calculateCheckoutTotal({
        baseTotal: totalCash,
        vipMultiplier: 2.5,
        vipTip: 150,
        comboMultiplier: window.gameInstance.comboMultiplier,
        isRushHour: window.gameInstance.isRushHour
      });
    } else {
      totalCash = window.GameMechanics.calculateCheckoutTotal({
        baseTotal: totalCash,
        vipMultiplier: 2.5,
        vipTip: 150
      });
    }
    this.checkout.addCash(totalCash);
    window.Sound.playCashRegister();
    if (window.gameInstance && window.gameInstance.particleFX) {
      window.gameInstance.particleFX.spawnGoldenSparkles(this.char.group.position, 8);
      window.gameInstance.particleFX.spawnCashExplosion(this.char.group.position, 10);
    }
    this.state = 'LEAVING';
  }
}

// --- Shoplifter / Sneaky Thief AI Event Entity (Slapstick Cartoon Edition) ---
// Steals items from shelf and tries to escape; player intercepts with a wooden bat swat,
// causing a comic POW/ÇAT burst, dizzy orbiting stars, stolen item drops, and a panicked sprint escape!
class ShoplifterAI {
  constructor(scene, spawnPos, shelves, onCaught) {
    this.scene = scene;
    this.shelves = shelves;
    this.onCaught = onCaught;
    this.isCaught = false;
    this.isFinished = false;
    this.isStunned = false;
    this.stunTimer = 0;
    this.comicBurstTimer = 0;
    this.shockwaveTimer = 0;
    this.smokeCooldown = 0;

    this.char = new Character3D(scene, 0x222222, false, false);
    this.char.group.position.copy(spawnPos);

    // Thief Red Bandit Eye Mask
    const maskMat = new THREE.MeshBasicMaterial({ color: 0xff5252 });
    const mask = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.16, 0.54), maskMat);
    mask.position.y = 1.48;
    this.char.model.add(mask);

    // 1. 3D Low-Poly Voxel Orbiting Dizzy Stars Assembly (Slapstick Dizziness)
    this.dizzyStarsGroup = new THREE.Group();
    this.dizzyStarsGroup.position.set(0, 2.05, 0);
    this.stars = [];

    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffe600,
      emissive: 0xffa502,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    for (let i = 0; i < 3; i++) {
      const star = new THREE.Group();
      // Cross-overlapped boxes forming a chunky 3D voxel star
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.06), starMat);
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.06), starMat);
      b2.rotation.z = Math.PI / 4;
      star.add(b1, b2);
      this.dizzyStarsGroup.add(star);
      this.stars.push(star);
    }
    this.dizzyStarsGroup.visible = false;
    this.char.model.add(this.dizzyStarsGroup);

    // 2. Procedural Comic '💥 ÇAT!' Starburst Billboard
    const burstMat = new THREE.MeshBasicMaterial({
      map: getComicBurstTexture('💥 ÇAT!'),
      transparent: true,
      side: THREE.DoubleSide
    });
    this.comicBurstBillboard = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 1.8), burstMat);
    this.comicBurstBillboard.position.set(0, 1.45, 0);
    this.comicBurstBillboard.visible = false;
    this.char.group.add(this.comicBurstBillboard);

    // 3. Expanding Yellow Slapstick Shockwave Ring
    const shockMat = new THREE.MeshBasicMaterial({
      color: 0xffe600,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    this.shockwaveRing = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.42, 16), shockMat);
    this.shockwaveRing.rotation.x = -Math.PI / 2;
    this.shockwaveRing.position.y = 0.08;
    this.shockwaveRing.visible = false;
    this.char.group.add(this.shockwaveRing);

    this.state = 'SNEAKING_TO_SHELF';
    this.targetShelf = shelves.length > 0 ? shelves[Math.floor(Math.random() * shelves.length)] : null;
    this.navState = { path: null, pathIndex: 0, targetKey: '' };
  }

  getSpeechInfo() {
    return {
      desiredType: 'THIEF',
      state: this.state,
      hasStock: true,
      itemsBought: this.char.stack.length,
      isVIP: false,
      isStartled: this.state === 'FLEEING_PANIC' || this.state === 'STUNNED'
    };
  }

  // Triggered when the player delivers a slapstick bat swat
  onHitByPlayer(player) {
    if (this.isStunned || this.state === 'FLEEING_PANIC' || this.isFinished) return 0;

    this.state = 'STUNNED';
    this.isStunned = true;
    this.isCaught = true; // Claim bounty / update quest HUD immediately
    this.stunTimer = 1.35;
    this.comicBurstTimer = 0.65;
    this.shockwaveTimer = 0.50;

    // Trigger visual VFX
    this.comicBurstBillboard.visible = true;
    this.comicBurstBillboard.scale.set(0.1, 0.1, 0.1);
    this.shockwaveRing.visible = true;
    this.shockwaveRing.scale.set(0.2, 0.2, 0.2);
    this.dizzyStarsGroup.visible = true;

    // Drop all carried stolen items back onto floor / notify player
    if (this.char.stack.length > 0) {
      while (this.char.stack.length > 0) {
        const itemType = this.char.removeItem();
        if (window.gameInstance) {
          window.gameInstance.showFloatingText(`${getItemDisplayName(itemType)} KURTARILDI!`, this.char.group.position, '#2ECC71');
        }
      }
    }

    // Spawn cash explosion and comic hit particles
    if (window.gameInstance && window.gameInstance.particleFX) {
      window.gameInstance.particleFX.spawnCashExplosion(this.char.group.position, 12);
      window.gameInstance.particleFX.spawnGoldenSparkles(this.char.group.position, 8);
      window.gameInstance.particleFX.spawnDustPuff(this.char.group.position, 6, 0xffe600);
    }

    return 250; // $250 Bounty reward
  }

  catchThief() {
    return this.onHitByPlayer();
  }

  update(delta, allCustomers = []) {
    if (this.isFinished) return;
    const pos = this.char.group.position;

    // 1. Comic Burst Billboard Camera Alignment & Elastic Spring Scaling
    if (this.comicBurstTimer > 0) {
      this.comicBurstTimer -= delta;
      if (window.gameInstance && window.gameInstance.camera) {
        this.comicBurstBillboard.quaternion.copy(window.gameInstance.camera.quaternion);
      }
      const progress = 1.0 - Math.max(0, this.comicBurstTimer / 0.65);
      const scale = Math.sin(progress * Math.PI) * 1.6 + 0.2;
      this.comicBurstBillboard.scale.set(scale, scale, scale);

      if (this.comicBurstTimer <= 0) {
        this.comicBurstBillboard.visible = false;
      }
    }

    // 2. Expanding Shockwave Ring Animation
    if (this.shockwaveTimer > 0) {
      this.shockwaveTimer -= delta;
      const sProg = 1.0 - Math.max(0, this.shockwaveTimer / 0.50);
      const rScale = 0.2 + sProg * 2.8;
      this.shockwaveRing.scale.set(rScale, rScale, rScale);
      this.shockwaveRing.material.opacity = Math.max(0, 1.0 - sProg);

      if (this.shockwaveTimer <= 0) {
        this.shockwaveRing.visible = false;
      }
    }

    // 3. Orbiting Dizzy Stars Animation
    if (this.dizzyStarsGroup.visible) {
      const time = Date.now() * 0.001;
      this.stars.forEach((star, idx) => {
        const angle = time * 7.0 + (idx * Math.PI * 2) / 3;
        star.position.set(
          Math.cos(angle) * 0.44,
          0.06 + Math.sin(time * 9.0 + idx) * 0.08,
          Math.sin(angle) * 0.44
        );
        star.rotation.y += delta * 5.0;
        star.rotation.x += delta * 3.0;
      });
    }

    // 4. State Machine Updates
    if (this.state === 'STUNNED') {
      this.stunTimer -= delta;
      this.char.velocity.set(0, 0, 0);

      // Comedic wobble daze animation
      const t = Date.now() * 0.001;
      this.char.model.rotation.z = Math.sin(t * 26.0) * 0.24;
      this.char.model.rotation.x = Math.sin(t * 18.0) * 0.14;
      this.char.head.rotation.y = Math.sin(t * 32.0) * 0.35;

      if (this.stunTimer <= 0) {
        this.dizzyStarsGroup.visible = false;
        this.state = 'FLEEING_PANIC';
        this.isStunned = false;
        if (window.gameInstance) {
          window.gameInstance.showFloatingText('PANİK KAÇIŞ!', pos, '#FF4757');
        }
      }
    } else if (this.state === 'FLEEING_PANIC') {
      // 2x Fast Panicked Sprint towards exit doors
      const exitTarget = new THREE.Vector3(0.0, 0, -27.0);
      const res = moveWithDoorWaypoints(pos, exitTarget, 9.2, delta, this.navState);
      this.char.velocity.copy(res.velocity);

      // Forward leaning panic sprint posture
      this.char.model.rotation.x = 0.32;

      // Cartoon dust trail
      this.smokeCooldown -= delta;
      if (this.smokeCooldown <= 0) {
        if (window.gameInstance && window.gameInstance.particleFX) {
          window.gameInstance.particleFX.spawnDustPuff(pos, 2, 0xffe600);
        }
        this.smokeCooldown = 0.10;
      }

      if (res.velocity.lengthSq() > 0.01) {
        this.char.group.rotation.y = Math.atan2(res.velocity.x, res.velocity.z);
      }

      // Startle nearby customers
      if (allCustomers) {
        for (const other of allCustomers) {
          if (other !== this && other.triggerStartle && other.char) {
            if (pos.distanceTo(other.char.group.position) < 2.8) {
              other.triggerStartle();
            }
          }
        }
      }

      // Despawn safely at market exit
      if (pos.distanceTo(exitTarget) <= 1.4 || pos.z <= -26.0) {
        if (window.gameInstance && window.gameInstance.particleFX) {
          window.gameInstance.particleFX.spawnDustPuff(pos, 10, 0xffffff);
        }
        this.isFinished = true;
        this.char.destroy();
        if (this.onCaught) this.onCaught(this);
      }
    } else if (this.state === 'SNEAKING_TO_SHELF') {
      if (!this.targetShelf) {
        this.state = 'FLEEING';
        return;
      }
      const target = new THREE.Vector3(this.targetShelf.x, 0, this.targetShelf.z + 1.2);
      const res = moveWithDoorWaypoints(pos, target, 4.8, delta, this.navState);
      this.char.velocity.copy(res.velocity);

      if (res.velocity.lengthSq() > 0.01) {
        this.char.group.rotation.y = Math.atan2(res.velocity.x, res.velocity.z);
      }

      if (pos.distanceTo(target) <= 1.0) {
        if (this.targetShelf.hasItems()) {
          const item = this.targetShelf.takeItem();
          if (item) this.char.addItem(item);
        }
        this.state = 'FLEEING';
      }
    } else if (this.state === 'FLEEING') {
      const exitTarget = new THREE.Vector3(0.0, 0, -27.0);
      const res = moveWithDoorWaypoints(pos, exitTarget, 6.2, delta, this.navState);
      this.char.velocity.copy(res.velocity);

      this.smokeCooldown -= delta;
      if (this.smokeCooldown <= 0) {
        if (window.gameInstance && window.gameInstance.particleFX) {
          window.gameInstance.particleFX.spawnSmokeTrail(pos);
        }
        this.smokeCooldown = 0.15;
      }

      if (res.velocity.lengthSq() > 0.01) {
        this.char.group.rotation.y = Math.atan2(res.velocity.x, res.velocity.z);
      }

      if (pos.distanceTo(exitTarget) <= 1.4 || pos.z <= -26.0) {
        this.isFinished = true;
        this.char.destroy();
      }
    }

    this.char.update(delta);
  }
}

// --- Voxel Toast Machine (Faz 2: Tazelik Dönüşüm İstasyonu) ---
class ToastMachine {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.breadCapacity = 6;
    this.currentBread = 0;
    this.toastCapacity = 6;
    this.toasts = [];
    this.toastTimer = 0;
    this.toastDuration = 2.0;

    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.inputPadPos = new THREE.Vector3(x - 1.2, 0, z);
    this.outputPadPos = new THREE.Vector3(x + 1.2, 0, z);

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x576574, roughness: 0.6 });
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 1.0), tableMat);
    tableTop.position.y = 0.85;
    const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.85, 0.1), tableMat);
    leg1.position.set(-0.55, 0.425, -0.4);
    const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.85, 0.1), tableMat);
    leg2.position.set(0.55, 0.425, -0.4);
    const leg3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.85, 0.1), tableMat);
    leg3.position.set(-0.55, 0.425, 0.4);
    const leg4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.85, 0.1), tableMat);
    leg4.position.set(0.55, 0.425, 0.4);
    this.group.add(tableTop, leg1, leg2, leg3, leg4);

    const toasterMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.2, metalness: 0.5 });
    const toaster = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.5), toasterMat);
    toaster.position.set(0, 1.15, 0);
    toaster.castShadow = true;

    const slotMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const slot1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.32), slotMat);
    slot1.position.set(-0.12, 1.41, 0);
    const slot2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.32), slotMat);
    slot2.position.set(0.12, 1.41, 0);

    const redLever = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), new THREE.MeshBasicMaterial({ color: 0xff4757 }));
    redLever.position.set(0.38, 1.25, 0);

    this.group.add(toaster, slot1, slot2, redLever);

    const inPad = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 1.0), new THREE.MeshStandardMaterial({ color: 0xd35400 }));
    inPad.position.set(-1.2, 0.02, 0);
    const outPad = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 1.0), new THREE.MeshStandardMaterial({ color: 0xcd853f }));
    outPad.position.set(1.2, 0.02, 0);
    this.group.add(inPad, outPad);

    this.outputGroup = new THREE.Group();
    this.outputGroup.position.set(1.2, 0.04, 0);
    this.group.add(this.outputGroup);
  }

  depositBread() {
    if (this.currentBread >= this.breadCapacity) return false;
    this.currentBread++;
    return true;
  }

  collectOneToast() {
    if (this.toasts.length === 0) return null;
    this.toasts.pop();
    if (this.outputGroup.children.length > 0) {
      this.outputGroup.remove(this.outputGroup.children[this.outputGroup.children.length - 1]);
    }
    return 'TOAST';
  }

  update(delta) {
    if (this.currentBread > 0 && this.toasts.length < this.toastCapacity) {
      this.toastTimer += delta;
      if (this.toastTimer >= this.toastDuration) {
        this.toastTimer = 0;
        this.currentBread--;
        this.toasts.push('TOAST');

        const tMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.24, 0.20, 0.08),
          new THREE.MeshStandardMaterial({ color: 0xcd853f })
        );
        tMesh.position.set(0, 0.1 + (this.toasts.length - 1) * 0.1, 0);
        this.outputGroup.add(tMesh);
      }
    }
  }
}

// --- Voxel Jam Cauldron (Faz 2: Reçel Kazanı) ---
class JamCauldron {
  constructor(scene, x, z) {
    this.scene = scene;
    this.x = x;
    this.z = z;
    this.strawberryCapacity = 6;
    this.currentStrawberry = 0;
    this.jamCapacity = 6;
    this.jams = [];
    this.jamTimer = 0;
    this.jamDuration = 2.2;

    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    this.inputPadPos = new THREE.Vector3(x - 1.2, 0, z);
    this.outputPadPos = new THREE.Vector3(x + 1.2, 0, z);

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    const brickMat = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.8 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 1.2), brickMat);
    base.position.y = 0.25;
    this.group.add(base);

    const copperMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.35, metalness: 0.4 });
    const cauldron = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.65, 0.95), copperMat);
    cauldron.position.y = 0.8;
    this.group.add(cauldron);

    const jamLiquid = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.1, 0.85),
      new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.2 })
    );
    jamLiquid.position.y = 1.05;
    this.group.add(jamLiquid);

    const inPad = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 1.0), new THREE.MeshStandardMaterial({ color: 0xff2a7a }));
    inPad.position.set(-1.2, 0.02, 0);
    const outPad = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 1.0), new THREE.MeshStandardMaterial({ color: 0xd63031 }));
    outPad.position.set(1.2, 0.02, 0);
    this.group.add(inPad, outPad);

    this.outputGroup = new THREE.Group();
    this.outputGroup.position.set(1.2, 0.04, 0);
    this.group.add(this.outputGroup);
  }

  depositStrawberry() {
    if (this.currentStrawberry >= this.strawberryCapacity) return false;
    this.currentStrawberry++;
    return true;
  }

  collectOneJam() {
    if (this.jams.length === 0) return null;
    this.jams.pop();
    if (this.outputGroup.children.length > 0) {
      this.outputGroup.remove(this.outputGroup.children[this.outputGroup.children.length - 1]);
    }
    return 'STRAWBERRY_JAM';
  }

  update(delta) {
    if (this.currentStrawberry > 0 && this.jams.length < this.jamCapacity) {
      this.jamTimer += delta;
      if (this.jamTimer >= this.jamDuration) {
        this.jamTimer = 0;
        this.currentStrawberry--;
        this.jams.push('STRAWBERRY_JAM');

        const jMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.22, 0.22, 0.22),
          new THREE.MeshStandardMaterial({ color: 0xd63031 })
        );
        jMesh.position.set(0, 0.11 + (this.jams.length - 1) * 0.12, 0);
        this.outputGroup.add(jMesh);
      }
    }
  }
}

// --- FAZ 5: MAHALLE YAPILARI (VOXEL NEIGHBORHOOD BUILDINGS) ---
class VoxelBusStop {
  constructor(scene, x, z) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    const roofMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.3 });
    const postMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.7 });
    const benchMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.6 });

    const post1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.6, 0.15), postMat);
    post1.position.set(-1.4, 1.3, -0.7);
    const post2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.6, 0.15), postMat);
    post2.position.set(1.4, 1.3, -0.7);
    const post3 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.6, 0.15), postMat);
    post3.position.set(-1.4, 1.3, 0.7);
    const post4 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.6, 0.15), postMat);
    post4.position.set(1.4, 1.3, 0.7);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.18, 1.8), roofMat);
    roof.position.y = 2.65;

    const backGlass = new THREE.Mesh(
      new THREE.BoxGeometry(2.9, 2.2, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x74b9ff, transparent: true, opacity: 0.5 })
    );
    backGlass.position.set(0, 1.2, -0.7);

    const bench = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.14, 0.45), benchMat);
    bench.position.set(0, 0.45, -0.35);

    const signPost = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.8, 0.1), postMat);
    signPost.position.set(1.8, 1.4, 0.8);
    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.65, 0.08), roofMat);
    signBoard.position.set(1.8, 2.6, 0.8);

    this.group.add(post1, post2, post3, post4, roof, backGlass, bench, signPost, signBoard);
    this.scene.add(this.group);
  }
}

class VoxelPark {
  constructor(scene, x, z) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    const grassMat = new THREE.MeshStandardMaterial({ color: 0x2ed573, roughness: 0.85 });
    const lawn = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.08, 4.0), grassMat);
    lawn.position.y = 0.04;

    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x795548, roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x10ac84, roughness: 0.6 });
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.2, 0.4), trunkMat);
    trunk.position.set(-1.2, 1.1, -0.8);

    const foliage1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 1.6), leafMat);
    foliage1.position.set(-1.2, 2.5, -0.8);
    const foliage2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 1.1), leafMat);
    foliage2.position.set(-1.2, 3.2, -0.8);

    const pineTrunk = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.8, 0.3), trunkMat);
    pineTrunk.position.set(1.5, 0.9, 0.8);
    const pine1 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 1.4), leafMat);
    pine1.position.set(1.5, 1.8, 0.8);
    const pine2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.9), leafMat);
    pine2.position.set(1.5, 2.3, 0.8);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0xd35400, roughness: 0.7 });
    const bench = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.16, 0.45), woodMat);
    bench.position.set(0.4, 0.4, -0.6);

    const flowerRed = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({ color: 0xff4757 }));
    flowerRed.position.set(-0.6, 0.15, 1.0);
    const flowerYellow = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({ color: 0xffe600 }));
    flowerYellow.position.set(-0.2, 0.15, 1.1);

    this.group.add(lawn, trunk, foliage1, foliage2, pineTrunk, pine1, pine2, bench, flowerRed, flowerYellow);
    this.scene.add(this.group);
  }
}

class VoxelCafe {
  constructor(scene, x, z) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    const deckMat = new THREE.MeshStandardMaterial({ color: 0xa0522d, roughness: 0.7 });
    const deck = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.1, 3.6), deckMat);
    deck.position.y = 0.05;

    const awning = new THREE.Group();
    const redMat = new THREE.MeshStandardMaterial({ color: 0xff5252, roughness: 0.4 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.4 });
    for (let i = 0; i < 6; i++) {
      const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.12, 1.8),
        i % 2 === 0 ? redMat : whiteMat
      );
      stripe.position.set(-1.625 + i * 0.65, 2.7, 0);
      stripe.rotation.x = 0.15;
      awning.add(stripe);
    }

    const postMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.6 });
    const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.7, 0.12), postMat);
    p1.position.set(-1.8, 1.35, 0.8);
    const p2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.7, 0.12), postMat);
    p2.position.set(1.8, 1.35, 0.8);

    const tableMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.3 });
    const table = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 1.0), tableMat);
    table.position.set(0, 0.75, 0);
    const tLeg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.75, 0.14), postMat);
    tLeg.position.set(0, 0.375, 0);

    const stool1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.35), redMat);
    stool1.position.set(-0.8, 0.225, 0);
    const stool2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.35), redMat);
    stool2.position.set(0.8, 0.225, 0);

    this.group.add(deck, awning, p1, p2, table, tLeg, stool1, stool2);
    this.scene.add(this.group);
  }
}

class VoxelSchool {
  constructor(scene, x, z) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    const brickMat = new THREE.MeshStandardMaterial({ color: 0xb71540, roughness: 0.7 });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0xfffdf5, roughness: 0.3 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x0c2461, roughness: 0.5 });
    const bellMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.2, metalness: 0.7 });

    const facade = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.2, 1.2), brickMat);
    facade.position.set(0, 1.6, 0);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.25, 1.5), roofMat);
    roof.position.set(0, 3.3, 0);

    const tower = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.5, 1.0), brickMat);
    tower.position.set(0, 4.0, 0);
    const towerRoof = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 1.2), roofMat);
    towerRoof.position.set(0, 4.9, 0);

    const bell = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 0.35), bellMat);
    bell.position.set(0, 4.1, 0.55);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.8, 0.1), trimMat);
    door.position.set(0, 0.9, 0.61);

    this.group.add(facade, roof, tower, towerRoof, bell, door);
    this.scene.add(this.group);
  }
}

class VoxelGym {
  constructor(scene, x, z) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(x, 0, z);

    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e272e, roughness: 0.6 });
    const cyanMat = new THREE.MeshStandardMaterial({ color: 0x00d2d3, roughness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x74b9ff, transparent: true, opacity: 0.6 });

    const mainBody = new THREE.Mesh(new THREE.BoxGeometry(4.6, 3.0, 1.4), darkMat);
    mainBody.position.set(0, 1.5, 0);

    const topBand = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.45, 1.5), cyanMat);
    topBand.position.set(0, 3.1, 0);

    const glass = new THREE.Mesh(new THREE.BoxGeometry(3.8, 1.8, 0.1), glassMat);
    glass.position.set(0, 1.1, 0.72);

    const barMat = new THREE.MeshStandardMaterial({ color: 0xffe600, roughness: 0.2 });
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.08), barMat);
    bar.position.set(0, 2.3, 0.75);
    const weightL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.45), darkMat);
    weightL.position.set(-0.65, 2.3, 0.75);
    const weightR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.45), darkMat);
    weightR.position.set(0.65, 2.3, 0.75);

    this.group.add(mainBody, topBand, glass, bar, weightL, weightR);
    this.scene.add(this.group);
  }
}
