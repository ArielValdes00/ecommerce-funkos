import React from 'react';
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { ProductContext } from '@/context/ProductContext';
import { useRouter } from 'next/router';
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBag } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';

const navbar = () => {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuHamburguerOpen, setIsMenuHamburguerOpen] = useState(false);
    const { cartState } = useContext(ProductContext);
    const router = useRouter();
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

    const hideMenuProfile = () => {
        router.push("/profile");
    }

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

    const handleOutsideClick = (e) => {
        if (e.target.closest(".profile-container") === null) {
            setIsMenuOpen(false)
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <header>
            <nav className='md:px-28 py-4 bg-black relative z-50'>
                <ul className='text-white flex px-3 items-center'>
                    <li className='flex-grow lg:hidden'>
                        <div className='menu-icon flex flex-col justify-around cursor-pointer' onClick={handleMenuHamburguer}>
                            <span className={`menu-line line-1 ${isMenuHamburguerOpen ? 'line-1-cross' : ''}`}></span>
                            <span className={`menu-line line-2 ${isMenuHamburguerOpen ? 'line-2-hidden' : ''}`}></span>
                            <span className={`menu-line line-3 ${isMenuHamburguerOpen ? 'line-3-cross' : ''}`}></span>
                        </div>
                    </li>
                    <li className='flex-grow lg:grow-0'>
                        <span className='text-4xl font-extrabold'>FUNKO</span>
                    </li>
                    <div className={`${isMenuHamburguerOpen
                        ? "menu-open flex absolute text-black bg-gray-100 left-0 top-[76px] pb-20 h-screen w-full z-50"
                        : "hidden"
                        } lg:flex flex-col lg:flex-row justify-center lg:justify-evenly xl:justify-between lg:w-full items-center font-extrabold text-2xl lg:text-lg`}>
                        <div className='flex flex-col gap-14 lg:gap-0 items-center lg:flex-row lg:w-full lg:justify-evenly px-3 py-2 lg:p-0'>
                            <Link href={"/"}>HOME</Link>
                            <Link href={"/products"}>PRODUCTS</Link>
                            <Link href={"/contact"}>CONTACT</Link>
                        </div>
                        <li className='lg:flex w-80 justify-center lg:justify-end mx-auto py-7 mt-5 lg:p-0 lg:m-0'>
                            {session ? (
                                <div className='relative profile-container'>
                                    <div className='flex items-center justify-center gap-1'>
                                        <h3 className='lg:text-xl font-extrabold uppercase cursor-pointer lg:me-3' onClick={isMenuHamburguerOpen ? hideMenuProfile : handleMenuToggle}>
                                            {session.user.name}
                                        </h3>
                                    </div>
                                    {isMenuOpen && (
                                        <div className={'hidden lg:block absolute right-[-20px] w-28 mt-2 border text-[18px] font-semibold border-gray-100 bg-white font-normal text-black rounded-md shadow-md capitalize z-40'}>
                                            <Link 
                                            href={"/profile"} 
                                            className='px-3 py-1 border-b text-center grid grid-cols-3 items-center justify-center hover:bg-gray-100' 
                                            >
                                                <FaUserCircle />
                                                <span className='col-span-2'>Profile</span>
                                            </Link>
                                            <div className='px-3 py-1 grid grid-cols-3 items-center justify-center cursor-pointer hover:bg-gray-100' onClick={signOut}>
                                                <MdLogout />
                                                <span className='col-span-2 text-center'>Logout</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href={"/login"} className='xl:mr-3'>
                                    <FaUserCircle size={37} className='hidden lg:block' />
                                    <p className='lg:hidden text-center'>PROFILE</p>
                                </Link>
                            )}
                        </li>
                        <Link href={"/wishlist"} className='mx-3 lg:my-0 lg:mb-0 xl:mr-6 my-6 mb-7'>
                            <AiOutlineHeart size={41} className='hidden lg:block' />
                            <p className='lg:hidden'>WISHLIST</p>
                        </Link>
                    </div>
                    <li className='flex justify-end items-center'>
                        <Link href={"/cart"} className='relative cursor-pointer block'>
                            <BsBag size={33} />
                            {counterProduct < 1 ? (
                                ""
                            ) : (
                                <span className='bg-red-600 rounded-full h-5 font-semibold p-3 flex justify-center items-center w-5 absolute top-0 left-5'>{counterProduct}</span>
                            )
                            }
                        </Link>
                    </li>
                </ul>
            </nav>
        </header >
    )
}

export default navbar