import React, { useState, useEffect } from "react";
import "./App.css";
import Debug from "./components/Debug.jsx";
import Instructions from "./components/Instructions.jsx";
import MusicInstrument from "./components/MusicInstrument.jsx";
import MusicStaff from "./components/MusicStaff.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import notes from "./database/rhythms.json";
import ProgressBar from "./components/ProgressBar.jsx";
import StartPauseButton from "./components/StartPauseButton.jsx";
import Tempo from "./components/Tempo.jsx";
import TimeSignature from "./components/TimeSignature.jsx";
import { useMetronome } from "./hooks/useMetronome.js";
import UserDots from "./components/UserDots.jsx";

function App() {
  const [bpm, setBpm] = useState(120);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [taps, setTaps] = useState([]);
  const zeroBasedNoteBeats = notes.map((note) => ({ ...note, beat: note.beat - 1 }));
  useMetronome(bpm, count, isPlaying, setCount);

  return (
    <div className='grid-container'>
      <NavigationBar />
      <TimeSignature />
      <StartPauseButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Tempo bpm={bpm} setBpm={setBpm} />
      <ProgressBar progressBar={progressBar} />
      <MusicStaff count={count} notes={zeroBasedNoteBeats} />
      <UserDots />
      <Instructions />
      <MusicInstrument count={count} isPlaying={isPlaying} setTaps={setTaps} />
      <Debug count={count} isPlaying={isPlaying} progressBar={progressBar} taps={taps} />
    </div>
  );
}

export default App;
