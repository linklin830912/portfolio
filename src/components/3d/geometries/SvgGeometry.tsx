import React, { useContext } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from "three";
import { cloudFrontCDNRoute } from "../../../const/aws.const";
import RenderCanvasContext from "../../../context/3d/renderCanvasContext";
import { CustomSVGLoader } from "../../../classes/3d/loaders/customSvgLoader";

function SvgGeometry() {
  const { renderSlice } = useContext(RenderCanvasContext);
  const svgLoader = new CustomSVGLoader();
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  svgLoader.customLoad(cloudFrontCDNRoute("/icon/error.svg"), (data) => {
    data.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape) => {
        const geometry = new THREE.ShapeGeometry(shape);
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      });
    });

    renderSlice?.scene.add(group);
    if (data.viewBox) {
      group.position.set(-data.viewBox.width / 2, -data.viewBox.height / 2, 1);
    }
  });
  return null;
}

export default SvgGeometry;
