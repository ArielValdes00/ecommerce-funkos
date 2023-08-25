import React from 'react';
import SalesIcon from '/public/icons/sales.png';
import ProductsIcon from '/public/icons/products.png';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const SideBar = ({ setSelectedSection, selectedSection }) => {
    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    return (
            <div className='fixed flex flex-col justify-between font-semibold h-screen bg-black bg-color'>
                <div className='text-start pb-5 pt-2'>
                    <h2 className='text-3xl font-extrabold text-white text-center'>FUNKO</h2>
                </div>
                <div className='flex flex-col gap-4 items-start mx-auto text-lg'>
                    <div
                        className={`cursor-pointer transition-colors duration-300 rounded-md px-5 w-full py-2 mx-auto ${selectedSection === 'profile'
                            ? 'selected text-white bg-blue-600'
                            : ''
                        }`}
                        onClick={() => handleSectionClick('profile')}
                    >
                        Profile
                    </div>
                    <div
                        className={`cursor-pointer transition-colors duration-300 rounded-md px-5 w-full py-2 mx-auto ${selectedSection === 'users'
                            ? 'selected text-white bg-blue-600'
                            : ''
                        }`}
                        onClick={() => handleSectionClick('users')}
                    >
                        Users
                    </div>
                    <div
                        className={`flex rounded-md items-center px-5 w-full cursor-pointer py-3 gap-4 transition-colors duration-300 ${selectedSection === 'products'
                            ? 'selected text-white bg-blue-600'
                            : ''
                        }`}
                        onClick={() => handleSectionClick('products')}
                    >
                        <Image src={ProductsIcon} height={25} width={25} alt='products' />
                        <div>Products</div>
                    </div>
                    <div
                        className={`flex rounded-md items-center px-5 w-full cursor-pointer py-3 gap-4 transition-colors duration-300 ${selectedSection === 'sales'
                            ? 'selected text-white bg-blue-600'
                            : ''
                        }`}
                        onClick={() => handleSectionClick('sales')}
                    >
                        <Image src={SalesIcon} height={25} width={25} alt='Sales' />
                        <div>Sales</div>
                    </div>
                </div>
                <button className='my-5 text-white' onClick={() => signOut()}>
                    Logout
                </button>
            </div>
    )
}

export default SideBar