import React from 'react';
import HeaderMenu from '../components/header/HeaderMenu';
import { Row, Container } from 'react-bootstrap';
import Footer from '../components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainLayout({ children }) { 
    return (
        <div>
            <HeaderMenu />
            <Container style={{paddingTop: '40px'}}>
                {children} 
            </Container>
            <Footer />        
        </div>
    )
}