import React from "react";
import styles from "./layoutStyle.module.css";

type layoutProps = {
  childCanvas: JSX.Element;
  childMenu: JSX.Element;
};

function Layout(props: layoutProps) {
  return (
    <div className={styles.containerDiv}>
      <div className={styles.canvasDiv}>{props.childCanvas}</div>
      <div className={styles.editDiv}>{props.childMenu}</div>
    </div>
  );
}
export default Layout;
