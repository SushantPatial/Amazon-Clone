import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import $ from 'jquery';
import logo from './logo.png';

const MiddleFooter = () => {

  function showLanguages () {
    $(".language-dropdown-content").css({ 'transform': ' translateY(30px)', 'display': 'block', transition : '1s ease' });
  }
  function hideLanguages () {
    $(".language-dropdown-content").css({ 'transform': 'translateY(0px)', 'display': 'none', transition : '1s ease' });
  }

  return (
    <div className='middle-footer'>

      <div className='middle-footer-top'>
        <div className='row'>
          <div className='col-6 col-xl-3'>
            <h6>Get to Know Us</h6>
            <p><a href="">About Us</a></p>
            <p><a href="">Careers</a></p>
            <p><a href="">Press Releases</a></p>
            <p><a href="">Amazon Cares</a></p>
            <p><a href="">Gift a Smile</a></p>
            <p><a href="">Amazon Science</a></p>
          </div>
          <div className='col-6 col-xl-3'>
            <h6>Connect with Us</h6>
            <p><a href="https://www.facebook.com/AmazonIN">Facebook</a></p>
            <p><a href="https://twitter.com/AmazonIN">Twitter</a></p>
            <p><a href="https://www.instagram.com/amazondotin/">Instagram</a></p>
          </div>
          <div className='col-6 col-xl-3'>
            <h6>Make Money with Us</h6>
            <p><a href="">Sell on Amazon</a></p>
            <p><a href="">Sell under Amazon Accelerator</a></p>
            <p><a href="">Amazon Global Selling</a></p>
            <p><a href="">Become an Affiliate</a></p>
            <p><a href="">Fulfilment by Amazon</a></p>
            <p><a href="">Advertise Your Products</a></p>
            <p><a href="">Amazon Pay on Merchants</a></p>
          </div>
          <div className='col-6 col-xl-3'>
            <h6>Let Us Help You</h6>
            <p><a href="">COVID-19 and Amazon</a></p>
            <p><a href="">Your Account</a></p>
            <p><a href="">Returns Centre</a></p>
            <p><a href="">100% Purchase Protection</a></p>
            <p><a href="">Amazon App Download</a></p>
            <p><a href="">Amazon Assistant Download</a></p>
            <p><a href="">Help</a></p>
          </div>
        </div>
      </div>

      <div className='middle-footer-bottom'>
        <div className='logo-language'>
          <div className='footer-logo'>
            <a href="">
              <img src={logo} />
            </a>
          </div>
          <div className='language-dropdown'>
            <button>
              <LanguageIcon id="language-icon" />
              English
            </button>
            <div className="language-dropdown-content">
              <div className='lang-name'>
                <input type='radio' name='language' id="english" value='EN' defaultChecked ></input>
                <label htmlFor="english">English - EN</label>
              </div>
              <div className='dropdown-divider'></div>
              <div className='lang-name'>
                <input type='radio' name='language' id='x' value='HI'></input>
                <label htmlFor="x">हिन्दी - HI</label>
              </div>
              <div className='lang-name'>
                <input type='radio' name='language' id='y' value='TA'></input>
                <label htmlFor="y">தமிழ் - TA</label>
              </div>
              <div className='lang-name'>
                <input type='radio' name='language' id='z' value='KN'></input>
                <label htmlFor="z">ಕನ್ನಡ - KN</label>
              </div>
              <div className='lang-name'>
                <input type='radio' name='language' id='z' value='BN'></input>
                <label htmlFor="z">বাংলা - BN</label>
              </div>
              <div className='lang-name'>
                <input type='radio' name='language' id='z' value='MR'></input>
                <label htmlFor="z">मराठी - MR</label>
              </div> 
            </div>
          </div>
        </div>
        <div className='countries'>
          <a href=''>Australia</a>
          <a href=''>Brazil</a>
          <a href=''>Canada</a>
          <a href=''>China</a>
          <a href=''>France</a>
          <a href=''>Germany</a>
          <a href=''>Italy</a>
          <a href=''>Japan</a>
          <a href=''>Mexico</a>
          <a href=''>Netherlands</a>
          <a href=''>Poland</a>
          <a href=''>Singapore</a>
          <a href=''>Spain</a>
          <a href=''>Turkey</a>
          <a href=''>United Arab Emirates</a>
          <a href=''>United Kingdom</a>
          <a href=''>United States</a>
        </div>
      </div>

    </div>
  )
}

export default MiddleFooter;