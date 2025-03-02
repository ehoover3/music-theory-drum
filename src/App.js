// App.js
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import drumSound from "./drum.m4a";
import TimeSignature from "./components/TimeSignature";
import MusicStaff from "./components/MusicStaff";
import Instructions from "./components/Instructions";
import MusicInstrument from "./components/MusicInstrument";
import StartPauseButton from "./components/StartPauseButton"; // Import the new component

function App() {
  const [taps, setTaps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const audioRef = useRef(new Audio(drumSound));

  const countRefs = useRef([new Audio("/count1.m4a"), new Audio("/count2.m4a"), new Audio("/count3.m4a"), new Audio("/count4.m4a")]);

  const expectedRhythm = [0, 1000, 2000, 3000];
  const beatInterval = 1000;

  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      countRefs.current[0].play();
      setCount(1);

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

    audioRef.current.currentTime = 0;
    audioRef.current.play();

    const currentTime = Date.now() - startTime;
    setTaps((prevTaps) => [...prevTaps, currentTime]);

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

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const checkRhythm = () => {
    const ErrorMargin = 200;
    let correct = true;

    for (let i = 0; i < taps.length; i++) {
      if (Math.abs(taps[i] - expectedRhythm[i]) > ErrorMargin) {
        correct = false;
        break;
      }
    }
  };

  const speakCount = (num) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(num.toString());
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

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
        <div style={{ display: "flex", alignItems: "center", width: "80%", maxWidth: "500px" }}>
          <TimeSignature />
          <StartPauseButton isPlaying={isPlaying} startGame={startGame} pauseGame={pauseGame} />
        </div>
        <MusicStaff count={count} />
        <Instructions />
        <MusicInstrument isPlaying={isPlaying} handleDrumTap={handleDrumTap} />
      </header>
    </div>
  );
}

export default App;
