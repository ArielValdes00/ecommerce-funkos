import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useContext, useRef, useState } from 'react';
import { ProductContext } from "../context/ProductContext.js"
import Link from 'next/link.js';
import AddToCartButton from './AddToCartButton.js';
import ButtonAdded from './ButtonProductAdded.js';
import ModalWishlist from './miscellaneous/ModalWishlist.js';
import Loader from './Loader.js';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const SliderCards = ({ title, products }) => {
    const { toggleWishlist, isInWishlist, isInCart, showModalWishlist, selectedProductModal, isLoading } = useContext(ProductContext);
    const swiperRef = useRef(null);
    const [hoveredProductId, setHoveredProductId] = useState(null);

    const onSwiperInit = (swiper) => {
        swiperRef.current = swiper;
    };

    const goToNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    };

    const goToPrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    };

    return (
        <div className='py-10'>
            <h2 className='text-5xl text-center font-extrabold py-8 uppercase'>{title}</h2>
            <div className='px-12 md:px-28 relative'>
                <div className={`swiper-button-next swiper-button-next-${title} hidden`} onClick={goToNextSlide}></div>
                <div className={`swiper-button-prev swiper-button-prev-${title} hidden`} onClick={goToPrevSlide}></div>
                <Swiper
                    style={{
                        "--swiper-pagination-color": "#000000",
                    }}
                    onSwiper={onSwiperInit}
                    modules={[Navigation, Scrollbar, A11y, Pagination]}
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
                        nextEl: `.swiper-button-next hidden`,
                        prevEl: `.swiper-button-prev hidden`
                    }}
                    loop={true}
                    pagination={{ clickable: false }}
                    scrollbar={{ draggable: true }}
                >
                    {products?.map((product) => (
                        <SwiperSlide key={product.id} className={`${isLoading && selectedProductModal === product.id ? 'bg-neutral-600' : 'bg-white'} rounded-lg shadow-lg border border-gray-100 text-center mx-auto p-5 my-10 relative`}>
                            {isLoading && selectedProductModal === product.id && (
                                <Loader />
                            )}
                            {showModalWishlist && selectedProductModal === product.id && (
                                <ModalWishlist className={'w-3/4 absolute'} />
                            )}
                            <div
                                onClick={() => toggleWishlist(product.id)}
                                className='absolute right-6 z-50 cursor-pointer'>
                                {isInWishlist(product.id)
                                    ? <AiFillHeart size={34} className='text-red-700'/>
                                    : <AiOutlineHeart size={34}/>
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
                            <p className='uppercase'>{product.category}</p>
                            <Link href={`/products/${product.name}`}><h2 className='text-xl font-extrabold my-2 uppercase hover:underline'>{product.name}</h2></Link>
                            <p className='font-bold'>${product.price}</p>
                            {!isInCart(product.id) ? (
                                <AddToCartButton
                                    product={product}
                                    textButton={"add to cart"}
                                    className={`${isLoading && selectedProductModal === product.id ? 'bg-neutral-600 border-neutral-600' : 'bg-gray-100 border-gray-100'} border-2 uppercase rounded-full px-3 py-2 mt-3 w-full font-bold hover:border-black`}
                                />
                            ) : (
                                <ButtonAdded
                                    buttonText={'in cart'}
                                    disabled={true}
                                    product={product}
                                    arrowPosition={'left-5'}
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SliderCards;
