import * as THREE from "three";
class ShaderMaterial {
  id: string;
  material: THREE.ShaderMaterial;
  constructor(id: string, vertexShader: string, fragmentShader: string) {
    this.id = id;
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }
}
export default ShaderMaterial;
