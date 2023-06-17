import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import { useContext, useState, useEffect } from 'react';
import { ProductContext } from "../context/ProductContext.js"
import Link from 'next/link.js';
import Heart from '../../public/icons/heart.png'
import RedHeart from '../../public/icons/redHeart.png'
import Image from 'next/image.js';
import AddToCartButton from './AddToCartButton.js';
import ButtonAdded from './ButtonProductAdded.js';

const SliderCards = ({ title }) => {
  
    const { recentProducts, toggleWishlist, isInWishlist, isInCart } = useContext(ProductContext);

    return (
        <div className='px-12 md:px-28 relative py-10'>
            <h2 className='text-5xl font-extrabold py-8 uppercase'>{title}</h2>
            <div className="swiper-button-next hidden"></div>
            <div className="swiper-button-prev hidden"></div>
            <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={50}
                breakpoints={{
                    992: {
                        slidesPerView: 3
                    },
                    580: {
                        slidesPerView: 2
                    },
                    0: {
                        slidesPerView: 1
                    }
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }}
                loop={true}
                scrollbar={{ draggable: true }}
            >

                {recentProducts.map((product) => (
                    <SwiperSlide key={product.id} className='rounded-lg shadow-lg border border-gray-100 text-center mx-auto p-5 my-5 bg-white relative'>
                        <Image
                            onClick={() => toggleWishlist(product.id)}
                            src={isInWishlist(product.id) ? RedHeart : Heart}
                            height={35} width={35} alt='Wishlist' className='absolute right-6 z-50 cursor-pointer'>
                        </Image>
                        <Link href={`/products/${product.name}`}><img src={product.image} height={270} width={270} alt={product.name} className='mx-auto hover:scale-115 transition-transform duration-300 p-3'></img></Link>
                        <p className='uppercase'>{product.category}</p>
                        <Link href={`/products/${product.name}`}><h2 className='text-xl font-extrabold my-2 uppercase hover:underline'>{product.name}</h2></Link>
                        <p className='font-bold'>${product.price}</p>
                        {!isInCart(product.id) ? (
                            <AddToCartButton
                                product={product}
                                textButton={"add to cart"}
                                className={'border-2 uppercase border-gray-100 rounded-full px-3 py-2 mt-3 w-full bg-gray-100 font-bold hover:border-black'}
                            />
                        ) : (
                            <ButtonAdded
                                buttonText={'in cart'}
                                disabled={true}
                                product={product}
                            />
                        )}

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )

}
export default SliderCards