import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';

export default function Footer() {
    return (
       <div style={{clear: 'both', marginTop: '60px'}}>
           <Container>
        <Row>
           
            <Col>
            <Card style={{border: 'none'}}>
                <Card.Body>
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{border: 'none'}}>
                <Card.Body>
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{border: 'none'}}>
                <Card.Body>
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
         
        </Row>
        </Container>
        </div>
     
   
    )
}
