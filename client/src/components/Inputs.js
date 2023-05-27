import React from 'react'

const Input = ({ type, className, placeholder, textError, labelName, name, onChange }) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={labelName}>
                {labelName}
            </label>
            <input
                type={type}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
            />
            <span className='d-none'>{textError}</span>
        </div>
    )
}

export default Input