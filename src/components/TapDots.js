import React, { useEffect, useState } from "react";
import styles from "./TapDots.module.css";

function TapDots({ taps, isPlaying, beatInterval, currentCycle, onCycleCompletion }) {
  const [dots, setDots] = useState([]);
  const [isCycleCorrect, setIsCycleCorrect] = useState(false);

  // Define the margin of error in milliseconds
  const ERROR_MARGIN_IN_MILLISECONDS = 150;

  // Expected beat times (in ms)
  const expectedBeats = [0, beatInterval, 2 * beatInterval, 3 * beatInterval];

  useEffect(() => {
    if (!isPlaying) {
      setDots([]);
      return;
    }

    const cycleDots = taps.map((tapTime) => {
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
    });

    setDots(cycleDots);

    // Check if all taps in this cycle are correct
    const allCycleDotsCorrect = cycleDots.length === 4 && cycleDots.every((dot) => dot.isCorrect);
    setIsCycleCorrect(allCycleDotsCorrect);
  }, [taps, isPlaying, beatInterval, currentCycle]);

  // Trigger cycle completion callback when cycle is complete
  useEffect(() => {
    if (taps.length === 4) {
      onCycleCompletion(isCycleCorrect);
    }
  }, [taps, isCycleCorrect, onCycleCompletion]);

  return (
    <div className={styles.tapDotsContainer}>
      {dots.map((dot, index) => (
        <div key={`${currentCycle}-${index}`} className={`${styles.tapDot} ${dot.isCorrect ? styles.correctTap : styles.incorrectTap}`} style={{ left: `${dot.x}%` }}></div>
      ))}
    </div>
  );
}

export default TapDots;
