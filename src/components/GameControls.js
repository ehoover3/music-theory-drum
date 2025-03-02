// components/GameControls.js
import React from "react";

const GameControls = ({ isPlaying, onTogglePlay, onReset, tempo, onTempoChange }) => {
  return (
    <div className='game-controls'>
      <button onClick={onTogglePlay} className='control-btn'>
        {isPlaying ? "Pause" : "Start"}
      </button>
      <button onClick={onReset} className='control-btn'>
        Reset
      </button>
      <div className='tempo-control'>
        <label htmlFor='tempo'>Tempo: {tempo} BPM</label>
        <input type='range' id='tempo' min='40' max='200' value={tempo} onChange={(e) => onTempoChange(Number(e.target.value))} />
      </div>
    </div>
  );
};

export default GameControls;
