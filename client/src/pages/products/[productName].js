import React from 'react'
import { getProduct, getProducts } from '../../../utils/apiProducts'
import Navbar from '@/components/Navbar'
import BannerSocialMedia from '@/components/BannerSocialMedia'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Heart from '../../../public/icons/heart.png'
import RedHeart from '../../../public/icons/redHeart.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { useContext } from 'react'
import { ProductContext } from '@/context/ProductContext'
import ModalPurchase from '@/components/ModalPurchase'
import ButtonAdded from '@/components/ButtonProductAdded'
import ModalWishlist from '@/components/miscellaneous/ModalWishlist'
import SliderCards from '@/components/SliderCard'

const productName = ({ product }) => {
    const { data: session } = useSession();
    const { mostSoldProducts, toggleWishlist, isInWishlist, showModal, isInCart, selectedProductModal, showModalWishlist, isLoading, closeModal } = useContext(ProductContext)

    return (
        <div>
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
                handleConfirmation={closeModal}
                redirect={'/cart'}
            />
            )}
            <section className='px-4 md:px-28 py-5 '>
                {isLoading && selectedProductModal === product.id && (
                    <div className="fixed inset-0 transition-opacity z-40">
                        <div className="absolute inset-0 bg-neutral-800 opacity-75"></div>
                    </div>
                )}

                <div className='text-xs text-gray-600'>
                    <Link href={"/"}>Funko</Link> / <Link href={"/products"}>Products</Link> / <span className='capitalize'>{product.category}</span>
                </div>
                <div className='grid lg:grid-cols-2 mt-5 lg:gap-5'>
                    <div className='border bg-gray-200 relative'>

                        {showModalWishlist && selectedProductModal === product.id && (
                            <ModalWishlist className={'fixed w-1/5'} />
                        )}
                        <Image
                            onClick={() => toggleWishlist(product.id)}
                            src={isInWishlist(product.id) ? RedHeart : Heart}
                            height={35} width={35} alt='Wishlist' className='right-6 top-6 absolute cursor-pointer'>
                        </Image>
                        <img src={product.image} alt={product.name} height={520} width={520} className='mx-auto'></img>
                    </div>
                    <div className='flex flex-col gap-2 mt-4 lg:mt-0'>
                        <p className='uppercase text-lg font-semibold'>{product.category}</p>
                        <h1 className='uppercase text-3xl lg:text-6xl font-extrabold'>pop! {product.name}</h1>
                        <p className='font-semibold text-2xl'>${product.price}</p>
                        <div className='md:w-2/3'>
                            <ButtonAdded
                                buttonText={isInCart(product.id) ? ('in cart') : ('add to cart')}
                                product={product}
                                className={'text-2xl'}
                                disabled={isInCart(product.id)}
                            />
                        </div>
                        <p className='font-semibold mt-4 break-words'>{product.description}</p>
                    </div>
                </div>
            </section>
            <div className="py-5 text-center bg-white">
                <SliderCards title="you might also like" products={mostSoldProducts}/>
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
