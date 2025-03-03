import React, { useEffect, useState } from "react";
import styles from "./TapDots.module.css";

function TapDots({ taps, isPlaying, beatInterval, currentCycle }) {
  const [dots, setDots] = useState([]);

  // Define the margin of error in milliseconds
  const MARGIN_OF_ERROR = 200; // 200ms margin of error

  // Expected beat times (in ms)
  const expectedBeats = [0, beatInterval, 2 * beatInterval, 3 * beatInterval];

  useEffect(() => {
    if (!isPlaying) {
      setDots([]);
    } else {
      // Update dots based on taps within the current cycle
      setDots(
        taps.map((tapTime) => {
          // Find the closest expected beat time
          const closestBeatIndex = expectedBeats.reduce((closest, beat, index) => {
            const currentDiff = Math.abs(tapTime - beat);
            const closestDiff = Math.abs(tapTime - expectedBeats[closest]);
            return currentDiff < closestDiff ? index : closest;
          }, 0);

          // Calculate if the tap is within margin of error
          const isWithinMargin = Math.abs(tapTime - expectedBeats[closestBeatIndex]) <= MARGIN_OF_ERROR;

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
