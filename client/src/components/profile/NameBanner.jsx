import React from 'react';
import './profile.css';

const NameBanner = (props) => {
  return (
    <div>
      <div className='banner'>
        <svg xmlns="http://www.w3.org/2000/svg" width="1500" height="600" viewBox="0 0 1500 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(45)">
            <stop offset="5%"  stop-color="#60a1e2" />
            <stop offset="95%" stop-color="#166dc4" />
          </linearGradient>
        </defs>
        <path d="M 0,0
            L 0,300
            Q 750,600 1500,300
            L 1500, 0
            Z" fill="url('#myGradient')" />
        </svg>

        <h2>{props.name}</h2>
      </div>
    </div>
  )
}

export default NameBanner;