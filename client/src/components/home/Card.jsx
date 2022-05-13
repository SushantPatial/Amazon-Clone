import React from 'react';
import './home.css';

const Card = (props) => {
  return (
    <div className='cards-card'>
      <h5>{props.name}</h5>
      <div className='img-container'>
        <a href="" >
          <img src={"images/" + props.img + ".jpg"} alt={props.img}></img>
        </a>
      </div>
      <a href="" className='bottom-link'>
        {props.bottom}
      </a>
    </div>
  )
}

export default Card;