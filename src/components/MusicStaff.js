import React from "react";
import styles from "./MusicStaff.module.css";

function MusicStaff({ notes, count }) {
  return (
    <div className={styles.musicStaff}>
      <div className={styles.staffLine}></div>
      <div className={styles.notes}>
        {notes.map(({ symbol, beat }) => (
          <div key={beat} className={`${styles.note} ${count === beat ? styles.active : ""}`}>
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicStaff;
