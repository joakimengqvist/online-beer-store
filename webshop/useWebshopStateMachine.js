import { useReducer, useEffect, useRef } from 'react';
import { createEffect } from './createEffect';

function reducer(state, event) {
    switch (state.status) {
        case 'index': {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};

            if (event.type === 'ADD_ITEM_TO_CART') {
                cart[event.payload.id] = event.payload;
                localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart
                }     
            }

            if (event.type === 'INCREMENT_ITEM_IN_CART') {
                cart[event.payload.id].quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart
                }   
            }

            if (event.type === 'DECREMENT_ITEM_IN_CART') {
                cart[event.payload.id].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart
                }   
            }

            if (event.type === 'REMOVE_ITEM_FROM_CART') {
                delete cart[event.payload.id];
                localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart
                }   
            }

            if (event.type === 'ClEAR_CART') {
                localStorage.setItem('cart', JSON.stringify({}));

                return {
                    ...state,
                    cart: {}
                }
            }

            if (event.type === 'INITIATE_CHECKOUT') {
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

    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify({}));
    }

    useEffect(() => {
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
