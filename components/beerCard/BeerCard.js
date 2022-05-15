import React, { useState } from 'react';
import { Card, Row, Col, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';
import styles from './beerCard.module.scss';
import { joinClassNames } from '../../helpers/classNameHelpers';
import { useWebshopStateMachine } from '../../webshop/useWebshopStateMachine';

export default function BeerCard({beer}) {
    const [showingTab, setShowingTab] = useState('main');
    const [readMore, setReadMore] = useState(false);
    const [state, dispatch] = useWebshopStateMachine();

    function addToCard() {
        dispatch({ type: 'ADD_ITEM_TO_CART', beer });
    }

    const isBanned = beer.name === 'Hello My Name is Vladimir';

    return (
        <Card className={joinClassNames(styles.beerCard, isBanned && styles.cancelledBeer)}>   
            <Card.Header className={styles.beerCardHeader}>
                <Nav>
                    <Nav.Item className={joinClassNames(styles.beerTab, showingTab === 'main' && styles.activeBeerTab)} >
                        <Nav.Link onClick={() => {!isBanned && setShowingTab('main')}}>
                            {isBanned ? (
                                <span style={{color: 'red'}}>BANNED - {beer.name}</span>
                            ) : (
                                <span>{beer.name}</span>
                            )}
                           </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={joinClassNames(styles.beerTab, showingTab === 'ingredients' && styles.activeBeerTab)}>
                        <Nav.Link onClick={() => {!isBanned && setShowingTab('ingredients')}}>Ingredients</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>
                <Row>
                {showingTab === 'main' && (
                    <Col xs={12} md={8}>
                        <Card.Title className="mb-2 mt-2">{beer.tagline}</Card.Title>
                        <Card.Text className={styles.beerParagraph}>
                            {beer.description}{' '}
                            {!readMore && (
                            <a 
                                className={styles.readMore} 
                                
                                onClick={() => {!isBanned && setReadMore(true)}}
                                data-testid="readMore"
                                >
                                    read more</a>
                            )}
                        </Card.Text>
                        {readMore && (
                             <Card.Text className={styles.beerParagraph}>
                                 {beer.brewers_tips}{' '}
                                 <a className={styles.readMore} onClick={() => {!isBanned && setReadMore(false)}}>read less</a>
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
                            <span key={food}>{food} 
                            {beer.food_pairing.length - 1 === beer.food_pairing.indexOf(food) ? '.' : ', '}
                            </span>
                        ))}
                    </Col>
                    )}
                    <Col xs={12} md={4} className="pt-4">
                        {!isBanned && (
                        <img 
                            src={beer.image_url}
                            alt={beer.name} 
                            className={beer.image_url === 'https://images.punkapi.com/v2/keg.png' ? styles.kegBeerCardImage : styles.beerCardImage} />
                            )}
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col style={{display: 'flex'}}>
                    <Link href={'/beer/' + beer.id}>
                        <Button 
                            disabled={isBanned}
                            id={'moreAboutThisBeer' + beer.id}
                            variant="outline-primary"
                            >More about this beer</Button>
                    </Link>
                    <Button id={'addToCartBeerCart' + beer.id} style={{marginLeft: '16px'}} disabled={isBanned} onClick={addToCard}>Add to cart</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}