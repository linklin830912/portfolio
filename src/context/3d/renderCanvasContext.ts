import React, { createContext } from "react";
import RenderSlice from "../../classes/3d/slices/renderSlice";

const RenderCanvasContext = createContext<renderCanvasContext>({
  renderSlice: undefined,
});

export default RenderCanvasContext;
export type renderCanvasContext = {
  renderSlice?: RenderSlice;
};
