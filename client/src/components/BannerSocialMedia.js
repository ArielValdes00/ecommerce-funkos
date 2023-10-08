import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTiktok } from 'react-icons/fa';
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';

const BannerSocialMedia = () => {
    return (
        <div className='flex justify-center items-center bg-black text-white h-28 gap-5'>
            <Link href={"https://www.youtube.com/channel/UCiBxZWamaDdlemljJ3aGPZQ"} target='_blank' className='rounded-full p-3 bg-white'>
                <FaTiktok size={25} className='text-black' />
            </Link>
            <Link href={"https://www.instagram.com/originalfunko/"} target='_blank' className='rounded-full p-3 bg-white'>
                <BsInstagram size={25} className='text-black' />
            </Link>
            <Link href={"https://www.facebook.com/originalfunko"} target='_blank' className='rounded-full p-3 bg-white'>
                <FaFacebookF size={25} className='text-black' />
            </Link>
            <Link href={"https://twitter.com/OriginalFunko"} target='_blank' className='rounded-full p-3 bg-white'>
                <BsTwitter size={25} className='text-black' />
            </Link>
            <Link href={"https://www.tiktok.com/@originalfunko?lang=en"} target='_blank' className='rounded-full p-3 bg-white'>
                <BsYoutube size={25} className='text-black' />
            </Link>
        </div>
    )
}

export default BannerSocialMedia