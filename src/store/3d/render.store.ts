import { action, observable } from "mobx";
import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class RenderStore {
  constructor(
    canvas: HTMLCanvasElement,
    scene: THREE.Scene,
    camera: THREE.Camera
  ) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(
      canvas.getClientRects()[0].width,
      canvas.getClientRects()[0].height
    );

    this.scene = scene;
    this.camera = camera;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Use arrow function to bind 'this' context
    this.render = this.render.bind(this);

    this.render();
  }

  @observable renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  controls: OrbitControls;

  @action render() {
    if (this.renderer && this.scene && this.camera && this.controls) {
      requestAnimationFrame(this.render);

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }
}
