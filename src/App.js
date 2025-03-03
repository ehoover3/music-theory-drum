import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import TimeSignature from "./components/TimeSignature";
import MusicStaff from "./components/MusicStaff";
import Instructions from "./components/Instructions";
import MusicInstrument from "./components/MusicInstrument";
import StartPauseButton from "./components/StartPauseButton";
import TapDots from "./components/TapDots";
import { useDrumSound } from "./hooks/drumSound";
import { useMusicInstrumentTap } from "./hooks/useMusicInstrumentTap";

function App() {
  const [taps, setTaps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const audioRef = useDrumSound();
  const countRefs = useRef([new Audio("/count1.m4a"), new Audio("/count2.m4a"), new Audio("/count3.m4a"), new Audio("/count4.m4a")]);
  const beatInterval = 1000;

  // Handle the metronome count and cycle changes
  useEffect(() => {
    let intervalId;

    if (isPlaying) {
      countRefs.current[0].play();
      setCount(1);

      intervalId = setInterval(() => {
        setCount((prevCount) => {
          const newCount = (prevCount % 4) + 1;
          countRefs.current[newCount - 1].play();
          // When we complete a 4-count cycle, reset taps and increment cycle
          if (newCount === 1) {
            setTaps([]);
            setCurrentCycle((prev) => prev + 1);
            setStartTime(Date.now());
          }
          return newCount;
        });
      }, beatInterval);
      setStartTime(Date.now());
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying]);

  const handleMusicInstrumentTap = useMusicInstrumentTap(audioRef, startTime, setTaps);

  const startGame = () => {
    setTaps([]);
    setCount(0);
    setCurrentCycle(0);
    setIsPlaying(true);
    setStartTime(Date.now());
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <div style={{ display: "flex", alignItems: "center", width: "80%", maxWidth: "500px" }}>
          <TimeSignature />
          <StartPauseButton isPlaying={isPlaying} startGame={startGame} pauseGame={pauseGame} />
        </div>
        <MusicStaff count={count} />
        <TapDots taps={taps} isPlaying={isPlaying} beatInterval={beatInterval} currentCycle={currentCycle} />
        <Instructions />
        <MusicInstrument isPlaying={isPlaying} handleMusicInstrumentTap={handleMusicInstrumentTap} />
      </header>
    </div>
  );
}

export default App;
