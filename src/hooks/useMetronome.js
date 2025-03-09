import { useEffect, useRef } from "react";
import { useSound } from "./useSound";

const playSound = (metronomeCountSounds, metronomeCountSoundsAlternate, count, measure) => {
  const soundSet = measure % 2 === 0 ? metronomeCountSounds : metronomeCountSoundsAlternate;
  const sound = soundSet[count - 1];
  if (sound) sound.play();
};

const resetCycle = (setMeasure, setStartTime) => {
  setMeasure((prev) => prev + 1);
  setStartTime(Date.now());
};

export const useMetronome = (count, setCount, isPlaying, setMeasure, setStartTime, beatPerMillisecond, measure) => {
  const count1 = useSound("/audio/one.mp3");
  const count1alternate = useSound("/audio/oneAlternate.mp3");
  const count2 = useSound("/audio/two.mp3");
  const count3 = useSound("/audio/three.mp3");
  const count3alternate = useSound("/audio/threeAlternate.mp3");
  const count4 = useSound("/audio/four.mp3");

  const metronomeCountSounds = [count1, count2, count3, count4];
  const metronomeCountSoundsAlternate = [count1alternate, count2, count3alternate, count4];

  useEffect(() => {
    if (!isPlaying) return;
    setCount(1);
    setStartTime(Date.now());
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount % 4) + 1);
    }, beatPerMillisecond);
    return () => clearInterval(interval);
  }, [isPlaying, beatPerMillisecond]);

  useEffect(() => {
    if (isPlaying) playSound(metronomeCountSounds, metronomeCountSoundsAlternate, count, measure);
  }, [count, measure, isPlaying]);

  useEffect(() => {
    if (count === 1) resetCycle(setMeasure, setStartTime);
  }, [count, setMeasure, setStartTime]);

  return {};
};
