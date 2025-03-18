import React, { useState, useEffect, useRef } from "react";
import Debug from "./components/Debug.jsx";
import "./App.css";

import Instructions from "./components/Instructions.jsx";
import MetronomeBar from "./components/MetronomeBar.jsx";
import MusicInstrument from "./components/MusicInstrument.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import StartPauseButton from "./components/StartPauseButton.jsx";
import Tempo from "./components/Tempo.jsx";
import TimeSignature from "./components/TimeSignature.jsx";

const App = () => {
  const [bpm, setBpm] = useState(60);
  const [dots, setDots] = useState([]);
  const [XPosition, setXPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(0);
  const BEATS = 4;
  const CYCLE_RESET_THRESHOLD = 75;
  const MILLISECONDS_PER_SECOND = 1000;
  const cycleDuration = (60 / bpm) * BEATS * MILLISECONDS_PER_SECOND;
  const normalizedPosition = XPosition % BEATS;
  const musicNotes = [
    { symbol: "1", position: 0.25 },
    { symbol: "♩", position: 1.25 },
    { symbol: "3", position: 2.25 },
    { symbol: "♩", position: 3.25 },
  ];

  const resetDots = (elapsed) => elapsed % cycleDuration < CYCLE_RESET_THRESHOLD && setDots([]);
  const updatePosition = (elapsed) => {
    const position = ((elapsed % cycleDuration) / cycleDuration) * BEATS;
    setXPosition(position);
  };

  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    resetDots(elapsed);
    updatePosition(elapsed);
    requestRef.current = requestAnimationFrame(animate);
  };

  const toggleMetronome = () => {
    if (!isRunning) {
      startTimeRef.current = 0;
      requestRef.current = requestAnimationFrame(animate);
    } else cancelAnimationFrame(requestRef.current);
    setIsRunning(!isRunning);
  };

  const handleBpmChange = (e) => {
    setBpm(parseInt(e.target.value, 10));
    if (isRunning) {
      cancelAnimationFrame(requestRef.current);
      startTimeRef.current = 0;
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  const addDot = () => {
    if (!containerRef.current) return;
    const normalizedPosition = XPosition % BEATS;
    const width = containerRef.current.offsetWidth;
    const pixelPosition = (normalizedPosition / BEATS) * width;

    // Convert BEAT positions to milliseconds
    const beatDuration = cycleDuration / BEATS;
    const currentTimePosition = normalizedPosition * beatDuration;

    // Check if dot placement is within 200ms of a note position
    const isOnBeat = musicNotes.some((note) => Math.abs(note.position * beatDuration - currentTimePosition) <= 200);
    setDots([...dots, { position: pixelPosition, isOnBeat }]);
  };

  useEffect(() => () => requestRef.current && cancelAnimationFrame(requestRef.current), []);

  return (
    <div className='app-container'>
      <NavigationBar />
      <div style={{ display: "flex" }}>
        <TimeSignature />
        <StartPauseButton isRunning={isRunning} toggleMetronome={toggleMetronome} />
        <Tempo bpm={bpm} handleBpmChange={handleBpmChange} />
      </div>
      <MetronomeBar musicNotes={musicNotes} BEATS={BEATS} XPosition={XPosition} isRunning={isRunning} dots={dots} containerRef={containerRef} />
      <Instructions />
      <MusicInstrument addDot={addDot} />
      <Debug normalizedPosition={normalizedPosition} />
    </div>
  );
};

export default App;
