import React from 'react';
import Image from "next/image";
import ArrowQuantity from '/public/icons/arrow-quantity.svg';

const SelectQuantity = ({ selectedQuantity, handleQuantityChange, className, isHovered, classNameContainer, arrowPosition,invert }) => {
    return (
        <div className={classNameContainer}>
            <Image
                src={ArrowQuantity}
                alt='Arrow'
                className={`${arrowPosition} absolute top-1 cursor-pointer arrow ${isHovered ? '' : `${invert}`
                    }`}
            />
            <select
                value={selectedQuantity}
                onChange={handleQuantityChange}
                className={className}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>
    );
}

export default SelectQuantity;
