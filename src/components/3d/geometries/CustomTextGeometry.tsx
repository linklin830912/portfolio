import React, { useContext, useEffect, useRef, useState } from "react";
import RenderCanvasContext from "../../../context/3d/renderCanvasContext";
import * as THREE from "three";
import { OpentypeLoadFontClass } from "../../../classes/Opentype/opentypeLoadFontClass";
import { SVGLoader, SVGResult } from "three/examples/jsm/loaders/SVGLoader";

type textGeometryProps = {};

function CustomTextGeometry(props: textGeometryProps) {
  // const svgRef = useRef<SVGSVGElement>(null);

  const { renderSlice } = useContext(RenderCanvasContext);

  useEffect(() => {
    const fontLoader = new OpentypeLoadFontClass(
      // "o",
      "人類社会を承認",
      "https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFE8j75vY0rw-oME.ttf"
      // "http://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3SZ2oysoEQEeKwjgmXLRnTc.ttf"
    );
    fontLoader.loadFontToSVG().then((result: SVGResult) => {
      const group = new THREE.Group();
      const material = new THREE.MeshBasicMaterial({
        color: "blue",
        opacity: 1,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      result.paths.forEach((path) => {
        path.subPaths.forEach((subPath) => {
          const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), {
            strokeColor: "blue",
            strokeWidth: 0.1,
            strokeLineJoin: "round",
            strokeLineCap: "",
            strokeMiterLimit: 0,
          });
          const mesh = new THREE.Mesh(geometry, material);
          group.add(mesh);
        });
      });
      renderSlice?.scene?.add(group);
    });
  }, []);

  return null;
}
export default CustomTextGeometry;
