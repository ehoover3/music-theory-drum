import React from "react";
import "./Debug.css";

function Debug({ normalizedPosition }) {
  return (
    <div className='debug'>
      <div className='count-display'>XPosition: {Number(normalizedPosition.toFixed(1))}</div>
    </div>
  );
}

export default Debug;
