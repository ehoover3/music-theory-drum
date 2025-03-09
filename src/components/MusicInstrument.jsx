import React from "react";
import "./MusicInstrument.css";

function MusicInstrument({ isPlaying, handleMusicInstrumentTap }) {
  return (
    <div className={`MusicInstrument ${isPlaying ? "active" : ""}`} onClick={handleMusicInstrumentTap}>
      🥁
    </div>
  );
}

export default MusicInstrument;
