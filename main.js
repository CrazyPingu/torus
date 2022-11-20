import * as THREE from './modules/three.module.js';
import {OrbitControls} from './modules/OrbitControls.js';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0,30,30);

renderer.render(scene, camera);

// Fix canvas resize
const bg = document.getElementById('bg');
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  bg.width = window.innerWidth;
  bg.height = window.innerHeight;
});

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: document.getElementById('color')});
const torus = new THREE.Mesh(geometry, material);
torus.position.setY(-5);

scene.add(torus);

// Lights
const lightPos = new THREE.Vector3(25, 22, 9);
const pointLight = new THREE.PointLight(0xffffff, 60);
pointLight.position.set(lightPos.x, lightPos.y, lightPos.z);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(pointLight, ambientLight);

// Sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./public/sun.jpg'),
    normalMap: new THREE.TextureLoader().load('./public/normal.jpg')
  })
);
sun.position.set(lightPos.x, lightPos.y, lightPos.z);
scene.add(sun);

// Debug
/*const lightHelper = new THREE.PointLightHelper(pointLight, 1, 0x0000ff);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);*/

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

Array(300).fill().forEach(addParticles);


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
  if(document.getElementById('red').value == 255 && document.getElementById('green').value == 255 && document.getElementById('blue').value == 255){
    alert("Please enter a color that is not white");
    document.getElementById('red').value = Math.floor(Math.random() * 254);
    document.getElementById('green').value = Math.floor(Math.random() * 254);
    document.getElementById('blue').value = Math.floor(Math.random() * 254);
  }
  material.color.set(
    new THREE.Color(
            "rgb("+document.getElementById('red').value +","+
                  document.getElementById('green').value +","+
                  document.getElementById('blue').value+")"
    )
  );
}
animate();
