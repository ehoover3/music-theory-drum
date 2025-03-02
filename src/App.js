// App.js
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import drumSound from "./drum.m4a"; // You'll need to add this file to your project
import TimeSignature from "./components/TimeSignature";
import MusicStaff from "./components/MusicStaff";
import Instructions from "./components/Instructions";
import MusicInstrument from "./components/MusicInstrument";

function App() {
  const [taps, setTaps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const audioRef = useRef(new Audio(drumSound));

  // Create audio elements for counting
  const countRefs = useRef([
    new Audio("/count1.m4a"), //
    new Audio("/count2.m4a"),
    new Audio("/count3.m4a"),
    new Audio("/count4.m4a"),
  ]);

  // The expected rhythm - four quarter notes evenly spaced
  const expectedRhythm = [0, 1000, 2000, 3000]; // Assuming 1000ms = 1 beat at 60 BPM
  const beatInterval = 1000; // 1000ms = 60 BPM

  // Set up metronome
  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      // Start immediately with count 1
      countRefs.current[0].play();
      setCount(1);

      // Set up metronome interval
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          const newCount = (prevCount % 4) + 1;
          countRefs.current[newCount - 1].play();
          return newCount;
        });
      }, beatInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying]);

  const handleDrumTap = () => {
    if (!isPlaying) return;

    // Play drum sound
    audioRef.current.currentTime = 0;
    audioRef.current.play();

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

  const startGame = () => {
    setTaps([]);
    setCount(0);
    setIsPlaying(true);
    setStartTime(Date.now());
  };

  const checkRhythm = () => {
    // Simple algorithm to check if taps match expected rhythm
    // Allow for some margin of error (e.g., 200ms)
    const ErrorMargin = 200;
    let correct = true;

    for (let i = 0; i < taps.length; i++) {
      if (Math.abs(taps[i] - expectedRhythm[i]) > ErrorMargin) {
        correct = false;
        break;
      }
    }
  };

  // For text-to-speech fallback if audio files aren't available
  const speakCount = (num) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(num.toString());
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle loading errors for count audio files
  useEffect(() => {
    countRefs.current.forEach((audio, index) => {
      audio.onerror = () => {
        console.warn(`Count audio ${index + 1} failed to load, using speech synthesis instead`);
        if (isPlaying && count === index + 1) {
          speakCount(index + 1);
        }
      };
    });
  }, [count, isPlaying]);

  return (
    <div className='App'>
      <header className='App-header'>
        <TimeSignature />
        <MusicStaff count={count} />
        <Instructions />

        <MusicInstrument isPlaying={isPlaying} handleDrumTap={handleDrumTap} />

        {!isPlaying && (
          <button className='start-button' onClick={startGame}>
            Start
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
