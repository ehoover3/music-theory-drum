import React, { useState, useRef } from "react";
import "./App.css";
import TimeSignature from "./components/TimeSignature";
import MusicStaff from "./components/MusicStaff";
import Instructions from "./components/Instructions";
import MusicInstrument from "./components/MusicInstrument";
import StartPauseButton from "./components/StartPauseButton";
import TapDots from "./components/TapDots";
import ProgressBar from "./components/ProgressBar";
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
  const [correctCycles, setCorrectCycles] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [lastCorrectCycle, setLastCorrectCycle] = useState(-1);
  const audioRef = useDrumSound();
  const countRefs = useRef([new Audio("/count1.m4a"), new Audio("/count2.m4a"), new Audio("/count3.m4a"), new Audio("/count4.m4a")]);
  const beatInterval = 1000;

  const notes = [
    { symbol: "♩", beat: 1 },
    { symbol: "♩", beat: 2 },
    { symbol: "♩", beat: 3 },
    { symbol: "♩", beat: 4 },
  ];

  useMetronome(isPlaying, countRefs, setCount, setTaps, setCurrentCycle, setStartTime, beatInterval);
  const handleMusicInstrumentTap = useMusicInstrumentTap(audioRef, startTime, setTaps);
  const { startGame, pauseGame } = usePlayPause(setTaps, setCount, setCurrentCycle, setIsPlaying, setStartTime);

  const handleCycleCompletion = (isCycleCorrect) => {
    // Only increment if the current cycle is different from the last correct cycle
    if (isCycleCorrect && currentCycle !== lastCorrectCycle) {
      const newCorrectCycles = correctCycles + 1;
      setCorrectCycles(newCorrectCycles);
      setLastCorrectCycle(currentCycle);

      if (newCorrectCycles >= 3) {
        setIsGameComplete(true);
        pauseGame();
      }
    } else if (!isCycleCorrect) {
      setCorrectCycles(0);
      setLastCorrectCycle(-1);
    }
  };

  const resetGame = () => {
    setIsGameComplete(false);
    setCorrectCycles(0);
    setLastCorrectCycle(-1);
    startGame();
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <ProgressBar correctCycles={correctCycles} />
        <div style={{ display: "flex", alignItems: "center", width: "80%", maxWidth: "500px" }}>
          <TimeSignature />
          <StartPauseButton isPlaying={isPlaying} startGame={startGame} pauseGame={pauseGame} />
        </div>
        <MusicStaff notes={notes} count={count} />
        <TapDots taps={taps} isPlaying={isPlaying} beatInterval={beatInterval} currentCycle={currentCycle} onCycleCompletion={handleCycleCompletion} />
        {isGameComplete && (
          <div className='game-complete-modal'>
            <div className='game-complete-content'>
              <h2>Congratulations!</h2>
              <p>You successfully tapped the rhythm 3 times in a row!</p>
              <button onClick={resetGame}>Play Again</button>
            </div>
          </div>
        )}
        <Instructions />
        <MusicInstrument isPlaying={isPlaying} handleMusicInstrumentTap={handleMusicInstrumentTap} />
      </header>
    </div>
  );
}

export default App;
