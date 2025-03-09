import React from "react";
import "./ProgressBar.css";

function ProgressBar({ userTappedMeasureCorrectlyCount }) {
  return (
    <div className='progress-bar'>
      <div
        className='progress-bar-percent-complete'
        style={{
          width: `${Math.min(userTappedMeasureCorrectlyCount * 33.33, 100)}%`,
        }}></div>
    </div>
  );
}

export default ProgressBar;
