import { useCallback } from "react";

export const usePlayPause = (setTaps, setCount, setCurrentCycle, setIsPlaying, setStartTime) => {
  const startGame = useCallback(() => {
    setTaps([]);
    setCount(0);
    setCurrentCycle(0);
    setIsPlaying(true);
    setStartTime(Date.now());
  }, [setTaps, setCount, setCurrentCycle, setIsPlaying, setStartTime]);

  const pauseGame = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  return {
    startGame,
    pauseGame,
  };
};
