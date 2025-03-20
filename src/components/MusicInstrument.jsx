import React from "react";
import "./MusicInstrument.css";

const MusicInstrument = ({ onDrumHit }) => {
  return (
    <div className='instrument-container'>
      <button className='drum-button' onClick={onDrumHit}>
        Hit Drum
      </button>
    </div>
  );
};

export default MusicInstrument;
