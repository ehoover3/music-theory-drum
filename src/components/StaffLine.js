// components/StaffLine.js
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

      {/* Notes */}
      <div className='notes'>
        {sheetMusic.map((note) => (
          <div key={note.id} className={`note ${note.type}`} style={{ left: `${note.position}%` }}>
            {note.type === "quarter" ? "♩" : "♪"}
          </div>
        ))}
      </div>

      {/* Playhead */}
      <div className='playhead' style={{ left: `${playheadPosition}%` }}></div>
    </div>
  );
};

export default StaffLine;
