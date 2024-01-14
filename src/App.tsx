import React from "react";
import RenderCanvas from "./components/RenderCanvas";

function App() {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center relative">
      <div className="top-0 left-0 w-[75%] h-[75%] rounded-md">
        <RenderCanvas />
      </div>
    </div>
  );
}

export default App;
