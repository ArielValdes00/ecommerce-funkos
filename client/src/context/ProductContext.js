import React, { createContext, useState, useReducer, useEffect } from 'react';
import { getProducts } from '../../utils/apiProducts';
import { cartReducer } from '../reducer/cartReducer';

const initialState = {
    cart: [],
};

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
    const [wishlist, setWishlist] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProductModal, setSelectedProductModal] = useState([]);
    const [recentProducts, setRecentProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);


    const addToWishlist = (productId) => {
        const productToAdd = products.find((product) => product.id === productId);
        setWishlist((prevWishlist) => [...prevWishlist, productToAdd]);
        localStorage.setItem('wishlist', JSON.stringify([...wishlist, productToAdd]));
    };

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter((product) => product.id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const isInWishlist = (productId) => {
        return wishlist.some((product) => product.id === productId);
    };
    
    const toggleWishlist = (productId) => {
        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    const addItemToCart = (id) => {
        const { cart } = cartState;
        const productToAdd = products.find((product) => product.id === id);
        setShowModal(true)
        setSelectedProductModal(productToAdd)
        if (productToAdd) {
            const itemInCart = cart.find((item) => item.id === id);

            if (itemInCart) {
                const newQuantity = itemInCart.quantity + 1;
                const maxQuantity = Math.min(newQuantity, productToAdd.stock);
                cartDispatch({ type: 'INCREMENT_QUANTITY', payload: { id, quantity: maxQuantity } });
                cartDispatch({ type: 'UPDATE_TOTAL_PRICE' });

            } else {
                const maxQuantity = Math.min(1, productToAdd.stock);
                cartDispatch({ type: 'ADD_ITEM', payload: { ...productToAdd, quantity: maxQuantity } });
                cartDispatch({ type: 'UPDATE_TOTAL_PRICE' });

            }
        }
    };

    const removeItemFromCart = (id) => {
        const updatedCart = cartState.cart.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        cartDispatch({ type: 'REMOVE_ITEM', payload: updatedCart });
        cartDispatch({ type: 'UPDATE_TOTAL_PRICE' });
    };

    const removeAllItemsFromCart = () => {
        cartDispatch({ type: 'REMOVE_ALL_ITEMS' });
    };

    const incrementQuantity = (id) => {
        cartDispatch({ type: 'INCREMENT_QUANTITY', payload: id });
        cartDispatch({ type: 'UPDATE_TOTAL_PRICE' });
    };

    const decrementQuantity = (id) => {
        cartDispatch({ type: 'DECREMENT_QUANTITY', payload: id });
        cartDispatch({ type: 'UPDATE_TOTAL_PRICE' });
    };

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cartDispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
        }
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            const parsedWishlist = JSON.parse(savedWishlist);
            setWishlist(parsedWishlist);
        }
    }, []);

    const updateProducts = (newProducts) => {
        setProducts(newProducts);
        setFilteredProducts(newProducts);
        setTotalProducts(newProducts.length);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        if (category === 'all') {
            setFilteredProducts(products);
            setTotalProducts(products.length);
        } else {
            const filtered = products.filter(product => product.category === category);
            setFilteredProducts(filtered);
            setTotalProducts(filtered.length);
        }
    };

    const handleSortChange = (e) => {
        const sort = e.target.value;
        if (sort === 'recent') {
            handleRecentProducts();
        } else {
            const sorted = [...filteredProducts].sort((a, b) => {
                if (sort === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
            setFilteredProducts(sorted);
        }
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchTerm(searchTerm);
        setFilteredProducts(filtered);
        setTotalProducts(filtered.length);
    };

    const handleRecentProducts = () => {
        const sorted = [...filteredProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFilteredProducts(sorted);
    };

    const getRecentProducts = async () => {
        try {
            const limit = 6;
            const recentProducts = await getProducts(limit);
            return recentProducts;
        } catch (error) {
            console.error('Error al obtener los últimos productos:', error);
            return [];
        }
    };
    useEffect(() => {
        const fetchRecentProducts = async () => {
            const products = await getRecentProducts();
            setRecentProducts(products);
        };

        fetchRecentProducts();
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            const products = await getProducts();
            setProducts(products);
            cartDispatch({ type: 'UPDATE_TOTAL_PRICE' });
        }

        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                filteredProducts,
                totalProducts,
                updateProducts,
                handleCategoryChange,
                handleSortChange,
                handleSearchChange,
                getRecentProducts,
                cartState,
                cartDispatch,
                addItemToCart,
                removeItemFromCart,
                incrementQuantity,
                decrementQuantity,
                removeAllItemsFromCart,
                selectedProductModal,
                wishlist,
                isInWishlist,
                toggleWishlist,
                recentProducts,
                showModal,
                setShowModal
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
