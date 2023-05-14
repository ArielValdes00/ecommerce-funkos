import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { products } from '@/data.js/data';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';


const SliderCards = () => {

    return (
        <div className='border px-28 relative'>
            <h2>New Arrival</h2>

            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={50}
                
                breakpoints={{
                    // configuración para pantallas grandes
                    992: {
                      slidesPerView: 3
                    },
                    700: {
                        slidesPerView: 2
                    },
                    // configuración para pantallas pequeñas
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

                {products.map((product) => (
                    <SwiperSlide key={product.id} className='border my-4 rounded-lg shadow-md text-center mx-auto'>
                        <Image src={product.image} height={250} width={250} alt='ayuda' className='mx-auto'></Image>
                        <h2 className='text-lg font-bold my-2'>{product.name}</h2>
                        <p className='text-gray-500'>{product.description}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SliderCards