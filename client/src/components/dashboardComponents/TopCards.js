import React from 'react';

const TopCards = ({dailySales, weeklySales, totalUsers, totalDailyItemsSold, totalWeeklyItemsSold }) => {

    return (
        <div className='grid lg:grid-cols-5 gap-4'>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between border p-4 rounded-lg'>
                <div>
                    <p className='text-2xl font-bold'>${dailySales.toFixed(2)}</p>
                    <p className='text-gray-600'>Daily Sales</p>
                </div>
                <div>
                    <p className='text-2xl font-bold text-end'>{totalDailyItemsSold}</p>
                    <p className='text-gray-600'>Daily Items Sold</p>
                </div>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between border p-4 rounded-lg'>
                <div>
                    <p className='text-2xl font-bold'>${weeklySales.toFixed(2)}</p>
                    <p className='text-gray-600'>Weekly Sales</p>
                </div>
                <div>
                    <p className='text-2xl font-bold text-end'>{totalWeeklyItemsSold}</p>
                    <p className='text-gray-600'>Weekly Items Sold</p>
                </div>
            </div>
            <div className='bg-white flex justify-between border p-4 rounded-lg'>
                <div>
                    <p className='text-2xl font-bold'>{totalUsers}</p>
                    <p className='text-gray-600'>Customers</p>
                </div>
            </div>
        </div>
    );
}

export default TopCards;
