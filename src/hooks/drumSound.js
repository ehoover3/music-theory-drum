import { useEffect, useRef } from "react";
import drumSound from "../drum.m4a";

export function useDrumSound() {
  const audioRef = useRef(new Audio(drumSound));

  useEffect(() => {
    audioRef.current.load();
    audioRef.current.onerror = () => console.error("Error loading drum sound");
  }, []);

  return audioRef;
}
