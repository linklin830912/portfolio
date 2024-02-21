import React, { useEffect, useState } from "react";
import styles from "./selectInputStyle.module.css";

type selectInputProps = {
  options: optionType[];
  title?: string;
  valueIndex?: number;
  onChange?: (index: number) => void;
};
export type optionType = { name: string; value: string };

function SelectInput(props: selectInputProps) {
  const [value, setValue] = useState<number>(props.valueIndex as number);

  useEffect(() => {
    if (value && props.onChange) {
      props.onChange(value);
    }
  }, [value]);

  return (
    <div className={styles.containerDiv}>
      {props.title && <label className={styles.label}>{props.title}</label>}
      <select
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value as unknown as number);
        }}
      >
        {props.options.map((x, index) => (
          <option key={index} value={index}>
            {x.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
