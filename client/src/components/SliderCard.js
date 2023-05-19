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
import Image from 'next/image.js';

const SliderCards = ({ title }) => {
    SliderCards.propTypes = {
        title: PropTypes.string.isRequired,
    };
    const { getRecentProducts, addItemToCart } = useContext(ProductContext);
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        const fetchRecentProducts = async () => {
            const products = await getRecentProducts();
            setRecentProducts(products);
        };

        fetchRecentProducts();
    }, []);
    return (
        <div className='px-28 relative bg-gray-100 pb-7'>
            <h2 className='text-5xl font-extrabold pt-6 pb-2'>{title}</h2>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={50}
                breakpoints={{
                    992: {
                        slidesPerView: 3
                    },
                    700: {
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
                    <SwiperSlide key={product.id} className='border my-4 rounded-lg shadow-lg text-center mx-auto p-5 bg-white relative'>
                        <Image src={Heart} height={35} width={35} alt='heart' className='absolute right-6 z-50 cursor-pointer'></Image>
                        <Link href={`/products/${product.name}`}><img src={product.image} height={270} width={270} alt={product.name} className='mx-auto hover:scale-115 transition-transform duration-300 p-3'></img></Link>
                        <p className='uppercase'>{product.category}</p>
                        <Link href={`/products/${product.name}`}><h2 className='text-xl font-extrabold my-2 uppercase hover:underline'>{product.name}</h2></Link>
                        <p className='font-bold'>${product.price}</p>
                        <button onClick={() => addItemToCart(product.id)} className='border-2 border-gray-100 rounded-full px-3 py-2 mt-3 w-full bg-gray-100 font-bold hover:border-black'>ADD TO CART</button>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SliderCards