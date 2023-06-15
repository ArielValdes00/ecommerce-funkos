import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import SelectQuantity from './SelectQuantity';

const ButtonAdded = ({ buttonText, className, disabled, product }) => {
    const {
        addItemToCart,
        selectedQuantities,
        setSelectedQuantity,
        setShowModal,
    } = useContext(ProductContext);
    const selectedQuantity = selectedQuantities[product.id] || 1;

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        setSelectedQuantity(product.id, newQuantity);
        addItemToCart(product.id, newQuantity)
        setShowModal(false)
      };

    return (
        <div className="group grid grid-cols-7 items-center rounded-full bg-black text-white w-full border-2 border-black mt-3 font-bold hover:bg-white hover:text-black">
            <SelectQuantity
                classNameContainer="select-container col-span-2"
                selectedQuantity={selectedQuantity}
                handleQuantityChange={handleQuantityChange}
                className="text-center pl-5 rounded-l-full bg-black cursor-pointer h-full w-full border-r focus:outline-none group-hover:bg-white group-hover:border-black group-hover:border-black"
            />
            <button
                disabled={disabled}
                onClick={() => addItemToCart(product.id)}
                className={`uppercase col-span-5 flex items-center justify-center pe-3 py-2 rounded-r-full h-full w-full ${className}`}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default ButtonAdded;
