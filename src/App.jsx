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
import { useMetronome } from "./hooks/useMetronome.js";
import notes from "./database/rhythms.json";

function App() {
  const [bpm, setBpm] = useState(120);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [measure, setMeasure] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const [taps, setTaps] = useState([]);
  const [timer, setTimer] = useState(0);
  const zeroBasedNoteBeats = notes.map((note) => ({ ...note, beat: note.beat - 1 }));
  useMetronome(isPlaying, bpm, count, setCount);

  return (
    <div className='grid-container'>
      <NavigationBar />
      <TimeSignature />
      <StartPauseButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Tempo bpm={bpm} setBpm={setBpm} />
      <ProgressBar progressBar={progressBar} />
      <MusicStaff count={count} notes={zeroBasedNoteBeats} />
      <TapDots bpm={bpm} isPlaying={isPlaying} measure={measure} progressBar={progressBar} setProgressBar={setProgressBar} taps={taps} />
      <Instructions />
      <MusicInstrument isPlaying={isPlaying} startTime={timer} setTaps={setTaps} />
      <Debug count={count} isPlaying={isPlaying} measure={measure} progressBar={progressBar} taps={taps} timer={timer} />
    </div>
  );
}

export default App;
