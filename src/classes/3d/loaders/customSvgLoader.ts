import { FileLoader } from "three";
import { SVGLoader, SVGResult } from "three/examples/jsm/loaders/SVGLoader";

class CustomSVGLoader extends SVGLoader {
  customLoad(
    url: string,
    onLoad: (
      data: SVGResult & {
        viewBox: { x: number; y: number; width: number; height: number } | null;
      }
    ) => void,
    onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined,
    onError?: ((err: unknown) => void) | undefined
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const scope = this;

    const loader = new FileLoader(scope.manager);
    loader.setPath(scope.path);
    loader.setRequestHeader(scope.requestHeader);
    loader.setWithCredentials(scope.withCredentials);
    loader.load(
      url,
      function (text) {
        try {
          const viewBox = scope.parseViewBox(text as string);
          onLoad({ ...scope.parse(text as string), viewBox: viewBox });
        } catch (e) {
          if (onError) {
            onError(e);
          } else {
            console.error(e);
          }

          scope.manager.itemError(url);
        }
      },
      onProgress,
      onError
    );
  }

  parseViewBox(text: string): viewBoxType | null {
    const xml = new DOMParser().parseFromString(
      text as string,
      "image/svg+xml"
    );
    if (
      xml.documentElement.nodeName === "svg" &&
      xml.documentElement.hasAttribute("viewBox")
    ) {
      const vwBx = xml.documentElement.getAttribute("viewBox");

      try {
        const v = vwBx?.split(" ");
        if (v)
          return {
            x: v[0] as unknown as number,
            y: v[1] as unknown as number,
            width: v[2] as unknown as number,
            height: v[3] as unknown as number,
          } as viewBoxType;
      } catch {
        return null;
      }
    }
    return null;
  }
}

export type viewBoxType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export { CustomSVGLoader };
