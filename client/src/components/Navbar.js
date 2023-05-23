import React from 'react';
import { useState, useContext } from 'react';
import User from '../../public/icons/user.png';
import Logout from '../../public/icons/logout.png';
import BlackHeart from '../../public/icons/blackHeart.png';
import MenuHamburguer from '../../public/icons/menuHamburger.png';
import Cart from '../../public/icons/shopping-cart.png';
import Image from 'next/image';
import Link from 'next/link';
import { getSession, signOut } from 'next-auth/react';
import { ProductContext } from '@/context/ProductContext';

const navbar = ({ session }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartState } = useContext(ProductContext);
    const cart = cartState.cart;
    let counterProduct = cart.length;

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav className='grid grid-cols-3 lg:grid-cols-7 xl:grid-cols-3 items-center p-5 bg-black text-white font-semibold text-md md:px-28'>
                <div className='lg:hidden'>
                    <Image src={MenuHamburguer} height={30} width={30} alt='Menu'></Image>
                </div>
                <div className='text-center lg:text-start'>
                    <span className='text-3xl font-extrabold'>FUNKO</span>
                </div>
                <div className='hidden lg:block lg:col-span-3'>
                    <ul className='flex gap-8 xl:justify-center lg:justify-end md:justify-start font-extrabold text-lg items-center'>
                        <li><Link href={"/"}>HOME</Link></li>
                        <li><Link href={"/products"}>PRODUCTS</Link></li>
                        <li>CONTACT</li>
                    </ul>
                </div>
                <div className='lg:col-start-5 lg:col-span-3 flex justify-end items-center gap-8 lg:gap-6'>
                    <div className='hidden lg:block'>
                        {session ? (
                            <div className=''>
                                <div className='flex items-center gap-2'>
                                    <img src={session.user.image} height={26} width={26} alt='User' className='rounded-full'></img>
                                    <h3 className='text-xl font-extrabold uppercase cursor-pointer' onClick={handleMenuToggle}>
                                        {session.user.name}
                                    </h3>
                                </div>
                                {isMenuOpen && (
                                    <ul className={'absolute right-0 mt-2 bg-white text-lg text-black rounded-md shadow-md uppercase font-extrabold'}>
                                        <Link href='#' className='flex items-center justify-between gap-3 px-5 py-2'>
                                            <Image src={User} height={17} width={17} alt='User'></Image>
                                            <span>Profile</span>
                                        </Link>
                                        <div className='px-5 py-2 flex items-center justify-between gap-3 cursor-pointer' onClick={signOut}>
                                            <Image src={Logout} height={17} width={17} alt="Logout"></Image>
                                            <span className='uppercase'>Logout</span>
                                        </div>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link href={"/register"} className='bg-white block p-2 rounded-full cursor-pointer'>
                                <Image src={User} height={20} width={20} alt='User'></Image>
                            </Link>
                        )}
                    </div>
                    <Image src={BlackHeart} height={37} width={37} alt='Wishlist' className='hidden md:block'></Image>
                    <Link href={"/cart"} className='relative cursor-pointer '>
                        <Image src={Cart} height={38} width={38} alt='Cart'></Image>
                        {counterProduct < 1 ? (
                            ""
                        ) : (
                            <span className='bg-red-600 rounded-full h-5 text-lg p-3 flex justify-center items-center w-5 absolute top-0 left-6'>{counterProduct}</span>
                        )
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    return {
        props: {
            session,
        },
    };
};
export default navbar