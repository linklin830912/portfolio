import React, { useState } from "react";
import * as THREE from "three";
import ClickButton from "../../styledComponents/buttons/ClickButton";

type addModelPanelProps = {
  onFontModelClick: () => void;
};

function AddModelPanel(props: addModelPanelProps) {
  return (
    <div className="w-full h-fit flex flex-wrap">
      <div className="mr-1">
        <ClickButton
          onClick={() => {
            props.onFontModelClick();
          }}
        >
          + Font
        </ClickButton>
      </div>
      <div className="mr-1">
        <ClickButton>+ Image</ClickButton>
      </div>
      <div>
        <ClickButton>+ Geometry</ClickButton>
      </div>
    </div>
  );
}

export default AddModelPanel;
