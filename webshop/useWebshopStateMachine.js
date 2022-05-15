import { useReducer, useEffect, useRef } from 'react';
import { createEffect } from '../helpers/createEffect';
import { runningOnClient } from '../helpers/runningOnClient';
import { toast } from 'react-toastify';

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
                    itemsInCart: Object.keys(cart).length,
                }
            }

            if (event.type === 'FETCH_CART_AMOUNT') {
                return {
                    ...state,
                    itemsInCart: Object.keys(cart).length,
                }
            }

            if (event.type === 'ADD_ITEM_TO_CART') {
                const beerIdInCart = `beerid${event.beer.id}`;
                const beerName = event.beer.name;
                if (cart[beerIdInCart]) {
                    cart[beerIdInCart].quantityInCart++;
                    window.localStorage.setItem('cart', JSON.stringify(cart));
                    return {
                        ...state,
                        cart: cart,
                        effects: [...state.effects, createEffect('triggerToast', {action: 'add', beerName: beerName})],
                    }   
                }
                cart[beerIdInCart] = event.beer;
                cart[beerIdInCart].quantityInCart = 1;
                window.localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart,
                    itemsInCart: state.itemsInCart + 1,
                    effects: [...state.effects, createEffect('triggerToast', {action: 'add', beerName: beerName})],
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
                    cart: cart,
                }   
            }

            if (event.type === 'REMOVE_ITEM_FROM_CART') {
                const beerName = cart[event.itemId].name;
                delete cart[event.itemId];
                window.localStorage.setItem('cart', JSON.stringify(cart));

                return {
                    ...state,
                    cart: cart,
                    itemsInCart: state.itemsInCart - 1,
                    effects: [...state.effects, createEffect('triggerToast', {action: 'remove', beerName: beerName})],
                }   
            }

            if (event.type === 'CLEAR_CART') {
                window.localStorage.setItem('cart', JSON.stringify({}));

                return {
                    ...state,
                    cart: {},
                    itemsInCart: 0,
                    effects: [...state.effects, createEffect('triggerToast', {action: 'clear'})],
                }
            }

            if (event.type === 'CHECKOUT') {
                return {
                    ...state,
                    status: 'pendingPurchase',
                    effects: [...state.effects, createEffect('initiateCheckout')],
                }
            }

            return state;
        }


        case 'pendingPurchase': {
            if (event.type === 'INITIALIZE_PAYMENT') {
                return {
                    ...state,
                    status: 'pendingPayment',
                    effects: [...state.effects, createEffect('initializePayment')],
                }
            }
            return state;
        }
        case 'pendingPayment': {
            if (event.type === 'COMPLETE_PAYMENT') {
                return {
                    ...state,
                    status: 'purchaseCompleted',
                    effects: [...state.effects, createEffect('completePayment')],
                }
            }
            return state;
        }

        case 'purchaseCompleted': {
            if (event.type === 'QUIT_CHECKOUT') {
                return {
                    ...state,
                    status: 'index',
                    effects: [...state.effects, createEffect('quitCheckout')],
                }
            }
            return state;
        }
            
    }
}

export function useWebshopStateMachine(campaign) {
    const [{ effects, ...state }, dispatch] = useReducer(reducer, {
        status: 'index',
        effects: [],
        cart: {},
        itemsInCart: 0,
        paymentStatus: '',
    });

    const formRef = useRef(null);

    
    if (runningOnClient() && !window.localStorage.getItem('cart')) {
        window.localStorage.setItem('cart', JSON.stringify({}));
    }

    useEffect(() => {
        if (!runningOnClient()) {
            return null
        }

        for (const effect of effects) {
            if (effect.status !== 'idle') {
                continue;
            }

            effect.markAsStarted();

            if (effect.type  === 'triggerToast') {
                if (effect.action  === 'add') {
                    toast.success(`Added ${effect.beerName} to cart`, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                    }); 
                }
                if (effect.action  === 'remove') {
                    toast.info(`Removed ${effect.beerName} to cart`, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                    });
                }
                if (effect.action  === 'clear') {
                    toast.info('Cleared cart', {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                    });
                }
            }

            if (effect.type === 'initiateCheckout') {
                setTimeout(() => {
                    dispatch({ type: 'INITIALIZE_PAYMENT' });
                }, 2000);
            }

            if (effect.type === 'initializePayment') {
                setTimeout(() => {
                    dispatch({ type: 'COMPLETE_PAYMENT' });
                }, 2000);
            }

            if (effect.type === 'completePayment') {
                setTimeout(() => {
                    dispatch({ type: 'QUIT_CHECKOUT' });
                }, 2000);
            }

            if (effect.type === 'quitCheckout') {
                dispatch({ type: 'CLEAR_CART' });
            }
        }
    }, [state, campaign, effects]);

    return [state, dispatch, formRef];
}
