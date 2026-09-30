import * as THREE from 'three';
import { attachToonOutline, createBrutalistMaterial } from '../presentation/Materials.js';

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

    // HFSM State: 'ENTER' | 'TO_SHELF' | 'WAITING_ITEM' | 'TO_CHECKOUT' | 'WAITING_PAYMENT' | 'EXIT'
    this.state = 'ENTER';
    this.waitTimer = 0;
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

    // Speech bubble billboard above head
    this.speechGroup = new THREE.Group();
    this.speechGroup.position.set(0, 2.0, 0);

    const bubbleGeo = new THREE.PlaneGeometry(0.8, 0.6);
    const bubbleMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      side: THREE.DoubleSide
    });
    this.bubbleMesh = new THREE.Mesh(bubbleGeo, bubbleMat);
    this.speechGroup.add(this.bubbleMesh);

    this.group.add(this.speechGroup);
  }

  update(dt, world) {
    if (this.isFinished) return;

    switch (this.state) {
      case 'ENTER': {
        // Walk into mart center
        this.targetPos.set(0, 0, -4);
        if (this.walkTowards(this.targetPos, dt)) {
          this.state = 'TO_SHELF';
        }
        break;
      }

      case 'TO_SHELF': {
        // Find matching shelf
        const shelf = world.findShelfWithItem(this.requestedItem);
        if (shelf) {
          this.targetPos.copy(shelf.position).add(new THREE.Vector3(0, 0, 1.2));
          if (this.walkTowards(this.targetPos, dt)) {
            // Reached shelf, attempt to pick item
            if (shelf.itemCount > 0) {
              shelf.itemCount--;
              this.basket.push(this.requestedItem);
              if (this.basket.length >= this.requestedCount) {
                this.state = 'TO_CHECKOUT';
              }
            } else {
              this.state = 'WAITING_ITEM';
              this.waitTimer = 8.0;
            }
          }
        } else {
          // No shelf available, directly leave
          this.state = 'EXIT';
        }
        break;
      }

      case 'WAITING_ITEM': {
        this.waitTimer -= dt;
        const shelf = world.findShelfWithItem(this.requestedItem);
        if (shelf && shelf.itemCount > 0) {
          shelf.itemCount--;
          this.basket.push(this.requestedItem);
          if (this.basket.length >= this.requestedCount) {
            this.state = 'TO_CHECKOUT';
          }
        } else if (this.waitTimer <= 0) {
          // Angry timeout, leave
          this.state = 'EXIT';
        }
        break;
      }

      case 'TO_CHECKOUT': {
        const checkout = world.getCheckoutPos();
        // Stand in queue in front of checkout
        this.targetPos.copy(checkout).add(new THREE.Vector3(0, 0, 1.5 + world.getQueueIndex(this) * 0.9));
        if (this.walkTowards(this.targetPos, dt)) {
          this.state = 'WAITING_PAYMENT';
        }
        break;
      }

      case 'WAITING_PAYMENT': {
        // Handled by Checkout logic when player or cashier is present
        break;
      }

      case 'EXIT': {
        this.targetPos.set(-8, 0, 14); // Exit to parking lot
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
