import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
// import SceneStore from "../../store/3d/scene.store";
// import CameraStore from "../../store/3d/camera.store";
import RenderStore from "../../store/3d/render.store";

const RenderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderStore = new RenderStore(canvasRef.current);
      const material0 = new THREE.MeshStandardMaterial({ emissive: "pink" });
      const material1 = new THREE.MeshStandardMaterial({ emissive: "red" });
      const material2 = new THREE.MeshStandardMaterial();
      const geometry0 = new THREE.PlaneGeometry(10, 0.5);
      const geometry1 = new THREE.PlaneGeometry(5, 1);
      const geometry2 = new THREE.PlaneGeometry(3, 2);

      const mesh0 = new THREE.Mesh(geometry0, material0);
      const mesh1 = new THREE.Mesh(geometry1, material0);
      const mesh2 = new THREE.Mesh(geometry2, material1);

      renderStore.scene.add(mesh0);
      renderStore.scene.add(mesh1);
      renderStore.scene.add(mesh2);
    }
  }, [canvasRef]);

  return <canvas className="w-full h-full" ref={canvasRef}></canvas>;
};

export default RenderCanvas;
