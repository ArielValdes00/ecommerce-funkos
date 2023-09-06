import React from 'react'
import { getCart } from '../../../utils/apiPurchase'
import { useEffect, useState } from 'react'

const Sales = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const data = await getCart();
                console.log(data)
                setData(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchingData()
    }, [])
    return (
        <div>
            <div className='bg-gray-100'>
                {data.map((user) => (
                    <div key={user.id} className='grid grid-cols-2'>
                        <div>
                            <p>User</p>
                            <p>{user.name}</p>
                            <p>{user.phoneNumber}</p>
                        </div>
                        <div>
                            <p className='text-center'>Product</p>
                            <div className='flex text-center'>
                                {user.products.map((product) => (
                                    <div key={product.id}>
                                        <img src={product.image} alt={product.name} width={150}></img>
                                        <p>{product.category}</p>
                                        <p>{product.name}</p>
                                        <p>{product.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sales