import { useEffect } from "react";

export const useMetronome = (isPlaying, metronomeCountSounds, setCount, setTaps, setCurrentCycle, setStartTime, beatInterval) => {
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      metronomeCountSounds.current[0].play();
      setCount(1);
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          const newCount = (prevCount % 4) + 1;
          metronomeCountSounds.current[newCount - 1].play();
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
  }, [isPlaying, metronomeCountSounds, setCount, setTaps, setCurrentCycle, setStartTime, beatInterval]);

  return {};
};
