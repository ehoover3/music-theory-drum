import React from "react";
import "./ProgressBar.css";

function ProgressBar({ userTappedMeasureCorrectlyCount }) {
  return (
    <div className='ProgressBar'>
      <div
        className='ProgressBar'
        style={{
          width: `${Math.min(userTappedMeasureCorrectlyCount * 33.33, 100)}%`,
        }}>
        {" "}
        ProgressBar
      </div>
    </div>
  );
}

export default ProgressBar;
