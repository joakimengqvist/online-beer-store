import React, { useState } from 'react';
import { Card, Row, Col, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './beerCard.module.scss';
import { joinClassNames } from '../../helpers/classNameHelpers';

export default function BeerCard({beer}) {
    const [showingTab, setShowingTab] = useState('main');
    const [readMore, setReadMore] = useState(false);

    return (
        <Card className={styles.beerCard}>   
            <Card.Header className={styles.beerCardHeader}>
                <Nav>
                    <Nav.Item className={joinClassNames(styles.beerTab, showingTab === 'main' && styles.activeBeerTab)} >
                        <Nav.Link onClick={() => setShowingTab('main')}>{beer.tagline}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={joinClassNames(styles.beerTab, showingTab === 'ingredients' && styles.activeBeerTab)}>
                        <Nav.Link onClick={() => setShowingTab('ingredients')}>Ingredients</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Row>
                {showingTab === 'main' && (
                    <Col xs={12} md={8}>
                        <Card.Title className="mb-2 mt-2">{beer.name}</Card.Title>
                        <Card.Text className={styles.beerParagraph}>
                            {beer.description}{' '}
                            {!readMore && (
                            <a className={styles.readMore} onClick={() => {setReadMore(true)}}>read more</a>
                            )}
                        </Card.Text>
                        {readMore && (
                             <Card.Text className={styles.beerParagraph}>
                                 {beer.brewers_tips}{' '}
                                 <a className={styles.readMore} onClick={() => {setReadMore(false)}}>read less</a>
                            </Card.Text>
                            )}
                    </Col>
                )}
                {showingTab === 'ingredients' && (
                    <Col xs={12} md={8}>
                        <Card.Title className="mb-2 mt-2">Ingredients</Card.Title>
                        {Object.keys(beer.ingredients).map(ingredientType => (
                            <Card.Text>
                                <span>{ingredientType}: </span>
                                {Array.isArray(beer.ingredients[ingredientType]) ? beer.ingredients[ingredientType].map(ingredient => (
                                <span className={styles.beerParagraph} key={ingredient.id}>{ingredient.name} </span>
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
                        <img 
                            src={beer.image_url}
                            alt={beer.name} 
                            className={beer.image_url === 'https://images.punkapi.com/v2/keg.png' ? styles.kegBeerCardImage : styles.beerCardImage} />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col style={{display: 'flex'}}>
                    <Link href={'/beer/' + beer.id}>
                        <Button variant="outline-primary">More about this beer</Button>
                    </Link>
                    <Button style={{marginLeft: '16px'}}>Add to cart</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}