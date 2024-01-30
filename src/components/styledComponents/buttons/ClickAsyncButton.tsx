import React from "react";
import styles from "./clickAysncButtonStyle.module.css";

export enum AsyncStatus {
  done = 0,
  loading = 1,
  error = 2,
}

function ClickAysncButton(props: any) {
  return (
    <div className={styles.containerDiv}>
      <button className={styles.button} {...props}></button>

      {props.status === AsyncStatus.loading && (
        <svg viewBox="0 0 25 25" className={styles.loadingSvg}>
          <path
            d="M12,21V18m-6.36.36,2.12-2.12M3,12H6M5.64,5.64,7.76,7.76M12,
        3V6m6.36-.36L16.24,7.76M20,12H18M17,17l-.71-.71"
          ></path>
        </svg>
      )}
      {props.status === AsyncStatus.error && (
        <svg viewBox="0 0 25 25" className={styles.errorSvg}>
          <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z" />
          <path
            d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768
             1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661
              21h14.678c.708 0 1.349-.362 1.714-.968a1.989
               1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19 12 5.137 19.344 19H4.661z"
          />
        </svg>
      )}
    </div>
  );
}
export default ClickAysncButton;
