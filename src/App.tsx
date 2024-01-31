import React from "react";
import RenderCanvas from "./components/3d/RenderCanvas";
import MenuPanel from "./components/account/panels/MenuPanel";
import {
  AccountContext,
  defaultAccountSlice,
} from "./context/account/accountContext";

const App = () => {
  return (
    <AccountContext.Provider value={{ accountSlice: defaultAccountSlice }}>
      <div className="w-[100vw] h-[100vh]">
        <div className="top-0 left-0 relative w-full h-full">
          <RenderCanvas />
        </div>
        <div className="top-0 left-0 absolute w-full h-full pointer-events-none">
          <MenuPanel />
        </div>
      </div>
    </AccountContext.Provider>
  );
};

export default App;
