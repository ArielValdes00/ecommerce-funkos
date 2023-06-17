import React, { useContext } from 'react';
import { ProductContext } from '@/context/ProductContext';
import Navbar from '@/components/Navbar';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import RedHeart from "../../public/icons/redHeart.png"
import Image from 'next/image';
import ModalPurchase from '@/components/ModalPurchase';

const Wishlist = () => {
    const { data: session } = useSession();
    const { wishlist, toggleWishlist, isInWishlist, setShowModal, showModal, selectedProductModal, setSelectedProductModal } = useContext(ProductContext);

    const handleOpenModal = (id) => {
        const findProduct = wishlist.find(product => product.id === id)
        setSelectedProductModal(findProduct)
        setShowModal(true)
    }

    return (
        <div>
            <Navbar session={session} />
            {showModal && (
                <ModalPurchase
                    title={'are you sure you want to remove the following product from your wishlist?'}
                    firstButton={'yes'}
                    secondButton={'cancel'}
                    handleConfirmation={() => toggleWishlist(selectedProductModal.id)}
                    category={selectedProductModal.category}
                    image={selectedProductModal.image}
                    name={selectedProductModal.name}
                    price={selectedProductModal.price}
                    redirect={'/wishlist'}
                />
            )}
            <section className='py-5 md:28 bg-gray-100'>
                <div className='px-4 md:px-28 mb-4'>
                    <div className="text-xs text-gray-500 mb-5">
                        <Link href={"/"}>Funko</Link> / <span>Wishlist</span>
                    </div>
                    <h1 className='uppercase font-extrabold text-5xl'>wishlist</h1>
                </div>
                <div className=" p-4 mb-8 md:px-28">
                    {wishlist.map((product) => (
                        <div key={product.id} className='bg-white grid grid-cols-2 md:grid-cols-3 items-center py-5 gap-8 border-b'>
                            <div className='relative'>
                                <Image
                                    onClick={() => handleOpenModal(product.id)}
                                    src={isInWishlist(product.id) ? RedHeart : Heart}
                                    width={25} height={25} alt='RemoveProduct' className='absolute right-0 cursor-pointer'></Image>
                                <img src={product.image} width={150} height={150} alt={product.name} className='ms-2 sm:mx-auto' />
                            </div>
                            <div className='flex flex-col gap-1 items-center'>
                                <p className='uppercase font-semibold lg:text-xl'>{product.category}</p>
                                <h3 className='font-extrabold uppercase text-xl lg:text-2xl'>{product.name}</h3>
                                <p className='font-semibold lg:text-xl'>${product.price}</p>
                                <div className='pe-3 mt-4 md:hidden'>
                                    <AddToCartButton
                                        product={product}
                                        showProductModal={false}
                                        textButton={"move to cart"}
                                        className={'uppercase bg-black text-white rounded-full py-2 px-4 font-bold w-full'}
                                    />
                                </div>
                            </div>
                            <div className='pe-3 mt-4 hidden md:block'>
                                <AddToCartButton
                                    product={product}
                                    showProductModal={false}
                                    textButton={"move to cart"}
                                    className={'lg:py-4 uppercase bg-black text-white rounded-full py-2 font-bold w-full hover:bg-white hover:text-black border-2 border-black transition duration-300'}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <BannerSocialMedia />
            <Footer />
        </div>
    );
};

export default Wishlist;
