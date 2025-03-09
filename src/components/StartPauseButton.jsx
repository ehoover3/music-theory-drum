import React from "react";
import "./StartPauseButton.css";
import { FaPause, FaPlay } from "react-icons/fa";

const StartPauseButton = ({ isPlaying, startGame, pauseGame }) => {
  return (
    <div className='start-pause-button'>
      {!isPlaying ? (
        <button className='start-button' onClick={startGame}>
          <FaPlay />
        </button>
      ) : (
        <button className='pause-button' onClick={pauseGame}>
          <FaPause />
        </button>
      )}
    </div>
  );
};

export default StartPauseButton;
