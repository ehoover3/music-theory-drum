// components/Drum.js
import React, { useState } from "react";

const Drum = ({ onHit }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleDrumPress = () => {
    setIsPressed(true);
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
