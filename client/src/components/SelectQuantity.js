import React from 'react';

const SelectQuantity = ({ selectedQuantity, handleQuantityChange, className, classNameContainer }) => {
  return (
    <div className={classNameContainer}>
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
