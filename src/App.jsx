import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import Dots from "./components/Dots.jsx";
import Instructions from "./components/Instructions.jsx";
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
  const metronomeXPositionPercent = (normalizedPosition / BEATS) * 100;

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
    setDots([...dots, { position: pixelPosition }]);
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

      <div className='metronome-container'>
        <div className='metronome-bar' ref={containerRef}>
          <div
            className='progress-bar'
            style={{
              width: `${metronomeXPositionPercent}%`,
              transition: isRunning ? "none" : "width 0.1s ease-out",
            }}
          />

          {/* Count markers */}
          {[
            { symbol: "0", position: 0 },
            { symbol: "♩", position: 1 },
            { symbol: "2", position: 2 },
            { symbol: "♩", position: 3 },
            { symbol: "4", position: 4 },
          ].map((marker) => {
            const isActive = normalizedPosition.toFixed(1) == marker.position;

            return (
              <div
                key={marker.position}
                className={`count-marker ${isActive ? "active-marker" : ""}`}
                style={{
                  left: `${(marker.position / 4) * 100}%`,
                  transform: isActive ? "scale(1.50)" : "scale(1)",
                  transition: "transform 0.1s ease-out",
                }}>
                {marker.symbol}
              </div>
            );
          })}

          <Dots dots={dots} />
        </div>
        <div className='count-display'>XPosition: {normalizedPosition.toFixed(1)}</div>
      </div>
      <Instructions />
      <MusicInstrument addDot={addDot} />
    </div>
  );
};

export default App;
