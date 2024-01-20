import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
import SceneStore from "../../store/3d/scene.store";
import CameraStore from "../../store/3d/camera.store";
import RenderStore from "../../store/3d/render.store";

const RenderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const sceneStore = new SceneStore();
      const cameraStore = new CameraStore(
        new THREE.PerspectiveCamera(
          50,
          canvasRef.current.getClientRects()[0].width /
            canvasRef.current.getClientRects()[0].height,
          0.1,
          1000
        )
      );
      const renderStore = new RenderStore(
        canvasRef.current,
        sceneStore.scene,
        cameraStore.camera
      );
      const geometry = new THREE.PlaneGeometry(3, 1);
      const material = new THREE.MeshBasicMaterial({ color: "pink" });
      sceneStore.addSceneMesh(geometry, material, "pinkBall");
    }
  }, [canvasRef]);

  return <canvas className="w-full h-full" ref={canvasRef}></canvas>;
};

export default RenderCanvas;
