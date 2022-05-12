import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import styles from './beerCard.module.scss';
import { joinClassNames } from '../../helpers/classNameHelpers';

export default function BeerCardSingleProductPage({beer}) {

    return (
        <Card className={styles.beerCard}>   
            <Card.Body>
                <Row>
                    <Col xs={12} md={8}>
                        <Card.Title className="mb-3 mt-3">{beer.name}</Card.Title>
                        <Card.Text>{beer.description}</Card.Text>
                        <Card.Text>{beer.brewers_tips}</Card.Text>
                    </Col>
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
                    <Col xs={12} md={4} className="pt-4">
                        <img src={beer.image_url} alt={beer.name} className={styles.beerCardImage} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Text>Contributed by: <span className={styles.contributedBy}>{beer.contributed_by}</span></Card.Text>
                    </Col>
                </Row>
                <Row>
                    <Button>Add to cart</Button>
                </Row>
            </Card.Body>
        </Card>
    )
}