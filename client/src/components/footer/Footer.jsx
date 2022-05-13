import React from 'react';
import SignIn from './SignIn';
import TopFooter from './TopFooter';
import MiddleFooter from './MiddleFooter';
import BottomFooter from './BottomFooter';
import './footer.css';

const Footer = () => {

  return (
    <footer>
      <SignIn />
      <TopFooter />
      <MiddleFooter />
      <BottomFooter />
    </footer>
  )
}

export default Footer;