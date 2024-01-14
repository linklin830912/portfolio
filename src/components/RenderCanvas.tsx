import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function RenderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        50,
        canvasRef.current.getClientRects()[0].width /
          canvasRef.current.getClientRects()[0].height,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
      renderer.setSize(
        canvasRef.current.getClientRects()[0].width,
        canvasRef.current.getClientRects()[0].height
      );

      const geometry = new THREE.SphereGeometry(
        3,
        50,
        50,
        0,
        Math.PI * 2,
        0,
        Math.PI * 2
      );
      const material1 = new THREE.MeshBasicMaterial({ color: "red" });
      const material2 = new THREE.MeshBasicMaterial({ color: "red" });
      const sphere = [
        new THREE.Mesh(geometry, material1),
        new THREE.Mesh(geometry, material1),
        new THREE.Mesh(geometry, material2),
      ];

      sphere[0].position.set(1, 1, 1);
      sphere[1].position.set(-1, -1, -1);

      scene.add(sphere[0]);
      scene.add(sphere[1]);
      scene.add(sphere[2]);

      camera.position.z = 10;

      const render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      };

      render();
    }
  }, [canvasRef]);

  return (
    <canvas className="w-full h-full bg-pink-300" ref={canvasRef}></canvas>
  );
}

export default RenderCanvas;
