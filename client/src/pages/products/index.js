import React from 'react';
import BannerSocialMedia from "@/components/BannerSocialMedia"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { getProducts } from '../../../utils/apiProducts';
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { ProductContext } from '../../context/ProductContext';
import { useSession } from 'next-auth/react';
import AddToCartButton from '@/components/AddToCartButton';
import ModalPurchase from '@/components/miscellaneous/ModalPurchase';
import ButtonAdded from '@/components/ButtonProductAdded';
import ModalWishlist from '@/components/miscellaneous/ModalWishlist';
import Loader from '@/components/Loader';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsFilterLeft } from 'react-icons/bs';

const Products = ({ initialProducts }) => {
    const { data: session } = useSession();
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [isFilterMenuOpen, setIsFilterModalOpen] = useState(false)
    const { updateProducts,
        filteredProducts,
        handleCategoryChange,
        handleSortChange,
        handleSearchChange,
        totalProducts,
        toggleWishlist,
        isInWishlist,
        showModal,
        isInCart,
        toggleShowModal,
        selectedProductModal,
        showModalWishlist,
        isLoading
    } = useContext(ProductContext);

    const showFilters = () => {
        setIsFilterModalOpen(!isFilterMenuOpen)
    }

    useEffect(() => {
        updateProducts(initialProducts);
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

    return (
        <>
            <Navbar session={session} />
            {showModal && (
                <ModalPurchase
                    title={'item(s) added to cart'}
                    quantity={'quantity: 1'}
                    firstButton={'view cart'}
                    secondButton={'continue shopping'}
                    category={selectedProductModal.category}
                    name={selectedProductModal.name}
                    image={selectedProductModal.image}
                    price={selectedProductModal.price}
                    handleConfirmation={toggleShowModal}
                    redirect={'/cart'}
                />
            )}
            <section className="md:px-28 py-5 sm:mx-4">
                <div className="text-xs text-gray-500 mb-7 mx-4 sm:mx-0">
                    <Link href={"/"}>Funko</Link> / <span>Products</span>
                </div>
                <h1 className="text-5xl font-extrabold mb-7 py-4 mx-4 sm:mx-0">PRODUCTS</h1>
                <div className="bg-gray-100 p-4 mb-8">
                    <div className="flex items-center gap-8">
                        <div className='flex items-center justify-between w-full lg:hidden'>
                            <button onClick={showFilters} className='flex items-center gap-3 font-extrabold'>
                                <BsFilterLeft size={25} className='text-black'/>
                                FILTER AND SORT
                            </button>
                            <div>
                                <p className='font-semibold text-lg'>{`(${totalProducts}) Results`}</p>
                            </div>
                        </div>
                        <div className={`${isFilterMenuOpen ? "block fixed bg-gray-100 text-black top-0 min-h-screen right-0 z-50" : "hidden"} flex flex-col lg:p-0 lg:grid gap-5 lg:grid-cols-4 items-center lg:w-full w-full  lg:col-span-4`}>
                            <div className='lg:hidden flex justify-between w-full px-5 py-3'>
                                <div className='flex items-center gap-2 font-extrabold text-lg'>
                                    <BsFilterLeft size={25}/>
                                    ALL FILTERS
                                </div>
                                <div className='flex items-center'>
                                    <button onClick={showFilters} className='lg:hidden rounded-full bg-black text-white lg:font-base font-extrabold text-lg px-4 py-1'>DONE</button>
                                </div>
                            </div>
                            <div className="flex flex-col xl:flex-row lg:m-0 lg:order-2 items-center rounded-lg mt-14 py-5 lg:p-0 lg:m-0">
                                <label htmlFor="search" className="mr-2 lg:font-bold font-extrabold text-lg">SEARCH:</label>
                                <input
                                    id="search"
                                    name="search"
                                    type="text"
                                    onChange={handleSearchChange}
                                    className="p-2 rounded-lg lg:w-full w-80 border border-gray-300 outline-none lg:font-base lg:font-semibold font-extrabold focus:border-black"
                                />
                            </div>
                            <div className='flex flex-col xl:flex-row lg:order-1 items-center py-5 lg:p-0'>
                                <label htmlFor="category" className="mr-3 lg:font-bold font-extrabold text-lg">CATEGORY:</label>
                                <select id="category" name="category" onChange={handleCategoryChange} className="rounded-lg p-2 lg:font-semibold font-extrabold border w-80 lg:w-min border-gray-300">
                                    <option value="all">All</option>
                                    <option value="marvel">Marvel</option>
                                    <option value="disney">Disney</option>
                                    <option value="anime">Anime</option>
                                    <option value="dc comics">DC Comics</option>
                                </select>
                            </div>
                            <div className='flex flex-col xl:flex-row lg:order-0 items-center py-6 lg:p-0'>
                                <label htmlFor="sort" className="mr-3 font-extrabold lg:font-bold text-lg">SORT BY:</label>
                                <select id="sort" name="sort" onChange={handleSortChange} className="rounded-lg font-extrabold lg:font-semibold p-2 w-80 lg:w-min border border-gray-300">
                                    <option value="asc">Low To High</option>
                                    <option value="desc">High To Low</option>
                                    <option value="recent">Latest</option>
                                </select>
                            </div>
                            <div className={`${isFilterMenuOpen ? "hidden" : "block"} ml-auto lg:order-3`}>
                                <p className="font-semibold text-lg">{`(${totalProducts}) Results`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className={`rounded-lg ${isLoading && selectedProductModal === product.id ? 'bg-neutral-600' : 'bg-white'} text-center py-3 md:px-3 px-2 shadow relative`}>
                                {isLoading && selectedProductModal === product.id && (
                                    <Loader />
                                )}
                                {showModalWishlist && selectedProductModal === product.id && (
                                    <ModalWishlist className={'w-3/4 absolute'} />
                                )}
                                <div
                                    onClick={() => toggleWishlist(product.id)}
                                    className='absolute right-3 z-40 cursor-pointer'>
                                    {isInWishlist(product.id)
                                        ? <AiFillHeart size={32} className='text-red-700' />
                                        : <AiOutlineHeart size={32} />
                                    }
                                </div>
                                <Link href={`/products/${product.name}`}>
                                    <div
                                        className='relative'
                                        onMouseEnter={() => setHoveredProductId(product.id)}
                                        onMouseLeave={() => setHoveredProductId(null)}
                                    >
                                        <img
                                            src={hoveredProductId === product.id ? product.boxImage : product.image}
                                            alt={product.name}
                                            className='transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-2.5 p-2 pt-5'
                                        />
                                    </div>
                                </Link>
                                <p className="uppercase">{product.category}</p>
                                <Link href={`/products/${product.name}`}>
                                    <h3 className="font-extrabold uppercase hover:underline">{product.name}</h3>
                                </Link>
                                <p className="font-semibold">${product.price}</p>
                                {!isInCart(product.id) ? (
                                    <AddToCartButton
                                        product={product}
                                        textButton={"add to cart"}
                                        className={`${isLoading && selectedProductModal === product.id ? 'bg-neutral-600 border-neutral-600' : 'bg-gray-100 border-gray-100'} border-2 uppercase rounded-full px-3 py-2 mt-3 w-full  font-bold hover:border-black`}
                                    />
                                ) : (
                                    <ButtonAdded
                                        buttonText={'in cart'}
                                        disabled={true}
                                        product={product}
                                        arrowPosition={'left-4'}
                                        invert={'invert'}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <BannerSocialMedia />
            <Footer />
        </>
    )
}
export async function getStaticProps() {
    const products = await getProducts();
    return {
        props: {
            initialProducts: products,
        },
    };
}

export default Products