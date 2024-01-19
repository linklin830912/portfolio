import { observable } from "mobx";
import React from "react";
import * as THREE from "three";
import CustomOrbitControl from "./control/customOrbitControl";
import CustomZoomControl from "./control/customZoomControl";

export default class RenderStore {
  @observable renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  canvas: HTMLCanvasElement;
  target: THREE.Vector3;

  // all controls
  isOrbitControlTriggered: boolean;
  customOrbitControl: CustomOrbitControl;
  isZoomControlTriggered: boolean;
  customZoomControl: CustomZoomControl;
  isPanControlTriggered: boolean;
  customPanControl: CustomPanControl;

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
    this.target = camera.getWorldDirection(new THREE.Vector3());

    // all controls
    this.isOrbitControlTriggered = false;
    this.customOrbitControl = new CustomOrbitControl(this.camera, this.target);
    this.isZoomControlTriggered = false;
    this.customZoomControl = new CustomZoomControl(this.camera, this.target);
    this.isPanControlTriggered = false;
    this.customPanControl = new CustomPanControl(this.camera, this.target);
    this.initCanvasControls();

    // Use arrow function to bind 'this' context
    this.render = this.render.bind(this);

    this.render();
  }

  render() {
    if (this.renderer && this.scene && this.camera) {
      requestAnimationFrame(this.render);

      this.renderer.render(this.scene, this.camera);
    }
  }

  initCanvasControls() {
    if (this.canvas) {
      this.canvas.onmousedown = (e) => {
        e.preventDefault();
        if (e.button === 0) {
          this.isOrbitControlTriggered = true;
          this.customOrbitControl.startControlling([e.clientX, e.clientY]);
        } else if (e.button === 1) {
          this.isZoomControlTriggered = true;
          this.customZoomControl.startControlling(e.clientY);
        } else if (e.button === 2) {
          this.isPanControlTriggered = true;
          this.customPanControl.startControlling([e.clientX, e.clientY]);
        }
      };
      this.canvas.onmousemove = (e) => {
        e.preventDefault();
        if (this.isOrbitControlTriggered) {
          this.customOrbitControl.moveToPosition([e.clientX, e.clientY]);
        } else if (this.isZoomControlTriggered) {
          this.customZoomControl.moveToPosition(e.clientY);
        } else if ((this, this.isPanControlTriggered)) {
          this.customPanControl.moveToPosition([e.clientX, e.clientY]);
        }
      };
      this.canvas.onmouseup = (e) => {
        if (e.button === 0) {
          this.isOrbitControlTriggered = false;
        } else if (e.button === 1) {
          this.isZoomControlTriggered = false;
        } else if (e.button === 2) {
          this.isPanControlTriggered = false;
        }
      };
      this.canvas.oncontextmenu = (e) => {
        e.preventDefault();
      };
    }
  }
}

class CustomPanControl {
  target: THREE.Vector3;
  camera: THREE.Camera;
  current2dPosition?: [number, number];
  normal: THREE.Vector3;
  quaternion: THREE.Quaternion;

  scene?: THREE.Scene;
  meshTemp?: THREE.Mesh;
  planeTemp?: THREE.PlaneGeometry;

  xVector: THREE.Vector3;
  yVector: THREE.Vector3;

  constructor(camera: THREE.Camera, target: THREE.Vector3) {
    this.target = target;
    this.camera = camera;
    this.normal = new THREE.Vector3();
    this.quaternion = new THREE.Quaternion();
    this.yVector = new THREE.Vector3();
    this.xVector = new THREE.Vector3();
  }
  startControlling(current2dPosition: [number, number]) {
    this.current2dPosition = current2dPosition;
    this.normal.copy(this.camera.position).sub(this.target).normalize();
    const dotProduct = this.normal.dot(new THREE.Vector3(0, 1, 0));

    // Calculate the angle in radians using arccosine
    const angle = Math.acos(THREE.MathUtils.clamp(dotProduct, -1, 1));
    if (angle > 2) {
      this.yVector.set(0, 0, 1);
    } else if (angle > 0.5) {
      this.yVector.set(0, 1, 0);
    } else {
      this.yVector.set(0, 0, 1);
    }
    this.yVector.normalize().multiplyScalar(0.01);

    this.xVector
      .crossVectors(this.normal, this.yVector)
      .normalize()
      .multiplyScalar(0.01);
  }
  moveToPosition(current2dPosition: [number, number]) {
    if (this.current2dPosition) {
      for (
        let i = 0;
        i < Math.abs(current2dPosition[0] - this.current2dPosition[0]);
        i++
      ) {
        if (current2dPosition[0] > this.current2dPosition[0]) {
          this.camera.position.add(this.xVector);
          this.camera.lookAt(this.target.add(this.xVector));
        } else {
          this.camera.position.sub(this.xVector);
          this.camera.lookAt(this.target.sub(this.xVector));
        }
      }
      for (
        let i = 0;
        i < Math.abs(current2dPosition[1] - this.current2dPosition[1]);
        i++
      ) {
        if (current2dPosition[1] > this.current2dPosition[1]) {
          this.camera.position.add(this.yVector);
          this.camera.lookAt(this.target.add(this.yVector));
        } else {
          this.camera.position.sub(this.yVector);
          this.camera.lookAt(this.target.sub(this.yVector));
        }
      }
      this.current2dPosition = current2dPosition;
    }
  }
}
