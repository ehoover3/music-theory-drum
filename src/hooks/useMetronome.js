import { useEffect } from "react";
import { useSound } from "./useSound";

const playSound = (metronomeCountSounds, count) => {
  const soundSet = metronomeCountSounds;
  const sound = soundSet[count - 1];
  if (sound) sound.play();
};

const resetCycle = (setMeasure, setStartTime) => {
  setMeasure((prev) => prev + 1);
  setStartTime(Date.now());
};

export const useMetronome = (count, setCount, isPlaying, setMeasure, setStartTime, beatPerMillisecond, measure) => {
  const count1 = useSound("/audio/numbers/1.mp3");
  const count2 = useSound("/audio/numbers/2.mp3");
  const count3 = useSound("/audio/numbers/3.mp3");
  const count4 = useSound("/audio/numbers/4.mp3");

  const metronomeCountSounds = [count1, count2, count3, count4];

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
    if (isPlaying) playSound(metronomeCountSounds, count, measure);
  }, [count, measure, isPlaying]);

  useEffect(() => {
    if (count === 1) resetCycle(setMeasure, setStartTime);
  }, [count, setMeasure, setStartTime]);

  return {};
};
