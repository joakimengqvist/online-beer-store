import React, { useState } from 'react';
import { Card, Row, Col, Nav } from 'react-bootstrap';
import styles from './beerCard.module.scss';
import { joinClassNames } from '../../helpers/classNameHelpers';

export default function BeerCard({beer}) {
    const [showingTab, setShowingTab] = useState('main');

    console.log('beer', beer)
    return (

        <Card className={styles.beerCard}>   
  <Card.Header className={styles.beerCardHeader}>
    <Nav>
      <Nav.Item className={joinClassNames(styles.beerTab, showingTab === 'main' && styles.activeBeerTab)} >
        <Nav.Link onClick={() => setShowingTab('main')}>{beer.tagline}</Nav.Link>
      </Nav.Item>
      <Nav.Item className={joinClassNames(styles.beerTab, showingTab === 'moreInfo' && styles.activeBeerTab)}>
        <Nav.Link onClick={() => setShowingTab('moreInfo')}>more info</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      </Nav.Item>
    </Nav>
  </Card.Header>
  <Card.Body>
  <Row>
  {showingTab === 'main' && (
      
      <Col xs={12} md={8}>
      <Card.Title className="mb-3 mt-3">{beer.name}</Card.Title>
      <Card.Text>{beer.description}</Card.Text>
      <Card.Text>{beer.brewers_tips}</Card.Text>
      </Col>
     
      )}
       {showingTab === 'moreInfo' && (
       
        <Col xs={12} md={8}>
        <Card.Title className="mb-3 mt-3">Ingredients</Card.Title>
        {Object.keys(beer.ingredients).map(ingredientType => (
            <Card.Text>
                <span>{ingredientType}: </span>
                {Array.isArray(beer.ingredients[ingredientType]) ? beer.ingredients[ingredientType].map(ingredient => (
                <span key={ingredient.id}>{ingredient.name} </span>
                )) : beer.ingredients[ingredientType]}
            </Card.Text>   
        ))}
         <span>Food pairing: </span>
            {beer.food_pairing.map(food => (
                <span key={food}>{food} </span>
             ))}
        </Col>
      
        )}
        <Col xs={12} md={4} className="pt-4">
          <img src={beer.image_url} alt={beer.name} className={styles.beerCardImage} />
        </Col>
    </Row>
    <Row>
        <Col>
        <Card.Text>Contributed by: <span className={styles.contributedBy}>{beer.contributed_by}</span></Card.Text>
        </Col>
    </Row>
</Card.Body>

  
       
</Card>

    )
}


/*

            <div className={styles.beerCardImageContainer}>
                <img src={beer.image_url} alt={beer.name} className={styles.beerCardImage} />
            </div>

<Card>
  <Card.Header>Featured</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>


*/