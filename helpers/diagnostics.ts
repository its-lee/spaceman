import * as three from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Diagnostics {
  controls: OrbitControls;

  constructor(scene: three.Scene, camera: three.Camera, renderer: three.Renderer, enabled = false) {
    if (!enabled) {
      return;
    }

    const pointLight = new three.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    scene.add(
      new three.PointLightHelper(pointLight),
      new three.GridHelper(200, 50)
    );

    this.controls = new OrbitControls(camera, renderer.domElement);
  }

  update() {
    this.controls && this.controls.update();
  }
}