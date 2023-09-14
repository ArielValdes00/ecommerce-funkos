import React, { useEffect, useState } from 'react';
import { getAllSales } from '../../../utils/apiPurchase';
import { getUsers } from '../../../utils/apiUsers';

const TopCards = () => {
    const [dailySales, setDailySales] = useState(0);
    const [weeklySales, setWeeklySales] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    console.log(totalSales)

    useEffect(() => {
        const getTotalSales = async () => {
            const res = await getAllSales();
            const users = await getUsers();
            setTotalUsers(users.length);
            setTotalSales(res.length);
            
            const currentDate = new Date();
            const oneDay = 24 * 60 * 60 * 1000; 
            const oneWeek = 7 * oneDay; 
            
            const dailySalesTotal = res.reduce((total, sale) => {
                const saleDate = new Date(sale.createdAt);
                if (currentDate - saleDate <= oneDay) {
                    return total + sale.product.price * sale.quantity;
                }
                return total;
            }, 0);

            const weeklySalesTotal = res.reduce((total, sale) => {
                const saleDate = new Date(sale.createdAt);
                if (currentDate - saleDate <= oneWeek) {
                    return total + sale.product.price * sale.quantity;
                }
                return total;
            }, 0);


            setDailySales(dailySalesTotal);
            setWeeklySales(weeklySalesTotal);
        };
        getTotalSales();
    }, []);

    return (
        <div className='grid lg:grid-cols-5 gap-4 px-4 py-3 h-full'>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between border p-4 rounded-lg'>
                <div>
                    <p className='text-2xl font-bold'>${dailySales.toFixed(2)}</p>
                    <p className='text-gray-600'>Daily Sales</p>
                </div>
                <div>
                    <p className='text-2xl font-bold'>{totalSales}</p>
                    <p className='text-gray-600'>Total Daily Sales</p>
                </div>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between border p-4 rounded-lg'>
                <div>
                    <p className='text-2xl font-bold'>${weeklySales.toFixed(2)}</p>
                    <p className='text-gray-600'>WeeklySales</p>
                </div>
                <div>
                    <p className='text-2xl font-bold'>{totalSales}</p>
                    <p className='text-gray-600'>Total Weekly Sales</p>
                </div>
            </div>
            <div className='bg-white flex justify-between border p-4 rounded-lg'>
                <div>
                    <p className='text-2xl font-bold'>{totalUsers}</p>
                    <p className='text-gray-600'>Customers</p>
                </div>
            </div>
        </div>
    )
}

export default TopCards