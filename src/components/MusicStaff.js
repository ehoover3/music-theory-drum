import React from "react";

function MusicStaff({ count }) {
  return (
    <div className='notation'>
      <div className='staff-line'></div>
      <div className='notes'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`note ${count === i ? "active" : ""}`}>
            ♩
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicStaff;
