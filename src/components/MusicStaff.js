import React from "react";
import styles from "./MusicStaff.module.css";

function MusicStaff({ count }) {
  const notes = [
    { symbol: "♩", beat: 1 },
    { symbol: "♩", beat: 2 },
    { symbol: "♩", beat: 3 },
    { symbol: "♩", beat: 4 },
  ];

  return (
    <div className={styles.notation}>
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
