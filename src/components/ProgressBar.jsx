import React from "react";
import "./ProgressBar.css";

function ProgressBar({ progress, incrementProgress }) {
  return (
    <button className='progress-container' onClick={incrementProgress}>
      {/* remove onClick={incrementProgress} in the future */}
      <div className='progression-bar'>
        <div className='progress-fill' style={{ width: `${progress * 100}%` }}></div>
      </div>
    </button>
  );
}

export default ProgressBar;
