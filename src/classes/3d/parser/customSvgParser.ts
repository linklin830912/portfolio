import { FileLoader } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
class CustomSvgParser extends SVGLoader {
  parseWithoutLoad() {
    //   const scope = this;
    //   const loader = new FileLoader(scope.manager);
    //   loader.setPath(scope.path);
    //   loader.setRequestHeader(scope.requestHeader);
    //   loader.setWithCredentials(scope.withCredentials);
    //   loader.load(
    //     url,
    //     function (text) {
    //       try {
    //         onLoad(scope.parse(text));
    //       } catch (e) {
    //         if (onError) {
    //           onError(e);
    //         } else {
    //           console.error(e);
    //         }
    //         scope.manager.itemError(url);
    //       }
    //     },
    //     onProgress,
    //     onError
    //   );
  }
}
