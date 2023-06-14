import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'

const ButtonAdded = ({ buttonText, className, disabled, product }) => {
    const { addItemToCart, selectedQuantities, setSelectedQuantity, setShowModal } = useContext(ProductContext)
    const selectedQuantity = selectedQuantities[product.id] || 1;

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value, 10) || selectedQuantities[product.id] || 1;
        setSelectedQuantity(product.id, quantity);
        addItemToCart(product.id, quantity);
        setShowModal(false)
    };

    useEffect(() => {
        localStorage.setItem('selectedQuantities', JSON.stringify(selectedQuantities));
      }, [selectedQuantities]);

    return (
        <div className="group grid grid-cols-7 items-center rounded-full bg-black text-white w-full border-2 border-black mt-3 font-bold hover:bg-white hover:text-black">
            <div className="select-container rounded-l-full col-span-2">
                <select
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    className={`${className} text-center pl-5 rounded-l-full bg-black cursor-pointer h-full w-full border-r focus:outline-none group-hover:bg-white group-hover:border-black group-hover:border-black`}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <button
                disabled={disabled}
                onClick={() => addItemToCart(product.id)}
                className={`uppercase col-span-5 flex items-center justify-center pe-3 py-2 rounded-r-full h-full w-full" ${className}`}>
                {buttonText}
            </button>
        </div>
    );
}

export default ButtonAdded