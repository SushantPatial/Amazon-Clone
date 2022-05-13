import React from 'react';

const TopFooter = () => {

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  return (
    <button onClick={scrollToTop}  className='top-footer'>
      Back to top
    </button>
  )
}

export default TopFooter;