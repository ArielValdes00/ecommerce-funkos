export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const updatedCart = [...state.cart, action.payload];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return {
                ...state,
                cart: updatedCart,
            };
        case 'LOAD_CART':
            return {
                ...state,
                cart: action.payload,
            };
        case 'REMOVE_ITEM':

            return {
                ...state,
                cart: action.payload,
            };
        case 'REMOVE_ALL_ITEMS':
            localStorage.removeItem('cart');
            return {
                ...state,
                cart: [],
                totalPrice: 0,
            };
        case 'INCREMENT_QUANTITY':
            const productId = action.payload;
            const incrementedCart = state.cart.map((item) => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + 1;
                    return {
                        ...item,
                        quantity: Math.min(newQuantity, item.stock),
                    };
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(incrementedCart));
            return {
                ...state,
                cart: incrementedCart,
            };


        case 'DECREMENT_QUANTITY':
            const decrementedCart = state.cart.map((item) => {
                if (item.id === action.payload) {
                    const newQuantity = item.quantity - 1;
                    return {
                        ...item,
                        quantity: newQuantity >= 1 ? newQuantity : 1,
                    };
                }
                return item;
            });
            localStorage.setItem('cart', JSON.stringify(decrementedCart));
            return {
                ...state,
                cart: decrementedCart,
            };
        case 'UPDATE_TOTAL_PRICE':
            const totalPrice = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            return {
                ...state,
                totalPrice,
            };
    }
};


