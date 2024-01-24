export default class CustomZoomControl {
  target: THREE.Vector3;
  camera: THREE.Camera;
  current2dPositionY?: number;

  constructor(camera: THREE.Camera, target: THREE.Vector3) {
    this.target = target;
    this.camera = camera;
  }
  startControlling(current2dPositionY: number) {
    this.current2dPositionY = current2dPositionY;
  }
  moveToPosition(current2dPositionY: number) {
    if ((this.camera as THREE.PerspectiveCamera) && this.current2dPositionY) {
      if (current2dPositionY < this.current2dPositionY) {
        (this.camera as THREE.PerspectiveCamera).fov =
          (this.camera as THREE.PerspectiveCamera).fov + 1;
        (this.camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      } else if (current2dPositionY > this.current2dPositionY) {
        (this.camera as THREE.PerspectiveCamera).fov =
          (this.camera as THREE.PerspectiveCamera).fov - 1;
        (this.camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }

      this.camera.lookAt(this.target);
      this.current2dPositionY = current2dPositionY;
    }
  }
}
