import React from 'react';
import './home.css';

const MultiCard = (props) => {
  return (
    <div className='cards-card'>
      <h5>{props.name}</h5>
      <div className="row">
        <div className="col-6">
          <div className='multi-img-container'>
            <a href="" >
              <img src={"images/" + props.img + "-a.jpg"} alt={props.img}></img>
            </a>
          </div>
          <span>{props.a}</span>
        </div>
        <div className="col-6">
          <div className='multi-img-container'>
            <a href="" >
              <img src={"images/" + props.img + "-b.jpg"} alt={props.img}></img>
            </a>
          </div>
          <span>{props.b}</span>
        </div>
        <div className="col-6">
          <div className='multi-img-container'>
            <a href="" >
              <img src={"images/" + props.img + "-c.jpg"} alt={props.img}></img>
            </a>
          </div>
          <span>{props.c}</span>
        </div>
        <div className="col-6">
          <div className='multi-img-container'>
            <a href="" >
              <img src={"images/" + props.img + "-d.jpg"} alt={props.img}></img>
            </a>
          </div>
          <span>{props.d}</span>
        </div>
      </div>
      <a href="" className='bottom-link'>
        {props.bottom}
      </a>
    </div>
  )
}

export default MultiCard;