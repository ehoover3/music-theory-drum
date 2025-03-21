import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import ProgressBar from "./components/ProgressBar.jsx";
import MusicNotes from "./components/MusicNotes.jsx";
import MusicInstrument from "./components/MusicInstrument.jsx";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState([]);
  const gameAreaRef = useRef(null);
  const targetLine = 50; // The target line position (percentage)

  useEffect(() => {
    const interval = setInterval(() => {
      setNotes((prevNotes) => [...prevNotes, { id: Date.now(), position: 100 }]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveNotes = setInterval(() => {
      setNotes((prevNotes) => prevNotes.map((note) => ({ ...note, position: note.position - 2 })).filter((note) => note.position > 0));
    }, 50);
    return () => clearInterval(moveNotes);
  }, []);

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
      <ProgressBar progress={progress} />
      <MusicNotes gameAreaRef={gameAreaRef} notes={notes} />
      <MusicInstrument onDrumHit={handleDrumHit} />
    </div>
  );
};

export default App;
