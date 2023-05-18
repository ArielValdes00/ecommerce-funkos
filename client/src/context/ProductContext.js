import React, { createContext, useState } from 'react';
import { getProducts } from '../../utils/api';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    
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
            const limit = 12;
            const recentProducts = await getProducts(limit);
            return recentProducts;
        } catch (error) {
            console.error('Error al obtener los últimos productos:', error);
            return [];
        }
    };

    return (
        <ProductContext.Provider
            value={{
                filteredProducts,
                totalProducts,
                updateProducts,
                handleCategoryChange,
                handleSortChange,
                handleSearchChange,
                getRecentProducts
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
