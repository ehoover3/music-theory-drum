import { useEffect, useState } from "react";

export function useSound(audioFile) {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const audio = new Audio(audioFile);
    setSound(audio);
    return () => {
      audio.pause();
    };
  }, [audioFile]);

  return sound;
}
