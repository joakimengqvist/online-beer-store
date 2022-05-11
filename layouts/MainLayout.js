import React from 'react';
import HeaderMenu from '../components/HeaderMenu';
import { Row, Container } from 'react-bootstrap';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainLayout({ children }) { 
    return (
        <div>
            <HeaderMenu />
            <Row>
                <Container>
                    {children} 
                </Container>
            </Row>   
            <Row>
                <Footer />
            </Row>
        </div>
    )
}