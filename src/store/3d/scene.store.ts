import { action, observable } from "mobx";
import * as THREE from "three";

export type transformMeshProps = Partial<{
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}>;

export default class SceneStore {
  @observable scene: THREE.Scene;

  @action addSceneMesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    name: string
  ) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    this.scene.add(mesh);
  }

  @action transformSceneMesh(name: string, props: transformMeshProps) {
    const { position, rotation, scale } = props;
    const mesh = this.scene.getObjectByName(name);
    if (mesh) {
      if (position) {
        mesh?.position.set(position[0], position[1], position[2]);
      }
      if (rotation) {
        mesh?.rotation.set(rotation[0], rotation[1], rotation[2]);
      }
      if (scale) {
        mesh?.scale.set(scale[0], scale[1], scale[2]);
      }
    }
  }

  @action getSceneMesh(name: string) {
    return this.scene.getObjectByName(name);
  }

  constructor() {
    this.scene = new THREE.Scene();
  }
}
