// components/Drum.js
import React, { useState, useEffect } from "react";

const Drum = ({ onHit }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [drumSound, setDrumSound] = useState(null);

  // Initialize the drum sound
  useEffect(() => {
    // Create audio element for the drum sound
    const audio = new Audio();
    audio.src = "https://cdn.freesound.org/previews/41/41155_90295-lq.mp3"; // Snare drum sound from freesound.org
    audio.preload = "auto";
    setDrumSound(audio);

    return () => {
      if (drumSound) {
        drumSound.pause();
        drumSound.currentTime = 0;
      }
    };
  }, []);

  const handleDrumPress = () => {
    setIsPressed(true);

    // Play the drum sound
    if (drumSound) {
      // Reset the audio to start
      drumSound.currentTime = 0;
      drumSound.play().catch((err) => {
        console.warn("Audio playback error:", err);
      });
    }

    onHit();

    // Visual feedback of drum press
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  };

  return (
    <div className={`drum ${isPressed ? "pressed" : ""}`} onClick={handleDrumPress}>
      <div className='drum-head'>
        <div className='drum-center'></div>
      </div>
    </div>
  );
};

export default Drum;
