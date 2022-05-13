import React from 'react';

const BottomFooter = () => {

  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className='bottom-footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="https://www.abebooks.com/">
              <div className='title'>
                AbeBooks
              </div>
              <div className='desc'>
                Books, art<br></br>
                & collectibles
              </div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="https://aws.amazon.com/what-is-cloud-computing/?sc_channel=EL&sc_campaign=IN_amazonfooter">
              <div className='title'>
                Amazon Web Services
              </div>
              <div className='desc'>
                Scalable Cloud<br></br>
                Computing Services
              </div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="https://www.audible.in/">
              <div className='title'>
                Audible
              </div>
              <div className='desc'>
                Download<br></br>
                Audio Books
              </div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="https://www.dpreview.com/">
              <div className='title'>
                DPReview
              </div>
              <div className='desc'>
                Digital<br></br>
                Photography
              </div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="https://www.imdb.com/">
              <div className='title'>
                IMDb
              </div>
              <div className='desc'>
                Movies, TV<br></br>
                & Celebrities
              </div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="https://www.shopbop.com/">
              <div className='title'>
                Shopbop
              </div>
              <div className='desc'>
                Designer<br></br>
                Fashion Brands
              </div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="https://www.amazon.in/l/21102587031?ref=footer_aingw">
              <div className='title'>
                Amazon Business
              </div>
              <div className='desc'>
                Everything For<br></br>
                Your Business
              </div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="https://www.amazon.in/l/8557209031?ref=footer_amznow">
              <div className='title'>
                Prime Now
              </div>
              <div className='desc'>
                2-Hour Delivery<br></br>
                on Everyday Items
              </div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="https://www.amazon.in/music/prime?ref=footer_apm">
              <div className='title'>
                Amazon Prime Music
              </div>
              <div className='desc'>
                90 million songs, ad-free<br></br>
                Over 15 million podcast episodes
              </div>
            </a>
          </div>
        </div>

        <div className='bottom-footer-bottom'>
          <a href=''>Conditions of Use & Sale</a>
          <a href=''>Privacy Notice</a>
          <a href=''>Interest-Based Ads</a>
          <span>© 1996-{year}, Amazon.com, Inc. or its affiliates</span>
        </div>
      </div>
    </div>
  )
}

export default BottomFooter;