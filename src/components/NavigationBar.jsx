import React from "react";
import "./NavigationBar.css";
import { GoGear } from "react-icons/go";
import { IoReturnDownBackOutline } from "react-icons/io5";

function NavigationBar() {
  return (
    <div className='navigation-bar'>
      <IoReturnDownBackOutline className='return-button' />
      <div className='blank'></div>
      <GoGear className='gear' />
    </div>
  );
}

export default NavigationBar;
