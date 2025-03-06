import { useEffect, useRef } from "react";

const playSound = (metronomeCountSounds, metronomeCountSoundsAlternate, count, measure) => {
  const soundSet = measure % 2 === 0 ? metronomeCountSounds : metronomeCountSoundsAlternate;
  const sound = soundSet.current[count - 1];
  if (sound) sound.play();
  else console.warn("Sound not found for count:", count);
};

const resetCycle = (setMeasure, setStartTime) => {
  setMeasure((prev) => prev + 1);
  setStartTime(Date.now());
};

export const useMetronome = (count, setCount, isPlaying, setMeasure, setStartTime, beatPerMillisecond, measure) => {
  const metronomeCountSounds = useRef([new Audio("/one.mp3"), new Audio("/two.mp3"), new Audio("/three.mp3"), new Audio("/four.mp3")]);
  const metronomeCountSoundsAlternate = useRef([new Audio("/oneAlternate.mp3"), new Audio("/two.mp3"), new Audio("/threeAlternate.mp3"), new Audio("/four.mp3")]);

  useEffect(() => {
    if (isPlaying) {
      setCount(1);
      setStartTime(Date.now());
      const intervalId = setInterval(() => {
        setCount((prevCount) => (prevCount % 4) + 1);
      }, beatPerMillisecond);
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, beatPerMillisecond, setCount, setMeasure, setStartTime]);

  useEffect(() => {
    if (isPlaying) playSound(metronomeCountSounds, metronomeCountSoundsAlternate, count, measure);
  }, [count, measure]);

  useEffect(() => {
    if (count === 1) resetCycle(setMeasure, setStartTime);
  }, [count]);

  return {};
};
