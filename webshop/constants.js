export const EVENTS = {
    FETCH_ORDER: 'FETCH_ORDER',
    FETCH_CART_AMOUNT: 'FETCH_CART_AMOUNT',
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
    CHANGE_ITEM_QUANTITY: 'CHANGE_ITEM_QUANTITY',
    CHANGE_ITEM_QUANTITY_NO_UPDATE:  'CHANGE_ITEM_QUANTITY_NO_UPDATE',
    INCREMENT_ITEM_QUANTITY: 'INCREMENT_ITEM_QUANTITY',
    DECREMENT_ITEM_QUANTITY: 'DECREMENT_ITEM_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    CHECKOUT: 'CHECKOUT',
    INITIALIZE_PAYMENT: 'INITIALIZE_PAYMENT',
    COMPLETE_PAYMENT: 'COMPLETE_PAYMENT',
    QUIT_CHECKOUT: 'QUIT_CHECKOUT',
};

export const EFFECTS = {
    triggerToast: 'triggerToast',
    removeItemFromCart: 'removeItemFromCart',
    initiateCheckout: 'initiateCheckout',
    initializePayment: 'initializePayment',
    completePayment: 'completePayment',
    quitCheckout: 'quitCheckout',
}

export const STATUSES = {
    idle: 'idle',
    index: 'index',
    pendingPurchase: 'pendingPurchase',
    pendingPayment: 'pendingPayment',
    purchaseCompleted: 'purchaseCompleted',
}

export const TOAST_TYPES = {
    invalidQuantity: 'invalidQuantity',
    add: 'add',
    remove: 'remove',
    change: 'change',
    clear: 'clear',
}

export const STATE = {
    cart: 'cart'
}