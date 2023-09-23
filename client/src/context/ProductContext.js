import React, { createContext, useState, useReducer, useEffect } from 'react';
import { getProducts } from '../../utils/apiProducts';
import { cartReducer } from '../reducer/cartReducer';

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
    const [showModal, setShowModal] = useState(false);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [showModalWishlist, setShowModalWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [removeModalClicked, setRemoveModalClicked] = useState(false);

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
        setShowModal(false)
        setIsLoading(true);
        if (isInWishlist(productId)) {
            setSelectedProductModal(productId);
            removeFromWishlist(productId);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        } else {
            addToWishlist(productId);
            setSelectedProductModal(productId);
            setTimeout(() => {
                setShowModalWishlist(true);
                setIsLoading(false);
            }, 500);
            setTimeout(() => {
                setShowModalWishlist(false);
            }, 3000);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    }

    const addItemToCart = (id, quantity = 1) => {
        const productToAdd = products.find(product => product.id === id);
        setSelectedProductModal(productToAdd);
        const { cart } = cartState;
        setShowModal(true);
        setRemoveModalClicked(false)
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
        setShowModal(false);
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
        setSelectedQuantities({})
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
        getItems()
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
        const fetchProducts = async () => {
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
                setFilteredProducts,
                totalProducts,
                updateProducts,
                handleCategoryChange,
                handleSortChange,
                handleSearchChange,
                cartState,
                closeModal,
                closeModal,
                cartDispatch,
                addItemToCart,
                removeItemFromCart,
                removeAllItemsFromCart,
                setSelectedProductModal,
                setSelectedProductModal,
                selectedProductModal,
                wishlist,
                isInWishlist,
                toggleWishlist,
                showModal,
                setShowModal,
                isInCart,
                selectedQuantities,
                setSelectedQuantities,
                setSelectedQuantity,
                setShowModalWishlist,
                showModalWishlist,
                isLoading,
                setIsLoading,
                setRemoveModalClicked,
                removeModalClicked,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
