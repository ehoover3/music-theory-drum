import React from "react";
import "./Tempo.css";
import { RiArrowDropDownLine } from "react-icons/ri";

function Tempo() {
  return (
    <div className='Tempo'>
      <span>_200 bpm</span>
      <span>
        <RiArrowDropDownLine size={40} />
      </span>
    </div>
  );
}

export default Tempo;
