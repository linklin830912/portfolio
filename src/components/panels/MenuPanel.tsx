import React, { useEffect, useState } from "react";
import ClickButton from "../styledComponents/buttons/ClickButton";
import InformationInput from "../styledComponents/inputs/InformationInput";
import AccountPanel from "./AccountPanel";

function MenuPanel() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
