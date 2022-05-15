import React from 'react'
import Cart from '../components/cart/Cart'
import MainLayout from '../layouts/MainLayout';
import { Row, Col } from 'react-bootstrap';

export default function Checkout() {
    return (
        <MainLayout>
            <Row>
                <Col>
                    <Cart checkoutPage={true} />
                </Col>
                <Col></Col>
            </Row>
        </MainLayout>
    )
}

