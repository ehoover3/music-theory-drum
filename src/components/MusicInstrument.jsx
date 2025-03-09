import React from "react";
import "./MusicInstrument.css";

function MusicInstrument({ isPlaying, handleMusicInstrumentTap }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleMusicInstrumentTap();
    }
  };

  return (
    <div className={`music-instrument ${isPlaying ? "active" : ""}`} role='button' tabIndex={0} onClick={handleMusicInstrumentTap} onKeyDown={handleKeyDown}>
      🥁
    </div>
  );
}

export default MusicInstrument;
