import React from "react";

function MusicInstrument({ isPlaying, handleDrumTap }) {
  return (
    <div className={`drum ${isPlaying ? "active" : ""}`} onClick={handleDrumTap}>
      🥁
    </div>
  );
}

export default MusicInstrument;
