import React from 'react';
import './Navbar.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import subnav from './subnav.jpg';

const SubNavbar = () => {
  return (
    <div className="sub-nav">

      <div className="left">
        <a href='' className="left-item all">
          <MenuOutlinedIcon id="hamburger" /> All
        </a>
        <a href='' className="left-item">
          Best Sellers
        </a>
        <a href='' className="left-item">
          Mobiles
        </a>
        <a href='' className="left-item">
          Customer Services
        </a>
        <a href='' className="left-item">
          Today's Deals
        </a>
        <a href='' className="left-item">
          Fashion
        </a>
        <a href='' className="left-item">
          Electronics
        </a>
        <a href='' className="left-item">
          Home & Kitchen
        </a>
        <a href='' className="left-item">
          New Releases
        </a>
      </div>

      <div className="right">
        <a href="" className="download">
          <img src={subnav} alt="Download App"></img>
        </a>
      </div>

    </div>
  )
}

export default SubNavbar;