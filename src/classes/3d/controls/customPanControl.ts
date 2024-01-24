import * as THREE from "three";

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

export default CustomPanControl;
