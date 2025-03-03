import React, { useEffect, useState } from "react";
import styles from "./TapDots.module.css";

function TapDots({ taps, isPlaying, beatInterval, currentCycle }) {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    if (!isPlaying) {
      setDots([]);
    } else {
      // Update dots based on taps within the current cycle
      setDots(
        taps.map((tap) => ({
          x: Math.min((tap / (4 * beatInterval)) * 100, 100), // Cap at 100% width
        }))
      );
    }
  }, [taps, isPlaying, beatInterval, currentCycle]);

  return (
    <div className={styles.tapDotsContainer}>
      {dots.map((dot, index) => (
        <div key={`${currentCycle}-${index}`} className={styles.tapDot} style={{ left: `${dot.x}%` }}></div>
      ))}
    </div>
  );
}

export default TapDots;
