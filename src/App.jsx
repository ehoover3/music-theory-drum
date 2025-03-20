import React, { useState, useEffect, useRef } from "react";
import Debug from "./components/Debug.jsx";
import "./App.css";

import Header from "./components/Header.jsx";
import GameDisplay from "./components/GameDisplay.jsx";
import UserInteraction from "./components/UserInteraction.jsx";

const App = () => {
  const [bpm, setBpm] = useState(60);
  const [dots, setDots] = useState([]);
  const [XPosition, setXPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(0);
  const BEATS = 4;
  const CYCLE_RESET_THRESHOLD = 75;
  const MILLISECONDS_PER_SECOND = 1000;
  const cycleDuration = (60 / bpm) * BEATS * MILLISECONDS_PER_SECOND;
  const musicNotes = [
    { symbol: "1", position: 0.25 },
    { symbol: "♩", position: 1.25 },
    { symbol: "3", position: 2.25 },
    { symbol: "♩", position: 3.25 },
  ];

  const incrementProgress = () => {
    setProgress((prev) => prev + 1 / 3);
  };

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
    const beatDuration = cycleDuration / BEATS;
    const currentTimePosition = normalizedPosition * beatDuration;
    const isOnBeat = musicNotes.some((note) => Math.abs(note.position * beatDuration - currentTimePosition) <= 200);
    setDots([...dots, { position: pixelPosition, isOnBeat }]);
  };
  useEffect(() => () => requestRef.current && cancelAnimationFrame(requestRef.current), []);

  return (
    <div className='app-container'>
      <Header progress={progress} incrementProgress={incrementProgress} />
      <GameDisplay BEATS={BEATS} bpm={bpm} containerRef={containerRef} dots={dots} handleBpmChange={handleBpmChange} isRunning={isRunning} toggleMetronome={toggleMetronome} musicNotes={musicNotes} XPosition={XPosition} />
      <UserInteraction addDot={addDot} />
      {/* <Debug normalizedPosition={normalizedPosition} /> */}
    </div>
  );
};

export default App;
