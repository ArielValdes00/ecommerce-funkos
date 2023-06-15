export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const itemToAdd = action.payload;
            const existingItem = state.cart.find(item => item.id === itemToAdd.id);

            if (existingItem) {
                const updatedCart = state.cart.map(item => {
                    if (item.id === itemToAdd.id) {
                        return {
                            ...item,
                            quantity: itemToAdd.quantity, 
                        };
                    }
                    return item;
                });

                const updatedQuantities = {
                    ...state.selectedQuantities,
                    [itemToAdd.id]: itemToAdd.quantity,
                };

                localStorage.setItem('cart', JSON.stringify(updatedCart));
                localStorage.setItem('selectedQuantities', JSON.stringify(updatedQuantities));

                return {
                    ...state,
                    cart: updatedCart,
                    selectedQuantities: updatedQuantities,
                };
            } else {
                const updatedCart = [...state.cart, itemToAdd];
                const updatedQuantities = {
                    ...state.selectedQuantities,
                    [itemToAdd.id]: itemToAdd.quantity,
                };

                localStorage.setItem('cart', JSON.stringify(updatedCart));
                localStorage.setItem('selectedQuantities', JSON.stringify(updatedQuantities));

                return {
                    ...state,
                    cart: updatedCart,
                    selectedQuantities: updatedQuantities,
                };
            }



        case 'LOAD_CART':
            return {
                ...state,
                cart: action.payload,
            };


        case 'REMOVE_ITEM':
            const idToRemove = action.payload;
            const updatedCart = state.cart.filter(item => item.id !== idToRemove);
            const updatedQuantities = { ...state.selectedQuantities };
            delete updatedQuantities[idToRemove];

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            localStorage.setItem('selectedQuantities', JSON.stringify(updatedQuantities));

            return {
                ...state,
                cart: updatedCart,
                selectedQuantities: updatedQuantities,
            };

        case 'REMOVE_ALL_ITEMS':
            localStorage.removeItem('cart');
            localStorage.removeItem('selectedQuantities');

            return {
                ...state,
                cart: [],
                totalPrice: 0,
            };

        case 'UPDATE_TOTAL_PRICE':
            const totalPrice = state.cart.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
            return {
                ...state,
                totalPrice: totalPrice,
            };

        default:
            return state;
    }
};
