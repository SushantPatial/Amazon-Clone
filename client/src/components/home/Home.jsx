import React from 'react';
import Banner from './Banner';
import CategoryCards from './CategoryCards';
import Slider from './Slider';
import './home.css';

export const Home = () => {
  return (
    <div className='home'>
      <Banner />
      <main>
        <Slider title="Today's Deals" link_text="See all deals" arrFrom="0" arrTo="13" class="todaysDeals" />
        <Slider title="Up to 60% off on home products | Small businesses" link_text="See all offers" arrFrom="13" arrTo="22" class="SmallBusinesses" />
        <CategoryCards />
      </main>
    </div>
  )
}

export default Home;