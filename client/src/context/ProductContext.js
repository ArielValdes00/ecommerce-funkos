import React, { createContext, useState, useReducer, useEffect } from 'react';
import { cartReducer } from '../reducer/cartReducer';
import useBooleanState from '@/hooks/useBooleanState';
import { getProducts } from '../../utils/apiProducts';

const initialState = {
    cart: [],
    totalPrice: 0,
    selectedQuantities: {},
};

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
    const [wishlist, setWishlist] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProductModal, setSelectedProductModal] = useState(null);
    const [showModal, toggleShowModal] = useBooleanState(false);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [showModalWishlist, toggleShowModalWishlist] = useBooleanState(false);
    const [isLoading, toggleIsLoading] = useBooleanState(false);
    const [removeModalClicked, setRemoveModalClicked] = useBooleanState(false);

    const setSelectedQuantity = (productId, quantity) => {
        setSelectedQuantities((prevSelectedQuantities) => ({
            ...prevSelectedQuantities,
            [productId]: quantity,
        }));
    };

    const addToWishlist = (productId) => {
        const productToAdd = products.find((product) => product.id === productId);
        setSelectedProductModal(productToAdd)
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
    const isInCart = (productId) => {
        const { cart } = cartState;
        return cart.some((product) => product.id === productId);
    };

    const toggleWishlist = (productId) => {
        toggleIsLoading();
        if (isInWishlist(productId)) {
            setSelectedProductModal(productId);
            removeFromWishlist(productId);
            setTimeout(() => {
                toggleIsLoading();
            }, 500);
        } else {
            addToWishlist(productId);
            setSelectedProductModal(productId);
            setTimeout(() => {
                toggleShowModalWishlist();
                toggleIsLoading();
            }, 500);
            setTimeout(() => {
                toggleShowModalWishlist();
            }, 3000);
        }
    };

    const addItemToCart = (id, quantity = 1) => {
        const productToAdd = products.find(product => product.id === id);
        setSelectedProductModal(productToAdd);
        const { cart } = cartState;
        toggleShowModal();
        if (productToAdd) {
            const itemInCart = cart.find(item => item.id === id);

            if (itemInCart) {
                cartDispatch({ type: 'ADD_ITEM', payload: { ...productToAdd, quantity } });
            } else {
                cartDispatch({ type: 'ADD_ITEM', payload: { ...productToAdd, quantity } });
            }

            cartDispatch({ type: 'UPDATE_TOTAL_PRICE' });
        }
    };

    const removeItemFromCart = (id) => {
        toggleShowModal();
        const { cart } = cartState;

        const updatedCart = cart.filter(item => item.id !== id);
        const updatedQuantities = { ...selectedQuantities };
        delete updatedQuantities[id];

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('selectedQuantities', JSON.stringify(updatedQuantities));

        cartDispatch({ type: 'REMOVE_ITEM', payload: id });
        cartDispatch({ type: 'UPDATE_TOTAL_PRICE' });

        setSelectedQuantities(updatedQuantities);
    };

    const removeAllItemsFromCart = () => {
        cartDispatch({ type: 'REMOVE_ALL_ITEMS' });
        setSelectedQuantities({});
    };

    useEffect(() => {
        const getItems = () => {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                cartDispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
            }
            const savedQuantities = localStorage.getItem('selectedQuantities');
            if (savedQuantities) {
                const parsedQuantities = JSON.parse(savedQuantities);
                setSelectedQuantities(parsedQuantities);
            }
            const savedWishlist = localStorage.getItem('wishlist');
            if (savedWishlist) {
                const parsedWishlist = JSON.parse(savedWishlist);
                setWishlist(parsedWishlist);
            }
        }
        getItems();
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

    useEffect(() => {
        const getAllProduct = async () => {
            const res = await getProducts();
            setProducts(res)
        }
        getAllProduct();
    }, [])

    return (
        <ProductContext.Provider
            value={{
                filteredProducts,
                setFilteredProducts,
                totalProducts,
                updateProducts,
                handleCategoryChange,
                handleSortChange,
                handleSearchChange,
                cartState,
                cartDispatch,
                addItemToCart,
                removeItemFromCart,
                removeAllItemsFromCart,
                setSelectedProductModal,
                selectedProductModal,
                wishlist,
                isInWishlist,
                toggleWishlist,
                showModal,
                toggleShowModal,
                isInCart,
                selectedQuantities,
                setSelectedQuantities,
                setSelectedQuantity,
                toggleShowModalWishlist,
                showModalWishlist,
                isLoading,
                toggleIsLoading,
                setRemoveModalClicked,
                removeModalClicked,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
