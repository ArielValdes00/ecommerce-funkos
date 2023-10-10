import React from 'react';
import { RxDashboard, RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import Link from 'next/link';
import { BsBoxSeam } from 'react-icons/bs';
import Image from 'next/image';
import Icon from '/public/icons/indicator-icon-white.svg'

const Sidebar = ({ setSelectedSection }) => {

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };
    return (
        <aside className='fixed top-0 left-0 h-full p-4 bg-white border-r-[1px] flex flex-col justify-between'>
            <div className='flex flex-col items-center'>
                <div className='bg-purple-800 text-white p-[10px] py-[12px] rounded-lg inline-block'>
                    <Image
                        src={Icon}
                        width={24}
                        height={24}
                        className='text-white'
                        alt='Funko'
                    />
                </div>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'
                    onClick={() => handleSectionClick('')}
                >
                    <RxDashboard size={20} />
                </div>
                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'
                    onClick={() => handleSectionClick('users')}
                >
                    <RxPerson size={20} />
                </div>
                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'
                    onClick={() => handleSectionClick('products')}
                >
                    <BsBoxSeam size={20} />
                </div>
                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block'
                    onClick={() => handleSectionClick('sales')}
                >
                    <HiOutlineShoppingBag size={20} />
                </div>
            </div >
            <Link
                href={"/"}
                className='bg-red-700 hover:bg-red-800 text-white cursor-pointer p-3 rounded-lg inline-block mx-auto'
            >
                <AiOutlinePoweroff size={18} />
            </Link>
        </aside>
    );
};

export default Sidebar;