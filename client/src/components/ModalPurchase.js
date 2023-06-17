import React, { useContext } from 'react'
import React, { useContext } from 'react'
import { ProductContext } from '@/context/ProductContext'
import ModalClose from '../../public/icons/closemodal.png'
import Image from 'next/image'
import Link from 'next/link'

const ModalPurchase = ({ title, name, price, image, quantity, category, handleConfirmation, firstButton, secondButton, redirect }) => {
    const { closeModal } = useContext(ProductContext)

    return (
        <div className={`fixed inset-0 z-40 flex items-center justify-center w-full `}>
            <div className={`absolute bg-white w-[320px] md:w-2/3 lg:w-1/2 p-4 rounded-xl shadow-lg z-10 relative animate__animated animate__fadeInDown`}>
                <div className='lg:flex lg:me-20'>
                    <p className='font-bold text-lg uppercase text-center pt-8 lg:p-0 lg:text-start'>{title}</p>
                    <Image onClick={closeModal} src={ModalClose} height={28} width={28} alt='Close' className='cursor-pointer absolute right-3 top-3' />
                </div>
                <div className='grid md:grid-cols-2 items-center'>
                    <img src={image} width={230} height={230} className='mx-auto'></img>
                    <div className='uppercase font-semibold text-center md:text-start mt-2'>
                        <p>{category}</p>
                        <h2 className='font-extrabold text-2xl'>{name}</h2>
                        <p>${price}</p>
                        <p>{quantity}</p>
                        <div className='flex flex-col lg:w-3/4 gap-2 mt-3 text-sm font-bold text-center mx-auto lg:mx-0'>
                            <Link href={redirect} onClick={handleConfirmation} className='rounded-full px-6 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition duration-300'>{firstButton}</Link>
                            <button onClick={closeModal} className='rounded-full px-6 py-2 bg-gray-100 uppercase hover:border-black border-2 border-gray-100 text-black'>{secondButton}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closeModal}>
                <div className="absolute inset-0 bg-neutral-800 opacity-75"></div>
            </div>
        </div>
    )
}

export default ModalPurchase