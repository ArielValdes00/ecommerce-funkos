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

const productName = ({ product }) => {
    const { data: session } = useSession();
    const { addItemToCart, selectedProductIds, toggleSelectedProductId } = useContext(ProductContext)

    return (
        <div>
            <Navbar session={session} />
            <section className='px-28 py-5 mb-5'>
                <div className='text-xs text-gray-500 mb-5'>
                    <Link href={"/"}>Funko</Link> / <Link href={"/products"}>Products</Link> / <span className='capitalize'>{product.category}</span>
                </div>
                <div className='grid grid-cols-2 mt-8 gap-16'>
                    <div className='border me-auto bg-gray-200 relative'>
                        <Image
                            onClick={() => toggleSelectedProductId(product.id)}
                            src={selectedProductIds.includes(product.id) ? RedHeart : Heart}
                            height={35} width={35} alt='Wishlist' className='right-6 top-6 absolute cursor-pointer'>
                        </Image>
                        <img src={product.image} alt={product.name} height={520} width={520}></img>
                    </div>
                    <div className='flex flex-col gap-4 '>
                        <p className='uppercase text-lg font-semibold'>{product.category}</p>
                        <h1 className='uppercase text-6xl font-extrabold'>{product.name}</h1>
                        <p className='font-semibold text-2xl'>${product.price}</p>
                        <button onClick={() => addItemToCart(product.id)} className='uppercase w-3/4 bg-black text-white text-xl font-bold rounded-full p-3'>add to cart</button>
                        <p className='font-semibold w-3/4'>{product.description}</p>
                        <p className='text-xl font-semibold uppercase'>Stock: {product.stock}</p>
                    </div>
                </div>
            </section>
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
