export const useMusicInstrumentTap = (drumSound, startTime, setTaps) => {
  const handleMusicInstrumentTap = () => {
    if (!drumSound.current) return;

    // Handle the audio play logic
    const audio = drumSound.current;
    audio.pause();
    audio.currentTime = 0;
    audio.play();

    // Calculate and record the tap timing
    const currentTime = Date.now() - startTime;
    setTaps((prevTaps) => [...prevTaps, currentTime]);
  };

  return handleMusicInstrumentTap;
};
