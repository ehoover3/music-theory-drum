import React from "react";

const StaffLine = ({ sheetMusic, playheadPosition }) => {
  return (
    <div className='staff-line'>
      {/* Staff lines */}
      <div className='staff'>
        <div className='staff-line line-1'></div>
        <div className='staff-line line-2'></div>
        <div className='staff-line line-3'></div>
        <div className='staff-line line-4'></div>
        <div className='staff-line line-5'></div>
      </div>

      {/* Stationary playhead */}
      <div className='playhead stationary'></div>

      {/* Notes that will move */}
      <div className='notes'>
        {sheetMusic.map((note) => {
          // Calculate the position from left side as notes move right to left
          const position = note.position - playheadPosition;

          // Only render notes that are visible in the staff area
          if (position >= -10 && position <= 110) {
            return (
              <div key={note.id} className={`note ${note.type}`} style={{ left: `${position}%` }}>
                {note.type === "quarter" ? "♩" : "♪"}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default StaffLine;
