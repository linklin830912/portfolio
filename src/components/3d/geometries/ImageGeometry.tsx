import React, { useContext, useEffect, useState } from "react";
import RenderCanvasContext from "../../../context/3d/renderCanvasContext";
import * as THREE from "three";
import { getCloudFrontCDNRoute } from "../../../const/aws.const";

function ImageGeometry() {
  const { renderSlice } = useContext(RenderCanvasContext);

  const _VS = `
        varying vec2 vUv;
        uniform sampler2D uImage;

        void main() {
        vUv = uv;
        float z = texture2D(uImage, vUv).x;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
    }`;
  const _FS = `
        varying vec2 vUv;
        uniform sampler2D uImage;

        void main() {
          vec4 color = texture2D(uImage, vUv);
          float opacity = 1.0;
          if(color.x<0.1){
            opacity = 0.0;
          }
        gl_FragColor = vec4(color.x, color.y, 0.0, 1.0);
    }`;

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(1, 1, 1000, 1000);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    const texture = textureLoader.load(
      getCloudFrontCDNRoute("/try/sample.jpg")
    );
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: _VS,
      fragmentShader: _FS,
      uniforms: {
        uImage: {
          value: texture,
        },
      },
    });
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    const light = new THREE.AmbientLight("white");

    light.intensity = 2;
    renderSlice?.scene?.add(mesh);
    renderSlice?.scene?.add(light);
  }, [renderSlice?.scene]);

  return null;
}

export default ImageGeometry;
