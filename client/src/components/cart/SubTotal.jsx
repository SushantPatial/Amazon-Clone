import React from 'react';
import './cart.css';

const SubTotal = (props) => {
  return (
    <div className='subtotal'>
      <h5>Subtotal ({props.totalQty} items): <span>₹{props.subTotal}.00</span></h5>
    </div>
  )
}

export default SubTotal;