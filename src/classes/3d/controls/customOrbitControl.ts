import * as THREE from "three";

export default class CustomOrbitControl {
  target: THREE.Vector3;
  camera: THREE.Camera;

  current2dPosition?: [number, number];

  // const
  axisX: THREE.Vector3 = new THREE.Vector3(1, 0, 0);
  axisY: THREE.Vector3 = new THREE.Vector3(0, 1, 0);

  constructor(camera: THREE.Camera, target: THREE.Vector3) {
    this.target = target;
    this.camera = camera;
  }

  startControlling(current2dPosition: [number, number]) {
    this.current2dPosition = current2dPosition;
  }

  moveToPosition(current2dPosition: [number, number]) {
    if (this.current2dPosition) {
      const stepX = current2dPosition[0] - this.current2dPosition[0];
      const stepY = current2dPosition[1] - this.current2dPosition[1];

      const vec = this.camera.position;
      vec.applyAxisAngle(this.axisY, (Math.PI / 180) * -stepX);
      vec.applyAxisAngle(this.axisX, (Math.PI / 180) * -stepY);

      this.camera.position.copy(vec);
      this.camera.lookAt(this.target);

      this.current2dPosition = current2dPosition;
    }
  }
}
