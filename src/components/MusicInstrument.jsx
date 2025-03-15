import React from "react";
import "./MusicInstrument.css";

function MusicInstrument({ isPlaying, startTime, setTaps }) {
  const drumSound = new Audio("/audio/drum.m4a");

  const playSound = () => {
    drumSound.pause();
    drumSound.currentTime = 0;
    drumSound.play();
  };

  const onClick = () => {
    playSound();
    const currentTime = Date.now() - startTime;
    setTaps((prevTaps) => [...prevTaps, currentTime]);
  };

  return (
    <button className={`music-instrument ${isPlaying ? "active" : ""}`} onClick={onClick} aria-label='Drum'>
      🥁
    </button>
  );
}

export default MusicInstrument;
