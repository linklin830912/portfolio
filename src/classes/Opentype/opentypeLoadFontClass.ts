import * as THREE from "three";
import { load } from "opentype.js";
import { SVGLoader, SVGResult } from "three/examples/jsm/loaders/SVGLoader";

class OpentypeLoadFontClass {
  content: string;
  fontUrl: string;
  constructor(content: string, fontUrl: string) {
    this.content = content;
    this.fontUrl = fontUrl;
  }
  loadFontToSVGPath() {
    return new Promise<{
      d: string;
      viewBox: string;
      width: string;
      height: string;
    }>((resolve, reject) => {
      load(this.fontUrl, (err: Error, f: any) => {
        if (err) reject(err);

        const fontPath = f.getPath(this.content, 0, 0, 10)
          .commands as OpentypeCommand[];
        let svgPath = "";
        let minX: number | undefined = undefined;
        let maxX: number | undefined = undefined;
        let minY: number | undefined = undefined;
        let maxY: number | undefined = undefined;
        fontPath.forEach((command: OpentypeCommand) => {
          const commandLength = Object.values(command).length - 1;
          Object.values(command).forEach((value: unknown, index: number) => {
            if (index === 0) {
              // type
              svgPath = (svgPath as string) + ` ${value as unknown as string}`;
            } else if (index % 2 === 1) {
              //   x
              svgPath = (svgPath as string) + ` ${value as unknown as string}`;

              if (minX === undefined) minX = value as number;
              if (maxX === undefined) maxX = value as number;

              maxX = (value as number) > maxX ? (value as number) : maxX;
              minX = (value as number) < minX ? (value as number) : minX;
            } else if (index === commandLength) {
              svgPath = (svgPath as string) + ` ${value as unknown as string}`;

              if (minY === undefined) minY = value as number;
              if (maxY === undefined) maxY = value as number;

              maxY = (value as number) > maxY ? (value as number) : maxY;
              minY = (value as number) < minY ? (value as number) : minY;
            } else {
              //   y
              svgPath = (svgPath as string) + ` ${value as unknown as string},`;

              if (minY === undefined) minY = value as number;
              if (maxY === undefined) maxY = value as number;

              maxY = (value as number) > maxY ? (value as number) : maxY;
              minY = (value as number) < minY ? (value as number) : minY;
            }
          });
        });
        resolve({
          d: svgPath,
          viewBox: `${minX ?? 0} ${minY ?? 0} ${maxX ?? 0} ${
            (maxY ?? 0) - (minY ?? 0)
          }`,
          width: `${(maxX ?? 0) - (minX ?? 0)}px`,
          height: `${(maxY ?? 0) - (minY ?? 0)}px`,
        });
      });
    });
  }

  loadFontToSVG() {
    return new Promise<SVGResult>((resolve, reject) => {
      load(this.fontUrl, (err: Error, f: any) => {
        if (err) reject(err);

        const fontPath = f.getPath(this.content, 0, 0, 10)
          .commands as OpentypeCommand[];
        let svgPath = "";
        let minX: number | undefined = undefined;
        let maxX: number | undefined = undefined;
        let minY: number | undefined = undefined;
        let maxY: number | undefined = undefined;
        fontPath.forEach((command: OpentypeCommand) => {
          const commandLength = Object.values(command).length - 1;
          Object.values(command).forEach((value: unknown, index: number) => {
            if (index === 0) {
              // type
              svgPath = (svgPath as string) + ` ${value as unknown as string}`;
            } else if (index % 2 === 1) {
              //   x
              svgPath = (svgPath as string) + ` ${value as unknown as string}`;

              if (minX === undefined) minX = value as number;
              if (maxX === undefined) maxX = value as number;

              maxX = (value as number) > maxX ? (value as number) : maxX;
              minX = (value as number) < minX ? (value as number) : minX;
            } else if (index === commandLength) {
              svgPath = (svgPath as string) + ` ${value as unknown as string}`;

              if (minY === undefined) minY = value as number;
              if (maxY === undefined) maxY = value as number;

              maxY = (value as number) > maxY ? (value as number) : maxY;
              minY = (value as number) < minY ? (value as number) : minY;
            } else {
              //   y
              svgPath = (svgPath as string) + ` ${value as unknown as string},`;

              if (minY === undefined) minY = value as number;
              if (maxY === undefined) maxY = value as number;

              maxY = (value as number) > maxY ? (value as number) : maxY;
              minY = (value as number) < minY ? (value as number) : minY;
            }
          });
        });

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );

        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );

        svg.appendChild(path);

        svg.setAttribute(
          "viewBox",
          `${minX ?? 0} ${minY ?? 0} ${maxX ?? 0} ${(maxY ?? 0) - (minY ?? 0)}`
        );
        path.setAttribute("d", svgPath);
        svg.setAttribute("stroke", "red");
        svg.setAttribute("stroke-width", "5px");
        svg.setAttribute("fill", "transparent");
        svg.setAttribute("width", `${(maxX ?? 0) - (minX ?? 0)}px`);
        svg.setAttribute("height", `${(maxY ?? 0) - (minY ?? 0)}px`);

        const serializer = new XMLSerializer();
        const svgText = serializer.serializeToString(svg);
        const loader = new SVGLoader();
        const result = loader.parse(svgText);

        resolve(result);
      });
    });
  }

  loadFontToShape() {
    return new Promise<THREE.Shape>((resolve, reject) => {
      load(this.fontUrl, (err: Error, f: any) => {
        if (err) reject(err);
        const fontPath = f.getPath(this.content, 0, 0, 10)
          .commands as OpentypeCommand[];

        const shape = new THREE.Shape();

        fontPath.forEach((command: OpentypeCommand) => {
          switch (command.type) {
            case "M":
              shape.moveTo(command.x ?? 0, command.y ?? 0);
              break;
            case "L":
              shape.lineTo(command.x ?? 0, command.y ?? 0);
              break;
            case "Q":
              shape.quadraticCurveTo(
                command.x1 ?? 0,
                command.y1 ?? 0,
                command.x ?? 0,
                command.y ?? 0
              );
              break;
            case "Z":
              shape.closePath();
              break;
            default:
              console.log("!!!MISSING");
              break;
          }
        });

        resolve(shape);
      });
    });
  }
}

export { OpentypeLoadFontClass };

export type OpentypeCommand = {
  type: string;
  x1?: number;
  y1?: number;
  x?: number;
  y?: number;
};

export enum OpentypeFontPathTypeEnum {
  "M",
  "Q",
  "L",
  "z",
}
