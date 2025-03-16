import React from "react";

function Dots({ dots }) {
  return (
    <div>
      {dots.map((dot, index) => (
        <div key={index} className='placed-dot' style={{ left: dot.position }} title={`Dot at count: ${dot.exactCount}`} />
      ))}
    </div>
  );
}

export default Dots;
