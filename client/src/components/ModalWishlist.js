import React from 'react'
import Confirm from '../../public/icons/confirm.png'
import Image from 'next/image'

const ModalWishlist = ({className}) => {
    return (
        <div className={`${className} top-1/3 left-1/2 transform w-[85%] -translate-x-1/2 -translate-y-1/2 z-50 border rounded-xl shadow-lg bg-gray-100 animate__animated animate__fadeIn`}>
            <div className='py-3 text-xs gap-2 lg:gap-3 w-full font-semibold lg:font-extrabold flex items-center justify-center'>
                <Image src={Confirm} width={25} height={25} alt='Confirm'/>
                <p className='uppercase line-clamp-2 text-start'>item added to<br/>wishlist</p>
            </div>
        </div>
    )
}

export default ModalWishlist