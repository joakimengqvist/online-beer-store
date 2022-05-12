import { useReducer, useEffect, useRef } from 'react';
import { createEffect } from '../helpers/createEffect';
import { runningOnClient } from '../helpers/runningOnClient';

function reducer(state, event) {
    if (!runningOnClient()) {
        return null
    }
    switch (state.status) {
        case 'index': {
            const cart = JSON.parse(window.localStorage.getItem('cart')) || {};

            if (event.type === 'FETCH_ORDER') {
                return {
                    ...state,
                    cart: cart,
                
            }
          
        }


            if (event.type === 'ADD_ITEM_TO_CART') {
                console.log('adding item to cart', event)
                cart['beerid' + event.beer.id] = event.beer;
                cart['beerid' + event.beer.id].quantityInCart = 1;
                window.localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart
                }     
            }

            if (event.type === 'INCREMENT_ITEM_QUANTITY') {
                cart[event.itemId].quantityInCart++;
                window.localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart
                }   
            }

            if (event.type === 'DECREMENT_ITEM_QUANTITY') {
                cart[event.itemId].quantityInCart--;
                window.localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart
                }   
            }

            if (event.type === 'REMOVE_ITEM_FROM_CART') {
                delete cart[event.itemId];
                window.localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart
                }   
            }

            if (event.type === 'ClEAR_CART') {
                window.localStorage.setItem('cart', JSON.stringify({}));

                return {
                    ...state,
                    cart: {}
                }
            }

            if (event.type === 'CHECKOUT') {
                return {
                    ...state,
                    status: 'pendingPurchase',
                    effects: [...state.effects, createEffect('initiateCheckout')],
                }
            }
        }
        case 'pendingPurchase': {
            if (event.type === 'INITIALIZE_PAYMENT') {
                return {
                    ...state,
                    status: 'pendingPayment',
                    effects: [...state.effects, createEffect('initializePayment')],
                }
            }
        }
        case 'pendingPayment': {
            if (event.type === 'COMPLETE_PAYMENT') {
                return {
                    ...state,
                    status: 'purchaseCompleted',
                }
            }
        }

        case 'purchaseCompleted': {
                return {
                    ...state,
                    status: 'index',
                }
        }
            
    }
}

export function useWebshopStateMachine(campaign) {
    const [{ effects, ...state }, dispatch] = useReducer(reducer, {
        status: 'index',
        effects: [],
        cart: {}
    });

    const formRef = useRef(null);

    
    if (runningOnClient() && !window.localStorage.getItem('cart')) {
        window.localStorage.setItem('cart', JSON.stringify({}));
    }

    useEffect(() => {
        if (!runningOnClient()) {
            return null
        }
        console.log('cart', state.cart)
        for (const effect of effects) {
            if (effect.status !== 'idle') {
                continue;
            }

            effect.markAsStarted();

            if (effect.type === 'INITIALIZE_PAYMENT') {
                setTimeout(() => {
                    dispatch({ type: 'pendingPurchase' }, 2000);
                });
            }

            if (effect.type === 'INITIALIZE_PAYMENT') {
                setTimeout(() => {
                    dispatch({ type: 'COMPLETE_PAYMENT' }, 2000);
                });
            }

         
        }
    }, [state, campaign, effects]);

    return [state, dispatch, formRef];
}

function Checkout() {
    alert('checking out')
    
}
