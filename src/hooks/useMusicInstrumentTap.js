export const useMusicInstrumentTap = (audioRef, startTime, setTaps) => {
  const handleMusicInstrumentTap = () => {
    if (!audioRef.current) return;

    // Handle the audio play logic
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch((err) => console.warn("Audio play failed:", err));

    // Calculate and record the tap timing
    const currentTime = Date.now() - startTime;
    setTaps((prevTaps) => [...prevTaps, currentTime]);
  };

  return handleMusicInstrumentTap;
};
