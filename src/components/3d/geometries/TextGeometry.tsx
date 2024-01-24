import React, { useContext, useEffect, useRef, useState } from "react";
import RenderCanvasContext, {
  renderCanvasContext,
} from "../../../context/3d/renderCanvasContext";
import * as THREE from "three";

type textGeometryProps = { textInput: string };
function TextGeometry(props: textGeometryProps) {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const { renderSlice } = useContext(RenderCanvasContext);

  useEffect(() => {
    if (textCanvasRef.current) {
      const cxt = textCanvasRef.current.getContext("2d");
      setContext(cxt);
    }
  }, [textCanvasRef]);

  useEffect(() => {
    if (textCanvasRef.current && context) {
      context.clearRect(-100, -100, 500, 500);
      context.font = "50px serif";
      context.strokeText(props.textInput, 0, 50);
      // context.fillText(props.textInput, 0, 50);
    }
  }, [textCanvasRef, props.textInput]);

  useEffect(() => {
    if (renderSlice) {
      const material0 = new THREE.MeshStandardMaterial({ emissive: "pink" });
      const material1 = new THREE.MeshStandardMaterial({ emissive: "red" });
      const material2 = new THREE.MeshStandardMaterial();
      const geometry0 = new THREE.PlaneGeometry(10, 0.5);
      const geometry1 = new THREE.PlaneGeometry(5, 1);
      const geometry2 = new THREE.PlaneGeometry(3, 2);

      const mesh0 = new THREE.Mesh(geometry0, material0);
      const mesh1 = new THREE.Mesh(geometry1, material0);
      const mesh2 = new THREE.Mesh(geometry2, material1);

      renderSlice.scene.add(mesh0);
      renderSlice.scene.add(mesh1);
      renderSlice.scene.add(mesh2);
    }
  }, [renderSlice]);

  return <canvas className="bg-green-100" ref={textCanvasRef}></canvas>;
}
export default TextGeometry;
