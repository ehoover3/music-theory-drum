import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Import the CSS file we'll create
import NavigationBar from "./components/NavigationBar.jsx";
import TimeSignature from "./components/TimeSignature.jsx";
import StartPauseButton from "./components/StartPauseButton.jsx";
import Tempo from "./components/Tempo.jsx";

const MetronomeApp = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [dots, setDots] = useState([]);
  const [exactPosition, setExactPosition] = useState(0);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(0);
  const previousTimeRef = useRef(0);

  // Calculate the time for one complete cycle (0 to 4)
  const cycleDuration = (60 / bpm) * 5 * 1000; // 5 beats at the current BPM in ms

  // Animation loop for the metronome
  const animate = (timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;

    const elapsed = timestamp - startTimeRef.current;
    const position = ((elapsed % cycleDuration) / cycleDuration) * 5; // 0 to 5 range

    setExactPosition(position);
    setCount(Math.floor(position) % 5); // Ensures we loop back to 0 after 4

    requestRef.current = requestAnimationFrame(animate);
  };

  // Start/stop the metronome
  const toggleMetronome = () => {
    if (!isRunning) {
      startTimeRef.current = 0; // Reset start time
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    setIsRunning(!isRunning);
  };

  // Handle BPM change
  const handleBpmChange = (e) => {
    setBpm(parseInt(e.target.value, 10));
    // Reset timing when BPM changes
    if (isRunning) {
      cancelAnimationFrame(requestRef.current);
      startTimeRef.current = 0;
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  // Add a dot at the current exact position
  const addDot = () => {
    if (!containerRef.current) return;

    const normalizedPosition = exactPosition % 5; // Ensure we're in 0-4 range
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

  // Reset all dots
  const resetDots = () => {
    setDots([]);
  };

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Normalize the position to 0-4 range for display
  const normalizedPosition = exactPosition % 5;
  const positionPercentage = (normalizedPosition / 4) * 100;

  return (
    <div className='app-container'>
      <NavigationBar />
      <div style={{ display: "flex" }}>
        <TimeSignature />
        <StartPauseButton isRunning={isRunning} toggleMetronome={toggleMetronome} />
        <Tempo bpm={bpm} handleBpmChange={handleBpmChange} />
      </div>
      {/* Metronome display */}
      <div className='metronome-container'>
        <div className='metronome-bar' ref={containerRef}>
          {/* Progress bar */}
          <div
            className='progress-bar'
            style={{
              width: `${positionPercentage}%`,
              transition: isRunning ? "none" : "width 0.1s ease-out",
            }}
          />

          {/* Current position indicator */}
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

          {/* Dots */}
          {dots.map((dot, index) => (
            <div key={index} className='placed-dot' style={{ left: dot.position }} title={`Dot at count: ${dot.exactCount}`} />
          ))}
        </div>
        <div className='count-display'>Count: {normalizedPosition.toFixed(2)}</div>
      </div>

      {/* Dot controls */}
      <div className='dot-controls'>
        <button onClick={addDot} className='add-dot-button'>
          Add Dot at Current Position
        </button>

        <button onClick={resetDots} className='reset-dots-button'>
          Reset Dots
        </button>
      </div>

      {/* Dot legend */}
      <div className='dot-legend-container'>
        <h2 className='legend-title'>Placed Dots:</h2>
        <div className='legend-content'>
          {
            <ul className='dot-list'>
              {dots.map((dot, index) => (
                <li key={index} className='dot-list-item'>
                  Dot {index + 1}: Count {dot.exactCount}
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
};

export default MetronomeApp;

// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Debug from "./components/Debug.jsx";
// import Instructions from "./components/Instructions.jsx";
// import MusicInstrument from "./components/MusicInstrument.jsx";
// import MusicStaff from "./components/MusicStaff.jsx";

// import notes from "./database/rhythms.json";
// import ProgressBar from "./components/ProgressBar.jsx";
// import { useMetronome } from "./hooks/useMetronome.js";
// import UserDots from "./components/UserDots.jsx";

// function App() {
//   const [bpm, setBpm] = useState(60);
//   const [count, setCount] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progressBar, setProgressBar] = useState(0);
//   const [taps, setTaps] = useState([]);
//   const zeroBasedNoteBeats = notes.map((note) => ({ ...note, beat: note.beat - 1 }));
//   useMetronome(bpm, count, isPlaying, setCount);

//   return (
//     <div className='grid-container'>

//       <ProgressBar progressBar={progressBar} />
//       <MusicStaff count={count} notes={zeroBasedNoteBeats} />
//       <UserDots />
//       <Instructions />
//       <MusicInstrument count={count} isPlaying={isPlaying} setTaps={setTaps} />
//       <Debug count={count} isPlaying={isPlaying} progressBar={progressBar} taps={taps} />
//     </div>
//   );
// }

// export default App;
