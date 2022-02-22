import React from "react";
import styles from "./Hero.module.css";

type Props = {
  children: React.ReactNode;
};

export function Hero({ children }: Props) {
  return (
    <div className={styles.hero}>
      <span className={styles.heading}>{children}</span>
    </div>
  );
}
