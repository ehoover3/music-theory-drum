import React, { useState, useEffect } from "react";
import "./App.css";
import Debug from "./components/Debug.jsx";
import Instructions from "./components/Instructions.jsx";
import MusicInstrument from "./components/MusicInstrument.jsx";
import MusicStaff from "./components/MusicStaff.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import StartPauseButton from "./components/StartPauseButton.jsx";
import TapDots from "./components/TapDots.jsx";
import Tempo from "./components/Tempo.jsx";
import TimeSignature from "./components/TimeSignature.jsx";
import { useMusicInstrumentTap } from "./hooks/useMusicInstrumentTap.js";
import { useMetronome } from "./hooks/useMetronome.js";
import { usePlayPause } from "./hooks/usePlayPause.js";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [measure, setMeasure] = useState(0);
  const [count, setCount] = useState(1);
  const [taps, setTaps] = useState([]);
  const [userTappedMeasureCorrectlyCount, setUserTappedMeasureCorrectlyCount] = useState(0);
  const [lastUserTappedMeasureCorrectly, setLastUserTappedMeasureCorrectly] = useState(-1);

  const beatsPerMinute = 60;
  const beatPerMillisecond = 60000 / beatsPerMinute;

  const notes = [
    { symbol: "♩", beat: 1 },
    { symbol: "♩", beat: 2 },
    { symbol: "♩", beat: 3 },
    { symbol: "♩", beat: 4 },
  ];

  useMetronome(count, setCount, isPlaying, setMeasure, setStartTime, beatPerMillisecond, measure);
  const handleMusicInstrumentTap = useMusicInstrumentTap(startTime, setTaps);
  const { startGame, pauseGame } = usePlayPause(setTaps, setCount, setMeasure, setIsPlaying, setStartTime);

  const handleCycleCompletion = (isCycleCorrect) => {
    if (isCycleCorrect && measure !== lastUserTappedMeasureCorrectly) {
      const newUserTappedMeasureCorrectlyCount = userTappedMeasureCorrectlyCount + 1;
      setUserTappedMeasureCorrectlyCount(newUserTappedMeasureCorrectlyCount);
      setLastUserTappedMeasureCorrectly(measure);

      if (newUserTappedMeasureCorrectlyCount >= 3) {
        pauseGame();
      }
    } else if (!isCycleCorrect) {
      setUserTappedMeasureCorrectlyCount(0);
      setLastUserTappedMeasureCorrectly(-1);
    }
  };

  useEffect(() => {
    if (count === 1) {
      setTaps([]);
    }
  }, [count]);

  return (
    <div className='grid-container'>
      <NavigationBar />
      <TimeSignature />
      <StartPauseButton isPlaying={isPlaying} startGame={startGame} pauseGame={pauseGame} />
      <Tempo />
      <ProgressBar userTappedMeasureCorrectlyCount={userTappedMeasureCorrectlyCount} />
      <MusicStaff notes={notes} count={count} />
      <TapDots taps={taps} isPlaying={isPlaying} beatInterval={beatPerMillisecond} measure={measure} onCycleCompletion={handleCycleCompletion} />
      <Instructions />
      <MusicInstrument isPlaying={isPlaying} handleMusicInstrumentTap={handleMusicInstrumentTap} />
      {/* <Debug count={count} measure={measure} /> */}
    </div>
  );
}

export default App;
