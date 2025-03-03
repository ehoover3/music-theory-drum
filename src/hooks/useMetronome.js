import { useEffect } from "react";

/**
 * Custom hook to handle metronome functionality
 *
 * @param {boolean} isPlaying - Whether the metronome is currently playing
 * @param {Array} countRefs - Audio references for count sounds
 * @param {function} setCount - State setter for current count
 * @param {function} setTaps - State setter for tap marks
 * @param {function} setCurrentCycle - State setter for current cycle
 * @param {function} setStartTime - State setter for start time
 * @param {number} beatInterval - Interval between beats in milliseconds
 * @returns {Object} - Object containing the startTime value
 */
export const useMetronome = (isPlaying, countRefs, setCount, setTaps, setCurrentCycle, setStartTime, beatInterval) => {
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      countRefs.current[0].play();
      setCount(1);
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          const newCount = (prevCount % 4) + 1;
          countRefs.current[newCount - 1].play();
          // When we complete a 4-count cycle, reset taps and increment cycle
          if (newCount === 1) {
            setTaps([]);
            setCurrentCycle((prev) => prev + 1);
            setStartTime(Date.now());
          }
          return newCount;
        });
      }, beatInterval);
      setStartTime(Date.now());
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, countRefs, setCount, setTaps, setCurrentCycle, setStartTime, beatInterval]);

  return {};
};
