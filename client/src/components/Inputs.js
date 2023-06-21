import React, { useState } from 'react';
import { isValidName, isValidEmail, isValidAreaCode, isValidPhone, isValidPassword } from '../../utils/validations';

const Input = ({ type, placeholder, labelName, name }) => {
    const [error, setError] = useState(null);

    const validateInput = (value) => {
        switch (name) {
            case 'name':
                return !isValidName(value) ? 'Enter a valid name' : null;
            case 'email':
                return !isValidEmail(value) ? 'Enter a valid email address' : null;
            case 'phone':
                return !isValidPhone(value) ? 'Enter a valid phone number' : null;
            case 'areaCode':
                return !isValidAreaCode(value) ? 'Enter a valid area code' : null;
            case 'password':
                return !isValidPassword(value) ? 'Password must be at least 8 characters long' : null;
            default:
                return null;
        }
    };

    const handleKeyUp = (e) => {
        const inputValue = e.target.value;
        console.log(inputValue)
        setError(validateInput(inputValue));
    };

    return (
        <div className='relative'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={labelName}>
                {labelName}
            </label>
            <input
                type={type}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={placeholder}
                name={name}
                onKeyUp={handleKeyUp}
            />
            {error && <span className="text-red-500 text-sm absolute left-0 top-[68px]">{error}</span>}
        </div>
    );
};

export default Input;
