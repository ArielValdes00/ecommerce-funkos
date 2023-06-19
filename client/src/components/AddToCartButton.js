import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

const AddToCartButton = ({ product, textButton, className, quantity }) => {
    const { addItemToCart } = useContext(ProductContext)

    const handleClick = () => {
        addItemToCart(product.id, quantity);
    }
    
    return (
        <button
            onClick={handleClick}
            className={className}>
            {textButton}
        </button>
    )
}

export default AddToCartButton