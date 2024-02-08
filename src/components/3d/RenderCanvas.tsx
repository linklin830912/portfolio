import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import RenderSlice from "../../classes/3d/slices/renderSlice";
import TextGeometry from "./geometries/TextGeometry";
import RenderCanvasContext from "../../context/3d/renderCanvasContext";
import postTextContents from "../../api/textContent/postTextContents";
import ImageGeometry from "./geometries/ImageGeometry";
import SvgGeometry from "./geometries/SvgGeometry";

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

  // const [text, setText] = useState<string>("");

  // const handleTextGeometryInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setText(e.target.value ?? "");
  // };

  return (
    <div className="w-full h-full" ref={canvasContainerRef}>
      <div className="w-full h-full" id="testest">
        <TextGeometry />
      </div>
      {/* <RenderCanvasContext.Provider value={{ renderSlice: renderSlice }}>
        <ImageGeometry />
        <SvgGeometry />
        <TextGeometry />
      </RenderCanvasContext.Provider> */}
    </div>
  );
};

export default RenderCanvas;
