import React, { useContext, useState } from 'react'
import { ProductContext } from '@/context/ProductContext'
import CloseModal from '../../public/icons/closemodal.png'
import Image from 'next/image'
import Link from 'next/link'

const ModalPurchase = () => {
    const { selectedProductModal, setShowModal } = useContext(ProductContext)

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center ">
            <div className="absolute bg-white md:w-2/3 lg:w-1/2 p-4 rounded-xl shadow-lg z-10">
                <div className='flex justify-between'>
                    <p className='font-bold text-xl'>ITEM(S) ADDED TO CART</p>
                    <Image onClick={handleCloseModal} src={CloseModal} height={28} width={28} alt='Close' className='cursor-pointer' />
                </div>
                <div className='grid md:grid-cols-2 py-4 items-center'>
                    <img src={selectedProductModal.image} width={230} height={230} className='mx-auto'></img>
                    <div className='uppercase font-semibold'>
                        <h2 className='font-extrabold text-xl'>{selectedProductModal.name}</h2>
                        <p>${selectedProductModal.price}</p>
                        <p>Quantity: 1</p>
                        <div className='flex flex-col lg:w-3/4 gap-2 mt-3 text-sm font-bold text-center mx-auto lg:mx-0'>
                            <Link href={"/cart"} onClick={handleCloseModal} className='rounded-full px-6 py-2 bg-black text-white hover:bg-white hover:text-black border-2 border-black transition duration-300'>VIEW CART</Link>
                            <button onClick={handleCloseModal} className='rounded-full px-6 py-2 bg-gray-100 hover:border-black border-2 border-gray-100 text-black'>CONTINUE SHOPPING</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={handleCloseModal}>
                <div className="absolute inset-0 bg-neutral-800 opacity-75"></div>
            </div>
        </div>
    )
}

export default ModalPurchase