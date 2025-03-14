import React from "react";
import "./Debug.css";

function Debug({ isPlaying, startTime, measure, count, taps, progressBar }) {
  return (
    <div className='debug'>
      <div>isPlaying={isPlaying}</div>
      <div>startTime={startTime}</div>
      <div>measure={measure}</div>
      <div>count={count}</div>
      <div>taps={taps}</div>
      <div>progressBar={progressBar}</div>
    </div>
  );
}

export default Debug;
