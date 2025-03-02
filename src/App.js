// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import drumSound from "./drum.mp3"; // You'll need to add this file to your project

function App() {
  const [taps, setTaps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [audio] = useState(new Audio(drumSound));

  // The expected rhythm - four quarter notes evenly spaced
  const expectedRhythm = [0, 1000, 2000, 3000]; // Assuming 1000ms = 1 beat at 60 BPM

  const handleDrumTap = () => {
    if (!isPlaying) return;

    // Play drum sound
    audio.currentTime = 0;
    audio.play();

    // Record tap time relative to start
    const currentTime = Date.now() - startTime;
    setTaps((prevTaps) => [...prevTaps, currentTime]);

    // If we have 4 taps, check the rhythm
    if (taps.length === 3) {
      setTimeout(() => {
        checkRhythm();
        setIsPlaying(false);
      }, 500);
    }
  };

  const [startTime, setStartTime] = useState(0);

  const startGame = () => {
    setTaps([]);
    setFeedback("");
    setIsPlaying(true);
    setStartTime(Date.now());
  };

  const checkRhythm = () => {
    // Simple algorithm to check if taps match expected rhythm
    // Allow for some margin of error (e.g., 200ms)
    const margin = 200;
    let correct = true;

    for (let i = 0; i < taps.length; i++) {
      if (Math.abs(taps[i] - expectedRhythm[i]) > margin) {
        correct = false;
        break;
      }
    }

    if (correct) {
      setFeedback("Great job! Perfect rhythm!");
    } else {
      setFeedback("Try again to match the rhythm more precisely.");
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Time: 4/4</h1>

        <div className='notation'>
          <div className='staff-line'></div>
          <div className='notes'>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className='note'>
                ♩
              </div>
            ))}
          </div>
        </div>

        <p>Tap the rhythm</p>

        <div className={`drum ${isPlaying ? "active" : ""}`} onClick={handleDrumTap}>
          🥁
        </div>

        {!isPlaying && (
          <button className='start-button' onClick={startGame}>
            Start
          </button>
        )}

        {feedback && <p className='feedback'>{feedback}</p>}
      </header>
    </div>
  );
}

export default App;
