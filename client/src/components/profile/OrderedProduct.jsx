import React from 'react';
import "./profile.css";
import { NavLink } from 'react-router-dom';

const OrderedProduct = (props) => {
  const product = props.product;
  let path="/product/" + product.id;
  return (
    <div className='order-bottom-item row'>
      <div className='col-4 col-sm-3 col-md-2'>
        <img src={ product.img } />
      </div>
      <div className='col-8 col-sm-9 col-md-10'>
        <h6><NavLink to={ path }>{ product.name }</NavLink></h6>
        <p>Qty: { product.qty }</p>
      </div>
    </div>
  )
}

export default OrderedProduct;