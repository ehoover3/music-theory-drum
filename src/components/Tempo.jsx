import React from "react";
import "./Tempo.css";

function Tempo({ bpm, handleBpmChange }) {
  const allowedNumbers = [60, 70, 80, 90, 100, 110, 120];

  return (
    <div className='tempo'>
      <div className='bpm-control'>
        <label htmlFor='bpm' className='bpm-label'>
          BPM:
        </label>
        <input id='bpm' type='range' min='30' max='240' value={bpm} onChange={handleBpmChange} className='bpm-slider' />
        <span className='bpm-value'>{bpm}</span>
      </div>
    </div>
  );
}

export default Tempo;
