import React from "react";
import "./NavigationBar.css";
import ProgressBar from "./ProgressBar.jsx";
import { FaX } from "react-icons/fa6";
import { GoGear } from "react-icons/go";
function NavigationBar({ progress, handleProgressIncrement }) {
  return (
    <div className='navigation-bar'>
      <FaX className='return-button' />
      <ProgressBar progress={progress} handleProgressIncrement={handleProgressIncrement} />
      <GoGear className='gear' />
    </div>
  );
}

export default NavigationBar;
