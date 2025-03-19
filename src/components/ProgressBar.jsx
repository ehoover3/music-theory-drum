import React from "react";
import "./ProgressBar.css";

function ProgressBar({ progress, handleProgressIncrement }) {
  return (
    <div className='progress-container'>
      <div className='progression-bar'>
        <div className='progress-fill' style={{ width: `${progress * 100}%` }}></div>
      </div>
      <button onClick={handleProgressIncrement}>Increment</button>
    </div>
  );
}

export default ProgressBar;
