import React, { useState, useRef } from "react";
import "./App.css";
import TimeSignature from "./components/TimeSignature";
import MusicStaff from "./components/MusicStaff";
import Instructions from "./components/Instructions";
import MusicInstrument from "./components/MusicInstrument";
import StartPauseButton from "./components/StartPauseButton";
import TapDots from "./components/TapDots";
import { useDrumSound } from "./hooks/useDrumSound";
import { useMusicInstrumentTap } from "./hooks/useMusicInstrumentTap";
import { useMetronome } from "./hooks/useMetronome";
import { usePlayPause } from "./hooks/usePlayPause";

function App() {
  const [taps, setTaps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(0);
  const audioRef = useDrumSound();
  const countRefs = useRef([new Audio("/count1.m4a"), new Audio("/count2.m4a"), new Audio("/count3.m4a"), new Audio("/count4.m4a")]);
  const beatInterval = 1000;

  useMetronome(isPlaying, countRefs, setCount, setTaps, setCurrentCycle, setStartTime, beatInterval);
  const handleMusicInstrumentTap = useMusicInstrumentTap(audioRef, startTime, setTaps);
  const { startGame, pauseGame } = usePlayPause(setTaps, setCount, setCurrentCycle, setIsPlaying, setStartTime);

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
