import { useCallback } from "react";

export const usePlayPause = (setIsPlaying) => {
  const startGame = useCallback(() => {
    setIsPlaying(true);
  }, [setIsPlaying]);

  const pauseGame = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  return {
    startGame,
    pauseGame,
  };
};
