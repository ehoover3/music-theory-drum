import { useEffect } from "react";

const playSound = (metronomeCountSounds, count) => {
  metronomeCountSounds.current[count - 1].play();
};

const resetCycle = (setTaps, setCurrentCycle, setStartTime) => {
  setTaps([]);
  setCurrentCycle((prev) => prev + 1);
  setStartTime(Date.now());
};

export const useMetronome = (isPlaying, metronomeCountSounds, setCount, setTaps, setCurrentCycle, setStartTime, beatInterval) => {
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      playSound(metronomeCountSounds, 1);
      setCount(1);
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          const newCount = (prevCount % 4) + 1;
          playSound(metronomeCountSounds, newCount);
          if (newCount === 1) {
            resetCycle(setTaps, setCurrentCycle, setStartTime);
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
