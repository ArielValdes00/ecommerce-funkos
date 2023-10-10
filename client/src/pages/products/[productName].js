import React, { useState } from 'react';
import { getProduct, getProducts } from '../../../utils/apiProducts';
import Link from 'next/link';
import { useContext } from 'react';
import { ProductContext } from '@/context/ProductContext';
import ModalPurchase from '@/components/miscellaneous/ModalPurchase';
import ButtonAdded from '@/components/ButtonProductAdded';
import ModalWishlist from '@/components/miscellaneous/ModalWishlist';
import SliderCards from '@/components/SliderCard';
import 'animate.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { getMostSoldProducts } from '../../../utils/apiPurchase';

const productName = ({ product, mostSoldProducts }) => {
    const { toggleWishlist, isInWishlist, showModal,
        isInCart, selectedProductModal, showModalWishlist, isLoading, toggleShowModal } = useContext(ProductContext)
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
            {showModalWishlist && selectedProductModal === product.id && (
                <ModalWishlist
                    className={'fixed py-1 md:w-[25%] lg:w-[20%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}
                />
            )}
            <section className='md:px-28 px-4 py-5'>
                {isLoading && selectedProductModal === product.id && (
                    <div className="fixed inset-0 transition-opacity z-40">
                        <div className="absolute inset-0 bg-neutral-800 opacity-75"></div>
                    </div>
                )}
                <div className='text-xs text-gray-600'>
                    <Link href={"/"}>Funko</Link> /
                    <Link href={"/products"}>Products</Link> /
                    <span className='capitalize'>{product.category}</span>
                </div>
                <div className='grid lg:grid-cols-2 mt-5 lg:gap-5'>
                    <div className='border bg-gray-200 relative '>
                        <div
                            onClick={() => toggleWishlist(product.id)}
                            className='absolute right-3 top-3 z-40 cursor-pointer'>
                            {isInWishlist(product.id)
                                ? <AiFillHeart size={34} className='text-red-700' />
                                : <AiOutlineHeart size={34} />
                            }
                        </div>
                        <div className='flex'>
                            <div className='mt-10 ms-3'>
                                <img src={product.image}
                                    width={70}
                                    height={70}
                                    alt={product.name}
                                    onClick={() => changeImageAnimateOff()}
                                    className={`${!changeImage && 'bg-white'} cursor-pointer border border-white mb-3 rounded-md`}
                                />
                                <img src={product.boxImage}
                                    width={70}
                                    height={70}
                                    alt={product.name}
                                    onClick={() => changeImageAnimateOn()}
                                    className={`${changeImage && 'bg-white'} cursor-pointer border border-white rounded-md z-50`}
                                />
                            </div>
                            <div className='overflow-hidden lg:mt-12 xl:mt-0 mx-auto'>
                                <img src={changeImage ? product.boxImage : product.image}
                                    alt={product.name}
                                    height={500} width={500}
                                    className={`${animate === 'right'
                                        ? 'animate__fadeInRight'
                                        : animate === 'left' ? 'animate__fadeInLeft' : ''} animate__animated`}
                                />
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
                                arrowPosition={'left-10 lg:left-6'}
                                invert={'invert'}
                            />
                        </div>
                        <p className='font-semibold mt-2 lg:max-w-md lg:text-sm break-words'>{product.description}</p>
                    </div>
                </div>
            </section>
            <div className="py-5 px-3 text-center bg-white">
                <SliderCards title="you might also like" products={mostSoldProducts} />
            </div>
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
    const mostSoldProducts = await getMostSoldProducts();
    return {
        props: {
            product,
            mostSoldProducts
        }
    };
}


export default productName
