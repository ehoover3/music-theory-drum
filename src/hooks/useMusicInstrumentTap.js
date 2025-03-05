export const useMusicInstrumentTap = (drumBeatSound, startTime, setTaps) => {
  const handleMusicInstrumentTap = () => {
    if (!drumBeatSound.current) return;

    // Handle the audio play logic
    const audio = drumBeatSound.current;
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch((err) => console.warn("Audio play failed:", err));

    // Calculate and record the tap timing
    const currentTime = Date.now() - startTime;
    setTaps((prevTaps) => [...prevTaps, currentTime]);
  };

  return handleMusicInstrumentTap;
};
