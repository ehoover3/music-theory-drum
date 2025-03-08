import React from "react";
import "./MusicStaff.css";

function MusicStaff({ notes, count }) {
  return (
    <div className='MusicStaff'>
      <div className='Notes'>
        {notes.map(({ symbol, beat }) => (
          <div key={beat} className={`Note ${count === beat ? "Active" : ""}`}>
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicStaff;
