import React from 'react';
import { BsCloudArrowUp } from 'react-icons/bs';

const InputFile = ({ imageRef, handleImageChange, labelName, selectedImage }) => {
    const inputId = labelName.replace(/\s/g, '');

    return (
        <div className="text-center border-dashed border-2 border-gray-400 p-3">
            <label htmlFor={inputId} className="block cursor-pointer">
                <BsCloudArrowUp size={60} className='mx-auto mb-1 text-gray-700' />
                <input
                    type="file"
                    id={inputId}
                    ref={imageRef}
                    name="image"
                    onChange={(e) => handleImageChange(e)}
                    className="hidden"
                />
                <span className="mt-2 text-sm font-semibold text-gray-700">{selectedImage ? selectedImage.name : labelName}</span>
            </label>
        </div>
    )
}

export default InputFile