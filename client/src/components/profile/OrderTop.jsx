import React from 'react';
import './profile.css';

const OrderTop = (props) => {
  let order = props.order;
  let date = order.date;

  let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let slash = 0;
  let start = 0;
  let monthStr = '';
  let day = '';
  let year = ''

  for (let i = 0; i < date.length; i++) {
    if (date[i] === '/') {
      if (slash === 0) {
        day = date.substring(start, i);
        start = i + 1;
        slash++;
      } else if (slash === 1) {
        monthStr = date.substring(start, i);
        start = i + 1;
        slash++;
      }
    } else if (slash === 2) {
      year = date.substring(start, date.length);
    }
  }

  let month = monthArr[parseInt(start) + 1];
  let fullDate = day + " " + month + " " + year;

  let amount = order.amount.toString();  
  amount = amount.substring(0, amount.length - 2);
  let lastThree = amount.substring(amount.length-3);
  let otherNumbers = amount.substring(0,amount.length-3);
  if(otherNumbers != '')
    lastThree = ',' + lastThree;
  amount = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return (
    <div>
      <div className='order-top row'>
        <div className='col-6 col-md-3 col-lg-2'>
          <h6 className='order-top-details'>Order Placed</h6>
          <p>{ fullDate }</p>
        </div>
        <div className='col-6 col-md-3 col-lg-2'>
          <h6 className='order-top-details'>Total</h6>
          <p>{ "₹" + amount + ".00" }</p>
        </div>
        <div className='col-12 col-md-6 col-lg-8'>
          <h6 className='order-id'>{ order.razorpay.orderId }</h6>
        </div>
      </div>
    </div>
  )
}

export default OrderTop;