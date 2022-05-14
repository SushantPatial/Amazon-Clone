import React, { useState } from 'react';
import './login-register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert/Alert';
import AlertTitle from '@mui/material/AlertTitle/AlertTitle';
import axios from 'axios';

const SignIn = () => {

  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: ""
  });

  function formUpdate(e) {
    const {name, value} = e.target;
    
    setSignInInfo(function() {
      return {
        ...signInInfo,
        [name]:value
      }
    })
  }

  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();

  async function sendData(e) {
    e.preventDefault();
    const { email, password } = signInInfo; 

    try {
      const res = await axios.post("https://amazonclone-sp.herokuapp.com/api/login", {
        email, password
      }, {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Content-Type': 'application/json'
        },
        withCredentials: true // Cookie credentials (tokens)
      });

      setSignInInfo(function() {
        return {
          ...signInInfo,
          email: "", password: ""
        }
      });

      document.querySelector(".error-alert").style.display = "none";
      document.querySelector(".success-alert").style.display = "flex";

      setTimeout(function() {
        navigate('/');
      }, 1000)

    } catch (error) {
      try {
        document.querySelector(".success-alert").style.display = "none";
        document.querySelector(".error-alert").style.display = "flex";
        const errors = error.response.data.message;
        const temp = [];
        
        for (let i = 0; i < errors.length; i++) {
          temp.push(errors[i].msg);
        }
        setErrorMessage(temp);
      } catch(err) {
        console.log(error)
      }
    }
  }


  return (
    <div className='signin'>
      <NavLink to='/' className='logo'>
        <img src='images/logo-dark.png' alt='logo' />
      </NavLink>

      <Alert variant="outlined" severity="warning" className='alert error-alert'>
        <AlertTitle className='alert-title'>There were some errors</AlertTitle>
        <ul>
          { 
            errorMessage.map(function(error, index) {
              return (
                <li key={index}> {error} </li>
              )
            })
          }
        </ul>
      </Alert>

      <Alert variant="outlined" className='alert success-alert'>Logged-in successfully!</Alert>

      <div className='form-details'>
        <h3>Sign-In</h3>
        <form method='post' action='/' onSubmit={ sendData }>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' placeholder='Email Address' onChange={ formUpdate } value={ signInInfo.email } required />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' placeholder='Password' onChange={ formUpdate } value={ signInInfo.password } required />
          <button type='submit' id='submit'>Continue</button>
        </form>
      </div>

      <div className='new-to-amazon'>
        <p><span>New to Amazon?</span></p>
        <NavLink to='/register'>
          <button>Create your Amazon account</button>
        </NavLink>
      </div>
    </div>
  )
}

export default SignIn;