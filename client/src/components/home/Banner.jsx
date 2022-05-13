import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Banner = () => {
  return (
    <div className='banner'>
      <Carousel
        variant='dark'
        indicators={false}
      >

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner1.jpg"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner2.jpg"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner3.jpg"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner4.jpg"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/banner5.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        
      </Carousel>

    </div>
  )
}

export default Banner;