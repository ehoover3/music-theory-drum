import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import ProgressBar from "./components/ProgressBar.jsx";
import InformationBar from "./components/InformationBar.jsx";
import MusicNotes from "./components/MusicNotes.jsx";
import MusicInstrument from "./components/MusicInstrument.jsx";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState([]);
  const gameAreaRef = useRef(null);
  const targetLine = 10; // The target line position (percentage)

  // Every 2 seconds, a new note is added to the notes state.
  // Each note starts at position: 100
  // Date.now() is used as a unique id.
  useEffect(() => {
    const interval = setInterval(() => {
      setNotes((prevNotes) => [...prevNotes, { id: Date.now(), position: 100 }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Runs every 50ms to update each note's position.
  // Notes move by decreasing position by 2 on each tick.
  //  Notes are removed when they move past position > 0.
  useEffect(() => {
    const moveNotes = setInterval(() => {
      setNotes((prevNotes) => prevNotes.map((note) => ({ ...note, position: note.position - 2 })).filter((note) => note.position > 0));
    }, 50);
    return () => clearInterval(moveNotes);
  }, []);

  // When the player hits the drum, the function checks for notes close to targetLine (±5 range).
  // If a note is hit: It is removed from notes. progress increases by 10, up to a maximum of 100.
  const handleDrumHit = () => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        if (Math.abs(note.position - targetLine) < 5) {
          setProgress((prev) => Math.min(prev + 10, 100));
          return false; // Remove note on hit
        }
        return true;
      });
    });
  };

  return (
    <div className='app-container'>
      <ProgressBar className='progress-bar' progress={progress} />
      <InformationBar className='information-bar' />
      <MusicNotes className='music-notes' gameAreaRef={gameAreaRef} notes={notes} />
      <MusicInstrument className='music-instrument' onDrumHit={handleDrumHit} />
    </div>
  );
};

export default App;
