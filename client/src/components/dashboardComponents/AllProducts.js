import React, { useEffect, useState, useContext, useRef } from 'react'
import { deleteProducts, updateProduct } from "../../../utils/apiProducts";
import { createProducts } from "../../../utils/apiProducts"
import { BsFilterLeft } from 'react-icons/bs';
import { ProductContext } from '@/context/ProductContext';

const AllProducts = ({ initialProducts }) => {
    const [isFilterMenuOpen, setIsFilterModalOpen] = useState(false)
    const {
        handleCategoryChange,
        handleSortChange,
        handleSearchChange,
        filteredProducts,
        setFilteredProducts
    } = useContext(ProductContext);
    const imageInputRef = useRef(null);
    const boxImageInputRef = useRef(null);
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: "",
        boxImage: "",
    })
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [boxImage, setBoxImage] = useState(null);

    const showFilters = () => {
        setIsFilterModalOpen(!isFilterMenuOpen)
    }

    useEffect(() => {
        setFilteredProducts(initialProducts);
    }, []);

    const closeMenuOnResize = () => {
        if (window.innerWidth > 1024) {
            setIsFilterModalOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', closeMenuOnResize);

        return () => {
            window.removeEventListener('resize', closeMenuOnResize);
        };
    }, []);

    const handleBoxImageChange = (e) => {
        setBoxImage(e.target.files[0]);
    };

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
                const response = await updateProduct(currentProduct.id, form);
                setFilteredProducts(
                    filteredProducts.map((product) =>
                        product.id === currentProduct.id ? { ...product, ...response } : product
                    )
                );
                setCurrentProduct(null);
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

                if (boxImage) {
                    formData.append('boxImage', boxImage);
                }

                const response = await createProducts(formData);
                imageInputRef.current.value = "";
                boxImageInputRef.current.value = "";

                setSelectedFile(null);
                setForm({
                    name: "",
                    price: "",
                    description: "",
                    category: "",
                    stock: "",
                    image: "",
                    boxImage: ""
                });
                setFilteredProducts([...filteredProducts, response]);
            }
        } catch (error) {
            console.error(error)
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProducts(id);
            const updatedProducts = filteredProducts.filter(product => product.id !== id);
            setFilteredProducts(updatedProducts);
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
        <div className='h-full'>
            <div className="w-full max-w-md mx-auto text-center p-3">
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
                                            <input type="file" ref={imageInputRef} name="image" onChange={handleImageChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="boxImage" className="block mb-1">Image with Box:</label>
                                            <input type="file" ref={boxImageInputRef} name="boxImage" onChange={handleBoxImageChange} />
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
            <div className="flex items-center mx-3">
                <div className="grid grid-cols-3 items-center w-full lg:hidden">
                    <button onClick={showFilters} className="flex items-center gap-1 font-semibold">
                        <BsFilterLeft size={25} className="text-black" />
                        <span className="hidden md:block">FILTER AND SORT</span>
                    </button>
                    <p className="font-semibold text-center">{`(${filteredProducts.length}) Results`}</p>
                    <button onClick={handleOpenModal} className="bg-blue-600 text-sm text-white ml-auto py-1 px-4 rounded-full">
                        Add+
                    </button>
                </div>
                <div className={`${isFilterMenuOpen ? "block fixed bg-gray-100 text-black top-0 min-h-screen right-0 z-50" : "hidden lg:flex"}
                 flex flex-col lg:p-0 gap-5 xl:gap-7 lg:flex-row items-center w-full`}>
                    <div className="lg:hidden flex justify-between w-full px-5 py-3">
                        <div className="flex items-center gap-2 font-extrabold text-lg">
                            <BsFilterLeft size={25} />
                            ALL FILTERS
                        </div>
                        <div className="flex items-center">
                            <button onClick={showFilters} className="lg:hidden rounded-full bg-black text-white lg:font-base font-extrabold text-lg px-4 py-1">DONE</button>
                        </div>
                    </div>
                    <div className="flex lg:m-0 lg:order-2 items-center rounded-lg mt-14 py-5 lg:p-0 lg:m-0">
                        <label htmlFor="search" className="mr-2 lg:font-bold text-sm font-extrabold">SEARCH:</label>
                        <input
                            id="search"
                            name="search"
                            type="text"
                            onChange={handleSearchChange}
                            className="py-1 px-2 rounded-lg lg:w-full w-80 border border-gray-300 outline-none lg:font-base lg:font-semibold font-extrabold focus:border-black"
                        />
                    </div>
                    <div className="flex lg:order-1 items-center py-5 lg:p-0">
                        <label htmlFor="category" className="mr-3 lg:font-bold text-sm font-extrabold">CATEGORY:</label>
                        <select id="category" name="category" onChange={handleCategoryChange} className="rounded-lg py-1 px-2 lg:font-semibold font-extrabold border w-80 lg:w-min border-gray-300">
                            <option value="all">All</option>
                            <option value="marvel">Marvel</option>
                            <option value="disney">Disney</option>
                            <option value="anime">Anime</option>
                            <option value="dc comics">DC Comics</option>
                        </select>
                    </div>
                    <div className="flex lg:order-0 items-center py-6 lg:p-0">
                        <label htmlFor="sort" className="mr-3 font-extrabold text-sm lg:font-bold">SORT BY:</label>
                        <select id="sort" name="sort" onChange={handleSortChange} className="rounded-lg font-extrabold lg:font-semibold py-1 px-2 w-80 lg:w-min border border-gray-300">
                            <option value="asc">Low To High</option>
                            <option value="desc">High To Low</option>
                            <option value="recent">Latest</option>
                        </select>
                    </div>
                    <button onClick={handleOpenModal} className="bg-blue-600 font-semibold lg:order-3 text-white py-1 px-4 rounded-full">
                        Add+
                    </button>
                    <div className={`${isFilterMenuOpen ? "hidden" : "block"} ml-auto lg:order-4`}>
                        <p className="font-semibold">{`(${filteredProducts.length}) Results`}</p>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 m-2 mt-3 gap-2'>
                {filteredProducts?.map((product) => (
                    <div key={product.id} className="flex flex-col gap-1 py-1 bg-white border rounded text-lg text-center rounded-lg border-gray-200">
                        <img src={product.image} width={105} alt={product.name} className='mx-auto p-1 py-2' />
                        <p className='capitalize text-sm'>{product.category}</p>
                        <h3 className='capitalize font-semibold text-sm whitespace-normal'>{product.name}</h3>
                        <p className='text-sm'>${product.price}</p>
                        <div className='flex flex-col gap-2 mt-1 items-center text-white mb-2'>
                            <button onClick={() => handleDelete(product.id)} className="rounded-full py-1 w-2/3 text-sm bg-red-700 hover:bg-red-800">Remove</button>
                            <button onClick={() => handleEdit(product)} className="rounded-full py-1 w-2/3 text-sm bg-blue-600 hover:bg-blue-700">Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default AllProducts