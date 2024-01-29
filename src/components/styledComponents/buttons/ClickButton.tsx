import React from "react";
import styles from "./clickButtonStyle.module.css";

function ClickButton(props: any) {
  return <button className={styles.button} {...props}></button>;
}
export default ClickButton;
