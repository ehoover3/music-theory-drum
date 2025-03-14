import React from "react";
import "./MusicInstrument.css";

function MusicInstrument({ isPlaying, startTime, setTaps }) {
  const drumSound = new Audio("/audio/drum.m4a");

  const handleMusicInstrumentTap = () => {
    drumSound.pause();
    drumSound.currentTime = 0;
    drumSound.play();
    const currentTime = Date.now() - startTime;
    setTaps((prevTaps) => [...prevTaps, currentTime]);
  };

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
