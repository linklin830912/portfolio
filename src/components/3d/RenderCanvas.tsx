import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import RenderSlice from "../../classes/3d/slices/renderSlice";
import TextGeometry from "./geometries/CustomTextGeometry";
import RenderCanvasContext from "../../context/3d/renderCanvasContext";
import postTextContents from "../../api/textContent/postTextContents";
import ImageGeometry from "./geometries/ImageGeometry";
import SvgGeometry from "./geometries/SvgGeometry";
import CustomTextGeometry from "./geometries/CustomTextGeometry";

const RenderCanvas = () => {
  const { renderSlice } = useContext(RenderCanvasContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderSlice?.init(canvasRef.current);
    }
  }, [canvasRef]);

  // const canvasContainerRef = useRef<HTMLDivElement>(null);

  // const [renderSlice, setRenderSlice] = useState<RenderSlice>();

  // useEffect(() => {
  //   if (canvasContainerRef.current) {
  //     const canvas = document.createElement("canvas");
  //     canvasContainerRef.current.appendChild(canvas);

  //     canvas.style.width = "100%";
  //     canvas.style.height = "100%";
  //     canvas.width = canvasContainerRef.current.getBoundingClientRect().width;
  //     canvas.height = canvasContainerRef.current.getBoundingClientRect().height;

  //     setRenderSlice(new RenderSlice(canvas));
  //   }
  // }, [canvasContainerRef]);

  const [text, setText] = useState<string>("");

  // const handleTextGeometryInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setText(e.target.value ?? "");
  // };

  // return (
  //   <div className="w-full h-full" id="renderCanvasDiv">

  //     <div className="w-full h-full" id="renderCanvasDiv" ref={canvasContainerRef}>
  //     <div className="w-full h-full" id="testest">
  //       <TextGeometry />
  //     </div>
  //     <RenderCanvasContext.Provider value={{ renderSlice: renderSlice }}>
  //       <ImageGeometry />
  //       <SvgGeometry />
  //       <TextGeometry />
  //     </RenderCanvasContext.Provider>
  //   </div>
  // );

  return (
    <>
      <canvas className="w-full h-full" ref={canvasRef} />
      <CustomTextGeometry />
    </>
  );
};

export default RenderCanvas;
