import { useReducer, useEffect, useRef } from "react";
import { createEffect } from "../helpers/createEffect";
import { runningOnClient } from "../helpers/runningOnClient";
import { EFFECTS, EVENTS, STATUSES, TOAST_TYPES, STATE } from "./constants";
import { toast } from "react-toastify";
import { toastSettings } from "./toastSettings";

function reducer(state, event) {
  if (!runningOnClient()) {
    return null;
  }

  switch (state.status) {
    case STATUSES.index: {
      const cart = JSON.parse(window.localStorage.getItem(STATE.cart)) || {};

      if (event.type === EVENTS.FETCH_ORDER) {
        return {
          ...state,
          cart: cart,
          itemsInCart: Object.keys(cart).length,
        };
      }

      if (event.type === EVENTS.FETCH_CART_AMOUNT) {
        return {
          ...state,
          itemsInCart: Object.keys(cart).length,
        };
      }

      if (event.type === EVENTS.ADD_ITEM_TO_CART) {
        const beerIdInCart = `beerid${event.beer.id}`;
        const beerName = event.beer.name;
        if (cart[beerIdInCart]) {
          cart[beerIdInCart].quantityInCart++;
          window.localStorage.setItem(STATE.cart, JSON.stringify(cart));
          return {
            ...state,
            cart: cart,
            effects: [
              ...state.effects,
              createEffect(EFFECTS.triggerToast, {
                action: TOAST_TYPES.add,
                beerName: beerName,
              }),
            ],
          };
        }
        cart[beerIdInCart] = event.beer;
        cart[beerIdInCart].quantityInCart = 1;
        window.localStorage.setItem(STATE.cart, JSON.stringify(cart));

        return {
          ...state,
          cart: cart,
          itemsInCart: state.itemsInCart + 1,
          effects: [
            ...state.effects,
            createEffect(EFFECTS.triggerToast, {
              action: TOAST_TYPES.add,
              beerName: beerName,
            }),
          ],
        };
      }

      if (event.type === EVENTS.REMOVE_ITEM_FROM_CART) {
        if (!cart[event.itemId]) {
          return state;
        }
        const beerName = cart[event.itemId].name;
        delete cart[event.itemId];
        window.localStorage.setItem(STATE.cart, JSON.stringify(cart));

        return {
          ...state,
          cart: cart,
          itemsInCart: state.itemsInCart - 1,
          effects: [
            ...state.effects,
            createEffect(EFFECTS.triggerToast, {
              action: TOAST_TYPES.remove,
              beerName: beerName,
            }),
          ],
        };
      }

      if (event.type === EVENTS.CHANGE_ITEM_QUANTITY) {
        const quantity = event.quantity;
        const quantityString = quantity.toString();

        if (quantity === cart[event.itemId].quantityInCart) {
          return state;
        }

        if (quantityString === "") {
          return {
            ...state,
            effects: [
              ...state.effects,
              createEffect(EFFECTS.removeItemFromCart, {
                itemId: event.itemId,
              }),
            ],
          };
        }

        if (quantity < 1) {
          return {
            ...state,
            effects: [
              ...state.effects,
              createEffect(EFFECTS.removeItemFromCart, {
                itemId: event.itemId,
              }),
            ],
          };
        }

        if (!/^[0-9]+$/.test(quantityString)) {
          return {
            ...state,
            effects: [
              ...state.effects,
              createEffect(EFFECTS.triggerToast, {
                action: TOAST_TYPES.invalidQuantity,
              }),
            ],
          };
        }

        cart[event.itemId].quantityInCart = quantity;
        window.localStorage.setItem(STATE.cart, JSON.stringify(cart));
        return {
          ...state,
          cart: cart,
          effects: [
            ...state.effects,
            createEffect(EFFECTS.triggerToast, {
              action: TOAST_TYPES.change,
              beerName: cart[event.itemId].name,
              quantity: quantity,
            }),
          ],
        };
      }

      if (event.type === EVENTS.CHANGE_ITEM_QUANTITY_NO_UPDATE) {
        const quantity = event.quantity;
        cart[event.itemId].quantityInCart = quantity;
        return {
          ...state,
          cart: cart,
        };
      }

      if (event.type === EVENTS.INCREMENT_ITEM_QUANTITY) {
        cart[event.itemId].quantityInCart++;
        window.localStorage.setItem(STATE.cart, JSON.stringify(cart));

        return {
          ...state,
          cart: cart,
        };
      }

      if (event.type === EVENTS.DECREMENT_ITEM_QUANTITY) {
        cart[event.itemId].quantityInCart--;
        window.localStorage.setItem(STATE.cart, JSON.stringify(cart));

        return {
          ...state,
          cart: cart,
        };
      }

      if (event.type === EVENTS.CLEAR_CART) {
        window.localStorage.setItem(STATE.cart, JSON.stringify({}));

        return {
          ...state,
          cart: {},
          itemsInCart: 0,
          effects: [
            ...state.effects,
            createEffect(EFFECTS.triggerToast, { action: TOAST_TYPES.clear }),
          ],
        };
      }

      if (event.type === EVENTS.CHECKOUT) {
        return {
          ...state,
          status: STATUSES.pendingPurchase,
          effects: [...state.effects, createEffect(EFFECTS.initiateCheckout)],
        };
      }

      return state;
    }

    case STATUSES.pendingPurchase: {
      if (event.type === EVENTS.INITIALIZE_PAYMENT) {
        return {
          ...state,
          status: STATUSES.pendingPayment,
          effects: [...state.effects, createEffect(EFFECTS.initializePayment)],
        };
      }
      return state;
    }
    case STATUSES.pendingPayment: {
      if (event.type === EVENTS.COMPLETE_PAYMENT) {
        return {
          ...state,
          status: STATUSES.purchaseCompleted,
          effects: [...state.effects, createEffect(EFFECTS.completePayment)],
        };
      }
      return state;
    }

    case STATUSES.purchaseCompleted: {
      if (event.type === EVENTS.QUIT_CHECKOUT) {
        return {
          ...state,
          status: STATUSES.index,
          effects: [...state.effects, createEffect(EFFECTS.quitCheckout)],
        };
      }
      return state;
    }
  }
}

export function useWebshopStateMachine(campaign) {
  const [{ effects, ...state }, dispatch] = useReducer(reducer, {
    status: STATUSES.index,
    effects: [],
    cart: {},
    itemsInCart: 0,
  });

  const formRef = useRef(null);

  if (runningOnClient() && !window.localStorage.getItem(STATE.cart)) {
    window.localStorage.setItem(STATE.cart, JSON.stringify({}));
  }

  useEffect(() => {
    if (!runningOnClient()) {
      return null;
    }

    for (const effect of effects) {
      if (effect.status !== STATUSES.idle) {
        continue;
      }

      effect.markAsStarted();

      if (effect.type === EFFECTS.triggerToast) {
        if (effect.action === TOAST_TYPES.invalidQuantity) {
          toast.error(`Invalid quantity`, toastSettings("top-right"));
        }

        if (effect.action === TOAST_TYPES.add) {
          toast.success(
            `Added ${effect.beerName} to cart`,
            toastSettings("bottom-right")
          );
        }

        if (effect.action === TOAST_TYPES.remove) {
          toast.info(
            `Removed ${effect.beerName} to cart`,
            toastSettings("bottom-right")
          );
        }

        if (effect.action === TOAST_TYPES.change) {
          toast.success(
            `Changed ${effect.beerName} to ${effect.quantity}`,
            toastSettings("bottom-right")
          );
        }

        if (effect.action === TOAST_TYPES.clear) {
          toast.info("Cleared cart", toastSettings("bottom-right"));
        }
      }

      if (effect.type === EFFECTS.removeItemFromCart) {
        dispatch({ type: EVENTS.REMOVE_ITEM_FROM_CART, itemId: effect.itemId });
      }

      if (effect.type === EFFECTS.initiateCheckout) {
        setTimeout(() => {
          dispatch({ type: EVENTS.INITIALIZE_PAYMENT });
        }, 2000);
      }

      if (effect.type === EFFECTS.initializePayment) {
        setTimeout(() => {
          dispatch({ type: EVENTS.COMPLETE_PAYMENT });
        }, 2000);
      }

      if (effect.type === EFFECTS.completePayment) {
        setTimeout(() => {
          dispatch({ type: EVENTS.QUIT_CHECKOUT });
        }, 2000);
      }

      if (effect.type === EFFECTS.quitCheckout) {
        dispatch({ type: EVENTS.CLEAR_CART });
      }
    }
  }, [state, campaign, effects]);

  return [state, dispatch, formRef];
}
