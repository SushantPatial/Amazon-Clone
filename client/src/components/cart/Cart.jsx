import React, { useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import './cart.css';
import CartProduct from './CartProduct';
import SubTotal from './SubTotal';

const Cart = () => {

  // Loader
  const [isLoading, setIsLoading] = useState(true);

  const [cartArr, setCartArr] = useState([]);
  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://amazonclone-sp.herokuapp.com/api/getAuthUser', {withCredentials: true})
        .then(function(res) {
          setUserData(res.data);
          setCartArr(res.data.cart);
          setIsLoading(false);
        })
        .catch(function(error) {
          if (error.response.data.message == "No token provided") {
            navigate('/login');
          } else {
            console.log(error);
          }
        });
  }, [])

  // Creating an array of products ordered
  const orderedProducts = [];

  for (let i = 0; i < cartArr.length; i++) {
    let product = {
      id: cartArr[i].cartItem.id,
      name: cartArr[i].cartItem.name,
      qty: cartArr[i].qty,
      img: cartArr[i].cartItem.url
    }
    orderedProducts.push(product);
  }


  let orderAmount = 0;
  for (let i = 0; i < cartArr.length; i++) {
    orderAmount += cartArr[i].qty * cartArr[i].cartItem.accValue;
  }

  function loadRazorpay() {
    const script = document.createElement("script");
    script.src="https://checkout.razorpay.com/v1/checkout.js";

    script.onerror = () => {
      alert("Razorpay SDK failed to load. Try again later");
    };
    script.onload = async () => {
      try {
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
          name: "Payment",
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

  if (cartArr[cartArr.length-1]) {

    let totalQty = 0;

    for (let i = 0; i < cartArr.length; i++) {
      totalQty += cartArr[i].qty;
    }

    let amount = orderAmount.toString();  
    let lastThree = amount.substring(amount.length-3);
    let otherNumbers = amount.substring(0,amount.length-3);
    if(otherNumbers != '')
      lastThree = ',' + lastThree;
    amount = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    return (
      <>
        { isLoading ? 
          <Loader /> :
          <div className='cart-section'>
          <div className='left'>
            <h3>Shopping Cart</h3>
            <p className='price-heading'>Price</p>
            {
              cartArr.map(function(cart, index) {
                return <CartProduct key={index} cartItem={cart.cartItem} qty={cart.qty} />
              })
            }
            <SubTotal totalQty={totalQty} subTotal={amount} />
          </div>
          <div className="right">
            <SubTotal totalQty={totalQty} subTotal={amount} />
            <button onClick={loadRazorpay} >Proceed to Buy</button>
          </div>
        </div>
        }
      </>
    )
  } else if (cartArr.length == 0) {
    return (
      <>
        {
          isLoading ?
          <Loader /> :
          <Alert variant="outlined" severity="warning" style={{ width: '80%', margin: '30px auto', fontSize: '16px', display: 'flex', justifyContent: 'center' }}>
            Cart is empty
          </Alert>
        }
      </>
    )
  }
}

export default Cart;