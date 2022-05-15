import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Modal } from "react-bootstrap";
import { Cart3 } from "react-bootstrap-icons";
import Link from "next/link";
import styles from "./headerMenu.module.scss";
import "react-toastify/dist/ReactToastify.css";
import SearchInput from "../search/SearchInput";
import { useWebshopStateMachine } from "../../webshop/useWebshopStateMachine";
import { runningOnClient } from "../../helpers/runningOnClient";
import { ToastContainer } from "react-toastify";
import { EVENTS } from "../../webshop/constants";
import Cart from "../cart/Cart";

export default function HeaderMenu() {
  const [state, dispatch] = useWebshopStateMachine();
  const [showingCart, setShowingCart] = useState(false);

  let isCheckoutPage = false;
  if (runningOnClient()) {
    isCheckoutPage = window.location.pathname === "/checkout";
  }

  useEffect(() => {
    dispatch({ type: EVENTS.FETCH_CART_AMOUNT });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: EVENTS.FETCH_CART_AMOUNT });
    }, 3000);
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: EVENTS.FETCH_CART_AMOUNT });
    }, 3000);
  });

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand style={{ marginLeft: "20px" }} href="#home">
            BrewDog
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div style={{ marginLeft: "10px" }}>
              <Link href="/">
                <span className={styles.headerMenuItem} id="home-header-link">
                  Home
                </span>
              </Link>
            </div>

            <div style={{ marginLeft: "20px" }}>
              <Link href="/beers/1">
                <span className={styles.headerMenuItem} id="beer-header-link">
                  {" "}
                  Beers
                </span>
              </Link>
            </div>
          </Nav>
          <Nav className="justify-content-end" style={{ width: "360px" }}>
            <SearchInput />
            <div className={styles.cartContainer}>
              {!isCheckoutPage ? (
                <>
                  <span id="headerCartNumber" className={styles.cartNumber}>
                    {state.itemsInCart}
                  </span>
                  <Cart3
                    id="openCart"
                    onClick={() => setShowingCart(true)}
                    style={{ cursor: "pointer" }}
                  />
                </>
              ) : (
                <>
                  <span>cart: </span>
                  <span id="headerCartNumber" className={styles.cartNumber}>
                    {state.itemsInCart}
                  </span>
                </>
              )}
            </div>
            <CartModal
              show={showingCart}
              handleClose={() => setShowingCart(false)}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>

      <ToastContainer newestOnTop={false} rtl={false} />
    </Navbar>
  );
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
          <Cart handleCartModalClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
