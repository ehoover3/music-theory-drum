import React from "react";
import Instructions from "./Instructions.jsx";
import MetronomeBar from "./MetronomeBar.jsx";
import StartPauseButton from "./StartPauseButton.jsx";
import Tempo from "./Tempo.jsx";
import TimeSignature from "./TimeSignature.jsx";

function GameDisplay({ BEATS, bpm, containerRef, dots, handleBpmChange, isRunning, toggleMetronome, musicNotes, XPosition }) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <TimeSignature />
        <StartPauseButton isRunning={isRunning} toggleMetronome={toggleMetronome} />
        <Tempo bpm={bpm} handleBpmChange={handleBpmChange} />
      </div>
      <MetronomeBar musicNotes={musicNotes} BEATS={BEATS} XPosition={XPosition} isRunning={isRunning} dots={dots} containerRef={containerRef} />
      <Instructions />
    </>
  );
}

export default GameDisplay;
