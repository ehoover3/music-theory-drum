import React from "react";
import "./Dots.css";

const Dots = ({ dots }) => {
  return (
    <>
      {dots.map((dot, index) => (
        <div key={index} className={`placed-dot ${dot.isOnBeat ? "green-dot" : "red-dot"}`} style={{ left: `${dot.position}px` }} />
      ))}
    </>
  );
};

export default Dots;
