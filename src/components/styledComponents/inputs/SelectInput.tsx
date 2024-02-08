import React, { useEffect, useState } from "react";
import styles from "./selectInputStyle.module.css";

type selectInputProps = {
  options: optionType[];
  title?: string;
  placeHolder?: string;
  onChange?: (index: number) => void;
};
export type optionType = { name: string; value: string };
function SelectInput(props: selectInputProps) {
  const [value, setValue] = useState<number>();
  useEffect(() => {
    if (value && props.onChange) {
      props.onChange(value);
    }
  }, [value]);
  return (
    <div className={styles.containerDiv}>
      {props.title && <label className={styles.label}>{props.title}</label>}
      <div className={styles.hoverEventDiv}>
        <div className={styles.selectDiv}>
          {(value ?? -1) === -1
            ? props.placeHolder
            : props.options[value ?? -1].name}
        </div>
        <div className={styles.optionDiv}>
          {props.options.map((x, index) => (
            <div
              key={index}
              onClick={() => {
                setValue(index);
              }}
            >
              {x.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectInput;
