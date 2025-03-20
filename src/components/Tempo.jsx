import React from "react";
import "./Tempo.css";

function Tempo({ bpm, handleBpmChange }) {
  const bpmOptions = Array.from({ length: (240 - 30) / 10 + 1 }, (_, i) => 30 + i * 10);

  return (
    <div className='tempo'>
      <div className='bpm-control'>
        <label htmlFor='bpm' className='bpm-label'>
          BPM:
        </label>
        <select id='bpm' value={bpm} onChange={handleBpmChange} className='bpm-dropdown'>
          {bpmOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Tempo;
