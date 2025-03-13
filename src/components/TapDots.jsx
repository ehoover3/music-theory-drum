import React, { useEffect, useState } from "react";
import "./TapDots.css";

function TapDots({ taps, beatInterval, measure, evaluateUserTaps }) {
  const [dots, setDots] = useState([]);
  const [areUserTapsCorrect, setAreUserTapsCorrect] = useState(false);
  const ERROR_MARGIN_IN_MILLISECONDS = 225;

  const expectedBeatsMilliseconds = React.useMemo(() => [0, beatInterval, 2 * beatInterval, 3 * beatInterval], [beatInterval]);

  const findClosestBeatIndex = (tapTime) => {
    return expectedBeatsMilliseconds.reduce((closest, beat, index) => {
      const currentDiff = Math.abs(tapTime - beat);
      const closestDiff = Math.abs(tapTime - expectedBeatsMilliseconds[closest]);
      return currentDiff < closestDiff ? index : closest;
    }, 0);
  };

  const updateDots = () => {
    if (!taps.length) return;
    const dotsInThisMeasure = taps.map((tapTime) => {
      const closestBeatIndex = findClosestBeatIndex(tapTime);
      const isWithinMargin = Math.abs(tapTime - expectedBeatsMilliseconds[closestBeatIndex]) <= ERROR_MARGIN_IN_MILLISECONDS;
      return {
        x: Math.min((tapTime / (4 * beatInterval)) * 100, 100),
        isCorrect: isWithinMargin,
      };
    });
    setDots(dotsInThisMeasure);
    let allNotesTapped = taps.length === 4;
    let allTapsAreCorrect = dotsInThisMeasure.every((dot) => dot.isCorrect);
    if (allNotesTapped && allTapsAreCorrect) setAreUserTapsCorrect(true);
  };

  useEffect(() => {
    updateDots();
  }, [taps, beatInterval, expectedBeatsMilliseconds]);

  useEffect(() => {
    if (taps.length === 4) evaluateUserTaps(areUserTapsCorrect);
  }, [taps]);

  return (
    <div className='tap-dots'>
      {dots.map((dot, index) => (
        <div key={`${measure}-${index}-${dot.x}`} className={`tap-dot ${dot.isCorrect ? "correct-tap" : "incorrect-tap"}`} style={{ left: `${dot.x}%` }}></div>
      ))}
    </div>
  );
}

export default TapDots;
