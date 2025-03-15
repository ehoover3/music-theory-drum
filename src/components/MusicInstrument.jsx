import React from "react";
import "./MusicInstrument.css";

function MusicInstrument({ count, isPlaying, setTaps }) {
  const drumSound = new Audio("/audio/drum.m4a");

  const playSound = () => {
    drumSound.pause();
    drumSound.currentTime = 0;
    drumSound.play();
  };

  const onClick = () => {
    playSound();
    const currentTime = Math.floor(Date.now() / 1000);
    setTaps((prevTaps) => [...prevTaps, currentTime]);
  };

  return (
    <button className={`music-instrument ${isPlaying ? "active" : ""}`} onClick={onClick} aria-label='Drum'>
      🥁
    </button>
  );
}

export default MusicInstrument;
