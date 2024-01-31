import { makeAutoObservable, observable } from "mobx";
import React from "react";
import * as THREE from "three";
import CustomOrbitControl from "../controls/customOrbitControl";
import CustomZoomControl from "../controls/customZoomControl";
import CustomPanControl from "../controls/customPanControl";

export default class RenderSlice {
  renderer: THREE.WebGLRenderer;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
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

  constructor(canvas: HTMLCanvasElement) {
    makeAutoObservable(this, {
      renderer: observable,
      gl: observable,
      scene: observable,
      camera: observable,
    });
    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(
      canvas.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height
    );

    this.gl = this.renderer.getContext();
    this.scene = new THREE.Scene();
    this.canvas = canvas;

    // camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      canvas.getBoundingClientRect().width /
        canvas.getBoundingClientRect().height,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 10);
    this.target = this.camera.getWorldDirection(new THREE.Vector3());

    // all controls
    this.isOrbitControlTriggered = false;
    this.customOrbitControl = new CustomOrbitControl(this.camera, this.target);
    this.isZoomControlTriggered = false;
    this.customZoomControl = new CustomZoomControl(this.camera, this.target);
    this.isPanControlTriggered = false;
    this.customPanControl = new CustomPanControl(this.camera, this.target);
    this.initRenderControls();

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

  initRenderControls() {
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
