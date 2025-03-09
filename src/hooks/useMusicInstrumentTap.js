import { useSound } from "./useSound";

export const useMusicInstrumentTap = (startTime, setTaps) => {
  const drumSound = useSound("/audio/drum.m4a");

  const handleMusicInstrumentTap = () => {
    if (!drumSound) return;
    drumSound.pause();
    drumSound.currentTime = 0;
    drumSound.play();
    const currentTime = Date.now() - startTime;
    setTaps((prevTaps) => [...prevTaps, currentTime]);
  };

  return handleMusicInstrumentTap;
};
