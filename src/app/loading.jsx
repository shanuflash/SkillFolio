import React from "react";
import styles from "@/styles/profile.module.css";

const loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <div className={styles.text}>Loading...</div>
    </div>
  );
};

export default loading;
