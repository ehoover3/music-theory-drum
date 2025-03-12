import React, { useEffect, useState } from "react";
import "./TapDots.css";

function TapDots({ taps, isPlaying, beatInterval, measure, onCycleCompletion }) {
  const [dots, setDots] = useState([]);
  const [isCycleCorrect, setIsCycleCorrect] = useState(false);
  const ERROR_MARGIN_IN_MILLISECONDS = 225;
  const expectedBeatsMilliseconds = [0, beatInterval, 2 * beatInterval, 3 * beatInterval];

  useEffect(() => {
    const cycleDots = taps.map((tapTime) => {
      const closestBeatIndex = expectedBeatsMilliseconds.reduce((closest, beat, index) => {
        const currentDiff = Math.abs(tapTime - beat);
        const closestDiff = Math.abs(tapTime - expectedBeatsMilliseconds[closest]);
        return currentDiff < closestDiff ? index : closest;
      }, 0);
      const isWithinMargin = Math.abs(tapTime - expectedBeatsMilliseconds[closestBeatIndex]) <= ERROR_MARGIN_IN_MILLISECONDS;
      return {
        x: Math.min((tapTime / (4 * beatInterval)) * 100, 100),
        isCorrect: isWithinMargin,
      };
    });
    setDots(cycleDots);
    const allCycleDotsCorrect = cycleDots.length === 4 && cycleDots.every((dot) => dot.isCorrect);
    setIsCycleCorrect(allCycleDotsCorrect);
  }, [taps, isPlaying, beatInterval, measure]);

  useEffect(() => {
    if (taps.length === 4) {
      onCycleCompletion(isCycleCorrect);
    }
  }, [taps, isCycleCorrect, onCycleCompletion]);

  return (
    <div className='tap-dots'>
      {dots.map((dot, index) => (
        <div key={`${measure}-${index}`} className={`tap-dot ${dot.isCorrect ? "correct-tap" : "incorrect-tap"}`} style={{ left: `${dot.x}%` }}></div>
      ))}
    </div>
  );
}

export default TapDots;
