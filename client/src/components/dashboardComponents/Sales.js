import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const Sales = ({ initialSalesData }) => {
    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, cartItem) => {
            const productPrice = parseFloat(cartItem.product.price);
            return total + productPrice * cartItem.quantity;
        }, 0);
    };

    const usersWithSales = initialSalesData.filter((user) => user.Carts.length > 0);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-3 m-2 lg:m-4">
            {usersWithSales.map((user) => (
                <div key={user.id} className="bg-white px-[10px] py-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold capitalize">{user.name}</h2>
                    <div className='flex flex-col gap-1 text-gray-500 text-[15px]'>
                        <p>Email: {user.email}</p>
                        <p>Purchased Products: {user.Carts.length}</p>
                        <p>Total Price Spent: ${calculateTotalPrice(user.Carts)}</p>
                    </div>
                    <ul className={`${user.Carts.length <= 2 ? 'grid-cols-2 grid gap-2 text-sm uppercase mt-4' : ''}`}>
                        {user.Carts.length <= 2 ? (
                            user.Carts.map((cart) => (
                                <li key={cart.id} className='flex flex-col gap-1 p-2 bg-white border rounded shadow text-center rounded-lg border-gray-200'>
                                    <img
                                        src={cart.product.image}
                                        height={120}
                                        width={120}
                                        className='mx-auto'
                                    />
                                    <p>{cart.product.category}</p>
                                    <p className='font-semibold'>{cart.product.name}</p>
                                    <p className=''>${cart.product.price}</p>
                                    <p className=''>quantity: {cart.quantity}</p>
                                </li>
                            ))
                        ) : (
                            <div>
                                <Swiper
                                    style={{
                                        "--swiper-pagination-color": "#000000",
                                    }}
                                    modules={[Pagination]}
                                    spaceBetween={12}
                                    breakpoints={{
                                        580: {
                                            slidesPerView: 2
                                        },
                                        0: {
                                            slidesPerView: 1
                                        }
                                    }}
                                    loop={true}
                                    scrollbar={{ draggable: true }}
                                    pagination={{ clickable: true }}
                                >
                                    {user.Carts.map((cart) => (
                                        <SwiperSlide key={cart.product.id} className='flex mt-4 py-2 uppercase text-sm mb-10 flex-col gap-2 p-2 bg-white border rounded shadow text-center rounded-lg border-gray-200'>
                                            <img
                                                src={cart.product.image}
                                                height={120}
                                                width={120}
                                                className='mx-auto'
                                                alt={cart.product.name}
                                            />
                                            <p className='mt-1'>{cart.product.category}</p>
                                            <p className='mt-1 font-semibold'>{cart.product.name}</p>
                                            <p className='mt-1'>${cart.product.price}</p>
                                            <p className='mt-1'>quantity: {cart.quantity}</p>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Sales