import React, { useContext, useEffect, useRef, useState } from "react";
import RenderCanvasContext from "../../../context/3d/renderCanvasContext";
import * as THREE from "three";
import { CustomSVGLoader } from "../../../classes/3d/loaders/customSvgLoader";
import axios from "axios";
import { googleFont_NotoSans } from "../../../const/google.const";
import { load } from "opentype.js";

type textGeometryProps = {};
function TextGeometry(props: textGeometryProps) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("width", "100px");
  text.setAttribute("fill", "black");
  text.setAttribute("transform", "translate(10 20.5)");
  text.textContent = "Hello, SVG!";
  svg.appendChild(text);

  console.log(svg);
  const svgLoader = new CustomSVGLoader();

  // document.getElementById("testest")?.appendChild(svg);
  useEffect(() => {
    axios.get(googleFont_NotoSans).then((response) => {
      const pattern = /(?:{)([^{}]+)(?:})/g;
      const matches = response.data.match(pattern);

      const fontArray: Record<string, string>[] = [];
      matches?.forEach((rawData: string) => {
        const keyPattern = /(?<=\n|\r|^)\s*([^:\s]+)/g;
        const valuePattern = /:\s*([^;]+)/g;
        const keys = (rawData.match(keyPattern) as string[])
          .filter((x) => x !== "{" && x !== "}")
          ?.map((x) => x.replaceAll(" ", ""));
        const values = rawData
          .match(valuePattern)
          ?.map((x) => x.replaceAll(":", ""))
          ?.map((x) => x.replaceAll(" ", ""))
          ?.map((x) => x.replaceAll("'", ""));

        if (keys && values && keys.length === values.length) {
          const result: Record<string, string> = keys.reduce(
            (acc: Record<string, string>, key, index) => {
              acc[key] = values[index];
              return acc;
            },
            {}
          );
          fontArray.push(result);
        }
      });

      load(
        "http://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3SZ2oysoEQEeKwjgmXLRnTc.ttf",
        (err: Error, f: any) => {
          console.log("!!!", f);
        }
      );
    });
  }, []);

  return null;
}
export default TextGeometry;
