import './style.css';
import * as three from 'three';
import { addMoon, addStar } from './helpers/meshes';
import { Diagnostics } from './helpers/diagnostics';

const scene = new three.Scene();
scene.add(new three.AmbientLight(0xffffff));
scene.background = new three.TextureLoader().load('/assets/images/space.jpg');

const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.x = -3;

const renderer = new three.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const diagnostics = new Diagnostics(scene, camera, renderer, false);

// Moons
const normalMoon = addMoon(new three.SphereGeometry(3, 32, 32), { x: 4 });
scene.add(normalMoon);

const torusMoon = addMoon(new three.TorusGeometry(10, 3, 16, 100), { x: -10, z: 30 });
scene.add(torusMoon);

const torusKnotMoon = addMoon(new three.TorusKnotGeometry(6, 1, 100, 16), { x: -20, z: 60 });
scene.add(torusKnotMoon);

// Stars
Array(200).fill().forEach(() => scene.add(addStar()));

const incrementRotation = (obj, x, y, z) => {
  obj.rotation.x += x;
  obj.rotation.y += y;
  obj.rotation.z += z;
};

// Scroll Animation
const moveCamera = () => {
  // Work out how far through the document the user has gotten to, and move the camera around the
  // scene based on their progression.
  const t = document.body.getBoundingClientRect().top;

  incrementRotation(normalMoon, 0.05, 0.075, 0.05);

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
const animate = () => {
  // After the initial call to this function, set up this function to continue being called every
  // time the browser is ready to start animating another frame.
  requestAnimationFrame(animate);

  incrementRotation(torusMoon, 0.01, 0.005, 0.01);
  incrementRotation(torusKnotMoon, 0.1, 0.5, 0.1);

  normalMoon.rotation.x += 0.005;

  diagnostics.update();
  renderer.render(scene, camera);
}

animate();
