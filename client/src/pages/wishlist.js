import React, { useContext, useState } from 'react';
import { ProductContext } from '@/context/ProductContext';
import Navbar from '@/components/Navbar';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import RedHeart from "../../public/icons/redHeart.png"
import AccountHeader from "../../public/icons/account-header.png"
import Image from 'next/image';
import ModalPurchase from '@/components/ModalPurchase';
import Login from '@/components/Login';
import Register from '@/components/Register';
import ButtonAdded from '@/components/ButtonProductAdded';

const Wishlist = () => {
    const { data: session } = useSession();
    const { wishlist, toggleWishlist, isInWishlist,
        setShowModal, showModal, selectedProductModal,
        setSelectedProductModal, isInCart, closeModal,
        setRemoveModalClicked, removeModalClicked
    } = useContext(ProductContext);
    
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleOpenModal = (id) => {
        console.log(removeModalClicked)
        const findProduct = wishlist.find(product => product.id === id);
        setSelectedProductModal(findProduct);
        setRemoveModalClicked(true);
        setShowModal(true);
    }

    return (
        <div>
            <Navbar session={session} />
            {showModal && (
                <ModalPurchase
                    title={
                        removeModalClicked
                            ? 'Are you sure you want to remove the following product from your wishlist?'
                            : 'item(s) added to cart'
                    }
                    firstButton={
                        removeModalClicked
                            ? 'yes'
                            : 'view cart'
                    }
                    secondButton={
                        removeModalClicked
                            ? 'cancel'
                            : 'continue shopping'
                    }
                    handleConfirmation={
                        removeModalClicked
                            ? () => toggleWishlist(selectedProductModal.id)
                            : closeModal
                    }
                    category={selectedProductModal.category}
                    image={selectedProductModal.image}
                    name={selectedProductModal.name}
                    price={selectedProductModal.price}
                    redirect={
                        removeModalClicked
                            ? '/wishlist'
                            : '/cart'
                    }
                />
            )}
            <section className='py-5 md:px-28 bg-gray-100 mx-4'>
                <div className="text-xs text-gray-500 mb-7">
                    <Link href={"/"}>Funko</Link> / <span>Wishlist</span>
                </div>
                <h1 className="text-5xl font-extrabold mb-7 py-4">WISHLIST</h1>
                <div className="py-5 my-8 grid xl:grid-cols-2 gap-4">
                    <div>
                        {wishlist.length === 0 ? (
                            <div className='bg-white text-center'>
                                <p className='uppercase font-semibold py-14'>No hay items en la wishlist.</p>
                            </div>
                        ) : (
                            wishlist.map((product) => (
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
                                        <h3 className='font-extrabold uppercase text-center text-xl lg:text-2xl'>{product.name}</h3>
                                        <p className='font-semibold lg:text-xl'>${product.price}</p>
                                        <div className='pe-3 mt-4 md:hidden'>
                                            <AddToCartButton
                                                product={product}
                                                textButton={"move to cart"}
                                                className={'uppercase bg-black text-white rounded-full py-2 px-4  font-semibold '}
                                            />
                                        </div>
                                    </div>
                                    <div className='pe-3 mt-4 hidden md:block'>
                                        {!isInCart(product.id) ? (
                                            <AddToCartButton
                                                product={product}
                                                textButton={"move to cart"}
                                                className={'lg:py-3 uppercase bg-black text-white rounded-full py-2 font-semibold w-full xl:w-full lg:w-2/3 hover:bg-white hover:text-black border-2 border-black transition duration-300'}
                                            />
                                        ) : (
                                            <ButtonAdded
                                                buttonText={'in cart'}
                                                disabled={true}
                                                product={product}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='relative z-40'>
                        <div className='hidden xl:grid'>
                            <Image src={AccountHeader} height={160} width={160} alt='Welcome!'
                                className='absolute top-[-34px] left-1/2 transform -translate-x-1/6 -translate-y-1/2 z-[-1] hover:-translate-y-[123px] transition duration-700' />
                        </div>
                        {isLogin ? (
                            <Login onClick={toggleForm} />
                        ) : (
                            <Register onClick={toggleForm} />
                        )}
                    </div>
                </div>
            </section>
            <BannerSocialMedia />
            <Footer />
        </div>
    );
};

export default Wishlist;
