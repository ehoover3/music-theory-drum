import React from "react";
import "./MusicNotes.css";

function MusicNotes({ gameAreaRef, notes }) {
  const getNoteClassName = (pitch) => {
    return `music-note ${pitch}`;
  };

  return (
    <div ref={gameAreaRef} className='game-area'>
      {notes.map((note) => (
        <div key={note.id} className={getNoteClassName(note.pitch || "F4")} style={{ left: `${note.position}%` }}></div>
      ))}
      <div className='target-line'></div>
    </div>
  );
}

export default MusicNotes;
