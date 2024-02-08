import React, { useEffect, useState } from "react";
import AccountPanel from "./AccountPanel";
import SelectInput from "../../styledComponents/inputs/SelectInput";
import FontPanel from "../../font/FontPanel";

function MenuPanel() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [fontUrl, setFontUrl] = useState<string>();

  useEffect(() => {
    console.log("!!!fontUrl", fontUrl);
  });
  return (
    <div
      className={
        "w-full h-full pointer-events-none relative flex items-center justify-center"
      }
    >
      {isMenuOpen && (
        <AccountPanel
          onClose={() => {
            setIsMenuOpen(false);
          }}
        />
      )}

      <FontPanel onFontUrlChange={setFontUrl} />
      <button
        className="absolute bottom-0 right-0 pointer-events-auto"
        onClick={() => {
          setIsMenuOpen(true);
        }}
      >
        open
      </button>
    </div>
  );
}

export default MenuPanel;
