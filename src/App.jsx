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
  const previousTimeRef = useRef(0);

  // Calculate the time for one complete cycle (0 to 4)
  const cycleDuration = (60 / bpm) * 5 * 1000; // 5 beats at the current BPM in ms

  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const position = ((elapsed % cycleDuration) / cycleDuration) * 5; // 0 to 5 range
    setXPosition(position);
    requestRef.current = requestAnimationFrame(animate);
  };

  const toggleMetronome = () => {
    if (!isRunning) {
      startTimeRef.current = 0; // Reset start time
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    setIsRunning(!isRunning);
  };

  const handleBpmChange = (e) => {
    setBpm(parseInt(e.target.value, 10));
    // Reset timing when BPM changes
    if (isRunning) {
      cancelAnimationFrame(requestRef.current);
      startTimeRef.current = 0;
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  const addDot = () => {
    if (!containerRef.current) return;
    const normalizedPosition = XPosition % 5; // Ensure we're in 0-4 range
    const width = containerRef.current.offsetWidth;
    const pixelPosition = (normalizedPosition / 4) * width;
    setDots([
      ...dots,
      {
        position: pixelPosition,
        exactCount: normalizedPosition.toFixed(2),
      },
    ]);
  };

  useEffect(() => {
    if (XPosition <= 0.01) setDots([]);
  }, [XPosition]);

  const resetDots = () => setDots([]);
  useEffect(() => () => requestRef.current && cancelAnimationFrame(requestRef.current), []);

  // Normalize the position to 0-4 range for display
  const normalizedPosition = XPosition % 5;
  const positionPercentage = (normalizedPosition / 4) * 100;

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
              width: `${positionPercentage}%`,
              transition: isRunning ? "none" : "width 0.1s ease-out",
            }}
          />

          <div
            className='position-indicator'
            style={{
              left: `${positionPercentage}%`,
              transition: isRunning ? "none" : "left 0.1s ease-out",
            }}
          />

          {/* Count markers */}
          {[0, 1, 2, 3, 4].map((marker) => (
            <div
              key={marker}
              className='count-marker'
              style={{
                left: `${(marker / 4) * 100}%`,
              }}>
              {marker}
            </div>
          ))}
          <Dots dots={dots} />
        </div>
        <div className='count-display'>Count: {normalizedPosition.toFixed(2)}</div>
      </div>

      <Instructions />
      <MusicInstrument addDot={addDot} />
    </div>
  );
};

export default App;
