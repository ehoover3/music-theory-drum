import React from "react";
import "./MusicStaff.css";

function MusicStaff({ notes, count }) {
  return (
    <div className='MusicStaff'>
      <div className='StaffLine'></div>
      <div className='Notes'>
        {notes.map(({ symbol, beat }) => (
          <div key={beat} className={`"note" ${count === beat ? "active" : ""}`}>
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicStaff;
