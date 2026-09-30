import * as THREE from 'three';
import gsap from 'gsap';
import { createHazardTexture, createBrutalistMaterial, attachToonOutline } from './Materials.js';

export class CrateDropAnimation {
  constructor(scene) {
    this.scene = scene;
  }

  play(targetPos, onSpawnUnit, onComplete) {
    const crateGroup = new THREE.Group();
    crateGroup.position.set(targetPos.x, 16, targetPos.z);

    // Hazard striped crate
    const hazardTex = createHazardTexture();
    hazardTex.repeat.set(2, 2);

    const crateGeo = new THREE.BoxGeometry(2.0, 2.0, 2.0);
    const crateMat = new THREE.MeshLambertMaterial({
      map: hazardTex,
      flatShading: true
    });
    const crateMesh = new THREE.Mesh(crateGeo, crateMat);
    crateMesh.castShadow = true;
    attachToonOutline(crateMesh, 0.05);
    crateGroup.add(crateMesh);

    // Shadow decal indicator on ground
    const shadowGeo = new THREE.CircleGeometry(1.2, 16);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0a0a0c,
      transparent: true,
      opacity: 0.15
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(targetPos.x, 0.02, targetPos.z);
    this.scene.add(shadowMesh);

    this.scene.add(crateGroup);

    // GSAP Drop Sequence
    const tl = gsap.timeline();

    // 1. Drop down fast
    tl.to(crateGroup.position, {
      y: 1.0,
      duration: 0.45,
      ease: 'power2.in',
      onUpdate: () => {
        const progress = (16 - crateGroup.position.y) / 15;
        shadowMesh.scale.setScalar(0.4 + progress * 0.8);
        shadowMat.opacity = 0.15 + progress * 0.4;
      }
    });

    // 2. Impact: Squash & Stretch
    tl.to(crateMesh.scale, {
      x: 1.35,
      z: 1.35,
      y: 0.65,
      duration: 0.08,
      ease: 'power1.out',
      onComplete: () => {
        this.spawnDustParticles(targetPos);
      }
    });

    // 3. Bounce back up slightly
    tl.to(crateMesh.scale, {
      x: 0.95,
      z: 0.95,
      y: 1.1,
      duration: 0.1,
      ease: 'power1.inOut'
    });

    // 4. Return to normal
    tl.to(crateMesh.scale, {
      x: 1.0,
      z: 1.0,
      y: 1.0,
      duration: 0.08
    });

    // 5. Crate explodes / unpacks
    tl.to(crateMesh.scale, {
      x: 1.6,
      z: 1.6,
      y: 0.1,
      opacity: 0,
      duration: 0.2,
      ease: 'back.in(1.5)',
      onComplete: () => {
        this.scene.remove(crateGroup);
        this.scene.remove(shadowMesh);
        crateGeo.dispose();
        crateMat.dispose();
        shadowGeo.dispose();
        shadowMat.dispose();

        // Spawn unit
        if (onSpawnUnit) {
          const unit = onSpawnUnit();
          if (unit) {
            unit.scale.set(0.2, 0.2, 0.2);
            gsap.to(unit.scale, {
              x: 1.0,
              y: 1.0,
              z: 1.0,
              duration: 0.35,
              ease: 'elastic.out(1.2, 0.5)'
            });
          }
        }

        if (onComplete) onComplete();
      }
    });
  }

  spawnDustParticles(pos) {
    const particleCount = 10;
    const particleGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const particleMat = createBrutalistMaterial(0x8892a0);

    for (let i = 0; i < particleCount; i++) {
      const pMesh = new THREE.Mesh(particleGeo, particleMat);
      pMesh.position.set(pos.x, 0.1, pos.z);
      this.scene.add(pMesh);

      const angle = (i / particleCount) * Math.PI * 2;
      const dist = 1.2 + Math.random() * 0.8;
      const targetX = pos.x + Math.cos(angle) * dist;
      const targetZ = pos.z + Math.sin(angle) * dist;

      gsap.to(pMesh.position, {
        x: targetX,
        y: 0.4 + Math.random() * 0.4,
        z: targetZ,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(pMesh.scale, {
            x: 0.01,
            y: 0.01,
            z: 0.01,
            duration: 0.2,
            onComplete: () => {
              this.scene.remove(pMesh);
              pMesh.geometry.dispose();
              pMesh.material.dispose();
            }
          });
        }
      });
    }
  }
}
