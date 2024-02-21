import React, { useEffect, useState } from "react";
import AddModelPanel from "./AddModelPanel";
import FontPanel from "./FontPanel";

function ModelPanel() {
  const [fontModelsCount, setFontModelsCount] = useState<number[]>([]);
  useEffect(() => {
    console.log(fontModelsCount);
  }, [fontModelsCount]);
  return (
    <div className="w-full h-fit">
      <div>
        <AddModelPanel
          onFontModelClick={() => {
            setFontModelsCount([
              ...fontModelsCount,
              fontModelsCount.length + 1,
            ]);
          }}
        />
      </div>
      <div className="mt-2">
        {fontModelsCount.length > 0 &&
          fontModelsCount.map((x, index) => (
            <FontPanel
              key={index}
              onFontUrlChange={function (fontUrl: string): void {
                console.log("!!!onFontUrlChange");
              }}
            />
          ))}
      </div>
    </div>
  );
}
export default ModelPanel;
