import React from 'react';
import InputFile from './InputFile';
import { AiFillCloseCircle } from 'react-icons/ai';

const ProductModal = ({
    handleCloseModal,
    handleSubmit,
    form,
    handleChange,
    handleImageChange,
    handleBoxImageChange,
    imageInputRef,
    boxImageInputRef,
    selectedFile,
    boxImage,
    buttonName,
    title }) => {
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="fixed z-50 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={handleCloseModal}>
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate__animated animate__fadeInDown">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className='flex justify-between'>
                                <h2 className="text-lg leading-6 font-semibold text-gray-900 mb-6">{title}</h2>
                                <AiFillCloseCircle
                                    onClick={handleCloseModal}
                                    size={26}
                                    className='cursor-pointer'
                                />
                            </div>
                            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className='text-sm flex flex-col gap-1'>
                                        <label htmlFor="name" className="block">Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="border rounded-md p-1 w-full"
                                            value={form.name}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="price" className="block">Price:</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="price"
                                            id="price"
                                            className="border rounded-md p-1 w-full"
                                            value={form.price}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="description" className="block">Description:</label>
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            className="border rounded-md p-1 w-full"
                                            value={form.description}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="category" className="block">Category:</label>
                                        <input
                                            type="text"
                                            name="category"
                                            id="category"
                                            className="border rounded-md p-1 w-full"
                                            value={form.category}
                                            onChange={handleChange}
                                        />

                                        <label htmlFor="stock" className="block">Stock:</label>
                                        <input
                                            type="text"
                                            name="stock"
                                            id="stock"
                                            className="border rounded-md p-1 w-full"
                                            value={form.stock}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='flex flex-col justify-evenly gap-1 mt-3'>
                                        <InputFile
                                            handleImageChange={(e) => handleImageChange(e)}
                                            imageRef={imageInputRef}
                                            labelName={'Upload Pop Image'}
                                            selectedImage={selectedFile}
                                        />
                                        <InputFile
                                            handleImageChange={(e) => handleBoxImageChange(e)}
                                            imageRef={boxImageInputRef}
                                            labelName={'upload Box Image'}
                                            selectedImage={boxImage}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center items-center mt-5">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white rounded-full px-4 py-1 hover:bg-blue-600">{buttonName}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
