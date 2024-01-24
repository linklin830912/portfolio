import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import * as THREE from "three";
// import SceneStore from "../../store/3d/scene.store";
// import CameraStore from "../../store/3d/camera.store";
import RenderSlice from "../../classes/3d/slices/renderSlice";
import TextGeometry from "./geometries/TextGeometry";
import RenderCanvasContext from "../../context/3d/renderCanvasContext";

const RenderCanvas = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [renderSlice, setRenderSlice] = useState<RenderSlice>();

  useEffect(() => {
    if (canvasContainerRef.current) {
      const canvas = document.createElement("canvas");
      canvasContainerRef.current.appendChild(canvas);

      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvasContainerRef.current.getBoundingClientRect().width;
      canvas.height = canvasContainerRef.current.getBoundingClientRect().height;

      setRenderSlice(new RenderSlice(canvas));
    }
  }, [canvasContainerRef]);

  const [text, setText] = useState<string>("");

  const handleTextGeometryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setText(e.target.value ?? "");
  };

  return (
    <div className="w-full h-full bg-blue-200" ref={canvasContainerRef}>
      <RenderCanvasContext.Provider value={{ renderSlice: renderSlice }}>
        <TextGeometry textInput={text} />
        <input
          type="text"
          className="bg-red-100"
          onChange={handleTextGeometryInputChange}
        />
      </RenderCanvasContext.Provider>
    </div>
  );
};

export default RenderCanvas;
