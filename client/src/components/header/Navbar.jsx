import React, { useEffect, useState } from 'react';
import './Navbar.css';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import SubNavbar from './SubNavbar';
import { NavLink, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import logo from './logo.png';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Navbar = () => {

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 60) {
      $('nav').css({ 'position': 'fixed' });
      $('.sub-nav').css({ 'margin-top': '60px' });
    } 
    if ($(window).scrollTop() === 0) {
      $('nav').css({ 'position': 'relative' });
      $('.sub-nav').css({ 'margin-top': '0px' });
    }
  })

  const [loginMsg, setLoginMsg] = useState("Sign in");
  const [cartValue, setCartValue] = useState('0');
  const [profilePhoto, setProfilePhoto] = useState(<NavLink to="/login" className='profile'><PersonIcon id="profile-icon" /></NavLink>);
  const [loggedIn, setLoggedIn] = useState(false);

  const [products, setProducts] = useState([]);


    useEffect(function() {
      // Fetching user data
      async function fetchUser() {
        try {
          const res = await axios.get("https://amazonclone-sp.herokuapp.com/api/getAuthUser", {
            withCredentials: true
          });
  
          if (res) {
            const name = res.data.name;
            const fname = name.substring(0, name.indexOf(' '));
            const fletter = name.substring(0, 1);
    
            const cartArr = res.data.cart;
            let totalQty = 0;
            for (let i = 0; i < cartArr.length; i++) {
              totalQty += cartArr[i].qty;
            }
    
            setLoginMsg(fname);
            setCartValue(totalQty);
            setProfilePhoto(<div onClick={toggleDrawer(true)} className="profile"><div id='profile-letter'>{fletter}</div></div>);
            setLoggedIn(true);

            setTimeout(function() {
              fetchUser();
            }, 2000)
          }
  
        } catch (error) {
          if (error.response.data.message === "No token provided") {
            
          } else {
            console.log(error);
          }
        }
      }

      // Fetching products
      async function fetchProducts() {
        const res = await axios.get("https://amazonclone-sp.herokuapp.com/api/products");
        setProducts(res.data);
      }

      fetchUser();
      fetchProducts();
    }, [])

    const navigate = useNavigate();
    // Logout 
      function logout() {
        try {
          const res = axios.get("https://amazonclone-sp.herokuapp.com/api/logout", {
            withCredentials: true
          })

          if (res) {
            navigate("/");
          
            setLoginMsg("Sign in");
            setCartValue("0");
            setProfilePhoto(<NavLink to="/login" className='profile'><PersonIcon id="profile-icon" /></NavLink>);
            setLoggedIn("false");
          }
        } catch (error) {
          console.log(error);
        }
      }

    // Profile button
    const anchor = "right";
    
    const [state, setState] = React.useState({
      right: false
    });
  
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <div className='profile-options'>
          <h5>Hello, {loginMsg}</h5>
          <a href='/profile'>
            <div className='profile-option'>
              <PersonOutlineOutlinedIcon className='profile-icon' /> Your Account
            </div>
          </a>
          <a href='/orders'>
            <div className='profile-option'>
              <ShoppingCartOutlinedIcon className='profile-icon' /> Your Orders
            </div>
          </a>
          <div>
            <div className='profile-option' onClick={ logout }>
              <LogoutOutlinedIcon className='profile-icon' /> Sign Out
            </div>
          </div>
        </div>
      </Box>
    );

    const [searchText, setSearchText] = useState("");
    const [listHidden, setListHidden] = useState(true);

    // Search filter 
    function searchChange(e) {
      setSearchText(e.target.value);
      setListHidden(false);
      if (e.target.value === "" || e.target.value.replace(/\s/g, "") == "") {
        setListHidden(true);
      }
    }

    let path="";
    
  return (
    <header>
      <nav>

        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>

        <div className="search">
          <input type="text" name="search" className="searchbar" onChange={searchChange} value={searchText} ></input>
          <button className="search-icon">
            <SearchIcon />
          </button>
        </div>

        <List className='search-list' hidden={ listHidden }>
          {
            products.filter((productsFound) => {
              return productsFound.name.toLowerCase().includes(searchText.toLowerCase())
            }).slice(0, 5).map((product, index) => {
              return (
                <ListItem key={index} className='list-item'>
                  <NavLink to={`/product/${product.id}`}>
                  {product.name}
                  </NavLink>
                </ListItem>
              )
            })
          }
        </List>

        <div className="buttons">
          <a href={ loggedIn ? "/profile" : "/login" } className="login">
            <div className="button-text">
              Hello, {loginMsg}
            </div>
          </a>
          <NavLink to="/cart" className="cart">
            <Badge badgeContent={cartValue} color="primary">
              <ShoppingCartOutlinedIcon id="cart-icon" />
            </Badge>
            
            <div className="button-text">
              Cart
            </div>
          </NavLink>

          {profilePhoto}

        </div>
        
      </nav>

      <SubNavbar />

      <React.Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
      
    </header>
  )
}

export default Navbar;