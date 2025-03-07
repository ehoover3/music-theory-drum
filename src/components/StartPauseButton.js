// src/components/StartPauseButton.js
import React from "react";
import styles from "./StartPauseButton.module.css";
import { FaPause, FaPlay } from "react-icons/fa";

const StartPauseButton = ({ isPlaying, startGame, pauseGame }) => {
  return (
    <>
      <div className={styles.buttonContainer}>
        {!isPlaying ? (
          <button className={styles.startButton} onClick={startGame}>
            <FaPlay />
          </button>
        ) : (
          <button className={styles.pauseButton} onClick={pauseGame}>
            <FaPause />
          </button>
        )}
      </div>
    </>
  );
};

export default StartPauseButton;
