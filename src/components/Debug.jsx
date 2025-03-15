import React from "react";
import "./Debug.css";

function Debug({ count, isPlaying, progressBar, taps }) {
  return (
    <div className='debug'>
      <div>count={count}</div>
      <div>isPlaying={isPlaying}</div>
      <div>progressBar={progressBar}</div>
      <div>taps={taps}</div>
    </div>
  );
}

export default Debug;
