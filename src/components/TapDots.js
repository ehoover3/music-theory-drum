import React, { useEffect, useState } from "react";
import styles from "./TapDots.module.css";

function TapDots({ taps, isPlaying, beatInterval, currentCycle }) {
  const [dots, setDots] = useState([]);
  const MARGIN_OF_ERROR = 200; // 200 milliseconds margin of error
  const expectedBeats = [0, beatInterval, 2 * beatInterval, 3 * beatInterval]; // Expected beat times (in ms)

  const findClosestBeatIndex = (tapTime, expectedBeats) => {
    return expectedBeats.reduce((closest, beat, index) => {
      return Math.abs(tapTime - beat) < Math.abs(tapTime - expectedBeats[closest]) ? index : closest;
    }, 0);
  };

  useEffect(() => {
    if (!isPlaying) {
      setDots([]);
    } else {
      setDots(
        taps.map((tapTime) => {
          const closestBeatIndex = findClosestBeatIndex(tapTime, expectedBeats);
          const isWithinMargin = Math.abs(tapTime - expectedBeats[closestBeatIndex]) <= MARGIN_OF_ERROR;

          return {
            x: Math.min((tapTime / (4 * beatInterval)) * 100, 100),
            isCorrect: isWithinMargin,
          };
        })
      );
    }
  }, [taps, isPlaying, beatInterval, currentCycle, expectedBeats]);

  return (
    <div className={styles.tapDotsContainer}>
      {dots.map((dot, index) => (
        <div key={`${currentCycle}-${index}`} className={`${styles.tapDot} ${dot.isCorrect ? styles.correctTap : styles.incorrectTap}`} style={{ left: `${dot.x}%` }}></div>
      ))}
    </div>
  );
}

export default TapDots;
