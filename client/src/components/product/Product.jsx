import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';

const Product = () => {

  // Loader
  const [isLoading, setIsLoading] = useState(true);
  
  const {id} = useParams("");

  // Fetching individual product from API
  const [product, setProduct] = useState();

  useEffect(function() {
    async function fetchSingleProduct() {
      try {
        const res = await axios.get('https://amazonclone-sp.herokuapp.com/api/product/' + id);
        setProduct(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSingleProduct();
  }, [])

  // To navigate to a diff page
  const navigate = useNavigate();
  // Add to cart
  async function addToCart(id) {
    try {
      const res = await axios.post('https://amazonclone-sp.herokuapp.com/api/addtocart/' + id, {
        product
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
    } catch (error) {
      if (error.response.data.message === "No token provided") {
        navigate('/login'); // Go to login if there's no cookie
      }
    }
  }

  const [userData, setUserData] = useState();
  async function fetchUser() {
    try {
      const res = await axios.get('https://amazonclone-sp.herokuapp.com/api/getAuthUser', {withCredentials: true});
      if (res) {
        setUserData(res.data);
      }
    } catch (error) {
      if (error.response.data.message == "No token provided") {
        navigate('/login');
      } else {
        console.log(error);
      }
    }
  }

  // Buy now
  function loadRazorpay() {
    try {

      fetchUser();

      const script = document.createElement("script");
      script.src="https://checkout.razorpay.com/v1/checkout.js";

      script.onerror = () => {
        alert("Razorpay SDK failed to load. Try again later");
      };
      script.onload = async () => {
        try {

          const orderAmount = product.accValue;
          const orderedProducts = {
            id: product.id,
            name: product.name,
            qty: 1,
            img: product.url
          }

          const res = await axios.post("https://amazonclone-sp.herokuapp.com/api/create-order", {
            amount: orderAmount + '00'
          }, {
            withCredentials: true
          })
          
          const { id, amount, currency } = res.data.order;
          const { key } = await axios.get("https://amazonclone-sp.herokuapp.com/api/get-razorpay-key");

          var today = new Date();
          var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();

          const options = {
            key: key,
            amount: amount.toString(),
            currency: currency,
            order_id: id,
            name: product.name,
            handler: async function(response) {
              const result = await axios.post("https://amazonclone-sp.herokuapp.com/api/pay-order", {
                orderedProducts: orderedProducts,
                dateOrdered: date,
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              }, {
                withCredentials: true
              })
              navigate("/orders");
            },
            prefill: {
              name: userData.name,
              email: userData.email,
              contact: '+91' + userData.number
            },
            theme: {
              color: '#1976D2'
            }
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();

          

        } catch (error) {
          console.log(error);
        }
      };

      document.body.appendChild(script);
    }
    catch (error) {
      if (error.response.data.message === "No token provided") {
        navigate('/login'); // Go to login if there's no cookie
      }
    }
  }

  const today = new Date();
  today.setDate(today.getDate() + 3);
  const dayArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const day = dayArr[today.getDay()];
  const date = today.getDate();
  const month = monthArr[today.getMonth()];
  const deliveryDate = day + ", " + date + " " + month;

  if (product) {
    return (
      <div className='product-section'>
        <div className='left'>
          <img src={ product.resUrl }></img>
        </div>
        <div className='middle'>
          <div className='product-details'>
            <h4>{ product.name }</h4>
            <div className='divider'></div>
            <div className='price'>
              { product.discount } 
              <span>
                <span className='sup'> ₹</span>
                { product.value }
                <span className='sup'>00</span>
              </span>
            </div>
            <div className='mrp'>M.R.P.: <strike>{ product.mrp }</strike></div>
            <p className='taxes'>Inclusive of all taxes</p>
          </div>
          <div className='about-product'>
            <h6>About this item</h6>
            <ul>
              { product.points.map(function(point, index) {
                return (
                  <li key={index}>{point}</li>
                )
              }) }
            </ul>
          </div>
        </div>
        <div className='right'>
          <h3><span><span className='sup'>₹</span>{ product.value }<span className='sup'>00</span></span></h3>
          <p><span>FREE delivery:</span> {deliveryDate}</p>
          <button id="addtocart-btn" onClick={ () => addToCart(product.id) }>Add to Cart</button>
          <button onClick={loadRazorpay} >Buy Now</button>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        { isLoading ? <Loader /> : "" }
      </div>
    )
  }
}

export default Product;