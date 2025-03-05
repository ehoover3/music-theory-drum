import { useEffect, useRef } from "react";
import drumSound from "../drum.m4a";

export function useDrumSound() {
  const drumBeatSound = useRef(new Audio(drumSound));

  useEffect(() => {
    drumBeatSound.current.load();
    drumBeatSound.current.onerror = () => console.error("Error loading drum sound");
  }, []);

  return drumBeatSound;
}
