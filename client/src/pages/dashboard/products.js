import React from 'react'
import { deleteProducts, updateProducts } from "../../../utils/apiProducts";
import { createProducts, getProducts } from "../../../utils/apiProducts"
import { getSession } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useRef } from "react";
import SideBar from '@/dashboardComponents/SideBar';

const products = ({ session }) => {
    const imageInputRef = useRef(null);
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: null
    })
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct) {
                const response = await updateProducts(currentProduct.id, form);
                setProducts(
                    products.map((product) =>
                        product.id === currentProduct.id ? { ...product, ...response } : product
                    )
                );
                setCurrentProduct(null);
                fetchProducts();
            } else {
                const formData = new FormData();
                formData.append("name", form.name);
                formData.append("price", form.price);
                formData.append("description", form.description);
                formData.append("category", form.category);
                formData.append("stock", form.stock);

                if (selectedFile) {
                    formData.append('image', selectedFile);
                }

                const response = await createProducts(formData);
                imageInputRef.current.value = "";

                setSelectedFile(null);
                setForm({
                    name: "",
                    price: "",
                    description: "",
                    category: "",
                    stock: "",
                    image: null,
                });
                setProducts([...products, response]);
            }
        } catch (error) {
            console.error(error)
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProducts(id);
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
        } catch (error) {
            console.log(error);
        }
    }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setCurrentProduct(null)
    }

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setForm(product);
        setShowModal(true)
    }

    return (
        <div>
            <SideBar />
            <div className='absolute left-48 bg-white'>
                <h1 className="text-center font-extrabold text-5xl m-3">
                    PRODUCTS
                </h1>
                <div className="w-full max-w-md mx-auto text-center p-3">
                    <div className='flex text-lg'>
                        <h3>Welcome! {session.user.name}</h3>
                    </div>
                    <button onClick={handleOpenModal} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Create Product
                    </button>
                    {showModal && (
                        <div className="fixed z-50 inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={handleCloseModal}>
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Formulario</h2>
                                        <form className="grid grid-cols-2 gap-4" encType="multipart/form-data" onSubmit={handleSubmit}>
                                            <div>
                                                <label htmlFor="name" className="block mb-1">Name:</label>
                                                <input type="text" name="name" className="border rounded-md p-1" value={form.name} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="price" className="block mb-1">Price:</label>
                                                <input type="number" step="0.01" name="price" className="border rounded-md p-1" value={form.price} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="description" className="block mb-1">Description:</label>
                                                <input type="text" name="description" className="border rounded-md p-1" value={form.description} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="category" className="block mb-1">Category:</label>
                                                <input type="text" name="category" className="border rounded-md p-1" value={form.category} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="stock" className="block mb-1">Stock:</label>
                                                <input type="text" name="stock" className="border rounded-md p-1" value={form.stock} onChange={handleChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="image" className="block mb-1">Image:</label>
                                                <input type="file" ref={imageInputRef} name="image" onChange={handleImageChange} />                                        </div>
                                            <div className="col-span-2 mt-4">
                                                <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2">Create product</button>
                                                <button type="button" onClick={handleCloseModal} className="border rounded-md px-4 py-2">Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <ul className='grid grid-cols-8 font-semibold text-lg text-center border-b border-black py-2'>
                        <li>Image</li>
                        <li>Name</li>
                        <li>Price</li>
                        <li>Description</li>
                        <li>Category</li>
                        <li>Stock</li>
                        <li>Delete</li>
                        <li>Update</li>
                    </ul>
                    {products?.map((product) => (
                        <div key={product.id} className="grid grid-cols-8 text-lg text-center items-center rounded border-gray-200 border-b">
                            <img src={product.image} width={105} alt={product.name} className='mx-auto p-1 py-2'></img>
                            <h3 className='capitalize'>{product.name}</h3>
                            <p className='text-sm'>${product.price}</p>
                            <p className="max-h-16 overflow-y-auto w-full text-xs">{product.description}</p>
                            <p className='capitalize'>{product.category}</p>
                            <p>{product.stock}</p>
                            <div className='mx-auto'>
                                <button onClick={() => handleDelete(product.id)} className="text-red-700 p-2">Remove</button>
                            </div>
                            <div className='mx-auto'>
                                <button onClick={() => handleEdit(product)} className="text-blue-600 p-2">Edit</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) return {
        redirect: {
            destination: '/dashboard',
            permanent: false
        }
    }

    return {
        props: {
            session
        }
    }
}

export default products