import React, { useState } from "react";
import styles from "./openSectionStyle.module.css";

type openSectionProps = {
  label: string;
  children: JSX.Element | JSX.Element[];
  isDefaultOpen?: boolean;
};
function OpenSection(props: openSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(props.isDefaultOpen ?? true);
  return (
    <div className={styles.containerDiv}>
      <div className={styles.labelDiv}>
        <button onClick={(x) => setIsOpen(!isOpen)}>
          <label>{props.label}</label>

          <svg
            width={"10px"}
            viewBox="0 0 10 10"
            transform={`${isOpen ? "rotate(180) translate(0 5)" : ""}`}
          >
            <polyline points="0,0 5,5 10,0" />
          </svg>
        </button>
      </div>

      <div
        className={`${styles.contentDiv} ${
          isOpen ? styles.contentIsOpenDiv : ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default OpenSection;
