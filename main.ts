import './style.css';
import * as three from 'three';
import { addMoon, addStar } from './helpers/meshes';
import { Diagnostics } from './helpers/diagnostics';

const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

const scene = new three.Scene();
scene.add(new three.AmbientLight(0xffffff));
scene.background = new three.TextureLoader().load('./images/space.jpg');

const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.x = -3;

const renderer = new three.WebGLRenderer({ canvas: document.querySelector('#bg') as HTMLCanvasElement });
const dimensions = getWindowDimensions();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(dimensions.width, dimensions.height);
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
Array(200).fill(0).forEach(() => scene.add(addStar()));

const incrementRotation = (mesh: three.Mesh, x: number, y: number, z: number) => {
  mesh.rotation.x += x;
  mesh.rotation.y += y;
  mesh.rotation.z += z;
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

const handleViewportResize = (renderer: three.Renderer, camera: three.PerspectiveCamera) => {
  // From https://stackoverflow.com/questions/19827030/renderer-setsize-calculation-by-percent-of-screen-three-js - 
  // a really great piece of handling for when you resize the viewport. This also handles when the user rotates
  // the phone from portrait to landscape on mobile!
  //   The alternative is forcing the user to have to refresh to capture the new context.
  const { width, height } = getWindowDimensions();
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}; 

window.addEventListener("resize", () => handleViewportResize(renderer, camera));


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
