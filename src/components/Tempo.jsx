import React from "react";
import NumberInput from "./NumberInput";
import "./Tempo.css";

function Tempo({ bpm, setBpm }) {
  const allowedNumbers = [60, 70, 80, 90, 100, 110, 120];

  return (
    <div className='tempo'>
      <span>
        <NumberInput number={bpm} setNumber={setBpm} allowedNumbers={allowedNumbers} /> bpm
      </span>
    </div>
  );
}

export default Tempo;
