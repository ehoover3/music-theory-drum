import React from "react";
import styles from "./MusicStaff.module.css";

function MusicStaff({ count }) {
  return (
    <div className={styles.notation}>
      <div className={styles.staffLine}></div>
      <div className={styles.notes}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`${styles.note} ${count === i ? styles.active : ""}`}>
            ♩
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicStaff;
