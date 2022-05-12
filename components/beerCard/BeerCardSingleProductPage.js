import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export default function BeerCardSingleProductPage({beer}) {

    return (
        <Row>
            <Col xs={8}>
                <div style={{marginBottom: '40px'}}>
                <h1>{beer.name}</h1>
                <h4>{beer.tagline}</h4>
                <p>{beer.description}</p>
                <p>{beer.brewers_tips}</p>
            </div>
      
      <Row>
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>Brewing information</Card.Title>
          {Object.keys(beer.ingredients).map(ingredientType => (
            <div key={ingredientType}>
              <span>{ingredientType}: </span>
              {Array.isArray(beer.ingredients[ingredientType]) ? beer.ingredients[ingredientType].map(ingredient => (
                <span key={ingredient.id}>{ingredient.name} </span>
              )) : beer.ingredients[ingredientType]}
            </div>
          ))}
          <Card.Text>First brewed: {beer.first_brewed}</Card.Text>
            <Card.Text>
                <span style={{fontWeight: '500', fontSize: '18px'}}>Brewing Information</span><br />
                <span>Fermentation temperature: {beer.method.fermentation.temp.value} {beer.method.fermentation.temp.unit}</span><br />
             {beer.method.mash_temp.map((mash, i) => (
                 <span>Mash {++i}: {mash.temp.value}  {mash.temp.unit}  {mash.duration} min<br /></span>
             ))}
             <span>Original gravity: {beer.target_og}</span><br/>
             <span>Final gravity: {beer.target_fg}</span><br/>
             <span>Attenuation level: {beer.attenuation_level}%</span><br/>
             <span>Boil volume: {beer.boil_volume.value} {beer.boil_volume.unit}</span><br/>
             <span>Volume: {beer.volume.value} {beer.volume.unit}</span><br/>
             <span>PH: {beer.ph}</span><br />
             <span>First brewed: {beer.first_brewed}</span><br/>
            </Card.Text>
          
        </Card.Body>
      </Card>
      </Col>

      <Col>
      <Card>
        <Card.Body>
          <Card.Title>Other information</Card.Title>
          <Card.Text><span style={{fontWeight: '500', fontSize: '18px'}}>Food pairing</span><br />
            {beer.food_pairing.map(food => (
                <span key={food}>
                    {food}
                {beer.food_pairing.length - 1 === beer.food_pairing.indexOf(food) ? '.' : ', '}
                </span>
            ))}
       </Card.Text>
         
          <Card.Text>
                <span style={{fontWeight: '500', fontSize: '18px'}}>Assessment</span><br />
              <span>Standard Reference Method: {beer.srm}</span><br/>
              <span>European Brewing Convention: {beer.ebc}</span><br/>
              <span>International Bitterness Units: {beer.ibu}</span><br/>
              
            </Card.Text>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
      </Col>
      </Row>
      </Col>
      <Col xs={4} style={{display: 'flex', justifyContent: 'center'}}>
      <img src={beer.image_url} alt={beer.name} style={{maxHeight: '400px'}}/>
      </Col>
      </Row>
    )
}
