import React, { useState, useEffect, useRef } from "react";
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
import notes from "./database/rhythms.json";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [measure, setMeasure] = useState(0);
  const [taps, setTaps] = useState([]);
  const [progressBar, setProgressBar] = useState(0);
  const [count, setCount] = useState(0);
  const [bpm, setBpm] = useState(100);

  const zeroBasedNoteBeats = notes.map((note) => ({ ...note, beat: note.beat - 1 }));

  useMetronome(isPlaying, bpm, count, setCount);
  const handleMusicInstrumentTap = useMusicInstrumentTap(startTime, setTaps);
  const { startGame, pauseGame } = usePlayPause(setTaps, setCount, setMeasure, setIsPlaying, setStartTime);

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
      <ProgressBar userTappedMeasureCorrectlyCount={progressBar} />
      <MusicStaff notes={zeroBasedNoteBeats} count={count} />
      <TapDots taps={taps} isPlaying={isPlaying} bpm={bpm} measure={measure} progressBar={progressBar} setProgressBar={setProgressBar} />
      <Instructions />
      <MusicInstrument isPlaying={isPlaying} handleMusicInstrumentTap={handleMusicInstrumentTap} />
      <Debug isPlaying={isPlaying} startTime={startTime} measure={measure} count={count} taps={taps} progressBar={progressBar} />
    </div>
  );
}

export default App;
