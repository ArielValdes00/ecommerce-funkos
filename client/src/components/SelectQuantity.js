import React from 'react';
import { RxTriangleDown } from 'react-icons/rx';

const SelectQuantity = ({ selectedQuantity, handleQuantityChange, className, isHovered, classNameContainer, arrowPosition }) => {
    return (
        <div className={classNameContainer}>
            <RxTriangleDown
                    size={30}
                    className={`z-40 absolute ${arrowPosition} top-1 cursor-pointer ${
                        isHovered ? 'text-black' : ''
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
