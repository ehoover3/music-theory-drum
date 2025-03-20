import React from "react";
import "./Header.css";
import ProgressBar from "./ProgressBar.jsx";
import { FaX } from "react-icons/fa6";
import { GoGear } from "react-icons/go";

function Header({ progress, incrementProgress }) {
  return (
    <div className='header'>
      <FaX className='return-button' />
      <ProgressBar progress={progress} incrementProgress={incrementProgress} />
      <GoGear className='gear' />
    </div>
  );
}

export default Header;
