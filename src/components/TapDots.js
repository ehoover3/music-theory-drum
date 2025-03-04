import React, { useEffect, useState } from "react";
import styles from "./TapDots.module.css";

function TapDots({ taps, isPlaying, beatInterval, currentCycle }) {
  const [dots, setDots] = useState([]);

  // Define the margin of error in milliseconds
  const ERROR_MARGIN_IN_MILLISECONDS = 100;

  // Expected beat times (in ms)
  const expectedBeats = [0, beatInterval, 2 * beatInterval, 3 * beatInterval];

  useEffect(() => {
    if (!isPlaying) {
      setDots([]);
    } else {
      setDots(
        taps.map((tapTime) => {
          const closestBeatIndex = expectedBeats.reduce((closest, beat, index) => {
            const currentDiff = Math.abs(tapTime - beat);
            const closestDiff = Math.abs(tapTime - expectedBeats[closest]);
            return currentDiff < closestDiff ? index : closest;
          }, 0);

          const isWithinMargin = Math.abs(tapTime - expectedBeats[closestBeatIndex]) <= ERROR_MARGIN_IN_MILLISECONDS;

          return {
            x: Math.min((tapTime / (4 * beatInterval)) * 100, 100), // Cap at 100% width
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
