import React from "react";
import RenderCanvas from "./components/3d/RenderCanvas";

const App = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">
      <RenderCanvas />
    </div>
  );
};

export default App;
