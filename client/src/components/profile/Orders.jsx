import React, { useEffect, useState } from 'react';
import NameBanner from './NameBanner';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import OrderTop from './OrderTop';
import OrderedProduct from './OrderedProduct';

const Orders = () => {

  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  useEffect(function() {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/getAuthUser", {
          withCredentials: true
        })
  
        if (res) {
          setUserData(res.data);
        }
      } catch (error) {
        if (error.response.data.message === "No token provided") {
          navigate('/login');
        } else {
          console.log(error);
        }
      }
    }

    fetchUser();
  }, []);
  
  if (userData) {

    const name = userData.name;
    const fname = name.substring(0, name.indexOf(' ')) + "'s Orders";

    const orders = userData.orders;
    orders.reverse();

    return (
      <div className='profile'>
        <NameBanner name={fname} />
        <div className='order-list'>
          { orders.map((order, index) => {
            let orderItem = order.orderInfo;
            let orderedProducts = orderItem.products;

            return (
              <div className='order'>
                <OrderTop order={ orderItem } />
                <div className='order-bottom'>
                  { orderedProducts.map((product, index) => {
                      return <OrderedProduct key={index} product={product} />
                    })  
                  }
                </div>
              </div>
            )
          })}
          
        </div>
      </div>
    )
  }
  
}

export default Orders;