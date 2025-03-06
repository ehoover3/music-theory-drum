import { useEffect, useRef } from "react";

const resetCycle = (setCurrentCycle, setStartTime) => {
  setCurrentCycle((prev) => prev + 1);
  setStartTime(Date.now());
};

function playSound(metronomeCountSounds, count) {
  const sound = metronomeCountSounds.current[count - 1];
  if (sound) {
    sound.play();
  } else {
    console.warn("Sound not found for count:", count);
  }
}

export const useMetronome = (count, setCount, isPlaying, setCurrentCycle, setStartTime, beatPerMillisecond) => {
  const metronomeCountSounds = useRef([new Audio("/count1.m4a"), new Audio("/count2.m4a"), new Audio("/count3.m4a"), new Audio("/count4.m4a")]);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      setCount(1);
      intervalId = setInterval(() => {
        setCount((prevCount) => (prevCount % 4) + 1);
      }, beatPerMillisecond);
      setStartTime(Date.now());
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, beatPerMillisecond, setCount, setCurrentCycle, setStartTime]);

  useEffect(() => {
    if (isPlaying) {
      playSound(metronomeCountSounds, count);
    }
  }, [count]);

  useEffect(() => {
    if (count === 1) {
      resetCycle(setCurrentCycle, setStartTime);
    }
  }, [count]);

  return {};
};
