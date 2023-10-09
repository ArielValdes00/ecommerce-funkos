import React from 'react'
import { GiConfirmed } from 'react-icons/gi';

const ModalWishlist = ({ className }) => {
    return (
        <div className={`${className} top-1/3 left-1/2 transform w-[85%] -translate-x-1/2 -translate-y-1/2 z-40 border rounded-xl shadow-lg bg-gray-100 animate__animated animate__fadeIn`}>
            <div className='py-3 text-xs gap-2 lg:gap-3 w-full font-semibold lg:font-extrabold flex items-center justify-center'>
                <GiConfirmed size={27} className='text-green-600'/>
                <p className='uppercase line-clamp-2 text-start'>item added to<br />wishlist</p>
            </div>
        </div>
    )
}

export default ModalWishlist