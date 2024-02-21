import React, { useEffect, useState } from "react";
import AccountPanel from "../account/panels/AccountPanel";
import OpenSection from "../styledComponents/sections/OpenSection";
import ModelPanel from "../model/panels/ModelPanel";

function MenuPanel() {
  return (
    <>
      <OpenSection label="account" isDefaultOpen>
        <AccountPanel
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </OpenSection>
      <OpenSection label="model">
        <ModelPanel />
      </OpenSection>
    </>
  );
}

export default MenuPanel;
