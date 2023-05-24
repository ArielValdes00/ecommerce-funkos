import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

const AddToCartButton = ({ product, textButton, className }) => {
    const { addItemToCart } = useContext(ProductContext)
    return (
        <button
            onClick={() => addItemToCart(product.id)}
            className={className}>
            {textButton}
        </button>
    )
}

export default AddToCartButton