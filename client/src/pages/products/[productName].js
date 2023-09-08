import React, { useState, useEffect } from 'react';
import { getProduct, getProducts } from '../../../utils/apiProducts';
import Navbar from '@/components/Navbar';
import BannerSocialMedia from '@/components/BannerSocialMedia';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Heart from '../../../public/icons/heart.png';
import RedHeart from '../../../public/icons/redHeart.png';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { ProductContext } from '@/context/ProductContext';
import ModalPurchase from '@/components/miscellaneous/ModalPurchase';
import ButtonAdded from '@/components/ButtonProductAdded';
import ModalWishlist from '@/components/miscellaneous/ModalWishlist';
import SliderCards from '@/components/SliderCard';
import 'animate.css';

const productName = ({ product }) => {
    const { data: session } = useSession();
    const { mostSoldProducts, toggleWishlist, isInWishlist, showModal, isInCart, selectedProductModal, showModalWishlist, isLoading, closeModal } = useContext(ProductContext)
    const [changeImage, setChangeImage] = useState(false);
    const [animate, setAnimate] = useState(null);

    const changeImageAnimateOn = () => {
        setChangeImage(true);
        setAnimate('right');
    };

    const changeImageAnimateOff = () => {
        setChangeImage(false);
        setAnimate('left');
    };

    return (
        <div>
            <Navbar session={session} />
            {showModal && selectedProductModal === product.id && (
                <ModalPurchase
                    title={'item(s) added to cart'}
                    quantity={'quantity: 1'}
                    firstButton={'view cart'}
                    secondButton={'continue shopping'}
                    category={selectedProductModal.category}
                    name={selectedProductModal.name}
                    image={selectedProductModal.image}
                    price={selectedProductModal.price}
                    handleConfirmation={closeModal}
                    redirect={'/cart'}
                />
            )}
            {showModalWishlist && selectedProductModal === product.id && (
                <ModalWishlist className={'fixed py-1 md:w-[25%] lg:w-[20%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'} />
            )}
            <section className='md:px-28 px-4 py-5'>
                {isLoading && selectedProductModal === product.id && (
                    <div className="fixed inset-0 transition-opacity z-40">
                        <div className="absolute inset-0 bg-neutral-800 opacity-75"></div>
                    </div>
                )}
                <div className='text-xs text-gray-600'>
                    <Link href={"/"}>Funko</Link> / <Link href={"/products"}>Products</Link> / <span className='capitalize'>{product.category}</span>
                </div>
                <div className='grid lg:grid-cols-2 mt-5 lg:gap-5'>
                    <div className='border bg-gray-200 relative '>
                        <Image
                            onClick={() => toggleWishlist(product.id)}
                            src={isInWishlist(product.id) ? RedHeart : Heart}
                            height={35} width={35} alt='Wishlist' className='right-6 top-6 absolute cursor-pointer z-40'>
                        </Image>
                        <div className='flex'>
                            <div className='mt-10 ms-3'>
                                <img src={product.image} width={70} height={70} alt={product.name} onClick={() => changeImageAnimateOff()} className={`${!changeImage && 'bg-white'} cursor-pointer border border-white mb-3 rounded-md`} />
                                <img src={product.boxImage} width={70} height={70} alt={product.name} onClick={() => changeImageAnimateOn()} className={`${changeImage && 'bg-white'} cursor-pointer border border-white rounded-md z-50`} />
                            </div>
                            <div className='overflow-hidden lg:mt-10 xl:mt-0 mx-auto'>
                                <img src={changeImage ? product.boxImage : product.image} alt={product.name} height={500} width={500} className={`${animate === 'right' ? 'animate__fadeInRight' : animate === 'left' ? 'animate__fadeInLeft' : ''} animate__animated`} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 xl:gap-2 mt-4 lg:mt-0'>
                        <p className='uppercase text-lg font-semibold'>{product.category}</p>
                        <h1 className='uppercase text-3xl lg:text-6xl font-extrabold'>pop! {product.name}</h1>
                        <p className='font-semibold text-2xl mt-1'>${product.price}</p>
                        <div className='md:w-2/3'>
                            <ButtonAdded
                                buttonText={isInCart(product.id) ? ('in cart') : ('add to cart')}
                                product={product}
                                className={'text-2xl'}
                                disabled={isInCart(product.id)}
                            />
                        </div>
                        <p className='font-semibold mt-2 max-w-md lg:text-sm break-words'>{product.description}</p>
                    </div>
                </div>
            </section>
            <div className="py-5 text-center bg-white">
                <SliderCards title="you might also like" products={mostSoldProducts} />
            </div>
            <BannerSocialMedia />
            <Footer />
        </div>
    )
}

export async function getStaticPaths() {
    const products = await getProducts();
    const paths = products.map((product) => ({
        params: { productName: product.name },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { productName } }) {
    const product = await getProduct(productName);
    return {
        props: {
            product
        }
    };
}


export default productName
