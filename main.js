import * as THREE from 'three';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: document.getElementById('color'), wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  changeColor();
  renderer.render(scene, camera);
}

function dec2Hex(dec) {
  return Math.abs(dec).toString(16);
}

function changeColor() {
  material.color.set(
    new THREE.Color(
            "rgb("+document.getElementById('red').value +","+ 
                  document.getElementById('green').value +","+ 
                  document.getElementById('blue').value+")"
    )
  );
}
animate();
