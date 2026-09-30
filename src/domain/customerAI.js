import * as THREE from 'three';
import { attachToonOutline, createBrutalistMaterial } from '../presentation/Materials.js';
import { ITEMS } from './catalog.js';

export const CUSTOMER_PALETTES = [
  { body: 0xff5500, cap: 0x121316, skin: 0xffdbac },
  { body: 0x3f51b5, cap: 0xffeb3b, skin: 0xf1c27d },
  { body: 0x009688, cap: 0x333333, skin: 0xe0ac69 },
  { body: 0xe91e63, cap: 0xffffff, skin: 0xc68642 },
  { body: 0x4caf50, cap: 0x212121, skin: 0x8d5524 }
];

export class Customer {
  constructor(scene, startPos, unlockedItems = ['tomato']) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.copy(startPos);

    this.palette = CUSTOMER_PALETTES[Math.floor(Math.random() * CUSTOMER_PALETTES.length)];
    this.unlockedItems = unlockedItems;

    // Pick 1-2 requested items
    this.requestedItem = unlockedItems[Math.floor(Math.random() * unlockedItems.length)] || 'tomato';
    this.requestedCount = 1 + Math.floor(Math.random() * 2);
    this.basket = [];

    // HFSM State: 'ENTER_APPROACH' | 'ENTER_DOOR' | 'TO_SHELF' | 'WAITING_ITEM' | 'TO_CHECKOUT' | 'WAITING_PAYMENT' | 'EXIT_TO_DOOR' | 'EXIT_OUTSIDE' | 'EXIT_PARKING'
    this.state = 'ENTER_APPROACH';
    this.waitTimer = 0;
    this.pickupCooldown = 0;
    this.moveSpeed = 3.6;
    this.targetPos = new THREE.Vector3();
    this.isFinished = false;

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    // Torso
    const bodyGeo = new THREE.BoxGeometry(0.55, 0.75, 0.4);
    const bodyMat = createBrutalistMaterial(this.palette.body);
    this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    this.bodyMesh.position.y = 0.75;
    this.bodyMesh.castShadow = true;
    attachToonOutline(this.bodyMesh, 0.05);
    this.group.add(this.bodyMesh);

    // Head
    const headGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
    const headMat = createBrutalistMaterial(this.palette.skin);
    this.headMesh = new THREE.Mesh(headGeo, headMat);
    this.headMesh.position.y = 1.38;
    this.headMesh.castShadow = true;
    attachToonOutline(this.headMesh, 0.05);
    this.group.add(this.headMesh);

    // Hair / Cap
    const capGeo = new THREE.BoxGeometry(0.46, 0.16, 0.46);
    const capMat = createBrutalistMaterial(this.palette.cap);
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.set(0, 1.55, 0);
    this.group.add(capMesh);

    // Billboard Speech Bubble with Canvas Texture
    this.speechGroup = new THREE.Group();
    this.speechGroup.position.set(0, 2.1, 0);

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 96;
    const ctx = canvas.getContext('2d');

    // Brutalist speech bubble box
    ctx.fillStyle = '#1c1e22';
    ctx.strokeStyle = '#00ff66';
    ctx.lineWidth = 6;
    ctx.fillRect(4, 4, 120, 88);
    ctx.strokeRect(4, 4, 120, 88);

    // Item text & icon
    const itemData = ITEMS[this.requestedItem] || { icon: '🍅' };
    ctx.font = '36px "Segoe UI Emoji", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${itemData.icon} x${this.requestedCount}`, 64, 48);

    const bubbleTex = new THREE.CanvasTexture(canvas);
    const bubbleGeo = new THREE.PlaneGeometry(0.9, 0.65);
    const bubbleMat = new THREE.MeshBasicMaterial({
      map: bubbleTex,
      transparent: true,
      depthTest: false
    });
    this.bubbleMesh = new THREE.Mesh(bubbleGeo, bubbleMat);
    this.speechGroup.add(this.bubbleMesh);

    this.group.add(this.speechGroup);
  }

  update(dt, world, camera) {
    if (this.isFinished) return;

    // Billboard speech bubble to face camera
    if (camera) {
      this.speechGroup.quaternion.copy(camera.quaternion);
    }

    if (this.pickupCooldown > 0) {
      this.pickupCooldown -= dt;
    }

    switch (this.state) {
      case 'ENTER_APPROACH': {
        this.targetPos.set(0, 0, 3.5); // Approach outside entrance
        if (this.walkTowards(this.targetPos, dt)) {
          this.state = 'ENTER_DOOR';
        }
        break;
      }

      case 'ENTER_DOOR': {
        this.targetPos.set(0, 0, -1.0); // Step through doorway into market aisle
        if (this.walkTowards(this.targetPos, dt)) {
          this.state = 'TO_SHELF';
        }
        break;
      }

      case 'TO_SHELF': {
        const shelf = world.findShelfWithItem(this.requestedItem);
        if (shelf) {
          this.targetPos.copy(shelf.position).add(new THREE.Vector3(0, 0, 1.2));
          if (this.walkTowards(this.targetPos, dt)) {
            // Reached shelf, pick with cooldown
            if (shelf.itemCount > 0) {
              if (this.pickupCooldown <= 0) {
                shelf.itemCount--;
                world.updateShelfVisuals(shelf);
                this.basket.push(this.requestedItem);
                this.pickupCooldown = 0.35;

                if (this.basket.length >= this.requestedCount) {
                  this.state = 'TO_CHECKOUT';
                  this.speechGroup.visible = false;
                }
              }
            } else {
              this.state = 'WAITING_ITEM';
              this.waitTimer = 8.0;
            }
          }
        } else {
          this.state = 'EXIT_TO_DOOR';
        }
        break;
      }

      case 'WAITING_ITEM': {
        this.waitTimer -= dt;
        const shelf = world.findShelfWithItem(this.requestedItem);
        if (shelf && shelf.itemCount > 0) {
          if (this.pickupCooldown <= 0) {
            shelf.itemCount--;
            world.updateShelfVisuals(shelf);
            this.basket.push(this.requestedItem);
            this.pickupCooldown = 0.35;

            if (this.basket.length >= this.requestedCount) {
              this.state = 'TO_CHECKOUT';
              this.speechGroup.visible = false;
            }
          }
        } else if (this.waitTimer <= 0) {
          this.state = 'EXIT_TO_DOOR';
          this.speechGroup.visible = false;
        }
        break;
      }

      case 'TO_CHECKOUT': {
        const checkout = world.getCheckoutPos();
        this.targetPos.copy(checkout).add(new THREE.Vector3(0, 0, 1.5 + world.getQueueIndex(this) * 0.9));
        if (this.walkTowards(this.targetPos, dt)) {
          this.state = 'WAITING_PAYMENT';
        }
        break;
      }

      case 'WAITING_PAYMENT': {
        // Handled by checkout cashier logic
        break;
      }

      case 'EXIT_TO_DOOR': {
        this.speechGroup.visible = false;
        this.targetPos.set(0, 0, -0.5); // Approach entrance from inside
        if (this.walkTowards(this.targetPos, dt)) {
          this.state = 'EXIT_OUTSIDE';
        }
        break;
      }

      case 'EXIT_OUTSIDE': {
        this.speechGroup.visible = false;
        this.targetPos.set(0, 0, 3.5); // Step through doorway to outside
        if (this.walkTowards(this.targetPos, dt)) {
          this.state = 'EXIT_PARKING';
        }
        break;
      }

      case 'EXIT_PARKING': {
        this.speechGroup.visible = false;
        this.targetPos.set(-14, 0, 12); // Exit towards parking lot edge
        if (this.walkTowards(this.targetPos, dt)) {
          this.destroy();
        }
        break;
      }
    }
  }

  walkTowards(target, dt) {
    const dir = target.clone().sub(this.group.position);
    dir.y = 0;
    const dist = dir.length();

    if (dist < 0.2) return true;

    dir.normalize();
    this.group.position.addScaledVector(dir, this.moveSpeed * dt);
    this.group.rotation.y = Math.atan2(dir.x, dir.z);

    // Subtle walk bob
    this.bodyMesh.position.y = 0.75 + Math.abs(Math.sin(Date.now() * 0.01)) * 0.05;
    return false;
  }

  destroy() {
    this.isFinished = true;
    this.scene.remove(this.group);
  }
}
