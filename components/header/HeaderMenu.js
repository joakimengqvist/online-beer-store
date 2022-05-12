import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Modal } from 'react-bootstrap';
import { Cart3 } from 'react-bootstrap-icons';
import Link from 'next/link';
import styles from './headerMenu.module.scss';
import SearchInput from '../search/SearchInput';
import { useWebshopStateMachine } from '../../webshop/useWebshopStateMachine';
import Cart from '../cart/Cart';

export default function HeaderMenu() {
    const [state, dispatch] = useWebshopStateMachine();
    const [showingCart, setShowingCart] = useState(false);

    useEffect(() => {
      dispatch({ type: 'FETCH_CART_AMOUNT' });
    }, []);
    
    useEffect(() => {
      setTimeout(() => {
      dispatch({ type: 'FETCH_CART_AMOUNT' });
      }, 5000);
    });

    return (
        <Navbar bg="light" expand="lg">
        <Container>
        <Link href="/">
          <Navbar.Brand style={{marginLeft: '20px'}} href="#home">
          BrewDog</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <div style={{marginLeft: '10px'}}>
              <Link href="/" >
              Home
              </Link>
              </div>
            
              <div style={{marginLeft: '20px'}}>
              <Link href="/beer">
             Beers
              </Link>
              </div>
            </Nav>
            <Nav className="justify-content-end" style={{width: '360px'}}>
              <SearchInput />
              <div className={styles.cartContainer}>
              <span className={styles.cartNumber}>
                  {state.itemsInCart}
                </span>
                
              <Cart3 onClick={() => setShowingCart(true)} />

              <CartModal 
                show={showingCart}
                handleClose={() => setShowingCart(false)}
              />
            </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

function CartModal(props) {
  const { show, handleClose } = props; 

  return (
    <div className={styles.cartModal}>
      <Modal className={styles.cartModal} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart />
          </Modal.Body>
      </Modal>
      </div>
 
  );
}