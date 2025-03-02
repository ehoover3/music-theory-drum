// src/components/StartPauseButton.js
import React from "react";

const StartPauseButton = ({ isPlaying, startGame, pauseGame }) => {
  return (
    <>
      {!isPlaying ? (
        <button className='start-button' onClick={startGame}>
          ▶️ Start
        </button>
      ) : (
        <button className='pause-button' onClick={pauseGame}>
          ⏸️ Pause
        </button>
      )}
    </>
  );
};

export default StartPauseButton;
