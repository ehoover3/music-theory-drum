import React from "react";

function Dots({ dots }) {
  return (
    <div>
      {dots.map((dot, index) => (
        <div key={index} className='placed-dot' style={{ left: dot.position }} />
      ))}
    </div>
  );
}

export default Dots;
