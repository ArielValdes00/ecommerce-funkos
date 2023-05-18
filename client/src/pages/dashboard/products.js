import React from 'react'
import { deleteProducts, updateProducts } from "../../../utils/apiProducts";
import { createProducts, getProducts } from "../../../utils/apiProducts"
import { getSession, signOut } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useRef } from "react";


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
        console.log(selectedFile)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct) {
                const response = await updateProducts(currentProduct.id, form);
                console.log(form)
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
            formData.append("image", selectedFile);

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
            console.error("Error en la función handleSubmit:", error);
            console.error("Error en la función handleSubmit:", error.stack);
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
            <h1 className="text-center text-4xl m-3">
                PRODUCTS
            </h1>
            <div className="w-full max-w-md mx-auto text-center p-3">
                <div>
                    {session ? (<div>
                        <h3>{session.user.name}</h3>
                        <p>{session.user.email}</p>
                        <img src={session.user.image} alt='ayuda'></img>
                    </div>) : (
                        <p>Loading...</p>
                    )}
                </div>
                <button onClick={handleOpenModal} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Create Product
                </button>
                <button onClick={() => signOut()}>Logout</button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products ? (products.map((product) => (
                    <div key={product.id} className="col-span-1 rounded p-3 m-3 border ">
                        <img src={product.image} alt={product.name}></img>
                        <h3>Name: {product.name}</h3>
                        <p>Price: {product.price}</p>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Stock: {product.stock}</p>

                        <button onClick={() => handleDelete(product.id)} className="border rounded bg-red-600 text-white p-2">Eliminar</button>
                        <button onClick={() => handleEdit(product)} className="border rounded bg-blue-600 text-white p-2">Editar</button>
                    </div>
                ))) : (<div>ayuda</div>)}
            </div>
        </div>
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