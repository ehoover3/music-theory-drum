import { useCallback } from "react";

export const usePlayPause = (setTaps, setCount, setMeasure, setIsPlaying, setStartTime) => {
  const startGame = useCallback(() => {
    setTaps([]);
    setCount(0);
    setMeasure(0);
    setIsPlaying(true);
    setStartTime(Date.now());
  }, [setTaps, setCount, setMeasure, setIsPlaying, setStartTime]);

  const pauseGame = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  return {
    startGame,
    pauseGame,
  };
};
