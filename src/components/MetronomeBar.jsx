import React, { useRef } from "react";
import Dots from "./Dots.jsx";

const MetronomeBar = ({ metronomeXPositionPercent, isRunning, normalizedPosition, dots, containerRef }) => {
  return (
    <div className='metronome-container'>
      <div className='metronome-bar' ref={containerRef}>
        <div
          className='progress-bar'
          style={{
            width: `${metronomeXPositionPercent}%`,
            transition: isRunning ? "none" : "width 0.1s ease-out",
          }}
        />

        {[
          { symbol: "1", position: 0 },
          { symbol: "♩", position: 1 },
          { symbol: "3", position: 2 },
          { symbol: "♩", position: 3 },
        ].map((marker) => {
          const isActive = normalizedPosition.toFixed(1) == marker.position;

          return (
            <div
              key={marker.position}
              className={`count-marker ${isActive ? "active-marker" : ""}`}
              style={{
                left: `${(marker.position / 4) * 100}%`,
                transform: isActive ? "scale(1.50)" : "scale(1)",
                transition: "transform 0.1s ease-out",
              }}>
              {marker.symbol}
            </div>
          );
        })}

        <Dots dots={dots} />
      </div>
    </div>
  );
};

export default MetronomeBar;
