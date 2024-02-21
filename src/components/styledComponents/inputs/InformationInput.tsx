import React, { useState } from "react";
import styles from "./informationInputStyle.module.css";

function InformationInput(props: any) {
  const [haveValue, setHaveValue] = useState<boolean>(
    props.value !== undefined
  );

  return (
    <div className={styles.containerDiv}>
      <input
        {...props}
        className={`${styles.input} ${haveValue ? styles.input_haveValue : ""}`}
        onChange={(e) => {
          if (e.target.value && e.target.value !== "") {
            setHaveValue(true);
          } else {
            setHaveValue(false);
          }
          if (props.onChange) props.onChange(e);
        }}
      />
      <label className={styles.label}>{props.title ?? ""}</label>
    </div>
  );
}

export default InformationInput;
