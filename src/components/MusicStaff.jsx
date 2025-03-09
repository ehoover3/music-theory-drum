import React from "react";
import "./MusicStaff.css";

function MusicStaff({ notes, count }) {
  return (
    <div className='music-staff'>
      <div className='blank-space'></div>
      <div className='notes'>
        {notes.map(({ symbol, beat }) => (
          <div key={beat} className={`note ${count === beat ? "active" : ""}`}>
            {symbol}
          </div>
        ))}
      </div>
      <div className='blank-space'></div>
    </div>
  );
}

export default MusicStaff;
