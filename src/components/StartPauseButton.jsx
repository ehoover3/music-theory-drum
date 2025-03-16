import React from "react";
import "./StartPauseButton.css";
import { FaPause, FaPlay } from "react-icons/fa";

const StartPauseButton = ({ isRunning, toggleMetronome }) => {
  return (
    <button className='start-pause-button' onClick={toggleMetronome}>
      {isRunning ? <FaPlay /> : <FaPause />}
    </button>
  );
};

export default StartPauseButton;
