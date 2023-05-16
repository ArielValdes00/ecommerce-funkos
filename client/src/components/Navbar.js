import React from 'react';
import User from '../../public/icons/user.png';
import Cart from '../../public/icons/shopping-cart.png';
import Image from 'next/image';
import Link from 'next/link';

const navbar = () => {
    return (
        <header>
            <nav className='grid grid-cols-4 items-center p-5 bg-black text-white font-semibold text-md px-28'>
                <div className=''>
                    <span className='text-3xl font-extrabold'>FUNKO</span>
                </div>
                <div className='col-span-2'>
                    <ul className='flex justify-around font-extrabold text-lg'>
                        <li><Link href={"/"}>HOME</Link></li>
                        <li><Link href={"/products"}>PRODUCTS</Link></li>
                        <li>CATEGORIES</li>
                        <li>CONTACT</li>
                    </ul>
                </div>
                <div className='flex justify-end items-center gap-8'>
                    <span className='bg-white p-2 rounded-full cursor-pointer'>
                        <Image src={User} height={20} width={20}></Image>
                    </span>
                    <span className='relative cursor-pointer'>
                        <Image src={Cart} height={38} width={38} className=''></Image>
                        <span className='bg-red-600 rounded-full h-5 text-lg p-3 flex justify-center items-center w-5 absolute top-0 left-6'>0</span>
                    </span>
                </div>
            </nav>
        </header>
    )
}

export default navbar