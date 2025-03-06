import { useEffect, useRef } from "react";

const resetCycle = (setCurrentCycle, setStartTime) => {
  setCurrentCycle((prev) => prev + 1);
  setStartTime(Date.now());
};

function playSound(metronomeCountSounds, count) {
  metronomeCountSounds.current[count - 1].play();
}

export const useMetronome = (isPlaying, count, setCount, setCurrentCycle, setStartTime, beatPerMillisecond) => {
  const metronomeCountSounds = useRef([new Audio("/count1.m4a"), new Audio("/count2.m4a"), new Audio("/count3.m4a"), new Audio("/count4.m4a")]);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      setCount(1);
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          const newCount = (prevCount % 4) + 1;
          if (newCount === 1) {
            resetCycle(setCurrentCycle, setStartTime);
          }
          return newCount;
        });
      }, beatPerMillisecond);
      setStartTime(Date.now());
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, setCount, setCurrentCycle, setStartTime, beatPerMillisecond]);

  useEffect(() => {
    if (isPlaying) {
      playSound(metronomeCountSounds, count);
    }
  }, [count]);

  return {};
};
