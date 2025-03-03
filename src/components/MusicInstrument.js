import React from "react";
import styles from "./MusicInstrument.module.css";

function MusicInstrument({ isPlaying, handleMusicInstrumentTap }) {
  return (
    <div className={`${styles.drum} ${isPlaying ? styles.active : ""}`} onClick={handleMusicInstrumentTap}>
      🥁
    </div>
  );
}

export default MusicInstrument;
