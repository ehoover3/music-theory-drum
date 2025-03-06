import React from "react";
import styles from "./ProgressBar.module.css";

function ProgressBar({ userTappedMeasureCorrectlyCount }) {
  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBar}
        style={{
          width: `${Math.min(userTappedMeasureCorrectlyCount * 33.33, 100)}%`,
        }}></div>
    </div>
  );
}

export default ProgressBar;
