import React from "react";
import "./NumberInput.css";
import { IoMdArrowDropdown } from "react-icons/io";

function NumberInput({ number, setNumber, allowedNumbers }) {
  return (
    <div className='number-input-container'>
      <select value={number} onChange={(e) => setNumber(Number(e.target.value))}>
        {allowedNumbers.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <IoMdArrowDropdown className='dropdown-icon' />
    </div>
  );
}

export default NumberInput;
