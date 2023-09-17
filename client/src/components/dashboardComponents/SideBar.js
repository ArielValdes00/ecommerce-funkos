import React from 'react';
import { RxSketchLogo, RxDashboard, RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { signOut } from 'next-auth/react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';

const Sidebar = ({ setSelectedSection }) => {

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };
    return (
        <aside className='fixed top-0 left-0 z-50 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between'>
            <div className='flex flex-col items-center'>
                <div className='bg-purple-800 text-white p-3 rounded-lg inline-block'>
                    <RxSketchLogo size={20} />
                </div>
                <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block' onClick={() => handleSectionClick('')} >
                    <RxDashboard size={20} />
                </div>
                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block' onClick={() => handleSectionClick('users')} >
                    <RxPerson size={20} />
                </div>
                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block' onClick={() => handleSectionClick('products')} >
                    <BsBoxSeam size={20} />
                </div>
                <div className='bg-gray-100 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block' onClick={() => handleSectionClick('sales')} >
                    <HiOutlineShoppingBag size={20} />
                </div>
            </div >
            <button className='bg-red-700 hover:bg-red-800 text-white cursor-pointer p-3 rounded-lg inline-block mx-auto' onClick={() => signOut()}>
                <AiOutlinePoweroff size={18} />
            </button>
        </aside>
    );
};

export default Sidebar;