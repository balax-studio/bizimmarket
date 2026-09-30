import * as THREE from 'three';
import { ITEMS } from '../domain/catalog.js';
import { createBrutalistMaterial, attachToonOutline } from './Materials.js';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.position = this.group.position;
    this.position.set(0, 0, -2);

    // Movement parameters
    this.maxSpeed = 7.2;
    this.velocity = new THREE.Vector3();
    this.moveDir = new THREE.Vector3();
    this.heading = 0;
    this.isMoving = false;

    // Backpack parameters
    this.capacity = 4;
    this.inventory = []; // Array of itemType strings
    this.stackMeshes = []; // Meshes corresponding to items
    this.stackOffsets = []; // Damping spring vectors

    this.walkCycle = 0;

    this.initMesh();
    this.scene.add(this.group);
  }

  initMesh() {
    this.characterGroup = new THREE.Group();

    // Body (Neo-Brutalist Torso)
    const bodyGeo = new THREE.BoxGeometry(0.7, 0.9, 0.45);
    const bodyMat = createBrutalistMaterial(0x00d4ff); // Electric cyan hoodie
    this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    this.bodyMesh.position.y = 0.85;
    this.bodyMesh.castShadow = true;
    attachToonOutline(this.bodyMesh, 0.05);
    this.characterGroup.add(this.bodyMesh);

    // Head
    const headGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const headMat = createBrutalistMaterial(0xffdbac); // Skin
    this.headMesh = new THREE.Mesh(headGeo, headMat);
    this.headMesh.position.y = 1.6;
    this.headMesh.castShadow = true;
    attachToonOutline(this.headMesh, 0.05);
    this.characterGroup.add(this.headMesh);

    // Cap / Visor (Brutalist Streetwear)
    const capGeo = new THREE.BoxGeometry(0.55, 0.2, 0.6);
    const capMat = createBrutalistMaterial(0x121316); // Dark black cap
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.set(0, 1.8, 0.05);
    attachToonOutline(capMesh, 0.04);
    this.characterGroup.add(capMesh);

    // Backpack mount point (root for stacked crates)
    this.backpackRoot = new THREE.Group();
    this.backpackRoot.position.set(0, 0.9, -0.4);
    this.characterGroup.add(this.backpackRoot);

    this.group.add(this.characterGroup);
  }

  canCarry() {
    return this.inventory.length < this.capacity;
  }

  addItem(itemType) {
    if (!this.canCarry()) return false;

    this.inventory.push(itemType);
    const itemData = ITEMS[itemType] || { color: 0xffaa00, name: itemType };

    // Create Stack Crate Box
    const crateGeo = new THREE.BoxGeometry(0.48, 0.32, 0.48);
    const crateMat = createBrutalistMaterial(itemData.color);
    const crateMesh = new THREE.Mesh(crateGeo, crateMat);
    crateMesh.castShadow = true;
    attachToonOutline(crateMesh, 0.05);

    // Initial position
    const targetY = (this.inventory.length - 1) * 0.34;
    crateMesh.position.set(0, targetY, 0);

    this.backpackRoot.add(crateMesh);
    this.stackMeshes.push(crateMesh);
    this.stackOffsets.push({ x: 0, z: 0 });

    return true;
  }

  popItem(specificType = null) {
    if (this.inventory.length === 0) return null;

    let index = -1;
    if (specificType) {
      for (let i = this.inventory.length - 1; i >= 0; i--) {
        if (this.inventory[i] === specificType) {
          index = i;
          break;
        }
      }
    } else {
      index = this.inventory.length - 1;
    }

    if (index === -1) return null;

    const [itemType] = this.inventory.splice(index, 1);
    const [mesh] = this.stackMeshes.splice(index, 1);
    this.stackOffsets.splice(index, 1);

    this.backpackRoot.remove(mesh);
    if (mesh.geometry) mesh.geometry.dispose();

    // Re-pack remaining meshes vertically
    for (let i = 0; i < this.stackMeshes.length; i++) {
      this.stackMeshes[i].position.y = i * 0.34;
    }

    return itemType;
  }

  update(dt, inputDir, isLocked = false) {
    if (isLocked) {
      this.velocity.set(0, 0, 0);
      this.isMoving = false;
      return;
    }

    const inputLength = inputDir.length();
    this.isMoving = inputLength > 0.05;

    if (this.isMoving) {
      this.moveDir.copy(inputDir).normalize();
      const targetVel = this.moveDir.clone().multiplyScalar(this.maxSpeed * Math.min(inputLength, 1.0));
      this.velocity.lerp(targetVel, Math.min(1.0, dt * 15));

      // Calculate target heading
      const targetHeading = Math.atan2(this.moveDir.x, this.moveDir.z);
      // Smooth angular slerp
      let diff = targetHeading - this.heading;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.heading += diff * Math.min(1.0, dt * 18);
      this.characterGroup.rotation.y = this.heading;

      // Bobbing walking step
      this.walkCycle += dt * 12;
      this.bodyMesh.position.y = 0.85 + Math.abs(Math.sin(this.walkCycle)) * 0.08;
      this.headMesh.position.y = 1.6 + Math.abs(Math.sin(this.walkCycle)) * 0.06;
      this.bodyMesh.rotation.z = Math.sin(this.walkCycle) * 0.05;
    } else {
      this.velocity.lerp(new THREE.Vector3(0, 0, 0), Math.min(1.0, dt * 18));
      this.bodyMesh.position.y = 0.85;
      this.headMesh.position.y = 1.6;
      this.bodyMesh.rotation.z = 0;
    }

    // Apply movement
    this.position.addScaledVector(this.velocity, dt);

    // Obstacle Collision Resolution (Sliding physics)
    if (typeof this.resolveObstacles === 'function') {
      this.resolveObstacles();
    }

    // Bounds checking (megamap limits)
    this.position.x = Math.max(-28, Math.min(28, this.position.x));
    this.position.z = Math.max(-28, Math.min(28, this.position.z));

    // Dynamic Verlet / Spring-Damper Backpack Stack physics
    const speedFraction = this.velocity.length() / this.maxSpeed;
    const localVelX = this.velocity.x * Math.cos(-this.heading) - this.velocity.z * Math.sin(-this.heading);
    const localVelZ = this.velocity.x * Math.sin(-this.heading) + this.velocity.z * Math.cos(-this.heading);

    for (let i = 0; i < this.stackMeshes.length; i++) {
      const mesh = this.stackMeshes[i];
      const offset = this.stackOffsets[i];
      const heightFactor = (i + 1) * 0.035;

      // Desired lag offset proportional to speed and height
      const targetOffX = -localVelX * heightFactor;
      const targetOffZ = -localVelZ * heightFactor;

      offset.x += (targetOffX - offset.x) * Math.min(1.0, dt * 14);
      offset.z += (targetOffZ - offset.z) * Math.min(1.0, dt * 14);

      mesh.position.x = offset.x;
      mesh.position.z = offset.z;
      mesh.rotation.z = -offset.x * 0.8;
      mesh.rotation.x = offset.z * 0.8;
    }
  }

  setWorld(world) {
    this.world = world;
  }

  resolveObstacles() {
    if (!this.world || !this.world.obstacles) return;

    // ponytail: simple circular-AABB bounding penetration check with axis projection
    const playerRadius = 0.45;
    for (const obs of this.world.obstacles) {
      if (obs.type === 'box') {
        const minX = obs.min.x - playerRadius;
        const maxX = obs.max.x + playerRadius;
        const minZ = obs.min.z - playerRadius;
        const maxZ = obs.max.z + playerRadius;

        if (
          this.position.x > minX &&
          this.position.x < maxX &&
          this.position.z > minZ &&
          this.position.z < maxZ
        ) {
          const distLeft = Math.abs(this.position.x - minX);
          const distRight = Math.abs(maxX - this.position.x);
          const distTop = Math.abs(this.position.z - minZ);
          const distBottom = Math.abs(maxZ - this.position.z);

          const minDist = Math.min(distLeft, distRight, distTop, distBottom);
          if (minDist === distLeft) {
            this.position.x = minX;
            if (this.velocity.x > 0) this.velocity.x = 0;
          } else if (minDist === distRight) {
            this.position.x = maxX;
            if (this.velocity.x < 0) this.velocity.x = 0;
          } else if (minDist === distTop) {
            this.position.z = minZ;
            if (this.velocity.z > 0) this.velocity.z = 0;
          } else if (minDist === distBottom) {
            this.position.z = maxZ;
            if (this.velocity.z < 0) this.velocity.z = 0;
          }
        }
      }
    }
  }
}

