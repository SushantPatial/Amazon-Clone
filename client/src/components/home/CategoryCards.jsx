import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from './Card';
import MultiCard from './MultiCard';
import './home.css';

const Cards = () => {
  return (
    <div className='cards-section'>
      <Container fluid className='cards-container'>
        <Row className='cards'>
          <Col sm="12" md="6" xl="3">
            <MultiCard name="Shop by Category" img="category-1" a="Smartwatches" b="Tablets" c="Laptops" d="Monitors" bottom="See more" />
          </Col>
          <Col sm="12" md="6" xl="3">
            <Card name="Health and Personal Care" img="category-2" bottom="Shop now" />
          </Col>
          <Col sm="12" md="6" xl="3">
            <Card name="Get Fit at Home" img="category-3" bottom="Explore now" />
          </Col>
          <Col sm="12" md="6" xl="3">
            <Card name="Shop Mother's Day Gifts" img="category-4" bottom="Shop now" />
          </Col>
          <Col sm="12" md="6" xl="3">
            <Card name="Computer & Accessories" img="category-5" bottom="Shop now" />
          </Col>
          <Col sm="12" md="6" xl="3">
            <Card name="Beauty Picks" img="category-6" bottom="Shop now" />
          </Col>
          <Col sm="12" md="6" xl="3">
            <MultiCard name="Tools for Daily Use" img="category-7" a="Machinery" b="Equipments" c="Accessories" d="Medical Kits" bottom="See more" />
          </Col>
          <Col sm="12" md="6" xl="3">
            <Card name="Electronics" img="category-8" bottom="Shop more" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Cards;