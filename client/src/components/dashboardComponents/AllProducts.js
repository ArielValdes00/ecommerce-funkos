import React, { useEffect, useState, useContext, useRef } from 'react'
import { deleteProducts, updateProduct } from "../../../utils/apiProducts";
import { createProducts } from "../../../utils/apiProducts"
import { BsFilterLeft } from 'react-icons/bs';
import { ProductContext } from '@/context/ProductContext';
import ProductModal from './ProductModal';
import useBooleanState from '@/hooks/useBooleanState';

const AllProducts = ({ initialProducts, session, toast }) => {
    const [isFilterMenuOpen, setIsFilterModalOpen] = useState(false);
    const [hoveredProductId, setHoveredProductId] = useState(null);
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
    const [showModal, toggleShowModal] = useBooleanState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [boxImage, setBoxImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const userRole = session?.user.role

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
                if (userRole === 'superAdmin') {
                    const response = await updateProduct(currentProduct.id, form);
                    setFilteredProducts(
                        filteredProducts.map((product) =>
                            product.id === currentProduct.id ? { ...product, ...response } : product
                        )
                    );
                    setCurrentProduct(null);
                } else {
                    toast.error('Forbidden: You do not have permission to perform this action.')
                }
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

                if (userRole === 'superAdmin') {
                    const response = await createProducts(formData, userRole);
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
                } else {
                    toast.error('Forbidden: You do not have permission to perform this action.')
                }
            }
        } catch (error) {
            console.error(error)
        }
    };

    const handleDelete = async (id) => {
        if (userRole === 'superAdmin') {
            try {
                await deleteProducts(id);
                const updatedProducts = filteredProducts.filter(product => product.id !== id);
                setFilteredProducts(updatedProducts);
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error('Forbidden: You do not have permission to perform this action.')
        }
    }

    const handleCloseModal = () => {
        toggleShowModal();
        setCurrentProduct(null);
    }

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setForm(product);
        setIsEditing(true);
        toggleShowModal();
    }

    const toggleShowModalProduct = () => {
        setIsEditing(false);
        toggleShowModal();
    }

    return (
        <div className='h-full'>
            <div className="w-full max-w-md mx-auto text-center p-3">
                {showModal && (
                    <ProductModal
                        title={isEditing ? 'Edit Product' : 'Create Product'}
                        showModal={showModal}
                        handleCloseModal={handleCloseModal}
                        handleSubmit={handleSubmit}
                        form={form}
                        handleChange={handleChange}
                        handleImageChange={handleImageChange}
                        handleBoxImageChange={handleBoxImageChange}
                        imageInputRef={imageInputRef}
                        boxImageInputRef={boxImageInputRef}
                        selectedFile={selectedFile}
                        boxImage={boxImage}
                        buttonName={isEditing ? 'Update' : 'Create'}
                    />
                )}
            </div>
            <div className="flex items-center mx-3">
                <div className="grid grid-cols-3 items-center w-full lg:hidden">
                    <button onClick={showFilters} className="flex items-center gap-1 font-semibold">
                        <BsFilterLeft size={25} className="text-black" />
                        <span className="hidden md:block">FILTER AND SORT</span>
                    </button>
                    <p className="font-semibold text-center">{`(${filteredProducts.length}) Results`}</p>
                    <button onClick={toggleShowModalProduct} className="bg-blue-600 text-sm text-white ml-auto py-1 px-4 rounded-full">
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
                    <button onClick={toggleShowModalProduct} className="bg-blue-600 font-semibold lg:order-3 text-white py-1 px-4 rounded-full">
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
                        <div
                            onMouseEnter={() => setHoveredProductId(product.id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                        >
                            <img
                                src={hoveredProductId === product.id ? product.boxImage : product.image}
                                alt={product.name}
                                width={115}
                                height={115}
                                className='mx-auto transition-all duration-300 ease-in-out transform hover:scale-110 m-1'
                            />
                        </div>
                        <p className='capitalize text-sm'>{product.category}</p>
                        <h3 className='capitalize font-semibold text-sm whitespace-normal'>{product.name}</h3>
                        <p className='text-sm'>${product.price}</p>
                        <div className='flex flex-col gap-2 mt-1 items-center text-white mb-2'>
                            <button onClick={() => handleDelete(product.id, userRole)} className="rounded-full py-1 w-2/3 text-sm bg-red-700 hover:bg-red-800">Remove</button>
                            <button onClick={() => handleEdit(product, userRole)} className="rounded-full py-1 w-2/3 text-sm bg-blue-600 hover:bg-blue-700">Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default AllProducts