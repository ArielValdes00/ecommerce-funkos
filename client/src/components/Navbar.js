import React from 'react';
import { useState, useContext, useEffect } from 'react';
import User from '../../public/icons/user.png';
import Logout from '../../public/icons/logout.png';
import BlackHeart from '../../public/icons/blackHeart.png';
import RedHeart from '../../public/icons/redHeart.png';
import MenuHamburguer from '../../public/icons/menuHamburger.png';
import Cart from '../../public/icons/shopping-cart.png';
import Image from 'next/image';
import Link from 'next/link';
import { getSession, signOut } from 'next-auth/react';
import { ProductContext } from '@/context/ProductContext';

const navbar = ({ session }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuHamburguerOpen, setIsMenuHamburguerOpen] = useState(false);
    const imagen = isMenuHamburguerOpen ? RedHeart : BlackHeart;
    const { cartState } = useContext(ProductContext);
    const cart = cartState.cart;
    let counterProduct = cart.length;

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuHamburguer = () => {
        setIsMenuHamburguerOpen(!isMenuHamburguerOpen);
    };
    const closeMenuOnResize = () => {
        if (window.innerWidth > 1024) {
            setIsMenuHamburguerOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', closeMenuOnResize);

        return () => {
            window.removeEventListener('resize', closeMenuOnResize);
        };
    }, []);

    useEffect(() => {
        if (isMenuHamburguerOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [isMenuHamburguerOpen]);


    return (
        <header>
            <nav className='md:px-28 py-4 bg-black relative z-50'>
                <ul className='text-white flex px-3 items-center'>
                    <li className='lg:hidden flex-grow '>
                        <Image src={MenuHamburguer} height={40} width={40} alt='Menu' onClick={handleMenuHamburguer} className='cursor-pointer ' />
                    </li>
                    <li className='flex-grow lg:grow-0'>
                        <span className='text-4xl font-extrabold'>FUNKO</span>
                    </li>
                    <div className={`${isMenuHamburguerOpen ? "block absolute text-black bg-gray-100 left-0 top-[76px] h-screen w-full py-20 z-50" : "hidden"} lg:flex lg:justify-evenly xl:justify-between lg:w-full items-center font-extrabold text-2xl lg:text-lg`}>
                        <div className='flex flex-col gap-14 lg:gap-0 items-center lg:flex-row lg:w-full lg:justify-evenly px-3 py-2 lg:p-0'>
                            <Link href={"/"}>HOME</Link>
                            <Link href={"/products"}>PRODUCTS</Link>
                            <Link href={"/contact"}>CONTACT</Link>
                        </div>
                        <li className='lg:flex w-80 justify-center lg:justify-end mx-auto py-7 mt-5 lg:p-0 lg:m-0'>
                            {session ? (
                                <div className='relative'>
                                    <div className='flex items-center justify-center gap-1'>
                                        <h3 className='lg:text-xl font-extrabold uppercase cursor-pointer me-3' onClick={handleMenuToggle}>
                                            {session.user.name}
                                        </h3>
                                    </div>
                                    {isMenuOpen && (
                                        <ul className={'absolute right-0 pe-3 mt-2 bg-white text-lg text-black rounded-md shadow-md uppercase font-extrabold'}>
                                            <Link href={"/profile"} className='flex items-center justify-between gap-3 px-5 py-2'>
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
                                <Link href={"/login"} className='lg:bg-white lg:p-2 lg:me-4 px-3 rounded-full flex items-center gap-3 cursor-pointer justify-center ml-auto'>
                                    <Image src={User} alt='User' className='user'></Image>
                                    <p className='lg:hidden'>PROFILE</p>
                                </Link>
                            )}
                        </li>
                        <Link href={"/wishlist"} className='flex gap-3 mx-3 items-center lg:me-6 justify-center py-8 lg:p-0'>
                            <Image src={imagen} alt='Wishlist' className='heart'></Image>
                            <p className='lg:hidden'>WISHLIST</p>
                        </Link>
                    </div>
                    <li className='flex justify-end items-center'>
                        <Link href={"/cart"} className='relative cursor-pointer block'>
                            <Image src={Cart} height={44} width={44} alt='Cart' className='block'></Image>
                            {counterProduct < 1 ? (
                                ""
                            ) : (
                                <span className='bg-red-600 rounded-full h-5 text-lg p-3 flex justify-center items-center w-5 absolute top-0 left-6'>{counterProduct}</span>
                            )
                            }
                        </Link>
                    </li>
                </ul>
            </nav>
        </header >
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