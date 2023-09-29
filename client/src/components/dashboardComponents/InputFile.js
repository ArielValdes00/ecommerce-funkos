import React from 'react';
import UploadImage from '/public/icons/upload-image.png';
import Image from 'next/image';

const InputFile = ({ imageRef, handleImageChange, labelName, selectedImage }) => {
    const inputId = labelName.replace(/\s/g, '');

    return (
        <div className="mt-2 text-center border-dashed border-2 border-gray-300 py-3 pt-4">
            <label htmlFor={inputId} className="block cursor-pointer">
                <Image src={UploadImage} height={60} width={60} alt='Upload Image'
                    className='mx-auto mb-2' />
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