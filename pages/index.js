import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Link from 'next/link';
import { Row, Col, Container, Button, Card } from 'react-bootstrap';

export default function Index() {
    return (
        <MainLayout>
            <Container style={{height: '340px'}}>
                <div className="pt-5">
                    <h1  className="mt-5">Brewdog -<br />best beer in the world.</h1>
                    <h4  className="mt-3"> <Link href="/beers/1">Have a look at all our beer</Link></h4>
                </div>
            </Container>
        </MainLayout>
    )
}


