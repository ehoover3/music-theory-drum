import { useEffect, useRef } from "react";

export const useMetronome = (isPlaying, bpm, count, setCount) => {
  const audioRefs = useRef([new Audio("/audio/Hi-Hat-Closed-Hit-A1.mp3"), new Audio("/audio/Hard-Slap-A.mp3"), new Audio("/audio/Drum-Sticks-Hit-E.mp3"), new Audio("/audio/Slap-A1.mp3")]);

  const playAudio = (audio) => audio?.play().catch((error) => console.error("Audio play error:", error));
  const incrementAudioIndex = (count, setCount, audioRefs) => setCount((count + 1) % audioRefs.current.length);
  const resetAudioIndex = (audio) => audio && (audio.currentTime = 0);
  const intervalDuration = (60 / bpm) * 1000;

  const playSound = () => {
    const audio = audioRefs.current[count];
    playAudio(audio);
    incrementAudioIndex(count, setCount, audioRefs);
    resetAudioIndex(audio);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(playSound, intervalDuration);
    }
    return () => clearInterval(interval);
  }, [isPlaying, bpm, count]);
};
