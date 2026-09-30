import * as THREE from 'three';
import gsap from 'gsap';
import { Player } from './presentation/Player.js';
import { WorldScene } from './presentation/WorldScene.js';
import { CrateDropAnimation } from './presentation/CrateDrop.js';
import { Customer } from './domain/customerAI.js';
import { BuildMenu } from './ui/BuildMenu.js';
import { sound } from './core/SoundManager.js';

class Game {
  constructor() {
    this.cash = 100;
    this.staffList = [];
    this.isTacticalView = false;
    this.lastHarvestTime = 0;
    this.lastDepositTime = 0;
    this.lastMachineTime = 0;
    this.lastCustomerSpawn = 0;

    this.initThree();
    this.initWorld();
    this.initInput();
    this.initUI();

    this.lastTime = performance.now();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initThree() {
    this.container = document.getElementById('canvas-container');

    // 1. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 2. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x121316); // Dark Brutalist Void

    // 3. Camera (Isometric Perspective)
    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.5, 120);
    this.cameraOffset = new THREE.Vector3(0, 16, 15);
    this.camera.position.set(0, 16, 15);
    this.camera.lookAt(0, 0, 0);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
    sunLight.position.set(15, 25, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 70;
    sunLight.shadow.camera.left = -25;
    sunLight.shadow.camera.right = 25;
    sunLight.shadow.camera.top = 25;
    sunLight.shadow.camera.bottom = -25;
    sunLight.shadow.bias = -0.0005;
    this.scene.add(sunLight);

    // Resize Handler
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  initWorld() {
    this.world = new WorldScene(this.scene);
    this.player = new Player(this.scene);
    this.player.setWorld(this.world); // Connect obstacles for physical sliding collision
    this.crateDrop = new CrateDropAnimation(this.scene);

    // Spawn 2 initial customers
    this.spawnCustomer();
    this.spawnCustomer();
  }

  initInput() {
    this.inputDir = new THREE.Vector2();
    this.keys = {};

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
    // Touch Joystick Controls
    this.joystickBase = document.getElementById('joystick-container');
    this.joystickThumb = document.getElementById('joystick-thumb');
    this.isJoystickDragging = false;
    this.joystickCenter = { x: 0, y: 0 };

    // Autoplay audio unlock on first interaction
    const unlockAudio = () => {
      sound.ensureContext();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    const onPointerDown = (e) => {
      this.isJoystickDragging = true;
      const rect = this.joystickBase.getBoundingClientRect();
      this.joystickCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      this.updateJoystick(e.clientX, e.clientY);
    };

    const onPointerMove = (e) => {
      if (!this.isJoystickDragging) return;
      this.updateJoystick(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
      this.isJoystickDragging = false;
      this.joystickThumb.style.transform = `translate(0px, 0px)`;
      this.inputDir.set(0, 0);
    };

    this.joystickBase.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  updateJoystick(clientX, clientY) {
    const dx = clientX - this.joystickCenter.x;
    const dy = clientY - this.joystickCenter.y;
    const dist = Math.hypot(dx, dy);
    const maxRadius = 40;

    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(dist, maxRadius);

    const thumbX = Math.cos(angle) * clampedDist;
    const thumbY = Math.sin(angle) * clampedDist;

    this.joystickThumb.style.transform = `translate(${thumbX}px, ${thumbY}px)`;
    this.inputDir.set(thumbX / maxRadius, thumbY / maxRadius);
  }

  initUI() {
    this.cashVal = document.getElementById('cash-val');
    this.bpVal = document.getElementById('bp-val');
    this.objText = document.getElementById('obj-text');

    this.buildMenu = new BuildMenu(this);
    this.updateHUD();
  }

  updateHUD() {
    this.cashVal.innerText = `$${this.cash}`;
    this.bpVal.innerText = `${this.player.inventory.length} / ${this.player.capacity}`;

    // Dynamic Objective text
    if (this.player.inventory.length === 0 && this.cash < 200) {
      this.objText.innerText = 'DOMATES TARLASINA GİT VE HASAT ET';
    } else if (this.player.inventory.length > 0) {
      this.objText.innerText = 'ÜRÜNLERİ REYONA DİZ YA DA KASADA SAT';
    } else if (this.cash >= 200) {
      this.objText.innerText = 'İNŞAAT MENÜSÜNÜ AÇ VE YENİ REYON / ARSA AL';
    }
  }

  showNotification(msg) {
    const notifyPill = document.createElement('div');
    notifyPill.className = 'hud-pill';
    notifyPill.style.position = 'absolute';
    notifyPill.style.top = '75px';
    notifyPill.style.left = '50%';
    notifyPill.style.transform = 'translateX(-50%)';
    notifyPill.style.borderColor = '#00ff66';
    notifyPill.style.color = '#00ff66';
    notifyPill.style.zIndex = '99';
    notifyPill.innerText = `⚡ ${msg}`;
    document.body.appendChild(notifyPill);

    gsap.fromTo(notifyPill, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 });
    gsap.to(notifyPill, {
      y: -20,
      opacity: 0,
      delay: 2.0,
      duration: 0.4,
      onComplete: () => notifyPill.remove()
    });
  }

  setCameraTactical(isTactical) {
    this.isTacticalView = isTactical;
    const targetOffset = isTactical ? new THREE.Vector3(0, 24, 8) : new THREE.Vector3(0, 16, 15);

    gsap.to(this.cameraOffset, {
      x: targetOffset.x,
      y: targetOffset.y,
      z: targetOffset.z,
      duration: 0.6,
      ease: 'power2.inOut'
    });
  }

  hireStaff(staffItem) {
    this.staffList.push(staffItem);

    if (staffItem.role === 'cashier') {
      // Spawn Cashier behind counter
      const cashierGroup = new THREE.Group();
      const checkoutPos = this.world.getCheckoutPos();
      cashierGroup.position.set(checkoutPos.x - 0.6, 0, checkoutPos.z - 0.6);

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.7, 0.35),
        new THREE.MeshLambertMaterial({ color: 0x00d4ff, flatShading: true })
      );
      body.position.y = 0.7;
      cashierGroup.add(body);

      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.38, 0.38),
        new THREE.MeshLambertMaterial({ color: 0xffdbac, flatShading: true })
      );
      head.position.y = 1.3;
      cashierGroup.add(head);

      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.15, 0.45),
        new THREE.MeshLambertMaterial({ color: 0x111111, flatShading: true })
      );
      cap.position.set(0, 1.45, 0.05);
      cashierGroup.add(cap);

      this.scene.add(cashierGroup);
    } else if (staffItem.role === 'stocker') {
      // Stocker logic agent
      const stockerGroup = new THREE.Group();
      stockerGroup.position.set(-2, 0, -2);

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.75, 0.4),
        new THREE.MeshLambertMaterial({ color: 0xffaa00, flatShading: true })
      );
      body.position.y = 0.75;
      stockerGroup.add(body);

      const head = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.38, 0.38),
        new THREE.MeshLambertMaterial({ color: 0xffdbac, flatShading: true })
      );
      head.position.y = 1.35;
      stockerGroup.add(head);

      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.15, 0.45),
        new THREE.MeshLambertMaterial({ color: 0xff5500, flatShading: true })
      );
      cap.position.set(0, 1.5, 0.05);
      stockerGroup.add(cap);

      const stackRoot = new THREE.Group();
      stackRoot.position.set(0, 0.8, -0.35);
      stockerGroup.add(stackRoot);

      this.scene.add(stockerGroup);
      this.stockerData = {
        group: stockerGroup,
        body: body,
        stackRoot: stackRoot,
        carrying: 0,
        capacity: 3,
        stackMeshes: [],
        state: 'TO_FARM',
        speed: 4.0,
        harvestTimer: 0
      };
    }
  }

  spawnCustomer() {
    if (this.world.customers.length >= 8) return;
    const spawnX = -12 + Math.random() * 4;
    const spawnPos = new THREE.Vector3(spawnX, 0, 12);
    // ponytail: customers only request items currently sold on active shelves
    const availableItems = [...new Set(this.world.shelves.map((s) => s.itemType))];
    const customer = new Customer(this.scene, spawnPos, availableItems.length > 0 ? availableItems : ['tomato']);
    this.world.customers.push(customer);
  }

  handleInteractions(now) {
    const playerPos = this.player.position;

    // 1. Tomato Farm Harvest
    const farm = this.world.farmData;
    if (farm && playerPos.distanceTo(farm.position) < farm.radius) {
      if (now - this.lastHarvestTime > 110) {
        const ripe = farm.plants.find((p) => p.isRipe);
        if (ripe && this.player.canCarry()) {
          ripe.isRipe = false;
          ripe.growTimer = 0;
          ripe.fruit.visible = false;
          this.player.addItem('tomato');
          sound.playPop();
          this.updateHUD();
          this.lastHarvestTime = now;
        }
      }
    }

    // 2. Shelf Stocking
    for (const shelf of this.world.shelves) {
      if (playerPos.distanceTo(shelf.position) < shelf.radius) {
        if (now - this.lastDepositTime > 90) {
          if (shelf.itemCount < shelf.maxCapacity) {
            const popped = this.player.popItem(shelf.itemType);
            if (popped) {
              shelf.itemCount++;
              this.world.updateShelfVisuals(shelf);
              sound.playDeposit();
              this.updateHUD();
              this.lastDepositTime = now;
            }
          }
        }
      }
    }

    // 3. Machine Cooking & Collection (e.g. Salça Buhar Kazanı)
    for (const machine of this.world.machines) {
      if (playerPos.distanceTo(machine.position) < machine.radius) {
        if (now - this.lastMachineTime > 120) {
          // Feed input tomato
          if (machine.inputCount < 6) {
            const popped = this.player.popItem(machine.inputItem);
            if (popped) {
              machine.inputCount++;
              sound.playDeposit();
              this.updateHUD();
              this.lastMachineTime = now;
            }
          }
          // Collect finished paste
          if (machine.outputCount > 0 && this.player.canCarry()) {
            machine.outputCount--;
            this.player.addItem(machine.outputItem);
            sound.playPop();
            this.updateHUD();
            this.lastMachineTime = now;
          }
        }
      }
    }

    // 4. Checkout Desk Processing & Customer Payment
    const checkout = this.world.checkoutData;
    if (checkout) {
      const isPlayerAtCounter = playerPos.distanceTo(checkout.position) < checkout.radius;
      const hasCashier = this.staffList.some((s) => s.role === 'cashier');

      // Cashier processes customers
      if (isPlayerAtCounter || hasCashier) {
        const customer = this.world.customers.find((c) => c.state === 'WAITING_PAYMENT');
        if (customer) {
          let totalPay = 0;
          customer.basket.forEach((item) => {
            totalPay += item === 'paste' ? 28 : 6;
          });
          customer.basket = [];
          customer.state = 'EXIT_TO_DOOR';
          this.world.addCashToDesk(totalPay);
        }
      }

      // Collect cash from desk when near the money plate (x ~ +0.6 of counter)
      const cashPlatePos = new THREE.Vector3(checkout.position.x + 0.6, 0, checkout.position.z);
      if (playerPos.distanceTo(cashPlatePos) < 1.6 && checkout.cashBalanceOnDesk > 0) {
        const collected = this.world.collectCashFromDesk();
        if (collected > 0) {
          this.cash += collected;
          sound.playCash();
          this.updateHUD();
          this.showNotification(`+$${collected} Tahsil Edildi!`);
        }
      }
    }
  }

  animate() {
    requestAnimationFrame(this.animate);

    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    // Combine Keyboard & Joystick Input
    let moveX = this.inputDir.x;
    let moveZ = this.inputDir.y;

    if (this.keys['w'] || this.keys['arrowup']) moveZ -= 1;
    if (this.keys['s'] || this.keys['arrowdown']) moveZ += 1;
    if (this.keys['a'] || this.keys['arrowleft']) moveX -= 1;
    if (this.keys['d'] || this.keys['arrowright']) moveX += 1;

    const rawDir = new THREE.Vector3(moveX, 0, moveZ);
    if (rawDir.length() > 1.0) rawDir.normalize();

    // Update Player
    this.player.update(dt, rawDir, this.buildMenu.isPlacing);

    // Camera follow player smoothly
    const targetCamX = this.player.position.x + this.cameraOffset.x;
    const targetCamY = this.cameraOffset.y;
    const targetCamZ = this.player.position.z + this.cameraOffset.z;

    this.camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), dt * 8);
    this.camera.lookAt(this.player.position.x, 0.8, this.player.position.z);

    // Update World & Interactions
    this.world.update(dt);
    this.handleInteractions(now);
    this.updateStocker(dt);

    // Update Customers (with billboard camera facing)
    for (let i = this.world.customers.length - 1; i >= 0; i--) {
      const c = this.world.customers[i];
      c.update(dt, this.world, this.camera);
      if (c.isFinished) {
        this.world.customers.splice(i, 1);
      }
    }

    // Customer Spawning loop
    if (now - this.lastCustomerSpawn > 4500) {
      this.spawnCustomer();
      this.lastCustomerSpawn = now;
    }

    this.renderer.render(this.scene, this.camera);
  }

  updateStocker(dt) {
    if (!this.stockerData) return;
    const stocker = this.stockerData;
    const farm = this.world.farmData;

    switch (stocker.state) {
      case 'TO_FARM': {
        if (!farm) return;
        const target = farm.position.clone();
        if (this.walkAgentTowards(stocker.group, target, stocker.speed, dt)) {
          stocker.state = 'HARVESTING';
          stocker.harvestTimer = 0;
        }
        break;
      }

      case 'HARVESTING': {
        stocker.harvestTimer += dt;
        if (stocker.harvestTimer > 0.4) {
          stocker.harvestTimer = 0;
          const ripe = farm.plants.find((p) => p.isRipe);
          if (ripe && stocker.carrying < stocker.capacity) {
            ripe.isRipe = false;
            ripe.fruit.visible = false;
            ripe.growTimer = 0;
            stocker.carrying++;

            // Visual stacked crate on back
            const crate = new THREE.Mesh(
              new THREE.BoxGeometry(0.4, 0.25, 0.4),
              new THREE.MeshLambertMaterial({ color: 0xff3b30, flatShading: true })
            );
            crate.position.set(0, (stocker.carrying - 1) * 0.28, 0);
            stocker.stackRoot.add(crate);
            stocker.stackMeshes.push(crate);
            sound.playPop();
          }

          if (stocker.carrying >= stocker.capacity || (!ripe && stocker.carrying > 0)) {
            // Priority: Machine first if boiler needs tomatoes, otherwise shelves
            const machine = this.world.machines.find((m) => m.inputCount < 6);
            if (machine) {
              stocker.targetMachine = machine;
              stocker.state = 'TO_MACHINE';
            } else {
              const shelf = this.world.shelves.find((s) => s.itemType === 'tomato' && s.itemCount < s.maxCapacity);
              if (shelf) {
                stocker.targetShelf = shelf;
                stocker.state = 'TO_SHELF';
              } else if (stocker.carrying === 0) {
                stocker.state = 'TO_FARM';
              }
            }
          }
        }
        break;
      }

      case 'TO_MACHINE': {
        const machine = stocker.targetMachine || this.world.machines[0];
        if (!machine) {
          stocker.state = 'TO_SHELF';
          return;
        }
        if (this.walkAgentTowards(stocker.group, machine.position, stocker.speed, dt, 1.8)) {
          if (stocker.carrying > 0 && machine.inputCount < 6) {
            stocker.carrying--;
            machine.inputCount++;
            const mesh = stocker.stackMeshes.pop();
            if (mesh) {
              stocker.stackRoot.remove(mesh);
              mesh.geometry.dispose();
            }
            sound.playDeposit();
          }
          if (stocker.carrying === 0 || machine.inputCount >= 6) {
            stocker.targetMachine = null;
            stocker.state = 'TO_FARM';
          }
        }
        break;
      }

      case 'TO_SHELF': {
        const shelf = stocker.targetShelf || this.world.shelves.find((s) => s.itemType === 'tomato');
        if (!shelf) {
          stocker.state = 'TO_FARM';
          return;
        }
        if (this.walkAgentTowards(stocker.group, shelf.position, stocker.speed, dt, 1.6)) {
          if (stocker.carrying > 0 && shelf.itemCount < shelf.maxCapacity) {
            stocker.carrying--;
            shelf.itemCount++;
            this.world.updateShelfVisuals(shelf);
            const mesh = stocker.stackMeshes.pop();
            if (mesh) {
              stocker.stackRoot.remove(mesh);
              mesh.geometry.dispose();
            }
            sound.playDeposit();
          }
          if (stocker.carrying === 0 || shelf.itemCount >= shelf.maxCapacity) {
            stocker.targetShelf = null;
            stocker.state = 'TO_FARM';
          }
        }
        break;
      }
    }
  }

  walkAgentTowards(group, target, speed, dt, stopDist = 0.3) {
    const dir = target.clone().sub(group.position);
    dir.y = 0;
    const dist = dir.length();
    if (dist <= stopDist) return true;

    dir.normalize();
    group.position.addScaledVector(dir, speed * dt);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, Math.atan2(dir.x, dir.z), dt * 10);
    return false;
  }
}

// Start Game on window load
window.addEventListener('DOMContentLoaded', () => {
  new Game();
});
