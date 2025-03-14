import React from "react";
import "./StartPauseButton.css";
import { FaPause, FaPlay } from "react-icons/fa";

const StartPauseButton = ({ isPlaying, setIsPlaying }) => {
  return (
    <div className='start-pause-button'>
      {!isPlaying ? (
        <button className='start-button' onClick={() => setIsPlaying(true)}>
          <FaPlay />
        </button>
      ) : (
        <button className='pause-button' onClick={() => setIsPlaying(false)}>
          <FaPause />
        </button>
      )}
    </div>
  );
};

export default StartPauseButton;
