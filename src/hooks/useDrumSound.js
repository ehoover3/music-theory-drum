import { useEffect, useRef } from "react";

export function useDrumSound() {
  const drumSoundURL = "/drum.m4a";
  const drumSound = useRef(new Audio(drumSoundURL));

  useEffect(() => {
    drumSound.current.load();
    drumSound.current.onerror = () => console.error("Error loading drum sound");
  }, []);

  return drumSound;
}
