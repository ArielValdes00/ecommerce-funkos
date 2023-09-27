import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const RecentOrders = ({ salesInfo }) => {
    console.log(salesInfo)
    
    return (
        <div className='w-full h-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-y-scroll'>
            <h1>Recent Orders</h1>
            <ul className='flex flex-col-reverse gap-2 mt-2'>
                {salesInfo.map((order) => (
                    <li
                        key={order.orderNumber}
                        className='bg-gray-50 hover:bg-gray-100 rounded-lg p-2 flex items-center cursor-pointer'
                    >
                        <div className='bg-purple-100 rounded-lg p-3'>
                            <FaShoppingBag className='text-purple-800' />
                        </div>
                        <div className='pl-4'>
                            <p className='text-gray-800 font-bold'>${order.totalPrice}</p>
                            <p className='text-gray-400 text-sm capitalize'>{order.userName}</p>
                        </div>
                        <p className='lg:flex md:hidden absolute right-6 text-sm'>{order.timeAgo}</p>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default RecentOrders;
