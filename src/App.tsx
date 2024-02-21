import React, { useEffect, useRef, useState } from "react";
import RenderCanvas from "./components/3d/RenderCanvas";
import {
  AccountContext,
  defaultAccountSlice,
} from "./context/account/accountContext";
import MenuPanel from "./components/menu/MenuPanel";
import Layout from "./components/styledComponents/layout/Layout";
import TextGeometry from "./components/3d/geometries/CustomTextGeometry";
import { OpentypeLoadFontClass } from "./classes/Opentype/opentypeLoadFontClass";
import * as THREE from "three";
import RenderCanvasContext from "./context/3d/renderCanvasContext";
import RenderSlice from "./classes/3d/slices/renderSlice";
import SelectInput from "./components/styledComponents/inputs/SelectInput";

const App = () => {
  return (
    <AccountContext.Provider value={{ accountSlice: defaultAccountSlice }}>
      <RenderCanvasContext.Provider value={{ renderSlice: new RenderSlice() }}>
        <Layout childCanvas={<RenderCanvas />} childMenu={<MenuPanel />} />
      </RenderCanvasContext.Provider>
    </AccountContext.Provider>
  );
};

export default App;
