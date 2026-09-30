import * as THREE from 'three';

// Procedural Hazard Stripe Texture
export function createHazardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffcc00';
  ctx.fillRect(0, 0, 128, 128);

  ctx.fillStyle = '#111111';
  ctx.beginPath();
  for (let i = -128; i < 256; i += 32) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 32, 0);
    ctx.lineTo(i - 16, 128);
    ctx.lineTo(i - 48, 128);
    ctx.closePath();
  }
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Procedural Tactical Grid Texture
export function createGridTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(25, 28, 33, 0.9)';
  ctx.fillRect(0, 0, 128, 128);

  ctx.strokeStyle = '#00d4ff';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Standard Neo-Brutalist Flat Material
export function createBrutalistMaterial(color, flatShading = true) {
  return new THREE.MeshLambertMaterial({
    color: color,
    flatShading: flatShading,
    reflectivity: 0.1
  });
}

// Inverted Hull Toon Outline
export function attachToonOutline(mesh, thickness = 0.04, color = 0x0a0a0c) {
  const outlineMaterial = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.BackSide
  });

  const outlineMesh = new THREE.Mesh(mesh.geometry, outlineMaterial);
  outlineMesh.scale.set(1 + thickness, 1 + thickness, 1 + thickness);
  mesh.add(outlineMesh);
  return outlineMesh;
}
