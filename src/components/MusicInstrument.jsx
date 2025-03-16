import React from "react";
import "./MusicInstrument.css";

function MusicInstrument({ addDot }) {
  return (
    <button className='music-instrument' onClick={addDot}>
      🥁
    </button>
  );
}

export default MusicInstrument;
