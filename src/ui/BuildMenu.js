import * as THREE from 'three';
import gsap from 'gsap';
import { BUILD_ITEMS } from '../domain/catalog.js';
import { createGridTexture, createBrutalistMaterial } from '../presentation/Materials.js';

export class BuildMenu {
  constructor(game) {
    this.game = game;
    this.modal = document.getElementById('build-modal');
    this.cardGrid = document.getElementById('card-grid');
    this.placementBar = document.getElementById('placement-bar');
    this.tabButtons = document.querySelectorAll('.tab-btn');
    this.btnOpen = document.getElementById('btn-open-build');
    this.btnClose = document.getElementById('btn-close-build');
    this.btnRotate = document.getElementById('btn-rotate');
    this.btnConfirm = document.getElementById('btn-confirm-place');
    this.btnCancel = document.getElementById('btn-cancel-place');

    this.currentTab = 'shelves';
    this.activeItemData = null;
    this.ghostMesh = null;
    this.ghostRotation = 0;
    this.isPlacing = false;
    this.isValidPlacement = true;

    // Tactical blueprint grid overlay in 3D scene
    this.initTacticalGrid();

    // Raycasting plane for placement
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.intersectionPoint = new THREE.Vector3();

    this.bindEvents();
    this.renderCards(this.currentTab);
  }

  initTacticalGrid() {
    const gridGeo = new THREE.PlaneGeometry(60, 60);
    const gridTex = createGridTexture();
    gridTex.repeat.set(60, 60);

    const gridMat = new THREE.MeshBasicMaterial({
      map: gridTex,
      transparent: true,
      opacity: 0.0,
      depthWrite: false
    });

    this.tacticalGrid = new THREE.Mesh(gridGeo, gridMat);
    this.tacticalGrid.rotation.x = -Math.PI / 2;
    this.tacticalGrid.position.y = 0.03;
    this.game.scene.add(this.tacticalGrid);
  }

  bindEvents() {
    // Open/Close modal
    this.btnOpen.addEventListener('click', () => this.openModal());
    this.btnClose.addEventListener('click', () => this.closeModal());

    // Tab buttons
    this.tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.tabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.getAttribute('data-tab');
        this.renderCards(this.currentTab);
      });
    });

    // Placement bar controls
    this.btnRotate.addEventListener('click', () => this.rotateGhost());
    this.btnConfirm.addEventListener('click', () => this.confirmPlacement());
    this.btnCancel.addEventListener('click', () => this.cancelPlacement());

    // Pointer move for raycasting on ground
    window.addEventListener('pointermove', (e) => this.onPointerMove(e));

    // Keyboard shortcuts: B (toggle modal / cancel), Escape (close / cancel), R (rotate in placement)
    window.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'b' || e.key === 'B') {
        if (this.isPlacing) {
          this.cancelPlacement();
        } else if (this.modal.classList.contains('active')) {
          this.closeModal();
        } else {
          this.openModal();
        }
      } else if (e.key === 'Escape') {
        if (this.isPlacing) {
          this.cancelPlacement();
        } else if (this.modal.classList.contains('active')) {
          this.closeModal();
        }
      } else if ((e.key === 'r' || e.key === 'R') && this.isPlacing) {
        this.rotateGhost();
      }
    });
  }

  openModal() {
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    this.renderCards(this.currentTab);
  }

  closeModal() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
  }

  renderCards(tab) {
    this.cardGrid.innerHTML = '';
    const filtered = BUILD_ITEMS.filter((item) => item.category === tab);

    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'build-card';

      const canAfford = this.game.cash >= item.price;
      if (!canAfford) card.style.opacity = '0.5';

      card.innerHTML = `
        <div class="build-card-icon">${item.icon}</div>
        <div class="build-card-name">${item.name}</div>
        <div class="build-card-desc">${item.desc}</div>
        <div class="build-card-price">$${item.price}</div>
      `;

      card.addEventListener('click', () => {
        if (!canAfford) {
          this.game.showNotification('Yetersiz Bakiye!');
          return;
        }
        this.selectItem(item);
      });

      this.cardGrid.appendChild(card);
    });
  }

  selectItem(item) {
    this.closeModal();

    if (item.category === 'parcels') {
      // Direct parcel purchase
      this.game.cash -= item.price;
      this.game.updateHUD();
      const success = this.game.world.unlockParcel(item.targetParcel);
      if (success) {
        this.game.showNotification(`${item.name} açıldı! Duvar yıkıldı!`);
      }
      return;
    }

    if (item.category === 'staff') {
      this.game.cash -= item.price;
      this.game.updateHUD();
      this.game.hireStaff(item);
      this.game.showNotification(`${item.name} işe alındı!`);
      return;
    }

    // Start 3D Grid Placement Mode
    this.startPlacementMode(item);
  }

  startPlacementMode(item) {
    this.isPlacing = true;
    this.activeItemData = item;
    this.ghostRotation = 0;
    this.placementBar.classList.add('active');

    // Lift camera to tactical blueprint view
    this.game.setCameraTactical(true);

    // Fade in tactical grid
    gsap.to(this.tacticalGrid.material, { opacity: 0.6, duration: 0.3 });

    // Create semi-transparent green holographic ghost mesh
    const [w, h, d] = item.size || [2, 1.4, 1.2];
    const ghostGeo = new THREE.BoxGeometry(w, h, d);
    this.ghostMat = new THREE.MeshBasicMaterial({
      color: 0x00ff66,
      transparent: true,
      opacity: 0.55,
      wireframe: false
    });
    this.ghostMesh = new THREE.Mesh(ghostGeo, this.ghostMat);
    this.ghostMesh.position.set(0, h / 2, 0);
    this.game.scene.add(this.ghostMesh);
  }

  rotateGhost() {
    if (!this.ghostMesh) return;
    this.ghostRotation += Math.PI / 2;
    this.ghostMesh.rotation.y = this.ghostRotation;
  }

  onPointerMove(e) {
    if (!this.isPlacing || !this.ghostMesh) return;

    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.game.camera);
    if (this.raycaster.ray.intersectPlane(this.groundPlane, this.intersectionPoint)) {
      // 0.5m Grid Snapping
      const step = 0.5;
      const snapX = Math.round(this.intersectionPoint.x / step) * step;
      const snapZ = Math.round(this.intersectionPoint.z / step) * step;

      const h = this.activeItemData.size ? this.activeItemData.size[1] : 1.4;
      this.ghostMesh.position.set(snapX, h / 2, snapZ);

      // Check collision / valid placement
      this.checkPlacementValidity();
    }
  }

  checkPlacementValidity() {
    const pos = this.ghostMesh.position;
    // Bounds check
    let valid = true;

    // Cannot place outside shop or directly in entrance aisle
    if (pos.z > 2 || pos.z < -13 || pos.x < -7 || pos.x > 7) {
      valid = false;
    }

    // Check distance to existing shelves
    for (const s of this.game.world.shelves) {
      if (s.position.distanceTo(pos) < 2.2) {
        valid = false;
        break;
      }
    }

    this.isValidPlacement = valid;
    this.ghostMat.color.setHex(valid ? 0x00ff66 : 0xff3344);
    this.btnConfirm.disabled = !valid;
    this.btnConfirm.style.opacity = valid ? '1.0' : '0.4';
  }

  confirmPlacement() {
    if (!this.isValidPlacement || !this.ghostMesh) return;

    const targetPos = this.ghostMesh.position.clone();
    targetPos.y = 0;
    const rotY = this.ghostRotation;
    const itemData = this.activeItemData;

    // Deduct cash
    this.game.cash -= itemData.price;
    this.game.updateHUD();

    // Clean up ghost mode
    this.cleanupPlacement();

    // Trigger Industrial Crate Drop Animation
    this.game.crateDrop.play(
      targetPos,
      () => {
        // Spawn actual unit
        if (itemData.category === 'shelves') {
          return this.game.world.spawnShelf(itemData.id, targetPos, rotY);
        } else if (itemData.category === 'machines') {
          return this.game.world.spawnMachine(itemData.id, targetPos, rotY);
        } else if (itemData.category === 'logistics') {
          return this.game.world.initCheckoutCounter(targetPos);
        }
        return null;
      },
      () => {
        this.game.showNotification(`${itemData.name} başarıyla kuruldu!`);
      }
    );
  }

  cancelPlacement() {
    this.cleanupPlacement();
  }

  cleanupPlacement() {
    this.isPlacing = false;
    this.placementBar.classList.remove('active');

    // Return camera to follow mode
    this.game.setCameraTactical(false);

    // Fade out tactical grid
    gsap.to(this.tacticalGrid.material, { opacity: 0.0, duration: 0.3 });

    if (this.ghostMesh) {
      this.game.scene.remove(this.ghostMesh);
      this.ghostMesh.geometry.dispose();
      this.ghostMesh.material.dispose();
      this.ghostMesh = null;
    }
  }
}
