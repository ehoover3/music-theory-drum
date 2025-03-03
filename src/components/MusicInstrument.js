import React from "react";
import styles from "./MusicInstrument.module.css";

function MusicInstrument({ isPlaying, handleDrumTap }) {
  return (
    <div className={`${styles.drum} ${isPlaying ? styles.active : ""}`} onClick={handleDrumTap}>
      🥁
    </div>
  );
}

export default MusicInstrument;
