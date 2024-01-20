import { action, observable } from "mobx";
import React from "react";
import * as THREE from "three";

export default class CameraStore {
  @observable camera: THREE.Camera;
  constructor(camera: THREE.Camera) {
    this.camera = camera;
    camera.position.set(0, 0, 10);
  }
}
