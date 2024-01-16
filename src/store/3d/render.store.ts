import { action, observable } from "mobx";
import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class RenderStore {
  @observable renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  canvas: HTMLCanvasElement;

  isCanvasTriggered: boolean;
  //   controls: OrbitControls;
  customControl: CustomOrbitControl;

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
    this.canvas = canvas;
    this.isCanvasTriggered = false;

    this.initCanvas();
    this.customControl = new CustomOrbitControl(this.camera);
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Use arrow function to bind 'this' context
    this.render = this.render.bind(this);

    this.render();
  }

  @action render() {
    if (this.renderer && this.scene && this.camera) {
      requestAnimationFrame(this.render);

      //   this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }

  initCanvas() {
    if (this.canvas) {
      this.canvas.onmousedown = (e) => {
        this.isCanvasTriggered = true;
        this.customControl.startControlling([e.clientX, e.clientY]);
      };
      this.canvas.onmousemove = (e) => {
        if (this.isCanvasTriggered && this.customControl) {
          this.customControl.moveToPosition([e.clientX, e.clientY]);
        }
      };
      this.canvas.onmouseup = () => {
        this.isCanvasTriggered = false;
      };
    }
  }
}

class CustomOrbitControl {
  target: THREE.Vector3;
  camera: THREE.Camera;

  start2dPosition?: [number, number];
  current2dPosition?: [number, number];

  constructor(camera: THREE.Camera) {
    this.target = camera.getWorldDirection(new THREE.Vector3());
    this.camera = camera;
  }

  startControlling(start2dPosition: [number, number]) {
    this.start2dPosition = start2dPosition;
    this.current2dPosition = start2dPosition;
  }

  moveToPosition(current2dPosition: [number, number]) {
    if (this.start2dPosition && this.current2dPosition) {
      const stepX = current2dPosition[0] - this.current2dPosition[0];
      const stepY = current2dPosition[1] - this.current2dPosition[1];

      const vec = this.camera.position;
      vec.applyAxisAngle(new THREE.Vector3(0, 1, 0), (Math.PI / 180) * -stepX);
      vec.applyAxisAngle(new THREE.Vector3(1, 0, 0), (Math.PI / 180) * -stepY);

      this.camera.position.copy(vec);
      this.camera.lookAt(this.target);

      this.current2dPosition = current2dPosition;
    }
  }
}
