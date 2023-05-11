import { deleteProducts, updateProducts } from "../../../utils/api";
import { createProducts, getProducts } from "../../../utils/api"
import { useState, useEffect } from "react";

const products = () => {
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
    const [selectedFile ,setSelectedFile] = useState(null);

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
        e.preventDefault()
        try {
            if (currentProduct) {
                const response = await updateProducts(currentProduct.id, form);
                setProducts(products.map(product => product.id === currentProduct.id ? { ...product, ...response } : product));
                setCurrentProduct(null);
                fetchProducts()
            } else {
                const response = await createProducts(form);
                setForm("");
                setProducts([...products, response]);
                console.log(products)
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="name" className="block mb-1">Name:</label>
                                            <input type="text" name="name" className="border rounded-md p-1" onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="price" className="block mb-1">Price:</label>
                                            <input type="text" name="price" className="border rounded-md p-1" onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block mb-1">Description:</label>
                                            <input type="text" name="description" className="border rounded-md p-1" onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="category" className="block mb-1">Category:</label>
                                            <input type="text" name="category" className="border rounded-md p-1" onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="stock" className="block mb-1">Stock:</label>
                                            <input type="text" name="stock" className="border rounded-md p-1" onChange={handleChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="image" className="block mb-1">Image:</label>
                                            <input type="file" onChange={handleImageChange}/>
                                        </div>
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
                {products.map((product) => (
                    <div key={product.id} className="col-span-1 rounded p-3 m-3 border ">
                        <h3>Name: {product.name}</h3>
                        <p>Price: {product.price}</p>
                        <p>Description: {product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Stock: {product.stock}</p>
                        
                        <button onClick={() => handleDelete(product.id)} className="border rounded bg-red-600 text-white p-2">Eliminar</button>
                        <button onClick={() => handleEdit(product)} className="border rounded bg-blue-600 text-white p-2">Editar</button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default products