import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, Modal } from "react-bootstrap";
import { useWebshopStateMachine } from "../../webshop/useWebshopStateMachine";
import { EVENTS, STATUSES } from "../../webshop/constants";
import Link from "next/link";
import styles from "./cart.module.scss";

export default function Cart(props) {
  const { checkoutPage = false, handleCartModalClose = () => {} } = props;
  const [state, dispatch] = useWebshopStateMachine();
  const [showPaymenyModal, setShowPaymentModal] = useState(false);

  function increment(itemId) {
    dispatch({ type: EVENTS.INCREMENT_ITEM_QUANTITY, itemId });
  }

  function decrement(itemId, quantity) {
    if (quantity === 1) {
      dispatch({ type: EVENTS.REMOVE_ITEM_FROM_CART, itemId });
      return null;
    }
    dispatch({ type: EVENTS.DECREMENT_ITEM_QUANTITY, itemId });
  }

  function removeItem(itemId) {
    dispatch({ type: EVENTS.REMOVE_ITEM_FROM_CART, itemId });
  }

  function changeItem(itemId, quantity) {
    dispatch({ type: EVENTS.CHANGE_ITEM_QUANTITY, itemId, quantity });
  }

  function changeItemNoUpdate(itemId, quantity) {
    dispatch({ type: EVENTS.CHANGE_ITEM_QUANTITY_NO_UPDATE, itemId, quantity });
  }

  function clearCart() {
    dispatch({ type: EVENTS.CLEAR_CART });
  }

  function checkout() {
    setShowPaymentModal(true);
    dispatch({ type: EVENTS.CHECKOUT });
  }

  useEffect(() => {
    dispatch({ type: EVENTS.FETCH_ORDER });
  }, []);

  if (state.cart === {}) {
    return null;
  }

  return (
    <Card>
      {state.itemsInCart > 0 && (
        <>
          <div className="p-4">
            {Object.keys(state.cart).map((itemId) => (
              <ItemInCheckout
                state={state}
                itemId={itemId}
                decrement={decrement}
                increment={increment}
                removeItem={removeItem}
                changeItem={changeItem}
                changeItemNoUpdate={changeItemNoUpdate}
                handleCartModalClose={handleCartModalClose}
                checkoutPage={checkoutPage}
              />
            ))}
          </div>
          <Row className="p-4">
            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ marginRight: "12px" }}
                variant="outline-danger"
                onClick={clearCart}
              >
                Clear cart
              </Button>
              {checkoutPage ? (
                <Button id="checkoutBigCart" onClick={checkout}>
                  Checkout
                </Button>
              ) : (
                <Link href="/checkout">
                  <Button id="checkoutSmallCart">Checkout</Button>
                </Link>
              )}
            </Col>
          </Row>
          <PaymentModal
            show={showPaymenyModal}
            handleClose={() => setShowPaymentModal(false)}
            state={state}
            dispatch={dispatch}
          />
        </>
      )}
      {state.itemsInCart === 0 && <h4 className="p-4">Cart is empty</h4>}
    </Card>
  );
}

function PaymentModal(props) {
  const { show, handleClose, state } = props;

  useEffect(() => {
    if (state.status === STATUSES.index) {
      handleClose();
    }
  }, [state.status]);

  return (
    <Modal show={show}>
      <Modal.Header style={{ maxWidth: "1000px" }}>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxWidth: "1000px" }}>
        {state.status === STATUSES.pendingPurchase && <h5>Pending purchase</h5>}
        {state.status === STATUSES.pendingPayment && <h5>Pending Payment</h5>}
        {state.status === STATUSES.purchaseCompleted && (
          <h5>Purchase completed</h5>
        )}
      </Modal.Body>
    </Modal>
  );
}

function ItemInCheckout(props) {
  const {
    state,
    itemId,
    increment,
    decrement,
    removeItem,
    changeItem,
    changeItemNoUpdate,
    handleCartModalClose = () => {},
    checkoutPage,
  } = props;

  return (
    <Card.Text key={state.cart[itemId].id} className={styles.itemRow}>
      <div onClick={handleCartModalClose}>
        <Link href={`/beer/${state.cart[itemId].id}`}>
          <a style={{ fontSize: "18px", fontWeight: "bold" }}>
            {state.cart[itemId].name}
          </a>
        </Link>
      </div>
      <span>
        <Button
          onClick={() => decrement(itemId, state.cart[itemId].quantityInCart)}
          variant="outline-secondary"
          className={styles.incrementDecrementButton}
        >
          <span
            id={
              "derementBeer" +
              state.cart[itemId].id +
              (checkoutPage ? "BigCart" : "SmallCart")
            }
            className={styles.decrementOperand}
          >
            -
          </span>
        </Button>
        <input
          id={
            "quantityInCart" +
            state.cart[itemId].id +
            (checkoutPage ? "BigCart" : "SmallCart")
          }
          onBlur={(event) => {
            changeItem(itemId, event.target.value);
          }}
          onChange={(event) => changeItemNoUpdate(itemId, event.target.value)}
          value={state.cart[itemId].quantityInCart}
          className={styles.quantityInCart}
          type="text"
          numeric
        />
        <Button
          onClick={() => increment(itemId)}
          variant="outline-secondary"
          className={styles.incrementDecrementButton}
        >
          <span
            id={
              "incrementBeer" +
              state.cart[itemId].id +
              (checkoutPage ? "BigCart" : "SmallCart")
            }
            className={styles.incrementOperand}
          >
            +
          </span>
        </Button>
        <Button
          onClick={() => removeItem(itemId)}
          variant="outline-danger"
          style={{ marginLeft: "20px" }}
        >
          Remove
        </Button>
      </span>
    </Card.Text>
  );
}
