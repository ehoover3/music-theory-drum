// src/components/StartPauseButton.js
import React from "react";
import styles from "./StartPauseButton.module.css";

const StartPauseButton = ({ isPlaying, startGame, pauseGame }) => {
  return (
    <>
      {!isPlaying ? (
        <button className={styles.startButton} onClick={startGame}>
          ▶️ Start
        </button>
      ) : (
        <button className={styles.pauseButton} onClick={pauseGame}>
          ⏸️ Pause
        </button>
      )}
    </>
  );
};

export default StartPauseButton;
