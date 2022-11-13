import * as THREE from './modules/three.module.js';
import {OrbitControls} from './modules/OrbitControls.js';

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

const material = new THREE.MeshStandardMaterial({ color: document.getElementById('color')});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(12, 12, 6);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Debug
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Add particles
function addParticles() {
  const geometry = new THREE.SphereGeometry(0.1, 10, 10);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, });
  const particles = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  particles.position.set(x, y, z);
  scene.add(particles);
}
  
Array(200).fill().forEach(addParticles);


// Animates the torus
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.015;
  torus.rotation.y += 0.015;
  torus.rotation.z += 0.015;

  controls.update();
  changeColor();
  renderer.render(scene, camera);
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
