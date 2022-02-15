import React from "react";
import styles from "./Button.module.css";

type Props = {
  children: React.ReactNode;
};

export function Button({ children }: Props) {
  console.log(styles);
  return (
    <button className={styles.btn}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
