import React from 'react'
import Link from 'next/link'

const SideBar = () => {
    return (
        <div className='fixed top-0 left-0 h-screen bg-black w-48 text-center m-0 text-white'>
            <div className='text-center py-5 border-b'>
                <h2 className='text-3xl font-extrabold'>FUNKO</h2>
            </div>
            <div className='flex flex-col h-full justify-around text-lg border '>
                <li>Profile</li>
                <Link href={"/dashboard/users"}>Users</Link>
                <Link href={"/dashboard/products"}>Products</Link>
                <li>Sales</li>
            </div>
        </div>
    )
}

export default SideBar