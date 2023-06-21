import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const BannerCategory = ({ title, description, image, height, width }) => {
    return (
        <div className="grid lg:grid-cols-2 lg:gap-7 items-center">
            <div className="text-white flex flex-col gap-5 justify-center items-start px-5 mt-5 lg:m-0">
                <h1 className="text-lg md:text-4xl font-extrabold w-full text-center lg:text-start">{title}</h1>
                <p className="font-semibold text-sm md:text-xl mx-auto lg:m-0">{description}</p>
                <Link href={"/products"} className='mx-auto lg:m-0'>
                    <button className="text-sm rounded-full bg-white text-black px-4 py-2 font-bold border-2 border-white hover:border-black">SHOP COLLECTION</button>
                </Link>
            </div>
            <div className="mx-auto">
                <Image src={ image } height={height} width={width} alt="fondo"></Image>
            </div>
        </div>
    )
}

export default BannerCategory