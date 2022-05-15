import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useWebshopStateMachine } from "../../webshop/useWebshopStateMachine";
import styles from "./beerCard.module.scss";

export default function BeerCardSingleProductPage({ beer }) {
  const isBanned = beer.name === "Hello My Name is Vladimir";

  const [state, dispatch] = useWebshopStateMachine();

  function addToCard() {
    dispatch({ type: "ADD_ITEM_TO_CART", beer });
  }

  return (
    <Row className={isBanned && styles.cancelledBeer}>
      <Col xs={8}>
        <Card className="p-4">
          <div style={{ marginBottom: "40px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {isBanned ? (
                <h1 style={{ color: "red" }}>BANNED - {beer.name}</h1>
              ) : (
                <h1>{beer.name}</h1>
              )}

              <Button
                id="addToCartSinglePage"
                disabled={isBanned}
                onClick={addToCard}
              >
                Add to cart
              </Button>
            </div>
            <h4>{beer.tagline}</h4>
            <p>{beer.description}</p>
            <p>{beer.brewers_tips}</p>
          </div>

          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Brewing information</Card.Title>
                  {Object.keys(beer.ingredients).map((ingredientType) => (
                    <div key={ingredientType}>
                      <span>{ingredientType}: </span>
                      {Array.isArray(beer.ingredients[ingredientType])
                        ? beer.ingredients[ingredientType].map((ingredient) => (
                            <span key={ingredient.id}>{ingredient.name} </span>
                          ))
                        : beer.ingredients[ingredientType]}
                    </div>
                  ))}
                  <Card.Text>First brewed: {beer.first_brewed}</Card.Text>
                  <Card.Text>
                    <span style={{ fontWeight: "500", fontSize: "18px" }}>
                      Brewing Information
                    </span>
                    <br />
                    <span>
                      Fermentation temperature:{" "}
                      {beer.method.fermentation.temp.value}{" "}
                      {beer.method.fermentation.temp.unit}
                    </span>
                    <br />
                    {beer.method.mash_temp.map((mash, i) => (
                      <span>
                        Mash {++i}: {mash.temp.value} {mash.temp.unit}{" "}
                        {mash.duration} min
                        <br />
                      </span>
                    ))}
                    <span>Original gravity: {beer.target_og}</span>
                    <br />
                    <span>Final gravity: {beer.target_fg}</span>
                    <br />
                    <span>Attenuation level: {beer.attenuation_level}%</span>
                    <br />
                    <span>
                      Boil volume: {beer.boil_volume.value}{" "}
                      {beer.boil_volume.unit}
                    </span>
                    <br />
                    <span>
                      Volume: {beer.volume.value} {beer.volume.unit}
                    </span>
                    <br />
                    <span>PH: {beer.ph}</span>
                    <br />
                    <span>First brewed: {beer.first_brewed}</span>
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Other information</Card.Title>
                  <Card.Text>
                    <span style={{ fontWeight: "500", fontSize: "18px" }}>
                      Food pairing
                    </span>
                    <br />
                    {beer.food_pairing.map((food) => (
                      <span key={food}>
                        {food}
                        {beer.food_pairing.length - 1 ===
                        beer.food_pairing.indexOf(food)
                          ? "."
                          : ", "}
                      </span>
                    ))}
                  </Card.Text>

                  <Card.Text>
                    <span style={{ fontWeight: "500", fontSize: "18px" }}>
                      Assessment
                    </span>
                    <br />
                    <span>Standard Reference Method: {beer.srm}</span>
                    <br />
                    <span>European Brewing Convention: {beer.ebc}</span>
                    <br />
                    <span>International Bitterness Units: {beer.ibu}</span>
                    <br />
                  </Card.Text>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col xs={4} style={{ display: "flex", justifyContent: "center" }}>
        {!isBanned && (
          <img
            src={beer.image_url}
            alt={beer.name}
            style={{ maxHeight: "500px", marginTop: "60px" }}
          />
        )}
      </Col>
    </Row>
  );
}
