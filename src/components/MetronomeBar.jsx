import React from "react";
import Dots from "./Dots.jsx";
import "./MetronomeBar.css";

const MetronomeBar = ({ musicNotes, BEATS, XPosition, isRunning, dots, containerRef }) => {
  const normalizedPosition = XPosition % BEATS;
  const metronomeXPositionPercent = (normalizedPosition / BEATS) * 100;

  return (
    <div className='metronome-container'>
      <div className='metronome-bar' ref={containerRef}>
        <div
          className='metronome-progress-bar'
          style={{
            width: `${metronomeXPositionPercent}%`,
            transition: isRunning ? "none" : "width 0.1s ease-out",
          }}
        />

        {musicNotes.map((marker) => {
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
