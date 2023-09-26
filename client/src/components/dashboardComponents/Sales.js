import React from 'react'

const Sales = ({ initialSalesData }) => {
    console.log(initialSalesData)
    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, cartItem) => {
            const productPrice = parseFloat(cartItem.product.price);
            return total + productPrice * cartItem.quantity;
        }, 0);
    };

    const usersWithSales = initialSalesData.filter((user) => user.Carts.length > 0);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2">
            {usersWithSales.map((user) => (
                <div key={user.id} className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold capitalize">{user.name}</h2>
                    <div className='text-gray-500'>
                        <p>Email: {user.email}</p>
                        <p>Purchased Products: {user.Carts.length}</p>
                        <p>Total Price Spent: ${calculateTotalPrice(user.Carts)}</p>
                    </div>
                    <ul className="grid grid-cols-2 gap-2 text-sm uppercase mt-3">
                        {user.Carts.map((cart) => (
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
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default Sales