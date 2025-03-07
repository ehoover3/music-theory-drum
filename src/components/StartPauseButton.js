// src/components/StartPauseButton.js
import React from "react";
import "./StartPauseButton.css";
import { FaPause, FaPlay } from "react-icons/fa";

const StartPauseButton = ({ isPlaying, startGame, pauseGame }) => {
  return (
    <div className='StartPauseButton'>
      {!isPlaying ? (
        <button className='startButton' onClick={startGame}>
          <FaPlay />
        </button>
      ) : (
        <button className='pauseButton' onClick={pauseGame}>
          <FaPause />
        </button>
      )}
    </div>
  );
};

export default StartPauseButton;
